import { defineCoursework } from '../define';

const rustExtensions = ['rust-lang.rust-analyzer', 'vadimcn.vscode-lldb', 'tamasfe.even-better-toml'];
const rustToolchain = [
  'Everything builds natively on Windows 10. Install Rust with `rustup-init.exe` from rust-lang.org, accept the default `x86_64-pc-windows-msvc` host, and let it install the Visual Studio Build Tools with the "Desktop development with C++" workload. You need Rust 1.88 or newer (`rustc --version`), and `rustup update` keeps you current.',
  'The default rustup profile includes Clippy and rustfmt. If `cargo clippy` is missing, run `rustup component add clippy rustfmt`.',
  'In VS Code, rust-analyzer gives you Run, Debug and Test buttons above `main` and every test. CodeLLDB is the debugger. Turn on format on save.',
];

export default defineCoursework({
  subjectId: 'rust-programming',
  machineProblems: [
    {
      slug: 'mp1-fmtx',
      title: 'fmtx: a Unicode-aware paragraph formatter',
      afterModule: 'ownership-and-borrowing',
      coversModules: ['getting-started', 'ownership-and-borrowing'],
      summary:
        'Write a command-line tool that rewraps text to a given width, greedily or with minimum raggedness, and justifies it, working with borrowed slices of the input instead of copies.',
      language: 'Rust 2024 (1.88 or newer)',
      estimatedHours: 12,
      overview: `Unix has \`fmt\` and \`par\`. You will write \`fmtx\`, which reads text, finds its paragraphs, and rewraps each one to a width you choose. It has two strategies. **Greedy** wrapping puts as many words on each line as fit, which is what most editors do. **Optimal** wrapping minimises the sum of the squares of the spaces left at the end of each line except the last, which is the idea behind TeX's line breaking. It avoids the very short lines that greedy wrapping sometimes leaves. A \`--justify\` flag then spreads each line to the full width.

\`\`\`text
PS> Get-Content gettysburg.txt | cargo run --release -- --width 25 --optimal
Four score and seven
years ago our fathers
brought forth on this
continent, a new nation,
conceived in Liberty,
and dedicated to the
proposition that all men
are created equal.
\`\`\`

The point of the MP is **ownership**. The input is read once into a \`String\`. Words are \`&str\` slices that borrow from it, and nothing is copied until you build an output line. You will meet the borrow checker on purpose, and keep a record of what it told you.

Start \`src/lib.rs\` from this skeleton and keep these signatures:

\`\`\`rust
#![allow(unused_variables)] // delete this line once every function is written

pub fn split_words(text: &str) -> Vec<&str> {
    todo!()
}

pub fn display_width(word: &str) -> usize {
    todo!()
}

pub fn wrap_greedy(words: &[&str], width: usize) -> Vec<String> {
    todo!()
}

pub fn wrap_optimal(words: &[&str], width: usize) -> Vec<String> {
    todo!()
}

pub fn cost(lines: &[String], width: usize) -> u64 {
    todo!()
}

pub fn justify(line: &str, width: usize) -> String {
    todo!()
}

pub fn split_paragraphs(text: &str) -> Vec<&str> {
    todo!()
}

pub fn format_text(text: &str, width: usize, optimal: bool, justified: bool) -> String {
    todo!()
}
\`\`\`

**Constraints.** Use only modules 1 and 2: functions, loops, \`String\`, \`Vec\`, slices, references and tests. Do not define structs, enums, traits or generic functions, and do not use closures or iterator adapters such as \`map\`, \`filter\`, \`enumerate\` or \`zip\`, which modules 3 to 5 teach. Plain \`for\` loops over ranges, slices, \`chars()\`, \`char_indices()\`, \`lines()\` and \`split_whitespace()\` are fine, and so is \`.expect()\` for I/O errors. No crates from crates.io.`,
      setup: {
        extensions: rustExtensions,
        toolchain: rustToolchain,
        structure: `fmtx/
├── Cargo.toml          # edition = "2024", rust-version = "1.88", no dependencies
├── src/
│   ├── lib.rs          # the eight functions above, with unit tests
│   └── main.rs         # argument parsing and I/O only
├── tests/
│   ├── acceptance.rs   # the acceptance tests below
│   ├── cli.rs          # runs the built binary with std::process::Command
│   └── data/           # input files and their expected outputs
└── REPORT.md`,
        commands: [
          { label: 'Build and run on a file', command: 'cargo run --release -- --width 40 --optimal tests/data/gettysburg.txt' },
          { label: 'Pipe text in from PowerShell', command: 'Get-Content tests/data/gettysburg.txt | cargo run --release -- -w 25 --justify' },
          { label: 'Run all tests', command: 'cargo test' },
          { label: 'Run the timing test in release mode', command: 'cargo test --release -- --nocapture generated' },
          { label: 'Lint and format check', command: 'cargo clippy --all-targets -- -D warnings; cargo fmt --check' },
        ],
      },
      requirements: [
        'The package has a library with the eight functions in the skeleton and a binary whose `main.rs` only parses arguments, reads input and prints. It uses nothing from modules 3 onwards, has no dependencies, and `cargo clippy --all-targets -- -D warnings` and `cargo fmt --check` both pass.',
        '`split_words` splits on Unicode whitespace (`char::is_whitespace`) and returns slices of its input: the only allocation is the returned `Vec`. `display_width` returns the number of `char`s, and the README states that combining marks and wide East Asian characters make this an approximation.',
        '`wrap_greedy` adds each word to the current line if the line\'s display width, with one space between words, stays at or below `width`, and otherwise starts a new line. A word wider than `width` goes alone on its own line and is never split.',
        '`cost` returns the sum of `(width - w)²` over every line except the last, where `w` is the line\'s display width. A line wider than `width`, which can only hold one overlong word, costs 0.',
        '`wrap_optimal` returns a wrapping of minimum `cost` under the same rules, computed bottom-up by dynamic programming without recursion, in time proportional to the number of words times the most words that fit on one line. When two choices cost the same, it puts more words on the earlier line.',
        '`justify` widens a line to exactly `width` by adding spaces between words, giving the leftmost gaps one extra space when they cannot be shared evenly. A one-word line, or a line already at or over `width`, is returned with single spaces. `format_text` never justifies the last line of a paragraph.',
        '`split_paragraphs` returns slices of the input separated by one or more blank lines (lines that are empty or only whitespace), and handles both `\\n` and `\\r\\n`. `format_text` ends every output line with `\\n`, separates paragraphs with exactly one blank line, and returns an empty string for input with no words.',
        'The binary accepts `fmtx [-w N | --width N] [--optimal] [--justify] [FILE]` in any order, with a default width of 72, and reads standard input when no file is given. A width that is 0 or not a number, or a file that cannot be read, stops with a message naming the problem. An unknown option prints a usage line to standard error and exits with code 2 through `std::process::exit`.',
        '`tests/cli.rs` runs the compiled binary (`env!("CARGO_BIN_EXE_fmtx")`) on at least three files in `tests/data/` and compares its output with stored expected files, including one with `\\r\\n` line endings and one with non-ASCII text.',
        'In a release build, `wrap_optimal` handles the 200,000-word generated input below in under 200 ms. `REPORT.md` gives the greedy and optimal timings, three borrow checker errors you hit while writing the code (each with its code, its three labels and your fix), and an explanation of why `split_words` returns `Vec<&str>` rather than `Vec<String>`.',
      ],
      acceptanceTests: [
        '`split_words("  the quick\\tbrown\\n\\nfox  ")` returns `["the", "quick", "brown", "fox"]`, and the byte offsets of the four slices from the start of the input, computed with `as_ptr`, are 2, 6, 12 and 19.',
        'For `"aaa bb cc ddddd"` at width 6, greedy gives `["aaa bb", "cc", "ddddd"]` with cost 16 and optimal gives `["aaa", "bb cc", "ddddd"]` with cost 10. For `"a supercalifragilistic b"` at width 10, both give `["a", "supercalifragilistic", "b"]` with cost 81.',
        '`justify("the quick brown", 20)` is `"the    quick   brown"`, `justify("a b c d", 11)` is `"a   b  c  d"` and `justify("lonely", 10)` is `"lonely"`. `"naïve café"` has display width 10 but `len()` 12, so it fits one line at width 10 and splits into `["naïve", "café"]` at width 9.',
        'For the sentence "Four score and seven years ago our fathers brought forth on this continent, a new nation, conceived in Liberty, and dedicated to the proposition that all men are created equal." at width 25, greedy gives 8 lines with cost 140 and optimal gives 8 lines with cost 100, whose fifth and sixth lines are `conceived in Liberty,` and `and dedicated to the`. At width 40, both give 5 lines with cost 46.',
        '`format_text("one two\\n\\n\\n  three\\n", 72, false, false)` is `"one two\\n\\nthree\\n"`, `"one\\r\\ntwo\\r\\n   \\r\\nthree"` gives the same result, and both `""` and `" \\n\\n "` give `""`.',
        'Generate 200,000 words with `x = 42`, then for each word set `x = (1103515245 * x + 12345) mod 2^31` and use `1 + x mod 12` copies of `a`, joined by single spaces. The first five lengths are 4, 9, 6, 11 and 8 and the text is 1,501,459 bytes. At width 72, greedy gives 21,697 lines with cost 515,636 and optimal gives 21,697 lines with cost 437,568.',
      ],
      resources: [
        {
          title: 'Line wrap and word wrap: minimum raggedness',
          url: 'https://en.wikipedia.org/wiki/Line_wrap_and_word_wrap',
          type: 'article',
          cost: 'free',
          provider: 'Wikipedia',
          note: 'The greedy algorithm and the minimum raggedness cost that the optimal mode minimises.',
        },
        {
          title: 'The Rust Programming Language (Brown University interactive edition), chapter 4',
          url: 'https://rust-book.cs.brown.edu/ch04-04-slices.html',
          type: 'interactive',
          cost: 'free',
          provider: 'Brown University',
          note: 'Reread the slices section before writing `split_words` and `split_paragraphs`.',
        },
      ],
      stretchGoals: [
        'Preserve quoted-email prefixes such as `> ` and leading indentation, rewrapping the text after the prefix as `par` does.',
        'Measure display width with the `unicode-width` crate after module 3, and add a test with CJK text, where each character takes two columns.',
      ],
    },
    {
      slug: 'mp2-gridcalc',
      title: 'gridcalc: a spreadsheet engine with incremental recalculation',
      afterModule: 'collections-iterators-smart-pointers',
      coversModules: ['modelling-data', 'generics-traits-lifetimes', 'collections-iterators-smart-pointers'],
      summary:
        'Build the engine behind a spreadsheet: a formula parser, an evaluator with spreadsheet error values, and a dependency graph that recomputes only what changed, in order, and detects cycles.',
      language: 'Rust 2024 (1.88 or newer)',
      estimatedHours: 20,
      overview: `A spreadsheet is a small programming language with an unusual runtime. Every cell is a variable, every formula is an expression, and changing one cell must update exactly the cells that depend on it, in an order where each is computed after its inputs. \`gridcalc\` is that engine, with a terminal front end:

\`\`\`text
PS> cargo run --release -- examples/fib.grid
loaded 31 cells
> get A30
832040
> set A1 2
recomputed 30
> get B1
3010348
> set A1 =B1
recomputed 30
> get A1
#CYCLE!
\`\`\`

Formulas follow this grammar, where \`^\` is right-associative and binds tighter than unary minus, so \`=-2^2\` is -4 (Excel says 4):

\`\`\`text
formula := "=" expr
expr    := term (("+" | "-") term)*
term    := unary (("*" | "/") unary)*
unary   := "-" unary | power
power   := primary ("^" unary)?
primary := number | cellref | NAME "(" [arg ("," arg)*] ")" | "(" expr ")"
arg     := cellref ":" cellref | expr
number  := digits ["." digits]
cellref := "A".."ZZZ" followed by a row from 1 to 1048576, uppercase only
\`\`\`

The project uses most of modules 3 to 5. The parser builds an \`enum Expr\` with \`Box\`ed children, cell values are an enum of number, text, empty and error, and errors are values that flow through formulas rather than panics. The aggregate functions sit in a table of boxed closures. A generic topological sort orders recalculation, and iterators do most of the looping.

**Constraints.** Use only modules 1 to 5, the standard library and no crates. Do not use \`Rc\`, \`RefCell\` or \`unsafe\`. Cells refer to each other by \`CellRef\`, and the \`Sheet\` owns everything. Pitfall: \`Iterator::sum\` over an empty iterator of \`f64\` returns \`-0.0\` in current Rust, which prints as \`-0\`, so start from \`0.0\` with \`fold\`.`,
      setup: {
        extensions: rustExtensions,
        toolchain: rustToolchain,
        structure: `gridcalc/
├── Cargo.toml
├── src/
│   ├── lib.rs          # pub use of the public API
│   ├── cell.rs         # CellRef with FromStr and Display, Value, CellError
│   ├── parse.rs        # tokenizer and recursive-descent parser into Expr
│   ├── eval.rs         # evaluation and the function table
│   ├── graph.rs        # generic topo_order and its unit tests
│   ├── sheet.rs        # Sheet: contents, values, dependency maps, set, load
│   └── main.rs         # REPL: set, get, show, deps, save, quit
├── tests/acceptance.rs
├── examples/fib.grid
└── README.md`,
        commands: [
          { label: 'Run the REPL on an example sheet', command: 'cargo run --release -- examples/fib.grid' },
          { label: 'Run all tests', command: 'cargo test' },
          { label: 'Run the deep-chain test in a debug build', command: 'cargo test deep_chain' },
          { label: 'Time the large tests in release mode', command: 'cargo test --release -- --nocapture deep_chain' },
          { label: 'Lint and format check', command: 'cargo clippy --all-targets -- -D warnings; cargo fmt --check' },
        ],
      },
      requirements: [
        '`CellRef { col: u32, row: u32 }` is 0-based, derives `Copy, Eq, Hash, Ord`, and implements `FromStr` and `Display` for columns `A` to `ZZZ` and rows 1 to 1,048,576. Lowercase letters, row 0, leading zeros and four-letter columns are rejected with your own error type.',
        'Cell content is trimmed. Empty content clears the cell, content starting with `=` is a formula, content that parses as a finite `f64` is a number, and anything else is text. A formula that fails to parse is stored, and evaluates to `#PARSE!`, or to `#NAME?` for an unknown function name. Parsing never panics.',
        'The parser builds `enum Expr` with `Box`ed sub-expressions following the grammar above, where ranges are allowed only as function arguments. `Value` is an enum of `Empty`, `Number(f64)`, `Text(String)` and `Error(CellError)`, and both implement `Display`, with numbers printed by `{}` so that `=2*3` shows `6`.',
        'In arithmetic, an empty cell is 0, text gives `#VALUE!`, and an error operand propagates, the leftmost first. Division by zero gives `#DIV/0!`, and any other non-finite result gives `#VALUE!`.',
        '`SUM`, `AVERAGE`, `MIN`, `MAX` and `COUNT` take any number of arguments. Inside ranges, empty and text cells are skipped and errors propagate, while direct arguments follow the arithmetic rules. An empty `SUM` is 0, an empty `AVERAGE` is `#DIV/0!` and an empty `MIN` or `MAX` is 0. These five live in a `HashMap<&\'static str, Box<dyn Fn(&[f64]) -> Result<f64, CellError>>>`, so a new aggregate is one entry. `IF(c, a, b)` is a special form that evaluates only the chosen branch, and any other number of arguments gives `#VALUE!`.',
        '`graph.rs` exposes `pub fn topo_order<N, F, I>(nodes: &[N], deps: F) -> (Vec<N>, Vec<N>)` where `N: Copy + Eq + Hash`, `F: Fn(N) -> I` and `I: IntoIterator<Item = N>`. It uses Kahn\'s algorithm with no recursion, returns dependencies before dependents, and returns the nodes it could not order (cycles and everything downstream of them) in input order. It is unit-tested on integers.',
        'The `Sheet` keeps forward dependencies and reverse dependencies in `HashMap`s keyed by `CellRef`, including empty cells that formulas refer to. `Sheet::set(&mut self, cell, content) -> usize` recomputes that cell and every transitive dependent exactly once, in topological order, touches no other cell, and returns how many cells it recomputed. Cells on a cycle, or depending on one, become `#CYCLE!`.',
        '`Sheet::cells_in(&self, a: CellRef, b: CellRef) -> impl Iterator<Item = (CellRef, &Value)> + \'_` yields the non-empty cells of a rectangle in row-major order without collecting into a `Vec`, and range evaluation and the `show` command use it.',
        '`Sheet::load` reads `CELL: content` lines, skipping blank lines and `#` comments, and returns a `LoadError` that names the line number and implements `Display` and `std::error::Error`. `main` returns `Result<(), Box<dyn std::error::Error>>` and uses `?`. The REPL supports `set CELL content` (printing `recomputed N`), `get CELL`, `show A1:C5` (a grid with 12-character columns and right-aligned numbers), `deps CELL`, `save FILE` and `quit`.',
        'No evaluation step recurses across cells, so a 100,000-cell chain neither overflows the 1 MiB main-thread stack on Windows in a debug build nor runs slowly. In a release build, loading that chain takes under 1 s and the following `set A1` under 0.5 s. The README explains why the design needs no `Rc<RefCell<_>>`.',
      ],
      acceptanceTests: [
        '`=2+3*4-10/4` is 11.5, `=(2+3)*4` is 20, `=2^3^2` is 512, `=-2^2` is -4, `=10-4-3` is 3, `=2^-1` is 0.5, and `=0.1+0.2` displays as `0.30000000000000004`.',
        'With `A1: 1`, `A2: 1`, `A3` to `A30` each `=` the sum of the two cells above, and `B1: =SUM(A1:A30)`, A30 is 832040 and B1 is 2178308. `set A1 2` returns 30, after which A30 is 1149851 and B1 is 3010348. `set A30 0` then returns 2 and B1 becomes 1860497.',
        'With `A1: =B1+1`, `B1: =A1+1`, `C1: =A1*2`, `D1: 5` and `E1: =A1`, the cells A1, B1, C1 and E1 are `#CYCLE!` and D1 is 5. `set B1 3` returns 4 and gives A1 = 4, C1 = 8 and E1 = 4. `set A1 =A1` then returns 3 and makes A1, C1 and E1 `#CYCLE!` again.',
        'With A5 holding the text `hello`: `=1/0` is `#DIV/0!`, `=IF(1, 5, 1/0)` is 5, `=IF(0, 5, 1/0)` is `#DIV/0!`, `=A5+1` and `=SUM(A5, 1)` are `#VALUE!`, `=SUM(A4:A6)` is `0` (not `-0`), `=FOO(1)` is `#NAME?`, `=1+` and `=A1:A3` are `#PARSE!`, `=AVERAGE(Z1:Z5)` is `#DIV/0!`, `=COUNT(Z1:Z5)` is 0, `=(-8)^(1/3)` is `#VALUE!` and `=IF(1, 2)` is `#VALUE!`. With C1 to C4 holding 4, 8, `x` and -3, `=AVERAGE(C1:C4)` is 3, `=MIN(C1:C4)` is -3 and `=COUNT(C1:C4, 10)` is 4. Setting C2 to `=1/0` turns the average into `#DIV/0!`.',
        'A sheet with `A1: 1` and `A2` to `A100000` each `=` the cell above plus 1 gives A100000 = 100000. `set A1 0` returns 100000 and gives A100000 = 99999, in a debug build and in a release build.',
        '`"A1"`, `"Z1"`, `"AA10"`, `"ZZ1"`, `"ZZZ1"` and `"XFD1048576"` parse to (col, row) = (0, 0), (25, 0), (26, 9), (701, 0), (18277, 0) and (16383, 1048575), and print back unchanged. `"A0"`, `"1A"`, `"a1"`, `"A"`, `"AAAA1"`, `"A01"` and `"A1048577"` are rejected. `topo_order` on nodes `[3, 1, 2, 4, 5, 6]`, where 2 depends on 1, 3 on 2 and 1, 4 on itself and 5 on 4, orders exactly 1, 2, 3 and 6 with each node after its dependencies, and returns `[4, 5]` as left over.',
      ],
      resources: [
        {
          title: 'Simple but Powerful Pratt Parsing',
          url: 'https://matklad.github.io/2020/04/13/simple-but-powerful-pratt-parsing.html',
          type: 'article',
          cost: 'free',
          provider: 'Alex Kladov',
          note: 'Written in Rust. An alternative to recursive descent that handles precedence and associativity neatly.',
        },
        {
          title: 'Topological sorting: Kahn\'s algorithm',
          url: 'https://en.wikipedia.org/wiki/Topological_sorting',
          type: 'article',
          cost: 'free',
          provider: 'Wikipedia',
          note: 'The in-degree algorithm `topo_order` uses, and why the nodes it leaves behind are exactly those on or after a cycle.',
        },
      ],
      stretchGoals: [
        'Add relative and absolute references (`$A$1`) and a `copy A1 B1:B10` command that adjusts relative references the way spreadsheets do.',
        'Detect which cells are actually on a cycle, using Tarjan\'s strongly connected components, and give cells that only depend on a cycle a different error.',
      ],
    },
  ],
  finalProject: {
    slug: 'final-pixelpress',
    title: 'pixelpress: a fast image resizing library and thumbnail server',
    repoName: 'pixelpress',
    summary:
      'A resampling library with four filters, correct alpha handling, multithreaded passes and one measured piece of `unsafe` code, plus a Tokio thumbnail server with back-pressure and a cache, benchmarked against the `image` crate.',
    language: 'Rust 2024 (1.88 or newer)',
    estimatedHours: 50,
    overview: `Every photo site, chat app and CMS resizes images, and doing it well is subtle. Naive code gives jagged downscales, dark halos around transparent edges, and servers that fall over when 50 uploads arrive at once. \`pixelpress\` gets all three right, and proves it with numbers.

The library resamples in two separable passes, horizontal then vertical, with precomputed weight tables for four filters: Box, Triangle, Catmull-Rom and Lanczos3. You use one exact convention, so that results are reproducible to the byte. For an output of \`out\` pixels from \`in\` pixels on one axis, let \`scale = in / out\` and \`s = max(scale, 1)\`. Output pixel \`i\` has \`center = (i + 0.5) * scale\` and uses input pixels \`k\` from \`max(floor(center - r*s + 0.5), 0)\` up to but not including \`min(floor(center + r*s + 0.5), in)\`, where \`r\` is the filter radius (0.5, 1, 2 or 3). Each has weight \`f((k + 0.5 - center) / s)\`, and the weights are normalised to sum to 1. Accumulate in \`f32\` with no rounding between passes, then round half away from zero and clamp to 0 to 255. RGBA is resized in **premultiplied alpha**, so that transparent pixels do not bleed their hidden colour into visible ones.

Speed comes from three places: weight tables computed once per axis, both passes split into bands of rows across threads with \`std::thread::scope\`, and the inner kernel compiled a second time for AVX2 and chosen at run time. That last part is the project's only \`unsafe\` code. The safety contract is one sentence long, the CPU supports AVX2, and you must measure whether it pays for itself.

On top sits \`pixelpress-server\`, an axum and Tokio service that accepts an image and returns a thumbnail. Decoding and resizing run on a fixed pool of worker threads behind a bounded queue, never on the async runtime. A full queue gives an immediate \`503\` rather than an ever-growing backlog, and repeated requests are served from an LRU cache.

**Constraints.** Rust 2024 with \`rust-version = "1.88"\`. The library may depend only on \`image\`, for decoding, encoding and the benchmark baseline. The server may add \`tokio\` and \`axum\`, the command-line tool may use \`clap\`, and the tests and benchmarks may use \`proptest\` and \`criterion\`. Everything builds and runs natively on Windows 10. WSL 2 is needed only for the \`perf\` profile in the README and for Miri's Linux CI job, because \`perf\` exists only on Linux.`,
    setup: {
      extensions: [...rustExtensions, 'ms-vscode-remote.remote-wsl', 'github.vscode-github-actions'],
      toolchain: [
        ...rustToolchain,
        'Install a nightly toolchain for Miri: `rustup toolchain install nightly --component miri`, then `cargo +nightly miri setup`. Miri runs on Windows.',
        'Linux is needed only for profiling with `perf`. Install WSL 2 with `wsl --install -d Ubuntu-24.04`, open the repository through the WSL extension, install Rust there with the rustup shell script, then `sudo apt install linux-tools-generic` and `cargo install flamegraph`. If hardware counters are unavailable in WSL, use `perf record -e cpu-clock`.',
        'Use `curl.exe` (built into Windows 10) or the REST tooling of your choice to send images to the server, for example `curl.exe -s -o thumb.png --data-binary "@photo.png" "http://127.0.0.1:8080/resize?w=200&h=0"`.',
      ],
      structure: `pixelpress/
├── Cargo.toml                  # workspace: members, shared lints, rust-version
├── crates/pixelpress/          # the library, published to crates.io
│   ├── src/lib.rs              # #![deny(unsafe_code)], public API and docs
│   ├── src/filter.rs           # define_filters! and the four kernels
│   ├── src/weights.rs          # weight tables
│   ├── src/pixel.rs            # Pixel trait: Gray8, Rgb8, Rgba8
│   ├── src/view.rs             # ImageView<'a, P>, ImageViewMut<'a, P>
│   ├── src/resize.rs           # passes, premultiplication, threads
│   ├── src/simd.rs             # the only unsafe code: AVX2 dispatch
│   ├── tests/                  # exact cases, invariants, proptest
│   └── benches/resize.rs       # Criterion, against image::imageops::resize
├── crates/pixelpress-server/   # axum + Tokio: /resize, /healthz, /metrics
├── crates/pixelpress-cli/      # pp resize IN OUT --width 400 --filter lanczos3
├── docs/DESIGN.md
├── .github/workflows/ci.yml
└── README.md`,
      commands: [
        { label: 'Build everything in release mode', command: 'cargo build --workspace --release' },
        { label: 'Run all tests and doc tests', command: 'cargo test --workspace' },
        { label: 'Lint and format check', command: 'cargo clippy --workspace --all-targets -- -D warnings; cargo fmt --all --check' },
        { label: 'Check the scalar kernels under Miri', command: 'cargo +nightly miri test -p pixelpress --lib' },
        { label: 'Resize one file', command: 'cargo run --release -p pixelpress-cli -- resize photo.jpg thumb.png --width 400 --filter lanczos3' },
        { label: 'Start the server', command: 'cargo run --release -p pixelpress-server -- --workers 4 --queue 8 --cache-mb 64' },
        { label: 'Benchmark against the image crate', command: 'cargo bench -p pixelpress' },
        { label: 'Check that the library can be published', command: 'cargo publish --dry-run -p pixelpress' },
      ],
    },
    requirements: [
      'The library exposes `ImageView<\'a, P>` and `ImageViewMut<\'a, P>`, which borrow pixel bytes with a width, a height and a row stride, and `sub_view` crops without copying. A `Pixel` trait with an associated `CHANNELS` constant is implemented for `Gray8`, `Rgb8` and `Rgba8`, and `resize<P: Pixel>` is generic over it. Invalid sizes and buffers that are too short return a `ResizeError` enum that implements `Display` and `Error`. A convenience `resize_image(&image::DynamicImage, width, height, Filter)` handles the common case.',
      'Resampling follows the convention in the overview exactly: separable passes, horizontal first, weight tables built once per axis and reused for every row, `f32` accumulation with no rounding between passes, and rounding half away from zero with clamping at the end. RGBA is converted to premultiplied alpha before resizing and back afterwards, and an output pixel with alpha 0 is `(0, 0, 0, 0)`.',
      'A `define_filters!` declarative macro generates the `Filter` enum, `Filter::ALL`, each filter\'s radius, and `FromStr` and `Display` with the names `box`, `triangle`, `catmull-rom` and `lanczos3`, from one line per filter. The README justifies the macro, and explains with a benchmark why `match` on an enum beats `Box<dyn Fn(f32) -> f32>` for the kernel.',
      '`resize_parallel(..., threads)` splits the output rows of each pass into contiguous bands with `chunks_mut` and `std::thread::scope`, takes no locks, and produces output identical to `threads = 1`. The README reports speedups at 1, 2, 4 and 8 threads.',
      '`src/simd.rs` is the only module with `#![allow(unsafe_code)]` under a crate-level `#![deny(unsafe_code)]`. It compiles the horizontal kernel a second time inside a `#[target_feature(enable = "avx2")]` function, checks `is_x86_feature_detected!("avx2")` once and caches the choice in a `OnceLock`, and makes one `unsafe` call with a `// SAFETY:` comment stating the CPU check. Other targets, and the environment variable `PIXELPRESS_FORCE_SCALAR=1`, use the scalar kernel, whose output is identical byte for byte.',
      'The server, built on axum and Tokio, offers `POST /resize?w=&h=&filter=&format=png|jpeg` with the image as the request body, `GET /healthz` and `GET /metrics`. Either dimension may be 0 to keep the aspect ratio, rounded half up with a minimum of 1. Both 0, a dimension above 8,000, or an unknown filter returns 400 with a JSON error body, and a body over 20 MiB returns 413.',
      'Decoding, resizing and encoding run on a fixed pool of `--workers` standard threads that read jobs from a `std::sync::mpsc::sync_channel(--queue)` and reply through `tokio::sync::oneshot`. When the queue is full, the handler returns 503 with `Retry-After: 1` at once instead of waiting. No CPU-heavy work runs on a Tokio worker thread.',
      'An LRU cache of encoded results, keyed by a hash of the input bytes together with the width, height, filter and format, holds at most `--cache-mb` megabytes. It lives in an `Arc` shared by all handlers behind a `Mutex` that is never held across an `.await`. `/metrics` reports `requests`, `cache_hits`, `rejected` and the p50 and p99 latency of the last 1,000 requests from `AtomicU64` counters and a ring buffer.',
      'The library has rustdoc for every public item, with runnable examples and `# Errors` and `# Panics` sections, and `#![warn(missing_docs)]`. `cargo publish --dry-run -p pixelpress` passes, and the manifest has a license, description, repository, keywords, categories and `rust-version`.',
      'GitHub Actions runs `fmt`, `clippy -D warnings`, the tests on `windows-latest` and `ubuntu-latest`, a build with Rust 1.88 to check the minimum version, Miri on the library\'s unit tests on Linux, and `cargo bench --no-run`. A Criterion benchmark compares a single-threaded 4000x3000 to 1000x750 Lanczos3 RGBA downscale with `image::imageops::resize` and `FilterType::Lanczos3` on the same input. The target is to be at least as fast with one thread and at least 2.5 times faster with 4 threads on a 4-core machine. The README reports the medians either way.',
    ],
    acceptanceTests: [
      'Box: the 4x1 grey image `[0, 100, 200, 255]` resized to 2x1 gives `[50, 228]`. Triangle: `[0, 255]` resized from 2x1 to 4x1 gives `[0, 64, 191, 255]`. Catmull-Rom: the step `[0, 0, 0, 0, 255, 255, 255, 255]` resized from 8x1 to 16x1 gives `[0, 0, 0, 0, 0, 0, 0, 52, 203, 255, 255, 255, 255, 255, 255, 255]`, and before clamping its extremes are -17.93 and 272.93, so a test without the clamp must fail.',
      'Alpha: the 2x1 RGBA image (255, 0, 0, 255), (0, 255, 0, 0), a red pixel next to a fully transparent green one, resized to 1x1 with Box gives (255, 0, 0, 128). Without premultiplication it would be (128, 128, 0, 128), and a test asserts that no green appears.',
      'For all four filters: resizing any image to its own size returns identical bytes, and a 37x23 image filled with (12, 200, 99, 255) stays exactly that colour when resized to every width from 1 to 50 at heights 1, 7, 23 and 50. A proptest over random images up to 64x64 and random target sizes checks the output dimensions and that 1, 2, 4 and 8 threads and the scalar and AVX2 kernels give identical bytes.',
      'Server: posting an 800x600 PNG with `w=200&h=0` returns 200, `image/png` and a 200x150 image. A 333x1000 image with `w=0&h=100` gives 33x100, `w=0&h=0` gives 400 with a JSON body, and a 21 MiB body gives 413. Repeating the first request returns byte-identical output and raises `cache_hits` by exactly 1.',
      'Back-pressure: with `--workers 2 --queue 2` and a test hook that makes each job take at least 200 ms, 10 simultaneous requests give at least 4 successes and at least one 503 with `Retry-After: 1`, `rejected` equals the number of 503 responses, and `GET /healthz` answers within 50 ms while the load is running.',
      'Concurrency is safe: `cargo test` runs a stress test in which 8 tokio tasks each post 50 requests while the cache evicts, and every response matches a direct library call on the same input. With the environment variable `PIXELPRESS_FORCE_SCALAR` set to `1`, `cargo test` passes with the same golden outputs as the default run.',
    ],
    coverage: [
      { module: 'getting-started', demonstrates: 'A Cargo workspace with shared lints, rustfmt and Clippy enforced in CI, unit and integration tests, and a debugger setup in VS Code.' },
      { module: 'ownership-and-borrowing', demonstrates: 'Image views borrow pixel data instead of copying it, and `chunks_mut` hands each thread a disjoint `&mut` band of the output, which the borrow checker verifies.' },
      { module: 'modelling-data', demonstrates: '`ResizeError` and request errors are enums with `Display` and `Error`, filters and formats are enums, and the workspace splits into library, server and command-line crates with a deliberate public API.' },
      { module: 'generics-traits-lifetimes', demonstrates: '`resize<P: Pixel>` is generic over pixel formats through a trait with an associated constant, and `ImageView<\'a, P>` and `sub_view` show lifetimes in a public API.' },
      { module: 'collections-iterators-smart-pointers', demonstrates: 'Weight tables built with iterator chains, the LRU cache made of a `HashMap` and a `VecDeque`, and shared server state in an `Arc`.' },
      { module: 'concurrency', demonstrates: 'Scoped threads for parallel passes, a worker pool behind a bounded channel with oneshot replies, atomics for metrics, a `Mutex`-protected cache, and an axum and Tokio server that never blocks its executor.' },
      { module: 'beyond-safe-rust', demonstrates: 'One audited `unsafe` call for AVX2 dispatch under `#![deny(unsafe_code)]` with Miri in CI, the `define_filters!` macro, Criterion benchmarks against `image`, and documentation ready for crates.io.' },
    ],
    portfolio: [
      'The README opens with a side-by-side of a photo downscaled by naive nearest-neighbour sampling and by pixelpress Lanczos3, a transparent PNG showing the halo that premultiplication removes, a three-line usage example, and the benchmark table.',
      'GitHub Actions runs the full check matrix on Windows and Linux with a status badge, and a tagged `v0.1.0` release includes a `CHANGELOG.md` and prebuilt `pp` binaries for both platforms.',
      'The repository is dual-licensed MIT OR Apache-2.0, as is the Rust convention, and `cargo publish --dry-run` passes, so the library is one command away from crates.io.',
      '`docs/DESIGN.md` explains the weight convention with a worked example, why alpha is premultiplied, how the server sheds load, and the measured gain or loss from the AVX2 path, with a flame graph recorded with `perf` in WSL 2.',
      'A short write-up compares pixelpress with `image::imageops::resize` on speed and on output, using an SSIM or mean absolute difference figure on three test photos.',
    ],
    resources: [
      {
        title: 'Lanczos resampling',
        url: 'https://en.wikipedia.org/wiki/Lanczos_resampling',
        type: 'article',
        cost: 'free',
        provider: 'Wikipedia',
        note: 'The kernel, why it rings near sharp edges, and why the window size of 3 is the usual choice.',
      },
      {
        title: 'image crate documentation',
        url: 'https://docs.rs/image/latest/image/',
        type: 'documentation',
        cost: 'free',
        provider: 'docs.rs',
        note: 'Decoding and encoding, `DynamicImage`, and `imageops::resize`, your benchmark baseline.',
      },
      {
        title: 'axum documentation',
        url: 'https://docs.rs/axum/latest/axum/',
        type: 'documentation',
        cost: 'free',
        provider: 'docs.rs',
        note: 'Routing, extractors for query strings and bodies, `State`, and the body size limit layer.',
      },
    ],
    stretchGoals: [
      'Hand-write the horizontal kernel with `std::arch` AVX2 intrinsics, keep it bit-identical to the scalar kernel, and report the gain over the auto-vectorised version.',
      'Add an aarch64 NEON path and run the tests on a GitHub Actions ARM runner.',
      'Resize in linear light by converting from sRGB and back, and show the visible difference on a fine black-and-white pattern.',
      'Expose the library to C with a `cdylib`, a hand-written header, and a test program built with the `cc` crate.',
    ],
  },
});
