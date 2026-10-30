import { defineSubject } from '../define';

export default defineSubject({
  id: 'systems-programming',
  title: 'Systems Programming in C and Rust',
  category: 'cs',
  tagline:
    'Write programs that talk directly to the machine and the operating system: C from first principles, the Unix toolchain and system calls, then Rust for memory safety without a garbage collector.',
  description: `Systems programming is writing the software that other software runs on: shells, servers, libraries, interpreters, drivers and the tools that build them. It demands a precise mental model of memory, of the process the operating system gives you, and of what the compiler does to your code. C is the language in which that model is most exposed, which is why it remains the lingua franca of operating systems and embedded devices; Rust is the modern language that keeps the same model but makes the compiler enforce it.

This subject teaches both, in that order. The C half follows Jens Gustedt's free *Modern C* and Beej's Guide to C, with labs drawn from CMU 15-213 (CS:APP) and the University of Illinois CS 341 coursebook: you will write a memory allocator, read the output of the compiler and linker, debug with gdb and the sanitizers, and drive files, processes, signals and pipes through the Unix system-call interface. A module on performance and undefined behaviour explains what the C standard actually promises and how to measure what your code does.

The Rust half uses *The Rust Programming Language* book, Rustlings and Rust by Example to teach ownership, borrowing and lifetimes as a disciplined version of what you learned in C, and shows how that discipline makes concurrency safe. The capstone is a Unix shell written twice, in C and in Rust, benchmarked against each other and against your system's shell.`,
  difficulty: 'intermediate',
  estimatedHours: 80,
  prerequisites: ['programming-fundamentals', 'computer-architecture'],
  recommendedBackground: [
    'A Unix-like environment: Linux, macOS, or WSL2 on Windows',
    'Comfort with a terminal and a text editor',
    'Binary, hex and two\'s complement from the computer architecture subject',
  ],
  tags: ['C', 'Rust', 'Unix', 'memory', 'toolchain', 'system calls', 'concurrency'],
  core: false,
  modules: [
    {
      slug: 'c-fundamentals',
      title: 'C Fundamentals',
      description:
        'The C compilation model, the type system and operators with their exact rules, functions, arrays and strings, and structs, enums and the preprocessor: enough C to read real code and write careful code.',
      lessons: [
        {
          slug: 'the-c-compilation-model-and-hello-world',
          title: 'The C compilation model and your first programs',
          summary:
            'What happens between a .c file and a running executable (preprocess, compile, assemble, link), setting up a compiler with warnings on, and the shape of a C program.',
          estimatedMinutes: 90,
          objectives: [
            'Describe the four stages from source to executable and run each with gcc or clang flags',
            'Set up a compiler with -Wall -Wextra -g and explain why warnings are not optional',
            'Write, compile and run small C programs that read input and print output with printf and scanf',
            'Explain what main returns, how arguments arrive, and what the C standard library is',
          ],
          concepts: [
            'Preprocessor, compiler, assembler, linker',
            'Translation unit and header files',
            'gcc/clang flags: -Wall -Wextra -g -O2 -std=c17',
            'main, argc/argv and the exit status',
            'The standard library (libc) and #include',
            'printf format specifiers and the danger of mismatches',
            'Statically typed, compiled, no runtime checks',
          ],
          explanation: `C is small: the whole language fits in a hundred pages, and its library is a thin veneer over the operating system. What makes it hard is that it promises you nothing at runtime. There is no bounds checking, no garbage collector and no exceptions; the compiler translates your text into machine instructions and the hardware does exactly what they say.

A C program goes through **four stages**. The **preprocessor** (\`gcc -E\`) handles lines starting with \`#\`: it pastes in header files and expands macros, producing one big text file. The **compiler** proper (\`gcc -S\`) turns that into assembly for your CPU. The **assembler** (\`gcc -c\`) turns assembly into an object file of machine code with unresolved references. The **linker** combines object files and libraries into an executable. Run each stage yourself once; it makes later error messages ("undefined reference to", "implicit declaration of") intelligible, because you will know which stage is complaining.

From the first day, compile with warnings on: \`gcc -std=c17 -Wall -Wextra -g -o prog prog.c\`. C compilers accept a great deal of wrong code silently; warnings are the only safety net you have before the sanitizers of module 3. \`-g\` includes debugging information so gdb can show you source lines.

A program starts at \`int main(int argc, char *argv[])\`: \`argc\` is the number of command-line words and \`argv\` an array of strings, \`argv[0]\` being the program name. The return value of \`main\` becomes the process's **exit status**, which the shell can test (\`echo $?\`); 0 means success. Output goes through \`printf\`, whose format string must match the argument types exactly: \`%d\` for int, \`%ld\` for long, \`%zu\` for size_t, \`%f\` for double, \`%s\` for a string, \`%p\` for a pointer. A mismatch is undefined behaviour, and \`-Wall\` catches most of them. Input via \`scanf\` is error-prone; prefer \`fgets\` plus parsing, as Beej's guide recommends.

Read the first chapters of *Modern C* (level 0) and Beej's Guide to C chapters 1-3, and write the exercises. Keep every program you write in a git repository; you will reuse them.`,
          resources: [
            {
              title: 'Modern C (Jens Gustedt) — free PDF, Level 0: Encounter',
              url: 'https://gustedt.gitlabpages.inria.fr/modern-c/',
              type: 'textbook',
              cost: 'free',
              provider: 'Jens Gustedt / Manning',
              note: 'The primary C text for this subject. Level 0 covers getting started and the compilation model.',
              primary: true,
            },
            {
              title: "Beej's Guide to C Programming",
              url: 'https://beej.us/guide/bgc/',
              type: 'textbook',
              cost: 'free',
              provider: 'Brian "Beej" Hall',
              note: 'Chapters 1-3: a friendlier introduction; read alongside Modern C.',
            },
            {
              title: 'The C Programming Language, 2nd ed. (Kernighan and Ritchie)',
              url: 'https://en.wikipedia.org/wiki/The_C_Programming_Language',
              type: 'textbook',
              cost: 'paid',
              provider: 'Prentice Hall',
              note: 'The classic (paid); describes C89, so prefer Modern C (free) for current practice. Its exercises remain excellent.',
            },
            {
              title: 'Compiler Explorer',
              url: 'https://godbolt.org/',
              type: 'interactive',
              cost: 'free',
              provider: 'Matt Godbolt',
              note: 'Use it to see the assembly stage of the pipeline for any snippet.',
            },
          ],
          exercises: [
            {
              slug: 'four-stages',
              title: 'Run the four stages by hand',
              prompt:
                'Write hello.c that prints "Hello, <name>" using argv[1] (or "world" if absent). Run gcc -E, -S, -c and the final link as four separate commands, inspect each output (count the lines of the preprocessed file; find main in the .s file; run nm on the .o file and identify the undefined symbol), and write a paragraph on what each stage added.',
              kind: 'coding',
              difficulty: 1,
            },
            {
              slug: 'warnings-hunt',
              title: 'Let the compiler find your bugs',
              prompt:
                'Write a program containing these five mistakes: printf("%d", 3.5); an unused variable; a function used before declaration; comparing a signed int with an unsigned; a missing return in a non-void function. Compile without flags, then with -Wall -Wextra, then with -Wall -Wextra -Werror. Record which mistakes each setting catches and fix them all.',
              kind: 'coding',
              difficulty: 1,
            },
            {
              slug: 'temperature-table',
              title: 'A table-printing program with exit codes',
              prompt:
                'Write a program that takes a start, end and step temperature in Celsius from argv, validates them (printing a usage message and returning exit status 2 on bad input), and prints a neatly aligned Fahrenheit table with %8.1f formatting. Test the exit code from the shell with echo $? for good and bad inputs.',
              kind: 'coding',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'Which stage reports "undefined reference to foo" and what does it mean?',
              answerOutline:
                'The linker: the compiler accepted a call to foo (declared or implicitly declared) but no object file or library defines it.',
            },
            {
              question: 'Why compile with -Wall -Wextra from the beginning?',
              answerOutline:
                'C has no runtime checks; many errors (format mismatches, sign comparisons, missing returns) are legal-looking code that the compiler can flag only as warnings.',
            },
            {
              question: 'What does the return value of main become and how do you observe it?',
              answerOutline:
                'The process exit status; in the shell, echo $? after running the program. 0 means success by convention.',
            },
          ],
        },
        {
          slug: 'types-operators-and-control-flow',
          title: 'Types, operators and control flow',
          summary:
            'C\'s integer and floating types and their exact sizes, implicit conversions, the operators and their precedence, and the control-flow statements with their pitfalls.',
          estimatedMinutes: 120,
          objectives: [
            'Choose the correct integer type (int, long, size_t, uint32_t) for a purpose and state its guaranteed range',
            'Predict the result of mixed-type expressions using the integer promotion and conversion rules',
            'Use the bitwise, logical, shift and assignment operators correctly and know the precedence traps',
            'Write loops and switch statements idiomatically and avoid classic off-by-one and fallthrough errors',
          ],
          concepts: [
            'char, short, int, long, long long and their minimum ranges',
            'Fixed-width types in <stdint.h>: uint8_t, int32_t, uintptr_t',
            'size_t, ptrdiff_t and why sizes are unsigned',
            'Integer promotion and the usual arithmetic conversions',
            'Operator precedence: == vs &, and the assignment-in-condition trap',
            'Short-circuit evaluation of && and ||',
            'switch fallthrough and break',
            'for/while/do-while and the comma operator',
          ],
          explanation: `C's types map onto machine words, but the standard only guarantees **minimum** sizes: \`char\` is at least 8 bits, \`short\` and \`int\` at least 16, \`long\` at least 32, \`long long\` at least 64. On every mainstream 64-bit system today \`int\` is 32 bits and \`long\` is 64 on Linux but 32 on Windows. When the width matters, use the **fixed-width** types from \`<stdint.h>\`: \`uint8_t\`, \`int32_t\`, \`uint64_t\`. Use \`size_t\` (unsigned, pointer-sized) for sizes and array indices, because that is what \`sizeof\` and the library return, and \`ptrdiff_t\` for differences of pointers.

Mixing types triggers **implicit conversions** that follow the rules you met in the computer-architecture data-representation module: anything narrower than \`int\` is promoted to \`int\` before arithmetic; when signed meets unsigned of the same width, the signed value is converted to unsigned. The consequence that bites most often: \`for (size_t i = n - 1; i >= 0; i--)\` never terminates, because an unsigned \`i\` is always $\\geq 0$. Write \`for (size_t i = n; i-- > 0;)\` instead.

**Precedence** has two famous traps. Comparison binds tighter than bitwise operators, so \`x & MASK == 0\` parses as \`x & (MASK == 0)\`; always parenthesise bitwise tests. And \`if (x = 5)\` is an assignment that is always true; \`-Wall\` warns, and some people write \`5 == x\` to make the typo a compile error. The logical operators \`&&\` and \`||\` **short-circuit**: the right side is not evaluated if the left decides the result, which is how \`p != NULL && p->x > 0\` is safe.

Control flow is familiar from Python, with three differences. A **switch** falls through from one case into the next unless you \`break\`; forgetting this is a classic bug (and occasionally a deliberate idiom you must comment). There is no range loop; the \`for (init; cond; step)\` form is explicit. And an \`if\` without braces controls exactly one statement, which is how the Apple "goto fail" bug happened; use braces always.

Work through *Modern C* level 1 chapters 3-5 and Beej chapters 4-7, then the exercises, which are designed to make you predict before you run.`,
          resources: [
            {
              title: 'Modern C (Jens Gustedt) — Level 1: Acquaintance (chapters on control flow, expressing computations, basic values and data)',
              url: 'https://gustedt.gitlabpages.inria.fr/modern-c/',
              type: 'textbook',
              cost: 'free',
              provider: 'Jens Gustedt',
              primary: true,
            },
            {
              title: "Beej's Guide to C — Variables, statements, functions and types",
              url: 'https://beej.us/guide/bgc/',
              type: 'textbook',
              cost: 'free',
              provider: 'Brian "Beej" Hall',
            },
            {
              title: 'CMU 15-213 lecture slides: Bits, Bytes and Integers',
              url: 'https://www.cs.cmu.edu/~213/',
              type: 'lecture',
              cost: 'free',
              provider: 'Carnegie Mellon University',
              note: 'The conversion rules with worked examples, if the architecture subject is not fresh.',
            },
          ],
          exercises: [
            {
              slug: 'predict-the-output',
              title: 'Predict the output, then run',
              prompt:
                'For each of the following, write your predicted output before compiling: (1) unsigned u = 0; printf("%d", u - 1 > 0); (2) char c = 200; printf("%d", c); (3) printf("%d", 7 & 3 == 3); (4) int i = 10; while (i --> 0) printf("%d ", i); (5) switch(2){case 1: puts("a"); case 2: puts("b"); case 3: puts("c");}; (6) printf("%zu %zu", sizeof(int), sizeof 3.0). Explain every surprise using the conversion and precedence rules.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'count-down-loops',
              title: 'Reverse iteration over size_t',
              prompt:
                'Write a function that prints an array of doubles in reverse using a size_t index. First write the naive i >= 0 version and observe (under -fsanitize=address) what happens; then write two correct versions (the i-- > 0 idiom and a pointer-based loop). Add a test with n = 0.',
              kind: 'coding',
              difficulty: 1,
            },
            {
              slug: 'mini-calculator',
              title: 'An RPN calculator with switch',
              prompt:
                'Write a Reverse Polish Notation calculator that reads tokens from argv (e.g. ./rpn 3 4 + 2 "*"), uses a switch on the operator character with explicit fallthrough for nothing, supports + - * / and detects stack underflow and division by zero with distinct exit codes. Use long long for values and check for overflow on multiplication using __builtin_mul_overflow.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does for (size_t i = n - 1; i >= 0; i--) loop forever?',
              answerOutline:
                'size_t is unsigned, so i >= 0 is always true; decrementing 0 wraps to SIZE_MAX.',
            },
            {
              question: 'What does x & MASK == 0 actually compute?',
              answerOutline:
                'x & (MASK == 0): the comparison binds tighter, yielding x & 0 or x & 1. Parenthesise: (x & MASK) == 0.',
            },
            {
              question: 'What is a fixed-width type and when should you prefer it to int?',
              answerOutline:
                'uintN_t/intN_t from <stdint.h> have exactly N bits. Use them for file formats, protocols, hardware registers and bit manipulation where width matters; int for ordinary counting.',
            },
          ],
        },
        {
          slug: 'functions-arrays-and-strings',
          title: 'Functions, arrays and strings',
          summary:
            'Pass-by-value, how arrays decay to pointers at function boundaries, C strings as NUL-terminated char arrays, and the string library and its sharp edges.',
          estimatedMinutes: 120,
          objectives: [
            'Write functions with prototypes and explain pass-by-value and how to return multiple results',
            'Explain why an array parameter is really a pointer and why sizeof fails inside the callee',
            'Manipulate C strings correctly: length, copy, compare, tokenise, always with bounds in mind',
            'Avoid buffer overflows by using sized functions (snprintf, strncpy-with-care, fgets) and explicit lengths',
          ],
          concepts: [
            'Prototypes and header declarations',
            'Pass-by-value; out-parameters via pointers',
            'Array decay to pointer; sizeof(arr)/sizeof(arr[0]) idiom',
            'Multi-dimensional arrays and row-major layout',
            'NUL-terminated strings; strlen is O(n)',
            'String library: strcpy, strncpy, strcmp, strchr, strtok, snprintf',
            'Buffer overflow and why gets() was removed',
            'const correctness',
          ],
          explanation: `C passes every argument **by value**: the callee gets a copy. To let a function modify the caller's variable, pass its address and dereference (\`void inc(int *p) { (*p)++; }\`). This is also how C returns more than one result: out-parameters. Declare every function with a **prototype** before use, usually in a header, so the compiler can check argument types; an implicit declaration is an error in modern C.

**Arrays** are the odd ones out. An array name used in an expression **decays** into a pointer to its first element, so a function declared \`int sum(int a[], size_t n)\` really receives \`int *a\`; inside the function \`sizeof(a)\` is the size of a pointer, not of the array, which is why every array-handling function takes an explicit length. The caller computes it with \`sizeof(arr) / sizeof(arr[0])\`, which works only where \`arr\` is the actual array. A 2-D array \`int m[3][4]\` is twelve contiguous ints in row-major order, and a function taking it must know the column count: \`void f(int m[][4], size_t rows)\`.

A **C string** is just a \`char\` array whose end is marked by a zero byte, \`'\\0'\`. There is no length field; \`strlen\` walks to the NUL, so calling it in a loop condition makes the loop quadratic. The library's \`strcpy\`, \`strcat\` and \`sprintf\` trust that the destination is big enough, and when it is not you get a **buffer overflow**, the bug behind decades of security exploits. Use the sized variants, with care: \`snprintf(buf, sizeof buf, ...)\` always NUL-terminates and returns the length it wanted, \`strncpy\` does **not** terminate if the source is too long, and \`fgets\` for input keeps the newline. \`strtok\` modifies its input and keeps hidden state; prefer \`strtok_r\` or write your own splitter.

Mark pointers to data you will not modify as \`const char *\`; the compiler then catches accidental writes, and it documents intent. Read *Modern C* chapters 6-8 and Beej chapters 6, 8 and the string chapter, then write the exercises with \`-fsanitize=address\` on so that every overflow is reported immediately.`,
          resources: [
            {
              title: 'Modern C (Jens Gustedt) — Derived data types, functions, C library functions',
              url: 'https://gustedt.gitlabpages.inria.fr/modern-c/',
              type: 'textbook',
              cost: 'free',
              provider: 'Jens Gustedt',
              primary: true,
            },
            {
              title: "Beej's Guide to C — Arrays, strings, functions, and the string library chapters",
              url: 'https://beej.us/guide/bgc/',
              type: 'textbook',
              cost: 'free',
              provider: 'Brian "Beej" Hall',
            },
            {
              title: 'man 3 string — overview of string functions',
              url: 'https://man7.org/linux/man-pages/man3/string.3.html',
              type: 'documentation',
              cost: 'free',
              provider: 'man7.org',
              note: 'Read the BUGS and NOTES sections of strcpy(3), strncpy(3) and strtok(3) too.',
            },
          ],
          exercises: [
            {
              slug: 'string-library-reimplementation',
              title: 'Reimplement the string library',
              prompt:
                'Write my_strlen, my_strcpy, my_strncpy, my_strcmp, my_strchr and my_strcat with the exact semantics of the standard versions (including strncpy\'s padding and non-termination). Test each against the libc version on 10,000 random strings including empty strings and strings of length exactly n. Then write a safer alternative, my_strlcpy, that always terminates and returns the source length.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'word-frequency',
              title: 'Word frequency counter',
              prompt:
                'Write a program that reads lines with fgets, splits them into words on whitespace and punctuation (your own splitter, not strtok), and prints the 10 most frequent words with counts. Store words in a fixed array of 1000 entries of char[32] first; then make it report an error instead of overflowing when either limit is exceeded. Run it on a large text (e.g. a Project Gutenberg book) under -fsanitize=address.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'matrix-functions',
              title: '2-D arrays across function boundaries',
              prompt:
                'Write functions to fill, transpose (in place, square) and print an int matrix, declared with a fixed column count, and a second version using a flat int* with explicit rows and cols. Verify both on 4x4 and (flat only) 3x5 matrices. Explain in comments why the fixed-column version cannot handle 3x5.',
              kind: 'coding',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does sizeof(arr) give the wrong answer inside a function that received arr as a parameter?',
              answerOutline:
                'The parameter is a pointer (the array decayed at the call), so sizeof gives the pointer size (8 on 64-bit), not the array size.',
            },
            {
              question: 'What is dangerous about strncpy(dst, src, n)?',
              answerOutline:
                'If strlen(src) >= n, dst is not NUL-terminated; subsequent string functions read past the buffer. snprintf or an explicit terminator is safer.',
            },
            {
              question: 'How do you return two values from a C function?',
              answerOutline:
                'Pass pointers to caller variables as out-parameters, or return a struct.',
            },
          ],
        },
        {
          slug: 'structs-enums-and-the-preprocessor',
          title: 'Structs, enums, unions and the preprocessor',
          summary:
            'Aggregating data with structs, naming constants with enums, the preprocessor for headers, macros and conditional compilation, and organising a multi-file C program.',
          estimatedMinutes: 120,
          objectives: [
            'Define and use structs (by value and by pointer), typedefs and nested structs',
            'Use enums for named constants and unions for variant data with a tag',
            'Write header files with include guards and explain the declaration/definition distinction',
            'Write function-like macros safely and know when an inline function is better',
          ],
          concepts: [
            'struct, member access with . and ->',
            'typedef and opaque types',
            'enum and tagged unions',
            'Declaration vs definition; extern; static linkage',
            'Header files and include guards / #pragma once',
            '#define constants and function-like macros; parenthesisation',
            'Conditional compilation (#ifdef, #if) and feature macros',
            'Designated initialisers and compound literals (C99)',
          ],
          explanation: `A **struct** groups fields into one value with a fixed layout (the computer-architecture subject covered padding and alignment). Structs are values: assigning one copies all its bytes, passing one to a function copies it, and returning one from a function is fine. For large structs or when the callee must modify the original, pass a pointer and use \`p->field\`. A \`typedef struct point { int x, y; } point;\` lets you write \`point\` instead of \`struct point\`. C99 **designated initialisers**, \`point p = { .x = 1, .y = 2 };\`, are clearer and safer than positional ones, and a **compound literal**, \`(point){ .x = 1 }\`, builds a temporary.

An **enum** is a set of named integer constants; it documents intent and lets the compiler warn about unhandled cases in a \`switch\`. A **union** stores one of several types in the same bytes; it is useful only with a **tag** (an enum field in an enclosing struct) that records which member is live. This tagged-union pattern is how C expresses what Rust calls an enum with data; you will see it again in module 6.

A multi-file program is organised with **headers**. A header contains **declarations** (function prototypes, struct definitions, \`extern\` variables, typedefs) and is included by every file that needs them; exactly one \`.c\` file contains each **definition**. Wrap every header in an **include guard** so double inclusion is harmless. Functions and globals that are private to one file should be \`static\`, which gives them internal linkage and avoids name clashes. A powerful idiom is the **opaque type**: the header declares \`typedef struct stack stack;\` and functions on \`stack *\`, while the struct body lives in the \`.c\` file; callers cannot touch the internals.

The **preprocessor** is textual substitution and must be treated with suspicion. \`#define SQUARE(x) x*x\` breaks on \`SQUARE(a+1)\`; always parenthesise parameters and the whole body: \`((x)*(x))\`. Even then \`SQUARE(i++)\` increments twice. Prefer \`static inline\` functions for anything with logic, and macros for constants, conditional compilation (\`#ifdef DEBUG\`), and the few things functions cannot do, such as stringising with \`#\`. Read *Modern C* chapters 6, 9 and 10, then build a small multi-file project.`,
          resources: [
            {
              title: 'Modern C (Jens Gustedt) — Derived data types; Preprocessor; Code organisation',
              url: 'https://gustedt.gitlabpages.inria.fr/modern-c/',
              type: 'textbook',
              cost: 'free',
              provider: 'Jens Gustedt',
              primary: true,
            },
            {
              title: "Beej's Guide to C — Structs, typedef, the preprocessor, multifile projects",
              url: 'https://beej.us/guide/bgc/',
              type: 'textbook',
              cost: 'free',
              provider: 'Brian "Beej" Hall',
            },
            {
              title: 'C11 standard draft N1570 — section 6.10 (preprocessing directives)',
              url: 'https://www.open-std.org/jtc1/sc22/wg14/www/docs/n1570.pdf',
              type: 'documentation',
              cost: 'free',
              provider: 'ISO/IEC',
              note: 'For the exact macro expansion rules when a macro misbehaves.',
            },
          ],
          exercises: [
            {
              slug: 'tagged-union-shapes',
              title: 'Tagged unions for shapes',
              prompt:
                'Define a shape type as a struct with an enum tag (CIRCLE, RECT, TRIANGLE) and a union of per-shape data. Write area() and perimeter() with switch statements that the compiler checks for completeness (-Wswitch-enum), and a print function. Test with an array of mixed shapes and compare total area with a hand calculation.',
              kind: 'coding',
              difficulty: 1,
            },
            {
              slug: 'opaque-stack-library',
              title: 'An opaque stack library in three files',
              prompt:
                'Create stack.h (opaque typedef and prototypes: stack_new, stack_push, stack_pop, stack_size, stack_free), stack.c (the struct definition and implementation on a fixed-capacity int array) and main.c (tests). Verify that main.c cannot access the struct fields (show the compiler error). Compile the three with a single gcc command and then with separate -c steps and a link.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'macro-pitfalls',
              title: 'Macro pitfalls, demonstrated',
              prompt:
                'Write #define SQUARE(x) x*x and #define MAX(a,b) a > b ? a : b. Show inputs for which each gives wrong results, show gcc -E output to explain why, then fix them with full parenthesisation and show that SQUARE(i++) is still wrong. Rewrite both as static inline functions and confirm identical -O2 assembly in Compiler Explorer.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What is the difference between a declaration and a definition, and where does each go?',
              answerOutline:
                'A declaration states a name and type (prototypes, extern) and may appear many times, typically in headers; a definition allocates storage or provides the body, exactly once, in a .c file.',
            },
            {
              question: 'Why must a union be accompanied by a tag?',
              answerOutline:
                'The union does not record which member was last written; reading the wrong member reinterprets bytes. A tag field records the live member.',
            },
            {
              question: 'Why is #define SQUARE(x) ((x)*(x)) still unsafe?',
              answerOutline:
                'The argument is substituted textually, so an argument with side effects (i++) is evaluated twice. An inline function evaluates it once.',
            },
          ],
        },
      ],
    },
    {
      slug: 'pointers-and-memory',
      title: 'Pointers and Memory',
      description:
        'The heart of C: addresses and pointers, dynamic allocation and its failure modes, the layout of a running process, and building real data structures by hand, culminating in your own malloc.',
      lessons: [
        {
          slug: 'pointers-and-addresses',
          title: 'Pointers and addresses',
          summary:
            'What a pointer is at the machine level, pointer arithmetic and its relation to arrays, pointers to pointers and to functions, and the rules that keep pointer code correct.',
          estimatedMinutes: 150,
          objectives: [
            'Explain a pointer as a typed address and read declarations like int *(*f)(char **)',
            'Perform pointer arithmetic and explain why p + 1 advances by sizeof(*p)',
            'Use pointers to pointers for output parameters and for arrays of strings (argv)',
            'Use function pointers for callbacks (qsort) and simple dispatch tables',
          ],
          concepts: [
            'Address-of (&) and dereference (*)',
            'Pointer types and sizeof(*p) scaling',
            'NULL and the null pointer dereference',
            'Pointer arithmetic and the one-past-the-end rule',
            'a[i] is *(a + i)',
            'Pointers to pointers (char **argv)',
            'Function pointers and callbacks',
            'const pointers vs pointers to const; void *',
          ],
          explanation: `A **pointer** is a variable holding an address, together with a type that says what lives there. \`int *p = &x;\` stores the address of \`x\`; \`*p\` reads or writes the \`int\` at that address. The type matters because of **pointer arithmetic**: \`p + 1\` is not the next byte but the next \`int\`, that is, \`sizeof(int)\` bytes further. This is why \`a[i]\` is defined as \`*(a + i)\` and why, amusingly, \`i[a]\` compiles. Subtracting two pointers into the same array gives the element count between them (a \`ptrdiff_t\`).

The standard permits arithmetic only within an array and up to **one past the end**; a pointer may point one past the last element (useful as a loop bound) but must not be dereferenced there, and pointing further is undefined even if you never dereference it. **NULL** is the pointer that points nowhere; dereferencing it crashes on every modern OS, and testing for it is the first line of every function that takes a pointer that might be absent.

Declarations read inside-out: \`int *a[3]\` is an array of three pointers to int; \`int (*a)[3]\` is a pointer to an array of three ints; \`int (*f)(int)\` is a pointer to a function taking and returning int. The cdecl website explains any declaration. \`const int *p\` is a pointer to a const int (you cannot write through it); \`int *const p\` is a const pointer (you cannot repoint it). \`void *\` is a generic pointer that any object pointer converts to and from, used by \`malloc\` and \`qsort\`; it cannot be dereferenced or used in arithmetic.

**Pointers to pointers** appear when a function must change the caller's pointer (\`int parse(char **cursor)\`) and in \`char **argv\`, an array of strings. **Function pointers** make C extensible: \`qsort\` takes a comparison function; a table of function pointers indexed by an opcode is how interpreters and drivers dispatch.

Read *Modern C* chapter 11 and Beej's pointer chapters, draw box-and-arrow diagrams for every exercise, and use \`%p\` prints to confirm your drawings against reality.`,
          resources: [
            {
              title: 'Modern C (Jens Gustedt) — chapter 11: Pointers',
              url: 'https://gustedt.gitlabpages.inria.fr/modern-c/',
              type: 'textbook',
              cost: 'free',
              provider: 'Jens Gustedt',
              primary: true,
            },
            {
              title: "Beej's Guide to C — Pointers, Pointers II and Pointers III chapters",
              url: 'https://beej.us/guide/bgc/',
              type: 'textbook',
              cost: 'free',
              provider: 'Brian "Beej" Hall',
              note: 'Covers pointer arithmetic, pointers to pointers and function pointers with diagrams.',
            },
            {
              title: 'UIUC CS 341 System Programming coursebook — C programming chapter',
              url: 'https://github.com/illinois-cs241/coursebook',
              type: 'textbook',
              cost: 'free',
              provider: 'University of Illinois',
              note: 'The "C Crash Course" and pointer gotchas sections with many small examples.',
            },
          ],
          exercises: [
            {
              slug: 'pointer-drawings',
              title: 'Draw it, then print it',
              prompt:
                'For the program: int a[4] = {10,20,30,40}; int *p = a + 1; int **pp = &p; draw the memory diagram, then predict and print: *p, p[1], *(p-1), **pp, (*pp)[2], p - a, (char*)p - (char*)a, and sizeof(a)/sizeof(*a). Print addresses with %p and confirm the spacing equals sizeof(int).',
              kind: 'coding',
              difficulty: 1,
            },
            {
              slug: 'qsort-and-callbacks',
              title: 'Sorting with function pointers',
              prompt:
                'Write a program that reads up to 1000 lines into a char*[] and sorts them with qsort using three comparators: lexicographic, by length then lexicographic, and case-insensitive. Then write a tiny dispatch table: an array of {const char *name; int (*fn)(int,int);} entries mapping "add", "sub", "mul" to functions, and use it to evaluate argv[1] argv[2] argv[3].',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'parse-with-cursor',
              title: 'A parser that advances a caller\'s pointer',
              prompt:
                'Write bool parse_int(const char **cursor, long *out) that skips whitespace, parses an optional sign and digits, advances *cursor past what it consumed, and returns false without moving on failure. Use it to parse "12 -7 x 5" and show that the caller can report the position of the failure. Add overflow detection.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'If p is an int* and sizeof(int) is 4, what is (char*)(p + 2) - (char*)p?',
              answerOutline: '8: pointer arithmetic scales by the pointee size, so p + 2 is 8 bytes ahead.',
            },
            {
              question: 'What is the difference between const int *p and int *const p?',
              answerOutline:
                'const int *p: cannot modify *p, can repoint p. int *const p: can modify *p, cannot repoint p.',
            },
            {
              question: 'Why does qsort take a void* comparator and how do you write one for ints?',
              answerOutline:
                'qsort is generic over element type. The comparator casts: const int *a = pa, *b = pb; return (*a > *b) - (*a < *b); (avoid *a - *b, which can overflow).',
            },
          ],
        },
        {
          slug: 'dynamic-memory-and-the-heap',
          title: 'Dynamic memory and the heap',
          summary:
            'malloc, calloc, realloc and free; ownership conventions; the catalogue of heap bugs (leaks, double free, use after free, overflow) and the tools that find them.',
          estimatedMinutes: 150,
          objectives: [
            'Allocate, grow and free memory correctly and check every allocation for failure',
            'State a clear ownership rule for every pointer a function returns or stores',
            'Recognise and fix leaks, double frees, use-after-free and heap overflows',
            'Use AddressSanitizer and Valgrind to find heap bugs and read their reports',
          ],
          concepts: [
            'malloc/calloc/realloc/free and their contracts',
            'Ownership: who frees, and when',
            'Memory leak; double free; use after free; dangling pointer',
            'Heap buffer overflow and metadata corruption',
            'realloc pitfalls (losing the old pointer on failure)',
            'Growable arrays (amortised doubling)',
            'AddressSanitizer and Valgrind memcheck',
            'Why malloc is slow and when to avoid it',
          ],
          explanation: `Stack variables vanish when their function returns, and their size must be known at compile time. For everything else there is the **heap**: \`malloc(n)\` returns a pointer to \`n\` bytes that live until you call \`free\` on that exact pointer. \`calloc\` also zeroes the memory (and checks the multiplication for overflow); \`realloc\` resizes a block, possibly moving it. Every allocation can fail and return \`NULL\`; check it. The idiomatic growable array doubles its capacity with \`realloc\` when full, giving amortised constant-time append, and never writes \`p = realloc(p, ...)\` directly, because on failure that leaks the old block; use a temporary.

The hard part is not the API but **ownership**: for every pointer you must be able to say who is responsible for freeing it and when. Write the rule down in the function's comment ("returns a malloc'd string the caller must free"; "stores a borrowed pointer, caller keeps ownership"). Rust (module 7) makes this discipline a compile-time rule; in C it is a habit you must build now.

The failure modes have names. A **leak** is memory never freed; harmless in a short program, fatal in a server. A **double free** corrupts the allocator's bookkeeping. A **use after free** reads or writes through a **dangling pointer**; the memory may already belong to something else, so the symptom appears far from the cause. A **heap overflow** writes past the end of a block, typically smashing the allocator's metadata stored next to it, so the crash happens inside a later \`malloc\`. Set pointers to \`NULL\` after freeing to turn use-after-free into a clean crash.

You cannot find these by staring. **AddressSanitizer** (\`-fsanitize=address\`) instruments every memory access at compile time, catches overflows, use-after-free and leaks, and reports the allocation and free stack traces; it costs about 2x in speed and should be on for every test run. **Valgrind** does the same on unmodified binaries, more slowly, and finds uninitialised reads too. Learn to read both reports: the line of the bad access, the line where the block was allocated, and the line where it was freed are all there.

Read *Modern C* chapter 13, Beej's manual memory chapter, and the CS 341 memory chapter. Then write code that is wrong on purpose and watch the tools catch it.`,
          resources: [
            {
              title: 'Modern C (Jens Gustedt) — chapter 13: Storage',
              url: 'https://gustedt.gitlabpages.inria.fr/modern-c/',
              type: 'textbook',
              cost: 'free',
              provider: 'Jens Gustedt',
              primary: true,
            },
            {
              title: "Beej's Guide to C — Manual Memory Allocation",
              url: 'https://beej.us/guide/bgc/',
              type: 'textbook',
              cost: 'free',
              provider: 'Brian "Beej" Hall',
            },
            {
              title: 'AddressSanitizer documentation (Clang)',
              url: 'https://clang.llvm.org/docs/AddressSanitizer.html',
              type: 'documentation',
              cost: 'free',
              provider: 'LLVM',
              note: 'Also available in gcc with the same flag. Read the example reports.',
            },
            {
              title: 'Valgrind Quick Start Guide',
              url: 'https://valgrind.org/docs/manual/quick-start.html',
              type: 'documentation',
              cost: 'free',
              provider: 'Valgrind',
            },
            {
              title: 'man 3 malloc',
              url: 'https://man7.org/linux/man-pages/man3/malloc.3.html',
              type: 'documentation',
              cost: 'free',
              provider: 'man7.org',
            },
          ],
          exercises: [
            {
              slug: 'bug-zoo',
              title: 'A zoo of heap bugs',
              prompt:
                'Write five tiny programs, each with one bug: a leak, a double free, a use-after-free, a heap overflow by one byte, and a read of uninitialised malloc memory. Run each under AddressSanitizer and under Valgrind, paste the key lines of each report, and explain which tool caught which bug and how the report identifies the allocation site.',
              kind: 'coding',
              difficulty: 1,
            },
            {
              slug: 'growable-vector',
              title: 'A growable vector with ownership rules',
              prompt:
                'Implement vec_t (data pointer, length, capacity) with vec_init, vec_push (doubling, failure-safe realloc), vec_pop, vec_get and vec_free, for a generic element size. Document the ownership of every pointer in the header. Test: push 10 million ints, measure time with and without doubling (growing by 1), and run under ASan with a leak check.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'read-whole-file',
              title: 'Read a file of unknown size',
              prompt:
                'Write char *read_file(const char *path, size_t *len) that reads an entire file into a malloc\'d buffer by growing it with realloc, NUL-terminates it, and returns NULL on any error (with errno preserved). Test on an empty file, a 1-byte file and a 100 MB file; verify no leaks on every error path by injecting failures (a non-existent path, a directory).',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why is p = realloc(p, n) a bug?',
              answerOutline:
                'If realloc fails it returns NULL and leaves the old block allocated; overwriting p loses the only pointer to it (leak) and the data.',
            },
            {
              question: 'Why does a heap overflow often crash inside a later malloc rather than at the overflow?',
              answerOutline:
                'The overflow corrupts allocator metadata stored adjacent to the block; the allocator only reads it on a later allocation or free.',
            },
            {
              question: 'What does AddressSanitizer report for a use-after-free and why is that enough to fix it?',
              answerOutline:
                'The access location, the stack trace where the block was freed and where it was allocated, so you can see the lifetime mismatch directly.',
            },
          ],
        },
        {
          slug: 'memory-layout-of-a-process',
          title: 'The memory layout of a process',
          summary:
            'Text, data, BSS, heap and stack segments; how the stack frames of function calls work; storage duration and linkage; and what a stack overflow and a segfault actually are.',
          estimatedMinutes: 120,
          objectives: [
            'Draw the address-space layout of a running C program and locate code, globals, heap and stack in it',
            'Explain the stack frame: return address, saved registers, locals, and why returning a pointer to a local is wrong',
            'Classify variables by storage duration (automatic, static, allocated) and linkage',
            'Explain what a segmentation fault is and read /proc/<pid>/maps',
          ],
          concepts: [
            'Segments: text, rodata, data, BSS, heap, stack, shared libraries',
            'Stack frames and the calling convention',
            'Stack overflow (recursion) vs stack buffer overflow',
            'Automatic, static and allocated storage duration',
            'static locals and global initialisation',
            'Virtual addresses and the segfault',
            'ASLR and why addresses differ between runs',
            '/proc/<pid>/maps and pmap',
          ],
          explanation: `Every process gets its own **virtual address space**, which the OS lays out in segments. At the bottom, the **text** segment holds machine code, read-only and executable. Next come **rodata** (string literals, const globals), **data** (initialised globals and statics) and **BSS** (zero-initialised globals, which the loader zeroes without storing them in the file). Above them the **heap** grows upward as \`malloc\` requests more from the OS. Near the top, the **stack** grows downward, one frame per active function call. Shared libraries and \`mmap\` regions sit in between. With **ASLR**, the OS randomises the base of each region, which is why addresses change between runs. Look at it for real: \`cat /proc/self/maps\` prints the live layout.

A **stack frame** is created on every call: the return address is pushed, the callee saves any registers it will overwrite, and space is reserved for locals. On return the frame is popped. Two consequences: locals are gone after return, so returning \`&local\` yields a **dangling pointer** into memory the next call will reuse; and writing past the end of a local array (**stack buffer overflow**) overwrites saved registers and the return address, the mechanism of classic exploits (the Cybersecurity subject goes further). Deep recursion exhausts the stack (typically 8 MB) and crashes with a **stack overflow**.

C classifies every object by **storage duration**: *automatic* (locals, live until the block exits), *static* (globals and \`static\` locals, live for the whole program, zero-initialised by default) and *allocated* (heap). A \`static\` local keeps its value between calls, which is handy and dangerous (not thread-safe). **Linkage** says who can see a name: \`static\` globals are file-private, others are visible to the linker.

A **segmentation fault** is the hardware reporting an access to a virtual address with no mapping or the wrong permission (writing to text, reading an unmapped page); the OS turns it into \`SIGSEGV\`. A NULL dereference faults because page 0 is deliberately unmapped. Read CS:APP's chapter 3 material on procedures (15-213 slides) and the CS 341 chapter, then do the exercises with gdb at hand.`,
          resources: [
            {
              title: 'CMU 15-213 — Machine-Level Programming II: Control, and III: Procedures (slides)',
              url: 'https://www.cs.cmu.edu/~213/',
              type: 'lecture',
              cost: 'free',
              provider: 'Carnegie Mellon University',
              note: 'The stack discipline, frames and the x86-64 calling convention.',
              primary: true,
            },
            {
              title: 'UIUC CS 341 coursebook — Memory and allocators chapter',
              url: 'https://github.com/illinois-cs241/coursebook',
              type: 'textbook',
              cost: 'free',
              provider: 'University of Illinois',
            },
            {
              title: 'man 5 proc — /proc/[pid]/maps',
              url: 'https://man7.org/linux/man-pages/man5/proc.5.html',
              type: 'documentation',
              cost: 'free',
              provider: 'man7.org',
            },
            {
              title: 'CS:APP Labs — Attack Lab',
              url: 'http://csapp.cs.cmu.edu/3e/labs.html',
              type: 'problem-set',
              cost: 'free',
              provider: 'Carnegie Mellon University',
              note: 'Optional but superb: exploit stack buffer overflows on a provided binary to understand frames completely.',
            },
          ],
          exercises: [
            {
              slug: 'print-the-layout',
              title: 'Print your own address space',
              prompt:
                'Write a program with a global initialised int, a global uninitialised int, a const global, a static local, a stack local, a malloc\'d block, a string literal and the function main itself. Print all their addresses with %p, sort them, and match each to a line in /proc/self/maps (print it from the program with fopen). Run twice and explain which addresses change.',
              kind: 'coding',
              difficulty: 1,
            },
            {
              slug: 'stack-frames-in-gdb',
              title: 'Inspect stack frames in gdb',
              prompt:
                'Write a recursive factorial, set a breakpoint at depth 5, and in gdb run bt, info frame, and x/16gx $rsp to see return addresses and saved registers. Identify the return address of each frame and confirm it points into the caller with info symbol. Then measure the maximum recursion depth before a stack overflow and relate it to ulimit -s.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'dangling-local',
              title: 'A dangling pointer to a local',
              prompt:
                'Write a function that returns the address of a local array containing a string, and a caller that prints it immediately and then after calling another function. Observe the corruption, explain it with frame reuse, and show that -fsanitize=address catches it with its stack-use-after-return option. Fix with static storage and with malloc, discussing the trade-offs.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'List the main segments of a process from low to high address and what each holds.',
              answerOutline:
                'Text (code), rodata, data (initialised globals), BSS (zero globals), heap (growing up), mmap/shared libraries, stack (growing down).',
            },
            {
              question: 'Why is returning a pointer to a local variable undefined?',
              answerOutline:
                'The local lives in the function\'s stack frame, which is released on return; the next call reuses that memory.',
            },
            {
              question: 'What exactly is a segmentation fault?',
              answerOutline:
                'A hardware memory-protection exception for accessing an unmapped virtual address or violating page permissions; the OS delivers SIGSEGV.',
            },
          ],
          relatedLessons: ['operating-systems/memory-virtualization/address-spaces-and-memory-api'],
        },
        {
          slug: 'data-structures-in-c',
          title: 'Data structures in C: lists, hash tables and generic code',
          summary:
            'Building linked lists, a hash table and a generic container with void* and function pointers, and the engineering conventions (ownership, error handling, testing) that make C libraries usable.',
          estimatedMinutes: 150,
          objectives: [
            'Implement a singly linked list and a hash table with separate chaining in C, with clear ownership',
            'Write generic containers using void* elements, element size and function-pointer callbacks',
            'Design a C API with consistent error returns, errno usage and documented ownership',
            'Write a unit-test harness in C and run it under sanitizers',
          ],
          concepts: [
            'Intrusive vs non-intrusive linked lists',
            'Pointer-to-pointer list manipulation',
            'Hash table with separate chaining; load factor and resizing',
            'Generic code via void*, sizeof and callbacks',
            'Error conventions: return codes, errno, out-params',
            'Iterator and callback (visitor) patterns',
            'Unit testing in C (assert, minimal frameworks)',
            'Choosing between arrays and linked structures (cache behaviour)',
          ],
          explanation: `C has no containers, so systems programmers build them, and doing so teaches more about memory than any amount of reading. Start with the **singly linked list**: a struct with a value and a \`next\` pointer. Insertion at the head is two lines; deletion in the middle is where the elegance of **pointer-to-pointer** code appears: iterate with \`node **pp = &head\` and, on finding the target, write \`*pp = (*pp)->next\`, which handles the head case and the middle case identically. Study that idiom until it is obvious.

A **hash table** with separate chaining is an array of list heads; a hash function maps a key to a bucket, and the chain is searched. Keep the **load factor** (entries / buckets) under about 0.75 by doubling the bucket array and rehashing. For string keys, FNV-1a is a good simple hash. Decide and document who owns the keys and values: does the table copy strings or keep the caller's pointers?

To make a container **generic**, store elements as bytes: the container takes \`size_t elem_size\` and copies with \`memcpy\`, and callers pass function pointers for comparison, hashing and destruction. That is exactly how \`qsort\` and \`bsearch\` work. It is clumsy next to C++ templates or Rust generics, but it is how every C library does it.

**API conventions** separate usable C libraries from hostile ones: return 0 on success and -1 (or a negative error code) on failure; set \`errno\` or return an enum; never print from a library; every \`_new\` has a \`_free\`; every function documents whether pointers it receives are borrowed or taken over. Test with a minimal harness: a \`TEST(name)\` macro, a counter of failures, and \`assert\`-style checks, all built with \`-fsanitize=address,undefined\`.

Finally, measure. A linked list of a million ints is far slower to traverse than an array because every node is a cache miss (recall the memory hierarchy). Read the CS 341 chapter and *Modern C* chapter 12 (on the C memory model), then build the structures; the module project turns them into an allocator.`,
          resources: [
            {
              title: 'UIUC CS 341 coursebook — C programming and memory chapters (linked lists, void*, function pointers)',
              url: 'https://github.com/illinois-cs241/coursebook',
              type: 'textbook',
              cost: 'free',
              provider: 'University of Illinois',
              primary: true,
            },
            {
              title: 'Modern C (Jens Gustedt) — chapter 12: The C memory model',
              url: 'https://gustedt.gitlabpages.inria.fr/modern-c/',
              type: 'textbook',
              cost: 'free',
              provider: 'Jens Gustedt',
            },
            {
              title: 'man 3 qsort and bsearch',
              url: 'https://man7.org/linux/man-pages/man3/qsort.3.html',
              type: 'documentation',
              cost: 'free',
              provider: 'man7.org',
              note: 'The reference examples of generic C interfaces.',
            },
          ],
          exercises: [
            {
              slug: 'linked-list-pp',
              title: 'Linked list with pointer-to-pointer deletion',
              prompt:
                'Implement a singly linked list of ints with push_front, push_back, remove_all(value) using the node** idiom, reverse (in place), and free. Write tests covering empty list, single element, removing the head, tail and middle, and removing every element. Run under ASan with leak detection. Then count cache misses with perf stat while summing a 10-million-node list vs a 10-million-int array.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'string-hash-table',
              title: 'A string-keyed hash table',
              prompt:
                'Implement a hash table mapping char* keys (copied) to void* values with FNV-1a hashing, separate chaining, and resizing at load factor 0.75. Provide put, get, remove, foreach and free (with an optional value destructor). Test with 1 million random keys: verify all gets, measure average chain length before and after resizing, and compare lookup time with a linear scan of an array of 1000 keys.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'generic-vector-sort',
              title: 'A generic vector with sort and search',
              prompt:
                'Generalise the vector from the previous lesson to arbitrary element sizes (memcpy-based push/get), add vec_sort(cmp) that calls qsort and vec_find(key, cmp) that calls bsearch. Use it with ints, doubles and a struct with a string field, and demonstrate a bug when the comparator does not match the element type, caught by ASan.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does the node** idiom simplify deletion from a linked list?',
              answerOutline:
                'It holds the address of the pointer that refers to the current node (head or previous->next), so unlinking is the same assignment in every case.',
            },
            {
              question: 'What is load factor and why resize a chained hash table?',
              answerOutline:
                'Entries divided by buckets; as it grows chains lengthen and lookups degrade toward O(n). Doubling buckets and rehashing keeps chains short on average.',
            },
            {
              question: 'How does C achieve genericity without templates, and what is lost?',
              answerOutline:
                'void* data plus element size and function-pointer callbacks (as in qsort). Lost: type checking and inlining; mismatched comparators compile silently.',
            },
          ],
        },
      ],
      project: {
        slug: 'write-your-own-malloc',
        title: 'Project: write your own malloc',
        description: `Implement malloc, free, realloc and calloc on top of sbrk or mmap, in the style of the CS:APP Malloc Lab: an implicit free list with headers and footers first, then an explicit free list with coalescing and a first-fit or best-fit policy. Measure throughput and memory utilisation against glibc on allocation traces, and run your allocator under a real program by preloading it with LD_PRELOAD.`,
        deliverables: [
          'mm.c implementing the allocator with a heap consistency checker (mm_check)',
          'A trace-driven test harness reporting utilisation and throughput for at least five traces',
          'A short report comparing implicit vs explicit free lists and your allocator vs glibc, with numbers',
        ],
        estimatedHours: 14,
        stretchGoals: [
          'Add segregated free lists and measure the improvement',
          'Make the allocator thread-safe with a lock and measure contention with 4 threads',
        ],
      },
    },
    {
      slug: 'the-toolchain',
      title: 'The Toolchain',
      description:
        'What the compiler, linker, build system and debugger do: optimisation levels and reading assembly, static and dynamic linking, Make and CMake, and gdb with the sanitizers.',
      lessons: [
        {
          slug: 'compilers-and-flags',
          title: 'The compiler: flags, optimisation and reading its output',
          summary:
            'Optimisation levels and what they change, how to read the assembly the compiler emits for C, and the flags that control standards, warnings and hardening.',
          estimatedMinutes: 120,
          objectives: [
            'Explain what -O0, -O1, -O2, -O3, -Os and -g do and when to use each',
            'Read x86-64 (or ARM64) assembly for simple C functions and map instructions back to source',
            'Recognise common optimisations (inlining, constant folding, loop unrolling, vectorisation, dead code elimination) in the output',
            'Use -std, -W flags, -fsanitize, -fstack-protector and -D defines appropriately',
          ],
          concepts: [
            'Optimisation levels and the debug/optimise trade-off',
            'Reading assembly: registers, calling convention, stack frame',
            'Inlining, constant propagation, dead code elimination',
            'Loop unrolling and auto-vectorisation',
            'Why optimised code is hard to debug',
            'Standards flags (-std=c17) and extensions',
            'Hardening flags: -fstack-protector, -D_FORTIFY_SOURCE, -fPIE',
            'Compiler Explorer workflow',
          ],
          explanation: `A compiler is a program that reads your C and writes assembly, and the best way to understand C is to read what it writes. **Compiler Explorer** (godbolt.org) shows source and assembly side by side with colour-coded correspondence; use it constantly. At **-O0** the output is a literal translation: every variable lives on the stack, every expression loads and stores. At **-O2**, the default for release builds, the compiler keeps values in registers, **inlines** small functions, **folds** constants, eliminates **dead code**, unrolls loops and, at **-O3** or with \`-march=native\`, **vectorises** them with SIMD instructions. \`-Os\` optimises for size, which matters on embedded targets. \`-g\` adds debug information and is independent of optimisation; \`-O2 -g\` is normal, though stepping through optimised code is confusing because variables are gone and statements reordered.

Reading assembly is a learnable skill. For x86-64: arguments arrive in \`rdi, rsi, rdx, rcx, r8, r9\`, the return value in \`rax\`, \`rsp\` is the stack pointer; \`mov\` moves, \`lea\` computes an address (often used for arithmetic), \`call\`/\`ret\` manage the return address, \`cmp\` + \`jcc\` branch. Start with a function that adds two ints, then a loop summing an array, then a struct access; watch how the output changes from -O0 to -O2. The 15-213 machine-level programming lectures teach this methodically.

The optimiser assumes your program has no **undefined behaviour** and will exploit that assumption (module 5 shows how a signed-overflow check gets deleted). This is why code that works at -O0 and breaks at -O2 is almost always buggy code, not a compiler bug.

The remaining flags: \`-std=c17\` selects the standard, \`-pedantic\` warns about extensions, \`-Wall -Wextra -Wconversion -Wshadow\` catch bugs, \`-fsanitize=address,undefined\` instruments test builds, and \`-fstack-protector-strong -D_FORTIFY_SOURCE=2 -fPIE -pie\` harden release builds against exploitation. Learn what each does once and bake them into a Makefile (next lessons).`,
          resources: [
            {
              title: 'Compiler Explorer',
              url: 'https://godbolt.org/',
              type: 'interactive',
              cost: 'free',
              provider: 'Matt Godbolt',
              note: 'The core tool for this lesson; use the "-O2 -g" and "-O0" comparison views.',
              primary: true,
            },
            {
              title: 'CMU 15-213 — Machine-Level Programming I-V (slides and videos)',
              url: 'https://www.cs.cmu.edu/~213/',
              type: 'lecture',
              cost: 'free',
              provider: 'Carnegie Mellon University',
              note: 'The systematic introduction to reading x86-64 assembly produced from C.',
            },
            {
              title: 'GCC manual — Options That Control Optimization',
              url: 'https://gcc.gnu.org/onlinedocs/gcc/Optimize-Options.html',
              type: 'documentation',
              cost: 'free',
              provider: 'GNU',
            },
            {
              title: 'CS:APP Labs — Bomb Lab',
              url: 'http://csapp.cs.cmu.edu/3e/labs.html',
              type: 'problem-set',
              cost: 'free',
              provider: 'Carnegie Mellon University',
              note: 'Defuse a binary bomb by reading its assembly in gdb; the classic exercise for this skill.',
            },
          ],
          exercises: [
            {
              slug: 'o0-vs-o2',
              title: 'Watch the optimiser work',
              prompt:
                'In Compiler Explorer compile at -O0 and -O2: (a) int add(int a,int b){return a+b;} (b) a loop summing an int array of length n; (c) a function computing x*8+x*2; (d) a function with an unreachable branch after return; (e) a small helper called from another function. For each, describe in one or two sentences what the optimiser did (register allocation, strength reduction, dead code elimination, inlining, vectorisation).',
              kind: 'data-analysis',
              difficulty: 1,
            },
            {
              slug: 'bomb-lab',
              title: 'CS:APP Bomb Lab (phases 1-4)',
              prompt:
                'Download the self-study Bomb Lab binary and defuse at least phases 1-4 using gdb and objdump only (no source). Keep a log: for each phase, the key instructions, what you inferred the input format to be, and the breakpoints you used. Phases 5-6 are a stretch.',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'flags-makefile',
              title: 'Build profiles',
              prompt:
                'Write a Makefile with three targets, debug (-O0 -g -fsanitize=address,undefined), release (-O2 -g -DNDEBUG with hardening flags) and small (-Os), for a program of your choice. Compare binary size (size command), run time on a benchmark loop, and whether an injected buffer overflow is detected under each profile.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does code that works at -O0 sometimes break at -O2?',
              answerOutline:
                'Almost always undefined behaviour in the source: the optimiser assumes UB cannot happen and transforms accordingly (e.g. removing checks, reordering).',
            },
            {
              question: 'In which registers do the first two integer arguments and the return value travel on x86-64 (System V)?',
              answerOutline: 'rdi and rsi for arguments; rax for the return value.',
            },
            {
              question: 'What does inlining do and what does it enable?',
              answerOutline:
                'Replaces a call with the callee\'s body, removing call overhead and letting the optimiser specialise the body with the caller\'s constants and eliminate dead paths.',
            },
          ],
        },
        {
          slug: 'linking-and-libraries',
          title: 'Linking, object files and libraries',
          summary:
            'Symbols and relocations in object files, static vs dynamic linking, shared libraries and the dynamic loader, and the errors that come from each.',
          estimatedMinutes: 150,
          objectives: [
            'Inspect object files with nm, objdump and readelf and explain symbols, sections and relocations',
            'Explain static linking (symbol resolution and relocation) and the rules for duplicate symbols',
            'Build and use a static library (.a) and a shared library (.so), and explain position-independent code',
            'Diagnose "undefined reference", "multiple definition" and runtime "cannot open shared object" errors',
          ],
          concepts: [
            'ELF object files: sections (.text, .data, .bss, .rodata, .symtab, .rel)',
            'Symbols: global, local, weak, undefined',
            'Symbol resolution and relocation',
            'Static libraries (ar) and link order',
            'Shared libraries, -fPIC and the dynamic loader (ld.so)',
            'LD_LIBRARY_PATH, rpath, ldd',
            'Lazy binding via PLT/GOT',
            'Library interposition (LD_PRELOAD)',
          ],
          explanation: `The linker's job is simple to state: combine object files into one executable by matching every **undefined symbol** with exactly one **definition** (**symbol resolution**) and patching every address that was not known at compile time (**relocation**). Object files on Linux are **ELF**: \`readelf -S\` shows sections (\`.text\` code, \`.data\` initialised globals, \`.bss\` zero globals, \`.rodata\`), \`nm\` lists symbols with a letter for their kind (T defined in text, U undefined, D data, b local bss), and \`objdump -dr\` shows the code with relocation entries marking the bytes the linker must patch. Run these on your own \`.o\` files until the output is familiar.

Resolution has rules. Strong symbols (functions, initialised globals) may be defined exactly once, or you get "multiple definition". Weak symbols (uninitialised globals in older C, or \`__attribute__((weak))\`) yield to a strong one, a source of silent bugs when two files declare \`int x;\` meaning different things. A **static library** (\`.a\`) is just an archive of object files; the linker pulls in only the members that resolve currently-undefined symbols, scanning left to right, which is why \`-lm\` must come *after* the file that uses \`sin\`.

**Dynamic linking** defers the work to run time. A **shared library** (\`.so\`) is compiled with \`-fPIC\` (position-independent code, since it may be mapped anywhere) and the executable records only its name; the **dynamic loader** \`ld.so\` maps it at program start, searching standard directories, \`rpath\` and \`LD_LIBRARY_PATH\` (\`ldd\` shows what it found). Calls into the library go through the **PLT/GOT** indirection, resolved lazily on first call. The benefits are shared memory pages and updatable libraries; the costs are an indirection per call and the "cannot open shared object file" error when deployment goes wrong. \`LD_PRELOAD\` lets you **interpose** your own definition of any library function, which is how the malloc project gets tested against real programs.

Read Ian Lance Taylor's linker series (the first ten posts) or Levine's chapter 1, and the 15-213 linking lecture, then build the libraries in the exercises and break them on purpose.`,
          resources: [
            {
              title: 'CMU 15-213 — Linking (lecture slides and video)',
              url: 'https://www.cs.cmu.edu/~213/',
              type: 'lecture',
              cost: 'free',
              provider: 'Carnegie Mellon University',
              note: 'CS:APP chapter 7 material: symbol resolution, relocation, static and dynamic linking.',
              primary: true,
            },
            {
              title: 'Linkers (Ian Lance Taylor, 20-part blog series)',
              url: 'https://www.airs.com/blog/archives/38',
              type: 'article',
              cost: 'free',
              provider: 'Ian Lance Taylor',
              note: 'By the author of gold; parts 1-10 cover everything in this lesson.',
            },
            {
              title: 'Linkers and Loaders (John R. Levine), free online',
              url: 'https://www.iecc.com/linker/',
              type: 'textbook',
              cost: 'free',
              provider: 'John R. Levine',
            },
            {
              title: 'Load-time relocation of shared libraries (Eli Bendersky)',
              url: 'https://eli.thegreenplace.net/2011/08/25/load-time-relocation-of-shared-libraries',
              type: 'article',
              cost: 'free',
              provider: 'Eli Bendersky',
              note: 'Followed by the companion post on position-independent code and the GOT/PLT.',
            },
            {
              title: 'man 8 ld.so — dynamic linker/loader',
              url: 'https://man7.org/linux/man-pages/man8/ld.so.8.html',
              type: 'documentation',
              cost: 'free',
              provider: 'man7.org',
            },
          ],
          exercises: [
            {
              slug: 'inspect-object-files',
              title: 'Dissect an object file',
              prompt:
                'Write util.c (two functions, a global, a static function, a string literal) and main.c calling it. Compile both to .o and run nm, readelf -S and objdump -dr on each. Produce a table: every symbol, its type letter, its section, and whether it is defined or undefined. Point out the relocation entry for the call to a util function and explain what the linker will write there.',
              kind: 'coding',
              difficulty: 1,
            },
            {
              slug: 'static-and-shared-libs',
              title: 'Build the same library both ways',
              prompt:
                'Package your vector and hash table into libds.a (ar rcs) and libds.so (-fPIC -shared). Link a test program against each; compare executable sizes, ldd output, and startup time (measure 1000 runs with a shell loop). Move the .so and demonstrate the runtime error, then fix it with rpath. Finally demonstrate the link-order bug by placing -lds before the object file that uses it.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'ld-preload-interposition',
              title: 'Interpose malloc with LD_PRELOAD',
              prompt:
                'Write a shared library that defines malloc and free, forwards to the real ones via dlsym(RTLD_NEXT, ...), and counts calls and bytes, printing totals at exit. Preload it under ls and under your own programs. Explain why printf inside your malloc can recurse and how you avoided it.',
              kind: 'coding',
              difficulty: 3,
              hint: 'Use a static buffer for early allocations before dlsym returns, and write with write(2), not printf.',
            },
          ],
          selfAssessment: [
            {
              question: 'Why must -lm come after the object files that use it on the gcc command line?',
              answerOutline:
                'The linker scans archives left to right and only pulls members resolving currently undefined symbols; if the archive is seen before the references exist, nothing is extracted.',
            },
            {
              question: 'What does -fPIC do and why do shared libraries need it?',
              answerOutline:
                'Generates position-independent code using PC-relative addressing and the GOT so the library can be mapped at any address in every process without patching its text.',
            },
            {
              question: 'What is the difference between "undefined reference" and "cannot open shared object file"?',
              answerOutline:
                'The first is a link-time symbol resolution failure; the second is the dynamic loader failing to find a .so at run time (search path problem).',
            },
          ],
        },
        {
          slug: 'build-systems-make-and-cmake',
          title: 'Build systems: Make and CMake',
          summary:
            'Dependency-driven builds with Make, automatic header dependencies, pattern rules, and a first CMake project that builds libraries, tests and installs them.',
          estimatedMinutes: 120,
          objectives: [
            'Write a Makefile with correct dependencies so that only changed files are rebuilt',
            'Use pattern rules, automatic variables and generated header dependencies (-MMD)',
            'Create a CMake project with a library, an executable and a test target, built out of source',
            'Explain why incorrect dependencies cause stale builds and how to verify a build is reproducible',
          ],
          concepts: [
            'Targets, prerequisites, recipes; timestamps',
            'Pattern rules (%.o: %.c) and automatic variables ($@, $<, $^)',
            'Phony targets (all, clean, test)',
            'Header dependency generation with -MMD -MP',
            'CMakeLists.txt: add_library, add_executable, target_link_libraries',
            'Out-of-source builds and build types',
            'CTest and enable_testing',
            'Compilation database (compile_commands.json) for editors',
          ],
          explanation: `A **build system** answers one question efficiently: given what changed, what must be rebuilt? **Make** does it with a graph of **targets**, each with **prerequisites** and a **recipe**; a target is rebuilt if it is older than any prerequisite. A rule like \`prog: main.o util.o\` with recipe \`$(CC) -o $@ $^\` says how to link, and the **pattern rule** \`%.o: %.c\` with \`$(CC) $(CFLAGS) -c -o $@ $<\` says how to compile any C file. The automatic variables \`$@\` (target), \`$<\` (first prerequisite) and \`$^\` (all prerequisites) keep rules generic. **Phony** targets (\`all\`, \`clean\`, \`test\`) are commands rather than files.

The classic Make bug is a **missing header dependency**: you edit \`util.h\`, Make sees that \`main.o\` is newer than \`main.c\` and does not rebuild it, and you debug a stale binary for an hour. The fix is to let the compiler emit dependencies: \`-MMD -MP\` writes a \`.d\` file per object listing the headers it included, and \`-include $(OBJS:.o=.d)\` pulls them into the Makefile. Every Makefile you write from now on should have this.

Make is enough for a single-platform project of a few dozen files. For anything bigger, or portable, **CMake** generates Makefiles (or Ninja files, or IDE projects) from a higher-level description: \`add_library(ds STATIC vec.c hash.c)\`, \`add_executable(tests tests.c)\`, \`target_link_libraries(tests ds)\`, \`target_include_directories\`, \`target_compile_options\`. Build **out of source** (\`cmake -S . -B build && cmake --build build\`) so the tree stays clean, choose a build type (\`-DCMAKE_BUILD_TYPE=Debug\` or \`Release\`), and register tests with \`enable_testing()\` and \`add_test()\` so \`ctest\` runs them. \`-DCMAKE_EXPORT_COMPILE_COMMANDS=ON\` produces the compilation database that editors and clang-tidy use.

Work through the GNU Make manual's introduction and the official CMake tutorial steps 1-4, then convert your data-structures project to each. The test of success: touch a header, rebuild, and confirm exactly the right objects were recompiled.`,
          resources: [
            {
              title: 'GNU Make Manual',
              url: 'https://www.gnu.org/software/make/manual/',
              type: 'documentation',
              cost: 'free',
              provider: 'GNU',
              note: 'Chapters 2-4 (introduction, writing makefiles, rules) and 10.5 (pattern rules).',
              primary: true,
            },
            {
              title: 'CMake Tutorial (official)',
              url: 'https://cmake.org/cmake/help/latest/guide/tutorial/index.html',
              type: 'documentation',
              cost: 'free',
              provider: 'Kitware',
              note: 'Steps 1-4 cover libraries, usage requirements and testing.',
            },
            {
              title: "Beej's Guide to C — Multifile projects and Makefiles",
              url: 'https://beej.us/guide/bgc/',
              type: 'textbook',
              cost: 'free',
              provider: 'Brian "Beej" Hall',
            },
          ],
          exercises: [
            {
              slug: 'makefile-with-deps',
              title: 'A Makefile that gets dependencies right',
              prompt:
                'Write a Makefile for your data-structures project with pattern rules, -MMD -MP dependency generation, debug/release CFLAGS selectable by a variable, and phony all/clean/test targets. Verify: touch vec.h and run make -n to see exactly which objects rebuild; run make twice and confirm the second run does nothing; run make -j4 and confirm it still works.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'cmake-conversion',
              title: 'Convert to CMake',
              prompt:
                'Write CMakeLists.txt for the same project: a static library target, a test executable linked to it, compile options -Wall -Wextra applied via target_compile_options, and ctest registration for the tests. Build Debug and Release in separate directories and compare the compiler command lines (make VERBOSE=1 or ninja -v). Generate compile_commands.json and open the project in an editor with clangd.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'stale-build-hunt',
              title: 'Reproduce and fix a stale build',
              prompt:
                'Create a Makefile without header dependencies, change a struct definition in a header used by two .c files, rebuild, and demonstrate the resulting memory corruption (one object uses the old layout). Explain the mechanism, then fix the Makefile and show the bug disappears. Write a paragraph on why ABI changes in headers are dangerous even with a correct build system when shared libraries are involved.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'How does Make decide whether to rebuild a target?',
              answerOutline:
                'It compares timestamps: a target is rebuilt if it does not exist or any prerequisite is newer than it (recursively).',
            },
            {
              question: 'What do -MMD -MP do and why are they essential?',
              answerOutline:
                'The compiler writes a .d file listing every user header each object depends on (-MP adds phony targets for headers); including these makes Make rebuild objects when headers change.',
            },
            {
              question: 'What is an out-of-source build and why use it?',
              answerOutline:
                'Build artefacts go in a separate directory from the sources, so the tree stays clean and multiple configurations (Debug, Release) can coexist.',
            },
          ],
        },
        {
          slug: 'debuggers-and-sanitizers',
          title: 'Debuggers and sanitizers',
          summary:
            'gdb (and lldb) as a tool you actually use: breakpoints, stepping, watchpoints, core dumps and reverse debugging; plus a systematic workflow with ASan, UBSan, MSan/Valgrind and strace.',
          estimatedMinutes: 150,
          objectives: [
            'Use gdb to set breakpoints and watchpoints, step, inspect variables and memory, and examine a core dump',
            'Debug a crash from a core file and a hang by attaching to a running process',
            'Choose the right sanitizer (address, undefined, thread, memory/Valgrind) for a symptom and interpret its report',
            'Combine strace and ltrace with the debugger to see a program\'s interaction with the OS',
          ],
          concepts: [
            'Breakpoints, conditional breakpoints, watchpoints',
            'step/next/finish/until; frames and bt',
            'print, x (examine memory), display, info locals/registers',
            'Core dumps (ulimit -c) and post-mortem debugging',
            'Attaching to a process; debugging a hang',
            'Reverse debugging (rr) in outline',
            'ASan, UBSan, TSan, MSan, Valgrind: what each finds',
            'strace and ltrace',
          ],
          explanation: `Printing is not debugging. A **debugger** lets you stop a program at any point, look at everything, and continue; it turns a mystery into an observation. Compile with \`-g -O0\` for debugging (or \`-Og\`), start \`gdb ./prog\`, set a **breakpoint** (\`b file.c:42\` or \`b func\`), \`run\`, then \`next\` (over calls), \`step\` (into calls), \`finish\` (run to return), \`continue\`. \`bt\` shows the call stack; \`frame 2\` moves to a frame; \`print expr\` evaluates any C expression including function calls; \`x/8xw p\` examines memory; \`info locals\`, \`info registers\`. **Conditional breakpoints** (\`b loop.c:10 if i == 999\`) and **watchpoints** (\`watch counter\`, which stops when a variable changes, using hardware support) are the two features that solve the bugs printf cannot. Learn the TUI (\`layout src\`) or use an IDE front end; the commands are the same.

When a program crashes in production, a **core dump** (enable with \`ulimit -c unlimited\`) is a snapshot of its memory; \`gdb ./prog core\` then shows where and why it died, with full variable state. For a **hang**, attach: \`gdb -p <pid>\`, then \`bt\` on every thread. For a bug that disappears under observation, **rr** records an execution and lets you step backwards through it; it is worth knowing exists.

**Sanitizers** are the complement: automatic detectors for whole classes of bugs. **ASan** (\`-fsanitize=address\`) finds overflows, use-after-free and leaks. **UBSan** (\`-fsanitize=undefined\`) finds signed overflow, misaligned access, null dereference and shifts gone wrong, at run time, where they happen. **TSan** (\`-fsanitize=thread\`) finds data races. Uninitialised reads need **MSan** (clang only) or **Valgrind**. Run your tests under \`address,undefined\` always, and \`thread\` for concurrent code; they cost 2-5x in speed and pay for themselves on the first bug.

Finally, **strace** shows every system call a program makes with arguments and results, and **ltrace** every library call; together with gdb they show a program from the outside as well as the inside. Read the gdb documentation's sample session and the sanitizer pages, then do the exercises, each of which plants a bug for a specific tool to find.`,
          resources: [
            {
              title: 'GDB Documentation (Debugging with GDB)',
              url: 'https://sourceware.org/gdb/documentation/',
              type: 'documentation',
              cost: 'free',
              provider: 'GNU',
              note: 'Chapter 1 "A Sample GDB Session" and chapters 5-10 (stopping, stepping, examining the stack and data).',
              primary: true,
            },
            {
              title: 'UIUC CS 341 coursebook — Debugging chapter (gdb, valgrind, tsan)',
              url: 'https://github.com/illinois-cs241/coursebook',
              type: 'textbook',
              cost: 'free',
              provider: 'University of Illinois',
            },
            {
              title: 'Google Sanitizers wiki (ASan, UBSan, TSan, MSan)',
              url: 'https://github.com/google/sanitizers',
              type: 'documentation',
              cost: 'free',
              provider: 'Google',
            },
            {
              title: 'man 1 strace',
              url: 'https://man7.org/linux/man-pages/man1/strace.1.html',
              type: 'documentation',
              cost: 'free',
              provider: 'man7.org',
            },
          ],
          exercises: [
            {
              slug: 'gdb-drills',
              title: 'gdb drills on a planted bug',
              prompt:
                'Take your hash table and plant a bug: the resize function copies one bucket fewer than it should. Using only gdb (no prints, no sanitizers): set a conditional breakpoint in resize, use a watchpoint on the bucket count, examine the bucket array with x, and find the off-by-one. Record the exact command sequence you used. Then debug a deliberate infinite loop by attaching to the running process.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'core-dump-postmortem',
              title: 'Post-mortem from a core dump',
              prompt:
                'Write a program that crashes deep in a call chain after processing a specific input line from a 10,000-line file. Enable core dumps, run it without gdb, then load the core, identify the crash line, the offending input line number and the value of the bad pointer. Explain what you can and cannot learn from a core compared with a live session.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'sanitizer-matrix',
              title: 'Which tool finds which bug?',
              prompt:
                'Write six programs each exhibiting one bug: stack buffer overflow, signed integer overflow, uninitialised heap read, data race between two threads, misaligned pointer access, and a memory leak. Build each with ASan, UBSan, TSan, and run under Valgrind, filling in a 6x4 table of which tool detects what. Add a column for strace: which bug has a visible effect in the system-call trace?',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What is a watchpoint and when is it the right tool?',
              answerOutline:
                'A breakpoint that triggers when a memory location changes (hardware-assisted). Use it when a variable is being corrupted and you do not know by whom.',
            },
            {
              question: 'Which sanitizer finds data races and why can ASan not?',
              answerOutline:
                'ThreadSanitizer, which tracks happens-before relations between accesses. ASan only checks address validity, not ordering between threads.',
            },
            {
              question: 'What does strace show that gdb does not?',
              answerOutline:
                'The program\'s interaction with the kernel: every system call, its arguments, return value and errno, without needing symbols or source.',
            },
          ],
        },
      ],
    },
    {
      slug: 'unix-system-calls',
      title: 'Unix System Calls',
      description:
        'Programming the operating system directly: files and descriptors, processes with fork/exec/wait, signals, and pipes and other IPC, using the POSIX API from C.',
      lessons: [
        {
          slug: 'files-and-descriptors',
          title: 'Files and file descriptors',
          summary:
            'open/read/write/close and lseek, the file descriptor table, error handling with errno, stat and directories, and the difference between the system-call layer and stdio buffering.',
          estimatedMinutes: 150,
          objectives: [
            'Use open, read, write, close and lseek correctly, handling short reads/writes and errno',
            'Explain file descriptors, the open file table and what dup/dup2 do',
            'Use stat, opendir/readdir and the permission bits to inspect the file system',
            'Contrast unbuffered system calls with buffered stdio and know when to use each',
          ],
          concepts: [
            'System call vs library call; the syscall boundary',
            'File descriptors 0, 1, 2 and the per-process table',
            'open flags (O_RDONLY, O_CREAT, O_APPEND) and mode bits',
            'Short reads and writes; the read loop',
            'errno and perror/strerror; EINTR',
            'lseek and file offsets; dup/dup2 share the offset',
            'stat, inodes, permissions, directories',
            'stdio buffering (fflush, setvbuf) vs write(2)',
          ],
          explanation: `A **system call** is a request to the kernel; on Linux it is a \`syscall\` instruction that switches to kernel mode (the Operating Systems subject explains the mechanism). The C library wraps each in a function with the same name, so \`read(fd, buf, n)\` is a thin wrapper around the kernel's read. The man pages in section 2 are the reference for system calls, section 3 for library functions; learn to read their SYNOPSIS, RETURN VALUE and ERRORS sections.

Unix presents files, pipes, sockets and devices through one interface: the **file descriptor**, a small integer indexing a per-process table that points to an open-file entry (holding the offset and flags) that points to the file. Descriptors 0, 1 and 2 are stdin, stdout and stderr. \`open(path, flags, mode)\` returns the lowest free descriptor; \`close\` frees it. \`dup2(old, new)\` makes \`new\` point to the same open-file entry, which is how the shell redirects output, and both then share the file offset.

The most common bug in this lesson: **short reads and writes**. \`read\` may return fewer bytes than requested (at end of file, on a pipe or terminal, or when interrupted), and \`write\` may write fewer than asked. Every correct program loops until the count is satisfied or 0 (EOF) or -1 is returned. On -1, the global \`errno\` says why; \`perror\` prints it. \`EINTR\` means a signal interrupted the call and you should usually retry.

\`stat\` fills a struct with a file's size, type, permissions, owner and timestamps, from its **inode**; \`opendir\`/\`readdir\` iterate a directory's entries. Permission bits are three octal digits (owner, group, other), each rwx.

The stdio library (\`fopen\`, \`fread\`, \`printf\`) sits on top of these calls and adds **buffering**: it collects output and issues one \`write\` per buffer, which is why a program that \`printf\`s and then crashes may lose output, and why mixing \`printf\` with \`write\` on the same descriptor interleaves strangely. Use stdio for text processing and the raw calls when you need control (pipes, sockets, exact I/O). Read the CS 341 file chapter and Beej's file I/O chapter, keep \`man 2 open\` open, and write the exercises with full error handling from the start.`,
          resources: [
            {
              title: 'UIUC CS 341 coursebook — Files chapter',
              url: 'https://github.com/illinois-cs241/coursebook',
              type: 'textbook',
              cost: 'free',
              provider: 'University of Illinois',
              primary: true,
            },
            {
              title: 'man 2 open, read, write, lseek, dup2, stat',
              url: 'https://man7.org/linux/man-pages/man2/open.2.html',
              type: 'documentation',
              cost: 'free',
              provider: 'man7.org',
              note: 'Start at open(2) and follow the SEE ALSO links.',
            },
            {
              title: "Beej's Guide to C — File Input/Output",
              url: 'https://beej.us/guide/bgc/',
              type: 'textbook',
              cost: 'free',
              provider: 'Brian "Beej" Hall',
              note: 'The stdio side of the story.',
            },
            {
              title: 'The Linux Programming Interface (Michael Kerrisk)',
              url: 'https://man7.org/tlpi/',
              type: 'textbook',
              cost: 'paid',
              provider: 'No Starch Press',
              note: 'The definitive reference for everything in this module (paid). The man pages, also by Kerrisk, are the free alternative.',
            },
          ],
          exercises: [
            {
              slug: 'my-cat-and-cp',
              title: 'cat and cp with raw system calls',
              prompt:
                'Write mycat (concatenate files or stdin to stdout) and mycp (copy a file preserving permission bits via stat/open mode) using only open/read/write/close with a 64 KB buffer, correct short-write loops and errno reporting. Test on an empty file, a 1 GB file (measure time vs cp), a directory (should fail cleanly) and a pipe as input. Use strace -c to count system calls for buffer sizes 1, 4096 and 65536.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'stdio-vs-syscalls',
              title: 'Observe buffering',
              prompt:
                'Write a program that does printf("A"); write(1, "B", 1); printf("C\\n"); and run it with stdout to the terminal, then redirected to a file. Explain the different orderings using strace output. Then write 1 million small records with fwrite and with write and compare time and system-call counts.',
              kind: 'coding',
              difficulty: 1,
            },
            {
              slug: 'mini-ls',
              title: 'ls -l from scratch',
              prompt:
                'Write myls that lists a directory with readdir, calls lstat on each entry and prints the permission string (e.g. -rwxr-xr-x), link count, owner (getpwuid), size and name, sorted by name. Handle symbolic links and unreadable entries. Compare output with ls -l on /etc and on a directory containing a broken symlink.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why must every call to read be in a loop?',
              answerOutline:
                'read may return fewer bytes than requested (EOF, pipe/terminal semantics, signal interruption); only 0 means end of file and -1 means error.',
            },
            {
              question: 'What does dup2(fd, 1) achieve and what do fd and 1 then share?',
              answerOutline:
                'Descriptor 1 (stdout) now refers to the same open-file entry as fd, so writes to stdout go to that file; they share the file offset and status flags.',
            },
            {
              question: 'Why might output written with printf be lost when a program crashes?',
              answerOutline:
                'stdio buffers output in user space and only calls write when the buffer fills or is flushed; a crash discards the unflushed buffer.',
            },
          ],
          relatedLessons: ['operating-systems/persistence/file-system-api'],
        },
        {
          slug: 'processes-fork-exec-wait',
          title: 'Processes: fork, exec and wait',
          summary:
            'Creating processes with fork, replacing their program with exec, collecting them with wait, and the environment, exit status and redirection machinery that a shell is built on.',
          estimatedMinutes: 150,
          objectives: [
            'Write programs that fork, exec a command with execvp and wait for it, decoding the exit status',
            'Explain what fork copies, what exec preserves (descriptors) and why that enables redirection',
            'Avoid zombies and orphans and handle waitpid with WNOHANG',
            'Use the environment (environ, getenv, setenv) and PATH searching correctly',
          ],
          concepts: [
            'fork: copy-on-write duplication; return value in parent and child',
            'exec family: execvp, execve; what survives exec',
            'wait/waitpid; WIFEXITED, WEXITSTATUS, WIFSIGNALED',
            'Zombies, orphans and reparenting to init',
            'Exit status conventions; _exit vs exit in the child',
            'File descriptor inheritance and close-on-exec',
            'Environment variables and PATH',
            'Process IDs, parent IDs, process groups',
          ],
          explanation: `Unix creates a process by cloning one. \`fork()\` returns twice: in the parent with the child's PID, in the child with 0, and the two then run the same code with separate (copy-on-write) memories. Almost always the child immediately calls one of the **exec** functions, which replaces its program image with a new executable and never returns on success; \`execvp\` searches \`PATH\` and takes an \`argv\` array. The parent calls \`waitpid(pid, &status, 0)\` to block until the child exits and collect its **status**, which it decodes with \`WIFEXITED\`/\`WEXITSTATUS\` (normal exit, 0-255) or \`WIFSIGNALED\`/\`WTERMSIG\` (killed by a signal).

The genius of separating fork and exec is the window between them. The child, still running the parent's code, can rearrange its world before exec: \`open\` a file and \`dup2\` it onto descriptor 1 for output redirection, change directory, reset signal handlers, set resource limits. Because **open descriptors survive exec**, the new program inherits the redirection without knowing. Descriptors you do not want inherited should be opened with \`O_CLOEXEC\`.

Mistakes to avoid. A child that exits without exec should call \`_exit\`, not \`exit\`, or it will flush the parent's duplicated stdio buffers a second time. A process whose parent never waits for it becomes a **zombie**: it is dead but its status entry persists, and a server that forks per request without waiting leaks process-table entries until the system refuses to fork. Reap with \`waitpid(-1, &st, WNOHANG)\` in a loop, usually from a \`SIGCHLD\` handler (next lesson). If the parent dies first, the child is an **orphan** and is reparented to init, which reaps it.

The **environment** is an array of \`NAME=value\` strings passed to exec (\`environ\`, \`getenv\`, \`setenv\`); \`PATH\` is just one of them. The exercises build toward the capstone shell. The Operating Systems subject's process-API lesson covers the same calls from the kernel's side; this one is about using them correctly.`,
          resources: [
            {
              title: 'UIUC CS 341 coursebook — Processes and Forking chapters',
              url: 'https://github.com/illinois-cs241/coursebook',
              type: 'textbook',
              cost: 'free',
              provider: 'University of Illinois',
              primary: true,
            },
            {
              title: 'man 2 fork, execve, wait; man 3 exec',
              url: 'https://man7.org/linux/man-pages/man2/fork.2.html',
              type: 'documentation',
              cost: 'free',
              provider: 'man7.org',
            },
            {
              title: 'Tutorial - Write a Shell in C (Stephen Brennan)',
              url: 'https://brennan.io/2015/01/16/write-a-shell-in-c/',
              type: 'article',
              cost: 'free',
              provider: 'Stephen Brennan',
              note: 'A 300-line shell built with exactly these calls; a good warm-up for the capstone.',
            },
            {
              title: 'CMU 15-213 — Exceptional Control Flow: Processes (slides)',
              url: 'https://www.cs.cmu.edu/~213/',
              type: 'lecture',
              cost: 'free',
              provider: 'Carnegie Mellon University',
            },
          ],
          exercises: [
            {
              slug: 'run-command',
              title: 'A command runner with redirection',
              prompt:
                'Write run that executes argv[1..] as a command via fork/execvp/waitpid and prints its exit status or terminating signal, with optional -o file (redirect stdout) and -e file (redirect stderr) handled in the child with dup2. Test with true, false, a nonexistent command (exec failure must be reported and the child must _exit(127)), and sleep 5 killed from another terminal.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'zombie-demo',
              title: 'Make zombies, then reap them',
              prompt:
                'Write a program that forks 50 children that exit immediately, sleeps 10 seconds, and then waits for them. During the sleep run ps -o pid,stat,cmd and count the Z entries. Then fix it with a waitpid(-1, WNOHANG) loop and show no zombies remain. Finally, demonstrate orphaning by making the parent exit first and observing the child\'s new parent PID.',
              kind: 'coding',
              difficulty: 1,
            },
            {
              slug: 'parallel-runner',
              title: 'Run commands in parallel with a concurrency limit',
              prompt:
                'Write prun -j N file where file lists one command per line: run at most N at once, starting a new one whenever one finishes, and report each command\'s exit status and wall time. Verify with 20 "sleep 1" lines that -j 4 takes about 5 seconds and -j 20 about 1 second.',
              kind: 'coding',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does the shell fork before exec instead of calling a single spawn function?',
              answerOutline:
                'The child can set up redirections, directory, signals and limits using ordinary code before exec; the new program inherits the result.',
            },
            {
              question: 'What is a zombie and how do you prevent accumulation?',
              answerOutline:
                'An exited child whose status has not been collected. The parent must call wait/waitpid, typically from a SIGCHLD handler with WNOHANG in a loop.',
            },
            {
              question: 'Why should a forked child that fails to exec call _exit rather than exit?',
              answerOutline:
                'exit runs atexit handlers and flushes stdio buffers inherited from the parent, producing duplicate output; _exit terminates immediately.',
            },
          ],
          relatedLessons: ['operating-systems/foundations/process-api'],
        },
        {
          slug: 'signals',
          title: 'Signals',
          summary:
            'Asynchronous notifications from the kernel: delivery, handlers, blocking and masks, async-signal safety, and the self-pipe trick for mixing signals with event loops.',
          estimatedMinutes: 150,
          objectives: [
            'Install handlers with sigaction and explain default actions for common signals (INT, TERM, CHLD, SEGV, PIPE)',
            'Explain why handlers must only call async-signal-safe functions and use volatile sig_atomic_t flags',
            'Block signals with sigprocmask during critical sections and use sigsuspend to wait without races',
            'Reap children from a SIGCHLD handler and handle EINTR correctly',
          ],
          concepts: [
            'Signal generation vs delivery; pending and blocked',
            'Default actions: terminate, core, ignore, stop',
            'sigaction vs signal; SA_RESTART',
            'Async-signal-safe functions',
            'volatile sig_atomic_t',
            'Signal masks: sigprocmask, sigsuspend',
            'Race between checking a flag and sleeping',
            'The self-pipe trick and signalfd',
          ],
          explanation: `A **signal** is a one-bit message delivered to a process asynchronously: Ctrl-C sends \`SIGINT\`, a child exiting sends \`SIGCHLD\`, writing to a closed pipe sends \`SIGPIPE\`, a bad memory access sends \`SIGSEGV\`. Each has a **default action** (terminate, terminate with core, ignore, stop). A process may **install a handler** with \`sigaction\` (prefer it to the older \`signal\`, whose semantics vary), ignore the signal, or **block** it; a blocked signal stays **pending** until unblocked. Signals of the same type do not queue: a thousand children exiting at once may produce one \`SIGCHLD\`.

Handlers run at an arbitrary point in your program, possibly in the middle of \`malloc\` or \`printf\`. That is why a handler may call only **async-signal-safe** functions (\`write\`, \`_exit\`, \`waitpid\`, \`sigaction\` and a listed few; see \`man 7 signal-safety\`), and in particular never \`printf\` or \`malloc\`, which hold locks the interrupted code may own. The safe pattern is minimal: set a \`volatile sig_atomic_t\` flag and return, and let the main loop act on it. \`volatile\` tells the compiler the variable may change behind its back; \`sig_atomic_t\` guarantees the write is indivisible.

Blocking creates critical sections: wrap the code that manipulates a job list in \`sigprocmask(SIG_BLOCK, ...)\` / \`SIG_UNBLOCK\` so a \`SIGCHLD\` handler cannot modify it halfway through. The classic **race**: \`while (!flag) pause();\` loses the signal if it arrives between the test and the \`pause\`. The fix is \`sigsuspend\`, which atomically unblocks and waits. For event loops built on \`select\`/\`poll\`/\`epoll\`, use the **self-pipe trick** (the handler writes a byte to a pipe the loop watches) or Linux's \`signalfd\`, which turns signals into readable file descriptors.

Finally, slow system calls interrupted by a signal return -1 with \`errno == EINTR\`; either set \`SA_RESTART\` or retry explicitly. Read the CS 341 signals chapter and the CS:APP exceptional-control-flow material; the **Shell Lab** is the definitive exercise and feeds directly into the capstone.`,
          resources: [
            {
              title: 'UIUC CS 341 coursebook — Signals chapter',
              url: 'https://github.com/illinois-cs241/coursebook',
              type: 'textbook',
              cost: 'free',
              provider: 'University of Illinois',
              primary: true,
            },
            {
              title: 'man 7 signal and man 7 signal-safety',
              url: 'https://man7.org/linux/man-pages/man7/signal.7.html',
              type: 'documentation',
              cost: 'free',
              provider: 'man7.org',
              note: 'The overview and the list of async-signal-safe functions.',
            },
            {
              title: 'CMU 15-213 — Exceptional Control Flow: Signals and Nonlocal Jumps (slides)',
              url: 'https://www.cs.cmu.edu/~213/',
              type: 'lecture',
              cost: 'free',
              provider: 'Carnegie Mellon University',
              note: 'The three rules for safe handlers and the race examples.',
            },
            {
              title: 'CS:APP Labs — Shell Lab',
              url: 'http://csapp.cs.cmu.edu/3e/labs.html',
              type: 'problem-set',
              cost: 'free',
              provider: 'Carnegie Mellon University',
              note: 'Implement job control (fg, bg, Ctrl-C, Ctrl-Z) in a provided shell skeleton with a reference tsh to compare.',
            },
          ],
          exercises: [
            {
              slug: 'graceful-shutdown',
              title: 'Graceful shutdown on SIGINT and SIGTERM',
              prompt:
                'Write a long-running program that appends a line to a log file every second. Install sigaction handlers that set a flag on SIGINT/SIGTERM so the main loop finishes the current write, writes a "shutdown" line and exits 0. Show what happens with the naive version that calls printf and exit inside the handler when the signal arrives during a printf (use a tight loop of printf to make it likely), and explain with the async-signal-safety rules.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'sigchld-reaper',
              title: 'A SIGCHLD reaper without races',
              prompt:
                'Write a program that forks 100 short-lived children in a burst and reaps them from a SIGCHLD handler using a waitpid(-1, WNOHANG) loop, counting exits in a sig_atomic_t. Demonstrate that a handler calling waitpid once per signal misses children (signals coalesce). Then add a job table protected by sigprocmask and show, with a sleep inserted deliberately, the race that occurs without blocking.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'shell-lab',
              title: 'CS:APP Shell Lab',
              prompt:
                'Complete the Shell Lab: implement eval, builtin_cmd, do_bgfg, waitfg and the SIGCHLD, SIGINT and SIGTSTP handlers in tsh.c so that all 16 trace files produce output identical to the reference shell. Pay attention to blocking SIGCHLD around fork and addjob, and forwarding signals to the whole foreground process group.',
              kind: 'coding',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'Why is calling printf in a signal handler unsafe?',
              answerOutline:
                'printf may hold an internal lock or be mid-update when interrupted; re-entering it from the handler deadlocks or corrupts the buffer. Only async-signal-safe functions are allowed.',
            },
            {
              question: 'What is the race in while(!flag) pause(); and how does sigsuspend fix it?',
              answerOutline:
                'The signal can arrive after the test and before pause, so pause waits forever. sigsuspend atomically sets the mask and sleeps, so the signal is delivered only once sleeping.',
            },
            {
              question: 'Why must a SIGCHLD handler loop on waitpid with WNOHANG?',
              answerOutline:
                'Signals do not queue; several children can exit while one SIGCHLD is pending, so one waitpid per signal would leave zombies.',
            },
          ],
        },
        {
          slug: 'pipes-and-ipc',
          title: 'Pipes and inter-process communication',
          summary:
            'Anonymous pipes and shell pipelines, named pipes, shared memory with mmap, and multiplexing descriptors with poll: the building blocks for connecting processes.',
          estimatedMinutes: 150,
          objectives: [
            'Build a multi-stage pipeline with pipe, fork, dup2 and exec, closing every unused end',
            'Explain pipe semantics: blocking, EOF on writer close, SIGPIPE, PIPE_BUF atomicity',
            'Share memory between processes with mmap and reason about what can go wrong without synchronisation',
            'Use poll to wait on several descriptors at once',
          ],
          concepts: [
            'pipe(): two descriptors and a kernel buffer',
            'EOF requires all write ends closed',
            'SIGPIPE and EPIPE',
            'PIPE_BUF and atomic writes',
            'Named pipes (mkfifo)',
            'Shared memory via mmap(MAP_SHARED) and shm_open',
            'poll/select for multiplexing',
            'Unix domain sockets (overview)',
          ],
          explanation: `A **pipe** is a kernel buffer with a read end and a write end, each a file descriptor. \`pipe(fds)\` creates one; after \`fork\` both processes hold both ends. The shell's \`a | b\` is: pipe, fork twice, in the first child \`dup2(fds[1], 1)\` and exec \`a\`, in the second \`dup2(fds[0], 0)\` and exec \`b\`, and in every process **close the ends it does not use**. That last step is the one everyone gets wrong: the reader sees EOF only when *every* copy of the write end is closed, so a parent that forgets to close \`fds[1]\` makes \`b\` hang forever waiting for more input. For an $n$-stage pipeline, keep the previous stage's read end and create a new pipe per stage.

Pipe semantics in one paragraph: reads block until data or EOF; writes block when the buffer (64 KB on Linux) is full; writing to a pipe with no readers raises \`SIGPIPE\` (default: terminate), which is why \`yes | head\` ends cleanly, and which servers typically ignore to get \`EPIPE\` instead; writes of at most \`PIPE_BUF\` (4096) bytes are atomic, so multiple writers do not interleave small messages. A **named pipe** (\`mkfifo\`) is the same object with a filesystem name, so unrelated processes can connect.

**Shared memory** is the fastest IPC: \`mmap\` a file (or an anonymous region before forking, or a \`shm_open\` object) with \`MAP_SHARED\`, and writes by one process are visible to the other instantly, with no copying. The cost is that you are now doing concurrent programming across processes: without a mutex or semaphore in the shared region (\`pthread_mutex\` with \`PTHREAD_PROCESS_SHARED\`, or POSIX \`sem_open\`), you get the same races as with threads. The Operating Systems subject covers the synchronisation primitives.

When a process must watch several descriptors, say a pipe from each worker, blocking in \`read\` on one starves the others. \`poll\` (or \`select\`, or Linux \`epoll\`) takes a set of descriptors and returns when any is ready. This is the heart of every event-driven server, and the network subject builds on it with sockets. Work through the CS 341 IPC chapter and the man pages, then build the pipeline, which is the last piece the capstone shell needs.`,
          resources: [
            {
              title: 'UIUC CS 341 coursebook — Pipes and IPC chapters',
              url: 'https://github.com/illinois-cs241/coursebook',
              type: 'textbook',
              cost: 'free',
              provider: 'University of Illinois',
              primary: true,
            },
            {
              title: 'man 7 pipe — overview of pipes and FIFOs',
              url: 'https://man7.org/linux/man-pages/man7/pipe.7.html',
              type: 'documentation',
              cost: 'free',
              provider: 'man7.org',
              note: 'Covers capacity, PIPE_BUF atomicity and the EOF/SIGPIPE rules precisely.',
            },
            {
              title: 'man 2 mmap and man 2 poll',
              url: 'https://man7.org/linux/man-pages/man2/mmap.2.html',
              type: 'documentation',
              cost: 'free',
              provider: 'man7.org',
            },
            {
              title: 'xv6 user/sh.c — pipeline implementation in a tiny shell',
              url: 'https://github.com/mit-pdos/xv6-riscv/blob/riscv/user/sh.c',
              type: 'documentation',
              cost: 'free',
              provider: 'MIT',
              note: 'See runcmd for the PIPE case: the canonical pipe/fork/dup/close sequence.',
            },
          ],
          exercises: [
            {
              slug: 'n-stage-pipeline',
              title: 'An n-stage pipeline runner',
              prompt:
                'Write pipeline that takes commands separated by a literal "|" argument (e.g. pipeline cat /usr/share/dict/words "|" grep ^a "|" wc -l) and runs them connected by pipes with correct closing of all ends, waiting for every stage and reporting each status. Verify the output matches the shell. Then remove one close() call and demonstrate the hang; explain it using lsof -p on the stuck process.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'shared-memory-counter',
              title: 'A shared-memory counter, racy then fixed',
              prompt:
                'mmap an anonymous MAP_SHARED page, fork 4 children that each increment a counter in it 1 million times, and print the final value (expect it to be wrong). Fix it with a process-shared pthread mutex placed in the shared page and measure the slowdown. Then replace the mutex with an atomic fetch-add (stdatomic.h) and compare.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'poll-multiplexer',
              title: 'Multiplex worker output with poll',
              prompt:
                'Fork 5 workers, each writing timestamped lines to its own pipe at random intervals. In the parent, use poll to read from whichever pipe is ready, prefix each line with the worker number, and exit when all pipes have reached EOF. Confirm no worker is starved by comparing arrival order with the timestamps. Explain why a sequential read loop over the five pipes would misbehave.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does a reader on a pipe hang if the parent forgets to close its copy of the write end?',
              answerOutline:
                'EOF is delivered only when all write-end descriptors are closed; the parent\'s open copy keeps the pipe "writable" so read blocks forever.',
            },
            {
              question: 'What happens when you write to a pipe whose read end is closed?',
              answerOutline:
                'The kernel sends SIGPIPE (default action terminates the process); if ignored, write returns -1 with EPIPE.',
            },
            {
              question: 'What does poll give you over a sequence of blocking reads?',
              answerOutline:
                'It waits on many descriptors simultaneously and reports which are ready, so one slow source cannot block the others.',
            },
          ],
          relatedLessons: ['operating-systems/foundations/process-api'],
        },
      ],
      project: {
        slug: 'job-control-shell-in-c',
        title: 'Project: a job-control shell in C',
        description: `Build the C half of the capstone now: a shell that parses command lines with arguments, quoting, redirection (<, >, >>, 2>) and pipelines; runs builtins (cd, exit, jobs, fg, bg) and external commands; supports background jobs with &; and implements job control with correct SIGCHLD, SIGINT and SIGTSTP handling and process groups. Test it against a script of commands and compare the output with bash.`,
        deliverables: [
          'Source with a tokenizer, parser (to a command/pipeline structure) and executor as separate files, built by a Makefile with sanitizer and release profiles',
          'A test script of at least 30 commands with expected outputs, run automatically',
          'A README documenting the signal-handling design and the one bug that took you longest to find',
        ],
        estimatedHours: 14,
        stretchGoals: ['Add command history and line editing with the readline library', 'Add environment variable expansion and globbing'],
      },
    },
    {
      slug: 'performance-and-undefined-behaviour',
      title: 'Performance and Undefined Behaviour',
      description:
        'What the C standard actually promises and how compilers exploit it, measuring programs with profilers and benchmarks, and writing code that respects caches and branch predictors.',
      lessons: [
        {
          slug: 'undefined-behaviour-and-the-c-standard',
          title: 'Undefined behaviour and the C standard',
          summary:
            'The difference between undefined, unspecified and implementation-defined behaviour, the common sources of UB, how optimisers exploit it, and how to write code that has none.',
          estimatedMinutes: 150,
          objectives: [
            'Distinguish undefined, unspecified and implementation-defined behaviour with examples of each',
            'List the ten most common sources of UB in real C code and recognise them in a review',
            'Explain, with assembly evidence, how an optimiser transforms code under the assumption that UB does not occur',
            'Use UBSan, compiler warnings and defensive idioms to eliminate UB',
          ],
          concepts: [
            'Undefined vs unspecified vs implementation-defined',
            'Signed overflow, out-of-bounds access, null dereference',
            'Uninitialised reads and indeterminate values',
            'Strict aliasing and type punning via memcpy',
            'Sequence points and unsequenced modification (i = i++)',
            'Data races as UB',
            'Time-travel optimisation: UB affects code before it',
            'Sanitizers and -fwrapv, -fno-strict-aliasing as escape hatches',
          ],
          explanation: `The C standard describes an abstract machine, and a conforming program is one whose behaviour the standard defines. For **undefined behaviour** (UB) the standard imposes *no requirements*: the compiler may assume it never happens. For **unspecified** behaviour (the order of evaluating function arguments) the implementation may choose any of several options and need not document it; for **implementation-defined** behaviour (the size of \`int\`, right shift of negative numbers) it must choose and document. Only UB is catastrophic, because the optimiser reasons backwards from "this cannot happen".

The consequences are counter-intuitive. Given \`if (x + 1 < x) abort();\` for signed \`x\`, gcc at -O2 deletes the test: overflow is UB, so \`x + 1 < x\` is "always false". Given \`int *p = ...; int v = *p; if (p == NULL) return;\`, the null check is removed because \`*p\` already "proved" \`p\` non-null. The compiler can even affect code *before* the UB, because it may reorder. This is not malice; it is the same reasoning that makes loops fast (an index that cannot overflow can live in a 64-bit register).

The common sources, roughly in order of frequency in real code: out-of-bounds array access; use after free; signed integer overflow; null pointer dereference; reading **uninitialised** variables; **unsequenced** side effects (\`i = i++\`, \`a[i] = i++\`); shifts by too much; **strict aliasing** violations (reading a \`float\` through an \`int *\`; use \`memcpy\` to type-pun); misaligned access; **data races** between threads; and returning the address of a local. John Regehr's guide and the LLVM blog series explain each with real examples.

Defence is layered. Compile with \`-Wall -Wextra -Wconversion\` and read the warnings. Test under \`-fsanitize=undefined,address\` so that UB is reported at the moment it occurs. Use \`__builtin_add_overflow\` and friends, or check before operating. Prefer unsigned arithmetic for bit manipulation and sizes. Where you deliberately want wrapping, \`-fwrapv\` makes signed overflow defined (at a small cost in optimisation), and \`-fno-strict-aliasing\` likewise, but these are crutches for legacy code, not a style. Read the standard's Annex J.2, a full list of UB, once, to appreciate its length.`,
          resources: [
            {
              title: 'A Guide to Undefined Behavior in C and C++ (John Regehr, parts 1-3)',
              url: 'https://blog.regehr.org/archives/213',
              type: 'article',
              cost: 'free',
              provider: 'John Regehr',
              primary: true,
            },
            {
              title: 'What Every C Programmer Should Know About Undefined Behavior (LLVM blog, parts 1-3)',
              url: 'https://blog.llvm.org/2011/05/what-every-c-programmer-should-know.html',
              type: 'article',
              cost: 'free',
              provider: 'LLVM Project',
              note: 'Explains why compilers exploit UB and gives the classic examples with generated code.',
            },
            {
              title: 'C11 standard draft N1570 — Annex J.2 (undefined behavior)',
              url: 'https://www.open-std.org/jtc1/sc22/wg14/www/docs/n1570.pdf',
              type: 'documentation',
              cost: 'free',
              provider: 'ISO/IEC',
            },
            {
              title: 'UndefinedBehaviorSanitizer documentation (Clang)',
              url: 'https://clang.llvm.org/docs/UndefinedBehaviorSanitizer.html',
              type: 'documentation',
              cost: 'free',
              provider: 'LLVM',
            },
          ],
          exercises: [
            {
              slug: 'ub-gallery',
              title: 'A gallery of exploited UB',
              prompt:
                'Write five functions each containing one UB (signed overflow check after the fact, null check after dereference, uninitialised local used in a branch, strict-aliasing float/int pun, unsequenced i = i++). Compile each at -O0 and -O2 in Compiler Explorer and document, with the assembly, how the optimiser changed the behaviour. Then run each under UBSan and record what it reports. Finally rewrite each correctly.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'classify-behaviour',
              title: 'Classify: undefined, unspecified or implementation-defined?',
              prompt:
                'For twelve snippets (e.g. printf("%d %d", f(), g()); -1 >> 1; (char)300; INT_MIN / -1; a[5] where a has 5 elements, read only; sizeof(long); comparing two unrelated pointers with <; memcpy with overlapping ranges; converting a double of 1e10 to int; i++ + i++; strlen on a non-terminated array; using a pointer after realloc moved it) classify the behaviour with a citation to the standard section and say what -O2 gcc typically does.',
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'ub-free-review',
              title: 'Audit your own code',
              prompt:
                'Take your data-structures library and shell from earlier modules and build them with -fsanitize=undefined,address -Wall -Wextra -Wconversion -Wshadow. Fix every report and warning. Write up the three most interesting findings and whether any would have produced wrong output at -O2 without the sanitizer.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why may a compiler delete if (x + 1 < x) for signed x?',
              answerOutline:
                'Signed overflow is undefined, so the compiler assumes it never happens; without overflow the condition is mathematically false and the branch is dead.',
            },
            {
              question: 'What is the difference between implementation-defined and undefined behaviour?',
              answerOutline:
                'Implementation-defined: the compiler must pick one documented behaviour (e.g. sizeof(int)). Undefined: no requirements at all; the program is invalid and anything may happen.',
            },
            {
              question: 'How do you reinterpret the bits of a float as an int without UB?',
              answerOutline:
                'memcpy the bytes into an int (or use a union in C, which C11 permits); do not dereference a cast pointer, which violates strict aliasing.',
            },
          ],
        },
        {
          slug: 'profiling-and-benchmarking',
          title: 'Profiling and benchmarking',
          summary:
            'Measuring before optimising: wall-clock and CPU time, statistically sound microbenchmarks, sampling profilers (perf, flame graphs) and hardware counters, and the mistakes that produce meaningless numbers.',
          estimatedMinutes: 150,
          objectives: [
            'Measure execution time correctly (clock_gettime, repeated runs, medians, warm-up) and report uncertainty',
            'Profile a program with perf record/report and read a flame graph to find hot spots',
            'Use perf stat hardware counters (IPC, cache misses, branch misses) to diagnose why code is slow',
            'Recognise benchmarking pitfalls: dead-code elimination, frequency scaling, cold caches, I/O noise',
          ],
          concepts: [
            'Wall time vs CPU time vs cycles',
            'clock_gettime(CLOCK_MONOTONIC) and rdtsc',
            'Microbenchmark hygiene: warm-up, repetitions, median, interquartile range',
            'Preventing optimisation of the benchmark (volatile sinks, asm barriers)',
            'Sampling profilers and perf record',
            'Flame graphs',
            'Hardware counters: IPC, LLC misses, branch mispredictions',
            'Amdahl\'s law applied to profiles',
          ],
          explanation: `The first rule of performance work is **measure first**: programmers' intuitions about where time goes are wrong more often than right. The second rule is **measure correctly**, which is harder than it sounds.

Time comes in flavours. **Wall time** is what a user experiences; **CPU time** excludes waiting on I/O or other processes; **cycles** (from hardware counters) are immune to frequency scaling. Use \`clock_gettime(CLOCK_MONOTONIC)\` for wall time in code, \`/usr/bin/time -v\` for a whole run. A single measurement is a sample from a noisy distribution: run at least 10-30 times, report the **median** and the spread (interquartile range or min/max), discard the first run as warm-up, and never compare two numbers whose difference is within the noise. Tools like \`hyperfine\` do this for command lines.

Microbenchmarks have a trap of their own: the optimiser. If the result of the loop you are timing is unused, -O2 deletes the loop, and you measure nothing. Sink results into a \`volatile\` variable, or use an empty inline \`asm\` with a memory clobber as a barrier, and check the assembly. Also beware cold caches (the first iteration pays for page faults and cache fills), CPU frequency boost (pin the governor or compare ratios only), and hyperthreads sharing a core.

To find *where* time goes, use a **sampling profiler**: \`perf record -g ./prog\` interrupts the program thousands of times per second and records the call stack; \`perf report\` shows which functions and lines were hot. A **flame graph** renders the same data as a picture where width is time; it is the fastest way to see a program's cost structure. Then apply Amdahl: if a function is 5% of the profile, no optimisation of it matters.

To find *why* a hot spot is slow, use **hardware counters** via \`perf stat -e cycles,instructions,cache-misses,branch-misses\`. IPC below 1 on a modern core suggests stalls: many cache misses say memory-bound, many branch misses say unpredictable control flow, neither says dependency chains or division. The next lesson uses these diagnoses. Read Brendan Gregg's perf page and the 15-213 optimisation lecture, then measure something you wrote; the numbers will surprise you.`,
          resources: [
            {
              title: 'Linux perf Examples (Brendan Gregg)',
              url: 'https://www.brendangregg.com/perf.html',
              type: 'documentation',
              cost: 'free',
              provider: 'Brendan Gregg',
              note: 'The perf stat, record and report recipes plus flame-graph generation.',
              primary: true,
            },
            {
              title: 'perf wiki (kernel.org)',
              url: 'https://perf.wiki.kernel.org/index.php/Main_Page',
              type: 'documentation',
              cost: 'free',
              provider: 'kernel.org',
            },
            {
              title: 'hyperfine — command-line benchmarking tool',
              url: 'https://github.com/sharkdp/hyperfine',
              type: 'tool',
              cost: 'free',
              provider: 'David Peter',
              note: 'Handles warm-up, repetitions and statistics for whole-program benchmarks.',
            },
            {
              title: 'CMU 15-213 — Code Optimization lecture slides',
              url: 'https://www.cs.cmu.edu/~213/',
              type: 'lecture',
              cost: 'free',
              provider: 'Carnegie Mellon University',
              note: 'Cycles-per-element methodology and the optimisation blockers (aliasing, procedure calls).',
            },
          ],
          exercises: [
            {
              slug: 'benchmark-harness',
              title: 'A microbenchmark harness that is not lying',
              prompt:
                'Write a C harness that times a function over N repetitions with clock_gettime, discards warm-up, and prints median, min and IQR. Benchmark strlen on a 1 KB string. First show the version where -O2 removes the call (time near zero; confirm in the assembly), then fix with a volatile sink. Compare -O0, -O2 and -O3 and comment on whether the differences exceed the noise.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'profile-the-shell',
              title: 'Profile your shell and your hash table',
              prompt:
                'Run perf record -g on your shell executing a script of 10,000 commands and on your hash table inserting 5 million keys. Generate a flame graph for each (FlameGraph scripts or perf script | inferno). Identify the top three hot spots, estimate from Amdahl how much total time each could save if eliminated, and optimise the one with the best payoff; report before/after medians.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'diagnose-with-counters',
              title: 'Diagnose three slow programs with counters',
              prompt:
                'Write three programs with the same run time but different bottlenecks: (a) random access over a 512 MB array (memory-bound), (b) a loop with a data-dependent unpredictable branch, (c) a chain of dependent floating-point divisions. Run perf stat on each and show that IPC, cache-misses and branch-misses identify the bottleneck. Write one sentence per program on what change would help.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why report a median and spread rather than a single run or a mean?',
              answerOutline:
                'Timing is noisy and skewed by outliers (interrupts, scheduling); the median is robust and the spread tells you whether a difference is real.',
            },
            {
              question: 'How can an optimiser make a benchmark measure nothing, and what is the fix?',
              answerOutline:
                'If the result is unused, dead-code elimination removes the work. Store the result to a volatile variable or use an asm barrier, and verify the assembly.',
            },
            {
              question: 'A hot loop shows IPC 0.3 and a high LLC miss rate. What is the likely cause and remedy?',
              answerOutline:
                'Memory-bound: the CPU waits on DRAM. Improve locality (data layout, access order, blocking) or reduce the working set.',
            },
          ],
        },
        {
          slug: 'cache-friendly-code-and-optimization',
          title: 'Cache-friendly code and practical optimisation',
          summary:
            'Turning architecture knowledge into faster programs: data layout, access patterns, branch elimination, the optimisation blockers that stop compilers, and when to stop.',
          estimatedMinutes: 150,
          objectives: [
            'Restructure data (AoS vs SoA, packing, alignment) and loops (order, blocking) to reduce cache misses, and measure the effect',
            'Remove optimisation blockers: aliasing (restrict), function calls in loops, unnecessary memory references',
            'Replace unpredictable branches with branchless arithmetic or sorting when profitable',
            'Judge when an optimisation is worth its complexity using measurements and Amdahl',
          ],
          concepts: [
            'Spatial and temporal locality in practice',
            'Array of structs vs struct of arrays',
            'Loop interchange, fusion and blocking (tiling)',
            'Prefetching and sequential access',
            'Optimisation blockers: aliasing, side effects, calls',
            'restrict and const as promises to the compiler',
            'Branchless code and cmov',
            'Premature optimisation and the readability cost',
          ],
          explanation: `You learned in the architecture subject that a cache miss costs a hundred cycles and a mispredicted branch fifteen. This lesson is about writing C that avoids both, guided by the measurements of the previous lesson.

**Data layout** comes first. Iterate memory sequentially: the hardware prefetcher recognises the pattern and the cost per element falls to near zero, while random or large-stride access pays a miss per element. For collections of records where a loop touches only one or two fields, a **struct of arrays** (separate arrays per field) packs the useful bytes densely, whereas an **array of structs** drags every field through the cache. Keep hot data small: reorder struct fields to avoid padding, use \`uint8_t\` where the range allows, and separate hot from cold fields. For nested loops over matrices, order the loops so the inner one walks contiguous memory, and **block** the computation so a tile stays in L1 while it is reused.

**Optimisation blockers** are things that stop the compiler doing the work for you. If a loop writes through one pointer and reads through another, the compiler must assume they may **alias** and reload after every store; \`restrict\` promises they do not. A function call inside a loop (\`strlen(s)\` in the condition) must be assumed to have side effects and be re-executed every iteration; hoist it. Accumulating into a memory location (\`*sum += a[i]\`) forces a store per iteration; accumulate in a local and store once. Several independent accumulators let the CPU overlap dependent additions. The 15-213 optimisation lectures walk through these with cycles-per-element numbers at every step.

**Branches** that the predictor cannot learn (data-dependent, 50/50) cost more than a few arithmetic instructions. Expressing \`if (x > t) sum += x\` as \`sum += (x > t) * x\` or with a conditional move eliminates the branch; sorting the data first makes it predictable. Measure: a predictable branch is free, and branchless code can be slower.

Finally, know when to stop. Optimise only what the profile shows, keep the straightforward version in the tests as an oracle, and comment every trick with the measurement that justified it. Reread Drepper's section 6 for the catalogue, then do the exercises, each of which demands a before/after number.`,
          resources: [
            {
              title: 'CMU 15-213 — Code Optimization and Memory Hierarchy lectures (slides and videos)',
              url: 'https://www.cs.cmu.edu/~213/',
              type: 'lecture',
              cost: 'free',
              provider: 'Carnegie Mellon University',
              note: 'The step-by-step optimisation of combine() with measured cycles per element.',
              primary: true,
            },
            {
              title: 'What Every Programmer Should Know About Memory (Ulrich Drepper) — section 6',
              url: 'https://people.freebsd.org/~lstewart/articles/cpumemory.pdf',
              type: 'article',
              cost: 'free',
              provider: 'Ulrich Drepper',
            },
            {
              title: 'Agner Fog — Optimizing software in C++ (applies to C)',
              url: 'https://www.agner.org/optimize/',
              type: 'documentation',
              cost: 'free',
              provider: 'Agner Fog',
              note: 'The optimisation manual chapters on memory access, branches and the costs of operations.',
            },
            {
              title: 'CS:APP Labs — Performance Lab',
              url: 'http://csapp.cs.cmu.edu/3e/labs.html',
              type: 'problem-set',
              cost: 'free',
              provider: 'Carnegie Mellon University',
              note: 'Optimise image rotate and smooth kernels against a provided driver that reports CPE.',
            },
          ],
          exercises: [
            {
              slug: 'aos-vs-soa',
              title: 'Array of structs vs struct of arrays',
              prompt:
                'Define a particle with position (3 floats), velocity (3 floats), mass, and 40 bytes of rarely used metadata. Write an update loop over 10 million particles that only touches position and velocity, as AoS and as SoA. Measure time and L1/LLC misses with perf stat; explain the ratio using bytes fetched per particle. Then show that for a loop touching all fields the gap shrinks.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'remove-blockers',
              title: 'Remove the optimisation blockers',
              prompt:
                'Start from a combine() function that sums an array via a pointer to the result, with strlen-style bounds re-evaluated each iteration and a function call per element. Apply, one at a time: hoisting the bound, inlining, accumulating in a local, restrict on the pointers, 2x and 4x loop unrolling with multiple accumulators. Record cycles per element after each step (as in the 15-213 lectures) and confirm in the assembly what each change allowed.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'branchless-vs-branchy',
              title: 'When is branchless faster?',
              prompt:
                'Implement clamp-and-sum over 50 million ints three ways: with an if, with a conditional expression that compiles to cmov, and with arithmetic masking. Run each on random data and on sorted data, measuring time and branch-misses. Produce a 3x2 table and explain every cell, including any case where the branchy version wins.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why can a struct-of-arrays layout be several times faster than array-of-structs for some loops?',
              answerOutline:
                'Only the fields the loop uses are fetched, so each cache line carries useful data; AoS wastes line bandwidth on untouched fields.',
            },
            {
              question: 'What does restrict promise, and what does it let the compiler do?',
              answerOutline:
                'That the pointed-to memory is accessed only through that pointer (no aliasing), so values can be kept in registers across stores and loops vectorised.',
            },
            {
              question: 'When does converting a branch to branchless code slow things down?',
              answerOutline:
                'When the branch is well predicted: the branch costs nothing while the branchless version always executes the extra arithmetic/both sides.',
            },
          ],
          relatedLessons: ['computer-architecture/performance-pipelining-caches/memory-hierarchy-and-caches'],
        },
      ],
    },
    {
      slug: 'rust-fundamentals',
      title: 'Rust Fundamentals',
      description:
        'Rust as a systems language: the toolchain and Cargo, the core syntax, enums and pattern matching as a replacement for tagged unions, error handling with Result, and traits, generics and the standard collections.',
      lessons: [
        {
          slug: 'rust-syntax-and-cargo',
          title: 'Getting started: Cargo, syntax and the compiler as a teacher',
          summary:
            'Installing Rust, the Cargo workflow (build, run, test, clippy, fmt), variables and types, functions, control flow, and how to read the compiler\'s error messages.',
          estimatedMinutes: 120,
          objectives: [
            'Create, build, run and test a Cargo project and add a dependency from crates.io',
            'Write Rust functions using let, mut, shadowing, tuples, arrays, slices, loops and expressions-as-values',
            'Explain the differences from C in integer semantics (checked overflow in debug, explicit casts, no implicit conversions)',
            'Use rustc error messages, rustfmt and clippy as part of the normal workflow',
          ],
          concepts: [
            'rustup, cargo new/build/run/test, Cargo.toml, crates',
            'Immutability by default; mut; shadowing',
            'Scalar types, tuples, arrays, slices, String vs &str',
            'Expressions vs statements; blocks return values',
            'if/match/loop/while/for and ranges',
            'Integer overflow: panic in debug, wrap in release; wrapping_/checked_ methods',
            'No implicit numeric conversion; as casts',
            'clippy and rustfmt',
          ],
          explanation: `Rust gives you C's control over memory and layout with a compiler that refuses to build programs that would have memory errors or data races. The price is that you must satisfy the compiler, and the first weeks feel like an argument with it. Treat its messages as a tutor: they are unusually precise, often include the fix, and \`rustc --explain E0502\` gives a full page on any error code.

**Cargo** is the build system, package manager and test runner in one. \`cargo new hello\` creates a project; \`cargo run\` builds and runs; \`cargo test\` runs \`#[test]\` functions; \`cargo clippy\` lints; \`cargo fmt\` formats. Dependencies are declared in \`Cargo.toml\` and fetched from crates.io. After Make and CMake this will feel like a gift.

The syntax is C-like with differences that matter. Variables are **immutable** unless \`mut\`; **shadowing** lets you rebind a name with a new type (\`let x = x.parse::<i32>()?\`). Types are inferred but explicit at function boundaries. **Blocks are expressions**: the last expression without a semicolon is the value, so \`let y = if c { 1 } else { 2 };\` and functions return their final expression. \`match\` must be exhaustive. Arrays have a compile-time length; **slices** \`&[T]\` are a pointer plus length, the safe version of C's pointer-and-count pair, bounds-checked on every index. \`String\` is an owned, growable UTF-8 buffer; \`&str\` is a borrowed slice of one.

Integer semantics are stricter than C. There is **no implicit conversion** between numeric types: adding an \`i32\` to a \`u64\` is a compile error, and you cast with \`as\` (which truncates, like C) or convert with \`From\`/\`TryFrom\`. Overflow **panics in debug builds** and wraps in release; when you want a specific behaviour, say so with \`wrapping_add\`, \`checked_add\` or \`saturating_add\`. Division by zero panics. Every rule you learned about C's UB in module 5 has become either a compile error or a defined panic.

Install via rustup, read The Book chapters 1-3, do the first batch of Rustlings exercises (variables, functions, if, primitive types), and port a C program from module 1.`,
          resources: [
            {
              title: 'The Rust Programming Language (The Book) — chapters 1-3',
              url: 'https://doc.rust-lang.org/book/',
              type: 'textbook',
              cost: 'free',
              provider: 'Rust Project',
              primary: true,
            },
            {
              title: 'Rustlings — small exercises to get used to Rust',
              url: 'https://github.com/rust-lang/rustlings',
              type: 'problem-set',
              cost: 'free',
              provider: 'Rust Project',
              note: 'Do the intro, variables, functions, if and primitive_types sections for this lesson.',
            },
            {
              title: 'Rust by Example — Hello World, Primitives, Custom Types, Flow Control',
              url: 'https://doc.rust-lang.org/rust-by-example/',
              type: 'textbook',
              cost: 'free',
              provider: 'Rust Project',
            },
            {
              title: 'The Cargo Book',
              url: 'https://doc.rust-lang.org/cargo/',
              type: 'documentation',
              cost: 'free',
              provider: 'Rust Project',
            },
          ],
          exercises: [
            {
              slug: 'cargo-first-project',
              title: 'First Cargo project with tests',
              prompt:
                'Create a Cargo project that converts temperatures (the module-1 C exercise) reading start/end/step from std::env::args, validating with proper error messages and exit code 2. Write three #[test] functions, run cargo test, cargo clippy and cargo fmt, and fix every lint. Add the "anyhow" crate as a dependency and use it for error context.',
              kind: 'coding',
              difficulty: 1,
            },
            {
              slug: 'overflow-semantics',
              title: 'Integer semantics, Rust vs C',
              prompt:
                'Write a Rust program that computes i32::MAX + 1 in a debug build (observe the panic), in a release build (observe the wrap), and with checked_add, wrapping_add and saturating_add. Then show that 300_i32 as u8 truncates and that u8::try_from(300) fails. Compare each case with the equivalent C behaviour from module 5 in a short table.',
              kind: 'coding',
              difficulty: 1,
            },
            {
              slug: 'rustlings-batch-1',
              title: 'Rustlings: the basics',
              prompt:
                'Complete the Rustlings sections intro, variables, functions, if, primitive_types and vecs. For each compiler error you hit, write one line noting the error code and what the message told you to do; keep this log, it becomes your personal Rust FAQ.',
              kind: 'coding',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'What happens on integer overflow in Rust, in debug and release builds?',
              answerOutline:
                'Debug: panic. Release: two\'s complement wrap. Explicit methods (checked_, wrapping_, saturating_) give defined behaviour in both.',
            },
            {
              question: 'What is the difference between String and &str?',
              answerOutline:
                'String is an owned, heap-allocated, growable UTF-8 buffer; &str is a borrowed view (pointer + length) into string data, e.g. a literal or a slice of a String.',
            },
            {
              question: 'Why does let y = if c { 1 } else { "2" }; not compile?',
              answerOutline:
                'if is an expression; both branches must have the same type (i32 vs &str here).',
            },
          ],
        },
        {
          slug: 'enums-pattern-matching-and-error-handling',
          title: 'Structs, enums, pattern matching and error handling',
          summary:
            'Structs with impl blocks, enums that carry data, exhaustive match, Option and Result, the ? operator, and the Rust philosophy of making invalid states unrepresentable.',
          estimatedMinutes: 150,
          objectives: [
            'Define structs and enums with data and implement methods and associated functions on them',
            'Use match, if let and while let with patterns including destructuring, guards and bindings',
            'Handle absence with Option and failure with Result, propagating with ? and converting errors',
            'Decide when to panic and when to return an error, and design error types for a library',
          ],
          concepts: [
            'struct, impl, self/&self/&mut self, associated functions',
            'enum variants with data; the tagged union made safe',
            'match exhaustiveness; patterns, guards, @ bindings',
            'Option<T> and Result<T, E>',
            'The ? operator and From conversions',
            'panic! vs recoverable errors; unwrap and expect',
            'Box<dyn Error>, custom error enums, thiserror/anyhow',
            'Making invalid states unrepresentable',
          ],
          explanation: `C expressed "a value that is one of several kinds" with a tagged union, and nothing stopped you reading the wrong member. Rust's **enum** is a tagged union the compiler enforces: \`enum Shape { Circle { r: f64 }, Rect { w: f64, h: f64 } }\`, and the only way to get at the data is a **match** that must handle every variant. Add a variant and every match in the program fails to compile until updated. **Structs** hold named fields and gain behaviour through \`impl\` blocks; methods take \`&self\` (read), \`&mut self\` (modify) or \`self\` (consume), an explicit version of the ownership rules in module 7.

**Patterns** go far beyond C's switch: destructure tuples and structs, match ranges, add guards (\`Some(n) if n > 0\`), bind sub-patterns with \`@\`, and use \`if let\` when only one case matters.

Two enums carry the language. \`Option<T>\` is \`Some(T)\` or \`None\`: there is no null, so a value that might be absent is a different type from one that is present, and the compiler makes you check. \`Result<T, E>\` is \`Ok(T)\` or \`Err(E)\`: functions that can fail say so in their signature, and callers cannot ignore it (an unused Result is a warning). The \`?\` operator unwraps an \`Ok\` or returns the \`Err\` from the current function, converting the error type with \`From\` along the way; it turns the C pattern "check return, propagate, cleanup" into one character with no cleanup needed, because destructors run automatically.

The design rule is to **panic** only for bugs (an index that cannot be out of range, an invariant violated) and return \`Result\` for everything the caller might reasonably handle (file not found, parse error). \`unwrap()\` converts an error to a panic and is fine in tests and prototypes; in library code prefer \`expect("why this cannot fail")\` or proper propagation. For applications, the \`anyhow\` crate gives a convenient catch-all error with context; for libraries, define an error enum (the \`thiserror\` crate removes the boilerplate).

Read The Book chapters 5, 6 and 9, do Rustlings structs/enums/options/error_handling, and port your C tagged-union shapes and the \`parse_int\` cursor function.`,
          resources: [
            {
              title: 'The Rust Programming Language — chapters 5 (Structs), 6 (Enums and Pattern Matching), 9 (Error Handling)',
              url: 'https://doc.rust-lang.org/book/',
              type: 'textbook',
              cost: 'free',
              provider: 'Rust Project',
              primary: true,
            },
            {
              title: 'Rustlings — structs, enums, options, error_handling',
              url: 'https://github.com/rust-lang/rustlings',
              type: 'problem-set',
              cost: 'free',
              provider: 'Rust Project',
            },
            {
              title: 'Rust by Example — Error handling',
              url: 'https://doc.rust-lang.org/rust-by-example/',
              type: 'textbook',
              cost: 'free',
              provider: 'Rust Project',
              note: 'The chapter on error handling walks from unwrap through ? to custom error types.',
            },
            {
              title: 'std::option and std::result documentation',
              url: 'https://doc.rust-lang.org/std/option/',
              type: 'documentation',
              cost: 'free',
              provider: 'Rust Project',
              note: 'Learn the combinators: map, and_then, unwrap_or, ok_or, transpose.',
            },
          ],
          exercises: [
            {
              slug: 'shapes-enum',
              title: 'Shapes as an enum',
              prompt:
                'Port the C tagged-union shapes to a Rust enum with area() and perimeter() methods via match. Add a Polygon variant holding a Vec of points and show that the compiler forces you to update every match. Write tests comparing against the C program\'s output on the same inputs.',
              kind: 'coding',
              difficulty: 1,
            },
            {
              slug: 'parser-with-result',
              title: 'A parser with Result and ?',
              prompt:
                'Write fn parse_int(input: &str) -> Result<(i64, &str), ParseError> that returns the parsed value and the remaining input, with a ParseError enum (Empty, InvalidDigit { position }, Overflow). Build parse_list on top of it using ? to propagate errors, and implement std::error::Error and Display for ParseError. Test every error variant.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'config-loader',
              title: 'Load a config file with layered errors',
              prompt:
                'Write a program that reads a key=value config file into a struct, returning errors for a missing file, a malformed line (with line number), a missing required key and an unparsable number. Implement it twice: with Box<dyn Error> and with anyhow with .context(). Compare the error messages a user sees for each failure.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'How does a Rust enum improve on a C tagged union?',
              answerOutline:
                'The tag and payload are inseparable, access requires a match that must cover every variant, and adding a variant is a compile error everywhere it is unhandled.',
            },
            {
              question: 'What does the ? operator do?',
              answerOutline:
                'On Ok/Some it yields the inner value; on Err/None it returns early from the function with that error (converted via From if needed).',
            },
            {
              question: 'When is it appropriate to panic rather than return a Result?',
              answerOutline:
                'When the failure indicates a bug or broken invariant the caller cannot meaningfully handle; recoverable, expected failures should be Results.',
            },
          ],
        },
        {
          slug: 'traits-generics-and-collections',
          title: 'Traits, generics, closures and the standard collections',
          summary:
            'Traits as interfaces, generic functions with bounds, trait objects, closures and iterators, and Vec, HashMap and friends compared with the C versions you wrote.',
          estimatedMinutes: 150,
          objectives: [
            'Define and implement traits, and write generic functions and structs with trait bounds',
            'Explain monomorphisation vs dynamic dispatch (dyn Trait) and the cost of each',
            'Use closures and iterator adapters (map, filter, fold, collect) idiomatically and know they compile to loops',
            'Choose and use Vec, VecDeque, HashMap, BTreeMap and HashSet, and relate them to your C implementations',
          ],
          concepts: [
            'Traits and impl Trait for Type; default methods',
            'Generics with bounds; where clauses',
            'Monomorphisation (static dispatch) vs dyn Trait (vtables)',
            'Derive: Debug, Clone, PartialEq, Hash, Default',
            'Closures and the Fn/FnMut/FnOnce traits',
            'Iterator trait, adapters, laziness, collect',
            'Vec, VecDeque, HashMap, BTreeMap, HashSet',
            'Entry API and ownership of keys',
          ],
          explanation: `A **trait** is a set of methods a type can implement; it is the interface concept that C expressed with tables of function pointers. \`impl Display for Shape\` makes shapes printable; \`#[derive(Debug, Clone, PartialEq)]\` generates common implementations. A **generic** function \`fn largest<T: PartialOrd>(xs: &[T]) -> &T\` works for any type with the bound; the compiler **monomorphises** it, generating a specialised copy per concrete type, so generic code is as fast as hand-written code and the comparator is inlined, unlike \`qsort\`'s indirect call. When you need runtime polymorphism (a \`Vec\` of mixed shapes), use a **trait object** \`Box<dyn Shape>\`, which carries a vtable pointer; the cost is one indirection per call and no inlining, the same as C's function-pointer tables but type-checked.

**Closures** are anonymous functions that capture variables from their scope; the compiler picks \`Fn\`, \`FnMut\` or \`FnOnce\` by how the body uses the captures. They are the natural argument to \`sort_by_key\`, to thread spawning and to **iterators**. The \`Iterator\` trait has one required method, \`next()\`, and dozens of provided adapters: \`map\`, \`filter\`, \`zip\`, \`enumerate\`, \`take_while\`, \`fold\`, \`sum\`. Adapters are **lazy**; nothing runs until a consumer such as \`collect()\` or a \`for\` loop pulls values. The chain compiles to the same machine code as a hand-written loop, often better, because bounds checks are elided. Prefer iterators to index loops; the borrow checker (module 7) will thank you.

The **collections** are what you built in C, now with ownership tracked. \`Vec<T>\` is your growable vector (contiguous, amortised doubling). \`VecDeque\` is a ring buffer. \`HashMap<K, V>\` is a SipHash-based open-addressing table with the **entry API** (\`map.entry(k).or_insert(0) += 1\`) that avoids the double lookup your C code needed. \`BTreeMap\` keeps keys sorted. A map owns its keys and values; inserting a \`String\` moves it in, and lookups accept a \`&str\` thanks to the \`Borrow\` trait.

Read The Book chapters 8, 10 and 13, do Rustlings traits/generics/iterators/hashmaps, and reimplement the word-frequency counter: it becomes ten lines.`,
          resources: [
            {
              title: 'The Rust Programming Language — chapters 8 (Collections), 10 (Generics, Traits, Lifetimes), 13 (Closures and Iterators)',
              url: 'https://doc.rust-lang.org/book/',
              type: 'textbook',
              cost: 'free',
              provider: 'Rust Project',
              primary: true,
            },
            {
              title: 'Rustlings — traits, generics, iterators, hashmaps, vecs',
              url: 'https://github.com/rust-lang/rustlings',
              type: 'problem-set',
              cost: 'free',
              provider: 'Rust Project',
            },
            {
              title: 'std::collections documentation — when to use which collection',
              url: 'https://doc.rust-lang.org/std/collections/',
              type: 'documentation',
              cost: 'free',
              provider: 'Rust Project',
              note: 'The module docs include a decision guide and complexity table.',
            },
            {
              title: 'Rust by Example — Traits, Generics, Closures, Iterators',
              url: 'https://doc.rust-lang.org/rust-by-example/',
              type: 'textbook',
              cost: 'free',
              provider: 'Rust Project',
            },
          ],
          exercises: [
            {
              slug: 'word-frequency-rust',
              title: 'Word frequency in Rust',
              prompt:
                'Reimplement the module-1 word frequency counter using BufRead lines, split on non-alphanumerics, a HashMap<String, usize> with the entry API, and a sort of the top 10. Benchmark against your C version with hyperfine on a 100 MB text; then try the HashMap with the fxhash or ahash crate and measure again.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'static-vs-dynamic-dispatch',
              title: 'Measure monomorphisation vs trait objects',
              prompt:
                'Define trait Shape with area(). Compute the total area of 10 million shapes stored as (a) an enum, (b) Vec<Box<dyn Shape>>, (c) separate Vec<Circle> and Vec<Rect> summed with a generic fn total<T: Shape>(&[T]). Measure each with a proper harness, inspect the assembly for (c) to confirm inlining, and explain the ordering.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'iterator-pipeline',
              title: 'An iterator pipeline vs the loop',
              prompt:
                'Compute the sum of squares of odd numbers below 10 million that are not divisible by 7, once with a for loop and once with an iterator chain (filter/map/sum). Show cargo bench or a harness result that they are equivalent in speed, and view both in Compiler Explorer (rustc -O) to confirm the chain compiled to a loop. Then implement your own Iterator (a Fibonacci struct) and use take_while on it.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What is monomorphisation and what does it trade?',
              answerOutline:
                'The compiler emits a specialised copy of generic code per concrete type: fast (inlining, no indirection) but larger binaries and longer compile times.',
            },
            {
              question: 'When do you need Box<dyn Trait> instead of generics?',
              answerOutline:
                'When the concrete type varies at runtime within one collection or is unknown at compile time (plugins, heterogeneous lists).',
            },
            {
              question: 'Why does map.entry(key).or_insert(0) beat the C pattern of lookup-then-insert?',
              answerOutline:
                'It hashes and probes once, returning a reference to the existing or newly inserted slot, instead of two lookups.',
            },
          ],
        },
      ],
    },
    {
      slug: 'ownership-and-safe-concurrency',
      title: 'Ownership and Safe Concurrency',
      description:
        'The ideas that make Rust Rust: ownership and moves, borrowing rules, lifetimes and smart pointers, threads with Send and Sync, and the escape hatch of unsafe and FFI to C.',
      lessons: [
        {
          slug: 'ownership-and-borrowing',
          title: 'Ownership, moves and borrowing',
          summary:
            'Every value has one owner; moves, Copy and Clone; shared and exclusive references and the aliasing rule that prevents every C memory bug you met in module 2.',
          estimatedMinutes: 150,
          objectives: [
            'State the three ownership rules and predict when a value is moved, copied or dropped',
            'Explain the borrowing rule (any number of & or exactly one &mut) and why it prevents use-after-free, iterator invalidation and data races',
            'Fix common borrow-checker errors (E0382 use after move, E0499/E0502 conflicting borrows) by restructuring code',
            'Map each C heap bug from module 2 to the Rust rule that makes it impossible',
          ],
          concepts: [
            'Ownership: one owner, dropped at scope end (RAII)',
            'Move semantics; Copy and Clone',
            'Shared references & and exclusive references &mut',
            'Aliasing XOR mutability',
            'Borrow scope and non-lexical lifetimes',
            'Slices as borrowed views',
            'Drop and deterministic destruction',
            'Mapping C bugs to compile errors',
          ],
          explanation: `Module 2 asked you to write down, for every pointer, who owns it and when it is freed. Rust makes that comment a type. The **ownership rules**: each value has exactly one owner; when the owner goes out of scope the value is **dropped** (its destructor runs, freeing memory, closing files); assigning or passing a value **moves** ownership, after which the old name is unusable. Types that are plain bits (integers, \`&T\`) are **Copy** and are duplicated instead; anything else needs an explicit \`.clone()\`. This is RAII with the compiler checking that nothing is used after it is moved, so double free and use-after-free cannot be written.

To use a value without taking it, you **borrow** it. \`&T\` is a shared reference, \`&mut T\` an exclusive one, and the rule is **aliasing XOR mutability**: at any point you may have any number of shared references *or* exactly one exclusive reference, never both. A reference may not outlive the value it points to. These two rules, enforced at compile time, rule out dangling pointers, iterator invalidation (you cannot push to a Vec while holding a reference into it), and, combined with the thread rules in a later lesson, data races.

The borrow checker's errors are the Rust learning curve. \`E0382\` "use of moved value": you passed a \`String\` to a function and used it afterwards; pass \`&s\` instead, or clone, or have the function return it. \`E0502\` "cannot borrow as mutable because it is also borrowed as immutable": a reference is still alive; shorten its scope, or restructure so the mutation happens after the read is done. Since non-lexical lifetimes, a borrow ends at its last use, not at the closing brace, which makes most straightforward code compile. When fighting the checker, ask what the aliasing situation really is; the code it rejects is usually code whose C equivalent was subtly wrong.

Read The Book chapter 4 slowly, twice. Do Rustlings move_semantics and the borrowing exercises, and for each bug in your module-2 "bug zoo", write the Rust equivalent and record the compiler error that stops it.`,
          resources: [
            {
              title: 'The Rust Programming Language — chapter 4: Understanding Ownership',
              url: 'https://doc.rust-lang.org/book/',
              type: 'textbook',
              cost: 'free',
              provider: 'Rust Project',
              primary: true,
            },
            {
              title: 'Rustlings — move_semantics, strings, and the borrowing exercises',
              url: 'https://github.com/rust-lang/rustlings',
              type: 'problem-set',
              cost: 'free',
              provider: 'Rust Project',
            },
            {
              title: 'Rust by Example — Scoping rules (RAII, ownership and moves, borrowing)',
              url: 'https://doc.rust-lang.org/rust-by-example/',
              type: 'textbook',
              cost: 'free',
              provider: 'Rust Project',
            },
            {
              title: 'Learn Rust With Entirely Too Many Linked Lists',
              url: 'https://rust-unofficial.github.io/too-many-lists/',
              type: 'textbook',
              cost: 'free',
              provider: 'Alexis Beingessner',
              note: 'The first chapters show the borrow checker rejecting the naive linked list and why; perfect after module 2.',
            },
          ],
          exercises: [
            {
              slug: 'bug-zoo-in-rust',
              title: 'The bug zoo, rejected',
              prompt:
                'For each of the five C heap bugs from module 2 (leak, double free, use-after-free, overflow, uninitialised read) and the dangling-local bug from the memory-layout lesson, write the most direct Rust translation and record whether it fails to compile (with the error code), panics at runtime, or is simply impossible to express. For the leak, show that Rust prevents accidental leaks but permits deliberate ones (Box::leak, mem::forget).',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'borrow-checker-fixes',
              title: 'Fix ten borrow-checker errors',
              prompt:
                'Take ten snippets that fail (e.g. pushing to a Vec while iterating it; returning a reference to a local String; two &mut into the same Vec via indexing; using a String after passing it to a function; modifying a HashMap value while holding a reference from get). For each, read the full compiler message, apply the suggested fix or a restructuring (split_at_mut, cloning, scoping, returning ownership), and explain what aliasing problem the original had.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'vector-and-list-in-rust',
              title: 'Vec from scratch and the first linked list',
              prompt:
                'Follow the first two chapters of Too Many Linked Lists to build a singly linked stack with Box, then implement push/pop/peek/iter and tests. Then write a growable vector type over a Vec<T> (not raw pointers yet) with the same API as your C vec_t, and note which C functions became unnecessary because of Drop.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'State the borrowing rule and name two C bugs it prevents.',
              answerOutline:
                'Any number of shared references or exactly one mutable reference at a time, and no reference outlives its referent. Prevents use-after-free/dangling pointers and iterator invalidation (and data races with threads).',
            },
            {
              question: 'What is the difference between a move and a Copy?',
              answerOutline:
                'A move transfers ownership and invalidates the source; Copy types (plain bits, no destructor) are duplicated bitwise and the source remains usable.',
            },
            {
              question: 'Why does the compiler reject v.push(x) while a reference into v is alive?',
              answerOutline:
                'push may reallocate, dangling the reference; the exclusive borrow for push conflicts with the existing shared borrow.',
            },
          ],
        },
        {
          slug: 'lifetimes-and-smart-pointers',
          title: 'Lifetimes and smart pointers',
          summary:
            'Lifetime annotations and elision, structs holding references, and the heap tools Box, Rc, RefCell and Arc with their rules and costs.',
          estimatedMinutes: 150,
          objectives: [
            'Explain what a lifetime parameter means and write functions and structs with explicit lifetimes when elision fails',
            'Use Box for heap allocation and recursive types, Rc for shared ownership, and RefCell for interior mutability, knowing the runtime cost',
            'Explain why Rc<RefCell<T>> cycles leak and when Weak is needed',
            'Choose between references, Box, Rc and Arc for a design and justify the choice',
          ],
          concepts: [
            'Lifetime parameters: a relation between references, not a duration you choose',
            'Elision rules; the \'static lifetime',
            'Structs with reference fields',
            'Box<T>: owned heap pointer; recursive types',
            'Rc<T>: reference counting, Clone increments',
            'RefCell<T>: borrow rules checked at runtime; panics on violation',
            'Weak<T> and reference cycles',
            'Deref and Drop traits',
          ],
          explanation: `A **lifetime** is the compiler's name for the scope during which a reference is valid. Most of the time it infers them (**elision**): a function with one reference parameter returns references tied to it. When a function takes two references and returns one, the compiler cannot guess which it is tied to, so you say: \`fn longest<'a>(x: &'a str, y: &'a str) -> &'a str\`. This does not *set* a lifetime; it states a constraint ("the result lives no longer than the shorter of the inputs") that the checker verifies at every call site. A struct holding a reference must declare it, \`struct Parser<'a> { input: &'a str }\`, which prevents the struct outliving the text it parses, the exact bug your C parser could have. \`'static\` means "lives for the whole program", as string literals do.

When ownership by a single variable is not enough, the standard library offers **smart pointers**, each with a precise contract. \`Box<T>\` is a single-owner heap pointer; it is how you build recursive types (\`enum List { Cons(i32, Box<List>), Nil }\`) and trait objects. \`Rc<T>\` adds **reference counting** for shared ownership within one thread: \`Rc::clone\` increments a counter, drop decrements, and the value is freed at zero. \`Rc\` gives only shared access; to mutate through it you need **interior mutability**, \`RefCell<T>\`, which moves the borrow rules to runtime: \`borrow()\` and \`borrow_mut()\` check the aliasing rule dynamically and **panic** on violation. \`Rc<RefCell<T>>\` is the idiom for graph-like structures, and it has a cost: a counter check per borrow and, worse, **cycles** that reference counting cannot free. Break cycles with \`Weak<T>\`, a non-owning pointer that must be upgraded before use. \`Arc<T>\` is \`Rc\` with atomic counting for use across threads (next lesson).

The design heuristic: prefer plain ownership and borrowing; reach for \`Box\` when you need the heap or indirection; for \`Rc<RefCell>\` only when the data is genuinely shared and mutated, and consider indices into a \`Vec\` (an arena) as a simpler alternative for graphs. Read The Book chapters 10.3 and 15, then the exercises, including the doubly linked list that shows why \`Rc<RefCell>\` is a last resort.`,
          resources: [
            {
              title: 'The Rust Programming Language — chapter 10.3 (Lifetimes) and chapter 15 (Smart Pointers)',
              url: 'https://doc.rust-lang.org/book/',
              type: 'textbook',
              cost: 'free',
              provider: 'Rust Project',
              primary: true,
            },
            {
              title: 'Rustlings — lifetimes, box, rc, cow, arc',
              url: 'https://github.com/rust-lang/rustlings',
              type: 'problem-set',
              cost: 'free',
              provider: 'Rust Project',
            },
            {
              title: 'Learn Rust With Entirely Too Many Linked Lists — the Rc/RefCell doubly linked list',
              url: 'https://rust-unofficial.github.io/too-many-lists/',
              type: 'textbook',
              cost: 'free',
              provider: 'Alexis Beingessner',
            },
            {
              title: 'std::rc and std::cell documentation',
              url: 'https://doc.rust-lang.org/std/rc/',
              type: 'documentation',
              cost: 'free',
              provider: 'Rust Project',
            },
          ],
          exercises: [
            {
              slug: 'lifetime-parser',
              title: 'A zero-copy tokenizer with lifetimes',
              prompt:
                'Write a Tokenizer<\'a> over a &\'a str that yields Token<\'a> values borrowing slices of the input (no String allocations). Implement Iterator for it. Write a test that tries to keep a token after the input String is dropped and record the compiler error. Then benchmark against a version that allocates a String per token on a 50 MB input.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'rc-refcell-tree',
              title: 'A tree with parent pointers',
              prompt:
                'Build a tree where each node holds Rc<RefCell<Node>> children and a Weak parent pointer. Implement add_child, depth (walking parents) and a count of live nodes via Rc::strong_count. Demonstrate the leak when parent is an Rc instead of Weak (strong counts never reach zero), using a Drop impl that prints. Then re-implement the same tree as an arena (Vec<Node> with usize indices) and compare code size and runtime.',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'refcell-panic',
              title: 'RefCell violations at runtime',
              prompt:
                'Write a program that holds a borrow() of a RefCell and then calls borrow_mut() in a function it invokes, producing the "already borrowed" panic. Explain why the compiler could not catch it, then restructure so the borrow is released first. Measure the overhead of RefCell borrow checks in a tight loop versus a plain &mut.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What does fn f<\'a>(x: &\'a str, y: &str) -> &\'a str tell the compiler?',
              answerOutline:
                'The returned reference borrows from x (not y), so it is valid as long as x is; callers may drop y immediately after the call.',
            },
            {
              question: 'What does RefCell give you and what does it cost?',
              answerOutline:
                'Mutation through a shared reference with the aliasing rule checked at runtime; the cost is a flag check per borrow and a panic (instead of a compile error) on violation.',
            },
            {
              question: 'Why do Rc cycles leak, and what is the fix?',
              answerOutline:
                'Each node keeps the other\'s count above zero so neither is dropped. Make one direction Weak (non-owning).',
            },
          ],
        },
        {
          slug: 'fearless-concurrency',
          title: 'Fearless concurrency: threads, channels, Mutex and atomics',
          summary:
            'Spawning threads, moving data into them, message passing with channels, shared state with Arc<Mutex<T>>, atomics, and how Send and Sync make data races a compile error.',
          estimatedMinutes: 180,
          objectives: [
            'Spawn threads with move closures and scoped threads, and join them',
            'Share state safely with Arc<Mutex<T>> and RwLock, and communicate with mpsc channels',
            'Explain Send and Sync and why Rc, RefCell and raw pointers are excluded',
            'Use atomics with the right memory ordering for counters and flags, and measure contention',
          ],
          concepts: [
            'std::thread::spawn, join, move closures, thread::scope',
            'Send and Sync marker traits',
            'Arc<Mutex<T>>; lock guards and poisoning',
            'RwLock; deadlock is still possible',
            'mpsc channels; ownership transfer by message',
            'Atomics and Ordering (Relaxed, Acquire/Release, SeqCst)',
            'Data race vs race condition',
            'Contention and false sharing in Rust',
          ],
          explanation: `A **data race** is two threads accessing the same memory concurrently, at least one writing, with no synchronisation; in C it is undefined behaviour and the source of the hardest bugs you will ever chase. Rust makes it a **compile error**, using the same ownership rules as before plus two marker traits. \`Send\` means a type may be moved to another thread; \`Sync\` means \`&T\` may be shared between threads. The compiler derives them automatically, and crucially does *not* derive them for \`Rc\` (non-atomic counts) or \`RefCell\` (non-atomic borrow flag) or raw pointers. So \`thread::spawn\` refuses a closure that captures an \`Rc\`, and the only way to share mutable state is through types designed for it.

**Message passing** is the first choice: an \`mpsc::channel()\` gives a \`Sender\` (cloneable, so many producers) and a \`Receiver\`; sending a value moves it, so after a worker sends a result it cannot touch it again, which is exactly the discipline pipes gave you between processes. **Shared state** uses \`Arc<Mutex<T>>\`: \`Arc\` for atomically counted shared ownership across threads, \`Mutex\` so that mutation requires acquiring the lock, which returns a guard that dereferences to \`&mut T\` and unlocks on drop. You cannot forget to unlock, and you cannot access the data without locking, because the data lives *inside* the mutex. \`RwLock\` allows many readers or one writer. Deadlock, however, remains possible (lock ordering is still your job), and a thread panicking while holding a lock **poisons** it so others get an error rather than corrupted data. \`thread::scope\` lets threads borrow stack data because it guarantees they are joined before the scope ends.

**Atomics** (\`AtomicUsize\`, \`AtomicBool\`) give lock-free counters and flags. The \`Ordering\` argument is the memory-consistency question from the architecture subject: \`Relaxed\` for a pure counter, \`Release\`/\`Acquire\` to publish data written before a flag, \`SeqCst\` when unsure. Mara Bos's free book is the definitive explanation.

Read The Book chapter 16, then Rust Atomics and Locks chapters 1-3. The exercises reproduce the false-sharing and contention measurements from earlier modules, now with the compiler guaranteeing you did not race.`,
          resources: [
            {
              title: 'The Rust Programming Language — chapter 16: Fearless Concurrency',
              url: 'https://doc.rust-lang.org/book/',
              type: 'textbook',
              cost: 'free',
              provider: 'Rust Project',
              primary: true,
            },
            {
              title: 'Rust Atomics and Locks (Mara Bos) — free online',
              url: 'https://marabos.nl/atomics/',
              type: 'textbook',
              cost: 'free',
              provider: 'Mara Bos / O\'Reilly',
              note: 'Chapters 1-3 for this lesson (basics, atomics, memory ordering); chapters 4-9 build locks from scratch.',
            },
            {
              title: 'Rustlings — threads, arc, smart_pointers',
              url: 'https://github.com/rust-lang/rustlings',
              type: 'problem-set',
              cost: 'free',
              provider: 'Rust Project',
            },
            {
              title: 'std::sync documentation',
              url: 'https://doc.rust-lang.org/std/sync/',
              type: 'documentation',
              cost: 'free',
              provider: 'Rust Project',
            },
          ],
          exercises: [
            {
              slug: 'counter-three-ways',
              title: 'A shared counter three ways',
              prompt:
                'Increment a counter 10 million times from 8 threads with (a) Arc<Mutex<u64>>, (b) AtomicU64 with Relaxed, and (c) per-thread local counters summed at join. Measure each. Then attempt a version with Rc<RefCell<u64>> and paste the compiler error explaining why it is rejected. Finally, reproduce the false-sharing experiment: 8 atomics adjacent vs padded to 64 bytes.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'worker-pool-channels',
              title: 'A worker pool with channels',
              prompt:
                'Build a thread pool of N workers that receive jobs (boxed closures) over a channel and send results back over another. Use it to hash 10,000 files (or compute 10,000 expensive functions), compare throughput for N = 1, 2, 4, 8, and show graceful shutdown by dropping the sender. Explain how ownership of each job moves through the system.',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'acquire-release-flag',
              title: 'Publishing data with Acquire/Release',
              prompt:
                'One thread writes a large array then sets an AtomicBool ready flag; another spins until ready and reads the array. Implement with Release/Acquire and explain why Relaxed would be wrong even though it may appear to work on x86. Then implement a spin lock from an AtomicBool following Rust Atomics and Locks chapter 4, and compare it with std Mutex under contention.',
              kind: 'coding',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'What do Send and Sync mean, and why is Rc neither?',
              answerOutline:
                'Send: safe to move to another thread; Sync: safe to share by reference across threads. Rc uses non-atomic reference counting, so concurrent clones/drops would race.',
            },
            {
              question: 'Why can you not forget to unlock a Mutex in Rust?',
              answerOutline:
                'lock() returns a guard; the data is accessible only through it and the lock is released when the guard is dropped (RAII).',
            },
            {
              question: 'What ordering do you need to publish data via a flag, and why?',
              answerOutline:
                'Release on the store, Acquire on the load: this guarantees writes before the store are visible after the load. Relaxed gives no such ordering.',
            },
          ],
          relatedLessons: [
            'operating-systems/concurrency/threads-and-races',
            'operating-systems/concurrency/locks',
          ],
        },
        {
          slug: 'unsafe-rust-and-ffi',
          title: 'Unsafe Rust and FFI with C',
          summary:
            'What unsafe permits and what it does not, raw pointers, calling C from Rust and Rust from C, wrapping libc system calls safely, and building a sound abstraction over an unsafe core.',
          estimatedMinutes: 150,
          objectives: [
            'List the five unsafe superpowers and explain that unsafe does not disable the borrow checker',
            'Call C functions through extern "C" blocks and the libc crate, handling C strings and errno',
            'Expose a Rust function to C with #[no_mangle] and a C-compatible ABI',
            'Design a safe API over an unsafe implementation and document its invariants',
          ],
          concepts: [
            'The unsafe keyword and its five capabilities',
            'Raw pointers *const T / *mut T; null and dereferencing',
            'extern "C", #[repr(C)], #[no_mangle]',
            'The libc crate; CString and CStr; errno',
            'Soundness: a safe API must be impossible to misuse',
            'Undefined behaviour exists in unsafe Rust too (Miri)',
            'Wrapping fork/exec/pipe for the capstone shell',
            'bindgen and cbindgen (overview)',
          ],
          explanation: `Everything in the standard library that touches memory directly, \`Vec\`, \`Mutex\`, \`Rc\`, is implemented with **unsafe** code wrapped in a safe interface. \`unsafe\` is not a switch that turns Rust into C: the borrow checker still runs, types are still checked. It unlocks exactly five things: dereferencing raw pointers, calling unsafe functions (including all foreign functions), accessing mutable statics, implementing unsafe traits, and accessing union fields. Inside an \`unsafe\` block the compiler trusts *you* to uphold the invariants it normally checks, and if you do not, the result is undefined behaviour exactly as in C. The **Miri** interpreter can detect many such violations in tests.

**Raw pointers** \`*const T\` and \`*mut T\` are C pointers: nullable, unchecked, freely aliasable. Creating them is safe; dereferencing them is unsafe. They are what you need to implement a data structure the borrow checker cannot express directly (the later chapters of Too Many Linked Lists), and what you receive from C.

**FFI** is where Rust meets the C and Unix world you spent five modules in. An \`extern "C" { fn strlen(s: *const c_char) -> size_t; }\` block declares a C function; calling it is unsafe. The \`libc\` crate declares the whole POSIX API, so \`libc::fork()\`, \`libc::execvp\`, \`libc::pipe\` and \`libc::waitpid\` are available; the **nix** crate wraps many of them in safe, Result-returning functions. Strings need care: Rust \`String\`s are not NUL-terminated, so convert with \`CString::new\` to pass to C and \`CStr::from_ptr\` to read from C. Structs passed to C need \`#[repr(C)]\` for a C-compatible layout. Going the other way, \`#[no_mangle] pub extern "C" fn\` makes a Rust function callable from C, and \`cargo build\` can produce a static or shared library; \`cbindgen\` generates the header, \`bindgen\` generates Rust declarations from C headers.

The discipline that makes this work is **soundness**: a safe function must be impossible to misuse from safe code, whatever arguments it receives. Each \`unsafe\` block gets a comment stating which invariant makes it correct. Read The Book chapter 19.1, the Rustonomicon introduction, and the libc/nix docs; the exercises wrap exactly the system calls the Rust shell in the capstone needs.`,
          resources: [
            {
              title: 'The Rust Programming Language — chapter 19.1: Unsafe Rust',
              url: 'https://doc.rust-lang.org/book/',
              type: 'textbook',
              cost: 'free',
              provider: 'Rust Project',
              primary: true,
            },
            {
              title: 'The Rustonomicon: The Dark Arts of Unsafe Rust',
              url: 'https://doc.rust-lang.org/nomicon/',
              type: 'textbook',
              cost: 'free',
              provider: 'Rust Project',
              note: 'Chapters on meet safe and unsafe, data layout (repr), and FFI.',
            },
            {
              title: 'The nix crate documentation — safe wrappers for Unix APIs',
              url: 'https://docs.rs/nix',
              type: 'documentation',
              cost: 'free',
              provider: 'nix-rust',
              note: 'unistd (fork, execvp, pipe, dup2), sys::wait and sys::signal modules.',
            },
            {
              title: 'std::process documentation',
              url: 'https://doc.rust-lang.org/std/process/',
              type: 'documentation',
              cost: 'free',
              provider: 'Rust Project',
              note: 'Command::spawn with Stdio piping covers most shell needs without unsafe; compare with the libc route.',
            },
          ],
          exercises: [
            {
              slug: 'call-c-from-rust',
              title: 'Call your C hash table from Rust',
              prompt:
                'Build your module-2 hash table as a static library, write extern "C" declarations for its API (or generate them with bindgen), and wrap it in a safe Rust struct whose Drop calls the C free function and whose get returns Option<&str> via CStr. Write tests, run them under Miri where possible and under ASan via RUSTFLAGS=-Zsanitizer=address (nightly) otherwise. Document the invariant each unsafe block relies on.',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'safe-fork-exec-wrapper',
              title: 'Safe wrappers for fork, exec, pipe and waitpid',
              prompt:
                'Using the libc crate directly (not nix), write safe functions fork() -> Result<ForkResult>, pipe() -> Result<(OwnedFd, OwnedFd)>, execvp(&CStr, &[CString]) -> Error (never returns on success) and waitpid(Pid) -> Result<WaitStatus>, converting errno to io::Error. Use them to run "ls | wc -l" with correct descriptor closing (OwnedFd drops close automatically). Then compare your API with the nix crate\'s and list what you would change.',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'rust-from-c',
              title: 'Call Rust from C',
              prompt:
                'Expose your Rust word-frequency counter as a C-callable library: #[no_mangle] extern "C" functions to create a counter, feed it a buffer, query the count for a word, and destroy it, with #[repr(C)] where needed and a header generated by cbindgen. Call it from a C program and run the C program under ASan. Explain where a C caller could still cause UB and how your API documentation warns about it.',
              kind: 'coding',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'Does unsafe turn off the borrow checker?',
              answerOutline:
                'No. It permits five extra operations (raw pointer deref, unsafe fn calls, mutable statics, unsafe traits, union fields); all other checks still apply.',
            },
            {
              question: 'Why can a Rust String not be passed directly to a C function expecting char*?',
              answerOutline:
                'Rust strings are not NUL-terminated and may contain interior NULs; convert with CString::new, which appends the terminator and checks for interior NULs.',
            },
            {
              question: 'What does it mean for a safe API over unsafe code to be sound?',
              answerOutline:
                'No combination of calls from safe code can cause undefined behaviour; the unsafe implementation upholds its invariants regardless of inputs.',
            },
          ],
        },
      ],
      project: {
        slug: 'shell-in-rust',
        title: 'Project: the shell in Rust',
        description: `Reimplement the module-4 C shell in Rust to the same specification and test script: tokenizer and parser as safe code with lifetimes over the input line, execution via either std::process::Command with Stdio piping or your own safe wrappers over libc, job control with signal handling (signal-hook or nix), and builtins. Confine every unsafe block to one module and document its invariants. Run the C shell's test script unchanged.`,
        deliverables: [
          'A Cargo project passing cargo test, cargo clippy -D warnings and the shared shell test script',
          'An unsafe audit: a list of every unsafe block with its invariant',
          'A short note on which C bugs from the module-4 project the Rust version could not have had',
        ],
        estimatedHours: 12,
        stretchGoals: ['Make the shell async with tokio for concurrent background job monitoring'],
      },
    },
  ],
  capstone: {
    slug: 'shell-in-c-and-rust',
    title: 'Capstone: a Unix shell in C and in Rust, with benchmarks',
    description: `Deliver a working Unix shell implemented twice. The C version is the module-4 project extended to completion: pipelines, redirection, job control, builtins, environment variables, and a clean exit on EOF, with no memory errors under AddressSanitizer and no leaks after running the full test script. The Rust version reimplements the same specification with the same test script, using the standard library and the nix or libc crates for fork/exec/pipes/signals (or std::process where it suffices), with unsafe confined to a small, documented module.

Then compare them honestly. Benchmark both shells against each other and against bash or dash on: startup time, running 10,000 simple commands from a script, a 10-stage pipeline moving 1 GB, and a loop of 1,000 background jobs. Profile each with perf to explain the differences. Write a report of 4-8 pages covering the architecture of each implementation, where the C version needed discipline that the Rust compiler enforced, where Rust got in the way, the measured numbers with error bars, and what you would do differently.`,
    deliverables: [
      'C shell: source, Makefile, test script passing with zero ASan/UBSan/leak reports',
      'Rust shell: Cargo project, the same test script passing, clippy clean, unsafe blocks documented',
      'A benchmark harness (hyperfine or your own) and a results table with medians and spread',
      'A 4-8 page comparison report with profiling evidence',
    ],
    estimatedHours: 25,
    stretchGoals: [
      'Add a line editor with history to both shells and compare the implementation effort',
      'Implement subshells and command substitution $(...) in both',
      'Fuzz both shells with random command lines (AFL++ or cargo-fuzz) and report any crashes found',
    ],
  },
  masteryChecklist: [
    'I can write idiomatic, warning-free C with explicit ownership of every pointer and no undefined behaviour under the sanitizers',
    'I can explain the memory layout of a process and diagnose stack, heap and pointer bugs with gdb, ASan and Valgrind',
    'I can read the assembly my compiler produces and explain what optimisation did to my code',
    'I can explain static and dynamic linking, build a shared library, and fix linker and loader errors',
    'I can write a Makefile and a CMake project with correct dependencies',
    'I can use files, processes, signals and pipes through the POSIX API correctly, including the EOF, zombie and async-signal-safety rules',
    'I can measure a program\'s performance with perf and improve it by reasoning about caches and branches',
    'I can explain ownership, borrowing and lifetimes in Rust and write programs that the borrow checker accepts without unsafe',
    'I can write safe concurrent Rust with threads, channels, Mutex and Arc, and explain what Send and Sync guarantee',
    'I have built a working shell in both C and Rust and benchmarked them',
  ],
});
