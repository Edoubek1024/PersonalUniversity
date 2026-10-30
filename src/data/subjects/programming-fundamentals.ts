import { defineSubject } from '../define';

export default defineSubject({
  id: 'programming-fundamentals',
  title: 'Programming Fundamentals with Python',
  category: 'cs',
  tagline:
    'Learn to think in programs: variables, control flow, data structures, objects, files, tests and tools, all in Python, with a glimpse of C and JavaScript at the end.',
  description: `Programming is the skill every other subject in this curriculum assumes. Before you can simulate an orbit, analyse a light curve or write a kernel, you need to turn a vague idea into precise instructions, run them, watch them fail, and fix them. This subject teaches exactly that discipline, using Python because its syntax gets out of the way and because it is the working language of science and of most introductory courses.

The approach is *write code every day*. Each lesson pairs a short, careful explanation with one or two free primary resources (Think Python, the official Python tutorial, Composing Programs, MIT 6.100L) and a set of concrete exercises with stated inputs, expected outputs and things to measure. You will learn to read error messages, to trace a program by hand, to decompose a problem into functions, to test with pytest, to debug with a debugger instead of print statements, and to keep your work in git.

By the end you will have written several hundred lines of tested, documented Python, built a command-line application from scratch, and seen enough C or JavaScript to understand that the ideas transfer. You should then be ready for Data Structures and Algorithms, Computer Architecture and the computational physics and astronomy tracks.`,
  difficulty: 'beginner',
  estimatedHours: 80,
  prerequisites: [],
  recommendedBackground: [
    'Comfort using a computer: installing software, finding files, using a text editor',
    'Secondary-school algebra (variables, functions, basic equations)',
    'Willingness to read error messages carefully instead of guessing',
  ],
  tags: ['python', 'programming', 'testing', 'git', 'beginner', 'foundations'],
  core: true,
  modules: [
    {
      slug: 'getting-started',
      title: 'Getting Started: Your First Programs',
      description:
        'Install Python, meet the REPL, and learn the vocabulary of values, types, variables, expressions and errors that everything else is built on.',
      lessons: [
        {
          slug: 'setup-and-the-repl',
          title: 'Setting up Python and using the REPL',
          summary:
            'Install Python 3, learn the difference between the interactive interpreter and running a script file, and make your first mistakes on purpose.',
          estimatedMinutes: 90,
          objectives: [
            'Install a current Python 3 and run it from a terminal on your operating system',
            'Use the REPL to evaluate expressions and the script mode to run a saved .py file',
            'Explain what an interpreter does with the text you type',
            'Read a traceback and locate the line that caused it',
          ],
          concepts: [
            'Interpreter vs compiler (high level)',
            'The REPL: read, evaluate, print, loop',
            'Script mode: python file.py',
            'Statements vs expressions',
            'print() and the difference between a value and its printed form',
            'Syntax error vs runtime error',
            'Traceback: reading from the bottom up',
            'Text editor / IDE basics',
          ],
          explanation: `Python is an **interpreter**: a program that reads your source text, one statement at a time, and carries it out immediately. There is no separate build step, which is why Python is ideal for learning. You will use it in two modes. The **REPL** (type \`python3\` or \`python\` in a terminal) reads a line, evaluates it, prints the result and loops; it is your calculator and your laboratory. **Script mode** (\`python3 hello.py\`) runs a file from top to bottom and only prints what you ask it to with \`print()\`. A beginner's classic confusion: in the REPL, typing \`2 + 3\` shows \`5\`, but in a script the same line computes 5 and silently discards it.

A program is a sequence of **statements**; many statements contain **expressions**, which are pieces of code that evaluate to a value. \`x = 2 + 3\` is an assignment statement containing the expression \`2 + 3\`. Keeping these two words straight will make every later explanation clearer.

You will make errors constantly, and that is fine; what matters is reading them. A **SyntaxError** means Python could not even parse the text (a missing colon or bracket); it is reported before anything runs. A runtime error such as **NameError** or **TypeError** happens while running. The error message is a **traceback**: read it from the bottom (the error type and message) upward (the line that failed, then the lines that called it). Make a habit of reading the whole thing before touching the code.

Work through chapter 1 of *Think Python* and the first two sections of the official tutorial, typing every example into the REPL yourself rather than copying. Set up an editor (VS Code, or whichever you like) that can run a file with one keystroke; the exercises below assume you can save and run a file in under ten seconds.`,
          resources: [
            {
              title: 'Think Python, 3rd edition — Chapter 1: Programming as a way of thinking',
              url: 'https://allendowney.github.io/ThinkPython/chap01.html',
              type: 'textbook',
              cost: 'free',
              provider: 'Allen Downey',
              note: 'Free online edition; the whole book is used across this subject.',
              primary: true,
            },
            {
              title: 'The Python Tutorial — Using the Python Interpreter',
              url: 'https://docs.python.org/3/tutorial/interpreter.html',
              type: 'documentation',
              cost: 'free',
              provider: 'Python Software Foundation',
              note: 'Sections 2 and 3 (interpreter, informal introduction).',
            },
            {
              title: 'Python downloads and installation',
              url: 'https://www.python.org/downloads/',
              type: 'tool',
              cost: 'free',
              provider: 'python.org',
            },
            {
              title: 'MIT 6.100L Introduction to CS and Programming using Python (Fall 2022)',
              url: 'https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/',
              type: 'course',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
              note: 'Lecture 1 (Introduction) for this lesson; the course runs alongside modules 1-5.',
            },
          ],
          exercises: [
            {
              slug: 'repl-calculator',
              title: 'Use the REPL as a calculator',
              prompt:
                'In the REPL evaluate: 7 / 2, 7 // 2, 7 % 2, 2 ** 10, 10 ** 100, 0.1 + 0.2, and "ab" * 3. Write down each result before pressing Enter, then compare. For 0.1 + 0.2, write one sentence about why the answer is not exactly 0.3 (you will learn the full reason later).',
              kind: 'coding',
              difficulty: 1,
            },
            {
              slug: 'first-script',
              title: 'Write and run a script',
              prompt:
                'Create hello.py containing a print of your name, then a line that computes the number of seconds in a 365-day year and prints "Seconds in a year: 31536000". Run it from the terminal. Then delete the closing parenthesis of one print call, run again, and copy the exact SyntaxError message into a notes file with a one-line explanation.',
              kind: 'coding',
              difficulty: 1,
            },
            {
              slug: 'traceback-reading',
              title: 'Read three tracebacks',
              prompt:
                'Write three tiny scripts that fail with, respectively, NameError (use an undefined variable), TypeError (add a string to an integer) and ZeroDivisionError. For each, identify from the traceback alone: the file, the line number, the error type and the message. Then fix each one.',
              kind: 'coding',
              difficulty: 1,
              hint: 'The last line of the traceback names the error; the arrow or line above shows where it happened.',
            },
          ],
          selfAssessment: [
            {
              question: 'Why does typing 2 + 3 show 5 in the REPL but print nothing in a script?',
              answerOutline:
                'The REPL echoes the value of every expression; a script only shows output when print() is called. The expression is evaluated in both cases.',
            },
            {
              question: 'What is the difference between a SyntaxError and a NameError?',
              answerOutline:
                'SyntaxError: the text cannot be parsed, so nothing runs. NameError: parsing succeeded but at run time a name was used that has no value bound to it.',
            },
            {
              question: 'Which direction should you read a traceback and why?',
              answerOutline:
                'Bottom up: the last line gives the error type and message, the frame above it the failing line, and higher frames the calls that led there.',
            },
          ],
        },
        {
          slug: 'values-types-and-variables',
          title: 'Values, types and variables',
          summary:
            'Integers, floats, strings and booleans; what a variable really is in Python; and why names are labels, not boxes.',
          estimatedMinutes: 90,
          objectives: [
            'Identify the type of any literal using type() and explain what int, float, str and bool represent',
            'Explain assignment as binding a name to an object and predict the result of rebinding',
            'Choose valid, descriptive variable names and avoid shadowing built-ins',
            'Convert between types with int(), float(), str() and predict when conversion fails',
          ],
          concepts: [
            'Value, object, type',
            'int (arbitrary precision), float (IEEE 754 double), str, bool, None',
            'Assignment binds a name to an object',
            'Rebinding vs mutation (preview)',
            'Dynamic typing: the name has no type, the object does',
            'Type conversion and ValueError',
            'Keywords and naming conventions (snake_case)',
            'Floating-point representation error',
          ],
          explanation: `Every piece of data in Python is an **object** with a **type**. The four you meet first are \`int\` (whole numbers of unlimited size: \`2 ** 1000\` just works), \`float\` (decimal numbers stored as 64-bit IEEE 754 doubles, which is why \`0.1 + 0.2 == 0.30000000000000004\`), \`str\` (text) and \`bool\` (\`True\`/\`False\`). \`None\` is a special object meaning "no value". Ask Python with \`type(x)\`.

The most important mental model in this whole subject is what a **variable** is. In Python a variable is not a box that contains a value; it is a **name bound to an object**. \`x = 5\` makes the name \`x\` refer to the integer object 5. \`x = x + 1\` computes a new object 6 and rebinds \`x\` to it; the 5 is untouched. Two names can refer to the same object (\`y = x\`), and later, with lists, you will see that this matters enormously: changing the object through one name is visible through the other. Ned Batchelder's article on names and values is the clearest explanation ever written of this; read it now and again after the collections module.

Python is **dynamically typed**: names carry no type, objects do. So \`x = 5\` then \`x = "five"\` is legal. This flexibility is convenient but it means type errors surface at run time, which is why you must read tracebacks and, later, write tests.

Conversion functions \`int("42")\`, \`float("3.5")\` and \`str(7)\` create new objects; \`int("4.2")\` raises **ValueError** because the text is not an integer literal. Use \`snake_case\` names that say what the value means (\`seconds_per_day\`, not \`s\`), and never name a variable \`list\`, \`str\` or \`sum\`: you would shadow the built-in and get a confusing TypeError later.`,
          resources: [
            {
              title: 'Think Python — Chapter 2: Variables and statements',
              url: 'https://allendowney.github.io/ThinkPython/chap02.html',
              type: 'textbook',
              cost: 'free',
              provider: 'Allen Downey',
              primary: true,
            },
            {
              title: 'Facts and myths about Python names and values',
              url: 'https://nedbatchelder.com/text/names.html',
              type: 'article',
              cost: 'free',
              provider: 'Ned Batchelder',
              note: 'The definitive explanation of names vs values; re-read after the lists lesson.',
            },
            {
              title: 'Python Tutor: visualise code execution',
              url: 'https://pythontutor.com/',
              type: 'interactive',
              cost: 'free',
              provider: 'Philip Guo',
              note: 'Paste any small program and step through it watching names and objects.',
            },
            {
              title: 'Floating-Point Arithmetic: Issues and Limitations (Python docs)',
              url: 'https://docs.python.org/3/tutorial/floatingpoint.html',
              type: 'documentation',
              cost: 'free',
              provider: 'Python Software Foundation',
            },
          ],
          exercises: [
            {
              slug: 'type-table',
              title: 'Build a type table',
              prompt:
                'For each literal 42, 4.2, "42", True, None, 1e3, 7 // 2, 7 / 2, "7" + "2", "7" * 2, write your predicted type, then check with type(). Add the three expressions whose results surprised you most and explain them in one sentence each.',
              kind: 'coding',
              difficulty: 1,
            },
            {
              slug: 'names-not-boxes',
              title: 'Names are not boxes',
              prompt:
                'Predict the output, then run: a = 10; b = a; a = a + 5; print(a, b). Then: a = [1, 2]; b = a; a.append(3); print(a, b). Paste both into Python Tutor and draw the name/object diagram at each step. Explain in two sentences why the two programs behave differently.',
              kind: 'coding',
              difficulty: 2,
              hint: 'In the first case a is rebound to a new object; in the second the shared list object is mutated.',
            },
            {
              slug: 'temperature-converter',
              title: 'Temperature converter script',
              prompt:
                'Write a script that stores a Celsius temperature in a variable, computes Fahrenheit (F = C * 9/5 + 32) and Kelvin, and prints all three with two decimal places using an f-string. Test with 0, 100 and -40 (expected: -40 C = -40 F). Then read the input from the keyboard with input() and handle the case where the user types "abc" by catching ValueError and printing a friendly message.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'After x = 5; y = x; x = 7, what is y and why?',
              answerOutline:
                'y is 5. Assignment binds names to objects; rebinding x to a new object 7 does not affect y, which still refers to 5.',
            },
            {
              question: 'Why is 0.1 + 0.2 != 0.3 in Python?',
              answerOutline:
                'floats are binary fractions with 53 bits of precision; 0.1 and 0.2 are not exactly representable, and the rounding errors do not cancel. Compare with a tolerance (math.isclose).',
            },
            {
              question: 'What happens if you write list = [1, 2, 3] and later call list("abc")?',
              answerOutline:
                'The name list now refers to your list, shadowing the built-in; calling it raises TypeError: list object is not callable.',
            },
            {
              question: 'What does dynamic typing mean?',
              answerOutline:
                'Types belong to objects, not names; a name may be rebound to objects of different types, and type errors are detected at run time.',
            },
          ],
        },
        {
          slug: 'expressions-operators-and-strings',
          title: 'Expressions, operators and strings',
          summary:
            'Arithmetic and comparison operators, precedence, string indexing and slicing, f-strings and the most useful string methods.',
          estimatedMinutes: 100,
          objectives: [
            'Evaluate arithmetic and boolean expressions by hand using precedence rules',
            'Index and slice strings, including negative indices and step',
            'Format output with f-strings including width and precision specifiers',
            'Use common string methods (split, join, strip, upper, find, replace) and explain that strings are immutable',
          ],
          concepts: [
            'Operator precedence: ** before unary minus before * / // % before + -',
            'Integer vs true division, modulo with negatives',
            'Comparison and chained comparison (a < b < c)',
            'Boolean operators and, or, not; short-circuit evaluation',
            'Strings as immutable sequences of characters',
            'Indexing from 0, negative indexing, slicing [start:stop:step]',
            'f-strings and format specifiers',
            'String methods return new strings',
          ],
          explanation: `An **expression** combines values with **operators** and evaluates to a new value. Precedence follows mathematics with a few traps: \`**\` binds tighter than unary minus, so \`-2 ** 2\` is \`-4\`; \`//\` is floor division, so \`-7 // 2\` is \`-4\` (not \`-3\`); and \`%\` follows the sign of the divisor, so \`-7 % 2\` is \`1\`. When in doubt, add parentheses; readable beats clever.

Comparisons produce booleans and can be chained: \`0 <= x < 10\` means what a mathematician expects. \`and\` and \`or\` **short-circuit**: \`x != 0 and 10 / x > 1\` never divides by zero because the right side is skipped when the left is false. They also return one of their operands rather than a bare boolean (\`"" or "default"\` evaluates to \`"default"\`), a trick you will see in real code.

**Strings** are immutable sequences. \`s[0]\` is the first character, \`s[-1]\` the last, and a slice \`s[2:5]\` gives characters at indices 2, 3, 4 (the stop index is excluded, so \`len(s[a:b]) == b - a\`). \`s[::-1]\` reverses. Because strings are immutable, \`s.upper()\` returns a *new* string; writing \`s.upper()\` on its own line and expecting \`s\` to change is a top-ten beginner bug. The methods you will use constantly: \`split\`, \`join\`, \`strip\`, \`startswith\`, \`find\`, \`replace\`, \`isdigit\`.

**f-strings** (\`f"{name} is {age} years"\`) are the modern way to format. A format spec after a colon controls width and precision: \`f"{pi:.3f}"\` gives \`3.142\`, \`f"{n:>8}"\` right-aligns in 8 columns, \`f"{x:,}"\` adds thousands separators. Learn these now; every table you print for the rest of your life will use them.

Think Python chapters 2 and 8 and the tutorial's "Informal Introduction" section cover all of this; the exercises make you use slicing and formatting until they are automatic.`,
          resources: [
            {
              title: 'Think Python — Chapter 8: Strings',
              url: 'https://allendowney.github.io/ThinkPython/chap08.html',
              type: 'textbook',
              cost: 'free',
              provider: 'Allen Downey',
              primary: true,
            },
            {
              title: 'The Python Tutorial — An Informal Introduction to Python',
              url: 'https://docs.python.org/3/tutorial/introduction.html',
              type: 'documentation',
              cost: 'free',
              provider: 'Python Software Foundation',
              note: 'Numbers, text and the first look at lists.',
            },
            {
              title: 'Format Specification Mini-Language',
              url: 'https://docs.python.org/3/library/string.html#format-specification-mini-language',
              type: 'documentation',
              cost: 'free',
              provider: 'Python Software Foundation',
              note: 'Keep this open when formatting tables.',
            },
            {
              title: 'String methods (Python standard library reference)',
              url: 'https://docs.python.org/3/library/stdtypes.html#string-methods',
              type: 'documentation',
              cost: 'free',
              provider: 'Python Software Foundation',
            },
          ],
          exercises: [
            {
              slug: 'precedence-predictions',
              title: 'Predict then evaluate',
              prompt:
                'Without running, evaluate: -3 ** 2, (-3) ** 2, 17 % 5, -17 % 5, 17 // -5, 2 + 3 * 4 ** 2 / 8, 1 < 2 < 3, 3 > 2 > 1 == True, not True or True, "" or 0 or "x". Then run them. Score yourself and write one sentence for each miss explaining the rule you forgot.',
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'slicing-drills',
              title: 'Slicing drills',
              prompt:
                'Let s = "programming". Produce, using one slice each: "gram", "prog", "ming", "gnimmargorp", "porm" (every other letter from the start), and the middle character. Then write a function-free script that, given any string in a variable, prints whether it is a palindrome ignoring case and spaces (test "Never odd or even" -> True).',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'formatted-table',
              title: 'Print a formatted table',
              prompt:
                'Print a table of n, n squared, sqrt(n) and 1/n for n = 1..10 with columns right-aligned, square roots to 4 decimal places and reciprocals in scientific notation with 2 decimals. The columns must line up exactly; measure this by checking that every line has the same length with len().',
              kind: 'coding',
              difficulty: 2,
              hint: 'f"{n:>3} {n*n:>5} {n**0.5:>8.4f} {1/n:>10.2e}"',
            },
          ],
          selfAssessment: [
            {
              question: 'Why does -2 ** 2 evaluate to -4?',
              answerOutline: 'Exponentiation binds tighter than unary minus, so it is -(2 ** 2).',
            },
            {
              question: 'What does s[1:-1] return for s = "hello" and why?',
              answerOutline:
                '"ell": start at index 1, stop before the last character (index -1 is "o", excluded).',
            },
            {
              question: 'Why does s.strip() on its own line not change s?',
              answerOutline:
                'Strings are immutable; the method returns a new string that must be assigned (s = s.strip()).',
            },
            {
              question: 'What is short-circuit evaluation and why is it useful?',
              answerOutline:
                'and/or stop evaluating once the result is known; lets you guard an expression (x and 1/x) against errors.',
            },
          ],
        },
        {
          slug: 'errors-and-reading-documentation',
          title: 'Errors, debugging by reading, and the documentation',
          summary:
            'The three kinds of errors, a disciplined approach to fixing them, and how to find answers in the official documentation and help().',
          estimatedMinutes: 75,
          objectives: [
            'Distinguish syntax, runtime and semantic (logic) errors and give an example of each',
            'Apply a repeatable debugging loop: reproduce, read, hypothesise, test, fix',
            'Use help(), dir() and the standard library reference to answer your own questions',
            'Write a minimal reproducible example of a bug',
          ],
          concepts: [
            'Syntax error, runtime exception, semantic error',
            'The debugging loop and the scientific method',
            'Minimal reproducible example',
            'help(), dir(), type() as exploration tools',
            'The Python Standard Library reference and its structure',
            'Rubber-duck explanation',
            'Searching error messages effectively',
          ],
          explanation: `Think Python identifies three kinds of error, and knowing which one you face determines what to do. A **syntax error** stops the program before it starts; the fix is purely about the text. A **runtime error** (an exception) stops the program mid-way with a traceback; the fix starts from the traceback. A **semantic error** is the worst: the program runs to completion and produces the wrong answer. Nothing tells you; you must *know what the right answer is* and compare, which is the seed of the idea of testing (module 6).

Debugging is a scientific activity. **Reproduce** the problem reliably with the smallest input that triggers it. **Read** the traceback or the wrong output and state precisely what differs from expectation. **Hypothesise** one cause. **Test** the hypothesis by printing the relevant variable or evaluating the expression in the REPL. **Fix** and re-run the original case. Beginners skip the hypothesis step and change code at random; that works on toy programs and fails completely on real ones. Explaining the problem out loud to a rubber duck (or a text file) works because it forces you to state your assumptions, one of which is wrong.

Python ships with its own manual. \`help(str.split)\` in the REPL prints the docstring; \`dir(s)\` lists what a string can do. The online **Library Reference** (docs.python.org/3/library) is the real reference: find the module (\`math\`, \`random\`, \`string\`), skim the function list, read the one you need. Searching an error message is also legitimate, but paste only the generic part (\`TypeError: can only concatenate str (not "int") to str\`), not your variable names.

Do the exercises below slowly; the point is not the answers but to practise the loop until it is reflexive.`,
          resources: [
            {
              title: 'Think Python — Appendix: Debugging',
              url: 'https://allendowney.github.io/ThinkPython/chap01.html#debugging',
              type: 'textbook',
              cost: 'free',
              provider: 'Allen Downey',
              note: 'Each chapter ends with a debugging section; read the one in chapter 1 now and the rest as you go.',
              primary: true,
            },
            {
              title: 'The Python Standard Library reference',
              url: 'https://docs.python.org/3/library/index.html',
              type: 'documentation',
              cost: 'free',
              provider: 'Python Software Foundation',
              note: 'Bookmark it. Learn the layout: built-in functions, built-in types, then modules by area.',
            },
            {
              title: 'Errors and Exceptions (Python Tutorial, section 8)',
              url: 'https://docs.python.org/3/tutorial/errors.html',
              type: 'documentation',
              cost: 'free',
              provider: 'Python Software Foundation',
              note: 'Read 8.1 and 8.2 now; the rest belongs to module 4.',
            },
          ],
          exercises: [
            {
              slug: 'classify-errors',
              title: 'Classify ten bugs',
              prompt:
                'Download or type ten short buggy snippets of your own (e.g. a missing colon, a misspelled variable, "1" + 1, an off-by-one range, a loop that averages by dividing by the wrong count). For each, classify as syntax/runtime/semantic, state how you detected it, and fix it. The semantic ones must include the expected and actual output.',
              kind: 'coding',
              difficulty: 1,
            },
            {
              slug: 'explore-with-help',
              title: 'Answer questions with help() only',
              prompt:
                'Without a web search, using only help() and dir() in the REPL, find out: how to round 2.675 to two decimals and why the answer is 2.67; how to get the position of the first "a" in a string; which math module function computes the greatest common divisor; what random.choice does. Write the answers with the exact function names.',
              kind: 'coding',
              difficulty: 1,
            },
            {
              slug: 'minimal-reproducer',
              title: 'Write a minimal reproducible example',
              prompt:
                'Take the temperature converter from the previous lesson and deliberately introduce a semantic bug (e.g. use 5/9 instead of 9/5). Pretend a friend reported "the Fahrenheit values look wrong". Produce a minimal example: the smallest script (under 5 lines) and the single input that shows the wrong output, plus the expected output. Then fix it.',
              kind: 'writing',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why are semantic errors harder to find than runtime errors?',
              answerOutline:
                'No traceback: the program runs and finishes. You must know the expected result independently and compare, which requires tests or hand calculation.',
            },
            {
              question: 'What are the steps of the debugging loop?',
              answerOutline:
                'Reproduce with a small input, read the evidence, form one hypothesis, test it with prints or the REPL, fix, re-run the original case.',
            },
            {
              question: 'How do you find what methods an object supports without leaving the REPL?',
              answerOutline: 'dir(obj) lists attributes; help(obj.method) shows its documentation.',
            },
          ],
        },
      ],
    },
    {
      slug: 'control-flow-functions',
      title: 'Control Flow and Functions',
      description:
        'Make programs decide and repeat with conditionals and loops, then package behaviour into functions with clear interfaces, understand scope, and meet recursion.',
      lessons: [
        {
          slug: 'conditionals',
          title: 'Conditionals and boolean logic',
          summary:
            'if / elif / else, truthiness, nested conditions, and how to structure decisions so they are readable and correct.',
          estimatedMinutes: 75,
          objectives: [
            'Write if/elif/else chains and predict which branch runs for any input',
            'Explain truthiness and list the falsy values in Python',
            'Replace nested conditionals with guard clauses or boolean expressions',
            'Trace a conditional program by hand with a table of inputs and outputs',
          ],
          concepts: [
            'if, elif, else and indentation as syntax',
            'Truthiness: 0, 0.0, "", [], {}, None are falsy',
            'Nested conditionals and guard clauses',
            'Boundary cases and off-by-one in comparisons',
            'Conditional expression x if c else y',
            'Comparison of floats with a tolerance',
            'Flowcharts / decision tables',
          ],
          explanation: `A conditional lets a program take different paths. Python uses **indentation** as syntax: the block under \`if x > 0:\` is exactly the lines indented beneath it, and a wrong indent is a logic bug, not a style issue. An \`if / elif / elif / else\` chain tests conditions **in order** and runs only the first true branch, so ordering matters: test the most specific condition first (\`x > 100\` before \`x > 10\`).

Python treats any value as a condition through **truthiness**: numbers are false when zero, strings and collections when empty, and \`None\` is false. Writing \`if items:\` rather than \`if len(items) > 0:\` is idiomatic. But be careful: \`if x:\` to test "x was given" fails when 0 is a legitimate value; use \`if x is not None:\`.

Deeply nested conditionals are hard to read and hide bugs. Two refactorings fix most of them: **guard clauses** (handle the special case and return early, then write the main case unindented) and **combining conditions** with \`and\`/\`or\`. Also prefer the conditional expression \`sign = "neg" if x < 0 else "non-neg"\` for simple two-way choices.

The classic bugs are boundary errors: writing \`<\` where \`<=\` was meant (is 18 an adult?), and comparing floats with \`==\` (use \`math.isclose\` or \`abs(a - b) < 1e-9\`). The remedy is a **decision table**: for each boundary, write the input, the expected branch, and run the program to confirm. Chapter 5 of Think Python and the tutorial's control-flow section are the reading; the exercises make you write the decision tables.`,
          resources: [
            {
              title: 'Think Python — Chapter 5: Conditionals and Recursion',
              url: 'https://allendowney.github.io/ThinkPython/chap05.html',
              type: 'textbook',
              cost: 'free',
              provider: 'Allen Downey',
              note: 'Sections on boolean expressions, conditional execution and chained/nested conditionals.',
              primary: true,
            },
            {
              title: 'The Python Tutorial — More Control Flow Tools',
              url: 'https://docs.python.org/3/tutorial/controlflow.html',
              type: 'documentation',
              cost: 'free',
              provider: 'Python Software Foundation',
            },
            {
              title: 'Truth Value Testing (standard library reference)',
              url: 'https://docs.python.org/3/library/stdtypes.html#truth-value-testing',
              type: 'documentation',
              cost: 'free',
              provider: 'Python Software Foundation',
            },
          ],
          exercises: [
            {
              slug: 'leap-year',
              title: 'Leap year with a decision table',
              prompt:
                'Write a script that reads a year and prints whether it is a leap year (divisible by 4, except centuries, except centuries divisible by 400). Before coding, write a decision table with the inputs 1900, 2000, 2023, 2024, 2100 and the expected result (False, True, False, True, False). Then implement with a single boolean expression and verify every row.',
              kind: 'coding',
              difficulty: 1,
            },
            {
              slug: 'grade-boundaries',
              title: 'Grade bands and boundaries',
              prompt:
                'Map a score 0-100 to A (>=90), B (>=80), C (>=70), D (>=60), F. Test with 89, 90, 90.0, 59.99, 100, -1, 101 and decide what should happen for out-of-range inputs. Now write the same program with the elif conditions in reverse order and explain why it is wrong.',
              kind: 'coding',
              difficulty: 1,
            },
            {
              slug: 'bmi-with-guards',
              title: 'Refactor nested ifs into guard clauses',
              prompt:
                'Write a program that classifies a triangle given three side lengths: invalid (any side <= 0 or triangle inequality fails), equilateral, isosceles, scalene, and additionally says whether it is right-angled (use isclose). Write it first with nested ifs, then refactor using guard clauses so no block is indented more than two levels. Both versions must agree on 20 test triples including (3,4,5), (1,1,3), (2,2,2), (0,1,1).',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'List the falsy values in Python.',
              answerOutline: 'False, None, 0, 0.0, 0j, "", [], (), {}, set(), and any object whose __bool__/__len__ says so.',
            },
            {
              question: 'Why can the order of elif branches change the result?',
              answerOutline:
                'Only the first true branch runs; a broad condition placed first (x > 10) captures cases a more specific later branch (x > 100) was meant to handle.',
            },
            {
              question: 'Why should you not compare floats with ==?',
              answerOutline:
                'Rounding error means mathematically equal computations can differ in the last bits; compare with a tolerance (math.isclose).',
            },
          ],
        },
        {
          slug: 'loops-and-iteration',
          title: 'Loops: while, for and range',
          summary:
            'Repeat with while and for, iterate with range, use break and continue wisely, and learn the accumulator pattern that most loops are.',
          estimatedMinutes: 100,
          objectives: [
            'Write while loops with a correct termination condition and for loops over range and sequences',
            'Recognise and implement the accumulator, counter, search and max/min patterns',
            'Use break, continue and the for-else clause appropriately',
            'Trace a loop by hand with a variable table and find off-by-one errors',
          ],
          concepts: [
            'while loop and loop invariants (informal)',
            'for loop over any iterable; range(start, stop, step)',
            'Accumulator pattern: total = 0; for x in ...: total += x',
            'Counting, searching, early exit with break',
            'continue and for/else',
            'Infinite loops and sentinel values',
            'Nested loops and their cost',
            'enumerate() and zip() (preview)',
          ],
          explanation: `A **while** loop repeats as long as a condition holds; it is the right tool when you do not know in advance how many iterations you need (read until the user types "quit", iterate until a value converges). A **for** loop walks through the items of an iterable; \`for i in range(n)\` gives \`0, 1, ..., n-1\`, which matches zero-based indexing: \`range(len(s))\` indexes every character. \`range(a, b)\` excludes \`b\`, just like slices.

Most loops are instances of a few **patterns**. *Accumulate*: start a total at 0 (or an empty string/list), add each item. *Count*: increment on a condition. *Search*: loop and \`break\` when found; the \`else\` clause of a for loop runs only if no \`break\` happened, which is precisely "not found". *Extremum*: keep the best so far and its position. Recognising the pattern lets you write the loop almost without thinking and lets a reader understand it instantly.

Hand-tracing is the skill that catches loop bugs. Make a table with one column per variable and one row per iteration, and fill it in mechanically. Off-by-one errors (one too many, one too few) show up immediately in the table. For while loops, make sure something in the body moves the condition toward false, or you have an infinite loop; Ctrl-C stops it.

Loops nest: a loop inside a loop runs the inner body $n \\times m$ times, which is your first encounter with the idea that *how* you write code determines how long it runs (module 7). Read Think Python chapter 7 and the tutorial section on \`range\`, then do every exercise; loops are where fluency is built.`,
          resources: [
            {
              title: 'Think Python — Chapter 7: Iteration and Search',
              url: 'https://allendowney.github.io/ThinkPython/chap07.html',
              type: 'textbook',
              cost: 'free',
              provider: 'Allen Downey',
              primary: true,
            },
            {
              title: 'The Python Tutorial — for statements and range()',
              url: 'https://docs.python.org/3/tutorial/controlflow.html#for-statements',
              type: 'documentation',
              cost: 'free',
              provider: 'Python Software Foundation',
            },
            {
              title: 'MIT 6.100L — Lectures 3-4 (Control flow, iteration)',
              url: 'https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/',
              type: 'lecture',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
            },
            {
              title: 'Exercism Python track',
              url: 'https://exercism.org/tracks/python',
              type: 'problem-set',
              cost: 'free',
              provider: 'Exercism',
              note: 'Dozens of small, tested problems; do a few per lesson from here on.',
            },
          ],
          exercises: [
            {
              slug: 'collatz',
              title: 'Collatz sequence length',
              prompt:
                'Write a while loop that, starting from n, repeatedly applies n -> n/2 if even else 3n+1 until n == 1, counting steps. Verify: 1 -> 0 steps, 6 -> 8 steps, 27 -> 111 steps. Then use a for loop over 1..10000 to find the start with the longest sequence (expected 6171 with 261 steps) and time the whole run with time.perf_counter().',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'loop-patterns',
              title: 'Four loop patterns on one list',
              prompt:
                'Given data = [3, -1, 4, 1, -5, 9, 2, -6], write (without using sum, max or min) loops that compute: the sum; the number of negatives; the index of the largest value; whether any value equals 9 using break and for/else. Expected: 7, 3, 5, True. Then hand-trace the max loop with a table and include it.',
              kind: 'coding',
              difficulty: 1,
            },
            {
              slug: 'multiplication-table',
              title: 'Nested loops and counting work',
              prompt:
                'Print a 12x12 multiplication table with aligned columns. Add a counter that increments once per inner iteration and print it at the end (expected 144). Change both bounds to n and tabulate the counter for n = 10, 100, 1000; state the formula and how the run time grew between each step.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'newton-sqrt',
              title: 'Square root by Newton iteration',
              prompt:
                'Implement sqrt(a) by iterating x = (x + a/x)/2 starting at x = a until abs(x*x - a) < 1e-10, counting iterations. For a = 2, 100, 1e6 report the result, the iteration count and the absolute error versus math.sqrt. Explain why a while loop (not a for loop) is appropriate here.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What values does range(2, 11, 3) produce?',
              answerOutline: '2, 5, 8 (stop 11 is excluded).',
            },
            {
              question: 'When does the else clause of a for loop execute?',
              answerOutline: 'When the loop finishes without hitting break; useful for "not found" logic.',
            },
            {
              question: 'What is the accumulator pattern? Give the skeleton.',
              answerOutline:
                'Initialise a result (total = 0), update it inside the loop (total += x), use it after the loop.',
            },
            {
              question: 'How do you find an off-by-one error in a loop?',
              answerOutline:
                'Hand-trace with a variable table for a tiny input and compare each row with what the loop should do; check the boundaries of range/slices.',
            },
          ],
        },
        {
          slug: 'functions',
          title: 'Defining functions',
          summary:
            'Write functions with parameters, return values and docstrings; separate computing from printing; and design function signatures that are easy to test.',
          estimatedMinutes: 110,
          objectives: [
            'Define functions with positional, default and keyword arguments and call them correctly',
            'Explain the difference between returning and printing and why returning is usually right',
            'Write a docstring that states the contract (inputs, output, assumptions)',
            'Decompose a program of 50 lines into functions of 5-15 lines each',
          ],
          concepts: [
            'def, parameters vs arguments, return',
            'Return vs print; None as the default return',
            'Default argument values and keyword arguments',
            'Docstrings and the function contract',
            'Pure functions vs functions with side effects',
            'Decomposition and abstraction',
            'Mutable default argument pitfall',
            'Functions are objects (preview of higher-order functions)',
          ],
          explanation: `A **function** packages a computation behind a name and an interface. \`def area(r):\` declares a *parameter* \`r\`; calling \`area(2.0)\` supplies an *argument*. The body runs with \`r\` bound to that object and \`return\` hands a value back to the caller. A function with no \`return\` (or a bare one) returns \`None\`; forgetting to return, then wondering why \`result\` is \`None\`, is the most common function bug.

**Return, do not print.** A function that prints its answer can only be used by a human reading the screen. A function that returns its answer can be used in an expression, stored, tested automatically, and printed by the caller if desired. Separate the computation (returns) from the presentation (prints) and your programs become testable; module 6 depends on this.

Parameters can have **defaults** (\`def greet(name, greeting="Hello")\`), and callers can use **keyword arguments** (\`greet(greeting="Hi", name="Ada")\`) for clarity. One trap: default values are evaluated once, at definition time, so \`def f(items=[])\` shares one list between all calls; use \`items=None\` and create the list inside.

A **docstring** (a string literal as the first line of the body) documents the contract: what the parameters mean, what is returned, what is assumed. \`help(area)\` shows it. Write it before the body; if you cannot state the contract, you do not yet know what the function should do.

**Decomposition** is the main design skill: a 60-line script becomes \`read_input\`, \`compute\`, \`format_output\`, \`main\`. Each function does one thing, has a name that says what it returns, and can be tested alone. Composing Programs chapters 1.3-1.4 are the best treatment of function design; Think Python chapter 3 covers the mechanics.`,
          resources: [
            {
              title: 'Think Python — Chapter 3: Functions',
              url: 'https://allendowney.github.io/ThinkPython/chap03.html',
              type: 'textbook',
              cost: 'free',
              provider: 'Allen Downey',
              primary: true,
            },
            {
              title: 'Composing Programs — 1.3 Defining New Functions and 1.4 Designing Functions',
              url: 'https://www.composingprograms.com/pages/13-defining-new-functions.html',
              type: 'textbook',
              cost: 'free',
              provider: 'John DeNero (UC Berkeley CS61A)',
              note: 'The environment-diagram model of function calls is worth the effort.',
            },
            {
              title: 'The Python Tutorial — Defining Functions',
              url: 'https://docs.python.org/3/tutorial/controlflow.html#defining-functions',
              type: 'documentation',
              cost: 'free',
              provider: 'Python Software Foundation',
              note: 'Includes default and keyword arguments, and the mutable default example.',
            },
          ],
          exercises: [
            {
              slug: 'pure-functions',
              title: 'Return, do not print',
              prompt:
                'Write is_prime(n) -> bool, nth_prime(k) -> int (using is_prime) and digit_sum(n) -> int. Verify: is_prime(1) is False, is_prime(2) True, is_prime(97) True, nth_prime(100) == 541, digit_sum(2 ** 100) == 115. None of the functions may call print; a separate main() prints the results.',
              kind: 'coding',
              difficulty: 1,
            },
            {
              slug: 'mutable-default-bug',
              title: 'The mutable default trap',
              prompt:
                'Write def add_item(item, items=[]): items.append(item); return items. Call add_item(1) then add_item(2) and print the results; explain the output. Rewrite with items=None and demonstrate the fix. Then explain in one paragraph when default values are evaluated.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'decompose-script',
              title: 'Decompose a script into functions',
              prompt:
                'Take the Collatz exercise and restructure it into collatz_steps(n), longest_chain(limit) -> (start, steps) and main(). Each function gets a docstring. Confirm longest_chain(10000) == (6171, 261). Then time longest_chain(100000) and record the result (expected start 77031, 350 steps).',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'keyword-defaults',
              title: 'A function with sensible defaults',
              prompt:
                'Write format_money(amount, currency="USD", decimals=2, thousands=True) returning strings like "USD 1,234.50". Test: format_money(1234.5) == "USD 1,234.50", format_money(1234.5, "EUR", thousands=False) == "EUR 1234.50", format_money(0.005) == "USD 0.01" (check what round does here and document it).',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What does a function return if it has no return statement?',
              answerOutline: 'None. Calling it in an expression gives None, a frequent source of TypeError later.',
            },
            {
              question: 'Why is it better to return a result than to print it inside the function?',
              answerOutline:
                'Returned values can be reused, composed and tested automatically; printing couples the computation to the screen.',
            },
            {
              question: 'Why is def f(x, cache={}) dangerous?',
              answerOutline:
                'The default dict is created once at definition time and shared across all calls, so mutations persist between calls.',
            },
            {
              question: 'What belongs in a docstring?',
              answerOutline:
                'The contract: what parameters mean and their expected types, what is returned, assumptions and errors raised. Not the implementation.',
            },
          ],
        },
        {
          slug: 'scope-and-the-call-stack',
          title: 'Scope, the call stack and the environment model',
          summary:
            'Local vs global names, how a call creates a frame, what happens when functions call functions, and why the global keyword is almost always a mistake.',
          estimatedMinutes: 90,
          objectives: [
            'Predict which object a name refers to inside a function using the LEGB rule',
            'Draw the call stack and environment frames for a nested sequence of calls',
            'Explain why assigning to a global inside a function creates a local instead',
            'Use the stack to explain a traceback that passes through several functions',
          ],
          concepts: [
            'Local scope, enclosing scope, global scope, built-ins (LEGB)',
            'Frames and the call stack',
            'Parameters are local names bound to the argument objects',
            'global and nonlocal keywords, and why to avoid them',
            'Stack diagrams and environment diagrams',
            'Pass by object reference (sharing)',
            'Lifetime of a frame',
          ],
          explanation: `When a function is called, Python creates a new **frame**: a fresh namespace in which the parameters are bound to the argument objects and in which any name assigned inside the body lives. When the function returns, the frame is discarded. Frames stack up as functions call functions; this is the **call stack**, and a traceback is simply a printout of it from bottom to top.

Name lookup follows **LEGB**: Local frame, then Enclosing function frames, then Global (module) names, then Built-ins. Reading a global from inside a function works because lookup falls through. But **assignment** inside a function always creates a *local* name, so \`count = count + 1\` inside a function with a global \`count\` raises \`UnboundLocalError\`: the assignment makes \`count\` local for the whole body, and the right-hand side reads it before it has a value. The \`global\` keyword overrides this, but a function that silently edits module-level variables is hard to test and reason about; pass values in and return results out instead.

Arguments are passed by **sharing**: the parameter name is bound to the very same object the caller passed. Rebinding the parameter (\`x = x + 1\`) does not affect the caller; mutating the object (\`items.append(1)\`) does. This is the names-not-boxes rule applied to calls, and it is the explanation for 90% of "my function changed my list" and "my function did not change my number" confusions.

Composing Programs' **environment diagrams** make all of this visible: boxes for frames, arrows for bindings. Draw them by hand for the exercises, then check with Python Tutor. Once the model is solid, scope questions stop being mysterious and start being mechanical.`,
          resources: [
            {
              title: 'Composing Programs — 1.3.2 Environment diagrams and 1.6 Higher-Order Functions (nested definitions)',
              url: 'https://www.composingprograms.com/pages/13-defining-new-functions.html',
              type: 'textbook',
              cost: 'free',
              provider: 'John DeNero (UC Berkeley CS61A)',
              primary: true,
            },
            {
              title: 'Python Tutor: step through calls and watch frames',
              url: 'https://pythontutor.com/',
              type: 'interactive',
              cost: 'free',
              provider: 'Philip Guo',
            },
            {
              title: 'Python Tutorial — Scopes and Namespaces',
              url: 'https://docs.python.org/3/tutorial/classes.html#python-scopes-and-namespaces',
              type: 'documentation',
              cost: 'free',
              provider: 'Python Software Foundation',
              note: 'Section 9.2 and the scopes example; ignore the class material for now.',
            },
            {
              title: 'Think Python — Chapter 3, section on stack diagrams and tracebacks',
              url: 'https://allendowney.github.io/ThinkPython/chap03.html',
              type: 'textbook',
              cost: 'free',
              provider: 'Allen Downey',
            },
          ],
          exercises: [
            {
              slug: 'predict-scope',
              title: 'Predict the output',
              prompt:
                'Predict, then run: (1) x = 1; def f(): print(x); f(). (2) x = 1; def g(): x = 2; print(x); g(); print(x). (3) x = 1; def h(): print(x); x = 2; h(). (4) def outer(): y = 1; def inner(): return y + 1; return inner(); print(outer()). Explain each result using LEGB and the frame model, including the exact error in (3).',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'draw-stack',
              title: 'Draw the call stack',
              prompt:
                'Write a(n) that calls b(n+1) that calls c(n*2) that raises ValueError. Call a(3). Draw the stack with each frame and its local names at the moment of the error, then compare with the traceback Python prints. Mark which frame is on top of the stack and which is printed last.',
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'sharing-vs-rebinding',
              title: 'Sharing versus rebinding in calls',
              prompt:
                'Write increment(n) that does n += 1 and append_one(lst) that does lst.append(1). Call each with a variable and print the variable afterwards. Then write append_one_wrong(lst) that does lst = lst + [1] and show it does not affect the caller. Explain all three with environment diagrams.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does assigning to a module-level variable inside a function raise UnboundLocalError when you also read it first?',
              answerOutline:
                'Any assignment in the body makes the name local for the whole function; the read happens before the local is bound.',
            },
            {
              question: 'Does Python pass arguments by value or by reference?',
              answerOutline:
                'Neither in the C sense: by object sharing. The parameter is a new name bound to the same object; rebinding is local, mutation is shared.',
            },
            {
              question: 'What is a frame and when is it destroyed?',
              answerOutline:
                'The namespace created for one function call holding its local names; discarded when the call returns (unless captured by a closure).',
            },
          ],
        },
        {
          slug: 'recursion-intro',
          title: 'Recursion: functions that call themselves',
          summary:
            'Base cases, recursive cases, the leap of faith, and how recursion on the call stack differs from iteration.',
          estimatedMinutes: 100,
          objectives: [
            'Write a recursive function given a base case and a recursive case',
            'Trace a recursive call on the stack and count the frames',
            'Convert simple recursions to loops and explain when recursion is clearer',
            'Recognise exponential blow-up in naive recursion (Fibonacci) and fix it with memoisation',
          ],
          concepts: [
            'Base case and recursive case',
            'The recursive leap of faith',
            'Stack depth and RecursionError',
            'Tree recursion (fib) and exponential cost',
            'Memoisation with a dict or functools.lru_cache',
            'Recursion vs iteration',
            'Recursive structure of data (nested lists)',
          ],
          explanation: `A **recursive** function solves a problem by calling itself on a smaller instance. Every correct recursion has a **base case** (an input so small you answer directly) and a **recursive case** that makes progress toward the base case. \`factorial(0) = 1\`; \`factorial(n) = n * factorial(n-1)\`. Each call gets its own frame on the stack, so a call with \`n = 1000\` has a thousand frames alive at the deepest point; Python limits depth (around 1000) and raises \`RecursionError\` beyond it, which is why very deep recursion is written as a loop in Python.

The way to *write* recursion is the **leap of faith**: assume the recursive call returns the right answer for the smaller input, and ask only how to build the answer for the current input from it. Do not try to trace ten levels in your head. The way to *debug* recursion is the opposite: trace a tiny case (n = 2) on paper, frame by frame.

Some recursions are expensive. Naive \`fib(n) = fib(n-1) + fib(n-2)\` recomputes the same values exponentially often: \`fib(35)\` takes seconds and \`fib(50)\` would take days. Measure it. **Memoisation** stores results in a dictionary (or use \`functools.lru_cache\`) and turns the exponential tree into a linear chain. This is your first algorithmic speed-up and the seed of dynamic programming.

Recursion shines on **recursively defined data**: a nested list is either a non-list value or a list of nested lists, so summing it is a two-line recursion that no simple loop can match. Composing Programs 1.7 and Think Python chapters 5-6 are the readings; this topic's canonical treatment lives in Data Structures and Algorithms, so aim for fluency with simple cases now.`,
          resources: [
            {
              title: 'Composing Programs — 1.7 Recursive Functions',
              url: 'https://www.composingprograms.com/pages/17-recursive-functions.html',
              type: 'textbook',
              cost: 'free',
              provider: 'John DeNero (UC Berkeley CS61A)',
              primary: true,
            },
            {
              title: 'Think Python — Chapter 6: Return Values (and recursion in chapter 5)',
              url: 'https://allendowney.github.io/ThinkPython/chap06.html',
              type: 'textbook',
              cost: 'free',
              provider: 'Allen Downey',
            },
            {
              title: 'functools.lru_cache documentation',
              url: 'https://docs.python.org/3/library/functools.html#functools.lru_cache',
              type: 'documentation',
              cost: 'free',
              provider: 'Python Software Foundation',
            },
            {
              title: 'MIT 6.100L — Lecture on Recursion',
              url: 'https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/',
              type: 'lecture',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
            },
          ],
          exercises: [
            {
              slug: 'basic-recursions',
              title: 'Five classic recursions',
              prompt:
                'Implement recursively: factorial(n), power(b, n), sum_digits(n), reverse(s) and is_palindrome(s). Verify factorial(20) == 2432902008176640000, power(2, 30) == 1073741824, sum_digits(98765) == 35, reverse("abc") == "cba". For each, state the base case and why the recursive case makes progress.',
              kind: 'coding',
              difficulty: 1,
            },
            {
              slug: 'fib-measure',
              title: 'Measure exponential recursion and fix it',
              prompt:
                'Implement naive fib(n). Time fib(20), fib(25), fib(30), fib(32) with time.perf_counter and compute the ratio between successive timings (it should approach about 1.618 per step). Add a counter for the number of calls. Then add @lru_cache and repeat; fib(300) must return instantly. Report both tables.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'nested-sum',
              title: 'Recursion on nested data',
              prompt:
                'Write nested_sum(x) that returns the sum of all numbers in an arbitrarily nested list, e.g. nested_sum([1, [2, [3, 4]], 5]) == 15, and nested_depth(x) returning the maximum nesting depth (the example has depth 3). Explain why a single for loop cannot do this without an explicit stack.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'recursion-limit',
              title: 'Hit the recursion limit',
              prompt:
                'Call your recursive sum_to(n) (n + sum_to(n-1)) with n = 500, 2000, 10000 and record what happens. Print sys.getrecursionlimit(). Rewrite sum_to as a loop and confirm it handles n = 10**6. Write two sentences on when you would choose recursion anyway.',
              kind: 'coding',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'What two things must every recursive function have?',
              answerOutline: 'A base case answered directly, and a recursive case that calls itself on strictly smaller input moving toward the base case.',
            },
            {
              question: 'Why is naive fib(n) exponential, and how does memoisation fix it?',
              answerOutline:
                'Each call spawns two calls and subproblems are recomputed; caching results makes each fib(k) computed once, giving linear work.',
            },
            {
              question: 'What is the recursive leap of faith?',
              answerOutline:
                'Assume the recursive call on the smaller input is correct and only reason about how to combine it; do not mentally unroll the recursion.',
            },
            {
              question: 'Why does deep recursion fail in Python and what is the alternative?',
              answerOutline:
                'Each call consumes a stack frame and Python caps depth (~1000) raising RecursionError; rewrite as iteration or use an explicit stack.',
            },
          ],
          relatedLessons: ['data-structures-algorithms/analysis-foundations/recurrences-and-divide-and-conquer'],
        },
      ],
      project: {
        slug: 'number-games',
        title: 'Module project: a number-guessing and number-theory toolkit',
        description:
          'Build a small interactive program with a menu: (1) a guessing game where the computer guesses your number by binary search and reports the number of guesses, (2) a prime-factorisation tool, (3) a Collatz explorer that prints the longest chain below a limit. Every computation is a pure function; the menu loop handles all input validation.',
        deliverables: [
          'A single script with at least six documented functions and a main() loop',
          'A short text file of manual test cases with expected and observed outputs',
          'A note measuring how many guesses binary search needs for ranges 100, 1000, 10^6 and the formula that predicts it',
        ],
        estimatedHours: 6,
      },
    },
    {
      slug: 'data-collections',
      title: 'Data Collections',
      description:
        'Lists, tuples, dictionaries, sets and strings: how to choose among them, how aliasing and mutation work, and how comprehensions express transformations compactly.',
      lessons: [
        {
          slug: 'lists',
          title: 'Lists: ordered, mutable sequences',
          summary:
            'Creating, indexing, slicing and mutating lists; the aliasing trap; and the difference between methods that mutate and expressions that build new lists.',
          estimatedMinutes: 100,
          objectives: [
            'Use list literals, indexing, slicing, append/extend/insert/pop/remove and sort/sorted correctly',
            'Predict the effect of aliasing: two names for one list',
            'Distinguish in-place methods (return None) from functions that return new lists',
            'Copy a list correctly (slice, list(), copy) and explain shallow vs deep copy',
          ],
          concepts: [
            'List literal, len, indexing, slicing',
            'Mutation: append, extend, insert, pop, remove, del, slice assignment',
            'Aliasing and identity (is) vs equality (==)',
            'sort() vs sorted(); reverse() vs reversed()',
            'Shallow copy vs deep copy',
            'Lists of lists (2D grids) and the [[0]*n]*m trap',
            'in operator and linear search',
            'Iterating while mutating (do not)',
          ],
          explanation: `A **list** is an ordered, mutable sequence of objects of any type. Indexing and slicing work exactly as for strings, but lists can be **changed in place**: \`items.append(x)\`, \`items.insert(i, x)\`, \`items.pop()\`, \`items.remove(x)\`, \`items[2] = y\`, \`del items[0]\`. Because the object changes, every name bound to it sees the change. \`a = [1, 2]; b = a; b.append(3)\` leaves \`a == [1, 2, 3]\`: \`a\` and \`b\` are **aliases**. Test aliasing with \`a is b\`; test equal contents with \`a == b\`.

Mutating methods return \`None\`. \`items = items.sort()\` throws your data away; write \`items.sort()\` (in place) or \`new = sorted(items)\` (returns a new list, works on any iterable). The same pairing exists for \`reverse()\` / \`reversed()\`. This convention, *mutators return None*, is deliberate: it stops you from accidentally chaining a mutation into an expression.

To copy a list use \`b = a[:]\`, \`b = list(a)\` or \`b = a.copy()\`. These are **shallow**: the new list holds the same element objects, so a list of lists still shares the inner lists. \`copy.deepcopy\` copies all the way down. The classic trap is \`grid = [[0] * 3] * 3\`: that is three references to *one* inner list, and \`grid[0][0] = 1\` changes every row. Build grids with a comprehension: \`[[0] * 3 for _ in range(3)]\`.

Never add or remove elements of a list while iterating over it with \`for\`; items get skipped. Iterate over a copy or build a new list. Think Python chapter 10 and the tutorial's data-structures section are the readings; Ned Batchelder's names article explains the aliasing rules once and for all.`,
          resources: [
            {
              title: 'Think Python — Chapter 10: Lists',
              url: 'https://allendowney.github.io/ThinkPython/chap10.html',
              type: 'textbook',
              cost: 'free',
              provider: 'Allen Downey',
              primary: true,
            },
            {
              title: 'The Python Tutorial — Data Structures (5.1 More on Lists)',
              url: 'https://docs.python.org/3/tutorial/datastructures.html',
              type: 'documentation',
              cost: 'free',
              provider: 'Python Software Foundation',
            },
            {
              title: 'Facts and myths about Python names and values',
              url: 'https://nedbatchelder.com/text/names.html',
              type: 'article',
              cost: 'free',
              provider: 'Ned Batchelder',
              note: 'Second reading: now the list examples will make complete sense.',
            },
            {
              title: 'Sorting HOW TO',
              url: 'https://docs.python.org/3/howto/sorting.html',
              type: 'documentation',
              cost: 'free',
              provider: 'Python Software Foundation',
              note: 'key functions, stability, reverse.',
            },
          ],
          exercises: [
            {
              slug: 'aliasing-experiments',
              title: 'Aliasing experiments',
              prompt:
                'For each snippet predict the final values of a and b and whether a is b: (1) a=[1,2]; b=a; b+=[3]. (2) a=[1,2]; b=a; b=b+[3]. (3) a=[1,2]; b=a[:]; b.append(3). (4) a=[[1],[2]]; b=a[:]; b[0].append(9). (5) a=[[0]*2]*2; a[0][0]=5. Run them and explain every surprise with a diagram.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'list-stats',
              title: 'Statistics without the library',
              prompt:
                'Write mean(xs), median(xs), mode(xs) and variance(xs) using only loops, sorted and basic arithmetic. Test on [2, 4, 4, 4, 5, 5, 7, 9]: mean 5.0, median 4.5, mode 4, population variance 4.0. Then compare with the statistics module on 1000 random floats and assert the results agree to 1e-9.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'remove-while-iterating',
              title: 'The remove-while-iterating bug',
              prompt:
                'Write a loop that removes all even numbers from [1,2,2,3,4,4,5,6,6] by calling remove inside a for loop over the same list. Print the result (it will be wrong) and explain which elements were skipped and why. Fix it three ways: iterate over a copy, build a new list, iterate backwards by index.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'grid-operations',
              title: 'Two-dimensional grids',
              prompt:
                'Build a 5x5 grid of zeros correctly, set the diagonal to 1, then write transpose(grid) and row_sums(grid). Verify transpose(transpose(g)) == g and that the identity grid transposes to itself. Then show what goes wrong with the [[0]*5]*5 construction.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What does x = x.sort() do to x?',
              answerOutline: 'Sorts the list in place, then rebinds x to None (the return value). Use sorted(x) or call sort() without assigning.',
            },
            {
              question: 'What is the difference between a == b and a is b?',
              answerOutline: '== compares contents; is tests whether both names refer to the same object (aliases).',
            },
            {
              question: 'Why does [[0]*3]*3 behave badly?',
              answerOutline: 'The outer * repeats the reference to one inner list three times; mutating one row mutates all. Use a comprehension.',
            },
            {
              question: 'When is a shallow copy insufficient?',
              answerOutline: 'When elements are themselves mutable (lists, dicts): the copy shares them. Use copy.deepcopy.',
            },
          ],
        },
        {
          slug: 'tuples-and-unpacking',
          title: 'Tuples, unpacking and immutability',
          summary:
            'Tuples as fixed records, multiple assignment and return values, enumerate and zip, and why immutability is a feature.',
          estimatedMinutes: 60,
          objectives: [
            'Create tuples and use them for multiple return values and fixed records',
            'Use tuple unpacking in assignments, loops and function returns',
            'Use enumerate() and zip() idiomatically instead of index loops',
            'Explain why tuples can be dictionary keys and lists cannot',
          ],
          concepts: [
            'Tuple literal; the comma makes the tuple, not the parentheses',
            'Immutability and hashability',
            'Multiple assignment and swap: a, b = b, a',
            'Unpacking in for loops; star unpacking',
            'Returning multiple values',
            'enumerate(), zip(), and zip(*pairs) to transpose',
            'Tuples as records vs lists as collections',
          ],
          explanation: `A **tuple** is an immutable sequence: \`point = (3, 4)\`. The comma creates it (\`t = 3,\` is a one-element tuple; \`(3)\` is just 3). Indexing and slicing work as for lists, but there is no \`append\` and you cannot assign to an element. That immutability is the point: a tuple is a reliable **record** whose shape and contents do not change behind your back, and because it is immutable it is **hashable**, so it can be a dictionary key or a set member (\`visited = {(0, 0), (0, 1)}\`). Use tuples for fixed-shape things (a coordinate, an RGB colour, a (name, score) pair) and lists for variable-length collections of similar items.

**Unpacking** assigns the elements of any sequence to several names at once: \`x, y = point\`. It gives you the idiomatic swap \`a, b = b, a\`, the way functions return several values (\`return quotient, remainder\`, then \`q, r = divmod(17, 5)\`), and clean loops over pairs: \`for name, score in results:\`. A starred name collects the rest: \`first, *rest = items\`.

Two built-ins make index-based loops almost unnecessary. \`enumerate(items)\` yields \`(index, item)\` pairs, so \`for i, x in enumerate(items):\` replaces \`for i in range(len(items)): x = items[i]\`. \`zip(a, b)\` yields pairs from two sequences in lockstep (stopping at the shorter), and \`zip(*pairs)\` unzips, transposing a list of pairs into a pair of lists. These read as what they mean, which is why experienced Python code uses them everywhere.

Think Python chapter 12 and the tutorial's "Tuples and Sequences" section cover this. The exercises push you to replace every index loop you would have written with unpacking, \`enumerate\` and \`zip\`.`,
          resources: [
            {
              title: 'Think Python — Chapter 12: Tuples',
              url: 'https://allendowney.github.io/ThinkPython/chap12.html',
              type: 'textbook',
              cost: 'free',
              provider: 'Allen Downey',
              primary: true,
            },
            {
              title: 'The Python Tutorial — Tuples and Sequences',
              url: 'https://docs.python.org/3/tutorial/datastructures.html#tuples-and-sequences',
              type: 'documentation',
              cost: 'free',
              provider: 'Python Software Foundation',
            },
            {
              title: 'Built-in functions: enumerate() and zip()',
              url: 'https://docs.python.org/3/library/functions.html#enumerate',
              type: 'documentation',
              cost: 'free',
              provider: 'Python Software Foundation',
            },
          ],
          exercises: [
            {
              slug: 'unpacking-idioms',
              title: 'Rewrite index loops with unpacking',
              prompt:
                'Given names = ["ann", "bob", "cy"] and scores = [88, 92, 79], write (a) a loop printing "1. ann 88" etc. using enumerate(start=1) and zip, (b) the name of the highest scorer using max with a key (expected "bob"), (c) the two lists recovered from the list of (name, score) pairs using zip(*pairs). No range(len(...)) allowed.',
              kind: 'coding',
              difficulty: 1,
            },
            {
              slug: 'multiple-returns',
              title: 'Functions returning tuples',
              prompt:
                'Write min_max(xs) -> (min, max) in one pass, and quadratic_roots(a, b, c) -> (r1, r2) or None when the discriminant is negative. Verify min_max([3,1,4,1,5]) == (1, 5), quadratic_roots(1, -3, 2) == (1.0, 2.0) (sorted ascending), quadratic_roots(1, 0, 1) is None. Unpack the results at the call site.',
              kind: 'coding',
              difficulty: 1,
            },
            {
              slug: 'tuple-keys',
              title: 'Tuples as keys',
              prompt:
                'Simulate a random walk of 10,000 steps on a 2D grid and count how many times each cell (x, y) is visited using a dict keyed by tuples. Report the most visited cell and how many distinct cells were visited. Then try using a list [x, y] as a key and record the exact error.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why can a tuple be a dict key but a list cannot?',
              answerOutline: 'Keys must be hashable, which requires immutability; a list can change, which would corrupt the hash table.',
            },
            {
              question: 'What does a, b = b, a do and why does it work?',
              answerOutline: 'The right side builds a tuple (b, a) first, then it is unpacked into a and b; no temporary variable is needed.',
            },
            {
              question: 'When should you use enumerate instead of range(len(x))?',
              answerOutline: 'Whenever you need both the index and the item; it is clearer and avoids indexing errors.',
            },
          ],
        },
        {
          slug: 'dictionaries',
          title: 'Dictionaries: mapping keys to values',
          summary:
            'Dicts as the workhorse data structure: counting, grouping, lookup tables, and why their lookup is fast.',
          estimatedMinutes: 100,
          objectives: [
            'Create, read, update and delete dictionary entries and iterate over keys, values and items',
            'Implement counting and grouping with dict.get, setdefault, Counter and defaultdict',
            'Explain hashing at a high level and why dict lookup is roughly constant time',
            'Choose between a dict and a list for a given lookup problem by measuring',
          ],
          concepts: [
            'Dict literal, d[key], d.get(key, default), in',
            'KeyError and the get/setdefault idioms',
            'Iterating: keys(), values(), items()',
            'Insertion order is preserved (3.7+)',
            'Hashable keys; hashing and buckets (intuition)',
            'collections.Counter and defaultdict',
            'Dict as lookup table / memo / sparse array',
            'Nested dicts for structured data',
          ],
          explanation: `A **dictionary** maps **keys** to **values**: \`ages = {"ada": 36, "alan": 41}\`. \`ages["ada"]\` looks up; \`ages["grace"] = 85\` inserts or updates; a missing key raises **KeyError**, so use \`ages.get("x", 0)\` when a default is sensible, or test \`"x" in ages\`. Iterating a dict yields keys; use \`.items()\` to get \`(key, value)\` pairs with unpacking. Since Python 3.7 dicts remember insertion order.

The reason dicts are everywhere is **speed**: looking up a key takes roughly constant time regardless of size, because the key is **hashed** to a number that indexes directly into an internal table. A list, by contrast, is searched element by element (\`x in items\` is linear). Measure it: membership tests in a 1,000,000-element list versus a dict differ by a factor of thousands. Keys must therefore be hashable (immutable): strings, numbers, tuples, not lists.

Three patterns cover most uses. **Counting**: \`counts[word] = counts.get(word, 0) + 1\`, or simply \`collections.Counter(words)\`. **Grouping**: \`groups.setdefault(key, []).append(item)\`, or \`defaultdict(list)\`. **Lookup tables / memoisation**: precompute a mapping once, then look up instead of recomputing (this is exactly how \`lru_cache\` works). Nested dicts (\`{"ada": {"born": 1815, "field": "maths"}}\`) represent structured records and are what JSON becomes when loaded (module 4).

Read Think Python chapter 11 and the tutorial section, then the \`collections\` docs for \`Counter\` and \`defaultdict\`. The word-frequency exercise is the canonical first real program; the timing exercise should permanently change which structure you reach for.`,
          resources: [
            {
              title: 'Think Python — Chapter 11: Dictionaries',
              url: 'https://allendowney.github.io/ThinkPython/chap11.html',
              type: 'textbook',
              cost: 'free',
              provider: 'Allen Downey',
              primary: true,
            },
            {
              title: 'The Python Tutorial — Dictionaries',
              url: 'https://docs.python.org/3/tutorial/datastructures.html#dictionaries',
              type: 'documentation',
              cost: 'free',
              provider: 'Python Software Foundation',
            },
            {
              title: 'collections — Counter and defaultdict',
              url: 'https://docs.python.org/3/library/collections.html',
              type: 'documentation',
              cost: 'free',
              provider: 'Python Software Foundation',
            },
            {
              title: 'Composing Programs — 2.4.3 Dictionaries (and the mutable data chapter)',
              url: 'https://www.composingprograms.com/pages/24-mutable-data.html',
              type: 'textbook',
              cost: 'free',
              provider: 'John DeNero (UC Berkeley CS61A)',
            },
          ],
          exercises: [
            {
              slug: 'word-frequency',
              title: 'Word frequency counter',
              prompt:
                'Download a public-domain book as plain text (e.g. from Project Gutenberg), lower-case it, strip punctuation, and count word frequencies three ways: with d.get, with setdefault/defaultdict, and with Counter. All three must produce identical results (assert it). Print the 20 most common words with counts, and the number of distinct words.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'list-vs-dict-timing',
              title: 'Measure list vs dict lookup',
              prompt:
                'Build a list and a dict (or set) of n random integers for n = 10**3, 10**4, 10**5, 10**6. Time 1000 membership tests of values not present in each. Tabulate the times and the ratio. Explain the trend in one paragraph: which grows with n, which does not, and why.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'group-by',
              title: 'Grouping records',
              prompt:
                'Given a list of (student, course, grade) tuples, build (a) a dict course -> list of students, (b) a dict student -> average grade, (c) a nested dict course -> student -> grade. Write invert(d) that turns a dict of lists into the reverse mapping and check that invert(invert(a)) reproduces a (as sets).',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'memo-dict',
              title: 'Memoisation by hand',
              prompt:
                'Reimplement memoised fib using an explicit dict passed as a parameter (no decorators), and count how many times the body computes a new value for fib(100) (expected 101 at most). Compare the call count with the naive version for fib(25).',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why is dict lookup fast?',
              answerOutline: 'The key is hashed to a table index so lookup does not scan; average constant time, independent of size.',
            },
            {
              question: 'What are two idioms for counting items with a plain dict?',
              answerOutline: 'd[k] = d.get(k, 0) + 1, or check "if k in d" then increment else set to 1; Counter does this for you.',
            },
            {
              question: 'What happens when you access a missing key, and how do you avoid it?',
              answerOutline: 'KeyError; use get with a default, in, setdefault or defaultdict.',
            },
            {
              question: 'Why can a list not be a dict key?',
              answerOutline: 'Lists are mutable and unhashable; a mutated key would be lost in the hash table.',
            },
          ],
        },
        {
          slug: 'sets-and-choosing-a-structure',
          title: 'Sets, and choosing the right structure',
          summary:
            'Sets for membership and de-duplication, set algebra, and a decision guide for picking list, tuple, dict or set.',
          estimatedMinutes: 60,
          objectives: [
            'Use set literals, add/discard, and the union, intersection, difference operators',
            'De-duplicate and test membership with sets and explain the cost',
            'Choose the appropriate collection for a described task and justify it',
            'Explain which operations are fast and slow on each built-in collection',
          ],
          concepts: [
            'Set: unordered collection of unique hashable items',
            'Set operations: | & - ^ and subset tests',
            'frozenset for hashable sets',
            'De-duplication with set() and order-preserving alternative dict.fromkeys',
            'Cost summary: list index O(1), list search O(n), dict/set lookup O(1) average',
            'Decision guide: order? duplicates? lookup by key? fixed shape?',
            'Mutability and hashability recap',
          ],
          explanation: `A **set** holds unique, hashable items with no order: \`seen = {"a", "b"}\` (\`{}\` alone is an empty *dict*; use \`set()\`). Membership, add and discard are constant-time on average, like dict keys, because a set *is* a hash table without values. \`set(items)\` de-duplicates instantly; if you need to keep first-seen order, \`list(dict.fromkeys(items))\` does it.

Sets support mathematical **set algebra** with operators: \`a | b\` union, \`a & b\` intersection, \`a - b\` difference, \`a ^ b\` symmetric difference, and \`a <= b\` subset. These turn many loops into single expressions: "students in both courses" is \`enrolled_a & enrolled_b\`. A \`frozenset\` is an immutable set, usable as a dict key or set element.

Now you know all four built-in collections, and the real skill is **choosing**. Ask: Do I need order? (list or tuple.) Do I look things up by position or by key? (list vs dict.) Do I need to test membership often? (set or dict, not list.) Is the shape fixed, like a record? (tuple, or a dataclass in module 5.) Are duplicates meaningful? (list, not set.) The costs that drive these answers: indexing a list is constant time; searching a list is linear; dict and set lookup are constant on average; inserting at the front of a list is linear (every element shifts), which is why queues use \`collections.deque\`.

The tutorial's set section is brief; the TimeComplexity page on the Python wiki is the reference you will return to. The exercises combine structures, which is how real programs look: a dict of sets, a list of tuples, a set of frozensets.`,
          resources: [
            {
              title: 'The Python Tutorial — Sets',
              url: 'https://docs.python.org/3/tutorial/datastructures.html#sets',
              type: 'documentation',
              cost: 'free',
              provider: 'Python Software Foundation',
              primary: true,
            },
            {
              title: 'Python wiki — Time Complexity of built-in operations',
              url: 'https://wiki.python.org/moin/TimeComplexity',
              type: 'documentation',
              cost: 'free',
              provider: 'Python Software Foundation',
              note: 'The table of list, dict, set costs; refer back to it in module 7.',
            },
            {
              title: 'Set types — standard library reference',
              url: 'https://docs.python.org/3/library/stdtypes.html#set-types-set-frozenset',
              type: 'documentation',
              cost: 'free',
              provider: 'Python Software Foundation',
            },
            {
              title: 'Think Python — Chapter 11-12 (dictionaries and tuples), set examples',
              url: 'https://allendowney.github.io/ThinkPython/chap12.html',
              type: 'textbook',
              cost: 'free',
              provider: 'Allen Downey',
            },
          ],
          exercises: [
            {
              slug: 'set-algebra',
              title: 'Set algebra on real data',
              prompt:
                'Build sets of words appearing in two different text files. Report: words in both, words only in the first, words in exactly one, and the Jaccard similarity |A & B| / |A | B|. Then verify two identities numerically: |A | B| == |A| + |B| - |A & B| and A ^ B == (A - B) | (B - A).',
              kind: 'coding',
              difficulty: 1,
            },
            {
              slug: 'dedupe-timing',
              title: 'De-duplication three ways',
              prompt:
                'Remove duplicates from a list of 10**5 random integers in 0..10**4 by (a) a nested-loop "if x not in result" approach, (b) set(), (c) dict.fromkeys preserving order. Time each and confirm (a) is dramatically slower; explain in terms of list search being linear.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'choose-the-structure',
              title: 'Choose and justify',
              prompt:
                'For each task, name the structure and justify in one sentence: a phone book; the order of songs in a playlist; the set of IP addresses that have ever connected; the (latitude, longitude) of a city; a sparse 1000x1000 matrix with 50 nonzeros; a queue of print jobs; a spell-checker dictionary of 200,000 words. Then implement the spell-checker lookup and measure 10,000 lookups with a list versus a set.',
              kind: 'writing',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'How do you create an empty set and why not {}?',
              answerOutline: 'set(); {} creates an empty dict.',
            },
            {
              question: 'Which of list, dict, set gives fast membership tests and why?',
              answerOutline: 'dict and set (hash-based, average constant time); list must scan linearly.',
            },
            {
              question: 'When is a tuple preferable to a list?',
              answerOutline: 'Fixed-shape records, values that must not change, or when you need a hashable key.',
            },
          ],
        },
        {
          slug: 'comprehensions-and-iteration-tools',
          title: 'Comprehensions and iteration tools',
          summary:
            'List, dict and set comprehensions, generator expressions, and the built-ins (sorted with key, any/all, min/max, sum) that make loops disappear.',
          estimatedMinutes: 90,
          objectives: [
            'Translate between a for-loop that builds a collection and the equivalent comprehension',
            'Write dict and set comprehensions and nested comprehensions with conditions',
            'Use generator expressions with sum/any/all/max for memory-efficient pipelines',
            'Use sorted/min/max with key functions and lambda',
          ],
          concepts: [
            'List comprehension [f(x) for x in xs if cond(x)]',
            'Dict and set comprehensions',
            'Nested comprehensions and readability limits',
            'Generator expressions and lazy evaluation',
            'any(), all(), sum(), min(), max() with key',
            'lambda for small key functions',
            'Iterables vs iterators (preview)',
            'map/filter vs comprehensions',
          ],
          explanation: `A **comprehension** is a compact expression that builds a collection from an iterable: \`squares = [x * x for x in range(10) if x % 2 == 0]\` is exactly the loop "start empty, for each x, if the condition holds, append x*x". Dict and set comprehensions use braces: \`{w: len(w) for w in words}\`, \`{w[0] for w in words}\`. Comprehensions are preferred over the explicit loop when the transformation is simple, because they state *what* is built rather than *how*. The limit is readability: one or two \`for\` clauses, one condition; past that, write the loop.

A **generator expression** has the same syntax with parentheses, \`(x * x for x in big)\`, but produces values lazily one at a time rather than building a list. Feed it straight into a consumer: \`sum(x * x for x in range(10**7))\` never allocates a 10-million-element list. \`any(cond(x) for x in xs)\` and \`all(...)\` stop as soon as the answer is known; this is short-circuiting over a sequence.

The built-ins \`sorted\`, \`min\` and \`max\` accept a **key** function that says what to compare by: \`max(words, key=len)\`, \`sorted(people, key=lambda p: p[1])\`. A \`lambda\` is an anonymous one-expression function, ideal for keys and nothing more complicated. \`sorted\` is **stable**, so sorting by one key then another gives a multi-key sort, and tuple keys \`key=lambda p: (p.age, p.name)\` sort lexicographically.

The tutorial's comprehension sections and the Functional Programming HOWTO are the readings. The exercises convert loops both directions until you can see the comprehension in a loop and the loop in a comprehension.`,
          resources: [
            {
              title: 'The Python Tutorial — List Comprehensions',
              url: 'https://docs.python.org/3/tutorial/datastructures.html#list-comprehensions',
              type: 'documentation',
              cost: 'free',
              provider: 'Python Software Foundation',
              primary: true,
            },
            {
              title: 'Functional Programming HOWTO',
              url: 'https://docs.python.org/3/howto/functional.html',
              type: 'documentation',
              cost: 'free',
              provider: 'Python Software Foundation',
              note: 'Iterators, generator expressions, and the built-ins that consume them.',
            },
            {
              title: 'Think Python — Chapter 14 (comprehensions appear in later chapters) and Chapter 10',
              url: 'https://allendowney.github.io/ThinkPython/chap10.html',
              type: 'textbook',
              cost: 'free',
              provider: 'Allen Downey',
            },
            {
              title: 'Sorting HOW TO (key functions and stability)',
              url: 'https://docs.python.org/3/howto/sorting.html',
              type: 'documentation',
              cost: 'free',
              provider: 'Python Software Foundation',
            },
          ],
          exercises: [
            {
              slug: 'loop-to-comprehension',
              title: 'Convert both ways',
              prompt:
                'Rewrite as comprehensions: (a) the list of lengths of words longer than 3; (b) a dict from each word to its reversed form; (c) the set of all characters in a text that are vowels; (d) the flattened list from a list of lists; (e) the list of (i, j) pairs with i < j from range(5). Then take max(words, key=len) and rewrite it as an explicit loop.',
              kind: 'coding',
              difficulty: 1,
            },
            {
              slug: 'generator-memory',
              title: 'Measure the memory of a list vs a generator',
              prompt:
                'Compute sum(x*x for x in range(10**7)) and sum([x*x for x in range(10**7)]). Time both and measure peak memory with tracemalloc. Report the ratio in memory and explain why the lazy version uses almost none.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'multi-key-sort',
              title: 'Multi-key sorting',
              prompt:
                'Given records of (name, department, salary), produce a list sorted by department ascending then salary descending, in two ways: one sorted() call with a tuple key (negate salary), and two successive stable sorts. Assert both results are identical. Then find the highest-paid person per department with a dict comprehension over groups.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'primes-sieve-comprehension',
              title: 'Primes with any/all',
              prompt:
                'Write is_prime(n) using all(n % d for d in range(2, int(n**0.5) + 1)) and primes_below(n) as a comprehension. Check primes_below(50) has 15 elements ending in 47 and that sum(primes_below(2_000_000)) == 142913828922 (Project Euler 10); time it, then implement a sieve with a list of booleans and compare.',
              kind: 'coding',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'What loop does [f(x) for x in xs if p(x)] correspond to?',
              answerOutline: 'result = []; for x in xs: if p(x): result.append(f(x)).',
            },
            {
              question: 'When should you use a generator expression instead of a list comprehension?',
              answerOutline: 'When the values are consumed once (sum, any, max) or the sequence is large; it avoids building the whole list in memory.',
            },
            {
              question: 'How do you sort a list of tuples by the second element descending?',
              answerOutline: 'sorted(items, key=lambda t: t[1], reverse=True).',
            },
            {
              question: 'Why does sorting stability matter?',
              answerOutline: 'Equal keys keep their prior order, so successive sorts compose into multi-key sorts.',
            },
          ],
        },
      ],
      project: {
        slug: 'text-analyser',
        title: 'Module project: a text analyser',
        description:
          'Write a program that reads a plain-text book and reports: word and sentence counts, the 25 most frequent words, average word length, the longest words, the vocabulary growth curve (distinct words seen after every 1000 words), and a comparison of two books by Jaccard similarity of vocabulary. Every analysis is a pure function over lists, dicts and sets; use comprehensions where they help readability.',
        deliverables: [
          'analyser.py with at least eight documented functions and a main() that takes file paths',
          'A results file for two public-domain books',
          'A timing table showing how long each analysis takes and which data structure made it fast',
        ],
        estimatedHours: 6,
        stretchGoals: ['Compute bigram frequencies and generate 50 words of random text from them'],
      },
    },
    {
      slug: 'programs-and-files',
      title: 'Programs and Files',
      description:
        'Grow from scripts to programs: organise code in modules, read and write text, CSV and JSON files, handle errors deliberately, and build command-line tools with arguments.',
      lessons: [
        {
          slug: 'modules-and-the-standard-library',
          title: 'Modules, imports and the standard library',
          summary:
            'How import works, how to split your own code into modules, the if __name__ == "__main__" idiom, and a tour of the standard library modules you will use most.',
          estimatedMinutes: 90,
          objectives: [
            'Import modules and names with import, from ... import, and aliases, and explain what each creates in your namespace',
            'Split a program into your own modules and explain how Python finds them (sys.path)',
            'Use the if __name__ == "__main__" idiom and explain why it matters for testing',
            'Locate and use math, random, statistics, datetime, pathlib, itertools and collections',
          ],
          concepts: [
            'Module = a .py file; package = directory with __init__.py',
            'import x vs from x import y; aliasing with as',
            'Module search path and the current directory',
            '__name__ and the main guard',
            'Executing a module runs its top-level code once',
            'Standard library tour: math, random, statistics, datetime, pathlib, itertools, collections',
            'Avoid from x import * ',
            'Circular imports',
          ],
          explanation: `A **module** is simply a \`.py\` file; \`import geometry\` finds \`geometry.py\`, runs its top-level code **once**, and binds the name \`geometry\` to a module object whose attributes are everything defined in the file. \`from geometry import area\` binds just \`area\` into your namespace; \`import numpy as np\` gives an alias. Avoid \`from x import *\`: it dumps unknown names into your scope and defeats readers and tools. A **package** is a directory of modules (with an \`__init__.py\`); you will create one in the capstone.

Python finds modules by searching \`sys.path\`, which starts with the directory of the script you ran. This is why \`import helpers\` works when \`helpers.py\` sits next to your script, and why naming your own file \`random.py\` breaks \`import random\` (the local one shadows the library).

Because importing *runs* the module, any code at the top level executes on import, including \`print\` calls and \`input()\` prompts. The **main guard** fixes this: put the script behaviour under \`if __name__ == "__main__": main()\`. When the file is run directly, \`__name__\` is \`"__main__"\`; when imported, it is the module name, so nothing runs. Every module you write from now on uses this idiom; it is what lets pytest import your code without triggering it.

The standard library is enormous and you should know its shape. For this subject: \`math\` (sqrt, pi, isclose, comb), \`random\` (random, randint, choice, shuffle, seed), \`statistics\`, \`datetime\`, \`pathlib\` (object-oriented paths), \`itertools\` (product, permutations, combinations, groupby, accumulate), \`collections\` (Counter, defaultdict, deque, namedtuple), \`functools\`, \`time\` and \`sys\`. Skim the index page once so you know what exists; read a module's page when you need it.`,
          resources: [
            {
              title: 'The Python Tutorial — Modules',
              url: 'https://docs.python.org/3/tutorial/modules.html',
              type: 'documentation',
              cost: 'free',
              provider: 'Python Software Foundation',
              primary: true,
            },
            {
              title: 'Think Python — Chapter 4: Functions and Interfaces (modules and math)',
              url: 'https://allendowney.github.io/ThinkPython/chap04.html',
              type: 'textbook',
              cost: 'free',
              provider: 'Allen Downey',
            },
            {
              title: 'Brief Tour of the Standard Library (tutorial chapters 10-11)',
              url: 'https://docs.python.org/3/tutorial/stdlib.html',
              type: 'documentation',
              cost: 'free',
              provider: 'Python Software Foundation',
            },
            {
              title: 'Practical Python Programming — Section 1 and 2 (scripts, modules)',
              url: 'https://dabeaz-course.github.io/practical-python/',
              type: 'course',
              cost: 'free',
              provider: 'David Beazley',
              note: 'A compact, practice-heavy course; sections 1-3 overlap this module.',
            },
          ],
          exercises: [
            {
              slug: 'split-into-modules',
              title: 'Split the text analyser into modules',
              prompt:
                'Move the pure functions of the module 3 project into textstats.py and the file reading into io_utils.py, leaving a thin main.py with a main guard. Confirm that importing textstats from the REPL prints nothing and runs nothing, and that python main.py book.txt still works. Then remove the main guard, import again, and record what happens.',
              kind: 'coding',
              difficulty: 1,
            },
            {
              slug: 'shadowing-the-library',
              title: 'Shadow a library module on purpose',
              prompt:
                'Create random.py containing print("mine") in a folder, then in the same folder run a script that does import random; print(random.randint(1, 6)). Record the error. Delete the file and explain, with sys.path printed, why the local file won.',
              kind: 'coding',
              difficulty: 1,
            },
            {
              slug: 'stdlib-scavenger-hunt',
              title: 'Standard library scavenger hunt',
              prompt:
                'Using only the standard library, write one-line solutions to: all 3-combinations of "abcd"; the number of days between two dates; the running sums of [1,2,3,4] (expected [1,3,6,10]); the most common letter in a word; a deque rotated by 2; a path to a file in your home directory that exists; the SHA-256 hex digest of the string "hello". Name the module and function for each.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What happens the second time a module is imported in the same program?',
              answerOutline: 'Nothing is re-executed; the module object is cached in sys.modules and the name is bound to it.',
            },
            {
              question: 'Why wrap script code in if __name__ == "__main__"?',
              answerOutline: 'So the module can be imported (by tests or other programs) without running the script-level behaviour.',
            },
            {
              question: 'What does from math import * do and why avoid it?',
              answerOutline: 'Binds every public name of math into your namespace; unclear origin of names and possible shadowing.',
            },
          ],
        },
        {
          slug: 'reading-and-writing-files',
          title: 'Reading and writing text files',
          summary:
            'Open files safely with the with statement, read lines, write output, work with paths using pathlib, and handle encodings.',
          estimatedMinutes: 80,
          objectives: [
            'Read a whole file, iterate over its lines, and write files using with-blocks',
            'Explain why with guarantees the file is closed and what happens without it',
            'Use pathlib.Path to build, inspect and iterate over paths portably',
            'Specify text encodings explicitly and explain what UTF-8 is',
          ],
          concepts: [
            'open(path, mode, encoding), modes r/w/a and text vs binary',
            'The with statement and context managers',
            'Iterating over a file yields lines with newline characters',
            'read(), readlines(), write(), print(file=...)',
            'pathlib.Path: joining, exists, glob, read_text, write_text',
            'Encodings: UTF-8, bytes vs str',
            'Large files: stream line by line, do not read all',
            'FileNotFoundError and PermissionError',
          ],
          explanation: `Files are how programs become useful: input larger than you would type, output that survives the run. \`open(path, "r", encoding="utf-8")\` returns a file object; the **with** statement \`with open(...) as f:\` guarantees the file is closed when the block ends, even if an exception is raised. Always use it; an unclosed file in write mode may lose buffered data.

A text file object is **iterable over lines**, so \`for line in f:\` streams through gigabytes using constant memory, which is what you want for logs and datasets. Each line keeps its trailing newline; \`line.rstrip("\\n")\` or \`.strip()\` removes it. \`f.read()\` returns the whole file as one string (fine for small files), \`f.readlines()\` a list of lines. Writing uses mode \`"w"\` (truncate!) or \`"a"\` (append), with \`f.write(s)\` (no newline added) or \`print(..., file=f)\`.

**pathlib** replaces string manipulation of paths. \`Path("data") / "input.txt"\` joins portably across Windows and Unix; \`p.exists()\`, \`p.suffix\`, \`p.stem\`, \`p.parent\`, \`Path(".").glob("*.csv")\` and the convenience \`p.read_text()\` / \`p.write_text()\` cover most needs.

Text is bytes plus an **encoding**. UTF-8 is the universal default and you should pass \`encoding="utf-8"\` explicitly, because the platform default differs (Windows is a common trap) and a file with accented characters will then decode differently on two machines. Binary mode (\`"rb"\`) gives raw \`bytes\`; you need it for images and for hashing files.

Think Python chapter 14 and the tutorial's input/output section are the readings; the exercises stream a large file and measure that memory stays flat.`,
          resources: [
            {
              title: 'Think Python — Chapter 14: Files',
              url: 'https://allendowney.github.io/ThinkPython/chap14.html',
              type: 'textbook',
              cost: 'free',
              provider: 'Allen Downey',
              primary: true,
            },
            {
              title: 'The Python Tutorial — Reading and Writing Files',
              url: 'https://docs.python.org/3/tutorial/inputoutput.html#reading-and-writing-files',
              type: 'documentation',
              cost: 'free',
              provider: 'Python Software Foundation',
            },
            {
              title: 'pathlib — Object-oriented filesystem paths',
              url: 'https://docs.python.org/3/library/pathlib.html',
              type: 'documentation',
              cost: 'free',
              provider: 'Python Software Foundation',
            },
            {
              title: 'Unicode HOWTO',
              url: 'https://docs.python.org/3/howto/unicode.html',
              type: 'documentation',
              cost: 'free',
              provider: 'Python Software Foundation',
              note: 'Read the first half: what encodings are and why UTF-8.',
            },
          ],
          exercises: [
            {
              slug: 'line-stats-streaming',
              title: 'Stream a large file',
              prompt:
                'Generate a 200 MB text file of random lines (write it with a loop). Then compute the number of lines, the longest line and the total word count by iterating line by line. Measure peak memory with tracemalloc or your OS monitor; it must stay under a few MB. Then do the same with f.read() and compare memory.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'pathlib-inventory',
              title: 'Directory inventory with pathlib',
              prompt:
                'Write inventory(root) that walks a directory tree with Path.rglob and prints a table of file extension -> (count, total bytes) sorted by total bytes descending. Run it on your home directory or a project folder, and handle PermissionError by skipping and counting skipped entries.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'encoding-roundtrip',
              title: 'Encoding round trip',
              prompt:
                'Write the string "naïve café — 日本語" to a file with encoding utf-8, then read it back with encoding latin-1 and with utf-8; show the results. Print len(s) versus len(s.encode("utf-8")) and explain the difference. Finally write it with errors="replace" under ascii and show what is lost.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why use with open(...) rather than open() and close()?',
              answerOutline: 'with closes the file automatically on block exit, including when an exception occurs; forgetting close can lose buffered writes.',
            },
            {
              question: 'What does for line in f give you, and what is attached to each line?',
              answerOutline: 'One line at a time without loading the whole file; each includes its trailing newline (strip it).',
            },
            {
              question: 'Why pass encoding="utf-8" explicitly?',
              answerOutline: 'The default encoding depends on the platform; explicit UTF-8 makes files portable and avoids mojibake.',
            },
          ],
        },
        {
          slug: 'csv-and-json',
          title: 'Structured data: CSV and JSON',
          summary:
            'Parse and produce the two most common data formats with the csv and json modules, validate what you read, and convert between them.',
          estimatedMinutes: 100,
          objectives: [
            'Read CSV with csv.reader and csv.DictReader, handling headers, quoting and type conversion',
            'Write CSV with csv.writer/DictWriter and explain why not to split on commas yourself',
            'Load and dump JSON, map JSON types to Python types, and pretty-print',
            'Validate input records and report bad rows instead of crashing',
          ],
          concepts: [
            'CSV: delimiter, quoting, header row',
            'csv.reader / DictReader / writer / DictWriter; newline="" on open',
            'Everything in CSV is a string: convert explicitly',
            'JSON types <-> Python types (object/dict, array/list, null/None)',
            'json.load/loads and dump/dumps, indent, sort_keys',
            'Serialising only JSON-compatible data; default= hook',
            'Validation and error reporting per row',
            'Round-trip testing',
          ],
          explanation: `Most data you will meet arrives as **CSV** (comma-separated values) or **JSON**. CSV looks trivial but is not: fields can contain commas inside quotes, quotes are doubled to escape them, and line endings vary. Never \`line.split(",")\`; use the **csv** module. \`csv.reader(f)\` yields lists of strings per row; \`csv.DictReader(f)\` uses the header row to yield dicts keyed by column name, which makes code self-documenting. Open CSV files with \`newline=""\` as the docs instruct. Everything read is a *string*: convert \`int(row["year"])\`, \`float(row["mass"])\` yourself, and expect failures (an empty cell, "N/A"), which is where validation comes in.

**JSON** is the lingua franca of APIs and configuration: nested objects (dicts), arrays (lists), strings, numbers, booleans and \`null\` (\`None\`). \`json.load(f)\` / \`json.loads(s)\` parse; \`json.dump(obj, f, indent=2)\` / \`json.dumps\` serialise. Only those types are serialisable; a \`datetime\` or a \`set\` raises \`TypeError\` unless you convert it or supply \`default=\`. Keys are always strings after a round trip, so a dict keyed by integers comes back keyed by \`"1"\`, \`"2"\`: a classic surprise.

A program that reads files must decide what to do with **bad data**. The right default is: validate each record, collect errors with the row number, skip the bad rows, and report at the end (or fail fast with a clear message if the user asked for strictness). Crashing with a KeyError on row 4,812 of a file is not acceptable behaviour.

**Round-trip tests** (write then read and compare) are the standard way to check serialisation code; you will formalise them with pytest in module 6. Read the csv and json module pages and the Automate the Boring Stuff chapter; then do the exercises on a real dataset.`,
          resources: [
            {
              title: 'csv — CSV File Reading and Writing',
              url: 'https://docs.python.org/3/library/csv.html',
              type: 'documentation',
              cost: 'free',
              provider: 'Python Software Foundation',
              primary: true,
            },
            {
              title: 'json — JSON encoder and decoder',
              url: 'https://docs.python.org/3/library/json.html',
              type: 'documentation',
              cost: 'free',
              provider: 'Python Software Foundation',
            },
            {
              title: 'Automate the Boring Stuff with Python — Chapter on CSV and JSON',
              url: 'https://automatetheboringstuff.com/',
              type: 'textbook',
              cost: 'free',
              provider: 'Al Sweigart',
              note: 'Free to read online; the CSV/JSON chapter has practical examples.',
            },
            {
              title: 'NASA Exoplanet Archive (a real CSV source)',
              url: 'https://exoplanetarchive.ipac.caltech.edu/',
              type: 'dataset',
              cost: 'free',
              provider: 'NASA',
              note: 'Download the Planetary Systems table as CSV for the exercises.',
            },
          ],
          exercises: [
            {
              slug: 'exoplanet-csv',
              title: 'Analyse a real CSV',
              prompt:
                'Download the NASA Exoplanet Archive Planetary Systems table as CSV (or any public CSV with 1000+ rows). Using DictReader, count rows, count rows with a missing planet mass, compute the median orbital period, and list the 10 most common discovery methods. Convert types explicitly and record how many rows failed conversion and why.',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'csv-json-roundtrip',
              title: 'CSV to JSON and back',
              prompt:
                'Write csv_to_json(in_path, out_path) producing a list of objects with typed fields (int/float where possible, else string) and json_to_csv doing the reverse. Verify that csv -> json -> csv reproduces the original rows (compare as lists of lists after the same type conversion). Show a case where it does not (e.g. "007" becomes 7) and decide how to handle it.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'validate-records',
              title: 'Validate and report bad rows',
              prompt:
                'Create a CSV of 50 people with name, age, email, and corrupt five rows (negative age, non-numeric age, missing email, extra comma, blank line). Write load_people(path) -> (good_records, errors) where errors is a list of (line_number, message). The program must process every row and print a summary, not crash. Expected: 45 good records, 5 error entries.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'json-config',
              title: 'JSON configuration with defaults',
              prompt:
                'Write load_config(path) that reads a JSON file of settings, fills in defaults for missing keys from a DEFAULTS dict, rejects unknown keys with a clear error, and returns the merged dict. Demonstrate that a dict with integer keys does not survive a JSON round trip and fix it by converting keys.',
              kind: 'coding',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'Why should you not parse CSV with str.split(",")?',
              answerOutline: 'Quoted fields may contain commas and escaped quotes; the csv module handles quoting, delimiters and line endings correctly.',
            },
            {
              question: 'What Python type does each JSON type become?',
              answerOutline: 'object->dict, array->list, string->str, number->int/float, true/false->bool, null->None.',
            },
            {
              question: 'What happens to a dict with integer keys after json.dumps/loads?',
              answerOutline: 'JSON object keys must be strings, so the keys come back as strings; convert explicitly if needed.',
            },
            {
              question: 'How should a loader treat a malformed row?',
              answerOutline: 'Record the row number and reason, skip it (or fail fast if strict mode), and report a summary; never crash mid-file silently.',
            },
          ],
        },
        {
          slug: 'exceptions',
          title: 'Exceptions: raising, catching and designing for failure',
          summary:
            'How exceptions propagate, how to catch precisely, when to raise your own, and the try/except/else/finally structure.',
          estimatedMinutes: 90,
          objectives: [
            'Explain how an exception unwinds the call stack until a matching except is found',
            'Catch specific exception types and avoid bare except',
            'Raise built-in and custom exceptions with informative messages',
            'Use else and finally correctly and explain the EAFP vs LBYL styles',
          ],
          concepts: [
            'Exception propagation up the call stack',
            'try / except / else / finally',
            'Catching specific types; the exception hierarchy',
            'Bare except and why it is harmful',
            'raise, re-raise, raise from (chaining)',
            'Custom exception classes',
            'EAFP (easier to ask forgiveness) vs LBYL (look before you leap)',
            'Exceptions as part of a function contract',
          ],
          explanation: `When something goes wrong, Python **raises** an exception object. It then unwinds the call stack frame by frame looking for a \`try\` block whose \`except\` clause matches; if none is found, the program dies with the traceback you have been reading since lesson 1. So an exception raised deep inside \`parse_row\` can be handled in \`main\`, and everything between is skipped.

The structure is \`try:\` (code that may fail), \`except ValueError as e:\` (handle one kind), \`else:\` (runs only if no exception; keeps the try block small), \`finally:\` (always runs: cleanup). Catch the **most specific** type that you can actually handle. A bare \`except:\` or \`except Exception:\` that swallows everything hides bugs, including \`KeyboardInterrupt\` and typos in your own code; if you must catch broadly, log the exception and re-raise.

**Raise** when your function cannot fulfil its contract: \`raise ValueError(f"age must be non-negative, got {age}")\`. Choose the built-in type whose meaning matches (ValueError for bad values, TypeError for wrong types, KeyError/IndexError for missing items, FileNotFoundError) or define \`class ConfigError(Exception): pass\` so callers can catch your errors specifically. When you catch and re-raise a different exception, use \`raise NewError(...) from e\` to preserve the cause in the traceback.

Python style favours **EAFP**: try the operation and handle the exception, rather than checking preconditions first (which is racy for files and verbose for dicts). \`try: value = d[key] except KeyError:\` is idiomatic; so is \`int(s)\` inside a try. The exception types a function may raise are part of its documented contract; write them in the docstring.

Read the tutorial's errors chapter in full now, and Think Python's treatment; the exercises build a robust input layer around the CSV loader from the previous lesson.`,
          resources: [
            {
              title: 'The Python Tutorial — Errors and Exceptions',
              url: 'https://docs.python.org/3/tutorial/errors.html',
              type: 'documentation',
              cost: 'free',
              provider: 'Python Software Foundation',
              primary: true,
            },
            {
              title: 'Built-in Exceptions (hierarchy)',
              url: 'https://docs.python.org/3/library/exceptions.html',
              type: 'documentation',
              cost: 'free',
              provider: 'Python Software Foundation',
              note: 'The exception class tree at the bottom is worth printing out.',
            },
            {
              title: 'Think Python — Chapter 14 (catching exceptions) and Chapter 16-17 examples',
              url: 'https://allendowney.github.io/ThinkPython/chap14.html',
              type: 'textbook',
              cost: 'free',
              provider: 'Allen Downey',
            },
            {
              title: 'Practical Python Programming — 1.5 Exceptions',
              url: 'https://dabeaz-course.github.io/practical-python/',
              type: 'course',
              cost: 'free',
              provider: 'David Beazley',
            },
          ],
          exercises: [
            {
              slug: 'propagation-trace',
              title: 'Trace exception propagation',
              prompt:
                'Write a() calling b() calling c() where c raises ValueError. Put a try/except ValueError in b and show a() continues; move it to a() and show b is skipped; add a finally in c that prints, and show it runs in both cases. Then catch KeyError only in a() and observe the uncaught ValueError traceback.',
              kind: 'coding',
              difficulty: 1,
            },
            {
              slug: 'robust-input',
              title: 'Robust numeric input',
              prompt:
                'Write ask_float(prompt, lo, hi) that loops until the user enters a number in [lo, hi], handling ValueError for non-numbers, re-prompting on out-of-range values with a message, and returning None cleanly on Ctrl-D (EOFError) or Ctrl-C (KeyboardInterrupt). Test every path manually and document the behaviour in the docstring.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'custom-exceptions',
              title: 'Custom exceptions for a loader',
              prompt:
                'Define a hierarchy DataError -> (MissingFieldError, BadValueError). Rewrite the CSV validator from the previous lesson so parse_row raises these with the row number in the message; the caller catches DataError to collect errors and lets anything else propagate. Demonstrate raise ... from e when wrapping a ValueError from int().',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'bare-except-harm',
              title: 'Why bare except is harmful',
              prompt:
                'Write a loop that processes items inside try: ... except: pass, with a typo in the body (e.g. itme instead of item). Run it and observe that it silently does nothing. Replace with except ValueError and show the NameError surfaces. Write three sentences on the lesson.',
              kind: 'coding',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'What happens when an exception is raised and no except matches in the current function?',
              answerOutline: 'The frame is abandoned and the exception propagates to the caller, repeating until handled or the program terminates with a traceback.',
            },
            {
              question: 'When does the else clause of a try run?',
              answerOutline: 'Only when the try block completes without raising; it keeps code that should not be protected out of the try.',
            },
            {
              question: 'Why is except: pass dangerous?',
              answerOutline: 'It swallows every error including bugs and KeyboardInterrupt, hiding failures instead of handling them.',
            },
            {
              question: 'What is EAFP?',
              answerOutline: 'Try the operation and handle exceptions rather than pre-checking; idiomatic in Python and avoids race conditions.',
            },
          ],
        },
        {
          slug: 'command-line-programs',
          title: 'Command-line programs with argparse',
          summary:
            'Turn scripts into tools: arguments and options with argparse, exit codes, stdin/stdout piping, and the structure of a well-behaved CLI.',
          estimatedMinutes: 90,
          objectives: [
            'Parse positional arguments, options, flags and subcommands with argparse',
            'Read from stdin and write to stdout/stderr so your tool composes with pipes',
            'Return meaningful exit codes and print errors to stderr',
            'Structure a CLI as main(argv) -> int with logic in separate functions',
          ],
          concepts: [
            'sys.argv and why to use argparse instead',
            'Positional arguments, optional arguments, flags (store_true), types, defaults, choices',
            'Subcommands with add_subparsers',
            'Automatic --help',
            'stdin/stdout/stderr and Unix pipes',
            'Exit codes: 0 success, non-zero failure; sys.exit',
            'main(argv=None) -> int pattern for testability',
            'Logging vs printing',
          ],
          explanation: `A **command-line interface** turns your program into a tool others (and your future self) can run and script. The raw arguments arrive in \`sys.argv\`, but parsing them by hand is tedious and error-prone; the **argparse** module does it properly and generates \`--help\` for free. You declare a parser, add arguments (\`parser.add_argument("input", type=Path)\`; \`--limit\`, \`type=int\`, \`default=10\`; \`--verbose\`, \`action="store_true"\`; \`choices=[...]\`), call \`parse_args()\`, and get an object with attributes. **Subcommands** (\`tool add ...\`, \`tool list ...\`) are created with \`add_subparsers\` and are how git-style tools are built; your capstone needs them.

A well-behaved tool follows Unix conventions: read input from a file *or* from **stdin** when no file is given, write results to **stdout**, write diagnostics and errors to **stderr** (\`print(msg, file=sys.stderr)\`), and **exit** with 0 on success and a non-zero code on failure (\`sys.exit(2)\`, or return the code from main). This is what lets \`cat data.csv | python tool.py summarise | sort\` work and lets a shell script detect failure.

Structure the program as \`def main(argv=None) -> int\`, which builds the parser, parses \`argv\` (defaulting to \`sys.argv[1:]\`), calls the pure functions, handles their exceptions by printing a message to stderr and returning a code, and is invoked by the main guard with \`sys.exit(main())\`. Because \`main\` takes \`argv\` as a parameter, tests can call \`main(["summarise", "x.csv"])\` without touching the real command line.

Use the \`logging\` module for diagnostics controlled by \`--verbose\` rather than scattering prints. Read the argparse tutorial first (it is a walkthrough), then the reference; Beazley's course has a good section on scripts.`,
          resources: [
            {
              title: 'Argparse Tutorial',
              url: 'https://docs.python.org/3/howto/argparse.html',
              type: 'documentation',
              cost: 'free',
              provider: 'Python Software Foundation',
              primary: true,
            },
            {
              title: 'argparse — Parser for command-line options, arguments and subcommands',
              url: 'https://docs.python.org/3/library/argparse.html',
              type: 'documentation',
              cost: 'free',
              provider: 'Python Software Foundation',
            },
            {
              title: 'The Missing Semester of Your CS Education — The Shell',
              url: 'https://missing.csail.mit.edu/',
              type: 'course',
              cost: 'free',
              provider: 'MIT',
              note: 'Lectures 1-2 on the shell, pipes and redirection make the stdin/stdout model concrete.',
            },
            {
              title: 'logging HOWTO',
              url: 'https://docs.python.org/3/howto/logging.html',
              type: 'documentation',
              cost: 'free',
              provider: 'Python Software Foundation',
            },
          ],
          exercises: [
            {
              slug: 'wc-clone',
              title: 'A wc clone',
              prompt:
                'Write pywc.py that counts lines, words and characters of one or more files, or of stdin when no file is given, with flags -l, -w, -c selecting which counts to print (all by default), and a final total line when several files are given. Verify against the real wc on three files, and that echo "a b" | python pywc.py -w prints 2. Exit 1 with a stderr message if a file does not exist, but still process the others.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'subcommands',
              title: 'A todo tool with subcommands',
              prompt:
                'Build todo.py with subcommands add TEXT, list [--all], done ID and remove ID, storing items in a JSON file whose path can be overridden with --file. Each subcommand maps to a function that takes plain Python arguments. Check that --help and todo.py add --help both print useful text, and that an unknown ID exits with code 2 and a stderr message.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'pipeline-test',
              title: 'Compose with pipes',
              prompt:
                'Write filter_csv.py --column NAME --min VALUE that reads CSV from stdin and writes matching rows as CSV to stdout. Chain: cat data.csv | python filter_csv.py --column mass --min 1 | python pywc.py -l. Measure how long the pipeline takes on a 100k-row file and whether memory stays flat (it should: stream, do not read all).',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why print errors to stderr and results to stdout?',
              answerOutline: 'So results can be piped or redirected cleanly while diagnostics still reach the user; mixing them corrupts downstream input.',
            },
            {
              question: 'What does an exit code of 0 mean and how do you set a different one?',
              answerOutline: 'Success; sys.exit(n) or returning n from main passed to sys.exit signals failure to the shell.',
            },
            {
              question: 'Why should main take argv as a parameter?',
              answerOutline: 'Tests can pass argument lists directly without manipulating sys.argv or spawning processes.',
            },
          ],
        },
      ],
      project: {
        slug: 'csv-toolkit',
        title: 'Module project: a CSV toolkit',
        description:
          'Build csvtool, a command-line program with subcommands head, describe (per-column count, missing, min, max, mean for numeric columns), filter (--where column op value), select (columns), sort (--by column, --desc) and to-json. It must stream where possible, validate rows, report errors to stderr with line numbers, and compose through pipes. Test it on the NASA Exoplanet Archive CSV and on a file you corrupt on purpose.',
        deliverables: [
          'csvtool.py with a main(argv) -> int entry point and pure functions for every operation',
          'A transcript showing each subcommand and a piped combination with the real wc/sort',
          'A list of 10 malformed inputs and the exact message and exit code each produces',
        ],
        estimatedHours: 8,
      },
    },
    {
      slug: 'objects-and-abstraction',
      title: 'Objects and Abstraction',
      description:
        'Design your own types: classes with state and behaviour, dataclasses for records, special methods, inheritance and composition, and the idea of an interface.',
      lessons: [
        {
          slug: 'classes-and-objects',
          title: 'Classes and objects',
          summary:
            'Define a class, create instances, understand self and __init__, and see why bundling data with the functions that operate on it clarifies programs.',
          estimatedMinutes: 100,
          objectives: [
            'Define a class with __init__ and methods and create instances with distinct state',
            'Explain what self is and how method calls are translated',
            'Distinguish instance attributes from class attributes and predict sharing behaviour',
            'Decide what state and behaviour belong together in a class',
          ],
          concepts: [
            'Class as a template; instance as an object made from it',
            '__init__ and instance attributes',
            'self: the instance passed implicitly',
            'Methods vs functions; obj.method(x) == Class.method(obj, x)',
            'Class attributes and the shared-mutable trap',
            '__repr__ and __str__ for readable objects',
            'Objects are mutable and aliased like lists',
            'Encapsulation by convention (_private)',
          ],
          explanation: `So far data (dicts, tuples) and the functions that use it have lived apart, and every function had to know the layout of the data. A **class** brings them together: it defines a new type whose instances carry **state** (attributes) and **behaviour** (methods). \`class Account:\` with \`def __init__(self, owner, balance=0):\` describes how to build an account; \`acct = Account("ada", 100)\` creates an instance; \`acct.deposit(50)\` calls a method on it.

**self** is nothing magical: \`acct.deposit(50)\` is translated to \`Account.deposit(acct, 50)\`. The method's first parameter receives the instance so the body can read and modify *that* object's attributes with \`self.balance\`. Forgetting \`self\` in a method signature or in an attribute reference produces the two most common class errors; both have readable tracebacks.

Attributes created on \`self\` are **instance attributes**, distinct per object. Names assigned in the class body are **class attributes**, shared by all instances; a mutable class attribute (\`items = []\`) is the \`[[0]*3]*3\` trap in a new costume. Use class attributes for constants and defaults only.

Give every class a \`__repr__\` returning something like \`Account(owner='ada', balance=150)\`; it makes debugging and test failures readable. Instances are ordinary mutable objects: two names can alias one instance, and passing an instance to a function lets the function mutate it. Python has no enforced privacy; a leading underscore (\`_balance\`) means "do not touch from outside", by convention.

Design question: what belongs in a class? State that must stay consistent (a balance and its transaction history) together with the operations that keep it consistent. Read Think Python chapters 15-16 and Composing Programs 2.5; the exercises grow a class from a dict and show what is gained.`,
          resources: [
            {
              title: 'Think Python — Chapter 15: Classes and Objects, Chapter 16: Classes and Functions',
              url: 'https://allendowney.github.io/ThinkPython/chap15.html',
              type: 'textbook',
              cost: 'free',
              provider: 'Allen Downey',
              primary: true,
            },
            {
              title: 'Composing Programs — 2.5 Object-Oriented Programming',
              url: 'https://www.composingprograms.com/pages/25-object-oriented-programming.html',
              type: 'textbook',
              cost: 'free',
              provider: 'John DeNero (UC Berkeley CS61A)',
              note: 'The clearest account of how method calls, self and class attributes actually work.',
            },
            {
              title: 'The Python Tutorial — Classes',
              url: 'https://docs.python.org/3/tutorial/classes.html',
              type: 'documentation',
              cost: 'free',
              provider: 'Python Software Foundation',
            },
          ],
          exercises: [
            {
              slug: 'dict-to-class',
              title: 'From a dict to a class',
              prompt:
                'Start with functions deposit(acct_dict, amt) and withdraw(acct_dict, amt) over a dict {"owner":..., "balance":..., "history":[]}. Convert to class Account with the same behaviour, a __repr__, and a rule that withdraw raises ValueError on insufficient funds. Write a short script creating three accounts and transferring between them; verify total money is conserved (sum of balances unchanged).',
              kind: 'coding',
              difficulty: 1,
            },
            {
              slug: 'class-attribute-trap',
              title: 'The shared class attribute trap',
              prompt:
                'Define class Team with a class attribute members = [] and a method add(name) that appends. Create two teams, add to one, print both. Explain the output, fix by creating the list in __init__, and show the difference with id().',
              kind: 'coding',
              difficulty: 1,
            },
            {
              slug: 'vector-class',
              title: 'A 2D vector class',
              prompt:
                'Implement Vector2 with x, y; methods add, scale, dot, norm; and __repr__. Verify Vector2(3,4).norm() == 5.0 and that a.add(b) returns a new vector without modifying a (test by printing a before and after). Then write a function that takes a list of vectors and returns the one with the largest norm.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'self-errors',
              title: 'Produce and fix the self errors',
              prompt:
                'Write a method without self in the signature and call it; then reference an attribute as balance instead of self.balance. Record both tracebacks, explain each with the obj.method(x) -> Class.method(obj, x) rule, and fix them.',
              kind: 'coding',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'What is self and who supplies it?',
              answerOutline: 'The instance the method was called on; Python passes it automatically when you call obj.method(...).',
            },
            {
              question: 'What is the difference between an instance attribute and a class attribute?',
              answerOutline: 'Instance attributes are set on self and are per object; class attributes are set in the class body and shared by all instances.',
            },
            {
              question: 'Why define __repr__?',
              answerOutline: 'So printing, debugging and test failure messages show the object state instead of <Account object at 0x...>.',
            },
          ],
        },
        {
          slug: 'dataclasses-and-special-methods',
          title: 'Dataclasses and special methods',
          summary:
            'Let Python write the boilerplate with @dataclass, then customise behaviour with __eq__, __lt__, __add__, __len__, __iter__ and friends so your objects work with built-in operators.',
          estimatedMinutes: 90,
          objectives: [
            'Define records with @dataclass including defaults, field(default_factory), frozen and ordering',
            'Implement special methods so objects support ==, <, +, len(), iteration and indexing',
            'Explain how operators dispatch to dunder methods and what NotImplemented means',
            'Choose between a plain class, a dataclass, a namedtuple and a dict for a record',
          ],
          concepts: [
            '@dataclass: generated __init__, __repr__, __eq__',
            'field(default_factory=list) for mutable defaults',
            'frozen=True and hashability; order=True',
            'Dunder methods: __eq__, __lt__, __hash__, __add__, __mul__, __len__, __getitem__, __iter__, __contains__',
            'Operator dispatch and NotImplemented',
            'namedtuple as a lightweight alternative',
            'Value objects vs entities',
            'The data model (Python reference)',
          ],
          explanation: `Most classes are **records**: a few named fields, an \`__init__\` that stores them, a \`__repr__\`, and equality by value. Writing that by hand is tedious and error-prone, so Python provides **dataclasses**: decorate a class with \`@dataclass\`, declare fields with type annotations (\`name: str\`, \`mass: float = 0.0\`), and \`__init__\`, \`__repr__\` and \`__eq__\` are generated. For a mutable default use \`field(default_factory=list)\` (the mutable-default rule again). \`frozen=True\` makes instances immutable and therefore hashable (usable as dict keys), and \`order=True\` generates comparisons field by field.

Behind this are Python's **special methods** ("dunders"). Every operator and built-in function dispatches to one: \`a == b\` calls \`a.__eq__(b)\`, \`a < b\` calls \`__lt__\`, \`a + b\` calls \`__add__\` (and if that returns \`NotImplemented\`, tries \`b.__radd__(a)\`), \`len(x)\` calls \`__len__\`, \`x[i]\` calls \`__getitem__\`, \`for v in x\` calls \`__iter__\`, \`v in x\` calls \`__contains__\`, \`print(x)\` calls \`__str__\` falling back to \`__repr__\`. Implementing these makes your types feel built-in: a \`Vector\` that supports \`+\` and \`*\`, a \`Polynomial\` you can evaluate with \`p(x)\` via \`__call__\`, a \`Deck\` you can index and iterate.

Two rules keep this sane. If you define \`__eq__\` you must think about \`__hash__\` (dataclasses handle it: eq without frozen sets \`__hash__\` to None). And return \`NotImplemented\` (not raise) from binary operators when the other operand is of a type you do not know, so Python can try the reflected operation.

When to use what: a dict for ad-hoc data crossing a boundary (JSON), a \`namedtuple\` or frozen dataclass for small immutable values, a dataclass for records with behaviour, a hand-written class when construction is complex. Read the dataclasses docs and the Data Model chapter sections listed; the exercises build operator-aware classes and measure what dataclass generates.`,
          resources: [
            {
              title: 'dataclasses — Data Classes',
              url: 'https://docs.python.org/3/library/dataclasses.html',
              type: 'documentation',
              cost: 'free',
              provider: 'Python Software Foundation',
              primary: true,
            },
            {
              title: 'Python Data Model (language reference, section 3.3 Special method names)',
              url: 'https://docs.python.org/3/reference/datamodel.html#special-method-names',
              type: 'documentation',
              cost: 'free',
              provider: 'Python Software Foundation',
              note: 'Dense; read the subsections on rich comparison, emulating numeric types and container types.',
            },
            {
              title: 'Think Python — Chapter 17: Classes and Methods (operator overloading)',
              url: 'https://allendowney.github.io/ThinkPython/chap17.html',
              type: 'textbook',
              cost: 'free',
              provider: 'Allen Downey',
            },
            {
              title: 'Composing Programs — 2.7 Object Abstraction (special methods)',
              url: 'https://www.composingprograms.com/pages/27-object-abstraction.html',
              type: 'textbook',
              cost: 'free',
              provider: 'John DeNero (UC Berkeley CS61A)',
            },
          ],
          exercises: [
            {
              slug: 'dataclass-records',
              title: 'Records as dataclasses',
              prompt:
                'Define @dataclass(frozen=True, order=True) class Planet(name: str, mass: float, period: float). Load the exoplanet CSV into a list of Planet, sort them, put them in a set to de-duplicate, and use one as a dict key. Then try to assign p.mass = 1 and record the error. Print dataclasses.fields(Planet) and explain what was generated.',
              kind: 'coding',
              difficulty: 1,
            },
            {
              slug: 'vector-operators',
              title: 'Operators for Vector2',
              prompt:
                'Extend Vector2 (or write it as a dataclass) with __add__, __sub__, __mul__ (scalar), __rmul__, __neg__, __eq__, __abs__ (norm) and __iter__ (so x, y = v works). Verify 2 * v == v * 2, abs(Vector2(3,4)) == 5, and that v + "a" raises TypeError (return NotImplemented). Write 10 assertions covering the identities a + b == b + a and -(-a) == a.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'polynomial-class',
              title: 'A Polynomial class',
              prompt:
                'Implement Polynomial from a list of coefficients with __call__(x) for evaluation (Horner scheme), __add__, __mul__, __repr__ printing like 3x^2 - x + 2, and derivative(). Verify (x+1)*(x-1) == Polynomial([-1, 0, 1]) and that p(2) == 7 for p = x^2 + x + 1. Compare evaluation time of Horner vs naive powers for degree 1000 polynomials.',
              kind: 'coding',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'What does @dataclass generate by default?',
              answerOutline: '__init__ from the annotated fields, __repr__, and __eq__ comparing fields in order; optionally ordering and hashing.',
            },
            {
              question: 'What happens when a + b is evaluated and a.__add__ returns NotImplemented?',
              answerOutline: 'Python tries b.__radd__(a); if that also fails, TypeError is raised.',
            },
            {
              question: 'Why does a frozen dataclass become hashable?',
              answerOutline: 'Its fields cannot change, so a hash derived from them is stable; mutable objects with value equality cannot safely be hashed.',
            },
            {
              question: 'When would you pick a dict over a dataclass?',
              answerOutline: 'For loosely structured data crossing a boundary (JSON, config) where keys are not fixed; use a dataclass when the shape is fixed and behaviour is attached.',
            },
          ],
        },
        {
          slug: 'inheritance-and-polymorphism',
          title: 'Inheritance and polymorphism',
          summary:
            'Subclassing, overriding, super(), and duck typing: how different objects can be used through the same interface, and when inheritance is the wrong tool.',
          estimatedMinutes: 90,
          objectives: [
            'Define a subclass that overrides and extends a method using super()',
            'Explain polymorphism and duck typing with examples from the standard library',
            'Describe the is-a test and the Liskov idea in plain terms',
            'Recognise inheritance misuse and prefer composition or a shared function',
          ],
          concepts: [
            'class Child(Parent); method resolution',
            'Overriding and extending with super().__init__',
            'Polymorphism: same call, different behaviour',
            'Duck typing: if it has the method, it works',
            'isinstance and when not to use it',
            'Abstract base classes (abc) and the template method',
            'Liskov substitution (informal)',
            'Inheritance hierarchies that go wrong',
          ],
          explanation: `**Inheritance** lets a class reuse and specialise another: \`class SavingsAccount(Account)\` gets everything \`Account\` has and can **override** methods (\`withdraw\` with a limit) or **extend** them by calling the parent's version with \`super().withdraw(amount)\`. \`super().__init__(...)\` in the child's \`__init__\` is nearly mandatory; forgetting it leaves the parent's attributes unset.

The payoff is **polymorphism**: code written against \`Account\` works unchanged on any subclass, because \`acct.withdraw(10)\` dispatches to whichever \`withdraw\` the object's class defines. Python goes further with **duck typing**: no inheritance is needed at all; if an object has a \`read()\` method, \`json.load\` will happily use it, which is why a file, a socket and an \`io.StringIO\` all work. Checking \`isinstance\` before calling is usually a smell; call the method and let it fail if unsupported.

Inheritance is easy to misuse. The test is **is-a**: a square is-a shape, fine; a stack is-not-a list, so \`class Stack(list)\` leaks \`insert\` and indexing that a stack should not have. The informal **Liskov** rule: anywhere a parent works, a child must work without surprises; a subclass that throws where the parent did not, or ignores arguments, breaks callers. When you want to *reuse* an implementation rather than *be* the type, hold the object as an attribute instead (composition, next lesson).

The \`abc\` module lets you declare an **abstract base class** with methods subclasses must implement, which documents an interface and fails fast. Read Think Python chapter 18 and Composing Programs 2.5 (inheritance sections); the shapes exercise is the classic illustration and the stack exercise shows the misuse.`,
          resources: [
            {
              title: 'Think Python — Chapter 18: Inheritance',
              url: 'https://allendowney.github.io/ThinkPython/chap18.html',
              type: 'textbook',
              cost: 'free',
              provider: 'Allen Downey',
              primary: true,
            },
            {
              title: 'Composing Programs — 2.5.5 Inheritance through 2.5.8 Multiple Inheritance',
              url: 'https://www.composingprograms.com/pages/25-object-oriented-programming.html',
              type: 'textbook',
              cost: 'free',
              provider: 'John DeNero (UC Berkeley CS61A)',
            },
            {
              title: 'The Python Tutorial — Inheritance',
              url: 'https://docs.python.org/3/tutorial/classes.html#inheritance',
              type: 'documentation',
              cost: 'free',
              provider: 'Python Software Foundation',
            },
            {
              title: 'abc — Abstract Base Classes',
              url: 'https://docs.python.org/3/library/abc.html',
              type: 'documentation',
              cost: 'free',
              provider: 'Python Software Foundation',
            },
          ],
          exercises: [
            {
              slug: 'shapes',
              title: 'Shapes with an abstract base',
              prompt:
                'Define abstract Shape with area() and perimeter(); implement Circle, Rectangle and Triangle (Heron). Write total_area(shapes) that works on any mix. Verify total_area([Circle(1), Rectangle(2,3)]) is close to 9.1416. Show that instantiating Shape() raises TypeError and that a class missing perimeter() cannot be instantiated.',
              kind: 'coding',
              difficulty: 1,
            },
            {
              slug: 'savings-account',
              title: 'Override and extend',
              prompt:
                'Subclass Account as SavingsAccount with an interest rate, add_interest(), and a withdraw() that calls super().withdraw after checking a monthly withdrawal limit of 3. Verify the 4th withdrawal in a month raises, and that a function that takes a list of Account and sums balances works with mixed types without isinstance.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'stack-is-not-a-list',
              title: 'Why Stack(list) is wrong',
              prompt:
                'Implement Stack by subclassing list, then implement it again holding a private list (composition). Show that the first allows s.insert(0, x) and s[0], violating the stack contract, while the second does not. Write a paragraph applying the is-a test.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'duck-typing-stringio',
              title: 'Duck typing with file-like objects',
              prompt:
                'Write summarise(f) that reads lines from any file-like object. Call it with an open file, io.StringIO("a\\nb\\n"), and sys.stdin. Then write a tiny class with only a readline/__iter__ method and show summarise works on it too, with no inheritance.',
              kind: 'coding',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'What does super() give you and why call super().__init__?',
              answerOutline: 'Access to the parent class implementation; the parent initialiser sets up the attributes the child relies on.',
            },
            {
              question: 'What is duck typing?',
              answerOutline: 'Suitability is determined by the methods an object has, not its class; any object with the right methods works.',
            },
            {
              question: 'Give an example where inheritance is the wrong choice.',
              answerOutline: 'Stack(list): a stack is not a list; it inherits operations that break its contract. Use composition.',
            },
          ],
        },
        {
          slug: 'composition-interfaces-and-design',
          title: 'Composition, interfaces and designing a small system',
          summary:
            'Build larger behaviour from small objects that hold other objects, define interfaces with protocols and ABCs, and apply a few design principles to a multi-class program.',
          estimatedMinutes: 100,
          objectives: [
            'Design a small system (4-6 classes) using composition and explain the responsibilities of each class',
            'Define an interface with typing.Protocol or an ABC and swap implementations',
            'Apply single responsibility and dependency injection to make classes testable',
            'Explain when a plain function is better than a class',
          ],
          concepts: [
            'Composition: has-a relationships',
            'Interfaces: ABC vs typing.Protocol (structural)',
            'Dependency injection for testability',
            'Single responsibility principle',
            'Strategy pattern as passing an object or a function',
            'Type hints as documentation',
            'When not to write a class',
            'Separating domain logic from I/O',
          ],
          explanation: `**Composition** builds objects out of other objects: a \`Library\` has a list of \`Book\`s and a \`Catalogue\`; an \`Order\` has \`LineItem\`s and a \`PaymentMethod\`. Each part has one job, and the whole delegates. Compared with inheritance, composition is flexible (swap the part at run time), explicit (you can see the parts) and does not leak interface. The guideline *prefer composition over inheritance* exists because most reuse is has-a, not is-a.

An **interface** names what a part must be able to do without saying how. Python offers two forms: an abstract base class (nominal: subclasses declare they implement it) and \`typing.Protocol\` (structural: anything with the right methods qualifies, which is duck typing made checkable). Define \`class Storage(Protocol): def save(self, items) -> None: ...; def load(self) -> list: ...\`, then write \`JsonStorage\`, \`CsvStorage\` and, crucially, \`MemoryStorage\` for tests.

That last point is **dependency injection**: instead of a class creating its own collaborators (\`self.storage = JsonStorage("todo.json")\`), it receives them (\`def __init__(self, storage: Storage)\`). Now the core logic can be tested with in-memory fakes, swapped to a database later, and reasoned about in isolation. It is the single most valuable design habit for the testing module ahead.

**Type hints** (\`def total(items: list[LineItem]) -> float\`) do not change behaviour but document contracts and let tools (mypy, your editor) catch mistakes. Use them on public functions from now on.

And a warning: not everything is a class. A function that takes data and returns data needs no class; a class with one method and no state is a function in disguise. Classes earn their place when state and the operations that keep it consistent belong together. Read the Protocol docs and the Composing Programs sections, then design the system in the exercises on paper before coding.`,
          resources: [
            {
              title: 'typing — Protocols (structural subtyping)',
              url: 'https://docs.python.org/3/library/typing.html#typing.Protocol',
              type: 'documentation',
              cost: 'free',
              provider: 'Python Software Foundation',
              primary: true,
            },
            {
              title: 'Composing Programs — 2.4 Mutable Data (dispatch, message passing) and 2.9 Recursive Objects',
              url: 'https://www.composingprograms.com/pages/24-mutable-data.html',
              type: 'textbook',
              cost: 'free',
              provider: 'John DeNero (UC Berkeley CS61A)',
            },
            {
              title: 'Practical Python Programming — Section 4 (Classes and objects) and Section 5 (Inner workings)',
              url: 'https://dabeaz-course.github.io/practical-python/',
              type: 'course',
              cost: 'free',
              provider: 'David Beazley',
            },
            {
              title: 'mypy documentation — Getting started',
              url: 'https://mypy.readthedocs.io/en/stable/getting_started.html',
              type: 'documentation',
              cost: 'free',
              provider: 'mypy',
              note: 'Run mypy on the exercises to see type hints checked.',
            },
          ],
          exercises: [
            {
              slug: 'library-system',
              title: 'Design a library system',
              prompt:
                'On paper, design classes for a lending library: Book, Member, Loan, Library and a Storage protocol. List each class responsibilities in one line and the methods. Then implement: a member can borrow up to 3 books, overdue loans incur a fee computed by a pluggable FeePolicy (flat vs per-day). Write a script that exercises every rule and checks totals.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'swap-storage',
              title: 'Swap storage implementations',
              prompt:
                'Implement MemoryStorage, JsonStorage and CsvStorage satisfying the Storage protocol, and inject each into the todo tool from module 4. Show that the todo logic code does not change, that the same scenario produces identical state in all three, and run mypy to confirm the protocol is satisfied.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'strategy-functions',
              title: 'Strategies as functions versus objects',
              prompt:
                'Implement a Sorter that takes a comparison strategy as (a) a callable key function and (b) a Strategy object with a key() method. Use both to sort records by name, by age and by a composite. Write two paragraphs on when the function form suffices and when the object form adds value (state, several related methods).',
              kind: 'writing',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What is the difference between an ABC and a Protocol?',
              answerOutline: 'ABC: nominal, classes subclass it explicitly. Protocol: structural, any class with matching methods conforms; checked by type checkers.',
            },
            {
              question: 'What is dependency injection and why does it help testing?',
              answerOutline: 'Collaborators are passed in rather than created inside; tests pass fakes (in-memory storage) so logic runs without files or networks.',
            },
            {
              question: 'When should you not write a class?',
              answerOutline: 'When there is no state to keep consistent; a function taking and returning data is simpler and easier to test.',
            },
            {
              question: 'Why prefer composition over inheritance?',
              answerOutline: 'Parts can be swapped, responsibilities stay explicit, and the interface of the whole is not polluted by the parts.',
            },
          ],
        },
      ],
      project: {
        slug: 'inventory-simulation',
        title: 'Module project: an inventory and order simulation',
        description:
          'Model a small shop: Product (dataclass), Inventory (composition over a dict of products with stock levels), Order with LineItems and a pluggable PricingPolicy (plain, bulk discount, member discount), and a Storage protocol with JSON and in-memory implementations. Simulate 1000 random orders, enforce stock constraints with exceptions, and report revenue per policy.',
        deliverables: [
          'A package with at least five classes, a Protocol and two policy implementations',
          'A simulation script that prints revenue and stock-out counts for each pricing policy over the same random seed',
          'mypy passing on the package with type hints on all public methods',
        ],
        estimatedHours: 8,
      },
    },
    {
      slug: 'testing-debugging-tooling',
      title: 'Testing, Debugging and Tooling',
      description:
        'The professional habits: automated tests with pytest, a real debugger, isolated environments, version control with git, and consistent style enforced by tools.',
      lessons: [
        {
          slug: 'pytest-basics',
          title: 'Automated testing with pytest',
          summary:
            'Write tests as functions with assert, run them with pytest, and learn what a good test looks like: one behaviour, clear name, independent of other tests.',
          estimatedMinutes: 100,
          objectives: [
            'Write and run pytest tests with plain assert and read a failure report',
            'Test error paths with pytest.raises and floats with pytest.approx',
            'Organise tests in a tests/ directory that imports the code under test',
            'Explain what makes a test valuable: specific, fast, independent, readable',
          ],
          concepts: [
            'Test function naming test_*; assert rewriting',
            'pytest discovery and running a subset (-k, file::test)',
            'Arrange, act, assert',
            'pytest.raises and pytest.approx',
            'Testing pure functions vs I/O',
            'Regression tests from bugs',
            'Test independence and determinism',
            'Coverage as a (limited) signal',
          ],
          explanation: `A **test** is code that runs your code with known inputs and checks the outputs. Until now you have done this by hand in the REPL and forgotten the results; **pytest** makes it permanent and runs all of it in seconds. A test is a function named \`test_something\` in a file named \`test_*.py\` that uses plain \`assert\`: \`assert median([1, 3, 2]) == 2\`. Run \`pytest\` in the project directory and it discovers and runs every test, printing a clear report with the values on both sides of a failing assert (pytest rewrites assertions to show them).

Structure each test as **arrange, act, assert**: set up inputs, call the function, check the result. One behaviour per test, named for the behaviour: \`test_median_of_even_length_averages_middle_two\`. When a test fails, the name should tell you what is broken. Tests must be **independent** (any order, any subset) and **deterministic** (no randomness without a seed, no reliance on the clock or network).

Two helpers you need immediately: \`with pytest.raises(ValueError):\` to assert that an error path fires, and \`pytest.approx(0.3)\` to compare floats with tolerance. For functions that read files, keep the logic pure (parse a string, not a path) so most tests need no files; the next lesson covers fixtures for the rest.

Every bug you fix gets a **regression test** that reproduces it first and passes after; this is how a codebase stops re-breaking. A coverage tool (\`pytest --cov\`) reports which lines ran; low coverage is a warning, high coverage is not proof.

Install pytest into a virtual environment (lesson 3 of this module covers that properly; for now \`pip install pytest\`), read the Getting Started page, and convert the manual checks from earlier exercises into tests. You will find bugs.`,
          resources: [
            {
              title: 'pytest — Get Started',
              url: 'https://docs.pytest.org/en/stable/getting-started.html',
              type: 'documentation',
              cost: 'free',
              provider: 'pytest',
              primary: true,
            },
            {
              title: 'pytest — How to write and report assertions',
              url: 'https://docs.pytest.org/en/stable/how-to/assert.html',
              type: 'documentation',
              cost: 'free',
              provider: 'pytest',
            },
            {
              title: 'CS50P — Unit Tests (Lecture 5)',
              url: 'https://cs50.harvard.edu/python/',
              type: 'lecture',
              cost: 'free',
              provider: 'Harvard',
              note: 'Lecture 5 covers pytest from scratch with the same approach as this lesson.',
            },
            {
              title: 'Practical Python Programming — 8.2 Testing',
              url: 'https://dabeaz-course.github.io/practical-python/',
              type: 'course',
              cost: 'free',
              provider: 'David Beazley',
            },
          ],
          exercises: [
            {
              slug: 'tests-for-earlier-work',
              title: 'Write tests for earlier functions',
              prompt:
                'Create tests/test_numbers.py covering is_prime, nth_prime, digit_sum, collatz_steps and the statistics functions from earlier modules: at least 20 tests including boundaries (0, 1, 2, negative inputs) and error cases with pytest.raises. Run pytest -v. Record any bug the tests reveal, fix it, and keep the test that found it.',
              kind: 'coding',
              difficulty: 1,
            },
            {
              slug: 'read-a-failure',
              title: 'Read a failure report',
              prompt:
                'Write a test that asserts median([1, 2, 3, 4]) == 2 (wrong on purpose). Run pytest and copy the report. Identify the line that failed, the two values pytest shows, and the file:line pointer. Fix the expectation (2.5) and run pytest -k median to run only that test.',
              kind: 'coding',
              difficulty: 1,
            },
            {
              slug: 'float-and-error-tests',
              title: 'Floats and error paths',
              prompt:
                'Test the Newton square root from module 2 with pytest.approx for inputs 2, 1e-6, 1e12 (relative tolerance 1e-9), and test that it raises ValueError for negative input (add that behaviour if missing). Then test that quadratic_roots returns None for a negative discriminant and that roots are returned sorted.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'regression-test',
              title: 'Regression test from a bug',
              prompt:
                'Take the CSV validator and deliberately reintroduce a bug (e.g. off-by-one in the reported line number). Write a test that fails because of it, then fix the bug and show the test passing. Commit the test with a message naming the bug (git comes two lessons later; if you are not set up yet, keep a changelog file).',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'How does pytest find tests?',
              answerOutline: 'Files matching test_*.py or *_test.py, functions prefixed test_, classes prefixed Test; run from the project root.',
            },
            {
              question: 'Why must tests be independent and deterministic?',
              answerOutline: 'So they can run in any order or subset and a failure means the code is wrong, not that another test or the environment changed.',
            },
            {
              question: 'How do you test that a function raises?',
              answerOutline: 'with pytest.raises(ExceptionType): call(); optionally match= on the message.',
            },
            {
              question: 'What does 100% coverage prove?',
              answerOutline: 'Only that every line executed; not that the assertions are meaningful or that all input combinations were checked.',
            },
          ],
        },
        {
          slug: 'fixtures-parametrize-and-test-design',
          title: 'Fixtures, parametrisation and designing testable code',
          summary:
            'Remove duplication with fixtures and parametrize, test file I/O with tmp_path, fake dependencies, and write code that is easy to test in the first place.',
          estimatedMinutes: 100,
          objectives: [
            'Use @pytest.mark.parametrize to run one test over many input/expected pairs',
            'Write fixtures for shared setup and use the built-in tmp_path and monkeypatch fixtures',
            'Test I/O code by separating parsing from file access and by injecting fakes',
            'Explain test-driven development and try it on a small function',
          ],
          concepts: [
            'parametrize: table-driven tests',
            'Fixtures: setup shared across tests, scope',
            'tmp_path for file tests; monkeypatch for environment and attributes',
            'Fakes and stubs via dependency injection',
            'Testing a CLI through main(argv) and capsys',
            'Test-driven development loop: red, green, refactor',
            'Edge cases: empty, one, many, huge, invalid',
            'Property-based testing (Hypothesis) as a glimpse',
          ],
          explanation: `Once you have twenty tests, duplication appears. **Parametrisation** turns a table of cases into one test: \`@pytest.mark.parametrize("year, expected", [(1900, False), (2000, True), (2024, True)])\` runs the test body once per row and reports each separately. This is the natural form for the decision tables you wrote in module 2.

**Fixtures** provide shared setup: a function decorated with \`@pytest.fixture\` returns an object, and any test that names it as a parameter receives a fresh one. pytest ships useful fixtures: \`tmp_path\` gives a unique temporary directory, so file-writing code can be tested without touching real files or leaving litter; \`monkeypatch\` temporarily replaces attributes or environment variables; \`capsys\` captures stdout so you can test \`main(["--help"])\` output.

The deeper skill is **writing testable code**. Three rules: separate the pure computation from I/O (parse a string, return data; a tiny wrapper opens the file); inject dependencies (a \`Storage\` object, a clock function) so tests pass fakes; and keep functions small with explicit inputs and outputs. If a function is hard to test, that is design feedback, not a reason for a heroic test.

**Test-driven development** inverts the order: write the failing test (red), write the minimum code to pass (green), clean up (refactor). It is not always appropriate, but on well-defined functions it produces better interfaces because you design the call before the implementation. Try it in the exercises and notice how it changes your choices.

Finally, think systematically about **edge cases**: empty input, a single element, many elements, enormous values, invalid types, unicode. Property-based testing with Hypothesis generates these for you; the stretch exercise gives a taste. Read the pytest how-to pages on fixtures and parametrize, and the fixtures reference for tmp_path and monkeypatch.`,
          resources: [
            {
              title: 'pytest — How to parametrize fixtures and test functions',
              url: 'https://docs.pytest.org/en/stable/how-to/parametrize.html',
              type: 'documentation',
              cost: 'free',
              provider: 'pytest',
              primary: true,
            },
            {
              title: 'pytest — How to use fixtures',
              url: 'https://docs.pytest.org/en/stable/how-to/fixtures.html',
              type: 'documentation',
              cost: 'free',
              provider: 'pytest',
            },
            {
              title: 'pytest — tmp_path, monkeypatch and capsys (built-in fixtures reference)',
              url: 'https://docs.pytest.org/en/stable/reference/fixtures.html',
              type: 'documentation',
              cost: 'free',
              provider: 'pytest',
            },
            {
              title: 'Hypothesis — property-based testing for Python',
              url: 'https://hypothesis.readthedocs.io/en/latest/',
              type: 'documentation',
              cost: 'free',
              provider: 'Hypothesis',
              note: 'Read the quick start only; it is the stretch exercise.',
            },
          ],
          exercises: [
            {
              slug: 'parametrize-tables',
              title: 'Convert decision tables to parametrised tests',
              prompt:
                'Rewrite the leap-year, grade-band and triangle tests as parametrised tests with at least 8 rows each, using ids= so the report names each case. Run pytest -v and confirm the number of collected tests equals the sum of rows.',
              kind: 'coding',
              difficulty: 1,
            },
            {
              slug: 'tmp-path-io',
              title: 'Test file I/O with tmp_path',
              prompt:
                'Test the CSV validator and the todo storage with tmp_path: write a small CSV into the temp directory, load it, assert the counts; save todos to tmp_path/"t.json", reload, assert equality. Then test that a missing file raises FileNotFoundError (or your custom error). Confirm no files remain in your project after the run.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'tdd-roman',
              title: 'Test-driven Roman numerals',
              prompt:
                'Using strict TDD (write one failing test, make it pass, refactor, repeat), implement to_roman(n) for 1-3999 and from_roman(s). Keep a log of each red/green step. Finish with a parametrised round-trip test over all 3999 values and a test that from_roman("IIII") raises ValueError.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'cli-with-capsys',
              title: 'Test the CLI end to end',
              prompt:
                'For the module 4 todo tool, write tests that call main(["add", "milk", "--file", str(tmp_path/"t.json")]) and then main(["list", ...]), capturing output with capsys and asserting the exit codes (0 for success, 2 for unknown ID). No subprocess, no real files outside tmp_path.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'hypothesis-taste',
              title: 'A property-based test',
              prompt:
                'Install hypothesis. Write a property test that for any list of integers, sorted(xs) has the same length and the same multiset (Counter) as xs and is non-decreasing. Then a property test that to_roman/from_roman round-trips for integers 1-3999. Note any failing example Hypothesis finds and what it minimises to.',
              kind: 'coding',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'What is a fixture and how does a test use it?',
              answerOutline: 'A function providing setup/an object, declared with @pytest.fixture; tests receive it by naming it as a parameter.',
            },
            {
              question: 'Why does tmp_path make file tests safe?',
              answerOutline: 'Each test gets a fresh temporary directory that is isolated and cleaned up, so tests do not interfere or litter.',
            },
            {
              question: 'What are the three steps of TDD?',
              answerOutline: 'Red (failing test), green (minimal code to pass), refactor (clean up with tests green).',
            },
            {
              question: 'What design change makes I/O code testable?',
              answerOutline: 'Separate parsing/logic from file access and inject dependencies so tests use strings and fakes.',
            },
          ],
        },
        {
          slug: 'debugging-with-a-debugger',
          title: 'Debugging with a real debugger',
          summary:
            'Stop sprinkling prints: set breakpoints, step through code, inspect frames and watch variables with pdb and your editor, and use logging for the long run.',
          estimatedMinutes: 80,
          objectives: [
            'Set a breakpoint with breakpoint() and navigate with pdb commands (n, s, c, p, pp, l, w, u, d, q)',
            'Inspect the call stack at a crash with pytest --pdb or python -m pdb',
            'Use the editor debugger to step through a test and watch variables',
            'Replace diagnostic prints with the logging module at appropriate levels',
          ],
          concepts: [
            'breakpoint() and pdb',
            'Stepping: next vs step vs continue; return',
            'Inspecting frames: where, up, down, print, pp, args',
            'Post-mortem debugging: pytest --pdb, pdb.pm()',
            'Conditional breakpoints',
            'Editor debuggers (VS Code) and launch configurations',
            'logging levels and basicConfig',
            'Binary search for the bug: bisecting inputs and commits',
          ],
          explanation: `Print debugging works until it does not: when the bug is in a loop with ten thousand iterations, or in a function called from twelve places, or when adding a print changes timing. A **debugger** pauses the program at a chosen point and lets you look around. In Python, put \`breakpoint()\` on a line and run the program: execution stops there inside **pdb**. The commands you need: \`n\` (next line), \`s\` (step into a call), \`c\` (continue to the next breakpoint), \`l\` (list source around the current line), \`p expr\` / \`pp expr\` (print a value), \`w\` (where: the stack), \`u\` / \`d\` (move up/down the stack to inspect caller frames), \`q\` (quit). Your editor wraps the same operations in a GUI with a variables panel and clickable breakpoints; learn both.

**Post-mortem** debugging is the fastest way to understand a crash: \`pytest --pdb\` drops you into the failing frame of a failing test with every local variable intact; \`python -m pdb script.py\` does the same for a script. Walk \`u\` to the caller and check the arguments it passed. A **conditional breakpoint** (\`b 42, x < 0\` in pdb, or a condition in the editor) stops only when a predicate holds, which solves the ten-thousand-iteration problem.

For problems that unfold over time or in production, use **logging** instead of prints: \`logging.basicConfig(level=logging.INFO)\` and \`log.debug("row %d parsed: %r", i, row)\`. Levels let you turn detail on with \`--verbose\` and off by default, messages carry timestamps and module names, and nothing needs deleting before shipping.

When you have no idea where the bug is, **bisect**: halve the input until the smallest failing case appears, or halve the range of commits (\`git bisect\`, next lesson). Read the pdb docs and practise the stepping exercises until the commands are in your fingers.`,
          resources: [
            {
              title: 'pdb — The Python Debugger',
              url: 'https://docs.python.org/3/library/pdb.html',
              type: 'documentation',
              cost: 'free',
              provider: 'Python Software Foundation',
              primary: true,
            },
            {
              title: 'The Missing Semester — Debugging and Profiling',
              url: 'https://missing.csail.mit.edu/2020/debugging-profiling/',
              type: 'lecture',
              cost: 'free',
              provider: 'MIT',
            },
            {
              title: 'logging HOWTO (basic tutorial)',
              url: 'https://docs.python.org/3/howto/logging.html',
              type: 'documentation',
              cost: 'free',
              provider: 'Python Software Foundation',
            },
            {
              title: 'VS Code — Python debugging',
              url: 'https://code.visualstudio.com/docs/python/debugging',
              type: 'documentation',
              cost: 'free',
              provider: 'Microsoft',
              note: 'Only if you use VS Code; any editor with a debugger is fine.',
            },
          ],
          exercises: [
            {
              slug: 'pdb-drills',
              title: 'pdb command drills',
              prompt:
                'Put breakpoint() at the start of collatz_steps(27). Using only pdb: step until n becomes 82 and record how many n commands it took; print the stack with w; set a conditional breakpoint that fires when n > 9000 and continue to it; print n and the step count there (expected n=9232 at step 77). Quit and write down each command used.',
              kind: 'coding',
              difficulty: 1,
            },
            {
              slug: 'post-mortem-hunt',
              title: 'Post-mortem on a planted bug',
              prompt:
                'Introduce a subtle bug into the inventory simulation (e.g. stock decremented by quantity+1 for one product). Run its tests with pytest --pdb, use u/d to find the frame where the wrong value is computed, and identify the line without reading the source first. Write a three-line report: symptom, frame, cause.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'prints-to-logging',
              title: 'Replace prints with logging',
              prompt:
                'Take the CSV toolkit and replace every diagnostic print with logging calls at DEBUG/INFO/WARNING. Add --verbose to set the level. Verify that normal runs print only results to stdout, that --verbose shows the per-row diagnostics on stderr, and that a malformed row produces a WARNING with the line number.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'bisect-the-input',
              title: 'Bisect a failing input',
              prompt:
                'Create a 10,000-row CSV in which exactly one row has an invisible problem (e.g. a non-breaking space in a number). Write bisect_failure(rows, check) that finds the smallest failing prefix, then the single offending row, in about 14 checks. Report the number of checks and the row.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What is the difference between n and s in pdb?',
              answerOutline: 'n executes the current line and stops at the next in the same frame; s steps into a function call on the line.',
            },
            {
              question: 'What does pytest --pdb do?',
              answerOutline: 'On the first failure, opens the debugger in the failing frame with locals intact for post-mortem inspection.',
            },
            {
              question: 'Why prefer logging over print for diagnostics?',
              answerOutline: 'Levels, timestamps and module names; can be turned on/off by configuration without editing code; goes to stderr or files.',
            },
          ],
        },
        {
          slug: 'virtual-environments-and-packaging',
          title: 'Virtual environments, dependencies and project layout',
          summary:
            'Isolate each project with venv, install and pin dependencies with pip, and lay out a project with pyproject.toml so it can be installed and tested like a real package.',
          estimatedMinutes: 75,
          objectives: [
            'Create, activate and delete a virtual environment and explain what it isolates',
            'Install packages with pip, freeze versions, and reproduce an environment from a requirements file',
            'Lay out a project as src/package, tests/, pyproject.toml and install it in editable mode',
            'Explain semantic versioning and why pinning matters',
          ],
          concepts: [
            'venv: per-project interpreter and site-packages',
            'pip install, pip freeze, requirements.txt',
            'pyproject.toml and editable installs (pip install -e .)',
            'src layout vs flat layout',
            'Semantic versioning and version specifiers',
            'The Python Package Index (PyPI)',
            'Reproducibility: same code, same dependencies, same results',
            'Never pip install into the system Python',
          ],
          explanation: `Real programs depend on third-party packages (pytest, hypothesis, later numpy and astropy), and different projects need different versions. A **virtual environment** is a private copy of the interpreter's package directory: \`python -m venv .venv\`, then activate it (\`source .venv/bin/activate\` or \`.venv\\Scripts\\activate\` on Windows), and \`pip install\` puts packages there and nowhere else. Deleting the directory removes everything. Never install into the system Python; it is shared and fragile.

**Reproducibility** means someone else (or you, next year) can recreate the environment. \`pip freeze > requirements.txt\` records exact versions; \`pip install -r requirements.txt\` restores them. Versions follow **semantic versioning**: MAJOR.MINOR.PATCH, where a MAJOR bump may break your code. Specifiers like \`pytest>=8,<9\` express tolerance.

A project that is more than one file should be laid out as a **package**: a \`pyproject.toml\` describing the name, version and dependencies; the code under \`src/yourpackage/\` with an \`__init__.py\`; tests under \`tests/\`. Installing it in **editable** mode (\`pip install -e .\`) puts the package on the import path so \`tests/\` and scripts anywhere can \`import yourpackage\` without path hacks; edits are picked up immediately. The \`src\` layout prevents the classic bug of tests importing the uninstalled working copy by accident.

This lesson is short on ideas and long on habits. Work through the venv and packaging tutorials below, convert the module 5 project to this layout, and from now on every exercise lives in a project with an environment. Tools like \`uv\` or \`poetry\` automate these steps; learn the manual version first so you understand what they do.`,
          resources: [
            {
              title: 'venv — Creation of virtual environments',
              url: 'https://docs.python.org/3/library/venv.html',
              type: 'documentation',
              cost: 'free',
              provider: 'Python Software Foundation',
              primary: true,
            },
            {
              title: 'Python Packaging User Guide — Installing packages using pip and virtual environments',
              url: 'https://packaging.python.org/en/latest/guides/installing-using-pip-and-virtual-environments/',
              type: 'documentation',
              cost: 'free',
              provider: 'Python Packaging Authority',
            },
            {
              title: 'Python Packaging User Guide — Packaging Python Projects (pyproject.toml tutorial)',
              url: 'https://packaging.python.org/en/latest/tutorials/packaging-projects/',
              type: 'documentation',
              cost: 'free',
              provider: 'Python Packaging Authority',
            },
            {
              title: 'pytest — Good Integration Practices (src layout, conftest)',
              url: 'https://docs.pytest.org/en/stable/explanation/goodpractices.html',
              type: 'documentation',
              cost: 'free',
              provider: 'pytest',
            },
          ],
          exercises: [
            {
              slug: 'two-environments',
              title: 'Two environments, two versions',
              prompt:
                'Create two virtual environments. In one install an older pytest (e.g. pytest==7.4.4), in the other the latest. In each run python -c "import pytest; print(pytest.__version__)" and pip list. Delete both. Explain in two sentences what venv isolates and what it does not (the interpreter version itself).',
              kind: 'coding',
              difficulty: 1,
            },
            {
              slug: 'package-layout',
              title: 'Convert a project to the src layout',
              prompt:
                'Restructure the inventory project into src/shop/ with pyproject.toml (name, version 0.1.0, dependencies, a [project.scripts] entry for the CLI), tests/ and README. pip install -e . in a fresh venv and confirm: pytest passes from any directory, the console script runs, and pip show shop reports the editable location.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'reproduce-environment',
              title: 'Reproduce an environment',
              prompt:
                'Freeze the inventory project environment to requirements.txt, delete the venv, recreate it from the file, and run the tests. Then edit the file to a version specifier that cannot be satisfied (pytest==0.0.1) and record the pip error so you recognise it later.',
              kind: 'coding',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'What does a virtual environment contain and isolate?',
              answerOutline: 'A link to an interpreter plus its own site-packages and scripts; installed packages are isolated per project, the interpreter version is not changed.',
            },
            {
              question: 'What does pip install -e . do?',
              answerOutline: 'Installs the project in editable mode: the package is importable from anywhere and reflects source edits immediately.',
            },
            {
              question: 'Why pin dependency versions?',
              answerOutline: 'So the environment can be reproduced exactly and upgrades (especially major versions) do not silently break the code.',
            },
          ],
        },
        {
          slug: 'git-basics',
          title: 'Version control with git',
          summary:
            'Track every change, write meaningful commits, use branches for experiments, recover from mistakes, and publish to GitHub.',
          estimatedMinutes: 100,
          objectives: [
            'Initialise a repository, stage and commit changes, and read the log and diff',
            'Explain the working tree, index and commit graph model',
            'Create, switch and merge branches, and resolve a simple conflict',
            'Push to a remote, clone, and write a .gitignore for a Python project',
          ],
          concepts: [
            'Working tree, staging area (index), repository',
            'git init, status, add, commit, log, diff',
            'Commits as snapshots forming a graph; HEAD',
            'Branches and merging; fast-forward vs merge commit',
            'Merge conflicts and how to resolve them',
            'Remotes: clone, push, pull; GitHub',
            '.gitignore for venvs, caches and secrets',
            'Undoing: restore, revert, reset (with care); git bisect',
          ],
          explanation: `**Git** records the history of your project as a graph of **commits**, each a complete snapshot plus a message. It lets you see what changed and when, go back to any state, work on an experiment without disturbing working code, and collaborate. The mental model has three places: the **working tree** (your files), the **index** or staging area (what the next commit will contain), and the **repository** (the committed history). \`git add\` moves changes into the index; \`git commit\` turns the index into a commit; \`git status\` and \`git diff\` show what is where. Stage deliberately: one commit should be one logical change with a message that says *why*.

A **branch** is just a movable pointer to a commit; \`HEAD\` is the branch you are on. \`git switch -c feature\` starts a line of work; commits advance it; \`git merge feature\` from main brings it back. If both branches changed the same lines you get a **conflict**: git marks the regions, you edit to the intended result, add, and commit. Conflicts are normal; panic is optional.

**Remotes** are other copies of the repository, typically on GitHub: \`git clone\`, \`git push\`, \`git pull\`. Pushing regularly is your backup. A \`.gitignore\` keeps the venv, \`__pycache__\`, data dumps and anything secret out of history; a committed password is forever.

Mistakes are recoverable: \`git restore file\` discards working changes, \`git revert\` makes a new commit undoing an old one (safe, shareable), \`git reset\` moves a branch pointer (powerful, local only). \`git bisect\` binary-searches history for the commit that broke a test, which is why small commits matter.

Software Carpentry's lesson is the fastest hands-on introduction; Pro Git chapters 1-3 are the reference; Learn Git Branching makes the graph visible. Put every project from this subject under git today, including the earlier ones.`,
          resources: [
            {
              title: 'Software Carpentry — Version Control with Git',
              url: 'https://swcarpentry.github.io/git-novice/',
              type: 'course',
              cost: 'free',
              provider: 'Software Carpentry',
              primary: true,
            },
            {
              title: 'Pro Git (2nd edition) — Chapters 1-3',
              url: 'https://git-scm.com/book/en/v2',
              type: 'textbook',
              cost: 'free',
              provider: 'Scott Chacon and Ben Straub',
            },
            {
              title: 'Learn Git Branching (interactive)',
              url: 'https://learngitbranching.js.org/',
              type: 'interactive',
              cost: 'free',
              provider: 'Peter Cottle',
              note: 'The "Main" levels 1-4 build the branch/merge intuition visually.',
            },
            {
              title: 'The Missing Semester — Version Control (Git)',
              url: 'https://missing.csail.mit.edu/2020/version-control/',
              type: 'lecture',
              cost: 'free',
              provider: 'MIT',
              note: 'Teaches the data model first, which is the right way round.',
            },
          ],
          exercises: [
            {
              slug: 'first-repository',
              title: 'Put your work under version control',
              prompt:
                'Initialise a repository for your course work with a .gitignore (venv, __pycache__, .pytest_cache, *.csv data dumps). Make at least 10 commits, each one logical change with a message in the imperative mood. Show git log --oneline --graph and git diff between two commits that changed the same file.',
              kind: 'coding',
              difficulty: 1,
            },
            {
              slug: 'branch-and-conflict',
              title: 'Branch, conflict, resolve',
              prompt:
                'Create branch feature-a changing a docstring on line 3 of a module, and branch feature-b changing the same line differently. Merge feature-a into main, then merge feature-b and resolve the conflict so both intentions are reflected. Show the conflict markers you saw and the final git log graph.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'bisect-a-regression',
              title: 'Find a regression with git bisect',
              prompt:
                'In a repository with 20+ commits, plant a bug in some middle commit (rewriting history on a scratch copy is fine) that makes one test fail. Use git bisect with a run script (pytest -x -q tests/test_x.py) to find the first bad commit automatically. Record the number of steps bisect needed.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'publish-to-github',
              title: 'Publish and clone',
              prompt:
                'Create a GitHub repository, push your course work, then clone it into a different directory, create a venv there, install, and run the tests. If anything is missing from the clone (ignored data, uncommitted file), fix the repository so a fresh clone works, and write the steps in the README.',
              kind: 'coding',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'What are the working tree, the index and the repository?',
              answerOutline: 'Your files on disk; the staged set of changes for the next commit; the history of commits.',
            },
            {
              question: 'What is a branch in git?',
              answerOutline: 'A named pointer to a commit that moves forward as you commit; cheap to create and merge.',
            },
            {
              question: 'When should you use revert instead of reset?',
              answerOutline: 'When the history has been shared: revert adds a new commit undoing the change; reset rewrites history.',
            },
            {
              question: 'What belongs in .gitignore for a Python project?',
              answerOutline: 'Virtual environments, __pycache__, caches, build artifacts, large data files, and secrets.',
            },
          ],
        },
        {
          slug: 'style-linters-and-readable-code',
          title: 'Style, linters and readable code',
          summary:
            'PEP 8 and why consistency matters, automatic formatting with black or ruff, linting to catch bugs before running, and writing code and docstrings for the next reader.',
          estimatedMinutes: 60,
          objectives: [
            'Apply the main PEP 8 conventions and explain the reasoning behind them',
            'Configure a formatter and a linter and run them on a project',
            'Write docstrings in a consistent style and type hints on public functions',
            'Review a piece of code for readability and refactor names, functions and comments',
          ],
          concepts: [
            'PEP 8: naming, layout, imports, line length',
            'Formatters (black, ruff format) remove style debates',
            'Linters (ruff, pyflakes) catch unused names, undefined names, likely bugs',
            'Docstring conventions (PEP 257) and docstring formats',
            'Comments explain why, code explains what',
            'Naming as the primary documentation',
            'Pre-commit hooks',
            'The Zen of Python',
          ],
          explanation: `Code is read far more often than it is written, and you will read your own code months later as a stranger. **PEP 8** is the shared Python style: \`snake_case\` functions and variables, \`CapWords\` classes, \`UPPER_CASE\` constants, four-space indents, imports at the top grouped standard/third-party/local, spaces around operators, lines under about 88-100 characters. None of it is sacred; the value is **consistency**, so that readers spend attention on meaning rather than layout.

Stop formatting by hand. A **formatter** (\`black\` or \`ruff format\`) rewrites files to a canonical layout, ending every argument about style. A **linter** (\`ruff\`, built on pyflakes and hundreds of other checks) reads your code without running it and reports unused imports and variables, undefined names (that typo in the except-pass exercise), comparisons to None with \`==\`, mutable default arguments, and more. Run both before every commit; a pre-commit hook automates it.

Beyond tools: **naming** is the main documentation. \`n_rows\` beats \`n\`; \`is_valid\` beats \`flag\`; a function named \`load_planets\` must load planets and nothing else. Comments should explain *why* (a non-obvious constraint, a workaround) rather than restate the code; a comment that paraphrases the next line is noise. **Docstrings** (PEP 257) describe the contract of every public function and class; pick one format (Google or NumPy style) and keep it. Type hints on public signatures complete the picture.

Read PEP 8 once (skim the long tail), the ruff docs quick start, and \`import this\`. The exercises have you lint your own earlier code, which is humbling and useful.`,
          resources: [
            {
              title: 'PEP 8 — Style Guide for Python Code',
              url: 'https://peps.python.org/pep-0008/',
              type: 'documentation',
              cost: 'free',
              provider: 'Python Software Foundation',
              primary: true,
            },
            {
              title: 'Ruff — an extremely fast Python linter and formatter',
              url: 'https://docs.astral.sh/ruff/',
              type: 'tool',
              cost: 'free',
              provider: 'Astral',
            },
            {
              title: 'Black — The uncompromising code formatter',
              url: 'https://black.readthedocs.io/en/stable/',
              type: 'tool',
              cost: 'free',
              provider: 'Python Software Foundation',
            },
            {
              title: 'PEP 257 — Docstring Conventions',
              url: 'https://peps.python.org/pep-0257/',
              type: 'documentation',
              cost: 'free',
              provider: 'Python Software Foundation',
            },
            {
              title: 'Google Python Style Guide',
              url: 'https://google.github.io/styleguide/pyguide.html',
              type: 'documentation',
              cost: 'free',
              provider: 'Google',
              note: 'Section 3.8 for the Google docstring format.',
            },
          ],
          exercises: [
            {
              slug: 'lint-your-past',
              title: 'Lint your earlier modules',
              prompt:
                'Run ruff check on every script from modules 1-5. Tabulate the rule codes reported and their counts. Fix all of them, run ruff format or black, and commit. Write three sentences on which findings were real bugs rather than style.',
              kind: 'coding',
              difficulty: 1,
            },
            {
              slug: 'readability-refactor',
              title: 'Refactor for readability',
              prompt:
                'Take a 40-line function from your CSV toolkit (or write a deliberately ugly one). Without changing behaviour (tests stay green), rename variables, extract two helper functions, replace comments that restate code with better names, and add a Google-style docstring and type hints. Show before and after with the ruff and mypy output for each.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'pre-commit-hook',
              title: 'Automate checks with a hook',
              prompt:
                'Configure a git pre-commit hook (via the pre-commit tool or a plain .git/hooks/pre-commit script) that runs ruff check, ruff format --check and pytest -q. Demonstrate that a commit with a lint error is rejected and that fixing it allows the commit.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What is the difference between a formatter and a linter?',
              answerOutline: 'A formatter rewrites layout (whitespace, line breaks); a linter reports likely errors and bad practices without changing code.',
            },
            {
              question: 'What should a comment contain?',
              answerOutline: 'The why: intent, constraints, non-obvious reasoning; not a restatement of what the code visibly does.',
            },
            {
              question: 'Name three things a linter catches that a formatter does not.',
              answerOutline: 'Unused imports/variables, undefined names, mutable default arguments, == None, bare except.',
            },
          ],
        },
      ],
      project: {
        slug: 'professionalise-a-project',
        title: 'Module project: professionalise an earlier project',
        description:
          'Take the CSV toolkit or inventory simulation and bring it to a professional standard: src layout and pyproject.toml, a venv with pinned dependencies, a pytest suite with fixtures and parametrisation at 85%+ coverage, ruff and black clean, type hints with mypy passing, a git history with meaningful commits on a feature branch merged into main, and a README with installation and usage.',
        deliverables: [
          'A GitHub repository that a stranger can clone, install and test in under five minutes',
          'Coverage report and ruff/mypy output included in the README',
          'A CHANGELOG listing three bugs the tests found during the process',
        ],
        estimatedHours: 8,
      },
    },
    {
      slug: 'thinking-like-an-engineer',
      title: 'Thinking Like an Engineer',
      description:
        'Step back from syntax: estimate how long code will take before you run it, decompose problems systematically, look at how Python actually runs, and read a second language to see what carries over.',
      lessons: [
        {
          slug: 'measuring-and-estimating-cost',
          title: 'Measuring and estimating the cost of code',
          summary:
            'Time your code properly, recognise constant, linear, quadratic and logarithmic growth from measurements, and predict run time before running.',
          estimatedMinutes: 100,
          objectives: [
            'Time code reliably with time.perf_counter and timeit and avoid common timing mistakes',
            'Measure how run time grows with input size and classify it as constant, log, linear, n log n or quadratic',
            'Predict from a doubling experiment how long a larger input will take',
            'Identify the nested loop or hidden linear operation that makes code quadratic',
          ],
          concepts: [
            'perf_counter, timeit, repeat and take the minimum',
            'Growth classes: O(1), O(log n), O(n), O(n log n), O(n^2)',
            'Doubling experiments and ratios',
            'Hidden costs: list.insert(0), x in list, string concatenation in loops',
            'Profiling with cProfile to find the hot spot',
            'Memory growth and tracemalloc',
            'Premature optimisation vs necessary optimisation',
            'Big-O as a vocabulary (canonical treatment in Data Structures and Algorithms)',
          ],
          explanation: `The difference between a program that finishes in a second and one that would finish next year is rarely the language; it is how the running time **grows** with the input size $n$. You have already seen it: the nested loop over $n \\times n$, the list-vs-set membership test, exponential Fibonacci. This lesson makes that intuition quantitative without the theory, which is the job of Data Structures and Algorithms.

**Measure properly.** Use \`time.perf_counter()\` around the code, repeat several times and take the *minimum* (noise only adds time), and use inputs large enough that the measurement is at least tens of milliseconds. The \`timeit\` module automates this for small snippets. Do not time the first run of anything that caches, and do not include setup.

**Run a doubling experiment.** Time the code for $n$, $2n$, $4n$, $8n$ and look at the ratio between successive times. Ratio about 1: constant. Slightly above 1: logarithmic. About 2: linear. A bit above 2 (like 2.2): $n \\log n$. About 4: quadratic. About 8: cubic. From the class and one measurement you can **predict**: if a quadratic algorithm takes 1 s on 10,000 items, it takes about 100 s on 100,000 and 3 hours on 1,000,000. Making this prediction *before* running is the skill.

**Find the hidden loops.** \`x in some_list\` is a loop. \`list.insert(0, x)\` and \`del list[0]\` shift every element. Building a string with \`s += piece\` in a loop can be quadratic. Sorting inside a loop is $n \\log n$ per iteration. When something is slow, run \`cProfile\` to see where the time goes rather than guessing; it is usually one function.

Finally, the rule of thumb: make it correct, make it clear, measure, and only then make it fast where the profile says it matters. The exercises are all measurement; keep the tables you produce as reference points for your machine.`,
          resources: [
            {
              title: 'timeit — Measure execution time of small code snippets',
              url: 'https://docs.python.org/3/library/timeit.html',
              type: 'documentation',
              cost: 'free',
              provider: 'Python Software Foundation',
              primary: true,
            },
            {
              title: 'The Python Profilers (cProfile)',
              url: 'https://docs.python.org/3/library/profile.html',
              type: 'documentation',
              cost: 'free',
              provider: 'Python Software Foundation',
            },
            {
              title: 'Composing Programs — 2.8 Efficiency',
              url: 'https://www.composingprograms.com/pages/28-efficiency.html',
              type: 'textbook',
              cost: 'free',
              provider: 'John DeNero (UC Berkeley CS61A)',
              note: 'Measuring, memoisation and orders of growth with the same examples you have used.',
            },
            {
              title: 'MIT 6.100L — Lectures on complexity (Big O, orders of growth)',
              url: 'https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/',
              type: 'lecture',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
            },
            {
              title: 'Python wiki — Time Complexity of built-in operations',
              url: 'https://wiki.python.org/moin/TimeComplexity',
              type: 'documentation',
              cost: 'free',
              provider: 'Python Software Foundation',
            },
          ],
          exercises: [
            {
              slug: 'doubling-experiments',
              title: 'Classify five functions by doubling',
              prompt:
                'For each of: sum of a list; x in list; sorted(list); the nested-loop duplicate finder (any pair equal); binary search over a sorted list; time inputs of size 10^3 to 10^6 doubling each time (as far as feasible). Tabulate times and ratios, name the growth class, and predict the time for 10^7 before measuring it for those that are feasible.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'hidden-quadratics',
              title: 'Find and fix hidden quadratic behaviour',
              prompt:
                'Write three functions that are accidentally quadratic: build a string by += in a loop, remove items from the front of a list with pop(0), and de-duplicate with "if x not in result". Measure each at n = 10^4, 2*10^4, 4*10^4 (ratio ~4), then rewrite with join, deque.popleft and a set and show the ratio drops to ~2.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'profile-the-analyser',
              title: 'Profile a real program',
              prompt:
                'Run the text analyser under cProfile on a large book (python -m cProfile -s cumtime analyser.py book.txt). Identify the top three functions by cumulative time, explain why each is expensive, optimise the worst one, and report the before/after total time.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'predict-before-run',
              title: 'Predict, then run',
              prompt:
                'Write a function with three nested loops over range(n) doing constant work. Time n = 100 and n = 200 and compute the ratio (expected ~8). Predict the time for n = 1000 and n = 2000, write the predictions down, then measure. Report the percentage error of your predictions.',
              kind: 'coding',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'If doubling the input makes the code take four times as long, what is the growth class?',
              answerOutline: 'Quadratic, O(n^2); typically a nested loop or a hidden linear operation inside a loop.',
            },
            {
              question: 'Why take the minimum of repeated timings rather than the mean?',
              answerOutline: 'Noise from other processes only adds time; the minimum best estimates the intrinsic cost.',
            },
            {
              question: 'Name three Python operations that are secretly linear.',
              answerOutline: 'x in list, list.insert(0, x) / pop(0), string concatenation in a loop (copies), len is not (it is constant).',
            },
            {
              question: 'What should you do before optimising?',
              answerOutline: 'Get it correct and tested, measure, profile to find the hot spot, and only then optimise that spot.',
            },
          ],
          relatedLessons: ['data-structures-algorithms/analysis-foundations/asymptotic-notation'],
        },
        {
          slug: 'problem-decomposition',
          title: 'Decomposing problems and designing before coding',
          summary:
            'A repeatable method for going from a vague problem statement to a working program: clarify, find examples, decompose, define interfaces, implement incrementally, test as you go.',
          estimatedMinutes: 90,
          objectives: [
            'Restate a vague problem precisely with inputs, outputs and examples before coding',
            'Decompose a problem into a dependency graph of small functions with defined interfaces',
            'Implement incrementally with stubs and tests so something always runs',
            'Recognise standard sub-problems (parse, transform, aggregate, format, search) and reuse known solutions',
          ],
          concepts: [
            'Problem clarification: inputs, outputs, constraints, examples',
            'Top-down decomposition and bottom-up building',
            'Interfaces first: signatures and docstrings before bodies',
            'Stubs, incremental development, always-runnable state',
            'Standard pipeline shape: parse -> transform -> aggregate -> format',
            'Worked examples as test cases',
            'Design documents of one page',
            'Knowing when to stop designing and start coding',
          ],
          explanation: `Beginners start typing; engineers start by **understanding**. Given "write a program that finds the busiest hour in a web server log", the first job is to make it precise: What is the input format (one request per line, with a timestamp in which format)? What is the output (an hour label and a count? for each day or overall)? What are the edge cases (empty file, malformed lines, ties)? Write two or three concrete **examples** with their expected output; these become your first tests and resolve most ambiguities.

Then **decompose**. Most data programs share the shape *parse → transform → aggregate → format*: \`parse_line(str) -> Request | None\`, \`hour_of(request) -> int\`, \`count_by_hour(requests) -> dict[int, int]\`, \`busiest(counts) -> (int, int)\`, \`format_report(...) -> str\`, and a \`main\` that wires them. Write the **signatures and docstrings first**; if a function is hard to name or its inputs are unclear, the decomposition is wrong, and discovering that on paper costs minutes rather than hours.

**Build incrementally.** Implement the pipeline end to end on a trivial example with stubs (\`return 0\`), so the program runs from the first hour. Then replace one stub at a time, with its tests, keeping the whole thing runnable. Compare with writing 300 lines and running them once: the second approach produces a wall of errors with no idea where to start.

Recognise **standard sub-problems**: you have already solved counting (dicts/Counter), grouping, top-k (sorted with key), searching, and parsing structured text (csv/json). Most new problems are combinations; the skill is seeing which. Write a one-page design (goal, examples, function list, data representation, risks) before any project longer than an afternoon; it is the most valuable hour you will spend. Composing Programs' discussion of function design and the Think Python chapter on development plans are the readings; the exercises require the design document before code.`,
          resources: [
            {
              title: 'Composing Programs — 1.4 Designing Functions (and 1.5 Control)',
              url: 'https://www.composingprograms.com/pages/14-designing-functions.html',
              type: 'textbook',
              cost: 'free',
              provider: 'John DeNero (UC Berkeley CS61A)',
              primary: true,
            },
            {
              title: 'Think Python — Chapter 6 (incremental development) and Chapter 4 (interface design)',
              url: 'https://allendowney.github.io/ThinkPython/chap06.html',
              type: 'textbook',
              cost: 'free',
              provider: 'Allen Downey',
            },
            {
              title: 'How to Design Programs (2nd ed.) — The design recipe',
              url: 'https://htdp.org/',
              type: 'textbook',
              cost: 'free',
              provider: 'Felleisen, Findler, Flatt, Krishnamurthi',
              note: 'Not Python, but the "design recipe" (signature, purpose, examples, template, body, tests) is the method in this lesson.',
            },
            {
              title: 'Advent of Code',
              url: 'https://adventofcode.com/',
              type: 'problem-set',
              cost: 'free',
              provider: 'Eric Wastl',
              note: 'Past-year puzzles are ideal decomposition practice with concrete inputs and answers.',
            },
          ],
          exercises: [
            {
              slug: 'design-doc-first',
              title: 'Design document before code',
              prompt:
                'For the busiest-hour log problem, write a one-page design: precise input/output spec, three worked examples, the function list with signatures and docstrings, the data representation, and three risks. Only then implement it, stubs first. Measure how many of your examples passed on the first full run.',
              kind: 'writing',
              difficulty: 2,
            },
            {
              slug: 'advent-decomposition',
              title: 'Decompose two puzzles',
              prompt:
                'Pick two Advent of Code day-1 to day-5 puzzles from a past year. For each: write the examples from the puzzle as tests first, decompose into parse/transform/aggregate functions, and implement incrementally. Record the time spent designing versus coding versus debugging.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'spot-the-subproblems',
              title: 'Name the standard sub-problems',
              prompt:
                'For each task, list the standard sub-problems it decomposes into and the Python tool for each: find the 10 most common error messages in a log; compute each student\'s best score across several CSV files; detect duplicate files in a directory tree by content; merge two sorted lists of events by timestamp. Then implement the duplicate-file detector with hashlib and pathlib.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What should you produce before writing code for a non-trivial problem?',
              answerOutline: 'A precise statement of inputs and outputs, worked examples (future tests), a decomposition into functions with signatures and docstrings.',
            },
            {
              question: 'What is incremental development with stubs?',
              answerOutline: 'Wire the whole pipeline with placeholder functions so it runs end to end, then replace one stub at a time with tests.',
            },
            {
              question: 'What is the common pipeline shape of data programs?',
              answerOutline: 'Parse input into records, transform records, aggregate (count/group/reduce), format output; main wires them together.',
            },
          ],
        },
        {
          slug: 'how-python-runs-your-code',
          title: 'How Python runs your code',
          summary:
            'A look under the hood: bytecode, the interpreter loop, objects and reference counting, why Python is slow and when it does not matter, and the role of libraries written in C.',
          estimatedMinutes: 80,
          objectives: [
            'Describe the pipeline from source to bytecode to execution by the CPython virtual machine',
            'Inspect bytecode with dis and explain why a Python loop is slower than the equivalent in C',
            'Explain reference counting, garbage collection and what del and scope ending really do',
            'Explain why NumPy-style libraries are fast and when to reach for them',
          ],
          concepts: [
            'Compilation to bytecode (.pyc) and the dis module',
            'The CPython interpreter loop and dynamic dispatch',
            'Everything is an object: boxing of ints and floats',
            'Reference counting, cycles and the garbage collector',
            'The Global Interpreter Lock (mention)',
            'Why C extensions (NumPy) are fast: typed arrays, no per-element dispatch',
            'Interpreted vs compiled trade-offs',
            'sys.getsizeof and object overhead',
          ],
          explanation: `Python is "interpreted", but not line by line. CPython first **compiles** your source into **bytecode**, a compact instruction set for a stack-based virtual machine (cached in \`__pycache__/*.pyc\`), and then an interpreter loop executes those instructions one at a time. \`import dis; dis.dis(f)\` shows the bytecode; a simple \`a + b\` becomes a \`LOAD_FAST\`, \`LOAD_FAST\`, \`BINARY_OP\` sequence, and each instruction costs tens of nanoseconds of dispatch and type checking.

That is the core of why Python is slow for tight loops: **everything is an object**. The integer 5 is a heap object with a type pointer and a reference count; adding two integers means dereferencing both, checking their types, allocating a result object. C does the same addition in one instruction on registers. The ratio is typically 30-100x for numeric loops. It does not matter when the loop body is dominated by I/O or by calls into fast library code, and it matters enormously when you are doing a billion arithmetic operations.

The way out, which the physics and astronomy tracks rely on, is libraries like **NumPy**: a typed array stores a million floats contiguously with no per-element objects, and a single call \`a + b\` runs a C loop over all of them. The rule: express computation over whole arrays, not Python loops over elements.

**Memory** is managed by **reference counting**: each object counts how many names and containers refer to it, and when the count hits zero it is freed immediately. Scope ending, \`del name\` and rebinding all just decrement counts. Reference cycles (a list containing itself) cannot reach zero, so a separate garbage collector finds them periodically. \`sys.getsizeof\` shows the object overhead (an empty list is dozens of bytes; a small int 28).

Read the dis documentation and the data model intro, then do the measurement exercises; they turn these claims into numbers for your own machine.`,
          resources: [
            {
              title: 'dis — Disassembler for Python bytecode',
              url: 'https://docs.python.org/3/library/dis.html',
              type: 'documentation',
              cost: 'free',
              provider: 'Python Software Foundation',
              primary: true,
            },
            {
              title: 'Python Data Model — Objects, values and types',
              url: 'https://docs.python.org/3/reference/datamodel.html#objects-values-and-types',
              type: 'documentation',
              cost: 'free',
              provider: 'Python Software Foundation',
            },
            {
              title: 'CPython Internals: Your Guide to the Python 3 Interpreter',
              url: 'https://realpython.com/products/cpython-internals-book/',
              type: 'textbook',
              cost: 'paid',
              provider: 'Real Python',
              note: 'Optional deep dive; the free resources in this lesson cover what you need.',
            },
            {
              title: 'NumPy — the absolute basics for beginners',
              url: 'https://numpy.org/doc/stable/user/absolute_beginners.html',
              type: 'documentation',
              cost: 'free',
              provider: 'NumPy',
              note: 'Just the first sections, to see what a typed array is.',
            },
          ],
          exercises: [
            {
              slug: 'read-bytecode',
              title: 'Read the bytecode',
              prompt:
                'Disassemble a function that sums a list with a for loop and one that calls sum(). Count the instructions executed per element in the loop version (use the bytecode and reasoning). Time both on 10^7 elements and relate the ratio to the instruction counts.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'object-overhead',
              title: 'Measure object overhead',
              prompt:
                'Use sys.getsizeof to report the size of 0, 1, 2**30, 2**100, 0.5, "", "a", [], [1], (), and a list of 10^6 ints (plus the ints themselves via tracemalloc). Compare with the 8 bytes a C double or int64 would take. Then install numpy and compare the memory of a Python list of 10^6 floats with a numpy array of the same.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'numpy-speedup',
              title: 'Python loop vs NumPy',
              prompt:
                'Compute the sum of squares of 10^7 floats three ways: a Python for loop, sum(x*x for x in xs), and numpy (a*a).sum(). Time each and report the ratios. Then compute the same with a list of Python ints vs a numpy int64 array and explain where the dispatch overhead went.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'refcount-experiment',
              title: 'Watch reference counts',
              prompt:
                'Use sys.getrefcount to observe the count of an object as you bind it to extra names, put it in a list, and delete names. Then build a reference cycle (a = []; a.append(a)), delete a, and show with gc.collect() return value that the collector reclaimed it. Explain why refcounting alone could not.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What does CPython do with your source before executing it?',
              answerOutline: 'Compiles it to bytecode for a stack virtual machine (cached in .pyc), then the interpreter loop executes bytecode instructions.',
            },
            {
              question: 'Why is a Python numeric loop 30-100x slower than C?',
              answerOutline: 'Each operation dispatches on object types, dereferences boxed objects and allocates results; C operates on raw machine values.',
            },
            {
              question: 'How does NumPy avoid that cost?',
              answerOutline: 'Typed contiguous arrays with one dispatch per whole-array operation and a C loop over the elements.',
            },
            {
              question: 'When does reference counting fail to free memory?',
              answerOutline: 'Reference cycles keep counts above zero; the cyclic garbage collector finds and frees them.',
            },
          ],
        },
        {
          slug: 'a-second-language',
          title: 'A second language: the same ideas in C and JavaScript',
          summary:
            'Read and modify small programs in C and JavaScript to see which concepts are universal (variables, control flow, functions, data structures) and which are Python choices (dynamic types, indentation, objects everywhere).',
          estimatedMinutes: 120,
          objectives: [
            'Translate a small Python program (loops, functions, arrays) into C and into JavaScript and run both',
            'Explain static typing, compilation and manual memory in C by contrast with Python',
            'Explain JavaScript\'s similarities to Python (dynamic typing, first-class functions, objects as dicts) and its differences (== vs ===, var/let, event loop)',
            'Articulate which skills transfer between languages and how to learn a new one quickly',
          ],
          concepts: [
            'Static vs dynamic typing; declarations',
            'Compilation with gcc; the executable',
            'C arrays, strings as char arrays, pointers (introduction)',
            'Integer overflow and fixed-width types',
            'JavaScript: let/const, functions, arrays, objects, arrow functions',
            'JS equality (== vs ===), truthiness differences',
            'Running JS with Node and in the browser',
            'Transferable skills: decomposition, testing, debugging, reading docs',
          ],
          explanation: `Everything you learned in this subject transfers. Variables, expressions, conditionals, loops, functions, arrays/lists, maps/dicts, decomposition, testing and debugging exist in every mainstream language; what differs is syntax and a few deep design choices. The fastest way to see this is to rewrite a program you know in two languages that sit on either side of Python.

**C** is compiled and **statically typed**: you declare \`int n = 10;\` and \`double xs[100];\`, run \`gcc prog.c -o prog\`, and get a native executable. Every variable has a fixed type and size, integers **overflow** silently at 32 or 64 bits (there is no arbitrary precision), strings are arrays of characters terminated by a zero byte, and there are no built-in lists or dicts: you manage memory yourself with \`malloc\`/\`free\`. In exchange, a loop runs at the speed the hardware allows. **Pointers** (variables holding addresses) are the concept Python hides and C exposes; they are the subject of Systems Programming, so meet them here and move on.

**JavaScript** is Python's cousin: dynamically typed, interpreted (by a JIT), with first-class functions, arrays and objects that behave like dicts, and \`for...of\` loops. Differences bite: use \`===\` (strict equality) because \`==\` coerces types (\`"1" == 1\` is true); declare with \`let\`/\`const\`, never \`var\`; blocks use braces not indentation; \`[] + {}\` is a famous surprise; and asynchronous code (callbacks, promises, the event loop) is central because JS was built for browsers. Run scripts with Node, or open the browser console.

The lesson's real goal is **learning how to learn a language**: find the official tutorial, type the hello-world, then port a program you understand, fixing one error at a time, and look up idioms as you go. Beej's guide covers C; MDN's guide covers JavaScript; both are free and authoritative.`,
          resources: [
            {
              title: "Beej's Guide to C Programming",
              url: 'https://beej.us/guide/bgc/',
              type: 'textbook',
              cost: 'free',
              provider: 'Brian Hall',
              note: 'Chapters 1-6 (hello world, variables, functions, pointers intro, arrays, strings).',
              primary: true,
            },
            {
              title: 'MDN — JavaScript Guide',
              url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide',
              type: 'documentation',
              cost: 'free',
              provider: 'Mozilla',
              note: 'Introduction through Loops and iteration, Functions, and Working with objects.',
            },
            {
              title: 'Eloquent JavaScript (4th edition, online)',
              url: 'https://eloquentjavascript.net/',
              type: 'textbook',
              cost: 'free',
              provider: 'Marijn Haverbeke',
              note: 'Chapters 1-4 cover the same ground as modules 1-3 of this subject, in JavaScript.',
            },
            {
              title: 'Learn X in Y minutes — C',
              url: 'https://learnxinyminutes.com/docs/c/',
              type: 'article',
              cost: 'free',
              provider: 'Learn X in Y minutes',
              note: 'A one-page syntax tour; also has a JavaScript page.',
            },
          ],
          exercises: [
            {
              slug: 'port-to-c',
              title: 'Port Collatz and primes to C',
              prompt:
                'Rewrite collatz_steps and longest_chain(limit) in C with int types; compile with gcc -O2 and run for limit = 10^6 (expected start 837799, 524 steps). Time it versus Python. Then change int to a 16-bit type (short) and observe what overflow does to the answer.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'port-to-js',
              title: 'Port the word counter to JavaScript',
              prompt:
                'Rewrite the word-frequency counter in JavaScript using a Map and run it with Node on the same book. Confirm the top 20 words match the Python output exactly. Then test "1" == 1, "1" === 1, [] == false, and 0.1 + 0.2 === 0.3 in Node and explain each.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'three-way-comparison',
              title: 'Three-language comparison table',
              prompt:
                'Make a table comparing Python, C and JavaScript on: how to declare a variable, integer size/overflow, how a function is defined, how a list/array grows, how a dict/map is written, how equality works, how errors are reported, how to run the program. Add a final row: what you found hardest to translate and why.',
              kind: 'writing',
              difficulty: 1,
            },
            {
              slug: 'c-memory-glimpse',
              title: 'A glimpse of manual memory',
              prompt:
                'In C, allocate an array of n doubles with malloc, fill it with squares, sum it, and free it. Then forget the free and run under valgrind (or AddressSanitizer with -fsanitize=address) to see the leak report. Write two sentences on what Python did for you all along.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What does static typing change about how you write a program?',
              answerOutline: 'Every variable and function has a declared type checked at compile time; type errors appear before running; fixed sizes and overflow are your problem.',
            },
            {
              question: 'Why is === preferred over == in JavaScript?',
              answerOutline: '== coerces operand types before comparing, producing surprises like "1" == 1; === compares type and value.',
            },
            {
              question: 'Which skills from this subject transfer directly to a new language?',
              answerOutline: 'Decomposition, reading errors, testing, debugging with a debugger, reading documentation, version control, estimating cost.',
            },
          ],
          relatedLessons: ['systems-programming/c-fundamentals/the-c-compilation-model-and-hello-world'],
        },
      ],
    },
  ],
  capstone: {
    slug: 'command-line-application',
    title: 'Capstone: a complete command-line application with tests and a README',
    description: `Design, build, test and document a command-line application of your choice of real use to you: a personal finance tracker that imports bank CSV exports and reports spending by category; a flashcard trainer with spaced repetition and a JSON deck format; a habit or time tracker; a unit-converter and physics-formula calculator; or a log analyser for a web server. The requirements are the same whichever you choose.

The application must read and write files (CSV or JSON), expose at least four subcommands through argparse with --help text, validate its inputs and fail with clear messages, keep all logic in pure functions or small classes separate from the I/O layer, and be installable into a virtual environment. It must have a pytest suite with at least 25 tests (including at least one parametrised test, one test of an error path and one test that uses tmp_path for file I/O) with coverage above 85% on the logic modules. It must be in a git repository with a meaningful history, a README that lets a stranger install and use it in five minutes, a pyproject.toml, and pass ruff and black cleanly.

Finish with a one-page retrospective: what was hard, which bug took longest and why, what you would design differently, and one measurement (speed, memory or test coverage) with the number.`,
    deliverables: [
      'Git repository with README, pyproject.toml, src/ package and tests/ directory',
      'argparse CLI with at least four subcommands and useful --help output',
      'pytest suite of 25+ tests with coverage report above 85% on logic modules',
      'Example data files and a sample session transcript in the README',
      'One-page retrospective with at least one quantitative measurement',
    ],
    estimatedHours: 20,
    stretchGoals: [
      'Add type hints throughout and make mypy --strict pass',
      'Publish the package to TestPyPI and install it from there in a fresh environment',
      'Add a property-based test with Hypothesis for the core parsing function',
      'Re-implement one core function in C or JavaScript and compare run time on the same input',
    ],
  },
  masteryChecklist: [
    'I can read any Python traceback and locate the cause without guessing',
    'I can trace a program by hand with a variable table and an environment diagram, and predict aliasing behaviour',
    'I can decompose a 200-line problem into pure functions with docstrings and a thin I/O layer',
    'I choose the right collection (list, tuple, dict, set) for a task and can justify it with its cost',
    'I can read and write CSV and JSON files robustly, handle exceptions deliberately, and build an argparse CLI',
    'I can design a small class hierarchy or dataclass model and explain when composition beats inheritance',
    'I write pytest tests first for new functions, use fixtures and parametrize, and measure coverage',
    'I use a debugger, a virtual environment, git branches and a formatter/linter as a matter of habit',
    'I can estimate whether a loop will take milliseconds or hours before running it, and measure to check',
    'I have read and modified a small program in C or JavaScript and can explain how it differs from Python',
  ],
});
