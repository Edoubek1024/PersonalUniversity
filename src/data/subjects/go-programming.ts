import { defineSubject } from '../define';

export default defineSubject({
  id: 'go-programming',
  title: 'Go for Backend Services',
  category: 'cs',
  tagline:
    'Go for people who can already program: slices and maps, interfaces, explicit errors, goroutines and channels, context, net/http and testing.',
  description: `This is a short course for programmers who want to write backend services in Go. It assumes you can already program, for example in Python from Programming Fundamentals, so it spends no time on what a loop or a function is. It concentrates on what makes Go different: slices that share memory, interfaces satisfied without being declared, errors returned as ordinary values, and concurrency built into the language with goroutines and channels.

The four modules follow the path of a real service. You learn the language and its data structures, then interfaces and error handling, then concurrency with goroutines, channels and \`context\`. Finally you use \`net/http\` to build servers and resilient clients, and test them properly. Go's standard library is strong enough that you will need almost no third-party code.

This course also serves as background for the Distributed Systems course, because timeouts, retries, cancellation and concurrent state are exactly what its labs demand, and the well-known MIT 6.5840 labs are written in Go. Two machine problems and a final project give you working code that you can put on GitHub.`,
  difficulty: 'intermediate',
  estimatedHours: 32,
  prerequisites: ['programming-fundamentals'],
  recommendedBackground: [
    'Comfortable writing functions, loops and data structures in at least one language',
    'Basic terminal and Git use',
    'A rough idea of threads and of HTTP requests and responses',
  ],
  tags: ['short course', 'go', 'backend', 'concurrency', 'http', 'testing'],
  core: false,
  modules: [
    {
      slug: 'language-basics',
      title: 'The Language: Slices, Maps and Structs',
      description:
        'The Go toolchain and the shape of a program, then the data structures that behave differently from other languages: slices, strings, maps and structs.',
      lessons: [
        {
          slug: 'toolchain-and-program-shape',
          title: 'The toolchain and the shape of a Go program',
          summary:
            'Modules, packages, zero values, multiple return values and defer, plus gofmt, go vet and your first table-driven test.',
          estimatedMinutes: 90,
          objectives: [
            'Create a module and run, build, format, vet and test it',
            'Explain packages, imports and how capitalisation exports a name',
            'Use short declarations and rely on zero values',
            'Return a value and an error, and handle both',
            'Use defer and predict the order it runs in',
            'Write a table-driven test',
          ],
          concepts: [
            'Modules and go.mod',
            'Packages and exported (capitalised) names',
            ':= short declarations',
            'Zero values',
            'Multiple return values',
            'if err != nil',
            'defer',
            'for as the only loop',
            'gofmt and go vet',
            'Table-driven tests',
          ],
          explanation: `Go is a small, statically typed, compiled language with a garbage collector. It compiles to a single binary with no runtime to install, and that is a large part of why backend teams like it.

Start a project with \`go mod init example.com/hello\`. The toolchain does nearly everything: \`go run .\` builds and runs, \`go build\` makes a binary, \`go test ./...\` runs tests, \`go vet ./...\` finds likely bugs, and \`gofmt\` settles all formatting arguments. Let VS Code format on save.

\`\`\`go
package main

import (
	"errors"
	"fmt"
)

func divide(a, b int) (int, error) {
	if b == 0 {
		return 0, errors.New("divide by zero")
	}
	return a / b, nil
}

func main() {
	q, err := divide(7, 2)
	if err != nil {
		fmt.Println("error:", err)
		return
	}
	fmt.Println(q) // 3
}
\`\`\`

Several things here are characteristic. \`:=\` declares and infers a type. Functions return multiple values, and the convention is a result plus an \`error\`. There are no exceptions for ordinary failures. A name starting with a capital letter is **exported** from its package, and a lowercase name is private. That is the entire visibility system. Unused imports and variables are compile errors, on purpose.

**Zero values.** Every variable starts initialised: \`0\`, \`""\`, \`false\`, or \`nil\` for pointers, slices, maps, channels and interfaces. Good Go types make the zero value useful.

**\`defer\`** schedules a call for when the function returns, however it returns. Deferred calls run last-in, first-out, so you put \`defer f.Close()\` right after opening \`f\`. The only loop keyword is \`for\`, which also covers \`while\`-style and \`range\` loops.

**Tests** live in \`*_test.go\` files, and the standard shape is a table:

\`\`\`go
func TestDivide(t *testing.T) {
	tests := []struct{ a, b, want int }{{7, 2, 3}, {-7, 2, -3}, {0, 5, 0}}
	for _, tc := range tests {
		got, err := divide(tc.a, tc.b)
		if err != nil || got != tc.want {
			t.Errorf("divide(%d, %d) = %d, %v; want %d", tc.a, tc.b, got, err, tc.want)
		}
	}
}
\`\`\`

Take the Tour of Go through "Flow control", moving fast over anything familiar, and write the module layout from "How to Write Go Code" by hand.`,
          resources: [
            { title: 'A Tour of Go', url: 'https://go.dev/tour/', type: 'interactive', cost: 'free', provider: 'The Go Project', note: 'Do Basics and Flow control now. Later lessons return to the other sections.', primary: true },
            { title: 'How to Write Go Code', url: 'https://go.dev/doc/code', type: 'documentation', cost: 'free', provider: 'The Go Project', note: 'Modules, packages, and the go command.' },
            { title: 'Add a test (Go tutorial)', url: 'https://go.dev/doc/tutorial/add-a-test', type: 'documentation', cost: 'free', provider: 'The Go Project' },
            { title: 'Go Wiki: Table-driven tests', url: 'https://go.dev/wiki/TableDrivenTests', type: 'documentation', cost: 'free', provider: 'The Go Project', note: 'The standard testing idiom, including subtests with t.Run.' },
          ],
          exercises: [
            {
              slug: 'first-module',
              title: 'A module with a test',
              prompt:
                'Create a module with a package `stats` exporting `Mean(xs []float64) (float64, error)`, which returns an error for empty input, and a `main` package that prints the mean of its command-line arguments. `go run . 1 2 3 4` must print `2.5`. Write a table test with at least 4 cases, and keep `go vet ./...` and `gofmt -l .` silent.',
              kind: 'coding',
              difficulty: 1,
            },
            {
              slug: 'defer-order',
              title: 'Predict defer',
              prompt:
                'Predict the output of a function with `for i := 0; i < 3; i++ { defer fmt.Println("deferred", i) }` followed by `fmt.Println("done")`, then run it. Next write `count()`, which has a named result `n int`, sets `n = 1`, and uses `defer func() { n *= 10 }()` before `return 5`. Predict and verify its result (it is 50), and explain why.',
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'fizz-table',
              title: 'Read a test failure',
              prompt:
                'Write `Classify(n int) string` returning `"fizz"`, `"buzz"`, `"fizzbuzz"` or the number, using a `switch` with no condition. Put 8 cases in a table test with `t.Run` subtests named after the input. Introduce a bug, then run `go test -run "TestClassify/15" -v` to run only one subtest. Record the output and make sure your failure message states input, got and want.',
              kind: 'coding',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'How does Go decide whether a name is visible outside its package?',
              answerOutline: 'By the first letter: capitalised names are exported, and lowercase ones are package-private.',
            },
            {
              question: 'What is a zero value, and why does it matter?',
              answerOutline:
                'Every type has a defined initial value, so there is no uninitialised memory. Well-designed types work without a constructor, such as sync.Mutex and bytes.Buffer.',
            },
            {
              question: 'When do deferred calls run, and in what order?',
              answerOutline:
                'When the surrounding function returns or panics, in last-in, first-out order. Arguments are evaluated when the defer statement runs.',
            },
          ],
          relatedLessons: ['programming-fundamentals/thinking-like-an-engineer/a-second-language'],
        },
        {
          slug: 'slices-and-strings',
          title: 'Slices and strings',
          summary:
            'A slice is a small header pointing at an array, which explains append, aliasing and most slice bugs. Strings are immutable bytes, not characters.',
          estimatedMinutes: 90,
          objectives: [
            'Describe a slice as a pointer, a length and a capacity',
            'Predict when append reuses an array and when it reallocates',
            'Avoid aliasing bugs with copy and full slice expressions',
            'Explain the difference between bytes, runes and strings',
            'Iterate over a string correctly and build strings efficiently',
          ],
          concepts: [
            'Arrays are values with a fixed size',
            'Slice header: pointer, length, capacity',
            'append and reallocation',
            'Aliasing through a shared array',
            'copy and slices.Clone',
            'Strings as immutable byte sequences',
            'Runes and UTF-8',
            'range over a string',
            'strings.Builder',
          ],
          explanation: `Slices are Go's everyday sequence, and they are stranger than they look. An **array** has its size in its type (\`[4]int\`) and is copied on assignment, so you rarely use one directly. A **slice** is a three-word value: a pointer into an underlying array, a length, and a capacity. Passing a slice copies those three words, not the elements.

So \`b := a[1:3]\` shares memory with \`a\`, and writing to \`b[0]\` changes \`a[1]\`. That sharing is efficient, and it is the source of the classic bug:

\`\`\`go
a := make([]int, 3, 4)  // length 3, capacity 4
b := append(a, 1)       // fits: writes into a's array
c := append(a, 2)       // same slot: overwrites b[3]
fmt.Println(b[3], c[3]) // 2 2
\`\`\`

\`append\` writes into the existing array when there is spare capacity. Otherwise it allocates a larger one and copies. So after an append you may or may not share memory with the original, and you must always keep the result: \`xs = append(xs, v)\`.

When a function keeps or returns part of a slice, decide who owns it. Use \`slices.Clone(xs)\` or \`copy\` to get an independent copy, and a full slice expression \`xs[:n:n]\` to cap the capacity, which forces the next append to reallocate. A nil slice is valid: its length is 0 and \`append\` works on it.

**Strings** are immutable sequences of bytes, usually UTF-8. \`len("héllo")\` is 6, because \`é\` takes two bytes, and \`s[1]\` is a byte, not a character. A **rune** is a Unicode code point (an \`int32\`). \`for i, r := range s\` decodes UTF-8, giving each rune and its byte offset, so \`i\` can jump by more than 1. Convert with \`[]rune(s)\` if you truly need to index characters.

Because strings are immutable, \`s += x\` in a loop copies repeatedly, which is quadratic. Use \`strings.Builder\`. The \`strings\`, \`unicode\` and \`slices\` packages cover most daily needs, so read their function lists.

Read "Go Slices: usage and internals" first, and draw the header and array on paper for each example. Then read "Strings, bytes, runes and characters in Go".`,
          resources: [
            { title: 'Go Slices: usage and internals', url: 'https://go.dev/blog/slices-intro', type: 'article', cost: 'free', provider: 'The Go Blog', note: 'The essential article. Draw the diagrams yourself.', primary: true },
            { title: 'Strings, bytes, runes and characters in Go', url: 'https://go.dev/blog/strings', type: 'article', cost: 'free', provider: 'The Go Blog' },
            { title: 'Package slices', url: 'https://pkg.go.dev/slices', type: 'documentation', cost: 'free', provider: 'Go standard library', note: 'Clone, Sort, Index, BinarySearch and friends.' },
            { title: 'Package strings', url: 'https://pkg.go.dev/strings', type: 'documentation', cost: 'free', provider: 'Go standard library' },
          ],
          exercises: [
            {
              slug: 'aliasing-lab',
              title: 'Aliasing lab',
              prompt:
                'Write `func Tail(xs []int) []int { return xs[1:] }`. Show that writing to the result changes the input and that appending to it can overwrite data in the caller when capacity allows. Print `len` and `cap` at each step for `xs := make([]int, 3, 10)`. Then fix it twice, once using `slices.Clone` and once using a full slice expression, and write a test that fails on the original and passes on both fixes.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'growth-measure',
              title: 'Measure append growth',
              prompt:
                'Append 100,000 ints to a nil slice, one at a time, and print each new capacity. Report how many reallocations happened, and the ratio between successive capacities for small and for large sizes. Then time the loop with and without `make([]int, 0, 100000)` using `testing.Benchmark` or `time.Since`, and report the difference.',
              kind: 'data-analysis',
              difficulty: 1,
            },
            {
              slug: 'rune-reverse',
              title: 'Reverse a string correctly',
              prompt:
                'Write a byte-based `ReverseBytes(s string) string` and a rune-based `Reverse(s string) string`. Show that `ReverseBytes("héllo")` produces invalid UTF-8, using `utf8.ValidString`, while `Reverse("héllo")` returns `"olléh"`. Then write `Truncate(s string, n int) string`, which keeps at most `n` runes. `Truncate("héllo", 2)` must return `"hé"`. Test both with a table including an empty string and a string of non-Latin text.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why must you write xs = append(xs, v) rather than just append(xs, v)?',
              answerOutline:
                'append returns a slice header that may have a new length and a new array. The compiler requires you to use the result, and the old header is out of date.',
            },
            {
              question: 'If a function receives a slice and sets xs[0] = 1, does the caller see it? What if it appends?',
              answerOutline:
                'The caller sees xs[0], because the array is shared. The caller does not see an append, because its own header keeps the old length, although the array may have been written to.',
            },
            {
              question: 'What does for i, r := range "héllo" give you that indexing does not?',
              answerOutline: 'Decoded runes and their byte offsets, while indexing gives individual bytes.',
            },
          ],
        },
        {
          slug: 'maps-structs-and-methods',
          title: 'Maps, structs and methods',
          summary:
            'Maps with their nil and ordering rules, structs as values, pointer and value receivers, and composition through embedding.',
          estimatedMinutes: 90,
          objectives: [
            'Use maps safely, including the comma-ok form and nil maps',
            'Produce deterministic output from a map',
            'Choose between value and pointer receivers',
            'Explain that assignment copies a struct',
            'Use embedding for composition and explain how it differs from inheritance',
          ],
          concepts: [
            'Map declaration and make',
            'Comma-ok lookup',
            'Writing to a nil map panics',
            'Randomised iteration order',
            'map[string]struct{} as a set',
            'Struct value semantics',
            'Value and pointer receivers',
            'Struct embedding',
            'Constructor functions',
          ],
          explanation: `A **map** is a built-in hash table: \`counts := map[string]int{}\`. Reading a missing key gives the zero value, which makes counting easy (\`counts[word]++\`) but cannot tell "missing" from "zero". Use the comma-ok form for that: \`v, ok := m[key]\`.

Three behaviours catch people out. A nil map can be read but writing to one **panics**, so always initialise with \`make\` or a literal. Iteration order is **deliberately randomised**, so sort keys when output must be stable: \`slices.Sorted(maps.Keys(m))\`. And maps are not safe for concurrent writes, which matters in module 3. Keys can be any comparable type, including structs and arrays but not slices. There is no set type, so use \`map[string]struct{}\` or \`map[string]bool\`.

A **struct** groups fields, and assigning one **copies** it, nested arrays included. Slices and maps inside a struct are copied as headers, so they still share data.

\`\`\`go
type Counter struct {
	name string
	hits int
}

func (c *Counter) Inc()        { c.hits++ }
func (c Counter) Name() string { return c.name }
\`\`\`

A **method** is a function with a receiver. A value receiver gets a copy, so \`func (c Counter) Inc()\` would increment the copy and do nothing visible. Use a pointer receiver when the method changes the receiver, when the struct is large, or when it holds something that must not be copied, such as a \`sync.Mutex\`. For consistency, if one method on a type needs a pointer, make them all pointers.

There are no classes or constructors. By convention, a function \`NewCounter(name string) *Counter\` builds a value when the zero value is not enough.

**Embedding** places one type inside another without a field name, and promotes its methods:

\`\`\`go
type Server struct {
	Counter // Server now has Inc and Name
	addr    string
}
\`\`\`

This is composition, not inheritance. A \`Server\` is not a \`Counter\`, and the receiver inside \`Inc\` is still just the embedded \`Counter\`.

Do the Tour's "More types" and "Methods" sections, then read the maps post on the Go blog and the Effective Go sections on maps, methods and embedding.`,
          resources: [
            { title: 'A Tour of Go: More types', url: 'https://go.dev/tour/moretypes/1', type: 'interactive', cost: 'free', provider: 'The Go Project', note: 'Do the slice and map exercises.', primary: true },
            { title: 'Go maps in action', url: 'https://go.dev/blog/maps', type: 'article', cost: 'free', provider: 'The Go Blog' },
            { title: 'Effective Go', url: 'https://go.dev/doc/effective_go', type: 'documentation', cost: 'free', provider: 'The Go Project', note: 'Read the Maps, Methods and Embedding sections.' },
            { title: 'Package maps', url: 'https://pkg.go.dev/maps', type: 'documentation', cost: 'free', provider: 'Go standard library' },
          ],
          exercises: [
            {
              slug: 'word-count',
              title: 'Deterministic word count',
              prompt:
                'Write `TopWords(text string, n int) []WordCount`, returning the `n` most frequent lowercase words, sorted by count descending and then alphabetically. `TopWords("the cat and the hat and the bat", 2)` must return `the: 3` and `and: 2`. Run the test 100 times with `go test -count=100`. Show what breaks if you sort by count only, which is a tie left to random map order.',
              kind: 'coding',
              difficulty: 1,
            },
            {
              slug: 'receiver-bug',
              title: 'The lost update',
              prompt:
                'Define `type Account struct { balance int }` with `Deposit` on a value receiver, and show that the deposit disappears. Fix it with a pointer receiver. Then store accounts in `map[string]Account` and try `m["a"].Deposit(5)`. Record the compile error, explain why map elements are not addressable, and fix it by storing `*Account`.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'embedded-logger',
              title: 'Embedding in practice',
              prompt:
                'Write `type Base struct { ID int }` with a method `Describe() string` that returns `"item <ID>"`. Embed it in `type User struct { Base; Name string }`. Show that `u.Describe()` and `u.ID` work. Then define `Describe` on `User` too, call both versions, and explain why calling `u.Base.Describe()` never reaches the `User` version. Write a short comparison with what inheritance would do.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What happens when you read from and write to a nil map?',
              answerOutline: 'A read returns the zero value, and a write panics. Initialise with make or a literal.',
            },
            {
              question: 'When should a method use a pointer receiver?',
              answerOutline:
                'When it mutates the receiver, when the struct is large, when it holds a value that must not be copied such as a mutex, or for consistency with other methods on the type.',
            },
            {
              question: 'How does embedding differ from inheritance?',
              answerOutline:
                'Methods are promoted, but there is no subtype relationship or virtual dispatch. The embedded value does not know about the outer type.',
            },
          ],
        },
      ],
    },
    {
      slug: 'interfaces-and-errors',
      title: 'Interfaces, Errors and Streams',
      description:
        'The ideas that give Go programs their shape: interfaces satisfied implicitly, errors handled as values, and composable streams with a little generics.',
      lessons: [
        {
          slug: 'interfaces',
          title: 'Interfaces and type switches',
          summary:
            'Interfaces are satisfied implicitly, which lets you keep them small and define them where they are used. Learn the idioms and the nil interface trap.',
          estimatedMinutes: 90,
          objectives: [
            'Define and satisfy an interface without declaring that you do',
            'Design small interfaces at the point of use',
            'Use type assertions and type switches',
            'Explain why an interface holding a nil pointer is not nil',
            'Use an interface to replace a dependency in tests',
          ],
          concepts: [
            'Implicit interface satisfaction',
            'Small interfaces: io.Reader, fmt.Stringer, error',
            'Interface value: a type and a value',
            'Accept interfaces, return concrete types',
            'Define interfaces at the consumer',
            'Type assertions and comma-ok',
            'Type switches',
            'The nil interface trap',
            'any',
          ],
          explanation: `An interface is a set of method signatures, and a type satisfies it just by having those methods. There is no \`implements\` keyword:

\`\`\`go
type Stringer interface{ String() string }

type Temp float64

func (t Temp) String() string { return fmt.Sprintf("%.1f C", float64(t)) }

var s Stringer = Temp(21.5) // compiles: Temp has String
\`\`\`

This seems minor, but it reverses the usual design. Because a type need not know about the interface, the **consumer** defines the interface it needs, listing just the methods it calls. A function that needs to read should accept \`io.Reader\`, and then it works on files, network connections, strings and test data. The common advice is "accept interfaces, return concrete types".

So Go interfaces are **small**. Most have one or two methods: \`io.Reader\`, \`io.Writer\`, \`fmt.Stringer\`, \`error\`, \`http.Handler\`. Another good example is \`fs.FS\`, a read-only file tree with a single \`Open\` method. Code written against it runs on a real directory through \`os.DirFS\`, and on an in-memory tree in tests through \`fstest.MapFS\`. Do not write a large interface in advance next to its only implementation. Add one when you have a second implementation or a test double that needs it.

An interface value holds two things: a concrete **type** and a **value**. To get the concrete value back, use an assertion, \`t, ok := s.(Temp)\`, or a **type switch**:

\`\`\`go
switch v := x.(type) {
case int:
	fmt.Println("int", v+1)
case string:
	fmt.Println("string", len(v))
default:
	fmt.Println("something else")
}
\`\`\`

\`any\` is the empty interface, which every type satisfies. It gives up type checking, so use it sparingly.

**The nil interface trap.** An interface equals \`nil\` only if both its type and its value are nil:

\`\`\`go
func find() error {
	var e *MyError = nil
	return e // the caller sees err != nil
}
\`\`\`

The returned interface has type \`*MyError\` and a nil value, so \`err != nil\` is true. Return a literal \`nil\` for no error, and never return a typed nil pointer as an \`error\`.

Do the Tour's Interfaces section, read the "Interfaces" part of Effective Go, and read the FAQ entry on why a nil error value is not equal to nil.`,
          resources: [
            { title: 'A Tour of Go: Methods and interfaces', url: 'https://go.dev/tour/methods/1', type: 'interactive', cost: 'free', provider: 'The Go Project', note: 'Do the Stringer, errors and Reader exercises.', primary: true },
            { title: 'Go FAQ', url: 'https://go.dev/doc/faq', type: 'documentation', cost: 'free', provider: 'The Go Project', note: 'See "Why is my nil error value not equal to nil?" and the section on types.' },
            { title: 'The Laws of Reflection', url: 'https://go.dev/blog/laws-of-reflection', type: 'article', cost: 'free', provider: 'The Go Blog', note: 'Read the opening sections on how interface values are represented.' },
            { title: 'Go Code Review Comments', url: 'https://go.dev/wiki/CodeReviewComments', type: 'documentation', cost: 'free', provider: 'The Go Project', note: 'See the Interfaces section.' },
          ],
          exercises: [
            {
              slug: 'count-writer',
              title: 'A counting writer',
              prompt:
                'Write a `CountingWriter` that wraps an `io.Writer` and counts bytes, line breaks and calls. Use it with `fmt.Fprintf(cw, "hello\\nworld\\n")` over a `bytes.Buffer`: it must report 12 bytes and 2 lines. Then use it with `os.Stdout` and with `io.Discard` without changing your type. Explain why nothing in your code mentions those destinations.',
              kind: 'coding',
              difficulty: 1,
            },
            {
              slug: 'nil-trap',
              title: 'Reproduce the nil interface trap',
              prompt:
                'Define `type MyError struct{}` with a pointer-receiver `Error` method. Write `bad() error`, which returns a nil `*MyError`, and `good() error`, which returns `nil`. Print `err == nil` for each, then print `fmt.Printf("%T %v", err, err)`. Explain the two words stored in the interface. Check whether `go vet` catches it, and record what it says.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'fake-clock',
              title: 'An interface for a test double',
              prompt:
                'Write `type Limiter struct` allowing at most 3 calls to `Allow()` in any 1-minute window. Define a small `Clock` interface with `Now() time.Time`, with a real implementation and a fake one. Test with the fake clock, with no sleeping: 3 calls allowed, a fourth denied, then allowed again once the clock moves 61 seconds. The Clock interface should be defined in the limiter package, next to where it is used.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What does "accept interfaces, return concrete types" mean, and why?',
              answerOutline:
                'Parameters ask for the minimum behaviour, which keeps callers flexible. Returning a concrete type gives callers everything and lets the package add methods later.',
            },
            {
              question: 'Why can a function that returns error yield a non-nil error holding a nil pointer?',
              answerOutline:
                'An interface is nil only when both type and value are nil. A typed nil pointer sets the type word, so the interface is not nil.',
            },
            {
              question: 'Why does Go tend to define interfaces in the consuming package?',
              answerOutline:
                'Satisfaction is implicit, so the consumer can declare exactly what it needs, and the implementing package has no dependency on it.',
            },
          ],
        },
        {
          slug: 'error-handling',
          title: 'Error handling',
          summary:
            'Errors are values. Add context by wrapping, inspect with errors.Is and errors.As, and keep panic for bugs.',
          estimatedMinutes: 75,
          objectives: [
            'Add context to errors with fmt.Errorf and %w',
            'Check errors with errors.Is and errors.As rather than string matching',
            'Choose between sentinel errors, custom types and opaque errors',
            'Handle an error exactly once',
            'Explain when panic and recover are appropriate',
          ],
          concepts: [
            'The error interface',
            'Wrapping with %w',
            'errors.Is and errors.As',
            'Sentinel errors',
            'Custom error types',
            'errors.Join',
            'Handle an error once',
            'panic, recover and programmer errors',
          ],
          explanation: `An \`error\` is any value with an \`Error() string\` method, and it is returned like any other result. This feels verbose at first. In exchange, every failure path is visible in the code, and you can program with errors as values.

**Add context as errors travel up.** A bare \`no such file\` tells you little. Wrap with \`%w\` at each level where you have something useful to add:

\`\`\`go
func loadConfig(path string) (Config, error) {
	data, err := os.ReadFile(path)
	if err != nil {
		return Config{}, fmt.Errorf("load config %s: %w", path, err)
	}
	// ...
}
\`\`\`

The message becomes a readable chain, and the original error stays available.

**Inspect, do not compare strings.** \`errors.Is\` walks the chain looking for a specific value, and \`errors.As\` looks for a type:

\`\`\`go
if errors.Is(err, fs.ErrNotExist) {
	// create a default
}

var pathErr *fs.PathError
if errors.As(err, &pathErr) {
	log.Println(pathErr.Path)
}
\`\`\`

Use \`==\` only if you know the error is not wrapped. Prefer \`errors.Is\`.

**Design choices.** A **sentinel** such as \`var ErrNotFound = errors.New("not found")\` works when callers need only to detect a condition. A **custom type** works when callers need details, such as an HTTP status or a field name. An opaque error is fine when callers can only report it. Each exported sentinel or type becomes part of your API.

**Handle an error once.** Either deal with it or return it, not both. Logging and returning produces the same failure several times in the logs. Log at the top of the call chain, where you decide what happens. \`errors.Join\` combines several errors, which helps when you want to report every failure from a batch.

**\`panic\`** stops normal execution and runs deferred calls. It is for programmer errors and impossible states, not for bad input or a failed network call. \`recover\`, called in a deferred function, stops a panic. Its real use is at a boundary such as an HTTP server, which recovers per request so that one bug does not kill the process. A panic in a goroutine you started has no such protection: it crashes the whole program.

Read "Working with Errors in Go 1.13" and "Errors are values", then read the \`errors\` package docs.`,
          resources: [
            { title: 'Working with Errors in Go 1.13', url: 'https://go.dev/blog/go1.13-errors', type: 'article', cost: 'free', provider: 'The Go Blog', note: 'Wrapping, Is and As, and when not to wrap.', primary: true },
            { title: 'Errors are values', url: 'https://go.dev/blog/errors-are-values', type: 'article', cost: 'free', provider: 'The Go Blog' },
            { title: 'Package errors', url: 'https://pkg.go.dev/errors', type: 'documentation', cost: 'free', provider: 'Go standard library' },
            { title: 'Defer, Panic, and Recover', url: 'https://go.dev/blog/defer-panic-and-recover', type: 'article', cost: 'free', provider: 'The Go Blog' },
          ],
          exercises: [
            {
              slug: 'wrap-chain',
              title: 'Build and inspect an error chain',
              prompt:
                'Write three layers: `readUser(id)` returns `ErrNotFound`, `loadProfile(id)` wraps it with the id, and `handle(id)` wraps it again. Show that the final message reads `handle: load profile 7: user not found`, that `errors.Is(err, ErrNotFound)` is true, and that `err == ErrNotFound` is false. Add a `*ValidationError{Field string}` case, and extract `Field` with `errors.As`.',
              kind: 'coding',
              difficulty: 1,
            },
            {
              slug: 'close-errors',
              title: 'Do not lose the Close error',
              prompt:
                'Write `WriteConfig(path string, data []byte) (err error)`, which creates a file, writes it, and closes it. Writes to files can fail at `Close`, so use a named result and a deferred function that uses `errors.Join` to keep both a write error and a close error. Test it with a fake `io.WriteCloser` that fails on `Write`, on `Close`, and on both, and check that `errors.Is` finds each failure.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'batch-validate',
              title: 'Report every failure',
              prompt:
                'Write `ValidateAll(users []User) error` that checks every record and returns all failures together using `errors.Join`, each wrapped with the record index, or `nil` when all pass. Three invalid records out of ten must produce a message with three lines. A test must find a specific `*ValidationError` in the result with `errors.As`. Explain why this is different from stopping at the first failure, and when you would want each.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What is the difference between %w and %v in fmt.Errorf?',
              answerOutline: '%w keeps the original in the chain for errors.Is and errors.As. %v keeps only its text.',
            },
            {
              question: 'When would you hide a cause by using %v deliberately?',
              answerOutline:
                'When the underlying error is an implementation detail you do not want callers to depend on, because wrapping makes it part of your API.',
            },
            {
              question: 'Should a library panic when a network request fails?',
              answerOutline:
                'No. That is an expected failure, so return an error. Panic is for bugs and impossible states.',
            },
          ],
        },
        {
          slug: 'io-json-and-generics',
          title: 'Streams, JSON and a little generics',
          summary:
            'Compose readers and writers, read input line by line, map JSON onto structs, and use generics where they earn their place.',
          estimatedMinutes: 90,
          objectives: [
            'Compose io.Reader and io.Writer values',
            'Read lines with bufio.Scanner and handle its limits',
            'Encode and decode JSON with struct tags',
            'Stream JSON with Encoder and Decoder',
            'Write a generic function with a constraint',
            'Decide when generics are better than interfaces',
          ],
          concepts: [
            'io.Reader and io.Writer contracts',
            'io.Copy, io.MultiWriter, io.LimitReader',
            'bufio.Scanner and its token limit',
            'encoding/json and struct tags',
            'json.Decoder and DisallowUnknownFields',
            'Only exported fields are encoded',
            'Type parameters and constraints',
            'cmp.Ordered',
          ],
          explanation: `Go's I/O is built on two one-method interfaces. \`Read(p []byte) (n int, err error)\` fills a buffer, and \`Write\` drains one. Because files, sockets, HTTP bodies, compressors and hashes all use them, they compose like a Unix pipeline:

\`\`\`go
h := sha256.New() // a hash is an io.Writer
n, err := io.Copy(h, io.LimitReader(file, 1<<20))
\`\`\`

This reads at most 1 MiB and hashes it in small chunks, using constant memory. Prefer streaming to \`os.ReadFile\` for anything that could be large. Note the \`Read\` contract: it may return fewer bytes than asked for, and it may return data together with \`io.EOF\`. That is why you use \`io.Copy\`, \`io.ReadFull\` and \`bufio\` rather than calling \`Read\` by hand.

\`bufio.Scanner\` reads line by line. Check \`scanner.Err()\` after the loop, and be aware of its default 64 KiB token limit, which you can raise with \`scanner.Buffer\`.

**JSON** maps onto structs through **tags**, and only **exported** fields take part:

\`\`\`go
type Item struct {
	ID    int      \`json:"id"\`
	Name  string   \`json:"name"\`
	Notes []string \`json:"notes,omitempty"\`
	cost  int      // lowercase: ignored by encoding/json
}
\`\`\`

\`json.Marshal\` and \`json.Unmarshal\` work on whole values. \`json.NewEncoder(w).Encode(v)\` and \`json.NewDecoder(r).Decode(&v)\` work on streams, and you will use these for HTTP. By default the decoder ignores unknown fields, so call \`DisallowUnknownFields\` if you want to reject typos. A missing field keeps its zero value, so you cannot distinguish absent from zero without a pointer field.

**Generics** let a function work over many types while staying type safe:

\`\`\`go
func Max[T cmp.Ordered](xs []T) (T, bool) {
	var best T
	if len(xs) == 0 {
		return best, false
	}
	best = xs[0]
	for _, x := range xs[1:] {
		if x > best {
			best = x
		}
	}
	return best, true
}
\`\`\`

Reach for generics for containers and algorithms that are identical for every type, as in the \`slices\` and \`maps\` packages. If the behaviour differs by type, use an interface. Do not start with generics: write the concrete version first.

Read the \`io\` package overview and the JSON blog post, then use the generics tutorial as a quick reference.`,
          resources: [
            { title: 'Package io', url: 'https://pkg.go.dev/io', type: 'documentation', cost: 'free', provider: 'Go standard library', note: 'Read the Reader and Writer contracts closely.', primary: true },
            { title: 'JSON and Go', url: 'https://go.dev/blog/json', type: 'article', cost: 'free', provider: 'The Go Blog' },
            { title: 'Package encoding/json', url: 'https://pkg.go.dev/encoding/json', type: 'documentation', cost: 'free', provider: 'Go standard library' },
            { title: 'Tutorial: Getting started with generics', url: 'https://go.dev/doc/tutorial/generics', type: 'documentation', cost: 'free', provider: 'The Go Project' },
            { title: 'Package bufio', url: 'https://pkg.go.dev/bufio', type: 'documentation', cost: 'free', provider: 'Go standard library' },
          ],
          exercises: [
            {
              slug: 'tee-hash',
              title: 'Copy and hash at once',
              prompt:
                'Write `CopyWithHash(dst io.Writer, src io.Reader) (n int64, sum string, err error)`, which streams `src` to `dst` and returns the SHA-256 in hex, using `io.MultiWriter`. For the input `hello`, it must return `n = 5` and the sum `2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824`. Show that memory stays flat on a 1 GB generated stream, using a reader you write yourself.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'jsonl-reader',
              title: 'Read JSON Lines',
              prompt:
                'Write `ReadEvents(r io.Reader) ([]Event, []error)` for a file of one JSON object per line, with the tags `ts`, `user` and `action`. A malformed line is reported with its line number and does not stop the read. Test a 5-line input where line 3 is broken: expect 4 events and 1 error mentioning line 3. Then add a line of 100 KiB, and fix the `bufio.Scanner: token too long` failure that it causes.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'generic-set',
              title: 'A small generic set',
              prompt:
                'Write `type Set[T comparable] map[T]struct{}` with `Add`, `Has`, `Len` and a generic function `Sorted[T cmp.Ordered](s Set[T]) []T`. Test it with strings and with ints. Then write `Map[T, U any](xs []T, f func(T) U) []U`. In a short comment, explain why `Sorted` cannot be a method of `Set` using the `comparable` constraint.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why is a Read that returns n > 0 together with io.EOF valid, and what must your code do?',
              answerOutline:
                'The contract allows it. Process the n bytes first and only then look at the error. io.Copy and bufio handle this for you.',
            },
            {
              question: 'Why might a JSON field stay empty after decoding even though it is in the input?',
              answerOutline:
                'The struct field is unexported, or the name or tag does not match. Only exported fields are decoded.',
            },
            {
              question: 'When should you pick generics over an interface?',
              answerOutline:
                'When the same code works for many types, as with containers. Use an interface when the behaviour differs for each type.',
            },
          ],
        },
      ],
    },
    {
      slug: 'concurrency',
      title: 'Concurrency: Goroutines, Channels and Context',
      description:
        'Run work concurrently with goroutines, protect or communicate state safely, and stop work cleanly with context. The race detector is your constant companion.',
      lessons: [
        {
          slug: 'goroutines-and-shared-memory',
          title: 'Goroutines and shared memory',
          summary:
            'Goroutines are cheap, but sharing memory between them is still a data race. Use WaitGroup, Mutex, atomics and the race detector.',
          estimatedMinutes: 90,
          objectives: [
            'Start goroutines and wait for them with sync.WaitGroup',
            'Explain how goroutines differ from OS threads',
            'Reproduce a data race and find it with the race detector',
            'Protect shared state with sync.Mutex and sync/atomic',
            'Explain goroutine leaks and how a panic in a goroutine behaves',
          ],
          concepts: [
            'Goroutines and the Go scheduler',
            'sync.WaitGroup',
            'Data races',
            'The race detector (-race)',
            'sync.Mutex and sync.RWMutex',
            'sync/atomic',
            'Happens-before and the Go memory model',
            'Goroutine leaks',
          ],
          explanation: `\`go f()\` starts \`f\` in a new **goroutine**, a function running concurrently with the rest of the program. Goroutines are not OS threads. The Go runtime schedules them onto a small number of threads, and each starts with a stack of a few kilobytes that grows on demand. Ten thousand of them is routine, and that is why a Go server can simply use one goroutine per request.

A program exits when \`main\` returns, without waiting for other goroutines, so you must wait for them yourself. Start with \`sync.WaitGroup\`.

\`\`\`go
var (
	mu    sync.Mutex
	wg    sync.WaitGroup
	count int
)
for range 1000 {
	wg.Add(1)
	go func() {
		defer wg.Done()
		mu.Lock()
		defer mu.Unlock()
		count++
	}()
}
wg.Wait()
fmt.Println(count) // 1000
\`\`\`

Call \`Add\` before the \`go\` statement, not inside the goroutine, or \`Wait\` can return early. Since Go 1.25, \`wg.Go(f)\` handles \`Add\` and \`Done\` for you, and Go 1.22 made each loop iteration's variable a new one, so closures in loops no longer share it.

**Data races.** Without the mutex, \`count++\` is a read, an add and a write, and concurrent goroutines lose updates, exactly as threads do in C. In Go a race is a real bug with undefined results, even on one variable. A map written concurrently can crash the program with a fatal error.

The **race detector** finds these at runtime: \`go test -race ./...\` or \`go run -race .\`. Run it all the time. It finds only races that actually execute, so it is only as good as your tests. It needs cgo and a C compiler, which is one reason this course works in Ubuntu under WSL 2.

Protect state with \`sync.Mutex\`, keeping it next to the fields it guards, and do not copy a struct containing one (\`go vet\` warns you). \`sync.RWMutex\` helps only with heavy read traffic. For a lone counter, \`atomic.Int64\` is simple and fast.

**Leaks.** A goroutine blocked forever is never collected. Every time you write \`go\`, know how that goroutine ends. Remember too that an unrecovered panic in any goroutine ends the whole process.

Read the Go race detector article and the opening of the memory model, and follow the Tour's Concurrency section up to \`sync.Mutex\`.`,
          resources: [
            { title: 'Data Race Detector', url: 'https://go.dev/doc/articles/race_detector', type: 'documentation', cost: 'free', provider: 'The Go Project', note: 'Includes a useful list of typical data races.', primary: true },
            { title: 'A Tour of Go: Concurrency', url: 'https://go.dev/tour/concurrency/1', type: 'interactive', cost: 'free', provider: 'The Go Project' },
            { title: 'The Go Memory Model', url: 'https://go.dev/ref/mem', type: 'documentation', cost: 'free', provider: 'The Go Project', note: 'Read the introduction and the advice section at least.' },
            { title: 'Package sync', url: 'https://pkg.go.dev/sync', type: 'documentation', cost: 'free', provider: 'Go standard library' },
          ],
          exercises: [
            {
              slug: 'count-with-a-race',
              title: 'Measure a data race',
              prompt:
                'Run 1,000 goroutines that each increment a shared `int` 1,000 times. Print the final value over 5 runs, and record how far below 1,000,000 it falls. Run it with `-race` and paste the two stack traces it prints. Fix it with `sync.Mutex`, then with `atomic.Int64`, and compare the two with `time.Since`. Both must print exactly 1000000, with no race reports.',
              kind: 'coding',
              difficulty: 1,
            },
            {
              slug: 'safe-counter-type',
              title: 'A safe metrics type',
              prompt:
                'Write `type Metrics struct` with `Inc(name string)` and `Snapshot() map[string]int`, safe for concurrent use. `Snapshot` must return a copy, so a caller cannot race with later writes. Test it under `-race`: 50 goroutines each call `Inc("hits")` 100 times while another goroutine calls `Snapshot` in a loop, and the final count must be 5000. Then return the internal map instead and show the race detector catching it.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'parallel-sum',
              title: 'Measure the speedup',
              prompt:
                'Sum the squares of a slice of 50 million ints with 1, 2, 4 and 8 goroutines, giving each goroutine its own chunk and result slot. Report a table of time and speedup. Then have every goroutine update a single shared `atomic.Int64` for each element, and report how much slower it gets. Explain the result in terms of contention.',
              kind: 'data-analysis',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why must wg.Add be called before the go statement?',
              answerOutline:
                'Otherwise Wait may run first, see a count of zero and return before the goroutine has started.',
            },
            {
              question: 'If the race detector reports nothing, does that prove the code is race free?',
              answerOutline: 'No. It reports only races on paths that actually ran, so coverage matters.',
            },
            {
              question: 'Why can a server use one goroutine per request when it would not use one thread per request?',
              answerOutline:
                'Goroutines start with small growable stacks and are scheduled in user space, so they are far cheaper than OS threads.',
            },
          ],
          relatedLessons: ['operating-systems/concurrency/threads-and-races', 'operating-systems/concurrency/locks'],
        },
        {
          slug: 'channels-and-select',
          title: 'Channels and select',
          summary:
            'Channels pass values between goroutines and synchronise them. Build worker pools and pipelines, and learn the rules for closing.',
          estimatedMinutes: 90,
          objectives: [
            'Explain unbuffered and buffered channels',
            'Close channels correctly and range over them',
            'Use select with several channels and with timeouts',
            'Build a worker pool and a pipeline',
            'Diagnose deadlocks and blocked goroutines',
            'Decide between a channel and a mutex',
          ],
          concepts: [
            'Unbuffered channels as a rendezvous',
            'Buffered channels',
            'Directional channel types',
            'close and range',
            'select',
            'Nil channels block forever',
            'Worker pool',
            'Pipeline and fan-out, fan-in',
            'Semaphore from a buffered channel',
          ],
          explanation: `A channel is a typed pipe between goroutines. An **unbuffered** channel (\`make(chan int)\`) is a rendezvous: a send waits for a receiver, so the two goroutines synchronise. A **buffered** channel (\`make(chan int, 8)\`) lets a sender continue until the buffer is full. A buffer does not fix a deadlock. Use one for a real reason, such as absorbing bursts or limiting concurrency.

**Closing** says no more values will come. \`for v := range ch\` stops when the channel is closed and drained, and a receive on a closed channel returns the zero value at once, with \`v, ok := <-ch\` giving \`ok == false\`. The rules are strict: sending on a closed channel **panics**, closing twice panics, and the receiver cannot tell anything by asking. So the **sender closes**, and when there are several senders, a coordinator closes after they have all finished.

A **worker pool** puts this together:

\`\`\`go
func squares(in []int, workers int) []int {
	jobs := make(chan int)
	results := make(chan int)
	var wg sync.WaitGroup
	for range workers {
		wg.Add(1)
		go func() {
			defer wg.Done()
			for j := range jobs {
				results <- j * j
			}
		}()
	}
	go func() {
		for _, v := range in {
			jobs <- v
		}
		close(jobs)
		wg.Wait()
		close(results)
	}()
	var out []int
	for r := range results {
		out = append(out, r)
	}
	return out
}
\`\`\`

Trace who closes what: the feeder closes \`jobs\`, the workers exit, and only then is \`results\` closed. Results arrive in any order, so attach an index if order matters.

**\`select\`** waits on several channel operations and runs one that is ready, choosing at random if several are. A \`case <-time.After(d)\` gives you a timeout, and a \`default\` case makes the select non-blocking. A **nil channel** blocks forever, so setting a channel variable to nil disables that case.

A buffered channel also makes a neat **semaphore**: send to acquire a slot, receive to release it.

**Channel or mutex?** Use channels to transfer ownership of data or to signal events. Use a mutex to guard a small piece of state, such as a cache or counter.

If everything blocks, the runtime stops with \`all goroutines are asleep - deadlock!\`. A partial deadlock gives no such message, so tests must look for it. Read the pipelines article, then finish the Tour's Concurrency section.`,
          resources: [
            { title: 'Go Concurrency Patterns: Pipelines and cancellation', url: 'https://go.dev/blog/pipelines', type: 'article', cost: 'free', provider: 'The Go Blog', note: 'The reference for fan-out, fan-in and stopping early.', primary: true },
            { title: 'Effective Go', url: 'https://go.dev/doc/effective_go', type: 'documentation', cost: 'free', provider: 'The Go Project', note: 'See the Concurrency section.' },
            { title: 'Share Memory By Communicating', url: 'https://go.dev/blog/codelab-share', type: 'article', cost: 'free', provider: 'The Go Blog' },
            { title: 'Concurrency is not parallelism', url: 'https://go.dev/blog/waza-talk', type: 'video', cost: 'free', provider: 'The Go Blog', note: 'Rob Pike explains the distinction.' },
          ],
          exercises: [
            {
              slug: 'ordered-worker-pool',
              title: 'An ordered worker pool',
              prompt:
                'Write `Map[T, R any](in []T, workers int, f func(T) R) []R`, which runs `f` concurrently and returns results in input order. Attach the index to each job. Test it with 1,000 inputs and random small sleeps inside `f`, and verify the output is ordered, that peak concurrency never exceeds `workers` (use `atomic.Int64`), and that `workers = 1` and `workers = 16` give the same output. It must pass under `-race`.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'deadlock-zoo',
              title: 'A small deadlock zoo',
              prompt:
                'Write 4 short programs that deadlock or panic: a send on an unbuffered channel with no receiver, a `range` over a channel that is never closed, a send on a closed channel, and a worker pool that closes `results` before the workers finish. For each, record the exact runtime message, and write the one-line fix.',
              kind: 'coding',
              difficulty: 1,
            },
            {
              slug: 'pipeline-stages',
              title: 'A three-stage pipeline',
              prompt:
                'Build `gen -> square -> sum` as goroutines connected by channels, with each stage owning and closing its output. Sum the squares of 1 to 1000: the answer is 333,833,500. Then fan out `square` to 4 workers and merge their outputs, and check the sum is unchanged. Finally, make the consumer stop after 10 values and use `runtime.NumGoroutine` to show that the upstream stages leak, which sets up the next lesson.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Who should close a channel, and why?',
              answerOutline:
                'The sender, or a coordinator when there are several senders, because only it knows no more values are coming. Sending on a closed channel panics.',
            },
            {
              question: 'What happens when you receive from a closed channel?',
              answerOutline: 'Buffered values are returned first, then the zero value immediately, with ok false.',
            },
            {
              question: 'How do you limit a worker to N concurrent operations with a channel?',
              answerOutline:
                'Create a buffered channel of size N. Send before starting an operation and receive when it finishes.',
            },
          ],
          relatedLessons: ['operating-systems/concurrency/condition-variables-and-semaphores'],
        },
        {
          slug: 'context-and-cancellation',
          title: 'Context and cancellation',
          summary:
            'context.Context carries deadlines and cancellation through a call tree. Use it to stop work, avoid leaks and handle shutdown signals.',
          estimatedMinutes: 90,
          objectives: [
            'Create contexts with cancellation, timeouts and deadlines',
            'Pass a context through a call chain and respect it in loops',
            'Stop a pipeline early without leaking goroutines',
            'Handle Ctrl-C and SIGTERM with signal.NotifyContext',
            'Coordinate goroutines that can fail with errgroup',
          ],
          concepts: [
            'context.Context',
            'WithCancel, WithTimeout, WithDeadline',
            'ctx.Done() and ctx.Err()',
            'Cancellation flows from parent to child',
            'Always call cancel',
            'Context as the first parameter',
            'signal.NotifyContext',
            'errgroup',
          ],
          explanation: `Concurrent work needs a way to stop: the client went away, the deadline passed, or a sibling failed. **\`context.Context\`** carries that signal down a tree of calls.

\`\`\`go
ctx, cancel := context.WithTimeout(context.Background(), 2*time.Second)
defer cancel()
result, err := fetchAll(ctx, urls)
\`\`\`

Contexts form a tree. Cancelling one cancels everything derived from it, but never its parent. Always call \`cancel\`, even after success, because it releases resources. \`go vet\` warns if you forget. By convention, \`ctx\` is the **first parameter** of any function that blocks, and you do not store it in a struct.

Context does not stop anything by itself. It is cooperative: your code must look at it. In a loop or a blocking operation, use \`select\` on \`ctx.Done()\`:

\`\`\`go
func worker(ctx context.Context, jobs <-chan Job, out chan<- Result) error {
	for {
		select {
		case <-ctx.Done():
			return ctx.Err()
		case j, ok := <-jobs:
			if !ok {
				return nil
			}
			r := process(j)
			select {
			case out <- r:
			case <-ctx.Done():
				return ctx.Err()
			}
		}
	}
}
\`\`\`

Note the second \`select\`. A send can block too, and a goroutine stuck on one leaks. This pattern fixes the leak from the last lesson's pipeline. \`ctx.Err()\` returns \`context.Canceled\` or \`context.DeadlineExceeded\`, and you should return it wrapped so callers can test it with \`errors.Is\`.

Standard library calls such as \`http.NewRequestWithContext\` and \`exec.CommandContext\` already respect a context. CPU-heavy loops must check \`ctx.Err()\` every so often.

**Shutdown.** \`signal.NotifyContext(context.Background(), os.Interrupt, syscall.SIGTERM)\` returns a context cancelled when the process receives one of those signals. Pass it down, and a single Ctrl-C unwinds your whole program.

**\`errgroup\`** from \`golang.org/x/sync\` combines a WaitGroup, error handling and cancellation. \`errgroup.WithContext\` gives you a context that is cancelled when any goroutine returns an error, \`g.Go(f)\` starts work, and \`g.Wait()\` returns the first error. \`g.SetLimit(n)\` also bounds concurrency.

Avoid \`context.WithValue\` for ordinary parameters. It suits request-scoped data such as trace IDs, not optional arguments. Read "Go Concurrency Patterns: Context" and the \`context\` package overview.`,
          resources: [
            { title: 'Go Concurrency Patterns: Context', url: 'https://go.dev/blog/context', type: 'article', cost: 'free', provider: 'The Go Blog', primary: true },
            { title: 'Package context', url: 'https://pkg.go.dev/context', type: 'documentation', cost: 'free', provider: 'Go standard library', note: 'Read the overview and its rules for using contexts.' },
            { title: 'Package errgroup', url: 'https://pkg.go.dev/golang.org/x/sync/errgroup', type: 'documentation', cost: 'free', provider: 'Go project (x/sync)' },
            { title: 'Package os/signal', url: 'https://pkg.go.dev/os/signal', type: 'documentation', cost: 'free', provider: 'Go standard library' },
          ],
          exercises: [
            {
              slug: 'fix-the-leak',
              title: 'Fix the pipeline leak',
              prompt:
                'Add a `context.Context` to the three-stage pipeline from the last lesson. When the consumer takes 10 values and calls `cancel`, every stage must exit. Write a test that records `runtime.NumGoroutine()` before the pipeline, cancels, and polls until the count returns to the baseline, failing after 1 second. It must fail on the old version and pass on the new one.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'first-of-many',
              title: 'First successful answer',
              prompt:
                'Write `First[T any](ctx context.Context, fs ...func(context.Context) (T, error)) (T, error)`, which runs all the functions at once, returns the first success, and cancels the rest. If all of them fail, it returns `errors.Join` of every error. Test 3 cases: a fast success and a slow one, one failure then a success, and all failing. In each case, every losing function must observe cancellation and exit, under `-race`.',
              kind: 'coding',
              difficulty: 3,
              hint: 'Use a buffered results channel so that losers do not block on send.',
            },
            {
              slug: 'ctrl-c-batch',
              title: 'A batch job that stops cleanly',
              prompt:
                'Write a program that processes 100 items, each taking 100 ms, with 4 workers, under a context from `signal.NotifyContext`. Press Ctrl-C partway. In-flight items must finish, no new ones may start, and the program must print `processed N of 100` and exit with status 1. Add a `-timeout` flag using `context.WithTimeout` that gives the same behaviour. Report the two values of `ctx.Err()` that you see.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Does cancelling a context kill the goroutines using it?',
              answerOutline:
                'No. Cancellation is cooperative. Goroutines must select on Done or check Err and return.',
            },
            {
              question: 'Why must you call cancel even when the operation succeeded?',
              answerOutline:
                'It releases the context and its timer, and removes it from its parent. Otherwise resources are held until the parent is cancelled.',
            },
            {
              question: 'What does errgroup.WithContext add to a plain WaitGroup?',
              answerOutline:
                'It captures the first error and cancels a shared context, so the other goroutines can stop early.',
            },
          ],
        },
      ],
    },
    {
      slug: 'http-services',
      title: 'HTTP Services and Testing',
      description:
        'Put it all together with net/http: a server with routing, middleware and graceful shutdown, a client that survives failure, and tests that give you real confidence.',
      lessons: [
        {
          slug: 'net-http-servers',
          title: 'net/http servers',
          summary:
            'Build a production-shaped HTTP server with the standard library: routing patterns, JSON handlers, middleware, timeouts and graceful shutdown.',
          estimatedMinutes: 100,
          objectives: [
            'Write handlers and route them with ServeMux patterns',
            'Decode and validate JSON requests with a size limit',
            'Write middleware that wraps an http.Handler',
            'Configure server timeouts and explain each one',
            'Shut a server down gracefully',
          ],
          concepts: [
            'http.Handler and http.HandlerFunc',
            'ServeMux method and wildcard patterns',
            'r.PathValue',
            'r.Context() and cancellation',
            'http.MaxBytesReader',
            'Middleware as func(http.Handler) http.Handler',
            'Server timeouts',
            'Graceful shutdown',
            'log/slog',
          ],
          explanation: `The core of \`net/http\` is one interface: \`http.Handler\` has a single method, \`ServeHTTP(w http.ResponseWriter, r *http.Request)\`. Each request runs in its own goroutine, so handlers must be safe for concurrent use. Keep shared state in a struct guarded by a mutex, and make handlers methods on that struct.

Since Go 1.22, the standard \`ServeMux\` matches methods and wildcards, which removes the main reason people used third-party routers. It also returns 405 automatically when the path matches but the method does not.

\`\`\`go
mux := http.NewServeMux()
mux.HandleFunc("GET /items/{id}", s.getItem)
mux.HandleFunc("POST /items", s.createItem)
\`\`\`

Handlers are usually methods on your server type:

\`\`\`go
func (s *Server) getItem(w http.ResponseWriter, r *http.Request) {
	id := r.PathValue("id")
	item, err := s.store.Get(r.Context(), id)
	if errors.Is(err, ErrNotFound) {
		http.Error(w, "not found", http.StatusNotFound)
		return
	}
	// ...
}
\`\`\`

\`r.Context()\` is cancelled when the client disconnects, so pass it down to everything that blocks. Limit bodies with \`r.Body = http.MaxBytesReader(w, r.Body, 1<<20)\`, and then decode with \`json.NewDecoder\`.

**Middleware** is a function that wraps a handler, which is why small interfaces pay off. Logging, panic recovery, request IDs and auth all take this shape:

\`\`\`go
func logging(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		start := time.Now()
		next.ServeHTTP(w, r)
		slog.Info("request", "method", r.Method, "path", r.URL.Path, "took", time.Since(start))
	})
}
\`\`\`

**Timeouts.** \`http.ListenAndServe\` sets none, so a slow client can hold a connection open forever. Use your own server, and set \`ReadHeaderTimeout\`, \`ReadTimeout\`, \`WriteTimeout\` and \`IdleTimeout\`.

**Graceful shutdown.** Call \`srv.Shutdown(ctx)\` when a signal arrives. It stops accepting connections and waits for active requests until \`ctx\` expires. \`ListenAndServe\` returns \`http.ErrServerClosed\` immediately, so your program must wait for \`Shutdown\` to return, or it will exit mid-request.

Read the routing post, then the \`net/http\` overview, then Cloudflare's guide to timeouts, which explains exactly which timeout covers which part of the exchange.`,
          resources: [
            { title: 'Routing Enhancements for Go 1.22', url: 'https://go.dev/blog/routing-enhancements', type: 'article', cost: 'free', provider: 'The Go Blog', primary: true },
            { title: 'Package net/http', url: 'https://pkg.go.dev/net/http', type: 'documentation', cost: 'free', provider: 'Go standard library', note: 'Read the overview, Server, and ServeMux.' },
            { title: 'The complete guide to Go net/http timeouts', url: 'https://blog.cloudflare.com/the-complete-guide-to-golang-net-http-timeouts/', type: 'article', cost: 'free', provider: 'Cloudflare' },
            { title: 'Package log/slog', url: 'https://pkg.go.dev/log/slog', type: 'documentation', cost: 'free', provider: 'Go standard library' },
          ],
          exercises: [
            {
              slug: 'bookmarks-api',
              title: 'A bookmarks API',
              prompt:
                'Build an in-memory JSON API for bookmarks `{ id, url, title }` with `POST /bookmarks`, `GET /bookmarks`, `GET /bookmarks/{id}` and `DELETE /bookmarks/{id}`, safe for concurrent use. `POST` returns 201 and validates the URL with `net/url`. Bad JSON gives 400, an unknown id gives 404, and a body over 1 MiB gives 413. Check for `*http.MaxBytesError` with `errors.As` rather than matching text. Use one helper for all JSON error responses.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'middleware-chain',
              title: 'A middleware chain',
              prompt:
                'Write three middlewares: request ID (sets `X-Request-ID`), structured logging with status code and duration, and panic recovery that returns 500. Capturing the status needs a wrapper around `http.ResponseWriter`, so write one. Add a test route that panics, and confirm the client gets a 500, the log has the request ID, and the next request works. Compose them with a `chain` helper.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'graceful-demo',
              title: 'Prove graceful shutdown',
              prompt:
                'Add a `GET /slow` handler that takes 3 seconds. Send a request, then press Ctrl-C during it. Without `Shutdown`, record what the client sees. With `Shutdown` and a 10 second context, confirm the client gets a full 200 and the process exits with status 0. Also try a 1 second context, and report what `Shutdown` returns and what the client sees.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What must be true of an http.Handler, given how the server calls it?',
              answerOutline:
                'It must be safe for concurrent use, because each request runs in its own goroutine.',
            },
            {
              question: 'What is wrong with calling http.ListenAndServe directly in production?',
              answerOutline:
                'The default server has no timeouts, so slow clients can tie up connections, and it gives no way to shut down gracefully.',
            },
            {
              question: 'After calling srv.Shutdown, why must main wait for it to return?',
              answerOutline:
                'ListenAndServe returns as soon as shutdown starts. If main then exits, active requests are cut off.',
            },
          ],
          relatedLessons: [
            'computer-networks/application-layer/http',
            'computer-networks/application-layer/building-a-concurrent-http-server',
          ],
        },
        {
          slug: 'http-clients-and-resilience',
          title: 'HTTP clients and resilience',
          summary:
            'Calling another service is where systems fail. Set timeouts, handle bodies properly, retry only when it is safe, and back off with jitter.',
          estimatedMinutes: 90,
          objectives: [
            'Configure an http.Client with timeouts and reuse it',
            'Close and drain response bodies so connections are reused',
            'Classify which failures are worth retrying',
            'Implement exponential backoff with jitter',
            'Explain idempotency and why retries depend on it',
            'Propagate deadlines from an incoming request to outgoing calls',
          ],
          concepts: [
            'http.DefaultClient has no timeout',
            'Connection pooling and body draining',
            'NewRequestWithContext',
            'Timeouts and deadline propagation',
            'Retryable and permanent failures',
            'Exponential backoff',
            'Jitter and thundering herds',
            'Idempotency keys',
            'At-least-once delivery',
          ],
          explanation: `Once your service calls another service, you have a distributed system. The call can succeed, fail, or hang, and when it times out you do not know whether the work happened. That uncertainty is the core problem of the Distributed Systems course.

**Timeouts first.** \`http.DefaultClient\` has **no timeout**, so a hung server hangs your goroutine forever. Create one client and reuse it, because it holds a connection pool and is safe for concurrent use.

\`\`\`go
var client = &http.Client{Timeout: 10 * time.Second}

func getStatus(ctx context.Context, url string) (int, error) {
	req, err := http.NewRequestWithContext(ctx, http.MethodGet, url, nil)
	if err != nil {
		return 0, err
	}
	resp, err := client.Do(req)
	if err != nil {
		return 0, fmt.Errorf("get %s: %w", url, err)
	}
	defer resp.Body.Close()
	_, err = io.Copy(io.Discard, resp.Body)
	return resp.StatusCode, err
}
\`\`\`

Always close the body, and read it to the end if you want the connection reused. As with \`fetch\`, a 500 is not an \`error\`: you must check \`StatusCode\` yourself. When a handler makes outgoing calls, pass \`r.Context()\`, so a client disconnect or deadline stops the downstream work as well.

**What to retry.** Retry failures that may be temporary: connection errors, timeouts, 429, and most 5xx responses. Do not retry 400 or 404, which will fail the same way again. Then ask the crucial question: **is it safe to repeat?** GET and PUT are idempotent by definition. A POST may have succeeded even if you saw a timeout, so retrying could charge a customer twice. The standard fix is an **idempotency key**: the client sends a unique ID, and the server remembers it and ignores duplicates. Retries with deduplication give you **at-least-once delivery** with an effectively-once result.

**Backoff.** Immediate retries hit an overloaded server harder. Wait longer each time, with a ceiling, where $n$ is the attempt number starting at 0:

$$ d_n = \\min(\\text{cap}, \\text{base} \\cdot 2^{n}) $$

If many clients fail together, they also retry together, so add **jitter**. "Full jitter" sleeps a random time between 0 and $d_n$, which spreads the load out. Honour a \`Retry-After\` header when a server sends one, and limit total attempts.

Sleep with a \`select\` on \`time.After\` and \`ctx.Done()\`, so cancellation interrupts the wait. Read the AWS article on backoff and jitter, which compares strategies with simulation results.`,
          resources: [
            { title: 'Exponential Backoff And Jitter', url: 'https://aws.amazon.com/blogs/architecture/exponential-backoff-and-jitter/', type: 'article', cost: 'free', provider: 'AWS Architecture Blog', note: 'Compares jitter strategies with simulated data.', primary: true },
            { title: 'Package net/http', url: 'https://pkg.go.dev/net/http', type: 'documentation', cost: 'free', provider: 'Go standard library', note: 'See Client, Transport and the note on closing bodies.' },
            { title: 'The complete guide to Go net/http timeouts', url: 'https://blog.cloudflare.com/the-complete-guide-to-golang-net-http-timeouts/', type: 'article', cost: 'free', provider: 'Cloudflare', note: 'The second half covers client timeouts.' },
          ],
          exercises: [
            {
              slug: 'retrying-client',
              title: 'A retrying client',
              prompt:
                'Write `Do(ctx, client, req, policy) (*http.Response, error)`, which retries on network errors, 429 and 5xx, up to `policy.MaxAttempts`. Use exponential backoff with full jitter, a cap, and support for `Retry-After` in seconds. Against an `httptest.Server` that returns 503 twice and then 200, it must succeed on attempt 3. It must never retry a 404. A request body must be sent again in full on each attempt, so use `req.GetBody`.',
              kind: 'coding',
              difficulty: 3,
              hint: 'A body is a stream, so after the first attempt it is empty. http.NewRequest sets GetBody for common body types.',
            },
            {
              slug: 'leak-connections',
              title: 'Watch a connection leak',
              prompt:
                'Using `httptest.NewServer` and its `Config.ConnState` hook, count new connections while making 100 sequential GETs in three ways: closing and reading the body, closing without reading a large body, and neither closing nor reading. Report the number of connections opened for each. The first case should use a single connection. Explain the others from the `net/http` docs.',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'retry-storm',
              title: 'Simulate a retry storm',
              prompt:
                'Simulate 1,000 clients that all fail at time 0 and retry, against a server that can handle 100 requests per second. Compare three strategies over a 60 second window: no backoff, exponential backoff with no jitter, and full jitter. For each, report the peak requests in any one second and the time until all clients succeed. Write 3-4 sentences on what the results show.',
              kind: 'simulation',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why is http.Get risky inside a server?',
              answerOutline:
                'It uses the default client, which has no timeout, so a hung dependency can hold your goroutines and connections forever.',
            },
            {
              question: 'Why is retrying a timed-out POST dangerous, and how do you make it safe?',
              answerOutline:
                'The server may have done the work, so a retry may do it twice. An idempotency key lets the server discard duplicates.',
            },
            {
              question: 'What does jitter solve that exponential backoff alone does not?',
              answerOutline:
                'Clients that failed together retry together in synchronised bursts. Randomness spreads their retries over time.',
            },
          ],
          relatedLessons: ['distributed-systems/fault-tolerance-and-observability/resilient-communication-patterns'],
        },
        {
          slug: 'testing-services',
          title: 'Testing services',
          summary:
            'Test handlers and clients without a network or sleeps, find bugs with fuzzing, and measure with benchmarks and the profiler.',
          estimatedMinutes: 90,
          objectives: [
            'Test handlers with httptest.NewRecorder and httptest.NewServer',
            'Replace dependencies with small fakes through interfaces',
            'Write tests without timing-based sleeps',
            'Run coverage, the race detector and a fuzz test',
            'Write a benchmark and read a CPU profile',
          ],
          concepts: [
            'httptest.NewRecorder and httptest.NewServer',
            'Fakes through interfaces',
            't.Cleanup, t.TempDir and t.Helper',
            'Subtests and t.Parallel',
            'go test -race and -cover',
            'Fuzz tests',
            'Benchmarks with b.Loop',
            'pprof',
            'Avoiding time.Sleep in tests',
          ],
          explanation: `Go's testing tools are in the standard library, and the \`net/http/httptest\` package makes HTTP code easy to test.

To test a handler, call it directly with a recorder. No port is opened:

\`\`\`go
func TestGetItem(t *testing.T) {
	s := NewServer(fakeStore{"1": {ID: "1", Name: "pen"}})
	req := httptest.NewRequest("GET", "/items/1", nil)
	rec := httptest.NewRecorder()
	s.Handler().ServeHTTP(rec, req)
	if rec.Code != http.StatusOK {
		t.Fatalf("status = %d, want 200", rec.Code)
	}
}
\`\`\`

To test **client** code, \`httptest.NewServer\` starts a real server on a local port, and your handler can return whatever you want: a 503, a hang, a malformed body. Those failure paths are the code that matters most, and they are hard to trigger any other way. Register \`server.Close\` with \`t.Cleanup\`. Use \`t.TempDir()\` for files, and \`t.Helper()\` in assertion helpers, so failures point at the caller.

**Fakes beat mocks.** Thanks to small interfaces, a fake can be a few lines: a map that satisfies \`Store\`, or a clock you advance by hand. Test observable behaviour, not which internal calls were made.

**Avoid sleeping.** \`time.Sleep(100 * time.Millisecond)\` in a test is either slow or flaky. Wait on a channel the code signals, poll a condition with a deadline, or inject a clock. For code that really depends on time, the \`testing/synctest\` package runs goroutines in a bubble with a fake clock that advances when everything is blocked.

**The routine.** \`go test -race -cover ./...\` belongs in every commit. Run tests repeatedly with \`-count=20\` to expose flakiness. Coverage shows what never ran, not that what ran is right.

**Fuzzing** generates inputs for you, and it is excellent for parsers:

\`\`\`go
func FuzzParse(f *testing.F) {
	f.Add("GET /x")
	f.Fuzz(func(t *testing.T, s string) {
		Parse(s) // must not panic
	})
}
\`\`\`

Run it with \`go test -fuzz=FuzzParse -fuzztime=30s\`. Failing inputs are saved under \`testdata\`, and they become regular test cases.

**Benchmarks** are functions taking \`*testing.B\`, with the work inside \`for b.Loop()\` (Go 1.24 and newer). Run them with \`go test -bench=. -benchmem\`. To find where time goes, add \`-cpuprofile cpu.out\`, then run \`go tool pprof cpu.out\`. Measure before you optimise.

Read the \`httptest\` docs, work through the fuzzing tutorial, and then apply both to your bookmarks API.`,
          resources: [
            { title: 'Package net/http/httptest', url: 'https://pkg.go.dev/net/http/httptest', type: 'documentation', cost: 'free', provider: 'Go standard library', primary: true },
            { title: 'Package testing', url: 'https://pkg.go.dev/testing', type: 'documentation', cost: 'free', provider: 'Go standard library', note: 'Subtests, helpers, benchmarks and fuzzing.' },
            { title: 'Tutorial: Getting started with fuzzing', url: 'https://go.dev/doc/tutorial/fuzz', type: 'documentation', cost: 'free', provider: 'The Go Project' },
            { title: 'Profiling Go Programs', url: 'https://go.dev/blog/pprof', type: 'article', cost: 'free', provider: 'The Go Blog', note: 'An older post, but the workflow is unchanged.' },
          ],
          exercises: [
            {
              slug: 'handler-test-suite',
              title: 'Test the bookmarks API',
              prompt:
                'Refactor your bookmarks API to take a `Store` interface, and write a table test with `httptest.NewRecorder` covering every route and status: 200, 201, 400, 404, 405 and 413. Reach at least 85% statement coverage, shown by `go test -cover`. Add a concurrent test where 50 goroutines POST and GET at once under `-race`, with a final count of exactly 50.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'failure-paths',
              title: 'Test the failure paths',
              prompt:
                'Using `httptest.NewServer`, test your retrying client against four misbehaving servers: one that hangs until the client gives up, one that closes the connection immediately, one that returns a 200 with truncated JSON, and one that returns 429 with `Retry-After: 1`. Use a fake sleeper, so the suite finishes in under 1 second, and show it is stable with `-count=20`.',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'fuzz-and-profile',
              title: 'Fuzz a parser and profile it',
              prompt:
                'Write `ParseRange(s string) (start, end int, err error)` for strings such as `"10-20"`. Add a fuzz test asserting that it never panics and that `end >= start` on success. Run it for 60 seconds, and fix anything it finds. Then write a benchmark with `-benchmem`, take a CPU profile, name the top function with `go tool pprof -top`, and record the numbers before and after one improvement.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'When do you use NewRecorder and when NewServer?',
              answerOutline:
                'NewRecorder tests a handler directly with no network. NewServer provides a real local server, which suits testing client code and failures such as hangs.',
            },
            {
              question: 'Why is time.Sleep a bad way to wait in a test?',
              answerOutline:
                'It is either too short, which makes the test flaky, or too long, which makes it slow. Use a channel, a condition with a deadline, or a fake clock.',
            },
            {
              question: 'What does 100% coverage not tell you?',
              answerOutline:
                'That the assertions are meaningful or that all input combinations and timings are right. It shows only which lines ran.',
            },
          ],
          relatedLessons: ['distributed-systems/fault-tolerance-and-observability/testing-distributed-systems'],
        },
      ],
    },
  ],
  capstone: {
    slug: 'outboxd',
    title: 'outboxd: a durable HTTP delivery daemon',
    description:
      'Build a small service that accepts HTTP requests to deliver, records them in an append-only log before acknowledging them, and delivers them at least once with retries, backoff and per-host limits. The full specification is in the final project page.',
    deliverables: [
      'A Go service using the standard library for its HTTP API and delivery workers',
      'A crash-tolerant append-only log with recovery on restart',
      'A test suite that passes under the race detector',
      'A CI workflow and a design write-up of the delivery guarantees',
    ],
    estimatedHours: 18,
    stretchGoals: ['Compact the log in the background without blocking new deliveries.'],
  },
  masteryChecklist: [
    'I can explain slices as headers over arrays and predict how append and aliasing behave',
    'I can use maps, structs and methods idiomatically, and choose the right receiver',
    'I can design small interfaces and avoid the nil interface trap',
    'I can wrap and inspect errors with errors.Is and errors.As',
    'I can write concurrent code with goroutines, channels and mutexes that passes the race detector',
    'I can make every goroutine I start stop, using context and clear channel ownership',
    'I can build an HTTP server with routing, middleware, timeouts and graceful shutdown',
    'I can write HTTP clients with timeouts, safe retries, backoff and jitter',
    'I can test services with httptest, fakes and fuzzing, and measure them with benchmarks and pprof',
  ],
});
