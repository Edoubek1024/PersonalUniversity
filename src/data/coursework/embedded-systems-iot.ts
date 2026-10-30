import { defineCoursework } from '../define';

const wslStep = 'On Windows, install WSL 2 with Ubuntu, then open the folder through the WSL extension so every command below runs in Linux.';
const armPackages = 'build-essential gcc-arm-none-eabi libnewlib-arm-none-eabi gdb-multiarch qemu-system-arm';

export default defineCoursework({
  subjectId: 'embedded-systems-iot',
  machineProblems: [
    {
      slug: 'mp1-reflex',
      title: 'reflex: a non-blocking reaction timer at register level',
      afterModule: 'gpio-timers-interrupts',
      coversModules: ['microcontroller-foundations', 'gpio-timers-interrupts'],
      supersedesProject: true,
      summary: 'Build a reaction-time game on a simulated Raspberry Pi Pico using interrupts, a hardware timer and PWM at register level, with a timing error you measure and can defend.',
      language: 'C17 (RP2040)',
      estimatedHours: 14,
      overview: `A reaction timer is a small program with a hard honesty problem: it reports a number in microseconds, so you must know how wrong that number can be. After a random delay of 1 to 5 seconds an LED lights, the player presses a button, and the firmware reports the time. Pressing early is a false start. A bar of LEDs shows the result through PWM brightness.

The rule is that **nothing blocks**. No \`delay\`, no busy-wait and no polling loop that can stall. The button raises an interrupt that captures a timestamp, a hardware alarm ends the random wait, and a state machine in the main loop does everything else. Every ISR stays short and hands its work to the loop through a lock-free ring buffer.

You will work from the RP2040 datasheet at register level: GPIO function select, pad pull-ups, write-1-to-clear interrupt status, timer alarms, PWM slices, and the UART baud divisors. All game logic lives in hardware-free C, so it can be unit tested on your PC with simulated edges and a fake clock.

The board is simulated, so you need no hardware. The Wokwi logic analyzer records the real pin edges to a VCD file, and a script compares them with the times the firmware reported. **Wokwi limits:** the extension needs a license, which wokwi.com/license issues for 30 days at a time and describes as free for open-source projects, so expect to renew it monthly and keep this repository public under an open-source license. Wokwi's pricing page lists VS Code support on paid plans, so check the current terms before you start. The extension needs an internet connection, because offline use is a Pro feature. \`wokwi-cli\` uses a separate token and runs in Wokwi's cloud, free accounts get 50 simulation minutes in a rolling 30 days with 5 minutes per session, and its scenario format is marked alpha. Because of those limits, the logic is tested on the host, and the simulator runs only short end-to-end checks.

**Constraints.** Arduino is only the entry point. Inside \`setup\` and \`loop\` use the SDK's \`hardware/structs\` and \`hardware/regs\` definitions directly, plus \`irq_set_exclusive_handler\` and \`irq_set_enabled\`. Calls such as \`digitalWrite\`, \`attachInterrupt\`, \`delay\`, \`sleep_ms\` and \`Serial\` are not allowed. Do not use DMA, which Wokwi's RP2040 model supports only for PIO.`,
      setup: {
        extensions: ['platformio.platformio-ide', 'wokwi.wokwi-vscode'],
        toolchain: [
          'Install both extensions on Windows itself, not in WSL. PlatformIO downloads the Arm compiler and the RP2040 core for you.',
          'Use the community platform in `platformio.ini`: `platform = https://github.com/maxgerhardt/platform-raspberrypi.git`, `board = pico`, `framework = arduino`, `board_build.core = earlephilhower` and `board_build.f_cpu = 125000000L`. If a download fails with "Filename too long", run `git config --system core.longpaths true`.',
          'Host tests need a desktop compiler on PATH for `pio test -e native`. Install MSYS2, run `pacman -S mingw-w64-ucrt-x86_64-gcc`, and add `C:\\msys64\\ucrt64\\bin` to PATH.',
          'Point `wokwi.toml` at `.pio/build/pico/firmware.uf2` and `.pio/build/pico/firmware.elf`, with forward slashes. Press F1 and run "Wokwi: Request a new License" once, then "Wokwi: Start Simulator" after each build.',
          'Optional: install `wokwi-cli` for the scripted test, and set `WOKWI_CLI_TOKEN` from wokwi.com/dashboard/ci. If the VS Code license stops being free for you, the same `diagram.json` runs in the free browser simulator at wokwi.com, where F1 can upload a UF2 file.',
        ],
        structure: `reflex/
├── platformio.ini         # env:pico and env:native
├── wokwi.toml
├── diagram.json           # Pico, button, LEDs, logic analyzer
├── lib/reflex_core/       # plain C with no hardware headers
│   ├── game.c             # table-driven state machine
│   ├── debounce.c
│   ├── ring.c             # single-producer, single-consumer ring
│   └── calc.c             # elapsed time, PWM level, UART divisors
├── src/
│   ├── main.c             # setup and loop only
│   ├── gpio_hw.c          # registers and the button ISR
│   ├── timer_hw.c         # alarm and the timer ISR
│   ├── pwm_hw.c
│   └── uart_hw.c
├── test/test_core/        # Unity tests that run on the PC
├── test/scenario.yaml     # Wokwi end-to-end script
├── scripts/vcd_check.py   # compares wokwi.vcd with the reported times
└── REPORT.md`,
        commands: [
          { label: 'Build the firmware', command: 'pio run -e pico' },
          { label: 'Run the host tests', command: 'pio test -e native' },
          { label: 'Run the scripted end-to-end check', command: 'wokwi-cli . --scenario test/scenario.yaml --timeout 60000 --serial-log-file build/serial.log --vcd-file build/wokwi.vcd' },
          { label: 'Check the logic-analyzer capture', command: 'python scripts/vcd_check.py build/wokwi.vcd build/serial.log' },
        ],
      },
      requirements: [
        '`diagram.json` wires a button from GP15 to ground using the internal pull-up, the GO LED to GP16, a debug pin to GP17, four bar LEDs to GP18-GP21 through resistors, UART0 TX on GP0 to `$serialMonitor:RX`, and logic analyzer channels to GP15, GP16 and GP17.',
        'The button ISR on `IO_IRQ_BANK0` sets the debug pin, reads the timer\'s `TIMERAWL` register, clears the interrupt with a write-1-to-clear access, pushes a timestamped event into a 16-entry lock-free ring, and clears the debug pin.',
        'Debouncing runs on the event stream: the first edge sets the timestamp, and further edges are ignored for a 10 ms lockout, on both press and release.',
        'The random 1 to 5 s wait uses timer alarm 0 on `TIMER_IRQ_0` with a seeded xorshift32 generator, and a build flag can fix the seed.',
        'The game is a table-driven state machine with states for idle, waiting, go, result and false start. A press during waiting is a false start, and no press within 2 s of the LED lighting counts as a miss.',
        'The bar uses 1 kHz PWM on two slices with `TOP` 4999 and a divider of 25 at 125 MHz. All four LEDs share one level, `(650000 - t) * 5000 / 500000` for reaction time `t` in microseconds, clamped to 0 through 4999. The product overflows a signed 32-bit integer, so choose your types with care.',
        'A minimal UART driver, as in the module 1 project, sets its divisors from `clk_peri / (16 * baud)` with the fraction in 64ths, and sends from a ring in the main loop, so printing never blocks. Each round prints `#03 reaction_us=212345`, and after 20 valid rounds it prints best, worst and mean.',
        'CI or a local script fails the build if a banned call appears in `src/`, and `loop` is never observed to take longer than 100 us. Measure this by toggling the debug pin in a test build.',
        '`REPORT.md` includes the state diagram, the measured time from button edge to ISR entry, and a stated worst-case timing error derived from those measurements, along with the best, worst and mean of 20 attempts.',
      ],
      acceptanceTests: [
        'Host: with the LED on at 1,000,000 us and a press at 1,212,345 us, the game reports 212,345 us. With the LED on at 0xFFFFF000 and a press at 0x00001000, after the 32-bit counter wraps, it reports 8,192 us.',
        'Host: press edges at t, t+200, t+900 and t+3,000 us give one press stamped t. A later edge at t+12,000 us counts as new.',
        'Host: a press 400 ms after arming, before the LED lights, enters the false-start state and records no time. No press for 2 s after the LED lights records a miss.',
        'Host: the UART divisors for 125 MHz and 115,200 baud are 67 and 52, which gives 115,207 baud and an error of 0.006%. `TOP` 4999 with divider 25 gives exactly 1,000 Hz. PWM levels are 4,500 at 200 ms, 2,500 at 400 ms, 4,999 at 150 ms or less, and 0 at 650 ms or more. The mean of 200,000 to 219,000 us in steps of 1,000 is 209,500 us.',
        'Wokwi: `test/scenario.yaml` waits for the go message on serial, presses the button with `set-control`, and expects a `reaction_us=` line, then repeats with a press before the LED and expects a false start.',
        'Wokwi: over a 5-round capture, `vcd_check.py` finds that each reported time matches the GP16-to-GP15 edge gap in the VCD file to within 50 us. A run this long uses about a minute of the free 50.',
      ],
      resources: [
        {
          title: 'RP2040 Datasheet',
          url: 'https://datasheets.raspberrypi.com/rp2040/rp2040-datasheet.pdf',
          type: 'documentation',
          cost: 'free',
          provider: 'Raspberry Pi',
          note: 'Use the GPIO, Timer, PWM and UART chapters. Cite section numbers in your code comments.',
          primary: true,
        },
        {
          title: 'Wokwi for VS Code',
          url: 'https://docs.wokwi.com/vscode/getting-started',
          type: 'documentation',
          cost: 'freemium',
          provider: 'Wokwi',
          note: 'Covers the license, project files and the logic analyzer output. Check its current terms before relying on them.',
        },
        {
          title: 'Arduino-Pico on PlatformIO',
          url: 'https://arduino-pico.readthedocs.io/en/latest/platformio.html',
          type: 'documentation',
          cost: 'free',
          provider: 'Arduino-Pico',
          note: 'The platform configuration used here, with notes on Windows long paths.',
        },
      ],
      stretchGoals: [
        'Flash the same firmware to a real Pico and compare your error budget with a measurement on real pins.',
        'Replace the Arduino entry point with your own vector table and startup code from the module 1 project.',
      ],
    },
    {
      slug: 'mp2-coldchain',
      title: 'coldchain: a one-year coin-cell temperature logger on FreeRTOS',
      afterModule: 'power-and-analog',
      coversModules: ['serial-protocols-and-sensors', 'real-time-systems-and-rtos', 'power-and-analog'],
      supersedesProject: true,
      summary: 'Build a vaccine-shipment temperature logger on FreeRTOS under QEMU, with drivers, a crash-safe flash log, a proven schedule, and a battery budget tested over simulated weeks.',
      language: 'C17 (FreeRTOS on Cortex-M3)',
      estimatedHours: 20,
      overview: `Vaccines ship with small loggers that must record the temperature every five minutes, raise an alarm above 8 °C, and last a year on a CR2032. You will build one with no hardware, and you will test it over a month of simulated time without waiting a month.

The firmware runs on FreeRTOS on QEMU's \`mps2-an385\` board, a Cortex-M3 at 25 MHz. Run QEMU with \`-icount shift=5,sleep=off\`. Each instruction then takes exactly 32 ns of virtual time, and when the CPU sleeps, virtual time jumps to the next timer deadline, so runs are deterministic and idle time costs nothing.

The peripherals you need are not on that board, so \`sim/\` provides models behind the same interfaces real drivers would use. A 10 kΩ NTC thermistor (beta 3950) to ground, with a 10 kΩ pull-up, feeds a 12-bit ADC at 3.3 V with uniform noise of ±4 LSB. There is also a BMP280 on a fake I2C bus and a NOR flash on a fake SPI bus, where a page program takes 0.7 ms and a sector erase 45 ms. You write real drivers against those models.

The second half of the MP is about energy. QEMU does not model current, so you count time in each power state and multiply by this table: **sleep** with a low-power timer running, 2.5 µA; **idle** in WFI with the main clock running, 1.5 mA; **run**, 6 mA; plus 0.5 mA while the ADC is on, 15 mA during flash programming or erase, and 2 mA for the status LED. The battery is 225 mAh, derated by 0.8, with 1% self-discharge per year.

The result is a lesson in where the floor really is. FreeRTOS tickless idle stops the tick, but its SysTick needs the main clock, so the device still idles at 1.5 mA. A year on a coin cell needs your own sleep function built on a low-power timer.

**Constraints.** No floating point in firmware, and use fixed-point arithmetic throughout. Every blocking call has a timeout. Measure time with the board's CMSDK timers at 25 MHz, not the Cortex cycle counter. State plainly in your report that virtual time counts instructions, so WCET numbers show a program's path length and not real cycle costs. This firmware has no network code, which comes in the next module.`,
      setup: {
        extensions: ['ms-vscode.cpptools', 'ms-vscode-remote.remote-wsl', 'marus25.cortex-debug'],
        toolchain: [
          wslStep,
          'In Ubuntu: `sudo apt install ' + armPackages + ' python3-matplotlib`.',
          'Add the kernel as a submodule with `git submodule add https://github.com/FreeRTOS/FreeRTOS-Kernel`, then build `portable/GCC/ARM_CM3` and `portable/MemMang/heap_4.c`. Set `configCPU_CLOCK_HZ` to 25000000.',
          'The `CORTEX_MPS2_QEMU_IAR_GCC` demo in the main FreeRTOS repository is a working reference for startup code and the linker script on this board.',
        ],
        structure: `coldchain/
├── FreeRTOS-Kernel/       # submodule
├── firmware/
│   ├── main.c             # tasks and the mode switch
│   ├── sense.c            # 64-sample burst, averaging, fixed-point conversion
│   ├── drivers/           # bmp280.c, nor_flash.c, bus interfaces
│   ├── log.c              # ring log with CRC-protected records
│   ├── link.c             # COBS and CRC-16 framing, command handling
│   ├── power.c            # state accounting and custom tickless sleep
│   └── hal_mps2.c         # UART, timers, semihosting exit
├── sim/                   # NTC and ADC, BMP280 and NOR flash models
├── profiles/              # temperature profiles for test runs
├── tests/                 # host unit tests, built with plain gcc
├── scripts/
│   ├── rta.py             # response-time analysis
│   ├── budget.py          # battery life from state residency
│   └── decode_log.py      # flash dump to CSV and plot
├── Makefile
└── REPORT.md`,
        commands: [
          { label: 'Build the firmware', command: 'make' },
          { label: 'Run the host tests', command: 'make test' },
          { label: 'Run on QEMU in virtual time', command: 'qemu-system-arm -machine mps2-an385 -cpu cortex-m3 -kernel build/coldchain.elf -monitor null -nographic -serial stdio -semihosting-config enable=on,target=native -icount shift=5,sleep=off' },
          { label: 'Soak test for 30 virtual days', command: 'make soak DAYS=30 BUILD=RTC' },
          { label: 'Compare the three power builds', command: 'make power-report' },
        ],
      },
      requirements: [
        '`sense` runs a 64-sample ADC burst at 8 kHz using TIMER1 (reload 3124) and its interrupt. The ISR stores samples and notifies the task with `vTaskNotifyGiveFromISR`, and the task averages to a 15-bit value and converts it to hundredths of a degree with a fixed-point table.',
        'Drivers use a bus interface of function pointers. The BMP280 driver reads registers with a repeated start and applies the datasheet\'s 32-bit compensation. The NOR driver supports write enable, 256-byte page program, 4 KiB sector erase, and status polling with a timeout.',
        'Each log record is 16 bytes: `seq` u32, `time_s` u32, `temp_centi` i16, `housing_centi` i16, `flags` u8, one reserved byte, and a CRC-16/CCITT-FALSE u16. The log is a ring of 4 KiB sectors that erases ahead of the write position.',
        'At boot, the log scans flash to find the newest valid record and resumes from it, and a torn final record is discarded.',
        'In `SENSOR` mode the device samples every 300 s and sleeps in between. A reading above 8.00 °C on 3 consecutive samples latches an alarm flag, set from the third record onward, and changes the LED pattern.',
        '`LINK` mode runs while a host is attached, with tasks for sensing, 10 Hz telemetry, commands and flash writes. Sampling stays on schedule during a `DUMP` command.',
        'UART frames use COBS with a CRC-16 trailer, the RX ISR feeds a FreeRTOS queue with `xQueueSendFromISR`, and the commands are `PING`, `STATS`, `DUMP` and `ERASE`.',
        'The README has a task table with period, priority, measured WCET in virtual time and stack high-water mark. `rta.py` shows that every `LINK` task meets its deadline, and a shared SPI mutex has a timeout on every take.',
        'Three builds exist: `TICK` with a 1 kHz tick and WFI idle, `TICKLESS` with stock tickless idle, and `RTC` with a custom `portSUPPRESS_TICKS_AND_SLEEP` using a CMSDK timer as the low-power timer. Each logs time per power state and wake-ups per day, not counting ADC burst interrupts. `TICK` runs for one virtual hour and scales up, because a full day is too slow to emulate.',
        '`REPORT.md` shows the budget table per state for all three builds, predicted life with derating, a plot of a logged excursion, and how much of the budget each state uses.',
      ],
      acceptanceTests: [
        'Drivers: the BMP280 datasheet example (T1=27504, T2=26435, T3=-1000, P1=36477, P2=-10685, P3=3024, P4=2855, P5=140, P6=-7, P7=15500, P8=-14600, P9=6000, adc_T=519888, adc_P=415148) gives t_fine=128422, 25.08 °C and 100,653 Pa. A 16-byte write at 0x0000F8 issues two page programs: 8 bytes at 0xF8 and 8 at 0x100.',
        'Framing: the CRC-16/CCITT-FALSE of ASCII `123456789` is 0x29B1, and COBS encodes 11 22 00 33 as 03 11 22 02 33.',
        'Sensing: 12-bit code 2048 converts to 25.00 °C. With the noise model at 4 °C (mean code 2997.5), 1,000 oversampled readings all fall within 0.15 °C of the truth, and their standard deviation is at least 6 times smaller than that of single samples.',
        'Log: with a 4-sector ring, which holds 1,024 records, writing 1,030 records leaves 774 valid ones, seq 256 to 1029. A torn record 500 leaves 499 as the newest, and the next write uses seq 500. In a profile that goes above 8 °C from sample 100, the alarm flag first appears on sample 102.',
        'Real time: for tasks (C, T) of (1, 4), (2, 6), (3, 12), `rta.py` reports utilisation 0.833, above the Liu and Layland bound of 0.780, yet response times 1, 3 and 10, so all deadlines are met. It rejects (1, 4), (2, 6), (6, 12). On QEMU, with a low task holding a lock for 5 ms from t=0, a high task blocking on it at t=1 and a medium task running 20 ms from t=2, the high task waits 4 ms with a mutex and 24 ms with a binary semaphore, each within 1 ms.',
        'Power: `budget.py` turns 2.5 µA for 299.9 s, 6 mA for 0.08 s and 15 mA for 0.02 s per 300 s into 5.10 µA. Adding 0.26 µA of self-discharge against 180 mAh usable gives 1,400 days. The `TICK` and `TICKLESS` builds predict under 7 days and `RTC` over 365. `RTC` wakes at most 1,152 times per virtual day, `TICKLESS` about 129,000 times, once every 671 ms, and `TICK` about 86,400,000 times. A 30-day `RTC` soak logs exactly 8,640 records with no CRC errors.',
      ],
      resources: [
        {
          title: 'QEMU MPS2 board documentation',
          url: 'https://www.qemu.org/docs/master/system/arm/mps2.html',
          type: 'documentation',
          cost: 'free',
          provider: 'QEMU',
          note: 'Describes the `mps2-an385` machine and its limits. The `-icount` option is covered in the invocation chapter.',
        },
        {
          title: 'FreeRTOS Kernel',
          url: 'https://github.com/FreeRTOS/FreeRTOS-Kernel',
          type: 'tool',
          cost: 'free',
          provider: 'FreeRTOS',
          note: 'Kernel source. Read `portable/GCC/ARM_CM3/port.c` for the stock tickless implementation you will replace.',
        },
      ],
      stretchGoals: [
        'Run the sensing and logging code on a real Pico with a thermistor, and validate one state\'s current with a shunt resistor.',
        'Attach QEMU\'s emulated `tmp105` to one of the board\'s shield I2C buses and write a bit-banged driver for the real SBCon interface.',
      ],
    },
  ],
  finalProject: {
    slug: 'final-fleetlab',
    title: 'fleetlab: a virtual IoT fleet with signed OTA and a chaos monkey',
    repoName: 'fleetlab',
    summary: 'Run a fleet of emulated microcontrollers on your laptop, with MQTT over TLS, a live dashboard, staged signed updates, automatic rollback, and a chaos tool that cuts power mid-update.',
    language: 'C17 (FreeRTOS on Cortex-M3) and Python 3',
    estimatedHours: 60,
    overview: `The hard part of IoT is the thousandth device, the one that loses power halfway through an update on the far side of the world. That is difficult to practise with one board on a desk, so this project gives you a fleet with no hardware at all.

\`./fleet up --devices 8\` boots eight emulated Cortex-M3 boards in QEMU. Each one runs your own bootloader and FreeRTOS firmware, keeps a flash image on disk, and publishes sensor data over MQTT with TLS to a local broker, with a live Grafana dashboard behind it. \`./fleet rollout build/app-1.1.0.signed --canary 2\` starts a staged update. Ship a bad build and the canaries roll themselves back, while the rollout halts before it reaches the other six. \`./fleet chaos --seed 42 --cuts 200\` then kills devices at random moments during updates and shows that none of them is bricked.

Anyone can clone this and watch it work with only QEMU and Docker, and it answers the questions a real firmware team asks. Can a power cut at any moment brick a device? Can a forged image ever run? Does data survive an outage? Can you find out why a device crashed in the field?

**How the emulation works.** The \`mps2-an385\` board has no internal flash, so each device stores a 2 MiB \`flash.img\` on the host through semihosting file calls. A small flash layer enforces the real rules: 4 KiB erase, 256-byte pages, and programming that can only clear bits. The layout is two boot-control sectors at 0x000000 and 0x001000, slot A at 0x010000, slot B at 0x100000, each 960 KiB, and 64 KiB of config and crash data at 0x1F0000. The bootloader verifies an image, copies it to RAM at 0x00100000, sets \`VTOR\` and jumps. A power cut is a \`SIGKILL\` of QEMU: RAM is lost and the file keeps exactly what was written.

**Constraints.** QEMU has no eFuses, read-out protection, or hardware random number generator. Seed Mbed TLS from a per-device file and take the time from the semihosting clock, write down what real silicon would do instead, and do not claim otherwise. Address 0 is RAM on this board, so a null write does not fault. Everything here is free software, and no cloud account or physical device is needed.`,
    setup: {
      extensions: ['ms-vscode.cpptools', 'ms-vscode-remote.remote-wsl', 'marus25.cortex-debug', 'ms-python.python', 'ms-azuretools.vscode-docker', 'github.vscode-github-actions'],
      toolchain: [
        wslStep,
        'In Ubuntu: `sudo apt install ' + armPackages + ' cppcheck python3-venv`.',
        'For the broker and dashboard, use Docker Engine in WSL with `sudo apt install docker.io docker-compose-v2`, or Docker Desktop, which is free for personal use.',
        'Add FreeRTOS-Kernel, FreeRTOS-Plus-TCP, coreMQTT and Mbed TLS as git submodules. FreeRTOS-Plus-TCP includes an `MPS2_AN385` network interface for the board\'s LAN9118, and QEMU user networking needs no root access.',
        'Each device runs with `-netdev user,id=n0 -net nic,model=lan9118,netdev=n0`, and reaches the broker on the host at 10.0.2.2. Semihosting gives a guest direct access to host files, so run only firmware you built.',
      ],
      structure: `fleetlab/
├── bootloader/            # own vector table, linker script, verify, A/B logic
├── firmware/
│   ├── app/               # tasks: sense, log, net, ota, health
│   ├── drivers/           # from MP 2, plus flash layer over semihosting
│   ├── third_party/       # submodules
│   └── Makefile
├── common/                # image header, boot control, flash rules, shared by host tests
├── tools/
│   ├── sign.py            # signs images with a key kept outside the repository
│   └── provision.py       # per-device keys and certificates
├── fleet                  # launcher for the CLI
├── fleetctl/              # commands: provision, up, status, rollout, chaos, down
├── stack/
│   ├── compose.yaml       # Mosquitto, ingest, InfluxDB, Grafana
│   ├── mosquitto/         # TLS and per-device ACLs
│   └── grafana/           # provisioned dashboards
├── tests/                 # host unit tests, crash-point tests, fleet tests
├── docs/ARCHITECTURE.md
├── docs/THREAT-MODEL.md   # includes the ETSI EN 303 645 self-assessment
├── docs/RESULTS.md
├── .github/workflows/ci.yml
└── README.md`,
      commands: [
        { label: 'Build the bootloader and firmware', command: 'make -C firmware all' },
        { label: 'Run the host tests', command: 'make -C firmware test' },
        { label: 'Start the broker and dashboard', command: 'docker compose -f stack/compose.yaml up -d' },
        { label: 'Provision and boot a fleet', command: './fleet provision --devices 8 && ./fleet up --devices 8' },
        { label: 'Roll out an update in stages', command: './fleet rollout build/app-1.1.0.signed --canary 2' },
        { label: 'Cut power at random', command: './fleet chaos --seed 42 --cuts 200' },
      ],
    },
    requirements: [
      'The bootloader has its own vector table, reset handler and linker script, uses no RTOS, and fits in 64 KiB. It selects a slot, verifies it, copies it to 0x00100000, sets `VTOR` and the stack pointer, and jumps.',
      'Every image has a header with magic, version, size, SHA-256 and an Ed25519 or ECDSA P-256 signature. The public key is built into the bootloader, private keys never enter the repository, and images older than a stored minimum version are refused.',
      'Boot control is stored in two sectors with a sequence number and CRC, so a cut during an update always leaves one valid copy. An update moves through new, trial and confirmed states, and the app confirms only after its self-test passes and MQTT connects within 60 s. Otherwise the bootloader rolls back.',
      'The firmware runs tasks for sensing, logging, networking, OTA and health, reusing the MP 2 drivers and log. The README has a task table with a response-time analysis, and queues carry work between tasks.',
      'Devices connect through FreeRTOS+TCP, Mbed TLS and coreMQTT to the broker at 10.0.2.2:8883 with mutual TLS. Each device has a unique certificate and uses QoS 1, a last-will message, a retained status topic, and exponential backoff with jitter.',
      'Readings are stored in the flash log first and are sent with their sequence numbers, so an outage loses nothing and a retry cannot create a duplicate on the dashboard.',
      'OTA delivers 4 KiB chunks over MQTT into the inactive slot, resumes from the last confirmed chunk after a reboot, verifies the whole image before switching, and publishes `ota_result`.',
      'A CMSDK watchdog at 0x40008000, whose interrupt reaches the NMI, is fed only when every task has checked in. Its NMI handler and the HardFault handler store a crash record with PC, LR, fault status and task name in no-init RAM, then request a system reset. The next boot moves the record to flash and publishes it with the reset reason.',
      'Each device publishes uptime, reset count, heap low-water mark, and its predicted battery life from the MP 2 energy model. Grafana shows a provisioned dashboard with per-device data, a firmware version panel, and an offline alert.',
      'CI builds everything, runs host tests and `cppcheck`, fails on a bootloader size regression, and runs a two-device fleet smoke test. `docs/THREAT-MODEL.md` covers assets, attackers, mitigations and an ETSI EN 303 645 self-assessment.',
    ],
    acceptanceTests: [
      'Tamper: flipping one bit in the header, the payload or the signature of an update each leaves the device on its old version with `ota_result=verify_failed`. A correctly signed image older than the stored minimum version is refused.',
      'Crash points: a host build of the boot and update logic on the flash model cuts power at every single flash operation of an update, and every cut boots a valid image and completes after resuming. The count of cut points is printed. On QEMU, `./fleet chaos --seed 42 --cuts 200` ends with 0 bricked devices and all 8 on one valid version.',
      'Bad rollout: with 8 devices and 2 canaries, an image that faults 5 s after boot sends both canaries back to 1.0.0 within 3 boots, each publishes `ota_result=rolled_back`, the rollout halts, and the other 6 never receive a chunk. A good image then reaches all 8 devices.',
      'Outage: with readings every 10 s, stopping the broker for 10 minutes makes 8 devices buffer about 480 readings in total. After reconnection, InfluxDB holds every sequence number from the window exactly once, and the dashboard has no gap.',
      'Faults: an injected hang in the sense task causes a watchdog reset within 10 s, and the published record names that task. An injected `udf` instruction produces a crash record whose PC resolves through `arm-none-eabi-addr2line` to the injected function.',
      'Security: device A\'s certificate cannot publish to device B\'s topics, and nothing reaches InfluxDB. Port 1883 is closed, a broker certificate from another CA is refused by the device, and a repository scan finds no private keys.',
    ],
    coverage: [
      { module: 'microcontroller-foundations', demonstrates: 'The bootloader has a hand-written vector table, reset handler and linker script, and hands off through `VTOR` to a separately linked application.' },
      { module: 'gpio-timers-interrupts', demonstrates: 'CMSDK timers, UART interrupts, lock-free rings and an event-driven device state machine run with short ISRs.' },
      { module: 'serial-protocols-and-sensors', demonstrates: 'BMP280 and NOR flash drivers sit behind bus interfaces with host tests, and a framed UART console provides local diagnostics.' },
      { module: 'real-time-systems-and-rtos', demonstrates: 'A FreeRTOS task table, queues, mutexes and a response-time analysis keep sensing on schedule during TLS and OTA work.' },
      { module: 'power-and-analog', demonstrates: 'Sampling uses the oversampled ADC chain, and every device reports predicted battery life from measured state residency.' },
      { module: 'connectivity-and-iot-protocols', demonstrates: 'Mutual TLS, MQTT QoS 1, last will, retained status, backoff and a time-series dashboard carry fleet data through outages.' },
      { module: 'firmware-engineering-and-security', demonstrates: 'Signed A/B updates, rollback, watchdogs, crash records, CI, a threat model and an ETSI self-assessment make the firmware fit for a product.' },
    ],
    portfolio: [
      'The README opens with a GIF of a bad rollout being halted on the live dashboard, then a quick start that needs only QEMU and Docker.',
      'GitHub Actions builds the firmware, runs the crash-point tests and boots a two-device fleet on every push, with a status badge in the README.',
      '`docs/RESULTS.md` gives the crash-point count, chaos results, TLS peak heap, update time and flash wear per update, with plots.',
      '`docs/ARCHITECTURE.md` explains the update state machine with a diagram, and `docs/THREAT-MODEL.md` says plainly what an emulator cannot prove.',
      'The repository has a LICENSE that respects each dependency, a tagged `v1.0.0` release with signed sample images and a throwaway demo key, and a CHANGELOG.',
    ],
    stretchGoals: [
      'Port the device to a physical Pico W or ESP32 and join it to the same fleet alongside the emulated boards.',
      'Run an ESP32 node in Wokwi that publishes to a public test broker through Wokwi\'s shared gateway, and note what its free tier limits.',
      'Add delta updates and measure the bytes saved per release.',
    ],
    resources: [
      {
        title: 'FreeRTOS-Plus-TCP',
        url: 'https://github.com/FreeRTOS/FreeRTOS-Plus-TCP',
        type: 'tool',
        cost: 'free',
        provider: 'FreeRTOS',
        note: 'The TCP/IP stack. Look in `source/portable/NetworkInterface/MPS2_AN385` for this board\'s driver.',
      },
      {
        title: 'coreMQTT',
        url: 'https://github.com/FreeRTOS/coreMQTT',
        type: 'tool',
        cost: 'free',
        provider: 'FreeRTOS',
        note: 'A small MQTT client library that leaves the transport to you, so you plug in Mbed TLS.',
      },
      {
        title: 'Eclipse Mosquitto Documentation',
        url: 'https://mosquitto.org/documentation/',
        type: 'documentation',
        cost: 'free',
        provider: 'Eclipse Foundation',
        note: 'Use the `mosquitto.conf` pages for TLS listeners, client certificates and ACL files.',
      },
    ],
  },
});
