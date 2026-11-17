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

The approach is geometric and physical, with every computation done by hand. Draw pictures constantly: a sketch of the region is the most important step in nearly every integral of this course. Each lesson has fully worked examples. Exercises are split into parts, each with an answer to reveal once you have tried it, and each lesson ends with quiz questions.

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

The same ideas are easiest to see first in the plane. Drag the tips of $\\mathbf a$ and $\\mathbf b$ below.

\`\`\`interactive
vectors-3d
{"title": "Dot product, angle and projection in the plane", "dim": 2, "a": [3, 1], "b": [1, 3], "features": ["proj", "angle", "sum"], "show": ["proj", "angle"], "snap": 0.5, "range": 5, "caption": "Drag the tips (or focus one and use the arrow keys). The orange bar is proj_b a, the shadow of a on the line of b, and the dashed segment is the remainder a − proj_b a, which always meets b at a right angle. Swing a round: a · b is positive while θ is acute, 0 exactly when the vectors are perpendicular, and negative once θ passes 90°, when the shadow points against b. Turn on a + b to see the parallelogram rule."}
\`\`\`

**Worked example.** Let $\\mathbf a=\\langle1,2,2\\rangle$ and $\\mathbf b=\\langle3,0,4\\rangle$. Then $\\mathbf a\\cdot\\mathbf b=3+0+8=11$, $|\\mathbf a|=3$ and $|\\mathbf b|=5$, so

$$
\\cos\\theta=\\frac{11}{15},\\qquad\\theta\\approx42.8^\\circ.
$$

The component of $\\mathbf a$ along $\\mathbf b$ is $11/5$, and the projection is $\\tfrac{11}{25}\\langle3,0,4\\rangle$. A useful check: $\\mathbf a-\\text{proj}_{\\mathbf b}\\mathbf a=\\langle\\tfrac{-8}{25},2,\\tfrac{6}{25}\\rangle$, and its dot product with $\\mathbf b$ is $-\\tfrac{24}{25}+\\tfrac{24}{25}=0$, so the remainder is perpendicular to $\\mathbf b$, as it should be.

\`\`\`interactive
vectors-3d
{"title": "The worked example in space", "dim": 3, "a": [1, 2, 2], "b": [3, 0, 4], "features": ["proj", "angle"], "snap": 0.5, "range": 5, "caption": "These are the worked example's vectors: the readouts show a · b = 11, |a| = 3, |b| = 5, cos θ = 11/15 ≈ 0.733 (θ ≈ 42.8°), the component 11/5 = 2.2 and the projection (11/25)⟨3, 0, 4⟩ = ⟨1.32, 0, 1.76⟩. Drag in the picture to turn it and see that the dashed remainder meets b at a right angle. Change the components with the sliders, or drag a tip, and find a vector a with a · b = 0."}
\`\`\`

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
              prompt: `Work with a sphere and with lengths of vectors.`,
              kind: 'problem',
              difficulty: 1,
              parts: [
                { prompt: `Complete the square to find the centre and radius of the sphere $x^2+y^2+z^2-4x+6y-2z=2$.`, answer: `$(x-2)^2+(y+3)^2+(z-1)^2=2+4+9+1=16$, so the centre is $(2,-3,1)$ and the radius is $4$.` },
                { prompt: `Find a unit vector in the direction of $\\langle2,-1,2\\rangle$.`, answer: `$|\\langle2,-1,2\\rangle|=\\sqrt{4+1+4}=3$, so the unit vector is $\\tfrac13\\langle2,-1,2\\rangle$.` },
                { prompt: `Find a vector of length $6$ in the opposite direction.`, answer: `$-6\\cdot\\tfrac13\\langle2,-1,2\\rangle=\\langle-4,2,-4\\rangle$.` },
              ],
            },
            {
              slug: 'angles-and-projections',
              title: 'Angles and projections',
              prompt: `Let $\\mathbf u=\\langle2,-1,2\\rangle$ and $\\mathbf v=\\langle1,1,0\\rangle$.`,
              kind: 'problem',
              difficulty: 1,
              parts: [
                { prompt: `Find the angle between $\\mathbf u$ and $\\mathbf v$.`, answer: `$\\mathbf u\\cdot\\mathbf v=2-1+0=1$, $|\\mathbf u|=3$, $|\\mathbf v|=\\sqrt2$, so $\\cos\\theta=\\dfrac{1}{3\\sqrt2}$ and $\\theta\\approx76.4^\\circ$.` },
                { prompt: `Find the scalar component of $\\mathbf u$ along $\\mathbf v$.`, answer: `$\\dfrac{\\mathbf u\\cdot\\mathbf v}{|\\mathbf v|}=\\dfrac{1}{\\sqrt2}$.` },
                { prompt: `Find the vector projection of $\\mathbf u$ onto $\\mathbf v$.`, answer: `$\\dfrac{\\mathbf u\\cdot\\mathbf v}{|\\mathbf v|^2}\\mathbf v=\\tfrac12\\langle1,1,0\\rangle=\\langle\\tfrac12,\\tfrac12,0\\rangle$.` },
                { prompt: `Show that the triangle with vertices $A(2,1,0)$, $B(3,3,1)$ and $C(3,0,1)$ has a right angle, and say where.`, answer: `$\\overrightarrow{AB}=\\langle1,2,1\\rangle$ and $\\overrightarrow{AC}=\\langle1,-1,1\\rangle$, with $\\overrightarrow{AB}\\cdot\\overrightarrow{AC}=1-2+1=0$. So the right angle is at $A$.` },
              ],
            },
            {
              slug: 'dot-product-proofs',
              title: 'Proofs with the dot product',
              prompt: `Prove each statement using only the algebra of the dot product. Expand each squared length as a dot product of a vector with itself.`,
              kind: 'derivation',
              difficulty: 2,
              parts: [
                { prompt: `The parallelogram law $|\\mathbf a+\\mathbf b|^2+|\\mathbf a-\\mathbf b|^2=2|\\mathbf a|^2+2|\\mathbf b|^2$.`, answer: `$|\\mathbf a\\pm\\mathbf b|^2=(\\mathbf a\\pm\\mathbf b)\\cdot(\\mathbf a\\pm\\mathbf b)=|\\mathbf a|^2\\pm2\\,\\mathbf a\\cdot\\mathbf b+|\\mathbf b|^2$. Adding the two, the $\\pm2\\,\\mathbf a\\cdot\\mathbf b$ terms cancel, leaving $2|\\mathbf a|^2+2|\\mathbf b|^2$.` },
                { prompt: `The triangle inequality $|\\mathbf a+\\mathbf b|\\le|\\mathbf a|+|\\mathbf b|$, using Cauchy-Schwarz.`, answer: `$|\\mathbf a+\\mathbf b|^2=|\\mathbf a|^2+2\\,\\mathbf a\\cdot\\mathbf b+|\\mathbf b|^2\\le|\\mathbf a|^2+2|\\mathbf a||\\mathbf b|+|\\mathbf b|^2=(|\\mathbf a|+|\\mathbf b|)^2$, using $\\mathbf a\\cdot\\mathbf b\\le|\\mathbf a||\\mathbf b|$. Both sides are non-negative, so take square roots.` },
                { prompt: `The diagonals of a rhombus are perpendicular.`, answer: `With sides $\\mathbf a$ and $\\mathbf b$, $|\\mathbf a|=|\\mathbf b|$, the diagonals are $\\mathbf a+\\mathbf b$ and $\\mathbf a-\\mathbf b$. Then $(\\mathbf a+\\mathbf b)\\cdot(\\mathbf a-\\mathbf b)=|\\mathbf a|^2-|\\mathbf b|^2=0$.` },
              ],
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
          quiz: [
            {
              question: `A constant force $\\mathbf F=\\langle3,-1,2\\rangle$ N moves an object in a straight line from $(1,0,1)$ to $(4,2,0)$, in metres. How much work does it do?`,
              options: [`$5$ J`, `$14$ J`, `$10$ J`, `$13$ J`],
              answer: 0,
              explanation: `The displacement is $\\mathbf d=\\langle4-1,2-0,0-1\\rangle=\\langle3,2,-1\\rangle$, so $W=\\mathbf F\\cdot\\mathbf d=9-2-2=5$ J. $10$ J dots $\\mathbf F$ with the end point instead of the displacement, and $14$ J is $|\\mathbf F||\\mathbf d|$, which would only be the work if the force pointed along the motion.`,
            },
            {
              question: `For $\\mathbf a=\\langle2,1,2\\rangle$ and $\\mathbf b=\\langle0,3,4\\rangle$, what is the vector projection $\\text{proj}_{\\mathbf b}\\mathbf a$?`,
              options: [`$\\tfrac{11}{5}\\langle0,3,4\\rangle$`, `$\\tfrac{11}{5}$`, `$\\tfrac{11}{25}\\langle0,3,4\\rangle$`, `$\\tfrac{11}{9}\\langle2,1,2\\rangle$`],
              answer: 2,
              explanation: `$\\mathbf a\\cdot\\mathbf b=0+3+8=11$ and $|\\mathbf b|^2=25$, so the projection is $\\tfrac{11}{25}\\langle0,3,4\\rangle$, of length $\\tfrac{11}{5}$. The number $\\tfrac{11}{5}$ is the scalar component, not a vector. Dividing by $|\\mathbf b|$ only once gives a vector $5$ times too long, and $\\tfrac{11}{9}\\langle2,1,2\\rangle$ projects $\\mathbf b$ onto $\\mathbf a$ instead.`,
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

\`\`\`interactive
vectors-3d
{"title": "The cross product a × b", "dim": 3, "a": [1, 2, 3], "b": [4, 5, 6], "features": ["cross", "angle"], "snap": 0.5, "range": 8, "az": 70, "el": 12, "caption": "These are the vectors of worked example 1, with a × b = ⟨−3, 6, −3⟩. Drag the picture to turn it: the green arrow stands perpendicular to the shaded parallelogram, and the last readout checks both dot products are 0. Its length, the area √54 ≈ 7.35, matches |a||b| sin θ. Now make b parallel to a (try b = ⟨2, 4, 6⟩) and watch the area and the cross product shrink to zero; swap the components of a and b and watch a × b flip."}
\`\`\`

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
              prompt: `Compute cross products, then use one for an area and a normal.`,
              kind: 'problem',
              difficulty: 1,
              parts: [
                { prompt: `Compute $\\langle2,-1,0\\rangle\\times\\langle1,3,-2\\rangle$ and check that the result is perpendicular to both.`, answer: `$\\langle(-1)(-2)-0\\cdot3,\\ 0\\cdot1-2(-2),\\ 2\\cdot3-(-1)\\cdot1\\rangle=\\langle2,4,7\\rangle$. Check: $\\langle2,4,7\\rangle\\cdot\\langle2,-1,0\\rangle=4-4=0$ and $\\langle2,4,7\\rangle\\cdot\\langle1,3,-2\\rangle=2+12-14=0$.` },
                { prompt: `Find the area of the triangle with vertices $(1,1,1)$, $(2,3,4)$ and $(4,3,2)$.`, answer: `Two sides are $\\langle1,2,3\\rangle$ and $\\langle3,2,1\\rangle$, with cross product $\\langle-4,8,-4\\rangle$ of length $\\sqrt{96}=4\\sqrt6$. The triangle is half the parallelogram: area $2\\sqrt6\\approx4.90$.` },
                { prompt: `Find a unit vector perpendicular to the plane of that triangle.`, answer: `Divide the cross product by its length: $\\dfrac{1}{\\sqrt6}\\langle-1,2,-1\\rangle$ (or its negative).` },
              ],
            },
            {
              slug: 'volumes-and-torque',
              title: 'Volumes and torque',
              prompt: `Use the triple product and the size of a cross product.`,
              kind: 'problem',
              difficulty: 2,
              parts: [
                { prompt: `Find the volume of the parallelepiped with edges $\\langle1,0,1\\rangle$, $\\langle0,2,1\\rangle$ and $\\langle1,1,3\\rangle$.`, answer: `The determinant with these rows is $1(6-1)-0+1(0-2)=3$, so the volume is $3$.` },
                { prompt: `Are the points $(0,0,0)$, $(1,2,3)$, $(2,3,4)$ and $(3,4,5)$ in one plane?`, answer: `Yes. The vectors from the origin give the triple product $1(15-16)-2(10-12)+3(8-9)=-1+4-3=0$, so they lie in one plane.` },
                { prompt: `A wrench $0.25$ m long is pushed with $40$ N at an angle of $60^\\circ$ to the handle. Find the size of the torque.`, answer: `$|\\boldsymbol\\tau|=|\\mathbf r||\\mathbf F|\\sin\\theta=0.25\\cdot40\\cdot\\sin60^\\circ=5\\sqrt3\\approx8.66$ N m.` },
              ],
            },
            {
              slug: 'cross-identities',
              title: 'Identities',
              prompt: `Prove the following facts about the cross product.`,
              kind: 'derivation',
              difficulty: 3,
              parts: [
                { prompt: `$\\mathbf a\\cdot(\\mathbf a\\times\\mathbf b)=0$, from the components.`, answer: `$a_1(a_2b_3-a_3b_2)+a_2(a_3b_1-a_1b_3)+a_3(a_1b_2-a_2b_1)$. The six terms cancel in pairs, for example $a_1a_2b_3-a_2a_1b_3=0$.` },
                { prompt: `Lagrange's identity $|\\mathbf a\\times\\mathbf b|^2=|\\mathbf a|^2|\\mathbf b|^2-(\\mathbf a\\cdot\\mathbf b)^2$, and deduce $|\\mathbf a\\times\\mathbf b|=|\\mathbf a||\\mathbf b|\\sin\\theta$.`, answer: `Expand both sides in components: each equals $\\sum_{i<j}(a_ib_j-a_jb_i)^2$. Then substitute $\\mathbf a\\cdot\\mathbf b=|\\mathbf a||\\mathbf b|\\cos\\theta$: the right side is $|\\mathbf a|^2|\\mathbf b|^2(1-\\cos^2\\theta)=|\\mathbf a|^2|\\mathbf b|^2\\sin^2\\theta$. Take square roots, using $\\sin\\theta\\ge0$ on $[0,\\pi]$.` },
                { prompt: `Show by an example that $(\\mathbf a\\times\\mathbf b)\\times\\mathbf c\\ne\\mathbf a\\times(\\mathbf b\\times\\mathbf c)$ in general.`, answer: `Take $\\mathbf a=\\mathbf b=\\mathbf i$ and $\\mathbf c=\\mathbf j$. Then $(\\mathbf i\\times\\mathbf i)\\times\\mathbf j=\\mathbf 0\\times\\mathbf j=\\mathbf 0$, but $\\mathbf i\\times(\\mathbf i\\times\\mathbf j)=\\mathbf i\\times\\mathbf k=-\\mathbf j$.` },
              ],
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
          quiz: [
            {
              question: `What is the area of the triangle with vertices $(0,0,0)$, $(1,1,0)$ and $(0,1,1)$?`,
              options: [`$\\sqrt3$`, `$\\tfrac12$`, `$\\tfrac32$`, `$\\tfrac{\\sqrt3}{2}$`],
              answer: 3,
              explanation: `$\\langle1,1,0\\rangle\\times\\langle0,1,1\\rangle=\\langle1,-1,1\\rangle$, of length $\\sqrt3$. That is the parallelogram, and the triangle is half of it, $\\tfrac{\\sqrt3}{2}$. Answering $\\sqrt3$ forgets the half, and $\\tfrac12$ is half the dot product, which measures alignment, not area.`,
            },
            {
              question: `Suppose $\\mathbf a\\times\\mathbf b=\\langle2,-1,3\\rangle$. What is $(2\\mathbf b)\\times\\mathbf a$?`,
              options: [`$\\langle4,-2,6\\rangle$`, `$\\langle-4,2,-6\\rangle$`, `$\\langle-2,1,-3\\rangle$`, `$2\\sqrt{14}$`],
              answer: 1,
              explanation: `Scalars pull out, and swapping the order changes the sign: $(2\\mathbf b)\\times\\mathbf a=2(\\mathbf b\\times\\mathbf a)=-2(\\mathbf a\\times\\mathbf b)=\\langle-4,2,-6\\rangle$. $\\langle4,-2,6\\rangle$ treats the cross product as commutative. The cross product is a vector, so the length $2\\sqrt{14}$ is not the answer either.`,
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
              prompt: `Write down lines and decide how two lines sit in space.`,
              kind: 'problem',
              difficulty: 1,
              parts: [
                { prompt: `Find parametric equations of the line through $(1,-1,2)$ and $(3,1,0)$, and the point where it meets the $xy$-plane.`, answer: `The direction is $\\langle2,2,-2\\rangle$, so $x=1+2t$, $y=-1+2t$, $z=2-2t$. It meets $z=0$ at $t=1$, the point $(3,1,0)$.` },
                { prompt: `Decide whether the lines $\\mathbf r=\\langle1,0,0\\rangle+t\\langle1,1,0\\rangle$ and $\\mathbf r=\\langle0,1,1\\rangle+s\\langle1,-1,1\\rangle$ are parallel, intersecting or skew.`, answer: `The directions are not parallel. Equating $y$ and $z$ gives $t=1-s$ and $0=1+s$, so $s=-1$, $t=2$, but then $x$ is $3$ on the first line and $-1$ on the second. They never meet, so they are skew.` },
                { prompt: `If they are skew, find the distance between them.`, answer: `$\\mathbf n=\\langle1,1,0\\rangle\\times\\langle1,-1,1\\rangle=\\langle1,-1,-2\\rangle$, and $\\overrightarrow{P_1P_2}=\\langle-1,1,1\\rangle$. So $D=\\dfrac{|-1-1-2|}{\\sqrt6}=\\dfrac{4}{\\sqrt6}\\approx1.633$.` },
              ],
            },
            {
              slug: 'plane-drill',
              title: 'Planes',
              prompt: `Use normal vectors to answer each question.`,
              kind: 'problem',
              difficulty: 2,
              parts: [
                { prompt: `Find the distance from $(1,2,3)$ to the plane $2x-y+2z=4$.`, answer: `$D=\\dfrac{|2-2+6-4|}{\\sqrt{4+1+4}}=\\dfrac23$.` },
                { prompt: `Find the angle between the planes $x+y+z=1$ and $x-2y+3z=1$.`, answer: `The normals are $\\langle1,1,1\\rangle$ and $\\langle1,-2,3\\rangle$, with dot product $2$, so $\\cos\\theta=\\dfrac{2}{\\sqrt3\\sqrt{14}}=\\dfrac{2}{\\sqrt{42}}$ and $\\theta\\approx72.0^\\circ$.` },
                { prompt: `Find the plane through $(2,1,-1)$ that contains the line $\\mathbf r=\\langle1,0,0\\rangle+t\\langle5,-2,-3\\rangle$.`, answer: `The plane contains $\\langle2,1,-1\\rangle-\\langle1,0,0\\rangle=\\langle1,1,-1\\rangle$ and the direction $\\langle5,-2,-3\\rangle$. Their cross product is $\\langle-5,-2,-7\\rangle$, so the plane is $5x+2y+7z=5$. Check: $(2,1,-1)$ gives $10+2-7=5$.` },
              ],
            },
            {
              slug: 'distance-derivation',
              title: 'Derive the distance formula',
              prompt: `Find the distance from a point to a plane by projection.`,
              kind: 'derivation',
              difficulty: 2,
              parts: [
                { prompt: `Derive the formula for the distance from a point $P_1(x_1,y_1,z_1)$ to the plane $ax+by+cz=d$, by projecting a vector from a point on the plane onto the unit normal.`, answer: `Take $P_0$ on the plane, so $ax_0+by_0+cz_0=d$, and $\\mathbf n=\\langle a,b,c\\rangle$. The distance is $\\dfrac{|\\overrightarrow{P_0P_1}\\cdot\\mathbf n|}{|\\mathbf n|}=\\dfrac{|ax_1+by_1+cz_1-(ax_0+by_0+cz_0)|}{\\sqrt{a^2+b^2+c^2}}=\\dfrac{|ax_1+by_1+cz_1-d|}{\\sqrt{a^2+b^2+c^2}}$.` },
                { prompt: `Use it to find the distance between the parallel planes $x+2y-2z=3$ and $2x+4y-4z=18$.`, answer: `Rewrite the second plane as $x+2y-2z=9$. A point on the first, such as $(3,0,0)$, is at distance $\\dfrac{|3-9|}{\\sqrt{1+4+4}}=\\dfrac63=2$.` },
              ],
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
          quiz: [
            {
              question: `What is the distance from the point $(2,-1,3)$ to the plane $x+2y+2z=1$?`,
              options: [`$5$`, `$\\tfrac53$`, `$2$`, `$\\tfrac59$`],
              answer: 1,
              explanation: `$D=\\dfrac{|2-2+6-1|}{\\sqrt{1+4+4}}=\\dfrac53$. The answer $5$ forgets to divide by $|\\mathbf n|=3$, and $\\tfrac59$ divides by $|\\mathbf n|^2$. The answer $2$ leaves out the $-d$ on the plane's right-hand side.`,
            },
            {
              question: `How do the lines $\\mathbf r=t\\langle1,2,3\\rangle$ and $\\mathbf r=\\langle1,1,1\\rangle+s\\langle2,4,6\\rangle$ sit relative to each other?`,
              options: [`They are skew`, `They meet in one point`, `They are the same line`, `They are parallel and distinct`],
              answer: 3,
              explanation: `$\\langle2,4,6\\rangle=2\\langle1,2,3\\rangle$, so the directions are parallel. The point $(1,1,1)$ is not on the first line, since $t\\langle1,2,3\\rangle=\\langle1,1,1\\rangle$ has no solution. So the lines are parallel and distinct. Skew lines are by definition not parallel, so parallel directions rule out skew.`,
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
              prompt: `Name each surface and describe its traces in planes parallel to the coordinate planes.`,
              kind: 'problem',
              difficulty: 1,
              parts: [
                { prompt: `$4x^2+y^2+z^2=4$`, answer: `Ellipsoid $x^2+\\dfrac{y^2}{4}+\\dfrac{z^2}{4}=1$. Traces $x=k$ are circles $y^2+z^2=4-4k^2$ for $|k|<1$; traces $y=k$ and $z=k$ are ellipses.` },
                { prompt: `$z^2=x^2+y^2$`, answer: `Cone. Traces $z=k$ are circles of radius $|k|$; traces $x=k$ and $y=k$ are hyperbolas, which become pairs of lines $z=\\pm y$ or $z=\\pm x$ when $k=0$.` },
                { prompt: `$z=x^2-y^2$`, answer: `Hyperbolic paraboloid (saddle). Traces $z=k$ are hyperbolas (the lines $y=\\pm x$ for $k=0$); traces $x=k$ are downward parabolas $z=k^2-y^2$; traces $y=k$ are upward parabolas $z=x^2-k^2$.` },
                { prompt: `$x^2+y^2-z^2=-1$`, answer: `Hyperboloid of two sheets, $z^2=1+x^2+y^2$. Traces $z=k$ are circles of radius $\\sqrt{k^2-1}$ for $|k|>1$, a point for $|k|=1$, and empty for $|k|<1$; traces $x=k$ and $y=k$ are hyperbolas.` },
                { prompt: `$y=x^2$`, answer: `Parabolic cylinder, since $z$ is missing. Every trace $z=k$ is the parabola $y=x^2$; traces $x=k$ are lines $y=k^2$ parallel to the $z$-axis, and traces $y=k>0$ are pairs of lines $x=\\pm\\sqrt k$.` },
                { prompt: `Check one of them by plotting it in GeoGebra.`, answer: `Type the equation into the 3D calculator and turn the picture. You should see the shape and traces above: for example, $z^2=x^2+y^2$ shows two cones meeting at the origin, and $x^2+y^2-z^2=-1$ shows two bowls with a gap between $z=-1$ and $z=1$.` },
              ],
            },
            {
              slug: 'convert-coordinates',
              title: 'Convert coordinates',
              prompt: `Convert between coordinate systems, then identify surfaces.`,
              kind: 'problem',
              difficulty: 2,
              parts: [
                { prompt: `Convert the cylindrical point $(2,2\\pi/3,1)$ to Cartesian.`, answer: `$x=2\\cos(2\\pi/3)=-1$, $y=2\\sin(2\\pi/3)=\\sqrt3$, $z=1$: the point $(-1,\\sqrt3,1)$.` },
                { prompt: `Convert the Cartesian point $(0,-2,2)$ to spherical coordinates.`, answer: `$\\rho=\\sqrt{0+4+4}=2\\sqrt2$, $\\cos\\varphi=\\dfrac{2}{2\\sqrt2}$ so $\\varphi=\\pi/4$, and the point lies on the negative $y$-axis side, so $\\theta=3\\pi/2$.` },
                { prompt: `Identify $r=2\\sin\\theta$ (cylindrical).`, answer: `Multiply by $r$: $x^2+y^2=2y$, that is $x^2+(y-1)^2=1$, a circular cylinder of radius $1$ about the line $x=0$, $y=1$.` },
                { prompt: `Identify $\\rho\\sin\\varphi=3$ (spherical).`, answer: `$\\rho\\sin\\varphi$ is the distance $r$ from the $z$-axis, so this is the cylinder $x^2+y^2=9$.` },
                { prompt: `Identify $\\varphi=\\pi/6$ (spherical).`, answer: `$\\tan\\varphi=r/z=1/\\sqrt3$ with $z>0$: the upper half of the cone $z=\\sqrt3\\sqrt{x^2+y^2}$.` },
                { prompt: `Identify $z=r^2$ (cylindrical).`, answer: `The paraboloid $z=x^2+y^2$.` },
              ],
            },
            {
              slug: 'saddle-lines',
              title: 'Straight lines on a curved surface',
              prompt: `Fix a number $c$, and consider points of the saddle $z=x^2-y^2$ with $x=c+t$ and $y=c-t$.`,
              kind: 'derivation',
              difficulty: 3,
              parts: [
                { prompt: `Find $z$ as a function of $t$, and show that these points form a straight line lying entirely on the surface.`, answer: `$x^2-y^2=(x-y)(x+y)=(2t)(2c)=4ct$, which is linear in $t$. So the points are $(c,c,0)+t\\langle1,-1,4c\\rangle$, a straight line, and every one of them satisfies the equation of the saddle.` },
                { prompt: `Deduce that the saddle contains infinitely many straight lines.`, answer: `Each value of $c$ gives a different line, so there is one through every point $(c,c,0)$. (The choice $x=c+t$, $y=-c+t$ gives a second family in the same way.)` },
                { prompt: `Explain why that is useful in architecture.`, answer: `A surface made of straight lines can be built from straight beams or straight formwork boards, yet it is curved and stiff. That is why hyperbolic paraboloid roofs and shells are popular.` },
              ],
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
          quiz: [
            {
              question: `A point has spherical coordinates $\\rho=4$, $\\varphi=\\pi/6$ (from the positive $z$-axis) and $\\theta=\\pi/3$. What are its Cartesian coordinates?`,
              options: [`$(3,\\sqrt3,2)$`, `$(2,2\\sqrt3,2\\sqrt3)$`, `$(1,\\sqrt3,2\\sqrt3)$`, `$(\\sqrt3,1,2\\sqrt3)$`],
              answer: 2,
              explanation: `$z=\\rho\\cos\\varphi=2\\sqrt3$ and $r=\\rho\\sin\\varphi=2$, so $x=r\\cos\\theta=1$ and $y=r\\sin\\theta=\\sqrt3$. The point $(3,\\sqrt3,2)$ swaps the roles of $\\varphi$ and $\\theta$, as the physics convention does. $(2,2\\sqrt3,2\\sqrt3)$ forgets the factor $\\sin\\varphi$ in $x$ and $y$.`,
            },
            {
              question: `What surface is $x^2-y^2-z^2=1$?`,
              options: [`A hyperboloid of two sheets with axis the $x$-axis`, `A hyperboloid of one sheet around the $x$-axis`, `A cone with axis the $x$-axis`, `A hyperbolic paraboloid`],
              answer: 0,
              explanation: `$x^2=1+y^2+z^2$, so $|x|\\ge1$: the traces $x=k$ are circles $y^2+z^2=k^2-1$, empty for $|k|<1$. The gap means two sheets. A hyperboloid of one sheet would have every trace non-empty, like $y^2+z^2-x^2=1$; with the right side $0$ it would be a cone.`,
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
              prompt: `Find tangent vectors and tangent lines of two curves.`,
              kind: 'problem',
              difficulty: 1,
              parts: [
                { prompt: `For $\\mathbf r(t)=\\langle t^2,t^3,e^t\\rangle$, find $\\mathbf r'(t)$.`, answer: `$\\mathbf r'(t)=\\langle2t,3t^2,e^t\\rangle$.` },
                { prompt: `Find the unit tangent of that curve at $t=0$.`, answer: `$\\mathbf r'(0)=\\langle0,0,1\\rangle$, which already has length $1$, so $\\mathbf T(0)=\\langle0,0,1\\rangle$.` },
                { prompt: `Find its tangent line at $t=1$.`, answer: `The point is $(1,1,e)$ and $\\mathbf r'(1)=\\langle2,3,e\\rangle$, so the line is $\\langle1,1,e\\rangle+s\\langle2,3,e\\rangle$.` },
                { prompt: `For $\\mathbf r(t)=\\langle2\\cos t,2\\sin t,3t\\rangle$, show that the speed is constant.`, answer: `$\\mathbf r'=\\langle-2\\sin t,2\\cos t,3\\rangle$, so $|\\mathbf r'|=\\sqrt{4\\sin^2t+4\\cos^2t+9}=\\sqrt{13}$ for every $t$.` },
                { prompt: `Find the angle between its tangent and the $z$-axis.`, answer: `$\\cos\\alpha=\\dfrac{\\mathbf r'\\cdot\\mathbf k}{|\\mathbf r'|}=\\dfrac{3}{\\sqrt{13}}$, so $\\alpha\\approx33.7^\\circ$, the same at every point.` },
              ],
            },
            {
              slug: 'integrate-vectors',
              title: 'Integrate',
              prompt: `Integrate vector functions, one component at a time.`,
              kind: 'problem',
              difficulty: 1,
              parts: [
                { prompt: `Evaluate $\\int_0^1\\left\\langle t,e^{2t},\\dfrac{1}{1+t^2}\\right\\rangle dt$.`, answer: `$\\left\\langle\\tfrac12,\\ \\dfrac{e^2-1}{2},\\ \\dfrac{\\pi}{4}\\right\\rangle$, using $\\int_0^1\\dfrac{dt}{1+t^2}=\\arctan1$.` },
                { prompt: `Solve $\\mathbf r'(t)=\\langle1,2t,3t^2\\rangle$ with $\\mathbf r(0)=\\langle1,0,-1\\rangle$.`, answer: `$\\mathbf r=\\langle t,t^2,t^3\\rangle+\\mathbf C$ with $\\mathbf C=\\mathbf r(0)=\\langle1,0,-1\\rangle$, so $\\mathbf r(t)=\\langle1+t,\\ t^2,\\ t^3-1\\rangle$.` },
                { prompt: `A particle has acceleration $\\mathbf a=\\langle0,0,-10\\rangle$, starts at the origin, and has initial velocity $\\langle3,4,20\\rangle$. Find its position.`, answer: `$\\mathbf v=\\langle3,4,20-10t\\rangle$ and $\\mathbf r=\\langle3t,\\ 4t,\\ 20t-5t^2\\rangle$.` },
                { prompt: `When and where does it return to the plane $z=0$?`, answer: `$20t-5t^2=5t(4-t)=0$ at $t=4$, at the point $(12,16,0)$.` },
              ],
            },
            {
              slug: 'product-rule-proofs',
              title: 'Prove the product rules',
              prompt: `Prove the following with components and the product rules.`,
              kind: 'derivation',
              difficulty: 3,
              parts: [
                { prompt: `The cross product rule $(\\mathbf u\\times\\mathbf v)'=\\mathbf u'\\times\\mathbf v+\\mathbf u\\times\\mathbf v'$, from components.`, answer: `The first component of $\\mathbf u\\times\\mathbf v$ is $u_2v_3-u_3v_2$. Its derivative is $(u_2'v_3-u_3'v_2)+(u_2v_3'-u_3v_2')$, which is the first component of $\\mathbf u'\\times\\mathbf v$ plus that of $\\mathbf u\\times\\mathbf v'$. The other components work the same way.` },
                { prompt: `Show that $\\dfrac{d}{dt}\\left[\\mathbf r\\cdot(\\mathbf r'\\times\\mathbf r'')\\right]=\\mathbf r\\cdot(\\mathbf r'\\times\\mathbf r''')$.`, answer: `The product rules give $\\mathbf r'\\cdot(\\mathbf r'\\times\\mathbf r'')+\\mathbf r\\cdot(\\mathbf r''\\times\\mathbf r'')+\\mathbf r\\cdot(\\mathbf r'\\times\\mathbf r''')$. The first term is a triple product with a repeated vector and the second contains $\\mathbf r''\\times\\mathbf r''=\\mathbf 0$, so both vanish.` },
                { prompt: `Show that if $\\mathbf r''$ is always parallel to $\\mathbf r$, then $\\mathbf r\\times\\mathbf r'$ is constant.`, answer: `$\\dfrac{d}{dt}(\\mathbf r\\times\\mathbf r')=\\mathbf r'\\times\\mathbf r'+\\mathbf r\\times\\mathbf r''=\\mathbf 0+\\mathbf 0$, since parallel vectors have zero cross product. A vector function with zero derivative is constant.` },
              ],
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
          quiz: [
            {
              question: `What is the unit tangent vector of $\\mathbf r(t)=\\langle e^t,e^{-t},\\sqrt2\\,t\\rangle$ at $t=0$?`,
              options: [`$\\langle1,-1,\\sqrt2\\rangle$`, `$\\tfrac12\\langle1,-1,\\sqrt2\\rangle$`, `$\\tfrac12\\langle1,1,\\sqrt2\\rangle$`, `$\\tfrac{1}{\\sqrt2}\\langle1,1,0\\rangle$`],
              answer: 1,
              explanation: `$\\mathbf r'(t)=\\langle e^t,-e^{-t},\\sqrt2\\rangle$, so $\\mathbf r'(0)=\\langle1,-1,\\sqrt2\\rangle$, with length $\\sqrt{1+1+2}=2$. Dividing gives $\\tfrac12\\langle1,-1,\\sqrt2\\rangle$. $\\langle1,-1,\\sqrt2\\rangle$ is a tangent vector but not a unit one, and $\\tfrac{1}{\\sqrt2}\\langle1,1,0\\rangle$ normalises the position $\\mathbf r(0)$ instead of the velocity.`,
            },
            {
              question: `A particle moves on the sphere $x^2+y^2+z^2=4$. At one instant it is at the north pole $(0,0,2)$. Which of these could be its velocity at that instant?`,
              options: [`$\\langle1,-1,0\\rangle$`, `$\\langle0,0,1\\rangle$`, `$\\langle1,1,1\\rangle$`, `$\\langle0,0,-2\\rangle$`],
              answer: 0,
              explanation: `$|\\mathbf r|$ is constant, so differentiating $\\mathbf r\\cdot\\mathbf r=4$ gives $\\mathbf r\\cdot\\mathbf v=0$: the velocity is perpendicular to the radius $\\langle0,0,2\\rangle$, so its $z$-component is $0$. Only $\\langle1,-1,0\\rangle$ qualifies. A velocity along $\\pm\\mathbf k$ would carry the particle straight off the sphere.`,
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
              prompt: `Find a length, then reparametrise by arc length.`,
              kind: 'problem',
              difficulty: 1,
              parts: [
                { prompt: `Find the length of $\\mathbf r(t)=\\langle2t,t^2,\\ln t\\rangle$ for $1\\le t\\le e$. The speed simplifies to a perfect square.`, answer: `$|\\mathbf r'|^2=4+4t^2+\\dfrac{1}{t^2}=\\left(2t+\\dfrac1t\\right)^2$, so $L=\\int_1^e\\left(2t+\\dfrac1t\\right)dt=(e^2-1)+1=e^2$.` },
                { prompt: `Reparametrise the helix $\\langle\\cos t,\\sin t,t\\rangle$ by arc length from $t=0$, and check that the new curve has unit speed.`, answer: `The speed is $\\sqrt2$, so $s=\\sqrt2\\,t$ and $\\mathbf r(s)=\\left\\langle\\cos\\dfrac{s}{\\sqrt2},\\sin\\dfrac{s}{\\sqrt2},\\dfrac{s}{\\sqrt2}\\right\\rangle$. Its derivative has length $\\sqrt{\\tfrac12\\sin^2+\\tfrac12\\cos^2+\\tfrac12}=1$.` },
              ],
            },
            {
              slug: 'curvature-drill',
              title: 'Curvature',
              prompt: `Compute curvatures with $\\kappa=\\dfrac{|\\mathbf r'\\times\\mathbf r''|}{|\\mathbf r'|^3}$ or the formula for a graph.`,
              kind: 'problem',
              difficulty: 2,
              parts: [
                { prompt: `Find the curvature of the twisted cubic $\\mathbf r(t)=\\langle t,t^2,t^3\\rangle$ at $t=0$ and at $t=1$.`, answer: `$\\mathbf r'=\\langle1,2t,3t^2\\rangle$, $\\mathbf r''=\\langle0,2,6t\\rangle$. At $t=0$ the cross product is $\\langle0,0,2\\rangle$ and $|\\mathbf r'|=1$, so $\\kappa=2$. At $t=1$ it is $\\langle6,-6,2\\rangle$, of length $\\sqrt{76}$, and $|\\mathbf r'|=\\sqrt{14}$, so $\\kappa=\\dfrac{\\sqrt{76}}{14^{3/2}}\\approx0.166$.` },
                { prompt: `Find where $y=\\sin x$ has its greatest curvature, and the value.`, answer: `$\\kappa=\\dfrac{|\\sin x|}{(1+\\cos^2x)^{3/2}}$. The numerator is largest and the denominator smallest together, where $\\sin x=\\pm1$: at $x=\\pi/2+k\\pi$, with $\\kappa=1$.` },
                { prompt: `Find the point on $y=e^x$ of greatest curvature.`, answer: `$\\kappa=\\dfrac{e^x}{(1+e^{2x})^{3/2}}$. Setting the derivative to zero gives $1+e^{2x}=3e^{2x}$, so $e^{2x}=\\tfrac12$ and $x=-\\tfrac12\\ln2\\approx-0.347$. The point is $\\left(-\\tfrac12\\ln2,\\ \\tfrac{1}{\\sqrt2}\\right)$, where $\\kappa=\\dfrac{2}{3\\sqrt3}\\approx0.385$.` },
              ],
            },
            {
              slug: 'frame-and-circle',
              title: 'The frame of a helix',
              prompt: `Compute moving frames and check the curvature of a circle.`,
              kind: 'derivation',
              difficulty: 3,
              parts: [
                { prompt: `For the helix $\\langle\\cos t,\\sin t,t\\rangle$, compute $\\mathbf T$, $\\mathbf N$ and $\\mathbf B$.`, answer: `$\\mathbf T=\\tfrac{1}{\\sqrt2}\\langle-\\sin t,\\cos t,1\\rangle$. Then $\\mathbf T'=\\tfrac{1}{\\sqrt2}\\langle-\\cos t,-\\sin t,0\\rangle$, so $\\mathbf N=\\langle-\\cos t,-\\sin t,0\\rangle$, and $\\mathbf B=\\mathbf T\\times\\mathbf N=\\tfrac{1}{\\sqrt2}\\langle\\sin t,-\\cos t,1\\rangle$.` },
                { prompt: `Show that $\\mathbf N$ always points horizontally toward the axis of the helix.`, answer: `$\\mathbf N$ has zero $z$-component, so it is horizontal, and it equals $-\\langle\\cos t,\\sin t,0\\rangle$, the direction from the point $(\\cos t,\\sin t,t)$ to the point $(0,0,t)$ on the axis.` },
                { prompt: `Parametrise a circle of radius $R$ by arc length, and show directly from $\\kappa=|d\\mathbf T/ds|$ that its curvature is $1/R$ and that $\\mathbf N$ points to the centre.`, answer: `$\\mathbf r(s)=\\langle R\\cos(s/R),R\\sin(s/R)\\rangle$, so $\\mathbf T=\\langle-\\sin(s/R),\\cos(s/R)\\rangle$ and $\\dfrac{d\\mathbf T}{ds}=\\dfrac1R\\langle-\\cos(s/R),-\\sin(s/R)\\rangle$. Its length is $1/R$, and $\\mathbf N=-\\mathbf r/R$ points from the point to the centre.` },
              ],
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
          quiz: [
            {
              question: `What is the curvature of $y=x^3$ at $x=1$?`,
              options: [`$6$`, `$\\tfrac34$`, `$\\dfrac{6}{10^{3/2}}\\approx0.190$`, `$\\tfrac35$`],
              answer: 2,
              explanation: `$f'=3x^2=3$ and $f''=6x=6$ at $x=1$, so $\\kappa=\\dfrac{6}{(1+3^2)^{3/2}}=\\dfrac{6}{10^{3/2}}\\approx0.190$. $\\tfrac34$ comes from forgetting to square $f'$ ($6/4^{3/2}$), and $6$ is $f''$ alone, which equals the curvature only where $f'=0$.`,
            },
            {
              question: `The curve $\\mathbf r(t)=\\langle3\\cos2t,\\ 3\\sin2t,\\ 0\\rangle$ traces a circle of radius $3$ at speed $6$. What is its curvature?`,
              options: [`$2$`, `$\\tfrac23$`, `$\\tfrac16$`, `$\\tfrac13$`],
              answer: 3,
              explanation: `Curvature depends only on the shape: $\\kappa=\\dfrac{|\\mathbf T'(t)|}{|\\mathbf r'(t)|}=\\dfrac{2}{6}=\\dfrac13$, the curvature of any circle of radius $3$. The value $2$ is $|\\mathbf T'(t)|$, the turning rate per unit of $t$, not per unit of distance. Tracing faster turns $\\mathbf T$ faster but covers more distance, and the two effects cancel.`,
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
              prompt: `Find the speed, $a_T$ and $a_N$ for each motion, using $a_T=\\dfrac{\\mathbf v\\cdot\\mathbf a}{|\\mathbf v|}$ and $a_N=\\dfrac{|\\mathbf v\\times\\mathbf a|}{|\\mathbf v|}$.`,
              kind: 'problem',
              difficulty: 1,
              parts: [
                { prompt: `The helix $\\mathbf r=\\langle\\cos t,\\sin t,t\\rangle$.`, answer: `$\\mathbf v=\\langle-\\sin t,\\cos t,1\\rangle$, speed $\\sqrt2$, and $\\mathbf a=\\langle-\\cos t,-\\sin t,0\\rangle$. Then $\\mathbf v\\cdot\\mathbf a=0$, so $a_T=0$, and $\\mathbf v\\times\\mathbf a=\\langle\\sin t,-\\cos t,1\\rangle$, so $a_N=\\sqrt2/\\sqrt2=1$.` },
                { prompt: `$\\mathbf r=\\langle t,t^2,t^3\\rangle$ at $t=1$.`, answer: `$\\mathbf v=\\langle1,2,3\\rangle$, speed $\\sqrt{14}$, and $\\mathbf a=\\langle0,2,6\\rangle$. So $a_T=\\dfrac{22}{\\sqrt{14}}\\approx5.88$ and, with $\\mathbf v\\times\\mathbf a=\\langle6,-6,2\\rangle$, $a_N=\\dfrac{\\sqrt{76}}{\\sqrt{14}}\\approx2.33$.` },
                { prompt: `For the second motion, check that $a_T^2+a_N^2=|\\mathbf a|^2$, and use $a_N=\\kappa v^2$ to recover the curvature found in the previous lesson.`, answer: `$\\dfrac{484+76}{14}=40=0+4+36$. And $\\kappa=\\dfrac{a_N}{v^2}=\\dfrac{\\sqrt{76}}{\\sqrt{14}\\cdot14}=\\dfrac{\\sqrt{76}}{14^{3/2}}\\approx0.166$, as before.` },
              ],
            },
            {
              slug: 'projectile',
              title: 'Clearing a fence',
              prompt: `A baseball is hit from $1$ m above the ground at $40$ m/s, at an angle of $35^\\circ$ to the horizontal. Ignore air resistance and take $g=9.8\\ \\text{m/s}^2$.`,
              kind: 'problem',
              difficulty: 2,
              parts: [
                { prompt: `Does it clear a fence $2.5$ m high that is $120$ m away?`, answer: `$x=40\\cos35^\\circ\\,t\\approx32.77t$ reaches $120$ m at $t\\approx3.66$ s, when $y=1+40\\sin35^\\circ\\,t-4.9t^2\\approx1+84.0-65.7\\approx19.3$ m. So it clears the fence easily.` },
                { prompt: `Find where it lands.`, answer: `$1+22.94t-4.9t^2=0$ gives $t\\approx4.73$ s, so it lands about $154.8$ m away.` },
                { prompt: `Find its speed on landing.`, answer: `The velocity is $\\langle32.77,\\ 22.94-9.8t\\rangle\\approx\\langle32.77,-23.37\\rangle$, of length about $40.2$ m/s. (Energy agrees: $v^2=40^2+2(9.8)(1)$.)` },
              ],
            },
            {
              slug: 'banked-curve',
              title: 'Cars and planets',
              prompt: `Use the normal component of acceleration and the vector $\\mathbf h=\\mathbf r\\times\\mathbf v$.`,
              kind: 'derivation',
              difficulty: 2,
              parts: [
                { prompt: `A car rounds a flat curve of radius $50$ m at $20$ m/s. What is its normal acceleration?`, answer: `$a_N=\\dfrac{v^2}{R}=\\dfrac{400}{50}=8\\ \\text{m/s}^2$.` },
                { prompt: `What coefficient of friction is needed to hold the road?`, answer: `Friction must supply $m a_N\\le\\mu mg$, so $\\mu\\ge\\dfrac{8}{9.8}\\approx0.82$.` },
                { prompt: `Using $\\mathbf h=\\mathbf r\\times\\mathbf v$, prove that motion under a central force stays in a plane.`, answer: `$\\mathbf h'=\\mathbf v\\times\\mathbf v+\\mathbf r\\times\\mathbf a=\\mathbf 0$, because $\\mathbf a$ is parallel to $\\mathbf r$. So $\\mathbf h$ is constant, and $\\mathbf r\\cdot\\mathbf h=\\mathbf r\\cdot(\\mathbf r\\times\\mathbf v)=0$: the particle stays in the plane through the origin perpendicular to $\\mathbf h$.` },
                { prompt: `Show that $|\\mathbf h|=r^2\\,d\\theta/dt$ in polar coordinates in that plane.`, answer: `Write $\\mathbf r=r\\langle\\cos\\theta,\\sin\\theta,0\\rangle$. Then $\\mathbf v=r'\\langle\\cos\\theta,\\sin\\theta,0\\rangle+r\\theta'\\langle-\\sin\\theta,\\cos\\theta,0\\rangle$, and since $\\langle\\cos\\theta,\\sin\\theta,0\\rangle\\times\\langle-\\sin\\theta,\\cos\\theta,0\\rangle=\\mathbf k$, $\\mathbf r\\times\\mathbf v=r^2\\theta'\\,\\mathbf k$.` },
              ],
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
          quiz: [
            {
              question: `A particle has position $\\mathbf r(t)=\\langle3t,\\ t^2,\\ 0\\rangle$. What are $a_T$ and $a_N$ at $t=2$?`,
              options: [`$a_T=\\tfrac65$, $a_N=\\tfrac85$`, `$a_T=8$, $a_N=6$`, `$a_T=2$, $a_N=0$`, `$a_T=\\tfrac85$, $a_N=\\tfrac65$`],
              answer: 3,
              explanation: `$\\mathbf v=\\langle3,4,0\\rangle$ with $|\\mathbf v|=5$, and $\\mathbf a=\\langle0,2,0\\rangle$. So $a_T=\\dfrac{\\mathbf v\\cdot\\mathbf a}{5}=\\dfrac85$ and $a_N=\\dfrac{|\\langle0,0,6\\rangle|}{5}=\\dfrac65$. Check: $\\tfrac{64+36}{25}=4=|\\mathbf a|^2$. The pair $8$ and $6$ forgets to divide by the speed, and the swapped pair mixes up the dot and cross products.`,
            },
            {
              question: `A car on a circular track of radius $100$ m is moving at $20$ m/s and speeding up at $3$ m/s$^2$. What is the size of its acceleration, in m/s$^2$?`,
              options: [`$3$`, `$4$`, `$5$`, `$7$`],
              answer: 2,
              explanation: `$a_T=dv/dt=3$ and $a_N=v^2/R=400/100=4$. They are perpendicular, so $|\\mathbf a|=\\sqrt{3^2+4^2}=5$. The answer $3$ is only the rate of change of speed, which ignores the turning, and $7$ adds perpendicular components as if they were parallel.`,
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

\`\`\`interactive
contour-gradient
{"title": "A contour map of two hills", "f": "3*exp(-((x+1)^2 + y^2)) + 2*exp(-((x-1.3)^2 + (y-0.8)^2)/0.6)", "view": [-3, 3, -2.2, 2.2], "modes": ["level"], "point": [0, -1], "levels": [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2, 2.25, 2.5, 2.75], "caption": "Each thin curve is a level curve f(x, y) = k, with k going up in steps of 0.25, like a hiking map of two hills. Drag P: the bold curve is the level curve through P and the readout gives its height f(P). Where the curves crowd together the ground is steep and |∇f| is large; between the two summits the curves pinch inwards, at a pass."}
\`\`\`

\`\`\`interactive
surface-3d
{"title": "The same two hills as a graph", "f": "3*exp(-((x+1)^2 + y^2)) + 2*exp(-((x-1.3)^2 + (y-0.8)^2)/0.6)", "domain": [-3, 3, -2.2, 2.2], "z": [0, 3], "point": [0, -1], "features": ["contours"], "show": ["contours"], "n": 36, "caption": "The graph z = f(x, y), with the level curves drawn on it at their heights: each one is a horizontal slice of the surface at height k. Drag the picture to turn it, and tilt it to look straight down (elevation 89°): the surface flattens into the contour map above. Where the hillside is steep, slices at equally spaced heights land close together on the map."}
\`\`\`

**Limits.** We say $\\lim_{(x,y)\\to(a,b)}f(x,y)=L$ if $f(x,y)$ is close to $L$ whenever $(x,y)$ is close to $(a,b)$, but not equal to it. Precisely: for every $\\varepsilon>0$ there is $\\delta>0$ with $|f(x,y)-L|<\\varepsilon$ whenever $0<\\sqrt{(x-a)^2+(y-b)^2}<\\delta$.

In one variable there are only two directions of approach. In the plane there are infinitely many paths, and the limit must be the same along all of them. That gives a simple test for failure: if two paths give different values, there is no limit.

**Worked example 1.** For $f(x,y)=\\dfrac{xy}{x^2+y^2}$ at the origin, along the line $y=mx$ we get

$$
f(x,mx)=\\frac{mx^2}{(1+m^2)x^2}=\\frac{m}{1+m^2}.
$$

This depends on $m$: it is $0$ along the $x$-axis and $\\tfrac12$ along $y=x$. So the limit does not exist.

\`\`\`interactive
surface-3d
{"title": "f = xy/(x² + y²) near the origin", "f": "x*y/(x^2 + y^2)", "domain": [-1.5, 1.5, -1.5, 1.5], "z": [-0.6, 0.6], "point": [1, 1], "features": ["paths", "contours"], "show": ["paths"], "paths": [["y = mx", "t", "m*t"]], "m": [1, -3, 3], "t": 1.5, "n": 40, "az": 25, "el": 32, "caption": "The coloured curve lies over the line y = mx and is flat: along it f is the constant m/(1 + m²), shown by the hollow dot where the path reaches the origin. Move m and the curve swings round to another height: 0 for m = 0, 1/2 for m = 1, −1/2 for m = −1. Turn on the level curves: every one of them is a line through the origin, so all those values occur arbitrarily close to it."}
\`\`\`

Checking lines alone is **not** enough. For $g(x,y)=\\dfrac{xy^2}{x^2+y^4}$, every straight line through the origin gives the limit $0$, yet along the parabola $x=y^2$ we get $g=\\dfrac{y^4}{2y^4}=\\tfrac12$. So again there is no limit.

\`\`\`interactive
surface-3d
{"title": "g = xy²/(x² + y⁴): lines are not enough", "f": "x*y^2/(x^2 + y^4)", "domain": [-1.2, 1.2, -1.2, 1.2], "z": [-0.6, 0.6], "point": [1, 1], "features": ["paths"], "show": ["paths"], "paths": [["y = mx", "t", "m*t"], ["x = y²", "t^2", "t"]], "m": [1, -4, 4], "t": 1.1, "n": 48, "az": 35, "el": 30, "caption": "Two paths into the origin. Along y = mx the readout gives g → 0 for every m you try; along the parabola x = y² it gives 1/2. On the surface, a ridge of height 1/2 runs above the parabola right into the origin (and a valley of depth −1/2 above x = −y²), while every straight line crosses the ridge and comes down to 0."}
\`\`\`

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
              prompt: `Describe the domain and sketch several level curves of each function, then describe some level surfaces.`,
              kind: 'problem',
              difficulty: 1,
              parts: [
                { prompt: `$\\sqrt{9-x^2-y^2}$`, answer: `The domain is the closed disk $x^2+y^2\\le9$. The level curves $x^2+y^2=9-k^2$, for $0\\le k\\le3$, are circles about the origin (a point for $k=3$).` },
                { prompt: `$\\ln(x-y)$`, answer: `The domain is the open half-plane $x>y$, below the line $y=x$. The level curves $x-y=e^k$ are the parallel lines $y=x-e^k$.` },
                { prompt: `$y-x^2$`, answer: `The domain is the whole plane. The level curves are the parabolas $y=x^2+k$, all shifts of one another.` },
                { prompt: `Describe the level surfaces of $x^2+y^2+z^2$ and of $x^2+y^2-z$.`, answer: `$x^2+y^2+z^2=k$ gives spheres about the origin for $k>0$ (the origin for $k=0$). $x^2+y^2-z=k$ gives the paraboloids $z=x^2+y^2-k$, stacked vertically.` },
              ],
            },
            {
              slug: 'two-variable-limits',
              title: 'Limits in two variables',
              prompt: `Find each limit or show that it does not exist.`,
              kind: 'problem',
              difficulty: 2,
              parts: [
                { prompt: `$\\lim\\limits_{(x,y)\\to(0,0)}\\dfrac{x^2-y^2}{x^2+y^2}$`, answer: `Does not exist: along the $x$-axis the value is $1$, along the $y$-axis it is $-1$.` },
                { prompt: `$\\lim\\limits_{(x,y)\\to(0,0)}\\dfrac{x^3+y^3}{x^2+y^2}$`, answer: `$0$. In polar coordinates it is $r(\\cos^3\\theta+\\sin^3\\theta)$, at most $2r$ in size.` },
                { prompt: `$\\lim\\limits_{(x,y)\\to(0,0)}\\dfrac{xy}{\\sqrt{x^2+y^2}}$`, answer: `$0$. In polar coordinates it is $r\\cos\\theta\\sin\\theta$, at most $r$ in size.` },
                { prompt: `$\\lim\\limits_{(x,y)\\to(1,2)}\\dfrac{x^2y}{x+y}$`, answer: `The function is continuous there, so substitute: $\\dfrac{1\\cdot2}{3}=\\dfrac23$.` },
                { prompt: `$\\lim\\limits_{(x,y)\\to(0,0)}\\dfrac{\\sin(x^2+y^2)}{x^2+y^2}$`, answer: `$1$. With $u=x^2+y^2\\to0^+$ it is $\\lim_{u\\to0}\\dfrac{\\sin u}{u}=1$.` },
              ],
            },
            {
              slug: 'lines-are-not-enough',
              title: 'Lines are not enough',
              prompt: `Let $g(x,y)=\\dfrac{xy^2}{x^2+y^4}$, with $g(0,0)=0$.`,
              kind: 'derivation',
              difficulty: 3,
              parts: [
                { prompt: `Show that the limit at the origin along every line through the origin is $0$.`, answer: `Along $y=mx$, $g=\\dfrac{m^2x^3}{x^2+m^4x^4}=\\dfrac{m^2x}{1+m^4x^2}\\to0$. Treat the $y$-axis separately: there $x=0$ and $g=0$.` },
                { prompt: `Show that along the parabola $x=y^2$ the limit is $\\tfrac12$.`, answer: `$g(y^2,y)=\\dfrac{y^4}{y^4+y^4}=\\dfrac12$ for every $y\\ne0$.` },
                { prompt: `Is $g$ continuous at the origin?`, answer: `No. Two paths give different limits, so $\\lim_{(x,y)\\to(0,0)}g$ does not exist, let alone equal $g(0,0)=0$.` },
                { prompt: `Give a second function for which the same thing happens with the curve $y=x^3$.`, answer: `$h(x,y)=\\dfrac{x^3y}{x^6+y^2}$. Along $y=mx$, $h=\\dfrac{mx^2}{x^4+m^2}\\to0$ (and $h=0$ on both axes), but along $y=x^3$, $h=\\dfrac{x^6}{2x^6}=\\dfrac12$.` },
              ],
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
          quiz: [
            {
              question: `What is $\\lim\\limits_{(x,y)\\to(0,0)}\\dfrac{x^2+y^2}{\\sqrt{x^2+y^2+1}-1}$?`,
              options: [`$2$`, `$0$`, `$1$`, `It does not exist, because substitution gives $0/0$`],
              answer: 0,
              explanation: `With $u=x^2+y^2\\to0$, multiply by the conjugate: $\\dfrac{u}{\\sqrt{u+1}-1}=\\dfrac{u(\\sqrt{u+1}+1)}{u}=\\sqrt{u+1}+1\\to2$. The expression depends only on the distance to the origin, so every path gives the same value. The form $0/0$ only says that more work is needed, not that the limit fails.`,
            },
            {
              question: `For $f(x,y)=\\dfrac{x^2y}{x^4+y^2}$, the limit at the origin along every straight line through the origin is $0$. What can you conclude?`,
              options: [`The limit is $0$`, `The limit does not exist: along $y=x^2$ the value is $\\tfrac12$`, `The limit is $0$, provided $f(0,0)$ is defined as $0$`, `Nothing, because a two-variable limit can only be found in polar coordinates`],
              answer: 1,
              explanation: `Lines are not all the paths. Along $y=x^2$, $f=\\dfrac{x^4}{x^4+x^4}=\\dfrac12$, which differs from $0$, so there is no limit. The value $f(0,0)$ never affects a limit. Polar coordinates can help to prove a limit, but a two-path argument is enough to disprove one.`,
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

\`\`\`interactive
surface-3d
{"title": "Partial derivatives as slopes of traces", "f": "x^3*y^2 + sin(x*y)", "domain": [-1.25, 1.25, -1.25, 1.25], "z": [-4.5, 4.5], "point": [1, 1], "features": ["traces", "plane"], "show": ["traces"], "n": 36, "caption": "The function of worked example 1 below. The red curve is the trace in the plane y = b (only x varies) and its dashed tangent has slope f_x(a, b); the green curve is the trace in the plane x = a, with slope f_y(a, b). At P = (1, 1) the readouts give f_x = 3 + cos 1 ≈ 3.540 and f_y = 2 + cos 1 ≈ 2.540, as the formulas say. Move a and b and watch each slope change with its own trace."}
\`\`\`

**Worked example 1.** Let $f(x,y)=x^3y^2+\\sin(xy)$. Then

$$
f_x=3x^2y^2+y\\cos(xy),\\qquad f_y=2x^3y+x\\cos(xy).
$$

\`\`\`interactive
contour-gradient
{"title": "The definition: difference quotients along each axis", "f": "x^3*y^2 + sin(x*y)", "view": [-2, 2, -2, 2], "modes": ["partials"], "point": [1, 1], "h": 0.5, "levels": 16, "caption": "P = (a, b) sits on the contour map of the same function. The red step moves only x, the green step only y. Slide h towards 0 (from either side): the two difference quotients settle on f_x(a, b) and f_y(a, b), here 3.540 and 2.540 at (1, 1). Drag P and check other points against the formulas above."}
\`\`\`

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
              prompt: `Find all first partial derivatives of each function.`,
              kind: 'problem',
              difficulty: 1,
              parts: [
                { prompt: `$f(x,y)=x^2e^{xy}$`, answer: `$f_x=2xe^{xy}+x^2ye^{xy}=(2x+x^2y)e^{xy}$ and $f_y=x^3e^{xy}$.` },
                { prompt: `For $f(x,y)=x^2e^{xy}$, find $f_{xy}$ and $f_{yx}$, and check that they agree.`, answer: `$f_{xy}=x^2e^{xy}+(2x+x^2y)xe^{xy}=(3x^2+x^3y)e^{xy}$ and $f_{yx}=3x^2e^{xy}+x^3ye^{xy}$, the same.` },
                { prompt: `$\\ln(x^2+y^2)$`, answer: `$\\dfrac{2x}{x^2+y^2}$ and $\\dfrac{2y}{x^2+y^2}$.` },
                { prompt: `$\\arctan(y/x)$`, answer: `$\\dfrac{1}{1+y^2/x^2}\\cdot\\left(-\\dfrac{y}{x^2}\\right)=-\\dfrac{y}{x^2+y^2}$ and $\\dfrac{1}{1+y^2/x^2}\\cdot\\dfrac1x=\\dfrac{x}{x^2+y^2}$.` },
                { prompt: `$w=xyz+x^2z^3$`, answer: `$w_x=yz+2xz^3$, $w_y=xz$, $w_z=xy+3x^2z^2$.` },
              ],
            },
            {
              slug: 'check-pdes',
              title: 'Check partial differential equations',
              prompt: `Compute the partial derivatives each equation needs.`,
              kind: 'problem',
              difficulty: 2,
              parts: [
                { prompt: `Show that $u=\\ln(x^2+y^2)$ satisfies Laplace's equation away from the origin.`, answer: `$u_x=\\dfrac{2x}{x^2+y^2}$, so $u_{xx}=\\dfrac{2(y^2-x^2)}{(x^2+y^2)^2}$. By symmetry $u_{yy}=\\dfrac{2(x^2-y^2)}{(x^2+y^2)^2}$, and the sum is $0$.` },
                { prompt: `Show that $u=e^{-kt}\\sin x$ satisfies the heat equation $u_t=ku_{xx}$.`, answer: `$u_t=-ke^{-kt}\\sin x$ and $u_{xx}=-e^{-kt}\\sin x$, so $ku_{xx}=-ke^{-kt}\\sin x=u_t$.` },
                { prompt: `For which constants $a$ does $u=\\sin(x-at)$ satisfy the wave equation $u_{tt}=4u_{xx}$?`, answer: `$u_{tt}=-a^2\\sin(x-at)$ and $u_{xx}=-\\sin(x-at)$, so $a^2=4$: $a=2$ or $a=-2$.` },
              ],
            },
            {
              slug: 'clairaut-fails',
              title: 'When Clairaut fails',
              prompt: `Let $f(x,y)=\\dfrac{xy(x^2-y^2)}{x^2+y^2}$ for $(x,y)\\ne(0,0)$ and $f(0,0)=0$.`,
              kind: 'derivation',
              difficulty: 3,
              parts: [
                { prompt: `Show from the definition that $f_x(0,y)=-y$ and $f_y(x,0)=x$.`, answer: `$f(0,y)=0$, so $f_x(0,y)=\\lim_{h\\to0}\\dfrac{f(h,y)}{h}=\\lim_{h\\to0}\\dfrac{y(h^2-y^2)}{h^2+y^2}=-y$ (also true for $y=0$, where $f(h,0)=0$). In the same way $\\dfrac{f(x,h)}{h}=\\dfrac{x(x^2-h^2)}{x^2+h^2}\\to x$.` },
                { prompt: `Deduce that $f_{xy}(0,0)=-1$ and $f_{yx}(0,0)=1$.`, answer: `$f_{xy}(0,0)$ is the $y$-derivative of $f_x(0,y)=-y$, which is $-1$. $f_{yx}(0,0)$ is the $x$-derivative of $f_y(x,0)=x$, which is $1$.` },
                { prompt: `Which hypothesis of Clairaut's theorem fails?`, answer: `The mixed partials are not continuous at the origin. Away from it they are equal rational functions whose values near the origin depend on the direction of approach.` },
              ],
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
          quiz: [
            {
              question: `For $f(x,y)=x^2y^3-4xy$, what is $f_{xy}(1,2)$?`,
              options: [`$20$`, `$24$`, `$16$`, `$12$`],
              answer: 0,
              explanation: `$f_x=2xy^3-4y$, then $f_{xy}=6xy^2-4=24-4=20$. Answering $24$ drops the $-4$ from the term $-4xy$. $16$ is $f_{xx}=2y^3$ and $12$ is $f_{yy}=6x^2y$, both at $(1,2)$.`,
            },
            {
              question: `With $x=r\\cos\\theta$, $y=r\\sin\\theta$ and $r=\\sqrt{x^2+y^2}$, at the point where $r=2$ and $\\theta=\\pi/3$ you have $\\partial x/\\partial r=\\cos\\theta=\\tfrac12$. What is $\\partial r/\\partial x$ there?`,
              options: [`$2$`, `$1$`, `$\\tfrac12$`, `$\\tfrac{\\sqrt3}{2}$`],
              answer: 2,
              explanation: `$\\dfrac{\\partial r}{\\partial x}=\\dfrac{x}{\\sqrt{x^2+y^2}}=\\dfrac xr=\\cos\\theta=\\dfrac12$. It is not the reciprocal $2$: $\\partial x/\\partial r$ holds $\\theta$ fixed, while $\\partial r/\\partial x$ holds $y$ fixed, so they describe different motions. Partial derivatives are not fractions that can be flipped.`,
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

\`\`\`interactive
surface-3d
{"title": "The tangent plane to z = √(x² + y²) at (3, 4)", "f": "sqrt(x^2 + y^2)", "domain": [1, 5, 1, 5], "point": [3, 4], "features": ["plane", "traces"], "show": ["plane", "traces"], "az": -50, "el": 20, "caption": "This is the surface of worked example 1 below. The two dashed lines are tangent to the traces cut by the planes y = b and x = a, with slopes f_x and f_y, and the purple plane is the one that contains both. At P = (3, 4) the readout gives f = 5, f_x = 0.6 and f_y = 0.8. Drag P (or use the a and b sliders) and the plane follows, always built from the two slopes at P. Rotate the view until you look along the plane edge-on: near P the surface and the plane are hard to tell apart."}
\`\`\`

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

\`\`\`interactive
surface-3d
{"title": "Both partials exist, but no tangent plane", "f": "x*y/(x^2 + y^2)", "special": [[0, 0, 0]], "domain": [-1.5, 1.5, -1.5, 1.5], "z": [-0.6, 0.6], "point": [0, 0], "features": ["plane", "traces"], "show": ["plane", "traces"], "n": 40, "az": 25, "el": 30, "caption": "Here f = xy/(x² + y²) with f(0, 0) = 0. At P = (0, 0) both traces are flat lines along the axes, so f_x = f_y = 0 and the formula gives the plane z = 0. But the surface does not hug that plane: just off the axes it jumps to ±1/2. Move P away from the origin and the plane fits closely again, because there the partials are continuous."}
\`\`\`

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
              prompt: `Use $z=f(a,b)+f_x(a,b)(x-a)+f_y(a,b)(y-b)$.`,
              kind: 'problem',
              difficulty: 1,
              parts: [
                { prompt: `Find the tangent plane to $z=x^2+y^2$ at $(1,2,5)$.`, answer: `$f_x=2x=2$ and $f_y=2y=4$, so $z=5+2(x-1)+4(y-2)$, that is $z=2x+4y-5$.` },
                { prompt: `Find the tangent plane to $z=xe^y$ at $(1,0,1)$.`, answer: `$f_x=e^y=1$ and $f_y=xe^y=1$, so $z=1+(x-1)+y=x+y$.` },
                { prompt: `Find the tangent plane to $z=\\ln(x-2y)$ at $(3,1,0)$.`, answer: `$f_x=\\dfrac{1}{x-2y}=1$ and $f_y=\\dfrac{-2}{x-2y}=-2$, so $z=(x-3)-2(y-1)=x-2y-1$.` },
                { prompt: `Use the linearisation of $f(x,y)=x^2y^3$ at $(2,1)$ to estimate $f(2.01,0.98)$, and compare with the true value.`, answer: `$f=4$, $f_x=2xy^3=4$, $f_y=3x^2y^2=12$, so $L=4+4(0.01)+12(-0.02)=3.80$. The true value is $2.01^2\\cdot0.98^3\\approx3.8025$.` },
              ],
            },
            {
              slug: 'error-propagation',
              title: 'Error propagation',
              prompt: `Estimate the largest errors with differentials.`,
              kind: 'problem',
              difficulty: 2,
              parts: [
                { prompt: `Two resistors $R_1=10\\pm0.1\\ \\Omega$ and $R_2=20\\pm0.2\\ \\Omega$ are in parallel, with $R=\\dfrac{R_1R_2}{R_1+R_2}$. Find $R$ and estimate the largest error.`, answer: `$R=\\dfrac{200}{30}=\\dfrac{20}{3}\\approx6.667\\ \\Omega$. $\\dfrac{\\partial R}{\\partial R_1}=\\dfrac{R_2^2}{(R_1+R_2)^2}=\\dfrac49$ and $\\dfrac{\\partial R}{\\partial R_2}=\\dfrac19$, so $dR=\\tfrac49(0.1)+\\tfrac19(0.2)\\approx0.067\\ \\Omega$.` },
                { prompt: `The period of a pendulum is $T=2\\pi\\sqrt{L/g}$. If $L$ is measured with error $1\\%$ and $T$ with error $0.5\\%$, what is the largest relative error in $g$ computed from them?`, answer: `$g=\\dfrac{4\\pi^2L}{T^2}$, so $\\dfrac{dg}{g}=\\dfrac{dL}{L}-2\\dfrac{dT}{T}$. At worst the signs combine: $1\\%+2(0.5\\%)=2\\%$.` },
              ],
            },
            {
              slug: 'not-differentiable',
              title: 'Partials without differentiability',
              prompt: `Let $f(x,y)=\\dfrac{xy}{x^2+y^2}$ with $f(0,0)=0$.`,
              kind: 'derivation',
              difficulty: 3,
              parts: [
                { prompt: `Show from the definition that $f_x(0,0)=f_y(0,0)=0$.`, answer: `$f(h,0)=0$ for every $h$, so $f_x(0,0)=\\lim_{h\\to0}\\dfrac{0-0}{h}=0$. By symmetry $f_y(0,0)=0$.` },
                { prompt: `Show that $f$ is not continuous at the origin, and explain why it therefore cannot be differentiable there.`, answer: `Along $y=x$, $f=\\tfrac12$, but $f(0,0)=0$. A differentiable function is continuous, because $f-L\\to0$ and $L$ is continuous. So $f$ is not differentiable at the origin.` },
                { prompt: `Find a function that is continuous at the origin and has both partials there, yet is not differentiable: try $\\sqrt{|xy|}$, and look along the line $y=x$.`, answer: `$\\sqrt{|xy|}$ is continuous and zero on both axes, so both partials at $0$ are $0$ and $L=0$. Along $y=x$ the error is $|x|$, while the distance is $\\sqrt2|x|$. The ratio is $1/\\sqrt2$, which does not tend to $0$, so $f$ is not differentiable.` },
              ],
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
          quiz: [
            {
              question: `Use the linearisation of $f(x,y)=x^2/y$ at $(3,1)$ to estimate $f(3.1,\\ 0.98)$.`,
              options: [`$9.42$`, `$9.60$`, `$8.22$`, `$9.78$`],
              answer: 3,
              explanation: `$f=9$, $f_x=2x/y=6$ and $f_y=-x^2/y^2=-9$. With $dx=0.1$ and $dy=-0.02$, $L=9+6(0.1)-9(-0.02)=9+0.6+0.18=9.78$ (the true value is about $9.806$). $9.42$ loses the sign of $dy$: decreasing $y$ increases $x^2/y$. $9.60$ ignores the change in $y$.`,
            },
            {
              question: `Which condition guarantees that $f$ is differentiable at $(a,b)$?`,
              options: [`$f_x$ and $f_y$ exist at $(a,b)$`, `$f_x$ and $f_y$ exist near $(a,b)$ and are continuous at $(a,b)$`, `$f$ is continuous at $(a,b)$`, `$f$ has the same limit along every line through $(a,b)$`],
              answer: 1,
              explanation: `Continuous partials near the point is the sufficient condition of the lesson. Partials at a single point see only two directions: $xy/(x^2+y^2)$ has both and is not even continuous. Continuity is not enough either: $\\sqrt{|xy|}$ is continuous, has both partials, and still has no tangent plane at the origin.`,
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
              prompt: `Apply the chain rule, adding one term for each path in the tree diagram.`,
              kind: 'problem',
              difficulty: 1,
              parts: [
                { prompt: `For $w=xy+yz+zx$ with $x=t$, $y=t^2$, $z=t^3$, find $dw/dt$ by the chain rule.`, answer: `$\\dfrac{dw}{dt}=(y+z)(1)+(x+z)(2t)+(x+y)(3t^2)=(t^2+t^3)+(2t^2+2t^4)+(3t^3+3t^4)=3t^2+4t^3+5t^4$.` },
                { prompt: `Check by substituting first.`, answer: `$w=t^3+t^5+t^4$, so $w'=3t^2+5t^4+4t^3$, the same.` },
                { prompt: `For $z=e^x\\sin y$ with $x=st^2$ and $y=s^2t$, find $\\partial z/\\partial s$.`, answer: `$z_s=z_xx_s+z_yy_s=e^x\\sin y\\cdot t^2+e^x\\cos y\\cdot2st=e^x(t^2\\sin y+2st\\cos y)$, with $x=st^2$ and $y=s^2t$.` },
                { prompt: `Find $\\partial z/\\partial t$.`, answer: `$z_t=e^x\\sin y\\cdot2st+e^x\\cos y\\cdot s^2=e^x(2st\\sin y+s^2\\cos y)$.` },
              ],
            },
            {
              slug: 'implicit-partials',
              title: 'Implicit partial derivatives',
              prompt: `Differentiate implicitly with $\\dfrac{\\partial z}{\\partial x}=-\\dfrac{F_x}{F_z}$ and its relatives.`,
              kind: 'problem',
              difficulty: 2,
              parts: [
                { prompt: `For $x^2+y^2+z^2=3xyz$, find $\\partial z/\\partial x$ and $\\partial z/\\partial y$ at $(1,1,1)$.`, answer: `With $F=x^2+y^2+z^2-3xyz$, at $(1,1,1)$: $F_x=2x-3yz=-1$, $F_y=-1$, $F_z=2z-3xy=-1$. So both partials are $-\\dfrac{-1}{-1}=-1$.` },
                { prompt: `For $x\\cos y+y\\cos z+z\\cos x=1$, write $\\partial z/\\partial x$ in terms of $x,y,z$.`, answer: `$F_x=\\cos y-z\\sin x$ and $F_z=-y\\sin z+\\cos x$, so $\\dfrac{\\partial z}{\\partial x}=-\\dfrac{\\cos y-z\\sin x}{\\cos x-y\\sin z}$.` },
                { prompt: `Use $dy/dx=-F_x/F_y$ to find the slope of $x^3+y^3=6xy$ at $(3,3)$.`, answer: `$F_x=3x^2-6y=9$ and $F_y=3y^2-6x=9$, so the slope is $-1$.` },
              ],
            },
            {
              slug: 'change-variables',
              title: 'Change of variables',
              prompt: `Use the chain rule to change variables.`,
              kind: 'derivation',
              difficulty: 3,
              parts: [
                { prompt: `Show that $z=f(x-ct)+g(x+ct)$ satisfies the wave equation $z_{tt}=c^2z_{xx}$ for any twice differentiable $f$ and $g$.`, answer: `$z_t=-cf'+cg'$, so $z_{tt}=c^2f''+c^2g''$. Also $z_x=f'+g'$ and $z_{xx}=f''+g''$, so $z_{tt}=c^2z_{xx}$.` },
                { prompt: `If $z=f(x,y)$ with $x=r\\cos\\theta$ and $y=r\\sin\\theta$, prove that $z_x^2+z_y^2=z_r^2+\\dfrac{1}{r^2}z_\\theta^2$.`, answer: `$z_r=z_x\\cos\\theta+z_y\\sin\\theta$ and $z_\\theta=-z_xr\\sin\\theta+z_yr\\cos\\theta$. Then $z_r^2+\\dfrac{z_\\theta^2}{r^2}=(z_x\\cos\\theta+z_y\\sin\\theta)^2+(-z_x\\sin\\theta+z_y\\cos\\theta)^2$. The cross terms cancel and $\\cos^2\\theta+\\sin^2\\theta=1$, leaving $z_x^2+z_y^2$.` },
              ],
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
          quiz: [
            {
              question: `Let $z=x^2y+y^2$ with $x=2t+1$ and $y=t^2$. What is $dz/dt$ at $t=1$?`,
              options: [`$17$`, `$34$`, `$12$`, `$22$`],
              answer: 1,
              explanation: `At $t=1$, $x=3$ and $y=1$, so $z_x=2xy=6$ and $z_y=x^2+2y=11$, while $x'=2$ and $y'=2t=2$. Then $\\dfrac{dz}{dt}=6\\cdot2+11\\cdot2=34$. $17$ adds $z_x+z_y$ without the inner derivatives. $12$ and $22$ each keep only one path of the tree diagram.`,
            },
            {
              question: `Let $z=x^2+y^2$, and follow the path $y=x^3$. At $x=1$, what are $\\partial z/\\partial x$ (with $y$ held fixed) and $dz/dx$ along the path?`,
              options: [`$8$ and $8$`, `$2$ and $2$`, `$8$ and $2$`, `$2$ and $8$`],
              answer: 3,
              explanation: `$\\partial z/\\partial x=2x=2$ holds $y$ fixed. Along the path $y$ changes too, so $\\dfrac{dz}{dx}=z_x+z_y\\dfrac{dy}{dx}=2x+2y\\cdot3x^2=2+6=8$. Treating the two as the same misses the path through $y$ in the tree diagram.`,
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

In the interactive below, $P$ starts at $(1,2)$ and $\\mathbf u$ at $\\langle\\tfrac35,\\tfrac45\\rangle$. The thick orange bar along $\\mathbf u$ is the shadow of the gradient arrow on the line of $\\mathbf u$: its signed length is $\\nabla f\\cdot\\mathbf u$.

\`\`\`interactive
contour-gradient
{"title": "Gradient and directional derivative of x² + 3xy", "f": "x^2 + 3*x*y", "view": [-3, 3, -3, 3], "modes": ["gradient", "level"], "point": [1, 2], "angle": 53.13, "levels": 14, "caption": "Drag P, or the tip of u (the slider turns u from the keyboard). At the start the readout gives the worked example's value 36/5 = 7.2. Turn u until the rate is largest: u then points along ∇f and the rate is |∇f| = √73 ≈ 8.54. Turn u along the highlighted level curve and the rate drops to 0, because ∇f is perpendicular to the level curve. Then drag P to where the contours crowd and watch ∇f grow."}
\`\`\`

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
              prompt: `Use $D_{\\mathbf u}f=\\nabla f\\cdot\\mathbf u$ with a unit vector $\\mathbf u$.`,
              kind: 'problem',
              difficulty: 1,
              parts: [
                { prompt: `Find the derivative of $f(x,y)=xe^y+\\cos(xy)$ at $(2,0)$ in the direction of $\\langle3,-4\\rangle$.`, answer: `$\\nabla f=\\langle e^y-y\\sin(xy),\\ xe^y-x\\sin(xy)\\rangle=\\langle1,2\\rangle$ at $(2,0)$, and $\\mathbf u=\\tfrac15\\langle3,-4\\rangle$. So $D_{\\mathbf u}f=\\dfrac{3-8}{5}=-1$.` },
                { prompt: `The temperature in a plate is $T=\\dfrac{100}{1+x^2+y^2}$. At $(1,2)$, in which direction does it increase fastest, and at what rate?`, answer: `$\\nabla T=\\dfrac{-200}{(1+x^2+y^2)^2}\\langle x,y\\rangle=\\langle-\\tfrac{50}{9},-\\tfrac{100}{9}\\rangle$. The fastest increase is toward the origin, along $\\langle-1,-2\\rangle$, at rate $|\\nabla T|=\\dfrac{50\\sqrt5}{9}\\approx12.4$.` },
                { prompt: `In which directions does it not change at all?`, answer: `Perpendicular to the gradient: along $\\pm\\dfrac{1}{\\sqrt5}\\langle2,-1\\rangle$.` },
              ],
            },
            {
              slug: 'level-surface-planes',
              title: 'Tangent planes to level surfaces',
              prompt: `Use $\\nabla F$ as a normal vector to the level surface $F=k$.`,
              kind: 'problem',
              difficulty: 2,
              parts: [
                { prompt: `Find the tangent plane and normal line to the cone $z^2=x^2+y^2$ at $(3,4,5)$.`, answer: `With $F=x^2+y^2-z^2$, $\\nabla F=\\langle6,8,-10\\rangle$, parallel to $\\langle3,4,-5\\rangle$. The plane is $3(x-3)+4(y-4)-5(z-5)=0$, that is $3x+4y-5z=0$, and the normal line is $(3,4,5)+t\\langle3,4,-5\\rangle$.` },
                { prompt: `Why does the plane pass through the origin?`, answer: `A cone is made of lines through its vertex. The line from the origin through $(3,4,5)$ lies on the cone, so it lies in the tangent plane there, and it passes through the origin.` },
                { prompt: `Find the points on the surface $x^2+2y^2+3z^2=12$ where the tangent plane is parallel to the plane $x+y+z=1$.`, answer: `$\\nabla F=\\langle2x,4y,6z\\rangle$ must be parallel to $\\langle1,1,1\\rangle$, so $x=2y=3z$. Put $(x,y,z)=s(6,3,2)$: $66s^2=12$, so $s=\\pm\\sqrt{2/11}$. The points are $\\pm\\sqrt{2/11}\\,(6,3,2)$.` },
              ],
            },
            {
              slug: 'gradient-theory',
              title: 'Why the gradient is perpendicular',
              prompt: `Prove the basic facts about the gradient.`,
              kind: 'derivation',
              difficulty: 2,
              parts: [
                { prompt: `Let $\\mathbf r(t)$ be any curve lying in the level surface $F(x,y,z)=k$. Differentiate $F(\\mathbf r(t))=k$ and use the chain rule to prove that $\\nabla F$ is perpendicular to $\\mathbf r'(t)$.`, answer: `The chain rule gives $\\dfrac{d}{dt}F(\\mathbf r(t))=\\nabla F\\cdot\\mathbf r'(t)$, and the derivative of the constant $k$ is $0$. So $\\nabla F\\cdot\\mathbf r'=0$ for every curve in the surface, and $\\nabla F$ is perpendicular to every tangent direction.` },
                { prompt: `Show that the largest directional derivative at a point is $|\\nabla f|$, using the Cauchy-Schwarz inequality.`, answer: `$D_{\\mathbf u}f=\\nabla f\\cdot\\mathbf u\\le|\\nabla f||\\mathbf u|=|\\nabla f|$ for every unit $\\mathbf u$. If $\\nabla f\\ne\\mathbf 0$, the choice $\\mathbf u=\\nabla f/|\\nabla f|$ gives exactly $|\\nabla f|$.` },
                { prompt: `If $\\nabla f=\\mathbf 0$ at a point, what can you say about every directional derivative there?`, answer: `They are all $\\mathbf 0\\cdot\\mathbf u=0$: the point is a critical point, flat in every direction to first order.` },
              ],
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
          quiz: [
            {
              question: `For $f(x,y,z)=xyz$, what is the directional derivative at $(1,2,3)$ in the direction of $\\langle2,1,-2\\rangle$?`,
              options: [`$11$`, `$7$`, `$\\tfrac{11}{3}$`, `$\\tfrac{19}{3}$`],
              answer: 2,
              explanation: `$\\nabla f=\\langle yz,xz,xy\\rangle=\\langle6,3,2\\rangle$, and the unit vector is $\\tfrac13\\langle2,1,-2\\rangle$, so $D_{\\mathbf u}f=\\dfrac{12+3-4}{3}=\\dfrac{11}{3}$. $11$ forgets to divide by the length $3$. $7=|\\nabla f|$ is the largest rate over all directions, not the rate in this one.`,
            },
            {
              question: `At a point on a contour map of $f$, the gradient is $\\nabla f=\\langle3,-4\\rangle$. In which direction does $f$ stay constant to first order?`,
              options: [`$\\langle4,3\\rangle$`, `$\\langle3,-4\\rangle$`, `$\\langle-3,4\\rangle$`, `$\\langle3,4\\rangle$`],
              answer: 0,
              explanation: `$f$ is constant along the level curve, which is perpendicular to the gradient: $\\langle4,3\\rangle\\cdot\\langle3,-4\\rangle=0$. $\\langle3,-4\\rangle$ is the direction of fastest increase and $\\langle-3,4\\rangle$ of fastest decrease. $\\langle3,4\\rangle$ has dot product $-7$, so $f$ decreases along it.`,
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

\`\`\`interactive
surface-3d
{"title": "A saddle: z = x² − y²", "f": "x^2 - y^2", "domain": [-2, 2, -2, 2], "point": [0, 0], "features": ["traces", "plane"], "show": ["traces"], "n": 32, "caption": "At P = (0, 0) the red trace (along the x-axis) is a parabola opening up and the green trace (along the y-axis) opens down, so the origin is a minimum one way and a maximum the other. Both slopes are 0 there, and the tangent plane is horizontal, yet the surface crosses it. Move P away and the slopes stop being zero."}
\`\`\`

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

\`\`\`interactive
contour-gradient
{"title": "Critical points of x³ + y³ − 3xy", "f": "x^3 + y^3 - 3*x*y", "view": [-1.6, 2.2, -1.6, 2.2], "modes": ["critical", "gradient"], "point": [1.6, 0.4], "levels": [-4, -3, -2, -1.5, -0.9, -0.75, -0.5, -0.25, 0, 0.5, 1, 2, 3, 4, 6, 8], "caption": "The widget finds where ∇f = 0 and classifies each point with D = f_xx f_yy − f_xy². Use the buttons to move P to (0, 0) and to (1, 1) and compare the readouts with the worked example: D = −9 (a saddle, where the level curve f = 0 crosses itself) and D = 27 with f_xx = 6 (a minimum, inside closed contours). Drag P elsewhere and the gradient arrow shows ∇f ≠ 0; the Gradient view adds the level curve through P."}
\`\`\`

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
              prompt: `Find and classify all critical points of each function, using $D=f_{xx}f_{yy}-f_{xy}^2$. Give the function values at any extrema.`,
              kind: 'problem',
              difficulty: 1,
              parts: [
                { prompt: `$x^2+xy+y^2-3x$`, answer: `$f_x=2x+y-3=0$ and $f_y=x+2y=0$ give $(2,-1)$. $D=2\\cdot2-1=3>0$ with $f_{xx}=2>0$: a minimum, with value $-3$.` },
                { prompt: `$x^4+y^4-4xy+1$`, answer: `$y=x^3$ and $x=y^3$ give $x=x^9$, so $(0,0)$, $(1,1)$, $(-1,-1)$. $D=144x^2y^2-16$: at $(0,0)$ it is $-16$, a saddle; at $(\\pm1,\\pm1)$ it is $128$ with $f_{xx}=12>0$, minima with value $-1$.` },
                { prompt: `$xy\\,e^{-(x^2+y^2)/2}$`, answer: `$f_x=y(1-x^2)e^{-(x^2+y^2)/2}$ and $f_y=x(1-y^2)e^{-(x^2+y^2)/2}$. Saddle at $(0,0)$ ($D=-1$). Maxima at $(1,1)$ and $(-1,-1)$, value $1/e$; minima at $(1,-1)$ and $(-1,1)$, value $-1/e$ (there $D=4/e^2>0$).` },
              ],
            },
            {
              slug: 'least-squares-line',
              title: 'Fit a line',
              prompt: `Fit a line $y=mx+c$ by minimising $S(m,c)=\\sum(mx_i+c-y_i)^2$.`,
              kind: 'problem',
              difficulty: 2,
              parts: [
                { prompt: `Find the least squares line through the points $(0,1)$, $(1,3)$ and $(2,4)$ by minimising $S(m,c)$.`, answer: `With $\\sum x=3$, $\\sum x^2=5$, $\\sum y=8$, $\\sum xy=11$, the equations $S_m=S_c=0$ are $5m+3c=11$ and $3m+3c=8$. So $m=\\tfrac32$ and $c=\\tfrac76$.` },
                { prompt: `Show that the critical point is a minimum.`, answer: `$S_{mm}=2\\sum x^2=10$, $S_{cc}=2n=6$, $S_{mc}=2\\sum x=6$, so $D=60-36=24>0$ with $S_{mm}>0$: a minimum.` },
                { prompt: `Write down the normal equations for $n$ general points.`, answer: `$m\\sum x_i^2+c\\sum x_i=\\sum x_iy_i$ and $m\\sum x_i+nc=\\sum y_i$.` },
                { prompt: `Prove that the fitted line passes through the point $(\\bar x,\\bar y)$ of averages.`, answer: `Divide the second normal equation by $n$: $m\\bar x+c=\\bar y$. (The equation $S_c=0$ says that the sum of the errors is zero.)` },
              ],
            },
            {
              slug: 'degenerate-cases',
              title: 'When the test fails',
              prompt: `Each function has a critical point at the origin where $D=0$. Decide by direct reasoning whether it is a maximum, a minimum or neither.`,
              kind: 'derivation',
              difficulty: 3,
              parts: [
                { prompt: `$x^4+y^4$`, answer: `A minimum: the function is $0$ at the origin and positive everywhere else.` },
                { prompt: `$x^2+y^4$`, answer: `A minimum, for the same reason.` },
                { prompt: `$x^2-y^4$`, answer: `Neither: it is positive along the $x$-axis and negative along the $y$-axis, arbitrarily close to the origin.` },
                { prompt: `$x^3-3xy^2$, the monkey saddle. Explain the name.`, answer: `Neither. In polar form it is $r^3\\cos3\\theta$, which changes sign six times around the origin: three valleys and three hills. A monkey sitting on it has room for two legs and a tail.` },
              ],
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
          quiz: [
            {
              question: `Classify the critical points of $f(x,y)=x^3-3x+y^2-2y$.`,
              options: [`$(1,1)$ is a saddle and $(-1,1)$ a local minimum`, `$(1,1)$ is a local minimum and $(-1,1)$ a saddle`, `$(1,1)$ is a local minimum and $(-1,1)$ a local maximum`, `Both are local minima`],
              answer: 1,
              explanation: `$f_x=3x^2-3$ and $f_y=2y-2$ vanish at $(\\pm1,1)$. With $f_{xx}=6x$, $f_{yy}=2$, $f_{xy}=0$, $D=12x$. At $(1,1)$, $D=12>0$ and $f_{xx}>0$: a minimum. At $(-1,1)$, $D=-12<0$: a saddle. Calling $(-1,1)$ a maximum because $f_{xx}<0$ skips the sign of $D$, which comes first.`,
            },
            {
              question: `At a critical point, $f_{xx}=2$, $f_{yy}=8$ and $f_{xy}=5$. What kind of point is it?`,
              options: [`A saddle`, `A local minimum`, `A local maximum`, `The test is inconclusive`],
              answer: 0,
              explanation: `$D=2\\cdot8-5^2=-9<0$, so it is a saddle. Positive $f_{xx}$ and $f_{yy}$ only say the traces along the axes curve up; a large mixed partial means the function curves down along some diagonal direction. The test is inconclusive only when $D=0$.`,
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

\`\`\`interactive
contour-gradient
{"title": "Extremes of x² + y² − 2x on the disk x² + y² ≤ 4", "f": "x^2 + y^2 - 2*x", "view": [-2.6, 2.6, -2.6, 2.6], "modes": ["lagrange"], "g": "x^2 + y^2", "c": 4, "region": true, "point": [0, 2], "levels": 12, "caption": "The disk is shaded and its boundary circle is drawn in red. P slides round the circle (drag it, or use the slider, which is the angle t in x = 2cos t, y = 2sin t). The graph underneath is f along the boundary, the one-variable problem of step 2: it runs between 0 at t = 0 and 8 at t = π. Show the candidates to add the interior critical point (1, 0), where f = −1, and compare all three values, as in the worked example."}
\`\`\`

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
              prompt: `Find the absolute maximum and minimum of $f(x,y)=xy-x-y+3$ on the closed triangle with vertices $(0,0)$, $(2,0)$ and $(0,4)$.`,
              kind: 'problem',
              difficulty: 2,
              parts: [
                { prompt: `Check the interior critical point.`, answer: `$f_x=y-1$ and $f_y=x-1$ vanish at $(1,1)$, which is inside the triangle, with $f(1,1)=2$.` },
                { prompt: `Check each of the three edges.`, answer: `On $y=0$, $f=3-x$, with no critical point inside. On $x=0$, $f=3-y$, the same. On the hypotenuse $y=4-2x$, $f=-2x^2+5x-1$, with a maximum $\\tfrac{17}{8}$ at $x=\\tfrac54$.` },
                { prompt: `Check all three corners, and give the absolute maximum and minimum.`, answer: `$f(0,0)=3$, $f(2,0)=1$, $f(0,4)=-1$. Comparing all candidates: the absolute maximum is $3$ at $(0,0)$ and the absolute minimum is $-1$ at $(0,4)$.` },
              ],
            },
            {
              slug: 'box-design',
              title: 'Design a box',
              prompt: `A rectangular box must hold $32\\ \\text{m}^3$.`,
              kind: 'problem',
              difficulty: 2,
              parts: [
                { prompt: `The box is open-topped. Find the dimensions that use the least material, and the area.`, answer: `Minimise $xy+2xz+2yz$ with $z=32/(xy)$: $A=xy+64/y+64/x$, and $A_x=A_y=0$ give $x=y=4$, so $z=2$. The box is $4$ by $4$ by $2$ m, with area $48\\ \\text{m}^2$.` },
                { prompt: `A closed box of the same volume has a lid that costs twice as much per square metre as the sides and base. Find the cheapest dimensions.`, answer: `The cost is proportional to $xy(1+2)+2xz+2yz=3xy+64/y+64/x$. Setting the partials to zero gives $x=y$ and $3x^3=64$, so $x=y=(64/3)^{1/3}\\approx2.77$ m and $z=32/x^2\\approx4.16$ m.` },
              ],
            },
            {
              slug: 'hottest-point',
              title: 'Hottest point on a plate',
              prompt: `The temperature on the disk $x^2+y^2\\le1$ is $T(x,y)=2x^2+y^2-y$. Find the hottest and coldest points of the plate.`,
              kind: 'problem',
              difficulty: 2,
              parts: [
                { prompt: `Find the interior critical point.`, answer: `$T_x=4x=0$ and $T_y=2y-1=0$ give $(0,\\tfrac12)$, with $T=-\\tfrac14$.` },
                { prompt: `Parametrise the boundary as $(\\cos t,\\sin t)$ and solve the one-variable problem by hand.`, answer: `$T=2\\cos^2t+\\sin^2t-\\sin t=2-\\sin^2t-\\sin t$. With $s=\\sin t$ in $[-1,1]$, $2-s^2-s$ is largest at $s=-\\tfrac12$, value $\\tfrac94$, and smallest at $s=1$, value $0$.` },
                { prompt: `Give the hottest and coldest points.`, answer: `Hottest: $\\left(\\pm\\tfrac{\\sqrt3}{2},-\\tfrac12\\right)$, with $T=\\tfrac94$. Coldest: $(0,\\tfrac12)$, with $T=-\\tfrac14$.` },
              ],
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
          quiz: [
            {
              question: `What are the absolute maximum and minimum of $f(x,y)=x^2-2xy+2y$ on the rectangle $0\\le x\\le3$, $0\\le y\\le2$?`,
              options: [`Maximum $9$, minimum $1$`, `Maximum $4$, minimum $0$`, `Maximum $9$, minimum $0$`, `Maximum $1$, minimum $0$`],
              answer: 2,
              explanation: `The only interior critical point is $(1,1)$, with $f=1$. On the edges: $y=0$ gives $x^2$, from $0$ to $9$; $x=3$ gives $9-4y$; $y=2$ gives $(x-2)^2$, with minimum $0$ at $x=2$; $x=0$ gives $2y$. So the maximum is $9$ at $(3,0)$ and the minimum is $0$, at $(0,0)$ and $(2,2)$. Stopping at the interior critical point, value $1$, misses the edges.`,
            },
            {
              question: `What are the extreme values of $f(x,y)=x+y$ on the open disk $x^2+y^2<1$?`,
              options: [`Maximum $\\sqrt2$ at $\\left(\\tfrac{1}{\\sqrt2},\\tfrac{1}{\\sqrt2}\\right)$`, `Maximum at the interior critical point`, `Maximum $\\sqrt2$ and minimum $-\\sqrt2$`, `It has neither a maximum nor a minimum on this set`],
              answer: 3,
              explanation: `$\\nabla f=\\langle1,1\\rangle$ is never zero, so there is no interior critical point, and the boundary circle, where $\\pm\\sqrt2$ would be reached, is not part of the open disk. The values come arbitrarily close to $\\pm\\sqrt2$ without reaching them. The extreme value theorem needs a closed and bounded set.`,
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

\`\`\`interactive
contour-gradient
{"title": "Lagrange multipliers: xy on the ellipse x² + 4y² = 8", "f": "x*y", "view": [-3.6, 3.6, -2.4, 2.4], "modes": ["lagrange"], "g": "x^2 + 4*y^2", "c": 8, "point": [0, 1.414], "profile": true, "levels": [-3, -2.5, -2, -1.5, -1, -0.5, 0, 0.5, 1, 1.5, 2, 2.5, 3], "caption": "P is stuck to the red ellipse g = 8; drag it round, or use the slider. The blue arrow is ∇f, the red one ∇g, and the bold curve is the level curve of f through P. Where the two arrows are not parallel the level curve cuts across the ellipse, so f still goes up one way and down the other. Find the four points where they line up: the level curve f = ±2 just touches the ellipse there, at (±2, ±1), and the readout gives λ = ±1/4. The graph below shows f along the ellipse, with its peaks and dips at the same four points."}
\`\`\`

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
              prompt: `Use Lagrange multipliers, solving $\\nabla f=\\lambda\\nabla g$ with the constraint, for each problem.`,
              kind: 'problem',
              difficulty: 1,
              parts: [
                { prompt: `The extreme values of $x+2y$ on the circle $x^2+y^2=5$.`, answer: `$1=2\\lambda x$ and $2=2\\lambda y$ give $y=2x$, so $5x^2=5$. Maximum $5$ at $(1,2)$, minimum $-5$ at $(-1,-2)$.` },
                { prompt: `The point of the plane $x+2y+2z=9$ closest to the origin, by minimising the squared distance.`, answer: `$\\langle2x,2y,2z\\rangle=\\lambda\\langle1,2,2\\rangle$, so $(x,y,z)=t(1,2,2)$ and $9t=9$. The point is $(1,2,2)$, at distance $3$.` },
                { prompt: `The largest product $xyz$ for positive numbers with $x+y+z=30$.`, answer: `$yz=xz=xy=\\lambda$ gives $x=y=z=10$, with product $1000$.` },
              ],
            },
            {
              slug: 'box-in-ellipsoid',
              title: 'Box in an ellipsoid',
              prompt: `Use one constraint, then two.`,
              kind: 'problem',
              difficulty: 2,
              parts: [
                { prompt: `Find the largest volume of a rectangular box with edges parallel to the axes, inscribed in the ellipsoid $\\dfrac{x^2}{a^2}+\\dfrac{y^2}{b^2}+\\dfrac{z^2}{c^2}=1$.`, answer: `Maximise $8xyz$. The conditions give $\\dfrac{x^2}{a^2}=\\dfrac{y^2}{b^2}=\\dfrac{z^2}{c^2}=\\dfrac13$, so $x=a/\\sqrt3$ and so on, and the volume is $\\dfrac{8abc}{3\\sqrt3}$.` },
                { prompt: `Use two constraints to find the highest and lowest points on the curve where the cylinder $x^2+y^2=2$ meets the plane $x+y+z=1$.`, answer: `$\\nabla z=\\lambda\\langle2x,2y,0\\rangle+\\mu\\langle1,1,1\\rangle$ gives $\\mu=1$ and $x=y$, so $x=y=\\pm1$. Highest point $(-1,-1,3)$, lowest point $(1,1,-1)$.` },
              ],
            },
            {
              slug: 'maximum-entropy',
              title: 'Maximum entropy',
              prompt: `For probabilities $p_1,\\dots,p_n>0$ with $\\sum p_i=1$, consider the entropy $H=-\\sum p_i\\ln p_i$.`,
              kind: 'derivation',
              difficulty: 3,
              parts: [
                { prompt: `Maximise $H$ with a Lagrange multiplier, and show that the maximum is at the uniform distribution, with $H=\\ln n$.`, answer: `$\\partial H/\\partial p_i=-\\ln p_i-1=\\lambda$ for every $i$, so all $p_i$ are equal, $p_i=1/n$. Then $H=-n\\cdot\\tfrac1n\\ln\\tfrac1n=\\ln n$. Since $H$ is concave, this critical point is the maximum.` },
                { prompt: `Add a second constraint, $\\sum p_iE_i=\\bar E$ for fixed numbers $E_i$, and show that the optimum has the form $p_i\\propto e^{-\\beta E_i}$. This is the Boltzmann distribution of statistical physics.`, answer: `Now $-\\ln p_i-1=\\lambda+\\mu E_i$ for every $i$, so $p_i=e^{-1-\\lambda}e^{-\\mu E_i}$. With $\\beta=\\mu$, $p_i\\propto e^{-\\beta E_i}$; the constant is fixed by $\\sum p_i=1$, and $\\beta$ by the energy constraint.` },
              ],
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
          quiz: [
            {
              question: `What is the largest value of $f(x,y)=xy$ subject to $x+2y=8$?`,
              options: [`$2$`, `$\\tfrac{64}{9}$`, `$4$`, `$8$`],
              answer: 3,
              explanation: `$\\langle y,x\\rangle=\\lambda\\langle1,2\\rangle$ gives $y=\\lambda$ and $x=2\\lambda$, so $4\\lambda=8$, $\\lambda=2$, and the point is $(4,2)$ with $f=8$. $2$ is the multiplier $\\lambda$, not the value, and $4$ is the $x$-coordinate. $\\tfrac{64}{9}$ comes from guessing a symmetric point $x=y$, which suits $x+y=8$ but not this constraint.`,
            },
            {
              question: `The maximum of $f$ subject to $g=c$ is $50$, and the multiplier at the optimum is $\\lambda=4$. Estimate the maximum subject to $g=c+0.5$.`,
              options: [`$50$`, `$54$`, `$52$`, `$48$`],
              answer: 2,
              explanation: `$\\lambda$ is the rate of change of the optimal value with respect to the constraint level, so the maximum changes by about $\\lambda\\cdot0.5=2$, to $52$. $54$ forgets to multiply by the change $0.5$, and $48$ has the sign backwards.`,
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

\`\`\`interactive
double-integral
{"title": "Riemann boxes under z = 4 − x²/2 − y²/4", "f": "4 - x^2/2 - y^2/4", "modes": ["boxes"], "rect": [0, 2, 0, 2], "n": 3, "caption": "Each box stands on one small rectangle of R = [0, 2] × [0, 2] and is as tall as f at its centre; the light mesh is the surface itself. Drag to turn the picture. Raise n and the boxes hug the surface more closely: the total volume of the boxes approaches the double integral, which is 12, and the error shrinks roughly like 1/n²."}
\`\`\`

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

\`\`\`interactive
double-integral
{"title": "Slicing a region both ways", "f": "x + y", "modes": ["slices"], "I": [0, 1, "x^2", "x"], "II": [0, 1, "y", "sqrt(y)"], "n": 5, "caption": "This is the region of worked example 1, between y = x² and y = x. As type I, the typical line is vertical: at each x it runs from y = x² up to y = x, and the inner integral A(x) is graphed below. The outer integral adds the slices: the strips approach the total 3/20 = 0.15 as you add more. Switch to type II: the lines are horizontal, from x = y to x = √y, the graph of A(y) looks different, yet the total is the same 0.15. The limits change with the order; the region does not."}
\`\`\`

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
              prompt: `Evaluate each integral, sketching the region for the second and third.`,
              kind: 'problem',
              difficulty: 1,
              parts: [
                { prompt: `$\\int_0^1\\int_0^2xy^2\\,dy\\,dx$`, answer: `The inner integral is $x\\cdot\\tfrac83$, and $\\int_0^1\\tfrac83x\\,dx=\\tfrac43$.` },
                { prompt: `$\\iint_D xy\\,dA$, where $D$ is bounded by $y=\\sqrt{x}$, $y=0$ and $x=4$.`, answer: `$D$: $0\\le x\\le4$, $0\\le y\\le\\sqrt x$. The inner integral is $x\\cdot\\tfrac{x}{2}$, and $\\int_0^4\\tfrac{x^2}{2}dx=\\tfrac{32}{3}$.` },
                { prompt: `The volume of the tetrahedron bounded by the coordinate planes and $x+\\dfrac y2+\\dfrac z3=1$.`, answer: `Integrate $z=3(1-x-\\tfrac y2)$ over the triangle $0\\le x\\le1$, $0\\le y\\le2(1-x)$: the volume is $1$, which matches $\\tfrac16\\cdot1\\cdot2\\cdot3$.` },
              ],
            },
            {
              slug: 'reverse-order',
              title: 'Reverse the order',
              prompt: `Each integral is hard or impossible in the given order. Sketch the region, reverse the order, and evaluate.`,
              kind: 'problem',
              difficulty: 2,
              parts: [
                { prompt: `$\\int_0^\\pi\\int_x^\\pi\\dfrac{\\sin y}{y}\\,dy\\,dx$`, answer: `The region is $0\\le x\\le y\\le\\pi$, so the integral is $\\int_0^\\pi\\int_0^y\\dfrac{\\sin y}{y}\\,dx\\,dy=\\int_0^\\pi\\sin y\\,dy=2$.` },
                { prompt: `$\\int_0^1\\int_{\\sqrt{x}}^1e^{y^3}\\,dy\\,dx$`, answer: `The region is $0\\le x\\le y^2$, $0\\le y\\le1$, so the integral is $\\int_0^1y^2e^{y^3}dy=\\dfrac{e-1}{3}$.` },
                { prompt: `$\\int_0^4\\int_{\\sqrt{x}}^2\\dfrac{dy\\,dx}{y^3+1}$`, answer: `The region is $0\\le x\\le y^2$, $0\\le y\\le2$, so the integral is $\\int_0^2\\dfrac{y^2}{y^3+1}dy=\\tfrac13\\ln9=\\tfrac23\\ln3$.` },
              ],
            },
            {
              slug: 'fubini-fails',
              title: 'When the order matters',
              prompt: `Let $F(x,y)=\\dfrac{x^2-y^2}{(x^2+y^2)^2}$, and use $\\dfrac{\\partial}{\\partial y}\\dfrac{y}{x^2+y^2}=\\dfrac{x^2-y^2}{(x^2+y^2)^2}$.`,
              kind: 'derivation',
              difficulty: 3,
              parts: [
                { prompt: `Compute $\\int_0^1\\int_0^1F\\,dy\\,dx$.`, answer: `The inner integral is $\\left[\\dfrac{y}{x^2+y^2}\\right]_0^1=\\dfrac{1}{1+x^2}$, and $\\int_0^1\\dfrac{dx}{1+x^2}=\\dfrac\\pi4$.` },
                { prompt: `Compute $\\int_0^1\\int_0^1F\\,dx\\,dy$.`, answer: `$F(y,x)=-F(x,y)$, so swapping the roles of the variables gives $-\\dfrac\\pi4$.` },
                { prompt: `Explain why this does not contradict Fubini's theorem.`, answer: `Fubini needs the integrand to be integrable over the square, for example bounded and continuous, or with $\\iint|F|$ finite. $F$ is unbounded near the origin and $\\iint|F|\\,dA$ diverges, so the theorem does not apply.` },
              ],
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
          quiz: [
            {
              question: `Let $D$ be the triangle with vertices $(0,0)$, $(1,0)$ and $(1,2)$. What is $\\iint_D6x\\,dA$?`,
              options: [`$4$`, `$2$`, `$6$`, `$3$`],
              answer: 0,
              explanation: `$D$ is $0\\le x\\le1$, $0\\le y\\le2x$, so the integral is $\\int_0^16x\\cdot2x\\,dx=4$. Taking $y$ from $0$ to $x$ gives $2$, the wrong triangle. Taking $y$ from $0$ to $2$ integrates over the whole rectangle and gives $6$. A sketch of the region prevents both.`,
            },
            {
              question: `Which integral equals $\\int_0^1\\int_{x^2}^1f(x,y)\\,dy\\,dx$ with the order reversed?`,
              options: [`$\\int_0^1\\int_{y^2}^1f(x,y)\\,dx\\,dy$`, `$\\int_0^1\\int_0^{\\sqrt y}f(x,y)\\,dx\\,dy$`, `$\\int_0^1\\int_{\\sqrt y}^1f(x,y)\\,dx\\,dy$`, `$\\int_{x^2}^1\\int_0^1f(x,y)\\,dx\\,dy$`],
              answer: 1,
              explanation: `The region is $0\\le x\\le1$, $x^2\\le y\\le1$: above the parabola. For a fixed $y$ in $[0,1]$, $x$ runs from $0$ to $\\sqrt y$. Swapping the letters in the limits, as in $\\int_{y^2}^1$, describes a different region, and $\\int_{\\sqrt y}^1$ is the part below the parabola. Outer limits must be constants.`,
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

\`\`\`interactive
double-integral
{"title": "Polar rectangles under z = 4 − x² − y²", "f": "4 - x^2 - y^2", "modes": ["polar"], "polar": [0, 2, 0, 6.283185307179586], "caption": "The disk r ≤ 2 cut into polar rectangles, shaded by the height f (the paraboloid of worked example 1). Move the highlighted cell outwards with the ring slider: with the same Δr and Δθ, its area grows in proportion to r. With r taken at the middle of the ring, r Δr Δθ matches it exactly, while Δr Δθ alone stays the same and is wrong for every ring but one. The polar Riemann sum Σ f r Δr Δθ approaches 8π ≈ 25.13 as you add rings and sectors."}
\`\`\`

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
              prompt: `Evaluate each integral in polar coordinates, remembering $dA=r\\,dr\\,d\\theta$.`,
              kind: 'problem',
              difficulty: 1,
              parts: [
                { prompt: `$\\iint_D(x^2+y^2)\\,dA$ over the ring $1\\le x^2+y^2\\le4$.`, answer: `$\\int_0^{2\\pi}\\int_1^2r^2\\cdot r\\,dr\\,d\\theta=2\\pi\\cdot\\dfrac{16-1}{4}=\\dfrac{15\\pi}{2}$.` },
                { prompt: `$\\iint_De^{-(x^2+y^2)}\\,dA$ over the disk $x^2+y^2\\le4$.`, answer: `$\\int_0^{2\\pi}\\int_0^2e^{-r^2}r\\,dr\\,d\\theta=2\\pi\\cdot\\tfrac12(1-e^{-4})=\\pi(1-e^{-4})$.` },
                { prompt: `$\\int_0^1\\int_0^{\\sqrt{1-x^2}}\\sqrt{x^2+y^2}\\,dy\\,dx$, after describing the region.`, answer: `The region is the quarter of the unit disk in the first quadrant: $0\\le r\\le1$, $0\\le\\theta\\le\\pi/2$. The integral is $\\int_0^{\\pi/2}\\int_0^1r^2\\,dr\\,d\\theta=\\dfrac\\pi6$.` },
              ],
            },
            {
              slug: 'polar-volumes',
              title: 'Volumes',
              prompt: `Find each volume with a polar double integral.`,
              kind: 'problem',
              difficulty: 2,
              parts: [
                { prompt: `The solid inside the sphere $x^2+y^2+z^2=4$ and outside the cylinder $x^2+y^2=1$.`, answer: `The height is $2\\sqrt{4-r^2}$ over the ring $1\\le r\\le2$: $V=\\int_0^{2\\pi}\\int_1^22\\sqrt{4-r^2}\\,r\\,dr\\,d\\theta=2\\pi\\cdot\\tfrac23\\cdot3^{3/2}=4\\sqrt3\\,\\pi\\approx21.8$.` },
                { prompt: `The solid under $z=x^2+y^2$ and above the disk $(x-1)^2+y^2\\le1$, using $r=2\\cos\\theta$.`, answer: `$V=\\int_{-\\pi/2}^{\\pi/2}\\int_0^{2\\cos\\theta}r^3\\,dr\\,d\\theta=\\int_{-\\pi/2}^{\\pi/2}4\\cos^4\\theta\\,d\\theta=4\\cdot\\dfrac{3\\pi}{8}=\\dfrac{3\\pi}{2}$.` },
              ],
            },
            {
              slug: 'plates',
              title: 'Plates',
              prompt: `A half-disk $x^2+y^2\\le a^2$, $y\\ge0$, has density proportional to the distance from the origin, $\\rho=kr$.`,
              kind: 'problem',
              difficulty: 2,
              parts: [
                { prompt: `Find its mass and centre of mass.`, answer: `$m=\\int_0^\\pi\\int_0^akr\\cdot r\\,dr\\,d\\theta=\\dfrac{k\\pi a^3}{3}$. By symmetry $\\bar x=0$, and $\\int_0^\\pi\\int_0^akr\\cdot r\\sin\\theta\\cdot r\\,dr\\,d\\theta=\\dfrac{ka^4}{2}$, so $\\bar y=\\dfrac{3a}{2\\pi}$.` },
                { prompt: `Compare its moment of inertia about the origin with that of a uniform half-disk of the same mass. Which is harder to spin, and why?`, answer: `$I=\\int_0^\\pi\\int_0^akr\\cdot r^2\\cdot r\\,dr\\,d\\theta=\\dfrac{k\\pi a^5}{5}=\\tfrac35ma^2$, against $\\tfrac12ma^2$ for uniform density. The graded plate is harder to spin, because more of its mass is far from the origin.` },
              ],
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
          quiz: [
            {
              question: `What is $\\iint_D\\sqrt{x^2+y^2}\\,dA$ over the disk $x^2+y^2\\le9$?`,
              options: [`$18\\pi$`, `$9\\pi$`, `$36\\pi$`, `$6\\pi$`],
              answer: 0,
              explanation: `In polar coordinates the integrand is $r$ and $dA=r\\,dr\\,d\\theta$, so the integral is $2\\pi\\int_0^3r^2\\,dr=2\\pi\\cdot9=18\\pi$. Leaving out the factor $r$ in $dA$ gives $2\\pi\\int_0^3r\\,dr=9\\pi$.`,
            },
            {
              question: `How is the disk $(x-2)^2+y^2\\le4$ described in polar coordinates?`,
              options: [`$0\\le r\\le2$, $0\\le\\theta\\le2\\pi$`, `$0\\le r\\le2\\cos\\theta$, $-\\pi/2\\le\\theta\\le\\pi/2$`, `$0\\le r\\le4\\cos\\theta$, $-\\pi/2\\le\\theta\\le\\pi/2$`, `$0\\le r\\le4\\cos\\theta$, $0\\le\\theta\\le2\\pi$`],
              answer: 2,
              explanation: `Expanding, $x^2+y^2\\le4x$, that is $r^2\\le4r\\cos\\theta$, so $r\\le4\\cos\\theta$. The disk lies to the right of the $y$-axis, where $\\cos\\theta\\ge0$, so $\\theta$ runs over $[-\\pi/2,\\pi/2]$. Letting $\\theta$ run over $[0,2\\pi]$ would include angles where $4\\cos\\theta$ is negative, and $r\\le2$ is a disk centred at the origin, not at $(2,0)$.`,
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
              prompt: `Evaluate each triple integral.`,
              kind: 'problem',
              difficulty: 1,
              parts: [
                { prompt: `$\\iiint_Bxyz\\,dV$ over the box $[0,1]\\times[0,2]\\times[0,3]$.`, answer: `It factors: $\\tfrac12\\cdot2\\cdot\\tfrac92=\\tfrac92$.` },
                { prompt: `The volume of the solid in the first octant under the plane $z=2-x-y$.`, answer: `$\\int_0^2\\int_0^{2-x}(2-x-y)\\,dy\\,dx=\\int_0^2\\tfrac12(2-x)^2dx=\\tfrac43$.` },
                { prompt: `$\\iiint_E x\\,dV$, where $E$ is bounded by the parabolic cylinder $x=y^2$ and the planes $z=0$ and $x+z=1$.`, answer: `$E$: $-1\\le y\\le1$, $y^2\\le x\\le1$, $0\\le z\\le1-x$. So the integral is $\\int_{-1}^1\\int_{y^2}^1x(1-x)\\,dx\\,dy=\\int_{-1}^1\\left(\\tfrac16-\\tfrac{y^4}{2}+\\tfrac{y^6}{3}\\right)dy=\\tfrac{8}{35}$.` },
              ],
            },
            {
              slug: 'change-order',
              title: 'Change the order',
              prompt: `Write $\\int_0^1\\int_0^x\\int_0^yf(x,y,z)\\,dz\\,dy\\,dx$ in other orders by describing the solid $0\\le z\\le y\\le x\\le1$.`,
              kind: 'problem',
              difficulty: 2,
              parts: [
                { prompt: `In the order $dx\\,dy\\,dz$.`, answer: `$\\int_0^1\\int_z^1\\int_y^1f\\,dx\\,dy\\,dz$: $z$ from $0$ to $1$, $y$ from $z$ to $1$, $x$ from $y$ to $1$.` },
                { prompt: `In the order $dy\\,dz\\,dx$.`, answer: `$\\int_0^1\\int_0^x\\int_z^xf\\,dy\\,dz\\,dx$: $x$ from $0$ to $1$, $z$ from $0$ to $x$, $y$ from $z$ to $x$.` },
                { prompt: `Check that both give the volume $1/6$ when $f=1$.`, answer: `First: $\\int_0^1\\int_z^1(1-y)\\,dy\\,dz=\\int_0^1\\tfrac12(1-z)^2dz=\\tfrac16$. Second: $\\int_0^1\\int_0^x(x-z)\\,dz\\,dx=\\int_0^1\\tfrac{x^2}{2}dx=\\tfrac16$.` },
              ],
            },
            {
              slug: 'average-and-centroid',
              title: 'Averages and centroids',
              prompt: `Use triple integrals for an average and a centroid, then symmetry.`,
              kind: 'problem',
              difficulty: 2,
              parts: [
                { prompt: `Find the average value of $f=x^2+y^2+z^2$ over the cube $[0,1]^3$.`, answer: `The cube has volume $1$, and each of the three terms integrates to $\\tfrac13$, so the average is $1$.` },
                { prompt: `Find the centroid of the solid under $z=4-x^2$ for $0\\le x\\le2$, $0\\le y\\le3$, above $z=0$.`, answer: `$V=3\\int_0^2(4-x^2)dx=16$. Then $\\iiint x=12$, $\\iiint y=24$ and $\\iiint z=\\tfrac32\\int_0^2(4-x^2)^2dx=\\tfrac{128}{5}$, so the centroid is $\\left(\\tfrac34,\\tfrac32,\\tfrac85\\right)$.` },
                { prompt: `Explain, using symmetry, why the integral of $x^3y$ over any solid symmetric under $x\\mapsto-x$ is zero.`, answer: `The points $(x,y,z)$ and $(-x,y,z)$ both lie in the solid, and $x^3y$ takes opposite values at them. So the contributions of the two halves cancel exactly.` },
              ],
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
          quiz: [
            {
              question: `What is the volume of the solid over the triangle $0\\le y\\le x\\le1$, between $z=0$ and $z=x+y$?`,
              options: [`$\\tfrac13$`, `$\\tfrac16$`, `$1$`, `$\\tfrac12$`],
              answer: 3,
              explanation: `$V=\\int_0^1\\int_0^x(x+y)\\,dy\\,dx=\\int_0^1\\left(x^2+\\tfrac{x^2}{2}\\right)dx=\\tfrac12$. Dropping the $y$ term gives $\\tfrac13$. Integrating over the whole square $[0,1]^2$ instead of the triangle gives $1$.`,
            },
            {
              question: `$E$ is the solid half-ball $x^2+y^2+z^2\\le1$, $z\\ge0$. Which integral is zero by symmetry?`,
              options: [`$\\iiint_Ez\\,dV$`, `$\\iiint_Ex\\,dV$`, `$\\iiint_Ex^2\\,dV$`, `$\\iiint_E(x+z)\\,dV$`],
              answer: 1,
              explanation: `$E$ is symmetric under $x\\mapsto-x$ and $x$ is odd under it, so $\\iiint x\\,dV=0$. $E$ is not symmetric under $z\\mapsto-z$, since it lies above the plane, so $\\iiint z\\,dV>0$, and $x^2\\ge0$ cannot cancel. $\\iiint(x+z)=0+\\iiint z\\ne0$.`,
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
              prompt: `Evaluate each integral, choosing cylindrical coordinates ($dV=r\\,dz\\,dr\\,d\\theta$) or spherical ($dV=\\rho^2\\sin\\varphi\\,d\\rho\\,d\\varphi\\,d\\theta$).`,
              kind: 'problem',
              difficulty: 1,
              parts: [
                { prompt: `The volume inside $x^2+y^2=4$, above $z=0$ and below $z=x^2+y^2$.`, answer: `Cylindrical: $\\int_0^{2\\pi}\\int_0^2r^2\\cdot r\\,dr\\,d\\theta=2\\pi\\cdot4=8\\pi$.` },
                { prompt: `$\\iiint_Be^{(x^2+y^2+z^2)^{3/2}}\\,dV$ over the unit ball.`, answer: `Spherical: $\\int_0^{2\\pi}\\int_0^\\pi\\int_0^1e^{\\rho^3}\\rho^2\\sin\\varphi\\,d\\rho\\,d\\varphi\\,d\\theta=2\\pi\\cdot2\\cdot\\dfrac{e-1}{3}=\\dfrac{4\\pi}{3}(e-1)$.` },
                { prompt: `The volume of the solid between the spheres $\\rho=1$ and $\\rho=2$ and above the cone $\\varphi=\\pi/3$.`, answer: `$\\int_0^{2\\pi}\\int_0^{\\pi/3}\\int_1^2\\rho^2\\sin\\varphi\\,d\\rho\\,d\\varphi\\,d\\theta=2\\pi\\cdot\\tfrac12\\cdot\\tfrac73=\\dfrac{7\\pi}{3}$.` },
              ],
            },
            {
              slug: 'centroid-and-inertia',
              title: 'Centroids and moments of inertia',
              prompt: `Prove the following standard results.`,
              kind: 'derivation',
              difficulty: 2,
              parts: [
                { prompt: `Show that the solid hemisphere $x^2+y^2+z^2\\le a^2$, $z\\ge0$, has its centroid at height $3a/8$.`, answer: `$\\iiint z\\,dV=\\int_0^{2\\pi}\\int_0^{\\pi/2}\\int_0^a\\rho\\cos\\varphi\\cdot\\rho^2\\sin\\varphi\\,d\\rho\\,d\\varphi\\,d\\theta=2\\pi\\cdot\\tfrac12\\cdot\\dfrac{a^4}{4}=\\dfrac{\\pi a^4}{4}$. Dividing by the volume $\\tfrac23\\pi a^3$ gives $\\dfrac{3a}{8}$.` },
                { prompt: `Show that a uniform solid ball of mass $M$ and radius $a$ has $I_z=\\tfrac25Ma^2$.`, answer: `With density $\\delta=M/(\\tfrac43\\pi a^3)$, $I_z=\\delta\\iiint(x^2+y^2)\\,dV=\\delta\\int_0^{2\\pi}\\int_0^\\pi\\int_0^a\\rho^4\\sin^3\\varphi\\,d\\rho\\,d\\varphi\\,d\\theta=\\delta\\cdot2\\pi\\cdot\\tfrac43\\cdot\\dfrac{a^5}{5}$, which is $\\tfrac25Ma^2$.` },
                { prompt: `Show that a uniform solid cylinder of mass $M$ and radius $a$ has $I_z=\\tfrac12Ma^2$ about its axis.`, answer: `With height $h$ and $\\delta=M/(\\pi a^2h)$, $I_z=\\delta\\int_0^h\\int_0^{2\\pi}\\int_0^ar^2\\cdot r\\,dr\\,d\\theta\\,dz=\\delta\\cdot\\dfrac{\\pi a^4h}{2}=\\tfrac12Ma^2$.` },
              ],
            },
            {
              slug: 'cone-in-sphere',
              title: 'Set up three ways',
              prompt: `Take the ice cream cone of the lesson, inside $\\rho=2$ and above $z=\\sqrt{x^2+y^2}$.`,
              kind: 'problem',
              difficulty: 3,
              parts: [
                { prompt: `Write the volume integral in cylindrical coordinates and evaluate it.`, answer: `The cone and the sphere meet where $r^2+r^2=4$, at $r=\\sqrt2$. So $V=\\int_0^{2\\pi}\\int_0^{\\sqrt2}\\int_r^{\\sqrt{4-r^2}}r\\,dz\\,dr\\,d\\theta=2\\pi\\left[-\\tfrac13(4-r^2)^{3/2}-\\tfrac{r^3}{3}\\right]_0^{\\sqrt2}=\\dfrac{16\\pi}{3}\\left(1-\\dfrac{\\sqrt2}{2}\\right)$, as in the lesson.` },
                { prompt: `Write, without evaluating, the integral in Cartesian coordinates.`, answer: `$\\int_{-\\sqrt2}^{\\sqrt2}\\int_{-\\sqrt{2-x^2}}^{\\sqrt{2-x^2}}\\int_{\\sqrt{x^2+y^2}}^{\\sqrt{4-x^2-y^2}}dz\\,dy\\,dx$.` },
                { prompt: `Compare the three setups, and say which you would choose and why.`, answer: `Spherical is best: every limit is a constant, $0\\le\\rho\\le2$, $0\\le\\varphi\\le\\pi/4$, $0\\le\\theta\\le2\\pi$, and the integral factors. Cylindrical needs the intersection radius and a variable $z$-range. Cartesian has square roots in every limit and is the hardest to evaluate.` },
              ],
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
          quiz: [
            {
              question: `A solid unit ball has density equal to the distance from its centre, $\\delta=\\rho$. What is its mass?`,
              options: [`$\\tfrac{4\\pi}{3}$`, `$\\pi$`, `$\\tfrac{\\pi^2}{2}$`, `$4\\pi$`],
              answer: 1,
              explanation: `$m=\\int_0^{2\\pi}\\int_0^\\pi\\int_0^1\\rho\\cdot\\rho^2\\sin\\varphi\\,d\\rho\\,d\\varphi\\,d\\theta=2\\pi\\cdot2\\cdot\\tfrac14=\\pi$. $\\tfrac{4\\pi}{3}$ is the volume, which ignores the density. Forgetting the $\\sin\\varphi$ in $dV$ replaces the factor $2$ with $\\pi$ and gives $\\tfrac{\\pi^2}{2}$.`,
            },
            {
              question: `In spherical coordinates, which inequality describes the points outside the cylinder $x^2+y^2=1$?`,
              options: [`$\\rho\\ge1$`, `$\\varphi\\ge\\pi/4$`, `$\\rho\\cos\\varphi\\ge1$`, `$\\rho\\sin\\varphi\\ge1$`],
              answer: 3,
              explanation: `The distance from the $z$-axis is the cylindrical $r=\\rho\\sin\\varphi$, so outside the cylinder means $\\rho\\sin\\varphi\\ge1$. $\\rho\\ge1$ is outside the unit sphere, which is a different region: the point $(0,0,2)$ has $\\rho=2$ but lies on the axis, inside the cylinder. $\\rho\\cos\\varphi$ is $z$.`,
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
              prompt: `Compute the Jacobian of each transformation, and say where it is not locally one-to-one.`,
              kind: 'problem',
              difficulty: 1,
              parts: [
                { prompt: `$x=u+v$, $y=uv$`, answer: `$\\dfrac{\\partial(x,y)}{\\partial(u,v)}=\\begin{vmatrix}1&1\\\\v&u\\end{vmatrix}=u-v$, which is zero on the line $u=v$.` },
                { prompt: `$x=u^2-v^2$, $y=2uv$`, answer: `$\\begin{vmatrix}2u&-2v\\\\2v&2u\\end{vmatrix}=4(u^2+v^2)$, which is zero only at the origin.` },
                { prompt: `Spherical coordinates, $x=\\rho\\sin\\varphi\\cos\\theta$, $y=\\rho\\sin\\varphi\\sin\\theta$, $z=\\rho\\cos\\varphi$, as a $3\\times3$ determinant.`, answer: `Expanding the determinant of partial derivatives gives $\\rho^2\\sin\\varphi$, up to sign depending on the order of the variables. It is zero where $\\rho=0$ or $\\sin\\varphi=0$, that is, on the $z$-axis.` },
              ],
            },
            {
              slug: 'curved-region',
              title: 'A curved region',
              prompt: `Evaluate $\\iint_Rxy\\,dA$, where $R$ is the region in the first quadrant bounded by the hyperbolas $xy=1$ and $xy=4$ and the lines $y=x$ and $y=4x$. Use $u=xy$ and $v=y/x$.`,
              kind: 'problem',
              difficulty: 2,
              answer: `$R$ becomes the square $1\\le u\\le4$, $1\\le v\\le4$. The Jacobian of $(u,v)$ with respect to $(x,y)$ is $\\begin{vmatrix}y&x\\\\-y/x^2&1/x\\end{vmatrix}=\\dfrac{2y}{x}=2v$, so $dA=\\dfrac{du\\,dv}{2v}$. Then $\\int_1^4\\int_1^4\\dfrac{u}{2v}\\,du\\,dv=\\dfrac{15}{4}\\ln4=\\dfrac{15}{2}\\ln2\\approx5.20$.`,
            },
            {
              slug: 'ellipsoid-and-probability',
              title: 'Ellipsoids and densities',
              prompt: `Use the substitution $x=au$, $y=bv$, $z=cw$, which turns the ellipsoid $\\dfrac{x^2}{a^2}+\\dfrac{y^2}{b^2}+\\dfrac{z^2}{c^2}\\le1$ into the unit ball $B$.`,
              kind: 'derivation',
              difficulty: 3,
              parts: [
                { prompt: `Show that the ellipsoid has volume $\\tfrac43\\pi abc$.`, answer: `The Jacobian is the diagonal determinant $abc$, so $V=\\iiint_Babc\\,dV=abc\\cdot\\tfrac43\\pi$.` },
                { prompt: `Find the moment of inertia of a uniform solid ellipsoid of mass $M$ about the $z$-axis, using the ball result $\\iiint_B(u^2+v^2)\\,dV=\\tfrac{8\\pi}{15}$.`, answer: `With density $\\delta$, $I_z=\\delta\\,abc\\iiint_B(a^2u^2+b^2v^2)\\,dV$. By symmetry $\\iiint_Bu^2=\\iiint_Bv^2=\\tfrac{4\\pi}{15}$, so $I_z=\\delta\\,abc\\,\\tfrac{4\\pi}{15}(a^2+b^2)$. With $M=\\delta\\cdot\\tfrac43\\pi abc$ this is $I_z=\\dfrac M5(a^2+b^2)$.` },
              ],
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
          quiz: [
            {
              question: `$R$ is the parallelogram bounded by $x-y=0$, $x-y=2$, $x+y=1$ and $x+y=3$. Using $u=x-y$ and $v=x+y$, what is its area?`,
              options: [`$4$`, `$8$`, `$2$`, `$1$`],
              answer: 2,
              explanation: `In the $uv$-plane $R$ is the square $[0,2]\\times[1,3]$, of area $4$. Since $\\dfrac{\\partial(u,v)}{\\partial(x,y)}=\\begin{vmatrix}1&-1\\\\1&1\\end{vmatrix}=2$, $dA=\\tfrac12\\,du\\,dv$ and the area is $2$. $4$ forgets the Jacobian, and $8$ multiplies by $2$ instead of dividing: the factor needed is $\\partial(x,y)/\\partial(u,v)$, the reciprocal.`,
            },
            {
              question: `The map $x=v$, $y=u$ swaps the axes and sends the unit square to itself, with Jacobian $\\dfrac{\\partial(x,y)}{\\partial(u,v)}=-1$. What does the change of variables formula give for the area $\\iint_{[0,1]^2}dA$?`,
              options: [`$1$`, `$-1$`, `$0$`, `$2$`],
              answer: 0,
              explanation: `The formula uses the absolute value of the Jacobian, $dA=|{-1}|\\,du\\,dv$, so the area is $1$, as it must be. The sign of the Jacobian records whether the map reverses orientation; it never makes an area negative.`,
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

**Flow lines.** A **flow line** is a curve whose velocity at each point is the field there: $\\mathbf r'(t)=\\mathbf F(\\mathbf r(t))$. It is the path of a particle carried by the flow. For $\\langle-y,x\\rangle$ the flow lines are circles around the origin. For $\\langle x,y\\rangle$ they are rays leaving it. Finding flow lines means solving differential equations, which you can do in simple cases by separating variables in $dy/dx=Q/P$.

\`\`\`interactive
vector-field
{"title": "Four vector fields", "fields": [["⟨x, y⟩", "x", "y"], ["⟨−y, x⟩", "-y", "x"], ["⟨2xy, x² + 3y²⟩", "2*x*y", "x^2 + 3*y^2"], ["inverse square", "-x/(x^2 + y^2)^1.5", "-y/(x^2 + y^2)^1.5"]], "singular": [[0, 0]], "view": [-3, 3, -3, 3], "modes": ["field"], "probe": [1.5, 1], "caption": "Arrows are drawn shorter than true size and coloured from pale (weak) to purple (strong); tick the box to make them all the same length and see only directions. Drag the orange probe: the bold arrow is F there (at twice the scale of the grid arrows) and the orange curve is the flow line through it, the path a particle carried by the field would follow: rays for the source, circles for the rotation. The readouts give P_y and Q_x at the probe, and the line under them tests P_y = Q_x across the whole view, as in the worked example."}
\`\`\``,
          resources: [
            openstax('6-1-vector-fields', 'Vector fields', 'Examples, gradient fields and flow lines.', true),
            paul('CalcIII/VectorFields', 'Vector fields', 'Sketches and gradient fields.'),
            geogebra,
          ],
          exercises: [
            {
              slug: 'sketch-fields',
              title: 'Sketch fields',
              prompt: `Sketch each field at about a dozen points, and describe it in words. Which of them look as if they could be gradient fields? Test each with $P_y=Q_x$.`,
              kind: 'problem',
              difficulty: 1,
              parts: [
                { prompt: `$\\langle1,0\\rangle$`, answer: `Unit arrows all pointing right: a uniform flow. $P_y=0=Q_x$, and it is the gradient of $x$.` },
                { prompt: `$\\langle y,0\\rangle$`, answer: `Horizontal arrows, pointing right above the $x$-axis and left below it, longer farther from the axis: a shear flow. $P_y=1$ but $Q_x=0$, so it is not a gradient.` },
                { prompt: `$\\langle-x,-y\\rangle$`, answer: `Arrows pointing straight at the origin, growing with distance: a sink. $P_y=0=Q_x$, and it is the gradient of $-\\tfrac12(x^2+y^2)$.` },
                { prompt: `$\\dfrac{\\langle-y,x\\rangle}{x^2+y^2}$`, answer: `Arrows circling the origin anticlockwise, of length $1/r$, so shorter far away: a vortex. It passes the test $P_y=Q_x$ away from the origin, but, as Lesson 3 shows, it is not a gradient on any region circling the origin.` },
              ],
            },
            {
              slug: 'find-potentials',
              title: 'Find potentials',
              prompt: `Decide whether each field is a gradient, and find a potential where one exists, integrating one variable at a time.`,
              kind: 'problem',
              difficulty: 2,
              parts: [
                { prompt: `$\\langle ye^{xy},\\ xe^{xy}\\rangle$`, answer: `$P_y=e^{xy}+xye^{xy}=Q_x$. Integrating $P$ in $x$ gives $f=e^{xy}+g(y)$, and $f_y=xe^{xy}$ forces $g$ constant: $f=e^{xy}$.` },
                { prompt: `$\\langle2x+y,\\ x+2y\\rangle$`, answer: `$P_y=1=Q_x$. $f=x^2+xy+g(y)$ with $x+g'(y)=x+2y$, so $f=x^2+xy+y^2$.` },
                { prompt: `$\\langle y,\\ -x\\rangle$`, answer: `$P_y=1$ but $Q_x=-1$, so it is not a gradient.` },
                { prompt: `$\\langle yz,\\ xz,\\ xy+2z\\rangle$, in three variables.`, answer: `From $P$, $f=xyz+g(y,z)$. Then $f_y=xz+g_y=xz$, so $g=g(z)$, and $f_z=xy+g'(z)=xy+2z$, so $g=z^2$. Thus $f=xyz+z^2$.` },
              ],
            },
            {
              slug: 'flow-lines',
              title: 'Flow lines and gravity',
              prompt: `Find flow lines of a field, then check the gradient form of gravity.`,
              kind: 'derivation',
              difficulty: 2,
              parts: [
                { prompt: `Find the flow lines of $\\mathbf F=\\langle x,2y\\rangle$ by solving $dy/dx=2y/x$, and sketch them.`, answer: `Separate: $\\dfrac{dy}{y}=\\dfrac{2\\,dx}{x}$, so $\\ln|y|=2\\ln|x|+c$ and $y=Cx^2$. The flow lines are the parabolas $y=Cx^2$ (including the $x$-axis for $C=0$), together with the $y$-axis, all running away from the origin.` },
                { prompt: `Verify that $\\nabla\\left(\\dfrac{GM}{|\\mathbf r|}\\right)=-\\dfrac{GM}{|\\mathbf r|^3}\\mathbf r$, where $|\\mathbf r|=\\sqrt{x^2+y^2+z^2}$.`, answer: `$\\dfrac{\\partial}{\\partial x}(x^2+y^2+z^2)^{-1/2}=-\\tfrac12(x^2+y^2+z^2)^{-3/2}\\cdot2x=-\\dfrac{x}{|\\mathbf r|^3}$. The $y$- and $z$-components are the same with $y$ and $z$, so the gradient is $-\\dfrac{GM}{|\\mathbf r|^3}\\langle x,y,z\\rangle$.` },
              ],
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
          quiz: [
            {
              question: `Which function is a potential for $\\mathbf F=\\langle2x+y^2,\\ 2xy+3\\rangle$?`,
              options: [`$x^2+xy^2$`, `$x^2+xy^2+3y$`, `$x^2y^2+3y$`, `None: $\\mathbf F$ is not a gradient`],
              answer: 1,
              explanation: `$P_y=2y=Q_x$, so a potential exists. Integrating $P$ in $x$ gives $x^2+xy^2+g(y)$; then $f_y=2xy+g'(y)=2xy+3$, so $g=3y$. Stopping at $x^2+xy^2$ forgets the function $g(y)$, which here is not constant: its gradient has $y$-component $2xy$, not $2xy+3$.`,
            },
            {
              question: `Which of these fields is not a gradient field?`,
              options: [`$\\langle-y,\\ x\\rangle$`, `$\\langle y,\\ x\\rangle$`, `$\\langle2x,\\ 2y\\rangle$`, `$\\langle e^x,\\ \\cos y\\rangle$`],
              answer: 0,
              explanation: `For $\\langle-y,x\\rangle$, $P_y=-1$ and $Q_x=1$, so it fails the test; it is a rotation. The others are $\\nabla(xy)$, $\\nabla(x^2+y^2)$ and $\\nabla(e^x+\\sin y)$. $\\langle-y,x\\rangle$ and $\\langle y,x\\rangle$ look alike, but only the second has $P_y=Q_x$.`,
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

\`\`\`interactive
vector-field
{"title": "Work along two paths in F = ⟨y, x²⟩", "P": "y", "Q": "x^2", "view": [-0.6, 1.6, -0.4, 1.4], "modes": ["compare"], "A": [0, 0], "B": [1, 1], "C1": [0.5, 0.5], "C2": [0, 0.5], "caption": "Path C₁ is the segment y = x and path C₂ is the parabola x = y², both from A = (0, 0) to B = (1, 1). Press Play to watch the work build up as the dots move. The totals are 5/6 ≈ 0.8333 and 13/15 ≈ 0.8667, as in the worked example. Drag the control points C₁ and C₂ to bend the paths, or move A and B: the totals keep changing with the path, because P_y ≠ Q_x."}
\`\`\`

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
              prompt: `Evaluate each integral with respect to arc length, $ds=|\\mathbf r'(t)|\\,dt$.`,
              kind: 'problem',
              difficulty: 1,
              parts: [
                { prompt: `Find $\\int_C(x+y)\\,ds$, where $C$ is the segment from $(0,0)$ to $(3,4)$.`, answer: `$\\mathbf r=\\langle3t,4t\\rangle$, $0\\le t\\le1$, with speed $5$: $\\int_0^17t\\cdot5\\,dt=\\dfrac{35}{2}$.` },
                { prompt: `A wire bent into the semicircle $x^2+y^2=a^2$, $y\\ge0$, has density equal to its height $y$. Find its mass.`, answer: `$\\mathbf r=\\langle a\\cos t,a\\sin t\\rangle$, $0\\le t\\le\\pi$, with speed $a$: $\\int_0^\\pi a\\sin t\\cdot a\\,dt=2a^2$.` },
                { prompt: `Find the length of one turn of the helix $\\langle\\cos t,\\sin t,t\\rangle$ as a line integral.`, answer: `$L=\\int_C1\\,ds=\\int_0^{2\\pi}\\sqrt2\\,dt=2\\sqrt2\\,\\pi$.` },
              ],
            },
            {
              slug: 'work-integrals',
              title: 'Work integrals',
              prompt: `Evaluate each work integral $\\int_C\\mathbf F\\cdot d\\mathbf r=\\int\\mathbf F(\\mathbf r(t))\\cdot\\mathbf r'(t)\\,dt$.`,
              kind: 'problem',
              difficulty: 2,
              parts: [
                { prompt: `The work done by $\\mathbf F=\\langle y,-x,z\\rangle$ along one turn of the helix $\\langle\\cos t,\\sin t,t\\rangle$, $0\\le t\\le2\\pi$.`, answer: `$\\mathbf F\\cdot\\mathbf r'=\\langle\\sin t,-\\cos t,t\\rangle\\cdot\\langle-\\sin t,\\cos t,1\\rangle=-1+t$, so the work is $\\int_0^{2\\pi}(t-1)\\,dt=2\\pi^2-2\\pi$.` },
                { prompt: `$\\oint_C\\mathbf F\\cdot d\\mathbf r$ for $\\mathbf F=\\langle-y,x\\rangle$ around the circle of radius $a$, anticlockwise.`, answer: `$\\mathbf F\\cdot\\mathbf r'=\\langle-a\\sin t,a\\cos t\\rangle\\cdot\\langle-a\\sin t,a\\cos t\\rangle=a^2$, so the integral is $2\\pi a^2$.` },
                { prompt: `$\\int_Cy\\,dx+x\\,dy$ along the three sides of the triangle from $(0,0)$ to $(2,0)$ to $(2,1)$ and back to $(0,0)$.`, answer: `The sides give $0$, $2$ and $-2$, so the total is $0$. That is no accident: $\\langle y,x\\rangle$ is the gradient of $xy$, and the path is closed.` },
              ],
            },
            {
              slug: 'parametrisation-independence',
              title: 'Independence of parametrisation',
              prompt: `Let $\\mathbf r(t)$, $a\\le t\\le b$, trace $C$, and let $g$ map $[c,d]$ onto $[a,b]$. Use the chain rule on $\\mathbf r(g(u))$ and substitute $t=g(u)$.`,
              kind: 'derivation',
              difficulty: 3,
              parts: [
                { prompt: `Show that $\\int_C\\mathbf F\\cdot d\\mathbf r$ does not change if you replace $\\mathbf r(t)$ by $\\mathbf r(g(u))$, where $g$ is increasing.`, answer: `$\\dfrac{d}{du}\\mathbf r(g(u))=\\mathbf r'(g(u))\\,g'(u)$, so the new integral is $\\int_c^d\\mathbf F(\\mathbf r(g(u)))\\cdot\\mathbf r'(g(u))\\,g'(u)\\,du$. With $t=g(u)$, running from $a$ to $b$, this is $\\int_a^b\\mathbf F(\\mathbf r(t))\\cdot\\mathbf r'(t)\\,dt$.` },
                { prompt: `Show that it changes sign if $g$ is decreasing.`, answer: `Now $g(c)=b$ and $g(d)=a$, so the same substitution gives $\\int_b^a\\mathbf F\\cdot\\mathbf r'\\,dt=-\\int_a^b\\mathbf F\\cdot\\mathbf r'\\,dt$.` },
                { prompt: `Show that $\\int_Cf\\,ds$ is unchanged in both cases.`, answer: `The new speed is $|\\mathbf r'(g(u))|\\,|g'(u)|$, with an absolute value. For decreasing $g$, $|g'|=-g'$, and that extra minus sign cancels the one from the reversed limits.` },
              ],
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
          quiz: [
            {
              question: `What is $\\int_C\\mathbf F\\cdot d\\mathbf r$ for $\\mathbf F=\\langle x^2,\\ xy\\rangle$ along the parabola $\\mathbf r(t)=\\langle t,t^2\\rangle$, $0\\le t\\le1$?`,
              options: [`$\\tfrac{7}{12}$`, `$\\tfrac23$`, `$\\tfrac{11}{15}$`, `$\\tfrac12$`],
              answer: 2,
              explanation: `$\\mathbf F(\\mathbf r(t))=\\langle t^2,t^3\\rangle$ and $\\mathbf r'=\\langle1,2t\\rangle$, so the integrand is $t^2+2t^4$ and the integral is $\\tfrac13+\\tfrac25=\\tfrac{11}{15}$. $\\tfrac{7}{12}$ forgets the factor $\\mathbf r'$ and integrates $t^2+t^3$. $\\tfrac23$ uses the straight segment $\\langle t,t\\rangle$; this field is not conservative, so the path matters.`,
            },
            {
              question: `A curve $C$ is traced in the opposite direction. What happens to $\\int_Cf\\,ds$ and to $\\int_C\\mathbf F\\cdot d\\mathbf r$?`,
              options: [`Both change sign`, `Neither changes`, `Only $\\int_Cf\\,ds$ changes sign`, `Only $\\int_C\\mathbf F\\cdot d\\mathbf r$ changes sign`],
              answer: 3,
              explanation: `$ds$ is a length, always positive, so a mass or an arc length does not care about direction. Work does: reversing the path reverses $d\\mathbf r$, so every $\\mathbf F\\cdot d\\mathbf r$ changes sign. A force that helps you one way opposes you the other way.`,
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

\`\`\`interactive
vector-field
{"title": "Path independence for F = ∇(x²y + y³)", "P": "2*x*y", "Q": "x^2 + 3*y^2", "potential": "x^2*y + y^3", "view": [-2.5, 2.5, -2, 2], "modes": ["compare"], "A": [-1.5, -1], "B": [1.5, 1], "C1": [0, 0], "C2": [-1.5, 1.5], "caption": "F = ⟨2xy, x² + 3y²⟩ is the gradient of f = x²y + y³, found in the previous lesson. Bend the two paths any way you like with C₁ and C₂: the two line integrals stay equal to each other and to f(B) − f(A). Then move A or B: all three numbers change together. Press Play and watch the running integrals: they differ along the way, and only the end points decide the total."}
\`\`\`

**The test.** A region is **simply connected** if it is connected and every closed curve in it can be shrunk to a point without leaving the region. Informally, it has no holes. **On a simply connected region**, a field $\\langle P,Q\\rangle$ with continuous first partials is conservative exactly when $P_y=Q_x$. In three dimensions the condition is that $\\text{curl}\\,\\mathbf F=\\mathbf 0$, which is the subject of Module 7.

**The hole matters.** Let $\\mathbf F=\\dfrac{\\langle-y,x\\rangle}{x^2+y^2}$ on the plane with the origin removed. It satisfies $P_y=Q_x$ everywhere it is defined. Yet around the unit circle, with $\\mathbf r=\\langle\\cos t,\\sin t\\rangle$, $\\mathbf F\\cdot\\mathbf r'=\\sin^2t+\\cos^2t=1$, and

$$
\\oint\\mathbf F\\cdot d\\mathbf r=2\\pi\\ne0.
$$

So the field is not conservative on that region. Locally it is the gradient of the polar angle $\\theta$, but $\\theta$ cannot be defined continuously around a loop that circles the origin, because it gains $2\\pi$ each time.

\`\`\`interactive
vector-field
{"title": "Circulation of the vortex field", "P": "-y/(x^2 + y^2)", "Q": "x/(x^2 + y^2)", "singular": [[0, 0]], "view": [-3, 3, -3, 3], "modes": ["green"], "centre": [0, 0], "r": 1, "caption": "The loop starts as the unit circle and the circulation reads 2π ≈ 6.283. There is no shading anywhere, because Q_x − P_y = 0 wherever F is defined. Drag the centre so that the loop no longer goes round the origin: the circulation drops to 0. Any loop round the origin gives 2π, whatever its size, which is exactly what a conservative field cannot do."}
\`\`\`

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
              prompt: `Decide whether each field is conservative on the whole plane. If it is, find a potential.`,
              kind: 'problem',
              difficulty: 1,
              parts: [
                { prompt: `$\\langle3x^2y,\\ x^3+2y\\rangle$`, answer: `$P_y=3x^2=Q_x$ on the whole plane, so it is conservative, with $f=x^3y+y^2$.` },
                { prompt: `$\\langle y\\cos x,\\ \\sin x+e^y\\rangle$`, answer: `$P_y=\\cos x=Q_x$, so it is conservative, with $f=y\\sin x+e^y$.` },
                { prompt: `$\\langle xy,\\ y\\rangle$`, answer: `$P_y=x$ but $Q_x=0$, so it is not conservative.` },
                { prompt: `Evaluate $\\int_C\\mathbf F\\cdot d\\mathbf r$ for the first field along any path from $(0,0)$ to $(2,1)$.`, answer: `By the fundamental theorem, $f(2,1)-f(0,0)=8+1=9$.` },
              ],
            },
            {
              slug: 'path-integral-trick',
              title: 'Choose the easy route',
              prompt: `Let $\\mathbf F=\\langle e^y,\\ xe^y+\\cos y\\rangle$, and let $C$ be the upper half of the ellipse $x^2/4+y^2=1$, from $(2,0)$ to $(-2,0)$.`,
              kind: 'problem',
              difficulty: 2,
              parts: [
                { prompt: `Show that $\\mathbf F$ is conservative.`, answer: `$P_y=e^y=Q_x$ on the whole plane. A potential is $f=xe^y+\\sin y$.` },
                { prompt: `Use this to evaluate $\\int_C\\mathbf F\\cdot d\\mathbf r$.`, answer: `$f(-2,0)-f(2,0)=-2-2=-4$. (The straight segment along the $x$-axis gives the same.)` },
                { prompt: `Do the same integral with a non-conservative field of your choice, along two different paths, to see the difference.`, answer: `For example, with $\\langle-y,x\\rangle$: along the half ellipse $\\langle2\\cos t,\\sin t\\rangle$, $0\\le t\\le\\pi$, the integrand is $2$ and the integral is $2\\pi$; along the segment from $(2,0)$ to $(-2,0)$ on the $x$-axis it is $0$. The two answers differ, so the path matters.` },
              ],
            },
            {
              slug: 'vortex-field',
              title: 'The vortex field',
              prompt: `Let $\\mathbf F=\\dfrac{\\langle-y,x\\rangle}{x^2+y^2}$.`,
              kind: 'derivation',
              difficulty: 3,
              parts: [
                { prompt: `Verify that $P_y=Q_x$ away from the origin.`, answer: `$P_y=\\dfrac{-(x^2+y^2)+2y^2}{(x^2+y^2)^2}=\\dfrac{y^2-x^2}{(x^2+y^2)^2}$, and $Q_x=\\dfrac{(x^2+y^2)-2x^2}{(x^2+y^2)^2}$ is the same.` },
                { prompt: `Show that $\\theta=\\arctan(y/x)$ satisfies $\\nabla\\theta=\\mathbf F$ where $x>0$.`, answer: `As in the partials drill, $\\theta_x=\\dfrac{-y}{x^2+y^2}$ and $\\theta_y=\\dfrac{x}{x^2+y^2}$.` },
                { prompt: `Explain why $\\oint_C\\mathbf F\\cdot d\\mathbf r$ is $0$ for a loop that does not go around the origin, and $2\\pi$ for one that goes around it once anticlockwise.`, answer: `A loop that does not circle the origin lies in a region with no hole, where the polar angle can be chosen continuously, so $\\mathbf F$ is a gradient and the integral is $0$. Around the origin, $\\theta$ increases by $2\\pi$ and comes back to the start without returning to its old value, so the integral is the total change, $2\\pi$; on the unit circle, $\\mathbf F\\cdot\\mathbf r'=1$ directly.` },
              ],
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
          quiz: [
            {
              question: `$\\mathbf F=\\langle2xy,\\ x^2+z,\\ y+3z^2\\rangle$. What is $\\int_C\\mathbf F\\cdot d\\mathbf r$ along any path from $(0,0,0)$ to $(1,2,1)$?`,
              options: [`$3$`, `$4$`, `$0$`, `$5$`],
              answer: 3,
              explanation: `A potential is $f=x^2y+yz+z^3$: check $f_x=2xy$, $f_y=x^2+z$, $f_z=y+3z^2$. So the integral is $f(1,2,1)-f(0,0,0)=2+2+1=5$. Leaving out the term $yz$, which shows up in both $f_y$ and $f_z$, gives $3$. The answer is $0$ only around a closed path.`,
            },
            {
              question: `A field $\\mathbf F$ in the plane satisfies $P_y=Q_x$ everywhere except at the origin, where it is undefined. Is $\\oint_C\\mathbf F\\cdot d\\mathbf r=0$ for every closed loop $C$ that avoids the origin?`,
              options: [`Yes, because the test $P_y=Q_x$ holds on the loop`, `Yes, because $\\mathbf F$ is continuous on the loop`, `Not necessarily: a loop around the origin can give a non-zero value`, `No: every closed loop gives a non-zero value`],
              answer: 2,
              explanation: `The test proves $\\mathbf F$ conservative only on a region with no holes. Loops that do not circle the origin do give $0$, but a loop around it may not: the vortex field gives $2\\pi$. The test holding on the loop itself is not enough, because the argument needs the whole region inside the loop.`,
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

\`\`\`interactive
vector-field
{"title": "Green's theorem, checked numerically", "fields": [["⟨x² − y, y² + x⟩", "x^2 - y", "y^2 + x"], ["⟨xy, x²⟩", "x*y", "x^2"], ["⟨−y, x⟩/(x² + y²)", "-y/(x^2 + y^2)", "x/(x^2 + y^2)"]], "singular": [[0, 0]], "view": [-3, 3, -3, 3], "modes": ["green"], "centre": [0, 0], "r": 1, "caption": "The first field is worked example 1: Q_x − P_y = 2 everywhere (uniform green shading), and round the unit circle both numbers are 2π ≈ 6.283. Drag the centre and change the radius: both always equal twice the area. The second field has Q_x − P_y = x, green on the right and red on the left, so a loop centred on the y-axis gets 0 while moving it right makes both numbers grow together. The third is the vortex: with the origin inside, the circulation is 2π but the shading (and the double integral) is 0, because the hypothesis fails at the origin."}
\`\`\`

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
              prompt: `Use $\\oint_CP\\,dx+Q\\,dy=\\iint_D(Q_x-P_y)\\,dA$.`,
              kind: 'problem',
              difficulty: 2,
              parts: [
                { prompt: `Evaluate $\\oint_Cxy\\,dx+x^2\\,dy$ around the triangle with vertices $(0,0)$, $(1,0)$ and $(1,1)$, anticlockwise, using Green's theorem.`, answer: `$Q_x-P_y=2x-x=x$, and $\\int_0^1\\int_0^xx\\,dy\\,dx=\\tfrac13$.` },
                { prompt: `Check it by computing the three line integrals directly.`, answer: `Along the bottom ($y=0$) the integral is $0$; up the right side ($x=1$) it is $\\int_0^11\\,dy=1$; back along $y=x$ from $(1,1)$ to $(0,0)$ it is $\\int_1^02t^2\\,dt=-\\tfrac23$. The total is $\\tfrac13$.` },
                { prompt: `Evaluate $\\oint_Cy^2\\,dx+3xy\\,dy$, where $C$ is the boundary of the upper half of the ring $1\\le x^2+y^2\\le4$, positively oriented.`, answer: `$Q_x-P_y=3y-2y=y$. In polar coordinates, $\\int_0^\\pi\\int_1^2r\\sin\\theta\\cdot r\\,dr\\,d\\theta=2\\cdot\\tfrac73=\\tfrac{14}{3}$.` },
              ],
            },
            {
              slug: 'areas-by-green',
              title: 'Areas by line integrals',
              prompt: `Use $A=\\frac12\\oint x\\,dy-y\\,dx$ to find the area enclosed by each curve.`,
              kind: 'problem',
              difficulty: 2,
              parts: [
                { prompt: `The astroid $\\langle\\cos^3t,\\sin^3t\\rangle$.`, answer: `$x\\,dy-y\\,dx=3\\cos^2t\\sin^2t\\,dt$, so $A=\\tfrac32\\int_0^{2\\pi}\\cos^2t\\sin^2t\\,dt=\\tfrac32\\cdot\\dfrac\\pi4=\\dfrac{3\\pi}{8}$.` },
                { prompt: `One arch of the cycloid $\\langle t-\\sin t,1-\\cos t\\rangle$ together with the segment of the $x$-axis below it, taking care with the orientation.`, answer: `On the segment $y=0$ and $dy=0$, so it contributes nothing. For positive orientation the arch must be traced from right to left. Traced with increasing $t$ (left to right) the integral gives $-3\\pi$, so the area is $3\\pi$.` },
                { prompt: `The triangle with vertices $(x_1,y_1)$, $(x_2,y_2)$, $(x_3,y_3)$, to derive the shoelace formula.`, answer: `On the segment from $(x_1,y_1)$ to $(x_2,y_2)$, $\\int x\\,dy-y\\,dx=x_1y_2-x_2y_1$. Adding the three sides, $A=\\tfrac12|x_1y_2-x_2y_1+x_2y_3-x_3y_2+x_3y_1-x_1y_3|$, with the absolute value covering either orientation.` },
              ],
            },
            {
              slug: 'green-proof',
              title: 'Prove it for a rectangle',
              prompt: `Prove Green's theorem for the rectangle $D=[a,b]\\times[c,d]$, with boundary $C$ traced anticlockwise.`,
              kind: 'derivation',
              difficulty: 3,
              parts: [
                { prompt: `Show that $\\oint_CP\\,dx=-\\iint_DP_y\\,dA$ by computing the line integral on the four sides, and using the fundamental theorem in $y$.`, answer: `The vertical sides contribute nothing, since $dx=0$ there. The bottom gives $\\int_a^bP(x,c)\\,dx$ and the top, traced right to left, $-\\int_a^bP(x,d)\\,dx$. So $\\oint_CP\\,dx=-\\int_a^b[P(x,d)-P(x,c)]\\,dx=-\\int_a^b\\int_c^dP_y\\,dy\\,dx$.` },
                { prompt: `Do the same for the $Q\\,dy$ term.`, answer: `Now the horizontal sides contribute nothing. The right side gives $\\int_c^dQ(b,y)\\,dy$ and the left, traced downward, $-\\int_c^dQ(a,y)\\,dy$, so $\\oint_CQ\\,dy=\\int_c^d\\int_a^bQ_x\\,dx\\,dy$. Adding gives Green's theorem.` },
                { prompt: `Explain how the result extends to a region made of several rectangles glued together.`, answer: `Apply the theorem to each rectangle and add. The double integrals add up to the one over the whole region. Each shared inner edge is traced twice, in opposite directions, so its line integrals cancel, leaving only the outer boundary.` },
              ],
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
          quiz: [
            {
              question: `What is $\\oint_C3y\\,dx+5x\\,dy$ around the circle of radius $2$, anticlockwise?`,
              options: [`$8\\pi$`, `$4\\pi$`, `$32\\pi$`, `$-8\\pi$`],
              answer: 0,
              explanation: `$Q_x-P_y=5-3=2$, and the disk has area $4\\pi$, so the integral is $2\\cdot4\\pi=8\\pi$. $32\\pi$ adds $5+3$ instead of subtracting, and $-8\\pi$ is the clockwise value. $4\\pi$ is the area alone.`,
            },
            {
              question: `$D$ is the ring $1\\le x^2+y^2\\le4$. For Green's theorem on $D$, how must the two boundary circles be oriented?`,
              options: [`Both anticlockwise`, `The outer circle anticlockwise and the inner circle clockwise`, `Both clockwise`, `The outer circle clockwise and the inner circle anticlockwise`],
              answer: 1,
              explanation: `Positive orientation keeps the region on your left as you walk along the boundary. On the outer circle that means anticlockwise; on the inner circle, with the ring outside it, it means clockwise. Taking both anticlockwise is the common mistake, and it gives the wrong sign for the inner circle's contribution.`,
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
              prompt: `Parametrise each surface and give the parameter domain.`,
              kind: 'problem',
              difficulty: 1,
              parts: [
                { prompt: `The part of the cylinder $x^2+y^2=4$ with $0\\le z\\le3$.`, answer: `$\\mathbf r(\\theta,z)=\\langle2\\cos\\theta,2\\sin\\theta,z\\rangle$, with $0\\le\\theta\\le2\\pi$ and $0\\le z\\le3$.` },
                { prompt: `The part of the plane $x+2y+z=4$ in the first octant.`, answer: `As a graph: $\\mathbf r(x,y)=\\langle x,y,4-x-2y\\rangle$ over the triangle $x\\ge0$, $y\\ge0$, $x+2y\\le4$.` },
                { prompt: `The part of the cone $z=\\sqrt{x^2+y^2}$ with $1\\le z\\le2$.`, answer: `$\\mathbf r(r,\\theta)=\\langle r\\cos\\theta,r\\sin\\theta,r\\rangle$, with $1\\le r\\le2$ and $0\\le\\theta\\le2\\pi$.` },
                { prompt: `The torus obtained by rotating the circle $(x-R)^2+z^2=r^2$ about the $z$-axis.`, answer: `$\\mathbf r(u,v)=\\langle(R+r\\cos v)\\cos u,\\ (R+r\\cos v)\\sin u,\\ r\\sin v\\rangle$, for $u$ and $v$ in $[0,2\\pi]$: $v$ goes round the small circle and $u$ rotates it about the axis.` },
              ],
            },
            {
              slug: 'surface-areas',
              title: 'Surface areas',
              prompt: `Find each area with $A=\\iint_D|\\mathbf r_u\\times\\mathbf r_v|\\,dA$.`,
              kind: 'problem',
              difficulty: 2,
              parts: [
                { prompt: `The part of the plane $x+2y+z=4$ in the first octant.`, answer: `$dS=\\sqrt{1+1^2+2^2}\\,dA=\\sqrt6\\,dA$ over a triangle of area $4$, so $A=4\\sqrt6$.` },
                { prompt: `The helicoid $\\langle u\\cos v,u\\sin v,v\\rangle$ for $0\\le u\\le1$ and $0\\le v\\le2\\pi$.`, answer: `$|\\mathbf r_u\\times\\mathbf r_v|=\\sqrt{1+u^2}$, so $A=2\\pi\\int_0^1\\sqrt{1+u^2}\\,du=\\pi\\left(\\sqrt2+\\ln(1+\\sqrt2)\\right)\\approx7.21$.` },
                { prompt: `The torus of the previous exercise.`, answer: `$|\\mathbf r_u\\times\\mathbf r_v|=r(R+r\\cos v)$, so $A=\\int_0^{2\\pi}\\int_0^{2\\pi}r(R+r\\cos v)\\,dv\\,du=4\\pi^2Rr$.` },
                { prompt: `The part of the sphere $x^2+y^2+z^2=4$ above $z=1$.`, answer: `$z=1$ means $\\cos\\varphi=\\tfrac12$, so $\\varphi\\le\\pi/3$, and $A=\\int_0^{2\\pi}\\int_0^{\\pi/3}4\\sin\\varphi\\,d\\varphi\\,d\\theta=8\\pi\\cdot\\tfrac12=4\\pi$.` },
              ],
            },
            {
              slug: 'revolution-check',
              title: 'Surfaces of revolution again',
              prompt: `Parametrise the surface obtained by rotating $y=f(x)$, $a\\le x\\le b$, $f\\ge0$, about the $x$-axis as $\\langle x,f(x)\\cos\\theta,f(x)\\sin\\theta\\rangle$. Show that $|\\mathbf r_x\\times\\mathbf r_\\theta|=f\\sqrt{1+f'^2}$, which recovers the Calculus II formula $S=2\\pi\\int_a^bf\\sqrt{1+f'^2}\\,dx$.`,
              kind: 'derivation',
              difficulty: 2,
              answer: `$\\mathbf r_x=\\langle1,f'\\cos\\theta,f'\\sin\\theta\\rangle$ and $\\mathbf r_\\theta=\\langle0,-f\\sin\\theta,f\\cos\\theta\\rangle$, with cross product $\\langle ff',-f\\cos\\theta,-f\\sin\\theta\\rangle$. Its length is $\\sqrt{f^2f'^2+f^2}=f\\sqrt{1+f'^2}$, and integrating over $0\\le\\theta\\le2\\pi$ gives the factor $2\\pi$.`,
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
          quiz: [
            {
              question: `What is the area of the part of the plane $z=2x+2y$ that lies over the unit disk?`,
              options: [`$3\\pi$`, `$\\pi$`, `$9\\pi$`, `$\\sqrt5\\,\\pi$`],
              answer: 0,
              explanation: `For a graph, $dS=\\sqrt{1+g_x^2+g_y^2}\\,dA=\\sqrt{1+4+4}\\,dA=3\\,dA$, so the area is $3\\pi$. $\\pi$ is the area of the shadow, which ignores the tilt, and $9\\pi$ forgets the square root.`,
            },
            {
              question: `Which parametrisation describes the cylinder $x^2+z^2=9$?`,
              options: [`$\\langle3\\cos\\theta,\\ 3\\sin\\theta,\\ z\\rangle$`, `$\\langle3\\sin\\varphi\\cos\\theta,\\ 3\\sin\\varphi\\sin\\theta,\\ 3\\cos\\varphi\\rangle$`, `$\\langle3\\cos\\theta,\\ y,\\ 3\\sin\\theta\\rangle$`, `$\\langle x,\\ 3\\cos\\theta,\\ 3\\sin\\theta\\rangle$`],
              answer: 2,
              explanation: `The missing variable is $y$, so the axis is the $y$-axis: $x$ and $z$ go round a circle of radius $3$ and $y$ is free. $\\langle3\\cos\\theta,3\\sin\\theta,z\\rangle$ satisfies $x^2+y^2=9$, the cylinder about the $z$-axis, and the last option is the one about the $x$-axis. The second is the sphere of radius $3$.`,
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
              prompt: `Evaluate surface integrals of functions.`,
              kind: 'problem',
              difficulty: 1,
              parts: [
                { prompt: `Evaluate $\\iint_Sz\\,dS$ over the upper unit hemisphere.`, answer: `With $dS=\\sin\\varphi\\,d\\varphi\\,d\\theta$ and $z=\\cos\\varphi$: $\\int_0^{2\\pi}\\int_0^{\\pi/2}\\cos\\varphi\\sin\\varphi\\,d\\varphi\\,d\\theta=2\\pi\\cdot\\tfrac12=\\pi$.` },
                { prompt: `Use it to find the average height of the hemisphere's surface.`, answer: `Divide by the area $2\\pi$: the average height is $\\tfrac12$.` },
                { prompt: `A conical shell $z=\\sqrt{x^2+y^2}$, $0\\le z\\le1$, has density $\\delta=z$. Find its mass.`, answer: `On the cone $dS=\\sqrt2\\,dA$ and $z=r$, so the mass is $\\int_0^{2\\pi}\\int_0^1r\\sqrt2\\,r\\,dr\\,d\\theta=\\dfrac{2\\sqrt2\\,\\pi}{3}$.` },
              ],
            },
            {
              slug: 'flux-drill',
              title: 'Flux',
              prompt: `Compute each flux $\\iint_S\\mathbf F\\cdot\\mathbf n\\,dS$.`,
              kind: 'problem',
              difficulty: 2,
              parts: [
                { prompt: `$\\mathbf F=\\langle x,y,0\\rangle$ outward through the side of the cylinder $x^2+y^2=4$, $0\\le z\\le3$.`, answer: `$\\mathbf n=\\langle x,y,0\\rangle/2$, so $\\mathbf F\\cdot\\mathbf n=(x^2+y^2)/2=2$, times the area $2\\pi\\cdot2\\cdot3=12\\pi$: the flux is $24\\pi$.` },
                { prompt: `$\\mathbf F=\\langle0,0,z\\rangle$ upward through the part of the plane $z=1-x-y$ in the first octant.`, answer: `$d\\mathbf S=\\langle1,1,1\\rangle\\,dA$, so the flux is $\\iint_D(1-x-y)\\,dA$ over the triangle $x,y\\ge0$, $x+y\\le1$, which is $\\tfrac16$.` },
                { prompt: `$\\mathbf F=\\langle0,0,1\\rangle$ upward through any graph $z=g(x,y)$ over a region $D$. Explain the result physically.`, answer: `$\\mathbf F\\cdot\\langle-g_x,-g_y,1\\rangle=1$, so the flux is the area of $D$. A uniform vertical flow crosses any surface above $D$ at the same rate as it crosses $D$ itself.` },
              ],
            },
            {
              slug: 'gauss-sphere',
              title: 'Flux of a point charge',
              prompt: `Let $\\mathbf F=\\dfrac{\\mathbf r}{|\\mathbf r|^3}$.`,
              kind: 'derivation',
              difficulty: 3,
              parts: [
                { prompt: `Show that the outward flux through a sphere of any radius centred at the origin is $4\\pi$.`, answer: `On the sphere of radius $a$, $\\mathbf n=\\mathbf r/a$, so $\\mathbf F\\cdot\\mathbf n=\\dfrac{a^2}{a^3\\cdot a}=\\dfrac{1}{a^2}$. Multiplying by the area $4\\pi a^2$ gives $4\\pi$, whatever $a$ is.` },
                { prompt: `Compute the flux through a sphere of radius $1$ centred at $(3,0,0)$, by symmetry and the result of the next lessons, or by arguing about field lines.`, answer: `$0$. The sphere does not contain the origin, so every field line that enters it also leaves it. (In the language of the divergence theorem, $\\nabla\\cdot\\mathbf F=0$ inside.)` },
                { prompt: `Explain the physical meaning.`, answer: `$\\mathbf F$ is the electric field of a point charge, up to a constant. The flux through a closed surface measures the charge inside, which is Gauss's law: it is the same for every sphere around the charge, and zero for a surface that encloses no charge.` },
              ],
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
          quiz: [
            {
              question: `What is the upward flux of $\\mathbf F=\\langle x,y,z\\rangle$ through the disk $x^2+y^2\\le4$ in the plane $z=3$?`,
              options: [`$4\\pi$`, `$0$`, `$3\\pi$`, `$12\\pi$`],
              answer: 3,
              explanation: `On the disk $\\mathbf n=\\mathbf k$, so $\\mathbf F\\cdot\\mathbf n=z=3$, and the flux is $3$ times the area $4\\pi$, that is $12\\pi$. $4\\pi$ is the area alone. The $x$- and $y$-components of $\\mathbf F$ lie along the disk and contribute nothing, but the $z$-component does not vanish, so the flux is not $0$.`,
            },
            {
              question: `What is the outward flux of $\\mathbf F=\\langle-y,x,0\\rangle$ through the sphere of radius $2$ centred at the origin?`,
              options: [`$16\\pi$`, `$0$`, `$8\\pi$`, `$\\tfrac{32\\pi}{3}$`],
              answer: 1,
              explanation: `$\\mathbf F\\cdot\\mathbf r=-yx+xy=0$, so the field is tangent to the sphere everywhere: it swirls around it without crossing. The flux is $0$. A flux measures only the normal component; a field can be large on a surface and still have zero flux through it.`,
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

\`\`\`interactive
vector-field
{"title": "Paddle wheel and flux circle", "fields": [["⟨−y, x⟩", "-y", "x"], ["⟨x, y⟩", "x", "y"], ["⟨y, 0⟩", "y", "0"], ["⟨x − y, x + y⟩", "x - y", "x + y"], ["⟨x², −xy⟩", "x^2", "-x*y"]], "view": [-3, 3, -3, 3], "modes": ["probe"], "probe": [1, 0.5], "caption": "This is a flat (two-dimensional) picture of a field in the xy-plane, so the curl points straight out of the screen and only its z-component Q_x − P_y shows. Press Spin: the wheel turns at half that rate, anticlockwise when it is positive. The rotation ⟨−y, x⟩ spins every wheel at rate 1, and as much flows into each circle as out of it; the source ⟨x, y⟩ never spins but pushes out through every circle (divergence 2); the shear ⟨y, 0⟩ spins wheels clockwise even though its flow lines are straight. Drag the probe: for ⟨x², −xy⟩ the spin and the outflow change from point to point."}
\`\`\`

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
              prompt: `Compute the curl and divergence of each field.`,
              kind: 'problem',
              difficulty: 1,
              parts: [
                { prompt: `$\\langle x^2y,\\ yz,\\ xz^2\\rangle$`, answer: `$\\nabla\\times\\mathbf F=\\langle0-y,\\ 0-z^2,\\ 0-x^2\\rangle=\\langle-y,-z^2,-x^2\\rangle$, and $\\nabla\\cdot\\mathbf F=2xy+z+2xz$.` },
                { prompt: `$\\langle e^x\\sin y,\\ e^x\\cos y,\\ z\\rangle$`, answer: `The curl is $\\mathbf 0$ (the only non-trivial term is $e^x\\cos y-e^x\\cos y$), and the divergence is $e^x\\sin y-e^x\\sin y+1=1$.` },
                { prompt: `$\\boldsymbol\\omega\\times\\mathbf r$, for a constant vector $\\boldsymbol\\omega$ and $\\mathbf r=\\langle x,y,z\\rangle$. What does it represent physically?`, answer: `$\\boldsymbol\\omega\\times\\mathbf r=\\langle\\omega_2z-\\omega_3y,\\ \\omega_3x-\\omega_1z,\\ \\omega_1y-\\omega_2x\\rangle$, with curl $2\\boldsymbol\\omega$ and divergence $0$. It is the velocity field of a rigid rotation with angular velocity $\\boldsymbol\\omega$.` },
              ],
            },
            {
              slug: 'conservative-in-space',
              title: 'Conservative fields in space',
              prompt: `Decide whether each field is conservative on all of space, using the curl, and find a potential if it is.`,
              kind: 'problem',
              difficulty: 2,
              parts: [
                { prompt: `$\\langle yz,\\ xz,\\ xy+2z\\rangle$`, answer: `The curl is $\\mathbf 0$, so it is conservative, with potential $f=xyz+z^2$.` },
                { prompt: `For that field, evaluate the line integral from $(0,0,0)$ to $(1,2,3)$.`, answer: `$f(1,2,3)-f(0,0,0)=6+9=15$.` },
                { prompt: `$\\langle2xy,\\ x^2+z,\\ y\\rangle$`, answer: `The curl is $\\langle1-1,0-0,2x-2x\\rangle=\\mathbf 0$, so it is conservative, with $f=x^2y+yz$.` },
                { prompt: `$\\langle y,\\ x,\\ x\\rangle$`, answer: `The curl is $\\langle0-0,\\ 0-1,\\ 1-1\\rangle=\\langle0,-1,0\\rangle\\ne\\mathbf 0$, so it is not conservative.` },
              ],
            },
            {
              slug: 'identities',
              title: 'Prove the identities',
              prompt: `Prove each identity from the component formulas.`,
              kind: 'derivation',
              difficulty: 3,
              parts: [
                { prompt: `Prove that $\\nabla\\times(\\nabla f)=\\mathbf 0$ and $\\nabla\\cdot(\\nabla\\times\\mathbf F)=0$.`, answer: `The first component of $\\nabla\\times\\nabla f$ is $f_{zy}-f_{yz}=0$ by Clairaut, and so on. $\\nabla\\cdot(\\nabla\\times\\mathbf F)=(R_y-Q_z)_x+(P_z-R_x)_y+(Q_x-P_y)_z$, whose six terms cancel in pairs of equal mixed partials.` },
                { prompt: `Show that $f=1/|\\mathbf r|$ is harmonic for $\\mathbf r\\ne\\mathbf 0$.`, answer: `$f_x=-x|\\mathbf r|^{-3}$ and $f_{xx}=-|\\mathbf r|^{-3}+3x^2|\\mathbf r|^{-5}$. Adding the three second derivatives gives $-3|\\mathbf r|^{-3}+3|\\mathbf r|^2|\\mathbf r|^{-5}=0$.` },
                { prompt: `Prove the product rule $\\nabla\\cdot(f\\mathbf F)=f\\,\\nabla\\cdot\\mathbf F+\\nabla f\\cdot\\mathbf F$, and use it to compute $\\nabla\\cdot(\\mathbf r/|\\mathbf r|^3)$ for $\\mathbf r\\ne\\mathbf 0$.`, answer: `$(fP)_x+(fQ)_y+(fR)_z=f(P_x+Q_y+R_z)+(f_xP+f_yQ+f_zR)$. With $f=|\\mathbf r|^{-3}$ and $\\mathbf F=\\mathbf r$: $\\nabla\\cdot\\mathbf r=3$ and $\\nabla|\\mathbf r|^{-3}=-3\\mathbf r/|\\mathbf r|^5$, so the divergence is $3|\\mathbf r|^{-3}-3|\\mathbf r|^2/|\\mathbf r|^5=0$.` },
              ],
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
          quiz: [
            {
              question: `For $\\mathbf F=\\langle yz,\\ x^2,\\ xyz\\rangle$, what is $\\nabla\\times\\mathbf F$ at $(1,1,1)$?`,
              options: [`$\\langle-1,0,-1\\rangle$`, `$\\langle1,0,1\\rangle$`, `$\\langle0,1,1\\rangle$`, `$\\langle1,1,1\\rangle$`],
              answer: 1,
              explanation: `$\\nabla\\times\\mathbf F=\\langle R_y-Q_z,\\ P_z-R_x,\\ Q_x-P_y\\rangle=\\langle xz,\\ y-yz,\\ 2x-z\\rangle$, which is $\\langle1,0,1\\rangle$ at $(1,1,1)$. $\\langle-1,0,-1\\rangle$ subtracts each pair in the wrong order. The divergence here is $xy=1$, a number, not a vector.`,
            },
            {
              question: `$f$ is a scalar function and $\\mathbf F$ a vector field on space. Which of these expressions is defined?`,
              options: [`$\\nabla\\times f$`, `$\\nabla\\cdot f$`, `$\\nabla\\times(\\nabla\\cdot\\mathbf F)$`, `$\\nabla\\cdot(\\nabla\\times\\mathbf F)$`],
              answer: 3,
              explanation: `The curl takes a vector field to a vector field, so its divergence makes sense (and is always $0$). The gradient is the operation for a scalar function; curl and divergence of a scalar are undefined. $\\nabla\\cdot\\mathbf F$ is a scalar, so it has no curl either.`,
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
              prompt: `Let $\\mathbf F=\\langle y,z,x\\rangle$, and let $S$ be the triangle with vertices $(1,0,0)$, $(0,1,0)$ and $(0,0,1)$, oriented upward.`,
              kind: 'problem',
              difficulty: 2,
              parts: [
                { prompt: `Compute the flux of $\\nabla\\times\\mathbf F$ through $S$.`, answer: `$\\nabla\\times\\mathbf F=\\langle-1,-1,-1\\rangle$. As the graph $z=1-x-y$, $d\\mathbf S=\\langle1,1,1\\rangle\\,dA$ over a triangle of area $\\tfrac12$, so the flux is $-3\\cdot\\tfrac12=-\\tfrac32$.` },
                { prompt: `Compute $\\oint_C\\mathbf F\\cdot d\\mathbf r$ around the three edges, in the direction that Stokes' theorem requires, and confirm that the two agree.`, answer: `Upward orientation means anticlockwise from above: $(1,0,0)\\to(0,1,0)\\to(0,0,1)\\to(1,0,0)$. Each edge contributes $-\\tfrac12$; for example $\\langle1-t,t,0\\rangle$ gives $\\int_0^1\\langle t,0,1-t\\rangle\\cdot\\langle-1,1,0\\rangle\\,dt=-\\tfrac12$. The total is $-\\tfrac32$, as Stokes' theorem says.` },
              ],
            },
            {
              slug: 'stokes-shortcuts',
              title: 'Use the easier side',
              prompt: `Use Stokes' theorem to replace a hard integral with an easy one.`,
              kind: 'problem',
              difficulty: 2,
              parts: [
                { prompt: `Evaluate $\\iint_S(\\nabla\\times\\mathbf F)\\cdot d\\mathbf S$ for $\\mathbf F=\\langle xz,\\ yz,\\ xy\\rangle$, where $S$ is the part of the sphere $x^2+y^2+z^2=4$ inside the cylinder $x^2+y^2=1$ and above the $xy$-plane, oriented upward. Use the boundary circle.`, answer: `The boundary is the circle $x^2+y^2=1$ at height $z=\\sqrt3$, traced as $\\langle\\cos t,\\sin t,\\sqrt3\\rangle$. Along it $\\mathbf F\\cdot\\mathbf r'=\\sqrt3(-\\cos t\\sin t+\\sin t\\cos t)+0=0$, so the answer is $0$.` },
                { prompt: `Explain why the flux of any curl through a closed surface, such as a whole sphere, is zero.`, answer: `A closed surface has no boundary, so the line integral side is $0$. Equivalently, split the sphere into two hemispheres: their boundaries are the same circle traced in opposite directions, so the two line integrals cancel.` },
              ],
            },
            {
              slug: 'curl-meaning',
              title: 'What the curl measures',
              prompt: `Let $C_\\varepsilon$ be the boundary of a small disk of radius $\\varepsilon$ centred at a point $P$, with unit normal $\\mathbf n$.`,
              kind: 'derivation',
              difficulty: 3,
              parts: [
                { prompt: `Use Stokes' theorem to show that $(\\nabla\\times\\mathbf F)(P)\\cdot\\mathbf n=\\lim_{\\varepsilon\\to0}\\dfrac{1}{\\pi\\varepsilon^2}\\oint_{C_\\varepsilon}\\mathbf F\\cdot d\\mathbf r$.`, answer: `By Stokes, $\\oint_{C_\\varepsilon}\\mathbf F\\cdot d\\mathbf r=\\iint_{D_\\varepsilon}(\\nabla\\times\\mathbf F)\\cdot\\mathbf n\\,dS$. The curl is continuous, so on the tiny disk it is within any given tolerance of its value at $P$, and the integral is $(\\nabla\\times\\mathbf F)(P)\\cdot\\mathbf n\\,\\pi\\varepsilon^2$ plus an error that is small compared with $\\varepsilon^2$. Divide and let $\\varepsilon\\to0$.` },
                { prompt: `Explain why this makes the curl a circulation per unit area, and why a paddle wheel spins fastest when its axle points along the curl.`, answer: `The right side is the circulation around a small loop divided by the area it encloses. A paddle wheel with axle $\\mathbf n$ is driven by that circulation, which is $(\\nabla\\times\\mathbf F)\\cdot\\mathbf n$ per unit area; this dot product is largest when $\\mathbf n$ points along the curl.` },
              ],
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
          quiz: [
            {
              question: `What is the circulation $\\oint_C\\mathbf F\\cdot d\\mathbf r$ of $\\mathbf F=\\langle-2y,\\ 3x,\\ z^2\\rangle$ around the circle $x^2+y^2=4$ in the plane $z=1$, anticlockwise seen from above?`,
              options: [`$4\\pi$`, `$10\\pi$`, `$20\\pi$`, `$-20\\pi$`],
              answer: 2,
              explanation: `$\\nabla\\times\\mathbf F=\\langle0,0,3-(-2)\\rangle=\\langle0,0,5\\rangle$. Through the flat disk of radius $2$, oriented upward, the flux is $5\\cdot4\\pi=20\\pi$. $4\\pi$ comes from $3-2$ instead of $3-(-2)$, and $-20\\pi$ is the clockwise value.`,
            },
            {
              question: `The upper unit hemisphere and the flat unit disk in the $xy$-plane have the same boundary circle, and both are oriented upward. How do the fluxes of $\\nabla\\times\\mathbf F$ through them compare?`,
              options: [`They are equal, for every smooth field $\\mathbf F$`, `The hemisphere's is larger, because its area is larger`, `They are equal only if $\\mathbf F$ is conservative`, `They have opposite signs`],
              answer: 0,
              explanation: `By Stokes' theorem both equal $\\oint_C\\mathbf F\\cdot d\\mathbf r$ around the same circle, traced in the same direction, so they are equal whatever $\\mathbf F$ is. The flux of a curl depends only on the boundary, not on the area of the surface. If $\\mathbf F$ is conservative both fluxes are $0$, but equality does not need that.`,
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
              prompt: `Use the divergence theorem to find each outward flux.`,
              kind: 'problem',
              difficulty: 1,
              parts: [
                { prompt: `$\\mathbf F=\\langle xy,yz,zx\\rangle$ through the surface of the cube $[0,1]^3$.`, answer: `$\\nabla\\cdot\\mathbf F=y+z+x$, and $\\iiint(x+y+z)\\,dV=3\\cdot\\tfrac12=\\tfrac32$.` },
                { prompt: `$\\mathbf F=\\langle x^2,y^2,z^2\\rangle$ through the closed cylinder $x^2+y^2\\le1$, $0\\le z\\le2$, including top and bottom.`, answer: `$\\nabla\\cdot\\mathbf F=2x+2y+2z$. The $x$ and $y$ terms integrate to $0$ by symmetry, and $\\iiint2z\\,dV=\\pi\\int_0^22z\\,dz=4\\pi$.` },
                { prompt: `$\\mathbf F=\\langle x,y,z\\rangle$ through the surface of the solid between the spheres of radius $1$ and $2$.`, answer: `$\\nabla\\cdot\\mathbf F=3$, and the shell has volume $\\tfrac43\\pi(8-1)$, so the flux is $28\\pi$.` },
              ],
            },
            {
              slug: 'verify-divergence',
              title: 'Check both sides',
              prompt: `Let $\\mathbf F=\\langle0,0,z\\rangle$ and let $E$ be the solid upper half of the unit ball.`,
              kind: 'problem',
              difficulty: 2,
              parts: [
                { prompt: `Compute the flux through the curved hemisphere.`, answer: `$\\mathbf n=\\langle x,y,z\\rangle$, so $\\mathbf F\\cdot\\mathbf n=z^2=\\cos^2\\varphi$, and $\\int_0^{2\\pi}\\int_0^{\\pi/2}\\cos^2\\varphi\\sin\\varphi\\,d\\varphi\\,d\\theta=\\dfrac{2\\pi}{3}$.` },
                { prompt: `Compute the flux through the flat disk at the bottom.`, answer: `There $z=0$, so $\\mathbf F=\\mathbf 0$ and the flux is $0$.` },
                { prompt: `Add them, and compare with $\\iiint\\nabla\\cdot\\mathbf F\\,dV$.`, answer: `The total is $\\tfrac{2\\pi}{3}$. Also $\\nabla\\cdot\\mathbf F=1$, so the triple integral is the volume of the half-ball, $\\tfrac{2\\pi}{3}$. They agree.` },
                { prompt: `Use the same closing idea to find the flux of $\\langle x,y,z\\rangle$ upward through the paraboloid $z=1-x^2-y^2$, $z\\ge0$.`, answer: `Close it with the unit disk at $z=0$. The divergence is $3$ and the solid has volume $\\int_0^{2\\pi}\\int_0^1(1-r^2)r\\,dr\\,d\\theta=\\tfrac\\pi2$, so the closed flux is $\\tfrac{3\\pi}{2}$. On the bottom disk $\\mathbf F\\cdot(-\\mathbf k)=-z=0$, so the paraboloid alone carries $\\tfrac{3\\pi}{2}$.` },
              ],
            },
            {
              slug: 'gauss-law-derivation',
              title: "Gauss's law and conservation",
              prompt: `Use the divergence theorem to derive two physical laws.`,
              kind: 'derivation',
              difficulty: 3,
              parts: [
                { prompt: `Using the region between a closed surface $S$ and a small sphere, prove that the outward flux of $\\mathbf r/|\\mathbf r|^3$ through any closed surface enclosing the origin is $4\\pi$.`, answer: `Let $E$ lie between $S$ and a small sphere $S_\\varepsilon$ about the origin. Its boundary is $S$ oriented outward and $S_\\varepsilon$ oriented inward, and $\\nabla\\cdot\\mathbf F=0$ in $E$. So the flux out through $S$ equals the flux out through $S_\\varepsilon$, which is $4\\pi$ by the direct computation.` },
                { prompt: `Derive the continuity equation $\\partial\\rho/\\partial t+\\nabla\\cdot(\\rho\\mathbf v)=0$ from conservation of mass, using the divergence theorem and the fact that a function whose integral over every small ball is zero must itself be zero, if it is continuous.`, answer: `For any ball $B$, the mass inside changes only by flow through the surface: $\\dfrac{d}{dt}\\iiint_B\\rho\\,dV=-\\iint_{\\partial B}\\rho\\mathbf v\\cdot\\mathbf n\\,dS=-\\iiint_B\\nabla\\cdot(\\rho\\mathbf v)\\,dV$. So $\\iiint_B\\left(\\rho_t+\\nabla\\cdot(\\rho\\mathbf v)\\right)dV=0$ for every ball, and the continuous integrand must be $0$.` },
              ],
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
          quiz: [
            {
              question: `What is the outward flux of $\\mathbf F=\\langle2x,\\ -y,\\ z^2\\rangle$ through the surface of the box $[0,1]\\times[0,2]\\times[0,3]$?`,
              options: [`$6$`, `$18$`, `$36$`, `$24$`],
              answer: 3,
              explanation: `$\\nabla\\cdot\\mathbf F=2-1+2z=1+2z$. Over the box, of volume $6$, $\\iiint1\\,dV=6$ and $\\iiint2z\\,dV=2\\cdot1\\cdot2\\cdot\\tfrac92=18$, so the flux is $24$. $36$ comes from losing the minus sign of $-y$ (divergence $3+2z$), and $18$ keeps only the $z$ term.`,
            },
            {
              question: `At a point of a fluid flow, $\\nabla\\cdot\\mathbf v>0$. What does that say about the flow near the point?`,
              options: [`More fluid flows out of a small ball around the point than flows in: it acts as a source`, `The fluid rotates about the point`, `The fluid moves faster there than elsewhere`, `The fluid is being compressed there`],
              answer: 0,
              explanation: `By the divergence theorem, the divergence is the net outward flux per unit volume of a small ball, so positive divergence means net outflow, a source (for a gas, expansion). Rotation is measured by the curl, a different quantity: a rigid rotation has divergence $0$. Speed alone does not decide it either: the fast uniform flow $\\langle5,0,0\\rangle$ has divergence $0$. Compression would mean net inflow, negative divergence.`,
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
