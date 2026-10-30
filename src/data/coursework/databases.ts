import { defineCoursework } from '../define';

const pythonExtensions = ['ms-python.python', 'ms-python.vscode-pylance', 'ms-python.debugpy'];
const pythonToolchain = [
  'Install Python 3.12 or newer from python.org and tick "Add python.exe to PATH". In the project folder run `python -m venv .venv`, then select that interpreter in VS Code so new terminals activate it.',
];
const postgresToolchain = [
  'Install PostgreSQL 17 with the EDB Windows installer, and add its `bin` folder, usually `C:\\Program Files\\PostgreSQL\\17\\bin`, to PATH so that `psql` works in the terminal. On macOS or Linux use your package manager.',
];

export default defineCoursework({
  subjectId: 'databases',
  machineProblems: [
    {
      slug: 'mp1-shelfmark',
      title: 'Shelfmark: design, load and tune a library database',
      afterModule: 'advanced-sql-and-design',
      coversModules: ['relational-model-and-sql', 'advanced-sql-and-design'],
      supersedesProject: true,
      summary: 'Model a regional library network in BCNF, load two million loans, meet latency targets with a provably minimal set of indexes, and run a live migration without losing a row.',
      language: 'PostgreSQL 17 and Python 3.12',
      estimatedHours: 18,
      overview: `A schema is a set of decisions you live with for years. In this MP you make those decisions for **Shelfmark**, the shared catalogue of a regional library network, and then test them against a realistic volume of data.

The domain has branches, members, works, authors, subjects (a tree), physical copies, loans, holds and fines. Works have many authors and many subjects, so you will need junction tables, and a *work* is not the same thing as a *copy*. You will generate the data yourself with a skewed popularity distribution, because uniform data hides every interesting query plan.

Then you tune. Each of these ten queries has a latency target, measured as the median of 7 warm runs:

| Query | What it answers | Must use | Target |
| --- | --- | --- | --- |
| Q1 | A member's open loans with title and due date | Joins | 20 ms |
| Q2 | Copies of a work available now, per branch | Anti-join | 20 ms |
| Q3 | A member's position in the hold queue for a work | \`ROW_NUMBER\` | 20 ms |
| Q4 | All works under a subject, including its descendants | Recursive CTE | 50 ms |
| Q5 | Overdue loans at one branch | Partial index | 50 ms |
| Q6 | A member's unpaid fine total | Aggregate | 20 ms |
| Q7 | Top 10 works per branch over the last 90 days | \`RANK\` | 500 ms |
| Q8 | Monthly loans at a branch with a 3-month moving average | Window frame | 500 ms |
| Q9 | Days between consecutive loans of each copy of a work | \`LAG\` | 50 ms |
| Q10 | Members with unpaid fines and no loan in 12 months | \`NOT EXISTS\` | 500 ms |

**Constraints.** Use raw SQL with \`psycopg\`, and no ORM. Python only generates data, loads it and measures it. The legacy import stored \`fines.amount\` in dollars as \`double precision\`. Keep that column as a deliberate mistake, because the final task is to migrate it to integer cents on a live table. That migration needs a small PL/pgSQL trigger, which is the one tool you will take from the PostgreSQL manual rather than the lessons.`,
      setup: {
        extensions: [...pythonExtensions, 'mtxr.sqltools', 'mtxr.sqltools-driver-pg'],
        toolchain: [
          ...pythonToolchain,
          ...postgresToolchain,
          'Install the Python packages with `pip install "psycopg[binary]" pytest`.',
        ],
        structure: `shelfmark/
├── schema/schema.sql      # DDL with constraints; indexes live in tune/
├── docs/design.md         # ER diagram, FDs, BCNF argument, tuning report
├── normalize/fdcheck.py   # attribute closure, candidate keys, normal forms
├── gen/generate.py        # seeded, skewed data generator
├── gen/load.py            # COPY-based loader
├── queries/q01.sql ...    # one file per query, with a header comment
├── tune/indexes.sql       # the index set, each with the query it serves
├── tune/measure.py        # median latency for every query against its target
├── tune/check_minimal.py  # proves no index can be dropped
├── migrate/               # numbered expand, backfill, validate, contract steps
└── tests/                 # hand-built fixture with known answers`,
        commands: [
          { label: 'Create the database', command: 'psql -h localhost -U postgres -c "CREATE DATABASE shelfmark"' },
          { label: 'Apply the schema', command: 'psql -h localhost -U postgres -d shelfmark -f schema/schema.sql' },
          { label: 'Generate the data', command: 'python gen/generate.py --seed 42 --out data/' },
          { label: 'Load the data', command: 'python gen/load.py --data data/' },
          { label: 'Run the tests', command: 'pytest tests/' },
          { label: 'Measure every query', command: 'python tune/measure.py --runs 7' },
          { label: 'Prove the indexes are minimal', command: 'python tune/check_minimal.py' },
          { label: 'Run the migration', command: 'python migrate/run.py --step all' },
        ],
      },
      requirements: [
        '`schema/schema.sql` defines at least 11 tables, including `branches`, `members`, `works`, `authors`, `work_authors`, `subjects`, `work_subjects`, `copies`, `loans`, `holds` and `fines`, with primary keys, foreign keys, `NOT NULL` and `CHECK` constraints throughout.',
        'A partial unique index guarantees at most one open loan per copy, deleting a member with loans is refused by `ON DELETE RESTRICT`, and deleting a work removes its junction rows by cascade.',
        '`docs/design.md` has an ER diagram, the functional dependencies of every table, and an argument that each table is in BCNF, or a named reason for any exception.',
        '`normalize/fdcheck.py` takes a relation and its functional dependencies, computes attribute closures and all candidate keys, and reports each 3NF and BCNF violation.',
        '`gen/generate.py` is deterministic for a given seed and produces at least 40 branches, 200,000 members, 100,000 works, 400,000 copies, 2,000,000 loans over 5 years, 200,000 holds and 150,000 fines, with work popularity following a Zipf distribution.',
        '`gen/load.py` uses `COPY`, adds foreign keys after the load, and finishes in under 5 minutes.',
        'Each query in the table above has its own SQL file with a header comment stating the question, and uses the feature listed. `tune/measure.py` draws query parameters at random from a fixed seed, and all ten queries meet their targets.',
        'The tuning report lists every index with the query it serves and `EXPLAIN (ANALYZE, BUFFERS)` output before and after, and it gives the measured cost of inserting 100,000 loans with and without the indexes.',
        '`tune/check_minimal.py` drops each tuning index inside a transaction, re-measures, and rolls back. Every index must be needed by at least one query to meet its target. Primary key and constraint indexes are exempt.',
        'The migration from `fines.amount` to `fines.amount_cents integer NOT NULL` has separate expand, dual-write trigger, batched backfill of at most 10,000 rows per transaction, `NOT VALID` then `VALIDATE` constraint, and contract steps, and each step can be re-run safely.',
      ],
      acceptanceTests: [
        '`fdcheck` on R(A,B,C,D,E) with A→B, B→C, CD→E reports (A,D)+ = ABCDE, A+ = ABC, the only candidate key AD, and all three dependencies as 3NF and BCNF violations. On R(S,J,T) with SJ→T, T→J it reports the keys SJ and ST, no 3NF violation, and T→J as the only BCNF violation.',
        'In a fixture where one branch has five works with 5, 5, 3, 3 and 1 loans, the top 3 returns 3 rows by `ROW_NUMBER`, 4 rows by `RANK` and 5 rows by `DENSE_RANK`. Q7 uses `RANK`, so it returns 4.',
        'For monthly loans of 10, 20, 60 and 30, Q8 returns moving averages of 10.00, 15.00, 30.00 and 36.67. The default window frame gives 30.00 for the fourth month, so this catches a missing `ROWS` clause. For one copy loaned on 2025-01-01, 2025-01-11 and 2025-02-01, Q9 returns NULL, 10 and 21.',
        'With subjects Science > Physics > Astronomy > Cosmology and Science > Biology, Q4 covers 5 subjects from Science and 3 from Physics. After a test sets the parent of Physics to Cosmology, creating a cycle, the query still terminates and covers 3 subjects from Physics.',
        'On the full dataset, Q1 to Q6 and Q9 show no `Seq Scan` on `loans`, all ten queries meet their targets, and `check_minimal.py` exits 0.',
        'While the backfill runs, a second process inserts 1,000 fines and updates 1,000 existing ones. Afterwards no `amount_cents` is NULL, every row equals the rounded value of its dollar amount, and 19.99 becomes 1999, 4.35 becomes 435 and 1.15 becomes 115. Truncating instead gives 1998, 434 and 114.',
      ],
      resources: [
        {
          title: 'PostgreSQL manual: Using EXPLAIN',
          url: 'https://www.postgresql.org/docs/current/using-explain.html',
          type: 'documentation',
          cost: 'free',
          provider: 'PostgreSQL',
          note: 'Read this before you tune, especially the sections on `ANALYZE` and the caveats.',
        },
        {
          title: 'PostgreSQL manual: Trigger Functions',
          url: 'https://www.postgresql.org/docs/current/plpgsql-trigger.html',
          type: 'documentation',
          cost: 'free',
          provider: 'PostgreSQL',
          note: 'The first example has everything the dual-write trigger needs.',
        },
      ],
      stretchGoals: [
        'Add a `pg_trgm` index so that title search tolerates typos, and measure it against `ILIKE`.',
        'Partition `loans` by year and report which queries gain and which lose.',
      ],
    },
    {
      slug: 'mp2-isolab',
      title: 'isolab: two concurrency controls and one anomaly suite',
      afterModule: 'transactions-and-concurrency',
      coversModules: ['storage-and-indexing', 'query-processing-and-optimization', 'transactions-and-concurrency'],
      supersedesProject: true,
      summary: 'Add strict two-phase locking and MVCC snapshot isolation to your engine, then show exactly which anomalies each one allows, using deterministic schedules and a contention benchmark.',
      language: 'Python 3.12',
      estimatedHours: 20,
      overview: `Isolation levels are often taught as a table of promises. In this MP you implement the mechanisms behind that table and watch the promises being kept and broken.

Start from the engine in your module 3 and module 4 projects: pages, a buffer pool, heap files, a B+ tree, and a SQL executor. Extend the SQL with \`UPDATE\` and \`DELETE\`, then add a transaction manager with two interchangeable modes selected by \`--cc=2pl\` or \`--cc=mvcc\`. The first uses strict two-phase locking with multi-granularity locks and a deadlock detector. The second keeps versions in heap pages and gives each transaction a snapshot.

The heart of the MP is a **schedule runner**. A schedule is plain data listing which session does what, in what order. The runner steps through it deterministically, with no sleeps, using a hook in the lock manager to learn when a session is blocked. You then run the same schedules under both modes and assert exactly which anomalies occur. The surprising result is meant to be seen: snapshot isolation allows write skew, which 2PL prevents.

**Constraints.** There is no durability yet, because logging arrives in module 6. Aborts undo changes from an in-memory list, and a crash may lose everything. Python threads share the GIL, so CPU-bound speedups are not meaningful here. The stress harness holds each transaction open with a 1 ms \`time.sleep\` to model a client round trip, which keeps contention real, and you must say so when you report throughput.`,
      setup: {
        extensions: pythonExtensions,
        toolchain: [
          ...pythonToolchain,
          'Install the packages with `pip install pytest matplotlib`. Everything runs natively on Windows, with no WSL or Docker needed.',
        ],
        structure: `isolab/
├── engine/                # your pages, buffer pool, heap, B+ tree and SQL executor
├── txn/manager.py         # begin, commit, abort, undo list
├── txn/locks.py           # lock table, wait queues, IS IX S SIX X
├── txn/deadlock.py        # waits-for graph and victim selection
├── txn/mvcc.py            # snapshots, version chains, visibility, vacuum
├── tests/schedules/       # anomaly schedules as data
├── tests/runner.py        # deterministic stepper
├── tests/test_anomalies.py
├── harness/transfer.py    # multi-threaded transfer workload
├── report/plots.py
└── REPORT.md`,
        commands: [
          { label: 'Run the unit tests and anomaly schedules', command: 'pytest tests/' },
          { label: 'Run one schedule and print its trace', command: 'python -m tests.runner tests/schedules/write_skew.json --cc=mvcc' },
          { label: 'Run the stress harness', command: 'python -m harness.transfer --cc=2pl --threads 8 --hot-set 10 --transfers 10000' },
          { label: 'Sweep contention and draw the plots', command: 'python report/plots.py --out report/' },
        ],
      },
      requirements: [
        '`Database.begin(isolation=...)` returns a transaction with `execute(sql)`, `commit()` and `abort()`, the same in both modes, and `abort` restores every row and index entry the transaction changed.',
        'The lock manager supports IS, IX, S, SIX and X with the standard compatibility matrix and FIFO wait queues, and an upgrade request goes ahead of other waiters. Under strict 2PL, locks are released only at commit or abort.',
        'A primary-key lookup takes IS on the table and S on the row, a write takes IX on the table and X on the row, and any read that scans more than one key takes S on the table. This is how phantoms are prevented.',
        'A waits-for graph, checked at least every 50 ms in both modes, detects deadlocks and aborts the youngest transaction in the cycle with `DeadlockError`.',
        'In MVCC mode each version in a heap page records `xmin` and `xmax`, versions are chained newest to oldest, and the index points at the chain head. One function decides visibility from a snapshot of the next transaction ID and the active set, and it has its own tests.',
        'Snapshot isolation is first-committer-wins: a writer waits for an in-progress writer of the same row, and fails with `SerializationError` if that row was committed after its snapshot. MVCC mode also offers `READ COMMITTED`, which takes a new snapshot for each statement.',
        '`vacuum()` removes versions that no active snapshot can see and returns their space to the page.',
        'The schedule runner executes a schedule stored as data with no sleeps, detects a blocked session through a hook in the lock manager, and records every result so that a test can assert the exact trace.',
        '`harness/transfer.py` runs concurrent transfers with a 1 ms hold inside each transaction, retries on `DeadlockError` and `SerializationError`, rolls back any transfer that would overdraw an account, and checks the total after every run.',
        '`REPORT.md` plots throughput and abort rate against hot-set size for both modes, states the GIL and think-time caveat, and explains the shape of each curve.',
      ],
      acceptanceTests: [
        'Dirty read, with x = 100: T1 sets x = 200, T2 reads x, T1 aborts. Under 2PL, T2 blocks until the abort and then reads 100. Under MVCC, T2 reads 100 without blocking.',
        'Lost update, with x = 100: T1 and T2 both read x, then both write their read value plus 10. Under 2PL the upgrades deadlock and one transaction aborts. Under MVCC the second writer gets `SerializationError`. After the loser retries, x is 120 in both modes, and never 110.',
        'Write skew, with Alice and Bob both on call: each transaction reads the sum of `on_call`, sees 2, and takes only itself off call. Under MVCC snapshot isolation both commit and the sum is 0. Under 2PL one is aborted as a deadlock victim, and after its retry the sum is 1.',
        'Phantom, with 3 rows matching a predicate: T1 counts them, T2 inserts a fourth and tries to commit, T1 counts again. Under 2PL the insert blocks until T1 finishes, and both counts are 3. Under snapshot isolation T2 commits immediately and both counts are 3, while a new transaction sees 4. Under `READ COMMITTED` the second count is 4, and a re-read of a row updated from 100 to 200 by a committed transaction changes from 100 to 200.',
        'T1 writes a and T2 writes b, then T1 writes b and T2 writes a. In both modes the detector aborts T2, the youngest, within 200 ms, and T1 commits. After 10,000 committed updates to one row, its chain holds 10,001 versions. `vacuum()` leaves 1 with no snapshot open. With a snapshot taken after update 5,000 still open, it leaves 2, and that snapshot still reads the value from update 5,000.',
        'With 1,000 accounts holding 1,000 each, 8 threads complete 10,000 committed transfers of 1 to 10 at hot-set sizes of 1,000, 100, 10 and 2 in both modes. After every run the total is exactly 1,000,000, no balance is negative, and the committed counts of all threads sum to 10,000.',
      ],
      resources: [
        {
          title: 'Hermitage: Testing transaction isolation levels',
          url: 'https://github.com/ept/hermitage',
          type: 'tool',
          cost: 'free',
          provider: 'Martin Kleppmann',
          note: 'Written-out anomaly schedules for real databases. A model for your own schedule files.',
        },
        {
          title: 'PostgreSQL manual: Transaction Isolation',
          url: 'https://www.postgresql.org/docs/current/transaction-iso.html',
          type: 'documentation',
          cost: 'free',
          provider: 'PostgreSQL',
          note: 'Compare what PostgreSQL promises at each level with what your schedules show.',
        },
      ],
      stretchGoals: [
        'Add serializable snapshot isolation by tracking rw-dependencies, so that write skew is rejected, and measure the extra aborts.',
        'Replace table-level S locks on scans with key-range locks on the B+ tree, and show that the phantom test still passes with less blocking.',
      ],
    },
  ],
  finalProject: {
    slug: 'final-cairn',
    title: 'Cairn: a crash-safe SQL database that psql can talk to',
    repoName: 'cairndb',
    summary: 'Build a SQL server from pages to wire protocol. Connect with the real psql client, kill the process mid-transaction, restart it, and find every committed row intact.',
    language: 'Python 3.12',
    estimatedHours: 60,
    overview: `Most student databases are libraries that only their author's test suite ever calls. Cairn is a server. You start it, connect with the ordinary PostgreSQL client, create tables, run joins, kill the process in the middle of a bank-transfer workload, restart it, and watch it recover to the exact state its clients were promised.

The engine follows one design from top to bottom. A connection thread speaks the PostgreSQL wire protocol. SQL goes through a parser, a binder and a cost-based optimiser to an iterator-model executor. Transactions use MVCC snapshot isolation, built on your MP 2 work. Storage is a single file of 8 KiB slotted pages behind a buffer pool, with B+ tree indexes. Beneath all of it is a write-ahead log and ARIES-style recovery, so the buffer pool can steal and need not force.

Two features take the engine beyond the classic course project. A read-only **follower** connects to the leader and replays its WAL as a stream, which shows that replication is recovery that never stops. A **JSON** column type with \`->>\` and expression indexes shows how much of a document store a relational engine can absorb.

Because it is pure Python, Cairn is not fast, and it does not pretend to be. Its appeal is that a reader can follow one \`COMMIT\` through about 8,000 lines of clear code, on any operating system, and then break it on purpose. Your report should be honest about this: benchmark it against SQLite and PostgreSQL, explain the gap, and say plainly when not to use it. The work reuses your module 3 and module 4 projects and MP 2, and it adds logging, recovery, networking and replication.`,
    setup: {
      extensions: [...pythonExtensions, 'charliermarsh.ruff', 'github.vscode-github-actions'],
      toolchain: [
        ...pythonToolchain,
        ...postgresToolchain,
        'PostgreSQL itself is only a benchmark baseline, and `psql` is the client. Cairn runs natively on Windows, macOS and Linux with the Python standard library alone.',
        'Install the development packages with `pip install -e ".[dev]"`, which brings in pytest, hypothesis and matplotlib.',
      ],
      structure: `cairndb/
├── src/cairn/vfs.py       # real file layer and a fault-injecting one
├── src/cairn/storage/     # pages, buffer pool, heap, B+ tree
├── src/cairn/wal/         # log records, group commit, checkpoints, recovery
├── src/cairn/txn/         # MVCC, snapshots, vacuum
├── src/cairn/sql/         # parser, binder, optimiser, executor
├── src/cairn/server/      # PostgreSQL wire protocol, sessions
├── src/cairn/replica/     # WAL streaming and follower replay
├── tests/crash/           # process-kill and simulated power-loss tests
├── tests/diff/            # random queries compared against SQLite
├── bench/                 # workloads, baselines, saved results
├── docs/ARCHITECTURE.md   # the life of one COMMIT, page and log formats
├── docs/WHEN-NOT-TO-USE.md
├── pyproject.toml
└── README.md`,
      commands: [
        { label: 'Install in editable mode', command: 'pip install -e ".[dev]"' },
        { label: 'Start the server', command: 'cairn serve --data data/demo --port 5433' },
        { label: 'Connect with the real client', command: 'psql -h localhost -p 5433 -U cairn -d demo' },
        { label: 'Run the fast tests', command: 'pytest -m "not slow"' },
        { label: 'Kill the server repeatedly and verify recovery', command: 'python tests/crash/kill_loop.py --rounds 50 --seed 1' },
        { label: 'Compare results against SQLite', command: 'python tests/diff/sqlite_diff.py --seed 1 --count 10000' },
        { label: 'Start a read-only follower', command: 'cairn serve --data data/follower --port 5434 --follow localhost:5433' },
        { label: 'Run the benchmarks', command: 'python bench/run.py --out results/' },
      ],
    },
    requirements: [
      'Storage is one data file of 8 KiB slotted pages with a CRC32 in each page header, behind a buffer pool with LRU-K or clock replacement, with B+ trees for primary keys and secondary indexes, and with the catalogue stored in the database itself.',
      'All disk access goes through one `Vfs` interface with a real implementation and a fault-injecting one that loses every write not yet `fsync`ed at a simulated crash. Whole-page writes are treated as atomic, and that assumption is documented.',
      'SQL covers `CREATE TABLE` with `INT`, `BIGINT`, `TEXT`, `BOOLEAN` and `JSON` columns and primary key, `NOT NULL`, `UNIQUE` and foreign key constraints; `CREATE INDEX`; `INSERT`, `UPDATE` and `DELETE`; and `SELECT` with inner and left joins, `GROUP BY`, `HAVING`, `ORDER BY`, `LIMIT`, `IN` and `EXISTS` subqueries, `WITH`, and `ROW_NUMBER` and `RANK`, all with three-valued NULL logic.',
      'The optimiser gathers histograms with `ANALYZE`, chooses between sequential and index scans, picks a join order and chooses among nested-loop, sort-merge and hash joins by estimated cost. Sorts and hash joins spill to disk when they exceed their memory budget. `EXPLAIN ANALYZE` prints estimated and actual rows and page reads per operator.',
      'Sessions run concurrently under MVCC snapshot isolation with first-committer-wins, and `READ COMMITTED` is available per transaction. A background vacuum reclaims dead versions.',
      'A write-ahead log with LSNs, `pageLSN`, steal and no-force supports fuzzy checkpoints and three-phase recovery: analysis, redo that repeats history, and undo with compensation log records. Commit waits for `fsync`, and group commit makes 8 concurrent clients perform fewer `fsync` calls than commits.',
      'The server speaks PostgreSQL protocol version 3 with the simple query flow: answers `N` to `SSLRequest` and `GSSENCRequest`, sends `AuthenticationOk` and `ParameterStatus` for `server_version` and `client_encoding`, and sends `RowDescription`, `DataRow`, `CommandComplete`, `ReadyForQuery` and `ErrorResponse` with real SQLSTATE codes.',
      '`cairn serve --follow` streams the WAL from a leader and replays it continuously, serves read-only queries, reports its lag in bytes and seconds, and resumes from its last applied LSN after a restart.',
      'The `JSON` type stores validated documents, `->>` extracts a field as text, and `CREATE INDEX ON t ((doc ->> \'key\'))` builds an expression index that the optimiser can choose.',
      '`docs/ARCHITECTURE.md` follows one `COMMIT` through every layer, and `bench/` compares scans, point lookups, joins and commits with SQLite and PostgreSQL, reporting the buffer pool hit rate and a limitations section. `docs/WHEN-NOT-TO-USE.md` applies the decision criteria from module 7 to Cairn itself.',
    ],
    acceptanceTests: [
      'Four clients run transfers over real connections among 1,000 accounts holding 1,000 each, inserting a `ledger` row in each transaction, while the harness kills the server process at a random moment. Over 50 seeded rounds, after each restart the total is exactly 1,000,000, every transfer a client saw acknowledged is in `ledger`, and each balance equals 1,000 plus its net ledger entries.',
      'Using the fault-injecting `Vfs`, a random workload crashes at 500 random points, losing all unsynced writes. Recovery always produces exactly the committed state held by an in-memory model. In 100 of those runs a second crash is injected during undo, and the second recovery reaches the same state.',
      'For 10,000 random queries with seed 1, covering joins, grouping, NULLs and subqueries over the same generated tables, Cairn and SQLite return the same rows, compared in order when the query has `ORDER BY` on a unique key and as a multiset otherwise.',
      '`psql -h localhost -p 5433 -U cairn -d demo -c "SELECT 1 + 1 AS two"` prints one row with the column `two` and the value 2. A missing table gives SQLSTATE 42P01, a duplicate key 23505, and a syntax error 42601. When two `psql` sessions update one row under snapshot isolation, the second to commit gets 40001.',
      'After `ANALYZE` on a table of 200,000 rows, `EXPLAIN ANALYZE` of a primary-key lookup shows an index scan and at most 5 page reads, and a predicate matching 90 percent of rows shows a sequential scan. A join with a 1,000-row table uses a hash join with the smaller table as the build side, and a query on `doc ->> \'user\'` uses the expression index.',
      'With a follower attached, 10,000 inserts on the leader appear on the follower within 5 seconds of the last commit, with the same row count and checksum. A write to the follower fails with SQLSTATE 25006. A follower stopped for 1,000 further inserts catches up after a restart.',
    ],
    coverage: [
      { module: 'relational-model-and-sql', demonstrates: 'The engine enforces keys and foreign keys and answers joins and aggregates with correct NULL logic, verified against SQLite.' },
      { module: 'advanced-sql-and-design', demonstrates: 'Window functions, `WITH`, secondary indexes and expression indexes are implemented inside the engine rather than only used.' },
      { module: 'storage-and-indexing', demonstrates: 'Slotted pages, the buffer pool and B+ trees hold all the data, with page reads visible in `EXPLAIN ANALYZE`.' },
      { module: 'query-processing-and-optimization', demonstrates: 'The cost-based optimiser and iterator executor choose among join algorithms, and sorts and joins spill when memory runs out.' },
      { module: 'transactions-and-concurrency', demonstrates: 'Concurrent `psql` sessions get MVCC snapshot isolation, and write conflicts surface as SQLSTATE 40001.' },
      { module: 'recovery-and-distributed-data', demonstrates: 'ARIES-style recovery survives repeated kills and simulated power loss, and WAL streaming drives a read-only follower.' },
      { module: 'beyond-relational', demonstrates: 'The JSON type with expression indexes shows the document model inside a relational engine, and `docs/WHEN-NOT-TO-USE.md` applies the module decision criteria.' },
    ],
    portfolio: [
      'The README opens with a terminal recording: connect with `psql`, start transfers, kill the server, restart it, and show the total unchanged.',
      'GitHub Actions runs the fast tests, a short crash loop and the SQLite differential on Windows and Linux on every push, with a status badge in the README.',
      'The repository has a LICENSE, a tagged `v1.0.0` release, and installs with `pipx install` from a Git URL, giving a working `cairn` command.',
      'The README shows the benchmark table beside SQLite and PostgreSQL, and links to `docs/ARCHITECTURE.md` and `docs/WHEN-NOT-TO-USE.md`.',
      'The architecture document has diagrams of the page format, the log format and the three recovery phases, in your own words.',
      'A guided tour in the docs invites readers to break the database on purpose, by disabling the WAL rule or an `fsync`, and to watch which test catches it.',
    ],
    stretchGoals: [
      'Support the extended query protocol, so that `psycopg` queries with parameters work.',
      'Detect torn page writes with the page CRC, and repair them from full-page images in the WAL.',
      'Add manual failover, with fencing so that a demoted leader cannot accept writes.',
      'Add per-page min-max zone maps and measure how many pages they skip on analytical scans.',
    ],
    resources: [
      {
        title: 'PostgreSQL manual: Frontend/Backend Protocol',
        url: 'https://www.postgresql.org/docs/current/protocol.html',
        type: 'documentation',
        cost: 'free',
        provider: 'PostgreSQL',
        note: 'Read Message Flow for the simple query cycle, and Message Formats for the exact bytes.',
      },
    ],
  },
});
