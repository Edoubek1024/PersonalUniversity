import { defineCoursework } from '../define';

const cppExtensions = [
  'ms-vscode-remote.remote-wsl',
  'ms-vscode.cmake-tools',
  'llvm-vs-code-extensions.vscode-clangd',
  'ms-vscode.cpptools',
];
const cppToolchain = [
  'On Windows 10, install WSL 2 with `wsl --install -d Ubuntu-24.04` (or newer), then open the folder through the WSL extension so that every command below runs in Linux. Keep the project under `~/`, not `/mnt/c`.',
  'In Ubuntu: `sudo apt install build-essential gdb clang clangd clang-tidy clang-format cmake ninja-build`. You need GCC 13 or newer, Clang 18 or newer, and CMake 3.25 or newer.',
  'The `ms-vscode.cpptools` extension is there for its gdb debugger. Accept the clangd prompt to disable its IntelliSense, and add a `.clangd` file pointing `CompilationDatabase` at `build/debug`.',
];
const msvcNote =
  'To use MSVC instead of WSL: install Visual Studio 2022 Community with the C++ desktop workload, select a Visual Studio kit in CMake Tools, and change the preset flags to `/std:c++20 /W4 /permissive- /fsanitize=address`. There is no UBSan, so also run the suite in WSL before you call it finished.';

