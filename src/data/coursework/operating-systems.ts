import { defineCoursework } from '../define';

const xv6Extensions = ['ms-vscode.cpptools', 'ms-vscode-remote.remote-wsl'];
const xv6Toolchain = [
  'On Windows, install WSL 2 with Ubuntu, then open the folder through the WSL extension so every command below runs in Linux.',
  'In Ubuntu: `sudo apt install git build-essential bc gdb-multiarch qemu-system-misc gcc-riscv64-linux-gnu binutils-riscv64-linux-gnu python3-pexpect python3-matplotlib`. The xv6 Makefile requires QEMU 7.2 or later.',
  'Clone `https://github.com/mit-pdos/xv6-riscv` and record your starting commit in the README. This spec follows the current tree, where the user sleep call is `pause(n)`, kernel entry points are named `kfork`, `kexit` and `kwait`, and lazy `sbrklazy` already exists through `vmfault`. Adapt the names if your commit differs.',
];

export default defineCoursework({
  subjectId: 'operating-systems',
  machineProblems: [
    {
      slug: 'mp1-mlfq',
      title: 'mlfq: a measured multi-level feedback queue for xv6',
      afterModule: 'cpu-scheduling',
      coversModules: ['foundations', 'cpu-scheduling'],
      supersedesProject: true,
      summary: 'Replace the round-robin scheduler in xv6 with an MLFQ that cannot be gamed, expose its statistics through a new system call, and prove the difference with an automated harness.',
      language: 'C (xv6-riscv kernel)',
      estimatedHours: 14,
      overview: `xv6 ships with the simplest useful scheduler: scan the process table and run the next runnable process for one timer tick. It is fair, and it has no idea which jobs are interactive. In this MP you replace it with the multi-level feedback queue from OSTEP and then show that it behaves as the rules predict.

You will touch the path that everything in this module depends on: the timer interrupt, \`yield\`, the per-CPU \`scheduler\` loop and the context switch. You will also add a system call from end to end, from the user stub through the trap into the kernel, and write user programs that create workloads with \`fork\`, \`exec\`, \`wait\` and pipes.

The important detail is **accounting**. If CPU use is charged only when the timer fires, a process can run for 80% of every tick and go to sleep just before the interrupt, so it is never charged and stays at top priority forever. You will close that hole by measuring real CPU time with the RISC-V \`time\` register at every switch, which is OSTEP's Rule 4 in its corrected form.

**Constraints.** One tick is 1,000,000 units of the \`time\` register, about 0.1 s under QEMU. Keep the tick length as it is. Build with \`make clean\` when changing the scheduler choice, because object files do not track that flag. Use only the concepts from the first two modules, and leave memory management unchanged.`,
      setup: {
        extensions: xv6Extensions,
        toolchain: xv6Toolchain,
        structure: `xv6-riscv/
├── kernel/
│   ├── proc.c             # scheduler(), yield(), boost, accounting
│   ├── proc.h             # per-process level and statistics
│   ├── pstat.h            # struct pstat, shared with user programs
│   ├── sysproc.c          # sys_getpinfo
│   └── trap.c             # timer path
├── user/
│   ├── spin.c             # CPU-bound worker
│   ├── iobound.c          # sleeps often, uses little CPU
│   ├── gamer.c            # tries to cheat the accounting
│   └── mlfqtest.c         # workloads, printing CSV to the console
├── tests/run.py           # boots QEMU, runs mlfqtest, checks results
├── scripts/plot.py        # plots from the captured CSV
├── Makefile               # adds SCHED=RR or SCHED=MLFQ
└── REPORT.md`,
        commands: [
          { label: 'Boot with MLFQ on one CPU', command: 'make clean && make qemu SCHED=MLFQ CPUS=1' },
          { label: 'Boot the original round robin', command: 'make clean && make qemu SCHED=RR CPUS=1' },
          { label: 'Run the automated checks', command: 'python3 tests/run.py' },
          { label: 'Run the stock kernel tests on three CPUs', command: 'make clean && make qemu SCHED=MLFQ CPUS=3   # then at the xv6 prompt: usertests -q' },
          { label: 'Debug the kernel', command: 'make qemu-gdb CPUS=1   # then in a second terminal: gdb-multiarch -x .gdbinit' },
        ],
      },
      requirements: [
        'There are three levels, Q0 highest to Q2 lowest. A new process starts at Q0, the scheduler always picks from the highest non-empty level, and it uses round robin within a level. `SCHED=RR` builds the original scheduler for comparison.',
        'The allotment is 2 ticks of CPU at Q0 and 4 ticks at Q1. A process that uses its whole allotment drops one level, whether it used it in one run or across many short runs. Q2 has no limit.',
        'CPU time is measured with `r_time()` when a process is switched in and out and is charged to its allotment, so a process that sleeps just before each tick is still charged.',
        'Every 64 ticks, a priority boost moves every process to Q0 and resets its allotment.',
        'A runnable process at a higher level replaces a lower one at the next timer tick at the latest, and the kernel stays correct on 1 and 3 CPUs, with no process running on two CPUs at once.',
        '`getpinfo(struct pstat *)` fills one entry per live process with pid, state, current level, CPU ticks at each level, ticks spent runnable but not running, and number of times scheduled, plus the global boost count and the tick of the last boost.',
        'A busy-wait helper spins until `getpinfo` shows a requested amount of the process\'s own CPU time, so workloads are defined in ticks of CPU and not in loop counts.',
        '`mlfqtest` starts workloads with `fork` and `exec`, collects results from children through a pipe, and prints CSV. `tests/run.py` drives QEMU with `pexpect` and fails if a check fails.',
        '`REPORT.md` compares RR and MLFQ on at least three workloads, with response and turnaround tables, a plot of level over time, and the effect of changing the boost period to 16 and 256 ticks.',
      ],
      acceptanceTests: [
        'On `CPUS=1`, a single process spinning for 640 ticks of CPU records about 20 ticks at Q0, 40 at Q1 and 580 at Q2 (each within 6), with 10 boosts plus or minus 1.',
        'Two identical CPU-bound processes started together on `CPUS=1` each receive 100 ticks of CPU, within 10, over the first 200 ticks.',
        'On `CPUS=1` with three CPU-bound processes at Q2, an I/O-bound process that calls `pause(1)` 100 times finishes still at Q0, and its mean runnable wait per wake-up is under 0.5 ticks. On `SCHED=RR` the same workload gives at least 1 tick.',
        'On `CPUS=1` with three CPU-bound processes at Q2, a job started at least 20 ticks after the last boost and at least 10 ticks before the next one, needing 5 ticks of CPU, has a turnaround of at most 7 ticks. On `SCHED=RR` it takes at least 15 ticks. Read the boost time from `getpinfo` to place the job.',
        '`gamer`, which spins for about 80% of a tick and then calls `pause(1)`, reaches Q2 within 20 ticks of starting. In a comparison build that charges only at timer ticks, it is still at Q0 after those 20 ticks.',
        '`usertests -q` passes on `CPUS=3` under MLFQ, and `forktest` passes on `CPUS=1`.',
      ],
      resources: [
        {
          title: 'Operating Systems: Three Easy Pieces',
          url: 'https://pages.cs.wisc.edu/~remzi/OSTEP/',
          type: 'textbook',
          cost: 'free',
          provider: 'University of Wisconsin-Madison',
          note: 'The MLFQ chapter defines the rules this MP implements, including the corrected Rule 4.',
          primary: true,
        },
        {
          title: 'MIT 6.1810: Operating System Engineering',
          url: 'https://pdos.csail.mit.edu/6.1810/',
          type: 'course',
          cost: 'free',
          provider: 'MIT',
          note: 'Home of the xv6 book. Read the chapters on scheduling and on traps and system calls.',
        },
      ],
      stretchGoals: [
        'Add a lottery or stride mode and compare its fairness with MLFQ on the same workloads.',
        'Add per-CPU run queues with work stealing, and measure lock contention at 1, 2 and 4 CPUs.',
      ],
    },
    {
      slug: 'mp2-kthreads',
      title: 'kthreads: kernel threads and futexes for xv6',
      afterModule: 'concurrency',
      coversModules: ['memory-virtualization', 'concurrency'],
      summary: 'Add threads that share one address space to xv6, build a futex and a user-level synchronisation library on top, and show why sleeping beats spinning.',
      language: 'C (xv6-riscv kernel and user library)',
      estimatedHours: 20,
      overview: `xv6 processes have one thread each. In this MP you give them more, which means the kernel must stop assuming that an address space belongs to one process.

You will add \`clone\` and \`join\`, so several schedulable entities share a page table. That breaks things you have read about but not had to fix. The page table holds one \`TRAPFRAME\` mapping, and the trampoline loads that address as a constant, so two threads cannot simply share it. \`sz\` must become shared state. A lazily allocated page can now fault on two CPUs at once, and the stock \`vmfault\` treats the loser of that race as a bad access and the process is killed. Teardown must free the address space exactly once.

On top of that you will build the piece that connects the kernel to user-level locks: a **futex**. A thread that finds a lock held asks the kernel to sleep only if the lock word still has the value it saw. Getting that check right, under the right lock, is the lost-wakeup problem from this module in its purest form. You will then write a mutex, condition variable and semaphore in user space and measure them against a spinlock.

**Constraints.** Start from your MP 1 kernel, since \`getpinfo\` provides the measurements. Each thread is a \`struct proc\` with its own kernel stack. File descriptors are copied at \`clone\`, as in the OSTEP project. A multi-threaded process may refuse \`sbrk\` with a negative argument and return an error, because xv6 has no TLB shootdown. Do not add new memory-management features beyond what is listed here.`,
      setup: {
        extensions: xv6Extensions,
        toolchain: [
          ...xv6Toolchain,
          'Kernel code cannot use ThreadSanitizer, so rely on assertions, `CPUS=3` stress runs and the lock-order rules in your README.',
        ],
        structure: `xv6-riscv/
├── kernel/
│   ├── proc.c             # clone, join, thread groups, teardown
│   ├── vm.c               # shared address space, vmfault race fix, guard pages
│   ├── futex.c            # hash table of wait queues keyed by physical address
│   └── trampoline.S       # only if you choose per-thread TRAPFRAME addresses
├── user/
│   ├── uthread.c          # thread_create, thread_join, spin, mutex, cond, sem
│   ├── uthread.h
│   ├── umalloc.c          # made thread-safe
│   └── threadtest.c       # the acceptance tests, printing CSV
├── tests/run.py           # boots QEMU, runs threadtest on 1 and 3 CPUs
└── REPORT.md`,
        commands: [
          { label: 'Boot on three CPUs', command: 'make qemu CPUS=3' },
          { label: 'Run the thread tests at the xv6 prompt', command: 'threadtest' },
          { label: 'Run the automated checks', command: 'python3 tests/run.py' },
          { label: 'Stress for races', command: 'python3 tests/run.py --repeat 20 --cpus 3' },
        ],
      },
      requirements: [
        '`clone(fn, arg, stack)` creates a thread in the caller\'s address space and `join(&stack)` waits for one and returns its stack pointer. `thread_create` and `thread_join` wrap them in `user/uthread.c`.',
        'Each thread has its own trapframe. Either give each thread its own root page table that shares the user subtree, or give each one a separate trapframe address and pass it through `sscratch`. `REPORT.md` explains your choice and what it cost.',
        'Size and page-table changes are shared and serialised by one group lock. Growth by any thread is visible to all at once, and `sbrk` with a negative argument returns an error while more than one thread is alive.',
        '`vmfault` handles concurrent faults on the same lazy page: the loser of the race sees a valid user mapping and returns to user mode instead of being killed. A fault on a mapped page without `PTE_U`, such as a guard page, still kills the process.',
        'Calling `exit` in any thread ends the whole group, and a new `texit` ends only the caller. `wait` ignores threads, `join` ignores child processes, `fork` copies only the calling thread, `exec` stops its siblings first, and `kill` applies to the group.',
        'The address space is freed exactly once, by the last thread out, and a new `freepages` system call shows that nothing leaked.',
        '`futex_wait(addr, val)` sleeps only if `*addr` still equals `val`, checked under the same bucket lock that `futex_wake(addr, n)` takes, and returns -1 at once otherwise. `futex_wake` returns how many threads it woke. Wait queues are keyed by physical address.',
        '`uthread.c` provides a spinlock, a futex mutex with an uncontended path that makes no system call, a Mesa condition variable, and a counting semaphore. `malloc` and `free` are protected by a lock.',
        'A new `guardpage(addr)` system call removes user access to one page using `uvmclear`, and `thread_create` places a guard page below every thread stack.',
        '`REPORT.md` gives a table of throughput and CPU ticks for spinlock against futex mutex at 1, 2, 4 and 8 threads on `CPUS=1` and `CPUS=3`, and documents the kernel lock order.',
      ],
      acceptanceTests: [
        'Four threads each increment a shared counter 100,000 times under the futex mutex on `CPUS=3`: the result is exactly 400,000 on 20 consecutive runs.',
        'A bounded buffer of capacity 8 with 3 producers, each sending 1 to 10,000, and 3 consumers delivers exactly 30,000 items summing to 150,015,000, on 20 consecutive `CPUS=3` runs with no deadlock.',
        'With 8 threads asleep in `futex_wait`, `futex_wake(addr, 3)` returns 3, a second `futex_wake(addr, 100)` returns 5, and a third returns 0. `futex_wait(addr, wrong_value)` returns -1 at once.',
        'After `sbrklazy` grows the heap by 4 MiB (1,024 pages), four threads touch every page at the same time on `CPUS=3`. No thread is killed, and `freepages` returns to its starting value after the process exits.',
        'While a holder keeps the lock across `pause(20)` on `CPUS=2`, two waiting threads together use at least 30 ticks of CPU with the spinlock and at most 2 ticks with the futex mutex, measured through `getpinfo`.',
        'A thread that calls `exit(7)` while three siblings loop makes the parent\'s `wait` report status 7 exactly once. A thread that recurses without limit faults on its guard page and ends its group without harming other processes, and `usertests -q` still passes on `CPUS=3`.',
      ],
      resources: [
        {
          title: 'xv6-riscv source',
          url: 'https://github.com/mit-pdos/xv6-riscv',
          type: 'tool',
          cost: 'free',
          provider: 'MIT PDOS',
          note: 'Read `trampoline.S`, `vmfault` in `vm.c`, and `kfork` and `kexit` in `proc.c` before you design anything.',
        },
      ],
      stretchGoals: [
        'Add a reader-writer lock that avoids writer starvation, and measure it under a 90% read workload.',
        'Move the ticket lock idea into the kernel spinlock and measure fairness across CPUs.',
      ],
    },
  ],
  finalProject: {
    slug: 'final-boxv6',
    title: 'boxv6: containers built into xv6 from the kernel up',
    repoName: 'boxv6',
    summary: 'Add containers to xv6 with process and filesystem isolation, CPU shares, memory limits with swapping, disk quotas and a syscall filter, then attack them with an escape test suite.',
    language: 'C (xv6-riscv) and Python 3',
    estimatedHours: 60,
    overview: `Docker feels like magic until you see what is underneath: a few kernel features that change what a process can see and how much it may use. This project builds those features into a teaching kernel small enough to read in a weekend, so a visitor can boot it in QEMU and watch them work:

\`box run --cpu 300 --mem 256 --disk 100 --pids 8 alpha /sh\`

Inside that shell, the process is pid 1, \`/\` is a private directory, \`kill\` cannot reach the host, and a fork bomb stops at 8 processes while the host stays responsive. A memory hog pages to swap instead of taking down the machine. The \`box top\` command shows it all live.

Each feature exercises one part of the course. A **PID namespace** changes the process abstraction. **Stride scheduling** across boxes gives proportional CPU shares. A **resident-memory limit** needs demand paging, the clock algorithm and a swap area. **Disk quotas** must stay correct across a crash, which brings in the log. A **syscall filter** applies least privilege at the trap boundary, and every path has to be safe with several CPUs running at once.

This is not a lab solution. The combination is your own, and so are the design decisions. You will finish by attacking your own work with a suite of escape attempts and a crash-injection harness, then measure the result against booting a whole virtual machine.

**Constraints.** Stay on xv6-riscv under QEMU, which is MIT licensed, so a modified kernel can be published with its notice kept. Keep stock \`usertests -q\` passing outside any box. You may reuse MP 1 and MP 2 code, but boxes must work with single-threaded programs too. Stock \`mkfs\` writes a flat root directory on a 2,000-block disk, so extend it to build \`/images/base\` and raise \`FSSIZE\` and the inode count as needed.`,
    setup: {
      extensions: ['ms-vscode.cpptools', 'ms-python.python', 'ms-vscode-remote.remote-wsl', 'github.vscode-github-actions'],
      toolchain: xv6Toolchain,
      structure: `boxv6/
├── kernel/
│   ├── box.c              # box table, lifecycle, limits, syscall filter
│   ├── stride.c           # proportional share across boxes
│   ├── swap.c             # swap area and clock replacement
│   └── ...                # changes to proc.c, vm.c, fs.c, syscall.c
├── user/
│   ├── box.c              # create, run, ps, top, kill, rm
│   └── boxtests/          # isolation, limits and escape attempts
├── mkfs/                  # builds /images/base and reserves swap
├── tools/fsck.py          # offline checker for fs.img, including quota audit
├── tests/harness.py       # boots QEMU, scripts sessions, injects crashes
├── bench/                 # overhead and isolation measurements
├── docs/DESIGN.md
├── docs/SECURITY.md       # threat model and known gaps
├── docs/LOCKS.md          # kernel lock order
├── docs/RESULTS.md
├── .github/workflows/ci.yml
├── LICENSE                # keeps the xv6 MIT notice
└── README.md`,
      commands: [
        { label: 'Boot on three CPUs', command: 'make qemu CPUS=3' },
        { label: 'Try a box at the xv6 prompt', command: 'box run --cpu 300 --mem 256 --disk 100 --pids 8 alpha /sh' },
        { label: 'Run the full automated suite', command: 'python3 tests/harness.py --all' },
        { label: 'Inject crashes during disk writes', command: 'python3 tests/harness.py --crash --seed 42 --runs 20' },
        { label: 'Check a disk image offline', command: 'python3 tools/fsck.py fs.img' },
      ],
    },
    requirements: [
      'System calls create, enter, inspect, kill and destroy boxes, with up to 8 live boxes and no nesting. The `box` command offers `create`, `run`, `ps`, `top`, `kill` and `rm`, and creating a box copies `/images/base` into `/boxes/<name>`.',
      'Each box has its own PID namespace. Its first process sees pid 1, `getpid`, `wait` and `kill` use box-local numbers, and a process cannot name or signal anything outside its box. The host can see every box.',
      'Each box has a root directory that path lookup cannot leave. `..` at the box root stays there, and entering a box resets the working directory and closes every file descriptor above 2.',
      'Stride scheduling runs across boxes with weights from 1 to 1000, and round robin runs within a box. Host processes form an implicit box of weight 100, and a box that was idle has its pass reset on wake so it cannot bank CPU time.',
      'Each box has a limit on resident user pages. Above it, a clock algorithm pages out to an 8 MiB swap area reserved in `fs.img`, `vmfault` pages back in on demand, and per-box counters report major faults and swap-outs. Swap space is freed at exit.',
      'Each box has limits on processes and open files, and hitting one returns an error inside the box without affecting the host.',
      'Each box has quotas on newly allocated disk blocks and inodes, with the base image excluded. Indirect blocks are charged, `unlink` credits usage back, and usage is correct after a crash, which requires a design that agrees with the log.',
      'Each box has a 64-bit allowed-syscall mask, inherited across `fork`, which can only shrink. The check happens in `syscall()`, a denied call returns -1, and a per-box counter records each denial.',
      'All new kernel paths are safe on 3 CPUs, and `docs/LOCKS.md` states the lock order. Four boxes running stress workloads, including MP 2 threads, run for 10 minutes on `CPUS=3` with no panic, deadlock or accounting drift.',
      '`docs/RESULTS.md` measures fork, exec and system-call overhead inside and outside a box, and box start time against booting a fresh QEMU virtual machine. `docs/SECURITY.md` gives a threat model and lists resources that are still shared between boxes.',
    ],
    acceptanceTests: [
      'Inside a new box `getpid()` returns 1, `kill` on a host pid returns -1, and after `cd ../../..` a host file `/secret` cannot be opened. At least 12 scripted escape attempts all fail, including a process entering with its working directory outside the root, an inherited open file, and an attempt to re-add a denied system call.',
      'With two boxes of weights 300 and 100 running one CPU-bound process each on `CPUS=1`, they receive 450 and 150 ticks of CPU over 600 ticks, each within 15. With three such processes per box on `CPUS=3`, they receive 1,350 and 450 CPU-ticks, each within 70.',
      'A box limited to 256 pages (1 MiB) runs a program that writes 512 pages (2 MiB) and reads them back twice. Every checksum is correct, swap-outs are at least 256, and `freepages` returns to its starting value after `box rm`. A hot set of 200 pages touched repeatedly after that cold pass stops causing major faults once loaded.',
      'A fork bomb in a box limited to 8 processes sees `fork` return -1. A host command still answers within 2 seconds, and after `box rm` the free process slots and free pages match their starting values.',
      'In a box with a quota of 100 new blocks, one write loop stops after exactly 101,376 bytes: 99 data blocks (12 direct and 87 indirect) plus the indirect block. After `unlink`, usage reads 0 and the same write succeeds again.',
      'Killing QEMU at 20 seeded random moments during box file writes, then rebooting, leaves `tools/fsck.py` reporting no errors each time, with `box stat` usage equal to the offline audit.',
    ],
    coverage: [
      { module: 'foundations', demonstrates: 'The `box` command uses `fork`, `exec`, `wait` and pipes, and the PID namespace and new system calls change the process abstraction through the trap path.' },
      { module: 'cpu-scheduling', demonstrates: 'Stride scheduling gives boxes measured proportional shares, on one CPU and on several, with fair behaviour after idle periods.' },
      { module: 'memory-virtualization', demonstrates: 'Resident limits, demand paging, clock replacement and swapping work through page tables and the page-fault handler.' },
      { module: 'concurrency', demonstrates: 'Every kernel path is safe across CPUs under a documented lock order, proven by a stress run, and MP 2 threads run inside boxes.' },
      { module: 'persistence', demonstrates: 'Private roots, disk quotas and a crash-injection harness show directory handling, block allocation and recovery through the log.' },
      { module: 'beyond-the-kernel', demonstrates: 'The project implements namespaces, resource control and syscall filtering, compares box start with VM boot, and documents a threat model.' },
    ],
    portfolio: [
      'The README opens with a terminal recording of a fork bomb and a memory hog being contained while `box top` runs, then gives a one-command quick start.',
      'GitHub Actions builds the kernel, boots it under QEMU, and runs the isolation and quota suites on every push, with a status badge in the README.',
      '`docs/DESIGN.md` explains each feature with a diagram and its main decision, and `docs/RESULTS.md` shows the fairness, swapping and overhead plots.',
      '`docs/SECURITY.md` lists every escape attempt and its result, plus what the design does not protect against.',
      'The repository keeps the xv6 MIT notice in `LICENSE`, has a tagged `v1.0.0` release with a bootable `fs.img`, and has one focused commit series per feature.',
    ],
    stretchGoals: [
      'Add copy-on-write snapshots of a box root so that `box create` is instant.',
      'Add a virtual network between boxes with a pipe-backed socket device.',
      'Add a `box checkpoint` that saves a single-process box to disk and restores it after a reboot.',
    ],
    resources: [
      {
        title: 'xv6-riscv source',
        url: 'https://github.com/mit-pdos/xv6-riscv',
        type: 'tool',
        cost: 'free',
        provider: 'MIT PDOS',
        note: 'The base kernel, MIT licensed. Keep its notice in your LICENSE file.',
      },
      {
        title: 'Operating Systems: Three Easy Pieces',
        url: 'https://pages.cs.wisc.edu/~remzi/OSTEP/',
        type: 'textbook',
        cost: 'free',
        provider: 'University of Wisconsin-Madison',
        note: 'Use the proportional-share, beyond-physical-memory and crash-consistency chapters as design references.',
      },
    ],
  },
});
