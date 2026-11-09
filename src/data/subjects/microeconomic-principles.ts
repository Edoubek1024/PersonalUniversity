import { defineSubject } from '../define';
import type { ResourceInput } from '../types';

const ostx = (slug: string, title: string, note: string, primary = false): ResourceInput => ({
  title: `OpenStax Principles of Microeconomics 3e: ${title}`,
  url: `https://openstax.org/books/principles-microeconomics-3e/pages/${slug}`,
  type: 'textbook',
  cost: 'free',
  provider: 'OpenStax',
  note,
  primary,
});

const mru = (unit: string, lesson: string, title: string, note: string): ResourceInput => ({
  title: `MRU Principles of Microeconomics: ${title}`,
  url: `https://learn.mru.org/courses/principles-of-microeconomics/units/${unit}/lessons/${lesson}`,
  type: 'video',
  cost: 'free',
  provider: 'Marginal Revolution University',
  note,
});

const core = (page: string, title: string, note: string): ResourceInput => ({
  title: `CORE Econ, The Economy 2.0 (Microeconomics): ${title}`,
  url: `https://www.core-econ.org/the-economy/microeconomics/${page}.html`,
  type: 'textbook',
  cost: 'free',
  provider: 'CORE Econ',
  note,
});

const mit = (lecture: string, title: string, note: string): ResourceInput => ({
  title: `MIT 14.01 Principles of Microeconomics (Fall 2023): ${title}`,
  url: `https://ocw.mit.edu/courses/14-01-principles-of-microeconomics-fall-2023/resources/${lecture}/`,
  type: 'lecture',
  cost: 'free',
  provider: 'MIT OpenCourseWare',
  note,
});

const khan = (unit: string, title: string, note: string): ResourceInput => ({
  title: `Khan Academy Microeconomics: ${title}`,
  url: `https://www.khanacademy.org/economics-finance-domain/microeconomics/${unit}`,
  type: 'course',
  cost: 'free',
  provider: 'Khan Academy',
  note,
});

const nber = (paper: string, title: string, authors: string, note: string): ResourceInput => ({
  title,
  url: `https://www.nber.org/papers/${paper}`,
  type: 'article',
  cost: 'free',
  provider: `${authors} (NBER working paper)`,
  note,
});

const fred = (series: string, title: string, note: string): ResourceInput => ({
  title: `FRED: ${title}`,
  url: `https://fred.stlouisfed.org/series/${series}`,
  type: 'dataset',
  cost: 'free',
  provider: 'Federal Reserve Bank of St. Louis',
  note,
});

