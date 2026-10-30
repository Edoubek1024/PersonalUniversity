import { defineSubject } from '../define';

export default defineSubject({
  id: 'compilers',
  title: 'Compilers and Programming Languages',
  category: 'cs',
  tagline:
    'Build a real compiler end to end: lexing, parsing, types, SSA, optimization, code generation and the runtime that keeps it all alive.',
  description: `A compiler is the most complete program most computer scientists ever write: it reads text, understands it according to precise rules, reasons about it, transforms it, and emits machine code that a processor executes. Studying compilers teaches you how programming languages actually work, why your code is fast or slow, and how to design abstractions that a machine can check and optimise. Almost every large piece of software contains a small language somewhere (a query engine, a template system, a build tool, a shader pipeline), and the techniques here apply to all of them.

This curriculum is built on three free resources that complement each other. *Crafting Interpreters* gives you a working language, Lox, implemented twice: first as a tree-walking interpreter, then as a bytecode virtual machine with closures and a garbage collector. Stanford CS143 supplies the classical theory of lexing, parsing, semantic analysis and code generation. Cornell CS 6120 (self-guided) supplies the modern middle end: intermediate representations, SSA, dataflow analysis and the optimizations that production compilers like LLVM perform. The LLVM Kaleidoscope tutorial shows you what a production backend looks like from the outside.

You will write code in every lesson. Early on you build a lexer and parser for your own language; by the middle you lower it to an intermediate representation, write optimization passes and measure what they buy; by the end you emit x86-64, RISC-V, WebAssembly or LLVM IR and run the result. The capstone is a working compiler for a small language to a real target, with tests, benchmarks and a design document.`,
  difficulty: 'advanced',
  estimatedHours: 110,
  prerequisites: ['data-structures-algorithms', 'computer-architecture', 'theory-of-computation'],
  recommendedBackground: [
    'Fluency in at least one of C, C++, Rust, Java, OCaml or Python; the capstone is easiest in a language with algebraic data types',
    'Trees, graphs, hash tables and recursion without hesitation',
    'Regular expressions and context-free grammars at the level of an automata course',
    'Reading assembly for one ISA (x86-64 or RISC-V)',
  ],
  tags: ['compilers', 'programming-languages', 'parsing', 'LLVM', 'SSA', 'interpreters', 'type-systems'],
  core: true,
  modules: [
    {
      slug: 'overview-and-lexing',
      title: 'Overview and Lexical Analysis',
      description:
        'The shape of a compiler, why it is split into phases, and the first phase in full: turning a stream of characters into tokens by hand and with automata.',
      lessons: [
        {
          slug: 'anatomy-of-a-compiler',
          title: 'Anatomy of a compiler',
          summary:
            'The phases of a compiler, why front end / middle end / back end is the universal architecture, and how compilers, interpreters and JITs relate.',
          estimatedMinutes: 90,
          objectives: [
            'Name the phases of a compiler and state what each consumes and produces',
            'Explain why the three-stage front/middle/back architecture lets M languages target N machines with M+N components',
            'Distinguish compilers, interpreters, transpilers and JITs, and give a real example of each',
            'Use Compiler Explorer to read the assembly a real compiler produces for a small function at -O0 and -O2',
          ],
          concepts: [
            'Lexing, parsing, semantic analysis, IR generation, optimization, code generation',
            'Front end, middle end, back end',
            'Intermediate representation (IR) as the hub',
            'Compiler vs interpreter vs JIT vs transpiler',
            'Static vs dynamic: what is decided before the program runs',
            'Source of truth: the language specification',
            'Self-hosting and bootstrapping',
          ],
          explanation: `Every compiler you will meet, from a 500-line toy to GCC, is a **pipeline**. The **front end** turns text into a tree: a *lexer* groups characters into tokens, a *parser* groups tokens into an abstract syntax tree (AST), and *semantic analysis* resolves names and checks types. The **middle end** lowers the tree to an **intermediate representation** (IR), a simple language that is easier to reason about than source or machine code, and runs *optimizations* that rewrite IR into faster IR with the same meaning. The **back end** turns IR into instructions for a target: *instruction selection*, *register allocation* and *emission*.

The reason for the split is economic. If you have M source languages and N targets, a shared IR means M front ends and N back ends instead of M times N compilers. LLVM is exactly this idea packaged as a library: Clang, Rust, Swift and Julia are front ends that emit LLVM IR and share its optimizer and back ends.

An **interpreter** executes a program without producing machine code; it may walk the AST directly or compile to bytecode for a virtual machine. A **JIT** compiles at run time, using information (which branches are hot, which types actually occur) that a static compiler never sees. The boundaries blur: CPython compiles to bytecode, Java compiles to bytecode and then JITs it, and Crafting Interpreters builds both an AST walker and a bytecode VM for the same language.

Start by reading Crafting Interpreters chapters 1-2 (the map of the territory) and the CS143 introductory lecture. Then open Compiler Explorer, type a ten-line C function, and compare the output at -O0 and -O2. You do not need to understand the assembly yet; notice how much disappears and ask what reasoning justified removing it. That question is the subject.`,
          resources: [
            {
              title: 'Crafting Interpreters — Introduction and A Map of the Territory',
              url: 'https://craftinginterpreters.com/a-map-of-the-territory.html',
              type: 'textbook',
              cost: 'free',
              provider: 'Robert Nystrom',
              note: 'Chapters 1-3. The whole book is free online; a paid print edition exists.',
              primary: true,
            },
            {
              title: 'Stanford CS143 Compilers — course home page',
              url: 'https://web.stanford.edu/class/cs143/',
              type: 'course',
              cost: 'free',
              provider: 'Stanford',
              note: 'Lecture 1 (Introduction) and the course overview. Slides and handouts are public.',
            },
            {
              title: 'Cornell CS 6120 Advanced Compilers — self-guided course',
              url: 'https://www.cs.cornell.edu/courses/cs6120/2020fa/self-guided/',
              type: 'course',
              cost: 'free',
              provider: 'Cornell',
              note: 'Lesson 1 (Welcome and overview) for this lesson; the middle-end lessons are used from module 4 on.',
            },
            {
              title: 'Compiler Explorer',
              url: 'https://godbolt.org/',
              type: 'tool',
              cost: 'free',
              provider: 'Matt Godbolt',
              note: 'Interactive compiler output for dozens of languages and compilers. Used throughout this subject.',
            },
          ],
          exercises: [
            {
              slug: 'phase-walkthrough',
              title: 'Trace one statement through every phase',
              prompt:
                'Take the statement `x = a + b * 2;`. Write down, by hand, the token stream, the parse tree, the AST, a plausible three-address-code IR, and x86-64 or RISC-V instructions. Mark which phase produces each and what information each phase adds or discards (for example, parentheses vanish at the AST, variable names vanish at the IR).',
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'godbolt-o0-vs-o2',
              title: 'Read optimized vs unoptimized output',
              prompt:
                'In Compiler Explorer, write a C function that sums an array of n ints with a for loop. Compile with gcc at -O0 and -O2. Count instructions in the loop body for each, identify which memory accesses and which arithmetic disappeared, and explain in one paragraph what the optimizer must have proven about the program to make each deletion safe. Then add `volatile` to the accumulator and explain what changes.',
              kind: 'coding',
              difficulty: 2,
              hint: 'Look for the loop counter being kept in a register and for vectorised (SIMD) instructions at -O2 and -O3.',
            },
            {
              slug: 'classify-implementations',
              title: 'Classify ten language implementations',
              prompt:
                'For CPython, PyPy, HotSpot JVM, V8, Clang, rustc, TypeScript (tsc), GHC, Lua and LuaJIT: say whether each is a compiler, interpreter, JIT or transpiler (or a combination), what its IR(s) are, and what its final execution target is. Cite one documentation page per implementation.',
              kind: 'writing',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'Why do compilers use an intermediate representation instead of translating source directly to machine code?',
              answerOutline:
                'An IR decouples front ends from back ends (M+N instead of M*N), is simpler than either source or machine code so optimizations are easier to write and verify, and allows the same optimizations to serve many languages and targets.',
            },
            {
              question: 'What information does a JIT have that an ahead-of-time compiler lacks, and why does it matter?',
              answerOutline:
                'Run-time profile: hot paths, observed types, loaded classes, actual CPU model. It can specialise code on these and deoptimise if assumptions break; an AOT compiler must be correct for all possible inputs.',
            },
            {
              question: 'Which phase first notices each of these errors: an unterminated string, a missing semicolon, assigning a string to an int variable, dereferencing null at run time?',
              answerOutline:
                'Lexer; parser; semantic analysis (type checker); none of the static phases, it is a run-time error (unless a static null-safety analysis exists).',
            },
          ],
        },
        {
          slug: 'lexical-analysis-by-hand',
          title: 'Lexical analysis by hand',
          summary:
            'Tokens, lexemes and a hand-written scanner: maximal munch, lookahead, keywords vs identifiers, literals, and reporting good errors.',
          estimatedMinutes: 120,
          objectives: [
            'Define token, lexeme and token type and explain what the scanner discards',
            'Write a hand-coded scanner that handles operators, identifiers, keywords, numbers, strings and comments with one or two characters of lookahead',
            'Apply the maximal-munch rule and explain the cases where it is wrong',
            'Report lexical errors with line and column and continue scanning',
          ],
          concepts: [
            'Token = type + lexeme + position (+ literal value)',
            'Maximal munch (longest match)',
            'Lookahead: peek and peekNext',
            'Keywords as reserved identifiers',
            'Whitespace and comments as discarded tokens',
            'Source positions and error recovery',
            'Scanner as a finite-state machine written by hand',
          ],
          explanation: `A **scanner** (lexer) turns a string of characters into a list of **tokens**. Each token has a *type* (\`NUMBER\`, \`IDENTIFIER\`, \`LEFT_PAREN\`, \`WHILE\`), the *lexeme* (the exact substring), a source position for error messages, and sometimes a parsed value (the integer 42 for lexeme \`42\`). Whitespace and comments are consumed but produce no token; everything the parser does not need is thrown away here, which is why lexing is a separate phase: it keeps the grammar free of character-level noise and runs in linear time.

The core loop is simple: look at the current character, decide which kind of token begins here, consume characters until the token ends, emit it. Two rules settle most ambiguities. **Maximal munch** says take the longest lexeme that forms a valid token: \`<=\` is one token, not \`<\` then \`=\`; \`forward\` is an identifier, not \`for\` then \`ward\`. **Keywords are reserved**: scan an identifier, then check it against a keyword table, rather than trying to match keywords first. Maximal munch is occasionally wrong (C++'s \`>>\` closing two template brackets, Rust's \`..=\`), which is why real lexers sometimes let the parser ask for a re-lex.

Each token kind needs a small amount of **lookahead**: one character to distinguish \`!\` from \`!=\`, two for a number like \`1.5\` versus \`1.\`. You never need more than a fixed amount, which is precisely the claim that tokens are a regular language (next lesson).

Errors matter. An unterminated string or an unknown character should produce a message with line and column, and the scanner should keep going so the user sees all errors at once. Work through the Crafting Interpreters scanning chapter and implement the Lox scanner in your language of choice. Then read CS143's lexical analysis lecture to see the same ideas stated formally.`,
          resources: [
            {
              title: 'Crafting Interpreters — Scanning (chapter 4)',
              url: 'https://craftinginterpreters.com/scanning.html',
              type: 'textbook',
              cost: 'free',
              provider: 'Robert Nystrom',
              note: 'Implement every piece as you read; the chapter builds a complete scanner for Lox.',
              primary: true,
            },
            {
              title: 'CS143 — Lexical Analysis lectures',
              url: 'https://web.stanford.edu/class/cs143/',
              type: 'lecture',
              cost: 'free',
              provider: 'Stanford',
              note: 'The lexical analysis slides under Lectures; the handout on tokens and the longest-match rule.',
            },
            {
              title: 'chibicc — a small C compiler, tokenize.c',
              url: 'https://github.com/rui314/chibicc',
              type: 'documentation',
              cost: 'free',
              provider: 'Rui Ueyama',
              note: 'A production-quality hand-written C tokenizer in a few hundred lines; read tokenize.c after writing your own.',
            },
          ],
          exercises: [
            {
              slug: 'lox-scanner',
              title: 'Implement the Lox scanner',
              prompt:
                'Implement the scanner from chapter 4 of Crafting Interpreters in your language of choice. It must handle all single- and double-character operators, identifiers and the keyword table, integer and decimal numbers, double-quoted strings spanning lines, and line comments. Write a test file with at least 30 lines covering every token type and a tricky-cases file (`<=` vs `< =`, `1.` vs `1.5`, `forward`, an unterminated string). Your test harness should print tokens as `TYPE lexeme line` and compare against expected output.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'block-comments',
              title: 'Nested block comments',
              prompt:
                'Add C-style `/* ... */` block comments to your scanner, then make them nest (as in Rust and OCaml). Explain why nested comments cannot be described by a regular expression, and why that does not matter for a hand-written scanner. Test with three levels of nesting and with an unterminated comment, which must report the line where it started.',
              kind: 'coding',
              difficulty: 2,
              hint: 'Keep a depth counter. Regular languages cannot count, but your scanner loop can.',
            },
            {
              slug: 'scanner-benchmark',
              title: 'Measure your scanner',
              prompt:
                'Generate a 10 MB source file by repeating a valid program. Time your scanner on it, report tokens per second, and profile to find the hottest function. Then apply one optimization (e.g. avoiding substring allocation per token, or a switch on the first character instead of a chain of ifs) and report the speedup. State what you measured and how many runs you averaged.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why scan identifiers first and then check a keyword table, instead of matching keywords directly?',
              answerOutline:
                'Maximal munch: matching `for` directly would split `forward`. Scanning the full identifier then checking the table respects longest match and keeps the code simple.',
            },
            {
              question: 'What does a token need to carry, and why is the source position essential?',
              answerOutline:
                'Type, lexeme (or value), and line/column (or byte offset). Every later phase reports errors in terms of source positions; without them diagnostics are useless.',
            },
            {
              question: 'Why should a scanner continue after an error rather than stop?',
              answerOutline:
                'To report all lexical errors in one run; recovery is cheap at the token level (skip the bad character, emit an error token) and users prefer seeing every problem at once.',
            },
          ],
        },
        {
          slug: 'regular-expressions-and-automata',
          title: 'Regular expressions, NFAs and DFAs',
          summary:
            'The theory behind scanners: tokens as regular languages, Thompson construction, subset construction, DFA minimization and why scanning is linear time.',
          estimatedMinutes: 120,
          objectives: [
            'Write the regular expressions for the tokens of a small language',
            'Convert a regular expression to an NFA (Thompson) and an NFA to a DFA (subset construction) by hand',
            'Explain how a DFA-based scanner implements maximal munch with a single pass and backtracking to the last accepting state',
            'State why nested structures (parentheses, comments) are beyond regular languages',
          ],
          concepts: [
            'Regular expression: union, concatenation, Kleene star',
            'NFA with epsilon transitions',
            'Thompson construction',
            'Subset construction (NFA to DFA)',
            'DFA minimization',
            'Longest match with the last-accepting-state trick',
            'Table-driven vs direct-coded scanners',
          ],
          explanation: `The lexer you wrote by hand *is* a finite automaton; you just coded the states as program locations. Making that explicit lets a tool generate the scanner from a specification and guarantees linear-time scanning.

A **regular expression** describes each token type: identifiers are \`[a-zA-Z_][a-zA-Z0-9_]*\`, numbers \`[0-9]+(\\.[0-9]+)?\`, and so on. **Thompson's construction** turns any regex into an **NFA** with epsilon transitions by composing small machines for union, concatenation and star; each construct adds a constant number of states, so the NFA is linear in the regex size. The **subset construction** turns the NFA into a **DFA** whose states are sets of NFA states; this can blow up exponentially in theory but is small for real token sets. **Minimization** (Hopcroft's algorithm or partition refinement) merges indistinguishable states.

To scan, take the union of all token regexes and tag each accepting state with the token it recognises (resolving ties by rule order, so keywords beat identifiers). Run the DFA from the current position, remembering the last accepting state and its position; when the DFA has no transition, back up to that position and emit the token. That is **maximal munch** mechanised, and because backup is bounded by the longest token, scanning is linear.

Nested comments and balanced parentheses need a counter, which a finite automaton does not have; the pumping lemma makes this precise. That is why the parser, with a stack, handles nesting and the lexer does not.

Read the CS143 lectures on regular languages and finite automata and work the examples by hand before trusting a tool. The theory-of-computation subject covers the proofs; here you need fluency in the constructions.`,
          resources: [
            {
              title: 'CS143 — Finite Automata and Implementation of Lexical Analysis',
              url: 'https://web.stanford.edu/class/cs143/',
              type: 'lecture',
              cost: 'free',
              provider: 'Stanford',
              note: 'The lectures on regular expressions, NFAs, DFAs and the scanner implementation.',
              primary: true,
            },
            {
              title: 'Russ Cox — Regular Expression Matching Can Be Simple And Fast',
              url: 'https://swtch.com/~rsc/regexp/regexp1.html',
              type: 'article',
              cost: 'free',
              provider: 'Russ Cox',
              note: 'Thompson NFA simulation vs backtracking, with code. Essential reading on why linear-time matching matters.',
            },
            {
              title: 'flex — The Fast Lexical Analyzer manual',
              url: 'https://westes.github.io/flex/manual/',
              type: 'documentation',
              cost: 'free',
              provider: 'GNU / westes',
              note: 'See the sections on how the matcher works and on performance considerations.',
            },
          ],
          exercises: [
            {
              slug: 'regex-to-dfa-by-hand',
              title: 'Regex to minimal DFA by hand',
              prompt:
                'For the token set { `if`, identifiers `[a-z]+`, integers `[0-9]+`, `<`, `<=` }: write the combined regex, draw the Thompson NFA, perform the subset construction (show every DFA state as a set of NFA states), and minimise. Mark the accepting states with their token and show how the input `if<=ifx` is scanned using last-accepting-state backup.',
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'implement-thompson-and-subset',
              title: 'Implement Thompson and subset construction',
              prompt:
                'Write a program that parses a regex (union, concatenation, star, parentheses, character classes), builds the NFA by Thompson construction, converts it to a DFA by subset construction, and matches input strings. Test on 20 regex/string pairs against your language\'s standard regex library. Report the NFA and DFA state counts for each regex and find one regex where the DFA is much larger than the NFA.',
              kind: 'coding',
              difficulty: 3,
              hint: 'The regex `(a|b)*a(a|b)(a|b)...(a|b)` with n copies of (a|b) after the a has an NFA of size O(n) and a minimal DFA of size 2^(n+1).',
            },
            {
              slug: 'backtracking-blowup',
              title: 'Catastrophic backtracking',
              prompt:
                'Time a backtracking regex engine (Python `re`, Java) on the pattern `(a*)*b` against inputs of 20, 25 and 30 a\'s. Then time your Thompson/DFA matcher on the same inputs. Plot both. Explain which algorithm each engine uses and why the curves differ.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why can the subset construction produce exponentially many states, and why is this rarely a problem for scanners?',
              answerOutline:
                'DFA states are subsets of NFA states (up to 2^n). Token regexes are simple and mostly disjoint by first character, so reachable subsets are few; minimization shrinks them further.',
            },
            {
              question: 'How does a DFA scanner implement longest match?',
              answerOutline:
                'Keep running while transitions exist, recording the last accepting state and position; on a dead state, back up to that position and emit that token.',
            },
            {
              question: 'Why cannot a regular expression recognise nested comments?',
              answerOutline:
                'Recognising nesting requires counting unbounded depth; finite automata have finite memory. The pumping lemma formalises this.',
            },
          ],
          relatedLessons: ['theory-of-computation/finite-automata-and-regular-languages/regular-expressions-and-kleene'],
        },
        {
          slug: 'lexer-generators-and-practicalities',
          title: 'Lexer generators and real-world lexing',
          summary:
            'Using flex or re2c, and the practical issues generators do not solve: Unicode, string escapes, numeric literal edge cases, lexer states and context-sensitive tokens.',
          estimatedMinutes: 90,
          objectives: [
            'Write a lexer specification for a generator (flex, re2c, or a library like logos) and compare it to your hand-written scanner',
            'Handle Unicode identifiers and string escapes correctly',
            'Explain lexer modes/states and when a lexer must be context-sensitive (template strings, nested interpolation, C typedef names)',
            'Benchmark generated against hand-written scanners and interpret the result',
          ],
          concepts: [
            'Lexer generator: spec in, scanner out',
            'Rule priority and longest match in generators',
            'Start conditions / lexer modes',
            'Unicode: code points, UTF-8 decoding, identifier classes',
            'String escapes and raw strings',
            'The lexer hack (typedef names in C)',
            'String interpolation and re-entrant lexing',
          ],
          explanation: `Lexer generators like **flex** and **re2c** take a list of (regex, action) rules and emit a DFA-driven scanner. Rules resolve ties by longest match first, then by rule order, which is why the keyword rules precede the identifier rule in every flex specification. The generated code is fast and, more importantly, the specification is readable and obviously complete. Hand-written scanners win on error messages and on the special cases below; most production compilers (Clang, rustc, Go) write theirs by hand, while many tools (SQL engines, config parsers) use generators. You should be able to do both.

The hard parts of lexing are not the automaton. **Unicode** identifiers mean you decode UTF-8 and classify code points by Unicode category, and you must decide normalisation (are \`é\` composed and decomposed the same identifier?). **String literals** need escape processing (\`\\n\`, \`\\u{1F600}\`), raw strings, and a decision whether the lexer or a later phase decodes escapes. **Numeric literals** have hex, octal, binary, underscores, exponents and suffixes, and the difference between \`1..2\` (a range) and \`1.2\` (a float) is a classic trap.

Some tokens depend on **context**. In C, whether \`x * y\` is a multiplication or a pointer declaration depends on whether \`x\` is a typedef name, so the parser feeds the lexer a symbol table: the "lexer hack". **String interpolation** (\`"a \${b + 1} c"\` in many languages) requires the lexer to switch modes and recursively lex an expression inside a string; generators support this with start conditions, hand-written lexers with a mode stack.

Write your language's lexer a second time with a generator, benchmark both on the 10 MB file from the previous lesson, and keep whichever you prefer for the project.`,
          resources: [
            {
              title: 'flex manual — patterns, start conditions and performance',
              url: 'https://westes.github.io/flex/manual/',
              type: 'documentation',
              cost: 'free',
              provider: 'GNU / westes',
              primary: true,
            },
            {
              title: 're2c — lexer generator for C, C++, Go and Rust',
              url: 'https://re2c.org/',
              type: 'tool',
              cost: 'free',
              provider: 're2c project',
              note: 'Generates direct-coded scanners; the manual has a good explanation of longest match and of re-entrant lexing.',
            },
            {
              title: 'Unicode Standard Annex #31: Identifier and Pattern Syntax',
              url: 'https://www.unicode.org/reports/tr31/',
              type: 'documentation',
              cost: 'free',
              provider: 'Unicode Consortium',
              note: 'The definition of XID_Start / XID_Continue that most modern languages use for identifiers.',
            },
          ],
          exercises: [
            {
              slug: 'generated-lexer',
              title: 'Re-implement your lexer with a generator',
              prompt:
                'Write a flex, re2c or logos specification for the same token set as your hand-written lexer. Run both on your test files and diff the token streams: they must agree exactly. Then benchmark both on the 10 MB file and report tokens per second, with the compiler flags used.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'string-interpolation',
              title: 'Lex string interpolation',
              prompt:
                'Add interpolated strings of the form `"text ${expr} text"` where expr can itself contain strings with interpolation. Implement it with a mode stack in your hand-written lexer. Define the token stream you emit (e.g. STRING_START, STRING_PART, INTERP_START, ..., STRING_END) and test on three levels of nesting plus an unterminated interpolation.',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'number-literal-torture',
              title: 'Numeric literal torture test',
              prompt:
                'Write 25 numeric-literal test cases covering hex, binary, octal, underscores, exponents, leading dots, trailing dots, and the range ambiguity `1..2`. Decide and document the rule for each, implement it, and check the behaviour of two real languages (Rust and Python, say) on the same inputs.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'How does flex decide which rule matches when two rules could apply?',
              answerOutline:
                'Longest match first; if lengths tie, the rule listed first in the specification wins. Keywords therefore precede the identifier rule.',
            },
            {
              question: 'What is the lexer hack and what does it reveal about the lexer/parser boundary?',
              answerOutline:
                'In C the lexer must consult the parser\'s symbol table to tokenise typedef names differently from identifiers. The boundary is a design choice, not a law; C\'s grammar is not context-free at the token level.',
            },
            {
              question: 'Give two reasons a production compiler might prefer a hand-written lexer.',
              answerOutline:
                'Better error messages and recovery; easy handling of modes, interpolation and context sensitivity; no build-time dependency; often faster in practice.',
            },
          ],
        },
      ],
      project: {
        slug: 'lexer-for-your-language',
        title: 'Module project: a lexer with a test suite',
        description:
          'Design the token set for the language you will compile in the capstone (a small imperative language with functions, integers, booleans, strings and arrays is ideal). Write its lexer with line/column tracking, error recovery and a golden-file test suite, and benchmark it.',
        deliverables: [
          'A written token specification (regexes plus the maximal-munch and keyword rules)',
          'The lexer with at least 40 golden tests including error cases',
          'A benchmark script and a short note on throughput and the hottest function',
        ],
        estimatedHours: 8,
      },
    },
    {
      slug: 'parsing',
      title: 'Parsing',
      description:
        'Context-free grammars and the two families of parsers: top-down (recursive descent, Pratt) and bottom-up (LR), plus building a good AST and reporting good errors.',
      lessons: [
        {
          slug: 'grammars-and-parse-trees',
          title: 'Context-free grammars, ambiguity and the AST',
          summary:
            'How to specify syntax with a grammar, recognise and remove ambiguity, encode precedence and associativity, and decide what the AST should and should not keep.',
          estimatedMinutes: 100,
          objectives: [
            'Write a context-free grammar for expressions and statements of a small language',
            'Show that a grammar is ambiguous with two parse trees and fix it by stratifying precedence levels',
            'Encode left and right associativity in the grammar',
            'Distinguish a parse tree from an abstract syntax tree and design an AST for your language',
          ],
          concepts: [
            'Context-free grammar: terminals, nonterminals, productions',
            'Derivation and parse tree',
            'Ambiguity; the dangling else',
            'Precedence by stratification; associativity by recursion direction',
            'Concrete syntax tree vs abstract syntax tree',
            'EBNF notation',
            'Algebraic data types for AST nodes',
          ],
          explanation: `Tokens are regular; the structure built from them is not, because expressions nest. A **context-free grammar** describes that structure with productions such as \`expr -> expr "+" expr | NUMBER\`. A **derivation** rewrites the start symbol step by step into a sentence, and the **parse tree** records which productions were used. The parser's job is to recover the tree from the sentence.

The grammar above is **ambiguous**: \`1 + 2 * 3\` has two parse trees. Ambiguity is a property of the grammar, not the language, and you remove it by rewriting. The standard technique is to **stratify by precedence**: one nonterminal per precedence level, each defined in terms of the next tighter level, so \`expr -> term (("+"|"-") term)*\` and \`term -> factor (("*"|"/") factor)*\`. **Associativity** comes from the direction of recursion: \`expr -> expr "-" term\` is left-associative, \`assign -> IDENT "=" assign\` is right-associative. The **dangling else** (\`if a if b s1 else s2\`) is the classic statement-level ambiguity; most languages resolve it by rule ("else binds to the nearest if") rather than by grammar.

The parse tree contains every token, including parentheses and the chain of single-child nodes produced by stratification. The **abstract syntax tree** keeps only what later phases need: a \`Binary(op, left, right)\` node, not the five levels of nonterminals that produced it. Grouping parentheses vanish because the tree shape already encodes them. In a language with algebraic data types, the AST is a sum type with one constructor per node kind; in Java it is a class hierarchy, and Crafting Interpreters generates that hierarchy with a script.

Read the Crafting Interpreters chapter on representing code, then the CS143 lectures on grammars. Write the full grammar for your language in EBNF before writing a parser: an afternoon with a grammar saves a week with a parser.`,
          resources: [
            {
              title: 'Crafting Interpreters — Representing Code (chapter 5)',
              url: 'https://craftinginterpreters.com/representing-code.html',
              type: 'textbook',
              cost: 'free',
              provider: 'Robert Nystrom',
              note: 'Grammars, the expression problem and AST classes.',
              primary: true,
            },
            {
              title: 'CS143 — Introduction to Parsing (context-free grammars, derivations, ambiguity)',
              url: 'https://web.stanford.edu/class/cs143/',
              type: 'lecture',
              cost: 'free',
              provider: 'Stanford',
              note: 'The "Introduction to Parsing" lecture and the accompanying handout on grammars.',
            },
            {
              title: 'The Lox grammar — Crafting Interpreters appendix I',
              url: 'https://craftinginterpreters.com/appendix-i.html',
              type: 'documentation',
              cost: 'free',
              provider: 'Robert Nystrom',
              note: 'A complete, unambiguous grammar for a real small language. Use it as a model for yours.',
            },
          ],
          exercises: [
            {
              slug: 'ambiguity-proof',
              title: 'Show ambiguity, then remove it',
              prompt:
                'For the grammar `E -> E + E | E * E | E ^ E | (E) | NUM`, draw two parse trees for `2 ^ 3 ^ 2 * 4` and compute the values each tree denotes. Rewrite the grammar so that ^ binds tightest and is right-associative, * is next and left-associative, and + is loosest and left-associative. Draw the unique tree for the same input.',
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'your-language-grammar',
              title: 'Write the grammar for your language',
              prompt:
                'Write a complete EBNF grammar for your capstone language: declarations, statements (if/while/for/return/block), expressions with at least six precedence levels, calls and indexing. Then write 15 programs in the language, each exercising a different production, and for three of them draw the AST you intend to build. Identify any ambiguity and how you resolve it.',
              kind: 'writing',
              difficulty: 2,
            },
            {
              slug: 'ast-definition',
              title: 'Define the AST types',
              prompt:
                'Define AST node types for your grammar in your implementation language (enum/ADT, class hierarchy, or tagged struct). Every node must carry a source span. Write a pretty-printer that converts an AST back to source text and a debug printer that prints the tree in S-expression form, e.g. `(+ 1 (* 2 3))`. You will use both to test the parser.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Is ambiguity a property of the grammar or of the language?',
              answerOutline:
                'Of the grammar: the same language can have ambiguous and unambiguous grammars (though some languages are inherently ambiguous). We fix ambiguity by rewriting the grammar or by disambiguation rules.',
            },
            {
              question: 'How does a grammar express that subtraction is left-associative?',
              answerOutline:
                'Left recursion: `expr -> expr "-" term | term`. The leftmost operations are deepest in the tree. In EBNF with iteration, the parser builds the tree left-to-right.',
            },
            {
              question: 'Why do grouping parentheses not appear in the AST?',
              answerOutline:
                'Tree structure already encodes grouping; a Grouping node would add nothing for evaluation or codegen. (Pretty-printers reinsert them from precedence.)',
            },
          ],
          relatedLessons: ['theory-of-computation/context-free-languages/context-free-grammars'],
        },
        {
          slug: 'recursive-descent-and-pratt',
          title: 'Recursive descent and Pratt parsing',
          summary:
            'Top-down parsing: LL(1) conditions, FIRST and FOLLOW sets, eliminating left recursion, Pratt (precedence-climbing) parsing for expressions, and panic-mode error recovery.',
          estimatedMinutes: 150,
          objectives: [
            'Write a recursive-descent parser directly from a grammar, one function per nonterminal',
            'Compute FIRST and FOLLOW sets and decide whether a grammar is LL(1)',
            'Eliminate left recursion and left-factor a grammar',
            'Implement a Pratt parser with binding powers for prefix, infix and postfix operators',
            'Implement panic-mode error recovery with synchronisation tokens',
          ],
          concepts: [
            'Recursive descent: one function per nonterminal',
            'LL(1), FIRST and FOLLOW sets, predictive parsing',
            'Left recursion elimination and left factoring',
            'Pratt parsing: binding power, nud/led',
            'Precedence climbing as a special case',
            'Panic mode, synchronisation points, error productions',
            'Lookahead and backtracking',
          ],
          explanation: `**Recursive descent** is the parsing technique used by most production compilers because it is simple, fast and gives full control over error messages. Each nonterminal becomes a function; each alternative is chosen by looking at the next token; each terminal is consumed with a \`match\` that reports an error if the wrong token appears. The grammar must be such that one token of lookahead suffices: for each nonterminal, the **FIRST** sets of its alternatives must be disjoint, and if an alternative can derive the empty string, its FIRST must be disjoint from the nonterminal's **FOLLOW** set. That is the **LL(1)** condition, and CS143 shows how to compute the sets.

Two transformations make grammars LL(1). **Left recursion** (\`expr -> expr "+" term\`) would recurse forever; rewrite as iteration (\`expr -> term ("+" term)*\`) and build the left-associative tree in a loop. **Left factoring** pulls out common prefixes so the choice can be made on one token.

For expressions, stratifying ten precedence levels means ten nearly identical functions and ten nested calls to parse a single literal. **Pratt parsing** replaces them with one function: each operator has a *binding power*; \`parseExpr(minBP)\` parses a prefix (a literal, a unary operator, a parenthesised expression) and then loops, consuming infix operators whose left binding power exceeds \`minBP\` and recursing on the right with that operator's right binding power. Associativity is the difference between left and right binding powers. It is short, fast, and makes adding an operator a one-line table entry. Crafting Interpreters uses this in clox; matklad's article is the clearest standalone treatment.

For errors, use **panic mode**: on an unexpected token, report, then discard tokens until a synchronisation point (a semicolon or a keyword that starts a statement) and continue, so one typo does not produce fifty messages. Implement the Lox parser from the book, then rewrite its expression part as a Pratt parser and compare the code size.`,
          resources: [
            {
              title: 'Crafting Interpreters — Parsing Expressions (chapter 6)',
              url: 'https://craftinginterpreters.com/parsing-expressions.html',
              type: 'textbook',
              cost: 'free',
              provider: 'Robert Nystrom',
              note: 'Recursive descent with precedence stratification and panic-mode recovery.',
              primary: true,
            },
            {
              title: 'Simple but Powerful Pratt Parsing (matklad)',
              url: 'https://matklad.github.io/2020/04/13/simple-but-powerful-pratt-parsing.html',
              type: 'article',
              cost: 'free',
              provider: 'Alex Kladov',
              note: 'The best explanation of binding powers, with a full Rust implementation covering prefix, postfix and mixfix operators.',
            },
            {
              title: 'CS143 — Top-Down Parsing (LL(1), FIRST/FOLLOW, predictive parsing)',
              url: 'https://web.stanford.edu/class/cs143/',
              type: 'lecture',
              cost: 'free',
              provider: 'Stanford',
            },
            {
              title: 'Crafting Interpreters — Compiling Expressions (Pratt parser in clox, chapter 17)',
              url: 'https://craftinginterpreters.com/compiling-expressions.html',
              type: 'textbook',
              cost: 'free',
              provider: 'Robert Nystrom',
              note: 'The same language parsed with a Pratt table; compare with chapter 6.',
            },
          ],
          exercises: [
            {
              slug: 'first-follow',
              title: 'FIRST, FOLLOW and the LL(1) test',
              prompt:
                'For the grammar `S -> i E t S S\' | a ; S\' -> e S | ε ; E -> b` (the dangling-else grammar), compute FIRST and FOLLOW for every nonterminal, build the LL(1) parsing table, and show the conflict. Explain how a recursive-descent parser resolves it in practice. Then compute the sets for your own language\'s statement grammar and confirm it is LL(1) or fix it.',
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'recursive-descent-parser',
              title: 'Recursive-descent parser for your language',
              prompt:
                'Implement a recursive-descent parser for your full grammar producing your AST. Test it with the round-trip property: parse, pretty-print, parse again, and assert the two ASTs are equal, on all 15 programs from the grammar exercise plus 10 error programs. Error programs must produce exactly one diagnostic each, with the correct line, and the parser must not crash.',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'pratt-expressions',
              title: 'Pratt parser with a binding-power table',
              prompt:
                'Replace the expression part of your parser with a Pratt parser driven by a table of (operator, left bp, right bp). Support prefix minus and not, infix arithmetic/comparison/logic, right-associative assignment, postfix call `f(x)` and index `a[i]`. Write a test that parses `-a * b + c ^ d ^ e = f` and checks the S-expression output, then count the lines of code saved compared to the stratified version.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What two conditions make a grammar LL(1)?',
              answerOutline:
                'For each nonterminal, FIRST sets of alternatives are pairwise disjoint; and if an alternative is nullable, its FIRST is disjoint from FOLLOW of the nonterminal.',
            },
            {
              question: 'In a Pratt parser, how is left vs right associativity expressed?',
              answerOutline:
                'By the pair of binding powers: left-associative operators have right bp greater than left bp (so an equal operator on the right does not bind), right-associative the opposite.',
            },
            {
              question: 'Why does a recursive-descent parser loop forever on a left-recursive production?',
              answerOutline:
                'parseExpr calls parseExpr as its first action without consuming any token, so the recursion never terminates. Rewrite as iteration or right recursion.',
            },
            {
              question: 'What is panic-mode recovery and what are good synchronisation tokens?',
              answerOutline:
                'After an error, skip tokens until a point where parsing can plausibly resume: statement terminators (;) and statement/declaration keywords (if, while, fun, var, return).',
            },
          ],
        },
        {
          slug: 'lr-parsing-and-generators',
          title: 'Bottom-up parsing: LR, LALR and parser generators',
          summary:
            'Shift-reduce parsing, LR(0) items and automata, SLR and LALR(1) tables, resolving conflicts, and using Bison or another generator.',
          estimatedMinutes: 150,
          objectives: [
            'Simulate a shift-reduce parser by hand on a small input, showing the stack at each step',
            'Construct the LR(0) automaton for a small grammar and build an SLR(1) table',
            'Diagnose shift/reduce and reduce/reduce conflicts and fix them with precedence declarations or grammar changes',
            'Write a Bison (or similar) grammar for your language and compare it with your recursive-descent parser',
          ],
          concepts: [
            'Shift-reduce parsing; handles; the parse stack',
            'LR(0) items and the canonical collection',
            'SLR(1), LR(1), LALR(1)',
            'ACTION and GOTO tables',
            'Shift/reduce and reduce/reduce conflicts',
            'Precedence and associativity declarations',
            'Parser generators: Bison, ANTLR, LALRPOP, tree-sitter',
          ],
          explanation: `Top-down parsers decide which production to use *before* seeing its body. **Bottom-up (LR) parsers** decide *after*: they shift tokens onto a stack until the top of the stack matches the right-hand side of a production (a **handle**), then reduce it to the nonterminal. This lets LR parsers handle left recursion natively and accept a strictly larger class of grammars than LL(1), including nearly every programming language grammar as written.

The machinery is an automaton whose states are sets of **LR(0) items**: productions with a dot marking how much has been seen. The parser's stack holds states; the **ACTION** table says shift, reduce, accept or error for each (state, token), and **GOTO** says which state to enter after a reduce. **SLR(1)** uses FOLLOW sets to decide when to reduce; **LR(1)** carries a lookahead in each item and is more precise but produces huge tables; **LALR(1)** merges LR(1) states with the same core and is what Bison builds.

A **conflict** means the table has two entries. Shift/reduce conflicts arise from ambiguity (dangling else: shift the else) or from missing precedence (\`E -> E + E | E * E\`: declare \`%left '+'\` and \`%left '*'\` with \`*\` higher). Reduce/reduce conflicts usually mean a real grammar bug. Learning to read a generator's conflict report is the practical skill of this lesson.

Generators excel when the grammar changes often or must be shared with other tools, and they verify unambiguity for you, which no hand-written parser does. Many modern compilers nonetheless hand-write recursive descent for error quality. Tree-sitter, a GLR-based generator, shows a third way: incremental, error-tolerant parsing for editors.

Work through the CS143 bottom-up lectures, build the LR(0) automaton for a four-production grammar by hand, then write a Bison grammar for your language and resolve every conflict it reports.`,
          resources: [
            {
              title: 'CS143 — Bottom-Up Parsing (shift-reduce, LR(0), SLR, LR(1), LALR)',
              url: 'https://web.stanford.edu/class/cs143/',
              type: 'lecture',
              cost: 'free',
              provider: 'Stanford',
              note: 'Three lectures; work the handout examples by hand.',
              primary: true,
            },
            {
              title: 'GNU Bison manual',
              url: 'https://www.gnu.org/software/bison/manual/',
              type: 'documentation',
              cost: 'free',
              provider: 'GNU',
              note: 'The chapters on the Bison grammar file, precedence declarations and debugging conflicts (-Wcounterexamples is invaluable).',
            },
            {
              title: 'tree-sitter — incremental parsing system',
              url: 'https://tree-sitter.github.io/tree-sitter/',
              type: 'tool',
              cost: 'free',
              provider: 'tree-sitter project',
              note: 'A GLR generator used by editors; read "Creating Parsers" to see a different set of design goals.',
            },
            {
              title: 'ANTLR parser generator',
              url: 'https://www.antlr.org/',
              type: 'tool',
              cost: 'free',
              provider: 'Terence Parr',
              note: 'An LL(*) generator; useful contrast with LALR.',
            },
          ],
          exercises: [
            {
              slug: 'lr0-automaton-by-hand',
              title: 'Build an LR(0) automaton and SLR table',
              prompt:
                'For the grammar `S -> E ; E -> E + T | T ; T -> ( E ) | id`, construct the augmented grammar, all LR(0) item sets, the transitions between them, and the SLR(1) ACTION/GOTO table. Then trace the parse of `id + ( id + id )` showing the stack and input at every step. Identify any state that would have a conflict under LR(0) but not SLR(1).',
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'bison-grammar',
              title: 'Your language in Bison',
              prompt:
                'Write a Bison grammar for your language that builds the same AST as your recursive-descent parser. Use precedence declarations for expressions. Run `bison -Wcounterexamples` and eliminate every conflict, documenting each one and how you resolved it. Verify equivalence by parsing all your test programs with both parsers and comparing S-expression output.',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'conflict-diagnosis',
              title: 'Diagnose three conflicts',
              prompt:
                'Feed Bison three grammars: the dangling-else grammar, an expression grammar with no precedence declarations, and a grammar with the productions `A -> x B | x C ; B -> y ; C -> y`. For each, explain from the conflict report what the parser cannot decide, whether the grammar or the language is at fault, and the fix.',
              kind: 'problem',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why can LR parsers handle left-recursive grammars when LL parsers cannot?',
              answerOutline:
                'An LR parser shifts input and reduces only after seeing a complete right-hand side, so left recursion just means reducing E then shifting + T; no decision is made before consuming input.',
            },
            {
              question: 'What is the difference between LR(1) and LALR(1)?',
              answerOutline:
                'LALR(1) merges LR(1) states with identical cores, giving tables as small as SLR. It can introduce reduce/reduce conflicts that LR(1) does not have, but never shift/reduce ones; in practice almost all grammars are LALR(1).',
            },
            {
              question: 'How does `%left \'+\'` resolve a shift/reduce conflict?',
              answerOutline:
                'When the lookahead is + and the handle ends with +, equal precedence with left associativity means reduce; higher precedence of the lookahead means shift.',
            },
          ],
        },
        {
          slug: 'ast-design-and-error-reporting',
          title: 'AST design, diagnostics and testing the front end',
          summary:
            'Representing trees efficiently, the visitor pattern and its alternatives, source spans and quality diagnostics, and testing parsers with golden files, round-tripping and fuzzing.',
          estimatedMinutes: 100,
          objectives: [
            'Choose an AST representation (boxed tree, arena with indices, or flat tagged array) and justify it by memory and traversal cost',
            'Implement traversals with the visitor pattern or pattern matching and explain the expression problem',
            'Produce diagnostics with spans, labels and suggestions in the style of rustc or clang',
            'Test a parser with golden files, round-trip properties and a grammar-based fuzzer',
          ],
          concepts: [
            'Tree representations: pointers, arenas, indices',
            'Visitor pattern vs pattern matching; the expression problem',
            'Source spans; line tables; byte offsets',
            'Diagnostic quality: primary and secondary labels, notes, fix-its',
            'Golden tests and snapshot testing',
            'Round-trip property: parse . print . parse',
            'Grammar-based fuzzing and differential testing',
          ],
          explanation: `The AST is the data structure every later phase touches, so its design affects the whole compiler. A **pointer-based tree** (one heap object per node) is simplest and fine for a first compiler. Production compilers often use an **arena**: all nodes in one vector, children referenced by index, which gives cache locality, cheap allocation and trivial serialisation. rustc, for instance, stores the AST with node ids and keeps side tables (types, spans) indexed by those ids, so adding information never changes the tree type.

Traversal raises the **expression problem**: with classes it is easy to add node kinds but hard to add operations; with pattern matching on a sum type it is the reverse. The **visitor pattern** restores the ability to add operations to a class hierarchy; Crafting Interpreters uses it in jlox. In OCaml, Rust or Haskell, a \`match\` is the visitor.

Diagnostics are a product feature. Store a **span** (byte range) on every node and keep a line table so you can map bytes to line and column lazily. A good error has a primary label on the offending span, secondary labels for context ("expected because of this opening brace here"), and ideally a suggested fix. Collect errors in a list and continue; do not throw on the first one.

Testing a parser without a reference implementation is a real problem. **Golden tests** store the S-expression output for each input and fail on any change; review the diff when the change is intended. The **round-trip property** (parse, pretty-print, parse again, compare trees) checks printer and parser together. A **grammar-based fuzzer** generates random valid programs from your EBNF and asserts the parser accepts them; a mutation fuzzer flips tokens and asserts the parser never crashes. If you have two parsers (recursive descent and Bison), **differential testing** compares them on thousands of generated inputs.`,
          resources: [
            {
              title: 'Crafting Interpreters — Representing Code: the Visitor pattern',
              url: 'https://craftinginterpreters.com/representing-code.html',
              type: 'textbook',
              cost: 'free',
              provider: 'Robert Nystrom',
              note: 'Sections on the expression problem and the visitor pattern.',
              primary: true,
            },
            {
              title: 'rustc dev guide — Diagnostics',
              url: 'https://rustc-dev-guide.rust-lang.org/diagnostics.html',
              type: 'documentation',
              cost: 'free',
              provider: 'Rust project',
              note: 'How a production compiler structures diagnostics: spans, labels, suggestions, error codes.',
            },
            {
              title: 'Modern Compiler Implementation in ML/Java/C (Appel) — book page',
              url: 'https://www.cs.princeton.edu/~appel/modern/',
              type: 'textbook',
              cost: 'paid',
              provider: 'Andrew Appel',
              note: 'Chapter 4 on abstract syntax is a classic treatment. Free alternative: the Crafting Interpreters chapter above and the CS143 handouts.',
            },
          ],
          exercises: [
            {
              slug: 'arena-ast',
              title: 'Arena-allocated AST with side tables',
              prompt:
                'Convert your AST to an arena representation: nodes in a vector, children as indices, spans in a parallel vector. Measure peak memory and parse time on the 10 MB file before and after. Then add a side table for a future "type of each expression" without changing the node type.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'rich-diagnostics',
              title: 'Diagnostics with labels',
              prompt:
                'Implement a diagnostic renderer that prints the source line, carets under the primary span, and a secondary label for a related span. Produce three errors with secondary labels: unclosed block (point at the opening brace), mismatched closing paren (point at the open), and duplicate parameter (point at the first occurrence). Compare your output with rustc\'s for equivalent Rust programs.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'grammar-fuzzer',
              title: 'Grammar-based fuzzer and differential test',
              prompt:
                'Write a generator that produces random programs from your EBNF with a depth limit. Generate 10,000 programs, assert your parser accepts each and that the round-trip property holds. Then mutate each program by deleting a random token and assert the parser reports an error without crashing or hanging. Record any bug found and the minimal failing input.',
              kind: 'coding',
              difficulty: 3,
              hint: 'Shrink failing inputs by repeatedly deleting tokens while the failure persists; this is what property-testing libraries do automatically.',
            },
          ],
          selfAssessment: [
            {
              question: 'State the expression problem and how visitors and pattern matching each solve half of it.',
              answerOutline:
                'Adding new node types vs new operations without modifying existing code. Class hierarchies make new types easy, new operations hard; the visitor inverts this. Pattern matching on sum types makes operations easy and types hard.',
            },
            {
              question: 'Why store byte spans rather than line/column on nodes?',
              answerOutline:
                'Two integers per node, cheap to compute; line/column is derived lazily from a line table only when printing a diagnostic. Spans also compose (start of first child to end of last).',
            },
            {
              question: 'What does the round-trip property test, and what bug would it miss?',
              answerOutline:
                'That parse and pretty-print are mutually consistent. It misses a parser that consistently builds the wrong tree if the printer reproduces the source anyway (e.g. wrong associativity if the printer always parenthesises).',
            },
          ],
        },
      ],
      project: {
        slug: 'parser-for-your-language',
        title: 'Module project: a parser with diagnostics and a fuzzer',
        description:
          'Complete the front end syntax for your capstone language: a recursive-descent/Pratt parser producing a span-annotated AST, a pretty-printer, rich diagnostics with recovery, and a test suite including golden files, round-trip tests and a grammar-based fuzzer.',
        deliverables: [
          'Parser and AST with spans; pretty-printer and S-expression dumper',
          'At least 60 golden tests, including 20 error cases with expected diagnostics',
          'A fuzzer that runs 10,000 generated programs in CI without failures',
          'A one-page document on the grammar, precedence table and error-recovery strategy',
        ],
        estimatedHours: 12,
        stretchGoals: ['Also write the grammar in Bison or LALRPOP and differentially test the two parsers'],
      },
    },
    {
      slug: 'semantic-analysis-and-types',
      title: 'Semantic Analysis and Types',
      description:
        'Everything a compiler checks after syntax: name resolution and scopes, type checking from formal rules, type inference with unification, and the semantic checks and desugarings that prepare the tree for lowering.',
      lessons: [
        {
          slug: 'scopes-symbol-tables-and-resolution',
          title: 'Scopes, symbol tables and name resolution',
          summary:
            'Lexical scoping, environments and symbol tables, the resolver pass that binds every use to its declaration, and the subtle cases: shadowing, closures, recursion and forward references.',
          estimatedMinutes: 120,
          objectives: [
            'Implement a scoped symbol table (a stack of hash maps, or a persistent map) and use it to resolve identifiers',
            'Explain lexical vs dynamic scoping and show the classic bug that motivates a static resolver',
            'Handle shadowing, self-reference in recursive functions, and use-before-definition errors',
            'Annotate every variable use with its resolved declaration (or scope depth and slot) for later phases',
          ],
          concepts: [
            'Lexical (static) scope vs dynamic scope',
            'Environment chain; block scope; function scope',
            'Symbol table as a stack of maps',
            'Resolution: binding uses to declarations',
            'Shadowing and the initialiser-references-itself error',
            'Forward references and mutual recursion',
            'Scope depth and slot index as resolution output',
          ],
          explanation: `**Name resolution** decides which declaration each identifier refers to. In a lexically scoped language the answer depends only on the text: the innermost enclosing declaration of that name. Dynamic scope (early Lisp, shell variables) looks at the call stack at run time instead, which is why it is nearly extinct: you cannot reason about a function without knowing its callers.

A tree-walking interpreter can resolve lazily by walking an **environment chain** at run time, but Crafting Interpreters shows the bug this invites: a closure captured in one scope can see a variable declared *later* in an enclosing scope, violating lexical scoping. The fix is a **resolver pass**: walk the AST once with a stack of scopes (one hash map per block), declare names as you meet them, and for each use record how many scopes up the declaration lives (and which slot). The interpreter or code generator then never searches by name again. This pass is where you report *use of undeclared variable*, *variable declared twice in the same scope*, and the odd \`var a = a;\` initialiser-references-itself error.

The design choices are the same in every compiler. Do declarations become visible at the start of the scope (hoisting, as in JavaScript \`function\`) or at the declaration point (C, Rust)? Are top-level functions mutually recursive without forward declarations (most modern languages) or must you declare before use (C)? To support mutual recursion, resolve in two passes: collect all top-level names, then resolve bodies.

The output of resolution is a map from each use site to its declaration, stored either on the AST node or in a side table keyed by node id. Later, the type checker reads types from declarations through this map, and the code generator assigns each declaration a stack slot or register. Implement the resolver from the Crafting Interpreters chapter, then extend it to your language.`,
          resources: [
            {
              title: 'Crafting Interpreters — Resolving and Binding (chapter 11)',
              url: 'https://craftinginterpreters.com/resolving-and-binding.html',
              type: 'textbook',
              cost: 'free',
              provider: 'Robert Nystrom',
              note: 'The static resolver pass, with the closure bug that motivates it.',
              primary: true,
            },
            {
              title: 'Crafting Interpreters — Statements and State (environments, chapter 8)',
              url: 'https://craftinginterpreters.com/statements-and-state.html',
              type: 'textbook',
              cost: 'free',
              provider: 'Robert Nystrom',
              note: 'Environments and block scope as the run-time view of the same concept.',
            },
            {
              title: 'CS143 — Semantic Analysis and Scope lecture',
              url: 'https://web.stanford.edu/class/cs143/',
              type: 'lecture',
              cost: 'free',
              provider: 'Stanford',
              note: 'The lecture on semantic analysis, scope and symbol tables.',
            },
          ],
          exercises: [
            {
              slug: 'resolver-pass',
              title: 'Write the resolver',
              prompt:
                'Implement a resolver pass for your language that annotates each identifier use with (scope depth, slot). Report: undeclared variable, redeclaration in the same scope, `var a = a;`, `return` outside a function, and `break` outside a loop. Write 12 tests, half valid and half erroneous, and make the valid ones check the resolved depth/slot in the S-expression dump.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'closure-scope-bug',
              title: 'Reproduce and fix the closure scoping bug',
              prompt:
                'In a tree-walking interpreter with run-time environment lookup, write the Crafting Interpreters program where a closure prints "global" then "block" instead of "global" twice. Explain the sequence of environment operations that produces the wrong result. Then show that with resolved (depth, slot) lookups the output is correct.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'mutual-recursion',
              title: 'Two-pass resolution for mutual recursion',
              prompt:
                'Make top-level functions in your language mutually recursive without forward declarations by collecting all top-level names before resolving bodies. Write `isEven`/`isOdd` as a test. Then explain, with an example, why the same trick is unsafe for top-level variables with initialisers and how Rust/OCaml avoid the problem.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What is the difference between lexical and dynamic scoping, and why is lexical scoping preferred?',
              answerOutline:
                'Lexical: binding determined by program text (innermost enclosing declaration). Dynamic: by the run-time call stack. Lexical scoping allows static reasoning, resolution at compile time, and closures with predictable captures.',
            },
            {
              question: 'Why does a resolver pass fix the closure bug instead of just patching the environment code?',
              answerOutline:
                'The bug is that run-time environments are mutable and shared; a later declaration changes what a name means. Resolving statically fixes the meaning of each use once, matching the language definition.',
            },
            {
              question: 'What does the resolver output and who consumes it?',
              answerOutline:
                'A mapping from use sites to declarations (depth/slot or declaration id). The type checker reads declared types; the code generator assigns storage; the interpreter indexes environments directly.',
            },
          ],
        },
        {
          slug: 'type-checking',
          title: 'Type checking from typing rules',
          summary:
            'Reading inference rules, implementing a bidirectional type checker for a language with functions, records and arrays, and reporting type errors well.',
          estimatedMinutes: 150,
          objectives: [
            'Read a typing judgment Γ ⊢ e : τ and the inference rules for literals, variables, operators, functions and calls',
            'Implement a type checker that follows the rules directly, with a typing environment threaded through the AST walk',
            'Explain bidirectional checking (infer vs check modes) and why it gives better error messages and needs fewer annotations',
            'Implement basic subtyping or coercion rules (e.g. int to float) and explain the risks',
          ],
          concepts: [
            'Type, typing environment Γ, judgment Γ ⊢ e : τ',
            'Inference rules; premises and conclusion',
            'Type checking as a recursive function on the AST',
            'Bidirectional typing: synthesis and checking modes',
            'Function types, record types, array types',
            'Subtyping, coercions, numeric promotion',
            'Soundness: well-typed programs do not go wrong',
          ],
          explanation: `A **type system** is a set of rules that assign types to expressions and reject programs that would misuse values. The rules are written as **inference rules**: above the line, premises; below, a conclusion. For example, the rule for addition says that if $\\Gamma \\vdash e_1 : \\mathrm{int}$ and $\\Gamma \\vdash e_2 : \\mathrm{int}$ then $\\Gamma \\vdash e_1 + e_2 : \\mathrm{int}$, where $\\Gamma$ is the **typing environment** mapping variables to types. A function call rule says that if $f$ has type $\\tau_1 \\to \\tau_2$ and the argument has type $\\tau_1$, the call has type $\\tau_2$. Every rule reads directly as a case in a recursive function \`typeOf(env, expr)\`: check the children, compare, and return the result type or report a mismatch. The notation looks intimidating and is actually a precise pseudocode for the checker.

Plain synthesis (compute a type for every expression bottom-up) fails for expressions whose type is not determined by their parts: an empty array literal, a lambda without parameter annotations, \`null\`. **Bidirectional typing** adds a second mode: \`check(env, expr, expectedType)\`, used when the context already knows the type (a function argument, a declared variable's initialiser, a return). Checking pushes expected types down into lambdas and literals, which lets you drop most annotations and produces errors at the point of mismatch rather than far away. Most practical type checkers are bidirectional even if their authors do not use the word.

**Subtyping** and **coercions** complicate things. Allowing \`int\` where \`float\` is expected requires inserting a conversion node, which means the checker *rewrites* the tree, not just validates it. Make the elaborated tree explicit so later phases never guess.

The payoff is **soundness**: if the checker accepts a program, certain errors cannot happen at run time. Read the CS143 type-checking lectures for the formal view and the PLAI chapter for an implementation-first one; then write the checker for your language, with tests that include every error message.`,
          resources: [
            {
              title: 'CS143 — Type Checking lectures',
              url: 'https://web.stanford.edu/class/cs143/',
              type: 'lecture',
              cost: 'free',
              provider: 'Stanford',
              note: 'The two type-checking lectures: rules, environments, and the Cool type system.',
              primary: true,
            },
            {
              title: 'Programming Languages: Application and Interpretation (PLAI) — type checking chapters',
              url: 'https://www.plai.org/',
              type: 'textbook',
              cost: 'free',
              provider: 'Shriram Krishnamurthi',
              note: 'Implementation-first treatment of type checking and the move to inference.',
            },
            {
              title: 'Types and Programming Languages (Pierce) — book page',
              url: 'https://www.cis.upenn.edu/~bcpierce/tapl/',
              type: 'textbook',
              cost: 'paid',
              provider: 'Benjamin Pierce',
              note: 'The standard reference for the formal side (chapters 8-9, 11). Free alternative: Software Foundations volume 2 (below) covers the same simply typed lambda calculus.',
            },
            {
              title: 'Software Foundations, Volume 2: Programming Language Foundations',
              url: 'https://softwarefoundations.cis.upenn.edu/',
              type: 'textbook',
              cost: 'free',
              provider: 'University of Pennsylvania',
              note: 'The Stlc and StlcProp chapters: typing rules and the proof of soundness, mechanised in Coq.',
            },
          ],
          exercises: [
            {
              slug: 'typing-rules-on-paper',
              title: 'Write the typing rules for your language',
              prompt:
                'Write inference rules for every expression and statement form in your language: literals, variables, unary and binary operators, if/while, function definition and call, arrays and indexing, records and field access, assignment and return. Then derive, as a tree of rule applications, the type of `f(a[0] + 1)` under an environment where `f : int -> bool` and `a : int[]`.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'bidirectional-checker',
              title: 'Implement a bidirectional type checker',
              prompt:
                'Implement `infer` and `check` for your language. Lambdas and empty array literals must type-check without annotations when a context type is available and produce a clear error otherwise. Record the type of every expression in a side table. Write 20 tests: 10 well-typed programs whose dumped types you assert, and 10 ill-typed programs whose error message and span you assert.',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'numeric-coercion',
              title: 'Add int-to-float coercion by elaboration',
              prompt:
                'Add a float type and allow int where float is expected by inserting an explicit `IntToFloat` node during checking. Show the elaborated tree for `1 + 2.5` and `f(3)` where `f : float -> float`. Then write a program where implicit coercion changes the result compared with no coercion (hint: integer division) and argue whether your language should allow it.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Read the rule: premises Γ ⊢ e1 : τ1 → τ2 and Γ ⊢ e2 : τ1; conclusion Γ ⊢ e1 e2 : τ2. What does it say and how does it become code?',
              answerOutline:
                'Function application: infer the type of e1, require it to be a function type, check e2 against the parameter type, return the result type. Error if e1 is not a function or the argument mismatches.',
            },
            {
              question: 'Why does bidirectional checking reduce annotations?',
              answerOutline:
                'Expected types flow inward from declarations, parameters and returns, so lambdas and empty literals get their types from context instead of needing them written.',
            },
            {
              question: 'What does type soundness promise and what does it not?',
              answerOutline:
                'Well-typed programs never reach a stuck state of the kind the types rule out (e.g. calling a non-function). It does not promise absence of all errors: division by zero, out-of-bounds, infinite loops are outside most type systems.',
            },
          ],
        },
        {
          slug: 'type-inference-and-polymorphism',
          title: 'Type inference, unification and polymorphism',
          summary:
            'Hindley-Milner inference: type variables, constraint generation, unification with the occurs check, let-polymorphism and generalisation, and how generics appear in mainstream languages.',
          estimatedMinutes: 150,
          objectives: [
            'Generate type constraints from an expression and solve them by unification',
            'Implement unification with the occurs check and explain what fails without it',
            'Explain let-polymorphism: generalisation at let, instantiation at use, and the value restriction',
            'Relate HM inference to generics in Java/Rust/TypeScript and to local type inference',
          ],
          concepts: [
            'Type variables and substitutions',
            'Constraint generation',
            'Unification; most general unifier; occurs check',
            'Type schemes ∀α.τ; generalisation and instantiation',
            'Let-polymorphism; the value restriction',
            'Algorithm W / Algorithm J',
            'Parametric polymorphism vs ad hoc (overloading, type classes)',
          ],
          explanation: `**Type inference** lets the compiler find types the programmer did not write. The Hindley-Milner system, used by ML, OCaml, Haskell and (in local form) by Rust and TypeScript, infers the most general type of every expression with no annotations at all.

The idea is to treat unknown types as **type variables** and to collect **constraints**. For \`fun f(x) = x + 1\`, give \`x\` a fresh variable $\\alpha$; the \`+\` rule demands $\\alpha = \\mathrm{int}$; the result is int, so $f : \\mathrm{int} \\to \\mathrm{int}$. For \`fun id(x) = x\`, nothing constrains $\\alpha$, so $id : \\alpha \\to \\alpha$ for any $\\alpha$. **Unification** solves equations between types: two type constructors unify if they are the same constructor and their arguments unify; a variable unifies with anything, recording a substitution, *unless* it occurs inside the other type (the **occurs check**), which would mean an infinite type like $\\alpha = \\alpha \\to \\mathrm{int}$. Implement it with mutable union-find cells and it is about 40 lines.

**Polymorphism** enters at \`let\`. After inferring \`id\`'s type, *generalise* the free variables into a **type scheme** $\\forall\\alpha.\\,\\alpha\\to\\alpha$; at each use, *instantiate* with fresh variables, so \`id 1\` and \`id true\` coexist. Lambda-bound variables are not generalised, which is what keeps inference decidable. Mutable references break this (a polymorphic ref cell could hold an int and be read as a bool), so ML adds the **value restriction**: only syntactic values are generalised.

Mainstream generics are explicit instances of the same machinery: \`Vec<T>\` is a type constructor, \`fn id<T>(x: T) -> T\` is a type scheme with explicit quantification, and the local inference inside a Rust or TypeScript function body is unification. Subtyping, overloading and higher-rank types each make full inference undecidable, which is why those languages infer locally and require annotations at function boundaries. Implement Algorithm W for a small functional language following the PLAI chapter; it is one of the most satisfying programs you will write.`,
          resources: [
            {
              title: 'PLAI — Type Inference chapter',
              url: 'https://www.plai.org/',
              type: 'textbook',
              cost: 'free',
              provider: 'Shriram Krishnamurthi',
              note: 'Constraint generation and unification explained with code.',
              primary: true,
            },
            {
              title: 'Hindley-Milner type system (overview and Algorithm W)',
              url: 'https://en.wikipedia.org/wiki/Hindley%E2%80%93Milner_type_system',
              type: 'article',
              cost: 'free',
              provider: 'Wikipedia',
              note: 'A surprisingly complete reference: the rules, Algorithm W and J, and the proof sketch of principal types.',
            },
            {
              title: 'Types and Programming Languages (Pierce) — chapter 22, Type Reconstruction',
              url: 'https://www.cis.upenn.edu/~bcpierce/tapl/',
              type: 'textbook',
              cost: 'paid',
              provider: 'Benjamin Pierce',
              note: 'Free alternative: the PLAI chapter and the Wikipedia article above.',
            },
            {
              title: 'OCaml manual — Polymorphism and its limitations',
              url: 'https://ocaml.org/docs',
              type: 'documentation',
              cost: 'free',
              provider: 'OCaml',
              note: 'Find the "Polymorphism and its limitations" section of the manual via the docs index: the value restriction and weak type variables in a real language.',
            },
          ],
          exercises: [
            {
              slug: 'unification-by-hand',
              title: 'Infer types by hand',
              prompt:
                'Using fresh type variables and constraints, infer the types of `fun compose(f, g) = fun(x) -> f(g(x))`, `fun twice(f, x) = f(f(x))` and `fun bad(x) = x(x)`. Show every constraint, the unification steps and the final (most general) type or the occurs-check failure.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'algorithm-w',
              title: 'Implement Hindley-Milner inference',
              prompt:
                'Implement inference for a small functional language with integers, booleans, lambdas, application, let, if and pairs. Use union-find for substitutions and implement the occurs check. Generalise at let and instantiate at variable use. Test on 15 programs including `let id = fun x -> x in (id 1, id true)`, which must type-check, and the same with `fun` instead of `let`, which must not. Print inferred types with canonical variable names (a, b, c).',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'value-restriction',
              title: 'Break soundness without the value restriction',
              prompt:
                'Add mutable references (`ref`, `!`, `:=`) to your inference implementation without the value restriction. Write the program `let r = ref [] in r := [1]; (!r : bool list)` style unsoundness in your language, show it type-checks, and show how it crashes or misbehaves at run time. Then add the value restriction and show the program is rejected.',
              kind: 'coding',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'Why is the occurs check necessary?',
              answerOutline:
                'Without it, unifying α with α → int would succeed, creating an infinite type; the checker would accept self-application and other programs with no finite type, breaking soundness or termination.',
            },
            {
              question: 'Why are let-bound variables generalised but lambda-bound ones not?',
              answerOutline:
                'A let-bound definition is fully known when generalising; a lambda parameter\'s type depends on the arguments at call sites. Generalising lambda parameters is rank-2 polymorphism, which makes inference undecidable.',
            },
            {
              question: 'How do Rust generics relate to HM?',
              answerOutline:
                'Explicit type schemes at function boundaries (∀T), with unification-based local inference inside bodies. Trait bounds add constraints beyond HM (ad hoc polymorphism via type classes).',
            },
          ],
        },
        {
          slug: 'semantic-checks-and-desugaring',
          title: 'Semantic checks, desugaring and the elaborated tree',
          summary:
            'The remaining static checks (definite assignment, reachability, control-flow validity) and lowering surface syntax to a smaller core by desugaring, preparing a clean tree for IR generation.',
          estimatedMinutes: 100,
          objectives: [
            'Implement definite-assignment and missing-return analysis on the AST',
            'Desugar for-loops, compound assignment, string interpolation and other sugar into a smaller core language',
            'Explain why a small core simplifies every later phase and what information desugaring must preserve for diagnostics',
            'Perform constant folding and simple semantic validation on the elaborated tree',
          ],
          concepts: [
            'Core language vs surface language',
            'Desugaring / lowering',
            'Definite assignment analysis',
            'Reachability and missing-return checks',
            'Constant folding on the AST',
            'Elaboration: inserting coercions, explicit conversions, resolved names',
            'Preserving spans through transformations',
          ],
          explanation: `After resolution and type checking, a compiler still has work to do before it can generate IR, and the organising idea is to make the tree **smaller and more explicit** rather than larger.

**Desugaring** rewrites convenient surface forms into a tiny **core**. A \`for (init; cond; step) body\` becomes a block with \`init\` and a \`while\`; \`x += e\` becomes \`x = x + e\` (careful: evaluate \`x\`'s address once if it is \`a[f()]\`); string interpolation becomes concatenation calls; \`a && b\` becomes \`if a then b else false\`. Every later phase, from the IR generator to the optimizer, then handles five statement forms instead of fifteen. Crafting Interpreters desugars \`for\` in exactly this way. The cost is diagnostics: a type error inside desugared code must still point at the user's \`for\`, so preserve spans on every synthetic node.

Some checks are easiest on this core. **Definite assignment** (Java, C#, Rust): walk the tree tracking the set of variables certainly assigned on every path; a use outside the set is an error. **Missing return**: a non-void function's body must not be able to fall off the end; compute whether each statement "completes normally" (a \`return\` does not, an \`if\` with returns in both branches does not, a \`while (true)\` without \`break\` does not). These are simple dataflow analyses on structured code, foreshadowing the general framework in module 5. Also check \`break\`/\`continue\` placement and that \`main\` exists with the right signature.

**Elaboration** finishes the job: the tree leaving this phase has every name resolved, every expression typed, every coercion explicit and every sugar removed. **Constant folding** of literal subexpressions can happen here too, with care about overflow semantics and division by zero: fold only what the language defines. The next module turns this tree into an IR.`,
          resources: [
            {
              title: 'Crafting Interpreters — Control Flow (desugaring for loops, chapter 9)',
              url: 'https://craftinginterpreters.com/control-flow.html',
              type: 'textbook',
              cost: 'free',
              provider: 'Robert Nystrom',
              note: 'See the "For Loops" section on desugaring to while.',
              primary: true,
            },
            {
              title: 'Essentials of Compilation (Siek) — an incremental approach',
              url: 'https://github.com/IUCompilerCourse/Essentials-of-Compilation',
              type: 'textbook',
              cost: 'free',
              provider: 'Jeremy Siek, Indiana University',
              note: 'A free textbook that structures a compiler as a sequence of small lowering passes; see the chapters on removing complex operands and explicating control.',
            },
            {
              title: 'The Java Language Specification — Chapter 16: Definite Assignment',
              url: 'https://docs.oracle.com/javase/specs/jls/se21/html/jls-16.html',
              type: 'documentation',
              cost: 'free',
              provider: 'Oracle',
              note: 'A precise, readable specification of a real definite-assignment analysis.',
            },
          ],
          exercises: [
            {
              slug: 'desugar-pass',
              title: 'Desugar to a core language',
              prompt:
                'Define a core AST with at most: literals, variables, calls, unary/binary ops, assignment, if, while, block, return, break, function declaration. Write a desugaring pass from your surface AST to it covering for-loops, compound assignment, logical and/or, and any other sugar you have. Pretty-print the core and verify by running 10 programs through your tree-walking interpreter before and after desugaring with identical output.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'definite-assignment',
              title: 'Definite assignment and missing return',
              prompt:
                'Implement definite-assignment analysis and a missing-return check on the core tree. Tests: a variable assigned in only one branch of an if then used (error); assigned in both branches (ok); assigned inside a while body then used after (error); a function whose last statement is `if (c) return 1; else return 2;` (ok) and one with `while (true) {}` and no return (ok). Report errors with the span of the use.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'constant-folding-semantics',
              title: 'Constant folding with the right semantics',
              prompt:
                'Add constant folding to the elaborated tree for integer and boolean operations. Decide and document the behaviour for `2147483647 + 1` (wrap, trap, or do not fold), `1 / 0`, and `true && f()` (may you drop the call?). Check what C, Rust and Java each do for the same expressions and cite the relevant specification text.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What is the risk in desugaring `a[f()] += 1` naively?',
              answerOutline:
                'Rewriting to `a[f()] = a[f()] + 1` evaluates f() twice. Bind the index to a temporary first, preserving single evaluation.',
            },
            {
              question: 'Why do definite-assignment checks need to know which statements complete normally?',
              answerOutline:
                'After a statement that cannot complete normally (return, infinite loop) every variable is vacuously definitely assigned; otherwise the analysis would reject valid code after an early return.',
            },
            {
              question: 'What properties should hold of the tree handed to IR generation?',
              answerOutline:
                'All names resolved, all expressions typed, coercions explicit, sugar removed, spans preserved, and all semantic errors already reported so later phases can assume well-formedness.',
            },
          ],
        },
      ],
      project: {
        slug: 'front-end-complete',
        title: 'Module project: complete front end with a tree-walking interpreter',
        description:
          'Finish the front end for your language: resolver, type checker, semantic checks and desugaring, producing an elaborated core tree. Add a tree-walking interpreter for the core so you can run programs end to end and build a test corpus whose expected outputs will later validate your compiler.',
        deliverables: [
          'Resolver, bidirectional type checker and desugarer with tests for every error message',
          'Tree-walking interpreter for the core language',
          'A corpus of at least 30 programs with expected stdout, used as the oracle for the rest of the subject',
        ],
        estimatedHours: 15,
        stretchGoals: ['Add generics with HM-style local inference inside function bodies'],
      },
    },
    {
      slug: 'intermediate-representations',
      title: 'Intermediate Representations',
      description:
        'Lowering the tree to a linear three-address IR, building control-flow graphs, converting to static single assignment form, and reading real LLVM IR.',
      lessons: [
        {
          slug: 'three-address-code-and-cfgs',
          title: 'Three-address code, basic blocks and control-flow graphs',
          summary:
            'Why compilers lower trees to a linear IR, how to generate three-address code for expressions and control flow, and how to partition it into basic blocks and build a CFG.',
          estimatedMinutes: 120,
          objectives: [
            'Describe the design space of IRs (tree, linear, graph; high vs low level) and why most optimizers use a linear IR over a CFG',
            'Lower expressions, assignments, if/while and calls from the core AST to three-address code with temporaries and labels',
            'Partition a linear instruction list into basic blocks using leaders and build the control-flow graph',
            'Use the Bril IR and its tooling to run, inspect and test lowered programs',
          ],
          concepts: [
            'Three-address code: dest = op arg1 arg2',
            'Temporaries and virtual registers',
            'Labels, jumps and conditional branches',
            'Basic block; leader; terminator',
            'Control-flow graph (CFG); entry and exit',
            'High-level vs low-level IR; IR lowering',
            'Bril: a JSON-based teaching IR',
          ],
          explanation: `Trees are good for checking and bad for optimizing. Dataflow questions ("is this value used later?", "has this expression already been computed on every path here?") are about sequences of operations and the paths between them, so compilers lower the elaborated tree to a **linear IR**: a list of simple instructions, each with at most one operation and three operands, hence **three-address code**. \`x = a + b * c\` becomes \`t1 = b * c; x = a + t1\`. There are unboundedly many **temporaries**, which a later register allocator maps onto real registers.

Lowering is a recursive walk. An expression returns the temporary holding its value, emitting instructions as a side effect. Control flow becomes labels and jumps: \`if c then A else B\` emits \`br c .then .else\`, then \`.then: A; jmp .end\`, \`.else: B\`, \`.end:\`. A \`while\` is a header label with the condition, a body and a back-edge jump. Short-circuit \`&&\` becomes a branch, not an operation. Function calls pass temporaries as arguments and get a temporary result.

The list then becomes a **control-flow graph**. A **basic block** is a maximal straight-line sequence: control enters only at the top and leaves only at the bottom. Compute **leaders** (the first instruction, any label target, any instruction after a branch), cut the list at leaders, and add edges from each block's terminator to its successors. Every analysis in the next module runs over this graph.

Cornell's CS 6120 uses **Bril**, a tiny IR serialised as JSON with a reference interpreter, a text format and a growing set of tools. It is deliberately boring, which makes it ideal for writing your first passes. Work through CS 6120 lesson 2 (representing programs), write the CFG-construction tool it asks for, and then write the lowering from your own core AST to Bril or to an equivalent IR of your own design.`,
          resources: [
            {
              title: 'CS 6120 — Lesson 2: Representing Programs',
              url: 'https://www.cs.cornell.edu/courses/cs6120/2020fa/self-guided/',
              type: 'lecture',
              cost: 'free',
              provider: 'Cornell',
              note: 'The lesson on IRs, basic blocks and CFGs with its video and tasks. Lessons are listed on the self-guided page.',
              primary: true,
            },
            {
              title: 'Bril: A Compiler Intermediate Representation for Learning',
              url: 'https://capra.cs.cornell.edu/bril/',
              type: 'documentation',
              cost: 'free',
              provider: 'Cornell Capra',
              note: 'Language reference, the interpreter brili, and the text/JSON converters.',
            },
            {
              title: 'CS143 — Intermediate Code lecture',
              url: 'https://web.stanford.edu/class/cs143/',
              type: 'lecture',
              cost: 'free',
              provider: 'Stanford',
              note: 'Three-address code generation from the AST, the classical presentation.',
            },
          ],
          exercises: [
            {
              slug: 'cfg-builder',
              title: 'Build CFGs for Bril',
              prompt:
                'Write a tool that reads a Bril JSON program, splits each function into basic blocks, builds the CFG, and prints it in Graphviz dot format. Run it on every program in the Bril benchmarks directory and check that each CFG has exactly one entry block and that every block\'s successors are consistent with its terminator. Report the distribution of block sizes across the benchmarks.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'lower-to-ir',
              title: 'Lower your core AST to three-address code',
              prompt:
                'Write the lowering pass from your core language to Bril (or your own three-address IR with the same shape). Cover arithmetic, comparisons, short-circuit and/or, if, while, break, calls and returns, and arrays via your runtime\'s alloc/load/store. Run all 30 corpus programs through brili (or your IR interpreter) and compare stdout with the tree-walking interpreter: they must match exactly.',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'ir-design-questions',
              title: 'IR design decisions',
              prompt:
                'Answer in writing, with an example each: should your IR have a boolean type or use integers? Should array indexing be one instruction or an address computation plus load? Should calls be instructions or blocks terminators (as exceptions would require)? For each, say which later phase is affected by the choice and how.',
              kind: 'writing',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'Give the three rules for identifying basic-block leaders.',
              answerOutline:
                'The first instruction of a function; any instruction that is the target of a jump/branch (a label); any instruction immediately following a jump, branch or return.',
            },
            {
              question: 'How is short-circuit `a && b` lowered, and why not as an and-instruction?',
              answerOutline:
                'As a conditional branch: evaluate a; if false jump to the false label; else evaluate b. An and-instruction would evaluate b unconditionally, changing semantics if b has effects or would fault.',
            },
            {
              question: 'Why do optimizers prefer a linear IR over a CFG to a tree?',
              answerOutline:
                'Dataflow facts are about paths through instructions; the CFG makes paths explicit, instructions are uniform and small, and temporaries make every intermediate value nameable.',
            },
          ],
        },
        {
          slug: 'ssa-form',
          title: 'Static single assignment form',
          summary:
            'Dominators and dominance frontiers, inserting phi nodes, renaming variables so each is assigned once, why SSA makes optimizations simpler, and how to leave SSA before code generation.',
          estimatedMinutes: 150,
          objectives: [
            'Compute dominators, the dominator tree and dominance frontiers for a CFG',
            'Insert phi nodes using dominance frontiers and rename variables to produce minimal SSA',
            'Explain why def-use chains are trivial in SSA and how that simplifies constant propagation and dead code elimination',
            'Convert out of SSA by replacing phis with copies and explain the lost-copy and swap problems',
          ],
          concepts: [
            'Dominance: d dom n; immediate dominator; dominator tree',
            'Dominance frontier',
            'Phi (φ) functions',
            'SSA construction: phi insertion then renaming',
            'Minimal vs pruned SSA',
            'Def-use chains in SSA',
            'SSA destruction: copies, lost-copy and swap problems',
            'Braun et al. simple SSA construction',
          ],
          explanation: `**Static single assignment** form is the IR convention used by essentially every optimizing compiler since the 1990s: every variable is assigned exactly once, textually. Where control flow merges and a variable could come from either side, a **phi function** selects by predecessor: \`x3 = phi(x1 from .then, x2 from .else)\`. The payoff is that *the definition of every use is unique and obvious*. Reaching-definitions analysis becomes a pointer lookup; constant propagation, dead code elimination and value numbering become simpler and often faster, and they compose cleanly.

Construction needs **dominance**. Block $d$ dominates $n$ if every path from entry to $n$ passes through $d$. The **dominator tree** is built from immediate dominators by the simple iterative algorithm (intersecting predecessor dominator sets in reverse postorder; Cooper, Harvey and Kennedy's version is fast enough for anything). The **dominance frontier** of $d$ is the set of blocks where $d$'s dominance stops: blocks with a predecessor dominated by $d$ that are not themselves strictly dominated by $d$. A definition of $x$ in $d$ needs a phi in every block of $DF(d)$, iterated to a fixed point, because phis are themselves definitions.

Then **rename**: walk the dominator tree keeping a stack of current versions per variable, give every definition a fresh version, replace uses with the current version, and fill in phi operands of successors. The result is *minimal* SSA; *pruned* SSA additionally omits phis for variables not live at the merge.

Getting *out* of SSA before register allocation is deceptively tricky: naively replacing each phi with copies at the end of predecessors breaks on the **lost-copy** and **swap** problems when copies interfere; split critical edges or use parallel copies. Work through CS 6120's SSA lesson and implement to-SSA and from-SSA for Bril, with a round-trip test.`,
          resources: [
            {
              title: 'CS 6120 — Lesson 6: Static Single Assignment',
              url: 'https://www.cs.cornell.edu/courses/cs6120/2020fa/self-guided/',
              type: 'lecture',
              cost: 'free',
              provider: 'Cornell',
              note: 'Dominance (lesson 5) and SSA (lesson 6), with the tasks to implement them for Bril.',
              primary: true,
            },
            {
              title: 'Cytron et al. — Efficiently Computing Static Single Assignment Form and the Control Dependence Graph',
              url: 'https://dl.acm.org/doi/10.1145/115372.115320',
              type: 'article',
              cost: 'freemium',
              provider: 'ACM TOPLAS 1991',
              note: 'The original algorithm. The ACM copy may be paywalled; the CS 6120 notes cover the same construction.',
            },
            {
              title: 'Braun et al. — Simple and Efficient Construction of Static Single Assignment Form',
              url: 'https://pp.ipd.kit.edu/uploads/publikationen/braun13cc.pdf',
              type: 'article',
              cost: 'free',
              provider: 'KIT (CC 2013)',
              note: 'An alternative construction directly from the AST without computing dominance frontiers; used by several modern compilers.',
            },
            {
              title: 'Cooper, Harvey, Kennedy — A Simple, Fast Dominance Algorithm',
              url: 'https://www.cs.tufts.edu/~nr/cs257/archive/keith-cooper/dom14.pdf',
              type: 'article',
              cost: 'free',
              provider: 'Rice University',
              note: 'The iterative dominator algorithm everyone implements.',
            },
          ],
          exercises: [
            {
              slug: 'dominators-tool',
              title: 'Dominators, dominator tree, dominance frontier',
              prompt:
                'Implement dominator computation for Bril CFGs with the Cooper-Harvey-Kennedy algorithm, then build the dominator tree and dominance frontiers. Verify dominators against a brute-force definition (remove block d, check whether n is still reachable) on all Bril benchmarks. Print the dominator tree in dot format for a program with a loop containing an if.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'to-ssa-from-ssa',
              title: 'SSA round trip',
              prompt:
                'Implement to-SSA (phi insertion via dominance frontiers, then renaming by dominator-tree walk) and from-SSA (phi replacement with copies) for Bril. Test: run every benchmark through to-SSA, verify each variable is defined once, run through brili and compare output with the original; then from-SSA and compare again. Construct a program that exhibits the swap problem and show your from-SSA handles it.',
              kind: 'coding',
              difficulty: 3,
              hint: 'For the swap problem, implement parallel copies and sequentialise them with a temporary when they form a cycle.',
            },
            {
              slug: 'ssa-by-hand',
              title: 'SSA by hand',
              prompt:
                'For a function with a loop that conditionally updates two variables, draw the CFG, compute dominators and frontiers by hand, insert phis, rename, and show the final SSA program. Then show how a constant propagation pass would reason about one of the phis.',
              kind: 'problem',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why insert a phi at the dominance frontier of a definition, rather than at every merge point?',
              answerOutline:
                'Within the region dominated by the defining block, that definition reaches without competition; only where dominance ends can another definition arrive, so only there is a phi needed. This gives minimal SSA.',
            },
            {
              question: 'What makes dead code elimination easier in SSA?',
              answerOutline:
                'Each variable has one definition and its uses are explicit; a definition with zero uses (and no side effects) is dead immediately, and removing it may make others dead, so a worklist converges quickly without a separate liveness analysis.',
            },
            {
              question: 'Describe the lost-copy problem.',
              answerOutline:
                'Replacing a phi with a copy at the end of a predecessor can clobber a value still needed along another path (e.g. when the phi result is used after a loop back-edge). Splitting critical edges or inserting copies with temporaries fixes it.',
            },
          ],
        },
        {
          slug: 'llvm-ir-in-practice',
          title: 'LLVM IR in practice',
          summary:
            'Reading and writing LLVM IR, the Kaleidoscope tutorial, using clang and opt to see passes act on real code, and how LLVM structures a production middle end.',
          estimatedMinutes: 150,
          objectives: [
            'Read LLVM IR for a C function: types, SSA values, basic blocks, phi, getelementptr, alloca/mem2reg',
            'Generate LLVM IR for a small language using the C++ API or by writing textual IR, following Kaleidoscope',
            'Use clang -emit-llvm and opt to run individual passes and inspect their effect',
            'Describe LLVM\'s architecture (modules, passes, pass manager, target-independent IR) and its trade-offs',
          ],
          concepts: [
            'LLVM IR: module, function, basic block, instruction',
            'Typed SSA values; alloca and mem2reg',
            'getelementptr',
            'Calling convention attributes and metadata',
            'opt, llc, clang -emit-llvm, -O levels',
            'The pass manager; analysis vs transform passes',
            'Kaleidoscope: a JIT-compiled toy language',
          ],
          explanation: `LLVM IR is what your own IR grows up to be: a typed, SSA-form, target-independent language with a textual format you can read and a library you can call to build it. Learning to read it gives you a second, production-grade view of every concept in this module.

A **module** contains global variables and **functions**; a function contains **basic blocks** of **instructions**, each producing an SSA value named \`%1\`, \`%x\` and so on. Every value has a type (\`i32\`, \`double\`, \`ptr\`, \`[4 x i32]\`). Front ends usually dodge SSA construction: they put every local in a stack slot with \`alloca\` and use \`load\`/\`store\`, then the **mem2reg** pass promotes slots to SSA registers with phis, exactly the algorithm you implemented, just applied by a library. Address arithmetic uses \`getelementptr\`, which computes addresses without accessing memory and is the single most confusing instruction for newcomers: read its documentation page twice.

The **Kaleidoscope** tutorial builds a complete language front end in C++ that emits IR through the \`IRBuilder\` API, adds JIT execution, control flow (with explicit phis), mutable variables (via alloca and mem2reg) and debug info. Doing it, even partially, shows what a real API for IR construction feels like. If C++ is not your language, the same tutorial has been ported to Rust (inkwell), OCaml and Python (llvmlite); the ideas transfer and so does the textual IR.

The tools matter as much as the API. \`clang -O0 -emit-llvm -S\` shows the IR a front end produces; \`opt -passes=mem2reg,instcombine,sccp,dce -S\` runs named passes so you can see each transformation in isolation; \`llc\` turns IR into assembly for any target. Spend an hour feeding small C functions through pass sequences and diffing the output. You will use this to check your own passes in the next module: implement a pass for your IR, then confirm LLVM's equivalent makes the same change.`,
          resources: [
            {
              title: 'LLVM Tutorial — My First Language Frontend with LLVM (Kaleidoscope)',
              url: 'https://llvm.org/docs/tutorial/',
              type: 'documentation',
              cost: 'free',
              provider: 'LLVM Project',
              note: 'Chapters 1-7. Chapter 3 (code generation to IR) and 5 (control flow) are the core.',
              primary: true,
            },
            {
              title: 'LLVM Language Reference Manual',
              url: 'https://llvm.org/docs/LangRef.html',
              type: 'documentation',
              cost: 'free',
              provider: 'LLVM Project',
              note: 'The IR specification. Read the sections on instructions you meet; keep it open while reading IR.',
            },
            {
              title: 'The Architecture of Open Source Applications — LLVM (Chris Lattner)',
              url: 'https://aosabook.org/en/v1/llvm.html',
              type: 'article',
              cost: 'free',
              provider: 'AOSA',
              note: 'The design rationale for LLVM\'s three-phase architecture and IR, by its creator.',
            },
            {
              title: 'Compiler Explorer with LLVM IR output',
              url: 'https://godbolt.org/',
              type: 'tool',
              cost: 'free',
              provider: 'Matt Godbolt',
              note: 'Choose clang and add -emit-llvm to see IR; the opt pipeline viewer shows each pass\'s effect.',
            },
          ],
          exercises: [
            {
              slug: 'read-llvm-ir',
              title: 'Annotate the IR of three C functions',
              prompt:
                'Compile a factorial function, a loop summing an array, and a function with a struct field access with `clang -O0 -emit-llvm -S`, then with `-O2`. Annotate every instruction in the -O0 output with what it does and which source construct produced it. Explain each getelementptr. Then run `opt -passes=mem2reg -S` on the -O0 output and explain where the phis appear and why.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'kaleidoscope',
              title: 'Kaleidoscope chapters 1-5',
              prompt:
                'Work through Kaleidoscope chapters 1-5 in C++ (or a port in your language). After chapter 5, define a function with an if and a for loop, print its IR, and identify the phi nodes. Then add the chapter 7 mutable variables and show the IR before and after mem2reg.',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'emit-llvm-from-your-ir',
              title: 'Emit textual LLVM IR from your IR',
              prompt:
                'Write a backend that prints your three-address IR (pre-SSA, using alloca for each variable) as textual LLVM IR, with a tiny C runtime for printing. Compile with `clang runtime.c out.ll`, run all 30 corpus programs and compare output with your interpreter. Report how many lines of code this backend took compared with what you expect a native backend to take.',
              kind: 'coding',
              difficulty: 3,
              hint: 'Using alloca/load/store for all variables and letting mem2reg do SSA is exactly what clang does; it keeps the backend simple.',
            },
          ],
          selfAssessment: [
            {
              question: 'Why do front ends emit alloca/load/store instead of constructing SSA directly?',
              answerOutline:
                'It keeps the front end simple and local (no dominance computation); mem2reg does SSA construction centrally and correctly. Only non-escaping scalars are promoted.',
            },
            {
              question: 'What does getelementptr do and what does it not do?',
              answerOutline:
                'It computes an address from a base pointer and a sequence of indices using the types\' layouts; it never loads or stores. The first index steps over whole objects of the base type.',
            },
            {
              question: 'Name two advantages and one disadvantage of targeting LLVM IR rather than writing your own backend.',
              answerOutline:
                'Advantages: world-class optimizations and many targets for free, debug info and JIT support. Disadvantages: large dependency, slow compile times, less control over codegen and GC integration.',
            },
          ],
        },
      ],
      project: {
        slug: 'ir-and-ssa-toolkit',
        title: 'Module project: an IR toolkit for your language',
        description:
          'Lower your language to a three-address IR, build CFGs and dominator trees, convert to and from SSA, and provide an IR interpreter and dot-graph printer. This toolkit is the platform for every optimization pass in the next module.',
        deliverables: [
          'Lowering pass with the 30-program corpus passing under the IR interpreter',
          'CFG, dominators, dominance frontier, to-SSA and from-SSA with round-trip tests',
          'A dot printer and a short document on your IR with a complete example program before and after SSA',
        ],
        estimatedHours: 14,
      },
    },
    {
      slug: 'optimization',
      title: 'Optimization',
      description:
        'Local, global and interprocedural optimizations built on dataflow analysis, with every pass measured on real benchmarks.',
      lessons: [
        {
          slug: 'local-optimizations',
          title: 'Local optimizations and value numbering',
          summary:
            'Optimizing within a basic block: dead code elimination, constant folding, copy propagation and local value numbering, which subsumes common subexpression elimination.',
          estimatedMinutes: 120,
          objectives: [
            'Implement trivial dead code elimination with a worklist and explain why iteration to a fixed point is needed',
            'Implement local value numbering (LVN) and extend it with constant folding, copy propagation and commutativity',
            'Explain the difference between a value and a variable and why LVN is a form of hash-consing',
            'Measure the effect of each optimization on dynamic instruction count using Bril benchmarks',
          ],
          concepts: [
            'Dead code elimination (unused definitions)',
            'Constant folding',
            'Copy propagation',
            'Common subexpression elimination',
            'Local value numbering: value tables and canonical variables',
            'Commutativity and algebraic identities',
            'Dynamic instruction count as a measure',
          ],
          explanation: `**Local** optimizations look at one basic block at a time, which means no control flow to reason about: instructions execute in order, exactly once. That makes them a good first pass to write and a good place to learn the discipline of *proving each rewrite preserves meaning*.

**Dead code elimination** deletes an instruction whose result is never used and which has no side effects. Deleting one can make another dead, so iterate to a fixed point. Within a block, a definition is also dead if it is overwritten before any use; keep a "last definition, unused so far" table while scanning.

**Local value numbering** is the workhorse. Scan the block; for each instruction, build a *value* from its operation and the value numbers of its arguments (not their variable names). If that value is already in the table, the instruction is redundant: replace it with a copy of the canonical variable that holds that value, or just rewrite later uses. If not, assign a fresh number and record which variable holds it. This subsumes **common subexpression elimination** (\`a + b\` computed twice), and small extensions give you **copy propagation** (a \`copy\` instruction has the same value as its source), **constant folding** (if all arguments are known constants, compute the result now), and algebraic simplification (\`x * 1\`, \`x + 0\`, normalising commutative operands so \`a + b\` and \`b + a\` match).

Pitfalls: a variable may be redefined later in the block, so the canonical variable for a value can become stale; the fix is renaming or checking that the canonical variable is not overwritten before the use. Instructions with side effects (calls, stores, prints) must never be deduplicated. And always measure: Bril's interpreter reports the dynamic instruction count, and CS 6120's benchmark suite with the \`brench\` tool lets you compare before and after across dozens of programs. An optimization that helps on average and breaks one program is not an optimization.`,
          resources: [
            {
              title: 'CS 6120 — Lesson 3: Local Analysis and Optimization',
              url: 'https://www.cs.cornell.edu/courses/cs6120/2020fa/self-guided/',
              type: 'lecture',
              cost: 'free',
              provider: 'Cornell',
              note: 'DCE and LVN with the tasks and the benchmark methodology.',
              primary: true,
            },
            {
              title: 'Bril benchmarks and the brench tool',
              url: 'https://capra.cs.cornell.edu/bril/',
              type: 'tool',
              cost: 'free',
              provider: 'Cornell Capra',
              note: 'See the "Benchmarks" and "Tools" pages; brench runs a pipeline over all benchmarks and reports dynamic instruction counts.',
            },
            {
              title: 'Engineering a Compiler (Cooper and Torczon) — chapter 8, Introduction to Optimization',
              url: 'https://shop.elsevier.com/books/engineering-a-compiler/cooper/978-0-12-815412-0',
              type: 'textbook',
              cost: 'paid',
              provider: 'Elsevier',
              note: 'Excellent treatment of LVN and its extensions. Free alternative: the CS 6120 lesson above covers the same material.',
            },
          ],
          exercises: [
            {
              slug: 'dce',
              title: 'Trivial dead code elimination',
              prompt:
                'Implement global unused-definition DCE (a definition with no uses anywhere in the function) and local overwritten-definition DCE for Bril. Iterate to convergence. Run brench over the benchmarks and report, per benchmark, the dynamic instruction count before and after, and confirm the output is unchanged for all. Which benchmark improves most and why?',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'lvn',
              title: 'Local value numbering with extensions',
              prompt:
                'Implement LVN for Bril, then add in order: copy propagation, commutativity normalisation, constant folding, and the identities x+0, x*1, x*0, x-x. After each extension, re-run brench and record the total dynamic instruction count. Handle the stale-canonical-variable problem and prove it with a test where a variable is reassigned after being used as canonical.',
              kind: 'coding',
              difficulty: 3,
              hint: 'Run DCE after LVN; LVN creates dead copies that DCE removes.',
            },
            {
              slug: 'optimization-bugs',
              title: 'Find the bug',
              prompt:
                'Write three Bril programs that each break a naive optimizer: one where LVN deduplicates a call with side effects, one where constant folding of division by zero changes behaviour, and one where DCE removes a print. For each, explain the rule the optimizer violated and fix your implementation.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What is the difference between a variable and a value in LVN?',
              answerOutline:
                'A value is what an expression computes (operation plus argument values); a variable is a name that holds a value at some point. LVN numbers values; several variables may hold the same value and one variable may hold different values over time.',
            },
            {
              question: 'Why must DCE iterate?',
              answerOutline:
                'Removing an instruction removes uses of its arguments; their definitions may now be unused. One pass only catches the first layer.',
            },
            {
              question: 'Why is dynamic instruction count a reasonable but imperfect metric?',
              answerOutline:
                'It is deterministic and target-independent, so passes can be compared fairly; but real cost depends on instruction type, memory behaviour and the final code generator, so it can mislead.',
            },
          ],
        },
        {
          slug: 'dataflow-analysis',
          title: 'Dataflow analysis',
          summary:
            'The general framework that underlies global optimization: lattices, transfer functions, the worklist algorithm, and its instances: reaching definitions, liveness, available expressions and constant propagation.',
          estimatedMinutes: 150,
          objectives: [
            'State the dataflow framework: direction, domain (lattice), transfer functions, meet operator, initial values',
            'Implement a generic worklist solver and instantiate it for reaching definitions, live variables and constant propagation',
            'Explain why termination follows from monotonicity and finite lattice height, and what the solution means (meet over all paths vs maximal fixed point)',
            'Use the results to drive global constant propagation and dead code elimination',
          ],
          concepts: [
            'Forward vs backward analysis',
            'Lattice, partial order, meet (⊓), top and bottom',
            'Transfer function; gen/kill',
            'Worklist algorithm; fixed point',
            'Monotonicity and termination',
            'Reaching definitions; live variables; available expressions',
            'Constant propagation lattice (⊤, constants, ⊥)',
            'May vs must analyses',
          ],
          explanation: `Global optimization needs facts that hold across blocks: "which definitions of $x$ can reach this use?", "is $t$ still needed after this point?", "is $x$ definitely the constant 5 here?". **Dataflow analysis** is one framework that answers all of them.

Each analysis chooses: a **direction** (forward from entry, or backward from exit), a **domain** of facts forming a **lattice** (sets of definitions ordered by inclusion; or for constants, the three-level lattice $\\top$ above every constant above $\\bot$), a **transfer function** per block describing how it changes the facts (often \`out = gen ∪ (in − kill)\`), and a **meet** operator combining facts from multiple predecessors (union for *may* analyses like reaching definitions, intersection for *must* analyses like available expressions). The **worklist algorithm** initialises every block, then repeatedly takes a block, recomputes its input by meeting its predecessors' outputs, applies the transfer function, and if the output changed, pushes its successors. Because transfer functions are **monotone** and the lattice has finite height, every block's value moves in one direction a bounded number of times, so the algorithm terminates. The result is the **maximal fixed point**, which equals the ideal meet-over-all-paths solution when transfer functions distribute over meet (gen/kill analyses do; constant propagation does not, which is why it can miss some constants).

**Liveness** is backward: a variable is live at a point if some path from there uses it before redefining it. It feeds register allocation and global DCE. **Reaching definitions** is forward with union. **Constant propagation** is forward on the constant lattice; combined with SSA it becomes *sparse* (propagate along def-use edges rather than through every block), which is Wegman and Zadeck's SCCP.

Implement the generic solver once for Bril as CS 6120 asks, parameterised by the five choices above, then instantiate it. Writing three analyses from one engine is the point.`,
          resources: [
            {
              title: 'CS 6120 — Lesson 4: Data Flow',
              url: 'https://www.cs.cornell.edu/courses/cs6120/2020fa/self-guided/',
              type: 'lecture',
              cost: 'free',
              provider: 'Cornell',
              note: 'The framework, the worklist algorithm and the generic-solver task.',
              primary: true,
            },
            {
              title: 'CS143 — Global Optimization and Dataflow Analysis lectures',
              url: 'https://web.stanford.edu/class/cs143/',
              type: 'lecture',
              cost: 'free',
              provider: 'Stanford',
              note: 'Constant propagation and liveness treated formally with lattices.',
            },
            {
              title: 'Static Program Analysis (Møller and Schwartzbach) — free textbook',
              url: 'https://cs.au.dk/~amoeller/spa/',
              type: 'textbook',
              cost: 'free',
              provider: 'Aarhus University',
              note: 'Chapters on lattices, dataflow and the monotone framework, with precise definitions and proofs of termination.',
            },
          ],
          exercises: [
            {
              slug: 'generic-solver',
              title: 'A generic dataflow solver',
              prompt:
                'Implement a worklist solver for Bril parameterised by direction, initial value, merge function and transfer function. Instantiate it for reaching definitions, live variables and available expressions (defined as expressions computed on every path with no later redefinition of operands). Print in/out sets per block for a test program containing a loop and verify by hand on one small example.',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'global-constant-propagation',
              title: 'Global constant propagation and folding',
              prompt:
                'Instantiate the solver on the constant lattice and use the result to rewrite instructions whose operands are known constants, then run DCE. Construct a program where a constant flows around a loop and is still detected, and one where the non-distributive case loses a constant (x = a + b where a and b are each constant on both paths but with different values). Report brench improvements over LVN-only.',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'liveness-by-hand',
              title: 'Liveness by hand',
              prompt:
                'For a CFG with a loop and two live-in variables, run the backward liveness worklist algorithm by hand, showing the in/out sets after each block visit until convergence. Then explain how a register allocator uses the result and which variables could share a register.',
              kind: 'problem',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does the worklist algorithm terminate?',
              answerOutline:
                'Transfer functions are monotone, so each block\'s output only moves up (or down) the lattice; the lattice has finite height, so each block changes finitely many times; blocks are only re-added when a predecessor changes.',
            },
            {
              question: 'When is the maximal fixed point equal to the meet-over-all-paths solution?',
              answerOutline:
                'When transfer functions distribute over the meet. Gen/kill (bit-vector) analyses are distributive; constant propagation is monotone but not distributive, so MFP can be less precise.',
            },
            {
              question: 'Is liveness a may or must analysis, and in which direction?',
              answerOutline:
                'May (a variable is live if it may be used on some path), backward, with union as meet.',
            },
          ],
        },
        {
          slug: 'loop-optimizations',
          title: 'Loops: natural loops, LICM, induction variables and strength reduction',
          summary:
            'Finding loops via back edges and dominators, moving loop-invariant code out, detecting induction variables, strength reduction, and the global SSA-based passes (SCCP, GVN) that production compilers run.',
          estimatedMinutes: 150,
          objectives: [
            'Identify natural loops from back edges in the dominator tree and build the loop nesting forest',
            'Implement loop-invariant code motion with a preheader and the safety conditions for hoisting',
            'Detect basic and derived induction variables and apply strength reduction',
            'Describe sparse conditional constant propagation and global value numbering on SSA and explain what they add over the non-SSA versions',
          ],
          concepts: [
            'Back edge; natural loop; loop header and preheader',
            'Loop nesting forest',
            'Loop-invariant code motion (LICM) and its safety conditions',
            'Induction variables; strength reduction',
            'Loop unrolling and loop fusion (overview)',
            'Sparse conditional constant propagation (SCCP)',
            'Global value numbering (GVN)',
            'Speculation and side effects: when hoisting is unsafe',
          ],
          explanation: `Programs spend their time in loops, so loop optimizations pay the most. A **back edge** is an edge $n \\to h$ where $h$ dominates $n$; the **natural loop** of that edge is $h$ plus every block that can reach $n$ without passing through $h$. Computing these for all back edges and nesting them by containment gives the loop forest, and each loop gets a **preheader**: a new block inserted before the header on the entry edge, where hoisted code goes.

**Loop-invariant code motion** moves an instruction to the preheader if its operands are defined outside the loop (or by other invariant instructions). That is the easy half. The hard half is safety: the instruction must dominate all loop exits (otherwise it might execute when the loop body would not have, which matters if it can fault, like a division or a load), and in non-SSA form its destination must not be redefined elsewhere in the loop. SSA makes the second condition free; the first is why compilers either prove the loop executes at least once or restrict hoisting to instructions that cannot trap.

**Induction variables** are variables that change by a loop-invariant amount each iteration: \`i = i + 1\` is basic, \`j = 4 * i + base\` is derived. **Strength reduction** replaces the multiply with an add on its own induction variable, which is the transformation that turns array indexing into pointer bumping; then the original \`i\` may become dead if only used in the comparison, which linear-function test replacement removes.

On SSA, two global passes are standard. **SCCP** runs constant propagation and reachability together, so code in branches proven unreachable does not pollute the lattice, which finds strictly more constants. **GVN** extends value numbering across blocks, using dominance to know which values are available. Read the CS 6120 loop lesson and implement LICM, then run \`opt -passes=licm,indvars,sccp,gvn\` on equivalent C to see the professional version.`,
          resources: [
            {
              title: 'CS 6120 — Lesson 8: Loop Optimization',
              url: 'https://www.cs.cornell.edu/courses/cs6120/2020fa/self-guided/',
              type: 'lecture',
              cost: 'free',
              provider: 'Cornell',
              note: 'Natural loops, LICM and induction variables, with the task.',
              primary: true,
            },
            {
              title: 'CS143 — Loop optimization and the Global Optimization lectures',
              url: 'https://web.stanford.edu/class/cs143/',
              type: 'lecture',
              cost: 'free',
              provider: 'Stanford',
            },
            {
              title: 'Wegman and Zadeck — Constant Propagation with Conditional Branches (SCCP)',
              url: 'https://dl.acm.org/doi/10.1145/103135.103136',
              type: 'article',
              cost: 'freemium',
              provider: 'ACM TOPLAS 1991',
              note: 'The SCCP paper; the ACM page may be paywalled, the algorithm is summarised in the CS 6120 notes and LLVM source.',
            },
            {
              title: 'LLVM passes reference (LICM, IndVarSimplify, SCCP, GVN)',
              url: 'https://llvm.org/docs/Passes.html',
              type: 'documentation',
              cost: 'free',
              provider: 'LLVM Project',
              note: 'One-paragraph descriptions of every pass; use with opt -passes=... to experiment.',
            },
          ],
          exercises: [
            {
              slug: 'natural-loops',
              title: 'Find natural loops and insert preheaders',
              prompt:
                'Using your dominator tool, find all back edges and natural loops in each Bril benchmark, build the nesting forest and insert a preheader for each loop. Print loops as (header, blocks) and verify on a doubly nested loop with an early exit. Confirm program output is unchanged after preheader insertion.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'licm',
              title: 'Loop-invariant code motion',
              prompt:
                'Implement LICM on SSA-form Bril: identify invariant instructions iteratively, check the safety conditions (dominates exits or cannot fault; no side effects), and hoist to the preheader. Write a benchmark with an invariant multiply inside a loop and report dynamic instruction count before/after. Then write a program where naive hoisting of a division changes behaviour (loop runs zero times, divisor zero) and show your pass refuses it.',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'strength-reduction',
              title: 'Induction variables and strength reduction',
              prompt:
                'Detect basic induction variables (i = i + c in the loop) and derived ones (j = a*i + b). Replace the multiply in derived variables with an add of a new induction variable, and eliminate the basic variable if it becomes used only in the loop test. Demonstrate on an array-sum loop with explicit index arithmetic, then compare with what `opt -passes=indvars,loop-reduce` produces on the equivalent C.',
              kind: 'coding',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'Define a natural loop and explain why irreducible control flow has no natural loop.',
              answerOutline:
                'For back edge n→h with h dom n: h plus all nodes reaching n without going through h. Irreducible CFGs have cycles with two entries, so no header dominates the cycle and no back edge exists in the dominator sense.',
            },
            {
              question: 'Why must a hoisted instruction dominate all loop exits (or be unable to fault)?',
              answerOutline:
                'If the loop can exit before the instruction would have executed, hoisting executes it speculatively; if it can trap (division, load from a possibly bad address), the program\'s behaviour changes.',
            },
            {
              question: 'What does SCCP find that ordinary constant propagation plus DCE does not?',
              answerOutline:
                'It assumes blocks unreachable until proven reachable, so a constant defined only on a path that turns out to be dead does not widen a phi to ⊥. Constants that depend on branch outcomes being constant are found in one pass.',
            },
          ],
        },
        {
          slug: 'interprocedural-and-measuring',
          title: 'Inlining, alias analysis and measuring optimizations honestly',
          summary:
            'Crossing function boundaries with inlining and call-graph analysis, the role of alias analysis in enabling memory optimizations, and the methodology for benchmarking a compiler without fooling yourself.',
          estimatedMinutes: 120,
          objectives: [
            'Implement function inlining with heuristics and explain why it is the most important interprocedural optimization',
            'Explain what alias analysis answers, why it is hard, and which optimizations are blocked without it',
            'Design a benchmark methodology: warm-up, repetitions, variance, controls, and reporting',
            'Interpret results with an eye for the common mistakes (measuring the wrong thing, noise, benchmark overfitting)',
          ],
          concepts: [
            'Call graph; interprocedural vs intraprocedural',
            'Inlining: benefits, code growth, heuristics, recursion',
            'Tail-call elimination',
            'Alias analysis: may-alias, must-alias, points-to',
            'Memory optimizations gated by aliasing: store-to-load forwarding, dead store elimination',
            'Benchmark methodology: repetitions, variance, warm-up, controls',
            'Phase ordering',
          ],
          explanation: `Most optimizations stop at a function boundary because the callee is unknown or could be anything. **Inlining** removes the boundary: copy the callee's body into the caller, substituting arguments, so every intraprocedural pass now sees across the call. It eliminates call overhead, but its real value is *enabling* other passes: constants flow into the body, the body's branches resolve, dead code disappears. The cost is code growth and compile time, so compilers use heuristics (callee size, call-site count, whether arguments are constants) and a budget. Recursive functions need a depth limit; **tail-call elimination** turns a call in tail position into a jump, making recursion as cheap as a loop, essential for functional languages.

Memory is the other wall. Register-based optimizations are precise because SSA tells you exactly where a value comes from; a load from memory could be affected by any store to the same address. **Alias analysis** answers "can these two pointers refer to the same memory?" Must-alias enables forwarding a stored value to a later load; may-not-alias enables reordering and removing dead stores. Precise answers are undecidable, so compilers use conservative approximations: type-based rules, flow-insensitive points-to analysis (Andersen, Steensgaard), and language guarantees (Rust's borrow rules, C's \`restrict\`). Write a tiny may-alias analysis for your IR and watch how many loads you can now remove.

Then measure properly. Dynamic instruction count was fine for passes in isolation; for the capstone you will time native code, and timing is noisy. Run each benchmark many times, report the median and the spread, pin to one core, disable frequency scaling if you can, and include a control (the unoptimized build) in the same run. Beware the three classic mistakes: measuring compile time when you meant run time (or the reverse), optimizing for one benchmark until it is unrepresentative, and reporting the one run that looked best. CS 6120 lesson 7 and the Bril benchmark suite give a model methodology.`,
          resources: [
            {
              title: 'CS 6120 — Lesson 7 (Interprocedural) and the discussion of evaluation methodology',
              url: 'https://www.cs.cornell.edu/courses/cs6120/2020fa/self-guided/',
              type: 'lecture',
              cost: 'free',
              provider: 'Cornell',
              note: 'Lesson 7 on interprocedural analysis and the alias analysis lesson; the course also has a lesson on how to evaluate (SIGPLAN empirical evaluation guidelines).',
              primary: true,
            },
            {
              title: 'SIGPLAN Empirical Evaluation Guidelines',
              url: 'https://www.sigplan.org/Resources/EmpiricalEvaluation/',
              type: 'article',
              cost: 'free',
              provider: 'ACM SIGPLAN',
              note: 'A checklist for benchmarking that applies to any performance claim you make.',
            },
            {
              title: 'LLVM Alias Analysis Infrastructure',
              url: 'https://llvm.org/docs/AliasAnalysis.html',
              type: 'documentation',
              cost: 'free',
              provider: 'LLVM Project',
              note: 'How a production compiler structures alias queries and chains analyses.',
            },
            {
              title: 'hyperfine — command-line benchmarking tool',
              url: 'https://github.com/sharkdp/hyperfine',
              type: 'tool',
              cost: 'free',
              provider: 'David Peter',
              note: 'Warm-up runs, repetitions and statistics for free; use it for every native timing in this subject.',
            },
          ],
          exercises: [
            {
              slug: 'inliner',
              title: 'An inliner with a budget',
              prompt:
                'Implement inlining for your IR: rename callee variables and labels, substitute arguments, replace returns with jumps to a continuation block and a copy into the result variable. Use a size budget and refuse recursive inlining beyond depth 1. Run the full pipeline (inline, SSA, SCCP, LVN, LICM, DCE) over the corpus and benchmarks, and report dynamic instruction count with and without inlining. Find a program where inlining alone makes nothing faster but enables SCCP to remove a branch.',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'tiny-alias-analysis',
              title: 'May-alias and store-to-load forwarding',
              prompt:
                'If your IR has memory operations, implement a flow-insensitive points-to analysis (each allocation site is an abstract location; pointers may point to the union of their sources\' locations). Use it to forward a stored value to a subsequent load when the addresses must-alias and no intervening store may-alias. Test on a program that stores into two arrays allocated separately and loads from one.',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'benchmark-methodology',
              title: 'Benchmark five programs properly',
              prompt:
                'Pick five programs from your corpus or benchmarks and time the LLVM-emitting backend at -O0 and -O2 using hyperfine with 3 warm-up and 20 measured runs. Report median, min/max and standard deviation; repeat the whole experiment an hour later and compare. Write one paragraph on which differences are real given the variance you observed.',
              kind: 'data-analysis',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why is inlining called an enabling optimization?',
              answerOutline:
                'Its direct benefit (removing call overhead) is small; its main value is that after inlining, intraprocedural passes see constants, branches and dead code they could not see across the call.',
            },
            {
              question: 'What question does alias analysis answer, and name two optimizations that need it.',
              answerOutline:
                'Whether two memory references may/must refer to the same location. Store-to-load forwarding, dead store elimination, reordering loads and stores, LICM of loads.',
            },
            {
              question: 'List three practices that make a run-time benchmark trustworthy.',
              answerOutline:
                'Many repetitions with median and spread reported; warm-up; a control build measured in the same session; pinning/fixed CPU frequency; reporting all runs, not the best.',
            },
          ],
        },
      ],
      project: {
        slug: 'optimizer-pipeline',
        title: 'Module project: an optimization pipeline with a benchmark report',
        description:
          'Assemble your passes into a pipeline with a command-line pass list (like opt -passes), run it over the Bril benchmarks and your corpus, and write a report in the CS 6120 style: what each pass does, its effect on dynamic instruction count per benchmark, and a correctness argument for each.',
        deliverables: [
          'DCE, LVN with extensions, global constant propagation, LICM, strength reduction and inlining, selectable from the command line',
          'A brench-style script and a table/plot of dynamic instruction counts with each pass added cumulatively',
          'All corpus and benchmark outputs unchanged under every pass combination',
          'A 3-5 page report including at least one bug you found in your own pass and how a test caught it',
        ],
        estimatedHours: 16,
      },
    },
    {
      slug: 'code-generation-and-runtime',
      title: 'Code Generation and the Runtime',
      description:
        'From IR to a real machine: instruction selection and calling conventions, register allocation, alternative targets (WebAssembly, LLVM), and the runtime system with a garbage collector.',
      lessons: [
        {
          slug: 'instruction-selection-and-calling-conventions',
          title: 'Instruction selection and calling conventions',
          summary:
            'Mapping IR operations onto x86-64 or RISC-V instructions, tree tiling, the System V ABI, stack frames, and getting a function call right at the machine level.',
          estimatedMinutes: 150,
          objectives: [
            'Write a naive code generator that maps each IR instruction to machine instructions using stack slots for all temporaries',
            'Explain instruction selection as tree tiling and why maximal munch gives good local choices',
            'Lay out a stack frame and implement the x86-64 System V (or RISC-V) calling convention: argument registers, return value, callee- and caller-saved registers, alignment',
            'Assemble and link the output with a C runtime and run it',
          ],
          concepts: [
            'Instruction selection; tree tiling; maximal munch',
            'Addressing modes and operand constraints',
            'Stack frame: return address, saved registers, locals, spills',
            'Calling convention: argument registers, return register, caller/callee-saved',
            'Stack alignment and red zone',
            'Prologue and epilogue',
            'Assembling and linking: as, ld, calling into libc',
            'Two-operand (x86) vs three-operand (RISC-V) instruction forms',
          ],
          explanation: `A back end must answer three questions: which instructions implement each IR operation (**instruction selection**), which registers hold each value (**register allocation**, next lesson), and in what order instructions run (**scheduling**, which matters less on out-of-order CPUs). Start with selection and a deliberately bad allocator: every temporary lives in a stack slot, and each instruction loads its operands into scratch registers, operates, and stores the result. This produces slow but *correct* code quickly, and correctness first is the right order.

Selection for an expression tree is **tiling**: cover the tree with patterns, each corresponding to one instruction. x86-64 has rich addressing modes, so \`a[i]\` with a scaled index is one \`mov\` with a \`base + index*8 + disp\` operand, while RISC-V needs a shift, an add and a load. **Maximal munch** (pick the largest tile at the root, recurse on the leaves) is simple and good; dynamic programming over tiles with costs is optimal for trees. Watch for x86's two-operand form (\`add rax, rbx\` destroys rax) versus RISC-V's three-operand form.

Calls are where bugs hide. The **System V AMD64 ABI** passes the first six integer arguments in rdi, rsi, rdx, rcx, r8, r9, returns in rax, and the stack must be 16-byte aligned at the call instruction. rbx, rbp, r12-r15 are **callee-saved** (a function must restore them), the rest are **caller-saved** (assume destroyed across any call). RISC-V's convention has the same shape with a0-a7 and s-registers. The **prologue** saves the frame pointer and callee-saved registers and allocates locals; the **epilogue** undoes it. Get alignment wrong and \`printf\` with a double will crash in a way that looks random.

Emit assembly text, run \`as\` and link against a small C runtime with \`cc\`. Read the ABI document for your target and chibicc's \`codegen.c\` for a minimal but correct generator; then write yours for your IR.`,
          resources: [
            {
              title: 'CS143 — Code Generation lectures',
              url: 'https://web.stanford.edu/class/cs143/',
              type: 'lecture',
              cost: 'free',
              provider: 'Stanford',
              note: 'Stack-machine style code generation, activation records and the calling convention.',
              primary: true,
            },
            {
              title: 'System V Application Binary Interface: AMD64 Architecture Processor Supplement',
              url: 'https://gitlab.com/x86-psABIs/x86-64-ABI',
              type: 'documentation',
              cost: 'free',
              provider: 'x86-64 psABI group',
              note: 'Section 3.2 (function calling sequence) is the part you need: register usage, stack frame, argument passing.',
            },
            {
              title: 'chibicc — codegen.c',
              url: 'https://github.com/rui314/chibicc',
              type: 'documentation',
              cost: 'free',
              provider: 'Rui Ueyama',
              note: 'A complete x86-64 code generator for C in one readable file; the commit history shows each feature being added.',
            },
            {
              title: 'x86 and amd64 instruction reference (Felix Cloutier)',
              url: 'https://www.felixcloutier.com/x86/',
              type: 'documentation',
              cost: 'free',
              provider: 'Felix Cloutier',
              note: 'Searchable rendering of the Intel manual; look up every instruction you emit.',
            },
            {
              title: 'RISC-V ISA specifications',
              url: 'https://riscv.org/technical/specifications/',
              type: 'documentation',
              cost: 'free',
              provider: 'RISC-V International',
              note: 'The unprivileged spec and the calling-convention chapter of the psABI, if you target RISC-V.',
            },
          ],
          exercises: [
            {
              slug: 'naive-codegen',
              title: 'A naive but correct code generator',
              prompt:
                'Write a code generator from your IR to x86-64 (or RISC-V) assembly where every IR variable has a stack slot. Implement arithmetic, comparisons, branches, calls with up to six arguments, and returns. Link with a C runtime providing print functions. All 30 corpus programs must produce correct output. Then write a program that passes a double to printf and verify stack alignment by making it crash with misalignment and fixing it.',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'calling-convention-audit',
              title: 'Calling convention by inspection',
              prompt:
                'Write a C function with eight integer parameters that calls another function and uses a callee-saved register. Compile at -O1 on Compiler Explorer, then annotate every instruction of the prologue, argument setup, call and epilogue with the ABI rule it obeys. Where do arguments 7 and 8 go? Which registers does the function save and why those?',
              kind: 'reading',
              difficulty: 2,
            },
            {
              slug: 'tiling-by-hand',
              title: 'Tile an expression tree',
              prompt:
                'For `x = a[i + 1] * 8 + b`, draw the IR tree and tile it for x86-64 using scaled-index addressing and `lea`, then for RISC-V. Count instructions for each. Then show a second, worse tiling for x86-64 and explain the cost model that prefers the first.',
              kind: 'problem',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What is the difference between caller-saved and callee-saved registers, and how does a code generator use the distinction?',
              answerOutline:
                'Callee-saved must be preserved by any function that uses them (save in prologue, restore in epilogue); caller-saved may be clobbered by a call, so the caller spills live values in them before a call. The allocator prefers callee-saved for values live across calls.',
            },
            {
              question: 'Why must the stack be 16-byte aligned at a call on x86-64 System V?',
              answerOutline:
                'The ABI requires it so callees can use aligned SSE instructions on stack data; glibc functions like printf rely on it and crash (movaps fault) if it is violated.',
            },
            {
              question: 'What does maximal-munch tiling optimise and what does it miss?',
              answerOutline:
                'It greedily picks the largest matching pattern at each node, which gives locally good code quickly; it can miss globally cheaper tilings that dynamic programming over costs would find.',
            },
          ],
        },
        {
          slug: 'register-allocation',
          title: 'Register allocation',
          summary:
            'Turning unbounded temporaries into a finite register set: liveness and interference graphs, graph colouring with spilling (Chaitin-Briggs), linear scan, and measuring the result.',
          estimatedMinutes: 150,
          objectives: [
            'Build an interference graph from liveness analysis and explain why two simultaneously live values cannot share a register',
            'Implement graph colouring with simplify/select and spilling, and explain why K-colouring is NP-hard but the heuristic works',
            'Implement linear scan allocation and compare its compile time and code quality with colouring',
            'Handle calling-convention constraints: precoloured registers, caller-saved clobbers at calls, and move coalescing',
          ],
          concepts: [
            'Live ranges and live intervals',
            'Interference graph; K-colouring',
            'Chaitin-Briggs: simplify, spill, select, optimistic colouring',
            'Spill cost and spill code; rematerialisation',
            'Move coalescing (Briggs/George conservative)',
            'Precoloured nodes for ABI registers',
            'Linear scan and its variants',
            'Measuring: spills, dynamic loads/stores, run time',
          ],
          explanation: `Your naive back end reloads every operand from the stack. **Register allocation** is the single biggest win in code generation, often a factor of several in run time, and it is a beautiful algorithmic problem.

From **liveness** (module 5) compute each variable's **live range**. Two variables **interfere** if they are live at the same time; build the **interference graph** with one node per variable and an edge per interference. Assigning $K$ registers is colouring this graph with $K$ colours. That is NP-hard in general, but Chaitin's heuristic works well: repeatedly **simplify** by removing any node with fewer than $K$ neighbours (it can always be coloured afterwards), pushing it on a stack; if none exists, pick a node to **spill** by cost (uses weighted by loop depth divided by degree) and remove it optimistically; then **select** colours by popping the stack. A node that cannot be coloured gets spilled for real: its live range is replaced by short ranges around each use and definition, with loads and stores, and the whole thing iterates. Briggs's optimistic colouring and conservative **coalescing** (merge the two sides of a copy if the merged node stays colourable) reduce copies without causing spills.

ABI constraints fit naturally: argument and return registers are **precoloured** nodes, and every call site interferes with all caller-saved registers, so values live across calls land in callee-saved registers or get spilled.

**Linear scan** is the alternative JITs use: sort live intervals by start, walk them, assign a free register or spill the interval that ends last. It runs in near-linear time and produces code maybe 10% worse than colouring. Modern variants (second-chance binpacking, LLVM's greedy allocator) close most of the gap.

Implement both for your IR, then measure: count spills and dynamic loads/stores, and time the benchmarks. CS 6120's lesson and the Appel chapter give the algorithms; the exercises make you compare them.`,
          resources: [
            {
              title: 'CS143 — Register Allocation lecture',
              url: 'https://web.stanford.edu/class/cs143/',
              type: 'lecture',
              cost: 'free',
              provider: 'Stanford',
              note: 'Interference graphs and the graph-colouring heuristic.',
              primary: true,
            },
            {
              title: 'Poletto and Sarkar — Linear Scan Register Allocation',
              url: 'https://dl.acm.org/doi/10.1145/330249.330250',
              type: 'article',
              cost: 'freemium',
              provider: 'ACM TOPLAS 1999',
              note: 'The original linear-scan paper; the algorithm is one page. Freely readable copies exist on the authors\' pages.',
            },
            {
              title: 'Modern Compiler Implementation (Appel) — chapter 11, Register Allocation',
              url: 'https://www.cs.princeton.edu/~appel/modern/',
              type: 'textbook',
              cost: 'paid',
              provider: 'Andrew Appel',
              note: 'The clearest presentation of Chaitin-Briggs with coalescing. Free alternative: the CS143 lecture and CS 6120 notes.',
            },
            {
              title: 'CS 6120 — Register allocation lesson (and the Bril-to-native projects)',
              url: 'https://www.cs.cornell.edu/courses/cs6120/2020fa/self-guided/',
              type: 'lecture',
              cost: 'free',
              provider: 'Cornell',
            },
          ],
          exercises: [
            {
              slug: 'interference-graph',
              title: 'Interference graphs from liveness',
              prompt:
                'Using your liveness analysis, build the interference graph for each function in your IR and print it in dot format. For a function with a loop and six variables, colour it by hand with K=3, then K=2, showing which variable you spill and why. Verify your hand colouring with a brute-force checker.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'graph-colouring-allocator',
              title: 'Chaitin-Briggs allocator with spilling',
              prompt:
                'Implement simplify/spill/select with iterative spilling and precoloured ABI registers for your x86-64 or RISC-V backend. Add conservative coalescing. All corpus programs must still pass. Report for each benchmark: number of spilled variables, dynamic loads+stores, and run time compared to the all-stack backend.',
              kind: 'coding',
              difficulty: 3,
              hint: 'Spill cost = sum over uses and defs of 10^loop-depth, divided by degree. Start with K small (4 registers) to exercise spilling, then use the real register set.',
            },
            {
              slug: 'linear-scan',
              title: 'Linear scan and a comparison',
              prompt:
                'Implement linear scan over live intervals computed from a linearised CFG. Compare it with your colouring allocator on compile time (allocation phase only, on the largest benchmark) and on run time and spill count. Write a paragraph on when you would choose each.',
              kind: 'coding',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'Why can a node with fewer than K neighbours always be coloured?',
              answerOutline:
                'Its neighbours use at most K-1 colours, so at least one colour remains. Removing such nodes first (simplify) guarantees they colour when reinserted.',
            },
            {
              question: 'What does spilling a variable do to the interference graph?',
              answerOutline:
                'Its long live range is split into tiny ranges around each use/def (load before use, store after def), so it interferes with far fewer nodes; the graph is rebuilt and colouring retried.',
            },
            {
              question: 'Why is linear scan popular in JIT compilers?',
              answerOutline:
                'Allocation time is near-linear and predictable, which matters when compilation happens at run time; code quality is close enough to colouring for most code.',
            },
          ],
        },
        {
          slug: 'targeting-webassembly-and-llvm',
          title: 'Alternative targets: WebAssembly and LLVM backends',
          summary:
            'Stack-machine code generation for WebAssembly, structured control flow, the wasm runtime model, and using LLVM as a complete back end: what you gain, what you give up, and how to link, debug and ship the result.',
          estimatedMinutes: 120,
          objectives: [
            'Generate WebAssembly text format from your IR, including structured control flow (block/loop/br_if) from an arbitrary CFG',
            'Explain the WebAssembly execution model: linear memory, the typed stack, imports/exports, and sandboxing',
            'Use LLVM (via textual IR or an API binding) as a back end with optimizations and multiple targets',
            'Compare native, wasm and LLVM-based backends on binary size, run time and engineering cost',
          ],
          concepts: [
            'Stack machine code generation',
            'WebAssembly: linear memory, value types, functions, tables',
            'Structured control flow; the relooper / stackifier problem',
            'Imports and exports; host interface',
            'LLVM as a backend: llc, target triples, -O levels',
            'Linking, static vs dynamic; debug info (DWARF)',
            'Binary size vs speed trade-offs',
          ],
          explanation: `Not every target is a register machine with jumps. **WebAssembly** is a **stack machine**: instructions pop operands and push results, locals are numbered slots, and code is emitted for an expression tree by post-order traversal, which is pleasantly simple. The catch is control flow: wasm has no arbitrary jumps, only structured \`block\`, \`loop\`, \`if\` and \`br\` to an enclosing label. A CFG from your optimizer must be turned back into structured form, the problem solved by Emscripten's **relooper** and LLVM's **stackifier**. For reducible CFGs (which your language produces) the algorithm is: emit loops for natural loops, blocks for forward merges, and \`br_if\` for exits. Irreducible graphs need a dispatch loop with a state variable.

Wasm's runtime model is a **sandbox**: a single linear memory (a byte array the module can grow), typed functions, and no access to the host except through explicit **imports**. Your runtime (print, allocate) becomes a handful of JavaScript or WASI functions. Memory management is entirely yours: a bump allocator in linear memory is enough to start, and a GC must be written in wasm itself or rely on the newer GC proposal.

**LLVM** as a back end is the other extreme: you emit IR and get optimizations, register allocation, scheduling and codegen for every major ISA, plus DWARF debug info. The costs are a large dependency, compile times of seconds rather than milliseconds, and friction when you need GC safepoints or unusual calling conventions. Many languages (Rust, Swift, Zig until recently) accept the trade; others (Go, OCaml) write their own backends for compile speed and control.

Build the wasm target for your IR and run it in Node or a browser, then compare all three backends you now have on the same benchmarks: binary size, run time and lines of code you had to write.`,
          resources: [
            {
              title: 'WebAssembly Specification (core)',
              url: 'https://webassembly.github.io/spec/core/',
              type: 'documentation',
              cost: 'free',
              provider: 'W3C WebAssembly Community Group',
              note: 'The text format and instruction semantics; the "Structure" and "Text Format" chapters are what a code generator needs.',
              primary: true,
            },
            {
              title: 'MDN — WebAssembly documentation and text format guide',
              url: 'https://developer.mozilla.org/en-US/docs/WebAssembly',
              type: 'documentation',
              cost: 'free',
              provider: 'Mozilla',
              note: 'Understanding the text format, and loading modules from JavaScript.',
            },
            {
              title: 'WebAssembly Binary Toolkit (wabt): wat2wasm, wasm-interp',
              url: 'https://github.com/WebAssembly/wabt',
              type: 'tool',
              cost: 'free',
              provider: 'WebAssembly project',
              note: 'Assemble your .wat output and run it without a browser.',
            },
            {
              title: 'LLVM Tutorial — Kaleidoscope: Compiling to Object Code (chapter 8)',
              url: 'https://llvm.org/docs/tutorial/',
              type: 'documentation',
              cost: 'free',
              provider: 'LLVM Project',
              note: 'Target triples, target machines and emitting .o files from IR.',
            },
          ],
          exercises: [
            {
              slug: 'wasm-backend',
              title: 'A WebAssembly backend',
              prompt:
                'Emit .wat from your IR: functions with typed locals, expression code by post-order traversal, and structured control flow from the CFG using block/loop/br_if. Import print functions from a tiny JavaScript or WASI host. Assemble with wat2wasm and run the corpus in Node; all outputs must match. Include a program with a loop containing an early exit and a nested if to exercise the structuring.',
              kind: 'coding',
              difficulty: 3,
              hint: 'Process blocks in reverse postorder; open a loop at each loop header and a block before each merge point; a branch to a header becomes br to the loop label, a branch to a merge becomes br to the block label.',
            },
            {
              slug: 'three-backends-compared',
              title: 'Compare three backends',
              prompt:
                'For your five benchmark programs, measure binary size and run time for: native x86-64 via your own backend with register allocation, LLVM IR via clang -O2, and wasm in Node. Present a table and discuss where each wins. Count the lines of code in each backend.',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'irreducible-structuring',
              title: 'Structuring an irreducible CFG',
              prompt:
                'Construct an irreducible CFG (two blocks that each jump to the other, both reachable from entry). Show why the simple block/loop scheme fails, then emit wasm for it using a dispatch loop with a state variable. Explain the run-time cost of this encoding.',
              kind: 'problem',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does WebAssembly restrict control flow to structured forms?',
              answerOutline:
                'Structured control flow makes validation (type checking the operand stack) single-pass and linear, and compilation to native code fast and streaming; it also simplifies sandboxing guarantees.',
            },
            {
              question: 'How does a stack-machine code generator emit code for an expression tree?',
              answerOutline:
                'Post-order traversal: emit code for each child (leaving its value on the stack), then the operator instruction, which pops the operands and pushes the result.',
            },
            {
              question: 'Give two reasons a language implementation might not use LLVM as its backend.',
              answerOutline:
                'Compile-time cost and dependency size; need for precise GC safepoints or custom calling conventions; wanting a small self-contained toolchain (Go, OCaml, Zig\'s own backends).',
            },
          ],
        },
        {
          slug: 'runtime-systems-and-garbage-collection',
          title: 'Runtime systems and garbage collection',
          summary:
            'What the runtime provides (allocation, object layout, calls into the host), and the garbage collection algorithms: mark-sweep, copying, generational, with the compiler support (root finding, safepoints, barriers) they need.',
          estimatedMinutes: 150,
          objectives: [
            'Design an object layout with a header (type tag, mark bit, size) and explain how the collector uses it',
            'Implement a mark-sweep collector with precise root finding and explain how the compiler must cooperate',
            'Compare mark-sweep, copying and generational collectors on throughput, pause time and memory overhead',
            'Explain write barriers, safepoints and conservative collection, and when each is used',
          ],
          concepts: [
            'Runtime system: allocator, object layout, host calls',
            'Reachability; roots: stack, registers, globals',
            'Mark-sweep; free lists; fragmentation',
            'Copying (Cheney) collection; semispaces; bump allocation',
            'Generational hypothesis; nursery; write barrier; remembered set',
            'Safepoints and stack maps; conservative vs precise GC',
            'Tracing vs reference counting',
            'GC tuning: heap growth factor, pause time vs throughput',
          ],
          explanation: `Compiled code does not run alone. The **runtime** provides the allocator, string and array operations, I/O, and, for most languages, a **garbage collector**. The collector is where the compiler and runtime are most tightly coupled, because the collector must know which words in memory and on the stack are pointers.

A collector reclaims objects not **reachable** from the **roots** (globals, the stack, registers). **Mark-sweep** traces from the roots marking every reachable object, then sweeps the heap putting unmarked objects on free lists. It is simple, works with objects that cannot move, and is what Crafting Interpreters builds for clox. Its costs are a full-heap sweep and fragmentation. **Copying collection** (Cheney's algorithm) copies reachable objects to a fresh semispace and then abandons the old one; allocation becomes a pointer bump and there is no fragmentation, at the price of half the memory and the need to update every pointer. The **generational hypothesis** (most objects die young) motivates a small **nursery** collected often by copying, and an old space collected rarely; because old objects may point to young ones, the compiler must emit a **write barrier** on every pointer store into the heap to record such pointers in a remembered set.

The compiler's duties: emit **stack maps** at **safepoints** (call sites, loop back-edges) saying which stack slots and registers hold pointers, so the collector is **precise**; or, if you cannot (C and C++), use a **conservative** collector like Boehm's that treats any word that looks like a pointer as one. Tagging (low bits of a word distinguish integers from pointers) is the other classic trick.

Work through the clox garbage collection chapter in full, then design the object layout and write a mark-sweep collector for your compiled language, with the compiler emitting root information. Measure pause times on an allocation-heavy benchmark and tune the heap growth factor.`,
          resources: [
            {
              title: 'Crafting Interpreters — Garbage Collection (chapter 26)',
              url: 'https://craftinginterpreters.com/garbage-collection.html',
              type: 'textbook',
              cost: 'free',
              provider: 'Robert Nystrom',
              note: 'A complete mark-sweep collector with the subtle bugs (collecting during allocation) explained.',
              primary: true,
            },
            {
              title: 'The Garbage Collection Handbook (Jones, Hosking, Moss) — book site',
              url: 'https://gchandbook.org/',
              type: 'textbook',
              cost: 'paid',
              provider: 'Jones, Hosking and Moss',
              note: 'The reference on every algorithm. Free alternative: the Crafting Interpreters chapter and the Boehm GC documentation below.',
            },
            {
              title: 'Boehm-Demers-Weiser conservative garbage collector',
              url: 'https://www.hboehm.info/gc/',
              type: 'documentation',
              cost: 'free',
              provider: 'Hans Boehm',
              note: 'Documentation and papers on conservative collection; linking it is the fastest way to get a GC for a C-based runtime.',
            },
            {
              title: 'CS 6120 — Garbage collection lesson',
              url: 'https://www.cs.cornell.edu/courses/cs6120/2020fa/self-guided/',
              type: 'lecture',
              cost: 'free',
              provider: 'Cornell',
              note: 'Mark-sweep, copying and generational collection and the compiler support each requires.',
            },
          ],
          exercises: [
            {
              slug: 'mark-sweep-for-your-language',
              title: 'Mark-sweep with precise roots',
              prompt:
                'Add a heap with object headers (type, size, mark bit) and a mark-sweep collector to your runtime. Make the compiler emit, at each call site, a stack map of which stack slots hold pointers (or keep a shadow stack of pointer locals). Trigger collection when allocated bytes exceed a threshold that grows by a factor after each collection. Test with a program that allocates a long linked list, drops it, and allocates again: memory must not grow unboundedly.',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'gc-benchmark',
              title: 'Measure throughput and pause times',
              prompt:
                'Write an allocation-heavy benchmark (build and discard binary trees of depth 16, as in the classic binary-trees benchmark). Instrument the collector to log each pause duration and total time in GC. Run with heap growth factors 1.5, 2 and 4; report total run time, number of collections, maximum pause and peak memory for each. Explain the trade-off you observe.',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'copying-collector',
              title: 'A Cheney copying collector',
              prompt:
                'Implement a semispace copying collector with bump allocation as an alternative to mark-sweep. Handle forwarding pointers and update roots. Run the same benchmark and compare allocation speed, collection time and peak memory with mark-sweep. Then explain which barrier you would need to make it generational.',
              kind: 'coding',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does a precise collector need compiler cooperation, and what exactly does the compiler provide?',
              answerOutline:
                'The collector must find all pointers in roots and objects. The compiler provides object layouts (which fields are pointers) and stack maps at safepoints (which slots/registers hold pointers), or a shadow stack.',
            },
            {
              question: 'What is the write barrier for in a generational collector?',
              answerOutline:
                'To record old-to-young pointers created by stores, so a nursery collection can treat them as roots without scanning the whole old generation.',
            },
            {
              question: 'Compare mark-sweep and copying on fragmentation, allocation cost and memory overhead.',
              answerOutline:
                'Mark-sweep: fragmentation, free-list allocation, low overhead, objects do not move. Copying: no fragmentation, bump allocation, needs 2x memory, must update all pointers, cost proportional to live data not heap size.',
            },
          ],
        },
      ],
      project: {
        slug: 'native-backend',
        title: 'Module project: a native backend with register allocation and a collector',
        description:
          'Complete the back end for your language: instruction selection to x86-64 or RISC-V, a graph-colouring or linear-scan register allocator, correct calling convention, and a runtime with a mark-sweep collector. Validate against the interpreter and measure against the LLVM-emitting backend.',
        deliverables: [
          'Native backend passing the entire corpus; CI assembles, links and runs the programs',
          'Register allocator with a spill report per function',
          'Runtime in C with printing, allocation, strings/arrays and a mark-sweep GC with precise roots',
          'Benchmark table: interpreter vs naive native vs allocated native vs LLVM -O2',
        ],
        estimatedHours: 18,
        stretchGoals: ['Add a WebAssembly backend and run the corpus in a browser'],
      },
    },
    {
      slug: 'programming-language-concepts',
      title: 'Programming Language Concepts',
      description:
        'The ideas that shape languages and their implementations: interpreters and bytecode VMs, closures and their compilation, type system design, and just-in-time compilation for dynamic languages.',
      lessons: [
        {
          slug: 'interpreters-tree-walking-and-bytecode',
          title: 'Interpreters: tree-walking and bytecode virtual machines',
          summary:
            'How interpreters execute programs, why bytecode VMs are faster than AST walkers, instruction dispatch techniques, and stack vs register VM design, following clox.',
          estimatedMinutes: 150,
          objectives: [
            'Explain the costs of a tree-walking interpreter (pointer chasing, dynamic dispatch, allocation) and how a bytecode VM removes them',
            'Design a bytecode instruction set and a compiler from your core AST to it',
            'Implement a stack-based VM with a value representation, constant pool and a dispatch loop; measure dispatch techniques',
            'Compare stack and register VMs and relate the choice to Lua, CPython and the JVM',
          ],
          concepts: [
            'Tree-walking interpreter; environment-based evaluation',
            'Bytecode; instruction encoding; constant pool',
            'Stack VM vs register VM',
            'Dispatch: switch, direct threading, computed goto',
            'Value representation: tagged unions, NaN boxing, pointer tagging',
            'Call frames in a VM',
            'Interpreter overhead vs compiled code',
          ],
          explanation: `A **tree-walking interpreter** evaluates the AST directly: each node's \`evaluate\` method recursively evaluates its children. It is the quickest route to a running language (jlox in Crafting Interpreters) and it is slow: every operation chases pointers through heap-allocated nodes, dispatches virtually, looks up variables by name in hash tables, and boxes every value.

A **bytecode VM** fixes each cost. The compiler flattens the tree into a dense array of small instructions (\`OP_CONSTANT 3\`, \`OP_ADD\`, \`OP_JUMP_IF_FALSE 12\`) with constants in a side table; variables become slot indices resolved at compile time; values live in a contiguous stack or register file. The VM's core is a loop: fetch the opcode, dispatch, execute. clox is 2-3 times faster than jlox from these changes alone, before any cleverness.

The two design axes are **stack vs register** and **dispatch**. A stack VM (JVM, CPython, WebAssembly) has tiny instructions and a trivial compiler; a register VM (Lua 5+, Dalvik) executes fewer, larger instructions because operands name slots directly, avoiding push/pop traffic. For dispatch, a \`switch\` in a loop costs a bounds check and an indirect jump through one poorly predicted site; **direct threading** with computed goto (a GCC extension) puts an indirect jump at the end of every handler, which branch predictors handle far better. Measure it; the gain ranges from nothing to 20% depending on the CPU.

**Value representation** matters as much: a tagged union costs 16 bytes per value, while **NaN boxing** packs doubles, pointers and small integers into 8 bytes by exploiting the unused bits of NaN. Work through clox chapters 14-24, then write a bytecode compiler and VM for your own core language and benchmark it against your tree-walker and your native code. The ratios you measure are the lasting lesson.`,
          resources: [
            {
              title: 'Crafting Interpreters — Part III: A Bytecode Virtual Machine (chapters 14-24)',
              url: 'https://craftinginterpreters.com/a-bytecode-virtual-machine.html',
              type: 'textbook',
              cost: 'free',
              provider: 'Robert Nystrom',
              note: 'Chunks, the VM, scanning on demand, compiling expressions, globals, locals, jumping, calls and functions.',
              primary: true,
            },
            {
              title: 'Crafting Interpreters — Optimization (chapter 30, NaN boxing and hashing)',
              url: 'https://craftinginterpreters.com/optimization.html',
              type: 'textbook',
              cost: 'free',
              provider: 'Robert Nystrom',
            },
            {
              title: 'The Implementation of Lua 5.0 (Ierusalimschy, de Figueiredo, Celes)',
              url: 'https://www.lua.org/doc/jucs05.pdf',
              type: 'article',
              cost: 'free',
              provider: 'Lua.org',
              note: 'The register-based VM design and its rationale, from the authors.',
            },
            {
              title: 'CPython internals: the evaluation loop (ceval.c) and bytecode documentation',
              url: 'https://docs.python.org/3/library/dis.html',
              type: 'documentation',
              cost: 'free',
              provider: 'Python Software Foundation',
              note: 'Use dis to see the bytecode a real stack VM executes for your Python functions.',
            },
          ],
          exercises: [
            {
              slug: 'bytecode-compiler-and-vm',
              title: 'Bytecode compiler and stack VM for your language',
              prompt:
                'Design a bytecode (document every opcode and its stack effect), write a compiler from your core AST to it with locals as slots and jumps patched after emission, and a VM with call frames. Run the corpus; outputs must match the tree-walker. Benchmark five programs: tree-walker vs VM vs native. Report the speedup ratios.',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'dispatch-techniques',
              title: 'Measure dispatch techniques',
              prompt:
                'Implement the VM dispatch loop three ways: switch, computed goto (direct threading), and a table of function pointers. On a tight arithmetic loop benchmark, measure instructions per second for each with 10 runs, and use `perf stat` (or equivalent) to report branch mispredictions. Explain the results in terms of indirect branch prediction.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'nan-boxing',
              title: 'NaN boxing',
              prompt:
                'Replace your tagged-union value type with NaN-boxed 64-bit values: doubles as themselves, pointers and booleans/nil in the NaN payload. Document the bit layout. Verify every corpus program, then measure memory per value and run time on an array-heavy benchmark before and after.',
              kind: 'coding',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'Name three sources of overhead in a tree-walking interpreter that a bytecode VM removes.',
              answerOutline:
                'Pointer chasing through heap AST nodes (cache misses), virtual/recursive dispatch per node, name-based variable lookup in hash maps; also allocation of boxed intermediate values.',
            },
            {
              question: 'Why can a register VM execute fewer instructions than a stack VM for the same program?',
              answerOutline:
                'Instructions name their operand slots directly, so loads to and stores from an operand stack (push/pop) are not needed; `a = b + c` is one instruction instead of four.',
            },
            {
              question: 'How does NaN boxing fit a pointer and a double into the same 64 bits?',
              answerOutline:
                'IEEE doubles have 2^52 NaN encodings; real computations produce only one. The others\' payload bits hold a 48-bit pointer or small tagged values, distinguished by the quiet-NaN pattern and sign bit.',
            },
          ],
        },
        {
          slug: 'closures-and-first-class-functions',
          title: 'Closures: environments, upvalues and closure conversion',
          summary:
            'What a closure is semantically, how interpreters implement captured variables with upvalues, and how compilers implement them with closure conversion and lambda lifting.',
          estimatedMinutes: 150,
          objectives: [
            'Define a closure as a function value plus its captured environment and explain the funarg problem',
            'Implement closures in a bytecode VM with upvalues that live on the stack until the enclosing function returns, then are closed over to the heap',
            'Implement closure conversion for a compiler: free-variable analysis, environment records and the calling sequence',
            'Explain lambda lifting and when escape analysis allows a closure to be stack-allocated',
          ],
          concepts: [
            'First-class functions; closures; free variables',
            'Upward and downward funarg problems',
            'Lexical addressing',
            'Upvalues: open (on stack) and closed (on heap)',
            'Closure conversion; environment record; flat vs linked closures',
            'Lambda lifting',
            'Escape analysis',
            'Capture by reference vs by value',
          ],
          explanation: `A **closure** is a function together with the bindings of its **free variables**, the variables it uses but does not define. Any language with nested functions and first-class function values must answer: when an inner function outlives the call that created it (the **upward funarg problem**), where do the captured variables live? The stack frame is gone; the variables must be somewhere else.

Interpreters and VMs usually use **upvalues**, the Lua technique that clox adopts. While the enclosing function is still running, a captured variable stays in its stack slot and the closure holds an *open* upvalue pointing at it, so inner and outer function share the same storage and mutations are visible to both. When the enclosing function returns, the VM *closes* the upvalue by copying the value into the heap-allocated upvalue object and repointing it. Two closures capturing the same variable share one upvalue, which is what preserves shared-mutation semantics. The compiler's job is **free-variable analysis**: for each nested function, which variables of enclosing functions it references, and at what depth.

Compilers to native code use **closure conversion**: every function takes an extra parameter, its environment record, and every function value becomes a pair (code pointer, environment). Free variables are rewritten as field accesses into the environment. **Flat** closures copy each free variable into their own record (fast access, more copying, requires boxing mutable captured variables so sharing survives); **linked** closures keep a pointer to the parent's record. **Lambda lifting** eliminates closures entirely when the function does not escape, by adding the free variables as ordinary parameters. **Escape analysis** decides which closures can be stack-allocated because they never outlive their creator: the usual case for callbacks passed downward.

Implement upvalues in your VM following clox chapter 25, then closure conversion in your compiler, and verify the sharing semantics with a counter-generator test.`,
          resources: [
            {
              title: 'Crafting Interpreters — Closures (chapter 25)',
              url: 'https://craftinginterpreters.com/closures.html',
              type: 'textbook',
              cost: 'free',
              provider: 'Robert Nystrom',
              note: 'Upvalues, open and closed, with the full clox implementation.',
              primary: true,
            },
            {
              title: 'Crafting Interpreters — Functions (jlox closures via environments, chapter 10)',
              url: 'https://craftinginterpreters.com/functions.html',
              type: 'textbook',
              cost: 'free',
              provider: 'Robert Nystrom',
            },
            {
              title: 'Closure conversion — Matt Might',
              url: 'https://matt.might.net/articles/closure-conversion/',
              type: 'article',
              cost: 'free',
              provider: 'Matt Might',
              note: 'Flat and shared closure conversion explained with code.',
            },
            {
              title: 'An Incremental Approach to Compiler Construction (Ghuloum)',
              url: 'http://scheme2006.cs.uchicago.edu/11-ghuloum.pdf',
              type: 'article',
              cost: 'free',
              provider: 'Scheme Workshop 2006',
              note: 'Builds a Scheme-to-x86 compiler step by step; the closure-conversion steps are directly reusable.',
            },
          ],
          exercises: [
            {
              slug: 'upvalues-in-your-vm',
              title: 'Upvalues in your VM',
              prompt:
                'Add nested functions and closures to your bytecode compiler and VM using open/closed upvalues. Tests: a counter generator (two counters must be independent), two closures sharing one variable (mutation through one visible in the other), and a closure created in a loop capturing the loop variable (document whether each iteration gets a fresh variable, and make the tests match your language definition).',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'closure-conversion-pass',
              title: 'Closure conversion in your compiler',
              prompt:
                'Add closures to your compiled language via a closure-conversion pass on the core tree: free-variable analysis, flat environment records allocated on the heap, boxing of mutable captured variables, and function values as (code, env) pairs. The same three tests must pass natively. Show the converted core tree for the counter generator.',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'escape-analysis',
              title: 'Stack-allocate non-escaping closures',
              prompt:
                'Implement a simple escape analysis: a closure escapes if it is returned, stored into the heap, or passed to an unknown function. For non-escaping closures (e.g. passed to a known higher-order function that is inlined or known not to retain its argument), allocate the environment on the stack. Measure allocation count on a program that calls `map` with a lambda one million times before and after.',
              kind: 'coding',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'Why must an upvalue be closed when the enclosing function returns?',
              answerOutline:
                'The captured variable lives in that function\'s stack frame; after return the slot is reused. Closing copies the value to a heap object so the closure keeps a valid, shared reference.',
            },
            {
              question: 'In flat closure conversion, why must mutable captured variables be boxed?',
              answerOutline:
                'Flat closures copy values into each closure record; without a shared box, two closures (or the closure and its parent) would see different copies and mutations would not be shared.',
            },
            {
              question: 'When can a closure be allocated on the stack?',
              answerOutline:
                'When it provably does not escape its creating activation: not returned, not stored into the heap or globals, and only passed to callees known not to retain it.',
            },
          ],
        },
        {
          slug: 'type-systems-and-language-design',
          title: 'Type systems and language design',
          summary:
            'The design space of type systems: static vs dynamic vs gradual, soundness and its price, algebraic data types and pattern matching, generics and traits, ownership and effects, with the lambda calculus as the common skeleton.',
          estimatedMinutes: 120,
          objectives: [
            'Explain what soundness guarantees, what a type system gives up to achieve it, and where mainstream languages deliberately break it',
            'Compare parametric polymorphism, subtyping and ad hoc polymorphism (type classes/traits) with examples',
            'Describe how ownership and borrowing types (Rust) and effect systems extend what types can track',
            'Relate a language feature to its lambda-calculus core and predict its implementation cost',
          ],
          concepts: [
            'Lambda calculus as a core language',
            'Static vs dynamic vs gradual typing',
            'Soundness, completeness, decidability trade-offs',
            'Algebraic data types and exhaustive pattern matching',
            'Parametric vs ad hoc polymorphism; type classes and traits',
            'Subtyping and variance',
            'Ownership, borrowing and linear types',
            'Effect systems and checked exceptions',
          ],
          explanation: `Having implemented a checker and inference, you can now read type systems as *designs* with costs. The common skeleton is the **lambda calculus**: variables, abstraction and application. Every feature is an extension of it, and the Software Foundations volumes and PLAI show that a feature's implementation complexity tracks its addition to the calculus.

The first design axis is **when** to check. Static typing rejects programs before running; dynamic typing checks at each operation; **gradual typing** (TypeScript, Python type hints, Typed Racket) lets the two coexist with casts at the boundary, and the research question is whether those casts preserve soundness and at what run-time cost. The second axis is **soundness**: a sound system guarantees that well-typed programs cannot hit the errors the types exclude, but it must reject some correct programs (incompleteness) and stay decidable. Mainstream languages compromise deliberately: Java's covariant arrays, TypeScript's bivariant method parameters, and \`unsafe\` blocks in Rust each trade soundness for convenience in a controlled place.

**Polymorphism** has three flavours. Parametric (generics, HM) works for all types uniformly; subtyping lets a value of one type be used as another (with **variance** rules for containers that are the classic source of bugs); ad hoc polymorphism via **type classes** (Haskell) or **traits** (Rust) dispatches on the type and is implemented either by dictionary passing or by monomorphisation. **Algebraic data types** with exhaustive **pattern matching** make illegal states unrepresentable and compile to efficient decision trees.

Newer systems track more than shape. **Ownership and borrowing** in Rust are a form of **linear types** that let the type checker prove memory safety without a collector; **effect systems** track what a computation may do (throw, allocate, perform I/O), of which checked exceptions were an early, clumsy instance. The exercises ask you to add one of these to your language and to find where it bites.`,
          resources: [
            {
              title: 'PLAI — Programming Languages: Application and Interpretation',
              url: 'https://www.plai.org/',
              type: 'textbook',
              cost: 'free',
              provider: 'Shriram Krishnamurthi',
              note: 'Chapters on type systems, subtyping, objects and gradual typing, each with a small implementation.',
              primary: true,
            },
            {
              title: 'Software Foundations, Volume 2 — Programming Language Foundations',
              url: 'https://softwarefoundations.cis.upenn.edu/',
              type: 'textbook',
              cost: 'free',
              provider: 'University of Pennsylvania',
              note: 'STLC with extensions (records, subtyping, references) and mechanised soundness proofs.',
            },
            {
              title: 'University of Washington CSE 341 — Programming Languages (Dan Grossman)',
              url: 'https://courses.cs.washington.edu/courses/cse341/',
              type: 'course',
              cost: 'free',
              provider: 'University of Washington',
              note: 'The course notes on ML, Racket and Ruby compare static/dynamic typing and functional/object-oriented decomposition with unusual clarity.',
            },
            {
              title: 'The Rust Programming Language — Understanding Ownership (chapter 4)',
              url: 'https://doc.rust-lang.org/book/ch04-00-understanding-ownership.html',
              type: 'textbook',
              cost: 'free',
              provider: 'Rust project',
              note: 'Ownership and borrowing as a programmer sees them; read it as a type system after this lesson.',
            },
          ],
          exercises: [
            {
              slug: 'adts-and-exhaustiveness',
              title: 'Algebraic data types with exhaustive matching',
              prompt:
                'Add sum types and a `match` expression to your language. Implement an exhaustiveness and redundancy check and report missing cases by constructing an example value the match does not cover. Compile matches to a decision tree in your IR and show the IR for a three-constructor match. Test with a nested pattern on an option-of-pair type.',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'unsoundness-hunt',
              title: 'Find deliberate unsoundness in three languages',
              prompt:
                'Write a Java program that throws ArrayStoreException via array covariance, a TypeScript program that passes the type checker and then reads a number as a string via method-parameter bivariance, and a Rust program that compiles only with `unsafe` and exhibits undefined behaviour. For each, explain the typing rule that would reject it and why the language designers chose not to.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'design-memo',
              title: 'Type system design memo',
              prompt:
                'Write a two-page memo proposing one extension to your language\'s type system: generics with traits, a simple ownership rule for arrays, or an effect annotation for functions that may print. Specify the typing rules, give three programs it accepts and three it rejects, estimate the implementation cost in your checker, and state what guarantee it buys.',
              kind: 'writing',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What is the difference between soundness and completeness of a type system, and which do languages sacrifice?',
              answerOutline:
                'Sound: accepted programs do not go wrong. Complete: all non-wrong programs are accepted. Decidable static systems must sacrifice completeness; some mainstream systems also sacrifice soundness in specific places for convenience.',
            },
            {
              question: 'Why is a mutable container of a subtype not a subtype of the container of the supertype?',
              answerOutline:
                'Covariance would allow writing a supertype value into the subtype container (Java array covariance). Mutable containers must be invariant; read-only ones can be covariant, write-only contravariant.',
            },
            {
              question: 'How do traits/type classes get implemented at run time?',
              answerOutline:
                'Dictionary passing (a vtable-like record of methods passed implicitly) or monomorphisation (a specialised copy of the function per concrete type, as Rust does for generics by default).',
            },
          ],
        },
        {
          slug: 'jit-compilation-and-dynamic-languages',
          title: 'Just-in-time compilation and dynamic languages',
          summary:
            'How JITs make dynamic languages fast: profiling, tiered compilation, inline caches and type feedback, speculation with deoptimisation, and tracing vs method JITs.',
          estimatedMinutes: 120,
          objectives: [
            'Explain why dynamic languages are hard to compile ahead of time and what run-time information a JIT exploits',
            'Describe inline caching and hidden classes/shapes and implement a monomorphic inline cache in your VM',
            'Explain speculation, guards and deoptimisation and why a JIT must be able to fall back to the interpreter',
            'Compare method JITs (HotSpot, V8) with tracing JITs (LuaJIT, PyPy) and tiered designs',
          ],
          concepts: [
            'Dynamic typing cost: tag checks, boxing, dictionary lookups',
            'Profiling; hot spots; tiered compilation',
            'Hidden classes / shapes',
            'Inline caches: monomorphic, polymorphic, megamorphic',
            'Type feedback and speculative optimization',
            'Guards and deoptimisation (on-stack replacement)',
            'Method JIT vs tracing JIT',
            'Warm-up and compile-time budgets',
          ],
          explanation: `A static compiler for a dynamic language is stuck: \`a + b\` might add integers, concatenate strings or call a user-defined method, and \`obj.x\` means a dictionary lookup. The information needed to generate fast code (the actual types at each site) does not exist until the program runs. A **JIT** compiles at run time and uses that information.

The pattern is **tiered**: start in an interpreter that counts executions and records **type feedback** (which types were seen at each operation, which targets at each call); when a function or loop gets hot, compile it with those observations baked in as assumptions; if an assumption is violated, **deoptimise** back to the interpreter, which is possible because a **guard** (a cheap check before the fast path) catches it. Transferring execution mid-function between compiled code and interpreter, **on-stack replacement**, is the hardest engineering in a JIT.

Two mechanisms do most of the work. **Hidden classes** (V8's maps, Self's maps, PyPy's shapes) give objects created the same way the same layout, so a property lives at a fixed offset despite the language having no classes. An **inline cache** at each property access remembers the last shape seen and its offset; a monomorphic site becomes a compare and a load. Polymorphic sites keep a few entries; megamorphic ones fall back to the dictionary. You can implement a monomorphic inline cache in your bytecode VM in an afternoon and measure its effect.

**Method JITs** compile whole functions, like a static compiler with feedback; **tracing JITs** record a hot loop's actual executed path across calls into a linear trace with guards, which optimises beautifully (no control flow inside the trace) and badly when paths diverge. Both must budget compile time against expected run time, which is why short scripts stay interpreted.

Read the Self and V8 material, then implement an inline cache and a tiny trace recorder in your VM; the numbers you get are modest but the mechanism is exactly what browsers do.`,
          resources: [
            {
              title: 'V8 blog — Fast properties in V8 (hidden classes and inline caches)',
              url: 'https://v8.dev/blog/fast-properties',
              type: 'article',
              cost: 'free',
              provider: 'V8 team',
              note: 'A production explanation of shapes, inline caches and dictionary mode.',
              primary: true,
            },
            {
              title: 'An Efficient Implementation of SELF (Chambers, Ungar, Lee, 1989)',
              url: 'https://dl.acm.org/doi/10.1145/74877.74884',
              type: 'article',
              cost: 'freemium',
              provider: 'ACM OOPSLA 1989',
              note: 'Maps (hidden classes), inline caches and customisation originate here. Free copies exist on the authors\' and Self project pages.',
            },
            {
              title: 'CS 6120 — Dynamic Compilers and Tracing lessons',
              url: 'https://www.cs.cornell.edu/courses/cs6120/2020fa/self-guided/',
              type: 'lecture',
              cost: 'free',
              provider: 'Cornell',
              note: 'JIT concepts, speculation and deoptimisation, with a trace-recording task for Bril.',
            },
            {
              title: 'PyPy — Tracing the Meta-Level (Bolz, Cuni, Fijalkowski, Rigo)',
              url: 'https://dl.acm.org/doi/10.1145/1565824.1565827',
              type: 'article',
              cost: 'freemium',
              provider: 'ACM ICOOOLPS 2009',
              note: 'How PyPy derives a tracing JIT from an interpreter. A free PDF is on the PyPy site.',
            },
          ],
          exercises: [
            {
              slug: 'inline-cache',
              title: 'Monomorphic inline caches in your VM',
              prompt:
                'Add records/objects with shapes (hidden classes) to your VM: objects created by the same sequence of field additions share a shape. At each field-access instruction, cache the last shape and offset. Benchmark a loop accessing a field one million times with and without the cache; then make the site polymorphic with two shapes and megamorphic with 20 and report the slowdown at each.',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'trace-recorder',
              title: 'Record and optimise a trace',
              prompt:
                'Add a trace recorder to your VM: when a loop back-edge is hit 100 times, record the executed instructions with their observed operand types as a linear trace, inserting guards at branches and type checks. Apply constant propagation and DCE to the trace and emit it as a specialised instruction sequence (or as C compiled on the fly). Measure the speedup on a numeric loop and show a guard failure falling back to the interpreter correctly.',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'jit-case-study',
              title: 'Case study: V8 or HotSpot tiers',
              prompt:
                'Using the V8 blog or the HotSpot documentation, describe the tiers of one production JIT: what each tier compiles, what triggers promotion, what information flows between tiers, and how deoptimisation is implemented. Run a JavaScript or Java microbenchmark with and without the top tier (e.g. node --no-opt / -Xint) and report the ratio.',
              kind: 'data-analysis',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What is a guard and why does every speculative optimization need one?',
              answerOutline:
                'A cheap run-time check that the assumption the compiled code relies on (type, shape, call target) still holds; on failure execution deoptimises to a safe path. Without it, speculation would be unsound.',
            },
            {
              question: 'How do hidden classes turn a dictionary lookup into a load at a fixed offset?',
              answerOutline:
                'Objects built the same way share a shape that maps field names to offsets; an inline cache remembers (shape, offset) so if the object\'s shape matches, the field is at a known offset.',
            },
            {
              question: 'What is the failure mode of tracing JITs?',
              answerOutline:
                'Programs with highly branchy hot loops: traces exit through guards often, causing trace explosion or repeated fallbacks, so method JITs win on such code.',
            },
          ],
        },
      ],
      project: {
        slug: 'bytecode-vm-with-closures',
        title: 'Module project: a bytecode VM with closures, GC and an inline cache',
        description:
          'Build the interpreter path of your language to clox standard: a bytecode compiler, a stack VM with NaN-boxed values, closures via upvalues, a mark-sweep collector, and a monomorphic inline cache for field access. Benchmark against the tree-walker and your native code.',
        deliverables: [
          'Bytecode compiler and VM passing the corpus, with closure and GC stress tests',
          'A benchmark table: tree-walker, VM (switch dispatch), VM (threaded dispatch), native',
          'A short write-up on where the remaining interpreter overhead goes, using a profiler',
        ],
        estimatedHours: 16,
      },
    },
  ],
  capstone: {
    slug: 'compiler-to-a-real-target',
    title: 'Capstone: a working compiler for a small language to a real target',
    description: `Assemble the module projects into one compiler for your language and make it real: programs compile to native x86-64 or RISC-V assembly, WebAssembly, or LLVM IR, and run outside your tooling. The language must have integers, booleans, strings, arrays or records, first-class or at least nested functions, and recursion; a garbage collector or arena is required if you allocate.

Pipeline: lexer, parser with diagnostics, resolver and type checker, desugaring to a core, lowering to your own three-address IR in SSA form, an optimization pipeline (at minimum constant propagation, dead code elimination, local value numbering and one loop optimization), and a back end with instruction selection and register allocation (or emission of LLVM IR / WebAssembly that a real toolchain finishes). The runtime provides printing, allocation and, if you emit native code, a collector.

Evaluate it. Your 30-program corpus from module 3 must produce identical output under the interpreter and the compiled binaries. Write at least five benchmark programs (recursion, loops over arrays, string building, allocation-heavy, a small interpreter in your language) and report run time for interpreter, unoptimized compiled code, and each optimization added cumulatively. Compare against the same programs in C at -O2 and explain the gap. Finally, write a design document in the style of a compiler paper: language, architecture, IR design, each pass with a before/after example, the evaluation, and the limitations.`,
    deliverables: [
      'Git repository with the compiler, runtime, test corpus and benchmark scripts, and a README that shows how to compile and run a program from scratch',
      'All corpus programs produce identical output from the interpreter and from compiled code; CI runs the corpus and the fuzzers',
      'An optimization report: a table of benchmark times with each pass enabled cumulatively, and a plot',
      'A 6-10 page design document with IR examples before and after each pass and a discussion of what you would do differently',
    ],
    estimatedHours: 60,
    stretchGoals: [
      'Add closures with escape analysis so non-escaping closures are stack-allocated',
      'Implement a generational garbage collector and measure pause times on an allocation benchmark',
      'Self-host: write the compiler in its own language and compile it with itself',
      'Emit DWARF line tables so gdb can step through your language source',
    ],
  },
  masteryChecklist: [
    'I can write a lexer and a parser (recursive descent and Pratt) for a new language from a grammar in a day, with good error messages',
    'I can compute FIRST/FOLLOW sets, build an LR automaton by hand and read a parser generator\'s conflict report',
    'I can write typing rules for a language and implement a bidirectional checker and Hindley-Milner inference',
    'I can lower an AST to a three-address IR, build a control-flow graph and convert it to SSA form',
    'I can state the dataflow framework and implement liveness, reaching definitions and constant propagation as instances of it',
    'I can implement local value numbering, dead code elimination, LICM and inlining, and measure what each buys',
    'I can generate x86-64 or RISC-V code with a correct calling convention and a graph-colouring or linear-scan register allocator',
    'I can explain and implement a mark-sweep garbage collector and reason about the trade-offs of copying and generational collectors',
    'I can implement closures via upvalues or closure conversion in both an interpreter and a compiler',
    'I have built a working compiler for a small language to a real target and measured its performance',
  ],
});
