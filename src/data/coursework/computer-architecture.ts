import { defineCoursework } from '../define';

const pythonExtensions = ['ms-python.python', 'ms-python.vscode-pylance', 'charliermarsh.ruff'];
const pythonToolchain = [
  'Install Python 3.12 or later from python.org or with `winget install Python.Python.3.12`. Everything here runs natively on Windows 10, so WSL is not needed.',
  'Create a virtual environment with `python -m venv .venv`, activate it, then run `pip install pytest`.',
];

export default defineCoursework({
  subjectId: 'computer-architecture',
  machineProblems: [
    {
      slug: 'mp1-nandsim',
      title: 'nandsim: an HDL simulator and gate cost model',
      afterModule: 'arithmetic-and-alu',
      coversModules: ['boolean-logic-and-gates', 'arithmetic-and-alu'],
      supersedesProject: true,
      summary: 'Write a simulator that flattens your HDL chips into a list of NAND gates, runs the course test vectors, and reports the gate count and depth of every design.',
      language: 'Python 3.12',
      estimatedHours: 14,
      overview: `So far you have trusted the course simulator to run your chips. In this MP you write your own. \`nandsim\` reads the HDL you wrote for Projects 1 and 2, flattens the whole chip hierarchy into a list of two-input NAND gates, and evaluates that list against the course test vectors.

Flattening makes the abstraction physical. Once \`ALU\` is a list of NANDs you can count them, find the longest path through them, and compare two designs of the same chip with real numbers. You will use that to answer a question this module only raised: what does a faster adder cost in gates, and what does it save in depth?

You will also write a bit-accurate Python model of the ALU and compare it with the flattened chip on thousands of random inputs. A mistake in either one then shows up as a disagreement.

**Constraints.** Combinational chips only, because clocks arrive in the next module. Use the Python standard library plus \`pytest\`. \`Nand\` is the only primitive, and the tool must not fold constants or share gates, so its numbers describe the design you wrote. **Depth** means the number of NANDs on the longest path from any input pin to any output pin. The Java tools are not needed. The Nand2Tetris authors ask that project solutions stay off the public web, so keep \`chips/\` in a private repository.`,
      setup: {
        extensions: pythonExtensions,
        toolchain: [
          ...pythonToolchain,
          'Download the Nand2Tetris software and copy your own Project 1 and 2 `.hdl` files into `chips/`, and the matching `.cmp` files into `vectors/`. You only need those text files.',
        ],
        structure: `nandsim/
├── nandsim/
│   ├── parser.py          # HDL text to a chip description
│   ├── elaborate.py       # resolves parts and flattens to NAND gates
│   ├── netlist.py         # topological order and fast evaluation
│   ├── cost.py            # gate count and depth
│   ├── vectors.py         # reads .cmp tables
│   ├── __main__.py        # the run and cost commands
│   └── alu_model.py       # bit-accurate software ALU
├── chips/                 # your Project 1 and 2 HDL (keep private)
├── vectors/               # the course .cmp files
├── tests/
│   ├── fixtures/          # small HDL files with known cost, including bad ones
│   └── test_*.py
└── REPORT.md`,
        commands: [
          { label: 'Run a chip against its vectors', command: 'python -m nandsim run chips/ALU.hdl vectors/ALU.cmp' },
          { label: 'Print gate count and depth', command: 'python -m nandsim cost chips/Add16.hdl' },
          { label: 'Run all tests', command: 'python -m pytest' },
        ],
      },
      requirements: [
        'The parser accepts `CHIP`, `IN`, `OUT` and `PARTS`, both comment styles, bus declarations such as `a[16]`, single bits `a[3]`, ranges `a[0..7]` on either side of a connection, the constants `true` and `false`, and fan-out such as `out=x, out=y`.',
        'Parts resolve by chip name to `<Name>.hdl` in a search directory, and `Nand` is the only primitive. A `DFF` part fails with a message saying sequential chips are not supported yet.',
        'An unknown chip, an unknown pin, a width mismatch, an undriven output and a recursive chip each fail with the file name, the line number and the offending name.',
        'Elaboration produces one flat list of two-input NAND gates in topological order. A combinational loop fails with an error that names a pin on the loop.',
        '`run` reads a `.cmp` table by its header row, treats pins as inputs or outputs from the chip definition, checks every row, and on failure prints the row number with the expected and actual values.',
        '`cost` prints the NAND count, the overall depth and the depth of each output pin, plus a breakdown of how many NANDs each direct part contributes.',
        '`alu_model.py` computes `out`, `zr` and `ng` with Python integers, and a test compares it with the flattened ALU on 10,000 seeded random inputs across all 64 control combinations.',
        'Evaluating the flattened ALU reaches at least 2,000 vectors per second on a laptop, which means compiling the netlist rather than walking objects.',
        '`REPORT.md` compares at least two `Add16` designs, including one with carry-lookahead, and two full adder designs, with a table of NANDs and depth for each and a short explanation of the trade-off.',
      ],
      acceptanceTests: [
        'In fixtures where `Not` is one Nand, `And` is Nand plus Not, and `Or` is two Nots plus a Nand: the four-NAND `Xor` costs 4 NANDs at depth 3, `HalfAdder` from `Xor` and `And` costs 6 at depth 3, and `FullAdder` from two `HalfAdder`s and an `Or` costs 15 at depth 7.',
        '`Add16` built from one such `HalfAdder` at bit 0 and 15 such `FullAdder`s costs 231 NANDs at depth 62. It computes 0x7FFF + 0x0001 = 0x8000, 0xFFFF + 0x0001 = 0x0000 and 0x1234 + 0x4321 = 0x5555.',
        'Replacing the `FullAdder` with the classic nine-NAND version, which reuses the first XOR\'s internal NAND for the carry, costs 9 NANDs at depth 6 and brings that `Add16` to 141 NANDs at depth 34.',
        'With x = 23 and y = 5, the ALU gives x-y = 18 with `zr=0, ng=0` for controls 010011, y-x = 0xFFEE with `ng=1` for 000111, x&y = 5 for 000000, x|y = 23 for 010101, and 0 with `zr=1` for 101010. Controls are listed as zx nx zy ny f no.',
        'Every row of the course `ALU.cmp`, `Add16.cmp`, `Inc16.cmp` and `Mux4Way16.cmp` passes when run against your chips.',
        'A chip with `Not(in=x, out=y); Not(in=y, out=x);` fails with a loop error, a 16-bit output wired to an 8-bit pin fails with a width error, and a chip with a `DFF` part fails with the sequential message.',
      ],
      resources: [
        {
          title: 'Nand2Tetris Software',
          url: 'https://www.nand2tetris.org/software',
          type: 'tool',
          cost: 'free',
          provider: 'Nand2Tetris',
          note: 'Source of the project `.cmp` files. Appendix 2 of the book documents the HDL grammar.',
        },
      ],
      stretchGoals: [
        'Add carry-select and carry-skip adders and plot NANDs against depth for all four designs at 8, 16 and 32 bits.',
        'Evaluate 64 vectors at once by packing them into the bits of one Python integer, and measure the speedup.',
      ],
    },
    {
      slug: 'mp2-hacklab',
      title: 'hacklab: an assembler, an emulator and a lock-step test of your CPU',
      afterModule: 'assembler',
      coversModules: ['sequential-logic-and-memory', 'machine-language-and-cpu', 'assembler'],
      summary: 'Assemble Hack programs with your own tool, then run them on your gate-level CPU and a software emulator side by side until the two disagree or the program ends.',
      language: 'Python 3.12',
      estimatedHours: 18,
      overview: `A processor is correct only if it does the right thing on every cycle, and the course test scripts check a small sample of cycles. In this MP you build a stronger check, using two independent descriptions of the same machine.

First you write \`hasm\`, a two-pass assembler, and \`hemu\`, a behavioural emulator of the Hack computer. Then you extend your MP 1 \`nandsim\` with clocked chips, so it can run the \`CPU.hdl\` you built from gates. Finally \`lockstep\` runs the two together on the same program and compares them after every cycle. If your CPU and your emulator disagree, one of them has a bug, and the tool prints the exact cycle and instruction where it happened.

The module's game is a good test program, but random instructions are better. Any 16-bit word is a legal Hack instruction, so a seeded fuzzer can reach corners that hand-written programs miss, such as \`AM=A+1\`, where the memory write and the jump must use the old value of A.

**Constraints.** Use Python and only what you have learned so far. The emulator must not reuse any code from the gate simulator. \`RAM16K\`, \`Screen\`, \`Keyboard\` and \`ROM32K\` stay behavioural, as they are built in on the course simulator, so \`lockstep\` simulates only the \`CPU\` chip in gates. The Hack machine has no pipeline, so one instruction takes exactly one cycle.`,
      setup: {
        extensions: pythonExtensions,
        toolchain: pythonToolchain,
        structure: `hacklab/
├── nandsim/               # your MP 1 simulator, extended with DFF
├── hasm/                  # assembler and disassembler
├── hemu/                  # emulator, screen renderer, scripted keyboard
├── lockstep.py            # compares gate-level CPU and emulator per cycle
├── fuzz.py                # seeded random ROM images
├── chips/                 # your CPU.hdl and everything below it (keep private)
├── programs/              # Add, Mult, Fill, and your module 4 game
├── tests/
└── REPORT.md`,
        commands: [
          { label: 'Assemble a program', command: 'python -m hasm programs/Mult.asm -o build/Mult.hack' },
          { label: 'Run it on the emulator', command: 'python -m hemu build/Mult.hack --set 0=7 --set 1=6 --cycles 78 --dump 0:3' },
          { label: 'Run your CPU and the emulator in lock-step', command: 'python lockstep.py chips/CPU.hdl build/Fill.hack --cycles 106506' },
          { label: 'Fuzz for divergence', command: 'python fuzz.py chips/CPU.hdl --seeds 10 --cycles 5000' },
          { label: 'Run all tests', command: 'python -m pytest' },
        ],
      },
      requirements: [
        '`hasm` is a two-pass assembler that supports every comp, dest and jump mnemonic, comments, labels, predefined symbols, and variables allocated upward from RAM address 16, and it writes the `.hack` text format.',
        'Unknown mnemonics, duplicate labels, malformed lines and constants above 32767 stop assembly with the source line number and a non-zero exit code.',
        '`hemu` executes one instruction per cycle from its ROM. Its ALU implements the six control bits directly, not a table of mnemonics, so every 16-bit word executes the same way the hardware would.',
        '`hemu` follows the Hack memory map: RAM at 0 to 16383, screen words at 16384 to 24575 and the keyboard at 24576. Reads above 24576 return 0, and writes to 24576 or above are ignored.',
        'The screen renders to a PBM image and to the terminal, using 32 words per row with the least significant bit on the left, and keyboard input comes from a script of `cycle keycode` lines so runs are reproducible.',
        '`nandsim` gains `DFF` as a primitive, treats `ARegister` and `DRegister` as `Register`, cuts loop detection at flip-flop boundaries, and commits all state at once on each clock edge.',
        '`lockstep` compares `pc`, `addressM`, `writeM`, and `outM` when `writeM` is 1, after every cycle. On divergence it prints the cycle, the disassembled instruction and both sets of values, then exits non-zero.',
        'Compiled gate-level simulation of your CPU reaches at least 1,000 cycles per second, so the 106,506-cycle screen fill finishes in under two minutes.',
        '`hemu --profile` reports cycles per label. `REPORT.md` gives the per-frame cycle count of your module 4 game, plus your CPU\'s NAND count, flip-flop count and longest register-to-register path in NAND levels.',
      ],
      acceptanceTests: [
        'Assembling `@2`, `D=A`, `@3`, `D=D+A`, `@0`, `M=D` gives 0000000000000010, 1110110000010000, 0000000000000011, 1110000010010000, 0000000000000000, 1110001100001000. After 6 cycles RAM[0] is 5 and the PC is 6.',
        '`D=D+M;JGT` encodes as 1111000010010001 and `AMD=D|M;JMP` as 1111010101111111. In a program whose first symbols are `@i`, `@sum` and `@x`, they map to 16, 17 and 18, `SCREEN` is 16384, `KBD` is 24576, and `@32768` is rejected.',
        'The 16-instruction program `@R2`, `M=0`, `(LOOP)`, `@R1`, `D=M`, `@END`, `D;JEQ`, `@R0`, `D=M`, `@R2`, `M=D+M`, `@R1`, `M=M-1`, `@LOOP`, `0;JMP`, `(END)`, `@END`, `0;JMP` reaches PC 14 after exactly 78 cycles with R0=7 and R1=6, leaving RAM[2]=42 and RAM[1]=0. With R0=123 and R1=456 it takes 5,478 cycles and leaves RAM[2]=56,088.',
        '`@100` then `AM=A+1` leaves A=101, RAM[100]=101 and RAM[101]=0. `@7`, `D=A`, `@5`, `A=D+A;JMP` jumps to ROM address 5, the old A, and leaves A=12.',
        'The 19-instruction program `@SCREEN`, `D=A`, `@ptr`, `M=D`, `(LOOP)`, `@ptr`, `D=M`, `@KBD`, `D=D-A`, `@END`, `D;JEQ`, `@ptr`, `A=M`, `M=-1`, `@ptr`, `M=M+1`, `@LOOP`, `0;JMP`, `(END)`, `@END`, `0;JMP` reaches `END` in 106,506 cycles (4 of setup, 13 for each of 8,192 words, and 6 for the final test), with RAM[16384] and RAM[24575] both 0xFFFF. It passes in lock-step, and pixel row 3, column 18 maps to bit 2 of word 16481.',
        'Ten seeded random ROM images run for 5,000 cycles each with no divergence. A copy of your CPU with one wire changed in its jump logic is caught, and the tool prints the first cycle where the two differ.',
      ],
      stretchGoals: [
        'Add breakpoints, single-stepping and a register view to `hemu`, driven by label names.',
        'Use `hasm`\'s source map to print a side-by-side trace of source lines and register values.',
      ],
    },
  ],
  finalProject: {
    slug: 'final-gatebudget',
    title: 'gatebudget: what is the fastest CPU you can build from N gates?',
    repoName: 'gatebudget',
    summary: 'Give it a gate budget and a program, and it searches hundreds of RISC-V microarchitectures to find the fastest one that fits, with the reason why.',
    language: 'C17 and Python 3.12',
    estimatedHours: 58,
    overview: `Every architecture textbook makes claims about trade-offs: pipelining pays, branch predictors pay, caches pay most of all. This project lets anyone test those claims on their own code. A user runs one command:

\`python -m gatebudget explore --budget 60000 --program my_code.c\`

The tool answers with the fastest CPU that fits in 60,000 NAND-equivalent gates for that program, a breakdown into instructions, CPI and clock period, and what the next 10,000 gates would buy.

To make that answer honest you need three parts that agree. **A gate model:** the datapath blocks of an RV32I core are written in HDL, built from \`Nand\` and \`DFF\`, and costed by your own tool, so each design has a real gate count and a real critical path. **A timing simulator:** a C simulator runs real RV32I programs through a single-cycle, three-stage or five-stage pipeline with configurable forwarding, branch prediction and caches. **A search:** an explorer sweeps the design space and combines the two through the iron law: time = instructions x CPI x clock period.

The decisions are real. A longer pipeline shortens the clock but adds hazards. A bigger cache lowers the miss rate but raises the hit path and the gate count. A faster clock makes every memory miss cost more cycles. The right design changes with the budget and with the workload, and that is the result worth publishing.

**Constraints.** Target the RV32I base integer ISA, not Hack, so the repository contains no Nand2Tetris solutions. All HDL in the repository is your own 32-bit design. Everything must run with free tools, and all assumptions live in one file, \`tech.toml\`, so readers can change them and rerun.`,
    setup: {
      extensions: ['ms-vscode.cpptools', 'ms-python.python', 'ms-vscode-remote.remote-wsl', 'github.vscode-github-actions'],
      toolchain: [
        'On Windows, install WSL 2 with Ubuntu, then open the folder through the WSL extension so every command below runs in Linux.',
        'In Ubuntu: `sudo apt install build-essential gdb python3-venv gcc-riscv64-unknown-elf`. The cross-compiler is used only for workloads written in C, with `-march=rv32i -mabi=ilp32 -nostdlib`. Your own assembler handles the rest.',
        'In a virtual environment: `pip install pytest matplotlib`. Python 3.11 or later includes `tomllib` for the config files.',
        'Optional, for the Verilog stretch goal: `sudo apt install iverilog gtkwave`.',
      ],
      structure: `gatebudget/
├── hdl/                   # your 32-bit blocks, built from Nand and DFF only
├── tech.toml              # gate delay, flip-flop cost, memory latency
├── gatebudget/
│   ├── cost/              # hierarchical cost engine, grown from nandsim
│   ├── rvasm/             # RV32I two-pass assembler
│   ├── explore.py         # sweep, Pareto front and marginal analysis
│   └── __main__.py        # the run and explore commands
├── sim/                   # C simulator with its own Makefile
│   ├── core.c             # RV32I functional core
│   ├── pipeline.c         # stall and flush timing
│   ├── predict.c
│   ├── cache.c
│   └── Makefile
├── bench/                 # assembly and C workloads, with crt0.s and runtime.s
├── configs/               # named design points
├── tests/                 # hand-computed traces and cost fixtures
├── docs/MODEL.md          # every assumption and why
├── docs/RESULTS.md        # plots and findings
├── .github/workflows/ci.yml
└── README.md`,
      commands: [
        { label: 'Build the simulator', command: 'make -C sim release' },
        { label: 'Run all tests', command: 'make -C sim test && python -m pytest' },
        { label: 'Show a pipeline diagram for one design', command: 'python -m gatebudget run bench/sort.s --config configs/five-bimodal.toml --trace 20' },
        { label: 'Find the best CPU for a budget', command: 'python -m gatebudget explore --budget 60000 --out results/' },
        { label: 'Try it on your own C file', command: 'python -m gatebudget explore --budget 60000 --program examples/fib.c' },
      ],
    },
    requirements: [
      'The cost engine extends `nandsim` with memoised, hierarchical costing, so it never flattens large blocks. `DFF` costs 6 NAND equivalents, and the critical path is the longest register-to-register path in NAND levels.',
      '`hdl/` holds your own 32-bit ripple, carry-lookahead and carry-select adders, an ALU, a barrel shifter, a branch comparator, a 31-register file with two read ports, decoders, and pipeline registers.',
      '`tech.toml` sets 50 ps per NAND level, a flip-flop overhead of 4 levels, 60 ns main memory latency and 1.5 NAND equivalents per SRAM bit. Storage arrays use a formula, documented in `docs/MODEL.md`, for gates and access depth, and nothing is hard-coded elsewhere.',
      '`rvasm` assembles every RV32I instruction the simulator runs, the pseudo-instructions `li`, `la`, `mv`, `j`, `call`, `ret`, `nop`, `beqz` and `bnez`, forward references, and `.text`, `.data`, `.word`, `.byte` and `.asciz`, with line-numbered errors.',
      'The simulator runs the 37 RV32I computational, load, store and control instructions plus `ecall` for exit and console output, on byte-addressable little-endian memory, and traps on misaligned accesses.',
      'Timing supports `single`, `three` (IF, ID+EX, MEM+WB) and `five` pipelines, forwarding `none` or `full`, predictors `not-taken`, `btfn` and `bimodal-N` with a same-sized BTB for N from 16 to 1024, and I and D caches from 0 to 16 KiB at 1, 2 or 4 ways with 16-byte lines, LRU and write-back.',
      'With `none`, the register file writes in the first half of a cycle and reads in the second. A mispredicted branch costs 2 cycles on `five` and 1 on `three`, a taken branch that hits the BTB costs nothing, and a cache miss costs `ceil(memory latency / clock period)` cycles, so faster clocks pay more cycles per miss. `run` prints instructions, cycles, CPI and stall cycles by cause, and `--trace N` prints a pipeline diagram of the first N instructions.',
      '`bench/` has at least six workloads of 1,000,000 or more dynamic instructions, at least three of them assembled by `rvasm`. They include a soft-float library, and `runtime.s` supplies multiply and divide routines so no `libgcc` is linked. Each C workload prints the same checksum as a native build.',
      '`explore` sweeps at least 500 design points across the six workloads in under five minutes, reports the fastest design that fits a budget by geometric mean of run time, and writes a CSV and a Pareto plot of gates against run time. A budget below the smallest core gives a clear error that names the smallest size.',
      '`docs/RESULTS.md` answers which feature buys the most speed per gate at low, middle and high budgets, how the winner shifts at 30, 60 and 120 ns memory latency, and where Amdahl\'s law caps each improvement.',
    ],
    acceptanceTests: [
      'Cost: a `Ripple32` made of one `HalfAdder` and 31 `FullAdder`s (the 6-NAND and 15-NAND versions) reports 471 NANDs at depth 126, and a 32-bit register of `Mux` plus `DFF` bits reports 320 NAND equivalents. Timing: depth 40 plus 4 overhead at 50 ps gives a 2.2 ns period, or 454.5 MHz, and a 60 ns memory access then costs 28 cycles.',
      'With the word 0x80FF7F01 stored at address 0x100, `lb` from 0x102 gives -1, `lbu` from 0x102 gives 255, `lh` from 0x102 gives -32,513 and `lhu` from 0x102 gives 33,023. With x1 = -1, `srli x2,x1,28` gives 15 and `srai x3,x1,28` gives -1.',
      'On `five` with perfect caches and full forwarding: five independent instructions take 9 cycles, and `lw x1,0(x2)` then `add x3,x1,x1` takes 7. With no forwarding, `add x1,x2,x3` then `sub x4,x1,x5` takes 8 cycles, against 6 with forwarding.',
      'The countdown `addi x1,x0,10`, `loop: addi x1,x1,-1`, `bne x1,x0,loop`, `ecall` runs 22 dynamic instructions. It takes 44 cycles with `not-taken`, from 9 taken branches at 2 cycles each, and 30 cycles with `bimodal` counters that start weakly not-taken, from 2 mispredictions.',
      'Caches: accesses 0x0000, 0x0400, 0x0000, 0x0400 give 4 misses in a 1 KiB direct-mapped cache with 16-byte lines, and 2 misses and 2 hits in a 2-way cache of the same size. Soft-float, as bit patterns: 0x3DCCCCCD + 0x3E4CCCCD = 0x3E99999A, 0x3F800000 + 0x33800000 = 0x3F800000 (a tie to even), 0x3F800001 + 0x33800000 = 0x3F800002, 0x00800000 - 0x007FFFFF = 0x00000001, and 0x7F7FFFFF + 0x7F7FFFFF = 0x7F800000. Add and multiply match native `float` on 1,000,000 seeded random pairs, comparing every non-NaN result bit for bit.',
      'Explorer: two runs with the same inputs produce byte-identical CSV files, run time equals instructions x CPI x period for every row to within 0.1%, and the best run time at 120,000 gates is never worse than at 60,000.',
    ],
    coverage: [
      { module: 'boolean-logic-and-gates', demonstrates: 'Every datapath block reduces to `Nand` through your HDL, and the cost engine reports true gate counts and depth.' },
      { module: 'arithmetic-and-alu', demonstrates: 'Ripple, lookahead and carry-select adders and the 32-bit ALU are compared by NANDs, depth and their effect on clock period.' },
      { module: 'sequential-logic-and-memory', demonstrates: 'The register file and pipeline registers use `DFF`, and critical paths are measured between registers, which sets the clock period.' },
      { module: 'machine-language-and-cpu', demonstrates: 'The simulator implements fetch, decode and execute for a full ISA, and the single-cycle design is the baseline datapath.' },
      { module: 'assembler', demonstrates: '`rvasm` is a two-pass assembler with symbols, forward references and pseudo-instructions, and it builds at least three workloads.' },
      { module: 'performance-pipelining-caches', demonstrates: 'Hazards, predictors, caches, the iron law and Amdahl\'s law are the core of the simulator and the results.' },
      { module: 'data-representation', demonstrates: 'Sign-extending loads, immediates, little-endian memory and a bit-exact IEEE 754 soft-float library are all implemented and tested.' },
    ],
    portfolio: [
      'The README opens with the one-line `explore` command, its output, and the Pareto plot, followed by build instructions that work on a fresh machine.',
      'GitHub Actions builds the simulator, runs all tests and reruns a small sweep on every push, with a status badge in the README.',
      '`docs/RESULTS.md` states at least three findings with plots, including one that surprised you, and `docs/MODEL.md` lists what the model leaves out.',
      'A short GIF shows the pipeline diagram and a stall appearing, so a visitor sees the tool working without installing it.',
      'The repository has a LICENSE, a tagged `v1.0.0` release with saved sweep results, and small, descriptive commits.',
    ],
    stretchGoals: [
      'Write the winning design for one budget in Verilog, run it under Icarus through WSL, and compare its cycle count with the simulator on every workload.',
      'Add the M extension, with a multiplier you cost in HDL, and find the budget at which it starts to pay.',
      'Pass the official `rv32ui` tests from the riscv-tests repository.',
    ],
    resources: [
      {
        title: 'RISC-V Ratified Specifications',
        url: 'https://riscv.org/specifications/ratified/',
        type: 'documentation',
        cost: 'free',
        provider: 'RISC-V International',
        note: 'The unprivileged manual defines RV32I encodings. Use it as the source of truth for the simulator and assembler.',
      },
    ],
  },
});
