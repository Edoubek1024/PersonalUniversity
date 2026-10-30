import { defineCoursework } from '../define';

const pythonExtensions = ['ms-python.python', 'ms-python.vscode-pylance', 'charliermarsh.ruff'];
const pythonToolchain = [
  'Install Python 3.12 from python.org. Everything here runs natively on Windows 10, so WSL is not needed.',
  'Create a virtual environment with `python -m venv .venv`, activate it with `.venv\\Scripts\\Activate.ps1`, then run `pip install pytest`.',
  'Install Wireshark for Windows and accept the Npcap option for loopback capture, so you can inspect traffic on 127.0.0.1.',
];

export default defineCoursework({
  subjectId: 'computer-networks',
  machineProblems: [
    {
      slug: 'mp1-http-server',
      title: 'tinyhttpd: an HTTP/1.1 server from raw sockets',
      afterModule: 'application-layer',
      coversModules: ['internet-architecture', 'application-layer'],
      supersedesProject: true,
      summary: 'Write a static file server on raw TCP sockets, with persistent connections, conditional and range requests, and a benchmark at 1,000 concurrent clients.',
      language: 'Python 3.12',
      estimatedHours: 16,
      overview: `Every browser tab you have ever opened spoke HTTP to something like this. In this MP you write that something yourself, starting from \`socket.socket()\` and reading RFC 9112 rather than a framework's documentation.

The core lesson is that **TCP gives you a byte stream, not messages**. A request can arrive one byte at a time, or two requests can arrive in one \`recv\`. Your parser must be a state machine that copes with both, and it must find the end of each message from the protocol itself.

**Constraints.** Use only the Python standard library's \`socket\`, \`threading\`, \`selectors\` or \`asyncio\` modules for networking, plus \`pathlib\`, \`hashlib\` and \`email.utils\` as helpers. Do not import \`http.server\`, \`socketserver\`, or any web framework. The server must serve a directory given on the command line and must never serve a file outside it.

You choose the concurrency model: a thread pool or an event loop. Whichever you pick, you will defend it with numbers in a benchmark report that gives requests per second and p50 and p99 latency at four load levels.

**Windows note.** Paths can contain backslashes and drive letters, so canonicalise with \`Path.resolve()\` and compare the result against the served root with \`is_relative_to\`. Filtering the string for \`..\` is not enough.`,
      setup: {
        extensions: [...pythonExtensions, 'humao.rest-client'],
        toolchain: pythonToolchain,
        structure: `tinyhttpd/
├── tinyhttpd/__main__.py     # argument parsing: --root --port --workers
├── tinyhttpd/parser.py       # incremental request parser (no socket code here)
├── tinyhttpd/server.py       # accept loop and connection handling
├── tinyhttpd/files.py        # path resolution, ETag, ranges, index files
├── tinyhttpd/accesslog.py    # Common Log Format output
├── tests/test_parser.py      # feeds bytes directly to the parser
├── tests/test_server.py      # real sockets against a running server
├── tools/bench.py            # asyncio load generator
├── docs/BENCHMARK.md
├── docs/CAPTURE.md           # annotated Wireshark capture
└── www/                      # sample site`,
        commands: [
          { label: 'Start the server', command: 'python -m tinyhttpd --root www --port 8080 --workers 32' },
          { label: 'Run the tests', command: 'python -m pytest -q' },
          { label: 'Fetch a page and show the headers', command: 'curl.exe -i http://127.0.0.1:8080/' },
          { label: 'Benchmark with 100 concurrent clients', command: 'python tools/bench.py --clients 100 --requests-per-client 100 --port 8080' },
        ],
      },
      requirements: [
        'The parser is a separate class that accepts arbitrary byte chunks and yields complete requests, with no socket code in it, so it can be tested without a network.',
        'Support `GET` and `HEAD`, return `405` with an `Allow: GET, HEAD` header for other known methods such as `POST`, and `501` for unrecognised methods.',
        'Keep connections open by default in HTTP/1.1, honour `Connection: close`, answer pipelined requests in order, and close idle connections after 5 seconds.',
        'Every response has correct `Date`, `Content-Length` and `Content-Type` headers, and a `HEAD` response has the same headers as `GET` with no body.',
        'Send a strong `ETag` derived from file size and modification time, and return `304` with no body when `If-None-Match` matches.',
        'Support one byte range per request in all three `Range` forms (`a-b`, `a-` and `-n`), with `206` and `Content-Range`, and `416` when the range cannot be satisfied.',
        'Serve `index.html` for directory paths, return `404` for missing files, and decode percent-escapes before resolving a path so no request can read outside the root.',
        'Reject requests with `400` when `Host` is missing on HTTP/1.1, `431` when the header section exceeds 8,192 bytes, and `505` for any version other than HTTP/1.0 or HTTP/1.1.',
        'Write one Common Log Format line per request, and include at least 25 automated test cases across parsing, status codes and security.',
        '`docs/BENCHMARK.md` reports requests per second, p50 and p99 latency for 1, 10, 100 and 1,000 clients, and names the bottleneck you observed. `docs/CAPTURE.md` annotates a capture of a browser reusing one TCP connection.',
      ],
      acceptanceTests: [
        'Sending `GET /index.html HTTP/1.1\\r\\nHost: x\\r\\n\\r\\n` one byte at a time, 1 ms apart, returns the same `200` response as sending it in one call.',
        'One `send` containing pipelined requests for `/a.txt` and `/b.txt` returns two complete responses on the same connection, with `a.txt` first.',
        'For a 1,000-byte file, `Range: bytes=0-99` returns `206`, `Content-Length: 100` and `Content-Range: bytes 0-99/1000`. Both `bytes=900-` and `bytes=-100` return `Content-Range: bytes 900-999/1000`, and `bytes=1000-` returns `416` with `Content-Range: bytes */1000`.',
        'A second `GET` that sends the first response\'s `ETag` in `If-None-Match` returns `304` with an empty body. After the file changes, the same request returns `200` with a different `ETag`.',
        'With `secret.txt` placed beside the served root, `/../secret.txt`, `/%2e%2e/secret.txt` and `/..%5csecret.txt` each return `403` or `404`, and the secret text never appears in a response.',
        '1,000 simultaneous clients each making 10 requests on one persistent connection receive 10,000 `200` responses with correct bodies and zero connection errors.',
      ],
      resources: [
        {
          title: 'RFC 9112: HTTP/1.1',
          url: 'https://www.rfc-editor.org/rfc/rfc9112',
          type: 'documentation',
          cost: 'free',
          provider: 'IETF',
          note: 'Sections 2 and 3 define message format. Section 6 explains how to find where a message ends.',
        },
      ],
      stretchGoals: [
        'Implement the other concurrency model and compare both at 1,000 clients.',
        'Add `Transfer-Encoding: chunked` responses for a generated directory listing.',
      ],
    },
    {
      slug: 'mp2-software-router',
      title: 'pyrouter: a software IP router and routing daemon',
      afterModule: 'network-layer',
      coversModules: ['application-layer', 'transport-layer', 'network-layer'],
      supersedesProject: true,
      summary: 'Build an IPv4 router and a distance-vector daemon that run as ordinary processes, then watch ping, traceroute and NAT work across your own network.',
      language: 'Python 3.12',
      estimatedHours: 20,
      overview: `A router is a simple idea with many exact details. In this MP you build one and then connect several into a network that finds its own routes.

So that everything runs on Windows with no virtual machines, each **link is emulated by a pair of UDP sockets on 127.0.0.1**. A UDP datagram on a link carries exactly one raw IPv4 packet, starting at the version field. There is no Ethernet layer, and so no ARP, because those arrive in the next module. A topology file describes the routers, their interfaces and the link costs, and one launcher starts a process for each.

The data plane parses headers, verifies checksums, decrements TTL, performs longest-prefix match, fragments when needed, rewrites addresses for NAT, and generates ICMP errors. The control plane is a RIP-like daemon that exchanges distance vectors in UDP messages, carried inside IPv4 over the same links, so that forwarding tables are learned and never configured by hand.

**Constraints.** Use the standard library only, and build every header with \`struct\`. Do not use Scapy. Keep the data plane and control plane in separate modules, joined only by a forwarding table object.

**Windows note.** Sending to a closed UDP port on loopback can make the next \`recvfrom\` raise \`ConnectionResetError\`. Catch it, or one stopped router will take its neighbours down with it.

Write a \`.pcap\` file per interface using link type 101 (raw IP), so Wireshark can dissect your traffic even though it never touches a real network card.`,
      setup: {
        extensions: pythonExtensions,
        toolchain: pythonToolchain,
        structure: `pyrouter/
├── pyrouter/packets.py       # IPv4, ICMP and UDP encode, decode and checksum
├── pyrouter/lpm.py           # binary trie for longest-prefix match
├── pyrouter/dataplane.py     # the forwarding loop
├── pyrouter/nat.py           # translation table
├── pyrouter/dv.py            # distance-vector daemon
├── pyrouter/pcap.py          # writes link type 101 captures
├── lab.py                    # starts a topology, one process per node
├── tools/ping.py             # runs on an emulated host
├── tools/traceroute.py
├── topologies/chain.json     # h1 - r1 - r2 - r3 - h2
├── topologies/triangle.json  # three routers with mixed costs
├── tests/
└── docs/PROTOCOL.md          # routing message format and timers`,
        commands: [
          { label: 'Start a topology', command: 'python lab.py topologies/chain.json' },
          { label: 'Run the tests', command: 'python -m pytest -q' },
          { label: 'Trace a path across the routers', command: 'python tools/traceroute.py --from h1 --to 10.0.3.2' },
          { label: 'Open a capture from a router interface', command: '& "C:\\Program Files\\Wireshark\\Wireshark.exe" captures\\r2-eth0.pcap' },
        ],
      },
      requirements: [
        'Validate each packet: drop and count anything with a version other than 4, an IHL below 5, a bad header checksum, or a total length larger than the datagram received.',
        'Forward using a binary trie, so a lookup takes at most 32 steps and the longest matching prefix always wins.',
        'Decrement TTL and recompute the header checksum on every forwarded packet, and never forward a packet whose TTL would reach 0.',
        'Answer ICMP echo requests addressed to the router, and generate Time Exceeded (type 11, code 0) and Destination Unreachable (type 3, code 0) messages that quote the original IP header plus the first 8 bytes of its payload.',
        'When a packet exceeds the egress MTU, fragment it with correct offsets and flags, or if DF is set, drop it and send type 3, code 4 with the next-hop MTU.',
        'An optional NAT interface rewrites source address and port on the way out, restores them on the way back, updates both the IP and UDP checksums, drops unsolicited inbound packets, and expires idle mappings after 30 seconds.',
        'The daemon sends its vector every 1 second and on any change, treats a neighbour as dead after 3 silent seconds, uses 16 as infinity, and applies poisoned reverse unless started with `--no-poison`.',
        'Routing messages have a documented binary format with a version field and a checksum, and malformed messages are counted and ignored.',
        '`tools/ping.py` reports loss and RTT, and `tools/traceroute.py` raises TTL by 1 from 1 until the destination answers.',
        '`docs/PROTOCOL.md` specifies the routing protocol and includes convergence times measured over at least 10 link failures.',
      ],
      acceptanceTests: [
        'The header `45 00 00 73 00 00 40 00 40 11 00 00 c0 a8 00 01 c0 a8 00 c7` checksums to `0xb861`, and the same header with TTL 63 checksums to `0xb961`. With routes `10.0.0.0/8` to r1, `10.1.0.0/16` to r2, `10.1.2.0/24` to r3 and `0.0.0.0/0` to r4, lookups give `10.1.2.3` to r3, `10.1.3.3` to r2, `10.2.0.1` to r1 and `8.8.8.8` to r4.',
        'A 1,500-byte packet with 1,480 payload bytes and DF clear, sent to an MTU of 576, becomes three fragments with total lengths 572, 572 and 396, offset fields 0, 69 and 138, and MF set on the first two only. With DF set, the router instead sends type 3, code 4 with next-hop MTU 576.',
        'On `chain.json`, traceroute from h1 to h2 lists r1, r2, r3 and then h2 in that order. An ICMP echo with TTL 2 draws a Time Exceeded message from r2, visible in the `.pcap` file.',
        'On a triangle with costs A-B 1, B-C 2 and A-C 5, A reaches C at cost 3 through B. After the A-B link is cut, A reaches C at cost 5 directly and B reaches A at cost 7 through C, both within 5 seconds, and ping from A to C keeps working.',
        'On a chain A-B-C with cost 1 per link, cutting B-C marks C unreachable (metric 16) at both A and B within 5 seconds with poisoned reverse. With `--no-poison`, the log shows the metric rising through intermediate values until it reaches 16.',
        'With NAT on external address `198.51.100.1`, a UDP packet from `192.168.1.10:5000` to `203.0.113.9:7000` leaves with source `198.51.100.1` and a new port with valid checksums. The reply returns to `192.168.1.10:5000`, and a packet to any unmapped external port is dropped.',
      ],
      resources: [
        {
          title: 'RFC 2453: RIP Version 2',
          url: 'https://www.rfc-editor.org/rfc/rfc2453',
          type: 'documentation',
          cost: 'free',
          provider: 'IETF',
          note: 'Read section 3 for timers, split horizon and triggered updates. Your format can be simpler.',
        },
      ],
      stretchGoals: [
        'Add a link-state daemon with flooding and Dijkstra, and compare convergence time and message count with distance vector.',
        'Add STUN-style hole punching between two hosts behind separate instances of your NAT.',
      ],
    },
  ],
  finalProject: {
    slug: 'final-sawtooth',
    title: 'sawtooth: a network lab on your laptop with its own encrypted transport',
    repoName: 'sawtooth',
    summary: 'Build a deterministic network emulator and an encrypted, congestion-controlled transport, then browse a real web page through a link you broke on purpose.',
    language: 'Python 3.12',
    estimatedHours: 55,
    overview: `Most people learn congestion control from a diagram of a sawtooth. This project lets you produce the real thing, from a protocol you wrote, on a laptop, in a way anyone can clone and rerun.

\`sawtooth\` has three parts. The **emulator** models frames, links, queues, switches and routers in virtual time, so a 60 second experiment finishes in seconds and gives identical results for the same seed. The **transport** is your own QUIC-like protocol: encrypted from the first data packet, with selective acknowledgements, RTT estimation and pluggable congestion control. The **gateway** makes it tangible: point a real browser at a local proxy, and your page load travels through your transport across an emulated 200 ms lossy path to your \`tinyhttpd\` server.

The central design decision is a **sans-IO protocol core**. The transport is a pure state machine with \`on_datagram(data, now)\`, \`poll_transmit(now)\` and \`next_timeout()\`, and it never touches a socket or a clock. The same code therefore runs under the virtual-time emulator in tests and over real UDP in the demo. You will have to think hard about what belongs in that interface.

The repository closes with a report full of plots you generated: sawtooth windows, the bufferbloat curve, fairness between flows, and an honest comparison with what QUIC does better. This is original work. It is not a solution to any university's lab, because the emulator, wire format and experiments are yours.`,
    setup: {
      extensions: [...pythonExtensions, 'github.vscode-github-actions'],
      toolchain: [
        ...pythonToolchain,
        'Inside the virtual environment, also run `pip install cryptography matplotlib`. The `cryptography` package provides X25519, HKDF and ChaCha20-Poly1305, so you never write those primitives yourself.',
      ],
      structure: `sawtooth/
├── sawtooth/emu/             # virtual clock, links, queues, CoDel, switch, router
├── sawtooth/frames.py        # Ethernet-style frames, CRC-32, ARP
├── sawtooth/routing.py       # distance vector, reused from pyrouter
├── sawtooth/transport/       # sans-IO core: connection, streams, recovery
├── sawtooth/transport/cc/    # reno.py, cubic.py, and a shared interface
├── sawtooth/crypto.py        # handshake and packet protection
├── sawtooth/gateway.py       # local TCP proxy into the transport
├── sawtooth/udp.py           # runs the core over real sockets
├── experiments/              # one script per plot, each with fixed seeds
├── dissector/sawtooth.lua    # Wireshark dissector
├── results/                  # saved data and figures
├── docs/WIRE-FORMAT.md
├── docs/REPORT.md
├── tests/
├── .github/workflows/ci.yml
└── README.md`,
      commands: [
        { label: 'Run the test suite', command: 'python -m pytest -q' },
        { label: 'Run one experiment and draw its plot', command: 'python experiments/fairness.py --seed 1 --out results/fairness.png' },
        { label: 'Start the server side of the demo', command: 'python -m sawtooth serve --root www --link "rate=5mbit delay=100ms loss=1%"' },
        { label: 'Start the browser gateway', command: 'python -m sawtooth proxy --listen 127.0.0.1:8888' },
        { label: 'Lint', command: 'ruff check .' },
      ],
    },
    requirements: [
      'The emulator runs in virtual time from a seeded random generator, models transmission, propagation and queueing delay, and supports loss, reordering, duplication and per-link corruption.',
      'Links carry frames with MAC addresses and a CRC-32 you implement yourself. A self-learning switch and ARP work on each LAN segment, and corrupted frames are dropped at the receiver.',
      'Routers forward by longest-prefix match and learn routes with your distance-vector protocol, so a topology with redundant paths survives a link failure during a transfer.',
      'The transport core is sans-IO, passes the same tests under the emulator and over real UDP, and provides multiple independent streams on one connection.',
      'Loss recovery uses packet numbers that are never reused, selective acknowledgement ranges, RTT estimation and timers in the style of RFC 6298, and retransmission on three later acknowledgements.',
      'Congestion control is a pluggable interface with Reno and CUBIC implementations, plus receiver flow control per stream and per connection.',
      'The handshake uses X25519 and HKDF, authenticates the server with an Ed25519 key that the client pins, and protects each packet with ChaCha20-Poly1305. Replayed and tampered packets are discarded.',
      'Queues support drop-tail and CoDel, and a tracer records `cwnd`, RTT, queue depth and goodput for plotting.',
      'A gateway lets a real browser load a page from your `tinyhttpd` server through the transport, and `dissector/sawtooth.lua` displays unprotected header fields in a capture of the UDP mode.',
      '`docs/REPORT.md` shows goodput against loss and delay compared with the Mathis estimate (at 1,200-byte MSS, 100 ms RTT and 1% loss it predicts about 146 kB/s), and discusses at least four limits of your protocol and how QUIC or BBR handles each.',
    ],
    acceptanceTests: [
      'A 1,500-byte frame on a 10 Mbit/s link with 20 ms propagation delay arrives at exactly 21.2 ms of virtual time. The 251st packet of a burst of 1,240-byte packets waits 248 ms in the queue. The CRC-32 of `123456789` is `0xCBF43926`, and flipping any single bit of a frame is detected.',
      'A 10 MiB transfer over 200 ms RTT with 5% loss, 1% reordering and 1% duplication has a SHA-256 identical to the input for each of seeds 1 to 20, and repeating a seed reproduces the same packet trace byte for byte.',
      'On a 10 Mbit/s bottleneck with 50 ms RTT and a 62,500-byte queue (one bandwidth-delay product), a 50 MB transfer finishes within 47.1 virtual seconds, which is at least 8.5 Mbit/s of goodput. Two simultaneous flows over 60 virtual seconds reach a Jain fairness index of at least 0.95.',
      'With 250-packet drop-tail buffering at 10 Mbit/s and 50 ms RTT, the median queueing delay is above 100 ms. With CoDel (target 5 ms, interval 100 ms) it falls below 20 ms, and goodput stays at 80% or more of the drop-tail result.',
      'On a triangle of routers, cutting the active link in the middle of a 10 MiB transfer re-routes traffic and the transfer still completes with a matching hash, without restarting the connection.',
      'A known marker string in the transferred data never appears in a capture of the UDP mode. Changing any one byte of a protected packet causes it to be discarded and counted, and sending a captured packet a second time has no effect on the stream.',
    ],
    coverage: [
      { module: 'internet-architecture', demonstrates: 'The emulator computes transmission, propagation and queueing delay from first principles, and experiments confirm them against the formulas.' },
      { module: 'application-layer', demonstrates: 'Your HTTP/1.1 server runs unchanged over the new transport, and a real browser loads pages through the gateway.' },
      { module: 'transport-layer', demonstrates: 'The sans-IO core implements streams, selective acknowledgement, RTT estimation, flow control and pluggable congestion control.' },
      { module: 'network-layer', demonstrates: 'Emulated routers run longest-prefix forwarding and distance-vector routing, and connections survive a link failure.' },
      { module: 'link-layer-and-wireless', demonstrates: 'Frames, CRC-32, ARP and a self-learning switch form the bottom layer of every emulated path.' },
      { module: 'network-security-and-measurement', demonstrates: 'Authenticated encryption protects every packet, and the bufferbloat, CoDel and fairness experiments show measurement discipline.' },
    ],
    portfolio: [
      'The README opens with a sawtooth plot and a screen recording of a browser loading a page through an emulated lossy link, followed by a three-command quick start.',
      'GitHub Actions runs `ruff`, the test suite and one short experiment on every push, with a status badge in the README.',
      'The repository has a LICENSE, a tagged `v1.0.0` release, and every figure in `results/` can be regenerated with one command and a recorded seed.',
      '`docs/WIRE-FORMAT.md` specifies the packet format and handshake precisely enough for another person to write a compatible client.',
      '`docs/REPORT.md` presents the results and states clearly what your protocol gets wrong, and the README warns that this is a learning protocol and not for protecting real data.',
    ],
    stretchGoals: [
      'Add a BBR-style controller and compare queue depth with CUBIC on the same bottleneck.',
      'Add connection migration using connection IDs, then change the client address during a transfer.',
    ],
  },
});
