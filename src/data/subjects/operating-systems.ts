import { defineSubject } from '../define';

export default defineSubject({
  id: 'operating-systems',
  title: 'Operating Systems',
  category: 'cs',
  tagline:
    'Virtualization, concurrency and persistence: how a kernel turns one CPU and one disk into a safe, shared machine.',
  description: `An operating system is the program that sits between hardware and every other program you will ever write. It gives each process the illusion of its own CPU and its own memory, lets many threads share data without corrupting it, and turns a raw disk into files that survive crashes. Understanding it explains why programs are slow, why they crash, and how they are isolated from one another.

This curriculum follows the three pillars of *Operating Systems: Three Easy Pieces* (OSTEP), the free textbook by Remzi and Andrea Arpaci-Dusseau: **virtualization**, **concurrency** and **persistence**. Each lesson pairs a chapter with its simulator homework and, where it fits, a hands-on project in the MIT xv6 teaching kernel. You will read real kernel code, write C that uses the Unix API, build a scheduler and a file-system checker, and measure what the hardware actually does.

By the end you should be able to read the source of a real kernel subsystem, explain any performance anomaly in terms of scheduling, caching, paging or locking, and implement core OS mechanisms yourself.`,
  difficulty: 'advanced',
  estimatedHours: 100,
  prerequisites: ['computer-architecture', 'systems-programming'],
  recommendedBackground: [
    'Comfortable writing and debugging C (pointers, structs, malloc/free)',
    'Basic Unix shell use',
    'Data structures: linked lists, hash tables, trees',
  ],
  tags: ['systems', 'concurrency', 'kernels', 'C', 'xv6', 'OSTEP'],
  core: true,
  modules: [
    {
      slug: 'foundations',
      title: 'Foundations: Processes and the Unix API',
      description:
        'What an OS is for, how it virtualizes the CPU, and the process abstraction and system-call interface every program is built on.',
      lessons: [
        {
          slug: 'what-an-os-does',
          title: 'What an operating system does',
          summary:
            'The three easy pieces: virtualization, concurrency and persistence, and the design goals that shape every kernel.',
          estimatedMinutes: 90,
          objectives: [
            'Explain the three problems an OS solves and give a concrete example of each',
            'Describe the difference between a mechanism and a policy',
            'List the main design goals of an OS (abstraction, performance, protection, reliability) and the tensions between them',
            'Trace what happens, at a high level, when you run a program from the shell',
          ],
          concepts: [
            'Virtualization: turning a physical resource into many virtual ones',
            'Concurrency: correct behaviour when many things happen at once',
            'Persistence: data that outlives a process or a crash',
            'Mechanism vs policy',
            'Protection and isolation',
            'System calls as the OS API',
            'Resource manager view of the OS',
          ],
          explanation: `An operating system is a **resource manager** and an **abstraction layer**. Hardware offers a few CPUs, some RAM and a disk; programs want to believe they each have a private CPU, an enormous private memory, and files that never disappear. OSTEP organises everything an OS does around three problems:

1. **Virtualization** – time-slicing the CPU so each process thinks it runs alone, and mapping each process's addresses onto physical memory so each thinks it owns the machine.
2. **Concurrency** – when several threads touch shared memory, instructions interleave in ways that break naive code. Locks, condition variables and careful design restore correctness.
3. **Persistence** – a file system must organise disk blocks into files and directories and survive power loss halfway through a write.

Two ideas recur everywhere. **Mechanism vs policy**: a *mechanism* is the low-level machinery (a context switch, a page table), a *policy* is the decision of how to use it (which process runs next). Good kernels separate them so policy can change without rewriting mechanisms. **The cost of abstraction**: every illusion costs cycles, and much of OS design is making the common case fast while keeping the rare case correct.

Read OSTEP's introduction (chapter 2) first; it contains small programs you should actually run. Then watch the first lecture of MIT 6.1810 for a kernel-centred view and skim the xv6 book's first chapter to see what a real (small) kernel looks like. Keep a list of questions: most will be answered in the next 20 lessons.`,
          resources: [
            {
              title: 'OSTEP — Introduction to Operating Systems (Chapter 2)',
              url: 'https://pages.cs.wisc.edu/~remzi/OSTEP/intro.pdf',
              type: 'textbook',
              cost: 'free',
              provider: 'OSTEP',
              note: 'Run the example programs (cpu.c, mem.c, threads.c, io.c) yourself.',
              primary: true,
            },
            {
              title: 'OSTEP book home page and chapter index',
              url: 'https://pages.cs.wisc.edu/~remzi/OSTEP/',
              type: 'textbook',
              cost: 'free',
              provider: 'OSTEP',
              note: 'All chapters are free PDFs. A bound copy is sold but not required.',
            },
            {
              title: 'MIT 6.1810 Operating System Engineering (xv6)',
              url: 'https://pdos.csail.mit.edu/6.828/',
              type: 'course',
              cost: 'free',
              provider: 'MIT',
              note: 'Lecture 1 (introduction and examples) plus the lab setup instructions. Used throughout this subject.',
            },
            {
              title: 'xv6: a simple, Unix-like teaching operating system (book)',
              url: 'https://pdos.csail.mit.edu/6.828/2023/xv6/book-riscv-rev3.pdf',
              type: 'textbook',
              cost: 'free',
              provider: 'MIT',
              note: 'Chapter 1 for this lesson; the rest is referenced in later modules.',
            },
          ],
          exercises: [
            {
              slug: 'run-ostep-intro-programs',
              title: 'Run the OSTEP introduction programs',
              prompt:
                'Download the code from the OSTEP intro chapter (cpu.c, mem.c, threads.c, io.c). Compile with gcc, run two instances of cpu.c simultaneously, then mem.c twice. Write down what you observe about CPU sharing and memory addresses, and explain each observation in one sentence. Run threads.c with loop counts 1000, 100000 and 10000000; record the final counter and explain why it is wrong.',
              kind: 'coding',
              difficulty: 1,
              hint: 'On modern Linux, mem.c will print identical virtual addresses for both processes unless ASLR is disabled; that is the point.',
            },
            {
              slug: 'xv6-setup',
              title: 'Build and boot xv6',
              prompt:
                'Follow the MIT 6.1810 tools page to install the RISC-V toolchain and QEMU, clone the xv6-riscv repository and run `make qemu`. Run `ls`, `cat README` and `wc README` inside xv6. Then read `user/cat.c` and explain, line by line, which system calls it makes and why.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'mechanism-policy-list',
              title: 'Classify mechanisms and policies',
              prompt:
                'For each of the following, say whether it is a mechanism or a policy, and name the other half: context switch, round-robin scheduling, page table, LRU replacement, file-system journaling, the decision to flush the journal every 5 seconds. Write one paragraph on why separating the two matters for a kernel maintainer.',
              kind: 'writing',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'What are the three "easy pieces" and what hardware limitation motivates each?',
              answerOutline:
                'Virtualization (few CPUs/finite RAM vs many programs), concurrency (multiple threads/CPUs updating shared state), persistence (volatile memory vs need for durable data).',
            },
            {
              question: 'Give an example of a mechanism and a policy for CPU scheduling.',
              answerOutline:
                'Mechanism: context switch / timer interrupt. Policy: round-robin, MLFQ, priority choice.',
            },
            {
              question: 'Why did threads.c in OSTEP produce a wrong final counter?',
              answerOutline:
                'The increment is not atomic (load, add, store); interleavings between threads lose updates. This is a race condition.',
            },
          ],
        },
        {
          slug: 'the-process-abstraction',
          title: 'The process abstraction',
          summary:
            'What a process is, its states and the data structures the kernel keeps to represent one.',
          estimatedMinutes: 90,
          objectives: [
            'Define a process in terms of its machine state (address space, registers, I/O state)',
            'Draw the process state diagram (running, ready, blocked) and label the transitions',
            'Describe what a process control block (PCB) contains and find it in xv6',
            'Explain how time sharing creates the illusion of many CPUs',
          ],
          concepts: [
            'Process = running program plus its state',
            'Address space, registers, program counter, stack pointer',
            'Process states: running, ready, blocked (and zombie)',
            'Process list / process control block',
            'Time sharing vs space sharing',
            'Context switch (mechanism)',
            'Loading a program: code, static data, stack, heap',
          ],
          explanation: `A **process** is the OS's abstraction of a running program. A program on disk is just bytes; a process is those bytes loaded into an **address space**, plus the CPU **registers** (including the program counter and stack pointer), plus **I/O state** such as open files. Everything the kernel needs to pause a process and resume it later is in that machine state.

The OS creates the illusion of many CPUs by **time sharing**: it runs one process for a while, saves its registers, restores another's, and continues. The saved copy lives in a per-process structure, called the **process control block** in textbooks and \`struct proc\` in xv6 (\`kernel/proc.h\`). Look at it: it holds the saved registers (\`context\`), the page table, the kernel stack, the process state, the open files and the parent pointer.

Processes move between three essential **states**. *Running* means it is on a CPU. *Ready* means it could run but another process holds the CPU. *Blocked* means it is waiting for something, typically I/O, and the scheduler should not pick it. The transitions (scheduled, descheduled, I/O initiate, I/O done) are what the scheduler and device drivers manipulate.

Read OSTEP chapter 4 carefully, then open xv6's \`proc.h\` and \`proc.c\`. Match every field of \`struct proc\` to a concept in the chapter. The \`enum procstate\` in xv6 has more states than the textbook model (\`UNUSED\`, \`USED\`, \`SLEEPING\`, \`RUNNABLE\`, \`RUNNING\`, \`ZOMBIE\`); work out which textbook state each corresponds to and why the extra ones exist.`,
          resources: [
            {
              title: 'OSTEP — The Abstraction: The Process (Chapter 4)',
              url: 'https://pages.cs.wisc.edu/~remzi/OSTEP/cpu-intro.pdf',
              type: 'textbook',
              cost: 'free',
              provider: 'OSTEP',
              primary: true,
            },
            {
              title: 'xv6-riscv source: kernel/proc.h and kernel/proc.c',
              url: 'https://github.com/mit-pdos/xv6-riscv/tree/riscv/kernel',
              type: 'documentation',
              cost: 'free',
              provider: 'MIT',
              note: 'Read struct proc and the procinit/allocproc functions.',
            },
            {
              title: 'OSTEP homework: process-run.py simulator',
              url: 'https://github.com/remzi-arpacidusseau/ostep-homework/tree/master/cpu-intro',
              type: 'problem-set',
              cost: 'free',
              provider: 'OSTEP',
            },
          ],
          exercises: [
            {
              slug: 'process-run-simulator',
              title: 'Process state simulator',
              prompt:
                'Complete all eight questions in the OSTEP cpu-intro homework using process-run.py. For each run, predict the CPU utilisation and total time before running with -c, then check. Pay special attention to the -I IO_RUN_IMMEDIATE vs IO_RUN_LATER flags and explain the difference in utilisation.',
              kind: 'simulation',
              difficulty: 1,
            },
            {
              slug: 'map-struct-proc',
              title: 'Annotate struct proc',
              prompt:
                'Copy xv6\'s `struct proc` into a document and annotate every field: which textbook concept it implements, which kernel functions read or write it, and which lock protects it. Identify the fields that make up the "machine state" from OSTEP chapter 4.',
              kind: 'reading',
              difficulty: 2,
            },
            {
              slug: 'count-processes',
              title: 'Count process states on your machine',
              prompt:
                'On Linux, write a script that reads /proc/*/stat and counts processes in each state (R, S, D, Z, T). Run it while a CPU-bound and an I/O-bound program are running and explain the numbers. Map the Linux states onto the OSTEP state diagram.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What exactly must the OS save to pause a process and resume it later?',
              answerOutline:
                'Register state including PC and SP (and page-table base); address-space contents stay in memory; open-file state in the PCB.',
            },
            {
              question: 'Why is a blocked process not simply "ready"?',
              answerOutline:
                'A blocked process cannot make progress until an event (I/O completion) occurs; scheduling it wastes the CPU. Ready processes can run immediately.',
            },
            {
              question: 'Why does xv6 have a ZOMBIE state?',
              answerOutline:
                'A process that has exited keeps its exit status until the parent calls wait(); its PCB cannot be freed until then.',
            },
          ],
        },
        {
          slug: 'process-api',
          title: 'The Unix process API: fork, exec, wait',
          summary:
            'The strange but powerful Unix way of creating processes, and why separating fork from exec enables the shell.',
          estimatedMinutes: 120,
          objectives: [
            'Write C programs that use fork(), exec(), wait() and pipe() correctly',
            'Explain why fork and exec are separate calls and how the shell exploits this',
            'Implement I/O redirection and a pipeline with file-descriptor manipulation',
            'Predict the output ordering of fork-heavy programs and explain nondeterminism',
          ],
          concepts: [
            'fork(): duplicate the calling process',
            'exec(): replace the address space with a new program',
            'wait()/waitpid(): synchronise with child exit',
            'File descriptors and the per-process descriptor table',
            'dup2() and redirection',
            'pipe(): kernel buffer between processes',
            'Zombies and orphans',
            'kill() and signals (introduction)',
          ],
          explanation: `Unix creates processes with a pair of calls that seem odd until you see the shell. **fork()** makes a near-identical copy of the caller: both continue from the return of fork, the parent gets the child's PID and the child gets 0. **exec()** then *replaces* the child's code and data with a new program, keeping the same process (same PID, same open file descriptors). **wait()** lets the parent block until the child finishes.

Why separate them? Because the shell runs code *between* fork and exec: it can close standard output and open a file in its place, so that \`wc file > out.txt\` works without \`wc\` knowing anything about redirection. The same trick builds pipelines: \`pipe()\` creates two file descriptors joined by a kernel buffer; the shell forks twice, points one child's stdout and the other's stdin at the pipe, and execs each command. File descriptors are small integers indexing a per-process table; \`dup2(old, new)\` makes \`new\` refer to the same open file as \`old\`.

Pitfalls you will hit: forgetting to close pipe ends (the reader never sees EOF), creating **zombies** by never calling wait, and assuming fork output order is deterministic (it is not; the scheduler decides). The output of \`printf\` can also appear twice if the stdio buffer is full at fork time; use \`fflush\` before forking.

Work through OSTEP chapter 5, then do the C homework in the ostep-homework repo (fork, wait, exec, pipe questions). Finish by reading xv6's \`user/sh.c\`: it is a complete shell in about 500 lines that uses exactly these calls.`,
          resources: [
            {
              title: 'OSTEP — Interlude: Process API (Chapter 5)',
              url: 'https://pages.cs.wisc.edu/~remzi/OSTEP/cpu-api.pdf',
              type: 'textbook',
              cost: 'free',
              provider: 'OSTEP',
              primary: true,
            },
            {
              title: 'OSTEP homework: cpu-api (C programs with fork/exec/wait/pipe)',
              url: 'https://github.com/remzi-arpacidusseau/ostep-homework/tree/master/cpu-api',
              type: 'problem-set',
              cost: 'free',
              provider: 'OSTEP',
            },
            {
              title: 'Linux man pages: fork(2), execve(2), wait(2), pipe(2), dup2(2)',
              url: 'https://man7.org/linux/man-pages/man2/fork.2.html',
              type: 'documentation',
              cost: 'free',
              provider: 'man7.org',
              note: 'The authoritative description of each call and its error cases.',
            },
            {
              title: 'xv6 user/sh.c — a complete Unix shell',
              url: 'https://github.com/mit-pdos/xv6-riscv/blob/riscv/user/sh.c',
              type: 'documentation',
              cost: 'free',
              provider: 'MIT',
            },
            {
              title: 'UIUC CS 341 System Programming coursebook (processes and pipes)',
              url: 'https://github.com/illinois-cs241/coursebook',
              type: 'textbook',
              cost: 'free',
              provider: 'University of Illinois',
              note: 'Chapters on processes, forking and pipes contain many worked examples.',
            },
          ],
          exercises: [
            {
              slug: 'fork-exec-homework',
              title: 'OSTEP process API homework',
              prompt:
                'Complete the eight questions in the OSTEP cpu-api homework: shared variable after fork, shared file descriptor, ordering with and without wait, the exec variants, wait return values, waitpid, closing stdout, and a pipe between two children. Submit the C code and a short note of what surprised you.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'mini-shell',
              title: 'Build a mini shell',
              prompt:
                'Write a shell in C that reads a line, splits it into words, and runs the command with fork/exec/wait. Add: built-in `cd` and `exit`, output redirection with `>`, input redirection with `<`, and a single pipe `a | b`. Test with at least 10 commands including an error case (missing program) and verify no zombies remain with `ps`.',
              kind: 'coding',
              difficulty: 3,
              hint: 'Handle redirection in the child after fork and before exec. Close unused pipe ends in both parent and children.',
            },
            {
              slug: 'fork-bomb-analysis',
              title: 'Why fork bombs work',
              prompt:
                'Explain in one page why `:(){ :|:& };:` exhausts a system, which kernel resources it consumes, and how `ulimit -u` and cgroups mitigate it. Do not run it on a machine you care about.',
              kind: 'writing',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'What does fork() return in the parent and in the child, and why?',
              answerOutline:
                'Parent: child PID (so it can wait/kill it). Child: 0 (so the code can branch). On failure: -1 in the parent.',
            },
            {
              question: 'How does the shell implement `ls > out.txt` without ls knowing?',
              answerOutline:
                'After fork, the child closes fd 1, opens out.txt (which gets the lowest free fd, 1), then execs ls. ls writes to fd 1 as usual.',
            },
            {
              question: 'Why must the parent close its copies of pipe file descriptors?',
              answerOutline:
                'The reader gets EOF only when all write ends are closed; an open write end in the parent keeps the reader blocked forever.',
            },
          ],
        },
        {
          slug: 'limited-direct-execution',
          title: 'Limited direct execution: traps, modes and context switches',
          summary:
            'How the OS runs programs directly on the CPU yet keeps control, using user/kernel modes, traps and timer interrupts.',
          estimatedMinutes: 120,
          objectives: [
            'Explain user mode vs kernel mode and why system calls need a trap',
            'Describe the trap table and what happens on a system call from the instruction level upward',
            'Explain how the timer interrupt lets the OS regain control from a running process',
            'Walk through a context switch in xv6 (swtch.S, usertrap, scheduler)',
          ],
          concepts: [
            'Direct execution and its two problems: restricted ops and regaining control',
            'User mode vs kernel mode (privilege levels)',
            'Trap, trap table, return-from-trap',
            'System call number and calling convention',
            'Timer interrupt and cooperative vs preemptive multitasking',
            'Context switch: saving/restoring kernel registers',
            'Kernel stack per process',
            'Cost of a system call and of a context switch',
          ],
          explanation: `To virtualize the CPU efficiently, the OS just *runs the program on the CPU*: direct execution. The problem is control. If the program runs directly, how do we stop it from reading the disk or from running forever? OSTEP calls the answer **limited direct execution**.

The hardware provides **modes**. In *user mode* privileged instructions fault. To do privileged work, a process executes a **trap** instruction (\`ecall\` on RISC-V, \`syscall\` on x86-64), which raises the privilege level and jumps to a handler the kernel installed at boot in a **trap table**. The kernel saves the user registers, examines the system-call number, does the work, and executes return-from-trap to drop back to user mode. In xv6 the path is \`uservec\` → \`usertrap()\` → \`syscall()\` → \`usertrapret()\` → \`userret\`; read it with the book's chapter 4 open.

The second problem is regaining control from a process that never traps. A **timer interrupt** fires every few milliseconds, the handler runs in the kernel, and the scheduler may decide to **context switch**: save this process's kernel registers into its \`context\`, restore another's, and return into that process's kernel code as if it had never left. xv6's \`swtch.S\` is 30 lines of assembly and is the whole mechanism; the policy lives in \`scheduler()\`.

The costs matter. A system call takes a few hundred nanoseconds; a context switch costs more because of lost cache and TLB state. Measure both in the homework and keep the numbers in mind for every later lesson.`,
          resources: [
            {
              title: 'OSTEP — Mechanism: Limited Direct Execution (Chapter 6)',
              url: 'https://pages.cs.wisc.edu/~remzi/OSTEP/cpu-mechanisms.pdf',
              type: 'textbook',
              cost: 'free',
              provider: 'OSTEP',
              primary: true,
            },
            {
              title: 'xv6 book — Chapter 4: Traps and system calls',
              url: 'https://pdos.csail.mit.edu/6.828/2023/xv6/book-riscv-rev3.pdf',
              type: 'textbook',
              cost: 'free',
              provider: 'MIT',
            },
            {
              title: 'MIT 6.1810 Lab: system calls',
              url: 'https://pdos.csail.mit.edu/6.828/2023/labs/syscall.html',
              type: 'problem-set',
              cost: 'free',
              provider: 'MIT',
              note: 'Adds trace and sysinfo system calls to xv6; the best way to learn the trap path.',
            },
            {
              title: 'OSTEP homework: measuring system call and context switch cost',
              url: 'https://github.com/remzi-arpacidusseau/ostep-homework',
              type: 'problem-set',
              cost: 'free',
              provider: 'OSTEP',
            },
          ],
          exercises: [
            {
              slug: 'measure-syscall-cost',
              title: 'Measure the cost of a system call and a context switch',
              prompt:
                'Write a C program that times 1,000,000 calls to read() on a 0-byte read, using clock_gettime(CLOCK_MONOTONIC). Then measure context-switch cost: create a pipe pair, pin two processes to one CPU with sched_setaffinity, and ping-pong a byte 100,000 times. Report both costs in nanoseconds and explain why the second is larger.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'xv6-syscall-lab',
              title: 'xv6 system call lab',
              prompt:
                'Complete the MIT 6.1810 system-call lab: implement the `trace` system call (print every traced syscall with its return value) and `sysinfo` (free memory and process count). Pass the provided grading tests. Write a paragraph tracing one trace() call from user code through uservec, usertrap and syscall() to the kernel implementation.',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'cooperative-vs-preemptive',
              title: 'What breaks without a timer?',
              prompt:
                'Describe what happens on a cooperative-multitasking OS (no timer interrupt) when a process enters an infinite loop. Then explain precisely which hardware feature fixes this, what the OS must set up at boot, and what state must be saved when the interrupt fires.',
              kind: 'writing',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'Why can a user process not simply jump into kernel code to do privileged work?',
              answerOutline:
                'Entry is only via trap instructions that jump to kernel-installed handlers at fixed addresses; the hardware raises privilege only on that path.',
            },
            {
              question: 'What is saved and where during a context switch in xv6?',
              answerOutline:
                'Callee-saved registers plus ra and sp are saved into the old process\'s struct context (kernel registers); user registers were already saved in the trapframe on trap entry.',
            },
            {
              question: 'Why is a context switch more expensive than its instruction count suggests?',
              answerOutline:
                'Indirect costs: cache, TLB and branch-predictor state belonging to the old process is lost, so the new one runs slowly at first.',
            },
          ],
        },
      ],
    },
    {
      slug: 'cpu-scheduling',
      title: 'CPU Scheduling',
      description:
        'Policies for deciding which process runs next: from FIFO and SJF to multi-level feedback queues, proportional share and multiprocessor scheduling.',
      lessons: [
        {
          slug: 'scheduling-metrics-and-basic-policies',
          title: 'Scheduling metrics and basic policies',
          summary:
            'Turnaround time, response time, and why FIFO, SJF, STCF and round-robin each fail in a different way.',
          estimatedMinutes: 90,
          objectives: [
            'Compute turnaround and response time for a given workload and policy',
            'Explain the convoy effect and how preemption fixes it',
            'Show why no policy is optimal for both turnaround and response time',
            'Explain how overlapping I/O with computation improves utilisation',
          ],
          concepts: [
            'Workload assumptions and relaxing them',
            'Turnaround time, response time, fairness',
            'FIFO and the convoy effect',
            'Shortest Job First (SJF), Shortest Time-to-Completion First (STCF)',
            'Round robin and time-slice length',
            'Preemption',
            'Overlap of I/O and CPU',
          ],
          explanation: `A scheduler is a **policy** over the context-switch mechanism. OSTEP introduces it by making unrealistic assumptions (all jobs arrive together, run the same length, only use the CPU) and then removing them one at a time, which is exactly how you should think about policies in general.

Two metrics pull in opposite directions. **Turnaround time** ($T_{completion} - T_{arrival}$) rewards finishing jobs quickly; **response time** ($T_{firstrun} - T_{arrival}$) rewards reacting quickly, which interactive users care about. **FIFO** is simple but suffers the *convoy effect*: one long job delays every short job behind it. **SJF** fixes turnaround if all jobs arrive at once; **STCF** (preemptive SJF) handles later arrivals. But both have terrible response time for the job that is not shortest. **Round robin** with a small time slice gives excellent response time but the worst turnaround, and a slice shorter than a context switch wastes the CPU.

The final realistic assumption to drop is "no I/O". When a job blocks on I/O, the scheduler should run another job, overlapping disk time with CPU time. Treating each CPU burst between I/Os as a separate short job makes interactive processes look short and keeps the disk busy.

Read OSTEP chapter 7, then use \`scheduler.py\` from the homework to compute metrics by hand before checking with the simulator. The point of the hand calculations is to internalise how arrival time and slice length interact.`,
          resources: [
            {
              title: 'OSTEP — Scheduling: Introduction (Chapter 7)',
              url: 'https://pages.cs.wisc.edu/~remzi/OSTEP/cpu-sched.pdf',
              type: 'textbook',
              cost: 'free',
              provider: 'OSTEP',
              primary: true,
            },
            {
              title: 'OSTEP homework: scheduler.py',
              url: 'https://github.com/remzi-arpacidusseau/ostep-homework/tree/master/cpu-sched',
              type: 'problem-set',
              cost: 'free',
              provider: 'OSTEP',
            },
            {
              title: 'Berkeley CS162 lecture notes on scheduling',
              url: 'https://cs162.org/',
              type: 'course',
              cost: 'free',
              provider: 'UC Berkeley',
              note: 'See the scheduling lectures; slides and recordings are public each semester.',
            },
          ],
          exercises: [
            {
              slug: 'scheduler-py-questions',
              title: 'Hand-compute then simulate',
              prompt:
                'Answer the seven questions in the OSTEP cpu-sched homework. For every scenario, compute average turnaround and response time by hand with a Gantt chart first, then verify with `scheduler.py -c`. Include the workload that makes SJF and FIFO equal and the one where RR with quantum 1 has the best response time.',
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'implement-simulator',
              title: 'Write your own scheduling simulator',
              prompt:
                'In Python or C, write a discrete-event simulator that takes a list of (arrival, length) jobs and a policy (FIFO, SJF, STCF, RR with quantum q) and outputs per-job turnaround and response times plus averages. Validate it against scheduler.py on three workloads, then generate 1000 random workloads and plot average turnaround vs average response for each policy.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Define turnaround and response time and explain why minimising one hurts the other.',
              answerOutline:
                'Turnaround: completion minus arrival; response: first run minus arrival. Short slices improve response but stretch every job\'s completion.',
            },
            {
              question: 'What is the convoy effect and which policy change removes it?',
              answerOutline:
                'Short jobs stuck behind a long one in FIFO; SJF/STCF (preemptive) runs the short ones first.',
            },
            {
              question: 'How should a scheduler treat a process that just issued a disk read?',
              answerOutline:
                'Mark it blocked, run another job in the meantime, treat each CPU burst as a short job so interactive jobs stay responsive.',
            },
          ],
        },
        {
          slug: 'multi-level-feedback-queue',
          title: 'The multi-level feedback queue',
          summary:
            'How a scheduler learns from the past to approximate SJF without knowing job lengths, and how it is gamed.',
          estimatedMinutes: 90,
          objectives: [
            'State the MLFQ rules and explain the purpose of each',
            'Explain how priority boost prevents starvation and how accounting prevents gaming',
            'Tune MLFQ parameters for a given workload using the simulator',
            'Relate MLFQ to real schedulers (Solaris TS, FreeBSD ULE, Windows)',
          ],
          concepts: [
            'Multiple queues with different priorities',
            'Learning job behaviour from history',
            'Rules 1-5 of MLFQ',
            'Starvation and priority boost',
            'Gaming the scheduler and better accounting',
            'Tuning: number of queues, slice per queue, boost period',
          ],
          explanation: `The MLFQ solves the core problem of scheduling: we want SJF-like turnaround and RR-like response, but we do not know job lengths. The idea is to **learn** from behaviour. Jobs start at the highest priority. A job that uses its entire time slice is probably CPU-bound, so it is demoted; a job that gives up the CPU early (to wait for I/O) is probably interactive and stays high.

OSTEP's final rule set is:

1. If Priority(A) > Priority(B), A runs.
2. Equal priority: round robin.
3. New jobs enter at the top queue.
4. Once a job uses up its allotment at a level (regardless of how many times it gave up the CPU), it drops one level.
5. After period $S$, all jobs move to the top queue.

Rule 4 in its naive form ("drop only if you use a whole slice") lets a job **game** the scheduler by issuing an I/O just before the slice ends; counting total allotment fixes this. Rule 5, the **priority boost**, prevents starvation of CPU-bound jobs when many interactive jobs exist, and also lets a job that changed behaviour recover. The parameters (queue count, slice length per queue, boost period) are *voodoo constants*; real systems expose them in tables or derive them from decay-usage formulas.

Work the chapter, then use \`mlfq.py\` to construct workloads that starve a job without boost, that game the scheduler with the naive rule 4, and that show why longer slices at low priority are reasonable.`,
          resources: [
            {
              title: 'OSTEP — Scheduling: The Multi-Level Feedback Queue (Chapter 8)',
              url: 'https://pages.cs.wisc.edu/~remzi/OSTEP/cpu-sched-mlfq.pdf',
              type: 'textbook',
              cost: 'free',
              provider: 'OSTEP',
              primary: true,
            },
            {
              title: 'OSTEP homework: mlfq.py',
              url: 'https://github.com/remzi-arpacidusseau/ostep-homework/tree/master/cpu-sched-mlfq',
              type: 'problem-set',
              cost: 'free',
              provider: 'OSTEP',
            },
            {
              title: 'The Linux CFS scheduler (kernel documentation)',
              url: 'https://docs.kernel.org/scheduler/sched-design-CFS.html',
              type: 'documentation',
              cost: 'free',
              provider: 'kernel.org',
              note: 'Compare a weighted-fair design with MLFQ after this lesson.',
            },
          ],
          exercises: [
            {
              slug: 'mlfq-homework',
              title: 'MLFQ simulator questions',
              prompt:
                'Complete the OSTEP mlfq.py homework. In particular: (a) build a workload where a long job starves without boost and show the boost fixes it; (b) show the gaming attack with -S and how allotment accounting defeats it; (c) reproduce the behaviour of a 2-queue scheduler with 10 ms and 20 ms slices and a 100 ms boost.',
              kind: 'simulation',
              difficulty: 2,
            },
            {
              slug: 'implement-mlfq',
              title: 'Add MLFQ to your simulator',
              prompt:
                'Extend the simulator from the previous lesson with MLFQ (configurable queues, slices, allotment, boost). Replay the workloads from the mlfq.py homework and show matching results. Then add 10 interactive jobs plus 2 CPU-bound jobs and plot response time of the interactive jobs as the boost period varies.',
              kind: 'coding',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'Why do new jobs start at the highest priority?',
              answerOutline:
                'Assume short/interactive until proven otherwise: a short job finishes quickly; a long job is demoted soon, approximating SJF.',
            },
            {
              question: 'What problem does the priority boost solve, and what does it cost?',
              answerOutline:
                'Starvation of low-priority CPU-bound jobs and stale classification; it costs response time for interactive jobs right after a boost.',
            },
            {
              question: 'How does a job game the naive MLFQ, and what is the fix?',
              answerOutline:
                'Yield just before the slice ends to stay high priority; fix is to account total CPU time at a level regardless of yields.',
            },
          ],
        },
        {
          slug: 'proportional-share-and-multiprocessor',
          title: 'Proportional share and multiprocessor scheduling',
          summary:
            'Lottery and stride scheduling, Linux CFS, and the cache-affinity and load-balancing problems of scheduling on many cores.',
          estimatedMinutes: 120,
          objectives: [
            'Implement lottery and stride scheduling and compare their fairness over time',
            'Explain how CFS uses virtual runtime and a red-black tree to approximate weighted fair sharing',
            'Explain cache affinity and why single-queue multiprocessor scheduling scales poorly',
            'Describe multi-queue scheduling and load balancing via migration and work stealing',
          ],
          concepts: [
            'Tickets and proportional share',
            'Lottery scheduling: randomness and its fairness over long runs',
            'Stride scheduling: deterministic proportional share',
            'Linux CFS: vruntime, sched_latency, min_granularity, nice weights',
            'Cache coherence and affinity',
            'Single-queue (SQMS) vs multi-queue (MQMS)',
            'Load imbalance and migration / work stealing',
          ],
          explanation: `Proportional-share schedulers guarantee each job a *fraction* of the CPU rather than optimising turnaround. **Lottery scheduling** gives each job tickets and draws a random winner each slice; it is trivially simple and probabilistically fair, with unfairness shrinking as runs get longer. **Stride scheduling** makes this deterministic: each job has a stride inversely proportional to its tickets and a pass counter; the job with the lowest pass runs and advances its pass by its stride. Stride is exactly fair but needs global state to handle new jobs, which is why Linux's **CFS** uses a related but more robust idea.

CFS tracks each task's **virtual runtime** and always runs the one with the smallest vruntime, stored in a red-black tree so selection is $O(\\log n)$. Nice values scale how fast vruntime grows, so a nice -5 task accumulates vruntime slowly and gets more CPU. Parameters like sched_latency and min_granularity trade fairness against context-switch overhead. Sleeping tasks get their vruntime set to the tree minimum on wake-up, so I/O-bound tasks are not unfairly punished and cannot gain a huge lead.

Multiprocessors add two problems. **Cache affinity**: moving a process between CPUs discards its warm cache. **Scalability**: a single shared run queue needs a lock every scheduling decision. Multi-queue schedulers keep per-CPU queues, which preserves affinity but creates **load imbalance**, fixed by periodic migration or **work stealing**. Read OSTEP chapters 9 and 10 and the kernel's CFS documentation, then do the lottery homework.`,
          resources: [
            {
              title: 'OSTEP — Scheduling: Proportional Share (Chapter 9)',
              url: 'https://pages.cs.wisc.edu/~remzi/OSTEP/cpu-sched-lottery.pdf',
              type: 'textbook',
              cost: 'free',
              provider: 'OSTEP',
              primary: true,
            },
            {
              title: 'OSTEP — Multiprocessor Scheduling (Chapter 10)',
              url: 'https://pages.cs.wisc.edu/~remzi/OSTEP/cpu-sched-multi.pdf',
              type: 'textbook',
              cost: 'free',
              provider: 'OSTEP',
            },
            {
              title: 'OSTEP homework: lottery.py',
              url: 'https://github.com/remzi-arpacidusseau/ostep-homework/tree/master/cpu-sched-lottery',
              type: 'problem-set',
              cost: 'free',
              provider: 'OSTEP',
            },
            {
              title: 'CFS Scheduler — Linux kernel documentation',
              url: 'https://docs.kernel.org/scheduler/sched-design-CFS.html',
              type: 'documentation',
              cost: 'free',
              provider: 'kernel.org',
            },
          ],
          exercises: [
            {
              slug: 'lottery-fairness',
              title: 'Lottery vs stride fairness',
              prompt:
                'Implement lottery and stride scheduling for two jobs with equal tickets and lengths. For job lengths 1, 10, 100, 1000, 10000 slices, run the lottery version 30 times and plot the fairness metric (completion time of the first job / completion time of the second). Show that stride is always exactly fair and explain why lottery converges.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'xv6-lottery-scheduler',
              title: 'Add a lottery scheduler to xv6',
              prompt:
                'Replace the xv6 round-robin scheduler with lottery scheduling: add a settickets() system call, a tickets field to struct proc, a pseudo-random generator in the kernel, and getpinfo() to read tick counts per process. Run three processes with 10, 20 and 30 tickets and plot ticks received over time; the slopes should be 1:2:3.',
              kind: 'coding',
              difficulty: 3,
              hint: 'This is the classic "scheduler" project from the OSTEP projects repo; follow its spec.',
            },
            {
              slug: 'affinity-experiment',
              title: 'Measure cache affinity',
              prompt:
                'Write a program that repeatedly walks a 4 MB array. Run it pinned to one core with taskset, then with a thread that migrates between cores every 10 ms using sched_setaffinity. Measure throughput in each case and explain the difference in terms of cache state.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What does CFS pick to run next, and how does nice affect it?',
              answerOutline:
                'The runnable task with the smallest vruntime; lower nice means a larger weight so vruntime advances more slowly and the task gets more CPU.',
            },
            {
              question: 'Why does a single-queue multiprocessor scheduler scale poorly?',
              answerOutline:
                'Every CPU contends for the queue lock and processes bounce between CPUs, losing cache affinity.',
            },
            {
              question: 'What is work stealing?',
              answerOutline:
                'An idle or lightly-loaded CPU peeks at another CPU\'s queue and migrates jobs to balance load.',
            },
          ],
        },
      ],
      project: {
        slug: 'scheduler-in-xv6',
        title: 'Module project: a configurable scheduler in xv6',
        description:
          'Implement MLFQ in xv6 with a priority boost and a system call to dump per-process scheduling statistics. Use the statistics to demonstrate the behaviour of interactive vs CPU-bound processes and compare response and turnaround time with the original round-robin scheduler.',
        deliverables: [
          'Modified xv6 kernel with MLFQ and getpinfo()',
          'User-level test programs that exercise CPU-bound and I/O-bound behaviour',
          'A short report with plots of ticks per queue over time',
        ],
        estimatedHours: 15,
      },
    },
    {
      slug: 'memory-virtualization',
      title: 'Memory Virtualization',
      description:
        'How each process gets a private address space: address translation, segmentation, paging, TLBs, multi-level page tables, swapping and page-replacement policies.',
      lessons: [
        {
          slug: 'address-spaces-and-memory-api',
          title: 'Address spaces and the memory API',
          summary:
            'The address-space abstraction, the goals of memory virtualization, and how malloc/free sit on top of the kernel.',
          estimatedMinutes: 90,
          objectives: [
            'Draw a process address space (code, heap, stack) and explain each region',
            'State the goals of memory virtualization: transparency, efficiency, protection',
            'Use malloc/free correctly and recognise the classic memory errors',
            'Explain the relationship between malloc, brk/sbrk and mmap',
          ],
          concepts: [
            'Address space: code, static data, heap, stack',
            'Virtual address vs physical address',
            'Transparency, efficiency, protection',
            'Stack (automatic) vs heap (explicit) allocation',
            'malloc, free, calloc, realloc; sizeof',
            'Memory errors: leak, dangling pointer, double free, buffer overflow',
            'brk/sbrk and mmap as the underlying system calls',
            'Tools: valgrind, AddressSanitizer',
          ],
          explanation: `Every address a program sees is **virtual**. The kernel, with the hardware's help, maps each process's addresses onto physical memory so that the process believes it owns a contiguous space starting at 0: code at the bottom, a heap growing up, a stack growing down from the top. This is the **address space** abstraction. The OS wants it to be **transparent** (programs do not notice), **efficient** (no large slowdown, little extra memory) and **protected** (a process cannot touch another's memory or the kernel's).

The memory API you use in C sits above the kernel. \`malloc\` and \`free\` are *library* functions managing a heap region that the library grows with \`brk\`/\`sbrk\` or \`mmap\`. The kernel knows nothing about individual objects, only about pages. This explains many surprises: freeing memory rarely returns it to the OS; a buffer overflow can corrupt the allocator's metadata; and the same virtual address can be printed by two processes.

The common errors are worth memorising because you will make all of them: forgetting to allocate (writing through an uninitialised pointer), under-allocating (\`strlen\` without the null byte), using memory after free, double free, leaking, and \`free\` on a non-heap pointer. **valgrind** and **AddressSanitizer** (\`-fsanitize=address\`) catch most of them; make running them a habit.

Read OSTEP chapters 13 and 14 and do the C homework, which has you deliberately write each bug and observe what the tools report.`,
          resources: [
            {
              title: 'OSTEP — The Abstraction: Address Spaces (Chapter 13)',
              url: 'https://pages.cs.wisc.edu/~remzi/OSTEP/vm-intro.pdf',
              type: 'textbook',
              cost: 'free',
              provider: 'OSTEP',
              primary: true,
            },
            {
              title: 'OSTEP — Interlude: Memory API (Chapter 14)',
              url: 'https://pages.cs.wisc.edu/~remzi/OSTEP/vm-api.pdf',
              type: 'textbook',
              cost: 'free',
              provider: 'OSTEP',
            },
            {
              title: 'OSTEP homework: vm-api (null, memory-leak, buffer overflow with valgrind)',
              url: 'https://github.com/remzi-arpacidusseau/ostep-homework',
              type: 'problem-set',
              cost: 'free',
              provider: 'OSTEP',
            },
            {
              title: 'Valgrind quick start',
              url: 'https://valgrind.org/docs/manual/quick-start.html',
              type: 'documentation',
              cost: 'free',
              provider: 'Valgrind',
            },
          ],
          exercises: [
            {
              slug: 'memory-bugs-lab',
              title: 'Write every memory bug on purpose',
              prompt:
                'Following the OSTEP vm-api homework, write six small programs: null dereference, leak, use-after-free, buffer overflow by one, free of a non-heap pointer, and double free. Run each under gdb, valgrind and AddressSanitizer. Make a table: which tool catches which bug, and what the message says.',
              kind: 'coding',
              difficulty: 1,
            },
            {
              slug: 'observe-heap-growth',
              title: 'Watch the heap grow',
              prompt:
                'Write a program that mallocs 1 KB blocks in a loop, printing the returned address and the result of sbrk(0) every 100 allocations. Then switch to 1 MB blocks. Use strace to see when brk and mmap are called and explain the threshold behaviour of glibc malloc.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What are the three goals of memory virtualization?',
              answerOutline: 'Transparency, efficiency (time and space), protection/isolation.',
            },
            {
              question: 'Is malloc a system call? What system calls does it use?',
              answerOutline:
                'No, it is a library function; it obtains memory from the kernel via brk/sbrk for small requests and mmap for large ones.',
            },
            {
              question: 'Why can two processes print the same pointer value for different memory?',
              answerOutline:
                'Each has its own virtual address space; the same virtual address maps to different physical frames.',
            },
          ],
        },
        {
          slug: 'address-translation-and-segmentation',
          title: 'Address translation and segmentation',
          summary:
            'Hardware-based translation from base-and-bounds to segmentation, and the free-space management problem it creates.',
          estimatedMinutes: 90,
          objectives: [
            'Translate virtual to physical addresses with base-and-bounds and with segmentation',
            'Explain what the MMU does on every memory access and what the OS does on a fault',
            'Explain internal vs external fragmentation',
            'Describe free-list strategies (first/best/worst fit, buddy) and their trade-offs',
          ],
          concepts: [
            'Hardware-based address translation; the MMU',
            'Base and bounds registers; dynamic relocation',
            'Segmentation: per-segment base/bounds, segment selector bits',
            'Protection bits, growth direction',
            'Segmentation fault',
            'External and internal fragmentation',
            'Free-space management: splitting, coalescing, headers, fit policies',
            'Buddy allocation and slab allocators',
          ],
          explanation: `The simplest translation is **base and bounds**: the MMU adds a base register to every virtual address and faults if the address exceeds the bounds. The OS sets these registers on each context switch and can relocate a process by copying it and changing the base. This gives transparency and protection cheaply, but wastes memory: the space between heap and stack is allocated even though it is unused.

**Segmentation** generalises to one base/bounds pair per logical segment (code, heap, stack). The top bits of a virtual address select the segment; the rest is an offset checked against the bound. Segments can grow in different directions, carry protection bits (read/execute code can be shared between processes) and be placed independently in physical memory. The term *segmentation fault* survives from this era.

Segmentation creates **external fragmentation**: variable-sized holes in physical memory that may not fit a new segment even when total free space suffices. This is the free-space management problem, which is the same one malloc faces in the heap. OSTEP chapter 17 covers the mechanisms (headers, free lists, splitting and coalescing) and policies (best, worst, first, next fit; segregated lists; buddy systems). Paging, in the next lesson, removes external fragmentation by using fixed-size units at the cost of some internal fragmentation.

Read chapters 15, 16 and 17 and run the \`relocation.py\`, \`segmentation.py\` and \`malloc.py\` simulators.`,
          resources: [
            {
              title: 'OSTEP — Mechanism: Address Translation (Chapter 15)',
              url: 'https://pages.cs.wisc.edu/~remzi/OSTEP/vm-mechanism.pdf',
              type: 'textbook',
              cost: 'free',
              provider: 'OSTEP',
              primary: true,
            },
            {
              title: 'OSTEP — Segmentation (Chapter 16)',
              url: 'https://pages.cs.wisc.edu/~remzi/OSTEP/vm-segmentation.pdf',
              type: 'textbook',
              cost: 'free',
              provider: 'OSTEP',
            },
            {
              title: 'OSTEP — Free-Space Management (Chapter 17)',
              url: 'https://pages.cs.wisc.edu/~remzi/OSTEP/vm-freespace.pdf',
              type: 'textbook',
              cost: 'free',
              provider: 'OSTEP',
            },
            {
              title: 'CS:APP Malloc Lab (CMU 15-213)',
              url: 'http://csapp.cs.cmu.edu/3e/labs.html',
              type: 'problem-set',
              cost: 'free',
              provider: 'Carnegie Mellon',
              note: 'The classic allocator lab; the writeup and starter code are public.',
            },
          ],
          exercises: [
            {
              slug: 'translation-simulators',
              title: 'Relocation and segmentation simulators',
              prompt:
                'Complete the OSTEP homework for relocation.py (chapter 15) and segmentation.py (chapter 16). For the segmentation questions, compute every translation by hand first, including the stack segment that grows downward, and record the highest legal address of each segment.',
              kind: 'simulation',
              difficulty: 1,
            },
            {
              slug: 'write-malloc',
              title: 'Write your own malloc',
              prompt:
                'Implement malloc/free/realloc using an explicit free list with headers, splitting and coalescing, selectable first/best/worst fit. Test with the CS:APP Malloc Lab traces (or your own random workloads). Measure utilisation and throughput for each fit policy and write up which is best and why.',
              kind: 'coding',
              difficulty: 3,
              hint: 'Start with an implicit list and a bump pointer, get it correct under AddressSanitizer, then add the explicit free list.',
            },
          ],
          selfAssessment: [
            {
              question: 'What does the hardware check and compute on every access under base and bounds?',
              answerOutline:
                'Checks virtual address < bounds (else fault) and computes physical = virtual + base.',
            },
            {
              question: 'Why does segmentation lead to external fragmentation?',
              answerOutline:
                'Segments are variable-sized and placed contiguously, leaving holes of odd sizes that may not fit future requests.',
            },
            {
              question: 'What is coalescing and why is it needed?',
              answerOutline:
                'Merging adjacent free chunks on free() so large requests can be satisfied; without it the free list fragments into small pieces.',
            },
          ],
        },
        {
          slug: 'paging-and-tlbs',
          title: 'Paging and translation lookaside buffers',
          summary:
            'Fixed-size pages, page tables and page-table entries, and the TLB that makes paging fast enough to use.',
          estimatedMinutes: 120,
          objectives: [
            'Translate an address with a linear page table and compute the table size for given parameters',
            'Decode a page-table entry (valid, protection, present, dirty, accessed bits)',
            'Explain the TLB hit/miss path and why spatial and temporal locality make it work',
            'Compare hardware-managed and software-managed TLBs and explain context-switch handling (flush vs ASID)',
          ],
          concepts: [
            'Page, page frame, virtual page number (VPN), offset',
            'Linear page table and page-table base register',
            'Page-table entry bits: valid, protection, present, dirty, reference',
            'The two memory accesses per load problem',
            'TLB: hit, miss, locality',
            'Hardware-managed vs software-managed TLB',
            'TLB flush on context switch; address space identifiers',
            'TLB replacement (LRU, random) and coverage',
          ],
          explanation: `**Paging** divides the address space into fixed-size **pages** (typically 4 KB) and physical memory into **page frames** of the same size. A virtual address splits into a **virtual page number** and an **offset**; a per-process **page table** maps VPN to physical frame number, and the offset is copied through. Because any page can go in any frame, there is no external fragmentation and allocation is trivial.

The cost is that the page table is large and lives in memory. A 32-bit space with 4 KB pages has $2^{20}$ entries; at 4 bytes each that is 4 MB *per process*. Worse, every memory reference now needs an *extra* memory access to read the PTE. Both problems are addressed in turn: the **TLB** fixes speed, multi-level tables fix size (next lesson).

The **translation lookaside buffer** is a small, fully-associative cache of recent translations inside the MMU. On a hit the translation is free; on a miss, either hardware walks the page table (x86) or the OS handles a trap and fills the TLB itself (MIPS, some RISC-V designs). Locality makes hit rates very high: a loop over an array touches many addresses on the same page. OSTEP's example of a 10-element int array across pages gives a concrete 70% hit rate on the first pass and 100% afterward.

Context switches are the remaining problem: another process's translations are wrong. Either flush the TLB (costly misses afterward) or tag entries with an **address space identifier**. Read chapters 18 and 19, then measure your own machine's TLB in the \`tlb.c\` homework; the knee in the graph reveals the TLB size.`,
          resources: [
            {
              title: 'OSTEP — Paging: Introduction (Chapter 18)',
              url: 'https://pages.cs.wisc.edu/~remzi/OSTEP/vm-paging.pdf',
              type: 'textbook',
              cost: 'free',
              provider: 'OSTEP',
              primary: true,
            },
            {
              title: 'OSTEP — Paging: Faster Translations (TLBs) (Chapter 19)',
              url: 'https://pages.cs.wisc.edu/~remzi/OSTEP/vm-tlbs.pdf',
              type: 'textbook',
              cost: 'free',
              provider: 'OSTEP',
            },
            {
              title: 'OSTEP homework: paging-linear-translate.py and tlb.c',
              url: 'https://github.com/remzi-arpacidusseau/ostep-homework',
              type: 'problem-set',
              cost: 'free',
              provider: 'OSTEP',
            },
            {
              title: 'What Every Programmer Should Know About Memory (Ulrich Drepper)',
              url: 'https://people.freebsd.org/~lstewart/articles/cpumemory.pdf',
              type: 'article',
              cost: 'free',
              note: 'Section 4 on virtual memory and TLBs; the rest is a superb reference on caches.',
            },
          ],
          exercises: [
            {
              slug: 'linear-translate',
              title: 'Linear page-table translations',
              prompt:
                'Do the OSTEP vm-paging homework with paging-linear-translate.py. Compute by hand: page-table size for address spaces of 1 KB to 1 GB with 1 KB to 1 MB pages, and translations for several (address, page table) pairs. Explain how the fraction of valid pages affects the usefulness of a linear table.',
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'measure-tlb',
              title: 'Measure your TLB',
              prompt:
                'Write tlb.c as described in OSTEP chapter 19 homework: touch one int per page over N pages, many times, and measure the average time per access as N grows from 1 to 4096 pages. Pin to one CPU, prevent compiler optimisation from removing the loop, and plot time vs pages. Identify the L1 TLB size, the L2 TLB size and the point where page-table walks miss the cache.',
              kind: 'coding',
              difficulty: 2,
              hint: 'Use a volatile accumulator or print a checksum so the loop is not optimised away; use clock_gettime with CLOCK_MONOTONIC.',
            },
          ],
          selfAssessment: [
            {
              question: 'For a 32-bit address space with 4 KB pages, how many bits are the VPN and offset, and how many PTEs exist?',
              answerOutline: 'Offset 12 bits, VPN 20 bits, 2^20 = 1,048,576 entries.',
            },
            {
              question: 'What does the TLB cache, and why does array iteration hit so often?',
              answerOutline:
                'VPN to PFN translations (plus protection bits). Consecutive elements share a page, so only the first access to each page misses.',
            },
            {
              question: 'What are the two ways to handle the TLB on a context switch?',
              answerOutline:
                'Flush it (set all valid bits to 0), or tag entries with an ASID so entries from several processes can coexist.',
            },
          ],
        },
        {
          slug: 'multi-level-page-tables',
          title: 'Smaller page tables: multi-level paging',
          summary:
            'Why linear page tables are too big and how multi-level page tables, inverted tables and larger pages fix it, with RISC-V Sv39 as the running example.',
          estimatedMinutes: 90,
          objectives: [
            'Explain why page tables are large and what bigger pages or hybrid segmentation/paging trade off',
            'Translate an address through a two- or three-level page table step by step',
            'Read RISC-V Sv39 page tables in xv6 (walk(), mappages(), kvmmap())',
            'Compute the memory cost and the extra memory accesses of a multi-level table',
          ],
          concepts: [
            'Page directory, page directory entry (PDE)',
            'Multi-level translation and the time/space trade-off',
            'Sv39: 3 levels, 9 bits each, 4 KB pages, 512 PTEs per page',
            'Inverted page tables',
            'Large pages / huge pages',
            'Swapping page tables to disk',
            'xv6 walk(), mappages(), the kernel page table',
          ],
          explanation: `A linear page table reserves an entry for every virtual page, used or not. A **multi-level page table** chops it into page-sized pieces and adds a **page directory** that points only to the pieces that contain valid entries. Unused regions of the address space cost nothing; the table is itself paged, so it needs no contiguous physical memory. The price is extra memory accesses on a TLB miss: one per level.

The running example in this subject is **RISC-V Sv39**, used by xv6: 39-bit virtual addresses, 4 KB pages, three levels of 9 bits each. A level-2 table page holds 512 entries, each covering 1 GB; level-1 entries cover 2 MB; level-0 entries cover 4 KB. The **satp** register holds the root. xv6's \`walk()\` in \`kernel/vm.c\` is the software version of the hardware walk: 20 lines that extract each 9-bit index, follow or allocate the next page and return a pointer to the final PTE. Reading it after OSTEP chapter 20 makes the chapter concrete.

Two more size strategies exist. **Inverted page tables** keep one entry per physical frame, found with a hash; they are compact but need a hash lookup per miss. **Huge pages** (2 MB or 1 GB) reduce both table size and TLB pressure for large workloads such as databases, at the cost of internal fragmentation.

Do the \`paging-multilevel-translate.py\` homework, then trace a real translation in xv6 with \`vmprint\` from the MIT page-table lab.`,
          resources: [
            {
              title: 'OSTEP — Paging: Smaller Tables (Chapter 20)',
              url: 'https://pages.cs.wisc.edu/~remzi/OSTEP/vm-smalltables.pdf',
              type: 'textbook',
              cost: 'free',
              provider: 'OSTEP',
              primary: true,
            },
            {
              title: 'xv6 book — Chapter 3: Page tables',
              url: 'https://pdos.csail.mit.edu/6.828/2023/xv6/book-riscv-rev3.pdf',
              type: 'textbook',
              cost: 'free',
              provider: 'MIT',
            },
            {
              title: 'MIT 6.1810 Lab: page tables',
              url: 'https://pdos.csail.mit.edu/6.828/2023/labs/pgtbl.html',
              type: 'problem-set',
              cost: 'free',
              provider: 'MIT',
            },
            {
              title: 'OSTEP homework: paging-multilevel-translate.py',
              url: 'https://github.com/remzi-arpacidusseau/ostep-homework/tree/master/vm-smalltables',
              type: 'problem-set',
              cost: 'free',
              provider: 'OSTEP',
            },
          ],
          exercises: [
            {
              slug: 'multilevel-translate',
              title: 'Multi-level translations by hand',
              prompt:
                'Complete the OSTEP vm-smalltables homework: translate each given virtual address through the two-level table dumped by the simulator, showing the PDE lookup, the PTE lookup and the final physical address or fault. Then answer: how many memory accesses does a TLB miss cost in this scheme?',
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'xv6-pgtbl-lab',
              title: 'xv6 page-table lab',
              prompt:
                'Complete the MIT 6.1810 page-table lab: implement vmprint() to print a process\'s page table tree, then add the per-process USYSCALL shared page (or the lab\'s current speed-up exercise) and the pgaccess() system call that reports which pages were accessed using the PTE_A bit. Pass the grading script.',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'huge-pages-experiment',
              title: 'Huge pages experiment',
              prompt:
                'On Linux, allocate a 1 GB array with mmap and walk it with a stride of 4 KB, timing the loop. Repeat with madvise(MADV_HUGEPAGE) (transparent huge pages enabled). Compare runtime and TLB-miss counts using `perf stat -e dTLB-load-misses`. Explain the result in terms of TLB reach.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why is a multi-level page table smaller than a linear one for a typical process?',
              answerOutline:
                'Only page-table pages that contain at least one valid mapping are allocated; the huge empty gap between heap and stack costs nothing.',
            },
            {
              question: 'In Sv39, how is a 39-bit virtual address split?',
              answerOutline:
                'Three 9-bit indexes (L2, L1, L0) and a 12-bit page offset.',
            },
            {
              question: 'What is the downside of multi-level tables?',
              answerOutline:
                'A TLB miss costs one memory access per level (three in Sv39) and the walk logic is more complex.',
            },
          ],
        },
        {
          slug: 'swapping-and-page-replacement',
          title: 'Beyond physical memory: swapping and replacement policies',
          summary:
            'Using disk as backing store, the page-fault path, and the replacement policies (FIFO, LRU, clock) that decide what to evict.',
          estimatedMinutes: 120,
          objectives: [
            'Describe the page-fault path from a TLB miss to a disk read and retry',
            'Compute average memory access time as a function of miss rate and explain why miss rates must be tiny',
            'Simulate FIFO, random, LRU, optimal and clock on reference strings and explain Belady\'s anomaly',
            'Explain how the OS approximates LRU with reference bits, and what thrashing is',
          ],
          concepts: [
            'Swap space, present bit, page fault',
            'Page-fault handler and the retry',
            'Average memory access time (AMAT)',
            'Optimal (Belady), FIFO, random, LRU',
            'Belady\'s anomaly and stack properties',
            'Clock algorithm and the reference bit; dirty bit',
            'Prefetching and clustering writes',
            'Thrashing and admission control; high/low watermarks',
          ],
          explanation: `With a **present bit** in each PTE, the OS can keep some pages on disk in **swap space**. Accessing such a page raises a **page fault**: the OS finds the page on disk, picks a frame (evicting another page if needed), reads the page in, updates the PTE and retries the instruction. The process blocks for the duration of the disk read, and the scheduler runs something else.

The economics are brutal. If memory takes 100 ns and disk 10 ms, then

$$\\text{AMAT} = T_M + P_{miss} \\cdot T_D$$

means a 0.1% miss rate already gives 10 µs per access, a 100x slowdown. The **replacement policy** therefore matters enormously. **Optimal** (evict the page used furthest in the future) is the lower bound for comparison. **FIFO** is simple but can suffer **Belady's anomaly** (more memory, more misses). **LRU** exploits temporal locality and behaves as a stack algorithm, but true LRU needs per-access bookkeeping that is too expensive. The **clock algorithm** approximates it with the hardware **reference bit**: sweep a hand around frames, clearing bits and evicting the first page whose bit is already clear. Preferring clean pages (dirty bit) avoids a write-back before the read-in.

Real systems also **prefetch** pages likely to be needed, cluster writes to swap, keep a free pool via a background daemon with low/high watermarks, and under **thrashing** (working sets exceed memory) either swap out whole processes or kill one. Read chapters 21 and 22 and run \`paging-policy.py\`.`,
          resources: [
            {
              title: 'OSTEP — Beyond Physical Memory: Mechanisms (Chapter 21)',
              url: 'https://pages.cs.wisc.edu/~remzi/OSTEP/vm-beyondphys.pdf',
              type: 'textbook',
              cost: 'free',
              provider: 'OSTEP',
              primary: true,
            },
            {
              title: 'OSTEP — Beyond Physical Memory: Policies (Chapter 22)',
              url: 'https://pages.cs.wisc.edu/~remzi/OSTEP/vm-beyondphys-policy.pdf',
              type: 'textbook',
              cost: 'free',
              provider: 'OSTEP',
            },
            {
              title: 'OSTEP homework: paging-policy.py',
              url: 'https://github.com/remzi-arpacidusseau/ostep-homework/tree/master/vm-beyondphys-policy',
              type: 'problem-set',
              cost: 'free',
              provider: 'OSTEP',
            },
            {
              title: 'MIT 6.1810 Lab: copy-on-write fork',
              url: 'https://pdos.csail.mit.edu/6.828/2023/labs/cow.html',
              type: 'problem-set',
              cost: 'free',
              provider: 'MIT',
              note: 'The page-fault handler in practice: implement COW fork in xv6.',
            },
          ],
          exercises: [
            {
              slug: 'policy-simulator',
              title: 'Replacement policy simulator',
              prompt:
                'Write a simulator that takes a reference string and cache size and reports hit rate for OPT, FIFO, random, LRU and clock. Validate against paging-policy.py. Then generate three workloads (uniform random, 80-20 skewed, sequential loop larger than the cache) and plot hit rate vs cache size for every policy. Find a reference string that shows Belady\'s anomaly for FIFO.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'xv6-cow-lab',
              title: 'Copy-on-write fork in xv6',
              prompt:
                'Complete the MIT copy-on-write lab: make fork() share pages read-only with a reference count, catch the write fault in usertrap(), copy the page and remap it writable. Pass cowtest and usertests. Measure fork+exit time before and after for a process with a 64 MB heap.',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'amat-calc',
              title: 'AMAT calculations',
              prompt:
                'Memory access = 100 ns, SSD page read = 100 µs, HDD = 10 ms. For miss rates of 10%, 1%, 0.1%, 0.01% compute AMAT for both devices. At what miss rate does an SSD-backed system run within 2x of in-memory speed? What does this imply about how much of the working set must fit in RAM?',
              kind: 'problem',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'List the steps the OS takes on a page fault.',
              answerOutline:
                'Trap to handler; look up disk address in PTE; if no free frame, run replacement (write back if dirty); issue disk read; block process; on completion update PTE (present, PFN); retry instruction (TLB miss then hit).',
            },
            {
              question: 'Why does the clock algorithm approximate LRU and what hardware support does it need?',
              answerOutline:
                'Reference bit set by hardware on access; the sweeping hand clears bits and evicts pages not touched since the last sweep, i.e. roughly least recently used.',
            },
            {
              question: 'What is thrashing and what are two responses to it?',
              answerOutline:
                'Working sets exceed memory so the system spends its time paging; responses: admission control (swap out some processes entirely) or an out-of-memory killer.',
            },
          ],
        },
      ],
      project: {
        slug: 'xv6-lazy-allocation',
        title: 'Module project: lazy allocation and mmap in xv6',
        description:
          'Make xv6 allocate heap pages lazily on first touch, then implement a simplified mmap()/munmap() for file-backed memory. This combines the page-fault handler, page-table manipulation and the file system.',
        deliverables: [
          'Lazy sbrk that passes the MIT lazy-allocation tests',
          'mmap/munmap supporting MAP_PRIVATE and MAP_SHARED with write-back on unmap',
          'A short writeup of the page-fault paths added and the edge cases handled (fork, exit, invalid addresses)',
        ],
        estimatedHours: 20,
        stretchGoals: ['Add demand paging of the executable itself so large programs start instantly'],
      },
    },
    {
      slug: 'concurrency',
      title: 'Concurrency',
      description:
        'Threads, race conditions, and the synchronisation primitives (locks, condition variables, semaphores) that make shared-memory programs correct and fast.',
      lessons: [
        {
          slug: 'threads-and-races',
          title: 'Threads, race conditions and atomicity',
          summary:
            'What a thread is, why shared data breaks without synchronisation, and the vocabulary of critical sections and mutual exclusion.',
          estimatedMinutes: 90,
          objectives: [
            'Explain what a thread shares with its siblings and what it owns',
            'Show, at the instruction level, how a race condition loses updates',
            'Define critical section, mutual exclusion, atomicity and indeterminacy',
            'Use pthread_create/join and reproduce a race in C',
          ],
          concepts: [
            'Thread: shared address space, private stack and registers',
            'Why threads: parallelism and avoiding I/O blocking',
            'Race condition and data race',
            'Critical section, mutual exclusion',
            'Atomic instructions; uncontrolled scheduling',
            'Indeterminate results',
            'pthread_create, pthread_join',
          ],
          explanation: `A **thread** is like a process but shares the address space with other threads of the same process. Each thread has its own program counter, registers and **stack**; everything else, including the heap and global variables, is shared. Threads exist for **parallelism** (use many cores on one job) and to **avoid blocking** (while one thread waits for I/O, others run).

Sharing is the danger. \`counter++\` compiles to load, add, store. If two threads execute these three instructions interleaved, a timer interrupt between the load and the store makes one update vanish. OSTEP walks through this precisely with x86 assembly; reproduce it yourself with \`objdump\` so you believe it. The result is a **race condition**: output depends on timing. The code that touches the shared variable is a **critical section**, and what we want is **mutual exclusion**: at most one thread inside at a time, so the section becomes **atomic** from every other thread's viewpoint.

Hardware cannot make arbitrary code atomic, but it provides atomic *instructions* from which the OS and libraries build **locks**. The next lessons cover these; here the goal is to see the problem clearly, write threads with the pthread API, and learn to recognise the symptoms of races: results that change run to run and heisenbugs that vanish under the debugger.

Read OSTEP chapters 26 and 27 and do the C homework in \`threads-intro\`, which uses \`x86.py\` to step through interleavings by hand.`,
          resources: [
            {
              title: 'OSTEP — Concurrency: An Introduction (Chapter 26)',
              url: 'https://pages.cs.wisc.edu/~remzi/OSTEP/threads-intro.pdf',
              type: 'textbook',
              cost: 'free',
              provider: 'OSTEP',
              primary: true,
            },
            {
              title: 'OSTEP — Interlude: Thread API (Chapter 27)',
              url: 'https://pages.cs.wisc.edu/~remzi/OSTEP/threads-api.pdf',
              type: 'textbook',
              cost: 'free',
              provider: 'OSTEP',
            },
            {
              title: 'OSTEP homework: threads-intro (x86.py interleaving simulator)',
              url: 'https://github.com/remzi-arpacidusseau/ostep-homework/tree/master/threads-intro',
              type: 'problem-set',
              cost: 'free',
              provider: 'OSTEP',
            },
            {
              title: 'POSIX threads programming (LLNL tutorial)',
              url: 'https://hpc-tutorials.llnl.gov/posix/',
              type: 'article',
              cost: 'free',
              provider: 'Lawrence Livermore National Laboratory',
            },
          ],
          exercises: [
            {
              slug: 'x86-interleavings',
              title: 'Step through interleavings',
              prompt:
                'Complete the OSTEP threads-intro homework using x86.py: run loop.s, looping-race-nolock.s and wait-for-me.s with different interrupt intervals and random seeds. For each, predict the final value of the shared variable, then verify. Identify the exact instruction boundary where an interrupt causes a lost update.',
              kind: 'simulation',
              difficulty: 1,
            },
            {
              slug: 'race-in-c',
              title: 'Reproduce and detect a race in C',
              prompt:
                'Write a program with two pthreads incrementing a shared counter 10 million times each. Run it 20 times and record the results. Compile with -O0 and -O2 and explain any difference using objdump -d. Then run it under ThreadSanitizer (-fsanitize=thread) and read the report.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'thread-vs-process',
              title: 'Threads vs processes',
              prompt:
                'Write a one-page comparison of threads and processes: what is shared, creation cost (measure both with clock_gettime), failure isolation, and when you would pick each. Include the numbers you measured.',
              kind: 'writing',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'Which parts of a process do threads share and which are private?',
              answerOutline:
                'Shared: address space (code, heap, globals), open files. Private: registers, PC, stack (and thread-local storage).',
            },
            {
              question: 'Why does counter++ lose updates with two threads?',
              answerOutline:
                'It is three instructions; if both threads load the same old value before either stores, one increment is overwritten.',
            },
            {
              question: 'What does "atomic" mean for a critical section?',
              answerOutline:
                'Executes as an indivisible unit from the perspective of other threads: all or nothing, no interleaving observed.',
            },
          ],
        },
        {
          slug: 'locks',
          title: 'Locks: building mutual exclusion',
          summary:
            'How locks are built from atomic instructions, why spinning is wasteful, and how OS support (queues, futexes) produces efficient mutexes.',
          estimatedMinutes: 120,
          objectives: [
            'Explain why disabling interrupts and the naive flag lock fail',
            'Build a spin lock with test-and-set, compare-and-swap, or fetch-and-add (ticket lock) and argue its correctness',
            'Evaluate a lock on correctness, fairness and performance',
            'Explain how park/unpark, Linux futexes and two-phase locks avoid wasted spinning',
          ],
          concepts: [
            'Lock, mutex, lock holder',
            'Disabling interrupts as a (bad) lock',
            'Test-and-set, compare-and-swap, load-linked/store-conditional, fetch-and-add',
            'Spin lock; ticket lock and fairness',
            'Evaluation: correctness, fairness, performance',
            'Yielding, queues, park/unpark, priority inversion',
            'Linux futex; two-phase locks',
            'Lock-based concurrent data structures; coarse vs fine-grained locking',
          ],
          explanation: `A **lock** turns a critical section into an atomic one: \`lock(&m); counter++; unlock(&m);\`. Building one is harder than it looks. Disabling interrupts works only on one CPU and trusts user code. A plain flag variable fails because *checking* the flag and *setting* it are separate instructions, so two threads can both see it clear.

The fix is an atomic read-modify-write instruction. **Test-and-set** returns the old value and writes a new one atomically; a lock is "spin while test-and-set(flag, 1) returns 1". **Compare-and-swap** is more general and enables lock-free algorithms. **Fetch-and-add** gives the **ticket lock**: take a ticket, wait for your turn; unlike test-and-set it is fair (no starvation). Evaluate every lock on three axes: **correctness** (mutual exclusion), **fairness** and **performance** (uncontended cost, and behaviour on one vs many CPUs).

Spinning wastes a whole time slice if the holder is descheduled. Better: **yield** when the lock is busy, or better still **park** the thread on a queue and have unlock **unpark** the next one, guarded by a small spin lock on the queue and a "setpark" trick to avoid a lost wakeup. Linux exposes this as **futex**: fast user-space path when uncontended, system call only when contended. Real mutexes are **two-phase**: spin briefly, then sleep.

Chapters 28 and 29 cover locks and their use in counters, lists, queues and hash tables; the **sloppy counter** shows how fine-grained design trades precision for scalability. Measure it yourself in the exercises.`,
          resources: [
            {
              title: 'OSTEP — Locks (Chapter 28)',
              url: 'https://pages.cs.wisc.edu/~remzi/OSTEP/threads-locks.pdf',
              type: 'textbook',
              cost: 'free',
              provider: 'OSTEP',
              primary: true,
            },
            {
              title: 'OSTEP — Lock-based Concurrent Data Structures (Chapter 29)',
              url: 'https://pages.cs.wisc.edu/~remzi/OSTEP/threads-locks-usage.pdf',
              type: 'textbook',
              cost: 'free',
              provider: 'OSTEP',
            },
            {
              title: 'OSTEP homework: threads-locks (x86.py lock implementations)',
              url: 'https://github.com/remzi-arpacidusseau/ostep-homework/tree/master/threads-locks',
              type: 'problem-set',
              cost: 'free',
              provider: 'OSTEP',
            },
            {
              title: 'Futexes Are Tricky (Ulrich Drepper)',
              url: 'https://www.akkadia.org/drepper/futex.pdf',
              type: 'article',
              cost: 'free',
              note: 'The definitive account of building a mutex on futex; read after the chapter.',
            },
            {
              title: 'MIT 6.1810 Lab: locks (memory allocator and buffer cache)',
              url: 'https://pdos.csail.mit.edu/6.828/2023/labs/lock.html',
              type: 'problem-set',
              cost: 'free',
              provider: 'MIT',
            },
          ],
          exercises: [
            {
              slug: 'build-spinlocks',
              title: 'Build three spin locks',
              prompt:
                'Using GCC atomic builtins (__atomic_test_and_set, __atomic_compare_exchange, __atomic_fetch_add), implement a test-and-set lock, a CAS lock and a ticket lock. Write a benchmark where N threads (1, 2, 4, 8, 16) each acquire the lock 1 million times. Plot throughput vs thread count and the per-thread acquisition count distribution, and comment on fairness.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'sloppy-counter',
              title: 'Precise vs sloppy counter',
              prompt:
                'Implement a precise counter (one global lock) and an approximate/sloppy counter (per-CPU local counts with threshold S). Measure time for 4 threads to perform 1 million increments each, for S = 1, 2, 4, ..., 1024. Reproduce the scalability graph from OSTEP chapter 29 and explain the trade-off.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'xv6-lock-lab',
              title: 'xv6 lock lab',
              prompt:
                'Complete the MIT lock lab: give kalloc() a per-CPU free list with stealing, and turn the buffer cache into a hash table with per-bucket locks. Use the lab\'s lock-contention statistics to show the reduction in contention and pass the tests.',
              kind: 'coding',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does a plain flag variable fail as a lock?',
              answerOutline:
                'Test and set are separate instructions; an interrupt between them lets two threads both see flag==0 and both enter.',
            },
            {
              question: 'What makes a ticket lock fair when a test-and-set lock is not?',
              answerOutline:
                'Fetch-and-add hands out tickets in order; each thread is guaranteed to get the lock after the ones before it.',
            },
            {
              question: 'What is the lost-wakeup problem with park/unpark and how is it fixed?',
              answerOutline:
                'A thread may be about to park when unlock calls unpark, so the unpark is lost and the thread sleeps forever; setpark() tells the system a park is imminent so a following unpark cancels it.',
            },
          ],
        },
        {
          slug: 'condition-variables-and-semaphores',
          title: 'Condition variables and semaphores',
          summary:
            'Waiting for state changes correctly: condition variables, the producer/consumer problem, and semaphores as a unifying primitive.',
          estimatedMinutes: 120,
          objectives: [
            'Use condition variables correctly: always hold the lock, always wait in a while loop',
            'Solve producer/consumer with a bounded buffer and explain the Mesa-semantics pitfalls',
            'Explain semaphores and implement locks, condition variables and ordering with them',
            'Solve the reader-writer and dining-philosophers problems and explain starvation',
          ],
          concepts: [
            'Condition variable: wait, signal, broadcast',
            'Mesa vs Hoare semantics; the while-loop rule',
            'Producer/consumer (bounded buffer)',
            'Covering conditions and broadcast',
            'Semaphore: sem_wait, sem_post, initial value',
            'Binary semaphore as lock; semaphore for ordering',
            'Reader-writer locks and writer starvation',
            'Dining philosophers and deadlock avoidance by ordering',
          ],
          explanation: `Locks protect data; **condition variables** let a thread sleep until some *condition* holds. A thread checks the condition, and if false calls \`wait(cv, lock)\`, which atomically releases the lock and sleeps; a thread that changes the condition calls \`signal(cv)\` to wake one waiter. Two rules prevent almost every bug: **always hold the lock when waiting or signalling**, and **always check the condition in a \`while\` loop**. The loop is needed because of **Mesa semantics**: being woken is only a hint; by the time you run, another thread may have consumed the item.

The canonical problem is **producer/consumer** with a bounded buffer. OSTEP builds the solution in stages, each fixing a real bug: a single condition variable with an \`if\` lets a consumer wake another consumer and both find an empty buffer; two condition variables (\`empty\`, \`fill\`) and \`while\` loops fix it. When a waiter cannot know which waiting thread should wake, use **broadcast** (a *covering condition*), at the cost of spurious wakeups.

A **semaphore** is an integer with \`wait\` (decrement, block if negative) and \`post\` (increment, wake one). Initialised to 1 it is a lock; to 0 it orders events (join); with a count it manages a pool of resources. Semaphores solve producer/consumer compactly, but as Dijkstra noted ordering matters: taking the mutex before the \`empty\` semaphore deadlocks. **Reader-writer locks** allow many readers or one writer and show how fairness fails (writers starve). **Dining philosophers** show that deadlock can be broken by changing the acquisition order of one philosopher.

Read chapters 30 and 31 and write every solution in C with pthreads, then break each one deliberately.`,
          resources: [
            {
              title: 'OSTEP — Condition Variables (Chapter 30)',
              url: 'https://pages.cs.wisc.edu/~remzi/OSTEP/threads-cv.pdf',
              type: 'textbook',
              cost: 'free',
              provider: 'OSTEP',
              primary: true,
            },
            {
              title: 'OSTEP — Semaphores (Chapter 31)',
              url: 'https://pages.cs.wisc.edu/~remzi/OSTEP/threads-sema.pdf',
              type: 'textbook',
              cost: 'free',
              provider: 'OSTEP',
            },
            {
              title: 'OSTEP homework: threads-cv and threads-sema',
              url: 'https://github.com/remzi-arpacidusseau/ostep-homework/tree/master/threads-cv',
              type: 'problem-set',
              cost: 'free',
              provider: 'OSTEP',
            },
            {
              title: 'The Little Book of Semaphores (Allen Downey)',
              url: 'https://greenteapress.com/wp/semaphores/',
              type: 'textbook',
              cost: 'free',
              note: 'Dozens of classic synchronisation puzzles with solutions; free PDF.',
            },
            {
              title: 'MIT 6.1810 Lab: multithreading',
              url: 'https://pdos.csail.mit.edu/6.828/2023/labs/thread.html',
              type: 'problem-set',
              cost: 'free',
              provider: 'MIT',
              note: 'User-level threads with context switching, plus a barrier with condition variables.',
            },
          ],
          exercises: [
            {
              slug: 'producer-consumer-stages',
              title: 'Producer/consumer in stages',
              prompt:
                'Implement the bounded buffer in C with pthreads in four versions: (1) one CV and if, (2) one CV and while, (3) two CVs and while, (4) semaphores. For versions 1 and 2, construct a schedule with 2 consumers and 1 producer that breaks them (use sleeps to force the interleaving) and explain why. Verify version 3 with 10 producers and 10 consumers over 1 million items.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'semaphore-puzzles',
              title: 'Semaphore puzzles',
              prompt:
                'From the Little Book of Semaphores, solve: rendezvous, barrier (reusable), the H2O problem and the dining philosophers with a footman. Write each in C or Python with threads and a test harness that runs 1000 iterations and checks invariants.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'rwlock-starvation',
              title: 'Reader-writer starvation',
              prompt:
                'Implement the simple reader-writer lock from OSTEP with semaphores. Start 8 readers that loop acquiring read locks and 1 writer; measure how long the writer waits. Then implement a writer-preferring version and measure again. Explain the trade-off with reader throughput.',
              kind: 'coding',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'Why must you re-check the condition after wait() returns?',
              answerOutline:
                'Mesa semantics: signal is a hint, the lock is reacquired after other threads may have run and changed the state; spurious wakeups are also possible.',
            },
            {
              question: 'What does wait(cv, lock) do atomically and why does it matter?',
              answerOutline:
                'Releases the lock and puts the thread to sleep as one step; otherwise a signal could arrive between release and sleep and be lost.',
            },
            {
              question: 'How does a semaphore initialised to 0 implement thread join?',
              answerOutline:
                'Parent calls sem_wait (blocks because value becomes -1); child calls sem_post on exit, waking the parent. If the child posts first the value is 1 and the parent does not block.',
            },
          ],
        },
        {
          slug: 'concurrency-bugs-and-event-based',
          title: 'Concurrency bugs, deadlock and event-based concurrency',
          summary:
            'The real taxonomy of concurrency bugs, the four conditions for deadlock and how to break them, and the event loop as an alternative to threads.',
          estimatedMinutes: 90,
          objectives: [
            'Classify concurrency bugs as atomicity violation, order violation or deadlock using real examples',
            'State the four necessary conditions for deadlock and give a prevention technique for each',
            'Explain lock ordering, trylock-based avoidance and detection/recovery',
            'Explain event-based concurrency, its advantages and the problem of blocking calls',
          ],
          concepts: [
            'Atomicity violation, order violation (the Lu et al. study)',
            'Deadlock: mutual exclusion, hold-and-wait, no preemption, circular wait',
            'Lock ordering (total/partial), lock-free structures, trylock and backoff',
            'Deadlock avoidance (Banker) and detection/recovery',
            'Event loop, select/poll/epoll',
            'Asynchronous I/O and callbacks; state management',
            'Threads vs events trade-offs',
          ],
          explanation: `A study of real bugs in MySQL, Apache, Mozilla and OpenOffice found that most concurrency bugs are **not** deadlocks. The majority are **atomicity violations** (a check and a use that were assumed atomic but are not) and **order violations** (code assumes A happens before B, nothing enforces it). The fixes are the primitives you now know: a lock around the whole check-and-use, a condition variable to enforce the order.

**Deadlock** requires four conditions simultaneously: mutual exclusion, hold-and-wait, no preemption, and circular wait. Break any one and deadlock is impossible. Most real systems break *circular wait* with a global **lock order** (Linux documents its lock hierarchy in comments). *Hold-and-wait* can be broken by acquiring all locks under a single prevention lock; *no preemption* by using **trylock** with backoff; *mutual exclusion* by lock-free data structures built on compare-and-swap. Avoidance by scheduling (Banker's algorithm) needs global knowledge; detection and recovery (restart the deadlocked transaction) is common in databases.

**Event-based concurrency** avoids threads entirely: a single loop waits for events with \`select\`/\`poll\`/\`epoll\` and runs a handler for each. There are no races and no locks because nothing runs concurrently, and the program controls scheduling. The catch: a handler must never block, so I/O must be asynchronous and the program's state must be saved by hand (a *continuation*) across callbacks. Node.js, nginx and many network servers are built this way; modern languages add \`async/await\` to make continuations readable.

Read chapters 32 and 33 and work the vector-deadlock homework.`,
          resources: [
            {
              title: 'OSTEP — Common Concurrency Problems (Chapter 32)',
              url: 'https://pages.cs.wisc.edu/~remzi/OSTEP/threads-bugs.pdf',
              type: 'textbook',
              cost: 'free',
              provider: 'OSTEP',
              primary: true,
            },
            {
              title: 'OSTEP — Event-based Concurrency (Chapter 33)',
              url: 'https://pages.cs.wisc.edu/~remzi/OSTEP/threads-events.pdf',
              type: 'textbook',
              cost: 'free',
              provider: 'OSTEP',
            },
            {
              title: 'OSTEP homework: threads-bugs (vector-deadlock, vector-global-order, vector-try-wait)',
              url: 'https://github.com/remzi-arpacidusseau/ostep-homework/tree/master/threads-bugs',
              type: 'problem-set',
              cost: 'free',
              provider: 'OSTEP',
            },
            {
              title: 'Learning from Mistakes: A Comprehensive Study on Real World Concurrency Bug Characteristics (Lu et al., ASPLOS 2008)',
              url: 'https://pages.cs.wisc.edu/~shanlu/paper/asplos122-lu.pdf',
              type: 'article',
              cost: 'free',
              note: 'The paper behind chapter 32; read sections 1-4.',
            },
          ],
          exercises: [
            {
              slug: 'vector-deadlock',
              title: 'Deadlock and its four fixes',
              prompt:
                'Complete the OSTEP threads-bugs homework: run vector-deadlock.c to observe deadlock, then vector-global-order.c, vector-try-wait.c, vector-avoid-hold-and-wait.c and vector-nolock.c. For each, record run time with 1, 2, 4 and 8 threads and the number of retries, and explain which deadlock condition it breaks and what it costs.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'event-echo-server',
              title: 'Event-based echo server',
              prompt:
                'Write a TCP echo server in C using epoll (or kqueue/poll) that handles 1000 concurrent clients in a single thread. Then write a thread-per-connection version. Load test both with a small client that opens N connections and sends 10,000 messages each; compare memory use and throughput.',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'bug-classification',
              title: 'Classify real bugs',
              prompt:
                'Find three closed concurrency bug reports in an open-source project of your choice (search the issue tracker for "race" or "deadlock"). For each, classify it as atomicity violation, order violation or deadlock, describe the fix, and say which primitive from this module it used.',
              kind: 'reading',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What is an atomicity violation? Give the MySQL example.',
              answerOutline:
                'A check-then-act on shared state without a lock; thread 1 checks proc_info != NULL, thread 2 sets it to NULL, thread 1 dereferences it.',
            },
            {
              question: 'Name the four conditions for deadlock and one way to break each.',
              answerOutline:
                'Mutual exclusion (lock-free CAS), hold-and-wait (acquire all at once), no preemption (trylock/back off), circular wait (total lock order).',
            },
            {
              question: 'Why must event handlers never block, and what replaces blocking?',
              answerOutline:
                'One thread runs all handlers; a block stalls everything. Use asynchronous I/O and continuations/callbacks that resume when the event arrives.',
            },
          ],
        },
      ],
      project: {
        slug: 'concurrent-web-server',
        title: 'Module project: a multi-threaded web server',
        description:
          'Build the OSTEP concurrent web server: a fixed pool of worker threads, a bounded request buffer protected by a lock and condition variables, and selectable scheduling policies (FIFO, smallest-file-first). Measure latency and throughput under load.',
        deliverables: [
          'Server with configurable thread count, buffer size and scheduling policy',
          'A load-testing client and plots of throughput/latency vs threads',
          'A README explaining the synchronisation design and how you verified there are no races (ThreadSanitizer output)',
        ],
        estimatedHours: 15,
      },
    },
    {
      slug: 'persistence',
      title: 'Persistence: I/O, Disks and File Systems',
      description:
        'Devices and drivers, disk and SSD characteristics, the file system API, how file systems lay out data on disk, and how they survive crashes.',
      lessons: [
        {
          slug: 'io-devices-and-disks',
          title: 'I/O devices, hard disks, SSDs and RAID',
          summary:
            'How the CPU talks to devices (polling, interrupts, DMA), how disks and flash actually work, and how RAID trades capacity, performance and reliability.',
          estimatedMinutes: 120,
          objectives: [
            'Describe the canonical device interface and when to poll vs use interrupts',
            'Compute disk I/O time from seek, rotation and transfer, and explain why random I/O is slow',
            'Explain disk scheduling (SSTF, SCAN, SPTF) and the flash translation layer in SSDs',
            'Compare RAID 0, 1, 4 and 5 on capacity, reliability and sequential/random throughput',
          ],
          concepts: [
            'Device registers: status, command, data; memory-mapped I/O',
            'Polling, interrupts, interrupt coalescing, DMA',
            'Device drivers and the storage stack',
            'Disk geometry: platters, tracks, sectors; seek, rotational delay, transfer',
            'Disk scheduling: SSTF, SCAN/C-SCAN, SPTF',
            'Flash: pages, blocks, erase-before-write, FTL, wear levelling, write amplification',
            'RAID levels 0, 1, 4, 5; small-write problem; parity',
          ],
          explanation: `A device looks to the OS like a few **registers** (status, command, data) accessed via special instructions or **memory-mapped I/O**. The CPU writes a command, the device works, then signals completion. **Polling** wastes CPU if the device is slow; **interrupts** let the CPU do other work but cost more for fast devices, so drivers mix both (poll briefly, then wait for an interrupt; coalesce many completions into one interrupt). **DMA** lets the device copy data to memory without the CPU.

A hard disk read costs **seek** (moving the arm, milliseconds) plus **rotational delay** (half a rotation on average) plus **transfer** (fast). For a 7200 RPM disk, random 4 KB reads achieve well under 1 MB/s while sequential reads reach 100+ MB/s. Everything in file-system design follows from this hundred-fold gap. Disk scheduling reorders requests to reduce seeks (SSTF, SCAN) or total positioning time (SPTF).

**SSDs** have no moving parts but their own constraints: flash is read in pages but erased in large blocks, and a page cannot be overwritten without erasing its block. The **flash translation layer** maps logical blocks to physical pages log-structured style, garbage-collects and wear-levels; random writes can cause heavy **write amplification**. SSD random reads are fast; random small writes are still much slower than sequential.

**RAID** combines disks. Striping (RAID-0) gives capacity and bandwidth, mirroring (RAID-1) reliability at half capacity, parity (RAID-4/5) reliability with one disk of overhead but a **small-write problem**: updating one block costs four I/Os. Read chapters 36 to 39 and 44 and work \`disk.py\` and \`raid.py\`.`,
          resources: [
            {
              title: 'OSTEP — I/O Devices (Chapter 36)',
              url: 'https://pages.cs.wisc.edu/~remzi/OSTEP/file-devices.pdf',
              type: 'textbook',
              cost: 'free',
              provider: 'OSTEP',
              primary: true,
            },
            {
              title: 'OSTEP — Hard Disk Drives (Chapter 37)',
              url: 'https://pages.cs.wisc.edu/~remzi/OSTEP/file-disks.pdf',
              type: 'textbook',
              cost: 'free',
              provider: 'OSTEP',
            },
            {
              title: 'OSTEP — Redundant Arrays of Inexpensive Disks (Chapter 38)',
              url: 'https://pages.cs.wisc.edu/~remzi/OSTEP/file-raid.pdf',
              type: 'textbook',
              cost: 'free',
              provider: 'OSTEP',
            },
            {
              title: 'OSTEP — Flash-based SSDs (Chapter 44)',
              url: 'https://pages.cs.wisc.edu/~remzi/OSTEP/file-ssd.pdf',
              type: 'textbook',
              cost: 'free',
              provider: 'OSTEP',
            },
            {
              title: 'OSTEP homework: disk.py and raid.py',
              url: 'https://github.com/remzi-arpacidusseau/ostep-homework/tree/master/file-disks',
              type: 'problem-set',
              cost: 'free',
              provider: 'OSTEP',
            },
          ],
          exercises: [
            {
              slug: 'disk-and-raid-sims',
              title: 'Disk and RAID simulators',
              prompt:
                'Complete the OSTEP file-disks and file-raid homework. For disk.py, compute seek/rotate/transfer times by hand for the given request streams under FIFO, SSTF and SATF and verify. For raid.py, work out the physical disks and offsets for each logical request under RAID 0, 1, 4 and 5 and predict the throughput of sequential vs random writes.',
              kind: 'simulation',
              difficulty: 1,
            },
            {
              slug: 'measure-your-disk',
              title: 'Measure random vs sequential I/O',
              prompt:
                'Using fio (or a small C program with O_DIRECT), measure sequential read, random 4 KB read, sequential write and random 4 KB write throughput and latency on your storage device. Compare against the numbers OSTEP gives for HDD and SSD, and explain each in terms of the physical mechanism.',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'ftl-simulator',
              title: 'Write a tiny FTL',
              prompt:
                'Simulate a log-structured flash translation layer: 64 blocks of 16 pages, page-mapped FTL, greedy garbage collection, wear tracking. Feed it 100,000 random 1-page writes and 100,000 sequential writes; report write amplification and erase-count variance for each workload.',
              kind: 'coding',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'When is polling better than interrupts?',
              answerOutline:
                'When the device is fast (completion in less time than a context switch) or under livelock-prone heavy load; interrupts suit slow devices.',
            },
            {
              question: 'Estimate the time for a random 4 KB read on a 7200 RPM disk with 4 ms average seek and 100 MB/s transfer.',
              answerOutline:
                'Seek 4 ms + half rotation (60/7200/2 = 4.2 ms) + transfer 0.04 ms ≈ 8.2 ms; about 120 IOPS.',
            },
            {
              question: 'What is the small-write problem in RAID-5?',
              answerOutline:
                'A single block write requires reading the old block and old parity and writing new block and new parity: four I/Os, and the parity disk is not a single bottleneck only because parity rotates.',
            },
          ],
        },
        {
          slug: 'file-system-api',
          title: 'Files, directories and the file-system API',
          summary:
            'The Unix file abstraction: open/read/write/lseek, file descriptors and the open file table, directories, hard and symbolic links, and fsync.',
          estimatedMinutes: 90,
          objectives: [
            'Use open, read, write, lseek, close, fsync, rename, stat, link, unlink, mkdir correctly',
            'Explain the relationship between file descriptors, the open file table and inodes',
            'Explain hard links vs symbolic links and the reference count on an inode',
            'Describe how to update a file atomically using write-to-temp, fsync and rename',
          ],
          concepts: [
            'File, inode number, directory as a list of (name, inode) pairs',
            'open flags; file descriptor; current offset',
            'Open file table shared across fork and dup',
            'read/write/lseek; stat and inode metadata',
            'fsync and the write-ordering problem',
            'rename atomicity',
            'Hard links, unlink and link count; symbolic links',
            'Mount points and the file-system tree; permissions',
          ],
          explanation: `The Unix file system presents two abstractions. A **file** is a linear array of bytes identified internally by an **inode number**. A **directory** is a special file whose contents are (name, inode number) pairs, including \`.\` and \`..\`; directories form a tree rooted at \`/\` into which other file systems are **mounted**.

\`open\` returns a **file descriptor**, an index into a per-process table whose entries point to an **open file table** entry holding the current **offset** and the mode. The same entry is shared after \`fork\` and \`dup\`, which is why a parent and child writing to the same descriptor interleave rather than overwrite, and why shell redirection works. \`read\` and \`write\` advance the offset; \`lseek\` sets it (nothing to do with disk seeks). \`stat\` exposes inode metadata: size, permissions, link count, timestamps.

Writes go to the **page cache** and reach disk later. If you need durability, call \`fsync\` on the file, and, for a newly created file, on its directory too. Atomic update of a file is a famous idiom: write a temporary file, \`fsync\` it, \`rename\` it over the original (rename is atomic), then \`fsync\` the directory. Editors and databases depend on this.

A **hard link** (\`link\`) adds another name for the same inode and bumps the link count; \`unlink\` removes a name and frees the inode only when the count hits zero and no process has it open. A **symbolic link** is a file containing a path and can dangle. Read OSTEP chapter 39 and use \`strace\` on everyday programs to see the API in action.`,
          resources: [
            {
              title: 'OSTEP — Interlude: Files and Directories (Chapter 39)',
              url: 'https://pages.cs.wisc.edu/~remzi/OSTEP/file-intro.pdf',
              type: 'textbook',
              cost: 'free',
              provider: 'OSTEP',
              primary: true,
            },
            {
              title: 'OSTEP homework: file-intro (stat, ls, tail, recursive search in C)',
              url: 'https://github.com/remzi-arpacidusseau/ostep-homework',
              type: 'problem-set',
              cost: 'free',
              provider: 'OSTEP',
            },
            {
              title: 'Linux man pages: open(2), fsync(2), rename(2), link(2)',
              url: 'https://man7.org/linux/man-pages/man2/open.2.html',
              type: 'documentation',
              cost: 'free',
              provider: 'man7.org',
            },
            {
              title: 'All File Systems Are Not Created Equal (Pillai et al., OSDI 2014)',
              url: 'https://www.usenix.org/conference/osdi14/technical-sessions/presentation/pillai',
              type: 'article',
              cost: 'free',
              note: 'What applications assume about crash behaviour and how often they are wrong.',
            },
          ],
          exercises: [
            {
              slug: 'reimplement-tools',
              title: 'Reimplement stat, ls, tail and find',
              prompt:
                'Following the OSTEP file-intro homework, write in C: mystat (print inode, size, blocks, links, times), myls -l (readdir + stat), mytail -n (lseek from the end), and myfind (recursive directory search using opendir/readdir, handling symlink loops). Compare output to the real tools.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'atomic-update',
              title: 'Atomic file update',
              prompt:
                'Write save_config(path, data) that updates a file atomically and durably using the temp-file + fsync + rename + directory-fsync idiom. Then write a test that kills the process at random points (fork a child that writes, kill it with SIGKILL after a random delay) and checks the file is always either the old or the new complete contents.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'strace-exploration',
              title: 'strace a text editor',
              prompt:
                'Run `strace -f -o trace.txt` on a text editor (vim, nano or a GUI editor) while saving a file. Identify every file-system call in the save path and explain the editor\'s strategy for atomicity and durability. Does it fsync? Does it rename?',
              kind: 'data-analysis',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'Why do a parent and child that both write to an inherited fd not overwrite each other?',
              answerOutline:
                'They share one open file table entry, so the offset is shared and advances for both.',
            },
            {
              question: 'What does unlink actually do?',
              answerOutline:
                'Removes the name from the directory and decrements the inode link count; data is freed only when count is 0 and no process has it open.',
            },
            {
              question: 'What sequence makes a file update atomic and durable?',
              answerOutline:
                'Write temp file, fsync(temp), rename(temp, target), fsync(directory).',
            },
          ],
        },
        {
          slug: 'file-system-implementation',
          title: 'File-system implementation: the very simple file system',
          summary:
            'On-disk layout of a Unix file system: superblock, bitmaps, inodes, multi-level indexing, directories, and the exact I/O cost of open, read and write.',
          estimatedMinutes: 120,
          objectives: [
            'Draw the on-disk layout of vsfs and compute how many inodes and data blocks a given disk holds',
            'Trace every disk read and write for open(), read() and write() of a file in a nested path',
            'Explain multi-level indexed allocation and compute the maximum file size',
            'Explain the roles of the page cache and write buffering',
          ],
          concepts: [
            'Superblock, inode bitmap, data bitmap, inode table, data region',
            'Inode: metadata, direct pointers, indirect/double-indirect pointers',
            'Extents vs pointer-based allocation',
            'Directory as data blocks of entries; lookup cost',
            'Access path: path traversal reads, allocation writes',
            'Page cache, write buffering, delayed writes',
            'xv6 fs.c: balloc, ialloc, bmap, dirlookup, namei',
          ],
          explanation: `OSTEP's **vsfs** is a simplified but faithful ext2-like layout. A disk of 64 4 KB blocks has: a **superblock** (block 0: how many inodes and blocks, where the tables start), an **inode bitmap** and a **data bitmap** (which inodes and data blocks are free), an **inode table** (5 blocks, 80 inodes of 256 bytes), and the **data region** (56 blocks). An **inode** holds metadata (type, size, permissions, times, link count) plus pointers to data blocks.

Pointers are **multi-level indexed**: 12 direct pointers cover small files, one **indirect** block holds 1024 more pointers, a **double indirect** block holds 1024 indirect blocks. The structure is deliberately asymmetric because most files are small and most bytes are in large files. Max size with double indirection and 4 KB blocks is about $(12 + 1024 + 1024^2) \\times 4\\,\\text{KB} \\approx 4\\,\\text{GB}$. ext4 instead uses **extents** (start, length) which are compact for contiguous files.

Tracing the access path is the key skill. \`open("/foo/bar")\` reads the root inode, root data, foo's inode, foo's data, bar's inode: five reads before any data. \`write\` to a new file touches the data bitmap, the inode, and the data block: three writes per block, and more when an indirect block is allocated. Creating a file also updates the directory data and possibly the inode bitmap. The **page cache** absorbs repeated reads and buffers writes, which is why the API lesson insisted on fsync.

Read chapter 40, then read xv6's \`kernel/fs.c\` in the same order: \`balloc\`, \`ialloc\`, \`bmap\`, \`readi\`/\`writei\`, \`dirlookup\`, \`namex\`. It is the same design with 12 direct and one indirect pointer.`,
          resources: [
            {
              title: 'OSTEP — File System Implementation (Chapter 40)',
              url: 'https://pages.cs.wisc.edu/~remzi/OSTEP/file-implementation.pdf',
              type: 'textbook',
              cost: 'free',
              provider: 'OSTEP',
              primary: true,
            },
            {
              title: 'xv6 book — Chapter 8: File system',
              url: 'https://pdos.csail.mit.edu/6.828/2023/xv6/book-riscv-rev3.pdf',
              type: 'textbook',
              cost: 'free',
              provider: 'MIT',
            },
            {
              title: 'OSTEP homework: vsfs.py',
              url: 'https://github.com/remzi-arpacidusseau/ostep-homework/tree/master/file-implementation',
              type: 'problem-set',
              cost: 'free',
              provider: 'OSTEP',
            },
            {
              title: 'MIT 6.1810 Lab: file system (large files and symbolic links)',
              url: 'https://pdos.csail.mit.edu/6.828/2023/labs/fs.html',
              type: 'problem-set',
              cost: 'free',
              provider: 'MIT',
            },
          ],
          exercises: [
            {
              slug: 'vsfs-simulator',
              title: 'vsfs state simulator',
              prompt:
                'Complete the OSTEP file-implementation homework: for each operation printed by vsfs.py (mkdir, creat, open/write, link, unlink), predict the change to the inode bitmap, inode table, data bitmap and data blocks before revealing it. Then answer the chapter questions about reducing inodes and data blocks.',
              kind: 'simulation',
              difficulty: 1,
            },
            {
              slug: 'xv6-fs-lab',
              title: 'xv6 file-system lab',
              prompt:
                'Complete the MIT file-system lab: add a doubly-indirect block to xv6 inodes so files can reach 65803 blocks (modify bmap and itrunc), then implement symlink() and the O_NOFOLLOW flag. Pass bigfile and symlinktest.',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'count-ios',
              title: 'Count the I/Os',
              prompt:
                'For vsfs with an empty page cache, count every block read and write for: (a) reading the 3rd 4 KB block of /home/you/notes.txt; (b) appending one block to that file when it has 12 blocks already (an indirect block must be allocated); (c) creating /home/you/new.txt. Show your reasoning as a table like OSTEP figure 40.3.',
              kind: 'problem',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why are inode pointer structures multi-level rather than a flat array?',
              answerOutline:
                'Most files are small, so a few direct pointers keep the inode small; indirect blocks are only allocated for the minority of large files.',
            },
            {
              question: 'How many disk reads does open("/a/b/c") take with a cold cache?',
              answerOutline:
                'Root inode, root data, a inode, a data, b inode, b data, c inode: 7 reads.',
            },
            {
              question: 'Why do file systems buffer writes, and what is the risk?',
              answerOutline:
                'Batching and reordering reduce I/Os and some writes are cancelled (temp files); risk is data loss on crash before write-back, hence fsync.',
            },
          ],
        },
        {
          slug: 'locality-and-crash-consistency',
          title: 'Locality, crash consistency and journaling',
          summary:
            'How FFS used disk-aware layout for performance, and how fsck, journaling and log-structured file systems keep metadata consistent across crashes.',
          estimatedMinutes: 120,
          objectives: [
            'Explain the FFS cylinder-group design and the policies that keep related data close',
            'State the crash-consistency problem and the inconsistent states a crash can leave',
            'Explain data journaling vs metadata (ordered) journaling and their write sequences',
            'Explain the log-structured file system, its inode map and garbage collection, and relate it to copy-on-write file systems and SSD FTLs',
          ],
          concepts: [
            'FFS: cylinder groups, placing inodes near data, large-file exception',
            'Fragmentation and block sizes; sub-blocks',
            'Crash consistency problem; the three-write example',
            'fsck and why it is too slow',
            'Write-ahead logging: journal write, journal commit, checkpoint; transactions',
            'Metadata journaling and the ordering rule',
            'Log-structured file system, inode map, checkpoint region, cleaning',
            'Copy-on-write (ZFS, btrfs) and checksums',
          ],
          explanation: `The original Unix file system treated the disk as random-access memory and achieved 2% of bandwidth as files fragmented. **FFS** (Berkeley Fast File System) introduced **disk awareness**: the disk is divided into **cylinder groups** each with its own inodes, bitmaps and data; a file's inode and data go in the same group, files in a directory go in the directory's group, and large files are spread across groups in chunks so one file cannot fill a group. Those *placement policies* are still visible in ext4 today.

Then comes the deepest problem of the module: **crash consistency**. Appending a block updates the inode, the data bitmap and the data block; the disk writes them one at a time; a crash after any subset leaves the file system inconsistent (a pointer to garbage, a block marked used but unreferenced, or a lost write). The early fix, **fsck**, scans the whole disk at boot and takes hours on large disks, and cannot even fix all cases.

**Journaling** (write-ahead logging, as in ext3/ext4, NTFS, XFS) solves it: first write the intended updates as a **transaction** to a log, write a **commit** block after the transaction blocks are durable, then **checkpoint** the updates to their real locations; after a crash, replay committed transactions and ignore incomplete ones. **Metadata journaling** avoids writing data twice by journaling only metadata and writing data blocks first (ordered mode).

**LFS** takes the opposite view: never overwrite; buffer all updates into large sequential segments, track inodes via an **inode map**, and run a **cleaner** to reclaim segments. Its ideas live on in copy-on-write file systems (ZFS, btrfs) and in every SSD's FTL. Read chapters 41, 42 and 43 and run \`fsck.py\`.`,
          resources: [
            {
              title: 'OSTEP — Locality and the Fast File System (Chapter 41)',
              url: 'https://pages.cs.wisc.edu/~remzi/OSTEP/file-ffs.pdf',
              type: 'textbook',
              cost: 'free',
              provider: 'OSTEP',
              primary: true,
            },
            {
              title: 'OSTEP — Crash Consistency: FSCK and Journaling (Chapter 42)',
              url: 'https://pages.cs.wisc.edu/~remzi/OSTEP/file-journaling.pdf',
              type: 'textbook',
              cost: 'free',
              provider: 'OSTEP',
            },
            {
              title: 'OSTEP — Log-structured File Systems (Chapter 43)',
              url: 'https://pages.cs.wisc.edu/~remzi/OSTEP/file-lfs.pdf',
              type: 'textbook',
              cost: 'free',
              provider: 'OSTEP',
            },
            {
              title: 'OSTEP homework: fsck.py and lfs.py',
              url: 'https://github.com/remzi-arpacidusseau/ostep-homework/tree/master/file-journaling',
              type: 'problem-set',
              cost: 'free',
              provider: 'OSTEP',
            },
            {
              title: 'ext4 Data Structures and Algorithms (Linux kernel documentation)',
              url: 'https://docs.kernel.org/filesystems/ext4/index.html',
              type: 'documentation',
              cost: 'free',
              provider: 'kernel.org',
              note: 'See how block groups, extents and the JBD2 journal appear in a production file system.',
            },
          ],
          exercises: [
            {
              slug: 'crash-scenarios',
              title: 'Enumerate crash scenarios',
              prompt:
                'For the append operation (inode, bitmap, data block), list all 8 subsets of writes that could be on disk after a crash. For each, state whether the file system is consistent, whether user data is lost, and what fsck would do. Then redo the analysis for data journaling and for ordered metadata journaling.',
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'fsck-homework',
              title: 'fsck and LFS simulators',
              prompt:
                'Complete the OSTEP file-journaling homework with fsck.py (identify each inconsistency and the repair) and the file-lfs homework with lfs.py (predict the on-disk log after each operation, including inode map and checkpoint updates).',
              kind: 'simulation',
              difficulty: 1,
            },
            {
              slug: 'journaling-kv-store',
              title: 'A crash-safe key-value store',
              prompt:
                'Implement a simple key-value store in C or Rust with a write-ahead log: each put appends a record with a checksum and length, fsyncs, and is then applied to an in-memory hash table; on startup the log is replayed, stopping at the first corrupt or truncated record. Build a crash-test harness that SIGKILLs the process mid-write 1000 times and verifies that acknowledged writes are never lost and no corrupt data is returned.',
              kind: 'coding',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'What does FFS do with large files, and why?',
              answerOutline:
                'Spreads them in chunks across cylinder groups so they do not fill one group and destroy locality for the group\'s other files; chunk size is set so seek cost is amortised.',
            },
            {
              question: 'Why must the commit block be written only after the transaction blocks are durable?',
              answerOutline:
                'Disks may reorder writes; a commit before the data would make recovery replay garbage. A write barrier/flush or a transaction checksum fixes it.',
            },
            {
              question: 'How does LFS find an inode if inodes are never in a fixed place?',
              answerOutline:
                'An inode map (also written to the log) maps inode number to the latest inode location; the checkpoint region records the imap pieces.',
            },
          ],
        },
      ],
      project: {
        slug: 'fsck-for-xv6',
        title: 'Module project: a file-system checker',
        description:
          'Write a standalone fsck for xv6 file-system images (the OSTEP "filesystem-checker" project): parse the superblock, inodes, bitmap and directories, and detect every inconsistency in the project spec (bad addresses, bitmap mismatches, bad link counts, directory format errors). Then extend it to repair the simplest cases.',
        deliverables: [
          'xcheck program that reports the first error found with the exact messages from the spec',
          'A set of hand-corrupted images exercising each check',
          'A writeup describing which errors a journaling file system would prevent',
        ],
        estimatedHours: 15,
      },
    },
    {
      slug: 'beyond-the-kernel',
      title: 'Beyond the Kernel: Distribution, Virtualization and Security',
      description:
        'How OS ideas extend across machines (NFS, AFS), beneath the OS (virtual machine monitors) and into protection and security.',
      lessons: [
        {
          slug: 'distributed-file-systems',
          title: 'Distributed file systems: NFS and AFS',
          summary:
            'Making remote storage look local: stateless protocols, idempotent operations, client caching and the cache-consistency problem.',
          estimatedMinutes: 90,
          objectives: [
            'Explain why NFSv2 was designed stateless and how file handles and idempotency enable crash recovery',
            'Describe NFS client caching and the cache-consistency problem (flush-on-close, attribute cache)',
            'Contrast AFS whole-file caching with callbacks against NFS',
            'Explain the trade-offs between consistency, performance and server scalability',
          ],
          concepts: [
            'Distributed system failure modes: machine and network',
            'NFS: file handles, statelessness, idempotent operations',
            'Client-side caching; flush-on-close; attribute cache',
            'Server write buffering and durability',
            'AFS: whole-file caching, callbacks, last-writer-wins',
            'Scalability and consistency comparisons',
            'Modern successors: NFSv4, SMB, object stores',
          ],
          explanation: `A distributed file system keeps the same open/read/write API but the data lives on a server. Two problems dominate: the server can **crash** (or the network can drop messages) and clients **cache** data that others change.

Sun's **NFS** (v2) chose **statelessness**: the server keeps no record of which clients have what open. Every request carries a **file handle** (volume, inode number, generation) plus an offset, and operations are **idempotent**, so a client whose request times out simply retries. Server crash recovery is therefore trivial: nothing to rebuild. The cost is a protocol in which the client, not the server, tracks all state, and the awkwardness of operations that are not naturally idempotent (mkdir).

NFS clients cache blocks and metadata for performance, which creates the **cache consistency** problem: another client's write is invisible until the cache is refreshed. NFS settled on **flush-on-close** (writes reach the server when the file is closed) and an **attribute cache** with a 3-second timeout, which is "good enough" but means two clients editing the same file see surprising results. The server must also not acknowledge a write before it is durable, or a server crash loses data silently.

**AFS** (CMU's Andrew File System) caches **whole files** on the local disk and uses **callbacks**: the server promises to tell the client when a file changes, so a cached file is valid until a callback arrives. This gives clear semantics (last closer wins, visible to all) and great scalability because clients rarely contact the server. Read chapters 48 and 49 with an eye on the systems you use: NFSv4, SMB, and cloud object stores all re-decide the same trade-offs.`,
          resources: [
            {
              title: 'OSTEP — Sun\'s Network File System (NFS) (Chapter 49)',
              url: 'https://pages.cs.wisc.edu/~remzi/OSTEP/dist-nfs.pdf',
              type: 'textbook',
              cost: 'free',
              provider: 'OSTEP',
              primary: true,
            },
            {
              title: 'OSTEP — The Andrew File System (AFS) (Chapter 50)',
              url: 'https://pages.cs.wisc.edu/~remzi/OSTEP/dist-afs.pdf',
              type: 'textbook',
              cost: 'free',
              provider: 'OSTEP',
            },
            {
              title: 'OSTEP — Distributed Systems introduction (Chapter 48)',
              url: 'https://pages.cs.wisc.edu/~remzi/OSTEP/dist-intro.pdf',
              type: 'textbook',
              cost: 'free',
              provider: 'OSTEP',
            },
            {
              title: 'OSTEP homework: dist-afs (afs.py)',
              url: 'https://github.com/remzi-arpacidusseau/ostep-homework/tree/master/dist-afs',
              type: 'problem-set',
              cost: 'free',
              provider: 'OSTEP',
            },
          ],
          exercises: [
            {
              slug: 'afs-simulator',
              title: 'AFS consistency scenarios',
              prompt:
                'Complete the OSTEP dist-afs homework with afs.py: for each client schedule, predict the final file contents on each client and the server and explain which callback or close event determined it. Construct a schedule where NFS and AFS would give different results.',
              kind: 'simulation',
              difficulty: 1,
            },
            {
              slug: 'idempotent-rpc',
              title: 'Idempotent RPC over UDP',
              prompt:
                'Write a minimal "remote file" server and client over UDP: operations LOOKUP, READ(handle, offset, count) and WRITE(handle, offset, data). Make the client retry on timeout. Inject random packet loss (drop 20% of requests and 20% of replies) and show that files are still correct. Then add a non-idempotent APPEND and demonstrate how retries corrupt it.',
              kind: 'coding',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does a stateless server make crash recovery easy?',
              answerOutline:
                'Each request is self-describing (file handle + offset), so after a reboot the server can serve any retried request without reconstructing per-client state.',
            },
            {
              question: 'Why does NFS flush on close?',
              answerOutline:
                'So that other clients see the changes once a file is closed, bounding staleness without server state; it also makes a failed write visible to the writer.',
            },
            {
              question: 'What is an AFS callback?',
              answerOutline:
                'A promise by the server to notify a client when a cached file is modified; until then the client may use its copy without contacting the server.',
            },
          ],
        },
        {
          slug: 'virtual-machines',
          title: 'Virtual machine monitors',
          summary:
            'Running a whole operating system as a process: trap-and-emulate, shadow and nested page tables, and I/O virtualization.',
          estimatedMinutes: 90,
          objectives: [
            'Explain how a VMM virtualizes the CPU by running the guest OS in user mode and trapping privileged instructions',
            'Explain shadow page tables and hardware nested paging (EPT/NPT) for memory virtualization',
            'Describe the main I/O virtualization strategies (emulation, paravirtual drivers, passthrough)',
            'Relate VMMs to containers and explain what each isolates',
          ],
          concepts: [
            'Virtual machine monitor / hypervisor; type 1 vs type 2',
            'Trap-and-emulate; guest kernel runs in user mode',
            'Problems: non-trapping privileged instructions; binary translation; hardware VT-x',
            'Shadow page tables vs nested/extended page tables',
            'I/O: device emulation, virtio paravirtualization, SR-IOV passthrough',
            'Containers (namespaces, cgroups) vs VMs',
            'Performance costs of virtualization',
          ],
          explanation: `A **virtual machine monitor** (VMM, hypervisor) is "an OS for OSes": it runs a complete guest operating system as if it were a process. The classic technique is **trap-and-emulate**. The guest kernel runs in user mode; when it executes a privileged instruction (setting the page-table base, disabling interrupts, doing I/O) the CPU traps to the VMM, which emulates the effect on the virtual machine's state and resumes the guest. System calls from guest applications trap to the VMM, which bounces them to the guest kernel.

Early x86 broke this scheme because some privileged-state instructions silently did nothing in user mode instead of trapping; VMware solved it with **binary translation**, and Intel and AMD later added hardware modes (VT-x, AMD-V) that make trap-and-emulate work and reduce its cost.

Memory needs a third level of translation: guest virtual to guest physical to **machine** addresses. **Shadow page tables** are VMM-maintained tables mapping guest virtual directly to machine addresses, kept in sync by trapping guest page-table writes. Modern hardware instead walks two tables (**nested/extended page tables**), simpler but with a longer TLB-miss path, which is why huge pages matter so much under virtualization.

I/O can be fully emulated (slow but compatible), **paravirtualized** (guest drivers such as virtio know they are in a VM and use an efficient shared-memory interface), or passed through to real hardware (SR-IOV). **Containers** are not VMs: they share one kernel and isolate processes with namespaces and cgroups, trading weaker isolation for near-zero overhead. Read OSTEP's VMM appendix and the Bugnion et al. survey.`,
          resources: [
            {
              title: 'OSTEP — Virtual Machine Monitors (Appendix)',
              url: 'https://pages.cs.wisc.edu/~remzi/OSTEP/vmm-intro.pdf',
              type: 'textbook',
              cost: 'free',
              provider: 'OSTEP',
              primary: true,
            },
            {
              title: 'Hardware and Software Support for Virtualization (Bugnion, Nieh, Tsafrir)',
              url: 'https://link.springer.com/book/10.1007/978-3-031-01753-7',
              type: 'textbook',
              cost: 'paid',
              note: 'The best modern survey; many university libraries provide access. Free alternative: the OSTEP appendix plus the Xen and VMware papers below.',
            },
            {
              title: 'Xen and the Art of Virtualization (SOSP 2003)',
              url: 'https://www.cl.cam.ac.uk/research/srg/netos/papers/2003-xensosp.pdf',
              type: 'article',
              cost: 'free',
              provider: 'University of Cambridge',
            },
            {
              title: 'QEMU documentation',
              url: 'https://www.qemu.org/docs/master/',
              type: 'documentation',
              cost: 'free',
              provider: 'QEMU',
              note: 'You have been running xv6 inside QEMU all along; this explains what it does.',
            },
          ],
          exercises: [
            {
              slug: 'trap-and-emulate-walkthrough',
              title: 'Trace a guest system call',
              prompt:
                'Write a step-by-step trace of what happens when an application inside a trap-and-emulate VM calls read(): list every mode change, who handles each trap, which page tables are involved, and how the result returns. Then describe which steps hardware virtualization (VT-x) removes.',
              kind: 'writing',
              difficulty: 2,
            },
            {
              slug: 'vm-vs-container-benchmark',
              title: 'Measure virtualization overhead',
              prompt:
                'Run the system-call and TLB benchmarks from earlier lessons natively, inside a container (Docker/podman) and inside a VM (QEMU with KVM, or VirtualBox). Report the slowdown of each and explain which mechanism (syscall path, nested paging, emulated I/O) causes it.',
              kind: 'data-analysis',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'In trap-and-emulate, what mode does the guest kernel run in and why?',
              answerOutline:
                'User mode, so that its privileged instructions trap to the VMM, which can emulate them against the virtual machine state.',
            },
            {
              question: 'What is the difference between a shadow page table and nested page tables?',
              answerOutline:
                'Shadow: VMM-built guest-virtual-to-machine table, updated by trapping guest page-table writes. Nested: hardware walks guest and host tables, no traps, longer misses.',
            },
            {
              question: 'Why are containers lighter than VMs?',
              answerOutline:
                'They share the host kernel and isolate with namespaces/cgroups; no second kernel, no nested paging, no device emulation.',
            },
          ],
        },
        {
          slug: 'protection-and-security',
          title: 'Protection and security in the OS',
          summary:
            'Authentication, access control lists and capabilities, the principle of least privilege, and the OS mechanisms (sandboxes, ASLR, W^X) that limit damage.',
          estimatedMinutes: 90,
          objectives: [
            'Distinguish security goals (confidentiality, integrity, availability) and the OS role in each',
            'Explain authentication (passwords, hashing and salting) and why the OS stores hashes',
            'Compare access control lists and capabilities, including Unix permissions, setuid and the confused deputy',
            'Describe the main OS hardening mechanisms: ASLR, non-executable stacks, seccomp, namespaces, mandatory access control',
          ],
          concepts: [
            'Security goals and threat models; trusted computing base',
            'Authentication: what you know/have/are; salted password hashing',
            'Authorization: ACLs vs capabilities; Unix mode bits, setuid',
            'Principle of least privilege; confused deputy problem',
            'Sandboxing: chroot, namespaces, seccomp-bpf',
            'Memory-safety mitigations: W^X, ASLR, stack canaries',
            'Mandatory access control (SELinux, AppArmor)',
            'Cryptography as a tool: integrity of storage and communication',
          ],
          explanation: `Every mechanism in this subject, from modes to page tables, is also a **protection** mechanism, and security asks whether protection holds against an adversary. The OS's job splits into **authentication** (who is making this request?), **authorization** (are they allowed?), and **enforcement** (mechanisms that cannot be bypassed).

For authentication, the OS stores not passwords but **salted hashes** computed with a deliberately slow function, so a stolen password file does not reveal passwords and identical passwords do not share hashes. For authorization there are two dual designs. **Access control lists** attach to the object: Unix mode bits (owner/group/other, rwx) are a compressed ACL, and **setuid** binaries let a program run with the file owner's privileges, the mechanism behind \`passwd\` and the source of countless vulnerabilities. **Capabilities** attach to the subject: an unforgeable token that both names a resource and grants access, like a file descriptor. Capabilities avoid the **confused deputy** problem where a privileged service is tricked into misusing its authority.

The **principle of least privilege** says to run with the minimum rights needed, and modern OSes supply the tools: **namespaces** and **cgroups** (containers), **seccomp** to restrict which system calls a process may make, and **mandatory access control** policies (SELinux) that even root cannot override. Against memory-corruption exploits the OS raises the cost with **W^X** (no page both writable and executable), **ASLR** (randomised layout) and stack canaries. Read OSTEP's security chapters (by Peter Reiher), then inspect your own system's mechanisms in the exercises. The Cybersecurity subject builds on this lesson in depth.`,
          resources: [
            {
              title: 'OSTEP — Security chapters (Introduction, Authentication, Access Control, Cryptography, Distributed Security)',
              url: 'https://pages.cs.wisc.edu/~remzi/OSTEP/security-intro.pdf',
              type: 'textbook',
              cost: 'free',
              provider: 'OSTEP',
              note: 'Chapters 53-57; the index on the OSTEP page links each PDF.',
              primary: true,
            },
            {
              title: 'The Confused Deputy (Norm Hardy, 1988)',
              url: 'http://cap-lore.com/CapTheory/ConfusedDeputy.html',
              type: 'article',
              cost: 'free',
              note: 'Short classic, hosted by the author.',
            },
            {
              title: 'seccomp BPF — Linux kernel documentation',
              url: 'https://docs.kernel.org/userspace-api/seccomp_filter.html',
              type: 'documentation',
              cost: 'free',
              provider: 'kernel.org',
            },
            {
              title: 'Linux namespaces overview (man 7 namespaces)',
              url: 'https://man7.org/linux/man-pages/man7/namespaces.7.html',
              type: 'documentation',
              cost: 'free',
              provider: 'man7.org',
            },
          ],
          exercises: [
            {
              slug: 'setuid-audit',
              title: 'Audit setuid binaries',
              prompt:
                'List every setuid-root binary on your system (`find / -perm -4000`). For five of them, explain why it needs privilege, what it does to drop privilege, and search the CVE database for a past vulnerability in it. Suggest how capabilities (Linux file capabilities or a sandbox) could reduce the exposure.',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'build-a-sandbox',
              title: 'Build a sandbox from namespaces and seccomp',
              prompt:
                'Write a C program that uses clone() with new PID, mount and network namespaces, pivots to a minimal root file system, installs a seccomp-bpf filter allowing only read/write/exit/brk/mmap, and then execs a given program. Demonstrate that `ls` fails (open is blocked) while a program using only the allowed calls works.',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'password-hashing',
              title: 'Salted password hashing',
              prompt:
                'Implement a user database that stores salted hashes using a slow function (argon2 or bcrypt via a library, or PBKDF2 with 100,000 iterations). Measure the time to verify one password and the time to brute-force a 6-character lowercase password with your implementation; explain why the slowness is the point.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why salt password hashes?',
              answerOutline:
                'So identical passwords hash differently and precomputed (rainbow) tables are useless; each guess must be hashed per user.',
            },
            {
              question: 'What is the confused deputy problem and how do capabilities avoid it?',
              answerOutline:
                'A privileged program acting on a user\'s behalf uses its own authority on a resource the user should not access. With capabilities the user must pass a token for the resource, so the deputy cannot be tricked into using its own.',
            },
            {
              question: 'What does W^X prevent and what did attackers do in response?',
              answerOutline:
                'Injecting code into a writable buffer and executing it; attackers moved to return-oriented programming, reusing existing code, which ASLR then makes harder.',
            },
          ],
        },
      ],
    },
  ],
  capstone: {
    slug: 'xv6-extended-kernel',
    title: 'Capstone: an extended xv6 kernel',
    description: `Combine the module projects into a single, coherent kernel and defend its design. Starting from stock xv6-riscv, deliver a kernel with: an MLFQ scheduler with statistics, copy-on-write fork and lazy allocation, mmap, a kernel-level thread API (clone/join with shared address space) plus a user-level lock and condition variable library, and a journaled or at least crash-recoverable file system with doubly-indirect blocks and symbolic links.

Then evaluate it. Write user programs that stress each subsystem, measure performance before and after each change (fork latency, scheduler fairness, file-system throughput, crash recovery), and run the full xv6 usertests plus the MIT lab grading scripts. Write a design document in the style of an OSDI paper: motivation, design, implementation, evaluation, limitations.`,
    deliverables: [
      'Git repository of the modified kernel with a clean commit history per feature',
      'All MIT 6.1810 lab tests and usertests passing',
      'Benchmark programs and a results section with plots',
      'A 6-10 page design and evaluation document',
    ],
    estimatedHours: 60,
    stretchGoals: [
      'Add a simple journaling layer to the xv6 file system and demonstrate crash recovery with fault injection',
      'Port your kernel changes to multi-core and show scaling on 4 CPUs',
      'Implement a minimal virtio network driver and a UDP echo server inside xv6',
    ],
  },
  masteryChecklist: [
    'I can explain limited direct execution and trace a system call and a timer interrupt through xv6 at the register level',
    'I can implement and compare scheduling policies and predict their turnaround and response times',
    'I can translate addresses through multi-level page tables and explain TLB behaviour, page faults and replacement',
    'I can write correct multi-threaded C using locks, condition variables and semaphores, and find races with tools',
    'I can state the four deadlock conditions and apply a prevention strategy',
    'I can compute the I/O cost of file-system operations and explain journaling and log-structured designs',
    'I can explain how virtual machines and containers isolate workloads and what each costs',
    'I have built working kernel features in xv6 and measured their performance',
  ],
});
