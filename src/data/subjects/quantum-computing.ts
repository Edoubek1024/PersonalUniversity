import { defineSubject } from '../define';
import type { ResourceInput } from '../types';

/*
 * Quantum Computing, following UIUC PHYS 370 (Introduction to Quantum Information and Computing).
 * Conventions used in every lesson and widget:
 *   qubit 0 is the top wire of a circuit and the LEFTMOST bit of a ket, |q0 q1 ... q(n-1)>
 *     (Nielsen and Chuang's order; Qiskit prints bit strings in the reverse order)
 *   H = [[1,1],[1,-1]]/sqrt2, S = diag(1, i), T = diag(1, e^{i pi/4}),
 *   R_x(t) = exp(-i t X/2), R_y(t) = exp(-i t Y/2), R_z(t) = exp(-i t Z/2) = diag(e^{-it/2}, e^{it/2})
 *   Bloch sphere: |psi> = cos(theta/2)|0> + e^{i phi} sin(theta/2)|1>, |0> at the north pole (+z), |+> at +x, |+i> at +y
 *   CHSH: measurement basis {cos t|0> + sin t|1>, -sin t|0> + cos t|1>}, so on |Phi+> P(same) = cos^2(tA - tB)
 *   |0> is the ground state; T1 relaxes toward |0>
 */

const free = (title: string, url: string, type: ResourceInput['type'], provider: string, note: string, primary = false): ResourceInput => ({
  title,
  url,
  type,
  cost: 'free',
  provider,
  note,
  primary,
});

const IBM_COURSES = {
  'basics-of-quantum-information': 'Basics of Quantum Information',
  'fundamentals-of-quantum-algorithms': 'Fundamentals of Quantum Algorithms',
  'general-formulation-of-quantum-information': 'General Formulation of Quantum Information',
  'foundations-of-quantum-error-correction': 'Foundations of Quantum Error Correction',
} as const;

/** John Watrous's four-course series "Understanding Quantum Information and Computation" on IBM Quantum Learning. */
const ibm = (course: keyof typeof IBM_COURSES, note: string, primary = false): ResourceInput =>
  free(`IBM Quantum Learning (John Watrous): ${IBM_COURSES[course]}`, `https://quantum.cloud.ibm.com/learning/en/courses/${course}`, 'course', 'IBM Quantum', note, primary);

const deWolf = (note: string, primary = false): ResourceInput =>
  free('Ronald de Wolf, Quantum Computing: Lecture Notes (arXiv 1907.09415)', 'https://arxiv.org/abs/1907.09415', 'textbook', 'QuSoft and University of Amsterdam, on arXiv', note, primary);

const shorLN = (note: string, primary = false): ResourceInput =>
  free('Peter Shor, MIT 8.370/18.435 Quantum Computation lecture notes', 'https://math.mit.edu/~shor/435-LN', 'lecture', 'MIT (Peter Shor)', note, primary);

const preskill = (note: string, primary = false): ResourceInput =>
  free('John Preskill, Ph219/CS219 Quantum Computation lecture notes', 'https://www.preskill.caltech.edu/ph219/', 'textbook', 'Caltech', note, primary);

const aaronson = (note: string): ResourceInput =>
  free('Scott Aaronson, Introduction to Quantum Information Science lecture notes', 'https://www.scottaaronson.com/qclec.pdf', 'lecture', 'UT Austin (Scott Aaronson)', note);

const childs = (note: string): ResourceInput =>
  free('Andrew Childs, Lecture Notes on Quantum Algorithms', 'https://www.cs.umd.edu/~amchilds/qa/', 'textbook', 'University of Maryland', note);

const uiuc = (note: string): ResourceInput =>
  free('UIUC PHYS 370: Introduction to Quantum Information and Computing (course page)', 'https://courses.physics.illinois.edu/phys370', 'course', 'University of Illinois Urbana-Champaign', note);

const ocw435 = (note: string): ResourceInput =>
  free('MIT OCW 18.435J Quantum Computation (Fall 2003)', 'https://ocw.mit.edu/courses/18-435j-quantum-computation-fall-2003/', 'course', 'MIT OpenCourseWare', note);

const berkeley = (note: string): ResourceInput =>
  free('Berkeley CS 191 Qubits, Quantum Mechanics and Computers (course page)', 'https://inst.eecs.berkeley.edu/~cs191/', 'course', 'UC Berkeley', note);

const vazirani = (note: string): ResourceInput =>
  free('Umesh Vazirani, Berkeley quantum computation course materials (CS 294 / C191 notes)', 'https://people.eecs.berkeley.edu/~vazirani/f19quantum.html', 'lecture', 'UC Berkeley (Umesh Vazirani)', note);

const qcvc = (note: string): ResourceInput =>
  free('Andy Matuschak and Michael Nielsen, Quantum computing for the very curious', 'https://quantum.country/qcvc', 'interactive', 'quantum.country', note);

const watrousVideos = (note: string): ResourceInput =>
  free('John Watrous, Understanding Quantum Information and Computation (video lectures)', 'https://www.youtube.com/playlist?list=PLOFEBzvs-VvqKKMXX4vbi4EB1uaErFMSO', 'lecture', 'IBM Quantum on YouTube', note);

const codebook = (slug: string, title: string, note: string): ResourceInput =>
  free(`PennyLane Codebook: ${title}`, `https://pennylane.ai/codebook/${slug}`, 'interactive', 'Xanadu (PennyLane)', note);

const pldemo = (slug: string, title: string, note: string): ResourceInput =>
  free(`PennyLane demo: ${title}`, `https://pennylane.ai/qml/demos/${slug}`, 'interactive', 'Xanadu (PennyLane)', note);

const quirk = (note: string): ResourceInput => free('Quirk, a drag-and-drop quantum circuit simulator', 'https://algassert.com/quirk', 'tool', 'Craig Gidney', note);

const composer = (note: string): ResourceInput =>
  ({ title: 'IBM Quantum Composer (Open Plan: free, about 10 minutes of hardware time per 28 days)', url: 'https://quantum.cloud.ibm.com/composer', type: 'tool', cost: 'freemium', provider: 'IBM Quantum', note });

const qiskitDocs = (note: string): ResourceInput => free('Qiskit documentation and tutorials', 'https://quantum.cloud.ibm.com/docs', 'documentation', 'IBM Quantum', note);

const arxiv = (id: string, title: string, note: string): ResourceInput => free(title, `https://arxiv.org/abs/${id}`, 'article', 'arXiv', note);

const nielsenChuang = (note: string): ResourceInput => ({
  title: 'Nielsen and Chuang, Quantum Computation and Quantum Information (10th anniversary edition)',
  url: 'https://www.cambridge.org/highereducation/books/quantum-computation-and-quantum-information/01E10196D0A682A6AEFFEA52D53BE9AE',
  type: 'textbook',
  cost: 'paid',
  provider: 'Cambridge University Press',
  note,
});

const mcmahon = (note: string): ResourceInput => ({
  title: 'David McMahon, Quantum Computing Explained (the PHYS 370 text)',
  url: 'https://www.wiley.com/en-us/Quantum+Computing+Explained-p-9780470096994',
  type: 'textbook',
  cost: 'paid',
  provider: 'Wiley',
  note,
});

export default defineSubject({
  id: 'quantum-computing',
  title: 'Quantum Computing',
  category: 'physics',
  tagline:
    'What a quantum computer physically is and what it does step by step: qubits, gates and entanglement computed by hand, teleportation and Bell tests, Deutsch-Jozsa, Simon, Shor and Grover, noise and error correction, and the superconducting, trapped-ion and neutral-atom machines being built today.',
  description: `A quantum computer stores information in qubits, physical systems such as a superconducting circuit, a trapped ion or a neutral atom whose state is a vector of complex amplitudes rather than a bit. It computes by applying carefully timed pulses that rotate those vectors and entangle them, and it reads out an answer by measurement, which returns ordinary bits with probabilities set by the amplitudes. This course answers five questions by the end: what a quantum computer is physically, what it does step by step, why it can be faster for some problems (and not for most), why it is so hard to build, and where the field actually stands.

The course follows **UIUC PHYS 370, Introduction to Quantum Information and Computing** (3 credit hours, prerequisite PHYS 214; text McMahon, *Quantum Computing Explained*, with Nielsen and Chuang as the reference): states and qubits, operators and measurement, tensor products, density matrices, entanglement, gates, circuits and algorithms, with Deutsch-Jozsa, Grover, Shor, teleportation, superdense coding and entanglement swapping run on simulators and real cloud hardware. It adds the theory side of **UIUC CS 498QC Introduction to Quantum Computing** (Spring 2025, Sinha and Jeronimo: the CHSH game, Simon's algorithm, uncomputation, complexity classes, stabiliser and toric codes, BB84), the hardware side of **Georgia Tech CS 8803 Quantum Hardware** (transmons, trapped ions and neutral atoms, how each implements gates and readout), and ideas from **Berkeley CS C191** and **MIT 8.370/18.435** (Shor's lecture notes). The content here is original; it is not affiliated with or endorsed by any of these universities.

You learn by computation. Every new idea comes with a worked state-vector calculation using real numbers: amplitudes multiplied out, probabilities summed, matrices checked for unitarity. The lessons name the misconceptions directly: a qubit does not "store both 0 and 1", a quantum computer does not "try every answer in parallel", entanglement sends no signal, Grover's speed-up is quadratic rather than exponential, quantum computers are not believed to solve NP-complete problems efficiently, and a machine with more physical qubits is not necessarily more useful. Interactive widgets let you build circuits and watch the state vector change gate by gate, rotate states on the Bloch sphere and watch noise shrink them, play the CHSH game, run Grover's iterations, find the period in Shor's algorithm and inject errors into a code.

The main free texts are John Watrous's IBM Quantum Learning courses, Ronald de Wolf's lecture notes, Preskill's Caltech notes and Shor's MIT notes, with the PennyLane Codebook and Quirk for practice. Module 1 teaches the linear algebra and complex numbers you need, so matrices and vectors at a first-course level, complex numbers and basic probability are enough to start. Programming is optional: each module project can be done by hand and checked in a widget, or done in Qiskit or PennyLane, and several run on IBM's free cloud hardware.`,
  difficulty: 'intermediate',
  estimatedHours: 120,
  prerequisites: [],
  recommendedBackground: [
    'Matrices and vectors at a first-course level: multiplying a matrix by a vector, matrix products, the idea of an eigenvector. Module 1 reviews what is needed.',
    'Complex numbers: arithmetic, modulus and the polar form re^{iφ}. Module 1 reviews them.',
    'Basic probability: outcomes, probabilities that sum to 1, expected values and independent repetition.',
    'Some Python helps for the optional Qiskit or PennyLane work but is not required; every project can be done by hand and checked in the site\'s widgets.',
  ],
  tags: ['quantum computing', 'quantum information', 'qubits', 'quantum algorithms', 'entanglement', 'quantum error correction', 'quantum hardware'],
  core: false,
  modules: [
    {
      slug: 'bits-qubits-and-the-maths',
      title: 'Bits, Qubits and the Maths You Need',
      description:
        'What changes when a bit becomes a qubit, and the exact mathematics the rest of the course uses: complex numbers, vectors in C², Dirac notation, inner products and bases, and matrices as operators (unitary and Hermitian, eigenvalues, trace).',
      lessons: [
        {
          slug: 'from-bits-to-qubits',
          title: 'From bits to qubits: what a quantum computer is',
          summary:
            'A deterministic bit, a probabilistic bit and a qubit side by side; amplitudes versus probabilities; a first look at the whole machine, from physical qubit to measured answer; and the misconceptions to drop now.',
          estimatedMinutes: 85,
          objectives: [
            'Describe a classical bit, a probabilistic bit (a probability vector) and a qubit (an amplitude vector)',
            'Compute measurement probabilities from amplitudes with the Born rule for a single qubit',
            'Explain why negative and complex amplitudes allow interference, which probabilities cannot',
            'Outline the stages of a quantum computation: prepare, apply gates, measure, repeat',
            'Explain why "a qubit stores 0 and 1 at once" and "it tries all answers in parallel" are misleading',
          ],
          concepts: [
            'Bit and probability vector',
            'Qubit as a unit vector of amplitudes',
            'Amplitude versus probability',
            'Born rule: probability = |amplitude|²',
            'Interference (amplitudes cancel)',
            'Prepare, evolve, measure, repeat (shots)',
            'Physical qubit: transmon, ion, atom',
          ],
          explanation: `A classical bit is in state 0 or 1. If you are unsure which, you describe it by a **probability vector** $(p_0, p_1)$ with $p_0, p_1 \\ge 0$ and $p_0 + p_1 = 1$; a fair coin is $(\\tfrac12, \\tfrac12)$. Operations on probabilistic bits are stochastic matrices: they keep entries non-negative and columns summing to 1.

A **qubit** replaces probabilities by **amplitudes**: its state is a vector $(\\alpha, \\beta)$ of complex numbers with $|\\alpha|^2 + |\\beta|^2 = 1$. Measuring it gives 0 with probability $|\\alpha|^2$ and 1 with probability $|\\beta|^2$ (the **Born rule**), and afterwards the qubit *is* in the state you observed. The state $(0.6, -0.8)$ gives 0 with probability 0.36 and 1 with probability 0.64.

Why bother, if measurement only ever gives bits? Because amplitudes can be negative or complex, they can **cancel**. Apply the "half-turn" matrix $H = \\tfrac{1}{\\sqrt2}\\begin{pmatrix}1&1\\\\1&-1\\end{pmatrix}$ to the state $(1, 0)$: you get $(0.707, 0.707)$, a 50/50 state. Apply it again: the two paths into the outcome 1 carry $+0.5$ and $-0.5$ and cancel, so you get $(1, 0)$ back with certainty. A coin flipped twice by a fair stochastic matrix stays 50/50; probabilities can only add. Every quantum speed-up you will meet is a carefully arranged pattern of such cancellations.

**The machine end to end.** A real quantum computer is a chip or a vacuum chamber holding physical qubits: superconducting circuits at 10 mK, trapped ions or neutral atoms held by lasers. A classical computer compiles your circuit into a timed list of microwave or laser pulses, each pulse rotates qubit states (a **gate**), and at the end each qubit is measured to a bit. Because one run gives one sample, the whole thing is repeated thousands of times (**shots**) to estimate probabilities.

**Drop two ideas now.** A qubit does not "store 0 and 1 at once" in a usable sense: one measurement yields one bit, and $n$ qubits yield at most $n$ bits of answer. A quantum computer does not "try every answer in parallel" and pick the right one; without interference designed into the algorithm, measuring a big superposition just gives a random answer.

Read Watrous's lesson 1 for the classical-probabilistic comparison, then the first section of Quantum Country.`,
          resources: [
            ibm('basics-of-quantum-information', 'Lesson 1, Single systems: classical and probabilistic states first, then quantum states. The clearest side-by-side treatment.', true),
            qcvc('The first part, up to the Hadamard gate, with spaced-repetition questions built in.'),
            uiuc('The official PHYS 370 page: syllabus, schedule and the course description this module follows.'),
            watrousVideos('The video version of the IBM course; the first lecture covers this lesson and the next three.'),
            mcmahon('Chapter 1 (the PHYS 370 text) introduces qubits the same way; optional, since everything is covered here.'),
          ],
          exercises: [
            {
              slug: 'born-rule-warmup',
              title: 'Probabilities from amplitudes',
              prompt:
                'For each state $(\\alpha, \\beta)$, check that it is normalised and give $P(0)$ and $P(1)$: (a) $(\\tfrac35, \\tfrac45)$; (b) $(\\tfrac{1}{\\sqrt2}, -\\tfrac{1}{\\sqrt2})$; (c) $(\\tfrac{1}{2}, \\tfrac{\\sqrt3}{2}i)$; (d) $(\\tfrac{1+i}{2}, \\tfrac{1}{\\sqrt2})$. Then say which two of these states give identical statistics in this measurement even though the vectors differ.',
              kind: 'problem',
              difficulty: 1,
              hint: '$|a + bi|^2 = a^2 + b^2$. (a) 0.36, 0.64; (b) 0.5, 0.5; (c) 0.25, 0.75; (d) $|1+i|^2/4 = 0.5$, 0.5. States (b) and (d) give 0.5/0.5 but are different vectors; the next module shows how to tell them apart.',
            },
            {
              slug: 'coin-versus-hadamard',
              title: 'A coin flipped twice versus H applied twice',
              prompt:
                'Let $F = \\begin{pmatrix}1/2&1/2\\\\1/2&1/2\\end{pmatrix}$ act on probability vectors and $H$ act on amplitude vectors. Compute $F(1,0)$, $F^2(1,0)$, $H(1,0)$ and $H^2(1,0)$ explicitly, with the probabilities of each result. In two sentences, say exactly which entry of which matrix makes the difference.',
              kind: 'problem',
              difficulty: 1,
              hint: '$F^2 = F$, so the coin stays 50/50. $H^2 = I$ because the $-1$ in the corner makes the two contributions to the second entry cancel.',
            },
            {
              slug: 'misconception-rewrite',
              title: 'Rewrite a headline',
              prompt:
                'A news article says: "A 300-qubit quantum computer stores more numbers than there are atoms in the universe and checks them all at once." Write a 150-word correction that keeps what is true (the state is described by $2^{300}$ amplitudes) and explains what is false, using the Born rule and the idea of interference.',
              kind: 'writing',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What is the difference between a probability vector and a qubit state?',
              answerOutline: 'Probability vectors have non-negative real entries summing to 1; a qubit state has complex amplitudes whose squared magnitudes sum to 1. Amplitudes can cancel; probabilities cannot.',
            },
            {
              question: 'Why is a quantum computation repeated many times?',
              answerOutline: 'Each run ends in a measurement that returns one sample (a bit string) drawn with the Born-rule probabilities; estimating probabilities or finding a high-probability answer needs many shots.',
            },
            {
              question: 'Why is "tries all answers in parallel" misleading?',
              answerOutline: 'Measuring a uniform superposition gives a random answer. Speed-ups come from interference that concentrates amplitude on useful outcomes, which only works for problems with special structure.',
            },
          ],
          quiz: [
            {
              question: 'A qubit is in the state $(0.28, 0.96i)$. What is the probability that measuring it gives 1?',
              options: ['0.96', '0.9216', '0.0784', '−0.9216'],
              answer: 1,
              explanation: '$P(1) = |0.96i|^2 = 0.9216$, and $P(0) = 0.28^2 = 0.0784$; together they make 1. Reporting 0.96 forgets to square the magnitude, and a probability can never be negative.',
            },
            {
              question: 'You apply $H$ twice to $(1,0)$ and get $(1,0)$. You apply a fair coin-flip matrix twice to $(1,0)$ and get $(0.5, 0.5)$. What explains the difference?',
              options: [
                'The coin is noisier hardware',
                'The two paths to outcome 1 have amplitudes $+0.5$ and $-0.5$, which cancel; probabilities can only add',
                'Measuring after the first $H$ resets the qubit',
                '$H$ is not a valid operation, so the comparison is unfair',
              ],
              answer: 1,
              explanation: 'Interference: after two $H$s the contributions to the second amplitude are $\\tfrac{1}{\\sqrt2}\\cdot\\tfrac{1}{\\sqrt2}$ and $\\tfrac{1}{\\sqrt2}\\cdot(-\\tfrac{1}{\\sqrt2})$, summing to 0. No measurement happens in between; if it did, the cancellation would be destroyed.',
            },
            {
              question: 'A program prepares 20 qubits in an equal superposition of all $2^{20}$ bit strings and measures them immediately. What do you get?',
              options: [
                'The answer to whatever problem was encoded',
                'All $2^{20}$ strings, read out one per qubit',
                'Nothing, because the state collapses to zero',
                'One uniformly random 20-bit string',
              ],
              answer: 3,
              explanation: 'Each string has probability $2^{-20}$, so you get one random string. Superposition alone gives no speed-up; an algorithm must use interference to make the useful outcomes likely before measuring.',
            },
          ],
          relatedLessons: ['quantum-mechanics/origins-and-wave-mechanics/the-schrodinger-equation-and-the-born-rule', 'physics-quantum/waves-and-interference/superposition-and-double-slits'],
        },
        {
          slug: 'complex-numbers-and-vectors',
          title: 'Complex numbers and vectors in C²',
          summary:
            'Complex arithmetic, modulus, conjugate and the polar form re^{iφ}; vectors in C², their norm, normalisation and why a phase factor e^{iφ} has magnitude 1.',
          estimatedMinutes: 90,
          objectives: [
            'Add, multiply and divide complex numbers and compute modulus and conjugate',
            'Convert between a + bi and re^{iφ} and multiply in polar form',
            'Compute the norm of a vector in C² and normalise it',
            'Show that multiplying by e^{iφ} changes no magnitude',
          ],
          concepts: [
            'Complex number a + bi',
            'Conjugate and modulus |z|² = z z̄',
            'Euler formula e^{iφ} = cos φ + i sin φ',
            'Polar form re^{iφ}',
            'Vectors in C²',
            'Norm and normalisation',
            'Phase factor of magnitude 1',
          ],
          explanation: `Amplitudes are complex numbers, so you need four facts about them.

**Arithmetic.** $z = a + bi$ with $i^2 = -1$. The **conjugate** is $\\bar z = a - bi$ and the **modulus** is $|z| = \\sqrt{a^2 + b^2}$, with $|z|^2 = z\\bar z$. For $z = 3 + 4i$: $\\bar z = 3 - 4i$, $|z| = 5$. Products: $(1 + i)(1 - i) = 1 - i^2 = 2$. To divide, multiply top and bottom by the conjugate: $\\frac{1}{1+i} = \\frac{1 - i}{2}$.

**Polar form.** Euler's formula $e^{i\\varphi} = \\cos\\varphi + i\\sin\\varphi$ puts every complex number in the form $re^{i\\varphi}$, with $r = |z|$ and $\\varphi$ the angle from the positive real axis. So $i = e^{i\\pi/2}$, $-1 = e^{i\\pi}$, $\\frac{1+i}{\\sqrt2} = e^{i\\pi/4}$. Multiplying multiplies moduli and **adds angles**: $e^{i\\pi/4}\\cdot e^{i\\pi/4} = e^{i\\pi/2} = i$. Every number $e^{i\\varphi}$ lies on the unit circle; it has modulus 1. That one fact will explain why a "global phase" is invisible to measurement.

\`\`\`interactive
unit-circle
{"degrees": 45, "tan": false, "title": "The phase factor on the unit circle", "caption": "Read the point as the complex number e^(iφ) = cos φ + i sin φ: the horizontal coordinate is the real part, the vertical one the imaginary part. Drag it to 90° (that is i), 180° (−1) and 45° ((1+i)/√2). The distance from the centre is always 1, which is why multiplying an amplitude by e^(iφ) never changes a probability."}
\`\`\`

**Vectors in $\\mathbb{C}^2$.** A qubit state is a column $\\begin{pmatrix}\\alpha\\\\ \\beta\\end{pmatrix}$ of two complex numbers. Its **norm** is $\\sqrt{|\\alpha|^2 + |\\beta|^2}$ (note the moduli: $\\alpha^2 + \\beta^2$ is wrong, since $1^2 + i^2 = 0$). A physical state has norm 1. To **normalise** $(1, 1 + i)$, compute $|1|^2 + |1+i|^2 = 1 + 2 = 3$ and divide: $\\frac{1}{\\sqrt3}(1, 1 + i)$.

**A pitfall.** $|\\alpha + \\beta|^2 \\ne |\\alpha|^2 + |\\beta|^2$ in general: $|\\alpha + \\beta|^2 = |\\alpha|^2 + |\\beta|^2 + 2\\,\\mathrm{Re}(\\alpha\\bar\\beta)$. That cross term is interference, and the relative angle between $\\alpha$ and $\\beta$ controls its sign. With $\\alpha = \\beta = \\tfrac12$ you get 1; with $\\alpha = \\tfrac12$, $\\beta = -\\tfrac12$ you get 0.

If complex numbers are rusty, work through the first two lessons of the complex-variables course (linked) or the Codebook's first module, which drills exactly these operations.`,
          resources: [
            codebook('introduction-to-quantum-computing', 'Introduction to quantum computing', 'Nodes I.1-I.3 drill complex vectors, normalisation and inner products with instant feedback.', ),
            ibm('basics-of-quantum-information', 'Lesson 1, sections on quantum state vectors and the notation used; skim if the algebra is familiar.'),
            deWolf('Appendix A (linear algebra and Dirac notation) is a compact reference for everything in this module.', true),
          ],
          exercises: [
            {
              slug: 'complex-drill',
              title: 'Complex arithmetic drill',
              prompt:
                'Compute exactly: (a) $(2 - 3i)(1 + 2i)$; (b) $\\frac{3 + i}{1 - i}$; (c) $|\\tfrac{1}{2} - \\tfrac{\\sqrt3}{2}i|$; (d) the polar form of $-1 + i$; (e) $(e^{i\\pi/8})^4$; (f) $e^{i\\pi/3} + e^{-i\\pi/3}$.',
              kind: 'problem',
              difficulty: 1,
              hint: '(a) $8 + i$; (b) $(3+i)(1+i)/2 = 1 + 2i$; (c) 1; (d) $\\sqrt2\\,e^{3i\\pi/4}$; (e) $e^{i\\pi/2} = i$; (f) $2\\cos(\\pi/3) = 1$.',
            },
            {
              slug: 'normalise-states',
              title: 'Normalise and compare',
              prompt:
                'Normalise (a) $(1, i)$, (b) $(2, 1 - i)$, (c) $(1 + i, 1 - i)$. For each normalised state give $P(0)$ and $P(1)$. Then write each amplitude of (c) in polar form and show that (c) equals $e^{i\\pi/4}$ times $\\frac{1}{\\sqrt2}(1, -i)$.',
              kind: 'problem',
              difficulty: 2,
              hint: '(a) $\\frac{1}{\\sqrt2}(1, i)$, 0.5/0.5. (b) $4 + 2 = 6$, so $\\frac{1}{\\sqrt6}(2, 1 - i)$ with $P(0) = 2/3$. (c) The norm squared is 4, so the state is $\\frac12(1+i, 1-i) = \\frac{1}{\\sqrt2}(e^{i\\pi/4}, e^{-i\\pi/4})$; factor out $e^{i\\pi/4}$ and use $e^{-i\\pi/2} = -i$.',
            },
            {
              slug: 'interference-term',
              title: 'The cross term',
              prompt:
                'Let $\\alpha = \\tfrac{1}{2}$ and $\\beta = \\tfrac12 e^{i\\varphi}$. Compute $|\\alpha + \\beta|^2$ as a function of $\\varphi$ and evaluate it at $\\varphi = 0, \\pi/2, \\pi$. Explain in one sentence why this is the formula for an interference fringe.',
              kind: 'derivation',
              difficulty: 2,
              hint: '$|\\alpha + \\beta|^2 = \\tfrac14 + \\tfrac14 + 2\\cdot\\tfrac14\\cos\\varphi = \\tfrac12(1 + \\cos\\varphi)$: 1, 0.5, 0.',
            },
          ],
          selfAssessment: [
            {
              question: 'Why is the norm of $(\\alpha, \\beta)$ computed with $|\\alpha|^2 + |\\beta|^2$ rather than $\\alpha^2 + \\beta^2$?',
              answerOutline: 'Squares of complex numbers can be negative or complex ($i^2 = -1$); the moduli squared are real and non-negative and give a genuine length.',
            },
            {
              question: 'What happens to moduli and angles when you multiply two complex numbers in polar form?',
              answerOutline: 'Moduli multiply and angles add: $r_1e^{i\\varphi_1} r_2e^{i\\varphi_2} = r_1r_2e^{i(\\varphi_1+\\varphi_2)}$.',
            },
            {
              question: 'Why does multiplying an amplitude by $e^{i\\varphi}$ not change its probability?',
              answerOutline: '$|e^{i\\varphi}z|^2 = |e^{i\\varphi}|^2|z|^2 = |z|^2$ because $|e^{i\\varphi}| = 1$.',
            },
          ],
          quiz: [
            {
              question: 'What is the normalised version of the vector $(1 - i, 1)$?',
              options: ['$\\frac{1}{\\sqrt2}(1 - i, 1)$', '$\\frac{1}{\\sqrt3}(1 - i, 1)$', '$\\frac{1}{3}(1 - i, 1)$', '$(1 - i, 1)$, which is already normalised'],
              answer: 1,
              explanation: '$|1 - i|^2 + |1|^2 = 2 + 1 = 3$, so divide by $\\sqrt3$. Dividing by $\\sqrt2$ treats $|1 - i|^2$ as 1, and dividing by 3 forgets the square root.',
            },
            {
              question: 'Which number equals $e^{i\\pi/4}\\cdot e^{i\\pi/2}$?',
              options: ['$e^{i\\pi/8}$', '$\\frac{1+i}{\\sqrt2}$', '$\\frac{-1+i}{\\sqrt2}$', '$i\\pi^2/8$'],
              answer: 2,
              explanation: 'Angles add: $\\pi/4 + \\pi/2 = 3\\pi/4$, and $e^{3i\\pi/4} = \\cos 135° + i\\sin 135° = \\frac{-1+i}{\\sqrt2}$. Multiplying the angles gives $\\pi^2/8$, a common slip.',
            },
            {
              question: 'Two amplitudes $\\alpha = 0.6$ and $\\beta = 0.6e^{i\\varphi}$ contribute to the same outcome. For which $\\varphi$ is $|\\alpha + \\beta|^2$ smallest, and what is it?',
              options: ['$\\varphi = 0$, value 0.72', '$\\varphi = \\pi/2$, value 0.72', '$\\varphi = \\pi$, value 0', '$\\varphi = \\pi$, value 0.72'],
              answer: 2,
              explanation: '$|\\alpha+\\beta|^2 = 0.36 + 0.36 + 0.72\\cos\\varphi$, which is 0 at $\\varphi = \\pi$ (full cancellation) and 1.44 at $\\varphi = 0$. At $\\pi/2$ the cross term vanishes and you get 0.72, the "no interference" value.',
            },
          ],
          relatedLessons: [
            'complex-variables/complex-numbers-and-functions/complex-arithmetic-and-polar-form',
            'math-methods/fourier-and-complex-analysis/complex-analytic-functions',
          ],
        },
        {
          slug: 'dirac-notation-and-inner-products',
          title: 'Dirac notation, inner products and orthonormal bases',
          summary:
            'Kets and bras, the inner product ⟨φ|ψ⟩ and why it uses complex conjugates, orthonormal bases (the Z, X and Y bases of a qubit), expanding a state in a basis, and outer products.',
          estimatedMinutes: 100,
          objectives: [
            'Write states as kets and their conjugate transposes as bras',
            'Compute inner products ⟨φ|ψ⟩ and check orthogonality and normalisation',
            'Expand a state in the |0⟩/|1⟩, |+⟩/|−⟩ and |+i⟩/|−i⟩ bases',
            'Compute outer products |ψ⟩⟨φ| as matrices and use the completeness relation',
          ],
          concepts: [
            'Ket |ψ⟩ and bra ⟨ψ|',
            'Inner product ⟨φ|ψ⟩ (conjugate-linear in the bra)',
            'Orthonormal basis',
            'Computational basis |0⟩, |1⟩',
            'Hadamard basis |+⟩, |−⟩',
            'Circular basis |+i⟩, |−i⟩',
            'Coordinates ⟨b_k|ψ⟩',
            'Outer product and completeness Σ|k⟩⟨k| = I',
          ],
          explanation: `Dirac notation is just a compact way of writing column and row vectors. A **ket** $|\\psi\\rangle$ is a column; the **computational basis** is $|0\\rangle = \\begin{pmatrix}1\\\\0\\end{pmatrix}$ and $|1\\rangle = \\begin{pmatrix}0\\\\1\\end{pmatrix}$, so $|\\psi\\rangle = \\alpha|0\\rangle + \\beta|1\\rangle$. The **bra** $\\langle\\psi|$ is the conjugate transpose, the row $(\\bar\\alpha\\ \\ \\bar\\beta)$.

**Inner product.** $\\langle\\varphi|\\psi\\rangle$ is a bra times a ket, a single complex number: for $|\\varphi\\rangle = \\gamma|0\\rangle + \\delta|1\\rangle$, $\\langle\\varphi|\\psi\\rangle = \\bar\\gamma\\alpha + \\bar\\delta\\beta$. The conjugate is what makes $\\langle\\psi|\\psi\\rangle = |\\alpha|^2 + |\\beta|^2$ real and positive, the squared length. Swapping the order conjugates the result: $\\langle\\psi|\\varphi\\rangle = \\overline{\\langle\\varphi|\\psi\\rangle}$. Two states are **orthogonal** when $\\langle\\varphi|\\psi\\rangle = 0$; orthogonal states are perfectly distinguishable by some measurement.

**Three bases you will use constantly.**
$$|\\pm\\rangle = \\tfrac{1}{\\sqrt2}(|0\\rangle \\pm |1\\rangle), \\qquad |\\pm i\\rangle = \\tfrac{1}{\\sqrt2}(|0\\rangle \\pm i|1\\rangle).$$
Check: $\\langle +|-\\rangle = \\tfrac12(1 - 1) = 0$. For the second pair, the bra of $|+i\\rangle$ is $\\tfrac{1}{\\sqrt2}(1,\\ -i)$, so $\\langle +i|-i\\rangle = \\tfrac12(1\\cdot1 + (-i)(-i)) = \\tfrac12(1 - 1) = 0$. Forgetting the conjugate would give $\\tfrac12(1 + i(-i)) = 1$, a wrong "they are the same state".

**Coordinates in any orthonormal basis** $\\{|b_0\\rangle, |b_1\\rangle\\}$ are inner products: $|\\psi\\rangle = \\langle b_0|\\psi\\rangle|b_0\\rangle + \\langle b_1|\\psi\\rangle|b_1\\rangle$. For $|\\psi\\rangle = 0.6|0\\rangle + 0.8|1\\rangle$: $\\langle +|\\psi\\rangle = 1.4/\\sqrt2 \\approx 0.990$ and $\\langle -|\\psi\\rangle = -0.2/\\sqrt2 \\approx -0.141$. The squares, 0.98 and 0.02, will turn out to be the probabilities of measuring in the $\\pm$ basis.

**Outer products** $|\\psi\\rangle\\langle\\varphi|$ are matrices (column times row). $|0\\rangle\\langle 0| = \\begin{pmatrix}1&0\\\\0&0\\end{pmatrix}$ projects onto $|0\\rangle$, and $|0\\rangle\\langle 1| = \\begin{pmatrix}0&1\\\\0&0\\end{pmatrix}$ maps $|1\\rangle$ to $|0\\rangle$. For any orthonormal basis, $\\sum_k |b_k\\rangle\\langle b_k| = I$ (**completeness**); inserting this identity is the most useful trick in the subject.

Watrous lesson 1 and de Wolf appendix A cover this; the Codebook nodes give practice.`,
          resources: [
            ibm('basics-of-quantum-information', 'Lesson 1, Dirac notation and quantum state vectors; lesson 1 also introduces the plus/minus and plus-i/minus-i states used here.', true),
            deWolf('Appendix A: Dirac notation, inner and outer products, orthonormal bases.'),
            codebook('introduction-to-quantum-computing', 'Introduction to quantum computing', 'Nodes on Dirac notation and inner products: compute inner products in code and check them by hand.'),
          ],
          exercises: [
            {
              slug: 'inner-product-table',
              title: 'Inner products among the six states',
              prompt:
                'Compute $\\langle a|b\\rangle$ for every pair $a, b \\in \\{0, 1, +, -, +i, -i\\}$ (a 6 × 6 table; use symmetry $\\langle a|b\\rangle = \\overline{\\langle b|a\\rangle}$ to halve the work). Then give $|\\langle a|b\\rangle|^2$ for each pair and describe the pattern in one sentence.',
              kind: 'problem',
              difficulty: 2,
              hint: 'Every state is orthogonal to its partner in the same basis and has overlap-squared 1/2 with all four states of the other two bases (for example $\\langle 0|+i\\rangle = 1/\\sqrt2$, $\\langle +|+i\\rangle = (1+i)/2$).',
            },
            {
              slug: 'change-of-basis',
              title: 'Expand in another basis',
              prompt:
                'Write each state in the $\\{|+\\rangle, |-\\rangle\\}$ basis and in the $\\{|+i\\rangle, |-i\\rangle\\}$ basis: (a) $|0\\rangle$; (b) $|1\\rangle$; (c) $\\tfrac{1}{2}|0\\rangle + \\tfrac{\\sqrt3}{2}|1\\rangle$. Check each expansion by multiplying it back out.',
              kind: 'problem',
              difficulty: 2,
              hint: '$|0\\rangle = (|+\\rangle + |-\\rangle)/\\sqrt2 = (|+i\\rangle + |-i\\rangle)/\\sqrt2$, and $|1\\rangle = (|+\\rangle - |-\\rangle)/\\sqrt2 = -i(|+i\\rangle - |-i\\rangle)/\\sqrt2$.',
            },
            {
              slug: 'outer-products',
              title: 'Outer products and completeness',
              prompt:
                'Compute the matrices $|+\\rangle\\langle +|$, $|-\\rangle\\langle -|$ and $|+i\\rangle\\langle +i|$. Verify $|+\\rangle\\langle+| + |-\\rangle\\langle-| = I$ and $|+\\rangle\\langle+| - |-\\rangle\\langle-| = \\begin{pmatrix}0&1\\\\1&0\\end{pmatrix}$. What does $|+i\\rangle\\langle+i| - |-i\\rangle\\langle-i|$ equal?',
              kind: 'derivation',
              difficulty: 2,
              hint: '$|+i\\rangle\\langle +i| = \\tfrac12\\begin{pmatrix}1&-i\\\\i&1\\end{pmatrix}$; the difference is $\\begin{pmatrix}0&-i\\\\i&0\\end{pmatrix}$, the Pauli $Y$ matrix.',
            },
          ],
          selfAssessment: [
            {
              question: 'Why does the bra carry complex conjugates?',
              answerOutline: 'So that ⟨ψ|ψ⟩ = Σ|amplitude|² is a real non-negative length; without conjugation a nonzero vector like (1, i) would have "length" 0.',
            },
            {
              question: 'How do you find the coordinates of |ψ⟩ in an orthonormal basis?',
              answerOutline: 'Take inner products with each basis vector: c_k = ⟨b_k|ψ⟩, so |ψ⟩ = Σ c_k |b_k⟩ (completeness).',
            },
            {
              question: 'What is the overlap |⟨0|+⟩|² and what does it mean physically?',
              answerOutline: '1/2: a qubit prepared in |+⟩ gives 0 half the time in a computational-basis measurement; the bases are "mutually unbiased".',
            },
          ],
          quiz: [
            {
              question: 'Let $|\\varphi\\rangle = \\tfrac{1}{\\sqrt2}(|0\\rangle + i|1\\rangle)$ and $|\\psi\\rangle = \\tfrac{1}{\\sqrt2}(|0\\rangle + |1\\rangle)$. What is $\\langle\\varphi|\\psi\\rangle$?',
              options: ['$\\frac{1+i}{2}$', '$\\frac{1-i}{2}$', '$1$', '$0$'],
              answer: 1,
              explanation: 'The bra conjugates: $\\langle\\varphi| = \\tfrac{1}{\\sqrt2}(1, -i)$, so $\\langle\\varphi|\\psi\\rangle = \\tfrac12(1 - i)$. Forgetting the conjugate gives $\\frac{1+i}{2}$, which is $\\langle\\psi|\\varphi\\rangle$.',
            },
            {
              question: 'Which pair of states is orthogonal?',
              options: [
                '$|0\\rangle$ and $|+\\rangle$',
                '$|+\\rangle$ and $|+i\\rangle$',
                '$\\tfrac{1}{\\sqrt2}(|0\\rangle + i|1\\rangle)$ and $\\tfrac{1}{\\sqrt2}(|0\\rangle - i|1\\rangle)$',
                '$|1\\rangle$ and $-|1\\rangle$',
              ],
              answer: 2,
              explanation: '$\\langle +i|-i\\rangle = \\tfrac12(1 + (-i)(-i)) = \\tfrac12(1 - 1) = 0$. $|1\\rangle$ and $-|1\\rangle$ differ only by a sign and have overlap magnitude 1; the other pairs have overlap magnitude $1/\\sqrt2$.',
            },
            {
              question: 'The state $|\\psi\\rangle = 0.8|0\\rangle - 0.6|1\\rangle$ is written in the $\\{|+\\rangle, |-\\rangle\\}$ basis. What is the coefficient of $|-\\rangle$?',
              options: ['$1.4/\\sqrt2 \\approx 0.990$', '$0.2/\\sqrt2 \\approx 0.141$', '$-0.6$', '$0.98$'],
              answer: 0,
              explanation: '$\\langle -|\\psi\\rangle = \\tfrac{1}{\\sqrt2}(0.8 - (-0.6)) = 1.4/\\sqrt2 \\approx 0.990$, and the $|+\\rangle$ coefficient is $0.2/\\sqrt2$. 0.98 is the squared coefficient, a probability rather than an amplitude.',
            },
          ],
          relatedLessons: [
            'quantum-mechanics/formalism-and-dirac-notation/hilbert-space-states-and-operators',
            'math-methods/linear-algebra/vector-spaces-bases-and-inner-products',
            'abstract-linear-algebra/inner-product-spaces/inner-products-and-orthonormal-bases',
          ],
        },
        {
          slug: 'operators-unitary-and-hermitian',
          title: 'Operators: unitary and Hermitian matrices, eigenvalues and trace',
          summary:
            'Matrices as operators on states; the adjoint; unitary matrices (gates, which preserve length) and Hermitian matrices (observables, with real eigenvalues); the Pauli matrices; eigenvalues, eigenvectors, spectral decomposition and trace.',
          estimatedMinutes: 110,
          objectives: [
            'Compute the adjoint A† and test whether a matrix is unitary or Hermitian',
            'Explain why gates must be unitary and why observables are Hermitian',
            'Find eigenvalues and eigenvectors of 2 × 2 matrices such as X, Y, Z and H',
            'Write a Hermitian matrix as Σ λ_k |v_k⟩⟨v_k| and compute traces',
            'Multiply Pauli matrices and use XY = iZ and its cyclic versions',
          ],
          concepts: [
            'Adjoint A† (conjugate transpose)',
            'Unitary U†U = I (gates)',
            'Hermitian A† = A (observables)',
            'Pauli matrices X, Y, Z',
            'Eigenvalues and eigenvectors',
            'Spectral decomposition',
            'Trace and its cyclic property',
            'Unitary versus Hermitian (H is both)',
          ],
          explanation: `A matrix acts on a ket by ordinary multiplication: $X|0\\rangle = |1\\rangle$ for $X = \\begin{pmatrix}0&1\\\\1&0\\end{pmatrix}$. In outer-product form $X = |0\\rangle\\langle 1| + |1\\rangle\\langle 0|$, which you can read as "send 1 to 0 and 0 to 1".

**The adjoint** $A^\\dagger$ is the conjugate transpose, and $(A|\\psi\\rangle)^\\dagger = \\langle\\psi|A^\\dagger$.

**Unitary matrices** satisfy $U^\\dagger U = I$. They preserve inner products, $\\langle U\\varphi|U\\psi\\rangle = \\langle\\varphi|U^\\dagger U|\\psi\\rangle = \\langle\\varphi|\\psi\\rangle$, so they map normalised states to normalised states and keep orthogonal states orthogonal. That is exactly what an isolated physical evolution does, so **every gate is unitary**, and every gate is reversible ($U^{-1} = U^\\dagger$). Test: $S = \\mathrm{diag}(1, i)$ has $S^\\dagger S = \\mathrm{diag}(1, \\bar i i) = I$, so $S$ is unitary. $\\begin{pmatrix}1&1\\\\0&1\\end{pmatrix}$ is not (it maps $|1\\rangle$ to a vector of length $\\sqrt2$).

**Hermitian matrices** satisfy $A^\\dagger = A$. Their eigenvalues are real and eigenvectors for different eigenvalues are orthogonal, so $A = \\sum_k \\lambda_k|v_k\\rangle\\langle v_k|$ (**spectral decomposition**). Hermitian matrices are **observables**: measuring $A$ gives one of the $\\lambda_k$. The **Pauli matrices**
$$X = \\begin{pmatrix}0&1\\\\1&0\\end{pmatrix},\\quad Y = \\begin{pmatrix}0&-i\\\\i&0\\end{pmatrix},\\quad Z = \\begin{pmatrix}1&0\\\\0&-1\\end{pmatrix}$$
are Hermitian *and* unitary, each with eigenvalues $\\pm1$: $Z$ has eigenvectors $|0\\rangle, |1\\rangle$, $X$ has $|\\pm\\rangle$, $Y$ has $|\\pm i\\rangle$. They multiply like $XY = iZ$, $YZ = iX$, $ZX = iY$, and each squares to $I$.

**Finding eigenvalues.** Solve $\\det(A - \\lambda I) = 0$. For $H = \\tfrac{1}{\\sqrt2}\\begin{pmatrix}1&1\\\\1&-1\\end{pmatrix}$: $\\lambda^2 - 1 = 0$, so $\\lambda = \\pm1$, with eigenvector for $+1$ proportional to $(1 + \\sqrt2, 1)$. Geometrically $H$ is a reflection of the real plane, which the widget shows.

\`\`\`interactive
matrix-transform
{"A": [[0.7071, 0.7071], [0.7071, -0.7071]], "mode": "eigen", "modes": ["transform", "eigen"], "name": "H", "vec": "v", "x": [1, 0], "presets": ["rotation", "reflection"], "title": "The Hadamard matrix acting on real vectors", "caption": "H restricted to real amplitudes is a reflection: the determinant is −1, one eigenvector line is kept (λ = 1) and the perpendicular line is flipped (λ = −1). Move v onto each eigenvector line, then compare with the rotation preset, which is unitary but has complex eigenvalues."}
\`\`\`

**Trace.** $\\mathrm{Tr}\\,A = \\sum_i A_{ii} = \\sum_k\\lambda_k$, and $\\mathrm{Tr}(AB) = \\mathrm{Tr}(BA)$. All three Paulis have trace 0. Do not confuse the two roles: a unitary *acts on* a state; a Hermitian matrix *is measured*. Hadamard happens to be both.`,
          resources: [
            ibm('basics-of-quantum-information', 'Lesson 1, unitary operations: Pauli, Hadamard and phase operations, with the unitarity check.', true),
            deWolf('Appendix A: unitary and Hermitian matrices, eigen-decomposition, trace and the tensor product (used in module 3).'),
            nielsenChuang('Section 2.1 is the classic, careful treatment of the linear algebra of quantum computing. Free alternative: de Wolf appendix A.'),
          ],
          exercises: [
            {
              slug: 'unitary-test',
              title: 'Unitary, Hermitian, both or neither?',
              prompt:
                'Classify each matrix as unitary, Hermitian, both or neither, showing the check: $X$, $Y$, $S = \\mathrm{diag}(1, i)$, $T = \\mathrm{diag}(1, e^{i\\pi/4})$, $H$, $\\begin{pmatrix}1&0\\\\0&2\\end{pmatrix}$, $\\tfrac{1}{\\sqrt2}\\begin{pmatrix}1&-i\\\\-i&1\\end{pmatrix}$, $\\begin{pmatrix}1&1\\\\0&1\\end{pmatrix}$.',
              kind: 'problem',
              difficulty: 1,
              hint: '$S$ and $T$ are unitary but not Hermitian; diag(1, 2) is Hermitian but not unitary; the matrix with $-i$ off the diagonal is $R_x(\\pi/2)$, unitary only; the shear is neither.',
            },
            {
              slug: 'pauli-algebra',
              title: 'Pauli algebra and eigenvectors',
              prompt:
                'Verify $XY = iZ$ and $YX = -iZ$ by multiplying matrices, and deduce $XY + YX = 0$. Find the eigenvalues and normalised eigenvectors of $Y$ and of $\\tfrac{1}{\\sqrt2}(X + Z)$, and write $\\tfrac{1}{\\sqrt2}(X + Z)$ in spectral form. Which familiar gate is it?',
              kind: 'derivation',
              difficulty: 2,
              hint: '$\\tfrac{1}{\\sqrt2}(X + Z) = H$. Its $+1$ eigenvector is $(\\cos\\tfrac{\\pi}{8}, \\sin\\tfrac{\\pi}{8})$ and its $-1$ eigenvector is $(-\\sin\\tfrac{\\pi}{8}, \\cos\\tfrac{\\pi}{8})$.',
            },
            {
              slug: 'spectral-and-trace',
              title: 'Build an observable from its eigenvectors',
              prompt:
                'Construct the Hermitian matrix with eigenvalue $+2$ on $|+\\rangle$ and $-1$ on $|-\\rangle$, as $2|+\\rangle\\langle+| - |-\\rangle\\langle-|$. Check that its trace equals the sum of eigenvalues and its determinant equals their product. Then compute $\\mathrm{Tr}(XZ)$ and $\\mathrm{Tr}(ZX)$ and confirm the cyclic property.',
              kind: 'problem',
              difficulty: 2,
              hint: 'The matrix is $\\begin{pmatrix}0.5&1.5\\\\1.5&0.5\\end{pmatrix}$: trace 1, determinant $-2$. $XZ = \\begin{pmatrix}0&-1\\\\1&0\\end{pmatrix}$ has trace 0.',
            },
          ],
          selfAssessment: [
            {
              question: 'Why must quantum gates be unitary?',
              answerOutline: 'Closed-system evolution preserves total probability (the norm) and inner products; the matrices that do this are exactly the unitaries, which are also invertible.',
            },
            {
              question: 'What makes Hermitian matrices suitable as observables?',
              answerOutline: 'Real eigenvalues (the possible measurement results) and an orthonormal eigenbasis (the post-measurement states); spectral decomposition A = Σλ_k|v_k⟩⟨v_k|.',
            },
            {
              question: 'State the eigenvalues and eigenvectors of X, Y and Z.',
              answerOutline: 'All have eigenvalues ±1; Z: |0⟩, |1⟩; X: |+⟩, |−⟩; Y: |+i⟩, |−i⟩.',
            },
          ],
          quiz: [
            {
              question: 'Which matrix is unitary but not Hermitian?',
              options: ['$Z$', '$\\begin{pmatrix}2&0\\\\0&1\\end{pmatrix}$', '$H$', '$\\begin{pmatrix}1&0\\\\0&e^{i\\pi/4}\\end{pmatrix}$'],
              answer: 3,
              explanation: '$T = \\mathrm{diag}(1, e^{i\\pi/4})$ has $T^\\dagger T = I$ but $T^\\dagger = \\mathrm{diag}(1, e^{-i\\pi/4}) \\ne T$. $Z$ and $H$ are both unitary and Hermitian; diag(2, 1) is Hermitian but stretches vectors, so it is not unitary.',
            },
            {
              question: 'What are the eigenvalues of $A = \\begin{pmatrix}1&2\\\\2&1\\end{pmatrix}$, and what is $\\mathrm{Tr}\\,A$?',
              options: ['3 and −1; trace 2', '1 and 1; trace 2', '3 and 1; trace 4', '$1 \\pm 2i$; trace 2'],
              answer: 0,
              explanation: '$\\det(A - \\lambda I) = (1-\\lambda)^2 - 4 = 0$ gives $\\lambda = 3, -1$, with eigenvectors $|+\\rangle$ and $|-\\rangle$; they sum to the trace, 2. A real symmetric (Hermitian) matrix cannot have complex eigenvalues.',
            },
            {
              question: 'Compute $ZXZ$.',
              options: ['$X$', '$-X$', '$iY$', '$I$'],
              answer: 1,
              explanation: '$ZX = iY$ and $iYZ = i(iX) = -X$. Equivalently, conjugating by $Z$ flips the sign of the off-diagonal entries. This anticommutation, $ZX = -XZ$, is why a $Z$ error and an $X$ error can be detected separately in error correction.',
            },
            {
              question: 'A student says: "Hermitian matrices are the gates and unitary matrices are what we measure." What is the correct statement?',
              options: [
                'It is correct as stated',
                'Both kinds can be gates, and only diagonal matrices are measured',
                'Unitaries describe evolution (gates); Hermitian matrices describe observables, whose eigenvalues are measurement results',
                'Neither: gates and observables are both arbitrary matrices',
              ],
              answer: 2,
              explanation: 'Gates must preserve length (unitary); observables need real eigenvalues and orthogonal eigenvectors (Hermitian). Some matrices such as $X$, $Z$ and $H$ are both, which is a frequent source of the mix-up.',
            },
          ],
          relatedLessons: [
            'linear-algebra-computational/eigenvalues/eigenvalues-and-eigenvectors',
            'applied-linear-algebra/eigenvalues-and-eigenvectors/symmetric-matrices-and-the-spectral-theorem',
            'abstract-linear-algebra/inner-product-spaces/spectral-theorems',
          ],
        },
      ],
      project: {
        slug: 'linear-algebra-toolkit',
        title: 'A hand-checked linear-algebra toolkit for qubits',
        description: `Build a two-page reference sheet and a small checker for the operations the rest of the course uses. By hand: (1) the six states $|0\\rangle, |1\\rangle, |\\pm\\rangle, |\\pm i\\rangle$ with their full inner-product table; (2) the matrices $X, Y, Z, H, S, T$, each checked for unitarity and Hermiticity, with eigenvalues, eigenvectors and trace; (3) the products $XY, YZ, ZX, HXH, HZH, S^2, T^2$. Then check every entry either in a few lines of Python with numpy or with the widgets in this module. Finish with a half-page "trap list": the five algebra mistakes you made or nearly made (conjugates, moduli, order of products), each with a two-line example.`,
        deliverables: [
          'The reference sheet with all tables and products, worked by hand',
          'A verification record (numpy script output or widget screenshots) agreeing with every entry',
          'The trap list with an example for each mistake',
        ],
        estimatedHours: 3,
        stretchGoals: ['Prove that every 2 × 2 unitary can be written as $e^{i\\alpha}R_z(\\beta)R_y(\\gamma)R_z(\\delta)$ and find the angles for $H$'],
      },
    },
    {
      slug: 'one-qubit',
      title: 'One Qubit',
      description:
        'Everything a single qubit can do: the Born rule and collapse, measurement in any basis, global versus relative phase, the Bloch sphere, gates as rotations, and interference in the Mach-Zehnder interferometer and the Elitzur-Vaidman bomb tester.',
      lessons: [
        {
          slug: 'superposition-and-the-born-rule',
          title: 'Superposition, the Born rule and collapse',
          summary:
            'What a measurement in the computational basis does: probabilities |α|² and |β|², the post-measurement state, why repeating a measurement gives the same answer, and how many shots you need to estimate a probability.',
          estimatedMinutes: 85,
          objectives: [
            'Apply the Born rule and the collapse rule to a qubit measured in the computational basis',
            'Predict the result of measuring the same qubit twice',
            'Estimate a probability from shot counts and give its statistical uncertainty',
            'Explain why measurement is not passive "looking"',
          ],
          concepts: [
            'Superposition α|0⟩ + β|1⟩',
            'Born rule P(k) = |⟨k|ψ⟩|²',
            'Collapse to the observed basis state',
            'Repeatability of a projective measurement',
            'Shots and binomial statistics',
            'Standard error √(p(1−p)/N)',
            'Measurement disturbs the state',
          ],
          explanation: `A qubit in $|\\psi\\rangle = \\alpha|0\\rangle + \\beta|1\\rangle$ is in a **superposition**: a single definite state that is neither $|0\\rangle$ nor $|1\\rangle$. Measuring it in the computational basis obeys two rules.

1. **Born rule.** The outcome is $k \\in \\{0, 1\\}$ with probability $P(k) = |\\langle k|\\psi\\rangle|^2$, that is $|\\alpha|^2$ or $|\\beta|^2$.
2. **Collapse.** Immediately afterwards the qubit is in $|k\\rangle$. The amplitudes $\\alpha$ and $\\beta$ are gone, and measuring again returns $k$ with certainty.

Take $|\\psi\\rangle = 0.6|0\\rangle + 0.8|1\\rangle$. One measurement gives 0 with probability 0.36. You cannot learn $\\alpha = 0.6$ from one run: you get a single bit, and the qubit is now $|0\\rangle$ or $|1\\rangle$. To estimate $P(0)$ you prepare the state again and again. With $N = 1000$ shots the count of zeros is binomial with mean $Np = 360$ and standard deviation $\\sqrt{Np(1-p)} = \\sqrt{230.4} \\approx 15$, so the estimate $\\hat p$ has standard error $\\sqrt{p(1-p)/N} \\approx 0.015$. Halving the error needs four times the shots. This is why expectation values on real hardware are always quoted with error bars, and why "running an algorithm" means running it thousands of times.

\`\`\`interactive
qc-circuit
{"qubits": 1, "circuit": ["RY(1.8546) 0"], "palette": ["RY", "X", "H"], "shots": 1000, "title": "Preparing 0.6|0⟩ + 0.8|1⟩ and sampling it", "caption": "The rotation RY(1.8546) turns |0⟩ into 0.6|0⟩ + 0.8|1⟩ (since cos(1.8546/2) = 0.6). Press Sample shots several times: the count of 0s scatters around 360 by about ±15. Then add an X and predict the new counts before sampling."}
\`\`\`

**Measurement is not just looking.** Classically, reading a bit leaves it unchanged. Here the measurement changes the state from $0.6|0\\rangle + 0.8|1\\rangle$ to $|0\\rangle$ or $|1\\rangle$, and the change has consequences: a later gate acts on the collapsed state, not the original. Physically, a measurement is an interaction (a photon scattered by an ion, a microwave tone reflected from a resonator) that copies which-state information into the environment, and the next module shows that this is what destroys interference.

**Superposition is not ignorance.** A qubit in $0.6|0\\rangle + 0.8|1\\rangle$ is not secretly 0 or 1 with probabilities 0.36 and 0.64. If it were, applying $H$ before measuring would give 50/50; in fact (next lesson) it gives $P(0) = 0.98$. The difference between a superposition and a coin flip is the central idea of module 7.

Watrous lesson 1 covers measurement; try the circuit above, then the Codebook's measurement nodes.`,
          resources: [
            ibm('basics-of-quantum-information', 'Lesson 1, standard basis measurements: the Born rule and the post-measurement state.', true),
            codebook('introduction-to-quantum-computing', 'Introduction to quantum computing', 'The nodes on measurement and on sampling from a circuit; run the code cells to see shot noise.'),
            ocw435('Lecture notes 1-2 introduce qubits and measurement in Shor\'s own words (2003 version of the course).'),
          ],
          exercises: [
            {
              slug: 'shots-and-error-bars',
              title: 'How many shots?',
              prompt:
                'A qubit is prepared in $\\cos(\\pi/8)|0\\rangle + \\sin(\\pi/8)|1\\rangle$. (a) Give $P(0)$. (b) With 500 shots, give the expected number of 0s and its standard deviation. (c) How many shots are needed for the standard error of $\\hat P(0)$ to be at most 0.005? (d) You observe 452 zeros in 500 shots. Is that consistent with the prediction?',
              kind: 'problem',
              difficulty: 2,
              hint: '$P(0) = \\cos^2(\\pi/8) \\approx 0.8536$. 500 shots: mean 426.8, sd $\\sqrt{500\\cdot0.8536\\cdot0.1464} \\approx 7.9$. (c) $N \\ge p(1-p)/0.005^2 \\approx 5000$. (d) 452 is about 3.2 standard deviations high: suspicious.',
            },
            {
              slug: 'repeated-measurement',
              title: 'Measure, then measure again',
              prompt:
                'A qubit in $\\tfrac{1}{\\sqrt3}|0\\rangle + \\sqrt{\\tfrac23}\\,i|1\\rangle$ is measured in the computational basis twice in a row. List the four possible outcome pairs with their probabilities. Then repeat when an $H$ gate is applied between the two measurements.',
              kind: 'problem',
              difficulty: 2,
              hint: 'Without $H$: only 00 (1/3) and 11 (2/3). With $H$: after the first result the qubit is $|0\\rangle$ or $|1\\rangle$, and $H$ makes the second result 50/50, so each pair has probability 1/6 or 1/3.',
            },
            {
              slug: 'sample-in-simulator',
              title: 'Shot noise in a simulator',
              prompt:
                'In the widget above (or Qiskit with the Aer simulator, or PennyLane with shots set), prepare $0.6|0\\rangle + 0.8|1\\rangle$ and collect 20 independent runs of 100 shots each. Record the 20 estimates of $P(0)$, compute their sample standard deviation, and compare it with the prediction $\\sqrt{0.36\\cdot0.64/100} = 0.048$.',
              kind: 'simulation',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'State the two rules of a computational-basis measurement.',
              answerOutline: 'Outcome k with probability |⟨k|ψ⟩|²; afterwards the state is |k⟩, so a repeat gives k again.',
            },
            {
              question: 'How does the standard error of an estimated probability scale with the number of shots?',
              answerOutline: 'As √(p(1−p)/N), i.e. 1/√N: four times the shots halves the error.',
            },
            {
              question: 'Why is 0.6|0⟩ + 0.8|1⟩ not the same as "0 with probability 0.36, 1 with probability 0.64"?',
              answerOutline: 'The superposition has a definite relative phase that produces interference: after H it gives 0 with probability 0.98, whereas the coin-like mixture would give 0.5.',
            },
          ],
          quiz: [
            {
              question: 'A qubit in $\\tfrac{1}{2}|0\\rangle - \\tfrac{\\sqrt3}{2}|1\\rangle$ is measured and gives 1. It is measured again at once. What is the probability of 1 the second time?',
              options: ['0.75', '1', '0.5', '0.5625'],
              answer: 1,
              explanation: 'After the first result the state is $|1\\rangle$, so the second measurement gives 1 with certainty. 0.75 is the probability of the first result, before the collapse; 0.5625 is $0.75^2$, the probability of two independent 1s, which would be right only if the measurement did not change the state.',
            },
            {
              question: 'You run 400 shots of a circuit whose ideal $P(1)$ is 0.5. About how far from 200 should you expect the number of 1s to be?',
              options: ['About 1', 'About 10', 'About 20', 'About 100'],
              answer: 1,
              explanation: 'The standard deviation is $\\sqrt{400\\cdot0.5\\cdot0.5} = 10$, so counts of 190-210 are typical. 20 is $\\sqrt{400}$, forgetting the factor $p(1-p)$.',
            },
            {
              question: 'Which experiment distinguishes the superposition $\\tfrac{1}{\\sqrt2}(|0\\rangle + |1\\rangle)$ from a qubit that is $|0\\rangle$ or $|1\\rangle$ with probability 1/2 each?',
              options: [
                'Measure in the computational basis many times',
                'Measure twice in a row',
                'Apply $X$ and then measure',
                'Apply $H$ and then measure: the superposition always gives 0, the coin gives 50/50',
              ],
              answer: 3,
              explanation: '$H|+\\rangle = |0\\rangle$, while $H|0\\rangle$ and $H|1\\rangle$ each give 50/50. Computational-basis statistics (with or without $X$) are identical for the two preparations; only an interference experiment separates them.',
            },
          ],
          relatedLessons: [
            'quantum-mechanics/formalism-and-dirac-notation/measurement-commutators-and-uncertainty',
            'probability-statistics/random-variables-and-distributions/discrete-distributions',
          ],
        },
        {
          slug: 'measurement-bases-and-phase',
          title: 'Measuring in other bases; global versus relative phase',
          summary:
            'Measurement in any orthonormal basis via projectors, the trick of rotating then measuring, expectation values ⟨Z⟩ and ⟨X⟩, and why a global phase is unobservable while a relative phase is everything.',
          estimatedMinutes: 90,
          objectives: [
            'Compute outcome probabilities for a measurement in any orthonormal basis',
            'Implement an X-basis or Y-basis measurement as a gate followed by a computational measurement',
            'Compute expectation values ⟨ψ|A|ψ⟩ and relate them to outcome probabilities',
            'Show that e^{iγ}|ψ⟩ gives the same statistics as |ψ⟩ for every measurement',
            'Show that a relative phase changes the statistics in some basis',
          ],
          concepts: [
            'Measurement in a basis {|b_k⟩}',
            'Projectors P_k = |b_k⟩⟨b_k|',
            'X-basis measurement = H then measure',
            'Y-basis measurement = S† then H then measure',
            'Expectation value ⟨A⟩ = ⟨ψ|A|ψ⟩',
            'Global phase (unobservable)',
            'Relative phase (observable)',
          ],
          explanation: `A measurement can be made in any orthonormal basis $\\{|b_0\\rangle, |b_1\\rangle\\}$: outcome $k$ has probability $|\\langle b_k|\\psi\\rangle|^2 = \\langle\\psi|P_k|\\psi\\rangle$ with **projector** $P_k = |b_k\\rangle\\langle b_k|$, and the state becomes $|b_k\\rangle$. For $|\\psi\\rangle = 0.6|0\\rangle + 0.8|1\\rangle$ in the $\\pm$ basis: $P(+) = (1.4)^2/2 = 0.98$ and $P(-) = 0.02$.

Hardware measures only in the computational basis, so you **rotate first**. Because $H|+\\rangle = |0\\rangle$ and $H|-\\rangle = |1\\rangle$, "apply $H$, then measure" is an $X$-basis measurement with outcome 0 meaning $+$. For the $Y$ basis apply $S^\\dagger$ then $H$.

**Expectation values.** Assign the value $+1$ to outcome 0 and $-1$ to outcome 1; the average is $\\langle Z\\rangle = P(0) - P(1) = \\langle\\psi|Z|\\psi\\rangle$. For our state, $\\langle Z\\rangle = 0.36 - 0.64 = -0.28$ and $\\langle X\\rangle = 0.98 - 0.02 = 0.96$. In general $\\langle A\\rangle = \\langle\\psi|A|\\psi\\rangle$ for any Hermitian $A$.

**Global phase.** The states $|\\psi\\rangle$ and $e^{i\\gamma}|\\psi\\rangle$ give identical probabilities in every basis, since $|\\langle b|e^{i\\gamma}\\psi\\rangle|^2 = |e^{i\\gamma}|^2|\\langle b|\\psi\\rangle|^2$. They are the same physical state; $-|1\\rangle$ *is* $|1\\rangle$.

**Relative phase.** Compare $0.6|0\\rangle + 0.8|1\\rangle$ and $0.6|0\\rangle - 0.8|1\\rangle$. In the computational basis both give 0.36/0.64. In the $\\pm$ basis the second gives $P(+) = (0.6 - 0.8)^2/2 = 0.02$ instead of 0.98. The minus sign multiplies only one amplitude, so it changes how the amplitudes combine in $\\langle +|\\psi\\rangle$: a **relative phase** is physical. The same holds for $|+\\rangle$ and $|-\\rangle$, which look identical in $Z$ and opposite in $X$.

\`\`\`interactive
qc-circuit
{"qubits": 1, "circuit": ["RY(1.8546) 0", "Z 0", "H 0"], "palette": ["Z", "S", "H", "X"], "title": "A relative phase seen through an X-basis measurement", "caption": "RY makes 0.6|0⟩ + 0.8|1⟩, Z flips the sign of the |1⟩ amplitude, and H turns the final measurement into an X-basis measurement. Step through the columns: the Z changes no probability by itself, yet P(0) after H is 0.02 with it and 0.98 without it (select the Z and remove it). Replace Z by S: what do you get, and why?"}
\`\`\`

The pitfall is to treat any phase as ignorable. A sign or $i$ on one term changes interference; a common factor on every term changes nothing. Read Watrous lesson 1 on general measurements and phases.`,
          resources: [
            ibm('basics-of-quantum-information', 'Lesson 1: measurements in other bases and the discussion of global phases; the exercises on |+⟩ and |−⟩ match this lesson.', true),
            deWolf('Chapter 1, sections on measurement and the remark on global phase.'),
            codebook('single-qubit-gates', 'Single-qubit gates', 'The nodes on measuring in other bases and on why global phases do not matter.'),
          ],
          exercises: [
            {
              slug: 'three-bases',
              title: 'One state, three measurements',
              prompt:
                'For $|\\psi\\rangle = \\tfrac{1}{\\sqrt5}(|0\\rangle + 2i|1\\rangle)$ compute the outcome probabilities in the $Z$, $X$ and $Y$ bases, and the expectation values $\\langle X\\rangle, \\langle Y\\rangle, \\langle Z\\rangle$. Check that $\\langle X\\rangle^2 + \\langle Y\\rangle^2 + \\langle Z\\rangle^2 = 1$.',
              kind: 'problem',
              difficulty: 2,
              hint: '$Z$: 0.2/0.8 so $\\langle Z\\rangle = -0.6$. $X$: $|1 + 2i|^2/10 = 0.5$ each, $\\langle X\\rangle = 0$. $Y$: $\\langle +i|\\psi\\rangle = (1 + 2)/\\sqrt{10}$, so $P(+i) = 0.9$ and $\\langle Y\\rangle = 0.8$. Squares sum to 1.',
            },
            {
              slug: 'phase-indistinguishable',
              title: 'Prove a global phase is invisible',
              prompt:
                'Prove that for every orthonormal basis $\\{|b_k\\rangle\\}$ and every unitary $U$ applied before the measurement, $|\\psi\\rangle$ and $e^{i\\gamma}|\\psi\\rangle$ give the same outcome probabilities. Then find a basis in which $|\\psi_1\\rangle = \\tfrac{1}{\\sqrt2}(|0\\rangle + |1\\rangle)$ and $|\\psi_2\\rangle = \\tfrac{1}{\\sqrt2}(|0\\rangle + i|1\\rangle)$ give different probabilities, and give those probabilities.',
              kind: 'derivation',
              difficulty: 2,
              hint: 'Linearity: $U e^{i\\gamma}|\\psi\\rangle = e^{i\\gamma}U|\\psi\\rangle$. In the $X$ basis, $|\\psi_1\\rangle$ gives $P(+) = 1$ and $|\\psi_2\\rangle$ gives $P(+) = |1 + i|^2/4 = 0.5$.',
            },
            {
              slug: 'y-basis-circuit',
              title: 'Build a Y-basis measurement',
              prompt:
                'Show that $HS^\\dagger$ maps $|+i\\rangle$ to $|0\\rangle$ and $|-i\\rangle$ to $|1\\rangle$ (up to global phases). Then use the circuit widget or Quirk: prepare $|+i\\rangle$ with $H$ then $S$, append $S^\\dagger$ then $H$, and confirm that the final measurement gives 0 every time. What happens if you append $H$ alone?',
              kind: 'simulation',
              difficulty: 2,
              hint: 'With $H$ alone, $H|+i\\rangle = \\tfrac{1}{2}((1+i)|0\\rangle + (1-i)|1\\rangle)$, giving 50/50.',
            },
          ],
          selfAssessment: [
            {
              question: 'How do you measure a qubit in the X basis on hardware that only measures Z?',
              answerOutline: 'Apply H and then measure; outcome 0 corresponds to |+⟩ and 1 to |−⟩ (for Y, apply S† then H).',
            },
            {
              question: 'What is the difference between a global and a relative phase?',
              answerOutline: 'A global phase multiplies the whole state and changes no probability in any basis; a relative phase multiplies some components only and changes interference, visible in some basis.',
            },
            {
              question: 'Relate ⟨Z⟩ to the outcome probabilities.',
              answerOutline: '⟨Z⟩ = (+1)P(0) + (−1)P(1) = P(0) − P(1) = ⟨ψ|Z|ψ⟩.',
            },
          ],
          quiz: [
            {
              question: 'Which pair of states can be distinguished by some measurement (with probabilities that differ)?',
              options: [
                '$|0\\rangle$ and $-|0\\rangle$',
                '$\\tfrac{1}{\\sqrt2}(|0\\rangle + |1\\rangle)$ and $\\tfrac{i}{\\sqrt2}(|0\\rangle + |1\\rangle)$',
                '$\\tfrac{1}{\\sqrt2}(|0\\rangle + |1\\rangle)$ and $\\tfrac{1}{\\sqrt2}(|0\\rangle - |1\\rangle)$',
                '$|1\\rangle$ and $e^{i\\pi/3}|1\\rangle$',
              ],
              answer: 2,
              explanation: '$|+\\rangle$ and $|-\\rangle$ differ by a relative phase: an $X$-basis measurement separates them perfectly. In the other three pairs the states differ by a global factor ($-1$, $i$, $e^{i\\pi/3}$), which no measurement can detect.',
            },
            {
              question: 'For $|\\psi\\rangle = 0.8|0\\rangle + 0.6|1\\rangle$, what is $\\langle X\\rangle$?',
              options: ['0.28', '0.96', '0.48', '1.4'],
              answer: 1,
              explanation: '$\\langle X\\rangle = 2\\,\\mathrm{Re}(\\bar\\alpha\\beta) = 2(0.8)(0.6) = 0.96$; equivalently $P(+) - P(-) = 0.98 - 0.02$. 0.28 is $\\langle Z\\rangle = 0.64 - 0.36$, and 0.48 forgets the factor 2.',
            },
            {
              question: 'A qubit is in $|+i\\rangle$. You apply $H$ and measure in the computational basis. What are the probabilities?',
              options: ['$P(0) = 1$', '$P(0) = 0.5$, $P(1) = 0.5$', '$P(1) = 1$', '$P(0) = 0.854$, $P(1) = 0.146$'],
              answer: 1,
              explanation: '$H|+i\\rangle = \\tfrac12((1+i)|0\\rangle + (1-i)|1\\rangle)$ and $|1 \\pm i|^2/4 = 1/2$. $H$ alone performs an $X$-basis measurement, and $|+i\\rangle$ is unbiased with respect to $X$; a $Y$-basis measurement needs $S^\\dagger$ before $H$.',
            },
          ],
          relatedLessons: ['quantum-mechanics/formalism-and-dirac-notation/measurement-commutators-and-uncertainty'],
        },
        {
          slug: 'the-bloch-sphere',
          title: 'The Bloch sphere',
          summary:
            'Every qubit state, up to global phase, is a point on a sphere: cos(θ/2)|0⟩ + e^{iφ}sin(θ/2)|1⟩ at polar angle θ and azimuth φ, with coordinates (⟨X⟩, ⟨Y⟩, ⟨Z⟩). Orthogonal states are antipodal.',
          estimatedMinutes: 90,
          objectives: [
            'Convert a qubit state to Bloch angles (θ, φ) and Cartesian coordinates, and back',
            'Show that the Bloch coordinates are the expectation values ⟨X⟩, ⟨Y⟩, ⟨Z⟩',
            'Explain why orthogonal states are antipodal and why angles are halved in the state',
            'Use the overlap formula |⟨φ|ψ⟩|² = (1 + r·s)/2',
          ],
          concepts: [
            'Bloch parametrisation cos(θ/2)|0⟩ + e^{iφ}sin(θ/2)|1⟩',
            'Polar angle θ and azimuth φ',
            'Bloch vector r = (⟨X⟩, ⟨Y⟩, ⟨Z⟩)',
            'Poles |0⟩, |1⟩; equator |±⟩, |±i⟩',
            'Antipodal = orthogonal',
            'Half angles',
            'Overlap (1 + r·s)/2',
          ],
          explanation: `Write a state as $\\alpha|0\\rangle + \\beta|1\\rangle$ and use the global-phase freedom to make $\\alpha$ real and non-negative. Normalisation then lets you write
$$|\\psi\\rangle = \\cos\\tfrac{\\theta}{2}|0\\rangle + e^{i\\varphi}\\sin\\tfrac{\\theta}{2}|1\\rangle, \\qquad 0 \\le \\theta \\le \\pi,\\ 0 \\le \\varphi < 2\\pi.$$
Two real numbers, a polar angle and an azimuth: a point on a sphere with **Bloch vector** $\\vec r = (\\sin\\theta\\cos\\varphi,\\ \\sin\\theta\\sin\\varphi,\\ \\cos\\theta)$. The north pole is $|0\\rangle$, the south pole $|1\\rangle$, and the equator holds $|+\\rangle$ at $+x$, $|+i\\rangle$ at $+y$, $|-\\rangle$ at $-x$ and $|-i\\rangle$ at $-y$.

**Worked example.** $|\\psi\\rangle = \\tfrac{\\sqrt3}{2}|0\\rangle + \\tfrac{i}{2}|1\\rangle$. Here $\\cos\\tfrac\\theta2 = \\tfrac{\\sqrt3}{2}$, so $\\theta = 60°$, and $e^{i\\varphi} = i$, so $\\varphi = 90°$. The Bloch vector is $(0,\\ 0.866,\\ 0.5)$. Check against the previous lesson: $\\langle Z\\rangle = \\tfrac34 - \\tfrac14 = 0.5$.

That check is general: **the Bloch coordinates are the three expectation values** $(\\langle X\\rangle, \\langle Y\\rangle, \\langle Z\\rangle)$. So measuring along any axis $\\hat n$ gives $+1$ with probability $(1 + \\hat n\\cdot\\vec r)/2$.

\`\`\`interactive
qc-bloch
{"theta": 60, "phi": 90, "gates": ["X", "Y", "Z", "H", "S"], "title": "The Bloch sphere", "caption": "The state starts at θ = 60°, φ = 90°, the worked example. Read off (x, y, z) and compare the measurement probabilities in the Z, X and Y bases with (1 ± z)/2, (1 ± x)/2, (1 ± y)/2. Drag the θ slider to 180° and back, then move φ: which readouts change with φ and which do not?"}
\`\`\`

**Why half angles?** The state uses $\\theta/2$, the sphere uses $\\theta$. So $|0\\rangle$ and $|1\\rangle$, which are orthogonal ($90°$ apart as vectors in $\\mathbb{C}^2$), sit $180°$ apart on the sphere. In general **orthogonal states are antipodal**, and the overlap of two pure states with Bloch vectors $\\vec r, \\vec s$ is $|\\langle\\varphi|\\psi\\rangle|^2 = (1 + \\vec r\\cdot\\vec s)/2$: 1 for the same point, 0 for opposite points, 1/2 at right angles.

**What the sphere hides.** It drops the global phase (correctly, since it is unobservable). It is only for *one* qubit: two qubits are not two Bloch spheres, because entangled states have no individual Bloch vector of length 1 (module 3). Points *inside* the sphere are mixed states (module 7).

Read Watrous or de Wolf on the Bloch sphere, and the quantum-mechanics lesson on two-level systems for the spin-1/2 picture.`,
          resources: [
            ibm('basics-of-quantum-information', 'Lesson 1 (and the general-formulation course) on the Bloch sphere; the figures of the six cardinal states match this lesson.', true),
            codebook('single-qubit-gates', 'Single-qubit gates', 'Nodes on the Bloch sphere with an interactive sphere and exercises converting states to angles.'),
            preskill('Chapter 2, section on the qubit and the Bloch sphere, with the spin-1/2 interpretation.'),
          ],
          exercises: [
            {
              slug: 'states-to-bloch',
              title: 'States to Bloch vectors',
              prompt:
                'Find $(\\theta, \\varphi)$ and $(x, y, z)$ for: (a) $\\tfrac{1}{\\sqrt2}(|0\\rangle - i|1\\rangle)$; (b) $\\tfrac{1}{2}|0\\rangle - \\tfrac{\\sqrt3}{2}|1\\rangle$; (c) $\\tfrac{1}{\\sqrt5}(i|0\\rangle + 2|1\\rangle)$ (remove the global phase first); (d) $\\cos\\tfrac{\\pi}{8}|0\\rangle + e^{i\\pi/4}\\sin\\tfrac{\\pi}{8}|1\\rangle$.',
              kind: 'problem',
              difficulty: 2,
              hint: '(a) $(0, -1, 0)$. (b) $\\theta = 120°$, $\\varphi = 180°$: $(-0.866, 0, -0.5)$. (c) multiply by $-i$: $\\tfrac{1}{\\sqrt5}(|0\\rangle - 2i|1\\rangle)$, so $z = -0.6$, $\\varphi = 270°$, $(0, -0.8, -0.6)$. (d) $\\theta = 45°$, $\\varphi = 45°$: $(0.5, 0.5, 0.707)$.',
            },
            {
              slug: 'bloch-from-expectations',
              title: 'Derive the coordinates',
              prompt:
                'For $|\\psi\\rangle = \\cos\\tfrac\\theta2|0\\rangle + e^{i\\varphi}\\sin\\tfrac\\theta2|1\\rangle$, compute $\\langle\\psi|X|\\psi\\rangle$, $\\langle\\psi|Y|\\psi\\rangle$ and $\\langle\\psi|Z|\\psi\\rangle$ and show they equal $\\sin\\theta\\cos\\varphi$, $\\sin\\theta\\sin\\varphi$ and $\\cos\\theta$. Then prove the overlap formula $|\\langle\\varphi|\\psi\\rangle|^2 = (1 + \\vec r\\cdot\\vec s)/2$ for the special case where one state is $|0\\rangle$.',
              kind: 'derivation',
              difficulty: 2,
              hint: 'Use $2\\sin\\tfrac\\theta2\\cos\\tfrac\\theta2 = \\sin\\theta$ and $\\cos^2\\tfrac\\theta2 - \\sin^2\\tfrac\\theta2 = \\cos\\theta$. With $|\\varphi\\rangle = |0\\rangle$, $\\vec s = (0,0,1)$ and $|\\langle 0|\\psi\\rangle|^2 = \\cos^2\\tfrac\\theta2 = (1 + \\cos\\theta)/2$.',
            },
            {
              slug: 'tomography-by-hand',
              title: 'Reconstruct a state from counts',
              prompt:
                'An unknown qubit state is prepared 3000 times: 1000 copies are measured in $Z$ (720 zeros), 1000 in $X$ (500 zeros, meaning $+$) and 1000 in $Y$ (940 zeros, meaning $+i$). Estimate the Bloch vector, its length and the state $\\cos\\tfrac\\theta2|0\\rangle + e^{i\\varphi}\\sin\\tfrac\\theta2|1\\rangle$. Is the estimated vector consistent with a pure state given shot noise?',
              kind: 'data-analysis',
              difficulty: 3,
              hint: '$\\hat r = (0, 0.88, 0.44)$, length $0.984$; each component has standard error about 0.015-0.03, so length 1 is within noise. $\\theta \\approx 63.9°$, $\\varphi = 90°$.',
            },
          ],
          selfAssessment: [
            {
              question: 'Where on the Bloch sphere are |0⟩, |1⟩, |+⟩, |−⟩, |+i⟩ and |−i⟩?',
              answerOutline: '|0⟩ north pole (+z), |1⟩ south pole (−z), |+⟩ at +x, |−⟩ at −x, |+i⟩ at +y, |−i⟩ at −y.',
            },
            {
              question: 'Why are orthogonal states antipodal on the Bloch sphere?',
              answerOutline: 'The state uses half angles θ/2; overlap² = (1 + r·s)/2 is zero exactly when r·s = −1, i.e. opposite points.',
            },
            {
              question: 'What does the Bloch sphere not represent?',
              answerOutline: 'Global phase (deliberately), multi-qubit and entangled states, and (on the surface) mixed states, which lie inside the ball.',
            },
          ],
          quiz: [
            {
              question: 'What is the Bloch vector of $\\tfrac{1}{\\sqrt2}(|0\\rangle - i|1\\rangle)$?',
              options: ['$(0, 1, 0)$', '$(-1, 0, 0)$', '$(0, 0, -1)$', '$(0, -1, 0)$'],
              answer: 3,
              explanation: '$\\theta = 90°$ and $e^{i\\varphi} = -i$, so $\\varphi = 270°$: the $-y$ point, $|-i\\rangle$. $(0, 1, 0)$ would be $|+i\\rangle$, which has $+i$; $(-1, 0, 0)$ is $|-\\rangle$, which has a real minus sign.',
            },
            {
              question: 'Two pure states have Bloch vectors at $90°$ to each other. What is $|\\langle\\varphi|\\psi\\rangle|^2$?',
              options: ['0', '0.5', '0.707', '1'],
              answer: 1,
              explanation: '$(1 + \\cos 90°)/2 = 1/2$. Orthogonality (overlap 0) needs $180°$ on the sphere; $90°$ on the sphere is $45°$ between the state vectors, so $\\cos^2 45° = 1/2$.',
            },
            {
              question: 'A state has Bloch vector $(0.6, 0, 0.8)$. What is the probability of $+$ in an $X$-basis measurement?',
              options: ['0.6', '0.36', '0.8', '0.9'],
              answer: 2,
              explanation: '$P(+) = (1 + x)/2 = (1 + 0.6)/2 = 0.8$. Reporting 0.6 confuses the expectation value $\\langle X\\rangle$ with a probability, and 0.36 squares it as if it were an amplitude.',
            },
          ],
          relatedLessons: [
            'quantum-mechanics/formalism-and-dirac-notation/two-level-systems',
            'quantum-mechanics/angular-momentum-and-spin/spin-one-half-and-stern-gerlach',
          ],
        },
        {
          slug: 'single-qubit-gates-as-rotations',
          title: 'Single-qubit gates as rotations',
          summary:
            'X, Y, Z, H, S and T as rotations of the Bloch sphere; the rotation gates R_n(θ) = cos(θ/2)I − i sin(θ/2) n·σ; composing gates; and why every single-qubit gate is a rotation up to global phase.',
          estimatedMinutes: 100,
          objectives: [
            'Identify the rotation axis and angle of X, Y, Z, H, S and T',
            'Compute R_x(θ), R_y(θ), R_z(θ) acting on a state, by matrix and on the sphere',
            'Show that R_z(φ) and the phase gate P(φ) differ only by a global phase',
            'Use identities such as HXH = Z, HZH = X, S² = Z, T² = S',
            'State the Euler (ZYZ) decomposition of a single-qubit unitary',
          ],
          concepts: [
            'Pauli gates as π rotations',
            'Hadamard: π about (x + z)/√2',
            'S = phase π/2, T = phase π/4',
            'R_n(θ) = e^{−iθ n·σ/2}',
            'Phase gate P(φ) versus R_z(φ)',
            'Conjugation HXH = Z',
            'Euler decomposition R_z R_y R_z',
          ],
          explanation: `Every single-qubit unitary is, up to a global phase, a **rotation of the Bloch sphere**. The rotation by angle $\\theta$ about the unit axis $\\hat n$ is
$$R_{\\hat n}(\\theta) = e^{-i\\theta\\,\\hat n\\cdot\\vec\\sigma/2} = \\cos\\tfrac{\\theta}{2}\\,I - i\\sin\\tfrac{\\theta}{2}\\,(n_xX + n_yY + n_zZ).$$
So $R_y(\\theta) = \\begin{pmatrix}\\cos\\frac\\theta2 & -\\sin\\frac\\theta2\\\\ \\sin\\frac\\theta2 & \\cos\\frac\\theta2\\end{pmatrix}$ and $R_z(\\theta) = \\mathrm{diag}(e^{-i\\theta/2}, e^{i\\theta/2})$. Again the half angle: a $2\\pi$ rotation gives $-I$, a global phase.

**The named gates.** $X$, $Y$ and $Z$ are $\\pi$ rotations about their own axes ($X = iR_x(\\pi)$). $H$ is a $\\pi$ rotation about the axis $(\\hat x + \\hat z)/\\sqrt2$, which swaps $+z \\leftrightarrow +x$ and sends $+y \\to -y$. $S = \\mathrm{diag}(1, i)$ is a $90°$ turn about $z$ and $T = \\mathrm{diag}(1, e^{i\\pi/4})$ a $45°$ turn. The **phase gate** $P(\\varphi) = \\mathrm{diag}(1, e^{i\\varphi}) = e^{i\\varphi/2}R_z(\\varphi)$: same rotation, different global phase, so they are interchangeable on one qubit (but not once they are *controlled*, module 3).

**Worked example.** $R_x(\\pi/2)|0\\rangle = \\cos\\tfrac\\pi4|0\\rangle - i\\sin\\tfrac\\pi4|1\\rangle = \\tfrac{1}{\\sqrt2}(|0\\rangle - i|1\\rangle) = |-i\\rangle$. On the sphere: a right-handed quarter turn about $+x$ carries the north pole to $-y$. Then $S$ turns $-y$ by $90°$ about $z$ to $+x$, so $SR_x(\\pi/2)|0\\rangle = |+\\rangle$ up to phase. Check by matrices: $S\\tfrac{1}{\\sqrt2}(1, -i) = \\tfrac{1}{\\sqrt2}(1, -i\\cdot i) = \\tfrac{1}{\\sqrt2}(1, 1)$.

\`\`\`interactive
qc-bloch
{"theta": 0, "phi": 0, "gates": ["X", "Y", "Z", "H", "S", "T", "RX", "RY", "RZ"], "angle": 90, "title": "Gates as rotations", "caption": "Start at |0⟩. Apply RX (90°) then S and confirm the worked example lands on |+⟩ at +x. Reset, then apply H, Z, H and compare with a single X: the identity HZH = X, drawn as rotations. Watch the dashed axis of each gate."}
\`\`\`

**Composition.** Gates compose right to left as matrices: in a circuit $H$ then $Z$ then $H$, the matrix is $HZH = X$. Conjugating by $H$ swaps the $x$ and $z$ axes, so $HXH = Z$ and $HYH = -Y$. Also $S^2 = Z$, $T^2 = S$, $T^8 = I$.

**Euler decomposition.** Any single-qubit unitary is $e^{i\\alpha}R_z(\\beta)R_y(\\gamma)R_z(\\delta)$; for example $H = e^{i\\pi/2}R_z(0)R_y(\\pi/2)R_z(\\pi)$. Hardware exploits this: superconducting machines implement $R_z$ "virtually" as a change of the reference phase of later pulses, so only $R_x$ or $R_y$ pulses cost time (module 9).

Work the Codebook's rotation nodes; quantum-mechanics links show the same rotations as spin precession.`,
          resources: [
            codebook('single-qubit-gates', 'Single-qubit gates', 'Nodes on X, H, Z, S, T and the rotation gates, each with a coding exercise; work all of them.', ),
            ibm('basics-of-quantum-information', 'Lesson 1, unitary operations, including the rotation picture of phase gates.', true),
            nielsenChuang('Section 4.2 (single-qubit operations) proves the Euler decomposition. Free alternative: de Wolf chapter 2.'),
          ],
          exercises: [
            {
              slug: 'axis-and-angle',
              title: 'Axis and angle of each gate',
              prompt:
                'For each of $X$, $Y$, $Z$, $H$, $S$, $T$, $S^\\dagger$ and $R_y(\\pi/2)$, give the rotation axis and angle and the image of $|0\\rangle$ and of $|+\\rangle$ on the Bloch sphere. Verify two of the images by matrix multiplication.',
              kind: 'problem',
              difficulty: 1,
              hint: '$T|+\\rangle$ lies on the equator at $\\varphi = 45°$: $(0.707, 0.707, 0)$. $R_y(\\pi/2)|0\\rangle = |+\\rangle$ and $R_y(\\pi/2)|+\\rangle = |1\\rangle$.',
            },
            {
              slug: 'rotation-formula',
              title: 'Expand the rotation formula',
              prompt:
                'Using $(\\hat n\\cdot\\vec\\sigma)^2 = I$, show that $e^{-i\\theta\\hat n\\cdot\\vec\\sigma/2} = \\cos\\tfrac\\theta2 I - i\\sin\\tfrac\\theta2\\,\\hat n\\cdot\\vec\\sigma$. Then write out $R_{\\hat n}(\\pi)$ for $\\hat n = (\\hat x + \\hat z)/\\sqrt2$ and show it equals $-iH$.',
              kind: 'derivation',
              difficulty: 2,
              hint: 'Split the power series into even and odd terms. $R_{\\hat n}(\\pi) = -i(X + Z)/\\sqrt2 = -iH$.',
            },
            {
              slug: 'controlled-difference',
              title: 'When global phase stops being global',
              prompt:
                'Show $P(\\varphi) = e^{i\\varphi/2}R_z(\\varphi)$. Then compute the two-qubit matrices of "controlled-$P(\\pi)$" and "controlled-$R_z(\\pi)$" (control on the first qubit) in the basis $|00\\rangle, |01\\rangle, |10\\rangle, |11\\rangle$ and show they differ by more than a global phase. Which single-qubit gate on the control repairs the difference?',
              kind: 'derivation',
              difficulty: 3,
              hint: 'Controlled-$R_z(\\pi)$ = diag$(1, 1, -i, i)$ and controlled-$P(\\pi)$ = diag$(1, 1, 1, -1)$ = CZ. Multiplying the control by $P(\\pi/2) = S$ (diag$(1, i)$ on the control) turns the first into the second.',
            },
          ],
          selfAssessment: [
            {
              question: 'What rotations are H, S and T?',
              answerOutline: 'H: π about (x+z)/√2; S: π/2 about z; T: π/4 about z (all up to global phase).',
            },
            {
              question: 'Why does R_n(2π) equal −I rather than I?',
              answerOutline: 'The state uses half angles, so R(2π) = cos(π)I = −I, a global phase that is physically invisible on one qubit.',
            },
            {
              question: 'State the ZYZ Euler decomposition.',
              answerOutline: 'Every 2×2 unitary U = e^{iα} R_z(β) R_y(γ) R_z(δ) for some real α, β, γ, δ.',
            },
          ],
          quiz: [
            {
              question: 'Starting from $|0\\rangle$, you apply $H$ and then $T$. Where is the state on the Bloch sphere?',
              options: ['At $(0.707, 0.707, 0)$ on the equator', 'At $(1, 0, 0)$', 'At $(0, 0, 1)$, because $T$ is diagonal', 'At $(0.707, 0, 0.707)$'],
              answer: 0,
              explanation: '$H$ takes $|0\\rangle$ to $|+\\rangle$ at $+x$, and $T$ turns it $45°$ about $z$, giving $(\\cos45°, \\sin45°, 0)$. $T$ is diagonal, so it changes no $Z$-basis probability, but it does move a state that is off the poles.',
            },
            {
              question: 'What is $HYH$?',
              options: ['$Y$', '$-Y$', '$X$', '$Z$'],
              answer: 1,
              explanation: '$H$ is a $\\pi$ rotation about $(\\hat x+\\hat z)/\\sqrt2$, which sends the $y$ axis to $-y$, so $HYH = -Y$. You can confirm with matrices: $HY = \\tfrac{1}{\\sqrt2}\\begin{pmatrix}i&-i\\\\-i&-i\\end{pmatrix}$, and multiplying by $H$ gives $-Y$.',
            },
            {
              question: 'Which statement about $R_z(\\varphi)$ and $P(\\varphi) = \\mathrm{diag}(1, e^{i\\varphi})$ is correct?',
              options: [
                'They are different rotations of the Bloch sphere',
                'They differ by a global phase, so they act identically on one qubit, but their controlled versions differ',
                'They are equal as matrices',
                'They differ by a relative phase, so they can be told apart on one qubit',
              ],
              answer: 1,
              explanation: '$P(\\varphi) = e^{i\\varphi/2}R_z(\\varphi)$. On one qubit the factor is global and invisible. Once the gate is controlled, the factor applies only when the control is 1, so it becomes a relative phase on the control qubit.',
            },
            {
              question: 'Which product equals $X$?',
              options: ['$HXH$', '$SS$', '$HZH$', '$TTTT$'],
              answer: 2,
              explanation: 'Conjugation by $H$ swaps the $x$ and $z$ axes, so $HZH = X$ and $HXH = Z$. $SS = Z$ and $T^4 = Z$ are rotations about $z$, not $x$.',
            },
          ],
          relatedLessons: ['quantum-mechanics/angular-momentum-and-spin/spin-one-half-and-stern-gerlach', 'quantum-mechanics/formalism-and-dirac-notation/two-level-systems'],
        },
        {
          slug: 'interference-and-the-bomb-tester',
          title: 'Interference: the Mach-Zehnder interferometer and the Elitzur-Vaidman bomb tester',
          summary:
            'H, a phase, H as a one-qubit interferometer; why which-path information destroys interference; the Elitzur-Vaidman bomb tester and its quantum-Zeno improvement to near-certain interaction-free detection.',
          estimatedMinutes: 90,
          objectives: [
            'Model a Mach-Zehnder interferometer as H, P(φ), H and derive P(0) = cos²(φ/2)',
            'Explain why a which-path measurement inside the interferometer removes the interference',
            'Compute the outcome probabilities of the Elitzur-Vaidman bomb tester',
            'Compute the success probability cos^{2N}(π/2N) of the Zeno version and its limit',
          ],
          concepts: [
            'Beam splitter as Hadamard',
            'Phase shifter P(φ)',
            'Fringe P(0) = cos²(φ/2)',
            'Which-path information destroys interference',
            'Interaction-free measurement',
            'Elitzur-Vaidman bomb tester (1/4 success)',
            'Quantum Zeno effect',
          ],
          explanation: `A **Mach-Zehnder interferometer** is a one-qubit computer. A photon enters a beam splitter, travels along one of two paths (path 0 or path 1, the qubit), picks up a phase $\\varphi$ on path 1, and meets a second beam splitter before two detectors. Modelling each beam splitter as $H$:
$$HP(\\varphi)H|0\\rangle = \\tfrac12\\big[(1 + e^{i\\varphi})|0\\rangle + (1 - e^{i\\varphi})|1\\rangle\\big],\\qquad P(0) = \\cos^2\\tfrac{\\varphi}{2}.$$
With $\\varphi = 0$ every photon reaches detector 0; detector 1 is **dark** because its two path amplitudes cancel. Sweeping $\\varphi$ gives a fringe.

\`\`\`interactive
qc-circuit
{"qubits": 1, "circuit": ["H 0", "P(0) 0", "H 0"], "palette": ["P", "M", "H", "Z"], "title": "A Mach-Zehnder interferometer as H, P(φ), H", "caption": "Select the P gate and sweep its angle: P(0) follows cos²(φ/2), 1 at φ = 0 and 0 at φ = π. Now remove P and insert an M between the two H gates (a detector on the paths, or a bomb): choose outcome 0 (the photon took path 0) and see that the final result is 50/50 instead of certain. For a bomb, outcome 1 is an explosion, so detector 1 clicks with probability 1/2 × 1/2 = 1/4."}
\`\`\`

**Which-path information kills interference.** Put a detector on the paths, that is, measure the qubit between the beam splitters. Each outcome collapses the photon onto one path, and the second $H$ turns either path into a 50/50 result. The cancellation at detector 1 needs both amplitudes; once the path is known there is only one.

**The Elitzur-Vaidman bomb tester (1993).** A bomb so sensitive that a single photon on path 1 sets it off acts as exactly such a measurement. Send one photon through a balanced interferometer with the bomb on path 1:
- with probability 1/2 the photon takes path 1 and the bomb explodes;
- with probability 1/2 it takes path 0, the second $H$ gives 50/50, so detector 0 clicks (1/4, inconclusive) or **detector 1 clicks (1/4)**.

A dud bomb never makes detector 1 click. So a click there proves the bomb is live, although the photon never touched it: an **interaction-free measurement**, succeeding 1/4 of the time (1/3 if you repeat the inconclusive cases).

**Doing better with the Zeno effect.** Replace the two $H$s by $N$ small rotations $R_y(\\pi/N)$. With no bomb, $N$ of them take $|0\\rangle$ to $|1\\rangle$. With a live bomb, after each step the photon is found on path 0 with probability $\\cos^2(\\pi/2N)$, collapsing it back to $|0\\rangle$, so it survives all steps with probability $\\cos^{2N}(\\pi/2N)$: 0.78 for $N = 10$, 0.976 for $N = 100$, tending to 1. Frequent measurement freezes the evolution; that is the **quantum Zeno effect**, and the same physics explains why stray measurement by the environment is so damaging to a computation.

The Elitzur-Vaidman paper and the CS 498QC lecture on it are short and readable.`,
          resources: [
            arxiv('hep-th/9305002', 'Elitzur and Vaidman, Quantum mechanical interaction-free measurements (1993)', 'The original bomb-tester paper; read sections 1-3.'),
            deWolf('Chapter 1 exercises include the bomb tester; chapter 2 treats the Hadamard as an interferometer.', true),
            quirk('Build H, a phase, H with a measurement in the middle, and watch the output probabilities as you drag in the measurement.'),
          ],
          exercises: [
            {
              slug: 'mz-fringe',
              title: 'The interference fringe',
              prompt:
                'Derive $P(0) = \\cos^2(\\varphi/2)$ for $HP(\\varphi)H|0\\rangle$ by multiplying matrices. Then give $P(0)$ for $\\varphi = \\pi/3$, $\\pi/2$ and $2\\pi/3$, and say which phase gate from this module gives each of $\\varphi = \\pi/2$ and $\\varphi = \\pi/4$.',
              kind: 'derivation',
              difficulty: 1,
              hint: '0.75, 0.5, 0.25. $P(\\pi/2) = S$, $P(\\pi/4) = T$.',
            },
            {
              slug: 'bomb-tester-numbers',
              title: 'Bomb tester bookkeeping',
              prompt:
                'A box contains a live bomb with probability 1/2 and a dud with probability 1/2. You send one photon through the balanced interferometer. (a) Give the probability of each of the outcomes: explosion, detector 0, detector 1. (b) Given that detector 0 clicked, what is the probability the bomb is live? (c) If you repeat the test whenever detector 0 clicks (and the bomb has not exploded), what fraction of live bombs are eventually certified without exploding?',
              kind: 'problem',
              difficulty: 2,
              hint: '(a) explosion 1/4, detector 1 1/8, detector 0 5/8. (b) $(1/8)/(5/8) = 1/5$. (c) For a live bomb each round gives explosion 1/2, certify 1/4, repeat 1/4, so certified $= (1/4)/(3/4) = 1/3$.',
            },
            {
              slug: 'zeno-table',
              title: 'The Zeno bomb tester',
              prompt:
                'Tabulate $\\cos^{2N}(\\pi/2N)$ for $N = 2, 5, 10, 50, 100$ and show analytically that $1 - \\cos^{2N}(\\pi/2N) \\approx \\pi^2/(4N)$ for large $N$. Then simulate $N = 5$ in Quirk or Qiskit by alternating $R_y(\\pi/5)$ with a mid-circuit measurement, and compare the fraction of runs that end in $|0\\rangle$ with every intermediate measurement giving 0.',
              kind: 'simulation',
              difficulty: 3,
              hint: '$N = 2$: 0.25; 5: 0.605; 10: 0.781; 50: 0.952; 100: 0.976. Use $\\cos x \\approx 1 - x^2/2$ and $(1 - a)^{2N} \\approx 1 - 2Na$.',
            },
          ],
          selfAssessment: [
            {
              question: 'Why does detector 1 stay dark in a balanced interferometer?',
              answerOutline: 'Its two path amplitudes are +1/2 and −1/2 and cancel (destructive interference), as in H·H|0⟩ = |0⟩.',
            },
            {
              question: 'How does the bomb tester detect a live bomb without the photon touching it?',
              answerOutline: 'A live bomb acts as a which-path measurement, destroying the interference; then detector 1 can click (probability 1/4), which is impossible with a dud.',
            },
            {
              question: 'What is the quantum Zeno effect?',
              answerOutline: 'Frequent measurements keep projecting the state back, so small evolution steps never accumulate; survival probability cos^{2N}(π/2N) → 1.',
            },
          ],
          quiz: [
            {
              question: 'In a Mach-Zehnder interferometer modelled as $HP(\\varphi)H|0\\rangle$, a phase $\\varphi = 2\\pi/3$ is applied. What is the probability of detector 1?',
              options: ['0.25', '0.5', '0.667', '0.75'],
              answer: 3,
              explanation: '$P(1) = \\sin^2(\\varphi/2) = \\sin^2(60°) = 0.75$. 0.25 is $P(0) = \\cos^2 60°$; 0.667 treats the phase as a fraction of a turn.',
            },
            {
              question: 'A detector is placed on path 1 inside a balanced interferometer, without blocking the photon (it just records which path it took). What is now the probability of detector 1 at the output?',
              options: ['0', '0.25', '0.5', '1'],
              answer: 2,
              explanation: 'The which-path record collapses the photon onto one path, and the second beam splitter turns either path into 50/50, so detector 1 fires half the time. The bomb gives 1/4 only because it also absorbs the path-1 photons.',
            },
            {
              question: 'The Zeno bomb tester uses $N = 20$ steps of $R_y(\\pi/20)$. What is the probability that a live bomb is certified without exploding?',
              options: ['About 0.50', 'About 0.78', 'About 0.88', 'About 0.99'],
              answer: 2,
              explanation: '$\\cos^{40}(\\pi/40) = \\cos^{40}(4.5°) \\approx 0.884$, consistent with $1 - \\pi^2/80 \\approx 0.877$. 0.78 is the $N = 10$ value.',
            },
          ],
          relatedLessons: ['physics-quantum/waves-and-interference/interferometers', 'physics-quantum/photons/wave-particle-duality'],
        },
      ],
      project: {
        slug: 'single-qubit-lab',
        title: 'A single-qubit lab notebook: tomography and an interferometer',
        description: `Run three short experiments on one qubit, by hand first, then in a simulator, and (optionally) on a free IBM Quantum device. (1) **State tomography**: prepare $R_y(1.0)$ then $T$ applied to $|0\\rangle$, predict its Bloch vector, then estimate it from 1000 shots in each of the $Z$, $X$ and $Y$ bases and compare, with error bars. (2) **Relative phase**: show with counts that $|+\\rangle$ and $|-\\rangle$ agree in $Z$ and disagree in $X$, and that $-|+\\rangle$ agrees with $|+\\rangle$ everywhere. (3) **Interferometer fringe**: measure $P(0)$ for $HP(\\varphi)H|0\\rangle$ at eight values of $\\varphi$ and fit $\\cos^2(\\varphi/2)$; then insert a mid-circuit measurement and show the fringe disappears. On real hardware, report the fringe visibility $(P_{max} - P_{min})/(P_{max} + P_{min})$ and suggest why it is below 1.`,
        deliverables: [
          'Hand predictions for all three experiments with the algebra shown',
          'Simulator (or widget) results with shot-noise error bars and a comparison table',
          'A fringe plot with fitted curve, with and without the mid-circuit measurement',
          'Optional: the same on IBM hardware with a paragraph on the observed visibility',
        ],
        estimatedHours: 3,
        stretchGoals: ['Estimate the Bloch vector by maximum likelihood instead of linear inversion and compare when the linear estimate has length greater than 1'],
      },
    },
    {
      slug: 'many-qubits-and-circuits',
      title: 'Many Qubits and Circuits',
      description:
        'From one qubit to n: tensor products and the 2ⁿ amplitudes they produce, CNOT and controlled gates, entanglement and partial measurement, reversible classical computation and uncomputation, universal gate sets, and why simulating n qubits classically costs 2ⁿ numbers.',
      lessons: [
        {
          slug: 'tensor-products',
          title: 'Tensor products and multi-qubit states',
          summary:
            'How two qubits combine: the tensor (Kronecker) product of states and of operators, the ordering of basis states, product states, and the exponential growth to 2ⁿ amplitudes.',
          estimatedMinutes: 90,
          objectives: [
            'Compute tensor products of states and of matrices (Kronecker products)',
            'Order the basis |00⟩, |01⟩, |10⟩, |11⟩ with qubit 0 as the leftmost bit, and translate to Qiskit\'s reversed order',
            'Apply an operator such as H ⊗ I or X ⊗ Z to a two-qubit state',
            'Compute measurement probabilities of a multi-qubit state, for all qubits and for one qubit',
            'Explain why n qubits need 2ⁿ amplitudes',
          ],
          concepts: [
            'Tensor product |a⟩ ⊗ |b⟩ = |ab⟩',
            'Kronecker product of matrices',
            'Basis ordering |q0 q1 … ⟩',
            'Qiskit little-endian ordering',
            'Product states',
            'Operators A ⊗ B act qubit by qubit',
            '2ⁿ amplitudes for n qubits',
          ],
          explanation: `Two qubits live in $\\mathbb{C}^2 \\otimes \\mathbb{C}^2 = \\mathbb{C}^4$, with basis $|00\\rangle, |01\\rangle, |10\\rangle, |11\\rangle$. In this course the **first** symbol is qubit 0, the top wire of a circuit (Nielsen and Chuang's convention). Qiskit prints bit strings the other way round, with qubit 0 on the right, so its "01" is our $|10\\rangle$; check the convention whenever you compare with software.

**Tensor product of states.** If qubit 0 is $\\alpha|0\\rangle + \\beta|1\\rangle$ and qubit 1 is $\\gamma|0\\rangle + \\delta|1\\rangle$, the pair is
$$\\begin{pmatrix}\\alpha\\\\\\beta\\end{pmatrix}\\otimes\\begin{pmatrix}\\gamma\\\\\\delta\\end{pmatrix} = \\begin{pmatrix}\\alpha\\gamma\\\\\\alpha\\delta\\\\\\beta\\gamma\\\\\\beta\\delta\\end{pmatrix}.$$
Example: $(0.6|0\\rangle + 0.8|1\\rangle)\\otimes|+\\rangle = (0.424,\\ 0.424,\\ 0.566,\\ 0.566)$, so $P(10) = 0.32$. States of this form are **product states**.

**Tensor product of operators.** $(A\\otimes B)(|a\\rangle\\otimes|b\\rangle) = A|a\\rangle\\otimes B|b\\rangle$, and the matrix is the Kronecker product: each entry of $A$ times the whole of $B$. So $H\\otimes I$ means "$H$ on qubit 0, nothing on qubit 1":
$$(H\\otimes I)|00\\rangle = \\tfrac{1}{\\sqrt2}(|00\\rangle + |10\\rangle),\\qquad (I\\otimes H)|00\\rangle = \\tfrac{1}{\\sqrt2}(|00\\rangle + |01\\rangle).$$
A sign check: $(X\\otimes Z)|11\\rangle = X|1\\rangle\\otimes Z|1\\rangle = -|01\\rangle$.

**Measuring.** Measuring all qubits gives the string $x$ with probability $|\\langle x|\\psi\\rangle|^2$. Measuring only qubit 0 gives 0 with probability $\\sum_{x_1}|\\langle 0x_1|\\psi\\rangle|^2$: add the squared amplitudes of every string starting with 0. For the example, $P(q_0 = 0) = 0.18 + 0.18 = 0.36$, as it must be for a product state.

**Exponential growth.** $n$ qubits have $2^n$ basis strings, so a general state needs $2^n$ complex amplitudes; 10 qubits need 1024, 50 qubits about $10^{15}$. Most of those states are *not* products of single-qubit states (next lessons), which is both the source of quantum computing's power and the reason it is hard to simulate. Note what this does *not* say: you cannot read out $2^n$ numbers, because measurement returns $n$ bits.

\`\`\`interactive
qc-circuit
{"qubits": 2, "circuit": ["RY(1.8546) 0", "H 1"], "palette": ["H", "X", "Z", "RY"], "title": "A product state of two qubits", "caption": "Qubit 0 is prepared in 0.6|0⟩ + 0.8|1⟩ and qubit 1 in |+⟩. Read the four amplitudes and check them against the Kronecker product (0.424, 0.424, 0.566, 0.566). Add an X on qubit 1 and a Z on qubit 0 and predict each amplitude before you look."}
\`\`\`

Read Watrous lesson 2 on multiple systems.`,
          resources: [
            ibm('basics-of-quantum-information', 'Lesson 2, Multiple systems: tensor products of states and operations, and the ordering conventions (Watrous discusses Qiskit\'s order).', true),
            codebook('circuits-with-many-qubits', 'Circuits with many qubits', 'Nodes on multi-qubit states and tensor products, with code that builds the state vectors.'),
            deWolf('Chapter 1, the tensor product and multi-qubit states; appendix A for the Kronecker product.'),
            qiskitDocs('Search the guides for "bit ordering": Qiskit\'s little-endian convention, the opposite of this course\'s, explained with examples.'),
          ],
          exercises: [
            {
              slug: 'kronecker-drill',
              title: 'Kronecker products by hand',
              prompt:
                'Compute (a) $|+\\rangle\\otimes|-\\rangle$; (b) $|1\\rangle\\otimes|+i\\rangle$; (c) the 4 × 4 matrices $H\\otimes I$ and $I\\otimes H$; (d) $(Z\\otimes X)(|+\\rangle\\otimes|0\\rangle)$. For (d), give the probabilities of the four outcomes and of $q_0 = 1$.',
              kind: 'problem',
              difficulty: 1,
              hint: '(a) $\\tfrac12(1, -1, 1, -1)$. (d) $Z|+\\rangle\\otimes X|0\\rangle = |-\\rangle|1\\rangle = \\tfrac{1}{\\sqrt2}(0, 1, 0, -1)$: $P(01) = P(11) = 1/2$, $P(q_0 = 1) = 1/2$.',
            },
            {
              slug: 'ordering-translation',
              title: 'Translate between conventions',
              prompt:
                'A three-qubit circuit applies $X$ to qubit 0 and $H$ to qubit 2, starting from $|000\\rangle$. Write the final state in this course\'s convention $|q_0q_1q_2\\rangle$ and as the bit strings Qiskit would print (ordered $q_2q_1q_0$). Then give the index (0-7) of each basis state with nonzero amplitude in both conventions.',
              kind: 'problem',
              difficulty: 2,
              hint: 'Here: $\\tfrac{1}{\\sqrt2}(|100\\rangle + |101\\rangle)$, indices 4 and 5. Qiskit prints "001" and "101", indices 1 and 5.',
            },
            {
              slug: 'counting-amplitudes',
              title: 'How big is the state?',
              prompt:
                'Storing each amplitude as two 64-bit floats (16 bytes), how much memory does the state vector of 20, 30, 40 and 50 qubits need? Compare with a laptop (16 GB) and the largest supercomputers (of order $10^{16}$ to $10^{17}$ bytes of memory). Then explain in two sentences why this does not mean a 50-qubit computer "stores a petabyte".',
              kind: 'problem',
              difficulty: 1,
              hint: '$16\\cdot2^{20} \\approx 16.8$ MB; $2^{30}\\cdot16 \\approx 17.2$ GB; $2^{40}\\cdot16 \\approx 17.6$ TB; $2^{50}\\cdot16 \\approx 18$ PB.',
            },
          ],
          selfAssessment: [
            {
              question: 'How do you compute the tensor product of two single-qubit states?',
              answerOutline: 'Multiply amplitudes: (α, β) ⊗ (γ, δ) = (αγ, αδ, βγ, βδ) in the order |00⟩, |01⟩, |10⟩, |11⟩ with the first qubit leftmost.',
            },
            {
              question: 'What does H ⊗ I mean in a circuit?',
              answerOutline: 'Apply H to qubit 0 and do nothing to qubit 1; the 4×4 matrix is the Kronecker product.',
            },
            {
              question: 'How do you get the probability of one qubit\'s outcome from a multi-qubit state?',
              answerOutline: 'Sum |amplitude|² over all basis strings with that value of the qubit.',
            },
          ],
          quiz: [
            {
              question: 'What is $(X\\otimes H)|01\\rangle$?',
              options: ['$\\tfrac{1}{\\sqrt2}(|10\\rangle - |11\\rangle)$', '$\\tfrac{1}{\\sqrt2}(|10\\rangle + |11\\rangle)$', '$\\tfrac{1}{\\sqrt2}(|00\\rangle - |01\\rangle)$', '$|11\\rangle$'],
              answer: 0,
              explanation: '$X|0\\rangle = |1\\rangle$ on qubit 0 and $H|1\\rangle = |-\\rangle$ on qubit 1, giving $|1\\rangle|-\\rangle$. Choosing the $+$ sign applies $H$ to $|0\\rangle$; applying $X$ to the wrong qubit gives the third option.',
            },
            {
              question: 'A two-qubit state has amplitudes $(0.5, 0.5i, -0.5, 0.5)$ on $|00\\rangle, |01\\rangle, |10\\rangle, |11\\rangle$. What is the probability that qubit 1 (the right-hand bit) is 1?',
              options: ['0.25', '0.707', '0.5', '0'],
              answer: 2,
              explanation: 'Strings with $q_1 = 1$ are 01 and 11: $|0.5i|^2 + |0.5|^2 = 0.5$. Counting only $|11\\rangle$ gives 0.25; 0.707 is $|0.5i + 0.5|$, the size of the summed amplitudes, which is not a probability.',
            },
            {
              question: 'Qiskit reports the counts {"01": 500, "00": 500} for a two-qubit circuit. In this course\'s convention ($|q_0 q_1\\rangle$), which outcomes occurred?',
              options: ['$|01\\rangle$ and $|00\\rangle$', '$|11\\rangle$ and $|00\\rangle$', '$|01\\rangle$ and $|11\\rangle$', '$|10\\rangle$ and $|00\\rangle$'],
              answer: 3,
              explanation: 'Qiskit writes $q_1q_0$, so its "01" means $q_0 = 1$, $q_1 = 0$, which is $|10\\rangle$ here. This reversed order is one of the most common sources of wrong answers when checking hand calculations in software.',
            },
          ],
          relatedLessons: ['quantum-mechanics/entanglement-measurement-and-information/qubits-gates-and-quantum-circuits'],
        },
        {
          slug: 'cnot-and-controlled-gates',
          title: 'CNOT, controlled gates and circuit diagrams',
          summary:
            'The CNOT gate and its matrix, controlled-U gates, CZ and its symmetry, SWAP from three CNOTs, how to read a circuit diagram (time left to right, matrices right to left), and how CNOT behaves in the X basis.',
          estimatedMinutes: 90,
          objectives: [
            'Write the matrices of CNOT, CZ, SWAP and a general controlled-U in the standard basis',
            'Read a circuit diagram and convert it to a product of matrices in the right order',
            'Show that CZ is symmetric in its two qubits and that three CNOTs make a SWAP',
            'Show that conjugating CNOT by Hadamards swaps control and target',
          ],
          concepts: [
            'CNOT |x, y⟩ → |x, y ⊕ x⟩',
            'Controlled-U = |0⟩⟨0| ⊗ I + |1⟩⟨1| ⊗ U',
            'CZ (symmetric)',
            'SWAP = three CNOTs',
            'Circuit diagram conventions',
            'Matrix order reversed relative to time',
            'Control and target swap in the X basis',
          ],
          explanation: `The **controlled-NOT** flips the target qubit when the control is 1: $\\mathrm{CNOT}|x, y\\rangle = |x, y\\oplus x\\rangle$. With qubit 0 as control, in the order $|00\\rangle, |01\\rangle, |10\\rangle, |11\\rangle$,
$$\\mathrm{CNOT} = \\begin{pmatrix}1&0&0&0\\\\0&1&0&0\\\\0&0&0&1\\\\0&0&1&0\\end{pmatrix} = |0\\rangle\\langle0|\\otimes I + |1\\rangle\\langle1|\\otimes X.$$
On basis states it is just XOR. On superpositions it does something no classical gate does: $\\mathrm{CNOT}\\,\\tfrac{1}{\\sqrt2}(|0\\rangle + |1\\rangle)|0\\rangle = \\tfrac{1}{\\sqrt2}(|00\\rangle + |11\\rangle)$, which is not a product state (next lesson).

**Controlled-U** in general is $|0\\rangle\\langle0|\\otimes I + |1\\rangle\\langle1|\\otimes U$. The **controlled-Z** is $\\mathrm{diag}(1, 1, 1, -1)$: it multiplies $|11\\rangle$ by $-1$ and nothing else, so it is **symmetric**; there is no real distinction between its control and target. CZ is the native two-qubit gate on many superconducting and neutral-atom machines.

**Reading circuits.** Wires are qubits (qubit 0 on top); time runs left to right. If a circuit applies $A$ then $B$, the overall matrix is $BA$: the order reverses. Gates on different wires in the same column combine by tensor product.

**Three identities worth knowing.**
1. $\\mathrm{CNOT} = (I\\otimes H)\\,\\mathrm{CZ}\\,(I\\otimes H)$, because $HZH = X$ on the target.
2. Three alternating CNOTs make a **SWAP**: $|x, y\\rangle \\to |x, x\\oplus y\\rangle \\to |y, x\\oplus y\\rangle \\to |y, x\\rangle$. Hardware with nearest-neighbour coupling pays this cost (three two-qubit gates) every time it moves a qubit.
3. Conjugating CNOT by $H\\otimes H$ **swaps control and target**. In the $\\pm$ basis the "target" controls the "control". The lesson: "control" and "target" describe the computational basis, not a direction of information flow. The phase kickback of module 5 is this fact in disguise.

\`\`\`interactive
qc-circuit
{"qubits": 2, "circuit": ["X 0", "CNOT 0 1", "CNOT 1 0", "CNOT 0 1"], "palette": ["H", "X", "CNOT", "CZ", "SWAP"], "title": "Three CNOTs make a SWAP", "caption": "The input is |10⟩. Step through the columns and watch |10⟩ → |11⟩ → |01⟩ → |01⟩: the qubits have been exchanged. Replace the first X by an H on qubit 0 and check that a superposition is swapped too. Then build H on both qubits, CNOT 0 1, H on both, starting from |01⟩, and see qubit 0 flip."}
\`\`\`

Watrous lesson 3 (quantum circuits) and the Codebook's many-qubit nodes cover these gates with exercises.`,
          resources: [
            ibm('basics-of-quantum-information', 'Lesson 3, Quantum circuits: circuit conventions, controlled operations, CNOT, CZ and SWAP.', true),
            codebook('circuits-with-many-qubits', 'Circuits with many qubits', 'Nodes on CNOT, controlled gates and SWAP; code each identity and check the matrices.'),
            quirk('Drag in CNOTs and Hadamards and watch the amplitude display; verify that H⊗H·CNOT·H⊗H reverses the CNOT.'),
          ],
          exercises: [
            {
              slug: 'controlled-matrices',
              title: 'Write the matrices',
              prompt:
                'Write the 4 × 4 matrices (order $|00\\rangle..|11\\rangle$, qubit 0 first) of: (a) CNOT with control qubit 1 and target qubit 0; (b) CZ; (c) controlled-$S$ with control qubit 0; (d) SWAP. Check that each is unitary, and verify that (a) equals $(H\\otimes H)\\,\\mathrm{CNOT}_{0\\to1}(H\\otimes H)$ by multiplying matrices or with the widget.',
              kind: 'problem',
              difficulty: 2,
              hint: '(a) swaps $|01\\rangle$ and $|11\\rangle$: rows (1,0,0,0), (0,0,0,1), (0,0,1,0), (0,1,0,0). (c) diag$(1, 1, 1, i)$.',
            },
            {
              slug: 'circuit-to-matrix',
              title: 'From a diagram to a state',
              prompt:
                'A circuit on $|00\\rangle$ applies $H$ to qubit 0, then CNOT$_{0\\to1}$, then $Z$ on qubit 1, then $H$ on qubit 1. Compute the state after each column as a 4-vector, and give the final measurement probabilities. Write the whole circuit as a single matrix product (in the correct order) before evaluating it.',
              kind: 'problem',
              difficulty: 2,
              hint: 'After CNOT: $\\tfrac{1}{\\sqrt2}(1,0,0,1)$; after $Z_1$: $\\tfrac{1}{\\sqrt2}(1,0,0,-1)$; after $H_1$: $\\tfrac12(1, 1, -1, 1)$, so all four outcomes have probability 1/4. Matrix: $(I\\otimes H)(I\\otimes Z)\\,\\mathrm{CNOT}\\,(H\\otimes I)$.',
            },
            {
              slug: 'swap-cost',
              title: 'Routing on a line of qubits',
              prompt:
                'Five qubits sit on a line and only neighbours can interact. You need a CNOT between qubit 0 and qubit 4. Using SWAPs (3 CNOTs each), how many CNOTs does the cheapest scheme you can find use, if the qubits must end in their original positions? Explain why connectivity is a real hardware cost (compare with all-to-all connected trapped ions, module 9).',
              kind: 'problem',
              difficulty: 2,
              hint: 'Move qubit 0 next to qubit 4 with 3 SWAPs (9 CNOTs), do the CNOT, and move it back (9 more): 19. Better schemes exist (for example a CNOT ladder of about 12 CNOTs), so present yours and count carefully.',
            },
          ],
          selfAssessment: [
            {
              question: 'Write CNOT in outer-product form.',
              answerOutline: 'CNOT = |0⟩⟨0| ⊗ I + |1⟩⟨1| ⊗ X (control on the first qubit).',
            },
            {
              question: 'Why is CZ called symmetric?',
              answerOutline: 'Its matrix diag(1, 1, 1, −1) only puts a −1 on |11⟩, which is unchanged if the two qubits are exchanged.',
            },
            {
              question: 'If a circuit applies A then B, what is the overall matrix?',
              answerOutline: 'BA: matrices compose right to left while circuits read left to right.',
            },
          ],
          quiz: [
            {
              question: 'What is $\\mathrm{CNOT}_{0\\to1}$ applied to $\\tfrac{1}{\\sqrt2}(|01\\rangle + |10\\rangle)$?',
              options: ['$\\tfrac{1}{\\sqrt2}(|01\\rangle + |11\\rangle)$', '$\\tfrac{1}{\\sqrt2}(|00\\rangle + |11\\rangle)$', '$\\tfrac{1}{\\sqrt2}(|01\\rangle + |10\\rangle)$', '$\\tfrac{1}{\\sqrt2}(|11\\rangle + |10\\rangle)$'],
              answer: 0,
              explanation: '$|01\\rangle$ has control 0, so it is unchanged; $|10\\rangle$ has control 1, so the target flips to give $|11\\rangle$. The result is $|{+}\\rangle|1\\rangle$, a product state. Flipping the target in both terms gives the last option.',
            },
            {
              question: 'Which gate is unchanged if you exchange which qubit is called control and which target?',
              options: ['CNOT', 'Controlled-$H$', 'Controlled-$S$', 'Controlled-$X$ followed by $X$ on the target'],
              answer: 2,
              explanation: 'Controlled-$S$ = diag$(1, 1, 1, i)$, like CZ, only changes the phase of $|11\\rangle$, so it is symmetric. Any controlled phase gate diag$(1,1,1,e^{i\\varphi})$ has this property; CNOT and controlled-$H$ do not.',
            },
            {
              question: 'Starting from $|01\\rangle$ you apply $H\\otimes H$, then CNOT$_{0\\to1}$, then $H\\otimes H$. What is the final state?',
              options: ['$|01\\rangle$', '$|00\\rangle$', '$|10\\rangle$', '$|11\\rangle$'],
              answer: 3,
              explanation: 'Conjugating by $H\\otimes H$ turns CNOT$_{0\\to1}$ into CNOT$_{1\\to0}$. Qubit 1 is 1, so qubit 0 flips: $|11\\rangle$. Expecting $|01\\rangle$ (nothing happens because the original control is 0) ignores the basis change.',
            },
            {
              question: 'How many CNOTs does a SWAP cost when built from CNOTs alone?',
              options: ['3', '1', '2', '4'],
              answer: 0,
              explanation: 'Three alternating CNOTs implement $|x, y\\rangle \\to |y, x\\rangle$, and no fewer suffice since one or two CNOTs cannot exchange two arbitrary qubit states. That is why moving qubits on sparsely connected chips is expensive.',
            },
          ],
          relatedLessons: ['quantum-mechanics/entanglement-measurement-and-information/qubits-gates-and-quantum-circuits'],
        },
        {
          slug: 'entanglement-and-partial-measurement',
          title: 'Entanglement, Bell states and partial measurement',
          summary:
            'Product versus entangled states and a test for two qubits, the four Bell states, measuring one qubit of a pair, and the difference between entanglement and classical correlation.',
          estimatedMinutes: 100,
          objectives: [
            'Decide whether a two-qubit pure state is a product or entangled (the ad − bc test)',
            'Write the four Bell states and prepare each with H and CNOT',
            'Apply the partial-measurement rule: probability, then renormalised post-measurement state',
            'Distinguish entanglement from classical correlation with an X-basis measurement',
            'Explain why measuring one half of a Bell pair sends no signal',
          ],
          concepts: [
            'Product versus entangled state',
            'Test: a|00⟩+b|01⟩+c|10⟩+d|11⟩ is a product iff ad = bc',
            'Bell states Φ±, Ψ±',
            'Preparation: H then CNOT',
            'Partial measurement and renormalisation',
            'Entangled versus classically correlated',
            'No signalling',
          ],
          explanation: `A two-qubit state is a **product** if it can be written $|a\\rangle\\otimes|b\\rangle$; otherwise it is **entangled**. For $a|00\\rangle + b|01\\rangle + c|10\\rangle + d|11\\rangle$ there is a quick test: it is a product exactly when $ad - bc = 0$ (the 2 × 2 matrix of amplitudes has rank 1). For $\\tfrac{1}{\\sqrt2}(|00\\rangle + |11\\rangle)$, $ad - bc = \\tfrac12 \\ne 0$: entangled. For $\\tfrac12(|00\\rangle + |01\\rangle + |10\\rangle + |11\\rangle)$, $ad - bc = 0$: it is $|+\\rangle|+\\rangle$.

**Bell states.** $H$ on qubit 0 then CNOT$_{0\\to1}$ maps $|00\\rangle, |01\\rangle, |10\\rangle, |11\\rangle$ to
$$|\\Phi^\\pm\\rangle = \\tfrac{1}{\\sqrt2}(|00\\rangle \\pm |11\\rangle),\\qquad |\\Psi^\\pm\\rangle = \\tfrac{1}{\\sqrt2}(|01\\rangle \\pm |10\\rangle),$$
($|10\\rangle \\to \\Phi^-$, $|01\\rangle \\to \\Psi^+$, $|11\\rangle \\to \\Psi^-$), an orthonormal basis of maximally entangled states.

\`\`\`interactive
qc-circuit
{"preset": "bell", "perQubit": true, "palette": ["H", "X", "Z", "CNOT", "M"], "title": "Making a Bell pair", "caption": "H then CNOT turns |00⟩ into (|00⟩ + |11⟩)/√2: probabilities 0.5 on 00 and 11. The per-qubit panel shows each qubit's own Bloch vector has length 0, the signature of maximal entanglement. Add an M on qubit 0, choose outcome 1, and see qubit 1 become |1⟩. Add an X on qubit 1 before the CNOT to make Ψ+."}
\`\`\`

**Partial measurement.** Measure qubit 0 of $|\\psi\\rangle$. The probability of outcome 0 is the total weight of strings starting with 0; afterwards keep only those terms and **renormalise**. Example: $|\\psi\\rangle = \\tfrac{1}{\\sqrt3}(|00\\rangle + |01\\rangle + |11\\rangle)$. $P(q_0 = 0) = 2/3$, leaving $|0\\rangle\\tfrac{1}{\\sqrt2}(|0\\rangle + |1\\rangle)$; $P(q_0 = 1) = 1/3$, leaving $|11\\rangle$. The other qubit's state depends on the result.

**Entangled is not just correlated.** A box that emits $|00\\rangle$ or $|11\\rangle$ at random also gives perfectly correlated $Z$ outcomes. Measure both qubits in the $X$ basis instead: $|\\Phi^+\\rangle = \\tfrac{1}{\\sqrt2}(|{+}{+}\\rangle + |{-}{-}\\rangle)$ still gives equal outcomes every time, while the random box gives uncorrelated $X$ results. Correlation in *every* basis at once is what classical randomness cannot fake; Bell's theorem (module 4) makes this quantitative.

**No signalling.** If Alice measures her half of $|\\Phi^+\\rangle$, Bob's qubit becomes $|0\\rangle$ or $|1\\rangle$, but without her result he sees 50/50 whatever she did. His statistics do not depend on her choice, so nothing travels faster than light. The correlation is visible only when the two records are compared, which needs a classical channel.

Watrous lesson 2 has the partial-measurement rule in full; the quantum-mechanics EPR lesson gives the history.`,
          resources: [
            ibm('basics-of-quantum-information', 'Lesson 2: partial measurements and the Bell states; lesson 4 (Entanglement in action) previews teleportation and CHSH.', true),
            deWolf('Chapter 1, entanglement and the Bell states.'),
            preskill('Chapter 4 (quantum entanglement): Bell states, entanglement and why correlations alone do not signal.'),
          ],
          exercises: [
            {
              slug: 'product-or-entangled',
              title: 'Product or entangled?',
              prompt:
                'Decide whether each state is a product or entangled, and factor the products: (a) $\\tfrac12(|00\\rangle - |01\\rangle + |10\\rangle - |11\\rangle)$; (b) $\\tfrac12(|00\\rangle + |01\\rangle + |10\\rangle - |11\\rangle)$; (c) $\\tfrac{1}{\\sqrt2}(|01\\rangle - i|11\\rangle)$; (d) $0.6|00\\rangle + 0.8|11\\rangle$; (e) $\\tfrac{1}{\\sqrt3}(|00\\rangle + |01\\rangle + |10\\rangle)$.',
              kind: 'problem',
              difficulty: 1,
              hint: '(a) $|+\\rangle|-\\rangle$; (b) $ad - bc = -\\tfrac12$: entangled; (c) $\\tfrac{1}{\\sqrt2}(|0\\rangle - i|1\\rangle)\\otimes|1\\rangle = |-i\\rangle|1\\rangle$; (d) entangled; (e) $ad - bc = -\\tfrac13$: entangled.',
            },
            {
              slug: 'partial-measurement-practice',
              title: 'Measure one qubit of three',
              prompt:
                'The three-qubit state is $\\tfrac{1}{2}(|000\\rangle + |011\\rangle + |101\\rangle + |110\\rangle)$. (a) Measure qubit 0: give both outcome probabilities and post-measurement states. (b) Instead measure qubit 2: same question. (c) Measure all three: what is the parity $q_0\\oplus q_1\\oplus q_2$ every time? Check (a) with the widget\'s M gate.',
              kind: 'problem',
              difficulty: 2,
              hint: '(a) 1/2 each: $|0\\rangle\\tfrac{1}{\\sqrt2}(|00\\rangle + |11\\rangle)$ or $|1\\rangle\\tfrac{1}{\\sqrt2}(|01\\rangle + |10\\rangle)$. (c) Always even parity.',
            },
            {
              slug: 'correlated-vs-entangled',
              title: 'Entangled or a random box?',
              prompt:
                'Compute the probabilities of the four outcomes when both qubits are measured in the $X$ basis, for (i) $|\\Phi^+\\rangle$ and (ii) the random box that emits $|00\\rangle$ or $|11\\rangle$ with probability 1/2 each. Repeat for $|\\Psi^-\\rangle$ in the $Z$, $X$ and $Y$ bases. Write a paragraph on why no classical box can match $|\\Psi^-\\rangle$ in all three bases at once (a preview of Bell\'s theorem).',
              kind: 'writing',
              difficulty: 2,
              hint: '$|\\Phi^+\\rangle$ in $X$: ++ and −− each 1/2. The box: all four outcomes 1/4. $|\\Psi^-\\rangle$ gives opposite outcomes in every basis.',
            },
          ],
          selfAssessment: [
            {
              question: 'Give the test for whether a two-qubit pure state is entangled.',
              answerOutline: 'Write amplitudes a, b, c, d for 00, 01, 10, 11; it is a product state iff ad − bc = 0.',
            },
            {
              question: 'State the partial-measurement rule.',
              answerOutline: 'P(outcome) = sum of |amplitude|² of strings consistent with it; the post-measurement state keeps those terms, renormalised by √P.',
            },
            {
              question: 'Why does measuring half of a Bell pair not send a signal?',
              answerOutline: 'The other party\'s local outcome statistics (50/50) are the same whatever the first party measured; correlations appear only after comparing results over a classical channel.',
            },
          ],
          quiz: [
            {
              question: 'Which state is entangled?',
              options: [
                '$\\tfrac12(|00\\rangle + i|01\\rangle + |10\\rangle + i|11\\rangle)$',
                '$\\tfrac{1}{\\sqrt2}(|00\\rangle + |01\\rangle)$',
                '$\\tfrac12(|00\\rangle - |01\\rangle - |10\\rangle + |11\\rangle)$',
                '$\\tfrac{1}{\\sqrt5}(|00\\rangle + 2|11\\rangle)$',
              ],
              answer: 3,
              explanation: 'For the last state $ad - bc = 2/5 \\ne 0$. The others are products: $|+\\rangle|+i\\rangle$, $|0\\rangle|+\\rangle$ and $|-\\rangle|-\\rangle$. Unequal amplitudes do not make a state a product; only $ad = bc$ does.',
            },
            {
              question: 'Qubit 0 of $\\tfrac{1}{\\sqrt3}(|00\\rangle + |01\\rangle + |11\\rangle)$ is measured and gives 0. What is the state of qubit 1 afterwards?',
              options: ['$|+\\rangle$', '$|0\\rangle$', '$\\tfrac{1}{\\sqrt3}(|0\\rangle + |1\\rangle)$', '$|1\\rangle$'],
              answer: 0,
              explanation: 'Keeping the terms with $q_0 = 0$ gives $\\tfrac{1}{\\sqrt3}(|00\\rangle + |01\\rangle)$, which renormalised is $|0\\rangle|+\\rangle$. Forgetting to renormalise leaves a vector of length $\\sqrt{2/3}$; outcome 1 would have left $|1\\rangle$.',
            },
            {
              question: 'A source emits either $|00\\rangle$ or $|11\\rangle$ at random. Another emits $|\\Phi^+\\rangle$. Which measurement tells them apart?',
              options: [
                'Measure both qubits in $Z$ and check whether results agree',
                'Measure only one qubit in $Z$',
                'Measure both in $X$: $|\\Phi^+\\rangle$ always agrees, the random source agrees only half the time',
                'None, because they have identical statistics in every basis',
              ],
              answer: 2,
              explanation: 'Both sources give perfectly correlated $Z$ results and 50/50 single-qubit statistics. In the $X$ basis $|\\Phi^+\\rangle = \\tfrac{1}{\\sqrt2}(|{+}{+}\\rangle + |{-}{-}\\rangle)$ stays correlated, while the random source gives independent results.',
            },
            {
              question: 'Alice and Bob share $|\\Phi^+\\rangle$. Alice measures in the $X$ basis; Bob measures in $Z$ without knowing her result. What is Bob\'s probability of 0?',
              options: ['1', 'It depends on Alice\'s result', '0', '1/2'],
              answer: 3,
              explanation: 'Whatever Alice does, Bob\'s qubit alone gives 50/50. Her result changes the conditional state of his qubit, but averaging over her (unknown to him) results leaves his statistics unchanged: no signalling.',
            },
          ],
          relatedLessons: [
            'quantum-mechanics/entanglement-measurement-and-information/entanglement-epr-and-bells-theorem',
            'probability-statistics/probability-foundations/conditional-probability-and-independence',
          ],
        },
        {
          slug: 'reversible-computing-and-uncomputation',
          title: 'Reversible computation, the Toffoli gate and uncomputation',
          summary:
            'Why quantum circuits compute classical functions reversibly, the Toffoli gate as a universal reversible gate, oracles U_f|x⟩|y⟩ = |x⟩|y ⊕ f(x)⟩, and why leftover "garbage" must be uncomputed.',
          estimatedMinutes: 90,
          objectives: [
            'Explain why every gate in a quantum circuit must be reversible',
            'Build AND, NOT, OR and a copy (fan-out) from Toffoli and CNOT gates with ancillas',
            'Write the standard oracle U_f|x⟩|y⟩ = |x⟩|y ⊕ f(x)⟩ and check that it is unitary',
            'Show how garbage qubits entangled with the input spoil interference, and remove them by uncomputation',
          ],
          concepts: [
            'Reversible gate (bijection on bit strings)',
            'Toffoli (CCNOT): |a, b, c⟩ → |a, b, c ⊕ ab⟩',
            'Ancilla qubits',
            'Bennett\'s compute-copy-uncompute',
            'Standard oracle U_f',
            'Garbage and entanglement with the input',
            'Landauer\'s principle (erasure costs energy)',
          ],
          explanation: `Unitary means invertible, so a quantum circuit can only compute classical functions **reversibly**: distinct inputs must give distinct outputs. AND is not reversible (three inputs give output 0), so quantum circuits compute it into a fresh **ancilla** qubit instead of overwriting.

**The Toffoli gate** $|a, b, c\\rangle \\to |a, b, c\\oplus ab\\rangle$ does this: with $c = 0$ it writes $a\\wedge b$ into the ancilla. With $a = b = 1$ it is a NOT on $c$; with $a = 1$ and $c = 0$ it copies $b$ (classically; it cannot clone quantum states, module 4). Toffoli alone is universal for reversible classical computation, so every classical circuit of $G$ gates becomes a reversible one with $O(G)$ Toffolis and some ancillas. On hardware a Toffoli costs about six CNOTs plus single-qubit gates, including seven $T$ gates in the standard decomposition.

**Oracles.** For $f: \\{0,1\\}^n \\to \\{0,1\\}$, the **standard oracle** is $U_f|x\\rangle|y\\rangle = |x\\rangle|y\\oplus f(x)\\rangle$. It is a permutation of basis states, hence unitary, and its own inverse. Every algorithm in module 5 queries $f$ through such a box.

**Garbage.** Building $U_f$ from a classical circuit leaves intermediate values $g(x)$ on ancillas: $|x\\rangle|0\\rangle|0\\rangle \\to |x\\rangle|g(x)\\rangle|f(x)\\rangle$. On a superposition $\\sum_x|x\\rangle$ the garbage is **entangled** with $x$, and entanglement with junk destroys interference just as a which-path detector does. Example: $\\tfrac{1}{\\sqrt2}(|0\\rangle + |1\\rangle)$ followed by $H$ gives $|0\\rangle$; but if a CNOT first copies the qubit onto an ancilla, giving $\\tfrac{1}{\\sqrt2}(|00\\rangle + |11\\rangle)$, the same $H$ on qubit 0 gives 50/50.

**Uncomputation** (Bennett, 1973) fixes this: compute $f$ with garbage, CNOT the answer into a clean output qubit, then run the computation backwards to return every ancilla to $|0\\rangle$:
$$|x\\rangle|0\\rangle|0\\rangle|0\\rangle \\to |x\\rangle|g\\rangle|f\\rangle|0\\rangle \\to |x\\rangle|g\\rangle|f\\rangle|f\\rangle \\to |x\\rangle|0\\rangle|0\\rangle|f\\rangle.$$
It roughly doubles the gate count, the price of keeping the computation coherent.

\`\`\`interactive
qc-circuit
{"qubits": 4, "circuit": ["H 0", "H 1", "CCX 0 1 2", "CNOT 2 3", "CCX 0 1 2"], "palette": ["H", "X", "CNOT", "CCX"], "perQubit": true, "title": "Compute, copy, uncompute", "caption": "q2 is a work ancilla and q3 the output. The first Toffoli computes q0 AND q1 into q2, the CNOT copies it to q3, and the second Toffoli uncomputes q2 back to |0⟩. Step to the column before the last Toffoli and compare with the end: q2 is entangled before and clean after, while q3 holds the AND of q0 and q1 in every branch."}
\`\`\`

**Landauer's principle** says erasing a bit costs at least $kT\\ln 2$ of energy; reversible computing avoids erasure. For quantum computers the motive is coherence, not energy.`,
          resources: [
            ibm('fundamentals-of-quantum-algorithms', 'Lesson 1 and the lesson on quantum algorithmic foundations: computing classical functions reversibly, garbage and uncomputation.', true),
            arxiv('quant-ph/9503016', 'Barenco et al., Elementary gates for quantum computation (1995)', 'Section 7 decomposes the Toffoli and other controlled gates into CNOTs and single-qubit gates; the standard reference for gate counts.'),
            aaronson('Lectures on reversible computation and the Toffoli gate (around lectures 15-17), with the garbage problem explained informally.'),
          ],
          exercises: [
            {
              slug: 'reversible-logic',
              title: 'Reversible logic from Toffolis',
              prompt:
                'Using only Toffoli, CNOT and X gates with ancillas initialised to 0, build: (a) NOT; (b) AND; (c) OR (use $a\\vee b = \\neg(\\neg a\\wedge\\neg b)$); (d) a one-bit full adder that outputs sum $a\\oplus b\\oplus c$ and carry $\\mathrm{maj}(a, b, c)$. Give the truth table of (d) and count gates and ancillas.',
              kind: 'problem',
              difficulty: 2,
              hint: 'For OR: X on both inputs, Toffoli into an ancilla, X on the ancilla, then X on both inputs to restore them. The carry is $ab \\oplus ac \\oplus bc$: three Toffolis into one ancilla.',
            },
            {
              slug: 'oracle-unitary',
              title: 'The oracle is unitary',
              prompt:
                'For $n = 2$ and $f(x_0x_1) = x_0\\wedge x_1$, write $U_f$ as an 8 × 8 permutation matrix (basis $|x_0x_1y\\rangle$). Show $U_f^2 = I$. Then show that $|x\\rangle|y\\rangle \\to |x\\rangle|f(x)\\rangle$ (overwriting $y$) is not unitary for any non-constant $f$.',
              kind: 'derivation',
              difficulty: 2,
              hint: '$U_f$ is the Toffoli: it swaps $|110\\rangle$ and $|111\\rangle$. The overwriting map sends $|x, 0\\rangle$ and $|x, 1\\rangle$ to the same state.',
            },
            {
              slug: 'garbage-interference',
              title: 'Watch garbage spoil interference',
              prompt:
                'In the circuit widget (or Quirk), compare two 2-qubit circuits on $|00\\rangle$: (i) $H_0$, $Z_0$, $H_0$; (ii) $H_0$, CNOT$_{0\\to1}$, $Z_0$, $H_0$. Give the final probabilities of each by hand and check them. Then add one gate to (ii) that restores the result of (i), and explain why it works.',
              kind: 'simulation',
              difficulty: 2,
              hint: '(i) gives $|1\\rangle$ on qubit 0 with certainty; (ii) gives 50/50 on qubit 0 because qubit 1 holds a copy. A second CNOT$_{0\\to1}$ before the last $H$ uncomputes the copy.',
            },
          ],
          selfAssessment: [
            {
              question: 'Why can a quantum circuit not compute AND by overwriting an input?',
              answerOutline: 'Unitary gates are invertible; AND maps several inputs to the same output, so it must be computed into an ancilla (Toffoli) to keep the map reversible.',
            },
            {
              question: 'What is the standard oracle U_f?',
              answerOutline: 'U_f|x⟩|y⟩ = |x⟩|y ⊕ f(x)⟩, a permutation of basis states, unitary and self-inverse.',
            },
            {
              question: 'Why must garbage be uncomputed?',
              answerOutline: 'Garbage entangled with the input acts like a which-path record and destroys the interference that later steps rely on; running the circuit backwards after copying the answer returns ancillas to |0⟩.',
            },
          ],
          quiz: [
            {
              question: 'A Toffoli gate acts on $|1, 1, 1\\rangle$. What is the output?',
              options: ['$|1, 1, 0\\rangle$', '$|1, 1, 1\\rangle$', '$|0, 0, 1\\rangle$', '$|1, 0, 1\\rangle$'],
              answer: 0,
              explanation: 'Both controls are 1, so the target flips: $1\\oplus(1\\wedge1) = 0$. A Toffoli never changes its controls, which rules out the last two options.',
            },
            {
              question: 'Applying $H$, then CNOT$_{0\\to1}$ onto a fresh ancilla, then $H$ again to qubit 0 of $|00\\rangle$ gives what distribution for qubit 0?',
              options: ['Always 0', 'Always 1', '0 with probability 0.75', '50/50'],
              answer: 3,
              explanation: 'The CNOT makes $\\tfrac{1}{\\sqrt2}(|00\\rangle + |11\\rangle)$. The ancilla now records which branch qubit 0 is in, so the final $H$ cannot make the branches interfere: qubit 0 is 50/50. Without the copy, $HH|0\\rangle = |0\\rangle$.',
            },
            {
              question: 'Which map on $|x\\rangle|y\\rangle$ (with $x \\in \\{0,1\\}^2$, $y \\in \\{0,1\\}$) is unitary for $f(x) = x_0 \\oplus x_1$?',
              options: [
                '$|x\\rangle|y\\rangle \\to |x\\rangle|f(x)\\rangle$',
                '$|x\\rangle|y\\rangle \\to |x\\rangle|y\\oplus f(x)\\rangle$',
                '$|x\\rangle|y\\rangle \\to |f(x)\\rangle|y\\rangle$',
                '$|x\\rangle|y\\rangle \\to |x\\rangle|y \\wedge f(x)\\rangle$',
              ],
              answer: 1,
              explanation: 'XOR-ing into the target is a permutation of basis states. The other maps send distinct inputs to the same output (for example $|x\\rangle|0\\rangle$ and $|x\\rangle|1\\rangle$), so they cannot be unitary.',
            },
          ],
          relatedLessons: ['computer-architecture/boolean-logic-and-gates/boolean-algebra-and-nand', 'thermodynamics-statistical-mechanics/applications/information-maxwells-demon-and-landauer', 'theory-of-computation/beyond-np/a-glance-at-quantum-computation'],
        },
        {
          slug: 'universality-and-the-cost-of-simulation',
          title: 'Universal gate sets and the cost of classical simulation',
          summary:
            'Which gates suffice to build any computation (CNOT plus single-qubit gates; Clifford + T approximately), the Solovay-Kitaev theorem, the Gottesman-Knill exception, and why simulating n general qubits takes 2ⁿ amplitudes and time.',
          estimatedMinutes: 90,
          objectives: [
            'State what it means for a gate set to be universal, exactly and approximately',
            'Explain why {H, T, CNOT} is approximately universal and what Solovay-Kitaev guarantees',
            'Estimate the memory and time a state-vector simulation of n qubits needs',
            'State the Gottesman-Knill theorem and why Clifford circuits alone give no speed-up',
            'Explain the counting argument that most unitaries need exponentially many gates',
          ],
          concepts: [
            'Exact universality: CNOT + all single-qubit gates',
            'Approximate universality: Clifford + T',
            'Clifford group {H, S, CNOT}',
            'Solovay-Kitaev: O(log^c(1/ε)) gates',
            'Gottesman-Knill theorem',
            'State-vector simulation: 2ⁿ memory and time per gate',
            'Most unitaries need exponentially many gates',
          ],
          explanation: `A gate set is **universal** if circuits built from it can implement, or approximate to any accuracy, every unitary on any number of qubits.

**Exact universality.** CNOT together with *all* single-qubit unitaries is exactly universal (Barenco et al., 1995). Any $n$-qubit unitary decomposes into two-level rotations and then into these gates.

**Approximate universality.** Hardware offers a finite menu, and error correction (module 8) offers an even smaller one. The standard choice is **Clifford + T**: $\\{H, S, \\mathrm{CNOT}\\}$ plus $T = \\mathrm{diag}(1, e^{i\\pi/4})$. $H$ and $T$ generate rotations by an angle that is an irrational multiple of $\\pi$, so products of them come arbitrarily close to any single-qubit gate. The **Solovay-Kitaev theorem** says the approximation is efficient: accuracy $\\varepsilon$ needs only $O(\\log^c(1/\\varepsilon))$ gates with $c$ below 4, and modern synthesis needs about $3\\log_2(1/\\varepsilon)$ $T$ gates for a rotation. So the choice of finite gate set changes costs only by polylogarithmic factors.

**The Gottesman-Knill theorem.** Circuits of only Clifford gates, Pauli measurements and computational-basis inputs can be simulated efficiently on a classical computer, even though they create entanglement (Bell and GHZ states are Clifford states). Entanglement alone is therefore not sufficient for a speed-up; the non-Clifford $T$ gate is the "expensive" ingredient, which is why fault-tolerant cost estimates count $T$ gates.

**The cost of brute-force simulation.** A state vector of $n$ qubits holds $2^n$ complex numbers (16 bytes each in double precision): 30 qubits need $2^{30}\\cdot16 \\approx 17$ GB, 40 qubits about 18 TB, 50 qubits about 18 PB. Each gate touches every amplitude, so time grows as $2^n$ too. Around 50 qubits brute force stops; cleverer methods (tensor networks for shallow or weakly entangled circuits, slicing across many GPUs) push further for special circuits, which is why "quantum advantage" claims (module 9) keep being challenged.

**Most unitaries are hard.** A circuit of $G$ gates from a finite set can be described with $O(G\\log G)$ bits, while the $n$-qubit unitaries form a space of about $4^n$ real dimensions; covering it to fixed accuracy needs exponentially many distinct circuits, so almost all unitaries need exponentially many gates. Useful algorithms are the rare structured exceptions.

\`\`\`interactive
qc-circuit
{"qubits": 1, "circuit": ["H 0", "T 0", "H 0", "T 0", "H 0"], "palette": ["H", "T", "S", "TDG"], "title": "Building rotations from H and T", "caption": "Each H T pair is a rotation by an awkward angle about a tilted axis. Add more H and T gates and watch the amplitudes wander over values no single named gate gives; with enough of them you can approach any target state, which is what approximate universality means."}
\`\`\``,
          resources: [
            arxiv('quant-ph/0505030', 'Dawson and Nielsen, The Solovay-Kitaev algorithm (2005)', 'A readable account of the theorem and its constructive algorithm; read sections 1-3.'),
            ibm('fundamentals-of-quantum-algorithms', 'The lesson on quantum algorithmic foundations: gate sets, universality and cost models.', true),
            arxiv('1802.06952', 'Chen et al., 64-qubit quantum circuit simulation (2018)', 'An example of how classical simulation beyond 50 qubits works for special (low-depth) circuits by cutting them into pieces.'),
          ],
          exercises: [
            {
              slug: 'clifford-check',
              title: 'Cliffords map Paulis to Paulis',
              prompt:
                'A Clifford gate $C$ maps each Pauli to a Pauli under conjugation $P \\to CPC^\\dagger$. Compute $HXH^\\dagger$, $HZH^\\dagger$, $SXS^\\dagger$, $SZS^\\dagger$ and show that $TXT^\\dagger = (X + Y)/\\sqrt2$ is not a Pauli. For CNOT, compute the images of $X\\otimes I$, $I\\otimes X$, $Z\\otimes I$ and $I\\otimes Z$.',
              kind: 'derivation',
              difficulty: 2,
              hint: '$SXS^\\dagger = Y$. CNOT: $XI \\to XX$, $IX \\to IX$, $ZI \\to ZI$, $IZ \\to ZZ$.',
            },
            {
              slug: 'simulation-budget',
              title: 'A simulation budget',
              prompt:
                'A GPU holds 80 GB and performs about $10^{13}$ simple complex operations per second. (a) What is the largest state vector (in double precision) it can hold? (b) How long does one layer of gates on every qubit take for that size, counting about $4\\cdot2^n$ operations per single-qubit gate? (c) How many such GPUs are needed for 45 qubits?',
              kind: 'problem',
              difficulty: 2,
              hint: '(a) $2^{32}\\cdot16 \\approx 68.7$ GB fits, $2^{33}$ does not: 32 qubits. (b) $32\\cdot4\\cdot2^{32}/10^{13} \\approx 0.055$ s. (c) $2^{45}\\cdot16 \\approx 563$ TB, about 7000 GPUs.',
            },
            {
              slug: 'approximate-a-rotation',
              title: 'Approximate a rotation with H and T',
              prompt:
                'Using Quirk or a short numpy script, enumerate all products of up to 8 gates from $\\{H, T\\}$ and find the one whose action on $|0\\rangle$ is closest (largest fidelity $|\\langle\\psi|\\text{target}\\rangle|^2$) to $R_y(0.3)|0\\rangle$. Report the sequence and the fidelity, and comment on how the best fidelity improves as you allow longer sequences.',
              kind: 'coding',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'Name an exactly universal and an approximately universal gate set.',
              answerOutline: 'Exact: CNOT plus all single-qubit unitaries. Approximate: Clifford + T ({H, S, CNOT, T}), or simply {H, T, CNOT}.',
            },
            {
              question: 'What does the Gottesman-Knill theorem say, and what lesson does it teach?',
              answerOutline: 'Clifford circuits with stabiliser inputs and Pauli measurements are efficiently classically simulable; entanglement alone does not give a speed-up, non-Clifford gates (T) are needed.',
            },
            {
              question: 'Why does state-vector simulation become infeasible near 50 qubits?',
              answerOutline: 'Memory and time scale as 2ⁿ: 2⁵⁰ amplitudes × 16 bytes ≈ 18 PB, beyond any computer; special structure (low depth, low entanglement) is needed to go further.',
            },
          ],
          quiz: [
            {
              question: 'How much memory does a double-precision state vector of 36 qubits need?',
              options: ['About 1.1 TB', 'About 576 bytes', 'About 69 GB', 'About 18 PB'],
              answer: 0,
              explanation: '$2^{36}\\cdot16$ bytes $\\approx 6.9\\times10^{10}\\cdot16 \\approx 1.1\\times10^{12}$ bytes. 576 bytes is $36\\cdot16$, the cost of storing $n$ single-qubit states, which only works for product states; 69 GB is 32 qubits.',
            },
            {
              question: 'A circuit uses only $H$, $S$ and CNOT gates on 1000 qubits and creates lots of entanglement. What follows?',
              options: [
                'It cannot be simulated classically because of the entanglement',
                'It needs $2^{1000}$ amplitudes to simulate',
                'It is not a valid quantum circuit',
                'It can be simulated efficiently on a classical computer (Gottesman-Knill)',
              ],
              answer: 3,
              explanation: 'Clifford circuits can be tracked with stabilisers in polynomial time despite their entanglement. Adding non-Clifford gates such as $T$ is what can make simulation hard.',
            },
            {
              question: 'What does the Solovay-Kitaev theorem guarantee?',
              options: [
                'Any gate can be implemented exactly with $H$ and $T$',
                'Any single-qubit gate can be approximated to accuracy $\\varepsilon$ with a number of gates growing only polylogarithmically in $1/\\varepsilon$',
                'Simulating quantum circuits is polynomial-time',
                'Two-qubit gates are never needed',
              ],
              answer: 1,
              explanation: 'Finite gate sets cannot implement every rotation exactly, but the approximation costs only $O(\\log^c(1/\\varepsilon))$ gates, so switching gate sets changes costs mildly. Entangling gates such as CNOT are still required.',
            },
          ],
          relatedLessons: ['theory-of-computation/beyond-np/a-glance-at-quantum-computation', 'computational-physics/numerical-calculus-and-linear-algebra/numerical-linear-algebra'],
        },
      ],
      project: {
        slug: 'state-vector-simulator',
        title: 'A tiny state-vector simulator, checked against hand calculations',
        description: `Write a state-vector simulator for up to 10 qubits in about 100 lines of Python (numpy only), or, if you prefer not to program, do the hand-calculation half and use the circuit widget as the simulator. Requirements: apply any single-qubit gate to any qubit and controlled gates (CNOT, CZ, Toffoli) between any qubits without building $2^n\\times2^n$ matrices; sample measurement shots; measure a single qubit mid-circuit with collapse. Use this course's ordering (qubit 0 leftmost) and include a function that converts to Qiskit's order. Validate against five circuits computed by hand: a product state, the four Bell states, the GHZ state, three CNOTs as a SWAP, and compute-copy-uncompute with a Toffoli. Finally time your simulator for $n = 10$ to 24 and fit the $2^n$ growth.`,
        deliverables: [
          'Hand calculations of the five validation circuits, with all amplitudes',
          'The simulator (or, without programming, widget screenshots of each circuit) agreeing with them',
          'A timing plot against n with a fitted exponential and the extrapolated size at which your machine runs out of memory',
        ],
        estimatedHours: 4,
        stretchGoals: ['Add a stabiliser (CHP-style) simulator for Clifford circuits and show it handles 1000 qubits in a GHZ state', 'Compare with Qiskit Aer results on the same circuits, translating the bit order'],
      },
    },
    {
      slug: 'entanglement-as-a-resource',
      title: 'Entanglement as a Resource',
      description:
        'What entanglement lets you do and what it forbids: the no-cloning theorem, superdense coding, teleportation and entanglement swapping, Bell\'s theorem as the CHSH game (75 % classically, about 85.4 % quantumly), and BB84 quantum key distribution.',
      lessons: [
        {
          slug: 'no-cloning',
          title: 'The no-cloning theorem',
          summary:
            'No unitary can copy an unknown quantum state. The two-line proof, what can be copied (known or orthogonal states), why CNOT "copying" a superposition makes entanglement instead, and the consequences for computing and cryptography.',
          estimatedMinutes: 75,
          objectives: [
            'Prove the no-cloning theorem from linearity or from preservation of inner products',
            'Show that orthogonal states can be copied and explain why this is not a contradiction',
            'Compute what CNOT does when it tries to copy |+⟩',
            'Explain why no-cloning blocks faster-than-light signalling and underpins quantum key distribution',
          ],
          concepts: [
            'Cloning map |ψ⟩|0⟩ → |ψ⟩|ψ⟩',
            'Proof by inner products',
            'Proof by linearity',
            'Copying orthogonal (classical) states is possible',
            'CNOT on |+⟩|0⟩ gives a Bell state',
            'Approximate cloning (fidelity 5/6)',
            'Consequences: no amplitude readout, QKD',
          ],
          explanation: `Suppose a unitary $U$ could copy every state: $U|\\psi\\rangle|0\\rangle = |\\psi\\rangle|\\psi\\rangle$ for all $|\\psi\\rangle$. Take two states $|\\psi\\rangle$ and $|\\varphi\\rangle$. Unitaries preserve inner products, so
$$\\langle\\varphi|\\psi\\rangle\\langle 0|0\\rangle = \\langle\\varphi|\\psi\\rangle^2 \\quad\\Longrightarrow\\quad \\langle\\varphi|\\psi\\rangle \\in \\{0, 1\\}.$$
Any two copyable states are either identical or orthogonal. So no device copies two different non-orthogonal states, let alone all states. That is the **no-cloning theorem** (Wootters-Zurek and Dieks, 1982). Adding ancillas or measurements does not help: any physical process can be written as a larger unitary, and the argument still applies.

**A second proof by linearity.** If $U$ copies $|0\\rangle$ and $|1\\rangle$, then by linearity
$$U|{+}\\rangle|0\\rangle = \\tfrac{1}{\\sqrt2}(|00\\rangle + |11\\rangle),$$
but a clone would be $|{+}\\rangle|{+}\\rangle = \\tfrac12(|00\\rangle + |01\\rangle + |10\\rangle + |11\\rangle)$. These differ: the "copy" of a superposition is an *entangled* state, not two copies. CNOT is exactly this $U$. It copies the computational basis perfectly (that is fan-out, used in every classical subroutine) and fails on everything else.

\`\`\`interactive
qc-circuit
{"qubits": 2, "circuit": ["H 0", "CNOT 0 1"], "palette": ["H", "X", "CNOT"], "perQubit": true, "title": "CNOT copies basis states, not superpositions", "caption": "Remove the H and the CNOT copies |0⟩ or |1⟩ perfectly. With the H, the input is |+⟩ and the output is (|00⟩ + |11⟩)/√2, not |+⟩|+⟩ = ½(|00⟩ + |01⟩ + |10⟩ + |11⟩): two of the four amplitudes are missing, and each qubit's own Bloch vector has length 0 instead of pointing along +x."}
\`\`\`

**What it does not forbid.** You can copy a state you know (just prepare it twice) and any set of mutually orthogonal states. You can make imperfect copies: the optimal universal cloner (Bužek-Hillery, 1996) gives each copy fidelity $5/6$. You can *move* a state (teleportation, next lessons), destroying the original.

**Consequences.**
- You cannot learn the amplitudes of an unknown state from one copy; tomography needs many identical preparations.
- Entanglement cannot signal: if Bob could clone his half of a Bell pair, he could tell which basis Alice measured in by measuring many copies.
- An eavesdropper cannot copy quantum key bits without disturbing them, which is the root of BB84's security.
- Quantum error correction cannot work by keeping backup copies; it must spread information over entangled states (module 8).

Read de Wolf's short section and Watrous lesson 4.`,
          resources: [
            deWolf('Section on no-cloning in chapter 1 (two-line proof) and its use in chapter on quantum cryptography.', true),
            ibm('basics-of-quantum-information', 'Lesson 4, Entanglement in action, introduces no-cloning before teleportation.'),
            preskill('Chapter 4, section on the no-cloning theorem and its relation to no-signalling.'),
          ],
          exercises: [
            {
              slug: 'cloning-proof',
              title: 'Write the proof both ways',
              prompt:
                'Write out both proofs of the no-cloning theorem in full. Then show that a unitary copying the two states $|0\\rangle$ and $|+\\rangle$ cannot exist by computing $\\langle 0|+\\rangle$ and $\\langle 0|+\\rangle^2$.',
              kind: 'derivation',
              difficulty: 1,
              hint: '$\\langle 0|+\\rangle = 1/\\sqrt2$, but $\\langle 0|+\\rangle^2 = 1/2 \\ne 1/\\sqrt2$.',
            },
            {
              slug: 'cnot-copy-fidelity',
              title: 'How good is CNOT as a copier?',
              prompt:
                'Feed $\\cos\\tfrac\\theta2|0\\rangle + \\sin\\tfrac\\theta2|1\\rangle$ and an ancilla $|0\\rangle$ into CNOT. Compute the overlap $|\\langle\\psi\\psi|\\text{out}\\rangle|^2$ between the output and two true copies as a function of $\\theta$. Where is it 1, where is it smallest, and what is the smallest value?',
              kind: 'problem',
              difficulty: 2,
              hint: 'Output $c|00\\rangle + s|11\\rangle$; overlap $(c^3 + s^3)^2$ with $c = \\cos\\tfrac\\theta2$, $s = \\sin\\tfrac\\theta2$. It is 1 at the poles and $1/2$ at $\\theta = 90°$.',
            },
            {
              slug: 'cloning-signal',
              title: 'Cloning would allow signalling',
              prompt:
                'Alice and Bob share $|\\Phi^+\\rangle$. Alice measures in either the $Z$ or the $X$ basis to send one bit. Suppose Bob had a perfect cloner that makes 100 copies of his qubit. Describe how he would learn Alice\'s choice instantly, and compute the probability that he guesses wrong. Explain why this shows that no-cloning is required for consistency with relativity.',
              kind: 'writing',
              difficulty: 2,
              hint: 'After a $Z$ measurement his qubit is $|0\\rangle$ or $|1\\rangle$; after $X$ it is $|\\pm\\rangle$. Measuring 100 copies in $Z$ gives all-identical results only for the $Z$ case, except with probability $2\\cdot2^{-100}$ in the $X$ case.',
            },
          ],
          selfAssessment: [
            {
              question: 'Give the inner-product proof of no-cloning in one line.',
              answerOutline: 'Unitarity: ⟨φ|ψ⟩ = ⟨φ|ψ⟩², so ⟨φ|ψ⟩ is 0 or 1: only identical or orthogonal states can both be cloned.',
            },
            {
              question: 'Why does CNOT not contradict no-cloning?',
              answerOutline: 'It copies only the orthogonal basis states |0⟩ and |1⟩; on superpositions it produces an entangled state, not two copies.',
            },
            {
              question: 'Name two consequences of no-cloning.',
              answerOutline: 'No learning amplitudes from one copy; no signalling via entanglement; eavesdroppers on QKD are detectable; QEC cannot use backup copies.',
            },
          ],
          quiz: [
            {
              question: 'Which pair of states could be copied perfectly by a single (suitably designed) unitary?',
              options: ['$|+\\rangle$ and $|-\\rangle$', '$|0\\rangle$ and $|+\\rangle$', '$|+\\rangle$ and $|+i\\rangle$', '$|0\\rangle$ and $\\tfrac{1}{\\sqrt2}(|0\\rangle + i|1\\rangle)$'],
              answer: 0,
              explanation: '$|+\\rangle$ and $|-\\rangle$ are orthogonal, so a copier exists: $H$ on the first qubit, CNOT, then $H$ on both maps $|\\pm\\rangle|0\\rangle$ to $|\\pm\\rangle|\\pm\\rangle$. Every other pair has overlap magnitude $1/\\sqrt2$, neither 0 nor 1.',
            },
            {
              question: 'What does CNOT (control qubit 0) output on $\\tfrac{1}{2}|0\\rangle + \\tfrac{\\sqrt3}{2}|1\\rangle$ with ancilla $|0\\rangle$?',
              options: [
                '$(\\tfrac12|0\\rangle + \\tfrac{\\sqrt3}{2}|1\\rangle)^{\\otimes2}$',
                '$\\tfrac14|00\\rangle + \\tfrac34|11\\rangle$',
                '$\\tfrac12|00\\rangle + \\tfrac{\\sqrt3}{2}|11\\rangle$',
                '$\\tfrac12|00\\rangle + \\tfrac{\\sqrt3}{2}|10\\rangle$',
              ],
              answer: 2,
              explanation: 'Linearity: $|00\\rangle$ stays and $|10\\rangle$ becomes $|11\\rangle$, giving an entangled state. Two true copies would also contain $|01\\rangle$ and $|10\\rangle$ terms; the second option squares amplitudes and is not normalised.',
            },
            {
              question: 'Why does the no-cloning theorem matter for quantum error correction?',
              options: [
                'It does not; error correction copies each qubit three times',
                'It means errors cannot be detected at all',
                'It forbids measuring any qubit during a computation',
                'Information cannot be protected by keeping backup copies, so codes spread it over entangled states and measure only parities',
              ],
              answer: 3,
              explanation: 'The three-qubit code maps $\\alpha|0\\rangle + \\beta|1\\rangle$ to $\\alpha|000\\rangle + \\beta|111\\rangle$, an entangled state, not three copies of the qubit. Syndrome measurements reveal parities without revealing $\\alpha$ or $\\beta$.',
            },
          ],
          relatedLessons: ['quantum-mechanics/entanglement-measurement-and-information/qubits-gates-and-quantum-circuits'],
        },
        {
          slug: 'superdense-coding',
          title: 'Superdense coding',
          summary:
            'Sending two classical bits by transmitting one qubit, using a shared Bell pair: the four encoding gates, Bob\'s Bell-basis decoding circuit, and why this does not beat Holevo\'s bound of one bit per qubit.',
          estimatedMinutes: 75,
          objectives: [
            'Show that I, X, Z and ZX on one half of |Φ+⟩ produce the four Bell states',
            'Decode a Bell state with CNOT then H and trace a full run by hand',
            'Explain the resource count: one qubit sent plus one ebit shared gives two bits',
            'State Holevo\'s bound and explain why superdense coding is consistent with it',
          ],
          concepts: [
            'Ebit (shared Bell pair)',
            'Encoding with I, X, Z, ZX',
            'Bell-basis measurement = CNOT, H, measure',
            'Two bits per transmitted qubit',
            'Holevo bound: n qubits carry at most n bits',
            'Resource accounting',
          ],
          explanation: `Alice and Bob share $|\\Phi^+\\rangle = \\tfrac{1}{\\sqrt2}(|00\\rangle + |11\\rangle)$, Alice holding qubit 0 and Bob qubit 1. Alice wants to send two bits $b_1b_2$.

**Encoding.** Alice applies $X^{b_2}$ and then $Z^{b_1}$ to her qubit only, and sends it to Bob:
- 00: $I$ gives $|\\Phi^+\\rangle$;
- 01: $X$ gives $\\tfrac{1}{\\sqrt2}(|10\\rangle + |01\\rangle) = |\\Psi^+\\rangle$;
- 10: $Z$ gives $\\tfrac{1}{\\sqrt2}(|00\\rangle - |11\\rangle) = |\\Phi^-\\rangle$;
- 11: $X$ then $Z$ gives $\\tfrac{1}{\\sqrt2}(|01\\rangle - |10\\rangle) = |\\Psi^-\\rangle$.

A local operation on one qubit has moved the pair to any of four orthogonal states.

**Decoding.** Bob now holds both qubits and runs the Bell circuit backwards: CNOT$_{0\\to1}$, then $H$ on qubit 0, then measures both. Trace message 11: $|\\Psi^-\\rangle = \\tfrac{1}{\\sqrt2}(|01\\rangle - |10\\rangle)$; CNOT gives $\\tfrac{1}{\\sqrt2}(|01\\rangle - |11\\rangle) = |-\\rangle|1\\rangle$; $H$ gives $|1\\rangle|1\\rangle$. He reads 11 with certainty. Each of the four messages lands on its own basis string.

\`\`\`interactive
qc-circuit
{"preset": "superdense", "palette": ["X", "Z", "H", "CNOT"], "title": "Superdense coding of the message 11", "caption": "Columns 1-2 make the Bell pair, Alice's X and Z encode 11 on qubit 0, and Bob's CNOT and H decode. Step through and match each column with the hand trace. Remove Alice's Z to send 01, or her X to send 10, and check Bob's readout each time."}
\`\`\`

**Is this two bits per qubit?** Two qubits were sent in total: one earlier (to share the pair, possibly long before the message existed) and one now. The pre-shared **ebit** is a resource that is used up. **Holevo's theorem** (1973) says $n$ qubits sent without prior entanglement can convey at most $n$ classical bits, however they are encoded and measured, so a single qubit alone never carries two bits. Superdense coding shows that one ebit plus one qubit is worth two bits. Teleportation, next, is its mirror image: one ebit plus two bits is worth one qubit.

The common mistake is to say Alice "sends two bits faster" or "compresses information into a qubit". Nothing reaches Bob until the qubit does, and without the shared pair Bob could extract at most one bit from it.

Watrous lesson 4 treats superdense coding and teleportation together; Nielsen and Chuang section 2.3 is the classic one-page account.`,
          resources: [
            ibm('basics-of-quantum-information', 'Lesson 4, Entanglement in action: superdense coding with the circuit and its Qiskit implementation.', true),
            deWolf('Chapter 1 exercises and the section on superdense coding, with Holevo\'s bound stated.'),
            composer('Build the superdense-coding circuit for all four messages and run it on a real device; compare the success rate with 1.'),
          ],
          exercises: [
            {
              slug: 'all-four-messages',
              title: 'Trace all four messages',
              prompt:
                'Trace Bob\'s decoding (CNOT$_{0\\to1}$, then $H$ on qubit 0) for each of the four Bell states, writing the state after each gate. Confirm that 00, 01, 10, 11 are decoded correctly. Then say what Bob reads if Alice applies $Y = iXZ$ instead of $ZX$, and why.',
              kind: 'problem',
              difficulty: 1,
              hint: '$Y$ on qubit 0 gives $i|\\Psi^-\\rangle$ up to sign: the same Bell state with a global phase, so Bob reads 11.',
            },
            {
              slug: 'noisy-superdense',
              title: 'Superdense coding on noisy hardware',
              prompt:
                'Run all four messages on a simulator and, if you can, on a free IBM Quantum device (1000 shots each). Report the 4 × 4 table of sent message versus decoded string. Compute the average success probability. If each two-qubit gate fails with probability about 1%, roughly what success rate would you expect, and what other errors (readout, idle) might explain the rest?',
              kind: 'simulation',
              difficulty: 2,
            },
            {
              slug: 'holevo-reasoning',
              title: 'Why one qubit cannot carry two bits alone',
              prompt:
                'Alice sends Bob a single qubit (no shared entanglement) chosen from four states, hoping to send two bits. Using the fact that at most two states of a qubit can be mutually orthogonal, argue that Bob cannot distinguish four states perfectly. Then compute the best success probability for the four states $|0\\rangle, |1\\rangle, |+\\rangle, |-\\rangle$ if Bob measures in $Z$.',
              kind: 'writing',
              difficulty: 2,
              hint: 'Measuring $Z$, he identifies $|0\\rangle$ or $|1\\rangle$ correctly and guesses $|\\pm\\rangle$ wrongly: about 1/2 overall with the best guessing rule (one bit of information).',
            },
          ],
          selfAssessment: [
            {
              question: 'Which gates encode the four messages, and which Bell states result?',
              answerOutline: 'I → Φ+, X → Ψ+, Z → Φ−, ZX → Ψ− (applied to Alice\'s qubit).',
            },
            {
              question: 'How does Bob decode?',
              answerOutline: 'CNOT from qubit 0 to qubit 1, then H on qubit 0, then measure both: each Bell state maps to a distinct basis string.',
            },
            {
              question: 'Why does superdense coding not violate Holevo\'s bound?',
              answerOutline: 'Two qubits are transmitted in total (one beforehand as half of the shared ebit); without prior entanglement one qubit carries at most one bit.',
            },
          ],
          quiz: [
            {
              question: 'Alice applies $Z$ to her half of $|\\Phi^+\\rangle$ and sends it. What does Bob\'s decoding circuit output?',
              options: ['$|10\\rangle$', '$|01\\rangle$', '$|11\\rangle$', '$|00\\rangle$'],
              answer: 0,
              explanation: '$Z$ gives $|\\Phi^-\\rangle = \\tfrac{1}{\\sqrt2}(|00\\rangle - |11\\rangle)$; CNOT makes $\\tfrac{1}{\\sqrt2}(|00\\rangle - |10\\rangle) = |-\\rangle|0\\rangle$; $H$ gives $|10\\rangle$. Reading 01 confuses which bit $Z$ encodes.',
            },
            {
              question: 'What resources does superdense coding consume to send two bits?',
              options: ['One qubit and nothing else', 'Two classical bits', 'One shared Bell pair and one transmitted qubit', 'Two Bell pairs'],
              answer: 2,
              explanation: 'One ebit, shared in advance, plus one qubit sent now. Without the ebit, Holevo\'s bound limits one qubit to one bit.',
            },
            {
              question: 'Bob receives Alice\'s qubit but measures each of his two qubits in the $Z$ basis directly, skipping CNOT and $H$. How many of the four messages can he identify with certainty?',
              options: ['All four', 'None', 'One', 'None with certainty, but he learns whether Alice applied $X$'],
              answer: 3,
              explanation: 'In the $Z$ basis $\\Phi^\\pm$ give equal bits and $\\Psi^\\pm$ give opposite bits, so he learns $b_2$ (whether $X$ was applied) but nothing about the sign, $b_1$. No single message is identified with certainty; decoding needs a Bell-basis measurement.',
            },
          ],
          relatedLessons: ['quantum-mechanics/entanglement-measurement-and-information/qubits-gates-and-quantum-circuits'],
        },
        {
          slug: 'teleportation-and-entanglement-swapping',
          title: 'Teleportation and entanglement swapping',
          summary:
            'Moving an unknown qubit with one Bell pair and two classical bits: the full state-vector derivation, the table of corrections, why it is not faster than light and does not clone, and entanglement swapping, the basis of quantum repeaters.',
          estimatedMinutes: 110,
          objectives: [
            'Derive teleportation by expanding the three-qubit state after Alice\'s CNOT and H',
            'Give Bob\'s correction X^{m1} then Z^{m0} for each outcome pair',
            'Explain why teleportation needs a classical channel and destroys the original',
            'Replace measurement and classical control by controlled gates (deferred measurement)',
            'Show that a Bell measurement on the middle qubits of two Bell pairs entangles the outer ones',
          ],
          concepts: [
            'Teleportation: 1 ebit + 2 bits = 1 qubit',
            'Alice\'s Bell measurement (CNOT, H, measure)',
            'Corrections X^{m1} Z^{m0}',
            'No faster-than-light signalling',
            'Original destroyed (consistent with no-cloning)',
            'Deferred measurement principle',
            'Entanglement swapping',
            'Quantum repeaters',
          ],
          explanation: `Alice holds an unknown qubit $|\\psi\\rangle = \\alpha|0\\rangle + \\beta|1\\rangle$ (qubit 0) and half of $|\\Phi^+\\rangle$ (qubit 1); Bob holds qubit 2. The start state is
$$|\\psi\\rangle|\\Phi^+\\rangle = \\tfrac{1}{\\sqrt2}\\big[\\alpha|0\\rangle(|00\\rangle + |11\\rangle) + \\beta|1\\rangle(|00\\rangle + |11\\rangle)\\big].$$
Alice applies CNOT$_{0\\to1}$ (the $\\beta$ terms flip qubit 1) and then $H$ to qubit 0. Collecting terms by Alice's two qubits gives
$$\\tfrac12\\big[|00\\rangle(\\alpha|0\\rangle + \\beta|1\\rangle) + |01\\rangle(\\alpha|1\\rangle + \\beta|0\\rangle) + |10\\rangle(\\alpha|0\\rangle - \\beta|1\\rangle) + |11\\rangle(\\alpha|1\\rangle - \\beta|0\\rangle)\\big].$$
Nothing has touched Bob's qubit, yet in each term it holds $|\\psi\\rangle$ up to a Pauli: $X^{m_1}Z^{m_0}|\\psi\\rangle$ for outcome $m_0m_1$. Alice measures (each outcome has probability 1/4, independent of $\\alpha, \\beta$), phones Bob the two bits, and he applies $X^{m_1}$ and then $Z^{m_0}$. For outcome 11 he holds $\\alpha|1\\rangle - \\beta|0\\rangle$; $X$ gives $\\alpha|0\\rangle - \\beta|1\\rangle$ and $Z$ gives $\\alpha|0\\rangle + \\beta|1\\rangle$.

\`\`\`interactive
qc-circuit
{"preset": "teleport-measure", "perQubit": true, "presets": ["teleport", "teleport-measure"], "title": "Teleporting RY(1.2)|0⟩", "caption": "The first gate makes the state to send (Bloch vector (sin 1.2, 0, cos 1.2) = (0.932, 0, 0.362)). Choose each of the four outcome pairs for Alice's measurements: every branch has probability 0.25, and after the corrections q2's Bloch vector is the original one. The corrections appear as CNOT and CZ from the measured qubits, the deferred-measurement form; the teleport preset drops the measurements altogether and gives the same q2."}
\`\`\`

**What it does not do.** It is not faster than light: before the two bits arrive, Bob's qubit is equally likely to be any of the four Pauli-rotated versions, which averages to a completely random state. It does not clone: Alice's measurement leaves her qubits in $|m_0m_1\\rangle$, with no trace of $\\alpha, \\beta$. It moves no matter, only the state. The accounting mirrors superdense coding: 1 ebit + 2 bits = 1 qubit.

**Deferred measurement.** Measuring and then applying a gate conditioned on the result is equivalent to applying the corresponding *controlled* gate and measuring at the end. The widget uses CNOT$_{1\\to2}$ and CZ$_{0\\to2}$ this way.

**Entanglement swapping.** Take two Bell pairs, (1, 2) and (3, 4). A Bell measurement on qubits 2 and 3 leaves qubits 1 and 4, which never interacted, in a Bell state (which one depends on the outcome, and two bits fix it). Chains of short links joined by swapping are how **quantum repeaters** aim to spread entanglement over long distances despite fibre loss.

Watrous lesson 4 derives teleportation in the same way.`,
          resources: [
            ibm('basics-of-quantum-information', 'Lesson 4, Entanglement in action: teleportation derived and run in Qiskit.', true),
            pldemo('tutorial_teleportation', 'Quantum teleportation', 'A step-by-step PennyLane implementation with mid-circuit measurements and the deferred version.'),
            deWolf('Chapter 1, teleportation, and the exercise on entanglement swapping.'),
          ],
          exercises: [
            {
              slug: 'derive-teleportation',
              title: 'Derive the four branches',
              prompt:
                'Starting from $|\\psi\\rangle|\\Phi^+\\rangle$, apply CNOT$_{0\\to1}$ and $H_0$ explicitly, writing all eight amplitudes after each step. Regroup into the four branches and verify the correction table. Then check the outcome $m_0m_1 = 10$ numerically for $|\\psi\\rangle = 0.6|0\\rangle + 0.8i|1\\rangle$.',
              kind: 'derivation',
              difficulty: 2,
              hint: 'For 10 Bob holds $\\alpha|0\\rangle - \\beta|1\\rangle = 0.6|0\\rangle - 0.8i|1\\rangle$; $Z$ restores $0.6|0\\rangle + 0.8i|1\\rangle$.',
            },
            {
              slug: 'bob-before-the-call',
              title: 'Bob before the phone call',
              prompt:
                'Before Alice\'s bits arrive, Bob\'s qubit is $|\\psi\\rangle$, $X|\\psi\\rangle$, $Z|\\psi\\rangle$ or $XZ|\\psi\\rangle$ with probability 1/4 each. Show that his Bloch vector averaged over these four cases is $(0, 0, 0)$ for any $|\\psi\\rangle$, so he can learn nothing. (Use how each Pauli acts on the Bloch vector: $X$ flips $y$ and $z$, and so on.)',
              kind: 'derivation',
              difficulty: 2,
              hint: '$X$: $(x, -y, -z)$; $Z$: $(-x, -y, z)$; $XZ$: $(-x, y, -z)$. The four vectors sum to zero.',
            },
            {
              slug: 'swapping-calculation',
              title: 'Entanglement swapping by hand',
              prompt:
                'Qubits 1-2 and 3-4 are each in $|\\Phi^+\\rangle$. Using $|\\Phi^+\\rangle_{12}|\\Phi^+\\rangle_{34} = \\tfrac12\\sum$ over Bell states $|B\\rangle_{23}|B\'\\rangle_{14}$, find which state qubits 1 and 4 are left in for each outcome of a Bell measurement on 2 and 3. Then simulate it with the circuit widget (4 qubits: make both pairs, then CNOT 1 2, H 1, measure 1 and 2) and check the outer pair with the per-qubit display.',
              kind: 'simulation',
              difficulty: 3,
              hint: 'The identity is $|\\Phi^+\\rangle|\\Phi^+\\rangle = \\tfrac12(|\\Phi^+\\Phi^+\\rangle + |\\Phi^-\\Phi^-\\rangle + |\\Psi^+\\Psi^+\\rangle + |\\Psi^-\\Psi^-\\rangle)$ with the pairs reordered as (23)(14): outcome $B$ on 2-3 leaves the same $B$ on 1-4.',
            },
          ],
          selfAssessment: [
            {
              question: 'State the teleportation correction rule.',
              answerOutline: 'For Alice\'s outcome m0 m1 (from the qubit-0 H and the qubit-1 measurement), Bob applies X^{m1} then Z^{m0}.',
            },
            {
              question: 'Why is teleportation not faster than light?',
              answerOutline: 'Without the two classical bits Bob\'s qubit is maximally mixed (average of the four Pauli-rotated states); the bits travel at most at light speed.',
            },
            {
              question: 'What is entanglement swapping used for?',
              answerOutline: 'Entangling qubits that never interacted by a Bell measurement on their partners; chaining short links into long-distance entanglement in quantum repeaters.',
            },
          ],
          quiz: [
            {
              question: 'In teleportation, Alice obtains $m_0m_1 = 01$. Before any correction, which state does Bob hold (for $|\\psi\\rangle = \\alpha|0\\rangle + \\beta|1\\rangle$)?',
              options: ['$\\alpha|0\\rangle - \\beta|1\\rangle$', '$\\alpha|1\\rangle + \\beta|0\\rangle$', '$\\alpha|1\\rangle - \\beta|0\\rangle$', '$\\alpha|0\\rangle + \\beta|1\\rangle$'],
              answer: 1,
              explanation: 'Outcome 01 means $m_1 = 1$: Bob holds $X|\\psi\\rangle = \\alpha|1\\rangle + \\beta|0\\rangle$ and fixes it with $X$. The sign flip belongs to $m_0 = 1$ (outcomes 10 and 11).',
            },
            {
              question: 'Which statement about teleportation is true?',
              options: [
                'Bob has $|\\psi\\rangle$ the instant Alice measures',
                'Alice keeps a copy of $|\\psi\\rangle$',
                'It needs no entanglement if Alice sends two bits',
                'Alice\'s qubit is left in a basis state carrying no information about $\\alpha$ and $\\beta$, so no copy exists',
              ],
              answer: 3,
              explanation: 'After measuring, Alice holds $|m_0m_1\\rangle$, and each outcome is equally likely whatever $\\alpha$, $\\beta$ are. Bob only has $|\\psi\\rangle$ after the classical bits arrive and he corrects. Without the shared pair, two bits cannot carry a qubit\'s continuous amplitudes.',
            },
            {
              question: 'By the deferred measurement principle, "measure qubit 1 and apply $X$ to qubit 2 if the result is 1" can be replaced by which gate before a final measurement?',
              options: ['CNOT with control qubit 1 and target qubit 2', 'CZ between qubits 1 and 2', 'SWAP of qubits 1 and 2', 'An $X$ on qubit 2 always'],
              answer: 0,
              explanation: 'A classically controlled $X$ becomes a quantum-controlled $X$ (CNOT) from the same qubit; similarly the classically controlled $Z$ becomes a CZ. Measuring qubit 1 afterwards gives the same statistics.',
            },
            {
              question: 'Qubits 1-2 and 3-4 are each in $|\\Phi^+\\rangle$. A Bell measurement on qubits 2 and 3 gives $|\\Psi^-\\rangle$. What state are qubits 1 and 4 in?',
              options: ['$|\\Phi^+\\rangle$', '$|00\\rangle$', '$|\\Psi^-\\rangle$', 'A product state, because 1 and 4 never interacted'],
              answer: 2,
              explanation: 'Expanding $|\\Phi^+\\rangle_{12}|\\Phi^+\\rangle_{34}$ in Bell states of (2, 3) and (1, 4) gives $\\tfrac12\\sum_B|B\\rangle_{23}|B\\rangle_{14}$, so outcome $\\Psi^-$ leaves $\\Psi^-$ on 1-4. Never having interacted does not prevent entanglement: that is the point of swapping.',
            },
          ],
          relatedLessons: ['quantum-mechanics/entanglement-measurement-and-information/qubits-gates-and-quantum-circuits'],
        },
        {
          slug: 'bells-theorem-and-the-chsh-game',
          title: 'Bell\'s theorem and the CHSH game',
          summary:
            'Bell\'s theorem as a game: no classical strategy wins the CHSH game more than 75 % of the time, a shared Bell pair wins cos²(π/8) ≈ 85.4 %, the CHSH value S with bounds 2 and 2√2, and the loophole-free experiments of 2015.',
          estimatedMinutes: 110,
          objectives: [
            'State the CHSH game and prove that classical strategies win at most 3/4',
            'Compute the quantum strategy\'s win probability with measurement angles 0, π/4 and ±π/8',
            'Relate the win probability to the CHSH correlator S: P(win) = 1/2 + S/8',
            'Explain what Bell\'s theorem rules out (local hidden variables) and what it does not (signalling)',
            'Describe the main loopholes and the 2015 loophole-free tests',
          ],
          concepts: [
            'CHSH game: win iff a ⊕ b = x ∧ y',
            'Classical bound 3/4 (S ≤ 2)',
            'Quantum strategy on |Φ+⟩',
            'P(same) = cos²(θ_A − θ_B)',
            'Correlator E = cos 2(θ_A − θ_B)',
            'Tsirelson bound S ≤ 2√2',
            'Local hidden variables',
            'Locality and detection loopholes',
          ],
          explanation: `**The game.** A referee sends Alice a random bit $x$ and Bob a random bit $y$. Without communicating, they reply with bits $a$ and $b$. They win if $a\\oplus b = x\\wedge y$: their answers must agree unless both questions are 1, when they must differ.

**Classically at most 3/4.** A deterministic strategy is four bits $a(0), a(1), b(0), b(1)$. Winning all four question pairs would need $a(0)\\oplus b(0) = 0$, $a(0)\\oplus b(1) = 0$, $a(1)\\oplus b(0) = 0$ and $a(1)\\oplus b(1) = 1$. XOR the four equations: the left side is 0 (each answer appears twice) and the right side is 1. So at least one pair is lost, giving at most 3/4 ("always answer 0" achieves it). Shared randomness is a mixture of deterministic strategies and cannot do better.

**Quantumly about 0.854.** They share $|\\Phi^+\\rangle$. Each measures in a rotated real basis $\\{\\cos\\theta|0\\rangle + \\sin\\theta|1\\rangle,\\ -\\sin\\theta|0\\rangle + \\cos\\theta|1\\rangle\\}$, outcome 0 for the first vector. For $|\\Phi^+\\rangle$, $P(a = b) = \\cos^2(\\theta_A - \\theta_B)$. Choose $\\theta_A = 0$ for $x = 0$, $\\pi/4$ for $x = 1$; $\\theta_B = \\pi/8$ for $y = 0$, $-\\pi/8$ for $y = 1$. The three "agree" pairs have angle difference $\\pi/8$, so they win with probability $\\cos^2(\\pi/8)$. The "differ" pair (1, 1) has difference $3\\pi/8$, and $P(a\\ne b) = \\sin^2(3\\pi/8) = \\cos^2(\\pi/8)$. Overall $P(\\text{win}) = \\cos^2(\\pi/8) \\approx 0.8536$.

**The CHSH value.** With correlators $E(x, y) = P(a = b) - P(a\\ne b) = \\cos 2(\\theta_A - \\theta_B)$, define $S = E(0,0) + E(0,1) + E(1,0) - E(1,1)$. Then $P(\\text{win}) = \\tfrac12 + S/8$. Local hidden variables give $|S| \\le 2$; quantum mechanics reaches $2\\sqrt2 \\approx 2.83$ (**Tsirelson's bound**) and no further.

\`\`\`interactive
qc-chsh
{"title": "The CHSH game", "caption": "The default angles are 0° and 45° for Alice, 22.5° and −22.5° for Bob: S = 2.83 and the win rate is 0.854. Drag the directions and watch S fall; the classical panel never beats 0.75. Lower the visibility v (noise): the violation disappears below v ≈ 0.707. Play 1000 rounds and compare the measured win rate with its error bar."}
\`\`\`

**What it means.** No theory in which outcomes are fixed in advance by shared local variables can reproduce these statistics (**Bell's theorem**, 1964). It does not allow signalling: each player's own outcomes are 50/50 whatever the other does. Early tests (Aspect, 1982) left loopholes: detectors missed photons, or the settings were chosen too slowly to exclude communication. In 2015 three experiments closed both at once (Hensen et al. in Delft, then Vienna and NIST); the 2022 Nobel Prize went to Aspect, Clauser and Zeilinger.

The CS 498QC treatment follows de Wolf's chapter on non-locality.`,
          resources: [
            deWolf('The chapter on quantum communication and non-locality: the CHSH game, the classical bound and the quantum strategy.', true),
            free('Qiskit tutorial: CHSH inequality', 'https://quantum.cloud.ibm.com/docs/tutorials/chsh-inequality', 'interactive', 'IBM Quantum', 'Runs the CHSH experiment on IBM hardware with an angle sweep; the basis for this module\'s project.'),
            arxiv('1508.05949', 'Hensen et al., Experimental loophole-free violation of a Bell inequality using entangled electron spins separated by 1.3 km (2015)', 'The first loophole-free Bell test; read the abstract, figure 1 and the result S = 2.42 ± 0.20.'),
            ibm('basics-of-quantum-information', 'Lesson 4, Entanglement in action, ends with the CHSH game.'),
          ],
          exercises: [
            {
              slug: 'classical-strategies',
              title: 'All 16 deterministic strategies',
              prompt:
                'List the 16 deterministic strategies $(a(0), a(1), b(0), b(1))$ and the win probability of each (with uniformly random questions). Show that eight achieve 3/4 and none more. Then show that a strategy using shared random bits is an average of these, so it cannot exceed 3/4.',
              kind: 'problem',
              difficulty: 1,
              hint: 'Each strategy wins either 3 or 1 of the 4 question pairs, i.e. 3/4 or 1/4.',
            },
            {
              slug: 'quantum-strategy-calc',
              title: 'Compute the quantum strategy',
              prompt:
                'Prove $P(a = b) = \\cos^2(\\theta_A - \\theta_B)$ for $|\\Phi^+\\rangle$ with the real rotated bases (expand $|\\Phi^+\\rangle$ in Alice\'s basis first). Compute $E(x, y)$ for the four pairs with the optimal angles, then $S$ and $P(\\text{win})$. Finally evaluate $S$ for $\\theta_A = (0, \\pi/4)$, $\\theta_B = (\\pi/8, 3\\pi/8)$ and explain the result.',
              kind: 'derivation',
              difficulty: 2,
              hint: 'Optimal: $E = 0.7071, 0.7071, 0.7071, -0.7071$, $S = 2\\sqrt2$. With $\\theta_B(1) = 3\\pi/8$: $E(0,1) = \\cos(-3\\pi/4) = -0.707$, $E(1,1) = \\cos(-\\pi/4) = 0.707$, so $S = 0.707 - 0.707 + 0.707 - 0.707 = 0$.',
            },
            {
              slug: 'chsh-noise-threshold',
              title: 'How much noise kills the violation?',
              prompt:
                'If the shared state is the Werner state, $|\\Phi^+\\rangle$ with probability $v$ and fully random with probability $1 - v$, every correlator is multiplied by $v$. Find the smallest $v$ for which $S > 2$, and the win probability at $v = 0.9$. A hardware run gives win rate 0.80 from 4000 rounds: compute its standard error and decide whether it beats the classical 0.75.',
              kind: 'problem',
              difficulty: 2,
              hint: '$v > 1/\\sqrt2 \\approx 0.707$. At $v = 0.9$: $S = 2.546$, win $= 0.818$. Standard error $\\sqrt{0.8\\cdot0.2/4000} \\approx 0.0063$, so 0.80 is about 8 standard errors above 0.75.',
            },
          ],
          selfAssessment: [
            {
              question: 'Prove that classical strategies win the CHSH game at most 3/4 of the time.',
              answerOutline: 'XOR of the four winning conditions gives 0 = 1, so a deterministic strategy loses at least one of four question pairs; randomised strategies are mixtures of deterministic ones.',
            },
            {
              question: 'Give the optimal quantum angles and win probability.',
              answerOutline: 'Alice 0 and π/4, Bob π/8 and −π/8 (real basis rotation angles) on |Φ+⟩; win probability cos²(π/8) ≈ 0.854, S = 2√2.',
            },
            {
              question: 'What does a Bell violation rule out?',
              answerOutline: 'Local hidden-variable theories (outcomes predetermined by shared local information). It does not permit signalling.',
            },
          ],
          quiz: [
            {
              question: 'Alice measures at $\\theta_A = 0$ and Bob at $\\theta_B = \\pi/6$ on $|\\Phi^+\\rangle$. What is the probability their outcomes agree?',
              options: ['0.75', '0.5', '0.933', '0.25'],
              answer: 0,
              explanation: '$P(a = b) = \\cos^2(\\pi/6) = 0.75$. 0.933 is $\\cos^2(\\pi/12)$, which would come from using the Bloch-sphere angle (half the difference); 0.25 is the probability that they differ.',
            },
            {
              question: 'A CHSH experiment measures $E(0,0) = 0.62$, $E(0,1) = 0.60$, $E(1,0) = 0.64$, $E(1,1) = -0.58$. What is $S$, and does it violate the classical bound?',
              options: ['$S = 1.28$; no', '$S = 2.44$; yes', '$S = 1.86$; no', '$S = 2.83$; yes'],
              answer: 1,
              explanation: '$S = 0.62 + 0.60 + 0.64 - (-0.58) = 2.44 > 2$. Adding $E(1,1)$ instead of subtracting it gives 1.28. The win probability would be $\\tfrac12 + 2.44/8 = 0.805$.',
            },
            {
              question: 'Which statement about the CHSH game is correct?',
              options: [
                'With shared randomness, classical players can reach 0.854',
                'Quantum players can win with probability 1 using a better state',
                'Bob can use the entanglement to learn Alice\'s question',
                'No quantum strategy exceeds $\\cos^2(\\pi/8)$, and no classical one exceeds 3/4',
              ],
              answer: 3,
              explanation: 'Tsirelson\'s bound caps quantum strategies at $S = 2\\sqrt2$, i.e. win $= \\cos^2(\\pi/8)$; classical strategies, randomised or not, are capped at 3/4. Each player\'s outcomes are independent of the other\'s question, so nothing is signalled.',
            },
            {
              question: 'What distinguishes "entangled" from "classically correlated" in a Bell test?',
              options: [
                'Classically correlated outcomes can be perfectly correlated in one fixed basis, but cannot reach $S > 2$; entangled states can',
                'Only entangled states give correlated outcomes at all',
                'Classically correlated states always give $S = 0$',
                'There is no measurable difference',
              ],
              answer: 0,
              explanation: 'A box emitting 00 or 11 at random is perfectly correlated in $Z$ and still obeys $|S| \\le 2$ for every choice of angles. Only entanglement can violate the bound, which is why a Bell test certifies entanglement.',
            },
          ],
          relatedLessons: ['quantum-mechanics/entanglement-measurement-and-information/entanglement-epr-and-bells-theorem'],
        },
        {
          slug: 'bb84-key-distribution',
          title: 'BB84 quantum key distribution',
          summary:
            'Bennett and Brassard\'s 1984 protocol: random bits in random bases, sifting, error estimation, and why an intercept-resend eavesdropper causes a 25 % error rate; the security idea, the role of error correction and privacy amplification, and what QKD can and cannot do in practice.',
          estimatedMinutes: 90,
          objectives: [
            'Run the BB84 protocol by hand: preparation, sifting, error estimation',
            'Show that an intercept-resend attack produces a 25 % error rate on the sifted key',
            'Explain how disturbance is tied to information gain and why that gives security',
            'Describe error correction and privacy amplification and the role of an authenticated classical channel',
            'Compare QKD with post-quantum cryptography as a response to quantum attacks',
          ],
          concepts: [
            'Four BB84 states in two bases',
            'Sifting (keep matching bases)',
            'Quantum bit error rate (QBER)',
            'Intercept-resend gives 25 % QBER',
            'Information-disturbance trade-off',
            'Error correction and privacy amplification',
            'Authenticated classical channel',
            'QKD versus post-quantum cryptography',
          ],
          explanation: `**The protocol.** Alice picks a random bit and a random basis for each photon: in the $Z$ basis 0 is $|0\\rangle$ and 1 is $|1\\rangle$; in the $X$ basis 0 is $|+\\rangle$ and 1 is $|-\\rangle$. Bob measures each photon in a random basis of his own. Over a public channel they announce bases (not bits) and keep only the positions where the bases match, about half: the **sifted key**. With no noise and no eavesdropper the sifted bits agree exactly.

**Catching Eve.** Suppose Eve measures every photon in a random basis and resends what she saw. Look at a sifted position. Half the time Eve guessed Alice's basis: she learns the bit and resends the right state, causing no error. Half the time she guessed wrong: her result is random, she resends a state of the wrong basis, and Bob, measuring in Alice's basis, gets a random bit, wrong with probability 1/2. So the error rate is $\\tfrac12\\cdot\\tfrac12 = 25\\%$. Alice and Bob sacrifice a random sample of sifted bits to estimate the **QBER**; if Eve attacks a fraction $f$ of photons, it rises by $f/4$.

**Why it works in general.** Measuring a qubit in a basis it was not prepared in disturbs it, and no-cloning forbids Eve from keeping a copy to measure later. Any information she gains about the key is paid for in errors that Alice and Bob can see. Rigorous proofs (Shor and Preskill, 2000, and later work) show that with one-way post-processing BB84 is secure when the QBER is below about **11 %**.

**Finishing the key.** The surviving bits still contain some errors and some leaked information. **Error correction** (a public parity exchange) removes the errors, and **privacy amplification** (hashing to a shorter string) squeezes out Eve's partial knowledge. The public channel must be **authenticated**, or Eve simply impersonates Bob; that needs a short pre-shared secret, so QKD expands keys rather than creating them from nothing.

**In practice.** Photons are lost in fibre (about 0.2 dB/km), so links reach a few hundred kilometres without trusted relays; satellite links (China's Micius, 2017) went further. Real devices have side channels that attacks have exploited. Several national security agencies recommend **post-quantum cryptography**, new classical algorithms believed to resist quantum attacks (module 6), over QKD for most uses, because it runs on existing networks.

Work the CS 498QC-style analysis in de Wolf's cryptography chapter, then simulate the protocol.`,
          resources: [
            arxiv('2003.06557', 'Bennett and Brassard, Quantum cryptography: public key distribution and coin tossing (1984, reprinted 2014)', 'The original BB84 paper; sections on the protocol and the eavesdropping argument are short.', ),
            deWolf('Chapter on quantum cryptography: BB84, the intercept-resend analysis and the idea of the security proof.', true),
            preskill('Chapter 4 and the notes on quantum key distribution and its security proof (Shor-Preskill idea).'),
          ],
          exercises: [
            {
              slug: 'bb84-by-hand',
              title: 'A BB84 run by hand',
              prompt:
                'Alice\'s bits are 1 0 1 1 0 0 1 0 1 1 and her bases Z X X Z Z X Z X X Z. Bob\'s bases are Z Z X X Z X X X Z Z. With no noise and no eavesdropper, give the states sent, Bob\'s possible results, the sifted key and its length. Then suppose Eve intercepts photon 3 in the Z basis: list the possible outcomes of Bob\'s measurement of photon 3 and their probabilities.',
              kind: 'problem',
              difficulty: 1,
              hint: 'Bases match at positions 1, 3, 5, 6, 8, 10: sifted key 1 1 0 0 0 1. Photon 3 is $|-\\rangle$; after Eve\'s $Z$ measurement it is $|0\\rangle$ or $|1\\rangle$, and Bob\'s $X$ measurement gives 0 or 1 with probability 1/2 each.',
            },
            {
              slug: 'qber-decision',
              title: 'Abort or continue?',
              prompt:
                'After sifting 20,000 bits, Alice and Bob compare 2000 random ones and find 172 disagreements. (a) Estimate the QBER and its standard error. (b) Should they continue, given an 11 % threshold? (c) If Eve had attacked every photon with intercept-resend, how many disagreements would they expect? (d) What fraction $f$ of photons could Eve have intercept-resent and still be hidden in a QBER of 8.6 %, if the channel itself contributes 3 %?',
              kind: 'data-analysis',
              difficulty: 2,
              hint: '(a) 8.6 %, standard error 0.63 %. (b) Continue: below 11 %. (c) About 500. (d) $f/4 \\approx 5.6\\%$, so $f \\approx 22\\%$ (treating error sources as adding).',
            },
            {
              slug: 'simulate-bb84',
              title: 'Simulate BB84 with an eavesdropper',
              prompt:
                'Write a short simulation (Python with random numbers is enough; no quantum library needed) of BB84 with $N = 10^4$ photons, optional intercept-resend by Eve on a fraction $f$, and channel noise flipping bits with probability $q$. Plot the measured QBER against $f$ for $q = 0$ and $q = 0.02$, and compare with $q + f/4$ (to first order).',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why is only about half of the raw key kept?',
              answerOutline: 'Bob\'s basis matches Alice\'s only half the time; mismatched positions give random results and are discarded in sifting.',
            },
            {
              question: 'Derive the 25 % error rate of an intercept-resend attack.',
              answerOutline: 'Eve uses the wrong basis half the time; then Bob\'s result is random, wrong half the time: 1/2 × 1/2 = 1/4.',
            },
            {
              question: 'What does QKD still need from classical cryptography?',
              answerOutline: 'An authenticated public channel (a pre-shared secret or authentication scheme); error correction and privacy amplification are classical post-processing.',
            },
          ],
          quiz: [
            {
              question: 'In BB84, Alice sends $|+\\rangle$ and Bob measures in the $Z$ basis. What happens to this position?',
              options: [
                'Bob gets 0 for certain and the bit is kept',
                'Bob gets a random bit, and the position is discarded at sifting because the bases differ',
                'Bob gets 1 for certain',
                'The position reveals an eavesdropper',
              ],
              answer: 1,
              explanation: '$|+\\rangle$ gives 50/50 in the $Z$ basis, so the result is useless; the announcement of bases shows a mismatch and the position is dropped. Mismatched positions are expected and say nothing about Eve.',
            },
            {
              question: 'Eve intercepts and resends 40 % of the photons in random bases; the channel is otherwise perfect. What QBER do Alice and Bob observe?',
              options: ['40 %', '20 %', '25 %', '10 %'],
              answer: 3,
              explanation: 'Each attacked photon causes an error with probability 1/4 on a sifted position, so the QBER is $0.4\\times0.25 = 10\\%$. 25 % is the rate when every photon is attacked.',
            },
            {
              question: 'Why can\'t Eve avoid detection by copying each photon and measuring the copy after the bases are announced?',
              options: [
                'Because of the no-cloning theorem: she cannot copy unknown non-orthogonal states',
                'Because photons cannot be stored',
                'Because the bases are never announced',
                'She can, which is why BB84 is insecure',
              ],
              answer: 0,
              explanation: 'The four BB84 states include non-orthogonal pairs ($|0\\rangle$ and $|+\\rangle$), which no device can copy. Any attempt to learn the bit disturbs the state, raising the QBER.',
            },
          ],
          relatedLessons: ['cybersecurity/applied-cryptography/public-key-crypto-and-key-exchange', 'quantum-mechanics/entanglement-measurement-and-information/quantum-cryptography-and-algorithms'],
        },
      ],
      project: {
        slug: 'chsh-on-real-hardware',
        title: 'A Bell test on a free cloud quantum computer',
        description: `Run the CHSH experiment yourself. (1) Predict: compute $E(x, y)$, $S$ and the win rate for the optimal angles, and for a sweep of Bob's angle offset from $-\\pi/2$ to $\\pi/2$ with Alice fixed. (2) Build the circuit: $H$ and CNOT to make $|\\Phi^+\\rangle$, then $R_y(-2\\theta)$ on each qubit to rotate the measurement basis (check this sign on paper; the factor 2 converts the basis angle into a Bloch-sphere rotation). (3) Run it in a simulator, then on a real device through IBM Quantum's free Open Plan (as of 2026 it gives about 10 minutes of hardware time per 28-day window; check the current terms), or another free provider, with at least 4000 shots per setting. (4) Report the measured $S$ and win rate with standard errors and compare with 2, 0.75, $2\\sqrt2$ and 0.854. (5) Estimate the visibility $v$ from your data and explain where the shortfall comes from (gate errors, readout errors, decoherence). If you cannot use hardware, use a noisy simulator with a depolarising model and fit $v$ instead.`,
        deliverables: [
          'Hand predictions and the circuit, with the basis-rotation sign checked',
          'Simulator and hardware (or noisy simulator) results: table of E(x, y), S and win rate with standard errors',
          'A plot of S against the angle offset, predicted and measured',
          'A one-page discussion of the result, the visibility, and what loopholes a cloud experiment cannot close',
        ],
        estimatedHours: 4,
        stretchGoals: ['Apply readout-error mitigation (measure the calibration matrix) and report S before and after', 'Run the same experiment on two different devices and compare their visibilities with their reported two-qubit gate errors'],
      },
    },
    {
      slug: 'first-quantum-algorithms',
      title: 'First Quantum Algorithms',
      description:
        'The query model and the first separations between quantum and classical computation: phase kickback, Deutsch and Deutsch-Jozsa, Bernstein-Vazirani, Simon\'s exponential separation, and a careful account of what "quantum speed-up" does and does not mean.',
      lessons: [
        {
          slug: 'oracles-and-phase-kickback',
          title: 'Oracles, the Hadamard transform and phase kickback',
          summary:
            'The query model of computation, how a bit oracle becomes a phase oracle when its target is |−⟩, and the formula H^{⊗n}|x⟩ = 2^{−n/2} Σ_y (−1)^{x·y}|y⟩ that every algorithm in this module uses.',
          estimatedMinutes: 90,
          objectives: [
            'Describe the query model: the function is a black box and cost is counted in queries',
            'Show that U_f|x⟩|−⟩ = (−1)^{f(x)}|x⟩|−⟩ (phase kickback)',
            'Derive H^{⊗n}|x⟩ = 2^{−n/2} Σ_y (−1)^{x·y}|y⟩ and apply it for n = 2 and 3',
            'Explain why the "control" qubit of a CNOT can be changed by the gate',
          ],
          concepts: [
            'Query (black-box) model',
            'Bit oracle U_f|x⟩|y⟩ = |x⟩|y ⊕ f(x)⟩',
            'Phase oracle |x⟩ → (−1)^{f(x)}|x⟩',
            'Phase kickback via the |−⟩ ancilla',
            'Uniform superposition H^{⊗n}|0^n⟩',
            'Hadamard transform and x · y mod 2',
            'Querying in superposition',
          ],
          explanation: `**The query model.** In the algorithms of this module you are given a function $f:\\{0,1\\}^n \\to \\{0,1\\}$ only as a black box, the oracle $U_f|x\\rangle|y\\rangle = |x\\rangle|y\\oplus f(x)\\rangle$, and you count how many times you call it. A classical algorithm queries one $x$ at a time; a quantum algorithm may query a superposition of inputs. Query counts are easy to prove things about, which is why the first separations were found here.

**Phase kickback.** Put the target qubit in $|-\\rangle = \\tfrac{1}{\\sqrt2}(|0\\rangle - |1\\rangle)$:
$$U_f|x\\rangle|-\\rangle = \\tfrac{1}{\\sqrt2}|x\\rangle\\big(|f(x)\\rangle - |1\\oplus f(x)\\rangle\\big) = (-1)^{f(x)}|x\\rangle|-\\rangle.$$
If $f(x) = 0$ nothing happens; if $f(x) = 1$ the two terms swap, which is a minus sign. The target is unchanged and the sign has been "kicked back" onto the input register: the bit oracle has become a **phase oracle** $|x\\rangle \\to (-1)^{f(x)}|x\\rangle$. A plain CNOT is the oracle for $f(x) = x$, so CNOT$|{+}\\rangle|{-}\\rangle = |{-}\\rangle|{-}\\rangle$: the *control* changed. Control and target are labels for the computational basis only.

\`\`\`interactive
qc-circuit
{"qubits": 2, "circuit": ["H 0", "X 1", "H 1", "CNOT 0 1", "H 0"], "palette": ["H", "X", "CNOT", "Z"], "title": "Phase kickback through a CNOT", "caption": "Qubit 0 starts in |+⟩ and qubit 1 in |−⟩. The CNOT leaves qubit 1 alone but flips qubit 0 to |−⟩, so the final H reads 1 with certainty. Step to the column after the CNOT and compare the signs of the amplitudes with those before it. Remove the X on qubit 1 (target |+⟩): the kickback disappears."}
\`\`\`

**The Hadamard transform.** For one qubit $H|x\\rangle = \\tfrac{1}{\\sqrt2}\\sum_{y}(-1)^{xy}|y\\rangle$. Applying $H$ to each of $n$ qubits multiplies these factors:
$$H^{\\otimes n}|x\\rangle = \\frac{1}{\\sqrt{2^n}}\\sum_{y\\in\\{0,1\\}^n}(-1)^{x\\cdot y}|y\\rangle,\\qquad x\\cdot y = x_0y_0\\oplus\\cdots\\oplus x_{n-1}y_{n-1}.$$
In particular $H^{\\otimes n}|0^n\\rangle$ is the uniform superposition. Example ($n = 2$, $x = 10$): the signs are $+$ for $y = 00, 01$ and $-$ for $10, 11$, so $H^{\\otimes2}|10\\rangle = \\tfrac12(|00\\rangle + |01\\rangle - |10\\rangle - |11\\rangle) = |-\\rangle|+\\rangle$.

**The template.** Every algorithm in this module is: $H^{\\otimes n}$ to make the uniform superposition, one or a few phase-oracle queries to write $f$ into signs, $H^{\\otimes n}$ again so the signs interfere, then measure. Querying "all inputs at once" is only the middle step; the final Hadamards are what turn a pattern of signs into a measurable answer.`,
          resources: [
            ibm('fundamentals-of-quantum-algorithms', 'Lesson 1, Quantum query algorithms: the query model, phase kickback and the Hadamard-transform formula.', true),
            deWolf('Chapter 2 (the circuit model and the Deutsch-Jozsa algorithm) introduces phase kickback and the Hadamard transform.'),
            codebook('basic-quantum-algorithms', 'Basic quantum algorithms', 'Nodes on oracles and phase kickback with coding exercises.'),
          ],
          exercises: [
            {
              slug: 'kickback-proof',
              title: 'Phase kickback in detail',
              prompt:
                'Verify $U_f|x\\rangle|-\\rangle = (-1)^{f(x)}|x\\rangle|-\\rangle$ for both values of $f(x)$. Then compute $U_f$ applied to $\\tfrac{1}{\\sqrt2}(|0\\rangle + |1\\rangle)|-\\rangle$ for the four functions $f:\\{0,1\\}\\to\\{0,1\\}$, and say what happens if the target is $|+\\rangle$ instead.',
              kind: 'derivation',
              difficulty: 1,
              hint: 'With target $|+\\rangle$, $U_f|x\\rangle|+\\rangle = |x\\rangle|+\\rangle$ for every $f$: no information is written anywhere.',
            },
            {
              slug: 'hadamard-transform',
              title: 'Hadamard transforms of small states',
              prompt:
                'Compute $H^{\\otimes3}|101\\rangle$ by the formula, listing the sign of each of the eight terms. Then compute $H^{\\otimes2}$ applied to $\\tfrac12(|00\\rangle - |01\\rangle - |10\\rangle + |11\\rangle)$ and to $\\tfrac{1}{\\sqrt2}(|00\\rangle + |11\\rangle)$.',
              kind: 'problem',
              difficulty: 2,
              hint: 'The sign of $|y\\rangle$ in $H^{\\otimes3}|101\\rangle$ is $(-1)^{y_0\\oplus y_2}$. The second state is $H^{\\otimes2}|11\\rangle$, so the result is $|11\\rangle$; the Bell state maps to $\\tfrac{1}{\\sqrt2}(|00\\rangle + |11\\rangle)$.',
            },
            {
              slug: 'phase-oracle-from-bit-oracle',
              title: 'Build a phase oracle',
              prompt:
                'For $f(x_0, x_1) = x_0\\wedge x_1$, build the bit oracle with a Toffoli and turn it into a phase oracle using an ancilla in $|-\\rangle$. Show that the resulting operation on the two input qubits is CZ. Check it in the circuit widget by comparing amplitudes with and without the ancilla.',
              kind: 'simulation',
              difficulty: 2,
              hint: 'The phase oracle multiplies $|11\\rangle$ by $-1$ and nothing else, which is exactly CZ.',
            },
          ],
          selfAssessment: [
            {
              question: 'What is phase kickback?',
              answerOutline: 'With the oracle\'s target in |−⟩, U_f multiplies |x⟩ by (−1)^{f(x)} and leaves the target unchanged, so the function is written into phases of the input register.',
            },
            {
              question: 'State the Hadamard transform formula.',
              answerOutline: 'H^{⊗n}|x⟩ = 2^{−n/2} Σ_y (−1)^{x·y}|y⟩, with x·y the bitwise inner product mod 2.',
            },
            {
              question: 'Why is "querying all inputs at once" not enough for a speed-up?',
              answerOutline: 'Measuring right after the query gives one random input; a final transform must make the phase pattern interfere into an informative outcome.',
            },
          ],
          quiz: [
            {
              question: 'What is $H^{\\otimes2}|11\\rangle$?',
              options: [
                '$\\tfrac12(|00\\rangle - |01\\rangle - |10\\rangle + |11\\rangle)$',
                '$\\tfrac12(|00\\rangle + |01\\rangle + |10\\rangle + |11\\rangle)$',
                '$\\tfrac12(|00\\rangle - |01\\rangle + |10\\rangle - |11\\rangle)$',
                '$|00\\rangle$',
              ],
              answer: 0,
              explanation: 'The sign of $|y\\rangle$ is $(-1)^{y_0\\oplus y_1}$: negative for 01 and 10. It equals $|-\\rangle|-\\rangle$. The uniform superposition is $H^{\\otimes2}|00\\rangle$; the third option is $|+\\rangle|-\\rangle = H^{\\otimes2}|01\\rangle$.',
            },
            {
              question: 'A CNOT acts on $|-\\rangle|-\\rangle$ (control qubit 0). What is the result?',
              options: ['$|-\\rangle|-\\rangle$', '$|-\\rangle|+\\rangle$', '$|+\\rangle|-\\rangle$', '$-|-\\rangle|-\\rangle$'],
              answer: 2,
              explanation: 'The target is $|-\\rangle$, so the control picks up $(-1)^{x}$: $|-\\rangle = \\tfrac{1}{\\sqrt2}(|0\\rangle - |1\\rangle)$ becomes $\\tfrac{1}{\\sqrt2}(|0\\rangle + |1\\rangle) = |+\\rangle$. The target is unchanged. Expecting nothing to happen to the control is the classical intuition that kickback breaks.',
            },
            {
              question: 'The oracle\'s target qubit is accidentally prepared in $|0\\rangle$ instead of $|-\\rangle$ before a query on a uniform superposition of inputs. What goes wrong?',
              options: [
                'Nothing: the phases are written anyway',
                'The oracle stops being unitary',
                'The algorithm runs twice as fast',
                'The target ends up holding $f(x)$, entangled with the input, instead of a sign on each $|x\\rangle$',
              ],
              answer: 3,
              explanation: 'With target $|0\\rangle$ the result is $\\sum_x|x\\rangle|f(x)\\rangle$, an entangled state; the input register alone no longer carries clean signs, and the final interference fails (like the garbage problem of module 3).',
            },
          ],
          relatedLessons: ['quantum-mechanics/entanglement-measurement-and-information/quantum-cryptography-and-algorithms'],
        },
        {
          slug: 'deutsch-jozsa',
          title: 'Deutsch and Deutsch-Jozsa',
          summary:
            'Deciding whether a function is constant or balanced: Deutsch\'s one-query algorithm for one bit, the Deutsch-Jozsa generalisation to n bits, the amplitude of |0ⁿ⟩ that decides it, and how strong the separation really is.',
          estimatedMinutes: 90,
          objectives: [
            'Run Deutsch\'s algorithm by hand for all four one-bit functions',
            'Derive the final amplitude of |0ⁿ⟩ in Deutsch-Jozsa and the decision rule',
            'Compare with deterministic (2^{n−1} + 1 queries) and randomised classical algorithms',
            'Trace Deutsch-Jozsa for a given small balanced function',
          ],
          concepts: [
            'Constant versus balanced promise',
            'Deutsch\'s algorithm (one query, n = 1)',
            'Deutsch-Jozsa circuit H, U_f, H',
            'Amplitude of |0ⁿ⟩ = 2^{−n} Σ (−1)^{f(x)}',
            'Deterministic classical cost 2^{n−1} + 1',
            'Randomised classical algorithms succeed with few queries',
            'Promise problem',
          ],
          explanation: `**Deutsch's problem (1985).** A one-bit function $f$ is either constant ($f(0) = f(1)$) or balanced ($f(0)\\ne f(1)$). Classically you must evaluate it twice. Quantumly, once: prepare $|0\\rangle|1\\rangle$, apply $H\\otimes H$, query, apply $H$ to the first qubit and measure it. After the query (with kickback) the first qubit is $\\tfrac{1}{\\sqrt2}\\big((-1)^{f(0)}|0\\rangle + (-1)^{f(1)}|1\\rangle\\big)$, which is $\\pm|+\\rangle$ if $f$ is constant and $\\pm|-\\rangle$ if balanced. The final $H$ turns these into $|0\\rangle$ and $|1\\rangle$. You learn the *global property* $f(0)\\oplus f(1)$ without learning either value.

**Deutsch-Jozsa (1992).** Now $f:\\{0,1\\}^n\\to\\{0,1\\}$ is promised to be constant or **balanced** (0 on exactly half the inputs). The same circuit with $n$ input qubits gives, before the final Hadamards, $\\frac{1}{\\sqrt{2^n}}\\sum_x(-1)^{f(x)}|x\\rangle$, and afterwards the amplitude of $|0^n\\rangle$ is
$$\\frac{1}{2^n}\\sum_x(-1)^{f(x)} = \\begin{cases}\\pm1 & f\\ \\text{constant},\\\\ 0 & f\\ \\text{balanced}.\\end{cases}$$
So: measure; all zeros means constant, anything else means balanced. One query, no error.

**Worked example** ($n = 2$, $f(x) = x_0\\oplus x_1$, balanced). The phase pattern is $\\tfrac12(|00\\rangle - |01\\rangle - |10\\rangle + |11\\rangle) = H^{\\otimes2}|11\\rangle$, so the output is $|11\\rangle$ with certainty, not $|00\\rangle$. For $f(x) = x_0$ the output is $|10\\rangle$.

\`\`\`interactive
qc-circuit
{"preset": "deutsch-jozsa", "palette": ["X", "CNOT", "H"], "title": "Deutsch-Jozsa on two input bits", "caption": "The oracle here is CNOT from q0 to the ancilla q2, the balanced function f(x) = x0. The input qubits never read 00 (they read 10). Add CNOT 1 2 to make f = x0 ⊕ x1 and predict the output (11). Delete the oracle CNOTs entirely, f = 0 is constant, and the inputs read 00."}
\`\`\`

**How big is the gap?** A *deterministic* classical algorithm may need $2^{n-1} + 1$ queries: after seeing half the inputs all give 0, the function could still be either. But a *randomised* algorithm that queries $k$ random inputs and answers "constant" if they all agree is wrong with probability at most $2^{1-k}$ on a balanced function. Ten queries give error below 0.2 %. So Deutsch-Jozsa is an exponential separation only against exact deterministic algorithms; against randomised ones with small error it is a constant. It is a clean demonstration of interference rather than a useful speed-up, and the next two lessons go further.`,
          resources: [
            ibm('fundamentals-of-quantum-algorithms', 'Lesson 1: Deutsch\'s algorithm and Deutsch-Jozsa, with the randomised-classical comparison.', true),
            deWolf('Chapter 2: the Deutsch-Jozsa algorithm, with the classical lower bounds.'),
            composer('Run Deutsch-Jozsa for n = 3 with a balanced oracle on a real device and compare the frequency of 000 with the ideal 0.'),
          ],
          exercises: [
            {
              slug: 'deutsch-all-four',
              title: 'Deutsch for all four functions',
              prompt:
                'For each $f:\\{0,1\\}\\to\\{0,1\\}$ (constant 0, constant 1, identity, NOT), build the oracle from at most one CNOT and one $X$, trace the two-qubit state through the whole algorithm, and give the measured bit and the final state of the ancilla.',
              kind: 'problem',
              difficulty: 1,
              hint: 'Constant 1 is an $X$ on the ancilla, identity is CNOT, NOT is CNOT then $X$ on the ancilla. The ancilla ends in $|1\\rangle$ (after its own $H$, if applied) or stays $|-\\rangle$.',
            },
            {
              slug: 'dj-three-bits',
              title: 'Deutsch-Jozsa on three bits',
              prompt:
                'For $n = 3$, take the balanced function $f(x) = x_0\\oplus x_2$ and the balanced function $f(x) = \\mathrm{maj}(x_0, x_1, x_2)$ (the majority bit). For each, compute the amplitude of every output string and the probability of 000. Which outputs appear for the majority function, and with what probabilities?',
              kind: 'problem',
              difficulty: 2,
              hint: 'For $x_0\\oplus x_2$ the output is 101 with certainty. For majority, the amplitude of $y$ is $\\tfrac18\\sum_x(-1)^{\\mathrm{maj}(x)+x\\cdot y}$: $+\\tfrac12$ for 001, 010 and 100, $-\\tfrac12$ for 111 and 0 for the rest, so those four outputs have probability 1/4 each and 000 never appears.',
            },
            {
              slug: 'randomised-classical',
              title: 'How good is random sampling?',
              prompt:
                'A randomised classical algorithm for the Deutsch-Jozsa problem queries $k$ inputs chosen independently and uniformly, and answers "constant" if all values agree. (a) Show the error probability on a balanced function is $2^{1-k}$. (b) How many queries make the error below $10^{-6}$? (c) Explain in a paragraph why this means Deutsch-Jozsa does not show that quantum computers are exponentially faster than randomised classical ones.',
              kind: 'writing',
              difficulty: 2,
              hint: '(a) All $k$ values agree with probability $2\\cdot2^{-k}$. (b) $k = 21$.',
            },
          ],
          selfAssessment: [
            {
              question: 'What does Deutsch\'s algorithm compute, and with how many queries?',
              answerOutline: 'f(0) ⊕ f(1) (constant versus balanced) with one query, without learning f(0) or f(1).',
            },
            {
              question: 'Derive the decision rule of Deutsch-Jozsa.',
              answerOutline: 'Amplitude of |0ⁿ⟩ after the final Hadamards is 2^{−n}Σ(−1)^{f(x)}: ±1 if constant, 0 if balanced; output 0ⁿ means constant.',
            },
            {
              question: 'Against which classical model is the Deutsch-Jozsa separation exponential?',
              answerOutline: 'Deterministic exact algorithms (2^{n−1}+1 queries). Randomised algorithms with small error need only a constant number of queries.',
            },
          ],
          quiz: [
            {
              question: 'In Deutsch-Jozsa with $n = 2$ and $f(x) = x_1$ (the right-hand bit), what does the measurement of the input register give?',
              options: ['$|00\\rangle$', '$|10\\rangle$', '$|11\\rangle$', '$|01\\rangle$'],
              answer: 3,
              explanation: 'The phase pattern is $(-1)^{x_1}$, i.e. $|+\\rangle|-\\rangle = H^{\\otimes2}|01\\rangle$, so the output is $|01\\rangle$. $f = x_0$ would give $|10\\rangle$; 00 would mean constant.',
            },
            {
              question: 'Deutsch-Jozsa outputs $|000\\rangle$ with probability 1/4 on a real device. What should you conclude?',
              options: [
                'The function is constant with probability 1/4',
                'The promise is violated, or the hardware is noisy: for an ideal device the probability is exactly 0 or 1',
                'The function is balanced, since 1/4 is less than 1/2',
                'Nothing, since Deutsch-Jozsa is probabilistic',
              ],
              answer: 1,
              explanation: 'Ideally the probability of $0^n$ is $|2^{-n}\\sum(-1)^{f(x)}|^2$, which is 1 for constant and 0 for balanced functions. Intermediate values mean $f$ is neither (no promise) or errors have crept in; in practice you would repeat and see which is nearer.',
            },
            {
              question: 'How many queries does a deterministic classical algorithm need in the worst case to solve the Deutsch-Jozsa problem for $n = 10$?',
              options: ['513', '10', '1', '1024'],
              answer: 0,
              explanation: 'After $2^{n-1} = 512$ identical answers the function could still be either; the 513th settles it. All 1024 are never needed. A randomised algorithm with 10 queries errs with probability under 0.2 %.',
            },
          ],
          relatedLessons: ['quantum-mechanics/entanglement-measurement-and-information/quantum-cryptography-and-algorithms', 'theory-of-computation/beyond-np/randomised-complexity'],
        },
        {
          slug: 'bernstein-vazirani',
          title: 'Bernstein-Vazirani',
          summary:
            'Learning a hidden string s from f(x) = s · x mod 2 with one quantum query instead of n classical ones, why the Hadamard transform reads s directly, and what the algorithm does on noisy hardware.',
          estimatedMinutes: 75,
          objectives: [
            'Show that the phase oracle for f(x) = s · x produces H^{⊗n}|s⟩',
            'Build the oracle for a given s from CNOTs and trace the circuit',
            'Compare with the n classical queries needed and explain why randomness does not help classically',
            'Interpret noisy hardware output for Bernstein-Vazirani',
          ],
          concepts: [
            'Hidden string s',
            'Linear function f(x) = s · x mod 2',
            'Oracle: CNOT from each qubit with s_i = 1',
            'One quantum query versus n classical',
            'Hadamard transform inverts itself',
            'Separation also against randomised algorithms (n versus 1)',
          ],
          explanation: `**The problem.** An oracle computes $f(x) = s\\cdot x = s_0x_0\\oplus\\cdots\\oplus s_{n-1}x_{n-1}$ for an unknown $s\\in\\{0,1\\}^n$. Find $s$. Classically each query returns one bit, and $s$ has $n$ unknown bits, so you need $n$ queries (query $x = 100\\ldots0$ to get $s_0$, and so on), and no randomised algorithm can do better, since each answer carries at most one bit of information.

**Quantumly, one query.** Run the Deutsch-Jozsa circuit. After the phase query the register is
$$\\frac{1}{\\sqrt{2^n}}\\sum_x(-1)^{s\\cdot x}|x\\rangle = H^{\\otimes n}|s\\rangle,$$
by the Hadamard-transform formula of the first lesson read backwards. Since $H^{\\otimes n}$ is its own inverse, the final Hadamards return exactly $|s\\rangle$. Measuring gives $s$ with certainty.

**Building the oracle.** $f(x) = s\\cdot x$ is a parity, so the bit oracle is one CNOT from each input qubit with $s_i = 1$ onto the ancilla. For $s = 101$: CNOT$_{0\\to3}$ and CNOT$_{2\\to3}$. Trace it for one input: $x = 111$ flips the ancilla twice, and indeed $s\\cdot x = 1\\oplus0\\oplus1 = 0$.

\`\`\`interactive
qc-circuit
{"preset": "bernstein-vazirani", "palette": ["CNOT", "X", "H"], "title": "Bernstein-Vazirani with s = 101", "caption": "The oracle is CNOT 0 3 and CNOT 2 3. The input register reads 101 with certainty (the ancilla q3 is 50/50 and irrelevant). Add CNOT 1 3 and predict the new readout (111); remove CNOT 0 3 and check you get 001. Step through to see the phases ±1 appear after the oracle."}
\`\`\`

**Why does it work, physically?** Think of the CNOTs in the Hadamard basis: conjugated by Hadamards, each CNOT$_{i\\to a}$ becomes a CNOT from the ancilla to qubit $i$, and the ancilla in $|-\\rangle$ becomes $|1\\rangle$. So the whole circuit just flips exactly the qubits with $s_i = 1$. There is no magic parallelism; it is phase kickback plus a change of basis.

**On noisy hardware** the correct string is still the most frequent one for small $n$, but its probability decreases with $n$ and with the number of CNOTs (each two-qubit gate on today's devices fails with probability around 0.1-1 %), and on chips with nearest-neighbour coupling the CNOTs to a distant ancilla need extra SWAPs. Benchmark studies have used exactly this algorithm to compare devices.

The separation here is polynomial ($n$ versus 1) but holds against randomised algorithms too; Bernstein and Vazirani used a recursive version to give the first super-polynomial oracle separation between BQP and BPP, the class they defined in the same 1993 paper.`,
          resources: [
            ibm('fundamentals-of-quantum-algorithms', 'Lesson 1: the Bernstein-Vazirani problem and algorithm.', true),
            codebook('basic-quantum-algorithms', 'Basic quantum algorithms', 'The Bernstein-Vazirani nodes: implement the oracle and the circuit for a given string.'),
            childs('Chapter on the query model and early algorithms; includes the recursive Fourier sampling idea behind the BQP/BPP separation.'),
          ],
          exercises: [
            {
              slug: 'bv-trace',
              title: 'Trace Bernstein-Vazirani',
              prompt:
                'For $n = 3$ and $s = 011$, write the oracle as CNOTs, list $f(x)$ for all eight inputs, write the input-register state after the query (signs of all eight amplitudes), and show the final Hadamards give $|011\\rangle$.',
              kind: 'problem',
              difficulty: 1,
              hint: '$f(x) = x_1\\oplus x_2$; the sign pattern is $(-1)^{x_1\\oplus x_2}$, which is $H^{\\otimes3}|011\\rangle$.',
            },
            {
              slug: 'bv-basis-change',
              title: 'Bernstein-Vazirani as a basis change',
              prompt:
                'Using $(H\\otimes H)\\mathrm{CNOT}_{0\\to1}(H\\otimes H) = \\mathrm{CNOT}_{1\\to0}$, show that the entire Bernstein-Vazirani circuit equals a set of CNOTs from the ancilla (in $|1\\rangle$) to the input qubits with $s_i = 1$, applied to $|0^n\\rangle|1\\rangle$. Explain why this makes the result obvious.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'bv-hardware',
              title: 'Run it on hardware',
              prompt:
                'Run Bernstein-Vazirani for $s = 1011$ (5 qubits) on a simulator and on a free IBM Quantum device with 2000 shots. Report the probability of the correct string. Look at the transpiled circuit: how many two-qubit gates did it use, and why more than three? Estimate the expected success from the number of two-qubit gates and the device\'s reported error rate, and compare.',
              kind: 'simulation',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does the Bernstein-Vazirani circuit output s exactly?',
              answerOutline: 'The phase query creates Σ(−1)^{s·x}|x⟩/√2ⁿ = H^{⊗n}|s⟩, and the final H^{⊗n} undoes the transform.',
            },
            {
              question: 'How is the oracle for s · x built?',
              answerOutline: 'A CNOT from each input qubit with s_i = 1 to the ancilla (a parity computation).',
            },
            {
              question: 'Why can a randomised classical algorithm not beat n queries here?',
              answerOutline: 'Each query reveals one bit and s has n unknown bits; information-theoretically n queries are needed.',
            },
          ],
          quiz: [
            {
              question: 'The Bernstein-Vazirani oracle consists of CNOTs from qubits 0, 1 and 3 (of four inputs) to the ancilla. What does the algorithm output?',
              options: ['1101', '0010', '1011', '1111'],
              answer: 0,
              explanation: 'Each CNOT from input $i$ means $s_i = 1$, so $s = 1101$ (qubit 0 leftmost). 0010 is the complement, and 1011 reverses the bit order, a common slip when comparing with Qiskit.',
            },
            {
              question: 'How many classical queries (deterministic or randomised) are needed to find a 20-bit hidden string $s$ with certainty?',
              options: ['1', '20', '$2^{19} + 1$', '$\\sqrt{2^{20}}$'],
              answer: 1,
              explanation: 'Query the 20 unit vectors $e_i$ to read $s_i$; fewer queries cannot determine 20 unknown bits. $2^{19}+1$ is the Deutsch-Jozsa deterministic bound, a different problem.',
            },
            {
              question: 'What does the Bernstein-Vazirani result demonstrate?',
              options: [
                'Quantum computers can learn any function with one query',
                'An exponential quantum speed-up for a practical problem',
                'A polynomial ($n$ versus 1) query separation that also holds against randomised classical algorithms',
                'That entanglement between the inputs is essential',
              ],
              answer: 2,
              explanation: 'It works only because $f$ is linear, and the gap is $n$ to 1. Entanglement is not needed: the input register stays in product states throughout.',
            },
          ],
          relatedLessons: ['theory-of-computation/beyond-np/a-glance-at-quantum-computation'],
        },
        {
          slug: 'simons-algorithm',
          title: 'Simon\'s algorithm',
          summary:
            'Finding a hidden XOR mask s with f(x) = f(x ⊕ s) using O(n) quantum queries and linear algebra mod 2, versus about 2^{n/2} classical queries: the first exponential separation against randomised algorithms, and the template for Shor.',
          estimatedMinutes: 110,
          objectives: [
            'State Simon\'s problem and the classical birthday-bound lower bound',
            'Derive that each run outputs a uniformly random y with y · s = 0',
            'Recover s from n − 1 independent equations by Gaussian elimination mod 2',
            'Explain why Simon\'s algorithm is a template for period finding',
          ],
          concepts: [
            'Simon\'s promise: f(x) = f(y) iff y ∈ {x, x ⊕ s}',
            'Two-register circuit and measuring the output register',
            'Post-measurement state (|x₀⟩ + |x₀ ⊕ s⟩)/√2',
            'Outputs satisfy y · s = 0 mod 2',
            'Linear algebra over GF(2)',
            'Classical lower bound Ω(2^{n/2}) (birthday)',
            'Hidden subgroup problem',
          ],
          explanation: `**The problem.** $f:\\{0,1\\}^n\\to\\{0,1\\}^n$ satisfies $f(x) = f(y)$ exactly when $y = x$ or $y = x\\oplus s$, for an unknown nonzero $s$: $f$ is two-to-one, and inputs pair up by XOR with $s$. Find $s$. Classically you must find a collision $f(x) = f(y)$, after which $s = x\\oplus y$; by the birthday argument that takes about $2^{n/2}$ queries even with randomness (Simon proved a matching lower bound).

**The circuit.** Two $n$-qubit registers. Apply $H^{\\otimes n}$ to the first, query $|x\\rangle|0\\rangle\\to|x\\rangle|f(x)\\rangle$, measure the second register, apply $H^{\\otimes n}$ to the first and measure it. Measuring $f$ gives some value $f(x_0)$ and leaves the first register in
$$\\tfrac{1}{\\sqrt2}(|x_0\\rangle + |x_0\\oplus s\\rangle).$$
(You could skip that measurement; it only makes the analysis easier.) The Hadamards give amplitude $\\frac{1}{\\sqrt{2^{n+1}}}(-1)^{x_0\\cdot y}\\big(1 + (-1)^{s\\cdot y}\\big)$ for $|y\\rangle$, which vanishes unless $s\\cdot y = 0$. So each run returns a **uniformly random $y$ with $y\\cdot s = 0$** and the random $x_0$ only affects an invisible sign.

**Worked example** ($n = 3$, $s = 110$). Then $f$ pairs $000\\leftrightarrow110$, $001\\leftrightarrow111$, $010\\leftrightarrow100$, $011\\leftrightarrow101$. The possible outputs are the $y$ with $y_0\\oplus y_1 = 0$: 000, 001, 110, 111, each with probability 1/4. Suppose two runs give 001 and 111. The equations $s_2 = 0$ and $s_0\\oplus s_1\\oplus s_2 = 0$ have the nonzero solution $s = 110$.

**Classical post-processing.** You need $n-1$ linearly independent equations over $\\mathrm{GF}(2)$; random $y$s supply them after about $n + 1$ runs on average, and Gaussian elimination mod 2 finds $s$ in $O(n^3)$ time. Total: $O(n)$ queries versus $\\Omega(2^{n/2})$, an **exponential separation against randomised algorithms**, in the query model.

**Why it matters.** Simon's structure, a function constant on cosets of a hidden subgroup and a Fourier transform that reveals the subgroup's "perpendicular" space, is exactly what Shor (1994) adapted from $\\mathbb{Z}_2^n$ to $\\mathbb{Z}_N$ to find periods and factor. This general pattern is the **hidden subgroup problem**.

There is no widget for Simon; do the example in the circuit widget with 6 qubits by building $f$ from CNOTs in the project, or in Quirk.`,
          resources: [
            ibm('fundamentals-of-quantum-algorithms', 'Lesson 1 ends with Simon\'s algorithm, including the classical lower bound and the post-processing.', true),
            deWolf('Chapter on Simon\'s algorithm: the circuit, the analysis and the GF(2) linear algebra.'),
            childs('The chapter on the abelian hidden subgroup problem places Simon and Shor in one framework.'),
            vazirani('Vazirani\'s Berkeley lecture notes on Simon\'s algorithm and the Fourier sampling view of it.'),
          ],
          exercises: [
            {
              slug: 'simon-oracle',
              title: 'Build a Simon oracle',
              prompt:
                'For $n = 2$ and $s = 11$, define $f(x_0x_1) = (x_0\\oplus x_1, 0)$ and check it satisfies Simon\'s promise. Build its oracle from CNOTs on 4 qubits. Trace the algorithm: give the state after the query, the possible values of the second register, and the possible outputs $y$ with their probabilities.',
              kind: 'problem',
              difficulty: 2,
              hint: '$f(00) = f(11) = 00$, $f(01) = f(10) = 10$. Oracle: CNOT$_{0\\to2}$ and CNOT$_{1\\to2}$. Outputs $y \\in \\{00, 11\\}$, each with probability 1/2.',
            },
            {
              slug: 'simon-linear-system',
              title: 'Solve Simon\'s system',
              prompt:
                'A run of Simon\'s algorithm with $n = 5$ returns $y$ = 01101, 10100, 11001, 10001, 10110 (some may be dependent). Find a maximal set of independent equations over GF(2), solve for the nonzero $s$, and verify $y\\cdot s = 0$ for all five. If the equations had rank only 3, how many candidate $s$ would remain?',
              kind: 'problem',
              difficulty: 2,
              hint: 'Note 01101 ⊕ 10100 = 11001, so one equation is dependent; the other four have rank 4 and the unique nonzero solution is $s = 10101$. Rank 3 would leave $2^2 - 1 = 3$ nonzero candidates.',
            },
            {
              slug: 'simon-run-count',
              title: 'How many runs?',
              prompt:
                'Each run returns a uniformly random vector from the $(n-1)$-dimensional space orthogonal to $s$. Show that the probability that $n-1$ runs give independent vectors is $\\prod_{k=1}^{n-1}(1 - 2^{k-n})$, and evaluate it for $n = 3, 5, 10$. Simulate 10,000 trials for $n = 10$ (a short Python script) and report the mean number of runs needed.',
              kind: 'simulation',
              difficulty: 3,
              hint: 'For $n = 3$: $(1 - 1/4)(1 - 1/2) = 0.375$. The product tends to about 0.289 as $n$ grows.',
            },
          ],
          selfAssessment: [
            {
              question: 'What does each run of Simon\'s algorithm output?',
              answerOutline: 'A uniformly random y with y · s = 0 mod 2.',
            },
            {
              question: 'How is s recovered?',
              answerOutline: 'Collect about n runs until n − 1 independent equations y · s = 0, then Gaussian elimination over GF(2) gives the unique nonzero s.',
            },
            {
              question: 'Why is Simon\'s separation stronger than Deutsch-Jozsa\'s?',
              answerOutline: 'Randomised classical algorithms still need Ω(2^{n/2}) queries (birthday bound), versus O(n) quantum queries.',
            },
          ],
          quiz: [
            {
              question: 'In Simon\'s algorithm with $n = 3$ and $s = 101$, which output $y$ is impossible?',
              options: ['$010$', '$111$', '$101$', '$100$'],
              answer: 3,
              explanation: '$y\\cdot s = y_0\\oplus y_2$ must be 0. For 100 it is 1, so it never occurs. 010, 111 and 101 all satisfy $y_0 = y_2$.',
            },
            {
              question: 'Two runs with $n = 3$ give $y = 011$ and $y = 100$. What is $s$?',
              options: ['$011$', '$111$', '$100$', '$s$ is not yet determined'],
              answer: 0,
              explanation: '$y = 100$ gives $s_0 = 0$; $y = 011$ gives $s_1\\oplus s_2 = 0$; the nonzero solution is $s = 011$. Check: $011\\cdot011 = 1\\oplus1 = 0$. Two independent equations suffice for $n = 3$ ($n - 1 = 2$).',
            },
            {
              question: 'Why does measuring the second register in Simon\'s algorithm not destroy the useful information?',
              options: [
                'Because the measurement is never actually performed',
                'Because whatever value is seen, the first register is left in $(|x_0\\rangle + |x_0\\oplus s\\rangle)/\\sqrt2$, and $x_0$ only affects a sign after the Hadamards',
                'Because the second register is unentangled with the first',
                'Because it reveals $s$ directly',
              ],
              answer: 1,
              explanation: 'Every outcome leaves a pair differing by $s$; the Hadamards convert this into the condition $y\\cdot s = 0$, and the unknown $x_0$ only contributes $(-1)^{x_0\\cdot y}$, which measurement cannot see. The registers are entangled before the measurement.',
            },
            {
              question: 'About how many classical queries does a randomised algorithm need for Simon\'s problem with $n = 40$?',
              options: ['About 40', 'About $2^{40}$', 'About $2^{20} \\approx 10^6$', 'About 1600'],
              answer: 2,
              explanation: 'It must find a collision, which by the birthday bound takes on the order of $2^{n/2}$ queries. 40 queries is the quantum count (up to a small constant); $2^{40}$ would be needed only to search exhaustively.',
            },
          ],
          relatedLessons: ['probability-statistics/probability-foundations/counting-and-equally-likely-outcomes', 'linear-algebra-computational/linear-systems/gaussian-elimination'],
        },
        {
          slug: 'what-quantum-speed-up-means',
          title: 'What "quantum speed-up" does and does not mean',
          summary:
            'Query versus time complexity, exponential versus polynomial speed-ups, oracle separations versus real problems, dequantisation, the input-output bottleneck, and the constant-factor overheads that make small speed-ups impractical.',
          estimatedMinutes: 85,
          objectives: [
            'Distinguish query complexity from time (gate) complexity and say what each separation proves',
            'Classify known speed-ups as exponential, super-polynomial or polynomial, with an example of each',
            'Explain why speed-ups need structure, and give the BBBV bound for unstructured search',
            'Describe dequantisation and the input-output caveats of quantum linear algebra',
            'Explain why a quadratic speed-up may not pay off once error-correction overheads are counted',
          ],
          concepts: [
            'Query complexity versus time complexity',
            'Oracle (relativised) separations',
            'Exponential, super-polynomial, polynomial speed-ups',
            'Structure: periodicity, hidden subgroups',
            'Unstructured search lower bound Ω(√N)',
            'Dequantisation (quantum-inspired classical algorithms)',
            'Data loading and readout bottlenecks',
            'Constant factors and error-correction overhead',
          ],
          explanation: `**Queries versus time.** Deutsch-Jozsa, Bernstein-Vazirani and Simon count oracle calls. A query separation is a theorem, but it is *relative to a black box*: it does not say anything about a function given as an explicit circuit, where a classical algorithm might look inside. Simon shows BQP and BPP differ *relative to an oracle*; whether they differ in the real world is unproven, because proving it would separate P from PSPACE, a famous open problem. Shor's factoring algorithm (next module) gives a *time* speed-up for a concrete problem, but only relative to the best *known* classical algorithm, not a proven one.

**Sizes of speed-ups.**
- *Exponential (or super-polynomial)*: factoring and discrete logarithms (Shor), simulating quantum systems, certain hidden-subgroup problems. All exploit **structure**, typically periodicity revealed by a Fourier transform.
- *Polynomial*: unstructured search (Grover, $\\sqrt N$ versus $N$), many optimisation and sampling problems. Bennett, Bernstein, Brassard and Vazirani proved (1997) that no quantum algorithm searches an unstructured space with fewer than about $\\sqrt N$ queries. So "try all answers in parallel" is not just a bad metaphor; it is provably not how it works.

**Dequantisation.** Some proposed exponential speed-ups for machine learning vanished once classical algorithms got comparable access to the data, as in Ewin Tang's 2018 recommendation algorithm.

**Input and output.** Quantum linear-system algorithms (HHL) can output a quantum state proportional to $A^{-1}b$ quickly, but only if $b$ can be loaded fast, $A$ is sparse and well conditioned, and you need just a few expectation values of the answer rather than its $N$ entries. Reading out $N$ numbers takes at least $N$ measurements.

**Constant factors.** Error-corrected logical gates are slow (microseconds or more, against nanoseconds classically) and costly in qubits. Babbush et al. (2021) estimated that quadratic speed-ups on early fault-tolerant machines will not beat a classical computer for many years of runtime, so practical advantage will likely come first from exponential speed-ups such as simulation. A rough rule: if classical takes $N$ steps of 1 ns and quantum takes $\\sqrt N$ steps of 10 μs, quantum wins only when $\\sqrt N > 10^4$, that is $N > 10^8$, and only if the 10 μs includes every overhead.

**A checklist** for any claim: what is the problem, what is the classical baseline (best known or proven?), is the speed-up in queries or time, how is the input loaded and the output read, and what are the constants?`,
          resources: [
            arxiv('2310.03011', 'Dalzell et al., Quantum algorithms: a survey of applications and end-to-end complexities (2023)', 'A careful survey that asks exactly the checklist questions for each application; read the introduction and one application chapter.'),
            arxiv('quant-ph/9701001', 'Bennett, Bernstein, Brassard and Vazirani, Strengths and weaknesses of quantum computing (1997)', 'The Ω(√N) lower bound for unstructured search; the introduction explains why it matters for NP.'),
            free('Quantum Algorithm Zoo', 'https://quantumalgorithmzoo.org/', 'documentation', 'Stephen Jordan', 'A catalogue of known quantum algorithms with the type of speed-up for each; browse the algebraic and oracular sections.', true),
            aaronson('The lectures on BQP and on the limits of quantum algorithms give the complexity-theoretic picture informally.'),
          ],
          exercises: [
            {
              slug: 'classify-speedups',
              title: 'Classify the speed-ups',
              prompt:
                'For each of Deutsch-Jozsa, Bernstein-Vazirani, Simon, Shor (factoring), Grover (search), quantum simulation of molecules and HHL (linear systems), state: query or time complexity; exponential, super-polynomial, polynomial or constant; against which classical model (deterministic, randomised, best known); and the main caveat. Use the Quantum Algorithm Zoo and the Dalzell survey to check.',
              kind: 'reading',
              difficulty: 2,
            },
            {
              slug: 'crossover-time',
              title: 'When does a quadratic speed-up pay?',
              prompt:
                'A classical computer checks $10^9$ candidates per second. A fault-tolerant quantum computer runs Grover iterations at one per 100 μs (including error correction). For a search space of size $N$, find the crossover $N$ above which Grover is faster (ignore constants $\\pi/4$), and the run time at the crossover. Repeat for a quantum iteration of 1 μs. Write two sentences on what this implies for "quantum speed-ups for optimisation".',
              kind: 'problem',
              difficulty: 2,
              hint: 'Classical time $N\\cdot10^{-9}$ s; quantum $\\sqrt N\\cdot10^{-4}$ s. Equal when $\\sqrt N = 10^5$, $N = 10^{10}$, about 10 s. At 1 μs: $N = 10^6$, 1 ms.',
            },
            {
              slug: 'critique-a-claim',
              title: 'Critique a claim',
              prompt:
                'Find a recent press release or article (2024 or later) claiming a quantum speed-up or "advantage" for a practical problem. Write a 300-word critique using the checklist in this lesson: problem, baseline, query versus time, input and output, constants. Cite the source and its date.',
              kind: 'writing',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What does an oracle separation prove, and what does it not prove?',
              answerOutline: 'That no classical algorithm with only black-box access does as well; it does not prove a speed-up for explicit functions, where classical algorithms can inspect the circuit.',
            },
            {
              question: 'Why can a quantum computer not search an unstructured list in polylog(N) time?',
              answerOutline: 'The BBBV lower bound: any quantum algorithm needs Ω(√N) queries for unstructured search; Grover is optimal.',
            },
            {
              question: 'Give two caveats of quantum linear-system algorithms.',
              answerOutline: 'Fast state preparation of b and sparse, well-conditioned A are required; the output is a quantum state, so reading N entries costs N measurements; some speed-ups were dequantised.',
            },
          ],
          quiz: [
            {
              question: 'Which algorithm gives an exponential speed-up over the best known classical algorithm for a problem stated without an oracle?',
              options: ['Shor\'s factoring algorithm', 'Grover search', 'Deutsch-Jozsa', 'Bernstein-Vazirani'],
              answer: 0,
              explanation: 'Factoring is a concrete problem and Shor\'s algorithm is exponentially faster than the best known classical method (not a proven one). Grover is quadratic; Deutsch-Jozsa and Bernstein-Vazirani are oracle separations.',
            },
            {
              question: 'A start-up says its algorithm "searches all $2^{50}$ possibilities simultaneously, so it finds the best one in one step". What is wrong?',
              options: [
                'Nothing, this is how superposition works',
                'Only that $2^{50}$ is too many qubits',
                'It needs 50 steps, not one',
                'Unstructured search needs about $\\sqrt{2^{50}} \\approx 3.4\\times10^7$ queries by the BBBV bound, and measuring a superposition gives a random answer',
              ],
              answer: 3,
              explanation: 'Without exploitable structure the best possible is Grover\'s $\\sim\\sqrt N$ queries, a quadratic improvement. Superposition plus measurement alone yields a random candidate.',
            },
            {
              question: 'What does "dequantisation" refer to?',
              options: [
                'Removing noise from a quantum computer',
                'A classical algorithm that matches a claimed quantum speed-up when given comparable access to the input',
                'Converting quantum states to classical bits by measurement',
                'Running a quantum algorithm on a simulator',
              ],
              answer: 1,
              explanation: 'Tang\'s 2018 recommendation-system algorithm showed that a proposed exponential quantum speed-up came from the strong data-access assumption, which also helps classical sampling algorithms.',
            },
          ],
          relatedLessons: [
            'theory-of-computation/beyond-np/a-glance-at-quantum-computation',
            'theory-of-computation/beyond-np/randomised-complexity',
            'data-structures-algorithms/analysis-foundations/asymptotic-notation',
          ],
        },
      ],
      project: {
        slug: 'oracle-algorithms-by-hand-and-on-hardware',
        title: 'Three oracle algorithms, by hand and in a simulator',
        description: `For each of Deutsch-Jozsa ($n = 3$), Bernstein-Vazirani ($n = 4$) and Simon ($n = 3$): (1) choose an oracle (a balanced function that is not a parity for Deutsch-Jozsa; a secret string of your choice; a Simon function with $s = 101$ built from CNOTs), and write its truth table; (2) trace the full state vector by hand through the circuit, or at least the amplitudes after the query and after the final Hadamards; (3) build the circuit in the widget, Quirk or Qiskit and confirm every amplitude; (4) run it with shots, and for Simon collect outputs until you can solve for $s$ by Gaussian elimination mod 2, reporting how many runs you needed. Optionally run Bernstein-Vazirani on IBM hardware and report the success probability against the number of two-qubit gates after transpilation. Finish with a one-page note classifying each separation using the checklist from the last lesson.`,
        deliverables: [
          'Truth tables, oracle circuits and hand traces for the three algorithms',
          'Simulator confirmations (screenshots or code output) matching the hand traces',
          'Simon run log with the GF(2) solution',
          'The one-page classification note',
        ],
        estimatedHours: 4,
        stretchGoals: ['Implement Simon\'s algorithm for n = 6 with a random s in Qiskit or PennyLane and automate the post-processing', 'Measure how Bernstein-Vazirani success falls with n on hardware'],
      },
    },
    {
      slug: 'fourier-phase-estimation-shor-grover',
      title: 'Fourier, Phase Estimation, Shor and Grover',
      description:
        'The two famous algorithms and the machinery behind them: the quantum Fourier transform and its circuit, phase estimation, order finding and Shor\'s factoring algorithm worked for N = 15 and N = 21, Grover search and amplitude amplification, and what all this means for complexity theory and for RSA, with dated resource estimates and post-quantum cryptography.',
      lessons: [
        {
          slug: 'quantum-fourier-transform',
          title: 'The quantum Fourier transform',
          summary:
            'The QFT as the discrete Fourier transform applied to amplitudes, small examples worked out, the product formula and the O(n²) circuit of Hadamards and controlled phases, how periodic states map to peaks, and how the QFT differs from the FFT.',
          estimatedMinutes: 110,
          objectives: [
            'Apply the QFT on N = 2ⁿ basis states to small inputs and check unitarity',
            'Derive the product form of QFT|x⟩ and the circuit with n Hadamards, n(n−1)/2 controlled phases and swaps',
            'Show that a state periodic with period r (dividing N) is mapped to peaks at multiples of N/r',
            'Explain the difference between the QFT (gates on amplitudes) and the FFT (arithmetic on numbers)',
          ],
          concepts: [
            'QFT|x⟩ = N^{−1/2} Σ_y ω^{xy}|y⟩, ω = e^{2πi/N}',
            'Product form of the QFT',
            'Circuit: H and controlled-R_k gates plus swaps',
            'Gate count O(n²) versus FFT O(n2ⁿ)',
            'Periodic states map to multiples of N/r',
            'Inverse QFT',
            'QFT versus FFT',
          ],
          explanation: `On $n$ qubits, with $N = 2^n$ and $\\omega = e^{2\\pi i/N}$, the **quantum Fourier transform** is
$$\\mathrm{QFT}|x\\rangle = \\frac{1}{\\sqrt N}\\sum_{y=0}^{N-1}\\omega^{xy}|y\\rangle.$$
It is the discrete Fourier transform matrix $F_{yx} = \\omega^{xy}/\\sqrt N$ acting on the vector of amplitudes, and it is unitary. For one qubit it is just $H$. For two qubits ($\\omega = i$), $\\mathrm{QFT}|1\\rangle = \\tfrac12(|0\\rangle + i|1\\rangle - |2\\rangle - i|3\\rangle)$, where $|2\\rangle = |10\\rangle$ in binary with qubit 0 as the most significant bit.

**Periodic states become peaks.** Take $N = 8$ and $\\tfrac{1}{\\sqrt2}(|1\\rangle + |5\\rangle)$, period 4 with offset 1. The amplitude of $|y\\rangle$ is $\\tfrac14\\omega^{y}(1 + \\omega^{4y}) = \\tfrac14\\omega^y(1 + (-1)^y)$: zero for odd $y$, magnitude $\\tfrac12$ for $y = 0, 2, 4, 6$. A state with period $r$ dividing $N$ maps to peaks at the multiples of $N/r$, and the **offset only changes phases**, which measurement ignores. This is the property Shor's algorithm exploits.

**The circuit.** Writing $x$ in binary, the output factorises into single-qubit states:
$$\\mathrm{QFT}|x\\rangle = \\tfrac{1}{\\sqrt N}\\big(|0\\rangle + e^{2\\pi i\\,0.x_{n-1}}|1\\rangle\\big)\\otimes\\big(|0\\rangle + e^{2\\pi i\\,0.x_{n-2}x_{n-1}}|1\\rangle\\big)\\otimes\\cdots\\otimes\\big(|0\\rangle + e^{2\\pi i\\,0.x_0x_1\\ldots x_{n-1}}|1\\rangle\\big),$$
with binary fractions $0.x_jx_{j+1}\\ldots$. So each output qubit needs one $H$ and controlled phase rotations $R_k = \\mathrm{diag}(1, e^{2\\pi i/2^k})$ from the less significant qubits, then the qubit order is reversed with swaps. Gate count: $n$ Hadamards, $n(n-1)/2$ controlled phases and $\\lfloor n/2\\rfloor$ swaps, $O(n^2)$ in all. Dropping the tiny rotations ($k$ beyond about $\\log n$) gives a good approximation with $O(n\\log n)$ gates.

\`\`\`interactive
qc-circuit
{"qubits": 2, "init": "01", "circuit": ["H 0", "P(pi/4) 1", "CNOT 1 0", "P(-pi/4) 0", "CNOT 1 0", "P(pi/4) 0", "H 1", "SWAP 0 1"], "palette": ["H", "P", "CNOT", "SWAP", "X"], "title": "The two-qubit QFT", "caption": "The five gates in the middle are one controlled phase R₂ = CP(π/2) built from CNOTs and P gates. With input |01⟩ (x = 1) the output amplitudes are ½(1, i, −1, −i), the powers of ω = i. Change the input with X gates to x = 2 and x = 3 and check the amplitudes against ω^(xy)/2."}
\`\`\`

**QFT is not a faster FFT.** The classical FFT takes $N = 2^n$ numbers and returns $N$ numbers in $O(n2^n)$ operations. The QFT uses only $O(n^2)$ gates, exponentially fewer, but it acts on amplitudes you cannot read: measuring the output gives one sample $y$. It is useful only inside algorithms that need a *sample* from the Fourier distribution, such as finding a period.

Watrous's phase-estimation lesson builds the QFT this way.`,
          resources: [
            ibm('fundamentals-of-quantum-algorithms', 'Lesson on phase estimation and factoring: the QFT, its circuit and its gate count.', true),
            codebook('quantum-fourier-transform', 'Quantum Fourier transform', 'Build the QFT circuit from controlled phases and check it against the matrix; the nodes include the periodic-state example.'),
            pldemo('tutorial_qft', 'Intro to the quantum Fourier transform', 'A worked demonstration with the circuit and its connection to the DFT.'),
          ],
          exercises: [
            {
              slug: 'qft-small',
              title: 'QFTs by hand',
              prompt:
                'Compute (a) $\\mathrm{QFT}_4|2\\rangle$, (b) $\\mathrm{QFT}_4|3\\rangle$, (c) $\\mathrm{QFT}_4$ of $\\tfrac12(|0\\rangle + |1\\rangle + |2\\rangle + |3\\rangle)$, (d) $\\mathrm{QFT}_8$ of $\\tfrac12(|0\\rangle + |2\\rangle + |4\\rangle + |6\\rangle)$, and (e) $\\mathrm{QFT}_8$ of $\\tfrac{1}{\\sqrt2}(|3\\rangle + |7\\rangle)$. For (e) give each output probability.',
              kind: 'problem',
              difficulty: 2,
              hint: '(a) $\\tfrac12(1, -1, 1, -1)$; (c) $|0\\rangle$; (d) $\\tfrac{1}{\\sqrt2}(|0\\rangle + |4\\rangle)$; (e) only even $y$ survive, each with probability 1/4.',
            },
            {
              slug: 'qft-product-form',
              title: 'Derive the product form and count gates',
              prompt:
                'Derive the product form of $\\mathrm{QFT}|x\\rangle$ by writing $y = \\sum_k y_k2^{n-1-k}$ and splitting $\\omega^{xy}$ into a product. Draw the circuit for $n = 3$ and count Hadamards, controlled phases (give each angle) and swaps. How many gates does $n = 2048$ need exactly, and with rotations smaller than $2\\pi/2^{20}$ dropped?',
              kind: 'derivation',
              difficulty: 3,
              hint: '$n = 3$: 3 H, controlled $R_2$, $R_3$, $R_2$, one swap. For $n = 2048$: 2048 H, 2,096,128 controlled phases, 1024 swaps; keeping $k \\le 20$ leaves at most 19 controlled phases per qubit.',
            },
            {
              slug: 'qft-vs-fft',
              title: 'QFT versus FFT in numbers',
              prompt:
                'Compare, for $n = 10, 20, 30$, the number of operations of a classical FFT on $2^n$ numbers ($\\approx n2^n$) with the number of gates in the QFT ($\\approx n^2/2$). Then explain carefully, in about 150 words, why this does not mean a quantum computer computes Fourier transforms of classical data exponentially faster. Mention state preparation and readout.',
              kind: 'writing',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'Define the QFT.',
              answerOutline: 'QFT|x⟩ = (1/√N) Σ_y e^{2πixy/N}|y⟩ on N = 2ⁿ basis states: the DFT applied to the amplitude vector.',
            },
            {
              question: 'What does the QFT do to a state with period r dividing N?',
              answerOutline: 'It produces peaks at multiples of N/r (r peaks of probability 1/r each); the offset only affects phases.',
            },
            {
              question: 'How does the QFT differ from the FFT?',
              answerOutline: 'FFT: O(N log N) arithmetic, outputs all N coefficients. QFT: O(n²) gates on amplitudes, but only one sample y can be read per run.',
            },
          ],
          quiz: [
            {
              question: 'What is $\\mathrm{QFT}_4|3\\rangle$?',
              options: [
                '$\\tfrac12(|0\\rangle - i|1\\rangle - |2\\rangle + i|3\\rangle)$',
                '$\\tfrac12(|0\\rangle + i|1\\rangle - |2\\rangle - i|3\\rangle)$',
                '$\\tfrac12(|0\\rangle - |1\\rangle + |2\\rangle - |3\\rangle)$',
                '$|3\\rangle$',
              ],
              answer: 0,
              explanation: 'The amplitudes are $\\omega^{3y}/2 = i^{3y}/2$: $1, -i, -1, i$. The second option is $\\mathrm{QFT}_4|1\\rangle$ and the third is $\\mathrm{QFT}_4|2\\rangle$.',
            },
            {
              question: 'On $n = 6$ qubits ($N = 64$), the state is a uniform superposition of $|x\\rangle$ with $x \\equiv 5 \\pmod 8$. After the QFT, which outcomes can be measured?',
              options: ['Only $y = 5$', 'Multiples of 5', 'All 64 outcomes equally', 'Multiples of 8: $y = 0, 8, 16, \\ldots, 56$'],
              answer: 3,
              explanation: 'Period $r = 8$ divides $N = 64$, so the peaks are at multiples of $N/r = 8$, each with probability 1/8. The offset 5 shows up only as phases $\\omega^{5y}$, which do not change probabilities.',
            },
            {
              question: 'Why can\'t the QFT be used to compute the Fourier coefficients of a million-sample audio file exponentially faster than an FFT?',
              options: [
                'Because the QFT is less accurate than the FFT',
                'Because loading the samples into amplitudes and reading out a million coefficients each cost at least about a million operations or measurements',
                'Because the QFT only works on 2 qubits',
                'Because the QFT is not unitary',
              ],
              answer: 1,
              explanation: 'The $O(n^2)$ gate count ignores input and output. Preparing an arbitrary state with $10^6$ amplitudes takes about $10^6$ gates, and each measurement returns one sample $y$. The QFT helps only when the input state is produced by the algorithm itself and one sample is enough.',
            },
          ],
          relatedLessons: [
            'math-methods/fourier-and-complex-analysis/fourier-transform',
            'computational-physics/spectral-methods-and-data/the-fft-in-practice',
          ],
        },
        {
          slug: 'phase-estimation',
          title: 'Quantum phase estimation',
          summary:
            'Estimating the eigenphase φ of a unitary, U|u⟩ = e^{2πiφ}|u⟩, with controlled powers U^{2^j}, phase kickback and an inverse QFT: exact for φ = k/2^t, at least 4/π² ≈ 0.405 for the nearest estimate otherwise, and the engine inside Shor\'s algorithm and quantum chemistry.',
          estimatedMinutes: 100,
          objectives: [
            'Show that controlled-U^{2^j} with target |u⟩ kicks the phase e^{2πi 2^j φ} onto the control',
            'Derive that the counting register becomes the Fourier state of φ, and that the inverse QFT reads it out',
            'Compute the outcome distribution for a phase that is not a multiple of 1/2^t',
            'Explain the cost: t counting qubits for t bits of precision, and controlled powers U^{2^j}',
          ],
          concepts: [
            'Eigenvector and eigenphase U|u⟩ = e^{2πiφ}|u⟩',
            'Controlled-U^{2^j} and phase kickback',
            'Counting register of t qubits',
            'Inverse QFT reads the binary fraction of φ',
            'Exact when φ = k/2^t',
            'P(nearest t-bit estimate) ≥ 4/π²',
            'Cost of powers U^{2^j}',
          ],
          explanation: `**The task.** You are given a circuit for a unitary $U$ and a state $|u\\rangle$ with $U|u\\rangle = e^{2\\pi i\\varphi}|u\\rangle$, $0 \\le \\varphi < 1$. Estimate $\\varphi$ to $t$ bits.

**Kickback again.** A controlled-$U$ with control in $|+\\rangle$ and target $|u\\rangle$ gives $\\tfrac{1}{\\sqrt2}(|0\\rangle + e^{2\\pi i\\varphi}|1\\rangle)|u\\rangle$: the eigenphase moves to the control, as in phase kickback with $|-\\rangle$ (which is the eigenvector of $X$ with eigenvalue $-1 = e^{2\\pi i\\cdot\\frac12}$). Using controlled-$U^{2^j}$ on counting qubit $j$ kicks back $e^{2\\pi i 2^j\\varphi}$.

**The circuit.** Put $t$ counting qubits in $|+\\rangle^{\\otimes t}$, apply controlled-$U^{2^{t-1-j}}$ from counting qubit $j$ (qubit 0 gets the largest power), then the inverse QFT, then measure. Before the inverse QFT the register is
$$\\frac{1}{\\sqrt{2^t}}\\sum_{x=0}^{2^t-1}e^{2\\pi i\\varphi x}|x\\rangle,$$
which is exactly $\\mathrm{QFT}|2^t\\varphi\\rangle$ when $2^t\\varphi$ is an integer. The inverse QFT then gives $|2^t\\varphi\\rangle$ with certainty.

**Worked example.** $U = T = \\mathrm{diag}(1, e^{i\\pi/4})$ and $|u\\rangle = |1\\rangle$: $e^{i\\pi/4} = e^{2\\pi i\\cdot\\frac18}$, so $\\varphi = 1/8$. With $t = 3$ the register reads $001$ ($= 1$, and $1/8$) every time.

**When φ is not a t-bit fraction.** The probability of outcome $y$ is
$$P(y) = \\left|\\frac{1}{2^t}\\sum_{x}e^{2\\pi i x(\\varphi - y/2^t)}\\right|^2,$$
a peaked "Fejér" distribution around $2^t\\varphi$. For $\\varphi = 1/3$ and $t = 3$ ($2^t\\varphi = 2.67$): $P(3) = 0.688$, $P(2) = 0.175$, and the rest share 0.137. In general the nearest $t$-bit estimate appears with probability at least $4/\\pi^2 \\approx 0.405$, and using a few extra counting qubits pushes the probability of a good estimate close to 1.

**Costs and uses.** $t$ bits of precision need $t$ counting qubits and the powers $U, U^2, U^4, \\ldots, U^{2^{t-1}}$. Repeating $U$ naively would cost $2^t$ applications, so phase estimation is efficient only when high powers have short circuits, as modular multiplication does ($a^{2^j}\\bmod N$ is computed classically, then one multiplication circuit). In chemistry, $U = e^{-iHt}$ and phase estimation reads off energy eigenvalues: the reason a fault-tolerant machine could compute molecular energies.

Kitaev's 1995 paper introduced this approach; the IBM lesson derives it with the same notation.`,
          resources: [
            ibm('fundamentals-of-quantum-algorithms', 'Lesson on phase estimation and factoring: the phase estimation problem, the circuit and its error analysis.', true),
            codebook('quantum-phase-estimation', 'Quantum phase estimation', 'Implement QPE for simple unitaries and see the distribution for phases that are not binary fractions.'),
            arxiv('quant-ph/9511026', 'Kitaev, Quantum measurements and the Abelian stabilizer problem (1995)', 'The paper that introduced phase estimation as the core of factoring; read the introduction.'),
            pldemo('tutorial_qpe', 'Quantum phase estimation', 'A PennyLane walkthrough with a code cell you can modify to try φ = 1/3.'),
          ],
          exercises: [
            {
              slug: 'qpe-trace',
              title: 'Trace phase estimation for S',
              prompt:
                'Run phase estimation with $t = 2$ counting qubits on $U = S$ and $|u\\rangle = |1\\rangle$. Write the counting register after the controlled powers, apply the inverse QFT by hand, and give the output. What happens with $|u\\rangle = |0\\rangle$, and with $|u\\rangle = |+\\rangle$ (not an eigenvector)?',
              kind: 'problem',
              difficulty: 2,
              hint: '$\\varphi = 1/4$ gives output 01. With $|0\\rangle$, $\\varphi = 0$, output 00. With $|+\\rangle = (|0\\rangle + |1\\rangle)/\\sqrt2$, you get 00 or 01 with probability 1/2 each, and the target collapses to the matching eigenvector.',
            },
            {
              slug: 'qpe-distribution',
              title: 'The distribution for φ = 1/3',
              prompt:
                'Compute $P(y)$ for $\\varphi = 1/3$ with $t = 3$ and $t = 5$ (a short script, or the closed form $P(y) = \\sin^2(\\pi 2^t\\delta)/(2^{2t}\\sin^2(\\pi\\delta))$ with $\\delta = \\varphi - y/2^t$). For each $t$, give the probability of the nearest estimate and of the two nearest together. Compare with $4/\\pi^2$ and $8/\\pi^2$.',
              kind: 'simulation',
              difficulty: 2,
              hint: '$t = 3$: $P(3) = 0.688$, $P(2) + P(3) = 0.863$. $t = 5$: the nearest is $y = 11$ with probability about 0.684, and $y = 10$ adds 0.171.',
            },
            {
              slug: 'qpe-cost',
              title: 'Why powers must be cheap',
              prompt:
                'Phase estimation of $e^{-iHt}$ to 20 bits needs controlled-$U^{2^j}$ for $j$ up to 19. If each $U$ costs 1000 gates and powers are made by repetition, how many gates in total? For modular multiplication by $a$ mod $N$, explain why $U^{2^j}$ (multiplication by $a^{2^j}$ mod $N$) costs the same as $U$.',
              kind: 'problem',
              difficulty: 2,
              hint: '$1000\\cdot(2^{20} - 1) \\approx 10^9$ gates. $a^{2^j}\\bmod N$ is a number computed classically by repeated squaring, so it is just multiplication by a different constant.',
            },
          ],
          selfAssessment: [
            {
              question: 'What is the input and output of phase estimation?',
              answerOutline: 'Input: controlled access to U and an eigenvector |u⟩ with eigenvalue e^{2πiφ}; output: a t-bit estimate of φ (exact if φ = k/2^t).',
            },
            {
              question: 'Why does the counting register end up in a Fourier state?',
              answerOutline: 'Counting qubit with power 2^j picks up e^{2πi2^jφ} by kickback; the product over qubits is Σ_x e^{2πiφx}|x⟩/√2^t, the QFT of |2^tφ⟩.',
            },
            {
              question: 'What is the success guarantee when φ is not a t-bit fraction?',
              answerOutline: 'The nearest t-bit estimate occurs with probability at least 4/π² ≈ 0.405; extra counting qubits raise the probability of an estimate within the desired accuracy.',
            },
          ],
          quiz: [
            {
              question: 'Phase estimation with $t = 3$ is run on $U = \\mathrm{diag}(1, e^{3\\pi i/4})$ with $|u\\rangle = |1\\rangle$. What is the output?',
              options: ['011', '110', '101', '100'],
              answer: 0,
              explanation: '$e^{3\\pi i/4} = e^{2\\pi i\\cdot\\frac38}$, so $\\varphi = 3/8$ and $2^t\\varphi = 3 = 011$. Reading 110 reverses the bit order; 100 would mean $\\varphi = 1/2$.',
            },
            {
              question: 'Phase estimation of $\\varphi = 0.3$ with $t = 4$ is run once. Which outcome is most likely?',
              options: ['$y = 3$', '$y = 4$', '$y = 0$', '$y = 5$'],
              answer: 3,
              explanation: '$2^t\\varphi = 4.8$, so the peak is at $y = 5$ (estimate $5/16 = 0.3125$), with $y = 4$ second. Reading $y = 3$ treats $0.3$ as if it were $3/10$ of 10 rather than of 16.',
            },
            {
              question: 'Why can phase estimation be applied efficiently to modular multiplication but not to an arbitrary $U$ given only as a black box?',
              options: [
                'Because modular multiplication has no eigenvectors',
                'Because only modular multiplication is unitary',
                'Because $U^{2^j}$ for modular multiplication is just multiplication by $a^{2^j}\\bmod N$, which costs the same as $U$; a black box must be applied $2^j$ times',
                'Because phase estimation needs no controlled gates for modular multiplication',
              ],
              answer: 2,
              explanation: 'High powers of a black box cost $2^j$ queries, so $t$ bits would need about $2^t$ uses. Modular exponentiation sidesteps this with classical repeated squaring of the constant $a$.',
            },
          ],
          relatedLessons: ['linear-algebra-computational/eigenvalues/eigenvalues-and-eigenvectors', 'quantum-mechanics/formalism-and-dirac-notation/time-evolution-and-the-heisenberg-picture'],
        },
        {
          slug: 'shors-algorithm',
          title: 'Order finding and Shor\'s algorithm',
          summary:
            'The classical reduction from factoring to finding the order r of a mod N, the quantum order-finding circuit (modular exponentiation plus QFT), continued fractions to turn a measured y into r, and complete worked runs for N = 15 and N = 21.',
          estimatedMinutes: 140,
          objectives: [
            'Reduce factoring N to finding the order of a random a modulo N, and say when the reduction fails',
            'Describe the order-finding circuit and why its output peaks near multiples of q/r',
            'Use continued fractions to recover r from a measured y',
            'Carry out Shor\'s algorithm by hand for N = 15 (a = 7) and N = 21 (a = 2)',
            'State the qubit and gate cost of Shor\'s algorithm for an n-bit N',
          ],
          concepts: [
            'Order r: smallest r with a^r ≡ 1 (mod N)',
            'Factors from gcd(a^{r/2} ± 1, N)',
            'Failure cases: r odd, a^{r/2} ≡ −1',
            'Modular exponentiation |x⟩|1⟩ → |x⟩|a^x mod N⟩',
            'Register size q = 2^t ≥ N²',
            'Continued fractions and convergents',
            'Cost: about 2n logical qubits, O(n³) gates',
          ],
          explanation: `**The classical reduction.** To factor an odd $N$ that is not a prime power, pick a random $a$ with $1 < a < N$. If $\\gcd(a, N) > 1$ you have a factor by luck. Otherwise let $r$ be the **order** of $a$: the smallest $r > 0$ with $a^r \\equiv 1 \\pmod N$. If $r$ is even and $a^{r/2}\\not\\equiv -1$, then $(a^{r/2} - 1)(a^{r/2} + 1) \\equiv 0$ while neither factor is $0$ mod $N$, so $\\gcd(a^{r/2}\\pm1, N)$ are nontrivial factors. At least half of all $a$ work. Only finding $r$ is hard classically.

**N = 15, a = 7.** Powers: $7, 4, 13, 1$, so $r = 4$. $7^2 = 49 \\equiv 4$, and $\\gcd(3, 15) = 3$, $\\gcd(5, 15) = 5$.

**Quantum order finding.** Use $t$ qubits with $q = 2^t \\ge N^2$ (here $q = 256$) and a second register for numbers mod $N$:
1. $H^{\\otimes t}$ gives $\\frac{1}{\\sqrt q}\\sum_x|x\\rangle|1\\rangle$;
2. modular exponentiation gives $\\frac{1}{\\sqrt q}\\sum_x|x\\rangle|a^x\\bmod N\\rangle$;
3. (conceptually) measure the second register, leaving a periodic superposition $\\sum_k|x_0 + kr\\rangle$;
4. the QFT turns period $r$ into peaks near multiples of $q/r$; measure $y$.

This is phase estimation for $U_a|z\\rangle = |az\\bmod N\\rangle$, whose eigenphases are $s/r$. For $N = 15$ the peaks are exactly at $y = 0, 64, 128, 192$, each with probability 1/4.

**Continued fractions.** $y/q \\approx s/r$ for a random $s$. Expand $y/q$ as a continued fraction and take the convergent with denominator below $N$. For $y = 192$: $192/256 = 3/4$, so $r = 4$. For $y = 128$: $1/2$, giving 2, and $7^2 \\not\\equiv 1$, so you try multiples or run again. $y = 0$ gives nothing.

\`\`\`interactive
qc-shor
{"N": 15, "a": 7, "title": "Shor's period finding for N = 15", "caption": "Step 1 shows 7^x mod 15 repeating with period 4; step 2 shows the exact distribution of y, four equal peaks at multiples of 256/4 = 64. Click each peak and follow the continued fraction to r and the factors 3 and 5. Then choose N = 21, a = 2: the peaks sit near multiples of 512/6 ≈ 85.3, and y = 85 gives the convergent 1/6, r = 6, 2³ = 8, factors 7 and 3."}
\`\`\`

**N = 21, a = 2.** Powers $2, 4, 8, 16, 11, 1$: $r = 6$. With $q = 512$ the peaks sit near $85.3k$. Measuring $y = 85$: $85/512 = [0; 6, 42, 2]$ with convergents $1/6, 42/253, \\ldots$, so $r = 6$. Then $2^3 = 8$, $\\gcd(7, 21) = 7$, $\\gcd(9, 21) = 3$. Measuring $y = 171$ gives $1/3$: denominator 3 fails ($2^3 = 8 \\ne 1$) but its multiple 6 works.

**Cost.** For an $n$-bit $N$, about $2n$ to $3n$ logical qubits and $O(n^3)$ gates, dominated by modular exponentiation. Compiled demonstrations of "factoring 15" on small devices usually build in knowledge of the answer, so they are not evidence of scalable factoring.`,
          resources: [
            ibm('fundamentals-of-quantum-algorithms', 'Lesson on phase estimation and factoring: order finding, the reduction and continued fractions.', true),
            arxiv('quant-ph/9508027', 'Shor, Polynomial-time algorithms for prime factorization and discrete logarithms on a quantum computer (1995)', 'The paper; sections 1, 4 and 5 cover the reduction and order finding.'),
            codebook('shors-algorithm', 'Shor\'s algorithm', 'Nodes that implement each step, including modular exponentiation for N = 15.'),
            shorLN('Shor\'s own lecture notes on factoring and continued fractions from 8.370.'),
          ],
          exercises: [
            {
              slug: 'shor-15-all-a',
              title: 'Every base for N = 15',
              prompt:
                'For each $a$ in $\\{2, 4, 7, 8, 11, 13, 14\\}$, compute the order of $a$ modulo 15 and decide whether Shor\'s reduction succeeds; when it does, give the factors. What fraction of the bases coprime to 15 succeed?',
              kind: 'problem',
              difficulty: 1,
              hint: 'Orders: 2→4, 4→2, 7→4, 8→4, 11→2, 13→4, 14→2. For $a = 14$, $14 \\equiv -1$, so $a^{r/2} \\equiv -1$ fails. $a = 4$: $\\gcd(3, 15) = 3$, $\\gcd(5, 15) = 5$; $a = 11$: $\\gcd(10, 15) = 5$, $\\gcd(12, 15) = 3$.',
            },
            {
              slug: 'continued-fractions',
              title: 'Continued fractions in practice',
              prompt:
                'With $N = 21$, $a = 2$ and $q = 512$, the measurement gives $y = 427$. Compute the continued fraction of $427/512$ and all its convergents, pick the one with denominator below 21, and check whether it gives the order. Repeat for $y = 341$ and $y = 256$ and explain each result.',
              kind: 'problem',
              difficulty: 2,
              hint: '$427/512 = [0; 1, 5, 42, 2]$: convergents $1, 5/6, \\ldots$, so $r = 6$. $341/512 = [0; 1, 1, 1, 170]$ gives $2/3$: try multiples of 3. $256/512 = 1/2$ gives $r$ candidate 2 ($2^2 = 4 \\ne 1$), multiples 4 and 6: 6 works.',
            },
            {
              slug: 'shor-35-widget',
              title: 'Shor in the widget for N = 35',
              prompt:
                'In the widget choose $N = 35$. Find a base $a$ for which the reduction succeeds and one for which it fails, and explain each. For the successful base, list the peak positions and their probabilities, sample $y$ five times, and record which samples led directly to $r$. Estimate from the distribution the probability that a single run succeeds.',
              kind: 'simulation',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does knowing the order r of a mod N give factors?',
              answerOutline: 'a^r − 1 = (a^{r/2} − 1)(a^{r/2} + 1) ≡ 0 mod N; if r is even and a^{r/2} ≢ ±1, each gcd(a^{r/2} ± 1, N) is a proper factor.',
            },
            {
              question: 'What does the measured y tell you, and how do you extract r?',
              answerOutline: 'y/q ≈ s/r for random s; the continued-fraction convergent with denominator below N gives r (or a divisor of r if gcd(s, r) > 1).',
            },
            {
              question: 'When does a run of Shor\'s algorithm fail?',
              answerOutline: 'r odd; a^{r/2} ≡ −1 (mod N); the sampled s shares a factor with r (giving a divisor of r); or y = 0. Then repeat or pick another a.',
            },
          ],
          quiz: [
            {
              question: 'For $N = 21$ and $a = 5$, the order is $r = 6$. Does the reduction succeed?',
              options: [
                'Yes: $\\gcd(5^3 - 1, 21) = 1$ and $\\gcd(5^3 + 1, 21) = 21$ give 3 and 7',
                'No: $5^3 = 125 \\equiv 20 \\equiv -1 \\pmod{21}$, so both gcds are trivial',
                'No, because 6 is even',
                'Yes, the factors are 5 and 6',
              ],
              answer: 1,
              explanation: '$125 = 5\\cdot21 + 20$, so $5^3 \\equiv -1$. Then $\\gcd(124, 21) = 1$ and $\\gcd(126, 21) = 21$: trivial. An even $r$ is necessary but not sufficient.',
            },
            {
              question: 'In Shor\'s algorithm for $N = 15$, $a = 7$ with $q = 256$, the measurement gives $y = 128$. What does the continued-fraction step give, and what should you do?',
              options: [
                '$r = 4$ directly',
                '$r = 128$',
                'Candidate 2, which fails ($7^2 \\equiv 4$); try its multiples or run again, and 4 works',
                'The factors 3 and 5 directly',
              ],
              answer: 2,
              explanation: '$128/256 = 1/2$ corresponds to $s/r = 2/4$ with $\\gcd(s, r) = 2$, so only a divisor of $r$ appears. Checking multiples (4) or combining with another run recovers $r = 4$.',
            },
            {
              question: 'Why must the first register have $q = 2^t \\ge N^2$ rather than just $q \\ge N$?',
              options: [
                'So that the continued-fraction expansion of $y/q$ pins down $s/r$ uniquely among fractions with denominator below $N$',
                'Because modular exponentiation needs $N^2$ qubits',
                'To make the QFT unitary',
                'It need not; $q = N$ always suffices',
              ],
              answer: 0,
              explanation: 'Two distinct fractions with denominators below $N$ differ by more than $1/N^2$, so if $|y/q - s/r| \\le 1/(2q) \\le 1/(2N^2)$ the convergent is unique. That needs $t \\approx 2\\log_2 N$ bits.',
            },
            {
              question: 'Which statement about Shor\'s algorithm is correct?',
              options: [
                'It solves all NP problems because factoring is NP-complete',
                'It needs about $2^n$ qubits to factor an $n$-bit number',
                'It factors with certainty on the first run',
                'It runs in time polynomial in $n$ (about $n^3$ gates), using a few times $n$ logical qubits',
              ],
              answer: 3,
              explanation: 'Factoring is not believed to be NP-complete; it is in NP ∩ coNP. Shor uses $O(n)$ logical qubits and $O(n^3)$ gates and succeeds with constant probability per run, so a few repetitions suffice.',
            },
          ],
          relatedLessons: [
            'number-theory/primitive-roots/orders-modulo-n',
            'number-theory/further-topics/continued-fractions',
            'number-theory/divisibility/gcd-and-the-euclidean-algorithm',
          ],
        },
        {
          slug: 'grover-search-and-amplitude-amplification',
          title: 'Grover search and amplitude amplification',
          summary:
            'Searching N items with about (π/4)√N oracle queries: the oracle and diffusion as two reflections, inversion about the mean, the rotation by 2θ with sin θ = √(M/N), the optimal iteration count and overshoot, amplitude amplification in general, and the √N lower bound.',
          estimatedMinutes: 120,
          objectives: [
            'Apply one Grover iteration by hand (oracle, then inversion about the mean) for N = 4 and N = 8',
            'Derive the 2D rotation picture and the success probability sin²((2k+1)θ)',
            'Compute the optimal number of iterations for given N and M and explain overshoot',
            'Generalise to amplitude amplification of any algorithm with success probability p',
            'State the BBBV lower bound and why Grover gives only a quadratic speed-up',
          ],
          concepts: [
            'Phase oracle marking M of N items',
            'Diffusion D = 2|s⟩⟨s| − I (inversion about the mean)',
            'Two reflections make a rotation by 2θ',
            'sin θ = √(M/N)',
            'Success probability sin²((2k+1)θ)',
            'Optimal k ≈ (π/4)√(N/M); overshoot',
            'Amplitude amplification: O(1/√p) repetitions',
            'Optimality: Ω(√N) queries',
          ],
          explanation: `**Set-up.** A phase oracle marks $M$ of $N = 2^n$ items: $O|x\\rangle = -|x\\rangle$ for marked $x$. Start in the uniform superposition $|s\\rangle = H^{\\otimes n}|0^n\\rangle$. One **Grover iteration** is the oracle followed by the **diffusion** $D = 2|s\\rangle\\langle s| - I = H^{\\otimes n}(2|0\\rangle\\langle0| - I)H^{\\otimes n}$.

**Inversion about the mean.** $D$ maps each amplitude $a_x$ to $2\\bar a - a_x$, where $\\bar a$ is the mean amplitude. For $N = 4$ with $|11\\rangle$ marked: start $(\\tfrac12, \\tfrac12, \\tfrac12, \\tfrac12)$; the oracle gives $(\\tfrac12, \\tfrac12, \\tfrac12, -\\tfrac12)$, mean $\\tfrac14$; inversion gives $(0, 0, 0, 1)$. One query finds the item **with certainty**, where a classical search needs 2.25 queries on average.

**Geometry.** Everything happens in the plane spanned by $|w\\rangle$ (the normalised sum of marked states) and $|s'\\rangle$ (the sum of unmarked states). The start $|s\\rangle$ makes angle $\\theta$ with $|s'\\rangle$, where $\\sin\\theta = \\sqrt{M/N}$. The oracle reflects about $|s'\\rangle$, the diffusion reflects about $|s\\rangle$, and **two reflections make a rotation** by $2\\theta$. After $k$ iterations the angle is $(2k+1)\\theta$, so
$$P_{\\text{success}}(k) = \\sin^2\\big((2k+1)\\theta\\big).$$
For $N = 8$, $M = 1$: $\\theta = 20.7°$, $P = 0.781$ after one iteration, $0.945$ after two, and **0.330 after three**: rotating past $|w\\rangle$ makes things worse (overshoot). The best $k$ is about $\\frac{\\pi}{4}\\sqrt{N/M}$; for $N = 2^{20}$, 804 iterations instead of about half a million classical guesses.

\`\`\`interactive
qc-grover
{"n": 3, "marked": [5], "title": "Grover search on 8 items", "caption": "Press Oracle and watch the marked bar flip below the axis, then Diffusion and watch every bar reflect about the dashed mean. After two full iterations P(success) is 0.945; a third drops it to 0.33, visible both in the rotation picture and on the curve. Mark a second item and see the optimum fall to one iteration."}
\`\`\`

**Amplitude amplification.** Replace $H^{\\otimes n}$ by any algorithm $\\mathcal{A}$ that succeeds with probability $p$, and reflect about $\\mathcal{A}|0\\rangle$ instead of $|s\\rangle$: about $\\frac{\\pi}{4\\sqrt p}$ rounds raise the success probability near 1, against about $1/p$ classical repetitions. If $M$ is unknown, try random iteration counts from a growing range (Boyer, Brassard, Høyer and Tapp), still $O(\\sqrt{N/M})$ queries.

**Quadratic, not exponential.** Bennett, Bernstein, Brassard and Vazirani proved that every quantum algorithm needs $\\Omega(\\sqrt N)$ queries for unstructured search, so Grover is optimal. Applied to SAT with $n$ variables it gives about $2^{n/2}$ steps instead of $2^n$: still exponential.`,
          resources: [
            ibm('fundamentals-of-quantum-algorithms', 'Lesson on Grover\'s algorithm: the iteration, the geometric analysis, unknown numbers of solutions and optimality.', true),
            arxiv('quant-ph/9605043', 'Grover, A fast quantum mechanical algorithm for database search (1996)', 'The original short paper.'),
            codebook('grovers-algorithm', 'Grover\'s algorithm', 'Build the oracle and diffusion operator and verify the success probability for small N.'),
            pldemo('tutorial_grovers_algorithm', 'Grover\'s algorithm', 'A PennyLane walkthrough including multiple marked items.'),
          ],
          exercises: [
            {
              slug: 'grover-by-hand-8',
              title: 'Grover on 8 items by hand',
              prompt:
                'With $N = 8$ and item 5 marked, start from amplitudes $1/\\sqrt8 \\approx 0.354$. Apply oracle and inversion about the mean twice, giving all eight amplitudes after each step, and the success probability after each iteration. Check against $\\sin^2(3\\theta)$ and $\\sin^2(5\\theta)$ with $\\sin\\theta = 1/\\sqrt8$, and against the widget.',
              kind: 'problem',
              difficulty: 2,
              hint: 'After one iteration: unmarked $1/(4\\sqrt2) \\approx 0.177$, marked $5/(4\\sqrt2) \\approx 0.884$ (probability 0.781). After two: unmarked $-1/(8\\sqrt2) \\approx -0.088$, marked $11/(8\\sqrt2) \\approx 0.972$ (0.945).',
            },
            {
              slug: 'grover-iteration-counts',
              title: 'Iteration counts',
              prompt:
                'Give the optimal number of iterations $k = \\mathrm{round}(\\pi/(4\\theta) - 1/2)$ and the success probability for: $N = 16, M = 1$; $N = 16, M = 4$; $N = 64, M = 1$; $N = 100, M = 1$ (pad to the nearest valid case if needed, or treat $N$ abstractly); $N = 2^{40}, M = 1$. For $N = 16$, $M = 4$, explain why one iteration is exactly right.',
              kind: 'problem',
              difficulty: 2,
              hint: '16/1: 3 iterations, 0.961. 16/4: $\\theta = 30°$, one iteration gives $\\sin^2 90° = 1$. 64/1: 6, 0.997. 100/1: 7, 0.995. $2^{40}$: about 823,550.',
            },
            {
              slug: 'grover-circuit',
              title: 'Build Grover\'s circuit for two qubits',
              prompt:
                'Build Grover\'s algorithm for $N = 4$ with $|10\\rangle$ marked in the circuit widget (start from the grover2 preset, which marks $|11\\rangle$, and change the oracle with $X$ gates). Show that the diffusion part $H^{\\otimes2}X^{\\otimes2}\\,\\mathrm{CZ}\\,X^{\\otimes2}H^{\\otimes2}$ equals $-(2|s\\rangle\\langle s| - I)$, and explain why the overall sign does not matter.',
              kind: 'simulation',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What does the diffusion operator do to amplitudes?',
              answerOutline: 'It inverts each amplitude about the mean: a_x → 2ā − a_x; equivalently it is the reflection 2|s⟩⟨s| − I.',
            },
            {
              question: 'Give the success probability after k iterations and the optimal k.',
              answerOutline: 'sin²((2k+1)θ) with sin θ = √(M/N); optimal k ≈ π/(4θ) − 1/2 ≈ (π/4)√(N/M).',
            },
            {
              question: 'Why is Grover only a quadratic speed-up, and why does that matter for NP?',
              answerOutline: 'BBBV: unstructured search needs Ω(√N) queries; brute-force SAT still takes about 2^{n/2} steps, exponential.',
            },
          ],
          quiz: [
            {
              question: 'Grover search on $N = 16$ items with one marked item. What is the success probability after 2 iterations?',
              options: ['0.473', '0.908', '0.961', '1'],
              answer: 1,
              explanation: '$\\theta = \\arcsin(1/4) = 14.48°$, and $\\sin^2(5\\theta) = \\sin^2(72.4°) = 0.908$. One iteration gives 0.473 and three give the optimum 0.961; it never reaches exactly 1 here.',
            },
            {
              question: 'After one oracle call on $N = 8$ with one marked item, the amplitudes are $0.354$ (seven times) and $-0.354$. What is the marked amplitude after the diffusion step?',
              options: ['0.354', '0.177', '0.884', '0.972'],
              answer: 2,
              explanation: 'The mean is $(7\\cdot0.354 - 0.354)/8 = 0.265$; the marked amplitude becomes $2(0.265) - (-0.354) = 0.884$, and the unmarked ones $2(0.265) - 0.354 = 0.177$. 0.972 is the value after the second iteration.',
            },
            {
              question: 'Someone runs Grover on $N = 2^{20}$ with one marked item but does 1608 iterations instead of 804. What happens?',
              options: [
                'The success probability is close to 1, even better than with 804',
                'The success probability is close to 0: the state has rotated by about $\\pi$ past the target',
                'The algorithm fails to terminate',
                'The success probability is about 1/2',
              ],
              answer: 1,
              explanation: 'With $(2k+1)\\theta \\approx \\pi$ the state points back near $-|s\\rangle$, almost orthogonal to $|w\\rangle$. Grover\'s success oscillates; more iterations are not better.',
            },
            {
              question: 'Which speed-up does Grover\'s algorithm give for finding a satisfying assignment of an $n$-variable Boolean formula by brute force?',
              options: [
                'From $2^n$ to $n^3$',
                'From $2^n$ to $2^{n/2}$, still exponential',
                'From $2^n$ to $2^{\\sqrt n}$',
                'None at all',
              ],
              answer: 1,
              explanation: 'Grover turns $N = 2^n$ candidates into about $\\sqrt N = 2^{n/2}$ queries. That is a real but quadratic gain; it does not make NP-complete problems polynomial.',
            },
          ],
          relatedLessons: ['theory-of-computation/beyond-np/a-glance-at-quantum-computation', 'data-structures-algorithms/sorting-and-searching/elementary-sorts-and-binary-search'],
        },
        {
          slug: 'complexity-cryptography-and-resource-estimates',
          title: 'BQP, what quantum computers cannot do, and the threat to RSA',
          summary:
            'The class BQP and where it sits among P, NP and PSPACE; why NP-complete problems are not believed to be easy for quantum computers; what Shor breaks (RSA, elliptic curves) and what Grover weakens (symmetric keys); dated resource estimates for RSA-2048; and post-quantum cryptography.',
          estimatedMinutes: 100,
          objectives: [
            'Define BQP and state the known inclusions BPP ⊆ BQP ⊆ PP ⊆ PSPACE',
            'Explain why factoring in BQP does not imply NP ⊆ BQP',
            'Say which cryptosystems Shor breaks and how Grover affects symmetric keys and hashes',
            'Summarise the 2019 and 2025 resource estimates for factoring RSA-2048, with their assumptions',
            'Name the NIST post-quantum standards and explain "harvest now, decrypt later"',
          ],
          concepts: [
            'BQP (bounded-error quantum polynomial time)',
            'BPP ⊆ BQP ⊆ PP ⊆ PSPACE',
            'Factoring in NP ∩ coNP, not believed NP-complete',
            'NP-complete problems not believed in BQP',
            'QMA and the local Hamiltonian problem',
            'Shor breaks RSA, Diffie-Hellman, elliptic curves',
            'Grover halves symmetric key length in bits',
            'Post-quantum cryptography: ML-KEM, ML-DSA, SLH-DSA',
          ],
          explanation: `**BQP** is the class of decision problems a quantum computer solves in polynomial time with error at most 1/3. Known: $\\mathrm{P}\\subseteq\\mathrm{BPP}\\subseteq\\mathrm{BQP}\\subseteq\\mathrm{PP}\\subseteq\\mathrm{PSPACE}$. None of these inclusions is known to be strict; proving BQP ≠ BPP would prove P ≠ PSPACE.

**What quantum computers are not believed to do.** Factoring is in BQP and lies in NP ∩ coNP, which is why it is *not* believed to be NP-complete. Nobody knows an efficient quantum algorithm for an NP-complete problem such as SAT or the travelling salesman problem, and there is evidence against one: the BBBV bound shows that any approach treating the problem as a black box gains only a square root. So the honest statement is "quantum computers are not believed to solve NP-complete problems efficiently", not "they cannot". The natural quantum analogue of NP is **QMA**, and Kitaev showed the **local Hamiltonian problem** (estimating a ground-state energy) is QMA-complete: even quantum computers are not expected to find ground states of arbitrary Hamiltonians efficiently.

**What Shor breaks.** RSA, finite-field Diffie-Hellman and elliptic-curve cryptography all rest on factoring or discrete logarithms, which Shor solves in polynomial time. Grover only gives a square root speed-up against symmetric ciphers and hashes, so AES-256 keeps about 128 bits of security; the fix is longer keys, not new algorithms.

**How big a machine?** Estimates change as algorithms and error correction improve, so always cite the date and the assumptions:
- Gidney and Ekerå (2019): RSA-2048 in about 8 hours with **20 million** noisy physical qubits.
- Gidney (May 2025, arXiv 2505.15917): **under one million** noisy qubits running for **under a week**, assuming a square grid with nearest-neighbour coupling, 0.1 % gate error, a 1 μs surface-code cycle and 10 μs control reaction time.

As of late 2026 the largest machines have a few thousand physical qubits at most, and logical-qubit demonstrations involve tens of logical qubits, many only error-detected (module 9), so no one can run this yet.

**Post-quantum cryptography.** In August 2024 NIST published FIPS 203 (ML-KEM, a lattice-based key encapsulation), FIPS 204 (ML-DSA, lattice signatures) and FIPS 205 (SLH-DSA, hash-based signatures), and in March 2025 selected HQC as a backup KEM; all run on ordinary computers. The urgency comes from **"harvest now, decrypt later"**: data encrypted today can be recorded and decrypted once a large machine exists, so long-lived secrets need post-quantum protection years in advance.`,
          resources: [
            arxiv('2505.15917', 'Gidney, How to factor 2048 bit RSA integers with less than a million noisy qubits (2025)', 'The current headline estimate; read the abstract and the assumptions table, and compare with the 2019 paper it updates.', ),
            arxiv('1905.09749', 'Gidney and Ekerå, How to factor 2048 bit RSA integers in 8 hours using 20 million noisy qubits (2019)', 'The previous standard estimate, useful for seeing what changed in six years.'),
            free('NIST Post-Quantum Cryptography project', 'https://csrc.nist.gov/projects/post-quantum-cryptography', 'documentation', 'NIST', 'The standards (FIPS 203, 204, 205), the selection of HQC and migration guidance.', true),
            aaronson('Lectures on quantum complexity theory: BQP, its relation to NP and PH, and why NP-complete problems are believed hard for quantum computers.'),
          ],
          exercises: [
            {
              slug: 'complexity-map',
              title: 'Draw the complexity map',
              prompt:
                'Draw a diagram of P, BPP, NP, coNP, BQP, PP and PSPACE showing every inclusion that is known, and mark where factoring, graph isomorphism, SAT, simulating quantum systems and the local Hamiltonian problem sit (as known or believed). Label each placement "proven" or "believed". Use the theory-of-computation lesson for the classical classes.',
              kind: 'writing',
              difficulty: 2,
            },
            {
              slug: 'key-length-after-grover',
              title: 'Symmetric keys after Grover',
              prompt:
                'Grover needs about $\\frac{\\pi}{4}2^{k/2}$ iterations to search a $k$-bit key space. For AES-128 and AES-256, compute the number of iterations. If one error-corrected Grover iteration (including the AES circuit) took 1 ms, how long would each attack take? Explain why parallelising over $m$ machines helps Grover less than it helps classical brute force.',
              kind: 'problem',
              difficulty: 2,
              hint: 'AES-128: $\\approx 1.4\\times10^{19}$ iterations, about $4.6\\times10^8$ years at 1 ms. Splitting the space over $m$ machines reduces each search to $\\sqrt{N/m}$, a speed-up of only $\\sqrt m$.',
            },
            {
              slug: 'estimate-reading',
              title: 'Read a resource estimate',
              prompt:
                'Read the abstract and introduction of Gidney (2025). List: the number of logical qubits, the physical qubit count, the run time, the assumed physical error rate, the code cycle time, and the two or three main ideas that reduced the count from 20 million. Then write 200 words on which assumption you think is hardest to meet in hardware and why, citing module 9 when you reach it.',
              kind: 'reading',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What is BQP and what is known about its relation to NP?',
              answerOutline: 'Problems solvable by polynomial-time quantum circuits with bounded error; BPP ⊆ BQP ⊆ PP ⊆ PSPACE; NP ⊆ BQP is believed false and BQP ⊆ NP is not expected either.',
            },
            {
              question: 'Which cryptography does Shor break, and what does Grover do to AES?',
              answerOutline: 'RSA, Diffie-Hellman and elliptic curves fall to Shor; Grover roughly halves the effective key length of symmetric ciphers, so AES-256 remains strong.',
            },
            {
              question: 'Summarise the 2025 RSA-2048 estimate with its assumptions.',
              answerOutline: 'Gidney 2025: under a million noisy qubits, under a week; 0.1 % gate errors, 1 μs cycle, 10 μs reaction time, nearest-neighbour grid; down from 20 million qubits (2019).',
            },
          ],
          quiz: [
            {
              question: 'Shor\'s algorithm shows that factoring is in BQP. What follows for NP-complete problems?',
              options: [
                'Nothing directly: factoring is not believed NP-complete, so NP-complete problems are still believed hard for quantum computers',
                'They are all in BQP, since factoring is in NP',
                'They are proven not to be in BQP',
                'They can be solved with Grover in polynomial time',
              ],
              answer: 0,
              explanation: 'Factoring is in NP ∩ coNP and would collapse the polynomial hierarchy if NP-complete, so few believe it is. No proof rules out NP ⊆ BQP either; it is a belief based on lower bounds such as BBBV.',
            },
            {
              question: 'Which statement compares the speed-ups of Shor and Grover correctly?',
              options: [
                'Both are quadratic',
                'Both are exponential',
                'Shor is quadratic and Grover exponential',
                'Shor is exponential over the best known classical algorithm for a structured problem; Grover is quadratic for unstructured search and provably optimal',
              ],
              answer: 3,
              explanation: 'Shor exploits periodicity through the QFT; Grover only amplifies amplitudes and cannot beat $\\sqrt N$ queries. Mixing them up leads to the false claim that quantum computers make all search exponentially faster.',
            },
            {
              question: 'As of the 2025 estimate, roughly how many noisy physical qubits would factor RSA-2048 in under a week, under what key assumption?',
              options: [
                'About 4000, with perfect qubits',
                'About 20 million, with 0.01 % gate errors',
                'Under one million, with 0.1 % gate errors and a 1 μs error-correction cycle',
                'About $2^{2048}$',
              ],
              answer: 2,
              explanation: 'Gidney (2025) estimated under a million qubits at a 0.1 % uniform gate error, down from 20 million in Gidney and Ekerå (2019). About 4000 is roughly the number of *logical* qubits in older estimates, not physical ones.',
            },
          ],
          relatedLessons: [
            'theory-of-computation/beyond-np/a-glance-at-quantum-computation',
            'theory-of-computation/np-completeness/classic-np-complete-problems',
            'number-theory/fermat-and-euler/rsa',
            'cybersecurity/applied-cryptography/public-key-crypto-and-key-exchange',
          ],
        },
      ],
      project: {
        slug: 'shor-and-grover-by-hand',
        title: 'Shor on N = 15 and N = 21, and Grover on 8 items, by hand and in a simulator',
        description: `(1) **Shor for N = 15.** For $a = 7$, write the state after modular exponentiation with $q = 256$ (as a sum over the four residues), the state of the first register after measuring the second register gives 4, its QFT, and the four outcomes. For each outcome, do the continued-fraction step and the gcds. (2) **Shor for N = 21.** For $a = 2$ and $q = 512$, compute the probability distribution (with the qc-shor widget or a 20-line script) and the probability that one run yields $r = 6$ directly. (3) **Grover for N = 8.** Two iterations by hand with all amplitudes, then the three-qubit circuit (the grover3 preset or your own) with the measured success rate over 1000 shots. (4) **Resource note.** Using Gidney (2025), estimate the physical qubits and time to factor RSA-2048, list the assumptions and state what a hardware team would need to demonstrate first. Optional: run the compiled 15 = 3 × 5 circuit on IBM hardware and explain why it is not evidence of scalable factoring.`,
        deliverables: [
          'Hand calculations for Shor with N = 15 and N = 21, including continued fractions for every peak',
          'The N = 21 distribution and the single-run success probability',
          'Grover hand trace and simulator results for N = 8',
          'A one-page dated resource note on RSA-2048',
        ],
        estimatedHours: 5,
        stretchGoals: ['Implement the full order-finding circuit for N = 15 in Qiskit with a modular-multiplication oracle built from SWAPs and CNOTs', 'Implement amplitude amplification for a 3-qubit algorithm whose success probability is 0.1 and show the improvement'],
      },
    },
    {
      slug: 'mixed-states-and-noise',
      title: 'Mixed States and Noise',
      description:
        'The language of real, imperfect qubits: density operators and the Bloch ball, partial trace and reduced states, quantum channels with Kraus operators (bit flip, phase flip, depolarising, amplitude damping), T1 and T2, fidelity, and how noise limits the depth of a useful circuit.',
      lessons: [
        {
          slug: 'density-operators',
          title: 'Density operators: pure and mixed states',
          summary:
            'Describing uncertainty about a quantum state with ρ = Σ p_i |ψ_i⟩⟨ψ_i|; probabilities Tr(Pρ) and expectations Tr(Aρ); purity Tr ρ²; the Bloch ball ρ = (I + r·σ)/2; and the difference between a superposition and a mixture.',
          estimatedMinutes: 100,
          objectives: [
            'Build the density matrix of a pure state and of an ensemble of states',
            'Compute measurement probabilities Tr(P_k ρ) and expectation values Tr(Aρ)',
            'Test purity with Tr ρ² and locate any qubit state in the Bloch ball',
            'Show that different ensembles can give the same ρ and are then indistinguishable',
            'Distinguish |+⟩ from the 50/50 mixture of |0⟩ and |1⟩ by their density matrices',
          ],
          concepts: [
            'Density operator ρ = Σ p_i |ψ_i⟩⟨ψ_i|',
            'Properties: Hermitian, positive, trace 1',
            'Born rule Tr(P_k ρ), expectation Tr(Aρ)',
            'Purity Tr ρ² (1 for pure, 1/2 minimum for a qubit)',
            'Bloch ball ρ = (I + r·σ)/2, |r| ≤ 1',
            'Superposition versus mixture',
            'Different ensembles, same ρ',
            'Coherences (off-diagonal entries)',
          ],
          explanation: `Real qubits are rarely in a known pure state: preparation is imperfect, and noise entangles them with the environment. If a qubit is in $|\\psi_i\\rangle$ with probability $p_i$, the **density operator**
$$\\rho = \\sum_i p_i|\\psi_i\\rangle\\langle\\psi_i|$$
contains everything measurable. Probabilities become $P(k) = \\mathrm{Tr}(P_k\\rho)$ and expectations $\\langle A\\rangle = \\mathrm{Tr}(A\\rho)$; for a pure state $\\rho = |\\psi\\rangle\\langle\\psi|$ these reduce to the old formulas. Every density matrix is Hermitian, positive semidefinite and has trace 1.

**Superposition versus mixture.** Compare
$$|{+}\\rangle\\langle{+}| = \\tfrac12\\begin{pmatrix}1&1\\\\1&1\\end{pmatrix}\\qquad\\text{and}\\qquad \\tfrac12|0\\rangle\\langle0| + \\tfrac12|1\\rangle\\langle1| = \\tfrac12\\begin{pmatrix}1&0\\\\0&1\\end{pmatrix}.$$
Same diagonal (both 50/50 in $Z$); different off-diagonal **coherences**. Measure $X$: $\\mathrm{Tr}(X\\rho) = 1$ for the superposition and 0 for the mixture. Decoherence (next lessons) is precisely the decay of those off-diagonal entries.

**Purity and the Bloch ball.** $\\mathrm{Tr}\\,\\rho^2 = 1$ exactly for pure states and is smaller for mixed ones (minimum $1/2$ for a qubit, at $I/2$). Every qubit density matrix can be written
$$\\rho = \\tfrac12(I + r_xX + r_yY + r_zZ),\\qquad |\\vec r| \\le 1,\\qquad \\mathrm{Tr}\\,\\rho^2 = \\tfrac{1 + |\\vec r|^2}{2}.$$
Pure states are on the sphere, mixed states inside, the **maximally mixed** state $I/2$ at the centre.

**Worked example.** A preparation gives $|0\\rangle$ with probability 0.75 and $|+\\rangle$ with probability 0.25:
$$\\rho = 0.75\\begin{pmatrix}1&0\\\\0&0\\end{pmatrix} + 0.25\\cdot\\tfrac12\\begin{pmatrix}1&1\\\\1&1\\end{pmatrix} = \\begin{pmatrix}0.875&0.125\\\\0.125&0.125\\end{pmatrix}.$$
$r_z = 0.875 - 0.125 = 0.75$, $r_x = 2(0.125) = 0.25$, so $|\\vec r|^2 = 0.625$ and purity $0.8125$; check: $0.875^2 + 2(0.125)^2 + 0.125^2 = 0.8125$.

**Same ρ, same physics.** The 50/50 mixture of $|0\\rangle, |1\\rangle$ and the 50/50 mixture of $|+\\rangle, |-\\rangle$ both give $I/2$. No experiment can tell them apart, so the density matrix, not the "list of states", is the physical description. This is also why a mixed state is not "a superposition we do not know": the ensemble behind a given $\\rho$ is not even unique.

Read Watrous's general-formulation course lesson 1 on density matrices.`,
          resources: [
            ibm('general-formulation-of-quantum-information', 'Lesson 1, Density matrices: definitions, the Bloch ball and convex combinations, with worked examples.', true),
            codebook('noisy-quantum-theory', 'Noisy quantum theory', 'Nodes on mixed states and density matrices, with code to compute purity and expectation values.'),
            preskill('Chapter 2 (foundations II): density operators, the Bloch ball and the ambiguity of ensembles.'),
          ],
          exercises: [
            {
              slug: 'density-practice',
              title: 'Density matrices by hand',
              prompt:
                'Write the density matrix, Bloch vector and purity of: (a) $|+i\\rangle$; (b) $|0\\rangle$ with probability 0.9 and $|1\\rangle$ with probability 0.1; (c) $|+\\rangle$ with probability 1/2 and $|+i\\rangle$ with probability 1/2; (d) $\\tfrac{1}{\\sqrt5}(|0\\rangle + 2|1\\rangle)$. For each, give $P(+)$ in an $X$ measurement using $\\mathrm{Tr}(|+\\rangle\\langle+|\\rho)$.',
              kind: 'problem',
              difficulty: 1,
              hint: '(b) $r = (0, 0, 0.8)$, purity 0.82, $P(+) = 0.5$. (c) $r = (0.5, 0.5, 0)$, purity 0.75, $P(+) = 0.75$. (d) $r = (0.8, 0, -0.6)$, pure, $P(+) = 0.9$.',
            },
            {
              slug: 'same-rho',
              title: 'Two ensembles, one state',
              prompt:
                'Show that the ensemble {$|0\\rangle$ w.p. 1/2, $|+\\rangle$ w.p. 1/2} has the same density matrix as an ensemble of the two eigenvectors of that matrix with suitable probabilities. Find the eigenvalues and eigenvectors. Then explain in a paragraph why no measurement can tell the two ensembles apart.',
              kind: 'derivation',
              difficulty: 2,
              hint: '$\\rho = \\begin{pmatrix}0.75&0.25\\\\0.25&0.25\\end{pmatrix}$, eigenvalues $\\tfrac12 \\pm \\tfrac{\\sqrt2}{4} \\approx 0.854, 0.146$, eigenvectors $\\cos\\tfrac\\pi8|0\\rangle + \\sin\\tfrac\\pi8|1\\rangle$ and its orthogonal partner.',
            },
            {
              slug: 'bloch-ball-check',
              title: 'Which matrices are states?',
              prompt:
                'Decide which are valid density matrices and give the Bloch vector of each valid one: (a) $\\begin{pmatrix}0.5&0.5\\\\0.5&0.5\\end{pmatrix}$; (b) $\\begin{pmatrix}0.6&0.5\\\\0.5&0.4\\end{pmatrix}$; (c) $\\begin{pmatrix}0.7&0.2i\\\\-0.2i&0.3\\end{pmatrix}$; (d) $\\begin{pmatrix}1.2&0\\\\0&-0.2\\end{pmatrix}$.',
              kind: 'problem',
              difficulty: 2,
              hint: '(b) $|\\vec r|^2 = 1 + 0.04 > 1$: not positive. (c) $r = (0, -0.4, 0.4)$: valid ($r_y = -2\\,\\mathrm{Im}\\,\\rho_{01}$). (d) negative eigenvalue.',
            },
          ],
          selfAssessment: [
            {
              question: 'How do you compute probabilities and expectation values from ρ?',
              answerOutline: 'P(k) = Tr(P_k ρ); ⟨A⟩ = Tr(Aρ).',
            },
            {
              question: 'What distinguishes |+⟩⟨+| from I/2?',
              answerOutline: 'Same diagonal, but |+⟩⟨+| has off-diagonal coherences 1/2; it gives ⟨X⟩ = 1 and purity 1, while I/2 gives ⟨X⟩ = 0 and purity 1/2.',
            },
            {
              question: 'Relate purity to the Bloch vector.',
              answerOutline: 'ρ = (I + r·σ)/2 and Tr ρ² = (1 + |r|²)/2: 1 on the sphere, 1/2 at the centre.',
            },
          ],
          quiz: [
            {
              question: 'What is the purity of $\\rho = \\begin{pmatrix}0.8&0.2\\\\0.2&0.2\\end{pmatrix}$?',
              options: ['1', '0.68', '0.76', '0.84'],
              answer: 2,
              explanation: '$\\mathrm{Tr}\\,\\rho^2 = 0.8^2 + 2(0.2)^2 + 0.2^2 = 0.64 + 0.08 + 0.04 = 0.76$. Equivalently $r = (0.4, 0, 0.6)$, $|\\vec r|^2 = 0.52$, $(1 + 0.52)/2 = 0.76$. Forgetting the off-diagonal terms gives 0.68.',
            },
            {
              question: 'Which experiment distinguishes $|+\\rangle$ from the equal mixture of $|0\\rangle$ and $|1\\rangle$?',
              options: [
                'Measuring in the $X$ basis: $|+\\rangle$ always gives $+$, the mixture gives 50/50',
                'Measuring in the $Z$ basis',
                'Measuring the purity of a single copy',
                'None: they are the same state',
              ],
              answer: 0,
              explanation: 'Their $Z$ statistics match, but the coherence of $|+\\rangle$ shows up as $\\langle X\\rangle = 1$. Purity is not measured on one copy; it is a property of $\\rho$, estimated from many.',
            },
            {
              question: 'Alice prepares $|0\\rangle$ or $|1\\rangle$ with probability 1/2 each; Bob prepares $|+i\\rangle$ or $|-i\\rangle$ with probability 1/2 each. Given many qubits from one of them, can you tell whose they are?',
              options: [
                'Yes, by measuring in the $Y$ basis',
                'Yes, by measuring in the $Z$ basis',
                'Yes, with tomography',
                'No: both give $\\rho = I/2$, and identical density matrices give identical statistics for every measurement',
              ],
              answer: 3,
              explanation: 'Both ensembles average to the maximally mixed state. In the $Y$ basis Alice\'s qubits give 50/50, and so do Bob\'s, because you do not know which of his two states each qubit is in.',
            },
          ],
          relatedLessons: ['quantum-mechanics/entanglement-measurement-and-information/density-matrices-and-decoherence', 'thermodynamics-statistical-mechanics/statistical-foundations/shannon-entropy-and-maximum-entropy'],
        },
        {
          slug: 'partial-trace-and-reduced-states',
          title: 'Partial trace, reduced states and entanglement',
          summary:
            'How to describe one part of an entangled system: the partial trace, the reduced state of a Bell pair (I/2), purity and entropy of the reduced state as measures of entanglement, the Schmidt decomposition, and purification.',
          estimatedMinutes: 100,
          objectives: [
            'Compute the partial trace of a two-qubit density matrix over either qubit',
            'Show that each half of a Bell pair is maximally mixed and that product states have pure reduced states',
            'Use the purity or entropy of the reduced state to quantify entanglement of a pure two-qubit state',
            'Write the Schmidt decomposition of a two-qubit pure state',
            'Explain how mixedness can arise from entanglement with an unobserved system',
          ],
          concepts: [
            'Partial trace Tr_B',
            'Reduced density matrix ρ_A',
            'Bell pair halves are I/2',
            'Product state ⇔ pure reduced state',
            'Entanglement entropy S(ρ_A)',
            'Schmidt decomposition',
            'Purification',
          ],
          explanation: `If you can only measure qubit $A$ of a two-qubit system $AB$, everything you can see is in the **reduced density matrix** $\\rho_A = \\mathrm{Tr}_B\\,\\rho_{AB}$. The **partial trace** is defined by $\\mathrm{Tr}_B(|a\\rangle\\langle a'|\\otimes|b\\rangle\\langle b'|) = \\langle b'|b\\rangle\\,|a\\rangle\\langle a'|$: pair up the $B$ labels and keep the term only if they match. In components, $(\\rho_A)_{aa'} = \\sum_b\\rho_{ab,a'b}$.

**A Bell pair.** For $|\\Phi^+\\rangle = \\tfrac{1}{\\sqrt2}(|00\\rangle + |11\\rangle)$,
$$\\rho_{AB} = \\tfrac12(|00\\rangle\\langle00| + |00\\rangle\\langle11| + |11\\rangle\\langle00| + |11\\rangle\\langle11|).$$
Tracing out $B$ kills the cross terms (their $B$ labels differ) and leaves $\\rho_A = \\tfrac12(|0\\rangle\\langle0| + |1\\rangle\\langle1|) = I/2$. The pair is in a definite pure state, yet each half alone is **maximally mixed**: you know everything about the whole and nothing about the parts. This is why entangled qubits have no Bloch vector of their own (length 0 in the per-qubit display).

**Partial entanglement.** For $0.6|00\\rangle + 0.8|11\\rangle$, $\\rho_A = \\mathrm{diag}(0.36, 0.64)$, Bloch vector $(0, 0, -0.28)$, purity $0.36^2 + 0.64^2 = 0.539$. For a product state $|a\\rangle|b\\rangle$, $\\rho_A = |a\\rangle\\langle a|$ is pure. So for a **pure** two-qubit state, the reduced state is pure exactly when there is no entanglement, and its **entropy** $S(\\rho_A) = -\\sum\\lambda\\log_2\\lambda$ (0 to 1 bit) measures how much there is: 0.943 bits here, 1 bit for a Bell pair.

\`\`\`interactive
qc-circuit
{"qubits": 2, "circuit": ["RY(1.8546) 0", "CNOT 0 1"], "palette": ["RY", "H", "CNOT", "X"], "perQubit": true, "title": "Reduced states of a partly entangled pair", "caption": "The circuit makes 0.6|00⟩ + 0.8|11⟩. The per-qubit panel shows each qubit's reduced Bloch vector (0, 0, −0.28): inside the ball although the pair is pure. Select the RY and change its angle: at 0 or π the pair is a product and |r| = 1; at π/2 it is a Bell state and |r| = 0."}
\`\`\`

**Schmidt decomposition.** Every pure state of $AB$ can be written $\\sum_k\\sqrt{\\lambda_k}|a_k\\rangle|b_k\\rangle$ with orthonormal $|a_k\\rangle$, $|b_k\\rangle$; the $\\lambda_k$ are the eigenvalues of both $\\rho_A$ and $\\rho_B$. For qubits there are at most two terms.

**Purification.** Conversely, every mixed state $\\rho_A$ is the reduced state of some pure state of $A$ plus an environment. This is the physical origin of noise: a qubit looks mixed because it has become entangled with something you are not measuring. Decoherence is entanglement with the environment.

Watrous's general-formulation lesson covers the partial trace and purifications.`,
          resources: [
            ibm('general-formulation-of-quantum-information', 'Lesson 1 (reduced states and the partial trace) and the lesson on purifications and fidelity.', true),
            deWolf('Appendix on density matrices and the partial trace, with the Schmidt decomposition.'),
            nielsenChuang('Section 2.4.3 (the reduced density operator) and 2.5 (Schmidt decomposition and purification). Free alternative: Preskill chapter 2.'),
          ],
          exercises: [
            {
              slug: 'partial-trace-practice',
              title: 'Partial traces',
              prompt:
                'Compute $\\rho_A$ and $\\rho_B$ for: (a) $|\\Psi^-\\rangle$; (b) $|+\\rangle|0\\rangle$; (c) $\\tfrac{1}{\\sqrt3}(|00\\rangle + |01\\rangle + |11\\rangle)$; (d) the mixed state $\\tfrac12|00\\rangle\\langle00| + \\tfrac12|11\\rangle\\langle11|$. Give each Bloch vector, and say which of the four two-qubit states are entangled.',
              kind: 'problem',
              difficulty: 2,
              hint: '(c) $\\rho_A = \\tfrac13\\begin{pmatrix}2&1\\\\1&1\\end{pmatrix}$, Bloch vector $(2/3, 0, 1/3)$; $\\rho_B = \\tfrac13\\begin{pmatrix}1&1\\\\1&2\\end{pmatrix}$. (d) has $\\rho_A = I/2$ but is not entangled: mixed reduced states only diagnose entanglement for pure global states.',
            },
            {
              slug: 'entanglement-entropy',
              title: 'Entanglement entropy of cos(θ/2)|00⟩ + sin(θ/2)|11⟩',
              prompt:
                'Show that the reduced state of $\\cos\\tfrac\\theta2|00\\rangle + \\sin\\tfrac\\theta2|11\\rangle$ has Bloch vector $(0, 0, \\cos\\theta)$. Plot its purity and its entropy against $\\theta$ from 0 to $\\pi$, and verify the widget\'s per-qubit readout at $\\theta = 1.8546$.',
              kind: 'simulation',
              difficulty: 2,
              hint: 'At $\\theta = 1.8546$, $\\cos\\theta = -0.28$, purity 0.539 and entropy 0.943 bits.',
            },
            {
              slug: 'purify',
              title: 'Purify a mixed state',
              prompt:
                'Find a two-qubit pure state whose first qubit has reduced state $\\rho = \\begin{pmatrix}0.875&0.125\\\\0.125&0.125\\end{pmatrix}$ (the worked example of the previous lesson). Hint: diagonalise $\\rho$ and use the Schmidt form. Check your answer by computing its partial trace.',
              kind: 'derivation',
              difficulty: 3,
              hint: 'Eigenvalues $\\tfrac12 \\pm \\tfrac{\\sqrt{0.625}}{2} \\approx 0.895, 0.105$; the purification is $\\sqrt{\\lambda_1}|v_1\\rangle|0\\rangle + \\sqrt{\\lambda_2}|v_2\\rangle|1\\rangle$.',
            },
          ],
          selfAssessment: [
            {
              question: 'What is the reduced state of either qubit of a Bell pair?',
              answerOutline: 'I/2, maximally mixed, with Bloch vector 0.',
            },
            {
              question: 'How does the reduced state reveal entanglement of a pure two-qubit state?',
              answerOutline: 'The global pure state is a product iff ρ_A is pure; otherwise its entropy (0 to 1 bit) quantifies the entanglement.',
            },
            {
              question: 'What is a purification and why does it explain noise?',
              answerOutline: 'A pure state of system plus environment whose partial trace is the given ρ; a qubit looks mixed because it is entangled with an environment we do not track.',
            },
          ],
          quiz: [
            {
              question: 'What is the reduced state of qubit A for $\\tfrac{1}{\\sqrt2}(|0\\rangle|+\\rangle + |1\\rangle|-\\rangle)$?',
              options: ['$|+\\rangle\\langle+|$', '$I/2$', '$|0\\rangle\\langle0|$', '$\\tfrac12\\begin{pmatrix}1&1\\\\1&1\\end{pmatrix}$'],
              answer: 1,
              explanation: '$|+\\rangle$ and $|-\\rangle$ are orthogonal, so the cross terms vanish in the partial trace and $\\rho_A = \\tfrac12(|0\\rangle\\langle0| + |1\\rangle\\langle1|)$. The state is a Bell state in disguise (it equals $H$ on qubit B applied to $|\\Phi^+\\rangle$).',
            },
            {
              question: 'Two qubits are in the pure state $\\tfrac{1}{2}|00\\rangle + \\tfrac{\\sqrt3}{2}|11\\rangle$. What is the purity of qubit A\'s reduced state?',
              options: ['1', '0.5', '0.625', '0.75'],
              answer: 2,
              explanation: '$\\rho_A = \\mathrm{diag}(0.25, 0.75)$, so $\\mathrm{Tr}\\,\\rho_A^2 = 0.0625 + 0.5625 = 0.625$. Purity 1 would mean a product state; 0.5 a maximally entangled one.',
            },
            {
              question: 'A two-qubit state has $\\rho_A = I/2$. What can you conclude?',
              options: [
                'The two qubits are maximally entangled',
                'The two qubits are not entangled',
                'Qubit A is in the state $|+\\rangle$',
                'If the global state is pure, it is maximally entangled; if it is mixed, it may not be entangled at all',
              ],
              answer: 3,
              explanation: 'For a pure global state, a maximally mixed reduced state means maximal entanglement. But the classical mixture $\\tfrac12(|00\\rangle\\langle00| + |11\\rangle\\langle11|)$ also has $\\rho_A = I/2$ and no entanglement. Correlated is not the same as entangled.',
            },
          ],
          relatedLessons: ['quantum-mechanics/entanglement-measurement-and-information/density-matrices-and-decoherence'],
        },
        {
          slug: 'quantum-channels',
          title: 'Quantum channels and Kraus operators',
          summary:
            'Noise as a map on density matrices, ρ → Σ_k K_k ρ K_k†; the bit-flip, phase-flip, depolarising and amplitude-damping channels; what each does to the Bloch ball; and how a channel arises from a unitary interaction with an environment.',
          estimatedMinutes: 100,
          objectives: [
            'Apply a channel in Kraus form and check the completeness condition Σ K†K = I',
            'Compute the action of bit-flip, phase-flip, depolarising and amplitude-damping channels on a Bloch vector',
            'Derive a dephasing channel from a CNOT onto an environment qubit',
            'Explain why amplitude damping is not unital and where it pushes states',
          ],
          concepts: [
            'Quantum channel (completely positive, trace preserving)',
            'Kraus operators and Σ K†K = I',
            'Bit-flip channel',
            'Phase-flip (dephasing) channel',
            'Depolarising channel ρ → (1−p)ρ + p I/2',
            'Amplitude damping (energy loss to |0⟩)',
            'Unital versus non-unital',
            'Channel from system-environment unitary',
          ],
          explanation: `A **quantum channel** maps density matrices to density matrices. Every physical one can be written in **Kraus form**
$$\\mathcal{E}(\\rho) = \\sum_k K_k\\rho K_k^\\dagger,\\qquad \\sum_k K_k^\\dagger K_k = I.$$
Read it as "with some probability, operator $K_k$ happened". A unitary gate is the one-Kraus-operator case.

**Four channels you must know** (each with probability parameter $p$ or $\\gamma$), and what they do to the Bloch vector $(x, y, z)$:
- **Bit flip**, $K_0 = \\sqrt{1-p}\\,I$, $K_1 = \\sqrt p\\,X$: $(x, (1-2p)y, (1-2p)z)$. The ball is squeezed towards the $x$ axis.
- **Phase flip**, $K_1 = \\sqrt p\\,Z$: $((1-2p)x, (1-2p)y, z)$. Coherences shrink, populations untouched: **dephasing**.
- **Depolarising**, $\\rho \\to (1-p)\\rho + p\\,I/2$, with Kraus operators $\\sqrt{1 - 3p/4}\\,I$ and $\\sqrt{p/4}\\,X, Y, Z$: the whole vector shrinks by $1-p$.
- **Amplitude damping**, $K_0 = \\begin{pmatrix}1&0\\\\0&\\sqrt{1-\\gamma}\\end{pmatrix}$, $K_1 = \\begin{pmatrix}0&\\sqrt\\gamma\\\\0&0\\end{pmatrix}$: $(\\sqrt{1-\\gamma}\\,x, \\sqrt{1-\\gamma}\\,y, \\gamma + (1-\\gamma)z)$. $K_1$ is "the excited state $|1\\rangle$ emitted a photon and fell to $|0\\rangle$". Every state drifts toward the north pole $|0\\rangle$, so this channel is **not unital**: it does not fix $I/2$.

**Worked example.** Amplitude damping with $\\gamma = 0.36$ on $|+\\rangle$ $(1, 0, 0)$ gives $(0.8, 0, 0.36)$: length 0.877, so the state is now mixed, and it has moved toward $|0\\rangle$. Check with matrices: $K_0|{+}\\rangle\\langle{+}|K_0^\\dagger + K_1|{+}\\rangle\\langle{+}|K_1^\\dagger = \\begin{pmatrix}0.68&0.4\\\\0.4&0.32\\end{pmatrix}$, with $x = 2(0.4)$ and $z = 0.68 - 0.32$.

\`\`\`interactive
qc-bloch
{"theta": 90, "phi": 0, "decoherence": true, "T1": 50, "T2": 30, "gates": ["H", "X", "S", "RY"], "angle": 60, "title": "Noise shrinks the Bloch vector", "caption": "The state starts at |+⟩ on the equator. Press Play: x and y decay with T2 (dephasing, the phase-flip channel run continuously) while z relaxes toward +1 with T1 (amplitude damping). The vector leaves the sphere and moves inside the ball; watch |r| and the purity (1 + |r|²)/2. Start from |1⟩ (apply X to |0⟩) to see pure amplitude damping."}
\`\`\`

**Where channels come from.** Let the qubit interact unitarily with an environment qubit in $|0\\rangle$, for instance by a CNOT from the qubit to the environment, and then ignore the environment. $\\alpha|0\\rangle + \\beta|1\\rangle$ becomes $\\alpha|00\\rangle + \\beta|11\\rangle$, and tracing out the environment leaves $|\\alpha|^2|0\\rangle\\langle0| + |\\beta|^2|1\\rangle\\langle1|$: complete dephasing. A weaker interaction (a small controlled rotation) gives partial dephasing. Every channel arises this way (Stinespring's theorem), which is why noise *is* unwanted entanglement.

Read Watrous's lesson on quantum channels and the PennyLane noisy-circuits demo.`,
          resources: [
            ibm('general-formulation-of-quantum-information', 'Lesson 2, Quantum channels: Kraus, Stinespring and Choi representations with the standard examples.', true),
            pldemo('tutorial_noisy_circuits', 'Noisy circuits', 'Simulate the channels of this lesson on mixed-state simulators and fit noise to data.'),
            preskill('Chapter 3: measurement and evolution, the operator-sum (Kraus) representation and the standard channels.'),
          ],
          exercises: [
            {
              slug: 'kraus-checks',
              title: 'Check the Kraus conditions',
              prompt:
                'Verify $\\sum K^\\dagger K = I$ for the bit-flip, phase-flip, depolarising and amplitude-damping channels. Then show that the depolarising channel with Kraus operators $\\sqrt{1-3p/4}\\,I$, $\\sqrt{p/4}\\,X$, $\\sqrt{p/4}\\,Y$, $\\sqrt{p/4}\\,Z$ equals $(1-p)\\rho + pI/2$, using $X\\rho X + Y\\rho Y + Z\\rho Z = 2I - \\rho$ for $\\mathrm{Tr}\\,\\rho = 1$.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'channels-on-states',
              title: 'Channels on states',
              prompt:
                'Apply each channel with $p = 0.1$ (or $\\gamma = 0.1$) to $|0\\rangle$, $|1\\rangle$, $|+\\rangle$ and $|+i\\rangle$, giving the output Bloch vectors and purities (16 cases; tabulate). Which channels leave $|0\\rangle$ unchanged? Which leave $|+\\rangle$ unchanged? Apply the phase-flip channel twice and show the effective $p$ is $2p(1-p)$.',
              kind: 'problem',
              difficulty: 2,
              hint: 'Amplitude damping on $|1\\rangle$: $(0, 0, -0.8)$. Depolarising on any pure state: length 0.9, purity 0.905. Two phase flips: shrink factor $(1-2p)^2 = 1 - 2p_{\\rm eff}$.',
            },
            {
              slug: 'environment-model',
              title: 'Dephasing from a partial CNOT',
              prompt:
                'A qubit interacts with an environment qubit in $|0\\rangle$ through the controlled rotation $|0\\rangle\\langle0|\\otimes I + |1\\rangle\\langle1|\\otimes R_y(\\varepsilon)$. Compute the qubit\'s reduced state after the interaction for input $|+\\rangle$, and show that its coherence is multiplied by $\\cos(\\varepsilon/2)$. Which channel is this, and what is its $p$?',
              kind: 'derivation',
              difficulty: 3,
              hint: 'The environment ends in $|0\\rangle$ or $R_y(\\varepsilon)|0\\rangle$, whose overlap is $\\cos(\\varepsilon/2)$. It is a phase-flip channel with $1 - 2p = \\cos(\\varepsilon/2)$.',
            },
          ],
          selfAssessment: [
            {
              question: 'Write the Kraus form of a channel and its normalisation condition.',
              answerOutline: 'E(ρ) = Σ K_k ρ K_k† with Σ K_k† K_k = I (trace preserving).',
            },
            {
              question: 'What does each standard channel do to the Bloch ball?',
              answerOutline: 'Bit flip squeezes y and z; phase flip squeezes x and y; depolarising shrinks uniformly by (1−p); amplitude damping shrinks x, y by √(1−γ) and pulls z toward +1.',
            },
            {
              question: 'How does a channel arise physically?',
              answerOutline: 'From a unitary interaction between the system and an environment followed by tracing out the environment; noise is entanglement with unobserved degrees of freedom.',
            },
          ],
          quiz: [
            {
              question: 'The depolarising channel with $p = 0.2$ acts on $|+i\\rangle$. What is the output Bloch vector?',
              options: ['$(0, 0.8, 0)$', '$(0, 0.6, 0)$', '$(0, 1, 0)$', '$(0, 0.8, 0.2)$'],
              answer: 0,
              explanation: '$\\rho \\to (1-p)\\rho + pI/2$ shrinks every Bloch vector by $1-p = 0.8$. A factor $1 - 2p = 0.6$ belongs to a single Pauli-flip channel; adding a $z$ component would be amplitude damping, which this is not.',
            },
            {
              question: 'Amplitude damping with $\\gamma = 0.5$ acts on $|1\\rangle$. What is the result?',
              options: ['$|1\\rangle$ unchanged', '$\\tfrac{1}{\\sqrt2}(|0\\rangle + |1\\rangle)$', 'The mixture $\\tfrac12|0\\rangle\\langle0| + \\tfrac12|1\\rangle\\langle1|$', '$|0\\rangle$'],
              answer: 2,
              explanation: 'With probability $\\gamma = 0.5$ the excitation decays to $|0\\rangle$; otherwise it stays. The result is a mixture with Bloch vector $(0, 0, 0)$, not the superposition $|+\\rangle$, which would have $x = 1$.',
            },
            {
              question: 'Which channel leaves the populations (diagonal of ρ in the computational basis) unchanged but destroys coherences?',
              options: ['Bit flip', 'Amplitude damping', 'Depolarising', 'Phase flip'],
              answer: 3,
              explanation: 'The phase-flip channel multiplies off-diagonal entries by $1 - 2p$ and leaves $z$ alone: pure dephasing (a $T_2$ process). Bit flip changes populations, and amplitude damping moves them toward $|0\\rangle$.',
            },
          ],
          relatedLessons: ['quantum-mechanics/entanglement-measurement-and-information/density-matrices-and-decoherence'],
        },
        {
          slug: 'decoherence-fidelity-and-circuit-depth',
          title: 'T1, T2, fidelity and how noise limits circuit depth',
          summary:
            'Energy relaxation (T1) and dephasing (T2), the relation 1/T2 = 1/(2T1) + 1/Tφ, Ramsey and echo experiments, the fidelity of a noisy state or gate, and how per-gate errors multiply to cap the size of circuits that can run without error correction.',
          estimatedMinutes: 110,
          objectives: [
            'Define T1 and T2, relate them to amplitude damping and dephasing, and state why T2 ≤ 2T1',
            'Interpret a Ramsey experiment and explain what a spin echo removes',
            'Compute the fidelity ⟨ψ|ρ|ψ⟩ of a noisy state and the average fidelity of an idle qubit',
            'Estimate the success probability of a circuit from gate error rates and find the largest useful circuit',
            'Distinguish T1 from T2 and gate error from readout error',
          ],
          concepts: [
            'T1: energy relaxation, z → 1 with time constant T1',
            'T2: coherence decay of x, y',
            '1/T2 = 1/(2T1) + 1/Tφ',
            'Ramsey fringes and T2*',
            'Hahn (spin) echo',
            'Fidelity F = ⟨ψ|ρ|ψ⟩',
            'Error budget: P(success) ≈ Π(1 − ε_i) ≈ e^{−Σε}',
            'NISQ depth limit',
          ],
          explanation: `**T1 and T2.** Continuous amplitude damping makes the excited-state population decay: $z(t) = 1 - (1 - z_0)e^{-t/T_1}$, so $P(1)$ falls as $e^{-t/T_1}$. Coherences, the $x$ and $y$ components, decay as $e^{-t/T_2}$. Energy loss also destroys coherence (each decay event reveals the state), which gives $1/T_2 = 1/(2T_1) + 1/T_\\varphi$, with $T_\\varphi$ from pure dephasing. Hence $T_2 \\le 2T_1$. Example: $T_1 = 100$ μs and $T_\\varphi = 200$ μs give $T_2 = 100$ μs. Superconducting qubits today have $T_1$ and $T_2$ of tens to a few hundred microseconds; trapped-ion and neutral-atom hyperfine qubits reach seconds of $T_2$, but their gates are slower.

**Measuring T2: Ramsey.** Apply a $\\pi/2$ pulse, wait $\\tau$, apply another $\\pi/2$ pulse, measure. If the drive is detuned by $\\Delta$ from the qubit, the phase accumulated while waiting gives fringes $P(1) = \\tfrac12\\big(1 + \\cos(2\\pi\\Delta\\tau)\\,e^{-\\tau/T_2}\\big)$ (one convention). The envelope measures coherence; slow fluctuations of the qubit frequency make it decay faster (called $T_2^*$). A **Hahn echo**, a $\\pi$ pulse halfway, reverses the phase from any frequency offset that stays constant during the sequence, recovering the longer $T_2$.

\`\`\`interactive
qc-rabi
{"mode": "ramsey", "modes": ["ramsey", "rabi"], "detuning": 2, "T2": 1.5, "taumax": 3000, "title": "Ramsey fringes and T2", "caption": "Two π/2 pulses separated by a wait τ with 2 MHz detuning: the fringes repeat every 1/Δ = 500 ns and their envelope decays as e^(−τ/T2). At τ = 250 ns, half a period, P(1) is 0.077 rather than 0. Lower T2 and the fringes wash out sooner; set the detuning to 0 and only the decay remains."}
\`\`\`

**Fidelity.** How close is a noisy state $\\rho$ to the intended $|\\psi\\rangle$? $F = \\langle\\psi|\\rho|\\psi\\rangle$. A qubit idling for time $t$ has average fidelity $\\bar F = \\tfrac12 + \\tfrac16e^{-t/T_1} + \\tfrac13e^{-t/T_2}$; with $T_1 = 100$ μs, $T_2 = 80$ μs and $t = 1$ μs, $\\bar F = 0.9942$, an error of about 0.6 %. Gate error rates quoted by vendors are $1 - F$ averaged over inputs (module 9).

**Errors add up.** If gate $i$ fails with probability $\\varepsilon_i$ and failures are independent, a circuit succeeds with probability about $\\prod_i(1 - \\varepsilon_i) \\approx e^{-\\sum\\varepsilon_i}$. With 1000 two-qubit gates: at $\\varepsilon = 0.5\\,\\%$, $0.995^{1000} \\approx 0.007$; at $0.1\\,\\%$, $0.37$; at $0.01\\,\\%$, $0.90$. So without error correction a circuit can hold roughly $1/\\varepsilon$ gates, a few thousand at today's best two-qubit error rates. That ceiling, not the qubit count, is what limits **NISQ** ("noisy intermediate-scale quantum") machines. Shor's algorithm for RSA needs billions of gates, hence module 8.

Keep the two times apart: T1 is losing energy, T2 is losing phase. And gate error, idle error and readout error are separate budget lines.`,
          resources: [
            arxiv('1904.06560', 'Krantz et al., A quantum engineer\'s guide to superconducting qubits (2019)', 'Section V (noise and decoherence) defines T1, T2, Tφ, Ramsey and echo exactly as used here.'),
            arxiv('1801.00862', 'Preskill, Quantum computing in the NISQ era and beyond (2018)', 'The essay that named NISQ; read the sections on noise and what near-term machines can do.', ),
            ibm('general-formulation-of-quantum-information', 'Lesson on purifications and fidelity: the definition of fidelity and its properties.', true),
          ],
          exercises: [
            {
              slug: 't1-t2-decay',
              title: 'T1 and T2 decay',
              prompt:
                'A qubit has $T_1 = 80$ μs and $T_2 = 100$ μs. (a) Find $T_\\varphi$. (b) Starting in $|1\\rangle$, what is $P(1)$ after 20 μs and 160 μs? (c) Starting in $|+\\rangle$, what is the Bloch vector after 20 μs (no detuning)? (d) Is $T_2 = 200$ μs possible with this $T_1$? Check (c) with the Bloch widget\'s decoherence mode.',
              kind: 'problem',
              difficulty: 1,
              hint: '(a) $1/T_\\varphi = 1/100 - 1/160$, $T_\\varphi \\approx 267$ μs. (b) $e^{-0.25} = 0.779$, $e^{-2} = 0.135$. (c) $x = e^{-0.2} = 0.819$, $z = 1 - e^{-0.25} = 0.221$. (d) No: $T_2 \\le 2T_1 = 160$ μs.',
            },
            {
              slug: 'ramsey-fit',
              title: 'Read a Ramsey experiment',
              prompt:
                'A Ramsey experiment with an intentional detuning gives $P(1)$ = 0.95, 0.09, 0.88, 0.15, 0.82 at $\\tau$ = 0, 0.25, 0.5, 0.75, 1.0 μs. Estimate the detuning and $T_2^*$ from these points (use the model in the lesson). Then explain what you would expect from a Hahn echo with the same total time, and why.',
              kind: 'data-analysis',
              difficulty: 2,
              hint: 'Extremes alternate every 0.25 μs, so the period is 0.5 μs: $\\Delta = 2$ MHz. The envelope $|2P - 1|$ is 0.90, 0.82, 0.76, 0.70, 0.64, falling by a factor of about 0.92 per 0.25 μs, so $T_2^* \\approx 0.25/0.083 \\approx 3$ μs. The starting value 0.90 instead of 1 comes from readout and pulse errors.',
            },
            {
              slug: 'depth-budget',
              title: 'An error budget',
              prompt:
                'A 50-qubit circuit has 20 layers; each layer has 25 two-qubit gates (error 0.3 %), 50 single-qubit gates (error 0.02 %) and lasts 300 ns, during which every qubit idles with error $t/T_2$ ($T_2 = 100$ μs). Readout error is 1 % per qubit. Estimate the probability that the whole run is error-free, and which line of the budget dominates. How many layers could you afford for a 10 % success probability?',
              kind: 'problem',
              difficulty: 2,
              hint: 'Two-qubit: 500 × 0.003 = 1.5; single: 1000 × 0.0002 = 0.2; idle: 1000 × 0.003 = 3.0 (if every qubit idles the whole layer); readout: 50 × 0.01 = 0.5. Total ≈ 5.2, $e^{-5.2} \\approx 0.006$. Per layer ≈ 0.235 plus 0.5 readout, so $\\ln 10 \\approx 2.3$ allows about 7 layers.',
            },
          ],
          selfAssessment: [
            {
              question: 'Define T1 and T2 and state their relation.',
              answerOutline: 'T1: time constant for decay of the excited-state population (energy loss). T2: decay time of coherences. 1/T2 = 1/(2T1) + 1/Tφ, so T2 ≤ 2T1.',
            },
            {
              question: 'What does a spin echo do?',
              answerOutline: 'A π pulse halfway through reverses phase accumulated from static frequency offsets, removing inhomogeneous dephasing (T2*) and revealing the intrinsic T2.',
            },
            {
              question: 'How do per-gate errors limit circuit size?',
              answerOutline: 'Success ≈ Π(1−ε) ≈ e^{−Σε}; a circuit of about 1/ε gates already fails most of the time, so NISQ circuits are limited to roughly a few thousand gates.',
            },
          ],
          quiz: [
            {
              question: 'A qubit has $T_1 = 60$ μs and pure-dephasing time $T_\\varphi = 120$ μs. What is $T_2$?',
              options: ['60 μs', '120 μs', '40 μs', '180 μs'],
              answer: 0,
              explanation: '$1/T_2 = 1/120 + 1/120 = 1/60$, so $T_2 = 60$ μs. Adding the times (180 μs) or using $1/T_1$ instead of $1/(2T_1)$ (giving 40 μs) are the common slips.',
            },
            {
              question: 'Which statement separates $T_1$ and $T_2$ correctly?',
              options: [
                'They are two names for the same decay',
                '$T_2$ measures energy loss and $T_1$ measures phase loss',
                '$T_1$ governs decay of the excited-state population; $T_2$ governs decay of coherences, and $T_2 \\le 2T_1$',
                '$T_2$ can be arbitrarily larger than $T_1$ with good shielding',
              ],
              answer: 2,
              explanation: 'Energy relaxation also kills coherence, which caps $T_2$ at $2T_1$. Phase noise alone (dephasing) shortens $T_2$ without changing $T_1$.',
            },
            {
              question: 'A circuit has 300 two-qubit gates with error 0.2 % each and 40 measurements with error 1 % each. Roughly what is the probability that it runs with no error at all?',
              options: ['About 0.55', 'About 0.67', 'About 0.99', 'About 0.37'],
              answer: 3,
              explanation: 'Gates: $0.998^{300} \\approx e^{-0.6} \\approx 0.55$; readout: $0.99^{40} \\approx 0.67$; together about $0.55 \\times 0.67 \\approx 0.37$. Reporting 0.55 or 0.67 counts only one line of the error budget.',
            },
          ],
          relatedLessons: ['quantum-mechanics/formalism-and-dirac-notation/two-level-systems', 'probability-statistics/statistics-in-practice/uncertainty-propagation'],
        },
      ],
      project: {
        slug: 'bell-state-noise-study',
        title: 'A noise study of a Bell state',
        description: `Quantify how noise degrades entanglement, by hand, in simulation and (optionally) on hardware. (1) **Theory.** For $|\\Phi^+\\rangle$ subject to independent depolarising noise of strength $p$ on each qubit, compute the two-qubit density matrix, its fidelity with $|\\Phi^+\\rangle$, the reduced states, and the CHSH value $S(p)$; find the $p$ at which $S$ drops to 2. Repeat for amplitude damping $\\gamma$ on both qubits. (2) **Simulation.** Use a density-matrix simulator (Qiskit Aer, PennyLane default.mixed, or your module 3 simulator extended to density matrices) to check each formula at five values of the parameter. (3) **Hardware (optional).** Prepare $|\\Phi^+\\rangle$ on an IBM device, insert idle delays of 0, 20, 50 and 100 μs, and measure the fidelity by tomography (nine measurement settings) or by the parity method; fit an effective $T_2$ and compare with the device's reported values. (4) **Write-up.** One page explaining which noise process dominates and what that implies for running deep circuits.`,
        deliverables: [
          'Derivations of F(p), S(p) and the reduced states for both noise models',
          'Simulation checks in a table, with agreement to three decimals',
          'Optional hardware data with the fitted decay and a comparison with the device calibration',
          'The one-page discussion',
        ],
        estimatedHours: 4,
        stretchGoals: ['Add a Hahn echo to the hardware idle and compare fidelities with and without it', 'Compute the concurrence of the noisy state and find where entanglement disappears entirely'],
      },
    },
    {
      slug: 'quantum-error-correction',
      title: 'Quantum Error Correction and Fault Tolerance',
      description:
        'How fragile qubits can still run long computations: the three-qubit bit-flip and phase-flip codes, Shor\'s nine-qubit code and the digitisation of errors, stabiliser, CSS and Steane codes, the surface (toric) code, the threshold theorem, the overhead of logical qubits, and magic states, the reason T gates are expensive.',
      lessons: [
        {
          slug: 'three-qubit-codes',
          title: 'The three-qubit bit-flip and phase-flip codes',
          summary:
            'Protecting α|0⟩ + β|1⟩ against bit flips with α|000⟩ + β|111⟩, measuring the parities Z₁Z₂ and Z₂Z₃ without learning α or β, the syndrome table, the logical error rate 3p² − 2p³, and the same code in the Hadamard basis against phase flips.',
          estimatedMinutes: 100,
          objectives: [
            'Encode a qubit into the bit-flip code with two CNOTs and explain why this is not cloning',
            'Measure the syndromes Z₁Z₂ and Z₂Z₃ with ancillas and decode with the syndrome table',
            'Derive the logical error probability 3p² − 2p³ and the break-even point',
            'Build the phase-flip code by changing basis, and explain why each code fails against the other error',
          ],
          concepts: [
            'Encoding α|0⟩ + β|1⟩ → α|000⟩ + β|111⟩',
            'Codewords and logical states |0_L⟩, |1_L⟩',
            'Parity (stabiliser) measurements Z₁Z₂, Z₂Z₃',
            'Syndrome table and majority decoding',
            'Logical error p_L = 3p² − 2p³',
            'Phase-flip code in the |±⟩ basis',
            'Measuring parities without measuring the data',
          ],
          explanation: `No-cloning forbids backup copies, and measuring a qubit to check it would destroy its superposition. Error correction gets around both by spreading the information and measuring only **parities**.

**Encoding.** Two CNOTs from qubit 1 onto two fresh qubits map $\\alpha|0\\rangle + \\beta|1\\rangle$ to
$$\\alpha|000\\rangle + \\beta|111\\rangle = \\alpha|0_L\\rangle + \\beta|1_L\\rangle.$$
This is one entangled state, not three copies of the qubit (three copies would be $(\\alpha|0\\rangle + \\beta|1\\rangle)^{\\otimes3}$, with eight terms).

**Syndromes.** A bit flip $X_2$ gives $\\alpha|010\\rangle + \\beta|101\\rangle$. Measure the observables $Z_1Z_2$ and $Z_2Z_3$, which ask "do qubits 1 and 2 agree?" and "do qubits 2 and 3 agree?". Both branches $|010\\rangle$ and $|101\\rangle$ give the same answers ($-1, -1$), so the measurement reveals **which qubit flipped** but nothing about $\\alpha$ or $\\beta$, and the superposition survives. The table:

| $Z_1Z_2$ | $Z_2Z_3$ | diagnosis | correction |
|---|---|---|---|
| +1 | +1 | no error | none |
| −1 | +1 | qubit 1 | $X_1$ |
| −1 | −1 | qubit 2 | $X_2$ |
| +1 | −1 | qubit 3 | $X_3$ |

In hardware each parity is measured by CNOTs from two data qubits onto an ancilla, then measuring the ancilla.

\`\`\`interactive
qc-error-correction
{"code": "bit-flip", "codes": ["bit-flip", "phase-flip"], "title": "The three-qubit codes", "caption": "Inject an X on qubit 2: the syndrome is (−1, −1), the decoder applies X₂ and the logical state is recovered. Now add a second X on qubit 1: the syndrome points at qubit 3, the decoder makes things worse and you end with the logical error X₁X₂X₃. Switch to Rate mode: the logical error curve 3p² − 2p³ lies below the line p until the break-even at p = 0.5. Try a Z error on the bit-flip code: it is never detected."}
\`\`\`

**How much does it help?** If each qubit flips independently with probability $p$, decoding fails when two or three flip:
$$p_L = 3p^2(1-p) + p^3 = 3p^2 - 2p^3.$$
At $p = 0.1$, $p_L = 0.028$; at $p = 0.01$, $p_L \\approx 3\\times10^{-4}$. The code helps whenever $p_L < p$, which holds for all $p < 1/2$. Errors that were first order become second order: that is the whole game.

**Phase flips.** A $Z$ error turns $\\alpha|000\\rangle + \\beta|111\\rangle$ into $\\alpha|000\\rangle - \\beta|111\\rangle$, and both parities stay $+1$: the bit-flip code is blind to it (worse, a $Z$ on *any* of the three qubits causes a logical error, so $p_L \\approx 3p$). Since $HZH = X$, encode in the Hadamard basis instead: $|0_L\\rangle = |{+}{+}{+}\\rangle$, $|1_L\\rangle = |{-}{-}{-}\\rangle$, measure $X_1X_2$ and $X_2X_3$, and phase flips are corrected the same way, while bit flips now go unseen. Real qubits suffer both, which is the point of the next lesson.`,
          resources: [
            ibm('foundations-of-quantum-error-correction', 'Lesson 1, Correcting quantum errors: the repetition codes, syndrome measurement and the discretisation of errors.', true),
            codebook('quantum-error-correction', 'Quantum error correction', 'Nodes on the three-qubit codes: encode, inject errors, measure syndromes and correct, in code.'),
            preskill('Chapter 7 (quantum error correction): the repetition codes and why parity measurement preserves superpositions.'),
          ],
          exercises: [
            {
              slug: 'syndrome-trace',
              title: 'Trace the syndrome measurement',
              prompt:
                'Draw the circuit that measures $Z_1Z_2$ and $Z_2Z_3$ using two ancillas and four CNOTs. Starting from $\\alpha|000\\rangle + \\beta|111\\rangle$ with an $X_3$ error, write the five-qubit state after the CNOTs and show the ancillas end in a definite basis state independent of $\\alpha, \\beta$. Which correction follows?',
              kind: 'problem',
              difficulty: 2,
              hint: 'After $X_3$: $\\alpha|001\\rangle + \\beta|110\\rangle$. The first ancilla records $q_1\\oplus q_2 = 0$, the second $q_2\\oplus q_3 = 1$ in both branches: syndrome $(+1, -1)$, correct with $X_3$.',
            },
            {
              slug: 'logical-error-curve',
              title: 'Logical error rates',
              prompt:
                'Compute $p_L = 3p^2 - 2p^3$ for $p$ = 0.2, 0.1, 0.01 and $10^{-3}$, and the improvement factor $p/p_L$. Then concatenate: encode each of the three qubits in another bit-flip code (9 qubits). Show the logical error becomes $f(f(p))$ with $f(p) = 3p^2 - 2p^3$ and evaluate it at $p = 0.01$. Check one value in the widget\'s Rate mode.',
              kind: 'problem',
              difficulty: 2,
              hint: '$p = 0.01$: $p_L = 2.98\\times10^{-4}$, improvement about 34. Concatenated: $f(2.98\\times10^{-4}) \\approx 2.7\\times10^{-7}$.',
            },
            {
              slug: 'wrong-code',
              title: 'The wrong code for the noise',
              prompt:
                'For the bit-flip code under phase-flip noise (each qubit gets $Z$ with probability $p$), show that the logical $Z$ error probability is $3p(1-p)^2 + p^3$, and compare with an unencoded qubit at $p = 0.1$. Confirm with the widget (bit-flip code, Z-only errors). What does this say about choosing a code without knowing the noise?',
              kind: 'problem',
              difficulty: 2,
              hint: 'An odd number of $Z$ errors flips the logical phase: 0.244 at $p = 0.1$, worse than the bare 0.1.',
            },
          ],
          selfAssessment: [
            {
              question: 'Why does measuring Z₁Z₂ and Z₂Z₃ not destroy the encoded superposition?',
              answerOutline: 'Both branches |000⟩ and |111⟩ (and their single-flip versions) give the same parities, so the outcome reveals only the error location, not α or β.',
            },
            {
              question: 'Derive the logical error rate of the bit-flip code.',
              answerOutline: 'Failure needs two or three flips: 3p²(1−p) + p³ = 3p² − 2p³, which beats p for p < 1/2.',
            },
            {
              question: 'Why can neither three-qubit code alone protect a real qubit?',
              answerOutline: 'The bit-flip code cannot see Z errors and the phase-flip code cannot see X errors; real noise contains both.',
            },
          ],
          quiz: [
            {
              question: 'In the bit-flip code, the syndrome measurements give $Z_1Z_2 = +1$, $Z_2Z_3 = -1$. Which correction should be applied?',
              options: ['$X_1$', '$X_2$', 'None', '$X_3$'],
              answer: 3,
              explanation: 'Qubits 1 and 2 agree but 2 and 3 disagree, so qubit 3 is the odd one out. $(-1, -1)$ would indicate qubit 2, and $(-1, +1)$ qubit 1.',
            },
            {
              question: 'Each qubit of the bit-flip code flips with probability $p = 0.05$. What is the logical error probability?',
              options: ['0.00725', '0.05', '0.0075', '0.000125'],
              answer: 0,
              explanation: '$3p^2 - 2p^3 = 0.0075 - 0.00025 = 0.00725$. 0.0075 forgets the $-2p^3$ term (it double-counts three flips), and 0.000125 is $p^3$ alone.',
            },
            {
              question: 'Why is $\\alpha|000\\rangle + \\beta|111\\rangle$ consistent with the no-cloning theorem?',
              options: [
                'Because it is not three copies of the qubit: $(\\alpha|0\\rangle + \\beta|1\\rangle)^{\\otimes3}$ has eight terms, the code state two',
                'Because $\\alpha$ and $\\beta$ must be real',
                'Because the encoding uses measurement',
                'It is not consistent; error correction violates no-cloning',
              ],
              answer: 0,
              explanation: 'CNOTs copy basis states, so linearity produces an entangled state, not copies. Each qubit of the codeword on its own is mixed and carries no information about the relative phase.',
            },
          ],
          relatedLessons: ['probability-statistics/random-variables-and-distributions/discrete-distributions'],
        },
        {
          slug: 'shors-nine-qubit-code',
          title: 'Shor\'s nine-qubit code and the digitisation of errors',
          summary:
            'Concatenating the phase-flip and bit-flip codes to correct an arbitrary error on any one qubit, why measuring the syndrome turns a continuous error into a discrete Pauli error, and degeneracy: errors that need no correction.',
          estimatedMinutes: 100,
          objectives: [
            'Write the codewords of Shor\'s code and its eight stabiliser measurements',
            'Correct X, Z and Y errors on any single qubit with the syndrome table',
            'Show that a small rotation error is projected by syndrome measurement onto "no error" or a Pauli error',
            'Explain degeneracy: why Z₁Z₂ acts trivially on the code',
          ],
          concepts: [
            'Concatenation: phase-flip code of bit-flip blocks',
            'Codewords (|000⟩ ± |111⟩)^{⊗3}/2√2',
            'Six Z-type and two X-type checks',
            'Correcting any single-qubit error',
            'Digitisation (discretisation) of errors',
            'Y = iXZ corrected as X and Z',
            'Degenerate errors',
            '[[9, 1, 3]]',
          ],
          explanation: `**Concatenation (Shor, 1995).** Encode first against phase flips, $|0\\rangle \\to |{+}{+}{+}\\rangle$, $|1\\rangle \\to |{-}{-}{-}\\rangle$, then encode each of those three qubits against bit flips, $|\\pm\\rangle \\to (|000\\rangle \\pm |111\\rangle)/\\sqrt2$:
$$|0_L\\rangle = \\tfrac{1}{2\\sqrt2}(|000\\rangle + |111\\rangle)^{\\otimes3},\\qquad |1_L\\rangle = \\tfrac{1}{2\\sqrt2}(|000\\rangle - |111\\rangle)^{\\otimes3}.$$
Nine physical qubits, one logical qubit, and the code corrects **any** error on any one qubit.

**The checks.** Within each block of three, $Z_1Z_2$ and $Z_2Z_3$ (six checks in all) locate a bit flip. Between blocks, $X_1\\cdots X_6$ and $X_4\\cdots X_9$ compare the signs of neighbouring blocks and locate a phase flip *to within a block*. A $Z$ on qubit 1, 2 or 3 produces the same syndrome, and that is fine: $Z_1$, $Z_2$ and $Z_3$ all act identically on the code space (for instance $Z_1Z_2$ leaves every codeword unchanged). Errors that differ by a stabiliser need no distinction: the code is **degenerate**. A $Y = iXZ$ error triggers both kinds of check and is fixed by applying both corrections.

\`\`\`interactive
qc-error-correction
{"code": "shor9", "modes": ["single", "rate"], "model": "dep", "title": "Shor's nine-qubit code", "caption": "Put a Y on qubit 5: one Z-type check in the middle block fires and both X-type checks fire, and the decoder applies X₅ and a Z to the middle block. Try a Z on qubit 4 and then on qubit 6: different qubits, same syndrome, and both are corrected. Then try two Z errors in the first block (Z₁Z₂): the syndrome is trivial and the state is unchanged, a degenerate error. In Rate mode compare the three noise models."}
\`\`\`

**Why discrete errors are enough.** Real errors are continuous: a small over-rotation $E = \\cos\\epsilon\\,I - i\\sin\\epsilon\\,X_1$, say. Acting on the code it gives $\\cos\\epsilon|\\psi_L\\rangle - i\\sin\\epsilon\\,X_1|\\psi_L\\rangle$. The syndrome measurement has outcome "no error" with probability $\\cos^2\\epsilon$ (and the state is projected to $|\\psi_L\\rangle$) or "qubit 1 flipped" with probability $\\sin^2\\epsilon$ (projected to $X_1|\\psi_L\\rangle$, then corrected). Any single-qubit operator is a combination of $I, X, Y, Z$, so correcting those four corrects everything. This **digitisation of errors** is why quantum error correction is possible at all, despite the continuum of possible errors.

**Bookkeeping.** In the notation $[[n, k, d]]$ ($n$ physical qubits, $k$ logical, distance $d$), Shor's code is $[[9, 1, 3]]$; distance 3 means it corrects $\\lfloor(3-1)/2\\rfloor = 1$ arbitrary error. With independent errors of rate $p$ the failure probability is $O(p^2)$, but the constant is large (nine qubits give many pairs), so the break-even point is only around $p \\approx 0.1$ for depolarising noise.`,
          resources: [
            ibm('foundations-of-quantum-error-correction', 'Lesson 1 builds Shor\'s nine-qubit code and proves the discretisation of errors.', true),
            deWolf('Chapter on quantum error correction: Shor\'s code, the error-discretisation argument and fault tolerance in outline.'),
            preskill('Chapter 7: Shor\'s code, the general error-correction conditions and degenerate codes.'),
          ],
          exercises: [
            {
              slug: 'shor-syndromes',
              title: 'Syndromes of Shor\'s code',
              prompt:
                'For each single-qubit error $X_5$, $Z_5$, $Y_5$, $Z_9$ and $X_1$, give the eight check outcomes (six $ZZ$ checks, two $X$-type checks) and the correction. Then find two different single-qubit $Z$ errors with the same syndrome and show their product is a stabiliser. Check each case in the widget.',
              kind: 'problem',
              difficulty: 2,
              hint: '$Z_5$ anticommutes with both $X_1\\cdots X_6$ and $X_4\\cdots X_9$, so both fire; $Z_9$ only with $X_4\\cdots X_9$. $Z_4Z_5$ is a stabiliser.',
            },
            {
              slug: 'digitisation',
              title: 'A small rotation, digitised',
              prompt:
                'A data qubit of the bit-flip code suffers $R_x(\\epsilon)$ (on qubit 2). Write the corrupted state as a superposition of "no error" and "$X_2$ error" terms, compute the probability of each syndrome outcome, and show that after correction the logical state is restored exactly in both cases. For $\\epsilon = 0.1$, what is the probability that a flip is detected?',
              kind: 'derivation',
              difficulty: 2,
              hint: '$R_x(\\epsilon) = \\cos\\tfrac\\epsilon2 I - i\\sin\\tfrac\\epsilon2 X$: detection probability $\\sin^2(0.05) \\approx 0.0025$.',
            },
            {
              slug: 'shor-rate',
              title: 'Shor\'s code against independent bit flips',
              prompt:
                'Under independent $X$ errors of rate $p$, each block fails with probability $q = 3p^2 - 2p^3$, and a block failure acts as $X_1X_2X_3$ on that block, which is a logical $Z_L$. Show that the logical error probability is $3q(1-q)^2 + q^3$ (an odd number of failing blocks), evaluate it at $p = 0.1$ and compare with the widget.',
              kind: 'problem',
              difficulty: 3,
              hint: '$q = 0.028$, $p_L \\approx 0.0794$.',
            },
          ],
          selfAssessment: [
            {
              question: 'How is Shor\'s code built?',
              answerOutline: 'Concatenate the phase-flip code (outer) with the bit-flip code (inner): each of |+++⟩/|−−−⟩\'s qubits becomes (|000⟩ ± |111⟩)/√2, giving nine qubits.',
            },
            {
              question: 'Why does correcting I, X, Y, Z suffice for arbitrary errors?',
              answerOutline: 'Any single-qubit error operator is a linear combination of the Paulis; syndrome measurement projects onto one Pauli term, which is then corrected (digitisation).',
            },
            {
              question: 'What is a degenerate code?',
              answerOutline: 'Different errors (e.g. Z₁ and Z₂) have the same syndrome but differ by a stabiliser, so the same correction works for both.',
            },
          ],
          quiz: [
            {
              question: 'In Shor\'s code an unknown error on one qubit fires the $X$-type check $X_1\\cdots X_6$ only, and one $ZZ$ check in the first block, $Z_1Z_2$, only. What happened?',
              options: ['A $Y$ error on qubit 1', 'An $X$ error on qubit 1', 'A $Z$ error on qubit 1', 'Two errors on qubits 1 and 2'],
              answer: 0,
              explanation: '$Z_1Z_2$ alone (not $Z_2Z_3$) points to a bit flip on qubit 1; $X_1\\cdots X_6$ alone points to a phase flip in block 1. Both together mean $Y_1$. An $X$ alone would not fire an $X$-type check.',
            },
            {
              question: 'An error $\\cos\\epsilon\\,I - i\\sin\\epsilon\\,Z_3$ hits Shor\'s code with $\\epsilon = 0.2$. What is the probability that the syndrome measurement reports a phase flip?',
              options: ['0.2', '0.04', '0.0395', '0.96'],
              answer: 2,
              explanation: 'The syndrome measurement projects onto the $Z_3$ branch with probability $\\sin^2 0.2 \\approx 0.0395$, otherwise onto no error. 0.2 is the amplitude-like angle, and 0.04 is the small-angle approximation $\\epsilon^2$.',
            },
            {
              question: 'Two $Z$ errors, on qubits 4 and 5, hit Shor\'s code. What does the decoder do?',
              options: [
                'It applies $Z_4Z_5$, using up its one correction',
                'Nothing is needed: $Z_4Z_5$ is a stabiliser, the syndrome is trivial and the logical state is unchanged',
                'It fails and produces a logical error',
                'It applies $X_4X_5$',
              ],
              answer: 1,
              explanation: '$Z_4Z_5$ is one of the six $ZZ$ checks, so it acts as the identity on every codeword. This is degeneracy: some two-qubit errors are harmless, which helps codes beyond what their distance alone promises.',
            },
          ],
        },
        {
          slug: 'stabiliser-codes-css-and-steane',
          title: 'Stabiliser codes, CSS codes and the Steane code',
          summary:
            'The stabiliser formalism (a code defined by commuting Pauli checks), syndromes from anticommutation, logical operators and distance, the CSS construction from two classical codes, and the seven-qubit Steane code built from the Hamming code.',
          estimatedMinutes: 110,
          objectives: [
            'Describe a stabiliser code by its generators and find its code space dimension 2^{n−m}',
            'Compute syndromes from commutation or anticommutation of errors with generators',
            'Find logical operators and the distance d of a small code',
            'Build the Steane [[7,1,3]] code from the Hamming [7,4,3] code by the CSS construction',
            'Explain why transversal gates are attractive and which are transversal for Steane',
          ],
          concepts: [
            'Stabiliser group of commuting Paulis',
            'Code space: +1 eigenspace of all generators',
            'Syndrome bit = 1 iff error anticommutes with generator',
            'Logical operators commute with all stabilisers',
            'Distance d and [[n, k, d]]',
            'CSS codes from classical codes C₂ ⊂ C₁',
            'Steane code [[7, 1, 3]] from Hamming [7, 4, 3]',
            'Transversal gates',
          ],
          explanation: `**Stabilisers.** The bit-flip code is the joint $+1$ eigenspace of $Z_1Z_2$ and $Z_2Z_3$; Shor's code that of eight checks. In general a **stabiliser code** is defined by $m$ independent, mutually commuting Pauli operators (generators) on $n$ qubits; the code space, their joint $+1$ eigenspace, has dimension $2^{n-m}$, so it holds $k = n - m$ logical qubits. Gottesman's thesis built the theory.

**Syndromes from (anti)commutation.** Paulis either commute or anticommute. If an error $E$ anticommutes with generator $g$, then $g(E|\\psi\\rangle) = -E|\\psi\\rangle$, so measuring $g$ gives $-1$. The syndrome is just the list of generators each error anticommutes with: $X_2$ anticommutes with $Z_1Z_2$ and $Z_2Z_3$, hence $(-1, -1)$. No state vectors needed.

**Logical operators and distance.** Operators that commute with every generator but are not themselves stabilisers act on the encoded qubit: in the bit-flip code $\\bar X = X_1X_2X_3$ and $\\bar Z = Z_1$. The **distance** $d$ is the smallest weight of a logical operator; the code corrects $\\lfloor(d-1)/2\\rfloor$ errors. The bit-flip code has $\\bar Z = Z_1$ of weight 1, so its distance is 1 against general errors, which is why it fails on phase flips.

**CSS codes.** Calderbank, Shor and Steane noticed that two classical linear codes $C_2 \\subset C_1$ give a quantum code: $Z$-type checks from the parity checks of $C_1$ catch bit flips and $X$-type checks from $C_2^\\perp$ catch phase flips, independently.

**The Steane code.** Take the classical Hamming $[7,4,3]$ code with parity-check matrix
$$H = \\begin{pmatrix}0&0&0&1&1&1&1\\\\0&1&1&0&0&1&1\\\\1&0&1&0&1&0&1\\end{pmatrix}.$$
Column $j$ is $j$ written in binary, so the syndrome of a single flip on bit $j$ *is* the number $j$: a flip on bit 5 gives $(1, 0, 1)$. Use the three rows once as $Z$-type checks (e.g. $Z_4Z_5Z_6Z_7$) and once as $X$-type checks ($X_4X_5X_6X_7$, ...): six generators on seven qubits, $k = 1$, $d = 3$. An $X_5$ error trips the $Z$-checks in pattern 101; a $Z_5$ error trips the $X$-checks in pattern 101; a $Y_5$ trips both.

**Transversal gates.** On the Steane code, applying $H$ to all seven qubits implements logical $\\bar H$, and bitwise CNOT between two code blocks implements logical CNOT. Transversal gates cannot spread one error to several qubits in a block, so they are naturally fault-tolerant. But no code has a transversal universal gate set (Eastin-Knill theorem); for Steane, $T$ is the missing gate (last lesson of this module).

Gottesman's thesis chapters 3-4 are the classic reference.`,
          resources: [
            ibm('foundations-of-quantum-error-correction', 'Lessons 2-3, The stabilizer formalism and Quantum code constructions: stabilisers, CSS codes and the Steane code.', true),
            arxiv('quant-ph/9705052', 'Gottesman, Stabilizer codes and quantum error correction (PhD thesis, 1997)', 'Chapters 3 and 4 define stabiliser codes and work through the standard examples.'),
            arxiv('quant-ph/9601029', 'Steane, Multiple particle interference and quantum error correction (1996)', 'The seven-qubit code in the original paper; compare its construction with the Hamming-code view.'),
          ],
          exercises: [
            {
              slug: 'stabiliser-syndromes',
              title: 'Syndromes by commutation',
              prompt:
                'For the Steane code with generators built from the rows of $H$ above, give the six-bit syndrome of $X_3$, $Z_6$, $Y_7$ and the two-qubit error $X_1X_2$. Which single-qubit $X$ error has the same syndrome as $X_1X_2$, and what happens if the decoder assumes it?',
              kind: 'problem',
              difficulty: 2,
              hint: '$X_1X_2$ has $Z$-syndrome $001 \\oplus 010 = 011$, the same as $X_3$. Correcting $X_3$ leaves $X_1X_2X_3$, which is a logical operator: a logical error.',
            },
            {
              slug: 'logical-operators',
              title: 'Logical operators and distance',
              prompt:
                'For the Steane code, show that $\\bar X = X^{\\otimes7}$ and $\\bar Z = Z^{\\otimes7}$ commute with all six generators and anticommute with each other. Find a weight-3 representative of $\\bar Z$ (multiply by stabilisers) and explain why no weight-2 logical operator exists, so $d = 3$.',
              kind: 'derivation',
              difficulty: 3,
              hint: 'Each generator has even overlap (weight 4) with the all-ones string. $Z_1Z_2Z_3$ is a logical $\\bar Z$ (three columns of $H$ that sum to zero: 1 ⊕ 2 ⊕ 3 = 0).',
            },
            {
              slug: 'code-space-dimension',
              title: 'Counting the code space',
              prompt:
                'Prove that $m$ independent commuting Pauli generators on $n$ qubits define a code space of dimension $2^{n-m}$ (hint: each generator splits the space into two equal eigenspaces). Then give $[[n, k, d]]$ for the bit-flip code, the phase-flip code, Shor\'s code and Steane\'s code, where $d$ is computed for arbitrary errors.',
              kind: 'derivation',
              difficulty: 2,
              hint: 'Bit-flip and phase-flip codes are $[[3, 1, 1]]$ against arbitrary errors (distance 3 only against their own error type); Shor $[[9, 1, 3]]$; Steane $[[7, 1, 3]]$.',
            },
          ],
          selfAssessment: [
            {
              question: 'How is a syndrome computed in the stabiliser formalism?',
              answerOutline: 'Each generator gives −1 if it anticommutes with the error and +1 if it commutes.',
            },
            {
              question: 'What makes a CSS code?',
              answerOutline: 'Separate X-type and Z-type generators taken from two nested classical codes, so bit flips and phase flips are detected independently.',
            },
            {
              question: 'Why are transversal gates attractive, and what limits them?',
              answerOutline: 'They act qubit-by-qubit across blocks, so they cannot spread an error within a block (fault-tolerant); Eastin-Knill: no code has a universal set of transversal gates.',
            },
          ],
          quiz: [
            {
              question: 'A stabiliser code on 10 qubits has 8 independent generators. How many logical qubits does it encode?',
              options: ['8', '1', '2', '10'],
              answer: 2,
              explanation: 'The code space has dimension $2^{10-8} = 4$, so $k = 2$ logical qubits. Each independent generator halves the space.',
            },
            {
              question: 'In the Steane code, which $Z$-check syndrome (rows of $H$, top to bottom) does an $X$ error on qubit 6 produce?',
              options: ['011', '110', '101', '100'],
              answer: 1,
              explanation: 'Column 6 of $H$ is 6 in binary, 110. 011 is column 3 (bit order reversed), and an $X$ error never fires the $X$-type checks.',
            },
            {
              question: 'Which statement distinguishes a stabiliser from a logical operator?',
              options: [
                'A stabiliser acts trivially on every codeword; a logical operator commutes with all stabilisers but changes the encoded state',
                'Stabilisers anticommute with each other; logical operators commute',
                'Logical operators are always single-qubit operators',
                'There is no difference',
              ],
              answer: 0,
              explanation: 'Both commute with every generator, so neither is detected; but a stabiliser is harmless while a logical operator is an undetectable error. The smallest weight of a logical operator is the distance.',
            },
          ],
          relatedLessons: ['linear-algebra-computational/vector-spaces/four-fundamental-subspaces', 'abstract-algebra/groups/subgroups-and-cyclic-groups'],
        },
        {
          slug: 'the-surface-code',
          title: 'The surface code and the toric code',
          summary:
            'Kitaev\'s toric code and its planar version, the surface code: X and Z checks on a square lattice, logical operators as chains across the patch, distance d with about 2d² physical qubits, a threshold near 1 %, exponential suppression Λ^{−(d+1)/2}, decoding by matching, and Google\'s 2024 below-threshold experiment.',
          estimatedMinutes: 110,
          objectives: [
            'Describe the surface code layout: data qubits, X-type and Z-type measure qubits, and weight-4 checks',
            'Explain logical operators as chains crossing the patch and why the distance is the patch width',
            'Use the scaling ε_d ≈ A(p/p_th)^{(d+1)/2} to estimate the distance and qubit count for a target logical error',
            'Explain syndrome defects and minimum-weight matching decoding',
            'Interpret the Willow result: Λ ≈ 2.1 from distance 3 to 5 to 7',
          ],
          concepts: [
            'Toric code (Kitaev, 1997): stars and plaquettes',
            'Planar surface code with boundaries',
            'Weight-4 X and Z checks, nearest-neighbour only',
            'Logical operators as boundary-to-boundary chains',
            'Distance d, about 2d² physical qubits',
            'Threshold p_th ≈ 1 %',
            'Error suppression factor Λ',
            'Matching decoder, syndrome defects',
          ],
          explanation: `**Layout.** Put data qubits on a $d\\times d$ grid and measure qubits in between. Each measure qubit repeatedly measures the product of its four (or, at the edge, two) neighbouring data qubits: $Z$-type checks on one checkerboard colour, $X$-type on the other. Only nearest neighbours interact, which suits a flat chip. The rotated surface code of distance $d$ uses $d^2$ data and $d^2 - 1$ measure qubits: 17 for $d = 3$, 97 for $d = 7$.

**Errors as chains.** A single $X$ error flips the two $Z$-checks next to it: two **defects**. A chain of $X$ errors flips checks only at its two ends. The decoder sees only defects and pairs them by the shortest chains (**minimum-weight matching**). A **logical** $\\bar X$ is a chain of $X$s running from one boundary to the opposite one: it trips no check at all. So an undetectable error needs at least $d$ errors in a line. Kitaev's original **toric code** puts the lattice on a torus, encoding two logical qubits in the two ways a chain can wrap around.

**The threshold and Λ.** If physical error rates are below a **threshold** $p_{\\rm th}$ (about 1 % for the surface code with circuit-level noise), making the patch bigger makes the logical qubit better. Roughly
$$\\varepsilon_d \\approx A\\left(\\frac{p}{p_{\\rm th}}\\right)^{(d+1)/2},$$
so each step $d\\to d+2$ divides the logical error by $\\Lambda = p_{\\rm th}/p$. Example: $A = 0.1$ and $p/p_{\\rm th} = 0.1$ give $10^{-3}$ at $d = 3$ and $10^{-14}$ at $d = 25$, using $2\\cdot25^2 - 1 = 1249$ physical qubits for one logical qubit.

**What has been shown.** Google Quantum AI reported (Nature, published online December 2024) surface-code memories on its 105-qubit Willow chip at $d = 3, 5, 7$, with the logical error per cycle falling by $\\Lambda = 2.14 \\pm 0.02$ at each step and $0.143\\%$ per cycle at $d = 7$ (101 qubits), with a logical lifetime about 2.4 times that of the best physical qubit, and real-time decoding at $d = 5$. That is "below threshold": bigger codes measurably better. It is a memory, not yet a computation, and $\\Lambda \\approx 2$ implies large distances for useful error rates.

**Costs.** Checks run every cycle (about 1 μs on superconducting chips), the decoder must keep up in real time, and each logical qubit costs hundreds to thousands of physical ones. Quantum LDPC codes need fewer, but require longer-range connections.`,
          resources: [
            arxiv('1208.0928', 'Fowler, Mariantoni, Martinis and Cleland, Surface codes: towards practical large-scale quantum computation (2012)', 'The standard tutorial: layout, logical operators, error chains and resource estimates. Read sections I-V.', ),
            free('Google Quantum AI, Quantum error correction below the surface code threshold (Nature, 2025; arXiv 2408.13687)', 'https://www.nature.com/articles/s41586-024-08449-y', 'article', 'Nature (open access)', 'The Willow experiment: read the abstract and figures 1-3 for Λ and the logical error rates.', true),
            pldemo('tutorial_toric_code', 'Modelling the toric code on a quantum computer', 'Build the toric code\'s stabilisers and anyons in simulation.'),
            arxiv('quant-ph/0110143', 'Dennis, Kitaev, Landahl and Preskill, Topological quantum memory (2002)', 'The paper that analysed the toric code as a memory and connected its threshold to statistical mechanics.'),
          ],
          exercises: [
            {
              slug: 'distance-planning',
              title: 'Choose a code distance',
              prompt:
                'Using $\\varepsilon_d = 0.1\\,(p/p_{\\rm th})^{(d+1)/2}$, find the smallest odd $d$ giving a logical error per cycle of at most $10^{-12}$ for (a) $p/p_{\\rm th} = 0.5$, (b) $0.1$, (c) $0.01$. Give the number of physical qubits $2d^2 - 1$ for each. Then estimate the physical qubits for 1000 such logical qubits in case (b), ignoring magic-state factories and routing.',
              kind: 'problem',
              difficulty: 2,
              hint: '(a) $0.5^{(d+1)/2} < 10^{-11}$ needs $(d+1)/2 \\ge 37$, $d = 73$, 10,657 qubits. (b) $(d+1)/2 \\ge 11$, $d = 21$, 881 qubits. (c) $d = 11$, 241 qubits. 1000 logical in (b): about 0.9 million.',
            },
            {
              slug: 'willow-lambda',
              title: 'Read the Willow numbers',
              prompt:
                'From the Willow paper\'s abstract: the $d = 7$ logical error per cycle is 0.143 % and $\\Lambda = 2.14$. Predict the logical error per cycle at $d = 5$, $d = 3$ and (extrapolating) $d = 15$ and $d = 27$. How many cycles of 1.1 μs could a $d = 27$ memory survive with 50 % probability? State which assumption of this extrapolation is most likely to fail.',
              kind: 'data-analysis',
              difficulty: 2,
              hint: '$d = 5$: 0.306 %; $d = 3$: 0.655 %; $d = 15$: $0.143\\%/2.14^4 \\approx 0.0068\\%$; $d = 27$: $\\approx 7\\times10^{-7}$ per cycle, about a million cycles (about 1 s) for 50 % survival. Correlated errors (cosmic rays, leakage) break the simple scaling.',
            },
            {
              slug: 'matching-by-hand',
              title: 'Decode by matching',
              prompt:
                'Draw a distance-5 rotated surface-code patch. Place $X$ errors on three data qubits in a diagonal line from the left boundary. Mark the defects, find the minimum-weight matching (defects can also be matched to the boundary), and decide whether the correction leaves a logical error. Repeat with the three errors placed so that the matching chooses the wrong partner.',
              kind: 'problem',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does a logical error in the surface code need about d physical errors?',
              answerOutline: 'A logical operator is a chain crossing the patch from one boundary to the other; shorter chains leave defects at their ends and are detected.',
            },
            {
              question: 'What is Λ and what value did the Willow experiment report?',
              answerOutline: 'The factor by which the logical error drops when d increases by 2; about 2.14 for d = 3 → 5 → 7 (published December 2024).',
            },
            {
              question: 'How many physical qubits does a distance-d rotated surface code use?',
              answerOutline: 'd² data qubits plus d² − 1 measure qubits, 2d² − 1 in total (e.g. 97 for d = 7).',
            },
          ],
          quiz: [
            {
              question: 'A surface code has $\\Lambda = 4$ and logical error per cycle $10^{-4}$ at $d = 9$. What is the predicted value at $d = 15$?',
              options: ['$1.6\\times10^{-6}$', '$2.5\\times10^{-5}$', '$4\\times10^{-4}$', '$10^{-10}$'],
              answer: 0,
              explanation: 'Three steps of $d\\to d+2$ divide by $\\Lambda^3 = 64$: $10^{-4}/64 \\approx 1.6\\times10^{-6}$. $2.5\\times10^{-5}$ uses one step only.',
            },
            {
              question: 'Two adjacent $Z$-check measure qubits both report $-1$ in a surface code, and nothing else fires. What is the most likely explanation?',
              options: [
                'A logical $\\bar X$ error',
                'A single $X$ error on the data qubit shared by those two checks',
                'Two $Z$ errors',
                'The decoder has failed',
              ],
              answer: 1,
              explanation: 'A single $X$ error creates defects on the two $Z$-checks touching it. A logical $\\bar X$ crosses the whole patch and creates no defects at all; $Z$ errors are caught by $X$-type checks.',
            },
            {
              question: 'What did Google\'s 2024 Willow surface-code experiment demonstrate?',
              options: [
                'A fault-tolerant computation with 100 logical qubits',
                'That surface codes do not work on superconducting qubits',
                'Factoring with error-corrected qubits',
                'A logical memory whose error per cycle fell by about 2.1× with each increase of the distance from 3 to 5 to 7, below threshold',
              ],
              answer: 3,
              explanation: 'It stored one logical qubit and showed exponential suppression with distance, the defining property of operating below threshold. It did not run logical algorithms at scale; that and much larger Λ or d remain to be shown.',
            },
          ],
          relatedLessons: ['discrete-mathematics/graphs-and-trees/graph-basics-and-the-handshake-lemma'],
        },
        {
          slug: 'fault-tolerance-and-magic-states',
          title: 'Fault tolerance, the threshold theorem and magic states',
          summary:
            'Making the error-correction circuits themselves tolerant of faults, the threshold theorem and its polylogarithmic overhead, logical versus physical qubits, why the Clifford gates are cheap and the T gate is not, and magic-state distillation (15-to-1, output error 35p³).',
          estimatedMinutes: 110,
          objectives: [
            'Explain what makes a circuit fault-tolerant and why a single fault must not cause two errors in a block',
            'State the threshold theorem and estimate overhead by concatenation',
            'Distinguish physical qubits, logical qubits and the overheads between them',
            'Explain why T gates require magic states and compute the error after 15-to-1 distillation',
            'Read a fault-tolerant resource estimate in terms of logical qubits, T count and factories',
          ],
          concepts: [
            'Fault-tolerant gadgets (no error spreading within a block)',
            'Threshold theorem',
            'Concatenation: p → c p², doubly exponential suppression',
            'Overhead polylogarithmic in circuit size',
            'Physical versus logical qubit',
            'Eastin-Knill: no universal transversal gate set',
            'Magic state |A⟩ = T|+⟩ and gate teleportation',
            '15-to-1 distillation: p → 35p³',
          ],
          explanation: `**Faults everywhere.** Error correction uses gates and measurements that are themselves noisy. A circuit is **fault-tolerant** if a single fault anywhere (in a data gate, a syndrome CNOT or a measurement) causes at most one error per code block, so the code can still fix it. Careless syndrome extraction violates this: a CNOT from one ancilla into two data qubits can copy one ancilla error onto both. Fault-tolerant designs use transversal gates, verified ancillas and repeated syndrome measurements.

**The threshold theorem** (Aharonov and Ben-Or; Knill, Laflamme and Zurek; Kitaev, all 1996-97): if every physical operation fails with probability below some constant $p_{\\rm th}$, any circuit of $G$ gates can be run with total failure probability $\\varepsilon$ using only $O(G\\,\\mathrm{polylog}(G/\\varepsilon))$ physical operations. Concatenation shows why. A distance-3 code turns error $p$ into about $cp^2$; encoding again gives $c(cp^2)^2$, and after $k$ levels $(cp)^{2^k}/c$, **doubly exponential** suppression for polynomially more qubits, as long as $cp < 1$, i.e. $p < p_{\\rm th} = 1/c$. With $c = 100$ and $p = 10^{-3}$, three levels give $(0.1)^8/100 = 10^{-10}$.

**Physical versus logical.** A machine's headline qubit count is physical. A useful **logical qubit** with error $10^{-10}$ or so needs hundreds to thousands of physical qubits plus a fast classical decoder, so "more physical qubits" helps only if they are good enough (below threshold, with margin) and well enough connected. A 1000-qubit chip above threshold may hold zero useful logical qubits.

**Why T is expensive.** In the surface code, Clifford gates (Paulis, $H$, $S$, CNOT) are cheap: Paulis are tracked in software and the rest are done by code deformation or lattice surgery. But Clifford gates alone are classically simulable (Gottesman-Knill), and **no code has a universal transversal gate set** (Eastin-Knill, 2009). The standard fix is **magic states**. Prepare $|A\\rangle = T|+\\rangle$ noisily; consume one copy with a CNOT, a measurement and a possible $S$ correction to apply a $T$ gate by **gate teleportation**. Noisy magic states are purified by **distillation**: the 15-to-1 protocol (Bravyi and Kitaev, 2005) uses 15 copies with error $p$ to make one with error about $35p^3$. From $p = 10^{-3}$: $3.5\\times10^{-8}$ after one round, about $1.5\\times10^{-21}$ after two.

So fault-tolerant costs are counted in **T gates** (or Toffolis, about 7 T gates each) and magic-state **factories** occupy a large share of the chip. Newer schemes such as magic-state cultivation (used in the 2025 RSA estimate) cut that cost substantially.`,
          resources: [
            ibm('foundations-of-quantum-error-correction', 'Lesson 4, Fault-tolerant quantum computation: fault-tolerant gadgets, the threshold theorem and magic states.', true),
            arxiv('quant-ph/0403025', 'Bravyi and Kitaev, Universal quantum computation with ideal Clifford gates and noisy ancillas (2005)', 'The magic-state distillation paper; section on the 15-to-1 protocol.'),
            arxiv('quant-ph/9906129', 'Aharonov and Ben-Or, Fault-tolerant quantum computation with constant error rate (1999)', 'One of the original threshold-theorem papers; the introduction explains concatenation and the threshold.'),
          ],
          exercises: [
            {
              slug: 'concatenation-numbers',
              title: 'Concatenation in numbers',
              prompt:
                'With $p_{k+1} = c\\,p_k^2$ and $c = 10^4$ (a pessimistic constant), find the threshold. For $p_0 = 10^{-5}$, compute $p_1, p_2, p_3$. If each level multiplies the qubit count by 7 (Steane code) and the gate count by about 100, what does three levels cost per logical gate? Compare with the surface-code estimate from the previous lesson.',
              kind: 'problem',
              difficulty: 2,
              hint: 'Threshold $10^{-4}$. $p_1 = 10^{-6}$, $p_2 = 10^{-8}$, $p_3 = 10^{-12}$. Three levels: 343 physical qubits per logical qubit and about $10^6$ physical gates per logical gate.',
            },
            {
              slug: 'distillation-budget',
              title: 'A magic-state budget',
              prompt:
                'An algorithm needs $10^{9}$ T gates with total failure probability below 1 %. (a) What error per magic state is required? (b) Starting from $p = 10^{-3}$, how many rounds of 15-to-1 distillation are needed, and how many raw states per output? (c) If a factory makes one output state every 10 μs, how long does the algorithm take with one factory, and with 20 in parallel?',
              kind: 'problem',
              difficulty: 2,
              hint: '(a) $10^{-11}$. (b) One round gives $3.5\\times10^{-8}$ (not enough); two rounds give $\\approx1.5\\times10^{-21}$; 225 raw states per output. (c) $10^4$ s (about 2.8 hours); 500 s with 20.',
            },
            {
              slug: 'gate-teleportation',
              title: 'T by gate teleportation',
              prompt:
                'Show that with input $|\\psi\\rangle = \\alpha|0\\rangle + \\beta|1\\rangle$ and an ancilla in $|A\\rangle = T|+\\rangle$, applying CNOT from the data qubit to the ancilla and measuring the ancilla in $Z$ leaves the data qubit in $T|\\psi\\rangle$ (outcome 0) or, up to a global phase, $T^\\dagger|\\psi\\rangle$ (outcome 1), which an $S$ gate (a Clifford) turns into $T|\\psi\\rangle$. Write out the four-term state before measurement.',
              kind: 'derivation',
              difficulty: 3,
              hint: 'The CNOT gives $\\tfrac{1}{\\sqrt2}[(\\alpha|0\\rangle + e^{i\\pi/4}\\beta|1\\rangle)|0\\rangle + (e^{i\\pi/4}\\alpha|0\\rangle + \\beta|1\\rangle)|1\\rangle]$; the second branch is $e^{i\\pi/4}T^\\dagger|\\psi\\rangle$, and $ST^\\dagger = T$.',
            },
          ],
          selfAssessment: [
            {
              question: 'State the threshold theorem informally.',
              answerOutline: 'If physical error rates are below a constant threshold, arbitrarily long quantum computations can be performed reliably with overhead polylogarithmic in the circuit size.',
            },
            {
              question: 'Why are T gates expensive in fault-tolerant machines?',
              answerOutline: 'Clifford gates are easy (transversal or lattice surgery) but not universal; Eastin-Knill forbids a universal transversal set, so T needs magic states, which must be distilled in large factories.',
            },
            {
              question: 'What does 15-to-1 distillation do?',
              answerOutline: 'Converts 15 magic states of error p into one of error about 35p³, using only Clifford operations and measurements.',
            },
          ],
          quiz: [
            {
              question: 'Magic states start with error $p = 10^{-2}$. What is the error after one round of 15-to-1 distillation?',
              options: ['$3.5\\times10^{-5}$', '$1.5\\times10^{-3}$', '$10^{-6}$', '$6.7\\times10^{-4}$'],
              answer: 0,
              explanation: '$35p^3 = 35\\times10^{-6} = 3.5\\times10^{-5}$. $10^{-6}$ forgets the factor 35; $6.7\\times10^{-4}$ divides $p$ by 15, as if distillation just averaged.',
            },
            {
              question: 'A company announces a 1000-qubit chip with two-qubit gate errors of 2 %. How many surface-code logical qubits with error below $10^{-6}$ can it host?',
              options: ['About 1000', 'About 10', 'About 100', 'None: the error rate is above the roughly 1 % threshold, so larger codes make logical errors worse'],
              answer: 3,
              explanation: 'Above threshold, increasing the distance increases the logical error rate. Physical qubit count is not the same as useful (logical) qubit count; the quality of each qubit decides.',
            },
            {
              question: 'Which is the main reason fault-tolerant resource estimates count T gates?',
              options: [
                'T gates are the slowest physical pulses',
                'Clifford gates are cheap in the surface code, but T gates need distilled magic states, which dominate the space and time cost',
                'T gates cannot be error corrected at all',
                'T gates are needed only for Grover search',
              ],
              answer: 1,
              explanation: 'On the physical level T is just a small Z rotation; on the logical level it needs gate teleportation with a distilled magic state. Factories for these states take a large share of a fault-tolerant machine.',
            },
            {
              question: 'Which pair is correctly matched?',
              options: [
                'Physical qubit: an encoded qubit spread over many hardware qubits; logical qubit: one transmon',
                'Logical error rate: always equal to the physical error rate',
                'Physical qubit: one hardware two-level system; logical qubit: information encoded across many physical qubits, with a lower error rate only below threshold',
                'Threshold: the number of qubits needed for advantage',
              ],
              answer: 2,
              explanation: 'A logical qubit is a code; below threshold its error falls as the code grows, above threshold it rises. The threshold is an error rate, not a qubit count.',
            },
          ],
        },
      ],
      project: {
        slug: 'decoders-for-3-and-9-qubit-codes',
        title: 'Decoders for the three-qubit and nine-qubit codes',
        description: `Write (or, without programming, tabulate by hand and check with the widget) syndrome decoders for the bit-flip code and Shor's code, and measure their performance. (1) **Tables.** Derive the full syndrome table of the bit-flip code and the 256-entry syndrome-to-correction map of Shor's code for all single-qubit Paulis, noting the degenerate cases. (2) **Pauli-frame simulation.** Represent an error as two bit strings (its $X$ and $Z$ parts), compute syndromes by parity checks, apply the decoder's correction, and decide whether the residual is a stabiliser (success) or a logical operator (failure). (3) **Curves.** Estimate the logical error rate by Monte Carlo ($10^5$ trials per point) for $X$-only, $Z$-only and depolarising noise from $p = 0.001$ to $0.3$, and compare with the exact formulas ($3p^2 - 2p^3$; the Shor-code block formula) and with the widget's Rate mode. (4) **Break-even.** Find the break-even $p$ for each code and noise model, and explain why Shor's code breaks even at a lower $p$ than the bit-flip code does against pure bit flips.`,
        deliverables: [
          'The syndrome tables with the degenerate cases explained',
          'A Pauli-frame simulator (or a hand-checked set of 20 random trials if not programming)',
          'Logical error curves with exact formulas overlaid and break-even points marked',
          'A one-page discussion connecting the results to the threshold idea',
        ],
        estimatedHours: 4,
        stretchGoals: ['Simulate the distance-3 and distance-5 surface codes with Stim and PyMatching and estimate Λ for code-capacity noise', 'Add measurement errors (repeat syndrome extraction three times) and show how the break-even point moves'],
      },
    },
    {
      slug: 'building-a-quantum-computer',
      title: 'Building a Quantum Computer',
      description:
        'What the machines physically are and how well they work: the DiVincenzo criteria, spin qubits and Larmor precession, superconducting transmons (anharmonic oscillators driven by microwave pulses, read out dispersively at 10 mK), trapped ions and neutral atoms (laser gates, Mølmer-Sørensen and Rydberg blockade), benchmarking, NISQ algorithms and quantum simulation, and a dated, sourced account of where the field stands.',
      lessons: [
        {
          slug: 'divincenzo-criteria-and-qubit-platforms',
          title: 'The DiVincenzo criteria and the physical qubit',
          summary:
            'What any physical system needs to be a quantum computer (DiVincenzo\'s five criteria plus two for communication), a spin in a magnetic field as the model qubit (Larmor precession and resonant driving), and a first comparison of the main platforms.',
          estimatedMinutes: 90,
          objectives: [
            'State the DiVincenzo criteria and test a proposed qubit against them',
            'Describe a spin-1/2 in a magnetic field as a qubit and compute its Larmor frequency',
            'Explain how a resonant oscillating field rotates the qubit (the origin of gates)',
            'Compare superconducting, trapped-ion, neutral-atom, photonic and spin qubits on speed, coherence, connectivity and scaling',
          ],
          concepts: [
            'DiVincenzo criteria',
            'Well-defined two-level system',
            'Initialisation, coherence, universal gates, measurement',
            'Larmor precession at ω = γB',
            'Resonant driving and the rotating frame',
            'Platform trade-offs: speed versus coherence versus connectivity',
            'Photonic and semiconductor spin qubits',
          ],
          explanation: `In 2000 David DiVincenzo listed what a physical system needs to compute:
1. a scalable system of well-characterised **qubits** (two levels you can isolate from the rest);
2. **initialisation** to a simple state such as $|0\\cdots0\\rangle$;
3. **coherence** times much longer than gate times;
4. a **universal set of gates**;
5. qubit-specific **measurement**;
plus, for networks, (6) converting stationary to flying qubits and (7) transmitting them.

**The model qubit: a spin.** An electron spin in a magnetic field $B$ along $z$ has two energy levels split by $\\hbar\\omega_0$ with $\\omega_0 = \\gamma B$; for an electron $\\gamma/2\\pi \\approx 28$ GHz/T, so $B = 0.5$ T gives 14 GHz. The Hamiltonian $H = -\\tfrac{\\hbar\\omega_0}{2}Z$ generates $e^{-iHt/\\hbar} = R_z(-\\omega_0t)$ up to sign conventions: the Bloch vector **precesses** about $z$ at the Larmor frequency, a free $R_z$ gate running all the time. Add a weak field oscillating at $\\omega_0$ in the $xy$-plane. In a frame rotating with the spin, the oscillating field looks static and the state rotates slowly about an axis in the $xy$-plane at the **Rabi frequency** $\\Omega$, proportional to the drive amplitude. A pulse of duration $t$ is a rotation by $\\Omega t$: $\\Omega t = \\pi$ is an $X$ gate, $\\pi/2$ a $\\sqrt X$, and the drive's phase sets the axis ($x$ or $y$). Every platform implements gates this way, with microwaves or lasers.

**The platforms**, in rough numbers (each varies a lot between groups and years):

| platform | qubit | gate time (2-qubit) | coherence | connectivity |
|---|---|---|---|---|
| superconducting | transmon circuit, ~5 GHz | 20-100 ns | T1, T2 ~ 0.05-0.5 ms | nearest neighbour |
| trapped ion | hyperfine levels of an ion | 10-1000 μs | T2 seconds or more | all-to-all in a chain |
| neutral atom | hyperfine levels of an atom in a tweezer | ~0.2-1 μs (Rydberg) | T2 ~ seconds | reconfigurable by moving atoms |
| photonic | polarisation or path of a photon | measurement-based | no decoherence, but loss | by optics |
| semiconductor spin | electron spin in a quantum dot | 10-100 ns | T2 ~ 0.1-1 ms (echo) | nearest neighbour |

Fast gates come with short coherence, long coherence with slow gates. What matters is operations per coherence time and above all the **error per operation**, which the threshold theorem cares about.`,
          resources: [
            arxiv('quant-ph/0002077', 'DiVincenzo, The physical implementation of quantum computation (2000)', 'The criteria in the original paper; read sections 1-4 and compare his list with today\'s machines.', ),
            berkeley('The physical-qubit lectures: spin-1/2, Larmor precession, NMR and the rotating frame, as in C191.'),
            arxiv('2112.08863', 'Burkard, Ladd, Pan, Nichol and Petta, Semiconductor spin qubits (2021)', 'A review of spin qubits in quantum dots; read the introduction and the section on single-qubit control.'),
            uiuc('The Fall 2023 PHYS 370 offering included hardware lectures on neutral atoms, trapped ions, spins in solids and superconducting circuits.'),
          ],
          exercises: [
            {
              slug: 'larmor-numbers',
              title: 'Larmor and Rabi numbers',
              prompt:
                'An electron spin sits in $B = 0.3$ T. (a) Its Larmor frequency? (b) A resonant drive produces a Rabi frequency $\\Omega/2\\pi = 5$ MHz: how long are the $\\pi$ and $\\pi/2$ pulses? (c) With $T_2 = 100$ μs, how many $\\pi$ pulses fit in one coherence time? (d) Repeat (a) for a proton ($\\gamma/2\\pi = 42.6$ MHz/T) and say why nuclear spins make long-lived but slow qubits.',
              kind: 'problem',
              difficulty: 1,
              hint: '(a) 8.4 GHz. (b) $t_\\pi = 1/(2\\cdot5$ MHz$) = 100$ ns, $t_{\\pi/2} = 50$ ns. (c) about 1000. (d) 12.8 MHz.',
            },
            {
              slug: 'divincenzo-audit',
              title: 'Audit a platform',
              prompt:
                'Pick one platform (superconducting, trapped ion, neutral atom, photonic or spin). For each DiVincenzo criterion, say in two or three sentences how it is met, with one number, and what the main obstacle to scaling is. Cite a review from this module for each number and give its year.',
              kind: 'writing',
              difficulty: 2,
            },
            {
              slug: 'rotating-frame',
              title: 'The rotating frame',
              prompt:
                'For $H = -\\tfrac{\\hbar\\omega_0}{2}Z + \\hbar\\Omega\\cos(\\omega t)X$, move to the frame rotating at $\\omega$ about $z$ and drop terms oscillating at $2\\omega$ (the rotating-wave approximation). Show the effective Hamiltonian is $\\tfrac{\\hbar}{2}(\\Delta Z + \\Omega X)$ with $\\Delta = \\omega - \\omega_0$ (up to sign conventions), and find the rotation axis and rate. What happens when $\\Delta \\gg \\Omega$?',
              kind: 'derivation',
              difficulty: 3,
              hint: 'The axis is $(\\Omega, 0, \\Delta)/\\sqrt{\\Omega^2 + \\Delta^2}$ and the rate $\\sqrt{\\Omega^2 + \\Delta^2}$; far off resonance the state barely leaves the pole.',
            },
          ],
          selfAssessment: [
            {
              question: 'List the five DiVincenzo criteria.',
              answerOutline: 'Scalable well-defined qubits; initialisation; long coherence relative to gate time; a universal gate set; qubit-specific measurement (plus two for communication).',
            },
            {
              question: 'How does a resonant drive implement a gate?',
              answerOutline: 'In the frame rotating at the qubit frequency the drive is a static field in the xy-plane; the state rotates about it at the Rabi frequency, so pulse area sets the angle and drive phase sets the axis.',
            },
            {
              question: 'What is the central trade-off between platforms?',
              answerOutline: 'Gate speed versus coherence and connectivity: superconducting qubits are fast but short-lived and locally connected; ions and atoms are long-lived and well connected but slower.',
            },
          ],
          quiz: [
            {
              question: 'A qubit is driven on resonance with Rabi frequency $\\Omega/2\\pi = 20$ MHz. How long is a $\\pi$ pulse?',
              options: ['50 ns', '25 ns', '12.5 ns', '8 ns'],
              answer: 1,
              explanation: 'A full Rabi cycle takes $1/(20$ MHz$) = 50$ ns, and a $\\pi$ pulse is half a cycle: 25 ns. 50 ns is a $2\\pi$ pulse, which returns the state (with a sign).',
            },
            {
              question: 'Which DiVincenzo criterion is the hardest one for photonic qubits?',
              options: [
                'Coherence: photons decohere quickly',
                'Measurement: photons cannot be detected',
                'Deterministic two-qubit gates: photons barely interact, so entangling operations are probabilistic or measurement-based, and loss accumulates',
                'Initialisation: photons cannot be prepared in a known state',
              ],
              answer: 2,
              explanation: 'Photons hardly decohere and are easy to detect, but they do not naturally interact, so photonic schemes rely on measurement-induced entanglement with heralding and must fight loss.',
            },
            {
              question: 'Which comparison is correct?',
              options: [
                'Trapped-ion two-qubit gates are typically much slower than superconducting ones, but their qubits stay coherent far longer',
                'Superconducting qubits have the longest coherence times of all platforms',
                'All platforms have the same gate speeds; only qubit counts differ',
                'Neutral atoms cannot be entangled',
              ],
              answer: 0,
              explanation: 'Ion gates take tens to hundreds of microseconds against tens of nanoseconds for transmons, while ion hyperfine coherence lasts seconds against fractions of a millisecond. The useful comparison is error per operation and operations per coherence time.',
            },
          ],
          relatedLessons: ['quantum-mechanics/angular-momentum-and-spin/spin-one-half-and-stern-gerlach', 'quantum-mechanics/formalism-and-dirac-notation/two-level-systems'],
        },
        {
          slug: 'superconducting-transmons',
          title: 'Superconducting transmon qubits',
          summary:
            'From an LC circuit to a qubit: the Josephson junction as a nonlinear inductor, the transmon\'s anharmonicity, microwave pulses and Rabi oscillations, two-qubit couplers, dispersive readout through a resonator, and why the chip lives in a dilution refrigerator at 10 mK.',
          estimatedMinutes: 110,
          objectives: [
            'Explain why an LC oscillator is not a qubit and how a Josephson junction fixes that',
            'Estimate a transmon\'s frequency and anharmonicity from E_J and E_C',
            'Relate pulse length and Rabi frequency to π and π/2 rotations, and explain leakage',
            'Explain dispersive readout and why it is a measurement in the Z basis',
            'Justify the 10 mK operating temperature with hf/kT',
          ],
          concepts: [
            'LC oscillator: equally spaced levels',
            'Josephson junction: nonlinear inductance',
            'Transmon: f₀₁ ≈ √(8E_JE_C) − E_C, anharmonicity ≈ −E_C',
            'Microwave drive and Rabi oscillations',
            'Leakage to |2⟩ and DRAG pulses',
            'Virtual Z gates',
            'Couplers and two-qubit gates (CZ, iSWAP, cross-resonance)',
            'Dispersive readout via a resonator',
            'Dilution refrigerator at about 10 mK',
          ],
          explanation: `**Why not just an LC circuit?** A superconducting LC circuit is a quantum harmonic oscillator with levels equally spaced by $hf$, $f = 1/(2\\pi\\sqrt{LC})$. A microwave pulse tuned to $f$ would drive $|0\\rangle\\to|1\\rangle\\to|2\\rangle\\to\\cdots$ alike, so there is no isolated two-level system.

**The Josephson junction** (two superconductors separated by a nanometre of oxide) behaves as a *nonlinear* inductor. Replacing $L$ with a junction makes the levels unequally spaced. In the **transmon** (Koch et al., 2007) the junction is shunted by a large capacitor; with Josephson energy $E_J$ and charging energy $E_C$,
$$f_{01} \\approx \\sqrt{8E_JE_C} - E_C,\\qquad f_{12} - f_{01} \\approx -E_C$$
(in frequency units). For $E_J/h = 20$ GHz and $E_C/h = 0.25$ GHz: $f_{01} \\approx 6.07$ GHz and an anharmonicity of about $-250$ MHz. A pulse at 6.07 GHz drives $|0\\rangle\\leftrightarrow|1\\rangle$ while the $|1\\rangle\\leftrightarrow|2\\rangle$ transition is 250 MHz away. The large $E_J/E_C$ (here 80) makes the qubit insensitive to stray charge, which is what made transmons the workhorse.

**Gates.** A microwave pulse on resonance drives Rabi oscillations, $P(1) = \\sin^2(\\Omega t/2)$; with $\\Omega/2\\pi = 10$ MHz a $\\pi$ pulse lasts 50 ns. Real pulses are 20-50 ns with shaped envelopes; too short a pulse has a broad spectrum that reaches $|2\\rangle$ (**leakage**), which DRAG pulse shaping suppresses. $R_z$ gates are done "virtually" by shifting the phase of all later pulses, at zero cost. Two-qubit gates use tunable couplers or frequency tuning (CZ, iSWAP) or a drive on one qubit at the other's frequency (cross-resonance), taking 30-300 ns.

\`\`\`interactive
qc-rabi
{"mode": "rabi", "modes": ["rabi", "ramsey"], "omega": 10, "detuning": 0, "T1": 50, "T2": 40, "tmax": 400, "title": "Driving a transmon: Rabi oscillations", "caption": "On resonance with Ω/2π = 10 MHz the π pulse is 50 ns and P(1) reaches nearly 1; press π/2 and π to set the pulse. Add 5 MHz of detuning: the oscillation speeds up but never reaches 1 (Ω²/(Ω² + Δ²) = 0.8). With T1 = 50 μs and T2 = 40 μs the decay is barely visible over 400 ns, because the coherence time is about a thousand π pulses long; lower T1 and T2 to a few microseconds to watch the oscillation damp toward its steady state."}
\`\`\`

**Readout.** Each transmon is coupled to a microwave resonator. In the **dispersive** regime the resonator's frequency shifts by $\\pm\\chi$ depending on whether the qubit is in $|0\\rangle$ or $|1\\rangle$. Sending a weak tone and measuring the phase of the reflected signal (amplified by a near-quantum-limited amplifier) reveals the qubit's $Z$ value in a few hundred nanoseconds, with errors of about 0.5-2 %.

**Why 10 mK.** At $T = 10$ mK, $kT/h \\approx 0.21$ GHz, so for a 5 GHz qubit $hf/kT \\approx 24$ and the thermal excited population is about $e^{-24}$, negligible. At 4 K, $hf/kT \\approx 0.06$ and the qubit would be nearly randomly excited. A **dilution refrigerator**, with filtered microwave lines running down through stages at 50 K, 4 K, 1 K, 100 mK and 10 mK, is the large cylinder in every photograph; each qubit needs several lines, a major obstacle to scaling to millions.`,
          resources: [
            arxiv('1904.06560', 'Krantz et al., A quantum engineer\'s guide to superconducting qubits (2019)', 'Sections II (the transmon), IV (gates) and V (readout); the main reading for this lesson.', ),
            arxiv('1905.13641', 'Kjaergaard et al., Superconducting qubits: current state of play (2019)', 'A shorter overview of gates, coherence and scaling challenges.'),
            free('IBM Quantum Learning: Quantum Computing in Practice', 'https://quantum.cloud.ibm.com/learning/en/courses/quantum-computing-in-practice', 'course', 'IBM Quantum', 'Lessons on running circuits on real superconducting hardware: transpilation, noise and error mitigation.', true),
          ],
          exercises: [
            {
              slug: 'transmon-design',
              title: 'Design a transmon',
              prompt:
                'Using $f_{01} \\approx \\sqrt{8E_JE_C} - E_C$ and anharmonicity $\\approx -E_C$ (frequency units), find $E_J/h$ for a qubit at 5.0 GHz with $E_C/h = 0.22$ GHz, and give $E_J/E_C$. If pulses must have bandwidth well below the anharmonicity, estimate the shortest sensible gate length (take bandwidth ≈ 1/duration and require it to be under a third of the anharmonicity).',
              kind: 'problem',
              difficulty: 2,
              hint: '$\\sqrt{8E_JE_C} = 5.22$ GHz, so $E_J = 5.22^2/(8\\cdot0.22) \\approx 15.5$ GHz and $E_J/E_C \\approx 70$. Bandwidth under 73 MHz means pulses longer than about 14 ns.',
            },
            {
              slug: 'thermal-population',
              title: 'Why the fridge?',
              prompt:
                'Compute the ratio $e^{-hf/kT}$ of excited to ground populations for a 5 GHz qubit at 300 K, 4 K, 100 mK, 20 mK and 10 mK. Real transmons often show 0.1-1 % residual excited population at 10 mK: what does that tell you about their effective temperature? (Solve for $T$.)',
              kind: 'problem',
              difficulty: 1,
              hint: '$hf/k = 0.24$ K. At 10 mK: $e^{-24} \\approx 4\\times10^{-11}$. 1 % corresponds to $T = 0.24/\\ln 100 \\approx 52$ mK.',
            },
            {
              slug: 'rabi-detuning',
              title: 'Detuned Rabi oscillations',
              prompt:
                'For a drive detuned by $\\Delta$, $P(1)$ oscillates at $\\Omega_{\\rm eff} = \\sqrt{\\Omega^2 + \\Delta^2}$ with maximum $\\Omega^2/\\Omega_{\\rm eff}^2$. With $\\Omega/2\\pi = 10$ MHz, find the maximum $P(1)$ for $\\Delta/2\\pi = 1, 5, 10, 20$ MHz and the time of the first maximum. Check two values in the widget. How accurately must the drive frequency be calibrated for a $\\pi$ pulse with error below $10^{-3}$?',
              kind: 'simulation',
              difficulty: 2,
              hint: 'Maxima: 0.990, 0.8, 0.5, 0.2. Error $\\approx (\\Delta/\\Omega)^2 < 10^{-3}$ needs $\\Delta/2\\pi$ below about 0.3 MHz.',
            },
          ],
          selfAssessment: [
            {
              question: 'Why is a Josephson junction essential for a superconducting qubit?',
              answerOutline: 'Its nonlinear inductance makes the oscillator anharmonic, so the 0-1 transition has a different frequency from 1-2 and can be driven selectively.',
            },
            {
              question: 'How is a transmon read out?',
              answerOutline: 'Dispersively: the coupled resonator\'s frequency depends on the qubit state; a probe tone\'s reflected phase reveals Z, amplified by a near-quantum-limited amplifier.',
            },
            {
              question: 'Why must transmons be cooled to about 10 mK?',
              answerOutline: 'So hf ≫ kT (≈ 24 at 5 GHz and 10 mK) and thermal excitation is negligible, and so the metals are superconducting with low loss.',
            },
          ],
          quiz: [
            {
              question: 'A transmon has $E_J/h = 16$ GHz and $E_C/h = 0.2$ GHz. What are its qubit frequency and anharmonicity, approximately?',
              options: ['4.86 GHz and −200 MHz', '5.06 GHz and +200 MHz', '16 GHz and −200 MHz', '3.2 GHz and −16 MHz'],
              answer: 0,
              explanation: '$\\sqrt{8\\cdot16\\cdot0.2} = \\sqrt{25.6} = 5.06$ GHz, minus $E_C$ gives 4.86 GHz, and the anharmonicity is about $-E_C = -200$ MHz: the 1-2 transition is lower than the 0-1 transition. The second option forgets the $-E_C$ and gets the sign of the anharmonicity wrong.',
            },
            {
              question: 'Why can a transmon not be driven with an arbitrarily short, strong pulse?',
              options: [
                'Because the qubit frequency drifts',
                'Because a very short pulse has a broad frequency spectrum that also drives the 1-2 transition, causing leakage out of the qubit subspace',
                'Because superconductors cannot carry strong currents',
                'Because the dilution refrigerator would heat up',
              ],
              answer: 1,
              explanation: 'The qubit is only anharmonic by a few hundred MHz; a pulse much shorter than a few nanoseconds overlaps the $|1\\rangle\\to|2\\rangle$ frequency. DRAG shaping and the choice of 20-50 ns pulses manage this.',
            },
            {
              question: 'Which statement about dispersive readout is correct?',
              options: [
                'It counts photons emitted by the qubit',
                'It measures the qubit in the $X$ basis',
                'It is perfect and instantaneous',
                'It infers $|0\\rangle$ or $|1\\rangle$ from a state-dependent shift of a coupled resonator\'s frequency, taking a few hundred nanoseconds with errors around 1 %',
              ],
              answer: 3,
              explanation: 'The resonator frequency shifts by $\\pm\\chi$ with the qubit\'s $Z$ value; the reflected probe phase reveals it. Readout is slow compared with gates and is often the largest single error source.',
            },
          ],
          relatedLessons: ['quantum-mechanics/one-dimensional-problems/the-harmonic-oscillator', 'physics-electricity-magnetism/electromagnetic-waves-and-optics/electromagnetic-waves'],
        },
        {
          slug: 'trapped-ions-and-neutral-atoms',
          title: 'Trapped ions and neutral atoms',
          summary:
            'Atomic qubits held by fields and light: hyperfine qubits in trapped ions, laser and Raman gates, the Mølmer-Sørensen gate through shared motion, shuttling architectures; neutral atoms in optical tweezer arrays, Rydberg blockade gates, reconfigurable connectivity and atom loss.',
          estimatedMinutes: 110,
          objectives: [
            'Describe a hyperfine qubit in a trapped ion and how it is initialised and read out by fluorescence',
            'Explain how shared motional modes mediate the Mølmer-Sørensen gate and compute its action on |00⟩',
            'Describe optical tweezer arrays and the Rydberg blockade CZ gate',
            'Compare ions and atoms with transmons on connectivity, speed and scaling',
          ],
          concepts: [
            'Paul trap and ion chains',
            'Hyperfine (clock) qubits, e.g. ¹⁷¹Yb⁺ at 12.6 GHz',
            'Optical pumping and fluorescence readout',
            'Raman laser gates',
            'Mølmer-Sørensen gate via shared motion',
            'QCCD shuttling architecture',
            'Optical tweezers and atom rearrangement',
            'Rydberg blockade CZ gate',
            'Atom loss and reloading',
          ],
          explanation: `**Trapped ions.** An ion such as ¹⁷¹Yb⁺ is held in vacuum by oscillating electric fields (a Paul trap); a few to a few dozen ions form a chain a few micrometres apart. The qubit is two **hyperfine** levels of the ground state, split by 12.6 GHz for ¹⁷¹Yb⁺. Because they are ground-state levels with a "clock" transition insensitive to magnetic noise, coherence lasts seconds to minutes. **Initialisation** is optical pumping; **readout** is fluorescence: a laser makes one level scatter millions of photons and the other stay dark, with readout errors well below 1 %. Single-qubit gates use microwaves or pairs of laser beams (Raman transitions).

**The Mølmer-Sørensen gate.** The ions share vibrational modes, like beads on a spring. Laser beams detuned near a motional sideband push the ions conditionally on their spin states; after a closed loop in motional phase space the motion is back where it started and only a spin-spin phase remains, $\\exp(-i\\tfrac\\pi4X\\otimes X)$. On $|00\\rangle$:
$$\\cos\\tfrac\\pi4|00\\rangle - i\\sin\\tfrac\\pi4\\,X\\otimes X|00\\rangle = \\tfrac{1}{\\sqrt2}(|00\\rangle - i|11\\rangle),$$
a maximally entangled state, which single-qubit rotations turn into a CNOT. Any pair in the chain can be coupled, so connectivity is **all-to-all**; the price is speed (tens to hundreds of microseconds) and the crowding of motional modes in long chains. Architectures such as Quantinuum's QCCD shuttle ions between zones of a chip trap to scale beyond one chain.

**Neutral atoms.** Atoms such as Rb, Cs or Sr are held in **optical tweezers**, tightly focused laser beams, arranged in arrays of hundreds to thousands, with qubits again in hyperfine or clock levels. Loading is random (each tweezer fills about half the time), so a camera images the array and moving tweezers rearrange atoms into a defect-free pattern. Atoms can also be moved *during* a computation, giving reconfigurable connectivity.

**Rydberg blockade.** A laser excites an atom to a **Rydberg state** with a huge electron orbit (principal quantum number around 50-100). Two Rydberg atoms within a few micrometres interact so strongly that the doubly excited state is shifted out of resonance: only one of them can be excited (**blockade**). Pulse sequences exploiting this give $|11\\rangle$ a phase that $|00\\rangle$, $|01\\rangle$, $|10\\rangle$ do not get, a CZ gate in under a microsecond. Two-qubit fidelities above 99.5 % have been reported (2023-2025). Weak points: atoms get lost and must be replaced, and imaging and measurement are slow (milliseconds).

\`\`\`interactive
qc-circuit
{"qubits": 2, "circuit": ["RX(pi/2) 0", "RX(pi/2) 1", "CZ 0 1", "RX(-pi/2) 1"], "palette": ["RX", "RY", "CZ", "H"], "perQubit": true, "title": "An entangling gate from CZ plus rotations", "caption": "Rydberg-atom and many superconducting machines provide CZ natively and build everything else from it with single-qubit rotations. Step through: the RX gates make superpositions, the CZ puts a phase on |11⟩, and the qubits end entangled (each per-qubit Bloch vector has length 0). Replace the final RX(−π/2) by an H on qubit 1 and see how the entangled state changes."}
\`\`\``,
          resources: [
            arxiv('1904.04178', 'Bruzewicz, Chiaverini, McConnell and Sage, Trapped-ion quantum computing: progress and challenges (2019)', 'The review for ions: qubits, gates, readout and scaling. Read sections 1-4.', ),
            arxiv('2006.12326', 'Henriet et al., Quantum computing with neutral atoms (2020)', 'A review of tweezer arrays and Rydberg gates; read sections 1-3.'),
            arxiv('quant-ph/9810040', 'Sørensen and Mølmer, Entanglement and quantum computation with ions in thermal motion (1999)', 'The Mølmer-Sørensen gate; the introduction and the phase-space picture.'),
            free('Bluvstein et al., Logical quantum processor based on reconfigurable atom arrays (Nature, 2024; arXiv 2312.03982)', 'https://www.nature.com/articles/s41586-023-06927-3', 'article', 'Nature (open access)', 'Atoms moved mid-circuit to run logical circuits on up to 48 logical qubits; read the abstract and figure 1.', true),
          ],
          exercises: [
            {
              slug: 'ms-gate',
              title: 'The Mølmer-Sørensen gate',
              prompt:
                'Compute $\\exp(-i\\theta X\\otimes X)$ as a 4 × 4 matrix (use $(X\\otimes X)^2 = I$). Apply it with $\\theta = \\pi/4$ to $|00\\rangle$, $|01\\rangle$, $|10\\rangle$ and $|11\\rangle$, and show each output is maximally entangled. Then find single-qubit gates that turn it into a CNOT (or verify a published decomposition in a simulator).',
              kind: 'derivation',
              difficulty: 2,
              hint: '$\\cos\\theta\\,I - i\\sin\\theta\\,X\\otimes X$; for $|01\\rangle$ the output is $\\tfrac{1}{\\sqrt2}(|01\\rangle - i|10\\rangle)$.',
            },
            {
              slug: 'ion-vs-transmon-budget',
              title: 'Speed versus fidelity',
              prompt:
                'Machine A (transmons) has two-qubit gates of 60 ns at 0.3 % error; machine B (ions) has 200 μs gates at 0.1 % error and all-to-all connectivity. For a 50-qubit circuit with 1000 two-qubit gates written for all-to-all connectivity, A needs on average 2 extra SWAPs (3 CNOTs each) per gate on its grid. Estimate the success probability and the wall-clock time per shot on each (assume B runs gates one at a time and A runs 10 in parallel). Which would you use for 10,000 shots?',
              kind: 'problem',
              difficulty: 2,
              hint: 'A: 7000 gates, $e^{-21}$: hopeless; B: $e^{-1} \\approx 0.37$, 0.2 s per shot, about 33 minutes for 10,000 shots. Connectivity can matter more than speed.',
            },
            {
              slug: 'tweezer-loading',
              title: 'Filling a tweezer array',
              prompt:
                'Each of 1000 tweezers loads an atom independently with probability 0.55. (a) What is the expected number of atoms and its standard deviation? (b) What is the probability that a 30 × 30 target region can be filled by rearrangement from the loaded atoms? (c) If each atom is lost with probability 0.3 % per computation cycle, how many atoms must be reloaded per cycle in a 3000-atom array?',
              kind: 'problem',
              difficulty: 2,
              hint: '(a) 550 ± 15.7. (b) 900 atoms are needed but only about 550 are expected, so essentially zero: the reservoir must be larger. (c) About 9 per cycle.',
            },
          ],
          selfAssessment: [
            {
              question: 'How are trapped-ion qubits initialised and read out?',
              answerOutline: 'Optical pumping prepares one hyperfine level; state-dependent fluorescence (bright versus dark) reads it out.',
            },
            {
              question: 'What makes the Mølmer-Sørensen gate work?',
              answerOutline: 'Laser forces depending on the spin states drive the shared motion around a closed loop, leaving a spin-dependent phase exp(−iθ X⊗X) and the motion unchanged.',
            },
            {
              question: 'What is the Rydberg blockade?',
              answerOutline: 'Strong interaction between two nearby Rydberg atoms shifts the doubly excited state, so only one can be excited; this conditional dynamics gives a CZ gate.',
            },
          ],
          quiz: [
            {
              question: 'What is $\\exp(-i\\tfrac{\\pi}{4}X\\otimes X)|11\\rangle$?',
              options: ['$\\tfrac{1}{\\sqrt2}(|11\\rangle - i|00\\rangle)$', '$|00\\rangle$', '$\\tfrac{1}{\\sqrt2}(|11\\rangle + |00\\rangle)$', '$\\tfrac{1}{\\sqrt2}(|01\\rangle - i|10\\rangle)$'],
              answer: 0,
              explanation: '$X\\otimes X|11\\rangle = |00\\rangle$, so the result is $\\cos\\tfrac\\pi4|11\\rangle - i\\sin\\tfrac\\pi4|00\\rangle$. The relative phase is $-i$, not $+1$.',
            },
            {
              question: 'Which is the main advantage of trapped ions over superconducting qubits for running a circuit with many long-range two-qubit gates?',
              options: [
                'Faster gates',
                'Operation at room temperature without any cooling',
                'More qubits per chip',
                'All-to-all connectivity within a chain, so no SWAP overhead, together with lower gate errors',
              ],
              answer: 3,
              explanation: 'Ion gates are slower, the ions themselves are laser-cooled in vacuum, and chains hold tens of ions; the advantage is connectivity and fidelity. On a nearest-neighbour grid each long-range gate costs extra SWAPs.',
            },
            {
              question: 'Why do neutral-atom machines image the array before a computation?',
              options: [
                'To measure the qubits\' Bloch vectors',
                'Because tweezers load atoms randomly (about half the time), so empty sites must be found and atoms rearranged into a filled pattern',
                'To cool the atoms',
                'To create the Rydberg states',
              ],
              answer: 1,
              explanation: 'Stochastic loading leaves gaps; a camera image followed by moving tweezers assembles a defect-free array. Atom loss during operation requires detection and reloading too, which recent work does continuously.',
            },
          ],
          relatedLessons: ['quantum-mechanics/hydrogen-and-atoms/fine-structure-zeeman-and-hyperfine', 'physics-quantum/atoms-and-applications/lasers-and-semiconductors'],
        },
        {
          slug: 'benchmarking',
          title: 'Benchmarking: fidelities, randomized benchmarking and quantum volume',
          summary:
            'How machines are compared: average gate fidelity, state preparation and measurement (SPAM) errors, randomized benchmarking and its decay fit, interleaved benchmarking, cross-entropy benchmarking, quantum volume, and why a single number never tells the whole story.',
          estimatedMinutes: 90,
          objectives: [
            'Define average gate fidelity and error per gate and relate them to the error budget',
            'Fit a randomized-benchmarking decay and extract the error per Clifford',
            'Explain why RB separates gate errors from SPAM errors',
            'Describe quantum volume and cross-entropy benchmarking and what each measures',
            'Critically read a vendor\'s benchmark claims',
          ],
          concepts: [
            'Average gate fidelity and error per gate',
            'SPAM errors',
            'Randomized benchmarking: F(m) = A p^m + B',
            'Error per Clifford r = (1 − p)(d − 1)/d',
            'Interleaved RB for a specific gate',
            'Cross-entropy benchmarking (XEB)',
            'Quantum volume 2ⁿ',
            'Correlated and leakage errors',
          ],
          explanation: `**Gate fidelity.** The **average gate fidelity** of a noisy gate compares its output with the ideal output, averaged over all pure input states; the **error per gate** is one minus it. These are the numbers in the error budget of module 7. As of 2025-2026, the best two-qubit gates on leading machines are reported at errors of roughly 0.1-0.5 %, with single-qubit gates around 0.01-0.1 % and readout errors 0.1-2 %, depending on platform.

**SPAM.** Any experiment also has state-preparation and measurement errors. Measuring a gate's error directly, by preparing, applying once and measuring, mixes the gate error with SPAM errors that may be ten times larger.

**Randomized benchmarking (RB).** Apply a random sequence of $m$ Clifford gates, then the single Clifford that inverts the whole sequence, and measure the probability of returning to the start. Averaging over random sequences turns any noise into a depolarising channel of strength $1-p$ per Clifford, so the survival probability decays as
$$F(m) = Ap^m + B,$$
with $A$ and $B$ absorbing SPAM. The **error per Clifford** is $r = (1-p)(d-1)/d$ with $d = 2^n$: $(1-p)/2$ for one qubit, $3(1-p)/4$ for two. Example: with $A = B = 0.5$, a survival probability of 0.95 at $m = 50$ means $p^{50} = 0.9$, so $p = 0.9979$ and $r \\approx 0.0011$; in practice you fit all $m$ at once (exercise). **Interleaved RB** inserts a specific gate after each Clifford and compares decays to isolate that gate's error.

**Whole-system benchmarks.** **Cross-entropy benchmarking** (XEB) runs random circuits and checks how often the hardware produces bit strings that the ideal circuit makes likely; Google's 2019 experiment used it. **Quantum volume** (IBM, 2019) is $2^n$ for the largest $n$ such that random "square" circuits ($n$ qubits, depth $n$) produce "heavy" outputs (above the median ideal probability) more than 2/3 of the time; the ideal value is about 0.85. It rewards fidelity, connectivity and compiler quality together, but it stops being computable classically beyond about 50 qubits.

**Reading claims.** Ask: is the number an average, a median or the best pair? Simultaneous or isolated gates? Does it include leakage and crosstalk? RB assumes errors are not strongly correlated in time; leakage and correlated errors (cosmic-ray bursts in superconducting chips, for example) are what most threaten error correction and are poorly captured by averages. Prefer peer-reviewed or preprint data over press releases, and the full distribution over a headline.`,
          resources: [
            arxiv('1009.3639', 'Magesan, Gambetta and Emerson, Robust randomized benchmarking of quantum processes (2011)', 'The standard derivation of the RB decay model and the error-per-Clifford formula.'),
            arxiv('1811.12926', 'Cross, Bishop, Sheldon, Nation and Gambetta, Validating quantum computers using randomized model circuits (2019)', 'The definition of quantum volume; read sections I-III.', ),
            free('Google Quantum AI, Quantum supremacy using a programmable superconducting processor (Nature, 2019)', 'https://www.nature.com/articles/s41586-019-1666-5', 'article', 'Nature (open access)', 'Read the cross-entropy benchmarking section and figure 4 for how XEB fidelity was estimated.', true),
          ],
          exercises: [
            {
              slug: 'rb-fit',
              title: 'Fit an RB curve',
              prompt:
                'Single-qubit RB data (survival probability against sequence length $m$): 1: 0.985, 50: 0.937, 100: 0.893, 200: 0.818, 400: 0.705, 800: 0.588. Fit $F(m) = Ap^m + B$ (fix $B = 0.5$ if you like, by hand on a log plot of $F - 0.5$ or with a short script). Report $p$, the error per Clifford, and the error per physical gate if a Clifford averages 1.875 gates.',
              kind: 'data-analysis',
              difficulty: 2,
              hint: 'With $B = 0.5$: $\\ln(F - 0.5)$ falls by about $\\ln(0.437/0.088) \\approx 1.60$ from $m = 50$ to 800, so $p \\approx e^{-1.60/750} \\approx 0.9979$, $r \\approx 0.0011$, about $5.7\\times10^{-4}$ per gate.',
            },
            {
              slug: 'spam-vs-gate',
              title: 'Why not measure the gate directly?',
              prompt:
                'A device has preparation error 0.5 %, readout error 1.5 % and an $X$-gate error of 0.05 %. You prepare $|0\\rangle$, apply $X$ once and measure. What fraction of runs fail, and what fraction of that failure is due to the gate? Explain how RB sidesteps this.',
              kind: 'problem',
              difficulty: 1,
              hint: 'About 2.05 % fail; the gate contributes about 2.4 % of the failures. RB measures the decay rate with $m$, and SPAM only sets $A$ and $B$.',
            },
            {
              slug: 'benchmark-claim',
              title: 'Read a benchmark claim',
              prompt:
                'Find one hardware announcement from 2025 or 2026 (Google, IBM, Quantinuum, QuEra, IonQ, Atom Computing or another) that quotes gate fidelities or quantum volume. Record exactly what was measured (average or median, isolated or simultaneous, RB or another method), whether a paper or preprint supports it, and its date. Write 250 words assessing how the claim bears on running error correction.',
              kind: 'writing',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why is randomized benchmarking insensitive to SPAM errors?',
              answerOutline: 'SPAM affects only the constants A and B of F(m) = Ap^m + B; the gate error is read from the decay rate p across sequence lengths.',
            },
            {
              question: 'What is quantum volume?',
              answerOutline: '2ⁿ for the largest n where random n-qubit, depth-n model circuits give heavy outputs with probability > 2/3; a holistic benchmark of fidelity, connectivity and compilation.',
            },
            {
              question: 'What do average fidelities miss?',
              answerOutline: 'Correlated errors in space or time, leakage, crosstalk under simultaneous operation, and the spread across qubits: exactly the errors most harmful to error correction.',
            },
          ],
          quiz: [
            {
              question: 'A two-qubit RB experiment gives $p = 0.992$ per Clifford. What is the error per two-qubit Clifford?',
              options: ['0.4 %', '0.8 %', '0.6 %', '1.6 %'],
              answer: 2,
              explanation: '$r = (1-p)(d-1)/d$ with $d = 4$: $0.008\\times3/4 = 0.006$. 0.4 % uses the single-qubit factor 1/2; 0.8 % forgets the factor altogether.',
            },
            {
              question: 'In RB, why does the survival probability tend to about 0.5 for a single qubit at long sequences rather than to 0?',
              options: [
                'Because gates are 50 % efficient',
                'Because readout always returns 0 half the time',
                'Because the qubit decays to $|1\\rangle$',
                'Because the noise randomises the state completely, and a random state returns to $|0\\rangle$ with probability 1/2',
              ],
              answer: 3,
              explanation: 'Many noisy random Cliffords drive the state to $I/2$, which gives each outcome with probability 1/2, the constant $B$ in the fit.',
            },
            {
              question: 'Which statement about quantum volume is correct?',
              options: [
                'It is the number of physical qubits',
                'It is $2^n$ for the largest square circuit size $n$ the machine runs well enough, so it reflects errors, connectivity and compilation together',
                'It measures the physical size of the chip',
                'It grows automatically when more qubits are added',
              ],
              answer: 1,
              explanation: 'Adding qubits without lowering errors does not raise quantum volume, because deeper circuits on more qubits fail. That is the "more physical qubits is not more useful qubits" point in benchmark form.',
            },
          ],
          relatedLessons: ['probability-statistics/hypothesis-testing-and-regression/linear-regression-and-least-squares'],
        },
        {
          slug: 'nisq-algorithms-and-quantum-simulation',
          title: 'NISQ algorithms and quantum simulation',
          summary:
            'What near-term machines try to do: the variational quantum eigensolver, QAOA, their measurement costs and barren plateaus, error mitigation, Trotterised simulation of quantum dynamics, and the 2023-2025 "utility" and "advantage" experiments with their classical responses.',
          estimatedMinutes: 100,
          objectives: [
            'Run a one-qubit VQE by hand and explain the variational principle',
            'Estimate the number of shots needed to measure an energy to a given precision',
            'Describe QAOA for MaxCut and the barren-plateau problem',
            'Write a first-order Trotter step for a two-term Hamiltonian and state its error scaling',
            'Assess claims of quantum utility or advantage for simulation',
          ],
          concepts: [
            'Variational principle ⟨ψ(θ)|H|ψ(θ)⟩ ≥ E₀',
            'VQE: ansatz, measurement, classical optimiser',
            'Shot cost ~ Var/ε² per term',
            'QAOA layers for MaxCut',
            'Barren plateaus',
            'Error mitigation (zero-noise extrapolation)',
            'Trotter-Suzuki product formulas',
            'Utility versus advantage claims',
          ],
          explanation: `Without error correction, circuits are limited to roughly $1/\\varepsilon$ gates (module 7), so NISQ algorithms put a short circuit inside a classical optimisation loop.

**VQE.** The variational principle says $E(\\theta) = \\langle\\psi(\\theta)|H|\\psi(\\theta)\\rangle \\ge E_0$ for any state. Prepare $|\\psi(\\theta)\\rangle$ with a parameterised circuit, estimate $E(\\theta)$ by measuring each Pauli term of $H$, and let a classical optimiser lower it. One-qubit example: $H = Z + X$ (eigenvalues $\\pm\\sqrt2$) and $|\\psi(\\theta)\\rangle = R_y(\\theta)|0\\rangle$ give $E(\\theta) = \\cos\\theta + \\sin\\theta = \\sqrt2\\sin(\\theta + \\pi/4)$, minimised at $\\theta = -3\\pi/4$ with $E = -\\sqrt2$. The catch is cost: each term is estimated from shots, and precision $\\pm\\varepsilon$ needs about $\\mathrm{Var}/\\varepsilon^2$ shots, $10^4$ for $\\pm0.01$, per term, per optimisation step. Chemical accuracy for a molecule with thousands of Pauli terms quickly needs billions of shots.

**QAOA** (Farhi, Goldstone and Gutmann, 2014) alternates $e^{-i\\gamma C}$ (the cost function, e.g. the number of cut edges in MaxCut, written in $Z$s) with $e^{-i\\beta\\sum X_j}$, for $p$ layers, optimising $\\gamma, \\beta$. For large $p$ it approaches adiabatic optimisation; for small $p$ no convincing advantage over classical heuristics has been shown. Both VQE and QAOA suffer from **barren plateaus**: for deep or generic circuits the gradient vanishes exponentially in the number of qubits, so the optimiser sees a flat landscape buried in shot noise.

**Error mitigation** estimates the zero-noise answer without correcting errors: run the circuit at amplified noise levels (by stretching pulses or adding gate pairs) and extrapolate back (**zero-noise extrapolation**). It costs extra shots that grow exponentially with circuit size, so it extends rather than removes the NISQ limit.

**Quantum simulation** was Feynman's original motivation (1982). To simulate $e^{-iHt}$ for $H = A + B$, use the **Trotter** product $(e^{-iAt/n}e^{-iBt/n})^n$, whose error is $O(t^2\\|[A, B]\\|/n)$. Many physical Hamiltonians are sums of local terms, so each step is a short circuit. This is the most credible route to early usefulness: in 2023 IBM reported a 127-qubit Trotterised simulation with error mitigation ("evidence for utility", Nature), and several groups soon reproduced its results classically with tensor networks. In October 2025 Google reported in Nature an "out-of-time-order correlator" experiment on Willow that it estimated would take a classical supercomputer about 13,000 times longer, calling it verifiable advantage; that estimate is Google's own and, as of this writing, is open to the same scrutiny. The pattern of claim and classical response is how the field calibrates itself.`,
          resources: [
            arxiv('1304.3061', 'Peruzzo et al., A variational eigenvalue solver on a photonic quantum processor (2014)', 'The VQE paper; read the introduction and the description of the algorithm.'),
            arxiv('1411.4028', 'Farhi, Goldstone and Gutmann, A quantum approximate optimization algorithm (2014)', 'QAOA defined, with the MaxCut example.'),
            pldemo('tutorial_vqe', 'A brief overview of VQE', 'Run a VQE for the hydrogen molecule in a simulator and look at the measurement cost.'),
            free('Kim et al. (IBM), Evidence for the utility of quantum computing before fault tolerance (Nature, 2023)', 'https://www.nature.com/articles/s41586-023-06096-3', 'article', 'Nature (open access)', 'The 127-qubit Trotter experiment with zero-noise extrapolation; read it alongside one of the classical simulations it prompted.', true),
          ],
          exercises: [
            {
              slug: 'vqe-by-hand',
              title: 'A one-qubit VQE',
              prompt:
                'For $H = 0.5Z + 0.8X$ and $|\\psi(\\theta)\\rangle = R_y(\\theta)|0\\rangle$, compute $E(\\theta)$, its minimum and the optimal $\\theta$, and compare with the exact ground energy. Then simulate a VQE with shot noise: estimate $\\langle Z\\rangle$ and $\\langle X\\rangle$ from 1000 shots each at $\\theta$ on a grid of 20 values and report the best estimate. How far from the true minimum is it?',
              kind: 'simulation',
              difficulty: 2,
              hint: '$E = 0.5\\cos\\theta + 0.8\\sin\\theta$, minimum $-\\sqrt{0.89} \\approx -0.943$ at $\\theta = \\pi + \\arctan(0.8/0.5) \\approx 4.15$ rad (or $-2.13$). Shot noise of about 0.03 per estimate limits the result.',
            },
            {
              slug: 'shot-budget',
              title: 'Shot budget for chemistry',
              prompt:
                'A molecular Hamiltonian has 600 Pauli terms with coefficients of magnitude about 0.05 Hartree each, measured separately. Chemical accuracy is 1.6 mHa. Assuming each term\'s variance is at most its coefficient squared and errors add in quadrature, estimate the shots per energy evaluation. If an optimisation needs 500 evaluations at 10 kHz shot rate, how long does it take?',
              kind: 'problem',
              difficulty: 2,
              hint: 'With $N$ shots per term the energy variance is about $600\\cdot0.0025/N = 1.5/N$ Ha², so $N \\approx 1.5/0.0016^2 \\approx 5.9\\times10^5$ per term and $3.5\\times10^8$ per evaluation: about 10 hours at 10 kHz, so 500 evaluations take about 200 days. Grouping commuting terms helps.',
            },
            {
              slug: 'trotter-error',
              title: 'Trotter error numerically',
              prompt:
                'For one qubit with $A = X$ and $B = Z$, compute $e^{-i(A+B)t}$ exactly and the Trotter approximation $(e^{-iAt/n}e^{-iBt/n})^n$ for $t = 1$ and $n = 1, 2, 4, 8, 16$ (a short numpy script). Plot the operator-norm error against $n$ and confirm it falls as $1/n$. How does the second-order formula $(e^{-iAt/2n}e^{-iBt/n}e^{-iAt/2n})^n$ compare?',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What is the variational principle and how does VQE use it?',
              answerOutline: 'Any state\'s energy expectation is at least the ground energy; VQE minimises the measured ⟨H⟩ over a parameterised circuit with a classical optimiser.',
            },
            {
              question: 'What are barren plateaus?',
              answerOutline: 'For many parameterised circuits the cost gradient vanishes exponentially with qubit number, so optimisation stalls in shot noise.',
            },
            {
              question: 'Why is quantum simulation the most credible early application?',
              answerOutline: 'It offers exponential speed-ups for physically relevant dynamics, local Hamiltonians give short Trotter circuits, and classical methods struggle with highly entangled dynamics.',
            },
          ],
          quiz: [
            {
              question: 'For $H = Z + X$ and $|\\psi(\\theta)\\rangle = R_y(\\theta)|0\\rangle$, what is $E(\\pi/2)$?',
              options: ['$-\\sqrt2$', '1', '0', '$\\sqrt2$'],
              answer: 1,
              explanation: '$R_y(\\pi/2)|0\\rangle = |+\\rangle$, so $\\langle Z\\rangle = 0$ and $\\langle X\\rangle = 1$: $E = 1$. The minimum $-\\sqrt2$ is at $\\theta = -3\\pi/4$.',
            },
            {
              question: 'You want $\\langle X\\rangle$ to within $\\pm0.005$ (one standard error) for a state with $\\langle X\\rangle \\approx 0$. About how many shots do you need?',
              options: ['200', '4000', '10,000', '40,000'],
              answer: 3,
              explanation: 'Each shot gives $\\pm1$ with variance $1 - \\langle X\\rangle^2 \\approx 1$, so the standard error is $1/\\sqrt N$; $1/\\sqrt N = 0.005$ needs $N = 40{,}000$.',
            },
            {
              question: 'What happened after IBM\'s 2023 "utility" experiment?',
              options: [
                'It was accepted as proof of exponential quantum advantage',
                'Several groups reproduced its results classically with tensor-network and other methods, sharpening what counts as beyond classical',
                'It was retracted',
                'It factored a large number',
              ],
              answer: 1,
              explanation: 'IBM\'s paper claimed utility (accurate results at a scale where brute force fails), not a proven advantage; classical approximation methods matched it within weeks. Such exchanges are normal and useful.',
            },
          ],
          relatedLessons: ['quantum-mechanics/approximation-methods/the-variational-method', 'optimization/unconstrained-optimisation/gradient-descent-and-line-search'],
        },
        {
          slug: 'where-the-field-stands',
          title: 'Where the field stands (as of November 2026)',
          summary:
            'A dated, sourced account of the milestones: Google\'s 2019 supremacy claim and its classical rebuttals, the first logical-qubit demonstrations, below-threshold surface codes, continuous neutral-atom operation, the 2025 vendor systems and roadmaps, and how to read the next announcement.',
          estimatedMinutes: 85,
          objectives: [
            'Summarise the main milestones from 2019 to 2026 with dates and sources',
            'Distinguish peer-reviewed results from company announcements and roadmaps',
            'Explain what "beyond classical" claims have and have not shown',
            'Estimate the distance between current machines and a cryptographically relevant computer',
          ],
          concepts: [
            'Quantum supremacy / beyond-classical sampling',
            'Classical rebuttals by tensor networks',
            'Logical qubits: error-detected versus error-corrected',
            'Below-threshold operation (Λ > 1)',
            'Roadmaps versus results',
            'Physical versus logical qubit counts',
            'Peer review versus press release',
          ],
          explanation: `Every claim here is dated; check for newer results.

**Beyond-classical sampling.** In October 2019 Google reported (Nature) that its 53-qubit Sycamore chip sampled random circuits in 200 seconds, a task it estimated would take 10,000 years classically. IBM replied within days (arXiv 1910.09534) with an estimate of about 2.5 days using disk storage, and in 2022 Pan, Chen and Zhang (arXiv 2111.03011) produced comparable samples with tensor networks on a GPU cluster in about 15 hours. Later sampling experiments (USTC's photonic Jiuzhang in 2020, larger random circuits) follow the same pattern: hard to simulate, of no practical use, against a moving classical baseline.

**Logical qubits.** In December 2023 Harvard, MIT and QuEra (Bluvstein et al., Nature 2024) ran circuits on up to 48 logical qubits encoded in 280 neutral atoms, mostly with error *detection* and post-selection. In April 2024 Microsoft and Quantinuum (arXiv 2404.02280) reported logical qubits on a trapped-ion machine with error rates below the physical ones, again using detection. In December 2024 Google reported the Willow surface-code memory below threshold ($\\Lambda \\approx 2.14$, module 8).

**2025.** In autumn 2025 a Harvard-MIT-QuEra paper in Nature (vol. 646) reported a coherent array of more than 3000 atoms operated continuously for over two hours by reloading lost atoms. On 22 October 2025 Google reported its "Quantum Echoes" experiment (previous lesson), a claimed verifiable advantage. In November 2025 Quantinuum launched Helios, 98 barium-ion qubits with a reported two-qubit fidelity of 99.92 %; it announced 48 error-corrected and 94 error-detected logical qubits, claims documented less fully than the hardware. IBM's roadmap targets a fault-tolerant machine, Starling, with 200 logical qubits running $10^8$ gates by 2029: a plan, not a result.

**2026, unverified here.** Further 2026 company announcements (higher logical fidelities, neutral-atom toric codes, dozens of logical qubits at small distance) appeared mainly in press releases when this was written; treat them as provisional until papers appear.

**How far to RSA-2048?** About a million physical qubits at 0.1 % error running for a week (module 6), against today's few thousand physical qubits, best two-qubit errors near 0.1 %, and logical demonstrations at the tens-of-qubits scale. The gap is mostly engineering: wiring, yield, decoding speed and uncorrelated errors at scale.

**Reading the next announcement.** Peer-reviewed or press release? Physical or logical qubits, detected or corrected, at what distance and Λ? Against which classical method? Result or roadmap?`,
          resources: [
            free('Google Quantum AI, Quantum error correction below the surface code threshold (Nature, 2025)', 'https://www.nature.com/articles/s41586-024-08449-y', 'article', 'Nature (open access)', 'The Willow paper; read the abstract and the discussion of what remains.', true),
            arxiv('2111.03011', 'Pan, Chen and Zhang, Solving the sampling problem of the Sycamore quantum circuits (2022)', 'The tensor-network reproduction of Google\'s 2019 experiment.'),
            free('Harvard, MIT and QuEra, Continuous operation of a coherent 3,000-qubit system (Nature, 2025)', 'https://www.nature.com/articles/s41586-025-09596-6', 'article', 'Nature', 'The continuous-reloading neutral-atom array; read the abstract and figure 1.'),
            free('Scott Aaronson, Quantum supremacy: the gloves are off (and FAQ)', 'https://scottaaronson.blog/?p=4317', 'article', 'Shtetl-Optimized blog', 'A careful contemporary explanation of what the 2019 experiment did and did not show.'),
            free('Quantinuum, Introducing Helios (November 2025 announcement)', 'https://www.quantinuum.com/blog/introducing-helios-the-most-accurate-quantum-computer-in-the-world', 'article', 'Quantinuum (company blog)', 'A vendor announcement: compare its claims with what the accompanying preprint documents.'),
          ],
          exercises: [
            {
              slug: 'timeline',
              title: 'Build and update the timeline',
              prompt:
                'Make a timeline of at least ten milestones from 2019 to today, each with date, institution, platform, the exact claim, the source (paper, preprint or press release) and any classical or independent response. Then search for results after November 2026 and add up to three, marking each "peer-reviewed", "preprint" or "announcement".',
              kind: 'reading',
              difficulty: 2,
            },
            {
              slug: 'gap-to-rsa',
              title: 'Measure the gap',
              prompt:
                'Using Gidney (2025) for the requirement and the best published numbers you can find for the current state (physical qubit count, two-qubit error, cycle time, logical error per cycle, decoder latency), make a table of "needed" versus "demonstrated" with the factor between them. Which gap is largest? Write 200 words on which you expect to close first and why.',
              kind: 'writing',
              difficulty: 2,
            },
            {
              slug: 'announcement-critique',
              title: 'Critique a headline',
              prompt:
                'Take one 2025-2026 headline claiming a quantum computing breakthrough. Apply the questions at the end of this lesson, find the primary source, and write a 300-word assessment that a non-specialist could read. Give dates for everything.',
              kind: 'writing',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What did Google\'s 2019 experiment show, and how was it challenged?',
              answerOutline: 'Sampling from random 53-qubit circuits faster than its estimate of classical simulation; IBM estimated 2.5 days classically, and tensor-network methods later reproduced samples in about 15 hours.',
            },
            {
              question: 'What is the difference between an error-detected and an error-corrected logical qubit?',
              answerOutline: 'Detection discards runs with errors (post-selection), which does not scale to long computations; correction identifies and fixes errors in real time.',
            },
            {
              question: 'How far are current machines from breaking RSA-2048?',
              answerOutline: 'Roughly a factor of hundreds in physical qubits (thousands demonstrated versus about a million needed at 0.1 % error), plus large gaps in logical error rates, decoding and run time.',
            },
          ],
          quiz: [
            {
              question: 'Which statement about logical-qubit demonstrations up to 2025 is accurate?',
              options: [
                'Several used error detection with post-selection, which discards failed runs and does not by itself scale to long computations',
                'Thousands of error-corrected logical qubits have been demonstrated',
                'Logical qubits have not been demonstrated at all',
                'Logical and physical qubit counts are the same thing',
              ],
              answer: 0,
              explanation: 'The 2023-2024 neutral-atom and trapped-ion results relied heavily on detection; Google\'s 2024 result showed real-time correction of one logical memory below threshold. Counting logical qubits requires saying which kind.',
            },
            {
              question: 'IBM\'s plan for a 200-logical-qubit machine by 2029 is best described as what?',
              options: ['A peer-reviewed result', 'A demonstrated benchmark', 'An independent estimate', 'A company roadmap, which may change'],
              answer: 3,
              explanation: 'Roadmaps state targets. They matter for planning but are not evidence of capability until the machine and its benchmarks are published.',
            },
            {
              question: 'Why does the 2019 supremacy experiment not show that quantum computers are useful?',
              options: [
                'Because it was wrong',
                'Because the task (sampling random circuits) has no known application, and improved classical methods later matched it',
                'Because it used too few qubits to be quantum',
                'Because it was never published',
              ],
              answer: 1,
              explanation: 'The experiment was a genuine demonstration of a hard-to-simulate computation, published in Nature. Its value was as a benchmark and a scientific test, not as a useful calculation.',
            },
          ],
        },
      ],
      project: {
        slug: 'hardware-comparison-dossier',
        title: 'A hardware comparison dossier',
        description: `Write a 6-8 page dossier comparing two platforms (for example superconducting transmons and trapped ions, or neutral atoms and transmons) for running a specific workload: the error-corrected memory of module 8, a 50-qubit Trotter simulation, or Shor's algorithm for RSA-2048. For each platform give, with dated sources: qubit encoding and physics; how single- and two-qubit gates and readout are physically done; the best published numbers for gate and readout errors, gate times and coherence; connectivity; the largest demonstrated system; and the main scaling obstacle. Then do the workload's arithmetic for each: physical qubits, run time and expected success probability (or logical error), stating every assumption. Run at least one real experiment if you can (for example randomized benchmarking or a Bell-state fidelity on IBM's free plan) and compare your measurement with the published calibration. Close with a recommendation and the three numbers that would change it.`,
        deliverables: [
          'A comparison table with every number dated and sourced',
          'The workload arithmetic for both platforms with assumptions listed',
          'Optional hardware measurement with comparison to published calibration',
          'A one-page recommendation',
        ],
        estimatedHours: 5,
        stretchGoals: ['Add a third platform (photonic or semiconductor spin)', 'Estimate the cryogenic wiring or laser-beam count each platform would need at one million physical qubits'],
      },
    },
  ],
  capstone: {
    slug: 'explain-a-quantum-computer-end-to-end',
    title: 'Capstone: explain a quantum computer end to end',
    description: `Pick **one platform** (superconducting transmons, trapped ions or neutral atoms) and **one algorithm** (Grover search on 3-4 qubits, Shor order finding for N = 15 or 21, phase estimation of a small unitary, or a Trotter simulation of a 4-site spin chain), and trace a single run from physics to answer, so that a reader who has never studied the subject understands what the machine does at every step.

**Part A, the algorithm by hand.** Write the circuit, then the full state vector after every layer (amplitudes, not just probabilities), the outcome distribution, and the classical post-processing that turns a sample into the answer (continued fractions for Shor, majority vote for Grover, energy estimate for phase estimation or Trotter). Check every number in a simulator or the course widgets.

**Part B, the physics.** Compile the circuit to the platform's native gates (for example $R_x$, virtual $R_z$ and CZ for transmons; single-qubit rotations and Mølmer-Sørensen for ions; rotations and Rydberg CZ for atoms), count gates and depth after routing for the platform's connectivity, and describe for at least one single-qubit gate, one two-qubit gate and the readout what physically happens: which levels, which frequencies or lasers, how long, and why it works.

**Part C, the noise.** Using published, dated error rates and coherence times for one specific device, build an error budget for the run (gates, idling, readout), estimate the success probability, and run the circuit on real hardware if you can (IBM's free plan for transmons) or on a noisy simulator calibrated with those numbers. Compare measured and predicted results and explain the difference.

**Part D, scale it up.** Estimate what the same algorithm would need at a useful size (for example Shor for RSA-2048, Grover on $2^{40}$ items, a 100-site simulation): logical qubits, T or Toffoli count, code distance and physical qubits under a surface code, run time, and how that compares with the best classical method. Cite the resource estimates you use with their dates.

**Part E, the honest summary.** One page, for a general reader: what a quantum computer is, what it did in your run, why it can be faster for this problem, why it is hard to build, and where the field stands, with dates.`,
    deliverables: [
      'Part A: the circuit and the hand-computed state vector after every layer, checked in a simulator or widget',
      'Part B: the native-gate compilation with gate counts and a physical description of each operation type',
      'Part C: an error budget from dated device numbers, with hardware or calibrated noisy-simulation results compared to the prediction',
      'Part D: a resource estimate for a useful problem size, with cited, dated sources and a classical comparison',
      'Part E: a one-page explanation for a general reader',
    ],
    estimatedHours: 12,
    stretchGoals: [
      'Do Part B and C for a second platform and compare',
      'Encode one logical qubit of the algorithm in the three-qubit or [[4,2,2]] code on hardware and compare logical and physical error rates',
      'Implement the classical post-processing and the whole pipeline as a reproducible notebook',
    ],
  },
  masteryChecklist: [
    'I can compute with qubit states: complex amplitudes, inner products, the Born rule, measurement in any basis, and Bloch-sphere coordinates',
    'I can tell a global phase from a relative phase, a superposition from a mixture, and entanglement from classical correlation, and show the difference with a measurement',
    'I can multiply out single- and multi-qubit gates, tensor products and controlled gates, check unitarity, and trace a circuit\'s state vector by hand',
    'I can prove the no-cloning theorem and derive superdense coding, teleportation and entanglement swapping',
    'I can prove the classical 3/4 bound for the CHSH game, compute the quantum cos²(π/8) strategy and explain what a Bell violation rules out',
    'I can run BB84 by hand and explain why an intercept-resend attack gives a 25 % error rate',
    'I can explain phase kickback and work through Deutsch-Jozsa, Bernstein-Vazirani and Simon, saying what kind of separation each gives',
    'I can apply the QFT, explain phase estimation, and carry out Shor\'s algorithm for N = 15 and N = 21 including continued fractions',
    'I can compute Grover iteration counts and success probabilities and explain why the speed-up is quadratic and optimal',
    'I can explain BQP, why quantum computers are not believed to solve NP-complete problems efficiently, and what Shor and Grover mean for RSA and AES, with dated resource estimates',
    'I can use density matrices, partial traces and Kraus channels, and relate T1, T2 and gate errors to the depth of a useful circuit',
    'I can explain the bit-flip, phase-flip, Shor, Steane and surface codes, compute logical error rates, and state the threshold theorem and the role of magic states',
    'I can describe how transmons, trapped ions and neutral atoms implement qubits, gates and readout, and compare them on speed, coherence and connectivity',
    'I can read a benchmark or "advantage" announcement critically and place it on a dated timeline of the field',
  ],
});
