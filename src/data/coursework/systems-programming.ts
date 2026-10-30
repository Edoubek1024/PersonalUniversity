import { defineCoursework } from '../define';

const cExtensions = ['ms-vscode.cpptools', 'ms-vscode-remote.remote-wsl'];
const cToolchain = [
  'On Windows, install WSL 2 with Ubuntu, then open the folder through the WSL extension so every command below runs in Linux.',
  'In Ubuntu or on Linux: `sudo apt install build-essential gdb valgrind`. On macOS: Xcode Command Line Tools (use `leaks` in place of Valgrind).',
];

export default defineCoursework({
  subjectId: 'systems-programming',
  machineProblems: [
    {
      slug: 'mp1-malloc',
      title: 'mymalloc: a dynamic memory allocator',
      afterModule: 'pointers-and-memory',
      coversModules: ['c-fundamentals', 'pointers-and-memory'],
      supersedesProject: true,
      summary: 'Implement malloc, free, calloc and realloc on top of a heap you manage yourself, with coalescing and a measured fragmentation report.',
      language: 'C17',
      estimatedHours: 16,
      overview: `Every C program you have written so far has trusted \`malloc\` without seeing inside it. In this MP you replace it. You will manage a single region obtained from \`sbrk\`, carve it into blocks with headers and footers, keep the free blocks in an **explicit free list**, and merge neighbours when they are freed.

The point is to make pointers physical. You will cast between \`void *\`, \`char *\` and your block header type, do byte-accurate arithmetic, and hit every classic bug: off-by-one writes, misaligned returns, and corrupted metadata.

**Constraints.** Use only what you have learned: structs, pointer arithmetic, \`sbrk\`, and \`assert\`. No system calls beyond \`sbrk\`, and no global arrays larger than 64 bytes. Every returned pointer must be 16-byte aligned, as the C standard requires for \`max_align_t\` on x86-64.

The allocator must be good enough to be measured: you will write a small trace-driven driver, then report throughput and peak utilization for two placement policies.`,
      setup: {
        extensions: cExtensions,
        toolchain: cToolchain,
        structure: `mymalloc/
├── include/mymalloc.h     # public API: my_malloc, my_free, my_calloc, my_realloc
├── src/mymalloc.c         # the allocator
├── src/heapcheck.c        # my_heapcheck(): walks the heap and validates invariants
├── tests/test_alloc.c     # your acceptance tests, built with assert
├── traces/                # short workload traces
├── driver.c               # replays a trace and reports utilization
└── Makefile`,
        commands: [
          { label: 'Build with warnings and debug info', command: 'make CFLAGS="-std=c17 -Wall -Wextra -Werror -g -Og"' },
          { label: 'Run the tests', command: 'make test' },
          { label: 'Check the tests for invalid reads and writes', command: 'valgrind --error-exitcode=1 ./build/test_alloc' },
          { label: 'Replay a trace', command: './build/driver traces/mixed.trace --policy=first' },
        ],
      },
      requirements: [
        'Implement `my_malloc`, `my_free`, `my_calloc` and `my_realloc` with the same contracts as the C standard, including `my_malloc(0)` and `my_free(NULL)`.',
        'Every block has a header and footer holding its size and allocation bit, and all sizes are rounded so returned pointers are 16-byte aligned.',
        'Free blocks live on an explicit doubly linked free list threaded through their payloads, so the list adds no space overhead to allocated blocks.',
        'Support both first-fit and best-fit placement, chosen at runtime by a single setting.',
        'Split a free block when the remainder can hold a minimum block, and coalesce with both neighbours in constant time on every free.',
        '`my_realloc` grows in place when the next block is free and large enough, and copies only when it must.',
        '`my_heapcheck` walks the whole heap and fails on overlapping blocks, a free block missing from the list, adjacent uncoalesced free blocks, or a header and footer that disagree.',
        'The driver replays a trace file and prints peak utilization and operations per second, and `REPORT.md` compares both policies on at least three traces.',
      ],
      acceptanceTests: [
        '`my_malloc(1)`, `my_malloc(24)` and `my_malloc(4096)` each return non-NULL pointers divisible by 16, and writing every byte of each block leaves `my_heapcheck` passing.',
        'Allocate A, B and C, free A and C, then free B: `my_heapcheck` reports exactly one free block spanning all three.',
        'After `p = my_malloc(100)` is filled with a known pattern, `q = my_realloc(p, 1000)` preserves the first 100 bytes, and `my_realloc(q, 0)` behaves as your documented choice.',
        '`my_calloc(1000, 8)` returns all zero bytes after the same memory was dirtied and freed, and `my_calloc(SIZE_MAX, 2)` returns NULL instead of overflowing.',
        'A 100,000 operation random trace with a fixed seed keeps `my_heapcheck` passing every 1,000 operations and produces no Valgrind errors.',
      ],
      resources: [
        {
          title: 'CS:APP Labs: Malloc Lab',
          url: 'http://csapp.cs.cmu.edu/3e/labs.html',
          type: 'problem-set',
          cost: 'free',
          provider: 'Carnegie Mellon University',
          note: 'The classic version of this assignment. Read the writeup for the idea of trace-driven scoring.',
        },
      ],
      stretchGoals: [
        'Replace the single free list with segregated size classes and report the change in throughput.',
        'Use `LD_PRELOAD` to run a real program such as `ls` on top of your allocator.',
      ],
    },
    {
      slug: 'mp2-logscan',
      title: 'logscan: a fast parallel log analyzer',
      afterModule: 'performance-and-undefined-behaviour',
      coversModules: ['pointers-and-memory', 'the-toolchain', 'unix-system-calls', 'performance-and-undefined-behaviour'],
      summary: 'Build a command-line tool that memory-maps a large log file, counts events across forked workers, and proves its speedup with profiles.',
      language: 'C17',
      estimatedHours: 18,
      overview: `Real systems code has to be fast, correct and measured. \`logscan\` reads a web-server access log of a gigabyte or more and reports the top paths, the status-code distribution, and the bytes served per hour.

You will use \`mmap\` rather than \`read\`, split the file on line boundaries, and hand each chunk to a worker made with \`fork\`. Workers return their results through a pipe, so you will design a small binary wire format and handle partial reads and writes.

The second half of the MP is about evidence. You will profile with \`perf\`, remove the real hot spots, and show the before and after numbers. You will also run the code under the AddressSanitizer and UndefinedBehaviorSanitizer and keep it clean, because a fast tool that relies on undefined behaviour is not finished.

**Constraints.** Use C and the POSIX calls taught so far. No threads, because this course reaches them in Rust. Build with a Makefile that has separate debug, release and sanitizer configurations.`,
      setup: {
        extensions: cExtensions,
        toolchain: [...cToolchain, 'Also install the profiler: `sudo apt install linux-tools-generic` for `perf`. It may be restricted in WSL, so use `gprof` there instead.'],
        structure: `logscan/
├── src/main.c             # argument parsing and orchestration
├── src/parse.c            # line parsing with no allocation per line
├── src/table.c            # open-addressing hash table for path counts
├── src/worker.c           # fork, pipe, and the binary result format
├── tests/                 # unit tests plus small sample logs with known answers
├── scripts/genlog.py      # generates reproducible large logs
└── Makefile               # debug, release and asan targets`,
        commands: [
          { label: 'Build the release binary', command: 'make release' },
          { label: 'Build and test with sanitizers', command: 'make asan && ./build/asan/run_tests' },
          { label: 'Run on a generated log with four workers', command: './build/release/logscan --workers 4 --top 10 data/access.log' },
          { label: 'Profile a run', command: 'perf record -g ./build/release/logscan --workers 1 data/access.log && perf report' },
        ],
      },
      requirements: [
        'Open the input with `mmap` and split it into per-worker ranges that always begin and end on line boundaries, so no line is lost or counted twice.',
        'Create workers with `fork`, collect their results over pipes, and reap every child with `waitpid`, reporting a failure if any worker exits abnormally.',
        'Handle short reads and writes on pipes, and define the binary result format in one header.',
        'Parse without allocating per line, and implement your own hash table with resizing for the path counts.',
        'Report the top N paths, the count for each status code, and bytes served per hour, with output that does not depend on the worker count.',
        'Malformed lines are counted and skipped, and never crash the tool or read outside the mapping.',
        'The Makefile has debug, release and sanitizer builds with automatic header dependency tracking, and a clean `make` from scratch produces no warnings.',
        '`REPORT.md` shows a profile before and after optimizing, at least two specific changes and their measured effect, and a speedup table for 1, 2, 4 and 8 workers.',
      ],
      acceptanceTests: [
        'A hand-written 20-line log produces exactly the expected top paths, status counts and hourly byte totals.',
        'A file with no trailing newline, an empty file and a single-line file all produce correct results with 1 and 8 workers.',
        'For one generated log of at least 100 MB, output is byte-identical for `--workers 1` and `--workers 8`.',
        'A log containing 1,000 corrupted lines, including truncated lines and embedded NUL bytes, reports exactly 1,000 malformed lines under ASan and UBSan with no errors.',
        'Killing one worker with `SIGKILL` during a run makes `logscan` exit non-zero with a clear message rather than print partial results.',
      ],
      stretchGoals: [
        'Add a streaming mode that follows a growing file and updates totals once per second.',
        'Compare your hash table against a sorted-array approach and explain the cache behaviour you measure.',
      ],
    },
  ],
  finalProject: {
    slug: 'final-dualsh',
    title: 'dualsh: a Unix shell in C, rewritten in Rust',
    repoName: 'dualsh',
    summary: 'Build a job-control shell in C, rewrite it in safe Rust, add a concurrent feature, and publish a benchmarked comparison of the two.',
    language: 'C17 and Rust (stable)',
    estimatedHours: 45,
    overview: `A shell is the classic test of a systems programmer, because it touches everything: parsing, memory, processes, pipes, signals and terminals. You will build one twice.

First you write \`dualsh\` in C, with pipelines, redirection, background jobs and full job control. Then you rewrite it in Rust against the same test suite, using the type system to rule out whole classes of the bugs you met in C. Parsing should become an enum-based syntax tree, and resource handling should rely on ownership and \`Drop\`.

Finally you add one feature only to the Rust version that needs safe concurrency: a parallel \`pmap\` builtin that runs a command over many inputs with a worker pool and keeps output in input order.

The result is one repository that shows the whole course and makes a claim you can defend with data: what Rust cost, what it caught, and how the two compare at runtime. A shared black-box test suite written in Python runs against both binaries, so they are held to the same specification.`,
    setup: {
      extensions: ['ms-vscode.cpptools', 'rust-lang.rust-analyzer', 'ms-vscode-remote.remote-wsl', 'github.vscode-github-actions'],
      toolchain: [
        ...cToolchain,
        'Install Rust with `rustup` inside the same Linux environment, then add `clippy` and `rustfmt`.',
        'Install Python 3 for the shared black-box test suite and `hyperfine` for benchmarks.',
      ],
      structure: `dualsh/
├── c/                     # C implementation, with its own Makefile
│   ├── src/
│   └── Makefile
├── rust/                  # Rust implementation
│   ├── src/
│   └── Cargo.toml
├── tests/                 # shared black-box tests, run against both shells
├── bench/                 # hyperfine scripts and saved results
├── docs/COMPARISON.md     # what each language made easy, hard, and impossible
├── .github/workflows/ci.yml
└── README.md`,
      commands: [
        { label: 'Build both shells', command: 'make -C c release && cargo build --release --manifest-path rust/Cargo.toml' },
        { label: 'Run the shared tests against each shell', command: 'python tests/run.py --shell c/build/dualsh && python tests/run.py --shell rust/target/release/dualsh' },
        { label: 'Lint the Rust version', command: 'cargo clippy --manifest-path rust/Cargo.toml -- -D warnings' },
        { label: 'Benchmark pipeline startup', command: 'bash bench/run.sh' },
      ],
    },
    requirements: [
      'The C shell parses commands, quotes, pipelines of any length, `<`, `>`, `>>`, `2>&1`, `&&`, `||` and `;` through a hand-written tokenizer and parser.',
      'The C shell implements `cd`, `exit`, `jobs`, `fg` and `bg`, places each pipeline in its own process group, and hands the terminal to foreground jobs.',
      'Ctrl-C and Ctrl-Z affect only the foreground job, and finished background jobs are reaped and reported without a race between the signal handler and the main loop.',
      'The C shell runs clean under ASan, UBSan and Valgrind across the whole test suite, and it builds with `-Wall -Wextra -Werror` from a Makefile with dependency tracking.',
      'The Rust shell passes the same black-box suite, models commands as an enum-based syntax tree, and uses `unsafe` only in small wrappers with a comment justifying each one.',
      'The Rust shell adds a `pmap N cmd` builtin that runs `cmd` for each line of stdin on N worker threads and prints results in input order.',
      'A profile of both shells identifies the slowest path in each, and at least one measured optimization lands in each language.',
      '`docs/COMPARISON.md` covers memory bugs found, lines of code, benchmark results, and at least three bugs the C version allowed and the Rust compiler rejected.',
    ],
    acceptanceTests: [
      '`printf "b\\na\\n" | sort | uniq -c > out.txt` produces the same `out.txt` in both shells and in Bash.',
      '`sleep 30 &` followed by `jobs` lists the job, and `fg` brings it back so Ctrl-Z stops it and `bg` resumes it.',
      '`false && echo no; true || echo no; echo yes` prints only `yes`, and `exit 3` sets the exit status to 3.',
      'A pipeline of 100 `cat` processes runs to completion and leaves no zombies, checked through `ps` from the test harness.',
      '`seq 1 100 | pmap 8 "sh -c \\"sleep 0.01; echo {}\\""` prints 1 through 100 in order and finishes in under half the time of `pmap 1`.',
      'Feeding 10,000 random byte strings to the parser never crashes either shell.',
    ],
    coverage: [
      { module: 'c-fundamentals', demonstrates: 'The tokenizer and parser use structs, enums, strings and the exact integer and conversion rules of C.' },
      { module: 'pointers-and-memory', demonstrates: 'The syntax tree and job table are heap structures with clear ownership, verified clean by Valgrind.' },
      { module: 'the-toolchain', demonstrates: 'The Makefile, debugger workflow, sanitizer builds and CI show command of the C toolchain.' },
      { module: 'unix-system-calls', demonstrates: 'Pipelines, redirection, process groups, signals and terminal control use the core POSIX calls directly.' },
      { module: 'performance-and-undefined-behaviour', demonstrates: 'Sanitizer runs remove undefined behaviour, and profiles drive the measured optimizations.' },
      { module: 'rust-fundamentals', demonstrates: 'The Rust rewrite models the grammar with enums, pattern matching and `Result`-based error handling.' },
      { module: 'ownership-and-safe-concurrency', demonstrates: 'File descriptors are owned types, and `pmap` uses threads and channels with no data races.' },
    ],
    portfolio: [
      'The README opens with a terminal recording or GIF of job control and `pmap`, followed by build instructions that work on a fresh machine.',
      'GitHub Actions builds both shells, runs the shared tests and sanitizers, and runs `clippy` on every push, with a status badge in the README.',
      'The repository has a LICENSE, a tagged `v1.0.0` release, and a commit history with small, descriptive commits.',
      'The README summarises the C and Rust benchmark table and links to `docs/COMPARISON.md`.',
      'An architecture section explains the process-group and signal design in your own words, with a diagram.',
    ],
    stretchGoals: [
      'Add scripting support with `if`, `while` and functions to one implementation.',
      'Add tab completion and persistent history using raw terminal mode.',
    ],
  },
});
