import { defineSubject } from '../define';

export default defineSubject({
  id: 'distributed-systems',
  title: 'Distributed Systems',
  category: 'cs',
  tagline:
    'How to make many unreliable computers behave like one reliable one: time, consensus, replication, consistency and fault tolerance, learned by building a Raft-backed key-value store.',
  description: `A distributed system is a collection of independent computers that cooperate over a network and appear to their users as a single coherent system. Almost everything at scale, from a bank ledger to a search engine to the file system behind your photos, is one. They are hard for a reason Leslie Lamport captured exactly: "a distributed system is one in which the failure of a computer you didn't even know existed can render your own computer unusable." The network loses and reorders messages, clocks disagree, and machines crash at the worst moment, yet the system must stay correct.

This subject teaches the ideas that tame that chaos: models of failure and the impossibility results that bound what is achievable (FLP, the two generals, CAP); how to reason about time and order without a global clock (logical clocks, causality, snapshots); how to keep replicas in agreement despite failures (primary-backup, Paxos, and Raft); what "consistency" actually means (linearizability through eventual consistency) and how transactions span machines; and how real storage and data-processing systems (GFS, MapReduce, Dynamo, Spanner) make concrete trade-offs. It follows MIT's 6.5840 (formerly 6.824) closely: you will read the classic papers, reason about them, and build working systems in Go, culminating in a fault-tolerant replicated key-value store on your own Raft implementation.

The primary sources are the MIT 6.5840 course, papers and labs; the Raft paper and Diego Ongaro's thesis; Martin Kleppmann's *Designing Data-Intensive Applications* (with the free MIT papers and Jepsen analyses as open alternatives); Lamport's foundational papers; and the AWS Builders' Library and Google SRE books for the operational reality. By the end you should be able to read any systems paper critically, choose and justify consistency and replication strategies, implement consensus, and test a distributed system the way Jepsen does: adversarially, under partitions.`,
  difficulty: 'advanced',
  estimatedHours: 90,
  prerequisites: ['operating-systems', 'computer-networks', 'databases'],
  recommendedBackground: [
    'Comfortable with concurrency (threads, locks, race conditions) and the OS process/thread model',
    'Solid networking (TCP, RPC, latency and partitions) from the Computer Networks subject',
    'Able to learn Go quickly; the labs are in Go and use goroutines and channels',
  ],
  tags: ['distributed-systems', 'consensus', 'raft', 'replication', 'consistency', 'fault-tolerance', 'Go'],
  core: false,
  modules: [
    {
      slug: 'models-and-fundamentals',
      title: 'Models and Fundamentals',
      description:
        'Why distributed systems are hard, how we model networks and failures precisely, and the impossibility results that bound what any protocol can achieve.',
      lessons: [
        {
          slug: 'what-is-a-distributed-system',
          title: 'What is a distributed system, and why is it hard?',
          summary:
            'The defining properties, the reasons we build them (scalability, availability, locality), and the fallacies that trip up every newcomer.',
          estimatedMinutes: 80,
          objectives: [
            'Define a distributed system and give the main reasons to build one',
            'State the eight fallacies of distributed computing and why each is false',
            'Explain partial failure and why it is the central difficulty',
            'Distinguish scalability, availability, fault tolerance and consistency as goals that trade off',
          ],
          concepts: [
            'Distributed system: independent nodes, no shared memory, message passing',
            'Reasons: scale, availability, fault tolerance, geographic locality',
            'The eight fallacies of distributed computing',
            'Partial failure; the absence of a global "now"',
            'Latency vs bandwidth; the network is not reliable',
            'Scalability (vertical vs horizontal); availability',
            'Why "appear as one system" is the goal',
          ],
          explanation: `A **distributed system** is a set of independent computers, each with its own memory and clock, that communicate only by passing messages over a network and together present themselves as a single system. We build them for four reasons: to **scale** beyond one machine's capacity, to stay **available** when individual machines fail, to tolerate **faults** (and disasters) by replicating, and to put data and computation near users for **locality** and low latency. Every large system you use is distributed for some combination of these.

The difficulty has one root: **partial failure**. On a single machine, the program either runs or crashes as a whole; in a distributed system, any subset of nodes and links can fail independently and at any time, and crucially, a node that sent you a request and got no reply **cannot tell** whether the other node crashed, the network dropped the request, the reply was lost, or everything is fine but slow. There is also no global **"now"**: each node has its own clock, and messages take variable, unbounded time, so you cannot simply ask "what is the current state of the system?" These two facts, partial failure and the absence of a global present, generate essentially every hard problem in the subject.

Newcomers repeatedly assume these problems away, which Peter Deutsch and others codified as the **eight fallacies of distributed computing**: the network is reliable; latency is zero; bandwidth is infinite; the network is secure; topology doesn't change; there is one administrator; transport cost is zero; the network is homogeneous. Every one is false, and every one, when assumed, produces a real outage. Jim Waldo's "A Note on Distributed Computing" makes the deeper point that you cannot paper over the network to make remote calls look local; latency, partial failure and concurrency leak through any abstraction.

Finally, the goals **trade off**: more consistency can cost availability under partition (CAP, later), more replication costs coordination, and lower latency can cost freshness. The art of this subject is choosing deliberately. Read the MIT 6.5840 introduction, Waldo's note, and the fallacies, and start a running list of the assumptions each later system makes.`,
          resources: [
            {
              title: 'MIT 6.5840 Distributed Systems — course home and schedule',
              url: 'https://pdos.csail.mit.edu/6.5840/',
              type: 'course',
              cost: 'free',
              provider: 'MIT',
              note: 'The backbone of this subject: lecture notes, the paper list and the Go labs. Read the introduction (lecture 1) now.',
              primary: true,
            },
            {
              title: 'A Note on Distributed Computing (Waldo et al., 1994)',
              url: 'https://scholar.harvard.edu/files/waldo/files/waldo-94.pdf',
              type: 'article',
              cost: 'free',
              provider: 'Sun Microsystems',
              note: 'Why remote and local computing are fundamentally different; if the link is blocked, search the title for a mirror.',
            },
            {
              title: 'Fallacies of Distributed Computing (Wikipedia overview)',
              url: 'https://en.wikipedia.org/wiki/Fallacies_of_distributed_computing',
              type: 'article',
              cost: 'free',
            },
            {
              title: 'Notes on Distributed Systems for Young Bloods',
              url: 'https://www.somethingsimilar.com/2013/01/14/notes-on-distributed-systems-for-young-bloods/',
              type: 'article',
              cost: 'free',
              provider: 'Jeff Hodges',
              note: 'A practitioner\'s field guide to the realities the fallacies hide.',
            },
          ],
          exercises: [
            {
              slug: 'fallacies-incident-map',
              title: 'Map incidents to fallacies',
              prompt:
                'For each of the eight fallacies, find or recall a real outage or bug caused by assuming it, and explain in two sentences how the false assumption led to the failure. Then describe one system you have built or used and identify which fallacy it is most exposed to and why.',
              kind: 'writing',
              difficulty: 1,
            },
            {
              slug: 'partial-failure-rpc',
              title: 'Observe partial failure',
              prompt:
                'Write a tiny client/server RPC in Go (or any language): the client calls increment(key) and the server increments a counter and replies. Now inject failures: drop the reply 20% of the time and delay it randomly up to 5 s. Have the client retry on timeout. Run 10,000 increments and compare the server\'s counter with the number the client believes succeeded. Explain the discrepancy and why the client cannot distinguish a lost request from a lost reply.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'goals-tradeoff-design',
              title: 'Trade off the goals',
              prompt:
                'For three systems (a global social feed, a bank core ledger, a multiplayer game), rank the four goals (scalability, availability, consistency, low latency) by importance and justify the ranking. For each, name one design choice the ranking implies (e.g. synchronous replication, eventual consistency, a single region) and the cost it accepts.',
              kind: 'writing',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why is partial failure the central difficulty of distributed systems?',
              answerOutline:
                'Any subset of nodes/links can fail independently, and a node cannot distinguish a crashed peer from a slow network or a lost reply, so it must act correctly under fundamental uncertainty.',
            },
            {
              question: 'State three of the eight fallacies and a consequence of assuming each.',
              answerOutline:
                'E.g. "network is reliable" → no retry/timeout handling, lost data; "latency is zero" → chatty designs that collapse over WAN; "topology doesn\'t change" → hardcoded hosts that break on failover.',
            },
            {
              question: 'Why can you not simply ask a distributed system for its current global state?',
              answerOutline:
                'There is no global clock; each node has its own time and messages take variable delay, so "now" is not well defined and a consistent snapshot requires a protocol (Chandy-Lamport).',
            },
            {
              question: 'Give two distinct reasons to build a system as distributed rather than on one machine.',
              answerOutline:
                'Any two of: scale beyond one machine, remain available despite machine failure, geographic locality/latency, disaster tolerance via replication.',
            },
          ],
        },
        {
          slug: 'system-models-and-failure-modes',
          title: 'System models and failure modes',
          summary:
            'The precise vocabulary for reasoning: synchronous vs asynchronous timing, crash vs Byzantine faults, fair-loss links, and what "correct" means under each.',
          estimatedMinutes: 90,
          objectives: [
            'Distinguish synchronous, partially synchronous and asynchronous timing models',
            'Distinguish crash-stop, crash-recovery, omission and Byzantine failure models',
            'Explain the network model (fair-loss, reliable, authenticated) assumptions protocols make',
            'Explain safety vs liveness and why a protocol is proved against a stated model',
          ],
          concepts: [
            'Timing: synchronous, asynchronous, partial synchrony',
            'Process failures: crash-stop, crash-recovery, omission, Byzantine',
            'Link models: fair-loss, reliable, authenticated/perfect',
            'Fail-stop vs fail-silent; the fail-stop assumption',
            'Safety ("nothing bad") vs liveness ("something good eventually")',
            'Quorums and majority intersection',
            'Stating assumptions; a protocol is only correct in its model',
          ],
          explanation: `Because you cannot test every failure, you reason about distributed protocols against an explicit **model**, and a protocol is only "correct" relative to the model it assumes. Three axes define the model. **Timing**: a **synchronous** system has known bounds on message delay and clock drift (so a timeout is a reliable failure detector); an **asynchronous** system has no bounds at all (a message may take arbitrarily long, so you can never conclude a node is dead); real systems are **partially synchronous**, usually asynchronous but synchronous "eventually", which is exactly the setting in which consensus becomes solvable with a failure detector. **Process failures**: in **crash-stop** a node halts and never returns; in **crash-recovery** it may restart (so it must persist state); **omission** failures drop some messages; **Byzantine** failures are arbitrary or malicious, where a node can lie, equivocate or collude, which is the model for untrusted participants (blockchains, aerospace). Most of this course assumes **crash** faults; Byzantine fault tolerance is a specialism touched on later. **Link models** range from **fair-loss** (a message sent infinitely often eventually arrives) up to **reliable** and **authenticated** channels; you usually build reliable links on fair-loss ones with retransmission, exactly as TCP does.

Two kinds of property must be proved. **Safety** says "nothing bad ever happens" (two nodes never disagree on a committed value); a safety violation is a concrete bad event you can point to. **Liveness** says "something good eventually happens" (a request is eventually answered); a liveness violation is an infinite run in which the good thing never occurs. The deep results of this subject (FLP, CAP) are precisely about the tension: it is often easy to guarantee safety always and liveness only under favourable conditions, and impossible to guarantee both always in an asynchronous system.

The workhorse technique that recurs everywhere is the **quorum**: require any operation to involve a majority of nodes. Because any two majorities of $2f+1$ nodes **intersect** in at least one node, a later majority always sees what an earlier majority committed, which is how systems tolerate $f$ failures while staying consistent. Keep asking, of every protocol: what timing, failure and link model does it assume, and what safety and liveness does it promise? The MIT notes and Kleppmann's distributed-systems notes are the reference.`,
          resources: [
            {
              title: 'Distributed Systems lecture notes (Kleppmann, Cambridge)',
              url: 'https://www.cl.cam.ac.uk/teaching/2425/ConcDisSys/dist-sys-notes.pdf',
              type: 'textbook',
              cost: 'free',
              provider: 'University of Cambridge',
              note: 'Precise treatment of system models, failure modes, and safety/liveness. Read the first chapters.',
              primary: true,
            },
            {
              title: 'MIT 6.5840 lecture notes — introduction and RPC (models)',
              url: 'https://pdos.csail.mit.edu/6.824/notes/l-rpc.txt',
              type: 'lecture',
              cost: 'free',
              provider: 'MIT',
            },
            {
              title: 'Distributed Systems for Fun and Profit — Chapter 2 (abstractions and models)',
              url: 'https://book.mixu.net/distsys/',
              type: 'textbook',
              cost: 'free',
              provider: 'Mikito Takada',
            },
            {
              title: 'Byzantine fault (overview)',
              url: 'https://en.wikipedia.org/wiki/Byzantine_fault',
              type: 'article',
              cost: 'free',
            },
          ],
          exercises: [
            {
              slug: 'classify-models',
              title: 'Classify systems by model',
              prompt:
                'For five real systems or protocols (TCP, a single data-centre Raft cluster, a cross-continent quorum store, a blockchain, a hard-real-time avionics bus), state the timing model, the process-failure model and the link model each assumes or provides, and justify each choice. Identify which one needs Byzantine fault tolerance and why.',
              kind: 'writing',
              difficulty: 2,
            },
            {
              slug: 'build-reliable-on-fairloss',
              title: 'Build a reliable link on a fair-loss link',
              prompt:
                'Simulate a fair-loss link (each message delivered with probability 0.7, possibly reordered or duplicated). Implement a reliable, ordered delivery layer on top using sequence numbers, acknowledgements and retransmission, and a de-duplication set. Test that a stream of 10,000 messages is delivered exactly once in order. Then argue why exactly-once delivery is impossible in general and what you actually guaranteed (at-least-once plus idempotent dedup).',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'safety-liveness-examples',
              title: 'Safety vs liveness',
              prompt:
                'For a mutual-exclusion protocol and for a leader-election protocol, state one safety property and one liveness property each in precise terms. Then describe, for each, an execution that violates the liveness property while preserving safety, and explain why asynchronous timing makes guaranteeing the liveness property hard.',
              kind: 'writing',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What is the practical difference between a synchronous and an asynchronous model for failure detection?',
              answerOutline:
                'In a synchronous model, a timeout bound lets you reliably conclude a node has failed; in an asynchronous model there is no bound, so a timeout can only suspect, never prove, failure.',
            },
            {
              question: 'Contrast crash-stop with Byzantine failures and give a system that must assume each.',
              answerOutline:
                'Crash-stop: nodes halt honestly (e.g. a trusted data-centre cluster, Raft). Byzantine: nodes may behave arbitrarily/maliciously (e.g. a public blockchain, aerospace voting).',
            },
            {
              question: 'Why do majority quorums give consistency across operations?',
              answerOutline:
                'Any two majorities of 2f+1 nodes share at least one node, so a later majority observes a value committed by an earlier majority; this tolerates f failures without divergence.',
            },
            {
              question: 'Distinguish safety and liveness with an example of each.',
              answerOutline:
                'Safety: nothing bad happens (no two committed values disagree). Liveness: something good eventually happens (every request is eventually answered). Safety is violated by a bad event; liveness by an infinite run lacking the good event.',
            },
          ],
        },
        {
          slug: 'impossibility-and-the-two-generals',
          title: 'The two generals, FLP and the limits of agreement',
          summary:
            'The foundational impossibility results: why reliable agreement over a lossy channel is impossible, and why consensus is impossible in a purely asynchronous system with even one crash.',
          estimatedMinutes: 90,
          objectives: [
            'Explain the two generals problem and why no finite protocol achieves certain agreement over a lossy link',
            'State the FLP impossibility result and what exactly it rules out',
            'Explain how real systems circumvent FLP (randomisation, partial synchrony, failure detectors)',
            'Connect these results to the practical design of timeouts and leader election',
          ],
          concepts: [
            'The two generals problem; impossibility of common knowledge over lossy links',
            'Consensus problem: agreement, validity, termination',
            'FLP (Fischer-Lynch-Paterson): no deterministic consensus in async with one crash',
            'Why FLP is about liveness (termination), not safety',
            'Circumventing FLP: partial synchrony, failure detectors, randomisation',
            'Timeouts as imperfect failure detectors',
            'Implications for leader election',
          ],
          explanation: `Two beautiful results bound everything that follows. The **two generals problem**: two armies on opposite hills must attack together to win, communicating only by messengers who may be captured. No finite exchange of messages can give both generals **certainty** that they agree on a time, because the last messenger sent might be the one captured, so each new acknowledgement needs its own acknowledgement, forever. The lesson is that **certain agreement over an unreliable channel is impossible**; you can only reduce the probability of disagreement, which is why real protocols settle for "high probability" and idempotent retries rather than certainty, and why exactly-once semantics must be built from at-least-once delivery plus deduplication.

The deeper result is **FLP** (Fischer, Lynch, Paterson, 1985). **Consensus** asks a set of processes, each proposing a value, to all decide the **same** value (agreement), a value someone proposed (validity), and to actually decide (termination). FLP proves that in a fully **asynchronous** system, no **deterministic** protocol can guarantee consensus if even **one** process may crash. The intuition: because you cannot distinguish a crashed process from a slow one, there is always an execution in which the protocol is forced to wait or risk disagreeing, and an adversarial scheduler can keep it in that "bivalent" undecided state forever. Crucially, FLP rules out guaranteed **termination** (liveness), not safety: you can always stay safe, you just cannot promise to always finish.

So how do real systems reach consensus every day? They **circumvent** FLP by weakening its assumptions in one of three ways. **Partial synchrony**: assume the network is *eventually* well-behaved, so a leader can make progress during good periods (this is what Paxos and Raft do). **Failure detectors**: use timeouts as an imperfect oracle that eventually suspects crashed nodes, accepting that a slow node is occasionally wrongly suspected (costing a leader election, not correctness). **Randomisation**: flip coins so the adversary cannot force the bad schedule with certainty. The practical upshot, which you will feel in the Raft labs, is that **timeouts** are everywhere, not because they detect failure reliably (they cannot), but because they provide just enough synchrony to guarantee progress during good periods while never compromising safety during bad ones. Read the FLP paper's statement (the proof is dense; understand what it claims), the two generals, and how Raft's election timeouts embody the circumvention.`,
          resources: [
            {
              title: 'Impossibility of Distributed Consensus with One Faulty Process (FLP, 1985)',
              url: 'https://groups.csail.mit.edu/tds/papers/Lynch/jacm85.pdf',
              type: 'article',
              cost: 'free',
              provider: 'MIT (JACM)',
              note: 'Read the problem statement and theorem; the full proof is for a second pass.',
              primary: true,
            },
            {
              title: 'Two Generals Problem (overview)',
              url: 'https://en.wikipedia.org/wiki/Two_Generals%27_Problem',
              type: 'article',
              cost: 'free',
            },
            {
              title: 'A Brief Tour of FLP Impossibility (Paper Trail)',
              url: 'https://www.the-paper-trail.org/post/2008-08-13-a-brief-tour-of-flp-impossibility/',
              type: 'article',
              cost: 'free',
              provider: 'Henry Robinson',
              note: 'An accessible walkthrough of what FLP does and does not say.',
            },
            {
              title: 'Distributed Systems lecture notes (Kleppmann) — consensus and FLP',
              url: 'https://www.cl.cam.ac.uk/teaching/2425/ConcDisSys/dist-sys-notes.pdf',
              type: 'textbook',
              cost: 'free',
              provider: 'University of Cambridge',
            },
          ],
          exercises: [
            {
              slug: 'two-generals-sim',
              title: 'Two generals in simulation',
              prompt:
                'Simulate the two generals problem: two processes exchanging messages over a channel that drops each message with probability p. Implement a protocol where each side keeps sending its decision and acknowledging the other until it has received an ack, and measure, over many runs, the probability both attack, only one attacks, or neither, as a function of p and a message cap. Explain why no cap guarantees both always attack and relate this to idempotent retries.',
              kind: 'simulation',
              difficulty: 2,
            },
            {
              slug: 'flp-explain',
              title: 'Explain FLP to an engineer',
              prompt:
                'Write a one-page explanation of FLP for a working engineer who asks "if consensus is impossible, how does Raft work?" Define the consensus problem, state precisely what FLP rules out (deterministic termination in async with one crash), stress that safety is untouched, and explain the three circumventions with Raft as the worked example of partial synchrony plus timeouts.',
              kind: 'writing',
              difficulty: 2,
            },
            {
              slug: 'timeout-tuning',
              title: 'Timeouts as imperfect detectors',
              prompt:
                'In a small simulation of a cluster with variable message delay, implement a timeout-based failure detector. Vary the timeout and measure the trade-off between detection latency (how fast you notice a real crash) and false-positive rate (how often you wrongly suspect a slow-but-alive node). Plot the trade-off and explain how a wrong suspicion costs a leader election but not safety.',
              kind: 'simulation',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What does the two generals problem prove, and what does it imply for message delivery semantics?',
              answerOutline:
                'Certain agreement over a lossy channel is impossible with finite messages; hence systems use at-least-once delivery with idempotent dedup rather than guaranteed exactly-once certainty.',
            },
            {
              question: 'Precisely, what does FLP say is impossible?',
              answerOutline:
                'In a fully asynchronous system where even one process may crash, no deterministic protocol can guarantee that consensus always terminates (while also being safe).',
            },
            {
              question: 'Does FLP mean consensus is useless in practice? Why not?',
              answerOutline:
                'No; it only forbids guaranteed termination under worst-case asynchrony. Partial synchrony, failure detectors (timeouts) and randomisation give termination in practice while FLP-respecting safety always holds.',
            },
            {
              question: 'Why are timeouts described as imperfect failure detectors?',
              answerOutline:
                'They cannot distinguish a crashed node from a slow one, so they may wrongly suspect a live node; they provide enough synchrony for progress during good periods without ever violating safety.',
            },
          ],
        },
      ],
    },
    {
      slug: 'rpc-and-time',
      title: 'Communication and Time',
      description:
        'The tools for building distributed systems: remote procedure calls and serialization, physical clocks and their limits, logical clocks and causality, and consistent global snapshots.',
      lessons: [
        {
          slug: 'rpc-and-serialization',
          title: 'RPC and serialization',
          summary:
            'How nodes call each other: the RPC abstraction and its leaks, serialization formats, timeout and retry semantics, and why idempotency is essential.',
          estimatedMinutes: 90,
          objectives: [
            'Explain the RPC model and where the remote/local illusion leaks',
            'Compare serialization formats (Protocol Buffers, JSON) on schema, size and evolution',
            'Explain at-most-once, at-least-once and exactly-once RPC semantics and how to achieve each',
            'Design idempotent RPCs and handle timeouts and retries correctly',
          ],
          concepts: [
            'RPC: making a remote call look local; stubs/marshalling',
            'Serialization: Protocol Buffers, JSON; schema evolution',
            'Failure semantics: at-most-once, at-least-once, exactly-once',
            'Idempotency and request de-duplication (idempotency keys)',
            'Timeouts, retries, and the ambiguity of a lost reply',
            'Interface definition languages; versioning',
            'gRPC and streaming',
          ],
          explanation: `Nodes cooperate by calling one another, and the dominant abstraction is the **remote procedure call**: you invoke what looks like a local function and the RPC framework **marshals** the arguments into bytes, sends them, runs the procedure on the remote node, and returns the result. The convenience is real but the abstraction **leaks** exactly where Waldo warned: a local call cannot fail partway, take a second, or be delivered twice, but a remote call can do all three, so you must design for failure even though the syntax hides it.

**Serialization** is how arguments and results become bytes. **Protocol Buffers** (and similar IDL-based formats such as Thrift, Avro, Cap'n Proto) use a **schema** to generate compact binary encodings and, importantly, support **schema evolution**: fields have numbered tags, so adding an optional field keeps old and new peers compatible, which matters enormously when you cannot upgrade every node at once. **JSON** is human-readable and schema-less, convenient but larger and with weaker evolution guarantees. Choosing a format is choosing a position on the size/readability/evolution triangle, and in large systems the ability to evolve the schema safely usually wins, which is why gRPC + protobuf dominates internal RPC.

The subtle part is **failure semantics**. If a client sends a request and the timeout fires with no reply, it faces the two-generals ambiguity: the request may or may not have executed. **At-most-once** semantics never execute a duplicate (achieved by the server remembering request IDs and returning the cached response), at the cost of state; **at-least-once** simply retries, which is simple but can double-execute; **exactly-once** is the user-visible goal and is achieved not by magic delivery but by **at-least-once delivery plus idempotency** on the server. An operation is **idempotent** if applying it twice has the same effect as once (set x=5 is idempotent; increment x is not), so the standard pattern is to attach an **idempotency key** to each request and have the server deduplicate, exactly how payment APIs such as Stripe guarantee a retried charge is not a double charge. You will build an RPC layer and make it survive retries. This leans directly on the Computer Networks sockets and reliability material.`,
          resources: [
            {
              title: 'MIT 6.5840 — RPC and threads (lecture notes and lab)',
              url: 'https://pdos.csail.mit.edu/6.824/notes/l-rpc.txt',
              type: 'lecture',
              cost: 'free',
              provider: 'MIT',
              note: 'Covers RPC semantics, at-most-once, and Go concurrency used in the labs.',
              primary: true,
            },
            {
              title: 'gRPC — Introduction and core concepts',
              url: 'https://grpc.io/docs/what-is-grpc/introduction/',
              type: 'documentation',
              cost: 'free',
              provider: 'gRPC / CNCF',
            },
            {
              title: 'Protocol Buffers documentation (proto3 and schema evolution)',
              url: 'https://protobuf.dev/programming-guides/proto3/',
              type: 'documentation',
              cost: 'free',
              provider: 'Google',
            },
            {
              title: 'Stripe — Designing robust and predictable APIs with idempotency',
              url: 'https://stripe.com/blog/idempotency',
              type: 'article',
              cost: 'free',
              provider: 'Stripe',
            },
          ],
          exercises: [
            {
              slug: 'rpc-with-dedup',
              title: 'RPC with at-most-once semantics',
              prompt:
                'Build an RPC server for a bank account supporting deposit and withdraw, called over an unreliable channel (random drops and duplicates). First show at-least-once retries cause double deposits. Then add idempotency keys and a server-side de-duplication table that caches responses, achieving effectively-exactly-once. Prove with a test of 10,000 retried calls that the final balance is correct. Discuss when you can expire the dedup table.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'schema-evolution',
              title: 'Schema evolution with protobuf',
              prompt:
                'Define a protobuf message for a user record. Generate code, serialize a value, and measure its size versus the equivalent JSON. Then evolve the schema: add a field, rename via a new tag, and remove an old field, and demonstrate that an old reader can parse a new message and vice versa. Document which changes are safe and which break compatibility, and why field tags matter.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'idempotency-design',
              title: 'Make operations idempotent',
              prompt:
                'For five operations (create user, increment counter, append to log, transfer money, send email), state whether each is naturally idempotent, and if not, design a scheme (idempotency key, conditional update, dedup window) to make a retried request safe. For the "send email" case, explain why true idempotency is impossible and what the best achievable guarantee is.',
              kind: 'writing',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Where does the RPC "looks like a local call" abstraction leak?',
              answerOutline:
                'Remote calls can suffer partial failure, unbounded latency and duplication, none of which local calls can; the caller must handle timeouts, retries and ambiguity the syntax hides.',
            },
            {
              question: 'How is exactly-once effect achieved given that exactly-once delivery is impossible?',
              answerOutline:
                'At-least-once delivery (retries) combined with server-side idempotency/deduplication via request IDs, so re-executed requests produce the same result.',
            },
            {
              question: 'Why do IDL/protobuf field tags matter for schema evolution?',
              answerOutline:
                'Tags identify fields independent of position/name, so adding optional fields or removing unused ones keeps old and new peers compatible during rolling upgrades.',
            },
            {
              question: 'A client times out waiting for an RPC reply. What are the possibilities and the safe response?',
              answerOutline:
                'The request may have executed or not (lost request vs lost reply). Safe response: retry with an idempotency key so a duplicate execution is deduplicated server-side.',
            },
          ],
          relatedLessons: ['computer-networks/application-layer/socket-programming'],
        },
        {
          slug: 'physical-clocks-and-synchronization',
          title: 'Physical clocks and their limits',
          summary:
            'Why wall-clock time is treacherous in distributed systems: clock drift, NTP synchronization, leap seconds, and why you should rarely compare timestamps across machines.',
          estimatedMinutes: 80,
          objectives: [
            'Explain clock drift and skew and the magnitude of each in real hardware',
            'Explain how NTP synchronizes clocks and its accuracy limits',
            'Explain the hazards of using wall-clock timestamps for ordering or expiry across machines',
            'Describe when physical time is unavoidable and how systems bound its uncertainty',
          ],
          concepts: [
            'Clock drift (rate error) and skew (offset)',
            'Monotonic vs wall-clock (time-of-day) clocks',
            'NTP: offset estimation, stratum, accuracy; PTP for data centres',
            'Leap seconds and smearing',
            'Dangers: timestamp ordering, TTL/expiry, last-write-wins',
            'Bounded clock uncertainty (TrueTime preview)',
            'When to use monotonic clocks (timeouts, durations)',
          ],
          explanation: `Every machine has a quartz clock that **drifts**: its rate differs from true time by tens to hundreds of parts per million, so an unsynchronized clock can gain or lose seconds per day, and two machines' clocks will disagree (**skew**) by an unpredictable amount at any instant. This makes **wall-clock time a dangerous input** to distributed logic. There are two clocks to distinguish: the **wall-clock** (time-of-day) can jump backwards (when NTP corrects it) and must never be used to measure a duration; the **monotonic** clock only moves forward and is what you use for timeouts and elapsed time.

**NTP** keeps wall clocks roughly aligned by measuring the round-trip to time servers (organised in **strata** from atomic sources down) and estimating the offset, correcting by **slewing** (gradually speeding or slowing) rather than jumping where possible. Its accuracy over the internet is typically a few milliseconds to tens of milliseconds, far larger than the time between many distributed events; inside a data centre, **PTP** can reach microseconds. **Leap seconds** add a further hazard, an inserted 61st second that naive code mishandles; large operators **smear** the leap second over hours to avoid a discontinuity, as Google documented.

The practical rules follow directly. Do **not** compare timestamps from different machines to decide what happened first; skew can easily exceed the real time gap, so "later timestamp wins" (**last-write-wins** conflict resolution) can silently drop the newer write and is a known data-loss pattern. Do **not** use wall-clock time for TTLs or expiry logic that must be consistent across nodes. Use the **monotonic** clock for durations and timeouts. When you genuinely need physical time for ordering (a globally consistent database), you must **bound the uncertainty** and wait it out: Google's Spanner (later module) exposes a **TrueTime** interval and deliberately waits until the uncertainty has passed before committing, turning the clock error from an invisible hazard into an explicit, bounded cost. The deeper lesson is that physical time rarely gives you the ordering you actually want; **logical** time, the next lesson, does.`,
          resources: [
            {
              title: 'Distributed Systems lecture notes (Kleppmann) — physical clocks and NTP',
              url: 'https://www.cl.cam.ac.uk/teaching/2425/ConcDisSys/dist-sys-notes.pdf',
              type: 'textbook',
              cost: 'free',
              provider: 'University of Cambridge',
              note: 'Clear treatment of drift, skew, NTP and the dangers of timestamp ordering.',
              primary: true,
            },
            {
              title: 'NTP — the Network Time Protocol project',
              url: 'https://www.ntp.org/',
              type: 'documentation',
              cost: 'free',
              provider: 'NTP Project',
            },
            {
              title: 'Google — Leap smear and time at Google',
              url: 'https://developers.google.com/time/smear',
              type: 'article',
              cost: 'free',
              provider: 'Google',
            },
            {
              title: 'chrony documentation (modern NTP client)',
              url: 'https://chrony-project.org/',
              type: 'documentation',
              cost: 'free',
              provider: 'chrony project',
            },
          ],
          exercises: [
            {
              slug: 'measure-drift',
              title: 'Measure clock behaviour',
              prompt:
                'On your machine, read both the monotonic clock and the wall-clock repeatedly over several minutes and detect any wall-clock jumps (e.g. from NTP corrections). If you have two machines, timestamp the same externally-triggered event on both and estimate their skew. Write up the magnitudes observed and explain why you used the monotonic clock to measure your own sampling interval.',
              kind: 'coding',
              difficulty: 1,
            },
            {
              slug: 'lww-data-loss',
              title: 'Demonstrate last-write-wins data loss',
              prompt:
                'Simulate two clients writing to a replicated key, each stamping its write with its local wall clock, with the clocks skewed by 200 ms. Construct a sequence where client A writes after client B in real time but A\'s clock is behind, so last-write-wins keeps B\'s older value and silently discards A\'s newer one. Explain the bug and propose two fixes (version vectors, or server-assigned ordering).',
              kind: 'simulation',
              difficulty: 2,
            },
            {
              slug: 'timeout-clock-choice',
              title: 'Pick the right clock',
              prompt:
                'Audit a piece of code (yours or an example) that uses time for: a request timeout, a cache TTL shared across nodes, a rate limiter, and an event ordering. For each, state whether it should use the monotonic or wall clock (or neither, needing logical time), identify any bug in using the wrong one, and rewrite it correctly.',
              kind: 'writing',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why should you never measure a duration with the wall-clock time?',
              answerOutline:
                'The wall clock can jump backward or forward (NTP corrections, leap seconds), producing negative or wrong durations; the monotonic clock only moves forward and is correct for intervals.',
            },
            {
              question: 'Why is last-write-wins by wall-clock timestamp a data-loss risk?',
              answerOutline:
                'Clock skew between nodes can exceed the real time gap between writes, so the genuinely newer write may carry an earlier timestamp and be discarded.',
            },
            {
              question: 'What accuracy does NTP typically achieve and why is that often insufficient for ordering?',
              answerOutline:
                'Milliseconds to tens of milliseconds over the internet; many distributed events occur closer together than that, so timestamp order can be wrong.',
            },
            {
              question: 'How does Spanner make physical time usable for ordering?',
              answerOutline:
                'TrueTime exposes an explicit uncertainty interval, and commits wait out the interval so that timestamp order is guaranteed to match real order, converting hidden skew into a bounded, visible delay.',
            },
          ],
        },
        {
          slug: 'logical-clocks-and-causality',
          title: 'Logical clocks and causality',
          summary:
            'Ordering events without a global clock: the happens-before relation, Lamport timestamps for a total order, and vector clocks to detect concurrency.',
          estimatedMinutes: 100,
          objectives: [
            'Define the happens-before relation and concurrency',
            'Compute Lamport timestamps and use them to build a total order',
            'Compute vector clocks and use them to detect causally concurrent events',
            'Explain where each clock is used (total-order broadcast, conflict detection)',
          ],
          concepts: [
            'Happens-before (→); causality; concurrent events',
            'Lamport logical clocks: update rules',
            'Lamport clocks give a consistent total order (with tie-breaking)',
            'Lamport clocks cannot detect concurrency',
            'Vector clocks: per-node counters; comparison',
            'Detecting causality and conflicts with vector clocks',
            'Applications: Dynamo version vectors, causal consistency',
          ],
          explanation: `Since physical clocks cannot order events reliably, Lamport's 1978 insight was to order events by **causality** instead of by time. Define **happens-before** ($\\rightarrow$): on one node, earlier events happen-before later ones; a message's send happens-before its receive; and the relation is transitive. Two events with neither $a \\rightarrow b$ nor $b \\rightarrow a$ are **concurrent**, meaning neither could have influenced the other. This relation, not wall-clock time, is the correct notion of "order" in a distributed system, because it captures exactly the orderings that could matter causally.

**Lamport logical clocks** implement a counter consistent with happens-before. Each node keeps an integer $C$; it increments $C$ before each local event; it attaches $C$ to every message sent; and on receiving a message with timestamp $t$ it sets $C = \\max(C, t) + 1$. The guarantee is that if $a \\rightarrow b$ then $C(a) < C(b)$. Breaking ties by node id gives a **total order** consistent with causality, which is exactly what **total-order broadcast** and many replicated state machines need, every replica applies operations in the same Lamport order and ends in the same state. The limitation is the converse: $C(a) < C(b)$ does **not** imply $a \\rightarrow b$; Lamport clocks cannot tell you whether two events were causally related or merely concurrent, because a single integer collapses the information.

**Vector clocks** recover that information. Each node keeps a vector with one counter per node; it increments its own entry on each event, sends the whole vector, and on receipt takes the element-wise maximum then increments its own entry. Now you can **compare**: $V(a) < V(b)$ (every component $\\le$, at least one strictly less) exactly when $a \\rightarrow b$; if neither dominates, the events are **concurrent**. This lets a system **detect conflicts**: Amazon's Dynamo attaches **version vectors** to values so that concurrent writes to the same key are detected and surfaced for reconciliation rather than silently lost, and **causal consistency** (later) is built on exactly this machinery. The cost is space: vectors grow with the number of nodes, which practical systems bound with dotted version vectors and pruning. Read Lamport's "Time, Clocks" paper, which is both foundational and readable, and implement both clocks.`,
          resources: [
            {
              title: 'Time, Clocks, and the Ordering of Events in a Distributed System (Lamport, 1978)',
              url: 'https://lamport.azurewebsites.net/pubs/time-clocks.pdf',
              type: 'article',
              cost: 'free',
              provider: 'Leslie Lamport',
              note: 'The foundational paper. Read all of it; it is short and clear.',
              primary: true,
            },
            {
              title: 'Vector clock (overview and comparison rules)',
              url: 'https://en.wikipedia.org/wiki/Vector_clock',
              type: 'article',
              cost: 'free',
            },
            {
              title: 'Distributed Systems lecture notes (Kleppmann) — logical time',
              url: 'https://www.cl.cam.ac.uk/teaching/2425/ConcDisSys/dist-sys-notes.pdf',
              type: 'textbook',
              cost: 'free',
              provider: 'University of Cambridge',
            },
            {
              title: 'MIT 6.5840 lecture notes — Raft / ordering context',
              url: 'https://pdos.csail.mit.edu/6.824/notes/l-raft.txt',
              type: 'lecture',
              cost: 'free',
              provider: 'MIT',
            },
          ],
          exercises: [
            {
              slug: 'implement-lamport',
              title: 'Implement Lamport clocks and total order',
              prompt:
                'Simulate three nodes exchanging messages and performing local events. Implement Lamport clocks and record the timestamp of every event. Produce the total order (timestamp, then node id) and verify it is consistent with happens-before for every message send/receive pair. Then exhibit two concurrent events that Lamport clocks order but that are not causally related, demonstrating the limitation.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'implement-vector-clocks',
              title: 'Implement vector clocks and detect concurrency',
              prompt:
                'Extend the previous simulation to vector clocks. For every pair of events, classify them as a→b, b→a, or concurrent using the vector comparison rule, and check the classification against the ground-truth causal graph. Then simulate two concurrent writes to one key and show how version vectors flag the conflict that last-write-wins would silently resolve.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'causality-design',
              title: 'Choose the right clock for a feature',
              prompt:
                'For three features (a totally-ordered replicated log, a shopping cart that must not lose concurrent adds, and a comment thread that must show replies after their parent), decide whether Lamport clocks, vector clocks, or a consensus total order is appropriate, and justify. For the shopping cart, sketch how version vectors plus a merge function (a CRDT) would preserve all concurrent additions.',
              kind: 'writing',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Define happens-before and concurrency.',
              answerOutline:
                'a→b if a precedes b on one node, or a is a message send and b its receive, closed transitively. Events with neither a→b nor b→a are concurrent (causally independent).',
            },
            {
              question: 'What does a Lamport clock guarantee, and what can it not tell you?',
              answerOutline:
                'If a→b then C(a)<C(b); it gives a total order consistent with causality. It cannot detect concurrency: C(a)<C(b) does not imply a→b.',
            },
            {
              question: 'How do vector clocks determine that two events are concurrent?',
              answerOutline:
                'Compare element-wise: a→b iff V(a) ≤ V(b) with at least one strictly less; if neither vector dominates the other, the events are concurrent.',
            },
            {
              question: 'Why does Dynamo use version vectors on values?',
              answerOutline:
                'To detect concurrent writes to the same key so conflicts are surfaced for reconciliation (or merged) rather than silently lost by last-write-wins.',
            },
          ],
        },
        {
          slug: 'global-snapshots',
          title: 'Global state and consistent snapshots',
          summary:
            'Capturing a meaningful global state of a running system without stopping it: the Chandy-Lamport snapshot algorithm and what a consistent cut means.',
          estimatedMinutes: 80,
          objectives: [
            'Explain why naively reading each node\'s state gives an inconsistent snapshot',
            'Define a consistent cut in terms of happens-before',
            'Explain the Chandy-Lamport algorithm including marker messages and channel recording',
            'Give applications: deadlock/termination detection, checkpointing, debugging',
          ],
          concepts: [
            'Global state; the problem of in-flight messages',
            'Consistent cut: closed under happens-before',
            'Chandy-Lamport marker algorithm',
            'Recording process state and channel state',
            'Assumptions: FIFO channels, reliable delivery',
            'Applications: checkpoint/restart, stable-property detection',
            'Snapshots vs consensus',
          ],
          explanation: `Suppose you want a **global snapshot** of a running distributed system, say, to checkpoint it, to detect a deadlock, or to count the total money in a banking system spread across nodes. The naive approach, ask every node for its state, fails, because the nodes answer at different (skewed) times and messages are **in flight** on the network: you might record the money as having left node A but not yet arrived at node B, so your snapshot shows it vanished, or record it at both, so it appears doubled. A correct snapshot must account for the channels, not just the nodes.

The correct notion is a **consistent cut**: a set of events (one "cut point" per node) such that the set is **closed under happens-before**, if event $b$ is in the cut and $a \\rightarrow b$, then $a$ is in the cut too. Intuitively, no node's recorded state reflects receiving a message whose send was not also recorded. An inconsistent cut shows an effect without its cause (a receive without its send).

The **Chandy-Lamport** algorithm (1985) captures a consistent cut of a running system **without pausing it**, assuming FIFO, reliable channels. Any node can initiate: it records its own state and sends a special **marker** message on all its outgoing channels. When a node first receives a marker, it records its own state, records the initiating channel as empty, and sends markers on all its outgoing channels; for every *other* incoming channel, it records the messages that arrive between recording its state and receiving the marker on that channel, those are the in-flight messages that belong to the snapshot's channel state. When every node has received a marker on every channel, the union of recorded process states and channel contents is a consistent global snapshot, even though different parts were recorded at different real times and the system never stopped.

Snapshots detect **stable properties**, those that once true stay true (termination, deadlock), and support checkpoint/restart and debugging. They are distinct from consensus: a snapshot captures a consistent view of state, it does not make nodes agree on a new value. You will implement Chandy-Lamport and use it to compute a globally consistent total across nodes while transfers are in flight. Read the MIT notes and Lamport's distributed-snapshots paper with Chandy.`,
          resources: [
            {
              title: 'Distributed Snapshots: Determining Global States (Chandy & Lamport, 1985)',
              url: 'https://lamport.azurewebsites.net/pubs/chandy.pdf',
              type: 'article',
              cost: 'free',
              provider: 'Leslie Lamport',
              note: 'The original algorithm; read for the marker rules and the consistency argument.',
              primary: true,
            },
            {
              title: 'Distributed Systems lecture notes (Kleppmann) — snapshots and consistent cuts',
              url: 'https://www.cl.cam.ac.uk/teaching/2425/ConcDisSys/dist-sys-notes.pdf',
              type: 'textbook',
              cost: 'free',
              provider: 'University of Cambridge',
            },
            {
              title: 'MIT 6.5840 lecture notes (ordering and state context)',
              url: 'https://pdos.csail.mit.edu/6.824/notes/l-raft.txt',
              type: 'lecture',
              cost: 'free',
              provider: 'MIT',
            },
          ],
          exercises: [
            {
              slug: 'inconsistent-cut-demo',
              title: 'Show an inconsistent snapshot',
              prompt:
                'Simulate three nodes passing "money" messages. Take a naive snapshot by reading each node\'s balance at a slightly different moment while transfers are in flight. Run many trials and show the recorded total is sometimes wrong (money appears created or destroyed). Characterise exactly which in-flight messages cause the error.',
              kind: 'simulation',
              difficulty: 2,
            },
            {
              slug: 'implement-chandy-lamport',
              title: 'Implement Chandy-Lamport',
              prompt:
                'Implement the Chandy-Lamport snapshot over FIFO channels for the money-transfer simulation. Record process states and channel contents with marker messages. Verify over 1000 trials, with transfers continuously in flight, that the snapshot total always equals the conserved total. Print one snapshot showing a non-empty channel state and explain why those in-flight messages had to be included.',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'snapshot-applications',
              title: 'Apply snapshots',
              prompt:
                'Explain how a consistent snapshot is used to detect (a) distributed termination and (b) a distributed deadlock, and why both are "stable properties". Then describe how a stream processor such as Flink uses Chandy-Lamport-style barriers for exactly-once checkpointing, and why FIFO channels are required.',
              kind: 'writing',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does reading each node\'s state at an arbitrary moment give an inconsistent snapshot?',
              answerOutline:
                'Nodes are read at different times and messages are in flight, so the snapshot can show a receive without its send (or vice versa), e.g. money created or destroyed.',
            },
            {
              question: 'What is a consistent cut?',
              answerOutline:
                'A set of per-node cut points closed under happens-before: if an event is in the cut, so is every event that happened-before it; no effect appears without its cause.',
            },
            {
              question: 'What role do marker messages play in Chandy-Lamport?',
              answerOutline:
                'A marker tells a receiver to record its state (on first marker) and delimits, per channel, which in-flight messages belong to the snapshot\'s channel state; propagating markers coordinates the cut.',
            },
            {
              question: 'What assumption about channels does Chandy-Lamport require and why?',
              answerOutline:
                'FIFO (and reliable) channels, so the marker cleanly separates pre-snapshot messages (recorded as channel state) from post-snapshot messages.',
            },
          ],
        },
      ],
    },
    {
      slug: 'replication-and-consensus',
      title: 'Replication and Consensus',
      description:
        'The core of fault tolerance: replicating a service so it survives failures, the consensus algorithms (Paxos and Raft) that keep replicas in agreement, and building a working Raft.',
      lessons: [
        {
          slug: 'replication-and-primary-backup',
          title: 'Replication and primary-backup',
          summary:
            'Why and how to replicate: state-machine replication, primary-backup with its split-brain hazard, and the chain- and VM-replication designs that preceded consensus.',
          estimatedMinutes: 90,
          objectives: [
            'Explain state-machine replication and the determinism it requires',
            'Explain primary-backup replication and the split-brain problem',
            'Contrast synchronous and asynchronous replication and their durability/latency trade-offs',
            'Describe VM-FT and chain replication as points in the design space',
          ],
          concepts: [
            'Replication for availability and durability',
            'State-machine replication: same ops, same order, deterministic',
            'Primary-backup; failover',
            'Split-brain (two primaries) and the need for agreement',
            'Synchronous vs asynchronous replication',
            'VM fault tolerance (deterministic replay)',
            'Chain replication; read/write roles',
          ],
          explanation: `**Replication**, keeping copies of a service's state on several machines, is how systems survive failures and serve more load. The dominant model is **state-machine replication** (SMR): treat the service as a deterministic state machine, feed every replica the **same operations in the same order**, and because each is deterministic they all reach the **same state**. The entire problem then reduces to one thing: getting the replicas to agree on the order of operations, which is consensus. The determinism requirement is subtle and strict: any nondeterminism (reading the clock, random numbers, thread-scheduling differences) must be eliminated or made part of the agreed input, or replicas diverge.

The simplest scheme is **primary-backup**: one **primary** orders and executes operations and ships them (or the resulting state changes) to one or more **backups**; if the primary fails, a backup takes over (**failover**). This works until the central hazard appears: **split-brain**. If the primary is merely slow or network-partitioned, not dead, the backup may promote itself while the old primary still believes it is primary, and now **two primaries** accept conflicting writes, corrupting the state irrecoverably. The naive fixes (pinging, timeouts) cannot solve it, because, per FLP and the two generals, you cannot reliably tell "dead" from "slow". The real fix is to make the "who is primary" decision itself a **consensus** decision backed by a **majority quorum**, so that at most one primary can ever hold a majority's blessing, which is precisely what Paxos and Raft provide and why the next lessons exist.

Replication also has a **durability/latency** dial. **Synchronous** replication waits for backups to acknowledge before confirming a write, so no acknowledged write is lost if the primary dies, at the cost of latency and of stalling if a backup is slow. **Asynchronous** replication confirms immediately and ships changes in the background, which is fast but can lose recent writes on failover. Two influential designs show the space: **VM-FT** (VMware) replicated an entire virtual machine by **deterministic replay** of its inputs to a backup VM, an extreme form of SMR; **chain replication** arranges replicas in a chain where writes flow head-to-tail and reads are served by the tail, giving strong consistency with high throughput. Read the VM-FT paper and the MIT primary-backup lecture; these motivate why we need the consensus you are about to build.`,
          resources: [
            {
              title: 'The Design of a Practical System for Fault-Tolerant Virtual Machines (VM-FT)',
              url: 'https://pdos.csail.mit.edu/6.824/papers/vm-ft.pdf',
              type: 'article',
              cost: 'free',
              provider: 'VMware / MIT 6.5840',
              note: 'State-machine replication by deterministic replay; read with the MIT lecture notes.',
              primary: true,
            },
            {
              title: 'MIT 6.5840 lecture notes — primary/backup replication (VM-FT)',
              url: 'https://pdos.csail.mit.edu/6.824/notes/l-vm-ft.txt',
              type: 'lecture',
              cost: 'free',
              provider: 'MIT',
            },
            {
              title: 'Chain Replication for Supporting High Throughput and Availability',
              url: 'https://www.cs.cornell.edu/home/rvr/papers/OSDI04.pdf',
              type: 'article',
              cost: 'free',
              provider: 'van Renesse & Schneider (Cornell)',
            },
            {
              title: 'AWS Builders\' Library — Leader election in distributed systems',
              url: 'https://aws.amazon.com/builders-library/leader-election-in-distributed-systems/',
              type: 'article',
              cost: 'free',
              provider: 'Amazon',
            },
          ],
          exercises: [
            {
              slug: 'smr-determinism',
              title: 'State-machine replication and nondeterminism',
              prompt:
                'Build two replicas of a simple key-value state machine fed the same ordered operation log, and show they reach identical state. Then introduce nondeterminism (an operation that stores the current wall-clock time, and one that uses a thread-unsafe map) and show the replicas diverge. Fix it by making the nondeterministic input part of the agreed log entry. Explain the general rule.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'split-brain-demo',
              title: 'Reproduce split-brain',
              prompt:
                'Implement a naive primary-backup where the backup promotes itself after missing 3 heartbeats. Introduce a network partition that isolates the primary from the backup but not from clients. Show both now accept writes and the states conflict. Then explain precisely why a majority-quorum requirement for primacy would have prevented it (the partitioned old primary cannot reach a majority).',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'sync-async-tradeoff',
              title: 'Measure the replication trade-off',
              prompt:
                'Implement synchronous and asynchronous replication to one backup over a link with 20 ms latency. Measure client-visible write latency and throughput for each. Then kill the primary mid-run and measure how many acknowledged writes are lost under each scheme. Present the durability-vs-latency trade-off as a table and recommend a default with justification.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What must be true of a service for state-machine replication to keep replicas identical?',
              answerOutline:
                'Operations must be applied in the same order and the state machine must be deterministic; all nondeterminism must be removed or folded into the agreed inputs.',
            },
            {
              question: 'What is split-brain and why can heartbeats alone not prevent it?',
              answerOutline:
                'Two nodes both act as primary during a partition and accept conflicting writes. Heartbeats cannot distinguish a dead primary from a slow/partitioned one, so a backup may promote while the old primary still serves.',
            },
            {
              question: 'How does requiring a majority quorum for primacy prevent split-brain?',
              answerOutline:
                'At most one side of a partition can contain a majority, so only one potential primary can gather majority support; the minority side cannot elect or sustain a primary.',
            },
            {
              question: 'What is the durability/latency trade-off between synchronous and asynchronous replication?',
              answerOutline:
                'Synchronous waits for backup acks (no acknowledged write lost on failover, higher latency); asynchronous acks immediately (lower latency, may lose recent writes if the primary dies).',
            },
          ],
        },
        {
          slug: 'consensus-and-paxos',
          title: 'Consensus and Paxos',
          summary:
            'The problem at the heart of fault tolerance and the first algorithm to solve it: the consensus specification, single-decree Paxos, and why it is famously subtle.',
          estimatedMinutes: 110,
          objectives: [
            'State the consensus properties and how majority quorums enable them despite f failures',
            'Explain single-decree Paxos: proposers, acceptors, the two phases and proposal numbers',
            'Explain why Paxos is safe under lost messages, partitions and competing proposers',
            'Explain the gap between Paxos the theory and a usable Multi-Paxos system',
          ],
          concepts: [
            'Consensus: agreement, validity, termination',
            'Roles: proposers, acceptors, learners',
            'Paxos phase 1 (prepare/promise) and phase 2 (accept/accepted)',
            'Proposal numbers; majority quorums; the chosen value',
            'Why a later proposer adopts an already-accepted value',
            'Dueling proposers and liveness (needs a distinguished leader)',
            'Multi-Paxos; the gap to a real implementation',
          ],
          explanation: `**Consensus** is the problem of getting a set of nodes to **agree on a single value** despite failures, with three properties: **agreement** (no two nodes decide differently), **validity** (the decided value was proposed by someone), and **termination** (nodes eventually decide, achievable only under partial synchrony per FLP). Solving it lets you build everything else: agree on each entry of a replicated log and you have state-machine replication; agree on "who is leader" and you kill split-brain. **Paxos** (Lamport, 1998) was the first correct, fault-tolerant solution and underlies Chubby, Spanner and much more.

Single-decree Paxos has **proposers** (propose values), **acceptors** (vote; a majority is a quorum), and **learners**. It runs in two phases using monotonically increasing, globally unique **proposal numbers**. **Phase 1 (prepare/promise)**: a proposer picks a number $n$ and asks a majority of acceptors to **promise** not to accept anything numbered below $n$; each acceptor promises and, crucially, reports the highest-numbered value it has already accepted. **Phase 2 (accept)**: if the proposer hears back from a majority, it sends an **accept** request for value $v$, where $v$ is the value with the highest proposal number among the promises received, or its own value if none was reported; acceptors that have not since promised a higher number accept it. A value is **chosen** once a majority has accepted it.

The safety argument is the heart of it and worth internalising: because any two majorities intersect, if value $v$ was chosen with number $n$, then any later proposer running phase 1 with a higher number will hear about $v$ from at least one acceptor in the intersection, and the phase-2 rule **forces it to propose $v$ too**. So once a value is chosen, every subsequent proposal re-proposes the same value, no two different values can ever be chosen, even under arbitrary message loss, reordering and competing proposers. That is why Paxos is safe always; it is **termination** that is not guaranteed, because two **dueling proposers** can keep pre-empting each other's proposal numbers forever, which is why practical systems elect a single **distinguished leader** to be the sole proposer during normal operation.

Paxos is famously hard to turn into a system: the single-decree version decides one value, but a real service needs a **log** of many values (**Multi-Paxos**), plus leader election, membership changes, and log compaction, which the paper leaves as exercises and which is exactly the gap Raft was designed to close. Read "Paxos Made Simple"; understand the safety argument even if the mechanics take a second pass.`,
          resources: [
            {
              title: 'Paxos Made Simple (Lamport, 2001)',
              url: 'https://lamport.azurewebsites.net/pubs/paxos-simple.pdf',
              type: 'article',
              cost: 'free',
              provider: 'Leslie Lamport',
              note: 'The accessible account of Paxos. Focus on the two phases and the intersection argument.',
              primary: true,
            },
            {
              title: 'The Morning Paper — consensus and Paxos',
              url: 'https://www.the-paper-trail.org/post/2009-02-03-consensus-protocols-paxos/',
              type: 'article',
              cost: 'free',
              provider: 'Paper Trail',
              note: 'A clear prose walkthrough of Paxos phases and safety.',
            },
            {
              title: 'MIT 6.5840 — Raft notes (comparing to Paxos)',
              url: 'https://pdos.csail.mit.edu/6.824/notes/l-raft.txt',
              type: 'lecture',
              cost: 'free',
              provider: 'MIT',
            },
            {
              title: 'Distributed Systems lecture notes (Kleppmann) — consensus',
              url: 'https://www.cl.cam.ac.uk/teaching/2425/ConcDisSys/dist-sys-notes.pdf',
              type: 'textbook',
              cost: 'free',
              provider: 'University of Cambridge',
            },
          ],
          exercises: [
            {
              slug: 'paxos-by-hand',
              title: 'Trace Paxos by hand',
              prompt:
                'With five acceptors, trace single-decree Paxos through: (a) a single proposer succeeding; (b) a proposer that crashes after phase 1; (c) two dueling proposers P1(n=1) and P2(n=2) interleaved so that P2 learns P1\'s accepted value and must propose it. For each, show the promise/accept messages and the final chosen value, and confirm agreement holds.',
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'implement-single-paxos',
              title: 'Implement single-decree Paxos',
              prompt:
                'Implement proposers and acceptors for single-decree Paxos with message passing, a lossy channel and the ability to crash nodes. Run 1000 randomized trials with competing proposers and message loss and assert that agreement (one chosen value) and validity always hold. Then demonstrate a run where dueling proposers prevent termination, and fix liveness by funnelling proposals through a single leader.',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'intersection-argument',
              title: 'Explain the safety argument',
              prompt:
                'Write a precise explanation of why Paxos can never choose two different values, centred on the quorum-intersection argument and the phase-2 rule that a proposer must adopt the highest-numbered previously-accepted value. Include a worked example of the intersection acceptor forcing a later proposer to re-propose the chosen value.',
              kind: 'writing',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'State the three properties of consensus.',
              answerOutline:
                'Agreement (no two nodes decide differently), validity (the decided value was proposed), termination (nodes eventually decide; only under partial synchrony).',
            },
            {
              question: 'Why must a Paxos proposer sometimes propose a value other than its own?',
              answerOutline:
                'If a majority of promises report an already-accepted value, the proposer must re-propose the highest-numbered such value, preserving any value that might already have been chosen.',
            },
            {
              question: 'How does quorum intersection guarantee agreement?',
              answerOutline:
                'Any two majorities share an acceptor; a later proposer\'s phase-1 majority includes one that knows a chosen value, forcing it to re-propose that value, so no second value can be chosen.',
            },
            {
              question: 'What does Paxos not guarantee, and how do real systems cope?',
              answerOutline:
                'Termination under contention (dueling proposers can loop forever); systems elect a single distinguished leader as the only proposer during normal operation.',
            },
          ],
        },
        {
          slug: 'raft',
          title: 'Raft: understandable consensus',
          summary:
            'The consensus algorithm designed to be teachable: leader election, log replication, the safety rules, and membership changes, as the basis for your implementation.',
          estimatedMinutes: 120,
          objectives: [
            'Explain Raft\'s decomposition into leader election, log replication and safety',
            'Explain terms, elections, randomized timeouts and how a leader is chosen',
            'Explain log replication, commitment by majority, and the log-matching and election-restriction safety rules',
            'Explain persistence, snapshotting and cluster membership changes',
          ],
          concepts: [
            'Leader-based consensus; terms as logical time',
            'Leader election; randomized election timeouts; split votes',
            'Log replication; AppendEntries; commit index',
            'Log matching property; consistency check',
            'Election restriction (up-to-date log) for safety',
            'Persistent state; snapshots and log compaction',
            'Membership changes (joint consensus / single-server)',
          ],
          explanation: `**Raft** (Ongaro and Ousterhout, 2014) solves the same problem as Multi-Paxos but was explicitly designed for **understandability**, decomposing consensus into three nearly-independent pieces, which is exactly why it is the algorithm you will implement.

**Leader election.** Time is divided into **terms**, an increasing integer that acts as a logical clock and detects stale information. Each server is follower, candidate or leader. A follower that hears nothing from a leader for a randomized **election timeout** becomes a candidate, increments the term, votes for itself and requests votes. A candidate that wins a **majority** becomes leader and sends heartbeats to suppress further elections. **Randomized** timeouts make simultaneous candidacies (split votes) rare, so an election usually resolves in one round; this is Raft's embodiment of circumventing FLP with partial synchrony.

**Log replication.** The leader is the sole entry point: it appends each client command to its log and sends **AppendEntries** RPCs to followers. An entry is **committed** once stored on a **majority**, and only then applied to the state machine and acknowledged to the client. AppendEntries carries the index and term of the entry *preceding* the new ones, and a follower rejects them unless that preceding entry matches, the **log-matching** consistency check, which inductively guarantees that if two logs agree at an index they agree on everything before it. On rejection the leader walks back until the logs converge, forcing followers to match its log.

**Safety.** The crucial rule is the **election restriction**: a server only grants its vote to a candidate whose log is at least as **up-to-date** as its own (by last log term, then index). This guarantees that any newly elected leader already contains every committed entry, so committed entries are never lost or overwritten, Raft's central safety property, "Leader Completeness". A subtle corollary is that a leader may only mark entries committed by counting replicas for entries **in its own current term**.

Finally, a real system needs **persistence** (currentTerm, votedFor and the log survive crashes), **snapshotting** (compact the log by saving the state machine and discarding prefix entries, else the log grows forever), and **membership changes** (add/remove servers without losing safety, via joint consensus or single-server changes). The Raft paper and the extended version (and Ongaro's thesis) specify all of this precisely; read them closely, because your implementation must match the spec exactly or it will fail under partition. The visualisation at thesecretlivesofdata.com builds intuition first.`,
          resources: [
            {
              title: 'In Search of an Understandable Consensus Algorithm (Raft, extended version)',
              url: 'https://raft.github.io/raft.pdf',
              type: 'article',
              cost: 'free',
              provider: 'Ongaro & Ousterhout',
              note: 'The specification you implement. Figure 2 is the contract; keep it beside you.',
              primary: true,
            },
            {
              title: 'The Raft site (visualisations, talks, implementations)',
              url: 'https://raft.github.io/',
              type: 'documentation',
              cost: 'free',
            },
            {
              title: 'The Secret Lives of Data — Raft visualisation',
              url: 'https://thesecretlivesofdata.com/raft/',
              type: 'interactive',
              cost: 'free',
              note: 'Build intuition for elections and log replication before reading the paper.',
            },
            {
              title: 'Consensus: Bridging Theory and Practice (Ongaro PhD thesis)',
              url: 'https://web.stanford.edu/~ouster/cgi-bin/papers/OngaroPhD.pdf',
              type: 'article',
              cost: 'free',
              provider: 'Stanford',
              note: 'The full treatment, including membership changes and snapshotting.',
            },
          ],
          exercises: [
            {
              slug: 'raft-election-trace',
              title: 'Trace elections and safety',
              prompt:
                'On a 5-node cluster, trace: (a) a normal election after the leader crashes; (b) a split vote and how randomized timeouts resolve it; (c) a scenario where a candidate with a stale (less up-to-date) log is denied votes by the election restriction, and explain why electing it would have lost a committed entry. Show terms and votes at each step.',
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'log-matching-exercise',
              title: 'Work the log-matching rule',
              prompt:
                'Given a leader log and three divergent follower logs, apply the AppendEntries consistency check and the leader\'s back-off to show exactly which entries each follower deletes and receives until it matches the leader. Then construct a case showing why a leader must not count replicas of a previous term\'s entry as sufficient to commit it, and how committing an entry from its own term fixes this.',
              kind: 'problem',
              difficulty: 3,
            },
            {
              slug: 'raft-reading-questions',
              title: 'Answer the paper questions',
              prompt:
                'Answer the MIT 6.5840 reading questions for the Raft paper, and additionally: why are election timeouts randomized; why must currentTerm and votedFor be persisted before responding; what exactly can go wrong if a server applies an entry to its state machine before it is committed; and how does snapshotting interact with a slow follower that needs old entries. Cite Figure 2 rules.',
              kind: 'reading',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'How does Raft ensure a newly elected leader has all committed entries?',
              answerOutline:
                'The election restriction: voters only grant votes to candidates whose log is at least as up-to-date (last term, then index), so a winner\'s log contains every committed entry (Leader Completeness).',
            },
            {
              question: 'What does the log-matching property guarantee and how is it enforced?',
              answerOutline:
                'If two logs have an entry with the same index and term, they are identical in all preceding entries. Enforced by AppendEntries carrying the preceding entry\'s index/term and followers rejecting mismatches.',
            },
            {
              question: 'Why are Raft election timeouts randomized?',
              answerOutline:
                'To make simultaneous candidacies (split votes) unlikely, so one candidate usually times out first and wins, giving quick progress during the partially-synchronous good periods.',
            },
            {
              question: 'Why must Raft state (currentTerm, votedFor, log) be persisted before responding to RPCs?',
              answerOutline:
                'A crash-recovery node must not forget its vote or term, or it could vote twice or accept a stale leader, violating safety after restart.',
            },
          ],
          relatedLessons: ['operating-systems/beyond-the-kernel/distributed-file-systems'],
        },
        {
          slug: 'implementing-raft',
          title: 'Implementing Raft',
          summary:
            'Turning the specification into working, tested code: structuring the implementation, the concurrency, the subtle bugs, and testing it under failures the way the labs and Jepsen do.',
          estimatedMinutes: 150,
          objectives: [
            'Structure a Raft implementation around Figure 2 with correct concurrency',
            'Implement leader election and log replication that pass fault-injection tests',
            'Diagnose the classic Raft bugs (commit-index errors, term confusion, livelock)',
            'Test a consensus implementation under partitions, crashes and message loss',
          ],
          concepts: [
            'Mapping Figure 2 to code; the big lock vs per-RPC goroutines',
            'Election timers and heartbeat loops',
            'AppendEntries, nextIndex/matchIndex, commit advancement',
            'Persistence and crash-recovery',
            'Common bugs: applying uncommitted entries, term/leader confusion, deadlock',
            'Deterministic/fault-injection testing (the 6.5840 tester)',
            'Debugging distributed code: logging, assertions, reproducibility',
          ],
          explanation: `Reading Raft is not understanding Raft; implementing it is, and this lesson is where the subject's ideas become code. The MIT 6.5840 Raft labs provide a test harness that simulates an unreliable network, crashes, restarts and partitions, and your implementation must pass it hundreds of times in a row, because distributed bugs are probabilistic.

**Structure.** Map **Figure 2** of the paper directly: the persistent state (currentTerm, votedFor, log), the volatile state (commitIndex, lastApplied, and the leader's nextIndex/matchIndex), and the RPC handlers (RequestVote, AppendEntries). The pragmatic advice, from the instructors' guide, is to start with a **single big lock** protecting all Raft state and only optimise later; most concurrency bugs come from clever fine-grained locking. Run an election-timeout loop and a heartbeat loop; send RPCs in their own goroutines so a slow or dead peer never blocks the others, and re-check term and role after every RPC returns, because the world may have moved on.

**The subtle bugs** are a rite of passage, and knowing them in advance saves days. You must never apply an entry to the state machine until it is **committed**; commitIndex advances only when an entry from the **current term** is on a majority (committing a prior-term entry by replica count alone is the famous Figure 8 bug). Terms must be checked obsessively: any RPC or reply carrying a higher term makes you a follower immediately. A candidate that keeps timing out before winning is a **livelock**, usually a timer-reset bug. And every state transition must be reflected in persisted state before you reply, or crash-recovery breaks safety.

**Testing** is the real lesson of the subject. You cannot prove a distributed system correct by a few runs; you subject it to **fault injection**, the tester drops and delays messages, partitions the cluster and crashes nodes at adversarial moments, exactly the methodology **Jepsen** made famous for testing real databases by checking histories against a consistency model under induced partitions. Build in heavy, toggleable logging and assertions, make runs reproducible with a seed, and when a test fails once in a hundred runs, treat it as a real bug and hunt it, because under load it will happen constantly. The output of this lesson is the Raft layer your capstone key-value store is built on. Use the 6.5840 lab, the extended Raft paper's Figure 2, and the students'/instructors' guides to Raft, which catalogue precisely the bugs you will hit.`,
          resources: [
            {
              title: 'MIT 6.5840 — Raft lab (Lab 3 / lab-raft)',
              url: 'https://pdos.csail.mit.edu/6.5840/labs/lab-raft1.html',
              type: 'problem-set',
              cost: 'free',
              provider: 'MIT',
              note: 'The guided implementation with a fault-injecting tester. The core hands-on work of this subject.',
              primary: true,
            },
            {
              title: 'Students\' Guide to Raft (Jon Gjengset, MIT)',
              url: 'https://thesquareplanet.com/blog/students-guide-to-raft/',
              type: 'article',
              cost: 'free',
              note: 'The catalogue of implementation pitfalls; read before and during coding.',
            },
            {
              title: 'Eli Bendersky — Implementing Raft (multi-part, with code)',
              url: 'https://eli.thegreenplace.net/2020/implementing-raft-part-0-introduction/',
              type: 'article',
              cost: 'free',
              note: 'A worked Go implementation explained part by part.',
            },
            {
              title: 'Jepsen — testing distributed systems for safety',
              url: 'https://jepsen.io/',
              type: 'article',
              cost: 'free',
              provider: 'Kyle Kingsbury',
              note: 'The methodology for adversarial testing under partitions; read an analysis to see consensus bugs found in real systems.',
            },
          ],
          exercises: [
            {
              slug: 'raft-election-lab',
              title: 'Leader election that passes the tester',
              prompt:
                'Implement Raft leader election and heartbeats (6.5840 Lab 3A or equivalent). Pass the election tests, including elections after a leader crash and re-election after a partition heals, running the test at least 50 times consecutively without failure. Report any flaky run and its root cause.',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'raft-replication-lab',
              title: 'Log replication and persistence',
              prompt:
                'Implement AppendEntries, commit advancement, and persistence (6.5840 Lab 3B/3C). Pass the replication and persistence tests, including the scenarios that exercise the Figure 8 commit rule and recovery after crashes. Instrument your code to assert that no entry is applied before commit and that commitIndex only advances on a current-term majority. Run the full suite repeatedly and report the pass rate.',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'adversarial-test',
              title: 'Write your own fault-injection test',
              prompt:
                'Add a test that, on top of your Raft, performs random partitions, crashes and message delays while a client submits operations, then checks that the committed log is identical and consistent across all surviving nodes (a linearizability-style check). Find at least one bug (or confirm none over 1000 runs) and document the methodology, relating it to how Jepsen tests real systems.',
              kind: 'coding',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'Why is starting with a single coarse lock recommended for a Raft implementation?',
              answerOutline:
                'Most Raft bugs are concurrency errors; a single lock keeps state consistent and the logic auditable, and performance is rarely the bottleneck at lab scale.',
            },
            {
              question: 'What is the Figure 8 commit rule and why does it matter?',
              answerOutline:
                'A leader may only consider an entry committed by replica count if it is from its current term; committing a prior-term entry on count alone can later be overwritten, violating safety.',
            },
            {
              question: 'Why must RPCs be sent in separate goroutines/threads and term be re-checked on return?',
              answerOutline:
                'A slow or dead peer must not block progress with others; and by the time a reply arrives the node\'s term/role may have changed, so stale replies must be ignored.',
            },
            {
              question: 'Why can a distributed system not be validated by running the tests a few times?',
              answerOutline:
                'Failures are probabilistic and schedule-dependent; only repeated runs under adversarial fault injection (partitions, crashes, delays) expose rare but real safety violations.',
            },
          ],
          relatedLessons: ['computer-networks/transport-layer/reliable-data-transfer'],
        },
      ],
    },
    {
      slug: 'consistency-and-transactions',
      title: 'Consistency and Transactions',
      description:
        'What "the data is correct" means across replicas: the consistency spectrum from linearizability to eventual consistency, the CAP and PACELC trade-offs, distributed transactions and isolation.',
      lessons: [
        {
          slug: 'consistency-models',
          title: 'Consistency models',
          summary:
            'The spectrum of guarantees a replicated store can offer: linearizability, sequential and causal consistency, and eventual consistency, and how to tell them apart.',
          estimatedMinutes: 110,
          objectives: [
            'Define linearizability and explain it as "behaves like a single copy with real-time order"',
            'Distinguish sequential, causal and eventual consistency and order them by strength',
            'Explain the cost of stronger models (coordination, latency, availability)',
            'Recognise which model a system provides and test for linearizability',
          ],
          concepts: [
            'Consistency model as a contract on read/write orderings',
            'Linearizability: single-copy semantics + real-time order',
            'Sequential consistency; dropping real-time order',
            'Causal consistency; respecting happens-before',
            'Eventual consistency; convergence',
            'Read-your-writes, monotonic reads (session guarantees)',
            'Linearizability vs serializability (different axes)',
          ],
          explanation: `When data is replicated, "correct" is not obvious: different replicas can hold different values at the same instant, so a **consistency model** is the contract that defines which orderings of reads and writes a client may observe. These models form a **spectrum** from strongest (most intuitive, most expensive) to weakest (cheapest, most surprising), and choosing the right point is one of the central design decisions in the subject.

**Linearizability** is the strongest single-object model: the system behaves as if there is a **single copy** of the data and every operation takes effect atomically at some instant **between its invocation and response**, consistent with **real-time** order, if operation A completes before B begins, every client sees A's effect before B's. It is the model that matches intuition ("once I write, everyone reads the new value") and the one a lock service or a bank balance needs, but it requires coordination on every operation and, per CAP (next lesson), sacrifices availability under partition. **Sequential consistency** is slightly weaker: all clients agree on *some* total order of operations consistent with each client's program order, but that order need not respect real time across clients, so a read can return a stale value as long as everyone is stale-consistent. **Causal consistency** only requires that operations related by **happens-before** are seen in order by everyone, while concurrent operations may be seen in different orders; it is the strongest model achievable while remaining available under partition and is what many "session" systems target. **Eventual consistency**, the weakest commonly used model, promises only that if writes stop, replicas **eventually converge** to the same value, with no guarantee about what you read in the meantime; it underlies highly available stores like Dynamo and demands conflict resolution (version vectors, CRDTs).

In between sit **session guarantees** that make eventual consistency tolerable: **read-your-writes** (you always see your own writes), **monotonic reads** (you never see time go backwards), and others. Finally, do not confuse **linearizability** with **serializability**: linearizability is about the real-time order of single-object operations; serializability is about multi-object **transactions** being equivalent to *some* serial order (next lessons). A system can offer one, both (**strict serializability**), or neither. You will implement a store at several consistency levels and use a checker to detect when it violates the model it claims. Jepsen's consistency pages are the best precise reference.`,
          resources: [
            {
              title: 'Jepsen — Consistency models (map and definitions)',
              url: 'https://jepsen.io/consistency',
              type: 'documentation',
              cost: 'free',
              provider: 'Jepsen',
              note: 'The interactive map of models from eventual to strict serializable, with precise definitions. The reference for this lesson.',
              primary: true,
            },
            {
              title: 'Linearizability: A Correctness Condition for Concurrent Objects (Herlihy & Wing)',
              url: 'https://cs.brown.edu/~mph/HerlihyW90/p463-herlihy.pdf',
              type: 'article',
              cost: 'free',
              provider: 'Brown University',
              note: 'The original definition of linearizability.',
            },
            {
              title: 'Strong consistency models (Aphyr)',
              url: 'https://aphyr.com/posts/313-strong-consistency-models',
              type: 'article',
              cost: 'free',
              provider: 'Kyle Kingsbury',
              note: 'A clear, worked ordering of the models and their relationships.',
            },
            {
              title: 'MIT 6.5840 — linearizability notes and FAQ',
              url: 'https://pdos.csail.mit.edu/6.824/papers/linearizability-faq.txt',
              type: 'lecture',
              cost: 'free',
              provider: 'MIT',
            },
          ],
          exercises: [
            {
              slug: 'classify-histories',
              title: 'Classify operation histories',
              prompt:
                'Given several short read/write histories across two clients and one replicated register, decide for each whether it is linearizable, sequentially consistent, causally consistent, or only eventually consistent, and justify by exhibiting (or proving impossible) a valid total order. Construct one history that is sequentially consistent but not linearizable and explain the real-time violation.',
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'linearizability-checker',
              title: 'Check a store with Porcupine',
              prompt:
                'Record an operation history (invocations and responses with timestamps) from a small replicated key-value store you build. Feed it to Porcupine (or the 6.5840 linearizability checker) and confirm it passes when the store serializes through one node. Then introduce a stale read from a lagging replica and show the checker reports a non-linearizable history, with the offending operations.',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'session-guarantees',
              title: 'Implement session guarantees',
              prompt:
                'On an eventually-consistent store (writes propagate asynchronously between two replicas), demonstrate a read-your-writes violation (write to replica A, read stale from replica B). Then implement read-your-writes and monotonic-reads using per-client version tracking (e.g. a last-seen version the client sends with reads). Show the violations disappear and discuss the cost.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What does linearizability add over sequential consistency?',
              answerOutline:
                'Real-time ordering: if one operation completes before another begins, all clients see them in that order; sequential consistency only requires some total order respecting each client\'s program order.',
            },
            {
              question: 'What is the strongest consistency model achievable while remaining available under partition?',
              answerOutline:
                'Causal consistency (respecting happens-before); linearizability and sequential consistency require coordination that CAP shows must sacrifice availability under partition.',
            },
            {
              question: 'What exactly does eventual consistency guarantee?',
              answerOutline:
                'Only that if writes stop, all replicas eventually converge to the same value; it says nothing about what intermediate reads return, so conflict resolution is needed.',
            },
            {
              question: 'How does linearizability differ from serializability?',
              answerOutline:
                'Linearizability concerns real-time order of single-object operations; serializability concerns multi-object transactions being equivalent to some serial order. They are orthogonal; strict serializability is both.',
            },
          ],
        },
        {
          slug: 'cap-and-pacelc',
          title: 'CAP, PACELC and the cost of consistency',
          summary:
            'The theorem everyone cites and misstates: what CAP actually says, why the choice is really latency versus consistency (PACELC), and how to design around it.',
          estimatedMinutes: 90,
          objectives: [
            'State CAP precisely and explain why "pick two of three" is a misleading summary',
            'Explain that CAP forces a choice between consistency and availability only during a partition',
            'Explain PACELC: even without partitions, there is a latency/consistency trade-off',
            'Classify real systems as CP or AP and justify the classification',
          ],
          concepts: [
            'CAP: consistency (linearizability), availability, partition tolerance',
            'Partitions are not optional, so the real choice is C vs A under partition',
            'CP systems (refuse to serve to stay consistent) vs AP (serve, risk divergence)',
            'PACELC: else (no partition) trade latency vs consistency',
            'Why strong consistency costs a round-trip to a quorum',
            'Tunable consistency (quorum reads/writes)',
            'Misconceptions and the "pick two" fallacy',
          ],
          explanation: `**CAP** is the most-cited and most-misunderstood result in the subject, so it is worth stating precisely. It considers three properties: **Consistency** (specifically linearizability), **Availability** (every request to a non-failed node gets a response), and **Partition tolerance** (the system keeps working despite the network dropping messages between nodes). The theorem (Gilbert and Lynch's formalisation of Brewer's conjecture) says you cannot have all three **simultaneously**. The popular summary "pick two of three" is misleading, because **partitions are not something you can choose to avoid**: on any real network, partitions will happen, so P is not optional. The real content of CAP is therefore a forced choice **during a partition**: either keep answering and risk returning inconsistent (divergent) data (**AP**), or refuse to answer on the minority side to preserve consistency (**CP**). A system is "CA" only in the fiction of a network that never partitions.

The deeper and more practically useful refinement is **PACELC** (Abadi): **if** there is a **P**artition, choose **A**vailability or **C**onsistency; **e**lse (in normal operation) choose **L**atency or **C**onsistency. This captures what CAP omits, that strong consistency has a cost **even when the network is healthy**: a linearizable operation must coordinate with a **quorum**, which is at least one round-trip to a majority of (possibly distant) nodes, so strong consistency is inherently slower than letting a local replica answer immediately. Many design decisions that look like "CAP choices" are really PACELC latency choices in disguise.

Real systems map onto this clearly. A Raft/Paxos-backed store (etcd, ZooKeeper, Spanner) is **CP**/consistency-favouring: under partition the minority refuses writes, and even in health it pays the quorum round-trip. Dynamo-style stores (Cassandra, Riak in their default modes) are **AP**/latency-favouring: they answer from local replicas and reconcile later. Many stores expose **tunable consistency**, letting you set the read quorum $R$ and write quorum $W$ against $N$ replicas, with $R + W > N$ giving strong (quorum-overlap) reads and smaller values giving faster, weaker ones, so you can move along the spectrum per operation. The engineering skill is to decide, per piece of data, whether a stale answer or an unavailable one is worse, and to design accordingly rather than reciting "pick two". You will build a tunable-quorum store and measure the trade-off directly.`,
          resources: [
            {
              title: 'CAP Twelve Years Later: How the Rules Have Changed (Brewer)',
              url: 'https://www.infoq.com/articles/cap-twelve-years-later-how-the-rules-have-changed/',
              type: 'article',
              cost: 'free',
              provider: 'Eric Brewer / InfoQ',
              note: 'The author of CAP corrects the common misreadings. Read this before citing CAP.',
              primary: true,
            },
            {
              title: 'Consistency and Availability: the PACELC trade-off (Abadi)',
              url: 'https://www.cs.umd.edu/~abadi/papers/abadi-pacelc.pdf',
              type: 'article',
              cost: 'free',
              provider: 'Daniel Abadi',
            },
            {
              title: 'Brewer\'s Conjecture and the Feasibility of CAP (Gilbert & Lynch)',
              url: 'https://users.ece.cmu.edu/~adrian/731-sp04/readings/GL-cap.pdf',
              type: 'article',
              cost: 'free',
              provider: 'MIT (Gilbert & Lynch)',
              note: 'The formal proof of CAP.',
            },
            {
              title: 'Please stop calling databases CP or AP (Kleppmann)',
              url: 'https://martin.kleppmann.com/2015/05/11/please-stop-calling-databases-cp-or-ap.html',
              type: 'article',
              cost: 'free',
              provider: 'Martin Kleppmann',
            },
          ],
          exercises: [
            {
              slug: 'cap-partition-demo',
              title: 'Force the CAP choice',
              prompt:
                'Build a two-replica register and partition the replicas. Implement two policies: CP (minority refuses reads and writes) and AP (both sides serve and later reconcile with last-write-wins or version vectors). Drive writes to both sides during the partition, then heal it. Document for each policy what clients experienced during the partition and the state after healing, and state which property each sacrificed.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'tunable-quorum',
              title: 'Tunable quorum consistency',
              prompt:
                'Implement an N=3 replicated store with configurable read quorum R and write quorum W. Empirically show that R+W>N gives you reads that always see the latest acknowledged write, while R=W=1 can return stale data. Measure the latency of each configuration with one replica made slow (simulating a distant node) and relate the result to PACELC\'s else-latency-or-consistency.',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'classify-cp-ap',
              title: 'Classify real systems',
              prompt:
                'For five real datastores (etcd, ZooKeeper, Cassandra, DynamoDB, Spanner), classify each under PACELC (its partition behaviour and its else behaviour) and justify with reference to its replication/consensus mechanism. Correct one common "CAP misconception" you find stated about one of them.',
              kind: 'writing',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why is "pick two of three" a misleading statement of CAP?',
              answerOutline:
                'Partitions are unavoidable on real networks, so P cannot be given up; CAP really forces a choice between consistency and availability only while a partition is occurring.',
            },
            {
              question: 'What does PACELC add to CAP?',
              answerOutline:
                'Even with no partition (else), there is a trade-off between latency and consistency, because strong consistency requires a quorum round-trip; CAP ignores the healthy-network cost.',
            },
            {
              question: 'What does a CP system do during a partition, and what does an AP system do?',
              answerOutline:
                'CP: the minority side refuses to serve (or only reads) to avoid divergence. AP: all sides keep serving from local replicas and reconcile conflicts after the partition heals.',
            },
            {
              question: 'In a quorum store with N replicas, what condition makes reads see the latest acknowledged write?',
              answerOutline:
                'R + W > N, so the read quorum and write quorum overlap in at least one replica that has the latest write.',
            },
          ],
        },
        {
          slug: 'distributed-transactions',
          title: 'Distributed transactions and two-phase commit',
          summary:
            'Making a change atomically across multiple machines: atomic commit, two-phase commit and its blocking problem, and how modern systems combine 2PC with consensus.',
          estimatedMinutes: 100,
          objectives: [
            'Explain the atomic commit problem and how it differs from consensus',
            'Explain two-phase commit (2PC): the prepare and commit phases and the coordinator role',
            'Explain 2PC\'s blocking failure mode and why the coordinator is a single point of failure',
            'Explain how systems make 2PC fault-tolerant by replicating the coordinator with consensus',
          ],
          concepts: [
            'Atomic commit: all-or-nothing across participants',
            'Two-phase commit: voting (prepare) and decision (commit/abort)',
            'Coordinator and participants; prepared state',
            'Blocking: coordinator failure after prepare leaves participants stuck',
            'Three-phase commit and its (limited) help',
            'Combining 2PC with Paxos/Raft (replicated coordinator)',
            'Sagas as an alternative for long-running workflows',
          ],
          explanation: `A **distributed transaction** must update data on several machines **atomically**: either all participants apply the change or none do, even though any of them, or the network, can fail mid-way. This **atomic commit** problem is related to but distinct from consensus: consensus chooses *some* value, while atomic commit must commit **only if every participant can**, so a single "no" vote (or failure) forces an abort. The classic solution is **two-phase commit**.

**2PC** has a **coordinator** and the **participants**. **Phase 1 (prepare/vote)**: the coordinator asks each participant "can you commit?"; a participant that votes **yes** moves to a **prepared** state in which it has durably written the changes and promises it can either commit or abort on command, giving up its right to decide unilaterally. **Phase 2 (commit/abort)**: if all voted yes, the coordinator records "commit" durably and tells everyone to commit; if any voted no (or timed out), it tells everyone to abort. The prepared state is the crux: once a participant is prepared, it must await the coordinator's decision and cannot act on its own.

That is also 2PC's fatal weakness: it **blocks**. If the coordinator crashes after participants have prepared but before they learn the decision, those participants are **stuck**, holding locks, unable to commit or abort, until the coordinator recovers, because only the coordinator knows whether everyone voted yes. The coordinator is thus a **single point of failure**, and a crashed coordinator can freeze part of the system indefinitely. **Three-phase commit** adds a round to make the protocol non-blocking under some assumptions, but it is rarely used because it assumes synchrony and still fails under partition.

The modern, robust answer is to **remove the single point of failure by replicating the coordinator with consensus**: run the coordinator (and its decision log) as a Paxos/Raft replicated state machine, so the "commit" decision survives any single failure and a new coordinator can always recover the outcome. This is exactly how **Spanner** and other systems combine 2PC **across** shards for atomicity with Paxos **within** each shard for fault tolerance, which you will see in the Spanner lesson. For long-running, loosely-coupled workflows where holding locks is unacceptable, the alternative is a **saga**: a sequence of local transactions each with a compensating action, trading atomicity for availability. You will implement 2PC, reproduce the blocking failure, and then make it fault-tolerant.`,
          resources: [
            {
              title: 'MIT 6.5840 — distributed transactions and two-phase commit notes',
              url: 'https://pdos.csail.mit.edu/6.824/notes/l-2pc.txt',
              type: 'lecture',
              cost: 'free',
              provider: 'MIT',
              note: 'The 2PC protocol, its blocking behaviour, and the connection to consensus.',
              primary: true,
            },
            {
              title: 'The Morning Paper / Paper Trail — consensus protocols: two-phase commit',
              url: 'https://www.the-paper-trail.org/post/2008-11-27-consensus-protocols-two-phase-commit/',
              type: 'article',
              cost: 'free',
              provider: 'Paper Trail',
            },
            {
              title: 'Two-phase commit protocol (overview)',
              url: 'https://en.wikipedia.org/wiki/Two-phase_commit_protocol',
              type: 'article',
              cost: 'free',
            },
            {
              title: 'Sagas (Garcia-Molina & Salem, 1987)',
              url: 'https://www.cs.cornell.edu/andru/cs711/2002fa/reading/sagas.pdf',
              type: 'article',
              cost: 'free',
              provider: 'Cornell',
              note: 'The alternative to 2PC for long-lived transactions.',
            },
          ],
          exercises: [
            {
              slug: 'implement-2pc',
              title: 'Implement two-phase commit',
              prompt:
                'Implement a coordinator and three participants performing 2PC over a transfer that debits one account and credits another on different nodes. Test: all-yes commit; one participant votes no (global abort); a participant crash before voting. Verify atomicity (either all or none applied) in each case and log the prepared state transitions.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'reproduce-blocking',
              title: 'Reproduce and analyse blocking',
              prompt:
                'Extend your 2PC so the coordinator crashes after all participants have prepared but before sending the decision. Show that the participants are stuck in the prepared state, holding locks, unable to proceed. Measure how long other transactions touching those keys are blocked. Then explain precisely why the participants cannot safely decide on their own.',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'fault-tolerant-coordinator',
              title: 'Make the coordinator fault-tolerant',
              prompt:
                'Replace the single coordinator with a decision log replicated by your Raft implementation (or a simplified replicated log), so the commit/abort decision survives a coordinator crash and a new coordinator recovers it. Repeat the crash test from the previous exercise and show participants now unblock after failover. Discuss what this costs in latency and why it combines 2PC-across-shards with consensus-within-shard.',
              kind: 'coding',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'How does atomic commit differ from consensus?',
              answerOutline:
                'Consensus picks some proposed value; atomic commit must commit only if every participant votes yes, so any single no or failure forces abort. The decision is constrained by all participants, not free.',
            },
            {
              question: 'What does a participant promise when it enters the prepared state in 2PC?',
              answerOutline:
                'It has durably recorded the changes and gives up the right to decide unilaterally; it will commit or abort as the coordinator later instructs and must wait for that instruction.',
            },
            {
              question: 'Why does 2PC block, and what is the single point of failure?',
              answerOutline:
                'If the coordinator crashes after participants prepare but before delivering the decision, prepared participants are stuck (they cannot know the outcome). The coordinator is the single point of failure.',
            },
            {
              question: 'How do modern systems make 2PC fault-tolerant?',
              answerOutline:
                'They replicate the coordinator and its decision log with Paxos/Raft so the outcome survives a crash and a new coordinator can recover it; 2PC gives cross-shard atomicity, consensus gives per-shard durability.',
            },
          ],
        },
        {
          slug: 'isolation-and-serializability',
          title: 'Isolation, serializability and anomalies',
          summary:
            'Concurrency correctness for transactions: serializability as the gold standard, the weaker isolation levels and their anomalies, and snapshot isolation.',
          estimatedMinutes: 100,
          objectives: [
            'Define serializability and strict serializability and why they are the ideal',
            'Describe the standard isolation levels and the anomalies each permits',
            'Explain snapshot isolation and the write-skew anomaly it allows',
            'Reason about isolation choices and detect anomalies in a running system',
          ],
          concepts: [
            'Serializability: equivalent to some serial order',
            'Strict serializability = serializable + linearizable (real-time)',
            'Isolation levels: read uncommitted, read committed, repeatable read, serializable',
            'Anomalies: dirty read, non-repeatable read, phantom, lost update, write skew',
            'Snapshot isolation (MVCC) and write skew',
            'Serializable snapshot isolation (SSI)',
            'Choosing isolation; the cost of serializability',
          ],
          explanation: `Transactions let a program treat a group of operations as one unit, and **isolation** defines how concurrent transactions may interfere. The gold standard is **serializability**: the result of executing transactions concurrently must equal the result of executing them one at a time in **some** serial order. It frees the programmer from reasoning about concurrency entirely, which is why it is the ideal, but enforcing it (via locking or validation) costs throughput, so the SQL standard defined **weaker isolation levels** that permit specific **anomalies** in exchange for performance, and understanding exactly which anomaly each level allows is the practical skill.

The anomalies, from worst to subtlest: a **dirty read** sees another transaction's uncommitted write (which may roll back); a **non-repeatable read** sees a value change between two reads in the same transaction because another transaction committed in between; a **phantom** read sees a new row appear in a repeated range query; a **lost update** occurs when two transactions read-modify-write the same value and one overwrites the other; and **write skew** is the subtle one where two transactions each read an overlapping set, make disjoint writes based on what they read, and together violate an invariant that neither violated alone (the classic "both on-call doctors sign off simultaneously, leaving no one on call"). The standard levels map to which of these they forbid: **read uncommitted** allows dirty reads; **read committed** forbids dirty reads but allows non-repeatable reads; **repeatable read** forbids those but historically allows phantoms; **serializable** forbids all.

A crucial real-world case is **snapshot isolation**, implemented by **multi-version concurrency control** (MVCC): each transaction reads from a consistent **snapshot** taken at its start and writes are checked for conflicts at commit. SI is attractive because reads never block writes and vice versa, and it prevents most anomalies, but it famously **permits write skew**, because two transactions reading the same snapshot can each commit disjoint writes that jointly break an invariant. Many databases call SI "repeatable read" or even loosely "serializable", so you must know that SI is **not** serializable. **Serializable snapshot isolation** (SSI, as in PostgreSQL's SERIALIZABLE) adds conflict detection to SI to catch write skew and provide true serializability at modest cost.

**Strict serializability** combines serializability (transaction order) with linearizability (real-time order) and is what a system like Spanner provides. The engineering decision is to pick the weakest isolation whose permitted anomalies your application can tolerate, and to know which anomalies you are exposed to. You will reproduce each anomaly against a real database and demonstrate write skew under snapshot isolation. The Databases subject covers single-node concurrency control; here the emphasis is the anomalies and the distributed cost.`,
          resources: [
            {
              title: 'Jepsen — consistency models: serializability, snapshot isolation and anomalies',
              url: 'https://jepsen.io/consistency/models/snapshot-isolation',
              type: 'documentation',
              cost: 'free',
              provider: 'Jepsen',
              note: 'Precise definitions of the isolation levels and the anomalies, with the SI/serializability distinction.',
              primary: true,
            },
            {
              title: 'A Critique of ANSI SQL Isolation Levels (Berenson et al.)',
              url: 'https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/tr-95-51.pdf',
              type: 'article',
              cost: 'free',
              provider: 'Microsoft Research',
              note: 'The paper that clarified the anomalies and introduced snapshot isolation precisely.',
            },
            {
              title: 'Linearizability versus serializability (Bailis)',
              url: 'https://www.bailis.org/blog/linearizability-versus-serializability/',
              type: 'article',
              cost: 'free',
              provider: 'Peter Bailis',
            },
            {
              title: 'Highly Available Transactions: Virtues and Limitations (Bailis et al.)',
              url: 'https://www.bailis.org/papers/hat-vldb2014.pdf',
              type: 'article',
              cost: 'free',
              provider: 'VLDB',
              note: 'Which isolation guarantees are achievable while staying highly available.',
            },
          ],
          exercises: [
            {
              slug: 'reproduce-anomalies',
              title: 'Reproduce isolation anomalies',
              prompt:
                'Using PostgreSQL (or any MVCC database), set each isolation level in turn and write two concurrent transactions that reproduce a dirty read (where permitted), a non-repeatable read, a lost update, and a phantom, confirming at which levels each is prevented. Provide the exact SQL and interleaving for each and a table of which anomaly appears at which level.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'write-skew',
              title: 'Demonstrate write skew under SI',
              prompt:
                'Under snapshot isolation (e.g. PostgreSQL REPEATABLE READ), implement the on-call doctors invariant ("at least one doctor on call") and run two transactions that each read two doctors on call and each take one off, committing both and violating the invariant. Show it happens under SI and is prevented under SERIALIZABLE (SSI). Explain why SI cannot catch this without added conflict detection.',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'choose-isolation',
              title: 'Choose isolation for a workload',
              prompt:
                'For three workloads (a shopping cart, a seat-booking system, an analytics dashboard), choose an isolation level, justify it by the anomalies the workload can and cannot tolerate, and state the performance implication. For the seat booking, explain specifically why write skew matters and what level or technique you would use.',
              kind: 'writing',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What does serializability guarantee, and what does strict serializability add?',
              answerOutline:
                'Serializability: the outcome equals some serial order of the transactions. Strict serializability adds that the order respects real time (linearizability), so a transaction sees all earlier-completed transactions.',
            },
            {
              question: 'Why is snapshot isolation not serializable?',
              answerOutline:
                'It permits write skew: two transactions reading the same snapshot can make disjoint writes that jointly violate an invariant, which no serial order would allow.',
            },
            {
              question: 'Which anomaly distinguishes read committed from repeatable read?',
              answerOutline:
                'Non-repeatable reads: read committed allows a value to change between two reads in a transaction; repeatable read forbids it.',
            },
            {
              question: 'How does serializable snapshot isolation (SSI) achieve true serializability?',
              answerOutline:
                'It runs SI (MVCC snapshots) but detects read/write dependency conflicts (that could cause write skew) at commit and aborts one of the conflicting transactions.',
            },
          ],
        },
      ],
    },
    {
      slug: 'storage-and-data-processing',
      title: 'Storage and Data Processing',
      description:
        'How the landmark systems store and process data at scale: GFS and distributed file systems, MapReduce and batch processing, Dynamo and eventual consistency, and Spanner\'s globally consistent database.',
      lessons: [
        {
          slug: 'gfs-and-distributed-storage',
          title: 'GFS and distributed storage',
          summary:
            'The design that defined big-data storage: a single master, huge chunks, replication for fault tolerance, and the deliberate relaxation of consistency for throughput.',
          estimatedMinutes: 100,
          objectives: [
            'Explain the GFS architecture: master, chunkservers, large chunks and metadata in memory',
            'Explain how GFS replicates chunks and handles failures and recovery',
            'Explain GFS\'s relaxed consistency model and why it suited its workload',
            'Relate GFS to its successors (HDFS, Colossus) and the single-master trade-off',
          ],
          concepts: [
            'Single master (metadata) + chunkservers (data)',
            'Large (64 MB) chunks; why big chunks',
            'Replication (3x) across racks; re-replication on failure',
            'Primary chunkserver and lease; mutation order',
            'Relaxed consistency: defined/consistent/inconsistent regions; record append',
            'Workload assumptions: large files, append-heavy, high throughput',
            'Successors: HDFS, Colossus; scaling the master',
          ],
          explanation: `**GFS** (Google File System, 2003) is the canonical example of designing storage around a specific workload and accepting unusual trade-offs for it. Google needed to store enormous files (web crawls, logs), written mostly by **appending**, read mostly **sequentially** and in bulk, on thousands of cheap machines where **failure is the norm, not the exception**. Every design choice follows from those assumptions.

The architecture is a **single master** plus many **chunkservers**. Files are split into fixed **64 MB chunks** (huge, to amortise metadata and favour the large sequential workload), and each chunk is stored as plain Linux files on three chunkservers, usually spread across racks for fault tolerance. The **master** holds all **metadata** (the namespace, the file-to-chunk mapping, chunk locations) **in memory** for speed, which is feasible precisely because chunks are so large that metadata is small; it does not touch the data path. Clients ask the master which chunkservers hold a chunk, then read and write **directly** to chunkservers, so the master is not a throughput bottleneck. Fault tolerance is by **re-replication**: the master monitors chunkservers via heartbeats and, when one fails or a chunk falls below its replication target, copies chunks elsewhere; the master itself is made durable with an operation log and checkpoints (and a shadow master).

The most instructive choice is GFS's **relaxed consistency**. Rather than guaranteeing that all replicas are byte-identical, GFS defines regions as **consistent** (all replicas equal), **defined** (consistent and reflecting a mutation in its entirety), or **inconsistent**, and it exposes an atomic **record append** that appends a record **at least once** at an offset GFS chooses, allowing duplicates and padding. This horrifies a database person, but it exactly matched Google's applications, which were written to tolerate duplicates (via record checksums and IDs) in exchange for a simple, high-throughput concurrent-append primitive. The lesson is that **consistency is a workload decision**: GFS bought throughput and simplicity by pushing reconciliation into applications that could afford it.

The single master is the obvious scaling limit, and the successors addressed it: **HDFS** copied GFS almost exactly for the open-source world, and Google's **Colossus** replaced the single master with a distributed metadata layer. Read the GFS paper with the MIT notes and answer the reading questions; it is one of the most influential systems papers ever written.`,
          resources: [
            {
              title: 'The Google File System (Ghemawat, Gobioff, Leung, 2003)',
              url: 'https://pdos.csail.mit.edu/6.824/papers/gfs.pdf',
              type: 'article',
              cost: 'free',
              provider: 'Google / MIT 6.5840',
              note: 'A foundational paper. Focus on the architecture, consistency model and record append.',
              primary: true,
            },
            {
              title: 'MIT 6.5840 — GFS lecture notes',
              url: 'https://pdos.csail.mit.edu/6.824/notes/l-gfs.txt',
              type: 'lecture',
              cost: 'free',
              provider: 'MIT',
            },
            {
              title: 'HDFS Architecture',
              url: 'https://hadoop.apache.org/docs/stable/hadoop-project-dist/hadoop-hdfs/HdfsDesign.html',
              type: 'documentation',
              cost: 'free',
              provider: 'Apache Hadoop',
              note: 'The open-source descendant of GFS; compare its design decisions.',
            },
          ],
          exercises: [
            {
              slug: 'gfs-reading',
              title: 'Answer the GFS reading questions',
              prompt:
                'Answer the MIT 6.5840 GFS reading question and additionally: why 64 MB chunks; why keep metadata in memory and what limits that; how a client write that spans a chunk boundary is handled; what exactly "record append at least once" guarantees and what it does not; and how applications cope with the duplicates GFS may produce. Cite sections of the paper.',
              kind: 'reading',
              difficulty: 2,
            },
            {
              slug: 'replication-simulation',
              title: 'Simulate chunk replication and recovery',
              prompt:
                'Simulate a GFS-like cluster: a master tracking chunk-to-server mappings and chunkservers holding 3 replicas each. Implement heartbeats, detect a chunkserver failure, and have the master re-replicate under-replicated chunks to restore 3x. Measure the time to restore full replication after losing one and then two servers simultaneously, and the extra network traffic. Discuss the risk window during which a chunk is under-replicated.',
              kind: 'simulation',
              difficulty: 2,
            },
            {
              slug: 'consistency-tradeoff-writeup',
              title: 'Critique the relaxed consistency',
              prompt:
                'Write a two-page analysis of GFS\'s consistency model: define consistent/defined/inconsistent regions, explain exactly how concurrent writes and record appends can leave regions in each state, and argue why this was the right trade-off for Google\'s workload but would be unacceptable for, say, a bank. Propose what a stronger-consistency design would have cost.',
              kind: 'writing',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does GFS use very large (64 MB) chunks and keep all metadata in memory?',
              answerOutline:
                'Large chunks suit the large-sequential, append-heavy workload and shrink metadata enough that the master can hold it in memory for fast lookups; it also reduces client-master interaction.',
            },
            {
              question: 'Why is the GFS master not a throughput bottleneck despite being a single node?',
              answerOutline:
                'It serves only metadata; clients fetch chunk locations from it once, then read/write data directly to chunkservers, keeping the master off the data path.',
            },
            {
              question: 'What does GFS\'s record-append guarantee, and why did Google accept it?',
              answerOutline:
                'An atomic append at least once at a GFS-chosen offset, possibly with duplicates/padding; applications tolerate duplicates via IDs/checksums in exchange for a simple high-throughput concurrent-append primitive.',
            },
            {
              question: 'What is the main scaling limitation of GFS and how did successors address it?',
              answerOutline:
                'The single master\'s memory and request capacity; Colossus replaced it with a distributed metadata service, and HDFS federated namenodes.',
            },
          ],
          relatedLessons: ['operating-systems/beyond-the-kernel/distributed-file-systems'],
        },
        {
          slug: 'mapreduce-and-batch-processing',
          title: 'MapReduce and batch processing',
          summary:
            'The programming model that made large-scale data processing routine: map and reduce, how the framework handles distribution and failures, and its evolution into Spark.',
          estimatedMinutes: 100,
          objectives: [
            'Explain the MapReduce programming model and express a computation in it',
            'Explain how the framework parallelises, schedules and recovers from worker failures',
            'Explain data locality, stragglers and backup tasks',
            'Explain how Spark\'s RDDs and lineage improve on MapReduce for iterative jobs',
          ],
          concepts: [
            'Map and reduce functions; key grouping; shuffle',
            'Master assigns map/reduce tasks; M map and R reduce tasks',
            'Fault tolerance by re-execution (deterministic tasks)',
            'Data locality; moving computation to data',
            'Stragglers and backup (speculative) tasks',
            'Limitations: materialising to disk, iterative jobs',
            'Spark RDDs, lineage, in-memory; Dataflow/streaming successors',
          ],
          explanation: `**MapReduce** (Dean and Ghemawat, 2004) made large-scale data processing accessible by hiding distribution behind two functions the programmer writes. **Map** takes an input record and emits intermediate key-value pairs; the framework **groups** all values by key (the **shuffle**); **Reduce** takes a key and its list of values and emits the result. Word count is the canonical example: map emits (word, 1) per word, reduce sums the counts per word. The power is that this tiny model expresses a huge range of batch computations, and the programmer writes **no distribution code at all**.

The framework does the hard part. A **master** splits the input into M pieces and assigns **map** tasks to workers, preferring workers that already hold the input data (**data locality**, "move computation to the data", since GFS stores it nearby and bandwidth is scarce). Map outputs are partitioned into R pieces by a hash of the key; **reduce** workers fetch their partition from every map worker (the shuffle, the expensive all-to-all step) and produce R output files. **Fault tolerance** is beautifully simple and rests on **determinism**: because map and reduce tasks are deterministic and side-effect-free, a failed task is just **re-executed** on another worker, and the master reassigns it; no complex recovery is needed. A subtle but important optimisation addresses **stragglers**, the few slow tasks (bad disk, contention) that would otherwise delay the whole job: near the end, the master launches **backup (speculative) copies** of the remaining tasks and takes whichever finishes first, dramatically cutting tail completion time.

MapReduce's limitation is that it **materialises** intermediate data to disk (GFS) between every map and reduce, which is fine for one pass but crippling for **iterative** algorithms (machine learning, graph processing) that would read and write disk every iteration. **Spark** addressed this with **resilient distributed datasets** (RDDs): datasets kept **in memory** across operations, with fault tolerance provided not by replication but by **lineage**, the record of how an RDD was computed from its inputs, so a lost partition is recomputed from its lineage rather than reloaded. This made iterative and interactive jobs orders of magnitude faster and generalised the model. The further evolution is toward **streaming** and unified batch/stream models (the Dataflow model, Flink), but the core ideas, a simple functional model, locality, and fault tolerance by re-execution, come straight from MapReduce. You will write MapReduce jobs on the MIT lab framework and reason about failures and stragglers.`,
          resources: [
            {
              title: 'MapReduce: Simplified Data Processing on Large Clusters (Dean & Ghemawat)',
              url: 'https://pdos.csail.mit.edu/6.824/papers/mapreduce.pdf',
              type: 'article',
              cost: 'free',
              provider: 'Google / MIT 6.5840',
              note: 'The model, the execution, fault tolerance and backup tasks. Read with the MIT lab.',
              primary: true,
            },
            {
              title: 'MIT 6.5840 — MapReduce lab',
              url: 'https://pdos.csail.mit.edu/6.5840/labs/lab-mr.html',
              type: 'problem-set',
              cost: 'free',
              provider: 'MIT',
              note: 'Build a working MapReduce in Go with worker failure handling.',
            },
            {
              title: 'Resilient Distributed Datasets (Spark, NSDI 2012)',
              url: 'https://www.usenix.org/system/files/conference/nsdi12/nsdi12-final138.pdf',
              type: 'article',
              cost: 'free',
              provider: 'USENIX',
              note: 'How RDDs and lineage improve on MapReduce for iterative/in-memory jobs.',
            },
            {
              title: 'Apache Spark — RDD programming guide',
              url: 'https://spark.apache.org/docs/latest/rdd-programming-guide.html',
              type: 'documentation',
              cost: 'free',
              provider: 'Apache Spark',
            },
          ],
          exercises: [
            {
              slug: 'mapreduce-lab',
              title: 'Build MapReduce (MIT lab)',
              prompt:
                'Complete the 6.5840 MapReduce lab: implement the coordinator and worker so that map and reduce tasks are distributed, and the job completes correctly even when workers are killed mid-task. Pass the provided tests including the crash test. Then write word-count and an inverted-index job on top and run them.',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'express-in-mapreduce',
              title: 'Express computations as MapReduce',
              prompt:
                'Express four computations in the map/reduce model, giving the map and reduce functions precisely: word count, a reverse web-link graph, computing the average of a value grouped by key, and a two-way join of two datasets on a key. For the average, explain why a naive reduce is not associative-safe for use as a combiner and how to fix it.',
              kind: 'writing',
              difficulty: 2,
            },
            {
              slug: 'stragglers-and-locality',
              title: 'Model stragglers and backup tasks',
              prompt:
                'Simulate a MapReduce job where task durations are drawn from a distribution with a heavy tail (a few stragglers). Measure total job completion time without and with backup/speculative tasks for the last k% of tasks. Plot the improvement and the extra work done. Then add a data-locality model (local tasks run faster) and show how locality-aware scheduling changes the result.',
              kind: 'simulation',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why is MapReduce fault tolerance so simple?',
              answerOutline:
                'Tasks are deterministic and side-effect-free, so a failed task is simply re-executed elsewhere by the master; no partial-state recovery is needed.',
            },
            {
              question: 'What is the shuffle and why is it the expensive step?',
              answerOutline:
                'The all-to-all transfer of map outputs grouped by key to the reduce workers; it moves large volumes of intermediate data across the network between the map and reduce phases.',
            },
            {
              question: 'What problem do backup (speculative) tasks solve?',
              answerOutline:
                'Stragglers: a few slow tasks delay the whole job; running backup copies of the last tasks and taking the first to finish cuts tail completion time.',
            },
            {
              question: 'How do Spark RDDs improve on MapReduce for iterative jobs, and how is fault tolerance achieved?',
              answerOutline:
                'RDDs keep data in memory across operations instead of materialising to disk each pass; lost partitions are recomputed from recorded lineage rather than replicated.',
            },
          ],
        },
        {
          slug: 'dynamo-and-eventual-consistency',
          title: 'Dynamo and eventual consistency',
          summary:
            'Amazon\'s highly available key-value store: consistent hashing, quorum replication, version vectors and conflict resolution, and the always-writable design philosophy.',
          estimatedMinutes: 100,
          objectives: [
            'Explain Dynamo\'s goal of always-writable, highly available storage and the trade-offs it accepts',
            'Explain consistent hashing and virtual nodes for partitioning and rebalancing',
            'Explain sloppy quorums, hinted handoff and replication across the ring',
            'Explain conflict detection with version vectors and resolution (application merge, CRDTs)',
          ],
          concepts: [
            'Always-writable, highly available (AP) design',
            'Consistent hashing; the ring; virtual nodes',
            'N, R, W quorum parameters; sloppy quorums',
            'Hinted handoff; anti-entropy with Merkle trees',
            'Version vectors; conflict detection; last-write-wins vs app merge',
            'CRDTs for automatic conflict-free merge',
            'Gossip-based membership',
          ],
          explanation: `**Dynamo** (Amazon, 2007) is the archetypal **AP** system and the opposite design philosophy to the consensus-based stores: where Spanner chooses consistency, Dynamo chooses **availability**, specifically it must **always accept writes** (an abandoned shopping cart item is a lost sale) even during failures and partitions, accepting that reads may be stale or conflicting and must be reconciled. Almost every later "NoSQL" store (Cassandra, Riak, Voldemort) descends from it.

**Partitioning** uses **consistent hashing**: nodes and keys are hashed onto a ring, and each key is stored on the node that follows it clockwise. The point of consistent hashing is **minimal reshuffling**: adding or removing a node moves only the keys between it and its neighbour, not the whole dataset, which is essential when nodes come and go constantly. To avoid load imbalance and smooth rebalancing, each physical node owns many **virtual nodes** scattered around the ring. **Replication** stores each key on the next **N** nodes clockwise (the preference list).

**Availability** comes from **quorums with slack**. Reads and writes use configurable **R** and **W** against **N**; with $R + W > N$ you get quorum overlap (as in the CAP lesson), but Dynamo also allows **sloppy quorums**: if some of the top-N nodes are down, the write goes to the next healthy nodes instead, with a **hint** that it belongs elsewhere, and **hinted handoff** delivers it to the right node once it recovers, so writes almost never fail. Background **anti-entropy** using **Merkle trees** efficiently finds and repairs divergent replicas, and **gossip** spreads membership and failure information without a central coordinator.

The price of always-writing is **conflicts**: two clients can write the same key on different sides of a partition. Dynamo attaches **version vectors** to values so that at read time it can tell whether one version descends from another (keep the newer) or they are **concurrent** (a genuine conflict). It then either resolves by **last-write-wins** (simple but can lose data, as you saw with clock skew) or returns all conflicting versions to the **application** to merge, the shopping cart merges by union so no added item is lost. The modern, principled form of this is the **CRDT** (conflict-free replicated data type): data types (counters, sets, maps) with merge functions that are commutative, associative and idempotent, so concurrent updates **always converge** automatically without application logic or coordination. You will build a consistent-hashing ring, a quorum store, and demonstrate conflict detection and CRDT merge.`,
          resources: [
            {
              title: 'Dynamo: Amazon\'s Highly Available Key-value Store (SOSP 2007)',
              url: 'https://www.allthingsdistributed.com/files/amazon-dynamo-sosp2007.pdf',
              type: 'article',
              cost: 'free',
              provider: 'Amazon',
              note: 'The AP design: consistent hashing, sloppy quorums, hinted handoff and version vectors.',
              primary: true,
            },
            {
              title: 'Consistent hashing (overview)',
              url: 'https://en.wikipedia.org/wiki/Consistent_hashing',
              type: 'article',
              cost: 'free',
            },
            {
              title: 'CRDT.tech — conflict-free replicated data types',
              url: 'https://crdt.tech/',
              type: 'documentation',
              cost: 'free',
              note: 'The resources hub for CRDTs, the principled way to merge concurrent updates.',
            },
            {
              title: 'Jepsen — analysis illustrating eventual-consistency pitfalls',
              url: 'https://jepsen.io/analyses',
              type: 'article',
              cost: 'free',
              provider: 'Jepsen',
              note: 'Real analyses of Dynamo-style systems showing where availability designs lose data under partition.',
            },
          ],
          exercises: [
            {
              slug: 'consistent-hashing-ring',
              title: 'Build a consistent-hashing ring',
              prompt:
                'Implement a consistent-hashing ring with virtual nodes. Load 100,000 keys across 10 physical nodes and measure the load distribution; tune the number of virtual nodes to balance it. Then add and remove a node and measure the fraction of keys that move, confirming it is roughly 1/N rather than everything, and explain why virtual nodes improve balance and rebalancing smoothness.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'quorum-and-handoff',
              title: 'Quorum store with hinted handoff',
              prompt:
                'Implement an N=3 replicated store on your ring with configurable R and W and sloppy quorums. Take a replica down, show writes still succeed via hinted handoff to another node, then bring it back and show the hint is delivered. Demonstrate with R+W>N that reads see the latest write and with smaller quorums that they may not. Verify data is not lost across the handoff.',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'conflicts-and-crdt',
              title: 'Conflict detection and CRDT merge',
              prompt:
                'Attach version vectors to values and, with two replicas partitioned, create a concurrent write to one key. Show your store detects the conflict (neither version dominates). Resolve it two ways: last-write-wins (and show it can lose an update) and an application merge. Then implement a grow-only set and a PN-counter CRDT and show that concurrent updates merge automatically and converge regardless of order.',
              kind: 'coding',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'What is Dynamo\'s central design priority and what does it trade away?',
              answerOutline:
                'Always-writable high availability (AP); it trades away strong consistency, accepting stale reads and write conflicts that must be reconciled.',
            },
            {
              question: 'Why does consistent hashing use virtual nodes?',
              answerOutline:
                'To balance load across heterogeneous nodes and to spread the keys a joining/leaving node gains or sheds across many ring positions, smoothing rebalancing.',
            },
            {
              question: 'What are sloppy quorums and hinted handoff?',
              answerOutline:
                'When preferred replicas are down, writes go to other healthy nodes with a hint; hinted handoff later delivers the data to the intended node when it recovers, keeping writes available.',
            },
            {
              question: 'How do CRDTs avoid the need for conflict resolution logic?',
              answerOutline:
                'Their merge operation is commutative, associative and idempotent, so concurrent updates converge to the same value regardless of order or duplication, with no coordination.',
            },
          ],
        },
        {
          slug: 'spanner-and-global-databases',
          title: 'Spanner and globally consistent databases',
          summary:
            'Google\'s globally distributed database that provides external consistency: TrueTime, how bounded clock uncertainty enables linearizable transactions across continents, and the NewSQL movement.',
          estimatedMinutes: 100,
          objectives: [
            'Explain Spanner\'s architecture: sharded, Paxos-replicated data with distributed transactions',
            'Explain TrueTime and how a bounded clock-uncertainty interval enables external consistency',
            'Explain the commit-wait technique and why it provides strict serializability globally',
            'Relate Spanner to the NewSQL movement (CockroachDB, etc.) and the cost it accepts',
          ],
          concepts: [
            'Sharded data; each shard a Paxos group',
            '2PC across shards for multi-shard transactions',
            'TrueTime: time as an interval [earliest, latest] with bounded uncertainty',
            'Commit-wait: wait out the uncertainty to guarantee timestamp order',
            'External consistency (strict serializability) globally',
            'The latency cost of commit-wait and quorum coordination',
            'NewSQL: CockroachDB, YugabyteDB; clock sources (GPS/atomic vs NTP)',
          ],
          explanation: `**Spanner** (Google, 2012) is the system that seemed to defy CAP folklore: a **globally distributed**, SQL, strongly-consistent database spanning continents. It does not break CAP (under partition it remains CP, the minority becomes unavailable), but it achieves something remarkable, **external consistency** (strict serializability) across the planet, by solving the time problem you met earlier in a clever way.

The architecture combines the pieces from this whole subject. Data is **sharded**, and each shard is replicated by its own **Paxos** group across data centres for fault tolerance (consensus within a shard). A transaction touching multiple shards uses **two-phase commit across the Paxos leaders** (atomic commit across shards), with the 2PC coordinator itself Paxos-replicated so it cannot be a single point of failure, exactly the "combine 2PC with consensus" pattern from the transactions lesson. So far this is standard; the innovation is time.

To make transactions **linearizable in real time globally**, you must assign commit timestamps such that if transaction T1 commits before T2 starts (in real time), T1's timestamp is smaller. But as the clocks lesson showed, you cannot trust wall clocks to that precision. Spanner's answer is **TrueTime**: an API that returns not a single time but an **interval** [earliest, latest] guaranteed to contain the true time, with the uncertainty bounded (a few milliseconds) because Google equips data centres with **GPS and atomic clocks** and TrueTime reports honest error bars. Spanner then uses **commit-wait**: after choosing a commit timestamp $s$, a transaction **waits until TrueTime guarantees $s$ is in the past** (until \`now.earliest > s\`) before releasing locks and acknowledging. This deliberate wait, typically a few milliseconds, guarantees that any transaction that starts later gets a strictly larger timestamp, so timestamp order equals real-time order: external consistency. The subject's recurring theme appears one last time: Spanner turns the **invisible hazard of clock skew into an explicit, bounded, paid-for delay**.

The cost is real: commit-wait adds latency, and every transaction pays the Paxos quorum round-trip, so Spanner is a PACELC "PC/EC" system, choosing consistency in both the partition and the else case, and accepting the latency. Spanner launched the **NewSQL** movement, systems like **CockroachDB** and YugabyteDB that provide distributed SQL with serializable transactions, typically using tighter NTP bounds or hybrid logical clocks instead of atomic clocks (and accepting the different trade-offs that implies). Read the Spanner paper and CockroachDB's "living without atomic clocks" to see the same idea realised with cheaper hardware.`,
          resources: [
            {
              title: 'Spanner: Google\'s Globally-Distributed Database (OSDI 2012)',
              url: 'https://pdos.csail.mit.edu/6.824/papers/spanner.pdf',
              type: 'article',
              cost: 'free',
              provider: 'Google / MIT 6.5840',
              note: 'TrueTime, commit-wait and external consistency. Read with the MIT Spanner notes.',
              primary: true,
            },
            {
              title: 'MIT 6.5840 — Spanner lecture notes',
              url: 'https://pdos.csail.mit.edu/6.824/notes/l-spanner.txt',
              type: 'lecture',
              cost: 'free',
              provider: 'MIT',
            },
            {
              title: 'CockroachDB — Living without atomic clocks',
              url: 'https://www.cockroachlabs.com/blog/living-without-atomic-clocks/',
              type: 'article',
              cost: 'free',
              provider: 'Cockroach Labs',
              note: 'How a NewSQL system achieves serializability without Google\'s TrueTime hardware.',
            },
            {
              title: 'CockroachDB architecture — transaction layer',
              url: 'https://www.cockroachlabs.com/docs/stable/architecture/transaction-layer',
              type: 'documentation',
              cost: 'free',
              provider: 'Cockroach Labs',
            },
          ],
          exercises: [
            {
              slug: 'spanner-reading',
              title: 'Answer the Spanner reading questions',
              prompt:
                'Answer the MIT 6.5840 Spanner reading question and additionally: what exactly external consistency means; why commit-wait is necessary and how long a transaction waits as a function of TrueTime\'s uncertainty; how read-only transactions avoid locks using timestamps; and why a larger clock uncertainty directly increases transaction latency. Cite the paper.',
              kind: 'reading',
              difficulty: 2,
            },
            {
              slug: 'commit-wait-sim',
              title: 'Simulate TrueTime and commit-wait',
              prompt:
                'Simulate TrueTime as an interval [t-e, t+e] around true time with uncertainty e. Implement commit-wait: a transaction picks a commit timestamp and waits until now.earliest exceeds it before committing. Run concurrent transactions and verify that timestamp order always matches real-time commit order (external consistency). Then vary e and plot the added latency, demonstrating why tighter clocks are worth the hardware.',
              kind: 'simulation',
              difficulty: 3,
            },
            {
              slug: 'newsql-comparison',
              title: 'Compare Spanner and CockroachDB',
              prompt:
                'Write a two-page comparison of how Spanner and CockroachDB each achieve serializable distributed transactions: clock source (GPS/atomic vs NTP/hybrid logical clocks), how each bounds or avoids clock uncertainty, the consistency guarantee each provides, and the latency cost each pays. Conclude with which you would choose for a globally distributed application and why.',
              kind: 'writing',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'How does Spanner combine the subject\'s building blocks?',
              answerOutline:
                'Sharded data with per-shard Paxos replication (consensus within shard), 2PC across shards for multi-shard atomicity with a Paxos-replicated coordinator, and TrueTime for globally consistent timestamps.',
            },
            {
              question: 'What is TrueTime and why return an interval rather than a value?',
              answerOutline:
                'An API returning [earliest, latest] guaranteed to contain true time, with bounded uncertainty; the interval makes the clock error explicit so Spanner can reason about and wait out ordering ambiguity.',
            },
            {
              question: 'What does commit-wait achieve and what does it cost?',
              answerOutline:
                'Waiting until the commit timestamp is definitely in the past guarantees later transactions get larger timestamps (external consistency); it costs latency proportional to the clock uncertainty.',
            },
            {
              question: 'Does Spanner violate CAP? Explain.',
              answerOutline:
                'No; under partition it stays consistent and makes the minority unavailable (CP). It provides strong consistency and pays latency (PACELC PC/EC), not all three of CAP simultaneously.',
            },
          ],
        },
      ],
    },
    {
      slug: 'fault-tolerance-and-observability',
      title: 'Fault Tolerance and Observability',
      description:
        'Engineering systems that stay up and stay understood: failure detection and membership, the patterns for resilient communication, observability with metrics, tracing and SLOs, and testing for failure deliberately.',
      lessons: [
        {
          slug: 'failure-detection-and-membership',
          title: 'Failure detection and membership',
          summary:
            'Knowing who is alive: heartbeats and their limits, the phi-accrual detector, and scalable membership with gossip and SWIM.',
          estimatedMinutes: 90,
          objectives: [
            'Explain failure detectors, their completeness/accuracy properties and the inherent trade-off',
            'Explain heartbeating and the phi-accrual adaptive detector',
            'Explain gossip protocols and the SWIM membership algorithm',
            'Reason about detection time, false-positive rate and network cost at scale',
          ],
          concepts: [
            'Failure detector properties: completeness and accuracy',
            'Heartbeats; timeout tuning; the detection/false-positive trade-off',
            'Phi-accrual failure detector (adaptive, probabilistic)',
            'Gossip (epidemic) protocols; dissemination',
            'SWIM: separating failure detection from dissemination',
            'Membership views; incarnation numbers; suspicion',
            'Scalability: O(1) load per node',
          ],
          explanation: `A distributed system must constantly answer "which nodes are alive?", and as FLP warned, it can never do so perfectly in an asynchronous network, so **failure detectors** are characterised by two imperfect properties: **completeness** (every crashed node is eventually suspected) and **accuracy** (live nodes are not wrongly suspected). You cannot have both perfectly, so the engineering is about tuning the trade-off and tolerating the errors (a wrong suspicion costs a leader election or a needless re-replication, not correctness, provided the rest of the system is designed for it).

The basic mechanism is the **heartbeat**: each node periodically pings or is pinged, and a missed heartbeat past a **timeout** triggers suspicion. The timeout is the dial you met in the FLP lesson: too short gives fast detection but many false positives on a slow network; too long gives few false positives but slow detection. A smarter approach is the **phi-accrual** failure detector, which does not output a binary alive/dead but a continuous **suspicion level** phi computed from the statistical distribution of recent heartbeat arrival times, so the application can choose its own threshold and the detector **adapts** to changing network conditions rather than using a fixed timeout. Cassandra and Akka use it.

The second problem is **membership** at scale: in a cluster of thousands, having every node heartbeat every other is O(n²) and does not scale. **Gossip** (epidemic) protocols solve dissemination by having each node periodically exchange state with a few **random** peers; information spreads exponentially, reaching everyone in O(log n) rounds, and the per-node load stays constant regardless of cluster size, which is why gossip underlies membership in Dynamo, Cassandra, Consul and Serf. The influential **SWIM** protocol refines this by **separating failure detection from membership dissemination**: each node periodically **pings a random member** (and, if no ack, asks a few others to ping it indirectly, to avoid false positives from a single lossy path), and it piggybacks membership updates (joins, leaves, suspicions) on those messages, with **incarnation numbers** and a **suspicion** mechanism so a node wrongly declared dead can refute it. SWIM gives constant per-node load, bounded detection time and a low false-positive rate, which is why it (and its Lifeguard extensions) backs modern membership systems. You will implement heartbeat and phi-accrual detection and a small gossip/SWIM membership layer and measure the trade-offs at scale.`,
          resources: [
            {
              title: 'SWIM: Scalable Weakly-consistent Infection-style Membership',
              url: 'https://www.cs.cornell.edu/projects/Quicksilver/public_pdfs/SWIM.pdf',
              type: 'article',
              cost: 'free',
              provider: 'Cornell',
              note: 'The membership + failure-detection protocol behind many modern systems.',
              primary: true,
            },
            {
              title: 'HashiCorp Consul — gossip protocol (Serf/SWIM) documentation',
              url: 'https://developer.hashicorp.com/consul/docs/architecture/gossip',
              type: 'documentation',
              cost: 'free',
              provider: 'HashiCorp',
            },
            {
              title: 'Failure detector (overview, including accrual detectors)',
              url: 'https://en.wikipedia.org/wiki/Failure_detector',
              type: 'article',
              cost: 'free',
            },
            {
              title: 'Distributed Systems lecture notes (Kleppmann) — failure detectors',
              url: 'https://www.cl.cam.ac.uk/teaching/2425/ConcDisSys/dist-sys-notes.pdf',
              type: 'textbook',
              cost: 'free',
              provider: 'University of Cambridge',
            },
          ],
          exercises: [
            {
              slug: 'heartbeat-vs-phi',
              title: 'Heartbeat vs phi-accrual',
              prompt:
                'Simulate heartbeats over a link with variable, occasionally spiking latency. Implement a fixed-timeout detector and the phi-accrual detector. For a real crash and for a transient latency spike, compare detection time and false-positive rate across a range of timeout/phi-threshold settings. Plot the trade-off curves and argue when the adaptive detector is worth its complexity.',
              kind: 'simulation',
              difficulty: 2,
            },
            {
              slug: 'implement-swim',
              title: 'Implement SWIM-style membership',
              prompt:
                'Implement a membership layer where each node periodically pings a random peer, uses indirect pings via k others before declaring suspicion, and gossips membership changes with incarnation numbers. Run it with 50 simulated nodes, kill some, and measure detection time, false positives under message loss, and per-node message load as the cluster grows from 10 to 200 nodes. Confirm the per-node load stays roughly constant.',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'gossip-dissemination',
              title: 'Measure gossip dissemination',
              prompt:
                'Implement a simple gossip protocol where each round every node shares a piece of state with f random peers. Measure how many rounds it takes for an update to reach all N nodes for N from 10 to 10,000 and f = 1, 3, 5, and confirm the O(log N) behaviour. Add message loss and show gossip\'s robustness compared with a single broadcast.',
              kind: 'simulation',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What are the completeness and accuracy properties of a failure detector, and why can they not both be perfect?',
              answerOutline:
                'Completeness: every crashed node is eventually suspected. Accuracy: no live node is wrongly suspected. In an asynchronous network you cannot distinguish slow from dead, so perfecting one sacrifices the other.',
            },
            {
              question: 'What does the phi-accrual detector output and why is that useful?',
              answerOutline:
                'A continuous suspicion value derived from the heartbeat arrival distribution, letting the application pick its own threshold and adapting to changing network conditions instead of a fixed timeout.',
            },
            {
              question: 'Why do large clusters use gossip instead of all-to-all heartbeating?',
              answerOutline:
                'All-to-all is O(n²); gossip spreads information to random peers with constant per-node load and O(log n) dissemination time, scaling to thousands of nodes.',
            },
            {
              question: 'How does SWIM reduce false positives from a single lossy path?',
              answerOutline:
                'Before declaring a node dead, it asks k other members to ping the suspected node indirectly, so one bad direct path does not cause a wrong suspicion.',
            },
          ],
        },
        {
          slug: 'resilient-communication-patterns',
          title: 'Timeouts, retries, idempotency and backpressure',
          summary:
            'The operational patterns that keep systems from amplifying failures: sensible timeouts, retries with backoff and jitter, circuit breakers, load shedding and backpressure.',
          estimatedMinutes: 100,
          objectives: [
            'Set timeouts and deadlines correctly and propagate deadlines across calls',
            'Implement retries with exponential backoff and jitter and explain retry storms',
            'Explain circuit breakers, load shedding and backpressure and when to apply each',
            'Explain how these patterns prevent metastable failures and cascading outages',
          ],
          concepts: [
            'Timeouts and deadline propagation',
            'Retries; exponential backoff; jitter; retry amplification/storms',
            'Idempotency as a prerequisite for safe retries',
            'Circuit breakers (closed/open/half-open)',
            'Load shedding; admission control; prioritisation',
            'Backpressure and bounded queues',
            'Metastable failures and cascading outages',
          ],
          explanation: `Most large outages are not caused by the original fault but by the system's **reaction** to it, so a set of defensive patterns, drawn from the AWS Builders' Library and Google SRE practice, is essential and recurs in every production system.

**Timeouts** come first: every remote call must have one, because a call that waits forever ties up a thread or connection and lets one slow dependency exhaust your resources. Better than per-call timeouts are **deadlines** propagated through the call chain (gRPC does this): the client sets "answer by time T" and every downstream call inherits the remaining budget, so work is not wasted computing a result no one is still waiting for. **Retries** handle transient failures but are dangerous: naive immediate retries **amplify** load exactly when a service is struggling, and synchronised retries across many clients cause a **retry storm** (or **thundering herd**) that can keep a recovering service down. The fix is **exponential backoff** (wait 1s, 2s, 4s...) plus **jitter** (randomise the wait) so clients do not retry in lockstep; AWS's analysis shows jitter is essential, not optional. And retries are only safe if the operation is **idempotent** (the RPC lesson), or you will double-execute.

When a dependency is genuinely down, retrying at all is wasteful, so a **circuit breaker** tracks the failure rate and, when it crosses a threshold, **opens**, failing fast without even attempting the call for a cooldown, then goes **half-open** to test recovery before closing again. To protect a service from more load than it can handle, **load shedding** (admission control) rejects excess requests early, ideally prioritising important ones, which keeps the service responsive for some requests rather than collapsing for all. **Backpressure** pushes the signal upstream: bounded queues and flow control tell producers to slow down rather than accumulating unbounded work that will eventually fall over.

Together these prevent the two characteristic distributed failure modes: the **cascading failure**, where one overloaded service's slowness propagates outward as callers pile up, and the **metastable failure**, where a system driven into an overloaded state stays there even after the trigger is removed because the load it now generates (retries, rebuilding caches) sustains the overload. The engineering lesson is that resilience is as much about **failing gracefully and not amplifying** as about not failing. You will implement these patterns and demonstrate a retry storm and its mitigation.`,
          resources: [
            {
              title: 'AWS Builders\' Library — Timeouts, retries, and backoff with jitter',
              url: 'https://aws.amazon.com/builders-library/timeouts-retries-and-backoff-with-jitter/',
              type: 'article',
              cost: 'free',
              provider: 'Amazon',
              note: 'The practical guide to safe retries; read alongside the load-shedding article.',
              primary: true,
            },
            {
              title: 'AWS Builders\' Library — Using load shedding to avoid overload',
              url: 'https://aws.amazon.com/builders-library/using-load-shedding-to-avoid-overload/',
              type: 'article',
              cost: 'free',
              provider: 'Amazon',
            },
            {
              title: 'Martin Fowler — Circuit Breaker',
              url: 'https://martinfowler.com/bliki/CircuitBreaker.html',
              type: 'article',
              cost: 'free',
              provider: 'Martin Fowler',
            },
            {
              title: 'Google SRE Book — Addressing cascading failures',
              url: 'https://sre.google/sre-book/addressing-cascading-failures/',
              type: 'article',
              cost: 'free',
              provider: 'Google',
            },
          ],
          exercises: [
            {
              slug: 'retry-storm-demo',
              title: 'Cause and cure a retry storm',
              prompt:
                'Build a client pool calling a server that becomes briefly overloaded. With naive immediate retries, show that the retries keep the server overloaded after the original trigger is gone (a metastable state). Then add exponential backoff with jitter and a cap, and show recovery. Plot server load over time for both cases and quantify how jitter de-synchronises the clients.',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'circuit-breaker',
              title: 'Implement a circuit breaker',
              prompt:
                'Implement a circuit breaker (closed/open/half-open) around a flaky dependency. Tune the failure threshold and cooldown, and demonstrate that when the dependency is down the breaker opens and the client fails fast instead of piling up timeouts, then recovers via half-open probing. Measure the client\'s tail latency and resource usage with and without the breaker.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'backpressure-queue',
              title: 'Backpressure with bounded queues',
              prompt:
                'Build a producer-consumer pipeline where producers outpace consumers. First use an unbounded queue and show memory growing until failure. Then apply backpressure with a bounded queue that blocks or sheds load, and add admission control that rejects low-priority work first. Show the system stays stable under overload and explain the difference between shedding and queueing.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why must retries use backoff and jitter?',
              answerOutline:
                'Immediate, synchronised retries amplify load on a struggling service (retry storm/thundering herd); exponential backoff reduces rate and jitter de-synchronises clients so they do not retry in lockstep.',
            },
            {
              question: 'What does a circuit breaker do and why is "fail fast" better than retrying a dead dependency?',
              answerOutline:
                'It opens after a failure-rate threshold and rejects calls immediately for a cooldown, avoiding wasted timeouts and resource exhaustion while giving the dependency room to recover.',
            },
            {
              question: 'What is a metastable failure?',
              answerOutline:
                'A system driven into an overloaded state that persists even after the trigger is removed, because the overloaded state itself generates sustaining load (retries, cache rebuilds).',
            },
            {
              question: 'What is backpressure and how does it differ from load shedding?',
              answerOutline:
                'Backpressure signals producers to slow down (bounded queues, flow control); load shedding rejects excess requests outright. Both bound work, one by slowing input, the other by dropping it.',
            },
          ],
        },
        {
          slug: 'observability-metrics-tracing-slos',
          title: 'Observability: metrics, tracing and SLOs',
          summary:
            'Understanding a running distributed system: the three pillars (metrics, logs, traces), distributed tracing, tail latency, and defining reliability with SLIs, SLOs and error budgets.',
          estimatedMinutes: 90,
          objectives: [
            'Distinguish metrics, logs and traces and when each is the right tool',
            'Explain distributed tracing (spans, context propagation) and why it is essential across services',
            'Explain why tail latency (p99) matters and how it compounds across fan-out',
            'Define SLIs, SLOs and error budgets and use them to make reliability decisions',
          ],
          concepts: [
            'The three pillars: metrics, logs, traces',
            'Metrics: counters, gauges, histograms; percentiles not averages',
            'Distributed tracing: spans, trace context propagation (Dapper, OpenTelemetry)',
            'Tail latency; the tail at scale; fan-out amplification',
            'SLI (indicator), SLO (objective), SLA (agreement)',
            'Error budgets and their use in decision-making',
            'Cardinality and cost of observability',
          ],
          explanation: `You cannot operate what you cannot see, and a distributed system is far harder to see than a single process because a single user request fans out across many services. **Observability** rests on three complementary pillars. **Metrics** are cheap numeric time series (request rate, error rate, latency, queue depth) good for dashboards and alerts; the key discipline is to record **histograms and percentiles**, not averages, because an average latency hides the slow requests that matter. **Logs** are detailed event records, good for debugging a specific incident but expensive at volume. **Traces** are the distributed-systems-specific tool: a **trace** follows one request across every service it touches, as a tree of **spans** (one per operation) tied together by a **trace context** propagated through every RPC, so you can see where a slow request actually spent its time. Google's **Dapper** paper introduced this and **OpenTelemetry** is the open standard; without it, debugging a cross-service latency problem is nearly impossible.

**Tail latency** deserves special attention because of Dean and Barroso's "**the tail at scale**" insight: when a request fans out to many servers and must wait for **all** of them, the overall latency is governed by the **slowest** response, so even a rare slow server (a 1-in-100 p99 event) becomes almost certain to hit **some** server on a high-fan-out request. A service whose individual p99 is fine can have a terrible p99 at the request level once fan-out is large. This is why you optimise and monitor the **tail** (p99, p999), not the median, and why techniques like hedged/backup requests (the MapReduce idea again) matter.

Finally, reliability must be **defined and measured**, not aspired to, which is the contribution of Google's SRE practice. A **Service Level Indicator** (SLI) is a precise metric of user-visible behaviour (e.g. the fraction of requests served under 300 ms). A **Service Level Objective** (SLO) is a target for an SLI (e.g. 99.9% of requests under 300 ms over 28 days). An **SLA** is a contractual promise with consequences. The powerful idea is the **error budget**: 99.9% available means you are *allowed* 0.1% unavailability, and that budget is spent deliberately, if you have budget left you ship features faster; if you have blown it you freeze and focus on reliability. This turns reliability from an argument into an engineering decision with a number. You will instrument a service with metrics and tracing, measure its tail, and define and track an SLO with an error budget.`,
          resources: [
            {
              title: 'Google SRE Book — Service Level Objectives',
              url: 'https://sre.google/sre-book/service-level-objectives/',
              type: 'article',
              cost: 'free',
              provider: 'Google',
              note: 'SLIs, SLOs and error budgets, the way to make reliability a measurable decision.',
              primary: true,
            },
            {
              title: 'Dapper, a Large-Scale Distributed Systems Tracing Infrastructure (Google)',
              url: 'https://research.google/pubs/dapper-a-large-scale-distributed-systems-tracing-infrastructure/',
              type: 'article',
              cost: 'free',
              provider: 'Google',
            },
            {
              title: 'The Tail at Scale (Dean & Barroso)',
              url: 'https://research.google/pubs/the-tail-at-scale/',
              type: 'article',
              cost: 'free',
              provider: 'Google',
              note: 'Why tail latency dominates at scale and how to fight it.',
            },
            {
              title: 'OpenTelemetry — traces concepts',
              url: 'https://opentelemetry.io/docs/concepts/signals/traces/',
              type: 'documentation',
              cost: 'free',
              provider: 'OpenTelemetry / CNCF',
            },
          ],
          exercises: [
            {
              slug: 'instrument-with-tracing',
              title: 'Instrument a multi-service request',
              prompt:
                'Build (or take) a small system of three services where a request flows through all of them. Instrument it with OpenTelemetry: propagate trace context across the RPCs and export traces to a local Jaeger. Introduce an artificial delay in one service and show the trace pinpointing it. Also expose latency histograms (not averages) and compute p50/p99 from them.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'tail-at-scale',
              title: 'Demonstrate tail amplification',
              prompt:
                'Simulate a request that fans out to k backend servers and waits for all of them, where each server\'s latency is p99 = 1 s but p50 = 50 ms. Compute and measure the request-level p99 as k grows from 1 to 100, showing how the single-server tail becomes the common case. Then add hedged (backup) requests and show the improvement, relating it to MapReduce backup tasks.',
              kind: 'simulation',
              difficulty: 2,
            },
            {
              slug: 'slo-and-error-budget',
              title: 'Define and track an SLO',
              prompt:
                'For a service, define an availability SLI and a latency SLI precisely, set 28-day SLOs, and compute the corresponding error budgets. Given a log (real or synthetic) of request outcomes and latencies, compute how much of each error budget was consumed over the period and whether the SLO was met. Write a one-paragraph decision: given the remaining budget, should the team ship a risky feature or freeze?',
              kind: 'data-analysis',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why record latency as histograms/percentiles rather than averages?',
              answerOutline:
                'Averages hide the slow requests; user experience and fan-out behaviour are governed by the tail (p99/p999), which only percentiles reveal.',
            },
            {
              question: 'What does a distributed trace show that metrics and logs cannot?',
              answerOutline:
                'The path of a single request across all services as linked spans, revealing where time was spent across service boundaries, which per-service metrics and logs cannot reconstruct.',
            },
            {
              question: 'Why does tail latency dominate at high fan-out?',
              answerOutline:
                'A request waiting for all of many backends is as slow as the slowest; with enough backends, hitting at least one rare slow response becomes almost certain, so the per-request tail reflects the server tail amplified.',
            },
            {
              question: 'What is an error budget and how is it used?',
              answerOutline:
                'The allowed unreliability implied by an SLO (e.g. 0.1% for 99.9%); teams spend it deliberately, shipping faster when budget remains and freezing to improve reliability when it is exhausted.',
            },
          ],
        },
        {
          slug: 'testing-distributed-systems',
          title: 'Testing distributed systems and chaos engineering',
          summary:
            'Finding the bugs that only appear under failure: deterministic and fault-injection testing, linearizability checking, Jepsen, and chaos engineering in production.',
          estimatedMinutes: 90,
          objectives: [
            'Explain why ordinary testing misses distributed bugs and what fault injection adds',
            'Explain linearizability checking of recorded histories (Jepsen, Porcupine)',
            'Explain deterministic simulation testing (FoundationDB-style) and its advantages',
            'Explain chaos engineering and how to run failure experiments safely',
          ],
          concepts: [
            'Why unit tests miss distributed bugs; schedule dependence',
            'Fault injection: partitions, crashes, clock skew, message loss/reorder',
            'Linearizability checking of histories (Jepsen, Knossos, Porcupine, Elle)',
            'Deterministic simulation testing (seeded, reproducible)',
            'Chaos engineering; hypothesis-driven experiments; blast radius',
            'Game days; testing in production safely',
            'Fault-injection tools (Toxiproxy, Chaos Mesh)',
          ],
          explanation: `A distributed system can pass every unit test and still be badly broken, because its bugs are **schedule-dependent**: they appear only under a particular interleaving of messages, failures and timing that ordinary tests never produce. The discipline of this subject's final lesson is to find those bugs **on purpose**, and it ties back to the Raft labs you already did.

The first technique is **fault injection**: deliberately subject the system to the conditions it claims to tolerate, network **partitions**, node **crashes** and restarts, message **loss, delay and reordering**, and **clock skew**, while a workload runs. The second is **verifying correctness against a model**: record the history of client operations (with timestamps) and check whether that history is consistent with the claimed consistency model. **Jepsen**, Kyle Kingsbury's framework, pioneered this against real databases: it drives a workload, induces partitions, and feeds the recorded history to a **linearizability checker** (Knossos, Porcupine) or a transactional-anomaly checker (**Elle**) that searches for an ordering satisfying the model, reporting a concrete violation if none exists. Jepsen has found serious consistency bugs in a long list of production systems that all claimed to be correct, which is the empirical case for this methodology.

A powerful complementary approach is **deterministic simulation testing**, pioneered by **FoundationDB**: run the entire system, including the network and disks, on top of a simulated, **seeded** scheduler so that a whole run is **reproducible** from one seed. You can then run millions of randomized schedules looking for a failure, and when you find one, replay the exact seed to debug it deterministically, which eliminates the "it only fails once in a thousand runs and I can't reproduce it" agony. FoundationDB's reliability is largely attributed to this.

Finally, **chaos engineering** takes failure testing into **production**: rather than hoping the system tolerates failure, you form a **hypothesis** ("the service stays within its SLO if one instance dies"), inject the failure with a controlled **blast radius** (Netflix's Chaos Monkey kills instances; Chaos Mesh and Toxiproxy inject network faults), and verify the hypothesis, building confidence that the resilience patterns from earlier lessons actually work. The principles (start small, limit blast radius, run in production carefully, automate) are codified at principlesofchaos.org. You will fault-inject and linearizability-check your own key-value store and design a chaos experiment.`,
          resources: [
            {
              title: 'Jepsen — analyses and methodology',
              url: 'https://jepsen.io/analyses',
              type: 'article',
              cost: 'free',
              provider: 'Kyle Kingsbury',
              note: 'Read one full analysis to see fault injection plus linearizability checking find real bugs.',
              primary: true,
            },
            {
              title: 'Porcupine — a fast linearizability checker (Go)',
              url: 'https://github.com/anishathalye/porcupine',
              type: 'tool',
              cost: 'free',
              note: 'Use it to check histories from your own key-value store.',
            },
            {
              title: 'Principles of Chaos Engineering',
              url: 'https://principlesofchaos.org/',
              type: 'documentation',
              cost: 'free',
            },
            {
              title: 'FoundationDB — deterministic simulation testing',
              url: 'https://apple.github.io/foundationdb/testing.html',
              type: 'documentation',
              cost: 'free',
              provider: 'Apple / FoundationDB',
            },
          ],
          exercises: [
            {
              slug: 'linearizability-check-kv',
              title: 'Linearizability-check your store',
              prompt:
                'Record histories from your Raft-backed key-value store (from the Raft lessons/capstone) while injecting partitions and crashes. Feed the histories to Porcupine and confirm they are linearizable. Then deliberately introduce a bug (e.g. serve reads from a stale follower) and show Porcupine catches the non-linearizable history and reports the offending operations.',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'deterministic-sim',
              title: 'Deterministic, seeded fault injection',
              prompt:
                'Wrap your system (or a toy replicated counter) in a seeded, deterministic scheduler controlling message delivery order, delays and failures. Run thousands of random seeds searching for an invariant violation. When one fails, replay the exact seed to reproduce it deterministically and debug it. Report the bug (or confidence from N clean runs) and reflect on how reproducibility changed debugging.',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'chaos-experiment',
              title: 'Design a chaos experiment',
              prompt:
                'For a small deployed system (local containers are fine), write a chaos experiment: state a steady-state hypothesis tied to an SLI, choose a failure to inject (kill a node, add latency with Toxiproxy, partition a container), define the blast radius and abort conditions, run it, and report whether the hypothesis held. If it did not, identify which resilience pattern (timeout, retry, breaker, replication) was missing.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why do ordinary unit tests miss distributed-systems bugs?',
              answerOutline:
                'The bugs depend on specific interleavings of messages, failures and timing that normal tests do not produce; only fault injection under adversarial schedules exposes them.',
            },
            {
              question: 'What does a linearizability checker like Porcupine do?',
              answerOutline:
                'Takes a recorded history of concurrent operations and searches for a valid linearization consistent with real-time order; if none exists it reports a concrete consistency violation.',
            },
            {
              question: 'What is the key advantage of deterministic simulation testing?',
              answerOutline:
                'A seeded scheduler makes whole runs reproducible, so a rare failure found among millions of randomized schedules can be replayed exactly and debugged deterministically.',
            },
            {
              question: 'What makes a chaos experiment responsible?',
              answerOutline:
                'A clear steady-state hypothesis, a limited and controlled blast radius, defined abort conditions, and starting small before expanding, so you learn without causing a real outage.',
            },
          ],
        },
      ],
    },
    {
      slug: 'case-studies',
      title: 'Case Studies',
      description:
        'Putting it together in real systems: ZooKeeper for coordination, the log as a unifying abstraction behind Kafka, scaling and tail latency, and learning from real-world outages.',
      lessons: [
        {
          slug: 'zookeeper-and-coordination',
          title: 'ZooKeeper and coordination services',
          summary:
            'The service that provides the coordination primitives everyone else needs: a replicated hierarchical store, its consistency guarantees, and the recipes (locks, leader election, config) built on it.',
          estimatedMinutes: 90,
          objectives: [
            'Explain why a dedicated coordination service exists and what primitives it provides',
            'Explain ZooKeeper\'s data model (znodes), watches and consistency guarantees',
            'Implement coordination recipes: leader election, distributed locks, configuration and membership',
            'Explain the hazard of lock leases and fencing tokens',
          ],
          concepts: [
            'Coordination as a service; etcd/ZooKeeper/Chubby',
            'Data model: hierarchical znodes; ephemeral and sequential nodes',
            'Watches (one-shot notifications)',
            'Consistency: linearizable writes, FIFO client order; the Zab/consensus core',
            'Recipes: leader election, locks, group membership, config',
            'Lock leases, expiry and the fencing-token problem',
            'Keep coordination state small',
          ],
          explanation: `Over and over, distributed systems need the same hard primitives, elect a leader, hold a lock, know the current configuration, track who is in the cluster, and getting these right requires consensus, which is too hard to re-implement in every system. So the field factored them out into a **coordination service**: **ZooKeeper** (Yahoo, from Google's **Chubby**), and today often **etcd**. The insight is to build one small, extremely well-tested consensus-backed service and let everyone else use it.

ZooKeeper exposes a tiny abstraction: a replicated, in-memory **hierarchical** namespace of small data nodes called **znodes**, like a file system but for coordination metadata, not bulk data. Two features make it powerful. **Ephemeral** znodes exist only while the client that created them is connected, so they vanish automatically on crash, perfect for membership and locks. **Sequential** znodes get a monotonically increasing suffix, which gives ordering. **Watches** let a client ask to be notified once when a znode changes, so clients react to events rather than polling. The service is replicated across an ensemble using a consensus protocol (Zab, Raft-like) so it survives failures, and it guarantees **linearizable writes** and **FIFO** client order.

On this base you build **recipes**. **Leader election**: every candidate creates an ephemeral sequential znode under a common parent; the one with the lowest sequence number is leader, and each watches the next-lower one so that when a leader's ephemeral node disappears (it crashed), the successor is notified and takes over, a clean, race-free election. **Distributed locks**, **group membership** (ephemeral nodes per member) and **configuration** (a znode everyone watches) follow similarly.

There is a crucial hazard you must understand: a **lock lease** can be lost without the holder knowing. If a client holds a lock but then pauses (a long GC pause, a network partition), ZooKeeper's session times out and the lock is given to another client, yet the paused client eventually wakes up still believing it holds the lock, and two clients act on it, the split-brain problem again. The fix is a **fencing token**: the lock service hands out a monotonically increasing token with each grant, the client includes it in every protected operation, and the resource (storage) rejects any operation with a token lower than the highest it has seen, so a stale lock-holder's writes are safely rejected. Kleppmann's article on this is essential. You will run etcd/ZooKeeper and implement leader election and a fenced lock.`,
          resources: [
            {
              title: 'ZooKeeper: Wait-free coordination for Internet-scale systems (and recipes)',
              url: 'https://pdos.csail.mit.edu/6.824/papers/zookeeper.pdf',
              type: 'article',
              cost: 'free',
              provider: 'Yahoo / MIT 6.5840',
              note: 'The design and guarantees. Pair with the ZooKeeper recipes documentation.',
              primary: true,
            },
            {
              title: 'ZooKeeper recipes and solutions',
              url: 'https://zookeeper.apache.org/doc/current/recipes.html',
              type: 'documentation',
              cost: 'free',
              provider: 'Apache ZooKeeper',
            },
            {
              title: 'How to do distributed locking (Kleppmann) — the fencing-token argument',
              url: 'https://martin.kleppmann.com/2016/02/08/how-to-do-distributed-locking.html',
              type: 'article',
              cost: 'free',
              provider: 'Martin Kleppmann',
            },
            {
              title: 'etcd documentation (a modern coordination store)',
              url: 'https://etcd.io/docs/v3.5/learning/why/',
              type: 'documentation',
              cost: 'free',
              provider: 'etcd / CNCF',
            },
          ],
          exercises: [
            {
              slug: 'leader-election-recipe',
              title: 'Leader election with ephemeral sequential nodes',
              prompt:
                'Run a local ZooKeeper or etcd. Implement the leader-election recipe: candidates create ephemeral sequential nodes and watch their predecessor. Start five clients, verify exactly one is leader, kill the leader and show the next takes over within the session timeout without a split. Then kill a non-leader and show no election happens. Log the znode state throughout.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'fencing-token-lock',
              title: 'Distributed lock with fencing tokens',
              prompt:
                'Implement a distributed lock on ZooKeeper/etcd that issues a monotonically increasing fencing token with each grant. Build a mock storage service that records the highest token seen and rejects writes with a lower token. Then simulate a lock holder pausing long enough to lose its session while another client acquires the lock, and show that the paused client\'s late write is rejected by the fencing check. Explain why the lock service alone cannot prevent this.',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'coordination-recipes',
              title: 'Config and membership recipes',
              prompt:
                'Implement two more recipes: a dynamic configuration value that all clients watch and pick up within a bounded time of a change, and group membership using ephemeral nodes so that crashed members disappear automatically. Measure the propagation delay of a config change and the detection delay of a crashed member, and relate the latter to the session timeout.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does a dedicated coordination service exist instead of each system implementing consensus?',
              answerOutline:
                'Consensus is hard to get right; factoring the primitives (election, locks, config, membership) into one small, heavily-tested consensus-backed service lets everyone reuse correct coordination.',
            },
            {
              question: 'How do ephemeral sequential znodes enable race-free leader election?',
              answerOutline:
                'Each candidate creates an ephemeral sequential node; the lowest sequence is leader and each watches its predecessor, so on a leader crash (its ephemeral node vanishes) exactly the successor is notified and promotes.',
            },
            {
              question: 'Why can a client lose a distributed lock without knowing, and what is the fix?',
              answerOutline:
                'A pause (GC, partition) can exceed the session timeout, so the service reassigns the lock while the client still believes it holds it. Fencing tokens let the resource reject the stale holder\'s later operations.',
            },
            {
              question: 'What consistency does ZooKeeper guarantee and why keep its data small?',
              answerOutline:
                'Linearizable writes and FIFO client order, backed by a consensus protocol across the ensemble; it holds coordination metadata in memory, so data must stay small, it is not a bulk datastore.',
            },
          ],
        },
        {
          slug: 'kafka-and-the-log',
          title: 'Kafka and the log abstraction',
          summary:
            'The append-only log as a unifying primitive: how a partitioned, replicated log powers messaging, stream processing and event-driven architectures, and the delivery guarantees it offers.',
          estimatedMinutes: 90,
          objectives: [
            'Explain the log as an ordered, append-only, replayable abstraction and why it unifies many systems',
            'Explain Kafka\'s architecture: topics, partitions, offsets, consumer groups and replication',
            'Explain delivery semantics (at-least-once, exactly-once) and ordering guarantees in Kafka',
            'Explain log-based architectures: event sourcing, CDC and stream processing',
          ],
          concepts: [
            'The log: totally ordered, append-only, replayable sequence',
            'Kafka: topics, partitions, offsets, brokers',
            'Replication (leader/follower per partition, ISR); durability',
            'Consumer groups; per-partition ordering',
            'Delivery semantics; idempotent producers; transactions (exactly-once)',
            'Log compaction; retention',
            'Event sourcing, change data capture, stream processing',
          ],
          explanation: `Jay Kreps's influential argument is that the humble **log**, a totally ordered, append-only, replayable sequence of records, is one of the most useful abstractions in distributed systems, because so many problems reduce to "agree on an ordered sequence of events and let consumers read it at their own pace". A replicated log is exactly what consensus produces (the Raft log!), and **Kafka** productised it as infrastructure.

Kafka's model: records are published to **topics**, each split into **partitions** for parallelism; within a partition, records have a monotonically increasing **offset** and are strictly **ordered**, but there is no ordering across partitions (the partition key decides which partition a record lands in, so related records sharing a key stay ordered). Each partition is **replicated** across brokers with one **leader** and followers in the **in-sync replica** set; a write is durable once the ISR has it, and a follower takes over if the leader fails, the same leader/follower replication you studied, applied per partition. Consumers track their own **offset**, so they read at their own speed, can **replay** from any point, and multiple independent consumers can read the same log; a **consumer group** divides partitions among its members for scale-out, with per-partition ordering preserved.

**Delivery semantics** are the practical crux and recapitulate the RPC lesson. By default Kafka gives **at-least-once** (a producer retries on uncertainty, possibly duplicating). **Idempotent producers** (sequence numbers per partition) remove producer-retry duplicates, and Kafka **transactions** give **exactly-once** processing across a read-process-write cycle by atomically committing output records and consumer offsets, again, exactly-once is at-least-once plus idempotency/dedup, not magic delivery. **Log compaction** retains the latest record per key so the log can serve as a durable key-value changelog, and retention policies bound its size.

The reason this matters beyond messaging is **log-based architecture**. **Event sourcing** stores state as the log of events that produced it (replayable, auditable); **change data capture** turns a database's write log into a stream others consume; and **stream processing** (Kafka Streams, Flink) computes continuously over the log. The log becomes the integration backbone and the source of truth, with databases and caches as **materialised views** of it. You will run Kafka, reason about ordering and delivery, and build a small event-sourced or CDC pipeline.`,
          resources: [
            {
              title: 'The Log: What every software engineer should know (Jay Kreps)',
              url: 'https://web.archive.org/web/2023/https://engineering.linkedin.com/distributed-systems/log-what-every-software-engineer-should-know-about-real-time-datas-unifying',
              type: 'article',
              cost: 'free',
              provider: 'LinkedIn / Jay Kreps',
              note: 'The essay that framed the log as the unifying abstraction. Archived copy; LinkedIn removed the original page. The core reading for this lesson.',
              primary: true,
            },
            {
              title: 'Apache Kafka — design documentation',
              url: 'https://kafka.apache.org/documentation/#design',
              type: 'documentation',
              cost: 'free',
              provider: 'Apache Kafka',
            },
            {
              title: 'Confluent — Exactly-once semantics in Kafka',
              url: 'https://www.confluent.io/blog/exactly-once-semantics-are-possible-heres-how-apache-kafka-does-it/',
              type: 'article',
              cost: 'free',
              provider: 'Confluent',
            },
            {
              title: 'Apache Kafka — streams documentation',
              url: 'https://kafka.apache.org/documentation/streams/',
              type: 'documentation',
              cost: 'free',
              provider: 'Apache Kafka',
            },
          ],
          exercises: [
            {
              slug: 'kafka-ordering-delivery',
              title: 'Explore ordering and delivery',
              prompt:
                'Run Kafka locally. Create a topic with 3 partitions and a keyed producer; show that records with the same key stay ordered (same partition) while records with different keys may be processed out of order across partitions. Then demonstrate at-least-once duplicates by killing a producer mid-retry, and eliminate them by enabling the idempotent producer. Verify consumer offsets allow replay from an arbitrary point.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'event-sourcing-pipeline',
              title: 'Build an event-sourced service',
              prompt:
                'Build a small bank-account service whose source of truth is an append-only Kafka log of events (deposited, withdrawn). Derive the current balance by replaying the log, and build a separate read-model (materialised view) consumer. Show that you can rebuild the entire state from the log alone, and that a new consumer can be added and catch up from offset 0. Discuss the ordering guarantee you rely on.',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'log-compaction',
              title: 'Log as a changelog with compaction',
              prompt:
                'Configure a compacted Kafka topic keyed by entity id and use it as a durable key-value changelog. Write several updates per key, trigger/observe compaction, and show that a consumer reading from the start sees only the latest value per key. Explain how this makes the log a usable key-value store and where it differs from a database.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why is the log described as a unifying abstraction?',
              answerOutline:
                'Many problems reduce to agreeing on an ordered, replayable sequence of events; a replicated log (consensus output) serves messaging, replication, event sourcing, CDC and stream processing alike.',
            },
            {
              question: 'What ordering does Kafka guarantee, and what does it not?',
              answerOutline:
                'Strict ordering by offset within a partition; no ordering across partitions. Keyed records share a partition and stay ordered relative to each other.',
            },
            {
              question: 'How does Kafka achieve exactly-once, given exactly-once delivery is impossible?',
              answerOutline:
                'At-least-once delivery plus idempotent producers (per-partition sequence numbers) and transactions that atomically commit output and consumer offsets, so retries do not duplicate effects.',
            },
            {
              question: 'What is event sourcing and how does the log relate to derived state?',
              answerOutline:
                'State is stored as the log of events that produced it; databases/caches are materialised views of the log, rebuildable by replay, making the log the source of truth.',
            },
          ],
        },
        {
          slug: 'tail-latency-and-scale',
          title: 'Scaling, caching and tail latency',
          summary:
            'Making systems fast and big: horizontal scaling and sharding, caching and its hazards, and the techniques for fighting tail latency at scale.',
          estimatedMinutes: 90,
          objectives: [
            'Explain horizontal scaling, sharding strategies and rebalancing',
            'Explain caching patterns and hazards (invalidation, stampedes, thundering herd)',
            'Apply tail-latency techniques (hedged requests, tied requests, load balancing)',
            'Reason about the end-to-end latency budget of a scaled, fanned-out request',
          ],
          concepts: [
            'Vertical vs horizontal scaling; shared-nothing',
            'Sharding/partitioning: by key range, by hash; hotspots; rebalancing',
            'Caching: cache-aside, read-through, write-through; TTLs',
            'Cache invalidation; stampede/thundering herd; request coalescing',
            'Tail latency techniques: hedged and tied requests',
            'Load balancing; the power of two choices',
            'Latency budgets and fan-out',
          ],
          explanation: `Scaling means handling more load and data than one machine can, and the dominant approach is **horizontal** (**scale-out**): add more machines in a **shared-nothing** design, rather than buying a bigger one (**vertical**, which hits a ceiling). Scaling stateless services out is easy; scaling **stateful** ones requires **sharding** (partitioning) the data. The two strategies are **range** partitioning (contiguous key ranges per shard, good for range scans but prone to **hotspots** if load is skewed) and **hash** partitioning (hash the key to a shard, even load but no range scans), with the consistent-hashing machinery from Dynamo for smooth **rebalancing** as shards are added. Hotspots, a single very popular key or a skewed workload, are the recurring scaling pain and are handled by splitting hot shards, replicating hot keys, or adding a cache.

**Caching** is the highest-leverage latency and load tool, and also a rich source of bugs. The common pattern is **cache-aside** (the application checks the cache, on a miss reads the database and populates the cache); **read-through** and **write-through** push that logic into the cache layer. The two hard problems are the two famous hard things in computing. **Invalidation**: keeping the cache consistent with the source of truth is genuinely hard, and stale caches cause subtle correctness bugs, which is why TTLs, explicit invalidation, and treating the cache as a materialised view of a log (previous lesson) are used. **Stampedes** (**thundering herd**): when a popular cached item expires, thousands of concurrent requests all miss and hit the database at once, potentially overwhelming it, the fix is **request coalescing** (only one request recomputes while the others wait) and staggered/jittered TTLs.

Finally, **tail latency** at scale (the "tail at scale" insight from the observability lesson) is fought with specific techniques. **Hedged requests**: send the request, and if no reply arrives within, say, the p95, send a duplicate to another replica and take the first to answer, cutting the tail at the cost of a little extra load (and needing idempotency). **Tied requests** go further, cancelling the duplicate once one starts. Good **load balancing** matters too: the **power of two choices** (pick two random servers and send to the less loaded) gives dramatically better balance than random for almost no cost. All of this is in service of meeting an **end-to-end latency budget**: a user request that fans out to tens of services must divide its budget among them and control the tail at every hop. You will shard a store, add a cache with stampede protection, and implement hedged requests.`,
          resources: [
            {
              title: 'The Tail at Scale (Dean & Barroso)',
              url: 'https://research.google/pubs/the-tail-at-scale/',
              type: 'article',
              cost: 'free',
              provider: 'Google',
              note: 'Hedged and tied requests and the discipline of fighting the tail. The core reading.',
              primary: true,
            },
            {
              title: 'AWS Builders\' Library — Caching challenges and strategies',
              url: 'https://aws.amazon.com/builders-library/caching-challenges-and-strategies/',
              type: 'article',
              cost: 'free',
              provider: 'Amazon',
            },
            {
              title: 'Designing Data-Intensive Applications — partitioning (free summary via the MIT reading list)',
              url: 'https://dataintensive.net/',
              type: 'textbook',
              cost: 'paid',
              provider: 'Martin Kleppmann',
              note: 'The partitioning and replication chapters. The book is paid; the free MIT 6.5840 papers and Jepsen analyses cover the same ground.',
            },
            {
              title: 'Marc Brooker\'s blog (load balancing, backoff and distributed-systems engineering)',
              url: 'https://brooker.co.za/blog/',
              type: 'article',
              cost: 'free',
              provider: 'Marc Brooker',
              note: 'See the posts on load balancing / the power of two random choices and on backoff and jitter.',
            },
          ],
          exercises: [
            {
              slug: 'shard-and-rebalance',
              title: 'Shard a store and handle a hotspot',
              prompt:
                'Shard a key-value store across 4 nodes by hash. Drive a skewed workload (one key gets 50% of traffic) and show the hotspot overloading one shard. Mitigate it two ways: replicate the hot key across shards for reads, and split the hot shard. Measure per-shard load before and after. Then add a shard and measure how many keys move (relate to consistent hashing).',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'cache-stampede',
              title: 'Cache stampede and its mitigation',
              prompt:
                'Put a cache in front of a slow backend with a TTL. Drive concurrent reads of one hot key and let its cache entry expire, observing the stampede of simultaneous backend requests. Mitigate with request coalescing (single-flight) so only one request recomputes while others wait, and add jittered TTLs. Measure backend load during expiry before and after.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'hedged-requests',
              title: 'Implement hedged requests',
              prompt:
                'Against a replicated service where each replica occasionally responds slowly (heavy-tailed latency), implement hedged requests: send to one replica, and if no response by the p95 latency, send a second to another replica and take the first answer. Measure request-level p50 and p99 with and without hedging and the extra load incurred. Ensure the operation is idempotent and explain why that is required.',
              kind: 'coding',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'What is the difference between range and hash partitioning and their respective hazards?',
              answerOutline:
                'Range: contiguous key ranges, supports range scans but prone to hotspots. Hash: even distribution, no range scans. Both must handle hotspots and rebalancing.',
            },
            {
              question: 'What causes a cache stampede and how do you prevent it?',
              answerOutline:
                'A popular item expires and many concurrent misses hit the backend at once; prevent with request coalescing (single recompute) and jittered TTLs.',
            },
            {
              question: 'How do hedged requests reduce tail latency and what do they require?',
              answerOutline:
                'Send a duplicate to another replica if the first is slow and take the earliest reply, cutting the tail; requires idempotency and costs a little extra load.',
            },
            {
              question: 'Why does the power of two choices improve load balancing so much?',
              answerOutline:
                'Sampling two servers and picking the less loaded exponentially reduces the maximum load imbalance compared with random choice, at negligible cost.',
            },
          ],
        },
        {
          slug: 'learning-from-outages',
          title: 'Learning from real-world outages',
          summary:
            'The capstone of judgement: dissecting real post-mortems to see how the subject\'s failure modes combine in practice, and how good operations limit and recover from them.',
          estimatedMinutes: 80,
          objectives: [
            'Read a public post-mortem and reconstruct the failure chain in terms of this subject\'s concepts',
            'Identify the recurring patterns in large outages (cascading failure, config errors, metastability, dependency loops)',
            'Explain how the resilience and observability techniques would have prevented or mitigated each',
            'Write a blameless post-mortem for a simulated or real incident',
          ],
          concepts: [
            'Post-mortems as a learning instrument',
            'Recurring causes: config/deploy errors, cascading failure, metastability',
            'Hidden dependencies and dependency cycles',
            'Thundering herds on recovery; cache-flush storms',
            'Correlated failures defeating redundancy',
            'Blast radius, graceful degradation, and recovery',
            'Blameless culture and systemic fixes',
          ],
          explanation: `The final lesson is about **judgement**, and the best teachers are real outages, because they show how the failure modes you have studied in isolation combine under pressure in ways no one anticipated. Mature engineering organisations publish detailed **post-mortems**, and reading them is the closest thing to apprenticeship the field offers. Your task is to read them not as horror stories but analytically, reconstructing the failure chain in the vocabulary of this subject.

A handful of **patterns recur** across almost every large outage. Many begin not with a crash but with a **configuration or deployment change**, a bad config pushed everywhere at once, a schema migration, a certificate expiry, which is why staged rollouts and config validation matter. From the trigger, the damage usually spreads by **cascading failure**: one overloaded component slows, its callers' timeouts and **retries** amplify the load (the retry-storm pattern), and the overload propagates outward, often into a **metastable** state that persists after the trigger is gone because retries and cold caches sustain it. **Hidden dependencies** and **dependency cycles** turn up repeatedly, a "stateless" service quietly depends on a config service that depends on the thing that just failed, so the supposed redundancy was illusory. **Correlated failures** defeat redundancy in the same way: three replicas in the same rack, or all restarting at once and stampeding a cold cache, are not really three independent copies. Several famous outages (major cloud and CDN incidents) trace to exactly these shapes, and the public write-ups are explicit about them.

The flip side is how good operations **limit and recover**. **Blast radius** control (cells, shuffle sharding, staged rollout) ensures a fault hits a fraction, not everyone. **Graceful degradation** (serve stale data, shed low-priority load) keeps core function alive. And the **blameless post-mortem** culture, which you met in the security and observability lessons, is what converts an outage into durable improvement: the review asks what about the **system and process** allowed the incident and produces concrete action items, rather than blaming an individual, because blame drives the information you need underground and guarantees recurrence. You will dissect two real post-mortems in the subject's terms and write your own for a simulated incident, which is the synthesis of everything in this course: the theory tells you what can go wrong, and the post-mortems tell you what actually does.`,
          resources: [
            {
              title: 'danluu/post-mortems — a curated collection of real outage post-mortems',
              url: 'https://github.com/danluu/post-mortems',
              type: 'article',
              cost: 'free',
              provider: 'Dan Luu',
              note: 'A large curated list; pick two detailed ones (ideally a cascading failure and a config error) to dissect.',
              primary: true,
            },
            {
              title: 'Google SRE Book — Postmortem Culture: Learning from Failure',
              url: 'https://sre.google/sre-book/postmortem-culture/',
              type: 'article',
              cost: 'free',
              provider: 'Google',
            },
            {
              title: 'Cloudflare — details of the outage on July 2, 2019 (a worked example)',
              url: 'https://blog.cloudflare.com/details-of-the-cloudflare-outage-on-july-2-2019/',
              type: 'article',
              cost: 'free',
              provider: 'Cloudflare',
              note: 'A model public post-mortem of a cascading failure from a config/regex change.',
            },
            {
              title: 'AWS Builders\' Library — Avoiding fallback in distributed systems',
              url: 'https://aws.amazon.com/builders-library/avoiding-fallback-in-distributed-systems/',
              type: 'article',
              cost: 'free',
              provider: 'Amazon',
              note: 'Why well-intentioned fallbacks and retries often make outages worse.',
            },
          ],
          exercises: [
            {
              slug: 'dissect-two-postmortems',
              title: 'Dissect two real post-mortems',
              prompt:
                'Choose two detailed public post-mortems of different shapes (e.g. a cascading failure and a config/deploy error). For each, reconstruct the timeline, identify the trigger and the amplification mechanism in this subject\'s terms (retry storm, metastability, hidden dependency, correlated failure), and list which specific techniques from the fault-tolerance and observability lessons would have prevented or shortened it. Present as a structured analysis.',
              kind: 'reading',
              difficulty: 2,
            },
            {
              slug: 'write-blameless-postmortem',
              title: 'Write a blameless post-mortem',
              prompt:
                'Take an incident from your own capstone testing (a partition that caused data loss or unavailability, or a retry storm you induced) or a simulated scenario. Write a full blameless post-mortem: summary, impact, timeline, root-cause analysis (including contributing factors, not a single cause), what went well and badly, and concrete, owned action items. Explicitly avoid individual blame and focus on systemic fixes.',
              kind: 'writing',
              difficulty: 2,
            },
            {
              slug: 'resilience-review',
              title: 'Resilience review of your own system',
              prompt:
                'Review your capstone key-value store against the recurring outage patterns: does a bad config take it all down at once; can a retry storm form; are there hidden dependencies or correlated failure risks; does it degrade gracefully or collapse under overload? For each weakness, propose a mitigation drawn from the course (staged rollout, backoff/jitter, circuit breaker, blast-radius limiting, graceful degradation) and, where feasible, implement and test one.',
              kind: 'writing',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why do so many large outages begin with a configuration or deployment change rather than a crash?',
              answerOutline:
                'Config/deploy changes are applied broadly and quickly, bypassing the redundancy that protects against single-machine failure; a bad change hits everywhere at once unless staged and validated.',
            },
            {
              question: 'How does a cascading failure propagate, and which earlier-lesson patterns combat it?',
              answerOutline:
                'An overloaded component slows, callers\' retries and timeouts amplify load, spreading outward and often becoming metastable. Backoff/jitter, circuit breakers, load shedding and blast-radius limiting combat it.',
            },
            {
              question: 'How can redundancy fail to protect against correlated failures?',
              answerOutline:
                'Replicas that share a failure domain (same rack, same config, same dependency, simultaneous restart) fail together, so the copies were not independent and redundancy is illusory.',
            },
            {
              question: 'Why is a blameless post-mortem essential to improvement?',
              answerOutline:
                'Blame suppresses the honest information needed to find systemic causes, guaranteeing recurrence; blameless reviews focus on how the system/process allowed the incident and produce concrete fixes.',
            },
          ],
        },
      ],
    },
  ],
  capstone: {
    slug: 'replicated-key-value-store-with-raft',
    title: 'Capstone: a fault-tolerant replicated key-value store on Raft, tested under partitions',
    description: `Build a linearizable, fault-tolerant key-value store on top of your own Raft implementation, following the MIT 6.5840 lab arc, and prove its correctness adversarially. The service replicates a key-value state machine (Put, Append, Get) across a cluster using Raft to agree on the operation log; clients retry across servers to find the leader, and duplicate requests are deduplicated so operations are applied exactly once even across leader changes and retries. Add log snapshotting so the Raft log does not grow without bound, and ensure the service recovers correctly after crashes and restarts.

Then test it the way the field actually validates such systems: run it under a fault injector that partitions the network, crashes and restarts servers, and delays and drops messages while a bank of clients issues concurrent operations, and check the recorded history for linearizability with a checker (Porcupine or the lab tester). As a stretch, shard the key space across multiple Raft groups with a shard controller, as the 6.5840 shards lab does, and demonstrate correctness while shards migrate. Write up the design, the consistency guarantee you provide, the failures you tested, and an honest account of the bugs you found and fixed.`,
    deliverables: [
      'A Raft library (election, replication, persistence, snapshotting) passing the fault-injection test suite repeatedly',
      'A replicated key-value service with client-side leader discovery and exactly-once (deduplicated) semantics',
      'A linearizability checker run (Porcupine or the lab tester) over histories produced under partitions, crashes and message loss',
      'A test report: the fault scenarios exercised, pass rates over many runs, and the bugs found and fixed',
      'A design document: architecture, the consistency guarantee and its justification, and known limitations',
    ],
    estimatedHours: 35,
    stretchGoals: [
      'Shard the key space across multiple Raft groups with a shard controller and support live shard migration (6.5840 shards lab)',
      'Implement leader leases or read-index to serve linearizable reads without a full log round-trip, and measure the latency gain',
      'Run a Jepsen-style external test harness and generate a report comparing your store\'s behaviour under partition against its claimed consistency model',
    ],
  },
  masteryChecklist: [
    'I can state the system and failure models of a protocol and reason about its safety and liveness under each',
    'I can explain FLP, the two generals and CAP, and how real systems circumvent the impossibility results',
    'I can order events with logical and vector clocks and capture a consistent global snapshot',
    'I can explain Paxos and implement Raft, including elections, log replication, persistence and snapshotting',
    'I can build state-machine replication and explain and prevent split-brain with majority quorums',
    'I can place a system precisely on the consistency spectrum (linearizable to eventual) and justify the choice',
    'I can reason about distributed transactions (2PC) and isolation levels and their anomalies',
    'I can explain the designs of GFS, MapReduce, Dynamo and Spanner and the trade-offs each makes',
    'I can engineer for fault tolerance with failure detection, idempotent retries, backpressure and observability (SLOs, tracing)',
    'I can test a distributed system adversarially for linearizability under partitions, crashes and message loss',
  ],
});
