import { defineSubject } from '../define';

export default defineSubject({
  id: 'startup-founding-and-funding',
  title: 'Building and Funding a Startup',
  category: 'misc',
  tagline:
    'How startups actually work: finding a real problem, forming the company, understanding every funding option and its mechanics, running a private company, and how it all ends, with honest odds.',
  description: `This course teaches how a startup is built, funded and run as a private company, from the first customer conversation to an acquisition, an IPO or an orderly shutdown. It assumes you have never worked in a startup or in finance, and it defines each term when it first appears. It works numeric examples for the mechanics founders most often get wrong: SAFEs, option pool shuffles, liquidation preferences, dilution across several rounds, vesting, the 83(b) deadline, and the fund economics that decide which companies a venture investor can back.

The course is deliberately sober. Most new businesses close, and most venture-backed founders receive nothing at exit. Venture capital suits a small fraction of companies. Bootstrapping, grants, loans and simply not starting are treated as real options. Where the evidence is an investor's opinion rather than a fact, the lesson says so, and where experienced people disagree, for example over how early to raise, you get both sides.

US law and practice are the default throughout, and rules vary by state and country. **This course is education, not legal, tax or investment advice.** Legal and tax statements are dated, are checked against primary sources where possible, and are stated as of 2 November 2026. They will change. Market figures such as round sizes go stale faster, so each is dated and the lessons show you how to look up current numbers. Lessons also say when to hire a lawyer or an accountant, which for a real company is early.

No programming is needed anywhere in the course. Everything is worked by hand, with a calculator or in a spreadsheet, and each lesson ends with a short multiple-choice quiz that checks the key idea or calculation. The module projects and the capstone are where you apply the material: a discovery and metrics workbook, a cap table workbook that reproduces the published worked examples in the Y Combinator SAFE User Guide, and a spreadsheet model and investor package for a clearly labelled fictional company. No real customers, money or company are needed.`,
  difficulty: 'beginner',
  estimatedHours: 70,
  prerequisites: [],
  recommendedBackground: [
    'Comfort with percentages and basic algebra',
    'Basic spreadsheet use (Excel, Google Sheets or LibreOffice Calc): formulas, copying a formula down a column and making a simple chart',
    'No programming, business, law or finance background is assumed',
  ],
  tags: ['startups', 'entrepreneurship', 'venture capital', 'fundraising', 'cap tables', 'equity', 'business'],
  core: false,
  modules: [
    {
      slug: 'startups-and-founders',
      title: 'Startups and Founders',
      description:
        'What separates a startup from a small business, what the base rates really are, how to choose co-founders, and when the right decision is not to start.',
      lessons: [
        {
          slug: 'what-makes-a-startup',
          title: 'What a startup is, and what it is not',
          summary:
            'A startup is defined by a search for a scalable business and a design for fast growth, not by youth or technology. Compare it honestly with the other ways to own a business.',
          estimatedMinutes: 80,
          objectives: [
            'Distinguish a startup from a small business by goal and design rather than by size or age',
            'Explain what a private company is and why its shares are hard to sell',
            'Define scalability and test whether a business has it',
            'Compute what a weekly growth rate compounds to over a year',
            'Choose between the main ownership paths for a business idea',
          ],
          concepts: [
            'Startup as a search for a business model',
            'Small business',
            'Private company',
            'Scalability',
            'Compounding growth',
            'Venture-backed versus bootstrapped',
            'Equity',
          ],
          explanation: `A **startup** is not simply a new company. Steve Blank defines it as a temporary organisation searching for a repeatable and scalable business model. Paul Graham defines it as a company designed to grow fast. Both are opinions about a useful definition rather than legal terms, because the law has no category called "startup". Both point at the same thing: you do not yet know who your customer is, what they will pay or how you will reach them, and you are organised to find out quickly.

A **small business**, such as a restaurant, an accounting practice or a plumbing firm, usually runs a known model. Its risk is execution. It can be an excellent life and a good living, and most US businesses are of this kind. Calling it "not a startup" is a description, not an insult.

**Scalability** means that revenue can grow much faster than costs. Software is the classic example because the next copy costs almost nothing. A consultancy is usually not scalable because revenue needs more people.

Growth compounds in a way intuition misses. Graham calls 5-7% a week a good rate during Y Combinator, 10% exceptional, and 1% a sign you have not worked out what you are doing. That is his benchmark, not a law.

| Weekly growth | Multiple after 52 weeks |
|---|---|
| 1% | 1.68x |
| 5% | 12.64x |
| 7% | 33.73x |
| 10% | 142.04x |

Nobody sustains these rates for long. The table explains why investors chase them.

**Equity** means ownership, usually in the form of shares. A **private company** is one whose shares are not traded on a public stock exchange. That matters more than it sounds: your shares may be valuable on paper but you generally cannot sell them, and you can be rich on a spreadsheet and unable to pay rent. This course covers what "private" means in practice in Module 8.

| Path | Who funds it | Founder's aim | Main risk |
|---|---|---|---|
| Small business | Owner, bank loan | Income, independence | Thin margins, personal debt |
| Bootstrapped growth company | Customers | Keep control and profits | Slower growth, can be out-competed |
| Venture-backed startup | Investors, in exchange for equity | A very large exit | Dilution, pressure to reach an outcome investors need |

A company can move between these. Read Graham's essay for the argument and note where it reflects his position as an investor, since a growth obsession is partly what his job requires.`,
          resources: [
            { title: 'Startup = Growth', url: 'https://paulgraham.com/growth.html', type: 'article', cost: 'free', provider: 'Paul Graham', note: 'The argument that growth defines a startup. Read it as one investor\'s framing.', primary: true },
            { title: "YC's essential startup advice", url: 'https://www.ycombinator.com/library/4D-yc-s-essential-startup-advice', type: 'article', cost: 'free', provider: 'Y Combinator', note: 'A short list of the advice YC repeats most. Treat it as a view from one accelerator.' },
            { title: 'New Enterprises (15.390)', url: 'https://ocw.mit.edu/courses/15-390-new-enterprises-spring-2013/', type: 'course', cost: 'free', provider: 'MIT OpenCourseWare', note: 'A full university course to dip into alongside this one.' },
          ],
          exercises: [
            {
              slug: 'classify-five-businesses',
              title: 'Classify five businesses',
              prompt:
                'Pick five real businesses near you or that you use, including at least one local shop and one software company. For each, say whether it is better described as a small business, a bootstrapped growth company or a venture-backed startup. State what evidence you used, how revenue relates to headcount, and what would have to change for it to scale. Write about 60 words each.',
              kind: 'writing',
              difficulty: 1,
            },
            {
              slug: 'compound-growth',
              title: 'Compound a growth rate',
              prompt:
                'A product has USD 2,000 in weekly revenue. Compute weekly revenue after 26 and after 52 weeks at 2%, 5% and 8% weekly growth. Then find the weekly rate that turns USD 2,000 into USD 100,000 in exactly 52 weeks. Use a spreadsheet or a calculator with a power key, and show the formula.',
              kind: 'problem',
              difficulty: 1,
              hint: 'The rate g satisfies (1 + g) to the power 52 equals 50.',
            },
            {
              slug: 'scalability-test',
              title: 'Test scalability',
              prompt:
                'Take an idea you have. List the costs that rise with each extra customer and the costs that do not. Estimate the cost of serving customer number 10 and customer number 10,000. In 150 words, say whether revenue can outrun costs and which assumption is weakest.',
              kind: 'writing',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Is a two-year-old mobile app with one founder and modest income necessarily a startup?',
              answerOutline:
                'No. Age and technology do not decide it. It depends on whether it is searching for a scalable model and designed for fast growth. It may be a healthy small business.',
            },
            {
              question: 'Why can a founder be wealthy on paper and short of cash?',
              answerOutline:
                'Private company shares have no public market, and transfer is usually restricted, so a paper valuation cannot easily be turned into cash.',
            },
            {
              question: 'Why should you be careful with benchmarks such as 5-7% weekly growth?',
              answerOutline:
                'It is one investor\'s rule of thumb for early companies in an accelerator. It is not a law, it does not persist for long, and an investor\'s incentives favour growth.',
            },
          ],
          quiz: [
            {
              question: 'Weekly revenue is USD 1,000 and grows 5% every week for 52 weeks. Roughly what is weekly revenue at the end?',
              options: ['USD 2,600', 'USD 3,600', 'USD 12,640', 'USD 142,040'],
              answer: 2,
              explanation:
                'Growth compounds: $1{,}000 \\times 1.05^{52} \\approx 1{,}000 \\times 12.64$. USD 3,600 is the tempting mistake of adding 5% of the *starting* figure each week (USD 50 a week for 52 weeks), which ignores that each week grows from a bigger base. USD 142,040 is the 10% row of the table.',
            },
            {
              question: 'Which business is most clearly **scalable** in the lesson\'s sense?',
              options: [
                'A consultancy that wins more work every time it hires another consultant',
                'A software tool where serving the next customer costs almost nothing',
                'A popular restaurant that opens a second site with its own staff',
                'A two-year-old app with one founder and a modest, steady income',
              ],
              answer: 1,
              explanation:
                'Scalability means revenue can grow much faster than costs. Extra software copies cost almost nothing to deliver. The consultancy and the restaurant are good businesses, but their revenue needs more people or more sites, so costs rise with it. The app\'s age and size say nothing about whether its costs scale.',
            },
          ],
        },
        {
          slug: 'base-rates-and-risk',
          title: 'Base rates: survival, payoffs and what founders earn',
          summary:
            'What the data says about how often businesses survive, how venture-backed outcomes are distributed and how old successful founders are, including how each number can mislead.',
          estimatedMinutes: 100,
          objectives: [
            'Quote official survival rates for new US establishments and say what they do not measure',
            'Explain why average founder payoffs are misleading in a skewed distribution',
            'Describe the share of venture financings that lose money and where returns come from',
            'Recognise survivorship bias in founder stories',
            'Estimate the salary you give up and the payoff needed to justify it',
          ],
          concepts: [
            'Base rate',
            'Establishment survival rate',
            'Skewed distribution',
            'Mean versus median outcome',
            'Survivorship bias',
            'Opportunity cost',
            'Graduation rate between rounds',
          ],
          explanation: `A **base rate** is how often something happens across everyone who tries. It is the honest starting point before you argue why you are different.

**Survival of new establishments.** The US Bureau of Labor Statistics (BLS) publishes survival by opening year. Of private establishments opened in March 2015, 79.6% were still open a year later, 50.2% after five years and 34.6% after ten. The March 2019 group stood at 42.9% after seven years. The pattern has barely moved in thirty years: the 1994 group was 79.6%, 49.6% and 33.6%. Note the limits. An establishment is a place of business, not a startup, and closing is not always failure.

**Venture-backed founders.** Hall and Woodward (American Economic Review, 2010) estimated that almost three quarters of venture-backed entrepreneurs receive nothing at exit, while a few receive over a billion dollars. Their published abstract gives an average of USD 5.8 million, but that average is dragged up by a handful of outcomes, so it says little about a typical founder. When a distribution is this **skewed**, the median is near zero and the mean is not a promise.

**Investors' outcomes tell the same story.** Kerr, Nanda and Rhodes-Kropf (Journal of Economic Perspectives, 2014) report that about 55% of venture-funded startups in their 1985-2009 sample ended at a loss, and that the 6% returning over five times accounted for about half of gross returns. A Correlation Ventures dataset of over 21,000 financings, as reported by investor Seth Levine in 2014, put about 65% below 1x.

**Getting to the next round is not automatic.** Carta, which runs cap table software, reported that 30.6% of startups raising a seed round in Q1 2018 reached a Series A within two years, against 15.4% for Q1 2022. Carta sees only its own customers.

**Age.** Azoulay, Jones, Kim and Miranda (2020) found a mean founder age of 41.9 across US new firms with employees, and 45.0 for the fastest-growing 0.1%. The young-dropout story is memorable, not typical.

**Survivorship bias** is learning only from those who made it. Failed founders rarely give keynote talks.

**Opportunity cost** is what you give up. If you take USD 90,000 a year less than a job would pay for five years, you give up USD 450,000 before investment returns. If you have a 27% chance of any payoff at all, your payoff in those cases must average about USD 1.67 million just to match the salary, before counting risk. That simple division ignores your skills, what you learn and how much you value independence, all of which are real. It is a floor on the conversation, not a verdict.`,
          resources: [
            { title: 'BLS Business Employment Dynamics, Table 7: survival of private sector establishments by opening year', url: 'https://www.bls.gov/bdm/us_age_naics_00_table7.txt', type: 'dataset', cost: 'free', provider: 'US Bureau of Labor Statistics', note: 'The figures above are from the table with data through March 2026. BLS blocks automated downloads, so open it in a browser.', primary: true },
            { title: 'The Burden of the Nondiversifiable Risk of Entrepreneurship', url: 'https://www.nber.org/papers/w14219', type: 'article', cost: 'free', provider: 'Hall and Woodward, NBER', note: 'Read the introduction and the section on the distribution of exit values.' },
            { title: 'Entrepreneurship as Experimentation', url: 'https://www.nber.org/papers/w20358', type: 'article', cost: 'free', provider: 'Kerr, Nanda and Rhodes-Kropf, NBER', note: 'Explains why even skilled investors cannot pick winners in advance.' },
            { title: 'Age and High-Growth Entrepreneurship', url: 'https://www.nber.org/papers/w24489', type: 'article', cost: 'free', provider: 'Azoulay, Jones, Kim and Miranda, NBER' },
          ],
          exercises: [
            {
              slug: 'read-the-bls-table',
              title: 'Read the survival table yourself',
              prompt:
                'Open BLS Table 7. Record 1-year, 5-year and 10-year survival for the March 1995, 2005 and 2014 opening years. Compute how many of 1,000 openings would close during years 2 to 5. State one reason the table overstates failure and one reason it understates how hard a venture-scale outcome is.',
              kind: 'data-analysis',
              difficulty: 1,
            },
            {
              slug: 'skew-simulation',
              title: 'Mean versus median in a skewed payoff',
              prompt:
                'Imagine 100 founders with this payoff: 73 receive USD 0, 20 receive USD 500,000, 6 receive USD 5 million and 1 receives USD 100 million. By hand or in a spreadsheet with one row per founder, compute the mean, the median and the share of the total payoff that goes to the top founder. Explain in three sentences why the mean is a poor description of a typical founder. These numbers are made up to illustrate shape, so do not present them as data.',
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'your-opportunity-cost',
              title: 'Your own opportunity cost',
              prompt:
                'Estimate the salary you would earn in the next five years, your likely founder salary, and the difference. Using a chance of any payoff that you can defend, compute the average payoff you would need to match the salary alone. List three non-financial benefits and three non-financial costs. Say what would change your conclusion.',
              kind: 'writing',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What does a 50% five-year survival rate for establishments tell you about your startup?',
              answerOutline:
                'It is a broad base rate for all kinds of private establishments, not startups. It does not separate success from closure by choice. It says nothing about reaching a large outcome, which is far rarer.',
            },
            {
              question: 'Why is an average founder payoff of millions of dollars compatible with most founders getting nothing?',
              answerOutline:
                'The distribution is highly skewed. A few huge outcomes raise the mean, while the median is zero.',
            },
            {
              question: 'What is survivorship bias, and how would you correct for it when reading a founder memoir?',
              answerOutline:
                'Drawing lessons only from those who succeeded. Ask how many others did the same things and failed, and look for data on the whole group.',
            },
            {
              question: 'Name two limits of Carta\'s seed-to-Series A figures.',
              answerOutline:
                'It covers only companies on Carta, not all startups. Reaching Series A is one path, so not graduating does not always mean failure. Recent cohorts have had less time.',
            },
          ],
          quiz: [
            {
              question: 'Using the BLS figures for the March 2015 opening year (79.6% open after 1 year, 50.2% after 5), how many of 1,000 openings closed during years 2 to 5?',
              options: ['204', '294', '498', '502'],
              answer: 1,
              explanation:
                'After one year 796 were open; after five, 502. So $796 - 502 = 294$ closed in years 2 to 5. 498 is everyone who closed within five years, including the 204 that closed in the first year, and 502 is the number still open.',
            },
            {
              question: 'In a made-up group of founders, 70% receive USD 0, 25% receive USD 1 million and 5% receive USD 40 million. What are the mean and the median payoff?',
              options: [
                'Mean USD 2.25 million, median USD 0',
                'Mean USD 2.25 million, median USD 1 million',
                'Mean USD 13.67 million, median USD 1 million',
                'Mean USD 0, median USD 0',
              ],
              answer: 0,
              explanation:
                'Mean: $0.25 \\times 1 + 0.05 \\times 40 = 2.25$ million. Median: line the founders up by payoff, and the middle one is among the 70% who got nothing. The tempting USD 1 million median takes the middle of the three *outcomes*, not the middle *founder*. USD 13.67 million averages the three outcomes as if each were equally likely.',
            },
          ],
        },
        {
          slug: 'choosing-cofounders',
          title: 'Choosing co-founders and dividing the company',
          summary:
            'Whether to have a co-founder, how to choose one, the conversations to have first, and what the evidence says about splitting equity.',
          estimatedMinutes: 90,
          objectives: [
            'Weigh the case for and against a co-founder using both opinion and evidence',
            'Run a structured co-founder conversation before starting',
            'Explain the trade-offs of equal and unequal equity splits',
            'Show why vesting protects the founders who stay',
            'Identify warning signs in a founding relationship',
          ],
          concepts: [
            'Co-founder',
            'Complementary skills',
            'Equity split',
            'Dead equity',
            'Vesting as founder protection',
            'Founder agreement',
            'Solo founder',
          ],
          explanation: `A **co-founder** is someone who starts the company with you and shares its ownership and its risk. Choosing one is closer to choosing a business marriage than to hiring, and it is much harder to undo.

**Do you need one?** Paul Graham lists having a single founder first among his 18 mistakes that kill startups, arguing that a startup is too hard for one person and that no co-founder is a vote of no confidence. That is an investor's opinion from observing his portfolio. The evidence is not one-sided. Greenberg and Mollick studied ventures funded through Kickstarter and found that solo-founded ventures survived longer than teams and did not earn less, though the sample is crowdfunded companies, not venture-backed ones. The honest reading is that a co-founder adds skills and stamina and adds a serious source of conflict. A bad co-founder is worse than none.

**What to look for.** Someone you have worked with under stress, with complementary skills, the same appetite for risk and honest agreement on what you want. Prefer history over chemistry. If you do not have that history, do a real project together first.

**Talk before you commit.** Discuss each person's role and who decides what, time commitment, how much money each can go without and for how long, what happens if someone leaves, and what outcome each person wants. A founder who would happily sell for USD 10 million and one who wants to build for fifteen years have a real disagreement. Better to find it now.

**Splitting equity.** Hellmann and Wasserman (Management Science, 2017) studied 1,476 founders in 511 ventures. Roughly a third of teams split equally, and equal splitting was associated with lower valuations in first financing rounds. That is a correlation: teams that split equally may differ in other ways, such as how much they negotiated. YC's Michael Seibel argues the opposite for practice, that equal or nearly equal should be the default because all the work is ahead of you, and Sam Altman's Startup Playbook says nearly equal is best. These positions pull apart, so decide deliberately. Discuss contributions openly, weight future work more than past ideas, write the split down, and be wary of a split that leaves anyone resentful.

**Vesting protects you.** Suppose two founders split 50/50 with no vesting and one leaves after nine months. That person keeps half the company forever and contributes nothing. This is **dead equity**, and it can make the company impossible to fund. With a standard vesting schedule, explained in Module 5, the departing founder would keep nothing or a fair share. Founders sometimes resist vesting as a sign of mistrust, but it is the mechanism that lets you trust each other.`,
          resources: [
            { title: 'The 18 Mistakes That Kill Startups', url: 'https://paulgraham.com/startupmistakes.html', type: 'article', cost: 'free', provider: 'Paul Graham', note: 'Read mistake 1 on single founders, then compare with the study below.', primary: true },
            { title: 'The First Deal: The Division of Founder Equity in New Ventures', url: 'https://www.nber.org/papers/w16922', type: 'article', cost: 'free', provider: 'Hellmann and Wasserman, NBER', note: 'The working paper version. Read the abstract and the results on equal splits.' },
            { title: 'How to split equity among co-founders', url: 'https://www.ycombinator.com/library/5x-how-to-split-equity-among-co-founders', type: 'article', cost: 'free', provider: 'Y Combinator', note: 'The case for equal splits, from an investor. Read it against the study above.' },
            { title: "Founder's Stock, Vesting and Founder Departures", url: 'https://www.cooleygo.com/founder-basics-founders-stock/', type: 'article', cost: 'free', provider: 'Cooley GO', note: 'A law firm\'s plain explanation of how founder stock and departures work.' },
            { title: 'YC Co-Founder Matching', url: 'https://www.ycombinator.com/cofounder-matching', type: 'tool', cost: 'free', provider: 'Y Combinator', note: 'One way to meet people. Run a trial project before committing to anyone you meet here.' },
          ],
          exercises: [
            {
              slug: 'cofounder-questionnaire',
              title: 'Write your co-founder questionnaire',
              prompt:
                'Write 15 questions to answer honestly with a potential co-founder, covering roles, decisions, money, time, risk, departure and exit goals. For each, write what a dealbreaker answer would look like. If you can, have the conversation with someone you would consider and note where you disagreed.',
              kind: 'writing',
              difficulty: 1,
            },
            {
              slug: 'split-the-equity',
              title: 'Argue two equity splits',
              prompt:
                'Alice wrote the prototype over a year. Ben joins now to run sales and will take no salary for 12 months. Chidi joins in three months after his current job ends, and invests USD 30,000 for shares on the same terms as outside investors. Propose a split and vesting plan, then write the strongest objection each person would raise. Say how the investment should be treated separately from founder equity.',
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'dead-equity-cost',
              title: 'Price dead equity',
              prompt:
                'Two founders hold 5,000,000 shares each with no vesting. One leaves after a year. A new CTO must receive 10% of the company, and the investors require the active team to hold at least 60%. Compute the active team\'s stake if the CTO\'s shares are newly issued. Then show how much would have been recovered with a four-year vesting schedule. State your assumptions.',
              kind: 'problem',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Is "you need a co-founder" a fact?',
              answerOutline:
                'No. It is an opinion from investors. Evidence is mixed: a study of crowdfunded firms found solo ventures survived longer. The answer depends on the skills needed and on who the co-founder is.',
            },
            {
              question: 'What does the Hellmann and Wasserman finding about equal splits show, and what does it not show?',
              answerOutline:
                'Equal splits are associated with lower first-round valuations. It does not prove that equal splits cause them, because teams that split equally may differ in other ways.',
            },
            {
              question: 'What is dead equity, and how do you prevent it?',
              answerOutline:
                'Ownership held by someone no longer contributing, which burdens those who remain and deters investors. Vesting from day one with a repurchase right prevents it.',
            },
          ],
          quiz: [
            {
              question: 'Two founders split 50/50 with **no vesting**. One leaves after nine months to take a job. What is the main problem the remaining founder now faces?',
              options: [
                'The company must buy back the departing founder\'s shares at their market value',
                'The departing founder\'s shares are cancelled automatically, so nothing changes',
                'The remaining founder\'s shares double to keep the split fair',
                'The departing founder keeps half the company for good while contributing nothing, which can make the company hard to fund',
              ],
              answer: 3,
              explanation:
                'Without vesting there is no repurchase right, so the shares are simply hers. That is dead equity: half the company is held by someone no longer working on it, and investors may refuse to fund the business. A buy-back at market value is not automatic, and nothing cancels the shares. Vesting from day one is the fix.',
            },
          ],
        },
        {
          slug: 'when-not-to-start',
          title: 'Why people start companies, and when not to',
          summary:
            'Honest motives, the personal costs, a runway calculation for your own life, and the better alternatives that a would-be founder should actually consider.',
          estimatedMinutes: 80,
          objectives: [
            'State your own motive and test whether a startup is the best way to satisfy it',
            'Compute a personal runway from savings and spending',
            'List situations in which you should wait or not start',
            'Check employment obligations that could give an employer rights in your idea',
            'Compare founding with joining an early startup or buying a small business',
          ],
          concepts: [
            'Founder motivation',
            'Personal runway',
            'Employer IP claims',
            'Non-compete',
            'Personal guarantee',
            'Early employee alternative',
            'Rich versus king trade-off',
          ],
          explanation: `Most people who consider founding should not start right now, and some should not start at all. That is not discouragement. Choosing well is the point of this lesson.

**Know why you want this.** Wanting money, freedom, status or a problem solved lead to different decisions. Noam Wasserman frames a real tension as "rich or king": founders who keep control tend to give up financial upside, and those who take outside capital tend to give up control. If you want freedom, a venture-backed company may disappoint, because you will have a board, investors and a growth target. If you want wealth, a good job with a stock plan has a better expected outcome for most people, as the base rates in the previous lesson suggest.

**Reasons to wait or not start:**

- You have no real problem you care about, only a wish to be a founder. Graham's essay "Before the Startup" argues you should not want to "start a startup" in the abstract.
- You need a stable income, for instance for dependants or medical cover, and have no cushion.
- Your immigration status ties you to an employer. Get specialist advice first.
- You would have to borrow against your home or sign a **personal guarantee**, a promise that makes you personally liable for a business debt.
- Your health or relationships cannot take several hard years. Marc Andreessen's "Why not to do a startup" is a useful, unsentimental list.

**Compute your personal runway.** Your personal runway is how long you can live with no income. If you spend USD 5,000 a month and want 18 months, you need USD 90,000, plus a buffer, say USD 15,000, for a total of USD 105,000. Founders usually underestimate this, and early salaries are low.

**Check your current job.** Before writing a line of code, read your employment agreement. Many assign to your employer inventions made during employment, sometimes broadly. California Labor Code section 2870 limits this for work done on your own time without employer resources, unless it relates to the employer's business, and other states differ. Some agreements include a **non-compete**, a promise not to work for a competitor, whose enforceability varies by state. Do not use your employer's laptop, time or confidential information. A lawyer's hour here is cheap insurance, because investors check this in due diligence.

**Good alternatives.** Join a startup as an early employee, which teaches much of the job with a salary. Start part-time where your agreement allows. Buy a profitable small business, a real and growing path. Consulting can fund a later product. Paul Graham's "Why to Not Not Start a Startup" argues the other side: that many fears are overstated, especially for young people with little to lose. Read both and decide for your own situation, not for the median one.`,
          resources: [
            { title: 'Why not to do a startup', url: 'https://pmarchive.com/guide_to_startups_part1.html', type: 'article', cost: 'free', provider: 'Marc Andreessen', note: 'A blunt list of the costs from a founder turned investor.', primary: true },
            { title: 'Why to Not Not Start a Startup', url: 'https://paulgraham.com/notnot.html', type: 'article', cost: 'free', provider: 'Paul Graham', note: 'The opposing case. Note who it is addressed to.' },
            { title: 'Before the Startup', url: 'https://paulgraham.com/before.html', type: 'article', cost: 'free', provider: 'Paul Graham', note: 'Why wanting to be a founder is the wrong starting point.' },
            { title: 'The Holloway Guide to Equity Compensation', url: 'https://www.holloway.com/g/equity-compensation', type: 'textbook', cost: 'freemium', provider: 'Holloway', note: 'Useful if you are comparing founding with joining a startup. Some parts are paid.' },
          ],
          exercises: [
            {
              slug: 'motive-audit',
              title: 'Audit your motive',
              prompt:
                'Write down why you want to start something, in one sentence. For each of money, freedom, status and solving a specific problem, rate its importance from 1 to 5, and name a path other than a venture-backed startup that would serve it. Say which path would serve your top two motives best.',
              kind: 'writing',
              difficulty: 1,
            },
            {
              slug: 'personal-runway',
              title: 'Compute your personal runway',
              prompt:
                'List your real monthly costs, savings you could spend, debts and any partner income. Compute months of runway at zero salary and at a USD 3,000 monthly salary. Add a 25% buffer. State the month in which you would stop and get a job, and write it down before you start. If you would rather not use real numbers, make up a plausible household.',
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'read-an-employment-agreement',
              title: 'Read an invention assignment clause',
              prompt:
                'Find an employment agreement you have signed, or a public template. Locate any invention assignment, confidentiality, non-compete and non-solicitation clauses. For each, explain in your own words what you agreed and which side project it might touch. List three questions you would ask a lawyer. Do not treat your own reading as legal advice.',
              kind: 'reading',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Give three circumstances where the right decision is to wait.',
              answerOutline:
                'Examples: no specific problem, no financial cushion, dependants needing stable income, immigration tied to an employer, health limits, needing a personal guarantee or home loan to fund it.',
            },
            {
              question: 'What is the risk of building your idea on an employer\'s laptop?',
              answerOutline:
                'The employer may claim ownership under its invention assignment or use of its resources, which can taint the IP and stop investors. Rules vary by state, and California section 2870 gives some protection, which using employer resources can remove.',
            },
            {
              question: 'What is the rich versus king trade-off?',
              answerOutline:
                'Wasserman\'s observation that founders tend to trade control for financial upside. Outside capital tends to increase value but reduce control, and keeping control tends to limit value.',
            },
          ],
          quiz: [
            {
              question: 'You spend USD 4,500 a month, want 18 months with no salary, and add a 20% buffer on top. How much personal savings do you need?',
              options: ['USD 81,000', 'USD 85,500', 'USD 97,200', 'USD 64,800'],
              answer: 2,
              explanation:
                '$4{,}500 \\times 18 = 81{,}000$, and a 20% buffer makes $81{,}000 \\times 1.2 = 97{,}200$. USD 81,000 forgets the buffer, which is exactly the underestimate the lesson warns about. USD 64,800 takes 20% off instead of adding it.',
            },
            {
              question: 'In California you build an app on your own time and your own laptop, but it is closely related to your employer\'s business. Does Labor Code section 2870 clearly protect your ownership?',
              options: [
                'No: the protection has an exception for inventions that relate to the employer\'s business, so read your agreement and take legal advice',
                'Yes: anything built on your own time and equipment is always yours in California',
                'Yes, as long as you do not tell your employer about it',
                'No: in California every invention made during employment belongs to the employer',
              ],
              answer: 0,
              explanation:
                'Section 2870 limits invention assignment for work done on your own time without employer resources, *unless* it relates to the employer\'s business. Own time and own laptop help, but they are not the whole test. The rule is a limit on employers, not a blanket grant to them, and secrecy changes nothing. Other states differ.',
            },
          ],
        },
      ],
    },
    {
      slug: 'finding-a-problem',
      title: 'Finding a Problem Worth Solving',
      description:
        'Where good startup ideas come from, how to learn the truth from customers without fooling yourself, and how to size a market and map the competition honestly.',
      lessons: [
        {
          slug: 'where-good-ideas-come-from',
          title: 'Where good ideas come from',
          summary:
            'Why noticing beats brainstorming, what makes a problem worth solving, and how to screen ideas before spending months on them.',
          estimatedMinutes: 80,
          objectives: [
            'Tell an organic idea from a made-up one',
            'Score a problem on frequency, intensity, willingness to pay and reachability',
            'Explain schlep blindness and why unpleasant problems can be good ones',
            'State why an idea can work now and could not have earlier',
            'Recognise the limits of idea advice that comes from software investors',
          ],
          concepts: [
            'Organic versus made-up ideas',
            'Founder-market fit',
            'Why now',
            'Schlep blindness',
            'Tarpit ideas',
            'Problem intensity',
            'Narrow but deep demand',
          ],
          explanation: `Most advice on ideas boils down to this: look for a problem, not an idea. Paul Graham's essay "How to Get Startup Ideas" says the way to find them is to notice rather than to think up. He calls ideas that grow from a founder's own experience **organic**, and warns against **made-up** or "sitcom" ideas, which sound plausible but nobody badly wants. The opinion comes from watching thousands of YC applicants. Remember that YC sees mostly software companies, and that a research breakthrough or a regulated industry finds ideas differently.

**A way of screening a problem.** Score each from 1 to 5 and look for high scores on all four:

- **Frequency:** how often does it occur?
- **Intensity:** how much does it hurt when it does?
- **Willingness to pay:** do people already spend money or time on it?
- **Reachability:** can you find and talk to these people?

Graham's image is a well: you want a small number of people who want something a lot, rather than many people who mildly like it. Demand that is narrow but deep can be widened later. Broad and shallow demand rarely deepens.

**Schlep blindness.** Graham's term for how people avoid seeing problems that look tedious, such as payments, compliance or insurance. Unpleasant work keeps competitors away, so it can be an advantage. Investors also warn of **tarpit ideas**, a YC phrase for appealing ideas that many people try and that fail for structural reasons nobody can see at first, such as a social app for sharing plans. Search for who tried before you and why they stopped. That research costs an afternoon.

**Why now?** A good idea often becomes possible because something changed: a new technology, a law, a cost curve or a behaviour. If you cannot say why this works now and not five years ago, ask why nobody has done it already.

**Founder-market fit** is the idea that you have an unusual reason to succeed here: domain experience, access to customers or a technical insight. It is a common investor preference, and it is also a practical point, since you may spend a decade on this problem.

Graham also argues that the best ideas seem bad at first, because obviously good ideas would already be taken. His essay "Black Swan Farming" notes that two companies, Airbnb and Dropbox, accounted for about three quarters of the value of the companies YC had funded at the time. Take that seriously and also notice the trap: most ideas that seem bad at first simply are bad. Looking strange is not evidence of being right, so the next lesson shows you how to gather evidence.`,
          resources: [
            { title: 'How to Get Startup Ideas', url: 'https://paulgraham.com/startupideas.html', type: 'article', cost: 'free', provider: 'Paul Graham', note: 'Read all of it. Mark what is evidence and what is his judgement.', primary: true },
            { title: 'Schlep Blindness', url: 'https://paulgraham.com/schlep.html', type: 'article', cost: 'free', provider: 'Paul Graham' },
            { title: 'How to get startup ideas (talk)', url: 'https://www.ycombinator.com/library/8g-how-to-get-startup-ideas', type: 'video', cost: 'free', provider: 'Y Combinator', note: 'A short talk with common idea mistakes.' },
            { title: 'YC guide to business models', url: 'https://www.ycombinator.com/library/Gh-yc-guide-to-business-models', type: 'article', cost: 'free', provider: 'Y Combinator', note: 'Use it to ask how each idea would actually make money.' },
          ],
          exercises: [
            {
              slug: 'problem-journal',
              title: 'Keep a problem journal',
              prompt:
                'For one week, record every time you or someone you work with is annoyed, wastes time or pays for a clumsy workaround. Aim for 20 entries with who, what, how often, and what they do now. Choose the top three by the four-factor score and explain each score in a sentence.',
              kind: 'writing',
              difficulty: 1,
            },
            {
              slug: 'tarpit-search',
              title: 'Search for the graveyard',
              prompt:
                'Pick one idea. Find at least three companies that tried something similar, including at least one that shut down. Use search, Crunchbase\'s free pages, founders\' post-mortems or app store history. Say what happened and whether the cause still applies. If you find no predecessor at all, write what that might mean.',
              kind: 'reading',
              difficulty: 2,
            },
            {
              slug: 'why-now',
              title: 'Write the why-now paragraph',
              prompt:
                'For your best idea, write 120 words on what changed recently to make it possible. Cite a dated source for the change. Then write 80 words on why you are unusually placed to do it. If either is hard to write, say what that tells you.',
              kind: 'writing',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What is the difference between a made-up idea and an organic one?',
              answerOutline:
                'A made-up idea is reasoned towards and sounds plausible but lacks people who badly want it. An organic idea grows from a founder\'s own experience of a real problem.',
            },
            {
              question: 'Why can a tedious problem be attractive?',
              answerOutline:
                'People avoid seeing or working on unpleasant problems, so there is less competition and real pain to relieve.',
            },
            {
              question: 'Why should you be careful with "the best ideas seem bad at first"?',
              answerOutline:
                'It suffers from selection: many bad-looking ideas are simply bad. Strangeness is not evidence, so you still need demand evidence.',
            },
          ],
          quiz: [
            {
              question: 'Which is the best sign that an idea is **organic** rather than made up?',
              options: [
                'Friends you described it to said they would definitely use it',
                'An industry report says the market is worth USD 50 billion',
                'It seems like a bad idea to most people you mention it to',
                'You hit the problem every month at work, and your colleagues already pay for a clumsy workaround',
              ],
              answer: 3,
              explanation:
                'An organic idea grows out of a real problem you have seen first-hand, and an existing paid workaround shows the pain is real and people spend on it. Friends\' enthusiasm is politeness, a top-down market figure says nothing about who wants this, and "seems bad at first" is not evidence, because most bad-seeming ideas are just bad.',
            },
          ],
        },
        {
          slug: 'customer-interviews-and-validation',
          title: 'Customer interviews and validation',
          summary:
            'How to learn the truth from people who want to be nice to you, and how to get evidence stronger than opinions, without deceiving anyone.',
          estimatedMinutes: 110,
          objectives: [
            'Run a discovery interview that asks about past behaviour rather than opinions',
            'Avoid compliments, hypotheticals and pitching in interviews',
            'Rank evidence from weak to strong, from compliments to payment',
            'Tag interview notes so the evidence can be counted',
            'Design an honest demand test and state what would invalidate your idea',
          ],
          concepts: [
            'Discovery interview',
            'Past behaviour over hypotheticals',
            'Compliments as noise',
            'Workaround',
            'Commitment and evidence ladder',
            'Letter of intent',
            'Smoke test',
            'Riskiest assumption',
          ],
          explanation: `People are polite. If you ask "Would you use this?", many will say yes and never buy. The job in a **discovery interview** is to learn about their life, not to test your idea. Rob Fitzpatrick's book The Mom Test gives the standard rule: ask questions that even your mother could not lie about, because they are about facts in her past, not opinions about your future.

| Weak question | Better question |
|---|---|
| Would you pay for this? | What did you spend last time this came up? |
| Do you think this is a good idea? | Tell me about the last time this happened. |
| How much would you pay? | What do you use now, and what does it cost? |
| Would this save you time? | How long did that take last week? |

Do not pitch. Talk less than a third of the time, take notes on what they actually said, and ask what they did next. A strong sign is a **workaround**: a spreadsheet, a part-time hire, a duct-taped tool. If someone has built a workaround, the pain is real. If they have done nothing, the problem may not matter much.

**Sort your evidence.** Compliments ("love it!") and hypotheticals ("I'd definitely buy") count for nothing, however nice they feel. Strength rises with what the person gives up:

1. Described a real pain from a specific past event.
2. Built or uses a workaround.
3. Already spends money or staff time on it.
4. Makes a **commitment**: gives you time, an introduction, a signed **letter of intent** (a written statement of intent to buy, usually not binding), a paid pilot or a deposit.

Tag your notes this way so you can count them, which is easy in a spreadsheet with one row per interview and one column per tag, as the Module 3 project asks you to do. Stop when you keep hearing the same things, often after 10 to 20 conversations within one segment, but there is no magic number. Interviews tell you what people did and why. They do not prove demand at scale.

**Test demand honestly.** A **smoke test** is a page describing a product so you can measure interest. It is reasonable if you make clear that the product is coming, for example with a waitlist. Do not take money for something that does not exist without saying so and offering a refund, and do not fake traction. The line between testing and deceiving is easy to see if you ask whether the customer would feel misled on learning the facts.

**State your riskiest assumption.** Write down the belief which, if wrong, kills the idea, and how you would know: "Clinic managers will pay USD 200 a month; at least 3 of 15 will agree to a paid pilot." Setting the threshold before you test stops you moving the goalposts.`,
          resources: [
            { title: 'How to talk to users', url: 'https://www.ycombinator.com/library/Iq-how-to-talk-to-users', type: 'video', cost: 'free', provider: 'Y Combinator', note: 'How to run the interview and read what you hear.', primary: true },
            { title: 'The Lean Startup: principles', url: 'https://theleanstartup.com/principles', type: 'article', cost: 'free', provider: 'Eric Ries', note: 'Validated learning in brief.' },
            { title: 'Do Things that Don\'t Scale', url: 'https://paulgraham.com/ds.html', type: 'article', cost: 'free', provider: 'Paul Graham', note: 'Why going to users yourself is normal at this stage.' },
          ],
          exercises: [
            {
              slug: 'rewrite-bad-questions',
              title: 'Rewrite bad questions',
              prompt:
                'Rewrite these so they ask about past behaviour: "Would you use an app that tracks your invoices?", "How much would you pay per month?", "Is expense reporting a pain?", "Would your team adopt this?", "Do you like the design?". For each, write the follow-up you would ask if they say "yes, it\'s a big problem".',
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'five-real-interviews',
              title: 'Run five interviews',
              prompt:
                'Interview five people who might have a problem you have chosen, for 20 minutes each, without describing your solution. Keep notes tagged [pain], [workaround], [spent], [commitment], [compliment] and [hypothetical]. Count each tag per problem. Write what you believed before, and what changed. Get permission before recording, since consent rules vary by state.',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'honest-demand-test',
              title: 'Design an honest demand test',
              prompt:
                'Write a one-page test plan: the riskiest assumption, the audience, the channel, the budget (zero is fine), the pass threshold set in advance, and the exact wording on any page. Explain why the wording could not mislead a visitor. State what you will do on pass and on fail.',
              kind: 'writing',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why is "Would you pay for this?" a poor question?',
              answerOutline:
                'It is hypothetical and invites politeness. Past behaviour is better evidence: what they did and spent the last time.',
            },
            {
              question: 'Rank these from weakest to strongest: a paid pilot, a compliment, an existing spreadsheet workaround, a promise to buy later.',
              answerOutline:
                'Compliment and promise to buy later are weakest. The workaround shows real pain. A paid pilot is strongest because it costs them something.',
            },
            {
              question: 'What makes a smoke test deceptive rather than honest?',
              answerOutline:
                'If it leads people to believe a product exists or takes money without disclosure. An honest test says it is coming or offers a waitlist, and any money is clearly refundable.',
            },
          ],
          quiz: [
            {
              question: 'After a week of interviews with clinic managers, which result is the **strongest** evidence of demand?',
              options: [
                'Ten managers said they would definitely buy it at USD 50 a month',
                'One manager signed a non-binding letter of intent to buy',
                'One manager paid a USD 500 deposit for a paid pilot',
                'One manager described last week\'s billing mess in vivid detail',
              ],
              answer: 2,
              explanation:
                'Evidence gets stronger with what the person gives up, and a deposit costs real money. A letter of intent is a commitment too, but it is usually not binding. A vivid past pain is useful (step 1 of the ladder), while "I would definitely buy" is a hypothetical and counts for nothing however many people say it.',
            },
          ],
        },
        {
          slug: 'market-sizing-and-competition',
          title: 'Market sizing and competition',
          summary:
            'Size a market bottom-up, see why top-down numbers mislead, map the real alternatives including doing nothing, and think honestly about defensibility.',
          estimatedMinutes: 100,
          objectives: [
            'Define TAM, SAM and SOM and compute them bottom-up',
            'Explain why top-down market size slides persuade nobody',
            'Find official data to count customers',
            'Map direct competitors, indirect alternatives and non-consumption',
            'Name the main sources of defensibility and say which you actually have',
          ],
          concepts: [
            'TAM, SAM and SOM',
            'Bottom-up sizing',
            'Top-down sizing',
            'Competing alternatives',
            'Non-consumption',
            'Moat',
            'Network effects',
            'Switching costs',
          ],
          explanation: `**TAM** (total addressable market) is the annual revenue if every possible customer bought your product. **SAM** (serviceable addressable market) is the part you could actually serve given your product, geography and channels. **SOM** (serviceable obtainable market) is what you might win in a stated time, say three years.

**Bottom-up sizing** counts customers and multiplies by what they would pay. Suppose an illustrative product for independent dental practices costs USD 3,000 a year:

| Step | Working | Annual revenue |
|---|---|---|
| TAM | 30,000 practices x USD 3,000 | USD 90 million |
| SAM | 40% use compatible software | USD 36 million |
| SOM | 5% of SAM in three years | USD 1.8 million (600 customers) |

Those inputs are made up for teaching. The method is what counts: you can check each number. **Top-down sizing** starts from a report: "healthcare software is USD 50 billion, so 1% is USD 500 million". It sounds large and shows nothing. Nobody buys 1% of an industry.

**Counting customers.** Use official data before paid reports. The US Census Bureau's County Business Patterns counts establishments by industry and size, and the latest year on its page at the time of writing is 2023. BLS publishes employment by occupation. Trade associations publish member counts. Say where each number came from and how old it is.

**Why this matters later.** A USD 36 million serviceable market can make an excellent private business. It probably cannot produce the exit a large venture fund needs, as Module 6 will show with numbers. That is a fact about fund arithmetic, not about the quality of your company.

**Competition.** Saying "we have no competitors" tells an investor you have not looked. Your competition is whatever people do today, which includes spreadsheets, a part-time assistant, a generic tool and, most often, **non-consumption**: doing nothing. Make a table of each alternative, its price and why customers stay with it.

Two views conflict here. Peter Thiel argues in Zero to One that competition destroys profit and that you should aim for a monopoly on a small market, so that you need to differentiate rather than fight. Others point out that competitors prove demand and that being first matters less than being best. Both can hold: existing spending shows a market is real, and head-on price competition is still miserable.

**A moat** is a lasting reason customers do not leave and rivals cannot copy you. Common sources are **network effects** (the product improves as more people use it), **switching costs** (leaving is painful), economies of scale, brand and regulation or proprietary data. Most early companies have none. Your early advantage is usually speed and closeness to customers, and it is better to admit that than to invent a moat for a slide.`,
          resources: [
            { title: 'County Business Patterns', url: 'https://www.census.gov/programs-surveys/cbp.html', type: 'dataset', cost: 'free', provider: 'US Census Bureau', note: 'Counts establishments by industry and size. Use it to count potential customers.', primary: true },
            { title: 'Business Dynamics Statistics', url: 'https://www.census.gov/programs-surveys/bds.html', type: 'dataset', cost: 'free', provider: 'US Census Bureau', note: 'Firm births, deaths and sizes for a sense of how an industry behaves.' },
            { title: 'The Equity Equation', url: 'https://paulgraham.com/equity.html', type: 'article', cost: 'free', provider: 'Paul Graham', note: 'A way of reasoning about what an investor or hire must add. Useful once you can size what you are building.' },
          ],
          exercises: [
            {
              slug: 'bottom-up-size',
              title: 'Size a real market bottom-up',
              prompt:
                'Choose a customer type with a NAICS industry code. Find a count in County Business Patterns, and note the year. Find a real price for a comparable product. Compute TAM, SAM and a three-year SOM, giving a source or stated reason for every factor. Then change your two weakest assumptions by a factor of two in each direction and report the range of SAM.',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'alternatives-map',
              title: 'Map the alternatives',
              prompt:
                'For one problem, list at least six alternatives, including doing nothing and a manual process. For each, record the price, the buyer, the main strength and why someone might switch away. Identify the one you would most hate to compete with, and explain why.',
              kind: 'writing',
              difficulty: 1,
            },
            {
              slug: 'moat-honesty',
              title: 'Be honest about your moat',
              prompt:
                'For a company you admire, identify which moat it has and when it appeared. Was it there in year one? Then do the same for your idea, and state what must be true for a moat to form within five years. Write about 200 words.',
              kind: 'writing',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why is "1% of a huge market" a weak argument?',
              answerOutline:
                'It is top-down, cannot be checked and says nothing about who buys or why. Bottom-up counts of customers and price can be checked.',
            },
            {
              question: 'What is non-consumption, and why does it matter?',
              answerOutline:
                'Potential customers doing nothing about the problem. It is often the main competitor, and it may mean the problem is not painful enough.',
            },
            {
              question: 'Can a USD 36 million SAM be a good business?',
              answerOutline:
                'Yes, potentially excellent as a private company. It may simply not suit a large venture fund, whose return arithmetic needs much larger outcomes.',
            },
          ],
          quiz: [
            {
              question: 'An illustrative product for veterinary practices costs USD 2,400 a year. There are 12,000 practices, and 50% use software your product works with. What is the **SAM**?',
              options: ['USD 14.4 million', 'USD 28.8 million', 'USD 1.44 million', 'USD 0.72 million'],
              answer: 0,
              explanation:
                'TAM is $12{,}000 \\times 2{,}400 = 28.8$ million. SAM is the part you can actually serve: $50\\% \\times 28.8 = 14.4$ million. USD 28.8 million is the TAM, the tempting slip of skipping the compatibility filter. USD 0.72 million would be a three-year SOM of 5% of SAM.',
            },
            {
              question: 'You are building an invoicing tool for small plumbing firms. Most of them track jobs on paper and chase payments by phone. What is your main competition?',
              options: [
                'Other invoicing startups that target plumbers',
                'Doing nothing different: the paper and phone routine they already have',
                'Large accounting software suites',
                'There is none yet, which is a strong point for investors',
              ],
              answer: 1,
              explanation:
                'Your competition is whatever people do today, and here that is non-consumption: carrying on with paper. It is often the hardest rival, because it is free and familiar. Other tools matter too, but they are not what most of these customers use. "No competitors" tells an investor you have not looked.',
            },
          ],
        },
      ],
    },
    {
      slug: 'building-to-product-market-fit',
      title: 'Building to Product-Market Fit',
      description:
        'Build the smallest thing that tests your riskiest assumption, price it, measure activation and retention by cohort, and learn how to recognise product-market fit without fooling yourself.',
      lessons: [
        {
          slug: 'minimum-viable-product',
          title: 'The minimum viable product and iteration',
          summary:
            'An MVP is a test of your riskiest assumption, not a cheap version of the final product. Learn the forms it takes, how to iterate and how to decide whether to pivot.',
          estimatedMinutes: 90,
          objectives: [
            'Define a minimum viable product by what it tests',
            'Choose between concierge, Wizard of Oz, single-feature and prototype tests',
            'Run a build-measure-learn loop with a target set in advance',
            'Decide between persevering and pivoting using evidence',
            'Say when a rough product is irresponsible',
          ],
          concepts: [
            'Minimum viable product',
            'Build-measure-learn',
            'Concierge test',
            'Wizard of Oz test',
            'Iteration',
            'Pivot',
            'Scope cutting',
          ],
          explanation: `A **minimum viable product** (MVP) is the smallest thing that lets you learn whether your riskiest assumption is true from real customers. The term was popularised by Eric Ries in The Lean Startup, building on Steve Blank's customer development. Many people misread it as "a bad version of the product". The test is not how little you built but how much you learned.

Ries's **build-measure-learn** loop means: state a hypothesis, build just enough to test it, measure what real users do, then decide. The speed of that loop matters more than the polish of any one pass.

**Forms an MVP can take:**

| Form | What you do | Example |
|---|---|---|
| Concierge | Do the job by hand for a few customers | Personally produce a client's weekly report |
| Wizard of Oz | The customer sees a product; humans run it behind the scenes | Manually fulfil orders placed in a simple form |
| Single feature | Ship only the one thing people came for | An upload page and one export |
| Prototype | A clickable mock-up used to test understanding | Figma screens in an interview |

Graham's "Do Things that Don't Scale" argues that early, hand-run work is not a compromise but how companies start, for example recruiting users one at a time and over-serving them. Be honest with customers about what is automated where it matters, especially if data or a promise of a human or machine service is involved.

**Cut scope hard.** YC's "How to plan an MVP" advises shipping quickly, within weeks, with a fixed deadline, cutting features rather than extending. It is YC's opinion, shaped by software, but the discipline is general: write down the assumption, the user, and the one number that would show it worked.

**Iterate or pivot?** Iteration changes the product within the same strategy. A **pivot** changes a fundamental hypothesis: the customer, the problem or the business model. Pivoting is neither failure nor virtue. It is a decision based on evidence, ideally against the thresholds you set before testing. If you have changed everything five times with no evidence, you may just be avoiding the decision to stop. Keep the pivot honest by asking what you learned that makes this new direction more likely to work.

**Not every product can be rough.** Software for scheduling a hair appointment can have bugs. Medical devices, drugs, aircraft parts, payment systems and anything handling sensitive data have safety or legal duties. In the US these can involve the FDA, financial regulators and privacy laws such as HIPAA. Testing in those fields needs a real plan, often with advisers and sometimes with approvals, and the phrase "move fast" is no defence. Theranos, covered in Module 7, is the warning.

Quality disagreements are real. Some founders argue that in a crowded market a bare MVP gets no attention and that early users must love something. Others hold that polish before evidence is wasted. Resolve it by asking what your riskiest assumption is: if the risk is whether anyone will switch from a good alternative, your test may need to be better than minimum.`,
          resources: [
            { title: 'How to plan an MVP', url: 'https://www.ycombinator.com/library/6f-how-to-set-kpis-and-goals', type: 'video', cost: 'free', provider: 'Y Combinator', note: 'The URL slug differs from the title, which is how YC lists it.', primary: true },
            { title: 'The Lean Startup: principles', url: 'https://theleanstartup.com/principles', type: 'article', cost: 'free', provider: 'Eric Ries' },
            { title: 'Do Things that Don\'t Scale', url: 'https://paulgraham.com/ds.html', type: 'article', cost: 'free', provider: 'Paul Graham' },
            { title: 'Getting Real', url: 'https://basecamp.com/gettingreal', type: 'textbook', cost: 'free', provider: '37signals', note: 'A bootstrapped software company\'s case for building less.' },
          ],
          exercises: [
            {
              slug: 'mvp-spec',
              title: 'One-page MVP spec',
              prompt:
                'Write a one-page spec: riskiest assumption, target user, MVP form, what is deliberately left out, the deadline (at most four weeks), the single metric and the threshold set in advance. List five features you cut, and why each can wait.',
              kind: 'writing',
              difficulty: 1,
            },
            {
              slug: 'concierge-plan',
              title: 'Plan a concierge test',
              prompt:
                'For a software idea, design a concierge version that serves five customers by hand. Estimate your hours per customer per week and what you would charge. Explain what you would learn that a landing page could not tell you, and what you should tell customers about how the work is done.',
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'pivot-case',
              title: 'Analyse a pivot',
              prompt:
                'Research one real company that changed direction early. State the original hypothesis, the evidence that changed it, what they kept and what they discarded. Classify it as a change of customer, problem or business model. Note whether your sources are the founders\' own account, and why that matters.',
              kind: 'reading',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What is an MVP for?',
              answerOutline:
                'Testing the riskiest assumption with real users at the lowest cost. It is measured by learning, not by how little was built.',
            },
            {
              question: 'What is the difference between iterating and pivoting?',
              answerOutline:
                'Iterating improves within the same strategy. A pivot changes a basic hypothesis such as the customer, problem or business model.',
            },
            {
              question: 'Give two situations where a rough MVP is irresponsible.',
              answerOutline:
                'Anywhere with safety or legal duties: medical devices, drugs, payments, products handling sensitive personal data, aviation.',
            },
          ],
          quiz: [
            {
              question: 'Your scheduling tool was built for dental clinics. Evidence shows veterinary clinics want it far more, so you stop selling to dentists and sell the same product to vets. What is this?',
              options: [
                'An iteration, because the product itself is unchanged',
                'Neither, since nothing was rebuilt',
                'A sign that the MVP failed and the company should stop',
                'A pivot, because the customer, one of the basic hypotheses, has changed',
              ],
              answer: 3,
              explanation:
                'A pivot changes a fundamental hypothesis: the customer, the problem or the business model. Changing who you sell to is a change of customer even if no line of the product changes. Iteration would be improving the product for the same dentists. A pivot based on evidence is neither failure nor virtue.',
            },
          ],
        },
        {
          slug: 'pricing',
          title: 'Pricing',
          summary:
            'Pricing is a product decision and a test of value. Compare pricing models, work through what a price rise really does, and learn why most founders price too low.',
          estimatedMinutes: 90,
          objectives: [
            'Compare cost-plus, competitor-based and value-based pricing',
            'Choose a pricing model such as subscription, usage or transaction',
            'Define gross margin and compute it',
            'Calculate how many customers you can lose before a price rise hurts profit',
            'Run a pricing test ethically',
          ],
          concepts: [
            'Value-based pricing',
            'Cost-plus pricing',
            'Subscription',
            'Usage-based pricing',
            'Gross margin',
            'Contribution per customer',
            'Price anchoring',
            'Willingness to pay',
          ],
          explanation: `Price is one of the strongest levers you have, and most founders set it by guessing low. There are three ways to think about it.

- **Cost-plus:** cost plus a margin. It is simple but ignores value, and for software the marginal cost is close to zero, so it tells you little.
- **Competitor-based:** match what others charge. It is useful as a sanity check, but it copies their mistakes.
- **Value-based:** charge a share of the value you create. If you save a clinic USD 2,000 a month, USD 300 can be an easy decision for them. It needs you to understand your customer, which is why it follows from interviews.

**Pricing models** matter as much as the number:

| Model | Customer pays for | Works well when | Watch out for |
|---|---|---|---|
| Subscription | Access each month or year | Value is continuous | Churn |
| Usage-based | Units consumed | Value tracks usage | Unpredictable bills and revenue |
| Per seat | Each user | Value grows with users | Discourages adoption |
| Transaction fee | A share of each payment | You sit in a money flow | Competition drives the fee down |
| One-off | A single purchase | Lasting products | No recurring revenue |

**Gross margin** is the share of revenue left after the direct cost of delivering the product, such as hosting, payment fees, support and AI model usage. If a customer pays USD 100 and delivery costs USD 25, gross margin is 75%. Investors look closely at this, because low margins limit what you can spend on growth. For products built on paid AI models, usage costs can make margins much worse than for classic software, so compute them rather than assuming.

**What a price rise does.** You have 1,000 customers paying USD 20 a month, and each costs USD 5 to serve.

| | Customers | Price | Revenue | Profit after delivery costs |
|---|---|---|---|---|
| Before | 1,000 | USD 20 | USD 20,000 | USD 15,000 |
| After a 20% rise, losing 10% | 900 | USD 24 | USD 21,600 | USD 17,100 |

You would earn more with fewer customers. At USD 24 each customer contributes USD 19, so you could lose up to 210 customers (keeping 790) before profit falls below USD 15,000. Losing customers still has costs, since they may also bring referrals, so this is a starting estimate.

**Advice and its limits.** Many investors, including YC in "How To Price For B2B", advise business-to-business founders to charge more than feels comfortable, since low prices signal low value and starve the company. That advice comes from observing startups selling to businesses. For consumers, small price changes can have large effects on sign-ups, so test before believing it.

**Testing.** Quote different prices to different new prospects in sales conversations, or test tiers over time. Change your prices openly, honour what you sold to existing customers, and check any rules on deceptive pricing, including those on fake discounts or auto-renewal, in your market.`,
          resources: [
            { title: 'How To Price For B2B', url: 'https://www.ycombinator.com/library/LI-how-to-price-for-b2b', type: 'video', cost: 'free', provider: 'Y Combinator', note: 'Business-to-business pricing advice. Note it is aimed at early enterprise and SaaS founders.', primary: true },
            { title: 'YC guide to business models', url: 'https://www.ycombinator.com/library/Gh-yc-guide-to-business-models', type: 'article', cost: 'free', provider: 'Y Combinator' },
            { title: '16 Startup Metrics', url: 'https://a16z.com/16-startup-metrics/', type: 'article', cost: 'free', provider: 'Andreessen Horowitz', note: 'Read the items on gross margin and revenue definitions.' },
          ],
          exercises: [
            {
              slug: 'value-price',
              title: 'Compute a value-based price',
              prompt:
                'For a product you know, estimate in numbers the value to one customer per year, in time saved or revenue gained, with a stated assumption for each input. Propose a price as a share of that value. Compare with two alternatives\' prices and explain any gap.',
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'price-rise-math',
              title: 'Break-even on a price change',
              prompt:
                'You have 2,000 customers at USD 30 a month with a delivery cost of USD 9 each. Compute monthly profit after delivery. For a rise to USD 36 and a cut to USD 24, compute the number of customers at which profit equals today\'s. Then set up a spreadsheet with the inputs (customers, price, delivery cost) in their own cells and a formula for the break-even customer count, and fill in a table of break-even losses for rises of 10%, 20% and 50%. Check: today\'s profit is USD 42,000, the USD 36 price breaks even at about 1,556 customers, and the 10% rise can lose 250 customers (12.5%).',
              kind: 'problem',
              hint: 'Break-even customers = today\'s profit divided by the new contribution per customer (new price minus delivery cost).',
              difficulty: 2,
            },
            {
              slug: 'three-tier-design',
              title: 'Design three tiers',
              prompt:
                'Design three pricing tiers for a real or imagined product. For each, state who it is for, the metric it charges on and what pushes a customer to upgrade. Estimate gross margin per tier, including any AI or usage costs. Explain what happens to margin for your heaviest user.',
              kind: 'writing',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does cost-plus pricing say little about software?',
              answerOutline:
                'Marginal cost is near zero, so the cost says nothing about what the product is worth to the customer.',
            },
            {
              question: 'A customer pays USD 50 and direct delivery costs USD 20. What is gross margin, and why does it matter?',
              answerOutline:
                '60%. It sets how much is left to pay for customer acquisition, staff and profit, and investors use it to judge the business.',
            },
            {
              question: 'Why might profit rise after a price increase that loses customers?',
              answerOutline:
                'Each remaining customer contributes more. Profit falls only after losses exceed the break-even count.',
            },
          ],
          quiz: [
            {
              question: 'You have 500 customers paying USD 40 a month, and each costs USD 10 to serve. You raise the price to USD 50. How many customers can you lose before profit after delivery costs falls below today\'s?',
              options: ['100', '125', '50', '200'],
              answer: 1,
              explanation:
                'Today\'s profit is $500 \\times (40 - 10) = 15{,}000$. At USD 50 each customer contributes USD 40, so $15{,}000 / 40 = 375$ customers keep profit level, and you can lose 125. The tempting 100 keeps *revenue* level ($20{,}000 / 50 = 400$) and forgets that lost customers also stop costing USD 10 each.',
            },
            {
              question: 'A customer pays USD 80 a month. Delivering the product costs USD 6 of hosting, USD 3 of payment fees, USD 15 of AI model usage and USD 4 of support. Marketing spends USD 20 per customer. What is the gross margin?',
              options: ['83.75%', '40%', '65%', '35%'],
              answer: 2,
              explanation:
                'Direct delivery costs are $6 + 3 + 15 + 4 = 28$, so gross margin is $(80 - 28)/80 = 65\\%$. Marketing is a cost of *acquiring* customers, not of delivering the product, so it is left out (including it gives 40%). Leaving out the AI usage gives 83.75%, the classic-software margin the lesson warns you not to assume.',
            },
          ],
        },
        {
          slug: 'activation-and-retention',
          title: 'Activation and retention by cohort',
          summary:
            'Measure whether people get value and whether they come back. Build a cohort table, read a retention curve and avoid metrics that flatter you.',
          estimatedMinutes: 110,
          objectives: [
            'Define activation for a specific product',
            'Build and read a cohort retention table',
            'Explain why a flattening retention curve matters more than a growing user count',
            'Handle right-censoring so that young cohorts do not mislead you',
            'Replace vanity metrics with useful ones',
          ],
          concepts: [
            'Activation',
            'Cohort',
            'Retention curve',
            'Core action',
            'Vanity metric',
            'Right-censoring',
            'Daily and monthly active users',
          ],
          explanation: `Signing up is not using. Two measures tell you whether people get value.

**Activation** is the moment a new user first gets real value, defined by a specific event in a time window, for example "created a first report within 72 hours of sign-up". You choose this definition by checking which early actions are associated with staying. Writing it down stops you redefining success later.

**Retention** is the share of a group who keep doing the **core action**, the thing that delivers value, over time. A **cohort** is a group of users who started together, usually in the same week or month. Comparing cohorts shows whether the product is improving, which totals hide.

A cohort of 400 users who signed up in one week:

| Weeks since sign-up | Active users | Retention |
|---|---|---|
| 0 | 400 | 100% |
| 1 | 172 | 43% |
| 2 | 128 | 32% |
| 3 | 108 | 27% |
| 4 | 100 | 25% |
| 6 | 96 | 24% |
| 8 | 94 | 23.5% |

The drop in early weeks is normal. What matters is the shape: this curve **flattens** near 24%, meaning about a quarter of users have found lasting value. A curve that keeps sliding to zero means that, however fast you add users, you are filling a leaky bucket. Paid marketing can hide this for a while, because new sign-ups cover up departures.

No single good number exists. A healthy rate differs enormously by product. A tax tool used once a year and a messaging app used hourly cannot be compared, so choose a period that fits how often the need arises, and compare your own cohorts over time. Treat benchmarks you see online carefully, since they often have unknown samples.

**Right-censoring** means some users have not been around long enough to be measured. If a cohort started two weeks ago, you do not know its week-8 retention. Leave that cell blank rather than showing zero, and do not average across cohorts of different ages without care. The cohort exercise below and the Module 3 project make you handle this properly, because many dashboards get it wrong.

**Vanity metrics** make you feel good and do not drive decisions: total sign-ups, cumulative downloads, page views, press mentions. They can only go up. Useful metrics change your behaviour: activation rate, weekly active users doing the core action, retention by cohort and revenue retention. Total sign-ups rising from 1,000 to 10,000 while weekly active users stay at 300 is a bad sign that looks like a good one.

**How to measure.** Log events with a user ID, an event name and a timestamp in UTC. Decide how you treat internal testers and bots, and remove them consistently. When you change a definition, say so and restate history, because investors will ask. In due diligence, the numbers you showed in a deck are checked against your raw data.`,
          resources: [
            { title: '16 Startup Metrics', url: 'https://a16z.com/16-startup-metrics/', type: 'article', cost: 'free', provider: 'Andreessen Horowitz', note: 'Read the items on active users and retention.', primary: true },
            { title: 'The real product-market fit', url: 'https://www.ycombinator.com/library/5z-the-real-product-market-fit', type: 'article', cost: 'free', provider: 'Y Combinator', note: 'Read it after the retention table above, and ask what evidence would convince you.' },
            { title: 'Startup = Growth', url: 'https://paulgraham.com/growth.html', type: 'article', cost: 'free', provider: 'Paul Graham', note: 'Compare what he measures with retention. Growth without retention is not the point.' },
          ],
          exercises: [
            {
              slug: 'define-activation',
              title: 'Define activation',
              prompt:
                'For three products you use (say a note app, a bank app and a game), write an exact activation definition and a core action, each with an event name and a time window. Explain what a user who signs up but never reaches activation actually experienced.',
              kind: 'writing',
              difficulty: 1,
            },
            {
              slug: 'cohort-table-pandas',
              title: 'Build a cohort table in a spreadsheet',
              prompt:
                'Four weekly cohorts signed up: 200 users (week of 5 January), 160 (12 January), 240 (19 January) and 180 (26 January). Active users doing the core action in weeks 1, 2, 3 and so on after sign-up were: 90, 70, 62, 58, 56 for the first cohort; 75, 58, 51, 48 for the second; 120, 96, 86 for the third; and 72, 54 for the fourth, whose later weeks have not happened yet. In a spreadsheet, lay this out as a triangle with one row per cohort, convert it to retention percentages, and leave the cells that cannot be known yet blank. Compute blended retention for each week using only the cohorts that have that cell, and compare week 4 with what you get if the blanks are treated as zero. Chart the four curves on one line chart and say which cohort looks best.',
              kind: 'data-analysis',
              difficulty: 2,
              hint: 'Blended week 2 is (70 + 58 + 96 + 54) / 780, about 35.6%. Blended week 4 uses only the first two cohorts: 106 / 360, about 29.4%. Treating blanks as zero gives 106 / 780, about 13.6%, which is wrong.',
            },
            {
              slug: 'spot-the-vanity',
              title: 'Spot the vanity metric',
              prompt:
                'Find a public startup announcement or pitch that cites growth numbers. List each metric, classify it as vanity or useful and say what number you would ask for instead. Write down one honest question for the founders. Remember that absence of a number proves nothing about the company.',
              kind: 'reading',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'Why is a retention curve that flattens at 20% better than one that starts at 50% and keeps falling to zero?',
              answerOutline:
                'A flat tail shows a group with lasting value. A curve heading to zero loses everyone eventually, so growth depends on replacing all users.',
            },
            {
              question: 'What is right-censoring in a cohort table?',
              answerOutline:
                'Young cohorts have not lived long enough for later cells to be known. Those cells must be blank, not zero.',
            },
            {
              question: 'Total sign-ups doubled while weekly active users stayed flat. What should you conclude?',
              answerOutline:
                'The product is not retaining the new users. Marketing may be working, but value is not. Investigate activation and retention.',
            },
          ],
          quiz: [
            {
              question: 'A January cohort of 200 users has 60 active in week 4. A February cohort of 300 users signed up only two weeks ago. A dashboard reports week-4 retention as 60 / 500 = 12%. What is the honest week-4 figure?',
              options: [
                '30%, using only the cohort old enough to have a week-4 number',
                '12%, as the dashboard says',
                '15%, the average of 30% for January and 0% for February',
                '0%, because the newest cohort has no week-4 users yet',
              ],
              answer: 0,
              explanation:
                'February\'s week-4 cell is right-censored: it is unknown, not zero. Only January has reached week 4, so the figure is $60/200 = 30\\%$. Putting February\'s 300 users in the denominator (12%) or averaging in a zero (15%) treats "not measured yet" as "everyone left".',
            },
            {
              question: 'Product A keeps 60% of a cohort in week 1, then loses about 5 points a week and is at 20% in week 8, still falling. Product B keeps 40% in week 1 and has stayed flat at 22% since week 4. Which shows stronger evidence of lasting value?',
              options: [
                'A, because it keeps more users early on',
                'They are about the same, since both are near 20% at week 8',
                'Neither can be judged without total sign-ups',
                'B, because its curve has flattened, so a stable group keeps using it',
              ],
              answer: 3,
              explanation:
                'The shape matters more than the early level. A flat tail means a group has found lasting value. A curve still sliding is heading for zero, so A must keep replacing everyone it loses. Total sign-ups are a vanity metric and would not settle this.',
            },
          ],
        },
        {
          slug: 'recognising-product-market-fit',
          title: 'Recognising product-market fit',
          summary:
            'What product-market fit means, how the 40% survey test works and how much to trust it, and why you should demand several signals before believing you have it.',
          estimatedMinutes: 90,
          objectives: [
            'Define product-market fit and explain why it comes before scaling',
            'Run and score the very-disappointed survey correctly',
            'Compute a margin of error for the score and state its sample limits',
            'Combine survey, retention and organic signals',
            'Explain the risks of scaling early',
          ],
          concepts: [
            'Product-market fit',
            'Very disappointed survey',
            'Margin of error',
            'Wilson interval',
            'Organic demand',
            'Premature scaling',
            'Segment-specific fit',
          ],
          explanation: `Marc Andreessen wrote in 2007 that product/market fit means being in a good market with a product that can satisfy that market, and that you can always feel when it is not happening. It is his definition, and it is deliberately loose. It has stayed the standard phrase because it names something real: the time when customers pull the product from you, rather than you pushing it at them.

**The very-disappointed survey.** Sean Ellis, a growth marketer, asks users "How would you feel if you could no longer use this product?", with answers *very disappointed*, *somewhat disappointed* and *not disappointed*. According to Rahul Vohra's First Round essay, Ellis benchmarked nearly a hundred startups and found that those who struggled almost always scored under 40%, and those with strong growth usually scored above it. The 40% figure is one practitioner's benchmark, not a law. Vohra reports that Superhuman scored 22% at first, then improved by focusing on the group who loved it.

**Score it properly.** Survey people who have really used the product recently. Exclude "not applicable" answers. If 84 of 200 valid respondents say very disappointed, the score is 42%.

**Mind the margin of error.** A small sample proves little. A **Wilson interval** is a standard way to compute a 95% range for a proportion:

| Result | Point estimate | 95% Wilson interval |
|---|---|---|
| 12 of 30 | 40% | 24.6% to 57.7% |
| 40 of 100 | 40% | 30.9% to 49.8% |
| 84 of 200 | 42% | 35.4% to 48.9% |
| 160 of 400 | 40% | 35.3% to 44.9% |

With 30 responses you cannot tell a weak product from a strong one. And surveys of your own users suffer from **selection**: those who reply are often the keenest. See the linked lesson on confidence intervals for the theory.

**Look for several signals together:**

- Retention curves that flatten, as in the previous lesson.
- A survey score above about 40% from an adequate sample of real users.
- Organic demand: customers arrive by word of mouth, not only through paid channels.
- Customers complain loudly when something breaks.
- Sales become easier, and revenue is not concentrated in one or two customers.

Fit is usually **segment-specific**. Thirty percent overall may hide 60% among one kind of user. The useful question is which people love it and why. Superhuman's method rests on exactly that.

**Why it matters.** Spending heavily on sales and marketing before you have fit, known as **premature scaling**, burns money on customers who leave. Fit is also not permanent. Markets move, and you can lose it to a new technology or competitor. Some writers treat fit as a moment you cross, and others as something to re-earn at each new segment. Treat it as an ongoing measurement.

Beware false positives. Friends who use your product to be kind, customers paid by discounts, and hype around a new technology can all resemble fit for a while.`,
          resources: [
            { title: 'The only thing that matters', url: 'https://pmarchive.com/guide_to_startups_part4.html', type: 'article', cost: 'free', provider: 'Marc Andreessen', note: 'The essay that popularised the term.', primary: true },
            { title: 'How Superhuman Built an Engine to Find Product Market Fit', url: 'https://review.firstround.com/how-superhuman-built-an-engine-to-find-product-market-fit/', type: 'article', cost: 'free', provider: 'First Round Review', note: 'A method for using the survey to focus. It is one company\'s account of its own success.' },
            { title: 'The real product-market fit', url: 'https://www.ycombinator.com/library/5z-the-real-product-market-fit', type: 'article', cost: 'free', provider: 'Y Combinator' },
          ],
          exercises: [
            {
              slug: 'wilson-interval',
              title: 'Compute the interval',
              prompt:
                'Set up the Wilson 95% interval in a spreadsheet, with z = 1.96, the number of very-disappointed answers k and the number of valid responses n in their own cells, and the formula in the hint. Reproduce the four rows in the lesson. Then copy the formula down a column of n values in steps of 5 (so that 40% is a whole number of responses) and find the smallest n at which a score of exactly 40% has an interval no wider than 10 percentage points in total. Explain what that means for an early company with 50 active users.',
              kind: 'problem',
              difficulty: 2,
              hint: 'With p = k/n, the centre is (p + z²/(2n)) / (1 + z²/n) and the half-width is z × √(p(1 − p)/n + z²/(4n²)) / (1 + z²/n). Check: 12 of 30 gives 24.6% to 57.7%. The answer to the second part is between 350 and 400; at 50 responses, 40% spans about 27.6% to 53.8%.',
            },
            {
              slug: 'survey-design',
              title: 'Design the survey',
              prompt:
                'Write the full four-question survey and the sampling rule: who gets it, when, how many reminders and who is excluded. Say how you will prevent keen users from dominating. Say what result would make you stop building for your current segment.',
              kind: 'writing',
              difficulty: 1,
            },
            {
              slug: 'diagnose-three-cases',
              title: 'Diagnose three cases',
              prompt:
                'Case A: 55% very disappointed from 22 responses, retention still falling at week 8. Case B: 31% overall, but 62% among accountants, and a flat curve for them. Case C: rapid growth, all of it from paid ads, and a 38% score from 300 users. For each, say whether you would call it fit, what you would do next and which further data you would want.',
              kind: 'problem',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Is 40% on the survey a proven threshold?',
              answerOutline:
                'No. It is a benchmark from Sean Ellis\'s experience, reported by others. It is useful as a guide, not a law, and depends on who is sampled.',
            },
            {
              question: 'Why is a 40% score from 30 responses weak evidence?',
              answerOutline:
                'The 95% Wilson interval runs about 25% to 58%. Self-selection may also inflate it.',
            },
            {
              question: 'What is premature scaling, and why is it harmful?',
              answerOutline:
                'Spending heavily on growth before fit. It buys customers who churn and uses up cash that could have funded learning.',
            },
          ],
          quiz: [
            {
              question: 'You get 150 survey replies. 20 come from people who have not used the product in the last two weeks, so you exclude them. Of the rest, 52 say *very disappointed*, 48 *somewhat* and 30 *not disappointed*. What is the score?',
              options: ['34.7%', '40%', '76.9%', '52%'],
              answer: 1,
              explanation:
                'Only recent, real users count, so the base is $150 - 20 = 130$ and the score is $52/130 = 40\\%$. 34.7% divides by all 150 replies. 76.9% wrongly adds the *somewhat* answers: the test counts only *very disappointed*.',
            },
            {
              question: 'An early product scores 50% very disappointed from 24 responses. What is the fairest reading?',
              options: [
                'Fit is proven, since 50% is well above the 40% benchmark',
                'It means half the users will soon stop using the product',
                'Weak evidence: the 95% Wilson interval runs from about 31% to 69%, and keen users may be over-represented',
                'The result is invalid, because the survey needs at least 1,000 responses',
              ],
              answer: 2,
              explanation:
                'With 24 responses the interval is so wide that the true score could be well below 40%, and people who answer surveys tend to be the keenest. That does not make it worthless or invalid; it makes it one weak signal to combine with retention and organic demand. The score says nothing directly about churn.',
            },
          ],
          relatedLessons: ['probability-statistics/estimation-and-confidence/confidence-intervals'],
        },
      ],
      project: {
        slug: 'discovery-and-metrics-workbook',
        title: 'A discovery and metrics workbook',
        description: `Founders fool themselves in predictable ways: they remember compliments, count sign-ups and quote one survey number with no margin of error. In this project you build a spreadsheet workbook (Excel, Google Sheets or LibreOffice Calc) that makes that harder, for a clearly labelled **fictional** company. Make up the data, or use real interviews only with permission and with names removed.

The workbook has five tabs. **Interviews:** one row per interview and one column per tag (pain, workaround, spent, commitment, compliment, hypothetical), with each problem scored by weights of 1, 2, 3 and 4 for the first four tags and 0 for compliments and hypotheticals. **Cohorts:** a weekly retention triangle in which cells a cohort has not reached are blank, never zero, and a blended row that uses only the cohorts that have each cell, with a line chart. **Activation:** an exact definition (event and time window) and the share of users who reach it. **Survey:** the very-disappointed score with its Wilson 95% interval, flagged as weak when there are fewer than 40 valid responses. **Market:** a bottom-up TAM, SAM and SOM in which every input has a source or a stated reason.

Check your formulas with these numbers. Two segments, 30,000 customers at 40% reachable and USD 3,000 a year, and 4,000 at 25% and USD 12,000, give a TAM of USD 138 million and a SAM of USD 48 million, and 5% of SAM is USD 2.4 million. A survey with 84 very disappointed out of 200 valid responses gives 42% with an interval of 35.4% to 48.9%. Then write a one-page discovery memo with the headings Problem, Who Has It, Evidence, Market Size, Competing Alternatives, Riskiest Assumption and Decision, where the Decision is persevere, pivot or stop, with a reason. The workbook should never say "we have product-market fit". It shows signals, and you decide.`,
        deliverables: [
          'A workbook with Interviews, Cohorts, Activation, Survey and Market tabs, with inputs kept separate from formulas',
          'A retention chart in which unknown cells are blank and the blended curve uses only cohorts that have each cell',
          'A survey score with its Wilson interval and a weak-sample flag below 40 valid responses',
          'A one-page discovery memo, marked fictional, whose numbers match the workbook',
        ],
        estimatedHours: 10,
        stretchGoals: [
          'Split retention and the survey score by customer segment, and show which segment drives the result.',
          'Ask someone sceptical to try to break your workbook with odd inputs, such as a cohort of zero users, and fix what they find.',
        ],
      },
    },
    {
      slug: 'reaching-customers',
      title: 'Reaching Customers and Staying Alive',
      description:
        'Choose a distribution channel, sell as a founder, compute customer acquisition cost, lifetime value and payback, and build a simple financial model that tells you how long the money lasts.',
      lessons: [
        {
          slug: 'distribution-and-sales',
          title: 'Distribution channels and founder-led sales',
          summary:
            'Good products do not sell themselves. Pick a channel that fits your price and customer, sell the first deals yourself, and run a funnel you can measure.',
          estimatedMinutes: 90,
          objectives: [
            'Match a channel to price point and customer type',
            'Explain why founders should make the first sales themselves',
            'Build a sales funnel and compute conversion at each stage',
            'Run a concentrated channel test rather than a little of everything',
            'Follow US rules on commercial email',
          ],
          concepts: [
            'Distribution channel',
            'Product-channel fit',
            'Sales funnel',
            'Founder-led sales',
            'Sales cycle',
            'Inbound and outbound',
            'Product-led growth',
            'CAN-SPAM',
          ],
          explanation: `A **distribution channel** is how customers find and buy from you. Engineers often assume a good product spreads on its own, and it rarely does. Brian Balfour's "Four Fits" framework argues that product, market, channel and model must fit together, and that channels are chosen to suit the product rather than bolted on later. It is one practitioner's framework, and a useful one.

**Price shapes channel.** A customer worth USD 20 a month cannot pay for a sales call, while a USD 100,000 contract needs one.

| Annual price per customer | Typical channels |
|---|---|
| Under USD 1,000 | Self-serve, content and search, app stores, word of mouth |
| USD 1,000 to 25,000 | Inside sales, demos, partners, targeted outbound |
| Over USD 25,000 | Direct sales, long relationships, procurement |

These bands are rules of thumb. **Inbound** means customers come to you through search, content or referrals. **Outbound** means you contact them first. **Product-led growth** means the product itself drives adoption, for example through free tiers or sharing.

**Founder-led sales.** Sell the first customers yourself. You learn the real objection, the budget owner and the wording that works, and you cannot hire someone to learn that for you. YC's talks on first customers report that these usually come from personal networks and direct outreach. Graham's "Do Things that Don't Scale" tells the same story: Airbnb's founders went door to door in New York to help hosts.

**A sales funnel** is the sequence of steps from first contact to customer, with a conversion rate at each. Say you contact 400 prospects:

| Stage | Conversion | Count |
|---|---|---|
| Contacted | | 400 |
| Replied | 15% | 60 |
| Took a demo | 40% | 24 |
| Became a customer | 25% | 6 |

Six customers from 400 contacts is an overall 1.5%. If this takes a founder a month and costs USD 12,000 of time, each customer costs USD 2,000. Now you can reason: to win 15 a month, contact about 1,000 prospects, or improve a stage. A weak demo-to-close rate suggests a product or pricing problem, and a weak reply rate suggests a targeting or message problem. These conversion rates are illustrative.

The **sales cycle** is how long a deal takes from first contact to signature. Businesses can take months, and large enterprises longer, so your cash must outlast the cycle.

**Test one channel at a time.** Spend a small budget hard enough on one channel to get a clear signal, then decide. A little of everything gives you no signal at all. Most companies that succeed end up with one dominant channel, which is an observation from investors, though a plausible one.

**Stay legal.** In the US, commercial email falls under the CAN-SPAM Act. As the FTC's guide explains, headers must be accurate, subject lines honest, messages must identify themselves as advertising and carry a physical postal address, and you must honour opt-outs within 10 business days. The FTC's guide cites penalties of up to USD 53,088 per email as of its January 2024 update. Text messages and automated calls have stricter rules, and other countries, including the EU and Canada, are often stricter still.`,
          resources: [
            { title: 'How to get your first customers', url: 'https://www.ycombinator.com/library/Ip-how-to-get-your-first-customers', type: 'video', cost: 'free', provider: 'Y Combinator', primary: true },
            { title: 'The Sales Playbook For Founders', url: 'https://www.ycombinator.com/library/Mo-the-sales-playbook-for-founders', type: 'video', cost: 'free', provider: 'Y Combinator', note: 'Founder-led business-to-business sales.' },
            { title: 'Four Fits growth framework', url: 'https://brianbalfour.com/four-fits-growth-framework', type: 'article', cost: 'free', provider: 'Brian Balfour', note: 'Why channel choice cannot be separated from product and model.' },
            { title: '15 USC 7704: requirements for commercial email', url: 'https://www.law.cornell.edu/uscode/text/15/7704', type: 'documentation', cost: 'free', provider: 'Cornell Legal Information Institute', note: 'The statute. The FTC also publishes a CAN-SPAM Act Compliance Guide for Business, which you can find by name on ftc.gov.' },
          ],
          exercises: [
            {
              slug: 'channel-scorecard',
              title: 'Score six channels',
              prompt:
                'For one product, list six candidate channels. Estimate for each the cost per customer, the time to get a signal, how far it scales and whether you have an advantage. Pick one to test for 30 days and write the budget, the target and the stop rule. State which estimates are guesses.',
              kind: 'writing',
              difficulty: 1,
            },
            {
              slug: 'funnel-maths',
              title: 'Work a funnel backwards',
              prompt:
                'You need 40 new customers in a quarter. Reply rate is 12%, demo rate 35% and close rate 20%, and each person can make 60 quality contacts a week. Compute the contacts needed per quarter and how many people that takes. If you raise close rate to 30%, how does it change? Which stage would you work on first, and why?',
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'cold-email',
              title: 'Write a compliant cold email',
              prompt:
                'Write a cold email of under 120 words to a specific type of buyer, focused on their problem and not on your product. Annotate how it meets each CAN-SPAM requirement in the FTC guide, including postal address and opt-out. Say what a recipient in the EU would change for you, and whom you would ask.',
              kind: 'writing',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why can a USD 20 monthly product rarely use direct sales?',
              answerOutline:
                'The customer\'s value is smaller than the cost of a salesperson\'s time, so acquisition would lose money.',
            },
            {
              question: 'Why should a founder make the first sales?',
              answerOutline:
                'To learn objections, buyers and wording first-hand, which cannot be delegated before it is known.',
            },
            {
              question: 'What might a high reply rate and a very low close rate suggest?',
              answerOutline:
                'The message and targeting work, but the product, price or fit fails on closer inspection.',
            },
          ],
          quiz: [
            {
              question: 'Your funnel converts 10% of contacts to replies, 50% of replies to demos and 20% of demos to customers. How many prospects must you contact to win 12 customers a month?',
              options: ['240', '600', '2,400', '1,200'],
              answer: 3,
              explanation:
                'Overall conversion is $0.10 \\times 0.50 \\times 0.20 = 1\\%$, so $12 / 0.01 = 1{,}200$ contacts. 240 forgets the close rate ($12 / 0.05$), and 600 forgets the reply rate. Multiplying every stage is the point: each weak stage cuts the whole funnel.',
            },
            {
              question: 'A quarter of the people you email reply, and many take a demo, but only 1 demo in 30 becomes a customer. Where is the problem most likely to be?',
              options: [
                'The product, the price or the fit, which fail when buyers look closely',
                'The targeting and the message',
                'The channel, so move the budget to paid ads',
                'Nowhere: close rates this low are normal in every business',
              ],
              answer: 0,
              explanation:
                'A high reply rate shows the targeting and message work: the right people are interested. Losing them at the demo points at what they see there, the product, its price or its fit to their need. Changing channels would bring in more people to lose at the same stage.',
            },
          ],
        },
        {
          slug: 'unit-economics',
          title: 'Unit economics: CAC, LTV, churn and payback',
          summary:
            'Whether each customer makes or loses money. Compute acquisition cost, lifetime value and payback, and learn why the LTV formula flatters you.',
          estimatedMinutes: 110,
          objectives: [
            'Define MRR, ARR, churn and net revenue retention',
            'Compute customer acquisition cost from real spending',
            'Compute lifetime value using gross margin and churn',
            'Compute CAC payback and say why it often beats the LTV to CAC ratio',
            'Convert monthly churn to annual churn',
            'List the ways these numbers mislead',
          ],
          concepts: [
            'MRR and ARR',
            'Customer churn',
            'Customer acquisition cost (CAC)',
            'Lifetime value (LTV)',
            'CAC payback',
            'Blended versus paid CAC',
            'Net revenue retention',
          ],
          explanation: `**Unit economics** asks whether one customer makes or loses money. **MRR** (monthly recurring revenue) is predictable subscription revenue per month, and **ARR** (annual recurring revenue) is MRR times 12. **Churn** is the share of customers or revenue lost in a period.

**Worked example.** You spent USD 30,000 on sales and marketing last month and won 150 customers. Each pays USD 40 a month at 80% gross margin. Monthly customer churn is 4%.

$$
\\text{CAC} = \\frac{\\text{sales and marketing spend}}{\\text{new customers}}
$$

$$
\\text{LTV} = \\frac{\\text{monthly revenue per customer} \\times \\text{gross margin}}{\\text{monthly churn}}
$$

| Measure | Working | Result |
|---|---|---|
| CAC | 30,000 / 150 | USD 200 |
| Gross profit per month | 40 x 0.80 | USD 32 |
| Expected lifetime | 1 / 0.04 | 25 months |
| LTV | 32 x 25 | USD 800 |
| LTV to CAC | 800 / 200 | 4.0 |
| CAC payback | 200 / 32 | 6.25 months |
| Annual churn | 1 - 0.96^12 | 38.7% |

Note the last row. A 4% monthly churn sounds small, and it loses nearly 40% of customers a year.

**Rules of thumb, and whose they are.** David Skok of Matrix Partners popularised LTV above 3x CAC and payback within 12 months for software as a service. They are one investor's heuristics for that kind of business. Consumer apps, marketplaces and enterprise sales behave differently.

**Why LTV flatters you.** The formula assumes churn stays constant, and a young company has barely seen its customers age. Halve churn to 2% and LTV doubles to USD 1,600. Double it to 8%, and LTV falls to USD 400, a ratio of 2. Small errors in a small denominator produce huge changes. Bill Gurley has warned about exactly this, along with using revenue rather than gross profit and ignoring the time value of money. Payback is a sturdier number: it uses less forecasting and tells you how long your cash is tied up, which is what kills startups.

**Common errors.** Blended CAC divides spending by all new customers, including those who would have come anyway, so it flatters paid channels. Report paid CAC separately. Include salaries in spending, not just ad budgets. Do not count discounted early customers as typical. CAC usually rises as you scale, because the cheapest customers come first.

**Net revenue retention** (NRR) measures revenue from a cohort of customers a year later, including upgrades and losses. Above 100% means existing customers grow even with no new sales, which is a sign of a strong product, particularly in business software.

Compute all of this by cohort when you can, and write down definitions. Investors will recompute your numbers from raw data in due diligence, and differences that you cannot explain cost you more than a weak number does.`,
          resources: [
            { title: 'SaaS Metrics 2.0', url: 'https://www.forentrepreneurs.com/saas-metrics-2/', type: 'article', cost: 'free', provider: 'David Skok', note: 'The standard walkthrough. Read the sections on CAC, LTV and payback.', primary: true },
            { title: 'Startup Killer: the Cost of Customer Acquisition', url: 'https://www.forentrepreneurs.com/startup-killer/', type: 'article', cost: 'free', provider: 'David Skok', note: 'Why high CAC ends companies.' },
            { title: '16 Startup Metrics', url: 'https://a16z.com/16-startup-metrics/', type: 'article', cost: 'free', provider: 'Andreessen Horowitz', note: 'Common metric errors, including CAC and bookings versus revenue.' },
          ],
          exercises: [
            {
              slug: 'unit-econ-calculator',
              title: 'Build a unit economics calculator',
              prompt:
                'Build a small spreadsheet calculator: input cells for sales and marketing spend, new customers, monthly price, gross margin and monthly churn, and formula cells for CAC, LTV, LTV to CAC, payback and annual churn. Check it on the lesson\'s example (expect USD 200, USD 800, 4.0, 6.25 months and 38.7%). Add a table of LTV to CAC for churn of 2%, 4%, 6% and 8%. Make the LTV cell show a warning text instead of an error when churn is zero, and explain why zero churn makes the formula meaningless.',
              kind: 'problem',
              difficulty: 1,
              hint: 'Annual churn is 1 minus (1 minus monthly churn) to the power 12. The LTV to CAC ratios should come out at 8.0, 4.0, 2.67 and 2.0. A formula such as IF(churn = 0, "churn must be above zero", ...) handles the warning.',
            },
            {
              slug: 'blended-vs-paid',
              title: 'Separate blended from paid CAC',
              prompt:
                'A month has USD 50,000 of ad spend, USD 20,000 of sales salaries, 100 customers from ads and 150 from word of mouth. Compute blended CAC, paid CAC with salaries, and paid CAC without salaries. Given USD 30 a month at 70% gross margin, compute payback for each. Which would you show an investor, and which would you run the company on?',
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'read-a-public-filing',
              title: 'Find unit economics in a filing',
              prompt:
                'Open a recent annual report (Form 10-K) of a public software company on SEC EDGAR. Find its net revenue retention and sales and marketing expense. Estimate a rough magic-number-style efficiency (new annual recurring revenue divided by prior-period sales and marketing spend), and note every assumption. Say why this is cruder than a true CAC.',
              kind: 'data-analysis',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'A product has USD 100 monthly revenue, 75% gross margin, 5% monthly churn and USD 900 CAC. What are LTV, the ratio and payback?',
              answerOutline: 'Gross profit USD 75. LTV 75 / 0.05 = USD 1,500. Ratio about 1.67. Payback 12 months.',
            },
            {
              question: 'Why use gross profit rather than revenue in LTV?',
              answerOutline:
                'Delivery costs must be paid out of revenue, so only gross profit is left to repay acquisition. Revenue overstates value.',
            },
            {
              question: 'Why is payback often more trustworthy than LTV to CAC?',
              answerOutline:
                'It relies less on forecasting churn far into the future and tells you how long cash is tied up. LTV is very sensitive to a churn estimate from a short history.',
            },
            {
              question: 'What does net revenue retention above 100% mean?',
              answerOutline:
                'Revenue from an existing cohort grows after a year, because upgrades exceed churn and downgrades.',
            },
          ],
          quiz: [
            {
              question: 'You spent USD 45,000 on sales and marketing and won 300 customers. Each pays USD 50 a month at 60% gross margin, and monthly churn is 5%. What is the CAC payback period?',
              options: ['3 months', '20 months', '5 months', '4 months'],
              answer: 2,
              explanation:
                'CAC is $45{,}000 / 300 = 150$. Each customer brings $50 \\times 0.60 = 30$ of gross profit a month, so payback is $150 / 30 = 5$ months. Three months divides by revenue instead of gross profit, which ignores delivery costs. Twenty months is the expected lifetime ($1/0.05$), and 4 is the LTV to CAC ratio ($600/150$).',
            },
            {
              question: 'Monthly customer churn is a steady 3%. Roughly what share of a cohort is lost over a year?',
              options: ['36%', '30.6%', '3%', '69.4%'],
              answer: 1,
              explanation:
                'Each month keeps 97% of those left, so after a year $0.97^{12} \\approx 69.4\\%$ remain and about 30.6% are gone. 36% multiplies 3% by 12, which double-counts customers already lost. 69.4% is the share retained, not lost.',
            },
          ],
        },
        {
          slug: 'burn-runway-and-a-financial-model',
          title: 'Burn, runway and a simple financial model',
          summary:
            'Know how long your money lasts, whether you can reach profit on the money you have, and build a monthly driver model that you can actually defend.',
          estimatedMinutes: 120,
          objectives: [
            'Compute gross burn, net burn and runway',
            'Determine whether a company is default alive or default dead',
            'Build a monthly model from drivers instead of a growth percentage',
            'Tell cash from accounting profit',
            'Run a sensitivity analysis and state your assumptions',
          ],
          concepts: [
            'Gross burn',
            'Net burn',
            'Runway',
            'Default alive and default dead',
            'Driver-based model',
            'Cash versus accrual accounting',
            'Sensitivity analysis',
          ],
          explanation: `Startups die when they run out of cash, so these are the numbers you check every month.

**Gross burn** is total monthly cash spent. **Net burn** is cash out minus cash in. **Runway** is cash divided by net burn: the months until you run out at the current rate.

With USD 900,000 in the bank, USD 95,000 monthly costs and USD 20,000 monthly revenue, net burn is USD 75,000 and runway is 12 months.

**Default alive or default dead.** Paul Graham's question is: at your current expenses and revenue growth, will you reach profitability before the money runs out? Simulating the same company month by month, with flat costs:

| Monthly revenue growth | Outcome |
|---|---|
| 5% | Cash runs out in month 14 |
| 8% | Cash runs out in month 18, about USD 1,000 short |
| 10% | Revenue passes costs in month 17 with USD 170,894 left at the low point |

Two points of growth separate dead from alive. Graham's own essay says many founders do not know which they are, and that this is what a founder must ask first. A company that is default alive can raise money from strength and a default dead one is betting on investors, whose appetite changes with markets.

**Build from drivers.** A **driver-based model** computes results from things you can observe, rather than typing "20% growth". For each month, starting from 100 customers paying USD 100, with 3% churn rounded to whole customers, 20 new customers, 80% gross margin, USD 30,000 of fixed costs and USD 300,000 in cash:

| Month | Lost | Customers | Revenue | Gross profit | Net cash flow | Cash |
|---|---|---|---|---|---|---|
| 1 | 3 | 117 | 11,700 | 9,360 | -20,640 | 279,360 |
| 2 | 4 | 133 | 13,300 | 10,640 | -19,360 | 260,000 |
| 3 | 4 | 149 | 14,900 | 11,920 | -18,080 | 241,920 |
| 6 | 5 | 195 | 19,500 | 15,600 | -14,400 | 195,120 |

Keep inputs on a separate sheet from formulas. Label which inputs are measured and which are guesses, and do not hide a hockey stick, a chart that shoots up after a flat start, in a growth assumption.

**Cash is not profit.** Accounting records revenue as it is earned, so an annual contract paid upfront is revenue spread over 12 months but all cash today, and a customer on 60-day payment terms is the reverse. Early companies can keep cash-based management numbers, but as you grow you will need proper accrual accounts, and this is a point to bring in an accountant. Investors will want them by about a Series A.

**Sensitivity analysis.** Change one input at a time and see what breaks. Double CAC, halve new customers, add 3 months to the sales cycle. If a modest change kills the company, you know where your risk is. A common rule of thumb is to raise enough for 18 to 24 months of runway, because a fundraise takes months and you should start it with at least six months of cash left. It is advice from investors, not a law, and a founder with less time is in a weak negotiating position.

A financial model is not a forecast. It is a tool for showing your assumptions and for seeing which ones matter. Nobody believes the year-3 number, but people do look at how you got there.`,
          resources: [
            { title: 'Default Alive or Default Dead?', url: 'https://paulgraham.com/aord.html', type: 'article', cost: 'free', provider: 'Paul Graham', primary: true },
            { title: 'How Not to Die', url: 'https://paulgraham.com/die.html', type: 'article', cost: 'free', provider: 'Paul Graham', note: 'Why persistence and low burn matter.' },
            { title: 'Entrepreneurial Finance (15.431)', url: 'https://ocw.mit.edu/courses/15-431-entrepreneurial-finance-spring-2011/', type: 'course', cost: 'free', provider: 'MIT OpenCourseWare', note: 'Lecture notes with a more formal treatment.' },
          ],
          exercises: [
            {
              slug: 'default-alive-simulator',
              title: 'Build a default-alive check',
              prompt:
                'In a spreadsheet, put cash, monthly costs, starting monthly revenue and a monthly growth rate in input cells. Below them, make one row per month for 36 months with revenue, costs, net cash flow and closing cash, and a cell that says whether revenue passes costs before cash goes below zero. Reproduce the lesson: starting from USD 900,000, USD 95,000 costs and USD 20,000 revenue, growth of 8% runs out in month 18 and growth of 10% survives. Then change the growth cell by hand, in steps of 0.1 percentage points, to find the break-even growth rate to one decimal place.',
              kind: 'problem',
              difficulty: 2,
              hint: 'The lesson\'s table grows revenue in month 1 as well, so month 1 revenue is 20,000 times (1 + g). With that convention 5% runs out in month 14, and the break-even rate lies between 8% and 9%.',
            },
            {
              slug: 'driver-model',
              title: 'Build a driver model',
              prompt:
                'In a spreadsheet, build a 24-month model from drivers for an imagined company: price, new customers per month, churn, gross margin, team size and salaries, and other costs. Label each input as measured or assumed. Report the month of lowest cash and the runway. Check that a total at the end matches the sum of the monthly flows.',
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'sensitivity-table',
              title: 'Run a sensitivity table',
              prompt:
                'Using your model, vary four inputs one at a time by plus or minus 25%: price, churn, new customers and salaries. Report the change in runway in months for each, and rank them. Write what that ranking means for what you should test next.',
              kind: 'data-analysis',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What is the difference between gross and net burn?',
              answerOutline: 'Gross burn is all cash spent per month. Net burn subtracts cash received, so it is the rate cash actually falls.',
            },
            {
              question: 'What does default alive mean?',
              answerOutline:
                'On current costs and revenue growth, the company reaches profitability before cash runs out, with no new funding.',
            },
            {
              question: 'A customer prepays USD 12,000 for a year. How does this differ in cash and in revenue?',
              answerOutline:
                'Cash rises USD 12,000 now. Accrual revenue is USD 1,000 a month over the year, with the rest held as deferred revenue.',
            },
          ],
          quiz: [
            {
              question: 'A company has USD 1.2 million in the bank, spends USD 140,000 a month and collects USD 40,000 a month in revenue. What is its runway?',
              options: ['8.6 months', '30 months', '6 months', '12 months'],
              answer: 3,
              explanation:
                'Net burn is $140{,}000 - 40{,}000 = 100{,}000$ a month, so runway is $1{,}200{,}000 / 100{,}000 = 12$ months. 8.6 months divides by gross burn and ignores the revenue coming in. 30 months divides by revenue, which means nothing here.',
            },
            {
              question: 'In January a customer prepays USD 24,000 for a two-year contract. Under accrual accounting, what happens in January?',
              options: [
                'Cash rises by USD 24,000; revenue of USD 1,000 is recognised',
                'Cash rises by USD 24,000; revenue of USD 24,000 is recognised',
                'Cash rises by USD 1,000; revenue of USD 1,000 is recognised',
                'Cash rises by USD 12,000; revenue of USD 12,000 is recognised',
              ],
              answer: 0,
              explanation:
                'All the cash arrives now, but revenue is recognised as it is earned, here over 24 months: $24{,}000 / 24 = 1{,}000$ a month, with the rest held as deferred revenue. Booking all USD 24,000 as January revenue confuses cash with profit, which is the point of the lesson.',
            },
          ],
        },
      ],
    },
    {
      slug: 'forming-the-company',
      title: 'Forming the Company',
      description:
        'Choose an entity, understand why a Delaware C corporation is the venture default and when it is not, issue founder shares with vesting, make the 83(b) election on time, assign intellectual property and set up banking and compliance. US law, as of 2 November 2026.',
      lessons: [
        {
          slug: 'choosing-an-entity',
          title: 'Choosing an entity',
          summary:
            'LLC, S corporation or C corporation, and why venture investors default to a Delaware C corporation. Includes what Delaware franchise tax really costs.',
          estimatedMinutes: 110,
          objectives: [
            'Compare a sole proprietorship, LLC, S corporation and C corporation on liability, tax and fundraising',
            'Explain why venture investors expect a Delaware C corporation',
            'Say when another entity is the better choice',
            'Compute Delaware franchise tax by both methods',
            'Explain registering in the state where you actually operate',
          ],
          concepts: [
            'Limited liability',
            'Pass-through taxation',
            'Double taxation',
            'S corporation limits',
            'Delaware General Corporation Law',
            'Franchise tax',
            'Foreign qualification',
            'Public benefit corporation',
          ],
          explanation: `*US law as of 2 November 2026. This is education, not legal or tax advice.*

A company is a legal person separate from you. **Limited liability** means its debts are generally not yours. That protection fails if you personally guarantee a debt, mix personal and company money, or commit wrongdoing yourself.

| Form | Tax on profits | Can issue preferred stock to funds? | Good for |
|---|---|---|---|
| Sole proprietorship | Your personal return | No | Testing something small; no liability shield |
| LLC | Passes through to owners by default | Awkward | Small and profitable businesses, real estate, consulting |
| S corporation | Passes through | No: one class of stock | Profitable small companies with US individual owners |
| C corporation | Taxed at the company, at 21% federal, then again on dividends | Yes | Companies raising venture capital |

**Pass-through** means company profit is taxed on the owners' returns whether or not it is paid out. That suits a profitable small business: no **double taxation** of corporate tax and then dividend tax. Under 26 USC 1361, an S corporation may have no more than 100 shareholders, generally only individuals, no nonresident aliens and only one class of stock, so a venture fund cannot buy preferred shares in one.

**Why Delaware C corporations are the venture default.** Funds buy preferred stock, which needs a corporation with multiple share classes. Many fund investors, such as endowments and foreign investors, have tax reasons to avoid pass-through income from an LLC. Standard documents, including the NVCA model documents and YC's SAFEs, assume a corporation. Delaware adds a mature corporate statute and a specialised business court, the Court of Chancery. Delaware amended its law in 2025 and some public companies have moved to Nevada or Texas, but venture documents still assume Delaware as the normal case. Only C corporations can issue qualified small business stock, a major tax benefit covered in Module 8.

**When not to.** If you will not raise venture capital, a C corporation can cost you more: trapped losses, double taxation and more paperwork. An LLC is often better for a profitable service business. You can usually convert an LLC to a C corporation later, at some legal cost.

**Delaware franchise tax** is due by 1 March with a USD 50 annual report for a domestic corporation. You may use the lower of two methods. As of the Division of Corporations' pages, the Authorized Shares method has a USD 175 minimum and the Assumed Par Value Capital method a USD 400 minimum, with a USD 200,000 cap (USD 250,000 for large filers). Late filing costs USD 200 plus 1.5% monthly interest. A startup with 10,000,000 authorized shares is shown USD 85,165 by the first method, and founders panic. By the second, with 8,000,000 issued shares and USD 50,000 of gross assets, assumed par is USD 0.00625, assumed par value capital is USD 62,500, and the tax is the USD 400 minimum.

A Delaware LLC pays a flat USD 400 by 1 June, per the Division's instructions.

**Register where you operate.** A Delaware corporation working in California must **foreign qualify** there. California's minimum franchise tax is USD 800 a year, generally from the second taxable year for a corporation, per the Franchise Tax Board. A **public benefit corporation** is an option for mission-driven companies; ask your lawyer about investors' views. A startup lawyer is worth paying for at this stage, and many offer deferred fees.`,
          resources: [
            { title: 'Business structures', url: 'https://www.irs.gov/businesses/small-businesses-self-employed/business-structures', type: 'documentation', cost: 'free', provider: 'US Internal Revenue Service', primary: true },
            { title: 'How to Calculate Franchise Taxes', url: 'https://corp.delaware.gov/frtaxcalc/', type: 'documentation', cost: 'free', provider: 'Delaware Division of Corporations', note: 'Both methods with worked examples.' },
            { title: 'Annual Report and Tax Information', url: 'https://corp.delaware.gov/frtax/', type: 'documentation', cost: 'free', provider: 'Delaware Division of Corporations', note: 'Due dates, fees, minimums and penalties.' },
            { title: '26 USC 1361: S corporation defined', url: 'https://www.law.cornell.edu/uscode/text/26/1361', type: 'documentation', cost: 'free', provider: 'Cornell Legal Information Institute' },
            { title: 'Corporations', url: 'https://www.ftb.ca.gov/file/business/types/corporations/index.html', type: 'documentation', cost: 'free', provider: 'California Franchise Tax Board', note: 'An example of what a home state charges. Check your own state.' },
          ],
          exercises: [
            {
              slug: 'franchise-tax-calculator',
              title: 'Work both franchise tax methods',
              prompt:
                'Using the Division\'s rules on its "How to Calculate Franchise Taxes" page, work both Delaware methods by hand or in a two-column spreadsheet, one column per method. Check yourself against the Division\'s examples: 10,005 shares gives USD 335, 100,000 shares gives USD 1,015, and its assumed par example gives USD 1,600. Then show USD 85,165 versus USD 400 for the lesson\'s startup, step by step. Add the USD 50 report fee to the total due, and write one sentence on what you would do if the state\'s notice showed the larger figure.',
              kind: 'problem',
              difficulty: 2,
              hint: 'Authorized shares: USD 250 for 5,001 to 10,000 shares, plus USD 85 for each further 10,000 or part of 10,000. Assumed par value capital: gross assets divided by issued shares, times authorized shares, then USD 400 per million or part of a million, with a USD 400 minimum.',
            },
            {
              slug: 'entity-memo',
              title: 'Write an entity memo',
              prompt:
                'Write a one-page memo for three cases, recommending an entity and state for each: a two-person consulting firm with steady profit; a software startup planning a seed round; and a non-US founder selling to US customers. List the questions you would take to a lawyer and an accountant. Do not state anything you have not checked against a source.',
              kind: 'writing',
              difficulty: 2,
            },
            {
              slug: 'lookup-your-state',
              title: 'Look up your own state',
              prompt:
                'For the US state you live in, find from official sources the filing fee to form a corporation and an LLC, any annual fee or minimum tax, and the rules for a foreign corporation. Record the URL and the date you checked. Compare the total first-two-year cost of forming in your state with forming in Delaware and qualifying at home.',
              kind: 'reading',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'Why can a venture fund generally not invest in an S corporation?',
              answerOutline:
                'An S corporation may have only one class of stock and generally only individual shareholders, so a fund cannot hold preferred shares in one.',
            },
            {
              question: 'A notice shows USD 85,165 of Delaware franchise tax for 10,000,000 authorized shares. What should you do?',
              answerOutline:
                'Recompute with the Assumed Par Value Capital method using gross assets and issued shares, which is often the USD 400 minimum for a young company, then pay the lower amount and the USD 50 report fee.',
            },
            {
              question: 'When might an LLC beat a C corporation?',
              answerOutline:
                'A profitable company not planning venture capital, where pass-through avoids double taxation and owners can use losses. Taking advice is sensible.',
            },
          ],
          quiz: [
            {
              question: 'A Delaware startup has 5,000,000 authorized shares (all with a tiny par value), 4,000,000 issued shares and USD 200,000 of gross assets. What is the lower of the two franchise tax figures, before the USD 50 report fee?',
              options: ['USD 42,665', 'USD 400', 'USD 175', 'USD 100'],
              answer: 1,
              explanation:
                'Authorized shares method: $250 + 85 \\times 499 = 42{,}665$. Assumed par value capital: $200{,}000 / 4{,}000{,}000 = 0.05$ a share, times 5,000,000 authorized shares, is USD 250,000. That is a quarter of a million, so the tax would be USD 100, but the method\'s minimum is USD 400. USD 100 forgets the minimum, and USD 175 is the minimum of the *other* method.',
            },
            {
              question: 'Two consultants run a steadily profitable advisory firm and have no plan to raise venture capital. Which structure does the lesson suggest is often the better fit?',
              options: [
                'A Delaware C corporation, because investors expect one',
                'An S corporation, part-owned by a venture fund',
                'An LLC, whose profits pass through to the owners\' returns',
                'A sole proprietorship, which still shields them from the firm\'s debts',
              ],
              answer: 2,
              explanation:
                'Without venture funding, a C corporation\'s double taxation and paperwork buy little, and pass-through taxation suits a profitable service firm. A venture fund cannot own S corporation stock, and a sole proprietorship gives no liability shield. They should still take advice on their own facts.',
            },
          ],
        },
        {
          slug: 'founder-equity-and-vesting',
          title: 'Founder equity and vesting',
          summary:
            'How shares are authorized and issued, what vesting and a cliff really do, how acceleration works, and what investors change later.',
          estimatedMinutes: 100,
          objectives: [
            'Explain authorized shares, issued shares, par value and fully diluted count',
            'Compute vested shares on a four-year schedule with a one-year cliff',
            'Explain how a repurchase right works with founder stock',
            'Compare single-trigger and double-trigger acceleration',
            'Explain why founders should issue shares early and pay for them properly',
          ],
          concepts: [
            'Authorized and issued shares',
            'Par value',
            'Restricted stock',
            'Vesting',
            'Cliff',
            'Repurchase right',
            'Single and double trigger acceleration',
            'Fully diluted capitalization',
          ],
          explanation: `*US practice as of 2 November 2026. Education, not legal advice.*

Your company's charter, the **certificate of incorporation**, states how many shares are **authorized**, meaning available to issue. **Issued** shares are those actually sold. A common pattern is 10,000,000 authorized, with 8,000,000 to 9,000,000 issued to founders, and the rest held back for an option pool. The number is arbitrary: only percentages matter. **Par value** is a nominal legal price, often USD 0.00001 a share. **Fully diluted** count includes issued shares plus all options and reserved pool shares, and it is the basis for ownership percentages in financing.

**Founder shares are usually restricted stock.** You buy them outright, now, at a very low price, so you own and vote them immediately. **Vesting** gives the company a **repurchase right** over unvested shares: if you leave, it can buy them back at what you paid.

The market standard is four years with a one-year **cliff**: nothing vests for 12 months, then a quarter vests at once, and the rest monthly. For a founder with 4,000,000 shares:

| Months of service | Vested | Company can repurchase |
|---|---|---|
| 9 | 0 | 4,000,000 |
| 12 | 1,000,000 | 3,000,000 |
| 13 | 1,083,333 | 2,916,667 |
| 30 | 2,500,000 | 1,500,000 |
| 48 | 4,000,000 | 0 |

The founder who leaves at month 9 gets nothing, which protects the others from dead equity. Four years and a one-year cliff is a convention, not law. Founders can give themselves credit for time already worked.

**Acceleration** speeds up vesting. **Single trigger** vests shares on one event, usually a sale of the company. **Double trigger** needs two events, usually a sale and then termination without cause within a set period. Investors and buyers tend to resist single-trigger terms, because an acquirer wants the team to keep earning its shares after the deal, and may reduce its price if they do not. Double trigger is more common and is a reasonable thing for a founder to ask for.

**Issue shares early and pay for them.** If shares are bought before the company has value, a tiny price equals fair market value and there is no tax. Delay until after you have raised money or won customers, and the same low price looks like a discount, which is taxable compensation. Cooley GO stresses the same point. Founders usually pay with a small amount of cash and an assignment of their existing intellectual property, as the next lessons explain. Document everything through board and stockholder consents, and record it in a **stock ledger**.

**What changes when investors arrive.** If you did not impose vesting, a seed or Series A investor will usually ask you to, or to reset part of your schedule. Negotiate credit for time served. The IRS's Revenue Ruling 2007-49 says that adding restrictions to already vested stock is not a transfer under section 83, so no election is needed in that plain case, though exchanges of stock in a reorganisation are treated differently. Many lawyers file a protective election anyway, so ask yours.`,
          resources: [
            { title: "Founder's Stock, Vesting and Founder Departures", url: 'https://www.cooleygo.com/founder-basics-founders-stock/', type: 'article', cost: 'free', provider: 'Cooley GO', primary: true },
            { title: 'Post-Incorporation Checklist: 10 Next Steps to Consider', url: 'https://www.cooleygo.com/post-incorporation-checklist-10-next-steps-consider/', type: 'article', cost: 'free', provider: 'Cooley GO' },
            { title: 'Revenue Ruling 2007-49', url: 'https://www.irs.gov/pub/irs-drop/rr-07-49.pdf', type: 'documentation', cost: 'free', provider: 'US Internal Revenue Service', note: 'Read Situation 1 for vesting added to vested stock.' },
          ],
          exercises: [
            {
              slug: 'vesting-function',
              title: 'Build a vesting schedule',
              prompt:
                'Build a 48-row vesting schedule in a spreadsheet for 4,000,000 shares on four years with a one-year cliff: month number, vest date, cumulative vested shares and shares the company could still repurchase. Compute the cumulative figure as total times months served divided by 48, rounded down, so that each month\'s slice is the difference between two rounded totals and no share is lost: month 48 must show exactly 4,000,000. Check the lesson\'s table. Then take a start date of 31 January 2027 and write out the vest dates for months 12, 13 and 14, using the last day of the month when the 31st does not exist. Say why the agreement, not you, should settle that convention.',
              kind: 'problem',
              difficulty: 2,
              hint: 'Month 13 is 4,000,000 × 13 / 48 = 1,083,333.33, so 1,083,333. The dates are 31 January 2028, 29 February 2028 (2028 is a leap year) and 31 March 2028.',
            },
            {
              slug: 'departure-scenarios',
              title: 'Work through departures',
              prompt:
                'Three founders each hold 3,000,000 shares bought at USD 0.00001, vesting over 48 months with a 12-month cliff. Founder C leaves at month 20. Compute C\'s vested shares, the repurchase price paid, and each person\'s fully diluted ownership afterwards, assuming a 1,000,000 share unissued pool and that repurchased shares are retired. Then repeat with no vesting. Explain the difference.',
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'acceleration-negotiation',
              title: 'Argue acceleration',
              prompt:
                'Write the case a founder would make for double-trigger acceleration, and the case an acquirer would make against any acceleration, in about 120 words each. Then draft a two-sentence definition of the second trigger, and list the words a lawyer would want to tighten.',
              kind: 'writing',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'A founder bought 4,000,000 shares and has served 30 months on the standard schedule. How many are vested?',
              answerOutline: '30/48 of 4,000,000 = 2,500,000.',
            },
            {
              question: 'What happens at the cliff, and what is it for?',
              answerOutline:
                'Nothing vests until 12 months, then 25% vests at once. It stops someone who leaves early from keeping equity.',
            },
            {
              question: 'Why do buyers dislike single-trigger acceleration?',
              answerOutline:
                'The team becomes fully vested on the sale, so the buyer loses the incentive for them to stay and may reduce its price or demand re-vesting.',
            },
          ],
          quiz: [
            {
              question: 'A founder holds 3,600,000 shares on the standard schedule: four years, a one-year cliff, then monthly. How many are vested after 20 months?',
              options: ['1,500,000', '900,000', '1,800,000', '0'],
              answer: 0,
              explanation:
                'Past the cliff, vesting is in proportion to months served: $3{,}600{,}000 \\times 20/48 = 1{,}500{,}000$. 900,000 is only the quarter that vests at the cliff, ignoring the eight monthly slices since. Zero would be right only before month 12.',
            },
            {
              question: 'A founder has **double-trigger** acceleration. The company is sold, and she stays on with the buyer and is not let go. What happens to her unvested shares?',
              options: [
                'They all vest at the sale',
                'Half of them vest at the sale',
                'The buyer repurchases them at her original price',
                'Nothing accelerates yet: they keep vesting, and accelerate only if she is also terminated without cause within the agreed period',
              ],
              answer: 3,
              explanation:
                'Double trigger needs two events, usually the sale *and* a termination without cause within a set period. The sale alone is one trigger, so her schedule simply continues. Vesting everything at the sale is single trigger, which buyers resist because it removes the reason to stay.',
            },
          ],
        },
        {
          slug: 'the-83b-election',
          title: 'The 83(b) election',
          summary:
            'A 30-day deadline with no extensions. Learn what the election does, how to file it, and how missing it can tax you on stock you cannot sell.',
          estimatedMinutes: 90,
          objectives: [
            'Explain what section 83 does to shares that vest',
            'Compute the income without an election as shares vest',
            'State the 30-day deadline and how a weekend or holiday affects it',
            'File correctly by mail or online and keep proof',
            'Say when the election is a bad idea or unnecessary',
          ],
          concepts: [
            'Section 83(b)',
            'Substantially nonvested property',
            'Fair market value',
            'Ordinary income',
            'Form 15620',
            'Holding period',
            'IRC section 7503',
          ],
          explanation: `*US federal tax as of 2 November 2026. Education, not tax advice. Talk to a tax professional before relying on this.*

Under Internal Revenue Code section 83, when you receive property for services and it is **substantially nonvested** (you could lose it), you normally owe no tax at transfer. Instead, as each slice vests, you have **ordinary income** equal to its fair market value at that moment minus what you paid. As the company's value rises, that gets painful.

**Example.** You buy 4,000,000 shares for USD 0.00001 each, USD 40 in total. At your 12-month cliff, 1,000,000 shares vest, and suppose the shares are now worth USD 0.10 after a financing. Without an election, you have USD 99,990 of ordinary income in that year, on shares you cannot sell. At an illustrative 37% rate that is USD 36,996 of federal tax with no cash from the shares, and more comes due each month as further shares vest. If you are an employee, payroll withholding also applies.

**The election.** Section 83(b) lets you choose to be taxed at the time of transfer instead. If you paid fair market value, the income is zero. Later vesting is ignored. When you sell, gain is capital gain, usually taxed at lower long-term rates once held over a year, and the holding period starts at transfer. This is also what starts the clock for qualified small business stock.

**The deadline is absolute.** Treasury regulation 1.83-2(b) requires filing not later than 30 days after the date of transfer. It counts calendar days, and there is no extension and no late-filing relief. The IRS's instructions cite section 7503: if the thirtieth day falls on a Saturday, Sunday or legal holiday, the election is timely if postmarked by the next day that is not. For a transfer on 15 January 2027, day 30 is Sunday 14 February. Monday 15 February is Presidents' Day, so the last day is Tuesday 16 February. Do not plan around that. File in the first week.

**How to file.** Use **Form 15620** (Rev. April 2025) or a written statement meeting the regulation. Form 15620's own instructions say to mail it to the IRS office where you file your return. The IRS's Mobile-friendly forms page also lists Form 15620, requiring an IRS Online Account, and says you may submit online or download a copy to mail. A 2025 Goodwin client alert advises using only one method. If you mail it, use certified mail with a return receipt and keep a stamped copy. You must also give a copy to the company. The regulation does not require you to attach a copy to your tax return. You will need a taxpayer ID number, so a non-US founder must plan ahead.

**Revocation.** You cannot revoke it without IRS consent, which requires a mistake of fact about the transaction. A fall in value does not qualify.

**When it does not apply or hurts.** Fully vested stock needs no election. If you pay less than fair market value, you owe tax now on the difference, and if shares are later forfeited, you generally get no refund of tax paid. For founders buying at near-zero value, the downside is tiny. For an early employee exercising options when the shares have real value, it needs thought. Missing the deadline is a common and expensive error, and investors' lawyers check for it in due diligence.`,
          resources: [
            { title: 'Form 15620, Section 83(b) Election (with instructions)', url: 'https://www.irs.gov/pub/irs-pdf/f15620.pdf', type: 'documentation', cost: 'free', provider: 'US Internal Revenue Service', note: 'Read the second page of instructions. Rev. April 2025.', primary: true },
            { title: 'Mobile-friendly forms', url: 'https://www.irs.gov/forms-pubs/mobile-friendly-forms', type: 'documentation', cost: 'free', provider: 'US Internal Revenue Service', note: 'Lists Form 15620 and explains online submission through an IRS Online Account.' },
            { title: '26 CFR 1.83-2: Election to include in gross income in year of transfer', url: 'https://www.law.cornell.edu/cfr/text/26/1.83-2', type: 'documentation', cost: 'free', provider: 'Cornell Legal Information Institute' },
            { title: 'Definition of Section 83(b) Election', url: 'https://www.cooleygo.com/glossary/section-83b-election/', type: 'article', cost: 'free', provider: 'Cooley GO' },
          ],
          exercises: [
            {
              slug: 'deadline-calculator',
              title: 'Work out 83(b) deadlines on a calendar',
              prompt:
                'With a calendar, work out the last day to file for three transfer dates: add 30 calendar days, then move forward past any Saturday, Sunday or federal legal holiday. Check two cases: 15 January 2027 gives Tuesday 16 February 2027, and 2 December 2026 gives Monday 4 January 2027, because 1 January is a holiday and the next two days are a weekend. Then do 8 April 2027 yourself, and for each case write the date in the first week by which you would actually file. Note beside your answers that this is a planning aid only.',
              kind: 'problem',
              difficulty: 1,
              hint: 'Day 1 is the day after the transfer. A spreadsheet can check the arithmetic: a date plus 30 is 30 days later, and a weekday function tells you if it is a weekend.',
            },
            {
              slug: 'with-and-without',
              title: 'Compare with and without the election',
              prompt:
                'A founder buys 3,000,000 shares at USD 0.00001, vesting monthly over 36 months with no cliff. Fair market value per share is USD 0.00001 in year 1, USD 0.20 in year 2 and USD 1.00 in year 3. Compute ordinary income per year without an election, and with an election at transfer. Assume a 35% tax rate, and report the cash the founder would need each year. State what simplifications you made.',
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'filing-checklist',
              title: 'Write a filing checklist',
              prompt:
                'Using the actual Form 15620 and its instructions, write a checklist a founder could follow: which boxes need which facts, what is signed, where it goes, what copy goes to the company and what proof to keep. Do not include a mailing address from memory. Say where to look it up. Fill in the form with fictional details for practice, and do not file it.',
              kind: 'reading',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'What is the 83(b) deadline, and can it be extended?',
              answerOutline:
                'Not later than 30 days after the date of transfer. There is no extension. Section 7503 moves the last day forward if day 30 falls on a weekend or legal holiday.',
            },
            {
              question: 'Why can missing the election create tax with no cash?',
              answerOutline:
                'Shares are taxed as ordinary income at their value when they vest, but they are illiquid, so you owe tax on paper value and cannot sell to pay it.',
            },
            {
              question: 'Do you need an 83(b) election for fully vested stock?',
              answerOutline: 'No. The election applies to substantially nonvested property. Fully vested stock is taxed at transfer anyway.',
            },
            {
              question: 'Name two valid ways to file as of November 2026.',
              answerOutline:
                'By mailing Form 15620 or a compliant written statement to the proper IRS office, or submitting Form 15620 online through an IRS Online Account. Use one only, and give a copy to the company.',
            },
          ],
          quiz: [
            {
              question: 'Founder shares are transferred on Thursday 8 April 2027. Under the regulation\'s 30-day rule and section 7503, what is the last day an 83(b) election is timely?',
              options: ['Friday 7 May 2027', 'Saturday 8 May 2027', 'Monday 10 May 2027', 'Tuesday 8 June 2027'],
              answer: 2,
              explanation:
                'Thirty calendar days after 8 April is Saturday 8 May. Because day 30 falls on a weekend, section 7503 moves the last day to the next day that is not a Saturday, Sunday or legal holiday: Monday 10 May. Friday 7 May counts the transfer day itself as day 1. Knowing the last day is not a plan: file in the first week.',
            },
            {
              question: 'A founder buys 2,000,000 shares at USD 0.0001 each with **no** 83(b) election. At the cliff, 500,000 shares vest when they are worth USD 0.50 each. How much ordinary income does she have from that vesting?',
              options: ['USD 250,000', 'USD 249,950', 'USD 0', 'USD 999,800'],
              answer: 1,
              explanation:
                'Without an election, each slice is income when it vests: value minus price paid, $500{,}000 \\times (0.50 - 0.0001) = 249{,}950$. USD 250,000 forgets the USD 50 she paid for those shares. USD 999,800 taxes all 2,000,000 shares, but only the vested slice counts now, and more income follows as the rest vests. With a timely election at a fair price, the income would have been zero.',
            },
          ],
        },
        {
          slug: 'ip-banking-and-compliance',
          title: 'Intellectual property, banking and basic compliance',
          summary:
            'Make sure the company owns what it sells, set up banking safely, and meet the filings that apply today, including the change in beneficial ownership reporting.',
          estimatedMinutes: 100,
          objectives: [
            'Assign founder and contractor intellectual property to the company',
            'Explain why a contractor owns code by default without a written assignment',
            'List the first filings and accounts for a new corporation',
            'Explain FDIC limits and bank concentration risk',
            'State the status of beneficial ownership reporting as of November 2026',
            'Say when to hire a lawyer and an accountant',
          ],
          concepts: [
            'Technology assignment agreement',
            'Invention assignment agreement',
            'Work made for hire',
            'Open-source licence compliance',
            'Trademark',
            'Employer Identification Number',
            'FDIC insurance limit',
            'Beneficial ownership reporting',
          ],
          explanation: `*US law as of 2 November 2026. Education, not legal advice.*

**The company must own its intellectual property (IP).** IP includes code, designs, inventions and brand. Investors and acquirers check this first, because a gap can stop a deal.

- **Founders** sign a **technology assignment agreement** that moves everything already created for the business into the company, often as part of paying for their shares. Cooley GO advises doing this at the initial stock issuance.
- **Employees** sign an agreement assigning inventions and promising confidentiality. In California, Labor Code section 2870 limits how far such a clause can reach.
- **Contractors** are the trap. Under 17 USC 101, a work is **made for hire** if an employee made it within their job, or if it is a specially commissioned work in a listed category with a signed writing. Software usually fits neither when written by a contractor. So a freelancer who writes your app generally owns the copyright unless you have a signed assignment.
- **Prior employers** may own what you built on their time or laptop, as discussed in Module 1.
- **Open source:** know each licence. Some, such as the GPL, can impose duties on what you distribute.
- **Trademark:** search before naming the company. The US Patent and Trademark Office explains registration. Patents have strict timing, and public disclosure can harm rights abroad, so see a patent lawyer before announcing a real invention.

**First steps after incorporating.** The order below is typical: adopt bylaws and appoint directors and officers; issue founder stock with vesting and file 83(b) elections; sign IP assignments; get an **Employer Identification Number** (EIN) free from the IRS; open a bank account; qualify in your home state; and set up bookkeeping. Keep minutes and a share ledger from the start. Never mix personal and company money, which risks your liability shield.

**Banking.** FDIC insurance covers USD 250,000 per depositor, per insured bank, per ownership category. A company with USD 3 million in one bank is mostly uninsured. When Silicon Valley Bank failed in March 2023, regulators ended up protecting all its depositors, which you cannot count on. Ask about insured sweep programmes or use several banks.

**Beneficial ownership reporting.** The Corporate Transparency Act of 2021 led to a rule from the Treasury's Financial Crimes Enforcement Network (FinCEN) requiring most small companies to report their owners. That has changed. FinCEN's final rule, published 14 August 2026 and effective that day, makes permanent the March 2025 interim rule: companies created in the United States, and US persons, are exempt, and only certain foreign companies registered to do business in a US state must report. FinCEN's page gives foreign reporting companies 30 calendar days after their US registration takes effect. FinCEN has warned of fraud schemes around these filings, so be suspicious of anyone demanding a fee or a form. States can have their own rules, and New York's LLC Transparency Act has changed scope more than once, so check your state.

**Hire help.** Use a startup lawyer for formation, financing, employment and IP. Use an accountant for tax returns, bookkeeping and any R&D credits. Online services, such as Cooley GO's document generators, are helpful for simple cases, but they do not file your 83(b) election, and they cannot tell you about your specific facts.`,
          resources: [
            { title: 'Post-Incorporation Checklist: 10 Next Steps to Consider', url: 'https://www.cooleygo.com/post-incorporation-checklist-10-next-steps-consider/', type: 'article', cost: 'free', provider: 'Cooley GO', primary: true },
            { title: 'Beneficial Ownership Information Reporting', url: 'https://www.fincen.gov/boi', type: 'documentation', cost: 'free', provider: 'FinCEN', note: 'Check here for the current status before relying on this lesson.' },
            { title: 'Beneficial Ownership Information Reporting Requirement Revision (final rule)', url: 'https://www.federalregister.gov/documents/2026/08/14/2026-16576/beneficial-ownership-information-reporting-requirement-revision', type: 'documentation', cost: 'free', provider: 'Federal Register' },
            { title: 'Get an employer identification number', url: 'https://www.irs.gov/businesses/small-businesses-self-employed/get-an-employer-identification-number', type: 'documentation', cost: 'free', provider: 'US Internal Revenue Service' },
            { title: 'Deposit Insurance', url: 'https://www.fdic.gov/resources/deposit-insurance/', type: 'documentation', cost: 'free', provider: 'FDIC' },
          ],
          exercises: [
            {
              slug: 'ip-audit',
              title: 'Run an IP audit',
              prompt:
                'For a fictional company with two founders, a past employer for one of them, a freelance designer, an unpaid friend who wrote some code, and open-source dependencies, list what could be owned by someone else. For each, write what document fixes it and who must sign. Rank by how likely each is to stop a financing.',
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'first-30-days',
              title: 'Write a first 30 days calendar',
              prompt:
                'Create a dated calendar from incorporation on a date you choose: consents, stock issuance, 83(b) deadlines computed by date, IP assignment, EIN, bank account and home-state registration. Add the first Delaware franchise tax date. Say which steps depend on which, and which need a professional.',
              kind: 'writing',
              difficulty: 1,
            },
            {
              slug: 'boi-status-check',
              title: 'Check a fast-changing rule yourself',
              prompt:
                'Open FinCEN\'s beneficial ownership page and the Federal Register entry for the final rule. In your own words, state who must file today, who is exempt and any dates. Then look up the current status of the New York LLC Transparency Act from the New York Department of State, and state which LLCs it covers today. Record the URLs and the date you looked, and note where sources disagree.',
              kind: 'reading',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'A freelancer wrote your first app with no written contract. Who likely owns the copyright?',
              answerOutline:
                'The freelancer. Commissioned software rarely qualifies as a work made for hire, so you need a signed assignment.',
            },
            {
              question: 'As of November 2026, must a US-created startup file a beneficial ownership report with FinCEN?',
              answerOutline:
                'No. The final rule effective 14 August 2026 exempts companies created in the US and US persons. Only certain foreign companies registered in the US report. Check FinCEN for changes and check state law.',
            },
            {
              question: 'Your company keeps USD 2 million in one account. What is the risk, and what can you do?',
              answerOutline:
                'Only USD 250,000 per depositor per bank per ownership category is FDIC insured. Spread funds or use an insured sweep programme.',
            },
          ],
          quiz: [
            {
              question: 'A freelancer built your app under an emailed quote. You paid every invoice in full, but nobody signed anything about intellectual property. Who most likely owns the copyright in the code?',
              options: [
                'The company, because it paid in full',
                'The company, because commissioned software is a work made for hire',
                'The company and the freelancer jointly',
                'The freelancer, until they sign a written assignment to the company',
              ],
              answer: 3,
              explanation:
                'Under 17 USC 101 a contractor\'s software rarely qualifies as a work made for hire: it is not an employee\'s work, and software is usually not in the listed categories that a signed writing can cover. Paying for the work does not move the copyright. A signed assignment does, which is why investors check for one.',
            },
            {
              question: 'Your company keeps USD 1.6 million in one account at one FDIC-insured bank, in a single ownership category. How much of it is insured?',
              options: ['USD 250,000', 'USD 1.6 million', 'USD 500,000', 'None, because business deposits are not covered'],
              answer: 0,
              explanation:
                'Cover is USD 250,000 per depositor, per insured bank, per ownership category, so USD 1.35 million is uninsured. In the Silicon Valley Bank failure regulators protected everyone, but the lesson\'s point is that you cannot count on that. Spread the money or use an insured sweep programme.',
            },
          ],
        },
      ],
    },
    {
      slug: 'funding-options',
      title: 'Funding Options and How They Work',
      description:
        'Every main source of money, what each really costs, and the mechanics of SAFEs, convertible notes, priced rounds, option pools and dilution, worked through with numbers.',
      lessons: [
        {
          slug: 'money-without-venture-capital',
          title: 'Bootstrapping, grants, debt and friends and family',
          summary:
            'Most companies never raise venture capital, and many should not. Compare customer funding, grants, loans, revenue-based finance and crowdfunding, and what each really costs.',
          estimatedMinutes: 110,
          objectives: [
            'Explain how bootstrapping works and when it is the stronger choice',
            'Describe SBIR and STTR and state their status as of November 2026',
            'Compare SBA loans, venture debt and revenue-based finance',
            'Compute the cost of a revenue-based finance deal',
            'List the risks of taking money from friends and family',
          ],
          concepts: [
            'Bootstrapping',
            'Non-dilutive capital',
            'SBIR and STTR',
            'SBA 7(a) loan',
            'Personal guarantee',
            'Venture debt',
            'Revenue-based financing',
            'Regulation Crowdfunding',
          ],
          explanation: `*US programmes as of 2 November 2026. Rules and amounts change, so check each agency's current terms.*

Under 0.5% of new US firms receive venture capital, according to Lerner and Nanda's 2020 review, citing Puri and Zarutskie. So the normal case is a company funded some other way.

**Bootstrapping** means funding the company from savings and customer revenue. You keep ownership and control, and you must reach profitability sooner. Customers can fund you through upfront annual payments, deposits or paid pilots. Mailchimp is the famous case: it never raised venture capital and sold to Intuit for about USD 12 billion in 2021. That is an exception too, so do not treat it as typical. Bootstrapping is much harder for hardware, drug discovery or anything with years of cost before revenue. It can lose a race where a funded rival is buying the market, though few markets are races. 37signals (Basecamp) argues this view in Getting Real and elsewhere.

**Non-dilutive capital** means money that takes no ownership.

- **SBIR and STTR** are US federal programmes that fund research by small businesses. After lapsing on 30 September 2025, they were reauthorised when the Small Business Innovation and Economic Security Act (S. 3971) was signed on 13 April 2026, running through 30 September 2031. SBIR.gov describes Phase I as USD 50,000 to 275,000 for 6-12 months and Phase II as USD 750,000 to 1.8 million for 24 months, though agencies vary and the new law changed some rules, so read each current solicitation. Awards are slow and competitive, and suit real research.
- **State and foundation grants** exist but vary widely.

**Debt** must be repaid whether or not you succeed.

- **SBA 7(a) loans** are bank loans partly guaranteed by the US Small Business Administration, up to USD 5 million per the SBA as of its March 2026 page. Lenders normally look for operating history, and owners usually sign **personal guarantees**. **Microloans** go up to USD 50,000.
- **Venture debt** is lending to venture-backed companies, usually just after an equity round and with **warrants**, rights to buy shares. It extends runway. It also adds repayment pressure at the worst time.
- **Revenue-based financing** gives you cash and takes a share of monthly revenue until a fixed total is repaid. Suppose you receive USD 300,000, repay 1.5x (USD 450,000) and pay 10% of revenue. On a steady USD 100,000 of monthly revenue, you pay USD 10,000 a month for 45 months. The cost is USD 150,000 in fees, and the faster you grow, the sooner you pay it, so the effective annual rate rises as you succeed.

**Friends and family.** Their money comes quickly and with love attached. Sale of a SAFE or a share to your aunt is still a securities sale, so the rules in Module 7 apply. Many friends are not accredited investors. Tell people plainly that they should expect to lose all of it, and take only what they can lose without resentment.

**Crowdfunding.** Regulation Crowdfunding allows offerings up to USD 5 million in 12 months through a registered portal, per the SEC, with disclosure requirements. Rewards platforms like Kickstarter are pre-sales, not securities.

Comparing these requires one question: what does each option cost if you do well, and what does it cost if you fail? Equity costs nothing if you fail. Debt can follow you, especially with a personal guarantee.`,
          resources: [
            { title: 'SBA press release: SBIR-STTR reauthorization', url: 'https://legacy.sba.gov/article/2026/04/13/administrator-loeffler-applauds-sbir-sttr-reauthorization', type: 'documentation', cost: 'free', provider: 'US Small Business Administration', note: 'The dated source for the April 2026 reauthorization.', primary: true },
            { title: 'About SBIR', url: 'https://www.sbir.gov/about', type: 'documentation', cost: 'free', provider: 'SBIR.gov', note: 'Check current solicitations and eligibility here.' },
            { title: '7(a) loans', url: 'https://www.sba.gov/funding-programs/loans/7a-loans', type: 'documentation', cost: 'free', provider: 'US Small Business Administration' },
            { title: 'Exempt offerings', url: 'https://www.sec.gov/resources-small-businesses/exempt-offerings', type: 'documentation', cost: 'free', provider: 'US Securities and Exchange Commission', note: 'Crowdfunding and other limits. The SEC blocks automated downloads, so use a browser.' },
            { title: 'Getting Real', url: 'https://basecamp.com/gettingreal', type: 'textbook', cost: 'free', provider: '37signals', note: 'The case for small, profitable software companies.' },
          ],
          exercises: [
            {
              slug: 'rbf-cost',
              title: 'Compute a revenue-based finance cost',
              prompt:
                'A company receives USD 300,000, must repay USD 450,000 and pays 10% of monthly revenue. Revenue is USD 100,000 in month 1 and then grows at 0%, 3% or 6% a month. In a spreadsheet, make one row per month with revenue, the payment (10% of revenue, or whatever is left of the USD 450,000 if that is less) and the balance still owed, and report the months to repay in each case. Then put the cash flows in one column (plus 300,000 at month 0, minus each payment after) and use the spreadsheet\'s IRR function to get a monthly rate, and convert it to an annual rate. Explain why the rate rises with growth.',
              kind: 'problem',
              difficulty: 2,
              hint: 'Check: 45, 29 and 23 months. The annual rate is (1 + monthly IRR) to the power 12, minus 1: about 25%, 35% and 43%.',
            },
            {
              slug: 'funding-fit',
              title: 'Match funding to five companies',
              prompt:
                'Recommend a primary funding source for: a local bakery, a university biotech spinout, a profitable software tool with USD 20,000 monthly revenue, a marketplace in a winner-take-most market, and a hardware device with pre-orders. For each, say what you ruled out and why. Say what each option costs if the company fails.',
              kind: 'writing',
              difficulty: 2,
            },
            {
              slug: 'read-a-solicitation',
              title: 'Read a real SBIR solicitation',
              prompt:
                'Find a current SBIR or STTR solicitation from one agency, using SBIR.gov. Record the topic, award size, deadline, eligibility rules, and what the reauthorization changed if the solicitation says. Estimate the hours you would need to apply. Decide whether it would be a good use of time for a two-person company, and say why.',
              kind: 'reading',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Are SBIR and STTR authorised as of November 2026?',
              answerOutline:
                'Yes. They lapsed on 30 September 2025 and were reauthorised on 13 April 2026 through 30 September 2031 by S. 3971.',
            },
            {
              question: 'What is the main risk of a personal guarantee?',
              answerOutline:
                'You owe the debt personally if the company fails, which removes limited liability for that debt and can reach your savings or home.',
            },
            {
              question: 'Why does revenue-based finance get more expensive as you grow faster?',
              answerOutline:
                'The total repayment is fixed, so faster revenue repays the same fee over a shorter time, raising the effective annual rate.',
            },
          ],
          quiz: [
            {
              question: 'A revenue-based finance deal gives you USD 200,000. You repay 1.4x in total by paying 8% of monthly revenue, which stays at USD 50,000. How many months does repayment take?',
              options: ['50', '35', '70', '56'],
              answer: 2,
              explanation:
                'You owe $200{,}000 \\times 1.4 = 280{,}000$ and pay $8\\% \\times 50{,}000 = 4{,}000$ a month, so $280{,}000 / 4{,}000 = 70$ months. Fifty months repays only the USD 200,000 received and forgets the USD 80,000 fee. If revenue grew, the same fee would be paid sooner, at a higher annual rate.',
            },
            {
              question: 'Which of these can cost a founder most personally if the company fails?',
              options: [
                'A SAFE sold to an angel investor',
                'An SBA loan the founder signed a personal guarantee for',
                'An SBIR Phase I award',
                'Selling 10% of the company to a friend for cash',
              ],
              answer: 1,
              explanation:
                'Equity and SAFEs cost nothing if the company fails: the investor simply loses the money. A grant is not repaid. A personal guarantee makes the founder liable for the loan, which can reach savings or a home. That is why the lesson asks what each option costs if you fail, not only if you succeed.',
            },
          ],
        },
        {
          slug: 'angels-and-accelerators',
          title: 'Angels and accelerators',
          summary:
            'Who angel investors are, the accredited investor rules that govern them, and what the YC and Techstars deals actually cost in ownership.',
          estimatedMinutes: 90,
          objectives: [
            'Define an angel investor and the accredited investor tests',
            'Compute the ownership cost of an accelerator deal',
            'Explain an uncapped MFN SAFE',
            'Weigh what an accelerator offers, with the evidence',
            'Evaluate whether a given angel adds value beyond money',
          ],
          concepts: [
            'Angel investor',
            'Accredited investor',
            'Accelerator',
            'Syndicate',
            'Most favoured nation clause',
            'Post-money ownership',
            'Selection versus treatment',
          ],
          explanation: `*Rules and published deal terms as of 2 November 2026. Accelerator terms change often, so read the current page.*

An **angel investor** is an individual who invests personal money in early companies, usually with smaller cheques than a fund and with less process. Many are former founders or executives. A **syndicate** is a group of angels investing together, often through a single vehicle.

**Accredited investors.** Federal securities rules treat some people as able to bear the risk of private investments. Under Rule 501(a) of Regulation D, a person is an **accredited investor** with net worth above USD 1,000,000, alone or with a spouse or spousal equivalent, not counting a primary residence; or with income above USD 200,000 (USD 300,000 jointly) in each of the last two years and a reasonable expectation of the same this year; or by holding a designated credential in good standing, which the SEC has set by order to include certain securities licences. On 30 September 2026 the SEC asked for comment on possibly designating others, such as the CPA licence, with comments due by 4 December 2026. That is a request for comment, and the definition has not changed. Module 7 explains why this matters when you sell.

**What to look for in an angel.** Reputation, speed, useful introductions and willingness to do what they promise. A slow or meddling angel costs more than the cheque is worth. Ask founders they backed, including those whose companies failed.

**Accelerators** are fixed-term programmes that invest small amounts for equity and provide advice, a peer group and an investor demo day.

Published terms at the time of writing:

| Programme | Total | Structure |
|---|---|---|
| Y Combinator | USD 500,000 | USD 125,000 on a post-money SAFE for 7%, plus USD 375,000 on an uncapped MFN SAFE |
| Techstars | USD 220,000 | USD 20,000 on a Post-Money Convertible Equity Agreement for 5% in common stock, plus USD 200,000 on an uncapped MFN SAFE |

The Techstars Asia-Pacific version differs. A SAFE, covered in the next lessons, is a right to future shares. **MFN**, for most favoured nation, means the instrument automatically takes the terms of the best SAFE issued later, up to the priced round. So YC's USD 375,000 has no price until you raise. YC's page gives the example that at a USD 15 million post-money cap it converts into 2.5%, and with the 7% that is 9.5%.

The YC USD 125,000 for 7% implies a post-money valuation of about USD 1.79 million, and the Techstars USD 20,000 for 5% implies USD 400,000, far lower than a seed round. The argument for accepting that is that the programme adds more than its cost, and that is a judgement.

**Do accelerators work?** Selection is the difficulty, because top programmes pick strong teams that might have done well anyway. Hallen, Cohen and Bingham (Organization Science, 2020) compared ventures accepted to and narrowly rejected by top accelerators, and found that some but not all accelerate development, along with some evidence of sorting. Gonzalez-Uribe and Leatherbee found, studying Start-Up Chile, that schooling had an effect where basic services alone did not. So: some programmes help, and the name on the door varies widely in value. Many so-called accelerators offer little and a few charge fees, so be careful with any that asks you to pay.`,
          resources: [
            { title: 'YC Standard Deal', url: 'https://www.ycombinator.com/deal', type: 'documentation', cost: 'free', provider: 'Y Combinator', note: 'Check current terms before relying on the table.', primary: true },
            { title: 'Techstars Investment Terms', url: 'https://www.techstars.com/investment-terms', type: 'documentation', cost: 'free', provider: 'Techstars' },
            { title: '17 CFR 230.501: definitions in Regulation D', url: 'https://www.law.cornell.edu/cfr/text/17/230.501', type: 'documentation', cost: 'free', provider: 'Cornell Legal Information Institute', note: 'Read paragraphs (a)(5), (a)(6) and (a)(10).' },
            { title: 'Accredited Investors: updated investor bulletin', url: 'https://www.investor.gov/introduction-investing/general-resources/news-alerts/alerts-bulletins/investor-bulletins/updated-3', type: 'documentation', cost: 'free', provider: 'Investor.gov (SEC)' },
          ],
          exercises: [
            {
              slug: 'accelerator-cost',
              title: 'Price an accelerator',
              prompt:
                'Using the published YC terms, compute total ownership sold if the next SAFE has a post-money cap of USD 10 million, USD 15 million, USD 25 million and USD 50 million. Do the same for Techstars\' published terms, with the USD 20,000 at 5% and the USD 200,000 MFN. Then estimate how much the programme must raise your eventual outcome to be worth it, and state your assumptions.',
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'accredited-tests',
              title: 'Apply the accredited investor tests',
              prompt:
                'Decide, citing the paragraph of Rule 501(a), whether each is accredited: a nurse with USD 150,000 income whose house is worth USD 2 million and who has USD 200,000 of savings; a couple earning USD 320,000 jointly for three years; an engineer earning USD 210,000 this year and USD 150,000 last year; and an adviser holding a Series 65 in good standing. Explain each.',
              kind: 'problem',
              difficulty: 1,
              hint: 'Exclude the primary residence from net worth, and check that the income test covers two prior years.',
            },
            {
              slug: 'reference-an-investor',
              title: 'Reference an investor',
              prompt:
                'Write the questions you would ask three founders backed by an angel you are considering. Include questions for a founder whose company failed. Say what would make you decline the money, and how you would ask politely.',
              kind: 'writing',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'What does USD 125,000 for 7% imply as a post-money valuation?',
              answerOutline: '125,000 / 0.07, about USD 1.79 million.',
            },
            {
              question: 'What does an uncapped MFN SAFE do?',
              answerOutline:
                'It has no cap of its own, and takes the best terms of SAFEs issued later, up to the priced round.',
            },
            {
              question: 'Has the accredited investor definition changed because of the SEC\'s 2026 notices?',
              answerOutline:
                'No. They are requests for comment on possible new designations, with comments due 4 December 2026. Nothing was adopted as of 2 November 2026.',
            },
          ],
          quiz: [
            {
              question: 'You take the YC deal in the lesson\'s table: USD 125,000 for 7% plus USD 375,000 on an uncapped MFN SAFE. Your next SAFE has a USD 25 million post-money cap. Roughly how much of the company have the YC investments bought in total, before any priced round?',
              options: ['8.5%', '1.5%', '9%', '9.5%'],
              answer: 0,
              explanation:
                'The MFN SAFE takes the later cap: $375{,}000 / 25{,}000{,}000 = 1.5\\%$, plus the 7%, gives 8.5%. 1.5% forgets the 7%. 9.5% is YC\'s own example at a USD 15 million cap, and 9% wrongly puts all USD 500,000 on the new cap and still adds the 7%.',
            },
            {
              question: 'An engineer earned USD 250,000 two years ago, USD 180,000 last year and expects USD 230,000 this year. Her net worth is USD 400,000 not counting her home, which is worth USD 900,000. Is she an accredited investor under Rule 501(a)?',
              options: [
                'Yes: her income has averaged over USD 200,000',
                'Yes: counting her home, her net worth is over USD 1 million',
                'Yes: she expects more than USD 200,000 this year',
                'No: her income was under USD 200,000 in one of the last two years, and her net worth excluding her home is under USD 1 million',
              ],
              answer: 3,
              explanation:
                'The income test needs more than USD 200,000 in *each* of the two most recent years, plus a reasonable expectation for this year, so last year\'s USD 180,000 fails it; averaging does not count. The net worth test excludes a primary residence, leaving USD 400,000. Unless she holds a qualifying licence, she is not accredited.',
            },
          ],
        },
        {
          slug: 'venture-capital-fund-economics',
          title: 'How venture capital funds work',
          summary:
            'Understanding 2-and-20, the power law and return targets explains nearly everything a VC does, including why a fund\'s size decides which companies it can back.',
          estimatedMinutes: 110,
          objectives: [
            'Explain general partners, limited partners, fund life, management fees and carried interest',
            'Compute what proceeds a fund needs for a 3x net return',
            'Explain the power law and show its effect in a portfolio',
            'Compute the exit a fund needs from one company',
            'Explain why a good company can be a bad fit for a large fund',
            'Read fund performance measures such as TVPI and DPI',
          ],
          concepts: [
            'General and limited partners',
            'Management fee and carried interest',
            'Power law',
            'Fund returner',
            'Ownership target',
            'Reserves',
            'TVPI and DPI',
          ],
          explanation: `A venture capital firm raises money into funds. Its partners, the **general partners** (GPs), invest money from **limited partners** (LPs), such as university endowments, pension funds and family offices. A fund usually runs about ten years, so they need to invest, and then return cash, within that time.

**2 and 20.** A typical fund charges a **management fee** of about 2% of committed capital per year and takes **carried interest** of 20% of profits after LPs get their capital back. Terms vary, and top firms charge more.

Take a USD 100 million fund. Fees over ten years at 2% are USD 20 million, leaving USD 80 million to invest, ignoring recycling of early returns. LPs hoping for 3x want USD 300 million back. With carry at 20% of profit, the fund must produce USD 350 million: profit of USD 250 million, of which GPs keep USD 50 million and LPs USD 200 million. That is 4.375x on the USD 80 million actually invested, a demanding number.

**The power law.** Returns are not bell-shaped. Chris Dixon, citing Horsley Bridge data on hundreds of funds since 1985, reported that about 6% of investments, representing 4.5% of dollars invested, produced about 60% of total returns. Here is an illustrative portfolio of 25 equal cheques, with multiples chosen for teaching:

| Companies | Multiple | Total, in units of one cheque |
|---|---|---|
| 15 | 0.2x | 3 |
| 6 | 2x | 12 |
| 2 | 6x | 12 |
| 1 | 15x | 15 |
| 1 | 40x | 40 |

The total is 82 units, or 3.28x. One company delivers 49% of the proceeds, and 60% of the companies lost money. So a VC cannot be satisfied with a company that might return 3x. Each investment must have a believable path to a huge outcome. This explains much behaviour founders find strange. It is arithmetic, not malice.

**Fund size decides what they can back.** Suppose a fund expects to own 10% at exit:

| Fund size | Needed for 3x net | Exit value at 10% ownership that returns the whole fund once |
|---|---|---|
| USD 30 million | USD 105 million | USD 300 million |
| USD 100 million | USD 350 million | USD 1 billion |
| USD 500 million | USD 1.75 billion | USD 5 billion |
| USD 1 billion | USD 3.5 billion | USD 10 billion |

A company that returns the whole fund on its own is called a **fund returner**. A USD 200 million sale is a life-changing success for a founder, but to a USD 1 billion fund owning 10%, USD 20 million is 2% of the fund. It does not matter. So ask about fund size early, and treat a pass from a big fund as a statement about their arithmetic, not your company. The incentive also explains pressure against an early sale, and why large funds want large ownership and may invest **reserves**, money held back for follow-on rounds.

**Do they deliver?** **TVPI** (total value to paid-in) counts paper value plus cash returned. **DPI** (distributions to paid-in) counts only cash. Carta reported for its 2017-vintage funds a median TVPI of 1.89x and a top-decile 4.08x as of Q4 2025, and a median DPI of only 0.37x as of Q2 2026. So most funds are well short of 3x, and most of that value is still on paper. These are figures from one platform, so look up the current report.`,
          resources: [
            { title: 'Performance Data and the Babe Ruth Effect in Venture Capital', url: 'https://a16z.com/performance-data-and-the-babe-ruth-effect-in-venture-capital/', type: 'article', cost: 'free', provider: 'Chris Dixon, Andreessen Horowitz', primary: true },
            { title: 'Black Swan Farming', url: 'https://paulgraham.com/swan.html', type: 'article', cost: 'free', provider: 'Paul Graham', note: 'Why investors accept many failures.' },
            { title: 'VC Fund Performance: Q2 2026', url: 'https://carta.com/data/vc-fund-performance-q2-2026/', type: 'dataset', cost: 'free', provider: 'Carta', note: 'Carta blocks automated downloads, so open it in a browser. Use it to update the figures above.' },
            { title: "Venture Capital's Role in Financing Innovation", url: 'https://www.nber.org/papers/w27492', type: 'article', cost: 'free', provider: 'Lerner and Nanda, NBER', note: 'A clear review of what VC does and does not do well.' },
          ],
          exercises: [
            {
              slug: 'fund-model',
              title: 'Model a fund',
              prompt:
                'Build a one-sheet fund model in a spreadsheet, with input cells for fund size, fee percentage, fee years, carry and target net multiple, and formula cells for fees, investable capital, proceeds needed, carry in dollars and the gross multiple on invested capital. Check the USD 100 million case (expect 20 million, 80 million, 350 million, 50 million and 4.375x). Then show the effect of a 2.5% fee alone, 25% carry alone, and both together, and say which hurts more.',
              kind: 'problem',
              difficulty: 2,
              hint: 'Proceeds needed = fund size + (LP target − fund size) / (1 − carry), because carry is paid on profit above the committed capital. Both changes together need about USD 366.7 million, or 4.89x on USD 75 million invested.',
            },
            {
              slug: 'exit-needed',
              title: 'How big must you get?',
              prompt:
                'A USD 250 million fund invests USD 8 million for 20% of your company. It expects you to raise three more rounds, each diluting it by 18%, with no follow-on from the fund. Compute its ownership at exit, and the exit needed for this one investment to return the whole fund. If your best realistic outcome is USD 150 million, what does that mean for this investor?',
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'portfolio-simulation',
              title: 'Feel the power law',
              prompt:
                'Treat the lesson\'s 25 outcomes as a bag: a new 25-company portfolio draws each company\'s multiple at random from the bag, with replacement. By hand, compute (a) the chance that a portfolio contains no 40x company at all, (b) the chance it contains neither the 40x nor the 15x, and (c) the lesson portfolio\'s multiple if its 40x company had instead returned 0.2x. Optionally, draw a few portfolios in a spreadsheet with a random-number function and watch how much the result jumps. State why this is only an illustration, and what a real distribution would change.',
              kind: 'problem',
              difficulty: 2,
              hint: 'Each draw misses the 40x with probability 24/25, so (a) is (24/25) to the power 25, about 36%. For (b) use 23/25, giving about 12%. For (c), the total falls from 82 units to 42.2, so 1.69x.',
            },
          ],
          selfAssessment: [
            {
              question: 'Why must a USD 100 million fund make 4.375x on invested money to return 3x net?',
              answerOutline:
                'Fees reduce invested capital to USD 80 million, and carry takes 20% of profit, so proceeds of USD 350 million are needed for LPs to receive USD 300 million.',
            },
            {
              question: 'Why might a USD 1 billion fund pass on a company likely to sell for USD 200 million?',
              answerOutline:
                'Even 10% would give USD 20 million, 2% of the fund, which cannot move its returns. It is about fund arithmetic, not quality.',
            },
            {
              question: 'What is the difference between TVPI and DPI?',
              answerOutline:
                'TVPI includes paper value of holdings as well as cash returned. DPI counts only cash actually returned to LPs.',
            },
          ],
          quiz: [
            {
              question: 'A USD 200 million fund charges 2% a year for ten years and 20% carry on profit, and its LPs want 3x net. What total proceeds must the fund produce?',
              options: ['USD 600 million', 'USD 700 million', 'USD 640 million', 'USD 750 million'],
              answer: 1,
              explanation:
                'LPs want USD 600 million, which is USD 400 million of profit on their USD 200 million. If carry is 20% of profit, LPs keep 80%, so profit must be $400 / 0.8 = 500$ million and proceeds $200 + 500 = 700$ million (3.5 times the fund, or 4.375x on the USD 160 million invested after fees). USD 600 million forgets carry, and USD 750 million charges carry on the whole amount rather than on profit.',
            },
            {
              question: 'A USD 400 million fund expects to own 8% of a company at exit. How large must that exit be for this one company to return the whole fund once?',
              options: ['USD 32 million', 'USD 500 million', 'USD 5 billion', 'USD 3.2 billion'],
              answer: 2,
              explanation:
                'The fund\'s share must equal the fund: $0.08 \\times \\text{exit} = 400$ million, so exit is $400 / 0.08 = 5$ billion. USD 32 million is 8% of the fund, not the exit needed. This is why a large fund can pass on a company that would be a fine outcome for its founders.',
            },
          ],
        },
        {
          slug: 'safes-and-convertible-notes',
          title: 'SAFEs and convertible notes',
          summary:
            'The instruments used to raise before a priced round. Work through post-money and pre-money SAFEs, caps, discounts and notes, and see what founders commonly get wrong.',
          estimatedMinutes: 130,
          objectives: [
            'Explain what a SAFE is and how it converts',
            'Compute ownership sold on post-money SAFEs',
            'Show why post-money and pre-money caps with the same number differ',
            'Apply caps and discounts and find the conversion price',
            'Compute a convertible note conversion with accrued interest',
            'Explain liquidation overhang and the risk of stacking SAFEs',
          ],
          concepts: [
            'SAFE',
            'Valuation cap',
            'Discount',
            'Post-money and pre-money SAFE',
            'Company Capitalization',
            'Convertible note',
            'Maturity date',
            'Liquidation overhang',
            'Stacking SAFEs',
          ],
          explanation: `*Based on Y Combinator's published post-money SAFE and User Guide. Read the actual document you sign.*

A **SAFE** (Simple Agreement for Future Equity) is a contract: an investor pays now and receives shares later, when the company does a priced round. It is not debt, has no interest and no maturity date. YC introduced it in late 2013, and moved to the post-money SAFE in 2018. A **valuation cap** sets the highest valuation at which the money converts. It is not a valuation.

**Post-money SAFE.** The cap includes all money raised on SAFEs and notes, so ownership is simple:

$$
\\text{ownership sold} = \\frac{\\text{amount invested}}{\\text{post-money valuation cap}}
$$

YC's example: a USD 200,000 SAFE at a USD 4 million cap sells 5%, and USD 800,000 at an USD 8 million cap sells 10%. Together that is at least 15%, before the priced round dilutes everyone. The ownership is measured on **Company Capitalization**, which per the SAFE includes all shares, options, promised options, the existing unissued pool and the converting securities themselves. It does not include a pool increase made in the round, unless promised options need it.

**Same cap, different meaning.** Founders and pool hold 10,000,000 shares, two investors each put USD 500,000 on a USD 5 million cap, and the round adds no pool.

| | Each SAFE | Founders and pool keep | Conversion price |
|---|---|---|---|
| Post-money SAFE | 10% (20% total) | 80% | USD 0.40 |
| Pre-money SAFE | 8.33% (16.67% total) | 83.33% | USD 0.50 |

A pre-money cap ignores other SAFEs, so each dilutes the others too. On the same cap number, the post-money SAFE gives investors more. Its advantage is that you know what you sold, and each new SAFE dilutes founders only.

\`\`\`interactive
cap-table
{"title": "Same cap, two meanings", "safes": [[500000, 5000000], [500000, 5000000]], "caption": "Two USD 500,000 SAFEs on a USD 5 million cap, with 10,000,000 founder and pool shares: each sells 10% at USD 0.40 a share, as in the table. Switch to pre-money caps and each drops to 8.33% at USD 0.50. Then enter 0.2 at a cap of 4 and 0.8 at a cap of 8 (post-money) to reproduce YC's Example 1: Company Capitalization of 11,764,705 shares, with 588,235 and 1,176,470 for the two investors."}
\`\`\`

**Stacking.** Each extra SAFE takes ownership from you alone. USD 500,000 at USD 5 million, USD 1 million at USD 8 million and USD 1 million at USD 12 million sell 10%, 12.5% and 8.33%, or 30.83% before any priced round. Track this every time, in a spreadsheet or in the interactive below. There is no vote or board moment to make you stop.

\`\`\`interactive
cap-table
{"title": "Stacking SAFEs", "round": true, "pre": 20000000, "money": 5000000, "poolTarget": 10, "caption": "The three SAFEs from the paragraph sell 10%, 12.5% and 8.33%, or 30.83%, all of it from the founders. Add a fourth SAFE and watch the founders' share alone shrink. The priced round below (USD 5 million on USD 20 million pre-money with a 10% pool) then dilutes the SAFE holders and founders together. Drag the pre-money down to USD 8 million and the two higher-cap SAFEs switch to converting at the round price, because it is now below their SAFE price; at USD 6 million all three do."}
\`\`\`

**Discount.** A discount gives the investor shares at a percentage off the round price. At a USD 2.00 Series A with a 20% discount, the price is USD 1.60. A note with both a cap and a discount uses whichever gives the lower price. YC's standard forms offer cap-only, discount-only or MFN.

**Convertible notes** are loans that convert into shares, with interest and a **maturity date** when repayment is due. A USD 500,000 note at 6% simple interest for 18 months accrues USD 45,000, so USD 545,000 converts. With a USD 6 million pre-money cap on 10,000,000 fully diluted shares, the cap price is USD 0.60. A USD 1.50 Series A gives a 20% discount price of USD 1.20. The cap wins, and the note converts at USD 0.60 into 908,333 shares.

**Liquidation overhang.** If those shares were ordinary Series A shares with a USD 1.50 preference, they would carry USD 1.36 million of preference for USD 545,000 of money, or 2.5x. The fix is a shadow series with a preference based on the conversion price, which YC's SAFE does automatically through Safe Preferred Stock. Negotiate the same for notes.

**In an acquisition,** a SAFE gets the greater of its money back or its as-converted value, under the form's terms, junior to debt and on par with other SAFEs. **Tax:** the form says the parties intend it to be treated as stock, but when the holding period starts for QSBS is unsettled.`,
          resources: [
            { title: 'SAFE documents and User Guide', url: 'https://www.ycombinator.com/documents', type: 'documentation', cost: 'free', provider: 'Y Combinator', note: 'Read the Quick Start Guide and Appendix II worked examples in the User Guide. The interactives in this lesson and the Module 6 project reproduce them.', primary: true },
            { title: 'Understanding convertible debt', url: 'https://www.cooleygo.com/collections/understanding-convertible-debt/', type: 'article', cost: 'free', provider: 'Cooley GO' },
            { title: 'Y Combinator Safe Financing Documents Generator', url: 'https://www.cooleygo.com/documents/y-combinator-safe-financing-document-generator/', type: 'tool', cost: 'free', provider: 'Cooley GO' },
          ],
          exercises: [
            {
              slug: 'reproduce-yc-example',
              title: 'Reproduce a published example',
              prompt:
                'Read Example 1 in Appendix II of the YC User Guide. With a pool of 10,000,000 existing shares, Investor A at USD 200,000 on a USD 4 million post-money cap, and Investor B at USD 800,000 on an USD 8 million cap, reproduce Company Capitalization of 11,764,705 and conversions of 588,235 and 1,176,470 shares by hand or in a spreadsheet. Explain why the two investors hold exactly 5% and 10% of that capitalization. When you have your answer, check it by entering the two SAFEs in the first interactive in this lesson.',
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'safe-stack',
              title: 'Track a SAFE stack',
              prompt:
                'Make a SAFE tracker in a spreadsheet: one row per post-money SAFE with its amount and cap, a column for the ownership it sells (amount divided by cap), a total sold and what founders keep before a priced round, and a cell that shows a warning when the total sold passes a limit you choose, such as 25%. Check it with the lesson\'s stack (expect 30.83%). Then add a USD 500,000 SAFE at a USD 20 million cap. How much does it cost founders, in percentage points?',
              kind: 'problem',
              difficulty: 1,
              hint: 'The new SAFE sells 500,000 / 20,000,000 = 2.5%, so the total becomes 33.33% and founders keep 66.67% before the round.',
            },
            {
              slug: 'note-conversion',
              title: 'Convert a note',
              prompt:
                'A USD 750,000 note accrues 8% simple interest for two years, with a 15% discount and a USD 10 million pre-money cap. Fully diluted shares are 8,000,000 before conversion. Compute the conversion price and shares at a Series A price of USD 2.00, and at USD 1.00. Show how much liquidation preference each case would carry if converted into ordinary Series A shares at that round price.',
              kind: 'problem',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'A USD 1 million SAFE has a USD 10 million post-money cap. What did you sell, and is it final?',
              answerOutline:
                '10% of Company Capitalization. It may convert to more if the round is priced below the cap, and it will be diluted by the priced round itself and any pool increase.',
            },
            {
              question: 'Why is a valuation cap not a valuation?',
              answerOutline:
                'It is a ceiling on the conversion price, not an agreed company value. The actual price is set in the priced round.',
            },
            {
              question: 'What does a cap protect against, and what does a discount protect against?',
              answerOutline:
                'A cap rewards investors if the next round is far above it. A discount gives a fixed reward relative to the round price, whatever that is.',
            },
            {
              question: 'What is liquidation overhang?',
              answerOutline:
                'Converted notes receiving more preference than money invested, because shares bought cheaply carry the higher round-price preference. A shadow series solves it.',
            },
          ],
          quiz: [
            {
              question: 'You raise USD 750,000 on a post-money SAFE with a USD 6 million cap, then USD 1 million on a post-money SAFE with a USD 10 million cap. How much of the company have you sold before any priced round?',
              options: ['10.9%', '17.5%', '11.25%', '22.5%'],
              answer: 3,
              explanation:
                'Each post-money SAFE sells its amount over its own cap: $0.75/6 = 12.5\\%$ and $1/10 = 10\\%$, so 22.5% together, all of it from the founders. 10.9% divides the total money by the sum of the caps, which mixes two different prices. 17.5% puts all the money on the USD 10 million cap.',
            },
            {
              question: 'A USD 400,000 convertible note accrues 5% simple interest for two years. It has a USD 8 million pre-money cap and a 20% discount. The Series A is priced at USD 1.20 a share, with 10,000,000 fully diluted shares before the round. How many shares does the note convert into?',
              options: ['550,000', '500,000', '458,333', '366,667'],
              answer: 0,
              explanation:
                'The balance is $400{,}000 \\times (1 + 0.05 \\times 2) = 440{,}000$. The cap price is $8{,}000{,}000 / 10{,}000{,}000 = 0.80$ and the discount price is $1.20 \\times 0.8 = 0.96$; the lower one wins, so $440{,}000 / 0.80 = 550{,}000$ shares. 500,000 forgets the interest, and 458,333 uses the discount price, which is higher here.',
            },
          ],
        },
        {
          slug: 'priced-rounds-cap-tables-and-dilution',
          title: 'Priced rounds, cap tables and dilution',
          summary:
            'How a priced round sets the share price, what the option pool shuffle does to your true valuation, how pro rata rights work and what dilution looks like over several rounds.',
          estimatedMinutes: 130,
          objectives: [
            'Read a cap table and compute price per share from a pre-money valuation',
            'Show how an option pool in the pre-money lowers the effective valuation',
            'Explain pro rata rights and compute an allocation',
            'Compute founder ownership across several rounds',
            'Explain what preferred stock is and how it differs from common',
          ],
          concepts: [
            'Cap table',
            'Pre-money and post-money valuation',
            'Price per share',
            'Preferred and common stock',
            'Option pool',
            'Option pool shuffle',
            'Pro rata right',
            'Dilution',
          ],
          explanation: `A **cap table** lists who owns what. A **priced round** sells new shares at an agreed price, usually **preferred stock**, shares with extra rights over the **common stock** held by founders and employees. Module 7 covers those rights. Rounds are labelled Seed, Series A, Series B and so on.

**The arithmetic.** **Post-money valuation** equals **pre-money valuation** plus new money. Price per share is pre-money valuation divided by pre-money fully diluted shares. Investor ownership is new money divided by post-money.

**The option pool shuffle.** An **option pool** is stock reserved for future hires. Investors usually require a pool of a given size *after* the round and require it to be created *before* the round, so the existing holders alone bear it. Venture Hacks named this the option pool shuffle. Take founders with 10,000,000 shares, USD 2 million raised on an USD 8 million pre-money valuation, so the investor gets 20%.

| Pool term | Founders | Investor | Pool | Price | Effective pre-money |
|---|---|---|---|---|---|
| 20% post-closing, in the pre-money | 60% | 20% | 20% | USD 0.60 | USD 6 million |
| 10% post-closing, in the pre-money | 70% | 20% | 10% | USD 0.70 | USD 7 million |
| 20% created after closing, shared by all | 64% | 16% | 20% | n/a | n/a |

So a headline of USD 8 million is really USD 6 million for the existing shares, because USD 2 million of the pre-money is reserved for people not yet hired. Do not argue with the principle. Argue the size, with a bottom-up hiring plan for the next 18 months showing how many shares you need.

\`\`\`interactive
cap-table
{"title": "The option pool shuffle", "safes": [], "round": true, "pre": 8000000, "money": 2000000, "poolTarget": 20, "poolTiming": "pre", "caption": "The table's first row: 10,000,000 founder shares, USD 2 million on USD 8 million pre-money and a 20% pool in the pre-money. Founders keep 60%, the price is USD 0.60 and the existing shares are really priced at USD 6 million. Drag the pool to 10% for the second row (70%, USD 0.70). Then switch the pool increase to after closing: founders 64%, investor 16%, because now everyone shares the pool."}
\`\`\`

**Pro rata rights** let an investor buy their percentage of a later round to keep their stake. If an investor owns 10% and you raise USD 10 million, their pro rata is USD 1 million. The allocation comes out of the round, which can squeeze space for a new lead. It does not protect them from a pool increase. In YC's Example 1, Investor B owns 10% of Company Capitalization, buys its 10% pro rata and ends at 9.06%, because the pool increase dilutes its SAFE shares.

**Dilution over several rounds.** **Dilution** is the fall in your percentage when new shares are issued. It is not automatically bad, since 20% of a bigger company can be worth more. Here is an illustration for two equal founders, with each step's new percentage applied to the whole company:

| Round | Investors plus new pool | Founders together | Each founder |
|---|---|---|---|
| Start | | 100% | 50% |
| Accelerator | 7% | 93.00% | 46.50% |
| Seed | 20% + 10% | 65.10% | 32.55% |
| Series A | 20% + 5% | 48.83% | 24.41% |
| Series B | 15% + 3% | 40.04% | 20.02% |
| Series C | 12% + 2% | 34.43% | 17.22% |

\`\`\`interactive
cap-table
{"title": "Put it together: SAFEs, a Series A and a sale", "round": true, "pre": 20000000, "money": 5000000, "poolTarget": 10, "waterfall": true, "exit": 30000000, "caption": "The previous lesson's three SAFEs (30.83% sold) followed by USD 5 million on USD 20 million pre-money with a 10% pool in the pre-money. Founders go from 69.17% to about 48.4%. In the sale panel, slide the price down: below the total preferences of USD 7.5 million the founders get nothing. Above that their share of the sale climbs, and once every holder converts it settles at about 53.8%, a little above their 48.4% ownership, because the unissued pool receives nothing. This sale model is simplified; the waterfall lesson in Module 9 does it properly."}
\`\`\`

**Real data.** Carta's benchmarking, as cited on its site for Q2 2026, gave median post-money valuations of USD 23.9 million at seed and USD 76.3 million at Series A, with median rounds of USD 4.5 million and USD 14.7 million and median dilution of 19.4% and 18.7%. AI companies skew these figures, and they are from Carta customers only. To update them, look up Carta's latest State of Private Markets, the PitchBook-NVCA Venture Monitor, and law firm reports such as Cooley's quarterly venture financing report, and always note the date and the sample.`,
          resources: [
            { title: 'SAFE documents and User Guide', url: 'https://www.ycombinator.com/documents', type: 'documentation', cost: 'free', provider: 'Y Combinator', note: 'Appendix II shows a full priced round after SAFE conversion.', primary: true },
            { title: 'A guide to seed fundraising', url: 'https://www.ycombinator.com/library/4A-a-guide-to-seed-fundraising', type: 'article', cost: 'free', provider: 'Y Combinator' },
            { title: 'Series A Funding: How to Raise Your First Priced Round', url: 'https://carta.com/learn/startups/fundraising/series-a/', type: 'article', cost: 'free', provider: 'Carta', note: 'Includes the benchmark figures cited above. Carta blocks automated downloads, so use a browser.' },
            { title: 'Option pool shuffle', url: 'https://venturehacks.com/option-pool-shuffle', type: 'article', cost: 'free', provider: 'Venture Hacks', note: 'The original article. The site blocks automated downloads, so use a browser.' },
          ],
          exercises: [
            {
              slug: 'pool-shuffle-table',
              title: 'Reproduce the shuffle',
              prompt:
                'By hand or in a spreadsheet, take 10,000,000 founder shares, USD 8 million pre-money, USD 2 million new money and a post-closing pool of 20%, then of 10%. For each, work out the post-money, the total post-closing shares, the price per share, the new investor shares and the pool shares, with share counts rounded down, and the founders\' percentage. Reproduce the lesson\'s first two rows (USD 0.60 and USD 0.70), and report the effective pre-money in each case. Check your answers in the interactive.',
              kind: 'problem',
              difficulty: 2,
              hint: 'Founders own whatever the investor and pool do not: 100% − 20% − 20% = 60%. So total shares = 10,000,000 / 0.60, and price = post-money / total shares. Effective pre-money = price × founder shares.',
            },
            {
              slug: 'hiring-plan-pool',
              title: 'Negotiate the pool with a hiring plan',
              prompt:
                'Build an 18-month hiring plan for a seed company: roles, start months and an equity grant for each in percentage of fully diluted shares. Add a contingency. Compare the total with a 15% pool demanded by an investor, and compute the effective pre-money under both on a USD 12 million pre-money and USD 3 million raised. Write the two-sentence argument you would make.',
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'current-benchmarks',
              title: 'Look up today\'s benchmarks',
              prompt:
                'Find the latest figures for median seed and Series A round size, valuation and dilution from two different sources, such as Carta and the PitchBook-NVCA Venture Monitor. Record the date, sample and whether valuation is pre-money or post-money. Explain any gap between them, and what you would and would not conclude for your own company.',
              kind: 'data-analysis',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'USD 3 million is raised on a USD 9 million pre-money valuation. What is the post-money, and what does the investor own?',
              answerOutline: 'USD 12 million post-money, and the investor owns 25%.',
            },
            {
              question: 'Why is an option pool created in the pre-money effectively a lower valuation?',
              answerOutline:
                'Existing holders bear all the pool dilution, and the price per share is lower, so the value of the existing shares is below the headline.',
            },
            {
              question: 'How should you argue about pool size?',
              answerOutline:
                'With a bottom-up hiring plan showing the shares needed for a defined period, rather than an arbitrary percentage.',
            },
            {
              question: 'Does a pro rata right protect an investor from all dilution?',
              answerOutline:
                'No. It lets them buy their share of new stock. Pool increases can still dilute them, as with Investor B in YC\'s example, who ended at 9.06%.',
            },
          ],
          quiz: [
            {
              question: 'Founders hold 8,000,000 shares. An investor puts in USD 3 million on a USD 12 million pre-money valuation and requires a 15% post-closing pool, created in the pre-money. What are the existing shares really priced at (the effective pre-money)?',
              options: ['USD 12 million', 'USD 9.75 million', 'USD 10.2 million', 'USD 9 million'],
              answer: 1,
              explanation:
                'Post-money is USD 15 million, so the investor owns 20% and the pool 15%, leaving founders 65%: $0.65 \\times 15 = 9.75$ million. USD 10.2 million takes 15% off the pre-money, but the pool is 15% of the *post*-money, all carved out of the founders. USD 12 million is the headline, which includes USD 2.25 million of shares for people not yet hired.',
            },
            {
              question: 'Founders together own 60%. A Series A sells 20% to new investors and adds a pool of 5%, both measured on the company after the round. What do the founders own afterwards?',
              options: ['35%', '48%', '45%', '40%'],
              answer: 2,
              explanation:
                'New shares take 25% of the whole company, so everyone existing keeps 75% of what they had: $60\\% \\times 0.75 = 45\\%$. 35% subtracts 25 percentage points as if founders alone paid for the round. 48% forgets the pool.',
            },
          ],
        },
      ],
      project: {
        slug: 'cap-table-workbook',
        title: 'A cap table workbook that matches the published examples',
        description: `Founders sign SAFEs without knowing what they have sold, and accept option pools without seeing their true valuation. In this project you build a spreadsheet workbook that makes both visible, and you hold it to an outside standard: the worked examples in Appendix II of the Y Combinator post-money SAFE User Guide. No programming is needed, only formulas.

**Tabs.** *Founders:* a founding cap table and a 48-month vesting schedule for each founder with a one-year cliff, rounding the cumulative vested figure down so no share is lost. *Deadlines:* the 83(b) last day for each founder's transfer date, moved past weekends and holidays, next to the date you would actually file. *Delaware:* both franchise tax methods side by side, the lower one and the USD 50 report fee. *SAFEs:* one row per SAFE with a choice of post-money or pre-money cap, the share sold, Company Capitalization and the SAFE price. *Round:* a priced round with pre-money valuation, new money and a post-closing pool target placed in the pre-money, showing every holder's shares and percentage before and after. *Raise:* round size from net burn times target months plus a buffer, and the percentage sold at two valuations.

**Checks your workbook must pass.** Example 1 of the guide: 10,000,000 existing shares, USD 200,000 at a USD 4 million post-money cap and USD 800,000 at an USD 8 million cap give Company Capitalization of 11,764,705 shares and conversions of 588,235 and 1,176,470 (round Company Capitalization down first, then each SAFE's shares down). The lesson's three-SAFE stack sells 30.83%. The option pool shuffle gives USD 0.60 and USD 0.70 a share for 20% and 10% pools. That stack followed by USD 5 million on USD 20 million pre-money with a 10% pool gives a price of about USD 1.2104 and leaves the founders about 48.4%. The vesting, 83(b) and Delaware tabs reproduce the Module 5 lessons' numbers.

**Hint for the round.** With the pool increase in the pre-money and no SAFE priced below its cap, post-closing shares equal (existing shares + SAFE shares + pool increase) times post-money over pre-money, and the pool increase is whatever makes the whole pool equal the target share of that total. Write those two facts as formulas, or use your spreadsheet's Goal Seek. Compare your results with the interactive in the priced rounds lesson. State on the first tab that this is education, not legal advice, and not a legal cap table.`,
        deliverables: [
          'A workbook with Founders, Deadlines, Delaware, SAFEs, Round and Raise tabs, with inputs kept separate from formulas',
          'A Checks tab showing each published or lesson figure next to the workbook\'s own result, with any difference explained',
          'A one-page note on what surprised you about the option pool and SAFE stacking',
        ],
        estimatedHours: 14,
        stretchGoals: [
          'Handle a round priced below a SAFE\'s price, so that the SAFE converts at the round price; turn on iterative calculation or use Goal Seek, and explain why the calculation is circular.',
          'Add a second priced round with a pro rata allocation for one earlier investor, and show their percentage before and after.',
        ],
      },
    },
    {
      slug: 'running-a-fundraise',
      title: 'Running a Fundraise',
      description:
        'Decide whether to raise at all, find the right investors, tell the truth well, read a term sheet line by line, and close a round lawfully under US securities rules.',
      lessons: [
        {
          slug: 'whether-and-when-to-raise',
          title: 'Whether and when to raise',
          summary:
            'Raising money is a decision with costs, not a milestone. Weigh the real disagreements about raising early, how much to raise, and when not to raise at all.',
          estimatedMinutes: 90,
          objectives: [
            'List what raising venture capital commits you to',
            'Present both sides of the argument over raising early',
            'Compare founder payoffs at different ownership and exit values',
            'Decide how much to raise from milestones and runway',
            'Identify situations in which you should not raise',
          ],
          concepts: [
            'Fundraising as a commitment',
            'Milestones',
            'Raising too much',
            'Valuation as a future hurdle',
            'Capital intensity',
            'Default-alive leverage',
            'Blitzscaling',
          ],
          explanation: `Raising money is often treated as success. It is really a sale of part of your company and a promise. Taking venture capital generally commits you to pursuing a very large outcome on a fund's timetable, to a board, and to investors whose arithmetic you saw in Module 6. It is hard to reverse.

**The disagreement over raising early.**

*For raising early.* In a market where speed decides the winner, capital buys people and market share first. Reid Hoffman's "blitzscaling" argues for prioritising speed over efficiency in such markets. Investors add that early capital lets you hire good people and that a strong first round makes the next easier. Graham's view in "How to Raise Money" is nuanced, but he notes that most successful startups have raised money.

*Against raising early.* Revenue is the cheapest capital. Each month of progress raises your price and reduces dilution. 37signals argues that small, profitable companies give founders more freedom. Many markets are not races, and the base rates in Module 1 include many companies that died after raising too soon, having committed to growth before they had product-market fit. Most evidence on both sides comes from survivors, so be cautious of anyone certain.

Graham's most useful line is "Don't raise money unless you want it and it wants you." He also says that ideally you could tell investors you will succeed either way and that money will make it faster. Being default alive is the strongest position in a negotiation.

**A simple payoff comparison.**

| Your stake | Exit value | Your proceeds |
|---|---|---|
| 100% | USD 20 million | USD 20 million |
| 40% | USD 200 million | USD 80 million |
| 20% | USD 500 million | USD 100 million |

A founder with 40% needs an exit above USD 50 million to beat 100% of USD 20 million. That table ignores the odds, taxes, preferences and how long each outcome takes. A large outcome is not guaranteed by funding, and a USD 20 million bootstrapped exit is itself rare. So estimate your own probabilities and write them down, knowing you will be overconfident.

**How much to raise.** Work back from a milestone. What must be true at the next round, and what does it cost to get there, with room for things to take longer? Multiply your plan's burn by 18 to 24 months plus a buffer. Graham warns about raising too much: it can set up a high burn rate and raise the bar for the next round. A high valuation is not free either. If you do not grow into it, your next round could be a down round, which Module 9 covers.

**Do not raise when:**

- You have no plan for the money beyond "growth".
- You have no evidence, so you would be raising on charm, and investors' decisions will be harsh anyway.
- Your market or your goals cannot produce a venture-scale exit. Be honest, as you saw in Module 6.
- Capital is not your constraint, such as when the problem is product.
- Your business is reaching profit by itself.
- You have to overstate traction to get it.

**Then again, sometimes you must.** Hardware, biotech and infrastructure can need capital before revenue. If you have a working plan, evidence and investors who want in, raise from strength and take enough to reach the next milestone.`,
          resources: [
            { title: 'How to Raise Money', url: 'https://paulgraham.com/fr.html', type: 'article', cost: 'free', provider: 'Paul Graham', note: 'Read the opening sections on whether to raise and how much.', primary: true },
            { title: 'Default Alive or Default Dead?', url: 'https://paulgraham.com/aord.html', type: 'article', cost: 'free', provider: 'Paul Graham' },
            { title: 'Getting Real', url: 'https://basecamp.com/gettingreal', type: 'textbook', cost: 'free', provider: '37signals', note: 'The contrary view: build small and profitable.' },
            { title: 'A guide to seed fundraising', url: 'https://www.ycombinator.com/library/4A-a-guide-to-seed-fundraising', type: 'article', cost: 'free', provider: 'Y Combinator', note: 'Written by an investor. Note its assumptions.' },
          ],
          exercises: [
            {
              slug: 'raise-or-not-memo',
              title: 'Write the raise or not memo',
              prompt:
                'For a real or imagined company, write a one-page memo with a recommendation. Include the use of funds, the milestone it reaches, what happens if you raise nothing, why this market does or does not reward speed, and what you give up. Give your own probabilities for each outcome and the strongest argument against your recommendation.',
              kind: 'writing',
              difficulty: 2,
            },
            {
              slug: 'payoff-comparison',
              title: 'Compare expected founder payoffs',
              prompt:
                'Compare two paths. Bootstrapped: 100% ownership with probabilities 40%, 45%, 14% and 1% of exits at USD 0, USD 5 million, USD 20 million and USD 60 million. Funded: 45% ownership with probabilities 60%, 25%, 12% and 3% of exits at USD 0, USD 30 million, USD 120 million and USD 600 million. Compute the expected value and the median payoff for each. These are invented numbers. Explain why the expected value favours one path, and the median the other. Which would you pick, given your finances?',
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'raise-amount',
              title: 'Size a round from milestones',
              prompt:
                'Use the model from Module 4. Choose the milestone for your next stage, and calculate cash needed to reach it with an extra six months. Convert that into a round size and the dilution at two valuations. State what you would cut if you raised half of it.',
              kind: 'problem',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Give the best argument for and the best argument against raising early.',
              answerOutline:
                'For: in a race, capital buys speed, talent and market share. Against: progress raises your price, revenue is cheaper, and many markets are not races, so early money commits you too soon.',
            },
            {
              question: 'How can a high valuation hurt you?',
              answerOutline:
                'It sets a hurdle for the next round. Missing it can mean a down round, with dilution, anti-dilution effects and damaged morale.',
            },
            {
              question: 'What is the strongest position to raise from, and why?',
              answerOutline:
                'Being default alive, so you do not need the money. You can walk away, which improves your terms.',
            },
          ],
          quiz: [
            {
              question: 'After raising, you expect to own 30% at exit. Ignoring preferences, taxes, timing and the odds, above what exit value do you do better than owning 100% of a USD 15 million bootstrapped sale?',
              options: ['USD 50 million', 'USD 45 million', 'USD 15 million', 'USD 4.5 million'],
              answer: 0,
              explanation:
                'You need $0.30 \\times \\text{exit} > 15$ million, so the exit must exceed $15 / 0.30 = 50$ million. USD 45 million multiplies by 3 instead of dividing by 0.3. And remember what the comparison leaves out: the funded outcome is not guaranteed, preferences come first, and a USD 15 million bootstrapped exit is itself rare.',
            },
          ],
        },
        {
          slug: 'investors-and-the-pitch',
          title: 'Targeting investors and telling the truth well',
          summary:
            'Build a target list based on fund fit, get introductions, structure a deck, present real traction, and understand why misrepresentation is a crime and not a tactic.',
          estimatedMinutes: 100,
          objectives: [
            'Build an investor target list using stage, cheque size and fund size',
            'Structure a pitch deck that tells a clear story',
            'Define traction metrics honestly and show their definitions',
            'Explain the anti-fraud rules that apply to private sales',
            'Handle rejection and references',
          ],
          concepts: [
            'Investor target list',
            'Lead investor',
            'Warm introduction',
            'Narrative',
            'Pitch deck',
            'Traction',
            'Rule 10b-5',
            'Forward-looking statements',
          ],
          explanation: `**Find the right investors.** Most fundraising time is wasted on the wrong ones. Build a list of 30 to 60 names with stage, cheque size, fund size, sector, recent deals, any competing portfolio company, and which partner suits you. A **lead investor** sets the terms and takes the largest piece, and others follow. A fund's size and stage tell you whether your company can matter to it, as Module 6 showed. Avoid investors who have backed a direct competitor, and check how recently they invested. Dormant funds have nothing to invest. A **warm introduction** through a founder they have backed works far better than a cold email, which is an unfair feature of the market and worth knowing. Access is unequal, so use accelerators, angels and public programmes if your network is thin.

**What they weigh.** Gompers, Gornall, Kaplan and Strebulaev surveyed 885 institutional VCs. The NBER digest of their working paper reports that over 90% considered the management team important and over 55% the most important factor, ahead of product and market, though the mix differs by stage and industry. Graham's "How to Convince Investors" argues that investors look for formidable founders, and that the way to seem formidable is to actually be so. Investors are also subject to herd behaviour, as he explains in "Investor Herd Dynamics": their interest often depends on others'.

**The deck.** A clear story beats a clever design. One common order:

1. Title: what the company does in one line.
2. Problem: who has it, with a specific example.
3. Solution and product.
4. Why now.
5. Market, sized bottom-up.
6. Traction.
7. Business model and unit economics.
8. Competition, honestly.
9. Team.
10. Use of funds and milestones.

Graham's "How to Present to Investors" stresses saying what you do in one sentence and explaining it simply. Rehearse with people who will tell you the truth.

**Tell the truth.** **Traction** means evidence of demand: revenue, usage, retention, signed contracts. Define each number. Say "MRR" only if it is recurring revenue, and do not count pilots, letters of intent or one-off services as recurring. Show projections as projections, with assumptions.

This is not only ethics. Selling a SAFE or shares is a sale of a security. **Rule 10b-5** under the Securities Exchange Act prohibits untrue statements of material fact and misleading omissions in connection with a sale of securities, private or public. Omitting a key fact can count.

Two cases show where this ends:

- **Theranos.** Elizabeth Holmes was sentenced on 18 November 2022 to 135 months in prison for defrauding investors, according to the US Department of Justice.
- **Frank.** Charlie Javice told JPMorgan that her startup had 4.25 million customers when it had about 300,000, and was sentenced to 85 months after a jury convicted her in March 2025, according to the US Attorney's Office.

Both are extreme, and small exaggerations do not usually lead to prison. But they do lead to lost trust, failed due diligence, and possible civil liability. Investors check your data before closing. In the course's projects, numbers are labelled fictional for this reason.

**Rejection.** Expect a lot of it. Many investors will not give a clear no, so treat silence as a no. Ask for feedback, but do not chase it. And check references on them too, as you would on any long-term partner.`,
          resources: [
            { title: 'How to Convince Investors', url: 'https://paulgraham.com/convince.html', type: 'article', cost: 'free', provider: 'Paul Graham', primary: true },
            { title: 'How to Present to Investors', url: 'https://paulgraham.com/investors.html', type: 'article', cost: 'free', provider: 'Paul Graham' },
            { title: 'How Do Venture Capitalists Make Decisions? (digest)', url: 'https://www.nber.org/digest/dec16/how-do-venture-capitalists-make-decisions', type: 'article', cost: 'free', provider: 'NBER', note: 'Summary of the survey of 885 VCs.' },
            { title: '17 CFR 240.10b-5', url: 'https://www.law.cornell.edu/cfr/text/17/240.10b-5', type: 'documentation', cost: 'free', provider: 'Cornell Legal Information Institute', note: 'Short enough to read in full.' },
            { title: 'Investor Herd Dynamics', url: 'https://paulgraham.com/herd.html', type: 'article', cost: 'free', provider: 'Paul Graham' },
          ],
          exercises: [
            {
              slug: 'target-list',
              title: 'Build a target list',
              prompt:
                'Build a spreadsheet of 20 real investors for a fictional company, using public websites and Form D filings on SEC EDGAR. Record stage, typical cheque, fund size, a recent deal with date, any conflicts and a path to an introduction. Rank them, and explain the top three and the bottom one.',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'deck-outline',
              title: 'Outline a deck',
              prompt:
                'Write a ten-slide outline for a clearly fictional company, with one headline sentence per slide that states the point rather than a label. Add a footnote under each number giving its definition and whether it is an assumption or a fact. Mark the company as fictional on the title slide.',
              kind: 'writing',
              difficulty: 1,
            },
            {
              slug: 'honest-or-misleading',
              title: 'Honest or misleading?',
              prompt:
                'Rewrite these so that they are accurate: "USD 1M ARR" when revenue is USD 40,000 of monthly subscriptions and USD 520,000 of one-off consulting; "10,000 users" when weekly active users are 900; "Signed with Acme" when Acme gave a non-binding letter of intent; "Profitable" when the founders take no salary. For each, name the material fact being hidden, and explain the risk under Rule 10b-5 in one sentence.',
              kind: 'problem',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does a founder need to know a fund\'s size before pitching?',
              answerOutline:
                'It determines the exit and ownership the fund needs, and hence whether your company can matter to it, and it indicates cheque size.',
            },
            {
              question: 'Does Rule 10b-5 apply to a private SAFE sale?',
              answerOutline:
                'Yes. It covers the purchase or sale of any security, including private sales, and reaches both false statements and misleading omissions.',
            },
            {
              question: 'What makes "USD 1M ARR" misleading when much of it is one-off consulting?',
              answerOutline:
                'ARR means recurring revenue. One-off services do not recur, so the claim overstates the business and is a material misstatement.',
            },
          ],
          quiz: [
            {
              question: 'This month you billed USD 30,000 of monthly subscriptions and USD 12,000 of one-off setup fees, and a prospect signed a non-binding letter of intent for USD 5,000 a month. What MRR can you honestly put in the deck?',
              options: ['USD 47,000', 'USD 42,000', 'USD 35,000', 'USD 30,000'],
              answer: 3,
              explanation:
                'MRR is recurring revenue only: the USD 30,000 of subscriptions. Setup fees do not recur, and a non-binding letter of intent is not revenue at all. You can mention the letter separately, described as what it is. Overstating MRR to an investor buying a security risks a material misstatement under Rule 10b-5.',
            },
          ],
        },
        {
          slug: 'reading-a-term-sheet',
          title: 'Reading a term sheet',
          summary:
            'What each major term does, with worked numbers on liquidation preferences, participation and anti-dilution, and why clean terms can beat a higher price.',
          estimatedMinutes: 130,
          objectives: [
            'Separate economic terms from control terms',
            'Compute investor payouts under non-participating, participating and capped preferences',
            'Find the exit value at which an investor converts',
            'Compute conversion price adjustments under weighted average and full ratchet anti-dilution',
            'Explain board composition and protective provisions',
            'Explain why a headline post-money valuation can overstate value',
          ],
          concepts: [
            'Term sheet',
            'Liquidation preference',
            'Non-participating and participating preferred',
            'Conversion',
            'Anti-dilution protection',
            'Protective provisions',
            'Drag-along',
            'No-shop',
          ],
          explanation: `A **term sheet** is a short summary of a proposed investment. Most of it is not binding, except typically confidentiality and a **no-shop** clause, which stops you talking to other investors for a period. Treat price as just one term. Terms below describe common US practice, and the NVCA model documents are the reference forms.

**Liquidation preference.** Preferred investors get paid first in a sale. A **1x non-participating** preference means they choose either their money back or their share on conversion to common, whichever is larger. **Participating** preferred takes its money back *and* then shares in the rest, sometimes up to a **cap**.

An investor puts USD 10 million in for 25%. Payouts to the investor:

| Exit | 1x non-participating | 1x participating, no cap | 1x participating, 3x cap |
|---|---|---|---|
| USD 8M | 8.0M | 8.0M | 8.0M |
| USD 20M | 10.0M | 12.5M | 12.5M |
| USD 40M | 10.0M | 17.5M | 17.5M |
| USD 100M | 25.0M | 32.5M | 30.0M |
| USD 200M | 50.0M | 57.5M | 50.0M |

The non-participating investor converts when 25% of the exit exceeds USD 10 million, above USD 40 million. With a 3x cap, it converts above USD 120 million, where 25% exceeds USD 30 million. Participation costs founders most at small and medium exits, which are the likely ones. These figures assume no other share classes. Cooley's Q2 2026 report found 95.8% of its deals had a 1x preference and 96.4% were non-participating, which shows what is normal in that firm's sample.

**Anti-dilution** protects investors if a later round is cheaper, by lowering their conversion price. The usual form is **broad-based weighted average**:

$$
CP_2 = CP_1 \\times \\frac{A + B}{A + C}
$$

where A is fully diluted shares before, B is shares the new money would have bought at the old price, and C is shares actually issued. An investor with 2,000,000 shares at a USD 1.00 conversion price, 10,000,000 fully diluted shares and a new 1,000,000 shares at USD 0.50: B is 500,000, so the new price is USD 0.9545 and the investor converts into 2,095,238 shares. Under **full ratchet**, the price just drops to USD 0.50, giving 4,000,000 shares. Refuse a full ratchet.

**Other economics.** Dividends are usually not paid in cash. Redemption rights let investors demand their money back; they appeared in 5.4% of Cooley's deals. **Pay-to-play** penalises investors who do not join a later round (8.4% of deals).

**Control terms** often matter more:

- **Board:** the seats. A common Series A board has two founders, one investor and one independent.
- **Protective provisions:** a list of actions needing preferred investors' consent, such as a sale, new senior stock or changing the charter.
- **Drag-along:** forces holders to join a sale approved by set majorities.
- **Right of first refusal and co-sale:** limit founders selling shares.
- **Information rights:** the financial reports investors receive.

**Headline price misleads.** Gornall and Strebulaev (Journal of Financial Economics, 2020) calculate that reported unicorn valuations averaged 48% above fair value, because a post-money valuation prices all shares as if they had the newest preferred rights. A higher price with harsh terms can be worth less than a lower price with clean ones. A lawyer who does venture deals is not optional here.`,
          resources: [
            { title: 'YC Series A Term Sheet Template', url: 'https://www.ycombinator.com/series_a_term_sheet', type: 'documentation', cost: 'free', provider: 'Y Combinator', note: 'A short, founder-friendly reference. Compare it with what you are offered.', primary: true },
            { title: 'NVCA Model Legal Documents', url: 'https://nvca.org/model-legal-documents/', type: 'documentation', cost: 'free', provider: 'National Venture Capital Association', note: 'The standard forms. Several were updated in 2025 and 2026.' },
            { title: 'Q2 2026 Venture Financing Report', url: 'https://www.cooley.com/news/insight/2026/2026-08-17-q2-2026-venture-financing-report', type: 'dataset', cost: 'free', provider: 'Cooley', note: 'Market terms in one firm\'s deals. Published 17 August 2026.' },
            { title: 'Squaring Venture Capital Valuations with Reality', url: 'https://www.nber.org/papers/w23895', type: 'article', cost: 'free', provider: 'Gornall and Strebulaev, NBER' },
          ],
          exercises: [
            {
              slug: 'payout-function',
              title: 'Build the payout table',
              prompt:
                'In a spreadsheet, put the investment (USD 10 million) and ownership (25%) in input cells, then make a column of exit values from USD 0 to USD 250 million in steps of USD 10 million. Add one formula column for each preference: non-participating, participating with no cap, and participating with a 3x cap. Check that your rows match the lesson\'s table. Chart investor payout against exit for all three, and mark the conversion points at USD 40 million and USD 120 million. Add a fourth column for what common receives under the participating preference.',
              kind: 'problem',
              difficulty: 2,
              hint: 'Non-participating: the larger of 10 and 25% of exit, but never more than the exit. Participating: the 10 back (or the whole exit, if smaller) plus 25% of whatever is left after it. Capped: the smaller of the participating payout and 30, but never less than 25% of exit, because the investor can still convert.',
            },
            {
              slug: 'anti-dilution-compare',
              title: 'Compare anti-dilution formulas',
              prompt:
                'An investor holds 3,000,000 shares at a USD 2.00 conversion price, with 15,000,000 fully diluted shares. The company issues 2,000,000 shares at USD 1.00. Compute the new conversion price and as-converted shares under broad-based weighted average, narrow-based weighted average (with A at 10,000,000 outstanding shares) and full ratchet. Compute the founders\' change in ownership if they hold 8,000,000 shares.',
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'compare-two-sheets',
              title: 'Compare two term sheets',
              prompt:
                'Sheet A: USD 3 million at USD 12 million pre-money, 1x non-participating, 10% pool. Sheet B: USD 3 million at USD 16 million pre-money, 1x participating with no cap, 10% pool. Founders hold 9,000,000 shares and the pool starts at 1,000,000. Compute each sheet\'s price and founder percentage, and founder proceeds at exits of USD 10 million, USD 30 million and USD 100 million. Which would you sign? Treat the pool as fully issued with no exercise price, and state that simplification.',
              kind: 'problem',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'An investor with 20% and a 1x non-participating preference put in USD 5 million. Above what exit will it convert?',
              answerOutline: 'USD 25 million, where 20% exceeds USD 5 million.',
            },
            {
              question: 'What does participating preferred do at a USD 30 million exit, with USD 10 million invested for 25%?',
              answerOutline: 'Takes USD 10 million, then 25% of the remaining USD 20 million, for USD 15 million in total.',
            },
            {
              question: 'Why is a full ratchet dangerous?',
              answerOutline:
                'Any cheaper share issue, however small, resets the conversion price to the new low, heavily diluting founders and employees.',
            },
            {
              question: 'Name three control terms that can matter more than price.',
              answerOutline:
                'Board composition, protective provisions, and drag-along. Also redemption rights and information rights.',
            },
          ],
          quiz: [
            {
              question: 'An investor put in USD 8 million for 20%, with a 1x **non-participating** preference and no other share classes. The company sells for USD 30 million. What does the investor receive?',
              options: ['USD 8 million', 'USD 6 million', 'USD 12.4 million', 'USD 14 million'],
              answer: 0,
              explanation:
                'Non-participating means the larger of the money back (USD 8 million) and 20% on conversion (USD 6 million), so USD 8 million. It would convert only above USD 40 million. USD 12.4 million is the *participating* payout: USD 8 million plus 20% of the remaining USD 22 million.',
            },
            {
              question: 'An investor holds preferred at a USD 2.00 conversion price with broad-based weighted average anti-dilution. There are 12,000,000 fully diluted shares, and the company issues 1,500,000 new shares at USD 1.00. What is the new conversion price?',
              options: ['USD 1.00', 'USD 1.78', 'USD 1.89', 'USD 1.50'],
              answer: 2,
              explanation:
                'B is the shares the new money would have bought at the old price: $1{,}500{,}000 / 2 = 750{,}000$. So $CP_2 = 2.00 \\times \\frac{12{,}000{,}000 + 750{,}000}{12{,}000{,}000 + 1{,}500{,}000} \\approx 1.89$. USD 1.00 is a full ratchet, and USD 1.78 leaves B out of the numerator.',
            },
          ],
        },
        {
          slug: 'process-diligence-closing-and-securities-law',
          title: 'The process, due diligence, closing and securities law',
          summary:
            'Run a focused raise, prepare a data room, and stay on the right side of US securities law: Regulation D, accredited investors, Form D and general solicitation.',
          estimatedMinutes: 120,
          objectives: [
            'Run a fundraise in a concentrated, parallel process',
            'Prepare a data room and survive due diligence',
            'Name the main closing documents',
            'Explain why a security must be registered or exempt',
            'Distinguish Rule 506(b) from Rule 506(c)',
            'State the Form D deadline, and how to avoid general solicitation errors',
          ],
          concepts: [
            'Due diligence',
            'Data room',
            'Closing documents',
            'Regulation D',
            'General solicitation',
            'Form D',
            'Blue sky laws',
            'Bad actor disqualification',
            'Unregistered finders',
          ],
          explanation: `*US law as of 2 November 2026. Education, not legal advice. Use a securities lawyer for a real raise.*

**Process.** Investors move when others do, so concentrate meetings into a few weeks. Prepare first, then speak to several investors in parallel. Keep working on the company, because a stalled business weakens your position. Once a lead offers a term sheet, others often come along. Expect an unsuccessful month or two, and start with at least six months of cash.

**Due diligence** is the investor's check of your claims. Keep a **data room**, an organised shared folder, ready with your charter, cap table, stock issuances, 83(b) filings, IP assignments, material contracts, financial statements, metrics with raw data, and any legal claims. Most surprises here are self-inflicted: missing IP assignments, a late 83(b), a promised option never granted.

**Closing.** A priced round uses a stock purchase agreement, a restated certificate of incorporation, an investors' rights agreement, a voting agreement, and a right of first refusal and co-sale agreement, all usually based on NVCA forms. SAFEs are far simpler, which is why they are popular. Each investor signs, money wires, and you update the cap table. Then file what is required.

**Why securities law applies.** Shares, SAFEs and notes are generally securities. Under the Securities Act of 1933, each offer and sale must be registered with the SEC or fit an exemption. A startup uses an exemption:

| | Rule 506(b) | Rule 506(c) |
|---|---|---|
| Limit on amount | None | None |
| General solicitation | Not allowed | Allowed |
| Non-accredited buyers | Up to 35 in any 90 days, with disclosure duties | None |
| Accredited status | Reasonable belief | Must take reasonable steps to verify |

**General solicitation** means public offering, such as a tweet, a public demo day stating you are raising, or an open webinar with deal terms. Doing so can ruin 506(b), so talk with a lawyer before you announce. For 506(c), a March 2025 SEC staff no-action letter says that high minimum investments, USD 200,000 for individuals and USD 1,000,000 for entities in the request, with written representations and no knowledge to the contrary, can be reasonable verification steps. Module 6 covers the accredited investor definition, which has not changed as of this date.

**Filings.** For Regulation D, file **Form D** on SEC EDGAR within 15 days of the first sale, with no SEC fee, per the SEC. Many states require a notice filing and a fee under **blue sky laws**, their securities rules. Late or missing filings are an easy thing to avoid.

**Other traps:**

- **Bad actors.** Rule 506(d) disqualifies an offering if certain covered persons have specified securities-related convictions or orders. Ask directors and major holders.
- **Finders.** Paying someone a commission for finding investors can require them to be a registered broker. An unregistered finder can put your sale at risk. Ask your lawyer before agreeing to any success fee.
- **Foreign investors.** Different countries, different rules.
- **Fraud.** No exemption excuses it, as the previous lesson showed.

Other exemptions exist, with limits per the SEC: Rule 504 for up to USD 10 million in 12 months, Regulation A up to USD 75 million and Regulation Crowdfunding up to USD 5 million. Early startups usually use 506(b).

A good lawyer will do this as routine. Ask at the start, not after you have tweeted about your round.`,
          resources: [
            { title: 'Exempt offerings', url: 'https://www.sec.gov/resources-small-businesses/exempt-offerings', type: 'documentation', cost: 'free', provider: 'US Securities and Exchange Commission', note: 'The SEC\'s own comparison. It blocks automated downloads, so open it in a browser.', primary: true },
            { title: '17 CFR 230.506', url: 'https://www.law.cornell.edu/cfr/text/17/230.506', type: 'documentation', cost: 'free', provider: 'Cornell Legal Information Institute', note: 'Read paragraphs (b), (c) and (d).' },
            { title: 'Latham & Watkins no-action letter (12 March 2025)', url: 'https://www.sec.gov/rules-regulations/no-action-interpretive-exemptive-letters/division-corporation-finance-no-action/latham-watkins-503c-031225', type: 'documentation', cost: 'free', provider: 'SEC Division of Corporation Finance', note: 'Staff view on verification through high minimum investments.' },
            { title: 'NVCA Model Legal Documents', url: 'https://nvca.org/model-legal-documents/', type: 'documentation', cost: 'free', provider: 'National Venture Capital Association' },
          ],
          exercises: [
            {
              slug: 'data-room-index',
              title: 'Build a data room index',
              prompt:
                'Write a data room index for a fictional seed-stage company with 30 items in folders: corporate, equity, IP, commercial, finance, people and legal. For each, note who owns it and what a diligence reviewer looks for. Mark the five items most likely to delay a close.',
              kind: 'writing',
              difficulty: 1,
            },
            {
              slug: 'read-form-d',
              title: 'Read real Form D filings',
              prompt:
                'On SEC EDGAR, search for recent Form D filings from venture-backed startups. Read three. Record the exemption claimed, amount sold, number of investors, date of first sale, and filing date. Check whether each met the 15-day rule. Explain what a Form D reveals about a company\'s raise.',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'solicitation-cases',
              title: 'Judge solicitation cases',
              prompt:
                'For each, say whether a 506(b) raise is at risk, why, and what you would ask a lawyer: a tweet saying "we are raising a USD 2M seed"; a one-to-one email to a VC you met last year; a public webinar with your valuation cap; a founder describing the product at a conference with no mention of an offering; a paid LinkedIn ad inviting investors.',
              kind: 'problem',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What is the difference between Rule 506(b) and Rule 506(c)?',
              answerOutline:
                '506(b) bars general solicitation and permits up to 35 non-accredited buyers in 90 days. 506(c) allows general solicitation but requires all buyers to be accredited, and the issuer must take reasonable steps to verify that.',
            },
            {
              question: 'When is Form D due?',
              answerOutline: 'Within 15 days of the first sale, on EDGAR, with no SEC fee. State notice filings may also apply.',
            },
            {
              question: 'Why is paying a finder a percentage risky?',
              answerOutline:
                'Transaction-based pay can make the finder an unregistered broker, which can create liability and put the sale at risk.',
            },
            {
              question: 'Why start a raise with at least six months of cash?',
              answerOutline:
                'Fundraising takes months and can fail, and a founder near zero has no negotiating power.',
            },
          ],
          quiz: [
            {
              question: 'A Regulation D seed round makes its first sale on Wednesday 3 March 2027. By when is Form D due on EDGAR, under the 15-day rule in the lesson?',
              options: ['3 April 2027', '18 March 2027', '15 March 2027', '2 April 2027'],
              answer: 1,
              explanation:
                'Form D is due within 15 days of the *first* sale: 3 March plus 15 days is Thursday 18 March 2027, and there is no SEC fee. Thirty days is the 83(b) rule, a different deadline that is easy to mix up. The clock runs from the first sale, not from the close of the round, and state notice filings may also apply.',
            },
            {
              question: 'You want to announce your raise publicly on LinkedIn and will accept only accredited investors, whose status you will take reasonable steps to verify. Which exemption fits?',
              options: [
                'Rule 506(b)',
                'Regulation Crowdfunding, without using a portal',
                'None is needed, because a SAFE is not a security',
                'Rule 506(c)',
              ],
              answer: 3,
              explanation:
                'Rule 506(c) allows general solicitation if every buyer is accredited and you take reasonable steps to verify it. A public post is general solicitation, which 506(b) does not allow. Regulation Crowdfunding requires a registered portal, and SAFEs are generally securities.',
            },
          ],
        },
      ],
    },
    {
      slug: 'running-a-private-company',
      title: 'Running a Private Company',
      description:
        'Boards and fiduciary duties, hiring lawfully, option plans and 409A valuations, secondary sales, taxes and compliance, and the qualified small business stock rules as amended in 2025.',
      lessons: [
        {
          slug: 'boards-duties-and-investor-updates',
          title: 'Boards, fiduciary duties and investor updates',
          summary:
            'What a board does, what directors owe the company, the Trados lesson on conflicts in a sale, and how to keep investors informed.',
          estimatedMinutes: 100,
          objectives: [
            'Describe what a board decides and how it differs from management',
            'State the duties of care and loyalty and the business judgment rule',
            'Explain what the Trados case teaches about conflicts in a sale',
            'Run a useful board meeting and keep records',
            'Write a concise and honest investor update',
          ],
          concepts: [
            'Board of directors',
            'Duty of care',
            'Duty of loyalty',
            'Business judgment rule',
            'Entire fairness',
            'Board consent',
            'Investor update',
            'D&O insurance',
          ],
          explanation: `*Delaware law as generally applied, as of 2 November 2026. Education, not legal advice.*

Stockholders own a corporation, a **board of directors** oversees it, and officers such as the CEO run it. Early on, founders fill all three roles. After a priced round, the board may have investors on it. It hires and fires the CEO, approves stock issues and option grants, and approves a financing or sale.

**Fiduciary duties.** Directors owe the company and its stockholders a **duty of care** (inform themselves and act carefully) and a **duty of loyalty** (put the company ahead of their own interests). The **business judgment rule** means courts generally will not second-guess an informed, disinterested and good-faith decision, even one that turns out badly. If a majority is conflicted, a court can apply **entire fairness**, the most demanding standard, and defendants must show fair dealing and a fair price.

**The Trados lesson.** In re Trados Inc. Shareholder Litigation (Delaware Court of Chancery, 2013) is the case every founder should know. Venture investors holding preferred stock, and directors tied to them, approved a sale of Trados to SDL for USD 60 million. A management incentive plan took the first USD 7.8 million, the preferred received USD 52.2 million, and the common received nothing. Without the plan, common would have received USD 2.1 million. The court held that the board's conflicted directors did not follow a fair process and applied entire fairness. It nevertheless found for the defendants, because the common stock had no economic value in the first place, so the price was fair.

Two lessons follow. Directors' duties run to the residual claimants, ordinarily the common stockholders, and a preferred investor's director can be conflicted when preferences diverge from common's interests. And process matters: a board with a real conflict should consider independent directors, a special committee or a separate vote and should take advice early.

**A working board.** A typical early board has three members: two founders and one investor, or one founder, one investor and an independent. Meet about every quarter. Send materials several days before. Use the time for the two or three hardest decisions, not for a status report. Have decisions recorded in minutes or written consents, especially stock and option approvals. An unapproved grant is a real defect, and fixing it later is expensive. **D&O insurance** covers directors and officers against certain claims, and investors often require it once a board forms.

**Do you lose control?** Paul Graham's essay "Founder Mode" argues that the conventional advice to manage like a professional executive and delegate fully has hurt founders, and that some should stay closer to details. Others reply that founders need to learn to build a team. This is an ongoing debate with little data. You may need different styles at different sizes.

**Investor updates.** Send a short monthly or quarterly email, in good times and bad. A usable structure:

- Headline and overall state, in two lines.
- Key metrics, with the same definitions each time.
- Cash and runway.
- What went well, and what went badly.
- What you need: hires, introductions, advice.

Reporting bad news early is what makes investors useful when things go wrong, and it is much better than surprising them. Many investors' rights agreements require financial statements anyway.`,
          resources: [
            { title: 'In re Trados Inc. Shareholder Litigation (2013)', url: 'https://courts.delaware.gov/Opinions/Download.aspx?id=193520', type: 'documentation', cost: 'free', provider: 'Delaware Court of Chancery', note: 'Read the opening summary. The whole opinion is long.', primary: true },
            { title: 'Delaware General Corporation Law', url: 'https://delcode.delaware.gov/title8/c001/index.html', type: 'documentation', cost: 'free', provider: 'State of Delaware', note: 'Browse subchapter IV on directors and officers.' },
            { title: 'Founder Mode', url: 'https://paulgraham.com/foundermode.html', type: 'article', cost: 'free', provider: 'Paul Graham', note: 'One side of the debate on how founders should manage.' },
          ],
          exercises: [
            {
              slug: 'trados-brief',
              title: 'Brief the Trados decision',
              prompt:
                'Read the first ten pages of the Trados opinion. In 250 words, state the facts, the standard of review, the holding and why the defendants won. Then say what you would have asked the board to do differently, had you been counsel to the company.',
              kind: 'reading',
              difficulty: 2,
            },
            {
              slug: 'write-an-update',
              title: 'Write two investor updates',
              prompt:
                'For a fictional company, write one update for a good month, and one for a month when a key customer left and runway fell from 14 to 9 months. Use the same structure and metrics. Have someone read the bad-news version, and ask whether they trust it and whether they would know how to help.',
              kind: 'writing',
              difficulty: 1,
            },
            {
              slug: 'board-agenda',
              title: 'Plan a board meeting',
              prompt:
                'Write a 90-minute agenda and a two-page pre-read for a seed-stage board deciding whether to cut burn or hire two salespeople. Include what needs a formal vote, how it is recorded and who might be conflicted. Keep status reporting to under 15 minutes.',
              kind: 'writing',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What does the business judgment rule do?',
              answerOutline:
                'It protects informed, disinterested and good-faith decisions from second-guessing by courts, so directors are not liable merely because an outcome is bad.',
            },
            {
              question: 'In Trados, why did the common get nothing, and why did defendants still win?',
              answerOutline:
                'The preferences and the management plan exceeded the sale price. The process was unfair, but the court found common had no economic value, so the price was fair.',
            },
            {
              question: 'Why send updates when things are going badly?',
              answerOutline:
                'Early warnings keep trust and give investors time to help. Surprises at the point of crisis do the opposite.',
            },
          ],
          quiz: [
            {
              question: 'In Trados, the court found the board\'s process unfair and applied entire fairness. Why did the defendants still win?',
              options: [
                'The business judgment rule protected the directors after all',
                'The preferred investors gave up their preference before the sale',
                'The common stock had no economic value before the sale, so the price was fair to it',
                'The common stockholders had approved the management incentive plan',
              ],
              answer: 2,
              explanation:
                'Entire fairness asks about fair dealing *and* fair price. The court found the dealing flawed, but held that the common stock had no economic value going in, so receiving nothing was a fair price. The business judgment rule did not apply, because a conflicted board loses its protection. The lesson is that process still matters: a court can find against you.',
            },
          ],
        },
        {
          slug: 'hiring-and-employment',
          title: 'Hiring and employment law basics',
          summary:
            'First hires, employees versus contractors, offers, the state of non-compete law, and the basic duties you take on once you have staff.',
          estimatedMinutes: 90,
          objectives: [
            'Decide when and whom to hire first',
            'Tell an employee from an independent contractor and state the risks of misclassifying',
            'List what to do when hiring in the US',
            'State the current position on non-competes',
            'Explain the WARN Act threshold and the basic idea of at-will employment',
          ],
          concepts: [
            'First hires',
            'Employee versus contractor',
            'At-will employment',
            'Offer letter',
            'Non-compete',
            'Payroll and withholding',
            'Equity grant',
            'WARN Act',
          ],
          explanation: `*US law as of 2 November 2026. Employment rules vary a great deal by state. Education, not legal advice.*

**Hire later than you want to.** Graham's advice in "The 18 Mistakes" and elsewhere is that early hires add burn and complexity, so add people only when the need is proven. Each hire changes your runway: a person with a USD 150,000 salary costs about USD 15,000 to USD 18,000 a month with payroll taxes and benefits, depending on the state and plan. Early hires also set the culture. Hire people who own problems and are comfortable with uncertainty.

**Employee or contractor?** A contractor runs their own business, and you do not withhold tax. Labelling someone a contractor does not make it so. The IRS looks at behavioural control, financial control and the relationship. Federal labour rules have shifted, and some states, including California, use a stricter test. Getting it wrong can mean back taxes, penalties, and wage claims. Remember the IP point from Module 5: a contractor needs a signed assignment.

**Hiring someone in the US.** The usual list:

- A written offer letter stating title, pay, equity subject to board approval, and at-will status.
- An invention assignment and confidentiality agreement, signed before work begins.
- Form I-9 to verify work authorisation, and Form W-4 for federal withholding.
- Payroll set up with federal and state tax accounts. Use a payroll provider.
- State registration for unemployment insurance and workers' compensation.
- Written option grant, approved by the board.

**At-will employment** means either side may end the relationship at any time for almost any lawful reason, in every state except Montana, which has its own rules for many workers. It does not permit firing for an illegal reason such as discrimination or retaliation. Anti-discrimination law covers employers at sizes that differ between federal and state rules, so treat it as applying from your first hire.

**Non-competes.** The FTC's 2024 rule banning most non-competes was set aside by a federal court in Ryan LLC v. FTC in August 2024, and on 5 September 2025 the FTC dropped its appeal. It says it will pursue harmful non-competes case by case. So state law governs. California generally makes them unenforceable, and several states restrict them by income or role. Do not assume a template works everywhere. Invention assignments and confidentiality are the protections that matter most.

**Equity for employees.** Early hires receive stock options from the pool, typically vesting over four years with a one-year cliff, as covered in the next lesson. Explain what the grant is. A percentage of fully diluted shares is more honest than a share count, and say plainly that the shares may be worth nothing.

**Letting people go.** Be humane and clear, and take advice on any final pay rules and any release. Some states require prompt payment of final wages. The federal **WARN Act** generally requires employers with 100 or more employees to give 60 days' notice of plant closings and mass layoffs, per the Department of Labor, and some states have stricter versions.

**Pay yourself lawfully.** Founders who are employees are on payroll too. Do not just draw money from a corporate account. Ask your accountant how to structure this.`,
          resources: [
            { title: 'Independent contractor (self-employed) or employee?', url: 'https://www.irs.gov/businesses/small-businesses-self-employed/independent-contractor-self-employed-or-employee', type: 'documentation', cost: 'free', provider: 'US Internal Revenue Service', primary: true },
            { title: 'WARN Act compliance assistance', url: 'https://www.dol.gov/agencies/eta/layoffs/warn', type: 'documentation', cost: 'free', provider: 'US Department of Labor', note: 'DOL blocks automated downloads, so open it in a browser.' },
            { title: 'The 18 Mistakes That Kill Startups', url: 'https://paulgraham.com/startupmistakes.html', type: 'article', cost: 'free', provider: 'Paul Graham', note: 'See the sections on hiring and on spending too much.' },
            { title: 'The Holloway Guide to Equity Compensation', url: 'https://www.holloway.com/g/equity-compensation', type: 'textbook', cost: 'freemium', provider: 'Holloway' },
          ],
          exercises: [
            {
              slug: 'cost-of-a-hire',
              title: 'Compute the real cost of a hire',
              prompt:
                'For a USD 140,000 engineer in your state, estimate monthly cost including employer payroll taxes, benefits, equipment and recruiting. Show how much runway this removes from a company with USD 1.2 million cash and USD 90,000 net burn. State your sources for the tax rates, and the date.',
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'classify-workers',
              title: 'Classify five workers',
              prompt:
                'Using the IRS categories of behavioural control, financial control and relationship, assess each: a full-time designer who works only for you, on your schedule, invoiced monthly; a freelance accountant with many clients; a developer paid hourly on your laptop; a student intern; a sales agent paid commission only. State the risk and what you would ask a lawyer. Remember that the state test may differ.',
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'state-noncompete-check',
              title: 'Look up your state',
              prompt:
                'Find your state\'s current law on non-competes and on final pay timing from an official or well-sourced legal page. Record the rule, any income threshold, the date and the source. Then explain how you would handle an employee who moves to California during employment. State what you are unsure of.',
              kind: 'reading',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Is the FTC non-compete ban in force as of November 2026?',
              answerOutline:
                'No. A federal court set the rule aside in August 2024, and the FTC dropped its appeal on 5 September 2025. State law governs, and the FTC acts case by case.',
            },
            {
              question: 'Does calling a person a contractor make them one?',
              answerOutline:
                'No. The substance of the relationship governs, using IRS and state tests. Misclassification can bring back taxes, penalties and wage claims.',
            },
            {
              question: 'Which WARN Act threshold is standard, and what does it require?',
              answerOutline:
                'Generally employers with 100 or more employees must give 60 days\' notice of plant closings and mass layoffs. Some states are stricter.',
            },
          ],
          quiz: [
            {
              question: 'A company has USD 1.5 million in cash and burns USD 100,000 a month net. It hires an engineer at USD 120,000 a year, and payroll taxes and benefits add 25% on top of salary. What is the runway after the hire?',
              options: ['About 13.3 months', 'About 13.6 months', '15 months', '12 months'],
              answer: 0,
              explanation:
                'The hire costs $120{,}000 / 12 \\times 1.25 = 12{,}500$ a month, so net burn becomes 112,500 and runway $1{,}500{,}000 / 112{,}500 \\approx 13.3$ months, down from 15. Counting salary alone (USD 10,000 a month) gives 13.6 and understates the cost, which is the mistake the lesson warns about.',
            },
          ],
        },
        {
          slug: 'option-plans-409a-and-secondaries',
          title: 'Option plans, 409A valuations and secondary sales',
          summary:
            'How stock options work, why a 409A valuation is needed, what an employee pays to exercise, and how private shares get sold before an exit.',
          estimatedMinutes: 120,
          objectives: [
            'Explain options, strike price, vesting and exercise',
            'Compare ISOs and NSOs',
            'Explain why a 409A valuation is needed and when it expires',
            'Compute what it costs an employee to exercise and leave',
            'Explain Rule 701 and the 12(g) holder limits',
            'Explain how secondary sales and tender offers work',
          ],
          concepts: [
            'Stock option',
            'Strike price',
            'ISO and NSO',
            '409A valuation',
            'Post-termination exercise period',
            'Rule 701',
            'Secondary sale',
            'Tender offer',
            'Right of first refusal',
          ],
          explanation: `*US law as of 2 November 2026. Education, not legal or tax advice. Use a tax adviser for your own grants.*

A **stock option** is a right to buy shares at a fixed **strike price**. If the company's value rises, the difference is the employee's gain. Options come from the pool, are granted by the board under a stockholder-approved plan and usually vest over four years with a one-year cliff.

**ISO or NSO.** Under 26 USC 422, **incentive stock options** can go only to employees, must be priced at fair market value or above, and give favourable tax if shares are held two years from grant and one year from exercise, though the spread at exercise can trigger alternative minimum tax. **Non-qualified options** (NSOs) can go to anyone, and the spread at exercise is ordinary income. ISO treatment is limited to USD 100,000 of stock first exercisable in a year, valued at grant.

**Why a 409A valuation.** Section 409A treats a discounted option as deferred compensation, with income on vesting plus a 20% additional federal tax and interest. So the strike must be at least fair market value. Because no market exists, companies get a **409A valuation**. Under Treasury regulation 1.409A-1(b)(5)(iv)(B), an independent appraisal is presumed reasonable if dated no more than 12 months before the grant. A valuation stops being usable once material new information appears, such as a financing, so get a new one after every priced round.

Common is usually valued below the latest preferred price, because it lacks the preference.

**What employees pay.** Priya holds 20,000 vested options at a USD 0.40 strike, and the 409A value is USD 1.50. To exercise she pays USD 8,000. For an NSO, the USD 22,000 spread is ordinary income, about USD 7,700 at an illustrative 35%, for USD 15,700 in cash, for shares she cannot sell. An ISO has no regular tax at exercise, but it may bring alternative minimum tax.

**Leaving.** ISOs must be exercised within three months of leaving employment to keep their status, and plans have often ended all options after 90 days. Employees can lose equity they cannot afford to exercise, so some companies extend the window, which turns ISOs into NSOs. **Early exercise** lets employees buy unvested shares, making an 83(b) election possible.

**Securities rules.** **Rule 701** exempts compensatory grants by private companies, up to the greatest of USD 1 million, 15% of total assets or 15% of the outstanding class in 12 months. Above USD 10 million in 12 months, you must give extra disclosure including financial statements. Under Exchange Act section 12(g), a company with over USD 10 million in assets must register once a class is held by 2,000 holders, or by 500 non-accredited holders. Holders who received securities under employee compensation plans are excluded.

**Secondary sales** are sales of existing shares from holders to investors, with no new money to the company. Founders may sell some in later rounds to reduce risk. Companies often hold a **right of first refusal** over transfers. A company-run **tender offer** gives many employees the chance to sell. Under SEC Rule 14e-1, a tender offer must stay open at least 20 business days. A secondary sale price can affect your next 409A value.`,
          resources: [
            { title: 'The Holloway Guide to Equity Compensation', url: 'https://www.holloway.com/g/equity-compensation', type: 'textbook', cost: 'freemium', provider: 'Holloway', note: 'The most complete plain-English guide.', primary: true },
            { title: '26 CFR 1.409A-1', url: 'https://www.law.cornell.edu/cfr/text/26/1.409A-1', type: 'documentation', cost: 'free', provider: 'Cornell Legal Information Institute', note: 'Search for paragraph (b)(5)(iv)(B).' },
            { title: '17 CFR 230.701', url: 'https://www.law.cornell.edu/cfr/text/17/230.701', type: 'documentation', cost: 'free', provider: 'Cornell Legal Information Institute' },
            { title: 'Early Exercisable Stock Options: What You Need to Know', url: 'https://www.cooleygo.com/early-exercisable-stock-options-what-you-need-to-know/', type: 'article', cost: 'free', provider: 'Cooley GO' },
            { title: '26 USC 422: Incentive stock options', url: 'https://www.law.cornell.edu/uscode/text/26/422', type: 'documentation', cost: 'free', provider: 'Cornell Legal Information Institute' },
          ],
          exercises: [
            {
              slug: 'exercise-cost',
              title: 'Compute the cost of leaving',
              prompt:
                'Make a small spreadsheet calculator with input cells for vested options, strike, current 409A value and an assumed tax rate, and formula cells for exercise cost, taxable spread, tax on the spread and total cash needed to exercise an NSO. Check it against the lesson (USD 8,000, USD 22,000 and USD 15,700). Show how the total changes after a Series B raises the 409A value to USD 4.00. Then write a short note to an employee with USD 10,000 in savings, saying what the numbers mean and what to ask a tax adviser; note that an ISO would be taxed differently.',
              kind: 'problem',
              difficulty: 1,
              hint: 'At a USD 4.00 409A value the spread is 20,000 × 3.60 = USD 72,000, so the total cash is 8,000 + 35% of 72,000 = USD 33,200.',
            },
            {
              slug: 'iso-limit',
              title: 'Apply the USD 100,000 ISO limit',
              prompt:
                'A hire receives 400,000 ISOs at a USD 0.40 strike, vesting 25% at month 12 then monthly for 36 months. Grant-date value is USD 0.40 per share. Compute the value first exercisable in each calendar year, for a grant on 1 March 2027, and identify any amount over USD 100,000 that becomes non-qualified. Then repeat with the value at USD 1.50.',
              kind: 'problem',
              difficulty: 3,
            },
            {
              slug: 'tender-offer-plan',
              title: 'Plan a tender offer',
              prompt:
                'Draft a one-page plan for a fictional Series C company allowing employees to sell up to 20% of vested shares at a set price. Cover who may sell, the timetable (at least 20 business days open), what information they get, the effect on the 409A, right of first refusal waivers, and tax treatment questions for an adviser.',
              kind: 'writing',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why must option strike prices be at least fair market value?',
              answerOutline:
                'A discounted option falls under section 409A, with income on vesting, a 20% additional tax and interest for the holder.',
            },
            {
              question: 'How long is a 409A appraisal valid?',
              answerOutline:
                'Up to 12 months, and only until a material event such as a financing. After that you need a new valuation.',
            },
            {
              question: 'Why might an employee who leaves lose vested options?',
              answerOutline:
                'A short exercise window requires cash for the strike and any tax, for shares that cannot be sold.',
            },
            {
              question: 'What is a secondary sale, and how does it differ from a primary one?',
              answerOutline:
                'Existing holders sell shares to new buyers, so cash goes to the sellers. In a primary sale, new shares are issued and cash goes to the company.',
            },
          ],
          quiz: [
            {
              question: 'An employee leaves with 10,000 vested **NSOs** at a USD 0.80 strike. The 409A value is USD 3.00, and her tax rate on the spread is an illustrative 30%. How much cash does she need to exercise and pay the tax?',
              options: ['USD 8,000', 'USD 14,600', 'USD 30,000', 'USD 6,600'],
              answer: 1,
              explanation:
                'Exercise costs $10{,}000 \\times 0.80 = 8{,}000$. The spread is $10{,}000 \\times (3.00 - 0.80) = 22{,}000$ of ordinary income, so tax is $0.30 \\times 22{,}000 = 6{,}600$, for USD 14,600 in total, for shares she cannot sell. USD 8,000 forgets the tax, which is the usual surprise.',
            },
            {
              question: 'On 1 March a board grants options using a 409A appraisal dated 1 November, but the company closed a Series A on 15 January. Can it rely on that appraisal?',
              options: [
                'Yes, because it is less than 12 months old',
                'Yes, as long as the strike price is above par value',
                'No, because a 409A appraisal lasts only six months',
                'No, because the Series A is material new information, so a new valuation is needed',
              ],
              answer: 3,
              explanation:
                'Twelve months is the outer limit, not a guarantee: an appraisal stops being usable once material new information appears, and a financing is the classic example. That is why companies get a new 409A after every priced round. Par value has nothing to do with fair market value.',
            },
          ],
        },
        {
          slug: 'taxes-compliance-and-qsbs',
          title: 'Taxes, compliance and qualified small business stock',
          summary:
            'The filings a startup cannot skip, payroll taxes that can follow you personally, R&D rules, and the section 1202 exclusion as changed in 2025.',
          estimatedMinutes: 110,
          objectives: [
            'List recurring federal and state obligations',
            'Explain personal liability for unpaid payroll taxes',
            'Explain section 174A and the R&D payroll credit',
            'Determine whether stock is qualified small business stock',
            'Compute the exclusion by holding period for stock issued after 4 July 2025',
            'Say what is uncertain, and when to get professional help',
          ],
          concepts: [
            'Form 1120',
            'Trust fund recovery penalty',
            'Sales tax nexus',
            'Section 174A',
            'R&D payroll credit',
            'Qualified small business stock',
            'Gross assets test',
            'Per-issuer limit',
          ],
          explanation: `*US federal tax as of 2 November 2026. Education, not tax advice. Hire an accountant before your first return.*

**Recurring duties.** A C corporation must file a federal return (Form 1120) each year, even with no income. Delaware franchise tax and the annual report are due by 1 March, as Module 5 showed.

**Payroll taxes can become personal.** Employers hold back income and employment tax from wages in trust for the government. Under 26 USC 6672, a person responsible for paying these over who wilfully fails to do so can be personally liable for the full amount. Never use withheld taxes to make payroll.

**Sales tax.** Since South Dakota v. Wayfair (US Supreme Court, 2018), states can require remote sellers to collect sales tax based on sales into the state, and some states tax software.

**Research costs.** Section 174A, added by Public Law 119-21 on 4 July 2025, lets US taxpayers deduct domestic research costs, including software development, in tax years beginning after 31 December 2024, with an option to amortise them over at least 60 months. This reverses the rule since 2022 that required amortisation. Foreign research is treated less generously.

**R&D credit against payroll tax.** Under 26 USC 41(h), a small company with under USD 5 million in gross receipts and no receipts before a five-year window can elect to use up to USD 500,000 of research credit each year against payroll tax, for up to five years. It is claimed with Form 6765.

**Qualified small business stock (QSBS).** Section 1202 can exclude gain on sale of stock in a C corporation from federal tax. The basic conditions are that a non-corporate holder acquired the stock at original issue, that the company's gross assets were within the limit at and just after issuance, that it runs an active qualified business, and that it is not in an excluded field such as health, law, consulting, finance, farming, mining or hospitality.

The 2025 law changed these rules for stock issued after 4 July 2025:

| | Stock issued on or before 4 July 2025 | Stock issued after 4 July 2025 |
|---|---|---|
| Minimum holding | More than 5 years | 3 years |
| Exclusion | 100% in most recent cases | 50% at 3 years, 75% at 4, 100% at 5 or more |
| Gross assets limit | USD 50 million | USD 75 million, indexed after 2026 |
| Per-issuer cap | Greater of USD 10 million or 10x basis | Greater of USD 15 million, indexed after 2026, or 10x basis |

**Worked example.** A USD 8 million gain, using top federal rates of 20% plus the 3.8% net investment income tax:

| Held | Excluded | Federal tax | Effective rate |
|---|---|---|---|
| No QSBS | 0% | USD 1,904,000 | 23.8% |
| 3 years | 50% | USD 1,272,000 | 15.9% |
| 4 years | 75% | USD 636,000 | 7.95% |
| 5 years | 100% | USD 0 | 0% |

Note that the three-year result is worth less than half off, because the taxable part of section 1202 gain is taxed at a 28% maximum rate. This is a simplified calculation.

**Limits.** State treatment varies: California does not conform, per the Franchise Tax Board. Section 1045 allows rollover of gain into new QSBS after a six-month hold. For options, the clock starts at exercise. For SAFEs, the start date is uncertain, though the YC form says the parties intend stock treatment for section 1202. Keep records, and use a tax adviser.`,
          resources: [
            { title: '26 USC 1202', url: 'https://www.law.cornell.edu/uscode/text/26/1202', type: 'documentation', cost: 'free', provider: 'Cornell Legal Information Institute', note: 'Read (a), (b), (c), (d) and (e)(3), and the 2025 amendment notes.', primary: true },
            { title: '26 USC 174A', url: 'https://www.law.cornell.edu/uscode/text/26/174A', type: 'documentation', cost: 'free', provider: 'Cornell Legal Information Institute' },
            { title: '26 USC 6672', url: 'https://www.law.cornell.edu/uscode/text/26/6672', type: 'documentation', cost: 'free', provider: 'Cornell Legal Information Institute' },
            { title: 'About Form 6765', url: 'https://www.irs.gov/forms-pubs/about-form-6765', type: 'documentation', cost: 'free', provider: 'US Internal Revenue Service' },
            { title: 'Summary of Federal Income Tax Changes', url: 'https://www.ftb.ca.gov/about-ftb/data-reports-plans/summary-of-federal-income-tax-changes/index.html', type: 'documentation', cost: 'free', provider: 'California Franchise Tax Board', note: 'A state view of the 2025 federal changes.' },
          ],
          exercises: [
            {
              slug: 'qsbs-calculator',
              title: 'Build a QSBS estimate',
              prompt:
                'In a spreadsheet, with input cells for issue date, years held, gain and basis, work out the exclusion percentage from the lesson\'s table (with separate rules for stock issued on or before 4 July 2025 and after it), the per-issuer cap (the greater of the dollar limit or 10x basis) and a federal tax estimate using 28% plus 3.8% on the non-excluded part, as the lesson does. Reproduce the lesson\'s worked table for stock issued after 4 July 2025. Then take a USD 40 million gain with USD 100,000 of basis, held five years: find the cap, how much gain is excluded and how much is not, and estimate tax on the rest at the lesson\'s 23.8%. Label everything as a simplified estimate, not tax advice.',
              kind: 'problem',
              difficulty: 3,
              hint: 'For the USD 40 million case the cap is the greater of USD 15 million and 10 × 100,000 = USD 1 million, so USD 15 million is excluded and USD 25 million is not: about USD 5.95 million of federal tax at 23.8%.',
            },
            {
              slug: 'compliance-calendar',
              title: 'Build a compliance calendar',
              prompt:
                'Build a year\'s calendar for a Delaware C corporation operating in your state with four employees: Delaware franchise tax, federal and state returns, payroll deposits, 1099s, 409A renewal and any state annual report. Cite the source for each date, and flag the ones that you would hand to an accountant.',
              kind: 'writing',
              difficulty: 1,
            },
            {
              slug: 'qsbs-eligibility',
              title: 'Judge QSBS eligibility',
              prompt:
                'Assess each, citing section 1202: a founder of a software C corporation with stock issued in 2026; an LLC that converted to a C corporation in 2027; a law firm structured as a corporation; a buyer of shares from a retiring founder; a company with USD 80 million in gross assets at issuance in 2026; and a restaurant chain. Say what you are unsure about.',
              kind: 'problem',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why can unpaid payroll taxes become a founder\'s personal debt?',
              answerOutline:
                'Section 6672 makes responsible persons who wilfully fail to pay over withheld taxes personally liable for the full amount.',
            },
            {
              question: 'For stock issued after 4 July 2025, what exclusion applies at 3, 4 and 5 years?',
              answerOutline: '50%, 75% and 100%, up to the greater of USD 15 million (indexed after 2026) or 10x basis.',
            },
            {
              question: 'Why is a 3-year exit\'s effective federal rate about 15.9% and not about 11.9%?',
              answerOutline:
                'The non-excluded half is section 1202 gain, taxed at up to 28%, plus 3.8%, so half of 31.8% is 15.9%.',
            },
            {
              question: 'Does California follow section 1202?',
              answerOutline: 'No. The Franchise Tax Board says that California does not conform, so the gain is taxable there.',
            },
          ],
          quiz: [
            {
              question: 'Qualifying stock issued in August 2025 is sold after exactly four years for a USD 2 million gain, within the cap. Using the lesson\'s simplified rates (28% plus 3.8% on the non-excluded part), what is the federal tax?',
              options: ['USD 0', 'USD 119,000', 'USD 159,000', 'USD 476,000'],
              answer: 2,
              explanation:
                'Stock issued after 4 July 2025 gets 75% exclusion at four years, so USD 500,000 is taxable at $28\\% + 3.8\\% = 31.8\\%$: USD 159,000. Zero needs five years. USD 119,000 uses 23.8%, but the lesson notes the non-excluded section 1202 gain is taxed at up to 28%. This is a simplified federal estimate, not advice.',
            },
            {
              question: 'Assume every other section 1202 condition is met. Which of these is **not** qualified small business stock?',
              options: [
                'Shares bought from a departing co-founder',
                'Founder stock in a software C corporation, issued in 2026',
                'Stock issued in 2026 when the company had USD 60 million of gross assets',
                'Shares received on exercising a stock option',
              ],
              answer: 0,
              explanation:
                'QSBS must be acquired at original issue from the company, so shares bought from another stockholder do not qualify. The USD 60 million company is within the USD 75 million gross assets limit that applies to stock issued after 4 July 2025 (it would have failed the old USD 50 million test). Option shares can qualify, with the clock starting at exercise.',
            },
          ],
        },
      ],
    },
    {
      slug: 'exits-and-endings',
      title: 'Exits and Endings',
      description:
        'How companies are sold or go public, who actually gets paid in a liquidation waterfall, how to handle down rounds and pivots, and how to shut a company down well.',
      lessons: [
        {
          slug: 'acquisitions-and-ipos',
          title: 'Acquisitions and IPOs',
          summary:
            'How an acquisition works, what price really means after escrows and earnouts, the regulatory and tax points, and what going public involves.',
          estimatedMinutes: 110,
          objectives: [
            'Describe the stages of an acquisition from first talks to closing',
            'Compare asset sale, stock sale and merger',
            'Explain escrows, earnouts and retention packages',
            'State the 2026 HSR threshold and the 280G rule',
            'Describe the main steps of an IPO and why few companies take that path',
          ],
          concepts: [
            'Letter of intent',
            'Asset sale, stock sale and merger',
            'Escrow',
            'Earnout',
            'Hart-Scott-Rodino filing',
            'Section 280G',
            'Initial public offering',
            'Lock-up',
          ],
          explanation: `*US law as of 2 November 2026. Education, not legal or tax advice. Use an experienced M&A lawyer on any real deal.*

**Companies are bought, not sold.** Most venture-backed exits that return money are acquisitions rather than IPOs. Buyers act for a reason: revenue, product, technology, a team or defence against a rival. Keep relationships with likely buyers long before you need them, and get a banker involved for a large process.

**The stages.** Talks lead to a **letter of intent** (LOI), a mostly non-binding outline of price and terms, usually with binding exclusivity. Then comes due diligence, a definitive agreement and approvals from the board and stockholders, under the voting thresholds in your documents and, if needed, a drag-along. Then closing, with payment through a paying agent.

**Structure.** In an **asset sale**, the buyer takes chosen assets and leaves liabilities behind. In a **stock sale**, it buys the shares. In a **merger**, the most common for venture-backed companies, the target merges into the buyer's subsidiary by a stockholder vote. Each has different tax and consent effects. Sales of a C corporation's assets can be taxed twice.

**Price is not proceeds.** The headline price falls before stockholders see it. Debt is repaid. Advisers are paid. Working capital is adjusted. Then:

- An **escrow** or holdback, often around 10% of the price for 12 to 18 months, secures the seller's promises. You may not receive it.
- An **earnout** pays more if targets are met after closing. Earnouts often fail to pay in full, because you no longer control the business. Value them well below their face amount.
- **Retention** packages pay employees to stay. Buyers often shift value from price to retention, which helps the team and reduces what stockholders receive.
- **Stock consideration** may fall in value or be locked up.

**Regulation and tax points.**

- **Hart-Scott-Rodino (HSR).** Deals above a size threshold need a filing with the FTC and the Department of Justice and a waiting period. The size-of-transaction threshold is USD 133.9 million, effective 17 February 2026, and it changes each year.
- **Section 280G.** Payments contingent on a change of control that reach three times a person's base amount are "parachute payments": the company loses its deduction on the excess, and the person owes a 20% excise tax under section 4999. A private company can avoid this if holders of more than 75% of voting power approve after full disclosure.
- **QSBS.** Founders may have a large exclusion, as Module 8 showed, and deal structure can affect it.

**IPOs.** In an **initial public offering**, a company sells shares to the public. It files a registration statement with the SEC, usually Form S-1, and can sell only once the SEC declares it effective, after which it must file Exchange Act reports. Investment banks act as underwriters and price the shares. Insiders usually sign a **lock-up**, customarily 180 days, a contract and not a law, so they cannot sell at once. A **direct listing** lists existing shares without an underwritten raise. Being public means quarterly reporting, internal controls and constant disclosure. Very few companies get there.

**Who decides?** Founders, boards and investors can want different things, as Module 6 explained. Read your drag-along and protective provisions before an offer arrives, because they decide who can say yes.`,
          resources: [
            { title: 'Going Public', url: 'https://www.sec.gov/resources-small-businesses/going-public', type: 'documentation', cost: 'free', provider: 'US Securities and Exchange Commission', note: 'The SEC blocks automated downloads, so use a browser.', primary: true },
            { title: 'Revised Jurisdictional Thresholds for Section 7A of the Clayton Act', url: 'https://www.federalregister.gov/documents/2026/01/16/2026-00877/revised-jurisdictional-thresholds-for-section-7a-of-the-clayton-act', type: 'documentation', cost: 'free', provider: 'Federal Register', note: 'The FTC notice for 2026. A new one appears each January, so check the current year.' },
            { title: '26 USC 280G', url: 'https://www.law.cornell.edu/uscode/text/26/280G', type: 'documentation', cost: 'free', provider: 'Cornell Legal Information Institute' },
            { title: 'How AI is shaping the startup exit market in 2026', url: 'https://carta.com/data/startup-exit-environment-h2-2026/', type: 'article', cost: 'free', provider: 'Carta', note: 'Current exit data from Carta. It blocks automated downloads, so use a browser.' },
          ],
          exercises: [
            {
              slug: 'headline-to-net',
              title: 'From headline to net',
              prompt:
                'A company is sold for USD 40 million: USD 30 million in cash at closing, USD 10 million as an earnout over two years. It has USD 1.5 million of debt, USD 1 million of fees and a 10% escrow on the cash portion. Compute cash at closing to stockholders, the escrow, and expected total if you value the earnout at 40% of face and assume 80% of the escrow is released. List the assumptions.',
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'read-an-s1',
              title: 'Read a real S-1',
              prompt:
                'On SEC EDGAR, open the S-1 of a company that went public in the last five years. Find the risk factor summary, founders\' ownership, lock-up terms, dual-class structure if any, and loss history. Compare founders\' stake with this course\'s dilution table. Write what surprised you.',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'buyer-map',
              title: 'Map likely buyers',
              prompt:
                'For a fictional company, list six possible acquirers. For each, state why it might buy, what it would pay for (revenue, product, team), and who inside would sponsor the deal. Then write what you could do in the next year to make the company attractive that also helps it if it stays independent.',
              kind: 'writing',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'Why is the headline price not what stockholders receive?',
              answerOutline:
                'Debt, fees, working capital adjustments, escrows, earnouts, retention and preferences all reduce or delay it.',
            },
            {
              question: 'Is a USD 100 million acquisition automatically reportable under HSR in 2026?',
              answerOutline:
                'No. It is below the 2026 size-of-transaction threshold of USD 133.9 million, effective 17 February 2026. The threshold is revised yearly, and deals above it have further tests.',
            },
            {
              question: 'How can a private company avoid section 280G penalties?',
              answerOutline:
                'Holders of more than 75% of the voting power approve the payments after adequate disclosure.',
            },
          ],
          quiz: [
            {
              question: 'Your company is sold for a headline USD 50 million in cash. It repays USD 3 million of debt and pays USD 1.5 million of fees, and 10% of the headline price is held in escrow. How much cash do stockholders receive at closing?',
              options: ['USD 45.5 million', 'USD 40.5 million', 'USD 50 million', 'USD 40.95 million'],
              answer: 1,
              explanation:
                '$50 - 3 - 1.5 = 45.5$ million, less the USD 5 million escrow, leaves USD 40.5 million now. The escrow may come later, or not at all. USD 45.5 million forgets the escrow, and USD 40.95 million takes 10% of the net figure rather than of the headline price the question gives.',
            },
            {
              question: 'An executive\'s base amount under section 280G is USD 300,000. On the sale she receives a change-of-control bonus of USD 800,000. Using the lesson\'s three-times test, is it a parachute payment?',
              options: [
                'Yes, because it is more than her base amount',
                'Yes, because any payment tied to a sale is a parachute payment',
                'Only if the company is publicly traded',
                'No, because it is below three times her base amount, which is USD 900,000',
              ],
              answer: 3,
              explanation:
                'Payments become parachute payments when they reach three times the base amount: $3 \\times 300{,}000 = 900{,}000$, and USD 800,000 is below that. Exceeding the base amount once is not the test. Private companies are covered too, which is why they use the 75% stockholder approval route. Take advice on the real calculation.',
            },
          ],
        },
        {
          slug: 'liquidation-waterfalls',
          title: 'Liquidation waterfalls: who actually gets paid',
          summary:
            'Trace a sale through debt, preferences, conversion decisions and options to see what founders really receive, at any exit value.',
          estimatedMinutes: 120,
          objectives: [
            'List the order of payment in a sale',
            'Compute a waterfall with several preferred series',
            'Determine when each series converts',
            'Include option strikes and deal costs',
            'Explain why founder proceeds are not simply ownership times price',
          ],
          concepts: [
            'Liquidation waterfall',
            'Seniority and pari passu',
            'Conversion decision',
            'Common price per share',
            'Breakpoint',
            'Management carve-out',
            'Net proceeds',
          ],
          explanation: `A **liquidation waterfall** is the order in which sale proceeds are paid. First creditors and costs, then preferred stock by its terms, then common. "Liquidation" here also covers a sale of the company.

**Seniority.** **Senior** preferred is paid before junior. **Pari passu** series share in proportion. Under the YC SAFE, an unconverted SAFE's cash-out amount is junior to debt and on par with preferred.

**The method.** Each non-participating series decides to take its preference or convert, and each decision depends on the others. There is a neat way to solve it. Let *x* be the final value of one common share. A non-participating series with preference P and S as-converted shares receives the larger of P and S times x. Common receives shares times x. An option with strike K receives shares times the larger of x minus K and zero. Total payouts rise with x, so you find the x that uses up all the proceeds. A **breakpoint** is a value of x where a class changes behaviour.

**Example.** Founders have 6,000,000 shares, employees 1,000,000 exercised shares and 1,000,000 options at a USD 0.50 strike. Seed has 2,000,000 shares and a USD 2 million preference. Series A has 2,500,000 shares and a USD 10 million preference, senior to Seed. All preferences are 1x non-participating. In total that is 12,500,000 fully diluted shares, of which founders own 48%.

| Exit | x | Founders | Employees | Options | Seed | Series A |
|---|---|---|---|---|---|---|
| USD 8M | 0 | 0 | 0 | 0 | 0 | 8.00M |
| USD 15M | 0.4286 | 2.57M | 0.43M | 0 | 2.00M | 10.00M |
| USD 30M | 2.05 | 12.30M | 2.05M | 1.55M | 4.10M | 10.00M |
| USD 50M | 4.04 | 24.24M | 4.04M | 3.54M | 8.08M | 10.10M |
| USD 100M | 8.04 | 48.24M | 8.04M | 7.54M | 16.08M | 20.10M |

Read the rows. At USD 8 million the founders receive nothing, though they own 48%. At USD 15 million they get 17%. At USD 30 million, Seed has converted because USD 2.05 a share beats its USD 1.00 preference per share, and Series A still takes its USD 10 million, because its breakpoint is USD 4.00 a share. By USD 50 million everyone has converted, and proceeds approach ownership. Options at USD 15 million get nothing, since x is below the strike.

**Costs come first.** A USD 60 million sale with USD 2 million of debt and USD 1.5 million of fees leaves USD 56.5 million. Then x is USD 4.56 and founders get USD 27.36 million, not 48% of USD 60 million (USD 28.8 million). A 10% escrow holds back USD 2.736 million of that, leaving USD 24.624 million at closing. Individual taxes come after this.

**Management carve-outs.** When preferences exceed the likely price, common holders and managers receive nothing, so they have little reason to support a sale. A **management carve-out** sets aside a percentage of proceeds for the team, before preferred. Trados's plan took USD 7.8 million of USD 60 million. It solves a real incentive problem, and it raises fiduciary questions. Have a lawyer structure it.

**Model this early.** Two companies with the same valuation can pay founders very differently. Unvested shares may be cancelled or accelerated, and unissued pool shares receive nothing, which raises everyone else's share.`,
          resources: [
            { title: 'SAFE documents and User Guide', url: 'https://www.ycombinator.com/documents', type: 'documentation', cost: 'free', provider: 'Y Combinator', note: 'Example 1, questions 3 and 4, show how SAFEs behave in a sale.', primary: true },
            { title: 'In re Trados Inc. Shareholder Litigation (2013)', url: 'https://courts.delaware.gov/Opinions/Download.aspx?id=193520', type: 'documentation', cost: 'free', provider: 'Delaware Court of Chancery', note: 'A real waterfall in which common received nothing.' },
            { title: 'Squaring Venture Capital Valuations with Reality', url: 'https://www.nber.org/papers/w23895', type: 'article', cost: 'free', provider: 'Gornall and Strebulaev, NBER', note: 'Why class terms change what shares are worth.' },
          ],
          exercises: [
            {
              slug: 'waterfall-solver',
              title: 'Work the waterfall by hand',
              prompt:
                'Using the common-price-per-share method, reproduce every row of the lesson\'s table by hand, with a calculator. For each exit, guess which classes take their preference and which convert, write the equation that says total payouts equal the exit, solve it for x, and then check that the guess was consistent (each converting class gets more than its preference, each class taking its preference would get less by converting, and options with a strike above x get nothing). Show that the payouts add up exactly to the exit in every row. Then do a USD 20 million exit, which is not in the table.',
              kind: 'problem',
              difficulty: 3,
              hint: 'At USD 30 million, Series A takes USD 10 million and everyone else is common. In millions of dollars and millions of shares, the other USD 20 million is 6x + 1x + 2x + 1 × (x − 0.50), so 10x − 0.5 = 20 and x = 2.05. At USD 20 million the same structure gives x = 1.05, so Seed (at USD 1.00 a share of preference) just converts.',
            },
            {
              slug: 'sweep-chart',
              title: 'Chart founder proceeds',
              prompt:
                'Find the exit values at which the lesson\'s example changes behaviour: where Series A\'s preference is full, where Seed\'s is full, where the options come into the money, where Seed converts and where Series A converts. Between each pair, write x as a simple formula of the exit, by hand. Then, in a spreadsheet, make a column of exits from USD 1 million to USD 150 million and a column of founder proceeds using the right formula for each range, and chart founder proceeds and founder share of proceeds. Mark each breakpoint and name what happens there. Add a line for what 48% of the exit would have paid. Explain the shape of the gap.',
              hint: 'The breakpoints are at exits of USD 10 million, 12 million, 15.5 million, 19.5 million and 49.5 million. Above the last one, x = (exit + 0.5 million) / 12.5 million.',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'carve-out-design',
              title: 'Design a carve-out',
              prompt:
                'A company has USD 40 million of preferences, and an offer of USD 35 million. Common would receive nothing. Propose a carve-out for the team: size, who gets it, whether it reduces with other payments, and how it is approved. Explain who gives up money and why they might agree. List the fiduciary risks, using Trados.',
              kind: 'writing',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'In the lesson\'s example, why does Series A not convert at a USD 30 million exit?',
              answerOutline:
                'Its preference is USD 4.00 per as-converted share (USD 10 million over 2.5 million shares), and x is USD 2.05, so the preference pays more.',
            },
            {
              question: 'Why can founders with 48% get nothing?',
              answerOutline:
                'Preferred stock is paid first. If proceeds are below total senior claims, nothing is left for common.',
            },
            {
              question: 'What is a breakpoint?',
              answerOutline:
                'A common price per share at which a class changes behaviour, such as an option coming into the money or a series converting.',
            },
          ],
          quiz: [
            {
              question: 'Take the lesson\'s example (founders 6,000,000 shares, employees 1,000,000, options 1,000,000 at USD 0.50, Seed 2,000,000 shares with a USD 2 million preference, Series A 2,500,000 shares with a senior USD 10 million preference). What do the founders receive in a USD 20 million sale?',
              options: ['USD 9.60 million', 'USD 6.86 million', 'USD 6.30 million', 'USD 0'],
              answer: 2,
              explanation:
                'Series A takes USD 10 million (converting would need x above USD 4.00). If Seed converts, the remaining USD 10 million is shared by 9,000,000 common shares plus the options: $9x + (x - 0.50) = 10$, so $x = 1.05$. That is above Seed\'s USD 1.00 a share, so converting is right, and founders get $6 \\times 1.05 = 6.30$ million. USD 9.60 million is 48% of the price, which ignores the preference. USD 6.86 million leaves Seed taking its preference and forgets the options.',
            },
            {
              question: 'A company has one investor holding 3,000,000 preferred shares with a USD 6 million 1x non-participating preference, and 7,000,000 common shares. It sells for USD 15 million. What does each common share receive?',
              options: ['USD 1.29', 'USD 1.50', 'USD 0.90'],
              answer: 0,
              explanation:
                'Converting would give the investor $30\\% \\times 15 = 4.5$ million, less than its USD 6 million preference, so it takes the preference. The remaining USD 9 million goes to the 7,000,000 common shares: about USD 1.29 each. USD 1.50 divides by all 10,000,000 shares as if the investor had converted; USD 0.90 divides what is left by all 10,000,000.',
            },
          ],
        },
        {
          slug: 'down-rounds-and-pivots',
          title: 'Down rounds, bridges and pivots',
          summary:
            'What happens when the price falls: anti-dilution, pay-to-play and morale. How to weigh a bridge, a cut, a pivot or a sale.',
          estimatedMinutes: 90,
          objectives: [
            'Define a down round and quantify its effect on a cap table',
            'Explain bridges, extensions and recapitalisations',
            'Explain pay-to-play and cram-downs',
            'Choose between cutting costs, a pivot, a bridge and a sale',
            'Plan a layoff lawfully and humanely',
          ],
          concepts: [
            'Down round',
            'Bridge round',
            'Pay-to-play',
            'Recapitalisation',
            'Cram-down',
            'Option repricing',
            'Pivot with limited cash',
          ],
          explanation: `A **down round** sells shares below the last round's price. It is more common than headlines suggest. Carta reported that down rounds fell from a peak of 22% of rounds in 2023 to below 12% in Q1 2026, and Cooley's report put them at 12.1% of its deals in Q2 2026. Those samples differ, and neither covers the companies that could not raise at all.

**Mechanics.** Suppose a company has 10,000,000 fully diluted shares and last raised at USD 5.00, a USD 50 million valuation. It now raises USD 5 million at USD 20 million pre-money, or USD 2.00 a share, issuing 2,500,000 shares. Founders with 5,000,000 shares drop from 50% to 40%. But the previous investor, with 2,000,000 shares, has broad-based weighted average anti-dilution. Its conversion price goes from USD 5.00 to USD 4.40, adding 272,727 as-converted shares, and founders fall to 39.15%. A full ratchet would be far worse. This example ignores the further effect on price if the new investor prices in those added shares, which real rounds do.

**Other damage.** Options granted at a higher strike go "underwater", meaning below market, so they lose value as an incentive. Companies can reprice them or grant new ones, after a new 409A. Morale and hiring suffer, and existing investors may disagree about what to do.

**Tools.**

- **Bridge round:** a small loan or SAFE from existing investors to reach a milestone or sale. Useful if the goal is near, and dangerous if it just buys time.
- **Extension:** more shares at the same price as the last round, sometimes with better terms. Founders like this because it avoids a stated down round, but look at the terms.
- **Pay-to-play:** an investor who does not join loses preferences or converts to common. In Cooley's Q2 2026 data, 8.4% of deals had this. It sorts committed investors from others.
- **Recapitalisation:** a reset of the cap table, often converting old preferred to common and issuing new preferred. A **cram-down** recap wipes out most early holders' value. Founders and employees are usually given new grants to keep them working, since the company needs them.

Each needs board and often stockholder approval, and raises conflicts, because investors on the board may be on both sides. Get a lawyer early. The Trados lesson applies.

**First ask if you need the money.** Before you raise, cut. Graham's default-alive question is the place to start: can you reach profitability on the cash you have with a smaller team and a narrower plan? A smaller company with revenue has more options than one running on the last of its money.

**Pivot with limited cash.** Decide with evidence, not panic. How much runway remains? What would a pivot test first, and at what cost? A pivot that needs a new product, team and market is a new startup with less cash and a tired team. Say so honestly. Selling or shutting down may be better, and it is often the kinder choice for employees.

**Layoffs.** Do them once, deeply enough, and treat people well. Check the WARN Act, state versions, final pay laws and release rules, and tell the remaining team the plan and the runway.`,
          resources: [
            { title: 'Q2 2026 Venture Financing Report', url: 'https://www.cooley.com/news/insight/2026/2026-08-17-q2-2026-venture-financing-report', type: 'dataset', cost: 'free', provider: 'Cooley', primary: true },
            { title: 'Default Alive or Default Dead?', url: 'https://paulgraham.com/aord.html', type: 'article', cost: 'free', provider: 'Paul Graham' },
            { title: 'State of Private Markets: Q1 2026', url: 'https://carta.com/data/state-of-private-markets-q1-2026/', type: 'dataset', cost: 'free', provider: 'Carta', note: 'Carta blocks automated downloads, so use a browser.' },
          ],
          exercises: [
            {
              slug: 'down-round-table',
              title: 'Model a down round',
              prompt:
                'Reproduce the lesson\'s example by hand or in a spreadsheet (new conversion price USD 4.40, 272,727 extra shares, founders at 39.15%), then repeat it with a full ratchet and with no anti-dilution. Report founder percentage in each case. Then add a new option pool equal to 10% of the post-closing fully diluted shares, created after the round and ignored for anti-dilution, and compute the founders\' percentage again in all three cases. Explain how the investor\'s protection is paid for by people with no protection.',
              kind: 'problem',
              difficulty: 2,
              hint: 'Under a full ratchet the old investor\'s USD 10 million converts at USD 2.00 into 5,000,000 shares, so founders hold 5,000,000 of 15,500,000, about 32.3%. A pool of 10% after closing multiplies every existing percentage by 0.9.',
            },
            {
              slug: 'options-memo',
              title: 'Write the options memo',
              prompt:
                'A company has 5 months of runway, USD 80,000 of monthly revenue growing 3% a month, and USD 300,000 of monthly costs. Write a two-page memo to the board comparing a 40% cost cut, a USD 1 million bridge, a pivot and a sale. Use numbers, state what each buys, and recommend one. Say who has a conflict.',
              kind: 'writing',
              difficulty: 3,
            },
            {
              slug: 'layoff-checklist',
              title: 'Write a layoff checklist',
              prompt:
                'Write a checklist for a 30-person company laying off 10 people in your state. Include state final-pay law, benefits, equity treatment, release agreements, access removal, what to say and who says it. Note where the WARN Act does and does not apply, and cite sources. Identify what must be reviewed by a lawyer.',
              kind: 'writing',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does anti-dilution hurt founders in a down round?',
              answerOutline:
                'It gives protected investors more as-converted shares, at the expense of holders with no protection, such as founders and employees.',
            },
            {
              question: 'What is a pay-to-play term?',
              answerOutline:
                'Investors who do not take part in a financing lose rights, for instance by having preferred converted to common.',
            },
            {
              question: 'What is the difference between a bridge that helps and one that hurts?',
              answerOutline:
                'A useful bridge reaches a specific, near and credible milestone. A harmful one just delays a decision and adds debt or preference.',
            },
          ],
          quiz: [
            {
              question: 'A company has 20,000,000 fully diluted shares. An earlier investor paid USD 12 million for 4,000,000 preferred shares (conversion price USD 3.00) with broad-based weighted average anti-dilution. The company now issues 5,000,000 shares at USD 1.50. Into how many shares does the earlier investor now convert?',
              options: ['4,000,000', '4,444,444', '8,000,000', '5,333,333'],
              answer: 1,
              explanation:
                'B is $7{,}500{,}000 / 3.00 = 2{,}500{,}000$, so $CP_2 = 3.00 \\times \\frac{20{,}000{,}000 + 2{,}500{,}000}{20{,}000{,}000 + 5{,}000{,}000} = 2.70$, and $12{,}000{,}000 / 2.70 \\approx 4{,}444{,}444$ shares. 8,000,000 is a full ratchet to USD 1.50, and 5,333,333 uses a simple average of the two prices. The extra 444,444 shares come out of the unprotected holders.',
            },
            {
              question: 'Which bridge round is most defensible?',
              options: [
                'A bridge to "keep going while we work out the plan"',
                'A bridge that buys two months in return for a 3x preference',
                'A bridge to fund a pivot into a new market with a mostly new team',
                'A bridge to the close of a signed acquisition expected in six weeks',
              ],
              answer: 3,
              explanation:
                'A useful bridge reaches a specific, near and credible milestone, and a signed deal closing soon is exactly that. The others buy time without a destination, load the company with harsh preference, or fund what is really a new startup on the old company\'s last cash.',
            },
          ],
        },
        {
          slug: 'shutting-down-well',
          title: 'Shutting a company down well',
          summary:
            'Most companies end. Learn when to stop, how to treat people well, and the legal steps for dissolving a Delaware corporation and closing your taxes.',
          estimatedMinutes: 90,
          objectives: [
            'Recognise when to stop, and set a decision point in advance',
            'Sequence the people, customer and legal steps of a wind-down',
            'State the order in which claims get paid',
            'List the main Delaware and federal steps',
            'Explain personal risks for directors and officers',
          ],
          concepts: [
            'Wind-down',
            'Dissolution',
            'Certificate of dissolution',
            'Claims process',
            'Form 966',
            'Assignment for the benefit of creditors',
            'Chapter 7',
            'Personal liability for wages and taxes',
          ],
          explanation: `*Delaware and US federal law as of 2 November 2026. Education, not legal advice. Hire a lawyer early, and reserve money to pay for one.*

Ending a company is a normal outcome. BLS data shows most new establishments are gone within ten years, and Carta counted 254 shutdowns among its customers in Q1 2024 alone, a record at the time.

**When to stop.** Set a trigger in advance: "If we have under four months of cash and no term sheet, we wind down." Stop while you still have money. A shutdown costs money, and if you spend everything first, you leave wages, taxes and vendors unpaid, which is when things become personal.

**The order of events.** A usual sequence is below. Your lawyer sets the actual one.

1. **Board meeting.** Discuss options, including a sale of assets. Record the decision.
2. **Team.** Tell them promptly and honestly, pay wages and accrued amounts, and help them find jobs. Introductions are the most useful thing you can do.
3. **Customers.** Give notice, refund prepaid amounts where owed, let them export data, and follow your privacy commitments on deleting it.
4. **Investors.** Send a clear letter with what happened and what is left.
5. **Assets.** Sell or license what has value: IP, code, customer contracts (with care over consent and privacy) and equipment.
6. **Creditors.** Notify and settle claims.
7. **Legal dissolution** and final tax filings.

**Who gets paid.** Assets go first to creditors, including employees' wages and taxes. Only then do stockholders get anything, with preferred ahead of common under the charter. Distributing to stockholders before paying creditors can expose you and them to claims, because under section 282 of the Delaware General Corporation Law (DGCL) stockholders can be liable up to what they received.

**Delaware steps.** Under DGCL section 275, the board adopts a resolution, and a majority of the outstanding voting stock approves, or all stockholders consent in writing. Section 277 requires franchise taxes and all annual reports, including a final one, to be paid and filed before dissolution. File a **certificate of dissolution**. The company continues for three years under section 278 only to wind up. Sections 280 and 281 give ways to handle known and unknown claims, and directors who comply with them are protected from personal liability to claimants under section 281(c).

**Tax steps.** Form 966 is due within 30 days of adopting the resolution to dissolve, under 26 USC 6043. File final federal and state returns, final payroll returns and final information returns. The IRS's "Closing a business" page lists these. Withdraw from each state where you qualified, and cancel any licences.

**Other routes.** An **assignment for the benefit of creditors** is a state process that transfers assets to a third party to sell. **Chapter 7** bankruptcy puts a trustee in charge, and may suit a company with significant debt or disputes. A lawyer can advise which is right.

**Personal exposure.** The main dangers are unpaid payroll taxes under section 6672, unpaid wages in some states, personal guarantees and misstatements to creditors. Directors should take advice when the company nears insolvency, as their considerations change. D&O insurance may need a tail policy.`,
          resources: [
            { title: 'Closing a business', url: 'https://www.irs.gov/businesses/small-businesses-self-employed/closing-a-business', type: 'documentation', cost: 'free', provider: 'US Internal Revenue Service', primary: true },
            { title: 'Dissolutions and Cancellations', url: 'https://corp.delaware.gov/disso09/', type: 'documentation', cost: 'free', provider: 'Delaware Division of Corporations' },
            { title: 'DGCL subchapter X: sale of assets, dissolution and winding up', url: 'https://delcode.delaware.gov/title8/c001/sc10/index.html', type: 'documentation', cost: 'free', provider: 'State of Delaware', note: 'Sections 275, 277, 278 and 280 to 282.' },
            { title: '26 USC 6043', url: 'https://www.law.cornell.edu/uscode/text/26/6043', type: 'documentation', cost: 'free', provider: 'Cornell Legal Information Institute' },
          ],
          exercises: [
            {
              slug: 'shutdown-plan',
              title: 'Write a wind-down plan',
              prompt:
                'A fictional Delaware C corporation with 12 employees, USD 400,000 cash, USD 150,000 of creditor claims, USD 90,000 of prepaid customer contracts and USD 3 million of preferred stock has decided to stop. Write a dated 60-day plan with owners for each step, including the 30-day Form 966 date. Estimate the cost of the wind-down, and what stockholders receive.',
              kind: 'writing',
              difficulty: 2,
            },
            {
              slug: 'shutdown-waterfall',
              title: 'Run a shutdown waterfall',
              prompt:
                'After selling assets for USD 250,000, the company in the previous exercise has USD 650,000 in total. Pay wind-down costs of USD 120,000, wages and payroll taxes of USD 180,000, then other creditors and customer refunds pro rata if needed. Compute what is left for preferred stockholders, and what they recover per dollar invested. Show that common gets nothing.',
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'read-a-postmortem',
              title: 'Read three post-mortems',
              prompt:
                'Find three post-mortems written by founders of companies that shut down. For each, state what the founders said went wrong, what you think they might not have seen, and whether they stopped with money left. List the patterns. Remember these are personal accounts, and that they may be partial.',
              kind: 'reading',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'Why stop while there is still cash?',
              answerOutline:
                'Wind-down has real costs, and you need money to pay wages, taxes, creditors and lawyers. Personal exposure rises when those go unpaid.',
            },
            {
              question: 'When is Form 966 due?',
              answerOutline:
                'Within 30 days after adopting the resolution or plan to dissolve, under section 6043.',
            },
            {
              question: 'Can you dissolve a Delaware corporation with unpaid franchise tax?',
              answerOutline:
                'No. Section 277 requires franchise taxes to be paid and all annual reports, including a final one, to be filed.',
            },
            {
              question: 'In what order are proceeds paid?',
              answerOutline:
                'Creditors, including wages and taxes, come first, then preferred stockholders under the charter, then common.',
            },
          ],
          quiz: [
            {
              question: 'A company winding down has USD 500,000. Wind-down costs are USD 100,000, unpaid wages and payroll taxes USD 150,000, and other creditors are owed USD 300,000. Its preferred stockholders invested USD 4 million. What do stockholders receive?',
              options: [
                'USD 250,000 to the preferred, nothing to common',
                'USD 250,000 shared by all stockholders',
                'Nothing: the last USD 250,000 goes to the other creditors, who are still USD 50,000 short',
                'USD 50,000 to the preferred',
              ],
              answer: 2,
              explanation:
                'After costs and wages, $500 - 100 - 150 = 250$ thousand is left, and creditors come before any stockholder, so it is shared among creditors owed USD 300,000. Nothing reaches the preferred, let alone common. Paying stockholders first would expose them, and possibly the directors, to claims under DGCL section 282.',
            },
          ],
        },
      ],
    },
  ],
  capstone: {
    slug: 'startup-company-model',
    title: 'A spreadsheet model and investor package for a fictional company',
    description: `Pull the whole course together for one clearly labelled **fictional** company. Everything is done in a spreadsheet and a short document: no programming, no real customers and no real money.

1. **The idea and the evidence (Modules 1 to 3).** One page on the problem, who has it, why now and the riskiest assumption, with made-up interview tallies, a cohort retention table with blank cells for cohorts that are too young, and a survey score with its Wilson interval.
2. **The engine (Module 4).** A 36-month driver-based model on its own sheet, with inputs kept apart from formulas and each input labelled measured or assumed: price, new customers, churn, gross margin, team and other costs. It reports CAC, LTV, payback, burn, runway and whether the company is default alive, plus a sensitivity table for four inputs.
3. **The company (Module 5).** The entity and state you chose and why, a founders' cap table with vesting schedules, their 83(b) dates, and the Delaware franchise tax under both methods.
4. **The money (Modules 6 and 7).** A round size worked back from a milestone, SAFEs converted in a priced round with an option pool, the cap table before and after, and a comparison of two term sheets with founder proceeds at three exit values.
5. **The company as it grows (Module 8).** An option grant for one early employee with the cost to exercise, and a note on whether the founders' stock could be QSBS.
6. **The endings (Module 9).** A liquidation waterfall at five exit values, showing founder proceeds against ownership times price, and a one-page wind-down plan in case the money runs out.

Finish with a ten-slide investor package whose every number comes from the workbook. Add a Checks sheet in which totals reconcile (cap table shares sum to the fully diluted total, waterfall payouts sum to the exit, monthly cash flows sum to the change in cash). State on the first page that the company is fictional and that this is education, not legal, tax or investment advice.`,
    deliverables: [
      'A workbook with model, cap table, term sheet and waterfall sheets, and a Checks sheet in which every total reconciles',
      'A ten-slide investor package labelled as fictional, with each number traceable to the workbook',
      'A one-page cover note stating that this is education and not legal, tax or investment advice, and listing the main assumptions',
    ],
    estimatedHours: 40,
    stretchGoals: [
      'Ask someone who knows the material to act as a sceptical investor, and record the three questions you could not answer well.',
      'Add a down-round scenario with broad-based weighted average anti-dilution, and show what it does to the founders and the employee\'s options.',
    ],
  },
  masteryChecklist: [
    'I can state base rates for new businesses and venture outcomes with sources, and say what each does not show.',
    'I can run customer interviews that produce evidence rather than compliments.',
    'I can size a market bottom-up and name the real alternatives.',
    'I can build a cohort retention table, compute a survey score with its margin of error, and judge product-market fit from several signals.',
    'I can compute CAC, LTV, payback, burn and runway, and say whether a company is default alive.',
    'I can choose an entity for a given business and explain the Delaware C corporation default and when it is wrong.',
    'I can compute a vesting schedule and explain the 83(b) election, its deadline and how to file it.',
    'I can compare bootstrapping, grants, debt, angels, accelerators and venture capital and say what each costs.',
    'I can show from fund economics why a fund\'s size shapes which companies it can back.',
    'I can convert post-money and pre-money SAFEs and convertible notes in a priced round and compute dilution over several rounds.',
    'I can explain the option pool shuffle and read a term sheet, with payout numbers for its preferences.',
    'I can explain Rule 506(b), Rule 506(c), accredited investors and Form D.',
    'I can explain 409A valuations, ISOs and NSOs, section 1202 as amended in 2025, and payroll tax liability.',
    'I can compute a liquidation waterfall with several series, options and deal costs.',
    'I can plan a down round response or an orderly shutdown of a Delaware corporation.',
    'I know when to hire a lawyer or an accountant, and I do not treat this course as legal, tax or investment advice.',
  ],
});
