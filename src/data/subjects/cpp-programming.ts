import { defineSubject } from '../define';

export default defineSubject({
  id: 'cpp-programming',
  title: 'Modern C++',
  category: 'cs',
  tagline:
    'C++20 as it is written today: RAII, value semantics, the standard library, concepts and concurrency, with the tools that professionals use to keep it correct and fast.',
  description: `C++ runs browsers, game engines, databases, compilers, trading systems and the numerical code under most of machine learning. It gives you direct control of memory and hardware with abstractions that cost nothing at run time, and it asks you to understand what you are doing in return.

This course teaches the language as it is written now. It is not C with classes. There are almost no raw \`new\` and \`delete\` calls, no hand-written loops where an algorithm fits, and no error-prone manual cleanup. The central ideas are **RAII**, which ties every resource to an object's lifetime, and **value semantics**, which makes your types behave like integers. On top of those come the standard library, ranges, templates constrained by concepts, deliberate ownership design, and concurrency with \`std::jthread\`, atomics and coroutines.

Good C++ depends on its tools, so you start with them. From the first lesson you build with CMake, get editor support from clangd, and run AddressSanitizer and UBSan, and later ThreadSanitizer, libFuzzer and Google Benchmark. Lessons are built on free material: learncpp.com, cppreference, the C++ Core Guidelines and CppCon talks. Everything builds in VS Code on Windows 10 through WSL 2, and each lesson that differs on MSVC says so.

The prerequisite is Programming Fundamentals, which uses Python. You do not need to know C. If you have taken Systems Programming, you will move quickly through the toolchain material and find that RAII and moves are what Rust's ownership was built from. If you have taken Data Structures and Algorithms, the container and performance lessons will mean more. You finish with two machine problems and an original library, a flight recorder for C++ programs, that is worth publishing.`,
  difficulty: 'intermediate',
  estimatedHours: 130,
  prerequisites: ['programming-fundamentals'],
  recommendedBackground: [
    'Systems Programming in C and Rust (systems-programming): helpful for pointers, linking and memory layout, not required',
    'Data Structures and Algorithms (data-structures-algorithms): helpful for choosing containers and reading complexity claims, not required',
    'Comfort with a terminal and with reading long compiler error messages',
  ],
  tags: ['C++', 'C++20', 'RAII', 'templates', 'concepts', 'concurrency', 'CMake', 'performance'],
  core: false,
  modules: [
    {
      slug: 'tools-and-language-core',
      title: 'Tools and the Language Core',
      description:
        'Set up a professional C++20 toolchain in VS Code on Windows, learn how source files become programs, and get the everyday language right from the first day: types, initialization, const, references and function signatures.',
      lessons: [
        {
          slug: 'toolchain-on-windows-and-wsl',
          title: 'A modern C++ toolchain in VS Code on Windows',
          summary:
            'Install GCC, Clang, CMake, clangd and the sanitizers in WSL 2, wire them into VS Code, and catch your first memory bug on purpose.',
          estimatedMinutes: 100,
          objectives: [
            'Install a C++20 toolchain in WSL 2 and open a project through the WSL extension in VS Code',
            'Compile a program from the terminal with the warning flags this course uses everywhere',
            'Explain what clangd, the debugger and `compile_commands.json` each contribute',
            'Trigger and read AddressSanitizer and UBSan reports',
            'State exactly what changes if you use MSVC instead of WSL',
          ],
          concepts: [
            'WSL 2 and the Remote WSL extension',
            'GCC, Clang and MSVC: independent compilers',
            'Language standard flag: `-std=c++20`',
            'Warnings as a free code review',
            'clangd: language server fed by `compile_commands.json`',
            'AddressSanitizer and UBSan',
            'Compiler Explorer for quick experiments',
            'Keep projects in the Linux file system, not `/mnt/c`',
          ],
          explanation: `C++ has no single official implementation. It has an ISO standard and three major compilers: **GCC**, **Clang** and **MSVC**. Code that is correct C++ builds on all three, so you will regularly compile with two of them, because each one catches different mistakes.

The recommended setup on Windows 10 is **WSL 2**, a real Linux kernel running beside Windows. Install it from an administrator PowerShell with \`wsl --install -d Ubuntu-24.04\` (any newer Ubuntu is fine), then inside Ubuntu run:

\`\`\`bash
sudo apt update
sudo apt install build-essential gdb clang clangd clang-tidy clang-format cmake ninja-build
\`\`\`

You need GCC 13 or newer and Clang 18 or newer, because \`std::format\` first ships in GCC 13. In VS Code install the \`ms-vscode-remote.remote-wsl\` extension, run \`code .\` from a folder in your Linux home directory, and add the clangd, CMake Tools and C/C++ extensions inside WSL. Keep code under \`~/\`, not \`/mnt/c\`, because file access across that boundary is slow. The C/C++ extension is only there for its debugger, so accept clangd's offer to switch off its IntelliSense.

From now on, every file you compile by hand uses this line:

\`\`\`bash
g++ -std=c++20 -Wall -Wextra -Wpedantic -Wshadow -Wconversion -g hello.cpp -o hello
\`\`\`

For bug hunting, add \`-fsanitize=address,undefined -fno-omit-frame-pointer\`. These sanitizers add runtime checks and stop with a report naming the exact line.

**If you prefer native Windows**, install Visual Studio 2022 Community with the "Desktop development with C++" workload, select a Visual Studio kit in CMake Tools, and use \`/std:c++20 /W4 /permissive-\`. MSVC supports AddressSanitizer through \`/fsanitize=address\`, but it has no UBSan or ThreadSanitizer, so the concurrency module and the final project still need WSL.

Work through the VS Code WSL guide step by step, then do the exercises. If a command fails, read the first error, not the last.`,
          resources: [
            {
              title: 'Using C++ and WSL in VS Code',
              url: 'https://code.visualstudio.com/docs/cpp/config-wsl',
              type: 'documentation',
              cost: 'free',
              provider: 'Microsoft',
              note: 'Follow it end to end, then swap IntelliSense for clangd as described in this lesson.',
              primary: true,
            },
            {
              title: 'How to install Linux on Windows with WSL',
              url: 'https://learn.microsoft.com/en-us/windows/wsl/install',
              type: 'documentation',
              cost: 'free',
              provider: 'Microsoft',
              note: 'Windows 10 needs version 2004 or later. Check with `wsl --status`.',
            },
            {
              title: 'clangd: getting started',
              url: 'https://clangd.llvm.org/installation',
              type: 'documentation',
              cost: 'free',
              provider: 'LLVM',
              note: 'Read the sections on project setup and `compile_commands.json`.',
            },
            {
              title: 'Using C++ and MSVC in VS Code',
              url: 'https://code.visualstudio.com/docs/cpp/config-msvc',
              type: 'documentation',
              cost: 'free',
              provider: 'Microsoft',
              note: 'Only if you choose the native Windows path.',
            },
            {
              title: 'Compiler Explorer',
              url: 'https://godbolt.org/',
              type: 'tool',
              cost: 'free',
              provider: 'Matt Godbolt',
              note: 'Compile snippets on many compilers in the browser. You will use it throughout the course.',
            },
          ],
          exercises: [
            {
              slug: 'verify-the-toolchain',
              title: 'Verify the toolchain',
              prompt:
                'Write a program that prints `__cplusplus`, `sizeof(int)`, `sizeof(long)` and `sizeof(void*)`, and uses `std::format` to print a vector of three names. Build it with both `g++` and `clang++` using the course flags. Expected: `__cplusplus` prints 202002 with both compilers and neither reports a warning. Record `g++ --version`, `clang++ --version` and `cmake --version` in a `SETUP.md`.',
              kind: 'coding',
              difficulty: 1,
              hint: 'If `<format>` is missing, your GCC is older than 13. Install a newer Ubuntu or the `g++-13` package.',
            },
            {
              slug: 'sanitizer-first-blood',
              title: 'Three bugs, three reports',
              prompt:
                'Write three small programs: (a) read `v[3]` from a `std::vector<int>` of size 3, (b) `new` an int, `delete` it, then read it, (c) add 1 to an `int` holding `INT_MAX`, where the value comes from `argc` so the compiler cannot fold it. Run each one built with `-fsanitize=address,undefined`. Expected reports: `heap-buffer-overflow`, `heap-use-after-free` and `signed integer overflow`. Then run each without sanitizers and note that nothing visibly goes wrong, which is the whole point of this exercise.',
              kind: 'coding',
              difficulty: 1,
            },
            {
              slug: 'debug-in-vscode',
              title: 'A debugger session in VS Code',
              prompt:
                'Create a `launch.json` that runs your program under gdb through WSL. Set a breakpoint inside a loop over a `std::vector<std::string>`, add a conditional breakpoint that stops when the name is `"Rust"`, and watch `v.size()` and `name` in the Watch panel. Step into a function, use the call stack panel to move up one frame, and take a screenshot for your notes.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'compiler-explorer-tour',
              title: 'What does -O2 do?',
              prompt:
                'In Compiler Explorer, paste a function that sums a `std::vector<int>` with a range-based `for`. Compare GCC and Clang output at `-O0` and `-O2`. Count the instructions in the loop in each case, and write down what happened to the calls to `begin()`, `end()` and `operator++`.',
              kind: 'reading',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why should your code live under `~/` in WSL rather than `/mnt/c/Users/...`?',
              answerOutline:
                '`/mnt/c` crosses the Windows and Linux file system boundary, which is much slower for the many small file reads a build performs, and file watching is less reliable.',
            },
            {
              question: 'What does clangd need in order to understand your project, and where does it come from?',
              answerOutline:
                'A compilation database, `compile_commands.json`, listing the exact flags for each file. CMake writes it when `CMAKE_EXPORT_COMPILE_COMMANDS` is on.',
            },
            {
              question: 'A program with a use-after-free prints the right answer without sanitizers. Is it correct?',
              answerOutline:
                'No. It has undefined behaviour, so appearing to work proves nothing. It can fail with another compiler, flag or input.',
            },
            {
              question: 'What can you not do with MSVC alone that this course needs?',
              answerOutline:
                'MSVC has no ThreadSanitizer or UBSan, so concurrency work and full sanitizer coverage need GCC or Clang through WSL.',
            },
          ],
          relatedLessons: [
            'systems-programming/c-fundamentals/the-c-compilation-model-and-hello-world',
            'systems-programming/the-toolchain/debuggers-and-sanitizers',
          ],
        },
        {
          slug: 'translation-units-and-modern-cmake',
          title: 'Translation units and modern CMake',
          summary:
            'How separate compilation shapes C++ code, the one definition rule, and a target-based CMake project with presets, Catch2 and CTest.',
          estimatedMinutes: 120,
          objectives: [
            'Explain what a translation unit is and what belongs in a header',
            'Apply the one definition rule and use `inline` correctly',
            'Write a target-based `CMakeLists.txt` with a library, an executable and PUBLIC or PRIVATE usage requirements',
            'Pull in Catch2 with FetchContent and run tests through CTest',
            'Use `CMakePresets.json` to switch between debug, sanitizer and release builds',
          ],
          concepts: [
            'Translation unit: one `.cpp` after preprocessing',
            'Declaration vs definition',
            'One definition rule (ODR)',
            '`inline` for definitions in headers',
            '`#pragma once`',
            'Targets and usage requirements',
            'PUBLIC vs PRIVATE vs INTERFACE',
            'FetchContent for dependencies',
            'CMake presets',
            'CTest',
          ],
          explanation: `Each \`.cpp\` file, after the preprocessor has pasted in its \`#include\`s, is a **translation unit**. The compiler sees only that one unit, and the linker joins the results. So a header's job is to give every unit the same *declarations*.

The **one definition rule** says a non-inline function or variable may be *defined* once in the whole program. A plain function body in a header, included from two files, fails at link time with \`multiple definition\`. Mark it \`inline\`, or move it to a \`.cpp\`. Class definitions, templates and \`inline\` functions may appear in many units as long as every copy is identical. Start every header with \`#pragma once\`.

Modern CMake is about **targets**, not global flags. A target declares what it needs, and those requirements travel to whatever links it:

\`\`\`cmake
cmake_minimum_required(VERSION 3.25)
project(tempconv LANGUAGES CXX)

add_library(tempconv src/convert.cpp)
target_include_directories(tempconv PUBLIC include)
target_compile_features(tempconv PUBLIC cxx_std_20)

add_executable(app src/main.cpp)
target_link_libraries(app PRIVATE tempconv)
\`\`\`

\`PUBLIC\` means "I need this and so do my users", \`PRIVATE\` means "only I need this". Avoid \`include_directories\` and global \`CMAKE_CXX_FLAGS\` edits in the lists file.

Dependencies come from \`FetchContent\`, and tests run through CTest:

\`\`\`cmake
include(FetchContent)
FetchContent_Declare(Catch2 GIT_REPOSITORY https://github.com/catchorg/Catch2.git GIT_TAG v3.7.1)
FetchContent_MakeAvailable(Catch2)

enable_testing()
add_executable(tests tests/test_convert.cpp)
target_link_libraries(tests PRIVATE tempconv Catch2::Catch2WithMain)
add_test(NAME tests COMMAND tests)
\`\`\`

Finally, \`CMakePresets.json\` names your configurations so that \`cmake --preset asan\` means the same thing to you, to VS Code and to CI. Set \`CMAKE_EXPORT_COMPILE_COMMANDS\` to \`ON\` in each preset, and add a \`.clangd\` file containing \`CompileFlags: { CompilationDatabase: build/debug }\` so clangd finds it.

This lesson does not re-teach linking. If symbols and object files are new to you, read the systems-programming lesson on linking afterwards. Work through the CMake tutorial's first few steps, then use the Catch2 tutorial to write your first test.`,
          resources: [
            {
              title: 'CMake Tutorial',
              url: 'https://cmake.org/cmake/help/latest/guide/tutorial/index.html',
              type: 'documentation',
              cost: 'free',
              provider: 'Kitware',
              note: 'Steps 1 to 3 cover targets and usage requirements.',
              primary: true,
            },
            {
              title: 'cmake-presets(7) manual',
              url: 'https://cmake.org/cmake/help/latest/manual/cmake-presets.7.html',
              type: 'documentation',
              cost: 'free',
              provider: 'Kitware',
              note: 'Reference for the preset format. Read the configure presets section.',
            },
            {
              title: 'Catch2 tutorial',
              url: 'https://github.com/catchorg/Catch2/blob/devel/docs/tutorial.md',
              type: 'documentation',
              cost: 'free',
              provider: 'Catch2',
            },
            {
              title: 'Modern CMake (online book)',
              url: 'https://cliutils.gitlab.io/modern-cmake/',
              type: 'textbook',
              cost: 'free',
              provider: 'Henry Schreiner and contributors',
              note: 'A compact guide to target-based CMake. Use it as a reference when the manual is too terse.',
            },
            {
              title: 'learncpp: header files',
              url: 'https://www.learncpp.com/cpp-tutorial/header-files/',
              type: 'textbook',
              cost: 'free',
              provider: 'Learn C++',
              note: 'A gentle explanation of declarations, definitions and includes.',
            },
          ],
          exercises: [
            {
              slug: 'split-into-a-library',
              title: 'Split a program into a library and an app',
              prompt:
                'Create a `tempconv` library with `include/tempconv/convert.hpp` and `src/convert.cpp`, exposing `celsius_to_fahrenheit` and `fahrenheit_to_celsius`, and an `app` executable that converts a value from `argv`. Build with Ninja. Then touch only `src/convert.cpp`, rebuild with `cmake --build build/debug --verbose`, and confirm that one file recompiles and `main.cpp` does not. Touch the header and explain why two files now recompile.',
              kind: 'coding',
              difficulty: 1,
            },
            {
              slug: 'odr-violation-on-purpose',
              title: 'Break the one definition rule',
              prompt:
                'Define `int answer() { return 42; }` in a header included by two `.cpp` files and link them. Record the exact linker error. Fix it once with `inline` and once by moving the body to a `.cpp`. Then, as a harder case, define `inline int answer()` with a different return value in two files that do not share a header. Note that it links with no error, print the result at `-O0` and `-O2`, and explain why this is an ODR violation that needs no diagnostic.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'first-catch2-test',
              title: 'Your first automated tests',
              prompt:
                'Add Catch2 v3 with FetchContent and write `TEST_CASE`s asserting that `celsius_to_fahrenheit(100.0)` equals 212, `celsius_to_fahrenheit(-40.0)` equals -40, and `fahrenheit_to_celsius(32.0)` equals 0, using `Catch::Approx` or a matcher for the floating-point comparison. Run them with `ctest --test-dir build/debug --output-on-failure`. Break the implementation deliberately, and paste the failure message into your notes.',
              kind: 'coding',
              difficulty: 1,
              hint: 'Include `<catch2/catch_test_macros.hpp>` and `<catch2/catch_approx.hpp>`.',
            },
            {
              slug: 'presets-for-sanitizers',
              title: 'Three presets',
              prompt:
                'Write a `CMakePresets.json` with `debug`, `asan` and `release` configure presets using the Ninja generator and `binaryDir` values `build/debug`, `build/asan` and `build/release`. The `asan` preset sets `CMAKE_CXX_FLAGS` to `-fsanitize=address,undefined -fno-omit-frame-pointer`. Check that `cmake --preset asan` followed by `cmake --build build/asan` produces a binary that reports a planted use-after-free. Confirm that clangd still resolves your headers in VS Code.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why can a class definition appear in many translation units when a non-inline function definition cannot?',
              answerOutline:
                'The ODR explicitly allows identical definitions of classes, templates and inline functions in multiple units. A non-inline function has exactly one definition in the program, so two copies collide at link time.',
            },
            {
              question: 'When should `target_link_libraries` use PUBLIC rather than PRIVATE?',
              answerOutline:
                'PUBLIC when your target\'s public headers expose the dependency, so users need its include paths and link line too. PRIVATE when it is only used in your `.cpp` files.',
            },
            {
              question: 'What is the difference between a declaration and a definition?',
              answerOutline:
                'A declaration introduces a name and its type. A definition also provides the body or storage. Every definition is a declaration, but not the reverse.',
            },
            {
              question: 'What problem do presets solve that a README full of commands does not?',
              answerOutline:
                'They store named configurations in version control, so the terminal, VS Code and CI all use the same flags and build directories.',
            },
          ],
          relatedLessons: [
            'systems-programming/the-toolchain/build-systems-make-and-cmake',
            'systems-programming/the-toolchain/linking-and-libraries',
          ],
        },
        {
          slug: 'types-initialization-and-const',
          title: 'Types, initialization and const',
          summary:
            'The everyday language: value types, brace initialization that refuses narrowing, auto, const and constexpr, scoped enums, std::string and std::vector.',
          estimatedMinutes: 110,
          objectives: [
            'Choose suitable fundamental and fixed-width types, and predict their conversions',
            'Use brace initialization and explain how it prevents narrowing',
            'Decide between `const`, `constexpr` and `auto` for a given variable',
            'Replace plain enums and magic numbers with `enum class` and named constants',
            'Write loops over `std::vector` and `std::string` without unsigned bugs',
          ],
          concepts: [
            'Static typing and value semantics by default',
            'Brace initialization and narrowing',
            '`auto` deduction drops top-level `const` and references',
            '`const` vs `constexpr`',
            '`enum class`',
            '`std::string` and `std::vector`',
            'Range-based `for`',
            'Signed vs unsigned sizes, and `std::ssize`',
            'Structured bindings',
          ],
          explanation: `If you come from Python, the biggest shift is this: **a variable in C++ is the object, not a name pointing to one.** \`int a = b;\` makes a second independent integer, and \`std::vector<int> w = v;\` copies every element. Module 3 builds a whole design style on that fact.

Prefer **brace initialization**, because it refuses to lose information:

\`\`\`cpp
int a = 3.7;     // compiles, silently truncates to 3
int b{3.7};      // error: narrowing conversion
std::vector<int> v{1, 2, 3};   // three elements
std::vector<int> w(3, 7);      // parentheses: three sevens
\`\`\`

That last pair is the classic trap. Braces prefer an \`initializer_list\` constructor, so \`std::vector<int>{3, 7}\` has two elements.

Use **\`auto\`** when the type is obvious or noisy, but remember that it copies: \`auto x = v[0];\` drops the reference, and \`const auto& x = v[0];\` keeps it. In a range-based loop over strings, write \`for (const auto& s : names)\`.

**\`const\`** means "this name will not change it" and may hold a run-time value. **\`constexpr\`** means "known at compile time", so it can size an array or appear in a \`static_assert\`. Default to \`const\` everywhere you can, and to \`constexpr\` for true constants instead of \`#define\`.

**\`enum class Color { red, green };\`** gives a scoped type: you must write \`Color::red\`, and it does not silently convert to \`int\`. Use it instead of plain enums.

Standard containers report sizes as the unsigned \`std::size_t\`, and \`-1\` wrapped to unsigned is huge. So \`for (std::size_t i = v.size() - 1; i >= 0; --i)\` never ends, and on an empty vector it starts far out of bounds. Prefer range-based \`for\`, and use \`std::ssize(v)\` when you truly need a signed index. \`-Wconversion\` and \`-Wsign-compare\` point at these problems for you.

Structured bindings unpack small aggregates: \`auto [low, high] = std::minmax({3, 1, 2});\`.

Read the learncpp pages for initialization and \`constexpr\`, and keep the \`std::vector\` page on cppreference open. It is the most useful single page in the library. If your background is C, skim this lesson and focus on the differences.`,
          resources: [
            {
              title: 'learncpp: variable assignment and initialization',
              url: 'https://www.learncpp.com/cpp-tutorial/variable-assignment-and-initialization/',
              type: 'textbook',
              cost: 'free',
              provider: 'Learn C++',
              primary: true,
            },
            {
              title: 'learncpp: constexpr variables',
              url: 'https://www.learncpp.com/cpp-tutorial/constexpr-variables/',
              type: 'textbook',
              cost: 'free',
              provider: 'Learn C++',
            },
            {
              title: 'learncpp: scoped enumerations (enum classes)',
              url: 'https://www.learncpp.com/cpp-tutorial/scoped-enumerations-enum-classes/',
              type: 'textbook',
              cost: 'free',
              provider: 'Learn C++',
            },
            {
              title: 'std::vector reference',
              url: 'https://en.cppreference.com/w/cpp/container/vector',
              type: 'documentation',
              cost: 'free',
              provider: 'cppreference',
              note: 'Learn to read this page: the member list, complexity notes and example.',
            },
            {
              title: 'Herb Sutter: Back to the Basics! Essentials of Modern C++ Style (CppCon 2014)',
              url: 'https://www.youtube.com/watch?v=xnqTKD8uD64',
              type: 'lecture',
              cost: 'free',
              provider: 'CppCon',
              note: 'The sections on `auto` and parameter passing apply to this lesson and the next.',
            },
          ],
          exercises: [
            {
              slug: 'narrowing-hunt',
              title: 'Narrowing hunt',
              prompt:
                'For each of `int a = 2.9;`, `int b{2.9};`, `char c = 300;`, `unsigned u = -1;`, `double d{1};`, `float f{0.1};`, predict whether it compiles and what value results, then check with `g++ -std=c++20 -Wall -Wextra -Wconversion`. Explain why `double d{1};` and `float f{0.1};` are both accepted although `int b{2.9};` is not. Record the actual diagnostic for each line.',
              kind: 'problem',
              difficulty: 1,
              hint: 'For constants the rule looks at the value: an `int` constant must be exactly representable as `double`, and a `double` constant only has to lie within the range of `float`.',
            },
            {
              slug: 'word-stats',
              title: 'Word statistics from stdin',
              prompt:
                'Read whitespace-separated words from `std::cin` into a `std::vector<std::string>`. Print the word count, the longest word, the mean length to two decimal places using `std::format`, and the words in reverse order on one line. For the input `to be or not to be` the expected output is 6 words, longest `not`, mean 2.17, and `be to not or be to`. Use no index variables.',
              kind: 'coding',
              difficulty: 1,
              hint: 'Longest means first longest in input order, and `not` is the first word of length three.',
            },
            {
              slug: 'unsigned-trap',
              title: 'The unsigned loop trap',
              prompt:
                'Write a function that prints a vector backwards using the buggy loop `for (std::size_t i = v.size() - 1; i >= 0; --i)`. Compile with `-Wall -Wextra` and record what the compiler says. Run it under ASan on a vector of three elements and on an empty vector, and record the report. Fix it in two ways: with `std::ssize`, and with a reverse iterator or `std::views::reverse`. Add a test for the empty case.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'traffic-light-enum',
              title: 'Model states with enum class',
              prompt:
                'Model a traffic light with `enum class Light { red, green, yellow };` and write `constexpr Light next(Light l)` using a `switch` with no `default`. Prove the transition table with `static_assert`, so `next(Light::red) == Light::green`, `next(Light::green) == Light::yellow`, and `next(Light::yellow) == Light::red`. Add a fourth enumerator and confirm that `-Wswitch` warns you.',
              kind: 'coding',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'What is the difference between `std::vector<int> v(3, 7)` and `std::vector<int> v{3, 7}`?',
              answerOutline:
                'Parentheses call the count-value constructor, giving three sevens. Braces prefer the `initializer_list` constructor, giving two elements, 3 and 7.',
            },
            {
              question: 'What does `auto x = v[0];` do when `v` is a `std::vector<std::string>`?',
              answerOutline:
                '`auto` drops references, so `x` is a separate `std::string` copy. Use `const auto&` to avoid the copy.',
            },
            {
              question: 'When can `const` not replace `constexpr`?',
              answerOutline:
                'When the value must be known at compile time, for example an array bound, a template argument or a `static_assert`. A `const` variable may be initialized at run time.',
            },
            {
              question: 'Why does `v.size() - 1` go wrong on an empty vector?',
              answerOutline:
                '`size()` is unsigned, so 0 minus 1 wraps around to the largest `std::size_t` value rather than becoming -1.',
            },
          ],
          relatedLessons: [
            'systems-programming/c-fundamentals/types-operators-and-control-flow',
            'computer-architecture/data-representation/integer-arithmetic-and-overflow',
          ],
        },
        {
          slug: 'references-pointers-and-functions',
          title: 'References, pointers and function signatures',
          summary:
            'How C++ passes data around: references, pointers as optional non-owning access, const correctness, overloading, and how to read a signature.',
          estimatedMinutes: 110,
          objectives: [
            'Choose between pass by value, by `const&` and by `&` for a given parameter',
            'Explain how a reference differs from a pointer and when each is right',
            'Find dangling references and pointers, and fix them',
            'Predict which overload a call selects in common cases',
            'Organize code with namespaces instead of `using namespace std`',
          ],
          concepts: [
            'Reference as an alias',
            'Pointer as a nullable, rebindable address',
            '`nullptr`',
            'Parameter passing: value, `const&`, `&`',
            'Return by value',
            'Dangling references',
            'Overload resolution',
            'Namespaces',
            'Non-owning raw pointers',
          ],
          explanation: `A **reference** is another name for an existing object. It must be bound when created, cannot be reseated, and is never null. A **pointer** is an object holding an address. It can be null, can be changed to point elsewhere, and needs \`*\` to reach the target. Prefer references, and use a pointer when "nothing" is a meaningful value or when you need to reseat it. If pointers are new to you, the systems-programming lessons explain addresses in depth. Here we care about how to use them well.

Function signatures in C++ state your intent. The defaults to memorize:

\`\`\`cpp
void read_only(const std::string& s);   // large type, just looking
void cheap(int x, double y);            // small type: by value
void modifies(std::vector<int>& v);     // caller sees the change
std::vector<int> make_data();           // outputs are returned by value
void maybe(const Config* cfg);          // cfg may be nullptr
\`\`\`

Returning a big object by value is normal and cheap in modern C++, as module 3 explains. Do not use out-parameters to avoid a copy that will not happen.

The danger with references is **dangling**, which means referring to something that no longer exists:

\`\`\`cpp
const std::string& bad() {
    std::string s = "local";
    return s;                     // s dies here
}
\`\`\`

Two subtler cases: a reference into a \`std::vector\` dies when the vector reallocates, and \`const std::string& r = make_name();\` is safe (the temporary's lifetime is extended), while \`const char* p = make_name().c_str();\` is not. The compiler warns about some of these, and ASan catches most of the rest at run time.

**Overloading** lets several functions share a name. The compiler ranks candidates: exact match beats promotion, which beats conversion. Mixing \`int\` and \`bool\` overloads, or \`f(int)\` and \`f(int*)\` with a literal \`0\`, is how you get surprises, and it is why \`nullptr\` exists.

Put your code in a **namespace**, write \`std::\` explicitly, and never put \`using namespace std;\` in a header.

Work through the two learncpp pages, then do the audit exercise on your own code from this module.`,
          resources: [
            {
              title: 'learncpp: pass by const lvalue reference',
              url: 'https://www.learncpp.com/cpp-tutorial/pass-by-const-lvalue-reference/',
              type: 'textbook',
              cost: 'free',
              provider: 'Learn C++',
              primary: true,
            },
            {
              title: 'learncpp: return by reference and return by address',
              url: 'https://www.learncpp.com/cpp-tutorial/return-by-reference-and-return-by-address/',
              type: 'textbook',
              cost: 'free',
              provider: 'Learn C++',
              note: 'Pay attention to the warnings about dangling references.',
            },
            {
              title: 'C++ Core Guidelines: functions (F section)',
              url: 'https://isocpp.github.io/CppCoreGuidelines/CppCoreGuidelines',
              type: 'documentation',
              cost: 'free',
              provider: 'Stroustrup and Sutter, eds.',
              note: 'Search the page for F.15 to F.21 on passing and returning values.',
            },
            {
              title: 'Reference declaration',
              url: 'https://en.cppreference.com/w/cpp/language/reference',
              type: 'documentation',
              cost: 'free',
              provider: 'cppreference',
              note: 'Look up the rules on dangling references and lifetime extension.',
            },
          ],
          exercises: [
            {
              slug: 'swap-three-ways',
              title: 'Swap three ways',
              prompt:
                'Write `swap_by_value(int, int)`, `swap_by_pointer(int*, int*)` and `swap_by_ref(int&, int&)`. Test each from `main` with `a = 1, b = 2` and show that only the last two change the caller. Then make the pointer version safe against `nullptr` and compare the two call sites. Write one sentence on what each signature promises.',
              kind: 'coding',
              difficulty: 1,
            },
            {
              slug: 'dangling-zoo',
              title: 'A small zoo of dangling references',
              prompt:
                'Write four small programs: (a) return a reference to a local, (b) hold `int& r = v[0]` across a `v.push_back` that reallocates, (c) keep `const char* p = std::string("hello").c_str();`, (d) return a pointer to a local array. For each, record whether the compiler warned, what ASan printed, and the smallest fix. For case (b), print `v.capacity()` before and after to show the reallocation.',
              kind: 'coding',
              difficulty: 2,
              hint: 'For (a) and (d), GCC needs `ASAN_OPTIONS=detect_stack_use_after_return=1` to catch them at run time.',
            },
            {
              slug: 'signature-audit',
              title: 'Parameter-passing audit',
              prompt:
                'Rewrite these signatures using the rules from this lesson, and justify each change in one line: `void print(std::string s)`, `int sum(std::vector<int> v)`, `void fill(std::vector<int> v)` (it must modify the caller\'s vector), `void get_stats(const std::vector<double>& v, double* mean, double* stddev)`, `bool is_valid(const int& code)`.',
              kind: 'writing',
              difficulty: 1,
            },
            {
              slug: 'overload-prediction',
              title: 'Predict the overload',
              prompt:
                'Given overloads `f(int)`, `f(double)`, `f(long)`, `f(const std::string&)`, `f(const char*)`, `f(bool)`, predict which is called for `f(1)`, `f(1.0f)`, `f(\'a\')`, `f("hi")`, `f(1u)`, `f(nullptr)`, `f(true)`. Compile with each call in turn to check. Explain any call that is ambiguous or that picks an overload you did not expect.',
              kind: 'problem',
              difficulty: 2,
              hint: '`f(1u)` converts equally well to several targets. `f("hi")` prefers `const char*` because array-to-pointer decay is an exact match.',
            },
          ],
          selfAssessment: [
            {
              question: 'Give two situations where you would use a pointer parameter rather than a reference.',
              answerOutline:
                'When "no object" is a valid input, so `nullptr` has meaning, and when the function must reseat or iterate over addresses. In most other cases a reference states the intent better.',
            },
            {
              question: 'Why is `const std::string& r = make_name();` safe when `make_name().c_str()` stored in a pointer is not?',
              answerOutline:
                'Binding a temporary to a `const` reference extends its lifetime to that of the reference. A `c_str()` pointer does not extend anything, so the temporary is destroyed at the end of the full expression.',
            },
            {
              question: 'Why does a reference to a vector element become invalid after `push_back`?',
              answerOutline:
                'If size exceeds capacity, the vector allocates a new buffer, moves the elements and frees the old one, so the reference points to freed memory.',
            },
            {
              question: 'Why should a function return a `std::vector` by value rather than fill an out-parameter?',
              answerOutline:
                'The signature is clearer and the result can be `const`. With copy elision and moves, the return costs little or nothing.',
            },
          ],
          relatedLessons: [
            'systems-programming/pointers-and-memory/pointers-and-addresses',
            'systems-programming/ownership-and-safe-concurrency/ownership-and-borrowing',
          ],
        },
      ],
    },
    {
      slug: 'classes-and-raii',
      title: 'Classes and RAII',
      description:
        'Classes as guardians of invariants, the exact rules of object lifetime, RAII as the central idiom of the language, and runtime polymorphism with virtual functions.',
      lessons: [
        {
          slug: 'classes-and-invariants',
          title: 'Classes, constructors and invariants',
          summary:
            'A class exists to protect an invariant. Learn constructors, member initializer lists, const member functions, explicit, and throwing when construction cannot succeed.',
          estimatedMinutes: 110,
          objectives: [
            'Design a class around a stated invariant, with private data and a small public interface',
            'Write constructors with member initializer lists, and know the initialization order',
            'Mark member functions `const` correctly and use `[[nodiscard]]`',
            'Use `explicit` to stop accidental conversions',
            'Report a failed construction by throwing a standard exception',
          ],
          concepts: [
            'Invariant: what is always true of a valid object',
            '`struct` vs `class`: default access',
            'Member initializer list',
            'Initialization follows declaration order',
            '`const` member functions',
            '`explicit` constructors',
            'Default member initializers',
            'Throwing `std::invalid_argument`',
            '`[[nodiscard]]`',
          ],
          explanation: `Use a \`struct\` for plain data whose fields can each hold any value. Use a \`class\` when some combinations of values are illegal. That rule of thumb is Core Guideline C.2, and the word to remember is **invariant**: a condition that is true of every object from the end of its constructor to the start of its destructor.

\`\`\`cpp
class Fraction {
public:
    Fraction(std::int64_t num, std::int64_t den) : num_{num}, den_{den} {
        if (den_ == 0) throw std::invalid_argument{"zero denominator"};
        normalize();                    // lowest terms, den_ > 0
    }
    explicit Fraction(std::int64_t whole) : Fraction{whole, 1} {}

    [[nodiscard]] std::int64_t num() const { return num_; }
    [[nodiscard]] std::int64_t den() const { return den_; }

private:
    void normalize();
    std::int64_t num_;
    std::int64_t den_;
};
\`\`\`

The fields are private, so no outside code can break the invariant. Every public function can assume it holds on entry and must restore it on exit. That is what makes the class easy to reason about.

Use the **member initializer list**, the part after the colon. Inside the constructor body the members are already built, so assigning there initializes twice and is impossible for \`const\` or reference members. Members are initialized in the order they are *declared in the class*, whatever order you write in the list, and \`-Wall\` warns about a mismatch.

Mark every function that does not change the logical state as \`const\`, because only \`const\` functions can be called on a \`const\` object or through a \`const&\`. A single-argument constructor is also an implicit conversion, so write \`explicit\` unless you truly want \`Fraction f = 3;\` to work.

If a constructor cannot establish the invariant, **throw**. There is no half-built object for anyone to misuse, because the object's lifetime never starts. This lesson only uses \`throw\` and a simple \`try\`/\`catch\`, and module 6 covers the design of error handling in depth.

Work through the learncpp pages on constructors and then read the Core Guidelines C section introduction. The exercises matter more than the reading here.`,
          resources: [
            {
              title: 'learncpp: introduction to constructors',
              url: 'https://www.learncpp.com/cpp-tutorial/introduction-to-constructors/',
              type: 'textbook',
              cost: 'free',
              provider: 'Learn C++',
              primary: true,
            },
            {
              title: 'learncpp: constructor member initializer lists',
              url: 'https://www.learncpp.com/cpp-tutorial/constructor-member-initializer-lists/',
              type: 'textbook',
              cost: 'free',
              provider: 'Learn C++',
            },
            {
              title: 'learncpp: const class objects and const member functions',
              url: 'https://www.learncpp.com/cpp-tutorial/const-class-objects-and-const-member-functions/',
              type: 'textbook',
              cost: 'free',
              provider: 'Learn C++',
            },
            {
              title: 'C++ Core Guidelines: classes and class hierarchies (C section)',
              url: 'https://isocpp.github.io/CppCoreGuidelines/CppCoreGuidelines',
              type: 'documentation',
              cost: 'free',
              provider: 'Stroustrup and Sutter, eds.',
              note: 'Search the page for C.2, C.40 to C.49 on constructors.',
            },
          ],
          exercises: [
            {
              slug: 'fraction-class',
              title: 'A Fraction with an invariant',
              prompt:
                'Finish `Fraction`: the denominator is always positive and the fraction is always in lowest terms (use `std::gcd`). Add `+`, `*` and `to_string` as member or free functions. Catch2 tests must show `Fraction{6, -8}` stores -3/4, `Fraction{1, 2} + Fraction{1, 3}` is 5/6, `Fraction{0, 5}` stores 0/1, and `Fraction{1, 0}` throws `std::invalid_argument`.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'init-order-trap',
              title: 'The initialization order trap',
              prompt:
                'Write a class with members declared as `std::size_t capacity_; std::vector<int> data_;` and a constructor `: data_(n), capacity_{data_.size()}`. Predict the value of `capacity_`. Then reverse the declarations so that `data_` comes first and predict again. Run both under UBSan and with `-Wall`, and record the warning. Explain the rule in one sentence.',
              kind: 'coding',
              difficulty: 1,
            },
            {
              slug: 'const-correct-bank',
              title: 'Const-correct account',
              prompt:
                'Write `class Account` with the invariant "balance in cents is never negative". `deposit(cents)` and `withdraw(cents)` throw on non-positive amounts, and `withdraw` throws if funds are insufficient. `balance()` is `const` and `[[nodiscard]]`. Write `void report(const Account&)` and confirm it cannot call `deposit`. Test that a failed `withdraw` leaves the balance unchanged.',
              kind: 'coding',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'What is a class invariant, and which functions are responsible for it?',
              answerOutline:
                'A condition that holds for every live object. Constructors establish it, and public member functions may assume it on entry and must restore it on exit.',
            },
            {
              question: 'Why prefer a member initializer list over assignment in the constructor body?',
              answerOutline:
                'Members are constructed before the body runs, so assignment means default-construct then assign. `const` members, references and types with no default constructor must use the list.',
            },
            {
              question: 'What happens to an object whose constructor throws?',
              answerOutline:
                'Its lifetime never begins and its destructor does not run. Members and bases that were already built are destroyed.',
            },
            {
              question: 'What does `explicit` prevent?',
              answerOutline:
                'Implicit conversions through that constructor, such as `Fraction f = 3;` or passing an `int` to a parameter of type `Fraction`.',
            },
          ],
          relatedLessons: [
            'programming-fundamentals/objects-and-abstraction/classes-and-objects',
            'software-engineering/design-principles-and-patterns/specifications-and-abstract-data-types',
          ],
        },
        {
          slug: 'object-lifetime-and-raii',
          title: 'Object lifetime and RAII',
          summary:
            'When objects are born and die, why destructors run during exceptions, and how to tie every resource to an object so that cleanup cannot be forgotten.',
          estimatedMinutes: 130,
          objectives: [
            'Describe automatic, dynamic, static and thread storage duration',
            'State the order of construction and destruction of members and locals',
            'Explain stack unwinding and why it makes RAII reliable',
            'Write an RAII wrapper for a C-style resource, including a deleted copy',
            'Use `std::unique_ptr` and `std::make_unique` rather than `new` and `delete`',
          ],
          concepts: [
            'Storage duration: automatic, dynamic, static, thread',
            'Destruction in reverse order of construction',
            '`new` and `delete`, and why you rarely write them',
            'Stack unwinding',
            'RAII: Resource Acquisition Is Initialization',
            'Destructors are `noexcept` by default',
            'Deleted copy operations',
            '`std::unique_ptr` as the first RAII type to reach for',
            'Scope guards',
          ],
          explanation: `Every object has a **lifetime** that starts when its constructor finishes and ends when its destructor starts. **Storage duration** decides how long the memory lasts: *automatic* for locals, *static* for globals and \`static\` locals, *thread* for \`thread_local\`, and *dynamic* for \`new\`.

Locals and members are destroyed in **reverse order of construction**, and this is guaranteed. Later objects may depend on earlier ones, so they must go first.

This is the idea on which modern C++ stands. **RAII** ties a resource to an object: acquire it in the constructor, release it in the destructor.

\`\`\`cpp
class File {
public:
    explicit File(const char* path) : f_{std::fopen(path, "rb")} {
        if (!f_) throw std::runtime_error{"cannot open file"};
    }
    ~File() { std::fclose(f_); }

    File(const File&) = delete;              // two owners would close twice
    File& operator=(const File&) = delete;

    std::FILE* get() const { return f_; }

private:
    std::FILE* f_;
};
\`\`\`

Why is this better than calling \`fclose\` by hand? Because of **stack unwinding**. When an exception leaves a scope, every fully constructed local in that scope is destroyed, in order, until a \`catch\` is found. The same happens on \`return\` and \`break\`. So every path out of a function releases the resource, including paths you did not think about. C needs a chain of \`goto cleanup\` for this. Compare it with Rust's \`Drop\`, which is the same idea enforced by the compiler.

"Resource" means more than memory. It covers files, sockets, locks, thread joins, temporary directories and GPU handles. Later you will see \`std::lock_guard\` and \`std::jthread\` use the same pattern.

For heap objects, never pair \`new\` and \`delete\` by hand. Write \`auto p = std::make_unique<Widget>(42);\` and the memory is freed when \`p\` dies. Module 6 returns to ownership in depth.

Two rules for destructors: they must not throw, because they are \`noexcept\` by default and a throw calls \`std::terminate\`, and a class that owns a raw resource needs to think about copying. Here we simply delete copying, and module 3 explains the alternatives.

Watch O'Dwyer's talk through the part on RAII, then write the exercises. Tracing the order of destructor calls yourself is what makes this stick.`,
          resources: [
            {
              title: 'Arthur O\'Dwyer: Back to Basics: RAII and the Rule of Zero (CppCon 2019)',
              url: 'https://www.youtube.com/watch?v=7Qgd9B1KuMQ',
              type: 'lecture',
              cost: 'free',
              provider: 'CppCon',
              note: 'Watch the first half now and finish it at the end of module 3.',
              primary: true,
            },
            {
              title: 'RAII',
              url: 'https://en.cppreference.com/w/cpp/language/raii',
              type: 'documentation',
              cost: 'free',
              provider: 'cppreference',
            },
            {
              title: 'learncpp: destructors',
              url: 'https://www.learncpp.com/cpp-tutorial/destructors/',
              type: 'textbook',
              cost: 'free',
              provider: 'Learn C++',
            },
            {
              title: 'learncpp: exceptions, functions and stack unwinding',
              url: 'https://www.learncpp.com/cpp-tutorial/exceptions-functions-and-stack-unwinding/',
              type: 'textbook',
              cost: 'free',
              provider: 'Learn C++',
            },
            {
              title: 'Storage class specifiers and storage duration',
              url: 'https://en.cppreference.com/w/cpp/language/storage_duration',
              type: 'documentation',
              cost: 'free',
              provider: 'cppreference',
            },
          ],
          exercises: [
            {
              slug: 'lifetime-tracer',
              title: 'Trace every lifetime',
              prompt:
                'Write `struct Tracer` whose constructor and destructor print a name. Create locals `a` and `b`, a `static` local `s`, an object of a class with two `Tracer` members, and a `std::unique_ptr<Tracer>`. Predict the complete output order, including `s` being destroyed after `main` returns, then run it. Add a function that throws after creating two locals, catch the exception in `main`, and show that both destructors run before the `catch` body.',
              kind: 'coding',
              difficulty: 1,
            },
            {
              slug: 'raii-file-copy',
              title: 'An RAII file copier',
              prompt:
                'Finish the `File` class with a read-mode or write-mode constructor, and write `copy_file(from, to)` using a 4 KiB buffer. Inject a failure by throwing after the first buffer. Count the entries in `/proc/self/fd` from inside the program with `std::filesystem::directory_iterator`, before and after, and show that none leak across 1,000 failed copies. Prove that `File a{"x"}; File b = a;` does not compile.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'scope-guard',
              title: 'Write a scope guard',
              prompt:
                'Write `class ScopeExit` that stores a `std::function<void()>` and runs it in its destructor, with `dismiss()` to cancel it. Use it to delete a temporary file unless the function reaches its commit point. Test the three exits: normal return with dismiss, early return, and thrown exception. Explain why a throwing callback would be a bug here, and make the destructor safe.',
              kind: 'coding',
              difficulty: 2,
              hint: 'You can make this a template once you reach module 5, which also removes the allocation that `std::function` may perform.',
            },
            {
              slug: 'goto-cleanup-rewrite',
              title: 'Rewrite goto cleanup as RAII',
              prompt:
                'Take a C-style function that opens two files, allocates a buffer with `malloc`, and has four error paths ending in `goto cleanup`. Rewrite it in C++ with `File`, a `std::vector<char>` for the buffer, and no explicit cleanup code at all. Compare line counts and the number of paths on which a resource could leak in each version.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What does stack unwinding do, and why does it make RAII work with exceptions?',
              answerOutline:
                'As an exception propagates, destructors of all fully constructed automatic objects run, in reverse order, up to the handler. Resources owned by those objects are released on the error path without extra code.',
            },
            {
              question: 'Why delete the copy constructor of `File` rather than leave the default?',
              answerOutline:
                'The default copies the pointer, so two objects would own one `FILE*` and both destructors would close it, which is a double close and undefined behaviour.',
            },
            {
              question: 'Why must a destructor not throw?',
              answerOutline:
                'Destructors are implicitly `noexcept`, so a throw calls `std::terminate`. Even if declared otherwise, throwing during unwinding of another exception terminates the program.',
            },
            {
              question: 'Name three non-memory resources that benefit from RAII.',
              answerOutline:
                'For example: files and sockets, mutex locks, thread joins, temporary directories, database transactions.',
            },
          ],
          relatedLessons: [
            'systems-programming/pointers-and-memory/dynamic-memory-and-the-heap',
            'systems-programming/pointers-and-memory/memory-layout-of-a-process',
            'systems-programming/ownership-and-safe-concurrency/ownership-and-borrowing',
          ],
        },
        {
          slug: 'inheritance-and-dynamic-dispatch',
          title: 'Inheritance and dynamic dispatch',
          summary:
            'Virtual functions, abstract interfaces, override and final, virtual destructors, slicing, what a vtable costs, and when to prefer composition.',
          estimatedMinutes: 110,
          objectives: [
            'Define an abstract interface with pure virtual functions and implement it',
            'Use `override` and `final`, and explain what they catch',
            'Explain why a polymorphic base class needs a virtual destructor',
            'Recognize object slicing and avoid it',
            'Describe the vtable mechanism and estimate the cost of a virtual call',
            'Decide when inheritance is the wrong tool',
          ],
          concepts: [
            'Virtual functions and dynamic dispatch',
            'Pure virtual functions and abstract classes',
            '`override` and `final`',
            'Virtual destructors',
            'Object slicing',
            'vtable and vptr',
            'Interface inheritance vs implementation inheritance',
            'Composition over inheritance',
          ],
          explanation: `Inheritance in C++ is a tool for one job: **calling different code through a common interface, chosen at run time**. Declare the interface as an abstract class:

\`\`\`cpp
class Shape {
public:
    virtual ~Shape() = default;
    [[nodiscard]] virtual double area() const = 0;   // pure virtual
};

class Circle final : public Shape {
public:
    explicit Circle(double r) : r_{r} {}
    [[nodiscard]] double area() const override { return std::numbers::pi * r_ * r_; }
private:
    double r_;
};

std::vector<std::unique_ptr<Shape>> shapes;
shapes.push_back(std::make_unique<Circle>(2.0));
\`\`\`

Always write **\`override\`**. Without it, a slightly different signature, such as forgetting \`const\`, silently declares a new function rather than overriding, and nothing fails until run time. \`final\` stops further overriding and allows the compiler to devirtualize.

The **virtual destructor** is required. Deleting a \`Circle\` through a \`Shape*\` when the destructor is not virtual is undefined behaviour. The Core Guidelines rule C.35 states it: a base class destructor should be either public and virtual, or protected and non-virtual.

Polymorphism needs indirection, through a reference or a pointer. Assigning to a plain \`Shape\` value would copy only the base part, which is called **slicing**. Here \`Shape\` is abstract, so the compiler refuses. To be safe for all base classes, delete their copy operations.

**How it works:** each polymorphic object holds a hidden pointer, the *vptr*, to a table of function pointers for its dynamic type. A call loads the vptr, loads the slot, and jumps. That extra cost is small by itself, but the bigger costs are that the call usually cannot be inlined, and that objects tend to be scattered on the heap. Module 8 measures this.

Prefer **composition** when you only want to reuse code. Inherit to share an interface, not an implementation. C++ also has other kinds of polymorphism. Templates, in module 5, decide at compile time, and \`std::variant\`, in module 4, handles a closed set of types by value. Sean Parent's talk argues the point forcefully, and it is worth watching after you know the mechanics.

Read the learncpp chapter on virtual functions and draw the vtable for a small hierarchy by hand.`,
          resources: [
            {
              title: 'learncpp: virtual functions and polymorphism',
              url: 'https://www.learncpp.com/cpp-tutorial/virtual-functions/',
              type: 'textbook',
              cost: 'free',
              provider: 'Learn C++',
              primary: true,
            },
            {
              title: 'learncpp: pure virtual functions, abstract base classes and interfaces',
              url: 'https://www.learncpp.com/cpp-tutorial/pure-virtual-functions-abstract-base-classes-and-interface-classes/',
              type: 'textbook',
              cost: 'free',
              provider: 'Learn C++',
            },
            {
              title: 'learncpp: the virtual table',
              url: 'https://www.learncpp.com/cpp-tutorial/the-virtual-table/',
              type: 'textbook',
              cost: 'free',
              provider: 'Learn C++',
            },
            {
              title: 'Sean Parent: Inheritance Is The Base Class of Evil',
              url: 'https://www.youtube.com/watch?v=bIhUE5uUFOA',
              type: 'lecture',
              cost: 'free',
              provider: 'GoingNative 2013',
              note: 'A short talk on value-based polymorphism. It looks ahead to modules 3 and 5.',
            },
          ],
          exercises: [
            {
              slug: 'shape-hierarchy',
              title: 'Shapes with a table of areas',
              prompt:
                'Implement `Shape`, `Circle`, `Rectangle` and `Triangle` (Heron\'s formula), store them in a `std::vector<std::unique_ptr<Shape>>`, and print each name and area with `std::format`. A test must show that a 3-4-5 triangle has area 6, and a `Rectangle{2, 3}` has area 6. Remove `const` from one override and show that `override` turns a silent bug into a compile error.',
              kind: 'coding',
              difficulty: 1,
            },
            {
              slug: 'missing-virtual-destructor',
              title: 'The missing virtual destructor',
              prompt:
                'Create a base class with one virtual function and a non-virtual destructor, and a derived class that owns a `std::vector<int>`. Delete the derived object through a base pointer, and run it under ASan. Record the report, which should be `new-delete-type-mismatch` or a leak, and the `-Wdelete-non-virtual-dtor` warning that `-Wall` gives you. Add `virtual ~Base() = default;`, and show that both disappear.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'slicing-demo',
              title: 'Slicing in the wild',
              prompt:
                'Using a non-abstract `Animal` with a `virtual std::string speak() const` and a `Dog` that overrides it, show that `void f(Animal a)` prints the base behaviour while `void f(const Animal& a)` prints the derived one. Then store `Dog`s in `std::vector<Animal>` and show the same loss. Finish by deleting the base copy operations and explain how this prevents the bug at compile time.',
              kind: 'coding',
              difficulty: 1,
            },
            {
              slug: 'dispatch-cost',
              title: 'Measure the cost of a virtual call',
              prompt:
                'Build `-O2` code that sums `area()` over 10 million shapes in three ways: virtual calls over heap objects in allocation order, the same after shuffling the pointer vector, and non-virtual calls on a `std::vector<Circle>` by value. Time each with `std::chrono::steady_clock`, over 5 runs, and report medians. Explain which part of the difference comes from dispatch and which from cache misses.',
              kind: 'coding',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'What bug does `override` catch that the compiler would otherwise accept?',
              answerOutline:
                'A function meant to override but with a different signature, such as a missing `const`, which would otherwise hide the base function and declare a new one.',
            },
            {
              question: 'When exactly is a virtual destructor needed?',
              answerOutline:
                'When an object may be deleted through a pointer to its base class. Otherwise make the base destructor protected and non-virtual.',
            },
            {
              question: 'What is object slicing?',
              answerOutline:
                'Copying a derived object into a base value keeps only the base part and loses the derived data and the dynamic type.',
            },
            {
              question: 'Why can a virtual call be more expensive than its extra two loads suggest?',
              answerOutline:
                'It usually blocks inlining and the optimizations that follow from it, it can be mispredicted, and it encourages pointer-chasing data layouts with poor cache behaviour.',
            },
          ],
          relatedLessons: [
            'programming-fundamentals/objects-and-abstraction/inheritance-and-polymorphism',
            'systems-programming/rust-fundamentals/traits-generics-and-collections',
          ],
        },
      ],
    },
    {
      slug: 'value-semantics',
      title: 'Value Semantics: Copy, Move and the Rule of Zero',
      description:
        'The defining design style of C++: types that behave like integers. Copying, moving, value categories, compiler-generated special members, the rule of zero, and operators that make your types feel built in.',
      lessons: [
        {
          slug: 'copying-and-the-rule-of-three',
          title: 'Copying and the rule of three',
          summary:
            'Why value semantics matter, deep versus shallow copies, and how to write a correct copy constructor and copy assignment for a type that owns memory.',
          estimatedMinutes: 110,
          objectives: [
            'Explain value semantics and why they make programs easier to reason about',
            'Write a copy constructor and a copy assignment operator for a class owning a buffer',
            'State the rule of three and the failures that follow from breaking it',
            'Use copy-and-swap to get self-assignment safety and the strong guarantee',
            'Find a double free with ASan and fix it',
          ],
          concepts: [
            'Value semantics vs reference semantics',
            'Deep copy vs shallow copy',
            'Copy constructor vs copy assignment',
            'Rule of three',
            'Self-assignment',
            'Copy-and-swap idiom',
            'Hidden friend `swap`',
            'Strong exception guarantee (first look)',
          ],
          explanation: `In Python, \`b = a\` makes two names for one list. In C++, \`b = a\` makes **two independent objects**, and changing one cannot affect the other. That is **value semantics**, and it gives you *local reasoning*: no distant alias can change your data under you. It also suits threads and caches, because values can be stored contiguously and handed to other threads whole. Every standard type works this way, and well-designed user types do too.

The compiler writes a copy for you by copying each member. For \`int\` and \`std::string\` members that is right. For a raw owning pointer it is a disaster:

\`\`\`cpp
class Buffer {
public:
    explicit Buffer(std::size_t n) : size_{n}, data_{new int[n]{}} {}
    ~Buffer() { delete[] data_; }
private:
    std::size_t size_;
    int* data_;              // default copy shares this pointer
};
\`\`\`

Copy a \`Buffer\` and two objects hold one pointer, so both destructors free it: a **double free**. The **rule of three** says that if you write one of the destructor, copy constructor or copy assignment, you almost certainly need all three.

\`\`\`cpp
Buffer(const Buffer& other)
    : size_{other.size_}, data_{new int[other.size_]} {
    std::copy_n(other.data_, size_, data_);
}

Buffer& operator=(Buffer other) {       // by value: the copy happens here
    swap(*this, other);
    return *this;                       // old contents die with other
}

friend void swap(Buffer& a, Buffer& b) noexcept {
    using std::swap;
    swap(a.size_, b.size_);
    swap(a.data_, b.data_);
}
\`\`\`

The assignment uses the **copy-and-swap** idiom. It takes its argument by value, swaps with it, and lets the destructor clean up the old state. Three problems vanish. Self-assignment works with no special case. If the allocation throws, it does so before \`*this\` is touched, so the target stays intact. And there is only one place where copying logic lives.

The hand-written assignment people often produce first deletes the old array, then allocates. If the allocation throws, the object is left holding a dangling pointer. Self-assignment deletes the data it is about to read.

Read the learncpp page on shallow and deep copying, then write \`Buffer\` yourself rather than copying it from above. Next lesson you will make it faster, and the one after that you will learn how to avoid writing it at all.`,
          resources: [
            {
              title: 'learncpp: shallow vs deep copying',
              url: 'https://www.learncpp.com/cpp-tutorial/shallow-vs-deep-copying/',
              type: 'textbook',
              cost: 'free',
              provider: 'Learn C++',
              primary: true,
            },
            {
              title: 'learncpp: the copy constructor',
              url: 'https://www.learncpp.com/cpp-tutorial/the-copy-constructor/',
              type: 'textbook',
              cost: 'free',
              provider: 'Learn C++',
            },
            {
              title: 'The rule of three/five/zero',
              url: 'https://en.cppreference.com/w/cpp/language/rule_of_three',
              type: 'documentation',
              cost: 'free',
              provider: 'cppreference',
            },
            {
              title: 'Sean Parent: C++ Seasoning (GoingNative 2013)',
              url: 'https://www.youtube.com/watch?v=W2tWOdzgXHA',
              type: 'lecture',
              cost: 'free',
              provider: 'GoingNative 2013',
              note: 'The later sections argue for value-based design. The algorithms sections come back in module 4.',
            },
          ],
          exercises: [
            {
              slug: 'double-free-reproduction',
              title: 'Reproduce and fix a double free',
              prompt:
                'Write the `Buffer` above with only the constructor and destructor. Copy it and run under ASan, recording the `attempting double-free` report and both stack traces. Then write the copy constructor and copy assignment. Tests must show that changing the copy leaves the original unchanged, that `b = b;` keeps the contents, and that ASan reports nothing.',
              kind: 'coding',
              difficulty: 1,
            },
            {
              slug: 'exception-safe-assignment',
              title: 'Compare two assignment operators',
              prompt:
                'Write the naive `operator=` (delete, allocate, copy) and the copy-and-swap version side by side. Replace global `operator new` in the test so that it throws `std::bad_alloc` on request. Show that with the naive version a failed assignment leaves the target dangling and ASan reports a problem on destruction, and that with copy-and-swap the target still holds its old values.',
              kind: 'coding',
              difficulty: 2,
              hint: 'A replacement `void* operator new(std::size_t)` that checks a global flag is enough. You also need the matching `operator delete`, and `operator new[]` forwards to it by default.',
            },
            {
              slug: 'value-vs-reference-demo',
              title: 'Value semantics across languages',
              prompt:
                'Write the same 15-line program in Python and C++: make a list of lists, copy the outer list, then change an inner element. Explain why the Python copy is shared at depth one, whereas `std::vector<std::vector<int>>` copies deeply. Then write a short note saying when you would want reference semantics in C++, and how you would ask for it explicitly.',
              kind: 'writing',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'What does the rule of three state, and why does it exist?',
              answerOutline:
                'If a class needs a custom destructor, copy constructor or copy assignment, it probably needs all three, because all three deal with the same owned resource and the compiler defaults would mishandle it.',
            },
            {
              question: 'Why is the parameter of a copy-and-swap assignment taken by value?',
              answerOutline:
                'The copy is made in the caller before the operator body runs, so a failure leaves `*this` untouched, and the old state is destroyed along with the parameter.',
            },
            {
              question: 'Why does value semantics help with local reasoning?',
              answerOutline:
                'Objects do not share state, so code can only affect the values it holds, and you need not track aliases.',
            },
          ],
          relatedLessons: [
            'systems-programming/pointers-and-memory/dynamic-memory-and-the-heap',
            'software-engineering/design-principles-and-patterns/specifications-and-abstract-data-types',
          ],
        },
        {
          slug: 'move-semantics',
          title: 'Move semantics and value categories',
          summary:
            'Lvalues, rvalues, rvalue references and std::move: how C++ transfers resources instead of copying them, and why noexcept decides whether std::vector uses your move constructor.',
          estimatedMinutes: 130,
          objectives: [
            'Classify expressions as lvalues or rvalues and predict the overload they select',
            'Write a move constructor and move assignment for a resource-owning class',
            'Explain what `std::move` does and does not do',
            'State what may be assumed about a moved-from object',
            'Explain how `noexcept` affects `std::vector` reallocation',
          ],
          concepts: [
            'Value categories: lvalue, xvalue, prvalue',
            'Rvalue reference `T&&`',
            'Move constructor and move assignment',
            '`std::move` is only a cast',
            'Moved-from: valid but unspecified',
            '`noexcept` moves and `std::move_if_noexcept`',
            'A named `T&&` is itself an lvalue',
            'Moving `const` objects copies them',
          ],
          explanation: `A copy of a million-element vector allocates and copies a million elements, even if the source is a temporary about to die. **Move semantics** lets the new object steal the resource instead.

Every expression has a **value category**. Roughly, an **lvalue** has a name and an address you can come back to, such as \`v\`. An **rvalue** is a temporary or something you have declared you are finished with, such as \`make_data()\` or \`std::move(v)\`. An **rvalue reference**, \`T&&\`, binds only to rvalues, so overloading on it gives two paths:

\`\`\`cpp
Buffer(Buffer&& other) noexcept
    : size_{std::exchange(other.size_, 0)},
      data_{std::exchange(other.data_, nullptr)} {}
\`\`\`

No allocation happens. The source is left in a safe, empty state, and its destructor does nothing harmful. That is the whole trick. For a class that owns a resource, a move is a few pointer writes. The by-value \`operator=\` from the last lesson now serves for both cases, because an rvalue argument is moved into its parameter. Do not also add \`operator=(Buffer&&)\`, since the two overloads would be ambiguous.

**\`std::move\` moves nothing.** It is a cast to an rvalue reference, which allows a move constructor to be chosen. Three traps follow:

- A named rvalue reference is an lvalue. Inside \`void f(Buffer&& b)\` you must write \`std::move(b)\` to move on.
- \`std::move\` on a \`const\` object produces \`const T&&\`, which binds to the copy constructor, so you silently copy.
- \`return std::move(local);\` is a pessimization, because it disables copy elision. Just \`return local;\`.

After a move, the standard library promises that objects are **valid but unspecified**. You may destroy them or assign to them. You should not read them or assume they are empty.

Finally, **mark moves \`noexcept\`**. When \`std::vector\` grows, it must keep its strong guarantee: if an element move threw halfway, it could not roll back. So it uses \`std::move_if_noexcept\`, and if your move is not \`noexcept\` and the type is copyable, it copies every element at every reallocation. This is a real, measurable slowdown caused by one missing keyword.

Watch Josuttis's talk for a careful walk through these rules, use the learncpp pages for reference, and do the \`noexcept\` measurement, because it makes the point better than any text.`,
          resources: [
            {
              title: 'Nicolai Josuttis: Back to Basics: Move Semantics (CppCon 2021)',
              url: 'https://www.youtube.com/watch?v=Bt3zcJZIalk',
              type: 'lecture',
              cost: 'free',
              provider: 'CppCon',
              primary: true,
            },
            {
              title: 'learncpp: move constructors and move assignment',
              url: 'https://www.learncpp.com/cpp-tutorial/move-constructors-and-move-assignment/',
              type: 'textbook',
              cost: 'free',
              provider: 'Learn C++',
            },
            {
              title: 'learncpp: std::move_if_noexcept',
              url: 'https://www.learncpp.com/cpp-tutorial/stdmove_if_noexcept/',
              type: 'textbook',
              cost: 'free',
              provider: 'Learn C++',
            },
            {
              title: 'Value categories',
              url: 'https://en.cppreference.com/w/cpp/language/value_category',
              type: 'documentation',
              cost: 'free',
              provider: 'cppreference',
              note: 'Reference only. You need lvalue and rvalue first, with xvalue and prvalue later.',
            },
            {
              title: 'C++ Insights',
              url: 'https://cppinsights.io/',
              type: 'tool',
              cost: 'free',
              provider: 'Andreas Fertig',
              note: 'Shows what the compiler generates, including implicit moves and special members.',
            },
          ],
          exercises: [
            {
              slug: 'instrumented-type',
              title: 'An instrumented type',
              prompt:
                'Write `struct Noisy` that counts default constructions, copies, moves and destructions in static counters. Predict and then verify the counts for: `Noisy a; Noisy b = a; Noisy c = std::move(a);`, for `std::vector<Noisy> v; v.push_back(Noisy{});`, and for `v.emplace_back();`. Explain every count. You will reuse this type for the rest of the module.',
              kind: 'coding',
              difficulty: 1,
            },
            {
              slug: 'buffer-move',
              title: 'Give Buffer move operations',
              prompt:
                'Add a move constructor to `Buffer`, and mark the by-value `operator=` `noexcept`. Tests must show: a moved-from `Buffer` has size 0 and can be assigned to; moving a 100 MB buffer allocates nothing (count with a replaced `operator new`); and `b = std::move(b);` leaves the data intact. Run under ASan and UBSan.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'noexcept-measurement',
              title: 'One keyword, measured',
              prompt:
                'With `Buffer` holding 1 KiB each, `push_back` 100,000 objects into a `std::vector` without `reserve`. Measure the time and count copy constructions in two builds: move constructor `noexcept` and move constructor not `noexcept`. Then make the class move-only and show the non-`noexcept` version moves again. Explain all three results using `std::move_if_noexcept`.',
              kind: 'coding',
              difficulty: 2,
              hint: 'With doubling growth, the total number of elements relocated across all reallocations is about the final size.',
            },
            {
              slug: 'move-traps',
              title: 'Spot the traps',
              prompt:
                'For each snippet, say whether a copy or move happens and fix any mistake: (a) `const std::string s = make(); std::string t = std::move(s);`, (b) `std::string f() { std::string r = make(); return std::move(r); }`, (c) `void g(std::string&& s) { store(s); }`, (d) `v.push_back(std::move(x)); std::cout << x.size();`. Verify with `Noisy` where you can, and confirm (b) with `-Wpessimizing-move` or `-Wredundant-move`.',
              kind: 'problem',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What does `std::move` actually do at run time?',
              answerOutline:
                'Nothing. It is a cast to an rvalue reference, which only affects which overload is selected at compile time.',
            },
            {
              question: 'Inside `void f(Buffer&& b)`, is `b` an lvalue or an rvalue? What follows from that?',
              answerOutline:
                'An lvalue, because it has a name. To move from it you must write `std::move(b)`, and a plain `store(b)` copies.',
            },
            {
              question: 'What can you do with a moved-from `std::string`?',
              answerOutline:
                'Destroy it or assign a new value. It is valid but unspecified, so operations with no preconditions such as `clear()` are fine, while reading the old contents is not meaningful.',
            },
            {
              question: 'Why does `std::vector` copy elements on reallocation when their move constructor can throw?',
              answerOutline:
                'To keep its strong exception guarantee. A throw midway through moving would leave the old buffer damaged, whereas a failed copy leaves it intact.',
            },
            {
              question: 'Why is `return std::move(local);` usually wrong?',
              answerOutline:
                'It turns a name into an xvalue, which disables named return value optimization. A plain `return local;` already moves if elision does not happen.',
            },
          ],
          relatedLessons: ['systems-programming/ownership-and-safe-concurrency/ownership-and-borrowing'],
        },
        {
          slug: 'rule-of-zero-and-special-members',
          title: 'The rule of zero and special members',
          summary:
            'When the compiler writes special members for you, how to arrange classes so you write none, and how copy elision and sink parameters finish the picture.',
          estimatedMinutes: 100,
          objectives: [
            'Predict which special members the compiler declares for a class',
            'Apply the rule of zero by composing small RAII members',
            'Explain mandatory and optional copy elision',
            'Use pass-by-value sink parameters correctly',
            'Use `= default` and `= delete` deliberately',
          ],
          concepts: [
            'Six special member functions',
            'Implicit generation rules',
            'Rule of five vs rule of zero',
            '`= default` and `= delete`',
            'Mandatory elision of prvalues (C++17)',
            'Named return value optimization',
            'Sink parameters: take by value and move',
            'Move-only types',
          ],
          explanation: `The compiler can write six **special members**: default constructor, destructor, copy constructor, copy assignment, move constructor and move assignment. Which it writes depends on what you declared:

- Declaring **any** copy operation, move operation or destructor suppresses the implicit **move** operations.
- Declaring a **move** operation makes the implicit **copy** operations deleted.
- Declaring **any** constructor suppresses the default constructor.

The dangerous one is the first. Add \`~Widget() { log(); }\` to a class and it silently loses its moves, so code that used to move now copies, with no warning. Howard Hinnant's table on his site is the best summary, and it is worth keeping nearby.

The **rule of five** says: if you write any one of the destructor and the four copy and move operations, consider all five. But the better rule is the **rule of zero**: *most classes should declare none of them.* Put each resource in a small type that manages only that resource, and let the others compose:

\`\`\`cpp
class Document {                   // no special members at all
public:
    explicit Document(std::string title) : title_{std::move(title)} {}
private:
    std::string title_;                 // manages its own memory
    std::vector<Section> sections_;     // so does this
    std::unique_ptr<Index> index_;      // and this; Document is move-only
};
\`\`\`

The compiler's generated members do the right thing, member by member, and they are \`noexcept\` when the members' are. The class \`Buffer\` from the last two lessons is the rare case: a *resource manager*. Write one when no library type fits, keep it tiny, and build everything else from it. A file wrapper can often be a \`std::unique_ptr\` with a custom deleter, again with zero special members.

**Copy elision** removes copies entirely. Since C++17, initializing an object from a prvalue constructs it directly in place, which is required, not optional: \`Widget w = make_widget();\` makes one object, and it works even for non-movable types. Returning a *named* local (NRVO) is usually elided too, but this is optional, and the fallback is a move.

That also explains **sink parameters**. When a function will store its argument, take it by value and move:

\`\`\`cpp
void set_name(std::string name) { name_ = std::move(name); }
\`\`\`

An lvalue argument costs one copy and one move. An rvalue costs two moves. Compare that with writing two overloads.

Finish O'Dwyer's talk now and read the elision page on cppreference. In the exercises you will delete code, the best part of this lesson.`,
          resources: [
            {
              title: 'Howard Hinnant: How I declare my class and why',
              url: 'https://howardhinnant.github.io/classdecl.html',
              type: 'article',
              cost: 'free',
              provider: 'Howard Hinnant',
              note: 'Short and authoritative, and it contains the table of what the compiler generates.',
              primary: true,
            },
            {
              title: 'Arthur O\'Dwyer: Back to Basics: RAII and the Rule of Zero (CppCon 2019)',
              url: 'https://www.youtube.com/watch?v=7Qgd9B1KuMQ',
              type: 'lecture',
              cost: 'free',
              provider: 'CppCon',
              note: 'Finish the second half now.',
            },
            {
              title: 'Copy elision',
              url: 'https://en.cppreference.com/w/cpp/language/copy_elision',
              type: 'documentation',
              cost: 'free',
              provider: 'cppreference',
            },
            {
              title: 'Abseil Tip of the Week #77: Temporaries, Moves, and Copies',
              url: 'https://abseil.io/tips/77',
              type: 'article',
              cost: 'free',
              provider: 'Abseil',
            },
            {
              title: 'Abseil Tip of the Week #117: Copy Elision and Pass-by-value',
              url: 'https://abseil.io/tips/117',
              type: 'article',
              cost: 'free',
              provider: 'Abseil',
            },
          ],
          exercises: [
            {
              slug: 'predict-special-members',
              title: 'Predict the special members',
              prompt:
                'For five classes (empty; has a user destructor; has a user copy constructor; has a user move constructor; has a `std::unique_ptr` member) fill a table showing whether each of the six special members is implicitly declared, defaulted or deleted. Verify every cell with `static_assert` on `std::is_default_constructible_v`, `std::is_copy_constructible_v`, `std::is_move_constructible_v` and the matching assignment traits, and check the results in C++ Insights.',
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'destructor-kills-moves',
              title: 'A destructor that kills moves',
              prompt:
                'Using `Noisy` members, write a class with a logging destructor and show with counters that `std::vector` growth now copies. Fix it with the five `= default` declarations, then fix it better by moving the logging into a small member type, so the class has no special members at all. Show the counters for all three versions.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'delete-your-code',
              title: 'Delete your special members',
              prompt:
                'Rewrite the module 2 `File` class as a type alias or thin class over `std::unique_ptr<std::FILE, Closer>`, so that it has no user-written destructor or move operations. Show that it is move-only with `static_assert`, that a `std::vector<File>` works, and that it has the same size as a raw pointer when `Closer` is an empty function object. Count the lines of code you deleted.',
              kind: 'coding',
              difficulty: 2,
              hint: 'An empty deleter stored inside `unique_ptr` takes no space, so `sizeof` equals `sizeof(void*)`.',
            },
            {
              slug: 'elision-audit',
              title: 'Audit elision with Noisy',
              prompt:
                'Count copies and moves for: `Noisy make() { return Noisy{}; }`; `Noisy make() { Noisy n; return n; }`; a function with two named returns chosen by an `if`; and `Noisy n = cond ? make() : make();`. Compile at `-O0` and `-O2`. State which results are guaranteed and which are only permitted, then compare the same function using `-fno-elide-constructors`.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Adding a user-declared destructor to a class changes what about moves?',
              answerOutline:
                'The move constructor and move assignment are no longer generated, so rvalues fall back to the copy operations, silently.',
            },
            {
              question: 'State the rule of zero and say which classes are the exception.',
              answerOutline:
                'Classes should declare no special members and rely on members to manage themselves. The exception is a small class whose only job is to manage one resource.',
            },
            {
              question: 'What is guaranteed about `Widget w = make_widget();` when `make_widget` returns a prvalue?',
              answerOutline:
                'Since C++17, no copy or move happens: the object is constructed directly in `w`, even for a type with deleted copy and move.',
            },
            {
              question: 'What does a by-value sink parameter cost for an lvalue and for an rvalue argument?',
              answerOutline:
                'Lvalue: one copy into the parameter, one move into the member. Rvalue: two moves, with the first often elided for a temporary.',
            },
          ],
          relatedLessons: ['systems-programming/ownership-and-safe-concurrency/lifetimes-and-smart-pointers'],
        },
        {
          slug: 'operators-and-regular-types',
          title: 'Operators and regular types',
          summary:
            'Make your types feel built in: arithmetic and stream operators, hidden friends, C++20 three-way comparison, and what it means for a type to be regular.',
          estimatedMinutes: 100,
          objectives: [
            'Overload arithmetic, compound assignment and stream operators idiomatically',
            'Write operators as hidden friends and explain why this is preferred',
            'Use `<=>` and defaulted comparisons, and choose a comparison category',
            'Explain the `regular` concept and test a type against it',
            'Decide when an operator overload would mislead readers',
          ],
          concepts: [
            '`+` written in terms of `+=`',
            'Hidden friends',
            'Argument-dependent lookup',
            'Three-way comparison `<=>`',
            '`std::strong_ordering`, `weak_ordering`, `partial_ordering`',
            'Defaulted `operator==` and `operator<=>`',
            'Rewritten comparison candidates',
            'Regular types',
            'Stream insertion `operator<<`',
          ],
          explanation: `A well-designed value type should work like \`int\`: copyable, comparable, and written with the operators people expect. Overload an operator only when its meaning is obvious. \`+\` for numbers and strings, yes. \`+\` to add a row to a database, no.

The standard pattern is to write the compound operator as a member, then define the binary operator from it, as a **hidden friend**:

\`\`\`cpp
class Money {
public:
    explicit Money(std::int64_t cents) : cents_{cents} {}

    Money& operator+=(Money other) { cents_ += other.cents_; return *this; }

    friend Money operator+(Money a, Money b) { a += b; return a; }
    friend auto operator<=>(const Money&, const Money&) = default;
    friend std::ostream& operator<<(std::ostream& os, Money m) {
        return os << m.cents_ / 100 << '.' << std::format("{:02}", m.cents_ % 100);
    }

private:
    std::int64_t cents_;
};
\`\`\`

A friend function defined inside the class is **hidden**: it is found only by argument-dependent lookup, when one argument is a \`Money\`. That keeps it out of overload sets for unrelated types, which improves compile times and error messages. And unlike a member, it allows conversions on both sides.

C++20's **\`operator<=>\`**, the spaceship, replaces six hand-written comparisons. Defaulting it compares members in declaration order, and the compiler rewrites \`a < b\` as \`(a <=> b) < 0\`. A defaulted \`<=>\` also implies a defaulted \`==\`. If you write a custom \`<=>\`, then define \`==\` as well, since \`==\` is often cheaper. For example, two strings of different lengths can never be equal.

The return type states the kind of order. \`std::strong_ordering\` means equal values are interchangeable, as with integers. \`std::weak_ordering\` means equivalent values may differ, as in case-insensitive strings. \`std::partial_ordering\` allows incomparable values, as \`double\` does with NaN.

A type is **regular** when it is default constructible, copyable, and equality comparable, with copies equal to their source and independent of it. That is Alexander Stepanov's idea, and it is the contract the standard containers and algorithms were designed around. C++20 gives it a name: \`static_assert(std::regular<Money>);\` fails here because \`Money\` has no default constructor. Decide consciously whether that is right.

Read the cppreference pages on default comparisons and operator overloading. MP 1 is largely an exercise in this lesson.`,
          resources: [
            {
              title: 'Default comparisons',
              url: 'https://en.cppreference.com/w/cpp/language/default_comparisons',
              type: 'documentation',
              cost: 'free',
              provider: 'cppreference',
              primary: true,
            },
            {
              title: 'operator overloading',
              url: 'https://en.cppreference.com/w/cpp/language/operators',
              type: 'documentation',
              cost: 'free',
              provider: 'cppreference',
              note: 'The canonical implementations section is the part to use.',
            },
            {
              title: 'learncpp: overloading the arithmetic operators using friend functions',
              url: 'https://www.learncpp.com/cpp-tutorial/overloading-the-arithmetic-operators-using-friend-functions/',
              type: 'textbook',
              cost: 'free',
              provider: 'Learn C++',
            },
            {
              title: 'std::regular',
              url: 'https://en.cppreference.com/w/cpp/concepts/regular',
              type: 'documentation',
              cost: 'free',
              provider: 'cppreference',
            },
          ],
          exercises: [
            {
              slug: 'vector2-operators',
              title: 'A complete Vec2',
              prompt:
                'Write `struct Vec2 { double x, y; }` with `+`, `-`, `+=`, unary `-`, scalar `*` on both sides, `operator==`, and `operator<<` printing `(x, y)`. Tests must show `Vec2{1, 2} + Vec2{3, 4} == Vec2{4, 6}`, that `2.0 * Vec2{1, 2}` compiles, and that the type is `constexpr`-usable, with one `static_assert`. Explain why `operator<<` cannot be a member.',
              kind: 'coding',
              difficulty: 1,
            },
            {
              slug: 'spaceship-version',
              title: 'Spaceship for a version number',
              prompt:
                'Write `struct Version { int major, minor, patch; };` with a defaulted `<=>`. Show `Version{1, 2, 3} < Version{1, 10, 0}` and sort a vector of 6 versions. Then write `class CaselessString` with a custom `<=>` returning `std::weak_ordering`, and show that `"Hello"` and `"hello"` are equivalent, yet print differently. Finally explain why `<=>` on `double` returns `std::partial_ordering`, and test the result of comparing a NaN.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'regular-checklist',
              title: 'Is it regular?',
              prompt:
                'Add `static_assert(std::regular<T>)` for `int`, `std::string`, `std::vector<int>`, `std::unique_ptr<int>`, your `Fraction`, your `Buffer` and `Money`. For each failure, explain which requirement is missing, and decide whether to fix it. Write a test that, for one type, checks by hand that a copy equals its source and that changing the copy leaves the source unchanged.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why write `operator+` as a hidden friend rather than a member?',
              answerOutline:
                'Conversions then apply to both operands, and a hidden friend is only found through ADL, which keeps overload sets small and speeds up compilation.',
            },
            {
              question: 'What does `auto operator<=>(const T&, const T&) = default;` generate?',
              answerOutline:
                'Memberwise three-way comparison in declaration order, and an implicit defaulted `==`. The other relational operators are rewritten from these.',
            },
            {
              question: 'What is the difference between `strong_ordering` and `weak_ordering`?',
              answerOutline:
                'Under strong ordering, equal values are substitutable. Under weak ordering, equivalent values can still be distinguished, as with case-insensitive strings.',
            },
            {
              question: 'What makes a type regular?',
              answerOutline:
                'Default constructible, copyable and equality comparable, so it behaves like `int`: copies are equal and independent.',
            },
          ],
          relatedLessons: ['programming-fundamentals/objects-and-abstraction/dataclasses-and-special-methods'],
        },
      ],
    },
    {
      slug: 'standard-library',
      title: 'The Standard Library',
      description:
        'Stop writing loops and containers by hand: choose the right container, use lambdas and algorithms, compose lazy ranges, and model your data with string_view, span, optional and variant.',
      lessons: [
        {
          slug: 'containers-and-iterator-invalidation',
          title: 'Containers and iterator invalidation',
          summary:
            'What each standard container really does in memory, why std::vector is the default, how to use maps well, and which operations invalidate your iterators.',
          estimatedMinutes: 110,
          objectives: [
            'Choose among `vector`, `array`, `deque`, `map` and `unordered_map` from memory layout and complexity',
            'Explain why `std::vector` often beats a linked list even for insertion in the middle',
            'Use `reserve`, `emplace_back`, `try_emplace` and `contains` where they matter',
            'State the iterator invalidation rules of `vector` and `unordered_map`',
            'Use a custom key type in `map` and in `unordered_map`',
          ],
          concepts: [
            '`std::vector` as the default container',
            'Size vs capacity, amortized growth',
            '`std::array`: fixed size, no allocation',
            'Node-based vs contiguous containers',
            '`std::map` (ordered tree) vs `std::unordered_map` (hash table)',
            'Iterator invalidation',
            '`emplace_back` and `try_emplace`',
            'Custom hash and transparent comparators',
          ],
          explanation: `The Standard Library containers share an interface but differ in memory layout, and on modern hardware layout matters more than the Big-O column in many cases.

**\`std::vector\` is the default.** It keeps elements in one contiguous block, so scanning touches consecutive cache lines and the prefetcher helps. Growth reallocates and moves everything, yet amortized \`push_back\` is $O(1)$, and \`reserve(n)\` removes the reallocations when you know the size. Stroustrup's well-known measurements show a vector beating \`std::list\` for inserting at sorted positions, even though the list has $O(1)$ insertion, because finding the position is what dominates and walking linked nodes is slow.

The rest have specific jobs:

- \`std::array<T, N>\`: fixed size known at compile time, no heap.
- \`std::deque\`: fast at both ends, with stable references when you only add at the ends.
- \`std::map\`: a balanced tree. Keys stay sorted, so range queries work, but each node is a separate allocation.
- \`std::unordered_map\`: a hash table with a node for each element. Average $O(1)$ lookup, no order, and more overhead than you might expect.

Prefer a sorted \`std::vector\` for data built once and searched many times.

\`\`\`cpp
std::unordered_map<std::string, int> counts;
++counts[word];                              // default-inserts 0, then increments
if (counts.contains("the")) { /* ... */ }    // C++20: no find() == end()
auto [it, inserted] = counts.try_emplace(word, 1);
\`\`\`

Beware that \`operator[]\` *inserts* when the key is missing, so it is not available on a \`const\` map. Use \`find\`, \`at\` or \`contains\` when you only want to look.

**Iterator invalidation** is the rule you must memorize. In a \`vector\`, any reallocation invalidates all iterators, references and pointers, and \`insert\` or \`erase\` invalidates everything after that point. \`unordered_map\` rehashing invalidates iterators but not references to elements. \`map\` and \`list\` only invalidate what you erase. Modifying a container in a range-based \`for\` over it is the most common way to hit this, and ASan will catch it in a \`vector\`.

For a custom key, give \`map\` an \`operator<=>\`. Give \`unordered_map\` a hash function object and \`==\`, combining the hashes of the fields carefully. Treat \`std::hash\` as a building block rather than as a high-quality hash.

Read the Containers overview on cppreference, in particular the iterator invalidation table. Then watch Carruth's talk, which explains why these layout differences are so dramatic.`,
          resources: [
            {
              title: 'Containers library overview',
              url: 'https://en.cppreference.com/w/cpp/container',
              type: 'documentation',
              cost: 'free',
              provider: 'cppreference',
              note: 'Find the iterator invalidation table at the bottom of the page.',
              primary: true,
            },
            {
              title: 'Chandler Carruth: Efficiency with Algorithms, Performance with Data Structures (CppCon 2014)',
              url: 'https://www.youtube.com/watch?v=fHNmRkzxHWs',
              type: 'lecture',
              cost: 'free',
              provider: 'CppCon',
              note: 'Why contiguous data wins, with concrete advice on `std::map` and friends.',
            },
            {
              title: 'hacking C++: cheat sheets',
              url: 'https://hackingcpp.com/cpp/cheat_sheets.html',
              type: 'documentation',
              cost: 'free',
              provider: 'hackingCpp',
              note: 'Visual summaries of containers and algorithms. Print the container one.',
            },
            {
              title: 'learncpp: std::vector capacity and stack behavior',
              url: 'https://www.learncpp.com/cpp-tutorial/stdvector-capacity-and-stack-behavior/',
              type: 'textbook',
              cost: 'free',
              provider: 'Learn C++',
            },
          ],
          exercises: [
            {
              slug: 'growth-factor',
              title: 'Measure the growth factor',
              prompt:
                'Push 1,000,000 ints into a `std::vector` and record each capacity change. Report the growth factor for libstdc++, and the total number of element moves across reallocations. Repeat with `reserve(1000000)` and compare the elapsed time over 5 runs. If you can, repeat with MSVC or libc++ in Compiler Explorer and note the different factor. Relate the total to the amortized argument.',
              kind: 'coding',
              difficulty: 1,
            },
            {
              slug: 'vector-vs-list-insert',
              title: 'Reproduce vector vs list',
              prompt:
                'Insert N random ints into a sequence, keeping it sorted, by linear search for the position then insert, for N = 1,000, 10,000 and 50,000, using `std::vector` and `std::list`, at `-O2`. Tabulate the median of 5 runs. Then add a binary-search version for `vector`. Explain each result in terms of cache lines, and find the N at which `list` would win on your machine, if any.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'custom-hash-key',
              title: 'A custom key',
              prompt:
                'Define `struct GridPos { int x, y; }` with a defaulted `<=>`, and a hash function object. Use it as a key in both `std::map` and `std::unordered_map`, counting visits along a random walk of 1,000,000 steps with a fixed seed. Check that both give identical counts. Then replace your hash with one returning a constant, measure the slowdown on 10,000 steps, and explain it.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'invalidation-bugs',
              title: 'Invalidation bug hunt',
              prompt:
                'Write three bugs: (a) `push_back` in a range-based `for` over the same `vector`, (b) `erase` in an iterator loop without using its return value, (c) keeping an `unordered_map` iterator across `reserve`. Run each under ASan and with `-D_GLIBCXX_DEBUG`, and record what each tool says. Fix (a) with an index loop and (b) with `std::erase_if`.',
              kind: 'coding',
              difficulty: 2,
              hint: '`_GLIBCXX_DEBUG` enables checked iterators in libstdc++, and catches some bugs ASan misses.',
            },
          ],
          selfAssessment: [
            {
              question: 'Why does a `std::vector` often beat `std::list` for sorted insertion, despite the $O(n)$ shift?',
              answerOutline:
                'Both need a linear walk to find the position. The vector walk and the shift are sequential memory operations, while the list walk chases pointers through cache misses, which dominates the cost.',
            },
            {
              question: 'What does `m[key]` do when the key is missing, and what is the consequence for `const` maps?',
              answerOutline:
                'It default-constructs a value and inserts it. Because it may modify the map, it is unavailable on a `const` map.',
            },
            {
              question: 'Which `vector` operations invalidate all iterators?',
              answerOutline:
                'Anything that reallocates: `push_back` or `insert` beyond capacity, `reserve` and `shrink_to_fit` when they reallocate. `insert` and `erase` always invalidate from that position onward.',
            },
            {
              question: 'When would you use `std::map` instead of `std::unordered_map`?',
              answerOutline:
                'When you need sorted iteration or range queries such as `lower_bound`, or when you need guaranteed $O(\\log n)$ rather than average-case behaviour.',
            },
          ],
          relatedLessons: [
            'data-structures-algorithms/linear-structures/arrays-and-dynamic-arrays',
            'data-structures-algorithms/hashing/hash-tables-and-hash-functions',
            'data-structures-algorithms/trees-and-heaps/balanced-trees',
            'data-structures-algorithms/advanced-topics/amortized-analysis',
          ],
        },
        {
          slug: 'lambdas-iterators-and-algorithms',
          title: 'Lambdas, iterators and algorithms',
          summary:
            'Write closures, understand iterator categories, and replace raw loops with named standard algorithms.',
          estimatedMinutes: 120,
          objectives: [
            'Write lambdas with correct capture modes and predict their lifetime issues',
            'Explain the iterator categories and what each algorithm requires',
            'Replace raw loops with `sort`, `find_if`, `transform`, `accumulate`, `partition` and friends',
            'Use the erase idiom through `std::erase_if`',
            'Use `std::function` only when type erasure is really needed',
          ],
          concepts: [
            'Lambda as an unnamed function object',
            'Capture by value `[=]` and by reference `[&]`',
            'Dangling captures',
            'Iterator categories: input, forward, bidirectional, random access, contiguous',
            'Half-open ranges `[begin, end)`',
            'Algorithm families: search, mutate, sort, numeric',
            '`std::erase_if`',
            '`std::function` and its cost',
          ],
          explanation: `A **lambda** creates an unnamed object with an \`operator()\`. Whatever you capture becomes a data member:

\`\`\`cpp
int threshold = 10;
auto big = [threshold](int x) { return x > threshold; };   // copy
auto count = 0;
auto tick = [&count] { ++count; };                         // reference
\`\`\`

Capture by value when the lambda may outlive the scope, and be explicit about what you capture. A lambda that captures a local by reference and is then stored or returned is a dangling reference waiting to happen. \`[=]\` inside a member function captures \`this\`, not the members, so prefer \`[*this]\` or a named capture such as \`[n = size_]\`. A lambda's type is unique, so templates take them cheaply, and calls are usually inlined. \`std::function<int(int)>\` can hold any callable, but it pays for that with an indirect call and sometimes an allocation. Use it only when you must store different callables in one type.

**Iterators** generalize pointers, and **ranges are half-open**: \`[begin, end)\`, where \`end\` is one past the last. An algorithm states what it needs through **iterator categories**: \`find\` needs only an input iterator, \`reverse\` a bidirectional one, and \`sort\` a random-access one. That is why you cannot call \`std::sort\` on a \`std::list\`.

Sean Parent's famous advice is **no raw loops**. A named algorithm says what the code does, is already tested, and may run faster:

\`\`\`cpp
std::sort(people.begin(), people.end(),
          [](const Person& a, const Person& b) { return a.age < b.age; });

auto it = std::find_if(v.begin(), v.end(), [](int x) { return x < 0; });
int total = std::accumulate(v.begin(), v.end(), 0);
std::erase_if(v, [](int x) { return x % 2 == 0; });      // C++20
\`\`\`

The comparator passed to \`sort\` must be a *strict weak ordering*. \`<=\` breaks the contract and can crash. Note also the type trap in \`accumulate\`: the initial value sets the result type, so summing doubles with \`0\` truncates at each step.

Learn the families by reading through \`<algorithm>\` once: search (\`find\`, \`binary_search\`, \`lower_bound\`), modify (\`transform\`, \`replace\`, \`rotate\`), partition (\`partition\`, \`stable_partition\`), sort (\`sort\`, \`stable_sort\`, \`partial_sort\`, \`nth_element\`), and numeric (\`accumulate\`, \`reduce\`, \`inner_product\`). Before \`std::erase_if\`, removing elements needed the "erase-remove" idiom, which you will still see in older code.

Watch the first half of *C++ Seasoning*, then do the exercises. The goal is to reach the point where a hand-written index loop looks suspicious.`,
          resources: [
            {
              title: 'Sean Parent: C++ Seasoning (GoingNative 2013)',
              url: 'https://www.youtube.com/watch?v=W2tWOdzgXHA',
              type: 'lecture',
              cost: 'free',
              provider: 'GoingNative 2013',
              note: 'The "no raw loops" section, including the `gather` and `rotate` examples.',
              primary: true,
            },
            {
              title: 'Algorithms library',
              url: 'https://en.cppreference.com/w/cpp/algorithm',
              type: 'documentation',
              cost: 'free',
              provider: 'cppreference',
            },
            {
              title: 'learncpp: introduction to lambdas',
              url: 'https://www.learncpp.com/cpp-tutorial/introduction-to-lambdas-anonymous-functions/',
              type: 'textbook',
              cost: 'free',
              provider: 'Learn C++',
            },
            {
              title: 'learncpp: lambda captures',
              url: 'https://www.learncpp.com/cpp-tutorial/lambda-captures/',
              type: 'textbook',
              cost: 'free',
              provider: 'Learn C++',
            },
            {
              title: 'Lambda expressions',
              url: 'https://en.cppreference.com/w/cpp/language/lambda',
              type: 'documentation',
              cost: 'free',
              provider: 'cppreference',
            },
          ],
          exercises: [
            {
              slug: 'no-raw-loops',
              title: 'No raw loops',
              prompt:
                'Using only standard algorithms and lambdas, with no `for` or `while`, on a `std::vector<int>`: count the negatives; check whether it is sorted; find the first run of three equal neighbours; move all zeros to the end, keeping the rest in order; compute the mean of the top 10% using `nth_element`. Test each on `{3, -1, 0, 0, 0, 7, 2}`, with expected results 1, not sorted, position 2, `{3, -1, 7, 2, 0, 0, 0}`, and mean 7 for the top element.',
              kind: 'coding',
              difficulty: 2,
              hint: 'Use `std::search_n` for the run, and `std::stable_partition` for the zeros.',
            },
            {
              slug: 'capture-bugs',
              title: 'Capture bugs',
              prompt:
                'Write `std::function<int()> make_counter()`, once capturing a local by reference, and once by value with `mutable`. Call each three times, under ASan with `ASAN_OPTIONS=detect_stack_use_after_return=1`. Expected: the first reports `stack-use-after-return`, and the second prints 1, 2, 3. Then show a member function where `[=]` captures `this`, and a dangling use after the object is destroyed, and fix it with an init-capture.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'employee-report',
              title: 'An employee report',
              prompt:
                'Given a `std::vector<Employee>` with name, department and salary, use algorithms to print, per department, the headcount and highest-paid person, with departments in alphabetical order and ties broken by name. Build a `std::map<std::string, std::vector<Employee>>` first, and use `std::max_element` with a lambda. Then use `std::stable_sort` by department after a sort by salary, and explain why stability makes that work.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'comparator-contract',
              title: 'Break the comparator contract',
              prompt:
                'Call `std::sort` on a vector of 100 equal ints with the comparator `a <= b`, built with `-D_GLIBCXX_DEBUG` and then under ASan, and record what happens. Explain the three properties of a strict weak ordering, and why `<=` violates one of them. Also show the `std::accumulate(v.begin(), v.end(), 0)` truncation bug on a vector of doubles with expected and actual outputs.',
              kind: 'coding',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'What does a lambda compile to?',
              answerOutline:
                'An instance of a unique unnamed class with an `operator()` and one data member per capture.',
            },
            {
              question: 'Why can `std::sort` not be used on a `std::list`?',
              answerOutline:
                'It needs random-access iterators, and a list only has bidirectional ones. Use the `list::sort` member instead.',
            },
            {
              question: 'When is `std::function` justified over a template parameter?',
              answerOutline:
                'When different callables must be stored in one type, for example in a container or as a class member. It costs an indirect call and possibly an allocation.',
            },
            {
              question: 'Why does `[=]` in a member function not protect you from a dangling object?',
              answerOutline:
                'It captures `this` by value, not the members, so the lambda still reads through a pointer to the object.',
            },
          ],
          relatedLessons: [
            'data-structures-algorithms/sorting-and-searching/mergesort-and-quicksort',
            'data-structures-algorithms/sorting-and-searching/selection-and-order-statistics',
          ],
        },
        {
          slug: 'ranges-and-views',
          title: 'Ranges and views',
          summary:
            'C++20 algorithms that take whole containers, projections, and lazy views you compose with pipes, along with their sharp edges.',
          estimatedMinutes: 110,
          objectives: [
            'Call `std::ranges` algorithms with projections',
            'Compose lazy pipelines with `std::views`',
            'Explain what a view is and why it is cheap to copy',
            'Avoid dangling views and the caching behaviour of `filter`',
            'Convert a view into a container in C++20',
          ],
          concepts: [
            '`std::ranges` algorithms',
            'Projections',
            'Views: lazy, non-owning',
            'Pipe composition with `|`',
            '`views::filter`, `transform`, `take`, `drop`, `reverse`, `iota`, `split`, `keys`',
            'Sentinels',
            '`std::ranges::dangling` and borrowed ranges',
            'Caching in `filter_view`',
          ],
          explanation: `Ranges are the most visible library change in C++20. First, the algorithms in \`std::ranges\` take a whole container, and they accept a **projection** that picks what to compare:

\`\`\`cpp
std::ranges::sort(people, {}, &Person::age);
auto it = std::ranges::find(people, "Ada", &Person::name);
\`\`\`

Second, **views** are lazy descriptions of a sequence. They are cheap to copy, do not own elements in the usual case, and do no work until iterated:

\`\`\`cpp
namespace views = std::views;

auto squares = views::iota(1)
             | views::filter([](int n) { return n % 2 == 1; })
             | views::transform([](int n) { return n * n; })
             | views::take(5);

for (int s : squares) std::cout << s << ' ';    // 1 9 25 49 81
\`\`\`

\`views::iota(1)\` is infinite, and the pipeline works because each element is pulled through on demand. This is like a Python generator or a Rust iterator chain, and the compiler usually optimizes the abstraction away.

Views have real pitfalls, which you must learn along with the syntax.

**Dangling.** A view stores references into the underlying data. A function that returns \`vec | views::filter(pred)\` for a local \`vec\` returns a dangling view. Ranges algorithms protect you partly: \`std::ranges::find(make_vector(), 1)\` returns \`std::ranges::dangling\` rather than an iterator into a dead temporary, and this fails to compile when you dereference it. Types that are safe in this situation, like \`std::string_view\`, are called *borrowed ranges*.

**Caching.** \`filter_view::begin()\` caches its result, so that it is amortized $O(1)$. As a result it has no \`const\` overload, so you cannot iterate one through a \`const&\`. And if you iterate a filter view, change elements so that they no longer satisfy the predicate, and iterate again, the behaviour is undefined.

**Single-pass.** Some views, such as \`std::views::istream\`, can only be walked once.

**Materializing.** C++23 has \`std::ranges::to<std::vector>()\`. In C++20 you can write \`std::vector<int> out; std::ranges::copy(view, std::back_inserter(out));\`.

Do not turn every loop into a pipeline. Use one when it reads as a clear sequence of steps, and keep a plain \`for\` when you need early exit with complex state. Tristan Brindle's overview is the best introduction. Then experiment in Compiler Explorer, where the compiler output often collapses to a simple loop.`,
          resources: [
            {
              title: 'Tristan Brindle: An Overview of Standard Ranges (CppCon 2019)',
              url: 'https://www.youtube.com/watch?v=SYLgG7Q5Zws',
              type: 'lecture',
              cost: 'free',
              provider: 'CppCon',
              primary: true,
            },
            {
              title: 'Ranges library',
              url: 'https://en.cppreference.com/w/cpp/ranges',
              type: 'documentation',
              cost: 'free',
              provider: 'cppreference',
            },
            {
              title: 'Constrained algorithms',
              url: 'https://en.cppreference.com/w/cpp/algorithm/ranges',
              type: 'documentation',
              cost: 'free',
              provider: 'cppreference',
              note: 'The list of `std::ranges` algorithms with their projection parameters.',
            },
            {
              title: 'std::ranges::borrowed_range',
              url: 'https://en.cppreference.com/w/cpp/ranges/borrowed_range',
              type: 'documentation',
              cost: 'free',
              provider: 'cppreference',
            },
          ],
          exercises: [
            {
              slug: 'pipeline-primes',
              title: 'Lazy primes',
              prompt:
                'Using `views::iota`, `views::filter` and `views::take`, print the first 20 primes with an `is_prime` helper. Expected last value: 71. Extend it to print the first 10 twin prime pairs, whose last pair is (107, 109). Count how many times `is_prime` is called and explain why the count is finite even though `iota` has no end.',
              kind: 'coding',
              difficulty: 1,
            },
            {
              slug: 'projection-rewrite',
              title: 'Rewrite with projections',
              prompt:
                'Rewrite your employee report using `std::ranges::sort` and `std::ranges::max_element` with projections and no comparator lambdas. Then use `views::filter` and `views::transform` to print the names of everyone in one department earning above the mean, sorted by name. Keep the same test data, and confirm the output is unchanged.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'view-pitfalls',
              title: 'View pitfalls',
              prompt:
                'Show each of these in a small program: (a) a function returning a view over a local `std::vector`, under ASan; (b) `std::ranges::find(make_vector(), 1)` and the compile error from dereferencing the result; (c) a `const auto&` parameter that fails to accept a `filter_view`, and the fix using a forwarding reference or by-value view; (d) the undefined re-iteration of a `filter_view` after changing elements. Write one sentence on each bug.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'csv-field-split',
              title: 'Split a line lazily',
              prompt:
                'Given the line `alpha,beta,,delta`, use `views::split` to yield four `std::string_view` fields, including one empty field, without allocating. Write a function that computes the sum of column 3 of a CSV file using nested views, for a file of 5 lines where the expected sum is hand-computed. Compare the runtime with a hand-written `find` loop on 1,000,000 lines at `-O2`.',
              kind: 'coding',
              difficulty: 3,
              hint: 'A `split_view` element over contiguous data can be turned into a `std::string_view` with its `begin()` and `end()` iterators.',
            },
          ],
          selfAssessment: [
            {
              question: 'What is the difference between a view and a container?',
              answerOutline:
                'A container owns its elements. A view is a lightweight, lazy description of a sequence, usually referring to data owned elsewhere, and cheap to copy.',
            },
            {
              question: 'What is a projection?',
              answerOutline:
                'A callable applied to each element before comparison or testing, such as `&Person::age`, so the algorithm works on a part of the element.',
            },
            {
              question: 'Why does `std::ranges::find` on a temporary vector return `std::ranges::dangling`?',
              answerOutline:
                'The vector dies at the end of the expression, so an iterator into it would dangle. The library returns a type you cannot dereference. Borrowed ranges are exempt.',
            },
            {
              question: 'Why can a `filter_view` not be iterated through a `const` reference?',
              answerOutline:
                'Its `begin()` caches the first matching position to stay amortized constant, which changes the view, so it has no `const` overload.',
            },
          ],
          relatedLessons: [
            'programming-fundamentals/data-collections/comprehensions-and-iteration-tools',
            'systems-programming/rust-fundamentals/traits-generics-and-collections',
          ],
        },
        {
          slug: 'string-view-span-optional-variant',
          title: 'string_view, span, optional and variant',
          summary:
            'The vocabulary types of modern C++: non-owning views of contiguous data, values that may be absent, and closed sets of alternatives handled with std::visit.',
          estimatedMinutes: 120,
          objectives: [
            'Use `std::string_view` and `std::span` as function parameters, and avoid their lifetime traps',
            'Convert between text and numbers with `std::from_chars`, `std::to_chars` and `std::format`',
            'Represent absence with `std::optional`, and its empty state safely',
            'Model a closed set of types with `std::variant` and `std::visit`',
            'Choose between `variant` and a virtual hierarchy for a given design',
          ],
          concepts: [
            '`std::string_view`: pointer plus length, non-owning',
            '`std::span`: a view over contiguous elements',
            'Not null-terminated',
            '`std::optional<T>`: value or nothing',
            '`std::variant`: type-safe tagged union',
            '`std::visit` and the overloaded pattern',
            'Closed vs open polymorphism',
            '`std::from_chars` and `std::to_chars`',
            '`std::format`',
          ],
          explanation: `These small types change how signatures read, because they state intent.

**\`std::string_view\`** is a pointer and a length. It can refer to a \`std::string\`, a literal or a slice, with no allocation, so it replaces \`const std::string&\` for read-only text. **\`std::span<const T>\`** does the same for arrays and vectors:

\`\`\`cpp
int count_words(std::string_view text);
double mean(std::span<const double> xs);
\`\`\`

They are non-owning, so the rules are strict. Use them as *parameters*, and be very careful storing them. \`std::string_view v = make_string();\` dangles at once, because the temporary dies at the semicolon and no lifetime extension applies. A \`string_view\` is also not null-terminated, so never pass \`v.data()\` to a C API that expects one. To convert text and numbers, use \`std::from_chars\` and \`std::to_chars\`, which work on ranges of characters and do not allocate, and use \`std::format\` for output.

**\`std::optional<T>\`** holds a \`T\` or nothing, without a heap allocation. It replaces sentinel values such as -1 and out-parameters:

\`\`\`cpp
std::optional<int> parse_port(std::string_view s);

if (auto port = parse_port(arg)) use(*port);
int p = parse_port(arg).value_or(8080);
\`\`\`

\`*opt\` on an empty optional is undefined behaviour, and \`.value()\` throws.

**\`std::variant<A, B, C>\`** is a type-safe tagged union, holding exactly one alternative. It replaces the C pattern of an enum plus a union, and it matches Rust's \`enum\`. Handle it with \`std::visit\` and the overloaded helper:

\`\`\`cpp
template <class... Ts> struct overloaded : Ts... { using Ts::operator()...; };
template <class... Ts> overloaded(Ts...) -> overloaded<Ts...>;

using Token = std::variant<int, double, std::string>;

std::string describe(const Token& t) {
    return std::visit(overloaded{
        [](int i)                { return std::format("int {}", i); },
        [](double d)             { return std::format("double {}", d); },
        [](const std::string& s) { return std::format("text {}", s); },
    }, t);
}
\`\`\`

Add an alternative to \`Token\` and every \`visit\` without a matching case stops compiling. That is **closed polymorphism**: the set of types is fixed and the set of operations can grow. A virtual hierarchy is **open**: new types are easy, new operations are hard. A \`variant\` also needs no heap and stays cache-friendly.

Module 5 explains the \`...\` syntax. For now, treat \`overloaded\` as a tool. The Abseil tip on \`string_view\` is a good first read, then use the reference pages as you work on the exercises.`,
          resources: [
            {
              title: 'Abseil Tip of the Week #1: string_view',
              url: 'https://abseil.io/tips/1',
              type: 'article',
              cost: 'free',
              provider: 'Abseil',
              primary: true,
            },
            {
              title: 'std::variant',
              url: 'https://en.cppreference.com/w/cpp/utility/variant',
              type: 'documentation',
              cost: 'free',
              provider: 'cppreference',
            },
            {
              title: 'std::visit',
              url: 'https://en.cppreference.com/w/cpp/utility/variant/visit',
              type: 'documentation',
              cost: 'free',
              provider: 'cppreference',
              note: 'The example on this page shows the overloaded pattern.',
            },
            {
              title: 'std::optional',
              url: 'https://en.cppreference.com/w/cpp/utility/optional',
              type: 'documentation',
              cost: 'free',
              provider: 'cppreference',
            },
            {
              title: 'std::from_chars',
              url: 'https://en.cppreference.com/w/cpp/utility/from_chars',
              type: 'documentation',
              cost: 'free',
              provider: 'cppreference',
            },
          ],
          exercises: [
            {
              slug: 'parse-with-from-chars',
              title: 'A checked number parser',
              prompt:
                'Write `std::optional<int> parse_int(std::string_view s)` with `std::from_chars`. It returns a value only if the whole string is consumed and the number fits. Tests: `"42"` gives 42, `"-7"` gives -7, `""` gives none, `"12a"` gives none, `"99999999999"` gives none, `" 5"` gives none. Then write `std::optional<std::pair<std::string_view, int>> parse_setting(std::string_view line)` for `key=value` lines. It must not allocate.',
              kind: 'coding',
              difficulty: 1,
            },
            {
              slug: 'view-lifetime-audit',
              title: 'A view lifetime audit',
              prompt:
                'Show these failures under ASan: (a) `std::string_view v = std::string("a long string past the small buffer");`, (b) a struct storing a `string_view` to a function argument, outliving it, (c) a `std::span` into a vector that then reallocates. For each, say whether the compiler warned. Then pass `sv.data()` of a substring to `std::fopen` and show the bug that a missing null terminator causes.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'expression-evaluator',
              title: 'An expression evaluator with variant',
              prompt:
                'Represent tokens of a calculator as `std::variant<double, Op, LeftParen, RightParen>`, tokenize a `std::string_view` with `std::from_chars`, convert to postfix with the shunting-yard algorithm, and evaluate using `std::visit`. Tests: `1 + 2 * 3` gives 7, `(1 + 2) * 3` gives 9, `2 * (3 + 4) - 5 / 2` gives 11.5. Return `std::optional<double>` from the top-level function, with none for malformed input such as `1 +` or `(2`.',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'variant-vs-virtual',
              title: 'variant vs virtual',
              prompt:
                'Reimplement the Shape example with `std::variant<Circle, Rectangle, Triangle>`, stored by value in a `std::vector`. Compare with the virtual version: time for summing areas over 10 million shapes, `sizeof` of each element, and how many lines change to add a new shape and to add a new operation. Summarize when you would pick each.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why is `std::string_view` a good parameter type but a risky member type?',
              answerOutline:
                'As a parameter, the caller keeps the data alive for the call. As a member, nothing ties the view to the lifetime of the characters, so it can easily dangle.',
            },
            {
              question: 'What happens on `*opt` when `opt` is empty, compared with `opt.value()`?',
              answerOutline:
                '`*opt` is undefined behaviour. `.value()` throws `std::bad_optional_access`.',
            },
            {
              question: 'When is `std::variant` a better design than a virtual hierarchy?',
              answerOutline:
                'When the set of types is closed and operations will grow, or when you want value semantics with no heap. Virtual functions suit an open set of types.',
            },
            {
              question: 'What happens if you add a new alternative to a variant but leave a `std::visit` unchanged?',
              answerOutline:
                'With an overloaded visitor that has no generic case, compilation fails, so the compiler finds every place to update.',
            },
          ],
          relatedLessons: [
            'systems-programming/c-fundamentals/structs-enums-and-the-preprocessor',
            'systems-programming/rust-fundamentals/enums-pattern-matching-and-error-handling',
          ],
        },
      ],
    },
    {
      slug: 'templates-and-concepts',
      title: 'Templates and Concepts',
      description:
        'Generic programming the C++20 way: function and class templates, constraints with concepts, perfect forwarding and variadic templates, and doing real work at compile time.',
      lessons: [
        {
          slug: 'function-and-class-templates',
          title: 'Function and class templates',
          summary:
            'How templates are instantiated, how deduction works, why definitions live in headers, class templates and CTAD, and non-type template parameters.',
          estimatedMinutes: 120,
          objectives: [
            'Write function and class templates, and explain when each is instantiated',
            'Predict template argument deduction, including what it does to references and `const`',
            'Explain why template definitions go in headers',
            'Use class template argument deduction and non-type template parameters',
            'Specialize a template for a type, and say when overloading is better',
          ],
          concepts: [
            'A template is a recipe, instantiated per type',
            'Monomorphization and code bloat',
            'Template argument deduction',
            'Two-phase name lookup',
            'Templates live in headers',
            'Class template argument deduction (CTAD)',
            'Non-type template parameters',
            'Explicit specialization',
            '`typename` for dependent names',
          ],
          explanation: `A template is a recipe for generating code. The compiler writes a separate function or class for each set of arguments it is used with. This is *monomorphization*, the same mechanism as Rust generics. It gives zero-overhead abstraction, because each instantiation is compiled and optimized for its exact types. The cost is compile time and sometimes binary size.

\`\`\`cpp
template <typename T>
T max_of(const T& a, const T& b) { return a < b ? b : a; }

max_of(3, 4);            // T deduced as int
max_of(3, 4.0);          // error: T cannot be both int and double
max_of<double>(3, 4.0);  // explicit: works
\`\`\`

**Deduction** works from arguments only, and it never considers conversions. With a by-value parameter \`T\`, references and top-level \`const\` are dropped, and arrays decay. With \`const T&\`, the parameter stays a reference and arrays keep their size. Effective Modern C++ item 1 gives the full rules.

The compiler needs the **definition** at the point of use, so templates normally live entirely in headers. If you put the body in a \`.cpp\` file, you will get undefined symbols at link time. This is the one common place where the header-only style is required.

**Class templates** work the same way, and the argument is usually deduced from the constructor (CTAD):

\`\`\`cpp
template <typename T, std::size_t N>
class FixedStack {
public:
    void push(const T& x) { data_[size_++] = x; }
    [[nodiscard]] std::size_t size() const { return size_; }
private:
    std::array<T, N> data_{};
    std::size_t size_ = 0;
};

FixedStack<int, 16> s;              // N is a non-type parameter
std::vector v{1, 2, 3};             // CTAD: std::vector<int>
\`\`\`

Member functions of a class template are only instantiated if they are used, so \`FixedStack<NoCopy, 4>\` compiles until someone calls \`push\`.

**Two-phase lookup**: names that do not depend on \`T\` are checked when the template is defined, and names that do are checked when it is instantiated. This is why broken templates can sit unnoticed until used, and why error messages can run for pages. Concepts, in the next lesson, fix much of that. Inside a template, write \`typename T::value_type\` to tell the compiler that a dependent name is a type.

**Explicit specialization** provides a custom version for one type. For functions, prefer ordinary overloading, because specializations do not take part in overload resolution.

Work through the learncpp pages, then use C++ Insights to look at the code generated by a template.`,
          resources: [
            {
              title: 'learncpp: function templates',
              url: 'https://www.learncpp.com/cpp-tutorial/function-templates/',
              type: 'textbook',
              cost: 'free',
              provider: 'Learn C++',
              primary: true,
            },
            {
              title: 'learncpp: class templates',
              url: 'https://www.learncpp.com/cpp-tutorial/class-templates/',
              type: 'textbook',
              cost: 'free',
              provider: 'Learn C++',
            },
            {
              title: 'learncpp: non-type template parameters',
              url: 'https://www.learncpp.com/cpp-tutorial/non-type-template-parameters/',
              type: 'textbook',
              cost: 'free',
              provider: 'Learn C++',
            },
            {
              title: 'Template argument deduction',
              url: 'https://en.cppreference.com/w/cpp/language/template_argument_deduction',
              type: 'documentation',
              cost: 'free',
              provider: 'cppreference',
            },
            {
              title: 'Effective Modern C++ (Scott Meyers)',
              url: 'https://www.aristeia.com/EMC++.html',
              type: 'textbook',
              cost: 'paid',
              provider: 'Scott Meyers',
              note: 'Items 1 to 4 on type deduction. The free pages above cover what you need.',
            },
          ],
          exercises: [
            {
              slug: 'generic-stack',
              title: 'A growing generic stack',
              prompt:
                'Write `template <typename T> class Stack` backed by `std::vector<T>`, with `push`, `pop` returning `T`, `top`, `size` and `empty`, in a header. Test it with `int`, `std::string` and a move-only `std::unique_ptr<int>`. Explain why `pop` returning `T` needs `std::move`, and why the standard `std::stack::pop` returns `void`. Then deliberately move the definition of `push` to a `.cpp`, and record the linker error.',
              kind: 'coding',
              difficulty: 1,
            },
            {
              slug: 'deduction-table',
              title: 'Deduction by hand',
              prompt:
                'Given `template <typename T> void byval(T)`, `void byref(T&)`, `void bycref(const T&)`, predict `T` for arguments `int x`, `const int cx`, `const int& rx`, a literal `27`, and an array `int a[3]`. One combination does not compile, so say which. Check every prediction using `static_assert(std::is_same_v<...>)` inside the function, or the trick of an undefined `template <typename U> struct Show;` that displays the type in an error. Fill in a 3 by 5 table.',
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'code-size-measurement',
              title: 'Measure template code bloat',
              prompt:
                'Write a generic `sort_and_unique<T>` and instantiate it for 10 different types. Compare the size of the `.text` section (`size ./a.out`) and the build time with a non-template version on `void*` and a comparator callback, using `qsort`. Then time both on 1,000,000 ints at `-O2`. Report the trade-off in a table: binary size, compile time, and runtime.',
              kind: 'coding',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'Why do template definitions normally go in headers?',
              answerOutline:
                'The compiler must see the full definition to instantiate it in each translation unit that uses it. In a separate `.cpp` the instantiation does not happen, so linking fails.',
            },
            {
              question: 'Why does `max_of(3, 4.0)` fail to compile?',
              answerOutline:
                'Deduction gets `int` from one argument and `double` from the other, and it does not consider conversions.',
            },
            {
              question: 'What is two-phase lookup?',
              answerOutline:
                'Non-dependent names are resolved at definition, and dependent names are resolved at instantiation, including through ADL.',
            },
            {
              question: 'Compare a C++ template with a `void*` generic in C.',
              answerOutline:
                'A template produces a typed, inlinable version per type, at the cost of compile time and code size. `void*` code has one copy, with no type safety and indirect calls.',
            },
          ],
          relatedLessons: [
            'systems-programming/pointers-and-memory/data-structures-in-c',
            'systems-programming/rust-fundamentals/traits-generics-and-collections',
          ],
        },
        {
          slug: 'concepts-and-constraints',
          title: 'Concepts and constraints',
          summary:
            'State what a template requires, get readable errors, overload on capabilities, and write your own concepts with requires expressions.',
          estimatedMinutes: 110,
          objectives: [
            'Constrain templates with standard concepts such as `std::integral` and `std::ranges::range`',
            'Write a concept using a `requires` expression',
            'Use abbreviated function templates with `auto` parameters',
            'Overload on constraints and explain subsumption',
            'Test that a type does or does not satisfy a concept with `static_assert`',
          ],
          concepts: [
            'Concept: a named compile-time predicate on types',
            '`requires` clause vs `requires` expression',
            'Standard concepts in `<concepts>` and `<ranges>`',
            'Abbreviated function templates',
            'Overload ordering by subsumption',
            'Syntactic requirements vs semantic requirements',
            'Constrained member functions',
            'Testing concepts with `static_assert`',
          ],
          explanation: `Before C++20, a template's requirements lived in comments, and a mistake surfaced as a long error from deep inside the library. A **concept** is a named compile-time predicate, and it puts the requirement in the signature:

\`\`\`cpp
template <std::integral T>
T gcd(T a, T b);

void print_all(const std::ranges::range auto& r);

template <typename T>
concept Hashable = requires(const T& a) {
    { std::hash<T>{}(a) } -> std::convertible_to<std::size_t>;
};

template <Hashable Key, typename Value>
class Cache { /* ... */ };
\`\`\`

The \`requires\` expression lists operations that must compile, and it can check their types with \`-> concept\`. It only checks *syntax*. If \`operator<\` exists but does not define an ordering, no compiler will notice. Concepts such as \`std::totally_ordered\` also document *semantic* requirements, which are your responsibility.

**Reading the syntax.** \`requires\` has two meanings. A \`requires\` *clause* attaches a condition to a template: \`template <typename T> requires std::copyable<T>\`. A \`requires\` *expression* produces a \`bool\`. Hence the odd looking \`requires requires(T t) { t.size(); }\`, which is a clause holding an ad hoc expression. Prefer naming a concept.

Prefer standard concepts when one fits. \`<concepts>\` gives you \`same_as\`, \`convertible_to\`, \`integral\`, \`floating_point\`, \`regular\`, \`invocable\`, \`predicate\`, and \`<ranges>\` gives you \`range\`, \`forward_range\`, \`random_access_range\`, \`contiguous_range\`.

**Overloading on constraints** replaces old tricks such as SFINAE and tag dispatch:

\`\`\`cpp
template <std::input_iterator It>         void advance_by(It& it, int n);  // walk
template <std::random_access_iterator It> void advance_by(It& it, int n);  // jump
\`\`\`

Both match a vector iterator, but \`random_access_iterator\` **subsumes** \`input_iterator\`, because its definition includes it, so the more specific overload wins. Subsumption only works through named concepts, not plain \`bool\` expressions, so factor constraints into concepts.

You can also constrain individual members, and make a member exist only when a condition holds. A C++20 trick worth knowing is that special members can be constrained too:

\`\`\`cpp
Box(const Box&) requires std::copy_constructible<T> = default;
\`\`\`

This matters because \`std::is_copy_constructible_v<std::vector<std::unique_ptr<int>>>\` is \`true\`: the vector's copy constructor is not constrained, and it only fails when instantiated.

Treat concepts like an interface that deserves tests: add \`static_assert(Hashable<std::string>);\` and \`static_assert(!Hashable<Widget>);\` beside your code.

Read the cppreference page on constraints, then rewrite your earlier templates with concepts, and compare the error messages before and after.`,
          resources: [
            {
              title: 'Constraints and concepts',
              url: 'https://en.cppreference.com/w/cpp/language/constraints',
              type: 'documentation',
              cost: 'free',
              provider: 'cppreference',
              primary: true,
            },
            {
              title: 'Concepts library',
              url: 'https://en.cppreference.com/w/cpp/concepts',
              type: 'documentation',
              cost: 'free',
              provider: 'cppreference',
              note: 'The list of standard concepts. Skim it so you know what exists.',
            },
            {
              title: 'Requires expression',
              url: 'https://en.cppreference.com/w/cpp/language/requires',
              type: 'documentation',
              cost: 'free',
              provider: 'cppreference',
            },
            {
              title: 'C++ Core Guidelines: templates and generic programming (T section)',
              url: 'https://isocpp.github.io/CppCoreGuidelines/CppCoreGuidelines',
              type: 'documentation',
              cost: 'free',
              provider: 'Stroustrup and Sutter, eds.',
              note: 'Search for T.10 to T.26 on specifying and defining concepts.',
            },
          ],
          exercises: [
            {
              slug: 'error-message-before-after',
              title: 'Errors before and after',
              prompt:
                'Write an unconstrained `template <typename T> T sum(const T& c)` that iterates a container, and call it with an `int`. Save the compiler error and count the lines. Constrain it with a concept that requires a range whose element type supports `+` and has a zero value, and record the new error. Show both, with GCC and Clang, and list which parts of the new message name the failed requirement.',
              kind: 'coding',
              difficulty: 1,
            },
            {
              slug: 'write-a-numeric-concept',
              title: 'Write your own concepts',
              prompt:
                'Write concepts `Addable<T>` (`a + b` yields something convertible to `T`), `Streamable<T>` (`os << t` works), and `Container<C>` (has `value_type`, `begin`, `end` and `size`). Add at least three positive and three negative `static_assert` tests for each, including `std::string`, `std::vector<int>`, `int`, and a class with no operators. Then use them to write `print_summary(const Container auto&)`, which prints size and elements.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'overload-on-capability',
              title: 'Overload on capability',
              prompt:
                'Write `my_distance(first, last)` with one overload for `std::input_iterator` that counts, and another for `std::random_access_iterator` that subtracts. Prove with a counter of `operator++` calls on a test iterator that the right overload is chosen. Replace the second constraint with a plain `bool` trait in a `requires` clause, and show that the call becomes ambiguous, then explain why subsumption failed.',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'conditional-copy',
              title: 'The vector copy lie',
              prompt:
                'Write `template <typename T> class Bag` holding a `std::vector<T>`. Show that with default special members, `std::is_copy_constructible_v<Bag<std::unique_ptr<int>>>` is `true` although copying fails to compile. Fix it with constrained copy operations, keeping `noexcept` moves. Add `static_assert`s for `Bag<int>` and `Bag<std::unique_ptr<int>>`, and explain why you also have to declare the move operations.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What can a concept check, and what can it not check?',
              answerOutline:
                'It checks syntax: that expressions compile and their types fit. It cannot check meaning, such as whether `<` really is an ordering.',
            },
            {
              question: 'What is subsumption, and why does it matter?',
              answerOutline:
                'One concept subsumes another when its normalized constraints include the other\'s. It makes the more constrained overload win, and it only works through named concepts.',
            },
            {
              question: 'Explain `requires requires(T t) { t.size(); }`.',
              answerOutline:
                'The first `requires` starts a requires clause, and the second begins a requires expression producing the `bool` that the clause tests.',
            },
            {
              question: 'What does `void f(std::integral auto x)` mean?',
              answerOutline:
                'An abbreviated function template. It is shorthand for `template <std::integral T> void f(T x)`.',
            },
          ],
          relatedLessons: ['systems-programming/rust-fundamentals/traits-generics-and-collections'],
        },
        {
          slug: 'forwarding-and-variadic-templates',
          prerequisiteLessons: ['cpp-programming/value-semantics/move-semantics'],
          title: 'Perfect forwarding and variadic templates',
          summary:
            'Forwarding references, std::forward, parameter packs and fold expressions: the machinery behind emplace, make_unique and std::tuple.',
          estimatedMinutes: 110,
          objectives: [
            'Recognize a forwarding reference and explain reference collapsing',
            'Use `std::forward` to keep value categories through a wrapper',
            'Write variadic templates using parameter packs and fold expressions',
            'Iterate over a `std::tuple` with `std::apply`',
            'Explain how `emplace_back` and `std::make_unique` work',
          ],
          concepts: [
            'Forwarding reference `T&&` on a deduced `T`',
            'Reference collapsing',
            '`std::forward`',
            'Parameter pack and pack expansion',
            'Fold expressions',
            '`sizeof...`',
            '`std::tuple` and `std::apply`',
            'Forwarding constructors can hijack copying',
          ],
          explanation: `A wrapper such as \`std::make_unique\` must pass its arguments to a constructor unchanged: an lvalue should stay an lvalue, and an rvalue should stay an rvalue. That is **perfect forwarding**.

When \`T\` is deduced, \`T&&\` is not an rvalue reference. It is a **forwarding reference**, which binds to anything:

\`\`\`cpp
template <typename T>
void wrapper(T&& arg) {
    target(std::forward<T>(arg));
}
\`\`\`

Passing an \`int\` lvalue deduces \`T = int&\`, and **reference collapsing** turns \`int& &&\` into \`int&\`. Passing an rvalue deduces \`T = int\`, and the parameter is \`int&&\`. \`arg\` itself is a named lvalue in both cases, so \`std::forward<T>\` conditionally casts it back. Use \`std::move\` on rvalue references and \`std::forward\` on forwarding references. Only a deduced \`T&&\` qualifies: \`std::vector<T>&&\` and a class template's \`T&&\` in a member function are ordinary rvalue references.

**Variadic templates** accept any number of arguments. \`Args...\` declares a *parameter pack*, and \`...\` after a pattern expands it:

\`\`\`cpp
template <typename T, typename... Args>
std::unique_ptr<T> my_make_unique(Args&&... args) {
    return std::unique_ptr<T>(new T(std::forward<Args>(args)...));
}
\`\`\`

The expansion produces \`std::forward<A1>(a1), std::forward<A2>(a2), ...\`. That one line is the core of \`emplace_back\` too: it forwards constructor arguments into the vector's own storage, which is why \`v.emplace_back("hello", 3)\` builds the element in place.

**Fold expressions** apply a binary operator across a pack, with no recursion:

\`\`\`cpp
template <typename... Ts>
auto sum(Ts... xs) { return (xs + ...); }

template <typename... Ts>
void print(const Ts&... xs) { ((std::cout << xs << ' '), ...); std::cout << '\\n'; }
\`\`\`

Use \`sizeof...(Ts)\` to count a pack. To unpack a \`std::tuple\` into a pack, use \`std::apply\`:

\`\`\`cpp
auto t = std::tuple{1, 2.5, "x"};
std::apply([](const auto&... v) { print(v...); }, t);
\`\`\`

This combination, a tuple of descriptors plus a fold, is how libraries iterate over "the fields of a struct" at compile time. MP 2 relies on it.

One trap: a constructor \`template <typename T> Widget(T&&)\` is a better match than the copy constructor for a non-\`const\` \`Widget\` lvalue, so copying calls your template instead. Constrain it with a concept, for example \`requires (!std::same_as<std::remove_cvref_t<T>, Widget>)\`.

Effective Modern C++ chapter 5 is the classic text on this, and the cppreference pages on packs and folds are good free references. Write \`my_make_unique\` yourself, then test it with \`Noisy\`, to confirm that it makes zero extra copies.`,
          resources: [
            {
              title: 'Parameter pack',
              url: 'https://en.cppreference.com/w/cpp/language/parameter_pack',
              type: 'documentation',
              cost: 'free',
              provider: 'cppreference',
              primary: true,
            },
            {
              title: 'Fold expressions',
              url: 'https://en.cppreference.com/w/cpp/language/fold',
              type: 'documentation',
              cost: 'free',
              provider: 'cppreference',
            },
            {
              title: 'std::forward',
              url: 'https://en.cppreference.com/w/cpp/utility/forward',
              type: 'documentation',
              cost: 'free',
              provider: 'cppreference',
            },
            {
              title: 'Howard Hinnant: Everything You Ever Wanted To Know About Move Semantics',
              url: 'https://www.youtube.com/watch?v=vLinb2fgkHk',
              type: 'lecture',
              cost: 'free',
              provider: 'Bloomberg Engineering',
              note: 'A careful talk by the designer of move semantics, useful for how forwarding fits into it.',
            },
            {
              title: 'std::apply and std::tuple',
              url: 'https://en.cppreference.com/w/cpp/utility/tuple',
              type: 'documentation',
              cost: 'free',
              provider: 'cppreference',
            },
          ],
          exercises: [
            {
              slug: 'my-make-unique',
              title: 'Write make_unique and emplace',
              prompt:
                'Write `my_make_unique<T>(args...)`. Using `Noisy`, show that passing an rvalue constructs by move, and an lvalue by copy. Remove `std::forward` and show every argument now copies, with counters. Then add `template <typename... Args> T& emplace(Args&&...)` to your `Stack`, and show, with a `Noisy` element type that has a two-argument constructor, that `s.emplace(1, 2)` constructs exactly one object and makes no copy or move.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'fold-utilities',
              title: 'Fold expression utilities',
              prompt:
                'Write with fold expressions: `all_of(bools...)`, `sum(xs...)` that returns 0 for an empty pack, `max_of(x, xs...)`, `print_csv(xs...)` that prints `1,2.5,hi` with no trailing comma, and `tuple_for_each(tuple, f)`, built on `std::apply`. Test each with `static_assert` when it can be `constexpr`, and `print_csv(1, 2.5, "hi")` with a string stream.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'hijacked-copy',
              title: 'The hijacked copy constructor',
              prompt:
                'Write `class Name` holding a `std::string`, with a constructor `template <typename S> Name(S&& s) : value_(std::forward<S>(s)) {}`. Show that `Name a{"x"}; Name b{a};` fails to compile because the template wins over the copy constructor. Fix it with a concept. Then write a test checking that `const Name c{"y"}; Name d{c};` and moves both work, and that `std::string` lvalues are copied while rvalues are moved.',
              kind: 'coding',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'When is `T&&` a forwarding reference?',
              answerOutline:
                'Only when `T` is deduced for that function template parameter (or with `auto&&`). A member of a class template or `std::vector<T>&&` is a normal rvalue reference.',
            },
            {
              question: 'What does `std::forward<T>(arg)` do differently from `std::move(arg)`?',
              answerOutline:
                '`std::forward` casts to an rvalue only if the original argument was an rvalue, as recorded in `T`. `std::move` always casts.',
            },
            {
              question: 'How does `emplace_back` avoid a move that `push_back` makes?',
              answerOutline:
                'It forwards constructor arguments and builds the element in place in the vector\'s storage, instead of receiving an already-built object.',
            },
            {
              question: 'What does `(xs + ...)` do on an empty pack?',
              answerOutline:
                'It is ill-formed, because `+` has no identity in a unary fold. Use a binary fold such as `(xs + ... + 0)`.',
            },
          ],
        },
        {
          slug: 'compile-time-programming',
          title: 'Compile-time programming',
          summary:
            'constexpr functions, consteval, constinit, if constexpr, type traits and class-type template parameters: moving work and errors from run time to compile time.',
          estimatedMinutes: 110,
          objectives: [
            'Write `constexpr` functions and use them in `static_assert` tests',
            'Choose between `constexpr`, `consteval` and `constinit`',
            'Use `if constexpr` to select code by type',
            'Use type traits from `<type_traits>`',
            'Pass strings as template parameters with a structural class',
          ],
          concepts: [
            '`constexpr` functions: usable at compile time',
            '`consteval`: must run at compile time',
            '`constinit`: guarantees static initialization',
            '`if constexpr`',
            'Type traits and `std::is_same_v`',
            'Structural types as template parameters',
            'Compile-time tests with `static_assert`',
            'Static initialization order problem',
          ],
          explanation: `Anything computed at compile time cannot fail at run time, costs nothing at run time, and can be tested by the compiler.

A **\`constexpr\` function** *can* run at compile time when its arguments are constants, and it runs normally otherwise. In C++20 such functions can contain loops, local variables, and even use \`std::vector\` as long as the memory is freed before evaluation ends.

\`\`\`cpp
constexpr std::uint64_t fnv1a(std::string_view s) {
    std::uint64_t h = 0xcbf29ce484222325ULL;
    for (char c : s) {
        h ^= static_cast<unsigned char>(c);
        h *= 0x100000001b3ULL;
    }
    return h;
}

static_assert(fnv1a("hello") == 0xa430d84680aabd0bULL);
\`\`\`

\`static_assert\` is a test that runs in the compiler, with undefined behaviour rejected as well, because a constant expression may not contain any. That makes it a sanitizer you get for free.

**\`consteval\`** functions *must* run at compile time. A \`consteval\` constructor is a neat design tool: it can reject bad input at compile time, such as a malformed format string. This is how \`std::format\` checks its arguments. **\`constinit\`** promises that a variable with static storage is initialized at compile time, avoiding the *static initialization order* problem between translation units, without making the variable \`const\`.

**\`if constexpr\`** chooses a branch at compile time, and the discarded branch is not instantiated for that type:

\`\`\`cpp
template <typename T>
std::string to_text(const T& v) {
    if constexpr (std::same_as<T, std::string>) return v;
    else if constexpr (std::is_arithmetic_v<T>) return std::to_string(v);
    else static_assert(sizeof(T) == 0, "unsupported type");
}
\`\`\`

The header \`<type_traits>\` provides queries and transformations such as \`std::is_integral_v\`, \`std::remove_cvref_t\`, \`std::is_trivially_copyable_v\` and \`std::conditional_t\`. Concepts wrap many of these with nicer syntax, but traits remain the underlying vocabulary.

C++20 allows **class types as non-type template parameters**, if they are *structural*, that is, all members public and themselves structural. That is how a string can be a template argument:

\`\`\`cpp
template <std::size_t N>
struct FixedString {
    char data[N]{};
    constexpr FixedString(const char (&s)[N]) { std::copy_n(s, N, data); }
};

template <FixedString Name> struct Tag { };
using UserTag = Tag<"user">;
\`\`\`

The argument is deduced from the literal, so \`Tag<"user">\` and \`Tag<"user">\` are the same type.

Keep compile-time work modest, because it slows builds. Start with Walter Brown's talk for the classic ideas, then read the \`constexpr\` and \`consteval\` pages, and try the FNV example in Compiler Explorer to see the constant appear in the assembly.`,
          resources: [
            {
              title: 'Walter E. Brown: Modern Template Metaprogramming: A Compendium, Part I (CppCon 2014)',
              url: 'https://www.youtube.com/watch?v=Am2is2QCvxY',
              type: 'lecture',
              cost: 'free',
              provider: 'CppCon',
              note: 'The classic explanation of how type traits work. Part II continues on the same channel.',
              primary: true,
            },
            {
              title: 'constexpr specifier',
              url: 'https://en.cppreference.com/w/cpp/language/constexpr',
              type: 'documentation',
              cost: 'free',
              provider: 'cppreference',
            },
            {
              title: 'consteval specifier',
              url: 'https://en.cppreference.com/w/cpp/language/consteval',
              type: 'documentation',
              cost: 'free',
              provider: 'cppreference',
            },
            {
              title: 'Standard library header <type_traits>',
              url: 'https://en.cppreference.com/w/cpp/header/type_traits',
              type: 'documentation',
              cost: 'free',
              provider: 'cppreference',
            },
            {
              title: 'Template parameters',
              url: 'https://en.cppreference.com/w/cpp/language/template_parameters',
              type: 'documentation',
              cost: 'free',
              provider: 'cppreference',
              note: 'See the section on structural types for non-type template parameters.',
            },
          ],
          exercises: [
            {
              slug: 'constexpr-test-suite',
              title: 'A test suite the compiler runs',
              prompt:
                'Write `constexpr` versions of `is_prime(n)`, `gcd(a, b)`, `fnv1a(string_view)` and `popcount(uint64_t)`, and test them entirely with `static_assert`: `is_prime(7919)` is true, `gcd(1071, 462)` is 21, `fnv1a("a")` is `0xaf63dc4c8601ec8c`, `popcount(255)` is 8. Then introduce a signed overflow and an out-of-bounds read inside a `constexpr` function, and record that the compiler rejects each in a constant expression.',
              kind: 'coding',
              difficulty: 1,
            },
            {
              slug: 'consteval-validator',
              title: 'Reject bad input at compile time',
              prompt:
                'Write `class Identifier` with a `consteval` constructor taking `const char*`, which checks that the string is non-empty and contains only letters, digits and underscores, and fails compilation otherwise, by throwing in a constant evaluation. Show that `Identifier a{"user_id"};` compiles, and `Identifier b{"user id"};` does not. Show that a runtime `std::string` cannot be passed at all. Compare with a runtime check.',
              kind: 'coding',
              difficulty: 2,
              hint: 'A `throw` inside a `consteval` function is fine as long as it is never reached for valid input.',
            },
            {
              slug: 'compile-time-table',
              title: 'A lookup table built at compile time',
              prompt:
                'Build a `constexpr std::array<std::uint32_t, 256>` CRC-32 table with a `consteval` function, and use it in a runtime `crc32(std::span<const std::byte>)`. The CRC-32 of the ASCII bytes `123456789` must be `0xCBF43926`. Confirm in Compiler Explorer that the table is emitted as data with no initialization code, and mark it `constinit` to prove it. Explain what `constinit` adds.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'named-tuple',
              title: 'Named fields with FixedString',
              prompt:
                'Using `FixedString`, write `template <FixedString Name, typename T> struct Field { T value; };` and a function `get<"age">(record)` which finds the field of that name in a `std::tuple` of `Field`s at compile time, with a `static_assert` if no such field exists. Test with `std::tuple{Field<"name", std::string>{"Ada"}, Field<"age", int>{36}}`, so that `get<"age">` returns 36.',
              kind: 'coding',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'What is the difference between `constexpr` and `consteval` functions?',
              answerOutline:
                '`constexpr` may run at compile time or run time. `consteval` must produce a constant, and every call is evaluated at compile time.',
            },
            {
              question: 'Why is `static_assert` on a `constexpr` function stronger than an ordinary unit test?',
              answerOutline:
                'It runs on every build, and undefined behaviour such as signed overflow makes it fail to compile, so it also acts as a check for UB on that path.',
            },
            {
              question: 'What happens to the discarded branch of `if constexpr`?',
              answerOutline:
                'In a template, if the condition depends on a template parameter, the branch is not instantiated, so it may contain code that would be invalid for that type.',
            },
            {
              question: 'What does `constinit` guarantee, and what does it not imply?',
              answerOutline:
                'It guarantees constant initialization, so there is no order problem at startup. It does not make the variable `const`.',
            },
          ],
          relatedLessons: ['systems-programming/the-toolchain/compilers-and-flags'],
        },
      ],
    },
    {
      slug: 'errors-and-ownership',
      title: 'Error Handling and Ownership Design',
      description:
        'How failures should travel through a C++ program, the exception safety guarantees, errors as values, and using smart pointers to make ownership visible in every interface.',
      lessons: [
        {
          slug: 'exceptions-and-safety-guarantees',
          title: 'Exceptions and safety guarantees',
          summary:
            'The cost and the discipline of exceptions: throwing, catching, noexcept, and the basic, strong and nothrow guarantees.',
          estimatedMinutes: 110,
          objectives: [
            'Throw and catch exceptions by the right types, and organize an exception hierarchy',
            'Define the basic, strong and nothrow guarantees, and classify a function',
            'Write code that keeps its invariants when any line can throw',
            'Use `noexcept` correctly, and explain what happens when it is violated',
            'Describe the run-time cost model of exceptions',
          ],
          concepts: [
            'Throw by value, catch by `const&`',
            'Standard hierarchy: `std::logic_error`, `std::runtime_error`',
            'Basic, strong and nothrow guarantees',
            'Commit-or-rollback by doing work on the side',
            '`noexcept` and `std::terminate`',
            'Zero-cost model: free when not thrown',
            '`std::exception_ptr`',
            '`std::set_terminate`',
          ],
          explanation: `Exceptions separate the code that detects a problem from the code that can do something about it. Use them for failures the immediate caller usually cannot fix, and for constructors, which have no return value. Throw by value, and catch by \`const&\` to avoid slicing:

\`\`\`cpp
try {
    run(config);
} catch (const ConfigError& e) {      // specific first
    std::cerr << "bad config: " << e.what() << '\\n';
    return 2;
} catch (const std::exception& e) {
    std::cerr << "fatal: " << e.what() << '\\n';
    return 1;
}
\`\`\`

Derive your types from \`std::runtime_error\`, or from \`std::logic_error\` for programmer mistakes.

The design question is what state remains when something throws. Each function gives one of three **guarantees**, a vocabulary from David Abrahams:

- **Nothrow**: it never fails. Destructors, moves and \`swap\` should be here.
- **Strong**: it either succeeds, or the program state is exactly as before.
- **Basic**: on failure, invariants hold and nothing leaks, but the values may have changed.

Every function should give at least the basic guarantee, and RAII does most of the work. For the strong guarantee, the standard technique is **do the work on the side, then commit with operations that cannot throw**:

\`\`\`cpp
void Roster::add(std::string name) {
    auto copy = names_;                // may throw, *this untouched
    copy.push_back(std::move(name));   // may throw, *this untouched
    std::ranges::sort(copy);           // may throw, *this untouched
    names_.swap(copy);                 // noexcept commit
}
\`\`\`

Copy-and-swap is the same idea. Strong guarantees can be expensive, so give them where they are natural.

**\`noexcept\`** is a promise, not a check. If an exception tries to leave a \`noexcept\` function, the program calls \`std::terminate\`, and no handler can intervene. Use it on moves, \`swap\`, destructors and simple accessors. Do not add it to functions that may need to throw later, because it becomes part of your interface.

**Cost.** Mainstream compilers use table-based exceptions, so the non-throwing path has nearly no run-time cost, and a throw costs thousands of cycles or more. That means exceptions are for rare failures, never ordinary control flow. Some domains, including games and embedded systems, disable them with \`-fno-exceptions\`, and the next lesson shows the alternative.

You can install a global handler with \`std::set_terminate\` to log state before dying. The final project uses that to dump its trace on a crash.

Watch Jon Kalb's talk, part I. In code review, ask of each line: what happens if this throws?`,
          resources: [
            {
              title: 'Jon Kalb: Exception-Safe Code, Part I (CppCon 2014)',
              url: 'https://www.youtube.com/watch?v=W7fIy_54y-w',
              type: 'lecture',
              cost: 'free',
              provider: 'CppCon',
              primary: true,
            },
            {
              title: 'Exceptions',
              url: 'https://en.cppreference.com/w/cpp/language/exceptions',
              type: 'documentation',
              cost: 'free',
              provider: 'cppreference',
              note: 'The section on exception safety defines the guarantees.',
            },
            {
              title: 'learncpp: exception specifications and noexcept',
              url: 'https://www.learncpp.com/cpp-tutorial/exception-specifications-and-noexcept/',
              type: 'textbook',
              cost: 'free',
              provider: 'Learn C++',
            },
            {
              title: 'C++ Core Guidelines: error handling (E section)',
              url: 'https://isocpp.github.io/CppCoreGuidelines/CppCoreGuidelines',
              type: 'documentation',
              cost: 'free',
              provider: 'Stroustrup and Sutter, eds.',
              note: 'Search for E.2, E.12 to E.16.',
            },
          ],
          exercises: [
            {
              slug: 'guarantee-classification',
              title: 'Classify the guarantees',
              prompt:
                'For `std::vector<T>::push_back`, `std::vector<T>::insert` in the middle, `std::map<K,V>::insert`, `std::string::append`, and your `Buffer` copy assignment, look up or derive the guarantee, and state any condition on `T`. Then write out, line by line, what state a naive `void Pair::assign(const Pair& o) { a_ = o.a_; b_ = o.b_; }` is left in if the second assignment throws, and rewrite it to be strong.',
              kind: 'writing',
              difficulty: 2,
            },
            {
              slug: 'throw-injection-harness',
              title: 'A throw-injection harness',
              prompt:
                'Write a type `Bomb` whose copy constructor throws on the Nth copy, with a global countdown. Write a `Roster::add` as above and a test that, for N = 1, 2, 3, and so on until no throw occurs, checks that either the operation succeeded or the `Roster` is exactly unchanged. Run it under ASan to catch leaks. Then write a deliberately weaker version and show that the harness finds a failure.',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'noexcept-terminate',
              title: 'What noexcept really does',
              prompt:
                'Throw from a function declared `noexcept`, called inside a `try` block with `catch (...)`, and show that the handler does not run. Install a `std::set_terminate` handler which prints a message and calls `std::abort`. Print `noexcept(f())` for several functions, including an implicitly `noexcept` destructor. Then measure the time of 1,000,000 calls that return an error code and the same with exceptions at 0%, 0.1% and 10% failure rates, and tabulate the results.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Define the basic, strong and nothrow guarantees.',
              answerOutline:
                'Basic: invariants hold and nothing leaks. Strong: all-or-nothing, as if the call never happened. Nothrow: cannot fail.',
            },
            {
              question: 'Why catch exceptions by `const&`?',
              answerOutline:
                'Catching by value can slice a derived exception and copies it. A reference preserves the dynamic type.',
            },
            {
              question: 'What is the general recipe for the strong guarantee?',
              answerOutline:
                'Do all the fallible work on a copy or on the side, then commit with non-throwing operations such as `swap`.',
            },
            {
              question: 'What happens when an exception reaches the boundary of a `noexcept` function?',
              answerOutline:
                '`std::terminate` is called. Whether the stack is unwound is implementation-defined, and no outer handler runs.',
            },
          ],
          relatedLessons: [
            'programming-fundamentals/programs-and-files/exceptions',
            'software-engineering/design-principles-and-patterns/api-design-and-error-handling',
          ],
        },
        {
          slug: 'errors-as-values',
          title: 'Errors as values',
          summary:
            'std::optional, std::expected and std::error_code: when a failure is an ordinary result, and how to mix error styles at module boundaries.',
          estimatedMinutes: 100,
          objectives: [
            'Choose between exceptions, `std::optional`, `std::expected` and assertions for a given failure',
            'Build a small `Result` type on `std::variant`, and use C++23 `std::expected` where it is available',
            'Use `std::error_code` and non-throwing `std::filesystem` overloads',
            'Use `[[nodiscard]]` to stop errors being ignored',
            'Translate between error styles at a boundary',
          ],
          concepts: [
            'Failure kinds: expected, exceptional, programmer error',
            '`std::expected<T, E>` (C++23)',
            'A hand-written `Result<T, E>` for C++20',
            '`std::error_code` and `std::system_error`',
            '`[[nodiscard]]`',
            'Assertions and contracts for bugs',
            'Boundary translation',
          ],
          explanation: `Not all failures are alike, and one mechanism does not fit them all. Sort them into three kinds:

1. **Programmer errors**, such as a null pointer where the contract forbids it. These are bugs, so \`assert\` and fix them. Do not try to recover at run time.
2. **Expected outcomes**, such as "key not found" or "user typed a bad number". These are ordinary results, so represent them in the return type.
3. **Exceptional conditions**, such as out of memory or a missing required file deep in a call stack. Exceptions fit these well.

For "there is no value", \`std::optional<T>\` is enough. When the caller needs to know *why*, you want a value-or-error type. C++23 adds **\`std::expected<T, E>\`**, which is available in GCC 13 and Clang 18 when you compile with \`-std=c++23\`:

\`\`\`cpp
enum class ParseError { empty, bad_digit, overflow };

[[nodiscard]] std::expected<int, ParseError> parse_port(std::string_view s);

auto port = parse_port(text);
if (!port) return handle(port.error());
listen(*port);
\`\`\`

It is close to Rust's \`Result\`, and it gains monadic chaining through \`and_then\`, \`transform\` and \`or_else\`. This course is C++20, so the project code either enables C++23 for this one feature, or uses a small hand-written \`Result\`. A \`Result\` built on a \`std::variant<T, E>\` takes under 50 lines, and writing one once is instructive.

Mark such functions **\`[[nodiscard]]\`** so that ignoring the result produces a warning. An unchecked error is the classic failure mode of return codes, and this catches it.

The standard library's older mechanism is **\`std::error_code\`**, a portable wrapper for OS error numbers. Many \`std::filesystem\` functions come in two forms: one throws \`std::filesystem::filesystem_error\`, and the other fills an \`error_code\` parameter:

\`\`\`cpp
std::error_code ec;
auto size = std::filesystem::file_size(path, ec);
if (ec) std::cerr << ec.message() << '\\n';
\`\`\`

Which should you use? A common modern design: return value-based errors in low-level parsing and I/O code, where failure is normal and speed may matter, and throw when a failure must cross many layers. Whatever you choose, make the rule explicit, and **translate at the boundary**. A \`main\` function is a boundary, as are thread entry functions, because an exception escaping a thread calls \`std::terminate\`. C APIs and callbacks are boundaries too.

Avoid mixing styles within one layer, because every caller then has to handle errors twice.

Read the \`std::expected\` reference page, and compare it with the Rust lesson on \`Result\` if you took that course.`,
          resources: [
            {
              title: 'std::expected',
              url: 'https://en.cppreference.com/w/cpp/utility/expected',
              type: 'documentation',
              cost: 'free',
              provider: 'cppreference',
              primary: true,
            },
            {
              title: 'std::error_code',
              url: 'https://en.cppreference.com/w/cpp/error/error_code',
              type: 'documentation',
              cost: 'free',
              provider: 'cppreference',
            },
            {
              title: 'C++ attribute: nodiscard',
              url: 'https://en.cppreference.com/w/cpp/language/attributes/nodiscard',
              type: 'documentation',
              cost: 'free',
              provider: 'cppreference',
            },
            {
              title: 'Filesystem library',
              url: 'https://en.cppreference.com/w/cpp/filesystem',
              type: 'documentation',
              cost: 'free',
              provider: 'cppreference',
              note: 'See how each operation offers a throwing form and an `error_code` form.',
            },
          ],
          exercises: [
            {
              slug: 'write-a-result',
              title: 'Write Result in 50 lines',
              prompt:
                'Using `std::variant`, write `template <typename T, typename E> class Result` with `ok()`, `value()`, `error()`, `value_or(fallback)`, and `and_then(f)`, where `f` takes a `T` and returns a `Result`. Mark it `[[nodiscard]]`. Tests must chain `parse_int` then `check_port_range` so that `"8080"` gives 8080, `"abc"` gives `bad_digit`, and `"70000"` gives `out_of_range`. Compare your API with `std::expected`.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'config-loader-three-styles',
              title: 'One loader, three error styles',
              prompt:
                'Write a loader for `key=value` files three ways: exceptions, `std::optional`, and `Result`, each with the same tests covering a missing file, a malformed line, and a duplicate key. Compare the call sites and the quality of the error message each style can report. Give line numbers in the messages where possible. State which you would use in a library, and which in a command-line tool, and why.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'thread-boundary',
              title: 'Errors at a thread boundary',
              prompt:
                'Throw an exception from a `std::thread` body with no handler and record what happens. Fix it with a `try` block that stores `std::current_exception()` in a `std::exception_ptr`, which `main` rethrows after `join`. Write down why a boundary must translate errors. Module 7 shows how `std::future` does the same for you.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Give one failure best handled by each of: an assert, a `std::expected`, and an exception.',
              answerOutline:
                'Assert: violated precondition. Expected: invalid user input to a parser. Exception: out of memory or a failure several layers below anyone who can respond.',
            },
            {
              question: 'What does `[[nodiscard]]` add to an error-returning function?',
              answerOutline:
                'A compiler warning when the result is ignored, closing the usual hole in return-code error handling.',
            },
            {
              question: 'Why must a thread entry function not let an exception escape?',
              answerOutline:
                'The exception would call `std::terminate`. Errors must be caught and passed to another thread, for example with `std::exception_ptr` or a future.',
            },
            {
              question: 'What does "translate at the boundary" mean?',
              answerOutline:
                'Each layer uses one error style inside, and converts to the style of its caller where the layers meet, as when a C API code becomes an exception or `Result`.',
            },
          ],
          relatedLessons: [
            'systems-programming/rust-fundamentals/enums-pattern-matching-and-error-handling',
            'software-engineering/design-principles-and-patterns/api-design-and-error-handling',
          ],
        },
        {
          slug: 'smart-pointers-and-ownership-design',
          title: 'Smart pointers and ownership design',
          summary:
            'unique_ptr, shared_ptr and weak_ptr in depth, and the interface conventions that make ownership obvious from a signature.',
          estimatedMinutes: 130,
          objectives: [
            'Choose among values, `unique_ptr`, `shared_ptr`, references and raw pointers',
            'Use `unique_ptr` with custom deleters and for incomplete types',
            'Explain how `shared_ptr` works, including its control block and atomic counts',
            'Break reference cycles with `weak_ptr`',
            'Read and write function signatures that express ownership',
            'Apply the pimpl idiom to shrink a header',
          ],
          concepts: [
            'Ownership: who is responsible for destroying this?',
            '`std::unique_ptr`: exclusive, zero overhead',
            'Custom deleters',
            '`std::shared_ptr`: control block, atomic reference count',
            '`std::make_shared`',
            '`std::weak_ptr` and cycles',
            'Raw pointers and references are non-owning',
            'Passing smart pointers: sinks and observers',
            'Pimpl idiom',
          ],
          explanation: `Ownership answers one question: **who destroys this object, and when?** C leaves the answer to comments, Rust checks it, and modern C++ writes it in the types.

The order of preference is short:

1. **A plain value or a member.** No indirection, no question.
2. **\`std::unique_ptr<T>\`** when you need the heap: polymorphism, a large object, or a stable address. It is the same size as a raw pointer, it is move-only, and it costs nothing at run time.
3. **\`std::shared_ptr<T>\`** only when ownership is genuinely shared and no single scope outlives the others.

A **raw pointer or reference is always non-owning** in modern code. Do not write \`delete\`.

\`shared_ptr\` is not free. It is two pointers wide: one to the object, one to a **control block** holding strong and weak counts. Copying it does an atomic increment, which contends across cores. \`std::make_shared\` allocates the object and control block together, which saves an allocation and improves locality. Cycles are the classic trap: if A owns B and B owns A through \`shared_ptr\`, neither count reaches zero, and both leak. Break a cycle with **\`std::weak_ptr\`**, which observes without owning. Call \`lock()\` to get a \`shared_ptr\` if the object still exists.

\`shared_ptr\` does make one thing thread-safe, namely the count. It does not make the pointee safe, and it does not make two threads' access to the same \`shared_ptr\` object safe.

Signatures say everything, as in Herb Sutter's GotW #91 advice:

\`\`\`cpp
void use(const Widget& w);               // just uses it, may not be null
void use(const Widget* w);               // just uses it, may be null
void take(std::unique_ptr<Widget> w);    // sink: takes ownership
std::unique_ptr<Widget> make();          // source: gives ownership
void share(std::shared_ptr<Widget> w);   // keeps a share of ownership
\`\`\`

Do not pass \`const std::shared_ptr<T>&\` or \`std::unique_ptr<T>&\` to a function that only uses the object. Pass \`T&\`, so the function works with objects owned in any way.

Custom deleters let \`unique_ptr\` manage anything, as you did for \`FILE*\`. Because it only needs the complete type where it is destroyed, \`unique_ptr\` also enables the **pimpl** idiom:

\`\`\`cpp
class Parser {
public:
    Parser();
    ~Parser();                          // defined in the .cpp, where Impl is complete
    Parser(Parser&&) noexcept;
    Parser& operator=(Parser&&) noexcept;
private:
    struct Impl;
    std::unique_ptr<Impl> impl_;
};
\`\`\`

Private details move to the \`.cpp\`, so users rebuild less often.

Sutter's *Leak-Freedom* talk is the deep reference here. Rust's \`Box\`, \`Rc\` and \`Weak\` solve the same problem with compile-time checks.`,
          resources: [
            {
              title: 'Herb Sutter: Leak-Freedom in C++... By Default (CppCon 2016)',
              url: 'https://www.youtube.com/watch?v=JfmTagWcqoE',
              type: 'lecture',
              cost: 'free',
              provider: 'CppCon',
              note: 'A decision tree for ownership that covers trees, lists and graphs.',
              primary: true,
            },
            {
              title: 'learncpp: std::unique_ptr',
              url: 'https://www.learncpp.com/cpp-tutorial/stdunique_ptr/',
              type: 'textbook',
              cost: 'free',
              provider: 'Learn C++',
            },
            {
              title: 'learncpp: circular dependency issues with std::shared_ptr and std::weak_ptr',
              url: 'https://www.learncpp.com/cpp-tutorial/circular-dependency-issues-with-stdshared_ptr-and-stdweak_ptr/',
              type: 'textbook',
              cost: 'free',
              provider: 'Learn C++',
            },
            {
              title: 'Guru of the Week archive (see GotW #91: Smart Pointer Parameters)',
              url: 'https://herbsutter.com/gotw/',
              type: 'article',
              cost: 'free',
              provider: 'Herb Sutter',
            },
            {
              title: 'C++ Core Guidelines: resource management (R section)',
              url: 'https://isocpp.github.io/CppCoreGuidelines/CppCoreGuidelines',
              type: 'documentation',
              cost: 'free',
              provider: 'Stroustrup and Sutter, eds.',
              note: 'Search for R.1, R.3, R.5, R.20 to R.37.',
            },
          ],
          exercises: [
            {
              slug: 'linked-list-with-unique-ptr',
              title: 'A list with unique_ptr',
              prompt:
                'Implement a singly linked list with `std::unique_ptr<Node>` next pointers, with `push_front`, `pop_front`, and a forward iterator returning `T&`. Show that a recursive default destructor overflows the stack on a list of 1,000,000 nodes (ASan reports `stack-overflow`), and fix it with a loop. Test that it is move-only, and that ASan and LeakSanitizer report nothing.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'observer-cycle',
              title: 'Find and break a cycle',
              prompt:
                'Model `Parent` and `Child`, each holding a `shared_ptr` to the other, and print the `use_count` and destructor messages. Confirm with LeakSanitizer that both leak. Change the back reference to `weak_ptr` and show the destructors now run. Then write an observer list: a `Subject` holds `std::vector<std::weak_ptr<Observer>>`, and skips and removes expired entries when notifying.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'shared-ptr-cost',
              title: 'Measure shared_ptr',
              prompt:
                'At `-O2`, measure the time per iteration of: passing an object held by `unique_ptr` as a plain reference, copying a `shared_ptr` on one thread, and copying the same `shared_ptr` from 4 threads at once. Also compare allocation counts for `std::shared_ptr<T>(new T)` and `std::make_shared<T>()` with a replaced `operator new`. Report your numbers, and explain the 4-thread slowdown using cache line contention.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'ownership-redesign',
              title: 'An ownership audit',
              prompt:
                'Take a small design: a `Scene` containing `Mesh`es shared by many `Instance`s, plus a `Camera` that follows one `Instance`. Write the class members and function signatures, justifying each pointer or value type in one line. Then implement the pimpl idiom for `Scene`, and measure how many files rebuild when you change a private member, before and after pimpl.',
              kind: 'writing',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What does a raw `T*` mean in modern C++ code?',
              answerOutline:
                'A non-owning, possibly null reference to an object. The holder must not delete it.',
            },
            {
              question: 'Why is `std::make_shared` usually better than `shared_ptr<T>(new T)`?',
              answerOutline:
                'It makes one allocation for the object and control block, so it is faster, with better locality. The trade-off is that the memory stays until the weak references are gone too.',
            },
            {
              question: 'Which parts of a `shared_ptr` are thread-safe?',
              answerOutline:
                'The reference counts. Concurrent access to one `shared_ptr` object, or to the pointee, needs your own synchronization.',
            },
            {
              question: 'When should a function take `std::shared_ptr<T>` by value?',
              answerOutline:
                'When it will keep a share of ownership beyond the call. If it only uses the object, it should take `T&` or `T*`.',
            },
            {
              question: 'Why must the destructor of a pimpl class be defined in the `.cpp`?',
              answerOutline:
                '`unique_ptr` needs the complete type where it deletes, and `Impl` is only complete in the `.cpp`.',
            },
          ],
          relatedLessons: [
            'systems-programming/ownership-and-safe-concurrency/lifetimes-and-smart-pointers',
            'software-engineering/design-principles-and-patterns/modularity-coupling-and-cohesion',
          ],
        },
      ],
    },
    {
      slug: 'concurrency',
      title: 'Concurrency',
      description:
        'Threads with std::jthread, locks that cannot be forgotten, condition variables and futures, the C++ memory model and atomics, and C++20 coroutines.',
      lessons: [
        {
          slug: 'threads-jthread-and-mutexes',
          title: 'Threads, jthread and mutexes',
          summary:
            'Start and stop threads safely with std::jthread and stop tokens, understand why a data race is undefined behaviour, and protect shared state with RAII locks.',
          estimatedMinutes: 120,
          objectives: [
            'Start threads with `std::jthread` and shut them down with a `std::stop_token`',
            'Define a data race, and explain why it is undefined behaviour in C++',
            'Protect shared state with `std::mutex` and `std::scoped_lock`',
            'Lock several mutexes without deadlock',
            'Find a data race with ThreadSanitizer',
          ],
          concepts: [
            '`std::jthread`: joins on destruction',
            '`std::stop_token` and `std::stop_source`',
            'Data race: unsynchronized conflicting access',
            'Race condition vs data race',
            '`std::mutex`, `std::scoped_lock`, `std::unique_lock`',
            '`mutable` for internal synchronization',
            'Deadlock and lock ordering',
            '`std::shared_mutex`',
            'ThreadSanitizer',
          ],
          explanation: `The operating systems course explains threads, races and locks as concepts. Here you learn how C++ expresses them, and the rules it adds.

The C++ memory model defines a **data race**: two threads access the same memory location, at least one writes, and neither happens before the other. A data race is **undefined behaviour**. The compiler assumes there are none, so it may cache values in registers or reorder code, and a racy program can break in ways that a mental model of interleaving cannot explain. Rust rejects this at compile time. In C++, the tools are discipline and ThreadSanitizer.

Use **\`std::jthread\`** (C++20). Its destructor requests a stop and joins, which is RAII for threads. A plain \`std::thread\` that is destroyed without a join calls \`std::terminate\`.

\`\`\`cpp
class Counter {
public:
    void add(long n) { std::scoped_lock lock{m_}; value_ += n; }
    [[nodiscard]] long get() const { std::scoped_lock lock{m_}; return value_; }
private:
    mutable std::mutex m_;      // mutable: get() is logically const
    long value_ = 0;
};

Counter c;
{
    std::vector<std::jthread> workers;
    for (int i = 0; i < 4; ++i)
        workers.emplace_back([&c] { for (int k = 0; k < 1'000'000; ++k) c.add(1); });
}                               // all four join here
std::cout << c.get();           // 4000000
\`\`\`

A worker can accept a **\`std::stop_token\`** as its first parameter, which gives you cooperative cancellation:

\`\`\`cpp
std::jthread t{[](std::stop_token st) {
    while (!st.stop_requested()) poll_once();
}};
\`\`\`

Never call \`lock()\` and \`unlock()\` by hand. \`std::scoped_lock\` releases on every exit path. It can also take several mutexes at once with a built-in deadlock avoidance algorithm: \`std::scoped_lock lock{a.m, b.m};\`. Use \`std::unique_lock\` when you need to unlock early, or with a condition variable. \`std::shared_mutex\` allows many readers or one writer, though it often performs no better than a mutex under short critical sections, so measure.

Most good concurrent designs share as little as possible. Give each thread its own data, and hand results over at the end. Keep critical sections short, and do not call unknown code while holding a lock.

**ThreadSanitizer** finds data races at run time. Build with \`-fsanitize=thread\`, separately from ASan, since they cannot be combined. If it aborts on WSL with \`unexpected memory mapping\`, run \`sudo sysctl vm.mmap_rnd_bits=28\`. MSVC has no equivalent.

Use the concurrency chapters of Williams' book if you can, and otherwise rely on the cppreference thread library pages. Do the exercises with TSan on every time.`,
          resources: [
            {
              title: 'Concurrency support library',
              url: 'https://en.cppreference.com/w/cpp/thread',
              type: 'documentation',
              cost: 'free',
              provider: 'cppreference',
              primary: true,
            },
            {
              title: 'std::jthread',
              url: 'https://en.cppreference.com/w/cpp/thread/jthread',
              type: 'documentation',
              cost: 'free',
              provider: 'cppreference',
            },
            {
              title: 'std::scoped_lock',
              url: 'https://en.cppreference.com/w/cpp/thread/scoped_lock',
              type: 'documentation',
              cost: 'free',
              provider: 'cppreference',
            },
            {
              title: 'ThreadSanitizer',
              url: 'https://clang.llvm.org/docs/ThreadSanitizer.html',
              type: 'documentation',
              cost: 'free',
              provider: 'LLVM',
            },
            {
              title: 'C++ Concurrency in Action, 2nd edition (Anthony Williams)',
              url: 'https://www.manning.com/books/c-plus-plus-concurrency-in-action-second-edition',
              type: 'textbook',
              cost: 'paid',
              provider: 'Manning',
              note: 'The standard book. Chapters 2 to 4 match this lesson and the next. Optional, as the free references cover what you need.',
            },
          ],
          exercises: [
            {
              slug: 'lost-updates',
              title: 'Count the lost updates',
              prompt:
                'Increment a plain `long` from 4 threads, 1,000,000 times each. Print the result over 5 runs at `-O0` and `-O2`, and explain the numbers, including how `-O2` can differ. Run it with TSan and record the report. Fix it with a mutex, then with `std::atomic<long>`, and measure the throughput of each. The result must be exactly 4,000,000 with no TSan report.',
              kind: 'coding',
              difficulty: 1,
              hint: 'At `-O2`, the compiler may turn the whole loop into one addition, so the race looks different.',
            },
            {
              slug: 'bank-transfer-deadlock',
              title: 'A deadlock and two fixes',
              prompt:
                'Write `transfer(Account& a, Account& b, long cents)`, which locks both accounts one after the other. Run two threads transferring in opposite directions until it hangs, and capture a backtrace of each thread in gdb using `thread apply all bt`. Fix it with `std::scoped_lock{a.m, b.m}`, and once more with a global ordering by account id. Test that total money is conserved across 1,000,000 random transfers on 10 accounts.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'parallel-sum',
              title: 'A parallel sum with jthread',
              prompt:
                'Split a `std::vector<double>` of 100,000,000 elements among N threads, with each computing a partial sum in a local variable, then writing it to its own slot. Measure speedup for N = 1, 2, 4 and 8. Then change the threads to update their slot directly in the inner loop, and measure again. Explain the drop using false sharing, which the next lessons cover in detail.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'cooperative-shutdown',
              title: 'Cooperative shutdown',
              prompt:
                'Write a background `jthread` that polls a directory every 50 ms using `std::filesystem` and logs new files. Stop it with `request_stop` and show that the program exits within 100 ms of the request. Use `std::stop_callback` to print a message at the moment of the request, and confirm that destroying the `jthread` alone also stops it cleanly.',
              kind: 'coding',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'What exactly is a data race, and how is it different from a race condition?',
              answerOutline:
                'A data race is unsynchronized conflicting access to one memory location, with at least one write, and it is undefined behaviour. A race condition is a logic bug that depends on timing, which can occur without any data race.',
            },
            {
              question: 'What does `std::jthread` do that `std::thread` does not?',
              answerOutline:
                'It requests a stop and joins in its destructor, and it integrates `std::stop_token`. A joinable `std::thread` being destroyed calls `std::terminate`.',
            },
            {
              question: 'Why is the mutex in `Counter` declared `mutable`?',
              answerOutline:
                'So that `const` member functions can lock it. Locking changes the mutex but not the observable value of the object.',
            },
            {
              question: 'How does `std::scoped_lock` avoid deadlock with two mutexes?',
              answerOutline:
                'It uses a deadlock avoidance algorithm such as `std::lock`, which locks all or backs off, so the order of arguments does not matter.',
            },
          ],
          relatedLessons: [
            'operating-systems/concurrency/threads-and-races',
            'operating-systems/concurrency/locks',
            'systems-programming/ownership-and-safe-concurrency/fearless-concurrency',
          ],
        },
        {
          slug: 'condition-variables-and-futures',
          title: 'Condition variables, futures and thread pools',
          summary:
            'Waiting without spinning, handing results between threads, the C++20 latch, barrier and semaphore, and building a thread pool.',
          estimatedMinutes: 120,
          objectives: [
            'Use `std::condition_variable` correctly with a predicate',
            'Build a bounded blocking queue',
            'Return results and exceptions with `std::promise`, `std::future` and `std::async`',
            'Use `std::latch`, `std::barrier` and `std::counting_semaphore`',
            'Build a thread pool with cancellation through stop tokens',
          ],
          concepts: [
            'Condition variable: sleep until a predicate may be true',
            'Spurious wakeups and lost wakeups',
            '`std::condition_variable_any` with `std::stop_token`',
            '`std::future` and `std::promise`',
            '`std::async` launch policies',
            '`std::packaged_task`',
            '`std::latch`, `std::barrier`, `std::counting_semaphore`',
            'Thread pool and work queue',
            'Backpressure from a bounded queue',
          ],
          explanation: `A thread that must wait for something should sleep rather than spin. A **condition variable** puts a thread to sleep until another thread signals that a condition may now be true. It always works together with a mutex and a *predicate*:

\`\`\`cpp
template <typename T>
class BoundedQueue {
public:
    explicit BoundedQueue(std::size_t cap) : cap_{cap} {}

    void push(T item) {
        std::unique_lock lock{m_};
        not_full_.wait(lock, [this] { return q_.size() < cap_; });
        q_.push_back(std::move(item));
        not_empty_.notify_one();
    }

    T pop() {
        std::unique_lock lock{m_};
        not_empty_.wait(lock, [this] { return !q_.empty(); });
        T item = std::move(q_.front());
        q_.pop_front();
        not_full_.notify_one();
        return item;
    }

private:
    std::mutex m_;
    std::condition_variable not_empty_, not_full_;
    std::deque<T> q_;
    std::size_t cap_;
};
\`\`\`

Always use the predicate form of \`wait\`. Wakeups may be spurious, and the condition may have changed by the time you hold the lock. The predicate must be changed while holding the mutex, or a notification can be lost. The bounded queue also gives **backpressure**: a fast producer blocks instead of filling memory.

To support cancellation, use \`std::condition_variable_any\`, whose \`wait\` overload takes a \`std::stop_token\` and wakes up when a stop is requested.

A **future** represents a value that will arrive later. \`std::promise\` is the write end and \`std::future\` the read end, and the channel also carries exceptions: if the worker stores one, \`future.get()\` rethrows it on the waiting thread. That solves the boundary problem from module 6.

\`\`\`cpp
auto f = std::async(std::launch::async, [] { return expensive(); });
// ... do other work ...
int result = f.get();      // waits, returns the value or rethrows
\`\`\`

Always pass \`std::launch::async\`, because the default policy may run the task lazily on the \`get\` call. And note that the future returned by \`std::async\` blocks in its destructor, so discarding it makes the call synchronous.

\`std::packaged_task\` wraps a callable with a future, and it is what you put in a thread pool's queue. A **thread pool** is workers that loop popping tasks from a shared queue. It saves the cost of thread creation and limits concurrency.

C++20 also adds small primitives. **\`std::latch\`** is a one-shot countdown, for example "wait until all workers are ready". **\`std::barrier\`** is a reusable rendezvous for phases. **\`std::counting_semaphore\`** limits access to a resource.

Compare the code above with the condition variable chapter in OSTEP. It is the same protocol, wrapped in RAII. Then build the pool, because you will use it in the final project.`,
          resources: [
            {
              title: 'std::condition_variable',
              url: 'https://en.cppreference.com/w/cpp/thread/condition_variable',
              type: 'documentation',
              cost: 'free',
              provider: 'cppreference',
              primary: true,
            },
            {
              title: 'std::condition_variable_any',
              url: 'https://en.cppreference.com/w/cpp/thread/condition_variable_any',
              type: 'documentation',
              cost: 'free',
              provider: 'cppreference',
              note: 'See the `wait` overloads that take a `std::stop_token`.',
            },
            {
              title: 'std::future',
              url: 'https://en.cppreference.com/w/cpp/thread/future',
              type: 'documentation',
              cost: 'free',
              provider: 'cppreference',
            },
            {
              title: 'std::packaged_task',
              url: 'https://en.cppreference.com/w/cpp/thread/packaged_task',
              type: 'documentation',
              cost: 'free',
              provider: 'cppreference',
            },
            {
              title: 'std::latch',
              url: 'https://en.cppreference.com/w/cpp/thread/latch',
              type: 'documentation',
              cost: 'free',
              provider: 'cppreference',
            },
          ],
          exercises: [
            {
              slug: 'bounded-queue-with-close',
              title: 'A closable bounded queue',
              prompt:
                'Extend `BoundedQueue` with `close()`, after which `push` returns `false`, and `pop` returns `std::optional<T>`, draining remaining items and then returning none. Test it with 4 producers and 4 consumers moving 1,000,000 integers, checking that the sum received equals the sum sent, under TSan. Measure throughput for capacities 1, 16 and 1,024.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'thread-pool',
              title: 'A thread pool with futures',
              prompt:
                'Write `class ThreadPool` with `explicit ThreadPool(std::size_t n)` and `template <typename F> auto submit(F&& f)`, which returns a `std::future` of the result of `f`, using `std::packaged_task`. Use `std::jthread` workers, a queue of `std::move_only_function`-style tasks (write your own type-erased `Task` in C++20), and stop tokens for shutdown. Tests: 1,000 tasks returning their index sum to 499,500; a task that throws rethrows from `get()`; and destroying the pool completes queued work.',
              kind: 'coding',
              difficulty: 3,
              hint: 'A `std::packaged_task` is move-only, so a plain `std::function` cannot hold it unless you wrap it in a `std::shared_ptr`. Start with that, then replace it.',
            },
            {
              slug: 'barrier-phases',
              title: 'Parallel phases with a barrier',
              prompt:
                'Simulate heat diffusion on a 1D array of 1,000,000 doubles, in which each of 4 threads updates its slice each step, and a `std::barrier` swaps the two buffers between steps. After 1,000 steps the result must equal a sequential run bit for bit. Add a `std::latch` that holds all workers until setup is complete. Report the speedup and explain why the steps must not overlap.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'async-pitfalls',
              title: 'std::async pitfalls',
              prompt:
                'Show that `std::async(task);` with a discarded result and `std::launch::async` runs synchronously, by timing two 500 ms sleeps, for a total near 1,000 ms. Keep the futures and show the total is near 500 ms. Show the default policy running lazily, by printing thread ids. Finally, write a function that sums a range recursively by splitting with `std::async` to a depth limit, and show what happens if you remove the limit.',
              kind: 'coding',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'Why must you use a predicate with `condition_variable::wait`?',
              answerOutline:
                'Spurious wakeups can occur, and another thread may have consumed the condition before this one reacquired the lock, so the condition has to be rechecked under the mutex.',
            },
            {
              question: 'What is a lost wakeup, and how does the mutex prevent it?',
              answerOutline:
                'A notification sent between checking the condition and sleeping would be missed. Changing the state under the mutex closes that window, since `wait` atomically releases the lock and sleeps.',
            },
            {
              question: 'What happens to an exception in a task whose result is read through a `std::future`?',
              answerOutline:
                'It is stored in the shared state and rethrown from `get()` on the waiting thread.',
            },
            {
              question: 'What is the difference between `std::latch` and `std::barrier`?',
              answerOutline:
                'A latch is single-use and counts down to zero once. A barrier resets after each round, and can run a completion function, so it suits repeated phases.',
            },
          ],
          relatedLessons: [
            'operating-systems/concurrency/condition-variables-and-semaphores',
            'operating-systems/concurrency/concurrency-bugs-and-event-based',
          ],
        },
        {
          slug: 'atomics-and-the-memory-model',
          title: 'Atomics and the memory model',
          summary:
            'std::atomic, happens-before, the memory orders that matter, compare-exchange, false sharing, and a wait-free single-producer ring.',
          estimatedMinutes: 140,
          objectives: [
            'Explain happens-before and synchronizes-with',
            'Use `std::atomic` with the default sequentially consistent order',
            'Pair release and acquire operations to publish data',
            'Say when `relaxed` is correct',
            'Write a compare-exchange loop and describe the ABA problem',
            'Avoid false sharing, and build a single-producer single-consumer ring',
          ],
          concepts: [
            '`std::atomic<T>` and lock-free operations',
            'Happens-before, synchronizes-with',
            'Sequential consistency (the default)',
            'Acquire and release',
            'Relaxed for counters and statistics',
            'Compare-exchange loops',
            'ABA problem',
            'False sharing and `alignas`',
            'Lock-free vs wait-free',
          ],
          explanation: `Compilers and CPUs reorder memory operations. In a single thread this cannot be seen, but other threads can see it. The memory model tells you exactly what is guaranteed. The core idea is **happens-before**: if a write happens before a read, the read sees it. A mutex creates that relation, and so do atomics.

A \`std::atomic<T>\` operation is indivisible and can never be a data race. Used with the default order, \`seq_cst\`, all atomic operations appear in a single global order. **Start with the default.** Weaker orders are an optimization for code you can measure and prove.

The most useful weaker pattern is **release-acquire**, which publishes data:

\`\`\`cpp
std::atomic<bool> ready{false};
int data = 0;

void producer() {
    data = 42;                                       // plain write
    ready.store(true, std::memory_order_release);    // publish
}

void consumer() {
    while (!ready.load(std::memory_order_acquire)) { }
    assert(data == 42);                              // guaranteed
}
\`\`\`

When the acquire load reads the value written by the release store, the two **synchronize**, and everything before the store happens before everything after the load. So \`data\` needs no atomic and no lock. On x86 these orders usually cost nothing extra in hardware, because the architecture is strongly ordered, so bugs often stay hidden until you run on ARM.

**\`memory_order_relaxed\`** gives atomicity with no ordering. It is correct for a statistics counter, and wrong for anything that signals that other data is ready.

**Compare-exchange** is the basis of lock-free algorithms:

\`\`\`cpp
int cur = max_seen.load();
while (cur < x && !max_seen.compare_exchange_weak(cur, x)) { }
\`\`\`

On failure, \`cur\` is reloaded and the loop retries. Lock-free structures that reuse memory face the **ABA problem**: a value changes from A to B and back to A, so a compare-exchange succeeds although the world has changed.

Two threads writing to *different* variables in one 64-byte cache line slow each other down, which is **false sharing**. Separate hot variables with \`alignas(std::hardware_destructive_interference_size)\`, or just \`alignas(64)\`.

The classic safe lock-free structure is a **single-producer single-consumer ring**. The producer alone writes \`tail\`, the consumer alone writes \`head\`, and each reads the other's index with acquire. No compare-exchange is needed, and each side finishes in bounded steps, so it is *wait-free*.

Lock-free code is hard. Prefer a mutex unless measurements say otherwise. Watch Fedor Pikus's talk, then Herb Sutter's *atomic Weapons* for depth, and read Preshing's articles. They are clear on what acquire and release mean, in terms of the hardware.`,
          resources: [
            {
              title: 'Fedor Pikus: C++ atomics, from basic to advanced (CppCon 2017)',
              url: 'https://www.youtube.com/watch?v=ZQFzMfHIxng',
              type: 'lecture',
              cost: 'free',
              provider: 'CppCon',
              primary: true,
            },
            {
              title: 'Herb Sutter: atomic Weapons, part 1 (C++ and Beyond 2012)',
              url: 'https://www.youtube.com/watch?v=A8eCGOqgvH4',
              type: 'lecture',
              cost: 'free',
              provider: 'C++ and Beyond',
              note: 'The clearest long explanation of the memory model. Part 2 is linked from the video.',
            },
            {
              title: 'Preshing on Programming: Acquire and Release Semantics',
              url: 'https://preshing.com/20120913/acquire-and-release-semantics/',
              type: 'article',
              cost: 'free',
              provider: 'Jeff Preshing',
            },
            {
              title: 'std::memory_order',
              url: 'https://en.cppreference.com/w/cpp/atomic/memory_order',
              type: 'documentation',
              cost: 'free',
              provider: 'cppreference',
            },
            {
              title: 'Preshing on Programming: Acquire and Release Fences',
              url: 'https://preshing.com/20130922/acquire-and-release-fences/',
              type: 'article',
              cost: 'free',
              provider: 'Jeff Preshing',
              note: 'Needed for the seqlock exercise.',
            },
          ],
          exercises: [
            {
              slug: 'publish-with-acquire-release',
              title: 'Publish a struct',
              prompt:
                'A producer fills a `std::array<int, 1024>` then sets `std::atomic<bool> ready` with release. A consumer spins on acquire and verifies every element. Run 100,000 rounds with fresh data. Then run the same code with `relaxed` under TSan, and explain the report. Then remove the atomic altogether, and show that at `-O2` the consumer loop may never exit. Explain why in terms of the compiler.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'false-sharing-measurement',
              title: 'Measure false sharing',
              prompt:
                'Run 4 threads, each incrementing its own `std::atomic<std::uint64_t>` 100,000,000 times with relaxed order, placed in three layouts: adjacent in a struct, `alignas(64)`, and on separate heap allocations. Report the time for each layout, over 5 runs. Then explain the ratio you see from cache coherence behaviour. Also use `perf c2c` if your kernel allows it, or otherwise say so.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'spsc-ring',
              title: 'A wait-free SPSC ring',
              prompt:
                'Write `template <typename T, std::size_t N> class SpscRing` where `N` is a power of two (enforced with a `requires` clause), with `try_push` and `try_pop`, and `head` and `tail` on separate cache lines. Test it by transferring 100,000,000 sequential integers from one thread to another, verifying the order, and run a shorter version under TSan. Then cache the other side\'s index locally, and report the throughput gain.',
              kind: 'coding',
              difficulty: 3,
              hint: 'Producer: `tail.load(relaxed)`, `head.load(acquire)`, write the slot, `tail.store(t + 1, release)`.',
            },
            {
              slug: 'seqlock',
              title: 'A seqlock with relaxed atomics',
              prompt:
                'Write a one-writer, many-readers seqlock protecting 4 `std::atomic<std::uint64_t>` words. Writer: `seq.store(s + 1, relaxed)`, `std::atomic_thread_fence(release)`, relaxed word writes, `seq.store(s + 2, release)`. Reader: `s1 = seq.load(acquire)`, retry if odd, relaxed word reads, `std::atomic_thread_fence(acquire)`, `s2 = seq.load(relaxed)`, retry if `s1 != s2`. The writer stores the same value in all 4 words, and readers assert that they match. Explain why plain `uint64_t` words would be a data race, and why each fence is needed.',
              kind: 'coding',
              difficulty: 3,
              hint: 'TSan does not model fences, but because every word is atomic it will stay quiet. The assertion is your check.',
            },
          ],
          selfAssessment: [
            {
              question: 'What does a release store paired with an acquire load guarantee?',
              answerOutline:
                'If the load reads the stored value, everything sequenced before the store happens before everything after the load, so the data written before it is visible.',
            },
            {
              question: 'When is `memory_order_relaxed` correct?',
              answerOutline:
                'When only the atomicity of that variable matters and no other data depends on it, such as a statistics counter.',
            },
            {
              question: 'Why can a program with wrong memory orders pass all its tests on x86?',
              answerOutline:
                'x86 has a strong memory model, in which loads and stores keep most of their order, so the missing guarantees show up only with compiler reordering or on weaker hardware such as ARM.',
            },
            {
              question: 'What is false sharing?',
              answerOutline:
                'Threads writing to independent variables on the same cache line, forcing the line to bounce between cores, so performance falls with no logical sharing.',
            },
            {
              question: 'Why does a single-producer single-consumer ring need no compare-exchange?',
              answerOutline:
                'Each index has exactly one writer, so no two threads compete to update the same variable. Only ordering is needed, which acquire and release provide.',
            },
          ],
          relatedLessons: [
            'systems-programming/ownership-and-safe-concurrency/fearless-concurrency',
            'computer-architecture/performance-pipelining-caches/memory-hierarchy-and-caches',
            'computer-architecture/performance-pipelining-caches/parallelism-multicore-and-gpus',
          ],
        },
        {
          slug: 'coroutines',
          title: 'Coroutines',
          summary:
            'What co_await, co_yield and co_return really do, how to write a generator, and how coroutines express asynchronous code without callbacks.',
          estimatedMinutes: 120,
          objectives: [
            'Explain how a coroutine differs from a function and from a thread',
            'Name the roles of the promise type, the coroutine handle and an awaitable',
            'Write a `Generator<T>` that works in a range-based `for`',
            'Write a task type that resumes on a thread pool',
            'Avoid the reference-parameter lifetime trap',
          ],
          concepts: [
            'Stackless coroutine: suspendable function',
            'Coroutine frame',
            '`co_await`, `co_yield`, `co_return`',
            '`promise_type`',
            '`std::coroutine_handle`',
            'Awaitable: `await_ready`, `await_suspend`, `await_resume`',
            'Lazy vs eager start',
            'Dangling references after suspension',
          ],
          explanation: `A **coroutine** is a function that can suspend and later resume where it left off. Any function containing \`co_await\`, \`co_yield\` or \`co_return\` is one. C++20 coroutines are *stackless*: locals that live across a suspension are kept in a **coroutine frame**, usually on the heap, and suspending returns control to whoever resumed it. That makes them far cheaper than threads, so a program can hold millions.

C++20 provides the language machinery, not a ready library. Your return type must contain a nested \`promise_type\`, which the compiler calls at each point of the coroutine's life:

\`\`\`cpp
Generator<int> count_to(int n) {
    for (int i = 1; i <= n; ++i)
        co_yield i;                // suspend, handing i to the caller
}

for (int x : count_to(3)) std::cout << x;   // 123
\`\`\`

The compiler turns that body into a state machine. The three pieces are:

- **\`promise_type\`** is the coroutine's interface. It creates the return object, and decides what happens at start, at finish and on \`co_yield\`, through \`initial_suspend\`, \`final_suspend\`, \`yield_value\`, \`return_void\` and \`unhandled_exception\`.
- **\`std::coroutine_handle<Promise>\`** is a small, non-owning handle with which you call \`resume()\`, \`done()\` and \`destroy()\`. Your \`Generator\` should own it, RAII style, and destroy it in the destructor, with copies deleted.
- **An awaitable** is any object with \`await_ready\`, \`await_suspend\` and \`await_resume\`. \`co_await x\` asks if it is ready, and if not, suspends and calls \`await_suspend(handle)\`, which can pass the handle to another thread, a timer or an I/O completion. That is how asynchronous code gets written without callbacks:

\`\`\`cpp
struct ScheduleOn {
    ThreadPool& pool;
    bool await_ready() const noexcept { return false; }
    void await_suspend(std::coroutine_handle<> h) { pool.post([h] { h.resume(); }); }
    void await_resume() const noexcept { }
};

Task<int> work(ThreadPool& pool) {
    co_await ScheduleOn{pool};   // now running on a pool thread
    co_return compute();
}
\`\`\`

The great trap is **lifetime**. A reference parameter stores only the reference in the frame, so if the caller's object dies while the coroutine is suspended, it dangles. Take parameters by value in coroutines that outlive the call, and be careful with lambdas that are coroutines, because their captures live in the lambda object, not the frame.

C++23 adds \`std::generator\`, which ships with GCC 14 and later, but this lesson has you write one, because the same promise machinery is behind every async library.

Lewis Baker's blog series is the definitive explanation, and Gor Nishanov's talk shows what the compiler produces.`,
          resources: [
            {
              title: 'Lewis Baker: Coroutine Theory',
              url: 'https://lewissbaker.github.io/2017/09/25/coroutine-theory',
              type: 'article',
              cost: 'free',
              provider: 'Lewis Baker',
              primary: true,
            },
            {
              title: 'Lewis Baker: Understanding operator co_await',
              url: 'https://lewissbaker.github.io/2017/11/17/understanding-operator-co-await',
              type: 'article',
              cost: 'free',
              provider: 'Lewis Baker',
            },
            {
              title: 'Coroutines (C++20)',
              url: 'https://en.cppreference.com/w/cpp/language/coroutines',
              type: 'documentation',
              cost: 'free',
              provider: 'cppreference',
              note: 'The worked example at the bottom is a good starting point.',
            },
            {
              title: 'Gor Nishanov: C++ Coroutines: Under the covers (CppCon 2016)',
              url: 'https://www.youtube.com/watch?v=8C8NnE1Dg4A',
              type: 'lecture',
              cost: 'free',
              provider: 'CppCon',
              note: 'How the compiler lowers a coroutine, by the author of the feature.',
            },
          ],
          exercises: [
            {
              slug: 'write-a-generator',
              title: 'Write Generator<T>',
              prompt:
                'Write `template <typename T> class Generator` with a `promise_type`, RAII ownership of the handle, and an input iterator, so that it works in a range-based `for` and satisfies `std::ranges::input_range`. Test: `fib()` as an infinite generator, piped through `std::views::take(10)`, prints 0 1 1 2 3 5 8 13 21 34. A generator that throws on its third value must rethrow at the iteration. Run under ASan to check for frame leaks when the loop breaks early.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'tree-walk-generator',
              title: 'A tree walk with no explicit stack',
              prompt:
                'Using `Generator`, write an in-order walk of a binary tree of 1,000,000 keys in a few lines, with nested generators per level. Then write an iterative version with an explicit `std::vector` stack. Compare the code length and the time to visit all keys at `-O2`, and explain the difference through the cost of each frame.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'awaitable-tracer',
              title: 'Trace an awaitable',
              prompt:
                'Write a `Task<T>` and an awaitable that logs each of `await_ready`, `await_suspend` and `await_resume`, with thread ids. Using your thread pool from the previous lesson, write a coroutine that switches between two pools, and show that the thread id changes across each `co_await`. Then return `true` from `await_ready` and show that no suspension occurs. Add a thread-safe `sync_wait(task)` to get the result in `main`.',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'coroutine-lifetime-bug',
              title: 'The dangling coroutine parameter',
              prompt:
                'Write `Task<std::size_t> length(const std::string& s)`, which suspends once before reading `s`, and call it with a temporary string longer than the small-string buffer, resuming later. Show the ASan `heap-use-after-free`. Fix it by taking `std::string` by value. Repeat with a capturing lambda coroutine, whose lambda object is destroyed before resumption, and explain why capturing does not help here.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What makes a C++ function a coroutine?',
              answerOutline:
                'Its body uses `co_await`, `co_yield` or `co_return`. Nothing in the signature marks it, though the return type must supply a `promise_type`.',
            },
            {
              question: 'What is stored in the coroutine frame?',
              answerOutline:
                'The promise, copies of parameters, locals alive across suspension points, and the resume state. It is usually heap allocated, though the compiler may elide that.',
            },
            {
              question: 'What does `await_suspend` receive, and why is that powerful?',
              answerOutline:
                'A handle to the suspended coroutine. It can store or pass the handle anywhere, so another thread or an I/O completion can resume it later.',
            },
            {
              question: 'Why are reference parameters dangerous in a coroutine?',
              answerOutline:
                'Only the reference is copied into the frame. The caller\'s object may be gone by the time the coroutine resumes.',
            },
          ],
          relatedLessons: ['operating-systems/concurrency/concurrency-bugs-and-event-based'],
        },
      ],
    },
    {
      slug: 'performance-testing-and-scale',
      title: 'Performance, Testing and Large-Project Practice',
      description:
        'The engineering around the language: test strategy, fuzzing and CI, profiling and performance work based on evidence, and keeping a large C++ codebase healthy, buildable and easy to reuse.',
      lessons: [
        {
          slug: 'testing-fuzzing-and-ci',
          title: 'Testing, fuzzing and CI',
          summary:
            'Structure a C++ test suite with Catch2, test templates and concurrency, fuzz your parsers with libFuzzer, and run the whole sanitizer matrix in GitHub Actions.',
          estimatedMinutes: 120,
          objectives: [
            'Organize unit tests with Catch2 sections, generators and test tags',
            'Test templates, compile-time behaviour and expected compile failures',
            'Write a libFuzzer harness and fix a bug that it finds',
            'Measure line coverage and say what it does not prove',
            'Set up GitHub Actions that build with two compilers and run sanitizers',
          ],
          concepts: [
            'Catch2 `TEST_CASE`, `SECTION`, `GENERATE`',
            'Model-based and round-trip properties',
            'Testing with `static_assert`',
            'Compile-fail tests in CMake',
            'Coverage-guided fuzzing',
            'Sanitizer matrix: ASan and UBSan, then TSan',
            'CI on every push',
            'Coverage with `gcov` or `llvm-cov`',
          ],
          explanation: `You have been using Catch2 since module 1. Here you make testing a system. In C++, tests also need to catch what the language will not: undefined behaviour, leaks and races.

**Structure.** Sections in Catch2 re-run the enclosing test for each path, which replaces most fixtures. \`GENERATE\` gives data-driven tests:

\`\`\`cpp
TEST_CASE("parse_int rejects junk") {
    auto bad = GENERATE(as<std::string>{}, "", " 5", "12a", "99999999999");
    CAPTURE(bad);
    REQUIRE_FALSE(parse_int(bad).has_value());
}
\`\`\`

**Properties** find more bugs than examples. Use a round trip (\`parse(dump(x)) == x\`), or a *model*, comparing your structure against a simple correct one (\`std::map\`) under a million random operations with a fixed seed. The software-engineering course covers the theory behind both.

**Compile-time tests.** \`static_assert\` covers concepts and \`constexpr\` code. To test that something does *not* compile, add an object library marked \`EXCLUDE_FROM_ALL\`, and a CTest test that runs \`cmake --build . --target that_lib\`, with the test property \`WILL_FAIL\` set to true.

**Fuzzing** feeds generated input to your code and uses coverage feedback to reach new paths. It is especially effective for parsers. Under ASan and UBSan, each crash is a real bug:

\`\`\`cpp
extern "C" int LLVMFuzzerTestOneInput(const std::uint8_t* data, std::size_t size) {
    std::string_view text{reinterpret_cast<const char*>(data), size};
    (void)try_parse(text);    // must never crash, whatever the input
    return 0;
}
\`\`\`

Build with \`clang++ -g -O1 -fsanitize=fuzzer,address,undefined\`, and run it. It stops at the first crash and saves the input to a file, which you then add to your regression tests.

**Coverage** (\`--coverage\` with \`gcov\`, or \`-fprofile-instr-generate\` with \`llvm-cov\`) shows code no test reaches. It cannot show that the tests check the right things, so treat it as a way to find gaps, not as a score.

**Continuous integration** makes all of it automatic. A good GitHub Actions workflow for a C++ project builds with both GCC and Clang, treats warnings as errors, and runs the tests in three configurations: release, ASan with UBSan, and TSan. Cache FetchContent downloads, and run \`clang-tidy\` and a \`clang-format\` check as separate jobs. The \`ubuntu-latest\` runner has what you need. A 10-minute pipeline that catches a data race on every push pays for itself many times over.

Read the Catch2 and libFuzzer documentation, and set up the workflow on a real repository. Your own MP code is ideal, and the fuzz exercise often finds a genuine bug in it.`,
          resources: [
            {
              title: 'Catch2 repository and documentation',
              url: 'https://github.com/catchorg/Catch2',
              type: 'documentation',
              cost: 'free',
              provider: 'Catch2',
              note: 'See `docs/` for sections, generators and CMake integration.',
              primary: true,
            },
            {
              title: 'libFuzzer',
              url: 'https://llvm.org/docs/LibFuzzer.html',
              type: 'documentation',
              cost: 'free',
              provider: 'LLVM',
            },
            {
              title: 'GitHub Actions documentation',
              url: 'https://docs.github.com/en/actions',
              type: 'documentation',
              cost: 'free',
              provider: 'GitHub',
            },
            {
              title: 'GoogleTest User\'s Guide',
              url: 'https://google.github.io/googletest/',
              type: 'documentation',
              cost: 'free',
              provider: 'Google',
              note: 'The main alternative to Catch2. Read the primer so that you can work in projects that use it, and see gMock for mocking.',
            },
            {
              title: 'Phil Nash: Test Driven C++ (CppCon 2020)',
              url: 'https://www.youtube.com/watch?v=N2gTxeIHMP0',
              type: 'lecture',
              cost: 'free',
              provider: 'CppCon',
              note: 'From the author of Catch2.',
            },
          ],
          exercises: [
            {
              slug: 'fuzz-your-parser',
              title: 'Fuzz your own parser',
              prompt:
                'Write a libFuzzer harness for the `typedjson` parser from MP 2, seeded with a few small valid documents. Run it for at least 10 minutes with `-max_total_time=600`, under ASan and UBSan. Add every crash input as a Catch2 regression test, and then fix it. If no crash appears, plant a bug (such as a missing bounds check at the end of a string), and confirm that the fuzzer finds it. Report executions per second and final coverage.',
              kind: 'coding',
              difficulty: 2,
              hint: 'Use `clang++`, since GCC has no libFuzzer. Add `-dict=` with a small JSON dictionary to reach deeper paths faster.',
            },
            {
              slug: 'model-based-container-test',
              title: 'A model-based test',
              prompt:
                'Write a model-based test for `BoundedQueue` or the module 6 linked list against `std::deque`: apply 1,000,000 random operations with a fixed `std::mt19937_64` seed, and after each one compare size and front element. On failure print the seed and the operation index. Plant a bug that appears only after the container wraps or empties, and check how quickly the test finds it.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'github-actions-matrix',
              title: 'A CI matrix',
              prompt:
                'Add `.github/workflows/ci.yml` to one of your repositories. It builds on `ubuntu-latest` with GCC and Clang (`-Wall -Wextra -Werror`), and runs tests in Release, in ASan with UBSan, and in TSan. Add a status badge to the README. Push a branch with a deliberate use-after-free and a branch with a deliberate data race, and confirm that each fails the right job.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'compile-fail-test',
              title: 'Test that bad code does not compile',
              prompt:
                'For your `Identifier` class from module 5, add a CMake target that compiles a file containing `Identifier x{"not valid"};`, excluded from the default build, plus a CTest test that builds the target and has `WILL_FAIL TRUE`. Verify that the test passes, then make the constructor accept everything, and check that it fails. Explain why `static_assert` cannot express this particular check.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why is a fuzzer most useful when combined with sanitizers?',
              answerOutline:
                'Many memory bugs do not crash on their own. Sanitizers turn silent corruption and UB into immediate failures that the fuzzer can detect and save.',
            },
            {
              question: 'What is a model-based test?',
              answerOutline:
                'Applying the same random operations to your implementation and to a simple reference, and comparing results after each one.',
            },
            {
              question: 'Why can a single CI job not run ASan and TSan together?',
              answerOutline:
                'They instrument memory in incompatible ways, so they need separate builds.',
            },
            {
              question: 'What does 100% line coverage not tell you?',
              answerOutline:
                'That the assertions check the right things, or that all input combinations and thread interleavings behave correctly. It only shows that lines ran.',
            },
          ],
          relatedLessons: [
            'software-engineering/testing-strategy/test-design-partitioning-and-coverage',
            'software-engineering/testing-strategy/property-based-testing',
            'software-engineering/build-ci-cd-and-deployment/continuous-integration',
          ],
        },
        {
          slug: 'profiling-and-performance-engineering',
          title: 'Profiling and performance engineering',
          summary:
            'Benchmark correctly with Google Benchmark, profile on WSL, and apply the C++ specific optimizations that matter: fewer allocations, better layout, smarter builds.',
          estimatedMinutes: 130,
          objectives: [
            'Write Google Benchmark microbenchmarks that measure what you intend',
            'Profile a program with `perf` or Callgrind and read a flame graph',
            'Reduce allocations with `reserve`, `string_view` and `std::pmr`',
            'Change data layout to improve cache behaviour, and show the gain',
            'Use `-O2`, `-march`, LTO and PGO, and explain their trade-offs',
          ],
          concepts: [
            'Measure first; profile before optimizing',
            '`benchmark::DoNotOptimize`',
            'Sampling vs instrumentation profiling',
            'Flame graphs',
            'Allocation as the hidden cost',
            '`std::pmr::monotonic_buffer_resource`',
            'Struct of arrays and hot-cold splitting',
            'LTO and PGO',
            'Strict aliasing and `std::bit_cast`',
          ],
          explanation: `The systems-programming course covers measurement method and caches. This lesson applies them to C++, where the worst costs are usually **hidden in innocent-looking code**.

**Benchmark correctly.** The optimizer deletes work whose result is unused, so use Google Benchmark, which handles repetition and timing:

\`\`\`cpp
static void BM_Sum(benchmark::State& state) {
    std::vector<int> v(state.range(0), 1);
    for (auto _ : state) {
        int total = std::accumulate(v.begin(), v.end(), 0);
        benchmark::DoNotOptimize(total);
    }
    state.SetItemsProcessed(state.iterations() * state.range(0));
}
BENCHMARK(BM_Sum)->Range(1 << 10, 1 << 20);
\`\`\`

Run with \`--benchmark_repetitions=10\` and compare medians. Build in release mode, and close other programs. On WSL 2 timing noise is higher than on bare metal, so report the spread.

**Profile first.** Your guess about the hot spot is usually wrong. On WSL 2, \`perf\` from \`linux-tools-generic\` may need to be called by its full path under \`/usr/lib/linux-tools*/\`, and it may lack hardware counters, so use \`perf record -e cpu-clock -g\`. If that fails, \`valgrind --tool=callgrind\` always works, though it is about 50 times slower. Build with \`-O2 -g -fno-omit-frame-pointer\`, and view results as a flame graph, where width shows time.

**Allocation** is the classic C++ cost. A \`malloc\` takes tens of nanoseconds or more, and it scatters your data. Look for it everywhere: use \`reserve\`, pass \`std::string_view\`, reuse buffers across loop iterations, and do not build a \`std::string\` just to look up a key. For short-lived work, a **\`std::pmr::monotonic_buffer_resource\`** hands out memory from a block and frees it all at once:

\`\`\`cpp
std::array<std::byte, 64 * 1024> buffer;
std::pmr::monotonic_buffer_resource arena{buffer.data(), buffer.size()};
std::pmr::vector<int> v{&arena};
\`\`\`

**Layout** often beats clever code. Keep frequently used fields together (*hot-cold splitting*), or move from an array of structs to a struct of arrays when you touch one field in a loop, and replace pointer-rich structures with indices into a vector. Mike Acton's talk makes this case very forcefully.

**Build settings** give cheap wins. \`-O2\` is the baseline, \`-march=native\` allows newer instructions but makes the binary non-portable, **LTO** (\`-flto\`, or \`CMAKE_INTERPROCEDURAL_OPTIMIZATION\`) inlines across files, and **PGO** optimizes for a recorded workload.

C++ also has one standard trap in fast code. Reinterpreting bytes through a pointer cast breaks **strict aliasing**, which is undefined behaviour. Use \`std::bit_cast\` for values, or \`std::memcpy\`, both of which optimize to nothing.

Always state what you measured, and keep the change only if it earns its complexity. Watch Carruth's *Tuning C++* for live benchmarking, then measure something of your own.`,
          resources: [
            {
              title: 'Google Benchmark User Guide',
              url: 'https://google.github.io/benchmark/user_guide.html',
              type: 'documentation',
              cost: 'free',
              provider: 'Google',
              primary: true,
            },
            {
              title: 'Chandler Carruth: Tuning C++: Benchmarks, and CPUs, and Compilers! Oh My! (CppCon 2015)',
              url: 'https://www.youtube.com/watch?v=nXaxk27zwlk',
              type: 'lecture',
              cost: 'free',
              provider: 'CppCon',
            },
            {
              title: 'Mike Acton: Data-Oriented Design and C++ (CppCon 2014)',
              url: 'https://www.youtube.com/watch?v=rX0ItVEVjHc',
              type: 'lecture',
              cost: 'free',
              provider: 'CppCon',
            },
            {
              title: 'Brendan Gregg: Flame Graphs',
              url: 'https://www.brendangregg.com/flamegraphs.html',
              type: 'article',
              cost: 'free',
              provider: 'Brendan Gregg',
            },
            {
              title: 'Callgrind manual',
              url: 'https://valgrind.org/docs/manual/cl-manual.html',
              type: 'documentation',
              cost: 'free',
              provider: 'Valgrind',
              note: 'The fallback profiler if `perf` is unavailable in WSL.',
            },
          ],
          exercises: [
            {
              slug: 'benchmark-string-building',
              title: 'Benchmark four string builders',
              prompt:
                'With Google Benchmark, compare four ways to join 10,000 short strings: `operator+` in a loop, `+=` without `reserve`, `+=` with `reserve`, and `std::ostringstream`. Use `--benchmark_repetitions=10`, and report medians and spread. Count allocations in each with a replaced `operator new`, reported through `state.counters`. Explain why the first is quadratic.',
              kind: 'coding',
              difficulty: 1,
            },
            {
              slug: 'profile-and-fix',
              title: 'Profile, fix, prove',
              prompt:
                'Take the `tjq` tool from MP 2 on a file of at least 20 MB. Profile with `perf` or Callgrind and produce a flame graph or a sorted function list. Identify the top two hot spots, change the code, and show before and after numbers from at least 10 runs of each. Write down one change you expected to help that did not.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'soa-vs-aos',
              title: 'Layout decides',
              prompt:
                'For 10,000,000 particles with position, velocity, mass and a 64-byte name, update positions from velocities in an array of structs, then in a struct of arrays, then in AoS with the name moved to a separate array. Report the time per update and bytes per particle. Build at `-O3` with and without `-march=native`, and look in Compiler Explorer to see which versions vectorize.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'pmr-arena',
              title: 'An arena for a request',
              prompt:
                'Simulate request handling: each request builds a `std::pmr::vector<std::pmr::string>` of 100 strings, then discards it. Compare the default allocator with a `monotonic_buffer_resource` backed by a stack buffer, and released after each request. Report requests per second, and allocations per request using a counting `operator new`. Show what happens when the arena is too small, and why the upstream resource saves you.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'lto-pgo-experiment',
              title: 'LTO and PGO',
              prompt:
                'Build a multi-file program of your own at `-O2`, `-O2 -flto`, and with PGO (`-fprofile-generate`, a training run, then `-fprofile-use`). Report build time, binary size, and runtime, as medians of 10 runs. Note what happens when the training input differs from the test input.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does a benchmark need `benchmark::DoNotOptimize`?',
              answerOutline:
                'If a result is unused, the optimizer can delete the computation, and you end up measuring nothing.',
            },
            {
              question: 'What does a flame graph\'s width show, and what does its height show?',
              answerOutline:
                'Width is the share of samples in that function and below it. Height is call stack depth. Order along the x axis has no meaning.',
            },
            {
              question: 'Why does reducing allocations often speed up a program more than the time inside `malloc` suggests?',
              answerOutline:
                'Fewer allocations keep data contiguous, which improves cache use, and they reduce fragmentation and cross-thread contention.',
            },
            {
              question: 'Why is `*reinterpret_cast<float*>(&some_int)` a bug, and what do you use instead?',
              answerOutline:
                'It violates strict aliasing, so it is undefined behaviour. Use `std::bit_cast<float>(some_int)` or `std::memcpy`.',
            },
          ],
          relatedLessons: [
            'systems-programming/performance-and-undefined-behaviour/profiling-and-benchmarking',
            'systems-programming/performance-and-undefined-behaviour/cache-friendly-code-and-optimization',
            'systems-programming/performance-and-undefined-behaviour/undefined-behaviour-and-the-c-standard',
            'data-structures-algorithms/analysis-foundations/measuring-and-benchmarking',
          ],
        },
        {
          slug: 'large-project-practice',
          title: 'Large-project practice',
          summary:
            'What changes as a codebase grows: compile times, headers, modules, static analysis, ABI, and packaging a library that others can consume.',
          estimatedMinutes: 110,
          objectives: [
            'Diagnose and reduce long build times',
            'Set up `clang-tidy` and `clang-format` on a project',
            'Explain what ABI stability means, and how it differs from API stability',
            'Install and export a CMake package usable with `find_package`',
            'Describe the state of C++20 modules, and say when to adopt them',
            'Call C APIs from C++ and expose a C API',
          ],
          concepts: [
            'Include cost and forward declarations',
            'Precompiled headers and `ccache`',
            'C++20 modules',
            'clang-tidy and clang-format',
            'API vs ABI stability',
            '`install(EXPORT)` and `find_package`',
            'Semantic versioning',
            '`extern "C"`',
            'vcpkg and Conan',
          ],
          explanation: `Most C++ you meet in a job is a large codebase that must keep building and stay correct while many people change it.

**Build times.** Each translation unit re-parses every header it includes, and templates add instantiation work. A single \`#include <iostream>\` or \`<ranges>\` can add tens of thousands of lines. Measure with \`-ftime-trace\` in Clang, then reduce: include only what you use, forward-declare where a pointer or reference is enough, use pimpl across big boundaries, move template-heavy helpers out of widely used headers, and consider \`target_precompile_headers\`. Add \`ccache\` to skip repeat compiles.

**C++20 modules** replace textual inclusion with a compiled interface:

\`\`\`cpp
export module geometry;
export double area(double w, double h) { return w * h; }

// in another file
import geometry;
\`\`\`

They promise faster builds and no macro leakage, and CMake supports them from 3.28 with Ninja, on Clang, MSVC and GCC 14. The ecosystem is still moving, so expect to keep headers for public libraries for a while, and check the current status in the CMake manual.

**Automated style and analysis.** \`clang-format\` removes formatting from code review altogether. \`clang-tidy\` checks hundreds of rules, including \`bugprone-*\`, \`modernize-*\`, \`performance-*\` and the Core Guidelines. Start with a small set of checks and fix those.

**API and ABI.** The *API* is what source code compiles against. The *ABI* is the binary contract: name mangling, object layout, vtables. If a shared library changes the layout of a class, programs built against the old header break silently. Header-only code and static libraries sidestep that, and pimpl keeps layouts stable.

**Packaging.** A reusable library installs its headers and exports its targets, so that users can write:

\`\`\`cmake
find_package(flightrec 1.0 REQUIRED)
target_link_libraries(app PRIVATE flightrec::flightrec)
\`\`\`

That takes \`install(TARGETS ... EXPORT ...)\`, \`install(EXPORT ...)\`, and a package config file from \`CMakePackageConfigHelpers\`. Keep FetchContent working as well, and do not force warnings or sanitizers on your users. Use semantic versioning. Package managers such as **vcpkg** and **Conan** handle third-party dependencies in larger projects.

**Other languages.** C remains the universal interface. \`extern "C"\` turns off name mangling, so that C++ can call C libraries, and so that Python, Rust or anything else can call your library through a small C API. Do not let exceptions cross that boundary.

Read the CMake import and export guide, then package one of your libraries. *Software Engineering at Google* is a free book on the wider questions of scale.`,
          resources: [
            {
              title: 'CMake: Importing and Exporting Guide',
              url: 'https://cmake.org/cmake/help/latest/guide/importing-exporting/index.html',
              type: 'documentation',
              cost: 'free',
              provider: 'Kitware',
              primary: true,
            },
            {
              title: 'cmake-cxxmodules(7)',
              url: 'https://cmake.org/cmake/help/latest/manual/cmake-cxxmodules.7.html',
              type: 'documentation',
              cost: 'free',
              provider: 'Kitware',
              note: 'Check here for the current state of module support.',
            },
            {
              title: 'clang-tidy',
              url: 'https://clang.llvm.org/extra/clang-tidy/',
              type: 'documentation',
              cost: 'free',
              provider: 'LLVM',
            },
            {
              title: 'Software Engineering at Google (free online book)',
              url: 'https://abseil.io/resources/swe-book',
              type: 'textbook',
              cost: 'free',
              provider: 'Winters, Manshreck and Wright',
              note: 'Chapters on testing, dependency management and large-scale changes.',
            },
            {
              title: 'cpp-best-practices: cmake_template',
              url: 'https://github.com/cpp-best-practices/cmake_template',
              type: 'tool',
              cost: 'free',
              provider: 'Jason Turner and contributors',
              note: 'A project template to read, not to copy blindly. Compare its setup with yours.',
            },
          ],
          exercises: [
            {
              slug: 'build-time-budget',
              title: 'Find your slowest header',
              prompt:
                'Compile one of your projects with `clang++ -ftime-trace` and load the JSON in `chrome://tracing` or ui.perfetto.dev. List the three most expensive includes or template instantiations. Reduce them with forward declarations, by moving code to a `.cpp`, or with `target_precompile_headers`. Report the total clean build time and one-file incremental build time, before and after.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'tidy-and-format',
              title: 'Add clang-tidy and clang-format',
              prompt:
                'Add `.clang-format` and `.clang-tidy` files to a project. Enable `bugprone-*`, `modernize-use-override`, `modernize-use-nullptr`, `performance-*` and `readability-braces-around-statements`. Turn on `CMAKE_CXX_CLANG_TIDY`, and fix the warnings. For each distinct finding, write one line on whether it was a real problem. Keep the check list short enough that the build stays clean.',
              kind: 'coding',
              difficulty: 1,
            },
            {
              slug: 'package-a-library',
              title: 'Package a library',
              prompt:
                'Make `typedjson` from MP 2 installable: `cmake --install build --prefix ~/local`, with an exported `typedjson::typedjson` target and version file. In a separate folder, create a consumer project with `find_package(typedjson 1.0 REQUIRED)`, and build it with `CMAKE_PREFIX_PATH=~/local`. Then show the same consumer using `FetchContent` from your Git URL. Automate both consumers in CI.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'c-api-wrapper',
              title: 'A C API over C++',
              prompt:
                'Write a small `extern "C"` API for `typedjson`: `tj_parse`, `tj_dump`, `tj_free`, using an opaque handle. Exceptions must be caught at the boundary and turned into error codes. Build it as a shared library and call it from Python using `ctypes`, parsing `{"a": 1}` and dumping it back. Run it under ASan, and show that no exception or memory leak crosses the boundary.',
              kind: 'coding',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does a change to a widely included header cost so much more than a change to a `.cpp`?',
              answerOutline:
                'Every translation unit that includes it, directly or indirectly, must be recompiled, whereas a `.cpp` change recompiles one file and relinks.',
            },
            {
              question: 'Give an example of a change that keeps the API but breaks the ABI.',
              answerOutline:
                'Adding a private data member changes the class size and layout. Source code still compiles, but binaries built against the old layout break.',
            },
            {
              question: 'Why should a library not put `-Werror` or sanitizers in its PUBLIC compile options?',
              answerOutline:
                'Those flags would spread to users, whose compilers and settings differ, so their builds would break. Keep these for the library\'s own CI.',
            },
            {
              question: 'What must not cross an `extern "C"` boundary, and why?',
              answerOutline:
                'Exceptions and C++ types, because C callers have no way to handle them. Catch at the boundary and return error codes through plain types.',
            },
          ],
          relatedLessons: [
            'systems-programming/the-toolchain/linking-and-libraries',
            'software-engineering/build-ci-cd-and-deployment/packaging-and-dependencies',
          ],
        },
      ],
    },
  ],
  capstone: {
    slug: 'flight-recorder-library',
    title: 'Capstone: an always-on flight recorder for C++ programs',
    description: `Build a low-overhead tracing library that any C++ program can link. It records timed spans into per-thread wait-free ring buffers, streams them to a binary file from a background thread, and can dump the most recent history on demand or when the program dies. A command-line tool turns those files into statistics and into timelines you can open in the Perfetto UI.

The full specification is the final project in this course's coursework, which replaces this summary in the site.`,
    deliverables: [
      'A CMake library with a small public header, installable with `find_package` and usable through FetchContent',
      'A wait-free per-thread ring buffer with measured overhead per span and tests under ASan, UBSan and TSan',
      'A documented binary file format and a command-line analyzer, fuzzed against malformed input',
      'A README with a Perfetto screenshot, a benchmark table and a design write-up, with CI on every push',
    ],
    estimatedHours: 50,
    stretchGoals: [
      'Trace across coroutine suspension so that one logical task appears as one track',
      'Support MSVC natively, without WSL',
    ],
  },
  masteryChecklist: [
    'I can set up a CMake project with presets, tests, sanitizers and clangd, on Windows through WSL and on Linux',
    'I can design a class around an invariant, and tie every resource it uses to an object lifetime with RAII',
    'I can explain value categories, and say exactly when a copy, a move or neither happens',
    'I can write types that need no special members, and implement a correct resource manager when one is needed',
    'I can choose a container from memory layout and complexity, and state its iterator invalidation rules',
    'I can use algorithms, ranges, `string_view`, `optional` and `variant` without creating dangling references',
    'I can write constrained templates with concepts, perfect forwarding and compile-time evaluation, and read the errors they produce',
    'I can state the exception safety guarantee of a function and choose an error handling style for each layer of a program',
    'I can express ownership in a signature, and use `unique_ptr`, `shared_ptr` and `weak_ptr` correctly',
    'I can write multithreaded code that is clean under ThreadSanitizer, and justify every memory order I use',
    'I can write a generator and an awaitable, and explain what the compiler does with a coroutine',
    'I can benchmark and profile C++ code, explain the result, and show a measured improvement',
    'I can fuzz a parser, run a sanitizer matrix in CI, and publish a library that others can install',
  ],
});
