import { defineSubject } from '../define';

export default defineSubject({
  id: 'computer-networks',
  title: 'Computer Networks',
  category: 'cs',
  tagline:
    'How bits cross the planet: from sockets and HTTP down through TCP, IP and Ethernet, learned by building protocols and reading packet captures.',
  description: `A network is the most successful distributed system ever built: billions of machines from thousands of independent organisations exchange packets with no central controller, using protocols written down in public documents. Understanding it explains why your web page takes 300 ms to load, why video calls stutter, why a server can be unreachable while the Internet is "up", and how a single mistyped routing announcement can take a country offline.

This curriculum follows the **top-down** approach of Kurose and Ross and of Stanford's CS144: you start at the application layer you already use (HTTP, DNS, email), then descend through transport (UDP, TCP, congestion control), network (IP, routing, NAT) and link layers (Ethernet, Wi-Fi), finishing with security and measurement. Every lesson pairs reading with **Wireshark captures** of real traffic and with code: you will write socket programs in Python and C, implement reliable delivery and congestion control over UDP, build routing algorithms, and measure your own connection.

The free *Computer Networks: A Systems Approach* (Peterson and Davie), Beej's *Guide to Network Programming*, the Kurose and Ross companion site, the RFCs themselves and CS144's lab series are the primary sources. By the end you should be able to read any RFC, explain any packet in a capture, implement a transport protocol from a specification, and diagnose a slow or broken network from first principles.`,
  difficulty: 'intermediate',
  estimatedHours: 70,
  prerequisites: ['programming-fundamentals'],
  recommendedBackground: [
    'Comfortable writing and running Python programs from the command line',
    'Some C helps for the Beej and CS144 material but is not required',
    'Basic Unix shell use (ssh, ping, running a program in the background)',
  ],
  tags: ['networks', 'TCP/IP', 'HTTP', 'sockets', 'Wireshark', 'routing', 'protocols'],
  core: true,
  modules: [
    {
      slug: 'internet-architecture',
      title: 'Internet Architecture',
      description:
        'What the Internet is made of, why it is layered the way it is, and how to measure the delay, loss and throughput that every protocol above must live with.',
      lessons: [
        {
          slug: 'what-is-the-internet',
          title: 'What is the Internet?',
          summary:
            'Hosts, links, packet switches and protocols: the nuts and bolts of the network, and why packet switching beat circuit switching.',
          estimatedMinutes: 90,
          objectives: [
            'Describe the Internet as hosts, links, routers and ISPs glued together by protocols',
            'Contrast packet switching with circuit switching and explain statistical multiplexing quantitatively',
            'Explain what a protocol is and read a simple protocol exchange from a capture or a diagram',
            'Trace the path of a packet from your machine to a distant server with traceroute and interpret the output',
          ],
          concepts: [
            'Hosts (end systems), links, packet switches (routers, switches)',
            'Access networks: home, enterprise, mobile',
            'Packet switching vs circuit switching',
            'Statistical multiplexing',
            'Store-and-forward transmission',
            'Protocol: message format, order and actions',
            'ISP hierarchy and the network of networks',
          ],
          explanation: `The Internet is a **network of networks**. At its edge are **hosts** (end systems): laptops, phones, servers. Hosts connect through **access networks** (your home router, a campus Ethernet, a 5G base station) to **Internet service providers**, and ISPs connect to each other at exchange points. In the middle are **packet switches**, mostly **routers**, whose only job is to receive a packet on one link and send it out on another.

The design decision that made all this possible is **packet switching**. Data is cut into packets, each carrying a destination address, and each router forwards each packet independently, storing it fully before sending it on (**store-and-forward**). The alternative, **circuit switching**, reserves a fixed slice of every link for the duration of a call, as the telephone network did. Packet switching wins for bursty traffic because of **statistical multiplexing**: if 35 users each need a 100 kb/s link 10 % of the time, a 1 Mb/s link can serve them with the probability that more than 10 are active simultaneously below 0.0004, while circuit switching could admit only 10 users. The cost is that packets may be delayed or dropped when a burst exceeds capacity; a large part of this subject is about living with that.

A **protocol** defines the format and order of messages between two parties and the actions taken on sending or receiving. Every layer of the Internet is a protocol, and every protocol is written down in an **RFC** you can read.

Work through Kurose and Ross chapter 1 material on the companion site (the videos and interactive problems are free) alongside chapter 1 of *A Systems Approach*. Then run \`traceroute\` (or \`tracert\`) to three distant hosts and read the output as a list of routers your packets crossed. Keep the raw outputs; you will revisit them when you learn about ISPs, delay and routing.`,
          resources: [
            {
              title: 'Computer Networking: A Top-Down Approach — companion site (videos, interactive problems, Wireshark labs)',
              url: 'https://gaia.cs.umass.edu/kurose_ross/index.php',
              type: 'course',
              cost: 'free',
              provider: 'Kurose & Ross (UMass)',
              note: 'The book is paid; the free video lectures, interactive exercises and Wireshark labs for chapter 1 are all you need here.',
              primary: true,
            },
            {
              title: 'Computer Networks: A Systems Approach — Chapter 1 (Foundation)',
              url: 'https://book.systemsapproach.org/',
              type: 'textbook',
              cost: 'free',
              provider: 'Peterson & Davie',
              note: 'Open-source textbook. Chapter 1 covers requirements, architecture and performance.',
            },
            {
              title: 'Stanford CS144: Introduction to Computer Networking',
              url: 'https://cs144.github.io/',
              type: 'course',
              cost: 'free',
              provider: 'Stanford',
              note: 'The unit on the Internet and IP (what the Internet is, packet switching, layering). Used throughout this subject.',
            },
            {
              title: 'traceroute(8) man page',
              url: 'https://man7.org/linux/man-pages/man8/traceroute.8.html',
              type: 'documentation',
              cost: 'free',
              provider: 'man7.org',
            },
          ],
          exercises: [
            {
              slug: 'traceroute-three-continents',
              title: 'Trace paths to three continents',
              prompt:
                'Run traceroute to a server in your country, one in a different continent, and one in a third. For each hop record the IP address, the round-trip times and (using whois or bgp.he.net) the organisation that owns the address. Write a paragraph explaining where the big jumps in RTT occur and what physical fact explains them. Record how many hops did not answer and give two reasons a router might not reply.',
              kind: 'data-analysis',
              difficulty: 1,
              hint: 'Light in fibre travels about 200 km per millisecond. A transatlantic hop should add roughly 30-40 ms of RTT.',
            },
            {
              slug: 'statistical-multiplexing-calc',
              title: 'Statistical multiplexing arithmetic',
              prompt:
                'A 1 Mb/s link is shared by users who each send at 100 kb/s with probability p = 0.1, independently. (a) How many users can circuit switching support? (b) With packet switching and 35 users, compute the probability that more than 10 are active at once using the binomial distribution. (c) Repeat for p = 0.3 and explain in one sentence why packet switching is less attractive for constant-rate traffic such as a phone call.',
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'write-a-protocol',
              title: 'Design a tiny protocol',
              prompt:
                'Write a specification, in the style of a short RFC, for a protocol in which a client asks a server for the current time. Define the message formats (byte by byte), the order of messages, what each side does on receipt, and what happens if a message is lost. Then implement both sides in Python over UDP (sockets are introduced fully in module 2; the Python docs example is enough here) and show a successful exchange.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does packet switching allow more users than circuit switching on the same link, and what does it give up?',
              answerOutline:
                'Statistical multiplexing: bursty users rarely all transmit at once, so capacity is shared on demand rather than reserved. It gives up guaranteed capacity: when bursts coincide, packets queue and may be dropped.',
            },
            {
              question: 'What are the three things a protocol specifies?',
              answerOutline:
                'The format (syntax) of messages, the order in which they are exchanged, and the actions taken on sending or receiving each message.',
            },
            {
              question: 'What does a line of traceroute output tell you, and why can the times be out of order?',
              answerOutline:
                'The router at that hop count (TTL) and three round-trip times to it. Each probe is a separate packet that may take different queues or even paths, and routers may deprioritise generating ICMP replies, so a nearer hop can report a larger time.',
            },
          ],
        },
        {
          slug: 'layering-and-encapsulation',
          title: 'Layering, encapsulation and the end-to-end argument',
          summary:
            'The five-layer Internet stack, how each layer wraps the one above, and the design principle that keeps the core of the network simple.',
          estimatedMinutes: 100,
          objectives: [
            'Name the five Internet layers, their units of data and their responsibilities',
            'Explain encapsulation and decode a captured frame into its Ethernet, IP, TCP and HTTP parts',
            'State the end-to-end argument and apply it to a design question (reliability, encryption, compression)',
            'Install Wireshark and capture, filter and inspect your own traffic',
          ],
          concepts: [
            'Five layers: application, transport, network, link, physical',
            'Messages, segments, datagrams, frames',
            'Encapsulation and headers',
            'Service model of a layer; interfaces between layers',
            'End-to-end argument (Saltzer, Reed, Clark)',
            'The hourglass: IP as the narrow waist',
            'Wireshark capture and display filters',
          ],
          explanation: `Networks are built in **layers** so that each piece can be designed and replaced independently. The Internet stack has five: the **application** layer (HTTP, DNS, SMTP) exchanges *messages*; the **transport** layer (TCP, UDP) carries *segments* between processes; the **network** layer (IP) moves *datagrams* between hosts across routers; the **link** layer (Ethernet, Wi-Fi) moves *frames* across one link; and the **physical** layer moves bits. Each layer provides a *service* to the one above and uses the one below. Routers implement only the bottom three layers; link-layer switches only the bottom two.

**Encapsulation** is the mechanism. An HTTP message is handed to TCP, which prepends a TCP header; IP prepends its own header; Ethernet adds a header and trailer. On the receiving host the headers are stripped in reverse. When you open a packet in Wireshark you are looking at exactly this nesting, and learning to read it is the single most useful skill in this subject.

The shape of the stack is an **hourglass**: many applications and many link technologies, but one network protocol, IP, in the middle. Everything above IP runs over everything below it. That narrow waist is why the Internet could absorb Wi-Fi, fibre and 5G without changing a single application.

The **end-to-end argument** (Saltzer, Reed and Clark, 1984) explains why the waist is so thin. A function such as reliable delivery can only be completed correctly with the knowledge and help of the endpoints, so putting it inside the network is at best an optimisation and at worst wasted work. Hence IP is unreliable and TCP, running only on hosts, provides reliability. The same reasoning applies to encryption and to many questions you will meet later (where should NAT live? should routers retransmit?).

Read the end-to-end paper itself; it is short. Then install Wireshark, capture a visit to a plain-HTTP site (such as the HTTP example pages on the Kurose and Ross site), and follow the Wireshark introductory lab: find one frame and identify every header.`,
          resources: [
            {
              title: 'End-to-End Arguments in System Design (Saltzer, Reed, Clark)',
              url: 'https://web.mit.edu/Saltzer/www/publications/endtoend/endtoend.pdf',
              type: 'article',
              cost: 'free',
              provider: 'MIT',
              note: 'The original 1984 paper. Read all of it; it is about ten pages.',
              primary: true,
            },
            {
              title: 'Kurose & Ross Wireshark labs (Getting Started lab)',
              url: 'https://gaia.cs.umass.edu/kurose_ross/wireshark.php',
              type: 'problem-set',
              cost: 'free',
              provider: 'Kurose & Ross (UMass)',
              note: 'Do the "Getting Started" lab now; later lessons use the HTTP, DNS, TCP, IP and Ethernet labs.',
            },
            {
              title: "Wireshark User's Guide",
              url: 'https://www.wireshark.org/docs/wsug_html_chunked/',
              type: 'documentation',
              cost: 'free',
              provider: 'Wireshark',
              note: 'Chapters on capturing and on display filters are the ones to read first.',
            },
            {
              title: 'A Systems Approach — Chapter 1.3 (Network Architecture: layering and protocols)',
              url: 'https://book.systemsapproach.org/',
              type: 'textbook',
              cost: 'free',
              provider: 'Peterson & Davie',
            },
          ],
          exercises: [
            {
              slug: 'decode-a-frame',
              title: 'Decode one frame by hand',
              prompt:
                'Capture a plain HTTP GET with Wireshark. Pick the frame carrying the request and, using only the raw hex bytes pane, write down the byte offsets and values of: destination and source MAC, EtherType, IP version/IHL, total length, TTL, protocol, source and destination IPs, TCP source and destination ports, sequence number, flags, and the first bytes of the HTTP request. Check each against the Wireshark decode. State the total header overhead in bytes and as a percentage of the frame.',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'end-to-end-cases',
              title: 'Apply the end-to-end argument',
              prompt:
                'For each of the following, argue in a paragraph whether the function belongs in the network core, at the endpoints, or both, using the end-to-end argument: (a) retransmission of lost packets, (b) encryption, (c) compression of video, (d) duplicate suppression, (e) a firewall that blocks malicious traffic. Identify one case where a network-core implementation is justified as a performance optimisation and explain the condition under which it is.',
              kind: 'writing',
              difficulty: 2,
            },
            {
              slug: 'display-filter-drill',
              title: 'Wireshark display-filter drill',
              prompt:
                'On a capture of a few minutes of normal browsing, write display filters that show: only DNS responses; only TCP SYN packets; only packets to or from one IP; only HTTP requests with a Host header containing a given string; only TCP packets with the RST flag; only frames larger than 1400 bytes. For each filter record how many packets matched and the filter text you used.',
              kind: 'data-analysis',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'Which layers does a router implement, and which does a link-layer switch implement?',
              answerOutline:
                'A router: physical, link and network (it forwards on IP addresses). A switch: physical and link only (it forwards on MAC addresses).',
            },
            {
              question: 'State the end-to-end argument and give the canonical example.',
              answerOutline:
                'A function that can only be correctly and completely implemented with the knowledge of the application at the endpoints should not be placed in the lower layers except as a performance enhancement. Example: reliable file transfer must be checked end to end even if each link is reliable, because a host can corrupt data in between.',
            },
            {
              question: 'Why is IP called the narrow waist of the hourglass?',
              answerOutline:
                'Every application protocol runs over IP and IP runs over every link technology; the single common layer lets the two ends evolve independently.',
            },
          ],
        },
        {
          slug: 'delay-loss-and-throughput',
          title: 'Delay, loss and throughput',
          summary:
            'The four components of packet delay, how queues cause loss, and why throughput is set by the bottleneck link and the round-trip time.',
          estimatedMinutes: 100,
          objectives: [
            'Compute transmission, propagation, processing and queueing delay for a given link and packet',
            'Explain the bandwidth-delay product and what it means for how much data is "in flight"',
            'Describe how traffic intensity determines queueing delay and loss',
            'Measure RTT and throughput on your own connection and reconcile the numbers with theory',
          ],
          concepts: [
            'Transmission delay L/R vs propagation delay d/s',
            'Processing and queueing delay',
            'Traffic intensity La/R and the queueing-delay curve',
            'Packet loss from finite buffers',
            'End-to-end delay over N links',
            'Throughput and the bottleneck link',
            'Bandwidth-delay product',
          ],
          explanation: `Every packet crossing a router pays four delays. **Processing** delay (microseconds) to examine the header. **Queueing** delay while it waits for the output link. **Transmission** delay to push its $L$ bits onto a link of rate $R$: $d_{trans} = L/R$. **Propagation** delay for the bits to physically cross a link of length $d$ at speed $s$ (about $2 \\times 10^8$ m/s in fibre or copper): $d_{prop} = d/s$. Students constantly confuse the last two: transmission delay depends on the packet size and link rate, propagation on distance alone. A 1500-byte packet on a 1 Gb/s link takes 12 μs to transmit but 40 ms to propagate across the Atlantic.

Queueing delay is the one that varies. If packets arrive at average rate $a$ per second with $L$ bits each on a link of rate $R$, the **traffic intensity** is $La/R$. When it is near 0 the queue is empty; as it approaches 1 the average delay grows without bound; above 1 the queue grows forever and, because buffers are finite, packets are **dropped**. That is what "packet loss" on the Internet is: not corruption, but a full queue.

For a sender and receiver separated by $N$ links of equal rate and no queueing, end-to-end delay is $N \\cdot (d_{proc} + d_{trans} + d_{prop})$. **Throughput** for a transfer is limited by the slowest (**bottleneck**) link on the path, typically the access link. The **bandwidth-delay product** $R \\times RTT$ is the number of bits a sender must have in flight to keep a path full; it shows up again in TCP windows and buffer sizing.

Work the delay questions on the Kurose and Ross interactive site until you can do them without thinking, then measure: \`ping\` for RTT, \`iperf3\` against a public server (or between two of your own machines) for throughput, and compare the measured RTT to the great-circle distance divided by $2 \\times 10^8$ m/s.`,
          resources: [
            {
              title: 'Kurose & Ross interactive end-of-chapter problems (chapter 1: delay, loss, throughput)',
              url: 'https://gaia.cs.umass.edu/kurose_ross/interactive/',
              type: 'problem-set',
              cost: 'free',
              provider: 'Kurose & Ross (UMass)',
              note: 'The "one-hop" and "end-to-end delay" problems regenerate with new numbers each time.',
              primary: true,
            },
            {
              title: 'A Systems Approach — Chapter 1.5 (Performance: bandwidth, latency, delay × bandwidth product)',
              url: 'https://book.systemsapproach.org/',
              type: 'textbook',
              cost: 'free',
              provider: 'Peterson & Davie',
            },
            {
              title: 'iperf3 (network throughput measurement tool)',
              url: 'https://github.com/esnet/iperf',
              type: 'tool',
              cost: 'free',
              provider: 'ESnet',
            },
            {
              title: 'High Performance Browser Networking — Chapter 1: Primer on Latency and Bandwidth',
              url: 'https://hpbn.co/',
              type: 'textbook',
              cost: 'free',
              provider: "O'Reilly / Ilya Grigorik",
              note: 'Free online edition. Chapter 1 explains why latency, not bandwidth, is the usual limit.',
            },
          ],
          exercises: [
            {
              slug: 'delay-calculations',
              title: 'Delay calculations',
              prompt:
                'A 1500-byte packet crosses three links of 10 Mb/s, 1 Gb/s and 100 Mb/s with lengths 2 km, 3000 km and 50 km. Compute transmission and propagation delay on each link (propagation speed 2 × 10^8 m/s) and the total store-and-forward delay. Then: how large a file could you send across this path in one second, and which link decides that? Finally compute the bandwidth-delay product of the 3000 km link.',
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'queueing-simulation',
              title: 'Simulate a router queue',
              prompt:
                'Write a discrete-event simulation of a single router output queue: packets of 1500 bytes arrive as a Poisson process with rate a, the link rate is R = 10 Mb/s, and the buffer holds B packets. For B = 10, 100 and 1000 and traffic intensity La/R from 0.1 to 1.2 in steps of 0.1, run one million arrivals and plot average queueing delay and loss rate. Explain the knee in the delay curve and why bigger buffers trade loss for delay (this is bufferbloat).',
              kind: 'simulation',
              difficulty: 2,
            },
            {
              slug: 'measure-your-link',
              title: 'Measure RTT and throughput',
              prompt:
                'Ping five hosts at known distances (use the great-circle distance to their data centre city) 50 times each and tabulate minimum RTT against distance. Fit a line; the slope should be near 10 μs/km (two directions). Then run iperf3 to a public iperf3 server for 30 seconds in each direction and record throughput. Compute your bandwidth-delay product and explain how many 1500-byte packets must be in flight to saturate the path.',
              kind: 'data-analysis',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'A 10 kB packet on a 1 Mb/s link across 10 km: which delay dominates, transmission or propagation?',
              answerOutline:
                'Transmission: 80,000 bits / 10^6 b/s = 80 ms; propagation: 10^4 m / 2 × 10^8 m/s = 50 μs.',
            },
            {
              question: 'What happens to queueing delay as traffic intensity approaches 1, and what happens above 1?',
              answerOutline:
                'It grows rapidly (unboundedly in the infinite-buffer model); above 1 arrivals outpace service, the queue fills and packets are dropped.',
            },
            {
              question: 'Why is throughput of a transfer usually set by the access link and not the core?',
              answerOutline:
                'Core links are provisioned far above any single flow; the min over the path is the bottleneck and the slowest link is almost always at the edge.',
            },
            {
              question: 'What does a bandwidth-delay product of 1 MB mean for a sender?',
              answerOutline:
                'To keep the pipe full it must have 1 MB unacknowledged in flight; a smaller window limits throughput to window/RTT.',
            },
          ],
        },
        {
          slug: 'isps-peering-and-the-shape-of-the-internet',
          title: 'ISPs, peering and the shape of the Internet',
          summary:
            'Tiers of ISPs, exchange points, autonomous systems and content delivery networks: the economic structure that the routing protocols later encode.',
          estimatedMinutes: 80,
          objectives: [
            'Describe the ISP hierarchy (access, regional, tier-1) and the roles of IXPs and CDNs',
            'Explain the difference between transit and peering and why money shapes routes',
            'Look up an autonomous system number and its neighbours using public BGP tools',
            'Explain why the physical layout of fibre and submarine cables determines latency',
          ],
          concepts: [
            'Autonomous system (AS) and AS number',
            'Access ISP, regional ISP, tier-1 ISP',
            'Transit vs settlement-free peering',
            'Internet exchange points (IXPs)',
            'Content delivery networks and private backbones',
            'Points of presence, submarine cables',
            'Looking glasses, whois and RIR databases',
          ],
          explanation: `The Internet has no owner, but it has a structure driven by money. Each independently administered network is an **autonomous system** with a number (an ASN): your university, a national ISP, Google. At the bottom, **access ISPs** sell connectivity to homes and businesses. They buy **transit** (paid access to the whole Internet) from **regional ISPs**, which buy transit from a handful of **tier-1 ISPs** that reach everyone without paying anyone. Two networks that exchange roughly equal traffic can instead **peer** for free, often at an **Internet exchange point** where hundreds of ASes plug into one switch fabric.

Over the last fifteen years this hierarchy has flattened. Large content providers (Google, Meta, Netflix, Cloudflare) built private global backbones and put **content delivery network** caches inside access ISPs, so most of the bytes you receive never touch a tier-1. The path your packets take therefore reflects contracts as much as geography: a packet between two neighbouring ISPs in one city may detour through another country because that is where they peer.

Why does this matter for an engineer? Because **routing follows policy**, and policy follows these relationships; BGP (module 4) is designed to express exactly "prefer customers, then peers, then providers". It also sets the latency floor: the **submarine cable** map and the location of exchange points determine the fastest possible path between two cities, and no protocol can beat it.

Read the Kurose and Ross section on the network core and ISPs, then explore the public tools: Hurricane Electric's BGP toolkit shows any AS's prefixes and neighbours, PeeringDB shows where networks peer, and the submarine cable map shows the physical reality. Relate what you find to the traceroutes you took in the first lesson.`,
          resources: [
            {
              title: 'Kurose & Ross chapter 1 videos (network core, ISPs and the network of networks)',
              url: 'https://gaia.cs.umass.edu/kurose_ross/lectures.php',
              type: 'lecture',
              cost: 'free',
              provider: 'Kurose & Ross (UMass)',
              primary: true,
            },
            {
              title: 'Hurricane Electric BGP Toolkit',
              url: 'https://bgp.he.net/',
              type: 'tool',
              cost: 'free',
              provider: 'Hurricane Electric',
              note: 'Look up any IP, prefix or AS number; shows upstreams, peers and announced prefixes.',
            },
            {
              title: 'PeeringDB',
              url: 'https://www.peeringdb.com/',
              type: 'dataset',
              cost: 'free',
              note: 'The public database of where networks peer and which exchange points they use.',
            },
            {
              title: 'Submarine Cable Map',
              url: 'https://www.submarinecablemap.com/',
              type: 'interactive',
              cost: 'free',
              provider: 'TeleGeography',
            },
            {
              title: 'RIPE Atlas (global measurement platform)',
              url: 'https://atlas.ripe.net/',
              type: 'tool',
              cost: 'free',
              provider: 'RIPE NCC',
              note: 'Run traceroutes from thousands of vantage points worldwide; free credits for hosting a probe or via sponsorship.',
            },
          ],
          exercises: [
            {
              slug: 'map-your-as-path',
              title: 'Map the ASes on your traceroutes',
              prompt:
                'Take the three traceroutes from the first lesson. For each hop IP, find its AS number (bgp.he.net or whois). Collapse the path into a sequence of ASes and, for each adjacent pair, decide from PeeringDB and the AS "upstreams" lists whether the link is likely transit or peering. Draw the resulting AS-level path and annotate the RTT jump at each AS boundary.',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'latency-floor',
              title: 'Compute the latency floor between two cities',
              prompt:
                'Pick two cities on different continents. Using the submarine cable map, find the shortest cable route between them and compute the theoretical minimum RTT at 2 × 10^8 m/s. Then use RIPE Atlas (or ping from a cloud VM) to measure the actual RTT. Explain the gap: cable routing, landing stations, router hops and policy detours. Report both numbers and your estimate of each contribution.',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'peering-economics',
              title: 'Transit or peer?',
              prompt:
                'A regional ISP sends 40 Gb/s to a video provider and receives 400 Gb/s back. Transit costs 0.50 USD per Mb/s per month at the 95th percentile. Write one page analysing whether the ISP should buy transit, peer at an IXP (port cost 2000 USD/month per 100 Gb/s), or accept a CDN cache inside its network. State your assumptions and show the arithmetic.',
              kind: 'writing',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What is the difference between transit and peering?',
              answerOutline:
                'Transit: one network pays another for reachability to the whole Internet. Peering: two networks exchange traffic between their own customers, usually settlement-free, and do not forward each other\'s traffic to third parties.',
            },
            {
              question: 'Why do content providers place caches inside access ISPs?',
              answerOutline:
                'To cut latency and transit cost: most bytes are then served from inside the ISP without crossing paid links, and the RTT to the user drops to a few milliseconds.',
            },
            {
              question: 'Why can a packet between two ISPs in the same city travel through another country?',
              answerOutline:
                'The two networks only connect where they peer or share a transit provider; if that is elsewhere, the path detours there regardless of geography.',
            },
          ],
        },
      ],
    },
    {
      slug: 'application-layer',
      title: 'Application Layer: HTTP, DNS, Email and Sockets',
      description:
        'The protocols you already use every day, read from their RFCs and captures, and the socket API that every application uses to reach the transport layer.',
      lessons: [
        {
          slug: 'http',
          title: 'HTTP: the web protocol',
          summary:
            'Request/response messages, persistent connections, caching, cookies and how HTTP/2 and HTTP/3 fix the performance problems of HTTP/1.1.',
          estimatedMinutes: 120,
          objectives: [
            'Write a valid HTTP/1.1 request by hand and interpret the response line, headers and body',
            'Explain persistent connections and pipelining and compute page-load time under each',
            'Describe how cookies and caching (conditional GET, Cache-Control) work',
            'Explain the goals of HTTP/2 (multiplexing, header compression) and HTTP/3 (QUIC) and what head-of-line blocking is',
          ],
          concepts: [
            'Client-server architecture; stateless protocol',
            'Request line, headers, body; methods and status codes',
            'Non-persistent vs persistent connections',
            'Conditional GET, Cache-Control, ETag, web caches/proxies',
            'Cookies and sessions',
            'HTTP/2 streams and HPACK; HTTP/3 over QUIC',
            'Head-of-line blocking',
          ],
          explanation: `HTTP is a text protocol (until version 2) that runs over TCP on port 80, or inside TLS on port 443. A client opens a connection and sends a **request**: a request line (\`GET /index.html HTTP/1.1\`), header lines (\`Host\`, \`User-Agent\`, \`Accept\`), a blank line and an optional body. The server replies with a **status line** (\`HTTP/1.1 200 OK\`), headers (\`Content-Type\`, \`Content-Length\`) and the body. HTTP is **stateless**: the server remembers nothing between requests, which is why **cookies** exist. A \`Set-Cookie\` header stores an identifier in the browser, which echoes it back on every later request, giving the server a handle to session state kept elsewhere.

Performance is dominated by round trips. In HTTP/1.0 each object needs a new TCP connection: one RTT for the handshake, one for the request, so a page with ten images costs roughly 22 RTTs. HTTP/1.1 **persistent connections** reuse one connection, and browsers open about six in parallel, but one slow response still blocks the ones queued behind it on that connection: **head-of-line blocking**. **HTTP/2** multiplexes many streams over one TCP connection with binary framing and compresses headers (HPACK), but a single lost TCP segment stalls every stream. **HTTP/3** moves to QUIC over UDP, where streams are independent and loss on one does not delay the others.

**Caching** cuts round trips entirely. A response with \`Cache-Control: max-age\` can be reused; when it expires the client sends a **conditional GET** (\`If-Modified-Since\` or \`If-None-Match\` with the ETag) and gets a tiny \`304 Not Modified\` if nothing changed. Proxies and CDNs apply the same rules on behalf of many clients.

Read the MDN HTTP overview and the relevant sections of RFC 9110 (semantics) and RFC 9112 (HTTP/1.1 message syntax), then do the Kurose and Ross HTTP Wireshark lab and talk to a server by hand with \`nc\` or \`openssl s_client\`.`,
          resources: [
            {
              title: 'MDN — HTTP documentation',
              url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP',
              type: 'documentation',
              cost: 'free',
              provider: 'Mozilla',
              note: 'Overview, messages, caching, cookies and the evolution of HTTP pages.',
              primary: true,
            },
            {
              title: 'RFC 9110 — HTTP Semantics',
              url: 'https://www.rfc-editor.org/rfc/rfc9110',
              type: 'documentation',
              cost: 'free',
              provider: 'IETF',
              note: 'Read the sections on methods, status codes and conditional requests; skim the rest.',
            },
            {
              title: 'RFC 9112 — HTTP/1.1 (message syntax)',
              url: 'https://www.rfc-editor.org/rfc/rfc9112',
              type: 'documentation',
              cost: 'free',
              provider: 'IETF',
              note: 'Exact grammar of request and response messages; you need it when you write a server.',
            },
            {
              title: 'High Performance Browser Networking — Chapters 10-12 (HTTP/1.x, HTTP/2)',
              url: 'https://hpbn.co/',
              type: 'textbook',
              cost: 'free',
              provider: "O'Reilly / Ilya Grigorik",
            },
            {
              title: 'Kurose & Ross Wireshark lab: HTTP',
              url: 'https://gaia.cs.umass.edu/kurose_ross/wireshark.php',
              type: 'problem-set',
              cost: 'free',
              provider: 'Kurose & Ross (UMass)',
            },
          ],
          exercises: [
            {
              slug: 'http-by-hand',
              title: 'Speak HTTP by hand',
              prompt:
                'Use `nc example.com 80` (or `openssl s_client -connect example.com:443` for HTTPS) and type a GET request by hand. Record the full response. Then: send a request without a Host header and explain the response; send a HEAD request; send a conditional GET with If-Modified-Since set to a future date; send two requests on one connection and show both responses arrive. Save all transcripts.',
              kind: 'coding',
              difficulty: 1,
              hint: 'HTTP/1.1 requires a Host header; end the request with an empty line (two CRLFs).',
            },
            {
              slug: 'page-load-model',
              title: 'Model page-load time',
              prompt:
                'A page is a 100 kB HTML file referencing 12 images of 50 kB each, on a server 60 ms RTT away over a 20 Mb/s link. Compute total load time with (a) HTTP/1.0 serial connections, (b) HTTP/1.1 persistent with one connection, (c) HTTP/1.1 with six parallel persistent connections, (d) HTTP/2 multiplexing on one connection. Include handshake RTTs and transmission times; ignore slow start. Then write a Python script that fetches a real page and its sub-resources with and without connection reuse and compare the timings to your model.',
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'cache-behaviour',
              title: 'Observe caching and cookies',
              prompt:
                'In Wireshark (or the browser developer tools), load a page twice with the cache enabled. Identify: a response served from cache with no request sent; a conditional GET answered with 304; a response with max-age; and the Set-Cookie / Cookie exchange for a login. For each, quote the exact headers and explain what the client decided and why.',
              kind: 'data-analysis',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does HTTP need cookies if it is stateless, and what does the server store in the cookie?',
              answerOutline:
                'Statelessness means the server cannot associate requests; the cookie holds an identifier (not the state itself) that keys into server-side session data, returned by the browser on every request to that domain.',
            },
            {
              question: 'What is head-of-line blocking in HTTP/1.1, how does HTTP/2 address it, and what blocking remains?',
              answerOutline:
                'One slow response holds up later requests on the same connection. HTTP/2 multiplexes streams so responses interleave, but all streams share one TCP byte stream, so a lost segment stalls them all. HTTP/3 over QUIC removes that.',
            },
            {
              question: 'When does a client send a conditional GET and what are the two possible outcomes?',
              answerOutline:
                'When it has a stale cached copy with a validator (Last-Modified or ETag). Outcome: 304 Not Modified with no body (reuse cache), or 200 with the new body.',
            },
            {
              question: 'Give the sequence of RTTs for fetching one object over a fresh TLS 1.3 connection.',
              answerOutline:
                'One RTT for the TCP handshake, one for the TLS handshake, one for request/response: about three RTTs plus transmission time (QUIC merges the first two).',
            },
          ],
        },
        {
          slug: 'dns',
          title: 'DNS: the directory of the Internet',
          summary:
            'The hierarchical, distributed database that maps names to addresses: resolvers, authoritative servers, record types, caching and the attacks against it.',
          estimatedMinutes: 100,
          objectives: [
            'Trace a full iterative resolution from root servers to an authoritative answer with dig',
            'Explain the roles of stub resolver, recursive resolver, root, TLD and authoritative servers',
            'Interpret A, AAAA, NS, CNAME, MX and TXT records and TTLs',
            'Explain cache poisoning, DNSSEC and encrypted DNS (DoT/DoH) at the level of what they protect',
          ],
          concepts: [
            'Namespace hierarchy: root, TLD, second-level domains',
            'Recursive vs iterative queries',
            'Resource records: A, AAAA, NS, CNAME, MX, TXT, SOA',
            'Caching and TTL',
            'DNS message format over UDP port 53; truncation and TCP fallback',
            'Load balancing with DNS',
            'Cache poisoning, DNSSEC, DNS over TLS/HTTPS',
          ],
          explanation: `DNS is both a protocol and a globally distributed database. The namespace is a tree: the **root**, then **top-level domains** (\`com\`, \`uk\`), then zones delegated to organisations. Each zone is served by **authoritative** name servers listed as **NS records** in the parent. Nobody holds the whole database; everyone holds a piece and pointers downward.

When your application calls \`getaddrinfo\`, the **stub resolver** in the OS sends a query to a **recursive resolver** (your ISP's, or a public one such as 1.1.1.1). If the resolver has no cached answer it walks the tree **iteratively**: it asks a root server, which refers it to the \`com\` servers, which refer it to the domain's authoritative servers, which answer. Every step is cached with the record's **TTL**, so most queries never leave the resolver. This caching is what makes DNS fast and also what makes changes slow to propagate.

The **record types** encode more than addresses: \`A\` and \`AAAA\` give IPv4 and IPv6 addresses, \`CNAME\` aliases one name to another (used heavily by CDNs), \`MX\` names mail servers, \`TXT\` carries arbitrary data used by SPF and domain verification, and \`SOA\` describes the zone itself. Returning several A records in rotating order is the simplest form of **load balancing**; CDNs go further and answer differently depending on where the resolver is.

DNS runs over UDP port 53, with a 512-byte classic limit (larger with EDNS) and TCP fallback when a response is truncated. Because queries are unauthenticated, an attacker who guesses the 16-bit transaction ID and source port can **poison** a resolver's cache. **DNSSEC** signs records so resolvers can verify them; **DNS over TLS** and **DNS over HTTPS** encrypt the stub-to-resolver hop so the network cannot read or alter queries.

Read RFC 1034 (concepts) and skim RFC 1035 (format), then do the exercises with \`dig +trace\` and the DNS Wireshark lab.`,
          resources: [
            {
              title: 'RFC 1034 — Domain Names: Concepts and Facilities',
              url: 'https://www.rfc-editor.org/rfc/rfc1034',
              type: 'documentation',
              cost: 'free',
              provider: 'IETF',
              note: 'Sections 2-5 explain the namespace, resolvers and resolution. Still accurate after forty years.',
              primary: true,
            },
            {
              title: 'RFC 1035 — Domain Names: Implementation and Specification',
              url: 'https://www.rfc-editor.org/rfc/rfc1035',
              type: 'documentation',
              cost: 'free',
              provider: 'IETF',
              note: 'Section 4 gives the message format you need for the exercises.',
            },
            {
              title: 'Cloudflare Learning Center — What is DNS?',
              url: 'https://www.cloudflare.com/learning/dns/what-is-dns/',
              type: 'article',
              cost: 'free',
              provider: 'Cloudflare',
              note: 'Friendly overview with linked pages on record types, DNSSEC and DoH.',
            },
            {
              title: 'Kurose & Ross Wireshark lab: DNS',
              url: 'https://gaia.cs.umass.edu/kurose_ross/wireshark.php',
              type: 'problem-set',
              cost: 'free',
              provider: 'Kurose & Ross (UMass)',
            },
          ],
          exercises: [
            {
              slug: 'dig-trace',
              title: 'Trace a resolution with dig',
              prompt:
                'Run `dig +trace www.example.org` and annotate every step: which server was asked, what it returned (referral or answer), and which record types appear. Then query a CNAME-heavy site (a large news site) with `dig` and draw the alias chain to the final A records. Query the same name from two different public resolvers and explain any differences in the answers and TTLs.',
              kind: 'data-analysis',
              difficulty: 1,
            },
            {
              slug: 'dns-client-from-scratch',
              title: 'Write a DNS client from the RFC',
              prompt:
                'Using only Python sockets and the struct module (no DNS library), build a query packet for an A record per RFC 1035 section 4, send it over UDP to 8.8.8.8 or 1.1.1.1, and parse the response including name compression pointers. Test on five names including one with a CNAME chain. Print each resource record with its TTL. Verify against dig in Wireshark that your packet is byte-identical in structure.',
              kind: 'coding',
              difficulty: 3,
              hint: 'Name compression: a label byte with the top two bits set (0xC0) is a 14-bit pointer to an earlier offset in the message.',
            },
            {
              slug: 'ttl-propagation',
              title: 'Measure TTL and caching behaviour',
              prompt:
                'Query a name repeatedly from your resolver every 10 seconds for 5 minutes and record the TTL field in each answer. Plot TTL against time; explain the sawtooth. Then compute how long a DNS change with a 3600 s TTL could take to be seen by all users and describe the standard operational trick for cutting that time before a planned change.',
              kind: 'data-analysis',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'What is the difference between a recursive and an iterative query, and who sends each?',
              answerOutline:
                'Stub resolvers send recursive queries ("get me the full answer") to a recursive resolver; the resolver sends iterative queries to root, TLD and authoritative servers, each of which returns an answer or a referral.',
            },
            {
              question: 'Why does DNS use UDP, and when does it fall back to TCP?',
              answerOutline:
                'Single small request/response, no connection setup, resolvers handle retries; TCP when the response is truncated (TC bit), for zone transfers, and increasingly for privacy (DoT/DoH).',
            },
            {
              question: 'What does DNSSEC protect and what does it not protect?',
              answerOutline:
                'Integrity and authenticity of records (signatures chained from the root); it does not encrypt queries or hide which names you look up.',
            },
            {
              question: 'How can one hostname direct users in different countries to different servers?',
              answerOutline:
                'The authoritative server (or CDN) answers with different A records depending on the querying resolver\'s address or EDNS client subnet; short TTLs keep it adaptive.',
            },
          ],
        },
        {
          slug: 'email-and-messaging-protocols',
          title: 'Email: SMTP, IMAP and the fight against spoofing',
          summary:
            'How mail is relayed between servers with SMTP, fetched with IMAP, and authenticated with SPF, DKIM and DMARC.',
          estimatedMinutes: 80,
          objectives: [
            'Describe the path of an email from sender agent through SMTP relays to the recipient mailbox',
            'Conduct an SMTP conversation by hand and explain each command and reply code',
            'Contrast SMTP (push) with IMAP (pull) and explain why both exist',
            'Explain what SPF, DKIM and DMARC each verify and read their DNS records',
          ],
          concepts: [
            'User agents, mail servers, message queues',
            'SMTP commands: HELO/EHLO, MAIL FROM, RCPT TO, DATA; reply codes',
            'Envelope vs message headers',
            'Internet Message Format (RFC 5322) and MIME',
            'IMAP: server-side mailbox state',
            'STARTTLS and submission port 587',
            'SPF, DKIM, DMARC',
          ],
          explanation: `Email predates the web and still moves a large share of the world's serious communication, so it is worth understanding why it is shaped as it is. Three components: **user agents** (your mail client), **mail servers** holding mailboxes and outgoing queues, and **SMTP**, the protocol that pushes a message from one server to the next.

SMTP (RFC 5321) is a line-oriented, 7-bit ASCII protocol over TCP port 25 (server to server) or 587 (client submission, with authentication). After the greeting, the client sends \`EHLO\`, \`MAIL FROM:<sender>\`, one or more \`RCPT TO:<recipient>\`, then \`DATA\` followed by the message terminated by a line containing a single dot. Each command gets a three-digit reply code; 2xx success, 4xx temporary failure (try later), 5xx permanent. Note the separation between the **envelope** (the addresses in MAIL FROM and RCPT TO, used for routing) and the **headers** inside the message (From:, To:, Subject:), which are just data. That separation is why spoofing the From: header is trivial.

Receiving is different: SMTP pushes, but your client **pulls** with **IMAP** (RFC 9051), which keeps mailbox state on the server so several devices see the same folders and flags. The message itself follows the **Internet Message Format** (RFC 5322) with **MIME** extensions encoding attachments and non-ASCII text in 7-bit form.

Because anyone can connect to port 25 and claim any sender, three DNS-based mechanisms were bolted on. **SPF** (a TXT record) lists which IPs may send mail for a domain; **DKIM** signs the headers and body with a key published in DNS; **DMARC** tells receivers what to do when both fail and where to send reports. Reading these records for real domains is the exercise.

Work through RFC 5321 sections 3 and 4 and the Cloudflare email-security explainers, then do the hands-on SMTP session against a server you are permitted to use (a local test server such as Python's \`aiosmtpd\` is simplest).`,
          resources: [
            {
              title: 'RFC 5321 — Simple Mail Transfer Protocol',
              url: 'https://www.rfc-editor.org/rfc/rfc5321',
              type: 'documentation',
              cost: 'free',
              provider: 'IETF',
              note: 'Sections 2-4; the examples in appendix D show complete sessions.',
              primary: true,
            },
            {
              title: 'RFC 5322 — Internet Message Format',
              url: 'https://www.rfc-editor.org/rfc/rfc5322',
              type: 'documentation',
              cost: 'free',
              provider: 'IETF',
              note: 'Header syntax; skim section 3.',
            },
            {
              title: 'RFC 9051 — IMAP4rev2',
              url: 'https://www.rfc-editor.org/rfc/rfc9051',
              type: 'documentation',
              cost: 'free',
              provider: 'IETF',
              note: 'Read the overview and the example session only.',
            },
            {
              title: 'RFC 7489 — DMARC (with references to SPF RFC 7208 and DKIM RFC 6376)',
              url: 'https://www.rfc-editor.org/rfc/rfc7489',
              type: 'documentation',
              cost: 'free',
              provider: 'IETF',
            },
            {
              title: 'Kurose & Ross chapter 2 videos (email section)',
              url: 'https://gaia.cs.umass.edu/kurose_ross/lectures.php',
              type: 'lecture',
              cost: 'free',
              provider: 'Kurose & Ross (UMass)',
            },
          ],
          exercises: [
            {
              slug: 'smtp-by-hand',
              title: 'An SMTP session by hand',
              prompt:
                'Start a local test SMTP server (`python -m aiosmtpd -n` or the older `smtpd` DebuggingServer) on port 8025. Using nc, conduct a full session: EHLO, MAIL FROM, two RCPT TO, DATA with headers and a body, QUIT. Record every reply code. Then deliberately trigger a 5xx (bad command sequence) and a syntax error and explain the codes. Finally send a message whose From: header differs from MAIL FROM and show that the server accepts it.',
              kind: 'coding',
              difficulty: 1,
            },
            {
              slug: 'read-auth-records',
              title: 'Read SPF, DKIM and DMARC records',
              prompt:
                'For five real domains (your email provider, a bank, a university, a newspaper, a small business), use dig to fetch the SPF TXT record, the DMARC record at _dmarc.<domain>, and, from a real message\'s DKIM-Signature header, the selector and the DKIM public key record. Tabulate the SPF mechanisms, the DMARC policy (none/quarantine/reject) and whether DKIM is present. Explain what a spoofed mail from each domain would experience at a receiver that enforces these.',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'raw-message-dissection',
              title: 'Dissect a raw email',
              prompt:
                'Export a real message with an attachment as raw source. Identify the Received: chain (list every relay with timestamp and compute the delay at each hop), the MIME multipart structure, the Content-Transfer-Encoding of each part, and the Authentication-Results header. Write a short script that parses the Received headers and prints the hop-by-hop delays.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What is the difference between the SMTP envelope and the message headers, and why does it matter for security?',
              answerOutline:
                'Envelope (MAIL FROM/RCPT TO) is used for routing and is not shown to the user; headers are message content and can say anything. So the displayed From: is unverified unless DKIM/DMARC are checked.',
            },
            {
              question: 'Why is SMTP push and IMAP pull?',
              answerOutline:
                'The sender\'s server must initiate delivery because the recipient does not know mail is coming; the recipient\'s client is intermittently connected, so the mailbox server holds mail until the client pulls.',
            },
            {
              question: 'What do SPF, DKIM and DMARC each check?',
              answerOutline:
                'SPF: is the sending IP authorised for the envelope domain. DKIM: is the message signed by the domain\'s key and unmodified. DMARC: do SPF/DKIM align with the From: header domain, and what policy to apply on failure.',
            },
          ],
        },
        {
          slug: 'socket-programming',
          title: 'Socket programming: UDP and TCP clients and servers',
          summary:
            'The Berkeley sockets API: how a process names, connects and exchanges bytes, and the bugs every socket program has until you learn about partial reads and byte order.',
          estimatedMinutes: 150,
          objectives: [
            'Write a UDP client/server and a TCP client/server in Python and in C',
            'Explain socket, bind, listen, accept, connect, send/recv and the lifecycle of a connection',
            'Handle partial reads, message framing and network byte order correctly',
            'Use getaddrinfo to write code that works with both IPv4 and IPv6',
          ],
          concepts: [
            'Socket as a file descriptor; address families and socket types',
            'bind, listen, accept, connect',
            'UDP datagrams vs TCP byte stream',
            'Partial reads and message framing (length prefix, delimiter)',
            'Network byte order (htons/ntohs)',
            'getaddrinfo and dual-stack code',
            'Blocking vs non-blocking sockets; timeouts',
          ],
          explanation: `The **socket** is the interface between an application and the transport layer, and it has barely changed since 4.2BSD in 1983. A socket is a file descriptor; you create one with \`socket(family, type, protocol)\` where the family is \`AF_INET\` or \`AF_INET6\` and the type is \`SOCK_STREAM\` (TCP) or \`SOCK_DGRAM\` (UDP).

**UDP** is the simple case. A server \`bind\`s to a port and loops on \`recvfrom\`, which returns one datagram and the sender's address; it replies with \`sendto\`. There is no connection: each datagram is independent, may be lost, duplicated or reordered, and arrives whole or not at all.

**TCP** adds a connection. The server \`bind\`s, calls \`listen\` to mark the socket passive, and \`accept\`s, which blocks until a client \`connect\`s and returns a *new* socket for that one conversation. Both sides then \`send\` and \`recv\`. The single most important fact, and the source of most beginner bugs, is that TCP is a **byte stream with no message boundaries**. If the client sends "hello" and "world", the server may receive "hel", then "loworld". \`recv(n)\` returns *up to* n bytes. Your protocol must therefore **frame** messages: a length prefix, a delimiter such as \`\\r\\n\` (HTTP) or a fixed size, and you must loop until the whole message has arrived. Equally, \`send\` may send fewer bytes than asked; use \`sendall\` in Python or loop in C.

Multi-byte integers in headers must be in **network byte order** (big-endian): \`htons\`, \`htonl\` in C, \`struct.pack('!H', ...)\` in Python. Use \`getaddrinfo\` rather than hard-coding addresses, so the same code handles IPv4, IPv6 and hostnames.

Beej's Guide is the canonical tutorial for C; read chapters 1-7 and type the examples in. The Python socket HOWTO covers the same ground in a tenth of the space. Then build the exercises and watch your own packets in Wireshark: seeing the SYN, the data and the FIN of code you wrote is the point.`,
          resources: [
            {
              title: "Beej's Guide to Network Programming",
              url: 'https://beej.us/guide/bgnet/',
              type: 'textbook',
              cost: 'free',
              provider: 'Brian "Beej" Hall',
              note: 'Chapters 1-7: the C sockets API, getaddrinfo, the client/server examples, partial sends.',
              primary: true,
            },
            {
              title: 'Python Socket Programming HOWTO',
              url: 'https://docs.python.org/3/howto/sockets.html',
              type: 'documentation',
              cost: 'free',
              provider: 'Python Software Foundation',
              note: 'Short and precise on the byte-stream pitfall.',
            },
            {
              title: 'Python socket module reference',
              url: 'https://docs.python.org/3/library/socket.html',
              type: 'documentation',
              cost: 'free',
              provider: 'Python Software Foundation',
            },
            {
              title: 'socket(2) and related Linux man pages',
              url: 'https://man7.org/linux/man-pages/man2/socket.2.html',
              type: 'documentation',
              cost: 'free',
              provider: 'man7.org',
              note: 'Also read tcp(7), ip(7) and getaddrinfo(3).',
            },
            {
              title: 'Stanford CS144 lab 0 (networking warm-up: fetch a web page with sockets)',
              url: 'https://cs144.github.io/',
              type: 'problem-set',
              cost: 'free',
              provider: 'Stanford',
              note: 'The "webget" checkpoint is a good C++ socket exercise with a reference test.',
            },
          ],
          exercises: [
            {
              slug: 'udp-echo-and-loss',
              title: 'UDP echo with simulated loss',
              prompt:
                'Write a UDP echo server and a client that sends 1000 numbered datagrams and measures RTT per datagram. Run them on one machine, then add `tc qdisc add dev lo root netem loss 10% delay 50ms 20ms` (Linux) or an equivalent, and rerun. Report loss rate, RTT mean and standard deviation, and how many replies arrived out of order. Remove the netem rule afterwards.',
              kind: 'coding',
              difficulty: 1,
            },
            {
              slug: 'framed-tcp-protocol',
              title: 'A length-prefixed TCP protocol',
              prompt:
                'Implement a TCP key-value server (commands SET key value, GET key, DEL key) where every message is a 4-byte big-endian length followed by a UTF-8 payload. Write a client that sends 10,000 requests over one connection. Deliberately make the server read with recv(1) to prove framing works regardless of chunking, then measure requests per second with recv(4096). Then break the framing (send without the length prefix) and describe exactly how it fails.',
              kind: 'coding',
              difficulty: 2,
              hint: 'Write a recv_exactly(sock, n) helper that loops until n bytes are collected or the peer closes.',
            },
            {
              slug: 'beej-in-c',
              title: 'Beej\'s client and server in C',
              prompt:
                'Type in, compile and run Beej\'s stream server and client (chapter 6) using getaddrinfo. Modify the server to fork a child per connection (or use pthreads) and the client to send a file. Verify with Wireshark that the three-way handshake, data segments and the four-way close appear as the textbook says. Then test it over IPv6 (::1) without changing the code and explain why it works.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'webget',
              title: 'Fetch a web page with raw sockets',
              prompt:
                'Write a program (Python or C++) that takes a hostname and path, opens a TCP connection to port 80, sends a correct HTTP/1.1 GET with Host and Connection: close headers, and prints the body. It must loop on recv until EOF and handle a response of several megabytes. Test against the CS144 webget test URL and at least two other sites; compare output to curl.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why can a single send() on TCP arrive as several recv() calls, or several sends as one recv()?',
              answerOutline:
                'TCP is a byte stream; the kernel segments and coalesces bytes freely. Message boundaries exist only if the application protocol frames them.',
            },
            {
              question: 'What does accept() return and why is it a different socket from the listening one?',
              answerOutline:
                'A new connected socket for one client; the listening socket keeps accepting further connections, so the server can serve many clients concurrently.',
            },
            {
              question: 'Why must port numbers in a packed header use htons()?',
              answerOutline:
                'Network byte order is big-endian; most hosts are little-endian. Without conversion the peer reads the bytes reversed.',
            },
            {
              question: 'Name three things that can happen to a UDP datagram that cannot happen to TCP bytes.',
              answerOutline:
                'It can be lost silently, duplicated, or arrive out of order (and it is either delivered whole or not at all).',
            },
          ],
        },
        {
          slug: 'building-a-concurrent-http-server',
          title: 'Building a concurrent HTTP server',
          summary:
            'Turn the socket API into a real server: parse HTTP correctly, serve files safely, handle many clients with threads or an event loop, and measure it.',
          estimatedMinutes: 150,
          objectives: [
            'Parse HTTP/1.1 requests robustly, including persistent connections and Content-Length bodies',
            'Serve static files with correct status codes, content types and protection against path traversal',
            'Compare thread-per-connection, thread pool and event-driven (select/epoll/asyncio) designs',
            'Load-test a server and interpret throughput, latency percentiles and error rates',
          ],
          concepts: [
            'HTTP request parsing state machine',
            'Persistent connections and Connection: close',
            'Path traversal and canonicalisation',
            'Thread-per-connection vs thread pool',
            'Event-driven I/O: select, epoll, asyncio',
            'The C10K problem',
            'Load testing: throughput, p50/p99 latency',
          ],
          explanation: `A web server is the natural first real network program: the protocol is text, the clients are everywhere, and every design decision in concurrent servers shows up. Start with correctness. Read bytes until you have seen the blank line (\`\\r\\n\\r\\n\`) that ends the headers; parse the request line and headers; if there is a \`Content-Length\`, read exactly that many more bytes as the body. Map the path to a file under a document root **after canonicalising it**, and reject anything that escapes the root (\`../\` attacks are the oldest web vulnerability). Reply with the right status (200, 404, 403, 405, 500), a \`Content-Type\` from the extension and a \`Content-Length\`, and keep the connection open for the next request unless the client said \`Connection: close\`.

Then concurrency. The simplest server handles one client at a time; a slow client stalls everyone. **Thread-per-connection** is easy and fine for hundreds of clients, but thread creation and memory limit it, so real servers use a **thread pool** of fixed size with a queue of accepted connections. The alternative is **event-driven** I/O: one thread, non-blocking sockets and a readiness notification call (\`select\`, \`poll\`, or \`epoll\` on Linux), reacting to whichever socket is ready. This is how nginx, Node and Python's \`asyncio\` serve tens of thousands of connections, the "C10K" problem of the early 2000s. The trade-off is that any blocking call in an event handler freezes the whole server.

Finally, measure. A load generator such as \`wrk\` or \`ab\`, or a Python script with many threads, gives requests per second and a **latency distribution**; always report the 99th percentile, not just the mean, because tail latency is what users notice. Vary the number of concurrent clients and find where each design saturates.

This lesson's exercises build toward the module project. The Operating Systems subject covers the thread and event-loop mechanics in depth; here you apply them.`,
          resources: [
            {
              title: 'RFC 9112 — HTTP/1.1 (message parsing rules, section 2-6)',
              url: 'https://www.rfc-editor.org/rfc/rfc9112',
              type: 'documentation',
              cost: 'free',
              provider: 'IETF',
              primary: true,
            },
            {
              title: "Beej's Guide — chapter 7 (slightly advanced techniques: blocking, poll, select)",
              url: 'https://beej.us/guide/bgnet/',
              type: 'textbook',
              cost: 'free',
              provider: 'Brian "Beej" Hall',
            },
            {
              title: 'Python asyncio documentation (streams and servers)',
              url: 'https://docs.python.org/3/library/asyncio.html',
              type: 'documentation',
              cost: 'free',
              provider: 'Python Software Foundation',
            },
            {
              title: 'epoll(7) man page',
              url: 'https://man7.org/linux/man-pages/man7/epoll.7.html',
              type: 'documentation',
              cost: 'free',
              provider: 'man7.org',
            },
          ],
          exercises: [
            {
              slug: 'http-parser-tests',
              title: 'A tested HTTP request parser',
              prompt:
                'Write an HTTP/1.1 request parser as a pure function over a byte buffer that returns either a parsed request and the number of bytes consumed, or "need more data", or an error. Write unit tests for: a request split across three chunks; two pipelined requests in one chunk; a request with a Content-Length body; headers in mixed case; a malformed request line; an oversized header (should error, not grow unbounded). All tests must pass before you touch sockets.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'static-file-server',
              title: 'A safe static file server',
              prompt:
                'Build a server that serves files from a directory with correct status codes, Content-Type for html/css/js/png/jpg/txt, Content-Length, HEAD support and persistent connections. Test it with a browser and curl. Then attack it: request `/../etc/passwd`, `/%2e%2e/`, a directory, a 200 MB file, and a request with no Host header. Document what happened and fix each problem.',
              kind: 'coding',
              difficulty: 2,
              hint: 'Resolve the real path (os.path.realpath) and check it starts with the real document root before opening anything.',
            },
            {
              slug: 'three-concurrency-models',
              title: 'Three concurrency models, one benchmark',
              prompt:
                'Implement your server three ways: thread per connection, a thread pool of 16, and asyncio (or select/epoll). Load-test each with 1, 10, 100 and 1000 concurrent clients requesting a 10 kB file 10,000 times. Record requests/s, p50 and p99 latency, CPU usage and memory. Plot the results and explain where each model breaks down. Add a handler that sleeps 100 ms and show which model collapses.',
              kind: 'coding',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'How does a server know where one HTTP request ends and the next begins on a persistent connection?',
              answerOutline:
                'Headers end at the first empty line (CRLF CRLF); the body length comes from Content-Length (or chunked encoding). Anything after that is the next request.',
            },
            {
              question: 'What is the main advantage and the main hazard of an event-driven server?',
              answerOutline:
                'Advantage: one thread handles thousands of idle connections cheaply. Hazard: any blocking call (disk read, DNS, a slow computation) stalls every connection.',
            },
            {
              question: 'Why report p99 latency rather than mean?',
              answerOutline:
                'A page fetches many objects; the slowest determines completion, so users experience the tail. Means hide queueing spikes.',
            },
            {
              question: 'How do you prevent path traversal when mapping URLs to files?',
              answerOutline:
                'Decode the path, canonicalise it (resolve .. and symlinks), and verify the result is inside the document root; reject otherwise with 403/404.',
            },
          ],
          relatedLessons: ['operating-systems/concurrency/concurrency-bugs-and-event-based'],
        },
      ],
      project: {
        slug: 'http-server',
        title: 'An HTTP/1.1 server with a test suite',
        description: `Build a production-shaped HTTP/1.1 static file server in Python or C: correct parsing per RFC 9112, persistent connections, HEAD and GET, conditional GET with ETag and 304, range requests for one range, directory index files, path-traversal protection, access logging in Common Log Format, and a concurrency model of your choice. Verify it with an automated test suite (requests split across chunks, pipelining, malformed input, 1000 concurrent clients) and a Wireshark capture showing persistent connections being reused.`,
        deliverables: [
          'Source repository with README and build/run instructions',
          'Automated test suite with at least 25 cases covering parsing, status codes and security',
          'Benchmark report: requests/s and p50/p99 latency for 1, 10, 100, 1000 clients',
          'Annotated Wireshark capture of a browser session against the server',
        ],
        estimatedHours: 12,
        stretchGoals: [
          'Add chunked transfer encoding and gzip Content-Encoding',
          'Serve over TLS using the ssl module or OpenSSL',
          'Implement HTTP/1.1 pipelining correctly and demonstrate it with a custom client',
        ],
      },
    },
    {
      slug: 'transport-layer',
      title: 'Transport Layer: UDP, TCP and Congestion Control',
      description:
        'How two processes get a reliable, ordered, flow- and congestion-controlled byte stream out of an unreliable network, and how to build one yourself.',
      lessons: [
        {
          slug: 'multiplexing-and-udp',
          title: 'Transport services, multiplexing and UDP',
          summary:
            'What the transport layer adds to IP (ports, checksums), how demultiplexing works, and why many applications choose UDP on purpose.',
          estimatedMinutes: 70,
          objectives: [
            'Explain multiplexing and demultiplexing by port numbers for UDP and TCP sockets',
            'Describe the UDP header and compute the Internet checksum by hand',
            'Give three reasons an application would choose UDP over TCP',
            'Explain how a TCP server distinguishes connections that all arrive on port 80',
          ],
          concepts: [
            'Transport vs network layer: process-to-process vs host-to-host',
            'Port numbers; well-known, registered, ephemeral',
            'Connectionless demultiplexing (2-tuple) vs connection-oriented (4-tuple)',
            'UDP header: ports, length, checksum',
            "The Internet checksum (one's complement sum)",
            'Why UDP: no handshake, no congestion control, small header, app controls timing',
            'DNS, QUIC, RTP and games over UDP',
          ],
          explanation: `IP delivers datagrams from one host to another. The **transport layer** extends that to **process to process**. Each socket is identified by a **port number**; the transport header carries source and destination ports, and the receiving kernel uses them to **demultiplex** incoming segments to the right socket. The two transports do it differently. A UDP socket is identified by the destination (IP, port) alone, so datagrams from any sender land in the same socket. A TCP socket is identified by the full **4-tuple** (source IP, source port, destination IP, destination port): a web server has one listening socket on port 80 but a separate connected socket per client, and each incoming segment goes to the one matching all four fields.

**UDP** (RFC 768) adds almost nothing to IP: an 8-byte header with source port, destination port, length and a **checksum**. The checksum is the Internet checksum used throughout the stack: split the data into 16-bit words, add them with end-around carry (one's complement arithmetic), and take the one's complement of the sum; the receiver adds everything including the checksum and expects all ones. It detects most, not all, errors, and because it covers a pseudo-header including the IP addresses it also catches misdelivery.

Why would anyone use a protocol that can lose, reorder and duplicate packets? Because the alternative costs: TCP's handshake adds an RTT before any data, its congestion control slows down on loss, its in-order delivery delays everything behind a lost segment, and its header is 20 bytes or more. DNS wants one round trip; real-time voice and games would rather drop a late packet than wait for it; QUIC builds its own reliability and congestion control on top of UDP precisely so it can innovate without touching kernels and middleboxes.

Read RFC 768 (it is three pages) and the Kurose and Ross transport-layer introduction, then do the checksum and demultiplexing exercises until the 4-tuple idea is automatic.`,
          resources: [
            {
              title: 'RFC 768 — User Datagram Protocol',
              url: 'https://www.rfc-editor.org/rfc/rfc768',
              type: 'documentation',
              cost: 'free',
              provider: 'IETF',
              note: 'The whole thing, including the pseudo-header checksum rule.',
              primary: true,
            },
            {
              title: 'Kurose & Ross chapter 3 videos (transport-layer services, multiplexing, UDP)',
              url: 'https://gaia.cs.umass.edu/kurose_ross/lectures.php',
              type: 'lecture',
              cost: 'free',
              provider: 'Kurose & Ross (UMass)',
            },
            {
              title: 'A Systems Approach — Chapter 5.1 (Simple Demultiplexer: UDP)',
              url: 'https://book.systemsapproach.org/',
              type: 'textbook',
              cost: 'free',
              provider: 'Peterson & Davie',
            },
            {
              title: 'Kurose & Ross Wireshark lab: UDP',
              url: 'https://gaia.cs.umass.edu/kurose_ross/wireshark.php',
              type: 'problem-set',
              cost: 'free',
              provider: 'Kurose & Ross (UMass)',
            },
          ],
          exercises: [
            {
              slug: 'checksum-by-hand-and-code',
              title: 'Internet checksum by hand and in code',
              prompt:
                'Compute the Internet checksum of the three 16-bit words 0x4500, 0x0073, 0x0000 by hand, showing the end-around carry. Then implement the checksum in Python over arbitrary byte strings (odd length padded), verify it against the UDP checksum of a captured datagram in Wireshark (remember the pseudo-header), and demonstrate one two-bit error pattern the checksum fails to detect.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'demux-observation',
              title: 'Observe demultiplexing',
              prompt:
                'Run your TCP server from the socket lesson and connect three clients from the same machine. Use `ss -tnp` to list the four-tuples; identify the listening socket and the three connected ones and their ephemeral ports. Then do the same with a UDP server and three clients and explain why `ss -unp` shows only one server socket.',
              kind: 'data-analysis',
              difficulty: 1,
            },
            {
              slug: 'udp-vs-tcp-choice',
              title: 'Choose the transport',
              prompt:
                'For each application, argue in a short paragraph for UDP or TCP and what the application must add on top: a multiplayer first-person game sending player positions 60 times per second; a software update download; a video call; a DNS resolver; a stock-trading feed where every message must arrive in order; an IoT sensor sending one reading a minute over a flaky link.',
              kind: 'writing',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'Two clients on the same host connect to the same web server. How does the server tell their segments apart?',
              answerOutline:
                'By the full 4-tuple; the clients have different ephemeral source ports, so each connected socket matches a distinct tuple.',
            },
            {
              question: 'What does the UDP checksum cover and why include a pseudo-header?',
              answerOutline:
                'UDP header, data and a pseudo-header with the IP source/destination addresses and protocol; so a datagram delivered to the wrong host or wrong protocol is detected.',
            },
            {
              question: 'Give three costs of TCP that motivate UDP.',
              answerOutline:
                'Connection setup RTT, congestion-control throttling and in-order delivery delay (head-of-line), plus connection state and larger headers.',
            },
          ],
        },
        {
          slug: 'reliable-data-transfer',
          title: 'Principles of reliable data transfer',
          summary:
            'Building reliability over an unreliable channel step by step: acknowledgements, sequence numbers, timeouts, and pipelined Go-Back-N and Selective Repeat.',
          estimatedMinutes: 120,
          objectives: [
            'Derive the stop-and-wait protocol from the failure modes of the channel (corruption, loss, duplication)',
            'Compute the utilisation of stop-and-wait and of a pipelined protocol with window N',
            'Explain Go-Back-N and Selective Repeat sender and receiver behaviour, including the sequence-number-space constraint',
            'Implement a reliable transfer protocol over UDP and test it under loss, delay and reordering',
          ],
          concepts: [
            'ACK/NAK, checksums, sequence numbers',
            'Stop-and-wait (rdt3.0 / alternating bit)',
            'Timeouts and premature timeouts',
            'Utilisation U = (L/R) / (RTT + L/R)',
            'Pipelining and the sliding window',
            'Go-Back-N: cumulative ACKs, single timer',
            'Selective Repeat: per-packet ACKs and timers; window ≤ half the sequence space',
          ],
          explanation: `Reliable transfer is the heart of TCP, and the cleanest way to understand it is to build it up from a perfect channel, adding one defence per failure. If the channel can **corrupt** bits, add a checksum and have the receiver send an **ACK** or **NAK**. If ACKs themselves can be corrupted, the sender cannot tell whether to retransmit, so give each packet a **sequence number**; a duplicate is then recognised and discarded. If packets can be **lost**, the sender needs a **timer** and retransmits on expiry. Set the timeout too short and you get needless duplicates (handled by sequence numbers); too long and you wait. With one bit of sequence number this is the **alternating-bit** or **stop-and-wait** protocol, and it is correct.

It is also hopelessly slow. On a 1 Gb/s link with 30 ms RTT, sending 1000-byte packets one at a time gives utilisation $U = \\frac{L/R}{RTT + L/R} = \\frac{8\\,\\mu s}{30.008\\,ms} \\approx 0.027\\%$. The fix is **pipelining**: allow up to $N$ unacknowledged packets in flight, which multiplies utilisation by $N$ until the pipe is full at $N = RTT \\cdot R / L$ (the bandwidth-delay product again).

Two canonical pipelined designs. **Go-Back-N** keeps a window of $N$ packets, uses **cumulative** ACKs ("I have everything up to $n$") and a single timer for the oldest unacknowledged packet; on timeout it resends the whole window. The receiver is trivial: it accepts only the next in-order packet and discards anything else. **Selective Repeat** acknowledges each packet individually, keeps a timer per packet, and the receiver buffers out-of-order packets. It wastes less bandwidth but needs more state, and the window must be at most **half the sequence-number space**, otherwise a receiver cannot distinguish a retransmission of an old packet from a new one with the same number.

Study the finite state machines in Kurose and Ross chapter 3 until you can draw them, use the interactive GBN/SR animations, then implement both over UDP against a lossy \`netem\` link. The implementation is the first part of the module project and reappears in the capstone.`,
          resources: [
            {
              title: 'Kurose & Ross chapter 3 videos (principles of reliable data transfer, GBN, SR)',
              url: 'https://gaia.cs.umass.edu/kurose_ross/lectures.php',
              type: 'lecture',
              cost: 'free',
              provider: 'Kurose & Ross (UMass)',
              primary: true,
            },
            {
              title: 'Kurose & Ross interactive animations and problems (Go-Back-N, Selective Repeat)',
              url: 'https://gaia.cs.umass.edu/kurose_ross/interactive/',
              type: 'interactive',
              cost: 'free',
              provider: 'Kurose & Ross (UMass)',
            },
            {
              title: 'A Systems Approach — Chapter 2.5 (Reliable Transmission: stop-and-wait, sliding window)',
              url: 'https://book.systemsapproach.org/',
              type: 'textbook',
              cost: 'free',
              provider: 'Peterson & Davie',
            },
            {
              title: 'tc-netem(8): network emulation (delay, loss, reordering)',
              url: 'https://man7.org/linux/man-pages/man8/tc-netem.8.html',
              type: 'documentation',
              cost: 'free',
              provider: 'man7.org',
            },
          ],
          exercises: [
            {
              slug: 'utilisation-and-window',
              title: 'Utilisation and window size',
              prompt:
                'For a 100 Mb/s link, 1500-byte packets and RTTs of 1 ms, 20 ms and 200 ms: compute stop-and-wait utilisation and the window N needed to reach 100 % utilisation. Then, for Selective Repeat with a 4-bit sequence number, state the maximum window and construct a concrete scenario (sequence of sends, losses and ACK losses) in which a window of 9 causes the receiver to accept a stale duplicate as new data.',
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'implement-gbn-and-sr',
              title: 'Implement Go-Back-N and Selective Repeat over UDP',
              prompt:
                'Implement a file-transfer sender and receiver over UDP with a 32-bit sequence number, a checksum and a configurable window. First Go-Back-N, then Selective Repeat. Transfer a 10 MB file across a netem link with 2 % loss and 50 ms delay for windows of 1, 8, 32 and 128. Record throughput and number of retransmissions for each protocol and window; verify the received file by SHA-256. Explain the shape of the throughput-vs-window curve and why SR retransmits fewer packets.',
              kind: 'coding',
              difficulty: 3,
              hint: 'Use a single thread with select() and a timeout rather than threads; it keeps the state machine visible.',
            },
            {
              slug: 'fsm-trace',
              title: 'Trace the protocol FSMs',
              prompt:
                'Using the rdt3.0 sender and receiver FSMs, trace by hand a scenario where the first data packet is delivered, its ACK is lost, the timer expires, and the retransmission is delivered. Show every state, the packets on the wire and what the receiver does with the duplicate. Then repeat for a premature timeout where the original ACK arrives after the retransmission.',
              kind: 'problem',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'Why are sequence numbers needed even if the channel never loses packets but can corrupt ACKs?',
              answerOutline:
                'A corrupted ACK forces the sender to retransmit; without sequence numbers the receiver cannot tell the retransmission from new data and would deliver a duplicate.',
            },
            {
              question: 'How does the GBN receiver handle an out-of-order packet, and why is this acceptable?',
              answerOutline:
                'Discards it and re-ACKs the last in-order packet. Simple, no buffering; the cost is retransmitting the whole window after a single loss.',
            },
            {
              question: 'Why must the Selective Repeat window be at most half the sequence space?',
              answerOutline:
                'The receiver window can be a full window ahead of the sender\'s oldest unacknowledged packet; if windows overlap in sequence numbers, a retransmitted old packet is mistaken for a new one.',
            },
            {
              question: 'What limits throughput of a pipelined protocol once the window exceeds the bandwidth-delay product?',
              answerOutline:
                'The link rate itself; extra window only fills queues (and later, congestion control will restrain it).',
            },
          ],
        },
        {
          slug: 'tcp-connections-and-reliability',
          title: 'TCP: connections, segments, RTT estimation and flow control',
          summary:
            'The real protocol: three-way handshake, segment format, how TCP estimates RTT and sets timeouts, fast retransmit, flow control and connection teardown.',
          estimatedMinutes: 120,
          objectives: [
            'Read a TCP segment header and explain every field, including options such as MSS, SACK and window scaling',
            'Explain the three-way handshake, the four-way close and the TIME_WAIT state',
            'Compute EstimatedRTT, DevRTT and the retransmission timeout from samples using the RFC 6298 formulas',
            'Describe fast retransmit, cumulative/selective acknowledgement and receiver flow control',
          ],
          concepts: [
            'Segment header: sequence/ack numbers, flags, window, options',
            'Byte-stream sequence numbers; MSS',
            'Three-way handshake (SYN, SYN-ACK, ACK) and SYN cookies',
            'EWMA RTT estimation and RTO = EstimatedRTT + 4·DevRTT',
            'Cumulative ACKs, duplicate ACKs, fast retransmit, SACK',
            'Flow control: receive window (rwnd)',
            'FIN/ACK teardown, TIME_WAIT, RST',
          ],
          explanation: `TCP (RFC 9293) is reliable transfer as engineered for the real world. Sequence numbers count **bytes**, not packets, and the ACK number is the next byte the receiver expects (**cumulative**). A connection begins with the **three-way handshake**: the client sends SYN with a random initial sequence number, the server replies SYN-ACK with its own, and the client ACKs; the random numbers defend against stale segments and simple spoofing, and the server may defer allocating state using **SYN cookies** so a flood of SYNs cannot exhaust it. Teardown is a pair of FIN/ACK exchanges; the side that closes first waits in **TIME_WAIT** for twice the maximum segment lifetime so late segments cannot corrupt a new connection using the same 4-tuple.

TCP's hybrid of GBN and SR: the sender keeps one timer for the oldest unacknowledged byte, retransmits only that segment on timeout, and receivers typically buffer out-of-order data and, with the **SACK** option, tell the sender exactly which blocks arrived. Three **duplicate ACKs** are taken as evidence of a loss and trigger **fast retransmit** before the timer expires; this matters because timeouts are long.

How long? TCP measures RTT samples and keeps an exponentially weighted average, $\\text{EstimatedRTT} = (1-\\alpha)\\,\\text{EstimatedRTT} + \\alpha\\,\\text{SampleRTT}$ with $\\alpha = 1/8$, plus a deviation estimate $\\text{DevRTT} = (1-\\beta)\\,\\text{DevRTT} + \\beta\\,|\\text{SampleRTT} - \\text{EstimatedRTT}|$ with $\\beta = 1/4$, and sets $\\text{RTO} = \\text{EstimatedRTT} + 4\\,\\text{DevRTT}$ (RFC 6298). Samples from retransmitted segments are ignored (Karn's algorithm) because they are ambiguous, and the RTO doubles on each timeout.

**Flow control** is separate from congestion control: the receiver advertises its free buffer space in the **window** field, and the sender never has more than that many bytes outstanding. With **window scaling** this can exceed the 16-bit field's 64 kB, which a long fat pipe requires.

Read RFC 9293 sections 3.1-3.8, do the TCP Wireshark lab, and study a capture of a large download until you can follow sequence and ACK numbers by eye.`,
          resources: [
            {
              title: 'RFC 9293 — Transmission Control Protocol (TCP)',
              url: 'https://www.rfc-editor.org/rfc/rfc9293',
              type: 'documentation',
              cost: 'free',
              provider: 'IETF',
              note: 'The 2022 consolidation of RFC 793 and its updates. Sections 3.1 (header), 3.5 (connection establishment), 3.6 (closing), 3.8 (data communication).',
              primary: true,
            },
            {
              title: "RFC 6298 — Computing TCP's Retransmission Timer",
              url: 'https://www.rfc-editor.org/rfc/rfc6298',
              type: 'documentation',
              cost: 'free',
              provider: 'IETF',
            },
            {
              title: 'Kurose & Ross Wireshark lab: TCP',
              url: 'https://gaia.cs.umass.edu/kurose_ross/wireshark.php',
              type: 'problem-set',
              cost: 'free',
              provider: 'Kurose & Ross (UMass)',
              note: 'Uses a provided trace of a file upload; the sequence-number and RTT graphs are the key part.',
            },
            {
              title: 'Stanford CS144 TCP checkpoints (reassembler, receiver, sender)',
              url: 'https://cs144.github.io/',
              type: 'problem-set',
              cost: 'free',
              provider: 'Stanford',
              note: 'Checkpoints 1-3 build a TCP receiver and sender in C++ with an extensive test suite.',
            },
            {
              title: 'tcp(7) man page (Linux TCP tunables and socket options)',
              url: 'https://man7.org/linux/man-pages/man7/tcp.7.html',
              type: 'documentation',
              cost: 'free',
              provider: 'man7.org',
            },
          ],
          exercises: [
            {
              slug: 'rto-computation',
              title: 'Compute the RTO from samples',
              prompt:
                'Starting from EstimatedRTT = 100 ms and DevRTT = 25 ms, process the SampleRTT sequence 106, 120, 140, 90, 115, 300, 110 ms with α = 1/8, β = 1/4 and tabulate EstimatedRTT, DevRTT and RTO after each sample. Then write a script that extracts SampleRTTs from a Wireshark capture (tshark -T fields with tcp.analysis.ack_rtt) of a real download and plots the three series. Comment on how the 300 ms outlier affects the RTO and for how long.',
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'tcp-capture-walkthrough',
              title: 'Walk through a TCP connection in a capture',
              prompt:
                'Capture a 5 MB download with Wireshark. Find and record: the ISNs of both sides, the MSS, window-scale and SACK options in the SYNs; the first data segment and its sequence number relative to the ISN; an ACK that acknowledges several segments; any duplicate ACKs, retransmissions or SACK blocks; the receive window over time (Statistics > TCP Stream Graphs > Window Scaling); and the FIN exchange with the TIME_WAIT side identified. Use the Stevens-style sequence graph to estimate throughput over time.',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'cs144-tcp-receiver',
              title: 'Build the CS144 TCP receiver',
              prompt:
                'Complete CS144 checkpoints 1 and 2 (the stream reassembler and the TCP receiver). Your reassembler must handle overlapping and out-of-order substrings within a capacity limit; your receiver must map absolute 64-bit to 32-bit wrapping sequence numbers and produce correct ackno and window size. Pass the provided test suite and report the measured reassembler throughput.',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'time-wait-experiment',
              title: 'TIME_WAIT and port reuse',
              prompt:
                'Write a client that opens and closes 30,000 connections to a local server as fast as possible. Observe `ss -tan state time-wait | wc -l` while it runs and record when connect() starts failing and with what error. Explain the role of TIME_WAIT, then fix the client with SO_REUSEADDR or by having the server close first, and explain why the second fix changes which side holds TIME_WAIT.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does TCP ignore RTT samples from retransmitted segments?',
              answerOutline:
                'Karn\'s algorithm: the ACK could be for the original or the retransmission, so the sample is ambiguous and could corrupt the estimate; the RTO is instead doubled on timeout.',
            },
            {
              question: 'What do three duplicate ACKs tell the sender and what does it do?',
              answerOutline:
                'Later segments arrived but one is missing; the sender retransmits the missing segment immediately (fast retransmit) instead of waiting for the timeout.',
            },
            {
              question: 'What is the difference between flow control and congestion control?',
              answerOutline:
                'Flow control protects the receiver\'s buffer via the advertised window; congestion control protects the network via the congestion window. The sender uses the minimum of the two.',
            },
            {
              question: 'Why does TIME_WAIT last 2·MSL and which side enters it?',
              answerOutline:
                'The side that sends the first FIN (active close) waits so that its final ACK can be retransmitted if lost and so that stale segments die before the 4-tuple is reused.',
            },
          ],
        },
        {
          slug: 'congestion-control',
          title: 'Congestion control: slow start, AIMD, CUBIC and BBR',
          summary:
            'How TCP senders discover how fast they may send without collapsing the network, why AIMD converges to fairness, and what the modern algorithms change.',
          estimatedMinutes: 130,
          objectives: [
            'Explain why congestion collapse happens and why the sender must control its rate',
            'Describe slow start, congestion avoidance, fast recovery and the congestion window dynamics of TCP Reno',
            'Show why additive-increase multiplicative-decrease converges to a fair share and derive the TCP throughput formula',
            'Explain how CUBIC and BBR differ from loss-based AIMD and measure them with iperf3',
          ],
          concepts: [
            'Congestion collapse; the 1986 Internet meltdown',
            'cwnd, ssthresh, slow start, congestion avoidance',
            'AIMD and the Chiu-Jain fairness argument',
            'Fast retransmit and fast recovery (Reno)',
            'Throughput ≈ 1.22·MSS / (RTT·√p)',
            'CUBIC: window growth as a cubic function of time since loss',
            'BBR: model the bottleneck bandwidth and RTT; bufferbloat; ECN',
          ],
          explanation: `In 1986 the link between LBL and Berkeley fell from 32 kb/s to 40 b/s: every sender retransmitted into full queues, and retransmissions caused more drops. **Congestion collapse**. Van Jacobson's fix, still the basis of TCP, has the sender maintain a **congestion window** (cwnd) and never have more than $\\min(\\text{cwnd}, \\text{rwnd})$ bytes outstanding, so the sending rate is roughly $\\text{cwnd}/\\text{RTT}$. Loss is taken as the signal that the network is congested.

The dynamics have three phases. **Slow start** begins with cwnd of one MSS and doubles it every RTT (it is exponential; "slow" is relative to the earlier practice of sending a full window at once). When cwnd reaches **ssthresh**, **congestion avoidance** takes over and grows cwnd by one MSS per RTT: **additive increase**. On loss detected by three duplicate ACKs, Reno halves cwnd (**multiplicative decrease**) and enters **fast recovery**; on a timeout, which signals heavier trouble, it drops cwnd to one MSS and restarts slow start. The result is the famous sawtooth.

Why halve, rather than subtract? Chiu and Jain's argument: plot two flows' rates on axes; additive increase moves along a 45° line, multiplicative decrease moves toward the origin along the line to it. Repeated, the point converges to the fairness line $x = y$. Additive decrease or multiplicative increase do not converge. From the sawtooth you can also derive the average throughput of a Reno flow with loss probability $p$: $\\approx \\frac{1.22 \\cdot \\text{MSS}}{\\text{RTT}\\sqrt{p}}$, which shows why high-bandwidth, long-RTT paths need tiny loss rates, and why short-RTT flows win when competing.

Modern algorithms address these weaknesses. **CUBIC** (Linux default) grows the window as a cubic function of time since the last loss, plateauing near the old window and then probing, which is RTT-independent and fills big pipes faster. **BBR** (Google) abandons loss as the signal: it estimates the bottleneck bandwidth and the minimum RTT and paces at their product, which keeps queues short and fights **bufferbloat**, the latency caused by oversized buffers that loss-based TCP always fills. **ECN** lets routers mark rather than drop packets.

Read Jacobson's paper, then RFC 5681; watch the Kurose and Ross videos; and run the iperf3 experiments comparing Reno, CUBIC and BBR under netem.`,
          resources: [
            {
              title: 'Congestion Avoidance and Control (Jacobson & Karels, 1988)',
              url: 'https://ee.lbl.gov/papers/congavoid.pdf',
              type: 'article',
              cost: 'free',
              provider: 'LBL',
              note: 'The paper that saved the Internet; the RTT estimator and slow start come from here.',
              primary: true,
            },
            {
              title: 'RFC 5681 — TCP Congestion Control',
              url: 'https://www.rfc-editor.org/rfc/rfc5681',
              type: 'documentation',
              cost: 'free',
              provider: 'IETF',
              note: 'The precise definitions of slow start, congestion avoidance, fast retransmit and fast recovery.',
            },
            {
              title: 'RFC 8312 — CUBIC for Fast Long-Distance Networks',
              url: 'https://www.rfc-editor.org/rfc/rfc8312',
              type: 'documentation',
              cost: 'free',
              provider: 'IETF',
            },
            {
              title: 'BBR: Congestion-Based Congestion Control (ACM Queue)',
              url: 'https://queue.acm.org/detail.cfm?id=3022184',
              type: 'article',
              cost: 'free',
              provider: 'ACM Queue',
            },
            {
              title: 'Kurose & Ross chapter 3 videos (TCP congestion control, fairness)',
              url: 'https://gaia.cs.umass.edu/kurose_ross/lectures.php',
              type: 'lecture',
              cost: 'free',
              provider: 'Kurose & Ross (UMass)',
            },
          ],
          exercises: [
            {
              slug: 'reno-trace-by-hand',
              title: 'Trace Reno by hand',
              prompt:
                'MSS = 1 kB, ssthresh = 16 kB initially. Starting from cwnd = 1 MSS, tabulate cwnd at the start of each RTT for 20 RTTs, given a triple-duplicate-ACK loss at RTT 7 and a timeout at RTT 14. Plot it. Then compute the average throughput predicted by the 1.22·MSS/(RTT·√p) formula for RTT = 100 ms and p = 10^-2, 10^-4, 10^-6, and the loss rate needed to sustain 10 Gb/s with 1500-byte packets.',
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'aimd-simulation',
              title: 'Simulate AIMD fairness',
              prompt:
                'Write a simulation of two flows sharing a link of capacity C: each RTT, each flow increases its rate by a (additive) or multiplies by b, and when the sum exceeds C both see a loss and apply the decrease rule. Plot the trajectory in the (x1, x2) plane for AIMD, AIAD, MIMD and MIAD from an unfair starting point and show which converge to fairness. Then give flow 2 double the RTT and show the resulting unfairness.',
              kind: 'simulation',
              difficulty: 2,
            },
            {
              slug: 'measure-cubic-vs-bbr',
              title: 'Measure CUBIC and BBR under netem',
              prompt:
                'On Linux, between two network namespaces or VMs linked with netem (delay 50 ms, 1 % loss, 20 Mb/s rate, large buffer), run iperf3 for 60 s with `-C reno`, `-C cubic` and `-C bbr`. Record throughput and, with a parallel ping, latency under load. Then set loss to 0 and the buffer very large and show the bufferbloat: ping latency with CUBIC versus BBR. Use `ss -ti` to watch cwnd and plot it against time for each algorithm.',
              kind: 'data-analysis',
              difficulty: 3,
              hint: 'Load the modules first: modprobe tcp_bbr. Check /proc/sys/net/ipv4/tcp_available_congestion_control.',
            },
          ],
          selfAssessment: [
            {
              question: 'Why is slow start exponential, and what stops it?',
              answerOutline:
                'cwnd doubles per RTT because every ACK adds one MSS; it stops at ssthresh (then additive increase) or at the first loss (halving or reset).',
            },
            {
              question: 'Why do short-RTT flows get more bandwidth than long-RTT flows under Reno?',
              answerOutline:
                'Window increases happen once per RTT, so the short-RTT flow ramps faster between losses; throughput scales with 1/RTT in the formula.',
            },
            {
              question: 'What is bufferbloat and why does BBR reduce it?',
              answerOutline:
                'Loss-based TCP fills any buffer before seeing loss, adding queueing delay. BBR paces at the estimated bottleneck bandwidth and probes RTT, keeping the queue near empty.',
            },
            {
              question: 'Why does a timeout cause a harsher response than three duplicate ACKs?',
              answerOutline:
                'Duplicate ACKs prove packets are still getting through (mild congestion); a timeout means nothing is arriving, suggesting severe congestion, so cwnd resets to 1 MSS.',
            },
          ],
        },
        {
          slug: 'quic-and-modern-transport',
          title: 'QUIC, HTTP/3 and the evolution of transport',
          summary:
            'Why a new transport was built on UDP: ossification by middleboxes, handshake latency, head-of-line blocking and connection migration.',
          estimatedMinutes: 80,
          objectives: [
            'Explain why QUIC runs over UDP and what protocol ossification is',
            'Describe the QUIC 1-RTT and 0-RTT handshakes and how TLS 1.3 is integrated',
            'Explain streams, per-stream flow control and why loss on one stream does not block others',
            'Compare connection identification by 4-tuple with QUIC connection IDs and migration',
          ],
          concepts: [
            'Protocol ossification and middleboxes',
            'QUIC packets, frames and streams',
            'Integrated TLS 1.3 handshake; 0-RTT and replay risk',
            'Stream-level loss recovery; no head-of-line blocking across streams',
            'Connection IDs and connection migration',
            'HTTP/3 over QUIC; QPACK',
            'User-space transport: faster evolution, CPU cost',
          ],
          explanation: `By 2012 it had become practically impossible to change TCP. Any new option or behaviour was dropped or rewritten by **middleboxes** (NATs, firewalls, load balancers) that had hard-coded assumptions about what TCP looks like; the protocol had **ossified**. The pragmatic answer was to build a new transport inside UDP datagrams, where middleboxes see only opaque payload, and implement it in user space where it can ship with the browser. That is **QUIC** (RFC 9000), standardised in 2021 and carrying most of Google and Meta's traffic.

QUIC fixes four TCP problems at once. **Handshake latency**: the transport and TLS 1.3 handshakes are merged, so a new connection costs one RTT and a resumed one can carry data in the first packet (**0-RTT**, at the price of possible replay, so only idempotent requests may use it). **Head-of-line blocking**: a connection carries many independent **streams**, each with its own byte offsets and flow control; a lost packet delays only the streams whose data it carried, which is what HTTP/3 needs for parallel resources. **Ossification**: almost the entire packet, including the headers, is encrypted, so middleboxes cannot depend on it. **Migration**: a connection is identified by a **connection ID** rather than the 4-tuple, so when your phone moves from Wi-Fi to cellular the connection survives.

Loss detection and congestion control (RFC 9002) are modelled on TCP's, with improvements: every packet has a unique monotonically increasing number even when retransmitting data, which removes the retransmission ambiguity, and ACK frames carry precise delay information. The costs are real: user-space UDP processing uses more CPU than kernel TCP with hardware offload, and some networks rate-limit UDP.

Read the RFC 9000 overview sections and the Cloudflare and HPBN explanations, then capture an HTTP/3 session (browsers enable it by default to major sites) and observe what Wireshark can and cannot decode.`,
          resources: [
            {
              title: 'RFC 9000 — QUIC: A UDP-Based Multiplexed and Secure Transport',
              url: 'https://www.rfc-editor.org/rfc/rfc9000',
              type: 'documentation',
              cost: 'free',
              provider: 'IETF',
              note: 'Sections 1-5 (overview, streams, connections) and 7 (handshake).',
              primary: true,
            },
            {
              title: 'RFC 9002 — QUIC Loss Detection and Congestion Control',
              url: 'https://www.rfc-editor.org/rfc/rfc9002',
              type: 'documentation',
              cost: 'free',
              provider: 'IETF',
            },
            {
              title: 'RFC 9114 — HTTP/3',
              url: 'https://www.rfc-editor.org/rfc/rfc9114',
              type: 'documentation',
              cost: 'free',
              provider: 'IETF',
            },
            {
              title: 'The Illustrated QUIC Connection',
              url: 'https://quic.xargs.org/',
              type: 'interactive',
              cost: 'free',
              note: 'Every byte of a QUIC handshake, annotated.',
            },
          ],
          exercises: [
            {
              slug: 'capture-http3',
              title: 'Capture and compare HTTP/2 and HTTP/3',
              prompt:
                'Load the same large site twice, once with HTTP/3 enabled and once disabled in your browser. In Wireshark, for each: count packets, measure time from first packet to first response byte, identify the handshake packets, and note which header fields are visible in cleartext. Explain the difference in time to first byte using the handshake RTT counts.',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'hol-blocking-model',
              title: 'Model head-of-line blocking',
              prompt:
                'Simulate a page of 20 resources of 50 kB each sent over (a) one TCP connection with HTTP/2 multiplexing and (b) one QUIC connection with 20 streams. Packets are 1200 bytes, loss is 1 % with a 100 ms RTT and immediate retransmission on detection. Compute, over 1000 runs, the mean and p95 completion time of each resource and of the whole page. Explain why QUIC improves per-resource time more than total page time.',
              kind: 'simulation',
              difficulty: 2,
            },
            {
              slug: 'zero-rtt-replay',
              title: '0-RTT and replay',
              prompt:
                'Write a page explaining why 0-RTT data can be replayed by an attacker who records the first flight, what the consequence would be for a request like POST /transfer?amount=100, and which requests a server may safely accept in 0-RTT. Cite the relevant RFC 9000/8446 sections.',
              kind: 'writing',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does QUIC run over UDP instead of being a new IP protocol number?',
              answerOutline:
                'A new IP protocol would be blocked by most middleboxes and need kernel changes everywhere; UDP passes through and lets QUIC be implemented in user space.',
            },
            {
              question: 'How does QUIC avoid head-of-line blocking that HTTP/2 over TCP suffers?',
              answerOutline:
                'Independent streams with their own sequence space; loss of a packet stalls only the streams whose data it carried, not the whole connection.',
            },
            {
              question: 'What does a connection ID enable that a 4-tuple cannot?',
              answerOutline:
                'Connection migration across address changes (Wi-Fi to cellular, NAT rebinding) without re-handshaking.',
            },
          ],
        },
      ],
      project: {
        slug: 'reliable-transport-over-udp',
        title: 'A reliable, congestion-controlled transport over UDP',
        description: `Design and implement a TCP-like transport protocol over UDP: connection setup with a handshake, byte-stream sequence numbers, cumulative plus selective acknowledgements, RTT estimation and RFC 6298 timeouts, fast retransmit, receiver flow control, and AIMD congestion control with slow start. Expose it as a library with connect/accept/send/recv and build a file-transfer tool on it. Evaluate under netem with varying delay, loss and reordering, and compare throughput against the kernel's TCP for the same conditions.`,
        deliverables: [
          'Protocol specification document (header layout, state machines, timers)',
          'Implementation with unit tests for the sequence/ACK logic and an integration test over a lossy link',
          'Evaluation report: throughput and retransmissions vs loss (0-5 %) and delay (10-200 ms), with plots, compared to Linux TCP',
          'Wireshark dissector or annotated capture showing your protocol\'s handshake, sawtooth and teardown',
        ],
        estimatedHours: 20,
        stretchGoals: [
          'Implement CUBIC or a simplified BBR and show reduced queueing delay',
          'Pass the CS144 TCP checkpoints and compare your design to CS144\'s structure',
          'Support multiple streams per connection, QUIC-style, and demonstrate the absence of cross-stream HOL blocking',
        ],
      },
    },
    {
      slug: 'network-layer',
      title: 'Network Layer: IP, Routers and Routing',
      description:
        'How datagrams are addressed and forwarded across the globe: IPv4 and IPv6 addressing, router internals, NAT and DHCP, and the routing algorithms and protocols that build forwarding tables.',
      lessons: [
        {
          slug: 'ip-addressing-and-forwarding',
          title: 'IPv4 addressing, subnets and longest-prefix forwarding',
          summary:
            'The IPv4 datagram, CIDR addressing and subnetting, how a router picks an output port with longest-prefix match, and fragmentation versus path MTU.',
          estimatedMinutes: 110,
          objectives: [
            'Read every field of an IPv4 header and explain TTL, protocol, fragmentation fields and the header checksum',
            'Subnet an address block in CIDR notation and compute network, broadcast and usable host ranges',
            'Build a forwarding table and apply longest-prefix matching to a destination address',
            'Explain MTU, fragmentation, the DF bit and path MTU discovery',
          ],
          concepts: [
            'IPv4 header: version, IHL, TTL, protocol, checksum, addresses',
            'Dotted-quad addresses and CIDR prefixes (a.b.c.d/n)',
            'Subnet mask, network address, broadcast address',
            'Longest-prefix match forwarding',
            'Private address space (RFC 1918)',
            'MTU, fragmentation, DF bit, path MTU discovery',
            'Data plane vs control plane',
          ],
          explanation: `The network layer has two halves. The **data plane** is per-router, per-packet: look at the destination address, choose an output port, forward. The **control plane** is network-wide and slower: compute the tables the data plane consults. This lesson is the data plane; routing is the control plane and comes two lessons later.

An **IPv4 datagram** has a 20-byte header (longer with options): version, header length, type of service, total length, identification/flags/fragment offset for fragmentation, **TTL** (decremented by each router; 0 means discard and send an ICMP message, which is how traceroute works), **protocol** (6 for TCP, 17 for UDP), a header checksum, and 32-bit source and destination addresses.

Addresses are allocated in blocks written as **CIDR** prefixes: \`203.0.113.0/24\` means the first 24 bits identify the network and the remaining 8 the host, so 256 addresses, of which the first (network) and last (broadcast) are reserved. Subnetting splits a block into smaller prefixes: a /24 into two /25s or four /26s. You must be able to do this arithmetic in binary quickly; it is the basis of every address plan. **Private** blocks (10/8, 172.16/12, 192.168/16) are never routed on the public Internet and exist only behind NAT.

A router's **forwarding table** maps prefixes to output ports. Because prefixes overlap (a /16 and a more specific /24 inside it), the rule is **longest-prefix match**: the most specific matching entry wins. Core routers hold about a million prefixes and match in nanoseconds using TCAM or trie structures.

Links have a **maximum transmission unit** (1500 bytes on Ethernet). A datagram larger than the next link's MTU is **fragmented** by the router into pieces reassembled only at the destination, which is fragile, so modern hosts set the **Don't Fragment** bit and use **path MTU discovery**: ICMP "fragmentation needed" messages tell the sender to shrink.

Read RFC 791 for the header and the CIDR and private-address RFCs, do the Kurose and Ross IP Wireshark lab, and drill subnetting until it is reflex.`,
          resources: [
            {
              title: 'RFC 791 — Internet Protocol',
              url: 'https://www.rfc-editor.org/rfc/rfc791',
              type: 'documentation',
              cost: 'free',
              provider: 'IETF',
              note: 'Section 3.1 (header format) and 3.2 (fragmentation). Still the specification.',
              primary: true,
            },
            {
              title: 'RFC 4632 — Classless Inter-domain Routing (CIDR)',
              url: 'https://www.rfc-editor.org/rfc/rfc4632',
              type: 'documentation',
              cost: 'free',
              provider: 'IETF',
            },
            {
              title: 'RFC 1918 — Address Allocation for Private Internets',
              url: 'https://www.rfc-editor.org/rfc/rfc1918',
              type: 'documentation',
              cost: 'free',
              provider: 'IETF',
            },
            {
              title: 'cidr.xyz — interactive CIDR calculator',
              url: 'https://cidr.xyz/',
              type: 'interactive',
              cost: 'free',
              note: 'Use it to check your hand calculations, not to replace them.',
            },
            {
              title: 'Kurose & Ross Wireshark lab: IP',
              url: 'https://gaia.cs.umass.edu/kurose_ross/wireshark.php',
              type: 'problem-set',
              cost: 'free',
              provider: 'Kurose & Ross (UMass)',
              note: 'Uses traceroute with large packets to observe fragmentation and TTL.',
            },
          ],
          exercises: [
            {
              slug: 'subnetting-drill',
              title: 'Subnetting drill',
              prompt:
                'An organisation receives 172.20.64.0/20. Design an address plan for: a data-centre subnet needing 900 hosts, four office subnets needing 200 hosts each, ten point-to-point router links, and a /24 held in reserve. Give every subnet in CIDR notation with network, broadcast and first/last usable host, and show the binary for two of them. State how many addresses remain unallocated.',
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'longest-prefix-match',
              title: 'Implement longest-prefix match',
              prompt:
                'Write a forwarding-table lookup in Python: load 50,000 random prefixes (lengths 8-24) with output ports, then look up one million random addresses. Implement it (a) by linear scan, (b) with a binary trie, and (c) with a dictionary per prefix length tried from /32 downward. Measure lookups per second for each and verify all three agree. Explain which structure real routers use and why.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'observe-fragmentation-and-pmtu',
              title: 'Observe fragmentation and path MTU discovery',
              prompt:
                'Send a 3000-byte ping (`ping -s 2972`) and capture it: identify the fragments, their offsets, the More Fragments flag and the identification field, and show reassembly in Wireshark. Then send with DF set (`ping -M do -s 2972`) and record the ICMP error returned and the MTU it reports. Finally lower your interface MTU to 1280 and show the effect on a TCP download\'s MSS.',
              kind: 'data-analysis',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'How many usable host addresses does a /26 have, and what are the network and broadcast addresses of 192.0.2.64/26?',
              answerOutline:
                '62 usable (64 minus network and broadcast). Network 192.0.2.64, broadcast 192.0.2.127.',
            },
            {
              question: 'A table has 10.0.0.0/8 → port 1 and 10.1.0.0/16 → port 2. Where does 10.1.2.3 go, and 10.2.2.3?',
              answerOutline:
                '10.1.2.3 matches both; longest prefix /16 wins → port 2. 10.2.2.3 matches only /8 → port 1.',
            },
            {
              question: 'Why is fragmentation discouraged and what replaces it?',
              answerOutline:
                'Losing any fragment loses the whole datagram, reassembly costs the receiver and middleboxes mishandle fragments. Path MTU discovery with DF set lets the sender pick a size that fits every link.',
            },
            {
              question: 'What does TTL do and how does traceroute exploit it?',
              answerOutline:
                'Each router decrements it and discards at 0, sending ICMP Time Exceeded to the source. Traceroute sends probes with TTL 1, 2, 3... and reads the source of each ICMP reply.',
            },
          ],
        },
        {
          slug: 'routers-dhcp-nat-and-icmp',
          title: 'Inside a router, DHCP, NAT and ICMP',
          summary:
            'What a router does with a packet in the nanoseconds it has, how hosts get addresses automatically, how NAT lets billions share a few addresses, and the control messages that report errors.',
          estimatedMinutes: 100,
          objectives: [
            'Describe the architecture of a router: input ports, switching fabric, output ports and where queueing happens',
            'Explain the DHCP DORA exchange and read it in a capture',
            'Explain NAT translation tables, why NAT breaks the end-to-end principle, and how NAT traversal works',
            'Interpret common ICMP messages and relate them to ping, traceroute and PMTU discovery',
          ],
          concepts: [
            'Input port processing, switching fabric (memory, bus, crossbar), output queueing',
            'Head-of-line blocking at input queues; buffer sizing',
            'Packet scheduling: FIFO, priority, weighted fair queueing; active queue management',
            'DHCP: discover, offer, request, acknowledge',
            'NAT: translation table keyed by (address, port), port-restricted mapping',
            'NAT traversal: STUN, hole punching, relays',
            'ICMP: echo, destination unreachable, time exceeded',
          ],
          explanation: `A **router** is a specialised computer that moves packets between line cards at rates far beyond what a general-purpose CPU could do per packet. Each **input port** terminates the physical and link layers, then does the forwarding-table lookup in hardware and sends the packet across the **switching fabric** (shared memory in cheap routers, a crossbar in big ones) to the **output port**, where it is queued and transmitted. Queues form at the output when packets from many inputs converge on one output; they also form at inputs when the fabric is slower than the inputs, and a packet waiting at the head of an input queue blocks the ones behind it even if their outputs are free (**head-of-line blocking**). The output queue's **scheduling** discipline (FIFO, priority, weighted fair queueing) and its **drop policy** (tail drop, RED, CoDel) are where quality of service and bufferbloat are decided.

Hosts need addresses, and almost none are configured by hand. **DHCP** is a four-step UDP exchange: the client broadcasts **Discover**, servers reply **Offer**, the client broadcasts **Request** for one offer, and the server **Acknowledges** with the address, subnet mask, default router, DNS server and lease time. Capture your own machine joining a network and you will see it.

**NAT** exists because IPv4 ran out of addresses. A home router has one public address; it rewrites each outgoing packet's source (address, port) to (public address, a fresh port), records the mapping, and reverses it for replies. Inside hosts are unreachable from outside unless a mapping exists, which is why peer-to-peer applications need **STUN** (to learn the public mapping), **hole punching** (both sides send outward to create mappings) or relays. NAT violates the end-to-end principle, mixes layers (it rewrites transport ports) and makes IPv6 the only clean fix.

**ICMP** is the network layer's error and diagnostic protocol: echo request/reply (ping), destination unreachable with codes including "fragmentation needed", and time exceeded (traceroute). Firewalls that block all ICMP break path MTU discovery.

Read the Kurose and Ross chapter 4 material, the RFCs for DHCP and NAT, and do the DHCP and ICMP Wireshark labs.`,
          resources: [
            {
              title: 'Kurose & Ross chapter 4 lecture videos (what is inside a router, DHCP, NAT, ICMP)',
              url: 'https://gaia.cs.umass.edu/kurose_ross/lectures.php',
              type: 'lecture',
              cost: 'free',
              provider: 'Kurose & Ross (UMass)',
              primary: true,
            },
            {
              title: 'RFC 2131 — Dynamic Host Configuration Protocol',
              url: 'https://www.rfc-editor.org/rfc/rfc2131',
              type: 'documentation',
              cost: 'free',
              provider: 'IETF',
              note: 'Section 3 for the client-server protocol overview.',
            },
            {
              title: 'RFC 3022 — Traditional IP Network Address Translator',
              url: 'https://www.rfc-editor.org/rfc/rfc3022',
              type: 'documentation',
              cost: 'free',
              provider: 'IETF',
            },
            {
              title: 'RFC 792 — Internet Control Message Protocol',
              url: 'https://www.rfc-editor.org/rfc/rfc792',
              type: 'documentation',
              cost: 'free',
              provider: 'IETF',
            },
            {
              title: 'Kurose & Ross Wireshark labs: DHCP and ICMP',
              url: 'https://gaia.cs.umass.edu/kurose_ross/wireshark.php',
              type: 'problem-set',
              cost: 'free',
              provider: 'Kurose & Ross (UMass)',
            },
          ],
          exercises: [
            {
              slug: 'capture-dhcp',
              title: 'Capture your own DHCP exchange',
              prompt:
                'Start a capture, release and renew your address (`dhclient -r; dhclient` or the OS equivalent) and identify the four DHCP messages. For each, record source/destination IP and MAC, the transaction ID, and the options carried (requested address, server identifier, lease time, router, DNS). Explain why Discover is sent from 0.0.0.0 to 255.255.255.255 and what the yiaddr field contains in each message.',
              kind: 'data-analysis',
              difficulty: 1,
            },
            {
              slug: 'nat-table-simulation',
              title: 'Simulate a NAT',
              prompt:
                'Write a NAT simulator: given a stream of outgoing and incoming packets (src IP, src port, dst IP, dst port, direction), maintain the translation table, rewrite packets, drop unsolicited inbound packets, and expire mappings after 60 s of inactivity. Test with two internal hosts both using source port 5000 to the same server, and with an inbound packet for which no mapping exists. Then implement a port-restricted variant and show with a trace why two hosts behind such NATs can still connect via hole punching but need STUN to learn their mappings.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'router-queue-scheduling',
              title: 'Output queue scheduling and drops',
              prompt:
                'Extend your queue simulator from module 1 to two traffic classes sharing an output port: a latency-sensitive class at 2 Mb/s and a bulk class that offers 20 Mb/s on a 10 Mb/s link. Compare FIFO, strict priority and weighted fair queueing (weights 1:4) on the delay distribution of each class. Then add tail drop with a 100-packet buffer versus a simple RED-style early drop and compare the queue occupancy over time. Report p50/p99 delay per class and loss per class for each scheme.',
              kind: 'simulation',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'Where in a router do queues form, and what is head-of-line blocking?',
              answerOutline:
                'Output ports when many inputs target one output; input ports when the fabric is slower than arrivals. HOL: the packet at an input queue head waits for a busy output, blocking packets behind it destined for free outputs.',
            },
            {
              question: 'What does the NAT router change in an outgoing packet and how does it map replies back?',
              answerOutline:
                'Source IP to its public IP and source port to a unique port; it stores (private IP, port) ↔ (public port) and rewrites destination of replies by looking up the public port.',
            },
            {
              question: 'Why can a host behind NAT not simply be contacted by an outside peer?',
              answerOutline:
                'No translation entry exists until the inside host sends outward; inbound packets without an entry are dropped. Hole punching creates the entries from both sides.',
            },
            {
              question: 'Why does DHCP need a Request step after an Offer?',
              answerOutline:
                'Several servers may offer; the client must choose one and tell all servers (broadcast) so the others can withdraw their offers.',
            },
          ],
        },
        {
          slug: 'ipv6',
          title: 'IPv6: addressing, neighbour discovery and transition',
          summary:
            'The redesigned network layer: 128-bit addresses and their notation, the simplified header, SLAAC and neighbour discovery, and how IPv4 and IPv6 coexist.',
          estimatedMinutes: 80,
          objectives: [
            'Write and compress IPv6 addresses and identify link-local, unique-local, global unicast and multicast scopes',
            'Compare the IPv6 header with IPv4 and explain what was removed and why',
            'Explain SLAAC, router advertisements and neighbour discovery as the replacement for DHCP and ARP',
            'Describe dual-stack, tunnelling and NAT64 and check whether your own connection has IPv6',
          ],
          concepts: [
            'Address notation, zero compression, prefixes (/64 subnets)',
            'Scopes: link-local fe80::/10, ULA fc00::/7, global 2000::/3, multicast ff00::/8',
            'Fixed 40-byte header; extension headers; no fragmentation by routers; hop limit',
            'Neighbour Discovery Protocol: RS/RA, NS/NA',
            'SLAAC and privacy extensions; DHCPv6',
            'Dual stack, 6in4/6to4 tunnels, NAT64/DNS64',
            'Happy Eyeballs',
          ],
          explanation: `IPv6 (RFC 8200) is what the network layer looks like when designed with hindsight. Addresses are 128 bits, written as eight groups of four hex digits with leading zeros dropped and one run of zero groups compressible to \`::\`, so \`2001:0db8:0000:0000:0000:0000:0000:0001\` is \`2001:db8::1\`. The convention that every subnet is a **/64** means the low 64 bits identify an interface and there are 2⁶⁴ subnets available; address exhaustion is simply not a concern. Scope is encoded in the prefix: **link-local** \`fe80::/10\` addresses exist on every interface automatically and are used by the control protocols, **global** unicast lives in \`2000::/3\`, **unique local** \`fc00::/7\` is the private-address analogue, and there is no broadcast, only **multicast** \`ff00::/8\`.

The header is a fixed 40 bytes: no checksum (the link and transport layers have them), no fragmentation fields (routers never fragment; senders must do path MTU discovery, and the minimum MTU is 1280), no options (replaced by chained **extension headers**), and **hop limit** instead of TTL. The result is faster forwarding and fewer corner cases.

Configuration is built in. A host joining a link sends a **Router Solicitation**; the router answers with a **Router Advertisement** carrying the prefix, and the host forms its own address by **stateless address autoconfiguration** (SLAAC), checking uniqueness with **Neighbour Solicitation**. The same NS/NA exchange replaces ARP for address-to-MAC resolution. DHCPv6 still exists for cases where the operator wants control.

Deployment is the hard part. **Dual stack** runs both protocols and lets applications prefer IPv6 (with **Happy Eyeballs**, RFC 8305, racing both and using whichever connects first). Where only IPv4 transit exists, IPv6 can be **tunnelled** in IPv4; where a network is IPv6-only, **NAT64/DNS64** synthesises addresses for IPv4-only destinations. Today roughly half of traffic to major sites is IPv6, and mobile carriers are often IPv6-only internally.

Read RFC 8200 sections 1-4 and RFC 4291 on addressing, then examine your own interfaces and captures.`,
          resources: [
            {
              title: 'RFC 8200 — Internet Protocol, Version 6 (IPv6) Specification',
              url: 'https://www.rfc-editor.org/rfc/rfc8200',
              type: 'documentation',
              cost: 'free',
              provider: 'IETF',
              note: 'Sections 1-4: header, extension headers, packet size.',
              primary: true,
            },
            {
              title: 'RFC 4291 — IP Version 6 Addressing Architecture',
              url: 'https://www.rfc-editor.org/rfc/rfc4291',
              type: 'documentation',
              cost: 'free',
              provider: 'IETF',
            },
            {
              title: 'RFC 4861 — Neighbor Discovery for IPv6',
              url: 'https://www.rfc-editor.org/rfc/rfc4861',
              type: 'documentation',
              cost: 'free',
              provider: 'IETF',
              note: 'Sections 3-4 (overview and message formats). RFC 4862 covers SLAAC.',
            },
            {
              title: 'RFC 8305 — Happy Eyeballs Version 2',
              url: 'https://www.rfc-editor.org/rfc/rfc8305',
              type: 'documentation',
              cost: 'free',
              provider: 'IETF',
            },
            {
              title: 'RIPE NCC Academy (free IPv6 courses)',
              url: 'https://academy.ripe.net/',
              type: 'course',
              cost: 'free',
              provider: 'RIPE NCC',
            },
          ],
          exercises: [
            {
              slug: 'ipv6-address-drill',
              title: 'IPv6 address drill',
              prompt:
                'Compress and expand ten given IPv6 addresses by hand and classify each by scope. Then list your own machine\'s IPv6 addresses (`ip -6 addr`), identify the link-local address, any SLAAC global address and any privacy (temporary) address, and explain how each was formed. If you have no global IPv6, use the test-ipv6 style sites or a cloud VM and explain why your ISP does not provide it.',
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'capture-ndp-and-slaac',
              title: 'Capture neighbour discovery and SLAAC',
              prompt:
                'Bring an interface down and up while capturing with filter `icmpv6`. Identify the Router Solicitation, Router Advertisement (record prefix, lifetimes, flags), Neighbour Solicitations for duplicate address detection, and a Neighbour Solicitation/Advertisement pair used to resolve a MAC. Compare the exchange step by step with the DHCP and ARP exchanges from earlier lessons.',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'dual-stack-socket-code',
              title: 'Dual-stack sockets and Happy Eyeballs',
              prompt:
                'Modify your TCP client to use getaddrinfo with AF_UNSPEC, attempt the IPv6 address first and fall back to IPv4 after 250 ms as RFC 8305 describes. Test against a dual-stack site and a v4-only site, logging which address family won and how long each attempt took. Then run your server bound to :: and confirm with ss that it accepts both v4-mapped and v6 clients.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Name three IPv4 header fields removed in IPv6 and the reason for each.',
              answerOutline:
                'Header checksum (redundant with link/transport checksums, costly to recompute at each hop); fragmentation fields (routers no longer fragment; PMTUD mandatory); header length/options (fixed header, extension headers instead).',
            },
            {
              question: 'How does an IPv6 host get an address without DHCP?',
              answerOutline:
                'Forms a link-local address, sends a Router Solicitation, receives a Router Advertisement with a /64 prefix, appends an interface identifier (random or EUI-64), and runs duplicate address detection with Neighbour Solicitation.',
            },
            {
              question: 'What replaces ARP in IPv6?',
              answerOutline:
                'Neighbour Discovery (ICMPv6 Neighbour Solicitation/Advertisement) using solicited-node multicast addresses instead of broadcast.',
            },
          ],
        },
        {
          slug: 'routing-algorithms',
          title: 'Routing algorithms: link state and distance vector',
          summary:
            'The two families of shortest-path routing: Dijkstra over a full map, and Bellman-Ford by gossip with neighbours, with their failure modes.',
          estimatedMinutes: 120,
          objectives: [
            'Run Dijkstra\'s algorithm by hand on a weighted graph and produce a forwarding table',
            'Run the distance-vector algorithm by hand and explain the Bellman-Ford update rule',
            'Explain count-to-infinity and the poisoned-reverse mitigation, and construct a case where it fails',
            'Implement both algorithms as simulated routers exchanging messages and test convergence after link changes',
          ],
          concepts: [
            'Network as a weighted graph; link costs',
            'Link-state: flooding, global map, Dijkstra',
            'Distance vector: D_x(y) = min_v { c(x,v) + D_v(y) }',
            'Asynchronous, iterative, distributed computation',
            'Good news travels fast, bad news travels slow; count-to-infinity',
            'Poisoned reverse and split horizon',
            'Message and convergence cost comparisons',
          ],
          explanation: `Routing is a graph problem: routers are nodes, links are edges with costs (hop count, inverse bandwidth, delay, or an administrative number), and each router wants the least-cost path to every destination. Two algorithm families solve it, and real protocols are built on each.

**Link-state** routing gives every router the whole map. Each router measures the cost to its neighbours and **floods** that information to everyone, so all routers hold identical graphs. Each then runs **Dijkstra's algorithm** from itself: maintain a set $N'$ of nodes with known least cost, initialise $D(v)$ to the direct link cost or infinity, and repeatedly add the cheapest unknown node $w$ to $N'$, updating $D(v) = \\min(D(v), D(w) + c(w,v))$ for each neighbour $v$ of $w$. After $n$ iterations every $D(v)$ is final and the predecessor pointers give the forwarding table. Complexity is $O(n^2)$ or $O(n \\log n)$ with a heap; the message cost is $O(nE)$ for the flooding.

**Distance-vector** routing never builds the map. Each router keeps a vector of its current best cost to every destination and sends it only to its neighbours. On receiving a neighbour's vector, it applies the **Bellman-Ford** equation $D_x(y) = \\min_v \\{ c(x,v) + D_v(y) \\}$ and, if anything changed, sends its own updated vector. The computation is asynchronous, iterative and distributed, and it converges with no global knowledge. Its weakness is dramatic: when a link cost rises, routers can keep believing a neighbour's stale, lower cost that was itself derived via them, and the estimates climb one step at a time, the **count-to-infinity** problem. **Poisoned reverse** (tell a neighbour that your route through it has infinite cost) fixes the two-node loop but not loops of three or more; protocols cap "infinity" at a small number (RIP uses 16) to bound the damage.

Link-state converges faster and is robust to one router's errors spreading; distance vector is simpler and uses less memory. The Data Structures subject covers Dijkstra and Bellman-Ford as pure algorithms; here you care about their behaviour as distributed protocols under change.

Watch the Kurose and Ross chapter 5 videos and trace both algorithms by hand on the textbook graphs, then build the simulator in the exercises.`,
          resources: [
            {
              title: 'Kurose & Ross chapter 5 lecture videos (routing algorithms: link state, distance vector)',
              url: 'https://gaia.cs.umass.edu/kurose_ross/lectures.php',
              type: 'lecture',
              cost: 'free',
              provider: 'Kurose & Ross (UMass)',
              primary: true,
            },
            {
              title: 'Kurose & Ross interactive problems: Dijkstra and distance vector',
              url: 'https://gaia.cs.umass.edu/kurose_ross/interactive/',
              type: 'problem-set',
              cost: 'free',
              provider: 'Kurose & Ross (UMass)',
            },
            {
              title: 'A Systems Approach — Chapter 3.4 (Routing: distance vector, link state, metrics)',
              url: 'https://book.systemsapproach.org/',
              type: 'textbook',
              cost: 'free',
              provider: 'Peterson & Davie',
            },
            {
              title: 'RFC 2453 — RIP Version 2 (a real distance-vector protocol)',
              url: 'https://www.rfc-editor.org/rfc/rfc2453',
              type: 'documentation',
              cost: 'free',
              provider: 'IETF',
              note: 'Short; see how split horizon, poisoned reverse and the metric limit of 16 are specified.',
            },
          ],
          exercises: [
            {
              slug: 'dijkstra-and-dv-by-hand',
              title: 'Both algorithms by hand',
              prompt:
                'On a 6-node weighted graph of your design (at least 9 edges), run Dijkstra from node A showing the table after each iteration, and derive A\'s forwarding table. Then run distance vector synchronously from all nodes, showing every node\'s vector after each round until convergence. Count the rounds and the number of vector messages sent.',
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'routing-simulator',
              title: 'A distributed routing simulator',
              prompt:
                'Write a simulator where each router is an object with its own state and the only communication is message passing over a simulated link with delay. Implement link-state (flooding + Dijkstra) and distance-vector (with and without poisoned reverse). Load a 20-node topology, converge, then (a) fail a link, (b) raise a link cost from 1 to 50, (c) restore it. For each event and algorithm, measure time to convergence and total messages, and verify the final forwarding tables equal a centralised Dijkstra. Produce a trace showing count-to-infinity happening and being mitigated.',
              kind: 'coding',
              difficulty: 3,
              hint: 'Use a discrete-event queue keyed by delivery time; it makes convergence time meaningful.',
            },
            {
              slug: 'poisoned-reverse-failure',
              title: 'Break poisoned reverse',
              prompt:
                'Construct a topology with a three-router loop in which poisoned reverse does not prevent count-to-infinity after a link failure. Trace the vectors round by round in your simulator until the metric reaches the cap of 16 and explain, in prose, exactly which stale information circulates and why no two-hop rule can catch it.',
              kind: 'simulation',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What information does each router need in link-state routing versus distance-vector routing?',
              answerOutline:
                'Link state: the full topology (every link and cost), obtained by flooding. Distance vector: only its own link costs and its neighbours\' distance vectors.',
            },
            {
              question: 'Why does bad news travel slowly in distance vector?',
              answerOutline:
                'A router whose direct path worsens may adopt a neighbour\'s advertised cost that was itself computed via the first router; each exchange raises the estimate by one link cost until the truth or the infinity cap is reached.',
            },
            {
              question: 'Does poisoned reverse solve count-to-infinity?',
              answerOutline:
                'Only for loops between two routers; loops through three or more routers can still count up.',
            },
            {
              question: 'Compare robustness: what happens if one router miscomputes in each scheme?',
              answerOutline:
                'Link state: a bad computation affects only that router\'s own table (though a bad advertisement affects everyone\'s map). Distance vector: a wrong vector propagates and corrupts neighbours\' tables.',
            },
          ],
          relatedLessons: ['data-structures-algorithms/graphs/shortest-paths'],
        },
        {
          slug: 'ospf-bgp-and-internet-routing',
          title: 'OSPF, BGP and routing in the real Internet',
          summary:
            'How intra-domain protocols use link state, how BGP glues autonomous systems together with policy rather than cost, and why BGP is both indispensable and fragile.',
          estimatedMinutes: 120,
          objectives: [
            'Explain why routing is split into intra-AS and inter-AS and what each protocol optimises',
            'Describe OSPF operation: areas, LSAs, hello protocol and the use of Dijkstra',
            'Explain BGP sessions (eBGP/iBGP), path-vector advertisements, attributes and the route-selection process',
            'Analyse a real BGP hijack or leak and explain what RPKI and route filtering prevent',
          ],
          concepts: [
            'Autonomous systems; intra-AS vs inter-AS routing',
            'OSPF: link-state in practice, areas, hierarchy',
            'BGP as a path-vector protocol; AS-PATH, NEXT-HOP, LOCAL-PREF, MED',
            'eBGP and iBGP sessions; route reflectors',
            'Policy: customer > peer > provider; export rules',
            'Hot-potato routing',
            'Hijacks, leaks, RPKI and route origin validation',
          ],
          explanation: `The Internet cannot run one routing algorithm over a billion nodes, and its member networks would not want it to: each wants to hide its internals and choose routes by business policy. So routing is split. Inside an AS, an **interior gateway protocol** finds least-cost paths; between ASes, **BGP** chooses paths by policy.

**OSPF** is the dominant interior protocol and is link-state routing as described last lesson, with engineering on top: a hello protocol to detect neighbours and failures, reliable flooding of **link-state advertisements**, authentication, and **areas** that split a large AS into regions so each router only holds its own area's map plus summaries. Costs are administratively set, usually from bandwidth.

**BGP** (RFC 4271) is different in kind. Routers in neighbouring ASes open TCP sessions (**eBGP**) and advertise prefixes together with **attributes**, chiefly the **AS-PATH** (the list of ASes the route has traversed, which both detects loops and lets policy act on it) and the **NEXT-HOP**. Within an AS the border routers redistribute what they learn over **iBGP** sessions. For each prefix a router may learn several routes and selects one by a fixed sequence: highest **LOCAL-PREF** (the operator's policy, typically customer routes over peer routes over provider routes, because customers pay), then shortest AS-PATH, then lowest **MED**, then closest NEXT-HOP by interior cost (**hot-potato** routing: hand traffic off as soon as possible), then tie-breakers. Export policy is equally deliberate: you advertise customer routes to everyone, but peer and provider routes only to customers, since carrying traffic between two non-paying networks is a free service.

BGP's weakness is that advertisements are believed. A network that announces a prefix it does not own, by error or malice, attracts that prefix's traffic (a **hijack**); a network that re-advertises routes it should not (a **leak**) can pull a continent's traffic through an under-provisioned link. The 2008 Pakistan Telecom YouTube hijack and the 2019 Verizon leak are the classic cases. **RPKI** lets prefix holders cryptographically authorise origin ASes and lets routers reject invalid origins; adoption is now widespread but incomplete.

Read the Kurose and Ross chapter 5 BGP sections, RFC 4271 sections 1-5 and 9 (decision process), one or two of the Cloudflare incident write-ups, and explore real routing tables through a looking glass and bgp.he.net.`,
          resources: [
            {
              title: 'RFC 4271 — A Border Gateway Protocol 4 (BGP-4)',
              url: 'https://www.rfc-editor.org/rfc/rfc4271',
              type: 'documentation',
              cost: 'free',
              provider: 'IETF',
              note: 'Sections 1-5 (overview, messages, attributes) and 9.1 (decision process).',
              primary: true,
            },
            {
              title: 'RFC 2328 — OSPF Version 2',
              url: 'https://www.rfc-editor.org/rfc/rfc2328',
              type: 'documentation',
              cost: 'free',
              provider: 'IETF',
              note: 'Long; read sections 1-4 for the architecture and areas.',
            },
            {
              title: 'Kurose & Ross chapter 5 lecture videos (OSPF, BGP, routing policy)',
              url: 'https://gaia.cs.umass.edu/kurose_ross/lectures.php',
              type: 'lecture',
              cost: 'free',
              provider: 'Kurose & Ross (UMass)',
            },
            {
              title: 'RIPE Routing Information Service (RIS) — live BGP data and looking glass',
              url: 'https://www.ripe.net/analyse/internet-measurements/routing-information-service-ris/',
              type: 'dataset',
              cost: 'free',
              provider: 'RIPE NCC',
            },
            {
              title: 'RFC 6480 — An Infrastructure to Support Secure Internet Routing (RPKI)',
              url: 'https://www.rfc-editor.org/rfc/rfc6480',
              type: 'documentation',
              cost: 'free',
              provider: 'IETF',
            },
          ],
          exercises: [
            {
              slug: 'bgp-decision-process',
              title: 'Apply the BGP decision process',
              prompt:
                'Router R in AS 100 learns prefix 203.0.113.0/24 via four routes: from a customer with AS-PATH [200 300], from a peer with AS-PATH [400], from a provider with AS-PATH [500], and from a second customer with AS-PATH [600 700 300] but a lower interior cost to its next hop. Assign LOCAL-PREF per the standard policy, apply the decision process step by step and state the chosen route. Then state which of the four routes R will advertise to its customer, its peer and its provider, and why.',
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'explore-real-bgp',
              title: 'Explore real routing data',
              prompt:
                'Using bgp.he.net and the RIPE RIS looking glass, pick a prefix (your university or employer) and record: its origin AS, the AS-PATHs seen from five different RIS collectors, the number of distinct upstream ASes, and whether the prefix has a valid RPKI ROA. Draw the AS graph you observed. Then find an ASN that has announced a prefix with an RPKI-invalid origin (RIS and bgp.he.net flag these) and explain what would happen to that announcement at a validating router.',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'hijack-case-study',
              title: 'Dissect a BGP incident',
              prompt:
                'Read a detailed public post-mortem of a BGP hijack or route leak (Cloudflare\'s blog has several). Write two pages explaining: what was announced, why other networks accepted it, the mechanism by which traffic was diverted, how long it took to detect and fix, and which of RPKI origin validation, prefix filtering, maximum-prefix limits or peer-locking would have prevented it. Reproduce the AS-PATH in question.',
              kind: 'writing',
              difficulty: 2,
            },
            {
              slug: 'mininet-ospf',
              title: 'Run a real routing protocol in Mininet',
              prompt:
                'Install Mininet and FRRouting (or Quagga). Build a 5-router topology with redundant paths, enable OSPF on all routers, and show with traceroute between two hosts which path is used. Capture OSPF hello and LSA packets in Wireshark. Fail the link on the active path with `link down` and measure how long until traceroute shows the backup path; tune the hello/dead timers and measure again.',
              kind: 'coding',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does BGP select routes by policy rather than least cost?',
              answerOutline:
                'ASes are independent businesses: cost is meaningless across them, and they must prefer paying customers, avoid carrying free traffic between peers/providers and hide internal topology. Path vector with attributes supports this.',
            },
            {
              question: 'What is the role of the AS-PATH attribute?',
              answerOutline:
                'Loop detection (reject routes containing your own AS), path-length tie-breaking, and a hook for policy (filtering or deprioritising paths through certain ASes).',
            },
            {
              question: 'What is hot-potato routing?',
              answerOutline:
                'When iBGP offers several equally good exit routers, choose the one nearest by interior cost: get the traffic out of your network as cheaply as possible.',
            },
            {
              question: 'What does RPKI route origin validation check and what does it not catch?',
              answerOutline:
                'That the origin AS in an announcement is authorised for the prefix (per signed ROAs). It does not validate the rest of the AS-PATH, so a hijacker that forges the correct origin and prepends itself still passes.',
            },
          ],
        },
      ],
      project: {
        slug: 'software-router',
        title: 'A software IP router with a routing daemon',
        description: `Build a user-space IPv4 router in Python or C that reads packets from several interfaces (Linux TAP devices or a Mininet topology), decrements TTL, recomputes the header checksum, performs longest-prefix match and forwards, generating ICMP Time Exceeded and Destination Unreachable messages where required. Then add a routing daemon implementing a RIP-like distance-vector protocol (or a simplified link-state protocol) over UDP between your routers so forwarding tables are learned, not configured. Verify end-to-end ping and traceroute across three of your routers, and show recovery after a link failure.`,
        deliverables: [
          'Router source with ARP handling, forwarding, TTL/ICMP processing and a test harness',
          'Routing daemon with a protocol specification and convergence measurements',
          'Wireshark captures showing forwarding, an ICMP Time Exceeded from your router, and your routing messages',
          'README with the Mininet or TAP topology used and reproduction steps',
        ],
        estimatedHours: 15,
        stretchGoals: [
          'Add NAT to one router and demonstrate two inside hosts sharing one address',
          'Add IPv6 forwarding and neighbour discovery',
          'Implement equal-cost multipath and show load sharing with flow hashing',
        ],
      },
    },
    {
      slug: 'link-layer-and-wireless',
      title: 'Link Layer and Wireless',
      description:
        'The one-hop protocols: detecting errors, sharing a medium among many senders, Ethernet switching and ARP, Wi-Fi, and finally a complete walk-through of a web request across every layer.',
      lessons: [
        {
          slug: 'error-detection-and-multiple-access',
          title: 'Error detection and multiple access protocols',
          summary:
            'Parity, checksums and CRCs; then how many nodes share one broadcast channel: slotted ALOHA, CSMA/CD and their efficiencies.',
          estimatedMinutes: 100,
          objectives: [
            'Compute a CRC by polynomial division and explain which errors it detects',
            'Contrast channel partitioning, random access and taking-turns protocols',
            'Derive the maximum efficiency of slotted ALOHA (1/e) and explain CSMA/CD efficiency',
            'Explain why Ethernet needed a minimum frame size and why switched Ethernet made collisions disappear',
          ],
          concepts: [
            'Link-layer services: framing, link access, reliable delivery, error detection',
            'Parity, Internet checksum, CRC (polynomial arithmetic mod 2)',
            'TDMA, FDMA, CDMA (channel partitioning)',
            'Slotted ALOHA efficiency Np(1-p)^(N-1) → 1/e',
            'CSMA, CSMA/CD, binary exponential backoff',
            'Efficiency ≈ 1 / (1 + 5 d_prop/d_trans)',
            'Taking turns: polling, token passing',
          ],
          explanation: `The link layer moves frames across a single link, which may be point-to-point or a **broadcast** medium shared by many nodes. Two problems dominate: detecting corruption, and deciding who may transmit.

**Error detection** adds redundancy. A parity bit catches any odd number of flipped bits and misses even numbers. The Internet checksum is cheap in software and used by transport protocols. Link layers use the **cyclic redundancy check**: treat the data $D$ as a polynomial over GF(2), choose a generator $G$ of degree $r$, and append $r$ bits $R$ such that $D \\cdot 2^r \\oplus R$ is divisible by $G$. Division is XOR-based long division, cheap in hardware. A good 32-bit CRC detects all burst errors shorter than 33 bits and all errors with an odd number of bits.

**Multiple access** has three families. **Channel partitioning** (TDMA, FDMA, CDMA) gives each node a fixed share: fair under full load, wasteful otherwise. **Random access** lets nodes transmit when they have data and recover from collisions. In **slotted ALOHA** each node transmits in a slot with probability $p$; the chance a slot carries exactly one successful transmission is $Np(1-p)^{N-1}$, maximised at $1/e \\approx 37\\%$ as $N$ grows. **CSMA** improves on this by listening before sending, and **CSMA/CD** by stopping as soon as a collision is detected, then waiting a random time drawn from an exponentially growing range (**binary exponential backoff**). Its efficiency is roughly $1/(1 + 5\\,d_{prop}/d_{trans})$: collisions matter when propagation time is long compared with the frame, which is why classic Ethernet set a minimum frame size (64 bytes) so a collision is always detected before transmission ends. **Taking-turns** protocols (polling, tokens) avoid collisions at the cost of overhead and a single point of failure.

Modern wired Ethernet is switched and full-duplex: every link has exactly one sender per direction, so CSMA/CD is no longer used. The ideas live on in Wi-Fi, where the shared medium is unavoidable.

Work through Kurose and Ross chapter 6 and the corresponding chapter in *A Systems Approach*, derive the ALOHA result yourself, and do the CRC exercise by hand before trusting code.`,
          resources: [
            {
              title: 'Kurose & Ross chapter 6 lecture videos (error detection, multiple access)',
              url: 'https://gaia.cs.umass.edu/kurose_ross/lectures.php',
              type: 'lecture',
              cost: 'free',
              provider: 'Kurose & Ross (UMass)',
              primary: true,
            },
            {
              title: 'A Systems Approach — Chapter 2 (Direct Links: encoding, framing, error detection, Ethernet)',
              url: 'https://book.systemsapproach.org/',
              type: 'textbook',
              cost: 'free',
              provider: 'Peterson & Davie',
            },
            {
              title: 'Kurose & Ross interactive problems (chapter 6: CRC, ALOHA, CSMA/CD)',
              url: 'https://gaia.cs.umass.edu/kurose_ross/interactive/',
              type: 'problem-set',
              cost: 'free',
              provider: 'Kurose & Ross (UMass)',
            },
          ],
          exercises: [
            {
              slug: 'crc-by-hand-and-code',
              title: 'CRC by hand and in code',
              prompt:
                'Using generator G = 1001, compute the CRC bits for data 101110 by long division mod 2, showing every step, and verify the receiver computation gives zero remainder. Then implement CRC-32 (the Ethernet polynomial 0x04C11DB7) bitwise in Python, verify against zlib.crc32 on ten random inputs, and demonstrate experimentally the fraction of random 2-bit, 3-bit and 40-bit burst errors it detects over 100,000 trials.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'aloha-derivation-and-sim',
              title: 'Slotted ALOHA: derive and simulate',
              prompt:
                'Derive the efficiency of slotted ALOHA with N nodes each transmitting with probability p, find the optimal p and the limit as N → ∞. Then simulate N = 5, 20, 100 nodes over 100,000 slots for a range of p and plot measured throughput against the formula. Add pure (unslotted) ALOHA and show its maximum is half that of slotted.',
              kind: 'simulation',
              difficulty: 2,
            },
            {
              slug: 'csma-cd-minimum-frame',
              title: 'Minimum frame size on Ethernet',
              prompt:
                'For a 10 Mb/s Ethernet with maximum cable length 2500 m and propagation speed 2 × 10^8 m/s, compute the worst-case time to detect a collision and hence the minimum frame size in bits; compare with the real 512-bit minimum (which includes repeater delays). Repeat for 1 Gb/s and explain what Gigabit Ethernet had to change. Then simulate CSMA/CD with binary exponential backoff for 10 nodes and measure efficiency against the a = d_prop/d_trans ratio.',
              kind: 'problem',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why is CRC preferred over a checksum at the link layer?',
              answerOutline:
                'Stronger guarantees (all bursts up to r bits, all odd-bit errors) and trivial hardware implementation with shift registers; checksums are chosen at higher layers for cheap software computation.',
            },
            {
              question: 'Why does slotted ALOHA top out at 37 %?',
              answerOutline:
                'Each slot is wasted if zero nodes transmit or more than one do; optimising p balances the two wastes and gives success probability 1/e in the large-N limit.',
            },
            {
              question: 'Why does CSMA/CD efficiency depend on d_prop/d_trans?',
              answerOutline:
                'Collisions can only occur in the first propagation time after a node starts sending; the longer the propagation relative to the frame, the larger the vulnerable window relative to useful transmission.',
            },
            {
              question: 'Why is CSMA/CD no longer used on modern Ethernet?',
              answerOutline:
                'Switched full-duplex links have one sender per direction; there is no shared medium and hence no collision.',
            },
          ],
        },
        {
          slug: 'ethernet-switching-and-arp',
          title: 'Ethernet, ARP and switched LANs',
          summary:
            'MAC addresses, the Ethernet frame, how ARP maps IP addresses to MAC addresses, and how self-learning switches build plug-and-play LANs.',
          estimatedMinutes: 100,
          objectives: [
            'Read an Ethernet frame (addresses, EtherType, FCS) and explain why MAC addresses exist separately from IP addresses',
            'Explain the ARP protocol, the ARP cache, and what happens when the destination is off-subnet',
            'Describe switch self-learning, flooding and filtering, and why loops require the spanning tree protocol',
            'Explain VLANs and compare switches with routers',
          ],
          concepts: [
            'MAC addresses: 48-bit, flat, globally unique',
            'Ethernet frame: preamble, addresses, type, data, CRC',
            'ARP request/reply; ARP cache and timeouts; gratuitous ARP',
            'Default gateway: sending to an off-subnet destination',
            'Switch table, self-learning, flooding, filtering',
            'Spanning tree protocol',
            'VLANs and 802.1Q tagging',
          ],
          explanation: `Every network interface has a 48-bit **MAC address** burned in by the manufacturer, flat (no hierarchy) and globally unique. Why have it in addition to an IP address? Because the link layer must work before, and independently of, IP: a frame must be deliverable on a LAN whether it carries IPv4, IPv6 or something else, and an interface's IP address changes when it moves while its MAC does not. The **Ethernet frame** is: preamble (for clock sync), destination MAC, source MAC, **EtherType** (0x0800 IPv4, 0x86DD IPv6, 0x0806 ARP), data of 46-1500 bytes, and a CRC. There are no acknowledgements; Ethernet is unreliable and connectionless, and TCP covers the losses.

To send an IP datagram to a host on the same subnet, the sender needs the host's MAC. **ARP** solves this: broadcast "who has 10.0.0.5?", and the owner replies with its MAC; the answer is cached for about 20 minutes. If the destination is off-subnet, the sender instead ARPs for the **default gateway** router's MAC and frames the datagram to it; the IP header still carries the final destination. This two-level addressing is the moment where the network and link layers meet, and a capture of it is the clearest demonstration of encapsulation you will ever see.

A **switch** is a link-layer device that forwards frames between its ports, invisibly to hosts. It **self-learns**: on each incoming frame it records (source MAC → port). If the destination MAC is in the table it **filters** the frame to that port only; otherwise it **floods** to all other ports. Redundant links would make floods loop forever, so switches run the **spanning tree protocol** to disable links until the active topology is a tree. **VLANs** let one physical switch carry several isolated LANs, with 802.1Q tags marking frames on trunks between switches. Switches are plug-and-play and fast; routers are configured, hierarchical and scale to the world. Large networks use switches within a subnet and routers between.

Do the Kurose and Ross Ethernet and ARP lab, then the exercises, which build and break a switched LAN in Mininet.`,
          resources: [
            {
              title: 'Kurose & Ross Wireshark lab: Ethernet and ARP',
              url: 'https://gaia.cs.umass.edu/kurose_ross/wireshark.php',
              type: 'problem-set',
              cost: 'free',
              provider: 'Kurose & Ross (UMass)',
              primary: true,
            },
            {
              title: 'RFC 826 — An Ethernet Address Resolution Protocol',
              url: 'https://www.rfc-editor.org/rfc/rfc826',
              type: 'documentation',
              cost: 'free',
              provider: 'IETF',
              note: 'Short and readable; the packet format and the algorithm.',
            },
            {
              title: 'A Systems Approach — Chapter 3.1-3.2 (Switching and bridging, spanning tree, VLANs)',
              url: 'https://book.systemsapproach.org/',
              type: 'textbook',
              cost: 'free',
              provider: 'Peterson & Davie',
            },
            {
              title: 'Mininet walkthrough',
              url: 'http://mininet.org/walkthrough/',
              type: 'tool',
              cost: 'free',
              provider: 'Mininet',
              note: 'Virtual network emulator used in the exercises; runs on a Linux VM.',
            },
          ],
          exercises: [
            {
              slug: 'arp-capture-and-cache',
              title: 'Watch ARP work',
              prompt:
                'Clear your ARP cache (`ip neigh flush all`), start a capture with filter `arp`, ping a host on your subnet and then a host on the Internet. Identify both ARP request/reply pairs, note which address was asked for in each case and explain why the second was the router, not the destination. Show the ARP cache afterwards (`ip neigh`) with entry states. Then write a Python script using scapy that sends an ARP request and prints the reply.',
              kind: 'data-analysis',
              difficulty: 1,
            },
            {
              slug: 'switch-learning-simulation',
              title: 'Implement a learning switch',
              prompt:
                'Write a learning-switch simulator with N ports, processing a sequence of frames (src MAC, dst MAC, in-port). Implement learning, filtering, flooding and entry ageing. Feed it a trace and print the table after each frame and the list of ports each frame was sent to. Then connect two of your simulated switches in a loop with no spanning tree, inject one broadcast frame and show the frame count growing without bound.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'mininet-lan-and-stp',
              title: 'Build a redundant LAN in Mininet',
              prompt:
                'In Mininet, create three switches in a triangle with two hosts. Without STP, run `ping` and observe the broadcast storm (CPU usage, duplicate ARP replies in a capture). Enable STP on the switches (Open vSwitch `stp_enable=true`), wait for convergence, identify the blocked port with `ovs-vsctl` output, and show ping now works. Fail the active link and measure the time to reconverge.',
              kind: 'coding',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'When a host sends to an address on another subnet, which MAC and which IP are in the frame it emits?',
              answerOutline:
                'Destination MAC of the default gateway (learned by ARP), destination IP of the final destination. The router rewrites the MACs at each hop; the IP addresses stay.',
            },
            {
              question: 'How does a switch learn where hosts are, and what does it do with an unknown destination?',
              answerOutline:
                'Records source MAC → incoming port from every frame; unknown destinations (and broadcasts) are flooded out all ports except the one they arrived on.',
            },
            {
              question: 'Why do switches need spanning tree but routers do not?',
              answerOutline:
                'Frames have no TTL and flooding in a looped topology circulates forever; IP datagrams have a TTL and routing protocols compute loop-free paths.',
            },
            {
              question: 'What is the difference between an ARP cache and a switch table?',
              answerOutline:
                'ARP cache (in hosts/routers): IP → MAC on the local subnet. Switch table: MAC → port. Different devices, different mappings.',
            },
          ],
        },
        {
          slug: 'wireless-and-mobile-networks',
          title: 'Wireless LANs and mobile networks',
          summary:
            'Why radio is different: fading, interference and hidden terminals; how 802.11 shares the air with CSMA/CA; and how cellular networks keep you connected while moving.',
          estimatedMinutes: 100,
          objectives: [
            'Explain the physical characteristics of wireless links (path loss, multipath, interference, SNR vs bit error rate) and their protocol consequences',
            'Describe 802.11 CSMA/CA with link-layer ACKs, and the hidden-terminal problem and RTS/CTS',
            'Explain association, scanning and the four frame addresses in 802.11',
            'Give an overview of cellular architecture (4G/5G) and of mobility management via handoff and home/visited networks',
          ],
          concepts: [
            'Path loss, multipath fading, interference, SNR and BER',
            'Hidden and exposed terminal problems',
            '802.11 architecture: BSS, access point, association',
            'CSMA/CA, DIFS/SIFS, link-layer ACKs, RTS/CTS',
            '802.11 frame addressing (three or four MAC addresses)',
            'Rate adaptation; 802.11 generations and OFDM/MIMO',
            'Cellular: base station, core network, handoff; home vs visited network',
          ],
          explanation: `Radio breaks assumptions wired links allow. Signal strength falls with distance and obstacles (**path loss**), copies arriving over reflected paths interfere (**multipath**), and other transmitters on the same frequency add noise. The bit error rate depends steeply on **signal-to-noise ratio**, so links switch modulation and coding schemes dynamically (**rate adaptation**). Most importantly, a radio cannot reliably detect collisions while transmitting (its own signal swamps the receiver), and not all stations can hear each other: two stations out of each other's range but both in range of the access point will collide at the AP without knowing (**hidden terminals**).

**802.11 (Wi-Fi)** therefore uses **CSMA/CA**, collision avoidance: listen, wait a DIFS interval, count down a random backoff only while the channel is idle, transmit the whole frame, then expect a **link-layer ACK** after a SIFS. No ACK means retransmit with a bigger backoff. Unlike Ethernet, Wi-Fi is reliable at the link layer because radio losses are too common to leave to TCP. For large frames a station may first reserve the channel with short **RTS/CTS** frames, which the AP answers so hidden stations hear the CTS and stay quiet. A frame carries three MAC addresses (receiver, transmitter, and the ultimate destination or source on the wired side) so the AP can bridge to Ethernet.

A station joins by **scanning** for beacons, authenticating, and **associating** with an access point; the AP and its stations form a **basic service set**. Each 802.11 generation (n, ac, ax/Wi-Fi 6, be/Wi-Fi 7) adds wider channels, OFDM and **MIMO** spatial streams to multiply throughput.

**Cellular** networks solve a different problem: coverage and mobility over kilometres. A phone attaches to a **base station**; a core network authenticates it, assigns it an address and tunnels its traffic through a gateway that stays fixed as the phone moves, so **handoff** between base stations does not change the phone's IP address. Roaming uses a **home network** that keeps the subscriber record and a **visited network** that forwards traffic, the same indirect-routing idea as Mobile IP.

Watch the Kurose and Ross chapter 7 videos and read the 802.11 sections of *A Systems Approach*; then do the Wi-Fi capture exercise, which needs an interface in monitor mode.`,
          resources: [
            {
              title: 'Kurose & Ross chapter 7 lecture videos (wireless links, 802.11, cellular, mobility)',
              url: 'https://gaia.cs.umass.edu/kurose_ross/lectures.php',
              type: 'lecture',
              cost: 'free',
              provider: 'Kurose & Ross (UMass)',
              primary: true,
            },
            {
              title: 'A Systems Approach — Chapter 2.7 (Wireless Networks: 802.11, Bluetooth, cellular)',
              url: 'https://book.systemsapproach.org/',
              type: 'textbook',
              cost: 'free',
              provider: 'Peterson & Davie',
            },
            {
              title: 'Kurose & Ross Wireshark lab: 802.11 Wi-Fi',
              url: 'https://gaia.cs.umass.edu/kurose_ross/wireshark.php',
              type: 'problem-set',
              cost: 'free',
              provider: 'Kurose & Ross (UMass)',
              note: 'Provides a monitor-mode trace if your hardware cannot capture 802.11 frames.',
            },
            {
              title: 'Wireshark sample captures (802.11 and cellular traces)',
              url: 'https://wiki.wireshark.org/SampleCaptures',
              type: 'dataset',
              cost: 'free',
              provider: 'Wireshark',
            },
          ],
          exercises: [
            {
              slug: 'wifi-frame-analysis',
              title: 'Analyse 802.11 frames',
              prompt:
                'Using the Kurose & Ross Wi-Fi trace (or your own monitor-mode capture), find: a beacon frame and its SSID, supported rates and channel; the association request/response; a data frame with its three addresses identified (which is the AP, the station, the wired destination); the ACK following it and the time gap (SIFS); and an RTS/CTS exchange if present. Compute the fraction of airtime used by management and control frames versus data.',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'csma-ca-hidden-terminal-sim',
              title: 'Simulate the hidden terminal problem',
              prompt:
                'Simulate three nodes A, B, C in a line where A and C cannot hear each other but both reach B. Implement CSMA/CA with backoff and link-layer ACKs; have A and C each send to B with offered loads from 10 % to 100 %. Measure throughput and collision rate. Then add RTS/CTS and repeat. Plot both; explain for which frame sizes RTS/CTS pays for its overhead.',
              kind: 'simulation',
              difficulty: 3,
            },
            {
              slug: 'measure-wifi-vs-wired',
              title: 'Measure Wi-Fi against wired',
              prompt:
                'With iperf3 and ping, measure throughput, RTT mean and RTT standard deviation (jitter) for the same laptop on Ethernet and on Wi-Fi, at two distances from the access point, with and without a microwave oven or second heavy user active. Tabulate and explain each difference in terms of rate adaptation, retransmissions and contention.',
              kind: 'data-analysis',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does 802.11 use collision avoidance and link-layer ACKs instead of collision detection?',
              answerOutline:
                'A radio cannot hear a collision while transmitting and hidden terminals make collisions invisible; losses are frequent, so each frame is acknowledged and retransmitted at the link layer.',
            },
            {
              question: 'What is the hidden-terminal problem and how does RTS/CTS help?',
              answerOutline:
                'Two stations out of each other\'s range both transmit to an AP and collide there. The AP\'s CTS is heard by both and reserves the channel for one of them.',
            },
            {
              question: 'Why does a frame from a station to the Internet carry three MAC addresses?',
              answerOutline:
                'Receiver (AP), transmitter (station) and the wired-side destination (router MAC) so the AP can build the Ethernet frame without ARPing.',
            },
            {
              question: 'How does a phone keep its IP address while moving between base stations?',
              answerOutline:
                'Its traffic is tunnelled through a fixed gateway in the core network; handoff changes only the tunnel endpoint at the base station, not the address visible to the Internet.',
            },
          ],
        },
        {
          slug: 'a-day-in-the-life-of-a-web-request',
          title: 'A day in the life of a web request',
          summary:
            'Every protocol in this subject in one scenario: from plugging in a laptop to rendering a page, with DHCP, ARP, DNS, TCP, TLS and HTTP in the right order, verified against a capture.',
          estimatedMinutes: 90,
          objectives: [
            'Narrate, in order, every protocol exchange between a freshly connected laptop and the first rendered byte of a web page',
            'Identify each of those exchanges in a Wireshark capture and measure how long each took',
            'Explain which steps are cached on later visits and quantify the saving',
            'Explain how data-centre and CDN infrastructure changes the picture on the server side',
          ],
          concepts: [
            'DHCP → ARP → DNS → TCP → TLS → HTTP sequence',
            'Which hops are link-layer (switch), which are network-layer (router)',
            'Caches at every layer: ARP, DNS, TCP connections, HTTP',
            'Where latency goes: a breakdown',
            'Load balancers, anycast, CDN edges',
            'Data-centre network topology (leaf-spine)',
          ],
          explanation: `This lesson is a synthesis, and the best test of whether the previous modules have become one mental model. Take a laptop, plug it into a campus network, and type a URL.

1. **DHCP.** The laptop broadcasts a Discover in a UDP datagram inside an IP datagram (source 0.0.0.0) inside an Ethernet frame to ff:ff:ff:ff:ff:ff. The switch floods it; the DHCP server offers; the laptop requests; the ACK delivers an address, subnet mask, default gateway and DNS server.
2. **ARP.** To reach the DNS server (off-subnet), the laptop must send to the gateway, so it ARPs for the gateway's MAC and caches it.
3. **DNS.** A UDP query goes to the resolver via the gateway router; the router forwards by longest-prefix match across the campus and ISP networks (OSPF inside, BGP between). The resolver may recurse through root, TLD and authoritative servers or answer from cache. An A (or AAAA) record returns.
4. **TCP.** The browser opens a connection: SYN, SYN-ACK, ACK, one RTT, with MSS, window scaling and SACK negotiated.
5. **TLS.** ClientHello and ServerHello with key exchange and certificate, one more RTT in TLS 1.3, after which everything is encrypted.
6. **HTTP.** GET, response, and then a burst of further requests for sub-resources multiplexed over HTTP/2 or HTTP/3, each subject to caching rules.

On the server side the request may have hit an **anycast** address (the same prefix announced by many sites, so BGP delivers you to the nearest), passed through a **load balancer** to one of thousands of servers in a **leaf-spine** data-centre network, and the images may have come from a **CDN** edge inside your ISP. On a second visit, the ARP and DNS caches, a kept-alive TCP/TLS connection and the HTTP cache remove most of the round trips: the difference between a 400 ms first load and a 40 ms second one.

Read Kurose and Ross section 6.7, then produce your own capture of exactly this scenario and annotate every step. The data-centre section of chapter 6 and the CDN sections of chapter 2 fill in the server side.`,
          resources: [
            {
              title: 'Kurose & Ross chapter 6 lecture videos (a day in the life of a web request; data-centre networking)',
              url: 'https://gaia.cs.umass.edu/kurose_ross/lectures.php',
              type: 'lecture',
              cost: 'free',
              provider: 'Kurose & Ross (UMass)',
              primary: true,
            },
            {
              title: 'High Performance Browser Networking — Part IV (browser networking, resource loading)',
              url: 'https://hpbn.co/',
              type: 'textbook',
              cost: 'free',
              provider: "O'Reilly / Ilya Grigorik",
            },
            {
              title: 'Stanford CS144 (the end-to-end "life of a packet" material)',
              url: 'https://cs144.github.io/',
              type: 'course',
              cost: 'free',
              provider: 'Stanford',
            },
          ],
          exercises: [
            {
              slug: 'full-capture-walkthrough',
              title: 'Capture and annotate the whole sequence',
              prompt:
                'Clear ARP and DNS caches, start a capture, disconnect and reconnect your network interface, then load a page you have not visited. Produce a table listing every protocol exchange in order with its first and last frame number, duration, and the layers involved. Compute the total time to first HTTP byte and the share of it spent in DHCP, ARP, DNS, TCP handshake, TLS handshake and HTTP. Repeat the page load immediately and show which steps vanished.',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'latency-budget',
              title: 'Build a latency budget',
              prompt:
                'For a user 80 ms RTT from an origin server, with a resolver 10 ms away and a CDN edge 15 ms away, compute the time to first byte for: cold DNS + fresh TCP + TLS 1.3 + HTTP to the origin; the same with a CDN edge holding the content; the same with a resumed TLS session and 0-RTT over QUIC. Then explain which investments (DNS prefetch, connection preconnect, CDN, HTTP/3) a site should make first.',
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'anycast-and-cdn-observation',
              title: 'Observe anycast and CDN behaviour',
              prompt:
                'Resolve a large CDN-hosted site from your machine and from three RIPE Atlas probes or cloud VMs on different continents. Compare the answers and the traceroute to them. Then traceroute to 1.1.1.1 or 8.8.8.8 from the same vantage points and show that the same address is reached in a few hops everywhere. Explain how BGP anycast achieves this and what it means for TCP connections if a route changes mid-connection.',
              kind: 'data-analysis',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'List the protocols used, in order, from a freshly connected host to the first HTTP response.',
              answerOutline:
                'DHCP (over UDP/IP/Ethernet), ARP for the gateway, DNS (UDP), TCP handshake, TLS handshake, HTTP request/response; with OSPF/BGP having pre-computed the routes used.',
            },
            {
              question: 'Which of those steps are skipped on a second visit a minute later, and why?',
              answerOutline:
                'DHCP (lease held), ARP (cached), DNS (cached for TTL), possibly TCP+TLS (connection reuse) and HTTP (cache); only the application-level request may remain.',
            },
            {
              question: 'How can one IP address be served from dozens of locations?',
              answerOutline:
                'Anycast: each site announces the same prefix in BGP; routing takes each client to the nearest announcing site.',
            },
          ],
        },
      ],
    },
    {
      slug: 'network-security-and-measurement',
      title: 'Network Security, Measurement and Performance',
      description:
        'Securing the channel with TLS and PKI, defending the infrastructure with firewalls, VPNs and secure routing, and the measurement skills to diagnose and tune any network.',
      lessons: [
        {
          slug: 'tls-and-public-key-infrastructure',
          title: 'TLS and the public-key infrastructure',
          summary:
            'What a secure channel must provide, how the TLS 1.3 handshake provides it, and how certificates and certificate authorities bind names to keys.',
          estimatedMinutes: 120,
          objectives: [
            'State the properties of a secure channel (confidentiality, integrity, authentication, forward secrecy) and map each to a TLS mechanism',
            'Walk through the TLS 1.3 handshake message by message and explain the derived keys',
            'Explain X.509 certificates, chains of trust, certificate validation and revocation',
            'Inspect a TLS connection with openssl s_client and Wireshark, and decrypt a capture using key logging',
          ],
          concepts: [
            'Confidentiality, integrity, authentication, forward secrecy',
            'TLS 1.3 handshake: ClientHello, ServerHello, EncryptedExtensions, Certificate, CertificateVerify, Finished',
            'Ephemeral Diffie-Hellman (ECDHE) and AEAD ciphers',
            'X.509 certificates, CAs, chains, SNI',
            'Certificate validation: name, chain, expiry, revocation (OCSP, CRL)',
            'Certificate Transparency; ACME and Let\'s Encrypt',
            'Downgrade attacks; HSTS',
          ],
          explanation: `Nothing in the layers below authenticates anything: IP addresses are forgeable, DNS answers are unsigned by default, and any router on the path can read and rewrite bytes. **TLS** builds a secure channel on top of TCP (and QUIC embeds it) providing **confidentiality** (an observer learns nothing but sizes and timing), **integrity** (modification is detected), **authentication** of the server (and optionally the client) and **forward secrecy** (compromising a long-term key later does not reveal past sessions).

The **TLS 1.3 handshake** does this in one round trip. The client sends **ClientHello** with supported cipher suites, the server name (**SNI**, in cleartext, so the server can pick the right certificate) and an ephemeral Diffie-Hellman public key. The server replies **ServerHello** with its own DH share; both sides now derive a shared secret and every later message is encrypted. The server then sends its **certificate**, a **CertificateVerify** signature over the handshake transcript made with the certificate's private key (proving it holds it), and **Finished**, an HMAC over the transcript. The client verifies, sends its Finished, and application data flows under an **AEAD** cipher such as AES-GCM or ChaCha20-Poly1305. Because the DH keys are ephemeral, forward secrecy follows.

Authentication rests on **X.509 certificates**: a public key, a name, validity dates and a signature by a **certificate authority**. The client checks that the name matches the host, that the chain of signatures leads to a CA in its trust store, that nothing has expired, and (weakly, in practice) that nothing has been revoked. **ACME** and Let's Encrypt automated issuance and made HTTPS the default; **Certificate Transparency** logs every certificate so mis-issuance is detectable. Older versions of TLS had many flaws (BEAST, POODLE, renegotiation, RSA key exchange without forward secrecy), and part of the 1.3 design was deleting them.

Read RFC 8446 sections 1-4, follow the Illustrated TLS 1.3 Connection byte by byte, and do the capture exercises. The Cybersecurity subject covers the underlying cryptography; this lesson is about the protocol.`,
          resources: [
            {
              title: 'RFC 8446 — The Transport Layer Security (TLS) Protocol Version 1.3',
              url: 'https://www.rfc-editor.org/rfc/rfc8446',
              type: 'documentation',
              cost: 'free',
              provider: 'IETF',
              note: 'Sections 1-4 (overview, handshake protocol); appendix E on security properties.',
              primary: true,
            },
            {
              title: 'The Illustrated TLS 1.3 Connection',
              url: 'https://tls13.xargs.org/',
              type: 'interactive',
              cost: 'free',
              note: 'Every byte of a real handshake explained; work through it alongside your own capture.',
            },
            {
              title: 'RFC 5280 — X.509 Certificate and CRL Profile',
              url: 'https://www.rfc-editor.org/rfc/rfc5280',
              type: 'documentation',
              cost: 'free',
              provider: 'IETF',
              note: 'Section 6 (certification path validation) is the part to read.',
            },
            {
              title: "Let's Encrypt — How it works (ACME)",
              url: 'https://letsencrypt.org/how-it-works/',
              type: 'article',
              cost: 'free',
              provider: "Let's Encrypt",
            },
            {
              title: 'badssl.com — test endpoints for broken TLS configurations',
              url: 'https://badssl.com/',
              type: 'tool',
              cost: 'free',
            },
          ],
          exercises: [
            {
              slug: 'handshake-capture-and-decrypt',
              title: 'Capture, inspect and decrypt a TLS session',
              prompt:
                'Set SSLKEYLOGFILE, open a browser, load an HTTPS page and capture it. In Wireshark configure the key log and identify every handshake message, the chosen cipher suite, the SNI, the certificate chain, and the first decrypted HTTP request. Measure the handshake time. Then connect with `openssl s_client -connect host:443 -servername host` and compare the printed chain and verification result. Explain why the key log allows decryption without the server\'s private key.',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'certificate-validation-code',
              title: 'Validate certificates yourself',
              prompt:
                'Using Python\'s ssl and cryptography libraries, write a tool that connects to a host, fetches the chain, and checks: hostname against subjectAltName, each signature against the issuer\'s key, validity dates, and whether the root is in the system store. Run it against the badssl.com endpoints (expired, wrong host, self-signed, untrusted root, revoked) and show that your tool reports each correctly. State which check your tool cannot do without OCSP/CRL support.',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'tls-security-properties',
              title: 'Map properties to mechanisms',
              prompt:
                'Write a one-page table mapping each secure-channel property (confidentiality, integrity, server authentication, forward secrecy, replay protection, downgrade protection) to the exact TLS 1.3 mechanism that provides it, the handshake message in which it is established, and the attack that would succeed if the mechanism were removed. Add a row for what TLS does not protect (SNI, sizes, timing, DNS).',
              kind: 'writing',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'How does TLS 1.3 achieve forward secrecy?',
              answerOutline:
                'Session keys come from an ephemeral (EC)DH exchange whose private values are discarded; the certificate key only signs the transcript, so its later compromise reveals no past session keys.',
            },
            {
              question: 'What does the client verify about a server certificate?',
              answerOutline:
                'Name matches the host (SAN), chain of valid signatures to a trusted root, validity period, key usage, and ideally revocation status; plus the CertificateVerify proves possession of the private key.',
            },
            {
              question: 'What does an observer still learn from a TLS connection?',
              answerOutline:
                'The server name (SNI, unless ECH), IP addresses, timing and sizes of records, and the DNS lookup before it (unless DoH/DoT).',
            },
            {
              question: 'Why was RSA key exchange removed in TLS 1.3?',
              answerOutline:
                'It gave no forward secrecy (the premaster secret is encrypted to the long-term key) and enabled padding-oracle attacks; only (EC)DHE remains.',
            },
          ],
          relatedLessons: ['cybersecurity/applied-cryptography/tls-and-secure-channels'],
        },
        {
          slug: 'securing-network-infrastructure',
          title: 'Firewalls, VPNs, DNS security and attacks on the infrastructure',
          summary:
            'Defending the network itself: stateful firewalls and nftables, intrusion detection, WireGuard and IPsec, DNSSEC and encrypted DNS, spoofing, SYN floods and DDoS.',
          estimatedMinutes: 120,
          objectives: [
            'Write a stateful firewall rule set with nftables or iptables and test it',
            'Explain how a VPN tunnel encapsulates and authenticates traffic and set up WireGuard between two hosts',
            'Describe IP spoofing, SYN flooding, reflection/amplification DDoS and the defences (SYN cookies, BCP 38, anycast scrubbing)',
            'Explain what DNSSEC, DoT/DoH and RPKI each secure and verify a DNSSEC chain with dig',
          ],
          concepts: [
            'Packet filters vs stateful firewalls vs application gateways',
            'Default deny; connection tracking',
            'Intrusion detection and prevention (signatures, anomaly)',
            'VPNs: WireGuard, IPsec (ESP), tunnel vs transport mode',
            'IP spoofing and ingress filtering (BCP 38)',
            'SYN floods and SYN cookies; reflection and amplification',
            'DNSSEC chain of trust; DoT/DoH; RPKI',
          ],
          explanation: `A **firewall** enforces policy at a boundary. A stateless packet filter matches each packet on addresses, ports and flags; a **stateful** firewall tracks connections so it can allow replies to outbound connections while blocking unsolicited inbound ones, which is what a home router does by default. **Default deny** (block everything, then allow what is needed) is the rule; Linux's **nftables** (successor of iptables) expresses it in a few lines, and you will write and test such a rule set. Application-layer gateways and **intrusion detection systems** such as Suricata and Zeek look deeper, matching signatures or anomalies in payloads, at the cost of needing to see cleartext.

A **VPN** extends a private network over a public one by encapsulating packets in an authenticated, encrypted tunnel. **WireGuard** is the modern design: a few thousand lines, Curve25519 keys, a Noise handshake, and a UDP transport; peers are configured with public keys and allowed IP ranges, and the kernel routes into the tunnel interface like any other. **IPsec** is the older, more general standard (ESP for encryption, IKE for key exchange) built into every router.

The infrastructure itself is attacked in characteristic ways. **IP spoofing** forges source addresses; the fix, **ingress filtering** (BCP 38), is for every ISP to drop packets whose source could not legitimately come from that customer, and it is incompletely deployed. **SYN floods** exhaust a server's half-open connection table; **SYN cookies** encode the connection state in the sequence number so nothing is stored until the handshake completes. **Reflection and amplification** attacks send small spoofed requests to open DNS or NTP servers that reply with large responses to the victim; mitigation is rate limiting, closing open resolvers, and absorbing the flood across an **anycast** network with scrubbing capacity. Finally, the control planes are secured piecemeal: **DNSSEC** signs zone data, **DoT/DoH** encrypt stub queries, and **RPKI** authorises route origins.

Read the Cloudflare DDoS and BGP explainers, the WireGuard paper, and the nftables documentation, then build the firewall and VPN in the exercises.`,
          resources: [
            {
              title: 'WireGuard: Next Generation Kernel Network Tunnel (whitepaper)',
              url: 'https://www.wireguard.com/papers/wireguard.pdf',
              type: 'article',
              cost: 'free',
              provider: 'WireGuard',
              note: 'Sections 1-5 for the design; the configuration examples on wireguard.com for setup.',
              primary: true,
            },
            {
              title: 'nftables wiki (Netfilter project)',
              url: 'https://wiki.nftables.org/',
              type: 'documentation',
              cost: 'free',
              provider: 'Netfilter',
              note: 'Quick reference and the "simple ruleset for a workstation" example.',
            },
            {
              title: 'RFC 4987 — TCP SYN Flooding Attacks and Common Mitigations',
              url: 'https://www.rfc-editor.org/rfc/rfc4987',
              type: 'documentation',
              cost: 'free',
              provider: 'IETF',
            },
            {
              title: 'RFC 2827 (BCP 38) — Network Ingress Filtering',
              url: 'https://www.rfc-editor.org/rfc/rfc2827',
              type: 'documentation',
              cost: 'free',
              provider: 'IETF',
            },
            {
              title: 'RFC 4035 — Protocol Modifications for DNS Security Extensions',
              url: 'https://www.rfc-editor.org/rfc/rfc4035',
              type: 'documentation',
              cost: 'free',
              provider: 'IETF',
              note: 'Section 5 (authenticating responses) explains the chain of trust you verify with dig.',
            },
          ],
          exercises: [
            {
              slug: 'nftables-ruleset',
              title: 'Write and test a stateful firewall',
              prompt:
                'On a Linux VM, write an nftables rule set that: drops everything inbound by default, allows established/related traffic, allows SSH only from one subnet, allows HTTP/HTTPS from anywhere, rate-limits ICMP echo to 5/s, and logs dropped packets. Test every rule from a second VM with nmap and nc, and show the counters (`nft list ruleset`) incrementing. Then add an outbound policy that permits only DNS, HTTP(S) and NTP and verify that an outbound connection to port 25 is blocked.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'wireguard-tunnel',
              title: 'Set up and inspect a WireGuard tunnel',
              prompt:
                'Configure WireGuard between two VMs (or a VM and a cloud instance). Route one VM\'s Internet traffic through the other. Capture on the physical interface and on wg0 simultaneously: show the UDP-encapsulated encrypted packets on one and the cleartext on the other, identify the handshake packets, and measure the throughput and MTU overhead the tunnel adds. Explain what an observer on the path can and cannot learn.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'syn-flood-lab',
              title: 'SYN flood and SYN cookies in a lab',
              prompt:
                'In an isolated lab network (two VMs, never the Internet), run a simple TCP server, then use hping3 or scapy from the attacker VM to send SYNs with random source addresses at 10,000/s. Observe `ss -tan state syn-recv | wc -l` and whether a legitimate client can still connect. Enable net.ipv4.tcp_syncookies, repeat, and explain what changed and why SYN cookies cost nothing until a flood. Capture a cookie-generated SYN-ACK and decode what is encoded in its sequence number.',
              kind: 'coding',
              difficulty: 3,
              hint: 'Keep both VMs on a host-only network; sending spoofed packets on a real network may violate your provider\'s terms.',
            },
            {
              slug: 'dnssec-validation',
              title: 'Verify a DNSSEC chain',
              prompt:
                'With `dig +dnssec`, fetch the DNSKEY and RRSIG records for a signed domain, the DS record in its parent, and walk the chain to the root trust anchor, listing each key and signature. Then query a deliberately broken DNSSEC test domain and show a validating resolver returns SERVFAIL while a non-validating one returns an answer. Explain what an attacker could do against the non-validating path.',
              kind: 'data-analysis',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What does a stateful firewall track that a packet filter does not, and what does that enable?',
              answerOutline:
                'Connection state (the 4-tuple and TCP state); it can permit reply traffic to outbound connections while denying unsolicited inbound packets.',
            },
            {
              question: 'How do SYN cookies defeat SYN floods?',
              answerOutline:
                'The server encodes the connection parameters in the SYN-ACK sequence number and stores nothing; only when the final ACK echoes a valid cookie does it allocate state. Spoofed SYNs never complete.',
            },
            {
              question: 'Why do amplification attacks need IP spoofing, and what deployment would stop them?',
              answerOutline:
                'The attacker must forge the victim\'s source address so the large replies go to the victim; universal ingress filtering (BCP 38) at ISPs would drop the spoofed requests.',
            },
            {
              question: 'What does a VPN protect you from and what does it not?',
              answerOutline:
                'Hides content and destinations from the local network/ISP and gives a private address on the remote network; it does not hide you from the VPN provider, nor protect the application layer beyond the tunnel.',
            },
          ],
        },
        {
          slug: 'measurement-and-troubleshooting',
          title: 'Network measurement and troubleshooting',
          summary:
            'The tools and the method: ping, traceroute, dig, ss, tcpdump, iperf3, and a layered diagnostic procedure for "the network is slow" and "it does not connect".',
          estimatedMinutes: 100,
          objectives: [
            'Use ping, traceroute/mtr, dig, ss, ip, tcpdump and iperf3 to characterise a path and a host',
            'Follow a bottom-up or divide-and-conquer diagnostic procedure to localise a failure to a layer and a device',
            'Distinguish loss, latency, jitter and bandwidth problems and the tools that reveal each',
            'Write tcpdump/tshark filters and scripts to extract metrics from captures automatically',
          ],
          concepts: [
            'Active vs passive measurement',
            'ping, traceroute, mtr; ICMP rate limiting and asymmetric paths',
            'ss, ip, netstat equivalents; socket states',
            'tcpdump and tshark; BPF filters',
            'iperf3; speed tests; RIPE Atlas',
            'Layered troubleshooting: physical → link → IP → transport → DNS → application',
            'MTU problems, DNS failures, asymmetric routing, port blocking',
          ],
          explanation: `Most of the value of understanding networks is realised when something is broken. This lesson turns the previous modules into a procedure. **Active measurement** injects traffic (ping, traceroute, iperf3); **passive** measurement watches what is there (tcpdump, flow records, counters). You need both.

Start from the bottom. **Link**: is the interface up, does it have a carrier, are there errors or drops on the counters (\`ip -s link\`)? **IP**: does the host have an address, a default route, can it reach the gateway (\`ip addr\`, \`ip route\`, \`ping gateway\`)? **Path**: \`traceroute\` or \`mtr\` shows where packets stop or where loss and latency begin; remember that routers rate-limit ICMP and that the return path may differ, so loss at an intermediate hop that does not continue to later hops is not real loss. **DNS**: \`dig\` separates "cannot resolve" from "cannot connect"; a surprising fraction of outages are DNS. **Transport**: \`ss -tan\` shows connection states; a pile of SYN-SENT means the destination or a firewall is dropping SYNs; \`nc -zv host port\` tests reachability of a port. **Application**: only now look at the protocol, with \`curl -v\` or a capture.

For "slow" rather than "broken": separate **latency** (ping RTT), **loss** (ping statistics, mtr), **jitter** (RTT standard deviation) and **bandwidth** (iperf3). High bandwidth with high latency means a long path or bufferbloat; low throughput with low loss and low RTT usually means a small window, a slow server or an application limit; throughput that collapses with occasional loss points to a long-RTT TCP path. **MTU** problems have a signature: small transfers work and large ones hang, usually because ICMP is blocked.

Learn **tcpdump** well enough to capture on a server with no GUI and write BPF filters; use **tshark** to turn captures into tables (\`-T fields\`) that a script can analyse. The exercises give you broken networks to fix and captures to mine.`,
          resources: [
            {
              title: 'tcpdump(1) manual page',
              url: 'https://www.tcpdump.org/manpages/tcpdump.1.html',
              type: 'documentation',
              cost: 'free',
              provider: 'tcpdump.org',
              note: 'Also read pcap-filter(7) for the BPF filter language.',
              primary: true,
            },
            {
              title: 'ss(8) man page (socket statistics)',
              url: 'https://man7.org/linux/man-pages/man8/ss.8.html',
              type: 'documentation',
              cost: 'free',
              provider: 'man7.org',
            },
            {
              title: 'ip(8) man page (addresses, routes, link statistics)',
              url: 'https://man7.org/linux/man-pages/man8/ip.8.html',
              type: 'documentation',
              cost: 'free',
              provider: 'man7.org',
            },
            {
              title: "Wireshark User's Guide — tshark and command-line tools",
              url: 'https://www.wireshark.org/docs/wsug_html_chunked/',
              type: 'documentation',
              cost: 'free',
              provider: 'Wireshark',
            },
            {
              title: 'Brendan Gregg — The USE Method',
              url: 'https://www.brendangregg.com/usemethod.html',
              type: 'article',
              cost: 'free',
              note: 'A systematic approach to performance diagnosis (utilisation, saturation, errors) that applies directly to network interfaces and queues.',
            },
          ],
          exercises: [
            {
              slug: 'break-and-fix-lab',
              title: 'Break it and fix it',
              prompt:
                'In Mininet or with two VMs, have a partner (or a script) introduce one of these faults without telling you which: wrong subnet mask, missing default route, DNS server unreachable, firewall dropping port 443, MTU set to 600 on an intermediate link with ICMP blocked, 30 % loss on one link, a duplicate IP address. For each, record the exact sequence of commands you ran, what each told you, and how many steps you needed to localise the fault. Write the resulting playbook.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'tshark-metrics-script',
              title: 'Extract metrics from a capture automatically',
              prompt:
                'Write a script using tshark -T fields that, given any pcap, reports: number of TCP connections and their durations, retransmission count per connection, RTT distribution (p50/p95), DNS query response times and failures, top talkers by bytes, and the share of traffic by protocol. Run it on a capture of 10 minutes of browsing and on the Wireshark sample captures; present the output as a table.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'mtr-interpretation',
              title: 'Interpret mtr correctly',
              prompt:
                'Run mtr for 300 cycles to three destinations. Find a hop that shows loss while later hops show none, and explain why this is ICMP rate limiting, not path loss. Find a hop whose RTT exceeds a later hop\'s and explain it. Then run with `-T` (TCP) and `-u` (UDP) and explain any differences in the path or responsiveness.',
              kind: 'data-analysis',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'A website does not load. Give the first four commands you run, in order, and what each rules out.',
              answerOutline:
                'ping gateway (local link/IP), ping 8.8.8.8 (routing beyond gateway), dig site (DNS), nc -zv site 443 or curl -v (transport/application). Each isolates one layer.',
            },
            {
              question: 'Why does loss at hop 5 of a traceroute, with no loss at hops 6-12, not indicate a problem?',
              answerOutline:
                'The router at hop 5 rate-limits or deprioritises generating ICMP replies; transit traffic through it is unaffected, as the later hops show.',
            },
            {
              question: 'What is the classic symptom of an MTU/path-MTU problem?',
              answerOutline:
                'Small requests (ping, TCP handshake, small pages) succeed while large transfers hang, because large packets with DF set are dropped and the ICMP fragmentation-needed message is blocked.',
            },
          ],
        },
        {
          slug: 'network-performance-engineering',
          title: 'Network performance engineering',
          summary:
            'Why latency matters more than bandwidth for most applications, how TCP tuning, bufferbloat and application protocol choices determine performance, and how to measure what users experience.',
          estimatedMinutes: 100,
          objectives: [
            'Explain why page-load time is dominated by round trips and how each protocol layer adds or removes them',
            'Tune TCP buffers and window scaling for a long fat network and show the throughput change',
            'Diagnose bufferbloat and apply fq_codel/CAKE or BBR to fix it',
            'Measure web performance with browser tools and relate waterfalls to network events',
          ],
          concepts: [
            'Latency vs bandwidth; the "more bandwidth does not help" curve',
            'Bandwidth-delay product and socket buffer sizing',
            'Bufferbloat; AQM: CoDel, fq_codel, CAKE; ECN',
            'Connection reuse, preconnect, TLS resumption, 0-RTT',
            'HTTP/2 and HTTP/3 performance trade-offs; compression',
            'Browser waterfall; time to first byte; critical path',
            'CDNs and edge computing',
          ],
          explanation: `Doubling bandwidth from 5 to 10 Mb/s roughly halves page-load time; doubling from 50 to 100 barely moves it. Reducing RTT, by contrast, improves load time almost linearly. That curve, measured by Google and reproduced in *High Performance Browser Networking*, is the central fact of network performance: for most interactive applications, **latency is the bottleneck**, and the number of round trips is what you must minimise.

Where round trips come from, by layer: DNS (one or more), TCP handshake (one), TLS (one in 1.3, two in 1.2), slow start (several, since a fresh connection starts at a 10-segment window and cannot fill a large page in one RTT), HTTP request-response (one per dependency level), and HOL blocking (stalls). Each fix targets one: DNS prefetch and caching; TCP connection reuse and **preconnect**; **TLS session resumption** and **0-RTT**; larger initial windows; HTTP/2 multiplexing and server push, HTTP/3 streams; and CDNs that cut the RTT itself by moving the endpoint closer.

For bulk throughput, the **bandwidth-delay product** sets the required window; on a 1 Gb/s, 100 ms path that is 12.5 MB, so socket buffers (\`net.ipv4.tcp_rmem/wmem\`) must allow it and window scaling must be on, or throughput is capped at buffer/RTT regardless of link speed. You will measure this.

**Bufferbloat** is the opposite failure: oversized buffers in home routers and modems let loss-based TCP build seconds of queue, destroying latency for everything else. The cure is **active queue management**, **CoDel** and **fq_codel** (per-flow fair queueing with a delay target) or **CAKE** on the bottleneck link, or **BBR** on the sender; you can demonstrate the problem and the fix with netem and a ping under load.

Finally, measure as users experience it: a browser **waterfall** shows DNS, connect, TLS, TTFB and download for every resource, and the **critical path** of dependencies determines when the page is usable. Read HPBN parts I and IV, then do the experiments.`,
          resources: [
            {
              title: 'High Performance Browser Networking (full text, free online)',
              url: 'https://hpbn.co/',
              type: 'textbook',
              cost: 'free',
              provider: "O'Reilly / Ilya Grigorik",
              note: 'Part I (latency, TCP, UDP, TLS) and Part IV (browser networking). The book is also sold in print.',
              primary: true,
            },
            {
              title: 'RFC 8289 — Controlled Delay Active Queue Management (CoDel)',
              url: 'https://www.rfc-editor.org/rfc/rfc8289',
              type: 'documentation',
              cost: 'free',
              provider: 'IETF',
            },
            {
              title: 'tcp(7) man page (Linux TCP tunables: buffers, window scaling, congestion control)',
              url: 'https://man7.org/linux/man-pages/man7/tcp.7.html',
              type: 'documentation',
              cost: 'free',
              provider: 'man7.org',
            },
            {
              title: 'Cloudflare Radar (Internet traffic, protocol adoption and performance data)',
              url: 'https://radar.cloudflare.com/',
              type: 'dataset',
              cost: 'free',
              provider: 'Cloudflare',
              note: 'Real adoption numbers for HTTP/3, IPv6, TLS 1.3 by country.',
            },
          ],
          exercises: [
            {
              slug: 'long-fat-network-tuning',
              title: 'Tune a long fat network',
              prompt:
                'Between two VMs with netem adding 100 ms RTT on a 1 Gb/s (or 100 Mb/s) link, run iperf3 with default socket buffers, then with tcp_rmem/tcp_wmem maximums reduced to 64 kB, then raised to 16 MB. Record throughput in each case, compute buffer/RTT and show it predicts the capped cases. Also show the effect of window scaling disabled (net.ipv4.tcp_window_scaling=0).',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'bufferbloat-demo',
              title: 'Demonstrate and cure bufferbloat',
              prompt:
                'Configure a netem bottleneck of 10 Mb/s with a 1000-packet buffer. Run a continuous ping while starting four parallel iperf3 uploads; record ping RTT before and during the load. Then replace the bottleneck queue with fq_codel (or CAKE) and repeat; then revert to the big FIFO but use BBR on the senders. Tabulate idle RTT, loaded RTT and throughput for the three cases and explain each result.',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'waterfall-analysis',
              title: 'Read a browser waterfall',
              prompt:
                'Open the browser developer tools network panel, disable the cache, and load three sites (a news site, a web app, a small static site). For each, export the HAR file and write a script that computes: total requests, bytes, number of distinct hosts (DNS lookups), number of TCP connections, time spent in DNS/connect/TLS/TTFB/download summed over the critical path, and time to the first paint. Identify the three largest sources of latency per site and propose a fix for each based on this lesson.',
              kind: 'data-analysis',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does increasing bandwidth beyond a few Mb/s barely improve page-load time?',
              answerOutline:
                'Page loads are dominated by sequential round trips (DNS, handshakes, slow start, dependent requests), which are set by RTT, not by link rate.',
            },
            {
              question: 'A 10 Gb/s path with 200 ms RTT delivers only 2.5 MB/s to one TCP flow. What is wrong?',
              answerOutline:
                'The window is limited to about 500 kB (window/RTT = 2.5 MB/s): socket buffers too small or window scaling disabled; the BDP is 250 MB.',
            },
            {
              question: 'How does fq_codel fix bufferbloat without reducing throughput?',
              answerOutline:
                'It drops or marks packets when queueing delay exceeds a target (5 ms) for too long, signalling TCP early, and fair-queues flows so a bulk flow cannot delay a ping or a video call.',
            },
            {
              question: 'Name four techniques that remove round trips from a page load.',
              answerOutline:
                'DNS prefetch/caching, connection reuse or preconnect, TLS resumption/0-RTT, HTTP/2-3 multiplexing (plus CDNs that shorten each RTT).',
            },
          ],
        },
      ],
    },
  ],
  capstone: {
    slug: 'transport-and-web-stack',
    title: 'Capstone: a transport protocol, a web server and the analysis to prove they work',
    description: `Combine the module projects into one stack and defend it with measurements. Build (or finish) a reliable, congestion-controlled transport protocol over UDP with a socket-like API, then run your HTTP/1.1 server over it instead of over kernel TCP, so a browser or a custom client can fetch pages across a lossy, delayed path. Measure the whole system: handshake latency, time to first byte, throughput versus loss and delay, fairness between two of your flows and between your flow and a CUBIC flow, and tail latency under 100 concurrent clients.

Document every stage with Wireshark: write a Lua dissector for your protocol (or annotate raw captures) and produce a capture-driven walkthrough of one page load from DNS lookup to the last ACK, explaining every packet. Compare your results with the kernel TCP stack and HTTP/2 over TLS, and write an honest discussion of what your protocol gets wrong (fairness, RTT unfairness, bufferbloat, CPU cost) and how a production protocol such as QUIC addresses each.`,
    deliverables: [
      'Repository containing the transport library, the HTTP server adapted to it, and the file-transfer client, with build and test instructions',
      'Automated test suite including integration tests across a netem link with loss, delay and reordering',
      'A Wireshark dissector or a fully annotated capture of a page load over your protocol',
      'A 6-10 page evaluation report with plots: throughput vs loss, latency vs concurrency, fairness, comparison with kernel TCP/HTTP/2',
    ],
    estimatedHours: 25,
    stretchGoals: [
      'Add TLS 1.3 (via a library) on top of your transport and measure the added handshake cost',
      'Run your server and client in Mininet across a multi-hop topology with a bottleneck link and show the AIMD sawtooth in cwnd',
      'Implement HTTP/2-style multiplexing on top of your transport and show the head-of-line blocking that QUIC-style streams would remove',
    ],
  },
  masteryChecklist: [
    'I can explain the five-layer model, decode any frame in a capture into its headers, and state what each layer adds',
    'I can compute transmission, propagation and queueing delay, throughput and the bandwidth-delay product for any path',
    'I can read HTTP, DNS and SMTP exchanges in a capture and speak each protocol by hand',
    'I can write correct UDP and TCP socket programs in Python and C, with proper framing and byte order',
    'I can implement reliable data transfer over UDP with sliding windows, RTT estimation and timeouts',
    'I can explain and measure TCP congestion control (slow start, AIMD, CUBIC, BBR) and derive the throughput formula',
    'I can subnet an IPv4 or IPv6 address space, build a forwarding table by longest-prefix match and explain NAT and DHCP',
    'I can implement Dijkstra and distance-vector routing and explain how OSPF and BGP use them, including BGP policy and hijacks',
    'I can explain Ethernet, ARP, switching and 802.11 and trace a full web request from DHCP to the last ACK',
    'I can explain the TLS 1.3 handshake and certificate validation, configure a firewall rule set, and diagnose a slow or broken network with standard tools',
  ],
});
