import { defineCoursework } from '../define';

const rustExtensions = ['rust-lang.rust-analyzer', 'vadimcn.vscode-lldb', 'ms-vscode-remote.remote-wsl'];
const rustToolchain = [
  'On Windows, install WSL 2 with Ubuntu, then open the folder through the WSL extension so every command below runs in Linux. The final project emits Linux x86-64 assembly, so it pays to start here.',
  'In Ubuntu or on Linux: `sudo apt install build-essential gdb python3`, then install Rust with `rustup` and run `rustup component add clippy rustfmt`.',
  'The commands and speed targets assume Rust, because sum types and `match` suit compilers and the same code compiles to WebAssembly later. OCaml or C++ also work if you translate the commands. Keep one language for all the coursework, because each piece builds on the last.',
];

export default defineCoursework({
  subjectId: 'compilers',
  machineProblems: [
    {
      slug: 'mp1-kiln-frontend',
      title: 'kilnc: a front end for the Kiln language',
      afterModule: 'parsing',
      coversModules: ['overview-and-lexing', 'parsing'],
      supersedesProject: true,
      summary: 'Write the lexer and parser for Kiln, a small typed language, with rich diagnostics, error recovery, a formatter, and a fuzzer that runs 20,000 programs.',
      language: 'Rust (stable)',
      estimatedHours: 18,
      overview: `Every part of this course's coursework compiles one language, **Kiln**, so that the final project is a single compiler rather than a set of exercises. This MP fixes its syntax. Kiln looks like Rust and behaves like a small ML: it has generic algebraic data types, closures, pattern matching and a garbage collector. You will not give any of that meaning yet. You only need to read all of it correctly and report mistakes well.

Extend the lexer from the module 1 project to Kiln's tokens, or write it now. Names starting with a capital letter (\`UPPER\`) are types and constructors, and all others (\`lower\`) are variables and functions. A lone \`_\` is the wildcard pattern. The keywords are \`fn let mut if else while return match type true false int bool str\`.

\`\`\`text
program   = { type_decl | fn_decl } ;
type_decl = "type" UPPER [ generics ] "=" variant { "|" variant } ;
generics  = "[" UPPER { "," UPPER } "]" ;
variant   = UPPER [ "(" type { "," type } ")" ] ;
fn_decl   = "fn" lower [ generics ] "(" [ param { "," param } ] ")" [ "->" type ] block ;
param     = lower ":" type ;
block     = "{" { stmt } [ expr ] "}" ;
stmt      = "let" [ "mut" ] lower [ ":" type ] "=" expr ";"
          | expr "=" expr ";"          (* left side must be a variable or an index *)
          | "while" expr block
          | "return" [ expr ] ";"
          | expr ";"
          | if | match ;               (* no semicolon needed after these two *)
expr      = if | match | lambda | binary ;
if        = "if" expr block [ "else" ( if | block ) ] ;
match     = "match" expr "{" arm { "," arm } [ "," ] "}" ;
arm       = pattern "=>" expr ;
pattern   = "_" | lower | INT | STRING | "true" | "false"
          | UPPER [ "(" pattern { "," pattern } ")" ] ;
lambda    = "fn" "(" [ lparam { "," lparam } ] ")" [ "->" type ] block ;
lparam    = lower [ ":" type ] ;
binary    = unary { binop unary } ;    (* precedence below *)
unary     = ( "-" | "!" ) unary | postfix ;
postfix   = primary { "(" [ args ] ")" | "[" expr "]" } ;
primary   = INT | STRING | "true" | "false" | lower | UPPER
          | "(" expr ")" | "[" [ args ] "]" ;
args      = expr { "," expr } ;
type      = "int" | "bool" | "str" | "[" type "]"
          | "fn" "(" [ type { "," type } ] ")" "->" type
          | UPPER [ "[" type { "," type } "]" ] ;
\`\`\`

Binary operators, loosest first: \`||\`, then \`&&\`, then \`==\` and \`!=\`, then \`<\` \`<=\` \`>\` \`>=\`, then \`+\` \`-\`, then \`*\` \`/\` \`%\`. All are left-associative, except that equality and comparison do not chain. An \`if\` or \`match\` that starts a statement ends at its closing brace, as in Rust.

**Constraints.** Hand-write both the lexer and the parser, with no parser generator or combinator library. Use the standard library plus, if you like, a snapshot-testing crate. Do no semantic analysis: \`1 + true\` is a valid parse.`,
      setup: {
        extensions: rustExtensions,
        toolchain: rustToolchain,
        structure: `kiln/
├── src/lib.rs             # library crate that every later stage reuses
├── src/main.rs            # kilnc command line: tokens, ast, fmt
├── src/span.rs            # byte spans and the offset-to-line table
├── src/lexer.rs           # hand-written scanner
├── src/ast.rs             # enums for items, statements, expressions, patterns, types
├── src/parser.rs          # recursive descent with a Pratt loop for expressions
├── src/pretty.rs          # source printer and S-expression dumper
├── src/diag.rs            # diagnostics with primary and secondary labels
├── src/bin/fuzz.rs        # grammar-based generator and byte mutator
├── tests/golden/          # .kn inputs with .tokens, .ast and .err snapshots
├── docs/grammar.md        # token rules, grammar, precedence, recovery strategy
└── Cargo.toml`,
        commands: [
          { label: 'Build in release mode', command: 'cargo build --release' },
          { label: 'Run the golden tests', command: 'cargo test' },
          { label: 'Print the tokens of a file', command: './target/release/kilnc tokens examples/list.kn' },
          { label: 'Print the syntax tree as an S-expression', command: './target/release/kilnc ast --sexp examples/list.kn' },
          { label: 'Reformat a file', command: './target/release/kilnc fmt examples/list.kn' },
          { label: 'Run the fuzzer', command: 'cargo run --release --bin fuzz -- --seed 1 --count 10000' },
        ],
      },
      requirements: [
        'The scanner records a byte offset, line and column for every token and applies maximal munch to `->`, `=>`, `==`, `!=`, `<=`, `>=`, `&&` and `||`.',
        'The scanner handles `//` comments, nesting `/* */` comments, decimal integers with `_` separators, `0x` hexadecimal integers, and strings with the escapes `\\n`, `\\t`, `\\r`, `\\\\`, `\\"`, `\\0` and `\\u{...}`. Source files are UTF-8, and strings may hold any Unicode text.',
        'An integer literal above 4611686018427387903, the largest 63-bit signed value, is a lexical error reported on the literal.',
        'An illegal character, unterminated string, bad escape or unterminated comment produces one diagnostic, and scanning continues after it where that is possible.',
        'The parser is recursive descent with a Pratt loop for binary expressions, and it accepts the whole grammar above, including generics, lambdas and match arms.',
        'The syntax tree is a set of sum types, and every node carries a byte span. `docs/grammar.md` records how the tree is stored and why.',
        'Diagnostics print `file:line:col: error: message`, the source line and a caret, with a secondary label for context such as an unclosed delimiter. Panic-mode recovery resumes at `;`, `}` or the next top-level `fn` or `type`.',
        '`kilnc ast --sexp` prints a stable S-expression form, and adding `--expr` parses one expression instead of a whole program. `kilnc fmt` prints canonical source and is idempotent.',
        'The suite has at least 40 lexer golden tests and 60 parser golden tests, 20 of which expect specific diagnostics.',
        'Nesting deeper than 256 levels produces a diagnostic rather than a stack overflow, and the fuzzer feeds 10,000 generated programs and 10,000 byte-mutated programs through the whole front end with no panic.',
      ],
      acceptanceTests: [
        'With `--expr`, `1 + 2 * 3` prints `(+ 1 (* 2 3))`, `8 - 3 - 2` prints `(- (- 8 3) 2)`, `!a && b || c` prints `(|| (&& (! a) b) c)`, `-f(x)[0] * 2` prints `(* (neg (index (call f x) 0)) 2)`, and `f(1)(2)[3]` prints `(index (call (call f 1) 2) 3)`.',
        '`x<=-1` lexes to exactly `IDENT(x) LE MINUS INT(1) EOF`. In `/* a /* b */ c */ 1` the integer token is at line 1, column 19. A `/*` that opens at line 3, column 1 and never closes reports an error at 3:1, not at the end of the file.',
        'With `--expr`, `a < b < c` reports one error at column 7, the second `<`. For the line `  let x = (1 + 2;` on line 2, the primary label is at 2:17 and says a `)` was expected, and the secondary label points at the `(` at 2:11.',
        'A file with five functions, where the second contains `let x = ;` and the fourth contains `return 1 +;`, produces exactly two diagnostics and a tree containing all five functions.',
        'For 10,000 programs generated with seed 1, `parse(fmt(parse(s)))` equals `parse(s)` ignoring spans, and `fmt(fmt(s))` equals `fmt(s)`.',
        'A function body containing 100,000 `(` characters exits with a nesting diagnostic and status 1, and a generated 1 MB source file lexes and parses in under 1 second in a release build.',
      ],
      resources: [
        {
          title: 'Simple but Powerful Pratt Parsing',
          url: 'https://matklad.github.io/2020/04/13/simple-but-powerful-pratt-parsing.html',
          type: 'article',
          cost: 'free',
          provider: 'Aleksey Kladov',
          note: 'A short guide to binding powers, written in Rust, that maps directly onto the expression loop here.',
        },
        {
          title: 'Crafting Interpreters: Parsing Expressions',
          url: 'https://craftinginterpreters.com/parsing-expressions.html',
          type: 'textbook',
          cost: 'free',
          provider: 'Robert Nystrom',
          note: 'Read the section on panic-mode recovery before you design your synchronisation points.',
        },
      ],
      stretchGoals: [
        'Add a language server that reports diagnostics live in VS Code, using the `lsp-server` crate and your existing spans.',
        'Write a tree-sitter grammar for Kiln and compare how it recovers from the same 20 error cases.',
      ],
    },
    {
      slug: 'mp2-kilnopt',
      title: 'kilnopt: an optimizer judged by dynamic instruction count',
      afterModule: 'optimization',
      coversModules: ['semantic-analysis-and-types', 'intermediate-representations', 'optimization'],
      supersedesProject: true,
      summary: 'Lower Kiln to Bril and build a six-pass optimizer with a shared dataflow solver, then prove with an independent interpreter that it never changes a program.',
      language: 'Rust (stable)',
      estimatedHours: 20,
      overview: `An optimizer is easy to write and hard to write correctly. Every pass here is judged by something you did not build: \`brili\`, the reference interpreter for the Bril IR, which reports exactly how many instructions a program executed. If output changes, the pass is wrong. If the count does not fall, the pass did nothing.

\`kilnopt\` reads Bril JSON and writes Bril JSON, so it works both on the public Bril benchmarks and on Kiln programs lowered through your own compiler. It assumes the module 3 and module 4 projects: \`kilnc\` can type-check Kiln and lower it to three-address form, and you have CFGs, dominators and SSA conversion. If your IR is not Bril, write a small adapter, because \`brili\` is the referee.

You will write one generic dataflow solver and use it for several analyses, then build local and global passes, loop passes and an inliner on top of it. Passes may go through SSA internally, but they must leave SSA before writing output, so that \`brili\` runs plain Bril. Copies added on the way out of SSA count as executed instructions, so coalesce them or run those passes outside SSA.

**Constraints.** Only the Kiln subset of \`int\`, \`bool\`, top-level functions, \`let\`, \`let mut\`, assignment, \`if\`, \`while\`, \`return\` and \`print\` has to lower to Bril in this MP. Strings, arrays, data types and closures wait for the final project. \`print\` and \`call\` have side effects unless a pass can prove otherwise. Dynamic instruction count is the only metric, because you do not have a machine target yet. That is the reason strength reduction is measured by counting \`mul\` instructions.`,
      setup: {
        extensions: [...rustExtensions, 'tamasfe.even-better-toml'],
        toolchain: [
          ...rustToolchain,
          'Install the Bril tools in the same Linux environment: install Deno, clone `sampsyo/bril`, then follow its documentation to install `brili` from the repository root, `bril2json` from `bril-txt/`, and `brench` from `brench/`.',
          'Check the install with `bril2json < tests/bril/add.bril | brili -p`, which prints the program output and then `total_dyn_inst` on stderr.',
        ],
        structure: `kiln/
├── src/bin/kilnopt.rs     # command line: --passes, --dump
├── src/bril.rs            # Bril JSON reader and writer
├── src/lower.rs           # typed Kiln subset to Bril
├── src/opt/cfg.rs         # blocks, dominators, natural loops
├── src/opt/dataflow.rs    # generic worklist solver
├── src/opt/dce.rs
├── src/opt/lvn.rs
├── src/opt/constprop.rs
├── src/opt/licm.rs
├── src/opt/strength.rs
├── src/opt/inline.rs
├── tests/bril/            # small .bril programs with expected output and counts
├── tests/corpus/          # your module 3 programs with expected stdout
├── bench/brench.toml      # one run per cumulative pass list
├── bench/pairs.py         # every ordered pair of passes against the corpus
└── docs/REPORT.md`,
        commands: [
          { label: 'Build the optimizer', command: 'cargo build --release' },
          { label: 'Optimize one program and count instructions', command: 'bril2json < tests/bril/loop.bril | ./target/release/kilnopt --passes=licm,dce | brili -p' },
          { label: 'Compile a Kiln program through the optimizer', command: './target/release/kilnc lower examples/sum.kn | ./target/release/kilnopt --passes=all | brili' },
          { label: 'Run the unit tests and the pass-pair check', command: 'cargo test && python3 bench/pairs.py' },
          { label: 'Measure every pass cumulatively', command: 'brench bench/brench.toml > results/cumulative.csv' },
        ],
      },
      requirements: [
        '`kilnopt` reads Bril JSON from stdin and writes Bril JSON to stdout. `--passes` takes a comma-separated list run in order, `none` copies the program, `all` runs your best pipeline, and an unknown pass name exits with status 2.',
        'One generic worklist solver, parameterised by direction, meet and transfer function, implements reaching definitions, live variables and constant propagation. `kilnopt --dump=live` prints the in and out sets of every block.',
        '`dce` removes globally unused definitions and locally overwritten definitions, and it repeats until nothing changes.',
        '`lvn` performs local value numbering with copy propagation, commutativity, constant folding and the identities `x + 0`, `x * 1`, `x * 0` and `x - x`, and it stays correct when a variable is reassigned after it became canonical.',
        '`constprop` uses the constant lattice across blocks, rewrites uses of known constants, and turns a `br` on a known constant into a `jmp`.',
        '`licm` finds natural loops from back edges, creates preheaders, and hoists an instruction only when its operands are invariant and it cannot trap or have a side effect on a path that never executed it.',
        '`sr` replaces a multiplication of a basic induction variable by a loop-invariant value with an added variable, so that no such `mul` remains in the loop.',
        '`inline` works on the whole program, inlines non-recursive callees of at most 30 instructions, renames variables and labels safely, and never inlines a function into itself or around a recursive cycle.',
        '`kilnc lower` handles the Kiln subset above, and every corpus program in that subset prints its expected output after `--passes=all`, as do all programs in Bril\'s `benchmarks/core`.',
        '`docs/REPORT.md` is 3-5 pages. It has a table of dynamic instruction counts with each pass added cumulatively, a correctness argument for each pass, and at least one real bug in your own pass with the test that caught it.',
      ],
      acceptanceTests: [
        '`a: int = const 4; b: int = const 2; sum1: int = add a b; sum2: int = add a b; prod: int = mul sum1 sum2; print prod;` prints 36 and executes 6 instructions. After `--passes=lvn,dce` it still prints 36 and executes exactly 2.',
        '`@main(a: int, b: int)` with body `x: int = add a b; y: int = add a b; x: int = const 0; z: int = add a b; print x y z;` run with arguments 3 and 4 prints `0 7 7` after `lvn`. A pass that keeps using `x` as the canonical name prints `0 7 0`.',
        '`@main(c: bool)` branches to two blocks that each set `x: int = const 5`, then both reach `y: int = add x x; print y;`. It executes 5 instructions and prints 10. After `constprop,dce` it prints 10 and executes at most 4, and no `add` remains. If one branch sets `x` to 6 instead, the `add` must stay and the outputs are 10 and 12.',
        'A program sets `n = 1000`, `i = 0`, `s = 0`, `one = 1` and `c = 8`, then loops with `cond: bool = lt i n; br cond .body .done;` and the body `k: int = mul c c; t: int = mul i k; s: int = add s t; i: int = add i one; jmp .loop;`, followed by `print s`. It prints 31968000, executes 7,008 instructions and 2,000 `mul`. After `licm` it prints the same value in at most 6,010 instructions. After `licm,sr` it prints the same value with at most 2 `mul` executed.',
        'A loop that never runs, because `n = 0`, has a body containing `d: int = div x zero; s: int = add s d;`, where `zero` is 0, and the program then prints `s`, which starts at 0. After every pass list that includes `licm` it prints 0 and exits normally. Hoisting the `div` makes `brili` fail on the division by zero.',
        'A program with a non-recursive `@double` and a recursive `@fib` that prints `double(fib(10))` prints 110 before and after `inline`, with no call to `@double` left and the recursive calls intact. All 30 ordered pairs of the six passes leave the output of every corpus and `benchmarks/core` program unchanged.',
      ],
      resources: [
        {
          title: 'Bril: A Compiler Intermediate Representation for Learning',
          url: 'https://capra.cs.cornell.edu/bril/',
          type: 'documentation',
          cost: 'free',
          provider: 'Cornell University',
          note: 'The language reference and the guides to `brili`, `bril2json` and `brench`.',
        },
      ],
      stretchGoals: [
        'Add sparse conditional constant propagation and find a program it improves that `constprop` followed by `dce` does not.',
        'Add global value numbering on SSA and report how much further it goes than `lvn`.',
        'Add dead store elimination for Bril\'s memory extension, backed by a simple alias analysis.',
      ],
    },
  ],
  finalProject: {
    slug: 'final-kiln',
    title: 'Kiln: a typed language with a native compiler and a browser playground',
    repoName: 'kiln-lang',
    summary: 'Finish Kiln as a real language with generics, closures, pattern matching and garbage collection, compiled to x86-64 and playable in the browser, where anyone can watch a program pass through every stage.',
    language: 'Rust (stable), with a C17 runtime',
    estimatedHours: 60,
    overview: `Most compiler projects end as a folder that only their author can run. Kiln ends as a link. A visitor opens a web page, edits a program, runs it, and steps through its tokens, syntax tree, typed core, IR before and after each optimization, and final x86-64 assembly. On Linux, the same compiler produces standalone native binaries with your own register allocator and garbage collector.

The language is the one you parsed in MP 1, now given full meaning. It has generic algebraic data types, exhaustive pattern matching, type inference, first-class closures, strings and arrays. Integers are 63-bit and wrap on overflow, so that every value fits in one tagged 64-bit word. That single decision is what makes generics work without monomorphization and lets the collector tell pointers from integers precisely.

One front end and one optimizer feed two back ends, and each has a job. **Native code** is for speed: closure conversion, SSA, the passes from MP 2, instruction selection, register allocation and a C runtime with a mark-sweep collector. **The bytecode VM** is for reach: because it is written in Rust, the compiler and VM together build to WebAssembly and run in the browser with no server. The two back ends also check each other, because any program on which they disagree is a bug.

Finally, prove that it is a language and not a demo. Write real programs in Kiln, including a small Lisp interpreter, measure the native compiler against C and CPython, and explain the gap in a design document. The work reuses your module 3, 4, 6 and 7 projects and both MPs.`,
    setup: {
      extensions: [...rustExtensions, 'ms-vscode.cpptools', 'github.vscode-github-actions'],
      toolchain: [
        ...rustToolchain,
        'Add the WebAssembly target and packager: `rustup target add wasm32-unknown-unknown`, then `cargo install wasm-pack`.',
        'Install `hyperfine` for benchmarks, and Node.js for the `wasm-pack test --node` tests. Publishing the playground needs only free GitHub Pages.',
      ],
      structure: `kiln-lang/
├── src/                   # lexer, parser, types, core, lowering, opt/
├── src/codegen/           # instruction selection, register allocator, x86-64 emitter
├── src/vm/                # bytecode compiler, VM, collector
├── runtime/               # C runtime: allocator, mark-sweep GC, strings, printing
├── playground/            # wasm-bindgen crate and a static web page
├── examples/              # lisp.kn, life.kn, mandelbrot.kn, nqueens.kn, json.kn
├── tests/corpus/          # programs with expected stdout and exit status
├── tests/diff.py          # runs every program on every back end and compares
├── bench/                 # hyperfine scripts, C and Python baselines, results
├── docs/DESIGN.md         # language, architecture, each pass before and after
├── .github/workflows/     # ci.yml and pages.yml
└── README.md`,
      commands: [
        { label: 'Build the compiler and runtime', command: 'cargo build --release && make -C runtime' },
        { label: 'Run a program on the VM', command: './target/release/kilnc run examples/life.kn' },
        { label: 'Compile a native binary', command: './target/release/kilnc build -O2 examples/lisp.kn -o build/lisp && ./build/lisp' },
        { label: 'Inspect one compiler stage', command: './target/release/kilnc dump --stage=regalloc examples/nqueens.kn' },
        { label: 'Run the tests and compare all back ends', command: 'cargo test && python3 tests/diff.py tests/corpus' },
        { label: 'Fuzz the back ends against each other', command: 'cargo run --release --bin fuzz -- --typed --diff --seed 1 --count 10000' },
        { label: 'Build and serve the playground', command: 'wasm-pack build playground --target web --release && python3 -m http.server -d playground 8000' },
      ],
    },
    requirements: [
      'The checker resolves names, infers the types of locals and lambda parameters by unification, instantiates generic functions and constructors at each use, and rejects non-exhaustive `match` expressions with a diagnostic that names a missing pattern.',
      'Semantics are fixed and identical on all back ends: `int` is 63-bit and wraps, `/` truncates toward zero, strings are immutable UTF-8 joined with `+`, arrays are mutable and bounds-checked, and an out-of-bounds index or division by zero prints a runtime error to stderr and exits with status 3. The built-ins are `print`, `len`, `str` and `array`.',
      'Closures capture variables by reference, with captured mutable variables moved to the heap, and native code implements them through closure conversion to flat environment records.',
      'Pattern matches lower to tag tests and branches in the IR, and the MP 2 passes run on the Kiln IR, with allocation and calls treated conservatively.',
      'The native back end emits x86-64 Linux assembly using the System V calling convention, passes more than six arguments correctly, and uses a graph-colouring or linear-scan register allocator with a spill report per function.',
      'The runtime is C with a mark-sweep collector using precise roots from a shadow stack or stack maps, an explicit mark worklist so that a long list cannot overflow the C stack, and a heap threshold that grows by a fixed factor after each collection.',
      'The VM is a bytecode compiler and stack machine in Rust with tagged values, call frames and its own collector, and it passes the same corpus as native code.',
      'The compiler and VM build to `wasm32-unknown-unknown`. The playground is a static page that runs programs and shows every stage: tokens, syntax tree, typed core, IR, each pass, and assembly.',
      '`examples/` holds at least five programs a visitor would enjoy, including a Lisp interpreter written in Kiln, and all of them run on both back ends.',
      '`docs/DESIGN.md` covers the language, the architecture, the IR, each pass with a before and after example, and limitations. A benchmark table compares the VM, `-O0`, each pass added cumulatively, C at `-O2` and CPython on at least five programs, and explains the gaps.',
    ],
    acceptanceTests: [
      'A `counter()` function returning a closure over `let mut n = 0` that adds one and returns `n`: calling one closure three times prints 3 on the third call, and a second closure from a new `counter()` prints 1. Using one generic `map` and `fold` on `List[T]`, with `range` including both ends, `fold(map(range(1, 100), fn(x) { x * x }), 0, fn(a, b) { a + b })` prints 338350, and the same `map` also works on a `List[str]`.',
      '`Cons(1, Cons("a", Nil))` is rejected with a type mismatch whose span is exactly the `"a"`, and no code is generated. `match xs { Nil => 0 }` on a `List[int]` is rejected with an error naming the missing pattern `Cons(_, _)`.',
      'A program that uses `while` loops for 100 rounds of building a 1,000,000-element list and summing the values 0 to 999,999 prints 499999500000 one hundred times, with peak memory under 200 MB in `/usr/bin/time -v`. With no collector it would need more than 2 GB, since each cell takes at least 24 bytes.',
      '`fib(35)` prints 9227465, `nqueens(8)` prints 92, a recursive `sum(100000)` prints 5000050000, and an 8-parameter function called with 1 to 8 returns 36 while the spill report shows at least one spill for a function with 20 live locals. All of these match on the VM, `-O0` and `-O2`, and native `-O2` runs `fib(35)` at least 5 times faster than the VM and within 8 times of C at `-O2`.',
      '`4611686018427387903 + 1` prints -4611686018427387904, and `[1, 2, 3][5]` exits with status 3 and the same message on every back end. For 10,000 well-typed programs generated with seed 1, the VM, `-O0` and `-O2` produce byte-identical stdout and the same exit status.',
      'Called from `wasm-pack test --node`, the WebAssembly build returns `75025\\n` for a program printing `fib(25)`, returns a structured diagnostic with line and column for a syntax error, and returns a non-empty listing for every stage.',
    ],
    coverage: [
      { module: 'overview-and-lexing', demonstrates: 'The hand-written scanner with tracked spans feeds every stage, and the playground shows its token stream live.' },
      { module: 'parsing', demonstrates: 'The Pratt parser, error recovery and golden suite give friendly diagnostics in both the CLI and the browser.' },
      { module: 'semantic-analysis-and-types', demonstrates: 'Name resolution, unification-based inference, generics and exhaustiveness checks produce the typed core.' },
      { module: 'intermediate-representations', demonstrates: 'Programs lower to a three-address CFG in SSA form, and the playground displays that IR for any program.' },
      { module: 'optimization', demonstrates: 'The MP 2 passes run on real Kiln programs, and the cumulative benchmark table shows what each one buys.' },
      { module: 'code-generation-and-runtime', demonstrates: 'Instruction selection, register allocation, the calling convention and the mark-sweep runtime produce standalone x86-64 binaries.' },
      { module: 'programming-language-concepts', demonstrates: 'Closure conversion, tagged values, algebraic data types and the bytecode VM show the core language design ideas working together.' },
    ],
    portfolio: [
      'The README opens with a link to the live playground on GitHub Pages and a short GIF of a program being stepped through its stages.',
      'GitHub Actions runs the tests, `clippy`, the corpus on all back ends and a short fuzz on every push, deploys the playground, and shows a status badge in the README.',
      'The repository has a LICENSE, a tagged `v1.0.0` release with a prebuilt Linux x86-64 binary, and a commit history that tells the story of the compiler stage by stage.',
      'The README shows a language tour of about 30 lines, the benchmark table against C and CPython, and a link to `docs/DESIGN.md`.',
      'The playground ships with the example programs in a menu, so that a visitor can run the Lisp interpreter in one click.',
      'An architecture diagram shows the shared front end, the two back ends, and which stages run in the browser.',
    ],
    stretchGoals: [
      'Add a WebAssembly code generator so that the playground can run compiled code as well as bytecode, and compare the speed.',
      'Add a generational nursery to the runtime and measure the allocation-heavy benchmarks again.',
      'Add type classes or traits for overloading `==` and printing on user-defined types.',
      'Rewrite the Kiln lexer in Kiln as a first step toward self-hosting.',
    ],
  },
});