export default defineSubject({
  id: 'microeconomic-principles',
  title: 'Microeconomic Principles',
  category: 'economics',
  tagline:
    'How consumers and firms make choices, how markets set prices, why markets sometimes fail, and what taxes, price controls, tariffs and regulation really do.',
  description: `Microeconomics studies the choices of individual decision-makers, households and firms, and how those choices add up in markets. It explains why prices are what they are, who gains and who loses when a tax, a price ceiling or a tariff is imposed, why a monopoly charges more than a competitive industry would, and when a market left alone produces too much pollution or too little of a public good. The same few tools, opportunity cost, marginal thinking, supply and demand, elasticity and surplus, answer all of these questions.

This course follows the topics of ECON 102, Microeconomic Principles, at the University of Illinois Urbana-Champaign, whose catalog describes it as an introduction to the functions of individual decision-makers, consumers and producers, within the larger economic system, with primary emphasis on product markets, the theory of the firm under competition and monopoly, and the role of government in promoting efficiency. It is an original course built from that public description, and it is not affiliated with or endorsed by the University of Illinois.

Each model is taught four ways: as a graph you can move, as algebra you can solve (linear supply and demand with real numbers), as intuition, and with its assumptions and the places it fails. Interactive graphs let you shift curves, impose taxes and price controls, and watch surplus and deadweight loss change. High-school algebra is enough throughout. Calculus appears only where it makes "marginal" exact, and it is always marked as optional.

Real cases come with dates and sources: egg prices during the avian flu outbreaks, rent control in San Francisco, the 2018 washing machine tariffs, minimum wage research, cap and trade. Where economists disagree, as on minimum wages, rent control and tariffs, you get what the standard model predicts, what the evidence shows and where the disagreement lies, without a political verdict. Numbers that change are stated "as of" a date and linked to the official source so you can update them.`,
  difficulty: 'beginner',
  estimatedHours: 80,
  prerequisites: [],
  recommendedBackground: [
    'High-school algebra: straight lines, slopes, solving two linear equations, areas of triangles and rectangles',
    'Calculus I (for example the calculus-1 course here) is helpful for the optional "marginal = derivative" asides but not required',
    'No economics background is assumed',
  ],
  tags: ['economics', 'microeconomics', 'supply and demand', 'elasticity', 'market structure', 'game theory', 'public policy'],
  core: false,
  modules: [
    {
      slug: 'thinking-like-an-economist',
      title: 'Thinking Like an Economist',
      description:
        'Scarcity, opportunity cost and marginal reasoning, the habit of asking how incentives change behaviour, how economists build and test models, and the production possibilities frontier.',
      lessons: [
        {
          slug: 'scarcity-and-opportunity-cost',
          title: 'Scarcity, choice and opportunity cost',
          summary:
            'Every choice gives something up. Learn to name the real cost of a decision, draw a budget constraint and ignore costs that are already sunk.',
          estimatedMinutes: 100,
          objectives: [
            'Define scarcity and explain why it forces choices even for the rich',
            'Compute the opportunity cost of a decision, including implicit costs such as time',
            'Draw a budget constraint and read the opportunity cost of one good from its slope',
            'Recognise sunk costs and explain why they should not affect a forward-looking decision',
          ],
          concepts: [
            'Scarcity',
            'Opportunity cost: the best alternative given up',
            'Explicit and implicit costs',
            'Budget constraint',
            'Relative price as a slope',
            'Sunk cost',
            'Microeconomics versus macroeconomics',
          ],
          explanation: `**Economics** is the study of how people and societies choose to use scarce resources. **Scarcity** means that what people want exceeds what the available time, money, land, labour and materials can provide. Even a billionaire has 24 hours a day, so scarcity is not the same as poverty. **Microeconomics** looks at individual households, firms and markets; **macroeconomics** looks at the whole economy (output, unemployment, inflation).

Because resources are scarce, every choice has an **opportunity cost**: the value of the *best* alternative you give up. Only the best one counts, not the sum of every alternative.

**Worked example: a year of full-time study.** Tuition and books cost USD 14,000. You could instead have worked for USD 38,000 after tax. Rent and food would be about the same either way. The opportunity cost of the year is USD 14,000 + USD 38,000 = USD 52,000. Rent is not part of it, because you pay it whichever you choose. The forgone wage is an **implicit cost**: no money changes hands, but it is the biggest item.

**Budget constraints.** Suppose you have USD 60 a month for entertainment, a film costs USD 10 and a concert USD 30. With $C$ concerts and $F$ films, every affordable plan satisfies

$$
30C + 10F \\le 60, \\qquad\\text{so on the line}\\qquad F = 6 - 3C.
$$

The end points are 6 films or 2 concerts, and 3 films with 1 concert also exhausts the budget. The slope, $-3$, is the price ratio $-30/10$: one more concert costs three films. That is the opportunity cost written as a relative price. If the concert price fell to USD 20, the line would pivot out along the concert axis and one concert would cost only two films.

**Sunk costs** are costs already paid that cannot be recovered whatever you do next. Suppose you paid USD 50 for a non-refundable ticket and on the night a storm makes the trip miserable. The USD 50 is gone whether or not you go, so the only question is whether the evening is still worth the trip. Feeling that you must go "to get your money's worth" is the **sunk cost fallacy**.

Read OpenStax 1.1 and 2.1 first, then watch the MRU video on opportunity cost and try the exercises with the page covered.`,
          resources: [
            ostx('1-1-what-is-economics-and-why-is-it-important', '1.1 What is economics, and why is it important?', 'Scarcity, the division of labour and why economics matters.', true),
            ostx('2-1-how-individuals-make-choices-based-on-their-budget-constraint', '2.1 How individuals make choices based on their budget constraint', 'Budget constraints, opportunity cost and sunk costs, with a worked example to compare with the one above.'),
            mru('introduction', 'opportunity-cost-and-tradeoffs', 'Opportunity cost and trade-offs', 'A short video; pause before each answer and work it yourself.'),
            khan('choices-opp-cost-tutorial', 'Scarcity, choice and opportunity cost', 'Extra practice questions with instant feedback.'),
          ],
          exercises: [
            {
              slug: 'lunch-and-coffee-budget',
              title: 'Lunch and coffee budget line',
              prompt:
                'You have USD 48 a week for lunches at USD 8 and coffees at USD 3. (a) Write the budget line with $L$ lunches and $K$ coffees and give both intercepts. (b) What is the opportunity cost of one lunch in coffees? (c) List every combination with a whole number of lunches that spends the whole budget on a whole number of coffees. (d) The coffee price rises to USD 4. Redraw the line and give the new opportunity cost of a lunch.',
              kind: 'problem',
              difficulty: 1,
              hint: 'The line is 8L + 3K = 48. A lunch costs 8/3 ≈ 2.67 coffees at first and 8/4 = 2 coffees after the change. Whole-number points are those where 48 − 8L is a multiple of 3: L = 0, 3, 6.',
            },
            {
              slug: 'opportunity-cost-of-a-degree',
              title: 'The opportunity cost of a degree',
              prompt:
                'A four-year degree costs USD 11,000 a year in tuition and fees and USD 1,200 a year in books. Room and board cost USD 13,000 a year, and you would pay USD 12,000 a year for housing and food if you worked instead. The job you would take pays USD 36,000 a year after tax. Compute the four-year opportunity cost. Say which items you excluded and why, and name one benefit of the degree that this calculation leaves out.',
              kind: 'problem',
              difficulty: 2,
              hint: 'Only costs that differ between the two choices count. Housing and food add 13,000 − 12,000 = 1,000 a year. Total per year: 11,000 + 1,200 + 1,000 + 36,000.',
            },
            {
              slug: 'sunk-cost-cases',
              title: 'Spot the sunk cost',
              prompt:
                'Describe three real decisions, from your own life, a business or a government project, where a sunk cost was or could have been allowed to influence the choice. For each, say what the sunk cost was, what the forward-looking comparison should have been, and whether any part of the past spending was actually recoverable (and so not sunk). About 80 words each.',
              kind: 'writing',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'Why is the forgone wage part of the cost of studying full time, while rent usually is not?',
              answerOutline:
                'Opportunity cost counts what differs between the options. You give up the wage only by studying; rent is paid either way. The wage is an implicit cost.',
            },
            {
              question: 'On a budget line with concerts on the horizontal axis and films on the vertical axis, what does the slope tell you, and what happens to it if concerts get cheaper?',
              answerOutline:
                'The slope is minus the price ratio P(concert)/P(film): the number of films given up per concert. A cheaper concert makes the line flatter, pivoting outward along the concert axis.',
            },
            {
              question: 'Give a one-sentence test for whether a cost is sunk.',
              answerOutline: 'A cost is sunk if it has already been incurred and cannot be recovered whichever option you choose now, so it is the same for every option and cannot change the ranking.',
            },
          ],
        },
        {
          slug: 'marginal-thinking-and-incentives',
          title: 'Marginal thinking and incentives',
          summary:
            'Good decisions compare the extra benefit of one more unit with its extra cost. People respond to incentives, sometimes in ways policy makers did not intend.',
          estimatedMinutes: 100,
          objectives: [
            'Find the best quantity of an activity by comparing marginal benefit and marginal cost',
            'Explain why total benefit is maximised where marginal benefit equals marginal cost, not where total benefit is largest',
            'Relate marginal benefit and marginal cost to derivatives (optional calculus)',
            'Predict how a change in incentives changes behaviour, including unintended responses',
          ],
          concepts: [
            'Marginal benefit (MB)',
            'Marginal cost (MC)',
            'Net benefit',
            'Optimal quantity where MB = MC',
            'Diminishing marginal benefit',
            'Incentives',
            'Unintended consequences',
          ],
          explanation: `Most decisions are not all-or-nothing. You choose *how many* hours to study, *how much* to produce or *how many* workers to hire. The useful question is: is **one more** unit worth it? Economists call the extra benefit of one more unit its **marginal benefit** (MB) and the extra cost its **marginal cost** (MC). Keep going while MB is at least MC, and stop when the next unit costs more than it adds.

**Worked example.** You value exam points and have other uses for your evening. Here is the extra benefit and the extra cost (both in points-equivalent) of each successive hour of study:

| Hour | 1st | 2nd | 3rd | 4th | 5th |
|---|---|---|---|---|---|
| MB | 10 | 8 | 6 | 4 | 2 |
| MC | 3 | 4 | 5 | 6 | 7 |

The first three hours pass the test (6 ≥ 5 for the third); the fourth does not (4 < 6). Study 3 hours. Total benefit is 10 + 8 + 6 = 24 and total cost 3 + 4 + 5 = 12, so net benefit is 12. Check that 4 hours gives 28 − 18 = 10, which is less. Notice that MB *falls* (later hours teach less) and MC *rises* (you give up more valuable time). That shape is typical, and it is why an interior best choice exists.

**Optional calculus.** If benefit $B(q)$ and cost $C(q)$ are smooth, net benefit $B(q) - C(q)$ is largest where its derivative is zero: $B'(q) = C'(q)$. Marginal benefit and marginal cost *are* the derivatives. For $B(q) = 20q - q^2$ and $C(q) = 4q$, $20 - 2q = 4$ gives $q = 8$. The table method is the same idea in whole steps.

**Incentives** are the rewards and penalties that change MB or MC. When the District of Columbia and Montgomery County, Maryland, introduced a five-cent tax on disposable shopping bags, Homonoff (2018) found the share of shoppers using any disposable bag fell by more than 40 percentage points, while a five-cent *bonus* for reusable bags in other stores barely changed behaviour. Incentives also work on margins nobody intended. Mexico City's 1989 rule banning each car from driving one weekday did not improve air quality, Davis (2008) found, partly because households bought extra, often older and dirtier, cars.

The habit to build: for any choice, ask what changes at the margin and who responds.`,
          resources: [
            mru('introduction', 'marginal-thinking-and-sunk-cost-fallacy', 'Marginal thinking and the sunk cost fallacy', 'Connects this lesson with the previous one.'),
            ostx('2-1-how-individuals-make-choices-based-on-their-budget-constraint', '2.1 (marginal decision-making and diminishing marginal utility)', 'Read the part on marginal decision-making.', true),
            ostx('2-3-confronting-objections-to-the-economic-approach', '2.3 Confronting objections to the economic approach', 'Whether people really reason like this, and why the model can still predict well.'),
            { title: 'Can small incentives have large effects? The impact of taxes versus bonuses on disposable bag use', url: 'https://wagner.nyu.edu/impact/research/publications/can-small-incentives-have-large-effects-impact-taxes-versus-bonuses', type: 'article', cost: 'free', provider: 'Tatiana Homonoff, NYU Wagner (AEJ: Economic Policy, 2018)', note: 'Read the abstract and the introduction: a clean example of an incentive changing behaviour.' },
          ],
          relatedLessons: ['calculus-1/applications-of-the-derivative/optimisation'],
          exercises: [
            {
              slug: 'mb-mc-table',
              title: 'How many workers?',
              prompt:
                'A café can hire extra workers for a busy Saturday at USD 120 each for the day. The extra revenue each additional worker brings in is USD 400, 300, 220, 150, 100 and 60 for the 1st to 6th worker. (a) How many workers should it hire? (b) What is the net gain? (c) If the day rate rises to USD 160, how many? (d) Explain why hiring "until revenue stops rising" would be a mistake.',
              kind: 'problem',
              difficulty: 1,
              hint: 'Hire while marginal revenue ≥ 120: the first four workers. Net gain = (400 + 300 + 220 + 150) − 4 × 120 = 590. At 160 the fourth worker (150) no longer pays.',
            },
            {
              slug: 'continuous-optimum',
              title: 'A continuous choice',
              prompt:
                'A farmer\'s benefit from applying $q$ tonnes of fertiliser is $B(q) = 60q - 3q^2$ (in USD hundreds) and the cost is $C(q) = 12q$. (a) Find the marginal benefit and marginal cost. (b) Find the best $q$ and the net benefit. (c) If a tax raises the cost to $18q$, what happens to $q$? (d) Without calculus, verify your answer to (b) by computing net benefit at $q = 7, 8, 9$.',
              kind: 'derivation',
              difficulty: 2,
              hint: 'MB = 60 − 6q, MC = 12, so q = 8 and net benefit = 480 − 192 − 96 = 192. With the tax q = 7.',
            },
            {
              slug: 'design-an-incentive',
              title: 'Design an incentive, then break it',
              prompt:
                'Pick a behaviour a city or company wants to change (late library returns, littering, missed medical appointments). Propose a specific incentive with a number attached. Then list two ways people might respond that the designer did not intend, and say how you would measure whether the policy worked. About 250 words.',
              kind: 'writing',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why should you stop at the point where MB = MC rather than where total benefit is largest?',
              answerOutline:
                'Total benefit can keep rising while each extra unit costs more than it adds. Net benefit (benefit minus cost) is maximised where the last unit\'s MB just covers its MC.',
            },
            {
              question: 'What is the relationship between marginal cost and the total cost function, in calculus terms?',
              answerOutline: 'Marginal cost is the derivative of total cost with respect to quantity, the slope of the total cost curve; in whole units it is the change in total cost from one more unit.',
            },
            {
              question: 'Give an example of an unintended consequence of an incentive and explain it as a response at a margin.',
              answerOutline:
                'Any clear case, e.g. Mexico City\'s driving ban led households to buy second cars: the rule raised the cost of driving one car on its banned day, and buying another car was the cheapest way round it.',
            },
          ],
        },
        {
          slug: 'models-and-positive-normative',
          title: 'Models, evidence and positive versus normative claims',
          summary:
            'How economists simplify the world into models, test them against data, separate statements of fact from statements of value, and read the graphs this course uses.',
          estimatedMinutes: 90,
          objectives: [
            'Explain what an economic model is and why simplifying assumptions are useful',
            'Distinguish positive statements from normative statements',
            'Explain why correlation does not establish causation and what a natural experiment is',
            'Find the slope and intercept of a straight line from two points and interpret them',
          ],
          concepts: [
            'Economic model',
            'Ceteris paribus (other things equal)',
            'Positive statement',
            'Normative statement',
            'Correlation versus causation',
            'Natural experiment',
            'Circular flow diagram',
            'Slope and intercept',
          ],
          explanation: `An **economic model** is a deliberately simplified description of how something works, built to answer a question. A map that showed every tree would be useless for driving; a model that included every feature of the economy would be just as useless. Models make assumptions, and the art is choosing assumptions that leave out what does not matter for the question. The phrase **ceteris paribus**, "other things equal", marks the most common one: change one thing, hold the rest fixed, and trace the effect.

The **circular flow diagram** is the first model in most courses. Households sell labour and other resources to firms in factor markets and buy goods and services from firms in product markets; money flows the opposite way. It leaves out almost everything, yet it shows that one person's spending is another's income.

A model is only as good as its predictions. Economists test models with data, and the hard part is **causation**. Ice-cream sales and drownings rise together because both rise in summer; neither causes the other. A **natural experiment** is a situation where something like a random assignment happens for reasons unrelated to the outcome, for example a policy change in one state but not its neighbour. You will meet one in the minimum wage lesson.

**Positive** statements describe how the world is and can be checked against evidence: "a higher cigarette tax reduces smoking." **Normative** statements say how it ought to be: "the government should tax cigarettes more." Economists disagree for both reasons: they hold different values, and they have different estimates of magnitudes, such as how strongly employment responds to a minimum wage. Surveys such as the Clark Center Forum show that economists agree more on positive questions than the public debate suggests.

**Graphs.** Most graphs in this course are straight lines, $y = b + mx$, where $b$ is the intercept and $m$ the slope. The slope between $(x_1, y_1)$ and $(x_2, y_2)$ is $m = (y_2 - y_1)/(x_2 - x_1)$. For example, the line through $(10, 50)$ and $(30, 10)$ has $m = -40/20 = -2$ and $b = 50 + 2 \\cdot 10 = 70$, so $y = 70 - 2x$. Economists usually put price on the vertical axis even when they think of quantity as depending on price, a historical convention from Alfred Marshall that you will need to get used to.

Read OpenStax 1.3 and appendix A on mathematics, and work every graphing exercise there.`,
          resources: [
            ostx('1-3-how-economists-use-theories-and-models-to-understand-economic-issues', '1.3 How economists use theories and models', 'Models, the circular flow diagram and their limits.', true),
            ostx('a-the-use-of-mathematics-in-principles-of-economics', 'Appendix A: The use of mathematics in principles of economics', 'Slopes, intercepts and reading graphs; do the practice problems.'),
            ostx('1-2-microeconomics-and-macroeconomics', '1.2 Microeconomics and macroeconomics', 'Where this course sits in the subject.'),
            { title: 'Clark Center Forum: US Economic Experts Panel', url: 'https://www.kentclarkcenter.org/us-economic-experts-panel/', type: 'article', cost: 'free', provider: 'Kent A. Clark Center, Chicago Booth', note: 'Surveys of leading economists on policy questions. Browse a few and note which are positive and which normative.' },
          ],
          exercises: [
            {
              slug: 'positive-or-normative',
              title: 'Positive or normative?',
              prompt:
                'Classify each statement as positive or normative and, for each positive one, say what evidence could test it: (a) Rent control reduces the supply of rental housing over time. (b) Housing is a right and rents should be capped. (c) A 10% rise in cigarette prices reduces cigarette consumption by about 4%. (d) Tariffs are unfair to consumers. (e) The federal minimum wage has been USD 7.25 since July 2009. (f) The minimum wage should rise with inflation.',
              kind: 'problem',
              difficulty: 1,
              hint: 'A statement is positive if it could in principle be shown false by data, even if it is in fact false. (a), (c) and (e) are positive.',
            },
            {
              slug: 'lines-from-points',
              title: 'Lines from two points',
              prompt:
                'Find the equation $y = b + mx$ for each line and interpret the slope in words: (a) a demand line through (price 4, quantity 80) and (price 8, quantity 40), written with quantity as the dependent variable; (b) the same line rewritten with price as a function of quantity; (c) a cost line where 100 units cost USD 700 and 300 units cost USD 1,300.',
              kind: 'problem',
              difficulty: 1,
              hint: '(a) Q = 120 − 10P. (b) P = 12 − 0.1Q. (c) C = 400 + 3Q: each unit adds USD 3 and the fixed part is USD 400.',
            },
            {
              slug: 'causation-critique',
              title: 'Correlation or causation?',
              prompt:
                'Find a news article that claims one economic variable causes another (for example, "cities with more coffee shops have higher incomes"). In about 200 words, state the claim, propose two other explanations for the correlation, and describe a natural experiment or data comparison that could separate them.',
              kind: 'writing',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'A model assumes that consumers know all prices. Does the model fail just because that is false?',
              answerOutline:
                'No. A model is judged by whether it predicts well for the question at hand. The assumption matters only if relaxing it would change the prediction; then the model needs revising.',
            },
            {
              question: 'Why might two economists agree on every fact about a tax and still disagree on whether to adopt it?',
              answerOutline: 'Adoption is a normative question; they may weigh efficiency, fairness and who bears the cost differently even with the same positive estimates.',
            },
            {
              question: 'What are the slope and intercept of P = 12 − 0.1Q, and what does each mean?',
              answerOutline: 'Intercept 12: the price at which quantity demanded falls to zero. Slope −0.1: each extra unit sold requires a price 0.1 lower.',
            },
          ],
        },
        {
          slug: 'production-possibilities-frontier',
          title: 'The production possibilities frontier',
          summary:
            'A picture of scarcity for a whole economy: what it can produce, what is inefficient or out of reach, why opportunity costs usually rise, and how growth moves the frontier.',
          estimatedMinutes: 100,
          objectives: [
            'Draw a production possibilities frontier (PPF) from a table and classify points as efficient, inefficient or unattainable',
            'Read the opportunity cost of a good from the slope of the frontier',
            'Explain why a PPF is usually bowed out (increasing opportunity cost)',
            'Show economic growth, recession and technological change on a PPF',
            'Distinguish productive efficiency from allocative efficiency',
          ],
          concepts: [
            'Production possibilities frontier',
            'Productive efficiency',
            'Allocative efficiency',
            'Law of increasing opportunity cost',
            'Slope as opportunity cost',
            'Economic growth as an outward shift',
            'Unemployment as a point inside the frontier',
          ],
          explanation: `A **production possibilities frontier** (PPF) shows the largest combinations of two goods an economy can produce with its resources and technology. Call them food (horizontal axis) and medicine (vertical axis). Points **on** the frontier are **productively efficient**: you cannot make more of one good without making less of the other. Points **inside** waste resources, for example during a recession with unemployed workers. Points **outside** are unattainable with today's resources and technology.

Moving along the frontier is a trade-off, so the **slope is the opportunity cost**. If moving right by one unit of food lowers medicine by 0.75, one more unit of food costs 0.75 units of medicine.

**Why the frontier bows out.** Resources are not equally good at everything. When the economy makes mostly medicine, the first workers and land moved to food are the ones best suited to farming and worst at medicine, so food is cheap in medicine. As you keep moving right, you move resources that are excellent at medicine and poor at farming, and each extra unit of food costs more medicine. This **law of increasing opportunity cost** makes the frontier concave. If resources were perfectly interchangeable, the frontier would be a straight line with a constant opportunity cost.

**Worked example.** The frontier below is $(x/100)^2 + (y/100)^2 = 1$, a quarter circle, with food $x$ and medicine $y$. Moving food from 0 to 20 costs about 2 units of medicine; from 60 to 80 it costs 20; from 80 to 100 it costs 60. At $x = 60$, $y = 80$, and the slope there is $-x/y = -0.75$. Drag the point inside, onto and outside the frontier, and turn on the equal steps to see the rising cost.

\`\`\`interactive
ppf
{"title": "Food and medicine", "xLabel": "Food", "yLabel": "Medicine", "xMax": 100, "yMax": 100, "point": [60, 80], "steps": 5, "caption": "The point starts at (60, 80), where the dashed tangent has slope −0.75: one more unit of food costs 0.75 of medicine. Turn on equal steps: each extra 20 units of food costs more medicine (about 2, 6, 12, 20, 60). Drag the point inside the frontier (inefficient, as in a recession) and outside (unattainable). Then raise food capacity by 30%: the frontier shifts out along the food axis, and even the medicine-only end gains nothing, but every mixed point improves."}
\`\`\`

**Growth.** More workers, more capital or better technology shift the frontier outward. Technology that improves only food production pivots it out along the food axis; at every point with some food, the economy can now have more of both.

**Productive versus allocative efficiency.** Every point on the frontier is productively efficient, but only one is **allocatively efficient**: the mix people value most. The frontier alone cannot tell you which; that needs preferences, which markets and prices express, as the next module shows.

Read OpenStax 2.2, then do the exercises using the widget to check your graphs.`,
          resources: [
            ostx('2-2-the-production-possibilities-frontier-and-social-choices', '2.2 The production possibilities frontier and social choices', 'The PPF, increasing opportunity cost and the two kinds of efficiency.', true),
            core('03-scarcity-wellbeing-04-feasible-set', 'Unit 3.4 The feasible set', 'The same idea for one person choosing between free time and consumption: the frontier of what is feasible and its slope as an opportunity cost.'),
            khan('basic-economic-concepts-gen-micro', 'Basic economic concepts (PPF)', 'Short videos on the PPF and practice items.'),
          ],
          exercises: [
            {
              slug: 'ppf-from-table',
              title: 'Opportunity cost from a table',
              prompt:
                'An economy can produce these combinations of bread (thousand loaves) and cars: A (0 bread, 50 cars), B (20, 45), C (40, 35), D (60, 20), E (80, 0). (a) Plot the frontier. (b) Compute the opportunity cost of bread per thousand loaves for each segment. (c) Is the frontier bowed out? Why might it be? (d) Classify (50, 30) and (30, 45) as efficient, inefficient or unattainable.',
              kind: 'problem',
              difficulty: 1,
              hint: 'Per 20 thousand loaves the economy gives up 5, 10, 15 and 20 cars: 0.25, 0.5, 0.75 and 1 car per thousand loaves. (50, 30) lies between C and D: on segment C–D, at 50 bread the frontier gives 27.5 cars, so 30 is unattainable.',
            },
            {
              slug: 'ppf-shifts',
              title: 'Shift the frontier',
              prompt:
                'For each event, sketch the before-and-after PPF for "consumer goods" and "capital goods" and say whether the economy moves along, inside or the frontier itself shifts: (a) a recession; (b) a new technology that raises output of consumer goods only; (c) a war that destroys factories; (d) the economy chooses more capital goods this year. In (d), explain what that choice means for the frontier ten years from now. Check (a) and (b) with the widget in this lesson.',
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'slope-on-a-curved-frontier',
              title: 'Slope on a curved frontier',
              prompt:
                'The frontier is $x^2 + y^2 = 10{,}000$ (food $x$, medicine $y$). (a) Find $y$ when $x = 60$ and $x = 80$. (b) Compute the average opportunity cost of food between these points. (c) Optional calculus: differentiate implicitly to show the slope is $-x/y$ and evaluate it at both points. (d) Explain why the average lies between the two point slopes.',
              kind: 'derivation',
              difficulty: 2,
              hint: 'y = 80 and y = 60, so the average cost is 20/20 = 1 unit of medicine per unit of food; the point slopes are −0.75 and −1.33.',
            },
          ],
          selfAssessment: [
            {
              question: 'What does a point inside the PPF represent, and give a real-world cause.',
              answerOutline: 'Productive inefficiency: resources unemployed or badly used. A recession with high unemployment is the standard example.',
            },
            {
              question: 'Why is a PPF usually bowed outward rather than straight?',
              answerOutline:
                'Resources are specialised. Shifting production moves the best-suited resources first, so each extra unit of a good requires giving up increasing amounts of the other: rising opportunity cost.',
            },
            {
              question: 'Can the frontier tell you which point society should choose? Why or why not?',
              answerOutline: 'No. All points on it are productively efficient; choosing the allocatively efficient point needs information about what people value (preferences, prices).',
            },
          ],
        },
      ],
    },
    {
      slug: 'trade-and-markets',
      title: 'Trade, Specialisation and Markets',
      description:
        'Why people and countries specialise and trade, who gains and who loses, and how prices coordinate the plans of millions of people who never meet.',
      lessons: [
        {
          slug: 'comparative-advantage',
          title: 'Absolute and comparative advantage',
          summary:
            'What you should specialise in depends on what you give up, not on what you are best at. Compute comparative advantage from opportunity costs.',
          estimatedMinutes: 100,
          objectives: [
            'Distinguish absolute advantage from comparative advantage',
            'Compute opportunity costs for two producers from output or labour-requirement data',
            'Identify who has the comparative advantage in each good',
            'Explain why a producer with an absolute advantage in everything still gains from trade',
          ],
          concepts: [
            'Absolute advantage',
            'Comparative advantage',
            'Opportunity cost ratios',
            'Specialisation',
            'Output table versus input (labour) table',
            'David Ricardo, 1817',
          ],
          explanation: `A producer has an **absolute advantage** in a good if it can make more of it with the same resources. It has a **comparative advantage** if it can make the good at a **lower opportunity cost**, giving up less of other goods. Specialisation should follow comparative advantage, and everyone has a comparative advantage in something, even a producer that is worse at everything.

**Worked example.** In a year, Home can produce at most 60 tonnes of wheat or 30 bolts of cloth (or any straight-line mix), and Foreign at most 20 wheat or 40 cloth. Opportunity costs come from the ratios:

| | 1 wheat costs | 1 cloth costs |
|---|---|---|
| Home | 30/60 = 0.5 cloth | 60/30 = 2 wheat |
| Foreign | 40/20 = 2 cloth | 20/40 = 0.5 wheat |

Home gives up less cloth per wheat (0.5 against 2), so Home has the comparative advantage in wheat; Foreign has it in cloth. The two opportunity costs of a good are always reciprocals for one producer, so a producer cannot have a comparative advantage in both goods.

Suppose without trade each country splits its resources evenly: Home makes 30 wheat and 15 cloth, Foreign 10 wheat and 20 cloth, a world total of 40 wheat and 35 cloth. If each specialises completely, the world has 60 wheat and 40 cloth, more of both. Trading at a price between the two opportunity costs, say 1 cloth per wheat, Home can ship 18 wheat for 18 cloth and consume 42 wheat and 18 cloth, while Foreign consumes 18 wheat and 22 cloth. Both countries end up outside their own frontiers. Try it below.

\`\`\`interactive
ppf
{"mode": "trade", "title": "Home and Foreign: wheat and cloth", "xLabel": "wheat", "yLabel": "cloth", "countries": [{"name": "Home", "x": 60, "y": 30}, {"name": "Foreign", "x": 20, "y": 40}], "autarky": [[30, 15], [10, 20]], "price": 1, "traded": 18, "caption": "Hollow dots are each country's consumption without trade. With specialisation, Home makes 60 wheat and Foreign 40 cloth, and at 1 cloth per wheat Home exports 18 wheat: both consumption dots lie outside their frontiers. Move the price below 0.5 or above 2 and one country loses; move the quantity too far and one country gives up more of a good than it gains."}
\`\`\`

**Output versus input tables.** Data often come as labour needed per unit instead. David Ricardo's 1817 example: in England a unit of cloth took 100 workers for a year and a unit of wine 120; in Portugal, 90 and 80. Portugal needs less labour for both (absolute advantage in both), but a unit of wine costs Portugal 80/90 ≈ 0.89 cloth and England 120/100 = 1.2 cloth. Portugal has the comparative advantage in wine, England in cloth. With input tables, divide the labour requirements; with output tables, divide the outputs the other way round. Getting that inversion wrong is the most common mistake.

Read OpenStax 19.1 and 19.2, then watch the MRU comparative advantage video.`,
          resources: [
            ostx('19-1-absolute-and-comparative-advantage', '19.1 Absolute and comparative advantage', 'Output and input tables, with worked numbers.', true),
            ostx('19-2-what-happens-when-a-country-has-an-absolute-advantage-in-all-goods', '19.2 When a country has an absolute advantage in all goods', 'The Ricardo case, done carefully.'),
            mru('trade', 'comparative-advantage-definition-opportunity-cost', 'Comparative advantage and opportunity cost', 'A short video with a two-person example.'),
            core('02-technology-incentives-03-comparative-advantage', 'Unit 2.3 Comparative advantage, specialization, and markets', 'A second treatment with a different example.'),
          ],
          exercises: [
            {
              slug: 'two-roommates',
              title: 'Two roommates',
              prompt:
                'In one hour, Ana can cook 4 meals or clean 2 rooms; Ben can cook 1 meal or clean 1 room. (a) Who has the absolute advantage in each task? (b) Compute each person\'s opportunity cost of a meal and of a room. (c) Who should cook and who should clean? (d) Name a "price" (rooms per meal) at which both gain by trading tasks.',
              kind: 'problem',
              difficulty: 1,
              hint: 'Ana: a meal costs 0.5 rooms, a room 2 meals. Ben: a meal costs 1 room. Ana has the comparative advantage in cooking. Any price between 0.5 and 1 room per meal works.',
            },
            {
              slug: 'ricardo-labour-table',
              title: 'Ricardo\'s labour table',
              prompt:
                'Use Ricardo\'s numbers: a unit of cloth needs 100 English or 90 Portuguese worker-years; a unit of wine needs 120 English or 80 Portuguese worker-years. (a) Compute the opportunity cost of wine in each country. (b) State each country\'s comparative advantage. (c) England has 2,200 worker-years and Portugal 1,700. Without trade, England makes 1 wine (and spends the rest on cloth) and Portugal makes 1 cloth. Compute each country\'s output. (d) Show that complete specialisation produces more of both goods in total.',
              kind: 'problem',
              difficulty: 2,
              hint: '(c) England: 1 wine uses 120, leaving 2,080 for 20.8 cloth; Portugal: 1 cloth uses 90, leaving 1,610 for 20.125 wine. Totals 21.8 cloth and 21.125 wine. (d) Specialised: England 22 cloth, Portugal 21.25 wine.',
            },
            {
              slug: 'your-comparative-advantage',
              title: 'Comparative advantage at work',
              prompt:
                'Think of a team you have worked in. Pick two tasks and estimate how long each member took for each. Compute opportunity costs, say who had the comparative advantage in each task, and compare with how the work was actually divided. If it differed, give a reason that the simple model leaves out (learning, enjoyment, fairness). About 200 words.',
              kind: 'writing',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'Can one producer have a comparative advantage in both of two goods? Explain.',
              answerOutline: 'No. For one producer the two opportunity costs are reciprocals; if one is lower than the other producer\'s, the other must be higher.',
            },
            {
              question: 'With an output table (maximum units per year), how do you compute the opportunity cost of good X?',
              answerOutline: 'Divide the maximum of the other good by the maximum of X: units of Y given up per unit of X. With an input table you divide labour per unit of X by labour per unit of Y.',
            },
            {
              question: 'Why does it matter that the trading price lies between the two producers\' opportunity costs?',
              answerOutline: 'Each producer gains only if it gets more for its export than its own opportunity cost of producing the import itself. Outside that range one side would rather produce both goods itself.',
            },
          ],
        },
        {
          slug: 'gains-from-trade',
          title: 'Gains from trade, and who loses',
          summary:
            'Specialisation and trade raise total output, but the gains are not spread evenly. Learn the range of mutually beneficial prices and what the evidence says about trade\'s losers.',
          estimatedMinutes: 100,
          objectives: [
            'Find the range of terms of trade at which both parties gain',
            'Show the gains from trade as consumption outside the production possibilities frontier',
            'Explain why trade can benefit a country while harming particular workers and regions',
            'Summarise the evidence on the "China shock" and its limits',
            'Name sources of comparative advantage beyond opportunity cost tables',
          ],
          concepts: [
            'Terms of trade',
            'Mutually beneficial price range',
            'Consumption possibilities beyond the PPF',
            'Partial specialisation',
            'Intra-industry trade and economies of scale',
            'Winners and losers from trade',
            'Trade adjustment',
          ],
          explanation: `Two parties gain from specialising and trading if the **terms of trade**, the amount of one good exchanged for a unit of the other, lies between their opportunity costs. In the Home and Foreign example, wheat cost Home 0.5 cloth and Foreign 2 cloth, so any price between 0.5 and 2 cloth per wheat makes both better off. Where the price falls in that range decides how the gains are split, a question of bargaining power and world markets rather than efficiency.

**A harder case.** Suppose Home can make 60 wheat or 30 cloth and Foreign only 20 wheat or 20 cloth: Home has an absolute advantage in both. Opportunity costs of wheat are 0.5 cloth in Home and 1 cloth in Foreign, so Home should lean towards wheat. Without trade Home makes 45 wheat and 7.5 cloth, Foreign 10 and 10. If Home specialises in wheat (60) and Foreign in cloth (20), world wheat rises from 55 to 60 and cloth from 17.5 to 20. At a price of 0.75 cloth per wheat, Home exports 12 wheat for 9 cloth. Home then consumes 48 wheat and 9 cloth (3 and 1.5 more than before) and Foreign 12 wheat and 11 cloth (2 and 1 more). Gains exist even for the weaker producer, because it is the *opportunity* cost that matters.

\`\`\`interactive
ppf
{"mode": "trade", "title": "Absolute advantage in both goods", "xLabel": "wheat", "yLabel": "cloth", "countries": [{"name": "Home", "x": 60, "y": 30}, {"name": "Foreign", "x": 20, "y": 20}], "autarky": [[45, 7.5], [10, 10]], "price": 0.75, "traded": 12, "caption": "Home is better at both goods, yet at 0.75 cloth per wheat with 12 wheat traded, both countries consume more of both goods than without trade. Slide the price towards 0.5 and Foreign gets more of the gain; towards 1 and Home does. Outside the range 0.5 to 1, or with too much or too little traded, one country ends up with less of some good."}
\`\`\`

**Where comparative advantage comes from.** Climate and land, skills and capital, institutions, and accumulated know-how. Much trade is between similar rich economies swapping varieties of the same products (German and Japanese cars), driven by economies of scale and consumer love of variety rather than opportunity cost tables.

**Who loses.** The model says total output rises; it does not say every person gains. When imports expand, workers in import-competing industries can lose jobs, and if they cannot easily move or retrain, losses persist. Autor, Dorn and Hanson (2013) studied US local labour markets exposed to rising imports from China after 1990. They estimated that this import competition explained about one quarter of the decline in US manufacturing employment over 1990–2007, with lasting falls in employment and wages and rises in disability and other transfer payments in exposed areas. Later work debates the size, and consumers everywhere gained from lower prices, but the regional concentration of losses is now widely accepted. "Trade raises national income" and "trade hurts some people badly" are both true, and policy debates (adjustment assistance, retraining, tariffs) are about what to do with that pair of facts.`,
          resources: [
            ostx('19-4-the-benefits-of-reducing-barriers-to-international-trade', '19.4 The benefits of reducing barriers to international trade', 'Gains from trade and who bears adjustment costs.', true),
            ostx('19-3-intra-industry-trade-between-similar-economies', '19.3 Intra-industry trade between similar economies', 'Trade driven by scale and variety.'),
            nber('w18054', 'The China Syndrome: Local labor market effects of import competition in the United States', 'Autor, Dorn and Hanson', 'Read the introduction and conclusion. Published in the American Economic Review, 2013.'),
            mru('trade', 'trade-specialization-economics-globalization', 'Trade and specialisation', 'A short video on why specialisation raises output.'),
            { title: 'Trade and globalization', url: 'https://ourworldindata.org/trade-and-globalization', type: 'dataset', cost: 'free', provider: 'Our World in Data', note: 'Charts of trade as a share of GDP across countries and time, used in the exercise.' },
          ],
          exercises: [
            {
              slug: 'price-range',
              title: 'Which prices work?',
              prompt:
                'Country A can make 100 phones or 50 tables; country B can make 30 phones or 30 tables. (a) Compute opportunity costs and comparative advantage. (b) Give the range of prices (tables per phone) at which both gain. (c) Without trade A makes 80 phones and 10 tables, and B 10 phones and 20 tables. Check that both points lie on the frontiers. A specialises in phones and B in tables. At 0.75 tables per phone, A exports just enough phones to buy 10 tables. How many phones is that, and what does each country consume and gain? (d) Repeat at 0.9 tables per phone. Which country prefers which price, and why?',
              kind: 'problem',
              difficulty: 2,
              hint: 'A: a phone costs 0.5 tables; B: 1 table, so the range is 0.5 to 1. At 0.75, A exports 10/0.75 ≈ 13.3 phones: A consumes about (86.7, 10) and B (13.3, 20), gains of 6.7 and 3.3 phones. At 0.9, A exports 11.1 and gains 8.9 phones; B gains 1.1.',
            },
            {
              slug: 'trade-openness-data',
              title: 'Trade openness over time',
              prompt:
                'Using Our World in Data, record trade (exports plus imports) as a share of GDP for the United States, Germany, China and one small economy of your choice in 1970, 1990, 2008 and the latest year shown. Describe the pattern in about 150 words, and explain why a small economy usually has a much higher share. Note the date of the latest observation.',
              kind: 'data-analysis',
              difficulty: 1,
            },
            {
              slug: 'winners-and-losers-memo',
              title: 'Winners and losers memo',
              prompt:
                'A city has lost a furniture factory to import competition. Write a 300-word memo to its mayor that (a) explains, with the comparative advantage model, why national income can rise while the city loses; (b) summarises what Autor, Dorn and Hanson found about how lasting such losses are; and (c) lists two policy responses with one benefit and one cost of each. Keep positive and normative claims clearly separate.',
              kind: 'writing',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Two countries have opportunity costs of 0.5 and 2 units of cloth per unit of wheat. Which prices let both gain?',
              answerOutline: 'Any price strictly between 0.5 and 2 cloth per wheat; at the end points one country is no better off.',
            },
            {
              question: 'Why can trade raise a country\'s total income while making some of its citizens worse off?',
              answerOutline: 'Specialisation raises total output and lowers prices, but production shifts away from import-competing industries; workers and regions tied to them can lose income, and losses persist if moving or retraining is costly.',
            },
            {
              question: 'Give one source of trade that the opportunity-cost model alone does not explain.',
              answerOutline: 'Economies of scale and demand for variety drive intra-industry trade between similar countries (e.g. cars traded both ways).',
            },
          ],
        },
        {
          slug: 'markets-and-the-price-system',
          title: 'Markets and the price system',
          summary:
            'How prices pass information and incentives through an economy without a central plan, what institutions markets need, and where the invisible hand fails.',
          estimatedMinutes: 90,
          objectives: [
            'Explain how a price change coordinates the decisions of buyers and sellers who never meet',
            'Describe Hayek\'s argument about knowledge in society',
            'Compare market, command and mixed economies',
            'Name the institutions markets rely on, such as property rights and contract enforcement',
            'List the main reasons markets can fail, previewing later modules',
          ],
          concepts: [
            'Price signals',
            'Invisible hand (Adam Smith, 1776)',
            'Dispersed knowledge (Hayek, 1945)',
            'Market, command and mixed economies',
            'Property rights and the rule of law',
            'Market failure',
          ],
          explanation: `A modern economy produces millions of goods with no one in charge. How do the plans of buyers and sellers fit together? Through **prices**. A price does three jobs at once: it carries **information** (something has become scarcer or more wanted), it creates an **incentive** to respond (use less, produce more), and it **allocates** goods to those willing to pay most.

Friedrich Hayek's 1945 essay "The Use of Knowledge in Society" makes the point with tin. Suppose a new use for tin appears somewhere, or a mine closes. Tin users everywhere do not need to know which happened, or why. They only see the price of tin rise, and each economises on tin in the way that suits their own circumstances, which no planner could know. The price summarises knowledge that is dispersed across millions of people. Adam Smith's **invisible hand** (1776) is the older version of the idea: people pursuing their own interest are led, through prices and competition, to serve others.

**What happens without price signals.** In 1973–74 and again in 1979, US price controls on gasoline kept prices below market-clearing levels during oil supply shocks. The shortage did not disappear; it showed up as queues, odd-even rationing days and stations running dry. Time spent queuing replaced money as the way gasoline was allocated, and it did nothing to encourage more supply. You will analyse this precisely in the price-ceiling lesson.

**Economic systems.** In a **command economy**, such as the Soviet Union, central planners set output and prices. Planners struggled with exactly Hayek's problem: they lacked the local knowledge and the incentives that prices supply. In a **market economy**, households and firms decide. Every real economy is **mixed**: the United States has largely market prices but also public schools, regulation, taxes and transfers.

**Markets need institutions.** Exchange works when property rights are clear, contracts are enforced, and information is good enough to trust what is sold. Without them, trade shrinks to what can be done face to face.

**Where the hand fails.** Prices can be wrong guides when actions harm people outside the transaction (pollution), when goods cannot be withheld from non-payers (national defence), when one seller has market power, or when one side knows much more than the other. Markets can also deliver efficient outcomes that many find unfair. Modules 5, 8 and 9 take these up one by one.`,
          resources: [
            ostx('1-4-how-to-organize-economies-an-overview-of-economic-systems', '1.4 How to organize economies: an overview of economic systems', 'Market, command and mixed economies.', true),
            ostx('4-3-the-market-system-as-an-efficient-mechanism-for-information', '4.3 The market system as an efficient mechanism for information', 'Prices as information, in OpenStax\'s words.'),
            mru('the-price-system', 'information-problem-economics-hayek', 'The information problem and Hayek', 'The tin example on video.'),
            mru('the-price-system', 'economic-problem-central-planning-70s-oil-crisis', 'The 1970s oil crisis and central planning', 'What happened when gasoline prices were not allowed to signal scarcity.'),
          ],
          exercises: [
            {
              slug: 'trace-a-price-signal',
              title: 'Trace a price signal',
              prompt:
                'A drought cuts the coffee harvest in Brazil, the largest producer. Trace at least five decisions, by different people in different countries, that change when the world coffee price rises: growers elsewhere, roasters, cafés, consumers, and producers of a substitute. For each, say what information they needed and whether they needed to know about the drought.',
              kind: 'writing',
              difficulty: 1,
            },
            {
              slug: 'read-hayek',
              title: 'Read Hayek',
              prompt:
                'Find and read Hayek\'s 1945 essay "The Use of Knowledge in Society" (it is widely available online, for example from the Library of Economics and Liberty). Answer in about 300 words: (a) What kind of knowledge does Hayek say planners cannot collect? (b) How does a price system economise on knowledge? (c) Give one modern case where you think his argument is strongest and one where you think it is weakest, and say why.',
              kind: 'reading',
              difficulty: 2,
            },
            {
              slug: 'market-failure-preview',
              title: 'Is the hand invisible or missing?',
              prompt:
                'For each case, say whether you would expect an unregulated market to produce roughly the right amount, too much or too little, and name the reason: (a) wheat; (b) flu vaccinations; (c) a city\'s fireworks display; (d) a factory\'s smoke; (e) used cars sold by private owners; (f) the only water utility in a town. Revisit your answers at the end of the course.',
              kind: 'problem',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'Name the three jobs a price does in a market economy.',
              answerOutline: 'It signals information about scarcity, gives incentives to respond (buyers economise, sellers supply more), and allocates goods to buyers willing to pay.',
            },
            {
              question: 'What was Hayek\'s main argument against central planning?',
              answerOutline: 'Knowledge of local circumstances is dispersed and often tacit; no planner can gather it, while prices let each person act on their own knowledge and summarise it for everyone else.',
            },
            {
              question: 'Give two reasons a market outcome might not be efficient.',
              answerOutline: 'Any two of: externalities, public goods, market power, asymmetric information (or missing institutions such as property rights).',
            },
          ],
        },
      ],
    },
    {
      slug: 'supply-and-demand',
      title: 'Supply and Demand',
      description:
        'The central model of the course: demand, supply, market equilibrium, and how equilibrium price and quantity respond when the curves shift, solved with graphs and with linear algebra.',
      lessons: [
        {
          slug: 'demand',
          title: 'Demand',
          summary:
            'The law of demand, demand schedules and curves, market demand as a sum of individual demands, and the factors that shift demand rather than move along it.',
          estimatedMinutes: 100,
          objectives: [
            'State the law of demand and explain why demand curves slope down',
            'Convert a demand schedule into an equation and a graph, in both Q-of-P and P-of-Q form',
            'Add individual demand curves horizontally to get market demand',
            'List the determinants of demand and classify goods as normal or inferior, substitutes or complements',
            'Distinguish a change in demand from a change in quantity demanded',
          ],
          concepts: [
            'Quantity demanded',
            'Law of demand',
            'Demand schedule and demand curve',
            'Inverse demand (price as a function of quantity)',
            'Market demand as a horizontal sum',
            'Normal and inferior goods',
            'Substitutes and complements',
            'Change in demand versus change in quantity demanded',
          ],
          explanation: `**Quantity demanded** is the amount buyers are willing and able to buy at a given price, over a given period, holding everything else constant. A **demand schedule** lists quantity demanded at each price; the **demand curve** graphs it. The **law of demand** says that, other things equal, a higher price means a lower quantity demanded. Two reasons, developed in Module 6: when a good gets dearer people switch to substitutes, and the same income buys less.

**Running example.** In a small city's summer market for strawberries, with $Q$ in thousands of pints a week and $P$ in USD per pint,

$$
Q_d = 120 - 10P.
$$

At USD 4 buyers want 80 thousand pints, at USD 6 they want 60, at USD 10 only 20. Solving for $P$ gives the **inverse demand** $P = 12 - 0.1Q$, which is what you draw with price on the vertical axis: the intercept 12 is the price at which no one buys, and the slope $-0.1$ says each extra thousand pints sells only if price falls by 10 cents.

**Market demand is a horizontal sum.** At each price, add up what every buyer wants. If Ana wants $6 - P$ pints and Ben $4 - 0.5P$, then at a price of 2 the market wants $4 + 3 = 7$. Add quantities, not prices. Note the kink: below USD 6 both buy, and between USD 6 and USD 8 only Ben does.

**What shifts demand.** The curve is drawn holding these constant; when one changes, the whole curve moves:

- **Income.** For a **normal good**, more income raises demand (restaurant meals). For an **inferior good**, it lowers demand (instant noodles, long bus journeys).
- **Prices of related goods.** A rise in the price of a **substitute** raises demand (blueberries get dearer, strawberries gain). A rise in the price of a **complement** lowers it (dearer cream, fewer strawberries).
- **Tastes and information**, such as a health report.
- **Expectations** of future prices or income.
- **The number and kind of buyers**, for example tourists arriving in summer.

**Movement versus shift.** A change in the good's *own* price moves you **along** the curve: a **change in quantity demanded**. A change in anything else **shifts** the curve: a **change in demand**. "The price rose, so demand fell" is a classic error; quantity demanded fell. If demand increases by 30 thousand pints at every price, the new curve is $Q_d = 150 - 10P$.

Read OpenStax 3.1 and the demand part of 3.2, and watch the two MRU videos on demand.`,
          resources: [
            ostx('3-1-demand-supply-and-equilibrium-in-markets-for-goods-and-services', '3.1 Demand, supply and equilibrium in markets for goods and services', 'Read the demand half now and the rest in the next two lessons.', true),
            ostx('3-2-shifts-in-demand-and-supply-for-goods-and-services', '3.2 Shifts in demand and supply', 'The determinants of demand, with examples.'),
            mru('supply-demand-and-equilibrium', 'graphing-demand-curve-demand-schedule-and-how-read', 'The demand curve', 'Reading a demand curve two ways.'),
            mru('supply-demand-and-equilibrium', 'what-shifts-demand-curve', 'What shifts the demand curve?', 'Each determinant with an example.'),
          ],
          exercises: [
            {
              slug: 'demand-schedule-to-equation',
              title: 'From schedule to equation',
              prompt:
                'A demand schedule: at USD 2 buyers want 900 units, at USD 4 they want 700, at USD 6 they want 500, at USD 8 they want 300. (a) Write $Q_d$ as a linear function of $P$. (b) Write the inverse demand. (c) What price makes quantity demanded zero? (d) Demand rises by 200 units at every price: write the new curve in both forms.',
              kind: 'problem',
              difficulty: 1,
              hint: 'Each USD 2 lowers Q by 200, so Q = 1100 − 100P and P = 11 − 0.01Q. After the increase, Q = 1300 − 100P.',
            },
            {
              slug: 'horizontal-sum',
              title: 'Add two buyers',
              prompt:
                'Ana\'s demand is $q_A = 6 - P$ and Ben\'s is $q_B = 4 - 0.5P$ (zero when negative). (a) Find market quantity demanded at P = 0, 2, 4, 6 and 8. (b) Write the market demand curve piece by piece and say where the kink is. (c) Graph both individual curves and the market curve. (d) Explain why you add quantities and not prices.',
              kind: 'problem',
              difficulty: 2,
              hint: 'Ana stops buying at P = 6 and Ben at P = 8. For P below 6 both buy: Q = 10 − 1.5P. Between 6 and 8 only Ben buys: Q = 4 − 0.5P. The kink is at P = 6, where Q = 1.',
            },
            {
              slug: 'shift-or-move',
              title: 'Shift or movement?',
              prompt:
                'For the market for coffee, say whether each event causes a movement along the demand curve or a shift (and which way), and name the determinant: (a) the price of coffee rises; (b) tea becomes cheaper; (c) a study links coffee to longer life; (d) incomes rise (assume coffee is normal); (e) people expect coffee prices to jump next month; (f) the price of sugar rises sharply.',
              kind: 'problem',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'What is the difference between "demand" and "quantity demanded"?',
              answerOutline: 'Demand is the whole relation between price and quantity (the curve). Quantity demanded is the amount at one price (a point). Own-price changes move along the curve; other changes shift it.',
            },
            {
              question: 'Incomes rise and sales of a good fall, other things equal. What kind of good is it?',
              answerOutline: 'An inferior good: demand decreases when income increases.',
            },
            {
              question: 'Why is market demand found by adding individual quantities at each price?',
              answerOutline: 'Everyone faces the same market price, and the market quantity at that price is the total bought by all buyers.',
            },
          ],
        },
        {
          slug: 'supply',
          title: 'Supply',
          summary:
            'The law of supply, why supply curves slope up, market supply, and the factors that shift supply.',
          estimatedMinutes: 90,
          objectives: [
            'State the law of supply and connect the upward slope to rising marginal cost',
            'Write a linear supply curve in both forms and find its price intercept',
            'List the determinants of supply and predict the direction of a shift',
            'Distinguish a change in supply from a change in quantity supplied',
          ],
          concepts: [
            'Quantity supplied',
            'Law of supply',
            'Supply schedule and supply curve',
            'Inverse supply and the minimum supply price',
            'Market supply as a horizontal sum',
            'Input prices and technology',
            'Change in supply versus change in quantity supplied',
          ],
          explanation: `**Quantity supplied** is the amount sellers are willing and able to sell at a given price over a period, other things equal. The **law of supply** says that a higher price raises quantity supplied. The reason is cost: producing more usually means using worse land, paying overtime or running machines harder, so the **marginal cost** of extra output rises, and a seller will offer more only if the price covers that higher cost. Module 8 shows that a competitive firm's supply curve *is* its marginal cost curve.

**Running example.** Strawberry growers around the city supply

$$
Q_s = 20P - 60 \\qquad (P \\ge 3),
$$

with $Q$ in thousands of pints a week. At USD 3 they supply nothing (that is the lowest price that covers the cheapest grower's cost), at USD 6 they supply 60 and at USD 8 they supply 100. The inverse supply is $P = 3 + 0.05Q$: the intercept 3 is the minimum supply price, and each extra thousand pints needs a price 5 cents higher.

**Market supply** adds the quantities of every seller at each price, just as market demand does.

**What shifts supply.** The supply curve holds these constant:

- **Input prices.** Higher wages for pickers or dearer fertiliser raise costs and shift supply left.
- **Technology.** Better varieties or machines lower costs and shift supply right.
- **Prices of other goods the sellers could produce.** If raspberries become more profitable, some growers switch fields and strawberry supply falls.
- **Expectations.** Sellers expecting higher prices later may hold stock back now (for storable goods).
- **The number of sellers**, as firms enter or leave.
- **Natural conditions**: weather, disease, disasters.
- **Taxes and subsidies** per unit, which act like a change in cost (Module 4).

A spring frost that destroys a third of the expected crop might cut quantity supplied by 30 thousand pints at every price: $Q_s = 20P - 90$, or $P = 4.5 + 0.05Q$. Read the shift two ways: 30 fewer units at every price (a horizontal shift), or a price 1.5 higher needed for every quantity (a vertical shift). For a linear curve with slope 0.05 these are the same shift, since $30 \\times 0.05 = 1.5$.

As with demand, a change in the good's own price is a **movement along** the curve (a change in quantity supplied); a change in a determinant is a **shift** (a change in supply).

Read the supply parts of OpenStax 3.1 and 3.2.`,
          resources: [
            ostx('3-1-demand-supply-and-equilibrium-in-markets-for-goods-and-services', '3.1 (supply)', 'The supply schedule and curve.', true),
            ostx('3-2-shifts-in-demand-and-supply-for-goods-and-services', '3.2 (shifts in supply)', 'How production costs shift supply, with a worked example.'),
            mru('supply-demand-and-equilibrium', 'supply-curve-definition-example', 'The supply curve', 'Why it slopes up, using oil wells with different costs.'),
            mru('supply-demand-and-equilibrium', 'what-shifts-the-supply-curve', 'What shifts the supply curve?', 'Each determinant with an example.'),
          ],
          exercises: [
            {
              slug: 'supply-equation',
              title: 'Write the supply curve',
              prompt:
                'At USD 10 a firm group supplies 0 units, at USD 14 it supplies 200 units, and the relation is linear. (a) Write $Q_s$ as a function of $P$ and the inverse supply. (b) A new machine lowers costs by USD 2 per unit at every output. Write the new curve and say how many more units are supplied at USD 14. (c) Explain why "costs fell by USD 2 per unit" is a vertical shift.',
              kind: 'problem',
              difficulty: 1,
              hint: 'Q = 50P − 500 and P = 10 + 0.02Q. With costs down by 2, P = 8 + 0.02Q, so Q = 50P − 400: 100 more at USD 14.',
            },
            {
              slug: 'supply-shifters',
              title: 'Which way does supply move?',
              prompt:
                'For the market for new apartments in a city, say whether each event shifts supply left, shifts it right, or moves along the curve: (a) construction wages rise; (b) the city relaxes height limits; (c) apartment rents rise; (d) builders expect a recession; (e) lumber prices fall; (f) the price of office space rises sharply, and builders can build either.',
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'marginal-cost-story',
              title: 'Why supply slopes up',
              prompt:
                'Five orchards can each supply 10 thousand pints a week. Their costs per pint are USD 3, 4, 5, 6 and 7. (a) Draw the market supply curve (it is a staircase). (b) How much is supplied at a price of USD 5.50? (c) Explain in two sentences how this staircase becomes the smooth line $P = 3 + 0.05Q$ when there are many small growers.',
              kind: 'problem',
              difficulty: 2,
              hint: 'At USD 5.50 the three cheapest orchards supply, 30 thousand pints. With many growers each step is tiny.',
            },
          ],
          selfAssessment: [
            {
              question: 'Why do supply curves usually slope upward?',
              answerOutline: 'Marginal cost rises with output (worse inputs, overtime, capacity limits), so sellers supply more only at a higher price that covers the higher cost.',
            },
            {
              question: 'Wages of farm workers rise. Is that a change in supply or in quantity supplied? Which way?',
              answerOutline: 'A change in supply: higher input costs shift the supply curve left (up).',
            },
            {
              question: 'A supply curve shifts up by USD 1.5 at every quantity. If its slope is 0.05 USD per unit, how far does it shift left?',
              answerOutline: '1.5 / 0.05 = 30 units at every price.',
            },
          ],
        },
        {
          slug: 'market-equilibrium',
          title: 'Market equilibrium',
          summary:
            'Where demand meets supply: solving for equilibrium price and quantity, what happens at other prices, and whether real markets behave this way.',
          estimatedMinutes: 100,
          objectives: [
            'Solve a linear supply and demand model for equilibrium price and quantity',
            'Compute the shortage or surplus at a price away from equilibrium',
            'Explain the process that moves price toward equilibrium',
            'State what laboratory experiments show about convergence to equilibrium',
            'Derive the general formula for equilibrium in a linear model',
          ],
          concepts: [
            'Equilibrium price and quantity',
            'Market clearing',
            'Shortage (excess demand)',
            'Surplus (excess supply)',
            'Price adjustment',
            'Double auction experiments',
          ],
          explanation: `A market is in **equilibrium** when the quantity buyers want equals the quantity sellers want at the going price. Nobody who would trade at that price is left out, so there is no pressure for the price to change.

**Solve the strawberry market.** Set quantity demanded equal to quantity supplied:

$$
120 - 10P = 20P - 60 \\;\\Rightarrow\\; 180 = 30P \\;\\Rightarrow\\; P^* = 6, \\quad Q^* = 120 - 60 = 60.
$$

Check with supply: $20 \\cdot 6 - 60 = 60$. With the inverse forms the same answer comes from $12 - 0.1Q = 3 + 0.05Q$, so $Q^* = 9/0.15 = 60$ and $P^* = 6$. Always check your answer in both equations.

**Away from equilibrium.** At USD 8, buyers want 40 and sellers offer 100: a **surplus** (excess supply) of 60. Unsold strawberries spoil, so sellers cut prices. At USD 4, buyers want 80 and sellers offer only 20: a **shortage** (excess demand) of 60. Buyers bid up the price and sellers notice they sell out early. Both forces push towards USD 6. A shortage is not the same as scarcity: strawberries are scarce at every price, but a shortage exists only when the price is below equilibrium.

\`\`\`interactive
supply-demand
{"title": "The strawberry market", "demand": [12, 0.1], "supply": [3, 0.05], "xLabel": "Pints (thousands per week)", "yLabel": "Price (USD)", "priceUnit": "USD", "quantityUnit": "thousand pints", "view": [0, 130, 0, 13], "shiftRange": 40, "showSurplus": false, "showElasticity": false, "caption": "Demand P = 12 − 0.1Q and supply P = 3 + 0.05Q cross at E, with Q* = 60 thousand pints and P* = USD 6. Move the demand slider to +30: the new equilibrium is P = 7, Q = 80, as in the next lesson. Then set supply to −30 as well and check P = 8, Q = 70. The faint dashed lines are the original curves."}
\`\`\`

**The general formula.** With $Q_d = a - bP$ and $Q_s = c + dP$ (where $b, d > 0$),

$$
P^* = \\frac{a - c}{b + d}, \\qquad Q^* = a - bP^*.
$$

Read it: anything that raises $a$ (more demand) raises the price, and anything that raises $c$ (more supply) lowers it. Using the formula is fine, but solving each problem from the two equations is safer than memorising.

**Does the model describe real markets?** Vernon Smith ran classroom markets from the 1950s in which each buyer was given a private value and each seller a private cost, then they traded by calling out bids and offers (a **double auction**). Even with few traders who knew nothing about the curves, prices converged quickly to the equilibrium the curves predicted. Smith shared the 2002 Nobel Prize partly for this. Real markets also have frictions: prices of contracts, menus and wages may adjust slowly, and some markets are dominated by a few sellers (Module 8). The model is a good first approximation for markets with many buyers and sellers of a fairly standard good.`,
          resources: [
            ostx('3-1-demand-supply-and-equilibrium-in-markets-for-goods-and-services', '3.1 (equilibrium)', 'Equilibrium, surpluses and shortages.', true),
            mru('supply-demand-and-equilibrium', 'equilibrium-price-supply-demand-example', 'Equilibrium price and quantity', 'How the market finds the equilibrium.'),
            mru('supply-demand-and-equilibrium', 'does-equilibrium-model-work', 'Does the equilibrium model work?', 'Vernon Smith\'s experiments on video.'),
            { title: 'The Prize in Economic Sciences 2002: popular information', url: 'https://www.nobelprize.org/prizes/economic-sciences/2002/popular-information/', type: 'article', cost: 'free', provider: 'The Nobel Prize', note: 'The experimental-economics half explains Smith\'s market experiments.' },
            mit('lec-1-introduction-to-principles-of-microeconomics-and-supply-demand', 'Lecture 1, Introduction and supply and demand', 'Optional: a full MIT lecture. Gruber uses some calculus.'),
          ],
          exercises: [
            {
              slug: 'solve-three-markets',
              title: 'Solve three markets',
              prompt:
                'Find equilibrium price and quantity, and check in both equations: (a) $Q_d = 200 - 4P$, $Q_s = 6P - 50$; (b) $P = 90 - 2Q$, $P = 10 + 2Q$; (c) $Q_d = 1000 - 25P$, $Q_s = 15P$. For (a), compute the shortage or surplus at P = 20 and at P = 30.',
              kind: 'problem',
              difficulty: 1,
              hint: '(a) P = 25, Q = 100; at P = 20 a shortage of 120 − 70 = 50; at 30 a surplus of 130 − 80 = 50. (b) Q = 20, P = 50. (c) P = 25, Q = 375.',
            },
            {
              slug: 'general-formula',
              title: 'Derive the formula',
              prompt:
                'For $Q_d = a - bP$ and $Q_s = c + dP$ with $b, d > 0$: (a) derive $P^*$ and $Q^*$; (b) show that $Q^*$ can be written as $(ad + bc)/(b + d)$; (c) find the condition for $Q^* > 0$; (d) using your formulas, show that an increase in $a$ raises both $P^*$ and $Q^*$ and an increase in $c$ lowers $P^*$ but raises $Q^*$.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'run-a-double-auction',
              title: 'Run a double auction',
              prompt:
                'With friends or by simulation, give five "buyers" values of 10, 9, 8, 7, 6 and five "sellers" costs of 4, 5, 6, 7, 8 (one unit each). Let them trade by calling out bids and asks for several rounds, recording each price. (a) Draw the stepped supply and demand curves and find the predicted price range and quantity. (b) Compare the recorded prices and quantity with the prediction. If you simulate, describe your trading rule in a few lines of pseudocode.',
              kind: 'simulation',
              difficulty: 2,
              hint: 'The curves meet at a price of 7. Three trades are certain (buyers 10, 9, 8 with sellers 4, 5, 6); a fourth, between the buyer who values the unit at 7 and the seller whose cost is 7, gains nothing, so 3 or 4 units trade at a price near 7.',
            },
          ],
          selfAssessment: [
            {
              question: 'At a price below equilibrium, which is larger, quantity demanded or quantity supplied, and what happens next?',
              answerOutline: 'Quantity demanded exceeds quantity supplied (a shortage); buyers bid the price up and sellers raise it until the shortage disappears.',
            },
            {
              question: 'Solve: demand P = 12 − 0.1Q and supply P = 3 + 0.05Q.',
              answerOutline: '12 − 0.1Q = 3 + 0.05Q gives Q = 60 and P = 6.',
            },
            {
              question: 'What did Vernon Smith\'s experiments show?',
              answerOutline: 'Markets with a few traders who knew only their own value or cost converged quickly to the competitive equilibrium price and quantity in a double auction.',
            },
          ],
        },
        {
          slug: 'changes-in-equilibrium',
          title: 'Changes in equilibrium',
          summary:
            'The four-step method for predicting how a shock changes price and quantity, cases where both curves shift, and a real case: egg prices during avian flu.',
          estimatedMinutes: 100,
          objectives: [
            'Apply the four-step method to predict the effects of a shock on equilibrium',
            'Solve for the new equilibrium after a shift in a linear model',
            'Explain why the effect on price or quantity is ambiguous when both curves shift',
            'Analyse a real price spike using supply and demand and official data',
          ],
          concepts: [
            'Comparative statics',
            'The four-step method',
            'Shift versus movement along a curve',
            'Simultaneous shifts and ambiguous effects',
            'Supply shock',
            'Inelastic demand amplifies price changes',
          ],
          explanation: `**Comparative statics** compares two equilibria, before and after a change, without tracing the path between them. OpenStax suggests four steps:

1. Draw the market before the change.
2. Decide whether the event affects demand, supply or both.
3. Decide the direction of each shift.
4. Find the new equilibrium and compare price and quantity.

**Demand increases.** A heat wave brings tourists: demand for strawberries rises by 30 thousand pints at every price, to $Q_d = 150 - 10P$. Solve $150 - 10P = 20P - 60$: $P = 7$, $Q = 80$. Price and quantity both rise. Note what moved: the *demand curve* shifted; along the unchanged supply curve, *quantity supplied* rose from 60 to 80 because the price rose.

**Supply decreases.** Instead, a frost cuts supply by 30 at every price, to $Q_s = 20P - 90$. Then $120 - 10P = 20P - 90$ gives $P = 7$, $Q = 50$. Price rises and quantity falls.

**Both at once.** With the tourists *and* the frost, $150 - 10P = 20P - 90$ gives $P = 8$, $Q = 70$. Here both shocks push price up, so price certainly rises; quantity rises because the demand shift happened to have the bigger effect. In general, when demand rises and supply falls, the **direction of the price change is certain but the quantity change is ambiguous**; it depends on the sizes of the shifts and the slopes. When both increase, quantity rises and price is ambiguous. Use the widget in the previous lesson to try shifts of different sizes and confirm.

**A real case: eggs.** Highly pathogenic avian influenza spread through US poultry flocks from 2022, and infected flocks were culled, removing large numbers of laying hens. That is a leftward shift of supply. Demand for eggs is fairly insensitive to price in the short run (there are few close substitutes in breakfasts and baking), so a supply cut raises price a lot and lowers quantity only a little. The US average retail price of a dozen grade A large eggs, published by the Bureau of Labor Statistics, reached a record of about USD 6.23 in March 2025, then fell back as flocks were rebuilt; it was about USD 2.27 as of September 2026 (FRED series APU0000708111). Prices are an outcome of supply and demand together, so a full analysis also checks for demand shifts (holiday baking) and for market power among producers, which some observers raised; the simple model is the starting point, not the last word.

\`\`\`interactive
supply-demand
{"title": "An egg supply shock (illustrative numbers)", "demand": [12.5, 0.1], "supply": [0, 0.025], "xLabel": "Eggs (index, 100 = before)", "yLabel": "Price (USD per dozen)", "priceUnit": "USD", "view": [0, 150, 0, 7], "shiftRange": 60, "controls": ["supplyShift"], "showSurplus": false, "showElasticity": true, "caption": "Demand is steep: its elasticity at the start is −0.25, while supply's is 1. Shift supply left by 40: the price rises from USD 2.50 to 3.30, about 32%, while quantity falls only 8%, from 100 to 92. With flatter, more elastic demand the same shift would mostly cut quantity instead; Module 4 measures this. The numbers are invented to show the shape, not estimated from data."}
\`\`\``,
          resources: [
            ostx('3-3-changes-in-equilibrium-price-and-quantity-the-four-step-process', '3.3 Changes in equilibrium price and quantity: the four-step process', 'Worked shifts, including both curves at once.', true),
            mru('supply-demand-and-equilibrium', 'change-demand-vs-change-quantity-demanded', 'Change in demand versus change in quantity demanded', 'The most common confusion, cleared up.'),
            fred('APU0000708111', 'Average price of eggs, grade A, large, per dozen (US city average)', 'BLS data, monthly. Use it in the module project.'),
            core('08-supply-demand-06-changes-in-supply-demand', 'Unit 8.6 Changes in supply and demand', 'Another treatment, with the Civil War cotton shock.'),
          ],
          exercises: [
            {
              slug: 'four-steps',
              title: 'Four steps, six shocks',
              prompt:
                'For the market for electric cars, use the four steps to predict the direction of price and quantity changes: (a) battery costs fall; (b) gasoline prices rise; (c) a tax credit for buyers is introduced; (d) both (a) and (c) happen; (e) lithium prices spike and incomes fall at the same time; (f) a new rival model is announced for next year. Where the result is ambiguous, say what it depends on.',
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'solve-shifts',
              title: 'Solve the shifts',
              prompt:
                'Demand is $Q_d = 300 - 5P$ and supply $Q_s = 10P - 60$. (a) Find the equilibrium. (b) Demand rises by 45 units at every price; find the new equilibrium. (c) Instead, supply falls by 45 units at every price; find it. (d) Both happen; find it. (e) In (d), how big would the demand increase need to be for quantity to be unchanged?',
              kind: 'problem',
              difficulty: 2,
              hint: '(a) P = 24, Q = 180. (b) P = 27, Q = 210. (c) P = 27, Q = 165. (d) P = 30, Q = 195. (e) A demand shift of x raises Q* by 10x/15 and the supply cut lowers it by 5 × 45/15 = 15, so x = 22.5.',
            },
            {
              slug: 'egg-prices-fred',
              title: 'Egg prices on FRED',
              prompt:
                'Open FRED series APU0000708111. (a) Record the price in January 2020, the peak month and price since then, and the latest value with its date. (b) Mark the main avian influenza waves (search USDA announcements). (c) In about 200 words, explain the pattern with supply and demand, say why a supply shock to eggs moves price more than quantity, and list one thing the data cannot tell you.',
              kind: 'data-analysis',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Demand rises and supply rises at the same time. What can you say for sure?',
              answerOutline: 'Equilibrium quantity rises; the price change is ambiguous and depends on which shift is larger and on the slopes.',
            },
            {
              question: 'A frost raises the price of strawberries. Did the demand for strawberries fall?',
              answerOutline: 'No. Supply fell; the higher price reduced quantity demanded, a movement along an unchanged demand curve.',
            },
            {
              question: 'Why does a supply shock raise the price more when demand is steep (inelastic)?',
              answerOutline: 'With inelastic demand, buyers cut purchases little as price rises, so the price must rise a lot to reduce quantity demanded to the smaller quantity supplied.',
            },
          ],
        },
      ],
      project: {
        slug: 'explain-a-price-spike',
        title: 'Explain a price spike with data',
        description: `Pick one product whose price rose or fell sharply in the last ten years and for which official data exist: eggs (FRED APU0000708111), gasoline (FRED GASREGW or APU000074714), used cars, lumber, or rents (FRED CUSR0000SEHA). Download the price series and at least one series that reflects quantity or a supply or demand shifter (for example vehicle miles travelled, FRED TRFVOLUSM227NFWA, for gasoline). Build an explanation with the supply and demand model: what shifted, in which direction, and why the price moved as much as it did. Then try to rule out at least one alternative explanation with data. State every number with its date and source.`,
        deliverables: [
          'A chart of the price series with the main events marked',
          'A supply and demand diagram (before and after) for each phase you identify',
          'A 600 to 900 word write-up separating what the data show from what you infer',
          'A list of sources with series IDs and the date you downloaded them',
        ],
        estimatedHours: 3,
        stretchGoals: ['Calibrate a linear supply and demand model to two observed points and compute the implied size of the shift'],
      },
    },
    {
      slug: 'elasticity',
      title: 'Elasticity and Its Uses',
      description:
        'How strongly quantities respond to prices and incomes: price, income, cross-price and supply elasticities, what elasticity means for revenue, and who really pays a tax.',
      lessons: [
        {
          slug: 'price-elasticity-of-demand',
          title: 'Price elasticity of demand',
          summary:
            'A unit-free measure of how much quantity demanded responds to price: the midpoint formula, point elasticity on a straight line, its determinants and real estimates.',
          estimatedMinutes: 100,
          objectives: [
            'Compute price elasticity of demand with the midpoint formula',
            'Classify demand as elastic, inelastic or unit elastic',
            'Explain why elasticity changes along a straight-line demand curve even though the slope does not',
            'List the determinants of elasticity and apply them to real goods',
            'Interpret published elasticity estimates and their limits',
          ],
          concepts: [
            'Price elasticity of demand',
            'Midpoint (arc) formula',
            'Point elasticity $-bP/Q$',
            'Elastic, inelastic, unit elastic',
            'Perfectly elastic and perfectly inelastic demand',
            'Slope versus elasticity',
            'Short run versus long run',
          ],
          explanation: `The slope of a demand curve depends on units (pints or thousands of pints, cents or dollars). **Elasticity** removes the units by using percentage changes:

$$
\\varepsilon_d = \\frac{\\%\\Delta Q_d}{\\%\\Delta P}.
$$

It is negative for a normal demand curve; many books report its absolute value. If $|\\varepsilon_d| > 1$ demand is **elastic** (quantity responds more than proportionally), if $|\\varepsilon_d| < 1$ it is **inelastic**, and at exactly 1 it is **unit elastic**.

**The midpoint formula.** A percentage change depends on which end you start from, so between two points use the averages as the base:

$$
\\varepsilon_d = \\frac{(Q_2 - Q_1)/\\bar Q}{(P_2 - P_1)/\\bar P}.
$$

On the strawberry demand $Q_d = 120 - 10P$, a rise from USD 5 to USD 7 lowers quantity from 70 to 50. Then $\\%\\Delta Q = -20/60 = -33.3\\%$ and $\\%\\Delta P = 2/6 = 33.3\\%$, so $\\varepsilon_d = -1$.

**Point elasticity and the straight line.** At a single point, $\\varepsilon_d = (\\Delta Q/\\Delta P)\\cdot(P/Q)$. On $Q_d = 120 - 10P$, $\\Delta Q/\\Delta P = -10$ everywhere, but $P/Q$ changes: at $P = 9$, $\\varepsilon_d = -10 \\cdot 9/30 = -3$ (elastic); at $P = 6$, $-1$; at $P = 3$, $-10 \\cdot 3/90 = -0.33$ (inelastic). A straight demand line is elastic at high prices and inelastic at low prices, so never judge elasticity by steepness alone. The extreme cases are a vertical demand curve (**perfectly inelastic**, $\\varepsilon = 0$) and a horizontal one (**perfectly elastic**).

\`\`\`interactive
supply-demand
{"title": "Elasticity along the demand curve", "demand": [12, 0.1], "supply": [3, 0.05], "xLabel": "Pints (thousands per week)", "yLabel": "Price (USD)", "priceUnit": "USD", "view": [0, 130, 0, 13], "shiftRange": 60, "controls": ["supplyShift", "demandSlope"], "showSurplus": false, "caption": "The readout gives the point elasticity of demand at the equilibrium E. It starts at −1 at P = 6. Shift supply right by 30: E slides down the same straight demand line to P = 5, Q = 70, where the elasticity is −0.71 (inelastic). Shift supply left by 30: E moves up to P = 7, Q = 50 and the elasticity is −1.4 (elastic). The slope of demand never changed. Then make demand steeper with the slope slider and see the elasticity at E fall."}
\`\`\`

**What makes demand elastic?** Close **substitutes** (one brand of cereal is very elastic; food in general is not), whether the good is a **luxury or a necessity**, its **share of the budget**, **time** (people adjust more over months and years than over days), and how **narrowly** the market is defined.

**Evidence.** Hughes, Knittel and Sperling (2008) estimated the short-run price elasticity of US gasoline demand at between −0.21 and −0.34 in 1975–1980 but only −0.034 to −0.077 in 2001–2006: in the short run, a 10% price rise cut gasoline use by well under 1% in the 2000s. Long-run elasticities are larger, because people change cars, commutes and where they live. Elasticity estimates depend on the period, the place and the method, so always ask when and how a number was measured.`,
          resources: [
            ostx('5-1-price-elasticity-of-demand-and-price-elasticity-of-supply', '5.1 Price elasticity of demand and price elasticity of supply', 'The midpoint formula with worked examples.', true),
            ostx('5-2-polar-cases-of-elasticity-and-constant-elasticity', '5.2 Polar cases of elasticity and constant elasticity', 'Perfectly elastic, perfectly inelastic and constant-elasticity curves.'),
            mru('elasticity-and-its-applications', 'elasticity-demand-definition', 'Elasticity of demand', 'Determinants of elasticity.'),
            mru('elasticity-and-its-applications', 'calculate-elasticity-demand-formula', 'Calculating the elasticity of demand', 'The midpoint formula step by step.'),
            nber('w12530', 'Evidence of a shift in the short-run price elasticity of gasoline demand', 'Hughes, Knittel and Sperling', 'Read the abstract and introduction. Published in The Energy Journal, 2008.'),
          ],
          relatedLessons: ['calculus-1/the-derivative/rates-of-change'],
          exercises: [
            {
              slug: 'midpoint-practice',
              title: 'Midpoint practice',
              prompt:
                'Compute the price elasticity of demand with the midpoint formula and classify it: (a) a café raises the price of a latte from USD 4.00 to USD 4.40 and daily sales fall from 300 to 270; (b) a transit agency raises fares from USD 2.00 to USD 2.50 and weekday rides fall from 100,000 to 92,000; (c) a streaming service raises its monthly price from USD 10 to USD 12 and subscribers fall from 5 million to 3.8 million.',
              kind: 'problem',
              difficulty: 1,
              hint: '(a) (−30/285)/(0.4/4.2) ≈ −1.11, elastic. (b) (−8/96)/(0.5/2.25) ≈ −0.375, inelastic. (c) (−1.2/4.4)/(2/11) = −1.5, elastic.',
            },
            {
              slug: 'elasticity-along-a-line',
              title: 'Elasticity along a line',
              prompt:
                'For $Q_d = 200 - 4P$: (a) compute the point elasticity at P = 10, 25 and 40; (b) find the price at which demand is unit elastic; (c) show that for any linear demand $Q = a - bP$ the unit-elastic point is at the midpoint of the line, $P = a/(2b)$; (d) explain why the elasticity of a perfectly vertical demand curve is zero at every price.',
              kind: 'derivation',
              difficulty: 2,
              hint: 'ε = −4P/(200 − 4P): −0.25, −1, −4. Setting bP = a − bP gives P = a/(2b).',
            },
            {
              slug: 'rank-elasticities',
              title: 'Rank by elasticity',
              prompt:
                'Rank these from most to least price elastic and justify each placement with a determinant: insulin for a diabetic patient; Coca-Cola at one particular vending machine on a busy street; gasoline over one week; gasoline over ten years; restaurant meals; salt. Then find one published elasticity estimate for any of them, and state its source, period and method.',
              kind: 'writing',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'Why do economists use percentage changes rather than slopes to measure responsiveness?',
              answerOutline: 'Percentages are unit-free, so elasticities can be compared across goods and units, while slopes depend on how quantity and price are measured.',
            },
            {
              question: 'Is a straight-line demand curve equally elastic everywhere? Explain.',
              answerOutline: 'No. The slope is constant but P/Q changes: elastic at high prices, unit elastic at the midpoint, inelastic at low prices.',
            },
            {
              question: 'Why is the long-run elasticity of gasoline demand larger than the short-run elasticity?',
              answerOutline: 'Over time people can change cars, commutes, jobs and homes; in the short run they mainly drive a bit less.',
            },
          ],
        },
        {
          slug: 'elasticity-and-total-revenue',
          title: 'Elasticity and total revenue',
          summary:
            'Whether a price rise raises or lowers spending depends on elasticity. Use this to explain why bumper harvests can hurt farmers and where revenue is largest.',
          estimatedMinutes: 100,
          objectives: [
            'Apply the total revenue test to predict how spending responds to a price change',
            'Find the revenue-maximising price on a linear demand curve',
            'Connect marginal revenue to elasticity (optional calculus)',
            'Explain real cases where inelastic demand produces surprising revenue effects',
          ],
          concepts: [
            'Total revenue (total expenditure)',
            'Total revenue test',
            'Revenue-maximising price',
            'Marginal revenue',
            'Inelastic demand and farm incomes',
            'Price elasticity and pricing decisions',
          ],
          explanation: `**Total revenue** is price times quantity, $TR = P \\times Q$, which is also buyers' total spending. A price rise has two opposite effects: each unit sold brings in more, but fewer units are sold. Elasticity says which effect wins.

- **Inelastic demand** ($|\\varepsilon| < 1$): quantity falls by a smaller percentage than price rises, so a price rise **raises** revenue.
- **Elastic demand** ($|\\varepsilon| > 1$): quantity falls by more, so a price rise **lowers** revenue.
- **Unit elastic**: revenue is unchanged.

This is the **total revenue test**. It follows from the approximation $\\%\\Delta TR \\approx \\%\\Delta P + \\%\\Delta Q$.

**On a straight line.** With $Q_d = 120 - 10P$,

$$
TR(P) = P(120 - 10P) = 120P - 10P^2.
$$

At USD 4 revenue is $4 \\times 80 = 320$; at USD 6 it is $6 \\times 60 = 360$; at USD 8 it is $8 \\times 40 = 320$. Revenue is a hill with its top at USD 6, exactly where demand is unit elastic (the midpoint of the line). Above USD 6 demand is elastic and cutting the price raises revenue; below it demand is inelastic and raising the price raises revenue.

\`\`\`interactive
function-explorer
{"title": "Total revenue on a straight demand line", "f": ["x*(a - b*x)"], "sliders": {"a": [120, 60, 180, 1], "b": [10, 5, 20, 0.5]}, "view": [0, 16, 0, 700], "caption": "The horizontal axis is the price P and the curve is total revenue P(a − bP) for demand Q = a − bP. With a = 120 and b = 10 revenue peaks at P = 6 with 360, the unit-elastic point. Change a or b: the peak always sits at P = a/(2b), the middle of the demand line, and the hill is symmetric, so P = 4 and P = 8 give the same revenue."}
\`\`\`

**Optional calculus: marginal revenue.** Writing revenue in terms of quantity, $TR(Q) = (12 - 0.1Q)Q$, so $MR = TR'(Q) = 12 - 0.2Q$. Marginal revenue is positive where demand is elastic, zero at $Q = 60$ (unit elastic) and negative beyond. In general $MR = P(1 + 1/\\varepsilon_d)$. A monopolist, which you meet in Module 8, never sets price where demand is inelastic, because there MR is negative and producing less would raise revenue and cut cost.

**Cases.** *Farm incomes*: food demand is inelastic, so a bumper harvest lowers the price so much that total farm revenue can fall; individual farmers want a good harvest but all farmers together may not. *Transit fares*: with inelastic short-run demand, fare rises raise revenue, though over years riders find alternatives. *Illegal drugs*: if demand is inelastic, seizures that cut supply raise prices and can raise sellers' total revenue, an uncomfortable implication explored in the MRU video. In each case the answer depends on the elasticity over the relevant time horizon.`,
          resources: [
            ostx('5-3-elasticity-and-pricing', '5.3 Elasticity and pricing', 'Total revenue and how firms use elasticity; also passing costs on to buyers.', true),
            mru('elasticity-and-its-applications', 'office-hours-elasticity-demand', 'Office hours: elasticity of demand', 'Worked problems, including total revenue.'),
            khan('elasticity-tutorial', 'Elasticity', 'Videos on total revenue and elasticity with practice.'),
            core('07-firm-and-customers-05-demand-elasticity-revenue', 'Unit 7.5 Demand, elasticity, and revenue', 'Elasticity from a firm\'s point of view, with marginal revenue.'),
          ],
          exercises: [
            {
              slug: 'revenue-test',
              title: 'Apply the total revenue test',
              prompt:
                'For each case, say whether total revenue rises or falls, and compute the change where you can: (a) a museum with demand elasticity −0.4 raises its ticket price by 10%; (b) a pizza shop facing elasticity −2.5 cuts prices by 8%; (c) on $Q = 500 - 20P$, the price rises from 10 to 15; (d) on the same curve, from 15 to 20.',
              kind: 'problem',
              difficulty: 1,
              hint: '(a) Quantity falls about 4%: revenue rises about 6%. (b) Quantity rises about 20%: revenue rises about 10% (0.92 × 1.20 ≈ 1.10). (c) 3000 to 3000: unchanged, because 10 and 15 are symmetric about the peak at 12.5. (d) 3000 to 2000: falls.',
            },
            {
              slug: 'revenue-maximum',
              title: 'Find the revenue maximum',
              prompt:
                'Inverse demand for a concert venue is $P = 80 - 0.02Q$. (a) Write total revenue as a function of $Q$. (b) Find the revenue-maximising quantity and price, with algebra (complete the square) or calculus. (c) Show that demand is unit elastic there. (d) If the venue has 1,500 seats, what price should it charge to maximise revenue, and is demand elastic or inelastic at that point?',
              kind: 'derivation',
              difficulty: 2,
              hint: 'TR = 80Q − 0.02Q², maximum at Q = 2000, P = 40. With 1,500 seats, sell them all at P = 80 − 30 = 50, where demand is elastic (ε = −(1/0.02)(50/1500) ≈ −1.67).',
            },
            {
              slug: 'farm-revenue-paradox',
              title: 'The farm revenue paradox',
              prompt:
                'Demand for wheat is $Q = 100 - 2P$ (million bushels, USD per bushel). A normal harvest is 60 million bushels and a bumper harvest 70 million; supply is fixed at harvest. (a) Find the price and total revenue in each case. (b) Compute the elasticity between the two points. (c) Explain in about 100 words why each farmer prays for a good harvest even though farmers as a group earn less from one.',
              kind: 'problem',
              difficulty: 2,
              hint: 'Normal: P = 20, TR = 1,200. Bumper: P = 15, TR = 1,050. Midpoint elasticity (10/65)/(−5/17.5) ≈ −0.54.',
            },
          ],
          selfAssessment: [
            {
              question: 'Demand is inelastic. Does a price cut raise or lower total revenue?',
              answerOutline: 'It lowers revenue: quantity rises by a smaller percentage than price falls.',
            },
            {
              question: 'Where on a straight-line demand curve is total revenue largest, and why?',
              answerOutline: 'At the midpoint, where demand is unit elastic: above it lowering price raises revenue (elastic), below it raising price does (inelastic).',
            },
            {
              question: 'Why would a profit-maximising monopolist never choose a point where demand is inelastic?',
              answerOutline: 'There marginal revenue is negative: cutting output raises revenue and lowers cost, so profit rises.',
            },
          ],
        },
        {
          slug: 'income-cross-and-supply-elasticity',
          title: 'Income, cross-price and supply elasticities',
          summary:
            'The same idea applied to income, to the prices of other goods, and to sellers: how to classify goods and why time matters for supply.',
          estimatedMinutes: 90,
          objectives: [
            'Compute and interpret the income elasticity of demand and classify goods as necessities, luxuries or inferior',
            'Compute and interpret the cross-price elasticity and identify substitutes and complements',
            'Compute the price elasticity of supply and explain its determinants',
            'Explain why supply is more elastic in the long run',
          ],
          concepts: [
            'Income elasticity of demand',
            'Necessity, luxury, inferior good',
            'Cross-price elasticity',
            'Substitutes and complements',
            'Price elasticity of supply',
            'Short-run and long-run supply',
            'Housing supply constraints',
          ],
          explanation: `Elasticity is a general tool: the percentage change in one variable divided by the percentage change in another that causes it.

**Income elasticity of demand** is $\\varepsilon_I = \\%\\Delta Q_d / \\%\\Delta I$, where $I$ is income. Positive means a **normal good**; between 0 and 1 a **necessity** (spending rises with income, but less than proportionally, so its budget share falls); above 1 a **luxury**; negative an **inferior good**. If incomes rise 4% and restaurant meals rise 6%, $\\varepsilon_I = 1.5$. Hughes, Knittel and Sperling's study of US gasoline put the short-run income elasticity between 0.21 and 0.75: a necessity.

**Cross-price elasticity** is $\\varepsilon_{XY} = \\%\\Delta Q_X / \\%\\Delta P_Y$. Positive means **substitutes**: when the price of butter rises 10% and margarine sales rise 5%, the cross elasticity is 0.5. Negative means **complements**: dearer printers, fewer ink cartridges sold. Near zero, unrelated. Antitrust authorities use cross-price elasticities to decide what counts as one market: if a small price rise for one product sends buyers to another, the two compete.

**Price elasticity of supply** is $\\varepsilon_s = \\%\\Delta Q_s / \\%\\Delta P$. In the strawberry market, $Q_s = 20P - 60$, so at the equilibrium $P = 6$, $Q = 60$, $\\varepsilon_s = 20 \\cdot 6/60 = 2$. Supply is more elastic when firms have spare capacity, when inputs can be bought easily, when output can be stored, and above all when there is **time to adjust**. In the very short run the strawberry crop in the field is fixed (vertical supply); over a season growers can pick more intensively; over several years they can plant more fields.

**Housing** is the standard example of inelastic supply. Building takes years, and in many cities zoning, height limits and the geography of hills and water restrict it further. When demand for living in such a city rises, the result is mostly higher prices rather than more homes. The MRU video on housing affordability walks through this argument; research on US metropolitan areas finds supply elasticities differ widely across cities, being lowest where land is scarce and regulation tight.

**A shortcut you will use.** For any linear curve, $\\varepsilon = (\\text{slope of } Q \\text{ in } P) \\times P/Q$. Write the curve with $Q$ on the left first. For the demand $P = 12 - 0.1Q$, $Q = 120 - 10P$ and the coefficient is $-10$, not $-0.1$.`,
          resources: [
            ostx('5-4-elasticity-in-areas-other-than-price', '5.4 Elasticity in areas other than price', 'Income, cross-price, labour supply and savings elasticities.', true),
            mru('elasticity-and-its-applications', 'elasticity-supply-why-housing-unaffordable', 'Elasticity of supply: why is housing unaffordable?', 'Supply elasticity and city regulation.'),
            mru('elasticity-and-its-applications', 'elasticity-supply-midpoint-formula', 'Elasticity of supply and the midpoint formula', 'Computing supply elasticity.'),
            ostx('5-1-price-elasticity-of-demand-and-price-elasticity-of-supply', '5.1 (price elasticity of supply)', 'The supply half of section 5.1.'),
          ],
          exercises: [
            {
              slug: 'classify-by-elasticity',
              title: 'Classify the goods',
              prompt:
                'Household income rises from USD 60,000 to USD 66,000. Annual spending changes as follows (assume prices unchanged): groceries from USD 7,000 to USD 7,200; international travel from USD 2,000 to USD 2,600; generic-brand cereal from USD 120 to USD 100. (a) Compute each income elasticity with the midpoint formula. (b) Classify each good. (c) Compute the share of income spent on groceries before and after and explain the change.',
              kind: 'problem',
              difficulty: 1,
              hint: 'Income change ≈ 9.52%. Groceries ≈ 2.82/9.52 ≈ 0.30 (necessity); travel ≈ 26.1/9.52 ≈ 2.75 (luxury); cereal ≈ −18.2/9.52 ≈ −1.9 (inferior).',
            },
            {
              slug: 'cross-elasticity',
              title: 'Substitutes or complements?',
              prompt:
                'When the price of game consoles rises from USD 400 to USD 500, sales of video games fall from 10 million to 8 million and sales of streaming subscriptions rise from 20 million to 21 million. (a) Compute both cross-price elasticities with the midpoint formula. (b) Classify each relation. (c) Explain how a competition authority might use such numbers to decide whether consoles and streaming are in the same market.',
              kind: 'problem',
              difficulty: 2,
              hint: 'Games: (−2/9)/(100/450) = −1.0, complements. Streaming: (1/20.5)/(100/450) ≈ 0.22, weak substitutes.',
            },
            {
              slug: 'supply-elasticity-time',
              title: 'Supply over three horizons',
              prompt:
                'Sketch the supply of Christmas trees on 20 December, over one year and over ten years, on one graph. Explain the shape of each curve. Then, for the market for rental apartments in a city with strict height limits, explain in about 150 words what you expect to happen to rents and to the number of apartments when demand rises, in the short and the long run.',
              kind: 'writing',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'A good has an income elasticity of 0.4. What kind of good is it, and what happens to its budget share as income rises?',
              answerOutline: 'A normal necessity: spending rises less than proportionally with income, so its budget share falls.',
            },
            {
              question: 'What sign does the cross-price elasticity have for complements, and why?',
              answerOutline: 'Negative: a higher price of one good reduces use of both, so quantity of the complement falls when the other\'s price rises.',
            },
            {
              question: 'Name two reasons supply is more elastic in the long run.',
              answerOutline: 'Firms can build capacity, new firms can enter, inputs can be bought or trained, and production can be reorganised; in the short run some inputs are fixed.',
            },
          ],
        },
        {
          slug: 'tax-incidence',
          title: 'Who pays a tax? Tax incidence',
          summary:
            'A tax drives a wedge between what buyers pay and what sellers receive. Elasticities, not the law, decide who bears it.',
          estimatedMinutes: 100,
          objectives: [
            'Solve for buyers\' and sellers\' prices with a per-unit tax in a linear market',
            'Show that the outcome does not depend on which side the tax is levied on',
            'Compute the share of a tax borne by buyers and relate it to the elasticities',
            'Apply incidence to payroll, gasoline and cigarette taxes',
          ],
          concepts: [
            'Per-unit (excise) tax',
            'Tax wedge',
            'Statutory incidence',
            'Economic incidence',
            'Buyers\' share = elasticity of supply / (elasticity of supply + |elasticity of demand|)',
            'Pass-through',
            'Payroll tax',
          ],
          explanation: `A **per-unit tax** of $t$ means that on every unit sold the government collects $t$. Buyers pay $P_b$, sellers keep $P_s$, and the gap is the **tax wedge**: $P_b - P_s = t$.

**Solve the strawberry market with a tax of USD 1.50 a pint.** The demand curve depends on what buyers pay and the supply curve on what sellers keep:

$$
P_b = 12 - 0.1Q, \\qquad P_s = 3 + 0.05Q, \\qquad P_b - P_s = 1.5.
$$

Subtracting, $9 - 0.15Q = 1.5$, so $Q = 50$ (down from 60), $P_b = 7$ and $P_s = 5.5$. Buyers pay USD 1 more than before and sellers receive USD 0.50 less. Buyers bear two thirds of the tax. Revenue is $1.5 \\times 50 = 75$ thousand USD a week.

**The law does not decide who pays.** The **statutory incidence** is who writes the cheque. If the law taxes sellers, the supply curve shifts up by $t$; if it taxes buyers, the demand curve shifts down by $t$. Either way the market ends at the same $Q$, $P_b$ and $P_s$. The **economic incidence**, who actually bears the cost, depends only on the curves.

**Elasticity decides.** With inverse slopes $b$ (demand) and $d$ (supply), the buyers' share is $b/(b + d)$; here $0.1/0.15 = 2/3$. In elasticities at the original equilibrium the same share is $\\varepsilon_s/(\\varepsilon_s + |\\varepsilon_d|) = 2/(2 + 1) = 2/3$. **The less elastic side bears more**: it is the side that cannot easily walk away.

\`\`\`interactive
supply-demand
{"title": "A tax on strawberries", "mode": "tax", "demand": [12, 0.1], "supply": [3, 0.05], "tax": 1.5, "taxMax": 6, "xLabel": "Pints (thousands per week)", "yLabel": "Price (USD)", "priceUnit": "USD", "surplusUnit": "thousand USD", "view": [0, 130, 0, 13], "controls": ["demandSlope", "supplySlope"], "caption": "With t = 1.50, buyers pay 7, sellers keep 5.50 and buyers bear 67%. Make demand steeper (less elastic): the buyers' share rises towards 100%. Make supply steeper instead: sellers bear more. The dashed line is the supply curve shifted up by t; the purple triangle is the deadweight loss, covered in the next module."}
\`\`\`

**Cases.** *Payroll taxes*: US Social Security and Medicare taxes are legally split, 7.65% from the employee and 7.65% from the employer (up to the Social Security wage cap). Because labour supply is fairly inelastic, the standard view, supported by studies such as Gruber's (1997) on Chile, is that workers bear most of the employer's share too, through lower wages. *Gasoline*: the federal excise tax has been 18.4 cents a gallon since 1993; studies of state gasoline taxes find that most of a tax change shows up in pump prices, consistent with fairly elastic supply to a given state. *Cigarettes*: the federal tax has been about USD 1.01 a pack since 2009; with inelastic demand smokers bear much of it, which is also why these taxes raise reliable revenue.

Incidence analysis is positive economics. Whether a tax is fair is a normative question, but you cannot answer it without knowing who actually pays.`,
          resources: [
            ostx('5-3-elasticity-and-pricing', '5.3 (elasticity and tax incidence)', 'The section on passing costs to consumers and tax incidence.', true),
            mru('taxes-and-subsidies', 'taxes-subsidies-definition-tax-wedge', 'Taxes and the tax wedge', 'Why it does not matter who is legally taxed.'),
            mru('taxes-and-subsidies', 'tax-burden-elasticity-affordable-care-act-health-insurance-mandate', 'Who bears the burden of a tax?', 'Elasticity and incidence, with a health-insurance example.'),
            { title: 'Topic no. 751, Social Security and Medicare withholding rates', url: 'https://www.irs.gov/taxtopics/tc751', type: 'documentation', cost: 'free', provider: 'US Internal Revenue Service', note: 'Current payroll tax rates and the wage base. Check the year shown on the page.' },
            core('08-supply-demand-12-effect-of-tax', 'Unit 8.12 The effect of a tax', 'Another worked tax example with incidence.'),
          ],
          exercises: [
            {
              slug: 'solve-with-a-tax',
              title: 'Solve a market with a tax',
              prompt:
                'Demand is $Q_d = 400 - 10P$ and supply $Q_s = 30P - 400$. (a) Find the equilibrium without tax. (b) A tax of USD 4 a unit is levied on sellers. Find $Q$, $P_b$, $P_s$ and tax revenue. (c) What share of the tax do buyers bear? (d) Show that you get the same answers if the tax is levied on buyers instead. (e) Check the share against the elasticity formula at the original equilibrium.',
              kind: 'problem',
              difficulty: 2,
              hint: '(a) P = 20, Q = 200. (b) 400 − 10Pb = 30(Pb − 4) − 400 gives Pb = 23, Ps = 19, Q = 170, revenue 680. (c) 3/4. (e) εs = 30·20/200 = 3, εd = −10·20/200 = −1: 3/(3 + 1).',
            },
            {
              slug: 'incidence-extremes',
              title: 'Incidence at the extremes',
              prompt:
                'Using diagrams, show who bears a per-unit tax when (a) demand is perfectly inelastic; (b) demand is perfectly elastic; (c) supply is perfectly inelastic, as for land. For (c), explain why economists since Henry George have argued that a tax on land value does not change how much land there is.',
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'payroll-tax-incidence',
              title: 'Who pays the payroll tax?',
              prompt:
                'Look up the current Social Security and Medicare tax rates and wage base on the IRS page. (a) For a worker earning USD 50,000, compute the employee and employer contributions. (b) Suppose labour supply elasticity is 0.2 and labour demand elasticity −0.8. Using the incidence formula, estimate what share of the total tax workers bear and what that is in dollars. (c) In about 150 words, explain why the legal 50/50 split is misleading, and one reason the formula might be wrong in practice.',
              kind: 'problem',
              difficulty: 2,
              hint: 'Workers\' share = |εd|/(εs + |εd|) for a tax on the labour market, because workers are the sellers: 0.8/1.0 = 80%.',
            },
          ],
          selfAssessment: [
            {
              question: 'A tax is levied on sellers. Does that mean sellers bear it?',
              answerOutline: 'No. Statutory incidence does not determine economic incidence; the outcome is the same whichever side is taxed, and the less elastic side bears more.',
            },
            {
              question: 'Give the buyers\' share of a per-unit tax in terms of elasticities.',
              answerOutline: 'εs / (εs + |εd|): the buyers\' share is larger when supply is more elastic than demand.',
            },
            {
              question: 'With demand P = 12 − 0.1Q, supply P = 3 + 0.05Q and t = 1.5, find Q, Pb and Ps.',
              answerOutline: 'Q = 50, Pb = 7, Ps = 5.5.',
            },
          ],
        },
      ],
    },
    {
      slug: 'welfare-and-government',
      title: 'Welfare and Government Intervention',
      description:
        'Consumer and producer surplus as measures of the gains from trade, why a competitive equilibrium maximises total surplus, and what price controls, taxes, subsidies and tariffs do to it.',
      lessons: [
        {
          slug: 'consumer-and-producer-surplus',
          title: 'Consumer surplus, producer surplus and efficiency',
          summary:
            'Measure what buyers and sellers gain from a market, show why the competitive quantity maximises total surplus, and see what the measure leaves out.',
          estimatedMinutes: 100,
          objectives: [
            'Define willingness to pay and compute consumer surplus for individuals and markets',
            'Compute producer surplus from a supply curve',
            'Show that total surplus is largest at the competitive equilibrium quantity',
            'Explain the limits of surplus as a measure of welfare, including income differences',
          ],
          concepts: [
            'Willingness to pay',
            'Consumer surplus',
            'Producer surplus',
            'Total (social) surplus',
            'Allocative efficiency',
            'Deadweight loss',
            'Efficiency versus equity',
          ],
          explanation: `Each buyer has a **willingness to pay**: the most they would pay for a unit. A demand curve lines buyers up from the highest willingness to pay to the lowest. **Consumer surplus** is what buyers would have paid minus what they did pay, added over every unit bought: the area **below the demand curve and above the price**. Each seller has a cost of supplying a unit, and the supply curve lines those costs up from lowest to highest. **Producer surplus** is price minus that cost, added over every unit sold: the area **above the supply curve and below the price**.

**Strawberries again.** At $P^* = 6$, $Q^* = 60$, consumer surplus is the triangle between the demand intercept 12 and the price:

$$
CS = \\tfrac12 \\times 60 \\times (12 - 6) = 180, \\qquad PS = \\tfrac12 \\times 60 \\times (6 - 3) = 90,
$$

in thousands of USD a week. **Total surplus** is 270.

\`\`\`interactive
supply-demand
{"title": "Surplus in the strawberry market", "demand": [12, 0.1], "supply": [3, 0.05], "xLabel": "Pints (thousands per week)", "yLabel": "Price (USD)", "priceUnit": "USD", "surplusUnit": "thousand USD", "quantityUnit": "thousand", "view": [0, 130, 0, 13], "shiftRange": 40, "showElasticity": false, "caption": "The blue triangle is consumer surplus (180) and the green one producer surplus (90). Shift demand right by 30: price rises to 7 and both triangles grow (CS 320, PS 160), because more units are traded. Shift supply right instead: consumers gain more than producers. Every area here is in thousands of USD a week."}
\`\`\`

**Why the competitive outcome is efficient.** Every unit to the left of $Q^*$ is worth more to some buyer than it costs some seller, so trading it adds surplus. Every unit to the right costs more than any remaining buyer will pay, so producing it would subtract surplus. Total surplus is therefore largest at $Q^*$: the market is **allocatively efficient**. Any policy that moves quantity away from $Q^*$ (too little or too much) loses surplus that nobody gets, the **deadweight loss**. The rest of this module measures it.

**A real estimate.** Cohen, Hahn, Hall, Levitt and Metcalfe (2016) used Uber's surge pricing, which randomly varied prices across otherwise similar trips, to trace out demand curves for UberX in four large US cities in 2015. They estimated about USD 1.60 of consumer surplus for every dollar spent, roughly USD 2.9 billion in those four cities, and a rough extrapolation of USD 6.8 billion for the United States. Two of the authors worked for Uber, a fact worth noting when you weigh any study.

**What surplus leaves out.** Willingness to pay depends on income, so a rich person's want counts for more dollars than a poor person's need. Surplus also ignores how the gains are shared and anything outside the market, such as pollution. "Efficient" means no gains from trade are wasted; it does not mean fair. Economists usually report efficiency and distribution separately and leave the weighing to the reader.

*Optional calculus*: consumer surplus is the integral $\\int_0^{Q^*} (D(q) - P^*)\\,dq$; for a straight line it is a triangle.`,
          resources: [
            ostx('3-5-demand-supply-and-efficiency', '3.5 Demand, supply and efficiency', 'Consumer and producer surplus, deadweight loss.', true),
            mru('supply-demand-and-equilibrium', 'consumer-surplus', 'Consumer surplus', 'Willingness to pay and the area under demand.'),
            mru('supply-demand-and-equilibrium', 'producer-surplus', 'Producer surplus', 'The area above supply.'),
            nber('w22627', 'Using big data to estimate consumer surplus: the case of Uber', 'Cohen, Hahn, Hall, Levitt and Metcalfe', 'Read the introduction for the method and the headline numbers.'),
            mit('lec-9-supply-and-demand-consumerproducer-surplus', 'Lecture 9, Consumer and producer surplus', 'Optional full lecture.'),
          ],
          relatedLessons: ['calculus-1/the-integral/the-definite-integral'],
          exercises: [
            {
              slug: 'surplus-from-a-table',
              title: 'Surplus from willingness to pay',
              prompt:
                'Five buyers would pay 50, 40, 30, 20 and 10 USD for one concert ticket each; five sellers of resale tickets would accept 15, 25, 35, 45 and 55 USD. (a) Draw the stepped curves and find the equilibrium quantity and the range of equilibrium prices. (b) At a price of 32.50, compute consumer, producer and total surplus. (c) Show that forcing a third trade lowers total surplus.',
              kind: 'problem',
              difficulty: 1,
              hint: 'Only two trades have value above cost (50 with 15, 40 with 25); the third buyer values a ticket at 30, below the third seller\'s 35. So Q = 2 at any price between 30 and 35. At 32.50, CS = 17.5 + 7.5 = 25 and PS = 17.5 + 7.5 = 25, total 50. A third trade between the buyer at 30 and the seller at 35 loses 5.',
            },
            {
              slug: 'surplus-linear',
              title: 'Surplus in a linear market',
              prompt:
                'Demand is $P = 50 - Q$ and supply $P = 10 + Q$. (a) Find the equilibrium. (b) Compute consumer, producer and total surplus. (c) Compute total surplus if output were 15 and if it were 25 (assume the units go to the highest-value buyers and lowest-cost sellers). (d) Explain the two deadweight losses you found.',
              kind: 'problem',
              difficulty: 2,
              hint: 'Q = 20, P = 30, CS = PS = 200, total 400. At 15, total surplus is 375; at 25, units 20 to 25 cost more than they are worth, losing 25, so 375 again.',
            },
            {
              slug: 'uber-critique',
              title: 'Read the Uber surplus study',
              prompt:
                'Read the introduction of Cohen et al. (2016). In about 250 words: (a) explain how surge pricing let the authors trace out a demand curve; (b) say what consumer surplus means for an UberX rider; (c) give two reasons the estimate might be too high or too low, including how the authors\' affiliations should affect your reading.',
              kind: 'reading',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Where on a supply and demand diagram is consumer surplus?',
              answerOutline: 'The area below the demand curve and above the price, from zero to the quantity traded.',
            },
            {
              question: 'Why does producing more than the competitive quantity lower total surplus?',
              answerOutline: 'Beyond Q* each unit costs more (supply curve) than buyers value it (demand curve), so each extra unit subtracts surplus.',
            },
            {
              question: 'Give one reason total surplus is an incomplete measure of social welfare.',
              answerOutline: 'Willingness to pay reflects income, so it weights the rich more; it ignores distribution and effects on people outside the market.',
            },
          ],
        },
        {
          slug: 'price-ceilings-and-floors',
          title: 'Price ceilings and price floors',
          summary:
            'Legal maximum and minimum prices: shortages and surpluses, who gains and who loses, deadweight loss, and the evidence on rent control.',
          estimatedMinutes: 100,
          objectives: [
            'Determine whether a price ceiling or floor binds and compute the resulting shortage or surplus',
            'Compute the changes in consumer surplus, producer surplus and deadweight loss',
            'Explain the non-price costs of shortages: queues, search, lower quality, black markets',
            'Summarise the evidence on rent control, including what it does well and badly',
            'Explain why the losses from a price control grow over time',
          ],
          concepts: [
            'Price ceiling',
            'Price floor',
            'Binding versus non-binding control',
            'Shortage and non-price rationing',
            'Surplus and wasted output',
            'Rent control',
            'Short-run versus long-run elasticity',
          ],
          explanation: `A **price ceiling** is a legal maximum price; it binds only if set **below** the equilibrium price. A **price floor** is a legal minimum; it binds only if set **above** equilibrium. A ceiling above equilibrium or a floor below it does nothing.

**A rent ceiling.** In a city's apartment market, with $Q$ in thousands of apartments and $P$ the monthly rent in USD, demand is $P = 3000 - 20Q$ and supply $P = 600 + 10Q$. The equilibrium is $Q = 80$, $P = 1400$. A ceiling of USD 1,100 means landlords offer $(1100 - 600)/10 = 50$ thousand apartments while renters want $(3000 - 1100)/20 = 95$ thousand: a **shortage** of 45 thousand. Only 50 thousand are rented. The highest rent any of the 80 thousand would-be renters would pay for the 50-thousandth apartment is $3000 - 20 \\times 50 = 2000$, far above the USD 1,100 cost of supplying it, so trades worth up to USD 900 a month are lost. The **deadweight loss** is the triangle $\\tfrac12 \\times 30 \\times 900 = 13{,}500$ (thousand USD a month). Producer surplus falls from 32,000 to 12,500; consumer surplus *rises* from 64,000 to 70,000, because the renters who still get an apartment pay much less. That is the political appeal of the policy.

\`\`\`interactive
supply-demand
{"title": "A rent ceiling", "mode": "ceiling", "demand": [3000, 20], "supply": [600, 10], "ceiling": 1100, "xLabel": "Apartments (thousands)", "yLabel": "Monthly rent (USD)", "priceUnit": "USD", "surplusUnit": "thousand USD", "quantityUnit": "thousand", "view": [0, 160, 0, 3200], "controls": ["supplySlope"], "caption": "At a ceiling of 1,100 the shortage is 45 thousand apartments and the deadweight loss 13,500. Raise the ceiling above 1,400 and it stops binding. Now make supply steeper, as it is in the short run when buildings cannot appear or disappear quickly: the shortage and the deadweight loss shrink. Flatter supply, as in the long run, makes both bigger."}
\`\`\`

The triangle is the *smallest* possible loss: it assumes the 50 thousand apartments go to the renters who value them most. In practice they go to whoever got there first or knows the landlord, and people spend time and money searching, so the real loss is larger. Landlords facing excess demand also have less reason to maintain quality, and side payments ("key money") appear.

**Evidence on rent control.** Diamond, McQuade and Qian (2019) studied San Francisco's 1994 extension of rent control to small multifamily buildings built before 1980. Covered tenants were about 20% more likely to stay at their address, a real benefit to them. But landlords of covered buildings reduced the supply of rental housing by 15%, by converting to condominiums and redeveloping, and the authors estimate this raised market rents across the city by about 5%. Surveys of economists show strong majorities doubting that rent control improves overall affordability; supporters stress tenant stability and point to designs that exempt new construction. Both sides agree that supply matters, and that the effects build up over years, because long-run supply is more elastic.

**Price floors.** Suppose strawberries had a floor of USD 8. Buyers take only 40 thousand pints while growers offer 100 thousand: a **surplus** of 60. Even if only the lowest-cost 40 thousand are grown, total surplus falls from 270 to 240, a deadweight loss of 30. If growers produce all 100 thousand, or the government buys the excess (as agricultural support programmes have done), the waste is far larger. The minimum wage is a price floor in the labour market; Module 9 looks at why the evidence there is more mixed than this simple diagram suggests.`,
          resources: [
            ostx('3-4-price-ceilings-and-price-floors', '3.4 Price ceilings and price floors', 'Shortages, surpluses and examples.', true),
            mru('price-ceilings-and-price-floors', 'price-ceiling-deadweight-loss', 'Price ceilings and deadweight loss', 'The triangle and why the real loss is bigger.'),
            mru('price-ceilings-and-price-floors', 'rent-controls-economics', 'Rent controls', 'Quality, search and misallocation.'),
            nber('w24181', 'The effects of rent control expansion on tenants, landlords, and inequality: evidence from San Francisco', 'Diamond, McQuade and Qian', 'Read the introduction. Published in the American Economic Review, 2019.'),
          ],
          exercises: [
            {
              slug: 'ceiling-numbers',
              title: 'Compute a ceiling',
              prompt:
                'For the apartment market above ($P = 3000 - 20Q$, $P = 600 + 10Q$), set the ceiling at USD 1,200. Compute quantity supplied, quantity demanded, the shortage, consumer surplus, producer surplus and deadweight loss, assuming apartments go to the highest-value renters. Check with the widget. Then explain why the loss would be larger if apartments were allocated by lottery among all who want one.',
              kind: 'problem',
              difficulty: 2,
              hint: 'Qs = 60, Qd = 90, shortage 30. CS = 60 × (3000 − 1200) − 0.5 × 20 × 60² = 72,000. PS = 0.5 × 60 × 600 = 18,000. DWL = 0.5 × 20 × (1800 − 1200) = 6,000.',
            },
            {
              slug: 'floor-numbers',
              title: 'Compute a floor',
              prompt:
                'Demand for milk is $P = 6 - 0.05Q$ and supply $P = 1 + 0.05Q$ (Q in million gallons, P in USD per gallon). (a) Find the equilibrium. (b) A price floor of USD 4 is imposed. Find the quantities demanded and supplied and the surplus. (c) Compute consumer surplus, producer surplus and deadweight loss assuming only what is sold is produced. (d) If the government buys the whole surplus at USD 4 and destroys it, what does that cost taxpayers, and what is the extra loss?',
              kind: 'problem',
              difficulty: 2,
              hint: '(a) Q = 50, P = 3.5. (b) Qd = 40, Qs = 60, surplus 20. (c) CS = 40; PS = 40 × 3 − 0.5 × 0.05 × 1600 = 80; DWL = 0.5 × 10 × (4 − 3) = 5. (d) Spending 80; the production cost of the 20 destroyed units is 20 × (3 + 4)/2 = 70, all wasted.',
            },
            {
              slug: 'rent-control-brief',
              title: 'A balanced rent-control brief',
              prompt:
                'Your city council is considering capping annual rent increases at 3% for existing buildings. Write a 400-word brief that (a) predicts short-run and long-run effects with the supply and demand model; (b) summarises the San Francisco evidence; (c) gives the strongest case for and against; (d) suggests design features that change the predictions (exempting new construction, vacancy decontrol). Keep positive and normative statements separate.',
              kind: 'writing',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'When does a price ceiling have no effect?',
              answerOutline: 'When it is set at or above the equilibrium price.',
            },
            {
              question: 'Can consumers as a group gain from a price ceiling? Explain.',
              answerOutline: 'Yes: those who still buy pay less, which can outweigh the surplus lost by those who can no longer buy; producers lose and total surplus falls.',
            },
            {
              question: 'Why do the losses from rent control tend to grow over time?',
              answerOutline: 'Supply is more elastic in the long run: landlords convert, redevelop and build less, so the shortage and deadweight loss widen.',
            },
            {
              question: 'Why is the deadweight-loss triangle under a ceiling a lower bound on the true loss?',
              answerOutline: 'It assumes the scarce units go to the highest-value buyers with no search or queuing costs; real allocation wastes more.',
            },
          ],
        },
        {
          slug: 'taxes-subsidies-and-deadweight-loss',
          title: 'Taxes, subsidies and deadweight loss',
          summary:
            'Why taxes and subsidies waste surplus, why the loss rises with the square of the tax, how revenue behaves as the rate rises, and how elasticity shapes all of it.',
          estimatedMinutes: 100,
          objectives: [
            'Compute tax revenue and deadweight loss in a linear market',
            'Show that deadweight loss rises with the square of the tax rate',
            'Explain why revenue first rises and then falls as a per-unit tax grows',
            'Analyse a per-unit subsidy: prices, cost to taxpayers and deadweight loss',
            'Explain why elastic markets have larger deadweight losses from taxes',
          ],
          concepts: [
            'Deadweight loss of taxation (excess burden)',
            'Harberger triangle',
            'Deadweight loss proportional to t squared',
            'Revenue curve (Laffer shape)',
            'Per-unit subsidy',
            'Elasticity and efficiency of taxes',
          ],
          explanation: `A tax raises money, and it also stops some trades that would have happened. Those lost trades are the **deadweight loss** (or **excess burden**): surplus that neither buyers, sellers nor the government receive.

**Strawberries with a tax of USD 1.50.** From the incidence lesson, $Q$ falls from 60 to 50, buyers pay 7 and sellers keep 5.5. The government collects $1.5 \\times 50 = 75$. Consumer surplus falls from 180 to $\\tfrac12 \\times 50 \\times 5 = 125$ and producer surplus from 90 to $\\tfrac12 \\times 50 \\times 2.5 = 62.5$. Together buyers and sellers lose 82.5, the government gains 75, and the difference, 7.5, is the deadweight loss: the triangle $\\tfrac12 \\times t \\times \\Delta Q = \\tfrac12 \\times 1.5 \\times 10$.

**The square law.** In a linear market, $\\Delta Q$ is proportional to $t$, so the triangle is proportional to $t^2$. Here $\\Delta Q = t/0.15$ and $DWL = t^2/0.3$. Double the tax to 3 and the loss quadruples to 30; at 6 it is 120. Revenue behaves differently: $R(t) = t \\times (9 - t)/0.15$, which is 75 at $t = 1.5$, 120 at 3, peaks at 135 at 4.5 and is back to 120 at 6. Past the peak, raising the tax lowers revenue and raises the loss: there is never a reason to be there. The general lesson, that many small taxes on broad bases waste less than a few large ones, comes from the square law.

\`\`\`interactive
function-explorer
{"title": "Revenue and deadweight loss as the tax rises", "f": ["t*(9 - t)/0.15 + 0*x", "x*(9 - x)/0.15", "x^2/0.3"], "sliders": {"t": [1.5, 0, 9, 0.1]}, "view": [0, 9, 0, 280], "caption": "The horizontal axis is the per-unit tax t on strawberries. The second curve is tax revenue t(9 − t)/0.15, peaking at 135 when t = 4.5; the third is the deadweight loss t²/0.3. The flat first line marks the revenue at the slider's t, so you can read where the revenue line cuts the hill twice: every revenue below the peak can be raised with a small tax or a large one, and the large one wastes far more."}
\`\`\`

**Elasticity and efficiency.** The more elastic demand or supply is, the more quantity falls for a given tax, and the bigger the triangle. Taxing goods with inelastic demand wastes the least (the idea behind the Ramsey rule), but inelastic goods are often necessities, so efficiency and fairness can point in opposite directions.

**Subsidies.** A per-unit subsidy $s$ paid to sellers makes buyers' price fall and sellers' price rise, with $P_s - P_b = s$. With $s = 1.5$, quantity rises to 70, buyers pay 5 and sellers receive 6.5. Taxpayers pay $1.5 \\times 70 = 105$, while consumer surplus rises by 65 and producer surplus by 32.5, a total gain of 97.5. The difference, 7.5, is again a deadweight loss: units from 60 to 70 cost more to produce than buyers value them. Subsidies can still be worth it when a market produces too little because of external benefits, as Module 9 shows; this lesson is about markets with no such failure.

\`\`\`interactive
supply-demand
{"title": "Taxes and subsidies on strawberries", "mode": "tax", "modes": ["tax", "subsidy"], "demand": [12, 0.1], "supply": [3, 0.05], "tax": 1.5, "subsidy": 1.5, "taxMax": 6, "xLabel": "Pints (thousands per week)", "yLabel": "Price (USD)", "priceUnit": "USD", "surplusUnit": "thousand USD", "quantityUnit": "thousand", "view": [0, 130, 0, 13], "controls": [], "caption": "Tax: move t from 1.5 to 3 and watch the purple deadweight triangle quadruple (7.5 to 30) while revenue (amber) rises only from 75 to 120. Switch to Subsidy: at s = 1.5 the subsidy costs 105 (dashed box) but buyers and sellers gain only 97.5 in total, so 7.5 is lost."}
\`\`\``,
          resources: [
            mru('taxes-and-subsidies', 'deadweight-loss-definition-yacht-tax', 'Deadweight loss and the yacht tax', 'A case where a luxury tax hit sellers and workers hard.'),
            mru('taxes-and-subsidies', 'subsidies-definition-subsidy-wedge', 'Subsidies and the subsidy wedge', 'The mirror image of a tax.'),
            ostx('3-5-demand-supply-and-efficiency', '3.5 Demand, supply and efficiency', 'Deadweight loss in OpenStax\'s treatment.', true),
            core('08-supply-demand-12-effect-of-tax', 'Unit 8.12 The effect of a tax', 'Tax revenue and deadweight loss worked through.'),
          ],
          exercises: [
            {
              slug: 'tax-dwl-numbers',
              title: 'Revenue and loss',
              prompt:
                'Demand is $P = 100 - 2Q$ and supply $P = 20 + 2Q$. (a) Find the equilibrium. (b) For per-unit taxes of 8, 16 and 40, compute quantity, revenue and deadweight loss. (c) Confirm the square law. (d) Find the revenue-maximising tax.',
              kind: 'problem',
              difficulty: 2,
              hint: 'Q* = 20, P* = 60. Q = (80 − t)/4. t = 8: Q = 18, R = 144, DWL = 8. t = 16: Q = 16, R = 256, DWL = 32. t = 40: Q = 10, R = 400, DWL = 200. Revenue peaks at t = 40.',
            },
            {
              slug: 'subsidy-numbers',
              title: 'A subsidy',
              prompt:
                'In the same market, a subsidy of 8 per unit is paid to sellers. (a) Find quantity, buyers\' price and sellers\' price. (b) Compute the cost to taxpayers, the gains in consumer and producer surplus, and the deadweight loss. (c) Who gets more of the subsidy, buyers or sellers, and why?',
              kind: 'problem',
              difficulty: 2,
              hint: 'Q = 22, Pb = 56, Ps = 64. Cost 176. CS rises from 400 to 484 (+84), PS from 400 to 484 (+84). DWL = 176 − 168 = 8. Equal slopes, so an equal split.',
            },
            {
              slug: 'which-good-to-tax',
              title: 'Which good would you tax?',
              prompt:
                'A government must raise the same revenue from one of two goods with identical equilibrium price and quantity: salt (demand elasticity −0.1) or restaurant meals (−1.5). Supply is the same for both. (a) With diagrams, explain which tax has the smaller deadweight loss. (b) Explain who bears each tax. (c) In about 150 words, argue whether the efficient choice is also the fair one.',
              kind: 'writing',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'If a tax doubles, what happens to the deadweight loss in a linear market?',
              answerOutline: 'It roughly quadruples, because both the quantity reduction and the wedge double, and the triangle is half their product.',
            },
            {
              question: 'Why does a subsidy create a deadweight loss in a market without externalities?',
              answerOutline: 'It encourages units whose cost exceeds buyers\' value; the subsidy cost exceeds the gains to buyers and sellers by that triangle.',
            },
            {
              question: 'Why does revenue eventually fall as a per-unit tax keeps rising?',
              answerOutline: 'The base shrinks: quantity falls toward zero, so beyond the peak the fall in quantity outweighs the higher rate.',
            },
          ],
        },
        {
          slug: 'international-trade-and-tariffs',
          title: 'International trade and tariffs',
          summary:
            'A small open economy facing a world price: who gains and who loses from imports and exports, and what a tariff does to prices, quantities, revenue and surplus, with evidence from 2018.',
          estimatedMinutes: 100,
          objectives: [
            'Find imports or exports when a small economy faces a world price',
            'Compute the gains from trade and their split between consumers and producers',
            'Compute the effects of a tariff: price, imports, revenue, and the two deadweight-loss triangles',
            'Compare tariffs with quotas',
            'Summarise the evidence on who paid for the 2018 US tariffs and the arguments made for tariffs',
          ],
          concepts: [
            'World price',
            'Small open economy (price taker in world markets)',
            'Imports and exports',
            'Tariff',
            'Import quota and quota rents',
            'Production and consumption distortions',
            'Pass-through',
            'Terms-of-trade, infant-industry and security arguments',
          ],
          explanation: `A **small open economy** buys and sells at a **world price** set elsewhere. Domestic demand and supply still decide how much is consumed and produced at home; the gap is traded.

**Steel.** Domestic demand is $P = 1000 - 10Q$ and supply $P = 200 + 10Q$ ($Q$ in millions of tonnes, $P$ in USD a tonne). With no trade, $Q = 40$ and $P = 600$. Open the border at a world price of USD 400: buyers want 60, domestic mills supply only 20, so the country **imports 40**. Consumer surplus rises from 8,000 to $\\tfrac12 \\times 60 \\times 600 = 18{,}000$ (million USD), producer surplus falls from 8,000 to $\\tfrac12 \\times 20 \\times 200 = 2{,}000$. Consumers gain more than producers lose, so total surplus rises by 4,000: the **gains from trade**. If the world price were above 600, the country would export and the roles would reverse: producers gain more than consumers lose.

**A tariff** is a tax on imports. A tariff of USD 100 raises the domestic price to 500. Consumers buy 50, domestic mills supply 30, imports fall to 20, and the government collects $100 \\times 20 = 2{,}000$. Consumer surplus falls by 5,500 to 12,500; producer surplus rises by 2,500 to 4,500. The net loss of 1,000 is two triangles of 500 each: a **production distortion** (domestic steel from 20 to 30 million tonnes costs more than imports would) and a **consumption distortion** (buyers priced out who valued steel above its world price).

\`\`\`interactive
supply-demand
{"title": "Steel: world price and a tariff", "mode": "world", "demand": [1000, 10], "supply": [200, 10], "worldPrice": 400, "tariff": 100, "taxMax": 300, "xLabel": "Steel (million tonnes)", "yLabel": "Price (USD per tonne)", "priceUnit": "USD", "surplusUnit": "million USD", "quantityUnit": "million t", "view": [0, 105, 0, 1050], "controls": [], "caption": "With a USD 100 tariff, imports fall from 40 to 20, revenue is 2,000 and the two purple triangles total 1,000. Set the tariff to 0 to see the full gains from trade (4,000). Raise it to 200 or more: imports stop, revenue vanishes and the whole 4,000 is lost. Push the world price above 600 and the country exports instead."}
\`\`\`

A **quota** limits the quantity imported. A quota of 20 has the same price effect as this tariff, but the 2,000 that the tariff raised goes as **quota rents** to whoever holds import licences, often foreign exporters.

**Who paid in 2018?** The US raised tariffs on steel, aluminium, washing machines, solar panels and many Chinese goods in 2018. Amiti, Redding and Weinstein (2019) and Fajgelbaum and co-authors (2020) found close to complete pass-through of the tariffs into US import prices: US buyers, not foreign exporters, bore most of the cost. For washing machines, Flaaen, Hortaçsu and Tintelnot (2020) estimated price rises of about USD 86 per washer and USD 92 per dryer (dryers were not tariffed but are sold in pairs), about 1,800 jobs created, and roughly USD 815,000 of consumer cost per job.

**Arguments for tariffs.** A *large* country can push the world price down, so part of a tariff falls on foreigners (the terms-of-trade argument), though retaliation can erase it. *Infant-industry* and *national-security* arguments claim benefits the simple model does not count, and tariffs can be bargaining chips. The model's core prediction, that a tariff costs the importing country's consumers more than it gives its producers and treasury, is among the most widely accepted results in economics; the debate is over whether the other benefits are large enough. US tariff rates changed many times during 2025 and 2026, so look up current rates in the US International Trade Commission's tariff schedule rather than relying on any number in a textbook.`,
          resources: [
            ostx('20-1-protectionism-an-indirect-subsidy-from-consumers-to-producers', '20.1 Protectionism: an indirect subsidy from consumers to producers', 'Tariffs and quotas with surplus diagrams.', true),
            ostx('20-3-arguments-in-support-of-restricting-imports', '20.3 Arguments in support of restricting imports', 'Infant industry, security, anti-dumping and environmental arguments assessed.'),
            nber('w25767', 'The production relocation and price effects of US trade policy: the case of washing machines', 'Flaaen, Hortaçsu and Tintelnot', 'Published in the American Economic Review, 2020. Read the introduction.'),
            nber('w25672', 'The impact of the 2018 trade war on US prices and welfare', 'Amiti, Redding and Weinstein', 'Pass-through of the 2018 tariffs. Read sections 1 and 2.'),
            mit('lec-19-international-trade-welfare-and-policy', 'Lecture 19, International trade: welfare and policy', 'Optional full lecture.'),
          ],
          exercises: [
            {
              slug: 'tariff-numbers',
              title: 'Work a tariff',
              prompt:
                'Domestic demand for sugar is $P = 80 - Q$ and supply $P = 20 + Q$ (Q in million tonnes, P in USD per tonne, simplified). The world price is 30. (a) Find no-trade price and quantity, then imports at the world price. (b) Compute the gains from trade. (c) A tariff of 10 is imposed: find the new imports, revenue, change in consumer and producer surplus, and the two deadweight triangles. (d) What tariff would stop imports entirely? (e) Sketch the diagram and label which deadweight triangle is the production distortion and which the consumption distortion.',
              kind: 'problem',
              difficulty: 2,
              hint: '(a) P = 50, Q = 30; at 30: Qd = 50, Qs = 10, imports 40. (b) 0.5 × 40 × 20 = 400. (c) At 40: Qd = 40, Qs = 20, imports 20, revenue 200, ΔCS = −450, ΔPS = +150, DWL = 50 + 50. (d) 20 or more.',
            },
            {
              slug: 'tariff-vs-quota',
              title: 'Tariff versus quota',
              prompt:
                'In the steel example, compare a USD 100 tariff with an import quota of 20 million tonnes. (a) Show that the domestic price, consumption and production are the same. (b) Who receives the 2,000 in each case? (c) Give two reasons a government might prefer a tariff, and one reason exporters might prefer the quota.',
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'tariff-evidence-memo',
              title: 'Who paid for the 2018 tariffs?',
              prompt:
                'Read the introductions of Amiti, Redding and Weinstein (2019) and Flaaen, Hortaçsu and Tintelnot (2020). Write a 400-word memo that (a) states what each found about pass-through and prices; (b) explains why dryer prices rose; (c) computes and interprets the cost per job; (d) lists one argument for the tariffs that these studies do not measure. Date every number.',
              kind: 'reading',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'When a small economy opens to trade and imports, who gains and who loses?',
              answerOutline: 'Domestic consumers gain, domestic producers lose, and consumers\' gain exceeds producers\' loss, so total surplus rises.',
            },
            {
              question: 'Name the two deadweight-loss triangles of a tariff and what each represents.',
              answerOutline: 'Production distortion: extra domestic output costing more than imports. Consumption distortion: buyers priced out who valued the good above the world price.',
            },
            {
              question: 'What does "complete pass-through" of a tariff mean, and why did it matter for the 2018 evidence?',
              answerOutline: 'Import prices before tariff did not fall, so the domestic price rose by the full tariff: domestic buyers bore the cost, not foreign exporters.',
            },
          ],
        },
      ],
      project: {
        slug: 'policy-scorecard',
        title: 'A policy scorecard',
        description: `Choose a real price control, excise tax, subsidy or tariff in force today (for example a state cigarette tax, a city's rent stabilisation law, a sugar import quota or a fuel tax). Find official sources for its size and the market's price and quantity. Pick defensible elasticities from published studies, calibrate a linear supply and demand model through the observed point with those elasticities, and use it to estimate who bears the policy, how much revenue or spending it involves, and the deadweight loss. Then list everything the model leaves out, and say how the answer changes if your elasticities are off by half.`,
        deliverables: [
          'A one-page description of the policy with dated, sourced numbers',
          'The calibrated model: equations, the elasticities used and where they come from',
          'Incidence, revenue (or cost) and deadweight loss, with a sensitivity table',
          'A 500-word assessment separating positive findings from your normative judgement',
        ],
        estimatedHours: 3,
        stretchGoals: ['Write the calibration as a short Python script that takes price, quantity and two elasticities and prints all the results'],
      },
    },
    {
      slug: 'consumer-choice',
      title: 'Consumer Choice',
      description:
        'Where demand curves come from: utility and marginal utility, choosing the best affordable bundle, income and substitution effects, and what behavioural economics adds when people do not behave as the model assumes.',
      lessons: [
        {
          slug: 'utility-and-optimal-choice',
          title: 'Utility, budgets and the best affordable choice',
          summary:
            'Model choice as getting the most satisfaction from a limited budget: diminishing marginal utility, the equal-marginal-utility-per-dollar rule, and how a demand curve emerges.',
          estimatedMinutes: 100,
          objectives: [
            'Compute total and marginal utility and explain diminishing marginal utility',
            'Find the best affordable bundle using marginal utility per dollar',
            'State and explain the rule MUx/Px = MUy/Py',
            'Derive points on a demand curve by changing a price',
            'Resolve the diamond-water paradox with marginal reasoning',
          ],
          concepts: [
            'Utility (a ranking, not a measurable quantity)',
            'Total and marginal utility',
            'Diminishing marginal utility',
            'Budget constraint',
            'Marginal utility per dollar',
            'Consumer equilibrium',
            'Diamond-water paradox',
          ],
          explanation: `Economists model a consumer as choosing, from the bundles she can afford, the one she likes best. **Utility** is a number that ranks bundles: higher means preferred. Its units mean nothing in themselves; only the ranking matters. **Marginal utility** (MU) is the extra utility from one more unit. For most goods it falls as you consume more: the first coffee of the day is worth more than the fourth. That is **diminishing marginal utility**.

\`\`\`interactive
function-explorer
{"title": "Total and marginal utility", "f": ["a*ln(1 + x)", "a/(1 + x)"], "sliders": {"a": [10, 2, 20, 0.5]}, "view": [0, 10, 0, 25], "caption": "The first curve is total utility a·ln(1 + x) from x units; the second is marginal utility a/(1 + x), the slope of the first. Total utility keeps rising but more slowly, because each extra unit adds less: marginal utility falls towards zero. Raising a scales both curves but does not change the shape."}
\`\`\`

**The best affordable bundle.** Suppose you have USD 27 for the week, coffee costs USD 3 a cup and a sandwich USD 6, and your marginal utilities are:

| Unit | 1st | 2nd | 3rd | 4th | 5th |
|---|---|---|---|---|---|
| MU of coffee | 30 | 24 | 18 | 12 | 6 |
| MU of a sandwich | 60 | 48 | 36 | 24 | — |
| MU per dollar, coffee | 10 | 8 | 6 | 4 | 2 |
| MU per dollar, sandwich | 10 | 8 | 6 | 4 | — |

Spend each dollar where it buys the most utility. Buy the first coffee and first sandwich (10 per dollar each), then the second of each (8), then the third of each (6). That spends $3 \\times 3 + 3 \\times 6 = 27$. Total utility is $72 + 144 = 216$. Any other affordable bundle does worse: 5 coffees and 2 sandwiches give $90 + 108 = 198$, and 1 coffee and 4 sandwiches also give 198.

At the best bundle the **last dollar spent on each good buys the same marginal utility**:

$$
\\frac{MU_x}{P_x} = \\frac{MU_y}{P_y}.
$$

If coffee gave more utility per dollar than sandwiches, moving a dollar from sandwiches to coffee would raise total utility, so you were not at the best bundle.

**Where demand comes from.** Let the coffee price fall to USD 2, so coffee's MU per dollar becomes 15, 12, 9, 6, 3. Repeat the process with the USD 27: you now buy 4 coffees and 3 sandwiches, spending 26, and the last coffee and last sandwich both give 6 per dollar. At USD 3 you bought 3 coffees, at USD 2 you buy 4: two points on your demand curve for coffee, sloping down because of diminishing marginal utility.

**The diamond-water paradox.** Water is essential and cheap; diamonds are inessential and dear. Adam Smith found this puzzling. The answer is the margin: water is so plentiful that the marginal utility of one more litre is tiny, even though total utility from water is enormous. Diamonds are scarce, so the marginal one is valued highly. Prices reflect marginal, not total, value.`,
          resources: [
            ostx('6-1-consumption-choices', '6.1 Consumption choices', 'Total and marginal utility and the utility-maximising rule, with a worked table.', true),
            mru('consumer-choice', 'consumer-choice-marginal-utility', 'Marginal utility', 'Diminishing marginal utility on video.'),
            mru('consumer-choice', 'consumer-choice-optimization-marginal-utility', 'Optimisation with marginal utility', 'The equal-marginal-utility-per-dollar rule.'),
            mit('lec-3-budget-constraints-and-constrained-choice', 'Lecture 3, Budget constraints and constrained choice', 'Optional: the same problem with indifference curves and a little calculus.'),
          ],
          exercises: [
            {
              slug: 'utility-table',
              title: 'Choose the bundle',
              prompt:
                'You have USD 20 for books (USD 4 each) and films (USD 2 each). Marginal utility of books: 40, 32, 24, 16, 8. Marginal utility of films: 14, 12, 10, 8, 6, 4, 2. (a) Compute MU per dollar for each. (b) Find the utility-maximising bundle and check that it spends the budget. (c) Compute total utility and compare it with two other affordable bundles. (d) Your budget rises to USD 28 with prices unchanged. Find the new bundle and say whether each good is normal.',
              kind: 'problem',
              difficulty: 2,
              hint: 'MU per dollar: books 10, 8, 6, 4, 2; films 7, 6, 5, 4, 3, 2, 1. Order: book (10), book (8), film (7), book (6), film (6), film (5), which spends 18; with 2 dollars left, a book no longer fits, so add a film. Bundle 3 books and 4 films, utility 140 (4 books and 2 films give 138). With USD 28: 4 books and 6 films, utility 166; both goods are normal.',
            },
            {
              slug: 'why-equal-per-dollar',
              title: 'Why the rule works',
              prompt:
                'At your current bundle, the last dollar spent on groceries gives 5 units of utility and the last dollar on entertainment gives 8. (a) Explain how to raise your utility without spending more. (b) What happens to the two marginal utilities as you make the change, and when should you stop? (c) Why does the rule use marginal utility per dollar and not marginal utility alone?',
              kind: 'writing',
              difficulty: 1,
            },
            {
              slug: 'derive-a-demand-curve',
              title: 'Derive a demand curve',
              prompt:
                'Using the coffee and sandwich table in this lesson and a budget of USD 27, find how many coffees you buy at coffee prices of USD 6, 3 and 2 (sandwich price fixed at USD 6). Plot the three points as a demand curve. Explain why the curve slopes down, and say what would shift it.',
              kind: 'problem',
              difficulty: 2,
              hint: 'At USD 6, coffee MU per dollar is 5, 4, 3, 2, 1, so all three sandwiches come first and then one coffee (spending 24; nothing else fits). The demand points are 1 coffee at USD 6, 3 at USD 3 and 4 at USD 2.',
            },
          ],
          selfAssessment: [
            {
              question: 'Why does a utility-maximising consumer equalise marginal utility per dollar rather than marginal utility?',
              answerOutline: 'Goods cost different amounts; what matters is how much utility each extra dollar buys. If one good gave more per dollar, shifting spending to it would raise utility.',
            },
            {
              question: 'How does diminishing marginal utility explain a downward-sloping demand curve?',
              answerOutline: 'A lower price raises MU per dollar for the good, so the consumer buys more until its MU (which falls with quantity) brings MU/P back in line with other goods.',
            },
            {
              question: 'Resolve the diamond-water paradox in two sentences.',
              answerOutline: 'Price reflects marginal value. Water is plentiful so its marginal utility is low despite huge total utility; diamonds are scarce so their marginal utility is high.',
            },
          ],
        },
        {
          slug: 'income-and-substitution-effects',
          title: 'Income and substitution effects',
          summary:
            'Split the effect of a price change into a change in relative prices and a change in purchasing power, with budget lines, indifference curves and a fully worked example.',
          estimatedMinutes: 100,
          objectives: [
            'Show how a budget line shifts with income and pivots with a price',
            'Use indifference curves and the tangency condition to find the best bundle (optional)',
            'Decompose a price change into substitution and income effects',
            'Explain inferior goods and the rare case of Giffen goods, with evidence',
            'Apply the decomposition to labour supply',
          ],
          concepts: [
            'Budget line: shifts and pivots',
            'Indifference curve',
            'Marginal rate of substitution',
            'Tangency: MRS = price ratio',
            'Substitution effect',
            'Income effect',
            'Giffen good',
            'Backward-bending labour supply',
          ],
          explanation: `A budget line $P_x x + P_y y = M$ shows every bundle that exactly spends income $M$. Raising $M$ shifts it out in parallel. Lowering $P_x$ **pivots** it outward around the $y$-intercept: the same income now buys more $x$.

An **indifference curve** joins bundles the consumer likes equally. Its slope, the **marginal rate of substitution** (MRS), is how much $y$ she would give up for one more $x$. The best affordable bundle is where the highest reachable indifference curve just touches the budget line, so the MRS equals the price ratio $P_x/P_y$. This is the same rule as the last lesson: $MU_x/MU_y = P_x/P_y$. (Indifference curves are optional in many principles courses; OpenStax appendix B covers them.)

**A price change has two effects.** When coffee gets cheaper:

- The **substitution effect**: coffee is cheaper *relative* to other goods, so you buy more coffee and less of the rest, even if your purchasing power were unchanged.
- The **income effect**: your income now buys more, so you are effectively richer. For a normal good this also raises coffee purchases; for an inferior good it lowers them.

**Worked example.** Suppose a consumer always spends half her income on each of two goods, so $x = M/(2P_x)$. (This is what the utility function $U = xy$ implies.) With $M = 120$ and both prices 6, she buys $x = 10$ and $y = 10$. The price of $x$ falls to 3, and she now buys $x = 120/6 = 20$. To separate the effects, give her just enough income to buy the old bundle at the new prices: $3 \\times 10 + 6 \\times 10 = 90$. With 90 at the new prices she would buy $x = 90/6 = 15$. The rise from 10 to 15 is the **substitution effect** (relative price only); the rise from 15 to 20 is the **income effect** (the extra purchasing power of 30). This is the Slutsky decomposition.

\`\`\`interactive
function-explorer
{"title": "Budget line and indifference curve", "f": ["(M - p*x)/6", "U/x"], "sliders": {"M": [120, 60, 180, 1], "p": [6, 2, 12, 0.5], "U": [100, 25, 400, 1]}, "view": [0, 40, 0, 30], "caption": "The first curve is the budget line with income M, price p for x and price 6 for y; the second is the indifference curve xy = U. With M = 120 and p = 6, the curve U = 100 just touches the line at (10, 10). Lower p to 3: the line pivots out, and the highest curve it can touch is U = 200, at (20, 10). Now set M = 90 with p = 3: the tangent curve is U = 112.5 at x = 15, the substitution-effect bundle."}
\`\`\`

**Inferior and Giffen goods.** For an inferior good the income effect works against the substitution effect. If it is strong enough, a price rise *increases* quantity demanded: a **Giffen good**. Jensen and Miller (2008) found this for rice among very poor households in Hunan, China: when a voucher lowered the price of rice, some households bought *less* rice and more meat, because rice was their cheapest source of calories and the subsidy freed money for preferred foods. Giffen behaviour requires an inferior staple that takes a large share of the budget, so it is rare.

**Labour supply.** A higher wage raises the price of leisure (substitution effect: work more) and makes you richer (income effect: take more leisure). At high wages the income effect can dominate, and labour supply can bend backward.`,
          resources: [
            ostx('6-2-how-changes-in-income-and-prices-affect-consumption-choices', '6.2 How changes in income and prices affect consumption choices', 'Income and substitution effects, labour supply and saving.', true),
            ostx('b-indifference-curves', 'Appendix B: Indifference curves', 'The optional indifference-curve treatment.'),
            mru('consumer-choice', 'consumer-choice-indifference-curves-marginal-rate-substitution', 'Indifference curves and the MRS', 'A visual introduction.'),
            mit('lec-4-demand-curves-and-incomesubstitution-effects', 'Lecture 4, Demand curves and income and substitution effects', 'Optional lecture with the full graphical decomposition.'),
            nber('w13243', 'Giffen behavior: theory and evidence', 'Jensen and Miller', 'The working-paper version of the AER (2008) article. Read the introduction.'),
          ],
          exercises: [
            {
              slug: 'slutsky-numbers',
              title: 'Decompose a price rise',
              prompt:
                'A consumer spends half her income on each good, so $x = M/(2P_x)$ and $y = M/(2P_y)$. Income is USD 200, $P_x = 5$ and $P_y = 10$. (a) Find her bundle. (b) $P_x$ rises to 10. Find the new bundle. (c) Find the compensating income that lets her just afford the old bundle, and the bundle she would buy with it. (d) Report the substitution and income effects on $x$.',
              kind: 'problem',
              difficulty: 2,
              hint: '(a) x = 20, y = 10. (b) x = 10. (c) 10 × 20 + 10 × 10 = 300, so x = 15. (d) Substitution effect −5 (20 to 15), income effect −5 (15 to 10).',
            },
            {
              slug: 'budget-line-shifts',
              title: 'Shifts and pivots',
              prompt:
                'Draw the budget line for USD 60 of income, food at USD 3 and books at USD 12. Then draw it after each change separately: (a) income rises to USD 90; (b) books fall to USD 6; (c) both prices double; (d) income and both prices double. State the intercepts each time and explain why (d) changes nothing.',
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'giffen-reading',
              title: 'Read the Giffen paper',
              prompt:
                'Read the introduction of Jensen and Miller\'s paper. Answer in about 250 words: (a) What experiment did they run? (b) Why do they argue rice is Giffen for the poorest households but not for the richer or the very poorest? (c) What does the result imply for food price subsidies as an anti-hunger policy?',
              kind: 'reading',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'The price of a normal good falls. In which direction do the substitution and income effects push its quantity?',
              answerOutline: 'Both raise quantity demanded: the good is relatively cheaper, and higher real income raises demand for a normal good.',
            },
            {
              question: 'What two conditions does a Giffen good need?',
              answerOutline: 'It must be inferior, and the income effect must outweigh the substitution effect, which needs the good to take a large share of the budget.',
            },
            {
              question: 'At the best bundle on a budget line, what is the relation between the MRS and prices?',
              answerOutline: 'The MRS equals the price ratio Px/Py: the indifference curve is tangent to the budget line.',
            },
          ],
        },
        {
          slug: 'behavioural-economics',
          title: 'Behavioural economics',
          summary:
            'Where real choices depart from the standard model: loss aversion, reference points, present bias, defaults and mental accounting, and how robust the evidence is.',
          estimatedMinutes: 100,
          objectives: [
            'Describe the main departures from the standard model documented by behavioural economics',
            'Explain loss aversion and the endowment effect with examples',
            'Model present bias with a simple numerical example',
            'Explain why defaults matter and evaluate nudges as policy',
            'Judge the strength of behavioural evidence, including replication and scale-up problems',
          ],
          concepts: [
            'Bounded rationality',
            'Prospect theory and loss aversion',
            'Reference dependence',
            'Endowment effect',
            'Present bias',
            'Default effects',
            'Mental accounting',
            'Nudge',
          ],
          explanation: `The standard model assumes people have stable preferences, know them, and choose the best option given prices and income. **Behavioural economics** keeps the idea that people pursue their goals but documents systematic ways that real choices differ, drawing on psychology. Daniel Kahneman (Nobel 2002) and Richard Thaler (Nobel 2017) are its best-known figures.

**Loss aversion and reference points.** Kahneman and Tversky's prospect theory (1979) says people judge outcomes as gains or losses relative to a reference point, and losses hurt more than equal gains please; experiments often find losses weigh roughly twice as much. Many people refuse a coin flip that wins USD 110 or loses USD 100, though it has a positive expected value. The **endowment effect** follows: in experiments by Kahneman, Knetsch and Thaler (1990), students randomly given a mug asked about twice as much to sell it as other students would pay to buy one. The bag-tax result from Module 1 fits too: a five-cent *charge* changed behaviour a lot, while a five-cent *bonus* did almost nothing.

**Present bias.** People often prefer USD 100 today to USD 110 tomorrow, but prefer USD 110 in 31 days to USD 100 in 30 days. The two choices involve the same one-day wait; only the distance from today differs. That pattern produces plans ("I'll start saving next month") that are abandoned when next month arrives. A simple model scales every future payoff by an extra factor $\\beta < 1$ relative to today: with $\\beta = 0.8$, USD 110 tomorrow is worth $0.8 \\times 110 = 88$ today, less than 100, while the choice between day 30 and day 31 is unaffected.

**Defaults.** Madrian and Shea (2001) studied a company that switched new employees' 401(k) retirement plan from opt-in to automatic enrolment. Participation among new hires rose dramatically, and most stayed at the default contribution rate. Under the standard model a default should hardly matter, because opting in or out takes minutes. In practice, inertia and the sense that a default is a recommendation make it powerful. US law has since encouraged automatic enrolment.

**Mental accounting.** People treat money differently by source and purpose: a tax refund is spent more freely than salary, even though a dollar is a dollar.

**Nudges and their limits.** A **nudge** changes the way choices are presented without restricting them or changing prices much: a default, a reminder, a simpler form. How well do nudges work at scale? DellaVigna and Linos (2022) compared 126 trials run by two US government nudge units with nudges published in academic journals. The average effect in the nudge units was 1.4 percentage points, against 8.7 in the journals; most of the gap came from selective publication of large effects. Some famous behavioural findings have also replicated poorly. The fair summary: the main patterns (loss aversion, present bias, inertia) are robust, but individual effect sizes are often smaller than first reported.

Behavioural findings refine rather than replace the supply and demand model: market demand curves still slope down, but *how* choices are framed can shift them.`,
          resources: [
            ostx('6-3-behavioral-economics-an-alternative-framework-for-consumer-choice', '6.3 Behavioral economics: an alternative framework for consumer choice', 'Overview with examples.', true),
            { title: 'The Prize in Economic Sciences 2017: popular information (Richard Thaler)', url: 'https://www.nobelprize.org/prizes/economic-sciences/2017/popular-information/', type: 'article', cost: 'free', provider: 'The Nobel Prize', note: 'A clear summary of mental accounting, social preferences and self-control.' },
            nber('w7682', 'The power of suggestion: inertia in 401(k) participation and savings behavior', 'Madrian and Shea', 'The default-effect study. Read the introduction and look at the participation figures.'),
            nber('w27594', 'RCTs to scale: comprehensive evidence from two nudge units', 'DellaVigna and Linos', 'Published in Econometrica, 2022. Read the abstract and introduction.'),
            mit('lec-25-behavioral-economics', 'Lecture 25, Behavioral economics', 'Optional full lecture.'),
          ],
          exercises: [
            {
              slug: 'present-bias-numbers',
              title: 'Present bias in numbers',
              prompt:
                'A person values a payoff $t$ days from now at $\\beta \\delta^t$ times its face value for $t \\ge 1$ (and at face value today), with $\\delta = 0.999$ per day and $\\beta = 0.8$. (a) Compare USD 100 today with USD 110 tomorrow. (b) Compare USD 100 in 30 days with USD 110 in 31 days. (c) Explain the reversal. (d) Suggest one commitment device that would help this person follow through on a savings plan.',
              kind: 'problem',
              difficulty: 2,
              hint: '(a) 110 × 0.8 × 0.999 ≈ 87.9 < 100, so take 100 today. (b) Both are scaled by β, and 110 × 0.999 > 100, so wait for 110.',
            },
            {
              slug: 'spot-the-bias',
              title: 'Spot the bias',
              prompt:
                'For each case, name the behavioural pattern and say what the standard model would predict instead: (a) a gym member pays monthly but goes twice a year; (b) people keep their phone plan for years despite cheaper options; (c) a shopper drives across town to save USD 10 on a USD 30 item but not on a USD 1,000 item; (d) a house seller refuses offers below what she paid, even though the market has fallen.',
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'evaluate-a-nudge',
              title: 'Evaluate a nudge',
              prompt:
                'Pick a nudge used by a government or company (organ donation defaults, energy-use comparisons on bills, reminder texts for court dates). In about 300 words: describe it, state the evidence on its effect with a source and date, discuss whether the effect would survive at scale given the DellaVigna and Linos findings, and give one ethical concern.',
              kind: 'writing',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What is loss aversion, and how does it explain the endowment effect?',
              answerOutline: 'Losses relative to a reference point weigh more than equal gains. Once you own a mug, giving it up is a loss, so you demand more to sell than you would pay to buy.',
            },
            {
              question: 'Why does a default have a big effect if opting out is easy?',
              answerOutline: 'Inertia, procrastination (present bias), and treating the default as advice; the standard model with zero switching costs predicts little effect.',
            },
            {
              question: 'Why do published nudge effects tend to overstate effects at scale?',
              answerOutline: 'Selective publication of large, significant results from small samples; large nudge-unit trials found much smaller average effects (1.4 vs 8.7 percentage points).',
            },
          ],
        },
      ],
    },
    {
      slug: 'production-and-costs',
      title: 'Production and Costs',
      description:
        'What firms maximise and what their costs really are: economic versus accounting profit, the short-run production function, the family of short-run cost curves, and economies of scale in the long run.',
      lessons: [
        {
          slug: 'profit-and-production',
          title: 'Economic profit and the production function',
          summary:
            'Separate economic profit from accounting profit, then see how output responds to adding workers to a fixed plant: marginal product and diminishing returns.',
          estimatedMinutes: 100,
          objectives: [
            'Distinguish explicit and implicit costs and compute economic profit',
            'Explain what a normal profit is and why zero economic profit is not bad news',
            'Compute marginal and average product from a production table',
            'Explain diminishing marginal returns and why it applies only in the short run',
          ],
          concepts: [
            'Explicit and implicit costs',
            'Accounting profit',
            'Economic profit',
            'Normal profit',
            'Short run and long run',
            'Production function',
            'Marginal product and average product',
            'Diminishing marginal returns',
          ],
          explanation: `A firm's **revenue** is price times quantity. Its costs include **explicit costs**, actual payments for wages, rent and materials, and **implicit costs**, the opportunity cost of resources the owners supply themselves. **Accounting profit** subtracts only explicit costs; **economic profit** subtracts both.

**Worked example.** Maya leaves a USD 70,000 job to run a bakery, and puts in USD 200,000 of her own savings that would otherwise earn 5% a year. The bakery takes in USD 400,000 and pays USD 290,000 in wages, flour, rent and other bills. Accounting profit is USD 110,000. Implicit costs are her forgone salary (70,000) and forgone interest (10,000), so economic profit is USD 30,000. If economic profit were zero, Maya would be earning a **normal profit**: exactly what her time and money could earn elsewhere. Zero economic profit is a perfectly good outcome, and in competitive industries it is the long-run norm.

**Production in the short run.** The **short run** is a period in which at least one input, usually the plant or equipment, is fixed. In the **long run** every input can change. The **production function** says how much output a given combination of inputs produces. With a fixed kitchen, here is the bakery's daily output of trays as it hires bakers:

| Bakers $L$ | 0 | 1 | 2 | 3 | 4 | 5 | 6 |
|---|---|---|---|---|---|---|---|
| Output $Q$ | 0 | 10 | 24 | 36 | 44 | 48 | 50 |
| Marginal product | | 10 | 14 | 12 | 8 | 4 | 2 |

The **marginal product** of labour is the extra output from one more worker. It rises at first (two bakers can divide tasks), then falls: the third, fourth and fifth bakers share the same ovens and counter space. This is **diminishing marginal returns**: adding more of a variable input to a fixed input eventually adds less and less. It is a short-run idea; in the long run Maya can build a bigger kitchen. **Average product** is $Q/L$: 12 trays per baker with 3 bakers, 10 with 5.

\`\`\`interactive
function-explorer
{"title": "A production function with diminishing returns", "f": ["A*x^alpha", "A*alpha*x^(alpha - 1)"], "sliders": {"A": [10, 2, 20, 0.5], "alpha": [0.6, 0.2, 1, 0.05]}, "view": [0, 10, 0, 50], "caption": "The first curve is output Q = A·L^α from L workers with a fixed plant; the second is the marginal product A·α·L^(α − 1), its slope. With α below 1 the marginal product falls as L rises: diminishing returns. Push α to 1 and the marginal product becomes flat (constant returns to labour), which a fixed plant cannot sustain for long. Unlike the bakery table, this curve has no early stage of rising marginal product."}
\`\`\`

Diminishing marginal returns is the root of the U-shaped cost curves in the next lesson: each worker costs the same wage, so when each adds fewer trays, the cost per extra tray rises.`,
          resources: [
            ostx('7-1-explicit-and-implicit-costs-and-accounting-and-economic-profit', '7.1 Explicit and implicit costs, and accounting and economic profit', 'The profit definitions with examples.', true),
            ostx('7-2-production-in-the-short-run', '7.2 Production in the short run', 'Production functions and diminishing marginal returns.'),
            khan('firm-economic-profit', 'Production decisions and economic profit', 'Videos on economic profit and short-run production.'),
            mit('lec-5-production-theory', 'Lecture 5, Production theory', 'Optional lecture with a calculus treatment.'),
          ],
          exercises: [
            {
              slug: 'economic-profit',
              title: 'Is the business worth it?',
              prompt:
                'A software consultant earns USD 180,000 in revenue in a year. Explicit costs (office, equipment, insurance) are USD 40,000. She left a salaried job paying USD 120,000 and used USD 50,000 of savings that would have earned 4%. (a) Compute accounting and economic profit. (b) Should she continue, purely on these numbers? (c) Name one factor that would change your answer even with negative economic profit.',
              kind: 'problem',
              difficulty: 1,
              hint: 'Accounting profit 140,000. Implicit costs 120,000 + 2,000. Economic profit 18,000.',
            },
            {
              slug: 'marginal-product-table',
              title: 'Marginal and average product',
              prompt:
                'A car wash with two bays produces 0, 15, 35, 50, 60, 65 and 66 washes an hour with 0 to 6 workers. (a) Compute the marginal and average product for each worker. (b) Where do diminishing returns begin? (c) Show that average product rises when marginal product is above it and falls when it is below. (d) Explain why the 6th worker adds so little.',
              kind: 'problem',
              difficulty: 1,
              hint: 'MP: 15, 20, 15, 10, 5, 1. AP: 15, 17.5, 16.7, 15, 13, 11. Diminishing returns start with the 3rd worker.',
            },
            {
              slug: 'production-function-calculus',
              title: 'A smooth production function',
              prompt:
                'Output is $Q = 12\\sqrt{L}$ with a fixed plant. (a) Compute $Q$ for $L = 1, 4, 9, 16$. (b) Compute the marginal product from one value to the next, per worker. (c) Optional calculus: show the marginal product is $6/\\sqrt{L}$ and that it falls as $L$ rises. (d) If each worker costs USD 120 a day, compute the cost of an extra unit of output at $L = 4$ and $L = 16$ using the derivative.',
              kind: 'derivation',
              difficulty: 2,
              hint: 'Q = 12, 24, 36, 48. MP at L = 4 is 3, so an extra unit costs 120/3 = 40; at L = 16 MP is 1.5, so 80.',
            },
          ],
          selfAssessment: [
            {
              question: 'A firm earns zero economic profit. Is it losing money?',
              answerOutline: 'No. It covers all costs including the opportunity cost of the owners\' time and capital: it earns a normal profit, the same as their next-best use.',
            },
            {
              question: 'What causes diminishing marginal returns, and why is it a short-run idea?',
              answerOutline: 'Adding variable inputs to a fixed input (plant) means each extra worker has less of the fixed input to work with. In the long run the fixed input can be expanded.',
            },
            {
              question: 'If marginal product is below average product, what happens to average product when one more worker is hired?',
              answerOutline: 'It falls, because the new worker adds less than the current average.',
            },
          ],
        },
        {
          slug: 'short-run-costs',
          title: 'Short-run costs',
          summary:
            'Fixed, variable, total, average and marginal cost, how they are related, and why marginal cost crosses the average curves at their lowest points.',
          estimatedMinutes: 100,
          objectives: [
            'Compute fixed, variable and total cost and the average and marginal cost curves',
            'Explain how diminishing returns make marginal cost rise',
            'Explain why marginal cost crosses average variable and average total cost at their minimum points',
            'Read the cost curves from a cubic total cost function (with optional calculus)',
          ],
          concepts: [
            'Fixed cost (FC) and variable cost (VC)',
            'Total cost TC = FC + VC',
            'Average fixed, variable and total cost (AFC, AVC, ATC)',
            'Marginal cost MC = ΔTC/ΔQ',
            'The marginal-average rule',
            'U-shaped cost curves',
          ],
          explanation: `In the short run some costs do not depend on output. **Fixed cost** (FC) is the cost of the fixed inputs: rent on the kitchen, equipment leases, insurance. It must be paid even at zero output. **Variable cost** (VC) rises with output: wages, flour, energy. **Total cost** is $TC = FC + VC$.

Dividing by output gives the averages: $AFC = FC/Q$, $AVC = VC/Q$ and $ATC = TC/Q = AFC + AVC$. **Marginal cost** is the extra cost of one more unit, $MC = \\Delta TC / \\Delta Q$; since fixed cost does not change, it is also $\\Delta VC/\\Delta Q$.

**The bakery again.** Each baker costs USD 80 a day and the kitchen USD 100. From the production table in the last lesson:

| Bakers | 0 | 1 | 2 | 3 | 4 | 5 | 6 |
|---|---|---|---|---|---|---|---|
| Trays $Q$ | 0 | 10 | 24 | 36 | 44 | 48 | 50 |
| $TC$ | 100 | 180 | 260 | 340 | 420 | 500 | 580 |
| $MC$ per tray | | 8.0 | 5.7 | 6.7 | 10 | 20 | 40 |
| $ATC$ | | 18.0 | 10.8 | 9.4 | 9.5 | 10.4 | 11.6 |

Marginal cost is the wage divided by the marginal product: $80/10 = 8$, $80/14 \\approx 5.7$, and so on. When marginal product falls, marginal cost rises. **Diminishing returns in production are rising marginal cost in costs.**

**The marginal-average rule.** If your next exam score is above your average, your average rises; if below, it falls. The same holds for costs: when MC is below ATC, ATC falls; when MC is above ATC, ATC rises. So **MC crosses ATC at the minimum of ATC**, and for the same reason it crosses AVC at the minimum of AVC. In the table, the 4th baker's trays cost 10 each, above the ATC of 9.4, so ATC starts to rise.

**Smooth curves.** A common textbook cost function is cubic. For $TC = 162 + 20Q - 4Q^2 + \\tfrac13 Q^3$, $VC = 20Q - 4Q^2 + \\tfrac13 Q^3$, $AVC = 20 - 4Q + \\tfrac13 Q^2$ and (optional calculus) $MC = TC'(Q) = 20 - 8Q + Q^2$. AVC is smallest at $Q = 6$, where $AVC = MC = 8$; ATC is smallest at $Q = 9$, where $ATC = MC = 29$. Drag the output slider to see every cost at once.

\`\`\`interactive
cost-curves
{"title": "Short-run cost curves", "cost": [162, 20, -4, 0.333333333333], "showPrice": false, "quantity": 6, "view": [0, 14, 0, 70], "priceUnit": "USD", "caption": "TC = 162 + 20Q − 4Q² + Q³/3. Start at Q = 6: MC and AVC are both 8, the bottom of AVC. Move to Q = 9: MC and ATC are both 29, the bottom of ATC. Between the two, MC is above AVC (so AVC rises) but still below ATC (so ATC still falls). The gap between ATC and AVC is average fixed cost, 162/Q, which shrinks as output grows."}
\`\`\`

These curves are the raw material for every decision in the next module: a firm compares price with MC to choose output and with AVC and ATC to decide whether to operate at all.`,
          resources: [
            ostx('7-3-costs-in-the-short-run', '7.3 Costs in the short run', 'All the cost curves with a worked table.', true),
            mru('costs-and-profit-maximization-under-competition', 'profit-maximization-average-cost', 'Average cost and profit', 'Average and marginal cost on video.'),
            mit('lec-6-costs', 'Lecture 6, Costs', 'Optional lecture deriving cost curves from production.'),
            core('02-technology-incentives-05-technology-costs', 'Unit 2.5 Modelling a dynamic economy: technology and costs', 'How input prices and technology choice determine costs.'),
          ],
          exercises: [
            {
              slug: 'cost-table',
              title: 'Fill in the cost table',
              prompt:
                'A print shop has fixed cost USD 60 a day. Total cost at outputs 0 to 6 (hundred pages) is 60, 100, 130, 150, 180, 230, 300. (a) Compute VC, AFC, AVC, ATC and MC at each output. (b) Find the outputs where AVC and ATC are smallest. (c) Verify that MC crosses AVC and ATC near those outputs. (d) The rent rises by USD 30: which columns change?',
              kind: 'problem',
              difficulty: 1,
              hint: 'MC: 40, 30, 20, 30, 50, 70. AVC: 40, 35, 30, 30, 34, 40 (lowest at 3 to 4). ATC: 100, 65, 50, 45, 46, 50 (lowest at 4). Rent changes FC, AFC, ATC and TC, not MC or AVC.',
            },
            {
              slug: 'cubic-costs',
              title: 'Costs from a formula',
              prompt:
                'For $TC = 100 + 10Q - 2Q^2 + 0.2Q^3$: (a) write FC, VC, AVC and ATC; (b) optional calculus: find MC; (c) find the output and value of minimum AVC; (d) show that MC equals AVC there; (e) at $Q = 10$, compute ATC and MC and say whether ATC is rising or falling at that point. (f) Sketch MC, AVC and ATC on one graph.',
              kind: 'derivation',
              difficulty: 2,
              hint: 'AVC = 10 − 2Q + 0.2Q², minimum at Q = 5 with value 5. MC = 10 − 4Q + 0.6Q², which is 5 at Q = 5. At Q = 10, TC = 200, so ATC = 20 while MC = 30: MC is above ATC, so ATC is rising (its minimum is near Q = 8.5).',
            },
            {
              slug: 'marginal-average-rule',
              title: 'The marginal-average rule',
              prompt:
                'Explain, without formulas, why marginal cost must cut average total cost at its lowest point, using an analogy of your own. Then explain why average fixed cost falls continuously, and why the gap between ATC and AVC narrows as output rises but never closes.',
              kind: 'writing',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does marginal cost eventually rise in the short run?',
              answerOutline: 'Diminishing marginal returns: each extra unit of the variable input adds less output, so the cost of an extra unit of output (input price divided by marginal product) rises.',
            },
            {
              question: 'Why does MC pass through the minimum of ATC?',
              answerOutline: 'When MC is below ATC it pulls the average down; above, it pulls it up. The average stops falling and starts rising exactly where MC equals it.',
            },
            {
              question: 'Does an increase in fixed cost change marginal cost?',
              answerOutline: 'No. It raises TC, AFC and ATC, but MC and AVC depend only on variable cost.',
            },
          ],
        },
        {
          slug: 'long-run-costs-and-scale',
          title: 'Long-run costs and economies of scale',
          summary:
            'When every input can change, the firm picks the best plant for each output. The long-run average cost curve, economies and diseconomies of scale, and what they mean for industry structure.',
          estimatedMinutes: 90,
          objectives: [
            'Explain the long-run average cost curve as the lowest short-run cost at each output',
            'Define economies, constant returns and diseconomies of scale, with causes',
            'Explain minimum efficient scale and how it shapes the number of firms in an industry',
            'Distinguish diminishing returns (short run) from diseconomies of scale (long run)',
          ],
          concepts: [
            'Long-run average cost (LRATC)',
            'Envelope of short-run ATC curves',
            'Economies of scale',
            'Constant returns to scale',
            'Diseconomies of scale',
            'Minimum efficient scale',
            'Natural monopoly preview',
          ],
          explanation: `In the long run a firm can choose its plant size. For each output it picks the plant with the lowest average cost. The **long-run average total cost** curve (LRATC) is therefore the lowest of all the short-run ATC curves at each output: their lower **envelope**.

**Economies of scale** are falling long-run average cost as output grows. Causes include specialisation of workers and machines, spreading large fixed costs such as design, software or a factory over more units, bulk buying, and physical facts: a pipe or tank twice as wide holds four times as much but needs only twice the material around it. **Constant returns to scale** mean doubling all inputs doubles output and leaves average cost unchanged. **Diseconomies of scale** are rising long-run average cost, usually blamed on the difficulty of coordinating and monitoring a very large organisation.

\`\`\`interactive
function-explorer
{"title": "Three plant sizes and the long-run envelope", "f": ["12 + 0.6*(x - 4)^2", "8 + 0.15*(x - 10)^2", "c + 0.25*(x - 16)^2", "min(min(12 + 0.6*(x - 4)^2, 8 + 0.15*(x - 10)^2), c + 0.25*(x - 16)^2)"], "sliders": {"c": [9, 5, 14, 0.5]}, "view": [0, 22, 0, 22], "caption": "The first three curves are short-run ATC for a small, a medium and a large plant (horizontal axis: output; vertical: average cost). The fourth traces the lowest of the three at each output: the long-run average cost the firm can achieve by choosing its plant. With c = 9 the large plant costs more per unit than the medium one at its best: diseconomies of scale beyond about 10 units. Lower c below 8 and the large plant becomes cheapest: economies of scale continue."}
\`\`\`

**Minimum efficient scale** (MES) is the smallest output at which long-run average cost reaches its minimum. Compare it with the size of the market. If MES is small relative to market demand, as for bakeries, hair salons or farms, many firms can each produce at low cost, and the industry can be competitive. If MES is a large share of the market, as for aircraft manufacturing or chip fabrication, only a few firms survive. If average cost keeps falling over the whole range of market demand, one firm can supply the market more cheaply than two: a **natural monopoly**, such as a water or electricity distribution network. Module 8 analyses how such firms price and how governments regulate them.

**Two ideas not to confuse.** *Diminishing marginal returns* is a short-run idea: one input is fixed and you add another. *Diseconomies of scale* are long-run: all inputs grow together. A firm can face diminishing returns in each plant and still have economies of scale across plant sizes.

Real cost curves are hard to observe, but engineering studies and the observed size distribution of firms suggest many industries have L-shaped long-run costs: falling at first, then roughly flat over a wide range of outputs. That leaves room for firms of very different sizes to coexist.`,
          resources: [
            ostx('7-4-production-in-the-long-run', '7.4 Production in the long run', 'Choosing input combinations when all inputs vary.', true),
            ostx('7-5-costs-in-the-long-run', '7.5 Costs in the long run', 'Economies of scale, the envelope curve and industry structure.'),
            core('07-firm-and-customers-11-decreasing-long-run-costs', 'Unit 7.11 Firms and markets with decreasing long-run average costs', 'Economies of scale and market power.'),
            core('07-firm-and-customers-03-large-scale-production', 'Unit 7.3 Economies of scale and the cost advantages of large-scale production', 'Sources of scale economies with examples.'),
          ],
          exercises: [
            {
              slug: 'read-the-envelope',
              title: 'Read the envelope',
              prompt:
                'Using the widget with c = 9, find (a) the output range over which each plant is the cheapest choice, (b) the minimum long-run average cost and the output where it occurs, and (c) whether the industry shows economies, constant returns or diseconomies of scale beyond that output. Then set c = 6 and repeat (b) and (c).',
              kind: 'problem',
              difficulty: 1,
              hint: 'Set the curves equal pairwise to find the switch points, or read them from the graph. With c = 9 the minimum is 8 at an output of 10.',
            },
            {
              slug: 'mes-and-market-structure',
              title: 'Minimum efficient scale and market size',
              prompt:
                'Minimum efficient scale is 5,000 units a year in industry A, 2 million in industry B and 40 million in industry C. Market demand at a price equal to minimum average cost is 1 million, 10 million and 30 million units. (a) Estimate the maximum number of efficient-size firms in each. (b) Predict the market structure. (c) For C, explain why one firm might be cheaper than two, and what problem that creates.',
              kind: 'problem',
              difficulty: 1,
              hint: 'A: 200 firms. B: 5. C: fewer than one, so a single firm operating below MES has lower cost than two smaller ones: a natural monopoly.',
            },
            {
              slug: 'scale-case',
              title: 'A scale story',
              prompt:
                'Choose an industry (cloud computing, solar panels, beer brewing, ride-hailing). In about 300 words, describe one source of economies of scale and one possible source of diseconomies, give a dated fact about firm sizes or market shares with a source, and explain what scale implies for how many firms the industry can sustain.',
              kind: 'writing',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What is the long-run average cost curve?',
              answerOutline: 'For each output, the lowest average cost achievable when all inputs, including plant size, can be chosen: the lower envelope of short-run ATC curves.',
            },
            {
              question: 'How is diminishing marginal returns different from diseconomies of scale?',
              answerOutline: 'Diminishing returns: adding one input to a fixed input (short run). Diseconomies: average cost rising when all inputs expand together (long run).',
            },
            {
              question: 'Why does a large minimum efficient scale relative to the market lead to few firms?',
              answerOutline: 'Only a few firms can each produce at the efficient scale before supplying the whole market; smaller firms have higher costs and are driven out.',
            },
          ],
        },
      ],
    },
    {
      slug: 'market-structures',
      title: 'Market Structures',
      description:
        'How the number of sellers and the type of product shape prices and output: perfect competition in the short and long run, monopoly and its regulation, price discrimination, monopolistic competition, and oligopoly analysed with game theory.',
      lessons: [
        {
          slug: 'perfect-competition-short-run',
          title: 'Perfect competition in the short run',
          summary:
            'A price-taking firm chooses output where price equals marginal cost, makes a profit or a loss, and shuts down only if price falls below average variable cost.',
          estimatedMinutes: 100,
          objectives: [
            'List the assumptions of perfect competition and explain why a firm is a price taker',
            'Show that a competitive firm maximises profit where P = MC on the rising part of MC',
            'Compute profit or loss from price, output and ATC',
            'Apply the shutdown rule P < min AVC and explain why fixed costs do not matter for it',
            'Derive the firm\'s short-run supply curve',
          ],
          concepts: [
            'Perfect competition: many firms, identical product, free entry and exit, good information',
            'Price taker',
            'Marginal revenue equals price',
            'Profit maximisation P = MC',
            'Profit = (P − ATC) × Q',
            'Shutdown point (minimum AVC)',
            'Break-even point (minimum ATC)',
            'Short-run supply curve',
          ],
          explanation: `**Perfect competition** describes a market with many small sellers of an identical product, buyers and sellers who know the price, and free entry and exit. Wheat, many fresh foods and some commodities come close. No single firm can affect the market price, so each is a **price taker**: it can sell as much as it likes at the market price, and nothing above it. Its **marginal revenue** (the extra revenue from one more unit) is just the price.

**How much to produce.** Using the marginal rule from Module 1, the firm expands output while the extra revenue of a unit (P) is at least its extra cost (MC). So it produces where **P = MC**, on the rising part of the MC curve.

**Profit or loss.** Profit is $TR - TC = (P - ATC) \\times Q$: the rectangle between the price and ATC at the chosen output. Take the firm from the last module with $TC = 162 + 20Q - 4Q^2 + \\tfrac13 Q^3$ and $MC = Q^2 - 8Q + 20$. At a price of USD 40, $Q^2 - 8Q + 20 = 40$ gives $Q = 10$. ATC there is about 29.53, so profit is about $(40 - 29.53) \\times 10 = 104.7$.

**The shutdown rule.** At a price of USD 20, $P = MC$ gives $Q = 8$, where ATC is about 29.58: the firm loses about $(29.58 - 20) \\times 8 = 76.7$. Should it shut down? If it closes it still pays the fixed cost of 162, so closing loses 162. Producing loses only 76.7, because revenue (160) covers the variable cost (about 74.7) and part of the fixed cost. The rule: **in the short run, produce if price is at least minimum AVC; shut down if it is below**. Fixed costs are sunk for this decision, so they do not enter it. Here minimum AVC is 8 at $Q = 6$, so the **shutdown price** is USD 8. The **break-even price** is minimum ATC, USD 29 at $Q = 9$, where profit is zero.

\`\`\`interactive
cost-curves
{"title": "A competitive firm's output decision", "cost": [162, 20, -4, 0.333333333333], "price": 40, "view": [0, 14, 0, 70], "priceUnit": "USD", "caption": "At P = 40 the firm produces q* = 10 (P = MC) and the green rectangle is its profit, about 104.7. Lower the price to 20: q* = 8 and the rectangle turns into a loss of 76.7, which beats shutting down and losing the fixed cost of 162. Click P = min AVC (8): below this the firm shuts down. Show the supply curve: it is MC above minimum AVC, plus zero output below."}
\`\`\`

**The supply curve.** For each price above the shutdown price the firm produces where P = MC, so **the competitive firm's short-run supply curve is its MC curve above minimum AVC**. Below that price it supplies nothing. The market supply curve adds these up across all firms. This is why Module 3 said that supply reflects marginal cost.

Perfect competition is an ideal type. Its value is as a benchmark: it shows what happens when no one has market power, and later lessons measure other structures against it.`,
          resources: [
            ostx('8-1-perfect-competition-and-why-it-matters', '8.1 Perfect competition and why it matters', 'The assumptions and why the model is useful.', true),
            ostx('8-2-how-perfectly-competitive-firms-make-output-decisions', '8.2 How perfectly competitive firms make output decisions', 'Profit maximisation, profit and loss, shutdown point.'),
            mru('costs-and-profit-maximization-under-competition', 'profit-maximization-marginal-cost-marginal-revenue', 'Profit maximisation: MR = MC', 'Why the firm produces where price equals marginal cost.'),
            mit('lec-7-competition-i', 'Lecture 7, Competition I', 'Optional full lecture.'),
          ],
          exercises: [
            {
              slug: 'competitive-firm-numbers',
              title: 'Solve a competitive firm',
              prompt:
                'A firm has $TC = 50 + 2Q + 0.5Q^2$, so $MC = 2 + Q$ and AVC $= 2 + 0.5Q$. (a) Find output and profit at prices of 12, 8 and 4. (b) Find the break-even price and the shutdown price. (c) Write the firm\'s supply curve. (d) There are 100 identical firms: write the market supply curve.',
              kind: 'problem',
              difficulty: 2,
              hint: 'At 12: Q = 10 and profit = 120 − (50 + 20 + 50) = 0, so 12 is the break-even price (ATC = 50/Q + 2 + 0.5Q is lowest at Q = 10, where it equals 12). At 8: Q = 6, loss 32. At 4: Q = 2, loss 48, still better than losing the fixed cost of 50. The shutdown price is min AVC = 2. Market supply is Q = 100(P − 2) for P ≥ 2.',
            },
            {
              slug: 'shutdown-reasoning',
              title: 'Stay open or close?',
              prompt:
                'A ski resort pays USD 2 million a year for its lease and lifts whatever it does (fixed). Running for a season costs USD 3 million in staff and energy. Expected ticket revenue is USD 4 million in a good year and USD 2.5 million in a warm year. (a) Should it open in each case in the short run? (b) What would change your answer in the long run? (c) Link your answer to the P versus AVC rule.',
              kind: 'problem',
              difficulty: 1,
              hint: 'Open in a good year (revenue covers variable cost and part of fixed). In a warm year revenue 2.5 < variable cost 3: stay closed and lose only 2.',
            },
            {
              slug: 'widget-supply-curve',
              title: 'Trace the supply curve',
              prompt:
                'Using the widget in this lesson, record the firm\'s output at prices 8, 12, 20, 29, 40 and 50 and plot them. Compare your points with the MC formula $Q^2 - 8Q + 20 = P$. Explain why the firm\'s output jumps from 0 to 6 at a price of 8 rather than rising smoothly from zero.',
              kind: 'simulation',
              difficulty: 1,
              hint: 'MC reaches its minimum at Q = 4 but the firm only produces on the part of MC above minimum AVC, which starts at Q = 6.',
            },
          ],
          selfAssessment: [
            {
              question: 'Why is marginal revenue equal to price for a perfectly competitive firm?',
              answerOutline: 'The firm is a price taker: each extra unit sells at the market price without lowering the price on other units.',
            },
            {
              question: 'A firm\'s price is below ATC but above AVC. What should it do in the short run, and why?',
              answerOutline: 'Keep producing: revenue covers variable costs and part of fixed costs, so the loss is smaller than the fixed cost it would lose by shutting down.',
            },
            {
              question: 'What is a competitive firm\'s short-run supply curve?',
              answerOutline: 'The part of its MC curve above minimum AVC (zero output below that price).',
            },
          ],
        },
        {
          slug: 'perfect-competition-long-run',
          title: 'Perfect competition in the long run',
          summary:
            'Entry and exit push economic profit to zero, price to minimum average cost, and make competitive markets efficient. Long-run supply in constant, increasing and decreasing cost industries.',
          estimatedMinutes: 100,
          objectives: [
            'Explain how entry and exit drive long-run economic profit to zero',
            'Find the long-run price, firm output and number of firms in a simple market',
            'Trace the short-run and long-run response to a demand increase',
            'Distinguish constant-, increasing- and decreasing-cost industries',
            'Explain productive and allocative efficiency in long-run competitive equilibrium',
          ],
          concepts: [
            'Entry and exit',
            'Zero economic profit in the long run',
            'Long-run price = minimum ATC',
            'Long-run supply curve',
            'Constant-, increasing- and decreasing-cost industries',
            'Productive efficiency (P = min ATC)',
            'Allocative efficiency (P = MC)',
          ],
          explanation: `In the long run firms can enter or leave. Positive economic profit attracts entrants; losses drive firms out. Entry adds to market supply and pushes the price down; exit does the opposite. The process stops only when economic profit is zero, which means **price equals minimum ATC**. Each firm then produces at the bottom of its ATC curve and earns a normal profit.

**Worked example.** Every firm has the cost curves from the last lesson, so minimum ATC is USD 29 at $q = 9$. Market demand is $Q_d = 4700 - 100P$. In long-run equilibrium $P = 29$, so the market buys $4700 - 2900 = 1800$ units, and with each firm making 9 there are **200 firms**.

Now demand rises to $Q_d = 5600 - 100P$.

- **Short run**: the 200 firms each move up their MC curves. Solving $5600 - 100P = 200q$ with $P = q^2 - 8q + 20$ gives $q \\approx 9.71$ and $P \\approx 36.6$. Each firm earns about USD 71 of economic profit.
- **Long run**: profit attracts entry until the price is back to 29. The market buys $5600 - 2900 = 2700$ units, made by $2700/9 = 300$ firms.

The price returned to its old level, so the **long-run supply curve** in this **constant-cost industry** is horizontal at USD 29: output can expand without raising long-run costs. If expansion bids up the price of a scarce input (land suited to vineyards, skilled engineers), each firm's cost curves rise as the industry grows, and long-run supply slopes up: an **increasing-cost industry**. If growth lowers input costs, for example because suppliers achieve economies of scale, long-run supply slopes down: a **decreasing-cost industry**.

**Why economists admire this outcome.** In long-run competitive equilibrium:

- $P = MC$: the value of the last unit to buyers equals its cost, so the quantity maximises total surplus (**allocative efficiency**).
- $P = \\min ATC$: every unit is produced at the lowest possible average cost (**productive efficiency**).
- Firms earn only a normal profit: consumers get the gains from any cost reduction once rivals copy it.

This is a precise version of the invisible hand. Its conditions are strong (many firms, free entry, no externalities, good information), and the rest of this module and Module 9 examine what happens when they fail. Competition is also a process over time: Schumpeter's "creative destruction" stresses that new products and methods drive profit, then entry competes it away.`,
          resources: [
            ostx('8-3-entry-and-exit-decisions-in-the-long-run', '8.3 Entry and exit decisions in the long run', 'Long-run adjustment and long-run supply.', true),
            ostx('8-4-efficiency-in-perfectly-competitive-markets', '8.4 Efficiency in perfectly competitive markets', 'Productive and allocative efficiency.'),
            mru('costs-and-profit-maximization-under-competition', 'supply-curve-constant-cost-industry', 'The long-run supply curve: constant-cost industry', 'Entry and exit on video; follow with the increasing- and decreasing-cost videos in the same unit.'),
            mru('competition-and-the-invisible-hand', 'creative-destruction-definition-elimination-principle', 'Creative destruction and the elimination principle', 'Why above-normal profits do not last.'),
          ],
          exercises: [
            {
              slug: 'long-run-numbers',
              title: 'Number of firms in the long run',
              prompt:
                'Each firm has $TC = 50 + 2q + 0.5q^2$ (minimum ATC 12 at $q = 10$). Market demand is $Q_d = 3000 - 100P$. (a) Find the long-run price, market quantity and number of firms. (b) Demand rises to $Q_d = 3600 - 100P$. In the short run, with the number of firms fixed, find the price, each firm\'s output and profit (use the firm supply $q = P - 2$). (c) Find the new long-run equilibrium.',
              kind: 'problem',
              difficulty: 2,
              hint: '(a) P = 12, Q = 1800, 180 firms. (b) 3600 − 100P = 180(P − 2) gives P = 14.14, q ≈ 12.14, profit ≈ 14.14 × 12.14 − (50 + 24.29 + 73.71) ≈ 23.7. (c) P = 12, Q = 2400, 240 firms.',
            },
            {
              slug: 'industry-cost-types',
              title: 'Which kind of industry?',
              prompt:
                'For each industry, predict whether long-run supply is horizontal, upward-sloping or downward-sloping, and explain: (a) T-shirt printing; (b) Napa Valley wine; (c) early solar-panel manufacturing; (d) cybersecurity consulting during a talent shortage. Sketch the short-run and long-run response to a demand increase for one of them.',
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'efficiency-essay',
              title: 'Two kinds of efficiency',
              prompt:
                'In about 250 words, explain the difference between allocative and productive efficiency, show both on a firm and market diagram for long-run competitive equilibrium, and give one real market where you think each condition fails, with the reason.',
              kind: 'writing',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'Why is economic profit zero in long-run competitive equilibrium?',
              answerOutline: 'Positive profit attracts entry, which lowers price; losses cause exit, which raises it. Movement stops only when P = min ATC and profit is zero.',
            },
            {
              question: 'After a demand increase in a constant-cost industry, what happens to price in the short run and the long run?',
              answerOutline: 'Short run: price rises and existing firms earn profits. Long run: entry restores the price to min ATC; quantity is higher with more firms.',
            },
            {
              question: 'Name the two efficiency conditions met in long-run competitive equilibrium.',
              answerOutline: 'P = MC (allocative efficiency) and P = min ATC (productive efficiency).',
            },
          ],
        },
        {
          slug: 'monopoly',
          title: 'Monopoly',
          summary:
            'A single seller facing the whole demand curve: barriers to entry, why marginal revenue is below price, the MR = MC rule, monopoly profit and deadweight loss.',
          estimatedMinutes: 100,
          objectives: [
            'Explain the main barriers to entry that sustain a monopoly',
            'Derive marginal revenue from a linear demand curve and explain why it lies below price',
            'Find the monopoly output, price and profit with MR = MC',
            'Compute the deadweight loss of monopoly relative to the efficient outcome',
            'Relate the markup over marginal cost to the elasticity of demand',
          ],
          concepts: [
            'Monopoly',
            'Barriers to entry: legal, resources, scale, network effects',
            'Price maker',
            'Marginal revenue MR = A − 2BQ',
            'MR = MC',
            'Monopoly deadweight loss',
            'Lerner index (P − MC)/P = −1/ε',
          ],
          explanation: `A **monopoly** is the only seller of a product with no close substitutes. It survives only if **barriers to entry** keep rivals out: legal barriers such as patents, copyrights and licences; control of a key resource; **economies of scale** so large that one firm can serve the market at lowest cost (a natural monopoly); and **network effects**, where a product is more valuable the more people use it.

**Marginal revenue below price.** A monopolist faces the whole downward-sloping market demand curve. To sell one more unit it must lower the price, and (without price discrimination) it lowers it on every unit, not just the last. So marginal revenue is less than price. For a linear demand $P = A - BQ$, total revenue is $AQ - BQ^2$ and

$$
MR = A - 2BQ:
$$

the MR line starts at the same intercept as demand and falls twice as steeply.

**The monopoly rule.** Like any firm, the monopolist expands output while MR ≥ MC, so it produces where **MR = MC**, then charges the highest price demand allows for that quantity.

**Worked example.** Demand is $P = 100 - 2Q$ and costs $TC = 100 + 10Q + Q^2$, so $MC = 10 + 2Q$. Then $MR = 100 - 4Q$, and $100 - 4Q = 10 + 2Q$ gives $Q_m = 15$ and $P_m = 100 - 30 = 70$. Total cost is $100 + 150 + 225 = 475$, revenue 1,050, so profit is 575. The **efficient** output, where demand meets MC, solves $100 - 2Q = 10 + 2Q$: $Q = 22.5$ at a price of 55. Between 15 and 22.5, every unit is worth more to some buyer (the demand curve) than it costs to make (MC), yet it is not produced. The **deadweight loss** is the triangle $\\tfrac12 \\times (22.5 - 15) \\times (70 - 40) = 112.5$, where 40 is MC at 15. Consumer surplus under monopoly is $\\tfrac12 \\times 15 \\times 30 = 225$.

\`\`\`interactive
cost-curves
{"title": "A monopolist", "mode": "monopoly", "cost": [100, 10, 1, 0], "demand": [100, 2], "demandSlider": true, "priceUnit": "USD", "caption": "MR (dashed) meets MC at Q = 15, and the monopolist charges 70, read off the demand curve. The green rectangle is profit (575), the blue triangle consumer surplus (225) and the purple triangle the deadweight loss (112.5) against the efficient point at Q = 22.5, P = 55 (hollow dot). Raise the demand intercept from 100 to 115: output rises to 17.5 and the price only from 70 to 80, two thirds of the shift, because the monopolist moves along its rising MC."}
\`\`\`

**Markups and elasticity.** A useful identity is $(P - MC)/P = -1/\\varepsilon_d$ at the monopoly output. At $Q = 15$, $\\varepsilon_d = -\\tfrac12 \\cdot 70/15 \\approx -2.33$, and $(70 - 40)/70 = 0.43 = 1/2.33$. The less elastic the demand, the higher the markup; and a monopolist always operates where demand is elastic, as the revenue lesson showed. The left-hand side is the **Lerner index** of market power.

**Is monopoly always bad?** It causes deadweight loss and transfers surplus to the owner. But patents grant temporary monopolies deliberately, to reward invention: the prospect of monopoly profit pays for research that might not otherwise happen. The MRU videos on pharmaceutical pricing discuss this trade-off between static efficiency (lower prices today) and dynamic efficiency (more drugs tomorrow).`,
          resources: [
            ostx('9-1-how-monopolies-form-barriers-to-entry', '9.1 How monopolies form: barriers to entry', 'Natural and legal barriers, with examples.', true),
            ostx('9-2-how-a-profit-maximizing-monopoly-chooses-output-and-price', '9.2 How a profit-maximizing monopoly chooses output and price', 'MR, MR = MC and deadweight loss.'),
            mru('monopoly', 'monopoly-profit-maximization-price-aids-medication', 'Monopoly profit maximisation', 'MR = MC using an AIDS-drug example.'),
            mru('monopoly', 'costs-benefits-monopoly-pharmaceutical-companies', 'Costs and benefits of monopoly: pharmaceuticals', 'The patent trade-off.'),
            mit('lec-11-monopoly-i', 'Lecture 11, Monopoly I', 'Optional full lecture.'),
          ],
          exercises: [
            {
              slug: 'solve-a-monopoly',
              title: 'Solve a monopoly',
              prompt:
                'Demand is $P = 60 - Q$ and marginal cost is constant at 12 (no fixed cost). (a) Find MR. (b) Find the monopoly output, price and profit. (c) Find the competitive (P = MC) output and price. (d) Compute consumer surplus under each and the deadweight loss of monopoly. (e) Verify the Lerner index identity at the monopoly point.',
              kind: 'problem',
              difficulty: 2,
              hint: 'MR = 60 − 2Q; Q = 24, P = 36, profit 576. Competitive Q = 48, P = 12. CS 288 versus 1,152; DWL 0.5 × 24 × 24 = 288. ε = −36/24 = −1.5 and (36 − 12)/36 = 2/3.',
            },
            {
              slug: 'why-mr-below-p',
              title: 'Why MR is below price',
              prompt:
                'A bookshop can sell 10 copies a week at USD 30 or 11 copies at USD 29. (a) Compute total revenue at each and the marginal revenue of the 11th copy. (b) Split that marginal revenue into the gain from the extra sale and the loss on the first 10 copies. (c) Explain why a price taker would have MR equal to price.',
              kind: 'problem',
              difficulty: 1,
              hint: 'TR 300 and 319, MR = 19 = 29 (gain) − 10 × 1 (loss).',
            },
            {
              slug: 'patent-tradeoff',
              title: 'The patent trade-off',
              prompt:
                'Write about 300 words on the case for and against 20-year drug patents. Use the monopoly diagram to show the static cost, explain the dynamic benefit, and describe one alternative way to reward innovation (prizes, government-funded research, advance purchase commitments) with one advantage and one drawback.',
              kind: 'writing',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does a monopolist\'s MR curve lie below its demand curve?',
              answerOutline: 'To sell another unit it must cut the price on all units, so the extra revenue is the new price minus the revenue lost on previous units.',
            },
            {
              question: 'How does a monopolist choose its price?',
              answerOutline: 'It chooses output where MR = MC and then charges the price on the demand curve at that output.',
            },
            {
              question: 'Where does the deadweight loss of monopoly come from?',
              answerOutline: 'Output is below the efficient level where demand meets MC; units valued above their cost are not produced.',
            },
          ],
        },
        {
          slug: 'price-discrimination-and-regulation',
          title: 'Price discrimination, regulation and antitrust',
          summary:
            'How firms with market power charge different prices to different buyers, how governments regulate natural monopolies, and what antitrust law does, with a recent case.',
          estimatedMinutes: 100,
          objectives: [
            'State the conditions for price discrimination and give examples of each degree',
            'Solve a two-group price discrimination problem and compare it with a single price',
            'Analyse a natural monopoly under marginal-cost and average-cost pricing',
            'Describe the main US antitrust laws and the issues in a recent monopolisation case',
          ],
          concepts: [
            'Price discrimination: first, second and third degree',
            'Conditions: market power, sorting buyers, preventing resale',
            'Inverse elasticity rule across groups',
            'Natural monopoly',
            'Marginal-cost pricing and the subsidy problem',
            'Average-cost pricing',
            'Sherman Act (1890), Clayton Act (1914)',
            'Monopolisation and mergers',
          ],
          explanation: `**Price discrimination** means charging different prices for the same good for reasons unrelated to cost. It needs three things: market power, a way to tell buyers apart (or make them sort themselves), and a way to stop resale.

- **First degree (perfect)**: each buyer pays their own maximum. The firm captures the whole surplus. Output is efficient, because the firm sells every unit worth more than its cost, but consumers get nothing.
- **Second degree**: prices depend on quantity or version (bulk discounts, economy versus business class), and buyers sort themselves.
- **Third degree**: different prices for identifiable groups (student and senior discounts, prices by country).

**Worked example (third degree).** A theatre has constant marginal cost 10. Students have demand $P = 40 - Q_s$ and other patrons $P = 70 - Q_o$. Setting MR = MC in each group: $40 - 2Q_s = 10$ gives 15 student tickets at 25; $70 - 2Q_o = 10$ gives 30 tickets at 40. Profit is $15 \\times 15 + 30 \\times 30 = 1{,}125$. With one price, combined demand is $Q = 110 - 2P$ (for prices up to 40), so $MR = 55 - Q = 10$ gives 45 tickets at 32.50 and profit $45 \\times 22.5 = 1{,}012.5$. The more elastic group (students) gets the lower price, the inverse-elasticity rule from the monopoly lesson.

**Natural monopoly.** When average cost falls over the whole market, one firm is cheapest, but left alone it charges the monopoly price. Take demand $P = 100 - 2Q$ and costs $TC = 400 + 10Q$: a large fixed network cost and constant MC of 10. Unregulated, $MR = MC$ gives 22.5 units at 55, profit 612.5 and a deadweight loss of 506.25. A regulator could require **P = MC** = 10: output is efficient (45 units), but price is below ATC and the firm loses its fixed cost of 400, so it would need a subsidy. **Average-cost pricing** (P = ATC) lets it break even: 40 units at 20, with a small deadweight loss of 25. US public utility commissions mostly use versions of average-cost (rate-of-return) regulation.

\`\`\`interactive
cost-curves
{"title": "Regulating a natural monopoly", "mode": "monopoly", "cost": [400, 10, 0, 0], "demand": [100, 2], "pricing": ["single", "mc", "atc", "perfect"], "priceUnit": "USD", "view": [0, 52, 0, 108], "caption": "ATC falls for ever because the fixed cost of 400 is spread over more units. Single price: Q = 22.5 at 55 with a deadweight loss of 506.25. Regulated P = MC: Q = 45 at 10 and a loss of 400 (red). Regulated P = ATC: Q = 40 at 20, zero profit and a deadweight loss of only 25. Perfect price discrimination also reaches Q = 45, but the firm takes all the surplus."}
\`\`\`

**Antitrust.** US competition law rests on the **Sherman Act** (1890), which bans agreements in restraint of trade and monopolisation, and the **Clayton Act** (1914), which covers mergers that may substantially lessen competition. Having a monopoly is not illegal; acquiring or keeping one by exclusionary conduct is. In *United States v. Google*, a federal judge ruled in August 2024 that Google had unlawfully maintained a monopoly in general search, partly through exclusive default-placement deals with browser and phone makers. In the September 2025 remedies decision the court declined to order the sale of the Chrome browser but barred exclusive distribution contracts and required some sharing of search data with rivals; Google said it would appeal. Check the current status before citing the case, since appeals can take years.`,
          resources: [
            mru('price-discrimination', 'price-discrimination-examples-airlines-arbitrage', 'Price discrimination: airlines and arbitrage', 'The conditions for price discrimination.'),
            mru('price-discrimination', 'price-discrimination-social-welfare', 'Is price discrimination bad?', 'Welfare effects of price discrimination.'),
            ostx('11-3-regulating-natural-monopolies', '11.3 Regulating natural monopolies', 'Marginal-cost and average-cost pricing.', true),
            ostx('11-2-regulating-anticompetitive-behavior', '11.2 Regulating anticompetitive behavior', 'Antitrust law and examples.'),
            { title: 'Antitrust laws and you', url: 'https://www.justice.gov/atr/antitrust-laws-and-you', type: 'documentation', cost: 'free', provider: 'US Department of Justice, Antitrust Division', note: 'Plain-language summary of the Sherman and Clayton Acts.' },
          ],
          exercises: [
            {
              slug: 'two-group-pricing',
              title: 'Two-group pricing',
              prompt:
                'A software firm with marginal cost 0 sells to businesses with demand $P = 200 - 2Q_b$ and to students with demand $P = 60 - Q_s$. (a) Find the profit-maximising price and quantity in each group. (b) Compute total profit. (c) Find the best single price and its profit (check whether students buy at that price). (d) Who gains and who loses from discrimination here?',
              kind: 'problem',
              difficulty: 2,
              hint: '(a) Businesses Q = 50, P = 100; students Q = 30, P = 30. (b) 5,000 + 900 = 5,900. (c) At a single price of 100 students buy nothing; compare that (profit 5,000) with the best price when both groups buy.',
            },
            {
              slug: 'natural-monopoly-numbers',
              title: 'A water utility',
              prompt:
                'A water utility has fixed cost 100 and marginal cost 2; demand is $P = 32 - Q$. (a) Find the unregulated monopoly outcome and profit. (b) Find output and the loss under marginal-cost pricing. (c) Find the average-cost price (the larger output where $32 - Q = 2 + 100/Q$). (d) Compare deadweight losses and explain which regulation you would choose. (e) What happens to (a) if the fixed cost is 900 instead, and what does that imply for whether the service would be provided at all without public support?',
              kind: 'problem',
              difficulty: 2,
              hint: '(a) Q = 15, P = 17, profit 125. (b) Q = 30, P = 2, loss 100. (c) Q² − 30Q + 100 = 0 gives Q ≈ 26.2, P ≈ 5.8. (d) DWL 112.5 unregulated and about 7.3 with average-cost pricing. (e) Profit would be −675 even at the best monopoly price.',
            },
            {
              slug: 'antitrust-case',
              title: 'Follow an antitrust case',
              prompt:
                'Pick a current US or EU competition case (search, app stores, a large merger). In about 400 words, state the market the authorities define and the alleged harm, the defence, the remedies sought, and the current status with a date. Explain the economics with the tools of this module: market power, barriers to entry, network effects or deadweight loss.',
              kind: 'writing',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What three conditions make price discrimination possible?',
              answerOutline: 'Market power, the ability to identify or sort buyers by willingness to pay, and the ability to prevent resale (arbitrage).',
            },
            {
              question: 'Why does perfect price discrimination eliminate deadweight loss?',
              answerOutline: 'MR equals the demand curve, so the firm sells every unit whose value exceeds MC: output is efficient, though the firm takes all the surplus.',
            },
            {
              question: 'What is the problem with marginal-cost pricing for a natural monopoly?',
              answerOutline: 'With falling ATC, MC is below ATC, so P = MC means a loss; the firm needs a subsidy or another way to cover fixed cost.',
            },
          ],
        },
        {
          slug: 'monopolistic-competition',
          title: 'Monopolistic competition',
          summary:
            'Many firms selling differentiated products: short-run profits like a monopoly, zero long-run profit like competition, and the excess-capacity and variety trade-off.',
          estimatedMinutes: 90,
          objectives: [
            'Describe monopolistic competition and give examples',
            'Show short-run profit and the long-run zero-profit tangency',
            'Explain excess capacity and the markup over marginal cost',
            'Weigh the cost of inefficiency against the value of product variety',
            'Discuss the role of advertising and brands',
          ],
          concepts: [
            'Product differentiation',
            'Downward-sloping firm demand',
            'Free entry and exit',
            'Long-run tangency: P = ATC',
            'Excess capacity',
            'Markup: P > MC',
            'Advertising and brand names',
          ],
          explanation: `Restaurants, hair salons, clothing brands and coffee shops are not perfect competitors: each sells a product a bit different from its rivals', so each faces a **downward-sloping demand curve** and has some pricing power. But there are many sellers and entry is easy. This is **monopolistic competition**.

**Short run.** Each firm acts like a small monopolist: it produces where MR = MC and charges the price on its own demand curve. If that price is above ATC, it makes a profit.

**Long run.** Profit attracts entrants offering similar products. Each new café takes some customers from the existing ones, so each firm's demand curve shifts left (and often becomes more elastic). Entry continues until profit is zero: the demand curve just **touches** the ATC curve at the profit-maximising output. Then $P = ATC$, but because the demand curve slopes down, the tangency is on the falling part of ATC.

**Worked example.** A café has $TC = 100 + 10Q + Q^2$ (so $MC = 10 + 2Q$; minimum ATC is 30 at $Q = 10$). Its demand is $P = 60 - 3Q$ when it opens. MR = MC gives $60 - 6Q = 10 + 2Q$, so $Q = 6.25$ and $P = 41.25$. ATC there is $10 + 6.25 + 16 = 32.25$, so profit is $6.25 \\times 9 = 56.25$ a day. Entry shifts the demand down until it is $P = 50 - 3Q$: then MR = MC at $Q = 5$, $P = 35$, and ATC at 5 is also $10 + 5 + 20 = 35$. Profit is zero, but output (5) is half the cost-minimising level (10) and price (35) exceeds MC (20).

\`\`\`interactive
cost-curves
{"title": "A monopolistically competitive café", "mode": "monopoly", "cost": [100, 10, 1, 0], "demand": [60, 3], "demandSlider": true, "priceUnit": "USD", "view": [0, 21, 0, 64], "caption": "At first (A = 60) the café earns a profit of 56.25 (green). Entry by rivals lowers its demand: slide A down to 50. The demand curve now just touches ATC at Q = 5, P = 35, and profit is zero. Yet ATC is lowest at Q = 10, so the café has excess capacity, and price is above MC. The purple area is the deadweight loss against producing where demand meets MC."}
\`\`\`

**Two inefficiencies, one benefit.** In long-run equilibrium:

- **Excess capacity**: firms produce less than the output that minimises ATC (so average cost is higher than it could be).
- **Markup**: price exceeds marginal cost, so some units worth more than they cost are not sold.

Against that, consumers get **variety**. A city with fifty different cafés has higher average costs than one with five giant ones, but people value the choice of atmosphere, location and style. Whether there is "too much" or "too little" variety is not settled by the model.

**Advertising and brands** are natural here. Advertising can inform (prices, new products) and so increase competition, or persuade and differentiate, raising willingness to pay. Brands can signal consistent quality, which matters when buyers cannot inspect a product before buying, a point the information lesson in Module 9 returns to.`,
          resources: [
            ostx('10-1-monopolistic-competition', '10.1 Monopolistic competition', 'Short run, long run, excess capacity and variety.', true),
            core('07-firm-and-customers-09-firms-differentiate-products', 'Unit 7.9 How firms differentiate their products', 'How firms choose and differentiate products.'),
            khan('forms-of-competition', 'Forms of competition', 'Videos on monopolistic competition and oligopoly.'),
          ],
          exercises: [
            {
              slug: 'tangency-numbers',
              title: 'Find the long-run tangency',
              prompt:
                'A pizzeria has $TC = 64 + 4Q + Q^2$ (so $MC = 4 + 2Q$). (a) Find minimum ATC and the output where it occurs. (b) Its demand is $P = A - 2Q$. Find the value of $A$ for which profit is zero at the MR = MC output (use $MR = A - 4Q$). (c) At that point, compute the price, output, markup over MC and excess capacity.',
              kind: 'problem',
              difficulty: 3,
              hint: 'Min ATC is 20 at Q = 8. Subtracting MR = MC from P = ATC gives 2Q = 64/Q − Q, so Q² = 64/3 and Q ≈ 4.62. Then A = 4 + 6Q ≈ 31.7, P ≈ 22.5 and MC ≈ 13.2; excess capacity is about 3.4 units.',
            },
            {
              slug: 'classify-structures',
              title: 'Classify the market',
              prompt:
                'Classify each as close to perfect competition, monopolistic competition, oligopoly or monopoly, and justify with the number of sellers, product differentiation and entry: (a) corn farming; (b) fast-casual restaurants in a city; (c) US wireless carriers; (d) the only electricity distribution network in a region; (e) yoga studios; (f) commercial aircraft manufacturing.',
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'variety-essay',
              title: 'Is variety worth it?',
              prompt:
                'In about 250 words, argue whether a city has too many coffee shops from an efficiency point of view. Use the long-run diagram, define excess capacity, and say what information you would need to decide whether the value of variety outweighs the higher average cost.',
              kind: 'writing',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does a monopolistically competitive firm earn zero economic profit in the long run?',
              answerOutline: 'Free entry: profits attract firms with similar products, shifting each firm\'s demand left until P = ATC at the profit-maximising output.',
            },
            {
              question: 'What is excess capacity?',
              answerOutline: 'In long-run equilibrium the firm produces less than the output that minimises ATC, because the tangency with downward-sloping demand is on the falling part of ATC.',
            },
            {
              question: 'Why is monopolistic competition not simply "inefficient"?',
              answerOutline: 'Consumers value product variety; the higher costs and markup buy choice, and the model alone cannot say whether the variety is worth it.',
            },
          ],
        },
        {
          slug: 'oligopoly-and-game-theory',
          title: 'Oligopoly and game theory',
          summary:
            'A few interdependent firms: payoff matrices, dominant strategies, Nash equilibrium, the prisoner\'s dilemma behind cartels, and why repetition can sustain cooperation.',
          estimatedMinutes: 110,
          objectives: [
            'Explain why oligopolists\' decisions are interdependent',
            'Read a payoff matrix and find dominant strategies and pure-strategy Nash equilibria',
            'Explain the prisoner\'s dilemma and why cartels are unstable',
            'Compute the discount factor needed to sustain cooperation in a repeated game',
            'Describe how antitrust law treats collusion, with a real case',
          ],
          concepts: [
            'Oligopoly and interdependence',
            'Game: players, strategies, payoffs',
            'Dominant strategy',
            'Nash equilibrium',
            'Prisoner\'s dilemma',
            'Cartel and collusion',
            'Repeated game and grim trigger',
            'Coordination game',
          ],
          explanation: `An **oligopoly** has a few large sellers, so each firm's best choice depends on what the others do. Airline routes, wireless carriers, soft drinks and aircraft are examples. **Game theory** models such situations: a game has **players**, the **strategies** each can choose, and the **payoffs** for every combination.

**A pricing game.** Two firms each choose a High or Low price. Profits in millions (first number for Firm A, second for Firm B):

| | B: High | B: Low |
|---|---|---|
| **A: High** | 6, 6 | 1, 8 |
| **A: Low** | 8, 1 | 3, 3 |

Consider A. If B prices high, A earns 8 from Low against 6 from High; if B prices low, A earns 3 from Low against 1 from High. Low is better *whatever B does*: a **dominant strategy**. The game is symmetric, so Low is dominant for B too. Both price low and earn 3 each, though both would earn 6 if both priced high. This is the **prisoner's dilemma**: individually rational choices lead to an outcome both dislike.

A **Nash equilibrium** is a combination of strategies in which no player can do better by changing only their own strategy, given the others' choices. (Low, Low) is the unique Nash equilibrium here. Not every game has a dominant strategy, but in every game you can check each cell: is each player's choice a best response to the other's?

\`\`\`interactive
game-matrix
{"title": "Duopoly pricing as a prisoner's dilemma", "players": ["Firm A", "Firm B"], "rows": ["High price", "Low price"], "cols": ["High price", "Low price"], "payoffs": [[[6, 6], [1, 8]], [[8, 1], [3, 3]]], "unit": "million USD", "caption": "Underlined payoffs are best responses; the outlined cell (Low, Low) is the only Nash equilibrium, although (High, High) is better for both. In the repeated game, cooperation on High is sustainable when δ ≥ (8 − 6)/(8 − 3) = 0.4. Turn on Edit payoffs: raise both temptation payoffs from 8 to 12 and the required δ rises to 0.67; make (High, High) pay 7 each instead and it falls to 0.2. For a coordination game, enter (2, 2) and (1, 1) on the diagonal and zeros elsewhere: two pure equilibria appear, plus a mixed one."}
\`\`\`

**Cartels.** A **cartel** is a group of firms that agree to restrict output and raise prices, acting together like a monopoly. The game shows why cartels are fragile: each member gains by secretly cheating with a lower price or extra output. OPEC's repeated difficulty in holding members to their production quotas is the classic example.

**Repeated games.** Firms that meet every year can sustain cooperation by threatening punishment. Under a **grim trigger** strategy, each firm prices high as long as the other has, and prices low for ever after any deviation. If $\\delta$ is how much a firm values next year's profit relative to this year's, cooperating forever is worth $6/(1 - \\delta)$, while deviating once is worth $8 + 3\\delta/(1 - \\delta)$. Cooperation is better when $\\delta \\ge (8 - 6)/(8 - 3) = 0.4$. Patient firms in stable markets can collude tacitly, without any explicit agreement.

**Collusion is illegal.** Explicit price-fixing agreements violate the Sherman Act. In the 1990s, Archer Daniels Midland, then headquartered in Decatur, Illinois, and Asian rivals fixed prices of lysine, an animal-feed additive; the case, built with an informant's recordings, led to large fines and prison sentences for executives. Tacit collusion, which the repeated game describes, is much harder to prosecute, which is one reason competition authorities scrutinise mergers that would leave very few firms.

Game theory reaches far beyond oligopoly: arms races, climate agreements (CORE's unit on strategic interactions starts there) and the public goods of Module 9 all have the same structure.`,
          resources: [
            ostx('10-2-oligopoly', '10.2 Oligopoly', 'Collusion, the prisoner\'s dilemma and the kinked demand curve.', true),
            core('04-strategic-interactions-03-nash-equilibrium', 'Unit 4.3 Best responses and Nash equilibrium', 'Best responses and equilibria, with an interactive approach.'),
            core('04-strategic-interactions-08-repeated-interaction', 'Unit 4.8 Repeated interaction: social norms, reciprocity and peer punishment', 'How repetition sustains cooperation.'),
            khan('nash-equilibrium-tutorial', 'Nash equilibrium', 'Videos on the prisoner\'s dilemma and Nash equilibrium.'),
            mit('lec-13-oligopoly-i', 'Lecture 13, Oligopoly I', 'Optional lecture including Cournot competition.'),
          ],
          exercises: [
            {
              slug: 'find-equilibria',
              title: 'Find the equilibria',
              prompt:
                'For each game (row player\'s payoff first), find dominant strategies and all pure-strategy Nash equilibria, and say whether the equilibrium is efficient. (a) Advertise/Don\'t: (Adv, Adv) = (4, 4), (Adv, Don\'t) = (10, 2), (Don\'t, Adv) = (2, 10), (Don\'t, Don\'t) = (8, 8). (b) Technology standard: (X, X) = (5, 5), (X, Y) = (0, 0), (Y, X) = (0, 0), (Y, Y) = (3, 3). (c) Entry deterrence: entrant Enter/Stay out, incumbent Fight/Accommodate: (Enter, Fight) = (−2, 1), (Enter, Acc) = (3, 4), (Out, Fight) = (0, 9), (Out, Acc) = (0, 9). Check your answers by entering the payoffs in the widget.',
              kind: 'problem',
              difficulty: 2,
              hint: '(a) A prisoner\'s dilemma: (Adv, Adv). (b) Two equilibria, (X, X) and (Y, Y); no dominant strategies. (c) (Enter, Acc) and (Out, Fight) are both Nash equilibria; the second relies on a threat the incumbent would not carry out once entry happens.',
            },
            {
              slug: 'repeated-cooperation',
              title: 'How patient must they be?',
              prompt:
                'In a repeated pricing game, cooperation pays each firm 10 per period, deviation while the other cooperates pays 18 once, and the punishment equilibrium pays 4 per period. (a) Find the minimum discount factor for grim-trigger cooperation. (b) If the interest rate is r, a firm\'s discount factor is about 1/(1 + r). What interest rate makes cooperation just sustainable? (c) Explain why more firms in the market make collusion harder.',
              kind: 'derivation',
              difficulty: 2,
              hint: '(a) (18 − 10)/(18 − 4) = 4/7 ≈ 0.571. (b) 1/(1 + r) = 4/7 gives r = 0.75.',
            },
            {
              slug: 'cartel-case',
              title: 'A cartel case study',
              prompt:
                'Read about the lysine price-fixing case (the US Department of Justice and many histories describe it) or OPEC\'s quota history. In about 300 words, describe how the cartel set prices or quantities, how it tried to detect cheating, how it broke down or was caught, and map the story onto the prisoner\'s dilemma and repeated-game ideas from this lesson.',
              kind: 'reading',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What is a Nash equilibrium?',
              answerOutline: 'A set of strategies, one per player, such that no player can raise their payoff by changing their own strategy while the others keep theirs.',
            },
            {
              question: 'Why are cartels unstable in a one-shot game?',
              answerOutline: 'Each member\'s dominant strategy is to cheat (cut price or raise output) while others stick to the agreement, so the cooperative outcome is not an equilibrium.',
            },
            {
              question: 'How can repetition sustain cooperation?',
              answerOutline: 'The threat of future punishment (e.g. grim trigger) makes cheating costly; if firms value the future enough (δ above a threshold), cooperating is a best response.',
            },
          ],
        },
      ],
      project: {
        slug: 'industry-structure-report',
        title: 'Industry structure report',
        description: `Choose one US industry with public data on firms and market shares (for example airlines on a route, wireless carriers, breakfast cereals, meatpacking or search advertising). Using the Census Bureau's Economic Census concentration tables, company reports, or regulator filings, measure concentration (top-four share or a Herfindahl-Hirschman index), describe barriers to entry, and decide which market structure model fits best. Then use that model to explain one observed fact about prices or output, and discuss whether any competition authority has acted in the industry and why.`,
        deliverables: [
          'A table of market shares with sources and dates, and the concentration measures you computed',
          'A diagram of the model you chose, labelled with the industry\'s features',
          'A 900 to 1,200 word report: structure, conduct, evidence of market power, and policy',
          'A short note on the limits of your data',
        ],
        estimatedHours: 3,
      },
    },
    {
      slug: 'market-failure-and-government',
      title: 'Market Failure and the Role of Government',
      description:
        'When markets alone do not deliver efficient outcomes: externalities and the tools to correct them, public goods and common resources, labour markets and the minimum wage debate, and problems of asymmetric information.',
      lessons: [
        {
          slug: 'externalities',
          title: 'Externalities and Pigouvian taxes',
          summary:
            'Costs and benefits that fall on people outside a transaction make markets produce too much or too little. A tax or subsidy equal to the external effect can fix it.',
          estimatedMinutes: 100,
          objectives: [
            'Define negative and positive externalities and give examples',
            'Show the gap between private and social marginal cost or benefit on a diagram',
            'Compute the market and efficient quantities and the deadweight loss of an externality',
            'Show that a Pigouvian tax or subsidy equal to the external effect restores efficiency',
            'Discuss how external costs such as the social cost of carbon are estimated and contested',
          ],
          concepts: [
            'Externality',
            'Private versus social marginal cost',
            'Private versus social marginal benefit',
            'Overproduction and underproduction',
            'Pigouvian tax',
            'Pigouvian subsidy',
            'Social cost of carbon',
          ],
          explanation: `An **externality** is a cost or benefit of an activity that falls on someone who is not part of the transaction and is not compensated. A factory's smoke harms neighbours (a **negative externality**); your flu vaccination protects people you meet (a **positive externality**). Because buyers and sellers ignore effects on others, markets produce too much of goods with negative externalities and too little of goods with positive ones.

**The diagram.** With a negative externality, the supply curve shows only the producers' **private marginal cost**. The **social marginal cost** adds the external cost per unit. The market settles where demand meets private MC; the efficient quantity is where demand meets social MC, which is lower.

**Worked example.** Demand is $P = 100 - Q$ and private marginal cost $P = 20 + Q$, so the market produces $Q = 40$ at $P = 60$. Each unit causes USD 20 of pollution damage, so social MC is $40 + Q$. The efficient quantity solves $100 - Q = 40 + Q$: $Q = 30$. Units 31 to 40 are worth less to buyers than their full social cost, so the market's extra output loses a triangle of $\\tfrac12 \\times 10 \\times 20 = 100$.

A **Pigouvian tax** (after Arthur Pigou, 1920) equal to the external cost per unit, USD 20, makes producers pay the full social cost. The market then produces 30, buyers pay 70 and sellers keep 50, the deadweight loss disappears and the tax raises $20 \\times 30 = 600$. Unlike most taxes, this one *improves* efficiency. For a positive externality the mirror image holds: social marginal benefit lies above demand, the market produces too little, and a **Pigouvian subsidy** equal to the external benefit corrects it.

\`\`\`interactive
supply-demand
{"title": "Pollution and a Pigouvian tax", "mode": "externality", "demand": [100, 1], "supply": [20, 1], "externalCost": 20, "corrective": 0, "taxMax": 40, "xLabel": "Output", "yLabel": "Price, cost (USD)", "supplyLabel": "Private MC", "priceUnit": "USD", "view": [0, 105, 0, 105], "controls": [], "caption": "The market produces 40 where demand meets private MC; the efficient output is 30, where demand meets social MC (dashed). The purple triangle is the deadweight loss of 100. Raise the corrective tax to 20: output falls to 30 and the loss vanishes. A tax of 30 overshoots and creates a new, smaller loss. Set the external cost negative (an external benefit) to see underproduction and the case for a subsidy."}
\`\`\`

**Where do the numbers come from?** The hard part is measuring the external cost. For carbon dioxide, the **social cost of carbon** estimates the present value of future damage from one more tonne emitted. In December 2023 the US Environmental Protection Agency adopted a central estimate of about USD 190 per tonne (for 2020 emissions, in 2020 dollars, using a 2% discount rate). In January 2025 an executive order disbanded the interagency group behind such estimates and directed agencies to stop relying on them. Economists disagree mainly about the discount rate, how to value damages in poor countries and far in the future, and how to treat uncertainty, all of which move the number by large factors. The theory says tax the damage; the practice depends on numbers that are part science and part value judgement.

The federal gasoline tax (18.4 cents a gallon since 1993) and taxes on tobacco and alcohol are sometimes described as partial Pigouvian taxes, though they were not set by measuring external costs.`,
          resources: [
            ostx('12-1-the-economics-of-pollution', '12.1 The economics of pollution', 'Negative externalities with a diagram.', true),
            ostx('13-1-investments-in-innovation', '13.1 Investments in innovation', 'Positive externalities from research and development.'),
            mru('externalities', 'pigouvian-taxes', 'Pigouvian taxes', 'The corrective-tax logic on video.'),
            mru('externalities', 'what-are-positive-externalities', 'Positive externalities', 'Vaccines, research and the case for subsidies.'),
            mit('lec-24-externalities', 'Lecture 24, Externalities', 'Optional full lecture.'),
          ],
          exercises: [
            {
              slug: 'externality-numbers',
              title: 'Solve an externality',
              prompt:
                'Demand for a chemical is $P = 120 - 2Q$ and private marginal cost $P = 30 + Q$. Production causes external damage of USD 15 per unit. (a) Find the market outcome. (b) Find the efficient quantity. (c) Compute the deadweight loss of the market outcome. (d) Find the Pigouvian tax, the prices buyers pay and sellers receive with it, and the revenue. (e) Who bears the tax, and does that matter for efficiency?',
              kind: 'problem',
              difficulty: 2,
              hint: '(a) Q = 30, P = 60. (b) 120 − 2Q = 45 + Q gives Q = 25. (c) 0.5 × 5 × 15 = 37.5. (d) t = 15: buyers 70, sellers 55, revenue 375. (e) Buyers bear 10 of the 15 because demand is steeper, but efficiency only requires that the full social cost be priced.',
            },
            {
              slug: 'positive-externality',
              title: 'A positive externality',
              prompt:
                'Demand for flu shots (private marginal benefit) is $P = 50 - 0.5Q$ and supply $P = 10 + 0.5Q$ (Q in thousands). Each shot gives others an external benefit of USD 10. (a) Find the market and efficient quantities. (b) Compute the deadweight loss. (c) Find the subsidy that achieves the efficient quantity and its cost. (d) Use the widget in this lesson with a negative external cost to check your reasoning qualitatively.',
              kind: 'problem',
              difficulty: 2,
              hint: 'Market: Q = 40. Efficient: 60 − 0.5Q = 10 + 0.5Q gives Q = 50. DWL = 0.5 × 10 × 10 = 50. Subsidy 10, cost 500.',
            },
            {
              slug: 'social-cost-of-carbon',
              title: 'The social cost of carbon',
              prompt:
                'Read about the US social cost of carbon (the EPA\'s 2023 report and later changes in federal policy). In about 400 words: (a) explain what the number measures; (b) explain why the discount rate matters so much, with a small numerical example of discounting USD 1,000 of damage 80 years ahead at 2% and at 5%; (c) present the strongest arguments for a high and for a low value without taking a side; (d) say what policy would follow from each.',
              kind: 'writing',
              difficulty: 3,
              hint: '1000/1.02^80 ≈ 205; 1000/1.05^80 ≈ 20.',
            },
          ],
          selfAssessment: [
            {
              question: 'Why does a market overproduce a good with a negative externality?',
              answerOutline: 'Producers and buyers equate private marginal cost and benefit, ignoring the external cost, so output exceeds the level where social marginal cost equals marginal benefit.',
            },
            {
              question: 'What size should a Pigouvian tax be?',
              answerOutline: 'Equal to the marginal external cost at the efficient quantity (a constant external cost per unit in the simple case).',
            },
            {
              question: 'Why is a Pigouvian tax different from other taxes in terms of deadweight loss?',
              answerOutline: 'It removes a pre-existing distortion; the quantity moves toward the efficient level, so it reduces rather than creates deadweight loss.',
            },
          ],
        },
        {
          slug: 'coase-and-pollution-policy',
          title: 'Coase, regulation and cap and trade',
          summary:
            'Bargaining as a private fix for externalities and why it often fails, command-and-control rules, and market-based tools: emissions taxes and tradable permits, with real programmes.',
          estimatedMinutes: 100,
          objectives: [
            'State the Coase theorem and the conditions under which it holds',
            'Compare command-and-control regulation with market-based tools',
            'Show why tradable permits achieve a pollution target at lowest cost',
            'Compare a carbon tax with cap and trade',
            'Describe the US Acid Rain Program and the EU Emissions Trading System',
          ],
          concepts: [
            'Coase theorem',
            'Transaction costs',
            'Property rights',
            'Command-and-control regulation',
            'Marginal abatement cost',
            'Cap and trade (tradable permits)',
            'Price versus quantity instruments',
          ],
          explanation: `**The Coase theorem.** Ronald Coase (1960) argued that if property rights are clear and bargaining is cheap, the parties to an externality will negotiate to the efficient outcome, whoever holds the right. Suppose a factory's smoke does USD 500 a year of damage to a laundry, and a filter costs USD 300. If the laundry has the right to clean air, the factory installs the filter (cheaper than paying 500). If the factory has the right to pollute, the laundry pays the factory something between 300 and 500 to install it. Either way the filter goes in; only who pays differs. The insight is that externalities are reciprocal problems about rights, and government need not always intervene.

The catch is **transaction costs**. With millions of people affected by air pollution, bargaining is impossible: identifying victims, valuing damages and enforcing a deal cost too much, and everyone hopes others will negotiate (free riding). Coase himself stressed that this is why the theorem usually does *not* apply, and why the design of laws and institutions matters.

**Command and control.** Governments often set rules: a maximum emission rate for every plant, or a required technology. Rules are simple to state and enforce, but they ignore that some firms can cut pollution much more cheaply than others.

**Market-based tools.** Suppose two plants must cut 80 tonnes in total. Plant A's marginal abatement cost is $0.2q$ and plant B's is $0.6q$ (dollars per tonne after $q$ tonnes cut). A uniform rule of 40 tonnes each costs A $\\tfrac12 \\times 0.2 \\times 40^2 = 160$ and B $\\tfrac12 \\times 0.6 \\times 40^2 = 480$: 640 in total. The cheapest way to cut 80 tonnes equalises marginal costs: $0.2q_A = 0.6q_B$ with $q_A + q_B = 80$ gives $q_A = 60$, $q_B = 20$, both at a marginal cost of 12, for a total of $360 + 120 = 480$. Two policies reach this automatically:

- an **emissions tax** of 12 per tonne (each plant cuts until its marginal cost reaches 12), or
- **cap and trade**: issue permits for the allowed emissions and let plants trade them. Plant B buys permits from A, which cuts more; the permit price settles at 12.

A tax fixes the **price** of pollution and lets the quantity adjust; a cap fixes the **quantity** and lets the price adjust. If the damage from exceeding a threshold is severe, a cap gives certainty about emissions; if firms' costs are uncertain, a tax gives certainty about cost.

**Real programmes.** The US **Acid Rain Program**, created by the 1990 Clean Air Act Amendments and starting in 1995, capped sulphur dioxide from power plants with tradable allowances. Emissions fell substantially, and compliance costs were well below early predictions; Schmalensee and Stavins (2013) review its successes and the later legal problems that undermined the market. The **EU Emissions Trading System**, launched in 2005, caps carbon emissions from power, industry and aviation. Its early phases had low prices from too many permits; reforms tightened the cap. Northeastern US states run the **Regional Greenhouse Gas Initiative** (since 2009) for power plants.`,
          resources: [
            ostx('12-3-market-oriented-environmental-tools', '12.3 Market-oriented environmental tools', 'Pollution charges, tradable permits and property rights.', true),
            ostx('12-2-command-and-control-regulation', '12.2 Command-and-control regulation', 'The rule-based approach and its costs.'),
            mru('externalities', 'coase-theorem-example', 'The Coase theorem', 'A worked bargaining example.'),
            { title: 'The SO2 allowance trading system: the ironic history of a grand policy experiment', url: 'https://www.aeaweb.org/articles?id=10.1257/jep.27.1.103', type: 'article', cost: 'free', provider: 'Schmalensee and Stavins, Journal of Economic Perspectives (2013)', note: 'A readable review of the Acid Rain Program.' },
            { title: 'About the EU ETS', url: 'https://climate.ec.europa.eu/eu-action/carbon-markets/about-eu-ets_en', type: 'documentation', cost: 'free', provider: 'European Commission', note: 'How the EU cap and trade system works, with current rules.' },
          ],
          exercises: [
            {
              slug: 'coase-bargain',
              title: 'Strike a Coasean bargain',
              prompt:
                'A rancher\'s cattle stray onto a farmer\'s field, destroying USD 900 of crops a year. A fence costs the rancher USD 600 a year; the farmer could instead protect the crop with netting for USD 400 a year. (a) What is the efficient solution? (b) Describe the outcome and payments if the farmer has the right to an undamaged crop. (c) Describe it if the rancher has the right to let cattle roam. (d) Explain why the result might fail with 200 farmers and one ranch.',
              kind: 'problem',
              difficulty: 2,
              hint: 'The cheapest fix is netting (400), whoever has the right. If the farmer holds the right, the rancher pays the farmer to install netting (between 400 and 600).',
            },
            {
              slug: 'abatement-costs',
              title: 'Least-cost abatement',
              prompt:
                'Three plants have marginal abatement costs $2q$, $4q$ and $8q$ (USD per tonne). The regulator wants a total cut of 70 tonnes. (a) Compute the total cost of a uniform cut for each plant. (b) Find the cost-minimising allocation and the permit price (or tax) that achieves it. (c) Compute the savings. (d) Who buys permits and who sells, if each plant is given permits equal to its uniform share?',
              kind: 'problem',
              difficulty: 2,
              hint: 'Equalise marginal costs: 2q1 = 4q2 = 8q3 = p, so q1 = p/2, q2 = p/4, q3 = p/8 and 7p/8 = 70 gives p = 80: cuts of 40, 20, 10.',
            },
            {
              slug: 'tax-or-cap',
              title: 'Tax or cap?',
              prompt:
                'In about 400 words, advise a country choosing between a carbon tax and cap and trade. Cover price versus quantity certainty, revenue use, political feasibility, interaction with other countries\' policies, and one lesson from the EU ETS or the Acid Rain Program. State clearly which parts of your advice are positive and which normative.',
              kind: 'writing',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What does the Coase theorem claim, and what does it require?',
              answerOutline: 'With well-defined property rights and low transaction costs, bargaining reaches the efficient outcome regardless of who holds the rights; it fails when transaction costs are high.',
            },
            {
              question: 'Why does cap and trade reduce pollution at lower cost than a uniform standard?',
              answerOutline: 'Trading moves abatement to firms with low marginal abatement costs until marginal costs are equal across firms.',
            },
            {
              question: 'What is the main difference between a pollution tax and a cap?',
              answerOutline: 'A tax sets the price and lets quantity adjust; a cap sets the quantity and lets the permit price adjust.',
            },
          ],
        },
        {
          slug: 'public-goods-and-common-resources',
          title: 'Public goods and common resources',
          summary:
            'Classify goods by rivalry and excludability, see why public goods are underprovided and common resources overused, and look at solutions from taxes to community management.',
          estimatedMinutes: 100,
          objectives: [
            'Classify goods as private, public, club or common resources',
            'Explain the free-rider problem and why markets underprovide public goods',
            'Find the efficient quantity of a public good by adding marginal benefits vertically',
            'Explain the tragedy of the commons and evaluate solutions, including Ostrom\'s findings',
          ],
          concepts: [
            'Rivalry',
            'Excludability',
            'Public good',
            'Club good',
            'Common resource',
            'Free rider',
            'Vertical summation of marginal benefits',
            'Tragedy of the commons',
          ],
          explanation: `Two properties sort goods. A good is **rival** if one person's use reduces what is available to others (a sandwich), and **excludable** if non-payers can be kept out (a cinema).

| | Excludable | Not excludable |
|---|---|---|
| **Rival** | Private goods (food, clothing) | Common resources (fish in the ocean, groundwater) |
| **Not rival** | Club goods (streaming services, toll roads when uncrowded) | Public goods (national defence, a fireworks display, basic research) |

**Public goods and free riders.** If no one can be excluded, each person can enjoy the good without paying: a **free rider**. Private firms cannot easily charge for it, so markets provide too little, often none.

**How much is efficient?** Because everyone consumes the *same* quantity, the value of one more unit is the **sum** of everyone's marginal benefits. You add marginal benefit curves **vertically**, not horizontally as for a private good. Three neighbours value a street-lighting programme (in lamps) at $MB_1 = 20 - Q$, $MB_2 = 15 - Q$ and $MB_3 = 10 - Q$ dollars a month per extra lamp. The total is $MB = 45 - 3Q$ (while all three are positive). If a lamp costs 21 a month, the efficient number is where $45 - 3Q = 21$: $Q = 8$. But no single neighbour would buy even one lamp alone, since each person's own marginal benefit is below 21 for every lamp. Voluntary provision gives zero; collective provision financed by taxes, or a contribution scheme, can reach 8.

**Common resources.** A fishery is rival (a fish caught by me cannot be caught by you) but hard to exclude people from. Each fisher ignores the cost that their catch imposes on others by reducing the stock, so the resource is overused: the **tragedy of the commons**, named by Garrett Hardin in 1968. The collapse of the Atlantic cod stocks off Newfoundland, which led Canada to impose a moratorium on the northern cod fishery in 1992, is a stark example; tens of thousands of fishing jobs disappeared and the stock has recovered only slowly.

**Solutions.** Governments can set catch limits, charge for use, or create property rights such as **individual transferable quotas**, which give each fisher a share of a total allowed catch that can be bought and sold. Elinor Ostrom, who won the 2009 Nobel Prize, showed that many communities manage commons well without either privatisation or central control: Swiss alpine pastures, Japanese forests and irrigation systems in Spain and Nepal have lasted for centuries under local rules with clear boundaries, monitoring by users, graduated sanctions and ways to resolve disputes. The tragedy is a risk, not a law.`,
          resources: [
            ostx('13-3-public-goods', '13.3 Public goods', 'Free riders and how public goods are provided.', true),
            mru('public-goods-and-the-tragedy-of-the-commons', 'public-goods-definition-nonexcludable-nonrival', 'Public goods', 'Non-rival and non-excludable goods explained.'),
            mru('public-goods-and-the-tragedy-of-the-commons', 'tragedy-of-the-commons-examples-economics', 'The tragedy of the commons', 'Examples and solutions.'),
            { title: 'Elinor Ostrom, Prize Lecture: Beyond markets and states', url: 'https://www.nobelprize.org/prizes/economic-sciences/2009/ostrom/lecture/', type: 'lecture', cost: 'free', provider: 'The Nobel Prize', note: 'Her design principles for managing common resources.' },
            core('10-market-successes-failures-07-open-access-shared-resources', 'Unit 10.7 Public goods and bads, open access, and shared resources', 'Common resources with experimental evidence.'),
          ],
          exercises: [
            {
              slug: 'classify-goods',
              title: 'Classify the goods',
              prompt:
                'Classify each as private, club, common resource or public good, and say whether the market is likely to underprovide or overuse it: (a) a lighthouse; (b) a crowded city street at rush hour; (c) a password-protected online course; (d) an aquifer used by many farms; (e) a vaccine dose; (f) herd immunity; (g) Wikipedia. Note any case where your answer depends on crowding or technology.',
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'vertical-sum',
              title: 'Add marginal benefits vertically',
              prompt:
                'Two towns share a river cleanup measured in kilometres cleaned. Town A\'s marginal benefit is $40 - 2Q$ and town B\'s is $30 - Q$ (thousand USD per km). The marginal cost is 34 per km. (a) Find the efficient length. (b) How much would each town clean on its own? (c) Propose a cost-sharing rule (a tax share per km for each town) under which both would vote for the efficient amount.',
              kind: 'problem',
              difficulty: 2,
              hint: 'MB = 70 − 3Q = 34 gives Q = 12. On its own, A cleans where 40 − 2Q = 34 (3 km) and B cleans nothing. Shares equal to each town\'s MB at Q = 12 (16 and 18) work.',
            },
            {
              slug: 'ostrom-reading',
              title: 'Read Ostrom',
              prompt:
                'Read or watch Ostrom\'s Nobel lecture. List her design principles for long-lasting commons institutions, and apply them to one commons you know (a shared office kitchen, a community garden, a group chat, a local fishery). In about 300 words, say which principles are present, which missing, and predict whether the commons will be sustained.',
              kind: 'reading',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What two properties define a public good?',
              answerOutline: 'Non-rival (one person\'s use does not reduce others\') and non-excludable (non-payers cannot be kept out).',
            },
            {
              question: 'Why are marginal benefits added vertically for a public good?',
              answerOutline: 'Everyone consumes the same quantity, so the social value of one more unit is the sum of each person\'s marginal benefit at that quantity.',
            },
            {
              question: 'What did Elinor Ostrom show about the tragedy of the commons?',
              answerOutline: 'Many communities manage common resources sustainably through local rules, monitoring and sanctions, without privatisation or central control.',
            },
          ],
        },
        {
          slug: 'labour-markets-and-minimum-wage',
          title: 'Labour markets and the minimum wage',
          summary:
            'Wages from the demand for and supply of labour, why employers with market power change the picture, and what the evidence says about minimum wages.',
          estimatedMinutes: 110,
          objectives: [
            'Derive a firm\'s labour demand from the marginal revenue product of labour',
            'Find the competitive wage and employment',
            'Predict the effect of a minimum wage in the competitive model and in a monopsony model',
            'Summarise the main empirical studies of minimum wages and why they differ',
            'Explain what the CBO estimated for a USD 15 federal minimum and how to read its range',
          ],
          concepts: [
            'Derived demand',
            'Marginal revenue product (MRP = P × MP)',
            'Labour supply',
            'Competitive wage',
            'Minimum wage as a price floor',
            'Monopsony',
            'Natural experiment and difference-in-differences',
          ],
          explanation: `The demand for labour is a **derived demand**: firms hire workers because of what they produce. A competitive firm hires another worker if the **marginal revenue product** (MRP), the marginal product times the price of output, is at least the wage. In the bakery of Module 7, with trays selling for USD 10, the bakers' marginal products of 10, 14, 12, 8, 4 and 2 trays give MRPs of 100, 140, 120, 80, 40 and 20. At a wage of USD 80 the bakery hires four. Labour demand slopes down because of diminishing returns.

**A competitive labour market.** With market labour demand $W = 25 - 0.1L$ and supply $W = 5 + 0.1L$ (wage in USD an hour, $L$ in thousands of workers), the equilibrium is $L = 100$ at $W = 15$. A minimum wage of USD 17 is a binding price floor: employers want only 80 thousand workers while 120 thousand want jobs. Employment falls by 20 thousand, and those who keep their jobs earn more.

\`\`\`interactive
supply-demand
{"title": "A minimum wage in a competitive labour market", "mode": "floor", "demand": [25, 0.1], "supply": [5, 0.1], "floor": 17, "xLabel": "Workers (thousands)", "yLabel": "Wage (USD per hour)", "demandLabel": "Labour demand", "supplyLabel": "Labour supply", "csLabel": "Employers' surplus", "psLabel": "Workers' surplus", "priceUnit": "USD", "surplusUnit": "thousand USD per hour", "quantityUnit": "thousand", "view": [0, 210, 0, 27], "controls": ["demandSlope"], "caption": "At a minimum wage of 17, employment is 80 thousand (labour demand) and 120 thousand want work: the bracket is the excess supply of labour. Make labour demand steeper (less elastic): the job loss shrinks, which is why the size of the effect depends on how elastic labour demand is. Set the floor below 15 and it does not bind."}
\`\`\`

**Monopsony.** If an employer is the main buyer of labour in an area, or workers find it costly to switch jobs, the firm has wage-setting power: a **monopsony**. To hire one more worker it must raise the wage for everyone, so it hires fewer workers at a lower wage than a competitive market would. A minimum wage set between the monopsony wage and the competitive wage can then *raise* employment, because the firm no longer needs to raise everyone's pay to hire. Card (2022) argues that employer wage-setting power is widespread.

**The evidence.** Card and Krueger (1994) compared fast-food restaurants in New Jersey, which raised its minimum wage in April 1992, with neighbouring eastern Pennsylvania, which did not, and found no fall in employment. Critics re-examined the data with payroll records and found small negative effects; the exchange became a model for how to argue with evidence. Cengiz, Dube, Lindner and Zipperer (2019), studying 138 state minimum-wage increases from 1979 to 2016, found that the number of jobs paying below the new minimum fell but was offset by new jobs just above it, so low-wage employment was roughly unchanged over five years. Jardim and co-authors (2017) studied Seattle's rise to USD 13 an hour and found that hours worked in low-wage jobs fell enough to reduce low-wage workers' total earnings, a result others dispute. Effects probably depend on how high the minimum is relative to local wages.

**Policy numbers.** The federal minimum wage has been USD 7.25 an hour since July 2009 (still 7.25 as of October 2026, FRED series FEDMINNFRWG), and many states and cities set higher ones. In July 2019 the Congressional Budget Office estimated that raising the federal minimum to USD 15 by 2025 would raise pay for about 17 million workers and lift about 1.3 million people out of poverty, with a median estimate of 1.3 million jobs lost and a two-thirds chance that the job loss lay between about zero and 3.7 million. That wide range is an honest summary of the disagreement.`,
          resources: [
            ostx('14-1-the-theory-of-labor-markets', '14.1 The theory of labor markets', 'Labour demand from marginal revenue product.', true),
            ostx('14-2-wages-and-employment-in-an-imperfectly-competitive-labor-market', '14.2 Wages and employment in an imperfectly competitive labor market', 'Monopsony.'),
            nber('w4509', 'Minimum wages and employment: a case study of the fast food industry in New Jersey and Pennsylvania', 'Card and Krueger', 'The original natural-experiment study (AER, 1994).'),
            nber('w25434', 'The effect of minimum wages on low-wage jobs', 'Cengiz, Dube, Lindner and Zipperer', 'Published in the Quarterly Journal of Economics, 2019. Read the introduction.'),
            nber('w23532', 'Minimum wage increases, wages, and low-wage employment: evidence from Seattle', 'Jardim, Long, Plotnick, van Inwegen, Vigdor and Wething', 'The Seattle study. Read the introduction and the discussion of disputes.'),
          ],
          exercises: [
            {
              slug: 'mrp-hiring',
              title: 'How many workers?',
              prompt:
                'A farm\'s marginal product of pickers is 30, 26, 22, 18, 14 and 10 crates a day for the 1st to 6th picker; crates sell for USD 5. (a) Compute each picker\'s MRP. (b) How many pickers does the farm hire at a daily wage of USD 100? At USD 120? (c) The crate price rises to USD 6: how many at USD 100? (d) Explain why labour demand is called derived demand.',
              kind: 'problem',
              difficulty: 1,
              hint: 'MRP: 150, 130, 110, 90, 70, 50. At 100: 3 pickers; at 120: 2. At USD 6, MRPs are 180, 156, 132, 108, 84, 60: 4 pickers.',
            },
            {
              slug: 'minimum-wage-models',
              title: 'Two models, two predictions',
              prompt:
                'Use the competitive labour market in this lesson ($W = 25 - 0.1L$, $W = 5 + 0.1L$). (a) Compute employment, unemployment (excess supply) and the deadweight loss with minimum wages of 16, 17 and 20. (b) Sketch a monopsony diagram and show a minimum wage that raises employment. (c) In 200 words, explain what evidence would help you tell which model fits a particular local labour market.',
              kind: 'problem',
              difficulty: 2,
              hint: 'At 16: L = 90, excess supply 20, DWL 0.5 × 10 × 2 = 10. At 17: L = 80, excess supply 40, DWL 40. At 20: L = 50, excess supply 100, DWL 250.',
            },
            {
              slug: 'minimum-wage-data',
              title: 'The real federal minimum wage',
              prompt:
                'Download FRED series FEDMINNFRWG (federal minimum wage) and CPIAUCSL (consumer price index). (a) Convert the minimum wage to dollars of the latest year and plot it from 1960. (b) Find the year with the highest real value and its value in today\'s dollars. (c) In about 200 words, describe what the series shows and what it does not (for example, state minimum wages). Record the download date.',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'evidence-review',
              title: 'Review the evidence',
              prompt:
                'Read the introductions of Card and Krueger (1994), Cengiz et al. (2019) and Jardim et al. (2017). Write a 500-word review that, for each, states the method, the comparison group, the main finding and one criticism. Then explain why credible studies reach different conclusions, and what you would want to know before supporting a specific minimum wage in a specific place. Keep your own normative view in a clearly marked final paragraph.',
              kind: 'reading',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'What determines a competitive firm\'s demand for labour?',
              answerOutline: 'The marginal revenue product of labour (output price times marginal product); it hires until MRP equals the wage.',
            },
            {
              question: 'Why can a minimum wage raise employment under monopsony?',
              answerOutline: 'The monopsonist restricts hiring to keep wages low; a floor removes the need to raise everyone\'s wage to hire more, so it hires up to the point where the floor meets labour supply (if below the competitive wage).',
            },
            {
              question: 'What did Card and Krueger compare, and what did they find?',
              answerOutline: 'Fast-food employment in New Jersey (minimum wage rose in 1992) against eastern Pennsylvania (no rise); they found no decline in New Jersey employment relative to Pennsylvania.',
            },
            {
              question: 'How should you read the CBO\'s 1.3 million job-loss estimate?',
              answerOutline: 'As a median within a wide range (about zero to 3.7 million with two-thirds probability), reflecting genuine uncertainty about labour demand elasticity, alongside wage gains for about 17 million workers.',
            },
          ],
        },
        {
          slug: 'information-problems',
          title: 'Asymmetric information',
          summary:
            'When one side knows more than the other: adverse selection and the market for lemons, moral hazard, signalling and screening, and how markets and governments respond.',
          estimatedMinutes: 100,
          objectives: [
            'Explain adverse selection with a numerical lemons example',
            'Explain moral hazard and give examples from insurance and employment',
            'Distinguish signalling from screening',
            'Evaluate private and public responses: warranties, reputation, certification and mandates',
          ],
          concepts: [
            'Asymmetric information',
            'Adverse selection',
            'Market for lemons (Akerlof, 1970)',
            'Moral hazard',
            'Signalling (Spence)',
            'Screening',
            'Insurance mandates and risk pooling',
          ],
          explanation: `Markets work best when both sides know what is being traded. With **asymmetric information**, one side knows more, and the result can be a market that shrinks or disappears.

**Adverse selection: the market for lemons.** George Akerlof's 1970 paper imagined a used-car market where sellers know whether their car is good or a "lemon" and buyers cannot tell. Suppose half the cars are good and half are lemons. Buyers value a good car at USD 10,000 and a lemon at USD 4,000; sellers value them at USD 8,000 and USD 3,000. With full information, every car would sell, since buyers value each type more than its owner does. Without it, a buyer who thinks a car is equally likely to be either will pay at most the average, USD 7,000. But owners of good cars value them at 8,000 and will not sell for 7,000, so they withdraw. Buyers then realise only lemons are left and offer at most 4,000. The good-car market **unravels**: mutually beneficial trades do not happen because quality cannot be verified. The same logic threatens health insurance: if insurers cannot tell healthy from sick applicants, premiums based on average costs drive the healthy away, which raises average costs and premiums further.

**Moral hazard.** After a contract is signed, the better-informed side may change its behaviour because the other side bears the cost. Insured drivers may drive less carefully; a worker paid a flat wage may shirk when unobserved; banks that expect a bailout may take more risk. Deductibles, co-payments, monitoring and performance pay all reduce moral hazard by leaving some cost with the person who controls the risk.

**Signalling and screening.** The informed side can **signal** quality with an action that is cheaper for high-quality types: a long warranty is cheap for a seller of reliable cars and expensive for a seller of lemons. Michael Spence argued that education can work partly as a signal of ability, not only as training. The uninformed side can **screen**: an insurer offers a menu of policies (low premium with a high deductible, high premium with a low one) so that customers reveal their risk by their choice. Akerlof, Spence and Joseph Stiglitz shared the 2001 Nobel Prize for this work.

**Responses.** Markets develop fixes: warranties, brand reputations, online ratings, independent inspections and vehicle history reports. Governments add **disclosure rules**, licensing, lemon laws and, for insurance, **mandates** or subsidies that keep low-risk people in the pool. The US Affordable Care Act combined rules that insurers cover applicants regardless of pre-existing conditions with an individual mandate penalty (reduced to zero from 2019) and subsidies, a design explicitly aimed at adverse selection; how much the penalty mattered is still debated. The MRU unit on asymmetric information walks through the health-insurance version.`,
          resources: [
            ostx('16-1-the-problem-of-imperfect-information-and-asymmetric-information', '16.1 The problem of imperfect information and asymmetric information', 'Lemons, signals and remedies.', true),
            ostx('16-2-insurance-and-imperfect-information', '16.2 Insurance and imperfect information', 'Adverse selection and moral hazard in insurance.'),
            mru('asymmetric-information', 'lemons-problem-asymmetric-information-health-insurance', 'The lemons problem', 'Used cars and health insurance.'),
            mru('asymmetric-information', 'signaling-economics', 'Signalling', 'Warranties, education and other signals.'),
            { title: 'The Prize in Economic Sciences 2001: popular information', url: 'https://www.nobelprize.org/prizes/economic-sciences/2001/popular-information/', type: 'article', cost: 'free', provider: 'The Nobel Prize', note: 'Akerlof, Spence and Stiglitz on markets with asymmetric information.' },
          ],
          exercises: [
            {
              slug: 'lemons-numbers',
              title: 'Does the market unravel?',
              prompt:
                'In a used-laptop market, 60% of laptops are good and 40% are lemons. Buyers value good ones at USD 600 and lemons at USD 200; sellers value them at USD 500 and USD 150. (a) What is the most a buyer will pay without information about quality? (b) Do good laptops sell? (c) Repeat with 80% good. (d) A seller offers a 1-year warranty that costs a good-laptop seller USD 20 and a lemon seller USD 300. Explain why this can restore the market.',
              kind: 'problem',
              difficulty: 2,
              hint: '(a) 0.6 × 600 + 0.4 × 200 = 440 < 500, so good laptops are withdrawn and the market unravels to lemons at up to 200. (c) 0.8 × 600 + 0.2 × 200 = 520 > 500: both types can sell at a pooled price.',
            },
            {
              slug: 'moral-hazard-or-adverse-selection',
              title: 'Which information problem?',
              prompt:
                'Classify each as adverse selection, moral hazard, signalling or screening, and name a fix: (a) people with risky hobbies buy more life insurance; (b) renters treat a flat less carefully than owners; (c) a firm requires a degree for a job that does not use the material; (d) a lender asks for a large down payment; (e) a car-sharing service charges a deductible for damage; (f) a restaurant posts its hygiene inspection grade.',
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'insurance-design-memo',
              title: 'Insurance design memo',
              prompt:
                'In about 400 words, explain to a state legislator why requiring insurers to cover pre-existing conditions, on its own, can lead to rising premiums and fewer insured healthy people, and evaluate two complementary policies (a mandate or penalty, subsidies, automatic enrolment). Use the lemons logic, and cite one dated fact about the US individual market from an official source.',
              kind: 'writing',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'Why can a used-car market unravel under asymmetric information?',
              answerOutline: 'Buyers pay only for average quality; owners of good cars, who value them above that, withdraw; average quality falls, prices fall, and only lemons remain.',
            },
            {
              question: 'What is the difference between adverse selection and moral hazard?',
              answerOutline: 'Adverse selection is hidden type before a deal (who chooses to trade); moral hazard is hidden action after a deal (behaviour changes because someone else bears the cost).',
            },
            {
              question: 'What makes a signal credible?',
              answerOutline: 'It must be cheaper for high-quality types than for low-quality types, so low types do not find it worth copying.',
            },
          ],
        },
      ],
      project: {
        slug: 'market-failure-diagnosis',
        title: 'Diagnose a market failure',
        description: `Pick one real problem in your city or state that involves a market failure: traffic congestion, groundwater depletion, a local air-quality problem, under-vaccination, a shortage of childcare or a used-goods market plagued by fraud. Identify which failure (externality, public good, common resource, market power or asymmetric information) is at work, estimate its size with whatever official data you can find, describe the current policy, and propose an improvement. Compare at least two policy tools with the diagrams from this module and say who would gain and who would lose.`,
        deliverables: [
          'A diagnosis with the relevant diagram and a sourced, dated estimate of the problem\'s size',
          'A comparison table of at least two policy tools: efficiency, distribution, administrative cost, political feasibility',
          'A 800 to 1,000 word recommendation with positive and normative parts clearly separated',
        ],
        estimatedHours: 3,
      },
    },
  ],
  capstone: {
    slug: 'market-analysis-with-real-data',
    title: 'A market and policy analysis with real data',
    description: `Choose one real US market where a policy question is live: gasoline (fuel taxes), cigarettes or sugary drinks (excise taxes), rental housing (rent stabilisation), eggs or another farm product (price shocks and trade), steel or washing machines (tariffs), or a local labour market (minimum wage). Build a complete, honest analysis that a policy maker could read.

1. **Describe the market** with official data: prices and quantities over at least ten years from FRED, BLS, EIA, USDA or the Census Bureau, with each series ID and download date.
2. **Explain past movements** with supply and demand: identify at least two episodes and the shifts behind them.
3. **Choose elasticities** from published studies (cite them) and calibrate linear demand and supply curves through a recent observed point.
4. **Analyse a policy** that is in force or proposed: compute its effects on prices, quantities, consumer and producer surplus, government revenue or cost, and deadweight loss, and show who bears it.
5. **Address market structure and failures**: is the market competitive? Are there externalities, information problems or market power that change the analysis?
6. **Review the evidence**: summarise at least two empirical studies of this or a similar policy and explain why their findings agree or differ.
7. **Report honestly**: show how your conclusions change if each elasticity is halved or doubled, and keep your normative recommendation in a separate, clearly labelled section.

You can do the calculations in a spreadsheet or in Python. The result should be something you could share: a short report with clear charts.`,
    deliverables: [
      'A data appendix: every series with its source, ID, units and download date',
      'Charts of price and quantity history with labelled episodes and supply-demand explanations',
      'The calibrated model: equations, elasticities and their sources',
      'Policy results: incidence, surplus changes, revenue or cost and deadweight loss, with a sensitivity table',
      'A literature section reviewing at least two studies',
      'A 2,500 to 3,500 word report with an executive summary and a separate normative recommendation',
    ],
    estimatedHours: 9,
    stretchGoals: [
      'Estimate an elasticity yourself from the data and compare it with published values, explaining why your simple estimate may be biased',
      'Turn the calibration and policy calculations into a small Python package with tests',
      'Add an interactive chart (for example with a notebook) that lets a reader change the elasticities',
    ],
  },
  masteryChecklist: [
    'I can compute opportunity costs from budgets, production possibilities and output tables, and identify comparative advantage',
    'I can solve a linear supply and demand model, including after shifts in either or both curves, and explain the result in words',
    'I can compute price, income, cross-price and supply elasticities and use them to predict revenue changes and tax incidence',
    'I can compute consumer surplus, producer surplus and deadweight loss for taxes, subsidies, price controls and tariffs',
    'I can derive points on a demand curve from marginal utility per dollar and decompose a price change into substitution and income effects',
    'I can build cost curves from a production function or cost function and explain why marginal cost cuts average cost at its minimum',
    'I can find the profit-maximising output and price for a competitive firm, a monopolist and a monopolistic competitor, and the long-run outcome under free entry',
    'I can find dominant strategies and Nash equilibria in a payoff matrix and explain why cartels are unstable and how repetition can sustain cooperation',
    'I can analyse externalities, public goods, common resources and asymmetric information, and compare Pigouvian taxes, cap and trade, regulation and other remedies',
    'I can summarise contested evidence, such as on minimum wages, rent control and tariffs, separating what the model predicts, what studies find and where economists disagree',
  ],
});
