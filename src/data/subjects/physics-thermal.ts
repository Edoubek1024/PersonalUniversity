import { defineSubject } from '../define';
import type { ResourceInput } from '../types';

const openstax2 = (note: string): ResourceInput => ({
  title: 'OpenStax University Physics Volume 2',
  url: 'https://openstax.org/details/books/university-physics-volume-2',
  type: 'textbook',
  cost: 'free',
  provider: 'OpenStax',
  note,
  primary: true,
});

const mit8044 = (note: string): ResourceInput => ({
  title: 'MIT 8.044 Statistical Physics I',
  url: 'https://ocw.mit.edu/courses/8-044-statistical-physics-i-spring-2013/',
  type: 'course',
  cost: 'free',
  provider: 'MIT OpenCourseWare',
  note,
});

const phet = (name: string, slug: string, note: string): ResourceInput => ({
  title: `PhET simulation: ${name}`,
  url: `https://phet.colorado.edu/en/simulations/${slug}`,
  type: 'interactive',
  cost: 'free',
  provider: 'PhET, University of Colorado Boulder',
  note,
});

const hyperphysics = (note: string): ResourceInput => ({
  title: 'HyperPhysics',
  url: 'http://hyperphysics.phy-astr.gsu.edu/hbase/index.html',
  type: 'article',
  cost: 'free',
  provider: 'Georgia State University',
  note,
});

