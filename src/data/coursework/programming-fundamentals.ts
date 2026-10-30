import { defineCoursework } from '../define';

const pythonInstall = 'Install Python 3.12 or newer from python.org. On the first installer screen, tick "Add python.exe to PATH". On macOS or Linux, use `python3` wherever these pages say `python`.';

export default defineCoursework({
  subjectId: 'programming-fundamentals',
  machineProblems: [
    {
      slug: 'mp1-numkit',
      title: 'numkit: an interactive number toolkit',
      afterModule: 'control-flow-functions',
      coversModules: ['getting-started', 'control-flow-functions'],
      supersedesProject: true,
      summary: 'Build a menu-driven program that guesses your number, factorises integers, explores Collatz chains, converts bases and validates card numbers, with your own checks proving it works.',
      language: 'Python 3.12',
      estimatedHours: 10,
      overview: `This is your first complete program. \`numkit\` is a small menu in the terminal with five tools: a game where the computer guesses a number you are thinking of, a prime factoriser, a Collatz explorer, a base converter, and a checker for the Luhn digit that protects credit card numbers.

The point is the shape of the program, not the arithmetic. All of the mathematics lives in **pure functions** that take arguments and return one value. They never call \`print\` or \`input\`. The menu is a separate file that talks to the person and calls those functions. Because the functions are pure, a third file can check them automatically, so you find out at once if a change breaks something.

**Constraints.** Use only what you have learned so far: numbers, strings, \`if\`, \`while\`, \`for\`, \`range\`, functions and recursion. Lists, tuples and dictionaries arrive in the next module, so every function returns a single number, string or \`True\`/\`False\`, and a factorisation comes back as text. No \`import\` is needed except \`import numkit\` in your other two files. Python finds that file because it sits in the same folder, and Module 4 explains how this works.

**The Luhn check.** Start at the rightmost digit and move left. Double every second digit, and subtract 9 from any result above 9. Add all the digits together. The number is valid when that total is divisible by 10.`,
      setup: {
        extensions: ['ms-python.python'],
        toolchain: [
          pythonInstall,
          'Install VS Code, then install the Python extension from the Extensions panel.',
          'Make an empty folder called `numkit`, open it with File > Open Folder, and open a terminal with Terminal > New Terminal. Every command below runs in that terminal.',
        ],
        structure: `numkit/
├── numkit.py     # pure functions only, so nothing runs when it is imported
├── menu.py       # the interactive program: import numkit, then the menu loop
├── checks.py     # import numkit, then your check(...) calls
└── NOTES.txt     # your measurements and manual test log`,
        commands: [
          { label: 'Check that Python is installed', command: 'python --version' },
          { label: 'Run the toolkit', command: 'python menu.py' },
          { label: 'Run all of your checks', command: 'python checks.py' },
        ],
      },
      requirements: [
        '`numkit.py` contains only `def` statements. Every function has a docstring, and none of them call `print` or `input`.',
        '`is_prime(n)` returns `False` for anything below 2 and tries divisors only while `d * d <= n`. `factorise(n)` returns primes in increasing order as text, such as `"2^3 x 3^2 x 5"`, and returns `"1"` for 1.',
        '`collatz_steps(n)` returns how many steps it takes to reach 1, where an even `n` becomes `n // 2` and an odd `n` becomes `3 * n + 1`. `longest_chain_below(limit)` returns the starting number below `limit` with the most steps, choosing the smallest if two tie.',
        '`guesses_to_find(low, high, secret)` plays the guessing game with no person involved, always guessing `(low + high) // 2`, and returns how many guesses it took. `worst_case_guesses(high)` returns the most guesses any secret from 1 to `high` can need, using a loop that repeatedly halves the range.',
        '`to_base(n, base)`, `digit_sum(n)` and `gcd(a, b)` are recursive, each with a clear base case. `to_base` handles bases 2 to 16 using the letters A to F, and `gcd` uses `gcd(a, b) = gcd(b, a % b)`.',
        '`luhn_valid(text)` ignores spaces, and returns `False` when the text has any other non-digit character or fewer than 2 digits.',
        '`parse_positive(text)` strips spaces and returns a whole number of at least 1, or `None` for anything else. `.isdecimal()` tells you whether a string is safe to pass to `int`.',
        '`menu.py` offers all five tools and `q` to quit, and loops until the person quits. Bad input at any prompt prints a friendly message and asks again, and no input can crash it.',
        'In the guessing game the person answers `h` (too high), `l` (too low) or `c` (correct). The program reports how many guesses it used, and says the answers were inconsistent if `low` passes `high`.',
        '`checks.py` defines `check(label, actual, expected)`, which prints PASS or FAIL and returns 1 or 0. It runs at least 25 checks and finishes by printing a line such as `25 of 25 checks passed`. `NOTES.txt` records the worst-case guesses for ranges of 100, 1,000 and 1,000,000, and a formula that predicts them.',
      ],
      acceptanceTests: [
        '`factorise(360)` returns `"2^3 x 3^2 x 5"`, `factorise(1001)` returns `"7 x 11 x 13"`, `factorise(1024)` returns `"2^10"`, `factorise(97)` returns `"97"` and `factorise(1)` returns `"1"`.',
        '`collatz_steps(1)` is 0, `collatz_steps(6)` is 8, `collatz_steps(27)` is 111, `longest_chain_below(1000)` is 871, and `collatz_steps(871)` is 178.',
        '`guesses_to_find(1, 100, 50)` is 1, `guesses_to_find(1, 100, 1)` is 6, and `guesses_to_find(1, 100, 100)` is 7. `worst_case_guesses` returns 7, 10 and 20 for 100, 1,000 and 1,000,000.',
        '`to_base(255, 2)` is `"11111111"`, `to_base(255, 16)` is `"FF"`, `to_base(0, 2)` is `"0"`, `digit_sum(9875)` is 29, and `gcd(1071, 462)` is 21.',
        '`luhn_valid("79927398713")` and `luhn_valid("4539 1488 0343 6467")` are `True`, while `luhn_valid("79927398710")`, `luhn_valid("12a4")` and `luhn_valid("0")` are `False`.',
        '`parse_positive("  42 ")` is 42, and `parse_positive` returns `None` for `"abc"`, `""`, `"-5"`, `"0"` and `"3.5"`.',
      ],
      resources: [
        {
          title: 'Luhn algorithm',
          url: 'https://en.wikipedia.org/wiki/Luhn_algorithm',
          type: 'article',
          cost: 'free',
          provider: 'Wikipedia',
          note: 'A worked example of the check, using the same test number as this MP.',
        },
      ],
      stretchGoals: [
        'Add a `functools.lru_cache` version of `collatz_steps` and time `longest_chain_below(100000)` with and without it.',
        'Add a sixth tool that finds the longest run of consecutive composite numbers below a limit.',
      ],
    },
    {
      slug: 'mp2-pyquest',
      title: 'pyquest: a data-driven text adventure engine',
      afterModule: 'objects-and-abstraction',
      coversModules: ['data-collections', 'programs-and-files', 'objects-and-abstraction'],
      summary: 'Build a text adventure engine that loads whole worlds from JSON files, with locked doors, dark rooms, save games, and a scripted test mode.',
      language: 'Python 3.12',
      estimatedHours: 16,
      overview: `A text adventure is a good test of program design, because the same game can be written as a tangle of \`if\` statements or as a clean engine. You will write the clean engine. \`pyquest\` contains no story at all. Every room, item and locked door comes from a JSON file, so someone who cannot program can write a new game.

Here is \`worlds/tiny.json\`, which is both the format definition and your test world. Add \`name\` and \`description\` text to each room and item yourself.

\`\`\`json
{
  "title": "Tiny Quest",
  "start": "cellar",
  "goal": { "room": "vault", "score": 15 },
  "rooms": {
    "cellar":  { "exits": { "up": { "to": "kitchen" } }, "items": ["lamp"] },
    "kitchen": { "exits": { "down": { "to": "cellar" }, "north": { "to": "attic" },
                            "east": { "to": "vault", "locked_by": "iron-key" } },
                 "items": ["iron-key"] },
    "attic":   { "dark": true, "exits": { "south": { "to": "kitchen" } }, "items": ["coin"] },
    "vault":   { "exits": { "west": { "to": "kitchen" } }, "items": ["crown"] }
  },
  "items": {
    "lamp":     { "kind": "light", "name": "brass lamp", "charges": 5 },
    "iron-key": { "kind": "key", "name": "iron key" },
    "coin":     { "kind": "treasure", "name": "gold coin", "points": 5 },
    "crown":    { "kind": "treasure", "name": "silver crown", "points": 10 }
  }
}
\`\`\`

**Rules.** A *turn* is any \`go\`, \`take\`, \`drop\` or \`use\` that succeeds, and a failed attempt costs nothing. A lit light loses one charge on every successful \`go\` and goes out at zero. In a dark room with no lit light, \`look\` prints \`It is pitch dark.\` and \`take\` fails. Using a key unlocks the matching exit of the current room. Treasure scores its points the first time it is taken. The game is won when you are in the goal room with at least the goal score.

**Constraints.** Use the standard library only. The \`Game\` class never calls \`print\` or \`input\`, so it can be driven by a script as easily as by a person. pytest arrives in the next module, so reuse the \`check\` function from MP 1.`,
      setup: {
        extensions: ['ms-python.python'],
        toolchain: [
          pythonInstall,
          'No packages to install: `json`, `argparse`, `pathlib`, `dataclasses` and `typing` all ship with Python.',
        ],
        structure: `pyquest/
├── play.py                # three lines: import main, run it, exit with its code
├── run_checks.py          # all of your checks
├── pyquest/
│   ├── __init__.py
│   ├── world.py           # Room, Exit, Item and its subclasses, load_world, WorldError
│   ├── game.py            # Game: the state and the rules
│   ├── commands.py        # parse_command and the Command dataclass
│   ├── ui.py              # the UI protocol, ConsoleUI and ScriptUI
│   └── cli.py             # main(argv=None) -> int, built with argparse
├── worlds/                # tiny.json and lighthouse.json
└── walkthroughs/          # tiny.txt and lighthouse.txt, one command per line`,
        commands: [
          { label: 'Validate a world file', command: 'python play.py check worlds/tiny.json' },
          { label: 'Play a world', command: 'python play.py play worlds/lighthouse.json' },
          { label: 'Replay a walkthrough and print the transcript', command: 'python play.py play worlds/tiny.json --script walkthroughs/tiny.txt' },
          { label: 'Run all of your checks', command: 'python run_checks.py' },
        ],
      },
      requirements: [
        '`load_world(path)` builds a `World` from dataclasses and raises a custom `WorldError` that lists every problem found, each with a dotted location such as `rooms.kitchen.exits.east: unknown room "vaultt"`.',
        'Validation rejects an exit to an unknown room, a room listing an unknown item, a `locked_by` naming something that is not a key, an item placed in two rooms, a missing `start` or goal room, and any room that cannot be reached from `start`, found with a worklist and a set.',
        '`Item` is a base class with `Light`, `Key` and `Treasure` subclasses that each override `use(game)`. Adding a new kind takes one new subclass and one entry in an `ITEM_KINDS` dictionary, with no `if` chain on the kind.',
        '`parse_command(text)` is pure and returns a frozen `Command(verb, noun)` dataclass. It understands `go`, `take`, `drop`, `use`, `look`, `inventory`, `score`, `save`, `help` and `quit`, plus the short forms `n`, `s`, `e`, `w`, `u`, `d`, `i`, `l` and `get`, ignoring case and extra spaces.',
        'Items can be named by id or by display name, and unknown commands or items print a helpful message and cost no turn.',
        '`UI` is a `typing.Protocol` with `say(text)` and `ask(prompt)`. `ConsoleUI` uses the keyboard, and `ScriptUI` takes a list of commands and records everything said. `Game` receives its UI as a constructor argument.',
        'Save files are JSON and hold only state: world title, current room, inventory, the items in each room, unlocked exits, lit lights with their charges, scored items and turn count. Loading a save made for a different world fails with a clear message.',
        '`cli.py` uses `argparse` subcommands `play`, `check` and `map`, where `map` prints every room and its exits. `play` accepts `--script FILE` and `--load FILE`. `main` returns 0 on success and 1 for an invalid world or save, and argparse handles bad usage with exit code 2.',
        'A second world, `worlds/lighthouse.json`, has at least 8 rooms, 6 items, 2 locked exits and 1 dark room, and `walkthroughs/lighthouse.txt` wins it.',
        '`run_checks.py` holds at least 30 checks, covers every acceptance test below, and uses `ScriptUI` so that no check needs a person at the keyboard.',
      ],
      acceptanceTests: [
        'On `tiny.json`, the commands `take lamp`, `use lamp`, `go up`, `take iron-key`, `go north`, `take coin`, `go south`, `use iron-key`, `go east`, `take crown` win the game in 10 turns with 15 points, and the lamp has 1 charge left.',
        '`go up` then `go east` with no key prints a message containing `locked`, leaves you in the kitchen, and uses only the 1 turn from `go up`. `use lamp` before taking the lamp fails and costs no turn.',
        '`take lamp`, `go up`, `go north` leaves you in the dark attic with an unlit lamp: `look` prints `It is pitch dark.` and `take coin` fails. After `use lamp`, `take coin` succeeds, giving 5 turns and 5 points.',
        'Taking a treasure, dropping it and taking it again scores its points once: in the attic with a lit lamp, the sequence `take coin`, `drop coin`, `take coin` leaves the score at 5.',
        'With 5 charges, `take lamp`, `use lamp`, then `go up`, `go down`, `go up`, `go down`, `go up` prints a message that the lamp has gone out, and the attic is then dark.',
        'Saving after the first 5 commands of the winning walkthrough and loading into a new `Game` lets the other 5 commands win with the same 10 turns and 15 points. Editing `tiny.json` so that east leads to `"vaultt"` makes `check` exit with code 1 and print the location of the problem.',
      ],
      stretchGoals: [
        'Add a `Container` item kind, such as a chest that holds other items, using only a new subclass and one `ITEM_KINDS` entry.',
        'Add a `map --dot` option that writes the world as a Graphviz file you can render into a picture.',
      ],
    },
  ],
  finalProject: {
    slug: 'final-noteseek',
    title: 'noteseek: ranked search for your own notes, in the terminal and the browser',
    repoName: 'noteseek',
    summary: 'Build a full-text search engine for a folder of notes, with phrase queries, relevance ranking and incremental indexing, that also exports a searchable single-file web page.',
    language: 'Python 3.12 and JavaScript',
    estimatedHours: 40,
    overview: `Most people have a folder of notes, and \`grep\` is a poor way to search it. It gives you every line that matches in no useful order, and it rereads every file each time. \`noteseek\` is the tool you would build instead: point it at a folder of Markdown or text files, and it builds an index and answers questions like \`graph "shortest path" -dijkstra\` almost at once, with the best note first and a snippet showing why it matched.

The core is an **inverted index**: a dictionary from each word to the notes containing it and the positions within them. Everything else is engineering around that one idea. The index is stored as JSON shards keyed by the first two letters of a term, so a query loads only a few small files and not the whole index. Re-indexing touches only the files that changed.

The hook is the last step. \`noteseek export\` writes one HTML file containing your index and a small JavaScript search engine. You can email that file or put it on GitHub Pages, and it searches your notes with no server. Writing the same tokeniser and ranking in a second language, and proving that the two agree, is the best test there is of whether your design was clear.

The project uses every module of the course. It is packaged properly, tested with pytest, and backed by real measurements of what the index costs and what it saves. A person should be able to clone it, run one command on the included demo notes, and search them within five minutes.

**Scoring.** For each query term in a note, add $(1 + \\ln tf) \\cdot \\ln(1 + N/df)$, where $tf$ counts the term in that note, $df$ is the number of notes containing it, and $N$ is the number of notes. **Tokens** are runs of lowercase letters and digits, as decided by \`str.isalnum\`, so \`Don't\` becomes \`don\` and \`t\`.`,
    setup: {
      extensions: ['ms-python.python', 'charliermarsh.ruff', 'ms-python.debugpy', 'github.vscode-github-actions'],
      toolchain: [
        pythonInstall,
        'Create a virtual environment with `python -m venv .venv` and activate it with `.venv\\Scripts\\Activate.ps1`, or `source .venv/bin/activate` on macOS or Linux. If PowerShell blocks the script, run `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned` once.',
        'Install Node.js LTS from nodejs.org to test the JavaScript engine outside the browser.',
        'Install Git and create a free GitHub account for the repository, CI and GitHub Pages.',
      ],
      structure: `noteseek/
├── src/noteseek/
│   ├── tokenize.py        # the tokeniser, the one piece mirrored in JavaScript
│   ├── index.py           # building, updating and loading the sharded index
│   ├── query.py           # parsing queries into dataclasses, and evaluating them
│   ├── rank.py            # the Ranker protocol and two rankers
│   ├── snippets.py        # picking and highlighting the best passage
│   ├── export.py          # writes the single-file HTML page
│   └── cli.py             # main(argv=None) -> int
├── web/engine.js          # search engine used by the exported page
├── web/template.html
├── tests/                 # pytest suite
├── tests/cases/           # JSON cases shared by the Python and JavaScript tests
├── tests/js/check_engine.js
├── bench/                 # corpus generator and doubling experiments
├── demo-notes/            # public-domain notes to try it on
├── docs/PERFORMANCE.md
├── pyproject.toml
├── .github/workflows/ci.yml
└── README.md`,
      commands: [
        { label: 'Install the project and its development tools', command: 'pip install -e ".[dev]"' },
        { label: 'Index the demo notes and search them', command: 'noteseek index demo-notes; noteseek search "binary search"' },
        { label: 'Run the tests with coverage', command: 'pytest --cov=noteseek --cov-report=term-missing' },
        { label: 'Check style and types', command: 'ruff check .; black --check .; mypy src' },
        { label: 'Export the web page and test its engine', command: 'noteseek export demo-notes --html site/index.html; node tests/js/check_engine.js' },
        { label: 'Run the doubling experiment', command: 'python bench/doubling.py --sizes 625 1250 2500 5000' },
      ],
    },
    requirements: [
      '`noteseek index DIR` finds every `.md` and `.txt` file with `pathlib`, and stores a positional inverted index under `DIR/.noteseek/` as JSON shards named by the first two letters of each term, plus a manifest recording each file\'s size and modification time.',
      'Re-indexing reads only added or changed files, removes deleted ones, and prints the counts. The result must equal a full rebuild.',
      'The query language supports plain words (all must match), `OR` between words, `-word` to exclude, and `"quoted phrases"` matched by position. Queries parse into dataclasses, and a malformed query such as an unclosed quote gives a message with the character position and exit code 2.',
      '`rank.py` defines a `Ranker` protocol with two implementations: `TfIdfRanker`, using the formula above, and `TitleBoostRanker`, which doubles the contribution of terms in the first line of a note. `--ranker` chooses between them.',
      '`noteseek search` prints the rank, score to 3 decimal places, path and a snippet of about 20 words around the best match, with matches highlighted when writing to a terminal. `--json` prints structured output, and `--limit N` caps the results.',
      'Files that are not valid UTF-8 are skipped with a warning on stderr and never stop indexing. A custom `NoteseekError` hierarchy maps failures to documented exit codes, and all logic sits in pure functions or small classes apart from the I/O layer.',
      '`noteseek stats` prints the number of notes, tokens and distinct terms, the 10 most common terms, and the index size on disk.',
      '`noteseek export DIR --html FILE` writes one self-contained page with no network requests. Its `web/engine.js` reimplements the tokeniser, query parsing and `TfIdfRanker`, and the shared cases in `tests/cases/` must give identical ranked results in Python and in Node.',
      'The project uses a `src` layout, `pyproject.toml` with a `noteseek` console script, a pinned development environment, at least 60 pytest tests at 85% coverage or higher with parametrised and `tmp_path` tests, and passes `ruff`, `black` and `mypy`.',
      '`docs/PERFORMANCE.md` has a doubling experiment comparing the index with a `--scan` mode that rereads every file, one `cProfile` finding that led to a measured improvement, and index memory measured with `tracemalloc` and explained using what you learned about Python objects.',
    ],
    acceptanceTests: [
      'Index three notes: `a.md` is `Binary search halves the range. Binary search needs sorted data.`, `b.md` is `Hash tables give fast lookup. Search in a hash table is fast.`, and `c.md` is `Sorted lists make binary lookup easy.` Then `stats` reports 3 notes, 28 tokens and 20 distinct terms.',
      'On those notes, `search OR lookup` returns `b.md` (1.833), `a.md` (1.551), `c.md` (0.916), in that order.',
      'On those notes, `binary search` returns only `a.md`, `sorted -search` returns only `c.md`, the phrase `"binary search"` returns `a.md`, and the phrase `"search binary"` returns nothing with exit code 0.',
      'The text `Don\'t panic: C3PO\'s naïve café, 42!` tokenises to `don`, `t`, `panic`, `c3po`, `s`, `naïve`, `café`, `42` in both Python and JavaScript.',
      'Index 100 generated notes, then edit one, delete one and add one: the next `index` run reports `1 added, 1 changed, 1 deleted, 98 unchanged`, and every query in `tests/cases/` gives the same results as a fresh full index.',
      'On a generated corpus of 5,000 notes of 200 words each, a two-word query opens no more than 2 shards plus the manifest, finishes in under 200 ms inside `main`, and is at least 10 times faster than `--scan`.',
    ],
    coverage: [
      { module: 'getting-started', demonstrates: 'The tokeniser, snippets and result lines are built from string indexing, slicing, methods and f-string format specifiers.' },
      { module: 'control-flow-functions', demonstrates: 'The query parser is a hand-written loop over characters, and every step of the pipeline is a small documented function.' },
      { module: 'data-collections', demonstrates: 'The inverted index is a dictionary of dictionaries of position lists, and query evaluation uses set union, intersection and difference.' },
      { module: 'programs-and-files', demonstrates: 'JSON shards, `pathlib`, UTF-8 handling, custom exceptions, `argparse` subcommands and exit codes make it a real command-line program.' },
      { module: 'objects-and-abstraction', demonstrates: 'Queries are dataclasses, rankers sit behind a `Protocol`, and the index is injected into the search code so that it can be tested.' },
      { module: 'testing-debugging-tooling', demonstrates: 'The pytest suite, coverage target, virtual environment, `pyproject.toml`, linters, git history and CI show the professional workflow.' },
      { module: 'thinking-like-an-engineer', demonstrates: 'The doubling experiment, `cProfile` and `tracemalloc` work, the one-page design and the JavaScript port apply estimation, decomposition and a second language.' },
    ],
    portfolio: [
      'The README opens with a short terminal recording, then a link to a live demo page on GitHub Pages searching the demo notes.',
      'A stranger can clone the repository and get search results from `demo-notes/` in under five minutes by following the README.',
      'GitHub Actions runs `ruff`, `mypy`, pytest and the Node engine test on every push, with a status badge in the README.',
      'The repository has a LICENSE, a tagged `v1.0.0` release, a CHANGELOG, and a commit history made of small, descriptive commits on feature branches.',
      'The README shows the table from `docs/PERFORMANCE.md` and a one-page design section explaining the shards and the choice of tokeniser.',
    ],
    stretchGoals: [
      'Add BM25 as a third ranker, and compare its results with TF-IDF on 10 queries you judge by hand.',
      'Rewrite the tokeniser as a small C function called through `ctypes`, and measure the indexing speedup.',
      'Add a `noteseek watch` command that re-indexes when files change.',
    ],
  },
});
