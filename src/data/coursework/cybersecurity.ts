import { defineCoursework } from '../define';

const pythonExtensions = ['ms-python.python', 'ms-python.vscode-pylance', 'charliermarsh.ruff'];
const pythonToolchain = [
  'Install Python 3.12 from python.org. Create a virtual environment with `python -m venv .venv` and activate it with `.venv\\Scripts\\Activate.ps1`.',
];
const dockerToolchain = [
  'Install Docker Desktop for Windows with the WSL 2 backend. It is free for personal use. All target containers are ones you build yourself and publish only on 127.0.0.1.',
];

export default defineCoursework({
  subjectId: 'cybersecurity',
  machineProblems: [
    {
      slug: 'mp1-sealbox',
      title: 'sealbox: an authenticated file encryption tool',
      afterModule: 'applied-cryptography',
      coversModules: ['security-mindset-and-threat-models', 'applied-cryptography'],
      summary: 'Design and build a file encryption and signing tool from vetted primitives, starting from a threat model and proving it detects tampering, truncation and reordering.',
      language: 'Python 3.12',
      estimatedHours: 15,
      overview: `Good primitives are easy to find. Almost all real cryptographic failures come from how they are combined: reused nonces, unauthenticated headers, or a stream that can be silently cut short. In this MP you compose primitives into a small tool, and your tests decide whether you composed them correctly.

\`sealbox\` encrypts a file to a passphrase or to a recipient public key, and it signs files. Encryption is **chunked**, so large files never have to fit in memory. That creates the real design problem: an attacker who can edit the file can also delete, reorder or duplicate chunks, and every one of those edits must be detected.

Start with the threat model, before any code. Say what the attacker can do (read and modify the file in storage or in transit) and what is out of scope (malware on your own machine). Every requirement below should trace back to a line in that document.

**Constraints.** Never implement AES, ChaCha20, X25519 or Ed25519 yourself. Use the \`cryptography\` package for them and \`argon2-cffi\` for password hashing. You will implement exactly one construction by hand, HKDF, because it is short and has official test vectors. Do not use a higher-level recipe such as Fernet, since the composition is the assignment.

Publish the format in \`docs/FORMAT.md\` in enough detail that someone could write a compatible decryptor. Security must not depend on the format being secret, as Kerckhoffs would remind you. This is a learning tool, so the README must say not to rely on it for real secrets.`,
      setup: {
        extensions: pythonExtensions,
        toolchain: [
          ...pythonToolchain,
          'Then run `pip install cryptography argon2-cffi pytest`.',
        ],
        structure: `sealbox/
├── sealbox/__main__.py       # command-line interface
├── sealbox/format.py         # header encoding and limits
├── sealbox/hkdf.py           # HKDF-SHA256 written with hmac
├── sealbox/stream.py         # chunked authenticated encryption
├── sealbox/keys.py           # key generation, fingerprints, known keys
├── sealbox/sign.py           # Ed25519 signing and verification
├── tests/test_vectors.py     # official test vectors
├── tests/test_tamper.py      # bit flips, truncation, reordering
├── docs/THREAT_MODEL.md
├── docs/FORMAT.md
└── README.md`,
        commands: [
          { label: 'Generate a key pair', command: 'python -m sealbox keygen --out alice' },
          { label: 'Encrypt to a recipient', command: 'python -m sealbox encrypt --to alice.pub --in report.pdf --out report.pdf.sbx' },
          { label: 'Decrypt a file', command: 'python -m sealbox decrypt --key alice.key --in report.pdf.sbx --out report.pdf' },
          { label: 'Run the tests', command: 'python -m pytest -q' },
        ],
      },
      requirements: [
        '`docs/THREAT_MODEL.md` has a data-flow diagram with trust boundaries, a STRIDE table of at least 6 rows, a list of non-goals, and the top 5 risks ranked by likelihood and impact.',
        'Encryption uses ChaCha20-Poly1305 over 64 KiB chunks. Each 12-byte nonce is an 11-byte big-endian chunk counter followed by a final-chunk flag byte of 1 on the last chunk and 0 otherwise.',
        'Each file uses a fresh key derived with HKDF-SHA256 from a new random 32-byte salt, and the whole header is authenticated as associated data on every chunk.',
        'Passphrase mode uses Argon2id with a time cost of 3, 64 MiB of memory and parallelism 4, and a random 16-byte salt. Parameters are stored in the header, and decryption refuses any value above a fixed ceiling.',
        'Recipient mode uses a new ephemeral X25519 key per file, and the HKDF info input includes both public keys.',
        'Decryption writes to a temporary file and renames it only after the final chunk verifies, so a failed run leaves no output.',
        'Every decryption failure exits non-zero with one generic message, which does not reveal whether the passphrase or the data was wrong.',
        'Signing uses Ed25519 over the SHA-256 hash of the file plus a fixed domain-separation string.',
        'A fingerprint is the SHA-256 of a public key, shown as hex. A `known_keys.json` file pins name to fingerprint, and a changed key for a known name is refused until the user removes the old entry.',
      ],
      acceptanceTests: [
        'Your HKDF, given RFC 5869 test case 1 (22 bytes of `0x0b`, salt `000102...0c`, info `f0f1...f9`, length 42), outputs bytes that begin `3cb25f25faacd57a` and end `d5b887185865`.',
        'Files of 0, 1, 65,536, 65,537 and 1,048,576 bytes decrypt to an identical SHA-256. Ciphertext size equals the header plus the plaintext plus 16 bytes per chunk, which is 16 for the empty file, 32 extra for 65,537 bytes (2 chunks), and 256 extra for 1,048,576 bytes (16 chunks).',
        'Flipping one bit in the header, the first chunk, the last chunk, and at each of 1,000 random positions always gives a non-zero exit code and no output file.',
        'Deleting the last chunk, swapping chunks 2 and 3, repeating a chunk, and pasting in a chunk from another file encrypted with the same passphrase all fail decryption.',
        'Encrypting one file twice with the same passphrase produces different ciphertext. A header requesting 1 TiB of Argon2 memory is refused in under 1 second, with no key derivation attempted.',
        'A valid signature verifies, and changing one bit of the file makes verification fail. Encrypting to a name whose stored fingerprint differs from the supplied key is refused with an error naming both fingerprints.',
      ],
      resources: [
        {
          title: 'pyca/cryptography documentation',
          url: 'https://cryptography.io/en/latest/',
          type: 'documentation',
          cost: 'free',
          provider: 'Python Cryptographic Authority',
          note: 'Use the AEAD, X25519 and Ed25519 pages under Primitives.',
        },
        {
          title: 'RFC 9106: Argon2 Memory-Hard Function',
          url: 'https://www.rfc-editor.org/rfc/rfc9106',
          type: 'documentation',
          cost: 'free',
          provider: 'IETF',
          note: 'Section 4 gives the recommended parameter sets. This MP uses the option with 64 MiB of memory.',
        },
      ],
      stretchGoals: [
        'Support several recipients for one file by wrapping the file key once per recipient.',
        'Add a post-quantum hybrid design note that explains what would change in the header and what would not.',
      ],
    },
    {
      slug: 'mp2-boxaudit',
      title: 'boxaudit: a read-only container security auditor',
      afterModule: 'network-and-system-security',
      coversModules: ['security-mindset-and-threat-models', 'memory-safety-and-binary-exploitation', 'web-security', 'network-and-system-security'],
      summary: 'Build a defensive auditor that inspects local Docker containers for risky configuration, unhardened binaries and missing web protections, then scores each finding with CVSS.',
      language: 'Python 3.12',
      estimatedHours: 20,
      overview: `Most breaches do not need a clever new attack. They use a known weakness that nobody was checking for. This MP puts you on the defending side of the course so far: you build the tool that checks.

\`boxaudit\` audits a Docker container that you run on your own machine. It gathers evidence in three read-only ways: \`docker inspect\` for runtime configuration, \`docker export\` for the filesystem as a tar stream, and plain HTTP requests to a loopback address for web response headers. It never runs commands inside the container and never changes it.

You will read Linux permissions directly from tar headers, and you will parse **ELF files by hand** with \`struct\` to report which exploit mitigations each binary was built with. Every finding carries a CWE, a CVSS 3.1 vector with a computed score, the evidence, and a concrete remediation.

**Scope is a feature.** The tool only talks to loopback. Before any connection, it must resolve the target and refuse anything outside \`127.0.0.0/8\` or \`::1\`. There is no flag to turn that off. It only checks ports that \`docker inspect\` lists as published for the audited container, and it sends no attack payloads of any kind.

**Constraints.** Use the Python standard library for parsing and auditing, with no \`pyelftools\`. Your test fixtures are two images you build yourself: \`weak\`, with planted misconfigurations, and \`hardened\`, with the same application done properly. Both are compiled inside Docker, so your Windows machine needs no C compiler.`,
      setup: {
        extensions: [...pythonExtensions, 'ms-azuretools.vscode-docker', 'ms-vscode.hexeditor'],
        toolchain: [
          ...dockerToolchain,
          ...pythonToolchain,
          'Then run `pip install pytest`. The auditor itself needs only the standard library.',
        ],
        structure: `boxaudit/
├── boxaudit/__main__.py      # command line and exit codes
├── boxaudit/scope.py         # loopback-only guard
├── boxaudit/collect.py       # docker inspect and export readers
├── boxaudit/elf.py           # ELF64 parser and mitigation report
├── boxaudit/cvss.py          # CVSS 3.1 base score
├── boxaudit/checks/          # filesystem.py, runtime.py, binaries.py, web.py
├── boxaudit/report.py        # JSON and Markdown output
├── policy.example.toml       # allowlists and waivers with expiry dates
├── fixtures/weak/            # Dockerfile with planted findings
├── fixtures/hardened/        # Dockerfile with the fixes applied
├── tests/
└── README.md`,
        commands: [
          { label: 'Build the fixture images', command: 'docker build -t boxaudit-weak fixtures/weak; docker build -t boxaudit-hardened fixtures/hardened' },
          { label: 'Run the weak fixture on loopback only', command: 'docker run -d --name weak -p 127.0.0.1:8081:8080 --cap-add SYS_ADMIN --security-opt seccomp=unconfined boxaudit-weak' },
          { label: 'Audit it', command: 'python -m boxaudit --container weak --url http://127.0.0.1:8081 --report out/weak.md --fail-on high' },
          { label: 'Run the tests', command: 'python -m pytest -q' },
        ],
      },
      requirements: [
        'From the exported filesystem, report SUID and SGID files missing from the policy allowlist, world-writable files outside `/tmp`, `NOPASSWD` rules in sudoers files, and any UID 0 account other than `root`.',
        'From `docker inspect`, report a root user, privileged mode, added capabilities, unconfined seccomp, a writable root filesystem, missing `no-new-privileges`, host networking, a mounted Docker socket, and ports published on all interfaces.',
        'Parse ELF64 by hand and report four properties: NX from `PT_GNU_STACK`, PIE from `ET_DYN` with `PT_INTERP`, none, partial or full RELRO from `PT_GNU_RELRO` and the bind-now dynamic flags, and stack canaries from a `__stack_chk_fail` symbol.',
        'Run the ELF checks on every SUID or SGID binary and on the image entry point, and treat a missing `PT_GNU_STACK` as an executable stack.',
        'From HTTP responses, report a missing Content-Security-Policy, `X-Content-Type-Options`, or framing protection, and any session cookie that lacks `HttpOnly` or `SameSite`.',
        'The scope guard resolves the target before connecting, refuses everything outside loopback with exit code 2, and has no override. Only ports published by the audited container are checked.',
        'Implement the CVSS 3.1 base score formula. Each finding has an ID, title, CWE, vector, score, severity, evidence and remediation.',
        'Output Markdown and JSON reports, and exit with 0 when no finding reaches the `--fail-on` severity, 1 when one does, and 2 on a usage or scope error.',
        'A TOML policy can allowlist known-good items and waive a finding with a reason and an expiry date. An expired waiver stops applying.',
      ],
      acceptanceTests: [
        'The vector `AV:L/AC:L/PR:L/UI:N/S:U/C:H/I:H/A:H` scores 7.8 (High), `AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H` scores 9.8 (Critical), and `AV:L/AC:L/PR:L/UI:N/S:U/C:L/I:N/A:N` scores 3.3 (Low).',
        'A small C program with a local array passed to `fgets`, built with `gcc -O2 -fstack-protector-strong -fPIE -pie -Wl,-z,relro,-z,now`, reports NX yes, PIE yes, RELRO full and canary yes. Built with `gcc -O0 -fno-stack-protector -no-pie -z execstack -Wl,-z,norelro`, it reports NX no, PIE no, RELRO none and canary no.',
        'The `weak` container produces all 8 planted findings: an extra SUID file, a `NOPASSWD` sudoers rule, a world-writable config file, a root user, added `CAP_SYS_ADMIN`, unconfined seccomp, a missing Content-Security-Policy, and a session cookie without `HttpOnly`.',
        'With `--fail-on high`, the `weak` audit exits 1. The `hardened` audit has no High or Critical findings and exits 0.',
        '`--url http://198.51.100.1/` exits 2 with a scope error, and a test that replaces `socket.connect` proves no connection was attempted. A hostname that resolves to a non-loopback address is refused in the same way.',
        'Running the audit twice leaves `docker diff` output unchanged and gives identical JSON apart from the timestamp. A waiver dated yesterday no longer suppresses its finding.',
      ],
      resources: [
        {
          title: 'CVSS v3.1 Specification Document',
          url: 'https://www.first.org/cvss/v3-1/specification-document',
          type: 'documentation',
          cost: 'free',
          provider: 'FIRST',
          note: 'Section 7 gives the equations and metric values, and Appendix A defines the Roundup function.',
        },
        {
          title: 'Docker Engine security',
          url: 'https://docs.docker.com/engine/security/',
          type: 'documentation',
          cost: 'free',
          provider: 'Docker',
          note: 'Background for the runtime checks: capabilities, seccomp, and rootless operation.',
        },
      ],
      stretchGoals: [
        'Compare the installed package list against a saved offline copy of vulnerability data, with no network access during the audit.',
        'Output SARIF, so findings appear in the VS Code Problems panel through a SARIF viewer.',
      ],
    },
  ],
  finalProject: {
    slug: 'final-breakfix',
    title: 'breakfix: a vulnerable-then-fixed app with a self-grading security bench',
    repoName: 'breakfix',
    summary: 'Build a local teaching app where each security flaw has a switch, a fix, a passing test and a detection rule, so anyone can see exactly what each defence changes.',
    language: 'Python 3.12 and C17',
    estimatedHours: 55,
    overview: `Security advice is easy to nod along to and hard to feel. \`breakfix\` makes it concrete. Clone it, run \`docker compose up\`, and you have a small team-notes app on your own machine with a lab page listing a dozen flaws. Each flaw has a **switch**. Flip it from flawed to fixed, and you can watch the test bench go from red to green, read the exact diff that made the difference, and see which detection rule would have noticed.

Think of it as a defensive teaching kit that someone could use to run a lunchtime workshop. Each flaw is one class from this course: injection, cross-site scripting, broken access control, weak password storage, nonce reuse, unchecked lengths in a C parser, missing rate limits, token validation mistakes, and more. Each one ships with its CWE, a CVSS vector, a root-cause explanation and the fix.

The **bench** is the original part. It runs a harmless probe for each flaw against the local app and reports whether the flaw is present. Probes only prove behaviour, for example by showing that test user Alice can read a test note owned by Bob, or that a stored \`<b>\` tag comes back unescaped. The repository contains no exploit tooling and no weaponised payloads.

Around that sits the engineering a real team needs: a threat model, a hardened container verified by your \`boxaudit\`, fuzzing, a software bill of materials, and structured logs with detection rules.

**Safety is part of the design.** Compose publishes only on \`127.0.0.1\`, flawed mode refuses to start on any non-loopback address, and the probes accept only the local app as a target. Nothing in this project touches a system you do not own.`,
    setup: {
      extensions: [...pythonExtensions, 'ms-vscode.cpptools', 'ms-azuretools.vscode-docker', 'redhat.vscode-yaml', 'github.vscode-github-actions'],
      toolchain: [
        ...dockerToolchain,
        ...pythonToolchain,
        'Then run `pip install -r requirements-dev.txt`, which should include `pytest`, `flask`, `argon2-cffi`, `cryptography`, `bandit` and `pip-audit`.',
        'C code, clang, libFuzzer and the sanitizers all run inside a Linux container defined in the repository, so no Windows C toolchain is needed.',
      ],
      structure: `breakfix/
├── app/                      # Flask app and SQLite schema
├── app/flags.py              # one switch per flaw, loopback guard
├── app/lab.py                # lab page: switches, diffs, bench results
├── native/notefmt.c          # C attachment parser
├── native/fuzz_notefmt.c     # libFuzzer harness
├── flaws/<id>/README.md      # root cause, CWE, CVSS, fix, references
├── bench/                    # one harmless probe per flaw
├── detect/rules/             # Sigma-style YAML rules
├── detect/run.py             # matches rules against JSON logs
├── docs/THREAT_MODEL.md
├── docs/INCIDENT.md          # tabletop exercise
├── compose.yaml              # binds 127.0.0.1 only
├── SECURITY.md               # authorised use and scope
├── .github/workflows/ci.yml
└── README.md`,
      commands: [
        { label: 'Start the app on loopback', command: 'docker compose up --build' },
        { label: 'Grade every flaw in flawed mode', command: 'python -m bench --url http://127.0.0.1:8080 --mode flawed' },
        { label: 'Grade every flaw in fixed mode', command: 'python -m bench --url http://127.0.0.1:8080 --mode fixed' },
        { label: 'Run the unit tests', command: 'python -m pytest -q' },
        { label: 'Fuzz the C parser for 10 minutes', command: 'docker compose run --rm fuzz -max_total_time=600' },
        { label: 'Audit the fixed container', command: 'python -m boxaudit --container breakfix-app --url http://127.0.0.1:8080 --fail-on high' },
      ],
    },
    requirements: [
      '`docs/THREAT_MODEL.md` has a data-flow diagram, trust boundaries, a STRIDE table, and a scope statement. `SECURITY.md` says the project is for local use against your own machine only.',
      'At least 12 flaws, each with its own switch and a `flaws/<id>/README.md` giving the CWE, a CVSS 3.1 vector, the root cause, the fix as a diff, and how to detect it. They cover injection, XSS, CSRF, SSRF, access control, cryptography, authentication and memory safety.',
      'Compose publishes only on `127.0.0.1`. If any flaw is switched on and the bind address is not loopback, the app exits before listening, and the bench refuses non-loopback targets.',
      'Fixed mode uses parameterised queries, context-aware escaping with a Content-Security-Policy, CSRF tokens with `SameSite` cookies, an allowlist for link previews, and object-level authorization that denies by default.',
      'Fixed mode stores passwords with Argon2id, encrypts note exports with ChaCha20-Poly1305 using a unique nonce per message, and flawed mode shows the contrast with a fast unsalted hash and a reused nonce.',
      'Authentication adds per-account and per-address rate limits, TOTP per RFC 6238, a breached-password check against a bundled local list using SHA-1 prefixes, and JWT validation of algorithm, issuer, audience and expiry. Roles follow a documented access matrix.',
      'The C parser `notefmt` reads an attachment header with a length field. The flawed build trusts that field, and the fixed build validates it. It is tested under ASan and UBSan, and fuzzed with libFuzzer in a container with a saved corpus.',
      'The fixed container runs as non-root with a read-only root filesystem, all capabilities dropped, `no-new-privileges` and default seccomp, the parser runs in a separate container on an internal network, and `boxaudit` gates it in CI.',
      'CI runs `bandit`, `pip-audit` and your tests, installs from hash-pinned requirements, and publishes a CycloneDX software bill of materials with each release.',
      'The app writes structured JSON logs that exclude secrets, at least 6 Sigma-style rules each map to a MITRE ATT&CK technique, and `docs/INCIDENT.md` works through a tabletop exercise using the NIST SP 800-61 phases.',
    ],
    acceptanceTests: [
      'In flawed mode, the bench reports all 12 or more flaws as present. In fixed mode, it reports all of them as absent. Flipping one switch changes exactly one row of the result table.',
      'In fixed mode, Alice requesting Bob\'s note gets `404` where flawed mode gives `200`. A search for `O\'Brien` returns the matching note with no database error. A stored `<b>x</b>` comes back as `&lt;b&gt;x&lt;/b&gt;`. A state-changing POST without a CSRF token gets `403`. Link previews for `http://169.254.169.254/` and `http://127.0.0.1:8080/` are refused without any outbound request.',
      'TOTP with the RFC 6238 secret `12345678901234567890` and SHA-1 gives `94287082` at T=59 and `07081804` at T=1111111109 (8 digits). The sixth failed login within 60 seconds gets `429`. Tokens with `alg: none`, a wrong audience or a past expiry are all rejected. The password `password` is refused through a lookup on SHA-1 prefix `5BAA6`.',
      'An attachment that declares a length of 1,000 with only 10 bytes of body produces an ASan report in the flawed build and a clean parse error in the fixed build. The fixed build survives a 10 minute libFuzzer run with no crashes, and the corpus is committed.',
      '`boxaudit` reports no High or Critical findings on the fixed container. Starting the app with `BIND=0.0.0.0` and any flaw enabled exits non-zero before a port opens, and `python -m bench --url http://198.51.100.1/` exits with a scope error.',
      'Running the bench against flawed mode fires at least one detection rule in each of 5 categories, a replay of 1,000 normal requests fires none, and searching all logs for a known test password and session token finds nothing.',
    ],
    coverage: [
      { module: 'security-mindset-and-threat-models', demonstrates: 'The threat model, STRIDE table and CVSS score for each flaw show adversarial thinking applied to a real design.' },
      { module: 'applied-cryptography', demonstrates: 'Authenticated encryption with unique nonces is shown side by side with the failure caused by nonce reuse.' },
      { module: 'memory-safety-and-binary-exploitation', demonstrates: 'Sanitizers and fuzzing find the unchecked length in the C parser, and full mitigations are verified on the built binary.' },
      { module: 'web-security', demonstrates: 'Injection, XSS, CSRF, SSRF and access-control flaws each have a switch, a fix and a passing probe.' },
      { module: 'network-and-system-security', demonstrates: 'A hardened container, network segmentation and the boxaudit gate show least privilege in practice.' },
      { module: 'authentication-and-access-control', demonstrates: 'Argon2id, TOTP, rate limits, strict JWT validation and a role matrix implement the full authentication stack.' },
      { module: 'secure-development-and-incident-response', demonstrates: 'CI scanning, fuzzing, a software bill of materials, detection rules and a tabletop exercise cover the whole lifecycle.' },
    ],
    portfolio: [
      'The README opens with a GIF of one switch turning a bench row from red to green, followed by a quick start and a clear notice that the app must stay on loopback.',
      'GitHub Actions runs tests, `bandit`, `pip-audit`, a short fuzz run and the `boxaudit` gate on every push, with a status badge.',
      'The repository has a LICENSE, `SECURITY.md`, a tagged `v1.0.0` release, and a software bill of materials attached to the release.',
      'A table in the README maps every flaw to its CWE, its OWASP Top 10 category, its fix and its detection rule.',
      '`docs/WORKSHOP.md` gives a 60 minute lesson plan so a teacher or team lead can use the project with a group.',
    ],
    resources: [
      {
        title: 'OWASP Cheat Sheet Series',
        url: 'https://cheatsheetseries.owasp.org/',
        type: 'documentation',
        cost: 'free',
        provider: 'OWASP',
        note: 'Use the sheets on injection prevention, cross-site scripting, CSRF, SSRF and authorization as the basis for each fix.',
      },
      {
        title: 'RFC 6238: TOTP',
        url: 'https://www.rfc-editor.org/rfc/rfc6238',
        type: 'documentation',
        cost: 'free',
        provider: 'IETF',
        note: 'Appendix B has the test vectors used in the acceptance tests.',
      },
    ],
    stretchGoals: [
      'Add a WebAuthn login for local testing, and compare its phishing resistance with TOTP in the lab page.',
      'Add a guided mode where the lab page asks the learner to choose the right fix before showing the diff.',
    ],
  },
});
