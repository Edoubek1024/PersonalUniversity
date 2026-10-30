import { defineSubject } from '../define';

export default defineSubject({
  id: 'embedded-systems-iot',
  title: 'Embedded Systems and IoT',
  category: 'cs',
  tagline:
    'Program microcontrollers from the registers up: GPIO, interrupts, serial buses and sensors, real-time operating systems, power budgets, wireless connectivity, and firmware you can ship.',
  description: `An embedded system is a computer that is part of something else: a thermostat, a pacemaker, a satellite, a car's brake controller. It has kilobytes of RAM instead of gigabytes, no operating system or a very small one, hard deadlines, a power budget measured in microamps, and it must run for years without anyone pressing reset. Programming one means dealing directly with the hardware you studied in computer architecture and the C you learned in systems programming, with no layers in between.

This subject is built around cheap, well-documented hardware: the Raspberry Pi Pico (RP2040), the ESP32, and Arduino boards, with the Wokwi browser simulator and QEMU as alternatives so that every exercise can be done without buying anything. You start by blinking an LED by writing to a register address from a datasheet, and work up through interrupts and timers, UART/I2C/SPI drivers for real sensors, FreeRTOS and Zephyr, analog measurement and sleep modes, Wi-Fi, MQTT and Bluetooth Low Energy, and finally the engineering practices that separate a hobby sketch from production firmware: layered architecture, host-side testing, bootloaders, over-the-air updates, secure boot, watchdogs and field debugging.

Primary free resources are the official vendor documentation (RP2040 datasheet and Pico SDK, ESP-IDF, Arduino reference), the FreeRTOS and Zephyr documentation, the MQTT specification, Memfault's Interrupt blog, and Jonathan Valvano's UT Austin course material; Elecia White's *Making Embedded Systems* is recommended but not required. The capstone is a battery-powered sensor node that logs and transmits data to a dashboard, supports over-the-air updates, and comes with a measured power budget.`,
  difficulty: 'intermediate',
  estimatedHours: 90,
  prerequisites: ['systems-programming', 'computer-architecture'],
  recommendedBackground: [
    'Comfortable C (pointers, bit manipulation, structs); some Python for host-side tools',
    'Basic electronics: Ohm\'s law, what a pull-up resistor does, how to read a schematic',
    'A Raspberry Pi Pico or ESP32 board (about 5-10 USD) plus a few LEDs, buttons and an I2C sensor is ideal; Wokwi covers most exercises without hardware',
  ],
  tags: ['embedded', 'microcontrollers', 'IoT', 'RTOS', 'FreeRTOS', 'Zephyr', 'MQTT', 'BLE', 'firmware', 'Raspberry Pi Pico', 'ESP32'],
  core: false,
  modules: [
    {
      slug: 'microcontroller-foundations',
      title: 'Microcontroller Foundations',
      description:
        'What a microcontroller is, how to get a toolchain working on real and simulated boards, how to drive hardware through memory-mapped registers from a datasheet, and what happens between reset and main().',
      lessons: [
        {
          slug: 'what-is-an-embedded-system',
          title: 'What is an embedded system?',
          summary:
            'Microcontrollers vs microprocessors, the ARM Cortex-M and RISC-V families, the anatomy of an MCU (core, flash, SRAM, peripherals, clocks) and the constraints that shape embedded software.',
          estimatedMinutes: 90,
          objectives: [
            'Distinguish a microcontroller from a microprocessor/SoC and give examples of each with typical specs',
            'Describe the blocks of an MCU (core, flash, SRAM, bus, peripherals, clock tree, power domains) and locate them in a datasheet block diagram',
            'Explain the constraints of embedded software: memory, power, determinism, reliability, cost, and no MMU',
            'Choose between bare metal, RTOS and embedded Linux for a given product',
          ],
          concepts: [
            'MCU vs MPU/SoC; Cortex-M vs Cortex-A',
            'Harvard-style buses, flash (XIP) and SRAM',
            'Peripherals: GPIO, timers, UART, I2C, SPI, ADC, DMA',
            'Clock tree, PLLs and power domains',
            'No MMU: flat address space, no processes',
            'Determinism and worst-case execution time',
            'Bare metal vs RTOS vs embedded Linux',
            'Development board vs production hardware',
          ],
          explanation: `A **microcontroller** (MCU) is a complete computer on one chip: a CPU core, flash memory for code, SRAM for data, and a set of **peripherals** (timers, serial ports, analog converters, GPIO) that let it sense and control the physical world. The RP2040 on the Raspberry Pi Pico has two ARM Cortex-M0+ cores at 133 MHz, 264 KB of SRAM and runs code from external flash; an ESP32 has two Xtensa (or RISC-V) cores at 240 MHz with Wi-Fi and Bluetooth radios; an ATmega328 on an Arduino Uno has 2 KB of RAM. A **microprocessor** or SoC such as the one in a Raspberry Pi 4 has an MMU, gigabytes of external DRAM, and runs Linux. The MCU costs a dollar, boots in milliseconds, and sips microamps asleep; the SoC does neither.

Open the RP2040 datasheet to the block diagram and find each piece: the cores, the bus fabric connecting them to memory and peripherals, the **clock tree** (a crystal, PLLs multiplying it up, dividers feeding each peripheral), and the **power domains** that can be switched off. Every peripheral is a block of registers at a fixed address; the next lessons are about driving them.

The constraints shape everything. **Memory** is tiny: no heap fragmentation can be tolerated, so dynamic allocation is avoided or done once at startup. There is **no MMU**, so a wild pointer corrupts the system rather than crashing a process, and there are no processes at all, only the code you flashed. **Power** may be a coin cell that must last a year. **Determinism** matters: a motor controller must respond within microseconds every time, so the worst case, not the average, is what you design for. **Reliability** means handling every error path because nobody will reboot it.

Three software models exist. **Bare metal**: a main loop plus interrupts, total control, suits small systems. An **RTOS** (FreeRTOS, Zephyr): tasks with priorities and real-time scheduling, suits systems with several concurrent activities and a radio stack. **Embedded Linux**: when you need a file system, networking stack and gigabytes, at the cost of power and boot time. This subject covers the first two.

Read chapter 1 of the RP2040 datasheet and the first lecture of Valvano's course, and skim Making Embedded Systems chapter 1 if you have it.`,
          resources: [
            {
              title: 'RP2040 Datasheet',
              url: 'https://datasheets.raspberrypi.com/rp2040/rp2040-datasheet.pdf',
              type: 'documentation',
              cost: 'free',
              provider: 'Raspberry Pi',
              note: 'Chapter 1 (introduction) and 2.1 (bus fabric and block diagram). This datasheet is the reference for the whole subject.',
              primary: true,
            },
            {
              title: 'Jonathan Valvano — Embedded Systems courses at UT Austin (EE319K/EE445L materials)',
              url: 'http://users.ece.utexas.edu/~valvano/',
              type: 'course',
              cost: 'free',
              provider: 'University of Texas at Austin',
              note: 'Lecture notes, videos and labs for ARM Cortex-M bare-metal programming; the free course companion to this subject.',
            },
            {
              title: 'Making Embedded Systems, 2nd ed. (Elecia White)',
              url: 'https://www.oreilly.com/library/view/making-embedded-systems/9781449308889/',
              type: 'textbook',
              cost: 'paid',
              provider: "O'Reilly",
              note: 'Chapters 1-2 on the embedded mindset and reading schematics/datasheets. Paid; Valvano\'s materials and the vendor docs are the free alternative.',
            },
            {
              title: 'Embedded Systems - Shape the World (edX, UT Austin)',
              url: 'https://www.edx.org/learn/embedded-systems/the-university-of-texas-at-austin-embedded-systems-shape-the-world-microcontroller-input-output',
              type: 'course',
              cost: 'freemium',
              provider: 'edX',
              note: 'Free to audit; the MOOC version of Valvano\'s course.',
            },
          ],
          exercises: [
            {
              slug: 'datasheet-scavenger-hunt',
              title: 'Datasheet scavenger hunt',
              prompt:
                'Using the RP2040 datasheet, find and record with section numbers: SRAM size and how it is banked, the maximum system clock, the number of GPIO pins and how many ADC inputs, the base address of the SIO and IO_BANK0 blocks, the crystal frequency on the Pico and the PLL settings that produce 125 MHz, and the sleep-mode current. Repeat for the ESP32 (technical reference manual) for SRAM, clock and GPIO count.',
              kind: 'reading',
              difficulty: 1,
            },
            {
              slug: 'choose-the-platform',
              title: 'Choose a platform for three products',
              prompt:
                'For (a) a battery-powered door sensor reporting over BLE, (b) a smart speaker with voice recognition and Wi-Fi, (c) a brushless motor controller for a drone, choose bare metal, RTOS or embedded Linux and a concrete chip, and justify in a paragraph each with numbers: RAM needed, power budget, timing requirements, cost.',
              kind: 'writing',
              difficulty: 1,
            },
            {
              slug: 'memory-map-sketch',
              title: 'Draw the RP2040 memory map',
              prompt:
                'From datasheet section 2.2, draw the RP2040 address map (ROM, XIP flash, SRAM banks, APB peripherals, AHB-Lite peripherals, SIO, Cortex-M0+ internal) to scale on a log axis, and compare it with the Hack computer memory map from the architecture subject: what is memory-mapped I/O in each, and what does the MCU have that Hack lacks?',
              kind: 'problem',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Name three ways an MCU differs from the processor in a laptop.',
              answerOutline:
                'On-chip flash and SRAM (KB not GB), no MMU/virtual memory, integrated peripherals (timers, ADC, serial), microwatt sleep modes, runs one flashed program rather than an OS with processes.',
            },
            {
              question: 'Why is worst-case timing more important than average timing in embedded systems?',
              answerOutline:
                'Deadlines are physical (motor commutation, sensor sampling); missing one occasionally can damage hardware or lose data, so the design must bound the worst case.',
            },
            {
              question: 'When would you pick an RTOS over bare metal?',
              answerOutline:
                'When several concurrent activities with different timing needs exist (e.g. a radio stack plus sensing plus UI), making a single super-loop hard to reason about.',
            },
          ],
        },
        {
          slug: 'toolchain-and-first-blink',
          title: 'Toolchain, flashing and the first blink',
          summary:
            'Setting up the Pico SDK (and, as alternatives, Arduino, ESP-IDF and Wokwi), cross-compiling, flashing, and running a blink program on real hardware and in simulation.',
          estimatedMinutes: 120,
          objectives: [
            'Install a cross-compiler toolchain (arm-none-eabi-gcc) and build a Pico SDK project with CMake',
            'Flash a binary to a board via UF2 or a debug probe and see it run',
            'Run the same program in the Wokwi simulator and explain what the simulator does and does not model',
            'Compare the Pico SDK, Arduino and ESP-IDF workflows and know when each is appropriate',
          ],
          concepts: [
            'Cross-compilation: host vs target',
            'arm-none-eabi-gcc, newlib, CMake toolchain files',
            'ELF, .bin, .hex and UF2 image formats',
            'Flashing: UF2 bootloader, picotool, esptool, debug probes',
            'Wokwi and QEMU as simulators',
            'Pico SDK vs Arduino core vs ESP-IDF',
            'Serial console over USB CDC for printf',
            'Build size: text/data/bss on a tiny target',
          ],
          explanation: `Embedded development is **cross-compilation**: you compile on your PC (the host) for a different CPU (the target). The toolchain is \`arm-none-eabi-gcc\` for Cortex-M, with newlib as a minimal C library, and the Pico SDK wraps it with CMake: a \`CMakeLists.txt\` that calls \`pico_sdk_init()\`, adds your sources, links \`pico_stdlib\`, and generates a **UF2** file. Flashing a Pico is drag-and-drop: hold BOOTSEL, plug in, copy the UF2 to the USB drive that appears, and the chip's ROM bootloader writes it to flash and reboots. Later you will use a debug probe (a second Pico running debugprobe firmware, or the official Debug Probe) with OpenOCD, which also gives you gdb.

The first program is **blink**: configure GPIO 25 as an output, then loop setting it high and low with a delay. In the SDK that is \`gpio_init\`, \`gpio_set_dir\`, \`gpio_put\` and \`sleep_ms\`; in the next lesson you will do the same by writing registers yourself. Add \`stdio_init_all()\` and \`printf\` to get text over USB serial, which is your primary debugging channel until you have a probe.

Three ecosystems coexist and you should be able to use all of them. The **Pico SDK** (C, CMake) is close to the metal with good documentation. **Arduino** wraps many boards in a simple C++ API (\`pinMode\`, \`digitalWrite\`) with a huge library ecosystem; it is the fastest way to try a sensor, and PlatformIO makes it a proper build system. **ESP-IDF** is Espressif's FreeRTOS-based framework for the ESP32, essential for Wi-Fi and Bluetooth work in modules 4 and 6.

If you have no board, **Wokwi** simulates the Pico, ESP32 and Arduino in the browser with virtual LEDs, buttons, sensors and a logic analyser, and runs real compiled firmware. It models peripherals functionally but not timing-accurately or electrically, so it is excellent for logic and protocols and useless for power measurement or signal integrity. **QEMU** can emulate some Cortex-M boards for RTOS experiments.

Follow the Getting Started with Pico guide for your OS, build and flash blink, then run the same binary in Wokwi. Check \`arm-none-eabi-size\` on the ELF and note how little memory blink takes.`,
          resources: [
            {
              title: 'Getting started with Raspberry Pi Pico (C/C++ SDK setup)',
              url: 'https://datasheets.raspberrypi.com/pico/getting-started-with-pico.pdf',
              type: 'documentation',
              cost: 'free',
              provider: 'Raspberry Pi',
              note: 'Chapters 1-4: toolchain install on Linux/macOS/Windows, building blink, flashing via UF2.',
              primary: true,
            },
            {
              title: 'Raspberry Pi Pico-series C/C++ SDK (PDF)',
              url: 'https://datasheets.raspberrypi.com/pico/raspberry-pi-pico-c-sdk.pdf',
              type: 'documentation',
              cost: 'free',
              provider: 'Raspberry Pi',
            },
            {
              title: 'pico-examples repository',
              url: 'https://github.com/raspberrypi/pico-examples',
              type: 'documentation',
              cost: 'free',
              provider: 'Raspberry Pi',
              note: 'Reference code for every peripheral; blink and hello_world first.',
            },
            {
              title: 'Wokwi — online electronics simulator',
              url: 'https://wokwi.com/',
              type: 'tool',
              cost: 'freemium',
              provider: 'Wokwi',
              note: 'Simulates Pico, ESP32 and Arduino with virtual parts; free tier is enough for this subject.',
            },
            {
              title: 'ESP-IDF Get Started',
              url: 'https://docs.espressif.com/projects/esp-idf/en/latest/esp32/get-started/index.html',
              type: 'documentation',
              cost: 'free',
              provider: 'Espressif',
              note: 'Install ESP-IDF now if you have an ESP32; it is used in modules 4, 6 and 7.',
            },
          ],
          exercises: [
            {
              slug: 'blink-three-ways',
              title: 'Blink three ways',
              prompt:
                'Build and run blink with the Pico SDK on hardware or Wokwi, then the same behaviour in Arduino (any board, Wokwi is fine) and, if you have an ESP32, in ESP-IDF. For each record: lines of code, build time, binary size (arm-none-eabi-size or the IDF size report), and the exact commands used. Modify each to blink SOS in Morse code with correct dot/dash/gap timing.',
              kind: 'coding',
              difficulty: 1,
            },
            {
              slug: 'serial-hello',
              title: 'Hello over USB serial',
              prompt:
                'Add stdio over USB to the Pico project, print a counter every 500 ms, and read it with a terminal program (minicom, screen, PuTTY or the Wokwi serial monitor). Then print sizeof(int), sizeof(long), sizeof(void*), and the address of a stack variable, a global, and a function; relate each to the memory map from the previous lesson.',
              kind: 'coding',
              difficulty: 1,
            },
            {
              slug: 'inspect-the-elf',
              title: 'Inspect the firmware image',
              prompt:
                'Run arm-none-eabi-size, arm-none-eabi-nm --size-sort and arm-none-eabi-objdump -h on blink.elf. Identify the largest symbols and which sections (.text, .data, .bss) they live in. Explain where .data\'s initial values are stored in flash and where they end up in RAM. Then add a 10 KB const table and a 10 KB global array and see which section grows.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What is cross-compilation and why is it needed for embedded work?',
              answerOutline:
                'Compiling on one architecture (x86 PC) for another (Cortex-M); the target cannot host a compiler, so the host produces an image that is flashed to it.',
            },
            {
              question: 'What does a UF2 file contain and how does the Pico use it?',
              answerOutline:
                'Blocks of flash data with target addresses in a USB-mass-storage-friendly format; the ROM bootloader (BOOTSEL mode) writes them to flash and reboots.',
            },
            {
              question: 'Name two things Wokwi models well and two it cannot.',
              answerOutline:
                'Well: peripheral logic, protocols, program behaviour. Not: electrical characteristics, exact timing/latency, power consumption, radio behaviour.',
            },
          ],
        },
        {
          slug: 'memory-mapped-io-and-registers',
          title: 'Memory-mapped I/O and registers from the datasheet',
          summary:
            'Driving a peripheral by writing to its registers directly: reading the register map, volatile, bit fields, read-modify-write hazards and the atomic set/clear aliases.',
          estimatedMinutes: 150,
          objectives: [
            'Blink an LED with no SDK calls by writing the RP2040 GPIO and SIO registers from the datasheet',
            'Explain why peripheral registers must be accessed through volatile pointers and what the compiler would otherwise do',
            'Perform safe read-modify-write of bit fields and explain the hazard with interrupts',
            'Use vendor register definitions (CMSIS-style headers) and the RP2040 atomic set/clear/xor register aliases',
          ],
          concepts: [
            'Register map: base address + offset',
            'volatile and why the optimiser must not cache or reorder',
            'Bit fields, masks, shifts for register layout',
            'Read-modify-write and its race with ISRs',
            'Atomic register aliases (RP2040) and bit-band regions',
            'Function select (pin muxing) and pad control',
            'Write-1-to-clear status registers',
            'CMSIS and vendor header files',
          ],
          explanation: `The architecture subject showed you memory-mapped I/O in the Hack computer: write to address 16384 and pixels change. Real MCUs work the same way. The RP2040 datasheet lists every peripheral as a **base address** and a table of **registers** at offsets, each with named **bit fields**. To blink an LED on GPIO 25 you need three blocks: \`IO_BANK0\` to select the pin's function (GPIO25_CTRL register, FUNCSEL field = 5 for SIO), \`PADS_BANK0\` to enable the output driver, and \`SIO\` (the single-cycle I/O block) whose \`GPIO_OE_SET\` and \`GPIO_OUT_SET\`/\`GPIO_OUT_CLR\` registers set the direction and the level. Each is just a 32-bit word at an address; in C, \`*(volatile uint32_t *)(0xd0000000 + 0x14) = 1u << 25;\`.

The word **volatile** is not optional. It tells the compiler that every read and write to that location has an effect it cannot see, so it must not cache the value in a register, merge two writes, reorder them with respect to other volatile accesses, or delete a read whose result is unused. Without it, \`while (!(STATUS & READY));\` becomes an infinite loop at -O2 because the compiler reads STATUS once. Note that volatile does not make an access atomic or order it with respect to non-volatile memory; for that you need barriers (\`__DMB()\`).

Most registers pack several fields, so changing one means **read-modify-write**: read the word, clear the field with a mask, OR in the new value, write back. If an interrupt handler modifies the same register between your read and your write, its change is lost. This is a real and common bug. Solutions: disable interrupts around the sequence, or use hardware help: the RP2040 maps every register three more times at offsets \`+0x1000\` (atomic XOR), \`+0x2000\` (atomic set) and \`+0x3000\` (atomic clear), so a single write flips exactly the bits you name. Other families offer bit-banding or separate set/clear registers; check your datasheet.

Two more conventions: status registers are often **write-1-to-clear** (writing 1 to a flag bit clears it; writing 0 does nothing), and pins are **multiplexed**, so you must select which peripheral owns a pin before it does anything. Vendor headers (\`hardware/structs/sio.h\` in the SDK, CMSIS device headers elsewhere) give you named structs and masks so you never type an address; use them, but only after you have done it by hand once.`,
          resources: [
            {
              title: 'RP2040 Datasheet — section 2.3 (SIO), 2.19 (GPIO) and 2.1.2 (atomic register access)',
              url: 'https://datasheets.raspberrypi.com/rp2040/rp2040-datasheet.pdf',
              type: 'documentation',
              cost: 'free',
              provider: 'Raspberry Pi',
              primary: true,
            },
            {
              title: 'Pico SDK — hardware_gpio and hardware/structs headers',
              url: 'https://www.raspberrypi.com/documentation/pico-sdk/hardware.html',
              type: 'documentation',
              cost: 'free',
              provider: 'Raspberry Pi',
              note: 'Read gpio.c in the SDK source to see the register writes behind gpio_init and gpio_put.',
            },
            {
              title: 'Jonathan Valvano — Embedded Systems: Introduction to ARM Cortex-M Microcontrollers (course notes and videos)',
              url: 'http://users.ece.utexas.edu/~valvano/',
              type: 'course',
              cost: 'free',
              provider: 'University of Texas at Austin',
              note: 'The I/O port chapters explain friendly (read-modify-write) code and bit-specific addressing.',
            },
            {
              title: 'CMSIS 5 documentation (Core, device headers, intrinsics)',
              url: 'https://arm-software.github.io/CMSIS_5/General/html/index.html',
              type: 'documentation',
              cost: 'free',
              provider: 'Arm',
              note: 'The standard way vendor headers expose registers on Cortex-M, and the barrier intrinsics __DMB/__DSB/__ISB.',
            },
          ],
          exercises: [
            {
              slug: 'bare-register-blink',
              title: 'Blink with raw registers',
              prompt:
                'Write blink for the Pico using only volatile pointer writes to addresses you look up in the datasheet (IO_BANK0 GPIO25_CTRL, PADS_BANK0, SIO GPIO_OE_SET, GPIO_OUT_SET/CLR), with a busy-wait delay loop; no SDK calls except the startup code. Run on hardware or Wokwi. Then remove volatile, build at -O2, and explain from the disassembly (objdump -d) why the LED stops blinking.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'rmw-race-demo',
              title: 'Reproduce the read-modify-write race',
              prompt:
                'Configure two GPIOs as outputs. In main, toggle GPIO A in a loop using a non-atomic read-modify-write of GPIO_OUT; in a timer interrupt firing every 1 ms, toggle GPIO B the same way. Observe (logic analyser in Wokwi or on hardware) that one of the pins occasionally stays stuck. Fix it first with interrupt disabling (save/restore PRIMASK) and then with the RP2040 atomic XOR alias, and show both fixes work.',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'register-struct-overlay',
              title: 'A register struct overlay',
              prompt:
                'Define a packed struct of volatile uint32_t fields matching the SIO GPIO registers in datasheet order, with _Static_assert checks on the offsets (offsetof) against the datasheet. Rewrite your raw blink to use the struct through a pointer at the base address and confirm identical behaviour and identical assembly. Compare with the SDK\'s sio_hw_t.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What would the compiler do with a status-polling loop if the register pointer were not volatile?',
              answerOutline:
                'Hoist the single load out of the loop (or delete it), turning the poll into an infinite loop or a no-op, since it sees no reason the value would change.',
            },
            {
              question: 'Why is read-modify-write of a shared register dangerous with interrupts, and what are two fixes?',
              answerOutline:
                'An ISR may modify the register between the read and the write, and its change is overwritten. Fixes: disable interrupts around the sequence, or use atomic set/clear/xor aliases or separate set/clear registers.',
            },
            {
              question: 'What does write-1-to-clear mean?',
              answerOutline:
                'Writing a 1 to a flag bit clears it (acknowledges the event) while writing 0 leaves it unchanged; it lets you clear one flag without a read-modify-write.',
            },
          ],
          relatedLessons: ['computer-architecture/machine-language-and-cpu/the-hack-computer'],
        },
        {
          slug: 'startup-code-linker-scripts-and-debugging',
          title: 'From reset to main: startup code, linker scripts and debugging with a probe',
          summary:
            'The vector table, what the reset handler does before main (copy .data, zero .bss, set up clocks), how the linker script places code and data in flash and RAM, and debugging with SWD, OpenOCD and gdb.',
          estimatedMinutes: 150,
          objectives: [
            'Explain the Cortex-M boot sequence: vector table, initial stack pointer, reset handler, .data copy and .bss zeroing',
            'Read a linker script and explain MEMORY regions, SECTIONS, and the LMA/VMA distinction for .data',
            'Set up SWD debugging with OpenOCD and gdb (or the Pico Debug Probe), set breakpoints, inspect registers and memory',
            'Measure stack usage and place a buffer in a specific memory region with section attributes',
          ],
          concepts: [
            'Vector table: SP initial value, reset vector, exception vectors',
            'Reset handler and crt0: .data copy, .bss zero, constructors',
            'Linker script: MEMORY, SECTIONS, LMA vs VMA',
            'Flash XIP and the RP2040 second-stage bootloader',
            'SWD/JTAG, OpenOCD, gdb remote target',
            'Semihosting and RTT vs UART printf',
            'Stack placement and overflow detection',
            'Map files and arm-none-eabi-objdump',
          ],
          explanation: `When a Cortex-M comes out of reset it does exactly two things in hardware: load the **initial stack pointer** from address 0 of the vector table and jump to the **reset handler** whose address is at offset 4. The **vector table** is an array of function pointers, one per exception and interrupt, placed at the start of flash by the linker. Everything after that is software you can read. The reset handler, from the SDK's \`crt0.S\` or a vendor startup file, copies the initial values of \`.data\` from flash to RAM, zeroes \`.bss\`, sets up the clocks and the C runtime, runs constructors, and finally calls \`main\`. The "Zero to main()" series on the Memfault Interrupt blog walks through every instruction; read it with the SDK's \`crt0.S\` open.

Where things go is decided by the **linker script** (\`memmap_default.ld\` in the SDK). \`MEMORY\` declares regions: \`FLASH\` at \`0x10000000\` (the RP2040 executes code directly from external flash via XIP) and \`RAM\` at \`0x20000000\`. \`SECTIONS\` assigns input sections to regions: \`.text\` and \`.rodata\` to flash, \`.bss\` to RAM, and \`.data\` with a **load address (LMA)** in flash and a **virtual address (VMA)** in RAM, which is why the reset handler must copy it. The script also defines symbols such as \`__data_start__\` that the startup code uses. The RP2040 adds a twist: the first 256 bytes of flash are a **second-stage bootloader** that configures the flash chip's fast mode before the main image can run. The systems-programming linking lesson is the background for all this.

For debugging you want a **probe**: a Pico running debugprobe firmware or the official Debug Probe connects to the target's SWD pins. **OpenOCD** talks to the probe and exposes a gdb remote target; \`arm-none-eabi-gdb\` then does everything you learned on the host: breakpoints (hardware, limited to a few on Cortex-M0+), single-stepping, \`info registers\`, examining memory, and \`load\` to flash. Alternatives for output are UART printf, **semihosting** (slow, needs the debugger attached) and SEGGER RTT.

Finally, the stack. There is no guard page: a stack overflow silently overwrites whatever lies below, usually \`.bss\`. Learn to read the **map file** to see where the stack is, fill the stack with a pattern at boot to measure high-water usage, and place big buffers deliberately with \`__attribute__((section(...)))\`.`,
          resources: [
            {
              title: 'From Zero to main(): Bare metal C (Memfault Interrupt)',
              url: 'https://interrupt.memfault.com/blog/zero-to-main-1',
              type: 'article',
              cost: 'free',
              provider: 'Memfault',
              note: 'The series (bare metal C, bootstrapping libc, demystifying the linker script) is the best free treatment of this lesson.',
              primary: true,
            },
            {
              title: 'Raspberry Pi Debug Probe documentation',
              url: 'https://www.raspberrypi.com/documentation/microcontrollers/debug-probe.html',
              type: 'documentation',
              cost: 'free',
              provider: 'Raspberry Pi',
              note: 'Wiring, OpenOCD and gdb commands; also covers using a second Pico as the probe.',
            },
            {
              title: 'OpenOCD User\'s Guide',
              url: 'https://openocd.org/doc/html/index.html',
              type: 'documentation',
              cost: 'free',
              provider: 'OpenOCD',
            },
            {
              title: 'RP2040 Datasheet — section 2.8 (bootrom) and 2.6 (XIP)',
              url: 'https://datasheets.raspberrypi.com/rp2040/rp2040-datasheet.pdf',
              type: 'documentation',
              cost: 'free',
              provider: 'Raspberry Pi',
            },
            {
              title: 'GDB documentation',
              url: 'https://sourceware.org/gdb/documentation/',
              type: 'documentation',
              cost: 'free',
              provider: 'GNU',
            },
          ],
          exercises: [
            {
              slug: 'trace-reset-to-main',
              title: 'Trace from reset to main in gdb',
              prompt:
                'With a probe (or QEMU for a supported Cortex-M board), reset the target and halt. Record the initial SP and PC, confirm they match words 0 and 1 of the vector table (x/2wx 0x10000100 on RP2040 after the boot2 stage), then single-step through the reset handler, noting the .data copy loop and .bss zero loop, until main. Produce an annotated log.',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'linker-script-experiments',
              title: 'Linker script experiments',
              prompt:
                'Generate a map file (-Wl,-Map) for blink and locate .text, .rodata, .data (both LMA and VMA), .bss, the heap and the stack. Add an initialised global array and confirm its LMA in flash and VMA in RAM. Then add a custom section placed in a specific SRAM bank (e.g. scratch_y on RP2040) and verify its address with nm. Explain what would break if .data were not copied.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'stack-high-water-mark',
              title: 'Measure stack usage',
              prompt:
                'At the start of main, fill the unused stack with 0xA5 bytes down to the stack limit from the map file. Write a recursive function with a configurable depth, call it, then scan the stack to find the high-water mark and print it. Find the depth at which the stack overwrites a .bss sentinel variable and show the corruption. Describe how an MPU region or a stack-limit register (ARMv8-M) would catch this.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What are the first two words of a Cortex-M vector table and who reads them?',
              answerOutline:
                'The initial main stack pointer and the reset handler address; the hardware loads them on reset before any software runs.',
            },
            {
              question: 'Why does .data have two addresses and what must startup code do about it?',
              answerOutline:
                'Its initial values are stored in flash (LMA) but variables live in RAM (VMA); the reset handler copies the bytes from LMA to VMA before main.',
            },
            {
              question: 'What happens on a stack overflow on an MCU without an MMU?',
              answerOutline:
                'No fault: the stack silently overwrites adjacent memory (typically .bss or heap), causing corruption that shows up later; detection needs patterns, an MPU guard region, or a stack-limit register.',
            },
          ],
          relatedLessons: ['systems-programming/the-toolchain/linking-and-libraries'],
        },
      ],
      project: {
        slug: 'bare-metal-from-scratch',
        title: 'Project: a bare-metal project with your own startup code',
        description: `Build a Pico (or other Cortex-M) project that uses no vendor startup files: write the vector table, reset handler (.data copy, .bss zero), linker script and a minimal UART driver yourself, then blink an LED and print a banner over UART. Build it with a plain Makefile calling arm-none-eabi-gcc. Compare your image size with the SDK blink.`,
        deliverables: [
          'startup.c/.S, linker script, Makefile, main.c and uart.c with register-level comments citing datasheet sections',
          'A gdb session log showing the boot sequence stepping into your main',
          'A size comparison with the SDK build and an explanation of the difference',
        ],
        estimatedHours: 8,
        stretchGoals: ['Support C++ static constructors and verify with a global object whose constructor prints'],
      },
    },
    {
      slug: 'gpio-timers-interrupts',
      title: 'GPIO, Timers and Interrupts',
      description:
        'The three primitives of bare-metal programming: digital inputs and outputs with proper electrical handling, interrupts and how to write ISRs that do not break things, hardware timers and PWM, and structuring a system as a super-loop of state machines.',
      lessons: [
        {
          slug: 'gpio-and-debouncing',
          title: 'GPIO: inputs, outputs, pull-ups and debouncing',
          summary:
            'Push-pull and open-drain outputs, pull-up/pull-down inputs, driving LEDs and reading buttons correctly, and the switch-bounce problem with hardware and software solutions.',
          estimatedMinutes: 120,
          objectives: [
            'Configure GPIO as output (push-pull, open-drain, drive strength, slew) and input (pull-up, pull-down, Schmitt trigger) and explain each option electrically',
            'Size a current-limiting resistor for an LED and know the GPIO current limits',
            'Observe switch bounce on a logic analyser or by counting edges, and implement a robust software debounce',
            'Read multiple inputs efficiently by reading the whole port and masking',
          ],
          concepts: [
            'Push-pull vs open-drain outputs',
            'Pull-up/pull-down resistors and floating inputs',
            'Active-low logic',
            'Source/sink current limits and LED resistors',
            'Schmitt trigger input hysteresis',
            'Switch bounce (1-20 ms)',
            'Debouncing: RC filter, periodic sampling, integrator/counter',
            'Edge vs level detection',
          ],
          explanation: `A GPIO pin is a transistor pair that can drive the pin high, drive it low, or let it float, plus an input buffer. A **push-pull** output actively drives both levels; an **open-drain** output can only pull low and needs an external pull-up, which lets several devices share a line (that is how I2C works, in module 3). Outputs have limits: an RP2040 pin can source or sink a few milliamps at a configurable drive strength, so an LED needs a series resistor: $R = (V_{\\text{supply}} - V_{\\text{LED}}) / I$, about 330 ohms for 3.3 V, a 2 V red LED and 4 mA. Driving a motor or relay directly from a pin will destroy it; use a transistor.

An input that is connected to nothing is **floating**: it picks up noise and reads randomly. Every input must be pulled to a known level, either by an external resistor or the MCU's internal weak **pull-up/pull-down** (typically 50-100 kOhm). The standard button circuit is a pull-up with the button shorting the pin to ground, so the pin reads **active-low**: 1 when released, 0 when pressed. Inputs usually include a **Schmitt trigger**, which adds hysteresis so a slowly changing or noisy signal does not produce multiple transitions.

Mechanical switches **bounce**: the contacts make and break several times over 1-20 ms before settling, so a naive edge counter registers several presses. Jack Ganssle measured real switches and his article is the reference. A hardware fix is an RC filter feeding the Schmitt input. The usual software fix is **periodic sampling**: read the button every 5 ms from a timer and accept a new state only after it has been stable for N consecutive samples (an integrator). Never debounce with a blocking delay inside an interrupt.

Reading inputs one pin at a time is slow; read the whole 32-bit input register once and mask the bits you need, which is also atomic with respect to the pins' relative state. Work through the SDK's GPIO examples and Ganssle's article, then build the exercises, ideally with a logic analyser (a 10-dollar USB one with PulseView, or Wokwi's built-in one).`,
          resources: [
            {
              title: 'A Guide to Debouncing (Jack Ganssle)',
              url: 'http://www.ganssle.com/debouncing.htm',
              type: 'article',
              cost: 'free',
              provider: 'Jack Ganssle',
              note: 'Measurements of real switch bounce and several hardware and software solutions.',
              primary: true,
            },
            {
              title: 'RP2040 Datasheet — section 2.19 (GPIO) and 2.19.4 (pads)',
              url: 'https://datasheets.raspberrypi.com/rp2040/rp2040-datasheet.pdf',
              type: 'documentation',
              cost: 'free',
              provider: 'Raspberry Pi',
              note: 'Pull-up/down values, drive strength, Schmitt trigger and slew-rate control.',
            },
            {
              title: 'Arduino Reference — Digital I/O (pinMode, digitalRead, INPUT_PULLUP)',
              url: 'https://www.arduino.cc/reference/en/',
              type: 'documentation',
              cost: 'free',
              provider: 'Arduino',
            },
            {
              title: 'PulseView (sigrok) logic analyser software',
              url: 'https://sigrok.org/wiki/PulseView',
              type: 'tool',
              cost: 'free',
              provider: 'sigrok',
              note: 'Works with cheap FX2-based USB logic analysers; decodes UART, I2C and SPI too.',
            },
          ],
          exercises: [
            {
              slug: 'count-the-bounces',
              title: 'Count the bounces',
              prompt:
                'Wire a button (pull-up, active-low) and write a program that counts every falling edge on the pin using a tight polling loop, printing the count after 1 s of quiet. Press the button 20 times and record the count; it will exceed 20. If you have a logic analyser (or in Wokwi, which can simulate bounce on its pushbutton), capture one press and measure the bounce duration.',
              kind: 'coding',
              difficulty: 1,
            },
            {
              slug: 'integrator-debounce',
              title: 'Integrator debounce from a periodic timer',
              prompt:
                'Implement a debouncer sampled every 5 ms from a repeating timer: a counter per button that increments while pressed and decrements while released, saturating at 0 and N; the debounced state changes only at the ends. Count presses for 20 physical presses and confirm exactly 20. Then measure the worst-case latency from physical press to debounced press for N = 2, 4, 8 and discuss the trade-off.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'gpio-electrical-sizing',
              title: 'Size the resistors and check the limits',
              prompt:
                'For a 3.3 V MCU: compute the series resistor for a red (2.0 V) and a blue (3.0 V) LED at 5 mA; compute the current through a 10 kOhm pull-up when a button is pressed; determine from the datasheet the maximum current per pin and total for the chip, and decide how many LEDs at 5 mA you may drive directly. Then explain what happens if you configure a pin as output low while an external device drives it high.',
              kind: 'problem',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'Why must every GPIO input be pulled up or down?',
              answerOutline:
                'A floating input has no defined level and picks up noise, reading randomly and possibly oscillating; a pull resistor gives it a default state.',
            },
            {
              question: 'What is switch bounce and why is a blocking delay a poor debounce?',
              answerOutline:
                'Contacts make/break several times for 1-20 ms on each press. A delay blocks everything else, wastes CPU, is inappropriate in an ISR, and still misses late bounces.',
            },
            {
              question: 'When would you choose an open-drain output?',
              answerOutline:
                'When several devices share one line (wired-AND buses like I2C) or when interfacing to a different voltage level through an external pull-up.',
            },
          ],
        },
        {
          slug: 'interrupts-and-isr-design',
          title: 'Interrupts and ISR design',
          summary:
            'How the NVIC delivers interrupts on Cortex-M, writing handlers that are short, acknowledge the source and communicate safely with the main loop, priorities and nesting, and measuring interrupt latency.',
          estimatedMinutes: 150,
          objectives: [
            'Explain the Cortex-M exception entry/exit sequence (stacking, vector fetch, EXC_RETURN) and the NVIC enable/pending/priority registers',
            'Write a GPIO edge interrupt handler that clears the source and signals the main loop via a volatile flag or a lock-free queue',
            'Design priorities and explain preemption, tail-chaining and priority inversion of shared data',
            'Measure interrupt latency with a GPIO and a logic analyser and explain the sources of jitter',
          ],
          concepts: [
            'NVIC: enable, pending, priority, grouping',
            'Exception entry: automatic stacking of r0-r3, r12, lr, pc, xPSR',
            'ISR as a plain C function; vector table entry',
            'Clearing the interrupt source (W1C) and spurious re-entry',
            'Keep ISRs short; defer work to the main loop',
            'Shared data: volatile, critical sections, lock-free ring buffer',
            'Priorities, nesting, tail-chaining',
            'Interrupt latency and jitter',
          ],
          explanation: `Polling wastes power and misses short events; **interrupts** let hardware tell the CPU when something happened. On Cortex-M the **NVIC** (nested vectored interrupt controller) holds, per interrupt line, an enable bit, a pending bit and a priority. When an enabled interrupt becomes pending and its priority is higher (numerically lower) than the current execution, the core **stacks** eight registers automatically (\`r0-r3, r12, lr, pc, xPSR\`), fetches the handler address from the vector table, and jumps. Because the hardware follows the C calling convention when stacking, an ISR is an ordinary C function with no arguments; on return the core sees the magic \`EXC_RETURN\` value in \`lr\` and unstacks. Memfault's guide to Cortex-M exceptions covers this precisely, including **tail-chaining** (skipping unstack/stack between back-to-back interrupts) and late arrival.

The rules for a handler: **acknowledge the source first** (clear the peripheral's status flag, usually write-1-to-clear), or the interrupt re-fires the moment you return; **do as little as possible**: read the data, put it somewhere, set a flag, return; **never block** (no delays, no waiting on another interrupt of equal or lower priority, which deadlocks); and **never call non-reentrant code** such as \`printf\` or \`malloc\`. This is the same discipline as Unix signal handlers in the systems-programming subject, for the same reason.

Communication with the main loop needs care. A \`volatile\` flag works for a single event. For data, a **single-producer single-consumer ring buffer** with volatile head and tail indices is lock-free when each index is written by only one side and indices are naturally aligned words. Anything more complex needs a **critical section**: disable interrupts (\`__disable_irq\` / save and restore PRIMASK) or, better, raise \`BASEPRI\` to mask only interrupts that touch the shared data. Keep critical sections to a few instructions, because they add to the latency of every interrupt.

**Latency**, from the pin edge to the first instruction of the handler, is about 12 cycles on a Cortex-M0+ plus whatever critical sections and higher-priority handlers add; **jitter** is the variation. Measure it: set a GPIO at ISR entry and watch both on a logic analyser. Read the SDK's GPIO IRQ example and the NVIC chapter of the Cortex-M0+ user guide, then do the exercises.`,
          resources: [
            {
              title: 'A Practical Guide to ARM Cortex-M Exception Handling (Memfault Interrupt)',
              url: 'https://interrupt.memfault.com/blog/arm-cortex-m-exceptions-and-nvic',
              type: 'article',
              cost: 'free',
              provider: 'Memfault',
              primary: true,
            },
            {
              title: 'Cortex-M0+ Devices Generic User Guide — NVIC and exception model',
              url: 'https://developer.arm.com/documentation/dui0662/latest/',
              type: 'documentation',
              cost: 'free',
              provider: 'Arm',
              note: 'Chapter 2.3 (exception model) and 4.2 (NVIC registers).',
            },
            {
              title: 'Pico SDK — hardware_irq and gpio_set_irq_enabled_with_callback',
              url: 'https://www.raspberrypi.com/documentation/pico-sdk/hardware.html',
              type: 'documentation',
              cost: 'free',
              provider: 'Raspberry Pi',
            },
            {
              title: 'Arduino Reference — attachInterrupt()',
              url: 'https://docs.arduino.cc/language-reference/en/functions/external-interrupts/attachInterrupt/',
              type: 'documentation',
              cost: 'free',
              provider: 'Arduino',
              note: 'Note its warnings about delay(), millis() and volatile inside ISRs.',
            },
          ],
          exercises: [
            {
              slug: 'edge-interrupt-counter',
              title: 'Button interrupt with safe hand-off',
              prompt:
                'Configure a falling-edge interrupt on a button pin. In the ISR, clear the flag, record the current timer value into a ring buffer and return. In main, drain the buffer and print timestamps. Then deliberately forget to clear the flag and observe the system hang (or re-enter continuously); then put a 100 ms delay in the ISR and show that a second button\'s interrupt is delayed. Document each failure.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'measure-latency',
              title: 'Measure interrupt latency and jitter',
              prompt:
                'Drive a GPIO output from a timer at 1 kHz and loop it back to an input configured for an edge interrupt; in the ISR set another GPIO high, then low. Capture both on a logic analyser (Wokwi\'s works) and measure edge-to-edge latency over 1000 events: min, max, mean. Then add a critical section of 50 us in main\'s loop and a higher-priority interrupt, and show how max latency changes.',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'spsc-ring-buffer',
              title: 'A lock-free single-producer single-consumer ring buffer',
              prompt:
                'Implement a ring buffer of bytes with power-of-two size, volatile head/tail, and no locks, used by a UART RX interrupt as producer and main as consumer. Write a host-side test (compile the same file on your PC) that hammers it from two threads and checks every byte arrives in order. Explain in comments why it is safe without a lock and what would break with two producers.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why can a Cortex-M ISR be an ordinary C function?',
              answerOutline:
                'The hardware automatically stacks the caller-saved registers (r0-r3, r12, lr, pc, xPSR) per the AAPCS on entry and restores them on exit via EXC_RETURN, so the compiler needs no special prologue.',
            },
            {
              question: 'What happens if an ISR does not clear the interrupt source?',
              answerOutline:
                'The interrupt remains pending/asserted and re-enters immediately after return, starving the main loop.',
            },
            {
              question: 'When is a shared ring buffer safe without disabling interrupts?',
              answerOutline:
                'Single producer, single consumer; each index is written by one side only and read atomically (aligned word); the data slot is written before the index is advanced.',
            },
          ],
          relatedLessons: ['operating-systems/foundations/limited-direct-execution'],
        },
        {
          slug: 'timers-and-pwm',
          title: 'Timers, counters and PWM',
          summary:
            'Hardware timers as the heartbeat of embedded systems: tick timers, one-shot and periodic alarms, input capture for measuring pulses, and pulse-width modulation for LEDs, servos and motors.',
          estimatedMinutes: 150,
          objectives: [
            'Explain a timer\'s clock source, prescaler, counter width and compare/match registers, and compute resolution and maximum period',
            'Use a free-running microsecond timer for timestamps and non-blocking delays, handling wraparound correctly',
            'Generate PWM at a chosen frequency and duty cycle and explain the resolution/frequency trade-off',
            'Measure a pulse width or frequency with input capture or a counter',
          ],
          concepts: [
            'Prescaler, counter, period/top, compare registers',
            'SysTick and the system tick',
            'Free-running timers and unsigned wraparound arithmetic',
            'Alarms: one-shot vs periodic; timer callbacks',
            'PWM: frequency, duty cycle, resolution',
            'Servo (50 Hz, 1-2 ms) and motor (kHz) PWM',
            'Input capture and edge counting',
            'Hardware timers vs software timers; jitter',
          ],
          explanation: `A **timer** is a counter driven by a clock through a **prescaler**. With a 125 MHz clock, a prescaler of 125 and a 16-bit counter, the counter ticks every microsecond and wraps every 65.536 ms. A **compare register** raises an interrupt or toggles a pin when the counter matches it; a **top/period register** sets where the counter wraps. From these two ideas come all timer functions. Resolution is one tick; maximum period is $(\\text{top}+1) \\times \\text{tick}$; pick the prescaler to balance them.

Every system needs a **tick**. Cortex-M has **SysTick**, a 24-bit down-counter that interrupts at a fixed rate, typically 1 kHz, incrementing a \`volatile uint32_t ms\` counter; the RP2040 also has a 64-bit microsecond timer with four alarm compare registers (\`time_us_64()\`, \`add_alarm_in_ms\`). Non-blocking delays use the tick: \`if ((uint32_t)(now - start) >= period)\`. The cast and unsigned subtraction make this correct across **wraparound**, which happens every 49.7 days for a 32-bit ms counter; comparing \`now >= start + period\` does not, and the resulting bug surfaces only in the field. Hardware **alarms** fire a callback at a time; periodic alarms are how you sample the button debouncer and run periodic tasks.

**PWM** switches a pin on and off rapidly; the average voltage is the **duty cycle**. An LED dimmed by PWM at 1 kHz looks steady; a motor driven at 20 kHz is silent; a hobby **servo** expects a 50 Hz signal with a 1-2 ms pulse. The resolution is the number of distinct duty values, which equals the counter's top value; so at a given clock, higher frequency means lower resolution. The RP2040 has 8 PWM slices with 16-bit counters; the ESP32's LEDC peripheral and Arduino's \`analogWrite\` are the equivalents.

Timers also **measure**. Input capture copies the counter into a register on a pin edge, giving precise pulse widths (ultrasonic rangefinders, RC receivers); edge counting on a timer input measures frequency (tachometers, flow sensors). Read the RP2040 timer and PWM chapters, the SDK's \`pwm\` and \`timer\` examples, and then build the exercises, checking every waveform on a logic analyser.`,
          resources: [
            {
              title: 'RP2040 Datasheet — section 4.6 (Timer) and 4.5 (PWM)',
              url: 'https://datasheets.raspberrypi.com/rp2040/rp2040-datasheet.pdf',
              type: 'documentation',
              cost: 'free',
              provider: 'Raspberry Pi',
              primary: true,
            },
            {
              title: 'Pico SDK — hardware_timer, pico_time and hardware_pwm',
              url: 'https://www.raspberrypi.com/documentation/pico-sdk/hardware.html',
              type: 'documentation',
              cost: 'free',
              provider: 'Raspberry Pi',
            },
            {
              title: 'pico-examples — timer and pwm directories',
              url: 'https://github.com/raspberrypi/pico-examples',
              type: 'documentation',
              cost: 'free',
              provider: 'Raspberry Pi',
            },
            {
              title: 'ESP-IDF — LED Control (LEDC) PWM and General Purpose Timer',
              url: 'https://docs.espressif.com/projects/esp-idf/en/latest/esp32/api-reference/peripherals/ledc.html',
              type: 'documentation',
              cost: 'free',
              provider: 'Espressif',
            },
          ],
          exercises: [
            {
              slug: 'wraparound-safe-scheduler',
              title: 'A wraparound-safe periodic scheduler',
              prompt:
                'Write a millisecond tick from SysTick (or the SDK alarm) and a scheduler table of {period, last_run, function} entries run from main with wraparound-safe comparisons. Schedule three tasks at 10, 100 and 1000 ms toggling three pins, verify periods on a logic analyser, then set the tick counter to 0xFFFFF000 at startup and show the schedule survives the wrap. Show the buggy comparison failing under the same test.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'pwm-breathing-and-servo',
              title: 'PWM: breathing LED and servo sweep',
              prompt:
                'Configure PWM at 1 kHz and fade an LED with a gamma-corrected (x^2.2) brightness ramp; capture the waveform and verify frequency and a 25% duty cycle. Then configure a 50 Hz channel and sweep a servo (or Wokwi\'s servo part) from 1.0 ms to 2.0 ms pulses over 2 s. Compute and report the duty-cycle resolution in each configuration from the clock, prescaler and top values.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'measure-a-pulse',
              title: 'Measure a pulse width',
              prompt:
                'Generate a test pulse on one pin (PWM at 100 Hz, 30% duty) and measure its high time on another pin using a GPIO edge interrupt reading the microsecond timer on rising and falling edges. Report the measured width and the error vs expected over 1000 pulses. Then use an HC-SR04 ultrasonic sensor (Wokwi has one) to measure distance from the echo pulse: distance = width * 343 m/s / 2.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why is (uint32_t)(now - start) >= period correct across timer wraparound while now >= start + period is not?',
              answerOutline:
                'Unsigned subtraction wraps modulo 2^32, so the elapsed time is correct as long as it is less than 2^32; the addition form fails when start + period overflows.',
            },
            {
              question: 'Why does raising PWM frequency reduce resolution?',
              answerOutline:
                'The counter top value = clock / (prescaler x frequency); fewer counts per period means fewer distinct duty-cycle steps.',
            },
            {
              question: 'What does input capture do?',
              answerOutline:
                'On an edge at a timer input pin, the hardware latches the counter value into a register, timestamping the edge without software latency.',
            },
          ],
        },
        {
          slug: 'super-loops-and-state-machines',
          title: 'Super-loops, state machines and non-blocking design',
          summary:
            'Structuring bare-metal firmware: the main loop with cooperative tasks, event flags from ISRs, finite-state machines for protocols and UIs, and why blocking delays must disappear.',
          estimatedMinutes: 120,
          objectives: [
            'Structure firmware as a super-loop of non-blocking tasks with ISRs producing events',
            'Design and implement a finite-state machine in C (switch-based and table-driven) for a device behaviour',
            'Explain why blocking calls (delay, busy-wait on a peripheral) break responsiveness and how to replace them',
            'Reason about worst-case loop time and the responsiveness it implies',
          ],
          concepts: [
            'Super-loop (foreground/background) architecture',
            'Event flags and queues from ISR to loop',
            'Finite-state machines: states, events, transitions, actions',
            'Switch-based vs table-driven FSM',
            'Non-blocking APIs and polling with timeouts',
            'Cooperative multitasking and worst-case loop period',
            'Timeouts and error states',
            'When the super-loop stops scaling (motivation for an RTOS)',
          ],
          explanation: `The simplest firmware architecture is the **super-loop**: \`while (1) { task_a(); task_b(); task_c(); }\`, with interrupts handling urgent events and leaving flags or queue entries for the tasks. It is deterministic, needs no scheduler, and is enough for most small devices. Its one rule: **nothing may block**. A \`delay_ms(500)\` inside \`task_a\` freezes \`task_b\` and \`task_c\` for half a second; waiting in a loop for a UART byte does the same. Every task must check its state, do a bounded amount of work, and return. The worst-case time around the loop, the sum of all tasks' worst cases, is the system's response time to anything the loop handles; keep it in mind and measure it with a GPIO toggle.

The tool that makes non-blocking code tractable is the **finite-state machine**. A device that waits for a button, then blinks for 2 s, then reads a sensor and sends it, is a sequence; written with delays it is three lines and broken, written as an FSM it is a \`state\` variable and a \`switch\` that, on each loop pass, checks whether the current state's exit condition (an event flag, a timer expiry) has occurred and advances. Every state has entry actions, a condition for leaving, and usually a **timeout** leading to an error state, because the external world does not always answer. FSMs also parse protocols (wait for start byte, collect length, collect payload, verify checksum), run UIs (menus), and manage connections (idle, connecting, connected, backoff).

A **table-driven** FSM stores transitions as data: an array indexed by \`[state][event]\` giving the next state and an action function. It scales better than nested switches, is easy to generate a diagram from, and makes it obvious when a transition is missing. For readability, keep state and event names in enums and log every transition during development.

The super-loop stops scaling when tasks have very different timing needs, when a long computation (a crypto handshake, a display refresh) cannot be split into small steps, or when third-party stacks (Wi-Fi, BLE) assume they own a thread. That is the motivation for module 4. Read Valvano's chapter on FSMs and Making Embedded Systems chapter 5 if you have it, then build the exercises.`,
          resources: [
            {
              title: 'Jonathan Valvano — Finite state machines and the main loop (course notes, EE319K)',
              url: 'http://users.ece.utexas.edu/~valvano/',
              type: 'course',
              cost: 'free',
              provider: 'University of Texas at Austin',
              primary: true,
            },
            {
              title: 'Making Embedded Systems (Elecia White) — chapter on managing the flow of activity (state machines, main loops)',
              url: 'https://www.oreilly.com/library/view/making-embedded-systems/9781449308889/',
              type: 'textbook',
              cost: 'paid',
              provider: "O'Reilly",
              note: 'Paid; Valvano\'s notes cover the same ground for free.',
            },
            {
              title: 'Embedded Artistry — articles on embedded software architecture',
              url: 'https://embeddedartistry.com/',
              type: 'article',
              cost: 'free',
              provider: 'Embedded Artistry',
              note: 'Search for the state machine and "blocking" articles.',
            },
          ],
          exercises: [
            {
              slug: 'convert-blocking-to-fsm',
              title: 'Convert a blocking sketch to an FSM',
              prompt:
                'Start with a program that, using delays, waits for a button, blinks an LED 5 times at 2 Hz, then prints "done". It must simultaneously echo characters on the UART with no visible lag. Show the blocking version fails the echo test, then rewrite as a super-loop with a debounced button task, a blink FSM driven by the tick, and a UART echo task. Measure the maximum loop period with a GPIO toggle and report it.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'table-driven-protocol-parser',
              title: 'A table-driven frame parser',
              prompt:
                'Define a serial frame: 0xAA, length, payload bytes, 8-bit checksum. Implement a parser FSM (WAIT_SYNC, LEN, PAYLOAD, CHECKSUM) fed one byte at a time, first with a switch and then table-driven, with a timeout that resets to WAIT_SYNC if 100 ms pass mid-frame. Write a host-side unit test feeding valid frames, corrupted checksums, truncated frames and random noise; both implementations must pass identical tests.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'traffic-light-with-pedestrian',
              title: 'Traffic light with pedestrian request',
              prompt:
                'Implement a traffic-light controller FSM (red, red+amber, green, amber, with a pedestrian crossing phase requested by a button) on three LEDs and a button, with all timing from the tick, no delays. Draw the state diagram first and make the code a direct transcription. Test that a request during green is honoured after the current cycle and that two requests do not cause two pedestrian phases.',
              kind: 'coding',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'Why must nothing block in a super-loop?',
              answerOutline:
                'Every task shares the single thread; a block delays all other tasks by its duration, destroying responsiveness and possibly missing events.',
            },
            {
              question: 'What are the parts of a finite-state machine and why do states need timeouts?',
              answerOutline:
                'States, events, transitions and actions. Timeouts guard against external events that never arrive, moving to an error/recovery state instead of waiting forever.',
            },
            {
              question: 'Name two situations where a super-loop is no longer adequate.',
              answerOutline:
                'Tasks with very different timing requirements where a long task delays a fast one; third-party stacks (networking, BLE) that require their own thread/blocking calls.',
            },
          ],
        },
      ],
      project: {
        slug: 'reaction-timer',
        title: 'Project: a reaction timer with non-blocking everything',
        description: `Build a reaction-time game: after a random 1-5 s delay an LED lights, the player presses a button, and the time in microseconds is shown over UART and on a bar of LEDs via PWM brightness. False starts are detected. The code must use interrupts for the button, a hardware timer for timestamps, PWM for the LEDs, an FSM for the game, and contain no blocking delay. Record the best, worst and mean of 20 attempts and the measured interrupt latency that bounds the timing error.`,
        deliverables: [
          'Source with the FSM diagram in the README',
          'A logic-analyser capture showing LED-on edge to button edge and the reported time agreeing within the stated error',
          'A host-side unit test of the FSM logic compiled on the PC',
        ],
        estimatedHours: 6,
        stretchGoals: ['Store the high score in flash and survive a power cycle'],
      },
    },
    {
      slug: 'serial-protocols-and-sensors',
      title: 'Serial Protocols and Sensors',
      description:
        'The buses that connect an MCU to the world: UART, I2C and SPI at the signal and register level, reading a sensor datasheet, writing a portable driver, and seeing the bits on a logic analyser.',
      lessons: [
        {
          slug: 'uart',
          title: 'UART: asynchronous serial',
          summary:
            'Start bits, data bits, parity and stop bits; baud rates and clock tolerance; the UART peripheral with FIFOs and interrupts; framing errors; and a robust line-oriented protocol over it.',
          estimatedMinutes: 120,
          objectives: [
            'Draw a UART frame (8N1) and compute the time per byte at a given baud rate',
            'Configure a UART peripheral with FIFOs and RX interrupts and implement interrupt-driven TX and RX with ring buffers',
            'Explain baud-rate error and framing/overrun errors, and decode a capture on a logic analyser',
            'Design a simple framed protocol (sync, length, checksum) and an ASCII command protocol over UART',
          ],
          concepts: [
            'Asynchronous: no clock line; both sides agree on baud',
            'Frame: start bit, 5-9 data bits, parity, stop bits (8N1)',
            'Baud rate, bit time, clock tolerance (about 2-3%)',
            'TX/RX FIFOs, interrupts and DMA',
            'Framing, parity and overrun errors',
            'RS-232/RS-485 levels vs 3.3 V logic; TX to RX crossing',
            'Flow control (RTS/CTS, XON/XOFF)',
            'Line protocols and binary framing with checksums',
          ],
          explanation: `**UART** (universal asynchronous receiver/transmitter) is the oldest and simplest serial interface, still the universal debug console and the link to GPS modules, modems and many sensors. It has no clock wire. The line idles high; a byte begins with a **start bit** (low), followed by 8 data bits least-significant first, an optional parity bit, and one or more **stop bits** (high). The receiver, knowing the agreed **baud rate**, samples each bit at its middle (typically with a 16x oversampling clock). At 115200 baud a bit is 8.68 us and a byte with 8N1 framing takes 10 bits, so about 11.5 KB/s. Because each side uses its own clock, they must agree within about 2-3% over the 10-bit frame; the datasheet's baud-rate divisor table shows the actual error for each setting, and some rates are unreachable from some clocks.

A UART peripheral has transmit and receive **FIFOs**, status flags, and interrupts for "RX FIFO above threshold", "TX FIFO below threshold" and errors. A **framing error** means the stop bit was not high: wrong baud rate, noise, or a break condition. An **overrun** means bytes arrived while the FIFO was full and were lost, which happens when the main loop is too slow to drain it, the reason to use interrupt-driven receive into the ring buffer from module 2. Transmit likewise: \`printf\` into a TX ring buffer and let the TX interrupt feed the FIFO, so printing never blocks.

Wiring: TX of one device to RX of the other, and a common ground. Logic levels must match (3.3 V on modern MCUs; a 5 V Arduino can damage a 3.3 V pin); RS-232 uses plus/minus 12 V and needs a level shifter; RS-485 is differential for long cables. **Flow control** (RTS/CTS) lets a receiver pause the sender; without it, you need buffers big enough for the burst.

Bytes are not messages. An **ASCII line protocol** (\`SET LED 1\\n\`) is human-readable and easy to debug with a terminal; a **binary framed protocol** (sync byte, length, payload, CRC) is compact and robust, and the parser FSM from module 2 is exactly what decodes it. Add a checksum or CRC to anything that matters: a UART has no error detection of its own. Read the RP2040 UART chapter and SparkFun's introduction, capture a frame on a logic analyser and decode it by hand once.`,
          resources: [
            {
              title: 'SparkFun — Serial Communication tutorial',
              url: 'https://learn.sparkfun.com/tutorials/serial-communication',
              type: 'article',
              cost: 'free',
              provider: 'SparkFun',
              note: 'Clear introduction to framing, baud rates and wiring.',
              primary: true,
            },
            {
              title: 'RP2040 Datasheet — section 4.2 (UART)',
              url: 'https://datasheets.raspberrypi.com/rp2040/rp2040-datasheet.pdf',
              type: 'documentation',
              cost: 'free',
              provider: 'Raspberry Pi',
              note: 'The PL011 UART: FIFOs, baud divisor, interrupt sources and error flags.',
            },
            {
              title: 'pico-examples — uart directory (uart_advanced with interrupts)',
              url: 'https://github.com/raspberrypi/pico-examples',
              type: 'documentation',
              cost: 'free',
              provider: 'Raspberry Pi',
            },
            {
              title: 'Arduino Reference — Serial',
              url: 'https://docs.arduino.cc/language-reference/en/functions/communication/serial/',
              type: 'documentation',
              cost: 'free',
              provider: 'Arduino',
            },
          ],
          exercises: [
            {
              slug: 'decode-a-frame-by-hand',
              title: 'Decode a UART frame by hand',
              prompt:
                'Capture the transmission of the string "Hi\\n" at 9600 baud 8N1 on a logic analyser (hardware or Wokwi), measure the bit time, and decode every bit of each byte by hand from the waveform, showing start, data (LSB first), and stop bits. Then compute the actual baud rate your MCU produces at 115200 from the datasheet divisor and the percentage error.',
              kind: 'data-analysis',
              difficulty: 1,
            },
            {
              slug: 'interrupt-driven-uart',
              title: 'Interrupt-driven UART with ring buffers',
              prompt:
                'Implement uart_init, uart_write (non-blocking, into a TX ring buffer drained by the TX interrupt) and uart_read (from an RX ring buffer filled by the RX interrupt), with an overrun counter. Test by echoing a 10 KB file sent at 115200 baud with no flow control and verifying it arrives intact. Then shrink the RX buffer to 16 bytes, add a 5 ms delay in the main loop, and show overruns appearing; quantify the buffer size needed for a given loop latency.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'command-protocol',
              title: 'An ASCII command protocol with a host tool',
              prompt:
                'Implement a line protocol with commands LED <n> <on|off>, PWM <n> <duty>, READ TEMP, and VERSION, with responses OK/ERR <reason>. Write a Python host tool (pyserial) that sends commands and asserts the responses, including malformed input and a 500-command stress loop with latency statistics. Add a CRC-8 to each line and show the host tool detecting an injected corruption.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'How long does a byte take at 115200 baud with 8N1, and why 10 bits?',
              answerOutline:
                'About 86.8 us: 1 start + 8 data + 1 stop = 10 bits at 8.68 us each.',
            },
            {
              question: 'What causes an overrun error and how do you prevent it?',
              answerOutline:
                'Bytes arrive while the RX FIFO is full because software did not read in time. Prevent with RX interrupts into a large enough ring buffer, DMA, or flow control.',
            },
            {
              question: 'Why does a UART link need a checksum at the application level?',
              answerOutline:
                'UART only detects some framing/parity errors; bit flips in data pass through undetected, so the protocol must carry its own CRC.',
            },
          ],
        },
        {
          slug: 'i2c',
          title: 'I2C: a two-wire shared bus',
          summary:
            'Open-drain SDA/SCL with pull-ups, start/stop conditions, 7-bit addresses, ACK/NACK, register-style reads and writes, clock stretching, and debugging a bus that does not answer.',
          estimatedMinutes: 150,
          objectives: [
            'Draw the I2C transaction for writing a register and for reading a register (repeated start) and identify every bit on a capture',
            'Explain why I2C is open-drain, size the pull-ups, and compute the bus capacitance limit',
            'Scan a bus for devices, read a sensor\'s ID register and configure it from the datasheet',
            'Diagnose common failures: missing pull-ups, wrong address (7-bit vs 8-bit), stuck bus, clock stretching not supported',
          ],
          concepts: [
            'Open-drain wired-AND bus; pull-up sizing',
            'START, STOP, repeated START',
            '7-bit address + R/W bit; the 8-bit address confusion',
            'ACK/NACK per byte',
            'Register read: write register address, repeated start, read',
            'Clock stretching',
            'Standard (100 kHz), fast (400 kHz), fast-plus modes',
            'Bus recovery (clocking out a stuck slave)',
          ],
          explanation: `**I2C** connects many devices with two wires, **SDA** (data) and **SCL** (clock), both **open-drain** with pull-up resistors: any device can pull a line low, nobody drives it high, so devices never fight and a slow device can hold SCL low to **stretch the clock**. Pull-ups of 2.2-10 kOhm are typical; too large and the rising edges are slow (the RC time constant with bus capacitance limits speed; the specification allows 400 pF), too small and devices cannot sink the current.

A transaction begins with a **START** (SDA falls while SCL is high) and ends with a **STOP** (SDA rises while SCL is high); all other SDA changes happen while SCL is low. The controller sends a 7-bit **address** plus a **R/W** bit; the addressed target pulls SDA low during the ninth clock as an **ACK**. Every subsequent byte is acknowledged the same way; a NACK ends the transfer. Datasheets sometimes quote the 8-bit form (address shifted left, 0x76 vs 0xEC); if a device does not answer, try the other interpretation first.

Most devices present a **register map**. To write register 0xF4 with 0x27: START, address+W, 0xF4, 0x27, STOP. To read register 0xD0: START, address+W, 0xD0, **repeated START**, address+R, read bytes (ACK each except the last, which you NACK), STOP. The repeated start keeps the bus so another controller cannot interleave. Multi-byte reads auto-increment the register address on most sensors. In the Pico SDK this is \`i2c_write_blocking\` followed by \`i2c_read_blocking\` with \`nostop=true\` on the write.

When it does not work: a logic analyser with the I2C decoder shows immediately whether START appeared, whether the address was ACKed, and whether SCL is being stretched. No ACK means wrong address, missing pull-ups (both lines will sit low), wrong wiring, or the device is not powered or needs a startup delay. A **stuck bus**, SDA held low by a target that was mid-byte when the controller reset, is recovered by bit-banging up to 9 clocks on SCL until SDA releases, then a STOP. Read the I2C specification sections 3.1 and SparkFun's tutorial, then talk to a BME280 or MPU6050 (both available in Wokwi).`,
          resources: [
            {
              title: 'I2C-bus specification and user manual (NXP UM10204)',
              url: 'https://www.nxp.com/docs/en/user-guide/UM10204.pdf',
              type: 'documentation',
              cost: 'free',
              provider: 'NXP',
              note: 'The official specification; section 3.1 covers the protocol, section 7 the electrical design (pull-up sizing).',
              primary: true,
            },
            {
              title: 'SparkFun — I2C tutorial',
              url: 'https://learn.sparkfun.com/tutorials/i2c',
              type: 'article',
              cost: 'free',
              provider: 'SparkFun',
            },
            {
              title: 'Bosch BME280 humidity/pressure/temperature sensor (datasheet page)',
              url: 'https://www.bosch-sensortec.com/products/environmental-sensors/humidity-sensors-bme280/',
              type: 'documentation',
              cost: 'free',
              provider: 'Bosch Sensortec',
              note: 'A representative register-map sensor with calibration and compensation formulas; available as a Wokwi part.',
            },
            {
              title: 'pico-examples — i2c directory (bus_scan, bme280_i2c, mpu6050_i2c)',
              url: 'https://github.com/raspberrypi/pico-examples',
              type: 'documentation',
              cost: 'free',
              provider: 'Raspberry Pi',
            },
            {
              title: 'Arduino Reference — Wire library',
              url: 'https://docs.arduino.cc/language-reference/en/functions/communication/wire/',
              type: 'documentation',
              cost: 'free',
              provider: 'Arduino',
            },
          ],
          exercises: [
            {
              slug: 'bus-scan-and-decode',
              title: 'Scan the bus and decode a transaction',
              prompt:
                'Write an I2C scanner that probes addresses 0x08-0x77 and prints which ACK. Connect a BME280 (or MPU6050) and a second device if you have one; confirm the addresses against the datasheets. Capture a read of the chip ID register on a logic analyser, and annotate START, address bits, R/W, ACK, register byte, repeated START, data byte, NACK and STOP on the screenshot.',
              kind: 'coding',
              difficulty: 1,
            },
            {
              slug: 'bme280-driver',
              title: 'A BME280 driver from the datasheet',
              prompt:
                'Using only the datasheet, write bme280_init (read ID, read the calibration registers, configure oversampling and mode), bme280_read_raw and the compensation functions (integer version from the datasheet) to produce temperature in centi-degrees, pressure in Pa and humidity in percent. Validate against the Bosch reference values in the datasheet example and against a known room temperature. Print readings once per second.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'break-the-bus',
              title: 'Break the bus and fix it',
              prompt:
                'With your working sensor: (a) remove the pull-ups (or set them to 100 kOhm) and capture the slow edges, computing the RC time constant and the maximum speed; (b) use the 8-bit address form and show the NACK; (c) reset the MCU in the middle of a read (hold reset while a transaction is in progress, or simulate by stopping after sending the register address) and recover the stuck bus by clocking SCL manually; show the recovery in a capture.',
              kind: 'coding',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'Why is I2C open-drain and what does that allow?',
              answerOutline:
                'Devices only pull low; a shared pull-up provides the high level. This prevents drive conflicts on a multi-device bus and enables clock stretching and multi-controller arbitration.',
            },
            {
              question: 'Describe the bus sequence to read one register from a device.',
              answerOutline:
                'START, address+W, register number (ACKed), repeated START, address+R, data byte(s) (controller ACKs all but the last, NACKs the last), STOP.',
            },
            {
              question: 'A device at 0x76 does not ACK. List three likely causes.',
              answerOutline:
                'Missing/absent pull-ups (lines low), wrong address interpretation (0xEC 8-bit vs 0x76 7-bit) or alternate address pin strap, device not powered/initialised, or SDA/SCL swapped.',
            },
          ],
        },
        {
          slug: 'spi',
          title: 'SPI: fast synchronous serial',
          summary:
            'Four-wire full-duplex SPI, clock polarity and phase (modes 0-3), chip select, daisy chaining, speeds of tens of MHz, and driving a display or flash chip with DMA.',
          estimatedMinutes: 120,
          objectives: [
            'Explain SCK/MOSI/MISO/CS, the four SPI modes, and read a device\'s required mode from its datasheet timing diagram',
            'Configure an SPI peripheral and transfer data to a flash chip or display, verifying on a logic analyser',
            'Use DMA for large transfers and explain the CPU-time saving',
            'Compare SPI with I2C and UART for a given application (speed, pins, distance, multi-drop)',
          ],
          concepts: [
            'SCK, MOSI/COPI, MISO/CIPO, CS; full duplex shift registers',
            'CPOL and CPHA: modes 0-3',
            'Chip select per device; manual vs hardware CS',
            'Bit order and word size',
            'Clock speed limits and signal integrity',
            'Daisy-chained shift registers',
            'DMA-driven transfers',
            'Common SPI devices: flash, SD cards, displays, ADCs',
          ],
          explanation: `**SPI** is two shift registers connected in a ring. The controller drives **SCK**; on each clock edge it shifts a bit out on **MOSI** and the peripheral shifts one out on **MISO**, so every transfer is full-duplex and exactly as long as the controller makes it. A separate **chip select** (CS, active-low) line per device says who is listening. There is no addressing, no ACK, no speed negotiation and no error detection; in exchange SPI runs at tens of MHz and the protocol is whatever the device's datasheet says.

The only configuration subtlety is **mode**. **CPOL** sets whether SCK idles low (0) or high (1); **CPHA** sets whether data is sampled on the first (0) or second (1) clock edge of each cycle. Together they give modes 0-3; mode 0 is most common. Read the timing diagram in the device datasheet: if data is shown changing on the falling edge and stable on the rising edge with the clock idling low, that is mode 0. A wrong mode gives shifted or garbage data, not an error. Also check bit order (MSB first almost always) and whether CS may stay low across several bytes (usually required for commands with arguments).

SPI devices are everywhere: NOR **flash** chips (the RP2040 boots from one over QSPI), SD cards, TFT displays, high-speed ADCs and DACs, radios. A display frame of 320 x 240 x 16 bits is 150 KB; at 40 MHz that is 30 ms if the CPU does nothing else. **DMA** solves this: configure the DMA controller to feed the SPI TX FIFO from a buffer and interrupt on completion, and the CPU is free during the transfer. The RP2040 SDK's \`dma\` examples show the pattern, and it applies equally to UART and I2C.

Choosing a bus: I2C for low-speed sensors and when pins are scarce (two wires, many devices); SPI for speed and simplicity (4 wires plus one CS per device); UART for point-to-point links and anything with a cable longer than a few centimetres (or RS-485 for metres). Read SparkFun's SPI tutorial and the RP2040 SPI chapter, then drive a real device in the exercises; a W25Q flash or an ST7789 display are cheap and both exist in Wokwi.`,
          resources: [
            {
              title: 'SparkFun — Serial Peripheral Interface (SPI) tutorial',
              url: 'https://learn.sparkfun.com/tutorials/serial-peripheral-interface-spi',
              type: 'article',
              cost: 'free',
              provider: 'SparkFun',
              primary: true,
            },
            {
              title: 'RP2040 Datasheet — section 4.4 (SPI) and 2.5 (DMA)',
              url: 'https://datasheets.raspberrypi.com/rp2040/rp2040-datasheet.pdf',
              type: 'documentation',
              cost: 'free',
              provider: 'Raspberry Pi',
            },
            {
              title: 'pico-examples — spi and dma directories',
              url: 'https://github.com/raspberrypi/pico-examples',
              type: 'documentation',
              cost: 'free',
              provider: 'Raspberry Pi',
              note: 'spi_flash and the DMA-driven examples.',
            },
            {
              title: 'Arduino Reference — SPI library',
              url: 'https://docs.arduino.cc/language-reference/en/functions/communication/SPI/',
              type: 'documentation',
              cost: 'free',
              provider: 'Arduino',
            },
          ],
          exercises: [
            {
              slug: 'spi-flash-jedec-id',
              title: 'Read a flash chip\'s JEDEC ID and a page',
              prompt:
                'Connect a W25Q-series SPI flash (Wokwi has one) and, from its datasheet, send the JEDEC ID command (0x9F) and decode manufacturer/device bytes; then write-enable, erase a sector, program a page with a known pattern, and read it back verifying every byte. Capture the ID transaction and annotate CS, SCK, MOSI command byte and MISO response. Then set the wrong SPI mode and show what the ID reads as.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'display-with-dma',
              title: 'Drive a display, then add DMA',
              prompt:
                'Initialise an ST7789 or ILI9341 TFT over SPI and fill the screen with a gradient using blocking writes; measure the frame time and CPU time with a GPIO toggle. Then rewrite the frame transfer with DMA and a completion interrupt, and show that the CPU can toggle a pin at full speed during the transfer. Report frame rate and CPU utilisation for both at 10, 20 and 40 MHz SPI clock.',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'bus-selection',
              title: 'Choose a bus for five peripherals',
              prompt:
                'For: a temperature sensor read once a minute, a 2-megapixel camera module, a GPS module 5 m away, sixteen LED drivers, and an SD card logging 1 MB/s, choose UART, I2C, SPI (or another bus) with speed and wiring, and justify with the throughput and pin-count numbers.',
              kind: 'problem',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'What do CPOL and CPHA control?',
              answerOutline:
                'CPOL: clock idle level (0 low, 1 high). CPHA: whether data is sampled on the first (0) or second (1) edge of each clock period. Together they define modes 0-3.',
            },
            {
              question: 'Why is SPI full-duplex and what does that imply for reading?',
              answerOutline:
                'Both shift registers move simultaneously on each clock; to read N bytes the controller must clock out N (dummy) bytes.',
            },
            {
              question: 'What does DMA buy you on a large SPI transfer?',
              answerOutline:
                'The DMA engine moves memory to the peripheral FIFO without CPU involvement, so the CPU is free during the transfer and only handles a completion interrupt.',
            },
          ],
        },
        {
          slug: 'sensor-drivers-and-data-pipelines',
          title: 'Reading datasheets and writing portable sensor drivers',
          summary:
            'How to read a sensor datasheet (register map, timing, calibration), the layered driver pattern (bus abstraction, device driver, application), unit conversion and filtering, and testing a driver on the host with a fake bus.',
          estimatedMinutes: 150,
          objectives: [
            'Extract from a datasheet the power-up sequence, configuration registers, data format, conversion time and calibration procedure for a sensor',
            'Structure a driver as device logic over a bus-interface struct of function pointers so it compiles on the Pico, the ESP32 and the host',
            'Convert raw readings to engineering units with fixed-point arithmetic and apply simple filtering',
            'Write host-side unit tests for the driver using a fake bus that replays datasheet examples',
          ],
          concepts: [
            'Datasheet anatomy: electrical, timing, register map, application notes',
            'Layering: HAL/bus interface, driver, application',
            'Dependency injection via function pointers',
            'Fixed-point arithmetic and unit scaling',
            'Oversampling, moving average, exponential filter',
            'Sensor fusion glimpse (accelerometer + gyro)',
            'Error handling and timeouts in drivers',
            'Host-side testing with a fake bus',
          ],
          explanation: `A **datasheet** is the contract between you and a chip, and reading one is a skill. Go in this order: the feature summary (what it does, which interfaces); the **electrical characteristics** (supply voltage, current, logic levels); the **timing** (startup time, conversion time, maximum bus speed, required delays between commands); the **register map** (what to write to configure it, where the data lands and in what format: signed? big-endian? left-justified?); and the **calibration or compensation** procedure, which for sensors like the BME280 means reading factory trim values and applying a formula. Then the application notes and the vendor's reference driver, which often reveal undocumented quirks. Write down every number you will need before writing code.

The driver should not know which MCU it runs on. Define a **bus interface**: a struct with function pointers \`read_regs(ctx, reg, buf, len)\`, \`write_regs(...)\` and \`delay_ms(ms)\`, plus a context pointer. The device driver takes this struct and implements \`init\`, \`read\` and \`sleep\` in terms of it; the application wires in a Pico I2C implementation, an ESP-IDF one, or, on your PC, a **fake bus** that returns scripted bytes. This is dependency injection in C, and it is the single practice that makes embedded code testable. Vendor drivers from Bosch and ST follow exactly this pattern.

Raw readings are integers in odd units. Convert with **fixed-point** arithmetic where possible (the BME280's integer compensation returns temperature in 0.01 degrees), avoiding \`float\` on cores without an FPU, where it is slow and bloats the binary. Then filter: averaging N samples reduces noise by $\\sqrt{N}$, an **exponential moving average** \`y += (x - y) >> k\` is one line and smooths without storing history, and a median filter kills spikes. Know the trade-off: filtering adds latency.

Every driver call can fail (NACK, timeout, implausible value). Return an error code, never hang waiting for a flag, and let the application decide whether to retry, reset the device or raise an alarm. Read the Embedded Artistry articles on driver design and the BME280 datasheet, then build the exercises; the host test with the datasheet's worked example is the acceptance test.`,
          resources: [
            {
              title: 'Bosch BME280 datasheet and reference driver',
              url: 'https://www.bosch-sensortec.com/products/environmental-sensors/humidity-sensors-bme280/',
              type: 'documentation',
              cost: 'free',
              provider: 'Bosch Sensortec',
              note: 'The reference driver on GitHub (boschsensortec/BME280_SensorAPI) is a model of the bus-interface pattern.',
              primary: true,
            },
            {
              title: 'Embedded Artistry — articles on HAL design, drivers and testing',
              url: 'https://embeddedartistry.com/',
              type: 'article',
              cost: 'free',
              provider: 'Embedded Artistry',
            },
            {
              title: 'Making Embedded Systems (Elecia White) — chapters on reading datasheets and the hardware/software interface',
              url: 'https://www.oreilly.com/library/view/making-embedded-systems/9781449308889/',
              type: 'textbook',
              cost: 'paid',
              provider: "O'Reilly",
              note: 'Paid; the vendor reference drivers and Embedded Artistry articles are the free alternative.',
            },
            {
              title: 'Unity — unit test framework for C (ThrowTheSwitch)',
              url: 'https://github.com/ThrowTheSwitch/Unity',
              type: 'tool',
              cost: 'free',
              provider: 'ThrowTheSwitch',
              note: 'Lightweight enough to run on the host and on the target.',
            },
          ],
          exercises: [
            {
              slug: 'datasheet-extraction',
              title: 'Datasheet extraction sheet',
              prompt:
                'For an MPU6050 (or any IMU in Wokwi) and a BME280, fill a one-page sheet each: supply range, active and sleep current, I2C address(es) and max speed, startup time, the exact register writes to configure a chosen mode, the data register addresses and byte order, the scale factors to engineering units, and any required delays. Cite the page for every value.',
              kind: 'reading',
              difficulty: 1,
            },
            {
              slug: 'portable-driver-with-fake-bus',
              title: 'A portable driver with host tests',
              prompt:
                'Restructure your BME280 driver around a bus-interface struct. Implement the interface for the Pico (I2C) and for the host (a fake that serves bytes from a table). Write Unity tests on the host that feed the datasheet\'s example calibration and raw values and assert the compensated outputs match the datasheet, plus tests for a NACK on init and for an implausible reading. Build and run the same driver on the board with no source changes.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'filter-comparison',
              title: 'Compare filters on real noise',
              prompt:
                'Sample the sensor at 10 Hz for 5 minutes and log raw values. On the host, apply a 16-sample moving average, an EMA with k = 3 and k = 5, and a 5-point median filter; plot all against raw, compute the standard deviation of each, and measure the step response (latency to 90%) by simulating a step. Choose a filter for a thermostat and justify it.',
              kind: 'data-analysis',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why should a sensor driver not call the MCU\'s I2C functions directly?',
              answerOutline:
                'It ties the driver to one platform and makes it untestable on the host; a bus-interface struct lets the same driver run on any MCU or against a fake bus in unit tests.',
            },
            {
              question: 'What is the noise reduction from averaging 16 samples, and what is the cost?',
              answerOutline:
                'Standard deviation drops by sqrt(16) = 4x; the cost is 16x the sampling time/power and added latency.',
            },
            {
              question: 'Name four things you must extract from a datasheet before writing a driver.',
              answerOutline:
                'Supply/logic levels, startup and conversion timing, the register map and data format (signedness, byte order, scaling), and the calibration/compensation procedure.',
            },
          ],
        },
      ],
      project: {
        slug: 'multi-sensor-logger',
        title: 'Project: a multi-sensor data logger',
        description: `Build a logger that reads an I2C environmental sensor and an IMU, receives a GPS NMEA stream over UART (or a simulated one), and writes timestamped CSV records to an SPI flash chip or SD card every second, with a UART command interface to dump and erase the log. All drivers use the bus-interface pattern and have host tests. Measure the time budget of each operation with GPIO toggles and show the main loop never exceeds 20 ms.`,
        deliverables: [
          'Drivers for three devices over three buses, each with host-side unit tests',
          'Logic-analyser captures of one transaction on each bus, annotated',
          'A timing budget table and a 10-minute log file parsed and plotted on the host',
        ],
        estimatedHours: 10,
        stretchGoals: ['Use DMA for the UART GPS stream and show zero overruns at 115200 baud'],
      },
    },
    {
      slug: 'real-time-systems-and-rtos',
      title: 'Real-Time Systems and RTOS',
      description:
        'What real-time means and how to prove deadlines are met, then FreeRTOS and Zephyr in practice: tasks, priorities, queues, semaphores and mutexes, priority inversion, and measuring latency and jitter.',
      lessons: [
        {
          slug: 'real-time-fundamentals',
          title: 'Real-time fundamentals: deadlines, priorities and schedulability',
          summary:
            'Hard vs soft real time, periodic task models, rate-monotonic scheduling and the Liu and Layland utilisation bound, response-time analysis, and worst-case execution time.',
          estimatedMinutes: 120,
          objectives: [
            'Define hard, firm and soft real-time and give an example of each',
            'Model a system as periodic tasks (period, WCET, deadline) and compute utilisation',
            'Apply rate-monotonic priority assignment and the Liu-Layland bound, and perform exact response-time analysis',
            'Explain why worst-case execution time is hard to measure and how to bound it',
          ],
          concepts: [
            'Hard, firm, soft real-time',
            'Periodic task model: C (WCET), T (period), D (deadline)',
            'Utilisation U = sum C_i / T_i',
            'Rate-monotonic scheduling (RMS) and the n(2^(1/n) - 1) bound',
            'Response-time analysis (iterative equation)',
            'Earliest-deadline-first (EDF)',
            'WCET measurement and the effect of caches/interrupts',
            'Jitter and latency',
          ],
          explanation: `A **real-time** system is one whose correctness depends on *when* results are produced, not only what they are. In a **hard** real-time system a missed deadline is a failure (airbag deployment, motor commutation); in a **soft** one it degrades quality (audio playback, display refresh); **firm** means a late result is useless but not catastrophic. Note that real-time means *predictable*, not *fast*: a system that responds in 1 ms every time is real-time, one that usually responds in 1 us but occasionally takes 100 ms is not.

The classic model: $n$ periodic **tasks**, each with a period $T_i$, a worst-case execution time $C_i$, and a deadline equal to its period. The **utilisation** is $U = \\sum_i C_i / T_i$; obviously $U \\leq 1$ is necessary. Liu and Layland (1973) proved that assigning **fixed priorities by rate** (shorter period, higher priority: **rate-monotonic scheduling**) is optimal among fixed-priority schemes, and that all deadlines are met if

$$U \\leq n\\left(2^{1/n} - 1\\right)$$

which is $0.83$ for two tasks and tends to $\\ln 2 \\approx 0.69$. This bound is sufficient, not necessary; many task sets above it are fine. The exact test is **response-time analysis**: the worst-case response time of task $i$ is the smallest $R_i$ satisfying

$$R_i = C_i + \\sum_{j \\in hp(i)} \\left\\lceil \\frac{R_i}{T_j} \\right\\rceil C_j$$

iterated from $R_i = C_i$ until it converges or exceeds $D_i$. Do this by hand once; it is the calculation that tells you whether to buy a faster chip. Dynamic priorities (**EDF**, earliest deadline first) can reach $U = 1$ but are rarer in MCU RTOSes.

The weak point is $C_i$. **WCET** depends on input, on cache state, on interrupts that preempt the task, and on the compiler. In practice you measure the execution time with a GPIO or cycle counter over long runs with adversarial inputs, add margin, and design so that the worst case is rare and the system degrades gracefully if exceeded. Read the Liu and Layland paper's first sections (it is readable) and the FreeRTOS scheduling documentation, then work the analysis exercises; the next lessons implement the tasks.`,
          resources: [
            {
              title: 'Scheduling Algorithms for Multiprogramming in a Hard-Real-Time Environment (Liu and Layland, 1973)',
              url: 'https://dl.acm.org/doi/10.1145/321738.321743',
              type: 'article',
              cost: 'freemium',
              provider: 'ACM',
              note: 'The founding paper of real-time scheduling; the ACM copy may be paywalled, freely readable copies are widely mirrored under the title.',
            },
            {
              title: 'FreeRTOS — RTOS fundamentals (tasks, scheduling, priorities)',
              url: 'https://www.freertos.org/Documentation/02-Kernel/02-Kernel-features/01-Tasks-and-co-routines/00-Tasks-and-co-routines',
              type: 'documentation',
              cost: 'free',
              provider: 'FreeRTOS',
              note: 'Read the task states, priorities and scheduling pages for the practical view of fixed-priority preemptive scheduling.',
              primary: true,
            },
            {
              title: 'Jonathan Valvano — Real-Time Operating Systems for ARM Cortex-M (EE445M course materials)',
              url: 'http://users.ece.utexas.edu/~valvano/',
              type: 'course',
              cost: 'free',
              provider: 'University of Texas at Austin',
              note: 'Lecture notes on real-time scheduling theory with Cortex-M examples.',
            },
          ],
          exercises: [
            {
              slug: 'rms-analysis-by-hand',
              title: 'Schedulability by hand',
              prompt:
                'Tasks: A (T=10 ms, C=2), B (T=25 ms, C=5), C (T=50 ms, C=12). Compute U, compare with the Liu-Layland bound, then do response-time analysis for each task under RMS priorities. Is the set schedulable? Now increase C_C to 20 ms and repeat. Finally draw the timeline of the first 50 ms for the original set, showing preemptions.',
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'rms-simulator',
              title: 'A fixed-priority scheduling simulator',
              prompt:
                'Write a Python simulator that takes a task set (T, C, priority), simulates preemptive fixed-priority scheduling over the hyperperiod at 1 us resolution, and reports each task\'s worst-case response time and any missed deadline. Verify it against your hand analysis, then search randomly for task sets with U between 0.70 and 0.95 that are schedulable, to see how conservative the bound is.',
              kind: 'simulation',
              difficulty: 2,
            },
            {
              slug: 'measure-wcet',
              title: 'Measure a task\'s execution time distribution',
              prompt:
                'On the board, time your BME280 read-and-compensate function and your frame parser over 10,000 runs using the cycle counter (DWT on Cortex-M3+/M4, or the microsecond timer on M0+), with and without a 1 kHz interrupt running, and with inputs chosen to be slow. Plot the histogram, report max and 99.9th percentile, and discuss what would make the measured max unsafe to use as WCET.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Does real-time mean fast?',
              answerOutline:
                'No: it means bounded, predictable response. A slow but always-on-time system is real-time; a usually fast one with occasional long delays is not.',
            },
            {
              question: 'State the rate-monotonic rule and the Liu-Layland bound for three tasks.',
              answerOutline:
                'Shorter period gets higher priority. Bound: 3(2^(1/3) - 1) = 0.78; task sets with U below it are guaranteed schedulable.',
            },
            {
              question: 'Why is response-time analysis preferred to the utilisation bound?',
              answerOutline:
                'It is exact for the model (necessary and sufficient), so task sets above the bound can be proven schedulable, and it gives each task\'s worst-case response time.',
            },
          ],
          relatedLessons: ['operating-systems/cpu-scheduling/scheduling-metrics-and-basic-policies'],
        },
        {
          slug: 'freertos-tasks',
          title: 'FreeRTOS: tasks, the scheduler and the tick',
          summary:
            'Bringing FreeRTOS into a Pico or ESP32 project, creating tasks with stacks and priorities, the scheduler and tick interrupt, delays and periodic tasks with vTaskDelayUntil, and stack sizing.',
          estimatedMinutes: 150,
          objectives: [
            'Integrate the FreeRTOS kernel into a Pico SDK project (or use ESP-IDF\'s built-in FreeRTOS) and configure FreeRTOSConfig.h',
            'Create tasks with appropriate priorities and stack sizes and explain the task states and the context switch',
            'Write periodic tasks with vTaskDelayUntil and explain drift vs vTaskDelay',
            'Size stacks with the high-water mark, detect overflow, and use the idle hook',
          ],
          concepts: [
            'Kernel port, FreeRTOSConfig.h, tick rate',
            'xTaskCreate: function, stack, priority, handle',
            'Task states: running, ready, blocked, suspended',
            'Preemptive scheduling and time slicing',
            'Tick interrupt and PendSV context switch',
            'vTaskDelay vs vTaskDelayUntil',
            'Stack high-water mark; overflow hooks',
            'Idle task and tickless idle',
          ],
          explanation: `**FreeRTOS** is a small kernel (a few thousand lines of C) that adds **tasks** to your bare-metal program: each task is a function that never returns, with its own stack and a **priority**, and the scheduler runs the highest-priority ready task, preempting lower ones. On the Pico you add the kernel as a CMake dependency (the FreeRTOS-Kernel repository has an RP2040 port); on the ESP32 it is already there, since ESP-IDF is built on it. \`FreeRTOSConfig.h\` sets the tick rate (typically 1000 Hz), the number of priorities, heap size and which features are compiled in.

A task is created with \`xTaskCreate(fn, name, stack_words, param, priority, &handle)\`, and \`vTaskStartScheduler()\` never returns. Tasks move between **states**: *running*, *ready* (could run, but a higher-priority task is running), *blocked* (waiting for a delay, queue, semaphore or notification) and *suspended*. The art of RTOS design is that tasks should spend almost all their time **blocked**; a task that polls is a bug. Equal-priority tasks are **time-sliced** at each tick if configured.

The mechanics are what the Operating Systems subject described, on a Cortex-M: the **SysTick** interrupt runs the tick, which unblocks tasks whose delays expired and requests a context switch via the **PendSV** exception, the lowest-priority exception, which saves the current task's registers on its stack, switches the stack pointer, and restores the next task's. A context switch costs a few hundred cycles.

Periodic work uses \`vTaskDelayUntil(&last_wake, period)\`, which wakes at absolute times and does not drift; \`vTaskDelay(period)\` delays *after* the work and accumulates the work's duration into the period. **Stack sizing** is the practical headache: each task needs enough for its deepest call chain plus interrupt frames; start generous, then call \`uxTaskGetStackHighWaterMark\` after long runs and trim. Enable \`configCHECK_FOR_STACK_OVERFLOW\` and the overflow hook in development. The **idle task** runs when nothing else is ready; its hook is where you enter low-power sleep (module 5), and *tickless idle* lets the kernel stop the tick entirely during long idle periods.

Read the FreeRTOS kernel book chapters 1-3 (free PDF) and the Pico or ESP-IDF FreeRTOS examples, then do the exercises, measuring everything with GPIOs.`,
          resources: [
            {
              title: 'Mastering the FreeRTOS Real Time Kernel (free book)',
              url: 'https://www.freertos.org/Documentation/02-Kernel/07-Books-and-manual/01-RTOS_book',
              type: 'textbook',
              cost: 'free',
              provider: 'FreeRTOS',
              note: 'Chapters on task management and the scheduler for this lesson; queues and semaphores for the next.',
              primary: true,
            },
            {
              title: 'FreeRTOS-Kernel source repository (includes the RP2040 port)',
              url: 'https://github.com/FreeRTOS/FreeRTOS-Kernel',
              type: 'tool',
              cost: 'free',
              provider: 'FreeRTOS',
              note: 'Read tasks.c and the ARM_CM0 port for the context switch.',
            },
            {
              title: 'ESP-IDF — FreeRTOS overview and API',
              url: 'https://docs.espressif.com/projects/esp-idf/en/latest/esp32/api-reference/system/freertos.html',
              type: 'documentation',
              cost: 'free',
              provider: 'Espressif',
              note: 'ESP-IDF uses a dual-core SMP variant; note the differences.',
            },
            {
              title: 'FreeRTOS home page and documentation index',
              url: 'https://www.freertos.org/',
              type: 'documentation',
              cost: 'free',
              provider: 'FreeRTOS',
            },
          ],
          exercises: [
            {
              slug: 'three-tasks-three-pins',
              title: 'Three periodic tasks',
              prompt:
                'Create tasks toggling three GPIOs at 10, 100 and 1000 Hz with vTaskDelayUntil, at priorities matching rate-monotonic order. Verify frequencies and jitter on a logic analyser. Then add a busy-loop task at the lowest priority consuming 100% CPU and confirm the periodic tasks are unaffected; then raise its priority above the 10 Hz task and show the starvation. Finally replace vTaskDelayUntil with vTaskDelay plus 3 ms of work and measure the drift over 1000 periods.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'stack-sizing',
              title: 'Size the stacks',
              prompt:
                'Give each task a 128-word stack and a function with a recursive or large-local call chain. Enable the stack overflow hook and observe it fire; then size each stack using the high-water mark after a 10-minute run with a 50% margin. Report the total RAM used by task stacks and compare with the available SRAM.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'measure-context-switch',
              title: 'Measure the context-switch time',
              prompt:
                'Create two tasks that ping-pong via task notifications (xTaskNotifyGive/ulTaskNotifyTake) 100,000 times, toggling a GPIO on each switch; measure the time per round trip with the logic analyser or a timer and derive the context-switch cost in cycles. Compare with the Unix pipe ping-pong measurement from the operating-systems subject and explain the difference.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why should RTOS tasks spend most of their time blocked?',
              answerOutline:
                'A blocked task consumes no CPU and lets lower-priority tasks and the idle task (power saving) run; a polling task wastes CPU and starves lower priorities.',
            },
            {
              question: 'What is the difference between vTaskDelay and vTaskDelayUntil?',
              answerOutline:
                'vTaskDelay blocks for a duration from the call, so execution time accumulates into the period (drift); vTaskDelayUntil blocks until an absolute wake time, giving a fixed period.',
            },
            {
              question: 'What does the PendSV exception do in a Cortex-M FreeRTOS port?',
              answerOutline:
                'It performs the context switch at the lowest exception priority, after any other interrupt handlers have finished, saving the current task\'s registers and restoring the next task\'s.',
            },
          ],
        },
        {
          slug: 'rtos-synchronization-and-ipc',
          title: 'Queues, semaphores, mutexes and the priority inversion problem',
          summary:
            'Passing data between tasks and from ISRs with queues and task notifications, protecting shared resources with mutexes, counting and binary semaphores, priority inheritance, and deadlock.',
          estimatedMinutes: 150,
          objectives: [
            'Choose between a queue, a binary semaphore, a counting semaphore, a mutex and a task notification for a given situation',
            'Signal a task from an ISR correctly with the FromISR API variants and the yield-on-exit pattern',
            'Explain priority inversion and show how priority inheritance in FreeRTOS mutexes bounds it',
            'Recognise deadlock conditions in task code and apply lock ordering',
          ],
          concepts: [
            'Queues: copy semantics, blocking send/receive with timeouts',
            'FromISR variants and portYIELD_FROM_ISR',
            'Binary semaphore as a signal; counting semaphore',
            'Mutex vs binary semaphore; ownership',
            'Priority inversion (Mars Pathfinder) and priority inheritance',
            'Deadlock and lock ordering',
            'Task notifications as lightweight signals',
            'Timeouts on every blocking call',
          ],
          explanation: `Tasks need to communicate, and the RTOS provides the primitives the Operating Systems subject defined, adapted for ISRs and small memories. A **queue** copies items of a fixed size into a buffer; a task blocks on \`xQueueReceive\` until an item arrives or a timeout expires, which is the correct way to wait for sensor data or commands. From an **ISR** you must use \`xQueueSendFromISR\` (and the \`FromISR\` variant of every other API), which never blocks, and if it reports that a higher-priority task was woken you call \`portYIELD_FROM_ISR\` at the end of the handler so the switch happens immediately rather than at the next tick. This is the RTOS equivalent of the flag-and-ring-buffer pattern from module 2, and it handles the "data arrived" case in a few lines.

A **binary semaphore** is a signal without data ("the DMA finished"); a **counting semaphore** tracks a number of available resources or pending events; a **task notification** is a faster, lighter binary or counting signal attached to one task, preferred when only one receiver exists. A **mutex** protects a shared resource (the I2C bus, a log buffer) and differs from a binary semaphore in having an **owner**: only the task that took it may give it, and it implements **priority inheritance**.

Why inheritance matters: a low-priority task L holds a mutex; high-priority H blocks waiting for it; medium-priority M, needing nothing, preempts L and runs for as long as it likes, so H is effectively below M. This **priority inversion** famously reset the Mars Pathfinder lander repeatedly in 1997. With inheritance, L temporarily runs at H's priority while holding the mutex, so M cannot preempt it, and H's delay is bounded by L's critical section. Keep critical sections short, never block inside one, and never use a mutex from an ISR.

**Deadlock** is as possible as ever: two tasks taking two mutexes in opposite orders. The cure is a global **lock order**, and a timeout on every blocking call (never \`portMAX_DELAY\` in production code) so that a failure becomes an error you can log rather than a frozen device. Read the queue and semaphore chapters of the FreeRTOS book and the Mars Pathfinder account linked from the Interrupt blog, then build the exercises, including a deliberate priority inversion that you observe on a logic analyser.`,
          resources: [
            {
              title: 'Mastering the FreeRTOS Real Time Kernel — Queue Management, Software Timers, Interrupt Management, Resource Management chapters',
              url: 'https://www.freertos.org/Documentation/02-Kernel/07-Books-and-manual/01-RTOS_book',
              type: 'textbook',
              cost: 'free',
              provider: 'FreeRTOS',
              primary: true,
            },
            {
              title: 'FreeRTOS documentation — kernel features (queues, semaphores, mutexes, task notifications)',
              url: 'https://www.freertos.org/',
              type: 'documentation',
              cost: 'free',
              provider: 'FreeRTOS',
              note: 'Navigate to Kernel > Kernel features for the API reference pages of each primitive.',
            },
            {
              title: 'Zephyr Kernel Services — synchronization and data passing (for comparison)',
              url: 'https://docs.zephyrproject.org/latest/kernel/services/index.html',
              type: 'documentation',
              cost: 'free',
              provider: 'Zephyr Project',
            },
            {
              title: 'Memfault Interrupt blog',
              url: 'https://interrupt.memfault.com/',
              type: 'article',
              cost: 'free',
              provider: 'Memfault',
              note: 'Search the archive for the articles on RTOS debugging and priority inversion.',
            },
          ],
          exercises: [
            {
              slug: 'isr-to-task-queue',
              title: 'ISR to task via queue, measured',
              prompt:
                'A GPIO edge ISR timestamps the event and sends it to a queue; a task receives and toggles an output pin. Measure edge-to-toggle latency over 1000 events (a) with portYIELD_FROM_ISR, (b) without it (observe latency up to one tick), (c) with a task notification instead of a queue. Report min/max/mean for each and explain.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'priority-inversion-demo',
              title: 'Reproduce priority inversion and fix it',
              prompt:
                'Create L (low) holding a shared resource for 20 ms every 100 ms, M (medium) burning CPU for 50 ms every 100 ms, and H (high) needing the resource every 30 ms, each toggling a GPIO while running. Protect the resource with a binary semaphore and capture H being delayed by M. Replace it with a mutex and show H\'s delay drops to at most L\'s 20 ms critical section. Quantify both worst cases.',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'deadlock-and-lock-order',
              title: 'Deadlock and its detection',
              prompt:
                'Two tasks each take two mutexes (I2C bus, log buffer) in opposite orders with random delays; show the deadlock within a minute (both tasks blocked forever, visible with vTaskList or by watchdog timeout). Fix with a documented lock order and with timeouts that log an error and release. Argue in a comment why the lock order is complete for your system.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'When do you use a mutex rather than a binary semaphore?',
              answerOutline:
                'To protect a shared resource with ownership semantics and priority inheritance; a binary semaphore is for signalling events (often from an ISR), where give and take happen in different contexts.',
            },
            {
              question: 'Explain priority inversion and how priority inheritance bounds it.',
              answerOutline:
                'A high task waits on a mutex held by a low task that a medium task preempts, so the high task waits indefinitely. Inheritance raises the low task to the high task\'s priority while it holds the mutex, so the wait is bounded by the critical section length.',
            },
            {
              question: 'Why must ISRs use the FromISR API variants?',
              answerOutline:
                'The normal variants may block or trigger a context switch directly, which is illegal in interrupt context; FromISR variants never block and defer the switch to portYIELD_FROM_ISR.',
            },
          ],
          relatedLessons: [
            'operating-systems/concurrency/locks',
            'operating-systems/concurrency/condition-variables-and-semaphores',
          ],
        },
        {
          slug: 'zephyr-and-measuring-real-time-behaviour',
          title: 'Zephyr, device trees and measuring real-time behaviour',
          summary:
            'A second RTOS for perspective: Zephyr\'s build system, Kconfig and device tree, its kernel objects and threads, and tools for observing RTOS behaviour (tracing, latency measurement, CPU load).',
          estimatedMinutes: 150,
          objectives: [
            'Build and flash a Zephyr sample with west for a supported board (or QEMU) and explain the roles of Kconfig and the device tree',
            'Write a Zephyr application with threads, a work queue and a message queue, and compare the API with FreeRTOS',
            'Measure CPU load, worst-case latency and jitter on an RTOS system and present them properly',
            'Decide between FreeRTOS and Zephyr for a project based on footprint, drivers, connectivity stacks and tooling',
          ],
          concepts: [
            'west, CMake, Kconfig (prj.conf)',
            'Device tree: hardware described as data, overlays',
            'Zephyr threads, priorities (cooperative vs preemptive), k_sleep',
            'Work queues and deferred work',
            'k_msgq, k_sem, k_mutex',
            'Logging and shell subsystems',
            'Tracing (SEGGER SystemView, Percepio) and runtime statistics',
            'Choosing an RTOS',
          ],
          explanation: `**Zephyr** is a Linux Foundation RTOS that approaches embedded software the way Linux does: a kernel with a device model, hundreds of supported boards, networking and Bluetooth stacks, and a configuration system. It is bigger and more opinionated than FreeRTOS, and increasingly what commercial IoT products ship. Knowing both lets you choose.

Zephyr builds with \`west build -b <board>\`; the **board** name pulls in a **device tree** describing the hardware (which UART is the console, which GPIO is the LED, what I2C sensors sit on which bus) as data in \`.dts\` files, with **overlays** for your additions. Drivers are instantiated from this data, so an application reads an LED through \`GPIO_DT_SPEC_GET(DT_ALIAS(led0), gpios)\` and runs unchanged on another board. **Kconfig** (\`prj.conf\`) switches features on and off (\`CONFIG_I2C=y\`, \`CONFIG_LOG=y\`). The learning curve is real; the payoff is portability and a huge driver library. QEMU targets (\`qemu_cortex_m3\`) let you run everything without hardware.

The kernel will feel familiar: **threads** with priorities (negative priorities are cooperative, non-negative preemptive), \`k_sleep\`, **semaphores**, **mutexes** (with inheritance), **message queues** (\`k_msgq\`), and **work queues** for deferring ISR work to a thread, which Zephyr prefers over the FreeRTOS pattern of a dedicated task per interrupt. The **logging** subsystem and the interactive **shell** over UART are worth the configuration effort alone.

Whatever the RTOS, you must **measure** it. CPU load: FreeRTOS run-time statistics or Zephyr thread analyzer give per-task CPU percentages. Latency and jitter: the GPIO-and-logic-analyser method from module 2, over long runs with the system fully loaded; report max, not mean, and plot the histogram. **Tracing** tools (SEGGER SystemView, Percepio Tracealyzer, or Zephyr's built-in tracing to a UART) record every context switch and kernel call and show the timeline, which is how you discover that a "500 us" task occasionally takes 5 ms because a lower-priority logger holds the UART mutex. Enable them in development and keep the hooks in production builds if the cost is small.

Work through Zephyr's Getting Started, the blinky and threads samples, and the synchronization sample; then port the module-3 sensor logger to both RTOSes and compare the measurements.`,
          resources: [
            {
              title: 'Zephyr Project — Getting Started Guide',
              url: 'https://docs.zephyrproject.org/latest/develop/getting_started/index.html',
              type: 'documentation',
              cost: 'free',
              provider: 'Zephyr Project',
              primary: true,
            },
            {
              title: 'Zephyr — Kernel Services (threads, scheduling, synchronization, data passing)',
              url: 'https://docs.zephyrproject.org/latest/kernel/services/index.html',
              type: 'documentation',
              cost: 'free',
              provider: 'Zephyr Project',
            },
            {
              title: 'Zephyr — Device Tree guide',
              url: 'https://docs.zephyrproject.org/latest/build/dts/index.html',
              type: 'documentation',
              cost: 'free',
              provider: 'Zephyr Project',
            },
            {
              title: 'QEMU — Arm System emulator (supported boards)',
              url: 'https://www.qemu.org/docs/master/system/target-arm.html',
              type: 'documentation',
              cost: 'free',
              provider: 'QEMU',
              note: 'Zephyr\'s qemu_cortex_m3 and mps2 targets run here for hardware-free RTOS experiments.',
            },
          ],
          exercises: [
            {
              slug: 'zephyr-blinky-to-threads',
              title: 'Zephyr: blinky, threads and an overlay',
              prompt:
                'Build and run the blinky sample on your board or qemu_cortex_m3 (with a printk in place of the LED). Add a device-tree overlay defining a second LED alias and a button, and a prj.conf enabling logging. Then write an application with two preemptive threads at different priorities and a work-queue handler triggered by the button interrupt, logging each event with timestamps.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'port-the-logger',
              title: 'Port the sensor logger to FreeRTOS and Zephyr',
              prompt:
                'Restructure the module-3 logger as tasks/threads: sensor sampling (periodic), GPS parsing (UART-driven), storage writer (queue consumer), and command shell. Implement on FreeRTOS and on Zephyr using the same drivers (bus-interface pattern). Measure for each: flash and RAM footprint, CPU load per task, and the worst-case sampling jitter over 10 minutes; present a comparison table.',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'trace-a-latency-spike',
              title: 'Find a latency spike with tracing',
              prompt:
                'Introduce a hidden problem into the logger (a low-priority task holding the I2C mutex for 30 ms every few seconds, or a printf under a lock). Enable run-time statistics and tracing (Zephyr tracing to UART, FreeRTOS trace hooks, or SystemView if available), capture the moment the sampling task is late, and identify the cause from the trace alone. Write up the investigation as you would a bug report.',
              kind: 'coding',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'What is the device tree for in Zephyr?',
              answerOutline:
                'It describes the board\'s hardware (buses, pins, devices) as data so drivers are instantiated and applications are written against aliases, making code portable across boards.',
            },
            {
              question: 'Why report maximum latency and a histogram rather than an average?',
              answerOutline:
                'Real-time correctness depends on the worst case; the average hides rare long delays caused by contention or interrupts.',
            },
            {
              question: 'Give two reasons to choose Zephyr over FreeRTOS and two for the reverse.',
              answerOutline:
                'Zephyr: built-in networking/BLE stacks and drivers, portability via device tree, logging/shell. FreeRTOS: tiny footprint, simplicity, easy integration into an existing bare-metal project, ubiquitous vendor support (ESP-IDF).',
            },
          ],
        },
      ],
      project: {
        slug: 'rtos-motor-controller',
        title: 'Project: an RTOS-based controller with a proven schedule',
        description: `Build a closed-loop controller (a fan or DC motor with an encoder or tachometer, or a simulated plant in Wokwi) on FreeRTOS: a 1 kHz control task reading speed and updating PWM, a 10 Hz telemetry task, a UART command task, and a logging task. Do the schedulability analysis from measured WCETs, then verify on hardware with traces that the control task never misses its deadline over an hour, including while the logger writes and commands arrive.`,
        deliverables: [
          'Source with a task table (period, priority, measured WCET, stack size) in the README',
          'A response-time analysis showing all deadlines met, and the measured worst-case control latency agreeing with it',
          'A trace capture and a plot of control-loop jitter over an hour',
        ],
        estimatedHours: 10,
        stretchGoals: ['Implement the same system on Zephyr and compare the measurements'],
      },
    },
    {
      slug: 'power-and-analog',
      title: 'Power and Analog',
      description:
        'Measuring the analog world with ADCs done properly, generating analog outputs, and the discipline of low-power design: sleep modes, duty cycling, measuring microamps and predicting battery life.',
      lessons: [
        {
          slug: 'adc-and-sampling',
          title: 'ADCs and sampling: resolution, noise and Nyquist',
          summary:
            'How a SAR ADC works, resolution and effective bits, reference voltage and input impedance, sampling rate and aliasing, and reading a voltage divider, a thermistor and the internal temperature sensor correctly.',
          estimatedMinutes: 150,
          objectives: [
            'Explain SAR conversion, quantisation step (LSB), and the difference between resolution and accuracy/ENOB',
            'Compute the voltage from a raw code given the reference, and size a divider or source impedance for the ADC\'s sample-and-hold',
            'State the Nyquist criterion, demonstrate aliasing, and choose a sampling rate and anti-alias filter',
            'Reduce noise by oversampling and averaging, and measure the ADC\'s actual noise floor',
          ],
          concepts: [
            'Successive-approximation ADC and sample-and-hold',
            'Resolution, LSB = Vref / 2^N, quantisation noise',
            'Accuracy, INL/DNL, ENOB',
            'Reference voltage stability and ground noise',
            'Source impedance and acquisition time',
            'Nyquist rate, aliasing, anti-alias filtering',
            'Oversampling and decimation',
            'DMA-driven continuous sampling',
          ],
          explanation: `An **ADC** turns a voltage into a number. The common MCU type is **successive approximation** (SAR): a sample-and-hold capacitor captures the input, then a binary search compares it against a DAC over $N$ clock cycles, one bit per cycle. The RP2040's 12-bit ADC yields codes 0-4095 for 0 to $V_{\\text{ref}}$, so one **LSB** is $3.3 / 4096 \\approx 0.8$ mV. Resolution is not accuracy: the datasheet gives INL and DNL (how non-uniform the steps are) and the Pico's ADC is known for a few missing codes and noise from the switching regulator, so its **effective number of bits** is about 8-9 unless you clean the supply. Always read the ADC section's electrical characteristics, and remember the result is only as good as $V_{\\text{ref}}$: a noisy 3.3 V rail means a noisy reading.

The sample-and-hold capacitor must charge through the source impedance within the **acquisition time**; a 1 MOhm divider will read low and noisy. Keep the source impedance below the datasheet limit (typically 10-100 kOhm) or add a buffer or a capacitor across the input. A **voltage divider** scales a battery voltage into range; a **thermistor** in a divider gives a nonlinear voltage you convert with the Steinhart-Hart or beta equation. Most MCUs also expose an internal temperature sensor and a reference channel.

**Sampling rate** matters as much as bits. The **Nyquist criterion** says you must sample at more than twice the highest frequency present, or higher frequencies fold down as **aliases** that look like real low-frequency signals; 50/60 Hz mains hum sampled at 55 Hz appears as a slow drift. Filter before sampling (an RC anti-alias filter) and sample fast enough for the filter's roll-off. Conversely, **oversampling**: averaging $4^k$ samples adds about $k$ bits of resolution if the noise is uncorrelated, which it usually is at the LSB level.

For continuous signals (audio, vibration, current waveforms) use the ADC's free-running mode with a **FIFO and DMA** into a buffer, processing one half while the other fills. Read the RP2040 ADC chapter and the Analog Devices tutorials, then measure your own ADC's noise floor; you will trust the next readings more.`,
          resources: [
            {
              title: 'RP2040 Datasheet — section 4.9 (ADC and temperature sensor)',
              url: 'https://datasheets.raspberrypi.com/rp2040/rp2040-datasheet.pdf',
              type: 'documentation',
              cost: 'free',
              provider: 'Raspberry Pi',
              note: 'Including the notes on INL/DNL and the switching-regulator noise and how to reduce it.',
              primary: true,
            },
            {
              title: 'Analog Devices tutorial MT-001: Taking the Mystery out of the Infamous Formula SNR = 6.02N + 1.76 dB',
              url: 'https://www.analog.com/media/en/training-seminars/tutorials/MT-001.pdf',
              type: 'article',
              cost: 'free',
              provider: 'Analog Devices',
              note: 'Quantisation noise and effective bits, short and precise.',
            },
            {
              title: 'pico-examples — adc directory (adc_console, dma_capture)',
              url: 'https://github.com/raspberrypi/pico-examples',
              type: 'documentation',
              cost: 'free',
              provider: 'Raspberry Pi',
            },
            {
              title: 'Arduino Reference — analogRead()',
              url: 'https://docs.arduino.cc/language-reference/en/functions/analog-io/analogRead/',
              type: 'documentation',
              cost: 'free',
              provider: 'Arduino',
            },
          ],
          exercises: [
            {
              slug: 'noise-floor-and-oversampling',
              title: 'Measure the noise floor and recover bits by oversampling',
              prompt:
                'Connect the ADC input to a stable voltage (a divider from the reference, or a battery). Take 10,000 samples and compute mean, standard deviation and a histogram of codes; report the noise in LSBs and the implied ENOB. Then average 4, 16, 64 and 256 samples per reading and show the standard deviation falling; plot it against sqrt(N) and note where it stops improving. If on a Pico, repeat with the SMPS forced to PWM mode (GPIO 23 high) and compare.',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'aliasing-demo',
              title: 'See aliasing happen',
              prompt:
                'Generate a 1 kHz sine (a PWM output through an RC filter, a function generator, or Wokwi\'s signal source) and sample it at 10 kHz, 2.5 kHz and 1.1 kHz with DMA capture. Plot each capture and an FFT on the host, identify the alias frequency at 1.1 kHz, and compute it from f_alias = |f - k f_s|. Then add an RC anti-alias filter with a cutoff at 400 Hz and show the alias amplitude drop.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'thermistor-and-battery',
              title: 'Read a thermistor and a battery voltage correctly',
              prompt:
                'Wire a 10 kOhm NTC thermistor in a divider and compute temperature with the beta equation; validate against the BME280 within 1 degree. Then read a battery through a 100 kOhm/100 kOhm divider: observe the error from source impedance, fix it with a 100 nF capacitor across the ADC input (or a lower-impedance divider), and compute the divider\'s standby current for each design.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What is the LSB of a 12-bit ADC with a 3.3 V reference, and why is the real precision usually worse?',
              answerOutline:
                'About 0.806 mV. Noise on the reference and supply, INL/DNL and source impedance effects reduce effective bits to typically 8-10.',
            },
            {
              question: 'State the Nyquist criterion and give an example of aliasing.',
              answerOutline:
                'Sample faster than twice the highest frequency present. 60 Hz hum sampled at 55 Hz appears as a 5 Hz signal.',
            },
            {
              question: 'How much resolution does averaging 256 samples add, and under what assumption?',
              answerOutline:
                'About 4 bits (256 = 4^4), assuming the noise is uncorrelated and at least about 1 LSB so that it dithers the input.',
            },
          ],
        },
        {
          slug: 'dac-pwm-and-signal-conditioning',
          title: 'Analog output and signal conditioning',
          summary:
            'Generating analog signals with DACs and filtered PWM, driving loads with transistors and H-bridges, op-amp basics for amplifying and level-shifting sensor signals, and protecting inputs.',
          estimatedMinutes: 120,
          objectives: [
            'Produce an analog voltage with a DAC or with PWM plus an RC filter and compute the ripple',
            'Drive LEDs, motors and relays safely with transistors, MOSFETs, flyback diodes and H-bridges',
            'Use an op-amp as a buffer, amplifier and level shifter to fit a sensor signal into the ADC range',
            'Protect inputs with series resistors, clamps and decoupling, and explain grounding basics',
          ],
          concepts: [
            'DAC (R-2R, delta-sigma) and PWM-as-DAC',
            'RC low-pass filter: cutoff f = 1/(2 pi RC), ripple',
            'MOSFET low-side switch; gate drive; flyback diode',
            'H-bridge and motor direction/speed',
            'Op-amp: buffer, non-inverting gain, level shifting',
            'Decoupling capacitors and ground loops',
            'Input protection: series R, clamp diodes, TVS',
            'Isolation (optocoupler) and when it is needed',
          ],
          explanation: `Most MCUs have fewer DACs than ADCs, and many (the RP2040 included) have none, so the universal analog output is **PWM through a low-pass filter**: an RC filter with cutoff $f_c = 1/(2\\pi RC)$ well below the PWM frequency averages the pulses into a DC level proportional to duty cycle. Ripple falls as $f_c / f_{\\text{PWM}}$, and settling time rises as $RC$ grows, so you trade smoothness against response. For audio or waveforms you need a real **DAC** (the ESP32 has two 8-bit ones; external I2S DACs are cheap) or the RP2040's PIO driving a resistor ladder.

A GPIO pin can drive an LED, not a motor. A **low-side N-channel MOSFET** switch is the workhorse: gate to the GPIO (through a small resistor), source to ground, load between the supply and the drain; choose a logic-level MOSFET that turns on fully at 3.3 V. An inductive load (motor, relay, solenoid) must have a **flyback diode** across it, or the voltage spike when switching off destroys the transistor. An **H-bridge** (four switches, or an integrated driver chip) reverses a motor's direction and lets PWM control speed; never switch both sides of one leg on.

Sensors rarely produce 0-3.3 V. An **op-amp** fixes this: as a **buffer** (unity gain) it presents a high impedance to a weak source and a low impedance to the ADC; in a **non-inverting** configuration it amplifies by $1 + R_f/R_g$; with an offset it shifts a bipolar signal into range. Use a rail-to-rail op-amp powered from the MCU's supply so its output can reach the ADC limits. For very small signals (thermocouples, strain gauges) use an instrumentation amplifier or a dedicated front-end ADC.

Finally, the boring things that make hardware work: a 100 nF **decoupling capacitor** at every supply pin, a single ground path for analog signals (ground loops inject noise), a **series resistor** and the pin's internal **clamp diodes** to survive a modest overvoltage, a TVS for real surges, and **opto-isolation** when the other side is at a different potential or mains-connected. Read the relevant chapters of the Art of Electronics if you can; the free SparkFun and Valvano materials cover the essentials. Then build the exercises, with a multimeter and, ideally, an oscilloscope.`,
          resources: [
            {
              title: 'SparkFun — Transistors, Pulse Width Modulation, and Voltage Dividers tutorials',
              url: 'https://learn.sparkfun.com/tutorials/transistors',
              type: 'article',
              cost: 'free',
              provider: 'SparkFun',
              note: 'The Transistors tutorial covers the switch configuration and flyback diodes; see also the PWM tutorial.',
              primary: true,
            },
            {
              title: 'Jonathan Valvano — Embedded Systems: Real-Time Interfacing (EE445L interfacing chapters)',
              url: 'http://users.ece.utexas.edu/~valvano/',
              type: 'course',
              cost: 'free',
              provider: 'University of Texas at Austin',
              note: 'Op-amp interfacing, DACs, motor drivers and analog layout for MCUs.',
            },
            {
              title: 'ESP-IDF — DAC and LEDC documentation',
              url: 'https://docs.espressif.com/projects/esp-idf/en/latest/esp32/api-reference/peripherals/dac.html',
              type: 'documentation',
              cost: 'free',
              provider: 'Espressif',
            },
            {
              title: 'Making Embedded Systems (Elecia White) — chapter on analog signals and motors',
              url: 'https://www.oreilly.com/library/view/making-embedded-systems/9781449308889/',
              type: 'textbook',
              cost: 'paid',
              provider: "O'Reilly",
              note: 'Paid; Valvano and SparkFun cover the same ground for free.',
            },
          ],
          exercises: [
            {
              slug: 'pwm-dac-ripple',
              title: 'PWM as a DAC: measure the ripple',
              prompt:
                'Drive an RC filter (10 kOhm, 1 uF) from a 1 kHz PWM, read the output with the ADC at 50% duty, and measure the ripple (max minus min over 1000 samples) and the settling time after a step from 25% to 75%. Repeat with PWM at 20 kHz and with RC = 1 kOhm/10 uF. Compare all measurements with the computed cutoff frequencies and the expected ripple ratio.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'mosfet-motor-drive',
              title: 'Drive a motor with a MOSFET and PWM',
              prompt:
                'Build a low-side MOSFET switch with a flyback diode for a small DC motor (or Wokwi\'s motor part with a scope on the drain). Control speed with 20 kHz PWM from a UART command. Observe (scope or Wokwi) the drain voltage spike when switching off with the diode removed, then with it. Measure motor current with a sense resistor and the ADC and show stall current vs free-running current.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'op-amp-front-end',
              title: 'Condition a sensor signal',
              prompt:
                'A sensor outputs 0-200 mV. Design a non-inverting op-amp stage (choose Rf and Rg) to map it to 0-3.0 V, simulate or build it with a rail-to-rail op-amp, feed it to the ADC and verify gain and linearity at five points. Then add a 100 kHz noise source (or a square wave) and show the effect of a 1 kHz RC anti-alias filter after the amplifier.',
              kind: 'coding',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does an inductive load need a flyback diode?',
              answerOutline:
                'When the switch opens, the inductor forces current to continue, producing a large voltage spike; the diode gives that current a path and clamps the spike to a diode drop above the supply.',
            },
            {
              question: 'How does PWM act as a DAC, and what limits its quality?',
              answerOutline:
                'A low-pass filter averages the pulses to a DC level proportional to duty. Ripple depends on f_cutoff/f_PWM and settling time on RC; resolution is the PWM counter resolution.',
            },
            {
              question: 'What is the gain of a non-inverting op-amp stage with Rf = 100k and Rg = 10k?',
              answerOutline: '1 + 100/10 = 11.',
            },
          ],
        },
        {
          slug: 'low-power-design-and-sleep-modes',
          title: 'Low-power design and sleep modes',
          summary:
            'Where the microamps go, MCU sleep modes and wake sources, duty cycling and event-driven design, peripheral and clock gating, and the firmware patterns that let a device sleep most of its life.',
          estimatedMinutes: 150,
          objectives: [
            'Explain the components of MCU power (dynamic CVf^2, leakage, peripherals, radios, external circuits) and where to attack each',
            'Use the sleep/deep-sleep/dormant modes of the Pico or ESP32 with timer and GPIO wake sources, and explain what state each preserves',
            'Restructure firmware to be event-driven so the idle path leads to sleep, and avoid the common sleep killers (polling, pull-ups to ground, debug UART, LEDs)',
            'Apply tickless idle in an RTOS and measure its effect',
          ],
          concepts: [
            'Dynamic power P = C V^2 f and leakage',
            'Sleep modes: sleep (WFI), deep sleep, dormant/hibernate; RAM retention',
            'Wake sources: RTC/timer, GPIO, UART, radio',
            'Clock gating and peripheral disable; lowering the clock',
            'Duty cycle and average current',
            'Sleep killers: pull-ups, LEDs, regulators\' quiescent current, floating pins',
            'Tickless idle (FreeRTOS) and power management (Zephyr)',
            'Wake-up latency and its cost',
          ],
          explanation: `A Cortex-M0+ running at 125 MHz draws tens of milliamps; asleep with the clock stopped, microamps; in a dormant state with only an RTC running, under a microamp. A coin cell holds about 220 mAh, so a device that is awake 1% of the time lives a hundred times longer than one that polls. **Low-power design** is about the 99%.

Power has parts. **Dynamic** power is $P \\approx C V^2 f$: lower the clock when you can, and run at the lowest voltage the chip allows. **Leakage** is constant while powered and dominates in sleep; the only cure is powering domains down. **Peripherals** each cost current while clocked; disable what you are not using. **Radios** dominate when active (an ESP32 transmitting Wi-Fi draws over 200 mA), so minimise airtime. And **external circuits**: a 10 kOhm pull-up with a closed switch burns 330 uA forever, an LED 5 mA, a linear regulator's quiescent current 50 uA to several mA; these outlive every software optimisation and are found with a multimeter, not a profiler.

MCUs offer tiers of **sleep**. The lightest (\`WFI\`, wait-for-interrupt) stops the core until any interrupt, waking in a few cycles with everything intact. **Deep sleep** stops most clocks and may power down RAM banks; on the ESP32 deep sleep retains only the RTC memory and reboots on wake, so the firmware must save state before and restore after. **Dormant** on the RP2040 stops all clocks and wakes only on a GPIO edge or RTC alarm. The datasheet's power table gives the current and the wake latency for each; choose the deepest mode whose wake latency and state loss your application tolerates.

The firmware consequence: structure everything to be **event-driven** so that, with nothing to do, the main loop or the RTOS idle task calls sleep; the wake source (timer, pin, radio) is an interrupt that resumes the work. FreeRTOS's **tickless idle** suppresses the tick during long sleeps; Zephyr's power-management subsystem chooses states automatically. Sleep killers to hunt: any polling loop, a debug UART left enabled, a status LED, an un-powered-down sensor, and floating inputs that oscillate. Read the sleep chapters of the ESP-IDF docs and the RP2040 datasheet and the Pico SDK's sleep examples, then apply them to the sensor logger and measure the result in the next lesson.`,
          resources: [
            {
              title: 'ESP-IDF — Sleep Modes',
              url: 'https://docs.espressif.com/projects/esp-idf/en/latest/esp32/api-reference/system/sleep_modes.html',
              type: 'documentation',
              cost: 'free',
              provider: 'Espressif',
              note: 'Light sleep vs deep sleep, wake sources, RTC memory, and the measured currents.',
              primary: true,
            },
            {
              title: 'RP2040 Datasheet — section 2.11 (power) and 5.7 (electrical characteristics, sleep currents)',
              url: 'https://datasheets.raspberrypi.com/rp2040/rp2040-datasheet.pdf',
              type: 'documentation',
              cost: 'free',
              provider: 'Raspberry Pi',
            },
            {
              title: 'FreeRTOS — Tickless low power support',
              url: 'https://www.freertos.org/',
              type: 'documentation',
              cost: 'free',
              provider: 'FreeRTOS',
              note: 'Navigate to Kernel > Low power support for configUSE_TICKLESS_IDLE and the pre/post sleep hooks.',
            },
            {
              title: 'Zephyr — Power Management subsystem',
              url: 'https://docs.zephyrproject.org/latest/services/pm/index.html',
              type: 'documentation',
              cost: 'free',
              provider: 'Zephyr Project',
            },
          ],
          exercises: [
            {
              slug: 'sleep-mode-ladder',
              title: 'Climb the sleep-mode ladder',
              prompt:
                'Write a program that cycles every 10 s through: busy loop at full clock, WFI sleep with a timer wake, deep sleep (ESP32) or clocks-reduced sleep (Pico), and dormant/deepest mode with a GPIO wake. For each state measure current (next lesson\'s methods, or a multimeter in series) and wake-up latency with a GPIO toggle. Produce a table of state, current, wake latency and what state is lost.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'find-the-sleep-killers',
              title: 'Find the sleep killers',
              prompt:
                'Start from a sensor-reading program that sleeps between samples but draws milliamps asleep. Hunt the causes one at a time: a pull-up on a grounded pin, an enabled but idle UART, an LED, a sensor not put into its own sleep mode, a floating input. Measure the current after fixing each and present the savings as a waterfall chart.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'tickless-idle',
              title: 'Tickless idle on an RTOS',
              prompt:
                'Take the RTOS sensor logger, enable tickless idle (FreeRTOS) or power management (Zephyr), and measure average current over one minute with and without it at a 1 Hz sampling rate. Then move to 0.1 Hz. Explain the remaining current using the per-state measurements from the ladder exercise.',
              kind: 'coding',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does duty cycling dominate every other power optimisation?',
              answerOutline:
                'Active current is thousands of times the sleep current, so average current is roughly duty cycle times active current; halving active time halves the battery drain, whereas trimming active current by 10% saves 10%.',
            },
            {
              question: 'What state is lost in ESP32 deep sleep and how does firmware cope?',
              answerOutline:
                'Main RAM and CPU state; only RTC memory and the RTC timer survive, and the chip reboots on wake. Firmware stores needed state in RTC memory or flash before sleeping and checks the wake cause at boot.',
            },
            {
              question: 'Name three hardware sleep killers that software cannot fix.',
              answerOutline:
                'Pull-up resistors with a load to ground, status LEDs, linear regulator quiescent current (also unpowered-down sensors, floating inputs).',
            },
          ],
        },
        {
          slug: 'battery-budgeting-and-measurement',
          title: 'Batteries, power budgets and measuring microamps',
          summary:
            'Battery chemistries and their quirks, measuring current across six orders of magnitude, building a power budget from measured states and duty cycles, and validating predicted battery life.',
          estimatedMinutes: 120,
          objectives: [
            'Compare common batteries (alkaline, Li-ion/LiPo, LiFePO4, coin cells) by capacity, voltage curve, peak current and temperature behaviour',
            'Measure current from 1 uA to 500 mA with a multimeter, a sense resistor and scope, and a power profiler, understanding burden voltage',
            'Build a power budget spreadsheet: states, currents, durations, duty cycle, average current, battery life with derating',
            'Design the power supply chain (regulator type, dropout, efficiency) for a battery-powered node',
          ],
          concepts: [
            'Capacity (mAh), nominal and cutoff voltage, discharge curves',
            'Self-discharge, temperature derating, peak current limits (coin cells)',
            'Burden voltage of a multimeter; shunt resistors',
            'Dynamic current measurement: scope on a shunt, power profilers',
            'Power budget: sum of (I_state x t_state) / period',
            'Derating and margin (self-discharge, aging, cold)',
            'LDO vs buck/boost: dropout, efficiency, quiescent current',
            'Energy harvesting glimpse',
          ],
          explanation: `A **power budget** predicts battery life before you build and verifies it afterwards. It needs two inputs: how much energy the battery provides and how much each state of the device consumes.

**Batteries** are not ideal voltage sources. A CR2032 **coin cell** stores about 220 mAh at 3 V but can supply only a few milliamps continuously; drawing a radio's 30 mA burst collapses its voltage unless a capacitor buffers the pulse. Two alkaline **AA** cells give 2000-3000 mAh but their voltage falls from 3.2 V to 2.0 V over discharge, so the regulator or the MCU must tolerate the range. A single **Li-ion/LiPo** cell gives 3.0-4.2 V and high current, needs a protection circuit, and must not be charged below 0 degrees C; **LiFePO4** is flatter and safer. All chemistries self-discharge (a few percent per year for lithium primaries, more for rechargeables) and lose capacity in the cold. Datasheet discharge curves at your actual current are the source of truth.

**Measuring** current is the hard part, because a sleeping device draws microamps and an active one hundreds of milliamps, and a multimeter on its mA range inserts a **burden** resistance that drops volts during the burst and resets the device. Use a dedicated **power profiler** (the Nordic PPK2 is inexpensive and logs at 100 kHz across the whole range) or two methods: a bench meter on the uA range for sleep current, and a small shunt resistor with an oscilloscope for the active burst, integrating current over time to get charge per event in microcoulombs. Nordic's online power profiler estimates BLE budgets without hardware.

The budget itself is arithmetic: for each state, current times duration; sum over a period; divide by the period for **average current**; divide battery capacity by average current for life in hours. Then **derate**: subtract self-discharge, use 80% of nominal capacity, account for cold, and add margin for firmware bugs that keep the device awake. A typical sensor node: 5 uA asleep for 59.9 s, 15 mA sensing for 50 ms, 150 mA transmitting for 50 ms, every minute, averages about 140 uA, giving roughly 1.5 years on two AAs after derating.

The **regulator** matters: an LDO's quiescent current may exceed the MCU's sleep current, and a buck converter's efficiency collapses at microamp loads unless it has a low-power mode. Read Battery University's chapters on the chemistries, and the Nordic power-profiling guidance, then budget your logger and measure it.`,
          resources: [
            {
              title: 'Battery University — basics of battery chemistries and discharge characteristics',
              url: 'https://batteryuniversity.com/',
              type: 'article',
              cost: 'free',
              provider: 'Battery University',
              note: 'Articles on primary vs secondary cells, Li-ion types, self-discharge and temperature effects.',
              primary: true,
            },
            {
              title: 'Nordic Semiconductor — Power Profiler Kit II',
              url: 'https://www.nordicsemi.com/Products/Development-hardware/Power-Profiler-Kit-2',
              type: 'tool',
              cost: 'paid',
              provider: 'Nordic Semiconductor',
              note: 'A low-cost (about 100 USD) profiler measuring uA to A at 100 kHz. Free alternative: a bench meter plus a shunt and scope, as described in the lesson.',
            },
            {
              title: 'Nordic DevZone — Online Power Profiler (BLE and cellular)',
              url: 'https://devzone.nordicsemi.com/power/',
              type: 'interactive',
              cost: 'free',
              provider: 'Nordic Semiconductor',
              note: 'Estimate average current for a BLE connection profile without hardware.',
            },
            {
              title: 'ESP-IDF — Sleep Modes (current figures and wake-up stub)',
              url: 'https://docs.espressif.com/projects/esp-idf/en/latest/esp32/api-reference/system/sleep_modes.html',
              type: 'documentation',
              cost: 'free',
              provider: 'Espressif',
            },
          ],
          exercises: [
            {
              slug: 'measure-across-six-decades',
              title: 'Measure current across six decades',
              prompt:
                'Measure your sensor node\'s current in sleep with a meter on the uA range, then capture an entire wake-sense-transmit burst with a 1 ohm shunt and a scope (or a PPK2, or Wokwi\'s current estimate if no hardware). Integrate the burst to microcoulombs. Demonstrate the burden-voltage problem by measuring the burst with the meter on the mA range and observing the brown-out or the voltage drop across the meter.',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'power-budget-spreadsheet',
              title: 'A power budget with derating',
              prompt:
                'Build a spreadsheet for your node: states (sleep, sense, Wi-Fi or BLE connect, transmit, OTA check) with measured currents and durations, a configurable reporting interval, battery choice (CR2032, 2xAA, 1000 mAh LiPo), self-discharge and 80% derating. Compute life for intervals of 10 s, 1 min and 10 min and identify, for each, the state that dominates. Then find the reporting interval at which 2xAA last one year.',
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'validate-battery-life',
              title: 'Validate the prediction on battery',
              prompt:
                'Run the node on a small battery (or a supercapacitor, to shorten the test) logging its own battery voltage each report, until it browns out. Compare the measured life with the budget prediction, explain the discrepancy, and fit the discharge curve against the datasheet curve for that current.',
              kind: 'data-analysis',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'Why can a coin cell that stores 220 mAh fail to power a radio burst of 30 mA?',
              answerOutline:
                'Its internal resistance is high, so a 30 mA pulse drops the terminal voltage below the MCU\'s minimum; a bulk capacitor must supply the pulse while the cell recharges it slowly.',
            },
            {
              question: 'What is burden voltage and why does it matter for measuring bursts?',
              answerOutline:
                'The voltage dropped across a meter\'s shunt in series with the circuit; on a sensitive range it can be hundreds of millivolts, starving the device during a high-current burst and causing resets.',
            },
            {
              question: 'Compute the average current for: 5 uA for 59.9 s, 20 mA for 0.1 s, every 60 s.',
              answerOutline:
                '(5e-6 x 59.9 + 20e-3 x 0.1) / 60 = (0.0003 + 0.002) / 60 = 38 uA approximately.',
            },
          ],
        },
      ],
      project: {
        slug: 'long-life-environmental-sensor',
        title: 'Project: a one-year environmental sensor on a coin cell',
        description: `Design a temperature/humidity sensor that samples every 5 minutes, logs to flash, and blinks a status LED briefly, targeting one year on a CR2032. Measure every state, budget it, implement the deepest sleep mode that works, hunt every microamp of external leakage, and validate the average current with a multi-hour measurement. Explain in the report what you would change to transmit the data wirelessly and what that does to the budget.`,
        deliverables: [
          'Firmware using deep sleep with RTC wake, state preserved across sleep',
          'A measured power budget spreadsheet and a current trace of one wake cycle',
          'A short report with the validated average current and the predicted life with derating',
        ],
        estimatedHours: 8,
        stretchGoals: ['Replace the coin cell with a small solar cell and supercapacitor and show energy-neutral operation under a desk lamp'],
      },
    },
    {
      slug: 'connectivity-and-iot-protocols',
      title: 'Connectivity and IoT Protocols',
      description:
        'Getting data off the device: Wi-Fi and TCP/IP on a microcontroller, MQTT as the IoT messaging protocol, Bluetooth Low Energy with GATT, and the long-range and constrained alternatives (LoRaWAN, CoAP) with cloud dashboards.',
      lessons: [
        {
          slug: 'wifi-and-tcp-ip-on-microcontrollers',
          title: 'Wi-Fi and TCP/IP on a microcontroller',
          summary:
            'Bringing up Wi-Fi on an ESP32 or Pico W, the lwIP stack and its socket API, DHCP/DNS/NTP, HTTP clients and a tiny HTTP server, connection management with reconnection and backoff, and the memory and power cost of networking.',
          estimatedMinutes: 150,
          objectives: [
            'Connect to Wi-Fi with ESP-IDF or the Pico W SDK, handle the event-driven connection state machine, and obtain an address via DHCP',
            'Use the lwIP sockets API (or ESP-IDF esp_http_client) to make HTTP GET/POST requests and parse JSON responses',
            'Implement robust connection management: reconnection with exponential backoff, timeouts, and watchdog-friendly design',
            'Measure the RAM, flash and power cost of the network stack and a TLS connection',
          ],
          concepts: [
            'Station vs access-point mode; WPA2 provisioning',
            'lwIP: a TCP/IP stack sized for MCUs',
            'Wi-Fi event loop and connection state machine',
            'DHCP, DNS, NTP for time',
            'BSD sockets on an MCU; blocking vs select',
            'HTTP client and minimal server',
            'Exponential backoff and jitter; connection watchdog',
            'Memory: socket buffers, TLS handshake peak RAM',
          ],
          explanation: `The ESP32 and the Pico W put a Wi-Fi radio next to the MCU and run **lwIP**, a TCP/IP stack designed for tens of kilobytes of RAM. The programming model is **event-driven**: you start the Wi-Fi driver in station mode with an SSID and password, and the stack posts events (started, connected, got IP, disconnected) that your handler acts on. Treat this as a state machine, not a sequence: connections drop, access points reboot, DHCP leases expire, and the firmware must reconnect forever without human help. The **Computer Networks** subject covers the protocols themselves; this lesson is about living with them on 300 KB of RAM.

Once you have an IP address you have **BSD sockets**: \`socket\`, \`connect\`, \`send\`, \`recv\`, just as in the systems-programming subject, with the caveats that blocking calls block an RTOS task (so networking lives in its own task), buffers are small, and the number of simultaneous sockets is limited by configuration. ESP-IDF layers helpers on top: \`esp_http_client\` for HTTP requests, \`esp_sntp\` for time (which you need for timestamps and certificate validation), mDNS for discovery. A minimal HTTP server for a configuration page is a few hundred lines with the \`esp_http_server\` component.

**Robustness** is the real work. Every network call needs a **timeout**. Reconnection must use **exponential backoff with jitter** (1 s, 2 s, 4 s, up to a cap, plus a random offset) so that a thousand devices do not hammer a recovering server in lockstep. A **connection watchdog** should reset the Wi-Fi driver, and ultimately the device, if nothing has succeeded for a long time. Provisioning credentials (a captive portal, BLE, or a serial command) and storing them in non-volatile storage, never in the source, is part of the design.

The **cost**: the Wi-Fi stack and lwIP take about 100-200 KB of flash and 50-100 KB of RAM on the ESP32, a TLS handshake peaks at another 30-50 KB and a second of CPU, and the radio draws 100-250 mA while associated and transmitting. Connecting from cold (association, DHCP, DNS, TLS) takes 1-3 s, which dominates the power budget of a device that sleeps between reports; keeping a connection alive in light sleep (DTIM) is the alternative, with its own cost. Read the ESP-IDF Wi-Fi guide and the station example, then build the exercises and measure everything.`,
          resources: [
            {
              title: 'ESP-IDF — Wi-Fi Driver programming guide',
              url: 'https://docs.espressif.com/projects/esp-idf/en/latest/esp32/api-guides/wifi.html',
              type: 'documentation',
              cost: 'free',
              provider: 'Espressif',
              note: 'The station-mode event flow and the connection state machine diagram.',
              primary: true,
            },
            {
              title: 'ESP-IDF — ESP HTTP Client',
              url: 'https://docs.espressif.com/projects/esp-idf/en/latest/esp32/api-reference/protocols/esp_http_client.html',
              type: 'documentation',
              cost: 'free',
              provider: 'Espressif',
            },
            {
              title: 'Raspberry Pi Pico W — networking documentation and pico-examples (pico_w/wifi)',
              url: 'https://www.raspberrypi.com/documentation/microcontrollers/',
              type: 'documentation',
              cost: 'free',
              provider: 'Raspberry Pi',
              note: 'Connecting to Wi-Fi with lwIP in the Pico SDK; see also the pico_w examples in pico-examples.',
            },
            {
              title: 'lwIP — A Lightweight TCP/IP stack (documentation)',
              url: 'https://savannah.nongnu.org/projects/lwip/',
              type: 'documentation',
              cost: 'free',
              provider: 'lwIP project',
            },
          ],
          exercises: [
            {
              slug: 'wifi-state-machine',
              title: 'A bulletproof Wi-Fi connection manager',
              prompt:
                'Implement a connection manager task that connects, obtains an address, syncs time via SNTP, and reconnects with exponential backoff and jitter on any failure, logging every transition. Test it by: turning the access point off for 10 minutes and back on; changing the password; and disconnecting the antenna/putting the board in a metal box. Report the reconnection times and confirm the backoff schedule in the logs.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'http-post-sensor-data',
              title: 'POST sensor data over HTTP and HTTPS',
              prompt:
                'Every 10 s, POST a JSON body of sensor readings to a local HTTP server (a 20-line Python Flask app) and parse the JSON response. Then switch to HTTPS with a self-signed certificate bundled in the firmware. Measure for each: heap free before/during/after the request (esp_get_free_heap_size), request latency, and current during the request. Explain the TLS handshake cost.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'tiny-config-server',
              title: 'A configuration web page on the device',
              prompt:
                'Run an HTTP server on the device serving a page that shows the latest readings and a form to set the reporting interval and the server URL, stored in NVS so they survive reboot. Add access-point mode with a captive-portal page for entering Wi-Fi credentials when none are stored. Test the flow from a fresh flash with no credentials.',
              kind: 'coding',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'Why must Wi-Fi connection handling be a state machine driven by events rather than a linear sequence?',
              answerOutline:
                'Connections fail and recover at any time (AP restarts, DHCP lease loss, interference); firmware must react to disconnect events and re-enter the connecting state indefinitely.',
            },
            {
              question: 'What is exponential backoff with jitter for?',
              answerOutline:
                'Spacing retries out increasingly to avoid overloading a recovering server, with randomisation so that many devices do not retry simultaneously (thundering herd).',
            },
            {
              question: 'Why is connecting from cold expensive for a battery device, and what is the alternative?',
              answerOutline:
                'Association, DHCP, DNS and a TLS handshake take 1-3 s at over 100 mA. Alternatives: keep the association alive in light sleep (DTIM listening), batch reports, or use a lower-power radio (BLE, LoRa).',
            },
          ],
          relatedLessons: ['computer-networks/application-layer/socket-programming'],
        },
        {
          slug: 'mqtt',
          title: 'MQTT: publish/subscribe for constrained devices',
          summary:
            'The MQTT protocol: brokers, topics, QoS levels, retained messages, last will, keep-alive and sessions; running Mosquitto; an MQTT client on the device with TLS; and designing a topic scheme and payload format.',
          estimatedMinutes: 150,
          objectives: [
            'Explain the MQTT model (broker, publish, subscribe, topics with wildcards) and read the packet types in the specification',
            'Choose QoS 0, 1 or 2 and explain the delivery guarantees, duplicates and the cost of each',
            'Use retained messages, last will and testament, keep-alive and persistent sessions to build robust device behaviour',
            'Run Mosquitto locally, connect a device over TLS with authentication, and design a topic hierarchy and JSON/CBOR payloads',
          ],
          concepts: [
            'Broker-mediated publish/subscribe; decoupling',
            'Topics, levels, + and # wildcards',
            'QoS 0/1/2 and the packet exchanges (PUBACK, PUBREC/PUBREL/PUBCOMP)',
            'Retained messages; last will and testament',
            'Keep-alive, PINGREQ, clean vs persistent sessions',
            'MQTT 3.1.1 vs 5.0 (properties, reason codes, shared subscriptions)',
            'TLS, username/password and client certificates',
            'Payload design: JSON vs CBOR; topic schemes',
          ],
          explanation: `**MQTT** is the lingua franca of IoT because it fits constrained devices and unreliable networks. A **broker** sits in the middle; devices **publish** messages to **topics** (\`home/kitchen/temperature\`) and anything interested **subscribes**, with wildcards (\`home/+/temperature\`, \`home/#\`). Publishers and subscribers never know about each other, which is the point: a node sends a 50-byte packet and goes to sleep, and the dashboard, the database and the alerting rule each receive it independently. The protocol has a 2-byte minimum header and a dozen packet types; read the OASIS specification's packet section once, it is short.

**QoS** is the choice you must understand. QoS 0 is fire-and-forget: one packet, may be lost. QoS 1 guarantees delivery at least once with a PUBACK, so duplicates are possible and your consumers must be idempotent (include a sequence number or timestamp). QoS 2 guarantees exactly once with a four-packet handshake, at double the airtime and state on both sides. Sensor readings are usually QoS 0 or 1; commands that must not be repeated (open the valve) are QoS 2 or QoS 1 with idempotent design.

Three features make devices robust. A **retained** message is stored by the broker and delivered to new subscribers immediately, so a dashboard that starts later sees the last known state. The **last will and testament** is a message the broker publishes on the device's behalf if it disconnects ungracefully, giving you an "offline" indication for free. **Keep-alive** sets how often the client must send something (or a PINGREQ) so the broker can detect dead connections; a **persistent session** lets the broker queue QoS 1/2 messages for a device while it sleeps. MQTT 5 adds message expiry, reason codes and shared subscriptions.

Security is not optional: use TLS (port 8883) with the broker's CA certificate on the device, and authenticate with per-device credentials or client certificates, so that one compromised device cannot impersonate others; set broker ACLs so a device can publish only to its own topics. Run **Mosquitto** locally (it takes a minute), test with \`mosquitto_pub\`/\`mosquitto_sub\`, then connect the device with ESP-MQTT or an equivalent client. Design topics as \`<site>/<device-id>/<measurement>\` and payloads as small JSON (or CBOR when bytes matter). Read HiveMQ's MQTT Essentials series for the concepts and the spec for the details.`,
          resources: [
            {
              title: 'MQTT Version 5.0 — OASIS Standard',
              url: 'https://docs.oasis-open.org/mqtt/mqtt/v5.0/mqtt-v5.0.html',
              type: 'documentation',
              cost: 'free',
              provider: 'OASIS',
              note: 'Sections 3 (control packets) and 4 (operational behaviour, QoS flows). MQTT 3.1.1 is at the same site.',
              primary: true,
            },
            {
              title: 'HiveMQ — MQTT Essentials',
              url: 'https://www.hivemq.com/mqtt-essentials/',
              type: 'article',
              cost: 'free',
              provider: 'HiveMQ',
              note: 'A readable ten-part introduction covering QoS, retained messages, LWT and keep-alive.',
            },
            {
              title: 'Eclipse Mosquitto — open-source MQTT broker',
              url: 'https://mosquitto.org/',
              type: 'tool',
              cost: 'free',
              provider: 'Eclipse Foundation',
              note: 'Run it locally with TLS and ACLs; mosquitto_pub/sub are the test tools. A public test broker exists at test.mosquitto.org.',
            },
            {
              title: 'ESP-IDF — ESP-MQTT client',
              url: 'https://docs.espressif.com/projects/esp-idf/en/latest/esp32/api-reference/protocols/mqtt.html',
              type: 'documentation',
              cost: 'free',
              provider: 'Espressif',
            },
          ],
          exercises: [
            {
              slug: 'mosquitto-and-qos',
              title: 'Mosquitto, QoS and packet captures',
              prompt:
                'Install Mosquitto, publish and subscribe from the command line, then from the device. Capture the traffic with Wireshark (plain MQTT on 1883) for one QoS 0, one QoS 1 and one QoS 2 publish and annotate every packet. Then kill the network mid-QoS-1 publish (unplug the AP) and show the duplicate delivery after reconnect; make the subscriber idempotent with a sequence number.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'retained-lwt-keepalive',
              title: 'Retained state, last will and keep-alive',
              prompt:
                'Have the device publish its status to <site>/<id>/status as a retained "online" message on connect, with a last will of retained "offline", and readings every 10 s. Subscribe from a second client started later and confirm it immediately sees the status and the last retained reading. Pull the device\'s power and measure the time until "offline" appears for keep-alive values of 10, 60 and 300 s; explain the relationship.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'tls-and-acls',
              title: 'Secure the broker',
              prompt:
                'Configure Mosquitto with a self-signed CA, a server certificate, per-device username/password (or client certificates) and an ACL allowing each device to publish only under its own id. Embed the CA certificate in the firmware and connect over port 8883. Demonstrate that device A cannot publish to device B\'s topic, and show in a Wireshark capture that the payload is now encrypted. Measure the heap and time cost of the TLS connection on the device.',
              kind: 'coding',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'What does QoS 1 guarantee and what must the consumer do about it?',
              answerOutline:
                'At-least-once delivery via PUBACK with retransmission; duplicates are possible, so consumers must be idempotent (sequence numbers, timestamps).',
            },
            {
              question: 'How does a dashboard know a device went offline unexpectedly?',
              answerOutline:
                'The device registers a last will message at connect; when the broker detects the connection dead (keep-alive expiry), it publishes the will, e.g. a retained "offline" status.',
            },
            {
              question: 'Why should each device have its own credentials and ACL?',
              answerOutline:
                'So a compromised device cannot impersonate others or subscribe to their data; the blast radius of a leak is one device, whose credentials can be revoked.',
            },
          ],
        },
        {
          slug: 'ble',
          title: 'Bluetooth Low Energy',
          summary:
            'The BLE stack from the radio up: advertising and scanning, connections and connection intervals, GATT services and characteristics, notifications, pairing and security, and building a sensor peripheral readable from a phone.',
          estimatedMinutes: 150,
          objectives: [
            'Describe the BLE layers (PHY, link layer, L2CAP, ATT/GATT, GAP) and the roles (peripheral/central, advertiser/scanner)',
            'Explain advertising intervals, connection intervals, slave latency and their effect on latency and power',
            'Design a GATT service with characteristics, properties (read/write/notify) and descriptors, and implement it on an ESP32 or Pico W',
            'Explain pairing, bonding and the security modes, and test the peripheral with a phone app',
          ],
          concepts: [
            'BLE vs Bluetooth Classic; 2.4 GHz, 40 channels, frequency hopping',
            'GAP roles: advertiser, scanner, peripheral, central',
            'Advertising packets, intervals, scan response',
            'Connection interval, slave latency, supervision timeout',
            'ATT and GATT: services, characteristics, descriptors, UUIDs',
            'Read, write, notify, indicate',
            'Pairing, bonding, LE Secure Connections, privacy',
            'Beacons and broadcast-only designs',
          ],
          explanation: `**Bluetooth Low Energy** is designed for devices that send a few bytes occasionally and sleep the rest of the time; a sensor beacon can run for years on a coin cell. It shares only the brand with Bluetooth Classic. The radio hops among 40 channels at 2.4 GHz; three are reserved for **advertising**, the rest for connections.

The **GAP** layer defines roles. A **peripheral** (your sensor) advertises: it broadcasts small packets at an **advertising interval** (20 ms to 10 s) announcing its name, services and optionally data; a **central** (a phone, a gateway) scans and may **connect**. In a connection the two exchange packets at every **connection interval** (7.5 ms to 4 s); the peripheral may skip intervals (**slave latency**) to save power, and a **supervision timeout** ends a dead link. These three numbers are your latency-versus-power dial: a 1 s interval with latency 4 sips microamps but responds slowly. Beacons skip connections entirely and put the data in the advertisement.

Data is organised by **GATT**: a **service** (identified by a 16-bit UUID for standard ones like Battery Service 0x180F, or a 128-bit custom UUID) contains **characteristics**, each a value with **properties** (read, write, notify, indicate) and **descriptors** (a human-readable name, the client configuration descriptor that enables notifications). A phone reads the temperature characteristic, or subscribes to **notifications** and receives a value whenever the peripheral updates it; notifications are unacknowledged, indications are acknowledged. Reuse standard services where they exist (Environmental Sensing, Battery, Device Information) so generic apps understand your device.

**Security**: an unpaired connection is unencrypted and anyone nearby can read or write. **Pairing** establishes keys, with methods from "Just Works" (no protection against an active attacker) to passkey entry and **LE Secure Connections** (elliptic-curve Diffie-Hellman); **bonding** stores the keys so re-connection is seamless. Mark sensitive characteristics as requiring encryption or authentication. Resolvable private addresses protect against tracking.

Implement with ESP-IDF's NimBLE stack (or BTstack on the Pico W, or Zephyr's Bluetooth stack), test with the nRF Connect phone app, and read Nordic's free BLE Fundamentals course, which is the best introduction available.`,
          resources: [
            {
              title: 'Nordic Developer Academy — Bluetooth Low Energy Fundamentals',
              url: 'https://academy.nordicsemi.com/courses/bluetooth-low-energy-fundamentals/',
              type: 'course',
              cost: 'free',
              provider: 'Nordic Semiconductor',
              note: 'Free course covering the stack, advertising, connections, GATT and security; hands-on parts use Nordic boards but the lessons are general.',
              primary: true,
            },
            {
              title: 'Bluetooth SIG — Core Specification and assigned numbers',
              url: 'https://www.bluetooth.com/specifications/specs/',
              type: 'documentation',
              cost: 'free',
              provider: 'Bluetooth SIG',
              note: 'The Core Specification Volume 3 (host: ATT/GATT/GAP) and the Assigned Numbers document for standard UUIDs.',
            },
            {
              title: 'ESP-IDF — Bluetooth (NimBLE and Bluedroid) API reference and examples',
              url: 'https://docs.espressif.com/projects/esp-idf/en/latest/esp32/api-reference/bluetooth/index.html',
              type: 'documentation',
              cost: 'free',
              provider: 'Espressif',
            },
            {
              title: 'Adafruit — Introduction to Bluetooth Low Energy',
              url: 'https://learn.adafruit.com/introduction-to-bluetooth-low-energy',
              type: 'article',
              cost: 'free',
              provider: 'Adafruit',
              note: 'A gentle GAP/GATT overview to read first.',
            },
          ],
          exercises: [
            {
              slug: 'environmental-sensing-peripheral',
              title: 'A GATT environmental sensor',
              prompt:
                'Implement a peripheral exposing the standard Environmental Sensing Service (temperature and humidity characteristics, standard UUIDs and formats), Battery Service, and a custom service with a writable "reporting interval" characteristic. Advertise with the device name and service UUIDs. Verify with the nRF Connect app that values read correctly, notifications arrive on change, and writing the interval changes the notification rate.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'connection-parameters-vs-power',
              title: 'Connection parameters vs power and latency',
              prompt:
                'With the peripheral connected to a phone or a second board as central, measure average current and notification latency for connection intervals of 7.5 ms, 100 ms and 1 s, and slave latency 0 and 4. Then disconnect and measure advertising-only current at 100 ms, 1 s and 5 s intervals. Build a table and a recommendation for a sensor that must respond to a command within 2 s.',
              kind: 'data-analysis',
              difficulty: 3,
            },
            {
              slug: 'pairing-and-encryption',
              title: 'Require pairing for a protected characteristic',
              prompt:
                'Add a characteristic that resets the device\'s log, and require encryption and authentication (passkey or LE Secure Connections) to write it. Show with nRF Connect that an unpaired central is refused, pair with a passkey, bond, and show the write succeeds and re-connection needs no new pairing. Use a BLE sniffer (nRF Sniffer or Wireshark with a supported dongle) if available to show the encrypted traffic.',
              kind: 'coding',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'What are services, characteristics and descriptors in GATT?',
              answerOutline:
                'A service groups related characteristics; a characteristic is a value with properties (read/write/notify); descriptors add metadata such as the client configuration that enables notifications.',
            },
            {
              question: 'How do connection interval and slave latency trade latency against power?',
              answerOutline:
                'A longer interval and higher latency mean the peripheral wakes its radio less often (lower power) but a central\'s request or the peripheral\'s notification waits longer for the next event.',
            },
            {
              question: 'What does "Just Works" pairing protect against, and what does it not?',
              answerOutline:
                'It encrypts the link against passive eavesdropping but offers no authentication, so an active man-in-the-middle during pairing is possible; passkey or numeric comparison (LE Secure Connections) adds authentication.',
            },
          ],
        },
        {
          slug: 'lpwan-coap-and-cloud-dashboards',
          title: 'LoRaWAN, CoAP and cloud dashboards',
          summary:
            'Long-range low-power networking with LoRa and LoRaWAN, CoAP as the constrained REST protocol, and turning device data into something people can see with Node-RED, InfluxDB and Grafana.',
          estimatedMinutes: 120,
          objectives: [
            'Explain LoRa modulation trade-offs (spreading factor, bandwidth, range, airtime) and the LoRaWAN network architecture, device classes and duty-cycle regulations',
            'Describe CoAP (UDP, REST methods, observe, block-wise transfer) and when it beats MQTT',
            'Build a pipeline broker -> Node-RED -> InfluxDB -> Grafana showing live and historical data from your node',
            'Compare connectivity options (Wi-Fi, BLE, LoRaWAN, cellular LTE-M/NB-IoT, Thread/Zigbee) for a product on range, power, cost and data rate',
          ],
          concepts: [
            'LoRa chirp spread spectrum; spreading factor vs airtime',
            'LoRaWAN: end devices, gateways, network server; classes A/B/C',
            'Duty-cycle limits and fair-use policies',
            'CoAP over UDP; GET/PUT/POST/DELETE; observe; DTLS',
            'Node-RED flows for routing and transformation',
            'Time-series databases (InfluxDB) and Grafana dashboards',
            'Thread/Zigbee/Matter and cellular IoT (overview)',
            'Choosing a radio for a product',
          ],
          explanation: `Wi-Fi is power-hungry and BLE is short-range. For a sensor in a field or a basement reporting a few bytes an hour, **LoRa** is the answer: a chirp-spread-spectrum modulation in the sub-GHz ISM bands (868 MHz in Europe, 915 MHz in the US) that trades data rate for sensitivity, reaching kilometres at a few hundred bits per second. The **spreading factor** (SF7-SF12) is the dial: each step doubles airtime and adds about 2.5 dB of link budget. **LoRaWAN** is the network protocol on top: end devices transmit to any **gateway** in range, gateways forward to a **network server** that deduplicates, handles encryption (device and application keys) and routes to your application. **Class A** devices only listen briefly after transmitting (lowest power), Class B listen at scheduled slots, Class C always. Regulation limits airtime to about 1% duty cycle in Europe, and The Things Network's fair-use policy is 30 s of airtime per day; a 20-byte packet at SF12 takes about 1.5 s, so design your payload in bytes, not JSON. The Things Network provides free community coverage and tooling to learn on.

**CoAP** is REST for constrained devices: GET/PUT/POST/DELETE on URIs, over UDP with its own reliability, 4-byte headers, **observe** for push notifications, block-wise transfer for larger payloads, and DTLS for security. It fits request/response patterns and very small devices (Thread and Matter use it) where MQTT's persistent TCP connection does not.

Data must be seen to be useful. The standard open pipeline: the device publishes MQTT; **Node-RED** subscribes, transforms and routes with a visual flow editor (and can send alerts); **InfluxDB** stores time series; **Grafana** draws dashboards with alerting. All three run on a laptop or a Raspberry Pi in an afternoon. Cloud equivalents (AWS IoT Core, Azure IoT Hub) add device management and scale, at the cost of lock-in; the concepts are identical.

Finally, the choice. Range, power, data rate, cost per device, infrastructure you must own, and whether the deployment has mains power decide between Wi-Fi, BLE, LoRaWAN, cellular (LTE-M/NB-IoT), or a mesh (Thread, Zigbee). Read The Things Network documentation and the CoAP RFC's introduction, build the dashboard, and write the comparison for your capstone.`,
          resources: [
            {
              title: 'The Things Network — LoRaWAN documentation',
              url: 'https://www.thethingsnetwork.org/docs/',
              type: 'documentation',
              cost: 'free',
              provider: 'The Things Network',
              note: 'LoRaWAN fundamentals, device classes, airtime calculator and fair-use policy.',
              primary: true,
            },
            {
              title: 'RFC 7252 — The Constrained Application Protocol (CoAP)',
              url: 'https://www.rfc-editor.org/rfc/rfc7252',
              type: 'documentation',
              cost: 'free',
              provider: 'IETF',
              note: 'Sections 1-5 for the model and message format.',
            },
            {
              title: 'Node-RED — low-code programming for event-driven applications',
              url: 'https://nodered.org/',
              type: 'tool',
              cost: 'free',
              provider: 'OpenJS Foundation',
            },
            {
              title: 'Grafana (open source)',
              url: 'https://grafana.com/',
              type: 'tool',
              cost: 'freemium',
              provider: 'Grafana Labs',
              note: 'Open-source edition is free; pair with InfluxDB (https://www.influxdata.com/) for time series.',
            },
            {
              title: 'LoRa Alliance — About LoRaWAN',
              url: 'https://lora-alliance.org/about-lorawan/',
              type: 'documentation',
              cost: 'free',
              provider: 'LoRa Alliance',
            },
          ],
          exercises: [
            {
              slug: 'airtime-and-payload-design',
              title: 'LoRaWAN airtime and payload design',
              prompt:
                'Using The Things Network airtime calculator, compute the airtime for a 12-byte and a 51-byte payload at SF7, SF9 and SF12 with 125 kHz bandwidth. Given the 30 s/day fair-use limit, how many reports per day are allowed at each? Design a binary payload format for temperature (0.01 degree resolution), humidity, battery voltage and a status byte in at most 8 bytes, and write the encoder (C) and a decoder (JavaScript, as a TTN payload formatter) with tests.',
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'node-red-influx-grafana',
              title: 'Build the dashboard pipeline',
              prompt:
                'Install Node-RED, InfluxDB and Grafana (Docker is fine). Create a Node-RED flow that subscribes to your device\'s MQTT topics, validates and converts the JSON, writes to InfluxDB, and sends an alert (e-mail, Telegram or a desktop notification) when temperature exceeds a threshold. Build a Grafana dashboard with live values, a 24 h history graph and the device online/offline status from the retained LWT. Run it for a day and export the dashboard JSON.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'coap-vs-mqtt',
              title: 'CoAP vs MQTT on the device',
              prompt:
                'Implement the sensor report over CoAP (libcoap in ESP-IDF, or a minimal CoAP POST you write over UDP sockets) to a local CoAP server (aiocoap in Python). Compare with your MQTT implementation: bytes on the wire per report (Wireshark), flash and RAM footprint, time from wake to report delivered, and behaviour when the server is down. Write a one-page recommendation for a battery sensor and for a controllable actuator.',
              kind: 'coding',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'What does increasing the LoRa spreading factor do?',
              answerOutline:
                'Increases range/sensitivity (about 2.5 dB per step) at the cost of roughly doubling airtime and power per packet and reducing the data rate.',
            },
            {
              question: 'When is CoAP a better fit than MQTT?',
              answerOutline:
                'Request/response interactions, very constrained devices or networks without TCP, multicast or discovery needs, and ecosystems built on it (Thread/Matter); MQTT suits many-to-many telemetry via a broker.',
            },
            {
              question: 'What role does Node-RED play in the dashboard pipeline?',
              answerOutline:
                'It subscribes to device data, validates/transforms it, routes it to storage (InfluxDB) and triggers actions such as alerts, without writing a backend service.',
            },
          ],
        },
      ],
      project: {
        slug: 'connected-sensor-with-dashboard',
        title: 'Project: a connected sensor with a live dashboard',
        description: `Connect the module-3 sensor logger to the world: publish readings over MQTT with TLS from an ESP32 or Pico W (or over BLE to a gateway script on a laptop that republishes to MQTT), with retained status and last will, a persistent session so readings buffered during an outage are delivered afterwards, and a Node-RED/InfluxDB/Grafana dashboard with an alert. Prove robustness by cutting the network for an hour and showing no data loss.`,
        deliverables: [
          'Firmware with a documented topic scheme, payload format and reconnection strategy',
          'Broker configuration with TLS and per-device ACLs',
          'A Grafana dashboard export and a screenshot showing the gap-free data across a simulated outage',
        ],
        estimatedHours: 10,
        stretchGoals: ['Add a LoRaWAN node reporting through The Things Network into the same dashboard'],
      },
    },
    {
      slug: 'firmware-engineering-and-security',
      title: 'Firmware Engineering and Security',
      description:
        'What turns working code into a product: layered architecture and host-side testing with CI, bootloaders and secure over-the-air updates, threat modelling and the security features of modern MCUs, and the reliability engineering (watchdogs, fault handlers, logging, crash reports) that keeps devices alive in the field.',
      lessons: [
        {
          slug: 'firmware-architecture-and-testing',
          title: 'Firmware architecture, testing and continuous integration',
          summary:
            'Layering firmware (HAL, drivers, services, application) for portability and testability, unit tests on the host with fakes and mocks, hardware-in-the-loop tests, static analysis, and a CI pipeline that builds and tests every commit.',
          estimatedMinutes: 150,
          objectives: [
            'Design a layered firmware architecture with explicit interfaces and no upward dependencies',
            'Write host-side unit tests for drivers and logic using fakes/mocks (Unity/CMock or similar) and measure coverage',
            'Set up hardware-in-the-loop tests driven from a PC over UART and a CI pipeline (GitHub Actions) that builds, lints and tests',
            'Apply static analysis, MISRA-style guidelines selectively, and version/trace firmware builds',
          ],
          concepts: [
            'Layers: HAL, drivers, middleware/services, application',
            'Interfaces as structs of function pointers; dependency injection',
            'Unit tests on host; fakes vs mocks; test doubles for hardware',
            'Hardware-in-the-loop (HIL) testing',
            'Static analysis (cppcheck, clang-tidy), -Wall -Wextra -Werror, MISRA C',
            'Build reproducibility; firmware version and git hash in the image',
            'CI for embedded: cross-compile in a container, run host tests, size regression checks',
            'Code review and the definition of done',
          ],
          explanation: `A hobby project is one file that works today; a product is a codebase that still builds and passes its tests in five years on new hardware. The difference is **architecture** and **testing**.

**Layer** the firmware. At the bottom, a **HAL** (or the vendor SDK) touches registers. **Drivers** implement devices in terms of a bus interface (the module-3 pattern). **Services** (logging, storage, connectivity, update) use drivers. The **application** composes services into behaviour. Dependencies point downward only; the application never includes a register header. Each boundary is an interface, which in C means a header plus, where runtime substitution is needed, a struct of function pointers. This is what makes most of the code **compilable on the host**, where tests run in milliseconds and a debugger has unlimited breakpoints.

**Unit tests** on the host use **test doubles**: a *fake* bus that replays bytes, a *mock* that asserts the driver wrote the expected register sequence (CMock generates these from headers), a fake clock you can advance by hand to test timeouts without waiting. Aim to test every state machine, parser, filter, protocol encoder and driver this way; measure **coverage** so untested branches are visible. What cannot run on the host, the real timing and the real peripherals, is covered by **hardware-in-the-loop** tests: a PC script flashes a build, drives the device over UART with the command protocol from module 3, stimulates inputs (a second MCU can simulate sensors), and checks outputs, running on a board attached to the CI machine.

**Static analysis** finds what tests miss: enable \`-Wall -Wextra -Werror\`, run cppcheck or clang-tidy on every commit, and adopt the MISRA C rules that matter (no dynamic allocation after init, no recursion, every switch has a default, fixed-width types) without the ceremony. Embed the **version and git hash** in the image and print them at boot, so a device in the field can be matched to a commit.

**CI** ties it together: a GitHub Actions workflow that, on every push, cross-compiles in a container with a pinned toolchain, runs the host tests with coverage, runs static analysis, checks that flash and RAM usage have not regressed beyond a threshold, and archives the firmware images. Read the ThrowTheSwitch materials and Grenning's book (paid, with the free Unity/CMock tools), the Memfault articles on CI for embedded, and set the pipeline up for your logger now; every later lesson adds to it.`,
          resources: [
            {
              title: 'Unity, CMock and Ceedling (ThrowTheSwitch)',
              url: 'https://github.com/ThrowTheSwitch/Unity',
              type: 'tool',
              cost: 'free',
              provider: 'ThrowTheSwitch',
              note: 'Unity is the test framework; CMock generates mocks from headers; Ceedling is the build/test runner. See the ThrowTheSwitch organisation for all three.',
              primary: true,
            },
            {
              title: 'Test-Driven Development for Embedded C (James Grenning)',
              url: 'https://pragprog.com/titles/jgade/test-driven-development-for-embedded-c/',
              type: 'textbook',
              cost: 'paid',
              provider: 'Pragmatic Bookshelf',
              note: 'The reference on test doubles for hardware. Paid; the free Unity/CMock documentation and Memfault articles cover the techniques.',
            },
            {
              title: 'Memfault Interrupt — articles on embedded CI, unit testing and firmware best practices',
              url: 'https://interrupt.memfault.com/',
              type: 'article',
              cost: 'free',
              provider: 'Memfault',
              note: 'Search for "unit testing", "GitHub Actions" and "best practices".',
            },
            {
              title: 'PlatformIO — cross-platform build system with unit testing and CI support',
              url: 'https://docs.platformio.org/',
              type: 'documentation',
              cost: 'free',
              provider: 'PlatformIO',
              note: 'Its Unit Testing and CI sections show host and on-target tests for Arduino/ESP-IDF projects.',
            },
          ],
          exercises: [
            {
              slug: 'relayer-the-logger',
              title: 'Re-layer the logger and test the top three layers on the host',
              prompt:
                'Restructure the sensor logger into hal/, drivers/, services/ and app/ directories with a dependency rule enforced by include paths (app cannot include hal headers). Write host unit tests with Unity for: each driver against a fake bus, the frame parser, the filter, the storage ring log (against a fake flash), and the application state machine against a fake clock. Report coverage with gcov; aim for over 80% of the non-HAL code.',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'hil-test-rig',
              title: 'A hardware-in-the-loop test',
              prompt:
                'Write a Python test (pytest + pyserial) that flashes the latest build to a connected board (picotool or esptool), waits for the boot banner with the version string, sends commands over the UART protocol, and asserts on responses and on a sensor reading within a plausible range. Add a test that toggles a GPIO on a second MCU (or a USB relay) to simulate a button and checks the device reacts. Run the suite in under a minute.',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'ci-pipeline',
              title: 'CI with size regression checks',
              prompt:
                'Create a GitHub Actions workflow (or GitLab CI) that builds the firmware in a container with a pinned arm-none-eabi-gcc, runs the host tests, runs cppcheck and clang-tidy, fails if .text or .bss grew by more than 5% versus the main branch, embeds the git hash in the image, and uploads the UF2/bin as an artifact. Show one green run and one deliberately failing run (a test failure and a size regression).',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why can most firmware be tested on the host, and what cannot?',
              answerOutline:
                'With hardware behind interfaces, logic, drivers (against fakes), parsers and state machines are plain C that compiles anywhere. Real timing, peripheral behaviour and electrical effects need on-target or HIL tests.',
            },
            {
              question: 'What is the difference between a fake and a mock?',
              answerOutline:
                'A fake is a working simplified implementation (a fake flash in RAM); a mock records calls and asserts expectations (the driver wrote register X then Y).',
            },
            {
              question: 'Why check firmware size in CI?',
              answerOutline:
                'Flash and RAM are fixed; silent growth eventually breaks the build or the bootloader slot layout, and a sudden jump often indicates an accidental dependency (printf with floats, a library pulled in).',
            },
          ],
        },
        {
          slug: 'bootloaders-and-ota-updates',
          title: 'Bootloaders and over-the-air updates',
          summary:
            'How a bootloader hands off to an application, A/B slot layouts and swap strategies, image headers and signatures, rollback and anti-bricking, delivering updates over MQTT/HTTP with resumable downloads, and MCUboot and ESP-IDF OTA in practice.',
          estimatedMinutes: 150,
          objectives: [
            'Explain the boot chain (ROM, bootloader, application), vector-table relocation and how the bootloader jumps to an app',
            'Design a flash layout with two application slots, image headers (version, size, hash, signature) and a boot-state record for rollback',
            'Implement an OTA download that is resumable, verified before activation, and confirmed by the new image (or rolled back by the bootloader)',
            'Use MCUboot or ESP-IDF\'s OTA system and explain their anti-bricking guarantees and limitations',
          ],
          concepts: [
            'Boot chain; bootloader as a small, rarely changed program',
            'Vector table offset (VTOR) and jumping to an application',
            'Flash partitions: bootloader, slot A, slot B, config/NVS',
            'Image header: magic, version, size, SHA-256, signature',
            'Signing with Ed25519/ECDSA; public key in bootloader',
            'A/B with swap vs direct-XIP; rollback and confirmation',
            'Resumable, chunked downloads; power loss at any moment',
            'MCUboot, ESP-IDF app_update, anti-rollback counters',
          ],
          explanation: `A device you cannot update is a device whose first serious bug is permanent. **OTA updates** are therefore a core feature, and they rest on a **bootloader**: a small program at the start of flash that decides which application image to run, verifies it, and jumps to it. It must be simple and almost never change, because a broken bootloader bricks the device.

The jump itself: the bootloader validates the image, sets the **vector table offset register** (VTOR) to the application's table, loads the application's initial stack pointer and reset vector from it, and branches. The application is linked at its slot's address (or built position-independent). The RP2040's ROM already does a first stage of this; the ESP32's ROM loads a second-stage bootloader from flash.

**Layout**: bootloader, **slot A**, **slot B**, and a configuration region. The running application downloads the new image into the inactive slot, in **chunks** with a **resumable** protocol (record progress in flash; power can fail at any byte), verifies the **image header**: magic, version, size, SHA-256 of the body, and a **signature** over the hash made with the vendor's private key and checked with the public key baked into the bootloader. Only then does it mark the slot as pending and reboot. The bootloader boots the pending image in **test mode**; the new application must **confirm** itself after proving it works (connected to the server, say), or on the next reset the bootloader **rolls back** to the previous slot. An **anti-rollback** counter prevents an attacker reinstalling an old, vulnerable but validly signed image. Swap-based designs copy the new image into the primary slot (so the app always runs from one address); direct-XIP designs run from either slot with two builds.

**MCUboot** implements all of this for Zephyr and many SDKs; **ESP-IDF's** \`app_update\` component and \`esp_https_ota\` do it for the ESP32 with the partition table, \`otadata\` records and rollback support. Both let you deliver images over HTTPS, and a tiny MQTT message ("version 1.2.3 available at URL") is the usual trigger. Use them rather than writing your own for production; write a minimal one once, in the exercises, to understand what they guarantee. Read the Memfault Device Firmware Update Cookbook, the MCUboot design document, and the ESP-IDF OTA chapter.`,
          resources: [
            {
              title: 'Device Firmware Update Cookbook (Memfault Interrupt)',
              url: 'https://interrupt.memfault.com/blog/device-firmware-update-cookbook',
              type: 'article',
              cost: 'free',
              provider: 'Memfault',
              note: 'Builds a bootloader with slots, image headers and a jump to the application step by step.',
              primary: true,
            },
            {
              title: 'MCUboot documentation (design and image format)',
              url: 'https://docs.mcuboot.com/',
              type: 'documentation',
              cost: 'free',
              provider: 'MCUboot project',
              note: 'The design page explains swap, overwrite and direct-XIP modes, image trailers and the confirm/revert flow.',
            },
            {
              title: 'ESP-IDF — Over The Air Updates (OTA)',
              url: 'https://docs.espressif.com/projects/esp-idf/en/latest/esp32/api-reference/system/ota.html',
              type: 'documentation',
              cost: 'free',
              provider: 'Espressif',
              note: 'Partition tables, app rollback, anti-rollback and the esp_https_ota helper.',
            },
            {
              title: 'Raspberry Pi Pico — bootrom and second-stage boot (datasheet section 2.8)',
              url: 'https://datasheets.raspberrypi.com/rp2040/rp2040-datasheet.pdf',
              type: 'documentation',
              cost: 'free',
              provider: 'Raspberry Pi',
            },
          ],
          exercises: [
            {
              slug: 'minimal-bootloader',
              title: 'A minimal A/B bootloader',
              prompt:
                'Write a bootloader for the Pico (or in QEMU) that reads a boot record, validates the selected slot\'s header (magic, size, SHA-256 of the body, and an Ed25519 signature using a tiny library such as monocypher), sets VTOR and jumps. Link two versions of blink (different rates) for slots A and B, write a host tool that signs images and writes them to the slots via a UART loader, and demonstrate switching, a corrupted image being refused, and an unsigned image being refused.',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'rollback-and-power-loss',
              title: 'Rollback and power-loss testing',
              prompt:
                'Add test-boot and confirm semantics: a new image boots in test mode and must call confirm() within 30 s or the bootloader reverts on the next reset. Flash an image that deliberately crashes before confirming and show the automatic revert. Then run a power-loss test: while downloading a 200 KB image in chunks over UART or HTTP, cut power at 20 random points (a relay or a script resetting the board); the device must always boot the old image or resume the download, never brick.',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'esp-idf-or-mcuboot-ota',
              title: 'Production OTA with ESP-IDF or MCUboot',
              prompt:
                'Using ESP-IDF OTA (or Zephyr with MCUboot), set up a two-slot partition table with rollback enabled, serve a signed image over HTTPS from a local server, trigger the update by an MQTT message, and show: the download and verification log, the new version confirming itself after an MQTT reconnect, and a build with a bug (crash in app_main) rolling back. Measure the total update time and the current during the download.',
              kind: 'coding',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'Why must an update be verified before activation and confirmed after?',
              answerOutline:
                'Verification (hash + signature) ensures the image is intact and authentic before it is ever booted; confirmation ensures it actually works in the field, otherwise the bootloader reverts, preventing bricks from bugs that pass verification.',
            },
            {
              question: 'What must a bootloader do to jump to an application?',
              answerOutline:
                'Validate the image, set VTOR to its vector table, load its initial SP and reset handler from the table, and branch (with interrupts disabled and peripherals in a known state).',
            },
            {
              question: 'What does an anti-rollback counter prevent?',
              answerOutline:
                'Installing an older, validly signed image with known vulnerabilities; the bootloader refuses images whose security version is below the stored minimum.',
            },
          ],
        },
        {
          slug: 'embedded-security',
          title: 'Embedded and IoT security',
          summary:
            'Threat modelling a device, the attack surface (debug ports, firmware extraction, network, physical), and the defences: secure boot, flash encryption, hardware crypto and key storage, TLS done right on an MCU, least privilege with the MPU, and the ETSI/PSA baselines.',
          estimatedMinutes: 150,
          objectives: [
            'Build a threat model for an IoT device: assets, attackers, entry points, and the consequences of compromise',
            'Enable secure boot and flash encryption on an ESP32 (or describe the equivalent on another MCU) and explain what each defends against',
            'Provision per-device identities and keys securely, use TLS with certificate validation on the device, and avoid the common crypto mistakes',
            'Apply the ETSI EN 303 645 / PSA Certified baseline requirements to a design and audit a device against them',
          ],
          concepts: [
            'Threat model: assets, attackers, attack surface, mitigations',
            'Debug port lockout; firmware extraction; glitching (overview)',
            'Secure boot chain (ROM -> bootloader -> app) and key burning (eFuses)',
            'Flash encryption and secure storage of secrets',
            'Hardware RNG, crypto accelerators, secure elements',
            'TLS on MCUs: CA bundles, time, cipher suites, session resumption',
            'MPU and privilege separation; TrustZone-M (overview)',
            'ETSI EN 303 645 and PSA Certified baselines; no default passwords',
          ],
          explanation: `IoT devices have been hijacked by the million to build botnets, used as footholds into corporate networks, and bricked by ransomware. The root causes are mundane: default passwords, unauthenticated updates, unencrypted traffic, open debug ports. Security is a design discipline, and it starts with a **threat model**: what are the **assets** (sensor data, the network credentials, the device's identity, the ability to control an actuator), who are the **attackers** (a curious user with physical access, a neighbour on the Wi-Fi, an internet-wide scanner, a competitor with a lab), what are the **entry points** (the debug port, the flash chip, the radio, the update mechanism, the cloud API), and what is the consequence of each compromise. Write it down; it decides what is worth defending.

**Physical** attacks come first because devices are in attackers' hands. An open SWD/JTAG port gives full memory read/write; lock it in production (ESP32 eFuses, RP2040 has no lock, Cortex-M chips have readout protection levels). Firmware on an external flash chip can be read with a 5-dollar clip, so **flash encryption** (ESP32 supports it transparently) protects secrets and code. **Secure boot** chains trust from ROM: each stage verifies the signature of the next with keys burned into one-time-programmable **eFuses**, so modified firmware will not run; combined with the signed OTA of the previous lesson, only your code ever executes. Voltage glitching can sometimes bypass these on older chips; treat hardware security as raising cost, not as absolute.

**Keys and identity**: every device needs its own identity (a certificate or a unique key) provisioned at manufacture and stored where firmware extraction cannot reach it (encrypted flash, a **secure element** such as the ATECC608, or TrustZone-M secure storage). Never a shared secret in the source tree. Use the hardware **RNG**; software PRNGs seeded from the clock are a classic failure.

**TLS** on an MCU is mbedTLS or wolfSSL: validate the server certificate against a bundled CA (which requires correct **time**, hence SNTP before TLS), pin where practical, use modern cipher suites with ECDHE, and use **session resumption** to avoid the full handshake on every wake. Disabling certificate verification "to make it work" is the most common vulnerability in device code.

Inside the firmware, the **MPU** can make the stack non-executable, protect the bootloader and keys from the application, and isolate a third-party stack; TrustZone-M on Cortex-M33 splits the chip into secure and non-secure worlds. Finally, the **ETSI EN 303 645** consumer IoT baseline and Arm's **PSA Certified** framework list the requirements (no universal default passwords, vulnerability disclosure, keep software updated, secure storage, secure communication, minimise attack surface). Audit your capstone against them.`,
          resources: [
            {
              title: 'ESP-IDF — Secure Boot V2 and Flash Encryption',
              url: 'https://docs.espressif.com/projects/esp-idf/en/latest/esp32/security/secure-boot-v2.html',
              type: 'documentation',
              cost: 'free',
              provider: 'Espressif',
              note: 'Read with the companion Flash Encryption page; both are irreversible on real hardware, so follow the development-mode instructions.',
              primary: true,
            },
            {
              title: 'OWASP Internet of Things Project (Top 10 and testing guide)',
              url: 'https://owasp.org/www-project-internet-of-things/',
              type: 'documentation',
              cost: 'free',
              provider: 'OWASP',
            },
            {
              title: 'ETSI — Consumer IoT security (EN 303 645)',
              url: 'https://www.etsi.org/technologies/consumer-iot-security',
              type: 'documentation',
              cost: 'free',
              provider: 'ETSI',
              note: 'The baseline standard and its 13 provisions; the PDF is linked from the page.',
            },
            {
              title: 'PSA Certified — security framework and resources',
              url: 'https://www.psacertified.org/',
              type: 'documentation',
              cost: 'free',
              provider: 'Arm / PSA Certified',
            },
            {
              title: 'Mbed TLS',
              url: 'https://github.com/Mbed-TLS/mbedtls',
              type: 'tool',
              cost: 'free',
              provider: 'Trusted Firmware',
              note: 'The TLS library inside ESP-IDF, Zephyr and many SDKs; its knowledge-base articles on configuring for small targets are useful.',
            },
          ],
          exercises: [
            {
              slug: 'threat-model-the-node',
              title: 'Threat-model your sensor node',
              prompt:
                'Write a two-page threat model for your capstone node: a diagram of components and trust boundaries, a table of assets, attackers (with capability and motivation), entry points, attacks (at least ten, including physical, network and supply-chain), impact, and the mitigation chosen or the risk accepted. Rank by likelihood times impact. Then map each mitigation to an ETSI EN 303 645 provision.',
              kind: 'writing',
              difficulty: 2,
            },
            {
              slug: 'extract-then-protect',
              title: 'Extract the firmware, then make it impossible',
              prompt:
                'On an ESP32 dev board you are willing to dedicate: dump the flash with esptool and locate your Wi-Fi password and MQTT credentials in the dump with strings. Then enable flash encryption and secure boot in development mode following the ESP-IDF docs, re-flash, dump again and show the contents are ciphertext and that a modified (unsigned) image refuses to boot. Document the irreversible steps and what you would do differently for production (release mode, key management).',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'tls-done-right',
              title: 'TLS done right (and wrong)',
              prompt:
                'Connect to your MQTT broker over TLS three ways: with certificate verification disabled, with the CA bundle but the device clock unset, and correctly (SNTP then verify). Show with a rogue broker (your own self-signed server on the same hostname via DNS override) that only the correct configuration refuses it. Then enable session resumption and measure the reduction in handshake time and energy per connection.',
              kind: 'coding',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'What does secure boot defend against, and what does it not?',
              answerOutline:
                'Running modified or unauthorised firmware (each stage verifies the next\'s signature with fused keys). It does not protect secrets from being read (flash encryption does) nor fix vulnerabilities in your own signed code.',
            },
            {
              question: 'Why does TLS certificate validation on a device need the correct time?',
              answerOutline:
                'Certificates have validity periods; without a trusted time source the device cannot check them, so firmware must sync time (SNTP) before the TLS handshake or use a secure time source.',
            },
            {
              question: 'Name four ETSI EN 303 645 provisions.',
              answerOutline:
                'No universal default passwords; implement a vulnerability disclosure policy; keep software updated; securely store sensitive security parameters; communicate securely; minimise exposed attack surfaces; ensure software integrity; make it easy to delete user data.',
            },
          ],
        },
        {
          slug: 'reliability-watchdogs-and-field-debugging',
          title: 'Reliability: watchdogs, fault handlers, logging and field debugging',
          summary:
            'Designing for years of unattended operation: hardware and task watchdogs, HardFault handlers that capture the crash, persistent logs and crash reports in flash, brown-out and reset-cause handling, defensive coding, and metrics that tell you how the fleet is doing.',
          estimatedMinutes: 150,
          objectives: [
            'Configure a hardware watchdog correctly and extend it to a task watchdog that detects a single stuck task',
            'Write a HardFault handler that captures the stacked registers and fault status, stores a crash record in flash, and resets',
            'Implement a persistent, size-bounded log and a reset-cause report, and upload crash records on the next connection',
            'Apply defensive patterns (asserts that reset, bounded retries, state validation after reset, brown-out detection) and define fleet health metrics',
          ],
          concepts: [
            'Hardware watchdog: timeout, kicking from the right place, windowed watchdogs',
            'Task watchdog: every task must check in',
            'HardFault, BusFault, UsageFault; CFSR/HFSR; stacked frame',
            'Crash record: PC, LR, fault status, task name, stored in flash/no-init RAM',
            'Reset cause register; brown-out detector',
            'Asserts in production: reset with a record, not a halt',
            'Ring-buffer logging in flash; log levels',
            'Fleet metrics: uptime, reset reasons, heap, RSSI, error counts',
          ],
          explanation: `Every long-running program has a bug that appears once a month. On a server you restart it; on ten thousand devices in the field you need the device to recover itself and tell you what happened.

The **hardware watchdog** is the last line: a timer that resets the chip unless the firmware "kicks" it in time. The subtlety is *where* to kick it. Kicking from a timer interrupt proves only that interrupts work while the main loop may be dead; kick from the main loop, or better, implement a **task watchdog**: each task sets its bit in a mask at least once per period, and only when every bit is set does the loop (or the lowest-priority task) kick the hardware watchdog and clear the mask. A stuck task, a deadlock, or a task starved by a priority bug all trigger a reset. Set the timeout longer than your slowest legitimate operation (a flash erase, a TLS handshake) and remember that the watchdog must be running during OTA too. ESP-IDF includes a task watchdog; FreeRTOS and Zephyr make one easy to write.

A reset is useless if you do not know why. Install a **HardFault handler** (in assembly or with a naked function) that reads the stacked frame (the PC and LR at the fault), the **CFSR/HFSR** fault status registers (which say: bus error, invalid instruction, unaligned access, divide by zero, stack overflow via MPU), and stores a **crash record** in a no-init RAM region or flash before resetting. On boot, check the **reset cause** register (power-on, brown-out, watchdog, software, external pin) and the crash record, log them, and upload them on the next connection. Memfault's articles on fault handling show the exact code. Treat **asserts** the same way: in production an assert does not halt in a loop (that is a watchdog reset with no information); it records the file, line and registers and resets.

**Logging** in the field is a ring buffer in flash with levels, timestamps and the firmware version, bounded in size, dumped over the debug UART or uploaded on request. Add a **brown-out detector** so a sagging battery causes a clean reset rather than corrupt flash writes, and validate persisted state with checksums at boot, falling back to defaults if corrupt.

Finally, measure the **fleet**: uptime, reset reasons, free heap minimum, RSSI, error counters, update success rate, battery voltage, published periodically to the dashboard. A rise in watchdog resets after a release is the signal to roll back. Read the Memfault watchdog and fault-handling articles and the reliability chapters of Making Embedded Systems, then harden the capstone node.`,
          resources: [
            {
              title: 'A Guide to Watchdog Timers for Embedded Systems (Memfault Interrupt)',
              url: 'https://interrupt.memfault.com/blog/firmware-watchdog-best-practices',
              type: 'article',
              cost: 'free',
              provider: 'Memfault',
              primary: true,
            },
            {
              title: 'How to debug a HardFault on an ARM Cortex-M MCU (Memfault Interrupt)',
              url: 'https://interrupt.memfault.com/blog/cortex-m-hardfault-debug',
              type: 'article',
              cost: 'free',
              provider: 'Memfault',
              note: 'Fault status registers, the stacked frame, and a handler that captures them.',
            },
            {
              title: 'ESP-IDF — Watchdogs (interrupt and task watchdog) and Fatal Errors (core dumps)',
              url: 'https://docs.espressif.com/projects/esp-idf/en/latest/esp32/api-reference/system/wdts.html',
              type: 'documentation',
              cost: 'free',
              provider: 'Espressif',
            },
            {
              title: 'Pico SDK — hardware_watchdog',
              url: 'https://www.raspberrypi.com/documentation/pico-sdk/hardware.html',
              type: 'documentation',
              cost: 'free',
              provider: 'Raspberry Pi',
              note: 'Also the RP2040 datasheet section 4.7 (watchdog) and the scratch registers that survive a watchdog reset.',
            },
          ],
          exercises: [
            {
              slug: 'task-watchdog',
              title: 'A task watchdog that catches a stuck task',
              prompt:
                'Implement a task watchdog over the hardware watchdog in your RTOS logger: each task checks in with a period, and the kick happens only when all have. Inject faults: an infinite loop in one task, a deadlock between two, and a task blocked forever on a queue. Confirm each triggers a reset within the timeout and that the reset cause and the identity of the missing task are recorded and printed at the next boot.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'hardfault-crash-record',
              title: 'Capture a HardFault and decode it',
              prompt:
                'Write a HardFault handler that saves the stacked r0-r3, r12, lr, pc, xPSR and CFSR/HFSR to a no-init RAM struct with a magic value, then resets. Trigger faults: a null-pointer write, an unaligned 32-bit access (M0+ faults; M4 may not), a jump to an invalid address, and a stack overflow into an MPU guard region if available. At boot, print the record and use addr2line on the PC to find the faulting source line. Automate the decoding in a Python script.',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'persistent-log-and-fleet-metrics',
              title: 'Persistent log and health metrics',
              prompt:
                'Implement a flash ring-buffer log (bounded to 32 KB, wear-levelled across sectors, entries with level, timestamp and firmware version) and a boot-time report of reset cause, crash record and minimum free heap from the last run. Publish a health message (uptime, reset reason, resets since install, heap, RSSI, battery) to MQTT every hour and build a Grafana panel of reset reasons across your devices (two boards count as a fleet). Demonstrate finding a planted intermittent bug from the fleet data alone.',
              kind: 'coding',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'Why is kicking the watchdog from a timer interrupt wrong?',
              answerOutline:
                'It proves only that the timer interrupt runs; a dead main loop or stuck task would never be detected. Kick from the main loop or only when every task has checked in.',
            },
            {
              question: 'What should a HardFault handler capture and why reset afterwards?',
              answerOutline:
                'The stacked PC/LR and registers plus the fault status registers (CFSR/HFSR), stored in no-init RAM or flash; resetting restores service while the record is reported on the next boot.',
            },
            {
              question: 'Which fleet metrics most directly reveal a bad firmware release?',
              answerOutline:
                'Reset reasons (especially watchdog and HardFault counts) per version, minimum free heap, and update success rate; a jump after rollout signals a problem.',
            },
          ],
        },
      ],
      project: {
        slug: 'production-hardening',
        title: 'Project: harden the connected sensor for production',
        description: `Take the module-6 connected sensor through the full engineering pass: layered architecture with host tests and CI, signed A/B OTA with rollback, secure boot and flash encryption (or a documented equivalent plan for your chip), per-device TLS credentials, task watchdog, HardFault crash records, persistent log, health metrics on the dashboard, and a threat model and ETSI self-assessment. Run it on two devices for a week and present the fleet data.`,
        deliverables: [
          'A repository with CI passing, an architecture document and the threat model',
          'A recorded OTA update with rollback demonstration and a crash record decoded to a source line',
          'A week of health metrics from two devices with an analysis of every reset',
        ],
        estimatedHours: 12,
        stretchGoals: ['Integrate a device-monitoring service (Memfault free tier or your own) for automatic crash symbolication'],
      },
    },
  ],
  capstone: {
    slug: 'iot-sensor-node',
    title: 'Capstone: a battery-powered IoT sensor node with OTA updates and a power budget',
    description: `Design, build and document a complete IoT product in miniature. The node (an ESP32 or a Pico W, or a Pico with an external radio) reads at least two sensors over I2C/SPI, timestamps the readings, stores them locally in flash as a ring log, and publishes them over Wi-Fi or BLE to an MQTT broker, from which a dashboard (Node-RED, Grafana with InfluxDB, or your own web page) displays live and historical data. The firmware runs on an RTOS with a documented task design, sleeps between measurements, and uses a watchdog.

It must support secure over-the-air updates: a bootloader with two application slots, signed images, rollback on a failed boot, and an update triggered from the dashboard. TLS protects the MQTT connection, and the device has a unique identity and credentials that are not in the source code.

Finally, measure it. Produce a power budget: measured current in each state (sleep, sensing, radio TX, OTA), the duty cycle, and the predicted battery life for a stated battery, compared with an actual multi-day run on battery. Document everything as if handing the product to a manufacturing partner: architecture, task table, memory map, protocol, security design, test procedure and known limitations.`,
    deliverables: [
      'Firmware repository with RTOS task design, HAL/driver layering, host-side unit tests and a CI build',
      'Bootloader with A/B slots, signature verification and rollback, demonstrated by a recorded OTA update and a deliberately broken image that rolls back',
      'A dashboard showing live and historical data from the node, and an MQTT/TLS capture showing the encrypted session',
      'A power budget document with measured currents per state, predicted and measured battery life',
      'A 6-10 page design document covering architecture, security, testing and limitations',
    ],
    estimatedHours: 30,
    stretchGoals: [
      'Add a second node and a LoRa or BLE mesh link so one gateway node forwards data for others',
      'Implement remote debugging: crash dumps stored in flash and uploaded on the next boot',
      'Achieve a one-year predicted battery life on two AA cells and show the measurements that support it',
    ],
  },
  masteryChecklist: [
    'I can read a microcontroller datasheet and drive a peripheral by writing its registers, using volatile and atomic access correctly',
    'I can explain what happens from reset to main, read a linker script, and debug firmware with a probe and gdb',
    'I can write interrupt handlers that are short, safe and measured, and structure bare-metal firmware as non-blocking state machines',
    'I can bring up UART, I2C and SPI devices from their datasheets, decode the bus on a logic analyser, and write portable, host-testable drivers',
    'I can do a schedulability analysis, build a multi-task system on FreeRTOS or Zephyr, and avoid priority inversion and deadlock',
    'I can measure analog signals with proper sampling and filtering, and design a device to meet a power budget with sleep modes',
    'I can connect a device over Wi-Fi or BLE, publish over MQTT with TLS, and build a dashboard from the data',
    'I can design firmware with a layered architecture, unit tests, a bootloader with signed OTA updates, and a watchdog',
    'I can identify the threats to an IoT device and apply secure boot, encrypted storage and least privilege',
    'I have built and measured a complete sensor node from hardware to dashboard',
  ],
});
