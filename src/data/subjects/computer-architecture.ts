import { defineSubject } from '../define';

export default defineSubject({
  id: 'computer-architecture',
  title: 'Computer Architecture: From NAND to Tetris',
  category: 'cs',
  tagline:
    'Build a working computer from a single NAND gate, then learn why real machines are fast: pipelines, caches and the bit-level representation of data.',
  description: `A computer is not magic. It is a few hundred thousand copies of one tiny gate, arranged with such care that a stream of bits becomes a running program. The best way to believe this is to build one yourself, and that is what this subject does. Following the *Nand to Tetris* course by Nisan and Schocken, you start with a NAND gate and, module by module, build logic gates, an ALU, registers and RAM, a CPU, and finally a complete general-purpose computer (the Hack platform) in a hardware description language. You then write an assembler for it, so that programs you write in symbolic assembly run on hardware you designed.

Having built a simple machine, you learn why industrial ones are different. Drawing on MIT 6.004 and CMU's *Computer Systems: A Programmer's Perspective* (CS:APP), the later modules cover performance measurement, pipelining and hazards, the memory hierarchy and caches, and the exact rules by which integers and floating-point numbers are stored and manipulated, including the overflow and rounding surprises that bite working programmers.

Every lesson here is hands-on: you write and test HDL in the Nand2Tetris simulator, write Hack assembly, implement the assembler in a language of your choice, run the CS:APP Data Lab and Cache Lab, and measure real hardware with small C programs. By the end you will be able to explain, at every level from transistor to C statement, what your computer does when it executes a line of code.`,
  difficulty: 'intermediate',
  estimatedHours: 90,
  prerequisites: ['programming-fundamentals'],
  recommendedBackground: [
    'Comfort writing small programs in any language (Python is fine for the assembler)',
    'Basic binary and hexadecimal notation',
    'Patience for debugging hardware tests one chip at a time',
  ],
  tags: ['hardware', 'digital-logic', 'Nand2Tetris', 'CS:APP', 'CPU', 'caches', 'floating-point'],
  core: true,
  modules: [
    {
      slug: 'boolean-logic-and-gates',
      title: 'Boolean Logic and Gates',
      description:
        'Boolean algebra, the NAND gate as a universal building block, the Hardware Description Language and simulator, and the elementary and multi-bit gates of Nand2Tetris Project 1.',
      lessons: [
        {
          slug: 'boolean-algebra-and-nand',
          title: 'Boolean algebra and the universal NAND gate',
          summary:
            'Truth tables, Boolean expressions, canonical forms, and the proof that every Boolean function can be built from NAND alone.',
          estimatedMinutes: 90,
          objectives: [
            'Write the truth table of any Boolean expression and the expression of any truth table',
            'Simplify expressions using the laws of Boolean algebra (identity, De Morgan, distributivity)',
            'Prove that NAND is functionally complete by deriving NOT, AND and OR from it',
            'Explain why a hardware designer cares about gate count and gate depth',
          ],
          concepts: [
            'Boolean variables, AND, OR, NOT, XOR',
            'Truth table as the definition of a function',
            'Sum-of-products (canonical disjunctive normal form)',
            'De Morgan laws',
            'Functional completeness',
            'NAND and NOR as universal gates',
            'Gate count and propagation depth',
            'Abstraction: use a chip without knowing its insides',
          ],
          explanation: `Everything a computer does is a Boolean function: it maps some bits to some other bits. A **truth table** is the complete definition of such a function, one row per input combination, so a function of $n$ inputs has $2^n$ rows. A **Boolean expression** is a compact way to write the same thing using AND ($x \\cdot y$ or $xy$), OR ($x + y$) and NOT ($\\bar{x}$).

The central theorem of this lesson is that **any** truth table can be turned into an expression. Take every row whose output is 1, write the AND of its inputs (negating the ones that are 0), and OR those terms together. This *sum of products* is clumsy but always works. Boolean algebra lets you simplify it: the laws $x + \\bar{x} = 1$, $x(y+z) = xy + xz$ and De Morgan's $\\overline{xy} = \\bar{x} + \\bar{y}$ are the ones you will use constantly.

Then comes the surprise that makes the whole subject possible. NAND, defined as $\\overline{xy}$, is **functionally complete**: $\\text{NOT}(x) = \\text{NAND}(x, x)$, $\\text{AND}(x,y) = \\text{NOT}(\\text{NAND}(x,y))$, and by De Morgan $\\text{OR}(x,y) = \\text{NAND}(\\bar{x}, \\bar{y})$. Since AND, OR and NOT express every function, so does NAND alone. That is why Nand2Tetris gives you exactly one primitive and nothing else.

Two things matter to a hardware designer beyond correctness. **Gate count** is cost and power. **Depth**, the longest path from an input to an output, is delay: a signal cannot leave a gate until it has settled, so a deep circuit is slow. Keep both in mind as you build; a Mux built with 4 NANDs beats one built with 7.

Read Nand2Tetris chapter 1 (free on the course site) and watch the Unit 1 videos. Work the truth-table exercises by hand before touching the simulator; the next lesson introduces HDL.`,
          resources: [
            {
              title: 'Nand2Tetris — Course home and Chapter 1 (Boolean Logic)',
              url: 'https://www.nand2tetris.org/course',
              type: 'course',
              cost: 'free',
              provider: 'Nand2Tetris',
              note: 'Chapter 1 PDF and lecture slides are linked from the course page.',
              primary: true,
            },
            {
              title: 'Build a Modern Computer from First Principles: From Nand to Tetris (Coursera, Part I)',
              url: 'https://www.coursera.org/learn/build-a-computer',
              type: 'course',
              cost: 'freemium',
              provider: 'Hebrew University of Jerusalem / Coursera',
              note: 'Week 1 videos. Audit for free; the certificate is paid.',
            },
            {
              title: 'MIT 6.004 Computation Structures (OCW, Spring 2017) — Digital abstraction and CMOS',
              url: 'https://ocw.mit.edu/courses/6-004-computation-structures-spring-2017/',
              type: 'course',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
              note: 'Lectures 1-3 give the physical story (voltages, noise margins, CMOS) that Nand2Tetris abstracts away.',
            },
          ],
          exercises: [
            {
              slug: 'truth-table-to-expression',
              title: 'From truth tables to minimal expressions',
              prompt:
                'Write the truth tables for XOR, the 3-input majority function and the function "exactly one of a, b, c is 1". Derive the sum-of-products expression for each, then simplify it algebraically. Count the AND/OR/NOT gates in the unsimplified and simplified versions.',
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'nand-only-constructions',
              title: 'Build NOT, AND, OR and XOR from NAND',
              prompt:
                'Using only NAND gates, draw circuits for NOT, AND, OR and XOR. Minimise the number of NANDs (XOR can be done in 4). For each circuit write a truth table that proves it correct and state its depth in NAND delays.',
              kind: 'problem',
              difficulty: 2,
              hint: 'For XOR, start from a NAND of the two inputs and feed that result into two more NANDs, one with each original input.',
            },
            {
              slug: 'truth-table-checker',
              title: 'A truth-table checker in Python',
              prompt:
                'Write a Python function that takes two Boolean expressions as lambdas over (a, b, c) and reports whether they are equivalent by enumerating all 8 inputs, printing the first differing row if not. Use it to verify your simplifications from the first exercise and both De Morgan laws.',
              kind: 'coding',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does the sum-of-products construction prove that AND, OR and NOT are enough for every Boolean function?',
              answerOutline:
                'Each 1-row of any truth table becomes an AND term that is true only on that row; OR-ing the terms reproduces the table exactly. Nothing beyond AND, OR, NOT was used.',
            },
            {
              question: 'Give NOT and OR in terms of NAND.',
              answerOutline:
                'NOT(x) = NAND(x,x). OR(x,y) = NAND(NOT x, NOT y) = NAND(NAND(x,x), NAND(y,y)) by De Morgan.',
            },
            {
              question: 'What is the difference between gate count and depth, and which one determines clock speed?',
              answerOutline:
                'Count is total gates (cost/power); depth is longest input-to-output path (delay). Depth bounds how fast the clock can tick.',
            },
          ],
        },
        {
          slug: 'hdl-and-the-hardware-simulator',
          title: 'HDL and the hardware simulator',
          summary:
            'The Nand2Tetris Hardware Description Language, the simulator and its test scripts, and the discipline of building and testing one chip at a time.',
          estimatedMinutes: 90,
          objectives: [
            'Write a chip in Nand2Tetris HDL with correct IN/OUT declarations and PARTS wiring',
            'Run a .tst script in the hardware simulator and read a .cmp comparison failure',
            'Explain how chip abstraction lets a built-in or previously built chip be reused',
            'Debug a chip by stepping the simulator and inspecting internal pins',
          ],
          concepts: [
            'HDL: a description of wiring, not a program',
            'CHIP, IN, OUT, PARTS',
            'Internal pins and fan-out',
            'Test script (.tst), output file (.out), compare file (.cmp)',
            'Built-in chips vs user-built chips',
            'Chip hierarchy and abstraction',
            'Sub-bus notation (in[0..7])',
          ],
          explanation: `A hardware description language looks like code but describes **wiring**. The statements inside a PARTS section are not executed in order; they all exist at once, like components soldered to a board. A line such as \`Nand(a=a, b=b, out=nandOut);\` places one NAND chip and connects its pins. The internal signal \`nandOut\` may feed any number of other parts (fan-out), but it can only be driven by one part. Writing HDL as if it were sequential code is the first mistake everyone makes.

The simulator loads your \`.hdl\` file, and a **test script** feeds inputs, evaluates the chip, and writes results to a \`.out\` file, which is compared line by line against a supplied \`.cmp\` file. When a comparison fails, the simulator tells you the line number; open both files side by side and find the input row that broke. Then set those inputs manually in the simulator GUI and watch the internal pins to locate the wrong wire.

Two features of the language carry the whole course. First, once you have built a chip, you can use it as a **part** in later chips without thinking about its internals; this is abstraction made physical. Second, if you have not built a chip (or yours is buggy), the simulator falls back to its **built-in** implementation, so you can always proceed. For the same reason, it is wise to remove your own broken chip from the working directory while testing a chip that depends on it.

Install the Nand2Tetris software suite (or use the web IDE, which needs no installation), read the HDL survival guide linked from the software page, and build the \`Not\` and \`And\` gates from Project 1 this lesson. Watch for the sub-bus notation (\`in[0..7]\`), which you will need for 16-bit chips in the next lesson.`,
          resources: [
            {
              title: 'Nand2Tetris Software (web IDE and desktop tools)',
              url: 'https://www.nand2tetris.org/software',
              type: 'tool',
              cost: 'free',
              provider: 'Nand2Tetris',
              note: 'Includes the hardware simulator, HDL survival guide and tutorial slides.',
              primary: true,
            },
            {
              title: 'Nand2Tetris Web IDE',
              url: 'https://nand2tetris.github.io/web-ide/',
              type: 'interactive',
              cost: 'free',
              provider: 'Nand2Tetris',
              note: 'Runs all projects in the browser; good for quick experiments.',
            },
            {
              title: 'Nand2Tetris Project 1: Boolean Logic',
              url: 'https://www.nand2tetris.org/project01',
              type: 'problem-set',
              cost: 'free',
              provider: 'Nand2Tetris',
              note: 'Downloads the .hdl stubs, .tst scripts and .cmp files.',
            },
          ],
          exercises: [
            {
              slug: 'build-not-and',
              title: 'Build and test Not and And',
              prompt:
                'Implement Not.hdl and And.hdl using only Nand. Run Not.tst and And.tst in the simulator and confirm the comparison succeeds. Then deliberately swap two pins in And.hdl, re-run the test, and write down exactly what the failure message says and how the .out file differs from the .cmp file.',
              kind: 'coding',
              difficulty: 1,
            },
            {
              slug: 'hdl-fan-out-experiment',
              title: 'One driver, many readers',
              prompt:
                'Write a chip with input a and two outputs, out1 = NOT a and out2 = a AND a, sharing the internal NAND result where possible. Then try to connect two different parts to the same internal pin as outputs and record the simulator error. Explain in two sentences why hardware forbids this.',
              kind: 'coding',
              difficulty: 1,
            },
            {
              slug: 'write-your-own-test',
              title: 'Write a test script from scratch',
              prompt:
                'Read the test-scripting section of the Nand2Tetris software documentation and write your own .tst and .cmp files for a 3-input majority chip. Build the chip and make your test pass. Your .cmp must list all 8 input rows.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does the order of statements in a PARTS section not matter?',
              answerOutline:
                'HDL describes connections among simultaneously existing parts; every statement is a wire, not an instruction. The simulator propagates signals until they settle.',
            },
            {
              question: 'What happens if you use a chip you have not yet implemented?',
              answerOutline:
                'The simulator uses its built-in version of that chip, so you can build and test out of order.',
            },
            {
              question: 'How do you find which input row made a test fail?',
              answerOutline:
                'The simulator reports the failing line of the .out vs .cmp comparison; read the inputs on that line and set them manually in the simulator to inspect internal pins.',
            },
          ],
        },
        {
          slug: 'multiplexers-and-multi-bit-buses',
          title: 'Multiplexers, demultiplexers and 16-bit gates',
          summary:
            'Building the full Project 1 chip set: Or, Xor, Mux, DMux, their 16-bit versions, and the multi-way variants used to steer data around a CPU.',
          estimatedMinutes: 150,
          objectives: [
            'Derive and implement Mux and DMux from basic gates',
            'Build 16-bit gates by replication and understand bus notation',
            'Build multi-way chips (Or8Way, Mux4Way16, Mux8Way16, DMux4Way, DMux8Way) by composing 2-way chips',
            'Explain the role of select bits and relate a Mux to an if/else statement',
          ],
          concepts: [
            'Multiplexer (selector) and demultiplexer (router)',
            'Select bits and binary encoding of choices',
            'Bus: a bundle of wires treated as one value',
            'Bitwise replication of a 1-bit gate',
            'Tree composition of 2-way chips into n-way chips',
            'Or8Way as a reduction',
            'Chip interface vs implementation',
          ],
          explanation: `A **multiplexer** (Mux) chooses: with select bit $s$, $\\text{out} = s ? b : a$. Written in Boolean algebra, $\\text{out} = \\bar{s}a + sb$. It is the hardware version of \`if\`, and it appears everywhere in a CPU: choosing which value to load into a register, choosing whether the ALU's second operand comes from a register or memory, choosing between the next instruction address and a jump target. A **demultiplexer** (DMux) is the opposite: one input is routed to one of several outputs according to the select bits, the others are 0.

Multi-bit chips are mostly bookkeeping. \`And16\` is sixteen \`And\` gates side by side, one per bit; in HDL you write sixteen lines (or use the bus syntax \`a[0..7]\` to split a bus). Multi-way chips are built as trees: \`Mux4Way16\` is three \`Mux16\`s, two selecting on \`sel[0]\` and a third selecting between their outputs on \`sel[1]\`. Get the select-bit ordering right: in Nand2Tetris, \`sel=00\` picks \`a\`, \`01\` picks \`b\`, \`10\` picks \`c\`, \`11\` picks \`d\`, so \`sel[0]\` is the least significant bit.

\`Or8Way\` is a different kind of chip: a *reduction* of a bus to a single bit. You will use it in the ALU to compute the "output is zero" flag. A tree of Or gates has depth $\\log_2 8 = 3$ rather than 7 for a chain; depth matters.

Pitfalls: forgetting that \`DMux\` outputs must be 0 when not selected, and mixing up select ordering in the 8-way chips. Test each chip immediately after building it; do not write all fifteen and then test. When Project 1 is complete, you will have built every combinational building block the rest of the computer needs.`,
          resources: [
            {
              title: 'Nand2Tetris Project 1: Boolean Logic',
              url: 'https://www.nand2tetris.org/project01',
              type: 'problem-set',
              cost: 'free',
              provider: 'Nand2Tetris',
              primary: true,
            },
            {
              title: 'Nand2Tetris Chapter 1 slides and lecture',
              url: 'https://www.nand2tetris.org/course',
              type: 'lecture',
              cost: 'free',
              provider: 'Nand2Tetris',
            },
            {
              title: 'CircuitVerse online digital circuit simulator',
              url: 'https://circuitverse.org/',
              type: 'interactive',
              cost: 'free',
              provider: 'CircuitVerse',
              note: 'Useful for drawing a Mux or DMux graphically and watching the signals before writing HDL.',
            },
          ],
          exercises: [
            {
              slug: 'complete-project-1',
              title: 'Complete Project 1',
              prompt:
                'Build all fifteen chips of Project 1 (Not, And, Or, Xor, Mux, DMux, Not16, And16, Or16, Mux16, Or8Way, Mux4Way16, Mux8Way16, DMux4Way, DMux8Way) and pass every supplied test. Record the NAND count of your Mux and Xor; try to get Mux to 4 NANDs.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'mux-gate-count',
              title: 'Count gates in the full chip set',
              prompt:
                'Write a script (or a spreadsheet) that, for each of your Project 1 chips, computes the total number of NAND gates it expands to, given the counts of the chips it uses. Report the total for Mux8Way16 and the depth in NAND delays of Or8Way built as a chain vs a tree.',
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'mux-in-python',
              title: 'Simulate Mux4Way16 in software',
              prompt:
                'Write a Python function mux4way16(a, b, c, d, sel) operating on 16-bit integers that mirrors your HDL tree exactly (three 2-way muxes). Test it against all four select values with random 16-bit inputs, 1000 trials, and assert it equals the obvious list-index implementation.',
              kind: 'coding',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'Write the Boolean expression for a 2-way Mux and explain each term.',
              answerOutline:
                'out = (NOT s AND a) OR (s AND b): the first term passes a when s=0, the second passes b when s=1; exactly one term is active.',
            },
            {
              question: 'How many Mux16 chips does a Mux8Way16 need, and why is the depth 3?',
              answerOutline:
                'Seven Mux16s arranged as a binary tree (4 + 2 + 1); each level uses one select bit, so three levels for three select bits.',
            },
            {
              question: 'What must the non-selected outputs of a DMux be, and why does the CPU care?',
              answerOutline:
                'Zero. Downstream chips (e.g. register load lines) must see a clean 0 so that they do not act when not addressed.',
            },
          ],
        },
      ],
    },
    {
      slug: 'arithmetic-and-alu',
      title: 'Arithmetic and the ALU',
      description:
        'Binary numbers and two\'s complement, half and full adders, a 16-bit adder and incrementer, and the elegant Hack ALU of Nand2Tetris Project 2.',
      lessons: [
        {
          slug: 'binary-arithmetic-and-twos-complement',
          title: "Binary arithmetic and two's complement",
          summary:
            'How integers are encoded in a fixed number of bits, why two\'s complement makes subtraction free, and what overflow really is.',
          estimatedMinutes: 90,
          objectives: [
            'Convert between decimal, binary and hexadecimal by hand',
            'Add and subtract fixed-width binary numbers and detect overflow',
            "Explain two's complement as arithmetic modulo 2^n and negate a number with the invert-and-add-one trick",
            'State the range of signed and unsigned n-bit integers',
          ],
          concepts: [
            'Positional notation, base 2 and base 16',
            'Fixed width and modular arithmetic',
            "Two's complement encoding",
            'Sign bit and the asymmetric range [-2^(n-1), 2^(n-1)-1]',
            'Negation: invert and add one',
            'Carry out vs signed overflow',
            'Sign extension',
          ],
          explanation: `In a 16-bit machine every number is sixteen bits, and arithmetic is done **modulo $2^{16}$**: when an addition would need a seventeenth bit, that bit is simply lost. Unsigned numbers use all sixteen bits for magnitude, giving the range $0$ to $65535$. To represent negatives we want a scheme where the *same adder* works for both; **two's complement** is that scheme.

In two's complement the most significant bit has weight $-2^{n-1}$ instead of $+2^{n-1}$. So for 4 bits, $1111 = -8 + 4 + 2 + 1 = -1$ and $1000 = -8$. The range is $-2^{n-1}$ to $2^{n-1}-1$: one more negative number than positive, because zero takes a slot on the positive side. The payoff: $x + (-x)$ must equal $2^n \\equiv 0$, so $-x = 2^n - x$. Since $2^n - 1$ is all ones, $-x = (\\text{all ones} - x) + 1 = \\bar{x} + 1$: **flip every bit and add one**. Subtraction $a - b$ is therefore $a + \\bar{b} + 1$, which an adder can do with a bit of extra wiring, and that is exactly how the Hack ALU will do it.

**Overflow** is subtle. For unsigned numbers, overflow means a carry out of the top bit. For signed numbers, a carry out is normal (e.g. $-1 + 1$) and overflow means the result has the wrong sign: adding two positives and getting a negative, or two negatives and getting a positive. In hardware, signed overflow is detected when the carry *into* the sign bit differs from the carry *out* of it. In C, unsigned overflow wraps silently and signed overflow is undefined behaviour; the Data Representation module returns to this at length.

Work through Nand2Tetris chapter 2's first sections and CS:APP section 2.2 (the book is paid; the lecture slides and labs on the CMU 15-213 site are free). Practise by hand until converting $-37$ to 8-bit hex is automatic.`,
          resources: [
            {
              title: 'Nand2Tetris Chapter 2: Boolean Arithmetic',
              url: 'https://www.nand2tetris.org/course',
              type: 'textbook',
              cost: 'free',
              provider: 'Nand2Tetris',
              primary: true,
            },
            {
              title: 'CMU 15-213 Introduction to Computer Systems — Lecture slides on bits, bytes and integers',
              url: 'https://www.cs.cmu.edu/~213/',
              type: 'lecture',
              cost: 'free',
              provider: 'Carnegie Mellon University',
              note: 'Schedule page links slides for "Bits, Bytes and Integers" (two lectures).',
            },
            {
              title: 'Computer Systems: A Programmer\'s Perspective, 3rd ed. (CS:APP) — book site',
              url: 'https://csapp.cs.cmu.edu/3e/home.html',
              type: 'textbook',
              cost: 'paid',
              provider: 'Bryant and O\'Hallaron',
              note: 'Chapter 2. The book is paid; the 15-213 slides and labs are the free alternative.',
            },
          ],
          exercises: [
            {
              slug: 'conversions-by-hand',
              title: 'Conversions by hand',
              prompt:
                "Without a calculator: write 2024, -2024, 255 and -1 as 16-bit two's complement in binary and hex; convert 0xBEEF and 0x7FFF to signed and unsigned decimal; compute 0x7FFF + 1 and 0x8000 - 1 in 16 bits and say whether each is a signed overflow, an unsigned overflow, both or neither. Check with Python afterwards.",
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'overflow-detector',
              title: 'Implement n-bit arithmetic with overflow flags',
              prompt:
                'Write a Python class Int(n) that stores an n-bit two\'s complement value and implements add and sub returning (result, carry_out, signed_overflow). Verify signed_overflow == (carry into sign bit != carry out of sign bit) exhaustively for n = 4 (all 256 pairs) and compare against Python\'s unbounded integers.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'negation-edge-case',
              title: 'The number that is its own negative',
              prompt:
                "Show by the invert-and-add-one rule that negating -32768 in 16 bits gives -32768. Explain why abs(INT_MIN) is undefined in C and what a 16-bit machine would actually print for it. Then find the C expression that safely tests whether negation would overflow.",
              kind: 'problem',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does flipping all bits and adding one negate a number?',
              answerOutline:
                "Because all-ones = 2^n - 1, so NOT x = 2^n - 1 - x, and adding 1 gives 2^n - x, which is -x modulo 2^n.",
            },
            {
              question: 'How is signed overflow detected in hardware?',
              answerOutline:
                'Carry into the sign bit XOR carry out of the sign bit; equivalently, both operands have the same sign and the result has the opposite sign.',
            },
            {
              question: "What is the 8-bit two's complement range and why is it asymmetric?",
              answerOutline:
                '-128 to +127. There are 256 patterns; zero takes one of the 128 non-negative patterns, leaving 127 positives.',
            },
          ],
        },
        {
          slug: 'adders',
          title: 'Half adders, full adders and the 16-bit adder',
          summary:
            'From the one-bit half adder to a ripple-carry Add16 and Inc16, and the first look at why carry propagation limits speed.',
          estimatedMinutes: 120,
          objectives: [
            'Build HalfAdder and FullAdder in HDL from Project 1 gates',
            'Chain full adders into a 16-bit ripple-carry adder and build Inc16',
            'Analyse the delay of a ripple-carry adder and explain carry-lookahead in outline',
            'Verify adders exhaustively in software and by test script in hardware',
          ],
          concepts: [
            'Half adder: sum = a XOR b, carry = a AND b',
            'Full adder: three inputs, sum and carry',
            'Ripple-carry adder',
            'Carry chain and worst-case delay O(n)',
            'Carry-lookahead (generate and propagate)',
            'Incrementer as a special case',
            'Ignoring the final carry out (modular arithmetic)',
          ],
          explanation: `Adding two bits gives a sum and a carry: that is a **half adder**, with $\\text{sum} = a \\oplus b$ and $\\text{carry} = ab$. Adding a column in the middle of a number needs three inputs, the two operand bits and the carry from the previous column; the **full adder** computes $\\text{sum} = a \\oplus b \\oplus c$ and $\\text{carry} = ab + c(a \\oplus b)$. A full adder can be made from two half adders and an Or; see whether you can do better in NAND count.

A **ripple-carry adder** chains sixteen full adders, each column's carry out feeding the next column's carry in. The carry into bit 0 is 0 (or 1, if you want to subtract, as the next lesson exploits). The final carry out is discarded: the Hack computer does arithmetic modulo $2^{16}$. \`Inc16\` is an adder with the constant 1 as the second operand; you can build it from \`Add16\`, or more cheaply from a chain of half adders since one operand is known.

Now think about delay. Bit 15's sum is not correct until the carry has rippled through all fifteen lower columns, so the delay grows linearly with width. A 64-bit ripple adder would make a slow CPU. Real adders use **carry lookahead**: for each column compute *generate* $g_i = a_i b_i$ (this column produces a carry no matter what) and *propagate* $p_i = a_i \\oplus b_i$ (this column passes a carry along); then carries can be computed in parallel with $c_{i+1} = g_i + p_i c_i$ expanded out, trading gates for depth $O(\\log n)$. You do not have to build one, but you should be able to explain it.

Build HalfAdder, FullAdder, Add16 and Inc16 from Project 2 this lesson and test them. Then write a software model and check it exhaustively for 4 bits so that you trust the design before relying on it in the ALU.`,
          resources: [
            {
              title: 'Nand2Tetris Project 2: Boolean Arithmetic',
              url: 'https://www.nand2tetris.org/project02',
              type: 'problem-set',
              cost: 'free',
              provider: 'Nand2Tetris',
              primary: true,
            },
            {
              title: 'MIT 6.004 (OCW) — Combinational logic and arithmetic',
              url: 'https://ocw.mit.edu/courses/6-004-computation-structures-spring-2017/',
              type: 'lecture',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
              note: 'The lectures on combinational logic and "Arithmetic circuits" cover carry-lookahead and timing.',
            },
            {
              title: 'Ben Eater — Building an 8-bit breadboard computer',
              url: 'https://eater.net/8bit',
              type: 'video',
              cost: 'free',
              provider: 'Ben Eater',
              note: 'The ALU videos show a real adder built from 74-series chips, including the subtraction trick.',
            },
          ],
          exercises: [
            {
              slug: 'build-adders',
              title: 'Build HalfAdder, FullAdder, Add16, Inc16',
              prompt:
                'Implement the four chips and pass their tests. Report the NAND count of your FullAdder. Then build a second FullAdder directly from the sum-of-products expressions and compare gate count and depth with the two-half-adder version.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'software-ripple-adder',
              title: 'Model the ripple-carry adder in software',
              prompt:
                'Write a Python ripple-carry adder that operates bit by bit on lists of 0/1 and returns the sum bits plus carry-out. Verify it exhaustively for 8 bits (65536 cases) against integer addition modulo 256. Then instrument it to report the number of columns the carry actually propagated through, and plot a histogram over all inputs: what is the average carry-chain length?',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'carry-lookahead-4bit',
              title: 'Derive a 4-bit carry-lookahead',
              prompt:
                'Using generate g_i and propagate p_i, write c1, c2, c3 and c4 as expressions in g, p and c0 with no recursion. Count the AND and OR gates and the depth, and compare with a 4-bit ripple adder. Optionally implement it in HDL and test it against Add16\'s low 4 bits.',
              kind: 'derivation',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'Give the Boolean expressions for the full adder\'s sum and carry.',
              answerOutline:
                'sum = a XOR b XOR c; carry = ab + c(a XOR b) (equivalently ab + ac + bc).',
            },
            {
              question: 'Why is the ripple-carry adder slow and how does lookahead help?',
              answerOutline:
                'Each column waits for the previous carry, giving O(n) depth. Lookahead computes all carries from generate/propagate signals in parallel, giving O(log n) depth at the cost of more gates.',
            },
            {
              question: 'What happens to the carry out of bit 15 in Add16 and why is that acceptable?',
              answerOutline:
                'It is dropped; the machine does arithmetic modulo 2^16, which is exactly what two\'s complement needs.',
            },
          ],
        },
        {
          slug: 'the-hack-alu',
          title: 'The Hack ALU',
          summary:
            'Six control bits, eighteen functions: how a tiny set of preprocessing and postprocessing steps turns one adder into a complete arithmetic-logic unit.',
          estimatedMinutes: 150,
          objectives: [
            'Explain each of the six Hack ALU control bits (zx, nx, zy, ny, f, no) and the two output flags (zr, ng)',
            'Derive why the control-bit table yields subtraction, negation, increment and bitwise ops from one adder',
            'Implement the ALU in HDL using Mux16, Not16, And16, Add16 and Or8Way',
            'Test the ALU against the full truth table and reason about what it cannot do (multiply, shift)',
          ],
          concepts: [
            'ALU as a combinational function of two 16-bit inputs and control bits',
            'Preprocessing: zero and negate inputs',
            'Function select: add vs and',
            'Postprocessing: negate output',
            'Status flags zr (zero) and ng (negative)',
            'Instruction encoding foreshadowed: control bits come straight from the instruction',
            'Minimal hardware, rich behaviour',
          ],
          explanation: `The **ALU** is the computational heart of the CPU: give it two 16-bit values $x$ and $y$ and some control bits, and it produces a 16-bit result. The Hack ALU is a small masterpiece. It takes only six control bits and computes eighteen useful functions: $0, 1, -1, x, y, \\bar{x}, \\bar{y}, -x, -y, x+1, y+1, x-1, y-1, x+y, x-y, y-x, x \\& y, x | y$.

The trick is a pipeline of simple transformations. **zx**: if set, replace $x$ by 0. **nx**: if set, bitwise-negate $x$. The same for $y$ with **zy** and **ny**. **f**: if 1 compute $x + y$, if 0 compute $x \\& y$. **no**: if set, bitwise-negate the output. Every step is a \`Mux16\` choosing between a value and its transformed version, so the whole ALU is six Mux16s, a few Not16s, an And16 and an Add16.

Why does it work? Take $x - y$: the table says zx=0, nx=1, zy=0, ny=0, f=1, no=1. The ALU computes $\\overline{\\bar{x} + y}$. In two's complement, $\\bar{a} = -a - 1$, so $\\overline{\\bar{x} + y} = -(\\bar{x} + y) - 1 = -(-x - 1 + y) - 1 = x - y$. Work out a few others yourself; every line of the table follows from the identity $\\bar{a} = -a - 1$ and the fact that AND of all-ones with $a$ is $a$. The clever part is that **$x | y$** falls out of De Morgan: negate both inputs, AND them, negate the output.

The two output flags are cheap: **zr** is 1 when the output is all zeros (an \`Or8Way\` on each half, then a \`Not\` of their Or), and **ng** is the output's bit 15, the sign. The CPU will use these for conditional jumps.

Build it and run the test, which exercises every function. Note what the ALU lacks: multiplication, division and shifts. Hack does these in software, which is a perfectly respectable choice for a teaching machine and was common in early real ones.`,
          resources: [
            {
              title: 'Nand2Tetris Project 2: Boolean Arithmetic (ALU)',
              url: 'https://www.nand2tetris.org/project02',
              type: 'problem-set',
              cost: 'free',
              provider: 'Nand2Tetris',
              primary: true,
            },
            {
              title: 'Nand2Tetris Chapter 2 lecture (ALU section)',
              url: 'https://www.nand2tetris.org/course',
              type: 'lecture',
              cost: 'free',
              provider: 'Nand2Tetris',
              note: 'The chapter contains the full control-bit truth table you must implement.',
            },
            {
              title: 'Coursera Nand to Tetris Part I — Week 2 (Boolean Arithmetic and the ALU)',
              url: 'https://www.coursera.org/learn/build-a-computer',
              type: 'course',
              cost: 'freemium',
              provider: 'Coursera',
            },
          ],
          exercises: [
            {
              slug: 'derive-alu-table',
              title: 'Derive every row of the ALU table',
              prompt:
                "For each of the 18 functions in the Hack ALU specification, write the algebraic justification using only the identity NOT a = -a - 1 and the behaviour of AND with 0 and all-ones. Present it as a table: function, control bits, derivation. Identify any two functions that could be computed by more than one control-bit setting.",
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'build-alu',
              title: 'Build and test the ALU',
              prompt:
                'Implement ALU.hdl and pass ALU.tst. Then write a Python model with the same six control bits, run it over the same control settings with 10,000 random (x, y) pairs, and confirm every result, zr and ng matches the ALU specification. Report the depth of your ALU in terms of Mux16 and Add16 stages.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'alu-extension',
              title: 'Extend the ALU with a shift',
              prompt:
                'Design (on paper and optionally in HDL as ALUx.hdl) a seventh control bit that, when set, replaces the output with x shifted left by one bit (x*2). Explain what changes in the control table and estimate the added gate count. Why might a designer choose not to add it?',
              kind: 'problem',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'Explain how the Hack ALU computes x - y using only an adder.',
              answerOutline:
                'Set nx=1, f=1, no=1: output = NOT(NOT x + y). Using NOT a = -a - 1 this is -(-x - 1 + y) - 1 = x - y.',
            },
            {
              question: 'How is the zr flag computed and why does it matter?',
              answerOutline:
                'Or8Way on each half of the output, Or of the two, then Not. The CPU uses it (with ng) to implement conditional jumps such as JEQ.',
            },
            {
              question: 'Which common operations does the Hack ALU lack, and how does Hack perform them?',
              answerOutline:
                'Multiply, divide and shifts. They are done in software loops, as in many early and small CPUs.',
            },
          ],
        },
      ],
      project: {
        slug: 'alu-software-twin',
        title: 'Project: an ALU software twin and gate-level cost model',
        description: `Write a bit-accurate software model of your Project 2 chips (adders and ALU) that is driven by the same test scripts the hardware simulator uses, and extend it with a cost model that counts NAND gates and depth for each chip by walking the HDL hierarchy. Use it to compare design alternatives (ripple vs lookahead adder, Mux-based vs SOP full adder).`,
        deliverables: [
          'A parser that reads your .hdl files and computes NAND count and depth for every chip',
          'A Python ALU model that passes the official ALU.cmp vectors',
          'A short report comparing at least two adder designs on gates and depth',
        ],
        estimatedHours: 8,
        stretchGoals: ['Simulate your HDL directly in software and run all Project 1-2 tests from your own simulator'],
      },
    },
    {
      slug: 'sequential-logic-and-memory',
      title: 'Sequential Logic and Memory',
      description:
        'Time enters the picture: clocks, the data flip-flop, registers, RAM built as a hierarchy, and the program counter (Nand2Tetris Project 3).',
      lessons: [
        {
          slug: 'clocks-flip-flops-and-state',
          title: 'Clocks, flip-flops and state',
          summary:
            'Why combinational logic cannot remember anything, how a clock discretises time, and the data flip-flop as the primitive of memory.',
          estimatedMinutes: 90,
          objectives: [
            'Distinguish combinational from sequential logic and explain why memory needs feedback',
            'Describe the clock cycle, and the rule that a DFF outputs its previous-cycle input',
            'Build a 1-bit register (Bit) with a load line from a DFF and a Mux',
            'Explain setup time, propagation delay and why the clock period must exceed the longest combinational path',
          ],
          concepts: [
            'Combinational vs sequential logic',
            'Clock, cycle, tick and tock',
            'Data flip-flop: out(t) = in(t-1)',
            'Latch vs edge-triggered flip-flop',
            'Feedback loops and stable state',
            'Load line and the 1-bit register',
            'Clock period, critical path, setup and hold time',
            'Synchronous design discipline',
          ],
          explanation: `Everything so far has been **combinational**: outputs are a function of current inputs and nothing else. Such a circuit cannot remember a value. To hold state you need feedback, a loop where an output feeds back to an input, and once you have loops you need discipline about *when* values are read, or the circuit may oscillate or settle unpredictably. That discipline is the **clock**.

A clock is a square wave alternating between two phases, *tick* and *tock*; one tick-tock is a **cycle**. Nand2Tetris provides a single sequential primitive, the **data flip-flop** (DFF), whose contract is $\\text{out}(t) = \\text{in}(t-1)$: whatever you present during cycle $t-1$ appears at the output during cycle $t$. Physically a DFF is built from gates with feedback (a pair of latches), and it is **edge-triggered**: it samples its input only at the clock edge, so the input can change freely during the rest of the cycle without disturbing the stored value.

From a DFF and a Mux you build the **Bit**, a 1-bit register with a *load* line: if load is 1, the DFF's next value is the input; otherwise the Mux feeds the DFF's own output back into it, so the value persists. Sixteen Bits make a Register. This is the pattern of all synchronous hardware: a block of combinational logic sits between banks of flip-flops, and at every clock edge the flip-flops capture the logic's outputs and present them as the next inputs.

The clock period is set by the **critical path**: the slowest combinational path between flip-flops plus the flip-flop's setup time. A 3 GHz CPU gets about 0.33 ns per cycle, which is roughly 10-20 gate delays; that is why pipelining (module 6) exists.

Read chapter 3 of Nand2Tetris and MIT 6.004's lecture on sequential logic, which explains setup and hold times properly. Then build Bit and Register from Project 3.`,
          resources: [
            {
              title: 'Nand2Tetris Chapter 3: Sequential Logic',
              url: 'https://www.nand2tetris.org/course',
              type: 'textbook',
              cost: 'free',
              provider: 'Nand2Tetris',
              primary: true,
            },
            {
              title: 'MIT 6.004 (OCW) — Sequential logic, flip-flops and timing',
              url: 'https://ocw.mit.edu/courses/6-004-computation-structures-spring-2017/',
              type: 'lecture',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
              note: 'The "Sequential Logic" lecture covers latches, edge-triggered flip-flops, setup and hold time.',
            },
            {
              title: 'Nand2Tetris Project 3: Sequential Logic',
              url: 'https://www.nand2tetris.org/project03',
              type: 'problem-set',
              cost: 'free',
              provider: 'Nand2Tetris',
            },
          ],
          exercises: [
            {
              slug: 'build-bit-and-register',
              title: 'Build Bit and Register',
              prompt:
                'Implement Bit.hdl (DFF + Mux) and Register.hdl, pass both tests, and then run Bit.tst step by step in the simulator with the clock display visible. Write a timeline for the first six cycles showing in, load, the DFF input and out, and explain the one-cycle delay you observe.',
              kind: 'coding',
              difficulty: 1,
            },
            {
              slug: 'sr-latch-from-nand',
              title: 'Build an SR latch from two NANDs',
              prompt:
                'In CircuitVerse (or on paper), cross-couple two NAND gates to make an SR latch. Record the behaviour for S,R = 10, 01, 11 and 00, identify the forbidden/metastable input, and explain why adding a clock-gated front end (making a D latch) removes the problem. Relate this to why Nand2Tetris simply gives you the DFF as a primitive.',
              kind: 'simulation',
              difficulty: 2,
            },
            {
              slug: 'critical-path-estimate',
              title: 'Estimate a maximum clock frequency',
              prompt:
                'Suppose a NAND gate delay is 20 ps, a DFF has a clock-to-output delay of 50 ps and a setup time of 30 ps. Using the depth you computed for your Add16 and ALU in earlier lessons, estimate the minimum clock period and maximum frequency of a Hack CPU whose critical path is register -> ALU -> register. Then compute the same for a 64-bit ripple-carry ALU and comment.',
              kind: 'problem',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'State the DFF contract and explain why it is enough to build all memory.',
              answerOutline:
                'out(t) = in(t-1). With a Mux feeding back the output when load=0, a DFF holds a bit indefinitely; replicate for registers, address for RAM.',
            },
            {
              question: 'Why must flip-flops be edge-triggered rather than transparent latches in a synchronous CPU?',
              answerOutline:
                'A transparent latch passes changes through while the clock is high, so feedback loops would race within one cycle; edge-triggering samples once per cycle and makes timing predictable.',
            },
            {
              question: 'What determines the maximum clock frequency?',
              answerOutline:
                'The critical path: longest combinational delay between flip-flops plus clock-to-Q and setup time; the period must exceed it.',
            },
          ],
        },
        {
          slug: 'registers-and-ram',
          title: 'Registers and RAM',
          summary:
            'Random-access memory as an addressable array of registers, built recursively from RAM8 to RAM16K with DMux and Mux trees.',
          estimatedMinutes: 120,
          objectives: [
            'Explain how an address selects one register out of 2^k using DMux (for load) and Mux (for output)',
            'Build RAM8, RAM64, RAM512, RAM4K and RAM16K recursively in HDL',
            'Describe how reading is combinational while writing takes effect in the next cycle',
            'Estimate the gate cost of a RAM and explain why real memories use different circuits',
          ],
          concepts: [
            'Register file and addressing',
            'Address decoding with DMux8Way',
            'Output selection with Mux8Way16',
            'Hierarchical (recursive) memory construction',
            'Address bit slicing: high bits select a bank, low bits select within it',
            'Read is immediate, write is clocked',
            'Cost scaling of flip-flop RAM vs DRAM/SRAM cells',
          ],
          explanation: `**RAM** is a block of $n$ registers where you can read or write any one of them by number. The **address** is a $k$-bit number with $n = 2^k$. A read is combinational: present an address and the selected register's value appears at the output within the same cycle. A write is sequential: present address, input and load=1, and the register's new value is visible from the next cycle.

The construction is a beautiful use of your Project 1 chips. For \`RAM8\`, take eight Registers. Route the *load* signal to exactly one of them with a \`DMux8Way\` driven by the address; the other seven registers see load=0 and keep their values. Collect all eight outputs into a \`Mux8Way16\`, again driven by the address, to select the output. That is the whole chip.

Larger memories are built **recursively**. \`RAM64\` is eight \`RAM8\`s: the top three address bits (\`address[3..5]\`) choose which \`RAM8\` to use, via a DMux8Way for load and a Mux8Way16 for output, and the low three bits (\`address[0..2]\`) are passed down as the address within that bank. \`RAM512\` is eight \`RAM64\`s, and so on up to \`RAM16K\` (which is four \`RAM4K\`s, needing a 4-way split). Which address bits go where is the only thing to get right; the tests will catch a slip.

Count the cost. A Bit is a DFF plus a Mux, around 5 NANDs plus the DFF; RAM16K has $16{,}384 \\times 16$ bits, so roughly $1.3$ million NAND-equivalents plus the mux trees. This is why real computers do not build main memory from flip-flops: DRAM stores a bit as charge on one transistor-capacitor pair, thousands of times denser but slower and in need of refresh, while SRAM (used in caches) uses six transistors per bit. The memory hierarchy module explains the consequences.

Build the five RAM chips from Project 3 now. The simulator is slow on RAM16K; be patient or test it last.`,
          resources: [
            {
              title: 'Nand2Tetris Project 3: Sequential Logic (RAM chips)',
              url: 'https://www.nand2tetris.org/project03',
              type: 'problem-set',
              cost: 'free',
              provider: 'Nand2Tetris',
              primary: true,
            },
            {
              title: 'Nand2Tetris Chapter 3 lecture: memory hierarchy of RAM chips',
              url: 'https://www.nand2tetris.org/course',
              type: 'lecture',
              cost: 'free',
              provider: 'Nand2Tetris',
            },
            {
              title: 'Ben Eater — RAM module for the 8-bit computer',
              url: 'https://eater.net/8bit',
              type: 'video',
              cost: 'free',
              provider: 'Ben Eater',
              note: 'Shows address decoding and a real SRAM chip; compare with the flip-flop design you build.',
            },
          ],
          exercises: [
            {
              slug: 'build-ram-hierarchy',
              title: 'Build RAM8 through RAM16K',
              prompt:
                'Implement RAM8, RAM64, RAM512, RAM4K and RAM16K in HDL and pass every test. For RAM64 write down exactly which address bits select the bank and which are passed down, and confirm by writing to address 9 (binary 001001) and reading addresses 1, 8 and 9.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'ram-cost-model',
              title: 'Count the gates in RAM16K',
              prompt:
                'Using your gate-count script from the ALU project (or a hand calculation), compute the number of NAND gates and DFFs in RAM16K, separating storage from the decoding/selection mux trees. What fraction is overhead? How does it scale if you double the memory?',
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'ram-timing-trace',
              title: 'Trace read and write timing',
              prompt:
                'Write a Python model of RAM8 with explicit tick/tock semantics. Perform: write 5 to address 3 at cycle 1 while reading address 3 in the same cycle; read address 3 in cycle 2. Report what is read in each case and explain why the answer differs between the two cycles.',
              kind: 'coding',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'How does RAM8 ensure only one register changes on a write?',
              answerOutline:
                'A DMux8Way routes the load signal to the register chosen by the address; all others receive load=0.',
            },
            {
              question: 'In RAM512 built from RAM64s, which address bits select the bank?',
              answerOutline:
                'The top three bits, address[6..8]; the low six bits are passed to the selected RAM64.',
            },
            {
              question: 'Why is reading combinational but writing takes a cycle?',
              answerOutline:
                'The mux tree is pure logic from the stored bits to the output; writing goes through the DFF, which only updates on the clock edge.',
            },
          ],
        },
        {
          slug: 'program-counter-and-timing',
          title: 'The program counter and sequential timing',
          summary:
            'The PC chip with reset, load and increment, the priority among its control inputs, and how to reason about sequential circuits cycle by cycle.',
          estimatedMinutes: 90,
          objectives: [
            'Build the PC chip from Register, Inc16 and Mux16 with the correct priority (reset > load > inc)',
            'Trace a sequential circuit over several cycles using a timing table',
            'Explain the role of the PC in fetching instructions and implementing jumps',
            'Recognise the general pattern of a finite-state machine: state register plus next-state logic',
          ],
          concepts: [
            'Program counter (PC)',
            'Control inputs: reset, load, inc and their priority',
            'Next-state logic',
            'Finite-state machine (FSM) view of sequential circuits',
            'Timing tables and cycle-accurate reasoning',
            'Unconditional and conditional jump as PC load',
            'Fetch-execute cycle foreshadowed',
          ],
          explanation: `The **program counter** holds the address of the next instruction. Each cycle it must do one of four things: stay put, add one, jump to a new address, or reset to zero. The Hack \`PC\` chip has three control inputs with a strict **priority**: if \`reset\` is 1, next value is 0; else if \`load\` is 1, next value is \`in\`; else if \`inc\` is 1, next value is \`out + 1\`; else next value is \`out\`. Everything is "next value", meaning it appears at the output in the following cycle, because the state lives in a Register.

The implementation is a chain of Mux16s that implement the priority in reverse order: start with the current output, mux in the incremented value if \`inc\`, then mux in \`in\` if \`load\`, then mux in zero if \`reset\`, and feed the result to a Register with load=1. The Register is the **state**; the muxes and Inc16 are the **next-state logic**. This state-plus-next-state-logic structure is the general form of every **finite-state machine**, from a traffic light to a CPU's control unit.

To get sequential circuits right you must reason **cycle by cycle**. Make a table with one row per clock cycle and columns for each input, each stored state and each output. Fill in state at cycle $t+1$ from inputs and state at cycle $t$. Doing this by hand for a handful of cycles will save hours of simulator confusion, especially when something seems "one cycle late": it is not late, it is a register.

In the CPU, the PC's \`inc\` is always on, \`load\` is driven by the jump logic (a function of the instruction's jump bits and the ALU's zr/ng flags), and \`reset\` comes from the outside world to restart the program. Build the PC now and finish Project 3; module 4 puts all the pieces together.`,
          resources: [
            {
              title: 'Nand2Tetris Project 3: Sequential Logic (PC chip)',
              url: 'https://www.nand2tetris.org/project03',
              type: 'problem-set',
              cost: 'free',
              provider: 'Nand2Tetris',
              primary: true,
            },
            {
              title: 'MIT 6.004 (OCW) — Finite state machines',
              url: 'https://ocw.mit.edu/courses/6-004-computation-structures-spring-2017/',
              type: 'lecture',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
              note: 'The FSM lecture generalises the state-register-plus-next-state-logic pattern.',
            },
            {
              title: 'Digital — an open-source digital logic simulator',
              url: 'https://github.com/hneemann/Digital',
              type: 'tool',
              cost: 'free',
              provider: 'Helmut Neemann',
              note: 'Good for drawing and stepping small FSMs with a visible clock.',
            },
          ],
          exercises: [
            {
              slug: 'build-pc',
              title: 'Build the PC chip',
              prompt:
                'Implement PC.hdl and pass PC.tst. Then write a timing table for the following sequence and predict out before running: cycle 1 inc=1; cycle 2 inc=1; cycle 3 load=1 in=100 inc=1; cycle 4 inc=1; cycle 5 reset=1 load=1 in=7. Confirm in the simulator.',
              kind: 'coding',
              difficulty: 1,
            },
            {
              slug: 'traffic-light-fsm',
              title: 'Design and build a small FSM',
              prompt:
                'Design a 2-bit counter that counts 0,1,2,3,0,... but skips 2 when input "fast" is 1. Draw the state diagram, derive the next-state truth table, implement it in HDL with a Register and gates, and write a .tst/.cmp pair that checks 8 cycles with fast toggling.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'software-cycle-simulator',
              title: 'A cycle-accurate simulator of the PC',
              prompt:
                'Write a Python class PC with a step(in_, load, inc, reset) method that updates state exactly as the hardware does (new state visible only after step returns). Generate 1000 random control sequences and compare to a reference implementation written directly from the priority rule.',
              kind: 'coding',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'What is the priority of reset, load and inc in the PC and how is it implemented?',
              answerOutline:
                'reset > load > inc. A Mux chain applied in the order inc, load, reset so the later (higher-priority) mux overrides earlier ones.',
            },
            {
              question: 'Describe the general structure of a finite-state machine in hardware.',
              answerOutline:
                'A state register clocked every cycle plus combinational next-state (and output) logic computed from current state and inputs.',
            },
            {
              question: 'When a value seems to appear "one cycle late", what is really happening?',
              answerOutline:
                'The value passed through a register, whose output reflects the input from the previous cycle by definition.',
            },
          ],
        },
      ],
    },
    {
      slug: 'machine-language-and-cpu',
      title: 'Machine Language and the CPU',
      description:
        'The Hack instruction set, writing programs in Hack assembly, then building the CPU and the complete Hack computer with memory-mapped screen and keyboard (Projects 4 and 5).',
      lessons: [
        {
          slug: 'hack-machine-language',
          title: 'The Hack machine language',
          summary:
            'A-instructions and C-instructions, the 16-bit encodings, the dest/comp/jump fields and how the registers A, D and M cooperate.',
          estimatedMinutes: 90,
          objectives: [
            'Decode any 16-bit Hack instruction into A- or C-instruction fields by hand',
            'Explain the roles of registers A, D and M, and why Hack has only two',
            'Write short Hack assembly sequences for load, store, add and branch',
            'Relate the comp field bits directly to the ALU control bits',
          ],
          concepts: [
            'Instruction = bits; instruction set architecture (ISA)',
            'A-instruction: @value, loads A',
            'C-instruction: dest = comp ; jump',
            'Registers A (address/data), D (data), M (memory at A)',
            'Harvard architecture: separate instruction and data memory',
            'Symbolic vs binary instructions',
            'Jump conditions and the ALU flags',
            'Predefined symbols: R0-R15, SCREEN, KBD',
          ],
          explanation: `A machine language is a contract between hardware and software: the hardware promises to interpret certain bit patterns in certain ways. The **Hack** language has only two instruction types, which makes it a wonderful first ISA.

The **A-instruction** \`@v\` is encoded as \`0vvv vvvv vvvv vvvv\`: a leading 0 followed by a 15-bit constant, which is loaded into register **A**. A does double duty: it holds a data value, and it holds an *address*, because the symbol **M** always means "the memory word at address A". So to read memory location 17 you write \`@17\` then use \`M\`.

The **C-instruction** \`dest = comp ; jump\` is encoded as \`111a cccc ccdd djjj\`. The seven **comp** bits select one of the ALU functions: the \`a\` bit decides whether the ALU's second input is A or M, and the six \`c\` bits are *literally* the ALU control bits zx, nx, zy, ny, f, no. The three **dest** bits say which of A, D and M receive the result (any combination; \`AMD=D+1\` is legal). The three **jump** bits say whether to jump to the address in A if the result is less than, equal to, or greater than zero, in any combination; \`JMP\` sets all three. Jumps are evaluated using the ALU's \`ng\` and \`zr\` flags.

Two consequences shape all Hack programs. First, because A is both the data pointer and the jump target, you must set A to a memory address, use M, then set A to the jump target before jumping. Second, **D** is the only pure data register, so most computations move things through D. Hack uses a **Harvard** architecture: instructions live in a separate ROM, so a program cannot overwrite itself and there is no way to execute data.

Read chapter 4 and decode the instruction table yourself. The next lesson has you write real programs.`,
          resources: [
            {
              title: 'Nand2Tetris Chapter 4: Machine Language',
              url: 'https://www.nand2tetris.org/course',
              type: 'textbook',
              cost: 'free',
              provider: 'Nand2Tetris',
              primary: true,
            },
            {
              title: 'Nand2Tetris Project 4: Machine Language Programming',
              url: 'https://www.nand2tetris.org/project04',
              type: 'problem-set',
              cost: 'free',
              provider: 'Nand2Tetris',
              note: 'Includes the CPU emulator and example programs.',
            },
            {
              title: 'Coursera Nand to Tetris Part I — Week 4 (Machine Language)',
              url: 'https://www.coursera.org/learn/build-a-computer',
              type: 'course',
              cost: 'freemium',
              provider: 'Coursera',
            },
          ],
          exercises: [
            {
              slug: 'decode-by-hand',
              title: 'Decode and encode Hack instructions by hand',
              prompt:
                'Decode the 16-bit words 0000000000010101, 1110110000010000, 1111000010001000 and 1110001100000001 into symbolic Hack. Then encode D=M-1;JLE, @SCREEN, AM=M+1 and 0;JMP into binary. Check each with the Nand2Tetris assembler.',
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'hack-disassembler',
              title: 'Write a Hack disassembler',
              prompt:
                'Write a program (Python or any language) that reads a .hack file of 16-bit binary strings and prints the symbolic instruction for each line, using the comp/dest/jump tables from chapter 4. Test it on the supplied Add.hack and Max.hack and confirm the output assembles back to the same binary.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'comp-bits-to-alu',
              title: 'Map the comp field onto the ALU',
              prompt:
                'For every row of the C-instruction comp table, write the ALU inputs (x = D, y = A or M) and show that the six c bits match the ALU control bits from the ALU lesson. Explain what the a bit does in hardware terms (which Mux it controls).',
              kind: 'problem',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why can an A-instruction only load 15-bit constants, and how do you load a 16-bit value like -1?',
              answerOutline:
                'The top bit is the opcode (0). To get -1 use a C-instruction such as D=-1 (the ALU can produce it), or compute it.',
            },
            {
              question: 'What does the a bit in a C-instruction control?',
              answerOutline:
                'Whether the ALU\'s second operand is the A register (a=0) or the memory word M addressed by A (a=1).',
            },
            {
              question: 'How is a conditional jump decided?',
              answerOutline:
                'The jump bits are combined with the ALU flags: jump if (j1 and ng) or (j2 and zr) or (j3 and not ng and not zr); the target is the address in A.',
            },
          ],
        },
        {
          slug: 'writing-hack-assembly-programs',
          title: 'Writing Hack assembly programs',
          summary:
            'Loops, pointers, arrays and memory-mapped I/O in Hack assembly: the Mult and Fill programs of Project 4, plus debugging in the CPU emulator.',
          estimatedMinutes: 150,
          objectives: [
            'Write loops with labels and conditional jumps, and use variables and pointers',
            'Implement multiplication by repeated addition (Mult.asm) and a screen-filling loop (Fill.asm)',
            'Use the CPU emulator to step, set breakpoints and inspect RAM',
            'Explain memory-mapped I/O: how writing to RAM changes the screen and how reading RAM reads the keyboard',
          ],
          concepts: [
            'Labels (LOOP) and symbols (i, sum) resolved by the assembler',
            'Loop idioms: counter, test, jump',
            'Pointer idiom: @addr, A=M, then M',
            'Memory map: RAM 0-16383, SCREEN at 16384, KBD at 24576',
            'Screen as 8192 words of 16 pixels each',
            'Polling the keyboard',
            'Debugging with breakpoints and watch points',
          ],
          explanation: `With two instruction types you can write anything, but you must think like the machine. A loop is a label, a test, and a jump:

\`\`\`
(LOOP)
  @i
  D=M      // D = i
  @n
  D=D-M    // D = i - n
  @END
  D;JGE    // if i >= n goto END
  ...body...
  @i
  M=M+1
  @LOOP
  0;JMP
(END)
\`\`\`

Variables such as \`i\` are symbols the assembler maps to free RAM addresses starting at 16; labels like \`(LOOP)\` are resolved to instruction addresses. Since Hack has no indirect addressing beyond M, a **pointer** dereference is a two-step idiom: \`@ptr\`, \`A=M\` (now A holds the address stored in ptr), then \`M\` is the target word. Arrays are pointer plus offset arithmetic done in D.

**Memory-mapped I/O** is the second big idea. The screen is 256 rows of 512 pixels, stored as 8192 words starting at address 16384 (symbol \`SCREEN\`): writing -1 (all ones) to \`SCREEN\` blackens the first sixteen pixels of row 0. The keyboard is one word at 24576 (\`KBD\`) holding the code of the currently pressed key, or 0. No special instructions are needed; the hardware wires those addresses to devices. The \`Fill\` program polls the keyboard forever and fills or clears the screen accordingly.

Debugging assembly is a skill. In the CPU emulator, run with the animation off for speed, set a breakpoint on the PC value of a label, and watch D, A and the RAM window. The classic bugs: forgetting that \`@LOOP\` changes A (so a pending M reference now points elsewhere), off-by-one loop bounds, and clobbering D between computing a value and using it.

Complete \`Mult.asm\` and \`Fill.asm\` from Project 4 and run their tests. Then try the extra exercises; writing a bit of real assembly before building the CPU makes the CPU design feel inevitable.`,
          resources: [
            {
              title: 'Nand2Tetris Project 4: Machine Language Programming',
              url: 'https://www.nand2tetris.org/project04',
              type: 'problem-set',
              cost: 'free',
              provider: 'Nand2Tetris',
              primary: true,
            },
            {
              title: 'Nand2Tetris Web IDE (CPU emulator)',
              url: 'https://nand2tetris.github.io/web-ide/',
              type: 'interactive',
              cost: 'free',
              provider: 'Nand2Tetris',
              note: 'Run .asm files directly; the screen and keyboard are emulated in the browser.',
            },
            {
              title: 'Nand2Tetris Chapter 4 lecture: programming the Hack computer',
              url: 'https://www.nand2tetris.org/course',
              type: 'lecture',
              cost: 'free',
              provider: 'Nand2Tetris',
            },
          ],
          exercises: [
            {
              slug: 'mult-and-fill',
              title: 'Mult.asm and Fill.asm',
              prompt:
                'Write Mult.asm computing R2 = R0 * R1 by repeated addition (inputs are non-negative and the product fits in 15 bits) and Fill.asm that blackens the whole screen while a key is held and clears it otherwise. Pass the Project 4 tests. Count the instructions executed by Mult for R0=3, R1=1000 and then rewrite the loop so it iterates over the smaller operand; measure again.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'array-sum',
              title: 'Sum an array with pointers',
              prompt:
                'Write Sum.asm: R0 holds the base address of an array and R1 its length; store the sum in R2. Test with an array of 10 values you place in RAM via the emulator, including a negative value. Write a .tst script that loads RAM, runs the program and compares R2.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'draw-a-rectangle',
              title: 'Draw a rectangle',
              prompt:
                'Write Rect.asm that draws a filled rectangle of width 16 pixels and height R0 rows at the top-left of the screen (the chapter 4 example), then generalise it so the left edge is at column 16*R1. Explain how you compute the word address of a pixel from its row and column.',
              kind: 'coding',
              difficulty: 2,
              hint: 'Word address = SCREEN + 32*row + column/16. Each row is 32 words.',
            },
          ],
          selfAssessment: [
            {
              question: 'Write the Hack idiom to store D into the word whose address is stored in variable ptr.',
              answerOutline:
                '@ptr, A=M, M=D. The first instruction sets A to the address of ptr; A=M loads the pointer value into A; M=D writes the target.',
            },
            {
              question: 'Which address turns the top-left 16 pixels black, and what value do you write?',
              answerOutline:
                'Address 16384 (SCREEN), value -1 (binary all ones).',
            },
            {
              question: 'Why does a stray @LABEL in the middle of a computation cause bugs?',
              answerOutline:
                'It overwrites A, so a subsequent M no longer refers to the intended memory word.',
            },
          ],
        },
        {
          slug: 'the-hack-cpu',
          title: 'Building the Hack CPU',
          summary:
            'Wiring the ALU, A and D registers, PC and control logic into a CPU that executes Hack instructions, following the chapter 5 diagram.',
          estimatedMinutes: 180,
          objectives: [
            'Draw the CPU datapath and name every control signal derived from the instruction bits',
            'Implement CPU.hdl and pass the CPU tests with and without external memory',
            'Explain how the jump decision is computed from the jump bits and the ALU flags',
            'Describe the fetch-execute cycle as it happens in the Hack CPU in a single clock cycle',
          ],
          concepts: [
            'Datapath vs control',
            'Instruction decoding: A- vs C-instruction by bit 15',
            'A register loaded from instruction or ALU output (Mux)',
            'D register loaded from ALU output under dest bit',
            'ALU y input: A or M via the a bit',
            'Outputs: outM, writeM, addressM, pc',
            'Jump logic: combining j bits with zr, ng',
            'Single-cycle execution',
          ],
          explanation: `The CPU is where everything meets. Its inputs are the current \`instruction\`, the memory word \`inM\` at the current address, and \`reset\`. Its outputs are \`outM\` and \`writeM\` (what to write to memory and whether to), \`addressM\` (which memory word to access, always the A register), and \`pc\` (the next instruction address). Inside are an **ALU**, two **Registers** (A and D), a **PC**, and control logic made of simple gates. Chapter 5 gives a diagram with the control signals marked by "c"; your job is to figure out what each c is.

Decoding starts with bit 15. If it is 0 this is an **A-instruction**: load A with the instruction itself (the top bit is 0 so the value is the 15-bit constant). If it is 1 this is a **C-instruction**: the ALU computes from \`x = D\` and \`y = \` (A or inM, selected by the a bit), using the six c bits as control. The dest bits decide whether A, D and M get the result: the A register's input is a Mux between the instruction (for A-instructions) and the ALU output (for C-instructions with the A dest bit), and its load is "is A-instruction OR (is C-instruction AND d1)". D loads only on C-instructions with d2. \`writeM\` is "is C-instruction AND d3"; \`outM\` is always the ALU output.

**Jumps** are the one piece of real logic. Compute \`lt = j1 AND ng\`, \`eq = j2 AND zr\`, \`gt = j3 AND NOT ng AND NOT zr\`; the PC's load is "is C-instruction AND (lt OR eq OR gt)", its \`in\` is A, and \`inc\` is always 1. The priority built into the PC chip ensures that reset wins.

Everything happens in one clock cycle: the instruction arrives, the ALU computes, the registers and PC capture results at the edge. There is no separate fetch phase because the instruction memory is separate (Harvard) and combinationally readable.

A common bug: using the dest bits on A-instructions. Mask every control signal with the instruction-type bit. Build, test with \`CPU.tst\` and \`CPU-external.tst\`, and keep the chapter diagram next to you.`,
          resources: [
            {
              title: 'Nand2Tetris Project 5: Computer Architecture',
              url: 'https://www.nand2tetris.org/project05',
              type: 'problem-set',
              cost: 'free',
              provider: 'Nand2Tetris',
              primary: true,
            },
            {
              title: 'Nand2Tetris Chapter 5: Computer Architecture',
              url: 'https://www.nand2tetris.org/course',
              type: 'textbook',
              cost: 'free',
              provider: 'Nand2Tetris',
              note: 'Figure 5.9 is the CPU diagram you are implementing.',
            },
            {
              title: 'MIT 6.004 (OCW) — Designing a single-cycle RISC-V processor',
              url: 'https://ocw.mit.edu/courses/6-004-computation-structures-spring-2017/',
              type: 'lecture',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
              note: 'Compare the Hack CPU with a single-cycle RISC-V datapath; the structure is the same, the decoding is richer.',
            },
          ],
          exercises: [
            {
              slug: 'control-signal-table',
              title: 'Derive the control signal table',
              prompt:
                'Before writing HDL, produce a table listing every control signal in the chapter 5 CPU diagram (A-register load and input select, D load, ALU y select, six ALU bits, writeM, PC load) as a Boolean expression of instruction bits and ALU flags. Verify it against three instructions: @5, D=M+1, and D;JNE.',
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'build-cpu',
              title: 'Build the CPU',
              prompt:
                'Implement CPU.hdl and pass CPU.tst and CPU-external.tst. Then introduce a deliberate bug (do not mask the D load with the instruction-type bit) and find the first test line that fails; explain why that specific line catches it.',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'cpu-in-python',
              title: 'A Python Hack CPU',
              prompt:
                'Write a cycle-accurate Hack CPU emulator in Python (registers A, D, PC; 32K instruction memory; RAM as a list) that executes .hack files. Run Mult.hack and Add.hack from Project 4 and compare RAM state with the official CPU emulator. Measure instructions per second and compare with the hardware simulator running CPU.tst.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'How does the CPU decide what the A register loads?',
              answerOutline:
                'Mux: the instruction itself if bit 15 = 0 (A-instruction), the ALU output if a C-instruction with dest bit d1; load = NOT bit15 OR (bit15 AND d1).',
            },
            {
              question: 'Write the expression for the PC load signal.',
              answerOutline:
                'bit15 AND ((j1 AND ng) OR (j2 AND zr) OR (j3 AND NOT ng AND NOT zr)).',
            },
            {
              question: 'Why does the Hack CPU need no separate fetch stage?',
              answerOutline:
                'Instruction memory is separate (Harvard) and read combinationally from pc, so the instruction is available in the same cycle it executes.',
            },
          ],
        },
        {
          slug: 'the-hack-computer',
          title: 'Memory, I/O and the complete Hack computer',
          summary:
            'The Memory chip that maps RAM, screen and keyboard into one address space, and the three-chip Computer that runs real programs.',
          estimatedMinutes: 120,
          objectives: [
            'Build Memory.hdl that routes addresses to RAM16K, Screen and Keyboard',
            'Assemble CPU, ROM32K and Memory into Computer.hdl and run Pong',
            'Explain memory-mapped I/O at the hardware level and contrast it with port-mapped I/O',
            'Describe the fetch-execute loop of the whole machine and where the reset comes from',
          ],
          concepts: [
            'Address space and memory map',
            'Address decoding by top bits',
            'Built-in Screen and Keyboard chips',
            'Memory-mapped vs port-mapped I/O',
            'ROM32K instruction memory',
            'Computer = CPU + instruction memory + data memory',
            'Von Neumann vs Harvard architecture',
            'Reset and the boot process',
          ],
          explanation: `The Hack **Memory** chip presents a single address space of 24577 words to the CPU, but it is three devices. Addresses 0-16383 go to \`RAM16K\`; 16384-24575 go to the built-in \`Screen\` chip (8K words that the simulator renders as pixels); 24576 goes to the built-in \`Keyboard\` chip (read-only). Decoding is done by the top address bits: bit 14 distinguishes RAM from the devices, and bit 13 then distinguishes screen from keyboard. A DMux routes the load signal (so a write to the keyboard address is simply ignored) and a Mux selects the output. This is **memory-mapped I/O**: devices look like memory, so the CPU needs no special I/O instructions. The alternative, port-mapped I/O with dedicated \`in\`/\`out\` instructions, exists on x86 but is rare in modern designs; even x86 devices are now mostly memory-mapped.

The complete **Computer** chip is three parts: \`ROM32K\` (built in, loaded with a program), your \`CPU\`, and your \`Memory\`. The CPU's \`pc\` output addresses the ROM, whose output is the CPU's \`instruction\`. The CPU's \`addressM\` addresses Memory, Memory's output is \`inM\`, and \`outM\`/\`writeM\` go back to Memory. That is the whole wiring. A \`reset\` input forces the PC to 0 and starts the program. There is no operating system: the program at address 0 runs forever.

Hack is a **Harvard** machine (separate instruction and data memories). Most real machines are **von Neumann**: one memory holds both, which lets an OS load programs from disk into memory and execute them, at the cost of needing to distinguish fetch from data access and to protect code from accidental writes. The Operating Systems subject explains how modern CPUs handle this with modes and page tables.

Build Memory and Computer, run the supplied tests (\`ComputerAdd\`, \`ComputerMax\`, \`ComputerRect\`), then load \`Pong.hack\` into the ROM and play a game on hardware you designed from NAND gates. That moment is the point of the course.`,
          resources: [
            {
              title: 'Nand2Tetris Project 5: Computer Architecture (Memory and Computer)',
              url: 'https://www.nand2tetris.org/project05',
              type: 'problem-set',
              cost: 'free',
              provider: 'Nand2Tetris',
              primary: true,
            },
            {
              title: 'Nand2Tetris Chapter 5 lecture',
              url: 'https://www.nand2tetris.org/course',
              type: 'lecture',
              cost: 'free',
              provider: 'Nand2Tetris',
            },
            {
              title: 'Ben Eater — Making a computer from logic chips (programming and control logic videos)',
              url: 'https://eater.net/8bit',
              type: 'video',
              cost: 'free',
              provider: 'Ben Eater',
              note: 'A von Neumann machine with a microcoded control unit; compare its multi-cycle fetch/execute with the single-cycle Hack design.',
            },
          ],
          exercises: [
            {
              slug: 'build-memory-and-computer',
              title: 'Build Memory and Computer',
              prompt:
                'Implement Memory.hdl and Computer.hdl, pass all Project 5 tests, and run Pong.hack in the hardware simulator with the screen visible. Record which address bits you used for decoding and show, with three example addresses (100, 20000, 24576), which device each reaches.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'memory-map-doc',
              title: 'Document the Hack memory map and compare with a real MCU',
              prompt:
                'Write a one-page memory-map document for Hack (ranges, device, read/write behaviour, what happens on a write to KBD). Then find the memory map of a real microcontroller (the RP2040 datasheet section 2.2) and compare: where are peripherals, how big is the address space, and why do real chips leave gaps.',
              kind: 'writing',
              difficulty: 2,
            },
            {
              slug: 'von-neumann-hack',
              title: 'Sketch a von Neumann Hack',
              prompt:
                'Design on paper a modified Hack computer in which instructions and data share one RAM. Which new CPU outputs and multiplexers would be needed? How many cycles would an instruction take, and what new failure modes (self-modifying code, executing data) appear? Write one page with a block diagram.',
              kind: 'writing',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'Which address bits distinguish RAM, screen and keyboard in Hack Memory?',
              answerOutline:
                'Bit 14 = 0 selects RAM16K; bit 14 = 1 and bit 13 = 0 selects Screen; bits 14 and 13 both 1 selects Keyboard (address 24576).',
            },
            {
              question: 'What is memory-mapped I/O and what is its advantage?',
              answerOutline:
                'Devices occupy addresses in the normal memory space so ordinary load/store instructions talk to them; no special I/O instructions or buses are needed.',
            },
            {
              question: 'What is the key difference between Harvard and von Neumann architectures, and which does Hack use?',
              answerOutline:
                'Harvard keeps instruction and data memories separate (Hack does this); von Neumann stores both in one memory, enabling loading programs as data.',
            },
          ],
        },
      ],
      project: {
        slug: 'hack-game',
        title: 'Project: a game in Hack assembly',
        description: `Write a complete interactive program in Hack assembly that runs on your Computer chip: for example a bouncing ball controlled by the arrow keys, a simple snake, or a reaction-time game. It must use the screen (drawing and erasing shapes), poll the keyboard, maintain state in RAM, and run at a playable speed in the CPU emulator. Measure its instruction count per frame and optimise the inner loop.`,
        deliverables: [
          'The .asm source with comments explaining the register usage and memory layout',
          'A test script that checks a known state after a fixed number of cycles',
          'A short write-up with the per-frame instruction count before and after optimisation',
        ],
        estimatedHours: 8,
        stretchGoals: ['Add a score display by writing a bitmap font routine'],
      },
    },
    {
      slug: 'assembler',
      title: 'The Assembler',
      description:
        'Crossing from hardware to software: the design of a two-pass assembler with a symbol table, its implementation in a language of your choice, and testing it against the reference (Project 6).',
      lessons: [
        {
          slug: 'assembler-design-and-symbols',
          title: 'Assembler design: parsing, encoding and the symbol table',
          summary:
            'What an assembler does, why symbols need two passes, and the module structure (parser, code, symbol table) that makes it a two-hour program instead of a two-day one.',
          estimatedMinutes: 90,
          objectives: [
            'Describe the translation from symbolic Hack to binary as a pipeline of parse, resolve, encode',
            'Explain why forward references to labels require a first pass',
            'Specify the Parser, Code and SymbolTable modules with their APIs',
            'Handle predefined symbols, labels and variables with the correct allocation rules',
          ],
          concepts: [
            'Assembler as translator (symbolic text to binary)',
            'Lexical conventions: whitespace, comments, labels',
            'Instruction encoding tables (comp, dest, jump)',
            'Symbol table: predefined, label, variable symbols',
            'Forward references and the two-pass algorithm',
            'Label addresses count instructions, not lines',
            'Variables allocated from RAM address 16',
            'Separation of concerns in a translator',
          ],
          explanation: `An **assembler** is the first piece of software in the stack, and it is simpler than it sounds: read a text file, strip comments and whitespace, turn each instruction into a 16-bit word, write the words out. Two things make it interesting: encoding tables and symbols.

**Encoding** is a lookup. The comp, dest and jump mnemonics map to fixed bit patterns given in chapter 4; a \`Code\` module with three functions, \`dest(mnemonic)\`, \`comp(mnemonic)\` and \`jump(mnemonic)\`, returning bit strings is all you need. A \`Parser\` module reads lines, classifies them as A-instruction, C-instruction or label pseudo-instruction, and exposes the fields (\`symbol\`, \`dest\`, \`comp\`, \`jump\`).

**Symbols** are where care is needed. There are three kinds. *Predefined* symbols (\`R0\`-\`R15\`, \`SCREEN\`, \`KBD\`, \`SP\`, \`LCL\`, \`ARG\`, \`THIS\`, \`THAT\`) have fixed addresses. *Labels* such as \`(LOOP)\` stand for the address of the *next instruction*; labels generate no code, so you must count instructions, not lines. *Variables* are any other symbol appearing in an A-instruction; the first time one is seen it is allocated the next free RAM address, starting at 16.

The problem is **forward references**: \`@END\` may appear before \`(END)\` is defined. The solution is **two passes**. Pass 1 only tracks the instruction counter and adds every label to the symbol table. Pass 2 translates, looking up labels, allocating variables on first use, and emitting binary. A single pass with backpatching is possible but harder; two passes are the idiomatic answer and the one you will meet again in linkers.

Design before coding. Write down the API of each module, the exact rules for symbol allocation, and three tricky test inputs (a label used before definition; a variable that looks like a label; a comment on the same line as an instruction). The next lesson implements it.`,
          resources: [
            {
              title: 'Nand2Tetris Chapter 6: Assembler',
              url: 'https://www.nand2tetris.org/course',
              type: 'textbook',
              cost: 'free',
              provider: 'Nand2Tetris',
              note: 'The chapter specifies the Parser, Code and SymbolTable APIs; follow them.',
              primary: true,
            },
            {
              title: 'Nand2Tetris Project 6: Assembler',
              url: 'https://www.nand2tetris.org/project06',
              type: 'problem-set',
              cost: 'free',
              provider: 'Nand2Tetris',
              note: 'Supplies test programs (Add, Max, Rect, Pong) in symbolic and symbol-less form.',
            },
            {
              title: 'Coursera Nand to Tetris Part I — Week 6 (Assembler)',
              url: 'https://www.coursera.org/learn/build-a-computer',
              type: 'course',
              cost: 'freemium',
              provider: 'Coursera',
            },
          ],
          exercises: [
            {
              slug: 'assemble-by-hand',
              title: 'Two-pass assembly by hand',
              prompt:
                'Take Max.asm from Project 6. Perform pass 1 by hand: list every label with its instruction address. Then perform pass 2 for the first ten instructions, listing symbol lookups and variable allocations. Compare your binary with Max.hack.',
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'assembler-design-doc',
              title: 'Write the design document',
              prompt:
                'Write a one-page design for your assembler: module APIs, the symbol-table rules, error handling (what happens on an unknown mnemonic?), and ten test cases with expected binary output, including one with a forward reference and one with a variable named like a label but never defined as one.',
              kind: 'writing',
              difficulty: 1,
            },
            {
              slug: 'symbol-table-edge-cases',
              title: 'Symbol table edge cases',
              prompt:
                'Decide and justify: what should your assembler do with @16 vs @x when x is the first variable; with a label defined twice; with @R16 (not predefined); with a label (3abc) that starts with a digit. Write a tiny test program for each and state the expected behaviour (binary output or error).',
              kind: 'problem',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does the assembler need two passes?',
              answerOutline:
                'A jump may reference a label defined later in the file; pass 1 records label addresses so pass 2 can resolve forward references.',
            },
            {
              question: 'What address does a label get, and what is the common off-by-one mistake?',
              answerOutline:
                'The address of the next real instruction. Counting file lines (including comments, blanks and the label line itself) instead of instructions gives wrong addresses.',
            },
            {
              question: 'How are variables allocated?',
              answerOutline:
                'Any unseen symbol in an A-instruction that is not a label or predefined symbol gets the next free RAM address starting at 16, in order of first appearance.',
            },
          ],
        },
        {
          slug: 'building-the-assembler',
          title: 'Building the assembler',
          summary:
            'Implementing the Hack assembler in a language of your choice, module by module, first without symbols and then with the full symbol table.',
          estimatedMinutes: 180,
          objectives: [
            'Implement the Parser, Code and SymbolTable modules and the two-pass driver',
            'Produce byte-identical .hack output to the reference assembler for all supplied programs',
            'Structure the program so each module is unit-testable',
            'Give useful error messages with line numbers for malformed input',
          ],
          concepts: [
            'Incremental development: symbol-less version first',
            'Unit tests for the Code tables',
            'String cleaning: comments, whitespace, blank lines',
            'Instruction counter vs line counter',
            'Formatting 16-bit binary strings (zero padding)',
            'Error reporting with line numbers',
            'Diffing output against a reference',
          ],
          explanation: `Build the assembler in two stages, exactly as chapter 6 recommends. **Stage 1** handles programs without symbols (the \`*L.asm\` files in Project 6, where labels and variables have been replaced by numbers). This exercises the Parser and Code modules and the output formatting without the symbol table. **Stage 2** adds the SymbolTable and the first pass.

Keep the modules honest. \`Parser\` should expose something like \`has_more_lines()\`, \`advance()\`, \`instruction_type()\`, \`symbol()\`, \`dest()\`, \`comp()\`, \`jump()\`. \`Code\` is three dictionaries. \`SymbolTable\` is a dictionary with \`add_entry\`, \`contains\` and \`get_address\`, pre-populated with the predefined symbols. The driver runs pass 1 (count instructions, record labels), rewinds, and runs pass 2 (translate, allocate variables, write output). Write unit tests for \`Code\` first: a wrong bit in the comp table is the most common bug and the hardest to spot by eye.

**Details that bite.** Comments can appear after an instruction on the same line (\`D=M // load\`); strip from \`//\` onward before anything else. A-instruction values must be formatted as 15-bit zero-padded binary with a leading 0. The dest field can be empty (\`0;JMP\`) and so can the jump field (\`D=M\`); the Code tables must map the empty mnemonic to \`000\`. A label line does not advance the instruction counter. An instruction like \`M=M+1;JGT\` is legal.

Test by **diffing**: run your assembler on each supplied \`.asm\`, diff against the supplied \`.hack\`, and demand zero differences. Pong.asm has over 28,000 lines and will find any residual bug. Finally add error handling: an unknown mnemonic or an undefined behaviour should print the line number and the offending text, not a stack trace.

When this works, you have written the first translator of the software hierarchy. The Compilers subject continues from here with a VM translator and a compiler for a Java-like language that targets this very assembler.`,
          resources: [
            {
              title: 'Nand2Tetris Project 6: Assembler',
              url: 'https://www.nand2tetris.org/project06',
              type: 'problem-set',
              cost: 'free',
              provider: 'Nand2Tetris',
              primary: true,
            },
            {
              title: 'Nand2Tetris Software — reference assembler',
              url: 'https://www.nand2tetris.org/software',
              type: 'tool',
              cost: 'free',
              provider: 'Nand2Tetris',
              note: 'Use the supplied assembler to generate reference .hack files for your own test programs.',
            },
            {
              title: 'Nand2Tetris Chapter 6: Assembler',
              url: 'https://www.nand2tetris.org/course',
              type: 'textbook',
              cost: 'free',
              provider: 'Nand2Tetris',
            },
          ],
          exercises: [
            {
              slug: 'stage-1-assembler',
              title: 'Symbol-less assembler',
              prompt:
                'Implement the Parser and Code modules and a driver that assembles AddL.asm, MaxL.asm, RectL.asm and PongL.asm. Diff your output against the supplied .hack files; all four must match exactly. Include unit tests that check every entry of the comp, dest and jump tables.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'stage-2-assembler',
              title: 'Full assembler with symbols',
              prompt:
                'Add the SymbolTable and the two-pass driver. Assemble Add.asm, Max.asm, Rect.asm and Pong.asm and diff against the .hack files. Then assemble your own Project 4 programs and your module-project game, run the output in the CPU emulator, and confirm identical behaviour to the reference assembler\'s output.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'assembler-error-messages',
              title: 'Error handling and a fuzz test',
              prompt:
                'Write five malformed programs (unknown comp mnemonic, missing closing parenthesis, @ followed by nothing, dest with an illegal letter, constant larger than 32767) and make your assembler report each with the line number. Then write a fuzzer that randomly mutates one character of Pong.asm 200 times and confirm your assembler never crashes with an unhandled exception.',
              kind: 'coding',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'Why implement the symbol-less version first?',
              answerOutline:
                'It isolates parsing and encoding bugs from symbol-resolution bugs; supplied *L.asm files give exact references to diff against.',
            },
            {
              question: 'Which table is most error-prone and how do you test it?',
              answerOutline:
                'The comp table (28 entries, 7 bits each). Unit-test every entry against the chapter 4 specification, and diff Pong.hack which uses nearly all of them.',
            },
            {
              question: 'What must the Code module return for an empty dest or jump field?',
              answerOutline:
                '000 in each case; the fields are optional in C-instructions.',
            },
          ],
        },
        {
          slug: 'testing-and-the-hack-toolchain',
          title: 'Testing, the Hack toolchain and what comes next',
          summary:
            'Closing the loop: assembling your own programs, running them on your own CPU, and seeing how VM translators, compilers and operating systems stack on top.',
          estimatedMinutes: 90,
          objectives: [
            'Run a program through assembler, CPU emulator and your HDL Computer and verify identical results',
            'Write end-to-end tests that automate the assemble-run-compare cycle',
            'Describe the layers above the assembler in the Nand2Tetris stack (VM, compiler, OS) and in a real system',
            'Explain how a linker and loader generalise the assembler\'s symbol table',
          ],
          concepts: [
            'End-to-end test: source, binary, expected RAM state',
            'Golden files and regression tests',
            'Toolchain: assembler, VM translator, compiler',
            'Virtual machine abstraction (stack machine)',
            'Linker: symbol resolution across files',
            'Loader: placing a binary in memory',
            'Relocation and why real binaries are not fixed-address',
          ],
          explanation: `You now own every layer from NAND to a running program. Before moving on, make the pipeline reproducible. An **end-to-end test** takes a \`.asm\` file, assembles it with your assembler, runs the binary in the CPU emulator (or in your HDL Computer via a \`.tst\` script that loads the ROM), and compares selected RAM words against expected values. Automate this with a script and keep the expected outputs as **golden files**; when you later optimise the assembler or change the CPU, the tests tell you instantly whether you broke anything. This is exactly how real toolchains are tested.

Now look up. Nand2Tetris Part II builds a **VM translator** that turns stack-machine code into Hack assembly, then a **compiler** from the Jack language to VM code, then an operating system written in Jack. Each layer is a translator whose output is the previous layer's input, and each exists to make the layer above simpler: nobody wants to write Pong in assembly. The Compilers subject covers these in depth.

In real systems the assembler's symbol table grows into the **linker**. A program is compiled as several object files, each with its own symbols; the linker merges them, resolves references across files (the forward-reference problem again, now across files), and lays everything out in memory. Because the final address is not known at assembly time, object code is **relocatable**: it carries a list of places that must be patched once the address is chosen. The **loader** (part of the OS) copies the result into memory and jumps to its entry point. Hack has none of this because programs are fixed at ROM address 0, but the systems-programming toolchain module covers linking in detail.

Finish Part I of the Coursera course if you have been following it, then move on: module 6 asks why real CPUs are a thousand times faster than the one you just built.`,
          resources: [
            {
              title: 'Nand2Tetris Part II (Coursera): From Nand to Tetris, VM translator to OS',
              url: 'https://www.coursera.org/learn/nand2tetris2',
              type: 'course',
              cost: 'freemium',
              provider: 'Coursera',
              note: 'The software half of the course; a preview of what the Compilers subject does.',
            },
            {
              title: 'Nand2Tetris Project 7: Virtual Machine I (Stack Arithmetic)',
              url: 'https://www.nand2tetris.org/project07',
              type: 'problem-set',
              cost: 'free',
              provider: 'Nand2Tetris',
              note: 'Read the overview to see what the layer above the assembler looks like.',
              primary: true,
            },
            {
              title: 'Linkers and Loaders (John R. Levine) — free online edition',
              url: 'https://www.iecc.com/linker/',
              type: 'textbook',
              cost: 'free',
              provider: 'John R. Levine',
              note: 'Chapter 1 explains relocation and symbol resolution in a few pages.',
            },
          ],
          exercises: [
            {
              slug: 'end-to-end-test-harness',
              title: 'An end-to-end test harness',
              prompt:
                'Write a script that, for every .asm in a tests directory, assembles it with your assembler, runs the resulting .hack in the Nand2Tetris CPU emulator in batch mode via a generated .tst script, and compares RAM[0..15] to a golden JSON file. Include at least six programs. Make one test fail on purpose and confirm the script reports it.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'run-on-hdl-computer',
              title: 'Run your program on your HDL computer',
              prompt:
                'Load one of your own assembled programs into ROM32K in the hardware simulator via a .tst script, run it for enough cycles to finish, and check the output in RAM. Measure how long the hardware simulator takes vs the CPU emulator for the same program and explain the difference in terms of what each tool simulates.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'relocation-thought-experiment',
              title: 'Relocatable Hack',
              prompt:
                'Suppose two Hack programs, each with labels and variables, must be concatenated into one ROM image and share RAM. List every kind of address that must change when the second program is placed after the first, propose a format for a relocatable .hack file that records those places, and write a small "linker" that combines two of your assembler\'s outputs correctly.',
              kind: 'coding',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'What is a golden-file regression test and why is it valuable for a toolchain?',
              answerOutline:
                'A stored expected output compared against current output on every change; it catches unintended behaviour changes immediately and cheaply.',
            },
            {
              question: 'How does a linker generalise the assembler\'s symbol table?',
              answerOutline:
                'It resolves symbols across multiple object files, merging their symbol tables and patching references once final addresses are assigned.',
            },
            {
              question: 'Why is object code relocatable in real systems but not in Hack?',
              answerOutline:
                'Hack programs always start at ROM address 0; real programs are placed at addresses chosen at link or load time, so absolute addresses must be patched.',
            },
          ],
        },
      ],
    },
    {
      slug: 'performance-pipelining-caches',
      title: 'Performance, Pipelining and Caches',
      description:
        'Why real processors are fast: measuring performance, RISC instruction sets, pipelining and its hazards, the memory hierarchy and cache design, and a look at multicore and GPUs (MIT 6.004 and CS:APP chapters 4-6).',
      lessons: [
        {
          slug: 'measuring-performance',
          title: 'Measuring performance: the iron law and Amdahl',
          summary:
            'Execution time as instructions times CPI times cycle time, benchmarks, Amdahl\'s law, and how to measure real programs honestly.',
          estimatedMinutes: 90,
          objectives: [
            'State the iron law of processor performance and use it to compare design changes',
            'Apply Amdahl\'s law to predict the speedup from improving part of a workload',
            'Measure execution time and cycle counts of a C program with hardware counters',
            'Explain why MHz and MIPS alone are misleading and what benchmarks like SPEC do',
          ],
          concepts: [
            'Execution time = instructions x CPI x clock period',
            'CPI (cycles per instruction) and IPC',
            'Clock frequency vs work per cycle',
            'Amdahl\'s law: speedup limited by the unimproved fraction',
            'Benchmarks (SPEC CPU) and the danger of microbenchmarks',
            'Latency vs throughput',
            'Hardware performance counters (perf stat)',
            'Measurement noise and repeatability',
          ],
          explanation: `A computer architect has one objective function: **execution time**. The **iron law** factors it:

$$T = N_{\\text{instr}} \\times \\text{CPI} \\times t_{\\text{cycle}}$$

Instruction count depends on the ISA and the compiler; CPI on the microarchitecture (pipelining, caches, branch prediction); cycle time on the circuit design and technology. Every design decision moves these three against each other. A RISC ISA raises $N$ but lowers CPI and cycle time; a complex instruction lowers $N$ but may raise CPI. Your Hack CPU has CPI = 1 by construction and a long cycle time because the ALU and memory are on the critical path; real CPUs run at CPI well below 1 (several instructions per cycle) with a cycle time of tens of gate delays.

**Amdahl's law** governs any optimisation. If a fraction $f$ of execution time is sped up by a factor $s$, the overall speedup is

$$S = \\frac{1}{(1-f) + f/s}$$

With $f = 0.9$ and infinitely fast improvement, you gain at most $10\\times$. This is why making the common case fast is the architect's mantra, and why measuring *before* optimising is not optional.

**Measurement** is harder than it looks. Clock frequency says nothing about work per cycle, and MIPS compares instruction counts across incompatible ISAs. Standard benchmark suites (SPEC CPU) run real programs and report geometric means. On your own machine, use \`perf stat\` on Linux to read hardware counters: cycles, instructions (so IPC), cache misses, branch mispredictions. Run each measurement several times, report the median and spread, pin the CPU frequency if you can, and be suspicious of any result that differs by less than the noise.

Read the first part of CS:APP chapter 5 (or the 15-213 slides on program optimisation) and MIT 6.004's lecture on performance, then do the measurement exercise: it is the baseline for everything in this module.`,
          resources: [
            {
              title: 'MIT 6.004 (OCW) — Lecture notes on performance measures and pipelining',
              url: 'https://ocw.mit.edu/courses/6-004-computation-structures-spring-2017/',
              type: 'lecture',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
              note: 'See the "Pipelining the Beta/RISC-V" lectures for latency vs throughput and the iron law.',
              primary: true,
            },
            {
              title: 'CMU 15-213 — Code optimisation lecture slides',
              url: 'https://www.cs.cmu.edu/~213/',
              type: 'lecture',
              cost: 'free',
              provider: 'Carnegie Mellon University',
              note: 'Covers CPE (cycles per element) measurement methodology used in the exercises.',
            },
            {
              title: 'perf: Linux profiling with performance counters (kernel wiki)',
              url: 'https://perf.wiki.kernel.org/index.php/Main_Page',
              type: 'documentation',
              cost: 'free',
              provider: 'kernel.org',
              note: 'The perf stat section; use it to read cycles, instructions, cache-misses and branch-misses.',
            },
            {
              title: 'Computer Organization and Design, RISC-V Edition (Patterson and Hennessy)',
              url: 'https://shop.elsevier.com/books/computer-organization-and-design-risc-v-edition/patterson/978-0-12-820331-6',
              type: 'textbook',
              cost: 'paid',
              provider: 'Elsevier',
              note: 'Chapter 1.6 on performance. Paid; the MIT 6.004 lectures are the free alternative for this module.',
            },
          ],
          exercises: [
            {
              slug: 'iron-law-problems',
              title: 'Iron law and Amdahl problems',
              prompt:
                'A program runs 2 billion instructions at CPI 1.5 on a 3 GHz CPU. (a) Execution time? (b) A new compiler cuts instructions by 20% but raises CPI to 1.7: faster or slower? (c) 60% of time is in a loop that a SIMD rewrite speeds up 4x: overall speedup? (d) What fraction must be parallelisable for 16 cores to give 10x? Show working.',
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'perf-stat-baseline',
              title: 'Measure a real program with hardware counters',
              prompt:
                'Write a C program that sums a 100-million-element int array, compile with -O0 and -O2, and run each five times under perf stat -e cycles,instructions,cache-misses,branch-misses (or the equivalent on your platform). Report median cycles, instructions, IPC and the run-to-run spread. Explain the change in instruction count and in IPC between -O0 and -O2 using the iron law.',
              kind: 'coding',
              difficulty: 2,
              hint: 'On macOS use Instruments or clang -O2 with time; on Windows use WSL2 for perf.',
            },
            {
              slug: 'hack-cpu-performance',
              title: 'Apply the iron law to your Hack CPU',
              prompt:
                'Using the instruction count of your Mult program (from module 4), CPI = 1, and the clock-period estimate from the sequential-logic lesson, compute the execution time of Mult for R0=100, R1=200. Then estimate how a hardware multiply instruction (1 instruction, but say 4 cycles) would change N, CPI and T.',
              kind: 'problem',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'State the iron law and say which design layer controls each factor.',
              answerOutline:
                'T = instructions x CPI x cycle time. ISA/compiler control instruction count; microarchitecture controls CPI; circuits/technology control cycle time.',
            },
            {
              question: 'If 80% of a program can be sped up 10x, what is the maximum overall speedup?',
              answerOutline:
                '1 / (0.2 + 0.8/10) = 1 / 0.28 = 3.57x.',
            },
            {
              question: 'Why is clock frequency alone a poor measure of performance?',
              answerOutline:
                'It ignores work per cycle (IPC) and instruction count; a slower clock with higher IPC or fewer instructions can be faster.',
            },
          ],
        },
        {
          slug: 'instruction-set-design-and-risc-v',
          title: 'Instruction set design and RISC-V',
          summary:
            'From Hack to a real ISA: registers, addressing modes, instruction formats, calling conventions, and the RISC philosophy as embodied by RISC-V.',
          estimatedMinutes: 120,
          objectives: [
            'Read and write simple RISC-V assembly (RV32I) including loads, stores, branches and calls',
            'Explain the RISC design principles and contrast them with CISC',
            'Decode a RISC-V instruction into its format fields (R, I, S, B, U, J)',
            'Describe the register calling convention and why it exists',
          ],
          concepts: [
            'General-purpose register file (32 registers)',
            'Load/store architecture',
            'Instruction formats and fixed-width encoding',
            'Immediate values and sign extension',
            'Addressing modes (register + offset)',
            'Calling convention: caller/callee-saved, a0-a7, ra, sp',
            'RISC vs CISC',
            'Pseudo-instructions and the assembler',
          ],
          explanation: `Hack has two registers and two instruction types; a real ISA has to serve compilers, operating systems and performance. **RISC-V** is the ideal second ISA: open, clean, and used in both MIT 6.004 and modern textbooks.

The **RISC** idea is to keep instructions simple and regular so that hardware can execute them in a pipeline at one per cycle. RV32I has 32 registers of 32 bits (\`x0\` is hardwired to zero, a trick that eliminates many special cases), fixed 32-bit instructions, and a strict **load/store** rule: only \`lw\`/\`sw\` and friends touch memory; arithmetic works on registers. Compare x86, where \`add [rax], rbx\` reads and writes memory in one instruction. The RISC trade-off is more instructions (higher $N$) for lower CPI and cycle time; decoding is trivial, and the pipeline (next lesson) is uniform.

Instructions come in six **formats** (R, I, S, B, U, J) that put the register fields in the same bit positions wherever they appear, so the decoder can start fetching register operands before it knows the opcode. Immediates are scattered across the word in ways that look bizarre but keep the sign bit in position 31 for every format, so sign-extension needs no decoding. Study the encoding table until you can explain why.

A **calling convention** is a social contract on top of the ISA: arguments in \`a0\`-\`a7\`, return value in \`a0\`, return address in \`ra\`, stack pointer \`sp\`; \`s\` registers are callee-saved, \`t\` registers caller-saved. The compiler and every library agree on it, which is what makes separately compiled code link. Writing a recursive function in assembly, with a proper stack frame, teaches more about function calls than any amount of C.

Use the RISC-V ISA manual as reference and Ripes, a visual simulator, to run code and watch registers. Compare your experience of Hack assembly: notice how much easier address arithmetic becomes with 31 usable registers.`,
          resources: [
            {
              title: 'The RISC-V Instruction Set Manual, Volume I: Unprivileged ISA',
              url: 'https://github.com/riscv/riscv-isa-manual',
              type: 'documentation',
              cost: 'free',
              provider: 'RISC-V International',
              note: 'Chapter 2 (RV32I base integer ISA) and the instruction encoding tables.',
              primary: true,
            },
            {
              title: 'Ripes — visual RISC-V simulator with pipeline and cache views',
              url: 'https://github.com/mortbopet/Ripes',
              type: 'tool',
              cost: 'free',
              provider: 'Morten Borup Petersen',
              note: 'Write RV32I assembly, step it, and later watch the 5-stage pipeline and cache simulations.',
            },
            {
              title: 'MIT 6.004 (OCW) — Instruction set architecture lectures',
              url: 'https://ocw.mit.edu/courses/6-004-computation-structures-spring-2017/',
              type: 'lecture',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
              note: 'Lectures on the RISC-V ISA, assembly and compiling procedures.',
            },
            {
              title: 'Compiler Explorer',
              url: 'https://godbolt.org/',
              type: 'interactive',
              cost: 'free',
              provider: 'Matt Godbolt',
              note: 'Compile C to RISC-V (rv32gc) or x86-64 assembly and compare instruction counts.',
            },
          ],
          exercises: [
            {
              slug: 'riscv-decode',
              title: 'Decode RISC-V instructions by hand',
              prompt:
                'Decode the 32-bit words 0x00A50533, 0xFF010113, 0x00812E23 and 0xFE0718E3 into RV32I assembly, identifying the format and every field. Then encode add x5, x6, x7; lw x10, 8(x2); and beq x1, x0, -16. Check with Ripes or an online assembler.',
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'recursive-factorial-riscv',
              title: 'Recursive factorial with a proper stack frame',
              prompt:
                'Write fact(n) in RV32I assembly as a recursive function that follows the calling convention (saves ra and the argument on the stack, restores them, returns in a0). Run fact(10) in Ripes and verify 3628800. Then compile the same function in C with Compiler Explorer at -O1 and compare instruction counts and stack usage.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'risc-vs-cisc-count',
              title: 'Count instructions: RISC-V vs x86-64',
              prompt:
                'Take a 20-line C function (string copy, or a dot product) and compile it in Compiler Explorer for rv32gc and x86-64 at -O2. Count static instructions and estimate dynamic instructions for an input of length 1000. Explain two specific places where x86 uses one instruction and RISC-V uses several, and one where the reverse holds.',
              kind: 'data-analysis',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What does "load/store architecture" mean and why does it help pipelining?',
              answerOutline:
                'Only load/store instructions access memory; ALU ops use registers only. Every instruction then has a uniform, predictable path through the pipeline.',
            },
            {
              question: 'Why is x0 hardwired to zero?',
              answerOutline:
                'Many operations (move, negate, compare with zero, nop, discard result) become ordinary instructions with x0 as an operand, simplifying the ISA.',
            },
            {
              question: 'What is the difference between caller-saved and callee-saved registers?',
              answerOutline:
                'Caller-saved (t registers) may be clobbered by a call, so the caller saves them if needed; callee-saved (s registers) must be preserved by the called function.',
            },
          ],
        },
        {
          slug: 'pipelining-and-hazards',
          title: 'Pipelining and hazards',
          summary:
            'The five-stage pipeline, data and control hazards, forwarding, stalls and branch prediction: how a CPU executes nearly one instruction every cycle.',
          estimatedMinutes: 150,
          objectives: [
            'Explain the classic five-stage pipeline and why it raises throughput without lowering latency',
            'Identify data, control and structural hazards in an instruction sequence',
            'Describe forwarding (bypassing) and the load-use stall',
            'Explain static and dynamic branch prediction and compute the cost of a misprediction',
          ],
          concepts: [
            'Pipeline stages: IF, ID, EX, MEM, WB',
            'Latency vs throughput of a pipeline',
            'Pipeline registers',
            'Data hazard (RAW) and forwarding',
            'Load-use hazard and the one-cycle stall',
            'Control hazard and branch penalty',
            'Branch prediction: static, 2-bit counters, BTB',
            'Superscalar and out-of-order execution (overview)',
          ],
          explanation: `Your Hack CPU does everything in one long cycle. **Pipelining** splits instruction execution into stages separated by registers, so that while one instruction is executing, the next is being decoded and the one after is being fetched. The classic five stages are **IF** (fetch), **ID** (decode, read registers), **EX** (ALU), **MEM** (data memory), **WB** (write register). Each instruction still takes five cycles of *latency*, but the *throughput* approaches one instruction per cycle, and the cycle time is set by the slowest stage rather than the whole path. This is the single most important reason real CPUs are fast.

The catch is **hazards**: situations where the next instruction cannot proceed. A **data hazard** arises when an instruction needs a register that a previous instruction has not yet written back. The fix is **forwarding**: route the ALU result directly from the EX/MEM pipeline register to the next instruction's ALU input instead of waiting for WB. One case cannot be forwarded in time: a load followed immediately by a use of its result (**load-use**), which needs a one-cycle **stall** (a bubble); compilers schedule an independent instruction in between when they can.

A **control hazard** arises because a branch outcome is not known until EX, yet two more instructions have already been fetched. Either stall (costly), or **predict**. Static prediction (backward branches taken) is decent; dynamic prediction with a table of 2-bit saturating counters indexed by the branch address, plus a branch target buffer, achieves well over 90% accuracy on typical code. A misprediction flushes the wrongly fetched instructions, costing the number of stages between fetch and resolve, which on deep modern pipelines is 15-20 cycles. That is why unpredictable branches in a hot loop are expensive and why \`perf\` reports branch-misses.

Beyond the five-stage model, modern cores are **superscalar** (several instructions per cycle) and **out-of-order** (executing independent instructions while a stalled one waits). Treat these as refinements of the same idea: find independent work. Use Ripes's pipeline view to watch hazards happen; the exercises depend on it.`,
          resources: [
            {
              title: 'MIT 6.004 (OCW) — Pipelining lectures',
              url: 'https://ocw.mit.edu/courses/6-004-computation-structures-spring-2017/',
              type: 'lecture',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
              note: 'Lectures on pipelined processors, hazards, and bypassing.',
              primary: true,
            },
            {
              title: 'Ripes — 5-stage pipeline visualisation',
              url: 'https://github.com/mortbopet/Ripes',
              type: 'tool',
              cost: 'free',
              provider: 'Morten Borup Petersen',
              note: 'Select the 5-stage processor with and without forwarding and step through code to see stalls and flushes.',
            },
            {
              title: 'CMU 15-213 — Processor architecture (CS:APP chapter 4) slides',
              url: 'https://www.cs.cmu.edu/~213/',
              type: 'lecture',
              cost: 'free',
              provider: 'Carnegie Mellon University',
              note: 'The Y86-64 pipelined implementation PIPE; the Architecture Lab (free) is based on it.',
            },
            {
              title: 'CS:APP Labs — Architecture Lab',
              url: 'http://csapp.cs.cmu.edu/3e/labs.html',
              type: 'problem-set',
              cost: 'free',
              provider: 'Carnegie Mellon University',
              note: 'Optional: modify a pipelined Y86-64 simulator to add an instruction and optimise a loop.',
            },
          ],
          exercises: [
            {
              slug: 'hazard-identification',
              title: 'Find the hazards',
              prompt:
                'For the sequence: lw x1,0(x2); add x3,x1,x4; sub x5,x3,x1; beq x5,x0,L; sw x3,4(x2): list every data hazard (which registers, between which instructions), say which are resolved by forwarding and which need a stall, and draw the pipeline diagram (cycles vs stages) with and without forwarding. Count total cycles for each.',
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'ripes-pipeline-experiment',
              title: 'Measure stalls in Ripes',
              prompt:
                'Write a loop in RV32I that sums an array of 100 words. Run it in Ripes on the 5-stage processor with forwarding and record cycles and instructions (CPI). Reorder the loop body to remove the load-use stall and measure again. Then unroll by 4 and measure a third time. Explain each change in CPI.',
              kind: 'simulation',
              difficulty: 2,
            },
            {
              slug: 'branch-misprediction-cost',
              title: 'Measure branch misprediction on real hardware',
              prompt:
                'Write a C program that counts elements above 128 in a 10-million-byte random array, once with the array sorted and once unsorted. Time both and read branch-misses with perf stat. Then rewrite the condition branch-free (using arithmetic on the comparison result) and measure again. Explain all three results in terms of prediction.',
              kind: 'coding',
              difficulty: 2,
              hint: 'The sorted version is predictable: a long run of not-taken followed by a long run of taken.',
            },
          ],
          selfAssessment: [
            {
              question: 'Why does pipelining improve throughput but not latency?',
              answerOutline:
                'Each instruction still passes through all stages (same or slightly more latency), but stages overlap so one instruction completes per cycle in steady state.',
            },
            {
              question: 'What is the load-use hazard and why can forwarding not fix it?',
              answerOutline:
                'A load\'s data is only available after MEM, but the next instruction needs it in EX one cycle earlier; one stall cycle is required (or an instruction reordered in between).',
            },
            {
              question: 'What is the cost of a branch misprediction and what determines it?',
              answerOutline:
                'The instructions fetched down the wrong path are flushed; the penalty equals the number of pipeline stages between fetch and branch resolution.',
            },
          ],
        },
        {
          slug: 'memory-hierarchy-and-caches',
          title: 'The memory hierarchy and caches',
          summary:
            'Why memory is the bottleneck, locality, cache organisation (direct-mapped to set-associative), hit/miss analysis, AMAT and writing cache-friendly code.',
          estimatedMinutes: 180,
          objectives: [
            'Explain the memory hierarchy and the latency/capacity trade-off at each level',
            'Decompose an address into tag, set index and block offset for a given cache geometry',
            'Simulate hits and misses for a loop by hand and classify misses (compulsory, capacity, conflict)',
            'Compute average memory access time and restructure code to improve locality',
          ],
          concepts: [
            'Registers, L1/L2/L3 caches, DRAM, SSD: latency and size',
            'Temporal and spatial locality',
            'Cache block (line), tag, set index, offset',
            'Direct-mapped, set-associative, fully associative',
            'Replacement policy (LRU) and write policy (write-back, write-allocate)',
            'Miss classification: compulsory, capacity, conflict',
            'AMAT = hit time + miss rate x miss penalty',
            'Loop interchange, blocking and stride',
          ],
          explanation: `A modern CPU can execute an instruction in a third of a nanosecond, but DRAM takes about 100 ns to respond. Without help, the processor would spend 99% of its time waiting. The help is the **memory hierarchy**: a few kilobytes of registers, tens of KB of L1 cache (about 1 ns), hundreds of KB of L2 (a few ns), megabytes of L3 (10-20 ns), gigabytes of DRAM, terabytes of SSD. It works because programs exhibit **locality**: recently used data is likely to be used again (temporal) and nearby data is likely to be used soon (spatial).

A **cache** stores recently used **blocks** (typically 64 bytes) of memory. An address of $m$ bits splits into a **block offset** ($b$ bits, $2^b$ = block size), a **set index** ($s$ bits, $2^s$ sets) and a **tag** (the rest). A **direct-mapped** cache has one block per set, so a block can live in exactly one place; an $E$-way **set-associative** cache has $E$ blocks per set and picks a victim with LRU; a fully associative cache has one set. Higher associativity reduces **conflict misses** (two hot blocks mapping to the same set) at the cost of slower, more power-hungry lookup. Misses are also classified as **compulsory** (first touch) and **capacity** (working set bigger than the cache).

The performance model is **AMAT**:

$$\\text{AMAT} = t_{\\text{hit}} + r_{\\text{miss}} \\times t_{\\text{penalty}}$$

With a 1 ns hit, 100 ns penalty, a miss rate of 2% versus 5% is the difference between 3 ns and 6 ns per access, which is why small changes to loop order can double a program's speed. Iterating a 2-D array row-major (stride 1) uses every byte of each fetched block; iterating column-major (stride = row length) wastes 15 of 16 ints per block. **Blocking** (tiling) restructures matrix code so that a sub-block stays in cache while it is reused.

Work through CS:APP chapter 6 via the 15-213 slides, then do the **Cache Lab**: part A is a cache simulator that replays memory traces, part B is optimising matrix transpose for a specific cache. It is the best exercise on this topic anywhere. Then read the Drepper paper's sections on caches for how real hardware behaves.`,
          resources: [
            {
              title: 'CMU 15-213 — The Memory Hierarchy and Cache Memories (slides and videos)',
              url: 'https://www.cs.cmu.edu/~213/',
              type: 'lecture',
              cost: 'free',
              provider: 'Carnegie Mellon University',
              note: 'Two lectures covering CS:APP chapter 6; the memory-mountain demo is worth reproducing.',
              primary: true,
            },
            {
              title: 'CS:APP Labs — Cache Lab',
              url: 'http://csapp.cs.cmu.edu/3e/labs.html',
              type: 'problem-set',
              cost: 'free',
              provider: 'Carnegie Mellon University',
              note: 'Write a cache simulator, then optimise matrix transpose for a 32-set, 1KB direct-mapped cache.',
            },
            {
              title: 'What Every Programmer Should Know About Memory (Ulrich Drepper)',
              url: 'https://people.freebsd.org/~lstewart/articles/cpumemory.pdf',
              type: 'article',
              cost: 'free',
              provider: 'Ulrich Drepper / Red Hat',
              note: 'Sections 3 (CPU caches) and 6 (what programmers can do). Long; read selectively.',
            },
            {
              title: 'MIT 6.004 (OCW) — Caches and the memory hierarchy',
              url: 'https://ocw.mit.edu/courses/6-004-computation-structures-spring-2017/',
              type: 'lecture',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
            },
          ],
          exercises: [
            {
              slug: 'address-decomposition',
              title: 'Address decomposition and hit/miss traces',
              prompt:
                'A 4 KB direct-mapped cache with 64-byte blocks and 32-bit addresses: how many bits of tag, set index and offset? Trace the accesses 0x0000, 0x0040, 0x1000, 0x0044, 0x1040, 0x0000 and mark each hit or miss with the miss type. Repeat for a 2-way set-associative cache of the same size with LRU.',
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'cache-lab',
              title: 'CS:APP Cache Lab',
              prompt:
                'Complete Cache Lab part A: a cache simulator in C taking (s, E, b) and a valgrind memory trace, reporting hits, misses and evictions, matching the reference simulator on all supplied traces. Then part B: optimise transpose for 32x32, 64x64 and 61x67 matrices and report your miss counts against the targets (under 300, 1300 and 2000).',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'loop-order-and-blocking',
              title: 'Measure loop order and blocking',
              prompt:
                'Implement matrix multiply for 1024x1024 doubles in C with loop orders ijk, ikj and jik, then a blocked version with block size 32. Time each and read L1 cache-misses with perf stat. Compute the measured speedup of blocking and compare with an AMAT estimate using 1 ns hit and 80 ns miss penalty.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Given a cache with S sets, E ways and B-byte blocks, how is an address split?',
              answerOutline:
                'Low log2(B) bits = block offset; next log2(S) bits = set index; remaining high bits = tag. E does not affect the split.',
            },
            {
              question: 'Why can increasing associativity reduce misses, and what does it cost?',
              answerOutline:
                'Blocks that collide in one set can coexist, removing conflict misses; the cost is comparing more tags in parallel (slower, more power) and a more complex replacement policy.',
            },
            {
              question: 'Compute AMAT for hit time 2 ns, miss rate 4%, miss penalty 100 ns.',
              answerOutline:
                '2 + 0.04 x 100 = 6 ns.',
            },
          ],
          relatedLessons: [
            'operating-systems/memory-virtualization/paging-and-tlbs',
            'systems-programming/performance-and-undefined-behaviour/cache-friendly-code-and-optimization',
          ],
        },
        {
          slug: 'parallelism-multicore-and-gpus',
          title: 'Parallelism: multicore, SIMD and GPUs',
          summary:
            'Why clock speeds stopped rising, the forms of parallelism (instruction-level, data-level, thread-level), cache coherence and the GPU model.',
          estimatedMinutes: 120,
          objectives: [
            'Explain the end of Dennard scaling and why multicore replaced faster clocks',
            'Distinguish ILP, SIMD/vector and thread-level parallelism with examples',
            'Describe cache coherence (MESI) and the false-sharing pitfall',
            'Explain the GPU execution model (SIMT) and when it beats a CPU',
          ],
          concepts: [
            'Moore\'s law vs Dennard scaling and the power wall',
            'Instruction-level parallelism and its limits',
            'SIMD / vector instructions (AVX, RISC-V V)',
            'Multicore and shared memory',
            'Cache coherence protocols (MESI)',
            'False sharing',
            'Memory consistency (overview)',
            'GPU: thousands of threads, SIMT, memory bandwidth',
          ],
          explanation: `Until about 2005, each new chip generation ran at a higher clock because transistors shrank and used proportionally less power (**Dennard scaling**). That stopped: leakage current and heat capped clocks near 3-5 GHz, while **Moore's law** kept delivering more transistors. The only way to use them was **parallelism**, which means the burden moved from the hardware to the programmer.

Three kinds of parallelism matter. **Instruction-level** parallelism is what pipelining, superscalar and out-of-order execution extract automatically; it is limited by dependences and branches, and modern cores already harvest most of it. **Data-level** parallelism applies one instruction to many data elements: **SIMD** units (AVX-512 handles sixteen floats per instruction; RISC-V has a vector extension) and compilers can auto-vectorise simple loops if you write them plainly. **Thread-level** parallelism runs independent instruction streams on multiple cores sharing memory.

Shared memory brings **cache coherence**. Each core has private L1/L2 caches, so when core A writes a variable that core B has cached, B's copy must be invalidated. The **MESI** protocol tracks each cache line as Modified, Exclusive, Shared or Invalid and sends messages over the interconnect to keep every core's view consistent. Coherence is invisible to correct programs but visible in performance: if two cores write different variables that share a 64-byte line, the line ping-pongs between caches (**false sharing**) and a parallel program can run slower than a serial one. Memory consistency, the question of what order writes become visible across cores, is subtler still and is why locks and atomics exist; the Operating Systems concurrency module covers it.

A **GPU** takes data parallelism to the extreme: thousands of simple cores running the same program on different data (**SIMT**), with enormous memory bandwidth and little cache. It wins when work is regular and abundant (matrix multiply, image processing, neural networks) and loses on branchy, pointer-chasing code. Read the MIT 6.004 parallel-processing lecture and the CS:APP multicore section, then measure false sharing yourself; it is the most convincing demonstration in this module.`,
          resources: [
            {
              title: 'MIT 6.004 (OCW) — Parallel processing and cache coherence lectures',
              url: 'https://ocw.mit.edu/courses/6-004-computation-structures-spring-2017/',
              type: 'lecture',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
              primary: true,
            },
            {
              title: 'CMU 15-213 — Synchronization and multicore lecture slides',
              url: 'https://www.cs.cmu.edu/~213/',
              type: 'lecture',
              cost: 'free',
              provider: 'Carnegie Mellon University',
              note: 'The "Thread-level parallelism" lecture includes the memory-consistency and false-sharing examples.',
            },
            {
              title: 'What Every Programmer Should Know About Memory — section 3.3.4 (multi-processor support) and 6.4',
              url: 'https://people.freebsd.org/~lstewart/articles/cpumemory.pdf',
              type: 'article',
              cost: 'free',
              provider: 'Ulrich Drepper',
            },
            {
              title: 'Agner Fog — Optimizing software in C++ and instruction tables',
              url: 'https://www.agner.org/optimize/',
              type: 'documentation',
              cost: 'free',
              provider: 'Agner Fog',
              note: 'Microarchitecture manual and instruction latency tables for x86; the definitive free reference on real-CPU behaviour.',
            },
          ],
          exercises: [
            {
              slug: 'false-sharing-measurement',
              title: 'Measure false sharing',
              prompt:
                'Write a C program with 4 threads (pthreads) each incrementing its own counter 100 million times. Version A: counters in adjacent array elements. Version B: each counter padded to its own 64-byte line. Time both and report the speedup of B over A, and over a single-threaded run. Explain with MESI.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'auto-vectorisation',
              title: 'See the compiler vectorise',
              prompt:
                'Write a loop that computes y[i] = a*x[i] + y[i] over 10 million floats. Compile with -O2 and -O3 -march=native, inspect the assembly in Compiler Explorer for SIMD instructions (e.g. vfmadd, vmulps), and measure the speedup. Then add a data-dependent branch inside the loop and show the vectorisation disappear.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'amdahl-multicore',
              title: 'Amdahl on a real machine',
              prompt:
                'Parallelise the matrix multiply from the cache lesson over 1, 2, 4 and 8 threads (or as many cores as you have). Plot speedup vs threads, fit the serial fraction using Amdahl\'s law, and discuss why the measured curve flattens (memory bandwidth, hyperthreading, coherence traffic).',
              kind: 'data-analysis',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'Why did processor clock speeds stop rising around 2005?',
              answerOutline:
                'Dennard scaling ended: shrinking transistors no longer reduced power per transistor, so higher clocks meant unmanageable heat (the power wall).',
            },
            {
              question: 'What is false sharing and how do you fix it?',
              answerOutline:
                'Two cores writing distinct variables in the same cache line cause the line to bounce between caches under MESI. Fix by padding/aligning each variable to its own line.',
            },
            {
              question: 'When does a GPU outperform a CPU?',
              answerOutline:
                'On regular, abundant data parallelism with few branches and high arithmetic intensity; CPUs win on serial, branchy, latency-sensitive code.',
            },
          ],
          relatedLessons: ['operating-systems/concurrency/threads-and-races'],
        },
      ],
      project: {
        slug: 'cache-simulator-and-memory-mountain',
        title: 'Project: cache simulator and memory mountain',
        description: `Extend your Cache Lab simulator into a configurable multi-level cache model (L1 + L2, write-back, LRU) that replays traces captured with valgrind's lackey tool from real programs, and reproduce the CS:APP "memory mountain" on your own machine: read throughput as a function of working-set size and stride. Compare the measured mountain with what your simulator predicts for your CPU's published cache geometry.`,
        deliverables: [
          'A two-level cache simulator with tests against hand-computed traces',
          'A memory-mountain measurement program and a plot (throughput vs size and stride)',
          'A report identifying your CPU\'s L1/L2/L3 sizes and line size from the measurements, compared with the datasheet values',
        ],
        estimatedHours: 10,
        stretchGoals: ['Add a hardware prefetcher model and show its effect on stride-1 vs stride-16 traces'],
      },
    },
    {
      slug: 'data-representation',
      title: 'Data Representation',
      description:
        'The bit-level truth about data in C: integers and bit manipulation, overflow and the rules of signed/unsigned arithmetic, IEEE 754 floating point, endianness and memory layout (CS:APP chapter 2 and the Data Lab).',
      lessons: [
        {
          slug: 'bits-bytes-and-bit-manipulation',
          title: 'Bits, bytes and bit manipulation',
          summary:
            'Bytes, hex, word sizes, bitwise and logical operators, shifts, and the bit tricks every systems programmer should know.',
          estimatedMinutes: 120,
          objectives: [
            'Convert fluently between binary, hex and decimal and explain word size and addressability',
            'Use &, |, ^, ~ and shifts to set, clear, test, toggle and extract bit fields',
            'Distinguish bitwise from logical operators and logical from arithmetic right shift',
            'Solve Data-Lab-style puzzles under operator restrictions',
          ],
          concepts: [
            'Byte-addressable memory and word size',
            'Hexadecimal as shorthand for 4-bit groups',
            'Bitwise AND, OR, XOR, NOT',
            'Logical vs arithmetic shift',
            'Masks and bit fields',
            'XOR tricks (swap, parity, toggling)',
            'Population count and finding the lowest set bit',
            'Undefined shifts (by negative or >= width)',
          ],
          explanation: `Memory is an array of **bytes**, each 8 bits, each with an address. Larger values occupy several consecutive bytes: a 32-bit \`int\` is four bytes, a pointer on a 64-bit machine is eight. **Hexadecimal** is just a compact way to write bit patterns: each hex digit is four bits, so \`0xFF\` is eight ones and \`0x80000000\` is a 32-bit word with only the top bit set. Learn to see the bits through the hex.

C's **bitwise operators** work on each bit position independently: \`&\` (AND), \`|\` (OR), \`^\` (XOR), \`~\` (NOT). They are different from the **logical** operators \`&&\`, \`||\`, \`!\`, which treat any non-zero value as true and return 0 or 1; \`0x40 & 0x08\` is 0 while \`0x40 && 0x08\` is 1. Confusing them is a classic bug that compiles silently.

**Shifts** multiply or divide by powers of two. \`x << k\` is $x \\cdot 2^k$ with the top bits lost. \`x >> k\` on an unsigned value shifts zeros in (**logical** shift); on a signed value almost every compiler shifts copies of the sign bit in (**arithmetic** shift), so $-8 \\gg 1 = -4$. The C standard leaves signed right shift implementation-defined and makes shifting by a negative amount or by the full width undefined; in practice x86 masks the shift count to 5 or 6 bits, giving nonsense rather than zero.

The idioms are worth memorising. Set bit $k$: \`x | (1u << k)\`. Clear it: \`x & ~(1u << k)\`. Test it: \`(x >> k) & 1\`. Extract a field of width $w$ at position $p$: \`(x >> p) & ((1u << w) - 1)\`. Lowest set bit: \`x & -x\`. Clear lowest set bit: \`x & (x - 1)\`, which is the basis of a fast population count. Swap without a temporary: three XORs.

The CS:APP **Data Lab** asks you to implement functions like \`bitXor\`, \`isTmax\` and \`logicalNeg\` using a restricted set of operators and no conditionals. It is tedious and brilliant; do at least the integer half. The 15-213 slides on bits and bytes are the lecture companion.`,
          resources: [
            {
              title: 'CMU 15-213 — Bits, Bytes and Integers (lecture slides)',
              url: 'https://www.cs.cmu.edu/~213/',
              type: 'lecture',
              cost: 'free',
              provider: 'Carnegie Mellon University',
              primary: true,
            },
            {
              title: 'CS:APP Labs — Data Lab',
              url: 'http://csapp.cs.cmu.edu/3e/labs.html',
              type: 'problem-set',
              cost: 'free',
              provider: 'Carnegie Mellon University',
              note: 'Bit puzzles with a checker (btest) and an operator-count tool (dlc).',
            },
            {
              title: 'Modern C (Jens Gustedt) — free PDF',
              url: 'https://gustedt.gitlabpages.inria.fr/modern-c/',
              type: 'textbook',
              cost: 'free',
              provider: 'Jens Gustedt',
              note: 'Section on bit operations and the exact C rules for shifts and integer promotion.',
            },
          ],
          exercises: [
            {
              slug: 'bit-idioms-library',
              title: 'A tested bit-idiom library',
              prompt:
                'Write C functions set_bit, clear_bit, test_bit, extract_field, insert_field, lowest_set_bit, popcount (via x & (x-1)) and is_power_of_two, each on uint32_t. Write a test program that checks them against straightforward loop implementations for 100,000 random inputs and all edge cases (0, 1, 0x80000000, 0xFFFFFFFF).',
              kind: 'coding',
              difficulty: 1,
            },
            {
              slug: 'data-lab-integers',
              title: 'Data Lab: integer puzzles',
              prompt:
                'Complete the integer puzzles of the CS:APP Data Lab (bitXor, tmin, isTmax, allOddBits, negate, isAsciiDigit, conditional, isLessOrEqual, logicalNeg, howManyBits) within the operator limits, passing btest and dlc. For each puzzle write one sentence explaining the trick.',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'shift-experiments',
              title: 'Shift semantics on your machine',
              prompt:
                'Write a C program that prints -8 >> 1, (unsigned)-8 >> 1, 1 << 31, 1u << 31, and (carefully, with the compiler\'s warnings on) 1 << 32 and 1 << -1. Explain each output, identify which are undefined behaviour, and show what gcc -O2 does differently from -O0 for the undefined ones.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What is the difference between x & y and x && y?',
              answerOutline:
                'Bitwise AND operates on every bit and returns a number; logical AND returns 0 or 1 depending on whether both operands are non-zero, and short-circuits.',
            },
            {
              question: 'What does x & (x - 1) do, and why?',
              answerOutline:
                'Clears the lowest set bit: subtracting 1 flips that bit and all lower bits, so ANDing clears exactly it.',
            },
            {
              question: 'Why is -8 >> 1 equal to -4 on most machines but not guaranteed by the C standard?',
              answerOutline:
                'Arithmetic shift copies the sign bit, which is what x86/ARM compilers do; the standard says right shift of a negative value is implementation-defined.',
            },
          ],
          relatedLessons: ['systems-programming/c-fundamentals/types-operators-and-control-flow'],
        },
        {
          slug: 'integer-arithmetic-and-overflow',
          title: 'Integer arithmetic, conversions and overflow in C',
          summary:
            'Signed/unsigned conversion rules, implicit promotions, multiplication and division by constants, and the security consequences of overflow.',
          estimatedMinutes: 120,
          objectives: [
            'Apply the C conversion rules between signed and unsigned and predict comparison results',
            'Explain how unsigned arithmetic wraps and why signed overflow is undefined behaviour',
            'Show how compilers turn multiplication and division by constants into shifts and adds',
            'Recognise integer-overflow vulnerabilities and write overflow-safe checks',
          ],
          concepts: [
            'Casting between signed and unsigned: bits unchanged, interpretation changed',
            'Usual arithmetic conversions: signed promoted to unsigned',
            'Integer promotion to int',
            'Truncation when narrowing',
            'Sign extension when widening',
            'Unsigned wraparound vs signed UB',
            'Multiply/divide by powers of two; rounding toward zero',
            'Overflow checks and size_t pitfalls',
          ],
          explanation: `C integer arithmetic is a minefield because the language mixes signed and unsigned types with rules that are precise but unintuitive. The first rule: **casting between signed and unsigned does not change the bits**, only their interpretation. \`(unsigned)-1\` is \`0xFFFFFFFF\` = 4294967295, and \`(int)4294967295u\` is $-1$.

The second rule, the **usual arithmetic conversions**: when a signed and an unsigned operand of the same size meet, the signed one is converted to unsigned. So \`-1 < 0u\` is **false** (since $-1$ becomes $2^{32}-1$), and \`if (len - 1 > 0)\` loops forever when \`len\` is an unsigned 0. Also, operands narrower than \`int\` are first **promoted** to \`int\`, so \`unsigned char\` arithmetic happens in signed \`int\`; this is why \`~c\` on a byte gives a surprising negative number.

When **widening**, signed values are sign-extended (the sign bit is replicated) and unsigned values zero-extended; the result preserves the value. When **narrowing**, the high bits are simply dropped: \`(short)0x12345\` is \`0x2345\`. **Unsigned overflow wraps** modulo $2^w$ by definition; **signed overflow is undefined behaviour**, and compilers exploit this: given \`x + 1 > x\`, gcc at -O2 assumes it is always true and deletes the check. Never test for signed overflow after the fact; test before (\`if (x > INT_MAX - y)\`) or use \`__builtin_add_overflow\`.

Compilers optimise multiplication by constants into shifts and adds ($x \\cdot 14 = (x \\ll 4) - (x \\ll 1)$) and division by powers of two into shifts, but signed division must round **toward zero**, so \`x / 4\` for negative \`x\` becomes \`(x + 3) >> 2\`; look for this pattern in the assembly.

The consequences are real: many security holes are an \`int\` size overflowing before a \`malloc\`, or a signed length compared with a \`size_t\`. Read CS:APP 2.2-2.3 (via the 15-213 slides), do the exercises, and the next time you write a loop over a \`size_t\` counting down, you will stop before you hit the bug.`,
          resources: [
            {
              title: 'CMU 15-213 — Bits, Bytes and Integers, part 2 (lecture slides)',
              url: 'https://www.cs.cmu.edu/~213/',
              type: 'lecture',
              cost: 'free',
              provider: 'Carnegie Mellon University',
              primary: true,
            },
            {
              title: 'Modern C (Jens Gustedt) — chapter on integer types and arithmetic',
              url: 'https://gustedt.gitlabpages.inria.fr/modern-c/',
              type: 'textbook',
              cost: 'free',
              provider: 'Jens Gustedt',
            },
            {
              title: 'Compiler Explorer',
              url: 'https://godbolt.org/',
              type: 'interactive',
              cost: 'free',
              provider: 'Matt Godbolt',
              note: 'Watch what the compiler does with multiplication by constants and with signed-overflow checks.',
            },
            {
              title: 'C11 standard draft N1570',
              url: 'https://www.open-std.org/jtc1/sc22/wg14/www/docs/n1570.pdf',
              type: 'documentation',
              cost: 'free',
              provider: 'ISO/IEC JTC1/SC22/WG14',
              note: 'Section 6.3.1 (conversions) and 6.5 (expressions); the actual rules.',
            },
          ],
          exercises: [
            {
              slug: 'conversion-predictions',
              title: 'Predict, then run',
              prompt:
                'Predict the result (true/false or value) of: -1 < 0u; (int)0x80000000 < 0; (unsigned char)200 + (unsigned char)100; (short)-32768 == -(short)-32768; -7 / 2 and -7 % 2; (size_t)0 - 1; 2147483647 + 1 (at -O0 and -O2). Then write the C program, run it with -Wall -Wextra -fsanitize=undefined, and explain every mismatch with your prediction.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'overflow-safe-allocation',
              title: 'Find and fix an overflow bug',
              prompt:
                'Given a function that allocates n * sizeof(struct record) bytes with int n from user input, construct an input that makes the multiplication overflow so a too-small buffer is allocated, and demonstrate memory corruption under AddressSanitizer. Then fix it with an overflow check (or __builtin_mul_overflow) and with calloc, and explain which is better.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'multiply-by-constant-asm',
              title: 'Read the compiler\'s arithmetic',
              prompt:
                'In Compiler Explorer compile int f(int x){return x*14;}, int g(int x){return x/8;}, unsigned h(unsigned x){return x/8;} and int k(int x){return x%16;} at -O2 for x86-64. For each, explain the instruction sequence and why signed division needs the extra bias instructions.',
              kind: 'data-analysis',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why is -1 < 0u false in C?',
              answerOutline:
                'The usual arithmetic conversions convert the signed -1 to unsigned (0xFFFFFFFF), which is the largest unsigned value, so it is not less than 0.',
            },
            {
              question: 'What may a compiler do with the test if (x + 1 < x) for signed int x?',
              answerOutline:
                'Because signed overflow is undefined, it may assume the condition is always false and remove the check entirely.',
            },
            {
              question: 'How do you widen a signed 16-bit value to 32 bits while preserving its value?',
              answerOutline:
                'Sign-extend: replicate the sign bit into the new high bits (the compiler does this automatically for signed conversions).',
            },
          ],
        },
        {
          slug: 'floating-point-ieee-754',
          title: 'Floating point: IEEE 754',
          summary:
            'Sign, exponent and fraction; normalised, denormalised and special values; rounding; and why 0.1 + 0.2 is not 0.3.',
          estimatedMinutes: 150,
          objectives: [
            'Decode a 32-bit or 64-bit float into sign, exponent and fraction and compute its value',
            'Explain normalised vs denormalised numbers, infinities and NaN, and why the encoding orders like integers',
            'Apply round-to-nearest-even and predict when a + b = a',
            'Identify numerically dangerous operations (cancellation, accumulation) and mitigate them',
          ],
          concepts: [
            'Sign, biased exponent, fraction (significand)',
            'Value = (-1)^s x 1.f x 2^(e-bias)',
            'Normalised and denormalised (subnormal) numbers',
            'Infinity and NaN; quiet vs signalling',
            'Machine epsilon and ULP',
            'Rounding modes; round-to-nearest-even',
            'Catastrophic cancellation',
            'Float to int conversion and casts',
          ],
          explanation: `A floating-point number is scientific notation in binary. IEEE 754 single precision packs 32 bits as **1 sign bit**, **8 exponent bits** and **23 fraction bits**; double precision uses 1, 11 and 52. For a **normalised** number the value is

$$v = (-1)^s \\times 1.f \\times 2^{E - \\text{bias}}$$

with bias 127 (single) or 1023 (double). The leading 1 is implicit, buying one free bit of precision. So \`0x3F800000\` has $s=0$, $E=127$, $f=0$: the value $1.0$. And $0.1$ has no finite binary expansion, so it is stored as the nearest representable value, roughly $0.100000001490116$ in single precision; that is why $0.1 + 0.2 \\neq 0.3$.

The exponent field's extremes are special. $E = 0$ denotes **denormalised** numbers: value $0.f \\times 2^{1 - \\text{bias}}$, filling the gap between zero and the smallest normalised number uniformly (gradual underflow); $E = 0$, $f = 0$ is zero (and there is a negative zero). $E$ all ones with $f = 0$ is $\\pm\\infty$; with $f \\neq 0$ it is **NaN**, which compares unequal even to itself. A lovely consequence of the layout: for positive floats, the bit patterns sort in the same order as the values, so hardware can compare floats as integers.

Precision is relative: adjacent doubles differ by one **ULP**, about $2^{-52} \\approx 2.2 \\times 10^{-16}$ relative. Every operation computes the exact result and then **rounds**, by default to nearest with ties to even. If $b$ is less than half an ULP of $a$, then $a + b = a$: summing a million small values into a large accumulator loses them. Subtracting nearly equal numbers (**catastrophic cancellation**) throws away leading digits and leaves rounding noise; the quadratic formula and finite differences are the classic victims. Floating-point addition is not associative, so compilers cannot reorder it without \`-ffast-math\`, which trades correctness for speed.

Casting a float to int truncates toward zero and is undefined if out of range. Work the 15-213 floating-point lecture, play with float.exposed until you can predict the bits, and do the float half of the Data Lab (\`floatScale2\`, \`floatFloat2Int\`, \`floatPower2\`).`,
          resources: [
            {
              title: 'CMU 15-213 — Floating Point (lecture slides)',
              url: 'https://www.cs.cmu.edu/~213/',
              type: 'lecture',
              cost: 'free',
              provider: 'Carnegie Mellon University',
              primary: true,
            },
            {
              title: 'Float Exposed — interactive IEEE 754 explorer',
              url: 'https://float.exposed/',
              type: 'interactive',
              cost: 'free',
              provider: 'Bartosz Ciechanowski',
              note: 'Toggle bits and watch the value, exponent and neighbouring representable numbers change.',
            },
            {
              title: 'IEEE-754 Floating Point Converter',
              url: 'https://www.h-schmidt.net/FloatConverter/IEEE754.html',
              type: 'interactive',
              cost: 'free',
              provider: 'Harald Schmidt',
            },
            {
              title: 'CS:APP Labs — Data Lab (floating-point puzzles)',
              url: 'http://csapp.cs.cmu.edu/3e/labs.html',
              type: 'problem-set',
              cost: 'free',
              provider: 'Carnegie Mellon University',
            },
          ],
          exercises: [
            {
              slug: 'decode-floats-by-hand',
              title: 'Decode and encode floats by hand',
              prompt:
                'Decode 0x40490FDB, 0xC0000000, 0x00000001, 0x7F800000 and 0x7FC00000 as single-precision floats. Encode 6.5, -0.15625, 2^-130 and 1e10 (nearest representable) to hex. Check with float.exposed. For 1e10, compute the rounding error in ULPs.',
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'float-properties-program',
              title: 'Demonstrate floating-point surprises',
              prompt:
                'Write a C program that (a) prints 0.1+0.2 == 0.3; (b) finds machine epsilon for float and double by halving until 1+eps == 1; (c) sums 1e-8 one hundred million times in float and in double, comparing with the exact 1.0, then repeats with Kahan summation; (d) shows that (a+b)+c != a+(b+c) for a=1e16, b=-1e16, c=1. Explain each result.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'data-lab-floats',
              title: 'Data Lab: floating-point puzzles',
              prompt:
                'Implement floatScale2 (multiply by 2 by bit manipulation, handling denormals, infinity and NaN), floatFloat2Int (with correct truncation and the out-of-range sentinel 0x80000000) and floatPower2. Pass btest. Document which cases needed special handling.',
              kind: 'coding',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does the exponent use a bias rather than two\'s complement?',
              answerOutline:
                'With a biased unsigned exponent, the bit pattern of positive floats increases monotonically with value, so comparisons and sorting can use integer logic.',
            },
            {
              question: 'What are denormalised numbers for?',
              answerOutline:
                'They fill the gap between 0 and the smallest normalised number with evenly spaced values (gradual underflow), so x - y == 0 implies x == y.',
            },
            {
              question: 'Why is floating-point addition not associative, and what practical consequence follows?',
              answerOutline:
                'Each operation rounds, so the order changes which rounding errors occur (e.g. 1e16 + (-1e16) + 1 vs 1e16 + (-1e16 + 1)). Compilers may not reorder float ops, and parallel reductions give slightly different answers.',
            },
          ],
        },
        {
          slug: 'endianness-and-memory-layout',
          title: 'Endianness, alignment and data in memory',
          summary:
            'Byte order, how structs and arrays are laid out, alignment and padding, and reading raw bytes with C and a hex dump.',
          estimatedMinutes: 120,
          objectives: [
            'Explain little- and big-endian byte order and determine a machine\'s endianness with a program',
            'Predict the memory layout, size and alignment of C structs and arrays',
            'Explain why alignment matters for hardware and how padding is inserted',
            'Serialise data portably across machines of different endianness and word size',
          ],
          concepts: [
            'Byte order: little-endian vs big-endian',
            'Network byte order and htonl/ntohl',
            'Array layout and row-major order',
            'Struct layout, padding and alignment rules',
            'sizeof and offsetof',
            'Unaligned access: slow or fatal',
            'Type punning via unsigned char*',
            'Serialisation and portability',
          ],
          explanation: `A multi-byte value lives in consecutive bytes, but in which order? **Little-endian** machines (x86, most ARM configurations, RISC-V) put the least significant byte at the lowest address: the 32-bit value \`0x01234567\` at address 100 is stored as bytes \`67 45 23 01\` at addresses 100-103. **Big-endian** (network protocols, some older architectures) stores \`01 23 45 67\`. Neither is better, but mixing them silently is a classic portability bug. Network protocols fix **network byte order** as big-endian, and \`htonl\`/\`ntohl\` convert. The only safe way to inspect bytes is through a pointer of type \`unsigned char *\`: write a \`show_bytes\` function and use it on ints, floats and pointers as CS:APP does.

**Arrays** are contiguous, and a 2-D array in C is **row-major**: \`a[i][j]\` lives at \`base + (i * cols + j) * sizeof(elem)\`, which is why iterating \`j\` in the inner loop is cache-friendly (see the memory-hierarchy lesson). **Structs** are laid out in declaration order, but with **padding**: each field is placed at an address that is a multiple of its **alignment** (usually its size for primitive types), and the whole struct is padded to a multiple of its largest alignment so arrays of structs stay aligned. So \`struct { char c; int i; char d; }\` occupies 12 bytes, while reordering to \`{ int i; char c; char d; }\` occupies 8. \`sizeof\` and \`offsetof\` reveal the layout.

Alignment is a hardware concern. Some CPUs fault on unaligned loads; x86 allows them but they are slower and non-atomic across a cache-line boundary, which matters for lock-free code. Compilers may also assume alignment when vectorising.

Finally, **serialisation**: never write a struct to a file or socket with a single \`fwrite\` and expect another machine to read it; byte order, padding, word size and float format all vary. Define the byte format explicitly and pack each field, or use a library. Read CS:APP 2.1 (via the 15-213 slides) and chapter 3's section on structures, then do the exercises with a hex dump tool open.`,
          resources: [
            {
              title: 'CMU 15-213 — Bits, Bytes and Integers (byte ordering) and Machine-Level Programming IV (structs, alignment)',
              url: 'https://www.cs.cmu.edu/~213/',
              type: 'lecture',
              cost: 'free',
              provider: 'Carnegie Mellon University',
              primary: true,
            },
            {
              title: 'Modern C (Jens Gustedt) — objects, representations and alignment',
              url: 'https://gustedt.gitlabpages.inria.fr/modern-c/',
              type: 'textbook',
              cost: 'free',
              provider: 'Jens Gustedt',
            },
            {
              title: 'man 3 htonl — byte-order conversion',
              url: 'https://man7.org/linux/man-pages/man3/byteorder.3.html',
              type: 'documentation',
              cost: 'free',
              provider: 'man7.org',
            },
          ],
          exercises: [
            {
              slug: 'show-bytes',
              title: 'show_bytes and endianness detection',
              prompt:
                'Write show_bytes(const void *p, size_t n) printing hex bytes in address order. Use it on int 0x01234567, float 1.0f, double 1.0, the int -1, and a pointer. Determine your machine\'s endianness from the output and confirm with a second method (a union of int and char[4]). Explain what the float bytes mean using the previous lesson.',
              kind: 'coding',
              difficulty: 1,
            },
            {
              slug: 'struct-layout-puzzle',
              title: 'Predict struct sizes and offsets',
              prompt:
                'For five structs of your own design mixing char, short, int, double and pointers, predict sizeof and each field\'s offsetof on x86-64 before compiling, then verify. Reorder fields in each to minimise size and report the savings. Then compile one with __attribute__((packed)) and measure the cost of unaligned access in a loop over an array of 10 million of them.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'portable-serialisation',
              title: 'Portable serialisation of a record',
              prompt:
                'Define a record {uint32_t id; int16_t temp_centi; float lat, lon; char name[16];}. Write encode() that packs it into a fixed 30-byte big-endian buffer byte by byte and decode() that reverses it. Round-trip 1000 random records, dump one buffer with xxd, and verify the byte layout by hand. Explain why fwrite(&rec) would not be portable.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'How is 0x0A0B0C0D stored at address 0x100 on a little-endian machine?',
              answerOutline:
                '0x100: 0D, 0x101: 0C, 0x102: 0B, 0x103: 0A (least significant byte first).',
            },
            {
              question: 'Why is sizeof(struct {char c; int i;}) 8 and not 5?',
              answerOutline:
                'int must be 4-byte aligned, so 3 padding bytes follow c; the struct size is rounded to a multiple of its largest alignment (4).',
            },
            {
              question: 'Give two reasons writing a struct directly to a network socket is unsafe.',
              answerOutline:
                'Byte order differs between machines; padding, type sizes and float formats are compiler/platform dependent.',
            },
          ],
          relatedLessons: ['systems-programming/pointers-and-memory/memory-layout-of-a-process'],
        },
      ],
    },
  ],
  capstone: {
    slug: 'full-hack-computer',
    title: 'Capstone: the complete Hack computer running your own program',
    description: `Bring every module together. Deliver the complete Hack platform built from NAND in HDL (Projects 1-3 and 5), your own assembler (Project 6) with a test suite, and an original program of your design that you wrote in Hack assembly, assembled with your assembler, and ran on your Computer chip in the hardware simulator. The program must use loops, pointers, the screen and the keyboard.

Then evaluate the machine as an architect would. Compute the NAND count and critical-path depth of your CPU and derive an estimated maximum clock frequency under stated gate delays. Measure the instruction count of your program and compute its cycles per frame. Write a report that proposes two architectural improvements (for example a hardware multiplier, a larger register file, a two-stage pipeline, or a tiny instruction cache) with estimated cost and benefit, using the performance and memory-hierarchy ideas from module 6 and the data-representation rules from module 7 to justify every number.`,
    deliverables: [
      'All HDL chips for Projects 1, 2, 3 and 5 passing the official tests',
      'An assembler (Project 6) with symbol support and a test suite that compares against the official assembler on at least six programs',
      'An original Hack assembly program of at least 150 instructions, assembled with your assembler, running on your Computer chip',
      'A 4-8 page architecture report: gate counts, critical path, frequency estimate, instruction counts, and two proposed improvements with cost/benefit',
    ],
    estimatedHours: 25,
    stretchGoals: [
      'Implement a hardware multiply instruction (new comp code) in the ALU and CPU, extend the assembler, and show the speedup on Mult',
      'Build a 2-stage pipelined Hack CPU (fetch/execute) in HDL and demonstrate the branch hazard with a test',
      'Port your Hack CPU to a real FPGA using Verilog and run it on a development board',
    ],
  },
  masteryChecklist: [
    'I can build any Boolean function from NAND gates and reason about gate count and depth',
    'I can explain two\'s complement arithmetic, detect overflow, and implement an adder and an ALU in HDL',
    'I can build registers, RAM and a program counter and reason cycle by cycle about sequential circuits',
    'I can decode and write Hack machine language and explain how a CPU datapath executes it',
    'I have built a complete working computer in HDL and an assembler for it, both passing official tests',
    'I can apply the iron law of performance and Amdahl\'s law to predict the effect of a change',
    'I can explain pipelining, hazards and branch prediction, and identify a pipeline stall in a code sequence',
    'I can predict cache hits and misses for a loop, compute AMAT, and restructure code to improve locality',
    'I can explain the bit-level representation of integers and IEEE 754 floats and predict overflow and rounding behaviour in C',
  ],
});