export default defineCoursework({
  subjectId: 'cpp-programming',
  machineProblems: [
    {
      slug: 'mp1-bigval',
      title: 'bigval: an arbitrary-precision integer that behaves like int',
      afterModule: 'value-semantics',
      coversModules: ['tools-and-language-core', 'classes-and-raii', 'value-semantics'],
      summary: 'Build a big integer value type with a small-buffer optimization, full arithmetic and comparison operators, measured moves, and an RPN calculator on top.',
      language: 'C++20',
      estimatedHours: 16,
      overview: `The aim of this MP is to write a type that a stranger could use as if it were \`int\`. \`bigval::Int\` holds integers of any size, copies deeply, moves cheaply, compares with \`<=>\`, and prints with \`<<\`. Users never think about its memory.

The memory is the interesting part. \`Int\` stores its magnitude as base $2^{32}$ limbs inside a small class you write called \`LimbBuffer\`. That class holds up to 4 limbs inline, with no heap at all, and switches to \`new[]\` beyond that. \`LimbBuffer\` is the one resource manager in the project, so it has a full set of special members, and it is where the rule of five lives. \`Int\` is built on it and declares no special members at all, which is the rule of zero.

You will prove the design by counting. A test replaces global \`operator new\` to count allocations and to fail on request, so claims such as "a move does not allocate" and "a failed assignment changes nothing" become assertions. Think carefully about the order of the data members in \`Int\`, because the defaulted assignment operator assigns them in order, and that decides whether the strong guarantee holds.

**Constraints.** Use only modules 1 to 3. Do not write your own templates, and do not use \`std::vector\` or \`std::string\` inside \`LimbBuffer\`. They are fine elsewhere, such as in the calculator stack and for \`to_string\`. Use sign-magnitude form. Build with no warnings under \`-Wall -Wextra -Wpedantic -Wshadow -Wconversion\`.`,
      setup: {
        extensions: cppExtensions,
        toolchain: [...cppToolchain, msvcNote],
        structure: `bigval/
├── CMakeLists.txt
├── CMakePresets.json          # debug, asan (ASan + UBSan), release
├── include/bigval/int.hpp     # public class bigval::Int
├── src/limb_buffer.hpp        # the rule-of-five resource manager
├── src/limb_buffer.cpp
├── src/int.cpp                # arithmetic, parsing, printing
├── app/bigcalc.cpp            # RPN calculator
├── tests/test_int.cpp         # Catch2 unit and property tests
├── tests/test_alloc.cpp       # counting and failing operator new
├── bench/bench_int.cpp        # timing with std::chrono
└── REPORT.md`,
        commands: [
          { label: 'Configure and build (debug)', command: 'cmake --preset debug && cmake --build build/debug' },
          { label: 'Run the tests', command: 'ctest --test-dir build/debug --output-on-failure' },
          { label: 'Run the tests under ASan and UBSan', command: 'cmake --preset asan && cmake --build build/asan && ctest --test-dir build/asan --output-on-failure' },
          { label: 'Try the calculator in a release build', command: 'cmake --preset release && cmake --build build/release && echo "2 128 pow" | ./build/release/bigcalc' },
        ],
      },
      requirements: [
        '`bigval::Int` is default constructible to 0, implicitly constructible from `std::int64_t`, and explicitly constructible from `const std::string&`, which accepts an optional sign and decimal digits and throws `std::invalid_argument` on anything else.',
        'The value is stored in sign-magnitude form in base $2^{32}$, and a `check_invariants()` function confirms there is no leading zero limb and that zero is never negative. Every test calls it after each operation.',
        '`LimbBuffer` is the only class with a user-written destructor, copy or move operation. It holds up to 4 limbs inline, allocates with `new[]` above that, and its moves are `noexcept`.',
        '`Int` declares none of the five special members, and `static_assert`s confirm that it is copyable, nothrow move constructible and nothrow move assignable.',
        'Provide `+`, `-`, `*`, `/`, `%`, their compound forms and unary `-`, as hidden friends or members. Division truncates toward zero and the remainder takes the sign of the dividend, as with `int`. Division by zero throws `std::domain_error`.',
        'Provide overloads of `+` and `*` that take an rvalue left operand and reuse its storage.',
        'Comparison uses a hand-written `operator<=>` returning `std::strong_ordering`, plus `operator==`, and works between `Int` and integers through the implicit constructor.',
        '`to_string()` and `operator<<` print decimal, and `to_string()` is at most $O(n^2)$ by peeling off base $10^9$ chunks.',
        '`bigcalc` reads one line of RPN at a time from stdin, supports integers, `+ - * / %`, `pow`, `fact`, `dup` and `swap`, and prints the top of the stack. An invalid line prints `error: <reason>` and continues with an empty stack.',
        'In the release build `5000 fact` (16,326 digits) finishes in under 100 ms, and `REPORT.md` records timings for `-O0` and `-O2`, plus allocation counts for `a = a + b` against `a += b` on 1,000-digit numbers.',
      ],
      acceptanceTests: [
        '`fact(30)` equals `265252859812191058636308480000000`, `fact(1000)` has 2,568 digits with a digit sum of 10,539, and the 1000th Fibonacci number (F(1) = 1) has 209 digits and ends in `849228875`.',
        '`2 128 pow` prints `340282366920938463463374607431768211456`, `12345678901234567890 * 98765432109876543210` equals `1219326311370217952237463801111263526900`, and $10^{40}$ divided by $10^{20} + 1$ gives quotient `99999999999999999999` and remainder 1.',
        '`-7 / 2` is -3, `-7 % 2` is -1, `7 / -2` is -3, and `7 % -2` is 1. For 100,000 random pairs of up to 512 bits from `std::mt19937_64` with seed 42, `a == (a / b) * b + a % b` and `|a % b| < |b|` both hold.',
        '`Int{"-0"} == 0` holds and prints `0`, `Int{"007"}` prints `7`, and `""`, `"-"` and `"12a"` each throw `std::invalid_argument`.',
        'With a counting `operator new`: adding, subtracting and multiplying values whose results stay below $2^{127}$ makes 0 allocations, copying a 1,000-digit value makes exactly 1, moving one makes 0, and growing a `std::vector<Int>` of 1,000 such values copies no `LimbBuffer`.',
        'With a failing `operator new`, a copy assignment that throws `std::bad_alloc` leaves the target equal to its old value, and ASan reports no error or leak.',
      ],
      resources: [
        {
          title: 'std::operator new, including replacement functions',
          url: 'https://en.cppreference.com/w/cpp/memory/new/operator_new',
          type: 'documentation',
          cost: 'free',
          provider: 'cppreference',
          note: 'Shows how to replace the global allocation functions for your counting test.',
        },
        {
          title: 'Hacker\'s Delight',
          url: 'https://www.hackersdelight.org/',
          type: 'textbook',
          cost: 'free',
          provider: 'Henry S. Warren',
          note: 'The code section has divmnu.c, a compact version of Knuth\'s Algorithm D for long division.',
        },
      ],
      stretchGoals: [
        'Add Karatsuba multiplication above a threshold you find by measurement, and report the crossover point.',
        'Add `gcd` and modular exponentiation, and test $2^{561} \\bmod 561 = 2$, since 561 is a Carmichael number.',
      ],
    },
    {
      slug: 'mp2-typedjson',
      title: 'typedjson: a JSON library with compile-time struct mapping',
      afterModule: 'templates-and-concepts',
      coversModules: ['value-semantics', 'standard-library', 'templates-and-concepts'],
      summary: 'Write a strict JSON parser and serializer, one generic parser core that also runs at compile time, and a concept-driven mapping between JSON and your own structs.',
      language: 'C++20',
      estimatedHours: 20,
      overview: `Most JSON libraries give you a tree of dynamic values. \`typedjson\` also gives you the other half: declare your struct's fields once, and the library converts in both directions, with errors that name the exact path that went wrong.

\`\`\`cpp
struct User { std::string name; int age; std::optional<std::string> email; };

template <>
inline constexpr auto tj::fields<User> = std::tuple{
    tj::field<"name">(&User::name),
    tj::field<"age">(&User::age),
    tj::field<"email">(&User::email),
};

User u = tj::from_value<User>(tj::parse(text));
std::string out = tj::dump(tj::to_value(u));
\`\`\`

The project touches nearly everything from modules 3 to 5. \`tj::Value\` is a recursive \`std::variant\` with value semantics. The parser is a recursive-descent function over \`std::string_view\`. It is written once, as a template over a \`Handler\` concept, so that the same grammar code builds a tree at run time and also validates a literal in a \`static_assert\`. Field names are \`FixedString\` template arguments, the field list is a \`std::tuple\`, and folds walk over it. Concepts choose how to convert each type, and an unsupported type fails with a one-line diagnostic.

**Constraints.** Use only modules 1 to 5. Errors are reported with exceptions derived from \`std::runtime_error\`. The parser must never copy the input text, and must not use recursion deeper than a fixed limit. Store object members in insertion order in a \`std::vector\`. No third-party library may appear in \`include/\`. Catch2, and \`nlohmann::json\` for the benchmark comparison, are the only dependencies.`,
      setup: {
        extensions: cppExtensions,
        toolchain: [
          ...cppToolchain,
          msvcNote,
          'Clone the test corpus into `third_party/`: `git clone --depth 1 https://github.com/nst/JSONTestSuite third_party/JSONTestSuite`.',
          'Install Python 3 for the data generator: `sudo apt install python3`.',
        ],
        structure: `typedjson/
├── CMakeLists.txt
├── CMakePresets.json
├── include/typedjson/
│   ├── value.hpp              # tj::Value, Array, Object
│   ├── parser.hpp             # Handler concept, parse_events, is_valid, parse
│   ├── dump.hpp               # tj::dump
│   ├── fixed_string.hpp
│   ├── fields.hpp             # field<"name">, fields<T>, Described
│   └── mapping.hpp            # to_value, from_value, Serializable
├── app/tjq.cpp                # path query tool
├── tests/                     # Catch2 tests plus the JSONTestSuite runner
├── bench/bench_parse.cpp      # against nlohmann::json
├── tools/gen_big.py           # reproducible 20 MB document
└── REPORT.md`,
        commands: [
          { label: 'Configure and build (debug)', command: 'cmake --preset debug && cmake --build build/debug' },
          { label: 'Run the tests, including JSONTestSuite', command: 'ctest --test-dir build/debug --output-on-failure' },
          { label: 'Run the tests under ASan and UBSan', command: 'cmake --preset asan && cmake --build build/asan && ctest --test-dir build/asan --output-on-failure' },
          { label: 'Query a file with a release build', command: "cmake --preset release && cmake --build build/release && ./build/release/tjq '.users[].name' data.json" },
          { label: 'Benchmark the parser', command: 'python3 tools/gen_big.py data/big.json && ./build/release/bench_parse data/big.json' },
        ],
      },
      requirements: [
        '`tj::Value` holds null, bool, `std::int64_t`, double, string, array and object in a single `std::variant`, declares no special members, and passes `static_assert(std::regular<tj::Value> && std::is_nothrow_move_constructible_v<tj::Value>)`.',
        'The grammar lives in one function template, `parse_events(std::string_view, Handler&)`, constrained by a `tj::Handler` concept. It follows RFC 8259 strictly, and rejects nesting deeper than 256 levels.',
        'A tree-building handler backs `tj::parse`, which throws `tj::ParseError` carrying 1-based line and column. A no-op handler backs `constexpr bool tj::is_valid(std::string_view)`, which works inside `static_assert`.',
        'Integers that fit `std::int64_t` stay integers, and other numbers become `double` through `std::from_chars`. String escapes are all supported, including `\\uXXXX` surrogate pairs, which decode to UTF-8.',
        '`tj::dump(value, indent = -1)` writes compact or pretty output, escapes control characters, and prints doubles in shortest round-trip form with `std::to_chars`.',
        '`tj::field<"name">(&T::member)` takes a `FixedString` template argument, `tj::fields<T>` is a variable template holding a `std::tuple` of fields, and a `tj::Described<T>` concept detects it. Duplicate field names are rejected at compile time by a `consteval` check.',
        '`tj::to_value` and `tj::from_value<T>` dispatch with concepts and `if constexpr`, for bool, integers, floating point, `std::string`, `std::optional<U>`, `std::vector<U>`, `std::map<std::string, U>` and `Described` types, using a fold over the tuple. `tj::Serializable<T>` is false for anything else.',
        '`tj::from_value` throws `tj::TypeError` with a path such as `$.addresses[0].city: expected string, got integer`. A missing non-optional field reports `missing field`, and an absent `std::optional` member becomes `std::nullopt`.',
        '`tjq PATH FILE` supports `.key`, `[n]` and `[]`, implemented with views over `std::string_view` where you can. It prints each match as one line of compact JSON, and exits with status 1 if nothing matched.',
        '`REPORT.md` gives parse throughput in MB/s and allocations per megabyte on a reproducible generated 20 MB document, compared with `nlohmann::json`, as a median of 10 runs. The target is to at least match its throughput.',
      ],
      acceptanceTests: [
        '`tj::dump(tj::parse(R"([1,2.5,"a",null,true,{"k":[]}])"))` returns its input byte for byte, and `tj::parse(R"("\\ud83d\\ude00")")` yields the 4 UTF-8 bytes `F0 9F 98 80`.',
        '`static_assert(tj::is_valid(R"({"a":[1,2,{"b":null}]})"));` and `static_assert(!tj::is_valid("[1,]"));` both compile, and `tj::parse` on the text `[1,` then a newline, then ` 2,,3]` throws with line 2, column 4.',
        'Every `y_*.json` file in JSONTestSuite is accepted, every `n_*.json` file is rejected, and every `i_*.json` file finishes with no crash under ASan and UBSan.',
        'With `User` extended by `std::vector<Address> addresses`, where `Address` has `std::string city`: `{"name":"Ada","age":"36","addresses":[]}` throws `$.age: expected integer, got string`, `{"name":"Ada","age":36,"addresses":[{"city":7}]}` throws `$.addresses[0].city: expected string, got integer`, and omitting `age` throws `$.age: missing field`.',
        '`9223372036854775807` parses as an integer and `9223372036854775808` as a double, and for 10,000 random `tj::Value` trees from a fixed seed, `tj::parse(tj::dump(v)) == v`.',
        'For `{"users":[{"name":"Ada","age":36},{"name":"Alan"}]}`: `tjq \'.users[].name\'` prints `"Ada"` and `"Alan"` on two lines, `tjq \'.users[0].age\'` prints `36`, and `tjq \'.users[1].age\'` prints nothing and exits with status 1. `static_assert(!tj::Serializable<std::thread>)` compiles.',
      ],
      resources: [
        {
          title: 'RFC 8259: The JavaScript Object Notation (JSON) Data Interchange Format',
          url: 'https://www.rfc-editor.org/rfc/rfc8259',
          type: 'documentation',
          cost: 'free',
          provider: 'IETF',
          note: 'The grammar is two pages long. Implement it literally.',
        },
        {
          title: 'JSONTestSuite',
          url: 'https://github.com/nst/JSONTestSuite',
          type: 'tool',
          cost: 'free',
          provider: 'Nicolas Seriot',
          note: 'A conformance corpus: `y_` must pass, `n_` must fail, and `i_` is implementation-defined.',
        },
        {
          title: 'nlohmann/json',
          url: 'https://github.com/nlohmann/json',
          type: 'tool',
          cost: 'free',
          provider: 'Niels Lohmann',
          note: 'Your benchmark baseline. Add it with FetchContent, for the benchmark target only.',
        },
      ],
      stretchGoals: [
        'Support `std::variant` and enums in the mapping, with enums serialized by name from a compile-time table.',
        'Add a streaming handler that maps JSON directly to a struct with no intermediate `tj::Value`, and report the speedup.',
      ],
    },
  ],
  finalProject: {
    slug: 'final-flightrec',
    title: 'flightrec: an always-on flight recorder for C++ programs',
    repoName: 'flightrec',
    summary: 'A tracing library you can leave running in production: wait-free per-thread rings, a binary trace format, crash dumps, and a tool that turns traces into statistics and Perfetto timelines.',
    language: 'C++20',
    estimatedHours: 55,
    overview: `An aircraft flight recorder is always on, cheap enough to ignore, and valuable exactly when something goes wrong. \`flightrec\` brings that idea to C++. Add one line to a function:

\`\`\`cpp
void parse_request(std::span<const std::byte> bytes) {
    flightrec::Span span{"parse_request"};
    span.set_value(bytes.size());
    // ...
}
\`\`\`

Each span costs well under a microsecond. It goes into a ring buffer owned by the calling thread, with no lock, no allocation and no waiting. A background thread streams those records to a binary file. If the program dies from an uncaught exception, or you call \`flightrec::dump\` when a request is slow, you get the last few seconds of what every thread was doing. A second tool, \`frtool\`, reads the file, prints latency percentiles, and exports a timeline that you can open in the Perfetto UI.

The interesting engineering is in the ring. A writer must never wait for a reader, so a reader can always be overtaken. The design is a seqlock applied to a whole ring. The writer advances a \`reserved\` counter, writes the record as relaxed atomic words, then advances \`published\`. A reader copies records, then re-reads \`reserved\`, and throws away anything the writer could have overwritten in the meantime. No torn record can ever reach the file, and every lost record is counted. You will have to justify each memory order in writing.

The rest of the project is the course in miniature: RAII spans, string names checked by a \`consteval\` constructor, a concept for traced values, rings that outlive their threads through deliberate ownership, a reader that treats its input as hostile, and a benchmark suite that keeps the overhead claim honest.

Finally you will use it. A demo program built on your module 7 thread pool has a deliberate bottleneck, and your README shows the trace that found it and the numbers after the fix.

**Constraints.** Use C++20 and the standard library, plus Catch2, Google Benchmark and your own \`typedjson\`, which writes the Chrome JSON export. Use the \`Result\` type from module 6, or enable C++23 for \`std::expected\`. Linux through WSL 2 is the supported platform, because ThreadSanitizer and libFuzzer are required.`,
    setup: {
      extensions: [...cppExtensions, 'github.vscode-github-actions'],
      toolchain: [
        ...cppToolchain,
        'This project needs WSL 2 even if you used MSVC earlier, because it depends on ThreadSanitizer and libFuzzer. If TSan aborts with `unexpected memory mapping`, run `sudo sysctl vm.mmap_rnd_bits=28`.',
        'For profiling, install `sudo apt install valgrind linux-tools-generic`. Use `perf record -e cpu-clock -g` if hardware counters are unavailable in WSL, and Callgrind if `perf` will not run.',
        'Open timelines in the Perfetto UI at https://ui.perfetto.dev from your Windows browser. Traces are processed locally and it is free.',
      ],
      structure: `flightrec/
├── CMakeLists.txt
├── CMakePresets.json          # debug, asan, tsan, release, fuzz
├── include/flightrec/
│   ├── flightrec.hpp          # Span, instant, counter, dump, init, shutdown
│   └── name.hpp               # consteval Name, TraceValue concept
├── src/
│   ├── ring.hpp               # the wait-free ring
│   ├── registry.cpp           # per-thread rings and their ownership
│   ├── collector.cpp          # jthread that drains rings to a file
│   └── format.hpp             # chunk layout and CRC-32
├── tools/frtool/              # reader, summary, top, export
├── examples/pipeline_demo.cpp # thread pool with a planted bottleneck
├── tests/                     # Catch2, stress tests, compile-fail tests
├── fuzz/fuzz_reader.cpp       # libFuzzer harness and corpus
├── bench/bench_span.cpp       # Google Benchmark
├── docs/FORMAT.md             # the file format
├── docs/DESIGN.md             # ring protocol with every memory order justified
├── .github/workflows/ci.yml
└── README.md`,
      commands: [
        { label: 'Build the release configuration', command: 'cmake --preset release && cmake --build build/release' },
        { label: 'Test under ASan and UBSan', command: 'cmake --preset asan && cmake --build build/asan && ctest --test-dir build/asan --output-on-failure' },
        { label: 'Test under ThreadSanitizer', command: 'cmake --preset tsan && cmake --build build/tsan && ctest --test-dir build/tsan --output-on-failure' },
        { label: 'Record a trace and export it', command: './build/release/examples/pipeline_demo --threads 8 --out demo.frt && ./build/release/frtool summary demo.frt && ./build/release/frtool export --chrome demo.frt demo.json' },
        { label: 'Measure the overhead', command: './build/release/bench/bench_span --benchmark_repetitions=10 --benchmark_report_aggregates_only=true' },
        { label: 'Fuzz the reader for 10 minutes', command: 'cmake --preset fuzz && cmake --build build/fuzz && ./build/fuzz/fuzz_reader -max_total_time=600 fuzz/corpus' },
      ],
    },
    requirements: [
      'The public API offers `flightrec::Span` (RAII, neither copyable nor movable, and recording one complete span when destroyed), `instant(Name)` and `counter(Name, value)`. `Span::set_value` accepts only types satisfying a `TraceValue` concept, which covers integers, floating point and enums, and stores them with `std::bit_cast`.',
      '`flightrec::Name` has a `consteval` constructor, so only constant strings are accepted. A CTest compile-fail test proves that a run-time `std::string` is rejected.',
      'Each thread writes to its own power-of-two ring of 32-byte records, stored as `std::atomic<std::uint64_t>` words, with a default of 65,536 records (2 MiB). After a thread\'s first event, recording takes no lock and makes no allocation, which a counting `operator new` proves over 1,000,000 spans.',
      'The ring never blocks the writer. It overwrites the oldest records, and readers validate against `reserved` after copying, so a torn record can never be delivered. `docs/DESIGN.md` justifies every memory order used, and the head and counters sit on separate cache lines.',
      'A registry owns every ring. A ring outlives its thread until it has been drained and is then freed, so records written just before a thread exits are still collected.',
      'A collector `std::jthread`, stopped through its `std::stop_token`, wakes every 10 ms by default and appends new records to a `.frt` file. It drains every ring on shutdown, and writes a per-thread count of lost records to the footer.',
      '`flightrec::dump(path)` writes the latest records of all rings from any thread with no pause to writers, and `install_terminate_handler()` uses `std::set_terminate` to do the same before the process aborts on an uncaught exception.',
      'The `.frt` format is specified in `docs/FORMAT.md`, with a magic number, a version, and typed chunks that each carry a length and a CRC-32. The reader returns errors as values, and rejects bad magic, truncation, bad lengths and CRC mismatches without crashing or allocating more than the file size justifies. A libFuzzer harness runs for 10 minutes without a crash.',
      '`frtool summary` prints count, total, mean, p50, p99 and max per span name, sorted by total time, using nearest-rank percentiles. `frtool top N` lists the N slowest spans, and `frtool export --chrome` writes Trace Event JSON through `typedjson` that opens in Perfetto with one track per thread.',
      'A span costs at most 200 ns at the median of 10 repetitions on WSL 2 at `-O2`, and building with `FLIGHTREC_DISABLED` makes `Span` an empty type that generates no code. The library installs for `find_package`, works through FetchContent, and CI builds a small consumer project each way.',
    ],
    acceptanceTests: [
      'A program opens spans `a`, then `b` inside it, then `c` inside that. The Chrome JSON holds exactly 3 `"ph":"X"` events, the interval of `c` lies inside that of `b`, and that of `b` lies inside that of `a`.',
      'With a ring of 1,024 records and no collector, writing 5,000 spans with values 0 to 4,999 and then calling `dump` yields exactly 1,024 records with values 3,976 to 4,999 in order, and reports 3,976 lost.',
      '8 threads write 1,000,000 spans each (100,000 under TSan), and each span\'s value encodes its thread and sequence number. With the collector running, collected plus lost equals exactly 8,000,000, values per thread are strictly increasing with no duplicates, and no torn record appears. A run of 1,000 short-lived threads with one span each yields 1,000 spans and no leak under ASan.',
      'For a fixture file of 100 spans named `x`, with durations of 1 to 100 ms, `frtool summary` prints count 100, total 5,050 ms, mean 50.5 ms, p50 50 ms, p99 99 ms and max 100 ms.',
      'A child process installs the handler, finishes a span named `last_good_step`, then throws an uncaught exception. It dies with `SIGABRT`, and the dump it leaves ends with `last_good_step`.',
      'Truncating a valid 64 KiB trace at every possible length, and flipping each byte in turn, never crashes the reader under ASan and UBSan. Each corrupted file produces either a clear error with a non-zero exit, or a correct result for the intact chunks before the damage.',
    ],
    coverage: [
      { module: 'tools-and-language-core', demonstrates: 'A CMake project with presets for debug, ASan, TSan, release and fuzzing, with clangd support and strict warnings on all of it.' },
      { module: 'classes-and-raii', demonstrates: '`Span` is a pure RAII type, and files, thread registration and the collector all release their resources through destructors on every path.' },
      { module: 'value-semantics', demonstrates: 'Records, chunks and statistics are regular value types with no special members, and move-only owners make ring transfer explicit.' },
      { module: 'standard-library', demonstrates: '`frtool` uses algorithms, views, `string_view`, `span`, `optional` and `variant` for chunk types, and the percentile code uses `nth_element`.' },
      { module: 'templates-and-concepts', demonstrates: 'The `TraceValue` concept, `consteval` names, `if constexpr` encoding and `static_assert` checks on the record layout, plus `typedjson` mapping for the export.' },
      { module: 'errors-and-ownership', demonstrates: 'The reader returns errors as values, the terminate handler dumps state on an uncaught exception, and the registry shows deliberate shared ownership of rings.' },
      { module: 'concurrency', demonstrates: 'The wait-free ring with justified memory orders, the `jthread` collector and stop tokens, and the thread pool in the demo, all clean under TSan.' },
      { module: 'performance-testing-and-scale', demonstrates: 'Benchmarks hold the overhead claim, fuzzing and CI cover the reader, and the library installs for `find_package` as a package others can use.' },
    ],
    portfolio: [
      'The README opens with a Perfetto screenshot of the demo, a three-line usage example, and the measured cost per span, followed by build instructions that work on a fresh machine.',
      'GitHub Actions builds with GCC and Clang, runs the tests in release, ASan with UBSan and TSan, runs a short fuzz job and `clang-tidy`, and shows a status badge in the README.',
      'The repository has a LICENSE, a `CHANGELOG.md`, a tagged `v1.0.0` release, and a commit history of small, descriptive commits.',
      '`docs/DESIGN.md` explains the ring protocol with a diagram and a justification for each memory order, and compares the design with a mutex-protected queue and with a tool such as Tracy.',
      'The README includes a benchmark table for overhead at 1, 4 and 8 threads, and the before and after results of the bottleneck the trace revealed.',
    ],
    resources: [
      {
        title: 'Perfetto UI',
        url: 'https://ui.perfetto.dev/',
        type: 'tool',
        cost: 'free',
        provider: 'Google',
        note: 'Opens Chrome Trace Event JSON directly, and processes the file in your browser.',
      },
      {
        title: 'Trace Event Format',
        url: 'https://docs.google.com/document/d/1CvAClvFfyA5R-PhYUmn5OOQtYMH4h6I0nSsKchNAySU/preview',
        type: 'documentation',
        cost: 'free',
        provider: 'Google',
        note: 'The JSON format your export writes. You need complete events (`X`), instants (`i`) and counters (`C`).',
      },
      {
        title: 'Tracy Profiler',
        url: 'https://github.com/wolfpld/tracy',
        type: 'tool',
        cost: 'free',
        provider: 'Bartosz Taudul',
        note: 'A mature frame profiler. Study it for comparison only. flightrec solves a narrower problem with a different design.',
      },
    ],
    stretchGoals: [
      'Keep a logical task on one track across `co_await` suspension, using a coroutine-aware span.',
      'Replace `steady_clock` with `rdtsc` plus calibration, and report the change in overhead.',
      'Add a crash dump from a `SIGSEGV` handler that uses only async-signal-safe calls.',
      'Port the library to MSVC, and run the tests natively on Windows.',
    ],
  },
});
