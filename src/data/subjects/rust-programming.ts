import { defineSubject } from '../define';

export default defineSubject({
  id: 'rust-programming',
  title: 'Rust Programming',
  category: 'cs',
  tagline:
    'Rust 2024 for programmers who have never managed memory by hand: ownership and the borrow checker, data modelling with enums, traits and iterators, safe concurrency and async, then unsafe code, FFI and a published crate.',
  description: `Rust is a compiled language with no garbage collector that still rules out use-after-free, double frees, data races and null pointer errors at compile time. It does this through **ownership**: every value has exactly one owner, and references to it are checked by the **borrow checker** so that nothing is ever read after it is freed or changed while someone else is reading it. The result is the speed and control of C or C++ with far fewer of their bugs, which is why Rust now ships in Windows, Linux, Android, Firefox, Cloudflare's and AWS's infrastructure, and a large share of new command-line tools.

This course assumes that you can program, in Python for example, and that you have never freed memory yourself. It teaches the **2024 edition** of Rust, and every example needs **Rust 1.88 or newer**: 1.85 is the first release with the 2024 edition, and 1.88 added the \`let\` chains used from module 3 on. Each lesson explains how the compiler reasons rather than handing you incantations. When it shows a compiler error, it is the real message with its real error code, and you learn to read it line by line.

The order is deliberate. You start with Cargo, the core syntax, tests and Clippy, then spend a whole module on ownership and borrowing before anything else. Then come data modelling with structs, enums and \`Result\`, generics, traits and lifetimes, and collections, iterators, closures and smart pointers. The last two modules cover threads, channels, \`Arc\` and \`Mutex\`, async code with Tokio, and finally \`unsafe\` code, FFI with C, macros, benchmarks and publishing. The aim throughout is idiomatic Rust: iterators instead of index loops, \`?\` instead of nested error checks, and enums that make invalid states impossible to represent.

Lessons are built on free material: *The Rust Programming Language*, Brown University's interactive edition of it, Rust by Example, Rustlings, the standard library documentation, the Rust Reference, the Rustonomicon and the Tokio tutorial. Everything runs natively on Windows 10 in VS Code with rust-analyzer. The Systems Programming course has one module of Rust basics, and this course goes much further and links back to it. You finish with two machine problems and an original image resizing library and server, with a measured piece of \`unsafe\` code, which is worth publishing.`,
  difficulty: 'intermediate',
  estimatedHours: 80,
  prerequisites: ['programming-fundamentals'],
  recommendedBackground: [
    'Systems Programming in C and Rust (systems-programming): helpful for the stack, the heap and linking, not required',
    'Modern C++ (cpp-programming): RAII and move semantics are close relatives of Rust ownership, not required',
    'Comfort with a terminal and with reading long error messages',
  ],
  tags: ['Rust', 'Rust 2024', 'ownership', 'borrow checker', 'traits', 'iterators', 'concurrency', 'async', 'Tokio', 'unsafe', 'FFI'],
  core: false,
  modules: [
    {
      slug: 'getting-started',
      title: 'Getting Started',
      description:
        'Install Rust on Windows, build with Cargo, and learn the core syntax: values, types, control flow and functions, plus a first look at `String` and `Vec`. From the first week you write tests, run Clippy and rustfmt, and read compiler errors properly.',
      lessons: [
        {
          slug: 'toolchain-cargo-and-vs-code',
          title: 'The toolchain: rustup, Cargo and VS Code on Windows',
          summary:
            'Install Rust with rustup, create and build a Cargo project, and set up VS Code with rust-analyzer and a debugger. Learn what an edition is and why this course uses 2024.',
          estimatedMinutes: 75,
          objectives: [
            'Install a stable Rust toolchain on Windows 10 and explain what rustup, rustc and Cargo each do',
            'Create, build, run and check a Cargo project, in debug and in release mode',
            'Read a `Cargo.toml` and set the edition and the minimum supported Rust version',
            'Set up VS Code with rust-analyzer and a debugger, and step through a program',
            'Explain what an edition changes and what it does not',
          ],
          concepts: [
            'rustup: installs and updates toolchains',
            'rustc: the compiler',
            'Cargo: build tool and package manager',
            'MSVC host and the Visual Studio Build Tools',
            '`Cargo.toml` and `Cargo.lock`',
            'Edition 2024 and `rust-version`',
            'Debug and release profiles',
            'rust-analyzer: the language server',
          ],
          explanation: `You install Rust with **rustup**, which manages toolchains: a compiler (**rustc**), the standard library, and **Cargo**, which builds projects and fetches dependencies. On Windows, download \`rustup-init.exe\` from rust-lang.org and accept the default host, \`x86_64-pc-windows-msvc\`. That host links with Microsoft's linker, so the installer offers to install the free Visual Studio Build Tools with the "Desktop development with C++" workload. Say yes. Afterwards \`rustc --version\` and \`cargo --version\` should work in a new terminal, and \`rustup update\` upgrades you later.

You will rarely call \`rustc\` yourself. \`cargo new hello\` creates a project with \`src/main.rs\` and a manifest:

\`\`\`toml
[package]
name = "hello"
version = "0.1.0"
edition = "2024"
rust-version = "1.88"

[dependencies]
\`\`\`

\`cargo run\` compiles a debug build into \`target/debug/\` and runs it. \`cargo build --release\` builds an optimised one into \`target/release/\`, which often runs many times faster, so always measure speed in release mode. \`cargo check\` type-checks without generating code, and it is what you run most often.

\`\`\`rust
fn main() {
    let name = "Ferris";
    let year = 2024;
    println!("Hello, {name}! This crate uses the {year} edition.");
}
\`\`\`

\`\`\`text
Hello, Ferris! This crate uses the 2024 edition.
\`\`\`

An **edition** is a set of opt-in language changes, such as new keywords, chosen per crate in \`Cargo.toml\`. Crates of different editions link together freely, and every new compiler supports every edition. This course uses 2024. \`rust-version\` records the oldest compiler your crate supports, and this course needs 1.88.

In VS Code, install **rust-analyzer** (\`rust-lang.rust-analyzer\`). It gives you errors as you type, inferred types as inlay hints, go to definition into the standard library, and Run and Debug buttons above \`main\` and every test. For breakpoints, install **CodeLLDB** (\`vadimcn.vscode-lldb\`). The C/C++ extension's Windows debugger also works for MSVC builds. **Even Better TOML** (\`tamasfe.even-better-toml\`) helps with manifests.

Read chapter 1 of *The Rust Programming Language* ("the Book"), then do the exercises.`,
          resources: [
            {
              title: 'The Rust Programming Language, chapter 1: Getting Started',
              url: 'https://doc.rust-lang.org/book/ch01-01-installation.html',
              type: 'textbook',
              cost: 'free',
              provider: 'Rust Project',
              note: 'Installation, Hello World and Hello Cargo. The Book is the primary text for the whole course.',
              primary: true,
            },
            {
              title: 'rustup: Windows MSVC prerequisites',
              url: 'https://rust-lang.github.io/rustup/installation/windows-msvc.html',
              type: 'documentation',
              cost: 'free',
              provider: 'Rust Project',
              note: 'What the installer sets up, and how to install the Build Tools by hand if it fails.',
            },
            {
              title: 'Rust in Visual Studio Code',
              url: 'https://code.visualstudio.com/docs/languages/rust',
              type: 'documentation',
              cost: 'free',
              provider: 'Microsoft',
              note: 'rust-analyzer features, and debugging setup on Windows.',
            },
            {
              title: 'The Rust Edition Guide: Rust 2024',
              url: 'https://doc.rust-lang.org/edition-guide/rust-2024/index.html',
              type: 'documentation',
              cost: 'free',
              provider: 'Rust Project',
              note: 'Skim the list of changes now. Later lessons point back to the ones that matter.',
            },
          ],
          exercises: [
            {
              slug: 'install-and-verify',
              title: 'Install and verify the toolchain',
              prompt:
                'Install Rust with rustup and the Build Tools. Record the output of `rustup show`, `rustc --version` and `cargo --version` in a `SETUP.md`, and confirm that the version is 1.88 or newer. Create `hello` with `cargo new`, set `rust-version = "1.88"`, and run it with `cargo run` and `cargo run --release`. Find both executables under `target/`, note their sizes, and run each one directly from the terminal.',
              kind: 'coding',
              difficulty: 1,
              hint: 'If linking fails with `link.exe not found`, the Build Tools are missing or lack the C++ workload. Rerun the Visual Studio Installer and add it.',
            },
            {
              slug: 'rust-analyzer-tour',
              title: 'A tour of rust-analyzer and the debugger',
              prompt:
                'In VS Code, open `hello`. Turn on inlay hints and write down the type rust-analyzer shows for `let year = 2024;`. Use go to definition on `println!` to land in the standard library source. Rename `name` with F2. Then set a breakpoint on the `println!` line, start the debugger from the Debug button above `main`, and inspect `name` and `year` in the Variables panel.',
              kind: 'coding',
              difficulty: 1,
            },
            {
              slug: 'edition-difference',
              title: 'See an edition change',
              prompt:
                'Create two crates, one with `edition = "2021"` and one with `edition = "2024"`, each with `let gen = 3; println!("{gen}");` in `main`. Build both. Record the exact error from the 2024 crate, explain in one sentence why the 2021 crate still compiles, and run `cargo fix --edition` on a copy of the 2021 crate to see how it rewrites the code.',
              kind: 'coding',
              difficulty: 2,
              hint: '`gen` is reserved as a keyword in the 2024 edition. The raw identifier `r#gen` is how old code keeps using it.',
            },
          ],
          selfAssessment: [
            {
              question: 'What are rustup, rustc and Cargo, and which do you use day to day?',
              answerOutline:
                'rustup installs and switches toolchains, rustc compiles one crate, Cargo drives builds, tests and dependencies by calling rustc. You use Cargo.',
            },
            {
              question: 'Why does the default Windows toolchain need the Visual Studio Build Tools?',
              answerOutline:
                'The MSVC host uses Microsoft\'s linker and Windows SDK libraries to produce executables. rustc does not ship its own linker for that target.',
            },
            {
              question: 'A crate on edition 2021 depends on one on edition 2024. Does that work?',
              answerOutline:
                'Yes. Editions are chosen per crate and all compile with the same compiler into compatible code, so they link freely.',
            },
            {
              question: 'Why should you never time a program built with plain `cargo run`?',
              answerOutline:
                'It is a debug build with no optimisation and with overflow checks, which can be many times slower. Use `--release`.',
            },
          ],
          relatedLessons: ['systems-programming/rust-fundamentals/rust-syntax-and-cargo'],
        },
        {
          slug: 'values-types-and-control-flow',
          title: 'Values, types and control flow',
          summary:
            'Immutable bindings, `mut` and shadowing, the scalar and compound types, integer overflow, and control flow in which `if`, `loop` and blocks are expressions that produce values.',
          estimatedMinutes: 80,
          objectives: [
            'Declare immutable and mutable bindings, and explain shadowing',
            'Choose integer, floating-point, `bool` and `char` types, and handle overflow explicitly',
            'Use tuples and fixed-size arrays',
            'Write `if`, `loop`, `while` and `for` as expressions, including `break` with a value and labelled breaks',
            'Read your first borrow-free compiler error, E0384',
          ],
          concepts: [
            'Immutable by default, `mut` to opt in',
            'Shadowing: a new binding with the same name',
            'Integer types: `i8` to `i128`, `u8` to `u128`, `usize`',
            'Overflow: panics in debug, wraps in release',
            '`checked_`, `wrapping_` and `saturating_` arithmetic',
            '`char`: a Unicode scalar value, 4 bytes',
            'Tuples and arrays `[T; N]`',
            '`if` and `loop` as expressions',
            'Labelled `break`',
          ],
          explanation: `A \`let\` binding is **immutable** unless you write \`mut\`, so the compiler can tell you when something changes that you did not expect to change:

\`\`\`rust
fn main() {
    let count = 0;
    count += 1;
    println!("{count}");
}
\`\`\`

\`\`\`text
error[E0384]: cannot assign twice to immutable variable \`count\`
 --> src/main.rs:3:5
  |
2 |     let count = 0;
  |         ----- first assignment to \`count\`
3 |     count += 1;
  |     ^^^^^^^^^^ cannot assign twice to immutable variable
\`\`\`

Read it from the top: the code (look it up with \`rustc --explain E0384\`), the file, line and column, then labels. \`^^^\` marks the problem, \`---\` marks related places. Below this the compiler adds \`help: consider making this binding mutable\`. **Shadowing**, a second \`let count = count + 1;\`, is different. It creates a new binding, possibly of a new type, as in \`let n: u32 = n.trim().parse().expect("number")\`.

Integers come in fixed sizes: \`i32\` is the default, \`u8\` is a byte, and \`usize\` is pointer-sized and used for lengths and indices. Overflow is a bug that the language makes visible. Debug builds **panic**, which stops the thread with a message, while release builds wrap. When you mean one behaviour, say so with a method. \`f64\` is the default float. \`char\` is a 4-byte Unicode scalar value such as \`'é'\` or \`'🦀'\`, not a byte. \`as\` converts between number types and silently truncates, so \`300_i32 as u8\` is 44.

\`if\` and \`loop\` are **expressions**. Both branches of an \`if\` must have the same type, and \`break value\` returns a value from a \`loop\`:

\`\`\`rust
fn main() {
    let limit: u8 = 250;
    println!("{:?}", limit.checked_add(10));
    println!("{}", limit.wrapping_add(10));
    println!("{}", limit.saturating_add(10));

    let parity = if limit.is_multiple_of(2) { "even" } else { "odd" };
    println!("{limit} is {parity}");

    let mut n: u64 = 27;
    let mut steps = 0;
    let reached = loop {
        if n == 1 {
            break steps;
        }
        n = if n.is_multiple_of(2) { n / 2 } else { 3 * n + 1 };
        steps += 1;
    };
    println!("27 reaches 1 after {reached} steps");

    'outer: for row in 1..=9 {
        for col in 1..=9 {
            if row * col == 42 {
                println!("first product 42: {row} x {col}");
                break 'outer;
            }
        }
    }
}
\`\`\`

\`\`\`text
None
4
255
250 is even
27 reaches 1 after 111 steps
first product 42: 6 x 7
\`\`\`

\`checked_add\` returns an \`Option\`, which is \`None\` on overflow. Module 3 covers \`Option\` properly. \`1..=9\` is an inclusive range and \`0..n\` excludes \`n\`. Tuples group values of different types, \`(i32, &str)\`, and arrays \`[f64; 3]\` have a length fixed at compile time. Work through chapter 3 of the Book alongside this lesson.`,
          resources: [
            {
              title: 'The Rust Programming Language, chapter 3: Common Programming Concepts',
              url: 'https://doc.rust-lang.org/book/ch03-00-common-programming-concepts.html',
              type: 'textbook',
              cost: 'free',
              provider: 'Rust Project',
              note: 'Variables, data types, functions, comments and control flow.',
              primary: true,
            },
            {
              title: 'Rust by Example: Primitives',
              url: 'https://doc.rust-lang.org/rust-by-example/primitives.html',
              type: 'interactive',
              cost: 'free',
              provider: 'Rust Project',
              note: 'Runnable examples of literals, operators, tuples and arrays. Edit and run them in the page.',
            },
            {
              title: 'Rust by Example: Flow of Control',
              url: 'https://doc.rust-lang.org/rust-by-example/flow_control.html',
              type: 'interactive',
              cost: 'free',
              provider: 'Rust Project',
              note: 'Read the sections on `loop`, labels and returning from loops.',
            },
          ],
          exercises: [
            {
              slug: 'digit-functions',
              title: 'Digit sums and reversals',
              prompt:
                'Write `digit_sum(n: u64) -> u64` and `reverse_digits(n: u64) -> u64` with loops and the `%` and `/` operators. Check that `digit_sum(u64::MAX)` is 87 and `reverse_digits(1200)` is 21. Then explain what happens to `reverse_digits(u64::MAX)` in a debug and a release build, and change the function to use `checked_mul` and `checked_add` so that it prints a message instead of overflowing.',
              kind: 'coding',
              difficulty: 1,
              hint: '`checked_mul` gives back an `Option`. For now, test it with `.is_none()` and `.unwrap()`, which module 3 replaces with pattern matching.',
            },
            {
              slug: 'labelled-search',
              title: 'A search with a labelled break',
              prompt:
                'Find the only Pythagorean triple with `a < b < c` and `a + b + c == 1000`, using nested `for` loops over ranges and a labelled `break` that carries no flags. Bind the answer with `let (a, b, c) = \'search: loop { ... };`, with the `for` loops inside it and `break \'search (a, b, c)` in the innermost one. Expected: 200, 375, 425. Count how many inner iterations ran and report the count.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'char-and-casts',
              title: 'Characters and casts',
              prompt:
                'Print `size_of::<char>()`, then `\'é\'.len_utf8()`, `\'🦀\'.len_utf8()` and `\'🦀\' as u32` in hex. Print `300_i32 as u8`, `-1_i32 as u32` and `3.99_f64 as i32`, and explain each result. Then show that `u8::try_from(300_i32)` reports an error instead of truncating, and write down which of these two conversion styles you would use in a parser and why.',
              kind: 'coding',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'What is the difference between `let mut x = 5; x = 6;` and `let x = 5; let x = 6;`?',
              answerOutline:
                'The first mutates one variable. The second shadows it with a new, separate binding, which may even have a different type. The old value still exists but cannot be named.',
            },
            {
              question: 'What happens when `u8` arithmetic overflows, and how do you choose a behaviour?',
              answerOutline:
                'Debug builds panic and release builds wrap. Use `checked_`, `wrapping_`, `saturating_` or `overflowing_` methods to state what you mean.',
            },
            {
              question: 'Why does `let x = if c { 1 } else { "one" };` fail to compile?',
              answerOutline:
                '`if` is an expression with one type, so both branches must have the same type. Here one is an integer and the other a `&str`.',
            },
            {
              question: 'How many bytes is a `char`, and is it the same as a byte of a string?',
              answerOutline:
                'Four bytes, holding a Unicode scalar value. Strings store UTF-8, where one `char` takes 1 to 4 bytes.',
            },
          ],
          relatedLessons: ['systems-programming/c-fundamentals/types-operators-and-control-flow'],
        },
        {
          slug: 'functions-strings-and-vectors',
          title: 'Functions, and a first look at String and Vec',
          summary:
            'Function signatures, the difference between expressions and statements, and the two types you will use in almost every program: the growable `String` and the growable `Vec<T>`.',
          estimatedMinutes: 80,
          objectives: [
            'Write functions with typed parameters and return values, using tail expressions',
            'Explain why a trailing semicolon can change a function\'s return type',
            'Build and use a `String` and a `Vec<T>`, and loop over a `Vec`',
            'Parse numbers from text and read command-line arguments and standard input',
          ],
          concepts: [
            'Function signatures are always annotated',
            'Tail expression: the last expression is the value',
            'Statements end with `;` and have type `()`',
            'The unit type `()`',
            '`String`: owned, growable UTF-8 text',
            'String literals: `&str`',
            '`Vec<T>` and the `vec!` macro',
            '`str::parse` and `expect`',
            '`std::env::args` and `std::io::stdin`',
          ],
          explanation: `Every function states its parameter and return types. Inside a body, the type is usually inferred. The body is a block, and a block's value is its last expression, written **without** a semicolon. A semicolon turns an expression into a statement whose value is \`()\`, the unit type, so the classic beginner mistake looks like this:

\`\`\`rust
fn square(x: i32) -> i32 {
    x * x;
}

fn main() {
    println!("{}", square(4));
}
\`\`\`

\`\`\`text
error[E0308]: mismatched types
 --> src/main.rs:1:22
  |
1 | fn square(x: i32) -> i32 {
  |    ------            ^^^ expected \`i32\`, found \`()\`
  |    |
  |    implicitly returns \`()\` as its body has no tail or \`return\` expression
2 |     x * x;
  |          - help: remove this semicolon to return this value
\`\`\`

\`return\` exists for early exits. Idiomatic Rust uses the tail expression for the normal result.

Two library types appear everywhere. A **\`String\`** owns growable UTF-8 text. A string literal such as \`"hi"\` is a **\`&str\`**, a view of text stored elsewhere. A **\`Vec<T>\`** is a growable array of \`T\`. Here they are together:

\`\`\`rust
fn mean(values: &[f64]) -> f64 {
    let mut total = 0.0;
    for v in values {
        total += v;
    }
    total / values.len() as f64
}

fn main() {
    let mut readings = Vec::new();
    for text in ["3.5", "4.0", "5.5"] {
        let value: f64 = text.parse().expect("not a number");
        readings.push(value);
    }
    let mut report = String::from("mean = ");
    report.push_str(&mean(&readings).to_string());
    println!("{report} from {} readings", readings.len());
}
\`\`\`

\`\`\`text
mean = 4.333333333333333 from 3 readings
\`\`\`

Three things here are explained properly in module 2. \`&readings\` lends the vector to \`mean\` without giving it away. \`&[f64]\` reads as "a view of some \`f64\` values". \`Vec::new()\` has no element type until the first \`push\` tells the compiler what it is. \`parse\` can fail, so it returns a \`Result\`. For now, \`.expect("message")\` takes the value or stops the program with that message. Module 3 replaces this with real error handling.

To read input, \`std::io::read_to_string(std::io::stdin()).expect("read stdin")\` returns all of standard input as a \`String\`, and \`text.lines()\` and \`text.split_whitespace()\` let you loop over it. \`let args: Vec<String> = std::env::args().collect();\` gives the command line, with the program name in \`args[0]\`. Indexing past the end of a \`Vec\` panics rather than reading garbage.`,
          resources: [
            {
              title: 'The Rust Programming Language, section 3.3: Functions',
              url: 'https://doc.rust-lang.org/book/ch03-03-how-functions-work.html',
              type: 'textbook',
              cost: 'free',
              provider: 'Rust Project',
              note: 'Statements and expressions, and functions with return values.',
              primary: true,
            },
            {
              title: 'std::string::String',
              url: 'https://doc.rust-lang.org/std/string/struct.String.html',
              type: 'documentation',
              cost: 'free',
              provider: 'Rust Project',
              note: 'Read the introduction and skim the method list. Learn to search the standard library docs from day one.',
            },
            {
              title: 'std::vec::Vec',
              url: 'https://doc.rust-lang.org/std/vec/struct.Vec.html',
              type: 'documentation',
              cost: 'free',
              provider: 'Rust Project',
              note: 'The introduction covers creation, indexing, `push` and `pop`.',
            },
          ],
          exercises: [
            {
              slug: 'calendar-functions',
              title: 'Calendar functions',
              prompt:
                'Write `is_leap(year: u32) -> bool` and `days_in_month(year: u32, month: u32) -> u32` with tail expressions and no `return`. Check that 1900 is not a leap year, 2000 and 2024 are, February 2100 has 28 days and February 2400 has 29. Then write `day_of_year(year, month, day) -> u32` and confirm that 31 December 2024 is day 366.',
              kind: 'coding',
              difficulty: 1,
            },
            {
              slug: 'stdin-stats',
              title: 'Statistics from standard input',
              prompt:
                'Write a program that reads whitespace-separated numbers from standard input and prints the count, minimum, maximum and mean, each on its own line, with the mean to 3 decimal places (`{:.3}`). For the input `4 8 15 16 23 42`, expected output is 6, 4, 42 and 18.000. Run it in PowerShell with `"4 8 15 16 23 42" | cargo run`. Note what happens when the input contains `abc`, and what happens with empty input.',
              kind: 'coding',
              difficulty: 2,
              hint: 'Keep running values in `let mut` variables while you loop over `text.split_whitespace()`. Start the minimum at `f64::INFINITY`.',
            },
            {
              slug: 'semicolon-puzzles',
              title: 'Expressions and semicolons',
              prompt:
                'Write five small functions whose bodies differ only in where a semicolon or a `return` appears, for example `{ let y = x + 1; y }`, `{ x + 1; }`, `{ if x > 0 { 1 } else { -1 } }` and `{ return x; }`. Predict which compile and what each returns, then check. For each one that fails, copy the first line of the error and the `help:` line.',
              kind: 'coding',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does adding `;` after the last line of a function returning `i32` cause an error?',
              answerOutline:
                'The semicolon makes the line a statement, so the block\'s value becomes `()`, which does not match the declared `i32`.',
            },
            {
              question: 'What is the difference between `String` and a string literal?',
              answerOutline:
                '`String` owns heap-allocated, growable text. A literal is a `&str` pointing at text stored in the program binary, and it cannot grow.',
            },
            {
              question: 'What does `.expect("msg")` do, and why is it only a stopgap?',
              answerOutline:
                'It takes the success value or panics with the message. It turns every recoverable error into a crash, so real programs propagate or handle errors instead.',
            },
          ],
        },
        {
          slug: 'tests-clippy-and-reading-errors',
          title: 'Tests, Clippy, rustfmt and reading compiler errors',
          summary:
            'Write unit tests with `cargo test`, keep code idiomatic with Clippy and rustfmt, and learn to read a compiler error from top to bottom so that it tells you the fix.',
          estimatedMinutes: 75,
          objectives: [
            'Write unit tests with `assert!`, `assert_eq!` and `#[should_panic]`, and run a subset of them',
            'Explain the parts of a compiler diagnostic: code, primary span, secondary labels, notes and help',
            'Run Clippy and rustfmt, and fix or justify every lint',
            'Use `rustc --explain` and the error index to understand an unfamiliar error',
          ],
          concepts: [
            '`#[test]` and `#[cfg(test)]`',
            '`assert_eq!` shows both values on failure',
            '`#[should_panic(expected = ...)]`',
            '`cargo test FILTER` and `-- --nocapture`',
            'Diagnostic anatomy: code, span, labels, help',
            'Fix the first error first',
            'Clippy lint groups and levels',
            'rustfmt: one standard style',
          ],
          explanation: `Rust has testing built in. Put tests in the same file, inside a module that is only compiled for \`cargo test\`:

\`\`\`rust
pub fn clamp_percent(x: i32) -> i32 {
    x.clamp(0, 100)
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn clamps_both_ends() {
        assert_eq!(clamp_percent(-5), 0);
        assert_eq!(clamp_percent(42), 42);
        assert_eq!(clamp_percent(250), 100);
    }

    #[test]
    #[should_panic(expected = "index out of bounds")]
    fn indexing_past_the_end_panics() {
        let v: Vec<i32> = (1..=3).collect();
        println!("{}", v[v.len()]);
    }
}
\`\`\`

\`use super::*\` brings the outer file's items into the test module. Module 3 explains modules properly. \`assert_eq!\` prints both values when it fails, so prefer it to \`assert!(a == b)\`. \`cargo test clamps\` runs only tests whose names contain \`clamps\`. Output from passing tests is hidden unless you add \`-- --nocapture\`. Integration tests go in a \`tests/\` folder and see only your public API.

**Reading errors** is a skill. Every diagnostic has the same shape. First comes a headline with a code, such as \`error[E0308]: mismatched types\`. Then comes the location, then the source with a **primary label** under \`^^^\` and **secondary labels** under \`---\`, then \`= note:\` lines, then \`help:\` suggestions, often with a patch. Fix the **first** error first, because later ones are often consequences of it. When the headline is unfamiliar, \`rustc --explain E0308\` prints a page with examples.

**Clippy** is a linter with hundreds of checks for bugs, slow code and unidiomatic code. Run \`cargo clippy\` often. Here it catches a C-style loop:

\`\`\`rust
fn print_all(v: &[i32]) {
    for i in 0..v.len() {
        println!("{}", v[i]);
    }
}

fn main() {
    print_all(&[3, 1, 4]);
}
\`\`\`

\`\`\`text
warning: the loop variable \`i\` is only used to index \`v\`
 --> src/main.rs:2:14
  |
2 |     for i in 0..v.len() {
  |              ^^^^^^^^^^
\`\`\`

Its help line suggests \`for <item> in &v\`, which needs no bounds check and cannot index the wrong vector. Each lint has a page explaining why it exists. If a lint is wrong in one place, write \`#[allow(clippy::lint_name)]\` with a comment explaining why. **rustfmt** (\`cargo fmt\`) formats code in the one community style, so style never comes up in review. Turn on format on save in VS Code.

Read chapter 11 of the Book, then start Rustlings, which gives you small broken programs to fix with the compiler's help.`,
          resources: [
            {
              title: 'The Rust Programming Language, chapter 11: Writing Automated Tests',
              url: 'https://doc.rust-lang.org/book/ch11-00-testing.html',
              type: 'textbook',
              cost: 'free',
              provider: 'Rust Project',
              note: 'How tests run, controlling them, and unit versus integration tests.',
              primary: true,
            },
            {
              title: 'Clippy lints',
              url: 'https://rust-lang.github.io/rust-clippy/master/index.html',
              type: 'documentation',
              cost: 'free',
              provider: 'Rust Project',
              note: 'Searchable list with the reason for every lint. Look up each warning you see.',
            },
            {
              title: 'Rust error codes index',
              url: 'https://doc.rust-lang.org/error_codes/error-index.html',
              type: 'documentation',
              cost: 'free',
              provider: 'Rust Project',
              note: 'The same text as `rustc --explain`, with links.',
            },
            {
              title: 'Rustlings',
              url: 'https://github.com/rust-lang/rustlings',
              type: 'interactive',
              cost: 'free',
              provider: 'Rust Project',
              note: 'Install with `cargo install rustlings`. It runs a watcher that checks each exercise as you save.',
            },
          ],
          exercises: [
            {
              slug: 'roman-numerals-test-first',
              title: 'Roman numerals, test first',
              prompt:
                'Write the tests before the code for `to_roman(n: u32) -> String`, valid for 1 to 3999. Include at least: 4 is `IV`, 9 is `IX`, 14 is `XIV`, 1994 is `MCMXCIV`, 2024 is `MMXXIV` and 3999 is `MMMCMXCIX`, plus two `#[should_panic]` tests for 0 and 4000. Watch them fail, implement the function with two parallel arrays of values and symbols, and run `cargo test`, `cargo clippy` and `cargo fmt --check` until all are clean.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'break-it-on-purpose',
              title: 'Break it on purpose',
              prompt:
                'Take your working `to_roman` and introduce five separate mistakes, one at a time: a trailing semicolon on the tail expression, assigning to an immutable binding, calling an undefined function, passing a `&str` where a `u32` is expected, and returning from inside the loop with the wrong type. For each, record the error code, the primary label and whether the `help:` line gave the right fix. Run `rustc --explain` on any code you have not seen before.',
              kind: 'coding',
              difficulty: 1,
            },
            {
              slug: 'pedantic-clippy',
              title: 'Clippy at pedantic level',
              prompt:
                'Add `#![warn(clippy::pedantic)]` to the top of `main.rs` in your statistics program from the previous lesson, and run `cargo clippy`. For each lint, either fix the code or add a targeted `#[allow]` with a one-line reason. List the lints you saw and say which ones you agreed with.',
              kind: 'coding',
              difficulty: 2,
              hint: 'Casts such as `usize as f64` trigger `cast_precision_loss`. Decide whether a count above 2^53 is realistic for your program before you silence it.',
            },
          ],
          selfAssessment: [
            {
              question: 'Why is `assert_eq!(a, b)` better than `assert!(a == b)`?',
              answerOutline:
                'On failure it prints both the left and the right value, so you see what went wrong without adding prints.',
            },
            {
              question: 'A file produces twelve errors. Where do you start, and why?',
              answerOutline:
                'With the first. Later errors are often caused by it, for example an unresolved type making everything that uses it fail.',
            },
            {
              question: 'What do the `^^^` and `---` markers in a diagnostic mean?',
              answerOutline:
                '`^^^` is the primary span, where the error is. `---` marks secondary spans that explain it, such as where a value was moved or borrowed.',
            },
            {
              question: 'When is `#[allow(clippy::...)]` acceptable?',
              answerOutline:
                'When the lint does not apply in that specific place and a comment says why. It should be narrow, on one item, not crate-wide by default.',
            },
          ],
          relatedLessons: ['software-engineering/code-quality-and-refactoring/static-analysis-types-and-automation'],
        },
      ],
    },
    {
      slug: 'ownership-and-borrowing',
      title: 'Ownership and Borrowing',
      description:
        'The heart of Rust. Values have one owner and are freed when it goes away, assignments move, references borrow under the rule of many readers or one writer, and slices and `&str` let you work with parts of data without copying. The module ends with how the borrow checker actually reasons, so you can predict its answers.',
      lessons: [
        {
          slug: 'ownership-moves-and-copy',
          title: 'Ownership, moves, Copy and Clone',
          summary:
            'Who frees memory in a language with no garbage collector and no `free`: one owner per value, moves on assignment, `Copy` for plain data, and `clone` when you really want a second copy.',
          estimatedMinutes: 80,
          objectives: [
            'State the three ownership rules and apply them to assignments, function calls and returns',
            'Explain what a move copies and why the source becomes unusable',
            'Distinguish `Copy` types from types that move, and use `clone` deliberately',
            'Read an E0382 "use of moved value" error and choose a fix',
          ],
          concepts: [
            'Owner: the binding responsible for a value',
            'Drop: freeing when the owner goes out of scope',
            'Stack and heap',
            '`String` as pointer, length and capacity',
            'Move: a shallow copy that invalidates the source',
            '`Copy` types: integers, floats, `bool`, `char`',
            '`clone`: an explicit deep copy',
            'Passing and returning ownership',
          ],
          explanation: `In Python, objects live until a garbage collector finds that nothing refers to them. In C, you call \`free\`, and freeing twice or using memory after freeing it is undefined behaviour. Rust uses a third way, **ownership**, which the compiler checks:

1. Every value has one **owner**, a variable or a field.
2. There is only one owner at a time.
3. When the owner goes out of scope, the value is **dropped**: its memory and other resources are released.

A \`String\` is three words on the stack (pointer, length and capacity) pointing to bytes on the heap. \`let b = a;\` copies those three words, and then **\`a\` is no longer valid**. If both were valid, both would free the same heap bytes at the end of the scope. This is a **move**, and the compiler tracks it:

\`\`\`rust
fn main() {
    let name = String::from("Ferris");
    let moved = name;
    println!("{name} {moved}");
}
\`\`\`

\`\`\`text
error[E0382]: borrow of moved value: \`name\`
 --> src/main.rs:4:16
  |
2 |     let name = String::from("Ferris");
  |         ---- move occurs because \`name\` has type \`String\`, which does not implement the \`Copy\` trait
3 |     let moved = name;
  |                 ---- value moved here
4 |     println!("{name} {moved}");
  |                ^^^^ value borrowed here after move
\`\`\`

The three labels tell the whole story: the type that moves, where the move happened, and the later use. The compiler then suggests \`name.clone()\`. Sometimes that is right, but first ask whether you needed two owners at all.

Types whose bits are the whole value, such as integers, floats, \`bool\`, \`char\` and tuples or arrays of them, are **\`Copy\`**. Assigning them copies, and both copies remain usable. Nothing on the heap means nothing to double-free. **\`clone()\`** makes a full, independent copy of anything that supports it, and it is explicit so that the cost is visible.

Function calls follow the same rules. Passing a \`String\` moves it into the parameter, and returning it moves it out again:

\`\`\`rust
fn shout(mut text: String) -> String {
    text.push('!');
    text.to_uppercase()
}

fn main() {
    let a = 5;
    let b = a;
    println!("{a} {b}");

    let greeting = String::from("hello");
    let loud = shout(greeting);
    let copy = loud.clone();
    println!("{loud} {copy}");
}
\`\`\`

\`\`\`text
5 5
HELLO! HELLO!
\`\`\`

After the call, \`greeting\` cannot be used. Its buffer was dropped inside \`shout\` when \`text\` went out of scope. Passing ownership back and forth to let a function read a value would be tedious, which is why the next lesson introduces borrowing. Work through Brown University's interactive edition of chapter 4.1, which draws the stack and heap at every step and asks you questions as you go.`,
          resources: [
            {
              title: 'The Rust Programming Language (Brown University interactive edition), 4.1: What Is Ownership?',
              url: 'https://rust-book.cs.brown.edu/ch04-01-what-is-ownership.html',
              type: 'interactive',
              cost: 'free',
              provider: 'Brown University',
              note: 'The same Book with memory diagrams and quizzes. Use this edition for all of chapter 4.',
              primary: true,
            },
            {
              title: 'The Rust Programming Language, 4.1: What Is Ownership?',
              url: 'https://doc.rust-lang.org/book/ch04-01-what-is-ownership.html',
              type: 'textbook',
              cost: 'free',
              provider: 'Rust Project',
              note: 'The standard edition, if you prefer reading without quizzes.',
            },
            {
              title: 'Rust by Example: Ownership and moves',
              url: 'https://doc.rust-lang.org/rust-by-example/scope/move.html',
              type: 'interactive',
              cost: 'free',
              provider: 'Rust Project',
              note: 'Short runnable examples, including partial moves out of structs.',
            },
          ],
          exercises: [
            {
              slug: 'predict-the-move',
              title: 'Predict the move',
              prompt:
                'Write six short programs and predict, before compiling, whether each compiles: (a) `let s = String::from("x"); let t = s; println!("{t}");` (b) the same with `{s}` printed (c) moving a `String` into a function inside a `for _ in 0..2` loop (d) `let a = [1, 2, 3]; let b = a;` then printing both with `{:?}` (e) `let a = [String::new(), String::new()]; let b = a;` then printing `a` (f) a tuple `(i32, String)` assigned and then its `.0` field printed. For each one that fails, copy the three labels of the error and explain them in one sentence.',
              kind: 'coding',
              difficulty: 1,
              hint: 'For (c), look for the words "in previous iteration of loop". For (f), using `.0` after a move of the whole tuple is still a use of a moved value.',
            },
            {
              slug: 'clone-cost',
              title: 'What does clone cost?',
              prompt:
                'Build a 10 MB `String` with `"x".repeat(10_000_000)`. In a release build, time 100 moves of it through a function that takes and returns a `String`, and then 100 calls that `clone` it, using `std::time::Instant`. Report both times per operation, and explain the difference in terms of what a move copies. Pass the result to `std::hint::black_box` so that the optimiser cannot remove the work.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'three-signatures',
              title: 'Three ways to hand over a value',
              prompt:
                'A function must add a suffix to a name. Write it three ways: `fn a(s: String) -> String` (take and return ownership), `fn b(s: &String) -> String` (read and build a new one) and `fn c(s: &mut String)` (change in place). Call each from `main` and print the original variable afterwards wherever the compiler allows it. Write two sentences on when each signature is the right choice. The `&` forms are previewed here and taught next lesson.',
              kind: 'writing',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What exactly is copied when a `String` is moved, and why is the source invalidated?',
              answerOutline:
                'The pointer, length and capacity, three words on the stack. The heap bytes stay put. The source is invalidated so that only one owner drops the buffer, which rules out a double free.',
            },
            {
              question: 'Why is `i32` `Copy` but `String` not?',
              answerOutline:
                'An `i32` is just bits with nothing to free, so duplicating it is safe. A `String` owns a heap buffer, and a bitwise duplicate would give two owners of one buffer.',
            },
            {
              question: 'When a `String` parameter goes out of scope at the end of a function, what happens?',
              answerOutline:
                'It is dropped and its heap buffer freed, unless it was moved somewhere else first, for example returned.',
            },
            {
              question: 'The compiler suggests `.clone()` to fix E0382. When is that the wrong fix?',
              answerOutline:
                'When the code only needs to read the value, a borrow is cheaper. When the value is large or cloned in a loop, cloning hides a design problem about who owns it.',
            },
          ],
          relatedLessons: [
            'systems-programming/ownership-and-safe-concurrency/ownership-and-borrowing',
            'systems-programming/pointers-and-memory/memory-layout-of-a-process',
            'cpp-programming/value-semantics/move-semantics',
          ],
        },
        {
          slug: 'references-and-borrowing',
          title: 'References and borrowing',
          summary:
            'Lend a value without giving it away. Shared references allow many readers, mutable references allow one writer, never both at once, and a borrow lasts only until its last use.',
          estimatedMinutes: 85,
          objectives: [
            'Pass values by shared reference `&T` and mutable reference `&mut T`',
            'State the borrowing rule and explain which C bug each half of it prevents',
            'Read E0502 and E0499, and fix them by reordering or by shortening a borrow',
            'Explain non-lexical lifetimes: a borrow ends at its last use, not at the end of the scope',
          ],
          concepts: [
            'Borrowing: using a value through a reference',
            '`&T`: shared, read-only, any number',
            '`&mut T`: exclusive, read-write, exactly one',
            'Aliasing XOR mutation',
            'References are never null or dangling',
            'Dereferencing with `*`',
            'Non-lexical lifetimes (NLL)',
            'Auto-referencing in method calls',
          ],
          explanation: `A **reference** lets code use a value without owning it. \`&x\` creates a **shared reference**, through which you can read. \`&mut x\` creates a **mutable reference**, through which you can change the value, and it requires \`x\` itself to be \`mut\`. Creating a reference is called **borrowing**. The owner keeps ownership, and the value is not dropped when the reference goes away.

The whole system rests on one rule. At any point, a value may have **either any number of shared references or exactly one mutable reference**, never both. Think of it as "aliasing XOR mutation". Readers can share because nobody changes the data under them. A writer must be alone, so no reader ever sees a half-finished change, and nothing it does can invalidate another reference. Here is the bug that rule catches:

\`\`\`rust
fn main() {
    let mut scores = vec![10, 20, 30];
    let first = &scores[0];
    scores.push(40);
    println!("{first}");
}
\`\`\`

\`\`\`text
error[E0502]: cannot borrow \`scores\` as mutable because it is also borrowed as immutable
 --> src/main.rs:4:5
  |
3 |     let first = &scores[0];
  |                  ------ immutable borrow occurs here
4 |     scores.push(40);
  |     ^^^^^^^^^^^^^^^ mutable borrow occurs here
5 |     println!("{first}");
  |                ----- immutable borrow later used here
\`\`\`

\`push\` takes \`&mut self\`, and it may reallocate the buffer, which would leave \`first\` pointing at freed memory. In C this compiles and fails at random. The third label matters most: it says the shared borrow is still **live** at line 5. A borrow lasts from its creation to its **last use**, not to the end of the block. This is called non-lexical lifetimes. So moving the \`println!\` above the \`push\` fixes the program. Two \`&mut\` borrows that are live at once give **E0499**, and borrowing a non-\`mut\` binding mutably gives **E0596**.

In practice you pass references to functions:

\`\`\`rust
fn add_bonus(scores: &mut [u32], bonus: u32) {
    for s in scores.iter_mut() {
        *s += bonus;
    }
}

fn total(scores: &[u32]) -> u32 {
    let mut t = 0;
    for s in scores {
        t += s;
    }
    t
}

fn main() {
    let mut scores = vec![70, 85, 90];
    let first = &scores[0];
    println!("first = {first}");
    add_bonus(&mut scores, 5);
    println!("total = {}", total(&scores));
}
\`\`\`

\`\`\`text
first = 70
total = 260
\`\`\`

\`*s\` **dereferences** the reference to reach the \`u32\` it points to. Method calls add \`&\` and \`*\` automatically, so you write \`scores.len()\`, not \`(&scores).len()\`. A function signature says exactly what it will do with your data: \`&[u32]\` only reads, \`&mut [u32]\` may change elements but not the length, \`&mut Vec<u32>\` may also push and remove, and \`Vec<u32>\` takes the data away. Prefer the weakest one that works. Clippy warns when you ask for \`&mut Vec\` but only need a slice.

Read section 4.2 in the Brown edition. It models each variable as having read, write and own permissions that borrows temporarily remove, which is the most accurate simple picture of what the compiler checks.`,
          resources: [
            {
              title: 'The Rust Programming Language (Brown University interactive edition), 4.2: References and Borrowing',
              url: 'https://rust-book.cs.brown.edu/ch04-02-references-and-borrowing.html',
              type: 'interactive',
              cost: 'free',
              provider: 'Brown University',
              note: 'The permissions model (read, write, own) and many diagrams of borrows ending.',
              primary: true,
            },
            {
              title: 'Rust by Example: Borrowing',
              url: 'https://doc.rust-lang.org/rust-by-example/scope/borrow.html',
              type: 'interactive',
              cost: 'free',
              provider: 'Rust Project',
              note: 'Mutability, aliasing and the `ref` pattern.',
            },
            {
              title: 'Error code E0502',
              url: 'https://doc.rust-lang.org/error_codes/E0502.html',
              type: 'documentation',
              cost: 'free',
              provider: 'Rust Project',
              note: 'The most common borrow error, with the standard fixes.',
            },
          ],
          exercises: [
            {
              slug: 'permission-trace',
              title: 'Trace the permissions',
              prompt:
                'Write a 12-line `main` that creates a `Vec<i32>`, takes a shared reference to one element, prints it, takes a mutable reference to the vector, pushes through it, and prints the vector. Beside each line, write as a comment which of read, write and own the vector has at that point, in the style of the Brown edition. Then move the first `println!` below the push, predict the error code and its third label, and check.',
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'normalize-in-place',
              title: 'Normalise in place',
              prompt:
                'Write `fn largest_index(v: &[f64]) -> usize` and `fn normalize(v: &mut Vec<f64>)`, which divides every element by the sum so that it sums to 1. In `main`, find the index of the largest element of `vec![2.0, 6.0, 2.0]`, normalise the vector, and print the element at that index. Expected: 0.6. Then write a version of `main` that keeps a `&f64` to the largest element across the call to `normalize`. Record the error, and explain why holding an index is fine when holding a reference is not.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'two-writers',
              title: 'Two writers and a missing mut',
              prompt:
                'Produce E0499 with two live `&mut` borrows of one `String`, and E0596 by borrowing a non-`mut` binding mutably. For each, write the program, the headline and one sentence on the bug the rule prevents. Then show one program in which two `&mut` borrows of the same `String` exist one after the other and it compiles, and explain why.',
              kind: 'coding',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'State the borrowing rule, and name the class of bug each half of it prevents.',
              answerOutline:
                'Many shared references or one mutable reference. No mutation while shared means readers never see data change or freed under them, as with iterator invalidation. One writer means no two writers race or invalidate each other.',
            },
            {
              question: 'Why can `push` invalidate a reference to an element of a `Vec`?',
              answerOutline:
                'When the length reaches capacity, `push` allocates a bigger buffer, moves the elements and frees the old one, so the reference would dangle.',
            },
            {
              question: 'When does a borrow end?',
              answerOutline:
                'After the last use of the reference, or of anything derived from it, not at the closing brace. This is non-lexical lifetimes.',
            },
            {
              question: 'What does a parameter type of `&[u32]` promise the caller that `&mut Vec<u32>` does not?',
              answerOutline:
                'That the function only reads the elements. It cannot change, add or remove them.',
            },
          ],
          relatedLessons: [
            'systems-programming/ownership-and-safe-concurrency/ownership-and-borrowing',
            'cpp-programming/standard-library/containers-and-iterator-invalidation',
          ],
        },
        {
          slug: 'slices-string-and-str',
          title: 'Slices, String and str',
          summary:
            'Borrow part of an array, vector or string with a slice. Learn why text is `String` or `&str`, why you cannot index a string by number, and how to work with UTF-8 correctly.',
          estimatedMinutes: 80,
          objectives: [
            'Create slices of arrays, vectors and strings, and explain their representation',
            'Choose between `String` and `&str` for parameters, fields and return values',
            'Write functions that return slices of their input',
            'Explain why `s[0]` does not compile for strings, and use `chars`, `char_indices` and `bytes` instead',
            'Avoid the run-time panic of slicing a string inside a character',
          ],
          concepts: [
            'Slice `&[T]`: pointer and length',
            '`&str`: a slice of UTF-8 bytes',
            '`String` owns, `&str` borrows',
            'Deref coercion: `&String` to `&str`',
            'Range syntax `a..b`, `..b`, `a..`',
            'Byte offsets versus characters',
            '`chars`, `char_indices`, `bytes`',
            'Character boundaries',
          ],
          explanation: `A **slice** borrows a contiguous run of elements: \`&v[1..3]\` is a \`&[T]\` made of a pointer and a length, which is called a fat pointer. A **\`&str\`** is a slice of a string's bytes, guaranteed to be valid UTF-8. \`String\` owns its buffer and can grow. \`&str\` borrows text that lives somewhere else, whether in a \`String\`, in the program binary for a literal, or in a file you have read.

For parameters, take \`&str\`. A \`&String\` converts to \`&str\` automatically by **deref coercion**, so a \`&str\` parameter accepts both owned strings and literals. Return \`String\` when you build new text, and \`&str\` when you return part of the input:

\`\`\`rust
fn first_word(text: &str) -> &str {
    for (i, ch) in text.char_indices() {
        if ch == ' ' {
            return &text[..i];
        }
    }
    text
}

fn main() {
    let owned = String::from("naïve café");
    let word = first_word(&owned);
    println!("{word}: {} bytes, {} chars", word.len(), word.chars().count());
    let literal = first_word("hello world");
    println!("{literal}");
    let nums = [10, 20, 30, 40];
    let middle = &nums[1..3];
    println!("{middle:?}");
}
\`\`\`

\`\`\`text
naïve: 6 bytes, 5 chars
hello
[20, 30]
\`\`\`

The returned \`&str\` borrows from \`owned\`, so \`owned\` cannot be changed or dropped while \`word\` is in use. The compiler connects the two because a function with one reference parameter that returns a reference is assumed to return a borrow of that parameter. Module 4 makes that rule explicit as lifetime elision.

UTF-8 uses 1 to 4 bytes per character: \`ï\` is 2 bytes, which is why \`naïve\` has 6 bytes. \`len()\` counts bytes, and indexing a string by an integer is not allowed at all, because byte 3 might be half a character:

\`\`\`rust
fn main() {
    let s = String::from("hello");
    let c = s[0];
    println!("{c}");
}
\`\`\`

\`\`\`text
error[E0277]: the type \`str\` cannot be indexed by \`{integer}\`
 --> src/main.rs:3:15
  |
3 |     let c = s[0];
  |               ^ string indices are ranges of \`usize\`
  |
  = help: the trait \`SliceIndex<str>\` is not implemented for \`{integer}\`
  = note: you can use \`.chars().nth()\` or \`.bytes().nth()\`
\`\`\`

Range slicing is allowed, but it must fall on character boundaries. \`&"été"[0..1]\` compiles and then **panics** at run time with \`byte index 1 is not a char boundary\`. Safe ways to cut text use offsets that came from the string itself, such as those from \`char_indices\` or \`find\`. A \`char\` is not quite a user-perceived character either. \`"e\\u{301}"\` displays as é but is two \`char\`s. Grapheme clusters need the \`unicode-segmentation\` crate.

Read section 4.4 of the Brown edition and section 8.2 of the Book on strings.`,
          resources: [
            {
              title: 'The Rust Programming Language (Brown University interactive edition), 4.4: The Slice Type',
              url: 'https://rust-book.cs.brown.edu/ch04-04-slices.html',
              type: 'interactive',
              cost: 'free',
              provider: 'Brown University',
              note: 'Slices and string slices, with the `first_word` example drawn in memory.',
              primary: true,
            },
            {
              title: 'The Rust Programming Language, 8.2: Storing UTF-8 Encoded Text with Strings',
              url: 'https://doc.rust-lang.org/book/ch08-02-strings.html',
              type: 'textbook',
              cost: 'free',
              provider: 'Rust Project',
              note: 'Why strings cannot be indexed, and bytes, scalar values and grapheme clusters.',
            },
            {
              title: 'Primitive type str',
              url: 'https://doc.rust-lang.org/std/primitive.str.html',
              type: 'documentation',
              cost: 'free',
              provider: 'Rust Project',
              note: 'Skim the methods: `split_whitespace`, `find`, `char_indices`, `trim`, `strip_prefix` and `is_char_boundary`.',
            },
          ],
          exercises: [
            {
              slug: 'unicode-initials',
              title: 'Unicode-safe initials',
              prompt:
                'Write `fn initials(name: &str) -> String` that returns the uppercase first character of each whitespace-separated word. Expected: `"ada lovelace"` gives `"AL"`, `"  émile   zola "` gives `"ÉZ"`, and `""` gives `""`. Then write `fn truncate_chars(s: &str, max: usize) -> &str` that returns at most `max` characters as a slice of `s`, never panics, and never allocates. Test it on `"naïve"` with 3 (expected `"naï"`) and on `"🦀🦀🦀"` with 2.',
              kind: 'coding',
              difficulty: 2,
              hint: '`char::to_uppercase` returns several characters for some letters, so push them all. For `truncate_chars`, find the byte offset of the character at position `max` with `char_indices`.',
            },
            {
              slug: 'bytes-chars-graphemes',
              title: 'Bytes, chars and what you see',
              prompt:
                'For each of `"cafe"`, `"café"` written with U+00E9, `"cafe\\u{301}"` and `"🇨🇦"`, print `len()`, `chars().count()` and every `char` with its code point in hex. Explain why two strings that look identical have different lengths and compare unequal, and what that means for a search box. Show that `&s[0..1]` on `"é"` panics, and catch the problem in advance with `is_char_boundary`.',
              kind: 'coding',
              difficulty: 1,
            },
            {
              slug: 'choose-the-signature',
              title: 'Choose the signature',
              prompt:
                'For each function, choose parameter and return types from `String`, `&str`, `&mut String` and `&String`, and justify the choice in one line: (a) count the vowels in a text, (b) return the text with its first letter capitalised, (c) strip a `"> "` prefix from an email reply line, (d) append a signature to a draft message in place, (e) build a greeting from a name. Implement two of them and show that each accepts both a literal and a `String` where it should.',
              kind: 'writing',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What is the in-memory difference between `String` and `&str`?',
              answerOutline:
                '`String` is pointer, length and capacity, owning a heap buffer. `&str` is pointer and length, borrowing bytes owned elsewhere.',
            },
            {
              question: 'Why should a function that only reads text take `&str` rather than `&String`?',
              answerOutline:
                'It accepts literals, slices and `String`s through deref coercion, while `&String` accepts only `String`s, and it has one less level of indirection.',
            },
            {
              question: 'Why is `s[0]` rejected for a `String` while `&s[0..1]` compiles?',
              answerOutline:
                'An integer index would suggest a character but UTF-8 bytes do not map one to one to characters, so it is not offered. Range slicing is byte-based and checked at run time, panicking if a bound is not on a character boundary.',
            },
            {
              question: 'After `let w = first_word(&s);`, why can you not call `s.clear()` while `w` is still used?',
              answerOutline:
                '`w` borrows from `s`, so `s` is immutably borrowed until the last use of `w`, and `clear` needs a mutable borrow.',
            },
          ],
        },
        {
          slug: 'how-the-borrow-checker-reasons',
          title: 'How the borrow checker reasons',
          summary:
            'Loans, places and liveness: the model the compiler really uses. Read any borrow error as the same question with different actions, fix it by changing a live range, and know the cases where the checker is stricter than it needs to be.',
          estimatedMinutes: 90,
          objectives: [
            'Describe borrow checking in terms of loans, places and live ranges',
            'Classify E0499, E0502, E0505, E0506 and E0597 as conflicts between a live loan and an action',
            'Use the three labels of a borrow error to find the live range and choose a fix',
            'Explain two-phase borrows and disjoint field borrows',
            'Recognise the conditional return limitation and restructure code around it',
          ],
          concepts: [
            'Place: a variable, field, element or dereference',
            'Loan: created by `&` or `&mut`',
            'Live range: from creation to last use',
            'Conflicting actions: write, move, drop, borrow',
            'Function signatures as the only contract',
            'Two-phase borrows',
            'Disjoint borrows of fields',
            'Conditional return limitation (Polonius)',
          ],
          explanation: `The borrow checker does not run your program. It checks each function on its own, using only the **signatures** of the functions it calls, and it reasons about three things.

A **place** is something that holds a value, such as \`v\`, \`v.0\`, \`*r\` or \`v[i]\`. A **loan** is created whenever you write \`&place\` or \`&mut place\`. A loan is **live** from where it is created to the last point where the reference, or anything derived from it, may still be used. At every point in the function the checker asks one question: **does this action conflict with a loan that is live here?** Writing to, moving or dropping a place conflicts with any loan of it. A \`&mut\` borrow conflicts with any loan, and a shared borrow conflicts with a mutable loan. Each error code is that question with a different action:

| Code | Action that conflicts with a live loan |
|---|---|
| E0502 | a shared borrow and a mutable borrow overlap |
| E0499 | a second mutable borrow |
| E0505 | moving the value out |
| E0506 | assigning to it |
| E0597 | the value is dropped at the end of its scope |

Every such error has three labels: where the loan was created, the conflicting action, and **"borrow later used here"**, which proves the loan is still live. To fix it, end the loan before the action (reorder the code or drop a reference sooner), do not take the loan at all (copy the small value out, or hold an index instead of a reference), or change who owns the data.

The checker is more precise than "one borrow per variable":

\`\`\`rust
fn main() {
    let mut v = vec![1, 2];
    v.push(v.len());
    let mut pair = (String::from("left"), String::from("right"));
    let a = &mut pair.0;
    let b = &mut pair.1;
    a.push('!');
    b.push('?');
    println!("{v:?}");
    println!("{pair:?}");
}
\`\`\`

\`\`\`text
[1, 2, 2]
("left!", "right?")
\`\`\`

\`v.push(v.len())\` works through a **two-phase borrow**: the \`&mut v\` for \`push\` is reserved first, and only activated after the argument \`v.len()\` has been evaluated. \`pair.0\` and \`pair.1\` are **disjoint places**, so they can be borrowed mutably at the same time. A method that takes \`&mut self\` borrows the whole value, though, because its signature is all the caller sees.

The checker is also sometimes stricter than necessary. If a reference is returned on one path, its loan must last for the caller's whole borrow, and today's checker extends it over **every** path:

\`\`\`rust
fn long_or_push(v: &mut Vec<String>) -> &String {
    let first = &v[0];
    if first.len() > 3 {
        return first;
    }
    v.push(String::from("default"));
    &v[v.len() - 1]
}

fn main() {
    let mut v = vec![String::from("ab")];
    println!("{}", long_or_push(&mut v));
}
\`\`\`

\`\`\`text
error[E0502]: cannot borrow \`*v\` as mutable because it is also borrowed as immutable
 --> src/main.rs:6:5
  |
1 | fn long_or_push(v: &mut Vec<String>) -> &String {
  |                    - let's call the lifetime of this reference \`'1\`
2 |     let first = &v[0];
  |                  - immutable borrow occurs here
3 |     if first.len() > 3 {
4 |         return first;
  |                ----- returning this value requires that \`*v\` is borrowed for \`'1\`
5 |     }
6 |     v.push(String::from("default"));
  |     ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ mutable borrow occurs here
\`\`\`

The program is actually safe, and Polonius, the next-generation checker, accepts it. The fix is to test first and borrow only on the path that returns: \`if v[0].len() > 3 { return &v[0]; }\`. Read "problem case #3" in the NLL RFC for the background.`,
          resources: [
            {
              title: 'RFC 2094: Non-lexical lifetimes',
              url: 'https://rust-lang.github.io/rfcs/2094-nll.html',
              type: 'article',
              cost: 'free',
              provider: 'Rust Project',
              note: 'Read the motivation and the four "problem cases". Case #3 is the conditional return above.',
              primary: true,
            },
            {
              title: 'The Rust Programming Language (Brown University interactive edition), 4.3: Fixing Ownership Errors',
              url: 'https://rust-book.cs.brown.edu/ch04-03-fixing-ownership-errors.html',
              type: 'interactive',
              cost: 'free',
              provider: 'Brown University',
              note: 'A catalogue of unsafe programs the checker rejects and safe programs it rejects, with the fix for each.',
            },
            {
              title: 'Polonius',
              url: 'https://github.com/rust-lang/polonius',
              type: 'tool',
              cost: 'free',
              provider: 'Rust Project',
              note: 'The README explains the location-sensitive analysis that will accept problem case #3.',
            },
          ],
          exercises: [
            {
              slug: 'classify-five-errors',
              title: 'One question, five answers',
              prompt:
                'Write the smallest program you can that produces each of E0499, E0502, E0505, E0506 and E0597. For each, copy the three labels, name the place, the loan, the conflicting action and the use that keeps the loan live, and then fix it in two different ways: once by changing the order or scope, and once by changing what is borrowed or owned.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'get-or-insert',
              title: 'Get or insert',
              prompt:
                'Write `fn get_or_insert(names: &mut Vec<String>, wanted: String) -> &String`. It returns the existing element equal to `wanted`, or pushes `wanted` and returns a reference to it. With one reference parameter, the compiler knows the result borrows from `names`. First write it with a `for` loop that returns the matching reference directly, and record the error. Then rewrite it to find the index first, and borrow only at the end. Test that calling it twice with `"ada"` leaves the vector with length 1.',
              kind: 'coding',
              difficulty: 3,
              hint: 'The loop version is problem case #3. Loop with `for i in 0..names.len()` and compare `names[i] == wanted`, and return `&names[i]` only after the loop has decided.',
            },
            {
              slug: 'restructure-with-indices',
              title: 'Mark the longest line',
              prompt:
                'Write `fn mark_longest(lines: &mut Vec<String>)` that appends `" <-- longest"` to the longest line, with the first one winning a tie. Write it first by keeping a `&String` to the best line while looping, and record why the push cannot happen through it. Then write a correct version that stores an index. For `vec!["ab", "abcd", "abc"]`, expected: the second line becomes `"abcd <-- longest"`.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What does the "borrow later used here" label tell you, and why is it the key to a fix?',
              answerOutline:
                'It is the use that keeps the loan live across the conflicting action. If you move that use earlier, stop borrowing, or copy the value out, the loan ends and the conflict disappears.',
            },
            {
              question: 'Why can you borrow `pair.0` and `pair.1` mutably at once, but not call two `&mut self` methods on `pair` that are both live?',
              answerOutline:
                'Field borrows are disjoint places the checker can see. A method signature with `&mut self` borrows the whole value, and the checker does not look inside the method.',
            },
            {
              question: 'Why does `v.push(v.len())` compile even though `push` needs `&mut v`?',
              answerOutline:
                'Two-phase borrows: the mutable borrow is reserved, the arguments are evaluated with shared access, and then the borrow is activated for the call.',
            },
            {
              question: 'Is every program the borrow checker rejects actually unsafe?',
              answerOutline:
                'No. It is sound but conservative. Conditional returns of borrows (problem case #3) are safe and rejected today. Restructure, or wait for Polonius.',
            },
          ],
          relatedLessons: ['systems-programming/ownership-and-safe-concurrency/ownership-and-borrowing'],
        },
      ],
    },
    {
      slug: 'modelling-data',
      title: 'Modelling Data',
      description:
        'Describe your problem in types. Structs group data and carry methods, enums say that a value is exactly one of several things, pattern matching takes them apart, `Option` and `Result` replace null and exceptions, and modules and crates organise the code and enforce invariants through privacy.',
      lessons: [
        {
          slug: 'structs-and-methods',
          title: 'Structs, methods and newtypes',
          summary:
            'Define structs, give them methods with `&self`, `&mut self` or `self`, write constructors as associated functions, and use tuple-struct newtypes so that the compiler keeps units and IDs apart.',
          estimatedMinutes: 70,
          objectives: [
            'Define structs with named fields, tuple structs and unit structs',
            'Write methods and choose between `&self`, `&mut self` and `self` receivers',
            'Write associated functions such as `new`, and use `Self`',
            'Use newtypes to make mixing up units or IDs a compile error',
            'Derive `Debug`, `Clone` and `PartialEq` for printing, copying and comparing',
          ],
          concepts: [
            'Named-field, tuple and unit structs',
            '`impl` blocks',
            'Receivers: `&self`, `&mut self`, `self`',
            'Associated functions and `Self`',
            'Field init shorthand and struct update syntax',
            'Newtype pattern',
            '`#[derive(Debug, Clone, PartialEq)]`',
            'Consuming methods and `into_` names',
          ],
          explanation: `A **struct** groups named fields into one type, and an **\`impl\`** block gives it methods. The first parameter of a method, the **receiver**, says what the method does with the value, using exactly the ownership rules of module 2. \`&self\` only reads it, \`&mut self\` changes it, and \`self\` consumes it. A function in an \`impl\` with no receiver is an **associated function**, called with \`Type::name()\`. By convention \`new\` is the constructor, and \`Self\` means "the type this \`impl\` is for".

\`\`\`rust
#[derive(Debug, Clone, PartialEq)]
struct Account {
    owner: String,
    balance_cents: i64,
}

impl Account {
    fn new(owner: &str) -> Self {
        Self { owner: owner.to_string(), balance_cents: 0 }
    }

    fn deposit(&mut self, cents: i64) {
        self.balance_cents += cents;
    }

    fn balance(&self) -> f64 {
        self.balance_cents as f64 / 100.0
    }

    fn close(self) -> i64 {
        self.balance_cents
    }
}

#[derive(Debug, Clone, Copy, PartialEq)]
struct Meters(f64);

fn main() {
    let mut acct = Account::new("Ada");
    acct.deposit(1250);
    println!("{} has {:.2}", acct.owner, acct.balance());
    println!("{acct:?}");
    let refund = acct.close();
    println!("closed with {refund} cents");
    let height = Meters(1.82);
    println!("{height:?} is {} m", height.0);
}
\`\`\`

\`\`\`text
Ada has 12.50
Account { owner: "Ada", balance_cents: 1250 }
closed with 1250 cents
Meters(1.82) is 1.82 m
\`\`\`

\`close\` takes \`self\`, so after the call \`acct\` is gone. That is the point: a closed account cannot take deposits. Calling \`acct.deposit(500)\` afterwards fails with E0382, and the compiler adds a note saying that \`Account::close\` takes ownership of the receiver \`self\`, which moves \`acct\`. Consuming methods like this are how Rust expresses "this is the last thing you can do with it". Calling a \`&mut self\` method on a binding without \`mut\` gives E0596.

**Tuple structs** have unnamed fields, accessed as \`.0\` and \`.1\`. A one-field tuple struct is a **newtype**. \`Meters(f64)\` and \`Feet(f64)\` are both just an \`f64\` in memory, but a function that takes \`Meters\` will not accept \`Feet\`. The same trick keeps a \`UserId(u64)\` from being passed where an \`OrderId(u64)\` is expected. It costs nothing at run time.

\`#[derive(...)]\` asks the compiler to write standard implementations for you: \`Debug\` for \`{:?}\` printing, \`Clone\` for \`.clone()\`, \`Copy\` for plain data and \`PartialEq\` for \`==\`. Module 4 explains these traits properly. Two shortcuts are worth knowing. **Field init shorthand** writes \`Account { owner, balance_cents }\` when the variables have the same names as the fields. **Struct update syntax**, \`Account { owner: o, ..other }\`, takes the remaining fields from \`other\`, moving them if they are not \`Copy\`.

Read chapter 5 of the Book, and do the Rustlings \`structs\` exercises.`,
          resources: [
            {
              title: 'The Rust Programming Language, chapter 5: Using Structs',
              url: 'https://doc.rust-lang.org/book/ch05-00-structs.html',
              type: 'textbook',
              cost: 'free',
              provider: 'Rust Project',
              note: 'Defining structs, an example program, and method syntax.',
              primary: true,
            },
            {
              title: 'Rust by Example: Structures',
              url: 'https://doc.rust-lang.org/rust-by-example/custom_types/structs.html',
              type: 'interactive',
              cost: 'free',
              provider: 'Rust Project',
              note: 'All three kinds of struct, with destructuring.',
            },
            {
              title: 'Rust API Guidelines',
              url: 'https://rust-lang.github.io/api-guidelines/',
              type: 'documentation',
              cost: 'free',
              provider: 'Rust Project',
              note: 'Read "Naming" now: `new`, `as_`, `to_` and `into_` tell callers what a method costs and whether it consumes.',
            },
          ],
          exercises: [
            {
              slug: 'rectangles',
              title: 'Rectangles with tests',
              prompt:
                'Define `Point { x: i32, y: i32 }` and `Rect { origin: Point, w: u32, h: u32 }`. Implement `area(&self) -> u64`, `contains(&self, p: Point) -> bool` with the right and bottom edges excluded, `overlaps(&self, other: &Rect) -> bool` and `scale(&mut self, k: u32)`. Test that `Rect` at (0, 0) of size 4 x 3 has area 12, contains (3, 2) but not (4, 2), overlaps the 5 x 5 rectangle at (3, 2), and does not overlap the 2 x 2 one at (4, 0).',
              kind: 'coding',
              difficulty: 1,
              hint: 'Do the overlap test in `i64` so that `x + w` cannot overflow.',
            },
            {
              slug: 'unit-newtypes',
              title: 'Units the compiler checks',
              prompt:
                'Write `Celsius(f64)` and `Fahrenheit(f64)` newtypes with `to_fahrenheit(self)` and `to_celsius(self)`. Check that 100 C is 212 F and that -40 is the same in both. Write `fn oven_ok(t: Celsius) -> bool`, call it with a `Fahrenheit`, and record the error code and its message. Then explain in two sentences why this beats a function that takes a plain `f64` with a comment saying "in Celsius".',
              kind: 'coding',
              difficulty: 1,
            },
            {
              slug: 'consuming-builder',
              title: 'A consuming builder',
              prompt:
                'Write `RequestBuilder` with `new(url: &str)`, `header(self, name: &str, value: &str) -> Self`, `timeout_ms(self, ms: u64) -> Self` and `build(self) -> Request`, where `Request` holds the URL, a `Vec<(String, String)>` of headers and an optional timeout. Show that `RequestBuilder::new("https://example.com").header("Accept", "text/html").timeout_ms(500).build()` works as one expression. Explain why the methods take `self` rather than `&mut self`, and what the type system prevents after `build`.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'How do you choose between `&self`, `&mut self` and `self` for a method?',
              answerOutline:
                'Read only: `&self`. Change the value in place: `&mut self`. Consume it, turning it into something else or ending its use: `self`.',
            },
            {
              question: 'What is the run-time cost of the newtype `struct Meters(f64)`, and what does it buy?',
              answerOutline:
                'None, because it has the same layout as `f64`. It gives a distinct type, so units or IDs cannot be mixed up without an explicit conversion.',
            },
            {
              question: 'What is the difference between `Account::new("Ada")` and `acct.deposit(5)`?',
              answerOutline:
                'The first is an associated function with no receiver, called on the type. The second is a method, called on a value, which is auto-borrowed as `&mut acct`.',
            },
          ],
          relatedLessons: ['systems-programming/rust-fundamentals/enums-pattern-matching-and-error-handling'],
        },
        {
          slug: 'enums-and-pattern-matching',
          title: 'Enums, pattern matching and state machines',
          summary:
            'Enums whose variants carry data, exhaustive `match`, the full pattern language, `if let`, `let else` and 2024 `let` chains, and enums as state machines that make invalid states unrepresentable.',
          estimatedMinutes: 85,
          objectives: [
            'Define enums whose variants carry different data',
            'Write exhaustive `match` expressions with guards, bindings, ranges and nested patterns',
            'Use `if let`, `let else` and `let` chains where a full `match` is too much',
            'Model a process as an enum of states with transitions that consume the old state',
            'Explain how exhaustiveness checking helps when a new variant is added',
          ],
          concepts: [
            'Enum variants with data: a sum type',
            'Exhaustive `match`',
            'Patterns: literals, ranges, `|`, `_`, `..`',
            'Match guards `if cond`',
            '`@` bindings',
            '`if let` and `let else`',
            '`let` chains (2024 edition, Rust 1.88)',
            'Make invalid states unrepresentable',
          ],
          explanation: `A struct holds all of its fields at once. An **enum** holds exactly **one** of its variants, and each variant can carry its own data. A network connection is a good example. Writing \`struct Conn { connected: bool, session: Option<u64>, attempts: u32 }\` allows nonsense such as "not connected, but with a session". An enum allows only real states:

\`\`\`rust
enum Conn {
    Idle,
    Connecting { attempts: u32 },
    Connected { session: u64 },
    Failed(String),
}

enum Event {
    Dial,
    Accepted(u64),
    Timeout,
    Hangup,
}

fn step(state: Conn, event: Event) -> Conn {
    match (state, event) {
        (Conn::Idle, Event::Dial) => Conn::Connecting { attempts: 1 },
        (Conn::Connecting { .. }, Event::Accepted(session)) => Conn::Connected { session },
        (Conn::Connecting { attempts }, Event::Timeout) if attempts < 3 => {
            Conn::Connecting { attempts: attempts + 1 }
        }
        (Conn::Connecting { attempts }, Event::Timeout) => {
            Conn::Failed(format!("gave up after {attempts} attempts"))
        }
        (Conn::Connected { .. }, Event::Hangup) => Conn::Idle,
        (state, _) => state,
    }
}

fn describe(state: &Conn) -> String {
    match state {
        Conn::Idle => String::from("idle"),
        Conn::Connecting { attempts: 1 } => String::from("dialling"),
        Conn::Connecting { attempts: n @ 2..=3 } => format!("retry {n}"),
        Conn::Connecting { attempts } => format!("attempt {attempts}"),
        Conn::Connected { session } => format!("session {session}"),
        Conn::Failed(reason) => format!("failed: {reason}"),
    }
}

fn main() {
    let events = [Event::Dial, Event::Accepted(7), Event::Hangup, Event::Dial, Event::Timeout, Event::Timeout, Event::Timeout];
    let mut state = Conn::Idle;
    for event in events {
        state = step(state, event);
        println!("{}", describe(&state));
    }
    if let Conn::Failed(reason) = &state
        && reason.ends_with("3 attempts")
    {
        println!("giving up for good");
    }
}
\`\`\`

\`\`\`text
dialling
session 7
idle
dialling
retry 2
retry 3
failed: gave up after 3 attempts
giving up for good
\`\`\`

\`step\` takes the old state by value and returns the new one, so no code can keep using a stale state. Arms are tried from the top. \`if attempts < 3\` is a **guard**, \`n @ 2..=3\` binds a value while testing a range, \`..\` ignores the remaining fields, and \`(state, _)\` catches everything else, leaving the state unchanged. A \`match\` must be **exhaustive**. Delete the last arm of \`step\` and you get E0004, \`non-exhaustive patterns: (Conn::Failed(_), _) not covered\`, naming a combination you forgot. Add a variant to \`Conn\` later, and every \`match\` without a catch-all fails to compile until you decide what the new state means. This is the reason to avoid \`_\` arms on your own enums when you can.

For one pattern, \`if let Some(x) = opt { ... }\` is shorter than a \`match\`. \`let Some(x) = opt else { return; };\` binds the value or leaves the scope, so the main path stays unindented. In the 2024 edition, **\`let\` chains** join patterns and conditions with \`&&\`, as at the end of \`main\`. They need Rust 1.88. \`matches!(state, Conn::Idle)\` gives you a \`bool\`.

Read chapter 6 of the Book and chapter 19 on patterns.`,
          resources: [
            {
              title: 'The Rust Programming Language, chapter 6: Enums and Pattern Matching',
              url: 'https://doc.rust-lang.org/book/ch06-00-enums.html',
              type: 'textbook',
              cost: 'free',
              provider: 'Rust Project',
              note: 'Defining enums, `match`, and `if let` with `let else`.',
              primary: true,
            },
            {
              title: 'The Rust Programming Language, chapter 19: Patterns and Matching',
              url: 'https://doc.rust-lang.org/book/ch19-00-patterns.html',
              type: 'textbook',
              cost: 'free',
              provider: 'Rust Project',
              note: 'All the places patterns appear, refutability, and the full syntax with guards and `@` bindings.',
            },
            {
              title: 'Rust by Example: match',
              url: 'https://doc.rust-lang.org/rust-by-example/flow_control/match.html',
              type: 'interactive',
              cost: 'free',
              provider: 'Rust Project',
              note: 'Destructuring tuples, arrays, enums, pointers and structs, with guards and bindings.',
            },
          ],
          exercises: [
            {
              slug: 'vending-machine',
              title: 'A vending machine state machine',
              prompt:
                'Model a vending machine with states `Idle`, `Collecting { cents: u32 }`, `Vending { change: u32 }` and `OutOfStock`, and events `Coin(u32)`, `Select { price: u32 }`, `Cancel` and `Restock(u32)`. Keep the stock count in a separate struct field. Write `fn step(self, e: Event) -> Machine` with no catch-all arm for states, and test this sequence: with 1 item, coins 25, 25 and 50 then `Select { price: 75 }` vend with 25 change, and a following `Coin(10)` is refused because stock is now 0. Then add a `Maintenance` state and list every place the compiler made you change.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'pattern-drill',
              title: 'Pattern drill',
              prompt:
                'Write one `match` over a `(i32, i32)` point that prints `origin`, `on the x axis at X`, `on the y axis at Y`, `on the diagonal` (with a guard), `in the unit square` (with ranges `0..=1` on both) or `somewhere else`. Order the arms so that every message can be reached, and explain why `(0, 0)` must come first. Then rewrite one arm as a `let` chain inside an `if`.',
              kind: 'coding',
              difficulty: 1,
            },
            {
              slug: 'see-e0004',
              title: 'Let the compiler find the missing case',
              prompt:
                'In the connection example, add a `Suspended { session: u64 }` variant to `Conn` and an `Event::Resume`. Before writing any new arms, compile and copy the errors. Then remove the `(state, _) => state` arm from `step` and compile again, and copy the E0004 message and the pattern it names. Add arms until it compiles, and count how many it took. Decide, and justify in writing, whether a catch-all arm is a good idea in a state machine.',
              kind: 'writing',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why is an enum better than a struct of flags and optional fields for a connection state?',
              answerOutline:
                'Each variant carries only the data valid in that state, so contradictory combinations cannot be built, and `match` forces every state to be handled.',
            },
            {
              question: 'What does exhaustiveness checking buy you when you add a variant, and how does `_` weaken it?',
              answerOutline:
                'Every `match` that does not handle the new variant fails to compile, which points you at each place to update. A `_` arm silently absorbs the new variant.',
            },
            {
              question: 'When do you use `let else` instead of `if let`?',
              answerOutline:
                'When the non-matching case leaves the scope (return, break, continue or panic), so the matched bindings stay available for the rest of the function without indentation.',
            },
            {
              question: 'Why does `step` take `self` by value rather than `&mut self`?',
              answerOutline:
                'The transition builds a new state from the old one, moving data such as a session ID out of it, and no stale reference to the old state can survive.',
            },
          ],
          relatedLessons: ['systems-programming/rust-fundamentals/enums-pattern-matching-and-error-handling'],
        },
        {
          slug: 'option-result-and-errors',
          title: 'Option, Result and the ? operator',
          summary:
            'Absence is `Option`, failure is `Result`, and `?` passes failures up to the caller. Write your own error enum, convert between error types, and decide when a panic is the right answer.',
          estimatedMinutes: 85,
          objectives: [
            'Use `Option<T>` instead of null and `Result<T, E>` instead of exceptions',
            'Propagate errors with `?`, and explain what it expands to',
            'Define an error enum and convert library errors into it with `map_err`',
            'Use the common combinators on `Option` and `Result`',
            'Decide between returning an error and panicking',
          ],
          concepts: [
            '`Option<T>`: `Some(T)` or `None`',
            '`Result<T, E>`: `Ok(T)` or `Err(E)`',
            '`?`: return early on `Err` or `None`',
            'Error enums',
            '`map_err` with a variant as a function',
            '`ok_or`, `unwrap_or`, `ok`, `and_then`',
            '`main` returning `Result`',
            'Panics are for bugs',
          ],
          explanation: `Rust has no null and no exceptions. A value that may be missing has type **\`Option<T>\`**, which is \`Some(value)\` or \`None\`. An operation that may fail returns **\`Result<T, E>\`**, which is \`Ok(value)\` or \`Err(error)\`. Both are ordinary enums like those in the previous lesson, so the compiler will not let you use the value until you have dealt with the other case.

The **\`?\` operator** keeps this from becoming nested \`match\` code. \`expr?\` means: if \`expr\` is \`Err(e)\`, return \`Err(e)\` from this function now, and otherwise unwrap the \`Ok\` value. On an \`Option\`, it returns \`None\`. The function using it must itself return a \`Result\` or an \`Option\`:

\`\`\`rust
use std::num::ParseIntError;

#[derive(Debug)]
enum ParseError {
    MissingEquals(String),
    BadNumber(ParseIntError),
}

fn parse_setting(line: &str) -> Result<(String, u32), ParseError> {
    let Some((key, value)) = line.split_once('=') else {
        return Err(ParseError::MissingEquals(line.to_string()));
    };
    let number = value.trim().parse::<u32>().map_err(ParseError::BadNumber)?;
    Ok((key.trim().to_string(), number))
}

fn main() {
    for line in ["workers = 8", "timeout", "retries = -1"] {
        match parse_setting(line) {
            Ok((key, n)) => println!("{key} -> {n}"),
            Err(ParseError::MissingEquals(l)) => println!("no '=' in {l:?}"),
            Err(ParseError::BadNumber(e)) => println!("bad number: {e}"),
        }
    }
    let port: Option<u16> = "80a".parse().ok();
    println!("{}", port.unwrap_or(8080));
}
\`\`\`

\`\`\`text
workers -> 8
no '=' in "timeout"
bad number: invalid digit found in string
8080
\`\`\`

\`map_err(ParseError::BadNumber)\` converts the library's \`ParseIntError\` into your own error type. A tuple variant is also a function, so you can pass it by name. Your error enum documents every way the function can fail, and callers can \`match\` on it. Module 4 adds the \`From\` trait, which lets \`?\` do this conversion automatically.

Using \`?\` in a function that returns \`()\` is a type error:

\`\`\`rust
fn main() {
    let n: i32 = "42".parse()?;
    println!("{n}");
}
\`\`\`

\`\`\`text
error[E0277]: the \`?\` operator can only be used in a function that returns \`Result\` or \`Option\` (or another type that implements \`FromResidual\`)
 --> src/main.rs:2:30
  |
1 | fn main() {
  | --------- this function should return \`Result\` or \`Option\` to accept \`?\`
2 |     let n: i32 = "42".parse()?;
  |                              ^ cannot use the \`?\` operator in a function that returns \`()\`
\`\`\`

The fix is \`fn main() -> Result<(), ParseIntError>\` with \`Ok(())\` at the end. If \`main\` returns an \`Err\`, the program prints it with \`Debug\` and exits with code 1.

**Panic or error?** Return a \`Result\` for anything that can go wrong in correct code, such as bad input, missing files or network failures. Panic, with \`unwrap\`, \`expect\` or \`assert!\`, only when a broken assumption means your program has a bug. When you do use \`expect\`, write the assumption in the message: \`.expect("regex literal is valid")\`.

Read chapter 9 of the Book, then skim the method lists for \`Option\` and \`Result\`.`,
          resources: [
            {
              title: 'The Rust Programming Language, chapter 9: Error Handling',
              url: 'https://doc.rust-lang.org/book/ch09-00-error-handling.html',
              type: 'textbook',
              cost: 'free',
              provider: 'Rust Project',
              note: 'Unrecoverable errors, `Result` and `?`, and the section "To panic! or Not to panic!".',
              primary: true,
            },
            {
              title: 'Module std::result',
              url: 'https://doc.rust-lang.org/std/result/index.html',
              type: 'documentation',
              cost: 'free',
              provider: 'Rust Project',
              note: 'The method overview tables: querying, extracting, transforming and combining.',
            },
            {
              title: 'Rust by Example: Error handling',
              url: 'https://doc.rust-lang.org/rust-by-example/error.html',
              type: 'interactive',
              cost: 'free',
              provider: 'Rust Project',
              note: 'From `panic` to custom error types, with multiple error types in one function.',
            },
          ],
          exercises: [
            {
              slug: 'duration-parser',
              title: 'Parse a duration',
              prompt:
                'Write `fn parse_duration(s: &str) -> Result<u64, DurationError>` returning milliseconds for inputs like `"1h30m"`, `"45s"`, `"250ms"` and `"2m5s"`. Units are `h`, `m`, `s` and `ms`, each at most once and in decreasing order. Define `DurationError` with variants `Empty`, `BadNumber(ParseIntError)`, `UnknownUnit(String)`, `OutOfOrder` and `Overflow`. Expected: `"1h30m"` gives 5,400,000, `"2m5s"` gives 125,000, `"5x"` gives `UnknownUnit("x")`, `"30s1m"` gives `OutOfOrder`, and `"99999999999999h"` gives `Overflow`. Use `?` and `checked_mul`.',
              kind: 'coding',
              difficulty: 2,
              hint: 'Scan with `char_indices` to split digits from the unit that follows. `checked_mul(...).ok_or(DurationError::Overflow)?` turns an overflow into your error.',
            },
            {
              slug: 'option-chains',
              title: 'Option without match',
              prompt:
                'Write `fn middle_initial(full_name: &str) -> Option<char>` returning the first character of the second of three or more words, using `split_whitespace`, `nth`, `chars().next()` and `?` on `Option`, with no `match` or `if`. Test `"John Ronald Tolkien"` (`Some(\'R\')`), `"Ada Lovelace"` (`None`) and `""` (`None`). Then write the same function with an explicit `match` and compare the two for readability.',
              kind: 'coding',
              difficulty: 1,
            },
            {
              slug: 'panic-or-result',
              title: 'Panic or Result?',
              prompt:
                'For each case, decide whether to return an error or panic, and give a one-line reason: (a) a configuration file is missing, (b) an index computed by your own binary search is out of bounds, (c) a user types a negative age, (d) a regular expression literal in your source fails to compile, (e) a network request times out, (f) a function documented as "the slice must be sorted" receives an unsorted slice. Then rewrite one panicking function from an earlier exercise to return a `Result` and update its callers.',
              kind: 'writing',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'What does `let x = f()?;` expand to when `f` returns `Result<T, E>`?',
              answerOutline:
                'A match: on `Ok(v)`, `x` is `v`. On `Err(e)`, the function returns `Err(From::from(e))` immediately. The conversion step is explained in module 4.',
            },
            {
              question: 'Why is `map_err(ParseError::BadNumber)` valid without a closure?',
              answerOutline:
                'A tuple variant constructor is a function from its field types to the enum, here `fn(ParseIntError) -> ParseError`, so it can be passed as a value.',
            },
            {
              question: 'When is `unwrap` acceptable in production code?',
              answerOutline:
                'When failure would mean a bug in your own code, an invariant you have established, and preferably as `expect` with the invariant written in the message.',
            },
            {
              question: 'How does a caller benefit from an error enum compared with a `String` error?',
              answerOutline:
                'It can match on the variant to recover differently, the set of failures is documented in the type, and the original source error is kept.',
            },
          ],
        },
        {
          slug: 'modules-crates-and-cargo',
          title: 'Modules, visibility, crates and dependencies',
          summary:
            'Organise code into modules and files, use privacy to protect invariants, split a package into a library and a binary, and add dependencies from crates.io with Cargo and semantic versioning.',
          estimatedMinutes: 75,
          objectives: [
            'Build a module tree across files and refer to items with paths and `use`',
            'Use privacy, including private fields, so that only validated values can be constructed',
            'Split a package into a library crate and a binary crate',
            'Add, update and audit dependencies, and explain semver requirements and `Cargo.lock`',
            'Set up a workspace with several crates',
          ],
          concepts: [
            'Package, crate, module',
            '`mod`, `pub`, `pub(crate)`, `use`',
            'Paths: `crate::`, `super::`, `self::`',
            'Private by default, including fields',
            '`src/lib.rs` and `src/main.rs`',
            'Semver requirements: `"1.2"` means at least 1.2.0 and below 2.0.0',
            '`Cargo.lock` and `cargo update`',
            'Features and dev-dependencies',
            'Workspaces',
          ],
          explanation: `A **package** is what \`cargo new\` creates. It contains one or more **crates**, which are units of compilation: \`src/main.rs\` is the root of a binary crate and \`src/lib.rs\` the root of a library crate with the same name. Inside a crate, code lives in a tree of **modules**. \`mod parser;\` in \`lib.rs\` loads \`src/parser.rs\`, and inside it \`mod lexer;\` loads \`src/parser/lexer.rs\`. A typical layout is:

\`\`\`text
wordtool/
├── Cargo.toml
├── src/
│   ├── lib.rs        // pub mod parser; pub mod report;
│   ├── parser.rs     // mod lexer; pub fn parse(...)
│   ├── parser/
│   │   └── lexer.rs
│   ├── report.rs
│   └── main.rs       // use wordtool::parser; a thin command-line wrapper
└── tests/
    └── end_to_end.rs
\`\`\`

Everything is **private** to its module unless marked \`pub\`, and so are the **fields** of a \`pub struct\`. That is how Rust protects invariants. If the only way to make a value is a constructor that checks it, every value of that type is valid:

\`\`\`rust
mod grading {
    pub struct Percent(u8);

    impl Percent {
        pub fn new(value: u8) -> Option<Percent> {
            if value <= 100 { Some(Percent(value)) } else { None }
        }

        pub fn get(&self) -> u8 {
            self.0
        }
    }

    pub fn letter(p: &Percent) -> char {
        match p.get() {
            90..=100 => 'A',
            80..=89 => 'B',
            70..=79 => 'C',
            _ => 'F',
        }
    }
}

use grading::{Percent, letter};

fn main() {
    let score = Percent::new(87).expect("87 is a valid percentage");
    println!("{} -> {}", score.get(), letter(&score));
    println!("{}", Percent::new(150).is_none());
}
\`\`\`

\`\`\`text
87 -> B
true
\`\`\`

Outside \`grading\`, writing \`grading::Percent(150)\` fails with **E0603**, "tuple struct constructor \`Percent\` is private", so there is no way to build an invalid \`Percent\`. Use \`pub(crate)\` for items shared inside your crate but not exported, \`pub use\` to re-export an item at a nicer path, and \`super::\` to refer to the parent module.

Put the logic in the library and keep \`main.rs\` thin. Integration tests in \`tests/\` and other programs can then use it. **Dependencies** go in \`Cargo.toml\`. \`cargo add serde --features derive\` writes a line such as \`serde = { version = "1.0.228", features = ["derive"] }\`, with the newest version at the time. Version requirements are **semver ranges**. \`"1.0.228"\` means "at least 1.0.228 and below 2.0.0", because a 1.x release promises not to break 1.x users. **\`Cargo.lock\`** records the exact versions chosen, so commit it, and \`cargo update\` moves to newer compatible versions. **Features** turn optional parts of a crate on, and \`[dev-dependencies]\` are only for tests and benchmarks. A **workspace** is a folder with a \`Cargo.toml\` that lists member crates, which then share one \`target/\` directory and one lock file.

Read chapter 7 of the Book and the Cargo book sections on dependencies and workspaces.`,
          resources: [
            {
              title: 'The Rust Programming Language, chapter 7: Packages, Crates and Modules',
              url: 'https://doc.rust-lang.org/book/ch07-00-managing-growing-projects-with-packages-crates-and-modules.html',
              type: 'textbook',
              cost: 'free',
              provider: 'Rust Project',
              note: 'Module trees, paths, `use`, and splitting modules into files.',
              primary: true,
            },
            {
              title: 'The Cargo Book: Specifying Dependencies',
              url: 'https://doc.rust-lang.org/cargo/reference/specifying-dependencies.html',
              type: 'documentation',
              cost: 'free',
              provider: 'Rust Project',
              note: 'Caret, tilde and wildcard requirements, git and path dependencies, and platform-specific dependencies.',
            },
            {
              title: 'The Cargo Book: Workspaces',
              url: 'https://doc.rust-lang.org/cargo/reference/workspaces.html',
              type: 'documentation',
              cost: 'free',
              provider: 'Rust Project',
              note: 'Members, shared dependencies with `workspace = true`, and the virtual manifest.',
            },
          ],
          exercises: [
            {
              slug: 'split-into-lib',
              title: 'Split a program into a library and a binary',
              prompt:
                'Take your Roman numeral code from module 1 and turn it into a package with `src/lib.rs` exposing `pub fn to_roman(n: u32) -> Option<String>` and `pub fn from_roman(s: &str) -> Option<u32>`, implemented in a private `tables` module, and a `src/main.rs` that converts its command-line arguments in either direction. Add `tests/round_trip.rs` checking that `from_roman(&to_roman(n)?)` equals `n` for every `n` from 1 to 3999. Show that `main.rs` cannot reach the `tables` module.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'validated-types',
              title: 'Types that cannot be invalid',
              prompt:
                'In a module `email`, define `pub struct Email(String)` with a private field and `pub fn parse(s: &str) -> Result<Email, EmailError>` that requires exactly one `@`, a non-empty local part and a domain containing a dot. Add `pub fn domain(&self) -> &str`. From outside the module, show that `Email(String::from("x"))` fails with E0603, and explain why every function that takes an `Email` can now skip validation.',
              kind: 'coding',
              difficulty: 1,
            },
            {
              slug: 'dependency-audit',
              title: 'Add and inspect a dependency',
              prompt:
                'Add `rand` with `cargo add rand`, and use it to shuffle a vector. Then run `cargo tree` and count the crates it pulled in, read the resolved versions in `Cargo.lock`, and explain what `cargo update` would and would not change, given the version requirement in `Cargo.toml`. Finally put the crate into a two-member workspace with a second library crate it depends on through a `path` dependency, and build both with one `cargo build`.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What is the difference between a package, a crate and a module?',
              answerOutline:
                'A package is a Cargo project with a manifest. A crate is one compilation unit, a library or a binary, of which a package can have several. A module is a namespace inside a crate.',
            },
            {
              question: 'How do private fields help guarantee that every value of a type is valid?',
              answerOutline:
                'Outside code cannot construct the type or change the field directly, so it must go through constructors and methods that check the invariant.',
            },
            {
              question: 'Your manifest says `regex = "1.10"`. Which versions can Cargo pick, and which does it actually use?',
              answerOutline:
                'Any 1.x version at or above 1.10.0. It uses the one recorded in `Cargo.lock`, which changes only on `cargo update` or a change to the requirement.',
            },
          ],
          relatedLessons: ['software-engineering/build-ci-cd-and-deployment/packaging-and-dependencies'],
        },
      ],
    },
    {
      slug: 'generics-traits-lifetimes',
      title: 'Generics, Traits and Lifetimes',
      description:
        'Write code once for many types. Generics with trait bounds give static dispatch with no run-time cost, trait objects give dynamic dispatch when types vary at run time, lifetime annotations describe how references relate, and the standard traits connect your types to the rest of the language.',
      lessons: [
        {
          slug: 'generic-functions-and-types',
          title: 'Generic functions and types',
          summary:
            'Type parameters on functions, structs, enums and `impl` blocks, why they need bounds, const generics for array sizes, and monomorphization, which makes generic code as fast as hand-written code.',
          estimatedMinutes: 70,
          objectives: [
            'Write generic functions and generic structs with `impl<T>` blocks',
            'Read E0369 and add the trait bound the compiler asks for',
            'Write an `impl` for one concrete type of a generic struct',
            'Use const generics for array lengths',
            'Explain monomorphization and its trade-off between speed and code size',
          ],
          concepts: [
            'Type parameters `<T>`',
            'Trait bounds `T: PartialOrd`',
            '`impl<T> Stack<T>` and `impl Stack<f64>`',
            'Turbofish `::<T>`',
            'Const generics `const N: usize`',
            'Monomorphization',
            '`Option<T>` and `Vec<T>` are generic types',
          ],
          explanation: `A **generic** function works for many types. Its type parameters are listed in angle brackets. The compiler checks the body **once**, against only what the signature promises about \`T\`, which is different from C++ templates, which are checked at each use. So this fails:

\`\`\`rust
fn largest<T>(items: &[T]) -> &T {
    let mut best = &items[0];
    for item in items {
        if item > best {
            best = item;
        }
    }
    best
}

fn main() {
    println!("{}", largest(&[3, 9, 2]));
}
\`\`\`

\`\`\`text
error[E0369]: binary operation \`>\` cannot be applied to type \`&T\`
 --> src/main.rs:4:17
  |
4 |         if item > best {
  |            ---- ^ ---- &T
  |            |
  |            &T
  |
help: consider restricting type parameter \`T\` with trait \`PartialOrd\`
  |
1 | fn largest<T: std::cmp::PartialOrd>(items: &[T]) -> &T {
  |             ++++++++++++++++++++++
\`\`\`

\`T\` could be any type, and not every type can be compared. A **trait bound** such as \`T: PartialOrd\` restricts \`T\` to types that support \`<\` and \`>\`, and in return the body may use them. The next lesson is about traits. For now, read a bound as "\`T\` can do this".

Structs, enums and \`impl\` blocks take type parameters too. \`Option<T>\` and \`Vec<T>\` are ordinary generic types from the standard library:

\`\`\`rust
fn largest<T: PartialOrd>(items: &[T]) -> &T {
    let mut best = &items[0];
    for item in items {
        if item > best {
            best = item;
        }
    }
    best
}

struct Stack<T> {
    items: Vec<T>,
}

impl<T> Stack<T> {
    fn push(&mut self, item: T) {
        self.items.push(item);
    }

    fn pop(&mut self) -> Option<T> {
        self.items.pop()
    }
}

impl Stack<f64> {
    fn total(&self) -> f64 {
        let mut sum = 0.0;
        for x in &self.items {
            sum += x;
        }
        sum
    }
}

fn ends<T: Copy, const N: usize>(arr: [T; N]) -> (T, T) {
    (arr[0], arr[N - 1])
}

fn main() {
    println!("{}", largest(&[3, 9, 2]));
    println!("{}", largest(&["pear", "apple", "zucchini"]));
    let mut s = Stack { items: Vec::new() };
    s.push(1.5);
    s.push(2.25);
    println!("total {}", s.total());
    println!("{:?}", s.pop());
    println!("{:?}", ends([7, 8, 9, 10]));
}
\`\`\`

\`\`\`text
9
zucchini
total 3.75
Some(2.25)
(7, 10)
\`\`\`

\`impl<T> Stack<T>\` gives methods to every stack, while \`impl Stack<f64>\` adds \`total\` only to stacks of \`f64\`. \`const N: usize\` is a **const generic**: the array length is part of the type, and the function works for any length. When inference cannot work out a type, give it with the **turbofish**, as in \`"7".parse::<u8>()\` or \`Vec::<i32>::with_capacity(10)\`.

The compiler **monomorphizes** generic code. It generates a separate copy of \`largest\` for \`i32\` and for \`&str\`, each optimised as if you had written it by hand. Generics therefore cost nothing at run time, but they can increase compile time and binary size when there are many instantiations. Trait objects, two lessons on, make the opposite trade.

Read chapter 10.1 of the Book.`,
          resources: [
            {
              title: 'The Rust Programming Language, 10.1: Generic Data Types',
              url: 'https://doc.rust-lang.org/book/ch10-00-generics.html',
              type: 'textbook',
              cost: 'free',
              provider: 'Rust Project',
              note: 'Start at the chapter introduction, which removes duplication step by step, then read 10.1.',
              primary: true,
            },
            {
              title: 'Rust by Example: Generics',
              url: 'https://doc.rust-lang.org/rust-by-example/generics.html',
              type: 'interactive',
              cost: 'free',
              provider: 'Rust Project',
              note: 'Generic functions, implementations, bounds, `where` clauses and the newtype idiom.',
            },
          ],
          exercises: [
            {
              slug: 'ring-buffer',
              title: 'A generic ring buffer',
              prompt:
                'Write `RingBuffer<T, const N: usize>` holding at most `N` items in a `[Option<T>; N]`, with `push(&mut self, x: T) -> Option<T>` that returns the overwritten oldest item when full, `pop_oldest(&mut self) -> Option<T>`, `len` and `is_empty`. Test with `N = 3`: pushing 1, 2, 3 and 4 returns `Some(1)` on the fourth push, and then popping gives 2, 3, 4 and `None`. Make it work for `String` as well as `i32`, and explain why `[None; N]` does not compile for `Option<String>` and what to use instead.',
              kind: 'coding',
              difficulty: 2,
              hint: '`[None; N]` requires the element type to be `Copy` or a constant. `std::array::from_fn(|_| None)` builds the array for any `T`.',
            },
            {
              slug: 'bounds-from-errors',
              title: 'Let the compiler write the bounds',
              prompt:
                'Write `fn dedup_sorted<T>(v: &mut Vec<T>)` that sorts a vector and removes duplicates, and `fn count_above<T>(v: &[T], limit: T) -> usize`, both with no bounds. Compile, and add exactly the bounds each error asks for. Record which bounds you needed (for example `Ord`, `PartialOrd` or `Copy`), and explain why `f64` does not satisfy `dedup_sorted` while it does satisfy `count_above`.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'measure-monomorphization',
              title: 'See monomorphization',
              prompt:
                'Paste `largest` into Compiler Explorer (godbolt.org) with `rustc -O` and call it with `i32`, `f64` and `&str` from three public functions. Find the three separate copies in the assembly, note the mangled names, and compare their lengths. Write two sentences on what this means for binary size when a generic function is used with 50 types.',
              kind: 'reading',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does Rust reject `item > best` for an unbounded `T`, when C++ would accept the template?',
              answerOutline:
                'Rust type-checks a generic body once, against its declared bounds. Without `PartialOrd` nothing says `T` supports comparison. C++ checks each instantiation separately.',
            },
            {
              question: 'What is the difference between `impl<T> Stack<T>` and `impl Stack<f64>`?',
              answerOutline:
                'The first adds methods for every `T`. The second adds methods only to the concrete type `Stack<f64>`.',
            },
            {
              question: 'What does monomorphization cost and what does it buy?',
              answerOutline:
                'It buys static dispatch and inlining with no run-time overhead. It costs compile time and code size, since there is one copy per type used.',
            },
          ],
          relatedLessons: ['cpp-programming/templates-and-concepts/function-and-class-templates'],
        },
        {
          slug: 'traits-and-trait-bounds',
          title: 'Traits and trait bounds',
          summary:
            'Define shared behaviour with traits, give methods default bodies, implement traits for your types and for built-in ones, and constrain generics with bounds, `impl Trait` and `where` clauses. Learn the orphan rule and associated types.',
          estimatedMinutes: 85,
          objectives: [
            'Define a trait with required and default methods, and implement it for several types',
            'Write bounds with `impl Trait` arguments, `T: Trait` and `where` clauses, and return `impl Trait`',
            'Explain the orphan rule and work around it with a newtype',
            'Use associated types, and explain when they are better than a type parameter',
            'Write a blanket implementation and a supertrait',
          ],
          concepts: [
            'Trait: a named set of methods',
            'Required and default methods',
            '`impl Trait for Type`',
            '`&impl Trait` arguments and `-> impl Trait`',
            '`where` clauses',
            'Orphan rule (coherence)',
            'Associated types',
            'Blanket implementations',
            'Supertraits',
          ],
          explanation: `A **trait** names a set of methods that types can provide, like an interface in Java or a protocol in Python's typing, with two differences. You can implement a trait for a type **after** both are defined, including for types you did not write, and calls are normally resolved at compile time.

\`\`\`rust
trait Distance {
    fn meters(&self) -> f64;

    fn describe(&self) -> String {
        format!("{:.1} m", self.meters())
    }
}

struct Feet(f64);
struct Miles(f64);

impl Distance for Feet {
    fn meters(&self) -> f64 {
        self.0 * 0.3048
    }
}

impl Distance for Miles {
    fn meters(&self) -> f64 {
        self.0 * 1609.344
    }

    fn describe(&self) -> String {
        format!("{:.3} km", self.meters() / 1000.0)
    }
}

impl Distance for f64 {
    fn meters(&self) -> f64 {
        *self
    }
}

fn total<D: Distance>(legs: &[D]) -> f64 {
    let mut sum = 0.0;
    for leg in legs {
        sum += leg.meters();
    }
    sum
}

fn farther(a: &impl Distance, b: &impl Distance) -> String {
    if a.meters() >= b.meters() { a.describe() } else { b.describe() }
}

fn main() {
    println!("{}", Feet(1000.0).describe());
    println!("{}", Miles(26.2).describe());
    println!("{:.1}", total(&[Feet(3.0), Feet(7.0)]));
    println!("{}", farther(&Miles(1.0), &1500.0));
}
\`\`\`

\`\`\`text
304.8 m
42.165 km
3.0
1.609 km
\`\`\`

\`meters\` is **required**, and \`describe\` has a **default** that \`Miles\` overrides. \`impl Distance for f64\` adds your trait to a built-in type. \`total\` uses a named type parameter, so every element of the slice has the same type. In \`farther\`, each \`&impl Distance\` argument is its own anonymous type parameter, so \`a\` and \`b\` may differ. Long bounds read better in a \`where\` clause, such as \`where T: Distance + Clone\`. Returning \`-> impl Trait\` hides a concrete type behind a trait. It is one type chosen by the function, not a choice made by the caller.

You may implement a trait for a type only if the trait or the type is defined in your crate. This is the **orphan rule**, and it guarantees that two crates can never provide conflicting implementations:

\`\`\`rust
use std::fmt;

struct Feet(f64);

impl fmt::Display for Vec<Feet> {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "{} legs", self.len())
    }
}

fn main() {}
\`\`\`

\`\`\`text
error[E0117]: only traits defined in the current crate can be implemented for types defined outside of the crate
 --> src/main.rs:5:1
  |
5 | impl fmt::Display for Vec<Feet> {
  | ^^^^^^^^^^^^^^^^^^^^^^---------
  |                       |
  |                       \`Vec\` is not defined in the current crate
\`\`\`

\`Vec<Feet>\` is still a foreign type even though \`Feet\` is yours. The fix is a newtype, \`struct Route(Vec<Feet>)\`, which you own.

A trait can declare an **associated type** that each implementation fixes. \`Iterator\` has \`type Item\`, because a given iterator yields exactly one type of item, which a type parameter would not express. A **blanket implementation** such as \`impl<T: Display> MyTrait for T\` covers every type that meets a bound. A **supertrait**, \`trait Report: Display\`, requires implementors to provide another trait first.

Read chapter 10.2 of the Book and the section on advanced traits in chapter 20.`,
          resources: [
            {
              title: 'The Rust Programming Language, 10.2: Traits: Defining Shared Behavior',
              url: 'https://doc.rust-lang.org/book/ch10-02-traits.html',
              type: 'textbook',
              cost: 'free',
              provider: 'Rust Project',
              note: 'Defining and implementing traits, default implementations, traits as parameters, and returning `impl Trait`.',
              primary: true,
            },
            {
              title: 'The Rust Programming Language, 20.2: Advanced Traits',
              url: 'https://doc.rust-lang.org/book/ch20-02-advanced-traits.html',
              type: 'textbook',
              cost: 'free',
              provider: 'Rust Project',
              note: 'Associated types, operator overloading, supertraits and the newtype pattern for the orphan rule.',
            },
            {
              title: 'Rust by Example: Traits',
              url: 'https://doc.rust-lang.org/rust-by-example/trait.html',
              type: 'interactive',
              cost: 'free',
              provider: 'Rust Project',
              note: 'Derive, `impl Trait`, operator overloading, `Drop` and iterators as traits.',
            },
          ],
          exercises: [
            {
              slug: 'scoring-trait',
              title: 'Pluggable scoring rules',
              prompt:
                'Define `trait Scorer { fn score(&self, word: &str) -> u32; fn name(&self) -> String { String::from("scorer") } }`. Implement it for `Length` (one point per `char`), `Scrabble` (standard English letter values: E is 1, Q and Z are 10, and so on) and `Vowels`. Write `fn best<\'a>(words: &[&\'a str], s: &impl Scorer) -> Option<&\'a str>`. Expected: with `Scrabble`, `["quiz", "banana", "rhythm"]` gives `"quiz"` (22 points). Then write `fn compare(a: &impl Scorer, b: &impl Scorer, word: &str) -> String` naming the higher scorer.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'orphan-newtype',
              title: 'Get around the orphan rule',
              prompt:
                'Try to implement `std::fmt::Display` for `Vec<f64>` so that it prints `[1.00, 2.50]`, and record E0117. Then write `struct Readings(Vec<f64>)` with `Display`, and implement `std::ops::Deref<Target = [f64]>` so that `readings.len()` and `readings.iter()` work. Explain why the standard library cannot allow the first version.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'associated-vs-generic',
              title: 'Associated type or type parameter?',
              prompt:
                'Write `trait Parser { type Output; fn parse(&self, s: &str) -> Option<Self::Output>; }` with two implementations, `IntParser` (output `i64`) and `PairParser` (output `(i64, i64)` from `"3,4"`). Then write the same thing as `trait Parse<T>` with a type parameter, and implement it twice for one struct, once per output type. Show where the generic version forces callers to write type annotations, and state the rule of thumb for choosing between them.',
              kind: 'coding',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'What is the difference between `fn f(a: &impl T, b: &impl T)` and `fn f<X: T>(a: &X, b: &X)`?',
              answerOutline:
                'The first has two independent type parameters, so `a` and `b` may be different types. The second requires them to be the same type.',
            },
            {
              question: 'State the orphan rule and the problem it prevents.',
              answerOutline:
                'An `impl Trait for Type` is allowed only if the trait or the type is local to the crate. Without it, two crates could provide conflicting implementations for the same pair.',
            },
            {
              question: 'Why is `Iterator::Item` an associated type rather than `Iterator<T>`?',
              answerOutline:
                'Each iterator type yields exactly one item type. With a parameter, a type could implement `Iterator` for several `T`, and every call would need annotations.',
            },
            {
              question: 'What does `-> impl Trait` hide, and what does it not allow?',
              answerOutline:
                'It hides the concrete return type from callers. It does not allow returning different types on different paths, because it is still one static type.',
            },
          ],
          relatedLessons: ['systems-programming/rust-fundamentals/traits-generics-and-collections'],
        },
        {
          slug: 'trait-objects-and-dynamic-dispatch',
          title: 'Trait objects and dynamic dispatch',
          summary:
            'Use `dyn Trait` to hold values of different types behind one interface, see the vtable that makes it work, learn which traits can be used this way, and choose between generics and trait objects.',
          estimatedMinutes: 70,
          objectives: [
            'Store values of different types in one collection with `Box<dyn Trait>` and `&dyn Trait`',
            'Explain the fat pointer and vtable behind a trait object, and its run-time cost',
            'Read E0038 and make a trait dyn compatible',
            'Choose between generics and trait objects for a given design',
          ],
          concepts: [
            '`dyn Trait`: a type known only by its trait',
            'Fat pointer: data pointer and vtable pointer',
            'Dynamic dispatch',
            '`Box<dyn Trait>`, `&dyn Trait`',
            'Dyn compatibility (formerly object safety)',
            '`where Self: Sized` to exclude a method',
            'Static versus dynamic dispatch trade-offs',
          ],
          explanation: `Generics need every type to be known at compile time, and a \`Vec<T>\` holds only one \`T\`. When the set of types is open, for example user-configured filters or plugins, use a **trait object**: \`dyn Filter\` means "some type that implements \`Filter\`, decided at run time". Its size is unknown, so it always lives behind a pointer, such as \`&dyn Filter\` or \`Box<dyn Filter>\`. A \`Box\` owns a value on the heap, and module 5 covers it fully.

\`\`\`rust
trait Filter {
    fn apply(&self, input: &str) -> String;
    fn name(&self) -> &str;
}

struct Upper;
struct Replace {
    from: String,
    to: String,
}
struct Truncate(usize);

impl Filter for Upper {
    fn apply(&self, input: &str) -> String {
        input.to_uppercase()
    }
    fn name(&self) -> &str {
        "upper"
    }
}

impl Filter for Replace {
    fn apply(&self, input: &str) -> String {
        input.replace(&self.from, &self.to)
    }
    fn name(&self) -> &str {
        "replace"
    }
}

impl Filter for Truncate {
    fn apply(&self, input: &str) -> String {
        match input.char_indices().nth(self.0) {
            Some((i, _)) => input[..i].to_string(),
            None => input.to_string(),
        }
    }
    fn name(&self) -> &str {
        "truncate"
    }
}

fn run(filters: &[Box<dyn Filter>], text: &str) -> String {
    let mut current = text.to_string();
    for f in filters {
        current = f.apply(&current);
        println!("after {:>8}: {current}", f.name());
    }
    current
}

fn main() {
    let filters: Vec<Box<dyn Filter>> = vec![
        Box::new(Replace { from: String::from("cat"), to: String::from("dog") }),
        Box::new(Upper),
        Box::new(Truncate(11)),
    ];
    let out = run(&filters, "the cat sat on the mat");
    println!("{} chars", out.len());
    println!("{} bytes per Box<dyn Filter>", size_of::<Box<dyn Filter>>());
}
\`\`\`

\`\`\`text
after  replace: the dog sat on the mat
after    upper: THE DOG SAT ON THE MAT
after truncate: THE DOG SAT
11 chars
16 bytes per Box<dyn Filter>
\`\`\`

A \`Box<dyn Filter>\` is a **fat pointer**, two words on a 64-bit machine: one points to the data and one to a **vtable**, a table of function pointers for that concrete type. \`f.apply(...)\` loads the function from the vtable and calls it. This is **dynamic dispatch**. It costs an indirect call and usually prevents inlining, but it gives you one copy of \`run\` for every filter type.

Not every trait can be made into an object. The vtable needs one entry per method, so methods with generic type parameters, or that return \`Self\` by value, rule it out:

\`\`\`rust
trait Cloner {
    fn duplicate(&self) -> Self;
}

struct Sheep;

impl Cloner for Sheep {
    fn duplicate(&self) -> Self {
        Sheep
    }
}

fn main() {
    let flock: Vec<Box<dyn Cloner>> = vec![Box::new(Sheep)];
    println!("{}", flock.len());
}
\`\`\`

\`\`\`text
error[E0038]: the trait \`Cloner\` is not dyn compatible
  --> src/main.rs:14:28
   |
14 |     let flock: Vec<Box<dyn Cloner>> = vec![Box::new(Sheep)];
   |                            ^^^^^^ \`Cloner\` is not dyn compatible
...
 2 |     fn duplicate(&self) -> Self;
   |                            ^^^^ ...because method \`duplicate\` references the \`Self\` type in its return type
\`\`\`

Adding \`where Self: Sized\` to \`duplicate\` excludes it from the vtable, and the trait becomes dyn compatible. This used to be called object safety.

**Choosing.** Use generics by default: they are faster and keep exact types. Use \`dyn\` when values of different types must live together, when you want one compiled copy of a large function, or at a plugin boundary. Read chapter 18.2 of the Book.`,
          resources: [
            {
              title: 'The Rust Programming Language, 18.2: Using Trait Objects to Abstract over Shared Behavior',
              url: 'https://doc.rust-lang.org/book/ch18-02-trait-objects.html',
              type: 'textbook',
              cost: 'free',
              provider: 'Rust Project',
              note: 'A GUI example with `Vec<Box<dyn Draw>>`, and static versus dynamic dispatch.',
              primary: true,
            },
            {
              title: 'The Rust Reference: Traits (dyn compatibility)',
              url: 'https://doc.rust-lang.org/reference/items/traits.html',
              type: 'documentation',
              cost: 'free',
              provider: 'Rust Project',
              note: 'The exact rules for which traits can be used as `dyn Trait`.',
            },
            {
              title: 'Rust by Example: Returning Traits with dyn',
              url: 'https://doc.rust-lang.org/rust-by-example/trait/dyn.html',
              type: 'interactive',
              cost: 'free',
              provider: 'Rust Project',
              note: 'Returning `Box<dyn Trait>` when the concrete type is chosen at run time.',
            },
          ],
          exercises: [
            {
              slug: 'filter-pipeline-config',
              title: 'Build a pipeline from configuration',
              prompt:
                'Extend the filter example with `fn parse_filter(spec: &str) -> Result<Box<dyn Filter>, String>` that understands `upper`, `lower`, `trim`, `replace:FROM:TO` and `truncate:N`. Read one spec per line from a text file into a `Vec<Box<dyn Filter>>` and apply it to standard input. Expected: the specs `replace:cat:dog`, `upper` and `truncate:11` turn `the cat sat on the mat` into `THE DOG SAT`, and an unknown spec reports its line number.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'dispatch-benchmark',
              title: 'Static against dynamic dispatch',
              prompt:
                'Write a trait `Op { fn apply(&self, x: u64) -> u64; }` with two cheap implementations. In a release build, apply one implementation 100 million times through a generic function and through `&dyn Op`, timing each with `std::time::Instant` and passing the results to `std::hint::black_box`. Report nanoseconds per call for each, and explain the difference in terms of inlining. Then make `apply` do more work, and show the gap shrinking.',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'make-dyn-compatible',
              title: 'Make a trait dyn compatible',
              prompt:
                'Write `trait Shape { fn area(&self) -> f64; fn scaled(&self, k: f64) -> Self; fn describe<W: std::fmt::Write>(&self, out: &mut W); }` and try to build a `Vec<Box<dyn Shape>>`. Record every reason the compiler gives. Fix it in two ways: once by adding `where Self: Sized` to the offending methods, and once by changing their signatures, for example returning `Box<dyn Shape>` and taking `&mut dyn std::fmt::Write`. Say what each fix gives up.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What is stored in a `&dyn Trait`, and what happens when you call a method through it?',
              answerOutline:
                'A pointer to the data and a pointer to the vtable for its concrete type. The call loads the method\'s address from the vtable and calls it indirectly.',
            },
            {
              question: 'Why can a method returning `Self` not be called through `dyn Trait`?',
              answerOutline:
                'The concrete type, and so the size of the return value, is unknown at the call site. With `where Self: Sized` the method is left out of the vtable.',
            },
            {
              question: 'Give two situations where `Box<dyn Trait>` is the better choice over a generic.',
              answerOutline:
                'A collection of mixed types chosen at run time, and keeping one compiled copy of a large function to save code size or compile time. Plugin boundaries are another.',
            },
          ],
          relatedLessons: ['cpp-programming/classes-and-raii/inheritance-and-dynamic-dispatch'],
        },
        {
          slug: 'lifetime-annotations',
          title: 'Lifetime annotations',
          summary:
            'Annotate how the references a function returns relate to the ones it takes, understand the elision rules that make annotations usually unnecessary, store references in structs, and know what `\'static` really means.',
          estimatedMinutes: 85,
          objectives: [
            'Read E0106 and add lifetime parameters to a function signature',
            'Explain what a lifetime annotation constrains, and what it does not change',
            'Apply the three elision rules to predict when annotations are needed',
            'Write a struct that holds references, and its `impl` block',
            'Explain `\'static` as a reference type and as a bound',
          ],
          concepts: [
            'Lifetime parameter `\'a`',
            'Annotations describe, they do not extend',
            'Elision rules',
            'E0106: missing lifetime specifier',
            'E0515: returning a reference to a local',
            'Structs holding references',
            '`\'static` references and `T: \'static`',
          ],
          explanation: `Inside one function, the borrow checker sees every loan. Across a call, it sees only the **signature**. So when a function returns a reference, the signature must say which input it borrows from:

\`\`\`rust
fn longest(x: &str, y: &str) -> &str {
    if x.len() >= y.len() { x } else { y }
}

fn main() {
    println!("{}", longest("ab", "c"));
}
\`\`\`

\`\`\`text
error[E0106]: missing lifetime specifier
 --> src/main.rs:1:33
  |
1 | fn longest(x: &str, y: &str) -> &str {
  |               ----     ----     ^ expected named lifetime parameter
  |
  = help: this function's return type contains a borrowed value, but the signature does not say whether it is borrowed from \`x\` or \`y\`
\`\`\`

The fix is \`fn longest<'a>(x: &'a str, y: &'a str) -> &'a str\`. Read it as: "for some region of code \`'a\` in which both \`x\` and \`y\` are valid, the result is valid in \`'a\` too". At each call, the compiler picks \`'a\` to be no longer than the shorter of the two borrows. A **lifetime annotation never makes anything live longer**. It only states a relationship that the checker then enforces, in the function body (you may only return \`x\` or \`y\`) and at every call site (the result may not outlive either argument).

Most signatures need no annotations because of three **elision rules**. Each reference parameter gets its own lifetime. If there is exactly one input lifetime, it is given to every output reference. If there is a \`&self\` or \`&mut self\`, its lifetime is given to the outputs. \`longest\` has two inputs and no \`self\`, so neither of the last two rules applies.

Structs can hold references, and the annotation says that the struct cannot outlive the data it points into:

\`\`\`rust
fn longest<'a>(x: &'a str, y: &'a str) -> &'a str {
    if x.len() >= y.len() { x } else { y }
}

struct Excerpt<'a> {
    text: &'a str,
}

impl<'a> Excerpt<'a> {
    fn first_sentence(text: &'a str) -> Excerpt<'a> {
        let end = match text.find('.') {
            Some(i) => i + 1,
            None => text.len(),
        };
        Excerpt { text: &text[..end] }
    }

    fn words(&self) -> usize {
        self.text.split_whitespace().count()
    }
}

fn main() {
    let novel = String::from("Call me Ishmael. Some years ago...");
    let first = Excerpt::first_sentence(&novel);
    println!("{} ({} words)", first.text, first.words());

    let a = String::from("short");
    {
        let b = String::from("much longer");
        println!("{}", longest(&a, &b));
    }
}
\`\`\`

\`\`\`text
Call me Ishmael. (3 words)
much longer
\`\`\`

If you store the result of \`longest(&a, &b)\` in a variable declared outside the inner block and print it after the block, you get **E0597**: \`b\` does not live long enough, because \`'a\` had to fit inside \`b\`'s scope. Returning a reference to a local, as in \`let s = String::new(); &s\`, gives **E0515**, \`cannot return reference to local variable\`. No annotation can fix that. Return the owned \`String\` instead.

**\`'static\`** has two meanings. \`&'static str\` is a reference valid for the whole program, such as a string literal stored in the binary. The bound \`T: 'static\` means that \`T\` contains no short-lived references. An owned \`String\` satisfies it. \`thread::spawn\` requires it in module 6.

Read chapter 10.3 of the Book and the Reference page on elision.`,
          resources: [
            {
              title: 'The Rust Programming Language, 10.3: Validating References with Lifetimes',
              url: 'https://doc.rust-lang.org/book/ch10-03-lifetime-syntax.html',
              type: 'textbook',
              cost: 'free',
              provider: 'Rust Project',
              note: 'Annotations in functions and structs, elision, and the static lifetime.',
              primary: true,
            },
            {
              title: 'The Rust Reference: Lifetime elision',
              url: 'https://doc.rust-lang.org/reference/lifetime-elision.html',
              type: 'documentation',
              cost: 'free',
              provider: 'Rust Project',
              note: 'The exact rules, including the defaults for trait objects.',
            },
            {
              title: 'Rust by Example: Lifetimes',
              url: 'https://doc.rust-lang.org/rust-by-example/scope/lifetime.html',
              type: 'interactive',
              cost: 'free',
              provider: 'Rust Project',
              note: 'Explicit annotations, functions, methods, structs, bounds and elision.',
            },
          ],
          exercises: [
            {
              slug: 'predict-elision',
              title: 'Predict the elision',
              prompt:
                'For each signature, say whether it compiles as written and, if so, which input the output borrows from: (a) `fn f(s: &str) -> &str` (b) `fn f(a: &str, b: &str) -> &str` (c) `fn f(&self, key: &str) -> &str` in an `impl` (d) `fn f(a: &str, n: usize) -> &str` (e) `fn f() -> &str` (f) `fn f(v: &[String]) -> Vec<&str>`. Check each with the compiler. For (c), write a body that returns `key` and explain the error.',
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'kv-view',
              title: 'A zero-copy key-value view',
              prompt:
                'Write `struct Query<\'a> { pairs: Vec<(&\'a str, &\'a str)> }` with `fn parse(s: &\'a str) -> Query<\'a>` for URL query strings such as `"a=1&b=two&flag"`, where a key without `=` has an empty value, and `fn get(&self, key: &str) -> Option<&\'a str>`. Expected: `get("b")` is `Some("two")`, `get("flag")` is `Some("")` and `get("z")` is `None`. Explain why `get` returns `&\'a str` rather than relying on elision, and write a test showing that the value can outlive the `Query` but not the string.',
              kind: 'coding',
              difficulty: 3,
              hint: 'With elision, the output of `get` would borrow from `&self`, so the result could not outlive the `Query` even though it really points into the original string.',
            },
            {
              slug: 'static-bound',
              title: 'What does T: \'static accept?',
              prompt:
                'Write `fn keep<T: \'static>(x: T) -> T { x }` and call it with an `i32`, a `String`, a string literal, a `&String` pointing at a local, and a `Vec<&\'static str>`. Predict which compile, then check and explain each. Write one sentence correcting the common belief that `\'static` means "lives forever".',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Does adding `\'a` to a signature change how long any value lives?',
              answerOutline:
                'No. It names a relationship between references, which the checker uses to check the body and every call site.',
            },
            {
              question: 'State the three lifetime elision rules.',
              answerOutline:
                'Each input reference gets its own lifetime. With exactly one input lifetime, outputs get it. With `&self` or `&mut self`, outputs get the lifetime of self.',
            },
            {
              question: 'Why can no annotation fix "cannot return reference to local variable"?',
              answerOutline:
                'The local is dropped when the function returns, so any reference to it would dangle. The function must return an owned value instead.',
            },
            {
              question: 'What does `T: \'static` mean for an owned `String`?',
              answerOutline:
                'It satisfies the bound, because it contains no borrowed references. The bound limits borrowed data, not how long a value lives.',
            },
          ],
          relatedLessons: ['systems-programming/ownership-and-safe-concurrency/lifetimes-and-smart-pointers'],
        },
        {
          slug: 'standard-traits',
          title: 'The standard traits',
          summary:
            'The traits that connect your types to the language: `Debug` and `Display` for printing, `Clone` and `Copy`, equality, ordering and hashing, `Default`, `From` and `TryFrom` for conversions, `FromStr`, `Error`, and `Drop` for cleanup.',
          estimatedMinutes: 80,
          objectives: [
            'Derive the standard traits where their default behaviour is right, and know their requirements',
            'Implement `Display` and `Debug` by hand',
            'Implement `From` so that `?` converts errors automatically, and `FromStr` so that `parse` works',
            'Write an error type that implements `std::error::Error`',
            'Implement `Drop`, and predict the order in which values are dropped',
          ],
          concepts: [
            '`Debug` and `Display`',
            '`Clone` and `Copy`',
            '`PartialEq`, `Eq`, `Hash`',
            '`PartialOrd`, `Ord`',
            '`Default`',
            '`From`, `Into`, `TryFrom`',
            '`FromStr` and `str::parse`',
            '`std::error::Error`',
            '`Drop`: reverse declaration order',
          ],
          explanation: `Much of the standard library works with any type that implements the right trait. \`{:?}\` needs \`Debug\`, \`{}\` needs \`Display\`, \`==\` needs \`PartialEq\`, \`sort\` needs \`Ord\`, \`HashMap\` keys need \`Eq + Hash\`, \`parse\` needs \`FromStr\`, and \`?\` uses \`From\`. Most of these can be **derived** when the obvious field-by-field behaviour is right. \`Eq\` and \`Ord\` promise a total order, which is why \`f64\`, with its \`NaN\`, implements only \`PartialEq\` and \`PartialOrd\`. \`Copy\` requires \`Clone\` and is only possible when every field is \`Copy\`. \`Display\` is never derived, because only you know how a value should look to a user.

This example parses colours. Note how \`From<ParseIntError>\` lets \`?\` convert the library error:

\`\`\`rust
use std::fmt;
use std::num::ParseIntError;
use std::str::FromStr;

#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash, Default)]
struct Rgb(u8, u8, u8);

#[derive(Debug)]
enum ColorError {
    BadFormat(String),
    BadHex(ParseIntError),
}

impl fmt::Display for ColorError {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        match self {
            ColorError::BadFormat(s) => write!(f, "expected #rrggbb, got {s:?}"),
            ColorError::BadHex(e) => write!(f, "bad hex digit: {e}"),
        }
    }
}

impl std::error::Error for ColorError {}

impl From<ParseIntError> for ColorError {
    fn from(e: ParseIntError) -> Self {
        ColorError::BadHex(e)
    }
}

impl FromStr for Rgb {
    type Err = ColorError;

    fn from_str(s: &str) -> Result<Self, Self::Err> {
        if s.len() != 7 || !s.is_ascii() || !s.starts_with('#') {
            return Err(ColorError::BadFormat(s.to_string()));
        }
        let r = u8::from_str_radix(&s[1..3], 16)?;
        let g = u8::from_str_radix(&s[3..5], 16)?;
        let b = u8::from_str_radix(&s[5..7], 16)?;
        Ok(Rgb(r, g, b))
    }
}

impl fmt::Display for Rgb {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "#{:02x}{:02x}{:02x}", self.0, self.1, self.2)
    }
}

struct Noisy(&'static str);

impl Drop for Noisy {
    fn drop(&mut self) {
        println!("drop {}", self.0);
    }
}

fn main() -> Result<(), ColorError> {
    let teal: Rgb = "#008080".parse()?;
    println!("{teal} {teal:?} {}", teal == Rgb(0, 128, 128));
    println!("{}", Rgb::default());
    for text in ["#00GG00", "teal"] {
        if let Err(e) = text.parse::<Rgb>() {
            println!("error: {e}");
        }
    }
    let _a = Noisy("a");
    let _b = Noisy("b");
    Ok(())
}
\`\`\`

\`\`\`text
#008080 Rgb(0, 128, 128) true
#000000
error: bad hex digit: invalid digit found in string
error: expected #rrggbb, got "teal"
drop b
drop a
\`\`\`

\`?\` on \`Err(e)\` returns \`Err(From::from(e))\`, so implementing \`From<ParseIntError> for ColorError\` is what makes \`?\` work in \`from_str\`. Implementing \`From\` also gives you \`Into\` for free, so \`let c: ColorError = err.into()\` works. For conversions that can fail, implement **\`TryFrom\`**, as in \`u8::try_from(300)\`. **\`std::error::Error\`** needs \`Debug\` and \`Display\`, and it lets your error fit into \`Box<dyn Error>\` and into crates such as \`anyhow\`. Override \`source()\` to expose the underlying error.

**\`Drop\`** runs when a value goes out of scope. Locals are dropped in **reverse order of declaration**, which is why \`b\` is dropped first, and struct fields in declaration order. This is RAII: files close, locks release and buffers free at a predictable point, with no \`finally\`. You cannot call \`drop\` methods directly. Use \`std::mem::drop(x)\` to end a value early. A \`Copy\` type cannot implement \`Drop\`.

Read Appendix C of the Book on derivable traits, and the \`std::convert\` and \`std::fmt\` module pages.`,
          resources: [
            {
              title: 'The Rust Programming Language, Appendix C: Derivable Traits',
              url: 'https://doc.rust-lang.org/book/appendix-03-derivable-traits.html',
              type: 'textbook',
              cost: 'free',
              provider: 'Rust Project',
              note: 'What each derive generates and what it requires.',
              primary: true,
            },
            {
              title: 'Module std::convert',
              url: 'https://doc.rust-lang.org/std/convert/index.html',
              type: 'documentation',
              cost: 'free',
              provider: 'Rust Project',
              note: 'When to implement `From`, `TryFrom`, `AsRef` and `AsMut`, and why you should not implement `Into` directly.',
            },
            {
              title: 'Trait std::error::Error',
              url: 'https://doc.rust-lang.org/std/error/trait.Error.html',
              type: 'documentation',
              cost: 'free',
              provider: 'Rust Project',
              note: 'The `source` chain and the guidelines for error messages: lowercase, no trailing punctuation.',
            },
            {
              title: 'Rust by Example: Defining an error type',
              url: 'https://doc.rust-lang.org/rust-by-example/error/multiple_error_types/define_error_type.html',
              type: 'interactive',
              cost: 'free',
              provider: 'Rust Project',
              note: 'Then read the next pages on boxing and wrapping errors.',
            },
          ],
          exercises: [
            {
              slug: 'version-type',
              title: 'A semantic version type',
              prompt:
                'Write `Version { major: u64, minor: u64, patch: u64 }` with derived `Debug, Clone, Copy, PartialEq, Eq, Hash, PartialOrd, Ord`, `FromStr` for `"1.2.3"`, and `Display`. Check that `"1.10.0" > "1.9.9"` once parsed, which a string comparison gets wrong, that sorting `["1.2.10", "1.2.9", "0.9.0"]` gives `0.9.0, 1.2.9, 1.2.10`, and that `"1.2"` and `"1.x.3"` return errors from your own error type. Explain why the derived `Ord` is correct here, and what field order it depends on.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'error-with-source',
              title: 'An error type with a source chain',
              prompt:
                'Write `fn load_port(path: &str) -> Result<u16, ConfigError>` that reads a file containing a port number. `ConfigError` has variants `Io(std::io::Error)` and `Parse(std::num::ParseIntError)`, with `From` implementations for both, `Display`, and an `Error` implementation whose `source()` returns the inner error. In `main`, print the error and then walk the `source()` chain. Test with a missing file, a file containing `80a`, and one containing `8080`.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'drop-order',
              title: 'Predict the drop order',
              prompt:
                'Using a `Noisy(&\'static str)` type that prints in `drop`, write a program with locals `a` and `b`, a struct with two `Noisy` fields, a `Vec` of three `Noisy` values, a value moved into a function, and a temporary created in an expression statement. Predict every line of output before running it, then explain each place your prediction was wrong. State the rules for locals, fields, vector elements and temporaries.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why can you derive `PartialOrd` but not `Ord` for a struct containing an `f64`?',
              answerOutline:
                '`Ord` needs a total order, and `f64` has `NaN`, which is not comparable with anything, so `f64` only implements `PartialOrd`.',
            },
            {
              question: 'What role does `From` play in the `?` operator?',
              answerOutline:
                'On an error, `?` returns `Err(From::from(e))`, converting the error to the function\'s error type if a `From` implementation exists.',
            },
            {
              question: 'Why is `Display` never derived?',
              answerOutline:
                'It is the user-facing representation, and there is no generic right answer for how a type should look to a person.',
            },
            {
              question: 'In what order are locals dropped, and why does it matter?',
              answerOutline:
                'In reverse order of declaration, so a value is dropped before anything declared earlier that it might borrow from or depend on, for example a guard before the lock.',
            },
          ],
        },
      ],
    },
    {
      slug: 'collections-iterators-smart-pointers',
      title: 'Collections, Iterators and Smart Pointers',
      description:
        'The standard collections and how to choose one, closures and the three `Fn` traits, iterator adapters as the idiomatic replacement for index loops, and the smart pointers `Box`, `Rc` and `RefCell` for recursive types, shared ownership and interior mutability.',
      lessons: [
        {
          slug: 'collections-and-choosing-one',
          title: 'Vec, HashMap and choosing a collection',
          summary:
            'How `Vec` grows, the slice methods you should use instead of writing loops, `HashMap` and its entry API, ordered maps and sets, `VecDeque`, and a rule for picking the right one.',
          estimatedMinutes: 75,
          objectives: [
            'Explain `Vec` length, capacity and amortised growth, and preallocate when the size is known',
            'Use slice methods such as `sort_unstable`, `dedup`, `binary_search`, `retain` and `windows`',
            'Insert, update and look up with `HashMap` and its entry API',
            'Choose between `Vec`, `VecDeque`, `HashMap`, `BTreeMap`, `HashSet` and `BinaryHeap` for a task',
            'Explain why `HashMap` iteration order is unspecified, and what to do when order matters',
          ],
          concepts: [
            'Length versus capacity',
            'Amortised O(1) `push`',
            '`with_capacity` and `reserve`',
            'Slice methods',
            'Entry API: `entry().or_insert()`',
            'SipHash and unspecified order',
            '`BTreeMap`: sorted keys',
            '`VecDeque`: ring buffer',
            '`HashSet`, `BTreeSet`, `BinaryHeap`',
          ],
          explanation: `**\`Vec<T>\`** is the default collection. It stores elements contiguously, with a **length** (elements in use) and a **capacity** (allocated slots). When \`push\` finds no room, it allocates a larger buffer, roughly twice the size, and moves everything. Each push therefore costs O(1) on average, and references into the vector are invalidated, which is the E0502 of module 2. If you know the size, \`Vec::with_capacity(n)\` allocates once.

Many loops you would write by hand already exist as methods on slices, which \`Vec\` borrows as. These include \`sort\` and \`sort_unstable\` (faster, and fine unless equal elements must keep their order), \`sort_by_key\`, \`dedup\`, \`retain\`, \`binary_search\`, \`contains\`, \`windows(n)\`, \`chunks(n)\`, \`split_at\` and \`swap\`.

**\`HashMap<K, V>\`** needs keys that are \`Eq + Hash\`. Its **entry API** finds a slot once and lets you insert or update it, with no second lookup and no borrow problems. Its default hasher, SipHash, resists attackers who craft colliding keys, and it is seeded randomly. So **iteration order is unspecified and changes between runs**. When order matters, use **\`BTreeMap\`**, which keeps keys sorted, or sort the entries before printing.

\`\`\`rust
use std::collections::{BTreeMap, HashMap, VecDeque};

fn main() {
    let mut v: Vec<u32> = Vec::with_capacity(4);
    println!("len {} cap {}", v.len(), v.capacity());
    v.extend([5, 3, 8, 3, 1]);
    v.sort_unstable();
    v.dedup();
    println!("{v:?}, 8 at {:?}", v.binary_search(&8));

    let mut groups: BTreeMap<String, Vec<&str>> = BTreeMap::new();
    for word in ["listen", "google", "silent", "enlist", "banana"] {
        let mut letters: Vec<char> = word.chars().collect();
        letters.sort_unstable();
        groups.entry(letters.into_iter().collect()).or_default().push(word);
    }
    for (key, words) in &groups {
        println!("{key}: {words:?}");
    }

    let mut stock: HashMap<&str, i32> = HashMap::new();
    *stock.entry("apples").or_insert(0) += 5;
    *stock.entry("apples").or_insert(0) -= 2;
    println!("apples = {}", stock["apples"]);

    let mut queue = VecDeque::from([1, 2, 3]);
    queue.rotate_left(1);
    queue.push_front(0);
    println!("{queue:?}");
}
\`\`\`

\`\`\`text
len 0 cap 4
[1, 3, 5, 8], 8 at Ok(3)
aaabnn: ["banana"]
eggloo: ["google"]
eilnst: ["listen", "silent", "enlist"]
apples = 3
[0, 2, 3, 1]
\`\`\`

The anagram groups use the sorted letters as a key, and \`or_default()\` creates an empty \`Vec\` the first time a key appears. \`collect()\` builds a \`String\` from \`char\`s, which the next two lessons explain.

**Choosing.** A sequence you append to and index is a \`Vec\`. A queue with pushes and pops at both ends is a \`VecDeque\`. Lookup by key is a \`HashMap\`, or a \`BTreeMap\` if you need sorted order or range queries. Membership tests use a \`HashSet\` or \`BTreeSet\`, and "always give me the largest" is a \`BinaryHeap\`. A linked list is almost never the answer, because contiguous memory is much faster for caches.

Read chapter 8 of the Book and the \`std::collections\` page, whose table of operation costs is the best summary there is.`,
          resources: [
            {
              title: 'Module std::collections',
              url: 'https://doc.rust-lang.org/std/collections/index.html',
              type: 'documentation',
              cost: 'free',
              provider: 'Rust Project',
              note: 'When to use which collection, and a table of the cost of each operation.',
              primary: true,
            },
            {
              title: 'The Rust Programming Language, chapter 8: Common Collections',
              url: 'https://doc.rust-lang.org/book/ch08-00-common-collections.html',
              type: 'textbook',
              cost: 'free',
              provider: 'Rust Project',
              note: 'Vectors, strings and hash maps, including the entry API.',
            },
            {
              title: 'std::collections::HashMap',
              url: 'https://doc.rust-lang.org/std/collections/struct.HashMap.html',
              type: 'documentation',
              cost: 'free',
              provider: 'Rust Project',
              note: 'Read the introduction on hashing, key requirements and the entry API examples.',
            },
          ],
          exercises: [
            {
              slug: 'capacity-growth',
              title: 'Watch a Vec grow',
              prompt:
                'Push 1,000 `u64` values into an empty `Vec` and print the capacity every time it changes. Record the sequence on your machine, count the reallocations, and work out the total number of element moves. Compare that total with 1,000 to see why `push` is amortised O(1). Repeat with `Vec::with_capacity(1000)` and confirm there are no reallocations. Note that the growth policy is an implementation detail, not a guarantee.',
              kind: 'coding',
              difficulty: 1,
            },
            {
              slug: 'inventory-ledger',
              title: 'An inventory ledger',
              prompt:
                'Read lines of the form `+ apples 5`, `- apples 2` and `? apples` from standard input into a `HashMap<String, u32>`, using the entry API for updates. Removing more than is in stock prints an error and changes nothing. At the end, print all items with non-zero stock sorted by name, then the three largest by quantity using a `BinaryHeap`. Expected: `+ pears 3`, `+ apples 5`, `- apples 2`, `- pears 9` and `+ figs 10` print one error and leave figs 10, apples 3 and pears 3.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'pick-the-collection',
              title: 'Pick the collection',
              prompt:
                'For each task, choose a collection, state the cost of the main operation, and give a one-line reason: (a) the last 100 log lines, (b) user IDs seen today, (c) a leaderboard printed in score order after each update, (d) the next timer to fire among 10,000 timers, (e) word positions in a document to look up by word, (f) an undo history. Implement (a) and (d), and test them.',
              kind: 'writing',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why is `Vec::push` amortised O(1) even though it sometimes copies every element?',
              answerOutline:
                'Capacity grows geometrically, so copies happen rarely, and the total cost of n pushes is O(n).',
            },
            {
              question: 'Why does printing a `HashMap` give a different order on each run?',
              answerOutline:
                'The default SipHash hasher is seeded randomly per process to resist collision attacks, and iteration follows the hash layout.',
            },
            {
              question: 'What does the entry API save compared with `if map.contains_key(k) { ... } else { map.insert(...) }`?',
              answerOutline:
                'A second hash lookup, and the borrow problem of holding a reference from `get` while inserting. One lookup gives a slot you can fill or update.',
            },
          ],
          relatedLessons: [
            'data-structures-algorithms/linear-structures/arrays-and-dynamic-arrays',
            'data-structures-algorithms/hashing/hash-tables-and-hash-functions',
          ],
        },
        {
          slug: 'closures-and-the-fn-traits',
          title: 'Closures and the Fn traits',
          summary:
            'Closures capture their environment by reference, by mutable reference or by value, and that choice decides whether they implement `Fn`, `FnMut` or `FnOnce`. Learn to accept, store and return closures.',
          estimatedMinutes: 70,
          objectives: [
            'Write closures and explain how each captured variable is captured',
            'Explain `Fn`, `FnMut` and `FnOnce` and how the compiler picks them',
            'Accept closures with `impl Fn`, generic bounds or `&dyn Fn`, and store them in `Box<dyn Fn>`',
            'Return closures with `impl Fn` and `move`',
            'Read E0525 and change either the closure or the bound',
          ],
          concepts: [
            'Closure syntax `|x| x + 1`',
            'Capture by `&`, `&mut` or value',
            '`move` closures',
            '`Fn`: call many times, shared access',
            '`FnMut`: call many times, mutates captures',
            '`FnOnce`: may consume captures',
            'Function pointers `fn(T) -> U`',
            'Returning `impl Fn`',
          ],
          explanation: `A **closure** is an anonymous function that can use variables from the scope where it is written: \`let add = |x| x + offset;\`. Parameter and return types are usually inferred. The compiler turns each closure into a hidden struct holding its **captures**, and it captures each variable in the weakest way the body allows: by shared reference if the body only reads it, by mutable reference if it changes it, and by value if it moves it. The keyword **\`move\`** forces capture by value, which you need when the closure must outlive the current scope, for example when you return it or hand it to a thread.

What the body does with its captures decides which traits the closure implements:

- **\`FnOnce\`**: it can be called at least once. Every closure implements it.
- **\`FnMut\`**: it can be called many times and may mutate its captures.
- **\`Fn\`**: it can be called many times, even concurrently, with shared access only.

A function that accepts a closure states the weakest requirement it needs. \`Option::map\` takes \`FnOnce\` because it calls the closure at most once, \`Iterator::for_each\` takes \`FnMut\`, and a callback that may be called from several places takes \`Fn\`.

\`\`\`rust
fn apply_twice(f: impl Fn(i32) -> i32, x: i32) -> i32 {
    f(f(x))
}

fn make_adder(n: i32) -> impl Fn(i32) -> i32 {
    move |x| x + n
}

fn repeat(mut f: impl FnMut(), times: usize) {
    for _ in 0..times {
        f();
    }
}

fn main() {
    let offset = 10;
    println!("{}", apply_twice(|x| x + offset, 1));

    let add5 = make_adder(5);
    println!("{}", apply_twice(&add5, 0));

    let mut log = Vec::new();
    repeat(|| log.push(log.len()), 3);
    println!("{log:?}");

    let name = String::from("Ferris");
    let give_back = move || name;
    println!("{}", give_back());

    let ops: [fn(f64) -> f64; 2] = [f64::sqrt, f64::abs];
    for op in ops {
        println!("{}", op(-16.0));
    }
}
\`\`\`

\`\`\`text
21
10
[0, 1, 2]
Ferris
NaN
16
\`\`\`

\`make_adder\` needs \`move\`, or the closure would borrow \`n\`, a parameter about to go away. \`&add5\` works where an \`impl Fn\` is expected, because a reference to an \`Fn\` is itself \`Fn\`. \`give_back\` returns its captured \`String\`, so it is only \`FnOnce\`. **Function pointers**, \`fn(f64) -> f64\`, are plain function addresses with no captures. Named functions and non-capturing closures convert to them.

When the closure does not fit the bound, the error names both sides:

\`\`\`rust
fn call_twice<F: Fn()>(f: F) {
    f();
    f();
}

fn main() {
    let s = String::from("bye");
    let farewell = move || drop(s);
    call_twice(farewell);
}
\`\`\`

\`\`\`text
error[E0525]: expected a closure that implements the \`Fn\` trait, but this closure only implements \`FnOnce\`
\`\`\`

The labels point at \`drop(s)\`, which moves \`s\` out, and at the \`F: Fn()\` bound that required more. Either relax the bound to \`FnOnce\` or stop consuming the capture, for example with \`println!("{s}")\`. To store closures of different types together, box them: \`Vec<Box<dyn Fn(i32) -> i32>>\`.

Read chapter 13.1 of the Book.`,
          resources: [
            {
              title: 'The Rust Programming Language, 13.1: Closures',
              url: 'https://doc.rust-lang.org/book/ch13-01-closures.html',
              type: 'textbook',
              cost: 'free',
              provider: 'Rust Project',
              note: 'Capturing the environment, moving captured values, and the `Fn` traits.',
              primary: true,
            },
            {
              title: 'Trait std::ops::Fn',
              url: 'https://doc.rust-lang.org/std/ops/trait.Fn.html',
              type: 'documentation',
              cost: 'free',
              provider: 'Rust Project',
              note: 'Then follow the links to `FnMut` and `FnOnce`, and read when to use each as a bound.',
            },
            {
              title: 'Rust by Example: Closures',
              url: 'https://doc.rust-lang.org/rust-by-example/fn/closures.html',
              type: 'interactive',
              cost: 'free',
              provider: 'Rust Project',
              note: 'Capturing, closures as input parameters and output parameters, and examples from `std`.',
            },
          ],
          exercises: [
            {
              slug: 'capture-modes',
              title: 'Which trait does it implement?',
              prompt:
                'Write six closures over a `String` and a `Vec<i32>` that (a) print the string, (b) push to the vector, (c) return the string\'s length, (d) return the string itself, (e) are declared `move` but only print, and (f) sort a clone of the vector. For each, predict `Fn`, `FnMut` or `FnOnce`, then check by passing it to three helper functions, one taking each bound. Explain (e): why a `move` closure can still be `Fn`.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'event-bus',
              title: 'A tiny event bus',
              prompt:
                'Write `struct Bus { handlers: HashMap<String, Vec<Box<dyn Fn(&str)>>> }` with `on(&mut self, event: &str, h: impl Fn(&str) + \'static)` and `emit(&self, event: &str, payload: &str) -> usize`, which calls every handler for the event and returns how many ran. Register two handlers for `"save"` and one for `"quit"`, and check that `emit("save", "a.txt")` returns 2 and an unknown event returns 0. Then try to register a handler that pushes into a local `Vec`, explain the error, and fix it with `Rc<RefCell<Vec<String>>>` once you have read the last lesson of this module.',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'memoize',
              title: 'Memoise a function',
              prompt:
                'Write `fn memoize<F: Fn(u64) -> u64>(f: F) -> impl FnMut(u64) -> u64` that returns a closure caching results in a `HashMap` it owns. Use it on a slow function that sleeps for 50 ms, call it twice with the same argument, and show with `Instant` that the second call takes under 1 ms. Explain why the result must be `FnMut` and not `Fn`, and why the closure needs `move`.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What decides whether a closure is `Fn`, `FnMut` or `FnOnce`?',
              answerOutline:
                'What its body does with captured variables: only reads them gives `Fn`, mutates them gives `FnMut`, moves them out gives only `FnOnce`. How they are captured (`move` or not) does not decide it.',
            },
            {
              question: 'Why does a closure returned from a function usually need `move`?',
              answerOutline:
                'Otherwise it borrows the function\'s locals or parameters, which are dropped when the function returns, and the closure would hold dangling references.',
            },
            {
              question: 'Which bound should a function use if it calls its closure argument exactly once?',
              answerOutline:
                '`FnOnce`, the weakest bound, which accepts every closure, including ones that consume their captures.',
            },
          ],
        },
        {
          slug: 'iterators-and-adapters',
          title: 'Iterators and adapters',
          summary:
            'The `Iterator` trait, the difference between `iter`, `iter_mut` and `into_iter`, lazy adapters such as `map`, `filter`, `zip` and `take_while`, consumers such as `collect`, `sum` and `fold`, and implementing `Iterator` for your own types.',
          estimatedMinutes: 85,
          objectives: [
            'Explain the `Iterator` trait and how a `for` loop uses `IntoIterator`',
            'Choose between `iter`, `iter_mut` and `into_iter`',
            'Write chains of adapters and consumers instead of index loops',
            'Collect into `Vec`, `String`, `HashMap` and `Result<Vec<_>, _>`',
            'Implement `Iterator` for your own type',
          ],
          concepts: [
            '`Iterator::next` and `type Item`',
            '`IntoIterator` and `for` loops',
            '`iter`, `iter_mut`, `into_iter`',
            'Adapters are lazy',
            '`map`, `filter`, `enumerate`, `zip`, `take_while`, `flat_map`',
            'Consumers: `collect`, `sum`, `count`, `fold`, `any`, `find`',
            '`collect::<Result<Vec<_>, _>>()`',
            'Zero-cost abstraction',
          ],
          explanation: `An **iterator** is anything that implements \`Iterator\`: a type with \`type Item\` and \`fn next(&mut self) -> Option<Self::Item>\`, which returns \`None\` when it is finished. Every other method, and there are more than 70, is built on \`next\`. A \`for\` loop calls \`into_iter()\` on what you give it, then \`next()\` until \`None\`. For a collection \`v\`, \`v.iter()\` yields \`&T\`, \`v.iter_mut()\` yields \`&mut T\`, and \`v.into_iter()\` consumes the collection and yields \`T\`. \`for x in &v\` is the same as \`v.iter()\`.

**Adapters**, such as \`map\`, \`filter\`, \`enumerate\`, \`zip\`, \`skip\`, \`take_while\`, \`chain\`, \`flat_map\`, \`filter_map\`, \`rev\` and \`peekable\`, wrap one iterator in another. They are **lazy** and do nothing until a **consumer** such as \`collect\`, \`sum\`, \`count\`, \`fold\`, \`any\`, \`all\`, \`find\`, \`position\`, \`max_by_key\` or \`for_each\` pulls items through. The compiler warns you if you forget:

\`\`\`rust
fn main() {
    let v = vec![1, 2, 3];
    v.iter().map(|x| x * 2);
    println!("{v:?}");
}
\`\`\`

\`\`\`text
warning: unused \`Map\` that must be used
 --> src/main.rs:3:5
  |
3 |     v.iter().map(|x| x * 2);
  |     ^^^^^^^^^^^^^^^^^^^^^^^
  |
  = note: iterators are lazy and do nothing unless consumed
\`\`\`

Here are chains you would otherwise write as loops, and an iterator of your own:

\`\`\`rust
struct Fib {
    a: u64,
    b: u64,
}

impl Iterator for Fib {
    type Item = u64;

    fn next(&mut self) -> Option<u64> {
        let next = self.a.checked_add(self.b)?;
        let out = self.a;
        self.a = self.b;
        self.b = next;
        Some(out)
    }
}

fn main() {
    let words = ["apple", "Bob", "kayak", "Level", "rust"];
    let palindromes: Vec<String> = words
        .iter()
        .map(|w| w.to_lowercase())
        .filter(|w| w.chars().eq(w.chars().rev()))
        .collect();
    println!("{palindromes:?}");

    let even_sum: u64 = Fib { a: 0, b: 1 }
        .take_while(|&n| n < 4_000_000)
        .filter(|n| n.is_multiple_of(2))
        .sum();
    println!("{even_sum}");
    println!("{} Fibonacci numbers fit in a u64", Fib { a: 0, b: 1 }.count());

    let parsed: Result<Vec<i32>, _> = "3 14 15".split(' ').map(str::parse::<i32>).collect();
    println!("{parsed:?}");
    let bad: Result<Vec<i32>, _> = "3 x 15".split(' ').map(str::parse::<i32>).collect();
    println!("{}", bad.is_err());

    let temps = [3.0, 5.5, 4.0, 7.5];
    let rises = temps.windows(2).filter(|w| w[1] > w[0]).count();
    for (day, t) in temps.iter().enumerate().skip(2) {
        println!("day {day}: {t}");
    }
    println!("{rises} rises");
}
\`\`\`

\`\`\`text
["bob", "kayak", "level"]
4613732
92 Fibonacci numbers fit in a u64
Ok([3, 14, 15])
true
day 2: 4
day 3: 7.5
2 rises
\`\`\`

\`Fib::next\` uses \`?\` on an \`Option\`, so the iterator ends instead of overflowing. Collecting an iterator of \`Result\`s into \`Result<Vec<_>, _>\` stops at the first error and returns it, which is the idiomatic way to parse a list. \`collect\` needs to know what to build, so give the type on the binding or with a turbofish.

Iterator chains compile to the same machine code as hand-written loops, and often better, because slice iterators need no bounds checks. They state intent, filter and map, rather than mechanism, and they cannot index the wrong array. Use a plain \`for\` loop when the body has side effects with complex control flow. Readability decides, not speed.

Read chapter 13.2 of the Book, then browse the \`Iterator\` documentation so that you know which methods exist.`,
          resources: [
            {
              title: 'The Rust Programming Language, 13.2: Processing a Series of Items with Iterators',
              url: 'https://doc.rust-lang.org/book/ch13-02-iterators.html',
              type: 'textbook',
              cost: 'free',
              provider: 'Rust Project',
              note: 'The `Iterator` trait, consuming adapters and iterator adapters. Section 13.4 compares their performance with loops.',
              primary: true,
            },
            {
              title: 'Trait std::iter::Iterator',
              url: 'https://doc.rust-lang.org/std/iter/trait.Iterator.html',
              type: 'documentation',
              cost: 'free',
              provider: 'Rust Project',
              note: 'Read the list of provided methods once. Knowing that `partition`, `scan`, `flat_map` and `max_by_key` exist is most of the skill.',
            },
            {
              title: 'Module std::iter',
              url: 'https://doc.rust-lang.org/std/iter/index.html',
              type: 'documentation',
              cost: 'free',
              provider: 'Rust Project',
              note: 'The three forms of iteration, implementing `Iterator`, `IntoIterator`, and laziness.',
            },
          ],
          exercises: [
            {
              slug: 'loops-to-chains',
              title: 'Rewrite loops as chains',
              prompt:
                'Rewrite each with iterators and no `mut` variables: (a) the sum of squares of the odd numbers in a slice, (b) the index of the first negative number, (c) the longest word in a sentence, first one winning ties, (d) a `HashMap<char, usize>` of letter counts, (e) pairs of adjacent equal elements, (f) all `(i, j)` with `i < j < 5`. Test each, and for (c) explain why `max_by_key` returns the last of equal maxima and how you made the first one win.',
              kind: 'coding',
              difficulty: 2,
              hint: 'For (c), `rev()` before `max_by_key` makes the first maximum the last one seen. Or use `fold` with a strict comparison.',
            },
            {
              slug: 'own-iterator',
              title: 'Implement Iterator',
              prompt:
                'Write `struct Collatz(u64)` whose iterator yields the sequence from its start down to and including 1. Using only adapters and consumers, find the start below 1,000,000 with the longest sequence (expected: 837,799, with 525 terms), and the largest value reached by any sequence starting below 1,000. Then implement `DoubleEndedIterator` for a `struct Range2D { w: u32, h: u32, ... }` that yields `(x, y)` pairs, and show that `.rev()` works on it.',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'iterator-performance',
              title: 'Is the chain as fast as the loop?',
              prompt:
                'Write `fn dot_loop(a: &[f32], b: &[f32]) -> f32` with indexing and `fn dot_iter` with `zip`, `map` and `sum`. In a release build, time both on vectors of 10 million elements, and check the generated code in Compiler Explorer with `-O`. Report which one has bounds checks in the loop and which one vectorises. Explain why the floating-point sum may block vectorisation in both, and what `fold` with several accumulators changes.',
              kind: 'coding',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'What do `v.iter()`, `v.iter_mut()` and `v.into_iter()` yield, and which can you still use `v` after?',
              answerOutline:
                '`&T`, `&mut T` and `T`. After the first two, `v` is still usable. `into_iter` consumes `v`.',
            },
            {
              question: 'Why does `v.iter().map(f);` on its own do nothing?',
              answerOutline:
                'Adapters are lazy. `map` only builds a new iterator, and nothing calls `next` until a consumer pulls the items.',
            },
            {
              question: 'How do you turn an iterator of `Result<T, E>` into a single `Result` of a collection?',
              answerOutline:
                '`collect::<Result<Vec<T>, E>>()`, which stops at the first `Err` and returns it, or gives `Ok` with all the values.',
            },
            {
              question: 'Are iterator chains slower than index loops?',
              answerOutline:
                'No. They compile to equivalent code, often without the bounds checks that indexing needs. Choose by readability.',
            },
          ],
          relatedLessons: ['cpp-programming/standard-library/ranges-and-views'],
        },
        {
          slug: 'box-rc-and-refcell',
          title: 'Box, Rc, RefCell and interior mutability',
          summary:
            'Put values on the heap with `Box`, share ownership with `Rc`, break cycles with `Weak`, and mutate through shared references with `Cell` and `RefCell`, which move the borrow check to run time.',
          estimatedMinutes: 80,
          objectives: [
            'Use `Box` for recursive types and owned trait objects, and read E0072',
            'Share ownership with `Rc` and explain reference counting',
            'Use `RefCell` and `Cell` for interior mutability, and predict when `RefCell` panics',
            'Prevent reference cycles with `Weak`',
            'Decide when an index-based design is better than `Rc<RefCell<T>>`',
          ],
          concepts: [
            '`Box<T>`: one owner, on the heap',
            'Recursive types need indirection',
            '`Rc<T>`: shared, read-only, one thread',
            '`Rc::clone` and `strong_count`',
            'Interior mutability',
            '`Cell<T>` for `Copy` values',
            '`RefCell<T>`: borrow rules at run time',
            '`Weak<T>` breaks cycles',
            'Arenas and indices',
          ],
          explanation: `A **smart pointer** owns a value through a pointer and adds behaviour. \`Box<T>\` is the simplest. It puts a \`T\` on the heap and has one owner, and dropping the box frees the value. You need it in three situations: for **recursive types**, for owned trait objects (\`Box<dyn Trait>\`), and to move a large value cheaply. A type cannot contain itself directly, because it would have infinite size:

\`\`\`rust
enum List {
    Cons(i32, List),
    Nil,
}

fn main() {}
\`\`\`

\`\`\`text
error[E0072]: recursive type \`List\` has infinite size
 --> src/main.rs:1:1
  |
1 | enum List {
  | ^^^^^^^^^
2 |     Cons(i32, List),
  |               ---- recursive without indirection
\`\`\`

The help line suggests \`Box<List>\`, which has the fixed size of a pointer.

\`Rc<T>\` (reference counted) gives a value **several owners**. \`Rc::clone(&rc)\` copies the pointer and increments a count, and the value is dropped when the last \`Rc\` goes away. Through an \`Rc\` you get only shared references, since several owners could otherwise change the value under each other. \`Rc\` is for one thread, and module 6 introduces \`Arc\` for several.

Sometimes you need to change something that is shared. **Interior mutability** types allow mutation through \`&T\` by checking the rules another way. \`Cell<T>\` has \`get\` and \`set\` for \`Copy\` values, and it never hands out references. \`RefCell<T>\` hands out guards from \`borrow()\` and \`borrow_mut()\` and enforces "many readers or one writer" **at run time**:

\`\`\`rust
use std::cell::RefCell;
use std::rc::Rc;

enum Expr {
    Num(f64),
    Add(Box<Expr>, Box<Expr>),
    Mul(Box<Expr>, Box<Expr>),
}

fn eval(e: &Expr) -> f64 {
    match e {
        Expr::Num(n) => *n,
        Expr::Add(a, b) => eval(a) + eval(b),
        Expr::Mul(a, b) => eval(a) * eval(b),
    }
}

struct Account {
    balance: i64,
}

fn main() {
    let sum = Expr::Add(Box::new(Expr::Num(3.0)), Box::new(Expr::Num(4.0)));
    let e = Expr::Mul(Box::new(Expr::Num(2.0)), Box::new(sum));
    println!("{}", eval(&e));

    let shared = Rc::new(RefCell::new(Account { balance: 100 }));
    let alice = Rc::clone(&shared);
    let bob = Rc::clone(&shared);
    alice.borrow_mut().balance -= 30;
    bob.borrow_mut().balance += 5;
    println!("{} owners, balance {}", Rc::strong_count(&shared), shared.borrow().balance);

    let reading = shared.borrow();
    println!("{}", shared.try_borrow_mut().is_err());
    drop(reading);
}
\`\`\`

\`\`\`text
14
3 owners, balance 75
true
\`\`\`

Breaking the rule is not a compile error with \`RefCell\`. It is a **panic**:

\`\`\`rust
use std::cell::RefCell;

fn main() {
    let log = RefCell::new(vec![1, 2, 3]);
    let first = log.borrow();
    log.borrow_mut().push(4);
    println!("{}", first[0]);
}
\`\`\`

\`\`\`text
thread 'main' (13092) panicked at src/main.rs:6:9:
RefCell already borrowed
\`\`\`

The number after the thread name is a thread ID that recent compilers print, and older ones print the message as \`already borrowed: BorrowMutError\`. Keep \`RefCell\` borrows short, and use \`try_borrow_mut\` when a conflict is possible.

Two \`Rc\`s pointing at each other never reach a count of zero, which **leaks** memory. Point "back" with **\`Weak<T>\`**, which does not keep the value alive. Call \`upgrade()\` to get an \`Option<Rc<T>>\`. Often the cleaner design for graphs and trees is no shared ownership at all: store nodes in a \`Vec\` and refer to them by index. Use \`Rc<RefCell<T>>\` when ownership really is shared and dynamic.

Read chapter 15 of the Book.`,
          resources: [
            {
              title: 'The Rust Programming Language, chapter 15: Smart Pointers',
              url: 'https://doc.rust-lang.org/book/ch15-00-smart-pointers.html',
              type: 'textbook',
              cost: 'free',
              provider: 'Rust Project',
              note: '`Box`, `Deref`, `Drop`, `Rc`, `RefCell`, and reference cycles with `Weak`.',
              primary: true,
            },
            {
              title: 'Module std::cell',
              url: 'https://doc.rust-lang.org/std/cell/index.html',
              type: 'documentation',
              cost: 'free',
              provider: 'Rust Project',
              note: 'When interior mutability is the right tool, and the differences between `Cell`, `RefCell` and `OnceCell`.',
            },
            {
              title: 'Rust by Example: Rc',
              url: 'https://doc.rust-lang.org/rust-by-example/std/rc.html',
              type: 'interactive',
              cost: 'free',
              provider: 'Rust Project',
              note: 'Reference counts as clones are made and dropped.',
            },
          ],
          exercises: [
            {
              slug: 'expression-simplifier',
              title: 'A boxed expression tree',
              prompt:
                'Extend `Expr` with `Var(String)`, `Neg(Box<Expr>)` and `Pow(Box<Expr>, u32)`. Write `eval(&self, vars: &HashMap<String, f64>) -> Result<f64, String>` and `simplify(self) -> Expr` that folds constants and applies `x + 0`, `x * 1`, `x * 0` and `--x`. Implement `Display` with the fewest parentheses that keep the meaning. Expected: `(x + 0) * (2 + 3)` simplifies to `x * 5`, and evaluates to 15 with x = 3.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'observer-with-weak',
              title: 'Observers without leaks',
              prompt:
                'Write a `Subject` that keeps `Vec<Weak<RefCell<Counter>>>` observers, and `notify(&self)` that increments each live observer and removes dead ones. Show that dropping an observer\'s last `Rc` removes it on the next `notify`. Then change the list to strong `Rc`s, and use `Rc::strong_count` to show that a dropped observer stays alive. Finally build a two-node cycle of `Rc<RefCell<Node>>` and prove the leak with a `Drop` implementation that never prints.',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'indices-instead',
              title: 'A graph with indices',
              prompt:
                'Implement a directed graph as `struct Graph { names: Vec<String>, edges: Vec<Vec<usize>> }` with `add_node`, `add_edge` and `fn reachable(&self, from: usize) -> Vec<usize>` using an explicit stack. Then write the same with `Rc<RefCell<Node>>` and `Weak` back-edges. Compare the two on lines of code, the number of `borrow()` calls, and what happens on a cycle, and write a paragraph on which design you would choose and why.',
              kind: 'writing',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does `enum List { Cons(i32, List), Nil }` not compile, and how does `Box` fix it?',
              answerOutline:
                'Its size would be infinite, since each `List` contains another `List`. A `Box<List>` is one pointer of fixed size, with the rest on the heap.',
            },
            {
              question: 'What does `RefCell` give up compared with ordinary borrowing?',
              answerOutline:
                'Compile-time checking: violations become run-time panics, and every borrow costs a check of a counter.',
            },
            {
              question: 'How do two `Rc`s leak, and how does `Weak` prevent it?',
              answerOutline:
                'In a cycle each keeps the other\'s strong count above zero, so neither is dropped. A `Weak` reference does not count, so the cycle can be broken.',
            },
            {
              question: 'When would you store nodes in a `Vec` and use indices instead of `Rc<RefCell<Node>>`?',
              answerOutline:
                'For graphs and trees owned by one structure: indices are simpler, faster and cache-friendly, with no run-time borrow checks or leaks. The cost is that a stale index is a logic error rather than a type error.',
            },
          ],
          relatedLessons: ['systems-programming/ownership-and-safe-concurrency/lifetimes-and-smart-pointers'],
        },
      ],
    },
    {
      slug: 'concurrency',
      title: 'Concurrency',
      description:
        'Threads that cannot race on data, because `Send` and `Sync` make thread safety part of the type system. Pass messages over channels, share state with `Arc`, `Mutex` and atomics, and write async code with Tokio for programs that spend most of their time waiting.',
      lessons: [
        {
          slug: 'threads-send-and-sync',
          title: 'Threads, Send and Sync',
          summary:
            'Spawn threads, move data into them, borrow local data safely with scoped threads, and see how the `Send` and `Sync` marker traits turn data races into compile errors.',
          estimatedMinutes: 75,
          objectives: [
            'Spawn threads, join them, and handle a thread that panicked',
            'Read E0373 and choose between `move` and scoped threads',
            'Split work across threads with `std::thread::scope` while borrowing local data',
            'Explain `Send` and `Sync`, and why `Rc` is neither',
          ],
          concepts: [
            '`thread::spawn` and `JoinHandle`',
            '`join()` returns a `Result`',
            '`move` closures for threads',
            '`F: Send + \'static`',
            '`thread::scope`',
            '`Send`: safe to move to another thread',
            '`Sync`: safe to share `&T` between threads',
            'Data race freedom',
          ],
          explanation: `\`std::thread::spawn\` runs a closure on a new operating system thread and returns a \`JoinHandle\`. \`join()\` waits for it and returns \`Ok(value)\`, or \`Err\` if the thread panicked, so one thread's panic never silently takes down another. The new thread may outlive the function that created it, so the closure must not borrow anything local, and the compiler says so:

\`\`\`rust
use std::thread;

fn main() {
    let data = vec![1, 2, 3];
    let handle = thread::spawn(|| {
        println!("{}", data.len());
    });
    handle.join().unwrap();
}
\`\`\`

\`\`\`text
error[E0373]: closure may outlive the current function, but it borrows \`data\`, which is owned by the current function
 --> src/main.rs:5:32
  |
5 |     let handle = thread::spawn(|| {
  |                                ^^ may outlive borrowed value \`data\`
6 |         println!("{}", data.len());
  |                        ---- \`data\` is borrowed here
\`\`\`

Its help line suggests \`move\`, which moves \`data\` into the thread. That is right when the thread should own it. When threads only need to **borrow** local data for a while, use **scoped threads**. Every thread spawned inside \`thread::scope\` is joined before the scope returns, so borrowing is safe:

\`\`\`rust
use std::thread;

fn main() {
    let numbers: Vec<u64> = (1..=1_000_000).collect();
    let chunk = numbers.len() / 4;
    let total: u64 = thread::scope(|s| {
        let handles: Vec<_> = numbers
            .chunks(chunk)
            .map(|part| s.spawn(move || part.iter().sum::<u64>()))
            .collect();
        handles.into_iter().map(|h| h.join().unwrap()).sum()
    });
    println!("{total}");

    let owned = String::from("moved into the thread");
    let h = thread::spawn(move || owned.len());
    println!("{}", h.join().unwrap());
}
\`\`\`

\`\`\`text
500000500000
21
\`\`\`

\`move\` in the scoped version moves the slice reference \`part\`, not the data. The \`collect\` into a \`Vec\` matters: without it, the lazy \`map\` would spawn and join one thread at a time.

Two marker traits make this safe. A type is **\`Send\`** if it is safe to move to another thread, and **\`Sync\`** if it is safe for several threads to hold \`&T\` at once. The compiler implements them automatically for types built from \`Send\` and \`Sync\` parts, and \`spawn\` requires its closure to be \`Send\`. \`Rc\` updates its count without atomic instructions, so two threads cloning it could corrupt the count. It is therefore neither:

\`\`\`rust
use std::rc::Rc;
use std::thread;

fn main() {
    let shared = Rc::new(5);
    let handle = thread::spawn(move || println!("{shared}"));
    handle.join().unwrap();
}
\`\`\`

\`\`\`text
error[E0277]: \`Rc<i32>\` cannot be sent between threads safely
\`\`\`

\`RefCell\` is \`Send\` but not \`Sync\`, and raw pointers are neither. Together with the borrowing rules, this means **safe Rust has no data races**. It can still have deadlocks and logic races, such as two threads that each read and then write. Read chapter 16.1 and 16.4 of the Book.`,
          resources: [
            {
              title: 'The Rust Programming Language, chapter 16: Fearless Concurrency',
              url: 'https://doc.rust-lang.org/book/ch16-00-concurrency.html',
              type: 'textbook',
              cost: 'free',
              provider: 'Rust Project',
              note: 'Read 16.1 on threads and 16.4 on `Send` and `Sync` for this lesson.',
              primary: true,
            },
            {
              title: 'Function std::thread::scope',
              url: 'https://doc.rust-lang.org/std/thread/fn.scope.html',
              type: 'documentation',
              cost: 'free',
              provider: 'Rust Project',
              note: 'The guarantees of scoped threads, with examples of borrowing and mutating local data.',
            },
            {
              title: 'Rust Atomics and Locks, chapter 1: Basics of Rust Concurrency',
              url: 'https://marabos.nl/atomics/',
              type: 'textbook',
              cost: 'free',
              provider: 'Mara Bos',
              note: 'Free online. Chapter 1 covers threads, scoped threads, `Send`, `Sync` and interior mutability across threads.',
            },
          ],
          exercises: [
            {
              slug: 'parallel-prime-count',
              title: 'Count primes in parallel',
              prompt:
                'Count the primes below 20,000,000 with a sieve of Eratosthenes split into segments, one per thread, using `thread::scope` and `std::thread::available_parallelism()`. Expected count: 1,270,607. Time 1, 2, 4 and 8 threads in release mode, report the speedup, and explain where it stops improving on your machine. Each thread must write only to its own segment, with no locks.',
              kind: 'coding',
              difficulty: 2,
              hint: 'Each segment needs the base primes up to the square root of 20,000,000, which is about 4,472. Compute those first on one thread and share them with `&`.',
            },
            {
              slug: 'panicking-thread',
              title: 'A thread that panics',
              prompt:
                'Spawn four threads in which the third panics with `"bad input"`. Join all four and print which ones succeeded, recovering the panic message from the `Err` by downcasting the payload to `&str`. Then do the same inside `thread::scope`, and record what the scope does when a thread panics and nobody joins it explicitly.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'send-sync-table',
              title: 'Send and Sync by hand',
              prompt:
                'For `i32`, `String`, `&str`, `Rc<i32>`, `Arc<i32>`, `Cell<i32>`, `RefCell<i32>`, `Mutex<i32>`, `Arc<RefCell<i32>>` and `*const i32`, predict whether each is `Send` and whether it is `Sync`. Check with two functions, `fn is_send<T: Send>() {}` and `fn is_sync<T: Sync>() {}`, and explain each case where you were wrong, in particular `Arc<RefCell<i32>>`.',
              kind: 'problem',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does `thread::spawn` require `\'static`, and how does `thread::scope` avoid that requirement?',
              answerOutline:
                'A spawned thread may outlive the caller, so it cannot borrow the caller\'s locals. A scope joins all its threads before returning, so borrows of data outside the scope stay valid.',
            },
            {
              question: 'Define `Send` and `Sync`.',
              answerOutline:
                '`Send`: ownership can move to another thread safely. `Sync`: `&T` can be shared between threads safely, which is the same as `&T` being `Send`.',
            },
            {
              question: 'Why is `Rc` not `Send`?',
              answerOutline:
                'Its reference count is updated without atomic operations, so concurrent clones or drops on two threads could corrupt it and free the value too early.',
            },
            {
              question: 'Does "no data races" mean "no concurrency bugs"?',
              answerOutline:
                'No. Deadlocks, livelocks and higher-level race conditions, such as an unprotected check followed by an update, are still possible.',
            },
          ],
          relatedLessons: [
            'operating-systems/concurrency/threads-and-races',
            'systems-programming/ownership-and-safe-concurrency/fearless-concurrency',
          ],
        },
        {
          slug: 'channels-and-message-passing',
          title: 'Channels and message passing',
          summary:
            'Send owned values between threads over `mpsc` channels, use bounded channels for back-pressure, build pipelines of stages, and avoid the classic hang of a sender that is never dropped.',
          estimatedMinutes: 65,
          objectives: [
            'Create channels, send owned values and receive them, including from several producers',
            'Explain how a receiver loop ends and why a forgotten `Sender` makes it hang',
            'Use `sync_channel` to bound a queue and apply back-pressure',
            'Design a pipeline of threads connected by channels',
          ],
          concepts: [
            '`mpsc::channel`: unbounded queue',
            '`Sender` and `Receiver`',
            'Cloning senders for many producers',
            'Sending transfers ownership',
            'Iteration ends when all senders drop',
            '`sync_channel(n)`: bounded, blocks when full',
            'Back-pressure',
            'Pipelines',
          ],
          explanation: `"Do not communicate by sharing memory; share memory by communicating." A **channel** is a queue between threads. \`std::sync::mpsc::channel()\` returns a \`Sender<T>\` and a \`Receiver<T>\`, where mpsc stands for "multiple producer, single consumer". \`send\` **moves** the value into the channel, so the sending thread can no longer touch it, and that is why passing messages needs no locks. \`recv\` blocks until a value arrives, and returns \`Err\` once every \`Sender\` has been dropped and the queue is empty. Iterating over the receiver uses exactly that to end the loop.

\`\`\`rust
use std::sync::mpsc;
use std::thread;

fn main() {
    let (tx, rx) = mpsc::channel();
    let mut handles = Vec::new();
    for id in 0..3 {
        let tx = tx.clone();
        handles.push(thread::spawn(move || {
            for n in 0..4 {
                tx.send((id, n * n)).unwrap();
            }
        }));
    }
    drop(tx);

    let mut results: Vec<(i32, i32)> = rx.iter().collect();
    results.sort();
    println!("{} messages, first {:?}, last {:?}", results.len(), results[0], results[results.len() - 1]);
    for h in handles {
        h.join().unwrap();
    }

    let (slow_tx, slow_rx) = mpsc::sync_channel(1);
    let producer = thread::spawn(move || {
        for i in 0..3 {
            slow_tx.send(i).unwrap();
        }
    });
    let received: Vec<i32> = slow_rx.iter().collect();
    producer.join().unwrap();
    println!("{received:?}");
}
\`\`\`

\`\`\`text
12 messages, first (0, 0), last (2, 9)
[0, 1, 2]
\`\`\`

Each producer gets its own clone of \`tx\`. The line \`drop(tx)\` is essential. Without it, \`main\` still holds a \`Sender\`, so \`rx.iter()\` waits forever for a message that will never come. This is the most common channel bug. Messages from different producers interleave in an unpredictable order, which is why the results are sorted before printing.

\`channel()\` is **unbounded**: if producers are faster than the consumer, memory grows without limit. \`sync_channel(n)\` holds at most \`n\` messages, and \`send\` **blocks** when it is full. This **back-pressure** slows producers to the speed of the consumer. With \`n = 0\`, every send waits for a matching receive, which is called a rendezvous.

Channels compose into **pipelines**: a reader thread sends lines to a parser thread, which sends records to a writer thread. Each stage owns its state and runs in parallel with the others, and the bounded channels between them limit memory. To have several workers take jobs from one queue, share the \`Receiver\` behind \`Arc<Mutex<_>>\`, which is the next lesson, or use a multi-consumer channel crate such as \`crossbeam-channel\`. The standard library's \`mpsc\` has been built on the crossbeam implementation since Rust 1.67.

Read chapter 16.2 of the Book.`,
          resources: [
            {
              title: 'The Rust Programming Language, 16.2: Using Message Passing to Transfer Data Between Threads',
              url: 'https://doc.rust-lang.org/book/ch16-02-message-passing.html',
              type: 'textbook',
              cost: 'free',
              provider: 'Rust Project',
              note: 'Channels, ownership transfer, and multiple producers.',
              primary: true,
            },
            {
              title: 'Module std::sync::mpsc',
              url: 'https://doc.rust-lang.org/std/sync/mpsc/index.html',
              type: 'documentation',
              cost: 'free',
              provider: 'Rust Project',
              note: 'Unbounded, bounded and rendezvous channels, and the disconnection rules.',
            },
            {
              title: 'Rust by Example: Channels',
              url: 'https://doc.rust-lang.org/rust-by-example/std_misc/channels.html',
              type: 'interactive',
              cost: 'free',
              provider: 'Rust Project',
              note: 'A short complete example to modify and run.',
            },
          ],
          exercises: [
            {
              slug: 'three-stage-pipeline',
              title: 'A three-stage pipeline',
              prompt:
                'Build a pipeline of three threads connected by `sync_channel(64)`: a reader that sends each line of a text file, a stage that counts the words in each line and sends `(line_number, count)`, and a collector that sums the counts and records the longest line. Make the middle stage deliberately slow with a 1 ms sleep per line, and show with a memory measurement or a counter that the reader never gets more than 64 lines ahead. Compare the total time with a single-threaded version.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'find-the-hang',
              title: 'Find the hang',
              prompt:
                'Write a program in which four worker threads send results over clones of one `Sender` and `main` loops with `for r in rx`. First, forget to drop the original `Sender`, and observe the hang. Then fix it in two ways: with `drop(tx)`, and by restructuring so that the original sender is moved into the last worker. Write one sentence on how you would spot this bug in a code review.',
              kind: 'coding',
              difficulty: 1,
            },
            {
              slug: 'fan-out-fan-in',
              title: 'Fan out, fan in, keep the order',
              prompt:
                'Hash 1,000 strings with an expensive function, spread over 4 workers that share an `Arc<Mutex<Receiver<(usize, String)>>>` of jobs. Workers send `(index, hash)` back on one results channel. Reassemble the results in input order without sorting the whole output at the end, using a `BTreeMap` or a buffer of pending results. Verify the output matches a sequential run exactly.',
              kind: 'coding',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'When does `for msg in rx` end?',
              answerOutline:
                'When every `Sender` (all clones, including the original) has been dropped and the queue is empty.',
            },
            {
              question: 'Why does sending a value need no lock?',
              answerOutline:
                '`send` moves ownership into the channel, so the sender cannot access the value afterwards, and only one thread ever owns it.',
            },
            {
              question: 'What is back-pressure, and how does `sync_channel` provide it?',
              answerOutline:
                'Slowing producers to the rate of the consumer. A bounded channel blocks `send` when it is full, so memory stays bounded.',
            },
          ],
          relatedLessons: ['go-programming/concurrency/channels-and-select'],
        },
        {
          slug: 'shared-state-arc-mutex',
          title: 'Shared state: Arc, Mutex, RwLock and atomics',
          summary:
            'Share data between threads with `Arc`, protect it with `Mutex` or `RwLock`, use atomics for counters and flags, keep lock guards short-lived, and initialise globals with `OnceLock` and `LazyLock`.',
          estimatedMinutes: 80,
          objectives: [
            'Share ownership across threads with `Arc`, and mutate shared data through `Mutex` and `RwLock`',
            'Explain lock guards, poisoning, and how long a guard lives in `let`, `match` and `while let`',
            'Use atomic types for counters and flags, and explain `Ordering::Relaxed`',
            'Avoid deadlocks by ordering locks and keeping critical sections short',
            'Initialise shared global state with `OnceLock` and `LazyLock`',
          ],
          concepts: [
            '`Arc<T>`: atomic reference count',
            '`Mutex<T>` owns the data it protects',
            '`MutexGuard` unlocks on drop',
            'Poisoning after a panic',
            '`RwLock`: many readers or one writer',
            'Atomics: `AtomicUsize`, `fetch_add`',
            '`Ordering::Relaxed` for counters',
            'Deadlock and lock ordering',
            '`OnceLock`, `LazyLock`',
          ],
          explanation: `To share a value between threads, wrap it in **\`Arc<T>\`**, an \`Rc\` whose count is updated atomically. Like \`Rc\`, it only gives shared access. To mutate through it, add a lock. Rust's **\`Mutex<T>\`** **owns** the data it protects, so you cannot touch the data without locking. \`lock()\` returns a \`MutexGuard\`, which dereferences to the data and unlocks when it is dropped. Forgetting to unlock is impossible, and so is touching the data after unlocking.

\`\`\`rust
use std::collections::BTreeMap;
use std::sync::atomic::{AtomicUsize, Ordering};
use std::sync::{Arc, Mutex};
use std::thread;

fn is_prime(n: u64) -> bool {
    n >= 2 && (2..).take_while(|d| d * d <= n).all(|d| !n.is_multiple_of(d))
}

fn next_job(jobs: &Mutex<Vec<u64>>) -> Option<u64> {
    jobs.lock().unwrap().pop()
}

fn main() {
    let jobs = Arc::new(Mutex::new((1..=10_000u64).collect::<Vec<_>>()));
    let by_last_digit = Arc::new(Mutex::new(BTreeMap::new()));
    let processed = Arc::new(AtomicUsize::new(0));

    let mut handles = Vec::new();
    for _ in 0..4 {
        let jobs = Arc::clone(&jobs);
        let results = Arc::clone(&by_last_digit);
        let processed = Arc::clone(&processed);
        handles.push(thread::spawn(move || {
            while let Some(n) = next_job(&jobs) {
                processed.fetch_add(1, Ordering::Relaxed);
                if is_prime(n) {
                    *results.lock().unwrap().entry(n % 10).or_insert(0) += 1;
                }
            }
        }));
    }
    for h in handles {
        h.join().unwrap();
    }
    println!("processed {}", processed.load(Ordering::Relaxed));
    println!("{:?}", by_last_digit.lock().unwrap());
}
\`\`\`

\`\`\`text
processed 10000
{1: 306, 2: 1, 3: 310, 5: 1, 7: 308, 9: 303}
\`\`\`

The helper \`next_job\` matters. In \`while let Some(n) = jobs.lock().unwrap().pop() { ... }\`, the guard is a temporary in the condition, and it lives until the end of the **loop body**, so the lock would be held during \`is_prime\` and the four threads would run one at a time. Inside \`next_job\`, the guard is dropped when the function returns. Temporaries in a \`let\` statement are dropped at its semicolon, and the 2024 edition drops those of an \`if let\` condition before its \`else\` block. When in doubt, bind the guard to a variable and end its scope with a block.

If a thread panics while holding a lock, the mutex is **poisoned**, and later \`lock()\` calls return \`Err\`, so that nobody silently uses half-updated data. \`unwrap()\` there turns a bug in one thread into a visible failure. **\`RwLock\`** allows many readers or one writer, which helps when reads dominate and are slow. **Deadlock** happens when two threads take two locks in opposite orders, so always take locks in one global order and never call unknown code while holding one.

For a single counter or flag, a lock is overkill. **Atomic** types such as \`AtomicUsize\` and \`AtomicBool\` have operations like \`fetch_add\` that the CPU performs indivisibly. The \`Ordering\` argument controls how the operation orders other memory accesses. \`Relaxed\` is enough for a counter that is only read after \`join\`, because \`join\` itself synchronises. Publishing data from one thread to another needs \`Release\` and \`Acquire\`. Mara Bos's book explains why.

For global state, \`static CONFIG: OnceLock<Config> = OnceLock::new();\` is set once at run time, and \`static RE: LazyLock<Regex> = LazyLock::new(|| ...)\` initialises itself on first use. In the 2024 edition, taking a reference to a \`static mut\` is an error, so these types replace it. Read chapter 16.3 of the Book.`,
          resources: [
            {
              title: 'The Rust Programming Language, 16.3: Shared-State Concurrency',
              url: 'https://doc.rust-lang.org/book/ch16-03-shared-state.html',
              type: 'textbook',
              cost: 'free',
              provider: 'Rust Project',
              note: '`Mutex`, `Arc`, and the similarities between `RefCell`/`Rc` and `Mutex`/`Arc`.',
              primary: true,
            },
            {
              title: 'Rust Atomics and Locks',
              url: 'https://marabos.nl/atomics/',
              type: 'textbook',
              cost: 'free',
              provider: 'Mara Bos',
              note: 'Chapters 2 and 3 on atomics and memory ordering. The clearest treatment available.',
            },
            {
              title: 'Module std::sync',
              url: 'https://doc.rust-lang.org/std/sync/index.html',
              type: 'documentation',
              cost: 'free',
              provider: 'Rust Project',
              note: 'An overview of every synchronisation type, including `Condvar`, `Barrier`, `OnceLock` and `LazyLock`.',
            },
          ],
          exercises: [
            {
              slug: 'bank-transfers',
              title: 'Transfers without deadlock',
              prompt:
                'Model 10 accounts as `Vec<Mutex<i64>>`, each starting at 1,000. Run 8 threads that each make 100,000 random transfers of 1 to 10 between two different accounts, locking both. First lock in the order given by the transfer, and show that it deadlocks (add a short sleep between the two locks to make it happen quickly). Then lock in index order and show that it completes, with the total still exactly 10,000.',
              kind: 'coding',
              difficulty: 2,
              hint: 'Seed the random generator in each thread from its index so that runs are reproducible.',
            },
            {
              slug: 'guard-lifetimes',
              title: 'How long does the guard live?',
              prompt:
                'Using a `Mutex<Vec<i32>>` and `try_lock()` to test whether it is still held, write five snippets and record, for each, whether the lock is held on the next line: a guard in `let`, a temporary in an expression statement, the condition of `while let`, the scrutinee of a `match`, and the condition of an `if let` with an `else` block (compare edition 2021 and 2024 for the last). Summarise the rules in a table.',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'atomic-vs-mutex',
              title: 'Atomic or Mutex?',
              prompt:
                'Count to 10,000,000 across 8 threads in three ways: `Mutex<u64>`, `AtomicU64` with `fetch_add`, and per-thread local counts summed at the end. Time each in release mode and explain the ranking, including what cache-line contention does to the atomic version. Then add a requirement to record the maximum value seen so far, and implement it with `fetch_max`.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does Rust\'s `Mutex<T>` own its data instead of being a separate lock object?',
              answerOutline:
                'The data is reachable only through the guard that `lock()` returns, so it is impossible to access it without holding the lock, and the guard unlocks on drop.',
            },
            {
              question: 'Why is `while let Some(job) = queue.lock().unwrap().pop()` a performance bug?',
              answerOutline:
                'The guard is a temporary in the condition and lives for the whole loop body, so the lock is held while processing the job and the threads are serialised.',
            },
            {
              question: 'What does a poisoned mutex tell you?',
              answerOutline:
                'A thread panicked while holding the lock, so the protected data may be in an inconsistent state. `lock` returns `Err` but you can still recover the guard deliberately.',
            },
            {
              question: 'When is `Ordering::Relaxed` correct?',
              answerOutline:
                'When only the atomic value itself matters, such as a counter read after `join`, and no other memory needs to be ordered relative to it.',
            },
          ],
          relatedLessons: [
            'operating-systems/concurrency/locks',
            'cpp-programming/concurrency/atomics-and-the-memory-model',
          ],
        },
        {
          slug: 'async-await-with-tokio',
          title: 'Async and await with Tokio',
          summary:
            'Futures are lazy state machines that an executor polls. Write `async fn`s, run them concurrently with `join!`, `spawn` and `select!` on the Tokio runtime, add timeouts, and never block the executor.',
          estimatedMinutes: 90,
          objectives: [
            'Explain what a future is, why it is lazy, and what `.await` does',
            'Run async code on Tokio, and run tasks concurrently with `join!` and `tokio::spawn`',
            'Use timeouts, `select!` and cancellation by dropping a future',
            'Keep blocking work off the executor with `spawn_blocking`',
            'Read the "future cannot be sent between threads safely" error and fix it',
          ],
          concepts: [
            '`Future` and `poll`',
            '`async fn` returns a future',
            '`.await` suspends without blocking the thread',
            'Executor and runtime: Tokio',
            '`#[tokio::main]`',
            '`tokio::spawn`: `Send + \'static` tasks',
            '`join!`, `select!`, `timeout`',
            'Cancellation by drop',
            '`spawn_blocking`',
          ],
          explanation: `Threads are a good fit for a few CPU-heavy jobs. A server with 10,000 connections spends almost all its time **waiting**, and 10,000 threads are expensive. **Async** code lets one thread juggle many waiting tasks. An \`async fn\` does not run when called. It returns a **future**, a state machine that the compiler generates, holding the function's local variables. An **executor** calls the future's \`poll\` method. The future runs until it reaches an \`.await\` on something not ready yet, records where it stopped, and returns \`Pending\`, which frees the thread for other tasks. When the operating system reports that the socket or timer is ready, the executor polls it again. **Futures are lazy**: one that is never awaited or spawned never runs.

The standard library defines \`Future\` but includes no executor. **Tokio** is the most widely used one. Add \`tokio = { version = "1", features = ["full"] }\` to \`Cargo.toml\`.

\`\`\`rust
use std::time::Duration;
use tokio::time::{Instant, sleep, timeout};

async fn fetch(name: &str, ms: u64) -> String {
    sleep(Duration::from_millis(ms)).await;
    format!("{name} after {ms} ms")
}

#[tokio::main]
async fn main() {
    let start = Instant::now();
    let (a, b) = tokio::join!(fetch("users", 200), fetch("orders", 300));
    println!("{a}; {b}");
    println!("concurrent: {}", start.elapsed() < Duration::from_millis(450));

    let handles: Vec<_> = (1..=3)
        .map(|i| tokio::spawn(async move { fetch("task", i * 50).await.len() }))
        .collect();
    let mut total = 0;
    for h in handles {
        total += h.await.unwrap();
    }
    println!("{total}");

    match timeout(Duration::from_millis(100), fetch("slow", 1000)).await {
        Ok(s) => println!("{s}"),
        Err(_) => println!("slow request timed out"),
    }

    let product = tokio::task::spawn_blocking(|| (1..=20u64).product::<u64>()).await.unwrap();
    println!("{product}");
}
\`\`\`

\`\`\`text
users after 200 ms; orders after 300 ms
concurrent: true
50
slow request timed out
2432902008176640000
\`\`\`

\`join!\` runs both futures concurrently in the current task, so the pair takes about 300 ms, not 500. **\`tokio::spawn\`** hands a future to the runtime as an independent **task**, which may run on any worker thread, and returns a \`JoinHandle\` to await. Because tasks move between threads, a spawned future must be \`Send + 'static\`. \`timeout\` gives up by **dropping** the inner future, which is how cancellation works in Rust: a dropped future simply never runs again. \`tokio::select!\` waits for the first of several futures and drops the others.

**Never block the executor.** \`std::thread::sleep\`, a long computation or a blocking file read inside an async task stops every other task on that thread. Use the async versions (\`tokio::time::sleep\`, \`tokio::fs\`), and move CPU-heavy or blocking work to \`spawn_blocking\`, which runs it on a separate thread pool.

The \`Send\` rule produces an error worth learning to read. If a task holds a \`std::sync::MutexGuard\` across an \`.await\`, the future stores the guard, the guard is not \`Send\`, so neither is the future, and \`tokio::spawn\` rejects it with \`error: future cannot be sent between threads safely\`. The labels point at the guard and at the \`.await\` it lives across. Drop the guard before awaiting, or use \`tokio::sync::Mutex\` when a lock really must be held across an \`.await\`.

Work through the Tokio tutorial up to "Channels", and read chapter 17 of the Book.`,
          resources: [
            {
              title: 'Tokio tutorial',
              url: 'https://tokio.rs/tokio/tutorial',
              type: 'documentation',
              cost: 'free',
              provider: 'Tokio project',
              note: 'Builds a mini Redis step by step. Do "Spawning", "Shared state", "Channels" and "Select".',
              primary: true,
            },
            {
              title: 'The Rust Programming Language, chapter 17: Fundamentals of Asynchronous Programming',
              url: 'https://doc.rust-lang.org/book/ch17-00-async-await.html',
              type: 'textbook',
              cost: 'free',
              provider: 'Rust Project',
              note: 'Futures, `async` and `await`, concurrency with async, and how futures and threads compare.',
            },
            {
              title: 'Asynchronous Programming in Rust (the async book)',
              url: 'https://rust-lang.github.io/async-book/',
              type: 'textbook',
              cost: 'free',
              provider: 'Rust Project',
              note: 'Deeper material on how futures, wakers and pinning work under the hood.',
            },
          ],
          exercises: [
            {
              slug: 'concurrent-port-checker',
              title: 'A concurrent port checker',
              prompt:
                'Write an async program that tries to open a `tokio::net::TcpStream` to `127.0.0.1` on ports 1 to 1024, at most 100 at a time using a `tokio::sync::Semaphore`, each with a 200 ms `timeout`. Start a few listeners yourself with `tokio::net::TcpListener` on known ports so that the expected output is known, and print the open ports in ascending order. Report the total time, and compare it with a sequential version.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'block-the-executor',
              title: 'Block the executor on purpose',
              prompt:
                'Run 10 tasks on a `current_thread` runtime, each printing a timestamp and then awaiting `tokio::time::sleep(100 ms)`, and show that they all finish in about 100 ms. Replace the sleep in one task with `std::thread::sleep`, and show how the timestamps change for every task. Then move that blocking call into `spawn_blocking`, and confirm the others are unaffected again.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'not-send-future',
              title: 'Fix a future that is not Send',
              prompt:
                'Write a `tokio::spawn`ed task that locks a `std::sync::Mutex<u32>`, awaits `sleep(10 ms)`, then increments the value through the guard. Record the full error, and identify the label naming the non-`Send` type and the one naming the `.await`. Fix it twice: by restructuring so the guard is dropped before the `.await`, and with `tokio::sync::Mutex`. Explain when each fix is the right one.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What happens when you call an `async fn` but never `.await` or spawn the result?',
              answerOutline:
                'Nothing runs. The call only builds the future, and futures do nothing until they are polled. The compiler warns about the unused future.',
            },
            {
              question: 'What is the difference between `join!(a, b)` and spawning `a` and `b` with `tokio::spawn`?',
              answerOutline:
                '`join!` runs both concurrently inside the current task, on one thread, and they may borrow local data. Spawned tasks are independent, may run in parallel on other threads, and must be `Send + \'static`.',
            },
            {
              question: 'Why is calling `std::thread::sleep` inside an async task harmful?',
              answerOutline:
                'It blocks the worker thread, so no other task scheduled on that thread can make progress until it returns.',
            },
            {
              question: 'How does `timeout` cancel the operation it wraps?',
              answerOutline:
                'When the deadline passes, it drops the inner future, which is never polled again, and its destructors clean up its state.',
            },
          ],
          relatedLessons: ['go-programming/concurrency/context-and-cancellation'],
        },
      ],
    },
    {
      slug: 'beyond-safe-rust',
      title: 'Beyond Safe Rust',
      description:
        'The parts of Rust you use rarely but must use well: `unsafe` code and the contract it must uphold, calling C and being called from C, declarative macros, and the tools for shipping a crate, which are benchmarks, documentation with tested examples, and publishing.',
      lessons: [
        {
          slug: 'unsafe-and-its-contract',
          title: 'Unsafe Rust and its contract',
          summary:
            'What `unsafe` permits and what it does not, why every `unsafe` block has a safety contract, how to write a sound safe API on top of raw pointers, what the 2024 edition changed, and how Miri finds undefined behaviour.',
          estimatedMinutes: 85,
          objectives: [
            'List the operations that require `unsafe`, and explain that the borrow checker still runs inside it',
            'Write an `unsafe` block with a `// SAFETY:` comment that proves its preconditions',
            'Write an `unsafe fn` with a `# Safety` section, and explain the 2024 `unsafe_op_in_unsafe_fn` lint',
            'Define soundness, and check whether a safe function wrapping `unsafe` code is sound',
            'Run Miri to detect undefined behaviour in tests',
          ],
          concepts: [
            'The unsafe operations: raw pointer dereference, unsafe calls, `static mut`, unsafe traits, union fields',
            'Undefined behaviour',
            '`// SAFETY:` comments',
            '`unsafe fn` and `# Safety` docs',
            'Soundness of a safe API',
            '2024: `unsafe_op_in_unsafe_fn`, `unsafe extern`, `#[unsafe(no_mangle)]`',
            '2024: `std::env::set_var` is unsafe',
            'Miri',
          ],
          explanation: `Some correct programs cannot be proven correct by the compiler: the internals of \`Vec\`, calls into C, and memory-mapped hardware. \`unsafe\` lets you take responsibility for those. Inside an \`unsafe\` block you may do five extra things: dereference a raw pointer (\`*const T\`, \`*mut T\`), call an \`unsafe fn\`, read or write a \`static mut\`, implement an \`unsafe trait\` such as \`Send\`, and read a \`union\` field. **Nothing else changes.** Types and the borrow checker still apply to references. What changes is who guarantees the absence of **undefined behaviour** (UB), such as dangling pointers, data races, aliasing a \`&mut\`, invalid values like a \`bool\` holding 2, or reading uninitialised memory. With UB, the compiler's assumptions are false and anything can happen.

The discipline is to keep \`unsafe\` small and to write down why each block is fine:

\`\`\`rust
/// Returns mutable references to two different elements.
///
/// # Panics
/// If \`i == j\` or either index is out of bounds.
fn two_mut<T>(v: &mut [T], i: usize, j: usize) -> (&mut T, &mut T) {
    assert!(i != j, "indices must differ");
    assert!(i < v.len() && j < v.len(), "index out of bounds");
    let ptr = v.as_mut_ptr();
    // SAFETY: i and j are in bounds and different, so the two references
    // point to distinct elements of a slice we borrow mutably, and never alias.
    unsafe { (&mut *ptr.add(i), &mut *ptr.add(j)) }
}

fn main() {
    let mut scores = [10, 20, 30];
    let (a, b) = two_mut(&mut scores, 0, 2);
    std::mem::swap(a, b);
    println!("{scores:?}");

    let [x, y] = scores.get_disjoint_mut([0, 1]).unwrap();
    *x += *y;
    println!("{scores:?}");
}
\`\`\`

\`\`\`text
[30, 20, 10]
[50, 20, 10]
\`\`\`

\`two_mut\` is **sound**: no safe caller, with any arguments, can cause UB through it, because the \`assert!\`s establish what the \`unsafe\` block relies on. Remove the \`i != j\` check and it becomes unsound, since two \`&mut\` to the same element is UB even if nothing goes wrong in testing. Before writing \`unsafe\`, check the standard library. Here, \`get_disjoint_mut\` (Rust 1.86) already does the job safely, as the second half shows.

An \`unsafe fn\` is one whose **callers** must uphold a contract, documented under \`# Safety\`. In the 2024 edition, the body of an \`unsafe fn\` is no longer an implicit \`unsafe\` block, so each unsafe operation inside needs its own block and its own justification:

\`\`\`rust
/// # Safety
/// \`p\` must be non-null, aligned and point to a live \`i32\`.
unsafe fn read_twice(p: *const i32) -> i32 {
    *p + *p
}

fn main() {
    let x = 21;
    println!("{}", unsafe { read_twice(&x) });
}
\`\`\`

\`\`\`text
warning[E0133]: dereference of raw pointer is unsafe and requires unsafe block
 --> src/main.rs:4:5
  |
4 |     *p + *p
  |     ^^ dereference of raw pointer
\`\`\`

The 2024 edition also requires \`unsafe extern\` blocks and \`#[unsafe(no_mangle)]\`, makes taking a reference to a \`static mut\` an error, and marks \`std::env::set_var\` as \`unsafe\`, because changing the environment while another thread reads it is a data race in the C library.

Tests cannot see UB, because UB often "works". **Miri** is an interpreter that checks every operation against Rust's rules. Run \`rustup +nightly component add miri\` and then \`cargo +nightly miri test\`. It reports out-of-bounds pointer arithmetic, use-after-free, invalid values and aliasing violations, at the exact line.

Read chapter 20.1 of the Book, then the first two chapters of the Rustonomicon.`,
          resources: [
            {
              title: 'The Rust Programming Language, 20.1: Unsafe Rust',
              url: 'https://doc.rust-lang.org/book/ch20-01-unsafe-rust.html',
              type: 'textbook',
              cost: 'free',
              provider: 'Rust Project',
              note: 'The unsafe superpowers, a safe abstraction over unsafe code, and using Miri.',
              primary: true,
            },
            {
              title: 'The Rustonomicon',
              url: 'https://doc.rust-lang.org/nomicon/',
              type: 'textbook',
              cost: 'free',
              provider: 'Rust Project',
              note: 'Read "Meet Safe and Unsafe" and "How Safe and Unsafe Interact". The rest is reference for when you need it.',
            },
            {
              title: 'The Rust Reference: Behavior considered undefined',
              url: 'https://doc.rust-lang.org/reference/behavior-considered-undefined.html',
              type: 'documentation',
              cost: 'free',
              provider: 'Rust Project',
              note: 'The definitive list of what your `unsafe` code must never do.',
            },
            {
              title: 'Miri',
              url: 'https://github.com/rust-lang/miri',
              type: 'tool',
              cost: 'free',
              provider: 'Rust Project',
              note: 'Installation and usage. Runs on Windows as well as Linux.',
            },
          ],
          exercises: [
            {
              slug: 'unsound-or-sound',
              title: 'Sound or unsound?',
              prompt:
                'Write four safe functions wrapping `unsafe` code: (a) `two_mut` without the `i != j` check, (b) `fn first_unchecked(v: &[i32]) -> i32` using `get_unchecked(0)`, (c) `fn as_bytes(x: &u32) -> &[u8; 4]` using a pointer cast, (d) `fn make_bool(b: u8) -> bool` using `std::mem::transmute`. For each, decide whether it is sound, give an input that causes UB if not, and confirm with `cargo +nightly miri test`. Fix the unsound ones by adding a check or by making the function `unsafe` with a `# Safety` section.',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'raw-vec-split',
              title: 'Write split_at_mut yourself',
              prompt:
                'Implement `fn my_split_at_mut<T>(v: &mut [T], mid: usize) -> (&mut [T], &mut [T])` with `as_mut_ptr` and `std::slice::from_raw_parts_mut`, with a `// SAFETY:` comment that states each requirement of `from_raw_parts_mut` and why it holds. Test it, including `mid == 0` and `mid == len`, run the tests under Miri, then deliberately pass `mid + 1` for the second length and record what Miri reports.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'edition-2024-unsafe',
              title: 'What the 2024 edition changed',
              prompt:
                'Write a small crate on edition 2021 that has an `unsafe fn` dereferencing a raw pointer without an inner block, an `extern "C"` block, `#[no_mangle]`, `std::env::set_var` and a `&` reference to a `static mut`. Switch it to 2024 and record every warning and error. Run `cargo fix --edition` on a copy, read what it changed, and fix the rest by hand, replacing the `static mut` with an atomic or a `OnceLock`.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Does `unsafe` turn off the borrow checker?',
              answerOutline:
                'No. It only allows the five unsafe operations. References inside an unsafe block are checked as usual. Raw pointers are simply not checked.',
            },
            {
              question: 'What does it mean for a safe function containing `unsafe` code to be sound?',
              answerOutline:
                'No call to it from safe code, with any arguments, can cause undefined behaviour. The function itself must establish every precondition its unsafe code relies on.',
            },
            {
              question: 'Why does the 2024 edition warn about unsafe operations inside an `unsafe fn`?',
              answerOutline:
                'The caller\'s contract and the body\'s unsafe operations are separate obligations. Requiring explicit blocks makes each operation visible and individually justified.',
            },
            {
              question: 'Why is passing your tests not evidence that `unsafe` code is correct?',
              answerOutline:
                'Undefined behaviour often appears to work and then breaks with another optimisation level, compiler version or input. Miri checks the rules directly.',
            },
          ],
          relatedLessons: [
            'systems-programming/ownership-and-safe-concurrency/unsafe-rust-and-ffi',
            'systems-programming/performance-and-undefined-behaviour/undefined-behaviour-and-the-c-standard',
          ],
        },
        {
          slug: 'ffi-with-c',
          title: 'FFI: calling C and being called from C',
          summary:
            'Declare C functions in an `unsafe extern` block, pass strings, arrays and callbacks across the boundary, wrap them in safe Rust functions, and export Rust functions with a C ABI for other languages.',
          estimatedMinutes: 85,
          objectives: [
            'Declare foreign functions with `unsafe extern "C"`, marking each as `safe` or `unsafe`',
            'Pass integers, strings, buffers and callbacks across the C boundary correctly',
            'Wrap foreign functions in safe Rust APIs with documented safety arguments',
            'Export Rust functions to C with `#[unsafe(no_mangle)]` and build a `cdylib` or `staticlib`',
            'Explain ownership and panics at the boundary',
          ],
          concepts: [
            'ABI: the `"C"` calling convention',
            '`unsafe extern "C"` blocks, `safe fn` items',
            '`std::ffi`: `c_int`, `c_char`, `CStr`, `CString`',
            '`#[repr(C)]` layout',
            '`extern "C" fn` callbacks',
            '`#[unsafe(no_mangle)]` exports',
            '`cdylib` and `staticlib`',
            '`cc` and `bindgen`',
            'Panics abort at an `extern "C"` boundary',
          ],
          explanation: `Most operating systems and many important libraries, such as SQLite, zlib and OpenSSL, expose a **C ABI**: a calling convention and data layout that every language can use. Rust speaks it directly. You declare the foreign functions in an \`unsafe extern "C"\` block. The 2024 edition requires the \`unsafe\`, because the declarations themselves are a promise you make about types the compiler cannot check. Each item can then be marked \`safe\` (callable from safe code) or left \`unsafe\`. This example calls three functions from the C runtime library that every Rust program on Windows and Linux already links:

\`\`\`rust
use std::ffi::{CStr, CString, c_char, c_int, c_void};

unsafe extern "C" {
    safe fn abs(x: c_int) -> c_int;
    fn strlen(s: *const c_char) -> usize;
    fn qsort(
        base: *mut c_void,
        n: usize,
        size: usize,
        compar: extern "C" fn(*const c_void, *const c_void) -> c_int,
    );
}

extern "C" fn compare_i32(a: *const c_void, b: *const c_void) -> c_int {
    // SAFETY: qsort only passes pointers to elements of the array we gave it, which are i32s.
    let (a, b) = unsafe { (*a.cast::<i32>(), *b.cast::<i32>()) };
    a.cmp(&b) as c_int
}

fn c_len(s: &CStr) -> usize {
    // SAFETY: a CStr is always NUL-terminated and stays alive for this call.
    unsafe { strlen(s.as_ptr()) }
}

fn sort_with_c(v: &mut [i32]) {
    // SAFETY: base and n describe a valid, writable i32 array, size matches
    // the element type, and compare_i32 only reads i32s.
    unsafe { qsort(v.as_mut_ptr().cast(), v.len(), size_of::<i32>(), compare_i32) }
}

fn main() {
    println!("{}", abs(-42));
    let owned = CString::new("héllo").expect("no interior NUL byte");
    println!("{} bytes", c_len(&owned));
    let mut v = [5, -3, 9, 0];
    sort_with_c(&mut v);
    println!("{v:?}");
}
\`\`\`

\`\`\`text
42
6 bytes
[-3, 0, 5, 9]
\`\`\`

\`abs\` is declared \`safe\` because no argument can make it misbehave. \`strlen\` and \`qsort\` stay \`unsafe\`, and the safe wrappers \`c_len\` and \`sort_with_c\` establish their contracts once, so callers never write \`unsafe\`. That is the standard shape of FFI code: a thin unsafe layer, often generated by **bindgen** from a C header, under a safe layer that you design. **Strings** need care. C strings end in a NUL byte, and Rust strings do not. \`CString::new\` adds the terminator and rejects interior NULs, and \`CStr::from_ptr\` reads a C string that someone else owns. Structs passed by value must be \`#[repr(C)]\` so that their field layout matches C's.

**Ownership** never crosses the boundary implicitly. Memory allocated by C must be freed by C's \`free\`, and memory allocated by Rust by Rust, so libraries export paired \`create\` and \`destroy\` functions. **Panics** must not unwind into C. Since Rust 1.81 a panic that reaches an \`extern "C"\` function aborts the process, so catch it with \`std::panic::catch_unwind\` if you need to return an error code instead.

Going the other way, export a function with an unmangled name:

\`\`\`rust
/// Adds two numbers, wrapping on overflow. Callable from C as
/// \`int32_t pp_add(int32_t a, int32_t b);\`
#[unsafe(no_mangle)]
pub extern "C" fn pp_add(a: i32, b: i32) -> i32 {
    a.wrapping_add(b)
}
\`\`\`

Set \`crate-type = ["cdylib"]\` (a \`.dll\` or \`.so\`) or \`["staticlib"]\` under \`[lib]\` in \`Cargo.toml\`, and C, C++, Python's \`ctypes\` or C# can call it. To compile C code as part of a Rust crate, use the **cc** crate from a \`build.rs\` script. It finds MSVC on Windows and \`cc\` on Linux.

Read the FFI chapter of the Rustonomicon and the \`std::ffi\` module page.`,
          resources: [
            {
              title: 'The Rustonomicon: Foreign Function Interface',
              url: 'https://doc.rust-lang.org/nomicon/ffi.html',
              type: 'textbook',
              cost: 'free',
              provider: 'Rust Project',
              note: 'Calling C, callbacks, linking, nullable pointers and unwinding.',
              primary: true,
            },
            {
              title: 'Module std::ffi',
              url: 'https://doc.rust-lang.org/std/ffi/index.html',
              type: 'documentation',
              cost: 'free',
              provider: 'Rust Project',
              note: 'The string types for each direction across the boundary, and the C type aliases.',
            },
            {
              title: 'cc-rs',
              url: 'https://github.com/rust-lang/cc-rs',
              type: 'tool',
              cost: 'free',
              provider: 'Rust Project',
              note: 'Compile C files from `build.rs` with whichever C compiler the target uses.',
            },
            {
              title: 'rust-bindgen',
              url: 'https://github.com/rust-lang/rust-bindgen',
              type: 'tool',
              cost: 'free',
              provider: 'Rust Project',
              note: 'Generates `extern` declarations from C headers. Needs libclang, which comes with LLVM.',
            },
          ],
          exercises: [
            {
              slug: 'wrap-c-library',
              title: 'Wrap a small C library',
              prompt:
                'Write a C file `ring.c` with `ring_t *ring_new(size_t cap)`, `int ring_push(ring_t *r, double x)` (returns 0 when full), `int ring_pop(ring_t *r, double *out)` and `void ring_free(ring_t *r)`. Compile it from `build.rs` with the `cc` crate. Declare the functions in Rust, and wrap them in a safe `struct Ring` whose `Drop` calls `ring_free`, whose `push` returns `Result<(), Full>`, and whose `pop` returns `Option<f64>`. Test that pushing 3 values into a ring of capacity 2 fails once and that popping returns them in order. Run it with the MSVC toolchain on Windows and in WSL.',
              kind: 'coding',
              difficulty: 3,
              hint: 'Make `ring_t` an opaque type on the Rust side: `#[repr(C)] pub struct RingT { _private: [u8; 0] }`, used only behind a pointer.',
            },
            {
              slug: 'export-to-python',
              title: 'Call Rust from Python',
              prompt:
                'Build a `cdylib` crate exporting `pp_add` and `size_t pp_count_vowels(const char *s)`, which returns 0 for a null pointer. Load the library from Python with `ctypes`, set `argtypes` and `restype`, and check that `pp_count_vowels(b"Rustacean")` returns 4. Then make the Rust function panic on purpose and observe that the process aborts instead of unwinding into Python. Wrap it in `catch_unwind` so that it returns a sentinel instead.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'repr-c-struct',
              title: 'Structs across the boundary',
              prompt:
                'Define `#[repr(C)] struct Point { x: f64, y: f64 }` and write an `extern "C" fn centroid(pts: *const Point, n: usize) -> Point` that returns the origin for a null pointer or `n == 0`. Write its C header by hand, call it from a C test program built with `cc`, and check the centroid of (0, 0), (4, 0) and (0, 3) is (1.333..., 1). Print `size_of::<Point>()` and `align_of::<Point>()`, and explain what would go wrong without `#[repr(C)]` for a struct with mixed field sizes.',
              kind: 'coding',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'Why must an `extern` block be written `unsafe extern` in the 2024 edition?',
              answerOutline:
                'The declarations are unchecked promises about foreign signatures. Getting one wrong is undefined behaviour, so writing them is itself an unsafe act that must be marked.',
            },
            {
              question: 'When can a foreign function be declared `safe fn`?',
              answerOutline:
                'When no possible arguments of the declared types can cause undefined behaviour, as with `abs` on integers. Functions taking pointers usually cannot be.',
            },
            {
              question: 'What happens if Rust code called from C panics?',
              answerOutline:
                'Unwinding out of an `extern "C"` function aborts the process (since Rust 1.81). Catch the panic with `catch_unwind` and return an error code if the caller must survive.',
            },
            {
              question: 'Who frees a string returned by a C library?',
              answerOutline:
                'The library, through its own free or destroy function, unless documented otherwise. Rust\'s allocator must never free C-allocated memory, or the reverse.',
            },
          ],
          relatedLessons: [
            'systems-programming/the-toolchain/linking-and-libraries',
            'systems-programming/ownership-and-safe-concurrency/unsafe-rust-and-ffi',
          ],
        },
        {
          slug: 'declarative-macros',
          title: 'Declarative macros',
          summary:
            'Write `macro_rules!` macros that match token patterns with fragment specifiers and repetitions, understand hygiene and recursion, and know when a function or generic would be better.',
          estimatedMinutes: 70,
          objectives: [
            'Write `macro_rules!` macros with several rules, fragment specifiers and repetitions',
            'Generate items such as enums and `impl` blocks from a compact description',
            'Explain hygiene, and use `$crate` in exported macros',
            'Write a recursive macro, and expand macros to debug them',
            'Decide when a macro is justified',
          ],
          concepts: [
            '`macro_rules!` rules: matcher and transcriber',
            'Fragment specifiers: `expr`, `ident`, `ty`, `literal`, `tt`',
            'Repetitions `$(...),*` and `$(...)+`',
            'Hygiene',
            'Recursive macros',
            '`#[macro_export]` and `$crate`',
            '`cargo expand`',
            '2024: `expr` also matches `const {}` and `_`',
          ],
          explanation: `A **declarative macro** rewrites tokens before type checking. \`macro_rules! name { (matcher) => { transcriber }; ... }\` tries each rule in order, and the first matcher that fits produces the code. Matchers bind **fragments** such as \`$x:expr\` (an expression), \`$name:ident\` (an identifier), \`$t:ty\` (a type), \`$l:literal\` and \`$tt:tt\` (any single token tree). **Repetitions** like \`$( $x:expr ),*\` match a comma-separated list, and the same \`$( ... )*\` in the transcriber repeats the output once per match.

Use a macro when a function cannot do the job: a variable number of arguments, generating items such as types and \`impl\` blocks, or a small language checked at compile time, like \`println!\` and \`vec!\`. A good example is removing boilerplate that must stay in sync:

\`\`\`rust
macro_rules! string_enum {
    ($name:ident { $($variant:ident => $text:literal),+ $(,)? }) => {
        #[derive(Debug, Clone, Copy, PartialEq)]
        enum $name {
            $($variant),+
        }

        impl $name {
            const ALL: &[$name] = &[$($name::$variant),+];

            fn as_str(self) -> &'static str {
                match self {
                    $($name::$variant => $text),+
                }
            }

            fn parse(s: &str) -> Option<Self> {
                match s {
                    $($text => Some($name::$variant),)+
                    _ => None,
                }
            }
        }
    };
}

string_enum!(Method {
    Get => "GET",
    Post => "POST",
    Delete => "DELETE",
});

macro_rules! max_of {
    ($x:expr) => { $x };
    ($x:expr, $($rest:expr),+) => {{
        let a = $x;
        let b = max_of!($($rest),+);
        if a > b { a } else { b }
    }};
}

fn main() {
    let names: Vec<&str> = Method::ALL.iter().map(|m| m.as_str()).collect();
    println!("{}", names.join(" "));
    println!("{:?} {:?}", Method::parse("POST"), Method::parse("PATCH"));
    println!("{}", max_of!(3, 9 * 2, 7));
}
\`\`\`

\`\`\`text
GET POST DELETE
Some(Post) None
18
\`\`\`

One line per variant now generates the enum, a list of all variants, and both conversions, and they cannot drift apart. \`$(,)?\` accepts an optional trailing comma. \`max_of!\` is **recursive**: each step peels off one argument. It binds \`a\` and \`b\` before comparing, so that each argument expression is evaluated exactly once. The double braces make the expansion a block expression.

Macros are **hygienic**. Variables such as \`a\` and \`b\` inside \`max_of!\` cannot clash with variables at the call site, because identifiers carry the context they were written in. A macro exported from a library with \`#[macro_export]\` should refer to its own crate's items as \`$crate::path\`, which works whatever name the user's crate gives yours.

Macros have costs: errors inside them are harder to read, rust-analyzer understands them less well, and they hide control flow. Prefer a function, then a generic, then a trait, and use a macro only when none of these can express it. To see what a macro produced, install \`cargo-expand\` (\`cargo install cargo-expand\`, which also needs a nightly toolchain installed) and run \`cargo expand\`. In the 2024 edition the \`expr\` fragment also matches \`const { ... }\` blocks and \`_\`. Old macros that relied on the narrower meaning use \`expr_2021\`. Procedural macros, such as \`#[derive(Serialize)]\`, are Rust programs that transform token streams. They are beyond this course, but they are used in the same way.

Read chapter 20.5 of the Book, then the first chapters of *The Little Book of Rust Macros*.`,
          resources: [
            {
              title: 'The Rust Programming Language, 20.5: Macros',
              url: 'https://doc.rust-lang.org/book/ch20-05-macros.html',
              type: 'textbook',
              cost: 'free',
              provider: 'Rust Project',
              note: 'Declarative macros with `macro_rules!`, and an overview of procedural macros.',
              primary: true,
            },
            {
              title: 'The Little Book of Rust Macros',
              url: 'https://veykril.github.io/tlborm/',
              type: 'textbook',
              cost: 'free',
              provider: 'Lukas Wirth',
              note: 'How macro expansion and hygiene work, and patterns such as internal rules, TT munchers and counting.',
            },
            {
              title: 'The Rust Reference: Macros By Example',
              url: 'https://doc.rust-lang.org/reference/macros-by-example.html',
              type: 'documentation',
              cost: 'free',
              provider: 'Rust Project',
              note: 'Exact fragment specifiers, follow-set restrictions and the 2024 edition change to `expr`.',
            },
          ],
          exercises: [
            {
              slug: 'hashmap-literal',
              title: 'A map literal macro',
              prompt:
                'Write `btree!{ "a" => 1, "b" => 2 }` that builds a `BTreeMap` and accepts an optional trailing comma and an empty invocation, `btree!{}`. Test the empty case, a trailing comma, and that each key and value expression is evaluated exactly once by passing expressions with side effects. Then write a version that calls `with_capacity` with the exact number of pairs for a `HashMap`, computed by a helper macro that counts its arguments.',
              kind: 'coding',
              difficulty: 2,
              hint: 'A counting macro can expand `count!(a b c)` to `0 + 1 + 1 + 1` with a rule that replaces each token with `1`.',
            },
            {
              slug: 'test-table-macro',
              title: 'Generate tests from a table',
              prompt:
                'Write `test_cases! { fn_under_test; name1: (input) => expected, name2: ... }` that generates one `#[test]` function per row, each with its own name, so that a failure names the row. Use it to test your `to_roman` from module 1 with 10 rows. Run `cargo expand` on the test module, and compare the expansion with what you would have written by hand.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'macro-or-not',
              title: 'Macro or not?',
              prompt:
                'For each, decide whether to use a macro, a generic function, a trait or a plain function, and justify it in one sentence: (a) square any numeric type, (b) a `log!` that records file and line, (c) define 30 newtypes for unit IDs with the same derives and a `Display` implementation, (d) assert that two floats are within an epsilon, (e) build an HTTP router from a table of paths. Implement (c) both as a macro and by hand for three types, and compare.',
              kind: 'writing',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does `max_of!` bind `let a = $x;` instead of writing `if $x > $y { $x } else { $y }`?',
              answerOutline:
                'The fragments are substituted as code, so each would be evaluated twice, which repeats side effects and work. Binding evaluates each once.',
            },
            {
              question: 'What does hygiene guarantee?',
              answerOutline:
                'Local variables introduced inside a macro cannot capture or shadow variables at the call site, and the other way round, because identifiers keep their syntax context.',
            },
            {
              question: 'Why should exported macros use `$crate::`?',
              answerOutline:
                'The user may rename your crate or not import its items. `$crate` always resolves to the defining crate.',
            },
            {
              question: 'Give two costs of using a macro instead of a function.',
              answerOutline:
                'Harder error messages and debugging, weaker IDE support, hidden control flow and evaluation, and slower compilation for large expansions.',
            },
          ],
        },
        {
          slug: 'benchmarks-docs-and-publishing',
          title: 'Benchmarks, documentation and publishing a crate',
          summary:
            'Measure performance properly with Criterion, write documentation whose examples are tested, set up the metadata and checks a published crate needs, and release it on crates.io following semantic versioning.',
          estimatedMinutes: 80,
          objectives: [
            'Write Criterion benchmarks, and use `black_box` to stop the optimiser removing the work',
            'Interpret benchmark statistics and compare two versions of a function',
            'Write rustdoc documentation with tested examples and the standard sections',
            'Prepare `Cargo.toml` metadata, and check a package with `cargo package` and `cargo publish --dry-run`',
            'Apply semantic versioning to a library\'s public API',
          ],
          concepts: [
            'Criterion: warm-up, sampling, confidence intervals',
            '`std::hint::black_box`',
            '`///` and `//!` doc comments',
            'Doc tests run with `cargo test`',
            'Sections: Examples, Errors, Panics, Safety',
            '`#![warn(missing_docs)]`',
            'Manifest metadata: license, description, repository, `rust-version`',
            '`cargo publish --dry-run`',
            'Semver for Rust APIs, `cargo-semver-checks`',
          ],
          explanation: `**Benchmarks.** Timing a function once with \`Instant\` is noisy and easy to fool: the optimiser can delete work whose result is unused, or compute it at compile time. **Criterion** runs warm-up iterations, takes many samples, reports a confidence interval, and compares each run with the last. Add \`criterion = "0.8"\` under \`[dev-dependencies]\`, a \`[[bench]]\` section with \`name = "sums"\` and \`harness = false\`, and the file \`benches/sums.rs\`:

\`\`\`rust
use criterion::{Criterion, criterion_group, criterion_main};
use std::hint::black_box;

fn sum_loop(v: &[u64]) -> u64 {
    let mut total = 0;
    for x in v {
        total += x;
    }
    total
}

fn sum_iter(v: &[u64]) -> u64 {
    v.iter().sum()
}

fn bench_sums(c: &mut Criterion) {
    let data: Vec<u64> = (0..10_000).collect();
    c.bench_function("sum_loop", |b| b.iter(|| sum_loop(black_box(&data))));
    c.bench_function("sum_iter", |b| b.iter(|| sum_iter(black_box(&data))));
}

criterion_group!(benches, bench_sums);
criterion_main!(benches);
\`\`\`

\`cargo bench\` prints a time range for each function, such as \`[1.92 µs 1.94 µs 1.97 µs]\`, and HTML reports go in \`target/criterion\`. \`black_box\` hides a value from the optimiser, so the work cannot be removed. Benchmark in release mode on an idle machine, change one thing at a time, and treat differences inside the noise as no difference.

**Documentation.** \`///\` comments document the next item, and \`//!\` documents the enclosing module or crate. They are Markdown, and code blocks in them are **compiled and run** by \`cargo test\`, so examples cannot go stale:

\`\`\`\`rust
//! Small statistics helpers.

/// Returns the median of \`values\`, or \`None\` if it is empty.
///
/// The input is copied and sorted, so it is left unchanged.
///
/// # Examples
///
/// \`\`\`
/// use example::median;
///
/// assert_eq!(median(&[3.0, 1.0, 2.0]), Some(2.0));
/// assert_eq!(median(&[4.0, 1.0, 3.0, 2.0]), Some(2.5));
/// assert_eq!(median(&[]), None);
/// \`\`\`
pub fn median(values: &[f64]) -> Option<f64> {
    if values.is_empty() {
        return None;
    }
    let mut sorted = values.to_vec();
    sorted.sort_by(f64::total_cmp);
    let mid = sorted.len() / 2;
    Some(if sorted.len().is_multiple_of(2) { (sorted[mid - 1] + sorted[mid]) / 2.0 } else { sorted[mid] })
}
\`\`\`\`

Use the conventional headings \`# Examples\`, \`# Errors\`, \`# Panics\` and \`# Safety\`, add \`#![warn(missing_docs)]\` to the crate root, and view the result with \`cargo doc --open\`. docs.rs builds and hosts the documentation of every published crate.

**Publishing.** crates.io needs \`description\`, \`license\` (an SPDX expression such as \`"MIT OR Apache-2.0"\`, the Rust convention), and ideally \`repository\`, \`readme\`, \`keywords\`, \`categories\` and \`rust-version\` in \`Cargo.toml\`. \`cargo package --list\` shows which files will be uploaded, and \`cargo publish --dry-run\` builds the package exactly as a user would. Then log in with an API token from crates.io and run \`cargo publish\`. A published version can never be changed or deleted, only **yanked**, which stops new projects from selecting it.

Follow **semver**. Before 1.0, a change in the minor version (0.3 to 0.4) may break users. After 1.0, only a major version may. In Rust, more changes are breaking than you might think: removing a public item, adding a required trait method, adding a field to a struct with all-public fields, or adding a variant to an enum not marked \`#[non_exhaustive]\`. \`cargo-semver-checks\` compares your API with the last release and flags these.

Read chapter 14.2 of the Book and the Cargo book's pages on publishing and semver.`,
          resources: [
            {
              title: 'Criterion.rs user guide',
              url: 'https://bheisler.github.io/criterion.rs/book/',
              type: 'documentation',
              cost: 'free',
              provider: 'Criterion.rs',
              note: 'Getting started, the command-line output, comparing functions and the HTML reports.',
              primary: true,
            },
            {
              title: 'The rustdoc book: Documentation tests',
              url: 'https://doc.rust-lang.org/rustdoc/write-documentation/documentation-tests.html',
              type: 'documentation',
              cost: 'free',
              provider: 'Rust Project',
              note: 'How examples are compiled, hiding setup lines with `#`, and `should_panic` and `no_run`.',
            },
            {
              title: 'The Rust Programming Language, 14.2: Publishing a Crate to Crates.io',
              url: 'https://doc.rust-lang.org/book/ch14-02-publishing-to-crates-io.html',
              type: 'textbook',
              cost: 'free',
              provider: 'Rust Project',
              note: 'Documentation comments, `pub use` for a convenient API, metadata, publishing and yanking.',
            },
            {
              title: 'The Cargo Book: SemVer Compatibility',
              url: 'https://doc.rust-lang.org/cargo/reference/semver.html',
              type: 'documentation',
              cost: 'free',
              provider: 'Rust Project',
              note: 'A catalogue of which API changes are major, minor or patch, each with an example.',
            },
          ],
          exercises: [
            {
              slug: 'benchmark-two-versions',
              title: 'Benchmark two implementations',
              prompt:
                'Write two versions of `fn count_words(text: &str) -> usize`: one with `split_whitespace().count()`, and one that scans bytes and counts transitions from whitespace to non-whitespace, treating only ASCII whitespace as a separator. Check they agree on ASCII inputs and write a test showing where they differ on Unicode. Benchmark both with Criterion on a 1 MB generated text, report the medians and the confidence intervals, and state whether the difference is real.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'document-a-crate',
              title: 'Document a library to publication standard',
              prompt:
                'Take your Roman numeral library from module 3. Add crate-level docs with a usage example, document every public item with `# Examples`, `# Errors` or `# Panics` as appropriate, and turn on `#![warn(missing_docs)]`. Make sure `cargo test` runs at least four doc tests and `cargo doc` shows no warnings. Fill in the manifest metadata with a dual MIT or Apache-2.0 license, and run `cargo package --list` and `cargo publish --dry-run`. You do not need to actually publish.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'semver-quiz',
              title: 'Which version number?',
              prompt:
                'Your crate is at 1.4.2. For each change, give the next version and a one-line reason: (a) fix a bug in a private function, (b) add a new public function, (c) add a variant to a public enum without `#[non_exhaustive]`, (d) add a private field to a struct whose fields were all public, (e) raise `rust-version` from 1.85 to 1.88, (f) add a default method to a public trait, (g) change a parameter from `&String` to `&str`. Check your answers against the Cargo semver reference, and run `cargo semver-checks` on a toy crate for two of them.',
              kind: 'problem',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why can a benchmark of `sum(&data)` report near-zero time without `black_box`?',
              answerOutline:
                'The optimiser sees that the result is unused or that the input is constant, and removes or precomputes the work.',
            },
            {
              question: 'What happens to the code examples in your doc comments?',
              answerOutline:
                '`cargo test` compiles and runs each one as a separate test that links your crate, so broken examples fail the build.',
            },
            {
              question: 'Can you fix a mistake in a version already published to crates.io?',
              answerOutline:
                'Not in place. Publish a new version and yank the bad one, which stops new lock files from choosing it without breaking existing ones.',
            },
            {
              question: 'Why is adding a variant to a public enum a breaking change, and how do you avoid that?',
              answerOutline:
                'Users\' exhaustive `match`es stop compiling. Marking the enum `#[non_exhaustive]` forces them to include a wildcard arm, so new variants are allowed in minor versions.',
            },
          ],
          relatedLessons: [
            'systems-programming/performance-and-undefined-behaviour/profiling-and-benchmarking',
            'software-engineering/requirements-architecture-and-documentation/documentation-that-works',
          ],
        },
      ],
    },
  ],
  capstone: {
    slug: 'pixelpress',
    title: 'Capstone: a fast image resizing library and thumbnail server',
    description: `Build a resampling library with separable filters and a thumbnail server on Tokio, prove its speed with benchmarks, and add one small, measured piece of \`unsafe\` code.

The full specification is the final project in this course's coursework, which replaces this summary in the site.`,
    deliverables: [
      'A library crate with documented, tested resampling filters, ready to publish',
      'A thumbnail HTTP server built on Tokio with a bounded worker pool and a cache',
      'Benchmarks with Criterion, and a README with results',
    ],
    estimatedHours: 45,
  },
  masteryChecklist: [
    'I can set up a Rust 2024 project on Windows with Cargo, rust-analyzer, tests, Clippy and rustfmt',
    'I can explain ownership, moves and borrowing, and predict whether the borrow checker will accept a function',
    'I can read any borrow checker error, name the loan, the conflicting action and the use that keeps it live, and fix it',
    'I can model a domain with structs and enums so that invalid states cannot be represented',
    'I can handle errors with `Result`, custom error types and `?`, and reserve panics for bugs',
    'I can write generic code with trait bounds, choose between generics and trait objects, and annotate lifetimes when elision is not enough',
    'I can use iterators, closures and the standard collections idiomatically, and implement `Iterator` for my own types',
    'I can choose between `Box`, `Rc`, `RefCell`, `Arc` and `Mutex`, and explain the cost of each',
    'I can write concurrent code with threads, channels and shared state, and explain what `Send` and `Sync` guarantee',
    'I can write async code with Tokio without blocking the executor',
    'I can write a small `unsafe` block with a stated safety contract, and call C from Rust',
    'I can write a declarative macro, benchmark code, document it and publish a crate',
  ],
});
