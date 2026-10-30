import { defineSubject } from '../define';

export default defineSubject({
  id: 'typescript-web',
  title: 'TypeScript for the Web',
  category: 'cs',
  tagline:
    'Modern JavaScript and TypeScript for people who can already program: the language, the browser, async code, and a typed front end talking to a Node API.',
  description: `This is a short course for people who can already program in some language, such as Python from Programming Fundamentals, and now want to build for the web. It assumes you are comfortable with functions, loops, collections and classes, so it never explains what a variable is. It teaches what is distinct about JavaScript and TypeScript instead: the equality and scoping rules that surprise newcomers, closures and \`this\`, a structural type system that disappears at runtime, the single-threaded event loop, and a browser that hands you a live tree of objects.

The course has four modules. You start with modern JavaScript, add TypeScript's type system, move into the DOM and asynchronous code with \`fetch\`, and finish with a small typed front end and a Node HTTP API that share their types. No framework is required. You will write the DOM updates and HTTP routing by hand, so that when the last lesson introduces React you will know exactly what it is doing for you.

Two machine problems and a final project turn the lessons into software you can run, test and put on GitHub.`,
  difficulty: 'intermediate',
  estimatedHours: 30,
  prerequisites: ['programming-fundamentals'],
  recommendedBackground: [
    'Comfortable writing functions, loops and classes in at least one language',
    'Basic Git and terminal use',
    'A rough idea of what an HTTP request and response are',
  ],
  tags: ['short course', 'typescript', 'javascript', 'web', 'browser', 'node'],
  core: false,
  modules: [
    {
      slug: 'modern-javascript',
      title: 'Modern JavaScript for Programmers',
      description:
        'The parts of JavaScript that behave differently from other languages: values and equality, closures and this, and the object, array and module idioms you will use everywhere.',
      lessons: [
        {
          slug: 'values-equality-and-scope',
          title: 'Values, equality and scope',
          summary:
            'What JavaScript values really are, why === is the only equality you want, and how block scope and truthiness catch people out.',
          estimatedMinutes: 75,
          objectives: [
            'Name the primitive types and explain why arrays and functions are objects',
            'Predict the result of comparisons between primitives and between objects',
            'Explain why 0.1 + 0.2 !== 0.3 and when to reach for bigint or integer cents',
            'Choose between ??, || and ?. when handling missing values',
            'Explain block scope, const bindings and the temporal dead zone',
          ],
          concepts: [
            'Seven primitive types plus object',
            'number as a 64-bit IEEE 754 double',
            'Strict equality and object identity',
            'NaN and Number.isNaN',
            'Truthy and falsy values',
            'Nullish coalescing (??) and optional chaining (?.)',
            'let, const and block scope',
            'Temporal dead zone',
            'Strings as UTF-16 code units',
          ],
          explanation: `You already know what a variable and a loop are, so this lesson covers only the places where JavaScript differs from what you expect. Install Node.js (the current LTS release), type \`node\` to open a REPL, and test every claim below yourself.

**Values.** There are seven primitive types (\`string\`, \`number\`, \`bigint\`, \`boolean\`, \`undefined\`, \`null\`, \`symbol\`) and everything else is an object, including arrays and functions. A \`number\` is always a 64-bit IEEE 754 double, so \`0.1 + 0.2 === 0.3\` is false, and integers stop being exact above \`Number.MAX_SAFE_INTEGER\` ($2^{53} - 1$). Use integer cents for money and \`bigint\` (written \`10n\`) for exact large integers. Strings are sequences of UTF-16 code units, which is why \`'\\u{1F600}'.length\` is 2 even though you see one character.

**Equality.** \`===\` compares primitives by value and objects by identity, so \`[1] === [1]\` is false: those are two different objects. \`==\` applies coercion rules that nobody memorises (\`'' == 0\` is true), so use \`===\` everywhere. The one trap left is \`NaN === NaN\`, which is false. Test with \`Number.isNaN\`.

**Truthiness.** The falsy values are \`false\`, \`0\`, \`0n\`, \`''\`, \`null\`, \`undefined\` and \`NaN\`. That makes \`const port = opts.port || 3000\` a bug when the caller passes 0. Use \`??\`, which falls back only on \`null\` or \`undefined\`. Use \`user?.address?.city\` to stop safely at a missing value.

**Scope.** \`let\` and \`const\` are block scoped. \`const\` fixes the binding, not the value, so \`const a = []; a.push(1)\` is legal. Reading a \`let\` before its declaration throws a \`ReferenceError\`; that region is the *temporal dead zone*. Older code uses \`var\`, which is function scoped. Read it, but never write it.

Skim the first chapters of javascript.info as fast as you can read them, and slow down only where something contradicts your current language. Use MDN as the reference.`,
          resources: [
            { title: 'The Modern JavaScript Tutorial', url: 'https://javascript.info/', type: 'textbook', cost: 'free', provider: 'javascript.info', note: 'Part 1, "JavaScript Fundamentals". Skim what you know, and read type conversions and comparisons closely.', primary: true },
            { title: 'JavaScript data types and data structures', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Data_structures', type: 'documentation', cost: 'free', provider: 'MDN', note: 'The reference for primitives, number precision and strings.' },
            { title: 'Equality comparisons and sameness', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Equality_comparisons_and_sameness', type: 'documentation', cost: 'free', provider: 'MDN', note: 'Covers ==, === and Object.is, with a full comparison table.' },
          ],
          exercises: [
            {
              slug: 'predict-then-run',
              title: 'Predict, then run',
              prompt:
                'On paper, predict the value of each expression, then check in the Node REPL: `[] === []`, `null == undefined`, `null === undefined`, `"5" * 2`, `"5" + 2`, `0.1 * 3`, `NaN === NaN`, `typeof null`, `typeof []`, `Number.MAX_SAFE_INTEGER + 2`. For every wrong prediction, write one sentence naming the rule you missed.',
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'defaults-without-bugs',
              title: 'Defaults that keep valid falsy values',
              prompt:
                'Write `withDefaults(opts)` returning `{ port, host, verbose }`, with defaults 3000, "localhost" and true. The call `withDefaults({ port: 0, verbose: false })` must return `{ port: 0, host: "localhost", verbose: false }`, and `withDefaults({ host: "" })` must keep the empty host. Write it once with `||`, show which of those two cases fail, then fix it with `??`.',
              kind: 'coding',
              difficulty: 1,
            },
            {
              slug: 'money-in-cents',
              title: 'Floating-point money',
              prompt:
                'Add 0.1 ten times in a loop and print the total (you should see 0.9999999999999999). Write `addPrices(prices)`, which takes strings such as `"19.99"`, converts each to integer cents without using floating-point multiplication, and returns the total as a string. `addPrices(["19.99", "0.01", "5.10"])` must return `"25.10"`.',
              kind: 'coding',
              difficulty: 2,
              hint: 'Split on the dot and combine the two integer parts. Pad the cents when you format the result.',
            },
          ],
          selfAssessment: [
            {
              question: 'Why is [1, 2] === [1, 2] false, and how would you actually compare two arrays?',
              answerOutline:
                '=== compares objects by identity and these are two distinct objects. Compare length and elements yourself, usually with every; node:assert has deepStrictEqual for tests.',
            },
            {
              question: 'What is the practical difference between a || b and a ?? b?',
              answerOutline:
                '|| falls back on any falsy value, including 0 and the empty string. ?? falls back only on null or undefined, so valid falsy values survive.',
            },
            {
              question: 'Does const make an object immutable?',
              answerOutline:
                'No. It prevents reassigning the binding. The object can still be mutated; Object.freeze gives shallow immutability.',
            },
          ],
          relatedLessons: ['programming-fundamentals/thinking-like-an-engineer/a-second-language'],
        },
        {
          slug: 'functions-closures-and-this',
          title: 'Functions, closures and this',
          summary:
            'Functions are values that remember where they were created, and this depends on how they are called. Both ideas run through all JavaScript code.',
          estimatedMinutes: 90,
          objectives: [
            'Use closures to hold private state without a class',
            'Predict the value of this from the call site',
            'Explain how arrow functions differ from function declarations and methods',
            'Fix a lost this with an arrow function or bind',
            'Write functions with default and rest parameters',
          ],
          concepts: [
            'First-class functions',
            'Closure: a function plus the variables it captured',
            'One new let binding per loop iteration',
            'this is set by the call site',
            'Arrow functions capture this lexically',
            'Function.prototype.bind',
            'Default and rest parameters',
            'Factory functions as an alternative to classes',
          ],
          explanation: `Functions are ordinary values: you pass them, return them and store them in objects. The important consequence is the **closure**. A function keeps access to the variables in scope where it was created, even after the enclosing function has returned.

\`\`\`js
function makeCounter() {
  let n = 0;
  return { inc: () => ++n, value: () => n };
}
const c = makeCounter();
c.inc(); c.inc();
c.value(); // 2, and nothing outside can touch n
\`\`\`

This is the standard way to get private state. Each call to \`makeCounter\` creates a fresh \`n\`. A \`for (let i = ...)\` loop also creates a new \`i\` for every iteration, so callbacks created in the loop each see their own value. With \`var\` they would all share one.

**\`this\`** is the part that differs most from Python, Java or C++. It is not fixed when you define a method. It is decided at each call by what is to the left of the dot.

\`\`\`js
const counter = { n: 0, inc() { this.n++; } };
counter.inc();          // this is counter
const f = counter.inc;
f();                    // TypeError in a module: this is undefined
\`\`\`

The same failure happens when you write \`button.addEventListener('click', counter.inc)\`, because the method is handed over without its object. You have three fixes. An **arrow function** has no \`this\` of its own and uses the one from the surrounding scope, so \`() => counter.inc()\` works. \`counter.inc.bind(counter)\` returns a function with \`this\` locked. Or avoid \`this\` altogether by using closures, as \`makeCounter\` does.

Use arrow functions for callbacks, and method syntax where you want \`this\` to mean the object. Read the javascript.info closure chapter fully, including its section on lexical environments, then the MDN \`this\` page as a reference.`,
          resources: [
            { title: 'Variable scope, closure', url: 'https://javascript.info/closure', type: 'textbook', cost: 'free', provider: 'javascript.info', note: 'The clearest explanation of lexical environments. Do the tasks at the end.', primary: true },
            { title: 'Object methods, "this"', url: 'https://javascript.info/object-methods', type: 'textbook', cost: 'free', provider: 'javascript.info', note: 'Follow it with the chapters on arrow functions and function binding.' },
            { title: 'Function binding', url: 'https://javascript.info/bind', type: 'textbook', cost: 'free', provider: 'javascript.info', note: 'Why methods lose this when passed as callbacks, and how bind fixes it.' },
            { title: 'this', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this', type: 'documentation', cost: 'free', provider: 'MDN', note: 'The full rules. Use it as a reference, not a tutorial.' },
          ],
          exercises: [
            {
              slug: 'once-and-memoize',
              title: 'once and memoize',
              prompt:
                'Write `once(fn)`, which runs `fn` on the first call and returns the stored result on every later call, and `memoize(fn)` for one-argument functions, backed by a `Map`. Test that a memoized function with a call counter runs only once for repeated input. Then call `memoize(f)(undefined)` twice and make sure `undefined` results are cached too.',
              kind: 'coding',
              difficulty: 1,
              hint: 'Use map.has(key), not the truthiness of map.get(key).',
            },
            {
              slug: 'lost-this-lab',
              title: 'Reproduce and fix a lost this',
              prompt:
                'Create a class `Timer` with a field `ticks = 0` and a method `tick()` that increments it. Pass `t.tick` to `[1, 2, 3].forEach`, and record the exact error. Fix it three ways: an arrow wrapper at the call site, `bind` in the constructor, and an arrow-function class field. In a comment, say what each fix costs in memory per instance.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'bank-account-closure',
              title: 'A private balance',
              prompt:
                'Write `createAccount(startCents)` returning `{ deposit, withdraw, balance }`, all as closures. `withdraw` throws an `Error` when funds are insufficient and leaves the balance unchanged. Show that `const { deposit, balance } = createAccount(100); deposit(50); balance()` returns 150 even though the methods were pulled off the object. Explain why a version using `this` would fail that test.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What does a closure capture: the value of a variable or the variable itself?',
              answerOutline:
                'The variable itself. Later changes are visible through the closure, which is why a counter closure can keep incrementing.',
            },
            {
              question: 'Why does element.addEventListener("click", obj.method) often fail?',
              answerOutline:
                'The method is passed without its object, so obj is not the receiver at call time and this is not obj. Use an arrow wrapper or bind.',
            },
            {
              question: 'When should you avoid an arrow function?',
              answerOutline:
                'When you need a this set by the call site, such as a method on an object literal or prototype that reads this. Arrows also cannot be used as constructors.',
            },
          ],
        },
        {
          slug: 'objects-arrays-and-modules',
          title: 'Objects, arrays and modules',
          summary:
            'Destructuring, spread, the array methods, Map and Set, and ES modules: the idioms of everyday JavaScript, plus a first test with node --test.',
          estimatedMinutes: 90,
          objectives: [
            'Use destructuring and spread, and explain why spread is shallow',
            'Transform data with map, filter, reduce and toSorted',
            'Choose Map or Set over a plain object when keys are not fixed strings',
            'Split code into ES modules with named exports',
            'Write and run tests with node:test and node:assert/strict',
          ],
          concepts: [
            'Object and array destructuring',
            'Spread and rest syntax',
            'Shallow copies',
            'map, filter, reduce, find, some, every',
            'Default sort compares strings',
            'toSorted and other non-mutating methods',
            'Map and Set',
            'ES modules: import, export, "type": "module"',
            'node --test',
          ],
          explanation: `Modern JavaScript is written in a data-transforming style, so a few idioms carry most of the weight.

**Destructuring and spread.** \`const { name, age = 0 } = user\` pulls out fields, and \`const [head, ...tail] = list\` splits an array. \`{ ...user, age: 31 }\` makes a new object with one field changed, which is how you update data without mutating it. Spread is **shallow**: nested objects are shared with the original, and changing one changes both.

**Array methods.** \`map\`, \`filter\`, \`reduce\`, \`find\`, \`some\` and \`every\` replace most loops. The trap is \`sort\`. It mutates the array, and by default it compares as strings, so \`[10, 9, 1].sort()\` gives \`[1, 10, 9]\`. Always pass a comparator, as in \`xs.sort((a, b) => a - b)\`. \`toSorted\` does the same without mutating, and \`sort\` is guaranteed stable, so equal elements keep their order.

**Map and Set.** A plain object turns its keys into strings, so \`0\` and \`'0'\` collide. \`Map\` keeps keys as they are, including objects, and iterates in insertion order. \`Set\` gives you uniqueness with the same \`===\`-like rule, so \`new Set([[1], [1]])\` has two members.

**Modules.** Each file is a module with its own scope. Share values with \`export function parse() {}\` and \`import { parse } from './parse.js'\`. In Node, set \`"type": "module"\` in \`package.json\` and include the file extension in relative imports. Prefer named exports, because they keep names consistent across a code base. Modules always run in strict mode.

**Testing.** Node ships a test runner, so you need no dependencies yet:

\`\`\`js
import { test } from 'node:test';
import assert from 'node:assert/strict';

test('sorts numerically', () => {
  assert.deepEqual([10, 9, 1].toSorted((a, b) => a - b), [1, 9, 10]);
});
\`\`\`

Run it with \`node --test\`. Work through javascript.info's chapters on array methods, destructuring and modules, and do the tasks in each.`,
          resources: [
            { title: 'Array methods', url: 'https://javascript.info/array-methods', type: 'textbook', cost: 'free', provider: 'javascript.info', note: 'Do the tasks. They are good drills for map, filter and reduce.', primary: true },
            { title: 'Destructuring assignment', url: 'https://javascript.info/destructuring-assignment', type: 'textbook', cost: 'free', provider: 'javascript.info' },
            { title: 'Modules: introduction', url: 'https://javascript.info/modules-intro', type: 'textbook', cost: 'free', provider: 'javascript.info', note: 'Then see the MDN modules guide for the full reference.' },
            { title: 'JavaScript modules', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules', type: 'documentation', cost: 'free', provider: 'MDN' },
            { title: 'Node.js test runner', url: 'https://nodejs.org/api/test.html', type: 'documentation', cost: 'free', provider: 'Node.js', note: 'You only need test, describe and the assert/strict functions for now.' },
          ],
          exercises: [
            {
              slug: 'top-words',
              title: 'Top words with Map',
              prompt:
                'Write `topWords(text, n)`, which lowercases the text, splits on anything that is not a letter, and returns `[word, count]` pairs sorted by count descending and then alphabetically. `topWords("the cat and the hat and the bat", 2)` must return `[["the", 3], ["and", 2]]`. Use `Map`, `filter` and `toSorted`, with no `for` loops. Cover it with `node --test`, including empty input.',
              kind: 'coding',
              difficulty: 1,
            },
            {
              slug: 'shallow-copy-bug',
              title: 'Find the shallow copy bug',
              prompt:
                'Given `const a = { user: { name: "Ada" }, tags: ["x"] }`, make `b = { ...a }`, then change `b.user.name` and push onto `b.tags`. Print `a` and explain the result. Write `updateName(state, name)`, which returns a new state with the nested name changed while `a` stays deeply unchanged and `b.tags === a.tags` remains true. Assert all of this in a test.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'split-into-modules',
              title: 'Split a script into modules',
              prompt:
                'Create a small project with `"type": "module"`. Put `topWords` in `src/words.js`, formatting helpers in `src/format.js`, and a CLI in `src/main.js` that reads a file named on the command line with `readFileSync` and prints the top 10 words. Tests live in `test/words.test.js`. Make one import without its `.js` extension, record the exact Node error, then fix it.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What does [10, 9, 1].sort() return, and why?',
              answerOutline:
                '[1, 10, 9], because the default comparison converts elements to strings. Pass a numeric comparator, such as (a, b) => a - b.',
            },
            {
              question: 'When is Map better than a plain object?',
              answerOutline:
                'When keys are dynamic or are not strings, when you need reliable insertion order and size, or when user data could collide with inherited keys such as __proto__.',
            },
            {
              question: 'After const b = { ...a }, is it safe to mutate b.settings?',
              answerOutline:
                'No. Spread copies only the top level, so b.settings is the same object as a.settings. Copy the nested object too.',
            },
          ],
        },
      ],
    },
    {
      slug: 'typescript-types',
      title: "TypeScript's Type System",
      description:
        'Add static types to JavaScript: how the checker works, how unions and narrowing model real states, and why types stop at the boundary of your program.',
      lessons: [
        {
          slug: 'types-and-the-compiler',
          title: 'Types, the compiler and strict mode',
          summary:
            'TypeScript is JavaScript plus a checker whose types are erased. Learn structural typing, inference, any versus unknown, and how to set up a strict project.',
          estimatedMinutes: 90,
          objectives: [
            'Explain what tsc checks and what happens to types at runtime',
            'Describe structural typing and predict when one type is assignable to another',
            'Set up a project with strict mode, tsc --noEmit and Vitest',
            'Choose between annotating and relying on inference',
            'Explain why unknown is safer than any',
          ],
          concepts: [
            'Type erasure',
            'Structural typing',
            'Type inference',
            'strict mode and strictNullChecks',
            'any versus unknown',
            'interface and type aliases',
            'Excess property checks',
            'tsconfig.json',
            'Vitest as a TypeScript test runner',
          ],
          explanation: `TypeScript is JavaScript with type annotations plus a checker, \`tsc\`. Two facts explain most of its behaviour.

**Types are erased.** The checker reads your code and reports errors, then the annotations are removed and ordinary JavaScript runs. Nothing about a type exists at runtime, so you cannot ask whether a value "is a \`User\`". A type error also does not stop the code from running unless your build makes it.

**Typing is structural.** Compatibility depends on shape, not on declared names. If you know Java or C++, this is the biggest change.

\`\`\`ts
interface Point { x: number; y: number }
const p3 = { x: 1, y: 2, z: 3 };
const p: Point = p3;              // fine: p3 has x and y
const q: Point = { x: 1, y: 2, z: 3 }; // error: excess property
\`\`\`

The last line is rejected only because a fresh object literal gets an **excess property check**, which catches typos.

**Inference** does most of the work. Annotate function parameters and exported return types, and let the compiler infer local variables. \`type\` and \`interface\` are nearly interchangeable for object shapes. Only \`type\` can name unions, which you will use constantly.

**\`any\` and \`unknown\`.** \`any\` turns checking off, and it spreads to whatever it touches. \`unknown\` means "some value, I do not yet know what", and the compiler makes you check before you use it. Prefer \`unknown\` for anything from outside your program.

**Set up a project.** Run \`npm init -y\`, then \`npm install -D typescript tsx vitest\`, then \`npx tsc --init\`. Make sure \`"strict": true\` is set, because without it \`null\` silently fits every type. Use \`npx tsc --noEmit\` to check types, \`npx tsx file.ts\` to run a file, and \`npx vitest\` for tests. The last two strip types without checking them, so keep \`tsc --noEmit\` in your routine.

Read the handbook's "TypeScript for the New Programmer" or the page for your background language, then Everyday Types.`,
          resources: [
            { title: 'The Basics', url: 'https://www.typescriptlang.org/docs/handbook/2/basic-types.html', type: 'documentation', cost: 'free', provider: 'TypeScript Handbook', note: 'Read this and Everyday Types first.', primary: true },
            { title: 'Everyday Types', url: 'https://www.typescriptlang.org/docs/handbook/2/everyday-types.html', type: 'documentation', cost: 'free', provider: 'TypeScript Handbook' },
            { title: 'Type Compatibility', url: 'https://www.typescriptlang.org/docs/handbook/type-compatibility.html', type: 'documentation', cost: 'free', provider: 'TypeScript Handbook', note: 'The detailed rules of structural typing.' },
            { title: 'TSConfig Reference', url: 'https://www.typescriptlang.org/tsconfig/', type: 'documentation', cost: 'free', provider: 'TypeScript', note: 'Look up each option that tsc --init generates.' },
            { title: 'Vitest getting started guide', url: 'https://vitest.dev/guide/', type: 'documentation', cost: 'free', provider: 'Vitest', note: 'Enough to write and run your first test.' },
          ],
          exercises: [
            {
              slug: 'strict-migration',
              title: 'Migrate a module to strict TypeScript',
              prompt:
                'Rename your `topWords` module and its test to `.ts`, and set `"strict": true`. Add parameter and return types until `npx tsc --noEmit` reports 0 errors, then move the test to Vitest. Finally, introduce a deliberate mistake by returning a number where a string is expected, and show that `npx tsx` still runs the code while `tsc` fails. Explain why in two sentences.',
              kind: 'coding',
              difficulty: 1,
            },
            {
              slug: 'structural-puzzles',
              title: 'Structural typing puzzles',
              prompt:
                'In the TypeScript Playground, write `type Cat = { name: string; lives: number }` and `type Pet = { name: string }`. Test whether a `Cat` is assignable to a `Pet` and the reverse. Do the same with the function types `(p: Pet) => void` and `(c: Cat) => void`. Record which assignments compile, and explain each result in one sentence.',
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'any-versus-unknown',
              title: 'any versus unknown',
              prompt:
                'Take `const data = JSON.parse(text)`. Show that `data.user.name.toUpperCase()` compiles and then crashes at runtime for `{"user":null}`. Change the annotation to `const data: unknown`, and write the checks the compiler now forces on you. The function must return the uppercased name, or `null` for any input of the wrong shape.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Can you write if (value instanceof User) when User is an interface?',
              answerOutline:
                'No. Interfaces are erased, so nothing exists at runtime. instanceof works only for classes; for shapes you check fields yourself.',
            },
            {
              question: 'What is the difference between any and unknown?',
              answerOutline:
                'any disables checking in both directions. unknown accepts any value but allows no operations until it has been narrowed.',
            },
            {
              question: 'If tests pass under Vitest, does that prove the code type-checks?',
              answerOutline:
                'No. Vitest and tsx strip types without checking them. Run tsc --noEmit as well, ideally in CI.',
            },
          ],
        },
        {
          slug: 'unions-and-narrowing',
          title: 'Unions and narrowing',
          summary:
            'Model the real states of your data with union types, and let control flow narrow them. Discriminated unions are the most useful feature in TypeScript.',
          estimatedMinutes: 90,
          objectives: [
            'Narrow a union using typeof, in, instanceof and equality checks',
            'Model state as a discriminated union so illegal states cannot be written',
            'Force exhaustive handling of a union with never',
            'Write a type predicate function',
            'Use literal types and as const',
          ],
          concepts: [
            'Union types',
            'Literal types',
            'Control-flow narrowing',
            'Discriminated (tagged) unions',
            'Exhaustiveness checking with never',
            'Type predicates (x is T)',
            'as const',
            'Making illegal states unrepresentable',
          ],
          explanation: `A union \`string | number\` says a value is one of several types. You can only use what all members share until you **narrow** it. The compiler follows your control flow, so a check such as \`typeof x === 'string'\` changes the type of \`x\` inside that branch. It understands \`typeof\`, \`instanceof\`, \`in\`, equality checks and truthiness. With \`strictNullChecks\`, \`T | null\` works the same way: you must handle the \`null\`.

The most valuable pattern is the **discriminated union**, a union of object types that share a literal field:

\`\`\`ts
type Load =
  | { status: 'loading' }
  | { status: 'ok'; items: string[] }
  | { status: 'error'; message: string };

function label(s: Load): string {
  switch (s.status) {
    case 'loading': return 'Loading...';
    case 'ok': return s.items.length + ' items';
    case 'error': return s.message;
    default: {
      const unreachable: never = s;
      return unreachable;
    }
  }
}
\`\`\`

Compare it with \`{ loading: boolean; items?: string[]; error?: string }\`, which allows nonsense such as loading and error at once, and forces a guess at every use. In the union, \`items\` exists only in the \`ok\` case and the compiler checks that for you. This is called **making illegal states unrepresentable**.

The \`default\` branch gives you **exhaustiveness**. Assigning to \`never\` compiles only if every case was handled, so adding a fourth status produces a compile error at every \`switch\` that forgot it.

**Type predicates** let you package a check: \`function isString(x: unknown): x is string\`. Be careful, because the compiler trusts your claim without verifying it. **\`as const\`** keeps literal types instead of widening them, so \`['a', 'b'] as const\` has the type \`readonly ['a', 'b']\`, and \`(typeof xs)[number]\` turns it into the union \`'a' | 'b'\`.

Read the Narrowing chapter of the handbook from start to finish, because you will use all of it. Then remodel something from your own past code as a union.`,
          resources: [
            { title: 'Narrowing', url: 'https://www.typescriptlang.org/docs/handbook/2/narrowing.html', type: 'documentation', cost: 'free', provider: 'TypeScript Handbook', note: 'The core chapter for this lesson, including discriminated unions and never.', primary: true },
            { title: 'Object Types', url: 'https://www.typescriptlang.org/docs/handbook/2/objects.html', type: 'documentation', cost: 'free', provider: 'TypeScript Handbook', note: 'Optional and readonly properties and intersection types.' },
            { title: 'TypeScript Playground', url: 'https://www.typescriptlang.org/play/', type: 'interactive', cost: 'free', provider: 'TypeScript', note: 'Hover over variables inside each branch to watch narrowing happen.' },
          ],
          exercises: [
            {
              slug: 'shapes-exhaustive',
              title: 'Shapes with exhaustive checks',
              prompt:
                'Define `Shape` as a discriminated union of `circle` (radius), `rect` (width, height) and `triangle` (base, height). Write `area(s: Shape): number` with a `never` default. Test that `area({ kind: "rect", width: 3, height: 4 })` is 12 and `area({ kind: "triangle", base: 3, height: 4 })` is 6. Then add `ellipse` to the union and record the exact compile error it causes before you handle it.',
              kind: 'coding',
              difficulty: 1,
            },
            {
              slug: 'remodel-a-form',
              title: 'Remove illegal states',
              prompt:
                'A form is modelled as `{ submitting: boolean; success: boolean; error: string | null; result: Receipt | null }`. How many combinations of the two booleans and the nullability of the other two fields can exist, and how many are meaningful? Replace it with a discriminated union of `editing`, `submitting`, `failed` and `done`. Write a `next(state, event)` function whose events are also a union, and test each valid transition.',
              kind: 'coding',
              difficulty: 2,
              hint: 'Each of the four fields has two possibilities, so count 2^4 and then list the combinations that make sense.',
            },
            {
              slug: 'type-predicate-filter',
              title: 'A predicate that keeps its promise',
              prompt:
                'Write `isNonEmptyString(x: unknown): x is string`. Use it with `filter` on `["a", "", null, 3, "b"]` so the result has type `string[]` and the value `["a", "b"]`. Then write a deliberately wrong predicate that also accepts numbers, and show the program compiles and fails at runtime. Explain what the compiler trusted.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What makes a union "discriminated"?',
              answerOutline:
                'Every member has a common property with a distinct literal type. Checking that property narrows to one member.',
            },
            {
              question: 'How does assigning to never give you exhaustiveness?',
              answerOutline:
                'After all cases are handled the value narrows to never, so the assignment compiles. A missed case leaves a real type, which is not assignable to never, so it fails to compile.',
            },
            {
              question: 'Why is a union of states better than several optional fields?',
              answerOutline:
                'It rules out impossible combinations and ties each field to the state where it exists, so the compiler enforces checks instead of relying on convention.',
            },
          ],
        },
        {
          slug: 'generics-and-runtime-boundaries',
          title: 'Generics and runtime boundaries',
          summary:
            'Write reusable typed code with generics and utility types, then face the limit of the type system: data from outside must be checked at runtime.',
          estimatedMinutes: 90,
          objectives: [
            'Write generic functions and types with constraints',
            'Use keyof and indexed access to relate keys to value types',
            'Apply Partial, Pick, Omit, Record and Readonly',
            'Explain why as is a promise rather than a check',
            'Write a parser that turns unknown data into a typed value or an error',
          ],
          concepts: [
            'Generic type parameters',
            'Constraints with extends',
            'keyof and indexed access types T[K]',
            'Utility types',
            'Type assertions (as)',
            'JSON.parse returns any',
            'Parsing at the boundary',
            'Result types',
          ],
          explanation: `**Generics** connect the types of inputs and outputs. \`function first<T>(xs: readonly T[]): T | undefined\` says that whatever element type goes in comes back out. Usually the compiler infers \`T\`, so callers just write \`first(names)\`. Constraints narrow what \`T\` can be. Together with \`keyof\` they express relationships between a key and its value:

\`\`\`ts
function pluck<T, K extends keyof T>(rows: T[], key: K): T[K][] {
  return rows.map((row) => row[key]);
}
pluck([{ id: 1, name: 'Ada' }], 'name'); // string[]
pluck([{ id: 1, name: 'Ada' }], 'nam');  // compile error
\`\`\`

**Utility types** derive new types from existing ones, so you do not repeat yourself. \`Partial<T>\` makes every field optional, \`Pick<T, 'a' | 'b'>\` and \`Omit<T, 'a'>\` choose fields, \`Record<K, V>\` describes a dictionary, and \`Readonly<T>\` blocks assignment at compile time.

**The boundary.** Types are erased, so they cannot protect you from data arriving at runtime. \`JSON.parse\` returns \`any\`, and \`await res.json()\` gives you the same. Writing \`const user = data as User\` does not check anything. It is your promise to the compiler, and if the server sends something else, the crash happens far from the cause.

So keep a clear line around your program. Outside it, data is \`unknown\`. At the line, a **parser** inspects the value and either produces a typed value or reports an error. Inside it, you trust the types.

\`\`\`ts
type Result<T> = { ok: true; value: T } | { ok: false; error: string };

function parseUser(x: unknown): Result<User> {
  if (typeof x !== 'object' || x === null) return { ok: false, error: 'not an object' };
  const { id, name } = x as Record<string, unknown>;
  if (typeof id !== 'number') return { ok: false, error: 'id must be a number' };
  if (typeof name !== 'string') return { ok: false, error: 'name must be a string' };
  return { ok: true, value: { id, name } };
}
\`\`\`

Note the one small \`as\` here. It is safe because the check above it proved \`x\` is an object, and every field is still treated as \`unknown\`. Libraries such as Zod generate this code from a schema, but write it by hand first so you know what they do. Read the handbook's Generics chapter, then the "Parse, don't validate" essay for the idea behind this design.`,
          resources: [
            { title: 'Generics', url: 'https://www.typescriptlang.org/docs/handbook/2/generics.html', type: 'documentation', cost: 'free', provider: 'TypeScript Handbook', primary: true },
            { title: 'Keyof Type Operator', url: 'https://www.typescriptlang.org/docs/handbook/2/keyof-types.html', type: 'documentation', cost: 'free', provider: 'TypeScript Handbook', note: 'Short. Pair it with the indexed access types page linked from it.' },
            { title: 'Utility Types', url: 'https://www.typescriptlang.org/docs/handbook/utility-types.html', type: 'documentation', cost: 'free', provider: 'TypeScript Handbook', note: 'Use this as a reference, and learn the five named in this lesson.' },
            { title: "Parse, don't validate", url: 'https://lexi-lambda.github.io/blog/2019/11/05/parse-don-t-validate/', type: 'article', cost: 'free', provider: 'Alexis King', note: 'Its examples are in Haskell, but the idea transfers directly.' },
          ],
          exercises: [
            {
              slug: 'typed-group-by',
              title: 'A typed groupBy',
              prompt:
                'Write `groupBy<T, K extends keyof T>(rows: T[], key: K): Map<T[K], T[]>`. Using rows of `{ dept: string; salary: number }`, confirm that the map key has type `string` and that passing `"nope"` as the key is a compile error. Add a Vitest test: rows with depts `["eng", "ops", "eng"]` give a map of size 2 where `eng` holds 2 rows.',
              kind: 'coding',
              difficulty: 1,
            },
            {
              slug: 'config-parser',
              title: 'Parse a config file',
              prompt:
                'Write `parseConfig(x: unknown): Result<Config>` for `{ port: number; host: string; tags: string[]; debug?: boolean }`. The port must be an integer from 1 to 65535. Return a precise error such as `"tags[1] must be a string"`. Test 6 cases: a valid config, a missing port, port 70000, port 80.5, `tags` containing a number, and the input `null`. Use no `any`, and no `as` beyond narrowing to a record.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'patch-with-partial',
              title: 'Type-safe updates',
              prompt:
                'Given `type Book = { id: string; title: string; year: number }`, write `applyPatch(book: Book, patch: Partial<Omit<Book, "id">>): Book`, returning a new object. Show that patching `id` and patching `title: 3` are both compile errors, and that the original book is unchanged. In one sentence, explain what `exactOptionalPropertyTypes` would change here.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What does data as User do at runtime?',
              answerOutline:
                'Nothing. The assertion is erased, so no check occurs. It only tells the compiler to trust you.',
            },
            {
              question: 'Why is K extends keyof T more useful than key: string?',
              answerOutline:
                'It restricts the key to real property names, and T[K] ties the return type to that specific property.',
            },
            {
              question: 'Where should runtime validation go in a typed program?',
              answerOutline:
                'At the boundaries: network, storage, user input and environment. Inside, the parsed types can be trusted, so checks do not need repeating.',
            },
          ],
        },
      ],
    },
    {
      slug: 'browser-and-async',
      title: 'The Browser, the DOM and Async',
      description:
        'Work with the page as a live tree of objects, understand the event loop that schedules everything, and talk to servers with fetch without getting bitten by races.',
      lessons: [
        {
          slug: 'the-dom-and-events',
          title: 'The DOM and events',
          summary:
            'Set up a typed browser project with Vite, change the page through the DOM, handle events with delegation, and avoid script injection.',
          estimatedMinutes: 90,
          objectives: [
            'Create a vanilla TypeScript project with Vite',
            'Find, create and update elements with correct types',
            'Explain why textContent is safe and innerHTML with user data is not',
            'Describe event capture and bubbling',
            'Use event delegation for lists that change',
          ],
          concepts: [
            'Document Object Model as a tree of objects',
            'querySelector and its nullable result',
            'createElement, append and replaceChildren',
            'textContent versus innerHTML',
            'Cross-site scripting (XSS)',
            'Event bubbling and capture',
            'target versus currentTarget',
            'Event delegation',
            'preventDefault',
          ],
          explanation: `A browser parses HTML into the **DOM**, a tree of live objects. Changing an object changes the page. Start a project with \`npm create vite@latest my-app -- --template vanilla-ts\`, then run \`npm install\` and \`npm run dev\`. Vite serves your TypeScript directly and reloads on save. Your code runs in the browser, so debug it in the developer tools: open them with F12, and use the Console, Elements and Network tabs constantly.

**Finding and creating.** \`document.querySelector('#search')\` returns \`Element | null\`, and TypeScript makes you face both parts of that type. Use the generic form for the element type, and fail loudly if your HTML is wrong:

\`\`\`ts
const input = document.querySelector<HTMLInputElement>('#search');
if (!input) throw new Error('missing #search');
input.value = 'hello'; // value exists on HTMLInputElement
\`\`\`

Build new content with \`document.createElement\`, set properties, and add it with \`append\`. \`list.replaceChildren(...items)\` swaps all the children in one call.

**Injection.** Setting \`el.textContent = userText\` always inserts plain text. Setting \`el.innerHTML = userText\` parses it as HTML, so a value such as \`<img src=x onerror=alert(1)>\` runs code in your page. This is **cross-site scripting**, one of the most common web vulnerabilities. Treat all data as text, and do not build HTML strings from data.

**Events.** \`el.addEventListener('click', handler)\` registers a function. An event travels down the tree (capture), reaches the target, then **bubbles** back up, so a listener on a parent also sees clicks on its children. That enables **event delegation**: put one listener on the list rather than one on each row.

\`\`\`ts
list.addEventListener('click', (e) => {
  if (!(e.target instanceof Element)) return;
  const row = e.target.closest('li');
  if (row) select(row.dataset.id);
});
\`\`\`

Delegation keeps working as rows are added and removed. \`event.target\` is where the event started, and \`currentTarget\` is the element holding the listener. Note that \`target\` has the broad type \`EventTarget | null\`, which is why the \`instanceof\` check is needed.

Read the javascript.info DOM chapters in order, then do the delegation tasks.`,
          resources: [
            { title: 'DOM tree', url: 'https://javascript.info/dom-nodes', type: 'textbook', cost: 'free', provider: 'javascript.info', note: 'Follow it with the chapters on searching and modifying the document.', primary: true },
            { title: 'Modifying the document', url: 'https://javascript.info/modifying-document', type: 'textbook', cost: 'free', provider: 'javascript.info' },
            { title: 'Event delegation', url: 'https://javascript.info/event-delegation', type: 'textbook', cost: 'free', provider: 'javascript.info', note: 'Read Bubbling and capturing first if the term is new.' },
            { title: 'TypeScript and the DOM', url: 'https://www.typescriptlang.org/docs/handbook/dom-manipulation.html', type: 'documentation', cost: 'free', provider: 'TypeScript Handbook', note: 'How the DOM types fit together, including querySelector generics.' },
            { title: 'Vite: Getting Started', url: 'https://vite.dev/guide/', type: 'documentation', cost: 'free', provider: 'Vite' },
          ],
          exercises: [
            {
              slug: 'todo-with-delegation',
              title: 'A list with delegation',
              prompt:
                'Build a to-do list with a text input and a list, in Vite with strict TypeScript and no framework. Each row has a checkbox and a delete button. Attach exactly one click listener to the `<ul>`, and use `closest` and `data-id` to find the row. Keep the items in an array, with a single `render()` function that rebuilds the list from that array. Verify that 3 added items and 1 delete leave 2 rows.',
              kind: 'coding',
              difficulty: 1,
            },
            {
              slug: 'xss-demonstration',
              title: 'See the injection happen',
              prompt:
                'In a local page, render the string `<img src=x onerror="document.title=\'hacked\'">` once with `innerHTML` and once with `textContent`. Record what each does to the page and its title. Write a one-paragraph explanation of why escaping at render time matters even when data came from your own server.',
              kind: 'coding',
              difficulty: 1,
            },
            {
              slug: 'keyboard-list',
              title: 'Keyboard navigation',
              prompt:
                'Extend a list so ArrowDown and ArrowUp move a highlighted row, wrapping at both ends, and Enter logs the selected id. Keep the highlighted index in a variable, not in the DOM. Use `event.preventDefault()` so the page does not scroll, and set `aria-selected` on the current row. With 3 rows and index 2, one ArrowDown must give index 0.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does querySelector return a nullable type?',
              answerOutline:
                'The selector might match nothing, and the compiler cannot see your HTML. You must handle null, and the generic only names the expected element type.',
            },
            {
              question: 'How does event delegation work, and what are its benefits?',
              answerOutline:
                'Events bubble, so one listener on a parent handles events from all children, using event.target and closest. It needs fewer listeners and works for rows added later.',
            },
            {
              question: 'What is the difference between target and currentTarget?',
              answerOutline:
                'target is the element where the event originated, and currentTarget is the element whose listener is running.',
            },
          ],
        },
        {
          slug: 'promises-and-the-event-loop',
          title: 'Promises and the event loop',
          summary:
            'JavaScript runs one task at a time. Learn how the event loop schedules work, how promises and async/await sequence it, and how to run things concurrently.',
          estimatedMinutes: 90,
          objectives: [
            'Explain the event loop, tasks and microtasks',
            'Predict the output order of code mixing timers and promises',
            'Write async functions with correct error handling',
            'Run work concurrently with Promise.all and Promise.allSettled',
            'Explain why long synchronous work freezes the page',
          ],
          concepts: [
            'Single-threaded execution and run-to-completion',
            'Event loop',
            'Tasks and microtasks',
            'Promise states: pending, fulfilled, rejected',
            'async and await',
            'Sequential versus concurrent awaits',
            'Promise.all, allSettled, race, any',
            'Unhandled rejections',
          ],
          explanation: `Your JavaScript runs on one thread. Each piece of code **runs to completion**, so nothing interrupts a function halfway through. That removes the data races you met with threads, but long-running code blocks everything: while a loop runs, the page cannot repaint or respond to clicks.

Waiting is handled by the **event loop**. A timer, a network reply or a click queues a **task**. The loop takes one task, runs it to the end, then drains the **microtask** queue (where promise callbacks go), and may then repaint. So this prints A, D, C, B:

\`\`\`js
console.log('A');
setTimeout(() => console.log('B'), 0);
Promise.resolve().then(() => console.log('C'));
console.log('D');
\`\`\`

A **promise** is an object for a result that is not ready yet. It is pending, then either fulfilled or rejected, once. **\`async\`/\`await\`** is syntax over promises. An \`async\` function always returns a promise, and \`await\` suspends only that function, handing control back to the event loop. A rejected promise becomes a thrown exception at the \`await\`, so ordinary \`try\`/\`catch\` works.

The most common performance mistake is awaiting in a loop when you do not need to:

\`\`\`ts
for (const id of ids) results.push(await load(id)); // one at a time
const all = await Promise.all(ids.map(load));        // all at once
\`\`\`

\`Promise.all\` rejects as soon as one input rejects, although the others keep running. Use \`Promise.allSettled\` when you want every outcome, and \`Promise.race\` for the first to finish. Starting work is just calling the function, because the promise begins immediately.

Always handle rejections. Forgetting to \`await\` or \`catch\` a promise gives an unhandled rejection: a console error in the browser and, by default, a crash in Node. Note also that a concurrent result can arrive in any order, even though your code never runs in parallel. That logical race is the subject of the next lesson.

Read the javascript.info chapters on promises and the event loop, then answer each output-order task before running it.`,
          resources: [
            { title: 'Event loop: microtasks and macrotasks', url: 'https://javascript.info/event-loop', type: 'textbook', cost: 'free', provider: 'javascript.info', primary: true },
            { title: 'Promise', url: 'https://javascript.info/promise-basics', type: 'textbook', cost: 'free', provider: 'javascript.info', note: 'Continue through promise error handling and the promise API chapters.' },
            { title: 'Async/await', url: 'https://javascript.info/async-await', type: 'textbook', cost: 'free', provider: 'javascript.info' },
            { title: 'JavaScript execution model', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Execution_model', type: 'documentation', cost: 'free', provider: 'MDN', note: 'A precise description of agents, tasks and run-to-completion.' },
            { title: 'Using promises', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises', type: 'documentation', cost: 'free', provider: 'MDN' },
          ],
          exercises: [
            {
              slug: 'predict-the-order',
              title: 'Predict the output order',
              prompt:
                'Without running it, predict the order for this code: log 1; `setTimeout` logging 2 with delay 0; an `async` function that logs 3, then awaits `Promise.resolve()`, then logs 4; call that function; `Promise.resolve().then` logging 5; log 6. Then run it. The expected answer is 1, 3, 6, 4, 5, 2. Explain why 4 comes before 5 and why 2 comes last.',
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'concurrency-limit',
              title: 'Limit concurrency',
              prompt:
                'Write `mapLimit<T, R>(items: T[], limit: number, fn: (item: T) => Promise<R>): Promise<R[]>`, returning results in input order and running at most `limit` calls at once. Test it with a fake `fn` that records current and peak concurrency: 10 items with limit 3 must peak at exactly 3. Decide and document what happens when one call rejects.',
              kind: 'coding',
              difficulty: 3,
              hint: 'Start limit workers that each take the next index from a shared counter. Running to completion means the counter needs no lock.',
            },
            {
              slug: 'measure-await-in-a-loop',
              title: 'Measure sequential versus concurrent',
              prompt:
                'Write `sleep(ms)` as a promise around `setTimeout`. Using `performance.now()`, time 5 calls of `sleep(100)`, first with `await` in a loop and then with `Promise.all`. Report both times: expect about 500 ms and about 100 ms. Then put a 500 ms busy loop in the middle of a page and observe that a CSS animation freezes while it runs.',
              kind: 'coding',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'Does await block the thread?',
              answerOutline:
                'No. It suspends only the async function and returns control to the event loop, so other tasks run.',
            },
            {
              question: 'Why do promise callbacks run before a setTimeout(fn, 0) callback?',
              answerOutline:
                'Promise callbacks are microtasks, which drain after the current task. A timer callback is a later task.',
            },
            {
              question: 'When would you use allSettled rather than all?',
              answerOutline:
                'When you want every outcome even if some fail, such as a batch where partial results are useful. all rejects on the first failure.',
            },
          ],
          relatedLessons: ['operating-systems/concurrency/concurrency-bugs-and-event-based'],
        },
        {
          slug: 'fetch-and-cancellation',
          title: 'fetch, errors and cancellation',
          summary:
            'Call HTTP APIs correctly: check status codes, parse responses as unknown, cancel stale requests, and model loading and error states.',
          estimatedMinutes: 90,
          objectives: [
            'Make GET and POST requests with fetch',
            'Handle network errors and HTTP error statuses separately',
            'Cancel requests with AbortController and add timeouts with AbortSignal.timeout',
            'Prevent a slow old response from overwriting a newer one',
            'Debounce input and test it with fake timers',
            'Explain what CORS does',
          ],
          concepts: [
            'fetch rejects only on network failure',
            'response.ok and status',
            'Request and response bodies',
            'AbortController and AbortSignal',
            'AbortError and TimeoutError',
            'Stale response race',
            'Debouncing',
            'CORS',
            'Fake timers in tests',
          ],
          explanation: `\`fetch(url, options)\` returns a promise for a \`Response\`. Its biggest surprise is that a 404 or 500 **does not reject**. The promise rejects only when no HTTP response arrived at all, such as on a DNS failure or a dropped connection. You must check \`res.ok\`:

\`\`\`ts
async function getJson(url: string, signal?: AbortSignal): Promise<unknown> {
  const res = await fetch(url, { signal });
  if (!res.ok) throw new Error('HTTP ' + res.status);
  return res.json(); // unknown: parse it before trusting it
}
\`\`\`

To send data, pass \`method: 'POST'\`, a \`content-type: application/json\` header, and \`body: JSON.stringify(data)\`.

**Cancellation.** An \`AbortController\` owns a \`signal\`. Pass the signal to \`fetch\`, and \`controller.abort()\` makes the promise reject with an error named \`AbortError\`. \`AbortSignal.timeout(5000)\` is a ready-made signal that fails with \`TimeoutError\`. Neither is a real failure from the user's point of view if they were the ones who moved on, so handle them separately.

**The stale response race.** Your code is single threaded and still has a race. A user types \`du\`, then \`dune\`. If the \`du\` request is slower, it finishes last and overwrites the correct results. The fix is to abort the old request whenever you start a new one:

\`\`\`ts
let current: AbortController | undefined;

function search(q: string) {
  current?.abort();
  const controller = new AbortController();
  current = controller;
  return getJson(makeUrl(q), controller.signal);
}
\`\`\`

**Debouncing** waits until input has been quiet for, say, 250 ms before sending a request. Keep a timer in a closure, and clear and restart it on every keystroke. You can test this without waiting: Vitest's \`vi.useFakeTimers()\` lets you advance time by hand with \`vi.advanceTimersByTime(250)\`. Inject \`fetch\` as a parameter so tests can use a stub.

**CORS.** Browsers block a page from reading a response from another origin unless that server allows it with \`Access-Control-Allow-Origin\`. The server does the allowing, so you cannot fix a CORS error from client code. Tools like \`curl\` are not browsers and are not subject to it.

Read MDN's Using the Fetch API, then build the exercises. Model the request as the discriminated union from module 2.`,
          resources: [
            { title: 'Using the Fetch API', url: 'https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch', type: 'documentation', cost: 'free', provider: 'MDN', primary: true },
            { title: 'Fetch: Abort', url: 'https://javascript.info/fetch-abort', type: 'textbook', cost: 'free', provider: 'javascript.info', note: 'Read Fetch first if you have not used it before.' },
            { title: 'AbortSignal.timeout()', url: 'https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal/timeout_static', type: 'documentation', cost: 'free', provider: 'MDN' },
            { title: 'Cross-Origin Resource Sharing (CORS)', url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS', type: 'documentation', cost: 'free', provider: 'MDN', note: 'The first sections are enough for now.' },
          ],
          exercises: [
            {
              slug: 'typed-api-client',
              title: 'A typed API client',
              prompt:
                'Write `searchBooks(query, signal)` for `https://openlibrary.org/search.json?q=<query>&fields=key,title,author_name&limit=5`. It must encode the query with `encodeURIComponent`, treat non-2xx statuses as errors, and run the response through a hand-written parser returning `{ key: string; title: string; authors: string[] }[]`. Test it with a stubbed `fetch` for a 200 response, a 503 response and a malformed body.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'reproduce-the-race',
              title: 'Reproduce the stale response race',
              prompt:
                'With a fake fetch where the first call takes 300 ms and the second 100 ms, write a naive `search` that stores the latest result in a variable, and write a test showing that the older result wins. Then add `AbortController` and show that the same test now ends with the newer result and that the first signal has `aborted === true`. Use `vi.useFakeTimers()`, so the test runs instantly.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'debounce-with-tests',
              title: 'A tested debounce',
              prompt:
                'Write a typed `debounce(fn, ms)` that preserves the argument types of `fn`. With fake timers, verify three cases: 4 calls 50 ms apart followed by a 250 ms wait trigger `fn` exactly once with the last argument; two calls 300 ms apart trigger it twice; and a `cancel()` method prevents any pending call.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What does fetch do on a 500 response?',
              answerOutline:
                'It fulfils normally with a Response whose ok is false. You must check ok or status yourself.',
            },
            {
              question: 'How can a single-threaded program have a race condition?',
              answerOutline:
                'Async operations can finish in a different order from the one they started in, so a slow old result can overwrite a newer one.',
            },
            {
              question: 'You see a CORS error in the console. Where is the fix?',
              answerOutline:
                'On the server, or a proxy you control, which must send the right headers. The browser enforces the rule, and client code cannot bypass it.',
            },
          ],
          relatedLessons: ['computer-networks/application-layer/http'],
        },
      ],
    },
    {
      slug: 'full-stack-typescript',
      title: 'A Typed Front End and a Node API',
      description:
        'Write an HTTP API with nothing but Node, share types with the front end, test the whole thing, and finish by seeing what a framework adds.',
      lessons: [
        {
          slug: 'a-node-http-api',
          title: 'A Node HTTP API from scratch',
          summary:
            'Build a JSON API on node:http: routing, reading bodies safely, status codes, and error handling that keeps the process alive.',
          estimatedMinutes: 90,
          objectives: [
            'Create a server with node:http and route on method and path',
            'Read a request body as a stream with a size limit',
            'Return correct status codes and a consistent JSON error shape',
            'Keep a thrown error from crashing the process',
            'Exercise an API from VS Code or the terminal',
          ],
          concepts: [
            'node:http createServer',
            'Request and response as streams',
            'Routing on method and URL',
            'URL and URLSearchParams',
            'Reading a body with for await',
            'Payload size limits',
            'Status codes: 200, 201, 400, 404, 413, 500',
            'Unhandled rejections in handlers',
          ],
          explanation: `Node runs JavaScript outside the browser, with the same event loop and APIs for files and sockets instead of the DOM. An HTTP server is one callback, called once per request. Run it with \`npx tsx watch src/server.ts\`, which restarts on save.

\`\`\`ts
import { createServer } from 'node:http';

const server = createServer((req, res) => {
  handle(req, res).catch((err) => {
    console.error(err);
    if (!res.headersSent) sendJson(res, 500, { error: 'internal error' });
    else res.destroy();
  });
});
server.listen(3000, '127.0.0.1');
\`\`\`

The \`.catch\` matters. An \`async\` function that rejects with nobody listening is an unhandled rejection, and that stops the whole Node process, not just one request. Keep this wrapper around every handler.

**Routing** is a matter of looking at \`req.method\` and the path. Parse the URL with \`new URL(req.url ?? '/', 'http://localhost')\`, which gives you \`pathname\` and \`searchParams\`. A \`switch\` or a small table of \`{ method, pattern, handler }\` rows is enough at this size.

**Bodies arrive as a stream** of chunks, because a request may be large. Never read one without a limit, or a single client can exhaust your memory:

\`\`\`ts
async function readBody(req: IncomingMessage, limit: number): Promise<Buffer> {
  const chunks: Buffer[] = [];
  let size = 0;
  for await (const chunk of req) {
    size += chunk.length;
    if (size > limit) throw new HttpError(413, 'body too large');
    chunks.push(chunk);
  }
  return Buffer.concat(chunks);
}
\`\`\`

**Status codes** are part of your contract: 200 for success, 201 for creation, 400 for bad input, 404 for an unknown resource, 413 for too large a body, and 500 for your own bugs. Use one error shape everywhere, such as \`{ "error": { "code": "not_found", "message": "..." } }\`, so clients need only one code path. Treat a parsed body as \`unknown\` and run it through a parser, exactly as you did in the browser.

Bind to \`127.0.0.1\` during development so that your API is not exposed to your network. To try requests, use the REST Client extension in VS Code. In Windows PowerShell, \`curl\` may be an alias for a different command, so type \`curl.exe\`.

Read the Node guide on the anatomy of an HTTP transaction, then keep the \`http\` API page open while you work.`,
          resources: [
            { title: 'Anatomy of an HTTP Transaction', url: 'https://nodejs.org/learn/http/anatomy-of-an-http-transaction', type: 'documentation', cost: 'free', provider: 'Node.js', note: 'Walks through requests, bodies, headers and errors in order.', primary: true },
            { title: 'Node.js http module', url: 'https://nodejs.org/api/http.html', type: 'documentation', cost: 'free', provider: 'Node.js', note: 'Use it as a reference for IncomingMessage and ServerResponse.' },
            { title: 'Introduction to Node.js', url: 'https://nodejs.org/learn/getting-started/introduction-to-nodejs', type: 'documentation', cost: 'free', provider: 'Node.js' },
            { title: 'HTTP response status codes', url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status', type: 'documentation', cost: 'free', provider: 'MDN' },
          ],
          exercises: [
            {
              slug: 'notes-api',
              title: 'An in-memory notes API',
              prompt:
                'Using only `node:http`, write an API for notes `{ id, text, createdAt }`: `GET /notes`, `POST /notes`, `GET /notes/:id` and `DELETE /notes/:id`. `POST` returns 201 with the new note, invalid JSON or an empty `text` returns 400, an unknown id returns 404, a wrong method returns 405, and a body over 64 KiB returns 413. All errors use a single JSON shape. Demonstrate every case with a `.http` file for the REST Client extension.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'crash-lab',
              title: 'Crash the server on purpose',
              prompt:
                'Add a route whose async handler throws after an `await`. First leave out the `.catch` wrapper and record what happens to the process and to other clients. Then add the wrapper, confirm that the client gets a 500 and the server keeps serving, and write two sentences on why a synchronous `try`/`catch` around `handle(req, res)` would not have helped.',
              kind: 'coding',
              difficulty: 1,
            },
            {
              slug: 'router-table',
              title: 'A small typed router',
              prompt:
                'Replace your `if` chain with a table of routes such as `{ method: "GET", path: "/notes/:id", handler }`. Write `matchRoute(method, pathname)` as a pure function that returns the handler and its parameters, and give it table-driven tests covering 8 or more cases: exact matches, parameters, trailing slashes, a wrong method (405) and an unknown path (404).',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does a request body need a size limit?',
              answerOutline:
                'Without one, a client can send enormous data until memory runs out. Count bytes as chunks arrive, and stop with a 413.',
            },
            {
              question: 'What happens when an async request handler rejects and nothing catches it?',
              answerOutline:
                'It is an unhandled rejection, which by default terminates the Node process and drops every in-flight request.',
            },
            {
              question: 'Which status code fits malformed JSON, and which fits a database crash?',
              answerOutline: '400 for the client mistake, and 500 for the server failure.',
            },
          ],
          relatedLessons: [
            'computer-networks/application-layer/http',
            'computer-networks/application-layer/building-a-concurrent-http-server',
          ],
        },
        {
          slug: 'shared-types-and-api-tests',
          title: 'Shared types and API tests',
          summary:
            'Share one definition of your API between client and server, connect them in development, store data durably, and test the server over real HTTP.',
          estimatedMinutes: 90,
          objectives: [
            'Share types and parsers between client and server code',
            'Connect a Vite front end to a local API with a dev proxy',
            'Persist records to a JSON Lines file safely',
            'Test an API by starting it on an ephemeral port',
            'Explain which errors shared types can and cannot catch',
          ],
          concepts: [
            'Shared contract module',
            'import type',
            'Vite dev proxy',
            'Same-origin requests in development',
            'JSON Lines storage',
            'Atomic writes with rename',
            'Ephemeral port (listen on 0)',
            'Black-box API tests',
          ],
          explanation: `Once client and server are both TypeScript, one module can define the contract:

\`\`\`text
my-app/
├── shared/api.ts     types and parsers used by both sides
├── server/           node:http API
└── src/              browser code
\`\`\`

If \`CreateNote\` is defined once, changing a field produces compile errors on both sides at once. Use \`import type { Note } from '../shared/api'\` for types, which guarantees that nothing from that import reaches the output. Be clear about the limit, though. Shared types catch mistakes *in your source*, not at runtime. An old browser tab, a hand-written \`curl\` or a corrupted file can still send anything, so the server must still parse every request. Keep the parser in the shared module too.

**Connecting them.** The Vite dev server and your API run on different ports, which are different origins, so the browser applies CORS. Avoid the problem with a proxy in \`vite.config.ts\`:

\`\`\`ts
export default { server: { proxy: { '/api': 'http://127.0.0.1:3000' } } };
\`\`\`

Now the page calls \`fetch('/api/notes')\` on its own origin and Vite forwards it. In production, Node can serve the built files from \`dist/\`, which keeps everything on one origin.

**Storage.** You do not need a database for a small tool. **JSON Lines** stores one JSON object per line, so \`appendFile\` adds a record without rewriting anything, and a crash can damage at most the last line. On startup, read the lines and skip any that fail to parse, counting them. When you must rewrite a whole file, write to a temporary file and \`rename\` it over the original, because a crash can then leave only the old file or the new one, never half of each.

**Testing.** Make your server creatable without side effects: export \`createApp(deps)\` and call \`listen\` only in \`main.ts\`. Tests can then start it on **port 0**, which asks the OS for any free port, and read the real port from \`server.address()\`. Use \`fetch\` for black-box tests over real HTTP, and pass a temporary directory for storage. Close the server after each test, so that runs stay independent and your test command exits.

Read the Vite and Node references as needed, and spend most of your time on the exercises, which together form the skeleton of the final project.`,
          resources: [
            { title: 'Vite: Server Options', url: 'https://vite.dev/config/server-options.html', type: 'documentation', cost: 'free', provider: 'Vite', note: 'See server.proxy.', primary: true },
            { title: 'Node.js file system module', url: 'https://nodejs.org/api/fs.html', type: 'documentation', cost: 'free', provider: 'Node.js', note: 'appendFile, rename and the promises API.' },
            { title: 'Vitest guide', url: 'https://vitest.dev/guide/', type: 'documentation', cost: 'free', provider: 'Vitest' },
            { title: 'TypeScript: Modules', url: 'https://www.typescriptlang.org/docs/handbook/2/modules.html', type: 'documentation', cost: 'free', provider: 'TypeScript Handbook', note: 'Includes import type.' },
          ],
          exercises: [
            {
              slug: 'one-contract',
              title: 'One contract, two sides',
              prompt:
                'Move your note types and `parseCreateNote` into `shared/api.ts`, and use them in the API from the previous lesson and in a small Vite page that lists and creates notes through the dev proxy. Rename the field `text` to `body` in the shared type, and count the compile errors it reports across the client and server. Then record whether an old client sending `text` is caught, and by which layer.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'jsonl-store',
              title: 'A crash-tolerant store',
              prompt:
                'Implement `createStore(path)` with `append(record)` and `load()` over a JSON Lines file. `load` returns `{ records, skippedLines }`. In a test, write 3 records, then append `{"id":` with no newline to simulate a crash: `load` must return 3 records and `skippedLines: 1`. Appending a fourth record afterwards must still give 4 records on the next load. Think about what your store must do for that to pass.',
              kind: 'coding',
              difficulty: 2,
              hint: 'The next append lands on the same line as the broken fragment unless you handle it.',
            },
            {
              slug: 'black-box-tests',
              title: 'Black-box tests on an ephemeral port',
              prompt:
                'Refactor the notes API into `createApp({ store })`. In Vitest, start it with `listen(0)` in `beforeEach` and close it in `afterEach`. Write at least 6 tests over real HTTP with `fetch`: create then fetch, list order, 400 on bad JSON, 404, 413 at 64 KiB + 1 byte, and data surviving a new `createApp` over the same file.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'If client and server share types, why must the server still validate input?',
              answerOutline:
                'Types are erased and exist only at compile time. Requests can come from old clients, other tools or attackers.',
            },
            {
              question: 'Why write to a temporary file and rename it rather than overwrite in place?',
              answerOutline:
                'Rename replaces the file atomically within a file system, so a crash leaves either the complete old file or the complete new one.',
            },
            {
              question: 'Why listen on port 0 in tests?',
              answerOutline:
                'The OS picks a free port, so tests do not collide with each other or with a running dev server.',
            },
          ],
        },
        {
          slug: 'what-a-framework-adds',
          title: 'What a framework adds',
          summary:
            'Rebuild a small screen in React to see the idea behind every modern UI library, and decide when you actually need one.',
          estimatedMinutes: 75,
          objectives: [
            'Explain the idea that UI is a function of state',
            'Write a React component with props and useState',
            'Use useEffect with cleanup to fetch and cancel',
            'Compare the hand-written and framework versions of a screen',
            'Decide whether a project needs a framework',
          ],
          concepts: [
            'UI as a function of state',
            'Components and props',
            'JSX and automatic escaping',
            'useState',
            'useEffect and cleanup',
            'Reconciliation',
            'Bundle size and dependency cost',
          ],
          explanation: `Look at what you wrote in module 3. You kept state in variables, then wrote a \`render()\` function that rebuilt the DOM from that state. As a screen grows, doing this by hand becomes the hard part: rebuilding everything loses input focus and scroll position, while updating only what changed means tracking it yourself. Frameworks exist to solve exactly this problem.

**React's idea** is that you describe what the UI should look like for a given state, and the library works out the DOM changes. This is the same \`render()\` function, called for you and made efficient. A component is a function from props to a description of the UI, written in JSX:

\`\`\`tsx
function Counter({ step }: { step: number }) {
  const [n, setN] = useState(0);
  return <button onClick={() => setN(n + step)}>{n}</button>;
}
\`\`\`

Calling \`setN\` re-runs the function. React compares the new description with the old one, a step called **reconciliation**, and changes only the DOM nodes that differ. Your input focus survives. JSX also escapes values by default, so \`{title}\` behaves like \`textContent\`.

**\`useEffect\`** runs code after rendering, for anything outside React. It is where the abort pattern from module 3 fits, and the returned cleanup function runs before the next effect:

\`\`\`tsx
useEffect(() => {
  const controller = new AbortController();
  search(query, controller.signal).then(setResults).catch(ignoreAbort);
  return () => controller.abort();
}, [query]);
\`\`\`

Nothing here is magic, and you already know each part. Closures hold state, the event loop schedules updates, and discriminated unions model what to show.

**Do you need one?** A framework earns its place when a screen has lots of interdependent state, or several people need shared conventions. It costs you a dependency, a build step, and code that every visitor downloads. A small tool with one or two screens is often better off without it, which is why this course's projects do not use one. You could equally explore Vue or Svelte: the same reasoning applies.

Try it with \`npm create vite@latest -- --template react-ts\`, and read the first pages of the React docs' Learn section.`,
          resources: [
            { title: 'React: Quick Start', url: 'https://react.dev/learn', type: 'documentation', cost: 'free', provider: 'React', primary: true },
            { title: 'Thinking in React', url: 'https://react.dev/learn/thinking-in-react', type: 'documentation', cost: 'free', provider: 'React', note: 'The best short description of the component mindset.' },
            { title: 'Using TypeScript with React', url: 'https://react.dev/learn/typescript', type: 'documentation', cost: 'free', provider: 'React' },
          ],
          exercises: [
            {
              slug: 'rewrite-in-react',
              title: 'Rewrite one screen',
              prompt:
                'Rebuild your to-do list from the DOM lesson in React with strict TypeScript. Keep the same features: add, toggle, delete and a remaining-items count. Compare the two versions on four measures: lines of code, the production bundle size printed by `npm run build`, whether an input keeps focus across updates, and how much code is state management rather than DOM work. Write the results as a short table.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'effect-with-cleanup',
              title: 'Fetch with an effect',
              prompt:
                'Write a React `useSearch(query)` hook returning a discriminated union of idle, loading, ok and error. It must abort the previous request in the effect cleanup. With a stubbed fetch where the first call is slower than the second, confirm that the final state shows the second result. Then remove the cleanup and watch the bug return.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'framework-decision',
              title: 'Write the decision down',
              prompt:
                'For each of these, decide between no framework and a framework, in 2-3 sentences each, naming the costs: a one-page status dashboard, an internal admin tool with 30 forms, a marketing page with one signup form, and a collaborative whiteboard. State the single question that most influenced your answer.',
              kind: 'writing',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'What problem does a framework solve that your render() function did not?',
              answerOutline:
                'Updating the DOM efficiently while keeping focus, scroll and other element state, without you tracking what changed.',
            },
            {
              question: 'When does the cleanup function of useEffect run?',
              answerOutline:
                'Before the effect runs again because its dependencies changed, and when the component unmounts.',
            },
            {
              question: 'Name two costs of adopting a framework.',
              answerOutline:
                'Extra code for users to download, a dependency to keep updated, a build step, and a new mental model to learn.',
            },
          ],
        },
      ],
    },
  ],
  capstone: {
    slug: 'hooklens',
    title: 'hooklens: a local webhook inspector and replayer',
    description:
      'Build a small tool that captures incoming HTTP requests, stores them in JSON Lines, shows them in a typed browser UI with no framework, and replays them to a target URL. The full specification is in the final project page.',
    deliverables: [
      'A Node HTTP API with no web framework, covering capture, listing, deletion and replay',
      'A strict TypeScript browser UI with live updates, details and diffs',
      'A shared contract module used by both sides',
      'Automated tests and a CI workflow',
    ],
    estimatedHours: 16,
    stretchGoals: ['Rewrite the live updates with server-sent events.'],
  },
  masteryChecklist: [
    'I can predict how JavaScript equality, truthiness, closures and this behave without running the code',
    'I can configure a strict TypeScript project and test it',
    'I can model application state as discriminated unions with exhaustive handling',
    'I can treat external data as unknown and parse it at the boundary',
    'I can build interactive pages directly on the DOM with event delegation and no injection holes',
    'I can explain the event loop and predict the order of async output',
    'I can use fetch with correct status handling, cancellation and timeouts, and I can prevent stale response races',
    'I can write and test a JSON API on node:http with limits and consistent errors',
    'I can explain what a framework adds and decide when one is worth the cost',
  ],
});
