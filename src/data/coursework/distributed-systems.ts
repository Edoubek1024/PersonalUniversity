import { defineCoursework } from '../define';

const goExtensions = ['golang.go'];
const goToolchain = [
  'Install Go 1.22 or newer from go.dev for Windows, and let the VS Code Go extension install `gopls` and `dlv` when it asks. Everything here runs natively on Windows 10.',
  'New to Go? The Go Programming course on this site is optional background, and goroutines, channels and `testing` are all you need from it.',
];
const raceNote = 'On Windows, `go test -race` needs cgo and a C compiler. Install gcc through MSYS2, add its `ucrt64\\bin` folder to PATH and set `CGO_ENABLED=1`, or run the same command in WSL 2 with the `ms-vscode-remote.remote-wsl` extension.';

export default defineCoursework({
  subjectId: 'distributed-systems',
  machineProblems: [
    {
      slug: 'mp1-ledgernet',
      title: 'ledgernet: RPC, clocks and snapshots on a network that misbehaves',
      afterModule: 'rpc-and-time',
      coversModules: ['models-and-fundamentals', 'rpc-and-time'],
      summary: 'Build a seeded network simulator, then use it to run a money-transfer service with at-most-once RPC, vector clocks and Chandy-Lamport snapshots.',
      language: 'Go 1.22',
      estimatedHours: 15,
      overview: `Distributed bugs are hard because they depend on timing you cannot control. So the first thing you build in this course is the thing that gives you control: a **deterministic network simulator**.

\`simnet\` runs every node as a state machine inside one goroutine, driven by an event queue and a virtual clock. All randomness comes from one seed. It can delay, drop, duplicate and reorder messages, and it can partition nodes, all on one machine. Run a seed twice and you get the same execution, so any failure can be replayed in a debugger. You will reuse it for the rest of the course.

On top of it you build a small bank. Each node holds one account, and transfers debit one node and credit another through messages. Three layers make this correct: a **reliable FIFO channel** using sequence numbers and retransmission, an **at-most-once RPC** layer with request de-duplication, and **Chandy-Lamport snapshots** that record a consistent global balance while money is in flight.

**Constraints.** Use the standard library only. No node may read real time, call \`time.Sleep\`, use a global random source, or start a goroutine. They get time and randomness only from the simulator. Iterating over a Go map has random order, so sort keys wherever order can affect behaviour. Otherwise your seeds will not replay.

Write \`docs/MODEL.md\` first. State your timing, process and link assumptions, and say which safety and liveness properties you claim under them.`,
      setup: {
        extensions: goExtensions,
        toolchain: goToolchain,
        structure: `ledgernet/
├── go.mod
├── simnet/simnet.go          # event queue, virtual clock, faults, partitions
├── simnet/trace.go           # event log and its hash
├── channel/fifo.go           # reliable FIFO delivery over a lossy link
├── rpc/rpc.go                # request IDs, retries, reply cache
├── clock/lamport.go
├── clock/vector.go           # Compare: Before, After, Equal, Concurrent
├── bank/node.go              # accounts and transfers
├── bank/snapshot.go          # Chandy-Lamport
├── cmd/ledgernet/main.go     # runs a seeded scenario, prints a summary
└── docs/MODEL.md`,
        commands: [
          { label: 'Run all tests', command: 'go test ./...' },
          { label: 'Run a seeded scenario', command: 'go run ./cmd/ledgernet -seed 42 -nodes 5 -transfers 1000 -loss 0.2' },
          { label: 'Rerun one test with a chosen seed', command: 'go test ./bank -run TestSnapshotUnderLoss -v -seed 42' },
          { label: 'Check for common mistakes', command: 'go vet ./...' },
        ],
      },
      requirements: [
        '`simnet` provides a virtual clock, per-link delay ranges, drop and duplication probabilities, `Partition(groups...)` and `Heal()`, and it records a trace whose SHA-256 hash is printed at the end of a run. Test files define a `-seed` flag with `flag.Int64` at package level, with a fixed default, so any failing seed can be rerun with `go test`.',
        'Each node has its own wall clock with a configurable offset and drift, plus a monotonic clock. Retransmission and RPC timeouts use only the monotonic clock.',
        'The channel layer gives exactly-once, in-order delivery between each pair of nodes on top of the lossy network, using per-link sequence numbers, acknowledgements and retransmission.',
        'The RPC layer tags each call with a client ID and sequence number, retries after a 100 ms timeout, and caches replies so a repeated request returns the original reply. A `-no-dedup` flag disables the cache.',
        'Messages are encoded as JSON with a version field, and a node ignores unknown fields, so a newer sender can talk to an older receiver.',
        'Each node maintains a Lamport clock and a vector clock, updates both on local, send and receive events, and writes them to the trace.',
        'A transfer debits the sender immediately and credits the receiver on delivery, and a transfer larger than the sender balance is rejected.',
        'Any node can start a Chandy-Lamport snapshot. The result gives every node balance and the contents of every channel, and one snapshot can run alongside ordinary transfers without pausing them.',
        '`docs/MODEL.md` states the system model, and explains why a crashed node that never recovers would stop a snapshot from finishing, while safety still holds.',
      ],
      acceptanceTests: [
        'On two nodes with Lamport and vector clocks at zero, A does a local event then sends to B, and B does a local event then receives. A ends at Lamport 2 and vector `[2,0]`, and B ends at Lamport 3 and vector `[2,2]`. `Compare([2,1,0],[2,2,0])` is Before, and `Compare([2,1,0],[1,3,0])` is Concurrent.',
        'One client makes 10,000 sequential increment calls to one server, with 20% loss in each direction, 1 to 10 ms delay and a 100 ms timeout. With de-duplication the counter ends at exactly 10,000. With `-no-dedup` it ends between 12,300 and 12,700, because the expected duplicate rate is 0.25 per call.',
        'A and B each hold 100. A sends 10 to B and the message is held in flight. B then starts a snapshot, and A records after receiving the marker. The snapshot shows A at 90, B at 100 and channel A to B holding 10, for a total of 200.',
        'Five nodes start with 1,000 each. Under 20% loss, 1,000 random transfers run while 100 snapshots are taken one after another. In every snapshot, balances plus channel contents total exactly 5,000.',
        'With partition `{A,B} | {C,D,E}` held for 30 virtual seconds during a snapshot, the snapshot does not complete until after `Heal()`, and it then totals exactly 5,000.',
        'B\'s wall clock runs 100 ms behind A\'s. A writes `x=1` at true time 1,000 ms, and B receives it and writes `x=2` at true time 1,050 ms. Last-write-wins on wall clocks keeps `x=1` (stamps 1,000 and 950), and ordering by Lamport timestamp keeps `x=2`. Running any scenario twice with one seed gives the same trace hash.',
      ],
      resources: [
        {
          title: 'Distributed Snapshots: Determining Global States of Distributed Systems',
          url: 'https://lamport.azurewebsites.net/pubs/chandy.pdf',
          type: 'article',
          cost: 'free',
          provider: 'Chandy and Lamport',
          note: 'The original paper. Its marker rules are short enough to turn directly into code.',
        },
      ],
      stretchGoals: [
        'Add a `-replay` mode that prints the vector clock timeline for one seed as a space-time diagram.',
        'Add a detector that uses snapshots to report when the system has become quiescent.',
      ],
    },
    {
      slug: 'mp2-ringkv',
      title: 'ringkv: a Dynamo-style key-value store under partition',
      afterModule: 'storage-and-data-processing',
      coversModules: ['rpc-and-time', 'replication-and-consensus', 'consistency-and-transactions', 'storage-and-data-processing'],
      summary: 'Build a leaderless replicated store with a consistent-hash ring, tunable quorums, version vectors and anti-entropy, and see the CAP trade-off in your own tests.',
      language: 'Go 1.22',
      estimatedHours: 20,
      overview: `Consensus keeps replicas identical at the cost of refusing to serve during some failures. Dynamo chose the opposite: stay writable, let replicas diverge, and repair later. In this MP you build that design and measure what it gives up.

\`ringkv\` runs on your \`simnet\` from MP 1, so every scenario is seeded and repeatable. Define a \`-seeds\` test flag the same way as \`-seed\` in MP 1, so \`TestChaos\` can sweep seeds 1 to N. Keys are placed on a **consistent-hash ring** with virtual nodes. Each key has a preference list of N replicas, and any node can coordinate a request, waiting for R or W replies chosen per request.

Divergence is made visible with **version vectors**. If two sides of a partition both accept a write to one key, a later read returns both versions as siblings, and the client merges them. Three repair paths bring replicas back together: read repair, **hinted handoff** and **Merkle-tree anti-entropy**.

You will also add a G-counter, a small CRDT that merges without any conflict at all, as a contrast to sibling resolution.

The most important output is an explanation. Your tests will show one read returning stale data, or failing, depending only on R. \`docs/CONSISTENCY.md\` explains each result in the vocabulary of the course: linearizability, session guarantees, CAP and PACELC.

**Constraints.** Standard library only, and all node code stays deterministic as in MP 1. Storage is in memory, but a node that crashes and restarts must behave as if its data survived. You do not need consensus, leader election or transactions here, because this store is deliberately leaderless.`,
      setup: {
        extensions: goExtensions,
        toolchain: goToolchain,
        structure: `ringkv/
├── go.mod
├── simnet/                   # copied or imported from MP 1
├── ring/ring.go              # hash ring, virtual nodes, preference lists
├── version/vector.go         # version vectors and sibling reconciliation
├── store/node.go             # replica storage and request handlers
├── store/coordinator.go      # quorum reads and writes, read repair
├── store/hints.go            # sloppy quorum and hinted handoff
├── merkle/tree.go            # binary hash tree over key buckets
├── gossip/gossip.go          # membership
├── crdt/gcounter.go
├── cmd/experiment/main.go    # staleness and latency for N, R, W settings
└── docs/CONSISTENCY.md`,
        commands: [
          { label: 'Run all tests', command: 'go test ./...' },
          { label: 'Run the quorum experiment', command: 'go run ./cmd/experiment -seed 7 -n 3 -r 2 -w 2 -ops 100000' },
          { label: 'Run the partition chaos test over many seeds', command: 'go test ./store -run TestChaos -v -seeds 100' },
          { label: 'Check for common mistakes', command: 'go vet ./...' },
        ],
      },
      requirements: [
        'The ring hashes keys and node tokens with SHA-256, gives each physical node 128 virtual nodes, and returns a preference list of N distinct physical nodes.',
        'Any node can coordinate. `Put` and `Get` accept N, R and W per request, and return a quorum error if too few replicas answer within 200 virtual ms.',
        'Every stored value carries a version vector. A replica discards versions dominated by a newer one, and keeps concurrent versions as siblings.',
        '`Get` returns all siblings with an opaque context, and `Put` with that context replaces the versions it has seen.',
        'After a `Get`, the coordinator sends the newest versions to any replica that answered with an out-of-date one.',
        'With sloppy quorums on, a write skips unreachable preference nodes and goes to the next healthy nodes with a hint. Each hint is delivered when its target returns and is then deleted.',
        'Each pair of replicas compares a binary Merkle tree with 1,024 leaf buckets every 5 virtual seconds, and transfers only the keys in differing buckets.',
        'Nodes gossip membership and heartbeats with one random peer each second, so a newly joined node is known to all others within 10 rounds in a 5-node cluster.',
        'A `GCounter` type supports `Incr` and `Value`, and replicas merge it by taking the per-node maximum.',
        '`docs/CONSISTENCY.md` gives stale-read rate and p50 and p99 latency for (N, R, W) of (3,1,1), (3,2,2) and (3,1,3), and explains why a quorum system with R + W > N is still not automatically linearizable.',
      ],
      acceptanceTests: [
        'With 5 nodes, 128 virtual nodes each and 100,000 random keys, every node is primary for between 14% and 26% of keys. After adding a sixth node, between 12% and 22% of keys change primary (16.7% is expected), and every key that moved now has the new node as its primary.',
        'Key `k` holds value `1` on replicas A, B and C. With C partitioned from A and B, `Put(k, 2)` through A with W=2 succeeds. `Get(k)` through C with R=1 returns the stale `1`, and with R=2 returns a quorum error. After healing, `Get(k)` with R=2 through any node returns `2`.',
        'While A and B are partitioned, each accepts a W=1 write to one key. After healing, `Get` returns two siblings with vectors `{A:1}` and `{B:1}`, which compare as concurrent. A `Put` coordinated by A with that context leaves one version with vector `{A:2,B:1}`.',
        'With 5 nodes, preference list A, B, C, and both B and C down, a W=2 write fails in strict mode. With sloppy quorums on it succeeds, storing on A, D and E with D and E holding hints for B and C. After B and C return, both have the value within 10 virtual seconds, and no hints remain.',
        'Two 1,024-leaf Merkle trees that differ in one key compare exactly 21 node hashes (the root plus 2 per level for 10 levels) and transfer only that bucket. Identical trees compare exactly 1 hash.',
        'For seeds 1 to 100 with random partitions and restarts, using N=3, R=2, W=2, every acknowledged write is readable after healing, and all replicas reach identical Merkle roots within 60 virtual seconds. Three nodes that each increment a `GCounter` 100 times during a partition all report 300 after merging.',
      ],
      resources: [
        {
          title: 'Dynamo: Amazon\'s Highly Available Key-value Store',
          url: 'https://www.allthingsdistributed.com/files/amazon-dynamo-sosp2007.pdf',
          type: 'article',
          cost: 'free',
          provider: 'SOSP 2007',
          note: 'Sections 4 and 6 are the design and lessons this MP follows. Table 1 is a good checklist.',
        },
      ],
      stretchGoals: [
        'Add a phi-accrual failure detector and compare its false positives with a fixed timeout under jittery delay.',
        'Add an OR-Set CRDT, and show add and remove commands from both sides of a partition merging correctly.',
      ],
    },
  ],
  finalProject: {
    slug: 'final-seedlog',
    title: 'seedlog: a replicated log broker you can break on purpose and replay',
    repoName: 'seedlog',
    summary: 'Build a Raft-replicated, partitioned log broker with a deterministic simulator that finds bugs and replays any failure, seed by seed, in a visual timeline.',
    language: 'Go 1.22',
    estimatedHours: 60,
    overview: `Plenty of people have a Raft implementation. Very few can run a thousand failure scenarios in a minute, then hand you a single number that replays the exact bug in a browser. \`seedlog\` is built around that idea.

It is a small Kafka-like broker. Topics are split into partitions, each partition is its own **Raft group**, and producers and consumers use a client library. The design of everything, including the Raft code, is yours. Your own \`Transport\` and \`Storage\` interfaces mean one implementation runs in two worlds: real TCP between local processes, and a **deterministic simulator** in the style of FoundationDB, which extends your \`simnet\`.

The simulator crashes nodes, loses unsynced writes, cuts networks asymmetrically, skews clocks and reorders messages, all from one seed. A checker feeds each recorded history to Porcupine to test linearizability. When a seed fails, \`seedlog-sim -seed N -html out.html\` writes a timeline of every node, message, election and fault, so you can see the bug.

To prove the simulator works, you add **deliberate bugs behind flags** and show it catches them. That is the headline of the project: this tester finds real consensus bugs.

Above the core you add the features that make it a real system: exactly-once producers, atomic multi-partition publish with two-phase commit, consumer groups, fenced leases, backoff with circuit breakers, and metrics and traces against a written SLO.

**Original work only.** This is your own design with your own API, storage format and test harness. Do not copy code, tests or structure from the MIT 6.5840 labs or any published solutions to them. All distributed behaviour is tested on one machine.`,
    setup: {
      extensions: [...goExtensions, 'ms-vscode-remote.remote-wsl', 'github.vscode-github-actions'],
      toolchain: [
        ...goToolchain,
        raceNote,
        'Add the linearizability checker with `go get github.com/anishathalye/porcupine`.',
      ],
      structure: `seedlog/
├── go.mod
├── raft/                     # consensus core, written against interfaces
├── sim/                      # deterministic simulator and fault schedule
├── sim/bugs.go               # flag-gated deliberate bugs
├── check/                    # history recording and Porcupine models
├── broker/                   # topics, partitions, segments, retention
├── txn/                      # replicated two-phase commit coordinator
├── group/                    # consumer groups and committed offsets
├── lease/                    # leases and fencing tokens
├── client/                   # deadlines, backoff, circuit breaker
├── transport/tcp/            # real network mode
├── obs/                      # counters, histograms, trace IDs
├── viz/                      # HTML timeline generator
├── cmd/seedlog/              # broker binary
├── cmd/seedlog-sim/          # simulator binary
├── docs/DESIGN.md
├── docs/TESTING.md
├── .github/workflows/ci.yml
└── README.md`,
      commands: [
        { label: 'Run unit tests', command: 'go test ./...' },
        { label: 'Run the race detector over the TCP mode', command: 'go test -race ./transport/... ./client/...' },
        { label: 'Simulate 1,000 seeds with faults', command: 'go run ./cmd/seedlog-sim -seeds 1000 -nodes 5 -faults all' },
        { label: 'Replay one seed as a timeline', command: 'go run ./cmd/seedlog-sim -seed 8127 -html timeline.html' },
        { label: 'Confirm the simulator catches a planted bug', command: 'go run ./cmd/seedlog-sim -seeds 10000 -bug no-election-restriction' },
        { label: 'Start one broker of a local cluster', command: 'go run ./cmd/seedlog -id 1 -peers 127.0.0.1:7001,127.0.0.1:7002,127.0.0.1:7003 -data data/1' },
      ],
    },
    requirements: [
      'The simulator runs all nodes in one goroutine from one seed, and injects crashes, restarts that lose unsynced writes, symmetric and asymmetric partitions, message delay, loss, duplication and clock skew.',
      'Your Raft implementation provides leader election, log replication, persistence and snapshots behind your own `Transport` and `Storage` interfaces, and uses no timers or sockets directly.',
      'Log compaction keeps the in-memory Raft log under 10,000 entries, and a node that falls far behind catches up by installing a snapshot.',
      'Each topic partition is a Raft group placed on 3 nodes by consistent hashing. Records are stored in segment files with size-based retention, and offsets increase without gaps.',
      'Producers carry an ID and sequence number, recorded in the replicated state machine, so retries never create a duplicate record.',
      'An atomic publish to several partitions uses two-phase commit, with the coordinator state held in its own Raft group, so a coordinator crash cannot block participants forever.',
      'Consumer groups assign partitions evenly, rebalance when a member stops sending heartbeats, and resume from committed offsets with at-least-once delivery.',
      'A lease service issues monotonically increasing fencing tokens, and brokers reject writes that carry a token older than the latest one seen.',
      'Clients use deadlines, exponential backoff with full jitter and a circuit breaker. Brokers use bounded queues and shed load with a retryable error when full.',
      'Each node exports counters and latency histograms, a trace ID follows an append through every hop, `docs/DESIGN.md` states an SLO for append latency, and at least three flag-gated bugs in `sim/bugs.go` are each found by the simulator.',
    ],
    acceptanceTests: [
      'With 3 nodes, 5 ms one-way delay, no faults, no batching and a known leader, an append is acknowledged after exactly 20 virtual ms: client to leader, leader to follower, follower to leader, then leader to client.',
      'For 1,000 seeds with all faults enabled, each with a history of at least 500 operations, Porcupine reports no linearizability violation. Running any one seed twice produces an identical trace hash.',
      'With `-bug no-election-restriction`, which lets a candidate with an out-of-date log win, the simulator reports a violation within 10,000 seeds and prints a seed. Replaying that seed reproduces the same violation and draws it on the timeline.',
      'With 5 nodes and election timeouts of 150 to 300 ms, a new leader is elected within 2 virtual seconds of a leader crash in all of 1,000 seeds. A 2-node minority cannot acknowledge any append. After healing, its uncommitted entries are discarded and every acknowledged append remains.',
      'A producer retrying through 20% message loss makes 10,000 appends and ends with exactly 10,000 records. Across 1,000 seeds that crash the coordinator leader after all participants have prepared, each atomic publish appears on both partitions or on neither, once recovery ends.',
      'Three consumers on 12 partitions hold 4 each, and after one is killed the other two hold 6 each within 10 virtual seconds, with no committed record skipped. A paused client with token 33 whose lease expires has its write rejected once a new holder has written with token 34.',
    ],
    coverage: [
      { module: 'models-and-fundamentals', demonstrates: 'The simulator encodes an explicit failure model, and `docs/DESIGN.md` states the safety and liveness claims tested under it.' },
      { module: 'rpc-and-time', demonstrates: 'Idempotent producer sequence numbers handle retries, and leases cope with simulated clock skew safely.' },
      { module: 'replication-and-consensus', demonstrates: 'Your own Raft replicates every partition, with persistence, snapshots and tests of election safety.' },
      { module: 'consistency-and-transactions', demonstrates: 'Porcupine verifies linearizability, and two-phase commit makes publishes across partitions atomic.' },
      { module: 'storage-and-data-processing', demonstrates: 'Consistent hashing places partitions, and segment files with retention give the storage layer a real design.' },
      { module: 'fault-tolerance-and-observability', demonstrates: 'Fault injection, circuit breakers, load shedding, histograms, traces and an SLO show operational engineering.' },
      { module: 'case-studies', demonstrates: 'Consumer groups, the log abstraction and fencing tokens apply the lessons from Kafka and ZooKeeper.' },
    ],
    portfolio: [
      'The README opens with an image of the failure timeline and a quick start that takes a reader from `git clone` to a replayed bug in under a minute.',
      'GitHub Actions runs unit tests, `go vet`, and a 200-seed simulation on every push, with a status badge. A nightly job runs a much larger seed range.',
      'The repository has a LICENSE, a tagged `v1.0.0` release, and prebuilt `seedlog-sim` binaries attached to the release.',
      '`docs/TESTING.md` gives a bug diary: each real bug the simulator found in your code, its seed, the cause, the fix, and a timeline image.',
      '`docs/DESIGN.md` covers the architecture, the guarantees and their justification, and known limitations, with latency and throughput measured on real TCP.',
    ],
    resources: [
      {
        title: 'In Search of an Understandable Consensus Algorithm (Extended Version)',
        url: 'https://raft.github.io/raft.pdf',
        type: 'article',
        cost: 'free',
        provider: 'Ongaro and Ousterhout',
        note: 'The authoritative description of Raft. Figure 2 is the specification to check your code against.',
      },
      {
        title: 'Porcupine',
        url: 'https://github.com/anishathalye/porcupine',
        type: 'tool',
        cost: 'free',
        provider: 'Anish Athalye',
        note: 'A fast linearizability checker for Go. Use it as a library against your own model.',
      },
    ],
    stretchGoals: [
      'Add single-server membership changes, then re-replicate partitions when a node is removed permanently.',
      'Shrink a failing seed automatically by removing faults until the smallest failing schedule remains.',
    ],
  },
});
