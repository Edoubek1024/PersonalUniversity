import { defineCoursework } from '../define';

const goExtensions = ['golang.go', 'ms-vscode-remote.remote-wsl'];
const goToolchain = [
  'On Windows 10, install WSL 2 with Ubuntu, then open the folder through the WSL extension so every command below runs in Linux. This course uses WSL because `go test -race` needs cgo and a C compiler, which works out of the box there. Native Windows Go can build everything else.',
  'In Ubuntu, run `sudo apt install build-essential`, then install Go 1.24 or newer by following the Linux steps at go.dev/doc/install. The Ubuntu `golang` package may be older.',
  'When VS Code offers to install the Go tools, accept, so that you get `gopls` and the debugger.',
];

export default defineCoursework({
  subjectId: 'go-programming',
  machineProblems: [
    {
      slug: 'mp1-tinyindex',
      title: 'tinyindex: an inverted index and search tool',
      afterModule: 'language-basics',
      coversModules: ['language-basics'],
      summary: 'Build the core data structure of a search engine from slices, maps and structs: a Unicode-aware tokenizer, sorted posting lists, and ranked search with deterministic output.',
      language: 'Go 1.24 or newer',
      estimatedHours: 6,
      overview: `Search engines rest on one simple structure, the **inverted index**: a map from each word to the sorted list of documents containing it. \`tinyindex\` builds one for a folder of text files and answers ranked queries from the command line.

The project is small, yet each part targets something Go does differently. The tokenizer has to work on runes, because \`len\` and indexing count bytes, and "Déjà-vu" is not ASCII. Posting lists are sorted slices, so intersecting two of them is a merge rather than a nested loop. Map iteration is randomised, so every result must be sorted explicitly, and the tests run many times to prove it. Handing out a posting list without copying it would let a caller corrupt your index through slice aliasing.

**Constraints.** Use only what module 1 teaches: the standard library, slices, maps, structs and methods. No goroutines, and no interfaces of your own. Handle errors with the plain \`if err != nil\` style.`,
      setup: {
        extensions: goExtensions,
        toolchain: goToolchain,
        structure: `tinyindex/
├── go.mod
├── main.go                # the command line
├── index/index.go         # Tokenize, Index, Add, Search, Top
├── index/index_test.go    # table-driven tests
└── testdata/              # small text files with known answers`,
        commands: [
          { label: 'Run a search', command: 'go run . testdata quick fox' },
          { label: 'Run the tests 100 times to catch ordering bugs', command: 'go test -count=100 ./...' },
          { label: 'Check formatting and vet', command: 'gofmt -l . && go vet ./...' },
        ],
      },
      requirements: [
        '`Tokenize(text string) []string` lowercases the text and splits it into runs of letters and digits, as defined by `unicode.IsLetter` and `unicode.IsDigit`, working on runes.',
        '`NewIndex()` returns an `*Index`, and `Add(name, text string) error` adds a document. Adding a name a second time returns an error and changes nothing.',
        'The index maps each term to a slice of `Posting{DocID, Count}`, sorted by `DocID`, and it stores each term only once per document.',
        '`Search(query string) []Result` tokenizes the query with the same function and uses AND semantics, so a document must contain every term.',
        'Terms are combined by merging two sorted posting lists in linear time, with no map lookups per document and no nested loop over both lists.',
        'A result score is the sum of the counts of the query terms in that document. Results are sorted by score descending and then name ascending.',
        '`Top(n int) []TermCount` returns the `n` most frequent terms across all documents, sorted by count descending and then alphabetically.',
        '`Postings(term string) []Posting` returns a copy, so changing the returned slice cannot change the index.',
        'The command `tinyindex <dir> <terms...>` indexes every `.txt` file directly under `dir`, prints one `name score` line per result, and exits with status 1 and a clear message if the directory cannot be read.',
      ],
      acceptanceTests: [
        '`Tokenize("Déjà-vu, 3 TIMES!")` returns `["déjà", "vu", "3", "times"]`, and `Tokenize("")` returns an empty result.',
        'With `a.txt` = `The quick brown fox. The fox!`, `b.txt` = `the lazy dog` and `c.txt` = `Quick quick fox`, `Search("fox")` returns `a.txt` with score 2 then `c.txt` with score 1.',
        'On the same documents, `Search("quick FOX")` returns `a.txt` and `c.txt` in that order, each with score 3, since a tie falls back to the name. `Search("fox dog")` and `Search("")` return no results.',
        'On the same documents, `Top(2)` returns `fox` and `quick`, each with count 3. `the` also has 3 but sorts after them.',
        'Setting `Postings("fox")[0].Count = 99` leaves a later `Search("fox")` unchanged, and the test suite passes with `-count=100`.',
        'A generated corpus of 5,000 documents of 200 random words indexes in under 2 seconds, and `Search` for two common words returns in under 10 ms, measured with `time.Since`.',
      ],
      stretchGoals: [
        'Rank with TF-IDF instead of raw counts, and compare the top results on a few real documents.',
        'Add phrase queries by storing word positions in each posting.',
      ],
    },
    {
      slug: 'mp2-dupfind',
      title: 'dupfind: a concurrent duplicate file finder',
      afterModule: 'concurrency',
      coversModules: ['interfaces-and-errors', 'concurrency'],
      summary: 'Find duplicate files with a bounded concurrent pipeline over fs.FS, with streaming hashes, partial-failure reporting and prompt cancellation.',
      language: 'Go 1.24 or newer',
      estimatedHours: 8,
      overview: `\`dupfind\` scans a directory tree and reports files with identical contents, along with the disk space they waste. It is a genuinely handy tool, and a compact exercise in the structure of a concurrent Go program.

The work is a pipeline. One goroutine walks the tree, files are grouped by size so that unique sizes are never read, a pool of workers hashes the remaining candidates with SHA-256, and a collector assembles the report. Each stage owns the channel it closes, and each one stops when the context is cancelled.

Failures are a design decision. One unreadable file must not abort a scan of a million, so per-file errors are collected and returned with the results, and they stay inspectable with \`errors.Is\`.

Writing against the \`fs.FS\` interface lets your tests use \`fstest.MapFS\`, and they can wrap it to inject errors, slow reads and concurrency counters. That is how you verify worker limits and cancellation without a real disk.

**Constraints.** Standard library only, and no \`net/http\`, since that comes in module 4. Hash files by streaming with \`io.Copy\`, never with \`os.ReadFile\`. Every goroutine you start must exit, and all tests must pass under \`-race\`.`,
      setup: {
        extensions: goExtensions,
        toolchain: goToolchain,
        structure: `dupfind/
├── go.mod
├── main.go                # flags, signal handling, output
├── scan/scan.go           # Find(ctx, fsys, opts) (Report, error)
├── scan/pipeline.go       # walk, group, hash and collect stages
├── scan/scan_test.go      # MapFS tests
└── scan/fakes_test.go     # fs.FS wrappers: failing, slow, counting`,
        commands: [
          { label: 'Scan a folder', command: 'go run . -workers 8 -min-size 1 ~/Downloads' },
          { label: 'Run the tests with the race detector', command: 'go test -race ./...' },
          { label: 'Repeat the tests to expose flakiness', command: 'go test -race -count=20 ./...' },
          { label: 'Vet the code', command: 'go vet ./...' },
        ],
      },
      requirements: [
        '`Find(ctx context.Context, fsys fs.FS, opts Options) (Report, error)` is the only entry point, and the command line wraps it using `os.DirFS`.',
        'Files are grouped by size first, so a file with a unique size is never opened, and files smaller than `MinSize` (default 1 byte) are ignored.',
        'Hashing streams each file through SHA-256 using `io.Copy` and never loads a whole file into memory.',
        'At most `Workers` files are open at once. The workers are fed from a channel, and the default is `runtime.NumCPU()`.',
        '`Report` lists duplicate groups, each with sorted paths, the file size and the wasted bytes, computed as `size * (copies - 1)`, plus the numbers of files scanned and hashed.',
        'Groups are sorted by wasted bytes descending and then first path ascending, so output is identical for any worker count.',
        'A file that cannot be read is recorded in `Report.Failed` with its path and a wrapped error, and the scan continues. `errors.Is(err, fs.ErrPermission)` works on the recorded error.',
        'When the context is cancelled, `Find` returns an error for which `errors.Is(err, context.Canceled)` is true, within 500 ms, and every goroutine exits.',
        'The command has `-workers`, `-min-size`, `-timeout` and `-json` flags, stops cleanly on Ctrl-C through `signal.NotifyContext`, and exits with status 0 when all files were read, 1 if some failed, and 2 for bad usage.',
      ],
      acceptanceTests: [
        'A `MapFS` with `a.txt`, `b/c.txt` and `f/g.txt` containing `hello`, `d.txt` containing `world`, `e.txt` containing `x` and an empty `empty.txt` gives 1 group of `a.txt`, `b/c.txt`, `f/g.txt` with size 5 and 10 wasted bytes. Files scanned is 6 and files hashed is 4.',
        '3 copies of a 100-byte file and 2 copies of a different 1,000-byte file give 2 groups: the 1,000-byte group comes first with 1,000 wasted bytes, followed by the 100-byte group with 200.',
        'An `fs.FS` wrapper that counts open files across 200 same-size files, with a small read delay, records a peak of at most 3 when `Workers` is 3, and of more than 1 when `Workers` is 8.',
        'A wrapper that returns `fs.ErrPermission` when opening `bad.txt` still reports the other duplicate groups, with one entry in `Failed` for which `errors.Is(err, fs.ErrPermission)` is true.',
        'With 1,000 same-size files and a slow reader, cancelling after 50 ms returns `context.Canceled` in under 500 ms, and `runtime.NumGoroutine()` returns to its baseline within 1 second.',
        'The JSON output for one fixture is byte-identical for `Workers` set to 1 and 16, and it decodes back into the same `Report`.',
      ],
      resources: [
        {
          title: 'Package testing/fstest',
          url: 'https://pkg.go.dev/testing/fstest',
          type: 'documentation',
          cost: 'free',
          provider: 'Go standard library',
          note: 'MapFS gives you an in-memory file system for tests.',
        },
        {
          title: 'Package io/fs',
          url: 'https://pkg.go.dev/io/fs',
          type: 'documentation',
          cost: 'free',
          provider: 'Go standard library',
          note: 'FS, WalkDir and the common errors.',
        },
      ],
      stretchGoals: [
        'Hash the first 4 KiB of each file before hashing the whole file, and measure the reduction in bytes read.',
        'Add a `-link` mode that replaces duplicates with hard links, with a dry run as the default.',
      ],
    },
  ],
  finalProject: {
    slug: 'final-outboxd',
    title: 'outboxd: a durable HTTP delivery daemon',
    repoName: 'outboxd',
    summary: 'A small service that accepts HTTP requests to deliver, records each one on disk before acknowledging it, and delivers them at least once with retries, backoff and per-host limits.',
    language: 'Go 1.24 or newer',
    estimatedHours: 18,
    overview: `A common bug in backend code looks harmless: inside a request handler, you call a third-party API. If that API is down, the event is lost, and if it is slow, your handler is slow. The usual answer is an outbox: write down the intent to send, acknowledge, and let a background process deliver it with retries.

\`outboxd\` is that background process as a small standalone daemon. Your application sends \`POST /v1/deliveries\` with a target URL and a payload. \`outboxd\` appends it to a log and syncs it to disk, and only then returns \`202\`. Workers deliver it, retrying with exponential backoff and jitter, and never sending more than a few requests at once to any one host. If the process is killed, it replays the log on restart and carries on.

The project has a clear claim that you must be able to defend: **every acknowledged delivery reaches its target at least once, unless it fails permanently, even across a crash**. Exactly-once delivery is impossible here, so your design document must explain why, and how idempotency keys let receivers deal with duplicates.

This is the same reasoning you will need for write-ahead logs, retries and failure handling in the Distributed Systems course, here in code you wrote yourself.

**Constraints.** Standard library only, except \`golang.org/x/sync\` if you want it. No database and no external queue. Time, randomness and the HTTP sender are injected through small interfaces, so tests run fast and never rely on \`time.Sleep\` to pass.`,
    setup: {
      extensions: [...goExtensions, 'humao.rest-client', 'github.vscode-github-actions'],
      toolchain: [
        ...goToolchain,
        'Use a folder in the Linux file system, such as `~/code/outboxd`, not `/mnt/c`, so that `fsync` and `kill -9` tests behave as they would on a Linux server.',
      ],
      structure: `outboxd/
├── cmd/outboxd/main.go        # flags, signals, wiring
├── internal/api/              # handlers and middleware
├── internal/delivery/         # workers, backoff, per-host limits
├── internal/store/            # the Store interface and the log
├── internal/store/log.go      # append, fsync, replay, torn-write handling
├── test/crash_test.go         # starts the real binary and kills it
├── docs/DESIGN.md             # guarantees and failure analysis
├── .github/workflows/ci.yml
├── go.mod
└── README.md`,
      commands: [
        { label: 'Run the daemon', command: 'go run ./cmd/outboxd -addr 127.0.0.1:8080 -data ./data' },
        { label: 'Run all tests with the race detector', command: 'go test -race ./...' },
        { label: 'Measure coverage', command: 'go test -cover ./...' },
        { label: 'Vet the code', command: 'go vet ./...' },
      ],
    },
    requirements: [
      '`POST /v1/deliveries` accepts `{ "url", "method", "headers", "body", "idempotency_key" }`, validates it, and returns `202` with an id only after the record has been written and synced with `File.Sync`. Invalid input gets `400`, and a request over 1 MiB gets `413`.',
      'A repeated `idempotency_key` returns the original id with status `200`, and it creates no second delivery.',
      'State changes are appended to a JSON Lines log behind a `Store` interface. Startup replays the log, ignores a torn final line, and requeues everything not yet finished.',
      'A fixed pool of worker goroutines delivers from a queue, with at most `-per-host` (default 2) concurrent requests to any one `host:port`, without blocking deliveries to other hosts.',
      'The delay after failed attempt `k` is at most `min(60s, 1s * 2^(k-1))`, with full jitter from an injected random source, and a `Retry-After` value in seconds takes precedence.',
      'Network errors, `429` and `5xx` responses are retried up to `-max-attempts` (default 6). Any other `4xx` fails permanently at once, and every attempt is recorded with its time and outcome.',
      'Every attempt has a 10 second timeout through `context`, sends the identical body and an `Idempotency-Key` header, and always closes the response body.',
      '`GET /v1/deliveries/{id}` returns the state and attempt history, `GET /v1/stats` returns counts by state, and `GET /healthz` returns `200`, all logged with `log/slog`.',
      'On `SIGINT` or `SIGTERM`, the daemon stops accepting work, waits up to 10 seconds for in-flight attempts, leaves the remainder pending in the log, and exits with status 0. No goroutine outlives shutdown.',
      '`go vet` is clean, `go test -race ./...` passes with at least 75% coverage of `internal/`, and `docs/DESIGN.md` states the guarantees and what happens at each possible crash point.',
    ],
    acceptanceTests: [
      'With a fake clock and an `httptest` target that returns 503 twice and then 200, a delivery ends as `succeeded` with exactly 3 attempts, and the target receives an identical body each time.',
      'The backoff table with jitter turned off, for attempts 1 to 7, is 1s, 2s, 4s, 8s, 16s, 32s and 60s.',
      'A target that always returns 400 gives `failed` after exactly 1 attempt. A target that always returns 503 gives `failed` after exactly 6 attempts. Posting the same `idempotency_key` twice gives the same id, and the target is called once.',
      '50 deliveries to each of two `httptest` servers run with `-per-host 2`. Each server records a peak of at most 2 concurrent requests, and blocking one server completely does not stop the other from receiving all 50.',
      'The crash test starts the real binary, sends 100 deliveries to a target that is down, runs `kill -9` while they retry, appends a partial line to the log, restarts with the target up, and sees all 100 acknowledged ids reach the target at least once.',
      'With a target that takes 200 ms, sending `SIGTERM` during a delivery lets it finish and exit with status 0, and the delivery is not attempted again after a restart.',
    ],
    coverage: [
      { module: 'language-basics', demonstrates: 'The in-memory delivery table, attempt history and per-host counters use maps, slices and structs with deliberate pointer and value semantics.' },
      { module: 'interfaces-and-errors', demonstrates: 'Store, Clock and Sender are small interfaces with test fakes, and retryable and permanent failures are told apart with errors.Is and errors.As.' },
      { module: 'concurrency', demonstrates: 'The worker pool, per-host semaphores and shutdown use goroutines, channels and context, with no leaks under the race detector.' },
      { module: 'http-services', demonstrates: 'The API uses ServeMux, middleware and server timeouts, the sender uses retries and backoff, and httptest drives the failure paths.' },
    ],
    portfolio: [
      'The README opens with a short recording of deliveries surviving `kill -9`, then gives a copy-and-paste quick start.',
      'GitHub Actions runs `go vet` and `go test -race ./...` on every push, with a status badge in the README.',
      'The repository has a LICENSE and a tagged `v1.0.0` release with Linux and Windows binaries.',
      '`docs/DESIGN.md` explains the at-least-once guarantee, why exactly-once is not on offer, and the log format, with a diagram of the delivery state machine.',
      'The README includes measured throughput with and without per-delivery `fsync`, and states the machine it was measured on.',
    ],
    stretchGoals: [
      'Compact the log in the background without blocking new deliveries.',
      'Group `fsync` calls across concurrent requests, and measure the throughput gain.',
    ],
  },
});
