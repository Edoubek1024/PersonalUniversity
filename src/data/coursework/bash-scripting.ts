import { defineCoursework } from '../define';

const bashExtensions = ['timonwong.shellcheck', 'foxundermoon.shell-format', 'ms-vscode-remote.remote-wsl'];
const bashToolchain = [
  'On Windows 10, run `wsl --install -d Ubuntu` in an administrator PowerShell, then open the project through the WSL extension so every command below runs in Linux.',
  'In Ubuntu, run `sudo apt install shellcheck shfmt`. Bash, grep, sed, awk and the coreutils are already installed.',
  'Keep projects in your Linux home directory, such as `~/code`, not under `/mnt/c`. That avoids CRLF line endings, permission oddities and slow file access.',
];

export default defineCoursework({
  subjectId: 'bash-scripting',
  machineProblems: [
    {
      slug: 'mp1-logq',
      title: 'logq: ten questions, ten pipelines',
      afterModule: 'shell-and-text-tools',
      coversModules: ['shell-and-text-tools'],
      summary: 'Answer ten questions about a web server log, each with a single pipeline of grep, sed, awk, sort and friends, checked by a diff-based test script.',
      language: 'Bash 5 with GNU coreutils, sed and awk',
      estimatedHours: 5,
      overview: `Before writing scripts with variables and loops, you should be able to answer real questions with one pipeline. This MP gives you an access log and ten questions. Each answer is one small file holding one pipeline that reads the log on stdin.

Create \`fixtures/small.log\` with exactly these 12 lines, a common web log format:

\`\`\`text
10.0.0.1 - - [12/Mar/2026:09:15:01 +0000] "GET /index.html HTTP/1.1" 200 1024
10.0.0.2 - - [12/Mar/2026:09:15:07 +0000] "GET /about.html HTTP/1.1" 200 2048
10.0.0.1 - - [12/Mar/2026:09:16:12 +0000] "GET /logo.png HTTP/1.1" 200 5120
10.0.0.3 - - [12/Mar/2026:09:17:45 +0000] "POST /login HTTP/1.1" 302 128
10.0.0.3 - - [12/Mar/2026:10:02:03 +0000] "GET /admin HTTP/1.1" 403 256
10.0.0.1 - - [12/Mar/2026:10:05:30 +0000] "GET /index.html HTTP/1.1" 304 0
10.0.0.4 - - [12/Mar/2026:10:31:18 +0000] "GET /missing.html HTTP/1.1" 404 512
10.0.0.2 - - [12/Mar/2026:10:47:52 +0000] "GET /index.html HTTP/1.1" 200 1024
10.0.0.4 - - [12/Mar/2026:11:12:09 +0000] "GET /old.html HTTP/1.1" 404 512
10.0.0.1 - - [12/Mar/2026:11:20:33 +0000] "POST /api/items HTTP/1.1" 500 64
10.0.0.5 - - [12/Mar/2026:11:21:47 +0000] "GET /index.html HTTP/1.1" 200 1024
10.0.0.1 - - [12/Mar/2026:11:59:59 +0000] "GET /api/items HTTP/1.1" 200 4096
\`\`\`

Work out each expected answer by hand first and save it in \`expected/\`. Then make the pipelines match. You will find that the spaces inside the date field, and the quotes around the request, decide how you split the fields.

**Constraints.** Use only what module 1 teaches. There are no shell variables, loops or \`if\` statements. Each \`qNN.sh\` holds one pipeline, optionally on several lines. Variables inside an \`awk\` program are fine.`,
      setup: {
        extensions: bashExtensions,
        toolchain: bashToolchain,
        structure: `logq/
├── fixtures/small.log     # the 12 lines above
├── expected/q01.txt ...   # the right answer for each question
├── q01.sh ... q10.sh      # one pipeline each, reading stdin
└── check.sh               # compares every answer with expected/`,
        commands: [
          { label: 'Run one question', command: 'bash q03.sh < fixtures/small.log' },
          { label: 'Check one answer', command: 'bash q03.sh < fixtures/small.log | diff - expected/q03.txt' },
          { label: 'Check every answer', command: 'bash check.sh' },
          { label: 'Make the large test file', command: 'yes "$(cat fixtures/small.log)" | head -n 1200000 > big.log' },
        ],
      },
      requirements: [
        'There are ten files, `q01.sh` to `q10.sh`, and each is one pipeline that reads a log on stdin and writes its answer to stdout, with no shell variables, loops or `if` statements.',
        '`q01.sh` prints the number of requests, and `q02.sh` prints the number of distinct client IP addresses.',
        '`q03.sh` prints the top 3 client IPs as `count ip`, with one space and no leading spaces, sorted by count descending and then by IP ascending.',
        '`q04.sh` prints each status code and its count as `code count`, sorted by code.',
        '`q05.sh` prints the total bytes sent, and `q06.sh` prints total bytes per hour as `hour bytes`, sorted by hour.',
        '`q07.sh` prints the paths that returned 404, sorted, and `q08.sh` prints the most requested path as `count path`.',
        '`q09.sh` uses `sed -E` with capture groups to rewrite every line as `ip method path status`.',
        '`q10.sh` uses `awk` to print the percentage of requests with a status of 400 or above, to one decimal place.',
        '`check.sh` has one `diff` line per question chained with `&&`, prints `all passed` when all ten match, and exits non-zero at the first mismatch.',
      ],
      acceptanceTests: [
        'On `small.log`, `q01.sh` prints `12`, `q02.sh` prints `5`, and `q03.sh` prints `5 10.0.0.1`, `2 10.0.0.2` and `2 10.0.0.3`.',
        '`q04.sh` prints `200 6`, `302 1`, `304 1`, `403 1`, `404 2` and `500 1`.',
        '`q05.sh` prints `15808`, and `q06.sh` prints `09 8320`, `10 1792` and `11 5696`.',
        '`q07.sh` prints `/missing.html` and `/old.html`, and `q08.sh` prints `4 /index.html`.',
        'The first line from `q09.sh` is `10.0.0.1 GET /index.html 200`, and `q10.sh` prints `33.3`.',
        'On the 1,200,000-line `big.log`, `q01.sh` prints `1200000`, `q05.sh` prints `1580800000`, the first line of `q03.sh` is `500000 10.0.0.1`, and each script finishes in under 5 seconds.',
      ],
      resources: [
        {
          title: 'The Missing Semester: Data Wrangling',
          url: 'https://missing.csail.mit.edu/2020/data-wrangling/',
          type: 'lecture',
          cost: 'free',
          provider: 'MIT CSAIL',
          note: 'The same style of analysis on a real server log.',
        },
      ],
      stretchGoals: [
        'Download a real access log, such as a public NASA HTTP trace, and report the busiest hour.',
        'Write `q11.sh`, which prints a text histogram of requests per hour using `awk`.',
      ],
    },
    {
      slug: 'mp2-rnm',
      title: 'rnm: a safe batch file renamer',
      afterModule: 'control-flow-and-functions',
      coversModules: ['variables-and-expansion', 'control-flow-and-functions'],
      summary: 'Write a batch renamer that previews by default, refuses collisions, handles chains and swaps, and survives any file name you can create.',
      language: 'Bash 5',
      estimatedHours: 8,
      overview: `Renaming hundreds of files is exactly the job people reach for the shell to do, and exactly where careless scripts destroy data. \`rnm\` is a small tool that gets it right. It computes all the new names first, prints a plan, and checks that plan for conflicts. Only with \`-a\` does it change anything, and it applies the whole plan or none of it.

This is a thorough test of modules 2 and 3. File names may contain spaces, newlines, glob characters and leading dashes, so every expansion has to be correct. Name changes use parameter expansion rather than \`sed\`. Conflict detection needs an associative array. Paths arrive either as arguments or as NUL-separated input from \`find -print0\`, and options go through \`getopts\`.

A subtle case makes this interesting. If \`v1\` becomes \`v2\` while \`v2\` becomes \`v3\`, the plan is valid, and so is a straight swap, yet renaming one file at a time would destroy data. You will need a two-phase rename through temporary names.

**Constraints.** A single Bash script with functions and a \`main\`, with no external renaming tools. Do not use \`set -e\` or \`trap\`, which arrive in module 4: check the status of each \`mv\` yourself. \`shellcheck\` must report nothing.`,
      setup: {
        extensions: bashExtensions,
        toolchain: bashToolchain,
        structure: `rnm/
├── rnm                    # the executable script
├── tests/run.sh           # plain Bash tests with an assert function
└── README.md              # usage and examples`,
        commands: [
          { label: 'Preview a rename', command: './rnm -l -S *.TXT' },
          { label: 'Apply a rename', command: './rnm -a -l -S *.TXT' },
          { label: 'Rename everything find locates', command: "find . -type f -name '*.JPG' -print0 | ./rnm -0 -a -l" },
          { label: 'Lint the scripts', command: 'shellcheck rnm tests/run.sh' },
          { label: 'Run the tests', command: 'bash tests/run.sh' },
        ],
      },
      requirements: [
        'Usage is `rnm [-a] [-l] [-S] [-s OLD=NEW]... [-N START] [-p PREFIX] [-0] [--] PATH...`, parsed with `getopts`, with `-h` printing usage to stdout. Bad usage prints to stderr and exits with status 2.',
        'Transformations apply to the base name only, always in this order: lowercase (`-l`), spaces to hyphens (`-S`), literal replacements (`-s`, in the order given and replacing all matches), numbering, then prefix. The final form is `PREFIX` + `NNN-` + name.',
        '`-N START` numbers files in argument order, zero-padded to 3 digits, and `-p PREFIX` adds a literal prefix.',
        'Without `-a`, the tool prints one `old -> new` line for each file that would change and renames nothing. Files whose name would not change are skipped.',
        'With `-0`, paths are read from stdin as NUL-separated names rather than from arguments.',
        'The whole plan is checked before any rename. Two sources with the same target, a target that exists and is not itself being renamed, and a new name that is empty or contains `/` are all refused with a message on stderr, status 1, and no changes.',
        'Renames happen in two phases through unique temporary names in each directory, so chains and swaps work.',
        'Names containing spaces, newlines, `*`, quotes, or a leading `-` work everywhere, including in the `mv` calls.',
        '`shellcheck rnm` reports nothing, all code is in functions apart from a final `main "$@"`, and the script uses no `eval` and does not parse `ls`.',
      ],
      acceptanceTests: [
        'With `A B.TXT` and `C.TXT` in a folder, `rnm -l -S "A B.TXT" C.TXT` prints `A B.TXT -> a-b.txt` and `C.TXT -> c.txt`, exits with 0, and leaves both files in place. With `-a` added, the files are renamed and their contents are unchanged.',
        '`rnm -a -N 1 -p trip- p1.jpg p2.jpg p3.jpg` produces `trip-001-p1.jpg`, `trip-002-p2.jpg` and `trip-003-p3.jpg`.',
        'With `a.txt` and `A.TXT`, `rnm -a -l a.txt A.TXT` exits with 1 and changes nothing, as `A.TXT` would collide with `a.txt`, which stays as it is. With `x.TXT` and an unrelated `x.txt`, `rnm -a -l x.TXT` also exits with 1 and changes nothing.',
        'With `v1.txt` containing `one` and `v2.txt` containing `two`, `rnm -a -s 2=3 -s 1=2 v1.txt v2.txt` leaves `v2.txt` containing `one` and `v3.txt` containing `two`.',
        'With `a.log` containing `A` and `b.log` containing `B`, `rnm -a -s a=@ -s b=a -s @=b a.log b.log` swaps them, so `a.log` contains `B` and `b.log` contains `A`.',
        'Files named with a newline, a leading dash, a `*` and a double quote, all ending in `.TXT`, are renamed correctly by `rnm -a -l -- *.TXT` and by `find . -type f -print0 | rnm -0 -a -l`, with the same file count before and after.',
      ],
      resources: [
        {
          title: 'Bash Reference Manual: Shell Parameter Expansion',
          url: 'https://tiswww.case.edu/php/chet/bash/bashref.html#Shell-Parameter-Expansion',
          type: 'documentation',
          cost: 'free',
          provider: 'GNU Bash (maintainer copy)',
          note: 'Quoting the pattern in ${name//"$old"/"$new"} makes the match literal.',
        },
      ],
      stretchGoals: [
        'Add `-u` to undo the last run from a saved plan file.',
        'Add a regular expression mode with `-e PATTERN=REPLACEMENT`, using `BASH_REMATCH`.',
      ],
    },
  ],
  finalProject: {
    slug: 'final-snapkeep',
    title: 'snapkeep: incremental snapshot backups in Bash',
    repoName: 'snapkeep',
    summary: 'A single-file backup tool that makes hard-linked snapshots with rsync, verifies them with checksums, prunes by a retention policy, and runs unattended.',
    language: 'Bash 5 with rsync',
    estimatedHours: 16,
    overview: `Most people's backups are either nonexistent or a single copy that gets overwritten. \`snapkeep\` is a small, dependable alternative you can actually use on your own files. Each run makes what looks like a complete, browsable copy of a folder at that moment, but files that have not changed are hard links to the previous snapshot, so ten snapshots of a 10 GB folder take little more than 10 GB.

The core trick is one command, \`rsync --link-dest\`. All the work is in making it trustworthy, which is the point of this course. A run interrupted halfway must never look like a good snapshot, so it builds in a temporary directory and renames it into place. Two runs must never overlap, so it uses \`flock\`. A backup you have not checked is a hope, so each snapshot stores a SHA-256 manifest that \`verify\` can re-check. Old snapshots must expire by a clear policy, and because a mistake there deletes data, the policy is a pure function with its own tests, and \`prune\` is a dry run unless you say otherwise.

**Constraints.** One Bash script with no dependencies beyond rsync and coreutils. It must pass \`shellcheck\` and \`shfmt\`, run under \`set -euo pipefail\`, and never use \`eval\` or \`source\` on its config file. Hard links store each file's contents only once, so one corrupted file affects every snapshot that links to it. Your README must say so, and explain why \`snapkeep\` does not replace an off-site copy.`,
    setup: {
      extensions: [...bashExtensions, 'github.vscode-github-actions'],
      toolchain: [
        ...bashToolchain,
        'Also run `sudo apt install rsync bats`.',
        'Put both your test source and destination on the Linux file system, as hard links and permissions are only reliable there.',
      ],
      structure: `snapkeep/
├── snapkeep               # the tool: a single script
├── systemd/snapkeep.service
├── systemd/snapkeep.timer
├── tests/backup.bats      # backup, list and restore
├── tests/prune.bats       # the retention policy
├── tests/failure.bats     # interruption, locks and corruption
├── tests/helpers.bash
├── .github/workflows/ci.yml
├── example.conf
└── README.md`,
      commands: [
        { label: 'Make a snapshot', command: './snapkeep -c example.conf backup' },
        { label: 'Preview what prune would delete', command: './snapkeep -c example.conf prune' },
        { label: 'Verify the newest snapshot', command: './snapkeep -c example.conf verify latest' },
        { label: 'Lint and check formatting', command: 'shellcheck snapkeep && shfmt -i 2 -d snapkeep' },
        { label: 'Run the tests', command: 'bats tests/' },
      ],
    },
    requirements: [
      'The commands are `backup`, `list`, `prune`, `verify` and `restore`, with `-c FILE` naming a config file of `key=value` lines (`source`, `dest`, `exclude`, `keep_daily`, `keep_weekly`, `keep_monthly`). The file is parsed line by line, never sourced, and unknown keys are an error.',
      '`backup` runs `rsync -a --delete --link-dest` into `.inprogress-<stamp>` and then renames it to a name of the form `2026-04-06T02-00-00`, so that an incomplete snapshot never appears in `list`. The `latest` symlink is updated last.',
      'Each snapshot gets a `MANIFEST.sha256` of its files, built with NUL-safe tools, stored outside the snapshot tree, and written atomically.',
      '`verify NAME` re-checks a manifest and exits with status 1, listing the changed files, if any differ. `verify --all` checks every snapshot.',
      'The retention policy is a function that reads snapshot names on stdin and prints those to keep. It keeps the newest snapshot of each of the most recent `keep_daily` days that have snapshots, likewise for ISO weeks and for months, and the union of these sets is kept.',
      '`prune` is a dry run that prints what would go. It deletes only with `--apply`, never deletes the newest snapshot, and leaves `latest` valid.',
      '`restore NAME TARGET [PATH]` copies a snapshot or one path out of it, and refuses a non-empty target unless given `--force`.',
      'A `flock` lock allows one running job per destination. A second run exits at once with status 75, and an `EXIT` trap removes `.inprogress-*` directories after an interruption.',
      'Every run logs timestamped lines to stderr, including the files transferred and the elapsed time, and exit codes are documented: 0 success, 1 failure, 2 usage and 75 busy.',
      'The repository ships a working systemd service and timer, and the README gives the Windows Task Scheduler command for WSL.',
    ],
    acceptanceTests: [
      'After backing up 100 files of 1 MiB, changing one and backing up again, the changed file has a link count of 1 in the new snapshot, an unchanged file has a link count of 2, and `du -sk` on the destination grows by less than 2 MiB.',
      'Given the names `2026-03-30T02-00-00`, `2026-03-30T14-00-00`, `2026-03-31T02-00-00`, `2026-04-01T02-00-00`, `2026-04-02T02-00-00`, `2026-04-05T02-00-00` and `2026-04-06T02-00-00`, with `keep_daily=3`, `keep_weekly=2` and `keep_monthly=2`, the policy keeps `04-06`, `04-05`, `04-02` and `03-31`, and drops `04-01` and both `03-30` snapshots. Note that `03-30` and `04-05` are in the same ISO week, 2026-W14.',
      'Appending a byte to a file in a snapshot makes `verify` exit with 1 and name that file. `verify` passes on an untouched snapshot whose files have names containing spaces, a newline and a leading dash.',
      'Sending `SIGTERM` to a running `backup` leaves no `.inprogress-*` directory, leaves `latest` unchanged, and the next `backup` succeeds.',
      'While a `backup` holds the lock, a second one exits with status 75 within 1 second. After the first is killed with `kill -9`, a new `backup` succeeds immediately.',
      '`restore` of a snapshot gives a tree identical to the original under `diff -r`. `restore` into a non-empty folder exits with 1, and a config file containing `$(touch /tmp/pwned)` as a value creates no such file.',
    ],
    coverage: [
      { module: 'shell-and-text-tools', demonstrates: 'Reports and manifests are built from pipelines of find, sort, sha256sum and awk, and rsync output is summarised with text tools.' },
      { module: 'variables-and-expansion', demonstrates: 'Snapshot names are handled with parameter expansion, rsync arguments are built in arrays, and every path is quoted.' },
      { module: 'control-flow-and-functions', demonstrates: 'Subcommands dispatch through case, the config parser uses while read, and the retention policy is a pure function.' },
      { module: 'robust-scripts-and-automation', demonstrates: 'Strict mode, traps, flock, atomic renames, Bats tests, shellcheck and a systemd timer make it safe to run unattended.' },
    ],
    portfolio: [
      'The README opens with a short terminal recording of a backup, a verify and a restore, and a quick start that works on a fresh Ubuntu machine.',
      'GitHub Actions runs `shellcheck`, `shfmt -d` and `bats` on every push, with a status badge in the README.',
      'The repository has a LICENSE and a tagged `v1.0.0` release, and the script prints its version with `--version`.',
      'A section of the README shows measured disk use for 10 snapshots against 10 full copies.',
      'A limitations section is honest about hard links, the need for an off-site copy, and why the tool stops at this size.',
    ],
    stretchGoals: [
      'Support a remote destination over SSH, keeping the same guarantees.',
      'Add `diff NAME1 NAME2`, which lists the files added, removed and changed between snapshots using the manifests.',
    ],
  },
});
