import { defineSubject } from '../define';

const BASH_MANUAL = 'https://tiswww.case.edu/php/chet/bash/bashref.html';

export default defineSubject({
  id: 'bash-scripting',
  title: 'Bash and the Command Line',
  category: 'cs',
  tagline:
    'The shell for people who can already program: pipes, grep, sed and awk, quoting, control flow, robust scripts, automation and shellcheck.',
  description: `This is a short course for programmers who have got by with a few memorised terminal commands and want to use the shell properly. It assumes you can already program, so it spends no time on what a loop or a function is. It focuses on what is peculiar to Bash: a language built around running other programs, where text flows through pipes, exit statuses take the place of booleans, and an unquoted variable can quietly delete the wrong file.

The four modules start with the shell itself, pipes and the classic text tools \`grep\`, \`sed\` and \`awk\`, so that you can answer real questions about data in one line. The second module explains variables, quoting and expansion, which is where nearly all shell bugs live. The third covers control flow, reading input safely, and functions. The last turns scripts into tools you can trust, with strict mode, cleanup traps, \`shellcheck\`, tests, and scheduling.

Windows users work in Ubuntu through WSL 2 and VS Code, which gives you a real Linux environment. Two machine problems and a final project complete the course, and the last of these is a small, tested tool that you could actually use for your own backups.`,
  difficulty: 'beginner',
  estimatedHours: 28,
  prerequisites: ['programming-fundamentals'],
  recommendedBackground: [
    'Comfortable writing functions and loops in at least one language',
    'Basic Git use',
    'A Windows 10 machine with WSL 2, or any Linux or macOS machine',
  ],
  tags: ['short course', 'bash', 'shell', 'command line', 'linux', 'automation', 'wsl'],
  core: false,
  modules: [
    {
      slug: 'shell-and-text-tools',
      title: 'The Shell, Pipes and Text Tools',
      description:
        'How the shell runs commands, how pipes and redirection connect them, and how grep, sed and awk answer questions about text.',
      lessons: [
        {
          slug: 'how-the-shell-runs-commands',
          title: 'How the shell runs commands',
          summary:
            'Set up Bash in WSL 2, then learn what the shell really does with a line you type: find a program, pass it words, and report an exit status.',
          estimatedMinutes: 75,
          objectives: [
            'Set up Ubuntu in WSL 2 and use it from VS Code',
            'Explain how the shell finds a command using PATH',
            'Tell builtins, aliases, functions and external programs apart with type',
            'Read exit statuses and combine commands with && and ||',
            'Find documentation with man, help and --help',
          ],
          concepts: [
            'The shell as a program that starts programs',
            'WSL 2 and the Linux file system',
            'Arguments are split into words by the shell',
            'PATH lookup',
            'Builtins and external commands',
            'Exit status: 0 means success',
            '&&, || and ;',
            'man, help and --help',
          ],
          explanation: `A shell is an ordinary program whose job is to start other programs. When you type \`grep -c root /etc/passwd\`, Bash splits the line into words, looks for an executable named \`grep\`, starts it, and passes it the other three words as arguments. It is \`grep\` that gives \`-c\` its meaning, not the shell. Keeping that division in mind clears up much of the confusion later.

**Setup.** From an administrator PowerShell, run \`wsl --install -d Ubuntu\`, and restart if asked. Install the WSL extension in VS Code, then open your Ubuntu terminal and run \`code .\` in a folder. VS Code now runs inside Linux, and its terminal is Bash. Keep your work in your Linux home directory (\`~\`), not under \`/mnt/c\`. Windows files are slower from Linux and can have CRLF line endings, which make scripts fail with errors such as \`$'\\r': command not found\`.

**Finding commands.** A word with no slash is looked up as an alias, a function, a shell builtin, then in each directory of \`PATH\`, in order. Use \`type\` to see which you are getting:

\`\`\`bash
type cd     # cd is a shell builtin
type ls     # may be an alias
type -a ls  # every match, in order
\`\`\`

\`cd\` has to be a builtin, because a child process cannot change its parent's directory.

**Exit status.** Every command returns a number from 0 to 255. Here **0 means success**, the opposite of most languages' truth values, and anything else is some kind of failure. \`$?\` holds the last status. Two common special values are 127 (command not found) and 126 (found, but not executable). Commands combine on it:

\`\`\`bash
mkdir out && cp data.txt out/   # copy only if mkdir succeeded
grep -q root /etc/passwd || echo "no root?"
\`\`\`

\`;\` simply runs the next command regardless.

**Help.** \`man grep\` shows the manual, \`help cd\` documents builtins, and most tools accept \`--help\`. Learn to search inside \`man\` with \`/\`, and exit with \`q\`.

Work through the first lecture of The Missing Semester, typing everything yourself. Then use the Microsoft guide if your WSL setup fails.`,
          resources: [
            { title: 'The Missing Semester: Course overview and the shell', url: 'https://missing.csail.mit.edu/2020/course-shell/', type: 'lecture', cost: 'free', provider: 'MIT CSAIL', note: 'Lecture notes and video. Do the exercises at the end.', primary: true },
            { title: 'Install WSL', url: 'https://learn.microsoft.com/en-us/windows/wsl/install', type: 'documentation', cost: 'free', provider: 'Microsoft' },
            { title: 'Developing in WSL', url: 'https://code.visualstudio.com/docs/remote/wsl', type: 'documentation', cost: 'free', provider: 'Visual Studio Code' },
            { title: 'Bash Reference Manual: Exit Status', url: `${BASH_MANUAL}#Exit-Status`, type: 'documentation', cost: 'free', provider: 'GNU Bash (maintainer copy)' },
          ],
          exercises: [
            {
              slug: 'set-up-your-environment',
              title: 'Set up and prove it',
              prompt:
                'Install Ubuntu under WSL 2, connect VS Code to it, and make a folder `~/shell-course`. Run `uname -r`, `bash --version` and `echo "$SHELL"`, and save their output to `env.txt` in that folder. Then run `wsl -l -v` from PowerShell to confirm that the VERSION column shows 2. Write down why `cd` cannot be an external program.',
              kind: 'coding',
              difficulty: 1,
            },
            {
              slug: 'exit-status-table',
              title: 'Build an exit status table',
              prompt:
                'Run each of these and record `$?` straight afterwards: `true`, `false`, `ls /nonexistent`, `grep root /etc/passwd`, `grep nosuchuser /etc/passwd`, `grep root /nonexistent`, `nosuchcommand`, and `/etc/passwd`. You should find that `grep` uses 0, 1 and 2 for three different outcomes. Explain what each means, and what the statuses 126 and 127 mean.',
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'path-detective',
              title: 'PATH detective',
              prompt:
                "Print each directory in `PATH` on its own line with `echo \"$PATH\" | tr ':' '\\n'`, and count them with `wc -l`. Use `type -a` on `ls`, `python3`, `echo` and `cd`, and explain why `echo` shows up twice. Then create `~/bin/hello`, a script that prints a greeting, make it executable, and prepend `~/bin` to `PATH` for the session. Confirm that `type hello` finds it.",
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Who interprets the flag -c in grep -c root file: Bash or grep?',
              answerOutline: 'grep. Bash only splits the line into words and passes them as arguments.',
            },
            {
              question: 'What does an exit status of 0 mean, and why is that unusual?',
              answerOutline:
                'Success. Most languages treat 0 as false, but the shell needs a single success value and many distinct failure codes.',
            },
            {
              question: 'Why should you keep scripts in ~ rather than under /mnt/c in WSL?',
              answerOutline:
                'The Linux file system is faster, keeps Unix permissions, and avoids Windows CRLF line endings that break scripts.',
            },
          ],
          relatedLessons: ['programming-fundamentals/thinking-like-an-engineer/a-second-language'],
        },
        {
          slug: 'pipes-and-redirection',
          title: 'Pipes, redirection and small tools',
          summary:
            'Every program has three standard streams. Redirect them to files, connect programs with pipes, and build answers from sort, uniq, cut and friends.',
          estimatedMinutes: 90,
          objectives: [
            'Explain stdin, stdout and stderr as file descriptors',
            'Redirect output and errors, including the order of 2>&1',
            'Build pipelines with sort, uniq, cut, tr, wc, head and tail',
            'Use tee and here-documents',
            'Use xargs to turn input lines into arguments',
          ],
          concepts: [
            'Standard streams and file descriptors 0, 1, 2',
            'Redirection with >, >>, < and 2>',
            '2>&1 and why order matters',
            '/dev/null',
            'Pipes connect stdout to stdin',
            'sort, uniq, cut, tr, wc, head, tail',
            'tee',
            'Here-documents',
            'xargs',
          ],
          explanation: `Every process starts with three open **file descriptors**: 0 (stdin), 1 (stdout) and 2 (stderr). Programs read and write them without knowing what they are connected to. The shell sets up those connections before the program starts, which is why any tool can work with files, terminals and pipes.

\`\`\`bash
sort < names.txt > sorted.txt  # stdin from one file, stdout to another
make >> build.log              # append instead of overwrite
grep -r TODO . 2> /dev/null    # throw errors away
\`\`\`

\`>\` truncates the file **before** the command runs, so \`sort f > f\` empties \`f\`. To merge errors into output, write \`> all.log 2>&1\`. Redirections are processed left to right, and \`2>&1\` means "point 2 at wherever 1 points now". So \`2>&1 > all.log\` sends errors to the terminal, because 1 still pointed there at that moment.

A **pipe** connects one program's stdout to the next one's stdin, and the programs run at the same time. Stderr is not piped, so error messages stay on your screen. Each tool does one thing, and pipelines build the rest:

\`\`\`bash
cut -d: -f7 /etc/passwd | sort | uniq -c | sort -rn | head -n 3
\`\`\`

This reports the three most common login shells. Learn this idiom, because \`sort | uniq -c | sort -rn\` is the shell's "group by and count". \`uniq\` removes only **adjacent** duplicates, so it almost always follows \`sort\`.

The small tools you will use daily: \`cut\` extracts fields, \`tr\` translates characters, \`wc -l\` counts lines, \`head\` and \`tail\` take ends of a stream, and \`sort\` has \`-n\` for numbers, \`-r\` to reverse, and \`-k\` to choose a key. Be careful with keys: \`sort -k2\` means "from field 2 to the end of the line", while \`-k2,2\` means field 2 only.

\`tee file\` copies a stream to a file while passing it along. A **here-document** feeds literal text to stdin:

\`\`\`bash
cat > config.txt <<'EOF'
host=localhost
EOF
\`\`\`

Quoting \`'EOF'\` stops the shell from expanding anything inside. **\`xargs\`** reads stdin and passes the items as arguments to a command, for tools that do not read stdin, such as \`rm\`.

Do the data wrangling lecture from The Missing Semester after the next lesson. For now, read the Redirections section of the manual and try each example.`,
          resources: [
            { title: 'Bash Reference Manual: Redirections', url: `${BASH_MANUAL}#Redirections`, type: 'documentation', cost: 'free', provider: 'GNU Bash (maintainer copy)', note: 'Read up to the section on here-documents.', primary: true },
            { title: 'The Missing Semester: Shell Tools and Scripting', url: 'https://missing.csail.mit.edu/2020/shell-tools/', type: 'lecture', cost: 'free', provider: 'MIT CSAIL' },
            { title: 'The Linux Command Line (free book)', url: 'https://linuxcommand.org/tlcl.php', type: 'textbook', cost: 'free', provider: 'William Shotts', note: 'See the chapters on redirection and on text processing.' },
            { title: 'sort(1) manual page', url: 'https://man7.org/linux/man-pages/man1/sort.1.html', type: 'documentation', cost: 'free', provider: 'man7.org', note: 'Pay attention to -k, -n and -r.' },
            { title: 'xargs(1) manual page', url: 'https://man7.org/linux/man-pages/man1/xargs.1.html', type: 'documentation', cost: 'free', provider: 'man7.org' },
          ],
          exercises: [
            {
              slug: 'redirect-lab',
              title: 'Redirection lab',
              prompt:
                'Run `ls /etc/hostname /nonexistent` in four forms and record what appears on the terminal and in `out.txt` each time: no redirection, `> out.txt`, `> out.txt 2>&1` and `2>&1 > out.txt`. Then run `sort names.txt > names.txt` on a small file, and explain why the file is now empty. Find a safe way to do it with `sort -o`.',
              kind: 'coding',
              difficulty: 1,
            },
            {
              slug: 'word-frequency',
              title: 'Word frequency of a novel',
              prompt:
                "Download Moby-Dick with `curl -O https://www.gutenberg.org/cache/epub/2701/pg2701.txt`. In one pipeline, using `tr`, `sort`, `uniq` and `head`, print the 10 most common words, with case folded. Start with `tr -cs 'A-Za-z' '\\n'` to put one word on each line. Expect `the` first with over 14,000 occurrences. Time it with `time`, and record how many distinct words the book has.",
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'sort-keys',
              title: 'Sort keys exactly',
              prompt:
                'Create a file `scores.txt` with the lines `amy 90 2021`, `bob 100 2020`, `cy 9 2021`, `di 90 2020`. Write one `sort` command for each order: by score numerically, highest first; by year, then by name; and by score numerically, breaking ties by year ascending. Show how `sort -k2` without `,2` gives a different answer for the last one, and explain why.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does sort f > f destroy the file?',
              answerOutline:
                'The shell opens and truncates the output file before starting sort, so sort reads an empty file.',
            },
            {
              question: 'Why does uniq usually follow sort?',
              answerOutline: 'uniq only compares neighbouring lines, so duplicates must be adjacent first.',
            },
            {
              question: 'Why do error messages still appear on screen when you pipe a command?',
              answerOutline: 'A pipe connects only stdout. Stderr still goes to the terminal unless redirected.',
            },
          ],
          relatedLessons: ['operating-systems/foundations/process-api', 'systems-programming/unix-system-calls/pipes-and-ipc'],
        },
        {
          slug: 'grep-sed-and-awk',
          title: 'grep, sed and awk',
          summary:
            'Three tools for three jobs: grep selects lines, sed edits them, and awk treats them as records with fields and computes on them.',
          estimatedMinutes: 100,
          objectives: [
            'Write basic and extended regular expressions',
            'Search files with grep and its most useful flags',
            'Substitute text with sed, including capture groups',
            'Write awk programs with fields, patterns and arrays',
            'Choose the simplest tool for a text task',
          ],
          concepts: [
            'Regular expressions: anchors, classes, repetition, groups',
            'Extended regex with -E',
            'grep -i -v -c -n -o -r',
            'sed s/old/new/g and capture groups',
            'sed -i and backups',
            'awk pattern { action }',
            'Fields `$1`, `$NF` and `-F`',
            'NR, END and associative arrays',
            'Single-quoting programs',
          ],
          explanation: `These tools all take a small program as an argument. Wrap that program in **single quotes**, so the shell passes it through untouched. You will learn exactly why in the next module.

**Regular expressions** describe text. \`^\` and \`$\` anchor the start and end of a line, \`.\` is any character, \`[0-9]\` is a class, and \`*\` means zero or more. With \`-E\` you also get \`+\`, \`?\`, \`|\`, \`()\` and \`{2,4}\` without backslashes, so always use \`-E\`. In a shell, \`*\` also means something to the shell, which is one more reason for those single quotes.

**\`grep\` selects lines.** \`grep -E 'ERROR|FATAL' app.log\` prints matches. Add \`-i\` to ignore case, \`-v\` to invert, \`-c\` to count, \`-n\` for line numbers, \`-o\` for only the matching part, \`-r\` to recurse, and \`-q\` to test silently.

**\`sed\` edits a stream.** Nearly all of its use is one command, substitution:

\`\`\`bash
sed -E 's/colou?r/hue/g' notes.txt
sed -E 's#([0-9]{2})/([0-9]{2})/([0-9]{4})#\\3-\\1-\\2#' dates.txt
\`\`\`

\`g\` means every match on the line, and the delimiter can be any character, which helps when the text has slashes. The second command turns \`03/12/2026\` into \`2026-03-12\`, with \`\\1\` referring to the first group. \`sed -i\` edits a file in place, so try it without \`-i\` first and keep the file in version control.

**\`awk\` computes.** It reads each line as a record, splits it into fields \`$1\`, \`$2\` and so on, and runs \`pattern { action }\` for each matching line. \`$0\` is the whole line, \`$NF\` the last field, and \`NR\` the line number. \`-F,\` changes the separator.

\`\`\`bash
awk '$3 > 100 { print $1, $3 }' sales.txt
awk -F, '{ total[$1] += $3 } END { for (r in total) print r, total[r] }' sales.csv
\`\`\`

The second line is a group-by in one line. Arrays are associative, variables start empty, and \`END\` runs after the last line. The order of \`for (r in total)\` is unspecified, so pipe the result through \`sort\`. Ubuntu may use \`mawk\` or \`gawk\` as \`awk\`, and the features here work on both.

**Which one?** Use \`grep\` to find lines, \`sed\` for simple replacement, and \`awk\` once you think in columns or need arithmetic. Beyond a few lines of awk, a real language is usually better.

Read the Data Wrangling lecture, and practise on regex101 with the POSIX-style features it offers.`,
          resources: [
            { title: 'The Missing Semester: Data Wrangling', url: 'https://missing.csail.mit.edu/2020/data-wrangling/', type: 'lecture', cost: 'free', provider: 'MIT CSAIL', note: 'A full walkthrough of grep, sed, sort and awk on real logs.', primary: true },
            { title: 'grep(1) manual page', url: 'https://man7.org/linux/man-pages/man1/grep.1.html', type: 'documentation', cost: 'free', provider: 'man7.org' },
            { title: 'sed tutorial', url: 'https://www.grymoire.com/Unix/Sed.html', type: 'article', cost: 'free', provider: 'Grymoire', note: 'Read the sections on substitution and on regular expressions.' },
            { title: 'awk tutorial', url: 'https://www.grymoire.com/Unix/Awk.html', type: 'article', cost: 'free', provider: 'Grymoire' },
            { title: 'gawk(1) manual page', url: 'https://man7.org/linux/man-pages/man1/gawk.1.html', type: 'documentation', cost: 'free', provider: 'man7.org' },
          ],
          exercises: [
            {
              slug: 'grep-drills',
              title: 'grep drills',
              prompt:
                "Using `/etc/passwd` and `grep -E`, write one command each to: count the lines ending in `nologin`, list lines where the user name starts with `s` or `d`, print only the numeric user ids (the third field) using `-o` and a suitable regex, and print the lines that do not end in `nologin` or `false`. Check the first one against `awk -F: '$NF ~ /nologin$/' /etc/passwd | wc -l`.",
              kind: 'coding',
              difficulty: 1,
            },
            {
              slug: 'sed-date-rewrite',
              title: 'Rewrite dates with sed',
              prompt:
                "Write a `sed -E` command that rewrites every US date `MM/DD/YYYY` in a file to ISO `YYYY-MM-DD`, without touching anything else. The input line `paid 03/12/2026 and 11/05/2025` must become `paid 2026-03-12 and 2025-11-05`, and `ratio 1/2/3` must be unchanged. Then do the same in place with `sed -i.bak`, and confirm the backup with `diff`.",
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'awk-sales-report',
              title: 'A sales report in awk',
              prompt:
                'Create `sales.csv` with the header `region,product,amount` and the rows `north,pen,10`, `south,pen,5`, `north,ink,7`, `east,pen,3`, `south,ink,20`. In awk, skip the header using `NR > 1` and print total sales per region, sorted by total descending: `south 25`, `north 17`, `east 3`. Add a final line with the grand total, 45, and the share of the top region as a percentage to one decimal place, 55.6.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What does \\1 mean in a sed replacement?',
              answerOutline: 'The text matched by the first parenthesised group in the pattern.',
            },
            {
              question: 'Why should grep, sed and awk programs usually be in single quotes?',
              answerOutline:
                'So the shell does not expand `$`, `*` or other characters before the tool sees them. awk field references such as `$1` would otherwise be replaced by the shell.',
            },
            {
              question: 'When do you switch from sed to awk?',
              answerOutline: 'When the task involves fields, conditions on values, arithmetic or grouping.',
            },
          ],
        },
      ],
    },
    {
      slug: 'variables-and-expansion',
      title: 'Variables, Quoting and Expansion',
      description:
        'Scripts, variables and the rules of expansion. Most shell bugs come from word splitting and globbing, and this module shows you how to rule them out.',
      lessons: [
        {
          slug: 'variables-and-quoting',
          title: 'Variables, quoting and first scripts',
          summary:
            'Write your first scripts, and learn why an unquoted variable is a bug: word splitting and filename expansion happen after substitution.',
          estimatedMinutes: 90,
          objectives: [
            'Write and run a script with a shebang and execute permission',
            'Assign and read variables, and export them to child processes',
            'Explain word splitting and filename expansion',
            'Choose between single quotes, double quotes and no quotes',
            'Use positional parameters and `"$@"` correctly',
            'Run shellcheck and act on its warnings',
          ],
          concepts: [
            'Shebang and chmod +x',
            'Assignment has no spaces around =',
            'Environment variables and export',
            'Word splitting on IFS',
            'Filename expansion (globbing)',
            'Single and double quotes',
            'Positional parameters, `$#`, `"$@"`',
            'printf rather than echo',
            'shellcheck',
          ],
          explanation: `A script is a text file of commands. Its first line, the **shebang** \`#!/bin/bash\`, says which interpreter runs it. Make it executable with \`chmod +x script.sh\`, and run it with \`./script.sh\`.

Assign with no spaces, because \`name = Ada\` would run a command called \`name\`. Read a variable with \`$name\`. Variables are local to the shell unless you \`export\` them, which copies them into the environment of child processes.

**The central rule of Bash: always double-quote expansions.** The shell processes a line in stages, and substitution happens *before* two further steps run on the result:

1. **Word splitting** breaks the value on whitespace.
2. **Filename expansion** treats \`*\`, \`?\` and \`[\` as patterns to match against files.

\`\`\`bash
file="my notes.txt"
rm $file    # runs: rm my notes.txt   (two arguments!)
rm "$file"  # runs: rm 'my notes.txt' (one argument)

msg="Total: 5 * 3"
echo $msg   # the * becomes a list of files in this directory
echo "$msg" # prints what you wrote
\`\`\`

Double quotes prevent both steps, but still allow \`$\` expansion. Single quotes make everything literal, which is why you put awk and sed programs in them. A backslash escapes one character. Leave a value unquoted only when you actively want splitting, which is rare. Inside \`[[ ]]\` and in assignments splitting does not occur, but quoting there does no harm.

**Arguments.** \`$1\`, \`$2\` and so on are positional parameters, \`$#\` is how many there are, and \`$0\` is the script name. To pass all arguments on, write exactly \`"$@"\`, which keeps each argument as one word, even with spaces. \`$*\` and an unquoted \`$@\` both break that.

**printf over echo.** \`echo\` treats some inputs specially: a value of \`-n\` prints nothing, for example. For data, use \`printf '%s\\n' "$value"\`, which always does the same thing.

**ShellCheck** finds these mistakes for you. Install it with \`sudo apt install shellcheck\`, and add the VS Code extension so warnings appear as you type. \`SC2086\` is the warning for an unquoted variable, and its wiki page explains the fix. Treat every warning as a bug until you can explain why it is not. You will study the tool in more depth in module 4.

Read the Quotes page on Greg's Wiki, the best explanation of this topic, and the manual's section on word splitting.`,
          resources: [
            { title: 'Quotes', url: 'https://mywiki.wooledge.org/Quotes', type: 'article', cost: 'free', provider: "Greg's Wiki", note: 'The definitive explanation of quoting in Bash.', primary: true },
            { title: 'Bash Reference Manual: Word Splitting', url: `${BASH_MANUAL}#Word-Splitting`, type: 'documentation', cost: 'free', provider: 'GNU Bash (maintainer copy)' },
            { title: 'Bash Reference Manual: Filename Expansion', url: `${BASH_MANUAL}#Filename-Expansion`, type: 'documentation', cost: 'free', provider: 'GNU Bash (maintainer copy)' },
            { title: 'ShellCheck', url: 'https://www.shellcheck.net/', type: 'tool', cost: 'free', provider: 'ShellCheck', note: 'Paste a script into the site, or install it locally.' },
            { title: 'ShellCheck wiki: SC2086', url: 'https://www.shellcheck.net/wiki/SC2086', type: 'documentation', cost: 'free', provider: 'ShellCheck' },
          ],
          exercises: [
            {
              slug: 'quote-lab',
              title: 'See word splitting happen',
              prompt:
                "Write a script `showargs` that prints `$#` and then each argument in angle brackets, using a `for arg in \"$@\"` loop. In a test folder with files `a.txt` and `b c.txt`, call it with: `$v`, `\"$v\"`, `$w` and `\"$w\"`, where `v='b c.txt'` and `w='*.txt'`. Predict the argument count for each one before you run it. The expected counts are 2, 1, 2 and 1. Explain each.",
              kind: 'coding',
              difficulty: 1,
            },
            {
              slug: 'args-forwarder',
              title: 'Forward arguments safely',
              prompt:
                'Write a wrapper script `logrun` that prints the time and the command to stderr, then runs the command with all of its arguments unchanged. `./logrun ls -l "my file.txt"` must see `my file.txt` as one argument. Show the bug with `$*`, `$@` and `"$*"`, using your `showargs` script as the command. Exit with the status of the wrapped command.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'shellcheck-a-bad-script',
              title: 'Fix a script with shellcheck',
              prompt:
                "Write a deliberately bad 10-line script that copies files named on the command line into a backup folder. Use unquoted variables, `$*`, `cd` without a check, and `echo` of user data. Run `shellcheck` and list each SC code it reports with a one-line meaning. Fix them all, reach zero warnings, and show that the fixed script works on a file called `-my file*.txt`.",
              kind: 'coding',
              difficulty: 2,
              hint: 'A file name starting with a dash can be mistaken for an option. Use -- or a ./ prefix.',
            },
          ],
          selfAssessment: [
            {
              question: 'What two things happen to an unquoted `$var` after substitution?',
              answerOutline: 'Word splitting on IFS characters, then filename expansion of glob characters.',
            },
            {
              question: 'What is the difference between `"$@"` and `"$*"`?',
              answerOutline:
                '`"$@"` expands to one word per argument and keeps each intact. `"$*"` joins them all into a single word.',
            },
            {
              question: 'Why is export needed for some variables?',
              answerOutline:
                'Only exported variables are passed in the environment of child processes. Plain variables stay in the current shell.',
            },
          ],
        },
        {
          slug: 'parameter-expansion',
          title: 'Parameter expansion and arithmetic',
          summary:
            'Bash can transform strings without starting another process: defaults, stripping prefixes and suffixes, replacing text, and integer arithmetic.',
          estimatedMinutes: 75,
          objectives: [
            'Provide defaults and required-value checks with parameter expansion',
            'Strip prefixes and suffixes from paths and file names',
            'Replace text and change case in a variable',
            'Do integer arithmetic with `$(( ))`',
            'Know when to call awk for decimal maths',
          ],
          concepts: [
            'Default values: `${var:-x}`',
            'Required values: `${var:?msg}`',
            'Removing a prefix: # and ##',
            'Removing a suffix: % and %%',
            'Replacement: `${var//a/b}`',
            'Length and substrings',
            'Case conversion: ^^ and ,,',
            'Arithmetic expansion `$(( ))`',
            'Bash arithmetic is integer only',
          ],
          explanation: `Calling \`sed\` or \`basename\` for a small string change starts a whole new process. Inside a loop over thousands of files, that is the difference between instant and minutes. Parameter expansion does the same work inside the shell, and these forms are worth memorising.

| Form | Meaning | With \`p=/home/ada/report.tar.gz\` |
|---|---|---|
| \`\${p##*/}\` | remove longest prefix matching \`*/\` | \`report.tar.gz\` |
| \`\${p%/*}\` | remove shortest suffix matching \`/*\` | \`/home/ada\` |
| \`\${p%.*}\` | remove shortest suffix matching \`.*\` | \`/home/ada/report.tar\` |
| \`\${p%%.*}\` | remove longest suffix matching \`.*\` | \`/home/ada/report\` |
| \`\${p##*.}\` | remove longest prefix matching \`*.\` | \`gz\` |

A trick for remembering: \`#\` is to the left of \`%\` on a US keyboard, and \`#\` works on the left of the string. Doubling the symbol makes the match greedy. The patterns are shell globs, not regular expressions.

**Missing values.** \`\${port:-8080}\` uses 8080 if \`port\` is unset or empty, without changing \`port\`. \`\${port:=8080}\` also assigns it. \`\${1:?usage: greet NAME}\` stops the script with that message if the argument is missing.

**Editing.** \`\${s/old/new}\` replaces the first match, and \`\${s//old/new}\` replaces all of them. \`\${#s}\` is the length, \`\${s:0:3}\` is a substring, \`\${s^^}\` is uppercase and \`\${s,,}\` is lowercase. Each of these is still an expansion, so keep the double quotes around it.

**Arithmetic.** \`$(( ))\` evaluates integer expressions, and variables inside need no \`$\`:

\`\`\`bash
count=7
total=$(( count * 3 + 1 ))  # 22
half=$(( total / 4 ))       # 5: the fraction is discarded
\`\`\`

Bash has **no floating point**. For decimals, hand the numbers to awk, as in \`awk -v a=22 -v b=4 'BEGIN { printf "%.2f\\n", a / b }'\`, which prints 5.50. Numbers with a leading zero are read as octal, so \`$(( 08 + 1 ))\` is an error. This regularly bites dates and sequence numbers. Force base 10 with \`$(( 10#08 + 1 ))\`.

Read the manual section once as an overview, and keep it open as a reference, then drill the forms above with the exercises.`,
          resources: [
            { title: 'Bash Reference Manual: Shell Parameter Expansion', url: `${BASH_MANUAL}#Shell-Parameter-Expansion`, type: 'documentation', cost: 'free', provider: 'GNU Bash (maintainer copy)', primary: true },
            { title: 'Bash Reference Manual: Shell Arithmetic', url: `${BASH_MANUAL}#Shell-Arithmetic`, type: 'documentation', cost: 'free', provider: 'GNU Bash (maintainer copy)' },
            { title: "Bash Guide", url: 'https://mywiki.wooledge.org/BashGuide', type: 'textbook', cost: 'free', provider: "Greg's Wiki", note: 'See the chapter on parameters.' },
          ],
          exercises: [
            {
              slug: 'path-surgery',
              title: 'Path surgery',
              prompt:
                'Given `p=/var/log/nginx/access.log.2.gz`, use only parameter expansion to print: the file name, the directory, the name without `.gz`, the name with everything from the first dot removed (`access`), and the extension (`gz`). Then write `change_ext FILE NEW`, which prints the file name with its last extension replaced. `change_ext report.tar.gz zip` must print `report.tar.zip`. Run each 10,000 times, once with `basename` and once with expansion, and report both times.',
              kind: 'coding',
              difficulty: 1,
            },
            {
              slug: 'config-defaults',
              title: 'Defaults and required values',
              prompt:
                'Write a script `serve` that reads `HOST`, `PORT` and `ROOT` from the environment. `HOST` defaults to `127.0.0.1` and `PORT` to `8000`, and `ROOT` is required, with the script stopping with a clear message if it is empty. Print the final URL as `http://HOST:PORT/`. Show that `PORT= ./serve` with an empty value also falls back to the default, and explain how `${PORT-8000}` would differ.',
              kind: 'coding',
              difficulty: 1,
            },
            {
              slug: 'slugify',
              title: 'Slugify a title',
              prompt:
                'Using only expansion and `tr`, write `slugify`, which lowercases its argument, replaces runs of spaces with one hyphen, and removes anything except letters, digits and hyphens. `slugify "Hello,  World! 2026"` must print `hello-world-2026`. Add a `seq_name N` function that zero-pads to 3 digits with `printf`, and a test that `seq_name 8` gives `008` and that `$(( 10#008 + 1 ))` gives 9.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What do `${f%.*}` and `${f%%.*}` give for `f=a.tar.gz`?',
              answerOutline: '`a.tar` and `a`. `%` removes the shortest matching suffix, and `%%` the longest.',
            },
            {
              question: 'What is the difference between `${x:-y}` and `${x:=y}`?',
              answerOutline: 'Both give `y` when `x` is unset or empty. Only `:=` also assigns `y` to `x`.',
            },
            {
              question: 'Why does `$(( 09 + 1 ))` fail, and how do you fix it?',
              answerOutline: 'A leading zero means octal, where 9 is invalid. Write `10#09` to force base 10.',
            },
          ],
        },
        {
          slug: 'command-substitution-and-arrays',
          title: 'Command substitution and arrays',
          summary:
            'Capture command output in variables, and use arrays for lists, because a string cannot safely hold a list of file names or arguments.',
          estimatedMinutes: 75,
          objectives: [
            'Capture output with `$(...)` and quote it correctly',
            'Create and iterate over indexed arrays',
            'Build a command line safely in an array',
            'Read lines into an array with mapfile',
            'Use associative arrays for lookups and counting',
          ],
          concepts: [
            'Command substitution `$(...)`',
            'Trailing newlines are stripped',
            'Indexed arrays and +=',
            '`"${arr[@]}"` and `${#arr[@]}`',
            'Commands stored in arrays',
            'mapfile (readarray)',
            'Associative arrays with declare -A',
            'Process substitution `<(...)`',
          ],
          explanation: `**Command substitution** runs a command and replaces itself with the output: \`today=$(date +%F)\`. Trailing newlines are removed, and the result is subject to word splitting if left unquoted, so write \`"$(...)"\` in arguments. Substitutions nest cleanly, and the old backtick form is best avoided.

Now to a question that trips everyone up: how do you hold a list? A string does not work. If you build \`files="a.txt my file.txt"\`, the information about where each name ends is gone. **Arrays** keep it.

\`\`\`bash
files=("a.txt" "my file.txt")
files+=("third.txt")

echo "\${#files[@]}"            # 3
for f in "\${files[@]}"; do     # one word per element
  wc -c "$f"
done
\`\`\`

\`"\${files[@]}"\` works like \`"$@"\`: each element becomes exactly one word. Forget the quotes or use \`[*]\`, and you are back to splitting. Elements are indexed from 0, as in \`"\${files[0]}"\`.

Arrays solve a common problem: building a command conditionally. Storing a command in a string fails, but an array works:

\`\`\`bash
args=(--archive --human-readable)
if [[ -n \${DRY_RUN:-} ]]; then
  args+=(--dry-run)
fi
rsync "\${args[@]}" "$src" "$dest"
\`\`\`

To read lines of output into an array, use **\`mapfile\`** with **process substitution**:

\`\`\`bash
mapfile -t users < <(cut -d: -f1 /etc/passwd)
echo "\${#users[@]} users"
\`\`\`

\`<(cmd)\` presents a command's output as if it were a file. You need it here rather than a pipe, because each part of a pipeline runs in a subshell, so an array set there would vanish.

**Associative arrays** are hash maps, and they must be declared first:

\`\`\`bash
declare -A count
while read -r word; do
  count[$word]=$(( \${count[$word]:-0} + 1 ))
done < words.txt
printf '%s\\n' "\${!count[@]}"   # the keys, in no fixed order
\`\`\`

\`"\${!count[@]}"\` lists the keys. As in awk, the order is arbitrary, so sort the result if you need a stable order. This needs Bash 4 or newer, which matters only on the old Bash shipped with macOS.

Read the Arrays section of the manual, and the Greg's Wiki page on arrays if you want more examples. From now on, reach for an array whenever you think "list".`,
          resources: [
            { title: 'Bash Reference Manual: Arrays', url: `${BASH_MANUAL}#Arrays`, type: 'documentation', cost: 'free', provider: 'GNU Bash (maintainer copy)', primary: true },
            { title: 'Bash Reference Manual: Command Substitution', url: `${BASH_MANUAL}#Command-Substitution`, type: 'documentation', cost: 'free', provider: 'GNU Bash (maintainer copy)' },
            { title: 'Bash Reference Manual: Process Substitution', url: `${BASH_MANUAL}#Process-Substitution`, type: 'documentation', cost: 'free', provider: 'GNU Bash (maintainer copy)' },
            { title: 'Bash Pitfalls', url: 'https://mywiki.wooledge.org/BashPitfalls', type: 'article', cost: 'free', provider: "Greg's Wiki", note: 'Read the first ten pitfalls. Most of them are about what this lesson fixes.' },
          ],
          exercises: [
            {
              slug: 'array-of-files',
              title: 'Hold file names properly',
              prompt:
                'In a folder with files `a.txt`, `b c.txt` and `d*.txt`, fill an array with `files=(*.txt)` and print each element on its own line, along with the count (3). Then build the same list as a space-separated string, and show that a `for` loop over it gives the wrong count. Explain which piece of information the string lost.',
              kind: 'coding',
              difficulty: 1,
            },
            {
              slug: 'conditional-command',
              title: 'Build a command conditionally',
              prompt:
                'Write a script `findbig DIR [-s SIZE]` that runs `find` with a `-type f` test, adds `-size +SIZE` only when given, and always excludes `.git` with `-not -path "*/.git/*"`. Build the argument list in an array, and make it work for a directory named `my dir`. Print the final command with `printf "%q "` before running it, so you can see exactly what will run.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'word-count-in-bash',
              title: 'Count words with an associative array',
              prompt:
                'Using `declare -A` and a `while read` loop, count the words in a small text file, and print them sorted by count descending and then alphabetically. Your result must match `tr -s " " "\\n" < file | sort | uniq -c | sort -k1,1rn -k2,2`. Then run both on a 100,000-word file, and report the time for each. Explain the difference.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why is a space-separated string a bad way to store file names?',
              answerOutline: 'File names can contain spaces and other characters, so element boundaries are lost.',
            },
            {
              question: 'What does `"${arr[@]}"` do differently from `${arr[@]}`?',
              answerOutline:
                'The quoted form gives one word per element, unchanged. The unquoted form splits and globs every element.',
            },
            {
              question: 'Why does `mapfile` use `< <(cmd)` rather than `cmd | mapfile`?',
              answerOutline:
                'Each part of a pipeline runs in a subshell, so the array would be lost. Process substitution keeps mapfile in the current shell.',
            },
          ],
        },
      ],
    },
    {
      slug: 'control-flow-and-functions',
      title: 'Control Flow and Functions',
      description:
        'Decide with exit statuses, loop over files and lines without breaking on odd names, and organise scripts into functions with real command-line options.',
      lessons: [
        {
          slug: 'conditionals-and-exit-status',
          title: 'Conditionals and exit status',
          summary:
            'In Bash, `if` runs a command and looks at its exit status. Learn `[[ ]]`, `(( ))`, `case`, and the short-circuit idioms.',
          estimatedMinutes: 75,
          objectives: [
            'Explain why if takes a command rather than a boolean expression',
            'Use `[[ ]]` for string, file and pattern tests',
            'Use `(( ))` for numeric comparisons',
            'Write case statements for option and pattern dispatch',
            'Use && and || as short conditionals, and know the trap',
          ],
          concepts: [
            'if tests an exit status',
            '`[` is a command and `[[` is shell syntax',
            'File tests: -e, -f, -d, -r, -s',
            'String tests: -z, -n, ==, !=',
            'Pattern and regex matching with == and =~',
            'Numeric tests: `-eq`, `-lt` and `(( ))`',
            'case patterns',
            '`a && b || c` is not if/else',
          ],
          explanation: `Most languages evaluate a boolean. Bash's \`if\` instead **runs a command** and branches on its exit status:

\`\`\`bash
if grep -q '^root:' /etc/passwd; then
  echo "found"
fi
\`\`\`

There is no boolean here. \`grep\` ran, and it exited with 0. This explains the odd syntax of tests: \`[\` is literally a command, a synonym for \`test\`, and its last argument must be \`]\`. So \`if [ "$a" = "$b" ]\` is a command with arguments, which is why spaces around the brackets are required.

**Use \`[[ ]]\` in Bash.** It is shell syntax rather than a command, so it is safer and more capable. Word splitting does not happen inside it, and it supports \`&&\`, \`||\`, glob patterns and regular expressions.

\`\`\`bash
[[ -f $path ]]          # exists and is a regular file
[[ -d $dir ]]           # is a directory
[[ -z $s ]]             # string is empty; -n is non-empty
[[ $name == *.txt ]]    # glob pattern: do not quote the pattern
[[ $v =~ ^[0-9]+$ ]]    # regex: do not quote the regex
\`\`\`

The capture groups from \`=~\` land in the \`BASH_REMATCH\` array. For numbers, either use \`-eq\`, \`-ne\`, \`-lt\`, \`-le\`, \`-gt\` and \`-ge\` inside \`[[ ]]\`, or use **\`(( ))\`**, which allows ordinary operators: \`if (( count > 10 )); then\`. A common mistake is comparing numbers with \`<\` in \`[[ ]]\`, which compares strings, so \`[[ 10 < 9 ]]\` is true.

**\`case\`** matches one value against glob patterns, and it is cleaner than a chain of \`elif\`:

\`\`\`bash
case $file in
  *.tar.gz | *.tgz) tar -xzf "$file" ;;
  *.zip)            unzip "$file" ;;
  *)                echo "unknown type: $file" >&2; exit 1 ;;
esac
\`\`\`

**Short circuits.** \`[[ -d $d ]] || mkdir "$d"\` is a common and readable idiom. Beware of \`a && b || c\`, which looks like if/else but is not: \`c\` also runs if \`b\` fails. Use a real \`if\` when both branches matter.

Remember that an \`if\` can test any command, including your own functions and pipelines. Read the manual's sections on conditional constructs and conditional expressions, then try \`help test\` in your terminal.`,
          resources: [
            { title: 'Bash Reference Manual: Conditional Constructs', url: `${BASH_MANUAL}#Conditional-Constructs`, type: 'documentation', cost: 'free', provider: 'GNU Bash (maintainer copy)', note: 'Covers if, case, (( )) and [[ ]].', primary: true },
            { title: 'Bash Reference Manual: Bash Conditional Expressions', url: `${BASH_MANUAL}#Bash-Conditional-Expressions`, type: 'documentation', cost: 'free', provider: 'GNU Bash (maintainer copy)', note: 'The full list of tests.' },
            { title: "Bash Guide", url: 'https://mywiki.wooledge.org/BashGuide', type: 'textbook', cost: 'free', provider: "Greg's Wiki", note: 'See the Tests and Conditionals chapter.' },
          ],
          exercises: [
            {
              slug: 'classify-paths',
              title: 'Classify paths',
              prompt:
                'Write `kind PATH...`, which prints one line per argument: `file`, `dir`, `link`, `missing` or `other`. Test for the symlink first, and explain why that order matters. Test it on `/etc/passwd`, `/etc`, a dangling symlink you create, a missing path, and `/dev/null` (which should print `other`). Exit with status 1 if any path was missing, and 0 otherwise.',
              kind: 'coding',
              difficulty: 1,
            },
            {
              slug: 'validate-input',
              title: 'Validate with regular expressions',
              prompt:
                'Write `parse_version STRING`, which uses `=~` to accept `v1.2.3` or `1.2.3`, and prints `major=1 minor=2 patch=3` using `BASH_REMATCH`. Reject `1.2`, `1.2.x` and an empty string with status 2 and a message on stderr. Then write `bump_minor`, so that `bump_minor 1.9.3` prints `1.10.0`. This needs numeric addition, so make sure `1.09.0` is handled in base 10.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'extract-dispatcher',
              title: 'An extract command',
              prompt:
                'Write `x FILE` with a `case` statement that extracts `.tar.gz`, `.tgz`, `.tar.xz`, `.zip` and `.gz` files with the right tool, or exits with status 3 for anything else. Matching must ignore case, so use `${file,,}` in the `case` word. Create a sample of each with `tar`, `gzip` and `zip` and test all of them. Then write the same with `if`/`elif`, and say which you prefer and why.',
              kind: 'coding',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does `if [$a = 1]` fail with "command not found"?',
              answerOutline:
                '`[` is a command, so it needs spaces. Without them, the shell looks for a command named after the joined word, such as `[5`.',
            },
            {
              question: 'Is `[[ 10 < 9 ]]` true? Why?',
              answerOutline: 'Yes. Inside `[[ ]]`, `<` compares strings. Use `-lt` or `(( ))` for numbers.',
            },
            {
              question: 'Why is `a && b || c` not the same as `if a; then b; else c; fi`?',
              answerOutline: 'If `a` succeeds and `b` fails, `c` also runs.',
            },
          ],
        },
        {
          slug: 'loops-and-reading-input',
          title: 'Loops and reading input safely',
          summary:
            'Iterate over files and lines correctly. File names can contain anything, so use globs, find -print0 and read properly.',
          estimatedMinutes: 90,
          objectives: [
            'Loop over files with globs, and handle no matches with nullglob',
            'Read a file line by line with while IFS= read -r',
            'Explain the pipeline subshell trap and avoid it',
            'Process any file name with find -print0 and read -d \'\'',
            'Use find with -exec and xargs -0',
          ],
          concepts: [
            'for over globs and arrays',
            'nullglob',
            'Why not to parse ls',
            'while IFS= read -r line',
            'Pipelines run in subshells',
            'Redirecting into a loop',
            'NUL-delimited file lists',
            'find tests and -exec',
            'xargs -0 and -P',
          ],
          explanation: `A \`for\` loop iterates over words, so give it real lists: arrays, or globs.

\`\`\`bash
shopt -s nullglob
for f in *.log; do
  gzip -- "$f"
done
\`\`\`

The shell expands the glob into properly separated names, so spaces are safe. Without \`nullglob\`, a pattern with no matches stays as the literal string \`*.log\`, and the loop runs once on a file that does not exist. Never write \`for f in $(ls)\`. Output from \`ls\` is made for people, and word splitting will break names with spaces. The \`--\` tells \`gzip\` that options have ended, which protects you from a file called \`-v.log\`.

**Reading lines.** Use a \`while\` loop, and memorise this exact form:

\`\`\`bash
while IFS= read -r line; do
  printf '%s\\n' "$line"
done < input.txt
\`\`\`

\`IFS=\` keeps leading and trailing spaces, and \`-r\` keeps backslashes intact. The redirection is on the \`done\`, so the entire loop reads from the file. To split lines into fields, name several variables: \`while IFS=: read -r user _ uid _; do\`.

**The subshell trap.** Each part of a pipeline runs in a subshell, so this prints 0:

\`\`\`bash
count=0
grep ERROR app.log | while read -r line; do
  count=$(( count + 1 ))
done
echo "$count"  # 0: the loop changed a copy
\`\`\`

Feed the loop with process substitution instead: \`done < <(grep ERROR app.log)\`. The loop then runs in your current shell.

**Any file name.** On Linux a file name may contain anything except \`/\` and NUL, including newlines. So the only fully safe separator is NUL. \`find\` can produce it and \`read\` can consume it:

\`\`\`bash
while IFS= read -r -d '' f; do
  printf 'found: %s\\n' "$f"
done < <(find . -type f -name '*.txt' -print0)
\`\`\`

\`find\` selects files by \`-name\`, \`-type\`, \`-mtime\`, \`-size\` and more. It can act directly with \`-exec gzip {} +\`, and pairs with xargs: \`find . -name '*.log' -print0 | xargs -0 gzip\`. Adding \`-P 4\` to \`xargs\` runs 4 jobs in parallel, which is often the easiest speedup there is.

Read BashFAQ 001 on reading files, then the page on why not to parse \`ls\`, and try each pattern on a directory of awkwardly named files.`,
          resources: [
            { title: 'BashFAQ/001: How can I read a file line by line?', url: 'https://mywiki.wooledge.org/BashFAQ/001', type: 'article', cost: 'free', provider: "Greg's Wiki", primary: true },
            { title: 'Bash Reference Manual: Looping Constructs', url: `${BASH_MANUAL}#Looping-Constructs`, type: 'documentation', cost: 'free', provider: 'GNU Bash (maintainer copy)' },
            { title: 'Bash Pitfalls', url: 'https://mywiki.wooledge.org/BashPitfalls', type: 'article', cost: 'free', provider: "Greg's Wiki", note: 'Pitfall 1 is the for-in-ls problem.' },
            { title: 'find(1) manual page', url: 'https://man7.org/linux/man-pages/man1/find.1.html', type: 'documentation', cost: 'free', provider: 'man7.org' },
          ],
          exercises: [
            {
              slug: 'hostile-filenames',
              title: 'A folder of hostile file names',
              prompt:
                "Create a test folder containing `a b.txt`, `-rf.txt`, `star*.txt`, `new` + newline + `line.txt` (use `touch $'new\\nline.txt'`) and `trailing space .txt`. Write a loop that prints each name in brackets and its size in bytes, using a glob, and a second one using `find -print0`. Both must report exactly 5 files. Then show how `for f in $(ls)` and `ls | while read f` each get it wrong, and report the file counts they give.",
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'passwd-report',
              title: 'Split fields with read',
              prompt:
                'Using `while IFS=: read -r` on `/etc/passwd`, count users whose id is at least 1000 and print their names, in a loop that sets a variable you print after the loop ends. Do it first with `cut ... | while`, and show that the count stays 0. Then fix it with process substitution. Check your answer against `awk -F: \'$3 >= 1000\' /etc/passwd | wc -l`.',
              kind: 'coding',
              difficulty: 1,
            },
            {
              slug: 'parallel-compress',
              title: 'Measure parallel xargs',
              prompt:
                'Generate 40 files of 20 MB each from `/dev/urandom` in a temporary folder on the Linux file system. Compress them with `find ... -print0 | xargs -0 gzip -k`, then again with `-P 1`, `-P 2`, `-P 4` and `-P 8`, using `time` and removing the `.gz` files between runs. Report a table of elapsed times and the speedup, and state how many CPUs `nproc` reports.',
              kind: 'data-analysis',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why IFS= and -r in while IFS= read -r line?',
              answerOutline:
                'IFS= keeps leading and trailing whitespace, and -r stops backslashes being treated as escapes.',
            },
            {
              question: 'Why does a counter set in cmd | while ... end up unchanged?',
              answerOutline:
                'The while loop runs in a subshell, so its variables vanish when the pipeline ends. Use `done < <(cmd)`.',
            },
            {
              question: 'Why is NUL the only safe separator for file names?',
              answerOutline: 'File names can contain newlines and every other byte except NUL and the slash.',
            },
          ],
        },
        {
          slug: 'functions-and-arguments',
          title: 'Functions and command-line options',
          summary:
            'Structure scripts with functions, local variables and a main, return data through stdout, and parse options with getopts.',
          estimatedMinutes: 90,
          objectives: [
            'Write functions with local variables',
            'Return data through stdout and success through the exit status',
            'Send diagnostics to stderr',
            'Parse short options with getopts',
            'Organise a script with a usage function and main',
          ],
          concepts: [
            'Function definition and call',
            'local and dynamic scope',
            'return sets a status from 0 to 255',
            'Returning data with stdout',
            'Command substitution runs in a subshell',
            'Printing errors to stderr',
            'getopts and shift',
            'Usage messages and exit codes',
            'The `main "$@"` pattern',
          ],
          explanation: `A function is defined with \`name() { ...; }\` and called like any command, with arguments in \`$1\`, \`$2\` and \`"$@"\`. There are no parameter lists, and that has three consequences.

**Scope.** Variables are global unless declared \`local\`, and you should declare them all. Bash uses dynamic scope, which means a called function can see its caller's locals. That is rarely useful and often confusing.

**Returning.** \`return\` sets an exit status, an integer from 0 to 255, so it signals only success or failure. To return data, write it to stdout and capture it:

\`\`\`bash
ext() {
  local name=$1
  printf '%s\\n' "\${name##*.}"
}

kind=$(ext "report.pdf")   # pdf
\`\`\`

The status works with \`if\`, so a function can be a predicate: \`is_number() { [[ $1 =~ ^[0-9]+$ ]]; }\`, with its status coming from the last command. Note that \`$(...)\` runs the function in a subshell, so any variables it changes are lost. A function can either print a result or modify state, but not both.

**Diagnostics.** Because stdout carries data, messages must go to stderr. A small helper is standard in almost every script:

\`\`\`bash
die() {
  printf '%s: %s\\n' "\${0##*/}" "$1" >&2
  exit 1
}
\`\`\`

**Options.** \`getopts\` parses short flags, including clusters such as \`-ln\` and values such as \`-p 8080\`:

\`\`\`bash
dry_run=0
port=8080
while getopts ':np:h' opt; do
  case $opt in
    n) dry_run=1 ;;
    p) port=$OPTARG ;;
    h) usage; exit 0 ;;
    :) die "-$OPTARG needs a value" ;;
    \\?) die "unknown option -$OPTARG" ;;
  esac
done
shift $(( OPTIND - 1 ))
\`\`\`

A leading \`:\` in the option string gives you control of the error messages, and a trailing \`:\` after a letter means it takes a value. Afterwards, \`shift\` leaves the remaining arguments in \`"$@"\`. \`getopts\` handles \`--\` for you, but not long options like \`--help\`. Use a \`while\`/\`case\` loop if you need those.

**Script layout.** A clean script has its constants at the top, then functions, then a \`main\`, with one final line: \`main "$@"\`. This means nothing runs until the whole file has been parsed, so editing a running script is safer, and you can read the top-level logic in one place.

For temporary files, \`tmp=$(mktemp -d)\` makes a unique private directory. Read the functions section of the manual and the Google shell style guide's sections on functions and \`main\`.`,
          resources: [
            { title: 'Bash Reference Manual: Shell Functions', url: `${BASH_MANUAL}#Shell-Functions`, type: 'documentation', cost: 'free', provider: 'GNU Bash (maintainer copy)', primary: true },
            { title: 'Bash Reference Manual: Bourne Shell Builtins', url: `${BASH_MANUAL}#Bourne-Shell-Builtins`, type: 'documentation', cost: 'free', provider: 'GNU Bash (maintainer copy)', note: 'See getopts, shift, return and trap.' },
            { title: 'BashFAQ/035: How can I handle command-line options?', url: 'https://mywiki.wooledge.org/BashFAQ/035', type: 'article', cost: 'free', provider: "Greg's Wiki" },
            { title: 'Google Shell Style Guide', url: 'https://google.github.io/styleguide/shellguide.html', type: 'documentation', cost: 'free', provider: 'Google', note: 'See the sections on functions and the main function.' },
          ],
          exercises: [
            {
              slug: 'function-library',
              title: 'A small function library',
              prompt:
                'Write a file `lib.sh` with `is_integer`, `trim` and `join_by`, all using `local` variables. `is_integer -12` succeeds and `is_integer 1.5` fails. `trim "  hi  "` prints `hi`. `join_by , a "b c" d` prints `a,b c,d`. Source it from a test script that uses a small `assert_eq` function, and print `PASS` or `FAIL` with a count. Show one bug that leaving out `local` would cause.',
              kind: 'coding',
              difficulty: 1,
            },
            {
              slug: 'getopts-tool',
              title: 'A real command-line tool',
              prompt:
                'Write `lines [-n COUNT] [-r] [-h] FILE...`, which prints the first COUNT lines of each file (default 10), and reverses each group with `tac` if `-r` is given. `-h` prints a usage message to stdout and exits 0. A bad option or a missing value prints the usage to stderr and exits 2. A missing file is reported on stderr, the other files are still processed, and the final status is 1. Use a `main "$@"` layout, and keep `shellcheck` silent.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'subshell-scope',
              title: 'Explain the scoping rules',
              prompt:
                'Write a function `inc() { n=$(( n + 1 )); echo "$n"; }`, set `n=0`, and call `inc` twice directly, then twice as `x=$(inc)`. Predict the final value of `n` in each case (2 after direct calls, unchanged by the captured calls), run it, and explain why. Then write two functions showing dynamic scope, where `inner` sees a `local` variable declared in `outer`.',
              kind: 'problem',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'How does a Bash function give a string back to its caller?',
              answerOutline: 'It prints to stdout, and the caller captures it with `$(...)`. `return` gives only a status.',
            },
            {
              question: 'Why do error messages go to stderr?',
              answerOutline: 'Stdout is data for pipes and captures, so messages must not mix with it.',
            },
            {
              question: 'What does the shift after a getopts loop do?',
              answerOutline: 'It drops the parsed options, so that `"$@"` holds only the remaining arguments.',
            },
          ],
        },
      ],
    },
    {
      slug: 'robust-scripts-and-automation',
      title: 'Robust Scripts and Automation',
      description:
        'Make scripts fail safely, clean up after themselves, pass shellcheck and tests, and run unattended on a schedule.',
      lessons: [
        {
          slug: 'strict-mode-and-cleanup',
          title: 'Strict mode, traps and safe failure',
          summary:
            'Use set -euo pipefail and know where it fails you. Clean up with traps, and write files atomically so failure leaves nothing half done.',
          estimatedMinutes: 90,
          objectives: [
            'Explain what each part of set -euo pipefail does',
            'Identify cases where set -e does not stop a script',
            'Clean up temporary files with an EXIT trap',
            'Write files atomically with mktemp and mv',
            'Debug a script with set -x',
          ],
          concepts: [
            'set -e and its exceptions',
            '`set -u` and `${var:-}`',
            'set -o pipefail',
            'trap on EXIT, INT and TERM',
            'mktemp',
            'Atomic replacement with mv',
            'Exit code conventions',
            'set -x and PS4',
            'Idempotent scripts',
          ],
          explanation: `By default, Bash keeps going after a failed command. In a script, that is dangerous:

\`\`\`bash
cd /some/missing/dir
rm -rf ./*           # runs in the wrong directory
\`\`\`

Start scripts with **strict mode**:

\`\`\`bash
#!/bin/bash
set -euo pipefail
\`\`\`

\`-e\` exits when a command fails, \`-u\` makes an unset variable an error, and \`-o pipefail\` makes a pipeline fail if any stage fails, rather than just the last.

Strict mode helps, but it is not a guarantee, and you need to know its gaps. \`set -e\` is ignored for commands tested by \`if\`, \`while\`, \`&&\` or \`||\`, and that includes everything inside a function called in such a test. \`local x=$(false)\` hides the failure, because \`local\` itself succeeded, so declare first and assign on the next line. It can also stop you when nothing is wrong. \`grep\` exits with 1 for no matches, so in a pipeline under \`pipefail\` it can end your script. And \`(( count++ ))\` returns 1 when the result was 0, killing a script on its first iteration: write \`count=$(( count + 1 ))\` instead. Allow a command to fail on purpose with \`cmd || true\`. Under \`-u\`, use \`\${1:-}\` for optional values.

**Cleanup.** \`trap\` registers a command to run when something happens. An \`EXIT\` trap runs however the script ends, including failure:

\`\`\`bash
tmp=$(mktemp -d)
trap 'rm -rf -- "$tmp"' EXIT
\`\`\`

Use single quotes, so that the variable is expanded when the trap fires. If you also catch \`INT\` and \`TERM\`, exit explicitly in the handler. Otherwise the script carries on.

**Atomic writes.** Do not write directly to the final file, because a failure leaves it half written. Write to a temporary file in the **same directory**, then \`mv\` it into place. A rename within one file system is atomic, so readers see the old file or the new one:

\`\`\`bash
out=$(mktemp "$target.XXXXXX")
trap 'rm -f -- "$out"' EXIT
generate_report > "$out"
mv -- "$out" "$target"
\`\`\`

**Debugging.** \`bash -x script.sh\` prints each command after expansion, which shows exactly what your quotes did. You can set \`PS4='+ \${LINENO}: '\` to include line numbers.

Aim for **idempotent** scripts, which are safe to run twice: use \`mkdir -p\`, check before you act, and exit with 0 for success, 1 for failure, and 2 for bad usage.

Read BashFAQ 105 on why \`set -e\` is subtler than it looks, then the manual's entry for \`set\`.`,
          resources: [
            { title: 'BashFAQ/105: Why doesn\'t set -e do what I expected?', url: 'https://mywiki.wooledge.org/BashFAQ/105', type: 'article', cost: 'free', provider: "Greg's Wiki", note: 'Worked examples of each surprise.', primary: true },
            { title: 'Bash Reference Manual: The Set Builtin', url: `${BASH_MANUAL}#The-Set-Builtin`, type: 'documentation', cost: 'free', provider: 'GNU Bash (maintainer copy)' },
            { title: 'mktemp(1) manual page', url: 'https://man7.org/linux/man-pages/man1/mktemp.1.html', type: 'documentation', cost: 'free', provider: 'man7.org' },
            { title: 'Bash Reference Manual: Signals', url: `${BASH_MANUAL}#Signals`, type: 'documentation', cost: 'free', provider: 'GNU Bash (maintainer copy)' },
          ],
          exercises: [
            {
              slug: 'strict-mode-surprises',
              title: 'Strict mode surprises',
              prompt:
                'Write a short script under `set -euo pipefail` for each case, and record whether it stops: `false` alone; `if false; then :; fi`; `false || true`; `local x=$(false)` in a function; `x=$(false)` at top level; `(( n++ ))` with `n=0`; `grep nomatch file | wc -l`; and a function containing `false; echo next`, called as `f || true`. Before running, predict each result. For the last one, explain why `next` is printed.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'cleanup-always',
              title: 'Clean up on every exit path',
              prompt:
                'Write a script that creates a temporary directory, sleeps for 30 seconds, and removes the directory through a trap. Show the directory is removed after each of: normal exit, `exit 3`, a failing command under `set -e`, Ctrl-C, and `kill -TERM`. Then test `kill -KILL`, which leaves the directory behind, and explain why no trap can run. The script must keep its original exit status.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'atomic-update',
              title: 'Atomic file updates',
              prompt:
                'Write `update-json FILE` that rewrites a file by appending a line through a slow pipeline that takes 2 seconds. In one terminal, run `while :; do wc -l < FILE; done`. In the other, compare a version using `> FILE` with one using `mktemp` and `mv`. Report the different line counts seen by the reader in each case. Then explain why the temporary file must be in the same directory as the target.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What does pipefail change?',
              answerOutline:
                'A pipeline fails if any stage fails, rather than taking its status from the last command only.',
            },
            {
              question: 'Why is `local x=$(cmd)` a problem under `set -e`?',
              answerOutline:
                'The status of `local` replaces that of `cmd`, so the failure is hidden. Declare first, then assign separately.',
            },
            {
              question: 'Why must the temporary file be in the same directory as the target for an atomic update?',
              answerOutline:
                'rename is atomic only within one file system. Across file systems, mv copies then deletes, which is not atomic.',
            },
          ],
        },
        {
          slug: 'shellcheck-style-and-testing',
          title: 'shellcheck, style and tests',
          summary:
            'Make shellcheck and shfmt part of every save and commit, follow a style guide, write tests with Bats, and know when to leave Bash behind.',
          estimatedMinutes: 90,
          objectives: [
            'Read shellcheck output and fix its most common warnings',
            'Suppress a warning correctly and explain why',
            'Format scripts with shfmt',
            'Write Bats tests for a command-line tool',
            'Run these checks in CI',
            'Decide when a script should become a program in another language',
          ],
          concepts: [
            'SC codes and their wiki pages',
            'Inline shellcheck directives',
            'shfmt',
            'Google Shell Style Guide',
            'Bats: `@test`, `run`, `$status`, `$output`',
            'Testing a CLI through its behaviour',
            'setup and teardown',
            'Lint and test in CI',
            'When not to use Bash',
          ],
          explanation: `Bash gives you no type checker and no compiler, so **ShellCheck** is the nearest thing to one. It parses your script and reports real bugs, each with a code and a wiki page. Run it with \`shellcheck script.sh\`, and with the VS Code extension you see warnings as you type. The ones you will meet most:

| Code | Meaning |
|---|---|
| SC2086 | Double-quote to prevent globbing and word splitting |
| SC2046 | Quote a \`$(...)\` to prevent word splitting |
| SC2155 | Declare and assign separately, or you hide the exit status |
| SC2164 | Use \`cd ... \\|\\| exit\` in case \`cd\` fails |
| SC2034 | A variable appears to be unused |

Each wiki page explains the failure, not just the fix. If a warning is wrong for a specific line, say so with a directive and a reason, directly above that line:

\`\`\`bash
# shellcheck disable=SC2086  # FLAGS is deliberately split into words
gcc $FLAGS main.c
\`\`\`

**shfmt** is the formatter, in the role of \`gofmt\` or Prettier. \`shfmt -i 2 -d .\` shows a diff, and \`-w\` rewrites files. Adopt the conventions of the **Google Shell Style Guide**: two-space indents, \`[[ ]]\` over \`[ ]\`, \`local\` for function variables, and a \`main\` function for anything non-trivial.

**Testing.** Shell scripts are tested through their behaviour: run them, then check the exit status, output and resulting files. **Bats** makes this pleasant:

\`\`\`bash
#!/usr/bin/env bats

setup() { TEST_DIR=$(mktemp -d); }
teardown() { rm -rf -- "$TEST_DIR"; }

@test "bad option exits 2 and prints usage" {
  run ./lines -z
  [ "$status" -eq 2 ]
  [[ "$output" == *usage* ]]
}
\`\`\`

\`run\` captures the status and output without stopping the test. Each test should build its own files in \`TEST_DIR\`, and it should include awkward names. Install with \`sudo apt install shellcheck shfmt bats\`, and run \`bats tests/\`. In CI, run \`shellcheck\`, \`shfmt -d\` and \`bats\` on every push.

**When to stop.** The Google guide suggests that a script over about 100 lines, or one with complex control flow, should be rewritten in a more structured language. Good reasons to switch are nested data structures, floating-point maths, complex error handling, and portability to Windows. Bash is at its best when gluing programs together.

Skim the style guide fully, then write Bats tests for your \`lines\` tool.`,
          resources: [
            { title: 'ShellCheck wiki', url: 'https://www.shellcheck.net/wiki/', type: 'documentation', cost: 'free', provider: 'ShellCheck', note: 'One page per warning code.', primary: true },
            { title: 'Google Shell Style Guide', url: 'https://google.github.io/styleguide/shellguide.html', type: 'documentation', cost: 'free', provider: 'Google' },
            { title: 'Bats documentation', url: 'https://bats-core.readthedocs.io/en/stable/', type: 'documentation', cost: 'free', provider: 'bats-core' },
            { title: 'shfmt (mvdan/sh)', url: 'https://github.com/mvdan/sh', type: 'tool', cost: 'free', provider: 'mvdan' },
          ],
          exercises: [
            {
              slug: 'lint-existing-scripts',
              title: 'Lint real scripts',
              prompt:
                'Run `shellcheck` over all your scripts from this course, and over a real script from a project or from `/etc/init.d` or `/usr/bin` on your machine (`file /usr/bin/* | grep -i shell` will find some). Report the count of each SC code, using `shellcheck -f gcc` with a pipeline of `grep`, `sort` and `uniq -c`. Fix everything in your own scripts, and explain one warning in the system script that may be a real bug.',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'bats-suite',
              title: 'A Bats test suite',
              prompt:
                'Write a Bats suite for your `lines` tool with at least 8 tests: the default count, `-n 3`, `-n 0`, a file name with a space, a missing file together with a valid one (status 1 and valid output still printed), `-h` on stdout, a bad option (status 2), and a missing `-n` value. Each test uses its own temporary directory. Break the tool on purpose, and confirm the right tests fail.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'ci-for-shell',
              title: 'CI for shell scripts',
              prompt:
                'Create a GitHub Actions workflow for your scripts repository that installs `shellcheck`, `shfmt` and `bats` on `ubuntu-latest`, then runs all three, and that fails on any problem. Push a commit with an unquoted variable, confirm the run fails with SC2086, then fix it and add a status badge to the README.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What should you do when shellcheck warns about a line that is actually correct?',
              answerOutline:
                'Add a narrow disable directive directly above that line, with a comment giving the reason. Do not turn the check off globally.',
            },
            {
              question: 'What does the run helper in Bats do?',
              answerOutline:
                'It runs a command, captures `$status` and `$output`, and does not fail the test by itself, so that you can assert on them.',
            },
            {
              question: 'Name two signs that a script should be rewritten in another language.',
              answerOutline:
                'Length beyond about 100 lines, nested data, floating-point maths, complex error handling, or a need to run natively on Windows.',
            },
          ],
        },
        {
          slug: 'automation-and-scheduling',
          title: 'Automation and scheduling',
          summary:
            'Run scripts unattended with cron and systemd timers, handle WSL\'s peculiarities, prevent overlapping runs with flock, and leave useful logs.',
          estimatedMinutes: 90,
          objectives: [
            'Schedule a job with cron and explain its limited environment',
            'Write a systemd timer and service',
            'Explain how WSL affects scheduled jobs',
            'Prevent overlapping runs with flock',
            'Write logs that make unattended failures diagnosable',
          ],
          concepts: [
            'crontab fields',
            'Cron has a minimal environment',
            'systemd service and timer units',
            'OnCalendar and Persistent',
            'WSL stops when idle',
            'Windows Task Scheduler running wsl.exe',
            'flock',
            'Timestamped logs and exit codes',
            'Dry-run mode',
          ],
          explanation: `A script that runs while you sleep has nobody watching it, so it must behave differently from one you run by hand.

**Cron** runs commands on a schedule. Edit your table with \`crontab -e\`. The five fields are minute, hour, day of month, month and day of week:

\`\`\`text
# every day at 02:30
30 2 * * * /home/ada/bin/backup >> /home/ada/backup.log 2>&1
\`\`\`

Cron jobs run with a tiny environment: a short \`PATH\`, no interactive setup, and no terminal. So use absolute paths, or set \`PATH\` at the top of the script, and always redirect output. If a job works by hand but not from cron, the environment is nearly always the cause. In a crontab, an unescaped \`%\` is treated as a newline.

**systemd timers** are the modern option. They give you logs through \`journalctl\`, and they can catch up on missed runs. You write two files in \`~/.config/systemd/user/\`:

\`\`\`ini
# backup.service
[Service]
Type=oneshot
ExecStart=%h/bin/backup

# backup.timer
[Timer]
OnCalendar=daily
Persistent=true

[Install]
WantedBy=timers.target
\`\`\`

Enable it with \`systemctl --user enable --now backup.timer\`, and inspect it with \`systemctl --user list-timers\` and \`journalctl --user -u backup\`. \`Persistent=true\` runs a missed job after the machine next starts.

**WSL caveats.** Current Ubuntu installs have systemd on. If yours does not, add \`[boot]\` and \`systemd=true\` to \`/etc/wsl.conf\`, and run \`wsl --shutdown\` from PowerShell. More importantly, the WSL VM shuts down when nothing is running in it, so a timer inside it may never fire. For a job that must run, use **Windows Task Scheduler** to start \`wsl.exe -d Ubuntu -- /home/ada/bin/backup\`.

**Overlap.** If a job runs longer than its interval, two copies can collide. \`flock\` fixes this with a lock file:

\`\`\`bash
exec 9> "\${XDG_RUNTIME_DIR:-/tmp}/backup.lock"
flock -n 9 || { echo "already running" >&2; exit 75; }
\`\`\`

The kernel releases the lock when the process ends, even after a crash, so there is no stale lock to clean up.

**Logging.** Log a timestamp, a level and a message to stderr, using \`printf '%(%F %T)T %s\\n' -1 "$msg" >&2\`, with no extra process needed. Record the start, the end, and a summary. Offer a \`--dry-run\` mode for anything destructive, and make failure visible through a non-zero exit, so that the scheduler can see it.

Read the crontab and \`flock\` manual pages, and use crontab.guru to check your schedules.`,
          resources: [
            { title: 'crontab(5) manual page', url: 'https://man7.org/linux/man-pages/man5/crontab.5.html', type: 'documentation', cost: 'free', provider: 'man7.org', primary: true },
            { title: 'systemd.timer manual', url: 'https://www.freedesktop.org/software/systemd/man/latest/systemd.timer.html', type: 'documentation', cost: 'free', provider: 'freedesktop.org' },
            { title: 'flock(1) manual page', url: 'https://man7.org/linux/man-pages/man1/flock.1.html', type: 'documentation', cost: 'free', provider: 'man7.org' },
            { title: 'crontab.guru', url: 'https://crontab.guru/', type: 'tool', cost: 'free', provider: 'Cronitor', note: 'Checks a schedule expression and explains it in English.' },
            { title: 'The Missing Semester: Command-line Environment', url: 'https://missing.csail.mit.edu/2020/command-line/', type: 'lecture', cost: 'free', provider: 'MIT CSAIL', note: 'Job control and dotfiles, which help with everyday automation.' },
          ],
          exercises: [
            {
              slug: 'cron-environment',
              title: 'Find the cron environment',
              prompt:
                'Add a cron job that runs `env > ~/cron-env.txt` once a minute, then remove it. Compare that file with the output of `env` in your terminal using `diff <(sort ~/cron-env.txt) <(env | sort)`. List the variables that differ, and explain why a script calling a program from `~/bin` would fail under cron. Fix it in two different ways.',
              kind: 'coding',
              difficulty: 1,
            },
            {
              slug: 'systemd-timer',
              title: 'A systemd user timer',
              prompt:
                'Write a user service and timer that run a small `disk-report` script every 15 minutes, appending a timestamped line with the percent used on `/` to a log. Confirm it works with `systemctl --user list-timers` and `journalctl --user -u disk-report`. Then write down, in 3-4 sentences, what happens to this timer when WSL shuts down and how you would run it reliably on a Windows laptop.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'no-overlap',
              title: 'Prevent overlapping runs',
              prompt:
                'Write `slowjob`, which takes a lock with `flock -n`, sleeps for 5 seconds, and appends the time to a log. Start 5 copies at once, and show that exactly 1 runs while the other 4 exit with status 75. Then kill the running copy with `kill -9`, and show that a new run gets the lock immediately. Explain how this is better than creating a lock file with `touch`.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'A script works in your terminal but fails under cron. What do you check first?',
              answerOutline:
                'The environment: PATH, working directory and missing variables. Also capture stderr to a log to see the error.',
            },
            {
              question: 'Why might a systemd timer inside WSL never fire?',
              answerOutline:
                'The WSL VM stops when idle, so no timer runs. Use Windows Task Scheduler to start the job through wsl.exe.',
            },
            {
              question: 'Why is flock better than checking for a lock file?',
              answerOutline:
                'The kernel releases the lock automatically when the process dies, and acquiring it is atomic, so there are no stale locks or races.',
            },
          ],
        },
      ],
    },
  ],
  capstone: {
    slug: 'snapkeep',
    title: 'snapkeep: incremental snapshot backups in Bash',
    description:
      'Build a single-file backup tool that makes hard-linked snapshots with rsync, verifies them with checksums, prunes by a retention policy, and runs unattended. The full specification is in the final project page.',
    deliverables: [
      'A shellcheck-clean Bash tool with backup, list, prune, verify and restore commands',
      'A retention policy implemented and tested as a pure function',
      'A Bats test suite, including failure and interruption cases',
      'A systemd timer setup, a Windows Task Scheduler note, and CI',
    ],
    estimatedHours: 16,
    stretchGoals: ['Support pushing snapshots to another machine over SSH.'],
  },
  masteryChecklist: [
    'I can explain what the shell does to a line before a program ever runs',
    'I can answer questions about text files in one pipeline with grep, sed, awk, sort and uniq',
    'I can quote every expansion correctly, and I can explain word splitting and globbing',
    'I can use parameter expansion, arrays and associative arrays where others call external tools',
    'I can process files with any name, including spaces and newlines',
    'I can write scripts with functions, getopts, clear usage messages and exit codes',
    'I can use strict mode while knowing its gaps, and clean up with traps',
    'I can keep scripts shellcheck-clean, formatted and tested with Bats',
    'I can schedule jobs reliably, prevent overlaps, and leave useful logs',
  ],
});
