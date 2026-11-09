import { defineSubject } from '../define';
import type { ResourceInput } from '../types';

/* Data in this course was checked against FRED, BEA, BLS, CBO and Federal Reserve releases on
 * 8 November 2026. Every number that changes is dated in the text. */

const ostx = (slug: string, title: string, note: string, primary = false): ResourceInput => ({
  title: `OpenStax Principles of Macroeconomics 3e: ${title}`,
  url: `https://openstax.org/books/principles-macroeconomics-3e/pages/${slug}`,
  type: 'textbook',
  cost: 'free',
  provider: 'OpenStax',
  note,
  primary,
});

const mru = (unit: string, lesson: string, title: string, note: string): ResourceInput => ({
  title: `Marginal Revolution University: ${title}`,
  url: `https://learn.mru.org/courses/principles-of-macroeconomics/units/${unit}/lessons/${lesson}`,
  type: 'video',
  cost: 'free',
  provider: 'Marginal Revolution University',
  note,
});

const fred = (id: string, title: string, note: string): ResourceInput => ({
  title: `FRED: ${title} (${id})`,
  url: `https://fred.stlouisfed.org/series/${id}`,
  type: 'dataset',
  cost: 'free',
  provider: 'Federal Reserve Bank of St. Louis',
  note,
});

const core = (file: string, title: string, note: string): ResourceInput => ({
  title: `CORE Econ, The Economy 2.0: Macroeconomics: ${title}`,
  url: `https://www.core-econ.org/the-economy/macroeconomics/${file}.html`,
  type: 'textbook',
  cost: 'free',
  provider: 'CORE Econ',
  note,
});