export default defineSubject({
  id: 'physics-thermal',
  title: 'University Physics: Thermal Physics (PHYS 213)',
  category: 'physics',
  tagline:
    'Temperature, gases, entropy, engines and free energy, explained by counting the ways that atoms can share energy.',
  description: `This course follows the topics of PHYS 213 (University Physics: Thermal Physics) at the University of Illinois Urbana-Champaign, as given in the public catalog description. It is original work and is not affiliated with Illinois; nothing here comes from its lectures, homework or exams.

Why does heat flow from hot to cold? Why can no engine be perfectly efficient? Why do eggs not unscramble? The answers do not come from any new force. They come from counting. A cup of water holds about $10^{25}$ molecules, and the state you observe is simply the one that can happen in overwhelmingly the most ways.

So this course leads with the statistical view of entropy. After a short start with temperature, the first law and the ideal gas, you count microstates by hand, define entropy as the logarithm of that count, and find temperature, the second law and the Carnot limit all following from it. Later, the Boltzmann factor and free energy tie it together, explaining why the atmosphere thins with height and why ice melts when it does.

The course assumes the mechanics course and basic calculus. Logarithms and exponentials appear everywhere; a partial derivative appears only as a slope with something held fixed. As always, sketch first, use symbols, then check units and sizes. No lab is needed: you use PhET simulations and short Python models. When you finish, \`thermodynamics-statistical-mechanics\` is the next step, with far more formal mathematics.

Constants used throughout: $k_B = 1.38\\times 10^{-23}\\ \\mathrm{J/K} = 8.62\\times 10^{-5}\\ \\mathrm{eV/K}$, $R = 8.31\\ \\mathrm{J/(mol\\,K)}$, $N_A = 6.02\\times 10^{23}\\ \\mathrm{mol^{-1}}$ and $1\\ \\mathrm{atm} = 1.013\\times 10^{5}\\ \\mathrm{Pa}$.`,
  difficulty: 'intermediate',
  estimatedHours: 50,
  prerequisites: ['physics-mechanics'],
  recommendedBackground: [
    'Comfort with logarithms, exponentials and basic integrals',
    'Simple counting: permutations and combinations help, and are reviewed here',
    'Basic Python for the projects: loops, random numbers and histograms',
  ],
  tags: ['thermal physics', 'entropy', 'statistical physics', 'kinetic theory', 'heat engines', 'free energy', 'problem solving'],
  core: false,
  modules: [
    {
      slug: 'temperature-and-energy',
      title: 'Temperature and Energy',
      description:
        'What temperature measures, how energy moves as heat and work, and how much energy it takes to warm or melt something.',
      lessons: [
        {
          slug: 'temperature-and-heat',
          title: 'Temperature and heat',
          summary:
            'Thermal equilibrium, the kelvin scale, and heat as energy in transit, with a first look at calorimetry.',
          estimatedMinutes: 110,
          objectives: [
            'Define thermal equilibrium and state the zeroth law',
            'Convert between Celsius and kelvin',
            'Distinguish heat, temperature and internal energy',
            'Solve simple mixing problems with an energy balance',
          ],
          concepts: [
            'Thermal equilibrium',
            'Zeroth law',
            'Kelvin scale',
            'Heat as energy transfer',
            'Internal energy',
            'Thermal expansion',
          ],
          explanation: `Temperature is what two objects share once they stop exchanging energy on average. Put them in contact, wait, and they reach **thermal equilibrium**. The **zeroth law** says that if A and B are each in equilibrium with C, then they are in equilibrium with each other. So a thermometer works, and the idea of temperature makes sense.

Absolute temperature is measured in kelvin, with the same step size as Celsius: $T(\\mathrm K) = T(^\\circ\\mathrm C) + 273.15$. Room temperature, $20^\\circ\\mathrm C$, is $293\\ \\mathrm K$. Zero kelvin is the bottom of the scale. In physics formulas, always use kelvin.

Do not mix up three words. **Internal energy** $U$ is the total microscopic energy stored in an object. **Heat** $Q$ is energy moving because of a temperature difference; it is a process, not something an object contains. **Temperature** is neither of these. A bath at $40^\\circ\\mathrm C$ holds far more internal energy than a spark at $1000^\\circ\\mathrm C$, yet the spark is hotter.

Most things expand when warmed. For a length $L$, $\\Delta L = \\alpha L\\Delta T$, with $\\alpha \\approx 1.2\\times 10^{-5}\\ \\mathrm{K^{-1}}$ for steel. That looks small, but rails and bridges need gaps.

**Warming things.** Raising a mass $m$ by $\\Delta T$ needs $Q = mc\\Delta T$, where $c$ is the **specific heat**. Water has $c = 4186\\ \\mathrm{J/(kg\\,K)}$, which is unusually large.

**Worked example.** You mix $200\\ \\mathrm g$ of water at $80^\\circ\\mathrm C$ with $300\\ \\mathrm g$ at $20^\\circ\\mathrm C$ in an insulated cup. Find the final temperature.

Energy lost by the hot water is gained by the cold. So the sum of all heat flows is zero:

$$m_1c(T - T_1) + m_2c(T - T_2) = 0.$$

The $c$ cancels, since both are water:

$$T = \\frac{m_1T_1 + m_2T_2}{m_1 + m_2} = \\frac{(0.20)(80) + (0.30)(20)}{0.50} = 44^\\circ\\mathrm C.$$

Check: the answer lies between the two starting values, nearer to the larger mass. The cold water gains $0.30 \\times 4186 \\times 24 = 30\\ \\mathrm{kJ}$, and the hot water loses the same. The result is a mass-weighted average, like a centre of mass.

**Pitfalls.** Differences in temperature are the same in Celsius and kelvin, but ratios are not: $40^\\circ\\mathrm C$ is not twice as hot as $20^\\circ\\mathrm C$. And keep the signs consistent: writing "heat lost equals heat gained" with care, or setting the sum to zero, but not a mix of both.`,
          resources: [
            openstax2('Read the chapter on temperature and heat, through calorimetry.'),
            phet('Energy Forms and Changes', 'energy-forms-and-changes', 'Follow energy from a hot block into water, and watch temperatures meet.'),
            hyperphysics('Look up temperature, heat and specific heat.'),
          ],
          exercises: [
            {
              slug: 'rail-gap',
              title: 'Expansion of a rail',
              prompt:
                'A steel rail is $25\\ \\mathrm m$ long at the coldest time of year. By how much does it lengthen when warmed by $40\\ \\mathrm K$, with $\\alpha = 1.2\\times 10^{-5}\\ \\mathrm{K^{-1}}$? Also show that $-40$ is the temperature at which the Celsius and Fahrenheit scales agree, using $F = \\frac95C + 32$.',
              kind: 'problem',
              difficulty: 1,
              hint: 'The rail grows by $12\\ \\mathrm{mm}$.',
            },
            {
              slug: 'hot-copper',
              title: 'A hot block in water',
              prompt:
                'A $0.50\\ \\mathrm{kg}$ copper block at $200^\\circ\\mathrm C$ with $c = 385\\ \\mathrm{J/(kg\\,K)}$ goes into $1.0\\ \\mathrm{kg}$ of water at $20^\\circ\\mathrm C$. Find the final temperature. Why does the water hardly warm up?',
              kind: 'problem',
              difficulty: 1,
              hint: 'About $28^\\circ\\mathrm C$. Water has a much larger heat capacity than the copper.',
            },
            {
              slug: 'three-liquids',
              title: 'A general mixing rule',
              prompt:
                'Show that for any number of objects with heat capacities $C_i$ and starting temperatures $T_i$, in an insulated box, the final temperature is $\\sum C_iT_i/\\sum C_i$. Explain why it does not matter whether you use Celsius or kelvin here, even though the formula contains $T$ and not $\\Delta T$.',
              kind: 'derivation',
              difficulty: 2,
              hint: 'Adding 273.15 to every $T_i$ adds 273.15 to the answer.',
            },
          ],
          selfAssessment: [
            {
              question: 'What is the difference between heat and internal energy?',
              answerOutline: 'Internal energy is stored in an object; heat is energy in transit because of a temperature difference.',
            },
            {
              question: 'What does the zeroth law let you do?',
              answerOutline: 'Compare temperatures of objects that never touch, by using a thermometer.',
            },
            {
              question: 'Why must you use kelvin in most physics formulas?',
              answerOutline: 'Laws such as $PV = nRT$ need an absolute scale, with zero at the true bottom.',
            },
          ],
          relatedLessons: ['thermodynamics-statistical-mechanics/temperature-heat-and-the-laws/temperature-and-the-zeroth-law'],
        },
        {
          slug: 'first-law-and-work',
          title: 'The first law and work',
          summary:
            'Energy conservation for thermal systems: heat in, work out, and how to read a pressure-volume diagram.',
          estimatedMinutes: 130,
          objectives: [
            'State the first law with a clear sign convention',
            'Compute work as the area under a pressure-volume curve',
            'Distinguish state quantities from path quantities',
            'Find the work done over a closed cycle',
          ],
          concepts: [
            'First law of thermodynamics',
            'Sign conventions for Q and W',
            'Work as the integral of P dV',
            'PV diagram',
            'State functions',
            'Isobaric and isothermal processes',
          ],
          explanation: `The **first law** is just conservation of energy with heat included:

$$\\Delta U = Q - W,$$

where $Q$ is heat added to the system and $W$ is work done *by* the system. Some books use the opposite sign for $W$, so always check.

When a gas expands against a piston, it pushes with force $PA$ through a distance $dx$, so the work is $P\\,dV$. For a finite change,

$$W = \\int_{V_1}^{V_2}P\\,dV,$$

which is the area under the curve on a **pressure-volume diagram**. Expansion means positive work, and compression means negative work.

Here is the key point. $U$ is a **state function**: it has a value for each state, whatever the path. But $Q$ and $W$ depend on the path. Going between the same two points by different routes gives different areas, and so different work. Only the difference $Q - W$ is fixed. So it makes no sense to ask how much heat a gas "contains".

**Worked example.** A gas in a cylinder expands at a constant pressure of $2.0\\times 10^{5}\\ \\mathrm{Pa}$ from $0.010\\ \\mathrm{m^3}$ to $0.030\\ \\mathrm{m^3}$ and absorbs $6500\\ \\mathrm J$ of heat. Find the work and the change in internal energy.

The curve is a flat line, so the area is a rectangle:

$$W = P\\Delta V = (2.0\\times 10^{5})(0.020) = 4000\\ \\mathrm J.$$

Then

$$\\Delta U = Q - W = 6500 - 4000 = 2500\\ \\mathrm J.$$

Check: $\\mathrm{Pa \\cdot m^3} = \\mathrm{N\\,m} = \\mathrm J$, which is right. The gas took in heat and spent part of it pushing the piston, and the rest raised its internal energy. Both make sense.

**Isothermal work.** For an ideal gas held at constant $T$, $P = nRT/V$, so

$$W = \\int\\frac{nRT}{V}\\,dV = nRT\\ln\\frac{V_2}{V_1}.$$

For one mole at $300\\ \\mathrm K$ doubling its volume, $W = 1.7\\ \\mathrm{kJ}$. An ideal gas's internal energy depends only on $T$, as you will see, so here $\\Delta U = 0$ and all the heat in comes out as work.

**Cycles.** If a system returns to its starting state, then $\\Delta U = 0$, so $Q_{\\text{net}} = W_{\\text{net}}$. The net work is the area enclosed by the loop, positive if traversed clockwise. This is the basis of every engine.

**Pitfalls.** Do not use $P\\Delta V$ unless the pressure is constant. Volumes must be in $\\mathrm{m^3}$. A litre is $10^{-3}\\ \\mathrm{m^3}$. And remember that heat and temperature change need not go together: a melting ice cube takes in heat with no temperature change.`,
          resources: [
            openstax2('Read the chapter on the first law of thermodynamics.'),
            phet('Gas Properties', 'gas-properties', 'Push the piston and watch the temperature change.'),
            hyperphysics('Look up the first law and PV diagrams.'),
          ],
          exercises: [
            {
              slug: 'rectangle-cycle',
              title: 'Work around a rectangle',
              prompt:
                'A gas goes round a clockwise rectangle on a PV diagram, between pressures of $1.0\\times 10^{5}$ and $3.0\\times 10^{5}\\ \\mathrm{Pa}$ and volumes of $1.0$ and $4.0$ litres. Find the net work per cycle, and the net heat absorbed. Which sides involve positive work?',
              kind: 'problem',
              difficulty: 1,
              hint: 'The area is $600\\ \\mathrm J$. Since $\\Delta U = 0$ for the cycle, $Q_{\\text{net}} = 600\\ \\mathrm J$.',
            },
            {
              slug: 'joule-paddle',
              title: 'Warming water by stirring',
              prompt:
                'In a version of Joule\'s experiment, a $4.0\\ \\mathrm{kg}$ mass falls $2.0\\ \\mathrm m$, ten times over, turning a paddle in $0.50\\ \\mathrm{kg}$ of insulated water. Find the work done on the water and its temperature rise. Why does it make sense to say that "heat" was not added here, though the water warmed?',
              kind: 'problem',
              difficulty: 2,
              hint: 'Work $784\\ \\mathrm J$; $\\Delta T$ is about $0.37\\ \\mathrm K$. The energy enters as work, so $Q = 0$ while $\\Delta U > 0$.',
            },
            {
              slug: 'two-paths',
              title: 'Two paths, same end points',
              prompt:
                'One mole of ideal gas goes from $(P_0,\\ V_0)$ to $(P_0/2,\\ 2V_0)$. Path A is isothermal. Path B is constant volume first, then constant pressure. Compute $W$ for each path in terms of $P_0V_0$, and compare them. Show that $\\Delta U$ is the same (zero), but $Q$ differs. Plot both paths in Python.',
              kind: 'derivation',
              difficulty: 2,
              hint: '$W_A = P_0V_0\\ln 2$, and $W_B = \\frac12P_0V_0$.',
            },
          ],
          selfAssessment: [
            {
              question: 'Why does it make no sense to speak of the heat in an object?',
              answerOutline: 'Heat is a transfer that depends on the path, not a state function.',
            },
            {
              question: 'What does the area inside a loop on a PV diagram mean?',
              answerOutline: 'The net work done per cycle.',
            },
            {
              question: 'What is $\\Delta U$ over a complete cycle, and why?',
              answerOutline: 'Zero, since $U$ is a state function and the system returns to its start.',
            },
          ],
          relatedLessons: ['thermodynamics-statistical-mechanics/temperature-heat-and-the-laws/work-heat-and-the-first-law'],
        },
        {
          slug: 'heat-capacity-and-phase-changes',
          title: 'Heat capacity and phase changes',
          summary:
            'Specific heats, latent heats, and energy accounts when ice, water and steam are involved.',
          estimatedMinutes: 110,
          objectives: [
            'Compute heat for temperature changes and for phase changes',
            'Set up an energy balance that crosses a phase change',
            'Explain why temperature stays fixed during melting',
            'Use the Dulong-Petit value for solids',
          ],
          concepts: [
            'Heat capacity',
            'Specific heat',
            'Molar heat capacity',
            'Latent heat of fusion',
            'Latent heat of vaporisation',
            'Dulong-Petit rule',
          ],
          explanation: `Heat capacity is the energy needed per kelvin. It is $C = mc$ for a whole object, with $c$ per kilogram, or per mole if you divide instead by the number of moles.

During a **phase change**, added energy does not raise the temperature. It pulls molecules apart instead. The energy needed per kilogram is the **latent heat** $L$, so $Q = mL$. For water, the latent heat of fusion is $L_f = 3.34\\times 10^{5}\\ \\mathrm{J/kg}$, and the latent heat of vaporisation is $L_v = 2.26\\times 10^{6}\\ \\mathrm{J/kg}$. Boiling takes much more because liquid molecules must be separated completely.

**Worked example.** How much energy turns $100\\ \\mathrm g$ of ice at $-10^\\circ\\mathrm C$ into water at $100^\\circ\\mathrm C$? Ice has $c = 2100\\ \\mathrm{J/(kg\\,K)}$.

List the stages. It helps to sketch temperature against energy added: rising slopes joined by flat steps.

1. Warm the ice: $Q_1 = (0.10)(2100)(10) = 2100\\ \\mathrm J$.
2. Melt it: $Q_2 = (0.10)(3.34\\times 10^{5}) = 33400\\ \\mathrm J$.
3. Warm the water: $Q_3 = (0.10)(4186)(100) = 41860\\ \\mathrm J$.

The total is about $77\\ \\mathrm{kJ}$. Check: melting takes about as much energy as warming the water through $80\\ \\mathrm K$, which matches $L_f/c \\approx 80\\ \\mathrm K$. To boil it all away would need a further $226\\ \\mathrm{kJ}$, far more than everything before.

**Solids.** If you measure heat capacity per mole, most simple solids come close to

$$C \\approx 3R = 24.9\\ \\mathrm{J/(mol\\,K)},$$

the **Dulong-Petit** value. For copper, $385\\ \\mathrm{J/(kg\\,K)}$ times $0.0635\\ \\mathrm{kg/mol}$ gives $24\\ \\mathrm{J/(mol\\,K)}$. The agreement across materials is a strong hint that the heat capacity is about counting atoms, and the module on kinetic theory shows why.

**Mixed problems.** When ice meets warm water, do not assume that all the ice melts. First compare the energy available with the energy needed to melt the ice. If there is enough, the final state is liquid above $0^\\circ\\mathrm C$. If not, the final state is a mix of ice and water at exactly $0^\\circ\\mathrm C$. Getting a temperature below zero or an ice mass above the start means you chose wrongly.

**Why water matters.** Its large $c$ and $L_v$ moderate climate, make sweating effective, and mean steam burns are severe, because condensing delivers $L_v$ to your skin.

**Pitfalls.** Keep each stage separate, and do not use $mc\\Delta T$ across a phase change. Use the right $c$ for each phase. Check that your units are J/kg, not J/g or kJ/kg.`,
          resources: [
            openstax2('Read the sections on phase changes and on heat capacity in the chapter on temperature and heat.'),
            hyperphysics('Look up latent heat and specific heat tables.'),
            phet('States of Matter', 'states-of-matter', 'Add energy to a solid and watch the molecules separate.'),
          ],
          exercises: [
            {
              slug: 'kettle',
              title: 'A kettle',
              prompt:
                'A $1500\\ \\mathrm W$ kettle heats $1.5\\ \\mathrm{kg}$ of water from $20^\\circ\\mathrm C$ to boiling. Ignoring losses, how long does it take, in seconds and in minutes? How much longer would it take to boil the water dry?',
              kind: 'problem',
              difficulty: 1,
              hint: '$335\\ \\mathrm s$, which is $5.6$ minutes. Boiling dry takes $mL_v/P$, about 38 minutes more.',
            },
            {
              slug: 'ice-in-a-drink',
              title: 'Ice in a drink',
              prompt:
                'A $50\\ \\mathrm g$ ice cube at $0^\\circ\\mathrm C$ goes into $300\\ \\mathrm g$ of water at $25^\\circ\\mathrm C$ in an insulated glass. First show that all the ice melts. Then find the final temperature. How much ice would it take to cool the drink exactly to $0^\\circ\\mathrm C$?',
              kind: 'problem',
              difficulty: 2,
              hint: 'Melting takes $16700\\ \\mathrm J$. The final temperature is about $10^\\circ\\mathrm C$. Exactly $0^\\circ\\mathrm C$ needs about $94\\ \\mathrm g$.',
            },
            {
              slug: 'heating-curve',
              title: 'Plot a heating curve',
              prompt:
                'Write a Python function $T(Q)$ for $100\\ \\mathrm g$ of water starting as ice at $-10^\\circ\\mathrm C$ and heated up to steam at $110^\\circ\\mathrm C$, with steam having $c = 2000\\ \\mathrm{J/(kg\\,K)}$. Plot it. Explain the slope of each part and the width of each flat step.',
              kind: 'coding',
              difficulty: 2,
              hint: 'A slope equals $1/mc$. A step width equals $mL$.',
            },
          ],
          selfAssessment: [
            {
              question: 'Why does the temperature stay fixed while ice melts?',
              answerOutline: 'Added energy breaks bonds rather than raising the average kinetic energy.',
            },
            {
              question: 'How do you tell whether all the ice melts in a mixing problem?',
              answerOutline: 'Compare the energy available from cooling to $0^\\circ\\mathrm C$ with the energy to melt all the ice.',
            },
            {
              question: 'What does the Dulong-Petit rule suggest about heat capacity?',
              answerOutline: 'Per atom, solids store about the same energy per kelvin, so it depends on the number of atoms.',
            },
          ],
        },
      ],
    },
    {
      slug: 'kinetic-theory',
      title: 'Kinetic Theory',
      description:
        'Gases seen as vast numbers of small moving molecules: where pressure and temperature come from, and how speeds are distributed.',
      lessons: [
        {
          slug: 'the-ideal-gas',
          title: 'The ideal gas',
          summary:
            'The ideal gas law in moles and in molecules, and when the model works.',
          estimatedMinutes: 110,
          objectives: [
            'Use the ideal gas law in both forms',
            'Convert between moles, molecules and mass',
            'Solve before-and-after problems with ratios',
            'Say when a real gas is close to ideal',
          ],
          concepts: [
            'Mole and Avogadro’s number',
            'Ideal gas law',
            'Boltzmann constant',
            'Number density',
            'Molar volume',
            'Limits of the ideal model',
          ],
          explanation: `Many gases at ordinary conditions obey one simple law:

$$PV = nRT = Nk_BT.$$

Here $n$ is the number of moles and $N$ the number of molecules, linked by $N = nN_A$. The two constants are the same idea at two scales: $R = N_Ak_B$. Note what is missing: the type of gas. A given volume, pressure and temperature hold the same number of molecules, whatever the gas. That is remarkable, and points to a mechanical explanation.

The model treats molecules as small particles that interact only in brief collisions. It works when molecules are far apart compared with their size. It fails at high density or near condensation.

$T$ must be in kelvin and $P$ in absolute pressure. A tyre gauge reads the pressure above the atmosphere. One mole of an ideal gas at $0^\\circ\\mathrm C$ and $1\\ \\mathrm{atm}$ takes up $22.4$ litres.

**Worked example.** A room measures $5.0 \\times 4.0 \\times 3.0\\ \\mathrm m$. At $20^\\circ\\mathrm C$ and $1\\ \\mathrm{atm}$, how many moles and molecules of air does it hold, and what is its mass? Air has a mean molar mass of $29\\ \\mathrm{g/mol}$.

$V = 60\\ \\mathrm{m^3}$ and $T = 293\\ \\mathrm K$. Then

$$n = \\frac{PV}{RT} = \\frac{(1.013\\times 10^{5})(60)}{(8.31)(293)} = 2.5\\times 10^{3}\\ \\mathrm{mol}.$$

So $N = nN_A = 1.5\\times 10^{27}$ molecules, and the mass is about $(2500)(0.029) = 72\\ \\mathrm{kg}$. Check: air density is near $1.2\\ \\mathrm{kg/m^3}$, and $1.2 \\times 60 = 72\\ \\mathrm{kg}$. That matches. The air in a room weighs about as much as a person.

**How far apart are they?** The number density is $N/V = P/k_BT = 2.5\\times 10^{25}\\ \\mathrm{m^{-3}}$. Each molecule has a cube of volume $V/N$, of side about $3.4\\ \\mathrm{nm}$, which is about ten times the molecular size. So molecules in air are well separated, and the ideal model is good.

**Ratio problems.** If the amount of gas stays fixed, $PV/T$ is constant:

$$\\frac{P_1V_1}{T_1} = \\frac{P_2V_2}{T_2}.$$

Any units work for $P$ and $V$ as long as they match on both sides. But $T$ must be in kelvin.

**Pitfalls.** Doubling a temperature from $20^\\circ\\mathrm C$ to $40^\\circ\\mathrm C$ raises $T$ by just $7\\%$. A gauge pressure must be turned into an absolute pressure before you use the law. The molar mass in SI is in kg/mol, so $29\\ \\mathrm{g/mol}$ is $0.029\\ \\mathrm{kg/mol}$.`,
          resources: [
            openstax2('Read the chapter on the kinetic theory of gases, through the ideal gas law.'),
            phet('Gases Intro', 'gases-intro', 'Hold one quantity fixed at a time and test the law.'),
            hyperphysics('Look up the ideal gas law.'),
          ],
          exercises: [
            {
              slug: 'tyre-on-a-hot-day',
              title: 'A tyre warms up',
              prompt:
                'A tyre holds air at an absolute pressure of $3.0\\times 10^{5}\\ \\mathrm{Pa}$ at $300\\ \\mathrm K$. After driving, the air reaches $330\\ \\mathrm K$, with the volume nearly constant. Find the new absolute pressure, and the new gauge pressure.',
              kind: 'problem',
              difficulty: 1,
              hint: 'Absolute $3.3\\times 10^{5}\\ \\mathrm{Pa}$; gauge about $2.3\\times 10^{5}\\ \\mathrm{Pa}$.',
            },
            {
              slug: 'molar-volume',
              title: 'Check two standard numbers',
              prompt:
                'From $PV = nRT$, compute the volume of a mole at $273\\ \\mathrm K$ and $1\\ \\mathrm{atm}$, in litres. Find the number density and typical spacing of molecules at $293\\ \\mathrm K$. Compare that spacing with a molecular diameter of about $0.3\\ \\mathrm{nm}$.',
              kind: 'problem',
              difficulty: 1,
              hint: '$22.4$ litres; $2.5\\times 10^{25}\\ \\mathrm{m^{-3}}$; $3.4\\ \\mathrm{nm}$, about ten times the diameter.',
            },
            {
              slug: 'rising-bubble',
              title: 'A rising bubble',
              prompt:
                'A bubble of volume $1.0\\ \\mathrm{cm^3}$ leaves a diver at $30\\ \\mathrm m$ depth, where the water is at $5^\\circ\\mathrm C$. It rises to the surface at $20^\\circ\\mathrm C$. Using $P = P_0 + \\rho gh$, find its volume at the surface. Explain why divers must not hold their breath as they rise.',
              kind: 'problem',
              difficulty: 2,
              hint: 'Pressure falls about fourfold, so the volume grows to about $4.1\\ \\mathrm{cm^3}$.',
            },
          ],
          selfAssessment: [
            {
              question: 'Why is the type of gas absent from the ideal gas law?',
              answerOutline: 'Each molecule counts the same; only the number matters, not the mass or size.',
            },
            {
              question: 'What is the difference between absolute and gauge pressure?',
              answerOutline: 'Gauge pressure is the pressure above atmospheric. The gas law needs absolute pressure.',
            },
            {
              question: 'When does the ideal model fail?',
              answerOutline: 'At high density, or near condensation, when molecular size and attractions matter.',
            },
          ],
        },
        {
          slug: 'pressure-and-equipartition',
          title: 'Pressure, temperature and equipartition',
          summary:
            'Deriving pressure from molecular collisions, reading temperature as mean kinetic energy, and sharing energy among degrees of freedom.',
          estimatedMinutes: 140,
          objectives: [
            'Derive pressure from collisions of molecules with a wall',
            'Connect temperature with mean kinetic energy',
            'State the equipartition theorem',
            'Predict heat capacities of monatomic and diatomic gases',
          ],
          concepts: [
            'Momentum transfer at a wall',
            'Mean kinetic energy',
            'RMS speed',
            'Degrees of freedom',
            'Equipartition',
            'Frozen degrees of freedom',
          ],
          explanation: `Pressure is the push of countless molecules bouncing off a wall. Consider a box of side $L$ and one molecule of speed component $v_x$. It hits a given wall every $2L/v_x$, and each bounce gives momentum $2mv_x$. So its average force is $mv_x^2/L$. Summing over $N$ molecules, and using $\\overline{v_x^2} = \\tfrac13\\overline{v^2}$ because no direction is special, gives

$$PV = \\tfrac13Nm\\overline{v^2}.$$

Compare this with $PV = Nk_BT$. The two agree only if

$$\\tfrac12m\\overline{v^2} = \\tfrac32k_BT.$$

So **temperature measures the mean kinetic energy** of molecular motion. This is a striking link between something mechanical and something thermal. The **RMS speed** follows:

$$v_{\\text{rms}} = \\sqrt{\\frac{3k_BT}{m}} = \\sqrt{\\frac{3RT}{M}}.$$

**Worked example.** Find the mean kinetic energy per molecule at $300\\ \\mathrm K$, and $v_{\\text{rms}}$ for nitrogen ($M = 28\\ \\mathrm{g/mol}$) and helium ($M = 4.0\\ \\mathrm{g/mol}$).

$$\\tfrac32k_BT = \\tfrac32(1.38\\times 10^{-23})(300) = 6.2\\times 10^{-21}\\ \\mathrm J = 0.039\\ \\mathrm{eV}.$$

Note $M$ in kg/mol:

$$v_{\\text{rms}}(\\mathrm N_2) = \\sqrt{\\frac{3(8.31)(300)}{0.028}} = 517\\ \\mathrm{m/s}.$$

For helium it is $1.4\\ \\mathrm{km/s}$. Check: both have the same mean kinetic energy, so the lighter molecule must be faster, by $\\sqrt{7}$. And $517\\ \\mathrm{m/s}$ is a bit above the speed of sound in air, as you would expect, since sound is carried by those same molecules and cannot outrun them.

**Equipartition.** Each independent way a molecule can store energy in a squared form holds, on average, $\\tfrac12k_BT$. This is the **equipartition theorem**, and each way is a **degree of freedom**.

- A monatomic gas has 3 (motion in $x$, $y$, $z$), so $U = \\tfrac32nRT$ and $C_V = \\tfrac32R = 12.5\\ \\mathrm{J/(mol\\,K)}$.
- A diatomic gas at room temperature adds 2 rotations, so $C_V = \\tfrac52R = 20.8\\ \\mathrm{J/(mol\\,K)}$.
- A solid has 3 kinetic and 3 potential terms per atom, so $C = 3R$. That explains Dulong-Petit.

So $U$ for an ideal gas depends only on $T$, a fact used in the last module. Vibrations of a diatomic molecule add 2 more, but they do not count at room temperature. They are **frozen out**, because quantum mechanics spaces their energies too widely for typical collisions to excite them. This was a real puzzle until quantum theory.

**Pitfalls.** The mean KE per molecule depends only on $T$, not on mass. Do not forget the mass per molecule is not the molar mass. Equipartition fails at low temperature.`,
          resources: [
            openstax2('Read the rest of the chapter on the kinetic theory of gases.'),
            phet('Gas Properties', 'gas-properties', 'Mix light and heavy particles and compare their speeds.'),
            mit8044('Skim the early material on the kinetic picture of a gas.'),
          ],
          exercises: [
            {
              slug: 'energy-in-a-room',
              title: 'Energy in a room of air',
              prompt:
                'Treat the room from the last lesson as $2500\\ \\mathrm{mol}$ of a diatomic gas. Show that $U = \\frac52PV$. Evaluate it. How much energy does it take to warm that air by $1.0\\ \\mathrm K$ at constant volume? Compare it with the energy in a $500\\ \\mathrm{kcal}$ snack, which is about $2\\times 10^{6}\\ \\mathrm J$.',
              kind: 'problem',
              difficulty: 2,
              hint: '$U = 1.5\\times 10^{7}\\ \\mathrm J$; warming by $1.0\\ \\mathrm K$ takes $5.2\\times 10^{4}\\ \\mathrm J$.',
            },
            {
              slug: 'one-mole-ke',
              title: 'Kinetic energy of a mole',
              prompt:
                'Find the total translational kinetic energy of a mole of gas at $300\\ \\mathrm K$. Then find the speed at which a $1.0\\ \\mathrm{kg}$ object would have the same energy. Why can you not extract this energy to throw the object?',
              kind: 'problem',
              difficulty: 2,
              hint: 'The energy is about $3.7\\ \\mathrm{kJ}$, so the speed is about $86\\ \\mathrm{m/s}$. Disordered motion cannot simply be collected: that is the job of the second law.',
            },
            {
              slug: 'wall-pressure-sim',
              title: 'Pressure from a simulation',
              prompt:
                'Write a Python simulation of $N = 1000$ non-interacting particles in a 1D box, with speeds drawn from a chosen distribution. Add up the momentum delivered to one wall over a long time to find the force, and compare it with $Nm\\overline{v^2}/L$. Report the agreement, and how it improves with run time.',
              kind: 'simulation',
              difficulty: 2,
              hint: 'Each particle hits the wall about $v t/(2L)$ times in time $t$.',
            },
          ],
          selfAssessment: [
            {
              question: 'What does temperature measure in an ideal gas?',
              answerOutline: 'The mean translational kinetic energy per molecule, through $\\frac32k_BT$.',
            },
            {
              question: 'Why does helium have a higher RMS speed than nitrogen at the same temperature?',
              answerOutline: 'Same mean kinetic energy, smaller mass.',
            },
            {
              question: 'Why does a diatomic gas have $C_V$ of $\\frac52R$ at room temperature rather than $\\frac72R$?',
              answerOutline: 'Its vibrations are frozen out by quantum energy spacing.',
            },
          ],
          relatedLessons: ['thermodynamics-statistical-mechanics/temperature-heat-and-the-laws/kinetic-theory-of-gases'],
        },
        {
          slug: 'maxwell-boltzmann-distribution',
          title: 'The Maxwell-Boltzmann distribution',
          summary:
            'Molecules do not all have one speed: the distribution of speeds, its peak and its long tail.',
          estimatedMinutes: 130,
          objectives: [
            'Describe the Maxwell-Boltzmann speed distribution',
            'Find the most probable, mean and RMS speeds',
            'Compute the fraction above a given speed by numerical integration',
            'Explain atmospheric escape using the tail',
          ],
          concepts: [
            'Probability distribution',
            'Speed distribution',
            'Most probable speed',
            'Mean and RMS speed',
            'High-energy tail',
          ],
          explanation: `Molecules collide constantly, trading energy, so speeds vary. Maxwell found the distribution of speeds at equilibrium. The probability that a molecule has speed between $v$ and $v + dv$ is $f(v)\\,dv$, with

$$f(v) = 4\\pi\\left(\\frac{m}{2\\pi k_BT}\\right)^{3/2}v^2\\exp\\left(-\\frac{mv^2}{2k_BT}\\right).$$

Read this in two parts. The exponential is a **Boltzmann factor**, which you will meet properly later: high energies are exponentially unlikely. The $v^2$ counts how many velocity directions correspond to a given speed, the area of a sphere in velocity space: there are more ways to have a large speed than a small one. So the curve is a contest between counting and energy, and that theme runs through the whole course.

The curve starts at zero, peaks, and has a long tail. Three speeds describe it:

$$v_p = \\sqrt{\\frac{2k_BT}{m}}, \\quad \\bar v = \\sqrt{\\frac{8k_BT}{\\pi m}}, \\quad v_{\\text{rms}} = \\sqrt{\\frac{3k_BT}{m}}.$$

Their ratio is about $1 : 1.13 : 1.22$, because the tail pulls the means above the peak.

**Worked example.** For nitrogen at $300\\ \\mathrm K$, find the three speeds, and the fraction of molecules faster than $1000\\ \\mathrm{m/s}$.

The molecular mass is $m = 0.028/N_A = 4.65\\times 10^{-26}\\ \\mathrm{kg}$. So

$$v_p = 422\\ \\mathrm{m/s}, \\quad \\bar v = 476\\ \\mathrm{m/s}, \\quad v_{\\text{rms}} = 517\\ \\mathrm{m/s}.$$

Check by differentiation: setting $df/dv = 0$ gives $v_p$, since $d(v^2e^{-av^2})/dv = 0$ when $v^2 = 1/a$, and here $a = m/2k_BT$.

For the fraction, integrate $f(v)$ from $1000\\ \\mathrm{m/s}$ upward. It has no simple closed form, but a computer does it in one line. You get a fraction of $0.011$: about one molecule in a hundred. Although $1000\\ \\mathrm{m/s}$ is $2.4$ times the peak speed, that is enough to leave a noticeable tail.

**Atmospheric escape.** To leave Earth, a molecule needs $11.2\\ \\mathrm{km/s}$. Hydrogen at an upper-atmosphere temperature of $1000\\ \\mathrm K$ has an RMS speed of about $3.5\\ \\mathrm{km/s}$, but its tail reaches escape speed with a fraction near $10^{-6}$. Given enough time, this leak removes hydrogen from the air. For nitrogen, the fraction is around $10^{-91}$, which is effectively zero. That is why Earth has kept its nitrogen and lost its hydrogen, and why small warm bodies have no air.

**Pitfalls.** $f(v)$ is a probability *density*, with units s/m, so it is not itself a probability; only its integral over a range is. A mean speed is not the same as an RMS speed. The fraction depends strongly on $T$ and $m$ through the exponent.`,
          resources: [
            openstax2('Read the section on the distribution of molecular speeds.'),
            phet('Gas Properties', 'gas-properties', 'Open the energy tools and watch the histogram of speeds settle.'),
            hyperphysics('Look up the Maxwell speed distribution.'),
          ],
          exercises: [
            {
              slug: 'three-speeds',
              title: 'Derive the three speeds',
              prompt:
                'Starting from $f(v)$, find $v_p$ by setting the derivative to zero. Find $\\bar v$ and $v_{\\text{rms}}$ by numerical integration in Python for nitrogen at $300\\ \\mathrm K$, and confirm the formulas to three significant figures. Check that $\\int_0^\\infty f\\,dv = 1$.',
              kind: 'coding',
              difficulty: 2,
              hint: 'Use `scipy.integrate.quad`, with an upper limit of several thousand m/s.',
            },
            {
              slug: 'fraction-above',
              title: 'How much tail?',
              prompt:
                'Find the fraction of nitrogen molecules above $1000\\ \\mathrm{m/s}$ at $300\\ \\mathrm K$ and at $600\\ \\mathrm K$. By what factor does doubling the temperature increase the fraction? Explain why tails are so sensitive to temperature.',
              kind: 'coding',
              difficulty: 2,
              hint: 'At $300\\ \\mathrm K$ the fraction is $0.011$. It rises by more than ten times at $600\\ \\mathrm K$, because $T$ appears in an exponent.',
            },
            {
              slug: 'hold-on-to-an-atmosphere',
              title: 'Who keeps an atmosphere?',
              prompt:
                'A rule of thumb says a planet keeps a gas for billions of years if its escape speed is at least six times the RMS speed of the gas. Using a temperature of $1000\\ \\mathrm K$, test hydrogen, helium, nitrogen on Earth (escape speed $11.2\\ \\mathrm{km/s}$), and on the Moon (escape speed $2.4\\ \\mathrm{km/s}$). Present a small table, and say whether the results match what is observed.',
              kind: 'problem',
              difficulty: 2,
              hint: 'On Earth, hydrogen and helium fail the test, and nitrogen passes. On the Moon, all three fail.',
            },
          ],
          selfAssessment: [
            {
              question: 'Why does $f(v)$ start at zero even though the exponential is largest there?',
              answerOutline: 'The $v^2$ counting factor vanishes: few velocity states have nearly zero speed.',
            },
            {
              question: 'Rank the three characteristic speeds from smallest to largest.',
              answerOutline: 'Most probable, then mean, then RMS.',
            },
            {
              question: 'Why can Earth lose hydrogen even if its average speed is far below escape speed?',
              answerOutline: 'A small fraction in the tail exceeds it, and over long times they escape.',
            },
          ],
        },
      ],
      project: {
        slug: 'hard-disk-gas',
        title: 'A gas of hard disks',
        description: `Simulate a two-dimensional gas of hard disks bouncing in a box, and watch thermal physics appear from nothing but collisions. Start all disks at the same speed in random directions. Each step, move the disks and resolve any collisions using the elastic rules from the mechanics course: exchange the components of velocity along the line of centres.

No temperature or statistics is programmed in. Yet in a short time the speeds settle into the two-dimensional form of the Maxwell-Boltzmann distribution, $f(v) \\propto v\\,e^{-mv^2/2k_BT}$. The linear $v$ replaces $v^2$ because a circle is the two-dimensional version of a sphere. Use 200 to 500 disks, which NumPy handles easily, and measure the energy, the speed histogram and the push on the walls.`,
        deliverables: [
          'A Python simulation with an animation or a set of snapshots',
          'A check that total energy and momentum in collisions are conserved to rounding error',
          'A plot of the speed histogram at several times, compared with the two-dimensional distribution',
          'A measured wall pressure, compared with the two-dimensional gas law P A = N k T',
          'A short note explaining why the system never returns to equal speeds',
        ],
        estimatedHours: 4,
        stretchGoals: [
          'Mix two masses and show that they reach equal mean kinetic energy',
          'Add a moving piston and watch the gas heat on compression',
        ],
      },
    },
    {
      slug: 'entropy-and-the-second-law',
      title: 'Entropy and the Second Law',
      description:
        'The heart of the course: count the microscopic ways a system can be arranged, and entropy, temperature and irreversibility all follow.',
      lessons: [
        {
          slug: 'microstates-and-multiplicity',
          title: 'Microstates and multiplicity',
          summary:
            'Counting arrangements, from coins to large systems, and why the most likely outcome becomes a near certainty.',
          estimatedMinutes: 130,
          objectives: [
            'Distinguish a microstate from a macrostate',
            'Count multiplicities with binomial coefficients',
            'State the fundamental assumption of statistical physics',
            'Explain why relative fluctuations shrink as a system grows',
          ],
          concepts: [
            'Microstate',
            'Macrostate',
            'Multiplicity',
            'Equal probability assumption',
            'Binomial coefficient',
            'Relative width of a distribution',
          ],
          explanation: `Flip four coins. A **microstate** is the full list, such as HTHT. A **macrostate** is what you would actually report, such as "two heads". The **multiplicity** $\\Omega$ of a macrostate is the number of microstates it contains. For $N$ coins with $n$ heads,

$$\\Omega(N, n) = \\binom{N}{n} = \\frac{N!}{n!(N - n)!}.$$

Physics enters with one assumption, the **fundamental assumption**: an isolated system at equilibrium is equally likely to be in any of its accessible microstates. It has no preference, so all the physics of equilibrium comes down to counting.

**Worked example.** With 4 coins, the multiplicities of 0 to 4 heads are $1, 4, 6, 4, 1$, a total of 16. So $P(\\text{2 heads}) = 6/16 = 0.375$. Each single sequence, including HHHH, has the same probability, $1/16$. All heads is unusual only because it is one microstate, while "two heads" is six.

Now take 100 coins. The chance of exactly 50 heads is

$$P = \\binom{100}{50}2^{-100} = \\frac{1.0\\times 10^{29}}{2^{100}} = 0.080.$$

The chance of 45 to 55 heads is $0.73$, while all heads has a probability of about $10^{-30}$. Check: the total number of sequences is $2^{100} \\approx 1.3\\times 10^{30}$, and $1.0\\times 10^{29}$ of them is about $8\\%$. The spread agrees with the standard deviation $\\sigma = \\tfrac12\\sqrt N = 5$.

**Why big systems look certain.** The width of the distribution grows as $\\sqrt N$, but the mean grows as $N$. So the relative width falls as $1/\\sqrt N$. For $N = 10^{20}$, $\\sigma = 5\\times 10^{9}$, which sounds large but is only $10^{-10}$ of the mean of $5\\times 10^{19}$. A histogram drawn on any page would be a thin spike. In a macroscopic system, the most probable macrostate is, for all practical purposes, the only one you will ever see.

This is a deep shift in thinking. Air spreads evenly through a room not because a force makes it, but because the even macrostates have vastly more microstates. Nothing forbids all the air from gathering in one corner. It just never happens, since its probability is about $2^{-N}$ with $N \\approx 10^{27}$.

**Physical versions.** Coins stand in for many real two-state systems: each molecule of a gas in the left or right half of a box, or an atomic magnet pointing up or down. Next you will count states where the energy is shared.

**Pitfalls.** A macrostate's probability is large because of its multiplicity, not because any one of its microstates is favoured. Factorials overflow on calculators, so use \`math.comb\` in Python, or work with logarithms.`,
          resources: [
            mit8044('Use the opening material on probability and on counting states.'),
            phet('Diffusion', 'diffusion', 'Remove a divider and watch two gases mix. Count particles on each side.'),
            hyperphysics('Look up microstates and multiplicity.'),
          ],
          exercises: [
            {
              slug: 'ten-coins',
              title: 'Ten coins',
              prompt:
                'For 10 coins, list the multiplicity of each number of heads and confirm that they sum to $2^{10}$. Find the chance of exactly 5 heads. How many five-card hands are there from a standard 52-card deck?',
              kind: 'problem',
              difficulty: 1,
              hint: 'The chance of 5 heads is $252/1024 = 0.25$. There are $2598960$ hands.',
            },
            {
              slug: 'sharpening-peak',
              title: 'Watch the peak sharpen',
              prompt:
                'In Python, plot the probability of each fraction of heads for $N = 10, 100, 1000, 10000$, on the same axis of $n/N$. Use `scipy.stats.binom` to avoid overflow. Measure the width at half maximum and show that it scales as $1/\\sqrt N$ with a log-log fit.',
              kind: 'coding',
              difficulty: 2,
              hint: 'The fitted slope should be close to $-0.5$.',
            },
            {
              slug: 'all-on-one-side',
              title: 'All the gas on one side',
              prompt:
                'Estimate the probability that all the molecules in a box are in the left half at a given instant for $N = 10$, $N = 100$, and $N = 10^{20}$, giving the last as a power of ten. If you checked a box of 100 molecules a million times a second, how long would you expect to wait to see this? Compare with the age of the universe, $4.3\\times 10^{17}\\ \\mathrm s$.',
              kind: 'problem',
              difficulty: 2,
              hint: 'The wait is about $2^{100}/10^{6} \\approx 10^{24}\\ \\mathrm s$, far longer than the age of the universe.',
            },
          ],
          selfAssessment: [
            {
              question: 'What does the fundamental assumption say?',
              answerOutline: 'All accessible microstates of an isolated system at equilibrium are equally likely.',
            },
            {
              question: 'Is the sequence HHHHHHHHHH less likely than HTTHTHHTHT?',
              answerOutline: 'No, each exact sequence has the same probability. The macrostates differ in multiplicity.',
            },
            {
              question: 'Why do large systems look deterministic?',
              answerOutline: 'Relative fluctuations scale as $1/\\sqrt N$, which is tiny for huge $N$.',
            },
          ],
          relatedLessons: ['thermodynamics-statistical-mechanics/statistical-foundations/microstates-macrostates-and-multiplicity'],
        },
        {
          slug: 'entropy-and-temperature',
          title: 'Entropy and temperature',
          summary:
            'Sharing quanta of energy in the Einstein solid, entropy as the logarithm of multiplicity, and the true definition of temperature.',
          estimatedMinutes: 150,
          objectives: [
            'Count the states of an Einstein solid',
            'Find the most likely energy split between two solids',
            'Define entropy as k ln of multiplicity',
            'Define temperature from the slope of entropy with energy',
          ],
          concepts: [
            'Einstein solid',
            'Energy quanta',
            'Entropy',
            'Additivity of entropy',
            'Statistical definition of temperature',
            'Equilibrium as equal temperatures',
          ],
          explanation: `A simple model of a solid is a set of $N$ independent oscillators, each holding whole quanta of energy $\\epsilon$. This is the **Einstein solid**. The number of ways to share $q$ quanta among $N$ oscillators is

$$\\Omega(N, q) = \\binom{q + N - 1}{q}.$$

Picture $q$ dots in a line with $N - 1$ dividers. Any arrangement of dots and dividers is one microstate.

**Worked example.** Solids A and B each have 3 oscillators, and they share 6 quanta in total. They can exchange energy. Find the most likely division.

For each $q_A$, the total multiplicity is the product $\\Omega_A\\Omega_B$:

| $q_A$ | 0 | 1 | 2 | 3 | 4 | 5 | 6 |
|---|---|---|---|---|---|---|---|
| $\\Omega_A$ | 1 | 3 | 6 | 10 | 15 | 21 | 28 |
| $\\Omega_B$ | 28 | 21 | 15 | 10 | 6 | 3 | 1 |
| Product | 28 | 63 | 90 | 100 | 90 | 63 | 28 |

The sum is 462, which equals $\\Omega(6, 6)$, as it must. The most likely split is $q_A = 3$, with probability $100/462 = 0.22$. Check: the two solids are equal, so an even split is expected. With a small system the peak is broad, but for large solids it becomes a spike. Unequal sizes split energy in proportion: 60 and 40 oscillators sharing 100 quanta peak at $q_A = 60$.

**Entropy.** Multiplicities multiply, and that makes them awkward. So define

$$S = k_B\\ln\\Omega.$$

Now entropy adds: $S_{\\text{total}} = S_A + S_B$. For the 462 states above, $S = 8.5\\times 10^{-23}\\ \\mathrm{J/K}$. Saying "the system goes to its most likely state" is the same as saying "total entropy goes to a maximum".

**Temperature.** At the maximum, a small energy shift changes nothing: $dS_A/dU_A + dS_B/dU_B = 0$. But $dU_B = -dU_A$, so the two slopes are equal:

$$\\frac{dS_A}{dU_A} = \\frac{dS_B}{dU_B}.$$

Equilibrium is what temperature describes, so these slopes must be connected with temperature. The true definition is

$$\\frac{1}{T} = \\frac{dS}{dU}.$$

A cold object has a steep curve: one more quantum raises its entropy a lot. A hot object has a shallow curve. So when energy moves from hot to cold, the cold object's entropy rises by more than the hot object's falls, and total entropy grows. That is *why* heat flows from hot to cold.

Here "T" is not an extra assumption. It comes from counting. For a 50-oscillator solid, one more quantum raises $\\ln\\Omega$ by $1.7$ at $q = 10$, but by only $0.67$ at $q = 50$. So the solid with fewer quanta is colder.

**Pitfalls.** The formula needs the logarithm, so entropy is a modest number even if $\\Omega$ is huge. Units come only from $k_B$. Do not confuse entropy with "disorder" alone: it counts accessible microstates.`,
          resources: [
            mit8044('Work the material on the microcanonical picture and the definition of temperature.'),
            hyperphysics('Look up entropy and the Einstein solid.'),
            {
              title: 'Python math.comb documentation',
              url: 'https://docs.python.org/3/library/math.html#math.comb',
              type: 'documentation',
              cost: 'free',
              provider: 'Python Software Foundation',
              note: 'Exact integer binomial coefficients, used in the exercises.',
            },
          ],
          exercises: [
            {
              slug: 'count-small-solids',
              title: 'Count by hand',
              prompt:
                'Check that $\\Omega(3, 3) = 10$ by listing all the ways to place three quanta in three oscillators. Then verify that $\\Omega(3, 6) = 28$ with the formula. In the worked example, find the chance that A has at most one quantum.',
              kind: 'problem',
              difficulty: 1,
              hint: 'The chance is $(28 + 63)/462 = 0.20$.',
            },
            {
              slug: 'unequal-solids',
              title: 'Large unequal solids',
              prompt:
                'Use Python to tabulate $\\Omega_A\\Omega_B$ for solids of $N_A = 60$, $N_B = 40$ sharing $q = 100$ quanta. Find the most likely $q_A$, and confirm that the mean energy per oscillator is equal in both solids at that point. Find the probability of that exact split, and the sum over a range of $\\pm 5$ around it.',
              kind: 'coding',
              difficulty: 2,
              hint: 'The peak is at $q_A = 60$, with probability about $0.057$. Use `math.comb`, which handles big integers exactly.',
            },
            {
              slug: 'find-a-temperature',
              title: 'Measure a temperature by counting',
              prompt:
                'For an Einstein solid of $N = 50$, compute $\\ln\\Omega(q)$ at each $q$, and estimate $k_BT/\\epsilon$ as $1/(\\ln\\Omega(q + 1) - \\ln\\Omega(q))$. Evaluate it at $q = 10$ and $q = 50$. Plot $T$ against $q$, and show that it rises. Then compute the heat capacity per oscillator from the slope, and show that it approaches $k_B$ at large $q$.',
              kind: 'coding',
              difficulty: 3,
              hint: 'The steps are $1.7$ and $0.67$, so $k_BT/\\epsilon$ is about $0.59$ and $1.5$.',
            },
          ],
          selfAssessment: [
            {
              question: 'Why define entropy as a logarithm?',
              answerOutline: 'Multiplicities multiply for combined systems, so the logarithm adds.',
            },
            {
              question: 'State the statistical definition of temperature.',
              answerOutline: '$1/T = dS/dU$: the slope of entropy against energy, at fixed volume and particle number.',
            },
            {
              question: 'Why does energy flow from hot to cold in terms of entropy?',
              answerOutline: 'The cold object gains more entropy than the hot one loses, so the total rises.',
            },
          ],
          relatedLessons: ['thermodynamics-statistical-mechanics/statistical-foundations/boltzmann-entropy-and-the-microcanonical-ensemble'],
        },
        {
          slug: 'irreversibility-and-the-second-law',
          title: 'Irreversibility and the second law',
          summary:
            'The second law, entropy changes in heat flow, free expansion and mixing, and the arrow of time.',
          estimatedMinutes: 130,
          objectives: [
            'State the second law as a law about total entropy',
            'Compute the entropy change from heat at a fixed temperature',
            'Find the entropy change in free expansion and in mixing',
            'Explain how irreversibility arises from reversible microscopic laws',
          ],
          concepts: [
            'Second law of thermodynamics',
            'Reversible process',
            'Entropy change dS = dQ/T',
            'Free expansion',
            'Irreversibility',
            'Arrow of time',
          ],
          explanation: `The **second law** says that the entropy of an isolated system does not fall. In equilibrium it stays at its maximum; in any real change it rises. This is not a force. It is the statement that a large system moves to macrostates with overwhelmingly more microstates.

A link to measurements comes from the definition of temperature. Adding a small amount of heat $Q$ reversibly at temperature $T$, with no work, changes $U$ by $Q$, so

$$dS = \\frac{dQ}{T}.$$

When $T$ changes, integrate: $\\Delta S = \\int mc\\,dT/T = mc\\ln(T_2/T_1)$. Note that $\\Delta S$ depends only on the end states, since $S$ is a state function. So to find it for a messy process, invent any reversible path between the same states.

**Worked example 1: heat flow.** $1000\\ \\mathrm J$ flows from a large block at $400\\ \\mathrm K$ to one at $300\\ \\mathrm K$. Each block is large enough to hold its temperature.

$$\\Delta S = -\\frac{1000}{400} + \\frac{1000}{300} = -2.5 + 3.33 = +0.83\\ \\mathrm{J/K}.$$

It is positive, so the flow is allowed. Reversing it would make the total negative, so it does not happen on its own. Check: the sign depends only on $T_c < T_h$.

**Worked example 2: free expansion.** One mole of gas fills half of an insulated box, and a partition is removed. It spreads through the whole box. No work is done, and no heat flows, so $U$ and $T$ stay the same. But the entropy grows. Counting gives the answer directly: each molecule now has twice the positions, so $\\Omega$ rises by $2^N$, and

$$\\Delta S = k_B\\ln 2^N = Nk_B\\ln 2 = R\\ln 2 = 5.76\\ \\mathrm{J/K}.$$

The reversible isothermal path gives the same value, $Q/T = nR\\ln 2$. The probability of the gas going back on its own is $2^{-N}$, with $N$ near $10^{24}$. It is not impossible; it just does not happen.

**The arrow of time.** Newton's laws run equally well backward. A film of two molecules colliding looks fine in reverse. So how can a large system have a preferred direction? The answer is in the starting condition: the system began in an unusually low-entropy state. From there, nearly every path leads to higher entropy. Time's arrow comes from probability together with a special beginning, and not from any one-way force. Cosmology traces that low-entropy start back to the early universe.

**A small system can fluctuate.** For a few molecules, entropy can fall briefly. The second law is a statement about large systems.

**Local decrease.** Entropy can fall in part of a system, as when water freezes in a freezer or a living cell builds order. That is allowed so long as the surroundings gain at least as much. Always count the whole.

**Pitfalls.** $dS = dQ/T$ applies along a reversible path. Do not use $Q = 0$ in free expansion to conclude $\\Delta S = 0$.`,
          resources: [
            openstax2('Read the chapter on the second law of thermodynamics, through entropy.'),
            phet('Diffusion', 'diffusion', 'Watch mixing happen and consider why it never unmixes.'),
            {
              title: 'Feynman Lectures on Physics, Volume I',
              url: 'https://www.feynmanlectures.caltech.edu/I_toc.html',
              type: 'textbook',
              cost: 'free',
              provider: 'Caltech',
              note: 'Find the chapter on ordering and entropy, and the one on irreversibility. The site may block scripts, but it opens in a browser.',
            },
          ],
          exercises: [
            {
              slug: 'melting-ice-entropy',
              title: 'Entropy of melting',
              prompt:
                'Find the entropy change of $1.0\\ \\mathrm{kg}$ of ice melting at $273\\ \\mathrm K$, in J/K. If the energy comes from a room at $293\\ \\mathrm K$, find the entropy change of the room and the total. Is the process allowed?',
              kind: 'problem',
              difficulty: 1,
              hint: 'The ice gains $1.22\\times 10^{3}\\ \\mathrm{J/K}$, and the room loses $1140\\ \\mathrm{J/K}$. The total is positive.',
            },
            {
              slug: 'mixing-entropy',
              title: 'Entropy of mixing hot and cold water',
              prompt:
                'Take the mixing example from the first module: $200\\ \\mathrm g$ at $80^\\circ\\mathrm C$ and $300\\ \\mathrm g$ at $20^\\circ\\mathrm C$ reach $44^\\circ\\mathrm C$. Use $\\Delta S = mc\\ln(T_2/T_1)$ for each, and find the total entropy change. Use kelvin.',
              kind: 'problem',
              difficulty: 2,
              hint: 'The total is about $+8.8\\ \\mathrm{J/K}$. The hot water loses less entropy than the cold water gains.',
            },
            {
              slug: 'ehrenfest-model',
              title: 'Watch entropy rise',
              prompt:
                'Simulate the urn model: $N = 1000$ molecules are in box A, and at each step one chosen at random moves to the other box. Plot $n_A$ against step number, and also $\\ln\\Omega(n_A)$. Show that $n_A$ relaxes to $N/2$ and then fluctuates. Run it with $N = 20$ also. How often does the number in A rise above $15$, and what does this say about the second law for small systems?',
              kind: 'simulation',
              difficulty: 2,
              hint: 'Plot the fluctuation size against $\\sqrt N$. Small systems show visible entropy dips.',
            },
          ],
          selfAssessment: [
            {
              question: 'If entropy increases, why can your freezer make ice?',
              answerOutline: 'Its compressor heats the room, and the room gains more entropy than the water loses.',
            },
            {
              question: 'Why does free expansion raise entropy when no heat flows?',
              answerOutline: 'Molecules have more accessible positions. $dS = dQ/T$ only applies on a reversible path.',
            },
            {
              question: 'How can time-symmetric laws give an arrow of time?',
              answerOutline: 'Starting from a low-entropy state, nearly all paths lead to higher entropy.',
            },
          ],
          relatedLessons: ['thermodynamics-statistical-mechanics/statistical-foundations/phase-space-ergodicity-and-the-arrow-of-time'],
        },
      ],
      project: {
        slug: 'counting-entropy',
        title: 'Entropy by exact counting',
        description: `Build a small Python tool that computes exact multiplicities for two interacting Einstein solids, with big integers from \`math.comb\`, and use it to show the second law emerging as size grows. For a chosen $(N_A, N_B, q)$ it tabulates $\\Omega_A\\Omega_B$ against $q_A$, finds the peak, and computes the entropy.

Run it for $N_A = N_B = 10$, $100$, $1000$ and $10000$ with $q$ equal to the total number of oscillators. Measure the relative width of the peak, and show that the chance of a substantial departure from equal sharing falls towards zero as the system grows. Then find the temperature of each solid from $\\Delta S/\\Delta U$, and show that the peak is exactly where they match.`,
        deliverables: [
          'A Python module with functions for multiplicity, entropy and temperature',
          'A plot of the probability against the fraction of energy in solid A, at four sizes',
          'A fit showing the relative width falls as one over the square root of N',
          'A plot of entropy against energy for both solids, showing that the slopes match at the peak',
          'A table of the probability of a 10 percent departure from equal sharing, at each size',
        ],
        estimatedHours: 3,
        stretchGoals: [
          'Use Stirling’s approximation for much larger solids and compare with the exact values',
          'Model a two-state paramagnet in the same way and find a state of negative temperature',
        ],
      },
    },
    {
      slug: 'heat-engines',
      title: 'Heat Engines',
      description:
        'Turning heat into work and moving heat uphill: what the second law allows, and how real machines compare.',
      lessons: [
        {
          slug: 'engines-and-the-carnot-limit',
          title: 'Engines and the Carnot limit',
          summary:
            'Why every heat engine must discard heat, and the efficiency limit that follows from entropy alone.',
          estimatedMinutes: 120,
          objectives: [
            'Describe a heat engine with an energy diagram',
            'Derive the Carnot limit from the second law',
            'Compute real and ideal efficiency',
            'Explain why waste heat cannot be avoided',
          ],
          concepts: [
            'Hot and cold reservoirs',
            'Engine efficiency',
            'Waste heat',
            'Carnot limit',
            'Reversible engine',
            'Entropy budget',
          ],
          explanation: `A **heat engine** runs in a cycle. It takes heat $Q_h$ from a hot reservoir at $T_h$, delivers work $W$, and dumps heat $Q_c$ to a cold reservoir at $T_c$. Over a full cycle, the engine returns to its starting state, so $\\Delta U = 0$, and the first law gives

$$W = Q_h - Q_c.$$

The **efficiency** is what you get divided by what you pay for: $\\eta = W/Q_h$.

Why not make $Q_c$ zero, turning all the heat into work? The first law allows this. The second law does not. Taking $Q_h$ out of a reservoir removes entropy $Q_h/T_h$. Work carries no entropy. So the only place the entropy can go is the cold reservoir, which gains $Q_c/T_c$. The engine itself ends a cycle unchanged. Total entropy must not fall, so

$$\\frac{Q_c}{T_c} \\ge \\frac{Q_h}{T_h}.$$

The engine must throw away some heat to dump its entropy. Then

$$\\eta = 1 - \\frac{Q_c}{Q_h} \\le 1 - \\frac{T_c}{T_h}.$$

This is the **Carnot limit**, reached only by a perfectly reversible engine. It depends only on the two temperatures, not on the working substance or the design. It came from entropy alone, without any model of how the engine works. That is the power of the approach.

**Worked example.** A power plant takes heat at $800\\ \\mathrm K$, and rejects it at $300\\ \\mathrm K$. It gives $1000\\ \\mathrm{MW}$ of electricity at a real efficiency of $0.40$. Find the Carnot limit, the heat in and out per second, and compare with the entropy budget.

$$\\eta_{\\max} = 1 - \\frac{300}{800} = 0.625.$$

The real plant needs $Q_h = 1000/0.40 = 2500\\ \\mathrm{MW}$, and so rejects $Q_c = 1500\\ \\mathrm{MW}$. An ideal one would need only $1600\\ \\mathrm{MW}$, rejecting $600\\ \\mathrm{MW}$.

Entropy budget per second: out of the hot source, $2500/800 = 3.1\\ \\mathrm{MW/K}$; into the river, $1500/300 = 5.0\\ \\mathrm{MW/K}$. The net gain is $1.9\\ \\mathrm{MW/K}$, positive, as the law requires. Check: the real efficiency is below the limit, and the plant dumps more heat than it delivers as power, which is typical. That is why such plants have cooling towers.

**Lessons.** Raise $T_h$ or lower $T_c$ to get closer to $1$. Since $T_c$ is the environment, in practice materials limit $T_h$. Small temperature differences mean poor limits: a scheme using warm ocean surface water at $298\\ \\mathrm K$ and deep water at $278\\ \\mathrm K$ has a limit of only $0.067$.

**Pitfalls.** Use kelvin. The Carnot limit is an upper bound, not a typical value: a reversible engine runs infinitely slowly, and delivers no power.`,
          resources: [
            openstax2('Read the sections on heat engines and the Carnot cycle.'),
            hyperphysics('Look up heat engines and the Carnot cycle.'),
            {
              title: 'MIT 5.60 Thermodynamics and Kinetics',
              url: 'https://ocw.mit.edu/courses/5-60-thermodynamics-kinetics-spring-2008/',
              type: 'course',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
              note: 'Use the lectures on the Carnot cycle and the second law for a chemist’s view.',
            },
          ],
          exercises: [
            {
              slug: 'car-engine-limit',
              title: 'A car engine',
              prompt:
                'A petrol engine has combustion gases near $1200\\ \\mathrm K$ and exhaust near $600\\ \\mathrm K$. Find the Carnot limit for those temperatures. If the engine delivers $25\\ \\mathrm{kW}$ with a real efficiency of $0.25$, find the fuel power and the waste heat. Where does the waste heat go?',
              kind: 'problem',
              difficulty: 1,
              hint: 'Limit $0.50$; fuel power $100\\ \\mathrm{kW}$; waste heat $75\\ \\mathrm{kW}$, through the radiator and exhaust.',
            },
            {
              slug: 'perpetual-motion-check',
              title: 'Check an inventor’s claim',
              prompt:
                'An inventor claims that an engine between $400\\ \\mathrm K$ and $300\\ \\mathrm K$ takes in $1000\\ \\mathrm J$ per cycle and gives out $300\\ \\mathrm J$ of work. Test it in two ways: compare it with the Carnot limit, and compute the total entropy change per cycle. Is the claim possible? What about $200\\ \\mathrm J$ of work?',
              kind: 'problem',
              difficulty: 2,
              hint: 'The limit is $0.25$, so $300\\ \\mathrm J$ is impossible, with entropy change $700/300 - 1000/400 < 0$. $200\\ \\mathrm J$ is allowed.',
            },
            {
              slug: 'finite-engine',
              title: 'Engine with two finite blocks',
              prompt:
                'Two identical blocks, with heat capacity $C$, start at $T_h$ and $T_c$. An ideal reversible engine runs between them until they reach one temperature. Show that the entropy condition gives $T_f = \\sqrt{T_hT_c}$, and that the work is $C(T_h + T_c - 2\\sqrt{T_hT_c})$. Evaluate the efficiency for $T_h = 400\\ \\mathrm K$ and $T_c = 100\\ \\mathrm K$.',
              kind: 'derivation',
              difficulty: 3,
              hint: 'Total entropy stays fixed: $C\\ln(T_f/T_h) + C\\ln(T_f/T_c) = 0$. Here $T_f = 200\\ \\mathrm K$. The work is $100C$ and the heat drawn from the hot block is $200C$, so the efficiency is $1/2$, below the starting Carnot value of $0.75$.',
            },
          ],
          selfAssessment: [
            {
              question: 'Why must an engine reject heat, in terms of entropy?',
              answerOutline: 'Heat taken in removes entropy from the source; work carries none, so entropy must leave as waste heat.',
            },
            {
              question: 'What does the Carnot efficiency depend on?',
              answerOutline: 'Only the two temperatures, in kelvin.',
            },
            {
              question: 'Why are real engines below the Carnot limit?',
              answerOutline: 'Friction, heat flow across finite temperature gaps, and the need to run at finite speed.',
            },
          ],
          relatedLessons: ['thermodynamics-statistical-mechanics/temperature-heat-and-the-laws/heat-engines-and-the-second-law'],
        },
        {
          slug: 'refrigerators-and-heat-pumps',
          title: 'Refrigerators and heat pumps',
          summary:
            'Running an engine backward to move heat uphill, and why a heat pump beats an electric heater.',
          estimatedMinutes: 100,
          objectives: [
            'Define the coefficient of performance',
            'Derive limits for refrigerators and heat pumps',
            'Compute real energy use',
            'Explain why a heat pump can deliver more heat than the work it uses',
          ],
          concepts: [
            'Refrigerator',
            'Heat pump',
            'Coefficient of performance',
            'Moving heat uphill',
            'Limits near absolute zero',
          ],
          explanation: `Heat flows from cold to hot only if you pay with work. A **refrigerator** takes heat $Q_c$ from a cold space, uses work $W$, and rejects $Q_h = Q_c + W$ to the warmer room. A **heat pump** is the same machine, valued for $Q_h$.

Since the output is not "work", we use a **coefficient of performance**, COP, instead of efficiency. It can exceed 1, because the machine moves heat rather than making it.

$$\\mathrm{COP}_{\\text{fridge}} = \\frac{Q_c}{W}, \\qquad \\mathrm{COP}_{\\text{pump}} = \\frac{Q_h}{W}.$$

The entropy condition is as before, with the arrows reversed. Entropy $Q_c/T_c$ leaves the cold side, and $Q_h/T_h$ enters the hot side. So $Q_h/T_h \\ge Q_c/T_c$, and with $W = Q_h - Q_c$,

$$\\mathrm{COP}_{\\text{fridge}} \\le \\frac{T_c}{T_h - T_c}, \\qquad \\mathrm{COP}_{\\text{pump}} \\le \\frac{T_h}{T_h - T_c}.$$

Note what these say: small temperature gaps are cheap, and large ones are costly.

**Worked example.** A heat pump keeps a house at $20^\\circ\\mathrm C$ ($293\\ \\mathrm K$) when it is $0^\\circ\\mathrm C$ ($273\\ \\mathrm K$) outside. Find the ideal COP. A real pump manages a COP of $3.0$. How much electrical power does it use to deliver $1.5\\ \\mathrm{kW}$ of heat, compared with an electric heater?

$$\\mathrm{COP}_{\\max} = \\frac{293}{293 - 273} = 14.7.$$

The real pump needs $W = 1.5/3.0 = 0.50\\ \\mathrm{kW}$. An electric heater, which turns all its electricity into heat, needs the full $1.5\\ \\mathrm{kW}$. The pump collects the other $1.0\\ \\mathrm{kW}$ from the cold outdoor air.

Check: the outdoor air does contain thermal energy, since it is well above absolute zero, so this breaks no law. The real COP is well below the limit, as it should be, because a real machine needs temperature gaps at its heat exchangers. On a much colder day the COP falls, because the gap grows.

**Fridges.** A kitchen fridge at $5^\\circ\\mathrm C$ ($278\\ \\mathrm K$) in a room at $25^\\circ\\mathrm C$ has an ideal COP of $13.9$. A real one might reach $3$, so removing $1000\\ \\mathrm J$ takes about $333\\ \\mathrm J$ of work, and all $1333\\ \\mathrm J$ ends up in your kitchen. Leaving the door open warms the room.

**Approaching absolute zero.** The fridge limit goes to zero as $T_c \\to 0$. The closer you go, the more work it costs per joule removed. That is one way of seeing why absolute zero can be approached but never reached.

**Pitfalls.** A COP above 1 does not break energy conservation. Use $W$ as electrical input, and watch which heat counts as output. An air conditioner must reject both the room's heat and its own work.`,
          resources: [
            openstax2('Read the section on refrigerators and heat pumps.'),
            hyperphysics('Look up refrigerators and heat pumps.'),
            mit8044('Use the material on heat engines and refrigerators.'),
          ],
          exercises: [
            {
              slug: 'air-conditioner',
              title: 'An air conditioner',
              prompt:
                'An air conditioner removes $3.5\\ \\mathrm{kW}$ of heat from a room, with a COP of $3.0$. Find the electric power used, and the rate at which heat goes out of the building.',
              kind: 'problem',
              difficulty: 1,
              hint: '$1.2\\ \\mathrm{kW}$ and $4.7\\ \\mathrm{kW}$.',
            },
            {
              slug: 'very-cold-fridge',
              title: 'Cooling to very low temperature',
              prompt:
                'A research refrigerator holds a sample at $0.010\\ \\mathrm K$, rejecting heat to a $300\\ \\mathrm K$ room. Find the ideal COP. How much work at the least does removing $1.0\\ \\mathrm{mJ}$ take? Comment on how the cost scales as $T_c$ falls.',
              kind: 'problem',
              difficulty: 2,
              hint: 'COP is $3.3\\times 10^{-5}$; work about $30\\ \\mathrm J$. The cost per joule grows as $1/T_c$.',
            },
            {
              slug: 'heat-pump-vs-boiler',
              title: 'Heat pump against a gas boiler',
              prompt:
                'A gas boiler burns fuel at an efficiency of $0.90$. A power station makes electricity from the same fuel at $0.45$, and the grid sends it to a heat pump with a COP of $3.0$. Per joule of fuel, how much heat reaches the house in each case? Find the least COP at which the heat pump route wins. Show your reasoning as an energy flow.',
              kind: 'problem',
              difficulty: 2,
              hint: 'Boiler: $0.90$ J. Heat pump route: $0.45 \\times 3.0 = 1.35$ J. It wins for COP above $2.0$.',
            },
          ],
          selfAssessment: [
            {
              question: 'Can a COP be above 1? Why does this not break energy conservation?',
              answerOutline: 'Yes. The machine moves heat, so output includes energy drawn from the cold side.',
            },
            {
              question: 'Why does a heat pump get worse on a very cold day?',
              answerOutline: 'The limit is $T_h/(T_h - T_c)$, which falls as the gap grows.',
            },
            {
              question: 'Does an open fridge cool a room?',
              answerOutline: 'No, it warms it: the rejected heat includes the work.',
            },
          ],
        },
        {
          slug: 'real-cycles',
          title: 'Real cycles',
          summary:
            'Adiabatic processes and the Otto cycle, and how to analyse any cycle step by step.',
          estimatedMinutes: 120,
          objectives: [
            'Derive the adiabatic relation for an ideal gas',
            'Analyse a cycle step by step with a table',
            'Compute the efficiency of an Otto cycle',
            'Compare a real cycle with the Carnot limit',
          ],
          concepts: [
            'Adiabatic process',
            'Heat capacity ratio gamma',
            'Otto cycle',
            'Compression ratio',
            'Step-by-step analysis',
          ],
          explanation: `No real engine is a Carnot engine, but ideal-gas models get close to many real cycles. You need one more process.

**Adiabatic change.** If a gas changes so quickly, or is so well insulated, that no heat flows, then $Q = 0$ and $dU = -P\\,dV$. Using $dU = nC_V\\,dT$ and $PV = nRT$ gives

$$PV^\\gamma = \\text{constant}, \\qquad TV^{\\gamma - 1} = \\text{constant},$$

where $\\gamma = C_P/C_V$, equal to $5/3$ for monatomic gases, and $7/5$ for diatomic gases like air. Here $C_P = C_V + R$. Compressing a gas this way heats it, which is why a bicycle pump warms up.

**The Otto cycle** models a petrol engine with four steps.

1. Adiabatic compression, from volume $V_1$ to $V_2$.
2. Constant-volume heating, as the fuel burns.
3. Adiabatic expansion, the power stroke.
4. Constant-volume cooling, in place of exhaust and intake.

Heat comes in only in step 2, and leaves in step 4. Using $Q = nC_V\\Delta T$ and the adiabatic relation, the temperatures combine neatly, and with **compression ratio** $r = V_1/V_2$, you get

$$\\eta = 1 - \\frac{1}{r^{\\gamma - 1}}.$$

**Worked example.** Find the efficiency and the end of compression conditions for an air cycle with $r = 10$, $\\gamma = 1.4$, starting at $300\\ \\mathrm K$ and $1.0\\ \\mathrm{atm}$.

$$\\eta = 1 - 10^{-0.4} = 0.60.$$

From $TV^{\\gamma - 1}$ constant, $T_2 = 300 \\times 10^{0.4} = 754\\ \\mathrm K$. From $PV^\\gamma$ constant, $P_2 = 10^{1.4} = 25\\ \\mathrm{atm}$.

Check: for $r = 8$, the efficiency falls to $0.56$, so higher compression helps. Real petrol engines reach about half this figure, because of friction, heat leaks, and incomplete burning. And too high a compression makes the fuel ignite early, which is called knock. Diesel engines avoid this by compressing air alone, and so can reach higher ratios.

**Analysing any cycle.** Use a table with a row for each step, and columns for $Q$, $W$ and $\\Delta U$. Each row must satisfy $\\Delta U = Q - W$. The $\\Delta U$ column must sum to zero. The net work is $Q_{\\text{in}} - Q_{\\text{out}}$. Only the *positive* $Q$ counts as heat paid for.

For example, take a monatomic gas round a rectangle from $(1.0\\times 10^{5}\\ \\mathrm{Pa},\\ 0.010\\ \\mathrm{m^3})$ up to $(2.0\\times 10^{5}\\ \\mathrm{Pa},\\ 0.020\\ \\mathrm{m^3})$. The work is $1000\\ \\mathrm J$. Heat enters on the two heating sides: $1500\\ \\mathrm J$ at constant volume and $5000\\ \\mathrm J$ at constant pressure, or $6500\\ \\mathrm J$ in all. So $\\eta = 0.15$, well below the Carnot value of $0.75$ for its temperature extremes, which differ by a factor of 4.

**Pitfalls.** Use $C_V$ at constant volume, and $C_P$ at constant pressure. In an adiabat, $PV$ is *not* constant. Do not count heat released as an input.`,
          resources: [
            openstax2('Read the sections on adiabatic processes and on other cycles.'),
            hyperphysics('Look up the Otto cycle and the Diesel cycle.'),
            phet('Gas Properties', 'gas-properties', 'Insulate the box, compress quickly and compare with a slow compression.'),
          ],
          exercises: [
            {
              slug: 'bicycle-pump',
              title: 'Compression heats a gas',
              prompt:
                'Air at $300\\ \\mathrm K$ is suddenly compressed to one tenth of its volume, then, with a different engine, to one twentieth. Find the final temperature in each case with $\\gamma = 1.4$. Why does a diesel engine need no spark?',
              kind: 'problem',
              difficulty: 1,
              hint: '$754\\ \\mathrm K$ and about $994\\ \\mathrm K$. The air gets hot enough to ignite the fuel.',
            },
            {
              slug: 'derive-adiabat',
              title: 'Derive the adiabat',
              prompt:
                'Starting from $nC_V\\,dT = -P\\,dV$ and the ideal gas law, derive $TV^{\\gamma - 1} = \\text{constant}$. Then derive the Otto efficiency, showing how $T_3 - T_4$ and $T_2 - T_1$ are connected by the same factor.',
              kind: 'derivation',
              difficulty: 2,
              hint: 'Divide by $T$ and integrate. Both adiabats give $T_2 = r^{\\gamma - 1}T_1$ and $T_3 = r^{\\gamma - 1}T_4$.',
            },
            {
              slug: 'rectangle-cycle-table',
              title: 'Build the table for a rectangular cycle',
              prompt:
                'For the monatomic rectangle cycle in the explanation, between $(1.0\\times 10^{5}\\ \\mathrm{Pa},\\ 0.010\\ \\mathrm{m^3})$ and $(2.0\\times 10^{5}\\ \\mathrm{Pa},\\ 0.020\\ \\mathrm{m^3})$, write the four-row table of $Q$, $W$ and $\\Delta U$, using $\\Delta U = \\frac32\\Delta(PV)$. Show that each column of $\\Delta U$ sums to zero, find the heat in and out, and confirm $\\eta = 0.15$. Why is this well below the Carnot value of $0.75$?',
              kind: 'problem',
              difficulty: 3,
              hint: 'Heat enters on the two heating sides, $1500\\ \\mathrm J$ and $5000\\ \\mathrm J$, and leaves on the other two, $5500\\ \\mathrm J$ in all.',
            },
          ],
          selfAssessment: [
            {
              question: 'Why does a gas warm up in adiabatic compression?',
              answerOutline: 'Work goes in and no heat leaves, so internal energy rises.',
            },
            {
              question: 'What sets the efficiency of an ideal Otto cycle?',
              answerOutline: 'Only the compression ratio and $\\gamma$.',
            },
            {
              question: 'Why is the efficiency of a real cycle less than Carnot for its extremes?',
              answerOutline: 'Heat enters and leaves over a range of temperatures, and not all of it at the extremes.',
            },
          ],
        },
      ],
      project: {
        slug: 'cycle-calculator',
        title: 'An engine cycle calculator',
        description: `Write a Python program that takes a list of steps for an ideal gas (isothermal, adiabatic, constant volume, constant pressure), with $\\gamma$ and the starting state, and computes the full table of $Q$, $W$, $\\Delta U$ and $\\Delta S$ for each step. It should draw the cycle on a PV diagram and on a TS diagram, and find the efficiency.

Validate it on a Carnot cycle, which must return $1 - T_c/T_h$ and zero total entropy change. Then explore a question of your choice. For example, how does Otto efficiency compare with the Carnot limit for the same peak temperatures? Or what compression ratio gives the most work per cycle for a fixed peak temperature?`,
        deliverables: [
          'A Python program that handles any sequence of the four step types',
          'A results table with Q, W, change in U and change in S for each step',
          'PV and TS plots of at least the Carnot and Otto cycles',
          'Tests showing that the change in U and the change in S each sum to zero round a cycle',
          'A test showing the Carnot result and the Otto formula are recovered to within 0.1 percent',
          'A short answer to the question you chose to explore',
        ],
        estimatedHours: 3,
        stretchGoals: [
          'Add a Stirling cycle with an ideal regenerator, and show that it reaches the Carnot limit',
          'Add a simple friction loss and find the compression ratio of best efficiency',
        ],
      },
    },
    {
      slug: 'free-energy-and-statistical-ideas',
      title: 'Free Energy and Statistical Ideas',
      description:
        'Systems that sit at a fixed temperature: the Boltzmann factor, free energy as the contest between energy and entropy, and phase changes.',
      lessons: [
        {
          slug: 'the-boltzmann-factor',
          title: 'The Boltzmann factor',
          summary:
            'The probability of a state at temperature T, with applications from the atmosphere to reaction rates.',
          estimatedMinutes: 130,
          objectives: [
            'Derive the Boltzmann factor from entropy',
            'Compute relative populations of energy levels',
            'Apply the factor to the atmosphere and to thermal activation',
            'Compare an energy with the thermal energy kT',
          ],
          concepts: [
            'Reservoir at fixed temperature',
            'Boltzmann factor',
            'Thermal energy kT',
            'Partition function',
            'Degeneracy',
            'Activation energy',
          ],
          explanation: `Most systems do not stand alone. They sit in contact with surroundings at a fixed temperature, and energy moves back and forth. So what is the chance that a small system is in a given state with energy $E$?

Treat the surroundings as a large reservoir. If the small system takes energy $E$, the reservoir has that much less, so its entropy falls by $E/T$ (from $dS = dU/T$). Multiplicity is $e^{S/k_B}$, so the reservoir's number of microstates falls by the factor $e^{-E/k_BT}$. All microstates of the combined system are equally likely. Hence

$$P(\\text{state with energy }E) \\propto e^{-E/k_BT}.$$

This is the **Boltzmann factor**, perhaps the most useful result in the course. To turn it into a true probability, divide by the sum over all states, called the **partition function** $Z = \\sum e^{-E_i/k_BT}$.

The key scale is $k_BT$, about $0.026\\ \\mathrm{eV}$ at $300\\ \\mathrm K$. States within a few $k_BT$ are readily occupied. States many $k_BT$ above are exponentially empty.

**Worked example.** A molecule has a ground state and one excited state, $0.10\\ \\mathrm{eV}$ above, each a single state. Find the ratio of populations at $300\\ \\mathrm K$, and the fraction in the ground state.

$$\\frac{P_1}{P_0} = e^{-0.10/0.0259} = 0.021, \\qquad P_0 = \\frac{1}{1 + 0.021} = 0.98.$$

Check: $E$ is about $4k_BT$, so the excited state is rare but not absent. At very high $T$, the ratio goes to 1, and at $T \\to 0$ it goes to 0. These both make sense.

If several states share one energy, count them: multiply by the **degeneracy** $g$. For hydrogen, the $n = 2$ level is $10.2\\ \\mathrm{eV}$ above the ground level and has $g = 4$ orbital states against 1. At the Sun's surface, $5800\\ \\mathrm K$, the ratio is $4e^{-10.2/0.50} = 5.5\\times 10^{-9}$.

**The atmosphere.** Potential energy $mgh$ gives a density that falls as $e^{-mgh/k_BT}$, with a **scale height** of $H = k_BT/mg$. For nitrogen at $288\\ \\mathrm K$, $H = 8.7\\ \\mathrm{km}$. The pressure halves every $6.0\\ \\mathrm{km}$, and at the top of Everest, $8850\\ \\mathrm m$, it is $0.36$ of its sea-level value in this simple isothermal model.

**Rates.** Many processes need a molecule to get over a barrier of height $E_a$. The fraction with enough energy goes as $e^{-E_a/k_BT}$. So reaction rates rise rapidly with temperature. The old rule that a rate doubles for each $10\\ \\mathrm K$ near room temperature corresponds to $E_a$ of about $0.56\\ \\mathrm{eV}$.

The Maxwell-Boltzmann speed curve is this factor with $E = \\tfrac12mv^2$, times a count of states.

**Pitfalls.** It gives the probability of one *state*. For an energy level, include the degeneracy. Keep $E$ and $k_BT$ in the same units; eV is usually easier for atoms.`,
          resources: [
            mit8044('Work the material on the canonical picture and the Boltzmann factor.'),
            hyperphysics('Look up the Boltzmann distribution.'),
            {
              title: 'NIST Fundamental Physical Constants',
              url: 'https://physics.nist.gov/cuu/Constants/',
              type: 'documentation',
              cost: 'free',
              provider: 'NIST',
              note: 'Reference values of the Boltzmann constant in J/K and eV/K.',
            },
          ],
          exercises: [
            {
              slug: 'hydrogen-sun',
              title: 'Excited hydrogen in the Sun',
              prompt:
                'Using $k_BT$ in eV, compute the fraction of hydrogen atoms in the $n = 2$ level compared with $n = 1$ at $5800\\ \\mathrm K$, taking $g = 4$ for that level. Find what temperature would make the ratio $0.01$. Why is that temperature so much higher than the $10\\ \\mathrm{eV}$ gap suggests at first sight?',
              kind: 'problem',
              difficulty: 2,
              hint: 'The ratio is $5.5\\times 10^{-9}$. Solving gives about $2.0\\times 10^{4}\\ \\mathrm K$.',
            },
            {
              slug: 'scale-height',
              title: 'Height of the atmosphere',
              prompt:
                'Derive $P(h) = P_0e^{-mgh/k_BT}$ in two ways: from the Boltzmann factor, and from $dP/dh = -\\rho g$ with the ideal gas law. Evaluate the scale height and the pressure at the top of Everest, in the isothermal model, for nitrogen at $288\\ \\mathrm K$.',
              kind: 'derivation',
              difficulty: 2,
              hint: 'Scale height $8.7\\ \\mathrm{km}$, and a pressure ratio of $0.36$.',
            },
            {
              slug: 'activation-energy',
              title: 'Rule of thumb for reaction rates',
              prompt:
                'A rate goes as $e^{-E_a/k_BT}$. If it doubles from $300\\ \\mathrm K$ to $310\\ \\mathrm K$, find $E_a$ in eV. By what factor does this rate rise from $300\\ \\mathrm K$ to $350\\ \\mathrm K$? Why does food last longer in a fridge?',
              kind: 'problem',
              difficulty: 2,
              hint: '$E_a$ is about $0.56\\ \\mathrm{eV}$. The factor up to $350\\ \\mathrm K$ is about $22$.',
            },
          ],
          selfAssessment: [
            {
              question: 'Why does the Boltzmann factor have an exponential?',
              answerOutline: 'Taking energy from the reservoir lowers its entropy linearly, and multiplicity is the exponential of entropy.',
            },
            {
              question: 'What is $k_BT$ at room temperature, in eV?',
              answerOutline: 'About $0.026\\ \\mathrm{eV}$, or $1/40\\ \\mathrm{eV}$.',
            },
            {
              question: 'What does degeneracy do to a population ratio?',
              answerOutline: 'It multiplies the Boltzmann factor by the number of states with that energy.',
            },
          ],
          relatedLessons: ['thermodynamics-statistical-mechanics/canonical-ensembles/the-canonical-ensemble-and-partition-function'],
        },
        {
          slug: 'free-energy-and-equilibrium',
          title: 'Free energy and equilibrium',
          summary:
            'At fixed temperature, systems minimise energy minus temperature times entropy. This explains the balance of order and disorder.',
          estimatedMinutes: 130,
          objectives: [
            'Define the Helmholtz free energy',
            'Explain why a system at fixed T minimises F',
            'Predict a crossover temperature from energy and entropy',
            'Compute the equilibrium ratio of two groups of states',
          ],
          concepts: [
            'Helmholtz free energy',
            'Gibbs free energy',
            'Energy-entropy competition',
            'Equilibrium constant',
            'Crossover temperature',
            'Defects in crystals',
          ],
          explanation: `An isolated system maximises its total entropy. But for a system held at temperature $T$, it is hard to keep track of the surroundings. We would like a rule that uses only the system itself.

Suppose the system takes energy $dU$ from the reservoir. The reservoir's entropy changes by $-dU/T$. So the total entropy change is $dS - dU/T$. It must be positive, which is the same as

$$dF \\le 0, \\qquad F = U - TS.$$

$F$ is the **Helmholtz free energy**. At fixed temperature and volume, a system goes to minimum $F$. If pressure is fixed too, use the **Gibbs free energy**, $G = U + PV - TS$, which is what chemists use.

$F = U - TS$ shows a contest. Low energy is favoured, and so is high entropy. Which wins depends on $T$. At low $T$, energy wins, and systems settle into ordered, low-energy states. At high $T$, the entropy term dominates, and disorder wins. This one idea explains why ice melts, why gases condense, why magnets lose their magnetism when heated, and why proteins unfold.

**Worked example.** A molecule can be in a compact state A with energy $0$, one state only. Or it can be in a floppy state B at energy $0.10\\ \\mathrm{eV}$ with $g = 1000$ states. At what temperature are the two equally likely? What is the chance of B at $300\\ \\mathrm K$?

Each state has a Boltzmann factor, so the ratio of the two groups is

$$\\frac{P_B}{P_A} = g\\,e^{-\\Delta E/k_BT}.$$

Equal chance means $\\Delta E = k_BT\\ln g$. That is the same as $\\Delta F = \\Delta E - T\\Delta S = 0$, with entropy difference $\\Delta S = k_B\\ln g$. So

$$T^* = \\frac{\\Delta E}{k_B\\ln g} = \\frac{0.10}{(8.62\\times 10^{-5})(6.91)} = 168\\ \\mathrm K.$$

At $300\\ \\mathrm K$, the ratio is $1000e^{-3.87} = 21$, so $P_B = 21/22 = 0.95$. Check: well above $T^*$, the entropy-rich state dominates, even though it costs energy. In terms of $F$: $T\\Delta S = (300)(6.0\\times 10^{-4}) = 0.18\\ \\mathrm{eV}$, which beats $\\Delta E$. At $100\\ \\mathrm K$, the ratio falls to $9.2\\times 10^{-3}$, and energy wins.

**Defects.** Real crystals are never perfect. Removing an atom costs energy $\\epsilon$, but there are many places for the vacancy to go, which gives entropy. Minimising $F$ gives a fraction of vacancies of about $e^{-\\epsilon/k_BT}$. For $\\epsilon = 1.0\\ \\mathrm{eV}$ at $1000\\ \\mathrm K$, that is $9.2\\times 10^{-6}$. So a perfect crystal is *not* the equilibrium state at any non-zero temperature.

**Chemical equilibrium** has the same form. In a reaction, the ratio of products to reactants is set by $e^{-\\Delta G/RT}$, using energies per mole.

**Pitfalls.** Minimising $F$ applies only at fixed temperature. A system with high $F$ may take a long time to get to its minimum, because of barriers: diamond is not the lowest-$G$ form of carbon at room conditions, yet it lasts.`,
          resources: [
            mit8044('Use the material on free energy.'),
            hyperphysics('Look up free energy and the Gibbs function.'),
            phet('States of Matter', 'states-of-matter', 'Heat and cool a sample, and link what you see to energy against entropy.'),
          ],
          exercises: [
            {
              slug: 'crystal-defects',
              title: 'Vacancies in a crystal',
              prompt:
                'For a vacancy energy of $1.0\\ \\mathrm{eV}$, find the vacancy fraction at $300\\ \\mathrm K$ and at $1000\\ \\mathrm K$. By how many orders of magnitude does it change? Why are hot metals so much softer and easier to shape?',
              kind: 'problem',
              difficulty: 1,
              hint: 'About $10^{-17}$ and $9.2\\times 10^{-6}$, around twelve orders of magnitude.',
            },
            {
              slug: 'unfolding',
              title: 'A folding model',
              prompt:
                'A small protein model has a folded state of energy $0$ with one state and an unfolded state of energy $\\Delta E = 0.50\\ \\mathrm{eV}$ with $g = 10^{8}$ states. Find its melting temperature. Plot $P_{\\text{unfolded}}$ from $200$ to $400\\ \\mathrm K$. Over what temperature range does it go from $10\\%$ to $90\\%$ unfolded?',
              kind: 'coding',
              difficulty: 2,
              hint: 'The melting temperature is about $315\\ \\mathrm K$. It goes from $10\\%$ to $90\\%$ unfolded between about $281\\ \\mathrm K$ and $358\\ \\mathrm K$, a band of about $76\\ \\mathrm K$.',
            },
            {
              slug: 'minimise-f',
              title: 'Derive the vacancy fraction',
              prompt:
                'With $N$ sites and $n$ vacancies, $U = n\\epsilon$ and $S = k_B\\ln\\binom{N}{n}$. Use Stirling\'s approximation $\\ln x! \\approx x\\ln x - x$, and minimise $F = U - TS$ with respect to $n$. Show that $n/N \\approx e^{-\\epsilon/k_BT}$ for $n \\ll N$.',
              kind: 'derivation',
              difficulty: 3,
              hint: 'You will get $\\epsilon = k_BT\\ln[(N - n)/n]$.',
            },
          ],
          selfAssessment: [
            {
              question: 'What does a system minimise at fixed temperature and volume?',
              answerOutline: 'The Helmholtz free energy $F = U - TS$.',
            },
            {
              question: 'Why does order win at low temperature and disorder at high temperature?',
              answerOutline: 'The entropy term is weighted by $T$, so it is small when cold and dominant when hot.',
            },
            {
              question: 'Why is a perfect crystal not the equilibrium state above absolute zero?',
              answerOutline: 'A few defects add entropy that lowers $F$ more than their energy raises it.',
            },
          ],
          relatedLessons: ['thermodynamics-statistical-mechanics/entropy-and-thermodynamic-potentials/thermodynamic-potentials-and-maxwell-relations'],
        },
        {
          slug: 'phase-changes',
          title: 'Phase changes',
          summary:
            'Melting and boiling as a change of which phase has the lower free energy, with phase diagrams and the pressure dependence of boiling.',
          estimatedMinutes: 120,
          objectives: [
            'Explain a phase change with free energy',
            'Compute the entropy of a phase change',
            'Read a phase diagram',
            'Use the Clausius-Clapeyron equation',
          ],
          concepts: [
            'Phase equilibrium',
            'Entropy of a transition',
            'Phase diagram',
            'Triple and critical points',
            'Clausius-Clapeyron equation',
          ],
          explanation: `Two phases of a substance coexist at the temperature where their Gibbs free energies per mole are equal. Below that, the lower-energy phase has the lower $G$. Above it, the higher-entropy phase wins. So a phase change is the energy-entropy contest, with a sharp winner because so many molecules act together.

At the transition $\\Delta G = 0$, so $\\Delta H - T\\Delta S = 0$, where $\\Delta H$ is the latent heat per mole. Hence

$$\\Delta S = \\frac{L}{T}.$$

This is the entropy of a phase change. Melting ice takes $6012\\ \\mathrm{J/mol}$ at $273\\ \\mathrm K$, which is $22.0\\ \\mathrm{J/(mol\\,K)}$. Boiling takes $40.7\\ \\mathrm{kJ/mol}$ at $373\\ \\mathrm K$, which is $109\\ \\mathrm{J/(mol\\,K)}$. Boiling gives a much larger entropy gain, as a gas has vastly more accessible positions than a liquid does.

**Phase diagrams.** A map of pressure against temperature shows which phase is stable. Lines mark coexistence. At the **triple point**, three phases meet. The liquid-gas line ends at a **critical point**, beyond which the two are no longer distinct.

**How boiling depends on pressure.** Moving along a line between phases, $G$ stays equal, which gives the **Clausius-Clapeyron equation**:

$$\\frac{dP}{dT} = \\frac{L}{T\\Delta V}.$$

For boiling, the gas volume is far larger than the liquid, so $\\Delta V \\approx RT/P$. Integrating, for constant $L$,

$$\\ln\\frac{P_2}{P_1} = -\\frac{L}{R}\\left(\\frac{1}{T_2} - \\frac{1}{T_1}\\right).$$

**Worked example.** At what temperature does water boil near the top of Everest, where $P = 0.33\\ \\mathrm{atm}$? Take $L = 40.7\\ \\mathrm{kJ/mol}$, and the normal boiling point $373\\ \\mathrm K$ at $1\\ \\mathrm{atm}$.

$$\\frac{1}{T_2} = \\frac{1}{373} + \\frac{8.31}{40700}\\ln\\frac{1}{0.33} = 2.907\\times 10^{-3}\\ \\mathrm{K^{-1}}.$$

So $T_2 = 344\\ \\mathrm K$, or $71^\\circ\\mathrm C$. Check: tea made there is lukewarm by kitchen standards, and that is what climbers report. The pressure is lower, so the temperature is lower, which is the right direction. At $2\\ \\mathrm{atm}$, as in a pressure cooker, the same formula gives $121^\\circ\\mathrm C$, and food cooks much more quickly.

**Water is odd.** Ice is less dense than liquid water, so $\\Delta V$ for melting is negative, and the melting line tilts backward. With $\\Delta V = -9.05\\times 10^{-5}\\ \\mathrm{m^3/kg}$, the slope is about $-133\\ \\mathrm{atm/K}$. So pressure lowers the melting point, but only slightly. Skates do not melt ice by pressure alone: a typical skater's pressure shifts it by well under a kelvin. Friction and a thin liquid-like surface layer matter more.

**Pitfalls.** Temperature stays fixed during the change, while entropy jumps. Clausius-Clapeyron in the integrated form assumes constant $L$ and an ideal vapour, so it is an approximation over wide ranges.`,
          resources: [
            openstax2('Read the section on phase changes and phase diagrams.'),
            hyperphysics('Look up phase diagrams and vapour pressure.'),
            {
              title: 'NIST Chemistry WebBook: Fluid Properties',
              url: 'https://webbook.nist.gov/chemistry/fluid/',
              type: 'dataset',
              cost: 'free',
              provider: 'NIST',
              note: 'Real vapour-pressure data for water, for the exercise below.',
            },
          ],
          exercises: [
            {
              slug: 'entropy-of-boiling',
              title: 'Compare the two transitions',
              prompt:
                'From $L_f = 3.34\\times 10^{5}\\ \\mathrm{J/kg}$ and a molar mass of $18\\ \\mathrm{g/mol}$, find the latent heat per mole, and the molar entropy of melting. Compute the molar entropy of boiling with $L = 40.7\\ \\mathrm{kJ/mol}$. Express each in units of $R$, and explain the difference in terms of the available positions.',
              kind: 'problem',
              difficulty: 1,
              hint: '$6012\\ \\mathrm{J/mol}$; $22.0$ and $109\\ \\mathrm{J/(mol\\,K)}$, which are about $2.6R$ and $13R$.',
            },
            {
              slug: 'vapour-pressure-data',
              title: 'Test Clausius-Clapeyron against data',
              prompt:
                'From the NIST WebBook, obtain water\'s saturation pressure at about ten temperatures from $20$ to $150^\\circ\\mathrm C$. Plot $\\ln P$ against $1/T$. Fit a straight line and find $L$ from the slope. Compare it with $40.7\\ \\mathrm{kJ/mol}$, and explain any difference.',
              kind: 'data-analysis',
              difficulty: 2,
              hint: 'The slope is $-L/R$. $L$ falls slightly as $T$ rises, so a fit over this range gives a value a few percent higher than $40.7\\ \\mathrm{kJ/mol}$.',
            },
            {
              slug: 'skates',
              title: 'Does pressure melt ice under skates?',
              prompt:
                'A $70\\ \\mathrm{kg}$ skater stands on a blade of area $2.0\\times 10^{-5}\\ \\mathrm{m^2}$. Find the pressure in atm, and estimate the shift in melting point using the slope of $-133\\ \\mathrm{atm/K}$. Is pressure melting enough to explain skating at $-10^\\circ\\mathrm C$?',
              kind: 'problem',
              difficulty: 2,
              hint: 'The pressure is about $340\\ \\mathrm{atm}$, which shifts the melting point by about $2.5\\ \\mathrm K$. That is not enough at $-10^\\circ\\mathrm C$.',
            },
          ],
          selfAssessment: [
            {
              question: 'What is equal between two phases in equilibrium?',
              answerOutline: 'Temperature, pressure and Gibbs free energy per mole.',
            },
            {
              question: 'Why is the entropy of boiling much greater than the entropy of melting?',
              answerOutline: 'A gas has far more accessible positions than a liquid does.',
            },
            {
              question: 'Why does water boil at a lower temperature on a mountain?',
              answerOutline: 'Lower air pressure means the vapour pressure reaches it at a lower temperature.',
            },
          ],
          relatedLessons: ['thermodynamics-statistical-mechanics/phase-transitions-and-critical-phenomena/phase-diagrams-and-first-order-transitions'],
        },
      ],
    },
  ],
  capstone: {
    slug: 'second-law-from-scratch',
    title: 'The second law from scratch',
    description: `Build a simulation in which no thermodynamics is programmed in, and recover the main results of the course from random exchanges alone.

Start with an Einstein solid: $N$ oscillators that hold whole quanta. At each step, pick two oscillators at random, and let one pass a quantum to the other if it has one. Nothing else happens. Use at least $10^4$ oscillators, with NumPy to keep it fast. From this simple rule, measure the distribution of quanta and show that it settles to a Boltzmann factor, $P(n) \\propto e^{-n\\epsilon/k_BT}$, and find the temperature. Then join two solids at different temperatures, and watch energy flow until they match, with entropy from your exact counting formula rising throughout.

Finish with an engine. Use your hot and cold solids as reservoirs, build a small model that moves quanta between them through a "working" solid, take out work as quanta removed from the system, and measure the efficiency. Compare it with the Carnot limit. It is not expected to reach it, but it must never beat it. The final report explains in plain language how the second law emerged from random exchanges.`,
    deliverables: [
      'A Python simulation of the random-exchange model, with tests that total quanta never change',
      'A log-plot showing the Boltzmann distribution, with a fitted temperature compared with the exact formula',
      'A plot of energy and of total entropy against time for two solids brought into contact',
      'A measurement of heat capacity against temperature, compared with the exact Einstein result',
      'A simple engine model with measured efficiency compared with the Carnot limit across at least five runs',
      'A written report, of about 1500 words, explaining how irreversibility arises from these rules',
    ],
    estimatedHours: 6,
    stretchGoals: [
      'Run the same model with very few oscillators, and measure how often the entropy falls',
      'Add a two-state system in contact with the solid, and test the Boltzmann factor on it',
    ],
  },
  masteryChecklist: [
    'I can separate temperature, heat and internal energy, and apply the first law with clear signs',
    'I can explain pressure and temperature in terms of molecular motion',
    'I can count microstates and use them to find entropy and temperature',
    'I can explain why heat flows from hot to cold using entropy alone',
    'I can derive the Carnot limit and analyse a cycle step by step',
    'I can use the Boltzmann factor and the idea of free energy to predict what happens at a given temperature',
    'I can read a phase diagram and use the Clausius-Clapeyron equation',
    'I can check a thermal result with units, sizes and a short simulation',
  ],
});
