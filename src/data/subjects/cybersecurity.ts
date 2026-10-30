import { defineSubject } from '../define';

export default defineSubject({
  id: 'cybersecurity',
  title: 'Cybersecurity',
  category: 'cs',
  tagline:
    'Think like an attacker, build like a defender: cryptography, memory corruption, web and network attacks, and how to fix them, practised only on authorised targets.',
  description: `Security is not a feature you add; it is a property of a whole system under an adversary who does not follow your rules. This subject teaches you to find the assumptions a program makes and break them, and then to build systems whose correctness does not depend on those assumptions. You will exploit deliberately vulnerable applications, write and defeat classic memory-corruption attacks, implement and break cryptographic constructions, and design authentication and access control that survives real attackers.

Every offensive exercise in this subject targets software you own or that exists specifically to be attacked: DVWA, OWASP Juice Shop and WebGoat, the SEED labs, pwn.college and exploit.education virtual machines, and capture-the-flag platforms such as picoCTF. You must never apply these techniques to systems you are not explicitly authorised to test; doing so is a crime in most jurisdictions and is outside the scope of this curriculum. The goal is defensive competence through understanding offense.

The curriculum draws on Stanford's CS253 Web Security, Dan Boneh's cryptography course and the Boneh-Shoup book, Ross Anderson's *Security Engineering*, the OWASP projects and cheat sheets, PortSwigger's Web Security Academy, pwn.college and CryptoPals, and the NIST and MITRE reference material. By the end you should be able to perform a structured security assessment of an application, exploit and then remediate each class of vulnerability, reason about cryptographic choices, and write and review code with the security mindset as a reflex.`,
  difficulty: 'advanced',
  estimatedHours: 90,
  prerequisites: ['computer-networks', 'operating-systems', 'systems-programming'],
  recommendedBackground: [
    'Comfortable with C (pointers, memory layout, the stack) and with a scripting language such as Python',
    'Linux command line, including running VMs or containers',
    'Basic networking (TCP/IP, HTTP) and OS concepts (processes, privileges)',
  ],
  tags: ['security', 'cryptography', 'exploitation', 'web', 'defense', 'CTF'],
  core: false,
  modules: [
    {
      slug: 'security-mindset-and-threat-models',
      title: 'The Security Mindset and Threat Modelling',
      description:
        'How to think about systems adversarially, how to describe what you are defending against, and how to prioritise with risk, vulnerability data and scoring.',
      lessons: [
        {
          slug: 'the-security-mindset',
          title: 'The security mindset',
          summary:
            'What it means to think adversarially, the core security properties (CIA, authentication, non-repudiation), and why security is a systems property not a feature.',
          estimatedMinutes: 80,
          objectives: [
            'Define confidentiality, integrity and availability and give a concrete failure of each',
            'Explain the security mindset: finding and exploiting the gap between assumptions and reality',
            'Distinguish a vulnerability, a threat, an exploit and a risk and use the terms precisely',
            'Describe the trusted computing base and why minimising it matters',
          ],
          concepts: [
            'Confidentiality, integrity, availability (CIA); authenticity, non-repudiation',
            'Security mindset: assumptions vs adversary',
            'Vulnerability, threat, exploit, risk',
            'Trusted computing base (TCB)',
            'Attack surface and attack vectors',
            'Defence in depth; fail-safe defaults',
            'Kerckhoffs\'s principle; security through obscurity',
          ],
          explanation: `Security is what remains true when an intelligent adversary is actively trying to make it false. Ordinary engineering asks "does it work when used correctly?"; security asks "what happens when it is used incorrectly, on purpose, by someone who read the source?" That shift is the **security mindset**: every system embodies assumptions (this input is a number, this user is who they claim, this file is under our directory), and an attacker's job is to find an assumption that the system relies on but does not enforce. Bruce Schneier's essays and Ross Anderson's *Security Engineering* chapter 1 are the best introduction to this habit of thought, and you should read them before any tooling.

The classic goals are **confidentiality** (only authorised parties read data), **integrity** (data is not modified undetectably), and **availability** (the system is usable when needed); to these we add **authenticity** (you are talking to who you think) and **non-repudiation** (an action cannot later be denied). A single bug can break one while leaving the others intact: a padding-oracle breaks confidentiality without touching availability.

Use the vocabulary precisely. A **vulnerability** is a weakness; a **threat** is an actor or event that could exploit it; an **exploit** is the concrete technique that does; **risk** combines the likelihood and the impact. You reduce risk by shrinking the **attack surface** (fewer entry points), minimising the **trusted computing base** (less code whose failure is catastrophic), applying **defence in depth** (independent layers so one failure is not fatal) and **fail-safe defaults** (deny unless explicitly allowed). Finally, **Kerckhoffs's principle**: assume the design is public; security must rest on secret keys, not secret mechanisms. "Security through obscurity" is at best a thin extra layer and at worst a false comfort.`,
          resources: [
            {
              title: 'Security Engineering (Ross Anderson) — free chapters',
              url: 'https://www.cl.cam.ac.uk/~rja14/book.html',
              type: 'textbook',
              cost: 'freemium',
              provider: 'Cambridge / Ross Anderson',
              note: 'Chapter 1 (What is Security Engineering) and chapter 2 (threat models) are free PDFs; the full book is sold in print.',
              primary: true,
            },
            {
              title: 'Bruce Schneier — attack trees and the security mindset (essays)',
              url: 'https://www.schneier.com/academic/archives/1999/12/attack_trees.html',
              type: 'article',
              cost: 'free',
              provider: 'Bruce Schneier',
            },
            {
              title: 'Stanford CS253 Web Security — course site and lecture notes',
              url: 'https://web.stanford.edu/class/cs253/',
              type: 'course',
              cost: 'free',
              provider: 'Stanford',
              note: 'The introduction lectures frame the security mindset; the whole course is used later in the web module.',
            },
            {
              title: 'MITRE ATT&CK — adversary tactics and techniques knowledge base',
              url: 'https://attack.mitre.org/',
              type: 'documentation',
              cost: 'free',
              provider: 'MITRE',
              note: 'Browse to see how real adversaries are catalogued by tactic and technique.',
            },
          ],
          exercises: [
            {
              slug: 'break-an-assumption',
              title: 'Break an everyday assumption',
              prompt:
                'Pick three ordinary systems you use (a parking meter, a coffee loyalty app, a library self-checkout, a web login). For each, write down the security assumptions its designers appear to make, then describe at least one way an adversary could violate each assumption and what property (C, I or A) would break. You do not attack anything; this is a written thought experiment to train the mindset.',
              kind: 'writing',
              difficulty: 1,
            },
            {
              slug: 'cia-case-mapping',
              title: 'Classify real incidents by property',
              prompt:
                'Find five publicly documented security incidents (data breach, ransomware, defacement, DDoS, supply-chain compromise). For each, identify which of confidentiality, integrity and availability were violated, the vulnerability exploited, the threat actor, and the business impact. Present as a table and explain one case where more than one property was affected.',
              kind: 'reading',
              difficulty: 1,
            },
            {
              slug: 'tcb-inventory',
              title: 'Inventory a trusted computing base',
              prompt:
                'For a simple web application (a login page backed by a database on a Linux server), list every component whose compromise would break security: OS kernel, TLS library, web framework, database, the authentication code, the CA that issued the certificate, the DNS resolver. For each, state what breaks if it is compromised and one way to reduce reliance on it. Rank them by impact.',
              kind: 'writing',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What is the difference between a vulnerability, a threat and a risk?',
              answerOutline:
                'Vulnerability: a weakness. Threat: an actor/event that could exploit it. Risk: likelihood × impact of that exploitation. All three are needed to prioritise.',
            },
            {
              question: 'State Kerckhoffs\'s principle and why security through obscurity is weak.',
              answerOutline:
                'A system should be secure even if everything except the key is public. Obscurity fails once the design leaks (reverse engineering, insider), and it cannot be rotated like a key.',
            },
            {
              question: 'Why does minimising the trusted computing base improve security?',
              answerOutline:
                'The TCB is the code whose correctness everything depends on; less TCB means fewer places a single bug is catastrophic and a smaller surface to audit and verify.',
            },
          ],
        },
        {
          slug: 'threat-modelling',
          title: 'Threat modelling',
          summary:
            'Structured methods for deciding what you are defending, against whom, and what could go wrong: data-flow diagrams, STRIDE, attack trees and trust boundaries.',
          estimatedMinutes: 90,
          objectives: [
            'Produce a data-flow diagram with trust boundaries for a real application',
            'Apply STRIDE to enumerate threats per element and map each to a mitigation',
            'Build an attack tree for a specific goal and use it to find the cheapest attack path',
            'Explain how a threat model drives security requirements and testing priorities',
          ],
          concepts: [
            'Assets, actors, entry points, trust boundaries',
            'Data-flow diagrams (DFDs)',
            'STRIDE: spoofing, tampering, repudiation, info disclosure, DoS, elevation of privilege',
            'Attack trees and attacker cost/capability',
            'Threat model drives requirements',
            'Adversary models: script kiddie, insider, nation-state',
            'DREAD and other ranking heuristics (and their limits)',
          ],
          explanation: `A threat model answers three questions before you write defensive code: what are you protecting (**assets**), who might attack it and with what capability (**adversary model**), and what could go wrong (**threats**). Skipping it produces security theatre, controls that defend against the wrong things. The canonical process, described in the Microsoft threat-modelling material and OWASP's cheat sheet, starts with a **data-flow diagram**: draw the processes, data stores, external entities and the data flows between them, then draw the **trust boundaries** where data crosses from less- to more-trusted zones (the network edge, a privilege change, a process boundary). Most vulnerabilities live on these boundaries.

**STRIDE** systematises the "what could go wrong" step by giving each element of the diagram a checklist of six threat categories: **Spoofing** (pretending to be someone), **Tampering** (modifying data), **Repudiation** (denying an action), **Information disclosure**, **Denial of service**, and **Elevation of privilege**. For each process, flow and store you ask which of the six applies and record a mitigation, which becomes a security requirement. A login flow crossing the network boundary obviously invites spoofing (mitigation: authentication) and tampering (mitigation: TLS); a log store invites repudiation and tampering (mitigation: append-only, signed logs).

**Attack trees** work top-down from an attacker goal ("read another user's messages") and decompose it into alternative sub-goals (steal the session cookie OR guess the password OR exploit an IDOR OR compromise the database), annotating each leaf with the attacker cost, skill or detectability. The cheapest path to the root is where you should spend defensive effort, and the tree makes explicit which adversary you are assuming: a path that needs a nation-state's resources is a different priority from one a bored user can walk.

Threat modelling is iterative and cheap; do it on a whiteboard early and revisit it when the design changes.`,
          resources: [
            {
              title: 'OWASP Threat Modeling Cheat Sheet',
              url: 'https://cheatsheetseries.owasp.org/cheatsheets/Threat_Modeling_Cheat_Sheet.html',
              type: 'documentation',
              cost: 'free',
              provider: 'OWASP',
              primary: true,
            },
            {
              title: 'OWASP Threat Dragon (free threat-modelling tool)',
              url: 'https://owasp.org/www-project-threat-dragon/',
              type: 'tool',
              cost: 'free',
              provider: 'OWASP',
            },
            {
              title: 'Bruce Schneier — Attack Trees',
              url: 'https://www.schneier.com/academic/archives/1999/12/attack_trees.html',
              type: 'article',
              cost: 'free',
              provider: 'Bruce Schneier',
            },
            {
              title: 'The Threat Modeling Manifesto',
              url: 'https://www.threatmodelingmanifesto.org/',
              type: 'article',
              cost: 'free',
              note: 'Concise statement of values and principles by the field\'s practitioners.',
            },
          ],
          exercises: [
            {
              slug: 'dfd-and-stride',
              title: 'DFD and STRIDE for a small app',
              prompt:
                'Choose a small application you can inspect (OWASP Juice Shop, a personal project, or a described system). Draw its data-flow diagram with processes, stores, external entities and trust boundaries using Threat Dragon or paper. Apply STRIDE to every element crossing a trust boundary and produce a table of at least 15 threats, each with a category, the element, and a concrete mitigation. Mark which mitigations the app already has.',
              kind: 'writing',
              difficulty: 2,
            },
            {
              slug: 'attack-tree',
              title: 'Build an attack tree',
              prompt:
                'Pick a concrete attacker goal for a web app (e.g. "post as another user"). Build an attack tree at least three levels deep with AND/OR nodes, annotate each leaf with estimated attacker cost and required skill, and highlight the cheapest path. Then propose the single control that best raises the cost of that path and explain which other paths it does not address.',
              kind: 'writing',
              difficulty: 2,
            },
            {
              slug: 'adversary-models',
              title: 'Same system, three adversaries',
              prompt:
                'For one system, write three short threat models assuming (a) an opportunistic external attacker, (b) a malicious insider with valid low-privilege credentials, and (c) a well-resourced targeted attacker. Show how the priority threats and sensible mitigations differ between the three, and argue which adversary your chosen system should realistically design for.',
              kind: 'writing',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What does a trust boundary represent and why do vulnerabilities cluster there?',
              answerOutline:
                'A point where data moves between zones of differing trust (network edge, privilege change). Assumptions valid inside one zone (input is well-formed, caller is authorised) may not hold across it, so checks must happen at the crossing.',
            },
            {
              question: 'Give the six STRIDE categories and a mitigation for each.',
              answerOutline:
                'Spoofing→authentication; Tampering→integrity checks/TLS; Repudiation→signed audit logs; Information disclosure→encryption/access control; DoS→rate limiting/quotas; Elevation of privilege→least privilege/authorization checks.',
            },
            {
              question: 'How does an attack tree help you prioritise defences?',
              answerOutline:
                'It exposes the cheapest/most-likely path to the attacker goal; defending the weakest leaf on that path raises the overall cost more than hardening already-expensive paths.',
            },
            {
              question: 'Why is the adversary model part of the threat model, not an afterthought?',
              answerOutline:
                'It determines which threats are in scope and how much to spend; a control adequate against opportunists may be irrelevant against a targeted attacker and vice versa.',
            },
          ],
        },
        {
          slug: 'risk-vulnerabilities-and-scoring',
          title: 'Risk, vulnerabilities and scoring',
          summary:
            'How the industry names, catalogues, scores and prioritises vulnerabilities: CVE, CWE, CVSS, the KEV catalogue and the difference between a score and a decision.',
          estimatedMinutes: 80,
          objectives: [
            'Explain the roles of CVE, CWE, CVSS, NVD and the CISA KEV catalogue',
            'Compute a CVSS base score from a vector string and explain what each metric means',
            'Explain why CVSS base scores are not a patching priority on their own and what to add',
            'Trace a real vulnerability from disclosure through CVE, CWE classification and exploitation',
          ],
          concepts: [
            'CVE (identifier) vs CWE (weakness class) vs CVSS (severity score)',
            'NVD and vendor advisories',
            'CVSS base, temporal, environmental metrics; attack vector/complexity/privileges',
            'Exploitability vs impact',
            'CISA Known Exploited Vulnerabilities (KEV) catalogue',
            'EPSS (exploit prediction) and asset context',
            'Responsible disclosure and embargoes',
          ],
          explanation: `When a vulnerability is found, the ecosystem gives it names and numbers so that everyone talks about the same thing. A **CVE** identifier (e.g. CVE-2021-44228, Log4Shell) names one specific vulnerability in one product. A **CWE** names the *class* of weakness behind it (CWE-502, deserialization of untrusted data; CWE-79, cross-site scripting; CWE-787, out-of-bounds write), and the CWE Top 25 is a useful map of what goes wrong most often. The **NVD** enriches CVEs with metadata, and vendors publish advisories with fixes.

**CVSS** is the severity score. The **base** metrics describe the vulnerability itself: the **attack vector** (network, adjacent, local, physical), **attack complexity**, **privileges required**, **user interaction**, **scope** (does it break out of its security authority?), and the **impact** on confidentiality, integrity and availability. These combine by a published formula into a 0-10 base score; a vector string like \`CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:C/C:H/I:H/A:H\` encodes a worst-case remote, unauthenticated, scope-changing, high-impact bug (9.8, which is roughly Log4Shell). **Temporal** metrics adjust for exploit maturity and fixes; **environmental** metrics adjust for your deployment.

The crucial lesson is that a base score is not a priority. A 9.8 on a server with no exposure matters less than a 7.5 on your internet-facing login. Modern prioritisation combines CVSS with **exploitation data**: the CISA **KEV** catalogue lists vulnerabilities known to be exploited in the wild (patch these first regardless of score), and **EPSS** estimates the probability a CVE will be exploited soon. Add your own **asset context** (is it reachable? what does it protect?) and you get a defensible patching order. You will practise reading real advisories and justifying an order.

Finally, vulnerabilities reach this system through **responsible disclosure**: a researcher privately reports, the vendor fixes within an embargo window, a CVE is assigned, and details are published together with the patch. Dropping a working exploit before a fix exists ("full disclosure" at zero-day) is the contested alternative.`,
          resources: [
            {
              title: 'FIRST — CVSS v4.0 specification and calculator',
              url: 'https://www.first.org/cvss/v4-0/',
              type: 'documentation',
              cost: 'free',
              provider: 'FIRST',
              note: 'Read the metric definitions; use the calculator to build and read vector strings. CVSS 3.1 is still widely used.',
              primary: true,
            },
            {
              title: 'MITRE CWE Top 25 Most Dangerous Software Weaknesses',
              url: 'https://cwe.mitre.org/top25/',
              type: 'documentation',
              cost: 'free',
              provider: 'MITRE',
            },
            {
              title: 'CISA Known Exploited Vulnerabilities (KEV) Catalog',
              url: 'https://www.cisa.gov/known-exploited-vulnerabilities-catalog',
              type: 'dataset',
              cost: 'free',
              provider: 'CISA',
              note: 'If the page blocks automated access, the same catalogue is downloadable as CSV/JSON from the linked resources.',
            },
            {
              title: 'Log4Shell (CVE-2021-44228) technical write-up',
              url: 'https://nvd.nist.gov/vuln/detail/CVE-2021-44228',
              type: 'article',
              cost: 'free',
              provider: 'NVD',
            },
          ],
          exercises: [
            {
              slug: 'score-three-cves',
              title: 'Score and justify three CVEs',
              prompt:
                'Pick three recent CVEs of different weakness classes. For each, construct the CVSS v3.1 or v4.0 base vector from the advisory, compute the score with the FIRST calculator, and write one paragraph justifying each metric choice. Then check whether each is in the CISA KEV catalogue and state how that changes your remediation urgency.',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'prioritise-a-backlog',
              title: 'Prioritise a patch backlog',
              prompt:
                'Given a list of ten CVEs affecting a described environment (some internet-facing, some internal, varying CVSS, some in KEV, some with public exploits), produce a defensible patch order. Write the rule you used (combining CVSS, exploitation evidence and asset exposure) and explain two cases where you deviated from pure CVSS ordering and why.',
              kind: 'writing',
              difficulty: 2,
            },
            {
              slug: 'cve-to-cwe-trace',
              title: 'Trace a vulnerability end to end',
              prompt:
                'Choose a well-documented vulnerability (Heartbleed, Log4Shell, Shellshock). Write a two-page technical account: the CWE class, the exact code or protocol flaw, the CVSS vector and why, how it was exploited in the wild, how it was disclosed and fixed, and which secure-coding practice from later in this course would have prevented it.',
              kind: 'writing',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What is the difference between a CVE, a CWE and a CVSS score?',
              answerOutline:
                'CVE: identifier for one specific vulnerability. CWE: the class of weakness it belongs to. CVSS: a numeric severity score for a vulnerability. Different axes: which, what kind, how bad.',
            },
            {
              question: 'Why is a CVSS base score alone a poor patching priority?',
              answerOutline:
                'It ignores whether the vulnerability is exploited in the wild (KEV/EPSS) and your environment (exposure, asset value). A lower-scored but actively exploited, internet-facing bug outranks a higher-scored unreachable one.',
            },
            {
              question: 'What does a scope change (S:C) in CVSS mean?',
              answerOutline:
                'The exploited component can affect resources beyond its own security authority, e.g. a sandbox escape or a bug that lets a web app reach the host; it raises the score.',
            },
            {
              question: 'What is the CISA KEV catalogue and how should it affect you?',
              answerOutline:
                'A curated list of vulnerabilities confirmed exploited in the wild; presence is strong evidence to patch immediately regardless of CVSS.',
            },
          ],
        },
      ],
    },
    {
      slug: 'applied-cryptography',
      title: 'Applied Cryptography',
      description:
        'The building blocks of secure systems: symmetric encryption and modes, hashes and MACs, key exchange and public-key crypto, how TLS composes them, and the attacks that result from using them wrongly.',
      lessons: [
        {
          slug: 'symmetric-encryption-and-modes',
          title: 'Symmetric encryption, block ciphers and modes',
          summary:
            'Confidentiality with a shared key: what a block cipher is, why ECB is broken, how CTR and CBC work, and why authenticated encryption is now mandatory.',
          estimatedMinutes: 110,
          objectives: [
            'Explain the goal of a symmetric cipher and the difference between a block cipher and a stream cipher',
            'Describe ECB, CBC and CTR modes and demonstrate why ECB leaks structure',
            'Explain why unauthenticated encryption is unsafe and what AEAD (AES-GCM, ChaCha20-Poly1305) provides',
            'Use a vetted crypto library correctly and identify misuse (nonce reuse, IV predictability)',
          ],
          concepts: [
            'Shared-key confidentiality; Kerckhoffs again',
            'Block cipher (AES) as a keyed permutation; PRP/PRF intuition',
            'Modes: ECB (broken), CBC (IV, padding), CTR (keystream)',
            'Nonce/IV requirements and reuse catastrophes',
            'Authenticated encryption with associated data (AEAD)',
            'AES-GCM, ChaCha20-Poly1305',
            'Padding oracles; encrypt-then-MAC vs MAC-then-encrypt',
          ],
          explanation: `A symmetric cipher turns plaintext into ciphertext under a shared secret key so that an adversary who sees the ciphertext learns nothing but its length. **AES** is the standard **block cipher**: a keyed, invertible permutation on 128-bit blocks, which you should think of as a pseudo-random permutation, indistinguishable from a random one without the key. A block cipher alone only encrypts one block; a **mode of operation** extends it to arbitrary messages, and the choice of mode is where most mistakes happen.

**ECB** (encrypt each block independently) is broken: identical plaintext blocks produce identical ciphertext blocks, so structure leaks, famously the outline of an encrypted bitmap remains visible. Never use it. **CBC** chains blocks by XORing each plaintext block with the previous ciphertext block, starting from a random **initialisation vector**; it hides structure but needs a correct, unpredictable IV and padding, and naive CBC is vulnerable to **padding-oracle** attacks that recover plaintext from error messages. **CTR** turns the block cipher into a stream cipher by encrypting a counter to produce a keystream XORed with the plaintext; it is parallelisable and needs no padding, but reusing a (key, nonce) pair is catastrophic because XORing two ciphertexts under the same keystream cancels the keystream and leaks the XOR of the plaintexts.

The modern rule is that **encryption without integrity is unsafe**: an attacker who can flip ciphertext bits can flip plaintext bits (in CTR) or trigger oracles (in CBC). The answer is **authenticated encryption with associated data (AEAD)**, which provides confidentiality and integrity together and also authenticates unencrypted headers. **AES-GCM** and **ChaCha20-Poly1305** are the two you should use; both require a unique nonce per message under a key, and both fail loudly on tampering. If you must compose primitives yourself, **encrypt-then-MAC** is the safe order.

CryptoPals set 1 and 2 teach these lessons by making you implement and then break ECB and CBC yourself, which is the fastest route to never misusing them.`,
          resources: [
            {
              title: 'Dan Boneh — Cryptography I (Coursera)',
              url: 'https://www.coursera.org/learn/crypto',
              type: 'course',
              cost: 'freemium',
              provider: 'Stanford / Coursera',
              note: 'Weeks on block ciphers and authenticated encryption. Auditable for free; certificate is paid.',
              primary: true,
            },
            {
              title: 'A Graduate Course in Applied Cryptography (Boneh & Shoup) — free book',
              url: 'https://toc.cryptobook.us/',
              type: 'textbook',
              cost: 'free',
              provider: 'Boneh & Shoup',
              note: 'Chapters on block ciphers and authenticated encryption; rigorous and free.',
            },
            {
              title: 'CryptoPals Crypto Challenges — Set 1 and Set 2',
              url: 'https://cryptopals.com/sets/1',
              type: 'problem-set',
              cost: 'free',
              note: 'Implement and break ECB and CBC; the single best hands-on introduction.',
            },
            {
              title: 'Python cryptography library documentation (hazmat and recipes)',
              url: 'https://cryptography.io/en/latest/',
              type: 'documentation',
              cost: 'free',
              provider: 'PyCA',
              note: 'Use Fernet / AESGCM rather than rolling your own; read the warnings.',
            },
          ],
          exercises: [
            {
              slug: 'ecb-detection',
              title: 'Detect and exploit ECB',
              prompt:
                'Complete CryptoPals challenges 7-9 and 11-14. Specifically: implement AES-ECB and AES-CBC from a library block primitive; write a function that detects ECB from ciphertext alone (repeated blocks); and perform the byte-at-a-time ECB decryption attack against an oracle that appends a secret suffix. Report the recovered secret and explain exactly why ECB made it possible.',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'nonce-reuse-break',
              title: 'Break CTR nonce reuse',
              prompt:
                'Encrypt ten English sentences with AES-CTR using the SAME key and nonce. Then, as the attacker with only the ciphertexts, recover the plaintexts by exploiting the shared keystream (crib-dragging). Quantify how many ciphertexts you needed. Then repeat with correct unique nonces and show the attack fails. Write up why nonce reuse is catastrophic for stream ciphers.',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'aead-usage',
              title: 'Use AEAD correctly',
              prompt:
                'Using a vetted library, build a function pair that encrypts and decrypts a message with AES-GCM, binding an unencrypted header (associated data) such as a message ID. Demonstrate: correct round-trip; that modifying one ciphertext byte causes decryption to fail; that modifying the associated data fails; and measure throughput. Then deliberately reuse a nonce and explain the authentication consequence.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why is ECB mode insecure even with a strong block cipher like AES?',
              answerOutline:
                'Identical plaintext blocks map to identical ciphertext blocks, leaking structure and equality of blocks; it is not semantically secure.',
            },
            {
              question: 'What goes wrong if a (key, nonce) pair is reused in CTR or GCM?',
              answerOutline:
                'The keystream repeats; XOR of two ciphertexts reveals XOR of plaintexts. In GCM, nonce reuse also allows authentication-key recovery, breaking integrity.',
            },
            {
              question: 'Why is unauthenticated encryption dangerous, and what replaces it?',
              answerOutline:
                'An attacker can tamper with ciphertext to alter plaintext or probe padding oracles. AEAD (AES-GCM, ChaCha20-Poly1305) provides confidentiality and integrity together.',
            },
            {
              question: 'If you must combine a cipher and a MAC, which order is safe and why?',
              answerOutline:
                'Encrypt-then-MAC: authenticate the ciphertext so tampered ciphertext is rejected before decryption, preventing padding/decryption oracles.',
            },
          ],
        },
        {
          slug: 'hashes-macs-and-kdfs',
          title: 'Hash functions, MACs and key derivation',
          summary:
            'Integrity and authentication without secrecy: cryptographic hashes and their properties, HMAC, password hashing, and deriving keys from secrets.',
          estimatedMinutes: 100,
          objectives: [
            'State the three security properties of a cryptographic hash and give an attack enabled by losing each',
            'Explain HMAC and why a naive hash(key || message) MAC is unsafe',
            'Explain why passwords need slow, salted hashing (bcrypt, scrypt, Argon2) and compute the cost of brute force',
            'Distinguish hashing, MACs and KDFs and pick the right one for a task',
          ],
          concepts: [
            'Preimage, second-preimage, collision resistance',
            'SHA-256/SHA-3; why MD5 and SHA-1 are dead',
            'Length-extension attacks on Merkle-Damgard hashes',
            'MAC: HMAC construction; constant-time comparison',
            'Password hashing: salt, pepper, work factor; bcrypt/scrypt/Argon2',
            'Key derivation functions: HKDF, PBKDF2',
            'Rainbow tables and why salting defeats them',
          ],
          explanation: `A cryptographic **hash** maps arbitrary data to a fixed-size digest with three properties: **preimage resistance** (given a digest you cannot find an input producing it), **second-preimage resistance** (given an input you cannot find a different one with the same digest), and **collision resistance** (you cannot find any two inputs with the same digest). Lose collision resistance and you can forge documents that share a signature, which is why **MD5 and SHA-1 are dead** (practical collisions exist) and you use **SHA-256** or **SHA-3**. A subtlety: hashes built on the Merkle-Damgard construction (MD5, SHA-1, SHA-256) are vulnerable to **length-extension**, so you cannot build a MAC as \`hash(key || message)\` because an attacker can append data and fix up the digest.

The correct keyed-integrity primitive is a **MAC**, and **HMAC** is the standard: \`HMAC(k, m) = H((k' XOR opad) || H((k' XOR ipad) || m))\`, which resists length-extension and is proven secure if the hash is reasonable. When you verify a MAC, compare in **constant time**, because a byte-by-byte comparison that returns early leaks, through timing, how many bytes were correct, allowing forgery.

Passwords are a special case. They are low-entropy, so a fast hash lets an attacker who steals the database try billions of guesses per second on a GPU. The defences are **salting** (a unique random value per password, so identical passwords hash differently and precomputed **rainbow tables** are useless) and a deliberately **slow** hash with a tunable **work factor**: **bcrypt**, **scrypt** (also memory-hard) or **Argon2** (the current recommendation, memory- and time-hard). You will measure how the work factor trades login latency against brute-force cost.

Finally, a **key derivation function** turns a secret (a password, or a Diffie-Hellman shared secret) into one or more uniformly random keys. Use **PBKDF2/scrypt/Argon2** for low-entropy passwords and **HKDF** for high-entropy secrets. Picking the wrong tool, for instance a plain hash where a slow password hash is needed, is a classic and devastating error.`,
          resources: [
            {
              title: 'OWASP Password Storage Cheat Sheet',
              url: 'https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html',
              type: 'documentation',
              cost: 'free',
              provider: 'OWASP',
              note: 'Current algorithm and work-factor recommendations.',
              primary: true,
            },
            {
              title: 'RFC 2104 — HMAC: Keyed-Hashing for Message Authentication',
              url: 'https://www.rfc-editor.org/rfc/rfc2104',
              type: 'documentation',
              cost: 'free',
              provider: 'IETF',
            },
            {
              title: 'RFC 9106 — Argon2 Memory-Hard Function for Password Hashing',
              url: 'https://www.rfc-editor.org/rfc/rfc9106',
              type: 'documentation',
              cost: 'free',
              provider: 'IETF',
            },
            {
              title: 'CryptoPals — Set 4 (length-extension, HMAC timing attack)',
              url: 'https://cryptopals.com/sets/4',
              type: 'problem-set',
              cost: 'free',
            },
          ],
          exercises: [
            {
              slug: 'length-extension-attack',
              title: 'Length-extension forgery',
              prompt:
                'Implement a secret-prefix MAC as SHA-256(secret || message). Then, as the attacker who knows message and its MAC but not the secret, forge a valid MAC for message || padding || extra using a length-extension attack (CryptoPals 29). Show it verifies. Then switch the server to HMAC-SHA256 and show your forgery fails. Explain why HMAC resists the attack.',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'password-cracking-and-costs',
              title: 'Crack weak hashes and measure work factors',
              prompt:
                'Create a small database of passwords hashed three ways: unsalted SHA-256, salted SHA-256, and Argon2 (or bcrypt). Using a wordlist with hashcat or John the Ripper on hashes you generated yourself, measure guesses per second and time to crack a weak password for each scheme. Then vary the Argon2 work factor and plot verification time against estimated GPU crack time. Conclude with a recommended work factor for a 200 ms login budget.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'timing-safe-compare',
              title: 'Demonstrate and fix a MAC timing leak',
              prompt:
                'Write a server that verifies an HMAC with a naive byte-by-byte comparison that returns on first mismatch. Measure, over many trials, the response time as a function of how many leading bytes are correct, and show the timing signal. Mount a byte-at-a-time forgery using it (CryptoPals 31/32). Then replace the comparison with a constant-time function and show the signal disappears.',
              kind: 'coding',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'Name the three hash security properties and an attack that each failure enables.',
              answerOutline:
                'Preimage (recover input from digest → break commitments), second-preimage (substitute a specific file), collision (forge two files with one signature, e.g. MD5/SHA-1 attacks).',
            },
            {
              question: 'Why is hash(key || message) an unsafe MAC, and what is used instead?',
              answerOutline:
                'Length-extension lets an attacker append data and compute a valid digest without the key. HMAC\'s nested construction prevents this.',
            },
            {
              question: 'Why must password hashes be salted and slow?',
              answerOutline:
                'Salt defeats precomputation (rainbow tables) and makes identical passwords differ; slowness (work factor, memory-hardness) caps the attacker\'s guess rate after a database theft.',
            },
            {
              question: 'When do you use PBKDF2/Argon2 versus HKDF?',
              answerOutline:
                'Password/low-entropy input → slow, salted PBKDF2/scrypt/Argon2. High-entropy secret (DH output) → fast HKDF to expand into keys.',
            },
          ],
        },
        {
          slug: 'public-key-crypto-and-key-exchange',
          title: 'Public-key cryptography and key exchange',
          summary:
            'Communicating securely without a shared secret: Diffie-Hellman key exchange, RSA and elliptic-curve crypto, digital signatures, and the trust problem.',
          estimatedMinutes: 110,
          objectives: [
            'Explain the Diffie-Hellman key exchange and why a passive eavesdropper cannot derive the key',
            'Explain RSA and ECC at the level of what problem each rests on and their relative key sizes',
            'Distinguish encryption, key exchange and digital signatures and state what each provides',
            'Explain the man-in-the-middle problem for key exchange and how certificates and web-of-trust address it',
          ],
          concepts: [
            'Trapdoor one-way functions; hardness assumptions (factoring, discrete log)',
            'Diffie-Hellman and elliptic-curve DH (X25519); ephemeral DH and forward secrecy',
            'RSA encryption and signatures; padding (OAEP, PSS)',
            'ECC: smaller keys for the same security',
            'Digital signatures: integrity, authenticity, non-repudiation (Ed25519)',
            'Man-in-the-middle; authenticating public keys',
            'Hybrid encryption (KEM/DEM)',
          ],
          explanation: `Symmetric crypto assumes the two parties already share a key. **Public-key** cryptography removes that assumption using **trapdoor one-way functions**: operations easy to compute but hard to invert without a secret. Two hardness assumptions underlie almost everything: the difficulty of **factoring** large numbers (RSA) and of the **discrete logarithm** in a group (Diffie-Hellman, elliptic curves).

**Diffie-Hellman** lets two parties derive a shared secret over a public channel. Each picks a private value, computes a public value ($g^a$ and $g^b$ in a group), exchanges the public values, and raises the other's to its own private power ($g^{ab}$), arriving at the same secret. A passive eavesdropper sees $g^a$ and $g^b$ but computing $g^{ab}$ requires the discrete log, believed hard. Using fresh keys each session (**ephemeral** DH, e.g. **X25519**) gives **forward secrecy**: a later key compromise does not expose past sessions. **RSA** can both encrypt (encrypt to a public key, decrypt with the private) and sign, but only with correct **padding** (OAEP for encryption, PSS for signatures); textbook RSA is insecure. **Elliptic-curve** cryptography achieves the same security with far smaller keys (a 256-bit ECC key is comparable to 3072-bit RSA), which is why modern systems default to Curve25519 and **Ed25519** signatures.

Keep three operations distinct. **Encryption** provides confidentiality to the key holder. **Key exchange** establishes a shared symmetric key (then used with fast AEAD, the **hybrid** KEM/DEM pattern). **Digital signatures** provide integrity, authenticity and **non-repudiation**: the signer, and only the signer, could have produced a signature that anyone can verify with the public key.

All of this rests on knowing that a public key really belongs to whom you think. A **man-in-the-middle** who substitutes their own key during an unauthenticated exchange reads everything. Solving this is the **trust problem**, addressed by **certificates** signed by authorities (the web PKI, next lesson) or a **web of trust**; the cryptography is only as strong as the binding of keys to identities.`,
          resources: [
            {
              title: 'Dan Boneh — Cryptography I (Coursera): public-key weeks',
              url: 'https://www.coursera.org/learn/crypto',
              type: 'course',
              cost: 'freemium',
              provider: 'Stanford / Coursera',
              note: 'Diffie-Hellman, RSA, and the trust problem. Free to audit.',
              primary: true,
            },
            {
              title: 'A Graduate Course in Applied Cryptography — public-key chapters',
              url: 'https://toc.cryptobook.us/',
              type: 'textbook',
              cost: 'free',
              provider: 'Boneh & Shoup',
            },
            {
              title: 'RFC 7748 — Elliptic Curves for Security (X25519)',
              url: 'https://www.rfc-editor.org/rfc/rfc7748',
              type: 'documentation',
              cost: 'free',
              provider: 'IETF',
            },
            {
              title: 'CryptoPals — Set 5 (Diffie-Hellman, MITM, RSA)',
              url: 'https://cryptopals.com/sets/5',
              type: 'problem-set',
              cost: 'free',
            },
          ],
          exercises: [
            {
              slug: 'implement-dh-and-mitm',
              title: 'Implement DH and a MITM attack',
              prompt:
                'Implement finite-field Diffie-Hellman (CryptoPals 33) and derive a shared AES key from the result. Then implement the parameter-injection MITM (CryptoPals 34): a relay that forces the shared secret to a known value and decrypts both directions. Show the two honest parties believe they are secure while you read everything. Explain exactly which missing check (authentication of the public values) allowed it.',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'rsa-and-padding',
              title: 'Implement RSA and break textbook RSA',
              prompt:
                'Implement RSA key generation, encryption and signing with small-but-nontrivial keys (CryptoPals 39). Demonstrate one attack on unpadded RSA: either the e=3 broadcast attack (CryptoPals 40) or a signature-forgery via malleability. Then use a library\'s OAEP/PSS and explain how the padding defeats your attack.',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'signatures-in-practice',
              title: 'Sign and verify with Ed25519',
              prompt:
                'Using a vetted library, generate an Ed25519 keypair, sign a file, and verify it. Show that modifying one byte of the file or the signature causes verification to fail. Then explain, in a short note, the difference between what a signature gives you and what a MAC gives you, and why non-repudiation requires asymmetric signatures.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why can a passive eavesdropper not derive the Diffie-Hellman shared secret?',
              answerOutline:
                'They see g^a and g^b but computing g^ab requires solving the discrete log, which is believed computationally infeasible for suitable groups.',
            },
            {
              question: 'What does ephemeral Diffie-Hellman add over static key exchange?',
              answerOutline:
                'Forward secrecy: session keys use throwaway private values, so compromising long-term keys later does not decrypt recorded past sessions.',
            },
            {
              question: 'Why does ECC use much smaller keys than RSA for equivalent security?',
              answerOutline:
                'The best attacks on elliptic-curve discrete log are fully exponential, whereas factoring/finite-field DL have sub-exponential attacks, so ECC needs fewer bits for the same work factor.',
            },
            {
              question: 'What problem do certificates solve that the cryptography itself does not?',
              answerOutline:
                'Binding a public key to an identity, so you know whose key you are using and are not talking to a man-in-the-middle who substituted theirs.',
            },
          ],
        },
        {
          slug: 'tls-and-secure-channels',
          title: 'TLS, PKI and secure channels',
          summary:
            'How the primitives compose into the protocol that secures the web: the TLS 1.3 handshake, the certificate trust model, and the attacks that history taught us to design against.',
          estimatedMinutes: 100,
          objectives: [
            'Describe how TLS 1.3 composes key exchange, signatures and AEAD into a secure channel with forward secrecy',
            'Explain the web PKI: certificate chains, CAs, validation and Certificate Transparency',
            'Explain classic TLS attacks (downgrade, padding oracles, compression, weak RSA) and the defences',
            'Assess a server\'s TLS configuration and explain each finding',
          ],
          concepts: [
            'TLS 1.3 handshake recap; forward secrecy; 0-RTT replay',
            'X.509 chains, root stores, path validation',
            'Certificate authorities, domain validation, ACME',
            'Certificate Transparency logs',
            'Downgrade attacks, cipher negotiation, HSTS',
            'Historical breaks: BEAST, CRIME, POODLE, Heartbleed, DROWN',
            'Mutual TLS and certificate pinning',
          ],
          explanation: `**TLS** is where every primitive in this module appears at once, and seeing it composed is the point of this lesson. In **TLS 1.3** the client and server run an ephemeral (elliptic-curve) **Diffie-Hellman** to agree a shared secret in one round trip; the server proves its identity with a **digital signature** over the handshake transcript using the private key of its **certificate**; a **key derivation function** expands the DH secret into traffic keys; and all application data flows under an **AEAD** cipher. The result has confidentiality, integrity, server authentication and **forward secrecy**. TLS 1.3 deliberately removed the dangerous options of earlier versions (static RSA key exchange, CBC MAC-then-encrypt, renegotiation, compression), which is a lesson in itself: much of secure design is deleting footguns.

Authentication rests on the **web PKI**. A server's certificate carries its public key and name, signed by an intermediate, signed by a **root CA** in the client's trust store; the client performs **path validation** (chain, names, dates, usage). CAs issue after **domain validation** (prove you control the domain), now automated by **ACME**/Let's Encrypt. Because a single mis-issuing CA could impersonate any site, **Certificate Transparency** requires every certificate to be logged publicly so mis-issuance is detectable.

The history of TLS attacks is a syllabus of what goes wrong when primitives are composed carelessly, and you should know the headline cases: **downgrade** attacks that trick peers into weak versions (mitigation: version pinning, HSTS), **padding-oracle** attacks (POODLE, Lucky 13) from CBC MAC-then-encrypt, **compression** oracles (CRIME, BREACH) that leak secrets through ciphertext length, **Heartbleed** (a buffer over-read in OpenSSL leaking memory), and **DROWN** (a weak old protocol sharing a key with a strong one). Each maps to a defence now baked into TLS 1.3 or into configuration guidance.

This lesson complements the Computer Networks treatment of TLS as a protocol; here the emphasis is cryptographic composition and the attack history. Use the Mozilla configuration guidance and the testing exercises to make it concrete.`,
          resources: [
            {
              title: 'RFC 8446 — TLS 1.3',
              url: 'https://www.rfc-editor.org/rfc/rfc8446',
              type: 'documentation',
              cost: 'free',
              provider: 'IETF',
              note: 'Appendix E (security properties) and section 1-2 for how the pieces compose.',
              primary: true,
            },
            {
              title: 'OWASP Transport Layer Security Cheat Sheet',
              url: 'https://cheatsheetseries.owasp.org/cheatsheets/Transport_Layer_Security_Cheat_Sheet.html',
              type: 'documentation',
              cost: 'free',
              provider: 'OWASP',
            },
            {
              title: 'The Illustrated TLS 1.3 Connection',
              url: 'https://tls13.xargs.org/',
              type: 'interactive',
              cost: 'free',
            },
            {
              title: 'badssl.com — deliberately broken TLS test endpoints',
              url: 'https://badssl.com/',
              type: 'tool',
              cost: 'free',
            },
            {
              title: 'Heartbleed — technical explanation',
              url: 'https://heartbleed.com/',
              type: 'article',
              cost: 'free',
            },
          ],
          exercises: [
            {
              slug: 'tls-config-audit',
              title: 'Audit and harden a TLS configuration',
              prompt:
                'Stand up a local TLS server (nginx or a Python server with the ssl module) with a self-signed certificate. Use testssl.sh (local) or openssl s_client to enumerate its protocols, cipher suites and certificate. Deliberately enable a weak configuration (old protocol, CBC cipher, small DH) and record the findings; then apply the Mozilla "modern" configuration and re-test. Explain each change and the attack it prevents.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'cert-validation-cases',
              title: 'Explore certificate validation failures',
              prompt:
                'Connect your certificate-validation tool from the public-key lesson (or openssl) to each badssl.com endpoint: expired, wrong-host, self-signed, untrusted-root, revoked, and a valid one. For each, state which validation step failed and what an attacker exploiting a client that ignored that failure could do. Then find the valid certificate in a Certificate Transparency log and explain what CT would reveal if a CA mis-issued it.',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'attack-history-brief',
              title: 'Brief on a TLS attack',
              prompt:
                'Choose one historical TLS attack (POODLE, CRIME, Lucky 13, Heartbleed, DROWN, FREAK). Write two pages: the cryptographic or implementation flaw, exactly how plaintext or keys were recovered, which earlier design decision enabled it, and which TLS 1.3 change or configuration rule prevents it today. Include a small diagram of the attack.',
              kind: 'writing',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Which primitive in a TLS 1.3 handshake provides forward secrecy, and which provides server authentication?',
              answerOutline:
                'Ephemeral ECDH provides forward secrecy; the server\'s signature (CertificateVerify) over the transcript with its certificate key provides authentication.',
            },
            {
              question: 'What does Certificate Transparency protect against?',
              answerOutline:
                'A CA issuing a certificate for a domain without the owner\'s knowledge; public append-only logs let owners and monitors detect mis-issuance.',
            },
            {
              question: 'Why did TLS 1.3 remove compression and static RSA key exchange?',
              answerOutline:
                'Compression enabled CRIME/BREACH length-leak oracles; static RSA gave no forward secrecy and enabled padding-oracle and DROWN-style cross-protocol attacks.',
            },
            {
              question: 'How does a downgrade attack work and what stops it?',
              answerOutline:
                'An active attacker strips or alters version/cipher negotiation to force a weak choice; TLS 1.3 authenticates the negotiation in the transcript, and HSTS prevents protocol/HTTP downgrades.',
            },
          ],
        },
      ],
    },
    {
      slug: 'memory-safety-and-binary-exploitation',
      title: 'Memory Safety and Binary Exploitation',
      description:
        'Why C and C++ programs are exploitable, how stack and heap corruption become code execution, how modern mitigations raise the cost, and how to defeat and ultimately prevent them.',
      lessons: [
        {
          slug: 'memory-safety-vulnerabilities',
          title: 'Memory-safety vulnerabilities',
          summary:
            'The root cause of decades of exploits: buffer overflows, use-after-free, integer overflows and the undefined behaviour that makes C unsafe.',
          estimatedMinutes: 100,
          objectives: [
            'Explain what memory safety is and classify the main memory-safety bug types',
            'Explain how an out-of-bounds write, use-after-free or integer overflow leads to corruption',
            'Use AddressSanitizer and Valgrind to detect memory errors in C programs',
            'Explain why memory-unsafe languages dominate critical bugs and what safe languages change',
          ],
          concepts: [
            'Spatial vs temporal memory safety',
            'Stack and heap buffer overflow (out-of-bounds read/write)',
            'Use-after-free and double-free',
            'Integer overflow leading to undersized allocation',
            'Uninitialised memory; type confusion',
            'Undefined behaviour and compiler assumptions',
            'ASan, UBSan, Valgrind/Memcheck',
          ],
          explanation: `**Memory safety** means a program only ever accesses memory it legitimately owns, within bounds and within lifetime. C and C++ provide no such guarantee, and the result is that memory-corruption bugs have caused a large fraction of all serious vulnerabilities for thirty years; Microsoft and Google both report roughly 70% of their severe bugs are memory-safety issues. There are two kinds. **Spatial** safety is about staying in bounds: a **buffer overflow** writes past the end of an array, overwriting adjacent data (on the stack, return addresses; on the heap, allocator metadata or neighbouring objects). **Temporal** safety is about lifetime: a **use-after-free** uses a pointer after the object is freed, and if the attacker has caused a new object to be allocated there, they control what the stale pointer sees; a **double-free** corrupts allocator state.

Two amplifiers make these worse. **Integer overflow**: computing an allocation size as \`n * size\` can wrap to a small value, so a later copy of \`n\` elements overflows the undersized buffer, a pattern behind many real CVEs. **Undefined behaviour**: the C standard declares out-of-bounds access, signed overflow, use-after-free and more to be undefined, which licenses the compiler to assume they never happen and optimise accordingly, so the observed behaviour can be baffling and the bug can appear only under optimisation. This is why "it worked in debug" is not safety.

You detect these with tooling before attackers do. **AddressSanitizer** (ASan, \`-fsanitize=address\`) instruments memory accesses and catches overflows and use-after-free at the moment they happen with a precise report; **UndefinedBehaviorSanitizer** catches integer overflow and other UB; **Valgrind/Memcheck** catches many errors on unmodified binaries more slowly. Running these under a test suite or a fuzzer finds most memory bugs cheaply.

The structural fix is a **memory-safe language**. Rust (covered in Systems Programming) enforces spatial and temporal safety at compile time with ownership and borrowing; Go, Java and others use garbage collection and bounds checks. The industry trend, pushed by CISA's "secure by design", is to move new critical code to such languages. This lesson is the "why"; the next three are the "how it is exploited".`,
          resources: [
            {
              title: 'CWE-787 (Out-of-bounds Write) and CWE-416 (Use After Free)',
              url: 'https://cwe.mitre.org/top25/',
              type: 'documentation',
              cost: 'free',
              provider: 'MITRE',
              note: 'Read the top-ranked memory-safety weaknesses and their examples.',
              primary: true,
            },
            {
              title: 'AddressSanitizer documentation (Clang)',
              url: 'https://clang.llvm.org/docs/AddressSanitizer.html',
              type: 'documentation',
              cost: 'free',
              provider: 'LLVM',
            },
            {
              title: 'Valgrind Memcheck manual',
              url: 'https://valgrind.org/docs/manual/mc-manual.html',
              type: 'documentation',
              cost: 'free',
              provider: 'Valgrind',
            },
            {
              title: 'The Chromium Project — memory safety',
              url: 'https://www.chromium.org/Home/chromium-security/memory-safety/',
              type: 'article',
              cost: 'free',
              provider: 'Google',
              note: 'Industry data on the prevalence of memory-safety bugs and the move to safe languages.',
            },
          ],
          exercises: [
            {
              slug: 'find-bugs-with-asan',
              title: 'Find memory bugs with sanitizers',
              prompt:
                'Write (or take) five small C programs each containing one bug: a stack overflow, a heap overflow, a use-after-free, a double-free, and an integer-overflow-to-undersized-allocation. Compile each with -fsanitize=address,undefined and run; capture and explain each sanitizer report, pointing to the exact line and the kind of violation. Then show that three of the five produce no crash without the sanitizer, illustrating silent corruption.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'integer-overflow-exploitable',
              title: 'Make an integer overflow exploitable',
              prompt:
                'Write a function that allocates size = count * sizeof(elem) and copies count elements from input. Choose count so that the multiplication overflows a 32-bit size_t to a small value, causing a heap overflow on the copy. Demonstrate the overflow with ASan, then fix it with a checked multiplication (or by using a 64-bit size and validating bounds). Explain how CWE-190 feeds CWE-787.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'ub-surprises',
              title: 'Undefined behaviour surprises',
              prompt:
                'Construct two short C programs where undefined behaviour (signed overflow used in a bounds check; a use of an out-of-bounds index the compiler assumes cannot happen) produces different results at -O0 and -O2. Use godbolt or local compilation to show the generated code differs, explain what the optimiser assumed, and rewrite each to be well-defined.',
              kind: 'coding',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'What is the difference between spatial and temporal memory safety, with an example of each violation?',
              answerOutline:
                'Spatial: accessing outside an object\'s bounds (buffer overflow). Temporal: accessing outside its lifetime (use-after-free). Both are undefined behaviour in C.',
            },
            {
              question: 'How can an integer overflow cause a buffer overflow?',
              answerOutline:
                'A size computed by multiplication wraps to a small value, so an undersized buffer is allocated and a subsequent copy of the real (large) count writes out of bounds.',
            },
            {
              question: 'Why can a memory bug behave differently at -O0 and -O2?',
              answerOutline:
                'The standard makes the operation undefined, so the optimiser may assume it never happens and transform code accordingly; the observable effect depends on those assumptions.',
            },
            {
              question: 'What do AddressSanitizer and a memory-safe language each contribute?',
              answerOutline:
                'ASan detects violations at runtime during testing/fuzzing (find bugs); a safe language prevents whole classes at compile time or with checked runtime semantics (eliminate bugs).',
            },
          ],
          relatedLessons: ['systems-programming/pointers-and-memory/memory-layout-of-a-process'],
        },
        {
          slug: 'stack-smashing',
          title: 'Stack smashing: from overflow to control flow',
          summary:
            'The classic attack: overwriting a saved return address on the stack to redirect execution, and the stack canaries that detect it.',
          estimatedMinutes: 120,
          objectives: [
            'Describe the stack layout of a function call: arguments, return address, saved frame pointer, locals',
            'Explain how overflowing a local buffer overwrites the saved return address and hijacks control flow',
            'Build a working stack overflow against a provided vulnerable binary in a lab and redirect execution',
            'Explain stack canaries, how they detect the attack and their limitations',
          ],
          concepts: [
            'Calling convention; the stack frame',
            'Saved return address and frame pointer',
            'Overwriting the return address; controlling EIP/RIP',
            'Crafting input: offset to return address, little-endian addresses',
            'Redirecting to existing code or injected code',
            'Stack canaries (stack protector) and how they detect overflow',
            'Debugging with gdb/pwndbg; cyclic pattern offset finding',
          ],
          explanation: `When a function is called, the CPU pushes the **return address** (where to resume in the caller) onto the stack, and the function then allocates its **local variables** in the same frame. Crucially, on common architectures the stack grows downward while buffers are written upward, so a local buffer sits at a lower address than the saved return address. If the program copies attacker-controlled data into that buffer without a bounds check, writing past its end overwrites, in order, other locals, the saved frame pointer, and then the **return address**. When the function returns, the CPU jumps to whatever address now sits there, and the attacker controls execution. This is the attack Aleph One's 1996 "Smashing the Stack for Fun and Profit" made famous, and understanding it is the foundation of binary exploitation.

To build one you work entirely in a lab against binaries meant to be attacked (exploit.education, pwn.college, or your own compiled-with-\`-fno-stack-protector -z execstack\` programs). First find the **offset**: how many bytes from the start of the buffer to the return address, found by sending a **cyclic pattern** and reading the faulting address in \`gdb\` (with pwndbg or GEF the \`cyclic\` command automates it). Then overwrite the return address with the address of code you want to run, written in **little-endian** byte order. In the simplest case you redirect to an existing function in the binary (say, a \`win()\` that prints a flag); in the classic case you inject **shellcode** into the buffer and jump to it, which the next lesson covers in depth.

Because this attack is so common, compilers added the **stack canary** (stack protector): a random value placed between the locals and the saved return address at function entry and checked before return. A linear overflow that reaches the return address must pass through the canary, so the altered canary is detected and the program aborts (\`stack smashing detected\`). Canaries do not stop overflows that skip the canary (e.g. via an out-of-bounds index), do not protect the heap, and can be defeated if the canary value leaks, so they raise the cost rather than closing the hole, which motivates the mitigations in the next lesson.`,
          resources: [
            {
              title: 'exploit.education — Phoenix (stack overflow exercises)',
              url: 'https://exploit.education/phoenix/',
              type: 'problem-set',
              cost: 'free',
              provider: 'exploit.education',
              note: 'A VM of progressively harder memory-corruption challenges designed for learning. Fully authorised targets.',
              primary: true,
            },
            {
              title: 'Smashing the Stack for Fun and Profit (Aleph One, Phrack 49)',
              url: 'https://phrack.org/issues/49/14',
              type: 'article',
              cost: 'free',
              provider: 'Phrack',
              note: 'The original, still-readable description of the stack overflow.',
            },
            {
              title: 'pwn.college — Program Security / Memory Errors',
              url: 'https://pwn.college/',
              type: 'course',
              cost: 'free',
              provider: 'Arizona State University',
              note: 'Structured modules with a browser-based lab; work the stack-overflow dojo.',
            },
            {
              title: 'pwndbg (gdb plugin for exploitation)',
              url: 'https://github.com/pwndbg/pwndbg',
              type: 'tool',
              cost: 'free',
            },
          ],
          exercises: [
            {
              slug: 'find-the-offset',
              title: 'Find the overflow offset',
              prompt:
                'On a provided vulnerable binary (exploit.education or your own compiled with -fno-stack-protector), send a cyclic pattern that crashes it, read the faulting address in gdb/pwndbg, and compute the exact offset from the buffer to the saved return address. Verify by overwriting the return address with 0x4242424242424242 and confirming RIP equals it. Document every command.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'redirect-to-win',
              title: 'Redirect execution to a target function',
              prompt:
                'Given a vulnerable program containing an unused function win() that prints a flag, craft input that overflows the buffer and overwrites the return address with win()\'s address (little-endian). Make it print the flag. Then add an argument that win() checks and show how to also control the argument via the overflow. Submit the exploit script (pwntools recommended) and explain each field.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'canary-detection',
              title: 'Observe the stack canary',
              prompt:
                'Compile the same vulnerable program once with -fno-stack-protector and once with -fstack-protector-all. Run your offset overflow against both. Show that the first lets you control RIP and the second aborts with "stack smashing detected". Disassemble both to point out the canary load, the XOR with the saved value, and the check before ret. Then explain two situations in which a canary would not stop an attack.',
              kind: 'coding',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does overflowing a local buffer let an attacker control where a function returns?',
              answerOutline:
                'The saved return address sits above the buffer in the frame; a linear overflow overwrites it, and ret jumps to the attacker-supplied value.',
            },
            {
              question: 'What is the offset and how do you find it reliably?',
              answerOutline:
                'The byte distance from the buffer start to the saved return address; found with a cyclic (De Bruijn) pattern whose faulting value maps back to a unique position.',
            },
            {
              question: 'How does a stack canary detect a stack overflow, and when does it fail?',
              answerOutline:
                'A random value between locals and the return address is checked before ret; a linear overflow alters it and aborts. It fails against non-linear writes, heap bugs, or if the canary value leaks.',
            },
            {
              question: 'Why must addresses in the exploit be written little-endian?',
              answerOutline:
                'x86/x86-64 store multi-byte integers least-significant-byte first, so the address bytes must be ordered to be read correctly when loaded into the instruction pointer.',
            },
          ],
        },
        {
          slug: 'shellcode-and-mitigations',
          title: 'Shellcode and exploit mitigations',
          summary:
            'Injecting executable code, and the mitigations (W^X/NX, ASLR, PIE, RELRO) that stopped it and reshaped exploitation.',
          estimatedMinutes: 110,
          objectives: [
            'Explain what shellcode is and the constraints on writing it (no null bytes, position independence)',
            'Explain NX / W^X and why it stopped classic code injection',
            'Explain ASLR and PIE and how they defeat hardcoded addresses, and what an information leak does',
            'Describe the layered modern mitigations (RELRO, Fortify, CFI) and what each prevents',
          ],
          concepts: [
            'Shellcode: minimal machine code (e.g. execve("/bin/sh"))',
            'Bad-byte constraints and encoders',
            'Data Execution Prevention / NX / W^X',
            'ASLR: randomising stack, heap, libraries; PIE for the binary',
            'Information leaks to defeat ASLR',
            'RELRO, Fortify Source, stack canaries revisited',
            'Control-flow integrity (CFI); the mitigation arms race',
          ],
          explanation: `Once an attacker controls the instruction pointer, the classic goal was to run their own **shellcode**: a short piece of machine code, typically one that calls \`execve("/bin/sh", ...)\` to get a shell. Writing shellcode has constraints: it is often copied by string functions, so it must contain **no null bytes** (and sometimes no newlines), and it must be **position-independent** because you do not know its exact address. You place the shellcode in the overflowed buffer (or any attacker-controlled memory) and overwrite the return address to jump to it.

This worked until two mitigations, now universal, broke it. **NX / DEP / W^X** ("write XOR execute") marks writable memory, including the stack and heap, as non-executable, so jumping to injected shellcode faults: no page is both writable and executable. This did not end exploitation but forced it to reuse existing executable code (return-oriented programming, next lesson). **ASLR** (address space layout randomisation) randomises the base addresses of the stack, heap and shared libraries each run, and **PIE** randomises the executable itself, so the hardcoded addresses an exploit needs are unknown. Defeating ASLR requires an **information leak**: a separate bug (a format-string, an uninitialised read, an out-of-bounds read) that reveals a real runtime address, from which the attacker computes the others.

Modern binaries stack further defences. **RELRO** makes the relocation tables read-only so they cannot be overwritten to hijack control; **Fortify Source** replaces unsafe libc calls with bounds-checked versions when sizes are known at compile time; **stack canaries** (previous lesson) detect linear stack overwrites; and **control-flow integrity** restricts indirect jumps and returns to legitimate targets, aiming to stop ROP. None is complete alone, which is the theme: exploitation and mitigation are an **arms race**, and defence in depth means an attacker must chain several bugs (a leak plus a corruption) to win. You will check which mitigations a binary has with \`checksec\` and observe how each one changes what your earlier exploit must do.`,
          resources: [
            {
              title: 'pwn.college — Memory Errors and Exploitation dojos',
              url: 'https://pwn.college/',
              type: 'course',
              cost: 'free',
              provider: 'Arizona State University',
              note: 'Modules on shellcoding, NX, and bypassing mitigations, with authorised lab targets.',
              primary: true,
            },
            {
              title: 'checksec.sh — inspect binary mitigations',
              url: 'https://github.com/slimm609/checksec.sh',
              type: 'tool',
              cost: 'free',
            },
            {
              title: 'pwntools documentation (shellcraft, ELF, process interaction)',
              url: 'https://docs.pwntools.com/en/stable/',
              type: 'documentation',
              cost: 'free',
              provider: 'Gallopsled',
            },
            {
              title: 'A proactive approach to more secure code (Microsoft MSRC on mitigations)',
              url: 'https://msrc.microsoft.com/blog/2019/07/a-proactive-approach-to-more-secure-code/',
              type: 'article',
              cost: 'free',
              provider: 'Microsoft',
            },
          ],
          exercises: [
            {
              slug: 'checksec-survey',
              title: 'Survey binary mitigations',
              prompt:
                'Run checksec on at least ten binaries on your system (and on your own programs compiled with different flags). Tabulate NX, PIE, RELRO (partial/full), canary and Fortify for each. Then compile one program with each mitigation individually disabled and confirm checksec reflects it. Write one sentence per mitigation on what an attacker must do to overcome it.',
              kind: 'coding',
              difficulty: 1,
            },
            {
              slug: 'shellcode-injection-no-nx',
              title: 'Classic shellcode injection (NX off)',
              prompt:
                'On a lab binary compiled with an executable stack and NX disabled, inject a no-null-byte execve("/bin/sh") shellcode into the overflowed buffer and jump to it, using a NOP sled to absorb address uncertainty. Get a shell. Then recompile with NX enabled and show the same exploit now faults at the jump; explain precisely why.',
              kind: 'coding',
              difficulty: 3,
              hint: 'pwntools shellcraft generates tested shellcode; verify it contains no bad bytes for your input path.',
            },
            {
              slug: 'leak-then-defeat-aslr',
              title: 'Defeat ASLR with a leak',
              prompt:
                'On a lab binary with ASLR and NX but a separate information-disclosure bug (e.g. a format string or an out-of-bounds read that prints a libc address), leak a runtime address, compute the library base, and use it to complete an exploit (e.g. call system). Document the leak, the base computation, and why the exploit is impossible without the leak.',
              kind: 'coding',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'What is shellcode and what constraints does it usually satisfy?',
              answerOutline:
                'Small machine code to achieve the attacker goal (often spawning a shell); typically free of null/newline bytes and position-independent so it survives string copies and unknown load addresses.',
            },
            {
              question: 'How does NX/W^X stop classic code injection, and how do attackers respond?',
              answerOutline:
                'Writable memory is non-executable, so injected shellcode cannot run; attackers reuse existing executable code via return-oriented programming.',
            },
            {
              question: 'Why does ASLR require an information leak to bypass?',
              answerOutline:
                'Addresses are randomised per run, so hardcoded targets fail; a leak reveals one real address, from which fixed offsets give the rest.',
            },
            {
              question: 'Why is defence in depth the right framing for these mitigations?',
              answerOutline:
                'No single mitigation is complete; together they force an attacker to chain multiple independent bugs (e.g. a leak plus a corruption), raising cost sharply.',
            },
          ],
        },
        {
          slug: 'rop-and-modern-exploitation',
          title: 'Return-oriented programming and the heap',
          summary:
            'Exploitation after NX: chaining existing code with ROP, defeating ASLR in practice, and an introduction to heap corruption.',
          estimatedMinutes: 120,
          objectives: [
            'Explain return-oriented programming: gadgets, the gadget chain and how it bypasses NX',
            'Build a ROP chain (e.g. ret2libc or a syscall chain) against a lab binary',
            'Explain the structure of a heap allocator and how heap overflow/use-after-free are exploited at a high level',
            'Explain why control-flow integrity and memory-safe languages are the long-term answers',
          ],
          concepts: [
            'ROP gadgets (instruction sequences ending in ret)',
            'ret2libc; building a chain to call functions or syscalls',
            'Stack pivoting; gadget discovery (ROPgadget, ropper)',
            'Heap allocator basics (bins, chunks, metadata)',
            'Heap overflow, use-after-free, tcache/fastbin attacks (conceptual)',
            'Control-flow integrity and shadow stacks',
            'Why safe languages end the arms race',
          ],
          explanation: `NX stops you running injected code, so modern exploitation **reuses the code already present**. **Return-oriented programming** (ROP) is the general technique: the binary and its libraries contain many short instruction sequences ending in a \`ret\` (a **gadget**), such as \`pop rdi; ret\` or \`pop rax; syscall\`. By overflowing the stack with a sequence of gadget addresses interleaved with data, the attacker makes each \`ret\` jump to the next gadget, stitching them into an arbitrary computation, the Turing-complete "weird machine". The simplest form is **ret2libc**: set up the argument registers with \`pop\` gadgets and return into \`system("/bin/sh")\` or into an \`execve\` syscall. Tools such as ROPgadget or ropper find gadgets; pwntools assembles the chain. In practice you first use an information leak (previous lesson) to defeat ASLR and learn the library base, then build the chain against the now-known addresses; **stack pivoting** handles cases where you control a different region than the stack.

The **heap** is the other battleground. A heap allocator (glibc's ptmalloc) manages memory in **chunks** with inline **metadata** (sizes, free-list pointers) and free lists (**bins**, **tcache**, **fastbins**). A **heap overflow** can corrupt a neighbouring chunk's metadata or an application pointer; a **use-after-free** lets the attacker reallocate the freed region with controlled data so a dangling pointer is now theirs. Classic techniques (tcache poisoning, fastbin dup) trick the allocator into returning an attacker-chosen address from \`malloc\`, giving an arbitrary write that is then turned into control-flow hijack. You should understand these at the conceptual level and try a guided heap challenge; full mastery is a specialism.

The defensive conclusion is the point. The attacker-defender **arms race**, canaries then NX then ASLR then RELRO then CFI, each raising cost, shows that patching mechanisms never fully closes memory corruption while the language permits it. **Control-flow integrity** and hardware **shadow stacks** constrain where returns and indirect calls may go, breaking generic ROP, but the durable answer, now the explicit direction of the US and UK governments and the major browser vendors, is to write new code in **memory-safe languages** so the bug class cannot exist. That connects directly to the Rust material in Systems Programming.`,
          resources: [
            {
              title: 'ROP Emporium — guided return-oriented programming challenges',
              url: 'https://ropemporium.com/',
              type: 'problem-set',
              cost: 'free',
              note: 'Progressive ROP challenges across architectures, designed as authorised learning targets.',
              primary: true,
            },
            {
              title: 'Nightmare — a binary exploitation and reverse-engineering course',
              url: 'https://guyinatuxedo.github.io/',
              type: 'course',
              cost: 'free',
              note: 'Worked CTF solutions covering ROP and heap techniques step by step.',
            },
            {
              title: 'pwntools documentation (ROP module)',
              url: 'https://docs.pwntools.com/en/stable/',
              type: 'documentation',
              cost: 'free',
              provider: 'Gallopsled',
            },
            {
              title: 'ir0nstone — binary exploitation notes (ROP, heap)',
              url: 'https://ir0nstone.gitbook.io/notes',
              type: 'documentation',
              cost: 'free',
            },
          ],
          exercises: [
            {
              slug: 'ret2libc-chain',
              title: 'Build a ret2libc chain',
              prompt:
                'On an NX-enabled lab binary (ROP Emporium "ret2win" then "callme"/"ret2libc"), find the gadgets with ROPgadget, build a chain that sets up arguments and calls the target (or system("/bin/sh")), and get the flag or a shell. Combine with a leak to resolve libc if ASLR is on. Submit the pwntools script with a comment on every gadget and why it is needed.',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'gadget-hunt-explain',
              title: 'Gadget hunting and the weird machine',
              prompt:
                'For a given binary, list ten useful gadgets you found and what each does (e.g. "pop rdi; ret" sets the first argument). Then write, in pseudo-assembly, how you would chain gadgets to perform mprotect to make a region executable and jump to shellcode. Explain why ROP is described as programming a "weird machine".',
              kind: 'writing',
              difficulty: 2,
            },
            {
              slug: 'heap-uaf-intro',
              title: 'Exploit a use-after-free (guided)',
              prompt:
                'Using a guided heap challenge (Nightmare or pwn.college heap module), exploit a use-after-free: free an object, allocate an attacker-controlled object into the same chunk, and use the dangling reference to redirect a function pointer or leak data. Describe the allocator behaviour (tcache/fastbin) that made the reallocation land where you wanted, and state which mitigation (safe-linking, pointer authentication, a safe language) would have stopped it.',
              kind: 'coding',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'How does return-oriented programming bypass NX?',
              answerOutline:
                'It executes no new code; it chains existing executable gadgets (ending in ret) via a crafted stack, so no writable page needs to be executable.',
            },
            {
              question: 'What is a ret2libc attack?',
              answerOutline:
                'A ROP variant that returns into libc functions (e.g. system) with attacker-set arguments, reusing trusted code to achieve the goal without shellcode.',
            },
            {
              question: 'How is a use-after-free turned into an exploit primitive?',
              answerOutline:
                'After free, the attacker reallocates the same chunk with controlled data; the dangling pointer now reads/writes attacker data, often yielding an arbitrary read/write or control of a function pointer.',
            },
            {
              question: 'Why are memory-safe languages considered the durable fix rather than more mitigations?',
              answerOutline:
                'Mitigations only raise the cost of exploiting an ever-present bug class; safe languages remove the class at the language level, ending the arms race for that code.',
            },
          ],
          relatedLessons: ['systems-programming/ownership-and-safe-concurrency/ownership-and-borrowing'],
        },
      ],
    },
    {
      slug: 'web-security',
      title: 'Web Security',
      description:
        'The browser security model and the vulnerability classes that dominate real-world breaches: injection, cross-site scripting, request forgery, SSRF and broken access control, each exploited and then fixed.',
      lessons: [
        {
          slug: 'the-web-security-model',
          title: 'The web security model',
          summary:
            'The foundations every web attack turns on: the same-origin policy, cookies and sessions, CORS, and the headers that harden a site.',
          estimatedMinutes: 100,
          objectives: [
            'Define an origin and explain what the same-origin policy does and does not restrict',
            'Explain cookies, their attributes (Secure, HttpOnly, SameSite) and how sessions are built on them',
            'Explain CORS: why it exists, how a cross-origin request is permitted, and common misconfigurations',
            'Use security headers (CSP, HSTS, X-Content-Type-Options) to harden a site',
          ],
          concepts: [
            'Origin = scheme + host + port; same-origin policy',
            'Cookies; Secure, HttpOnly, SameSite, Domain, Path',
            'Sessions and session identifiers',
            'CORS preflight and Access-Control-* headers',
            'Content Security Policy (CSP)',
            'HSTS, X-Content-Type-Options, X-Frame-Options/frame-ancestors',
            'Mixed content; cookie scoping pitfalls',
          ],
          explanation: `Almost every web vulnerability is a failure of the browser's trust model, so you must understand that model before attacking it. The cornerstone is the **same-origin policy**: an **origin** is the triple (scheme, host, port), and script from one origin may not read responses from another. This is why a page on \`evil.com\` cannot read your \`bank.com\` account page even though your browser holds your bank cookies. But the policy is narrower than it looks: it restricts *reading* cross-origin responses, not *sending* cross-origin requests, which is exactly the gap that CSRF exploits, and it has many historical holes.

**Cookies** carry session state. When you log in, the server sends \`Set-Cookie\` with a session identifier, and the browser returns it on every request to that domain, which is how the stateless HTTP protocol gets a logged-in user. The cookie's **attributes** are security-critical: **HttpOnly** hides it from JavaScript (mitigating theft via XSS), **Secure** sends it only over HTTPS, and **SameSite** (Lax/Strict/None) controls whether it rides along on cross-site requests (the main CSRF defence). Misconfigured \`Domain\` or \`Path\` scoping can expose a cookie to subdomains or paths that should not see it.

Because strict same-origin would break legitimate APIs, **CORS** provides a controlled relaxation: the server opts in by returning \`Access-Control-Allow-Origin\` and, for non-simple requests, answering a **preflight** \`OPTIONS\`. The frequent mistake is reflecting the request's Origin and allowing credentials, which effectively disables the protection; you will find and exploit exactly this.

Finally, a set of **response headers** hardens a site. **Content Security Policy** restricts which sources scripts, styles and frames may load from, the strongest defence-in-depth against XSS. **HSTS** forces HTTPS and prevents downgrade. **X-Content-Type-Options: nosniff** stops MIME confusion, and **frame-ancestors** (or X-Frame-Options) prevents clickjacking. Stanford's CS253 and the MDN security docs are the reference; read them, then inspect real sites' headers and Mozilla Observatory grades in the exercises.`,
          resources: [
            {
              title: 'Stanford CS253 — Web Security (lectures and notes)',
              url: 'https://web.stanford.edu/class/cs253/',
              type: 'course',
              cost: 'free',
              provider: 'Stanford',
              note: 'Lectures on the browser security model, same-origin policy, cookies and CSP. The backbone of this module.',
              primary: true,
            },
            {
              title: 'MDN — Same-origin policy',
              url: 'https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy',
              type: 'documentation',
              cost: 'free',
              provider: 'Mozilla',
            },
            {
              title: 'MDN — HTTP cookies (attributes and SameSite)',
              url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Cookies',
              type: 'documentation',
              cost: 'free',
              provider: 'Mozilla',
            },
            {
              title: 'MDN — Content Security Policy (CSP)',
              url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP',
              type: 'documentation',
              cost: 'free',
              provider: 'Mozilla',
            },
            {
              title: 'PortSwigger Web Security Academy — CORS',
              url: 'https://portswigger.net/web-security/cors',
              type: 'interactive',
              cost: 'free',
              provider: 'PortSwigger',
              note: 'Free interactive labs on CORS misconfiguration.',
            },
          ],
          exercises: [
            {
              slug: 'header-audit',
              title: 'Audit security headers',
              prompt:
                'Pick five public sites. For each, record the presence and value of Set-Cookie attributes (Secure/HttpOnly/SameSite), Content-Security-Policy, Strict-Transport-Security, X-Content-Type-Options and frame-ancestors/X-Frame-Options, using curl -I or the browser dev tools and Mozilla Observatory. Tabulate, grade each site, and name the single most impactful header each site is missing and the attack it would mitigate.',
              kind: 'data-analysis',
              difficulty: 1,
            },
            {
              slug: 'cors-misconfig-lab',
              title: 'Exploit a CORS misconfiguration',
              prompt:
                'Complete the PortSwigger CORS labs (basic origin reflection with credentials). Then build a tiny local API that reflects the Origin header and sets Access-Control-Allow-Credentials: true, host an attacker page on a different origin, and demonstrate reading a victim\'s data cross-origin. Fix the server (allowlist of exact origins, no credential reflection) and show the attack now fails.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'csp-build',
              title: 'Write a CSP that stops inline script',
              prompt:
                'Take a small vulnerable page that reflects user input into the DOM. Add a Content-Security-Policy that forbids inline script and restricts script-src to self plus a nonce. Show that an injected <script> and an inline event handler are blocked by the browser (console reports the violation) while the legitimate nonce\'d script runs. Explain why CSP is defence in depth, not a substitute for output encoding.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What exactly does the same-origin policy prevent, and what does it not prevent?',
              answerOutline:
                'It prevents script in one origin from reading responses from another; it does not prevent sending cross-origin requests (forms, img, script src), which is why CSRF is possible.',
            },
            {
              question: 'What do HttpOnly and SameSite cookie attributes defend against?',
              answerOutline:
                'HttpOnly hides the cookie from JavaScript, limiting theft via XSS; SameSite restricts the cookie on cross-site requests, limiting CSRF.',
            },
            {
              question: 'Why is reflecting the Origin header with Allow-Credentials dangerous?',
              answerOutline:
                'It grants any origin credentialed cross-origin read access, nullifying the same-origin protection; only an exact allowlist should be echoed.',
            },
            {
              question: 'How does a Content Security Policy reduce the impact of XSS?',
              answerOutline:
                'By restricting which script sources may execute (e.g. only nonce\'d or same-origin scripts), it blocks injected inline/remote scripts even if an injection point exists.',
            },
          ],
        },
        {
          slug: 'injection',
          title: 'Injection: SQL and command injection',
          summary:
            'When untrusted input is interpreted as code or query: how SQL and OS-command injection work, how to exploit them on authorised targets, and why parameterisation is the fix.',
          estimatedMinutes: 110,
          objectives: [
            'Explain the root cause of injection: mixing untrusted data with a command/query language',
            'Exploit SQL injection to bypass authentication, extract data (UNION, blind) on a lab target',
            'Exploit OS command injection and explain the dangers of shelling out',
            'Prevent injection with parameterised queries, safe APIs and least privilege; explain why escaping alone is fragile',
          ],
          concepts: [
            'Injection root cause: data interpreted as code',
            'SQL injection: authentication bypass, UNION-based, error-based, blind/boolean, time-based',
            'Stacked queries; reading schema',
            'OS command injection; argument vs shell execution',
            'Prevention: prepared statements / parameterised queries',
            'Least-privilege database accounts; allowlists',
            'ORMs and their escape hatches',
          ],
          explanation: `Injection is the oldest and still one of the most damaging web vulnerabilities, and its cause is always the same: **untrusted data is concatenated into a string that is then interpreted as code** in some language, SQL, a shell, LDAP, XPath. The interpreter cannot tell the attacker's data from the developer's instructions, so data becomes command.

**SQL injection** is the canonical case. If a login query is built as \`SELECT * FROM users WHERE name='\` + input + \`' AND pass='\` + ... , then an input of \`' OR '1'='1' --\` turns the WHERE clause always true and comments out the password check, logging in without credentials. From there an attacker escalates: a **UNION**-based injection appends \`UNION SELECT\` to read arbitrary tables; a **blind** injection, where no output is returned, infers data one bit at a time from boolean responses or from **time-based** delays (\`IF(condition, SLEEP(5), 0)\`); and stacked queries can modify data. On an authorised target (DVWA, Juice Shop, or the PortSwigger labs) you will perform each of these and read the database schema.

**OS command injection** is the same bug against a shell: if a program builds \`os.system("ping " + host)\`, then \`host = "8.8.8.8; cat /etc/passwd"\` runs an extra command. The deeper lesson is to avoid invoking a shell at all: pass arguments as a list to \`execve\`-style APIs so the OS never re-parses them.

The fix is structural, not cosmetic. **Parameterised queries** (prepared statements) send the query template and the data separately, so the database treats the data as values that can never change the query's structure; this is the single most important defensive technique in this subject and it eliminates SQL injection by construction. Equivalent **safe APIs** exist for shells (argument arrays), LDAP and so on. **Escaping** untrusted input into the string is fragile, easy to get wrong for every context and every character set, and should be a last resort. Add **least-privilege** database accounts so that even a successful injection reads little, and input **allowlisting** where the set of valid inputs is small.`,
          resources: [
            {
              title: 'PortSwigger Web Security Academy — SQL injection',
              url: 'https://portswigger.net/web-security/sql-injection',
              type: 'interactive',
              cost: 'free',
              provider: 'PortSwigger',
              note: 'Free labs covering authentication bypass, UNION, blind and time-based injection with a built-in target.',
              primary: true,
            },
            {
              title: 'OWASP SQL Injection Prevention Cheat Sheet',
              url: 'https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html',
              type: 'documentation',
              cost: 'free',
              provider: 'OWASP',
            },
            {
              title: 'PortSwigger Web Security Academy — OS command injection',
              url: 'https://portswigger.net/web-security/os-command-injection',
              type: 'interactive',
              cost: 'free',
              provider: 'PortSwigger',
            },
            {
              title: 'DVWA (Damn Vulnerable Web Application)',
              url: 'https://github.com/digininja/DVWA',
              type: 'tool',
              cost: 'free',
              note: 'Self-hosted authorised target with graded injection exercises at several difficulty levels.',
            },
          ],
          exercises: [
            {
              slug: 'sqli-end-to-end',
              title: 'SQL injection end to end',
              prompt:
                'On DVWA or the PortSwigger labs, perform: (1) authentication bypass; (2) a UNION-based extraction of the user table including password hashes; (3) a blind boolean injection that extracts the database version one character at a time; (4) a time-based injection where no output is shown. For each, give the exact payload and explain how the query was altered. Then crack one extracted hash offline (your own data) to show the full impact.',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'parameterise-the-fix',
              title: 'Fix injection with prepared statements',
              prompt:
                'Write a small vulnerable Flask/Node app with a string-concatenated SQL login, and reproduce the authentication bypass. Rewrite it with parameterised queries and show the same payload now fails and is treated as a literal username. Then add a least-privilege DB account and demonstrate that even a residual injection cannot read other tables. Measure that the fix does not change normal behaviour.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'command-injection-and-safe-exec',
              title: 'Command injection and the safe fix',
              prompt:
                'On an authorised lab (DVWA command-injection page or your own), exploit a shelled-out command to run an extra command. Then fix it two ways: by passing arguments as an array to an exec API that does not invoke a shell, and by strict input allowlisting. Show the exploit fails against each fix and explain why avoiding the shell is more robust than escaping.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What single root cause unites SQL, command and LDAP injection?',
              answerOutline:
                'Untrusted data is concatenated into a string interpreted as code in some language, so the interpreter cannot separate data from instructions.',
            },
            {
              question: 'How does a blind SQL injection extract data when no results are shown?',
              answerOutline:
                'By making the response or its timing depend on a boolean about the data (true/false page, or a conditional SLEEP), inferring the value bit by bit.',
            },
            {
              question: 'Why do parameterised queries prevent SQL injection where escaping is fragile?',
              answerOutline:
                'They send query structure and data separately so data can never alter the parse; escaping must correctly handle every context and encoding and is error-prone.',
            },
            {
              question: 'Why is passing arguments as a list safer than building a shell command string?',
              answerOutline:
                'No shell re-parses the arguments, so metacharacters (;, |, $()) are treated as literal data, not new commands.',
            },
          ],
        },
        {
          slug: 'xss',
          title: 'Cross-site scripting (XSS)',
          summary:
            'Injecting script into other users\' browsers: reflected, stored and DOM-based XSS, what an attacker can do with it, and the layered defences.',
          estimatedMinutes: 110,
          objectives: [
            'Explain the three XSS types (reflected, stored, DOM-based) and how each delivers script to a victim',
            'Demonstrate an XSS payload that steals a session or performs an action as the victim on a lab target',
            'Explain context-aware output encoding and why it is the primary defence',
            'Layer CSP, HttpOnly cookies and framework auto-escaping and explain what each contributes',
          ],
          concepts: [
            'XSS = running attacker script in the victim\'s origin',
            'Reflected, stored and DOM-based XSS',
            'Sinks (innerHTML, document.write) and sources (location, input)',
            'Impact: session theft, keylogging, request forgery, wormyms',
            'Context-aware output encoding (HTML, attribute, JS, URL)',
            'Content Security Policy as defence in depth',
            'Framework auto-escaping; dangerous bypasses (dangerouslySetInnerHTML)',
          ],
          explanation: `**Cross-site scripting** is injection into the browser: the attacker gets their JavaScript to run in a victim's browser **in the victim's origin**, so it can do anything the victim's own scripts can, read the DOM, read non-HttpOnly cookies, make authenticated requests, capture keystrokes, or rewrite the page. Because it runs in the trusted origin, it bypasses the same-origin policy entirely.

There are three delivery types. **Reflected** XSS puts the payload in a request (a search term echoed into the results page) and needs the victim to click a crafted link. **Stored** XSS persists the payload on the server (a comment, a profile field) so every viewer is attacked, which is the most dangerous because it can self-propagate into a worm, as the 2005 Samy MySpace worm did. **DOM-based** XSS never involves the server reflecting anything: client-side JavaScript reads an attacker-controlled **source** (\`location.hash\`, a URL parameter) and writes it to a dangerous **sink** (\`innerHTML\`, \`document.write\`, \`eval\`), so the injection happens entirely in the browser. Finding XSS is largely about tracing data from sources to sinks and testing whether your input can break out of its context into executable script.

The primary defence is **context-aware output encoding**: whenever untrusted data is placed into a page, encode it for the exact context, HTML-entity-encode in HTML body, attribute-encode in attributes, JavaScript-encode in scripts, URL-encode in URLs. Modern frameworks (React, Angular, modern template engines) **auto-escape** by default, which is why most XSS now appears where developers bypass that escaping (\`dangerouslySetInnerHTML\`, \`v-html\`, \`innerHTML\`) or build DOM manually. Layer on **defence in depth**: a strong **Content Security Policy** blocks injected and inline script even when an injection slips through, and **HttpOnly** cookies stop the most common payload (cookie theft). You will exploit each type on authorised labs and then apply each defence, measuring which payloads survive which defence.`,
          resources: [
            {
              title: 'PortSwigger Web Security Academy — Cross-site scripting',
              url: 'https://portswigger.net/web-security/cross-site-scripting',
              type: 'interactive',
              cost: 'free',
              provider: 'PortSwigger',
              note: 'Comprehensive free labs for reflected, stored and DOM XSS, with a context cheat sheet.',
              primary: true,
            },
            {
              title: 'OWASP Cross Site Scripting Prevention Cheat Sheet',
              url: 'https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html',
              type: 'documentation',
              cost: 'free',
              provider: 'OWASP',
            },
            {
              title: 'Google XSS game',
              url: 'https://xss-game.appspot.com/',
              type: 'interactive',
              cost: 'free',
              provider: 'Google',
              note: 'Six progressively harder reflected/DOM XSS challenges in a sandboxed target.',
            },
            {
              title: 'Stanford CS253 — XSS lectures',
              url: 'https://web.stanford.edu/class/cs253/',
              type: 'lecture',
              cost: 'free',
              provider: 'Stanford',
            },
          ],
          exercises: [
            {
              slug: 'three-xss-types',
              title: 'Exploit all three XSS types',
              prompt:
                'On authorised labs (PortSwigger and the Google XSS game, plus Juice Shop for stored XSS), demonstrate one reflected, one stored and one DOM-based XSS. For each give the payload, identify the source and sink, and explain the context you broke out of. For the stored case, write a payload that performs an authenticated action as the victim (e.g. changes their email) rather than just alert(1), to show real impact.',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'session-steal-poc',
              title: 'Session-theft proof of concept and its mitigation',
              prompt:
                'In a self-hosted lab, write an XSS payload that exfiltrates document.cookie to a server you control, and capture the cookie. Then set the session cookie HttpOnly and show the same payload can no longer read it. Explain what an attacker can still do via XSS even with HttpOnly (making requests as the victim), and why HttpOnly is necessary but not sufficient.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'encoding-and-csp-defence',
              title: 'Defend with encoding and CSP',
              prompt:
                'Take a vulnerable page that reflects input into three contexts (HTML body, an HTML attribute, and a <script> block). Apply correct context-aware encoding to each and show your earlier payloads fail. Then add a nonce-based CSP and show it blocks a residual DOM-based injection. Write a short note on the order of defences and why encoding is primary and CSP is secondary.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why is XSS so powerful despite the same-origin policy?',
              answerOutline:
                'The injected script runs inside the victim\'s origin, so it is treated as first-party code and can read the DOM/cookies and make authenticated requests within that origin.',
            },
            {
              question: 'How does DOM-based XSS differ from reflected XSS?',
              answerOutline:
                'DOM-based XSS occurs entirely client-side: JavaScript reads an attacker-controlled source and writes it to a dangerous sink, with no server reflection required.',
            },
            {
              question: 'Why must output encoding be context-aware?',
              answerOutline:
                'The characters that are dangerous differ by context (HTML body vs attribute vs JS vs URL); encoding for the wrong context leaves an exploitable break-out.',
            },
            {
              question: 'What does CSP add on top of correct encoding?',
              answerOutline:
                'Defence in depth: if an injection point is missed, CSP can still prevent injected or inline scripts from executing by restricting allowed script sources.',
            },
          ],
        },
        {
          slug: 'csrf-ssrf-and-access-control',
          title: 'CSRF, SSRF and broken access control',
          summary:
            'Three high-impact classes: forcing a victim\'s browser to act (CSRF), forcing the server to make requests (SSRF), and the authorization failures that top the OWASP list.',
          estimatedMinutes: 120,
          objectives: [
            'Explain CSRF and build a working proof of concept, then defend with tokens and SameSite',
            'Explain SSRF, exploit it to reach internal services or cloud metadata on a lab, and defend it',
            'Explain broken access control (IDOR, missing function-level checks, privilege escalation) and exploit an IDOR',
            'State why access control must be enforced server-side on every request',
          ],
          concepts: [
            'CSRF: using the victim\'s ambient authority (cookies)',
            'Anti-CSRF tokens; SameSite cookies; double-submit',
            'SSRF: server fetches an attacker-chosen URL',
            'Cloud metadata endpoints; internal services; allowlists',
            'Broken access control; IDOR (insecure direct object reference)',
            'Missing function-level authorization; forced browsing',
            'Server-side enforcement; deny by default',
          ],
          explanation: `These three classes dominate real breaches, and **broken access control** sits at the top of the OWASP Top 10. They share a theme: the application trusts something it should not, the browser's requests, a user-supplied URL, or a user-supplied identifier.

**Cross-site request forgery** abuses the browser's **ambient authority**: because the browser attaches your \`bank.com\` cookies to every request to \`bank.com\`, a hidden form on \`evil.com\` that auto-submits a POST to \`bank.com/transfer\` executes as you, even though \`evil.com\` cannot read the response. The classic defences are an **anti-CSRF token** (a secret per-session value the attacker cannot know, required on state-changing requests) and **SameSite** cookies (so the cookie is not sent on cross-site requests at all), plus requiring POST and checking Origin.

**Server-side request forgery** is the mirror image: the *server* is tricked into making a request to an attacker-chosen URL. If an app fetches a URL the user supplies (an image proxy, a webhook, a PDF generator), the attacker points it at \`http://169.254.169.254/\` (the cloud metadata service, which can leak credentials), at internal services behind the firewall, or at \`file://\` URLs. SSRF has become one of the most serious cloud vulnerabilities; it was central to the 2019 Capital One breach. Defences are strict URL **allowlists**, blocking internal address ranges and redirects, and requiring authentication on internal services (defence in depth).

**Broken access control** is the failure to enforce *who may do what*. The most common form is **IDOR**: a request like \`GET /account/1234/statement\` where changing 1234 to another user's id returns their data because the server checks authentication (are you logged in?) but not **authorization** (is this your account?). Others are **missing function-level** checks (an admin endpoint reachable by guessing its URL, "forced browsing") and privilege escalation via tampering with roles in tokens or hidden fields. The rule is absolute: **every request must be authorized on the server**, deny by default, and never rely on the client hiding a button or on an unguessable identifier. You will exploit an IDOR and a forced-browse on authorized labs and then implement server-side checks.`,
          resources: [
            {
              title: 'PortSwigger Web Security Academy — Access control, CSRF and SSRF',
              url: 'https://portswigger.net/web-security/access-control',
              type: 'interactive',
              cost: 'free',
              provider: 'PortSwigger',
              note: 'Free labs for IDOR, forced browsing, CSRF and SSRF (see the CSRF and SSRF topic pages linked from here).',
              primary: true,
            },
            {
              title: 'OWASP Top Ten (A01 Broken Access Control and related)',
              url: 'https://owasp.org/www-project-top-ten/',
              type: 'documentation',
              cost: 'free',
              provider: 'OWASP',
            },
            {
              title: 'OWASP Server Side Request Forgery Prevention Cheat Sheet',
              url: 'https://cheatsheetseries.owasp.org/cheatsheets/Server_Side_Request_Forgery_Prevention_Cheat_Sheet.html',
              type: 'documentation',
              cost: 'free',
              provider: 'OWASP',
            },
            {
              title: 'OWASP Cross-Site Request Forgery Prevention Cheat Sheet',
              url: 'https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html',
              type: 'documentation',
              cost: 'free',
              provider: 'OWASP',
            },
            {
              title: 'OWASP Juice Shop',
              url: 'https://owasp.org/www-project-juice-shop/',
              type: 'tool',
              cost: 'free',
              provider: 'OWASP',
              note: 'Self-hosted authorised target rich in access-control and SSRF challenges.',
            },
          ],
          exercises: [
            {
              slug: 'csrf-poc-and-defence',
              title: 'CSRF proof of concept and defence',
              prompt:
                'On an authorised lab with a state-changing endpoint protected only by a session cookie, build an attacker page that auto-submits a cross-site request performing the action as the victim. Capture evidence it worked. Then add an anti-CSRF token and set the cookie SameSite=Lax; show the attack fails for each defence independently and explain the residual cases SameSite does not cover (e.g. top-level GET navigations).',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'ssrf-to-metadata',
              title: 'SSRF to an internal target',
              prompt:
                'On an authorised lab (PortSwigger SSRF or Juice Shop), exploit a URL-fetching feature to reach an internal-only endpoint or a mock metadata service you run locally at 169.254.169.254, and retrieve data that should be unreachable. Then implement a defence: an allowlist of permitted hosts plus blocking of private/link-local ranges and redirects. Show the exploit fails and a legitimate URL still works.',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'idor-and-authz',
              title: 'Exploit and fix an IDOR',
              prompt:
                'On an authorised lab, find an endpoint that returns a resource by id and access another user\'s resource by changing the id (IDOR). Document the request and the leaked data. Then in a small app of your own, reproduce the IDOR and fix it by enforcing an ownership check on the server for every request. Add a second endpoint reachable by forced browsing and add a function-level authorization check. Explain why client-side hiding was never enough.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does CSRF work even though the attacker cannot read the response?',
              answerOutline:
                'The browser attaches the victim\'s cookies to the cross-site request (ambient authority), so the state-changing action executes as the victim; reading the response is unnecessary for a write.',
            },
            {
              question: 'What makes SSRF especially dangerous in cloud environments?',
              answerOutline:
                'The server can reach internal-only services and the instance metadata endpoint, which may return credentials, enabling escalation from a single request-forging bug to full account compromise.',
            },
            {
              question: 'What distinguishes authentication from authorization, and which does IDOR break?',
              answerOutline:
                'Authentication is who you are; authorization is what you may access. IDOR breaks authorization: the user is authenticated but allowed to access objects that are not theirs.',
            },
            {
              question: 'Why must access control be enforced on every server request?',
              answerOutline:
                'Clients are fully attacker-controlled; hidden buttons, unguessable ids and client checks can all be bypassed, so only server-side checks on each request are trustworthy.',
            },
          ],
        },
      ],
      project: {
        slug: 'web-ctf',
        title: 'A web capture-the-flag run',
        description: `Work through a structured set of web challenges on authorised platforms (OWASP Juice Shop\'s built-in challenge board, the PortSwigger Academy labs, and a picoCTF web category) covering at least injection, XSS, CSRF/SSRF and broken access control. For each solved challenge, write a short report: the vulnerability class and CWE, the exact exploitation steps and payload, the impact, and the remediation. Produce a single annotated write-up as if documenting findings for a client.`,
        deliverables: [
          'Solutions to at least 12 web challenges across the four classes, on authorised targets only',
          'A write-up per challenge: CWE, steps, payload, impact, remediation',
          'A summary table mapping challenges to OWASP Top 10 categories',
        ],
        estimatedHours: 12,
        stretchGoals: [
          'Automate one exploit with a Python script using requests or pwntools',
          'Chain two bugs (e.g. stored XSS to CSRF-token theft to an authorized action) into one exploit',
        ],
      },
    },
    {
      slug: 'network-and-system-security',
      title: 'Network and System Security',
      description:
        'Attacking and defending infrastructure: reconnaissance and scanning, network attacks and defences, operating-system hardening and privilege, and the frameworks attackers and defenders use.',
      lessons: [
        {
          slug: 'reconnaissance-and-scanning',
          title: 'Reconnaissance and scanning',
          summary:
            'The first phase of any assessment: discovering hosts, open ports and services with nmap, understanding what each scan reveals, and doing it only where authorised.',
          estimatedMinutes: 90,
          objectives: [
            'Explain the phases of an attack (recon, scanning, exploitation, post-exploitation) and the ethics and legality of each',
            'Use nmap to discover hosts, ports, services and versions and interpret the results',
            'Explain how different scan types (SYN, connect, UDP) work at the packet level and how they are detected',
            'Perform safe, authorised scanning in a lab and document the attack surface',
          ],
          concepts: [
            'Attack lifecycle; the cyber kill chain / MITRE ATT&CK',
            'Passive vs active reconnaissance; OSINT',
            'Host discovery; TCP SYN/connect scans; UDP scans',
            'Service and version detection; OS fingerprinting',
            'Scan detection and rate limiting; noise',
            'Authorization and rules of engagement; legality',
            'Attack-surface enumeration',
          ],
          explanation: `Every assessment starts by mapping what is there, and this is also where the ethics are most important: scanning hosts you are not authorised to test is unlawful in most jurisdictions and can disrupt services, so do it only against your own lab or explicit scope. With that rule fixed, reconnaissance is the discipline of turning "a network exists" into "these hosts run these services at these versions".

The **attack lifecycle** (reconnaissance, scanning, exploitation, post-exploitation, exfiltration), formalised in the cyber kill chain and in MITRE **ATT&CK**, gives a vocabulary for both offense and detection. **Passive** reconnaissance gathers information without touching the target (public records, DNS, certificate transparency, search engines, **OSINT**); **active** reconnaissance probes directly and is noisier.

**nmap** is the core scanning tool. **Host discovery** finds live hosts (ICMP, ARP on a LAN, TCP probes). **Port scanning** then determines which ports are open: a **TCP connect** scan completes the full handshake (reliable, logged), a **SYN** ("half-open") scan sends SYN and reads SYN-ACK (open) or RST (closed) without completing, which is faster and historically stealthier, and **UDP** scans are slow and ambiguous because closed UDP ports send ICMP unreachable while open ones often stay silent. **Service and version detection** (\`-sV\`) probes open ports to identify the software and version, and **OS fingerprinting** (\`-O\`) guesses the operating system from TCP/IP stack quirks. Understanding the packets behind each scan, which you will watch in Wireshark, tells you both how to scan and how such scans are **detected** (sudden fans of SYNs, many RSTs) and rate-limited by defenders.

The output of this phase is an **attack-surface** map: every reachable service is a potential entry point, and version numbers feed directly into the CVE/CVSS prioritisation from module 1. You will scan an intentionally vulnerable lab (Metasploitable, a local VM) and produce that map.`,
          resources: [
            {
              title: 'Nmap Reference Guide (the nmap book, online)',
              url: 'https://nmap.org/book/',
              type: 'documentation',
              cost: 'free',
              provider: 'Nmap project',
              note: 'The authoritative guide; read the chapters on host discovery, port scanning and version detection.',
              primary: true,
            },
            {
              title: 'MITRE ATT&CK — Reconnaissance and Discovery tactics',
              url: 'https://attack.mitre.org/',
              type: 'documentation',
              cost: 'free',
              provider: 'MITRE',
            },
            {
              title: 'SEED Labs (networking and system labs, self-hosted VMs)',
              url: 'https://seedsecuritylabs.org/Labs_20.04/',
              type: 'problem-set',
              cost: 'free',
              provider: 'Syracuse University',
              note: 'Authorised lab VMs for scanning, spoofing and attack exercises.',
            },
            {
              title: 'Metasploitable 2 documentation (intentionally vulnerable target)',
              url: 'https://docs.rapid7.com/metasploit/metasploitable-2/',
              type: 'tool',
              cost: 'free',
              provider: 'Rapid7',
              note: 'A deliberately vulnerable VM to scan and exploit in an isolated network only.',
            },
          ],
          exercises: [
            {
              slug: 'scan-a-lab',
              title: 'Map a lab network',
              prompt:
                'In an isolated lab (Metasploitable or your own VMs; never the public Internet), use nmap to discover live hosts, scan the full TCP port range, detect service versions and guess the OS. Produce an attack-surface table: host, port, service, version. Cross-reference three versions against the NVD and note any known CVEs. Capture one scan in Wireshark and identify the SYN/SYN-ACK/RST pattern.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'scan-types-packets',
              title: 'Compare scan types at the packet level',
              prompt:
                'Against a lab host, run a TCP connect scan, a SYN scan and a UDP scan of the same ports while capturing with tcpdump. For each, describe the exact packets sent and received for an open, a closed and a filtered port, and explain how nmap classifies each. Explain which scan a simple log-based detector would catch most easily and why.',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'recon-writeup',
              title: 'Passive recon and ethics',
              prompt:
                'For a domain you own (or a permitted test domain), gather passive reconnaissance only: DNS records, subdomains from certificate transparency logs, and public metadata. Produce a short report of the externally visible attack surface. Then write one page on the legal and ethical boundaries of scanning, citing the rules-of-engagement concept and the difference between passive and active recon.',
              kind: 'writing',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'What is the difference between passive and active reconnaissance?',
              answerOutline:
                'Passive gathers information without interacting with the target (OSINT, DNS, CT logs); active sends probes to the target (scans), which is more informative but noisier and requires authorization.',
            },
            {
              question: 'How does a SYN scan determine a port is open without completing a connection?',
              answerOutline:
                'It sends a SYN; a SYN-ACK means open (nmap then sends RST to tear down), a RST means closed, and no reply (or ICMP unreachable) means filtered.',
            },
            {
              question: 'Why are UDP scans slow and ambiguous?',
              answerOutline:
                'Closed UDP ports return ICMP port-unreachable (rate-limited), while open ports often send nothing, so nmap must wait and retransmit and cannot always distinguish open from filtered.',
            },
            {
              question: 'Why is authorization the first requirement before any scanning?',
              answerOutline:
                'Active scanning is intrusive and in most jurisdictions unlawful without permission; a rules-of-engagement document defines scope, timing and limits.',
            },
          ],
        },
        {
          slug: 'network-attacks-and-defences',
          title: 'Network attacks and defences',
          summary:
            'Attacks on the shared network, ARP spoofing and MITM, DNS spoofing, DoS/DDoS, and the defences: segmentation, firewalls, IDS/IPS and encryption.',
          estimatedMinutes: 110,
          objectives: [
            'Explain and demonstrate ARP spoofing to achieve a man-in-the-middle position on a lab LAN',
            'Explain DNS spoofing and how DNSSEC and encrypted DNS mitigate it',
            'Explain denial-of-service and amplification attacks and their mitigations',
            'Describe layered network defences: segmentation, firewalls, IDS/IPS and why encryption raises the bar',
          ],
          concepts: [
            'ARP spoofing and LAN man-in-the-middle',
            'DNS spoofing/cache poisoning; DNSSEC, DoT/DoH',
            'TLS as the end-to-end defence against on-path attackers',
            'DoS and DDoS; reflection/amplification',
            'Network segmentation and zero trust',
            'Firewalls (stateful) and IDS/IPS (Snort, Suricata, Zeek)',
            'Detection vs prevention; signatures vs anomalies',
          ],
          explanation: `A shared network is a shared trust problem. On a LAN, **ARP has no authentication**, so an attacker can send forged ARP replies claiming the gateway's IP maps to the attacker's MAC; victims then send their traffic to the attacker, who forwards it on (a **man-in-the-middle**) and can read or modify anything not end-to-end encrypted. This is trivial to demonstrate in a lab and is the clearest illustration of why **TLS matters**: with ARP spoofing in place, HTTP is fully readable but HTTPS shows only encrypted bytes and a certificate the attacker cannot forge. **DNS spoofing** is the analogous attack on name resolution, forging a response (or poisoning a resolver's cache) to send a victim to the attacker's server; **DNSSEC** signs records to detect forgery and **DoT/DoH** encrypt the query so an on-path attacker cannot see or alter it.

**Denial of service** attacks exhaust a resource rather than steal data: bandwidth, connection tables (SYN floods, from the Networks subject), CPU, or application work. **Distributed** DoS uses many hosts, often via **reflection and amplification**, sending small spoofed requests to open servers (DNS, NTP, memcached) that reply with large responses aimed at the victim, multiplying the attacker's bandwidth many-fold. Defences are rate limiting, closing open reflectors, ingress filtering to stop spoofing, and absorbing the flood across large anycast scrubbing networks.

Defence is layered. **Segmentation** divides the network so a compromise in one zone does not reach others, and **zero trust** goes further by authenticating every request rather than trusting the network location. **Stateful firewalls** enforce which flows are allowed. **Intrusion detection and prevention systems** (Snort, Suricata, Zeek) inspect traffic for known-bad **signatures** or statistical **anomalies** and alert (IDS) or block (IPS); their blind spot is encrypted traffic, which is the trade-off encryption brings. You will perform ARP and DNS spoofing in an isolated SEED-lab network, observe the MITM, and then show that TLS and a Suricata rule each defeat or detect it.`,
          resources: [
            {
              title: 'SEED Labs — ARP spoofing, DNS and MITM labs',
              url: 'https://seedsecuritylabs.org/Labs_20.04/Networking/',
              type: 'problem-set',
              cost: 'free',
              provider: 'Syracuse University',
              note: 'Self-contained VM labs for ARP spoofing, DNS attacks and TCP attacks. Authorised targets only.',
              primary: true,
            },
            {
              title: 'Suricata documentation (IDS/IPS)',
              url: 'https://suricata.io/',
              type: 'documentation',
              cost: 'free',
              provider: 'OISF',
            },
            {
              title: 'Cloudflare Learning — What is a DDoS attack?',
              url: 'https://www.cloudflare.com/learning/ddos/what-is-a-ddos-attack/',
              type: 'article',
              cost: 'free',
              provider: 'Cloudflare',
            },
            {
              title: 'Zeek (network security monitor)',
              url: 'https://zeek.org/',
              type: 'tool',
              cost: 'free',
              provider: 'Zeek project',
            },
          ],
          exercises: [
            {
              slug: 'arp-mitm-lab',
              title: 'ARP spoofing man-in-the-middle',
              prompt:
                'In an isolated SEED lab (three VMs: victim, gateway, attacker), use ARP spoofing to place the attacker between the victim and gateway. Demonstrate reading the victim\'s plaintext HTTP traffic and show that HTTPS traffic is unreadable. Capture the forged ARP replies. Then enable dynamic ARP inspection or static ARP entries and show the attack fails. Never run this outside the isolated lab.',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'dns-spoof-and-dnssec',
              title: 'DNS spoofing and its mitigation',
              prompt:
                'In the lab, with the MITM position from the previous exercise, forge a DNS response to redirect a victim lookup to an attacker IP. Show the victim reaching the wrong host. Then demonstrate that a DNSSEC-validating resolver rejects the forged record, and that DoH hides the query from the on-path attacker entirely. Explain what each mitigation does and does not protect.',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'ids-rule',
              title: 'Write an IDS rule to detect an attack',
              prompt:
                'Install Suricata (or Snort) in the lab and write a rule that detects your ARP-spoofing or port-scanning activity (e.g. excessive ARP replies, or a SYN scan signature). Run the attack and show the alert firing, including the matched fields. Discuss the false-positive risk of your rule and how encryption limits signature-based detection of payload attacks.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does ARP spoofing work, and what end-to-end mechanism defeats its goal of reading traffic?',
              answerOutline:
                'ARP replies are unauthenticated, so forged ones redirect LAN traffic to the attacker. TLS end-to-end encryption means the on-path attacker sees only ciphertext and cannot forge the server certificate.',
            },
            {
              question: 'How does an amplification DDoS multiply the attacker\'s bandwidth?',
              answerOutline:
                'Small spoofed requests to open servers (DNS/NTP/memcached) elicit much larger responses sent to the victim; the amplification factor is the response/request size ratio.',
            },
            {
              question: 'What is the trade-off IDS/IPS faces with encrypted traffic?',
              answerOutline:
                'Encryption protects confidentiality but hides payloads from signature inspection, so detection must rely on metadata, endpoints or TLS interception (which has its own risks).',
            },
            {
              question: 'What does network segmentation achieve against an attacker?',
              answerOutline:
                'It contains a breach to one zone, limiting lateral movement so a single compromise does not expose the whole network.',
            },
          ],
        },
        {
          slug: 'os-hardening-and-privilege',
          title: 'Operating-system hardening and privilege escalation',
          summary:
            'Defending the host: least privilege, the Unix permission and capability model, sandboxing with namespaces and seccomp, and the privilege-escalation paths attackers use.',
          estimatedMinutes: 110,
          objectives: [
            'Apply least privilege using Unix permissions, setuid, and Linux capabilities',
            'Explain common privilege-escalation vectors (setuid bugs, writable paths, sudo misconfig, kernel exploits)',
            'Sandbox a process with namespaces, cgroups and seccomp and explain what each isolates',
            'Explain mandatory access control (SELinux/AppArmor) and container-vs-VM isolation trade-offs',
          ],
          concepts: [
            'Least privilege; principle of least authority',
            'Unix users/groups/permissions; setuid/setgid; sudo',
            'Linux capabilities (fine-grained root)',
            'Privilege escalation: SUID binaries, PATH/writable files, sudo rules, kernel bugs',
            'Namespaces, cgroups, seccomp-bpf (sandboxing, containers)',
            'Mandatory access control: SELinux, AppArmor',
            'Containers vs VMs; the host kernel as shared TCB',
          ],
          explanation: `Once an attacker has a foothold, their next goal is usually **privilege escalation**: turning a low-privilege account into root or another user. Defending the host is the discipline of **least privilege**, giving every process and user the minimum authority needed, so that a compromise yields little and cannot spread.

The Unix model starts with users, groups and **permission** bits (rwx for owner/group/other). **setuid** binaries run with the file owner's privileges regardless of who runs them, which is how \`passwd\` can edit \`/etc/shadow\`; it is also the source of countless escalations, because a bug in a setuid-root binary gives the attacker root. **Linux capabilities** break "root" into fine-grained privileges (CAP_NET_BIND_SERVICE, CAP_SYS_ADMIN, ...) so a program can be given just the one it needs instead of all-powerful root. **sudo** grants specific commands to specific users, and misconfigured sudo rules (allowing an editor, an interpreter, or a wildcard) are a classic escalation path. The common privilege-escalation vectors you will learn to find and fix are: exploitable **SUID** binaries, writable files or directories in a privileged **PATH**, over-broad **sudo** rules, world-writable scripts run by root (cron), and ultimately **kernel** exploits, since a bug in the kernel defeats all user-space isolation.

**Sandboxing** confines a process even if it is compromised. Linux **namespaces** give a process its own view of PIDs, mounts, networking, users and so on; **cgroups** limit its resources; and **seccomp-bpf** restricts which system calls it may make, shrinking the kernel attack surface. Together these are the mechanism behind **containers**. **Mandatory access control** (SELinux, AppArmor) enforces policy that even root cannot override, confining services to exactly the files and actions they need.

A crucial caveat ties it together: **containers share the host kernel**, so a kernel exploit escapes them, whereas **virtual machines** emulate hardware and isolate more strongly at higher cost. Choosing between them is a threat-model decision about how much you trust the workload. You will audit a system's SUID binaries and sudo rules, exploit a deliberately misconfigured escalation in a lab, and then sandbox a process with seccomp.`,
          resources: [
            {
              title: 'Linux capabilities(7) man page',
              url: 'https://man7.org/linux/man-pages/man7/capabilities.7.html',
              type: 'documentation',
              cost: 'free',
              provider: 'man7.org',
              note: 'The fine-grained privilege model that should replace blanket root.',
              primary: true,
            },
            {
              title: 'seccomp BPF — Linux kernel documentation',
              url: 'https://docs.kernel.org/userspace-api/seccomp_filter.html',
              type: 'documentation',
              cost: 'free',
              provider: 'kernel.org',
            },
            {
              title: 'SEED Labs — System and software security (privilege, setuid, containers)',
              url: 'https://seedsecuritylabs.org/Labs_20.04/System/',
              type: 'problem-set',
              cost: 'free',
              provider: 'Syracuse University',
            },
            {
              title: 'Docker security documentation',
              url: 'https://docs.docker.com/engine/security/',
              type: 'documentation',
              cost: 'free',
              provider: 'Docker',
              note: 'How namespaces, cgroups, capabilities and seccomp combine, and container isolation limits.',
            },
          ],
          exercises: [
            {
              slug: 'suid-and-sudo-audit',
              title: 'Audit privilege on a host',
              prompt:
                'On a Linux VM, enumerate all setuid/setgid binaries (find / -perm -4000) and the sudo rules (sudo -l where permitted). For five SUID binaries explain why they are privileged and search for a historical CVE. Identify any world-writable files in root-run paths. Produce a hardening report recommending capability-based replacements or removal where possible.',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'privesc-lab',
              title: 'Exploit and fix a privilege escalation',
              prompt:
                'In a lab VM with a deliberately misconfigured escalation (a sudo rule allowing a shell-spawning program, a writable PATH directory used by a root cron, or a vulnerable SUID binary), escalate from a low-privilege user to root and document each step. Then remediate the misconfiguration and confirm the escalation no longer works. Keep this strictly within the lab VM.',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'seccomp-sandbox',
              title: 'Sandbox a program with seccomp',
              prompt:
                'Write a C or Python wrapper that installs a seccomp-bpf filter allowing only a minimal set of syscalls (read, write, exit, and what the target needs) and then execs a given program. Show that a benign program works but an attempt to open a file or a socket is killed. Combine it with a new network and mount namespace and describe what each layer isolates. Explain how this shrinks the kernel attack surface.',
              kind: 'coding',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'Why are setuid-root binaries a recurring source of privilege escalation?',
              answerOutline:
                'They run with root authority regardless of caller; any bug (memory corruption, injection, unsafe environment handling) in one yields root. Capabilities and minimizing SUID reduce the risk.',
            },
            {
              question: 'What do namespaces, cgroups and seccomp each contribute to a sandbox?',
              answerOutline:
                'Namespaces isolate the process\'s view of resources (PIDs, mounts, network, users); cgroups limit resource usage; seccomp restricts the syscalls it may make, shrinking the kernel attack surface.',
            },
            {
              question: 'Why is a container weaker isolation than a VM?',
              answerOutline:
                'Containers share the host kernel (one shared TCB), so a kernel exploit escapes them; VMs emulate hardware with a hypervisor boundary, isolating more strongly at higher cost.',
            },
            {
              question: 'What does mandatory access control add over Unix permissions?',
              answerOutline:
                'Policy enforced by the kernel that even root cannot override, confining each program to a least-privilege profile regardless of file ownership.',
            },
          ],
          relatedLessons: ['operating-systems/beyond-the-kernel/protection-and-security'],
        },
      ],
    },
    {
      slug: 'authentication-and-access-control',
      title: 'Authentication and Access Control',
      description:
        'Proving who you are and controlling what you may do: password and credential storage, multi-factor and passwordless authentication, sessions and tokens (OAuth, JWT), and access-control models.',
      lessons: [
        {
          slug: 'passwords-and-credential-storage',
          title: 'Passwords and credential storage',
          summary:
            'Doing passwords right: entropy and policy, slow salted hashing, breach-resistance, and defending the login against guessing.',
          estimatedMinutes: 90,
          objectives: [
            'Store credentials correctly with a modern password hash (Argon2/bcrypt/scrypt) and salts',
            'Reason about password entropy and evaluate password policies against current guidance',
            'Defend login against online and offline guessing (rate limiting, lockout, breach checks)',
            'Explain credential-stuffing and the role of breach corpora and MFA',
          ],
          concepts: [
            'Password entropy; human vs random passwords',
            'NIST SP 800-63B guidance (length over composition rules)',
            'Salted, slow hashing (Argon2id); peppering',
            'Online guessing: rate limiting, lockout, CAPTCHA trade-offs',
            'Offline guessing after breach; work factor',
            'Credential stuffing and breach-corpus checks (k-anonymity API)',
            'Account recovery as the weakest link',
          ],
          explanation: `Passwords remain the default authenticator, and getting them right is a concentration of this subject's lessons. First, **storage**: never store passwords, store a **slow, salted hash** (Argon2id is the current recommendation; bcrypt and scrypt are acceptable), as covered in the cryptography module. A unique **salt** per user defeats precomputation and hides equal passwords; the deliberately high **work factor** caps how fast a thief of the database can guess. Some systems add a **pepper**, a secret not stored in the database, so a database-only breach is not enough.

Second, **policy**. Current NIST guidance (SP 800-63B) overturned decades of bad advice: favour **length** over arbitrary composition rules, do not force periodic rotation (it leads to weaker, predictable passwords), do not use knowledge-based questions, and instead screen new passwords against **breach corpora** and known-weak lists. The reasoning is **entropy**: a human-chosen "P@ssw0rd!" has far less real entropy than its character classes suggest, while a long passphrase has more, so length and screening beat complexity rules.

Third, **defending the login**. **Online** guessing (trying passwords against the live service) is countered by **rate limiting**, progressive delays, and lockout, balanced against denial-of-service and usability (locking out a legitimate user). **Offline** guessing follows a breach and is countered only by the hash's work factor and the password's strength, which is why storage and policy matter even when you think the database is safe. **Credential stuffing**, replaying username/password pairs leaked from other sites, is now the dominant attack and is why you should check credentials against breach corpora (using a k-anonymity API that never sends the full hash) and why **multi-factor authentication** (next lesson) is the real fix.

Finally, remember that **account recovery is often the weakest link**: an attacker who cannot guess the password attacks the "forgot password" flow, so it must be as strong as the login itself. You will implement correct storage, measure work factors, and build rate limiting, then attack a weak login to see why each control matters.`,
          resources: [
            {
              title: 'NIST SP 800-63B — Digital Identity Guidelines (Authentication)',
              url: 'https://pages.nist.gov/800-63-4/sp800-63b.html',
              type: 'documentation',
              cost: 'free',
              provider: 'NIST',
              note: 'The authoritative modern guidance on password policy and authenticator strength.',
              primary: true,
            },
            {
              title: 'OWASP Password Storage Cheat Sheet',
              url: 'https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html',
              type: 'documentation',
              cost: 'free',
              provider: 'OWASP',
            },
            {
              title: 'Have I Been Pwned — Pwned Passwords (k-anonymity API)',
              url: 'https://haveibeenpwned.com/Passwords',
              type: 'tool',
              cost: 'free',
              provider: 'Troy Hunt',
              note: 'Check passwords against breach corpora without sending the full hash.',
            },
            {
              title: 'OWASP Forgot Password Cheat Sheet',
              url: 'https://cheatsheetseries.owasp.org/cheatsheets/Forgot_Password_Cheat_Sheet.html',
              type: 'documentation',
              cost: 'free',
              provider: 'OWASP',
            },
          ],
          exercises: [
            {
              slug: 'correct-credential-store',
              title: 'Build a correct credential store',
              prompt:
                'Implement user registration and login storing Argon2id hashes with per-user salts. Expose the work-factor parameters and measure verification time; tune them to a target of about 250 ms on your hardware and report the parameters. Integrate the Have I Been Pwned k-anonymity API to reject breached passwords at registration, and verify a known-breached password is refused while a strong unique one is accepted.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'rate-limit-and-attack',
              title: 'Attack and then defend a login',
              prompt:
                'Build a login endpoint with no protection and script an online dictionary attack against an account you created; measure guesses per second and time to crack a weak password. Then add per-account and per-IP rate limiting with exponential backoff and a breach check; rerun the attack and show it is throttled. Discuss the denial-of-service risk of account lockout and how you balanced it.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'policy-critique',
              title: 'Critique a password policy',
              prompt:
                'Find a real-world password policy (a bank, a university, your employer if permitted) and critique it against NIST SP 800-63B: length vs composition rules, rotation, blocklisting, MFA. Identify three ways it is weaker or more user-hostile than current guidance and propose a revised policy with justification.',
              kind: 'writing',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does modern guidance favour length over composition rules and drop forced rotation?',
              answerOutline:
                'Composition rules add little real entropy and push users to predictable patterns; length and breach-screening add more. Forced rotation yields weaker, incremental passwords without security benefit.',
            },
            {
              question: 'What is the difference between online and offline guessing and the defence against each?',
              answerOutline:
                'Online: guesses against the live service, countered by rate limiting/lockout. Offline: guesses against a stolen hash database, countered only by the slow-hash work factor and password strength.',
            },
            {
              question: 'What is credential stuffing and why does MFA defeat it?',
              answerOutline:
                'Replaying credentials leaked from other breaches; MFA requires a second factor the attacker does not have, so a correct password alone is insufficient.',
            },
            {
              question: 'Why is account recovery a critical part of authentication security?',
              answerOutline:
                'If recovery is weaker than login (guessable security questions, email takeover), the attacker simply resets the password; recovery must be as strong as the primary path.',
            },
          ],
        },
        {
          slug: 'mfa-and-passwordless',
          title: 'Multi-factor and passwordless authentication',
          summary:
            'Beyond passwords: the factor categories, TOTP and its phishing weakness, and how WebAuthn/passkeys provide phishing-resistant public-key authentication.',
          estimatedMinutes: 90,
          objectives: [
            'Classify authentication factors (knowledge, possession, inherence) and explain what MFA adds',
            'Explain TOTP (RFC 6238) and why SMS and TOTP are phishable',
            'Explain WebAuthn/FIDO2 public-key authentication and why it is phishing-resistant',
            'Reason about the usability-security trade-offs of each method',
          ],
          concepts: [
            'Factors: something you know/have/are',
            'TOTP: shared secret + time (RFC 6238); HOTP',
            'SMS OTP weaknesses (SIM swap, interception)',
            'Phishing and real-time relay of OTPs',
            'WebAuthn/FIDO2: per-origin key pairs, challenge-response',
            'Passkeys; attestation; platform vs roaming authenticators',
            'Recovery and account binding',
          ],
          explanation: `A single factor fails in predictable ways, so **multi-factor authentication** combines categories: **something you know** (password), **something you have** (a phone, a security key), **something you are** (biometric). The point is independence: an attacker who phishes your password still lacks the second factor. But not all second factors are equal, and the difference is the key lesson of this topic.

**TOTP** (RFC 6238) is the familiar six-digit code from an authenticator app: the server and the app share a secret at enrolment, and both compute \`HOTP(secret, floor(time / 30s))\` to derive a code that changes every 30 seconds. It is far better than a password alone and needs no connectivity. But it is **phishable**: a fake login page can ask for the code and relay it to the real site in real time, because the code is just a string the user types. **SMS** one-time codes are weaker still, vulnerable to SIM-swap and interception.

The modern answer is **WebAuthn/FIDO2** (passkeys). The authenticator (a phone's secure element, or a hardware key like a YubiKey) generates a **key pair per origin**; the private key never leaves the device. To log in, the server sends a random **challenge**, the authenticator signs it (gated by a biometric or PIN), and the server verifies the signature against the stored public key. This is **phishing-resistant** because the signature is bound to the real origin: a fake site at \`evil.com\` cannot obtain a signature valid for \`bank.com\`, since the authenticator refuses to sign for the wrong origin, and there is no code to relay. **Passkeys** are WebAuthn credentials synced across a user's devices for usability. **Attestation** optionally proves what kind of authenticator was used.

The trade-offs are real: hardware keys are the strongest but cost money and can be lost (so recovery must be designed carefully); passkeys balance security and usability; TOTP is a reasonable baseline; SMS should be avoided where possible. You will implement TOTP, demonstrate a relay/phishing against it, and then register and authenticate with WebAuthn to see the phishing resistance directly.`,
          resources: [
            {
              title: 'WebAuthn Guide',
              url: 'https://webauthn.guide/',
              type: 'article',
              cost: 'free',
              provider: 'Duo',
              note: 'Clear explanation of the registration and authentication ceremonies.',
              primary: true,
            },
            {
              title: 'RFC 6238 — TOTP: Time-Based One-Time Password Algorithm',
              url: 'https://www.rfc-editor.org/rfc/rfc6238',
              type: 'documentation',
              cost: 'free',
              provider: 'IETF',
            },
            {
              title: 'passkeys.dev — developer guidance for WebAuthn/passkeys',
              url: 'https://passkeys.dev/',
              type: 'documentation',
              cost: 'free',
              provider: 'FIDO Alliance / W3C community',
            },
            {
              title: 'OWASP Multifactor Authentication Cheat Sheet',
              url: 'https://cheatsheetseries.owasp.org/cheatsheets/Multifactor_Authentication_Cheat_Sheet.html',
              type: 'documentation',
              cost: 'free',
              provider: 'OWASP',
            },
          ],
          exercises: [
            {
              slug: 'implement-totp',
              title: 'Implement TOTP from the RFC',
              prompt:
                'Implement TOTP (RFC 6238) from scratch: HMAC-SHA1 over the time counter, dynamic truncation to a 6-digit code, with a 30-second step. Verify your codes against a standard authenticator app enrolled with the same base32 secret. Handle clock skew by accepting the adjacent time windows. Explain the security consequence of the skew window size.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'phish-the-otp',
              title: 'Demonstrate OTP phishing (lab)',
              prompt:
                'In a local lab, build a simple proxy phishing page that captures a username, password and TOTP code and relays them to a local "real" service in real time, logging in as the victim. Show that TOTP did not stop it. Then write an analysis of why WebAuthn would have, referencing the origin binding of the signature. Keep this entirely within your own lab services.',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'webauthn-flow',
              title: 'Register and authenticate with WebAuthn',
              prompt:
                'Using a WebAuthn library and a platform authenticator or security key, implement registration (store the credential public key) and authentication (verify a signed challenge) for a small app. Capture the ceremony data. Then attempt to use the credential from a different origin (e.g. a different port counts as a different origin) and show it fails, demonstrating phishing resistance.',
              kind: 'coding',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'What are the three authentication factor categories and why combine them?',
              answerOutline:
                'Knowledge (password), possession (device/key), inherence (biometric). Combining independent categories means compromising one factor is insufficient.',
            },
            {
              question: 'Why is TOTP phishable while WebAuthn is not?',
              answerOutline:
                'A TOTP code is a string the user can be tricked into entering on a fake site and relayed; WebAuthn signs a challenge bound to the real origin, so a signature for the wrong origin is never produced.',
            },
            {
              question: 'How does a WebAuthn authentication ceremony prove possession without revealing a secret?',
              answerOutline:
                'The server sends a random challenge; the authenticator signs it with the origin-bound private key (never transmitted) and the server verifies with the stored public key.',
            },
            {
              question: 'Why is SMS a weak second factor?',
              answerOutline:
                'It is vulnerable to SIM-swap, SS7 interception and phishing/relay; the code is a transferable string not bound to the origin.',
            },
          ],
        },
        {
          slug: 'sessions-tokens-oauth-and-jwt',
          title: 'Sessions, tokens, OAuth and JWT',
          summary:
            'Maintaining identity after login: session cookies versus bearer tokens, how OAuth 2.0 delegates access, OpenID Connect for login, and the pitfalls of JWTs.',
          estimatedMinutes: 110,
          objectives: [
            'Contrast server-side sessions with stateless bearer tokens and their security trade-offs',
            'Explain the OAuth 2.0 authorization-code flow with PKCE and what each party holds',
            'Explain JWT structure and the common vulnerabilities (alg=none, weak keys, missing validation)',
            'Distinguish authentication (OpenID Connect) from authorization (OAuth) and avoid conflating them',
          ],
          concepts: [
            'Session cookies vs bearer tokens; where state lives',
            'Token theft, replay, scoping and revocation',
            'OAuth 2.0 roles; authorization-code flow; PKCE',
            'Access tokens vs refresh tokens; scopes',
            'OpenID Connect (ID token) for authentication',
            'JWT: header.payload.signature; alg confusion, none, key confusion',
            'Token validation: signature, issuer, audience, expiry',
          ],
          explanation: `After login the system must remember you, and there are two models. A **server-side session** stores state on the server and gives the browser an opaque **session cookie**; the server can revoke it instantly and the client holds no secrets, but it needs shared session storage to scale. A **bearer token** (often a JWT) is **stateless**: the token itself carries the claims and is verified by signature, so any server can validate it without shared storage, but it cannot be revoked before expiry and anyone holding it (bearer) can use it, so token theft is serious and tokens must be short-lived and transmitted only over TLS.

**OAuth 2.0** is not a login protocol; it is a **delegated authorization** framework: it lets a user grant one application limited access to their data at another without sharing a password. In the recommended **authorization-code flow with PKCE**, the app redirects the user to the authorization server, the user consents, the server returns a one-time **code**, and the app exchanges the code (plus a PKCE verifier that prevents interception) for an **access token** scoped to specific permissions, with an optional **refresh token** to get new ones. **OpenID Connect** layers **authentication** on top of OAuth by adding an **ID token** (a JWT about who the user is), and the single most common OAuth mistake is using a raw access token as proof of identity, which it is not.

**JWTs** are the usual token format: base64url \`header.payload.signature\`, where the signature covers the first two parts. Their history is a catalogue of validation failures you must know: accepting \`alg: none\` (unsigned tokens treated as valid), **algorithm confusion** (tricking a server that expects RS256 into verifying an HS256 token using the public key as the HMAC secret), weak or shared signing keys, and, above all, failing to validate the **issuer**, **audience** and **expiry** claims. The defensive rule is to pin the expected algorithm, verify the signature with the correct key, and check every claim. You will implement a session and a JWT flow, then exploit a deliberately mis-validated JWT on an authorised lab.`,
          resources: [
            {
              title: 'The OAuth 2.0 and OpenID Connect guide (oauth.com)',
              url: 'https://www.oauth.com/',
              type: 'documentation',
              cost: 'free',
              provider: 'Okta / Aaron Parecki',
              note: 'Readable walkthrough of the flows, PKCE, tokens and common mistakes.',
              primary: true,
            },
            {
              title: 'PortSwigger Web Security Academy — JWT attacks',
              url: 'https://portswigger.net/web-security/jwt',
              type: 'interactive',
              cost: 'free',
              provider: 'PortSwigger',
              note: 'Free labs for alg=none, weak keys and algorithm confusion.',
            },
            {
              title: 'RFC 8725 — JSON Web Token Best Current Practices',
              url: 'https://www.rfc-editor.org/rfc/rfc8725',
              type: 'documentation',
              cost: 'free',
              provider: 'IETF',
            },
            {
              title: 'OWASP Session Management Cheat Sheet',
              url: 'https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html',
              type: 'documentation',
              cost: 'free',
              provider: 'OWASP',
            },
          ],
          exercises: [
            {
              slug: 'session-vs-token',
              title: 'Build both session and token auth',
              prompt:
                'Implement two versions of login for the same small API: one with opaque server-side session cookies (HttpOnly, Secure, SameSite), and one with signed JWT bearer tokens including exp, iss and aud. Demonstrate instant revocation in the session version and show why the JWT cannot be revoked before expiry. Add short-lived access tokens plus a refresh token to the JWT version and explain the trade-off.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'jwt-attacks',
              title: 'Exploit JWT validation failures',
              prompt:
                'On the PortSwigger JWT labs, exploit: (1) a server that accepts alg=none; (2) a server using a weak HMAC secret you crack with a wordlist; (3) an algorithm-confusion attack using a leaked public key as the HMAC key. For each, forge a token elevating your privileges and explain the exact validation step that was missing. Then write the correct validation (pinned alg, verified signature, checked iss/aud/exp).',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'oauth-flow-trace',
              title: 'Trace an OAuth authorization-code flow',
              prompt:
                'Register an app with a public OAuth provider (or run a local one) and implement the authorization-code flow with PKCE. Capture every redirect and request, and annotate what each party sends and holds: the code, the PKCE challenge/verifier, the token exchange, the scopes. Then explain, with reference to your capture, why using the access token as proof of the user\'s identity (instead of an OIDC ID token) is a vulnerability.',
              kind: 'data-analysis',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What is the main security trade-off between server-side sessions and stateless JWTs?',
              answerOutline:
                'Sessions can be revoked instantly and hold no client secret but need shared storage; JWTs scale statelessly but cannot be revoked before expiry and are usable by anyone who steals them.',
            },
            {
              question: 'What problem does PKCE solve in the OAuth authorization-code flow?',
              answerOutline:
                'It prevents an attacker who intercepts the authorization code from exchanging it, by binding the exchange to a secret verifier the attacker does not have.',
            },
            {
              question: 'Name three JWT vulnerabilities and the validation that prevents each.',
              answerOutline:
                'alg=none (pin expected algorithm), weak/shared HMAC key (strong keys, verify signature), algorithm confusion RS256↔HS256 (reject unexpected alg); plus always check iss, aud, exp.',
            },
            {
              question: 'Why is OAuth not an authentication protocol, and what adds authentication?',
              answerOutline:
                'OAuth delegates authorization (access to resources); an access token says nothing verifiable about identity. OpenID Connect adds an ID token asserting who the user is.',
            },
          ],
        },
        {
          slug: 'access-control-models',
          title: 'Access-control models',
          summary:
            'Formalising who may do what: discretionary, mandatory, role-based and attribute-based access control, and designing authorization that is complete and auditable.',
          estimatedMinutes: 90,
          objectives: [
            'Distinguish DAC, MAC, RBAC and ABAC and give a use case for each',
            'Design an RBAC scheme for an application and identify its limits',
            'Explain complete mediation, least privilege and separation of duty as design principles',
            'Avoid the common authorization bugs (missing checks, confused deputy, privilege creep)',
          ],
          concepts: [
            'Subjects, objects, permissions; the access-control matrix',
            'Discretionary (DAC) vs mandatory (MAC) access control',
            'Role-based access control (RBAC); roles, hierarchies',
            'Attribute-based access control (ABAC) and policy engines',
            'Complete mediation; least privilege; separation of duty',
            'Confused deputy; capability vs ACL',
            'Privilege creep and access reviews',
          ],
          explanation: `Authentication establishes who you are; **access control** (authorization) decides what you may do, and designing it well is what keeps a breach of one account from becoming a breach of everything. The abstract model is the **access-control matrix**: subjects (users, processes) in rows, objects (files, records, endpoints) in columns, permissions in the cells. Real systems implement slices of this matrix in different ways.

**Discretionary access control** (DAC) lets the owner of an object grant access at their discretion; Unix file permissions are DAC. It is flexible but hard to reason about globally and prone to accidental over-sharing. **Mandatory access control** (MAC) enforces a system-wide policy that users cannot override (SELinux, military classification: a Secret document cannot be read by an Unclassified subject regardless of owner wishes). **Role-based access control** (RBAC) assigns permissions to **roles** and roles to users, which matches how organisations actually think ("editors may publish") and scales far better than per-user grants; most web applications should use RBAC, possibly with role hierarchies. **Attribute-based access control** (ABAC) decides from attributes of the subject, object, action and environment evaluated by a policy engine ("a manager may approve expenses under 1000 in their own department during business hours"), which is the most expressive and the hardest to audit.

Three design principles govern all of them. **Complete mediation**: every access to every object is checked, with no cached "already allowed" shortcuts and no unguarded back doors, which is the server-side-enforcement rule from the web module stated generally. **Least privilege**: grant the minimum needed, and no more, so damage from compromise or error is bounded. **Separation of duty**: split sensitive operations so no single subject can complete a fraud alone (the person who creates a payment is not the one who approves it). The recurring bugs are the **confused deputy** (a privileged component tricked into using its authority on the attacker's behalf, which capabilities mitigate by making authority unforgeable and explicit), **missing function-level checks**, and **privilege creep**, where users accumulate access over time, countered by periodic **access reviews**. You will design and implement an RBAC scheme, then extend it to ABAC and reason about auditability.`,
          resources: [
            {
              title: 'OWASP Authorization Cheat Sheet',
              url: 'https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html',
              type: 'documentation',
              cost: 'free',
              provider: 'OWASP',
              primary: true,
            },
            {
              title: 'NIST SP 800-162 / ABAC guidance via NIST ABAC resources',
              url: 'https://csrc.nist.gov/pubs/sp/800/207/final',
              type: 'documentation',
              cost: 'free',
              provider: 'NIST',
              note: 'Zero Trust Architecture (SP 800-207) frames modern per-request authorization and attribute-based decisions.',
            },
            {
              title: 'Security Engineering (Ross Anderson) — access control chapter',
              url: 'https://www.cl.cam.ac.uk/~rja14/book.html',
              type: 'textbook',
              cost: 'freemium',
              provider: 'Cambridge / Ross Anderson',
              note: 'The access-control chapter covers DAC/MAC/RBAC, the confused deputy and real-world failures.',
            },
          ],
          exercises: [
            {
              slug: 'design-rbac',
              title: 'Design and implement RBAC',
              prompt:
                'For a described application (a blog with readers, authors, editors and admins), design an RBAC scheme: list roles, permissions and the role-permission mapping, and note any role hierarchy. Implement authorization middleware that enforces it server-side on every endpoint, and write tests that confirm each role can do exactly what it should and nothing more. Then identify one requirement RBAC alone handles poorly and explain why.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'abac-policy',
              title: 'Extend to attribute-based rules',
              prompt:
                'Add an ABAC rule to your app that RBAC cannot express cleanly, e.g. "an author may edit only their own posts" or "approvals over a threshold require a manager in the same department". Implement it as a policy check and write tests. Then write a short analysis of why ABAC is harder to audit than RBAC and how you would make your policies reviewable.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'principles-audit',
              title: 'Audit against the principles',
              prompt:
                'Take an application (yours or an open-source one) and audit its authorization against complete mediation, least privilege and separation of duty. Find at least one endpoint lacking a server-side check, one role or account with more privilege than it needs, and one sensitive operation that one subject can complete alone. Propose fixes and explain the confused-deputy risk in one of the cases.',
              kind: 'writing',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What is the difference between DAC and MAC?',
              answerOutline:
                'DAC lets object owners grant access at their discretion (Unix permissions); MAC enforces a system-wide policy users cannot override (SELinux, classification levels).',
            },
            {
              question: 'Why does RBAC scale better than per-user permissions?',
              answerOutline:
                'Permissions attach to a small set of roles and users are assigned roles; changes are made once per role rather than per user, matching organisational structure.',
            },
            {
              question: 'State complete mediation and why cached "allowed" decisions are dangerous.',
              answerOutline:
                'Every access to every object must be authorized; cached or skipped checks create windows where revoked or never-granted access succeeds.',
            },
            {
              question: 'What is the confused deputy problem and how do capabilities address it?',
              answerOutline:
                'A privileged component is tricked into using its authority for an attacker; capabilities make authority an unforgeable token that must be presented, so the deputy cannot be fooled into using ambient authority.',
            },
          ],
        },
      ],
    },
    {
      slug: 'secure-development-and-incident-response',
      title: 'Secure Development and Incident Response',
      description:
        'Building security in and responding when it fails: the secure development lifecycle, static analysis and fuzzing, software supply-chain security, and logging, monitoring and incident response.',
      lessons: [
        {
          slug: 'secure-development-lifecycle',
          title: 'The secure development lifecycle',
          summary:
            'Integrating security into how software is built: secure design principles, security requirements, code review, and the economics of finding bugs early.',
          estimatedMinutes: 90,
          objectives: [
            'Explain the phases of a secure development lifecycle and why early phases are cheapest',
            'Apply Saltzer and Schroeder\'s secure-design principles to a design decision',
            'Run a security-focused code review and write actionable findings',
            'Explain secure defaults, input validation strategy and defensive programming',
          ],
          concepts: [
            'SDL phases: requirements, design, implementation, verification, release, response',
            'Shift left; cost of fixing bugs by phase',
            'Saltzer & Schroeder principles (least privilege, fail-safe defaults, economy of mechanism, complete mediation, open design, separation of privilege, least common mechanism, psychological acceptability)',
            'Security requirements and abuse cases',
            'Secure code review',
            'Input validation (allowlist) and output encoding strategy',
            'Secure defaults; defence in depth',
          ],
          explanation: `Security bolted on at the end is expensive and ineffective; the **secure development lifecycle** (Microsoft's SDL, OWASP SAMM, the NIST SSDF) integrates it into every phase: security **requirements** and abuse cases alongside functional ones, threat modelling in **design**, secure coding and review in **implementation**, static/dynamic analysis and testing in **verification**, hardening in **release**, and incident response afterward. The economic argument is decisive: a design flaw caught on a whiteboard costs almost nothing, the same flaw found in production after a breach costs enormously, which is why the industry mantra is "**shift left**", move security earlier.

The design-phase foundation is **Saltzer and Schroeder's 1975 principles**, which have aged remarkably well and which you should be able to apply by name: **economy of mechanism** (keep it small and simple, because you can only verify what you understand), **fail-safe defaults** (deny by default, grant explicitly), **complete mediation** (check every access), **open design** (Kerckhoffs again, do not rely on secrecy of design), **separation of privilege** (require more than one condition for sensitive actions), **least privilege**, **least common mechanism** (minimise shared state between users), and **psychological acceptability** (if security is unusable, users route around it). Most real vulnerabilities violate one of these, and naming the violated principle is a powerful review tool.

In **implementation**, the habits are **secure defaults** (the out-of-the-box configuration is the safe one), a clear **input-validation strategy** (allowlist what is valid at the trust boundary, then rely on context-appropriate output encoding and parameterisation rather than trying to blocklist bad input), and **defensive programming** (validate assumptions, fail closed). **Secure code review**, human or tool-assisted, is where many bugs are caught; a good review looks specifically at trust boundaries, authentication and authorization, input handling, cryptographic use and error handling, and produces **actionable** findings (where, why it matters, how to fix) rather than vague warnings. You will threat-model and review a small codebase and rewrite a feature with secure defaults.`,
          resources: [
            {
              title: 'Microsoft Security Development Lifecycle (SDL) practices',
              url: 'https://www.microsoft.com/en-us/securityengineering/sdl',
              type: 'documentation',
              cost: 'free',
              provider: 'Microsoft',
              primary: true,
            },
            {
              title: 'The Protection of Information in Computer Systems (Saltzer & Schroeder, 1975)',
              url: 'https://web.mit.edu/Saltzer/www/publications/protection/',
              type: 'article',
              cost: 'free',
              provider: 'MIT',
              note: 'The source of the eight design principles; read the principles section.',
            },
            {
              title: 'OWASP SAMM (Software Assurance Maturity Model)',
              url: 'https://owasp.org/www-project-samm/',
              type: 'documentation',
              cost: 'free',
              provider: 'OWASP',
            },
            {
              title: 'NIST SP 800-218 — Secure Software Development Framework (SSDF)',
              url: 'https://csrc.nist.gov/pubs/sp/800/218/final',
              type: 'documentation',
              cost: 'free',
              provider: 'NIST',
            },
          ],
          exercises: [
            {
              slug: 'apply-principles',
              title: 'Apply the design principles',
              prompt:
                'Take five real design decisions (e.g. default-open vs default-closed firewall, storing full card numbers vs tokens, a single admin role vs separated duties, secret-question recovery, a shared service account). For each, name which Saltzer-Schroeder principle is at stake, state the secure choice, and explain the trade-off. Then find a real CVE and name the principle its root cause violated.',
              kind: 'writing',
              difficulty: 2,
            },
            {
              slug: 'security-code-review',
              title: 'Conduct a security code review',
              prompt:
                'Take a small web application (your own, or an intentionally vulnerable one like NodeGoat) and perform a structured security review focusing on trust boundaries, authn/authz, input handling, crypto and error handling. Produce at least eight findings, each with file/line, the weakness (CWE), the impact, and a concrete fix. Prioritise them and write a one-paragraph summary for a developer.',
              kind: 'writing',
              difficulty: 2,
            },
            {
              slug: 'secure-defaults-rewrite',
              title: 'Rewrite a feature with secure defaults',
              prompt:
                'Pick a feature with insecure defaults (a file upload that trusts the content-type, a config that enables debug endpoints, a permissive CORS setting). Rewrite it so the safe behaviour is the default and insecure behaviour requires explicit opt-in. Write tests that fail if the insecure default returns. Document the before/after and the principle applied.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why is fixing a security flaw cheaper the earlier it is found?',
              answerOutline:
                'Early phases change cheap artifacts (designs, requirements); later fixes require rework, retesting, redeployment, and after a breach, incident costs and reputational harm.',
            },
            {
              question: 'State three Saltzer-Schroeder principles and a design decision each governs.',
              answerOutline:
                'E.g. fail-safe defaults (deny-by-default firewall), least privilege (minimal service accounts), economy of mechanism (small, auditable TCB). Any three with a matching decision.',
            },
            {
              question: 'Why is allowlisting preferred over blocklisting for input validation?',
              answerOutline:
                'Allowlists define the small set of valid inputs; blocklists must anticipate every malicious variant and encoding and inevitably miss some.',
            },
            {
              question: 'What makes a code-review finding actionable?',
              answerOutline:
                'It states where (file/line), what the weakness and impact are, and a concrete remediation, so the developer can fix it without further investigation.',
            },
          ],
        },
        {
          slug: 'static-analysis-and-fuzzing',
          title: 'Static analysis, dynamic analysis and fuzzing',
          summary:
            'Automated bug-finding: how SAST, DAST and fuzzers work, their strengths and blind spots, and how to integrate them so they find real bugs without drowning you in noise.',
          estimatedMinutes: 100,
          objectives: [
            'Explain static (SAST), dynamic (DAST) and interactive analysis and what each can and cannot find',
            'Run a static analyser on code and triage true vs false positives',
            'Explain coverage-guided fuzzing and set up a fuzzer with sanitizers on a target',
            'Integrate security testing into CI and reason about signal-to-noise',
          ],
          concepts: [
            'SAST: data-flow/taint analysis of source; false positives',
            'DAST: black-box testing of a running app',
            'IAST and software composition analysis (dependencies)',
            'Coverage-guided fuzzing (AFL++, libFuzzer); corpus, coverage, mutations',
            'Sanitizers as oracles (ASan/UBSan) during fuzzing',
            'Triage: reproducibility, severity, deduplication',
            'Shift-left in CI; gating vs informational',
          ],
          explanation: `No human finds every bug, so security testing is automated in three complementary ways. **Static application security testing** (SAST) analyses source code without running it, typically by **taint analysis**: tracking untrusted input from **sources** (request parameters) to dangerous **sinks** (a SQL query, a shell call) and flagging paths with no sanitisation in between. It can cover all code paths and find bugs early, but it does not know runtime context, so it produces **false positives** and misses logic flaws; tools like Semgrep, CodeQL and Bandit are the common ones. **Dynamic application security testing** (DAST) attacks a *running* application from the outside (OWASP ZAP, Burp), finding issues that only appear at runtime and in configuration, but only on the paths it exercises and with less precision about root cause. **Interactive** (IAST) instruments the running app to combine both, and **software composition analysis** scans your *dependencies* for known-vulnerable versions, which matters because most code in a modern app is third-party (next lesson).

**Fuzzing** is the most powerful technique for memory-safety and parsing bugs. A **coverage-guided fuzzer** (AFL++, libFuzzer) feeds a target program mutated inputs, measures which code paths each input reaches, and keeps inputs that reach new coverage, evolving a **corpus** that explores the program automatically. Combined with **sanitizers** as oracles, ASan catches a memory violation the instant a fuzzed input triggers it, this finds deep bugs that no test suite would: Google's OSS-Fuzz has found tens of thousands of bugs this way. You write a small **fuzz harness** that feeds the fuzzer input to the function under test, run it for minutes to hours, and triage the crashes.

The integration lesson is **signal-to-noise**. Tools that cry wolf get ignored, so you tune rules, suppress known false positives, and decide which findings **gate** a build (block the merge) versus which are informational. Running SAST and SCA on every pull request and fuzzing continuously in the background is the modern baseline. You will run a static analyser and a fuzzer on real code and triage what they find.`,
          resources: [
            {
              title: 'Semgrep (open-source static analysis)',
              url: 'https://semgrep.dev/',
              type: 'tool',
              cost: 'freemium',
              provider: 'Semgrep',
              note: 'Fast, rule-based SAST with a free tier; write custom rules for your own patterns.',
              primary: true,
            },
            {
              title: 'AFL++ (coverage-guided fuzzer)',
              url: 'https://github.com/AFLplusplus/AFLplusplus',
              type: 'tool',
              cost: 'free',
              provider: 'AFL++ project',
            },
            {
              title: 'Google OSS-Fuzz documentation',
              url: 'https://google.github.io/oss-fuzz/',
              type: 'documentation',
              cost: 'free',
              provider: 'Google',
              note: 'How continuous fuzzing with sanitizers finds bugs at scale; the fuzz-harness patterns transfer to your own code.',
            },
            {
              title: 'OWASP ZAP (dynamic application security testing)',
              url: 'https://www.zaproxy.org/',
              type: 'tool',
              cost: 'free',
              provider: 'OWASP',
            },
          ],
          exercises: [
            {
              slug: 'sast-triage',
              title: 'Run and triage a static analyser',
              prompt:
                'Run Semgrep (or CodeQL/Bandit) on a real codebase (yours or an open-source project). Collect the findings, then manually triage at least ten: for each, decide true or false positive with justification, and for true positives give the CWE and a fix. Report the precision you observed and write one custom rule that catches a project-specific insecure pattern.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'fuzz-a-parser',
              title: 'Fuzz a parser with sanitizers',
              prompt:
                'Take a C/C++ function that parses untrusted input (a small format parser you write or an existing one) and write a libFuzzer or AFL++ harness. Build with -fsanitize=address,undefined and fuzz for at least 30 minutes. Report coverage growth, any crashes found with their minimised reproducers, and the root cause of one crash. Fix it and confirm the fuzzer no longer reproduces it.',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'ci-security-gate',
              title: 'Add security testing to CI',
              prompt:
                'Set up a CI pipeline (GitHub Actions or similar) that runs SAST and dependency scanning on every push, plus a short fuzzing smoke test. Decide which findings gate the build and which are informational, and justify the thresholds. Demonstrate the pipeline failing on an introduced vulnerability and passing once fixed. Write a note on managing false positives so the gate stays trusted.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What can SAST find that DAST cannot, and vice versa?',
              answerOutline:
                'SAST sees all code paths and finds source-level issues early but lacks runtime context (false positives, misses config/logic). DAST finds runtime and configuration issues on exercised paths but not unexercised code or precise root cause.',
            },
            {
              question: 'How does coverage-guided fuzzing explore a program?',
              answerOutline:
                'It mutates inputs, measures code coverage, and keeps inputs that reach new coverage, evolving a corpus that automatically drives execution into new paths.',
            },
            {
              question: 'Why are sanitizers important when fuzzing?',
              answerOutline:
                'They act as oracles that detect memory/UB violations the moment a fuzzed input triggers them, turning silent corruption into an immediate, diagnosable crash.',
            },
            {
              question: 'Why does signal-to-noise determine whether security tooling is useful?',
              answerOutline:
                'High false-positive rates cause developers to ignore results; tuning, suppression and gating only on high-confidence findings keep the tools trusted and acted upon.',
            },
          ],
        },
        {
          slug: 'software-supply-chain-security',
          title: 'Software supply-chain security',
          summary:
            'Securing what you depend on: dependency and transitive risk, the attacks (typosquatting, compromise, build tampering), and the defences (SBOMs, pinning, signing, SLSA).',
          estimatedMinutes: 90,
          objectives: [
            'Explain why dependencies and the build pipeline are a primary attack surface',
            'Describe supply-chain attack types (dependency confusion, typosquatting, maintainer compromise, build tampering)',
            'Use dependency scanning, lockfiles/pinning and SBOMs to manage risk',
            'Explain artifact signing and provenance (Sigstore, SLSA) and the trust they establish',
          ],
          concepts: [
            'Transitive dependencies; most code is third-party',
            'Known-vulnerable dependencies (SCA)',
            'Attacks: typosquatting, dependency confusion, maintainer/account compromise, malicious updates',
            'Build/CI compromise (SolarWinds); reproducible builds',
            'SBOM (software bill of materials)',
            'Pinning and lockfiles; verifying hashes',
            'Artifact signing and provenance: Sigstore, SLSA levels',
          ],
          explanation: `A modern application is mostly code you did not write: direct dependencies pull in **transitive** ones until a small app rests on thousands of packages from strangers. That is the **software supply chain**, and it is now a primary attack surface, because compromising one popular package or one build pipeline can reach everyone downstream at once. Log4Shell showed the blast radius of a single ubiquitous library; SolarWinds showed that compromising the **build pipeline** to insert a backdoor into a signed, trusted update is devastating precisely because customers trust the vendor.

The attack types you must recognise: **known-vulnerable dependencies** (you ship a version with a public CVE, caught by **software composition analysis**); **typosquatting** (a malicious package named like a popular one, \`reqeusts\`); **dependency confusion** (publishing a public package with the same name as a company's internal one so the resolver fetches the attacker's); **maintainer or account compromise** (an attacker takes over a legitimate package and ships a malicious update, as in the event-stream and XZ incidents); and **build tampering** (injecting into CI). The defences layer up. **Dependency scanning** and SBOM generation tell you what you actually ship (a **software bill of materials** is the ingredient list, increasingly required by regulation). **Pinning** with lockfiles and verified hashes ensures you install exactly the reviewed version, not whatever is latest. **Signing and provenance** establish that an artifact was built from the expected source by the expected pipeline: **Sigstore** makes signing open-source artifacts easy, and **SLSA** defines levels of build integrity (source and build provenance, tamper-resistance, hermetic reproducible builds) you can aim for.

The mindset shift is that **trust is transitive and must be managed, not assumed**: you are as exposed as your weakest dependency and your build system's integrity. You will generate an SBOM, scan for vulnerable dependencies, pin and verify, and sign an artifact with Sigstore, then reason about which SLSA level a given pipeline achieves.`,
          resources: [
            {
              title: 'SLSA — Supply-chain Levels for Software Artifacts',
              url: 'https://slsa.dev/',
              type: 'documentation',
              cost: 'free',
              provider: 'OpenSSF',
              note: 'The provenance and build-integrity levels framework.',
              primary: true,
            },
            {
              title: 'Sigstore (signing, verification and provenance for artifacts)',
              url: 'https://www.sigstore.dev/',
              type: 'tool',
              cost: 'free',
              provider: 'OpenSSF',
            },
            {
              title: 'OWASP Dependency-Check (software composition analysis)',
              url: 'https://owasp.org/www-project-dependency-check/',
              type: 'tool',
              cost: 'free',
              provider: 'OWASP',
            },
            {
              title: 'Apache Log4j security vulnerabilities (official advisory page, incl. CVE-2021-44228 Log4Shell)',
              url: 'https://logging.apache.org/log4j/2.x/security.html',
              type: 'documentation',
              cost: 'free',
              provider: 'Apache Software Foundation',
              note: 'The vendor record of Log4Shell and its follow-up CVEs, with affected versions and mitigations.',
            },
          ],
          exercises: [
            {
              slug: 'sbom-and-scan',
              title: 'Generate an SBOM and scan dependencies',
              prompt:
                'For a real project, generate an SBOM (CycloneDX or SPDX via a tool such as Syft) and run a software-composition scan (OWASP Dependency-Check, pip-audit, npm audit). Report the full dependency count including transitive, the direct-vs-transitive split, and every known-vulnerable dependency with its CVE and fixed version. Propose an upgrade plan and identify any dependency with no maintained fix.',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'pin-and-verify',
              title: 'Pin and verify dependencies',
              prompt:
                'Take a project with loose version ranges and convert it to a fully pinned lockfile with verified hashes. Demonstrate that installation now fails if a dependency\'s content changes (simulate by altering a cached package). Then write a short analysis of how pinning would or would not have helped against (a) a known-vulnerable version, (b) a compromised maintainer pushing a malicious patch version, and (c) dependency confusion.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'sign-and-provenance',
              title: 'Sign an artifact and assess SLSA level',
              prompt:
                'Build a small artifact and sign it with Sigstore (cosign), then verify the signature and its provenance. Describe what the signature and provenance attest and what they do not. Then evaluate a CI pipeline (yours or a described one) against the SLSA levels and state what changes would raise it one level. Explain how this would have affected a SolarWinds-style build compromise.',
              kind: 'coding',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'Why is the software supply chain a high-value target?',
              answerOutline:
                'Most shipped code is third-party and build pipelines are trusted; compromising one popular package or build system reaches all downstream consumers at once.',
            },
            {
              question: 'What is dependency confusion and how is it prevented?',
              answerOutline:
                'Publishing a public package with the same name as an internal one so the resolver fetches the attacker\'s; prevented by scoping/namespacing internal packages and configuring resolvers to prefer the private registry.',
            },
            {
              question: 'What does an SBOM provide and why is it increasingly required?',
              answerOutline:
                'A complete inventory of components and versions shipped, enabling rapid impact assessment when a new vulnerability appears (e.g. "do we ship vulnerable Log4j?").',
            },
            {
              question: 'What do artifact signing and SLSA provenance establish beyond a checksum?',
              answerOutline:
                'That the artifact was produced from the expected source by the expected, tamper-resistant build process by an identified signer, not merely that bytes match a published hash.',
            },
          ],
        },
        {
          slug: 'logging-monitoring-and-incident-response',
          title: 'Logging, monitoring and incident response',
          summary:
            'Detecting and handling the breach that defences miss: what to log, how to detect attacks, the incident-response lifecycle, forensics basics, and the blameless post-mortem.',
          estimatedMinutes: 100,
          objectives: [
            'Design security logging that supports detection and investigation without leaking secrets',
            'Explain detection with SIEM, IDS and detection rules (e.g. Sigma) and the alerting trade-offs',
            'Describe the incident-response lifecycle (prepare, detect, contain, eradicate, recover, learn)',
            'Explain basic digital forensics (evidence handling, volatility) and write a blameless post-mortem',
          ],
          concepts: [
            'Security logging: what to log, structured logs, log integrity',
            'Not logging secrets/PII; log tampering and append-only storage',
            'SIEM; detection engineering; Sigma rules; MITRE ATT&CK mapping',
            'Alert fatigue; precision vs recall in detection',
            'Incident-response lifecycle (NIST SP 800-61)',
            'Containment, eradication, recovery; chain of custody',
            'Digital forensics; order of volatility; blameless post-mortem',
          ],
          explanation: `Prevention always fails eventually, so mature security is as much about **detection and response** as about defence. It begins with **logging** the right things: authentication events (success and failure), authorization denials, administrative actions, input-validation rejections, and errors, as **structured** (machine-parseable) records with timestamps, actor, action and outcome. Two rules: never log **secrets or sensitive PII** (passwords, tokens, full card numbers), and protect **log integrity**, because an attacker's first move is often to delete their traces, so logs should ship to append-only, separately-controlled storage.

**Detection** turns logs and network telemetry into alerts. A **SIEM** aggregates events; **detection engineering** writes rules (the vendor-neutral **Sigma** format is common) that match attack patterns, ideally mapped to **MITRE ATT&CK** techniques so coverage is measurable. The hard problem is **alert fatigue**: a rule with poor **precision** buries real incidents in false positives until analysts stop looking, so detection is a constant balance of precision and recall, tuned against real data.

When something fires, the **incident-response lifecycle** (NIST SP 800-61) structures the response: **prepare** (plans, access, runbooks in advance), **detect and analyse** (confirm and scope the incident), **contain** (stop the bleeding, e.g. isolate a host, revoke credentials), **eradicate** (remove the foothold), **recover** (restore service and verify), and **learn** (the post-incident review). **Containment** often conflicts with **forensics**: pulling the plug destroys volatile evidence (memory, network connections), so you follow the **order of volatility** and preserve a **chain of custody** if the incident may be legal. Basic **digital forensics**, imaging disks, capturing memory, building a timeline, is enough to understand what happened.

The final, cultural, lesson is the **blameless post-mortem**: the review asks how the system and process allowed the incident and how to prevent recurrence, not who to punish, because blame drives information underground and the same class of incident recurs. Google's SRE material is the canonical reference. You will design logging, write a detection rule, and run a tabletop incident with a written post-mortem.`,
          resources: [
            {
              title: 'NIST SP 800-61 — Computer Security Incident Handling Guide',
              url: 'https://csrc.nist.gov/pubs/sp/800/61/r2/final',
              type: 'documentation',
              cost: 'free',
              provider: 'NIST',
              note: 'The incident-response lifecycle reference (revision 3 is the latest; r2 remains widely used).',
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
              title: 'Sigma — generic signature format for SIEM detections',
              url: 'https://github.com/SigmaHQ/sigma',
              type: 'tool',
              cost: 'free',
              provider: 'SigmaHQ',
            },
            {
              title: 'OWASP Logging Cheat Sheet',
              url: 'https://cheatsheetseries.owasp.org/cheatsheets/Logging_Cheat_Sheet.html',
              type: 'documentation',
              cost: 'free',
              provider: 'OWASP',
            },
          ],
          exercises: [
            {
              slug: 'design-security-logging',
              title: 'Design and implement security logging',
              prompt:
                'For a small web app, implement structured security logging of auth events, authorization denials and admin actions, with timestamp, actor, action, resource and outcome. Deliberately include a test that fails if a password or token ever appears in a log. Ship logs to a separate append-only sink (even a second file with restricted permissions). Then write three queries over the logs that would detect: a brute-force attempt, an account enumeration, and a privilege change.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'write-detection-rule',
              title: 'Write and test a detection rule',
              prompt:
                'Pick an attack technique you performed earlier (a port scan, a brute-force login, an SQL-injection probe). Write a Sigma rule (or a SIEM/IDS rule) that detects it, mapped to the relevant MITRE ATT&CK technique. Generate both malicious and benign activity and measure the rule\'s precision and recall. Tune it to reduce false positives and discuss the trade-off you made.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'tabletop-and-postmortem',
              title: 'Run a tabletop incident and write a post-mortem',
              prompt:
                'Using a realistic scenario (a stolen credential leads to data exfiltration, or a vulnerable dependency is exploited), run through the incident-response lifecycle on paper: detection, scoping, containment, eradication, recovery, and lessons. Address what evidence you would preserve and in what order (order of volatility). Then write a one-to-two page blameless post-mortem with a timeline, root-cause analysis and concrete action items, in the Google SRE style.',
              kind: 'writing',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What should and should not be in security logs, and why protect their integrity?',
              answerOutline:
                'Log auth/authz events, admin actions, errors as structured records; never log secrets/PII. Protect integrity (append-only, separate storage) because attackers delete logs to hide activity.',
            },
            {
              question: 'Why is alert precision as important as detection coverage?',
              answerOutline:
                'Low precision causes alert fatigue; analysts ignore a noisy system, so real incidents are missed despite good coverage. Detection must balance precision and recall.',
            },
            {
              question: 'List the phases of the incident-response lifecycle.',
              answerOutline:
                'Preparation; detection and analysis; containment; eradication; recovery; post-incident lessons learned (NIST SP 800-61).',
            },
            {
              question: 'Why are post-mortems blameless, and what does order of volatility mean?',
              answerOutline:
                'Blame suppresses information and prevents learning, so reviews focus on systemic causes and fixes. Order of volatility: collect the most ephemeral evidence first (memory, connections) before it is lost to containment or shutdown.',
            },
          ],
        },
      ],
    },
  ],
  capstone: {
    slug: 'security-assessment-of-a-vulnerable-app',
    title: 'Capstone: a full security assessment with exploitation and remediation',
    description: `Perform a complete, professional security assessment of a deliberately vulnerable application that you are explicitly authorised to attack: OWASP Juice Shop, DVWA, WebGoat, or a SEED-lab / pwn.college target, plus a small vulnerable C program you compile yourself for the binary portion. You must stay strictly within these authorised targets.

Deliver the assessment as a practitioner would. Start with a threat model (data-flow diagram, trust boundaries, STRIDE) and a scope statement. Then find, exploit and document vulnerabilities across the classes in this subject: at least one injection, one cross-site scripting, one broken-access-control or SSRF, one authentication or session weakness, one cryptographic misuse, and one memory-corruption bug in the C component (overflow to control flow). For each finding, give a reproducible proof-of-concept, a CVSS score with justification, the root-cause weakness (CWE), the impact, and a concrete remediation with a code or configuration diff. Finish by re-testing to confirm your fixes and writing an executive summary and a prioritised remediation plan. The report must read like something you could hand to a development team.`,
    deliverables: [
      'Scope and rules-of-engagement statement naming the authorised targets only',
      'Threat model: DFD with trust boundaries and a STRIDE table',
      'At least six documented findings across the vulnerability classes, each with a reproducible PoC, CVSS vector, CWE, impact and remediation diff',
      'Evidence of re-testing after fixes (before/after)',
      'A written report: executive summary, technical findings, prioritised remediation plan',
    ],
    estimatedHours: 30,
    stretchGoals: [
      'Automate part of the assessment with a scripted scanner (your own) and compare its findings with your manual testing',
      'Chain two vulnerabilities into a higher-impact exploit and document the kill chain',
      'Add a detection section: write logging/alerting (or a Sigma/Suricata rule) that would have caught each attack, and test it',
    ],
  },
  masteryChecklist: [
    'I can apply the security mindset and produce a threat model (DFD, trust boundaries, STRIDE, attack tree) for a real system',
    'I can score and prioritise vulnerabilities using CVE/CWE/CVSS together with exploitation and asset context',
    'I can choose and correctly use cryptographic primitives (AEAD, HMAC, password hashing, key exchange, signatures) and explain their failure modes',
    'I can explain how TLS composes primitives into a secure channel and audit a TLS configuration',
    'I can find memory-safety bugs with sanitizers and exploit stack overflows, including bypassing NX and ASLR with ROP and a leak, on authorised targets',
    'I can exploit and then remediate the main web vulnerability classes: injection, XSS, CSRF, SSRF and broken access control',
    'I can design authentication, session management and access control that resists realistic attackers',
    'I can attack and harden network and system infrastructure (scanning, firewalls, privilege, hardening)',
    'I can build security into the development lifecycle with static analysis, fuzzing and supply-chain controls',
    'I can run an incident-response process: detect, log, investigate and write a blameless post-mortem',
  ],
});