export default defineSubject({
  id: 'macroeconomic-principles',
  title: 'Macroeconomic Principles',
  category: 'economics',
  tagline:
    'Output, jobs, prices, money and policy for the whole economy: how they are measured, what drives them in the long run and the short run, and what central banks and governments can and cannot do.',
  description: `Macroeconomics studies the economy as a whole: why some countries are rich and others poor, why output and employment rise and fall in business cycles, what causes inflation, and what monetary and fiscal policy can do about any of it. This course starts with measurement (GDP, price indexes and unemployment), builds the long-run model of growth and of saving and investment, adds money and banking, then turns to short-run fluctuations with the Keynesian cross and the aggregate demand and aggregate supply model. It ends with monetary policy, fiscal policy and government debt, the Phillips curve, and the open economy.

Every model is taught three ways: the graph, the algebra behind it (linear equations you can solve by hand, with numbers), and the intuition, followed by its assumptions and where it fails. Interactive diagrams let you shift aggregate demand and watch the economy adjust, step through the rounds of the spending multiplier, compound growth rates, follow a deposit from bank to bank, and project the government debt ratio. No calculus is needed; high-school algebra is enough.

The course uses real US data throughout, mainly from FRED (the St. Louis Fed's free database), the Bureau of Economic Analysis, the Bureau of Labor Statistics, the Congressional Budget Office and the Federal Reserve, and every figure that changes is dated. Data were checked on 8 November 2026. Recent episodes, the 2008 financial crisis, the 2020 pandemic recession and the 2021–23 inflation, are treated factually, and where economists disagree about causes or policy the lessons set out the main positions and the evidence for each.

The course follows the topics of ECON 103, Macroeconomic Principles, at the University of Illinois Urbana-Champaign, based on its public catalog description (aggregate income, employment, output, the price level and the role of money, with emphasis on monetary and fiscal policy, inflation, unemployment, growth and international economics). It is an original course and is not affiliated with or endorsed by the University of Illinois. As at Illinois, it can be taken before or after Microeconomic Principles; the first lesson includes the supply-and-demand refresher you need.`,
  difficulty: 'beginner',
  estimatedHours: 76,
  prerequisites: [],
  recommendedBackground: [
    'High-school algebra: solving linear equations, percentages, reading graphs',
    'Microeconomic Principles (microeconomic-principles) is helpful but not required; either course can come first',
    'A spreadsheet program (Excel, Google Sheets or LibreOffice) for the data exercises',
  ],
  tags: ['economics', 'macroeconomics', 'GDP', 'inflation', 'unemployment', 'monetary policy', 'fiscal policy', 'growth', 'FRED'],
  core: false,
  modules: [
    {
      slug: 'measuring-output',
      title: 'The Big Questions and Measuring Output',
      description:
        'What macroeconomics asks and how it models the whole economy, a supply-and-demand refresher, and gross domestic product: three ways to measure it, real versus nominal, the deflator, and what GDP leaves out.',
      lessons: [
        {
          slug: 'what-macroeconomics-studies',
          title: 'What macroeconomics studies, and a supply-and-demand refresher',
          summary:
            'The questions macroeconomics asks, the handful of numbers it watches, the long-run and short-run split this course follows, and the supply-and-demand tool you will reuse for whole markets.',
          estimatedMinutes: 100,
          objectives: [
            'Name the main questions of macroeconomics and the statistic that tracks each',
            'Explain why the whole economy can behave differently from one market (the fallacy of composition)',
            'Distinguish the long run, where output is set by resources and technology, from the short run, where demand matters',
            'Solve a linear supply-and-demand model for the equilibrium price and quantity, before and after a shift',
            'Tell a shift of a curve from a movement along it',
          ],
          concepts: [
            'Macroeconomics versus microeconomics',
            'Aggregate: a total over the whole economy',
            'Fallacy of composition',
            'Long run versus short run',
            'Model, endogenous and exogenous variables',
            'Demand, supply, equilibrium',
            'Shift of a curve versus movement along it',
          ],
          explanation: `**Macroeconomics** studies the economy as a whole. Four questions organise this course, each with a statistic you will learn to read:

| Question | Statistic | US value (latest as of 8 Nov 2026) |
|---|---|---|
| How much do we produce, and why does it grow? | Real GDP | USD 24.6 trillion a year in 2017 dollars, Q3 2026 |
| Why are people out of work? | Unemployment rate | 4.1%, October 2026 |
| Why do prices rise? | CPI inflation, 12 months | 3.7%, September 2026 |
| What can policy do? | Federal funds rate target | 3.75–4.00%, set 17 September 2026 |

Totals over the whole economy are called **aggregates**. They are not just big markets. If one family saves more it gets richer, but if every family saves more at once, spending falls, firms sell less and incomes can fall: the **fallacy of composition**. That is why macroeconomics needs models of its own.

A **model** is a deliberate simplification. Its **endogenous** variables are what it explains (output, prices); its **exogenous** variables are taken as given (technology, policy). The course follows a standard split. In the **long run** (Modules 3–5), output depends on labour, capital and technology, and money affects only prices. In the **short run** (Modules 6–9), prices and wages adjust slowly, so spending drives output and policy can matter.

**Refresher: supply and demand.** You will use this tool for loanable funds, labour, money and currencies. Suppose quantity demanded is $Q_d = 120 - 2P$ and quantity supplied is $Q_s = -30 + 3P$. Equilibrium sets $Q_d = Q_s$:

$$
120 - 2P = -30 + 3P \\;\\Rightarrow\\; P^* = 30,\\quad Q^* = 60.
$$

If buyers want 20 more units at every price, demand **shifts** to $Q_d = 140 - 2P$, and $140 - 2P = -30 + 3P$ gives $P^* = 34$, $Q^* = 72$. Sellers responding to the higher price is a **movement along** the supply curve, not a shift of it. Graphs put price on the vertical axis, so the widget writes the same curves in inverse form, $P = 60 - Q/2$ and $P = 10 + Q/3$.

\`\`\`interactive
supply-demand
{"title": "Supply and demand refresher", "demand": [60, 0.5], "supply": [10, 0.3333333], "view": [0, 130, 0, 70], "shiftRange": 40, "showSurplus": false, "showElasticity": false, "xLabel": "Quantity Q", "yLabel": "Price P", "caption": "Demand is P = 60 − Q/2 (Q = 120 − 2P) and supply is P = 10 + Q/3 (Q = −30 + 3P), so the equilibrium is P* = 30, Q* = 60. Set the demand shift to +20, which adds 20 units at every price, and check the new equilibrium P* = 34, Q* = 72. Then shift supply instead and say which way price moves."}
\`\`\`

If you have taken Microeconomic Principles, skim this part. If not, work through the OpenStax chapter before Module 4.`,
          relatedLessons: ['microeconomic-principles/supply-and-demand/market-equilibrium', 'microeconomic-principles/supply-and-demand/changes-in-equilibrium'],
          resources: [
            ostx('1-2-microeconomics-and-macroeconomics', 'Microeconomics and macroeconomics', 'A short statement of the split, and the goals of macroeconomic policy.', true),
            ostx('3-1-demand-supply-and-equilibrium-in-markets-for-goods-and-services', 'Demand, supply and equilibrium', 'The refresher in full, with graphs. Read 3.1 to 3.3 if supply and demand are new to you.'),
            fred('GDPC1', 'Real Gross Domestic Product', 'The flagship series for output. Learn to change the units to "Percent Change from Year Ago" in the Edit Graph menu.'),
          ],
          exercises: [
            {
              slug: 'solve-a-market',
              title: 'Solve a linear market',
              prompt:
                'Demand is $Q_d = 200 - 4P$ and supply is $Q_s = -40 + 2P$. (a) Find the equilibrium price and quantity. (b) A cost fall shifts supply to $Q_s = -10 + 2P$. Find the new equilibrium. (c) Write both curves in inverse form, $P$ as a function of $Q$, and sketch them.',
              kind: 'problem',
              difficulty: 1,
              hint: 'Set Qd = Qs. Answers: (a) P = 40, Q = 40. (b) 200 − 4P = −10 + 2P gives P = 35, Q = 60. (c) Demand P = 50 − Q/4; supply P = 20 + Q/2, then P = 5 + Q/2.',
            },
            {
              slug: 'fred-dashboard',
              title: 'Build a four-number dashboard in FRED',
              prompt:
                'Open FRED and find GDPC1 (real GDP), UNRATE (unemployment rate), CPIAUCSL (consumer price index; set units to "Percent Change from Year Ago") and FEDFUNDS (effective federal funds rate). For each, record the latest value with its date and the value for January 2020 (Q1 2020 for GDP). In one sentence each, say what changed between the two dates.',
              kind: 'data-analysis',
              difficulty: 1,
              hint: 'Use the date range boxes above the graph and hover over the line for exact values. Units and frequency are in the series notes under the graph.',
            },
            {
              slug: 'paradox-of-thrift',
              title: 'Explain the fallacy of composition',
              prompt:
                'In about 150 words, explain why a rule that is true for one household ("saving more makes me richer") may be false for the whole economy in the short run. Then say why it may be true again in the long run, when saving pays for new capital.',
              kind: 'writing',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Give two questions that are macroeconomic and two that are microeconomic.',
              answerOutline:
                'Macro: why the unemployment rate rose, what causes inflation, why GDP per person grows. Micro: why one firm sets its price, how a tax on one good changes its market. The test is whether the question is about economy-wide totals.',
            },
            {
              question: 'Demand for a good rises and its price goes up. Why is it wrong to say "supply increased because the price rose"?',
              answerOutline:
                'Supply as a curve did not move. The higher price caused a movement along the supply curve to a larger quantity supplied. Only a change in something other than the good\'s own price shifts supply.',
            },
            {
              question: 'What is the main difference between the long run and the short run in this course?',
              answerOutline:
                'In the long run prices and wages are flexible, so output is set by labour, capital and technology and money affects only prices. In the short run prices and wages are sticky, so changes in spending change output and employment.',
            },
          ],
        },
        {
          slug: 'gdp-three-ways',
          title: 'GDP: spending, income and value added',
          summary:
            'What gross domestic product counts and what it does not, and why adding up spending, adding up incomes and adding up value added give the same total.',
          estimatedMinutes: 110,
          objectives: [
            'State the definition of GDP and apply each part of it',
            'Compute GDP by the expenditure approach $Y = C + I + G + NX$',
            'Compute GDP by value added and explain why intermediate goods are excluded',
            'Explain why total spending equals total income using the circular flow',
            'Classify transactions as counted or not counted in GDP',
          ],
          concepts: [
            'Gross domestic product',
            'Final versus intermediate goods',
            'Value added',
            'Consumption, investment, government purchases, net exports',
            'Transfer payments',
            'Circular flow of income',
            'Gross domestic income and the statistical discrepancy',
            'GDP versus GNP',
          ],
          explanation: `**Gross domestic product (GDP)** is the market value of all final goods and services produced within a country in a given period. Each phrase does work. *Market value* lets you add apples to haircuts by using prices. *Final* goods are sold to their last user; counting the flour and the bread would count the flour twice. *Produced* means new output: a used car sold this year was counted when it was made. *Within a country* means location, not nationality (GNP counts what a country's residents produce anywhere).

**Value added.** A farmer grows wheat and sells it for USD 1.00. A miller turns it into flour sold for USD 1.80, and a baker sells the bread for USD 3.00. Value added at each stage is sales minus purchased inputs: USD 1.00 + 0.80 + 1.20 = USD 3.00, exactly the price of the final good.

**The expenditure approach** sorts final buyers into four groups:

$$
Y = C + I + G + NX, \\qquad NX = X - M.
$$

- $C$, consumption: household spending on goods and services.
- $I$, investment: new equipment, structures, software, new housing and the change in inventories. Buying shares is not investment in this sense; it is a financial transaction.
- $G$, government purchases of goods and services. Transfers such as Social Security payments are excluded, because nothing is produced in exchange; they show up when the recipients spend them.
- $NX$, net exports. Imports are subtracted because they are already inside $C$, $I$ and $G$ but were produced abroad.

In Q3 2026 US nominal GDP was running at USD 33.0 trillion a year. Consumption was 67.6% of it, investment 18.6%, government purchases 17.5%, and net exports −3.7% (exports 11.4%, imports 15.1%), according to BEA data on FRED as of 8 November 2026.

**The income approach.** Every dollar spent on a final good is somebody's income: wages, profits, rent, interest, plus taxes on production and depreciation. In the **circular flow**, households sell labour and capital to firms and spend the income on firms' output, so total spending equals total income. BEA publishes the income side as gross domestic income (GDI). In practice GDP and GDI differ by a *statistical discrepancy*, because they are built from different source data; some economists average the two.

A common pitfall: GDP measures production, not sales or wealth. A house built in 2020 and sold in 2026 adds only the estate agent's fee to 2026 GDP.`,
          resources: [
            ostx('6-1-measuring-the-size-of-the-economy-gross-domestic-product', 'Measuring the size of the economy: GDP', 'The expenditure components and what is excluded, with US data.', true),
            mru('gdp', 'gdp-national-spending-factor-income-approach', 'GDP: the national spending and factor income approaches', 'A 7-minute video on why spending equals income.'),
            { title: 'Gross Domestic Product (latest release)', url: 'https://www.bea.gov/data/gdp/gross-domestic-product', type: 'dataset', cost: 'free', provider: 'US Bureau of Economic Analysis', note: 'The official release, with the components table. Look at the "Real GDP" and "Current-dollar GDP" lines.' },
          ],
          exercises: [
            {
              slug: 'expenditure-gdp',
              title: 'GDP from the spending side',
              prompt:
                'An economy has consumption USD 700 billion, investment USD 200 billion (including a USD 20 billion rise in inventories), government purchases USD 250 billion, government transfer payments USD 120 billion, exports USD 150 billion and imports USD 180 billion. Compute GDP, net exports and the share of each component in GDP.',
              kind: 'problem',
              difficulty: 1,
              hint: 'Transfers are not purchases. GDP = 700 + 200 + 250 + (150 − 180) = USD 1,120 billion; NX = −30; shares 62.5%, 17.9%, 22.3%, −2.7%.',
            },
            {
              slug: 'value-added-chain',
              title: 'Value added in a supply chain',
              prompt:
                'A mine sells iron ore to a steel mill for USD 300. The mill sells steel to a car maker for USD 1,000. The car maker also buys USD 2,000 of parts from a supplier (whose own inputs are negligible) and sells the car to a household for USD 6,000. Compute the value added at each stage and show that it sums to the final sale. What would you get if you wrongly added all four sales?',
              kind: 'problem',
              difficulty: 2,
              hint: 'Mine 300, mill 700, parts supplier 2,000, car maker 6,000 − 1,000 − 2,000 = 3,000. Total 6,000. Adding all sales gives 9,300, which double counts the steel, ore and parts.',
            },
            {
              slug: 'in-or-out',
              title: 'In GDP or not?',
              prompt:
                'For each item say whether it adds to this year\'s US GDP, which component it enters, and why: (a) you buy a 2019 car from a neighbour; (b) a firm buys a new US-made robot; (c) you buy 10 shares of a company; (d) the government pays a Social Security benefit; (e) you buy a phone assembled in China; (f) a new house is built and not yet sold; (g) you paint your own living room.',
              kind: 'problem',
              difficulty: 2,
              hint: '(a) No, not new production (any dealer margin would count). (b) Yes, I. (c) No, financial. (d) No, transfer. (e) Adds to C and subtracts the same in M, so zero, except the US retail and transport margin. (f) Yes, residential investment. (g) No, non-market work.',
            },
          ],
          selfAssessment: [
            {
              question: 'Why must total spending on final goods equal total income in the economy?',
              answerOutline:
                'Every payment for a final good is received by someone as wages, profit, rent, interest or taxes on production (plus depreciation). Spending and income are the same flow seen from the two sides of each sale.',
            },
            {
              question: 'Why are imports subtracted in Y = C + I + G + NX?',
              answerOutline:
                'Consumption, investment and government purchases include spending on foreign-made goods. Subtracting imports removes production that happened abroad, so Y measures domestic production only.',
            },
            {
              question: 'Is buying a newly issued corporate bond investment in the GDP sense?',
              answerOutline:
                'No. It is a financial transaction that moves funds. Investment in GDP is spending on new capital goods, structures, housing and inventories. The firm\'s later purchase of machines with the funds is investment.',
            },
          ],
        },
        {
          slug: 'real-gdp-and-the-deflator',
          title: 'Real versus nominal GDP, the deflator and growth rates',
          summary:
            'Separate changes in quantities from changes in prices: real GDP at constant prices, the GDP deflator, and growth rates measured the way BEA reports them.',
          estimatedMinutes: 110,
          objectives: [
            'Compute nominal and real GDP for a small economy with a base year',
            'Compute the GDP deflator and the inflation rate it implies',
            'Compute growth rates, and convert a quarterly change to an annualised rate',
            'Explain in words why BEA uses chained dollars',
            'Read FRED series and their units correctly',
          ],
          concepts: [
            'Nominal GDP (current dollars)',
            'Real GDP (constant prices)',
            'Base year',
            'GDP deflator',
            'Growth rate and annualised rate',
            'Chain-weighted (chained) dollars',
            'Seasonally adjusted annual rate',
          ],
          explanation: `**Nominal GDP** values output at the prices of the year it is produced. It rises if we make more or if prices go up. **Real GDP** values every year's output at the prices of one **base year**, so it changes only when quantities change.

**Worked example.** An economy makes pizzas and laptops.

| Year | Pizzas | Price | Laptops | Price |
|---|---|---|---|---|
| 1 (base) | 100 | 10 | 20 | 1,000 |
| 2 | 110 | 12 | 22 | 900 |

Nominal GDP is USD 21,000 in year 1 (1,000 + 20,000) and USD 21,120 in year 2 (1,320 + 19,800), a rise of 0.57%. Real GDP in year 2 at year-1 prices is 1,100 + 22,000 = USD 23,100, so real growth is $23{,}100/21{,}000 - 1 = 10\\%$. Production grew a lot; prices, on average, fell.

The **GDP deflator** measures that price change:

$$
\\text{deflator} = \\frac{\\text{nominal GDP}}{\\text{real GDP}}\\times 100 = \\frac{21{,}120}{23{,}100}\\times 100 = 91.4,
$$

so the price level fell by 8.6%. The pieces fit together: $(1 + \\text{nominal growth}) = (1 + \\text{real growth})(1 + \\text{inflation})$, here $1.0057 = 1.10 \\times 0.914$. For small rates, nominal growth is roughly real growth plus inflation.

**Chained dollars.** A fixed base year gives too much weight to goods whose prices have since fallen, such as computers. BEA instead links each year to the next using prices from both years, then expresses the result in "chained 2017 dollars". You do not need the formula; just read the units.

**Real data.** FRED's GDPC1 is real GDP in billions of chained 2017 dollars at a **seasonally adjusted annual rate**: each quarter's output, corrected for regular seasonal patterns and multiplied by four. Real GDP rose from 24,408 in Q2 2026 to 24,611 in Q3 2026, a quarterly change of 0.83%. BEA reports the **annualised** rate, what the change would be if it continued for a year:

$$
(1.0083)^4 - 1 \\approx 3.4\\%.
$$

The deflator in Q3 2026 was 134.1 (2017 = 100), equal to nominal GDP of 33,010 divided by real GDP of 24,611, times 100 (BEA data on FRED, as of 8 November 2026). A common mistake is comparing an annualised quarterly rate with a year-over-year rate; FRED lets you choose either under "Units".`,
          resources: [
            ostx('6-2-adjusting-nominal-values-to-real-values', 'Adjusting nominal values to real values', 'The deflator and base years, worked with US data.', true),
            mru('gdp', 'real-versus-nominal-gdp', 'Real versus nominal GDP', 'A short video with a worked example.'),
            fred('GDPDEF', 'GDP Implicit Price Deflator', 'Compare its year-over-year change with CPI inflation in the next module.'),
          ],
          exercises: [
            {
              slug: 'three-goods',
              title: 'Real GDP and the deflator with three goods',
              prompt:
                'Year 1 (base): 50 haircuts at USD 20, 200 coffees at USD 3, 10 bicycles at USD 400. Year 2: 55 haircuts at USD 22, 210 coffees at USD 3.30, 9 bicycles at USD 420. Compute nominal GDP in both years, real GDP in year 2 at year-1 prices, real growth, nominal growth, and the deflator for year 2.',
              kind: 'problem',
              difficulty: 1,
              hint: 'Nominal: year 1 = 1,000 + 600 + 4,000 = 5,600; year 2 = 1,210 + 693 + 3,780 = 5,683. Real year 2 = 1,100 + 630 + 3,600 = 5,330. Real growth −4.82%, nominal growth +1.48%, deflator 106.6.',
            },
            {
              slug: 'annualise',
              title: 'Annualise and compare',
              prompt:
                'Real GDP grows 0.5% in one quarter. (a) What annualised rate does BEA report? (b) If the next three quarters grow 0.2%, 0.9% and 0.4%, what is the year-over-year growth from the start? (c) Explain why the four annualised rates do not average to the year-over-year rate exactly.',
              kind: 'problem',
              difficulty: 2,
              hint: '(a) 1.005^4 − 1 = 2.02%. (b) 1.005 × 1.002 × 1.009 × 1.004 − 1 = 2.01%. (c) Compounding: growth rates multiply, they do not add.',
            },
            {
              slug: 'fred-real-nominal',
              title: 'Nominal and real GDP in FRED',
              prompt:
                'Plot GDP (nominal) and GDPC1 (real) on one FRED graph from 2000. Read both in 2017 and explain why they are equal then. Then add a line for GDP divided by GDPC1 times 100 using FRED\'s formula box (series a and b) and compare it with GDPDEF. Write three sentences on what the gap between the two GDP lines shows.',
              kind: 'data-analysis',
              difficulty: 2,
              hint: 'In the base year real and nominal coincide by construction. In FRED, "Add Line" then "Edit Line" lets you write the formula (a/b)*100.',
            },
          ],
          selfAssessment: [
            {
              question: 'Nominal GDP rose 5% and the deflator rose 3%. Roughly how much did real GDP grow?',
              answerOutline: 'About 2%. Exactly, 1.05 / 1.03 − 1 = 1.94%.',
            },
            {
              question: 'Why can real GDP grow while nominal GDP falls?',
              answerOutline:
                'If prices fall faster than quantities rise, the value at current prices falls even though more is produced. The deflator falls by more than real output rises.',
            },
            {
              question: 'What does "seasonally adjusted annual rate" mean for a quarterly GDP number?',
              answerOutline:
                'Regular seasonal swings (holiday shopping, harvests) are removed, and the quarter\'s output is scaled to a yearly amount (times four), so quarters can be compared with each other and with annual figures.',
            },
          ],
        },
        {
          slug: 'what-gdp-misses',
          title: 'GDP per person, comparisons across countries, and what GDP misses',
          summary:
            'GDP per person and purchasing power parity let you compare living standards; non-market work, leisure, the environment and the distribution of income are reasons not to stop there.',
          estimatedMinutes: 90,
          objectives: [
            'Compute GDP per person and compare countries using purchasing power parity',
            'List what GDP leaves out and in which direction each omission biases comparisons',
            'Explain why mean income can rise while median income does not',
            'Weigh GDP against broader measures of well-being',
          ],
          concepts: [
            'GDP per capita',
            'Purchasing power parity (PPP)',
            'Non-market production',
            'Underground economy',
            'Leisure',
            'Environmental depletion',
            'Distribution: mean versus median',
            'Human Development Index',
          ],
          explanation: `GDP is a measure of production, and production per person is a reasonable first guess at a country's material living standard. Divide by population to get **GDP per capita**.

**Comparing countries.** Converting Indian rupees to dollars at the market exchange rate understates India's living standard, because haircuts, rent and food are much cheaper there. **Purchasing power parity (PPP)** values every country's output at a common set of prices. In World Bank data (PPP, constant 2021 international dollars, accessed November 2026), GDP per person in 2025 was about 76,900 in the United States, 55,700 in South Korea, 25,100 in China, 10,000 in India and 8,100 in Nigeria. In 1990 the same figures were 44,400, 14,400, 1,700, 2,100 and 5,400. Module 3 asks why some of those gaps closed and others did not.

**What GDP leaves out.**

- *Non-market production.* Cooking at home, childcare by parents and volunteering are not counted, but the same work bought in a market is. Countries where more such work is done at home look poorer than they are.
- *The underground economy.* Cash work and illegal activity are partly missing.
- *Leisure.* Two countries with the same GDP per person, one working 1,400 hours a year and one 1,800, are not equally well off.
- *The environment.* Cutting down a forest raises GDP; the lost forest is not subtracted. Pollution can even raise GDP if it creates clean-up spending.
- *Quality and new goods.* A smartphone replaces a camera, a map and a music player; prices only partly capture that gain.
- *Distribution.* GDP per person is a mean. If income growth goes mostly to the top, the median household can stagnate while the mean rises.

**Why it is still used.** GDP per person correlates strongly with life expectancy, child survival, schooling and reported life satisfaction across countries, and it is measured consistently and often. Broader indexes such as the UN's **Human Development Index** (income, health and education) and the "Beyond GDP" work of the 2009 Stiglitz–Sen–Fitoussi commission add what GDP misses. The sensible position is to use GDP for what it measures, output, and to look at other indicators for health, inequality and the environment. Economists disagree mainly about how much weight to give those other indicators, not about whether they matter.`,
          resources: [
            ostx('6-5-how-well-gdp-measures-the-well-being-of-society', 'How well GDP measures the well-being of society', 'The standard list of omissions, briefly.', true),
            mru('gdp', 'gdp-per-capita-standard-of-living', 'GDP per capita and the standard of living', 'Why per-person output tracks many measures of well-being.'),
            { title: 'Economic Growth', url: 'https://ourworldindata.org/economic-growth', type: 'article', cost: 'free', provider: 'Our World in Data', note: 'Interactive charts of GDP per capita across countries and over centuries, with notes on PPP.' },
          ],
          exercises: [
            {
              slug: 'ppp-compare',
              title: 'Market rates versus PPP',
              prompt:
                'Country A has GDP of 50 trillion units of its currency and 1.4 billion people. The market exchange rate is 80 per US dollar, and a PPP conversion factor of 22 per international dollar. Compute GDP per person in US dollars at the market rate and in international dollars at PPP. Explain why the two differ and which is better for comparing living standards.',
              kind: 'problem',
              difficulty: 1,
              hint: 'Per person: 50e12 / 1.4e9 = 35,714 local units. Market: 446 dollars. PPP: 1,623 international dollars. PPP corrects for cheaper non-traded goods.',
            },
            {
              slug: 'world-bank-data',
              title: 'Five countries, two measures',
              prompt:
                'Using the World Bank Data site (indicator NY.GDP.PCAP.PP.KD) and its life expectancy indicator (SP.DYN.LE00.IN), record GDP per person at PPP and life expectancy for five countries of your choice in the latest year. Rank them on each measure. Where the rankings differ, offer one explanation drawn from the list of things GDP misses or from how health care is provided.',
              kind: 'data-analysis',
              difficulty: 2,
              hint: 'Search each indicator code on data.worldbank.org and use the country selector. Note the year of each figure.',
            },
            {
              slug: 'beyond-gdp',
              title: 'Argue both sides',
              prompt:
                'Write 200 words for and 200 words against the claim "Governments should target growth in GDP per person." Use at least three omissions from the lesson and at least one reason GDP remains useful.',
              kind: 'writing',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does comparing GDP per person at market exchange rates tend to understate the living standards of poorer countries?',
              answerOutline:
                'Non-traded goods and services such as rent, haircuts and food are much cheaper there. Market exchange rates reflect traded goods and capital flows, so they undervalue poorer countries\' output. PPP corrects for this.',
            },
            {
              question: 'Give one omission from GDP that makes rich countries look better off than they are, and one that makes them look worse off.',
              answerOutline:
                'Better off: environmental damage and long working hours are not subtracted. Worse off: quality improvements and new goods are only partly captured. Any reasoned pair earns credit.',
            },
            {
              question: 'How can GDP per person rise while the typical household\'s income stagnates?',
              answerOutline: 'GDP per person is a mean. If gains go mostly to high earners, the mean rises while the median barely moves.',
            },
          ],
        },
      ],
    },
    {
      slug: 'prices-and-jobs',
      title: 'Prices and Jobs',
      description:
        'How the consumer price index is built and where it goes wrong, why inflation is costly, and how indexing protects against it; then the labour force survey, the unemployment rate and its cousins, the types of unemployment and the natural rate.',
      lessons: [
        {
          slug: 'the-consumer-price-index',
          title: 'The consumer price index and the inflation rate',
          summary:
            'Price a fixed basket in two years and you have a price index. Build the CPI, compute inflation, compare the CPI with the PCE index the Fed targets, and convert dollars between years.',
          estimatedMinutes: 100,
          objectives: [
            'Compute a price index from a fixed basket and the inflation rate from the index',
            'Describe how BLS builds the CPI and what the basket contains',
            'Distinguish headline and core inflation, and the CPI from the PCE price index',
            'Convert a dollar amount from one year into another year\'s dollars',
          ],
          concepts: [
            'Price index',
            'Fixed basket (Laspeyres index)',
            'Inflation rate',
            'CPI-U',
            'Core inflation',
            'PCE price index',
            'Converting nominal to real dollars',
          ],
          explanation: `A **price index** prices the same **basket** of goods in different years and compares the cost with a base period. Suppose a typical household buys 4 pizzas and 10 gallons of petrol a month.

| | Pizza | Petrol | Cost of basket |
|---|---|---|---|
| Base year | USD 10 | USD 3 | 4 × 10 + 10 × 3 = USD 70 |
| Year 2 | USD 11 | USD 4 | 4 × 11 + 10 × 4 = USD 84 |

$$
\\text{index}_t = \\frac{\\text{cost of basket in year } t}{\\text{cost in base year}}\\times 100 = \\frac{84}{70}\\times 100 = 120,
$$

and the **inflation rate** is the percentage change in the index, here 20%. Between any two years, inflation is $(\\text{index}_2/\\text{index}_1 - 1)\\times 100$, not the difference in index points.

**The CPI.** The Bureau of Labor Statistics collects tens of thousands of prices a month in urban areas, weighted by spending shares from the Consumer Expenditure Survey. Shelter is the largest single weight, about a third of the index. The headline series, CPI-U, has 1982–84 = 100. In September 2026 it stood at 336.3 (seasonally adjusted, FRED series CPIAUCSL), 3.7% higher than a year earlier. **Core** CPI, which leaves out volatile food and energy prices, was up 2.6%. Core is not "what matters more"; it is a better guide to where inflation is heading, because food and energy prices often reverse.

**CPI versus PCE.** The Bureau of Economic Analysis publishes the **PCE price index**, built from consumer spending in GDP. It covers more (including spending made for households, such as employer-paid health insurance), and its weights update every period, so it lets consumers substitute between goods. It usually runs a little below the CPI. The Federal Reserve's 2% inflation goal is defined in PCE terms. In September 2026 PCE inflation was 3.6% and core PCE 3.1% (FRED: PCEPI, PCEPILFE).

**Converting dollars.** To express an old amount in today's dollars, scale by the ratio of indexes:

$$
\\text{value in 2025 dollars} = \\text{value in 1970}\\times\\frac{\\text{CPI}_{2025}}{\\text{CPI}_{1970}} = 10{,}000\\times\\frac{322.0}{38.8} \\approx 82{,}900,
$$

using annual averages of CPI-U (38.84 in 1970, 321.96 in 2025). A 1970 salary of USD 10,000 bought about what USD 82,900 bought in 2025. Note one gap in the record: the 2025 federal government shutdown stopped BLS from collecting October 2025 prices, so there is no October 2025 CPI, and FRED shows a blank.`,
          resources: [
            ostx('9-1-tracking-inflation', 'Tracking inflation', 'Basket indexes worked by hand, then the US CPI.', true),
            mru('inflation-and-quantity-theory-of-money', 'united-states-measure-inflation', 'How the United States measures inflation', 'A short video on the CPI and the basket.'),
            fred('CPIAUCSL', 'Consumer Price Index for All Urban Consumers: All Items', 'Set units to "Percent Change from Year Ago" to see inflation. Compare with PCEPI on the same graph.'),
          ],
          exercises: [
            {
              slug: 'build-an-index',
              title: 'Build a three-good index',
              prompt:
                'A student\'s monthly basket is 30 meals, 1 bus pass and 2 textbooks. Prices in 2024: meal USD 9, bus pass USD 60, textbook USD 120. In 2025: USD 9.50, USD 60 and USD 130. In 2026: USD 10, USD 66 and USD 125. With 2024 as the base (index 100), compute the index for each year and the inflation rate for 2025 and 2026.',
              kind: 'problem',
              difficulty: 1,
              hint: 'Costs: 2024 = 270 + 60 + 240 = 570; 2025 = 285 + 60 + 260 = 605; 2026 = 300 + 66 + 250 = 616. Index 100, 106.1, 108.1. Inflation 6.14% then 1.82%.',
            },
            {
              slug: 'then-and-now',
              title: 'Then and now',
              prompt:
                'Using annual average CPI-U (1980: 82.38, 2000: 172.19, 2025: 321.96), express (a) a USD 3.35 minimum wage in 1980 and (b) a USD 5.15 minimum wage in 2000 in 2025 dollars. Compare both with the federal minimum wage of USD 7.25, unchanged since 2009. What does the comparison show, and what does it leave out?',
              kind: 'problem',
              difficulty: 2,
              hint: '(a) 3.35 × 321.96 / 82.38 ≈ USD 13.09. (b) 5.15 × 321.96 / 172.19 ≈ USD 9.63. Many states set higher minimums, and the CPI may overstate inflation (next lesson).',
            },
            {
              slug: 'cpi-vs-pce',
              title: 'CPI and PCE inflation since 2019',
              prompt:
                'In FRED, plot CPIAUCSL and PCEPI as "Percent Change from Year Ago" from January 2019. Record each peak and its month. Compute the average gap between the two series over 2019 and over 2024. Give two reasons from the lesson why the CPI usually runs higher.',
              kind: 'data-analysis',
              difficulty: 2,
              hint: 'The 2022 peaks were about 9.0% (CPI, June 2022, seasonally adjusted series) and 7.2% (PCE, June 2022). Reasons: fixed-basket weights, different coverage and different weight on shelter.',
            },
          ],
          selfAssessment: [
            {
              question: 'The CPI goes from 250 to 260. What is the inflation rate, and why is "10%" wrong?',
              answerOutline: '260 / 250 − 1 = 4%. Ten is the change in index points, which depends on the level of the index, not a percentage.',
            },
            {
              question: 'Why does the Fed watch core inflation if households pay for food and energy?',
              answerOutline:
                'Food and energy prices are volatile and often reverse, so they say little about future inflation. Core is a better forecast of the trend that policy can affect. The Fed\'s target is still headline PCE inflation.',
            },
            {
              question: 'Name two differences between the CPI and the PCE price index.',
              answerOutline:
                'Coverage (PCE includes spending made on households\' behalf, such as employer health insurance); weights (PCE weights update each period, CPI uses a fixed basket updated yearly); source (BEA versus BLS). PCE usually runs lower.',
            },
          ],
        },
        {
          slug: 'cpi-biases-and-indexing',
          title: 'Biases in the CPI, real interest rates and indexing',
          summary:
            'Why a fixed-basket index overstates the rise in the cost of living, how much, what has been done about it, and how contracts, benefits and bonds are indexed to inflation.',
          estimatedMinutes: 100,
          objectives: [
            'Explain substitution, quality, new-goods and outlet bias, and the direction of each',
            'Compute a fixed-basket and a current-basket index and compare them',
            'State and use the Fisher equation for real interest rates, ex ante and ex post',
            'Explain how Social Security benefits, tax brackets and TIPS are indexed',
          ],
          concepts: [
            'Substitution bias',
            'Quality change and hedonic adjustment',
            'New-goods and outlet bias',
            'Chained CPI (C-CPI-U)',
            'Fisher equation',
            'Ex ante versus ex post real rate',
            'Cost-of-living adjustment (COLA)',
            'Treasury Inflation-Protected Securities (TIPS)',
          ],
          explanation: `A fixed-basket index answers a narrow question: how much more does *last year's* basket cost? Households do not keep buying last year's basket, so the CPI tends to overstate the rise in the cost of living.

- **Substitution bias.** When apples get dearer, people buy more oranges. A fixed basket ignores the switch.
- **Quality change.** A car that costs 5% more but is safer and lasts longer is not 5% dearer in a meaningful sense. BLS uses *hedonic* methods to strip out quality for some goods, but the correction is imperfect.
- **New goods.** A new product enters the basket only after its price has often fallen a lot.
- **Outlet bias.** A shift to discount stores and online shopping lowers what households actually pay.

In 1996 the Boskin Commission estimated that the CPI overstated inflation by about 1.1 percentage points a year (range 0.8 to 1.6). BLS has since changed its methods, for example using geometric means within item categories from 1999, and later estimates put the remaining bias well below the Boskin figure, though there is no single agreed number. BLS also publishes a **chained CPI** (C-CPI-U) that allows substitution across categories. Since 2018, federal income tax brackets have been indexed to it.

**Fixed versus current basket.** Base year: apples USD 1, oranges USD 1, the household buys 10 of each (USD 20). Next year apples cost USD 2 and oranges USD 1, and it buys 5 apples and 20 oranges. The old basket now costs USD 30, up 50%. The new basket cost USD 25 at old prices and USD 30 at new prices, up 20%. The truth lies between, and chained indexes take a geometric average: $\\sqrt{1.5\\times1.2} - 1 \\approx 34\\%$.

**Real interest rates.** If you lend at a nominal rate $i$ while prices rise at $\\pi$, your purchasing power grows at about

$$
r \\approx i - \\pi \\quad (\\text{the Fisher equation}).
$$

The **ex ante** real rate uses expected inflation, the **ex post** rate uses what happened. Unexpected inflation transfers purchasing power from lenders to borrowers. On 5 November 2026 the 10-year Treasury yield was 4.84% and the 10-year breakeven inflation rate (the gap to inflation-protected bonds) was 2.23% (FRED: DGS10, T10YIE), implying an expected real return of about 2.6% a year.

**Indexing** ties payments to a price index. Social Security's cost-of-living adjustment uses CPI-W: benefits rose 5.9% in 2022, 8.7% in 2023, 3.2% in 2024, 2.5% in 2025 and 2.8% in 2026. **TIPS** principal rises with the CPI. Indexing protects against inflation but can also make inflation harder to stop when wages and prices chase each other.`,
          resources: [
            ostx('9-2-how-to-measure-changes-in-the-cost-of-living', 'How to measure changes in the cost of living', 'The biases, with the Boskin findings.', true),
            ostx('9-5-indexing-and-its-limitations', 'Indexing and its limitations', 'Indexed contracts, benefits and bonds, and their drawbacks.'),
            fred('T10YIE', '10-Year Breakeven Inflation Rate', 'The market\'s implied average inflation over the next ten years. Compare with DGS10.'),
          ],
          exercises: [
            {
              slug: 'laspeyres-paasche',
              title: 'Two baskets, two answers',
              prompt:
                'Base year: bread USD 2, cheese USD 5; the household buys 20 bread and 6 cheese. Next year: bread USD 2.20, cheese USD 7; it buys 24 bread and 4 cheese. Compute inflation using the base-year basket and using the current basket, then their geometric average. Which is biased up, and why?',
              kind: 'problem',
              difficulty: 2,
              hint: 'Base basket: 70 then 86, so +22.9%. Current basket: 68 at old prices, 80.8 at new, so +18.8%. Geometric average about +20.8%. The base basket ignores the switch away from dearer cheese.',
            },
            {
              slug: 'fisher',
              title: 'Real interest rates',
              prompt:
                'You take a 5-year loan at 6% expecting 2% inflation. (a) What real rate did you expect to pay? (b) Inflation turns out to be 5% a year. What real rate did you pay, and who gained? (c) A savings account pays 0.5% while inflation is 3.5%. What happens to the purchasing power of USD 10,000 after one year?',
              kind: 'problem',
              difficulty: 1,
              hint: '(a) About 4%. (b) About 1%; the borrower gained, the lender lost. (c) 10,000 × 1.005 / 1.035 ≈ USD 9,710 in today\'s purchasing power, a 2.9% loss.',
            },
            {
              slug: 'cola-check',
              title: 'Check a COLA',
              prompt:
                'The Social Security COLA compares average CPI-W in July to September of one year with the same months a year earlier. Find CPI-W (FRED: CWUR0000SA0) for July to September 2024 and 2025, compute the averages and the percentage change, and compare it with the 2.8% COLA announced on 24 October 2025.',
              kind: 'data-analysis',
              difficulty: 2,
              hint: 'Use the not seasonally adjusted series, which SSA uses. Round the percentage to one decimal place, as SSA does.',
            },
          ],
          selfAssessment: [
            {
              question: 'Explain substitution bias in two sentences.',
              answerOutline:
                'When a good becomes relatively dearer, consumers buy less of it and more of substitutes. A fixed basket assumes they keep buying the old quantities, so it overstates the rise in the cost of keeping living standards constant.',
            },
            {
              question: 'Inflation turns out higher than expected. Who gains: people with fixed-rate mortgages or banks that made the loans?',
              answerOutline: 'Borrowers with fixed-rate mortgages gain, because the ex post real rate is lower than they agreed to; lenders lose.',
            },
            {
              question: 'Why might economy-wide indexing make inflation harder to stop?',
              answerOutline:
                'If wages, benefits and contracts rise automatically with past inflation, costs keep rising even after the original cause has gone, which feeds further price rises.',
            },
          ],
        },
        {
          slug: 'costs-of-inflation',
          title: 'Why inflation is costly, and why central banks aim for 2%',
          summary:
            'Expected and unexpected inflation impose different costs; hyperinflation and deflation are the extremes. See why most central banks aim for low positive inflation rather than zero.',
          estimatedMinutes: 90,
          objectives: [
            'Separate the costs of expected inflation from those of unexpected inflation',
            'Compute the effect of inflation on an after-tax real return',
            'Explain why hyperinflation is so destructive and how it usually starts',
            'Explain the risks of deflation',
            'Give the arguments for a 2% target and the case some economists make for a different one',
          ],
          concepts: [
            'Expected versus unexpected inflation',
            'Shoe-leather and menu costs',
            'Relative-price confusion',
            'Taxes on nominal returns',
            'Redistribution between lenders and borrowers',
            'Hyperinflation',
            'Deflation and debt deflation',
            'Inflation target',
          ],
          explanation: `A common belief is that inflation makes people poorer because "prices rise faster than incomes". On average that is not how it works: prices are also someone's income, and in steady inflation wages rise too. The real costs are subtler, and they differ between inflation that is expected and inflation that is not.

**Costs of expected inflation.**

- *Shoe-leather costs*: effort spent holding less cash and moving money around. Small at 3%, large at 300%.
- *Menu costs*: changing prices often, and the misallocation when some prices are changed and others are not.
- *Relative-price confusion*: when all prices rise, it is harder to see which goods have really become scarce.
- *Tax distortions*: taxes are levied on nominal returns. With a 5% nominal interest rate, 3% inflation and a 25% tax, you keep 3.75% after tax, a real return of only 0.75%. With 2% nominal and zero inflation you would keep 1.5% after tax, all of it real. Inflation raises the effective tax on saving.

**Costs of unexpected inflation.** Contracts fixed in dollars are rewritten by surprise. Unexpectedly high inflation transfers wealth from lenders, savers in cash and people on fixed pensions to borrowers. It also adds uncertainty, which discourages long-term contracts and investment.

**Hyperinflation** usually starts when a government finances large deficits by printing money. In Germany in late 1923, prices doubled every few days. In Zimbabwe, Steve Hanke estimated monthly inflation at about 79.6 billion percent in mid-November 2008, before the currency was abandoned. Money stops working: people barter or use foreign currency.

**Deflation** is not the cure. Falling prices raise the real value of debts (Irving Fisher's *debt deflation* in the 1930s), and if people expect prices to fall they postpone spending. Because nominal interest rates cannot fall much below zero, deflation can also leave the real interest rate too high.

**Why 2%?** The Federal Reserve has had an explicit 2% goal for PCE inflation since January 2012, and most advanced-economy central banks aim at about 2%. The usual reasons: measured inflation overstates true inflation slightly (the previous lesson); a little inflation gives room to cut nominal rates in a recession; and it makes cuts in real wages possible without nominal pay cuts, which workers resist. Some economists, including Olivier Blanchard in 2010, have argued a 3–4% target would leave more room to cut rates; others reply that a higher target would be less credible and costlier. The debate is open, but no major central bank has changed its target.`,
          resources: [
            ostx('9-4-the-confusion-over-inflation', 'The confusion over inflation', 'Redistribution, blurred price signals and the costs of high inflation.', true),
            mru('inflation-and-quantity-theory-of-money', 'costs-of-inflation-price-confusion-money-illusion', 'Costs of inflation: price confusion and money illusion', 'A short video on why inflation blurs price signals.'),
            mru('inflation-and-quantity-theory-of-money', 'zimbabwe-currency-inflation', 'Zimbabwe and hyperinflation', 'What hyperinflation looks like from the inside.'),
          ],
          exercises: [
            {
              slug: 'after-tax-real-return',
              title: 'Inflation and the tax on saving',
              prompt:
                'The tax rate on interest is 30%. Compute the after-tax real return in three economies where the real pre-tax rate is 2% in each: inflation 0% (nominal 2%), inflation 4% (nominal 6%) and inflation 10% (nominal 12%). Explain the pattern.',
              kind: 'problem',
              difficulty: 2,
              hint: 'After-tax nominal: 1.4%, 4.2%, 8.4%. Subtract inflation: 1.4%, 0.2%, −1.6%. The tax falls on the inflation part of the nominal return too.',
            },
            {
              slug: 'who-wins',
              title: 'Who wins from surprise inflation?',
              prompt:
                'Inflation was expected to be 2% but is 7%. For each person, say whether they gain or lose, and why: (a) a retiree with a fixed private pension; (b) a household with a 30-year fixed-rate mortgage; (c) a worker whose three-year contract fixed wages at +2% a year; (d) a bank holding fixed-rate loans; (e) the federal government with long-term debt outstanding.',
              kind: 'problem',
              difficulty: 1,
              hint: 'Lose: a, c, d. Gain: b, e. The pattern is fixed nominal payments: receivers lose, payers gain.',
            },
            {
              slug: 'target-debate',
              title: 'Should the target be 2%?',
              prompt:
                'Write a 300-word memo to a central bank board weighing a move from a 2% to a 3% inflation target. Include at least two benefits and two costs, and say what evidence would change your recommendation.',
              kind: 'writing',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'Why doesn\'t steady, expected inflation simply make everyone poorer?',
              answerOutline:
                'Prices paid are also incomes received. In steady expected inflation, wages and other incomes rise with prices, so average real income is unchanged. The costs come from frictions, taxes on nominal returns and uncertainty.',
            },
            {
              question: 'What usually causes hyperinflation?',
              answerOutline: 'Large government deficits financed by creating money, often after war, collapse of tax revenue or loss of access to borrowing.',
            },
            {
              question: 'Give two reasons central banks prefer about 2% inflation to zero.',
              answerOutline:
                'Measured inflation overstates true inflation; positive inflation gives room to cut nominal rates in recessions; it lets real wages adjust without nominal cuts. Any two.',
            },
          ],
        },
        {
          slug: 'measuring-unemployment',
          title: 'Measuring unemployment and the labour force',
          summary:
            'Who counts as employed, unemployed or out of the labour force, how the unemployment and participation rates are computed, and the broader measures that catch what the headline rate misses.',
          estimatedMinutes: 100,
          objectives: [
            'Classify people as employed, unemployed or not in the labour force under BLS definitions',
            'Compute the unemployment rate, the participation rate and the employment-population ratio',
            'Explain discouraged workers and involuntary part-time work, and what U-6 adds',
            'Distinguish the household survey from the establishment survey',
            'Read the 2020 and 2025 episodes in the data critically',
          ],
          concepts: [
            'Current Population Survey (household survey)',
            'Employed, unemployed, not in the labour force',
            'Labour force',
            'Unemployment rate (U-3)',
            'Labour force participation rate',
            'Employment-population ratio',
            'Discouraged workers and U-6',
            'Establishment survey (payrolls)',
          ],
          explanation: `Each month BLS's **Current Population Survey** asks about 60,000 households what their members did in a reference week. Everyone aged 16 and over who is not in the military or an institution falls into one of three groups:

- **Employed**: did any paid work, even one hour, or was temporarily absent from a job.
- **Unemployed**: had no job, was available to work, and actively looked for work in the past four weeks (or is waiting to be recalled from a layoff).
- **Not in the labour force**: everyone else, such as students, retirees, full-time carers and people who have given up looking.

$$
\\text{labour force} = E + U, \\qquad u = \\frac{U}{E + U}\\times 100, \\qquad \\text{participation} = \\frac{E + U}{\\text{adult population}}\\times 100.
$$

In October 2026, 163.6 million people were employed and 7.1 million unemployed, so the labour force was 170.7 million and the unemployment rate was $7.07/170.7 = 4.1\\%$. The participation rate was 61.9% and the employment-population ratio 59.3% (BLS data on FRED: CE16OV, UNEMPLOY, UNRATE, CIVPART, EMRATIO).

**What the headline rate misses.** A **discouraged worker** who wants a job but has stopped looking is not counted as unemployed at all. Someone working 10 hours a week who wants 40 counts as employed. BLS's broader **U-6** measure adds marginally attached and involuntary part-time workers; it was 7.9% in October 2026. The participation rate falls for good reasons (an ageing population, more years in education) and bad ones (people giving up), so economists also watch **prime-age participation** (ages 25–54), 83.7% in October 2026.

**Two surveys.** The **establishment survey** asks employers how many people are on their payrolls. It gives the monthly "jobs added" headline and is larger and less noisy month to month, but it misses the self-employed. The two surveys sometimes disagree for months.

**Reading the data critically.** In April 2020 the unemployment rate jumped from 3.5% (February) to 14.8%, the highest since the series began in 1948, and participation fell from 63.3% to 60.1%. BLS noted that many people absent from work were misclassified as employed, so the true rate was higher. In October 2025 the 43-day federal government shutdown stopped the household survey; there is no unemployment rate for that month, the first gap since 1948. Always check the footnotes.`,
          resources: [
            ostx('8-1-how-economists-define-and-compute-unemployment-rate', 'How economists define and compute the unemployment rate', 'Definitions and the arithmetic, with a worked example.', true),
            { title: 'How the Government Measures Unemployment', url: 'https://www.bls.gov/cps/cps_htgm.htm', type: 'documentation', cost: 'free', provider: 'US Bureau of Labor Statistics', note: 'BLS\'s own explanation of the survey and the definitions. BLS blocks some scripts; open it in a browser.' },
            mru('unemployment-and-labor-force-participation', 'labor-force-unemployment-rate', 'Defining the labor force and the unemployment rate', 'A short video with the three categories.'),
          ],
          exercises: [
            {
              slug: 'compute-rates',
              title: 'Compute the rates',
              prompt:
                'An economy has an adult population of 250 million, 150 million employed and 8 million unemployed. (a) Compute the labour force, the unemployment rate, the participation rate and the employment-population ratio. (b) Two million unemployed people stop looking. Recompute all four and explain why the unemployment rate "improved".',
              kind: 'problem',
              difficulty: 1,
              hint: '(a) LF 158m, u = 5.06%, participation 63.2%, E/P 60.0%. (b) LF 156m, u = 3.85%, participation 62.4%, E/P unchanged at 60.0%.',
            },
            {
              slug: 'classify',
              title: 'Classify six people',
              prompt:
                'Classify each person under BLS rules: (a) a student working 8 paid hours a week; (b) a laid-off engineer who sent out applications last week; (c) a parent caring full-time for children who would take a job if offered but is not looking; (d) a worker on unpaid sick leave from a job; (e) a retiree; (f) someone who last searched seven weeks ago. Which of them would U-6 add?',
              kind: 'problem',
              difficulty: 1,
              hint: 'Employed: a, d. Unemployed: b. Not in the labour force: c, e, f. U-6 adds c and f if they are "marginally attached" (want work, available, searched in the past 12 months); the student is not involuntary part-time unless they want more hours.',
            },
            {
              slug: 'u3-u6',
              title: 'U-3, U-6 and participation since 2000',
              prompt:
                'In FRED, plot UNRATE and U6RATE from 2000 and CIVPART and LNS11300060 (prime-age participation) on a second graph. Describe the gap between U-3 and U-6 in recessions and expansions, and explain why overall participation fell after 2008 while prime-age participation recovered.',
              kind: 'data-analysis',
              difficulty: 2,
              hint: 'Overall participation peaked at 67.3% in early 2000. Think about the baby boomers reaching retirement age.',
            },
          ],
          selfAssessment: [
            {
              question: 'Can the unemployment rate fall while employment also falls? How?',
              answerOutline: 'Yes. If unemployed people leave the labour force (stop searching) faster than jobs are lost, U falls relative to the labour force while E also falls.',
            },
            {
              question: 'Why do economists watch prime-age participation and not just overall participation?',
              answerOutline:
                'Overall participation is pulled down by ageing and by more years in education, which are not signs of a weak labour market. Ages 25–54 are mostly past school and before retirement, so changes there say more about job availability.',
            },
            {
              question: 'What does U-6 include that U-3 does not?',
              answerOutline:
                'Marginally attached workers (including discouraged workers) and people working part time for economic reasons who want full-time work.',
            },
          ],
        },
        {
          slug: 'types-of-unemployment',
          title: 'Types of unemployment and the natural rate',
          summary:
            'Frictional, structural and cyclical unemployment, what sets the natural rate, how it is estimated, and Okun\'s law linking unemployment to the output gap.',
          estimatedMinutes: 100,
          objectives: [
            'Define frictional, structural and cyclical unemployment and give an example of each',
            'Explain the natural rate of unemployment and what raises or lowers it',
            'Compute cyclical unemployment from a natural-rate estimate',
            'Use Okun\'s law to connect unemployment and the output gap',
            'Explain why estimates of the natural rate are uncertain',
          ],
          concepts: [
            'Frictional unemployment',
            'Structural unemployment',
            'Cyclical unemployment',
            'Natural rate of unemployment',
            'Wage rigidity: minimum wages, unions, efficiency wages',
            'Unemployment insurance and job search',
            'Okun\'s law',
            'Potential output and the output gap',
          ],
          explanation: `Not all unemployment is the same, and the policy response depends on which kind it is.

- **Frictional**: the time it takes to match workers to jobs. A graduate searching for the right first job, or someone who moved city. Some is healthy: a good match is worth waiting for.
- **Structural**: a lasting mismatch between workers' skills or locations and the jobs on offer, or wages held above the market-clearing level. Coal miners after mines close, or workers whose skills were automated away.
- **Cyclical**: the extra unemployment in a recession, when total spending falls short and firms need fewer workers.

The **natural rate of unemployment**, $u^*$, is frictional plus structural unemployment: the rate the economy tends towards when output is at its potential. **Cyclical unemployment** is $u - u^*$, which can be negative in a boom.

What sets $u^*$? Anything that lengthens job search or keeps wages above market-clearing: minimum wages (how much is disputed, and the evidence is covered in Microeconomic Principles), unions, **efficiency wages** that firms pay to reduce quitting and shirking, the generosity and duration of unemployment insurance, and how quickly information about jobs spreads. Demographics matter too: young workers change jobs more often.

**Estimating it.** The natural rate is not observed. The Congressional Budget Office estimates it at about 4.4% for 2026, down from about 6.2% in the late 1970s (FRED: NROU). With unemployment at 4.1% in October 2026, cyclical unemployment was about $4.1 - 4.4 = -0.3$ points: a slightly tight labour market. Such estimates have been wrong before. In the late 1990s many economists put $u^*$ near 5.5–6%, yet unemployment fell to 3.8% in April 2000 without rising inflation, and to 3.5% in 2019. Economists disagree about how far below past estimates unemployment can go.

**Okun's law.** Arthur Okun found in the early 1960s that output and unemployment move together. A common modern version:

$$
\\frac{Y - Y^*}{Y^*}\\times 100 \\approx -2\\,(u - u^*),
$$

where $Y^*$ is **potential output**, what the economy produces at the natural rate. If unemployment is 1.5 points above the natural rate, output is about 3% below potential. The coefficient is a rough empirical average, not a law, and it has varied between about 1.5 and 3. In Q3 2026 CBO's potential output series implies real GDP was 1.7% above potential (FRED: GDPC1 and GDPPOT), a larger gap than Okun's law gives for −0.3 points of cyclical unemployment, a reminder that both estimates are uncertain.`,
          relatedLessons: ['microeconomic-principles/market-failure-and-government/labour-markets-and-minimum-wage'],
          resources: [
            ostx('8-4-what-causes-changes-in-unemployment-over-the-long-run', 'What causes changes in unemployment over the long run', 'The natural rate, its causes and how it has changed.', true),
            mru('unemployment-and-labor-force-participation', 'us-frictional-unemployment', 'Frictional unemployment', 'Why some unemployment is part of a healthy labour market. Follow with the structural unemployment video in the same unit.'),
            fred('NROU', 'Noncyclical Rate of Unemployment (CBO)', 'CBO\'s estimate of the natural rate. Plot it with UNRATE to see cyclical unemployment.'),
          ],
          exercises: [
            {
              slug: 'label-the-spell',
              title: 'Which type?',
              prompt:
                'Label each as frictional, structural or cyclical and explain: (a) a nurse leaves a job to look for one closer to home; (b) a steelworker loses a job when a plant closes and the region has no similar jobs; (c) a construction worker is laid off as housing starts fall in a recession; (d) a typist\'s job disappears as voice recognition improves; (e) a new graduate takes three months to find a first job.',
              kind: 'problem',
              difficulty: 1,
              hint: 'a frictional, b structural, c cyclical, d structural, e frictional. Some cases can be argued both ways; the reasoning matters.',
            },
            {
              slug: 'okun-arithmetic',
              title: 'Okun\'s law arithmetic',
              prompt:
                'Potential output is USD 25 trillion and the natural rate is 4.4%. (a) Unemployment rises to 6.9%. Use an Okun coefficient of 2 to estimate the output gap in percent and in dollars. (b) What unemployment rate would be consistent with output 1% above potential? (c) Repeat (a) with a coefficient of 1.5.',
              kind: 'problem',
              difficulty: 2,
              hint: '(a) Gap = −2 × 2.5 = −5%, about USD 1.25 trillion. (b) u = 4.4 − 0.5 = 3.9%. (c) −3.75%, about USD 0.94 trillion.',
            },
            {
              slug: 'cyclical-history',
              title: 'Cyclical unemployment since 1980',
              prompt:
                'In FRED, plot UNRATE minus NROU (use the formula a − b) from 1980. Find the peak of cyclical unemployment in each recession since 1980 and its date. Which recession had the largest peak, and which the shortest? Then plot (GDPC1/GDPPOT − 1) × 100 and check whether Okun\'s law with a coefficient of 2 roughly fits in 2009 and 2020.',
              kind: 'data-analysis',
              difficulty: 2,
              hint: 'NROU is quarterly and UNRATE monthly; set UNRATE\'s frequency to quarterly first. Peaks fall in 1982, 1992, 2003, 2009 and 2020.',
            },
          ],
          selfAssessment: [
            {
              question: 'Why can\'t stimulating spending permanently push unemployment below the natural rate?',
              answerOutline:
                'The natural rate is set by job matching, skills and wage-setting institutions, not by spending. Pushing below it creates labour shortages that raise wages and prices; as expectations adjust, unemployment returns to the natural rate with higher inflation (Module 9).',
            },
            {
              question: 'Give two policies that could lower the natural rate.',
              answerOutline:
                'Better job-matching services, training and retraining for displaced workers, reducing barriers to moving or occupational licensing, and reforms to how unemployment insurance affects search. Any two, with the mechanism.',
            },
            {
              question: 'Okun\'s law says what about a recession in which unemployment rises 3 points above the natural rate?',
              answerOutline: 'Output would be roughly 6% below potential (coefficient 2), with a wide range of uncertainty.',
            },
          ],
        },
      ],
      project: {
        slug: 'inflation-and-labour-dashboard',
        title: 'Your own inflation and labour market brief',
        description: `Build a one-page brief on US prices and jobs in a spreadsheet using FRED downloads. Download monthly CPIAUCSL, CPILFESL, PCEPI, PCEPILFE, UNRATE, U6RATE, CIVPART, LNS11300060 and the quarterly NROU from January 2000 to the latest month. Compute 12-month inflation rates yourself from the index levels (do not use FRED's transformation), check two of them against FRED's own "Percent Change from Year Ago", and build three charts: headline and core inflation for both indexes, U-3 against U-6, and cyclical unemployment (UNRATE minus NROU). Write a 400-word brief, dated, describing where inflation and unemployment stand relative to the Fed's 2% goal and CBO's natural rate, and noting any data gaps such as October 2025.`,
        deliverables: [
          'A spreadsheet with the raw downloads, your computed inflation rates and a check against FRED',
          'Three labelled charts with sources and dates',
          'A 400-word dated brief with at least five specific numbers, each with its month and series ID',
        ],
        estimatedHours: 4,
        stretchGoals: [
          'Add a "real wage" series: average hourly earnings (CES0500000003) deflated by the CPI, indexed to January 2020 = 100',
          'Compute three-month annualised core inflation and explain why it can tell a different story from the 12-month rate',
        ],
      },
    },
    {
      slug: 'long-run-growth',
      title: 'Long-Run Growth',
      description:
        'Why living standards double in some places every decade and barely move in others: compound growth, productivity and its sources, the Solow model of capital accumulation and convergence, and the role of institutions and ideas.',
      lessons: [
        {
          slug: 'compound-growth',
          title: 'Compound growth and the rule of 70',
          summary:
            'Small differences in growth rates become enormous differences in living standards. Compute growth rates, doubling times and catch-up dates, and read growth on a log scale.',
          estimatedMinutes: 90,
          objectives: [
            'Compute an average annual growth rate between two dates',
            'Use the rule of 70 and the exact doubling-time formula',
            'Project incomes forward and find when one economy would catch another',
            'Read a log-scale chart and explain why constant growth is a straight line on it',
          ],
          concepts: [
            'Growth rate of real GDP per person',
            'Compound growth $y_t = y_0(1+g)^t$',
            'Average annual (compound) growth rate',
            'Rule of 70',
            'Log (ratio) scale',
            'Catch-up',
          ],
          explanation: `Living standards are measured by **real GDP per person**, and over decades its growth rate matters more than anything else in this course. Growth compounds: income $y_0$ growing at rate $g$ for $t$ years becomes

$$
y_t = y_0(1+g)^t.
$$

**The average growth rate** between two dates inverts that formula: $g = (y_t/y_0)^{1/t} - 1$. US real GDP per person was 15,559 chained 2017 dollars in Q1 1950 and 71,751 in Q3 2026 (BEA data on FRED, series A939RX0Q048SBEA). That is 4.6 times as much over 76.5 years:

$$
g = 4.611^{1/76.5} - 1 \\approx 2.0\\% \\text{ a year}.
$$

**The rule of 70.** How long does it take income to double? Solve $(1+g)^t = 2$: $t = \\ln 2 / \\ln(1+g)$. Since $\\ln 2 \\approx 0.693$ and $\\ln(1+g)\\approx g$ for small $g$,

$$
t_{\\text{double}} \\approx \\frac{70}{\\text{growth rate in percent}}.
$$

At 2% a year income doubles in about 35 years, roughly once per working life. At 7% it doubles in 10 years, five times within a working life. At 1% it takes 70 years.

**Real cases.** In World Bank data at purchasing power parity (constant 2021 international dollars, accessed November 2026), China's GDP per person grew from about 1,700 in 1990 to 25,100 in 2025, an average of about 8.1% a year, while the United States grew from 44,400 to 76,900, about 1.6% a year. South Korea averaged about 3.9% and India about 4.5%; Nigeria about 1.2%. Projecting such rates forward is a thought experiment, not a forecast: fast growth usually slows as an economy catches up (the next two lessons explain why).

**Log scales.** On an ordinary scale, exponential growth looks like a hockey stick, and slow-growing economies look flat. On a **log scale** equal vertical distances are equal ratios, so a constant growth rate is a straight line whose slope is the growth rate. Most long-run charts use log scales for this reason.

\`\`\`interactive
growth-compound
{"names": ["United States", "China"], "y0": [44384, 1667], "g": [1.584, 8.052], "years": 35, "scale": "linear", "caption": "Each line starts in 1990 at its World Bank PPP value and grows at its 1990–2025 average rate, so year 35 reproduces 2025 (about 76,900 and 25,100). Dots mark each doubling: compare 70/g with the exact time. Switch to the log scale and both paths become straight lines. Then stretch the horizon to 100 years to see when China would catch up if both rates continued, and lower China's rate to 4% to see how sensitive that date is."}
\`\`\``,
          resources: [
            ostx('7-1-the-relatively-recent-arrival-of-economic-growth', 'The relatively recent arrival of economic growth', 'How rare sustained growth was before 1800.', true),
            mru('the-wealth-of-nations-and-economic-growth', 'growth-rate-real-gdp-per-capita', 'The growth rate of real GDP per capita', 'The rule of 70 with examples.'),
            fred('A939RX0Q048SBEA', 'Real gross domestic product per capita', 'Switch to a log scale under "Edit Graph" and look for changes in slope.'),
          ],
          exercises: [
            {
              slug: 'doubling',
              title: 'Doubling times',
              prompt:
                'For growth rates of 0.5%, 1%, 2%, 3.5%, 7% and 10%, compute the doubling time with the rule of 70 and exactly with $\\ln 2/\\ln(1+g)$. Where does the rule start to go wrong, and in which direction?',
              kind: 'problem',
              difficulty: 1,
              hint: 'Exact: 139.0, 69.7, 35.0, 20.1, 10.2, 7.27 years. The rule slightly understates at low rates and overstates at high rates (10% gives 7 versus 7.27).',
            },
            {
              slug: 'average-growth',
              title: 'Average growth from two numbers',
              prompt:
                'Using the World Bank PPP figures in the lesson, compute South Korea\'s and India\'s average annual growth from 1990 to 2025, to two decimal places. Then compute how many years India would need at its 1990–2025 rate to reach South Korea\'s 2025 level.',
              kind: 'problem',
              difficulty: 2,
              hint: 'Korea: (55,697/14,378)^(1/35) − 1 ≈ 3.95%. India: (10,039/2,140)^(1/35) − 1 ≈ 4.52%. Years: ln(55,697/10,039)/ln(1.0452) ≈ 38.8.',
            },
            {
              slug: 'log-chart',
              title: 'Read a log chart',
              prompt:
                'In FRED, plot A939RX0Q048SBEA from 1947 on a log scale. Identify two periods when the slope (growth rate) looked clearly different, estimate the average growth rate in each by reading values at the start and end, and say what was happening in the economy then.',
              kind: 'data-analysis',
              difficulty: 2,
              hint: 'Try 1960–1973 against 2007–2019. Compute (end/start)^(1/years) − 1 for each.',
            },
          ],
          selfAssessment: [
            {
              question: 'Why does a constant growth rate appear as a straight line on a log scale?',
              answerOutline:
                'log y_t = log y_0 + t log(1+g), which is linear in t with slope log(1+g). Equal vertical steps are equal ratios.',
            },
            {
              question: 'Two economies differ only in growth, 1% versus 3% a year. How different are their incomes after 70 years?',
              answerOutline: '1.03^70 / 1.01^70 ≈ 7.92 / 2.01 ≈ 3.9 times. The 3% economy has doubled about three times, the 1% economy once.',
            },
            {
              question: 'Why is extrapolating China\'s 1990–2025 growth rate for another 50 years a bad forecast?',
              answerOutline:
                'Catch-up growth slows as capital per worker rises and the gap to the technology frontier narrows (diminishing returns, convergence). Demographics and institutions also change.',
            },
          ],
        },
        {
          slug: 'productivity-and-its-sources',
          title: 'Productivity and its sources',
          summary:
            'Output per worker depends on physical capital, human capital, natural resources and technology. Use a production function and growth accounting to see how much each contributes.',
          estimatedMinutes: 100,
          objectives: [
            'Explain why labour productivity determines living standards in the long run',
            'Describe the four sources of productivity and give an example of each',
            'Use a per-worker production function and explain diminishing returns to capital',
            'Do a simple growth accounting calculation',
            'Describe the main eras of US productivity growth',
          ],
          concepts: [
            'Labour productivity (output per hour)',
            'Aggregate production function',
            'Physical capital',
            'Human capital',
            'Natural resources',
            'Technology and total factor productivity',
            'Diminishing returns to capital',
            'Growth accounting',
          ],
          explanation: `Real GDP per person can rise because more people work or work longer, but over long periods the main source is **labour productivity**: output per hour worked. An economy cannot consume more than it produces, so what a worker can produce in an hour sets the ceiling on living standards.

**The production function.** Economists summarise production as

$$
Y = A\\,F(K, H, L, N),
$$

where $Y$ is output, $L$ labour, $K$ **physical capital** (machines, buildings, roads, software), $H$ **human capital** (skills and knowledge from education, training and experience), $N$ **natural resources**, and $A$ **technology** in the broad sense: methods, management and organisation, often measured as *total factor productivity* (TFP). With constant returns to scale, doubling all inputs doubles output, so output per worker depends on inputs per worker:

$$
y = \\frac{Y}{L} = A\\,f(k, h, n), \\qquad k = K/L.
$$

**Diminishing returns.** Add more machines per worker while holding everything else fixed and output rises, but each extra machine adds less than the one before. A common form is $y = A k^{\\alpha}$ with $\\alpha \\approx 1/3$. Doubling $k$ from 1 to 2 raises $y$ by $2^{1/3} - 1 = 26\\%$, not 100%. This one assumption drives the Solow model in the next lesson.

**Growth accounting.** Taking growth rates of $y = A k^{\\alpha}$ gives

$$
g_y \\approx g_A + \\alpha\\, g_k.
$$

If output per worker grows 2% a year and capital per worker 3%, with $\\alpha = 1/3$, capital deepening contributes 1 point and TFP the remaining 1 point. Measured this way, TFP growth is a residual, the growth we cannot attribute to measured inputs; Moses Abramovitz called it "a measure of our ignorance".

**US productivity eras.** From BLS output per hour in the nonfarm business sector (FRED: OPHNFB, computed by this course), productivity grew about 2.8% a year from 1948 to 1973, about 1.4% from 1973 to 1995, about 3.0% from 1995 to 2004 as information technology spread, and about 1.5% from 2004 to 2019. Since late 2019 it has grown about 2.2% a year. Why productivity slowed after 1973 and after 2004 is still debated: candidates include energy prices, mismeasurement of new digital goods, slower diffusion of technology to most firms, and the idea that big new inventions have become harder to find. Whether artificial intelligence will lift the trend is the current version of this debate, and the data are not yet conclusive.`,
          resources: [
            ostx('7-2-labor-productivity-and-economic-growth', 'Labor productivity and economic growth', 'Productivity, the production function and US data.', true),
            ostx('7-3-components-of-economic-growth', 'Components of economic growth', 'Physical capital, human capital and technology, with growth accounting.'),
            fred('OPHNFB', 'Nonfarm Business Sector: Labor Productivity (Output per Hour)', 'Compute average growth rates for the eras in the lesson yourself.'),
          ],
          exercises: [
            {
              slug: 'diminishing',
              title: 'Diminishing returns in numbers',
              prompt:
                'With $y = 10k^{1/3}$, compute output per worker for $k$ = 1, 8, 27 and 64. Compute the extra output from each step and the extra output per extra unit of capital. What happens to the marginal product of capital as $k$ rises?',
              kind: 'problem',
              difficulty: 1,
              hint: 'y = 10, 20, 30, 40. Each step adds 10 but needs 7, 19, then 37 more units of capital, so the extra output per unit falls: 1.43, 0.53, 0.27.',
            },
            {
              slug: 'growth-accounting',
              title: 'Growth accounting',
              prompt:
                'Output per worker grows 3.2% a year, capital per worker 4.5% and human capital per worker 0.6%. Use $g_y = g_A + \\alpha g_k + (1-\\alpha) g_h$ with $\\alpha = 1/3$. How much growth comes from each source? What share is TFP?',
              kind: 'problem',
              difficulty: 2,
              hint: 'Capital 1.5 points, human capital 0.4, TFP 1.3 points, about 41% of the total.',
            },
            {
              slug: 'productivity-eras',
              title: 'Check the productivity eras',
              prompt:
                'Download OPHNFB from FRED. Compute the average annual growth rate for 1948–1973, 1973–1995, 1995–2004, 2004–2019 and 2019–latest using first-quarter values (or Q4 2019 for the last). Compare with the lesson. In 150 words, give the two explanations for the post-2004 slowdown you find most convincing and the evidence for each.',
              kind: 'data-analysis',
              difficulty: 2,
              hint: 'Use (end/start)^(1/years) − 1. Your figures should be within a tenth of a point of the lesson\'s if you use the same quarters; BLS revisions can move them slightly.',
            },
          ],
          selfAssessment: [
            {
              question: 'Why does productivity, not total hours worked, determine long-run living standards?',
              answerOutline:
                'Hours per person cannot rise without limit, and people value leisure. Sustained rises in output per person come from producing more per hour.',
            },
            {
              question: 'What does "diminishing returns to capital" mean, and why does it matter for growth?',
              answerOutline:
                'Each extra unit of capital per worker adds less output than the last. So accumulating capital alone cannot sustain growth forever; eventually technology must improve.',
            },
            {
              question: 'Why is TFP called a residual?',
              answerOutline:
                'It is computed as output growth minus the contributions of measured inputs. Anything not captured by measured capital and labour, including measurement error, ends up in it.',
            },
          ],
        },
        {
          slug: 'solow-and-convergence',
          title: 'The Solow model and convergence',
          summary:
            'Capital accumulates when investment exceeds depreciation, and diminishing returns bring it to a steady state. Saving raises the level of income but not its long-run growth; only technology does that. Poorer countries can grow faster by catching up.',
          estimatedMinutes: 120,
          objectives: [
            'Write the Solow capital accumulation equation and find the steady state',
            'Use the Solow diagram to show the effect of a higher saving rate',
            'Explain why saving changes the level but not the long-run growth rate of income',
            'Distinguish unconditional from conditional convergence and assess the evidence',
          ],
          concepts: [
            'Capital accumulation: investment minus depreciation',
            'Saving rate',
            'Depreciation',
            'Steady state',
            'Level effect versus growth effect',
            'Golden rule saving rate',
            'Conditional convergence',
            'Catch-up growth',
          ],
          explanation: `Robert Solow's model (1956) asks a simple question: can an economy grow forever by saving and building capital? Keep the per-worker production function $y = A k^{\\alpha}$ from the previous lesson. Each year households save a fraction $s$ of income, and saving pays for investment, $i = s\\,y$. Machines also wear out at rate $\\delta$. Capital per worker changes by investment minus depreciation:

$$
\\Delta k = s\\,A k^{\\alpha} - \\delta k.
$$

When $k$ is low, output per unit of capital is high, so investment exceeds depreciation and $k$ grows. Because of diminishing returns, investment rises more slowly than depreciation as $k$ grows, until the two meet at the **steady state** $k^*$, where $sAk^{*\\alpha} = \\delta k^*$:

$$
k^* = \\left(\\frac{sA}{\\delta}\\right)^{1/(1-\\alpha)}.
$$

**Worked example.** With $s = 0.25$, $\\delta = 0.05$, $A = 1$ and, for easy arithmetic, $\\alpha = 0.5$: $k^* = (0.25/0.05)^2 = 25$, output $y^* = \\sqrt{25} = 5$, and consumption $c^* = (1-s)y^* = 3.75$. Raise saving to $s = 0.5$ and $k^* = 100$, $y^* = 10$. Income doubles, but consumption only rises to 5, and growth stops again once the new steady state is reached.

\`\`\`interactive
growth-compound
{"mode": "solow", "s": 0.25, "delta": 0.05, "alpha": 0.5, "A": 1, "k0": 4, "caption": "Start at k = 4 and press Play: investment s·y is above depreciation δk, so k rises towards k* = 25 and y towards 5, with growth slowing each year. Now raise the saving rate to 0.5: k* jumps to 100 and growth restarts, then fades. Only raising productivity A keeps shifting the curves up. Set α to 0.33 and find the saving rate that maximises consumption c*."}
\`\`\`

**Three lessons from the model.**

1. A higher saving rate raises the *level* of income per person, not its long-run *growth rate*. Saving can deliver a burst of growth during the transition.
2. Sustained growth in income per person needs sustained growth in $A$: better technology and organisation. Growth accounting agrees.
3. More saving is not always better. Consumption peaks at the **golden rule** saving rate, which in this model equals $\\alpha$.

**Convergence.** The model predicts that a country far below its steady state grows fast. *Unconditional* convergence, all poor countries catching up, is not what the data show: many poor countries grew slowly for decades. *Conditional* convergence is better supported: countries grow faster the further they are below *their own* steady state, which depends on saving, education, technology and institutions. Japan after 1950, South Korea and later China fit this catch-up pattern; their growth slowed as they got closer to the frontier. Why some countries' steady states are so low is the subject of the next lesson.`,
          resources: [
            ostx('7-4-economic-convergence', 'Economic convergence', 'Arguments and evidence for and against convergence.', true),
            mru('growth-capital-accumulation-and-the-economics-of-ideas', 'solow-model-and-steady-state', 'The Solow model and the steady state', 'A clear graphical treatment. Continue with "The Solow model and ideas" in the same unit.'),
            core('09-uneven-development-01-chinas-economy-living-standards', 'Unit 9, Uneven development on a global scale', 'CORE\'s chapter on why some countries caught up and others did not, with China as a case.'),
          ],
          exercises: [
            {
              slug: 'solow-third',
              title: 'Steady state with a realistic capital share',
              prompt:
                'Let $y = k^{1/3}$, $s = 0.25$ and $\\delta = 0.05$. (a) Find $k^*$, $y^*$ and $c^*$. (b) Saving rises to 0.3. Find the new values and the percentage rise in $y^*$. (c) Starting from the old $k^*$, compute $k$ after one and two years at the new saving rate.',
              kind: 'problem',
              difficulty: 2,
              hint: '(a) k* = 5^1.5 ≈ 11.18, y* ≈ 2.236, c* ≈ 1.677. (b) k* = 6^1.5 ≈ 14.70, y* ≈ 2.449 (+9.5%), c* ≈ 1.715. (c) k1 = 11.18 + 0.3 × 2.236 − 0.05 × 11.18 ≈ 11.29; k2 ≈ 11.29 + 0.3 × 2.244 − 0.05 × 11.29 ≈ 11.40. Convergence is slow.',
            },
            {
              slug: 'golden-rule',
              title: 'Find the golden rule',
              prompt:
                'With $y = k^{\\alpha}$ and depreciation $\\delta$, show that steady-state consumption is $c^* = (1-s)(s/\\delta)^{\\alpha/(1-\\alpha)}$. Using the widget or a spreadsheet with $\\alpha = 1/3$ and $\\delta = 0.05$, tabulate $c^*$ for $s$ = 0.1, 0.2, 0.3, 0.4 and 0.5, and confirm that the maximum is near $s = 1/3$. Optional calculus: differentiate $\\ln c^*$ with respect to $s$ to prove that the maximum is at $s = \\alpha$.',
              kind: 'derivation',
              difficulty: 3,
              hint: 'c* values: about 1.27, 1.60, 1.71, 1.70, 1.58 (with δ = 0.05, so s/δ = 2, 4, 6, 8, 10). d ln c*/ds = −1/(1−s) + α/((1−α)s) = 0 gives s = α.',
            },
            {
              slug: 'convergence-data',
              title: 'Test convergence yourself',
              prompt:
                'Pick 15 countries from Our World in Data or the Penn World Table, including rich and poor ones from several regions. Record GDP per person in 1990 and the latest year, compute each country\'s average growth rate, and plot growth against the log of 1990 income. Is there a negative slope? Which countries are the biggest exceptions, and what might explain them?',
              kind: 'data-analysis',
              difficulty: 3,
              hint: 'Unconditional convergence predicts a clear negative slope. Expect a weak one, with East Asian economies above the line and some sub-Saharan African and Latin American economies below it.',
            },
          ],
          selfAssessment: [
            {
              question: 'Why does the Solow model predict that growth from capital accumulation alone eventually stops?',
              answerOutline:
                'Diminishing returns: each extra unit of capital adds less output and so less investment, while depreciation rises in proportion to k. Eventually investment only replaces worn-out capital.',
            },
            {
              question: 'A country raises its saving rate. What happens to the growth rate in the short run and the long run?',
              answerOutline: 'Growth rises temporarily during the transition to a higher steady state, then returns to the rate set by technology. The level of income is permanently higher.',
            },
            {
              question: 'What is conditional convergence?',
              answerOutline:
                'Countries grow faster the further they are below their own steady state, which depends on saving, education, technology and institutions. Poor countries with low steady states need not catch up.',
            },
          ],
        },
        {
          slug: 'institutions-and-ideas',
          title: 'Institutions, ideas and growth policy',
          summary:
            'Capital and technology are the proximate causes of growth. Why some societies accumulate them and others do not leads to institutions, geography and culture, and to the economics of ideas.',
          estimatedMinutes: 100,
          objectives: [
            'Distinguish proximate from fundamental causes of growth',
            'Explain how property rights, the rule of law and political institutions affect incentives to invest and innovate',
            'Describe the evidence from natural experiments such as North and South Korea',
            'Explain why ideas are non-rival and what that implies for growth and policy',
            'Weigh competing explanations and policies, including industrial policy',
          ],
          concepts: [
            'Proximate versus fundamental causes',
            'Property rights and the rule of law',
            'Inclusive versus extractive institutions',
            'Geography hypothesis',
            'Non-rival ideas',
            'Research and development, patents',
            'Openness to trade and investment',
            'Industrial policy',
          ],
          explanation: `Capital, human capital and technology are the **proximate** causes of growth: they tell you *how* a country got rich. The **fundamental** question is why some societies build up those inputs and others do not.

**Institutions.** People invest in machines, education and new businesses when they expect to keep the returns. Secure **property rights**, enforceable contracts, a **rule of law** that binds rulers as well as the ruled, and limits on expropriation make that expectation reasonable. Daron Acemoglu, Simon Johnson and James Robinson, who shared the 2024 Nobel memorial prize in economics, distinguish **inclusive** institutions, which spread economic and political power widely, from **extractive** ones, which channel resources to a narrow elite. They used the very different institutions European colonisers set up in different places as evidence that institutions cause prosperity, not the reverse; that evidence is influential but has been challenged on data and method.

**A natural experiment.** North and South Korea shared language, culture and geography until 1945. Under central planning in the North and markets (with heavy state guidance) in the South, the South became a high-income economy; estimates for the North are uncertain but put it many times poorer.

**Other explanations.** The *geography* hypothesis (Jeffrey Sachs and others) stresses disease burdens, access to the sea and agricultural conditions; it explains part of the pattern, though countries with similar geography often diverge. *Culture* (trust, attitudes to work) also has supporters and critics. Most economists see these as interacting rather than rival.

**The economics of ideas.** An idea, such as a vaccine formula or a sorting algorithm, is **non-rival**: one person's use does not stop another's. Paul Romer (Nobel 2018) showed that this makes growth in ideas self-sustaining, because a bigger world economy has more researchers and a bigger market to reward them. It also creates a policy dilemma. Patents reward invention by temporarily restricting use; too little protection weakens incentives, too much slows diffusion. Governments also fund basic research, which markets underprovide.

**Policy.** Policies with broad support include education and health, stable macroeconomic policy, openness to trade and foreign investment (the channel through which most countries get new technology), research funding, and infrastructure. **Industrial policy**, targeted support for chosen industries, is more contested: supporters point to South Korea and Taiwan, critics to many failures elsewhere and to the difficulty of picking winners. The 2022 CHIPS and Science Act revived the US debate.`,
          resources: [
            mru('the-wealth-of-nations-and-economic-growth', 'north-korea-and-south-korea-institutions', 'Institutions: North and South Korea', 'The natural experiment in a short video.'),
            mru('growth-capital-accumulation-and-the-economics-of-ideas', 'ideas-and-institutions', 'Ideas and institutions', 'Why non-rival ideas need the right incentives.'),
            ostx('19-2-improving-countries-standards-of-living', 'Improving countries\' standards of living', 'The policy menu for growth in low- and middle-income economies.', true),
          ],
          exercises: [
            {
              slug: 'proximate-fundamental',
              title: 'Proximate or fundamental?',
              prompt:
                'Classify each as a proximate or a fundamental cause of growth and explain how it works: (a) a rise in the share of adults with secondary education; (b) independent courts that enforce contracts against the state; (c) a malaria eradication campaign; (d) a rise in the investment rate; (e) a constitution that limits executive power.',
              kind: 'problem',
              difficulty: 1,
              hint: 'Proximate: a, d (and c works partly through human capital). Fundamental: b, e (and c if you treat disease environment as geography). Explaining the channel matters more than the label.',
            },
            {
              slug: 'two-countries',
              title: 'Tell the story of two countries',
              prompt:
                'Choose two countries that had similar GDP per person in 1960 but very different paths since (for example Ghana and South Korea, or Argentina and Spain). Using Our World in Data or the Maddison Project, chart both. In 400 words, explain the divergence using at least three ideas from this module, and say which explanation the evidence supports most and least.',
              kind: 'writing',
              difficulty: 3,
            },
            {
              slug: 'non-rival',
              title: 'Rival or non-rival?',
              prompt:
                'Classify as rival or non-rival and as excludable or not: (a) a patented drug formula; (b) a dose of the drug; (c) a published mathematical theorem; (d) a factory\'s production line; (e) a piece of open-source software. For two of them, explain what the classification implies for whether markets will produce enough of it.',
              kind: 'problem',
              difficulty: 2,
              hint: 'Non-rival: a, c, e. Rival: b, d. The formula is excludable while the patent lasts; the theorem and open-source software are not.',
            },
          ],
          selfAssessment: [
            {
              question: 'Why do secure property rights encourage growth?',
              answerOutline:
                'Investors, savers and innovators expect to keep the returns, so they invest in capital, skills and new ideas. Without them, expropriation risk discourages long-term investment.',
            },
            {
              question: 'Why is the Korean peninsula useful evidence about institutions?',
              answerOutline:
                'The two Koreas shared geography, culture and history until 1945, so the huge later income gap is hard to attribute to anything but their different economic and political institutions.',
            },
            {
              question: 'Why can ideas sustain growth when capital cannot?',
              answerOutline:
                'Ideas are non-rival, so they do not run into diminishing returns in the same way. One idea can raise the productivity of every worker who uses it, and new ideas build on old ones.',
            },
          ],
        },
      ],
      project: {
        slug: 'growth-comparison',
        title: 'A growth comparison of four economies',
        description: `Choose four economies with different growth histories since 1960 (for example one rich country, one fast catch-up economy, one that stalled and one you are curious about). Using the Penn World Table (real GDP per person, capital stock, human capital index, employment) or the Maddison Project and World Bank data, build a spreadsheet that computes average growth rates by decade, doubling times, and a simple growth accounting split $g_y = g_A + \\alpha g_k$ with $\\alpha = 1/3$. Present log-scale charts and a 600-word essay that uses the Solow model and the institutions lesson to explain the differences, stating clearly which conclusions the data support and which are speculation.`,
        deliverables: [
          'A spreadsheet with the downloaded data, source notes and every computed growth rate',
          'Log-scale charts of GDP per person for all four economies on one axis',
          'A growth accounting table by decade for at least two of the economies',
          'A 600-word essay with at least three cited sources',
        ],
        estimatedHours: 5,
        stretchGoals: [
          'Plot growth against initial income for all countries in the Penn World Table and fit a line to test convergence',
          'Repeat the growth accounting with alpha = 0.4 and say how much the TFP share changes',
        ],
      },
    },
    {
      slug: 'saving-investment-finance',
      title: 'Saving, Investment and the Financial System',
      description:
        'Where the funds for new capital come from: national saving, the market for loanable funds and the real interest rate, present value and bond prices, and the banks, bond markets and stock markets that connect savers with borrowers.',
      lessons: [
        {
          slug: 'loanable-funds',
          title: 'National saving and the market for loanable funds',
          summary:
            'In a closed economy saving equals investment. A supply-and-demand market for loanable funds sets the real interest rate, and shows how saving incentives, investment incentives and government deficits change it.',
          estimatedMinutes: 120,
          objectives: [
            'Derive the identity S = I from Y = C + I + G and split saving into private and public parts',
            'Draw and solve the market for loanable funds',
            'Analyse an investment tax credit, a saving incentive and a budget deficit in the model',
            'Compute how much investment a deficit crowds out, and say what determines the share',
            'State the model\'s limits: open economies, the zero lower bound and expectations',
          ],
          concepts: [
            'National saving',
            'Private saving $Y - T - C$',
            'Public saving $T - G$ (budget balance)',
            'Saving equals investment (closed economy)',
            'Market for loanable funds',
            'Real interest rate',
            'Crowding out',
          ],
          explanation: `**Saving equals investment.** In a closed economy (no trade), $Y = C + I + G$. **National saving** is income left after consumption and government purchases, $S = Y - C - G$, so

$$
S = I.
$$

Add and subtract taxes $T$ to split it: $S = \\underbrace{(Y - T - C)}_{\\text{private saving}} + \\underbrace{(T - G)}_{\\text{public saving}}$. A government deficit ($G > T$) is negative public saving. This is an accounting identity, true by definition. The **market for loanable funds** explains *how* it comes about.

**The market.** Savers supply funds; firms borrowing to buy capital demand them. The price is the **real interest rate** $r$. Supply slopes up (a higher return encourages saving, though in the data this effect is weak); demand slopes down (fewer investment projects earn more than a high $r$). Suppose, in billions of dollars with $r$ in percent,

$$
S = 200 + 40r, \\qquad I = 600 - 40r \\;\\Rightarrow\\; r^* = 5\\%,\\quad S = I = 400.
$$

**An investment tax credit** makes every project more profitable, shifting demand right by 80: $680 - 40r = 200 + 40r$ gives $r = 6\\%$ and $I = 440$. Investment rises by 40, not 80, because the higher rate also draws out more saving and discourages some projects.

**A budget deficit.** If the government borrows 80 more, national saving falls by 80 at every rate: $S = 120 + 40r$. Then $600 - 40r = 120 + 40r$ gives $r = 6\\%$ and $I = 360$. Private investment falls by 40: half the deficit is **crowded out** and half is met by more private saving. With steeper supply (saving that responds little to $r$) crowding out is closer to complete.

\`\`\`interactive
supply-demand
{"title": "The market for loanable funds", "demand": [15, 0.025], "supply": [-5, 0.025], "view": [0, 700, 0, 12], "shiftRange": 160, "xLabel": "USD bn", "yLabel": "Real interest rate r (%)", "demandLabel": "I (demand)", "supplyLabel": "S (supply)", "priceUnit": "%", "quantityUnit": "bn", "showSurplus": false, "showElasticity": false, "caption": "Investment demand is r = 15 − I/40 and saving supply r = −5 + S/40 (the lesson's S = 200 + 40r), so r* = 5% and 400 bn change hands. Set the supply shift to −80 for an 80 bn deficit: r rises to 6% and investment falls to 360, so half the deficit is crowded out. Reset, then set the demand shift to +80 for the investment tax credit."}
\`\`\`

**US data.** In Q3 2026 gross private domestic investment was 18.6% of GDP, the personal saving rate was 3.8% of disposable income (September 2026; it hit 31.8% in April 2020, when spending collapsed and relief payments arrived), and the federal deficit was about 6% of GDP (FRED: GPDI, PSAVERT; CBO). Public saving is strongly negative.

**Limits.** The US is an open economy: foreign saving fills part of the gap, which is why the trade deficit enters in Module 9. When interest rates are stuck near zero in a slump, extra government borrowing may crowd out little. And people may save more when deficits rise if they expect future taxes (Module 8). Treat the closed-economy model as the benchmark, not the whole story.`,
          resources: [
            ostx('4-2-demand-and-supply-in-financial-markets', 'Demand and supply in financial markets', 'Financial markets as supply and demand, with the interest rate as the price.', true),
            ostx('18-1-how-government-borrowing-affects-investment-and-the-trade-balance', 'How government borrowing affects investment and the trade balance', 'Crowding out, and the open-economy version you will meet in Module 9.'),
            mru('fiscal-policy', 'fiscal-policy-crowding-out', 'Fiscal policy and crowding out', 'A short video on the loanable funds diagram with a deficit.'),
          ],
          exercises: [
            {
              slug: 'national-saving',
              title: 'Saving from the accounts',
              prompt:
                'A closed economy has Y = 2,000, C = 1,300, G = 400 and T = 350. Compute national saving, private saving, public saving and investment. If G rises to 450 with Y, C and T unchanged, what happens to each?',
              kind: 'problem',
              difficulty: 1,
              hint: 'S = 300, private 350, public −50, I = 300. With G = 450: S = 250, public −100, private still 350, I = 250.',
            },
            {
              slug: 'solve-loanable-funds',
              title: 'Solve and shift the market',
              prompt:
                'Saving is $S = 100 + 50r$ and investment $I = 500 - 30r$ (billions, $r$ in percent). (a) Find $r^*$ and the quantity. (b) A deficit reduces national saving by 80 at every rate. Find the new equilibrium and how much investment is crowded out. (c) Repeat (b) if saving is $S = 100 + 10r$ in the original market, after first finding the original equilibrium. Explain the difference.',
              kind: 'problem',
              difficulty: 2,
              hint: '(a) r = 5%, 350. (b) 20 + 50r = 500 − 30r gives r = 6%, I = 320, so 30 of 80 crowded out. (c) Originally 100 + 10r = 500 − 30r gives r = 10%, 200; after, 20 + 10r = 500 − 30r gives r = 12%, I = 140, so 60 crowded out. Less responsive saving means more crowding out.',
            },
            {
              slug: 'saving-rate-fred',
              title: 'Saving and investment in the data',
              prompt:
                'Plot PSAVERT (personal saving rate) and GPDI divided by GDP (FRED formula a/b × 100) from 1960. Describe the long-run trend in each, the spike in 2020, and what happened to both in the 2008–09 recession. Explain why the 2020 spike in saving did not cause an investment boom that year.',
              kind: 'data-analysis',
              difficulty: 2,
              hint: 'In 2020 spending fell because shops were closed and incomes were supported by transfers; firms faced deep uncertainty. The loanable funds model assumes full employment, which did not hold.',
            },
          ],
          selfAssessment: [
            {
              question: 'Why is S = I an identity in a closed economy?',
              answerOutline: 'From Y = C + I + G, I = Y − C − G, which is the definition of national saving. It holds by accounting, whatever the interest rate.',
            },
            {
              question: 'A deficit rises by 100 billion. Why does investment usually fall by less than 100 billion in the loanable funds model?',
              answerOutline:
                'The higher real interest rate induces some extra private saving, so supply moves along its curve. Only part of the deficit displaces investment; the share depends on the slopes.',
            },
            {
              question: 'Give one reason the closed-economy loanable funds model may overstate crowding out in the US.',
              answerOutline:
                'Foreign saving can flow in (open economy); in a slump with rates near zero there is spare saving; or households may save more expecting future taxes.',
            },
          ],
        },
        {
          slug: 'present-value-and-bonds',
          title: 'Present value, interest rates and bond prices',
          summary:
            'A dollar today is worth more than a dollar next year. Discount future payments to value bonds, see why bond prices fall when interest rates rise, and read the yield curve.',
          estimatedMinutes: 110,
          objectives: [
            'Compute future value and present value with compound interest',
            'Price a coupon bond and a perpetuity from their cash flows',
            'Explain the inverse relation between bond prices and yields',
            'Describe the term structure of interest rates and credit risk',
            'Connect rising rates in 2022–23 to losses on long-term bonds',
          ],
          concepts: [
            'Future value and compounding',
            'Present value and discounting',
            'Coupon bond: coupon, face value, maturity',
            'Yield to maturity',
            'Price-yield inverse relation',
            'Perpetuity',
            'Term structure and the yield curve',
            'Credit (default) risk',
          ],
          explanation: `Money now can be invested to earn interest, so a payment in the future is worth less than the same payment today. At interest rate $i$, USD 100 today becomes $100(1+i)^n$ in $n$ years (its **future value**). Reverse it to find the **present value** of a future payment $F$:

$$
PV = \\frac{F}{(1+i)^n}.
$$

At 5%, USD 1,000 due in 10 years is worth $1{,}000/1.05^{10} = 613.91$ today. The longer the wait or the higher the rate, the lower the present value.

**Bonds.** A bond is an IOU. A 2-year bond with face value USD 1,000 and a 5% coupon pays USD 50 after one year and USD 1,050 after two. Its price is the present value of those payments at the market interest rate (its **yield**):

$$
P = \\frac{50}{1+i} + \\frac{1{,}050}{(1+i)^2}.
$$

At $i = 5\\%$, $P = 1{,}000$ exactly. If market rates rise to 6%, $P = 47.17 + 934.50 = 981.67$: nobody pays face value for a 5% coupon when new bonds pay 6%. If rates fall to 4%, $P = 1{,}018.86$. **Bond prices and yields move in opposite directions**, and the longer the bond, the bigger the price change for a given change in rates. A **perpetuity** paying $C$ forever is worth $C/i$, so doubling $i$ halves its price.

**Real and nominal again.** Discounting with a nominal rate values nominal payments; with a real rate, real ones. Long-term nominal yields contain expected inflation plus a real rate plus a premium for risk.

**The term structure.** Yields differ by maturity. The **yield curve** plots them for Treasury bonds from one month to 30 years. It usually slopes up, because investors want extra return for tying money up and bearing interest-rate risk, and long yields reflect expected future short rates. An *inverted* curve (short above long) has often preceded recessions, though the long inversion of 2022–24 was not followed by one. Yields also differ by **credit risk**: corporate bonds pay more than Treasuries because they may default.

**A real case.** The 10-year Treasury yield fell to 0.52% on 4 August 2020 and rose to 4.98% on 19 October 2023 (FRED: DGS10). Long bonds bought in 2020–21 lost a large part of their market value. Silicon Valley Bank held many such bonds funded by uninsured deposits; when it sold them at a loss in March 2023, depositors ran and the bank failed. On 5 November 2026 the 10-year yield was 4.84%.`,
          resources: [
            ostx('4-2-demand-and-supply-in-financial-markets', 'Demand and supply in financial markets', 'Interest rates as prices; read the section on the US credit card market as an example.', true),
            mru('savings-investment-and-the-financial-system', 'bond-market-definition', 'The bond market', 'Bond prices, yields and why they move inversely. Follow with "Office Hours: the bond market" in the same unit for worked problems.'),
            fred('DGS10', 'Market Yield on US Treasury Securities at 10-Year Constant Maturity', 'Plot it with DGS3MO to see the yield curve invert in 2022–24.'),
          ],
          exercises: [
            {
              slug: 'pv-practice',
              title: 'Present value practice',
              prompt:
                'At 4% interest, compute (a) the future value of USD 2,000 after 15 years; (b) the present value of USD 10,000 received in 20 years; (c) the present value of USD 1,000 a year for 3 years, first payment in one year; (d) the price of a perpetuity paying USD 60 a year. Then recompute (b) and (d) at 6%.',
              kind: 'problem',
              difficulty: 1,
              hint: '(a) 3,601.89. (b) 4,563.87. (c) 961.54 + 924.56 + 889.00 = 2,775.09. (d) 1,500. At 6%: (b) 3,118.05, (d) 1,000.',
            },
            {
              slug: 'bond-pricing',
              title: 'Price a bond when rates change',
              prompt:
                'A 10-year Treasury note has face value USD 1,000 and a 2% annual coupon, issued at par when the market yield was 2%. Market yields rise to 5%. Compute its new price (use a spreadsheet or the annuity formula). By what percentage did it fall? Compare with a 2-year 2% note under the same rise in yields.',
              kind: 'problem',
              difficulty: 2,
              hint: 'Price = 20 × (1 − 1.05^−10)/0.05 + 1,000/1.05^10 ≈ 154.43 + 613.91 = 768.35, a fall of about 23.2%. The 2-year note: 20/1.05 + 1,020/1.05^2 ≈ 944.22, a fall of about 5.6%.',
            },
            {
              slug: 'yield-curve',
              title: 'Read the yield curve',
              prompt:
                'In FRED, plot DGS10 minus DGS3MO (or use the ready-made series T10Y3M) from 1980. Mark each inversion and each NBER recession (FRED shades them). How many recessions were preceded by an inversion, and how long was the lead? Was there a false signal? Write 150 words on why an inversion might predict recessions.',
              kind: 'data-analysis',
              difficulty: 2,
              hint: 'Inversions before 1981, 1990, 2001, 2007 and 2019–20 (the last arguably a coincidence with the pandemic). The 2022–24 inversion was not followed by a recession through November 2026.',
            },
          ],
          selfAssessment: [
            {
              question: 'Why does a bond\'s price fall when market interest rates rise?',
              answerOutline:
                'Its payments are fixed. With higher rates, those payments are discounted more heavily, and new bonds offer more, so the old bond must sell for less to give a competitive yield.',
            },
            {
              question: 'Which loses more value when rates rise 1 point: a 2-year or a 30-year bond? Why?',
              answerOutline: 'The 30-year bond, because more of its payments are far in the future, where discounting compounds the effect of the higher rate.',
            },
            {
              question: 'What does an upward-sloping yield curve usually tell you?',
              answerOutline:
                'Investors expect short rates to stay the same or rise and require a term premium for holding longer bonds. It is the normal shape.',
            },
          ],
        },
        {
          slug: 'the-financial-system',
          title: 'Banks, bond markets and stock markets',
          summary:
            'How the financial system moves saving to investment, how stocks are valued, why diversification works, what the efficient markets hypothesis claims, and what happens when intermediaries fail.',
          estimatedMinutes: 100,
          objectives: [
            'Explain what financial intermediaries do and why they exist',
            'Value a stock as the present value of expected dividends',
            'Explain diversification and the difference between idiosyncratic and market risk',
            'State the efficient markets hypothesis and the main evidence for and against it',
            'Describe how the 2007–09 crisis was a failure of financial intermediation',
          ],
          concepts: [
            'Financial intermediary',
            'Direct versus indirect finance',
            'Maturity and liquidity transformation',
            'Equity (stock) versus debt (bond)',
            'Stock value as discounted dividends',
            'Diversification',
            'Efficient markets hypothesis',
            'Leverage and bank runs',
          ],
          explanation: `Savers and borrowers rarely find each other directly. The **financial system** links them, either through **direct finance** (a firm sells bonds or shares to investors) or through **financial intermediaries** such as banks, pension funds, insurers and mutual funds, which collect savings and lend or invest them.

**What intermediaries do.** A bank takes short-term deposits that savers can withdraw at any time and makes long-term loans to firms and homebuyers (**maturity transformation**). It screens borrowers and monitors them, which individual savers cannot do cheaply, and pools many loans so that a few defaults do not ruin anyone. Mutual and index funds let a small saver own a slice of hundreds of firms.

**Debt and equity.** A bond promises fixed payments; a share of **stock** (equity) is a claim on the firm's profits after creditors are paid. Shareholders bear more risk and, on average, have earned higher returns. In principle a stock is worth the present value of its expected future dividends. If a share is expected to pay USD 4 next year, with dividends growing 3% a year forever, and investors require an 8% return, its value is

$$
P = \\frac{D_1}{i - g} = \\frac{4}{0.08 - 0.03} = 80.
$$

Small changes in expected growth or the required return move this a lot: at 7% the price would be 100.

**Diversification.** Holding many stocks averages away **idiosyncratic risk** (one firm's bad luck) but not **market risk**, which hits all firms in a recession. That is why diversified funds are the standard advice.

**Efficient markets.** The **efficient markets hypothesis** says prices reflect all public information, so you cannot consistently beat the market after costs without taking more risk. The evidence is strong that most professional fund managers fail to beat low-cost index funds over long periods. Critics, including behavioural economists such as Robert Shiller, point to bubbles (technology stocks in 1999–2000, US house prices before 2006) and to predictable patterns in long-run returns. Eugene Fama and Shiller shared the 2013 Nobel prize for work on both sides.

**When intermediation fails.** Intermediaries are **leveraged**: they borrow most of what they invest. In 2007–09 falling house prices caused losses on mortgage securities; investment banks and other lenders funded with short-term borrowing faced runs, Lehman Brothers failed on 15 September 2008, and credit to sound borrowers dried up. The crisis turned a housing downturn into the deepest US recession since the 1930s, and it is why bank capital rules were tightened afterwards.`,
          resources: [
            mru('savings-investment-and-the-financial-system', 'banks-financial-intermediaries', 'Banks as financial intermediaries', 'What banks do and why. The same unit has videos on stock markets and on the 2008 failure of intermediaries.'),
            mru('personal-finance', 'beat-the-market-efficient-market-hypothesis', 'Can you beat the market? The efficient markets hypothesis', 'The case for index funds, briefly.'),
            core('06-financial-sector-01-how-do-you-live-if-you-dont-work', 'Unit 6, The financial sector: debt, money and financial markets', 'CORE\'s treatment of banks, money and financial crises.'),
          ],
          exercises: [
            {
              slug: 'dividend-discount',
              title: 'Value a stock',
              prompt:
                'A firm will pay a USD 2.50 dividend next year, growing 4% a year forever. (a) Value the share at a 9% required return. (b) Recompute at 8% and 10%. (c) Recompute at 9% with 5% growth. (d) What do your answers suggest about why stock prices are volatile?',
              kind: 'problem',
              difficulty: 2,
              hint: '(a) 2.50/0.05 = 50. (b) 62.50 and 41.67. (c) 62.50. Small changes in expected growth or required returns cause large price changes.',
            },
            {
              slug: 'diversify',
              title: 'Diversification by simulation',
              prompt:
                'In a spreadsheet, simulate 20 years of annual returns for 30 stocks. Give each stock a return equal to a common market return (mean 7%, standard deviation 16%) plus its own independent shock (mean 0, standard deviation 30%). Compare the standard deviation of one stock\'s returns with that of an equally weighted portfolio of all 30. Explain why the portfolio\'s risk does not fall to zero.',
              kind: 'simulation',
              difficulty: 2,
              hint: 'Use NORM.INV(RAND(), mean, sd). One stock: about sqrt(16² + 30²) ≈ 34%. Portfolio: about sqrt(16² + 30²/30) ≈ 17%. The market component cannot be diversified away.',
            },
            {
              slug: 'crisis-chain',
              title: 'Trace a financial crisis',
              prompt:
                'In 300 words, trace the chain from falling US house prices in 2006–07 to the fall in business investment in 2009. Use the terms leverage, maturity transformation, bank run and credit crunch, and name one policy response and one regulatory change that followed.',
              kind: 'writing',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why can a bank lend long-term while letting depositors withdraw at any time?',
              answerOutline:
                'Normally only a small share of depositors withdraw at once, so the bank keeps a fraction as reserves and liquid assets. It works as long as depositors trust it; deposit insurance and the central bank as lender of last resort support that trust.',
            },
            {
              question: 'What does diversification remove, and what can it not remove?',
              answerOutline: 'It removes idiosyncratic (firm-specific) risk; it cannot remove market-wide risk.',
            },
            {
              question: 'Give one piece of evidence for and one against the efficient markets hypothesis.',
              answerOutline:
                'For: most active fund managers underperform index funds after fees over long periods. Against: episodes such as the late-1990s technology bubble and predictable long-horizon returns.',
            },
          ],
        },
      ],
      project: {
        slug: 'bond-and-saving-calculator',
        title: 'A bond calculator and a loanable funds model',
        description: `Build a spreadsheet with two sheets. The first prices any coupon bond from its face value, coupon rate, maturity and yield, plots price against yield from 0% to 10% for a 2-year, a 10-year and a 30-year bond on one chart, and computes the percentage price change for a 1-point rise in yield. Check it against the lesson's 2-year example (981.67 at 6%). The second solves a linear loanable funds market from four inputs (intercepts and slopes) and two shocks (a change in the deficit and an investment incentive), reporting the real rate, saving, investment and the share of a deficit crowded out. Write 300 words explaining what each chart shows and where the closed-economy model would fail for the US today.`,
        deliverables: [
          'A bond pricing sheet with the three-maturity price-yield chart and a check against the lesson',
          'A loanable funds sheet that reproduces the lesson\'s 5% and 6% equilibria',
          'A 300-word explanation',
        ],
        estimatedHours: 3,
        stretchGoals: ['Add Treasury yields for one recent date from FRED (DGS3MO, DGS2, DGS10, DGS30) and plot the yield curve'],
      },
    },
    {
      slug: 'money-and-banking',
      title: 'Money and Banking',
      description:
        'What money is and how it is measured, how the Federal Reserve is organised, how banks create money (the textbook multiplier and why the modern ample-reserves system works differently), and the quantity theory linking money growth to inflation in the long run.',
      lessons: [
        {
          slug: 'what-money-is',
          title: 'What money is and how it is measured',
          summary:
            'Money is whatever is generally accepted in payment. Its three functions, the move from commodity to fiat money, the M1 and M2 measures (including the 2020 redefinition), and where cryptocurrencies and stablecoins fit.',
          estimatedMinutes: 80,
          objectives: [
            'State the three functions of money and explain why barter is costly',
            'Distinguish commodity money from fiat money',
            'Define M1 and M2 and say what each contains',
            'Explain the May 2020 change in M1 and why it matters when you read the data',
            'Assess whether cryptocurrencies and stablecoins function as money',
          ],
          concepts: [
            'Medium of exchange',
            'Unit of account',
            'Store of value',
            'Double coincidence of wants',
            'Commodity versus fiat money',
            'M1 and M2',
            'Liquidity',
            'Stablecoins and cryptocurrency',
          ],
          explanation: `**Money** is the set of assets people regularly use to buy goods and services. It is not the same as wealth or income: a house is wealth but not money, and your salary is income that arrives as money.

**Three functions.**

1. **Medium of exchange.** Without money, trade needs a **double coincidence of wants**: the plumber who wants bread must find a baker who needs plumbing. Money removes that search.
2. **Unit of account.** Prices, wages and debts are stated in dollars, so comparing a car with a holiday is easy.
3. **Store of value.** Money carries purchasing power into the future, though inflation erodes it and other assets store value better.

**Commodity and fiat money.** Gold and silver coins were **commodity money**, with value of their own. Modern currencies are **fiat money**: paper and electronic balances that have value because the government declares them legal tender, accepts them for taxes, and because everyone expects everyone else to accept them. The US left the last link to gold in 1971.

**Measuring money.** The Federal Reserve publishes two main aggregates, ordered by **liquidity** (how easily an asset can be spent):

- **M1**: currency held by the public, demand deposits and other liquid deposits.
- **M2**: M1 plus small time deposits (under USD 100,000) and retail money market fund shares.

In September 2026 M1 was USD 20.1 trillion and M2 USD 23.4 trillion (FRED: M1SL, M2SL). Those M1 figures look odd if you compare them with 2019, when M1 was about USD 4 trillion. On 24 April 2020 the Fed removed the limit of six transfers a month on savings deposits, which made them as spendable as checking accounts. From May 2020 the Fed counts savings deposits in M1, which added about USD 11.2 trillion to M1 at once; M2 was unchanged. Always read the notes before comparing a series across a break like this.

**Credit cards** are not money: they are a way to borrow, and the card balance is paid later with money from a deposit.

**Cryptocurrencies** such as bitcoin work as a medium of exchange for few purchases, are rarely a unit of account, and their prices are far too volatile to be a reliable store of value. **Stablecoins** try to fix that by holding dollar assets so that each coin is redeemable for one dollar; in July 2025 Congress passed the GENIUS Act, a federal framework for payment stablecoins. Economists disagree about whether stablecoins will become a large part of the payment system and about the risks of runs on them, much like the bank runs in the next lessons.`,
          resources: [
            ostx('14-1-defining-money-by-its-functions', 'Defining money by its functions', 'The three functions and commodity versus fiat money.', true),
            ostx('14-2-measuring-money-currency-m1-and-m2', 'Measuring money: currency, M1 and M2', 'The definitions, with recent US magnitudes.'),
            { title: 'Money Stock Measures (H.6): Technical Q&As', url: 'https://www.federalreserve.gov/releases/h6/h6_technical_qa.htm', type: 'documentation', cost: 'free', provider: 'Federal Reserve Board', note: 'The Fed\'s explanation of the May 2020 change to M1.' },
          ],
          exercises: [
            {
              slug: 'which-function',
              title: 'Which function?',
              prompt:
                'For each, say which function of money is involved, or that it is not money at all: (a) a menu lists prices in dollars; (b) you keep USD 200 in a drawer for emergencies; (c) you pay for groceries with a debit card; (d) you pay with a credit card; (e) a shop in a country with high inflation prices goods in US dollars; (f) you hold shares in an index fund.',
              kind: 'problem',
              difficulty: 1,
              hint: '(a) unit of account; (b) store of value; (c) medium of exchange (the deposit is the money); (d) a loan, settled later with money; (e) the dollar as unit of account; (f) wealth, not money.',
            },
            {
              slug: 'm1-m2',
              title: 'Count M1 and M2',
              prompt:
                'An economy has currency held by the public 2.3, checking deposits 5.0, savings deposits 11.0, small time deposits 0.9, retail money market funds 1.3, large time deposits 2.0 and bank reserves 3.0 (trillions). Compute M1 and M2 under the post-2020 definitions. Why are bank reserves not in either?',
              kind: 'problem',
              difficulty: 1,
              hint: 'M1 = 2.3 + 5.0 + 11.0 = 18.3. M2 = 18.3 + 0.9 + 1.3 = 20.5. Large time deposits are excluded. Reserves are held by banks at the Fed, not by the public.',
            },
            {
              slug: 'series-break',
              title: 'Spot a series break',
              prompt:
                'Plot M1SL and M2SL from 2015 in FRED. Locate the break in M1 and measure the jump. Then plot both as "Percent Change from Year Ago" and explain why the M1 growth rate for 2020–21 is misleading while M2\'s is not. What was M2\'s peak growth rate, and when?',
              kind: 'data-analysis',
              difficulty: 2,
              hint: 'The jump is in May 2020. M2 growth peaked at about 26.8% in February 2021.',
            },
          ],
          selfAssessment: [
            {
              question: 'Why does fiat money have value?',
              answerOutline:
                'Because people expect others to accept it, the government accepts it for taxes and makes it legal tender, and the central bank keeps its supply limited. Its value rests on trust, not on its material.',
            },
            {
              question: 'Why did M1 jump in May 2020 without any surge in spending?',
              answerOutline:
                'A definitional change: savings deposits were reclassified into M1 after the Fed removed the six-transfer limit. Nothing about behaviour changed that month.',
            },
            {
              question: 'Which function of money does bitcoin perform worst, and why?',
              answerOutline: 'Store of value and unit of account, because its price is highly volatile; few goods are priced in it.',
            },
          ],
        },
        {
          slug: 'the-federal-reserve',
          title: 'The Federal Reserve and central banking',
          summary:
            'How the Fed is organised, what Congress asks it to do, what is on its balance sheet, why it is independent, and how it acts as lender of last resort.',
          estimatedMinutes: 90,
          objectives: [
            'Describe the structure of the Federal Reserve System and the FOMC',
            'State the Fed\'s dual mandate',
            'Read the main items on a central bank balance sheet',
            'Explain the case for central bank independence and the main criticisms',
            'Explain the lender-of-last-resort role with a historical example',
          ],
          concepts: [
            'Board of Governors',
            'Regional Federal Reserve Banks',
            'Federal Open Market Committee (FOMC)',
            'Dual mandate',
            'Central bank balance sheet',
            'Bank reserves',
            'Central bank independence',
            'Lender of last resort',
          ],
          explanation: `The **Federal Reserve System**, created in 1913, is the US central bank. It has three parts:

- The **Board of Governors** in Washington: seven governors appointed by the President and confirmed by the Senate for 14-year terms. The chair serves a four-year term; Kevin Warsh was sworn in as chair on 22 May 2026, succeeding Jerome Powell (chair 2018–2026).
- Twelve regional **Federal Reserve Banks** (New York, Chicago, San Francisco and so on), which supervise banks, run payment systems and do research.
- The **Federal Open Market Committee (FOMC)**, which sets monetary policy: the seven governors, the president of the New York Fed, and four of the other eleven presidents in rotation. It meets eight times a year.

**The mandate.** Congress has directed the Fed since 1977 to promote "maximum employment, stable prices, and moderate long-term interest rates". The first two are called the **dual mandate**. The Fed interprets stable prices as 2% inflation in the PCE index.

**The balance sheet.** Like any bank, the Fed has assets and liabilities.

| Assets | Liabilities |
|---|---|
| Treasury securities | Currency in circulation |
| Mortgage-backed securities | Bank reserves (banks' deposits at the Fed) |
| Loans to banks | Treasury's account; reverse repurchase agreements |

When the Fed buys a bond from a bank, it pays by crediting the bank's reserve account: it creates reserves. Total assets were USD 0.88 trillion in December 2007, rose to USD 8.97 trillion in April 2022 after crisis-era and pandemic bond purchases, and stood at USD 6.75 trillion on 4 November 2026 (FRED: WALCL).

**Independence.** Monetary policy acts with long lags, and politicians facing elections may prefer low rates now and inflation later. Delegating policy to an independent central bank with a clear goal is meant to make low inflation credible. Cross-country evidence from the 1980s and 1990s linked independence with lower inflation, though the causation is debated. Critics argue that independence lets unelected officials make choices with large distributional effects, and since 2025 the President's public pressure on the Fed and attempts to remove a governor have made independence a live political question.

**Lender of last resort.** Because banks borrow short and lend long, even a sound bank can fail if depositors panic. The central bank can lend against good collateral to stop a run spreading, as Walter Bagehot argued in 1873. The Fed lent heavily in 2008 and created emergency facilities in March 2020 and again in March 2023, after Silicon Valley Bank failed. Other major central banks include the European Central Bank, the Bank of England and the Bank of Japan, each with its own mandate.`,
          resources: [
            ostx('15-1-the-federal-reserve-banking-system-and-central-banks', 'The Federal Reserve banking system and central banks', 'Structure and roles, briefly.', true),
            { title: 'The Fed Explained: What the Central Bank Does', url: 'https://www.federalreserve.gov/aboutthefed/pf.htm', type: 'documentation', cost: 'free', provider: 'Federal Reserve Board', note: 'The Fed\'s own guide. Read the overview and the monetary policy chapter.' },
            mru('monetary-policy-and-the-federal-reserve', 'federal-reserve-lender-last-resort-financial-crisis', 'The Fed as lender of last resort', 'How a central bank stops a bank run, with 2008 as the example.'),
          ],
          exercises: [
            {
              slug: 'fomc-votes',
              title: 'Who votes?',
              prompt:
                'Using the Federal Reserve\'s website, list the current FOMC voting members for this year and the presidents who rotate in next year. How many voters are appointed by the President and confirmed by the Senate, and how many are chosen by regional bank boards? Write 100 words on what this structure is meant to achieve.',
              kind: 'reading',
              difficulty: 1,
              hint: 'Seven governors are appointed; the five bank presidents are chosen by their banks\' boards with Board of Governors approval. The New York Fed president always votes.',
            },
            {
              slug: 'balance-sheet-t',
              title: 'T-accounts for the Fed',
              prompt:
                'Draw T-accounts for the Fed and for a commercial bank for each event: (a) the Fed buys USD 10 billion of Treasury bonds from the bank; (b) the bank\'s customers withdraw USD 2 billion in cash; (c) the Fed lends USD 5 billion to the bank through the discount window. After all three, by how much have bank reserves changed?',
              kind: 'problem',
              difficulty: 2,
              hint: '(a) Fed assets +10 Treasuries, liabilities +10 reserves; the bank swaps 10 bonds for 10 reserves. (b) The bank\'s reserves fall 2 as currency rises 2 (Fed liabilities change mix). (c) Fed assets +5 loans, reserves +5. Net reserves +13.',
            },
            {
              slug: 'balance-sheet-history',
              title: 'Twenty years of the Fed\'s balance sheet',
              prompt:
                'Plot WALCL (total assets) and WRESBAL (reserve balances) from 2007. Mark the start of each round of large-scale asset purchases and the periods of runoff. Describe in 200 words how reserves moved with total assets and what else on the liability side changed.',
              kind: 'data-analysis',
              difficulty: 2,
              hint: 'Purchases: late 2008–2010, 2010–11, 2012–14, March 2020–early 2022. Runoff: 2017–19 and June 2022 to 1 December 2025. Also look at RRPONTSYD (reverse repos), which absorbed much of the 2021–22 growth.',
            },
          ],
          selfAssessment: [
            {
              question: 'What are the two parts of the dual mandate, and how does the Fed define price stability?',
              answerOutline: 'Maximum employment and stable prices; stable prices as 2% inflation in the PCE price index over the longer run.',
            },
            {
              question: 'When the Fed buys a Treasury bond from a bank, what happens to reserves?',
              answerOutline: 'Reserves rise by the amount of the purchase: the Fed pays by crediting the bank\'s reserve account, creating new reserves.',
            },
            {
              question: 'Give the main argument for central bank independence and one criticism.',
              answerOutline:
                'For: it avoids pressure to stimulate before elections at the cost of later inflation, making low inflation credible. Against: it gives unelected officials large power over distribution and outcomes, with limited accountability.',
            },
          ],
        },
        {
          slug: 'banks-and-money-creation',
          title: 'How banks create money: the textbook multiplier and the ample-reserves system',
          summary:
            'Step a deposit through a chain of banks to see the textbook money multiplier 1/rr, then see why, with zero reserve requirements and trillions of dollars of reserves, US banks today are not constrained that way.',
          estimatedMinutes: 120,
          objectives: [
            'Record deposits, reserves and loans in a bank\'s T-account',
            'Trace deposit expansion through a chain of banks and compute the simple multiplier',
            'Explain how currency holding and excess reserves shrink the multiplier',
            'Explain why the simple multiplier does not describe the US since 2008, and what does constrain lending',
            'Explain bank runs and the role of deposit insurance',
          ],
          concepts: [
            'Bank balance sheet (T-account)',
            'Reserves and the reserve ratio',
            'Fractional-reserve banking',
            'Simple money multiplier $1/rr$',
            'Leakages: currency and excess reserves',
            'Ample-reserves regime',
            'Capital requirements',
            'Bank run and deposit insurance',
          ],
          explanation: `A bank's **balance sheet** lists what it owns (assets: reserves, loans, securities) and what it owes (liabilities: deposits, borrowing), with the difference being the owners' **capital**. **Reserves** are cash in the vault plus the bank's deposit at the Fed. Because only a fraction of deposits is withdrawn on any day, banks hold only a fraction as reserves: **fractional-reserve banking**.

**The textbook story.** Suppose the required reserve ratio is $rr = 10\\%$, banks hold no extra reserves, and the public holds no extra cash. Someone deposits USD 1,000 of newly created reserves in Bank 1. Bank 1 keeps 100 and lends 900. The borrower spends it, and the seller deposits 900 in Bank 2, which keeps 90 and lends 810, and so on. Total deposits are a geometric series:

$$
1{,}000\\,(1 + 0.9 + 0.9^2 + \\cdots) = \\frac{1{,}000}{1 - 0.9} = \\frac{1{,}000}{rr} = 10{,}000.
$$

The **simple money multiplier** is $1/rr = 10$. If the public keeps a share $c$ of each loan as cash, or banks keep extra reserves $e$, each round is smaller and the multiplier falls to $1/[1 - (1 - rr - e)(1 - c)]$.

\`\`\`interactive
money-creation
{"deposit": 1000, "rr": 0.1, "banks": 25, "unit": "USD", "caption": "Press Next bank a few times: Bank 1 keeps 100 and lends 900, Bank 2 keeps 90 and lends 810. Play to 25 banks and the total deposits approach 10,000 = 1,000/0.1. Now set the cash share c to 0.2: the limit falls to about 3,571, a multiplier of 3.57. Then set rr to 0.02 and c back to 0 and see how large the textbook multiplier becomes, and read the note on why the US does not work like this today."}
\`\`\`

**Why the US does not work like this now.** The story assumes reserves are scarce, so that the Fed controls the money supply by controlling reserves. Since 2008 the Fed has supplied reserves in abundance: about USD 3.0 trillion in September 2026, against USD 43.5 billion in December 2007 (FRED: TOTRESNS). The reserve requirement was cut to 0% on 26 March 2020. In this **ample-reserves** system banks are not short of reserves; what limits lending is the supply of creditworthy borrowers, the profitability of loans relative to the interest the Fed pays on reserves, and **capital requirements**, which require banks to fund a minimum share of their assets with owners' equity. When a bank makes a loan it credits the borrower's account, creating a deposit at that moment, as the Bank of England explained in 2014. The ratio of M2 to the monetary base, the "multiplier" seen in data, fell from about 8.9 in December 2007 to about 4.3 in September 2026.

**Runs and insurance.** If depositors fear a bank cannot pay, each has an incentive to withdraw first, which can make the fear self-fulfilling. Federal deposit insurance (up to USD 250,000 per depositor per bank) removes the incentive for insured depositors. Silicon Valley Bank's March 2023 run was driven by uninsured deposits.`,
          resources: [
            ostx('14-4-how-banks-create-money', 'How banks create money', 'The T-account version of the deposit chain.', true),
            { title: 'Teaching the Linkage Between Banks and the Fed: R.I.P. Money Multiplier', url: 'https://research.stlouisfed.org/publications/page1-econ/2021/09/17/teaching-the-linkage-between-banks-and-the-fed-r-i-p-money-multiplier', type: 'article', cost: 'free', provider: 'Federal Reserve Bank of St. Louis (Page One Economics)', note: 'Why the multiplier model no longer describes the US, written for teachers and students.' },
            { title: 'Money creation in the modern economy', url: 'https://www.bankofengland.co.uk/quarterly-bulletin/2014/q1/money-creation-in-the-modern-economy', type: 'article', cost: 'free', provider: 'Bank of England Quarterly Bulletin (McLeay, Radia and Thomas, 2014)', note: 'The central bank\'s own explanation that loans create deposits.' },
          ],
          exercises: [
            {
              slug: 'deposit-chain',
              title: 'Run the chain by hand',
              prompt:
                'With a 20% reserve requirement and no leakages, a new deposit of USD 5,000 arrives. (a) Fill in deposits, required reserves and loans for the first four banks. (b) What are total deposits, total reserves and total loans in the limit? (c) Recompute the limit for total deposits if the public holds 25% of every loan as cash.',
              kind: 'problem',
              difficulty: 1,
              hint: '(a) Deposits 5,000, 4,000, 3,200, 2,560; reserves 1,000, 800, 640, 512; loans 4,000, 3,200, 2,560, 2,048. (b) 25,000 deposits, 5,000 reserves, 20,000 loans. (c) Ratio per round 0.8 × 0.75 = 0.6, so 5,000/0.4 = 12,500.',
            },
            {
              slug: 'what-limits-lending',
              title: 'What limits a bank today?',
              prompt:
                'A bank has USD 100 of capital, USD 900 of deposits, and assets of USD 400 in reserves and USD 600 in loans. Regulators require capital of at least 8% of loans (a simplified risk weighting with reserves at zero weight). (a) How much more can it lend if it funds new loans by creating deposits? (b) Why is the reserve requirement irrelevant here? (c) What would make the bank choose to lend less than the maximum?',
              kind: 'problem',
              difficulty: 2,
              hint: '(a) Capital of 100 supports loans of 100/0.08 = 1,250, so 650 more. (b) The requirement is zero and reserves are plentiful. (c) Few creditworthy borrowers, or loan rates that do not beat the interest on reserves after expected losses.',
            },
            {
              slug: 'multiplier-in-data',
              title: 'The multiplier in the data',
              prompt:
                'In FRED, plot M2SL divided by BOGMBASE (monetary base) from 1990. Describe what happened in late 2008 and in 2020. Then plot TOTRESNS on a log scale. In 200 words, explain why a model that treats the multiplier as a constant would have badly mispredicted M2 after 2008.',
              kind: 'data-analysis',
              difficulty: 2,
              hint: 'The ratio fell from about 9 to about 4 as reserves exploded while deposits grew much more slowly.',
            },
          ],
          selfAssessment: [
            {
              question: 'Derive the simple money multiplier.',
              answerOutline: 'Total deposits D(1 + (1 − rr) + (1 − rr)² + ...) = D / rr, so the multiplier is 1/rr.',
            },
            {
              question: 'Name two things that make the actual multiplier smaller than 1/rr.',
              answerOutline: 'The public holding part of each loan as currency, and banks holding reserves above the requirement.',
            },
            {
              question: 'In the US today, what constrains bank lending if not reserves?',
              answerOutline:
                'Capital requirements, the demand for loans from creditworthy borrowers, and profitability relative to the interest rate the Fed pays on reserves (which the Fed uses to steer rates).',
            },
          ],
        },
        {
          slug: 'quantity-theory-and-inflation',
          title: 'The quantity theory of money and inflation',
          summary:
            'The equation of exchange MV = PY, why faster money growth means higher inflation in the long run, what velocity does, and what the 2020–23 surge and fall in M2 do and do not show.',
          estimatedMinutes: 100,
          objectives: [
            'Write the equation of exchange and its growth-rate form',
            'Use the quantity theory to predict long-run inflation from money growth',
            'Explain monetary neutrality and the classical dichotomy',
            'Explain the Fisher effect',
            'Evaluate the quantity theory against long-run evidence and the 2020–23 US episode',
          ],
          concepts: [
            'Equation of exchange $MV = PY$',
            'Velocity of money',
            'Quantity theory of money',
            'Monetary neutrality',
            'Classical dichotomy',
            'Fisher effect',
            'Seigniorage and the inflation tax',
          ],
          explanation: `Every dollar of spending uses money. If the money stock is $M$ and each dollar is spent $V$ times a year (the **velocity** of money), total spending is $MV$. Total spending is also nominal GDP, the price level times real output, $PY$. So

$$
MV = PY.
$$

This **equation of exchange** is an identity, because $V$ is defined as $PY/M$. In Q3 2026 nominal GDP was USD 33.0 trillion and M2 about USD 23.3 trillion, so the velocity of M2 was 1.42 (FRED: M2V).

**The quantity theory** adds two assumptions: velocity is roughly stable, and in the long run real output is set by labour, capital and technology (Module 3), not by money. Taking growth rates,

$$
\\%\\Delta M + \\%\\Delta V = \\%\\Delta P + \\%\\Delta Y.
$$

If money grows 7% a year, velocity is constant and real output grows 2%, inflation is about 5%. Money growth above output growth causes inflation; this is Milton Friedman's "inflation is always and everywhere a monetary phenomenon".

**Neutrality.** In the long run a one-time doubling of $M$ doubles all prices and wages and changes no real variable: money is **neutral**. Keeping real and nominal variables separate is called the **classical dichotomy**. In the short run (Module 6) money is not neutral, because prices and wages adjust slowly.

**The Fisher effect.** If money growth raises inflation one-for-one in the long run, nominal interest rates should also rise one-for-one, leaving the real rate $r = i - \\pi$ unchanged. Countries with high inflation do have high nominal interest rates.

**The evidence.** Across countries and over decades the link is strong: every hyperinflation followed explosive money growth, usually printing to cover deficits. Governments gain **seigniorage**, revenue from creating money, and inflation acts as a tax on money holders. Over shorter periods in low-inflation economies the link is loose, because velocity moves.

**The 2020–23 episode.** US M2 grew 26.8% in the year to February 2021, the fastest since records began in 1959, then fell 4.7% in the year to April 2023. Inflation peaked at 9.0% (CPI, June 2022). Some economists, often in the monetarist tradition, see the M2 surge as a main cause and predicted the inflation. Others note that velocity fell sharply in 2020 (from 1.43 in Q4 2019 to 1.13 in Q2 2020) as people held cash they could not spend, so money growth overstated spending, and point to supply shocks and fiscal transfers instead. Module 9 returns to this debate.`,
          resources: [
            mru('inflation-and-quantity-theory-of-money', 'inflation-quantity-theory-of-money', 'Inflation and the quantity theory of money', 'The growth-rate form with examples. The unit also covers why governments create inflation.'),
            ostx('15-4-monetary-policy-and-economic-outcomes', 'Monetary policy and economic outcomes', 'Includes the basic quantity equation and velocity.', true),
            fred('M2V', 'Velocity of M2 Money Stock', 'Plot it from 1960 and note that it is anything but constant.'),
          ],
          exercises: [
            {
              slug: 'quantity-arithmetic',
              title: 'Quantity theory arithmetic',
              prompt:
                'Use the growth-rate form. (a) M grows 10%, V is constant, Y grows 3%: what is inflation? (b) M grows 4%, V falls 2%, Y grows 2%: inflation? (c) The central bank wants 2% inflation with 2.5% real growth and V rising 0.5% a year. What money growth should it allow? (d) In a hyperinflation M grows 50% a month while Y is flat and V rises 10% a month. Monthly inflation?',
              kind: 'problem',
              difficulty: 1,
              hint: '(a) 7%. (b) 0%. (c) 4%. (d) About 60% (exactly 1.5 × 1.1 − 1 = 65%).',
            },
            {
              slug: 'velocity-history',
              title: 'Velocity since 1960',
              prompt:
                'Plot M2V from 1960. Describe its behaviour in three periods: 1960–1990, 1990–2007 and 2008 to the latest data. Use the equation of exchange to explain why a central bank targeting M2 growth in 2008–2021 would have got inflation badly wrong.',
              kind: 'data-analysis',
              difficulty: 2,
              hint: 'Velocity was fairly stable until about 1990, rose in the 1990s, then fell sharply after 2008 and again in 2020, before partially recovering after 2021.',
            },
            {
              slug: 'money-and-2021',
              title: 'Was it the money?',
              prompt:
                'In 400 words, assess the claim "the 2021–22 US inflation was caused by the growth of M2". Use the equation of exchange, the data on M2 growth, velocity and inflation in the lesson, and at least one alternative explanation. Say what evidence would distinguish the explanations.',
              kind: 'writing',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'Why is MV = PY true by definition, and what turns it into a theory?',
              answerOutline:
                'Velocity is defined as PY/M, so the equation always holds. It becomes the quantity theory when you assume V is stable and Y is determined by real factors, so changes in M show up in P.',
            },
            {
              question: 'What does monetary neutrality say, and when does it fail?',
              answerOutline: 'Money changes only nominal variables in the long run. It fails in the short run because prices and wages are sticky.',
            },
            {
              question: 'What is the Fisher effect?',
              answerOutline: 'In the long run nominal interest rates rise roughly one-for-one with expected inflation, so the real rate is unaffected by money growth.',
            },
          ],
        },
      ],
    },
    {
      slug: 'short-run-fluctuations',
      title: 'Short-Run Fluctuations',
      description:
        'Business cycles and how they are dated; the Keynesian cross and the spending multiplier for an economy with spare capacity; and the aggregate demand and aggregate supply model of output and the price level, with demand shocks, supply shocks and the adjustment back to the long run.',
      lessons: [
        {
          slug: 'business-cycles',
          title: 'Business cycles: the facts',
          summary:
            'Expansions and recessions, how the NBER dates them, what moves together over the cycle, and what the 2008–09 and 2020 recessions looked like in the data.',
          estimatedMinutes: 90,
          objectives: [
            'Describe the phases of the business cycle and how the NBER dates them',
            'Explain why "two negative quarters" is not the US definition of a recession',
            'Identify which variables move with, against or ahead of the cycle',
            'Compute peak-to-trough declines from FRED data',
            'Explain why early estimates of GDP get revised, with a real example',
          ],
          concepts: [
            'Expansion, peak, recession, trough',
            'NBER Business Cycle Dating Committee',
            'Procyclical and countercyclical variables',
            'Leading indicators',
            'Peak-to-trough decline',
            'Data revisions',
          ],
          explanation: `Real GDP grows about 2% a year on average, but not smoothly. Periods of growth (**expansions**) end at a **peak**, after which output and employment fall in a **recession** until a **trough**. These are **business cycles**, though they are irregular in length and depth, so "fluctuations" is the more accurate word.

**Dating.** In the US, recessions are dated by the National Bureau of Economic Research's Business Cycle Dating Committee, which defines a recession as "a significant decline in economic activity that is spread across the economy and that lasts more than a few months". It looks at real income, employment, consumer spending, industrial production and more, not just GDP, and it announces dates months after the fact. The popular rule of thumb, two consecutive quarters of falling real GDP, is not the official definition.

| Recession | Peak | Trough | Length | Real GDP, peak quarter to trough quarter | Unemployment peak |
|---|---|---|---|---|---|
| Great Recession | Dec 2007 | Jun 2009 | 18 months | −3.8% (Q4 2007 to Q2 2009) | 10.0%, Oct 2009 |
| Pandemic | Feb 2020 | Apr 2020 | 2 months | −9.1% (Q4 2019 to Q2 2020) | 14.8%, Apr 2020 |

(NBER dates; GDP and unemployment from BEA and BLS on FRED, current vintage, November 2026.) The expansion between them, June 2009 to February 2020, was the longest on record, 128 months.

**What moves with the cycle.** **Procyclical** variables rise in expansions and fall in recessions: output, employment, hours, corporate profits, and especially investment and purchases of durable goods, which can be postponed. **Countercyclical** variables move the other way: unemployment and claims for unemployment insurance. Inflation tends to lag the cycle. **Leading indicators**, such as new orders, building permits, initial unemployment claims and the slope of the yield curve, tend to turn before the economy does, though none is reliable on its own.

**Revisions.** GDP is first estimated about a month after a quarter ends and revised for years as fuller data arrive. In July 2022 the first estimates showed real GDP falling in both Q1 and Q2 2022, and many commentators declared a recession. The NBER did not, because employment was growing strongly. Current BEA data show −1.0% in Q1 and +0.6% in Q2 (annualised), so the "two negative quarters" never happened in the revised figures. The lesson: early data are noisy, and one series is never enough.`,
          resources: [
            { title: 'US Business Cycle Expansions and Contractions', url: 'https://www.nber.org/research/data/us-business-cycle-expansions-and-contractions', type: 'dataset', cost: 'free', provider: 'National Bureau of Economic Research', note: 'The official dates since 1854, with lengths of every expansion and contraction.', primary: true },
            ostx('6-3-tracking-real-gdp-over-time', 'Tracking real GDP over time', 'US real GDP and its recessions since 1900.'),
            mru('business-fluctuations', 'introduction-business-cycle-fluctuations', 'Introduction to business fluctuations', 'Sets up the questions the AD-AS model answers.'),
          ],
          exercises: [
            {
              slug: 'peak-to-trough',
              title: 'Measure three recessions',
              prompt:
                'Using GDPC1 and UNRATE in FRED, compute for the 1981–82, 1990–91 and 2001 recessions (NBER dates) the percentage fall in real GDP from the peak quarter to the lowest quarter, the rise in unemployment from its pre-recession low to its peak, and how many quarters real GDP took to regain its previous peak. Present a table alongside the two recessions in the lesson.',
              kind: 'data-analysis',
              difficulty: 2,
              hint: 'Download quarterly GDPC1 and use MIN over the recession window. The 2001 recession is notable for its small GDP decline but slow job recovery.',
            },
            {
              slug: 'cyclical-behaviour',
              title: 'Which way does it move?',
              prompt:
                'Plot the year-over-year percentage change of real GDP (GDPC1), real investment (GPDIC1), real consumption of durable goods (PCEDGC96) and real consumption of services (PCESVC96) from 1990. Rank them by how much they fall in recessions, and explain the ranking.',
              kind: 'data-analysis',
              difficulty: 2,
              hint: 'Investment and durables are the most volatile because they can be postponed; services are the most stable, except in 2020, when the pandemic hit services directly.',
            },
            {
              slug: 'revisions-alfred',
              title: 'Watch a number change',
              prompt:
                'ALFRED (alfred.stlouisfed.org) stores past vintages of FRED data. Find the first-published estimate of real GDP growth for Q1 and Q2 2022 and the current values. By how much was each revised? In 150 words, explain what this means for policymakers who must act on early data.',
              kind: 'data-analysis',
              difficulty: 2,
              hint: 'Search ALFRED for GDPC1 or A191RL1Q225SBEA and choose "Add vintage" around late July 2022.',
            },
          ],
          selfAssessment: [
            {
              question: 'Why does the NBER not use "two negative quarters of GDP" as its definition?',
              answerOutline:
                'It wants a broad, significant and lasting decline across many measures. GDP alone is noisy and revised, and a short sharp drop (2020) or two small dips with strong job growth (2022 early estimates) would be misclassified.',
            },
            {
              question: 'Why is investment more volatile than consumption over the cycle?',
              answerOutline:
                'Investment and durable purchases can be postponed when the outlook is uncertain, and investment depends on expected future demand, which swings with confidence. Spending on non-durables and services is harder to delay.',
            },
            {
              question: 'Name two leading indicators and say why each might lead.',
              answerOutline:
                'Building permits (construction follows permits), initial unemployment claims (layoffs show up quickly), new orders, the yield curve (markets expect rate cuts). Any two with a reason.',
            },
          ],
        },
        {
          slug: 'the-keynesian-cross',
          title: 'Planned expenditure and the Keynesian cross',
          summary:
            'When firms have spare capacity, output adjusts to demand. Build the consumption function and planned expenditure, find the equilibrium where planned spending equals output, and see how inventories push the economy there.',
          estimatedMinutes: 110,
          objectives: [
            'Write a consumption function and interpret the marginal propensity to consume',
            'Build planned expenditure AE = C + I + G + NX and find equilibrium output algebraically and graphically',
            'Explain how unplanned inventory changes move output to equilibrium',
            'State the assumptions of the model and when they are reasonable',
            'Use the model to explain the paradox of thrift',
          ],
          concepts: [
            'Consumption function',
            'Autonomous consumption',
            'Marginal propensity to consume (MPC)',
            'Disposable income',
            'Planned versus actual investment',
            'Unplanned inventory investment',
            '45-degree line',
            'Paradox of thrift',
          ],
          explanation: `John Maynard Keynes argued in 1936 that in a slump, output is limited not by what the economy *can* produce but by what people *want to buy*. The **Keynesian cross** turns that into a model. Its key assumption is that prices are fixed and firms have spare capacity, so they produce whatever is demanded.

**Consumption.** Households spend more when their **disposable income** $Y - T$ rises, but by less than the full rise:

$$
C = C_0 + \\text{MPC}\\,(Y - T).
$$

$C_0$ is **autonomous consumption**, spending that does not depend on income (driven by wealth, confidence, credit). The **marginal propensity to consume** (MPC) is the share of an extra dollar of disposable income that is spent; the rest is saved. Studies of the 2008 US tax rebates found households spent roughly half to nine-tenths of them within a few months, counting cars and other durables, which suggests a high short-run MPC for many households.

**Planned expenditure** adds planned investment, government purchases and net exports, taken as given for now:

$$
AE = C_0 + \\text{MPC}(Y - T) + I + G + NX.
$$

**Equilibrium.** Output is in equilibrium when what is produced equals what buyers plan to spend, $Y = AE$: on a graph, where the AE line crosses the **45-degree line**. With no taxes, $C_0 = 200$, MPC = 0.75, $I = 300$, $G = 300$ and $NX = 0$,

$$
Y = 800 + 0.75Y \\;\\Rightarrow\\; Y^* = \\frac{800}{1 - 0.75} = 3{,}200.
$$

**How the economy gets there.** If firms produce $Y = 3{,}600$, planned spending is $800 + 0.75 \\times 3{,}600 = 3{,}500$. The unsold 100 piles up as **unplanned inventory investment**, so firms cut production. At $Y = 2{,}800$, spending is 2,900, inventories run down by 100, and firms raise output. Actual investment always equals saving; *planned* investment equals saving only at equilibrium.

\`\`\`interactive
keynesian-cross
{"title": "Planned expenditure and equilibrium output", "mpc": 0.75, "auto": 800, "dA": 0, "taxModes": false, "unit": "bn", "caption": "AE₀ = 800 + 0.75Y meets the 45° line at Y₀ = 3,200. Lower autonomous spending to 700 (a fall in confidence): equilibrium falls by 400, not 100. Then set MPC to 0.8 and watch the AE line steepen and equilibrium rise. Finally move ΔA away from zero to see the new line AE₁; the next lesson steps through the rounds."}
\`\`\`

**The paradox of thrift.** If households become more cautious and $C_0$ falls by 100, equilibrium output falls by 400. With planned investment fixed, total saving at the new equilibrium is unchanged (saving equals investment), but income is lower: everyone tried to save more and the economy ended up poorer. That is the fallacy of composition from the first lesson, and it holds only while there is spare capacity; in the long run more saving funds more investment (Module 4).

**Limits.** The model ignores prices, interest rates and supply constraints. It is a good guide in a deep slump and a poor one near full employment, which is why the course next adds aggregate supply.`,
          resources: [
            ostx('b-the-expenditure-output-model', 'Appendix B: The expenditure-output model', 'The Keynesian cross with tables and graphs, step by step.', true),
            ostx('12-2-the-building-blocks-of-keynesian-analysis', 'The building blocks of Keynesian analysis', 'Sticky prices, the coordination argument and the multiplier in words.'),
            core('03-aggregate-demand-01-great-recession-hardship', 'Unit 3, Aggregate demand and the multiplier model', 'CORE\'s chapter: consumption, investment, the multiplier model and the Great Recession.'),
          ],
          exercises: [
            {
              slug: 'solve-cross',
              title: 'Solve a Keynesian cross',
              prompt:
                '$C = 150 + 0.8(Y - T)$, $T = 250$, $I = 400$, $G = 450$, $NX = -50$. (a) Write AE as a function of Y. (b) Find equilibrium Y. (c) Compute consumption, saving and the budget balance at equilibrium and check that $S_{private} + (T - G) = I + NX$.',
              kind: 'problem',
              difficulty: 2,
              hint: '(a) AE = 150 − 200 + 0.8Y + 400 + 450 − 50 = 750 + 0.8Y. (b) Y = 3,750. (c) C = 150 + 0.8 × 3,500 = 2,950; private saving 3,500 − 2,950 = 550; public saving −200; 550 − 200 = 350 = 400 − 50.',
            },
            {
              slug: 'inventory-story',
              title: 'Tell the inventory story',
              prompt:
                'In the lesson\'s economy (AE = 800 + 0.75Y), firms produce 3,000. Compute planned spending, the unplanned change in inventories, and the direction output will move. Then explain in 100 words why a firm seeing its warehouse empty out would raise production, and why a model with fixed prices needs this mechanism.',
              kind: 'problem',
              difficulty: 1,
              hint: 'AE = 800 + 2,250 = 3,050; inventories fall by 50; output rises towards 3,200.',
            },
            {
              slug: 'thrift',
              title: 'The paradox of thrift in numbers',
              prompt:
                'With $C = C_0 + 0.75Y$, $I = 300$, $G = 300$, $NX = 0$ and no taxes, compute equilibrium Y and total saving $S = Y - C - G$ for $C_0 = 200$ and for $C_0 = 150$. Explain why saving does not rise when households try to save more. What assumption would you change to make the long-run result of Module 4 hold instead?',
              kind: 'derivation',
              difficulty: 2,
              hint: 'Y = 3,200 and Y = 3,000; saving equals I = 300 in both. Planned investment is fixed and output adjusts. If investment responded to lower interest rates, or the economy were at full employment, more saving would fund more investment.',
            },
          ],
          selfAssessment: [
            {
              question: 'Why must equilibrium in the Keynesian cross lie on the 45-degree line?',
              answerOutline: 'The 45-degree line is the set of points where planned expenditure equals output. Equilibrium requires output to equal what buyers plan to spend.',
            },
            {
              question: 'What happens to inventories when output is above equilibrium, and what do firms do?',
              answerOutline: 'Planned spending is below output, so unsold goods accumulate as unplanned inventory investment. Firms cut production until output equals planned spending.',
            },
            {
              question: 'Under what conditions is the Keynesian cross a reasonable model?',
              answerOutline: 'When prices are sticky and there is spare capacity (high unemployment, idle plant), so output responds to demand without much effect on prices or interest rates.',
            },
          ],
        },
        {
          slug: 'the-multiplier',
          title: 'The spending multiplier and the tax multiplier',
          summary:
            'An extra dollar of spending becomes someone\'s income, part of which is spent again. Sum the rounds to get the multiplier 1/(1 − MPC), then add taxes, and compare the textbook numbers with real-world estimates.',
          estimatedMinutes: 110,
          objectives: [
            'Derive the spending multiplier as the sum of rounds of spending',
            'Compute the lump-sum tax multiplier and the balanced-budget multiplier',
            'Compute the multiplier with a proportional income tax and with imports',
            'Explain why estimated real-world multipliers are smaller and vary with conditions',
          ],
          concepts: [
            'Spending multiplier $1/(1-\\text{MPC})$',
            'Rounds of spending as a geometric series',
            'Tax multiplier $-\\text{MPC}/(1-\\text{MPC})$',
            'Balanced-budget multiplier',
            'Proportional tax and the slope of AE',
            'Marginal propensity to import',
            'Estimated fiscal multipliers',
          ],
          explanation: `Suppose government purchases rise by USD 100 billion in the economy of the previous lesson (MPC = 0.75, no taxes). The firms that sell to the government pay 100 billion more in wages and profits. Households spend 75% of that, 75 billion, which becomes other people's income; they spend 56.25 billion; and so on. Total extra output is a geometric series:

$$
\\Delta Y = 100\\,(1 + 0.75 + 0.75^2 + \\cdots) = \\frac{100}{1 - 0.75} = 400.
$$

The **spending multiplier** is $1/(1 - \\text{MPC}) = 4$. The same algebra follows from the equilibrium formula $Y^* = A/(1 - \\text{MPC})$, where $A$ is autonomous spending: change $A$ by $\\Delta A$ and $Y^*$ changes by $\\Delta A/(1-\\text{MPC})$. Any autonomous change, in investment, exports or $C_0$, has the same multiplier.

\`\`\`interactive
keynesian-cross
{"title": "The multiplier, round by round", "mpc": 0.75, "auto": 800, "dA": 100, "zoom": true, "unit": "bn", "caption": "ΔG = 100 shifts AE up by 100. Press Next round: output rises by 100, then 75, then 56.25, tracing a staircase between AE₁ and the 45° line. After 10 rounds about 94% of the final 400 is reached. Choose Lump-sum T and set ΔG to 0 and ΔT to +100: the first round is −75 and the total is −300 (tax multiplier −3). Then choose Proportional tY with t = 0.2: the multiplier falls to 2.5."}
\`\`\`

**Taxes.** A lump-sum tax cut of $\\Delta T$ raises disposable income by $\\Delta T$, but households spend only $\\text{MPC}\\times\\Delta T$ in the first round, so the **tax multiplier** is

$$
\\frac{\\Delta Y}{\\Delta T} = -\\frac{\\text{MPC}}{1-\\text{MPC}} = -3 \\quad(\\text{MPC} = 0.75).
$$

Raising $G$ and $T$ together by 100 changes output by $400 - 300 = 100$: the **balanced-budget multiplier** is 1.

**Leakages.** With a proportional income tax $T = tY$, each extra dollar of income raises disposable income by only $1 - t$, so the slope of AE is $\\text{MPC}(1-t)$ and the multiplier is $1/[1 - \\text{MPC}(1-t)]$. With $t = 0.2$ it is $1/(1 - 0.6) = 2.5$. Spending on imports leaks abroad in the same way. These leakages are why taxes and transfers act as **automatic stabilisers** (Module 8).

**Real-world multipliers.** Estimated multipliers are well below 4. Higher spending can raise interest rates (crowding out investment), prices may rise, households may save windfalls they see as temporary, and imports leak. In a 2019 survey, Valerie Ramey concluded that most estimates of the US government purchases multiplier lie between about 0.6 and 1. Others, including Alan Auerbach and Yuriy Gorodnichenko, find larger multipliers in recessions and when the central bank holds rates at zero, though that finding is disputed. The Congressional Budget Office used a range of 0.5 to 2.5 for federal purchases when it assessed the 2009 stimulus. The honest summary: the sign is clear, the size depends on the state of the economy and on how monetary policy responds, and economists disagree within a wide range.`,
          resources: [
            ostx('b-the-expenditure-output-model', 'Appendix B: The expenditure-output model', 'Read the multiplier section and work its examples.', true),
            mru('fiscal-policy', 'expansionary-fiscal-policy', 'Expansionary fiscal policy', 'The multiplier argument and its limits.'),
            { title: 'Fiscal Multipliers: Theory and Evidence (Ramey, 2019)', url: 'https://www.aeaweb.org/articles?id=10.1257/jep.33.2.89', type: 'article', cost: 'free', provider: 'Journal of Economic Perspectives', note: 'A readable survey of how multipliers are estimated and why estimates differ. The JEP is free to read.' },
          ],
          exercises: [
            {
              slug: 'rounds',
              title: 'Count the rounds',
              prompt:
                'MPC = 0.8 and investment rises by 50. (a) List the first five rounds of extra spending and their running total. (b) What is the final change in output? (c) After how many rounds is 90% of the total reached? (d) Repeat (b) with MPC = 0.6.',
              kind: 'problem',
              difficulty: 1,
              hint: '(a) 50, 40, 32, 25.6, 20.48; running total 168.08. (b) 250. (c) 1 − 0.8^n ≥ 0.9 gives n = 11 rounds. (d) 125.',
            },
            {
              slug: 'tax-multipliers',
              title: 'Tax and balanced-budget multipliers',
              prompt:
                'With MPC = 0.9 and lump-sum taxes: (a) compute the spending and tax multipliers; (b) the government wants to raise output by 200. How large an increase in G, or how large a tax cut, would do it? (c) It raises G and T by 50 each. What happens to output and why?',
              kind: 'problem',
              difficulty: 2,
              hint: '(a) 10 and −9. (b) ΔG = 20 or ΔT = −22.2. (c) +50: the balanced-budget multiplier is 1.',
            },
            {
              slug: 'open-economy-multiplier',
              title: 'Leakages: taxes and imports',
              prompt:
                'Households spend MPC = 0.8 of disposable income, the income tax rate is 25%, and imports are 15% of income ($M = 0.15Y$). Derive the slope of AE and the multiplier. Compare it with the closed-economy, no-tax multiplier, and explain each leakage in one sentence.',
              kind: 'derivation',
              difficulty: 3,
              hint: 'Slope = 0.8 × 0.75 − 0.15 = 0.45, so the multiplier is 1/0.55 ≈ 1.82, against 5 with no leakages.',
            },
          ],
          selfAssessment: [
            {
              question: 'Why is the tax multiplier smaller in absolute value than the spending multiplier?',
              answerOutline:
                'A rise in G is spent in full in the first round. A tax cut first raises disposable income, of which only the MPC share is spent, so the first round is MPC × ΔT.',
            },
            {
              question: 'Why does a proportional income tax reduce the multiplier?',
              answerOutline:
                'Each extra dollar of income raises disposable income by only (1 − t), so less is spent in each round. The slope of AE falls to MPC(1 − t).',
            },
            {
              question: 'Give three reasons real-world multipliers are smaller than 1/(1 − MPC).',
              answerOutline:
                'Crowding out through higher interest rates, rising prices, imports, households saving temporary windfalls, and monetary policy offsetting the stimulus. Any three.',
            },
          ],
        },
        {
          slug: 'aggregate-demand-and-supply',
          title: 'Aggregate demand and aggregate supply',
          summary:
            'Why the aggregate demand curve slopes down, why short-run aggregate supply slopes up while long-run supply is vertical at potential output, what shifts each curve, and how to solve the linear model.',
          estimatedMinutes: 120,
          objectives: [
            'Explain the wealth, interest-rate and exchange-rate effects behind the downward-sloping AD curve',
            'Explain why the long-run aggregate supply curve is vertical at potential output',
            'Explain why short-run aggregate supply slopes upward (sticky wages and prices)',
            'List what shifts AD, SRAS and LRAS',
            'Solve a linear AD-AS model for the short-run equilibrium and the output gap',
          ],
          concepts: [
            'Aggregate demand (AD)',
            'Wealth, interest-rate and exchange-rate effects',
            'Long-run aggregate supply (LRAS) and potential output',
            'Short-run aggregate supply (SRAS)',
            'Sticky wages and prices',
            'Expected price level',
            'Short-run equilibrium',
            'Output gap',
          ],
          explanation: `The Keynesian cross held prices fixed. The **AD-AS model** lets the price level $P$ move, with real GDP $Y$ on the horizontal axis.

**Aggregate demand** is the total quantity of goods and services demanded at each price level. It slopes down, but not for the reason a single market's demand curve does (substitution towards other goods: there is no "other good" for the whole economy). Instead, a lower price level:

- raises the real value of money and other nominal wealth, so households spend more (**wealth effect**);
- reduces the money people need for transactions, which lowers interest rates and raises investment (**interest-rate effect**);
- makes domestic goods cheaper relative to foreign goods, raising net exports (**exchange-rate effect**).

AD **shifts** with anything else that changes $C$, $I$, $G$ or $NX$ at a given price level: consumer confidence, household wealth, expected profits, government spending and taxes, foreign incomes, and monetary policy.

**Long-run aggregate supply** is vertical at **potential output** $Y^*$, set by labour, capital, natural resources and technology (Modules 2 and 3). In the long run all prices and wages adjust, so the price level does not affect how much the economy can produce. LRAS shifts with growth in those inputs.

**Short-run aggregate supply** slopes up because some wages and prices are **sticky**: set by contracts or changed only occasionally, based on the price level firms and workers *expected*. If $P$ turns out higher than expected, prices rise faster than many costs, production is more profitable, and firms produce more. SRAS shifts up when expected prices or production costs rise (wages, oil) and down when they fall.

**A linear model.** Measure output so that $Y^* = 100$, and let

$$
\\text{AD: } P = 100 + (100 + a - Y), \\qquad \\text{SRAS: } P = W + 0.5\\,(Y - 100),
$$

where $a$ shifts demand and $W$ is the expected price level. Starting from $a = 0$, $W = 100$, the curves cross at $Y = 100$, $P = 100$: a long-run equilibrium, on LRAS. Now let demand fall, $a = -12$. Setting the two equal, $188 - Y = 50 + 0.5Y$, so

$$
Y = 92, \\qquad P = 96, \\qquad \\text{output gap} = \\frac{92 - 100}{100} = -8\\%.
$$

Output and prices both fall. Unemployment rises above its natural rate, roughly by 4 points by Okun's law.

\`\`\`interactive
ad-as
{"preset": "none", "showLambda": false, "caption": "The economy starts at Y = 100, P = 100 where AD, SRAS and LRAS meet. Drag the AD shift to −12: the short-run equilibrium moves to (92, 96), an output gap of −8%. Drag it to +10 instead for a boom. Then reset AD to 0 and raise the SRAS shift (expected prices and costs) to +10: output falls and prices rise together. Finally shift LRAS right, as growth does."}
\`\`\`

The next lesson asks what happens after the shock, as expectations catch up.`,
          resources: [
            ostx('11-2-building-a-model-of-aggregate-demand-and-aggregate-supply', 'Building a model of aggregate demand and aggregate supply', 'The curves and their slopes.', true),
            mru('business-fluctuations', 'business-fluctuations-aggregate-demand-curve', 'The aggregate demand curve', 'MRU builds AD from the quantity theory. Continue with the long-run and short-run aggregate supply videos in the same unit.'),
            ostx('11-4-shifts-in-aggregate-demand', 'Shifts in aggregate demand', 'What moves AD, with US examples.'),
          ],
          exercises: [
            {
              slug: 'solve-ad-as',
              title: 'Solve the linear model',
              prompt:
                'Use the lesson\'s model: AD $P = 200 + a - Y$, SRAS $P = W + 0.5(Y - 100)$, LRAS $Y = 100$. Find the short-run equilibrium and the output gap for (a) $a = 6$, $W = 100$; (b) $a = 0$, $W = 106$; (c) $a = 6$, $W = 106$. In which case is the economy back in long-run equilibrium?',
              kind: 'problem',
              difficulty: 2,
              hint: '(a) 206 − Y = 50 + 0.5Y: Y = 104, P = 102, gap +4%. (b) 200 − Y = 56 + 0.5Y: Y = 96, P = 104, gap −4%. (c) Y = 100, P = 106: long-run equilibrium.',
            },
            {
              slug: 'classify-shifts',
              title: 'Which curve shifts?',
              prompt:
                'For each event, say which curve(s) shift, in which direction, and what happens to Y and P in the short run: (a) a stock market crash cuts household wealth; (b) oil prices double; (c) the government raises defence spending; (d) a recession abroad cuts US exports; (e) a new technology raises productivity across industries; (f) workers come to expect higher inflation.',
              kind: 'problem',
              difficulty: 1,
              hint: 'a: AD left (Y↓ P↓). b: SRAS up (Y↓ P↑). c: AD right. d: AD left. e: LRAS and SRAS right (Y↑ P↓). f: SRAS up.',
            },
            {
              slug: 'why-ad-slopes',
              title: 'Why does AD slope down?',
              prompt:
                'In 250 words, explain why the reasoning "when prices fall people buy more because things are cheaper" does not justify a downward-sloping AD curve, and explain each of the three effects that do. Say which you think is strongest for the US and why.',
              kind: 'writing',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why is LRAS vertical?',
              answerOutline:
                'In the long run all prices and wages adjust, so the price level does not change the real incentives to produce. Output is set by labour, capital, resources and technology, at potential.',
            },
            {
              question: 'Why does SRAS slope upward?',
              answerOutline:
                'Some wages and prices are fixed in advance based on expected prices. If the actual price level is higher than expected, output prices rise faster than costs, so firms find it profitable to produce more.',
            },
            {
              question: 'An increase in expected inflation shifts which curve, and how?',
              answerOutline: 'SRAS shifts up (left): at each output level, firms and workers set higher prices and wages.',
            },
          ],
        },
        {
          slug: 'shocks-and-adjustment',
          title: 'Demand shocks, supply shocks and the return to the long run',
          summary:
            'Follow the economy period by period after a demand or a supply shock as expectations adjust, compare waiting with a policy response, and read real episodes from 1973 to 2020 through the model.',
          estimatedMinutes: 120,
          objectives: [
            'Trace the self-correcting adjustment after a demand shock as expected prices change',
            'Explain stagflation after an adverse supply shock and the policy dilemma it creates',
            'Compare waiting, stabilising demand and accommodating a supply shock',
            'Apply the model to 1973–75, 2008–09 and 2020',
            'Explain why economists disagree about how fast self-correction works',
          ],
          concepts: [
            'Demand shock',
            'Supply shock',
            'Stagflation',
            'Recessionary and inflationary gaps',
            'Adjustment of expectations',
            'Self-correction',
            'Stabilisation policy',
            'Accommodating a supply shock',
          ],
          explanation: `A short-run equilibrium off LRAS cannot last, because expectations are wrong there. Model this simply: each period, the expected price level $W$ that positions SRAS moves a fraction $\\lambda$ of the way towards the actual price level, $W' = W + \\lambda(P - W)$.

**A demand shock.** In the previous lesson's model, AD fell ($a = -12$) and the economy moved to $Y = 92$, $P = 96$. Prices are below what wage setters expected (96 < 100), and unemployment is high, so next period wages and expected prices are set lower. With $\\lambda = 0.35$, $W' = 100 + 0.35(96 - 100) = 98.6$. SRAS shifts down, and the new equilibrium is $Y = 92.9$, $P = 95.1$. Period after period the gap shrinks, until the economy returns to $Y = 100$ at a lower price level, $P = 88$, where the new AD crosses LRAS. This is **self-correction**. How long it takes depends on how sticky wages and prices are. Keynes's reply to those who relied on it was that "in the long run we are all dead".

**A supply shock.** Suppose oil prices jump, raising costs: $W$ rises to 110 with AD unchanged. Then $200 - Y = 110 + 0.5(Y - 100)$ gives $Y = 93.3$ and $P = 106.7$: output falls *and* prices rise, **stagflation**. Policy faces a dilemma. If it waits, unemployment gradually pushes costs back down and the economy returns to $(100, 100)$. If it raises demand to close the output gap (here, shifting AD right by 10), output returns to 100 at once, but the price level stays at 110: the shock is **accommodated** and becomes permanent inflation. Fighting inflation instead deepens the recession.

\`\`\`interactive
ad-as
{"preset": "supply-shock", "lambda": 0.35, "caption": "The supply shock puts the economy at (93.3, 106.7). Press Step: expected prices fall, SRAS drifts down, and the dots trace the path back to (100, 100) over many periods. Reset and press Policy: close the gap instead: output is 100 at once but P stays at 110. Now choose Demand falls and Play, then Demand falls + policy, where policy acts after two periods. Raise λ to see how faster wage adjustment shortens the recession."}
\`\`\`

**Real episodes.**

- *1973–75*: the OPEC oil embargo was a large adverse supply shock. US unemployment rose to 9.0% in May 1975 while CPI inflation exceeded 12% in late 1974.
- *2008–09*: the financial crisis was mainly a demand shock: falling wealth, frozen credit and collapsing investment. Output and inflation both fell, and core PCE inflation ran below the Fed's 2% goal for most of the following decade.
- *2020*: the pandemic hit both curves. Lockdowns cut what could be produced (supply) and what people could buy (demand). Massive fiscal and monetary support then shifted AD right while supply recovered unevenly, setting up the 2021–23 inflation discussed in Module 9.

**The debate.** Economists in the Keynesian tradition think wages adjust slowly, especially downward, so self-correction after a demand shock takes years and active policy is worthwhile. Those in the classical and new classical traditions think adjustment is faster and that policy, acting with long lags, often arrives too late. Most agree policy should respond to large demand shocks; responses to supply shocks are more contested.`,
          resources: [
            ostx('11-5-how-the-ad-as-model-incorporates-growth-unemployment-and-inflation', 'How the AD/AS model incorporates growth, unemployment and inflation', 'Recessionary and inflationary gaps in the model.', true),
            mru('business-fluctuations', 'office-hours-multiple-shocks-aggregate-demand-aggregate-supply-model', 'Office hours: multiple shocks in the AD-AS model', 'A worked problem with more than one shock at once.'),
            ostx('13-3-balancing-keynesian-and-neoclassical-models', 'Balancing Keynesian and neoclassical models', 'The two traditions on how fast the economy self-corrects.'),
          ],
          exercises: [
            {
              slug: 'adjustment-path',
              title: 'Iterate the adjustment',
              prompt:
                'Use AD $P = 200 + a - Y$ with $a = -12$, SRAS $P = W + 0.5(Y - 100)$ and $W\' = W + 0.35(P - W)$, starting from $W = 100$. In a spreadsheet, compute $Y$, $P$ and $W$ for 20 periods. After how many periods is the output gap smaller than 1%? What are the long-run $Y$ and $P$? Repeat with $\\lambda = 0.7$.',
              kind: 'simulation',
              difficulty: 2,
              hint: 'Each period Y = (238 − W)/1.5 and P = 188 − Y. The gap shrinks by the factor 1 − λ/3 each period (0.883 here), so it first drops below 1% in period 17; with λ = 0.7 the factor is 0.767 and it takes 8 periods. The long run is Y = 100, P = 88.',
            },
            {
              slug: 'supply-shock-choice',
              title: 'Choose a response to a supply shock',
              prompt:
                'In the lesson\'s model, W rises to 110. (a) Confirm the short-run equilibrium. (b) Compute the AD shift that returns output to 100 immediately and the resulting price level. (c) Compute the AD shift that would keep the price level at 100, and the resulting output gap. (d) In 150 words, recommend a response and justify it.',
              kind: 'problem',
              difficulty: 2,
              hint: '(a) Y = 93.33, P = 106.67. (b) a = +10, P = 110. (c) With P = 100: SRAS gives Y = 80; AD then needs 100 = 200 + a − 80, so a = −20; gap −20%.',
            },
            {
              slug: 'classify-episode',
              title: 'Demand or supply?',
              prompt:
                'Pick one of these episodes: the 1990–91 recession, the 2001 recession, or 2022. Using FRED (GDPC1, UNRATE, CPIAUCSL or PCEPI, and an oil price series such as WTISPLC), decide whether it looks more like a demand shock or a supply shock in the AD-AS model, and justify your answer with the co-movement of output and prices. Note any evidence that does not fit.',
              kind: 'data-analysis',
              difficulty: 3,
              hint: 'Demand shocks move output and inflation in the same direction; supply shocks move them in opposite directions. Real episodes often mix both.',
            },
          ],
          selfAssessment: [
            {
              question: 'After a fall in AD, what brings the economy back to potential output without policy?',
              answerOutline:
                'Prices below expectations and high unemployment lead to lower wages and expected prices, shifting SRAS down until it meets AD on LRAS, at a lower price level.',
            },
            {
              question: 'Why is an adverse supply shock a dilemma for policymakers?',
              answerOutline:
                'Output falls and prices rise. Stimulating demand restores output but locks in higher prices; restraining demand fights inflation but deepens the recession.',
            },
            {
              question: 'What does it mean to accommodate a supply shock?',
              answerOutline: 'To shift AD right so output stays at potential, accepting a permanently higher price level.',
            },
          ],
        },
      ],
      project: {
        slug: 'diagnose-a-recession',
        title: 'Diagnose a recession with AD-AS',
        description: `Pick one US recession since 1970 (not 2020) and write a 1,000-word diagnosis. Using FRED, chart real GDP growth, the unemployment rate against CBO's natural rate, inflation (CPI or PCE), the federal funds rate and one variable that captures the shock you think caused it (oil prices, house prices, a stock index, credit spreads). Identify the shock as demand, supply or both, draw the AD-AS diagrams for the start of the recession and for two years later, and explain how policy and expectations moved the curves. End with what a Keynesian and a classical economist would each have recommended at the time.`,
        deliverables: [
          'At least five FRED charts, each with series IDs and dates in the caption',
          'Two AD-AS diagrams (hand-drawn and scanned is fine) with every shift labelled',
          'A 1,000-word diagnosis with at least three sources besides FRED',
        ],
        estimatedHours: 5,
        stretchGoals: ['Calibrate the lesson\'s linear AD-AS model to your recession (size of the shock, speed of adjustment) and compare its path with the data'],
      },
    },
    {
      slug: 'monetary-policy',
      title: 'Monetary Policy',
      description:
        'How the Federal Reserve sets the federal funds rate with interest on reserves in an ample-reserves system, how a rate change reaches spending and inflation, what the Fed does when rates hit zero, and the inflation targets and rules that describe policy.',
      lessons: [
        {
          slug: 'how-the-fed-sets-rates',
          title: 'How the Fed sets interest rates',
          summary:
            'The FOMC announces a target range for the federal funds rate and keeps the market rate inside it with administered rates: interest on reserve balances, the overnight reverse repo rate and standing lending facilities. Compare this with the pre-2008 system of scarce reserves.',
          estimatedMinutes: 110,
          objectives: [
            'Define the federal funds rate and the target range',
            'Explain how interest on reserve balances and the overnight reverse repo rate hold the market rate in the range',
            'Explain how open market operations worked when reserves were scarce',
            'Describe the ceiling tools: the discount window and the standing repo facility',
            'Read the current settings of each tool from FRED',
          ],
          concepts: [
            'Federal funds rate and effective federal funds rate',
            'Target range',
            'Interest on reserve balances (IORB)',
            'Overnight reverse repurchase (ON RRP) facility',
            'Ample versus scarce reserves',
            'Open market operations',
            'Discount window and standing repo facility',
            'Administered rates',
          ],
          explanation: `The **federal funds rate** is the interest rate at which banks lend reserves to each other overnight. The FOMC sets a **target range** for it, 0.25 percentage points wide; on 17 September 2026 it raised the range to **3.75–4.00%**, where it stood on 8 November 2026. The **effective federal funds rate** (EFFR), a volume-weighted average of actual trades, averaged 3.88% in October 2026 (FRED: DFEDTARL, DFEDTARU, FEDFUNDS).

**The ample-reserves system.** Banks hold about USD 3 trillion of reserves, far more than they need for payments. With reserves that plentiful, the Fed cannot move rates by making reserves slightly scarcer. Instead it sets **administered rates**, interest rates it pays or charges directly:

- **Interest on reserve balances (IORB)**, 3.90%: no bank will lend reserves to another bank for less than it earns by leaving them at the Fed, which puts a soft floor under market rates.
- **Overnight reverse repurchase agreements (ON RRP)**, 3.75%: money market funds and other non-banks, which cannot earn IORB, can lend to the Fed overnight at this rate, so they will not lend to anyone else for less.
- **Standing repo facility** and the **discount window**, at 4.00%: banks and dealers can borrow from the Fed at the top of the range against good collateral, which caps market rates.

To raise rates, the FOMC raises all three together. Market rates follow because of **arbitrage**: if a bank could borrow below IORB and park the funds at the Fed, it would, and that borrowing would push the market rate up. The EFFR usually trades a few hundredths of a point below IORB.

**The old system.** Before 2008, reserves were scarce (USD 43.5 billion in December 2007) and paid no interest. Banks needed reserves to meet requirements and settle payments, so the demand for reserves sloped downward. The New York Fed's trading desk hit the target by **open market operations**: buying Treasury securities added reserves and pushed the funds rate down; selling them drained reserves and pushed it up. Congress authorised interest on reserves in October 2008, the Fed's bond purchases flooded the system with reserves, and in January 2019 the FOMC said it would keep operating with ample reserves permanently.

Open market operations still exist, but they now manage the *quantity* of reserves (to keep them ample) and the size of the balance sheet, not the daily level of rates. The Fed ended the runoff of its securities on 1 December 2025 and from 12 December began buying Treasury bills to keep reserves ample as other liabilities grew.

Policy decisions, the statement and the votes are published at 2 p.m. Eastern time on the last day of each FOMC meeting.`,
          resources: [
            ostx('15-3-how-a-central-bank-executes-monetary-policy', 'How a central bank executes monetary policy', 'The 3e edition explains the ample-reserves framework; Appendix C covers the old limited-reserves version.', true),
            { title: 'Policy Tools', url: 'https://www.federalreserve.gov/monetarypolicy/policytools.htm', type: 'documentation', cost: 'free', provider: 'Federal Reserve Board', note: 'Short official pages on IORB, ON RRP, the discount window, open market operations and the standing repo facility.' },
            mru('monetary-policy-and-the-federal-reserve', 'federal-funds-rate-targeting', 'Federal funds rate targeting', 'The video explains the older open market operations approach; read it alongside this lesson\'s ample-reserves account.'),
          ],
          exercises: [
            {
              slug: 'arbitrage',
              title: 'Why the rate stays in the range',
              prompt:
                'IORB is 3.90%, the ON RRP rate 3.75% and the standing repo rate 4.00%. Explain what each of these actors would do and how it pushes the market rate: (a) a bank is offered a fed funds loan at 3.70%; (b) a money market fund is offered a repo loan at 3.60%; (c) a dealer needs overnight cash and is quoted 4.25%. Why does the EFFR trade below IORB rather than above it?',
              kind: 'problem',
              difficulty: 2,
              hint: '(a) The bank borrows at 3.70% and earns 3.90% at the Fed, bidding the rate up. (b) The fund lends to the Fed at 3.75% instead. (c) It borrows from the Fed at 4.00%. Lenders in the fed funds market are mostly non-banks (such as Federal Home Loan Banks) that cannot earn IORB, so they accept a bit less.',
            },
            {
              slug: 'old-system-t-accounts',
              title: 'An open market purchase in the old system',
              prompt:
                'In a scarce-reserves system with a 10% requirement, banks hold exactly the required reserves. The Fed buys USD 5 billion of Treasury bills from dealers, whose banks credit their accounts. Show the T-account changes for the Fed and the banking system, explain why the federal funds rate falls, and say what the textbook multiplier would predict for deposits. Why does the same purchase today leave the funds rate unchanged?',
              kind: 'problem',
              difficulty: 2,
              hint: 'Fed: +5 bills, +5 reserves. Banks: +5 reserves, +5 deposits; only 0.5 is required, so 4.5 are excess, and banks offer them in the funds market. Multiplier: up to 50 of deposits. Today reserves are already abundant and the rate is set by IORB.',
            },
            {
              slug: 'tools-in-fred',
              title: 'Read the dials',
              prompt:
                'In FRED, plot DFEDTARL, DFEDTARU, IORB, RRPONTSYAWARD and EFFR (daily effective rate) on one graph from July 2021. Identify every change in the target range since then, list the dates, and check that IORB and the ON RRP rate moved with each. How far has EFFR been from IORB on average?',
              kind: 'data-analysis',
              difficulty: 1,
              hint: 'Rate increases from March 2022 to July 2023, cuts from September 2024 to December 2025, and a rise on 17 September 2026.',
            },
          ],
          selfAssessment: [
            {
              question: 'Why can\'t the Fed control the federal funds rate today by adding or removing a few billion dollars of reserves?',
              answerOutline:
                'Reserves are abundant, so banks\' demand for them is flat at the rate the Fed pays on them; small changes in quantity do not move the price. The rate is set by IORB and ON RRP instead.',
            },
            {
              question: 'What does the ON RRP facility add that IORB alone does not?',
              answerOutline: 'A floor for non-banks such as money market funds, which cannot hold reserves and earn IORB, so they will not lend below the ON RRP rate.',
            },
            {
              question: 'In the pre-2008 system, how did an open market sale raise the funds rate?',
              answerOutline: 'Selling securities drained reserves; with scarce reserves and a downward-sloping demand curve, banks bid more for the remaining reserves, raising the rate.',
            },
          ],
        },
        {
          slug: 'transmission-mechanism',
          title: 'How monetary policy reaches the economy',
          summary:
            'A change in an overnight rate moves longer rates, asset prices, the exchange rate, credit and expectations, which shift aggregate demand. See the channels, the lags and the 2022–23 tightening as a case.',
          estimatedMinutes: 100,
          objectives: [
            'Trace a change in the policy rate through to aggregate demand and inflation',
            'Explain why expectations of future policy matter more than today\'s rate',
            'Describe the interest-rate, asset-price, exchange-rate and credit channels',
            'Explain why monetary policy works with long and variable lags',
            'Analyse the 2022–23 tightening with data, including what is disputed',
          ],
          concepts: [
            'Monetary transmission mechanism',
            'Expectations and forward guidance',
            'Interest-rate channel',
            'Wealth (asset-price) channel',
            'Exchange-rate channel',
            'Credit channel',
            'Long and variable lags',
            'Soft landing',
          ],
          explanation: `The Fed controls one overnight interest rate. Households and firms borrow at mortgage rates, car-loan rates and corporate bond yields, mostly for years. Policy works through how the overnight rate moves those.

**Expectations first.** A 10-year yield is roughly the average of the short rates markets expect over ten years, plus a term premium. So what matters is the expected *path* of the policy rate. That is why the Fed communicates its outlook (each quarter FOMC participants publish projections of the rate) and why markets move on a speech as much as on a decision.

**The channels.** A rise in the policy rate, expected to last:

1. **Interest-rate channel**: borrowing costs rise, so investment in equipment and housing and purchases of cars and other durables fall.
2. **Asset-price (wealth) channel**: future earnings are discounted more heavily, so stock and house prices tend to fall, and households feel poorer and spend less.
3. **Exchange-rate channel**: higher US rates attract foreign funds, the dollar appreciates, and net exports fall.
4. **Credit channel**: banks tighten lending standards and weaker borrowers lose access to credit.

Each channel lowers aggregate demand: in the AD-AS model AD shifts left, output falls relative to potential, and inflation slows. Expectations add a fifth effect: if people believe the central bank will bring inflation down, they set wages and prices accordingly, and SRAS shifts down too.

**Long and variable lags.** Milton Friedman stressed that policy takes effect with "long and variable lags". Estimates suggest the peak effect on output comes after one to two years, and on inflation later still, which is why central banks have to act on forecasts.

**A case: 2022–23.** The FOMC raised the target range from 0–0.25% in March 2022 to 5.25–5.50% in July 2023, the fastest tightening since the early 1980s. The 30-year mortgage rate rose from 2.65% in January 2021 to 7.79% in October 2023, and housing starts fell from 1.81 million (annual rate) in April 2022 to 1.30 million in December 2022 (FRED: MORTGAGE30US, HOUST). CPI inflation fell from 9.0% in June 2022 to 3.1% a year later, while unemployment, 3.4% in April 2023, rose only to about 4.2% by mid-2024 and no recession was declared, a **soft landing** that many forecasters had thought unlikely.

How much of the disinflation the rate rises caused is disputed. Some economists credit tighter policy and credible communication; others give more weight to the unwinding of supply bottlenecks and energy prices, which would have lowered inflation anyway. Both sides agree the lags make the question hard to settle.`,
          resources: [
            ostx('15-4-monetary-policy-and-economic-outcomes', 'Monetary policy and economic outcomes', 'Expansionary and contractionary policy in the AD-AS model.', true),
            mru('monetary-policy-and-the-federal-reserve', 'federal-reserve-monetary-policy-negative-shocks', 'The Fed and negative shocks', 'How policy responds to demand and supply shocks, and why supply shocks are harder.'),
            fred('MORTGAGE30US', '30-Year Fixed Rate Mortgage Average in the United States', 'Plot it with FEDFUNDS and DGS10 to see which it follows more closely.'),
          ],
          exercises: [
            {
              slug: 'trace-the-channels',
              title: 'Trace a rate cut',
              prompt:
                'The FOMC cuts the target range by 0.5 points and signals more cuts. For each of the four channels, describe what happens, which component of GDP it affects, and roughly how quickly. Then show the combined effect in an AD-AS diagram starting from a recessionary gap.',
              kind: 'writing',
              difficulty: 1,
            },
            {
              slug: 'expectations-yields',
              title: 'Expectations and long rates',
              prompt:
                'Suppose the 2-year yield equals the average of expected 1-year rates this year and next (no term premium). Today\'s 1-year rate is 4%. (a) If markets expect next year\'s 1-year rate to be 3%, what is the 2-year yield? (b) The Fed signals rates will stay at 4% next year instead. What happens to the 2-year yield and to the price of an existing 2-year zero-coupon bond paying USD 1,000? (c) Why does forward guidance move long rates even without a change in today\'s rate?',
              kind: 'problem',
              difficulty: 2,
              hint: '(a) About 3.5%. (b) The yield rises to 4%; the price falls from about 1,000/1.035² = 933.51 to 1,000/1.04² = 924.56. (c) Long rates depend on the expected path of short rates.',
            },
            {
              slug: 'tightening-2022',
              title: 'The 2022–23 tightening in data',
              prompt:
                'Using FRED, build a dashboard for January 2021 to December 2024 with FEDFUNDS, DGS10, MORTGAGE30US, HOUST, PCEPILFE (as percent change from a year ago) and UNRATE. Mark the first hike (March 2022) and the last (July 2023). In 300 words, describe the order in which the series responded, and say what you can and cannot conclude about how much the rate rises lowered inflation.',
              kind: 'data-analysis',
              difficulty: 3,
              hint: 'Mortgage rates and housing responded within months, before the funds rate peaked; core inflation peaked in late 2022. Many other things changed too (supply chains, energy, fiscal policy).',
            },
          ],
          selfAssessment: [
            {
              question: 'Why can the Fed lower long-term rates without changing today\'s federal funds rate?',
              answerOutline: 'Long rates reflect the expected future path of short rates. Credible signals that rates will stay lower for longer reduce long-term yields today.',
            },
            {
              question: 'Name the four channels of monetary transmission.',
              answerOutline: 'Interest rates on borrowing, asset prices and wealth, the exchange rate and net exports, and credit availability. Expectations amplify all four.',
            },
            {
              question: 'Why do long and variable lags make monetary policy difficult?',
              answerOutline:
                'Today\'s decision affects the economy one to two years later, when conditions may differ, so policy must rely on forecasts, and acting on current data risks responding too late or too much.',
            },
          ],
        },
        {
          slug: 'zero-lower-bound-and-qe',
          title: 'The zero lower bound, quantitative easing and forward guidance',
          summary:
            'When the policy rate reaches zero, central banks buy long-term bonds, promise to keep rates low, or even go negative. What they did in 2008–15 and 2020–22, how well it worked, and what it cost.',
          estimatedMinutes: 100,
          objectives: [
            'Explain why nominal interest rates have an effective lower bound near zero',
            'Explain how quantitative easing is meant to lower long-term rates',
            'Describe the US rounds of asset purchases and runoff with dates and magnitudes',
            'Explain forward guidance and negative interest rates as alternative tools',
            'Weigh the evidence on QE and the criticisms of it',
          ],
          concepts: [
            'Effective lower bound (zero lower bound)',
            'Quantitative easing (large-scale asset purchases)',
            'Term premium and portfolio balance',
            'Signalling channel',
            'Forward guidance',
            'Quantitative tightening (runoff)',
            'Negative policy rates',
            'Central bank remittances and the deferred asset',
          ],
          explanation: `A central bank cannot push its policy rate far below zero, because people can always hold cash, which pays zero. That **effective lower bound** bound the Fed from December 2008 to December 2015 and again from March 2020 to March 2022, with the target range at 0–0.25% (FRED: DFEDTARU). In both episodes the economy needed more support than a zero rate gave. The real rate $r = i - \\pi^e$ could only fall further if expected inflation rose.

**Quantitative easing (QE).** The Fed bought long-term Treasury bonds and agency mortgage-backed securities, paying with newly created reserves. Buying large amounts of long bonds reduces their supply to private investors, raising their prices and lowering their yields (the **portfolio balance** effect); it also signals that the Fed will keep short rates low for a long time (the **signalling** effect). Lower long-term and mortgage rates support investment, housing and asset prices, through the same channels as an ordinary rate cut.

**The US record.**

- QE1 (from November 2008), QE2 (2010–11) and QE3 (2012–14) took total assets from about USD 0.9 trillion to about USD 4.5 trillion.
- Runoff in 2017–19 reduced them modestly. Then, from March 2020, purchases in response to the pandemic took the balance sheet to USD 8.97 trillion by April 2022.
- **Quantitative tightening** (letting bonds mature without replacing them) ran from June 2022 to 1 December 2025. Total assets were USD 6.75 trillion on 4 November 2026 (FRED: WALCL).

**Forward guidance** is a promise about the future path of rates, for example the FOMC's 2011 statement that rates would stay exceptionally low "at least through mid-2013". It works only if believed. **Negative rates** were used by the European Central Bank (2014–2022), the Bank of Japan (2016–2024) and others; the Fed chose not to.

**Did it work?** Event studies of the first round, such as Gagnon, Raskin, Remache and Sack (2011), found that 10-year Treasury yields fell by roughly 0.9 points in total on the announcement days, with smaller effects in later rounds; how much that raised output and inflation is harder to measure. Critics argue that QE inflated asset prices and so favoured wealthier households, that it blurred the line between monetary policy and financing the government, and that it exposed the Fed to losses: since late 2022 the interest the Fed pays on reserves has exceeded the income on its bond holdings, and it records the shortfall as a **deferred asset**, sending no profits to the Treasury until it is repaid. Supporters reply that without QE the 2009–15 and 2020 recoveries would have been weaker and inflation lower still.`,
          resources: [
            mru('monetary-policy-and-the-federal-reserve', 'quantitative-easing', 'Quantitative easing', 'The idea and the evidence, briefly.'),
            ostx('15-5-pitfalls-for-monetary-policy', 'Pitfalls for monetary policy', 'Lags, the lower bound and asset bubbles.', true),
            { title: 'Policy Normalization', url: 'https://www.federalreserve.gov/monetarypolicy/policy-normalization.htm', type: 'documentation', cost: 'free', provider: 'Federal Reserve Board', note: 'The FOMC\'s own statements on shrinking and managing the balance sheet, including the 2025 decision to end runoff.' },
          ],
          exercises: [
            {
              slug: 'real-rate-at-zero',
              title: 'The real rate at the lower bound',
              prompt:
                'In a deep recession the Fed thinks a real rate of −3% is needed. (a) If expected inflation is 1%, what nominal rate is needed? Is it attainable? (b) What would expected inflation need to be for a 0% nominal rate to deliver the needed real rate? (c) Explain how QE and forward guidance each try to close the gap.',
              kind: 'problem',
              difficulty: 1,
              hint: '(a) −2%, not attainable (the bound is near 0). (b) 3%. (c) QE lowers long-term real rates directly; forward guidance lowers expected future short rates and can raise expected inflation.',
            },
            {
              slug: 'qe-yield-effect',
              title: 'Back-of-envelope QE',
              prompt:
                'Suppose, as a working assumption (published estimates vary widely), that each USD 100 billion of long-term Treasury purchases lowers the 10-year yield by 0.03 to 0.05 points. Estimate the effect of the USD 600 billion QE2 programme. Then find the 10-year yield (DGS10) on the QE2 announcement day, 3 November 2010, and a month later in FRED. Explain why the market yield may move differently from the estimate.',
              kind: 'data-analysis',
              difficulty: 2,
              hint: 'The estimate is 0.18 to 0.30 points lower. But the purchases were widely expected before the announcement, so much of the effect was already in prices, and yields then rose as the economic outlook improved.',
            },
            {
              slug: 'qe-debate',
              title: 'Judge QE',
              prompt:
                'Write 400 words assessing the Fed\'s pandemic-era asset purchases of 2020–22. Discuss what they were meant to do, one piece of evidence that they helped, two criticisms (including the deferred asset), and whether the Fed kept buying for too long. Take a position and state what would change your mind.',
              kind: 'writing',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'Why can\'t nominal interest rates go far below zero?',
              answerOutline: 'Cash pays zero, so if rates on deposits and bonds go well below zero people and firms switch to holding cash (minus storage and safety costs).',
            },
            {
              question: 'Through what two main channels is QE meant to lower long-term rates?',
              answerOutline: 'Portfolio balance (reducing the supply of long bonds and their term premium) and signalling (showing short rates will stay low).',
            },
            {
              question: 'What is the Fed\'s deferred asset?',
              answerOutline:
                'An accounting entry for operating losses since late 2022, when interest paid on reserves and reverse repos exceeded income from its securities. The Fed sends no profits to the Treasury until future earnings repay it.',
            },
          ],
        },
        {
          slug: 'inflation-targeting-and-rules',
          title: 'Inflation targeting and the Taylor rule',
          summary:
            'Why central banks announce numerical inflation targets, how the Fed\'s framework changed in 2012, 2020 and 2025, and how the Taylor rule describes the policy rate, computed with today\'s data.',
          estimatedMinutes: 100,
          objectives: [
            'Explain why an explicit inflation target helps anchor expectations',
            'Describe the Fed\'s 2012, 2020 and 2025 framework statements',
            'Compute the policy rate prescribed by the Taylor rule',
            'Explain why the Fed does not follow any rule mechanically, and what rules are still used for',
            'Compare rule prescriptions under different assumptions about the neutral rate',
          ],
          concepts: [
            'Inflation targeting',
            'Anchored inflation expectations',
            'Flexible inflation targeting',
            'Flexible average inflation targeting (2020)',
            'Taylor rule',
            'Neutral real interest rate r*',
            'Rules versus discretion',
          ],
          explanation: `**Inflation targeting.** New Zealand adopted the first explicit inflation target in 1990; most advanced economies followed. Announcing a number makes policy easier to judge and, if the central bank is believed, keeps **inflation expectations anchored**: firms and workers expect about 2% whatever this year's surprises, which makes inflation easier to keep there. Targeting is *flexible*: the bank also cares about employment and does not try to hit 2% every month.

**The Fed's framework.**

- **January 2012**: the FOMC set an explicit 2% goal for PCE inflation and described a balanced approach to its two mandates.
- **August 2020**: after a decade of inflation below 2% with rates near zero, it adopted *flexible average inflation targeting*: after periods of low inflation it would aim for inflation "moderately above 2 percent for some time", and it would respond to "shortfalls" of employment from its maximum rather than to deviations in both directions.
- **August 2025**: after the 2021–23 inflation, the revised statement dropped the make-up language and the word "shortfalls", returning to flexible inflation targeting much like the 2012 version, while keeping the 2% goal.

Critics argue that the 2020 framework made the Fed slower to respond in 2021; defenders say the delay owed more to the misreading of inflation as transitory than to the framework itself.

**The Taylor rule.** John Taylor (1993) showed that a simple formula described Fed policy well from 1987 to 1992:

$$
i = r^* + \\pi + 0.5\\,(\\pi - 2) + 0.5\\,(\\text{output gap}),
$$

where $i$ is the federal funds rate, $\\pi$ inflation over the past year, $r^*$ the **neutral real rate** (Taylor used 2) and the output gap is in percent of potential. It raises the rate more than one-for-one with inflation, so the real rate rises when inflation does.

**With today's data.** Core PCE inflation was 3.1% in September 2026, and real GDP was 1.7% above CBO's estimate of potential in Q3 2026. With $r^* = 2$:

$$
i = 2 + 3.1 + 0.5(1.1) + 0.5(1.7) = 6.5\\%.
$$

The actual range was 3.75–4.00%. With $r^* = 0.8$, closer to some current model estimates, the rule gives 5.3%, still above the actual rate. The gap shows why rules are used as benchmarks, not instructions: estimates of $r^*$ and of the output gap are very uncertain, the choice of inflation measure matters, and the Fed weighs risks and forecasts that no formula captures. The Fed's Monetary Policy Report shows several rules' prescriptions alongside the actual rate.

\`\`\`interactive
function-explorer
{"title": "The Taylor rule", "f": ["rs + x + 0.5*(x - 2) + 0.5*gap", "x"], "sliders": {"rs": [2, 0, 3, 0.1], "gap": [1.7, -6, 4, 0.1]}, "view": [0, 8, -2, 14], "caption": "The first line is the prescribed federal funds rate i against inflation x for given r* (rs) and output gap; the second is i = x, a zero real rate. The rule's slope is 1.5: each extra point of inflation raises i by 1.5 points. At x = 3.1, rs = 2 and gap = 1.7, read off i = 6.5. Lower rs to 0.8 and read 5.3. Set gap to −6, as in 2009, and see the rule ask for a negative rate at low inflation."}
\`\`\``,
          resources: [
            { title: 'Policy Rules and How Policymakers Use Them', url: 'https://www.federalreserve.gov/monetarypolicy/policy-rules-and-how-policymakers-use-them.htm', type: 'documentation', cost: 'free', provider: 'Federal Reserve Board', note: 'The Taylor rule and its variants, with the Fed\'s view on their limits.', primary: true },
            { title: '2025 Review of the Monetary Policy Framework', url: 'https://www.federalreserve.gov/monetarypolicy/review-of-monetary-policy-strategy-tools-and-communications.htm', type: 'documentation', cost: 'free', provider: 'Federal Reserve Board', note: 'The revised Statement on Longer-Run Goals (22 August 2025) and the review behind it.' },
            mru('monetary-policy-and-the-federal-reserve', 'federal-reserve-monetary-policy-changes', 'How the Fed\'s monetary policy has changed', 'Background on how Fed practice has evolved.'),
          ],
          exercises: [
            {
              slug: 'taylor-compute',
              title: 'Compute Taylor rule rates',
              prompt:
                'With $r^* = 2$, compute the Taylor rule rate for: (a) inflation 2%, gap 0; (b) inflation 5%, gap +1%; (c) inflation 1%, gap −5%; (d) inflation 7%, gap −1%. In which cases is the prescription unattainable? How would a rule with a coefficient of 1 on the output gap change (c)?',
              kind: 'problem',
              difficulty: 1,
              hint: '(a) 4%. (b) 2 + 5 + 1.5 + 0.5 = 9%. (c) 2 + 1 − 0.5 − 2.5 = 0%, just attainable. (d) 2 + 7 + 2.5 − 0.5 = 11%. With coefficient 1, (c) gives −2.5%, below the lower bound.',
            },
            {
              slug: 'taylor-history',
              title: 'The rule against history',
              prompt:
                'In a spreadsheet, compute the Taylor rule from 2000 to the latest quarter using core PCE inflation (PCEPILFE, percent change from a year ago, quarterly average), the output gap from GDPC1 and GDPPOT, and r* = 2. Plot it with the federal funds rate (FEDFUNDS, quarterly average). Identify the periods when the actual rate was well below the rule and say what the Fed was thinking in each.',
              kind: 'data-analysis',
              difficulty: 3,
              hint: 'Look at 2003–05, 2009–15 (the rule went negative), and 2021–22, when the rule rose far above zero while the Fed held at 0–0.25% until March 2022.',
            },
            {
              slug: 'framework-memo',
              title: 'Why change the framework back?',
              prompt:
                'Read the Fed\'s 2025 review page. In 300 words, explain what the 2020 framework changed, why it seemed sensible in 2020, why the FOMC revised it in 2025, and whether you think the 2020 framework contributed to the 2021–22 inflation. Cite at least two sources.',
              kind: 'reading',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does the Taylor rule raise the policy rate by more than one point for each one-point rise in inflation?',
              answerOutline:
                'So that the real interest rate rises when inflation rises, restraining demand. Raising the nominal rate only one-for-one would leave the real rate unchanged (the Taylor principle).',
            },
            {
              question: 'What does an anchored inflation expectation mean, and why does it help?',
              answerOutline:
                'People expect inflation near the target in the medium term regardless of current shocks. Wage and price setting then pushes inflation back towards the target, so shocks fade faster.',
            },
            {
              question: 'Give two reasons the Fed does not set rates mechanically by the Taylor rule.',
              answerOutline:
                'Uncertainty about r* and the output gap, the choice of inflation measure, the effective lower bound, and risks or forecasts not captured by current data. Any two.',
            },
          ],
        },
      ],
    },
    {
      slug: 'fiscal-policy-and-debt',
      title: 'Fiscal Policy and Government Debt',
      description:
        'What the federal government spends and collects, how discretionary policy and automatic stabilisers affect the economy, and the arithmetic of deficits and debt, with CBO\'s current projections and the debate over how much debt is too much.',
      lessons: [
        {
          slug: 'the-federal-budget',
          title: 'The federal budget: spending, revenue, deficits and debt',
          summary:
            'Where federal money comes from and goes, the difference between the deficit and the debt, gross debt versus debt held by the public, and marginal versus average tax rates, with fiscal year 2026 figures.',
          estimatedMinutes: 90,
          objectives: [
            'Describe the main categories of federal spending and revenue with current magnitudes',
            'Distinguish mandatory, discretionary and interest spending',
            'Distinguish the deficit (a flow) from the debt (a stock), and gross debt from debt held by the public',
            'Compute average and marginal tax rates under a progressive schedule',
            'Express budget figures as shares of GDP and explain why that is the right scale',
          ],
          concepts: [
            'Fiscal year',
            'Outlays and receipts',
            'Mandatory, discretionary and net interest spending',
            'Budget deficit and surplus',
            'Primary deficit',
            'Debt held by the public versus gross debt',
            'Progressive taxation',
            'Marginal versus average tax rate',
          ],
          explanation: `The federal **fiscal year** runs from 1 October to 30 September. In fiscal year 2026, which ended on 30 September 2026, the Congressional Budget Office's Monthly Budget Review (8 October 2026) estimated **outlays** of about USD 7.4 trillion and **receipts** of USD 5.4 trillion, a **deficit** of about USD 2.0 trillion, or 6.2% of GDP, up from USD 1.8 trillion (5.8%) in 2025. Nominal figures this large are hard to interpret, so economists divide by GDP.

**Spending** falls into three groups:

- **Mandatory** spending, set by existing law rather than annual appropriations: Social Security (the largest single program), Medicare, Medicaid, and other benefits.
- **Discretionary** spending, voted each year: defence and non-defence programmes from highways to scientific research.
- **Net interest** on the debt. It was about USD 970 billion in 2025 and rose by about USD 115 billion in 2026, making it the second-largest expenditure after Social Security.

**Revenue** comes mostly from individual income taxes, then payroll taxes (which fund Social Security and Medicare), corporate income taxes, and smaller items such as excise taxes and customs duties. Customs revenue rose sharply with the tariffs imposed in 2025. On 20 February 2026 the Supreme Court ruled in *Learning Resources v. Trump* that the International Emergency Economic Powers Act does not authorise tariffs, and refunds of tariffs collected under it reduced customs receipts later in the year.

**Deficit and debt.** The deficit is a flow: how much the government borrows in a year. The **debt** is the stock: the total owed. Each year's deficit adds to the debt. At the end of fiscal 2026, **debt held by the public** (by investors, foreign governments and the Federal Reserve) was about USD 32.4 trillion, roughly 100% of GDP. **Gross debt**, USD 39.5 trillion in mid-2026, also counts debt the Treasury owes to federal trust funds such as Social Security's; economists prefer debt held by the public because that is what is borrowed from the rest of the economy. The **primary deficit** excludes interest: it measures whether current programmes are paid for.

**Progressive taxes.** The federal income tax is **progressive**: higher slices of income are taxed at higher rates. Suppose income up to 20,000 is taxed at 10%, from 20,000 to 80,000 at 20%, and above 80,000 at 30%. A person earning 100,000 pays $2{,}000 + 12{,}000 + 6{,}000 = 20{,}000$: an **average rate** of 20% but a **marginal rate** of 30% on the next dollar. A raise never reduces after-tax income under such a schedule, a common misunderstanding.`,
          resources: [
            ostx('17-1-government-spending', 'Government spending', 'The composition of federal, state and local spending.', true),
            ostx('17-3-federal-deficits-and-the-national-debt', 'Federal deficits and the national debt', 'Deficits, debt and their history as a share of GDP.'),
            { title: 'Monthly Budget Review: Summary for Fiscal Year 2026', url: 'https://www.cbo.gov/system/files/2026-10/61985-MBR.pdf', type: 'documentation', cost: 'free', provider: 'Congressional Budget Office', note: 'CBO\'s estimate of fiscal 2026 receipts, outlays and the deficit by category (8 October 2026). CBO may block scripts; open it in a browser.' },
          ],
          exercises: [
            {
              slug: 'shares-of-gdp',
              title: 'Put the budget on a GDP scale',
              prompt:
                'Using the lesson\'s fiscal 2026 figures and a fiscal-year GDP of about USD 32.3 trillion, compute outlays, receipts and the deficit as percentages of GDP. Net interest was about USD 1.08 trillion: what share of GDP and of receipts was it? Compute the primary deficit in dollars and as a share of GDP.',
              kind: 'problem',
              difficulty: 1,
              hint: 'Outlays ≈ 22.9%, receipts ≈ 16.7%, deficit ≈ 6.2%. Interest ≈ 3.3% of GDP and 20% of receipts. Primary deficit ≈ 2.0 − 1.08 = 0.92 trillion, about 2.8% of GDP. Figures are rounded, so small differences are expected.',
            },
            {
              slug: 'tax-schedule',
              title: 'Average and marginal rates',
              prompt:
                'Using the lesson\'s schedule (10% to 20,000; 20% from 20,000 to 80,000; 30% above), compute tax, average rate and marginal rate for incomes of 15,000, 50,000, 80,000 and 250,000. Plot the average rate against income. Explain why the average rate is always below the top marginal rate.',
              kind: 'problem',
              difficulty: 1,
              hint: '15,000: 1,500, 10%, 10%. 50,000: 8,000, 16%, 20%. 80,000: 14,000, 17.5%, 20% (30% on the next dollar). 250,000: 65,000, 26%, 30%.',
            },
            {
              slug: 'budget-history',
              title: 'Deficits since 1970',
              prompt:
                'In FRED, plot FYFSGDA188S (federal surplus or deficit as a percentage of GDP) and FYGFGDQ188S (debt held by the public as a percentage of GDP) from 1970. Identify the five largest deficits as a share of GDP and what caused each. When did the budget last show a surplus, and why?',
              kind: 'data-analysis',
              difficulty: 2,
              hint: 'The largest are in 2020, 2021, 2009, 2010 and 2011. The last surpluses were fiscal 1998–2001, helped by strong growth, a stock market boom in capital gains revenue and spending restraint.',
            },
          ],
          selfAssessment: [
            {
              question: 'What is the difference between the deficit and the debt?',
              answerOutline: 'The deficit is the annual shortfall of receipts below outlays (a flow); the debt is the accumulated total of past borrowing (a stock). Deficits add to the debt.',
            },
            {
              question: 'Why do economists focus on debt held by the public rather than gross debt?',
              answerOutline:
                'Gross debt includes what the Treasury owes to its own trust funds, an internal transfer. Debt held by the public is what the government has borrowed from investors and must service in markets.',
            },
            {
              question: 'Someone says "a raise pushed me into a higher bracket so I take home less". What is wrong?',
              answerOutline: 'Only income above the bracket threshold is taxed at the higher rate, so after-tax income still rises with every extra dollar earned under a bracket schedule.',
            },
          ],
        },
        {
          slug: 'fiscal-policy-and-stabilisers',
          title: 'Fiscal policy and automatic stabilisers',
          summary:
            'Using spending and taxes to stabilise demand: discretionary policy, its lags and its multipliers, the automatic stabilisers built into the budget, and the record of 2009, 2020 and 2021, including the debate over its role in inflation.',
          estimatedMinutes: 100,
          objectives: [
            'Show expansionary and contractionary fiscal policy in the AD-AS model',
            'Explain the lags that make discretionary policy hard to time',
            'Explain how automatic stabilisers work and why they reduce the multiplier',
            'Distinguish the cyclical from the structural deficit',
            'Assess the 2009, 2020 and 2021 fiscal packages, including the disagreement over 2021',
          ],
          concepts: [
            'Expansionary and contractionary fiscal policy',
            'Discretionary fiscal policy',
            'Recognition, legislative and implementation lags',
            'Automatic stabilisers',
            'Cyclical versus structural deficit',
            'Fiscal multiplier (recap)',
            'Temporary versus permanent tax changes',
          ],
          explanation: `**Fiscal policy** is the use of government spending and taxes to influence the economy. **Expansionary** policy, higher spending or lower taxes, shifts aggregate demand right; **contractionary** policy shifts it left. The previous module's multipliers tell you how far.

**Discretionary policy and its lags.** A deliberate change in policy has to get through three lags. The *recognition lag*: recessions are dated months after they begin. The *legislative lag*: Congress must agree. The *implementation lag*: spending on projects takes years, though cheques and tax changes are faster. By the time stimulus arrives, the recession may be over. That is one reason many economists prefer monetary policy for routine stabilisation, and fiscal policy for deep slumps or when interest rates are at zero.

**Automatic stabilisers** need no new legislation. In a recession, income tax receipts fall automatically (more so with progressive rates), while spending on unemployment insurance, SNAP (food assistance) and Medicaid rises. Both cushion disposable income. In the Keynesian cross a proportional tax lowers the slope of AE, so the same fall in investment does less damage.

\`\`\`interactive
keynesian-cross
{"title": "Taxes as an automatic stabiliser", "mpc": 0.75, "auto": 800, "taxes": "proportional", "rate": 0.2, "dA": -100, "zoom": true, "unit": "bn", "caption": "Investment falls by 100. With a 20% income tax the multiplier is 1/(1 − 0.75 × 0.8) = 2.5, so output falls by 250. Play the rounds, then drag the tax rate to 0: the same shock now costs 400. Taxes that fall with income absorb part of each round."}
\`\`\`

**Cyclical and structural deficits.** Because stabilisers widen the deficit in recessions, the headline deficit mixes two things. The **cyclical** part is caused by the business cycle and disappears as output returns to potential; the **structural** part is the deficit that would remain at full employment. CBO publishes estimates of both. A large structural deficit at full employment, as in 2026, signals a long-run imbalance rather than a stabiliser at work.

**The record.**

- *2009*: the American Recovery and Reinvestment Act, estimated by CBO at USD 787 billion when enacted (later revised to about 836 billion), combined tax cuts, aid to states and infrastructure. CBO's later estimates put its peak effect on output, in 2010, in a wide range from under 1% to about 4%, a range that reflects the multiplier uncertainty of Module 6.
- *2020*: the CARES Act (March 2020, about USD 2.2 trillion) and later packages included cheques, much more generous unemployment insurance and loans to small firms. The deficit reached 14.7% of GDP in fiscal 2020, the largest since 1945.
- *2021*: the American Rescue Plan (March 2021, about USD 1.9 trillion) came when the economy was already recovering. Economists including Lawrence Summers and Jason Furman warned in early 2021 that it was large relative to the output gap and risked inflation; others argued it insured against a weak recovery. Studies since disagree about how much of the 2021–22 inflation it explains, with estimates ranging from a small part to a few percentage points (Module 9).

Another channel is **expectations**: a tax cut that households expect to be temporary, or to be followed by higher taxes, has a smaller effect on spending than a permanent one.`,
          resources: [
            ostx('17-4-using-fiscal-policy-to-fight-recession-unemployment-and-inflation', 'Using fiscal policy to fight recession, unemployment and inflation', 'Expansionary and contractionary policy in the AD-AS model.', true),
            ostx('17-5-automatic-stabilizers', 'Automatic stabilizers', 'How the budget responds to the cycle by itself, and the standardized employment deficit.'),
            mru('fiscal-policy', 'fiscal-policy-limitations', 'Limits of fiscal policy', 'Lags, crowding out and timing. The same unit has a video on the dangers of fiscal policy.'),
          ],
          exercises: [
            {
              slug: 'stimulus-sizing',
              title: 'Size a stimulus',
              prompt:
                'Potential output is USD 25 trillion and output is 3% below it. Assume a spending multiplier of 1.5 and a tax multiplier of −1. (a) How large an increase in government purchases would close the gap? (b) How large a tax cut? (c) If the true spending multiplier is 0.8, how much of the gap does your answer to (a) close? (d) What if it is 2.5? What does this say about designing stimulus under uncertainty?',
              kind: 'problem',
              difficulty: 2,
              hint: 'Gap = 0.75 trillion. (a) 0.5 trillion. (b) 0.75 trillion. (c) 0.4 trillion, about 53%. (d) 1.25 trillion, overshooting by 0.5 trillion.',
            },
            {
              slug: 'stabiliser-arithmetic',
              title: 'Measure a stabiliser',
              prompt:
                'In the Keynesian cross with MPC = 0.8, compare the effect of a 200 fall in investment with (a) no taxes, (b) a 25% proportional tax and (c) a 25% tax plus unemployment insurance that replaces 10% of lost income (so disposable income falls by only $(1 - 0.25 - 0.10)$ per dollar of lost output, approximately). Compute each multiplier and output fall.',
              kind: 'problem',
              difficulty: 2,
              hint: '(a) 5, −1,000. (b) 1/(1 − 0.6) = 2.5, −500. (c) slope 0.8 × 0.65 = 0.52, multiplier ≈ 2.08, −417.',
            },
            {
              slug: 'arp-debate',
              title: 'Was the 2021 package too big?',
              prompt:
                'Read at least two contrasting assessments of the American Rescue Plan\'s effect on inflation (for example a Federal Reserve Bank research note and a Brookings or Peterson Institute analysis). In 400 words, summarise each argument, the evidence it uses, and how its estimate of the inflation effect differs. Conclude with what you think and how confident you are.',
              kind: 'reading',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'Name the three lags of discretionary fiscal policy.',
              answerOutline: 'Recognition (seeing the problem), legislative (passing a law) and implementation (getting the money spent or the tax change into pay).',
            },
            {
              question: 'Why do automatic stabilisers make recessions milder without any new law?',
              answerOutline:
                'Tax receipts fall and transfer payments rise automatically when incomes fall, so disposable income and spending fall less; the multiplier is smaller.',
            },
            {
              question: 'What is the difference between the cyclical and the structural deficit?',
              answerOutline: 'The cyclical deficit is caused by the business cycle and disappears at potential output; the structural deficit would remain at full employment.',
            },
          ],
        },
        {
          slug: 'debt-dynamics',
          title: 'Debt dynamics, r − g and the long-run cost of debt',
          summary:
            'The debt ratio rises with the primary deficit and with the gap between the interest rate and growth. Project US debt with CBO\'s numbers, find the primary balance that stabilises it, and weigh the arguments over how much debt is too much.',
          estimatedMinutes: 110,
          objectives: [
            'Derive the debt-dynamics equation for the debt-to-GDP ratio',
            'Explain why the sign of r − g matters so much',
            'Compute the primary balance that stabilises the debt ratio',
            'Summarise CBO\'s February 2026 projections and what drives them',
            'Explain crowding out, Ricardian equivalence and the main arguments about the costs of high debt',
          ],
          concepts: [
            'Debt-to-GDP ratio',
            'Debt dynamics equation',
            'Interest rate minus growth rate (r − g)',
            'Primary balance',
            'Debt-stabilising primary balance',
            'Long-run crowding out',
            'Ricardian equivalence',
            'Fiscal space and fiscal risk',
          ],
          explanation: `What matters for a government's ability to pay is debt relative to the economy, $d = D/Y$. Next year's debt is this year's debt plus interest plus the **primary deficit** $PD$ (spending other than interest, minus revenue): $D' = (1+r)D + PD$, where $r$ is the average nominal interest rate on the debt. Divide by next year's GDP, $Y' = (1+g)Y$ with $g$ nominal growth:

$$
d' = \\frac{1 + r}{1 + g}\\,d + p,
$$

where $p$ is the primary deficit as a share of GDP. Two forces move the ratio. If $r > g$, interest makes debt grow faster than the economy, so even a balanced primary budget lets the ratio rise. If $r < g$, growth erodes the ratio. The primary balance that holds $d$ constant is

$$
p^* = d\\,\\frac{g - r}{1 + g}.
$$

**The US in numbers.** CBO's *Budget and Economic Outlook: 2026 to 2036* (February 2026) projected debt held by the public rising from about 101% of GDP in 2026 to about 120% in 2036, passing the 1946 record of 106% by 2030. Net interest rises from 3.3% of GDP in 2026 to 4.6% in 2036, while the primary deficit is about 2.6% of GDP in 2026 and 2.1% in 2036. Most of the rise in debt comes from interest. With $d = 101$, $r = 3.6\\%$, $g = 4.0\\%$ and $p = 2.3$, the formula gives about 120% after ten years, close to CBO's path. The stabilising primary balance at those rates is $101 \\times 0.004/1.04 \\approx 0.4\\%$ of GDP, so stabilising the ratio would need the primary deficit cut by about 2 points of GDP, roughly USD 600–700 billion a year.

\`\`\`interactive
debt-dynamics
{"d0": 101, "r": 3.6, "g": 4.0, "p": 2.3, "years": 30, "startYear": 2026, "marks": [[2036, 120.2]], "markLabel": "CBO Feb 2026:", "ref": 106, "refLabel": "1946 record, 106%", "caption": "With r = 3.6%, g = 4.0% and a primary deficit of 2.3% of GDP the ratio reaches about 120% in 2036, near CBO's projection (hollow dot). Set p to 0.4: the line goes flat. Raise r to 5% with p = 2.3 and see how fast debt compounds when r > g; then try r = 2% and g = 5%, roughly the 2010s, when even large deficits rose slowly."}
\`\`\`

**Why debt might matter.** Government borrowing absorbs saving that would otherwise fund private capital (crowding out, Module 4), lowering future incomes, and more future taxes go to interest. High debt also reduces *fiscal space* for the next recession, and if investors doubted repayment, rates could jump. **Ricardian equivalence** (Robert Barro, 1974) argues that rational households save more when deficits rise, anticipating future taxes, so deficits change neither demand nor interest rates; the evidence suggests households offset only part of a deficit.

**The debate.** Olivier Blanchard's 2019 presidential address to the American Economic Association argued that when $r < g$, as it was for most of the 2010s, debt has a low fiscal cost. Since 2022 interest rates have risen, and CBO's projections now have $r$ close to or above $g$. Some economists argue the US, which borrows in its own currency and issues the world's main reserve asset, can carry much higher debt; others warn that rising interest costs will squeeze other spending and that a crisis of confidence cannot be ruled out. The arithmetic above is not in dispute; the right level of debt is.`,
          resources: [
            { title: 'The Budget and Economic Outlook: 2026 to 2036', url: 'https://www.cbo.gov/publication/61882', type: 'documentation', cost: 'free', provider: 'Congressional Budget Office', note: 'CBO\'s ten-year projections (11 February 2026). Read the summary and the debt chapter. CBO may block scripts; open it in a browser.', primary: true },
            ostx('18-4-fiscal-policy-investment-and-economic-growth', 'Fiscal policy, investment and economic growth', 'Long-run crowding out and the growth effects of deficits.'),
            mru('the-federal-budget-taxes-and-spending', 'debt-vs-deficit', 'Debt versus deficit', 'A short video on the flow and the stock.'),
          ],
          exercises: [
            {
              slug: 'debt-arithmetic',
              title: 'Iterate the debt ratio',
              prompt:
                'Start with $d = 100\\%$. Compute the ratio after 1, 5 and 10 years in each case: (a) $r = 4\\%$, $g = 4\\%$, $p = 2\\%$; (b) $r = 5\\%$, $g = 4\\%$, $p = 0$; (c) $r = 2\\%$, $g = 5\\%$, $p = 3\\%$. For each, compute the stabilising primary balance.',
              kind: 'problem',
              difficulty: 2,
              hint: '(a) 102, 110, 120; p* = 0. (b) 100.96, 104.9, 110.0; p* = −0.96 (a surplus). (c) 100.14, about 100.7, about 101.3 (it converges towards p(1+g)/(g − r) = 105); p* = 2.86.',
            },
            {
              slug: 'cbo-check',
              title: 'Reproduce CBO with the formula',
              prompt:
                'Using the CBO February 2026 projections (debt 101% in 2026; net interest 3.3% of GDP in 2026 rising to 4.6% in 2036; primary deficit about 2.6% falling to 2.1%), choose values of r and g that make the simple formula land within 2 points of 120% in 2036. Explain why the average interest rate on the debt rises more slowly than market rates, and what happens to your projection if r is 1 point higher than you assumed.',
              kind: 'simulation',
              difficulty: 3,
              hint: 'r ≈ 3.5–3.7% with g ≈ 4% works. The average rate rises slowly because only maturing debt is refinanced at new rates. One point higher r adds about 10 points of GDP over ten years.',
            },
            {
              slug: 'debt-essay',
              title: 'How much debt is too much?',
              prompt:
                'Write a 500-word essay on whether the US should aim to stabilise its debt-to-GDP ratio within the next ten years. Use the debt-dynamics equation, CBO\'s projections, the r − g argument, crowding out and Ricardian equivalence. Present the strongest case on each side before giving your view, and say what evidence would change it.',
              kind: 'writing',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'Why can the debt ratio fall even while the government runs a primary deficit?',
              answerOutline: 'If nominal growth g exceeds the interest rate r by enough, the denominator grows faster than the debt, which can outweigh a small primary deficit.',
            },
            {
              question: 'Write the primary balance that stabilises the debt ratio and interpret it.',
              answerOutline: 'p* = d(g − r)/(1 + g). If r > g, p* is negative: a primary surplus is needed. If r < g, a primary deficit can be sustained.',
            },
            {
              question: 'What does Ricardian equivalence predict about a debt-financed tax cut, and does the evidence support it?',
              answerOutline:
                'Households save the whole tax cut to pay expected future taxes, so spending and interest rates are unchanged. Evidence suggests only partial offset; many households spend part of tax cuts.',
            },
          ],
        },
      ],
      project: {
        slug: 'debt-sustainability-sheet',
        title: 'A debt sustainability spreadsheet',
        description: `Build a spreadsheet that projects the US debt held by the public for 30 years from the latest CBO starting point. Inputs: starting debt ratio, a path for the primary deficit, nominal GDP growth and the average interest rate, each allowed to change by year. Reproduce CBO's February 2026 baseline to within 2 points of GDP in 2036, then run three scenarios: interest rates 1 point higher, growth 0.5 points lower, and a fiscal plan that cuts the primary deficit by 0.2 points of GDP a year for ten years. Report the debt ratio and net interest as a share of GDP in 2036 and 2056 for each, with a chart, and write 500 words on what the scenarios show and which assumptions matter most.`,
        deliverables: [
          'A spreadsheet with an inputs sheet, a projection sheet and a check against CBO\'s 2036 figure',
          'A chart of the debt ratio under the baseline and three scenarios',
          'A 500-word memo with a table of 2036 and 2056 results',
        ],
        estimatedHours: 4,
        stretchGoals: [
          'Model the average interest rate as a weighted average of maturing debt refinanced at the market rate and existing debt at its old rate, and compare the path with a constant r',
        ],
      },
    },
    {
      slug: 'inflation-unemployment-open-economy',
      title: 'Inflation, Unemployment and the Open Economy',
      description:
        'The Phillips curve and the role of expectations, the two great US inflations of the 1970s and 2021–23, then the open economy: the balance of payments, the saving-investment identity with trade, exchange rates and purchasing power parity.',
      lessons: [
        {
          slug: 'the-phillips-curve',
          title: 'The Phillips curve and expectations',
          summary:
            'From a stable trade-off between inflation and unemployment to the expectations-augmented Phillips curve, the natural rate and anchored expectations, and why the curve seemed flat in the 2010s and steep in 2021–22.',
          estimatedMinutes: 110,
          objectives: [
            'Describe the original Phillips curve and the 1960s idea of a policy menu',
            'Write and use the expectations-augmented Phillips curve',
            'Explain why the long-run Phillips curve is vertical at the natural rate',
            'Show how adaptive expectations make inflation accelerate if unemployment is held below the natural rate',
            'Explain the flattening of the curve and the debate over its steepening in 2021–22',
          ],
          concepts: [
            'Phillips curve',
            'Policy menu (Samuelson and Solow)',
            'Expected inflation',
            'Expectations-augmented Phillips curve',
            'Long-run vertical Phillips curve',
            'NAIRU',
            'Adaptive versus rational expectations',
            'Anchored expectations and a flat curve',
          ],
          explanation: `In 1958 A. W. Phillips showed that UK wage inflation had been high when unemployment was low, across almost a century of data. In 1960 Paul Samuelson and Robert Solow found a similar pattern for US price inflation and described it as a **menu** for policy: choose lower unemployment and accept higher inflation, or the reverse. In the 1960s US policy moved along that curve.

**Expectations.** Milton Friedman (1968) and Edmund Phelps (1967) argued that the trade-off could not last. Workers and firms care about *real* wages and prices, so they build **expected inflation** $\\pi^e$ into wage and price setting. The **expectations-augmented Phillips curve** is

$$
\\pi = \\pi^e - \\beta\\,(u - u^*) + v,
$$

where $u^*$ is the natural rate, $\\beta > 0$ measures how strongly a tight labour market pushes up inflation, and $v$ is a supply shock (an oil price jump raises $v$). This is the AD-AS model in other clothes: low unemployment is a positive output gap, and $\\pi^e$ plays the role of the expected price level that positions SRAS.

**Why the long run is vertical.** Suppose $\\pi^e = 2$, $\\beta = 0.5$ and $u^* = 4.4$. If policy pushes unemployment to 3.4%, inflation is $2 - 0.5(3.4 - 4.4) = 2.5\\%$. If people form expectations from last year's inflation, next year $\\pi^e = 2.5$ and, with unemployment still 3.4%, inflation is 3.0%, then 3.5%, and so on. Holding unemployment below $u^*$ makes inflation *accelerate*, which is why $u^*$ is also called the **non-accelerating inflation rate of unemployment (NAIRU)**. Inflation is stable only at $u = u^*$, whatever the inflation rate: the long-run curve is vertical. The 1970s, with high inflation and high unemployment together, looked like a refutation of the menu and a confirmation of Friedman and Phelps.

\`\`\`interactive
function-explorer
{"title": "Short-run Phillips curves", "f": ["pe - b*(x - un)", "pe + 2 - b*(x - un)"], "sliders": {"pe": [2, 0, 8, 0.1], "b": [0.5, 0.1, 1.5, 0.05], "un": [4.4, 3, 7, 0.1]}, "view": [0, 10, -2, 10], "caption": "x is unemployment (%) and the vertical axis inflation (%). The first line is the short-run curve with expected inflation pe; the second is the same curve after expectations rise by 2 points. Both cross the natural rate un at inflation equal to expectations. Read inflation at x = 3.4 (2.5%), then raise pe to 2.5 and read again (3.0%): that is the acceleration in the lesson. Lower b to 0.1 to see the flat curve of the 2010s."}
\`\`\`

**Rational expectations.** Robert Lucas and Thomas Sargent argued that people use all available information, including what the central bank says, so a *credible* disinflation could be cheap. In practice the Volcker disinflation of 1979–83 was costly, though perhaps less than adaptive expectations predicted.

**Flat and steep.** In the 2010s unemployment fell to 3.5% (2019) with core inflation still below 2%: the curve looked very **flat**, often attributed to well-**anchored expectations** around the Fed's target. Then in 2021–22 inflation rose fast as the labour market tightened, with job vacancies about twice the number of unemployed workers in 2022. Some economists, such as Pierpaolo Benigno and Gauti Eggertsson (2023), argue the curve is non-linear, steep when labour markets are very tight; others attribute most of the 2021–22 rise to supply shocks ($v$) and see the curve as still fairly flat. The next lesson examines both inflations.`,
          resources: [
            ostx('12-3-the-phillips-curve', 'The Phillips curve', 'The curve, its breakdown in the 1970s and its relation to AD-AS.', true),
            core('04-inflation-and-employment-01-cost-of-living-crisis', 'Unit 4, Inflation and unemployment', 'CORE\'s chapter on the Phillips curve, wage setting and the 2021–23 cost-of-living crisis.'),
            mru('business-cycle-theories', 'business-cycles-monetarists', 'Monetarist business cycle theory', 'The expectations argument as Friedman made it.'),
          ],
          exercises: [
            {
              slug: 'accelerate',
              title: 'Make inflation accelerate',
              prompt:
                'With $\\pi = \\pi^e - 0.5(u - 4.4)$ and adaptive expectations $\\pi^e_t = \\pi_{t-1}$, start from $\\pi = 2$. (a) Policy holds $u = 3.4$ for five years: list inflation each year. (b) Policy then wants to return to 2% inflation within four years. What unemployment rate, held constant, achieves that? (c) Compute the "sacrifice": total point-years of unemployment above 4.4% per point of inflation removed.',
              kind: 'problem',
              difficulty: 2,
              hint: '(a) 2.5, 3.0, 3.5, 4.0, 4.5. (b) Inflation must fall 2.5 points over 4 years, 0.625 a year, so u − 4.4 = 1.25 and u = 5.65. (c) 4 × 1.25 = 5 point-years for 2.5 points, a ratio of 2.',
            },
            {
              slug: 'plot-the-curve',
              title: 'Find the Phillips curve in the data',
              prompt:
                'Download annual averages of UNRATE and the December-to-December change in CPIAUCSL (or core PCE) for 1960–1969, 1970–1985, 1995–2019 and 2020–latest. Make a scatter plot for each period. Describe the slope in each and connect the differences to expectations and supply shocks.',
              kind: 'data-analysis',
              difficulty: 2,
              hint: 'The 1960s show a clear negative slope; 1970–85 shows loops that shift up and out; 1995–2019 is nearly flat; 2021–22 jumps up.',
            },
            {
              slug: 'anchoring',
              title: 'What anchored expectations buy',
              prompt:
                'In 250 words, explain why a central bank with well-anchored inflation expectations can let unemployment fall further before inflation rises, and why losing that anchor is costly. Use the expectations-augmented Phillips curve and give one indicator of expectations you could check in FRED.',
              kind: 'writing',
              difficulty: 2,
              hint: 'Indicators include T5YIFR or T10YIE (market-based) and MICH (University of Michigan survey of one-year expectations).',
            },
          ],
          selfAssessment: [
            {
              question: 'Why does the expectations-augmented Phillips curve imply no long-run trade-off?',
              answerOutline:
                'Inflation is stable only when actual equals expected inflation, which happens at u = u*. Any inflation rate can be consistent with u*, so the long-run curve is vertical.',
            },
            {
              question: 'What happens if a central bank keeps unemployment below the NAIRU and expectations are adaptive?',
              answerOutline: 'Inflation rises each period as expectations catch up with past inflation: it accelerates.',
            },
            {
              question: 'Give two explanations for the flat Phillips curve of the 2010s.',
              answerOutline:
                'Anchored inflation expectations, a lower natural rate than estimated, globalisation and competition, measurement problems. Any two.',
            },
          ],
        },
        {
          slug: 'two-great-inflations',
          title: 'Two great inflations: the 1970s and 2021–23',
          summary:
            'How US inflation reached double digits in the 1970s and how Paul Volcker brought it down, then what drove inflation to 9% in 2022, how it fell, and where economists still disagree.',
          estimatedMinutes: 110,
          objectives: [
            'Describe the course of US inflation, unemployment and interest rates from 1965 to 1985',
            'Weigh the main explanations for the Great Inflation',
            'Describe the Volcker disinflation and its costs',
            'Describe the 2021–23 inflation with data and the main competing explanations',
            'Compare the two episodes using the AD-AS model and the Phillips curve',
          ],
          concepts: [
            'Great Inflation',
            'Oil price shocks',
            'Wage-price spiral',
            'Volcker disinflation',
            'Sacrifice ratio',
            'Pandemic-era inflation',
            'Supply-chain and energy shocks',
            '"Transitory" inflation',
          ],
          explanation: `**The Great Inflation, 1965–1982.** CPI inflation was about 1–2% in the early 1960s, rose to 4.7% in 1968 and 5.6% in 1970, then reached 12.2% in November 1974 and 14.6% in March 1980 (12-month changes, seasonally adjusted CPI-U on FRED). Unemployment also rose, peaking at 9.0% in 1975 and 10.8% in November 1982.

Several explanations compete, and most economists combine them:

- *Monetary policy*. The Fed, especially under Arthur Burns (1970–78), kept real interest rates low or negative, partly from belief in an exploitable Phillips curve, partly from underestimating the natural rate, and partly under political pressure (the Nixon tapes record it).
- *Supply shocks*. Oil prices quadrupled after the 1973 embargo and more than doubled again in 1979–80; food prices also jumped. These raised $v$ in the Phillips curve.
- *Expectations*. As inflation persisted, it was built into wage contracts and price setting, so each shock left inflation higher.
- *Institutions*. The end of the Bretton Woods fixed exchange rates in 1971 removed an external anchor; wage and price controls in 1971–74 suppressed inflation briefly and then released it.

**Volcker.** Paul Volcker became Fed chair in August 1979. In October 1979 the Fed switched to targeting reserves, and interest rates soared: the federal funds rate averaged 19.1% in June 1981. Two recessions followed (1980 and 1981–82). Inflation fell to about 2.5% by mid-1983. Estimates of the cost, the **sacrifice ratio**, vary, but the episode established that the Fed could and would stop inflation, which helped anchor expectations for decades.

**2021–23.** CPI inflation rose from 1.3% in December 2020 to 7.2% in December 2021 and 9.0% in June 2022 (9.1% in the headline not-seasonally-adjusted figure BLS reported); core PCE inflation peaked at 5.6% in September 2022. The Fed, which in 2021 judged inflation "transitory", began raising rates in March 2022. Inflation was back near 3% by mid-2023 without a recession, although it was still above 2% in 2025 and rose again in 2026, to 3.7% in September (causes still debated as of November 2026).

What caused the surge? *Demand*: large fiscal transfers in 2020–21, high household saving and near-zero rates raised spending. *Supply*: shutdowns, shipping and chip shortages, and a shift of spending from services to goods that factories could not meet. *Energy and food*: Russia's invasion of Ukraine in February 2022. *Labour markets*: vacancies far exceeded unemployed workers. Ben Bernanke and Olivier Blanchard (2023) found that most of the initial rise came from price shocks to energy, food and goods in short supply, with the tight labour market contributing a smaller but more persistent part. Others give fiscal policy or the Fed's delay more weight. Unlike the 1970s, long-run expectations stayed close to 2%, which most economists think explains why inflation fell faster.`,
          resources: [
            { title: 'What Caused the US Pandemic-Era Inflation? (Bernanke and Blanchard, 2023)', url: 'https://www.nber.org/papers/w31417', type: 'article', cost: 'free', provider: 'NBER', note: 'Read the introduction and conclusions for the decomposition into price shocks and labour-market tightness.', primary: true },
            ostx('9-3-how-the-u-s-and-other-countries-experience-inflation', 'How the US and other countries experience inflation', 'Long-run US inflation history in one chapter section.'),
            mru('business-cycle-theories', 'business-cycles-great-recession', 'The Great Recession', 'For contrast with the inflation episodes: a demand-driven downturn.'),
          ],
          exercises: [
            {
              slug: 'two-episodes-data',
              title: 'Chart both episodes',
              prompt:
                'In FRED, chart CPI inflation (CPIAUCSL, percent change from a year ago), UNRATE and FEDFUNDS for 1965–1985 and for 2019–latest. For each episode record the inflation peak, the peak federal funds rate, the real federal funds rate at the inflation peak (FEDFUNDS minus inflation), and the peak unemployment rate during the disinflation. Present a table and comment on the biggest difference.',
              kind: 'data-analysis',
              difficulty: 2,
              hint: 'The real rate was about −2.8% at the November 1974 peak (9.45% minus 12.2%), positive at the March 1980 peak (17.19% minus 14.6%) after Volcker\'s first hikes, and about −7.8% at the June 2022 peak (1.21% minus 9.0%). Disinflation unemployment: 10.8% in 1982 versus about 4.2% in 2024.',
            },
            {
              slug: 'sacrifice',
              title: 'A rough sacrifice ratio',
              prompt:
                'Using annual average CPI inflation and unemployment (FRED: CPIAUCSL, UNRATE, NROU), estimate the sacrifice ratio of the Volcker disinflation: sum the point-years of unemployment above CBO\'s natural rate from 1980 to 1985 and divide by the fall in inflation from 1980 to 1985. Then do the same for 2022 to 2025. Explain why the second ratio is so much smaller and why the calculation is only rough.',
              kind: 'data-analysis',
              difficulty: 3,
              hint: 'The 1980s ratio comes out at several point-years per point; for 2022–25 cyclical unemployment was close to zero or negative, so the ratio is near zero. Supply shocks unwinding and anchored expectations differ between the episodes.',
            },
            {
              slug: 'causes-essay',
              title: 'Weigh the causes of 2021–23',
              prompt:
                'Write 500 words assessing the causes of the 2021–23 US inflation. Use AD-AS diagrams for 2021 and 2022, the Phillips curve, and at least two sources with different conclusions (one may be Bernanke and Blanchard). Assign rough weights to demand, supply and labour-market factors and justify them.',
              kind: 'writing',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'Give three causes of the Great Inflation.',
              answerOutline: 'Loose monetary policy (low real rates), oil and food supply shocks, de-anchored expectations built into wages, and the loss of the Bretton Woods anchor. Any three.',
            },
            {
              question: 'Why was the Volcker disinflation so costly in unemployment?',
              answerOutline:
                'Expectations of high inflation were entrenched and policy credibility was low, so inflation fell only after a long period of unemployment above the natural rate.',
            },
            {
              question: 'Why did inflation fall faster after 2022 than after 1980?',
              answerOutline:
                'Long-run expectations stayed anchored near 2%, supply shocks reversed, and the Fed acted to show it would bring inflation down. Unemployment barely rose.',
            },
          ],
        },
        {
          slug: 'balance-of-payments',
          title: 'The balance of payments and the saving-investment identity',
          summary:
            'Exports, imports, the current account and the financial account, why they must balance, and the open-economy identity S − I = NX that connects trade deficits to saving, investment and government deficits.',
          estimatedMinutes: 100,
          objectives: [
            'Define the trade balance, the current account and the financial account',
            'Explain why a current account deficit is matched by a net financial inflow',
            'Derive S − I = NX and use it to analyse trade deficits',
            'Explain the twin-deficits argument and its limits',
            'Evaluate claims about trade deficits and tariffs using the identity',
          ],
          concepts: [
            'Exports, imports, trade balance',
            'Current account',
            'Financial account and net capital inflow',
            'Balance of payments identity',
            'Open-economy saving-investment identity',
            'Twin deficits',
            'Net international investment position',
          ],
          explanation: `**The accounts.** The **trade balance** is exports minus imports of goods and services. The **current account** adds net income from abroad (interest, dividends, wages) and net transfers (such as remittances). The **financial account** records purchases and sales of assets across borders: foreign purchases of US Treasuries, stocks, firms and property, and US purchases of foreign assets.

Every international transaction has two sides. A Taiwanese firm paid USD 1,000 for a laptop can spend the dollars on US goods (an export) or US assets (a financial inflow). So, apart from a small capital account and errors,

$$
\\text{current account} + \\text{net financial inflow} = 0.
$$

A country with a current account deficit is selling assets to, or borrowing from, the rest of the world.

**US data.** The US deficit on goods and services was about USD 930 billion in 2025 (Census and BEA, FRED: BOPGSTB, summed). The monthly figure swung from USD 133 billion in March 2025, as importers bought ahead of new tariffs, to USD 37 billion in October 2025, and was USD 105 billion in September 2026. The current account deficit was USD 246 billion in Q2 2026, about 3% of GDP at an annual rate (BEA, FRED: IEABC). Deficits in almost every year since the early 1980s have made the US **net international investment position** deeply negative.

**The saving-investment identity.** With trade, $Y = C + I + G + NX$. Subtract $C$ and $G$ and write national saving $S = Y - C - G$:

$$
S - I = NX.
$$

A country that saves less than it invests must import the difference: a trade deficit is the mirror image of a saving shortfall. Example: $Y = 1{,}000$, $C = 650$, $G = 200$, $T = 180$, $I = 200$. Private saving is $1{,}000 - 180 - 650 = 170$, public saving is $180 - 200 = -20$, national saving is 150, and $NX = 150 - 200 = -50$.

**Twin deficits.** If a bigger budget deficit lowers national saving and investment does not fall as much, the trade deficit widens. The 1980s showed both deficits growing together. But the link is loose: in the late 1990s the budget moved into surplus while the trade deficit grew, because investment boomed.

**Using the identity.** A policy that does not change saving or investment cannot change the trade balance for long. A tariff that cuts imports also tends to raise the dollar and reduce exports, unless it changes $S$ or $I$, which is why many economists call tariffs a poor tool for cutting trade deficits; supporters argue for them on other grounds, such as protecting particular industries or raising revenue. Whether trade deficits are a problem at all is debated: they can finance productive investment, but they add to foreign debt.`,
          relatedLessons: ['microeconomic-principles/welfare-and-government/international-trade-and-tariffs', 'microeconomic-principles/trade-and-markets/comparative-advantage'],
          resources: [
            ostx('10-4-the-national-saving-and-investment-identity', 'The national saving and investment identity', 'The identity with US data.', true),
            ostx('10-1-measuring-trade-balances', 'Measuring trade balances', 'The current account and its parts.'),
            ostx('10-5-the-pros-and-cons-of-trade-deficits-and-surpluses', 'The pros and cons of trade deficits and surpluses', 'When deficits are and are not a concern.'),
          ],
          exercises: [
            {
              slug: 'identity-practice',
              title: 'Use the identity',
              prompt:
                'An economy has $Y = 5{,}000$, $C = 3{,}400$, $G = 1{,}000$, $T = 900$ and $I = 900$. (a) Compute private, public and national saving and net exports. (b) The government cuts its deficit by 100 by raising taxes; consumption falls by 75, and investment is unchanged. What happens to national saving and net exports? (c) Instead, an investment boom raises I by 150 with saving unchanged. What happens to NX, and how is the extra investment financed?',
              kind: 'problem',
              difficulty: 2,
              hint: '(a) Private 700, public −100, national 600, NX = −300. (b) C = 3,325 and G is unchanged, so S = 5,000 − 3,325 − 1,000 = 675 (private saving falls 25, public saving rises 100) and NX = −225. (c) NX = −450, financed by a net capital inflow from abroad.',
            },
            {
              slug: 'bop-entries',
              title: 'Record the transactions',
              prompt:
                'For each, say whether it is recorded in the current account or the financial account and with which sign for the US: (a) a US firm exports USD 10 million of machinery; (b) a Japanese pension fund buys USD 50 million of US Treasuries; (c) an American buys shares in a French company; (d) a US worker sends USD 500 to family abroad; (e) a US firm receives dividends from its foreign subsidiary.',
              kind: 'problem',
              difficulty: 1,
              hint: '(a) Current, + (export). (b) Financial, inflow (+ liability). (c) Financial, outflow. (d) Current, − (secondary income). (e) Current, + (primary income).',
            },
            {
              slug: 'twin-deficits-data',
              title: 'Twin deficits in the data',
              prompt:
                'In FRED, plot the federal surplus or deficit as a share of GDP (FYFSGDA188S) and net exports as a share of GDP (NETEXP divided by GDP) from 1970. Identify two periods when they moved together and one when they moved apart, and explain each using S − I = NX.',
              kind: 'data-analysis',
              difficulty: 2,
              hint: 'Together: the early-to-mid 1980s, and 2001–2006. Apart: the late 1990s (budget surplus, investment boom), and 2009 (budget deficit soared, trade deficit shrank as investment collapsed).',
            },
          ],
          selfAssessment: [
            {
              question: 'Why must a current account deficit be matched by a net financial inflow?',
              answerOutline: 'Dollars paid for imports beyond exports end up with foreigners, who use them to buy US assets or lend to US residents. Each transaction has two equal sides.',
            },
            {
              question: 'Derive S − I = NX.',
              answerOutline: 'From Y = C + I + G + NX, Y − C − G − I = NX, and Y − C − G is national saving S.',
            },
            {
              question: 'Why might a tariff fail to reduce the trade deficit?',
              answerOutline:
                'Unless it raises national saving or lowers investment, S − I and so NX are unchanged; the dollar tends to appreciate and exports fall, offsetting lower imports.',
            },
          ],
        },
        {
          slug: 'exchange-rates-and-ppp',
          title: 'Exchange rates and purchasing power parity',
          summary:
            'Nominal and real exchange rates, the supply of and demand for currencies, purchasing power parity and the Big Mac index, and how interest rates and exchange-rate regimes shape a currency\'s value.',
          estimatedMinutes: 110,
          objectives: [
            'Read exchange-rate quotes and identify appreciation and depreciation',
            'Analyse the foreign exchange market with supply and demand',
            'Compute a real exchange rate and explain what it measures',
            'Use purchasing power parity to compute an implied exchange rate and a currency\'s over- or undervaluation',
            'Explain the effects of exchange rates on net exports and describe floating and fixed regimes',
          ],
          concepts: [
            'Nominal exchange rate',
            'Appreciation and depreciation',
            'Foreign exchange market',
            'Real exchange rate',
            'Purchasing power parity (PPP)',
            'Law of one price',
            'Big Mac index',
            'Floating versus fixed exchange rates',
          ],
          explanation: `A **nominal exchange rate** is the price of one currency in terms of another. Quotes go both ways, so always check the units. On 30 October 2026 one euro cost USD 1.1163, so one dollar bought $1/1.1163 = 0.896$ euros; one dollar bought 157.5 yen and 6.65 yuan (FRED: DEXUSEU, DEXJPUS, DEXCHUS). If a dollar buys more foreign currency than before, the dollar has **appreciated**; if less, it has **depreciated**.

**Supply and demand.** In the market for dollars, foreigners **demand** dollars to buy US goods, services and assets; Americans **supply** dollars to buy foreign ones. Anything that makes US assets more attractive, such as higher US interest rates, raises the demand for dollars and appreciates the dollar. Faster US inflation reduces foreigners' demand for US goods and raises Americans' demand for imports, depreciating it.

\`\`\`interactive
supply-demand
{"title": "The market for dollars", "demand": [1.6, 0.001], "supply": [0.2, 0.001], "view": [0, 1400, 0, 1.8], "shiftRange": 300, "xLabel": "bn a day", "yLabel": "Euros per dollar", "demandLabel": "Demand for dollars", "supplyLabel": "Supply of dollars", "priceUnit": "€ per dollar", "quantityUnit": "bn", "showSurplus": false, "showElasticity": false, "digits": 3, "caption": "The curves are illustrative, set so the equilibrium is 0.90 euros per dollar, close to the October 2026 rate. US interest rates rise and foreign investors want more dollar assets: set the demand shift to +100 and the dollar appreciates to 0.95. Reset, then shift supply right by 100, as when Americans buy more imports, and the dollar depreciates to 0.85."}
\`\`\`

**The real exchange rate** compares prices of goods, not currencies:

$$
\\varepsilon = e\\times\\frac{P}{P^*},
$$

where $e$ is foreign currency per dollar, $P$ the US price level and $P^*$ the foreign one. A rise in $\\varepsilon$ means US goods are dearer relative to foreign goods, which lowers US net exports.

**Purchasing power parity.** If identical goods sold for the same price everywhere once converted (the **law of one price**), the exchange rate would equal the ratio of price levels: $e = P^*/P$. The Economist's **Big Mac index** applies this to one burger. In July 2026 a Big Mac cost USD 6.22 in the US, 6.19 euros in the euro area and 500 yen in Japan. The implied PPP rates are $6.19/6.22 = 0.995$ euros and $500/6.22 = 80.4$ yen per dollar. Actual rates were 0.874 euros and 162.1 yen, so by this measure the euro was about 14% *overvalued* against the dollar and the yen about 50% *undervalued*.

PPP fails in the short run: many goods and most services are not traded, transport costs and tariffs differ, and capital flows move exchange rates far more than trade does. Over decades, though, countries with higher inflation do see their currencies depreciate, roughly as PPP predicts.

**Regimes.** The dollar, euro and yen **float**: markets set their value. Some countries **fix** (peg) their currency to another and use interest rates or reserves to hold it; China manages the yuan within limits. A peg gives stability for trade but gives up independent monetary policy when capital moves freely.`,
          resources: [
            ostx('16-1-how-the-foreign-exchange-market-works', 'How the foreign exchange market works', 'Who demands and supplies currencies, and the vocabulary.', true),
            ostx('16-2-demand-and-supply-shifts-in-foreign-exchange-markets', 'Demand and supply shifts in foreign exchange markets', 'Interest rates, inflation and expectations as shifters; PPP.'),
            { title: 'The Big Mac index data', url: 'https://github.com/TheEconomist/big-mac-data', type: 'dataset', cost: 'free', provider: 'The Economist (GitHub)', note: 'The raw prices and exchange rates behind the index, with the method explained in the README.' },
          ],
          exercises: [
            {
              slug: 'quotes',
              title: 'Read the quotes',
              prompt:
                'In January the euro is quoted at USD 1.05 and in October at USD 1.12. (a) Did the dollar appreciate or depreciate against the euro? By what percentage, measured as euros per dollar? (b) A German car costs 40,000 euros. What did it cost in dollars in each month? (c) Who in the US gains and who loses from this change?',
              kind: 'problem',
              difficulty: 1,
              hint: '(a) Euros per dollar fell from 0.952 to 0.893, a 6.25% depreciation of the dollar. (b) USD 42,000 then USD 44,800. (c) US exporters and firms competing with imports gain; US importers, consumers of imports and Americans travelling abroad lose.',
            },
            {
              slug: 'ppp-big-mac',
              title: 'Compute PPP from the Big Mac data',
              prompt:
                'Download the latest raw Big Mac index file from The Economist\'s GitHub repository. For five countries of your choice, compute the implied PPP exchange rate and the percentage over- or undervaluation against the dollar, and check your numbers against the file\'s own USD column. Explain why rich countries tend to look overvalued and poor ones undervalued.',
              kind: 'data-analysis',
              difficulty: 2,
              hint: 'Implied PPP = local price / US price. Valuation = implied PPP / actual rate − 1. Non-traded inputs (wages, rent) are cheaper in poorer countries (the Balassa–Samuelson effect).',
            },
            {
              slug: 'real-exchange-rate',
              title: 'Real exchange rates',
              prompt:
                'The yen-dollar rate rises from 110 to 150 over four years while US prices rise 16% and Japanese prices 8%. (a) By how much did the dollar appreciate in nominal terms? (b) By how much in real terms? (c) What would you expect to happen to US net exports to Japan, and why might it take time?',
              kind: 'problem',
              difficulty: 2,
              hint: '(a) 150/110 − 1 = 36.4%. (b) 1.364 × 1.16/1.08 − 1 ≈ 46.5%. (c) US goods became much dearer relative to Japanese goods, so US net exports to Japan fall, after delays as contracts and supply chains adjust.',
            },
          ],
          selfAssessment: [
            {
              question: 'Why does a rise in US interest rates tend to appreciate the dollar?',
              answerOutline: 'US assets pay more, so foreign investors demand more dollars to buy them, shifting demand for dollars right.',
            },
            {
              question: 'What does a real appreciation of the dollar mean for US net exports?',
              answerOutline: 'US goods become more expensive relative to foreign goods, so exports fall and imports rise; net exports fall.',
            },
            {
              question: 'Give two reasons PPP fails in the short run.',
              answerOutline: 'Non-traded goods and services, transport costs and trade barriers, sticky prices, and capital flows dominating currency markets. Any two.',
            },
          ],
        },
      ],
    },
  ],
  capstone: {
    slug: 'state-of-the-economy-report',
    title: 'A state-of-the-economy report with a policy recommendation',
    description: `Write the kind of briefing a central bank or treasury staff economist prepares before a policy meeting, using only public data you download yourself. The report covers the whole course: where output stands relative to potential, what is happening to unemployment and inflation and why, how monetary and fiscal policy are set, and what the open-economy accounts show.

Download from FRED at least: GDPC1, GDPPOT, UNRATE, NROU, U6RATE, CIVPART, CPIAUCSL, CPILFESL, PCEPI, PCEPILFE, FEDFUNDS, DGS10, T10YIE, M2SL, WALCL, FYFSGDA188S, FYGFGDQ188S, BOPGSTB and DEXUSEU, and record the download date. Compute everything yourself in a spreadsheet or notebook: growth rates (annualised and year over year), the output gap, cyclical unemployment, an Okun's law check, 12-month and 3-month annualised inflation, a Taylor rule prescription under two assumptions about r*, a ten-year debt projection with the debt-dynamics equation calibrated to CBO's latest baseline, and the saving-investment identity from the BEA accounts. Then diagnose the economy in the AD-AS model and recommend a setting for the federal funds rate, with the strongest argument against your recommendation stated fairly.`,
    deliverables: [
      'A data workbook or notebook with raw downloads, dates, every computed series and a note of each FRED series ID and its units',
      'Eight to twelve charts, each with a title, units, source and date',
      'An AD-AS diagram and a Phillips curve diagram describing the current situation, with each shift explained',
      'A 2,000–2,500-word report: output and growth, labour market, inflation, monetary policy (including the Taylor rule comparison), fiscal position and debt projection, external accounts, diagnosis and recommendation',
      'A one-page summary for a non-economist, with no more than five numbers',
    ],
    estimatedHours: 14,
    stretchGoals: [
      'Repeat the analysis for the euro area or another economy using ECB, Eurostat or OECD data and compare the two',
      'Automate the data download with the FRED API so the report can be refreshed with one command',
      'Backtest your Taylor rule against the actual federal funds rate since 1990 and discuss the largest gaps',
    ],
  },
  masteryChecklist: [
    'I can compute GDP by expenditure and value added, real GDP, the deflator and annualised growth rates, and say what GDP leaves out',
    'I can build a price index, compute inflation, convert dollars across years, and explain the main biases in the CPI and why the Fed targets PCE inflation',
    'I can compute the unemployment and participation rates, explain frictional, structural and cyclical unemployment, and use Okun\'s law',
    'I can use compound growth and the rule of 70, solve the Solow model for its steady state, and explain why only technology sustains growth',
    'I can solve the loanable funds market, show crowding out, and price a bond from its cash flows',
    'I can explain how banks create deposits in the textbook model and why the ample-reserves system works differently, and use the quantity theory for long-run inflation',
    'I can solve the Keynesian cross, compute spending and tax multipliers with and without leakages, and say why real-world multipliers are smaller',
    'I can analyse demand and supply shocks in the AD-AS model and trace the adjustment back to potential output',
    'I can explain how the Fed sets the federal funds rate with IORB and ON RRP, how policy reaches spending, and what QE and the Taylor rule do',
    'I can project the debt-to-GDP ratio with r − g and the primary deficit and explain the arguments over how much debt is too much',
    'I can use the expectations-augmented Phillips curve and explain the 1970s and 2021–23 inflations, including where economists disagree',
    'I can use S − I = NX, read the balance of payments, and compute real exchange rates and PPP valuations',
    'I can find, download and correctly interpret FRED, BEA, BLS and CBO data, with units and dates',
  ],
});
