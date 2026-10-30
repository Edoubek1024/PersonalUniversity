import { defineCoursework } from '../define';

const webExtensions = ['dbaeumer.vscode-eslint', 'esbenp.prettier-vscode'];
const nodeToolchain = [
  'Install the current LTS release of Node.js (22 or newer) with the Windows installer from nodejs.org, which includes npm. Everything in this course runs natively on Windows 10, so WSL is not needed.',
  'Confirm the install in the VS Code terminal with `node --version` and `npm --version`.',
];

export default defineCoursework({
  subjectId: 'typescript-web',
  machineProblems: [
    {
      slug: 'mp1-chainq',
      title: 'chainq: an immutable query library in plain JavaScript',
      afterModule: 'modern-javascript',
      coversModules: ['modern-javascript'],
      summary: 'Write a small chainable query library for arrays of objects using only closures, array methods and Map, with a test suite run by node --test.',
      language: 'JavaScript (ES2023) on Node.js 22 or newer',
      estimatedHours: 6,
      overview: `Module 1 is about how JavaScript really behaves: objects compared by identity, closures holding state, \`this\` that depends on the call, shallow copies, and a default sort that compares strings. \`chainq\` makes you rely on all of it. You will write a small library that queries arrays of plain objects:

\`\`\`js
from(rows).where({ dept: 'eng' }).orderBy('salary', 'desc').limit(2).toArray();
\`\`\`

Every step returns a **new** query, so a partly built query can be reused safely, like a value. The input is never touched, and the tests prove it by passing in deep-frozen data.

**Constraints.** Plain JavaScript in ES modules, with no TypeScript and no runtime dependencies. Do not use \`class\` or \`this\`: the whole library is factory functions and closures. That is what lets a method be pulled off a query and still work. Use only the Node test runner and \`node:assert/strict\`.`,
      setup: {
        extensions: webExtensions,
        toolchain: nodeToolchain,
        structure: `chainq/
├── src/query.js           # from(): the immutable query object
├── src/demo.js            # a short script using the library
├── src/aggregates.js      # count, sum, avg, min, max
├── test/query.test.js     # acceptance tests
├── test/fixtures.js       # the sample rows, deep-frozen
└── package.json           # "type": "module", "test": "node --test"`,
        commands: [
          { label: 'Run a quick demo', command: 'node src/demo.js' },
          { label: 'Run the tests', command: 'npm test' },
          { label: 'Rerun the tests on save', command: 'node --test --watch' },
        ],
      },
      requirements: [
        '`from(rows)` returns a query object with `where`, `select`, `orderBy`, `limit`, `groupBy`, `aggregate` and `toArray`, and the package uses named ES module exports with no dependencies.',
        'The code contains no `class` and no `this`, so a method destructured from a query works exactly like one called on it.',
        'Every method except `toArray` returns a new query, and neither the source query nor the input rows ever change, even when the input is deep-frozen.',
        '`where` accepts a predicate function, or an object whose fields must all match using `===`.',
        '`select(...fields)` returns new rows holding only the named fields, and a field missing from a row is left out of that row.',
        '`orderBy(field, direction)` defaults to ascending, compares numbers numerically and strings with `<`, is stable, and always places `null` and `undefined` values last in both directions.',
        'When `orderBy` is chained, the later call is the primary key, and ties keep the order set by the earlier one.',
        '`groupBy(field).aggregate(spec)` uses a `Map` so that `0`, `"0"` and `null` are separate groups, and it returns one row per group in first-seen order. `aggregate` without `groupBy` returns a single row.',
        '`count()`, `sum(field)`, `avg(field)`, `min(field)` and `max(field)` ignore `null` and `undefined` values. `sum` of nothing is 0, while `avg`, `min` and `max` of nothing are `null`.',
        'Bad arguments throw a `TypeError` naming the method: `limit(-1)`, `orderBy("x", "up")`, `select()` with no fields, and `aggregate` with an empty spec.',
      ],
      acceptanceTests: [
        'The fixture has 5 rows of `{ id, name, dept, salary }`: `1 Ada eng 120`, `2 Bo ops 80`, `3 Cy eng 100`, `4 Di ops 80` and `5 Ed art null`. `where({ dept: "eng" }).select("name")` returns `[{ name: "Ada" }, { name: "Cy" }]`.',
        '`orderBy("salary", "desc")` gives ids `[1, 3, 2, 4, 5]`, and `orderBy("salary")` gives `[2, 4, 3, 1, 5]`. The null salary is last both times, and ids 2 and 4 keep their input order.',
        '`groupBy("dept").aggregate({ n: count(), total: sum("salary"), mean: avg("salary") })` returns `[{ dept: "eng", n: 2, total: 220, mean: 110 }, { dept: "ops", n: 2, total: 160, mean: 80 }, { dept: "art", n: 1, total: 0, mean: null }]`.',
        'With `const base = from(rows)`, building `base.where({ dept: "eng" }).limit(1)` leaves `base.toArray().length` at 5, and no `TypeError` is thrown when `rows` and every row are frozen with `Object.freeze`.',
        '`const { where } = from(rows); where({ dept: "art" }).toArray()` returns the single row with id 5.',
        '`from([{ k: 0 }, { k: "0" }, { k: null }, { k: 0 }]).groupBy("k").aggregate({ n: count() })` returns 3 rows with `n` values `[2, 1, 1]`.',
      ],
      stretchGoals: [
        'Add `join(otherQuery, leftField, rightField)` as a hash join built on `Map`.',
        'Make the pipeline lazy, so that nothing is computed until `toArray` and the result is cached.',
      ],
    },
    {
      slug: 'mp2-shelfsearch',
      title: 'shelfsearch: a race-free book search with no framework',
      afterModule: 'browser-and-async',
      coversModules: ['typescript-types', 'browser-and-async'],
      summary: 'Build a typed, keyboard-friendly search box over the Open Library API, with debouncing, cancellation, caching and a state machine you can test without a browser.',
      language: 'TypeScript 5 or newer, in the browser',
      estimatedHours: 8,
      overview: `A search box looks like a beginner's project, yet doing it properly touches everything hard about front-end code. Requests must be debounced, stale responses must never win, an unreliable API must produce clear errors, and untrusted text must never become HTML.

\`shelfsearch\` calls the public Open Library search API, which needs no key and allows browser requests. You will separate the program into three parts: a parser that turns \`unknown\` JSON into typed books, a controller that owns timing and cancellation and exposes a discriminated union of states, and a view that renders a state to the DOM. The controller never touches the DOM, and \`fetchBooks\` is injected, so the hardest logic can be tested with fake timers and stubbed responses.

**Constraints.** Strict TypeScript with no \`any\`. No UI framework and no runtime dependencies. Tests use Vitest, and the view tests use jsdom. Tests must never touch the real network. Everything used here was taught in modules 1 to 3.`,
      setup: {
        extensions: webExtensions,
        toolchain: [
          ...nodeToolchain,
          'Create the project with `npm create vite@latest shelfsearch -- --template vanilla-ts`, then run `npm install -D vitest jsdom`.',
        ],
        structure: `shelfsearch/
├── index.html
├── src/main.ts            # wires the controller to the page
├── src/api.ts             # fetchBooks and parseSearchResponse
├── src/search.ts          # createSearch(): debounce, abort, cache
├── src/state.ts           # the SearchState discriminated union
├── src/view.ts            # renders a state to the DOM
├── test/api.test.ts
├── test/search.test.ts    # fake timers and a stubbed fetchBooks
├── test/view.test.ts      # starts with // @vitest-environment jsdom
└── tsconfig.json          # "strict": true`,
        commands: [
          { label: 'Start the dev server', command: 'npm run dev' },
          { label: 'Run the tests once', command: 'npx vitest run' },
          { label: 'Check types', command: 'npx tsc --noEmit' },
          { label: 'Build for production', command: 'npm run build' },
        ],
      },
      requirements: [
        '`tsconfig.json` has `"strict": true`, `npx tsc --noEmit` reports 0 errors, and the source contains no `any` and no `as` beyond narrowing an object to a record.',
        '`SearchState` is a discriminated union of `idle`, `loading`, `ok`, `empty` and `error`, and the view handles it with a `switch` that has a `never` exhaustiveness check.',
        '`parseSearchResponse(data: unknown)` returns a `Result`. It drops documents without a string `title` or `key`, uses `["Unknown author"]` when `author_name` is missing, uses `null` for a missing `first_publish_year`, and returns an error when `docs` is not an array.',
        'Requests go to `https://openlibrary.org/search.json` with `q` encoded by `encodeURIComponent`, `fields=key,title,author_name,first_publish_year` and `limit=10`.',
        'Queries are trimmed and debounced by 250 ms, and a query shorter than 2 characters moves to `idle` without sending a request.',
        'Each new request aborts the previous one, each request has an 8 second timeout through `AbortSignal.timeout`, and a stale or aborted result can never change the state.',
        'A non-2xx response, a network failure, a timeout and a malformed body each produce an `error` state with a distinct message, and a Retry button sends the same query again.',
        'Successful results are cached in a `Map` of at most 50 queries that evicts the oldest entry, so repeating a query sends no request.',
        'Results render through `createElement` and `textContent` only, and one delegated listener on the list handles clicks.',
        'ArrowUp and ArrowDown move a highlighted row with wrap-around, Enter opens that book on openlibrary.org in a new tab, and Escape clears the input and returns to `idle`.',
      ],
      acceptanceTests: [
        'Parsing `{ docs: [{ key: "/works/OL1W", title: "Dune", author_name: ["Frank Herbert"], first_publish_year: 1965 }, { key: "/works/OL2W", title: "Anon" }, { key: "/works/OL3W" }] }` gives 2 books: the second has authors `["Unknown author"]` and year `null`, and the third is dropped. Parsing `{ docs: "nope" }` gives an error result.',
        'With fake timers, setting the query to `du`, `dun` and `dune` 50 ms apart and then advancing 250 ms calls `fetchBooks` exactly once, with `dune`. Setting the query to `d` calls it 0 times and gives `idle`.',
        'Query `du` resolves after 500 ms and query `dune` resolves after 100 ms. The final state is `ok` for `dune`, the `du` signal has `aborted === true`, and the state never shows `du` results.',
        'A stub that rejects with `HTTP 503` gives an `error` state whose message contains `503`. Calling `retry()` with the stub now succeeding gives `ok`.',
        'Searching `dune`, then `dun`, then `dune` again calls `fetchBooks` 2 times, not 3.',
        'Under jsdom, rendering a book titled `<img src=x onerror=alert(1)>` leaves `container.querySelector("img")` as `null`, and the title appears as literal text.',
      ],
      resources: [
        {
          title: 'Open Library Search API',
          url: 'https://openlibrary.org/dev/docs/api/search',
          type: 'documentation',
          cost: 'free',
          provider: 'Internet Archive',
          note: 'The fields and parameters used by this MP. Be polite with request rates.',
        },
      ],
      stretchGoals: [
        'Add a `sort` option and keep the query and sort in the URL, so that the back button works.',
        'Group search history into a dropdown stored in `localStorage`, with a parser for the stored data.',
      ],
    },
  ],
  finalProject: {
    slug: 'final-hooklens',
    title: 'hooklens: a local webhook inspector and replayer',
    repoName: 'hooklens',
    summary: 'A small developer tool that captures any HTTP request sent to it, shows requests in a live typed UI, diffs two of them, and replays them to your code.',
    language: 'TypeScript 5 or newer on Node.js 22 or newer',
    estimatedHours: 16,
    overview: `Anyone who has integrated with Stripe, GitHub or Slack knows the pain of webhooks. They arrive once, in a format the docs only half describe, and when your handler fails you must trigger the real event again to retry. Hosted inspection sites exist, but they mean sending your payloads to a third party.

\`hooklens\` is the local version: one command starts a server, and anything sent to \`http://127.0.0.1:4000/hook/<channel>\` is captured to disk. A browser UI shows requests as they arrive, compares two captures to reveal what changed, and replays any capture at your local handler, so you can fix a bug and retry in seconds. A single "copy as curl" button turns any capture into a shell command.

The design has real decisions. A body might be JSON, a form, text or binary, and your types must represent that honestly. Storage is append-only JSON Lines that must survive a crash mid-write. Client and server share one contract, but neither trusts it at runtime. Because replaying sends data to any URL, the tool has to be safe by default, which is why it binds to loopback only.

**Constraints.** No web framework on either side: \`node:http\` on the server and the DOM in the browser. Strict TypeScript with no \`any\`. No database and no paid services. You may reuse your \`mapLimit\`, debounce and parser code from earlier work.`,
    setup: {
      extensions: [...webExtensions, 'humao.rest-client', 'github.vscode-github-actions'],
      toolchain: [
        ...nodeToolchain,
        'Install dev dependencies with `npm install -D typescript tsx vite vitest jsdom @types/node`.',
        'Windows PowerShell may alias `curl` to a different command. Use `curl.exe`, or the REST Client extension and a `.http` file, to send test requests.',
      ],
      structure: `hooklens/
├── shared/api.ts          # types and parsers used by both sides
├── server/app.ts          # createApp(deps): routing and handlers
├── server/capture.ts      # turns a raw request into a typed Capture
├── server/store.ts        # JSON Lines storage and recovery
├── server/replay.ts       # sends a capture to a target URL
├── server/main.ts         # reads options and calls listen
├── web/index.html
├── web/main.ts            # polling and the app state
├── web/view.ts            # DOM rendering
├── web/diff.ts            # pure diff of two captures
├── web/curl.ts            # pure toCurl()
├── test/                  # unit tests and black-box API tests
├── .github/workflows/ci.yml
└── README.md`,
      commands: [
        { label: 'Run the server and UI in development', command: 'npm run dev' },
        { label: 'Check types', command: 'npx tsc --noEmit' },
        { label: 'Run all tests', command: 'npx vitest run' },
        { label: 'Build and start the production version', command: 'npm run build && npm start' },
      ],
    },
    requirements: [
      'Any method sent to `/hook/<channel>`, where the channel matches `[a-z0-9-]{1,40}`, is stored with an id, timestamp, method, path, query, headers and body, and answered with `200` and `{ "id": ... }`. A bad channel gets `400`, and a body over 1 MiB gets `413` and stores nothing.',
      'The stored body is a discriminated union on `kind`: `json` when the content type is JSON and it parses, `form` for URL-encoded forms, `text` for other text and for JSON that fails to parse, and `binary` as base64 otherwise.',
      'Captures are appended to `data/<channel>.jsonl`. Restarting restores them, and a truncated line is skipped, counted and reported rather than treated as fatal.',
      'The API offers `GET /api/channels`, `GET /api/channels/:channel/captures?after=<id>&limit=<n>`, `GET /api/captures/:id`, `DELETE /api/channels/:channel` and `POST /api/captures/:id/replay`, and every error uses the shape `{ "error": { "code", "message" } }`.',
      '`shared/api.ts` holds the types and runtime parsers for every API payload, both sides use it, and `npx tsc --noEmit` passes with `strict` on and no `any`.',
      'Replay sends the stored method, body and headers, minus `host`, `content-length` and `connection`, to an `http` or `https` target. It has a configurable timeout (5 seconds by default) and returns `{ status, ms, bodyPreview }` or a typed timeout or network failure.',
      'The UI uses no framework, polls with `?after=` every 2 seconds, aborts any in-flight poll before starting another, and stops polling while the tab is hidden. It shows a clear banner when the server cannot be reached.',
      'Selecting two captures shows a diff of their headers and of their JSON bodies by key path, computed by a pure function.',
      '`toCurl(capture)` is a pure function producing a command that is safe to paste into Bash, and all captured data reaches the page through `textContent`, never `innerHTML`.',
      'The server binds to `127.0.0.1` unless `--host` is given, and `authorization` and `cookie` header values are hidden in the UI until the user clicks to reveal them.',
    ],
    acceptanceTests: [
      'A `POST` to `/hook/demo` with content type `application/json` and body `{"a":1}` returns 200, and listing captures then shows one capture whose body is `{ kind: "json", value: { a: 1 } }`. The same request with body `{oops` is stored with `kind: "text"`.',
      'A body of exactly 1,048,576 bytes is accepted. A body of 1,048,577 bytes gets 413, and the number of lines in the channel file does not change.',
      'After 3 captures, appending `{"id":` to the file and creating a new app over the same directory returns 3 captures with `skippedLines` equal to 1, and a fourth capture is still readable after another restart.',
      'Replaying a capture at a test server on port 0 delivers the same method, body and a custom `x-demo` header, and does not forward the original `host` header. With a target that never responds and a 200 ms timeout, replay returns the timeout failure in under 1 second.',
      '`toCurl` on a `POST` to `http://x/y` with body `it\'s` produces a command containing `--data-raw \'it\'\\\'\'s\'`, and running that command in Bash against a test server delivers exactly `it\'s`.',
      'The diff of `{ "a": 1, "b": { "c": 2 } }` and `{ "a": 1, "b": { "c": 3 }, "d": 4 }` reports exactly `b.c` as changed from 2 to 3 and `d` as added.',
    ],
    coverage: [
      { module: 'modern-javascript', demonstrates: 'The diff and curl functions are pure data transformations using closures, Map and non-mutating array methods.' },
      { module: 'typescript-types', demonstrates: 'Discriminated unions model bodies and failures, and parsers turn unknown JSON into typed values at every boundary.' },
      { module: 'browser-and-async', demonstrates: 'The no-framework UI uses event delegation, safe DOM rendering, and polling with fetch, cancellation and timeouts.' },
      { module: 'full-stack-typescript', demonstrates: 'The node:http API with limits, durable JSON Lines storage, a shared contract and black-box tests on an ephemeral port.' },
    ],
    portfolio: [
      'The README opens with a GIF of a request arriving, being diffed and being replayed, and gives a quick start of three commands or fewer.',
      'GitHub Actions runs `tsc --noEmit` and the tests on Windows and Ubuntu on every push, with a status badge in the README.',
      'The repository has a LICENSE and a tagged `v1.0.0` release, and it runs through `npx` or a clone followed by `npm start`.',
      'A security section in the README explains the loopback default and what data is stored on disk.',
      'A design section explains the choice of JSON Lines and polling, and what you would change for a team-hosted version.',
    ],
    stretchGoals: [
      'Replace polling with server-sent events and compare the code and behaviour.',
      'Add response rules, so a channel can return a chosen status, delay or body to test how senders handle failure.',
    ],
  },
});
