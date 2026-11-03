import { defineSubject } from '../define';

export default defineSubject({
  id: 'data-ethics-and-policy',
  title: 'Ethics and Policy for Data Science',
  category: 'data-science',
  tagline:
    'Privacy, bias and data access through real cases from companies, nonprofits, governments, academia and healthcare, where the trade-offs are real and someone always carries the burden.',
  description: `Data work allocates benefits and harms. A privacy protection that shields most people can cost a small community its funding. A fair-looking score can fail one group in one way and another group in another, and a dataset opened for research can expose the people in it. These are not puzzles with an approved answer. They are real trade-offs on which careful people disagree, and this course teaches you to argue them well.

The course follows the topics in the public catalog description of IS 467 (Ethics and Policy for Data Science) at the University of Illinois Urbana-Champaign: common ethical challenges around privacy, bias and data access, taught through cases from companies, nonprofits, governments, academia and healthcare. The content here is original and the course is not affiliated with Illinois. No Illinois course material was used.

One question runs throughout: **who carries the burden?** When a system errs, when a protection costs accuracy, or when a rule imposes compliance work, someone pays. You will name that person each time. Each case separates what is established from what is disputed, attributes claims about organisations to their sources, and gives the strongest version of opposing views.

You will also measure things, because ethical arguments improve when the numbers are real. You will build a re-identification risk tool, recompute the published COMPAS figures from the original data, and simulate how privacy noise would move money through a funding formula. Attack work uses only synthetic data or established public research benchmarks, and it never targets real people.

Laws are stated as of 2 November 2026 and they change. This course is education, not legal advice. For a real decision, consult the current text and a qualified lawyer.`,
  difficulty: 'intermediate',
  estimatedHours: 50,
  prerequisites: ['data-science-discovery'],
  recommendedBackground: [
    'Basic Python and pandas',
    'Willingness to read long primary sources and to argue for positions you do not hold',
    'Probability at the level of conditional probability',
  ],
  tags: ['ethics', 'privacy', 'fairness', 'data access', 'policy', 'law', 'differential privacy'],
  core: false,
  modules: [
    {
      slug: 'ethics-for-data-work',
      title: 'Ethics for Data Work',
      description:
        'The frameworks people actually use, how to map stakeholders, harms and benefits, and how to reason about trade-offs and the question of who carries the burden.',
      lessons: [
        {
          slug: 'ethical-frameworks',
          title: 'Ethical frameworks',
          summary:
            'Consequentialism, duty, virtue, justice and care, plus the Belmont principles: what each one asks, and where each gives out.',
          estimatedMinutes: 75,
          objectives: [
            'Apply consequentialist, deontological, virtue, justice and care reasoning to one case',
            'State the Belmont principles and what each requires in practice',
            'Explain why frameworks can disagree on the same facts',
            'Distinguish an ethical claim from a legal or empirical one',
          ],
          concepts: [
            'Consequentialism',
            'Deontology and rights',
            'Virtue ethics',
            'Distributive justice',
            'Ethics of care',
            'Respect for persons, beneficence, justice',
            'Is, ought and may',
          ],
          explanation: `You do not need a philosophy degree for this course, but you do need more than a gut feeling. Frameworks are tools for finding what you might otherwise miss, and each asks a different question.

- **Consequentialism** asks which option produces the best outcomes overall. It is natural for data scientists, because it looks like optimisation. Its weakness is that it can accept serious harm to a few if the total improves.
- **Deontology** asks which duties and rights apply, regardless of outcomes. Do not deceive people, and do not treat them merely as a means. Its weakness is that rules can conflict, and it can seem rigid when the stakes are high.
- **Virtue ethics** asks what a person of good character would do, and what habits this practice builds.
- **Justice** approaches ask who gets what, and whether the distribution is defensible. Rawls's device is to choose rules without knowing which position in society you will hold.
- **Care ethics** asks what relationships and responsibilities exist, particularly towards those who depend on you.

Research ethics in the US builds on the **Belmont Report** (1979), written after abuses such as the Tuskegee syphilis study. It names three principles: **respect for persons** (autonomy, and protection for those with less of it), **beneficence** (maximise benefit, minimise harm) and **justice** (fair sharing of the burdens and benefits of research). The Menlo Report (2012) adapted these for computer security research.

Take a case. A hospital wants to use patient records to train a model without new consent. A consequentialist counts lives saved against the privacy risk. A deontologist asks whether patients' rights over their records are violated. Justice asks whether those whose data trained the model will benefit from it.

Keep three kinds of claim apart. **Empirical**: the model reduces deaths by this much. **Legal**: this use is permitted. **Ethical**: this use is right. Lawful does not imply right, and the reverse is also true. Many bad arguments slide between these, and you should learn to spot the move.`,
          resources: [
            { title: 'The Belmont Report', url: 'https://www.hhs.gov/ohrp/regulations-and-policy/belmont-report/read-the-belmont-report/index.html', type: 'article', cost: 'free', provider: 'US Department of Health and Human Services', note: 'Short and worth reading in full. hhs.gov may refuse scripted requests, but it opens in a browser.', primary: true },
            { title: 'Fairness and Machine Learning', url: 'https://fairmlbook.org/', type: 'textbook', cost: 'free', provider: 'Barocas, Hardt and Narayanan', note: 'The free textbook for Module 3. Read the introduction now for why this is more than a technical question.' },
          ],
          exercises: [
            {
              slug: 'five-lenses',
              title: 'One case, five lenses',
              prompt:
                'A city proposes using phone location data bought from a broker to plan bus routes. Write one paragraph from each of the five frameworks, giving the strongest conclusion each could reach. Then state which two conflict most, and which facts, if you learned them, would change your own view.',
              kind: 'writing',
              difficulty: 1,
            },
            {
              slug: 'is-ought-may',
              title: 'Separate the claims',
              prompt:
                'Find a news article or company statement about a data practice. Quote five sentences, and label each as empirical, legal, ethical or a mixture. Rewrite any mixed sentence as separate claims, and say what evidence each would need.',
              kind: 'reading',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'Name a weakness of pure consequentialism for data decisions.',
              answerOutline: 'It can justify concentrated harm to a minority if the aggregate gain is large, and it depends on forecasts of outcomes.',
            },
            {
              question: 'What are the three Belmont principles?',
              answerOutline: 'Respect for persons, beneficence and justice.',
            },
            {
              question: 'Why does "it was legal" not end an ethical argument?',
              answerOutline: 'Law sets minimum enforceable rules, often lags behind practice, and differs by place. Ethics asks whether something is right.',
            },
          ],
        },
        {
          slug: 'stakeholders-harms-and-benefits',
          title: 'Stakeholders, harms and benefits',
          summary:
            'Map who is affected, including those who never appear in the data, and describe harms precisely enough to compare them.',
          estimatedMinutes: 70,
          objectives: [
            'Build a stakeholder map that includes indirect and absent parties',
            'Classify harms by type, severity, likelihood and reversibility',
            'Identify benefits and who receives them',
            'Write an impact table for a real system',
          ],
          concepts: [
            'Direct and indirect stakeholders',
            'Data subjects and decision subjects',
            'Types of harm',
            'Severity, likelihood, reversibility',
            'Group harm',
            'Distribution of benefit',
          ],
          explanation: `Most analyses begin with the people in the room: the client, the team, the users. The people who matter most are often elsewhere. A useful map has at least these categories.

- **Data subjects** are those whose data is used.
- **Decision subjects** are those affected by the output. They are not always data subjects: a model trained on past applicants judges future ones.
- **Operators** use the system, such as caseworkers or nurses.
- **Owners and funders** set its goals.
- **Bystanders and communities** are affected indirectly. Someone's genome reveals facts about their relatives who never consented.
- **The excluded**: people absent from the data, whom the system fails because it has never seen them.

Then describe harm precisely. "Privacy risk" is too vague to weigh. Say what happens to whom. Harms include physical harm; economic loss such as a denied loan; loss of liberty; psychological harm; discrimination; loss of opportunity; and harm to dignity or autonomy. Some are **group harms**: a community can be stigmatised by a finding even if no individual is identified.

Four questions make harms comparable:

- **Severity**: how bad is it?
- **Likelihood**: how probable is it?
- **Reversibility**: can it be undone? A wrongly denied benefit paid later is unlike a lost home.
- **Detectability**: will anyone notice? A person refused by a model may never know why, or even that a model was involved.

Treat benefits with the same rigour. Claimed benefits are often vague, while harms are specific, or the other way around, depending on who is writing. Ask who receives the benefit, and whether that is the same person who bears the risk. This mismatch is the most important thing a map can reveal. When a company gains and a stranger bears the risk, normal market feedback does not work.

Keep the map honest by consulting affected people where you can. Guessing what a community fears is itself a mistake, and many projects discover too late that their risk assessment missed what mattered most.`,
          resources: [
            { title: 'NIST AI Risk Management Framework', url: 'https://www.nist.gov/itl/ai-risk-management-framework', type: 'documentation', cost: 'free', provider: 'US NIST', note: 'The Map function describes context and affected parties. Read its overview.', primary: true },
            { title: 'A Framework for Understanding Sources of Harm throughout the Machine Learning Life Cycle', url: 'https://arxiv.org/abs/1901.10002', type: 'article', cost: 'free', provider: 'Suresh and Guttag', note: 'Used more fully in Module 3. Read the introduction now.' },
          ],
          relatedLessons: ['cybersecurity/security-mindset-and-threat-models/threat-modelling'],
          exercises: [
            {
              slug: 'impact-table',
              title: 'An impact table',
              prompt:
                'Pick a system you have used, such as a credit score, a transit app or a school platform. List at least 8 stakeholders, including 2 absent from the data. For each write the main harm and benefit, with severity, likelihood, reversibility and detectability rated low, medium or high, plus a reason. Highlight the largest mismatch between who gains and who bears the risk.',
              kind: 'writing',
              difficulty: 1,
            },
            {
              slug: 'who-did-we-miss',
              title: 'Who did we miss?',
              prompt:
                'A university shares anonymised dining-hall card swipes with a nutrition researcher. Write a stakeholder map in 10 minutes. Then list groups that a less obvious analysis would reveal, such as students with religious fasting schedules or food insecurity. Say what specific harm each could suffer, and what fact would tell you whether it is a real concern.',
              kind: 'problem',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'How does a decision subject differ from a data subject?',
              answerOutline: 'A data subject is in the data. A decision subject is affected by outputs, and may not be in the training data.',
            },
            {
              question: 'Why does reversibility matter?',
              answerOutline: 'An error that can be fixed differs morally and practically from one that cannot, so the same likelihood can justify different safeguards.',
            },
            {
              question: 'Why is a gap between who benefits and who bears risk so important?',
              answerOutline: 'The decision maker does not feel the cost, so ordinary incentives do not correct it.',
            },
          ],
        },
        {
          slug: 'trade-offs-and-who-carries-the-burden',
          title: 'Trade-offs and who carries the burden',
          summary:
            'Real ethical choices trade one good against another. Learn to state the trade-off, find who pays, and argue both sides fairly.',
          estimatedMinutes: 75,
          objectives: [
            'State a trade-off without hiding either side',
            'Identify who carries a burden, and whether they agreed to it',
            'Write the strongest version of a view you reject',
            'Propose a way of sharing a burden, and say what it costs',
          ],
          concepts: [
            'Value trade-offs',
            'Burden shifting',
            'False dilemma',
            'Steelmanning',
            'Consent to risk',
            'Compensation and redress',
            'Status quo as a choice',
          ],
          explanation: `Beginner ethics looks for the villain. In practice you often face two goods that cannot both be fully had: privacy and accuracy, individual rights and public health, openness and safety, speed and care. This course takes such trade-offs seriously.

Four habits help.

**State both sides fully.** "We protect privacy at a small cost to utility" hides the question. Better: "This noise protects each child's record, and moves funding away from some small districts by an amount we can estimate."

**Ask who carries the burden.** Every safeguard and every failure lands on someone. Consider who was consulted, who can leave, and who can absorb the loss. A manual appeal process moves the burden of a system's errors onto the people least equipped to carry it. A compliance rule can favour large companies, which can afford lawyers, over small nonprofits. An error rate is not only a number: it is a set of people.

**Treat the status quo as a choice.** Not deploying is also a decision, with its own harms. A human judge has biases too, and a sick patient missed by the current process pays for caution. Compare a system with the realistic alternative rather than with perfection.

**Argue the other side at full strength.** This is called **steelmanning**. Suppose you think predictive child welfare tools are wrong. Then you should be able to state why a caseworker with too many files might want one. If you cannot do so, you do not yet understand the disagreement.

Watch for false dilemmas. Sometimes a trade-off is real only under current design, and better engineering can improve both sides. Sometimes "accuracy versus fairness" assumes that the training labels are right. Measure before you concede.

Then consider remedies. Burdens can be **reduced**, **shared** or **compensated**. A funding formula can be protected with a hold-harmless guarantee paid from a central budget, and that moves the cost from small districts to the taxpayer. Name what each remedy costs and who now pays. There is usually no answer that leaves everyone whole, and a good analysis says so openly.`,
          resources: [
            { title: 'Fairness and Machine Learning', url: 'https://fairmlbook.org/', type: 'textbook', cost: 'free', provider: 'Barocas, Hardt and Narayanan', note: 'See the discussion of what fairness criteria can and cannot settle.', primary: true },
            { title: 'Data & Society', url: 'https://datasociety.net/', type: 'article', cost: 'free', provider: 'Data & Society Research Institute', note: 'Browse its reports for research on how burdens fall on workers and communities.' },
          ],
          exercises: [
            {
              slug: 'steelman',
              title: 'Steelman a view you reject',
              prompt:
                'Choose a practice you oppose: face recognition in stores, predictive risk scores in child welfare, or open publication of a sensitive dataset. Write 250 words making the best case for it, as its most thoughtful supporter would. Have someone who supports it read this, or check it against a real published defence. Then write 100 words on what it changed in your view, if anything.',
              kind: 'writing',
              difficulty: 2,
            },
            {
              slug: 'burden-ledger',
              title: 'A burden ledger',
              prompt:
                'Take a safeguard, such as a requirement that a person reviews each automated denial. List who gains and who pays in time, money, risk and dignity, with numbers or estimates where you can, and state your assumptions. Compare it with two alternatives, including doing nothing. End with the option you would choose, and what you would say to the person who loses most under it.',
              kind: 'writing',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why treat doing nothing as a choice?',
              answerOutline: 'The status quo has its own harms and beneficiaries, so it must be compared rather than assumed to be neutral.',
            },
            {
              question: 'What is steelmanning, and why bother?',
              answerOutline: 'Stating the strongest form of the opposing view. It tests your understanding and shows what you actually disagree about.',
            },
            {
              question: 'What are three responses to a burden?',
              answerOutline: 'Reduce it, share it or compensate for it. Each moves some cost to someone.',
            },
          ],
        },
      ],
    },
    {
      slug: 'privacy',
      title: 'Privacy',
      description:
        'What privacy protects, why removing names fails, what k-anonymity and differential privacy actually guarantee, and the surveillance that data makes possible.',
      lessons: [
        {
          slug: 'what-privacy-protects',
          title: 'What privacy protects',
          summary:
            'Privacy as control, as contextual integrity and as protection from harm, and a fair look at the "nothing to hide" argument.',
          estimatedMinutes: 65,
          objectives: [
            'Compare at least three accounts of what privacy is',
            'Use contextual integrity to analyse a data flow',
            'Respond to the "nothing to hide" argument fairly',
            'Explain why privacy can be a collective issue',
          ],
          concepts: [
            'Privacy as control',
            'Contextual integrity',
            'Informational norms',
            'Solove taxonomy',
            'Chilling effects',
            'Inference and aggregation',
            'Collective privacy',
          ],
          explanation: `People use "privacy" for several ideas, and arguments go badly when they switch between them.

**Privacy as control** (Westin) says it is your ability to decide what information about you is shared. It fits consent forms, but it asks a lot of individuals, and McDonald and Cranor (2008) estimated that reading the privacy policies people meet online would take over 200 hours a year.

**Contextual integrity** (Nissenbaum) says that information flows carry norms set by their context. Your doctor knowing your diagnosis is fine. Your employer learning it from your doctor breaks a norm, even though nothing was "secret". The method is to describe a flow by its sender, recipient, subject, type of information and transmission principle, and to ask whether a new flow violates the norms of the context and, if so, whether the change is justified.

**Harm-based views** (Solove's taxonomy) list what can go wrong: surveillance, aggregation, identification, secondary use, exclusion, disclosure, distortion and so on. **Aggregation** matters a lot to data science, since facts that are harmless alone can become revealing in combination.

Consider the argument "**if you have nothing to hide, you have nothing to fear**." It deserves a fair hearing. Supporters argue that law-abiding people lose little, and that safety is a real gain. Responses include that the speaker decides neither what counts as wrongdoing nor who sees the data, that rules and governments change, that errors land on innocent people, and that being watched changes behaviour, the **chilling effect**. Evidence on chilling effects exists but its size varies by setting, so state it with care.

Privacy is also partly **collective**. Your contact list reveals your friends' numbers, and a relative's DNA test can identify you. Inferences about people who shared nothing are drawn from those who did. That is why individual consent cannot be the whole answer.

Use these accounts as lenses, not as rivals to be ranked. Each exposes something the others miss, and later lessons rely on all three.`,
          resources: [
            { title: 'NIST Privacy Framework', url: 'https://www.nist.gov/privacy-framework', type: 'documentation', cost: 'free', provider: 'US NIST', note: 'How one standards body frames privacy risk as a problem for individuals arising from data processing.', primary: true },
            { title: 'Electronic Frontier Foundation: Privacy', url: 'https://www.eff.org/issues/privacy', type: 'article', cost: 'free', provider: 'EFF', note: 'An advocacy organisation. Read it as one side of the debate.' },
          ],
          exercises: [
            {
              slug: 'contextual-integrity-analysis',
              title: 'A contextual integrity analysis',
              prompt:
                'Analyse one real flow: a fitness app sharing location with a city planner, a university sending grades to a parent, or a pharmacy loyalty programme selling purchase data. Give sender, recipient, subject, information type and transmission principle before and after the change. Say which norm shifts, whether the shift can be justified, and who would object.',
              kind: 'writing',
              difficulty: 2,
            },
            {
              slug: 'nothing-to-hide-dialogue',
              title: 'A nothing-to-hide dialogue',
              prompt:
                'Write a one-page dialogue between a thoughtful police chief and a thoughtful civil liberties lawyer about a citywide camera network. Each must make at least three strong points, and each must concede something. Do not let one side win by default. End with what evidence would move each of them.',
              kind: 'writing',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What does contextual integrity say that the control view misses?',
              answerOutline: 'That appropriateness depends on the norms of the context. A flow can be wrong even if the data was not secret, and consent alone does not decide it.',
            },
            {
              question: 'What is aggregation harm?',
              answerOutline: 'Combining individually harmless data to reveal something sensitive.',
            },
            {
              question: 'Give an example of privacy being collective.',
              answerOutline: 'Genetic data exposes relatives. Contact uploads expose friends. Models infer traits of those who shared nothing.',
            },
          ],
        },
        {
          slug: 'de-identification-and-its-failures',
          title: 'De-identification and its failures',
          summary:
            'Why removing names is not anonymisation: linkage attacks, the Sweeney, Netflix and AOL cases, and what remains disputed about them.',
          estimatedMinutes: 85,
          objectives: [
            'Distinguish identifiers, quasi-identifiers and sensitive attributes',
            'Explain a linkage attack and carry one out on synthetic data',
            'Say what is established and what is disputed in the classic cases',
            'Explain why hashing an identifier does not anonymise it',
          ],
          concepts: [
            'Direct identifiers',
            'Quasi-identifiers',
            'Sensitive attributes',
            'Linkage attack',
            'Pseudonymisation',
            'Sparsity of high-dimensional data',
            'Population uniqueness',
          ],
          explanation: `De-identification removes names and hopes for the best. The failure mode is the **linkage attack**: join the released table to a public one on **quasi-identifiers**, attributes that are not identifying alone but are in combination.

**The founding case.** Latanya Sweeney estimated in 2000 that 87 percent of the US population was likely unique on ZIP code, birth date and sex. She also linked Massachusetts hospital data to a voter list and reported finding Governor Weld's record. **What is disputed:** Golle (2006), using 2000 census data, estimated about 63 percent. Barth-Jones (2012) argued that the Weld result depended on special circumstances and overstates typical risk. Both results are real, and the size of the risk depends on the data and the attacker's knowledge. HIPAA's Safe Harbor rule limits dates and ZIP codes for similar reasons.

**High-dimensional data.** Narayanan and Shmatikov (2008) re-identified records in the Netflix Prize data by matching ratings and dates against public IMDb reviews. Sparse data is the problem: a handful of unusual movie ratings acts like a fingerprint. De Montjoye and colleagues (2013) reported that four location points were enough to single out 95 percent of people in a mobility dataset. Rocher and colleagues (2019) modelled that 15 demographic attributes could correctly re-identify 99.98 percent of Americans in any dataset, a modelled estimate rather than a direct attack.

**Identity from content.** In 2006 AOL released 20 million search queries with user numbers. Reporters at the New York Times identified one user from her searches alone.

**Pseudonymisation is not anonymisation.** Replacing an ID with a hash fails if the input space is small. In 2014 New York City taxi data with hashed medallion numbers was reversed by simply hashing every possible medallion.

You will see the effect in a synthetic experiment in MP 1. Among 100,000 invented people, 99.6 percent were unique on ZIP, birth date and sex, and a linkage against a synthetic voter roll named 68 percent of synthetic patients. Everything in that result is built in by the assumptions, so it demonstrates a mechanism, not a rate for any real population.

The ethics of demonstrating this matter too. Researchers disclose failures to stop them recurring, and they generally avoid naming ordinary people. In this course you attack only synthetic data.`,
          resources: [
            { title: 'Simple Demographics Often Identify People Uniquely', url: 'https://dataprivacylab.org/projects/identifiability/paper1.pdf', type: 'article', cost: 'free', provider: 'Latanya Sweeney', note: 'The source of the 87 percent estimate.', primary: true },
            { title: 'Robust De-anonymization of Large Sparse Datasets', url: 'https://www.cs.cornell.edu/~shmat/shmat_oak08netflix.pdf', type: 'article', cost: 'free', provider: 'Narayanan and Shmatikov', note: 'The Netflix study. Read the introduction and the main result.' },
            { title: 'Estimating the success of re-identifications in incomplete datasets using generative models', url: 'https://www.nature.com/articles/s41467-019-10933-3', type: 'article', cost: 'free', provider: 'Nature Communications', note: 'Rocher et al. (2019).' },
            { title: 'De-Identification of Personal Information (NISTIR 8053)', url: 'https://csrc.nist.gov/pubs/ir/8053/final', type: 'documentation', cost: 'free', provider: 'US NIST', note: 'A survey of terms and methods.' },
          ],
          exercises: [
            {
              slug: 'small-linkage',
              title: 'A small linkage attack on invented data',
              prompt:
                'Invent two tables by hand or by script: 20 rows of `release` with ZIP, birth year, sex and diagnosis, and 30 rows of `roll` with name, ZIP, birth year and sex. Use invented names only. Join them, and count how many release rows match exactly one roll row, and how many of those are right. Then coarsen ZIP to 3 digits and repeat. Explain why a match is not the same as a correct match.',
              kind: 'coding',
              difficulty: 1,
            },
            {
              slug: 'hash-reversal',
              title: 'Reverse a hash of a small space',
              prompt:
                'Write a function that "anonymises" invented 4-digit employee numbers with SHA-256. Then recover every number by hashing all 10,000 possibilities, and time it. Add a secret key using HMAC, and explain what changes and what does not. Say whether the output is anonymised or pseudonymised, and why the difference matters.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What is a quasi-identifier?',
              answerOutline: 'An attribute that does not identify alone, but can in combination with others and with outside data.',
            },
            {
              question: 'State what is established and what is disputed about the 87 percent result.',
              answerOutline: 'Established: demographic combinations are often unique. Disputed: the exact rate, since Golle found about 63 percent on later data, and how typical the Weld case was, as argued by Barth-Jones.',
            },
            {
              question: 'Why did hashing fail for New York taxi medallions?',
              answerOutline: 'The input space was small and known, so every possible value could be hashed and compared.',
            },
          ],
        },
        {
          slug: 'k-anonymity',
          title: 'k-anonymity and its limits',
          summary:
            'Measure risk with equivalence classes, generalise to reach k, and see what k-anonymity does not protect against.',
          estimatedMinutes: 85,
          objectives: [
            'Compute equivalence classes, k and prosecutor risk',
            'Apply generalisation and suppression to reach a target k',
            'Measure the loss of information',
            'Demonstrate a homogeneity failure and explain l-diversity',
          ],
          concepts: [
            'Equivalence class',
            'k-anonymity',
            'Prosecutor risk',
            'Generalisation hierarchy',
            'Suppression',
            'Information loss',
            'Homogeneity attack',
            'l-diversity',
          ],
          explanation: `Sweeney's **k-anonymity** is a clear promise: every record shares its quasi-identifier values with at least $k-1$ others. So a linkage can only narrow someone down to a group of $k$. Records with identical quasi-identifiers form an **equivalence class**, and the smallest class size is the $k$ of the table.

If an attacker knows a person is in the data, the **prosecutor risk** for a record in a class of size $c$ is $1/c$. The worst case is $1/k$. The average over all records is simply (number of classes) / (number of records).

\`\`\`python
sizes = df.groupby(quasi_ids).size()
k = sizes.min()
unique_rows = (sizes == 1).sum()
mean_risk = len(sizes) / len(df)
\`\`\`

On the UCI Adult benchmark with age, education, marital status, country, race and sex as quasi-identifiers, there are 8,553 classes among 32,561 rows, and 5,594 rows (17.2 percent) are unique.

You raise $k$ by **generalisation**, replacing values with broader ones (age 37 becomes 30-39), and **suppression**, removing a few records. A hierarchy gives each attribute levels of detail, and searching their combinations finds the least damaging option. Allowing 1 percent suppression matters a lot. With no suppression, the lowest-loss ways of reaching $k=5$ on Adult removed age entirely. With 1 percent, the best solution kept age in 10-year bands.

The price is **information loss**, and it isn't shared equally. Small groups get merged or suppressed first, so analyses of them suffer most. That is a burden, and you should measure it.

$k$-anonymity's limits are basic. A **homogeneity attack** works when everyone in a class shares the sensitive value: being in a class of 5 does not help if all 5 have the same diagnosis. In the 1 percent solution for $k=5$ on Adult, 59 of 203 classes had just one income value. **$l$-diversity** requires at least $l$ distinct sensitive values per class, and $t$-closeness goes further. Neither limits what an attacker with extra background knowledge can learn, and repeated releases of the same data can undo protections. These limits led to differential privacy, which comes next.`,
          resources: [
            { title: 'k-Anonymity: A Model for Protecting Privacy', url: 'https://dataprivacylab.org/projects/kanonymity/kanonymity.pdf', type: 'article', cost: 'free', provider: 'Latanya Sweeney', note: 'The original formulation.', primary: true },
            { title: 'De-Identifying Government Datasets (NIST SP 800-188)', url: 'https://csrc.nist.gov/pubs/sp/800/188/final', type: 'documentation', cost: 'free', provider: 'US NIST', note: 'Practical advice on when these methods are appropriate.' },
            { title: 'UCI Adult dataset', url: 'https://archive.ics.uci.edu/dataset/2/adult', type: 'dataset', cost: 'free', provider: 'UCI Machine Learning Repository', note: 'A 1994 US census extract and a long-standing research benchmark. Note its age and known limitations.' },
          ],
          exercises: [
            {
              slug: 'measure-k',
              title: 'Measure risk on a benchmark',
              prompt:
                'Load `adult.data` (32,561 rows). With `age`, `education`, `marital-status`, `native-country` (missing values as `unknown`), `race` and `sex`, confirm 8,553 classes, $k=1$, 5,594 unique rows and mean risk 0.2627. Then compute how the number of unique rows changes as you remove each attribute in turn. Say which matters most, and what that does and does not show about real people in 2026.',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'homogeneity',
              title: 'Show a homogeneity failure',
              prompt:
                'Generalise Adult to reach $k=5$. Using `income` as the sensitive attribute, count classes with one income value, and the rows in those classes. Explain what an attacker learns about such a person. Then require 2-diversity and report the extra rows you must suppress and which groups lose most.',
              kind: 'data-analysis',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What exactly does k-anonymity promise?',
              answerOutline: 'Each record is indistinguishable from at least k-1 others on the quasi-identifiers. It says nothing about the sensitive values.',
            },
            {
              question: 'Why does information loss fall unevenly?',
              answerOutline: 'Small groups have rare combinations, so they get generalised or suppressed first, which hurts analysis of those groups.',
            },
            {
              question: 'What does l-diversity add, and what does it still miss?',
              answerOutline: 'At least l distinct sensitive values per class. It still ignores skewed distributions, background knowledge and repeated releases.',
            },
          ],
        },
        {
          slug: 'differential-privacy',
          title: 'Differential privacy',
          summary:
            'A guarantee about the process rather than the data: epsilon, the Laplace mechanism, budgets, and the argument over the 2020 US Census.',
          estimatedMinutes: 95,
          objectives: [
            'State the definition of differential privacy and interpret epsilon',
            'Implement the Laplace mechanism for counts',
            'Track a privacy budget under composition',
            'Argue both sides of the 2020 Census decision',
          ],
          concepts: [
            'Epsilon',
            'Neighbouring datasets',
            'Sensitivity',
            'Laplace mechanism',
            'Sequential and parallel composition',
            'Post-processing',
            'Privacy budget',
            'Reconstruction attack',
          ],
          explanation: `Earlier methods describe the output table. **Differential privacy** (Dwork, McSherry, Nissim and Smith, 2006) describes the release process: its result should hardly change whether or not any one person is in the data. A randomised mechanism $M$ is $\\varepsilon$-differentially private if, for all datasets $D, D'$ differing in one person and all outcomes $S$,

$$ \\Pr[M(D) \\in S] \\le e^{\\varepsilon} \\Pr[M(D') \\in S]. $$

Smaller $\\varepsilon$ means more privacy and more noise. The guarantee holds whatever the attacker already knows, and any computation on the output stays private, a property called **post-processing**.

For a count, one person changes the answer by at most 1, so its **sensitivity** is 1. The **Laplace mechanism** adds noise with scale $1/\\varepsilon$, and the mean absolute error is exactly $1/\\varepsilon$.

\`\`\`python
noisy = true_count + rng.laplace(0, 1 / epsilon)
\`\`\`

The same absolute noise affects groups differently. On Adult at $\\varepsilon = 0.1$, the error of about 10 is around 0.05 percent of the 19,174 White men but about 9 percent of the 109 women in the Other race category. Accuracy for small groups is the price, and small groups pay it.

**Budgets.** Two queries at $\\varepsilon$ each cost $2\\varepsilon$ together (**sequential composition**). Queries on disjoint groups, such as cells of a histogram, cost only $\\varepsilon$ (**parallel composition**). Once the budget is spent, you stop. Choosing $\\varepsilon$ is a policy decision, not a technical one.

**The 2020 Census.** The Census Bureau reconstructed person-level records from published 2010 tables and matched some to commercial data, then adopted differential privacy for 2020, saying legacy methods could no longer meet its Title 13 duty of confidentiality. Critics, including Ruggles and Van Riper, argued that the reported reconstruction accuracy was little better than chance would give, and demographers worried about harm to small-area and minority statistics. Supporters reply that the threat grows with computing power, and that noise is at least measured and published, unlike the swapping it replaced. Both sides have evidence. **It is established** that noise harms small areas more. **It is disputed** how serious the attack is and whether the cost is justified.`,
          resources: [
            { title: 'Programming Differential Privacy', url: 'https://programming-dp.com/', type: 'textbook', cost: 'free', provider: 'Near and Abuah', note: 'A practical book with Python. Do the chapters on the Laplace mechanism and composition.', primary: true },
            { title: 'Guidelines for Evaluating Differential Privacy Guarantees (SP 800-226)', url: 'https://csrc.nist.gov/pubs/sp/800/226/final', type: 'documentation', cost: 'free', provider: 'US NIST', note: 'How to judge a claimed guarantee.' },
            { title: 'Census: disclosure avoidance', url: 'https://www.census.gov/programs-surveys/decennial-census/decade/2020/planning-management/process/disclosure-avoidance.html', type: 'documentation', cost: 'free', provider: 'US Census Bureau', note: "The Bureau's own account. Read it alongside its critics." },
            { title: 'The Algorithmic Foundations of Differential Privacy', url: 'https://www.cis.upenn.edu/~aaroth/privacybook.html', type: 'textbook', cost: 'free', provider: 'Dwork and Roth', note: 'The standard theory text, for those who want proofs.' },
          ],
          relatedLessons: ['probability-statistics/limit-theorems-and-sampling/random-numbers-and-simulation'],
          exercises: [
            {
              slug: 'laplace-counts',
              title: 'Laplace counts and relative error',
              prompt:
                'Compute the race by sex histogram of Adult. Apply the Laplace mechanism with $\\varepsilon$ of 0.1, 0.5 and 1 over 20,000 trials. Confirm that the mean absolute error is close to $1/\\varepsilon$. Report relative error by group, and plot it against group size. The smallest cell has 109 people and the largest 19,174. Say who carries the cost, and how you would explain that to a community group.',
              kind: 'simulation',
              difficulty: 2,
            },
            {
              slug: 'census-debate-brief',
              title: 'Brief both sides of the census debate',
              prompt:
                'Read the Census Bureau page and one published critique. Write a two-column brief with the strongest three arguments on each side, each with a citation. Mark each claim as established or disputed. Finish by stating which fact, if settled, would most change the decision.',
              kind: 'reading',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What does differential privacy protect against that k-anonymity does not?',
              answerOutline: 'Attackers with arbitrary background knowledge, and it composes predictably over multiple releases, because it is a property of the mechanism.',
            },
            {
              question: 'Why do histogram cells cost epsilon once?',
              answerOutline: 'Each person is in one cell, so the queries are disjoint and parallel composition applies.',
            },
            {
              question: 'Is epsilon a technical or a policy choice?',
              answerOutline: 'Policy. It sets how much accuracy to trade for protection, and so who carries that cost.',
            },
          ],
        },
        {
          slug: 'surveillance',
          title: 'Surveillance',
          summary:
            'From fitness maps to face search and gunshot sensors: what data-driven surveillance does, who it is aimed at, and the case for it.',
          estimatedMinutes: 70,
          objectives: [
            'Distinguish government, commercial and workplace surveillance',
            'Explain function creep and data broker pathways',
            'Evaluate a surveillance system by evidence of what it delivers',
            'Identify who is watched most',
          ],
          concepts: [
            'Function creep',
            'Data brokers',
            'Face recognition',
            'Workplace monitoring',
            'Disparate surveillance',
            'Warrant requirement',
            'Evaluation of claimed benefits',
          ],
          explanation: `Surveillance is the systematic collection of data about people in order to influence or manage them. Its modern form is often a by-product of ordinary services.

**Strava, 2018.** The fitness app published a global heatmap of activity. An analyst, Nathan Ruser, noticed that it outlined military sites where soldiers wore trackers. No individual's name appeared, but aggregates still revealed something sensitive. That is the same lesson as aggregation harm.

**Clearview AI.** The company built a face search tool from images scraped from the web and sold it to police. In Illinois, the ACLU sued under the Biometric Information Privacy Act, and a 2022 settlement restricted sales to most private entities nationwide. Police have said that such tools help identify victims and suspects, and critics respond that it is mass identification without consent, with errors falling on those who look like the wrong person.

**ShotSpotter in Chicago.** Acoustic sensors detect presumed gunshots and send police. Chicago's Inspector General reported in 2021 that about 9 percent of the alerts it studied gave evidence of a gun-related crime. The company disputed the interpretation, saying that alerts help reach victims. Critics, including the MacArthur Justice Center, noted that sensors were concentrated in predominantly Black and Latino neighbourhoods, and the city ended its contract in 2024. This case shows how to evaluate: ask what the claimed benefit is, how it was measured, and who bears the cost of false alarms.

**Commercial pathways.** Phone location data is sold through brokers, and government agencies have bought it, which raises the question of whether purchase avoids the warrant that *Carpenter v. United States* (2018) requires for cell-site records.

Two patterns recur. **Function creep**: data collected for one purpose gets used for another, such as a safety system later used for discipline. **Unequal exposure**: surveillance is not evenly spread. People who receive benefits, work in warehouses, or live in over-policed areas are watched more, and they have less power to refuse.

The case for surveillance isn't empty. Cameras can solve crimes, and tracking helped contain disease. The fair question is whether a specific system delivers a specific benefit, compared with less intrusive means, under real oversight. Ask for the evidence.`,
          resources: [
            { title: 'ACLU v. Clearview AI', url: 'https://www.aclu.org/cases/aclu-v-clearview-ai', type: 'article', cost: 'free', provider: 'ACLU', note: "The plaintiff's account, so read it as one party's description.", primary: true },
            { title: 'NIST Privacy Framework', url: 'https://www.nist.gov/privacy-framework', type: 'documentation', cost: 'free', provider: 'US NIST', note: 'A way of structuring the assessment that an exercise below asks for.' },
          ],
          exercises: [
            {
              slug: 'evaluate-a-system',
              title: 'Evaluate a system by its evidence',
              prompt:
                'Choose a real public surveillance system, such as licence plate readers or a school safety monitor. Find the claimed benefit, the best evaluation you can find, and its sample and method. Find who is covered most. Write one page stating what is established, what is disputed, and what data you would ask for. Attribute every claim.',
              kind: 'reading',
              difficulty: 2,
            },
            {
              slug: 'alert-math',
              title: 'The arithmetic of alerts',
              prompt:
                'A sensor raises 40,000 alerts a year. Suppose 9 percent are verified. Each response takes 2 officers 30 minutes. Compute the hours spent per verified incident. Then suppose alerts in one neighbourhood are twice as frequent and verification half as likely. Work out who bears the extra police contact. State all your assumptions, and note that these are illustrative numbers.',
              kind: 'problem',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'What is function creep?',
              answerOutline: 'Data or a system built for one purpose gradually used for others, without new justification.',
            },
            {
              question: 'What does the Strava case show about aggregation?',
              answerOutline: 'Aggregated, nameless data can still reveal sensitive facts about groups and places.',
            },
            {
              question: 'What three questions should you ask of any claimed surveillance benefit?',
              answerOutline: 'What is the benefit, how was it measured against an alternative, and who bears the cost of errors?',
            },
          ],
        },
      ],
    },
    {
      slug: 'bias-and-fairness',
      title: 'Bias and Fairness',
      description:
        'Where bias enters a system, the competing definitions of fairness and why they conflict, how to audit a system with data, and what mitigation and recourse can and cannot do.',
      lessons: [
        {
          slug: 'where-bias-enters',
          title: 'Where bias enters',
          summary:
            'Historical, representation, measurement, aggregation, evaluation and deployment bias, each with a real case.',
          estimatedMinutes: 75,
          objectives: [
            'Name six sources of bias in the machine learning life cycle',
            'Diagnose a proxy label problem',
            'Explain how disaggregated evaluation exposes hidden failure',
            'Suggest where in a pipeline a given bias should be addressed',
          ],
          concepts: [
            'Historical bias',
            'Representation bias',
            'Measurement bias and proxy labels',
            'Aggregation bias',
            'Evaluation bias',
            'Deployment bias',
            'Feedback loops',
          ],
          explanation: `"Biased data" is too crude a diagnosis. Suresh and Guttag's framework separates sources, and each calls for a different fix.

- **Historical bias**: the world itself was unjust, so accurate data reproduces it. Reuters reported in 2018 that Amazon scrapped a résumé tool that had learned to downgrade women, because past hires were mostly men. Amazon told Reuters the tool was not used on its own to evaluate candidates.
- **Representation bias**: some groups are thin in the data. **Gender Shades** (Buolamwini and Gebru, 2018) found that commercial gender classifiers had error rates up to 34.7 percent for darker-skinned women and 0.8 percent for lighter-skinned men. Vendors later reported improvements after the audit.
- **Measurement bias**: the label is a poor proxy. **Obermeyer and colleagues** (2019, *Science*) studied a widely used health risk algorithm that predicted **healthcare costs** as a stand-in for need. Because less is spent on Black patients with the same illness, those patients were sicker at the same score. The authors estimated that correcting this would raise the share of Black patients flagged for extra care from 17.7 to 46.5 percent. The model was accurate at predicting its label. The label was the problem.
- **Aggregation bias**: one model for groups that differ, as when a single clinical threshold ignores differences among populations.
- **Evaluation bias**: the benchmark does not reflect use, or an overall average hides a failing subgroup.
- **Deployment bias**: a system is used in ways it was not built for, as when a risk score meant to inform support gets used to punish.

**Feedback loops** connect these. If police are sent where arrests happened, more arrests occur there, and the data confirms the prediction. Lum and Isaac (2016) showed this in a simulation with drug arrest data.

The practical skill is to ask, for each column and label: what was actually measured, by whom, and on whom? Could the label differ for reasons unrelated to the outcome you care about? Disaggregate every evaluation by the groups that matter. Keep in mind that collecting group labels is itself a privacy decision, and an unavoidable tension: you cannot audit for what you do not record.`,
          resources: [
            { title: 'A Framework for Understanding Sources of Harm throughout the Machine Learning Life Cycle', url: 'https://arxiv.org/abs/1901.10002', type: 'article', cost: 'free', provider: 'Suresh and Guttag', note: 'The structure for this lesson.', primary: true },
            { title: 'Dissecting racial bias in an algorithm used to manage the health of populations', url: 'https://pubmed.ncbi.nlm.nih.gov/31649194/', type: 'article', cost: 'free', provider: 'Science (PubMed record)', note: 'Obermeyer et al. (2019).' },
            { title: 'Gender Shades', url: 'https://proceedings.mlr.press/v81/buolamwini18a.html', type: 'article', cost: 'free', provider: 'Proceedings of Machine Learning Research', note: 'Buolamwini and Gebru (2018).' },
          ],
          relatedLessons: ['machine-learning/ml-engineering/deployment-monitoring-and-fairness'],
          exercises: [
            {
              slug: 'label-audit',
              title: 'Audit a proxy label',
              prompt:
                'For each target, name what is really measured and how it could differ across groups for reasons unrelated to the goal: arrests as a measure of crime, cost as a measure of health need, grades as a measure of ability, clicks as a measure of interest, employee reviews as a measure of performance. Suggest one better label and what it would cost to collect.',
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'simpson-in-the-wild',
              title: 'Hide a failure in an average',
              prompt:
                'Using a confusion matrix by subgroup, construct numbers where a classifier has 95 percent overall accuracy, while one 5 percent subgroup has 50 percent accuracy. Write the code that computes both. Then find a real model card or vendor claim that states only one overall number, and list the disaggregated figures you would ask for.',
              kind: 'problem',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why was the health algorithm accurate and still harmful?',
              answerOutline: 'It predicted cost well, but cost was a biased proxy for need, because less was spent on Black patients with the same illness.',
            },
            {
              question: 'How does representation bias differ from historical bias?',
              answerOutline: 'Representation bias is too little data on some groups. Historical bias means that even perfect sampling reflects unjust past outcomes.',
            },
            {
              question: 'Why do fairness audits create a privacy tension?',
              answerOutline: 'You need group attributes to measure disparities, yet collecting them is sensitive.',
            },
          ],
        },
        {
          slug: 'fairness-definitions-and-conflicts',
          title: 'Fairness definitions and why they conflict',
          summary:
            'Independence, separation and sufficiency, the impossibility results, and the COMPAS dispute worked with real numbers.',
          estimatedMinutes: 100,
          objectives: [
            'Compute demographic parity, equalised odds and predictive parity from a confusion matrix',
            'Derive why error-rate balance and predictive parity conflict when base rates differ',
            'Recompute both sides of the COMPAS dispute',
            'Explain why choosing a metric is a value judgement',
          ],
          concepts: [
            'Base rate',
            'Demographic parity (independence)',
            'Equalised odds (separation)',
            'Predictive parity and calibration (sufficiency)',
            'False positive and false negative rates',
            'Impossibility results',
            'Individual fairness',
          ],
          explanation: `Barocas, Hardt and Narayanan group the common criteria in three families, with score or decision $\\hat{Y}$, outcome $Y$ and group $A$.

- **Independence**: $\\hat{Y}$ is independent of $A$, so selection rates are equal (demographic parity).
- **Separation**: $\\hat{Y}$ is independent of $A$ given $Y$, so error rates are equal (equalised odds).
- **Sufficiency**: $Y$ is independent of $A$ given $\\hat{Y}$, so a given score means the same for each group (predictive parity, calibration).

**COMPAS.** In 2016 ProPublica analysed this recidivism score for 7,214 defendants in Broward County, Florida, obtained through a public records request. Treating medium and high as higher risk, you can recompute their figures from their data: 44.85 percent of Black defendants who did not reoffend were labelled higher risk, against 23.45 percent of white defendants, and 27.99 percent of Black reoffenders were labelled lower risk, against 47.72 percent of white. Northpointe, the vendor, replied that the score was fair by a different standard, predictive parity: a given label should mean about the same chance of reoffending in each group. In the same 7,214 rows, 63 percent of Black and 59 percent of white defendants labelled higher risk did reoffend. The same data supports both statements.

**The conflict is arithmetic.** Chouldechova (2017) showed that with base rate $p$,

$$ \\mathrm{FPR} = \\frac{p}{1-p} \\cdot \\frac{1-\\mathrm{PPV}}{\\mathrm{PPV}} \\cdot (1-\\mathrm{FNR}). $$

If base rates differ, and PPV and FNR are equal, then FPR must differ. Here the base rates were 51.4 and 39.4 percent. Kleinberg, Mullainathan and Raghavan (2016) proved a related result. Except when prediction is perfect or base rates are equal, you cannot have all of them.

So **choosing a metric is a value judgement** about whose error matters most. A false positive here means someone may be held who would not have reoffended. A false negative means someone released who does reoffend. And the base rates themselves are arrest rates, shaped by policing, so measurement bias sits underneath everything.

Other views exist. **Individual fairness** asks that similar people be treated similarly, and needs a defensible similarity measure. Causal approaches ask what would change if group membership did. None of them removes the need to choose.`,
          resources: [
            { title: 'Fairness and Machine Learning: Classification', url: 'https://fairmlbook.org/', type: 'textbook', cost: 'free', provider: 'Barocas, Hardt and Narayanan', note: 'Read the chapter on classification, which covers these criteria.', primary: true },
            { title: 'How We Analyzed the COMPAS Recidivism Algorithm', url: 'https://www.propublica.org/article/how-we-analyzed-the-compas-recidivism-algorithm', type: 'article', cost: 'free', provider: 'ProPublica', note: 'The method behind the story, with filtering decisions.' },
            { title: 'Fair prediction with disparate impact', url: 'https://arxiv.org/abs/1610.07524', type: 'article', cost: 'free', provider: 'Alexandra Chouldechova', note: 'The identity above.' },
            { title: 'Inherent Trade-Offs in the Fair Determination of Risk Scores', url: 'https://arxiv.org/abs/1609.05807', type: 'article', cost: 'free', provider: 'Kleinberg, Mullainathan and Raghavan' },
          ],
          relatedLessons: ['machine-learning/classification-and-evaluation/classification-metrics-and-curves'],
          exercises: [
            {
              slug: 'verify-the-identity',
              title: 'Verify the identity on real counts',
              prompt:
                'Using the counts for Black defendants (TP 1,369, FP 805, FN 532, TN 990) and white defendants (TP 505, FP 349, FN 461, TN 1,139), compute base rate, FPR, FNR and PPV for each. Verify the identity numerically. Then derive it by hand from the definitions. State in one sentence what must change for both groups to have equal FPR while PPV stays equal.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'pick-a-metric',
              title: 'Argue for a metric in three settings',
              prompt:
                'For pretrial detention, a screening test for a treatable cancer, and a loan decision, say which error is worse for whom, which fairness family you would prioritise, and which person loses under your choice. Then write the best objection from someone who chose differently.',
              kind: 'writing',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What does separation require?',
              answerOutline: 'Equal false positive and false negative rates across groups: the decision is independent of group given the true outcome.',
            },
            {
              question: 'Why could ProPublica and Northpointe both be right about the numbers?',
              answerOutline: 'They measured different criteria, and when base rates differ, an imperfect score cannot satisfy both.',
            },
            {
              question: 'What does the impossibility result not tell you?',
              answerOutline: 'Which criterion to choose. That is a moral and policy decision, and it also leaves unresolved whether the labels are fair.',
            },
          ],
        },
        {
          slug: 'auditing-a-system',
          title: 'Auditing a system',
          summary:
            'Plan and run an audit: reproducing published figures, choosing populations, stating uncertainty, and reporting what you cannot know.',
          estimatedMinutes: 85,
          objectives: [
            'Design an audit with a stated question, population and metrics',
            'Reproduce a published figure and explain any difference',
            'Report disparities with uncertainty',
            'State the limits of an external audit',
          ],
          concepts: [
            'First-party, second-party and third-party audits',
            'Audit population',
            'Sensitivity to filtering',
            'Bootstrap confidence intervals',
            'Calibration by group',
            'Intersectional analysis',
            'Audit limits',
          ],
          explanation: `An audit is a structured check of a system against a stated standard. **First-party** audits are internal, **second-party** are by a contracted firm, and **third-party** audits are independent, often without any cooperation.

A plan answers these questions before you look at results:

1. What system, used for which decision, on which population?
2. What standard: which metrics, and why those?
3. What counts as a concerning gap, and how will uncertainty be handled?
4. What can you not see?

**Reproduce first.** Before making a new claim, reproduce a published one. It proves that you have read the data correctly, and it reveals decisions that a summary hides. With COMPAS, the file \`compas-scores-two-years.csv\` has 7,214 rows, and those give ProPublica's 44.85 and 23.45 percent exactly. ProPublica's later analysis filters to 6,172 rows, using a 30-day window around arrest, among other rules. On those rows the figures become 42.34 and 22.01 percent. Neither is wrong. They are different populations, and a good audit reports how results depend on them.

**Quantify uncertainty.** A gap is an estimate. On the filtered data, the difference in false positive rates between Black and white defendants is about 20 percentage points, and a bootstrap 95 percent interval runs from about 17 to 24 points. Calibration by group is worth a look too: compare the observed rate at each score decile.

**Look at intersections.** Averages by race or by sex can hide a subgroup, as Gender Shades showed. But subgroups get small quickly, so state counts, and do not report rates from a handful of people. In the COMPAS data there are 11 Native American defendants after filtering, which is too few to say anything.

**State what you cannot know.** The outcome here is re-arrest, not reoffending. You cannot see how judges used the score, nor the vendor's model, nor people never scored. Causal claims need more than a confusion matrix.

Handle the data with care. Audit datasets often describe real people, and the COMPAS file holds names and dates of birth. Remove them on load, and never attempt to find anyone.`,
          resources: [
            { title: 'ProPublica COMPAS analysis repository', url: 'https://github.com/propublica/compas-analysis', type: 'dataset', cost: 'free', provider: 'ProPublica', note: 'Data and notebooks. It includes identifying fields, so read MP 2 before using it.', primary: true },
            { title: 'Fairlearn', url: 'https://fairlearn.org/', type: 'tool', cost: 'free', provider: 'Fairlearn project', note: 'Open-source tools and a useful user guide on assessment.' },
            { title: 'Algorithmic decision making and the cost of fairness', url: 'https://arxiv.org/abs/1701.08230', type: 'article', cost: 'free', provider: 'Corbett-Davies et al.', note: 'A clear statement of a different view of the COMPAS numbers.' },
          ],
          relatedLessons: ['probability-statistics/estimation-and-confidence/bootstrap-resampling'],
          exercises: [
            {
              slug: 'population-sensitivity',
              title: 'How much does the population matter?',
              prompt:
                'Load the COMPAS two-year file with only non-identifying columns. Compute FPR, FNR and PPV by race on all 7,214 rows, and on the 6,172 rows left by the filters in ProPublica\'s analysis. Confirm 44.85 and 23.45 percent, then 42.34 and 22.01 percent. Report which conclusions change and which do not. Do not look up anyone in the data.',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'audit-plan',
              title: 'Write an audit plan',
              prompt:
                'Write a one-page audit plan for a university admissions-support tool. Give the question, population, metrics and reasons for them, the threshold for concern, how you will treat small groups, the data you need, the consent and access issues, and what the audit cannot show. Commit to the plan before seeing any results.',
              kind: 'writing',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why reproduce a published figure first?',
              answerOutline: 'It confirms your reading of the data and exposes hidden choices, before you make new claims.',
            },
            {
              question: 'What is a limit of a third-party audit?',
              answerOutline: 'No access to the model, to how outputs are used, or to people outside the data. Outcomes may also be proxies.',
            },
            {
              question: 'Why should thresholds for concern be set before seeing results?',
              answerOutline: 'To avoid choosing a standard that gives the desired conclusion.',
            },
          ],
        },
        {
          slug: 'mitigation-and-recourse',
          title: 'Mitigation and recourse',
          summary:
            'Pre-processing, in-processing and post-processing, what mitigation costs, and how people can contest or change a decision.',
          estimatedMinutes: 80,
          objectives: [
            'Describe pre-, in- and post-processing mitigation',
            'Apply group-specific thresholds and measure who gains and loses',
            'Explain recourse and how it differs from an explanation',
            'Explain why some problems should not be solved by mitigation',
          ],
          concepts: [
            'Pre-processing',
            'In-processing',
            'Post-processing',
            'Group-specific thresholds',
            'Recourse',
            'Contestability',
            'Refusal: not building the system',
          ],
          explanation: `Mitigation can happen at three points. **Pre-processing** changes the data: reweighting, collecting better samples, or replacing the label, as Obermeyer's team proposed. **In-processing** adds a fairness constraint to training. **Post-processing** adjusts outputs, for example with a different threshold per group.

Better labels and better data often beat clever constraints, since they address the cause. Yet post-processing is easy to measure, so try it on COMPAS. With a single threshold at decile 5, the FPRs for Black and white defendants are 42.34 and 22.01 percent. Raise the threshold to 7 for Black defendants, keeping 5 for white:

| | FPR Black | FPR white | FNR Black | FNR white | PPV Black | PPV white |
|---|---|---|---|---|---|---|
| Same threshold (5) | 42.34 | 22.01 | 28.48 | 49.64 | 0.650 | 0.595 |
| Thresholds 7 and 5 | 22.79 | 22.01 | 49.25 | 49.64 | 0.710 | 0.595 |

Error rates now nearly match, and accuracy on these two groups falls only from 65.8 to 64.9 percent. But the burden moved. 296 fewer Black defendants who did not reoffend are flagged. 345 more who did reoffend go unflagged, and predictive parity is now further apart. Who carries that? People who might be harmed by those re-offences, including people in the same neighbourhoods. Using race directly in a decision may also raise legal issues, and the law varies by domain. This is an illustration, not a recommendation.

**Recourse** asks a different question: if a decision goes against you, can you do something about it? An explanation says why. Recourse says what you could change. Ustun and colleagues (2019) studied this for linear models, and showed that some people have no feasible action, for instance if a model rests on age. **Contestability** is the ability to challenge a decision, with a real person who can overturn it, which also means someone has to pay for that person.

Finally, not every system should be fixed. Some scholars argue that focusing on fairness metrics can legitimise a decision that should not be automated at all. Others respond that refusing leaves the current biased human process in place. Be ready to argue either way, and to ask first whether this decision needs a prediction.`,
          resources: [
            { title: 'Actionable Recourse in Linear Classification', url: 'https://arxiv.org/abs/1809.06514', type: 'article', cost: 'free', provider: 'Ustun, Spangher and Liu', note: 'Defines recourse and audits it.', primary: true },
            { title: 'Fairlearn', url: 'https://fairlearn.org/', type: 'tool', cost: 'free', provider: 'Fairlearn project', note: 'See its post-processing tools and warnings about misuse.' },
            { title: 'Fairness and Machine Learning', url: 'https://fairmlbook.org/', type: 'textbook', cost: 'free', provider: 'Barocas, Hardt and Narayanan', note: 'See the discussion of what criteria leave unresolved.' },
          ],
          relatedLessons: ['machine-learning/classification-and-evaluation/imbalance-calibration-and-multiclass'],
          exercises: [
            {
              slug: 'threshold-burden',
              title: 'Move a threshold and count who pays',
              prompt:
                'On the 6,172-row COMPAS population, compute TP, FP, FN and TN for Black defendants at decile thresholds 5 and 7. Confirm that FP goes from 641 to 345 and FN from 473 to 818. Translate this into the number of people affected in each direction, and write a paragraph on who benefits, who pays, and whether you would make this change. Include the best objection.',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'recourse-design',
              title: 'Design recourse for a denial',
              prompt:
                'A small lender uses a logistic model on income, debt, years at address and age. Write a sample denial notice that gives real recourse. Identify which features are actionable, which are not, and how long a change would take. Design an appeal route, say who pays for it, and estimate the cost per application.',
              kind: 'writing',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What burden does a group threshold move?',
              answerOutline: 'It trades false positives for false negatives, shifting harm to those affected by missed cases, and can change other metrics such as PPV.',
            },
            {
              question: 'What is the difference between explanation and recourse?',
              answerOutline: 'Explanation says why. Recourse gives a feasible action that could change the result.',
            },
            {
              question: 'Give the strongest objection to refusing to deploy, and the strongest reply.',
              answerOutline: 'Objection: the human status quo is biased and opaque too. Reply: automation scales and legitimises harm, and the alternatives may include changing the decision itself.',
            },
          ],
        },
      ],
    },
    {
      slug: 'data-access',
      title: 'Data Access',
      description:
        'Who may use which data, on what terms: consent, research ethics and review boards, ownership, scraping, and the choice between open and restricted data.',
      lessons: [
        {
          slug: 'consent',
          title: 'Consent and its limits',
          summary:
            'What informed consent requires, why it strains at scale, and what the Facebook emotion study and Cambridge Analytica show.',
          estimatedMinutes: 70,
          objectives: [
            'State the elements of informed consent',
            'Explain why notice-and-consent fails at scale',
            'Analyse two real cases of disputed consent',
            'Compare opt-in, opt-out, broad and dynamic consent',
          ],
          concepts: [
            'Informed consent',
            'Notice and choice',
            'Opt-in and opt-out',
            'Broad consent',
            'Dynamic consent',
            'Secondary use',
            'Consent fatigue',
          ],
          explanation: `Valid informed consent has four parts: the person is **informed**, **understands**, **agrees voluntarily** and has the **capacity** to decide. Medicine developed this for a single patient and a single procedure. Online services stretched it across billions of people and uses nobody can list in advance.

The practical strain is well documented. Few read privacy policies, and those who do cannot foresee later inference. Refusal may not be real if a service is required for work or school. The result is what Solove calls the failure of **privacy self-management**: individuals are left to carry a burden that they cannot carry.

**Facebook emotional contagion.** In 2014 Kramer, Guillory and Hancock reported in *PNAS* an experiment that altered the news feeds of 689,003 users to study emotional contagion. Facebook relied on its data use policy as consent. The journal later published an expression of concern about informed consent and the opportunity to opt out. Defenders said that companies test feeds constantly and the effect was tiny. Critics replied that deliberately manipulating emotions is different in kind, and that users could not have expected it. Cornell's review board reportedly treated its researchers' role as not involving human subjects, because they analysed data that Facebook had collected.

**Cambridge Analytica.** A personality quiz app collected data on its users and their friends, whom Facebook later estimated at up to 87 million. The friends had not agreed in any meaningful sense, which illustrates how consent fails for collective data. The US Federal Trade Commission imposed a 5 billion dollar penalty on Facebook in 2019. How much the data actually changed votes is disputed, and some studies suggest it was less than the publicity claimed.

Designs differ in who carries the work. **Opt-out** means most people stay in. **Opt-in** can distort samples towards the willing. **Broad consent** covers future unspecified research, and it is formally recognised in the US Common Rule. **Dynamic consent** lets people choose over time, at the cost of constant requests and consent fatigue.

Consent should never be your only safeguard. Ask whether the use would be acceptable even if everyone clicked yes, and whether the person could realistically refuse.`,
          resources: [
            { title: 'Experimental evidence of massive-scale emotional contagion through social networks', url: 'https://pubmed.ncbi.nlm.nih.gov/24889601/', type: 'article', cost: 'free', provider: 'PNAS (PubMed record)', note: 'Kramer et al. (2014). The record links to the paper and the later expression of concern.', primary: true },
            { title: 'Facebook and Cambridge Analytica data scandal', url: 'https://en.wikipedia.org/wiki/Facebook%E2%80%93Cambridge_Analytica_data_scandal', type: 'article', cost: 'free', provider: 'Wikipedia', note: 'A starting point for timelines. Follow its citations, and do not cite it as the source.' },
            { title: '45 CFR 46.116: informed consent', url: 'https://www.law.cornell.edu/cfr/text/45/46.116', type: 'documentation', cost: 'free', provider: 'Legal Information Institute', note: 'The US Common Rule elements, including broad consent.' },
          ],
          exercises: [
            {
              slug: 'read-a-policy',
              title: 'Read one privacy policy properly',
              prompt:
                'Choose a service you use. Time how long it takes to read its privacy policy. List what is collected, who receives it, what is inferred, how long it is kept and how to opt out. Say what you could not determine. Then rewrite the three most important points in 50 words for a 15-year-old. Note what your summary leaves out.',
              kind: 'reading',
              difficulty: 1,
            },
            {
              slug: 'consent-design',
              title: 'Design consent for a real study',
              prompt:
                'A university wants to study how app use relates to student mental health, using phone data for one term. Design the consent process: what is stated, opt-in or opt-out, what happens to students who refuse, how withdrawal works, and whether grades or staff could influence participation. Explain which harms consent does not address.',
              kind: 'writing',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What are the four elements of informed consent?',
              answerOutline: 'Information, understanding, voluntariness and capacity.',
            },
            {
              question: 'Why did consent fail for the friends in the Cambridge Analytica case?',
              answerOutline: 'They had not used the app. Their data flowed through someone else\'s agreement.',
            },
            {
              question: 'Is the claim that Cambridge Analytica swung elections established?',
              answerOutline: 'No. The data collection is established, while its effect on votes is disputed.',
            },
          ],
        },
        {
          slug: 'research-ethics-and-review-boards',
          title: 'Research ethics and review boards',
          summary:
            'How abuses led to the Common Rule, what an IRB does, what it does not cover, and how data research tests its limits.',
          estimatedMinutes: 75,
          objectives: [
            'Explain the history leading to the Belmont Report and Common Rule',
            'Decide whether an activity is likely human subjects research',
            'Identify gaps in review for data research',
            'Prepare a project for ethics review',
          ],
          concepts: [
            'Tuskegee study',
            'Institutional review board',
            'Common Rule',
            'Human subject',
            'Exempt research',
            'Identifiable private information',
            'Public data is not always unproblematic',
          ],
          explanation: `Modern research ethics began with failures. In the **Tuskegee** study, from 1932 to 1972, US Public Health Service researchers followed Black men with syphilis, deceiving them and withholding treatment after penicillin became standard. The public outcry led to the National Research Act of 1974 and the Belmont Report. The federal **Common Rule**, at 45 CFR Part 46, followed, and a major revision took effect in January 2019. As of 2 November 2026 it remains the baseline for federally funded research with human subjects. This is education, not legal advice.

An **institutional review board** (IRB) reviews research on people. The key definitions are precise. **Research** is a systematic investigation designed to contribute to generalisable knowledge. A **human subject** is a living individual about whom an investigator obtains information through intervention or interaction, or obtains identifiable private information. Several categories are **exempt** from full review, and exempt does not mean you decide alone: your institution usually makes that determination.

Data research exposes gaps.

**Scope.** The Common Rule applies to federally funded work, and to institutions that commit to it. Most company experiments are outside it.

**"Public" data.** Researchers on the *Tastes, Ties, and Time* project released Facebook data on a cohort of students at an unnamed college. Zimmer (2010) showed how quickly others identified the institution, and argued that "it's already public" does not settle the ethical question. Fiesler and Proferes (2018) found that many Twitter users did not know their posts were used in research, and many felt it should require permission.

**Who is harmed.** IRBs focus on individuals in a study, whereas data projects can harm groups, or people outside the data.

**Speed and expertise.** Many boards lack data science expertise, while researchers can feel that review is a bureaucratic burden. That complaint is fair too. Slow or inconsistent review imposes real costs, and it can fall hardest on students and on low-risk work.

Do not treat approval as the end of ethical thinking. An IRB decides what your institution will permit, not what is right. You remain responsible. Ask early, since many institutions offer consultations, and prepare a data flow diagram, a risk analysis, and a plan for retention and sharing.`,
          resources: [
            { title: '45 CFR Part 46', url: 'https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-A/part-46', type: 'documentation', cost: 'free', provider: 'Electronic Code of Federal Regulations', note: 'Read the definitions in 46.102 and the exemptions in 46.104.', primary: true },
            { title: 'The Belmont Report', url: 'https://www.hhs.gov/ohrp/regulations-and-policy/belmont-report/read-the-belmont-report/index.html', type: 'article', cost: 'free', provider: 'US Department of Health and Human Services', note: 'hhs.gov may refuse scripted requests, but it opens in a browser.' },
            { title: '"But the data is already public"', url: 'https://link.springer.com/article/10.1007/s10676-010-9227-5', type: 'article', cost: 'free', provider: 'Ethics and Information Technology', note: 'Zimmer (2010) on the Tastes, Ties, and Time release. Check your access. The abstract is free.' },
          ],
          exercises: [
            {
              slug: 'is-this-human-subjects',
              title: 'Is this human subjects research?',
              prompt:
                'For each case use the definitions in 45 CFR 46.102 to say whether it is likely to be human subjects research, and why: (a) a class project surveying classmates for grading only; (b) a study of public county air data; (c) scraping usernames and posts from a support forum for a paper; (d) analysing de-identified records received from a registry; (e) a company A/B test of a checkout page. Say what you would ask your IRB.',
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'irb-packet',
              title: 'Draft a review packet',
              prompt:
                'For a study of your choice, draft a two-page summary for a review board: purpose, participants, data collected, data flow diagram, risks and mitigations, consent, retention, sharing and who has access. Mark each item that is unresolved. Do not collect any data for this exercise.',
              kind: 'writing',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Does the Common Rule cover an internal experiment at a private company?',
              answerOutline: 'Generally not, unless it is federally funded or the institution has committed to it.',
            },
            {
              question: 'What was the lesson of the Tastes, Ties, and Time release?',
              answerOutline: 'That data seen as public or de-identified could still expose people, and that "already public" does not settle the question.',
            },
            {
              question: 'What is a fair criticism of review boards?',
              answerOutline: 'Delay, inconsistency, poor fit to data research and a burden on low-risk work.',
            },
          ],
        },
        {
          slug: 'ownership-and-control',
          title: 'Ownership and control',
          summary:
            'Who owns data about you? HeLa, the Havasupai case, Indigenous data sovereignty and what happens to genetic data in a bankruptcy.',
          estimatedMinutes: 70,
          objectives: [
            'Explain why ownership is a poor fit for personal data in law',
            'Analyse the HeLa and Havasupai cases',
            'Explain Indigenous data sovereignty and the CARE principles',
            'Describe what happens to data when a company fails',
          ],
          concepts: [
            'Ownership, control and stewardship',
            'Moore v. Regents',
            'Secondary use of samples',
            'Group consent',
            'Indigenous data sovereignty',
            'CARE principles',
            'Data in bankruptcy',
          ],
          explanation: `"It's my data" sounds simple, but law generally does not treat personal data as property. Facts can't be owned, and many people may have a claim on the same record. Rights instead come as limits on use. So it often helps to replace "who owns it?" with "**who decides, who benefits, and who is answerable?**"

**HeLa.** In 1951 cells were taken from Henrietta Lacks, a Black patient at Johns Hopkins, without her knowledge. They became one of the most used cell lines in science. In *Moore v. Regents of the University of California* (1990), a separate case, California's Supreme Court held that a patient had no property right in cells that had been commercialised, while recognising a duty of disclosure. In 2013 researchers published a HeLa genome, exposing information about her family, and NIH then reached an agreement with the Lacks family on controlled access and a family voice in decisions. In 2023 the family settled a suit with Thermo Fisher Scientific. Here the burden was carried across generations.

**Havasupai.** Members of the Havasupai Tribe gave blood to Arizona State University researchers for what they understood to be diabetes research. Samples were later used for studies on other topics, including migration and schizophrenia, which conflicted with the tribe's beliefs and caused stigma. A 2010 settlement included 700,000 dollars for 41 tribal members, return of samples, and other assistance. The university had argued that the consent's wording covered behavioural research broadly. The case is a classic of **group harm** and scope of consent.

**Indigenous data sovereignty** holds that peoples have the right to govern data about their communities, land and resources. The **CARE Principles** say that FAIR-style openness should be matched by Collective benefit, Authority to control, Responsibility and Ethics.

**When companies fail.** 23andMe filed for bankruptcy in March 2025, and a nonprofit led by its co-founder acquired its assets later that year, after objections from state attorneys general about genetic data. Customers had agreed to terms, but few would have imagined a sale. This raises a stewardship question. A promise is only as durable as the organisation that made it.

Governance designs include data trusts, tribal review of research, and data use committees with community members. Each one moves power, and each adds cost.`,
          resources: [
            { title: 'The CARE Principles for Indigenous Data Governance', url: 'https://datascience.codata.org/articles/10.5334/dsj-2020-043', type: 'article', cost: 'free', provider: 'Data Science Journal', note: 'Carroll et al. (2020).', primary: true },
            { title: 'Operationalizing the CARE and FAIR Principles for Indigenous data futures', url: 'https://www.nature.com/articles/s41597-021-00892-0', type: 'article', cost: 'free', provider: 'Scientific Data', note: 'Carroll et al. (2021). How the two sets of principles work together.' },
          ],
          exercises: [
            {
              slug: 'decide-benefit-answer',
              title: 'Who decides, who benefits, who answers?',
              prompt:
                'For HeLa, the Havasupai case and a consumer DNA test company, fill a table: who decided on use, who benefited, who bore the risk, and who was answerable. Use only facts you can attribute to a source, and mark anything disputed. Then write one paragraph proposing a governance change for one of them, and say what it would cost.',
              kind: 'reading',
              difficulty: 2,
            },
            {
              slug: 'company-failure-plan',
              title: 'Plan for the end of an organisation',
              prompt:
                'You run a nonprofit with a health survey of 5,000 people that has lost its funding. Write a plan for what happens to the data: options to delete, transfer or archive, what the original consent permits, who decides, and how participants are told. Say which option you would choose, and who disagrees.',
              kind: 'writing',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why is "ownership" a poor frame for personal data?',
              answerOutline: 'Facts are not owned, several parties have interests in the same record, and law usually gives rights over use rather than property.',
            },
            {
              question: 'What distinguishes the Havasupai harm from an individual privacy breach?',
              answerOutline: 'It was harm to a community and its beliefs from use outside what members understood, not only exposure of one person.',
            },
            {
              question: 'What does CARE ask of open data advocates?',
              answerOutline: 'To consider collective benefit and authority, and not to treat openness as an unqualified good.',
            },
          ],
        },
        {
          slug: 'scraping-and-public-data',
          title: 'Scraping and public data',
          summary:
            'What the law says as of 2026 about scraping, why lawful does not mean ethical, and a practical way to decide.',
          estimatedMinutes: 75,
          objectives: [
            'Summarise Van Buren and hiQ v. LinkedIn as of a date',
            'Separate computer access, contract, copyright and privacy issues',
            'Apply a decision process to a scraping plan',
            'Weigh accountability research against site terms',
          ],
          concepts: [
            'Computer Fraud and Abuse Act',
            'Terms of service',
            'robots.txt',
            'Rate limiting',
            'Public records',
            'Audit research',
            'Publishing versus analysing',
          ],
          explanation: `This lesson is education, not legal advice, and is stated as of 2 November 2026. Scraping can touch at least four bodies of law, so analyse them separately.

**Computer access.** In *Van Buren v. United States* (2021), the US Supreme Court read the Computer Fraud and Abuse Act narrowly, using a "gates-up-or-down" idea: the offence is reaching areas you are not entitled to. In *hiQ Labs v. LinkedIn* (9th Cir. 2022), the court held that scraping publicly available pages likely does not violate the Act. That is one circuit's decision on a preliminary injunction.

**Contract.** Terms of service can still bind you. After the appeal, the district court in hiQ found that hiQ had breached LinkedIn's terms, and the parties settled. Being free of one law does not free you of another.

**Copyright.** Facts aren't protected, but text and images can be. Lawsuits over using scraped material to train AI models continue, with no settled answer yet.

**Privacy.** Public does not mean free of data protection. The GDPR applies to personal data, whether or not it is public.

The ethics are a separate layer. **The robots exclusion protocol** (RFC 9309) is a voluntary signal, not access control, yet honouring it is a norm. In 2016 a Danish researcher published a scrape of about 70,000 OkCupid profiles, with usernames and sensitive answers, arguing that the data was already public. It was widely condemned and taken down, and the case shows the gap between visible and publishable.

There is a real counter-argument. Accountability work needs scraping. In *Sandvig v. Barr* (D.D.C. 2020), researchers won a ruling that creating test accounts for an algorithmic audit, in breach of terms, did not violate the Act. ProPublica's COMPAS data came from a public records request, though it was later published with names. If platforms could block all outside collection, nobody could audit them.

A practical process:

1. Is there an official API or bulk download?
2. What do the terms and robots.txt say, and do you have a good reason to depart from them?
3. Are there people in the data? Could they be harmed?
4. Will you publish raw data, or only aggregates?
5. Have you limited your load on the server?
6. Would the people in the data find this reasonable?`,
          resources: [
            { title: 'Van Buren v. United States', url: 'https://www.oyez.org/cases/2020/19-783', type: 'documentation', cost: 'free', provider: 'Oyez', note: 'A summary, with a link to the opinion.', primary: true },
            { title: 'hiQ Labs v. LinkedIn (9th Cir. 2022)', url: 'https://cdn.ca9.uscourts.gov/datastore/opinions/2022/04/18/17-16783.pdf', type: 'documentation', cost: 'free', provider: 'US Court of Appeals for the Ninth Circuit', note: 'Read the introduction and the Computer Fraud and Abuse Act section.' },
            { title: 'RFC 9309: Robots Exclusion Protocol', url: 'https://www.rfc-editor.org/rfc/rfc9309', type: 'documentation', cost: 'free', provider: 'IETF', note: 'Note in the text that this is not a form of access authorisation.' },
          ],
          exercises: [
            {
              slug: 'scraping-memo',
              title: 'A scraping decision memo',
              prompt:
                'You want to study rental listing prices in Illinois by collecting pages from a large site. Write a one-page memo using the six questions above. Read the actual terms and robots.txt, and quote them. List the risks under each body of law as issues to raise with counsel, not conclusions. Decide whether to go ahead, change the plan, or stop. Do not run the scraper.',
              kind: 'writing',
              difficulty: 2,
            },
            {
              slug: 'public-is-not-publishable',
              title: 'Public is not publishable',
              prompt:
                'List five kinds of data that are publicly visible but which you would not republish in bulk, and say why, using contextual integrity. For each, say what form of the data, if any, you would be willing to share, for instance aggregate statistics or a synthetic sample.',
              kind: 'writing',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'What did hiQ decide, and what did it not decide?',
              answerOutline: 'Scraping public pages likely does not violate the Computer Fraud and Abuse Act in that circuit. It did not settle contract, copyright or privacy claims.',
            },
            {
              question: 'Is robots.txt legally binding?',
              answerOutline: 'It is a voluntary protocol, not an access control. Honouring it is a norm, and ignoring it can matter in other disputes.',
            },
            {
              question: 'Why does scraping matter for accountability?',
              answerOutline: 'Outside audits of platforms often have no other way to collect evidence.',
            },
          ],
        },
        {
          slug: 'open-versus-restricted-data',
          title: 'Open versus restricted data',
          summary:
            'The case for openness, the case for restriction, and the tiers between them, with the genomics and Five Safes examples.',
          estimatedMinutes: 65,
          objectives: [
            'Give the strongest arguments for open and for restricted data',
            'Describe tiered access models',
            'Apply the Five Safes to a release',
            'Identify who is burdened by each option',
          ],
          concepts: [
            'Open data',
            'Restricted-use data',
            'Tiered access',
            'Five Safes',
            'Data use agreement',
            'Synthetic data',
            'Equity of access',
          ],
          explanation: `**The case for openness.** Open data allows checking, reuse and new discoveries, and it lets people without institutional ties take part. Public funding suggests public results. Replication depends on it. Restriction can also protect incumbents, and can hide errors.

**The case for restriction.** Some data cannot be made safe by removing names. Harm once released cannot be undone, since a published file cannot be recalled. Openness can also give well-resourced groups an advantage in using data collected from the less powerful.

**A case that shows the tension.** In 2008 Homer and colleagues showed that it was possible to tell whether an individual's DNA was in a study pool from published aggregate statistics. NIH responded by moving summary genomic data behind controlled access. It relaxed that policy in 2018 after reviewing the risks and costs. The lesson runs both ways: aggregates aren't automatically safe, and restriction has a real scientific cost that may later be judged too high.

Between open and closed lies a range:

- **Open**: anyone can download it.
- **Registered**: free, but with a named account and agreed terms.
- **Controlled**: approved projects under a data use agreement.
- **Enclave**: analysis inside a secure environment, and only checked results leave.

The **All of Us** programme, for example, uses public, registered and controlled tiers. Federal Statistical Research Data Centers run enclaves.

The **Five Safes** help to design this: safe projects, safe people, safe settings, safe data, safe outputs. A weakness in one can be offset by strength in another.

**Synthetic data** is often proposed as a way out. It can be useful for teaching and testing code. But good synthetic data can still leak information, and poor synthetic data misleads analysis, particularly for small groups. It needs the same evaluation as any other release.

**Who pays?** Restricted access costs applicants time and sometimes money, which excludes students and researchers from poorer institutions and countries. Enclaves are expensive to run. Open release passes the risk to data subjects, who were not asked. Whichever way you go, ask who carries the cost, and whether you can reduce it, for example with fee waivers or a synthetic version for early exploration.`,
          resources: [
            { title: 'What is the Five Safes framework?', url: 'https://ukdataservice.ac.uk/help/secure-lab/what-is-the-five-safes-framework/', type: 'documentation', cost: 'free', provider: 'UK Data Service', note: 'A short explanation with examples.', primary: true },
            { title: 'The FAIR Guiding Principles', url: 'https://www.nature.com/articles/sdata201618', type: 'article', cost: 'free', provider: 'Scientific Data', note: 'Note that FAIR does not mean open.' },
            { title: 'The Turing Way: Guide for Reproducible Research', url: 'https://book.the-turing-way.org/', type: 'textbook', cost: 'free', provider: 'The Turing Way Community', note: 'See the sections on open and sensitive data.' },
          ],
          exercises: [
            {
              slug: 'release-design',
              title: 'Design a tiered release',
              prompt:
                'A city has 10 years of 911 call records. Design a release with at least three tiers. For each, give the content, access rule, who approves, the training required and the cost to applicants. Apply the Five Safes, and identify one group for whom the design is hardest. Say what remains too risky to release at all.',
              kind: 'writing',
              difficulty: 2,
            },
            {
              slug: 'synthetic-check',
              title: 'Check a synthetic version',
              prompt:
                'From Adult, create a naive synthetic table by sampling each column independently from its marginal distribution, with a seed. Compare one-way distributions, then compare the income rate by race and sex with the real table. Report what survives and what is destroyed. Say whether this table has any privacy guarantee, and why its marginals could still reveal something.',
              kind: 'data-analysis',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What does the Homer result show about aggregates?',
              answerOutline: 'Summary statistics can reveal membership, so aggregation alone does not guarantee privacy.',
            },
            {
              question: 'Who bears the cost of restricted access?',
              answerOutline: 'Applicants, especially students and those at less-resourced institutions, plus those running the system.',
            },
            {
              question: 'Why is synthetic data not automatically safe?',
              answerOutline: 'Models can memorise records, and the utility or privacy has to be evaluated, particularly for small groups.',
            },
          ],
        },
      ],
    },
    {
      slug: 'sector-cases',
      title: 'Sector Cases',
      description:
        'Worked cases from healthcare, government and public services, companies, academia and nonprofits, each treating what is established, what is disputed and who carried the burden.',
      lessons: [
        {
          slug: 'healthcare',
          title: 'Healthcare',
          summary:
            'A sepsis model tested outside its developer, hospital data shared with DeepMind, and the question of evidence before deployment.',
          estimatedMinutes: 70,
          objectives: [
            'Evaluate a clinical model claim against external validation',
            'Analyse data sharing between a hospital and a technology company',
            'Identify clinical, privacy and workload burdens',
            'Separate established findings from disputed ones',
          ],
          concepts: [
            'External validation',
            'Alert fatigue',
            'Direct care versus secondary use',
            'Reasonable expectations',
            'Automation bias',
            'Dataset shift',
          ],
          explanation: `Healthcare combines the highest stakes with a strong case for data use: better prediction can save lives. That is why the arguments on both sides are serious.

**Epic Sepsis Model.** Sepsis kills quickly, so early warning has obvious value. Wong and colleagues (*JAMA Internal Medicine*, 2021) tested a widely used proprietary model at Michigan Medicine and reported an area under the curve of 0.63, well below the figures its developer had reported. It missed many cases, and it fired alerts for around 18 percent of hospitalised patients, which risks **alert fatigue**. **Established:** the external result at that site. **Disputed:** how general it is. Epic criticised aspects of the evaluation, and it later revised its model. A single-site study can't settle that. What the case does settle is the value of independent validation. A health system had been using a tool whose performance it could not fully inspect.

The burden in such a case falls on nurses who respond to alerts and on patients whose alarm is ignored because the last ten were false.

**Royal Free and DeepMind.** In 2015 London's Royal Free NHS Trust gave Google's DeepMind records on about 1.6 million patients to test an app, Streams, for acute kidney injury. In 2017 the UK Information Commissioner ruled that the Trust failed to comply with data protection law, in that patients would not have reasonably expected their records to be used this way. The Trust accepted the findings. The Commissioner did not stop the clinical use, and clinicians reported benefits. The issue was how a large data transfer was justified as direct care when most patients were not being treated for that condition.

**The health cost algorithm** (Module 3) is a third case, on labels. These three fail in different places: at validation, at data access, and at target definition.

**The case for moving faster.** Delays also cost lives. Some clinicians say that demanding prospective trials for every tool would freeze useful work and leave well-funded centres ahead. Asking "compared with what?" applies here as well. Current practice misses sepsis too.

Practical questions for any clinical model: who was it validated on, by whom? What does an alert cost? Who can override it? What happens when the population changes, as it did during COVID-19?`,
          resources: [
            { title: 'External Validation of a Widely Implemented Proprietary Sepsis Prediction Model', url: 'https://pubmed.ncbi.nlm.nih.gov/34152373/', type: 'article', cost: 'free', provider: 'JAMA Internal Medicine (PubMed record)', note: 'Wong et al. (2021).', primary: true },
            { title: 'ICO: Royal Free and Google DeepMind trial failed to comply with data protection law', url: 'https://ico.org.uk/about-the-ico/media-centre/news-and-blogs/2017/07/royal-free-google-deepmind-trial-failed-to-comply-with-data-protection-law/', type: 'documentation', cost: 'free', provider: 'UK Information Commissioner', note: 'The regulator statement. The site can refuse scripted requests, but it opens in a browser.' },
            { title: 'Dissecting racial bias in an algorithm used to manage the health of populations', url: 'https://pubmed.ncbi.nlm.nih.gov/31649194/', type: 'article', cost: 'free', provider: 'Science (PubMed record)' },
          ],
          exercises: [
            {
              slug: 'alert-arithmetic',
              title: 'What does an alert cost?',
              prompt:
                'A hospital has 200 inpatients a day, and 7 percent develop sepsis. A model flags 18 percent of patients with a sensitivity of 33 percent. Compute true and false alerts per day, positive predictive value and alerts per true case. If each alert takes a nurse 10 minutes, compute the nursing time per true case found. State your assumptions, and that these are illustrative numbers. Say what you would ask before deploying it.',
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'case-brief-health',
              title: 'Brief a health case',
              prompt:
                'Write a one-page brief on either case with the headings: what happened, established, disputed, who benefited, who carried the burden, what should have happened, and the best objection to your view. Cite primary sources where possible, and attribute claims about organisations.',
              kind: 'reading',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What does external validation show that internal validation does not?',
              answerOutline: 'Performance on data from another setting and on a population that the developer did not tune on.',
            },
            {
              question: 'In Royal Free and DeepMind, what was the core issue?',
              answerOutline: 'Whether the transfer of 1.6 million records was within patients\' reasonable expectations and had a sound legal basis.',
            },
            {
              question: 'Who bears the cost of a high false alarm rate?',
              answerOutline: 'Nurses, in workload, and patients, through ignored alarms and delayed care.',
            },
          ],
        },
        {
          slug: 'government-and-public-services',
          title: 'Government and public services',
          summary:
            'Robodebt, the Dutch childcare benefits scandal and the Allegheny screening tool: when the state automates decisions about people with few alternatives.',
          estimatedMinutes: 75,
          objectives: [
            'Explain the failures in Robodebt and the Dutch benefits case',
            'Argue both sides of predictive child welfare screening',
            'Explain why public-sector errors carry special weight',
            'Identify the role of reversed burden of proof',
          ],
          concepts: [
            'Automated debt raising',
            'Reversed burden of proof',
            'Risk profiling',
            'Nationality as a feature',
            'Administrative justice',
            'Predictive risk modelling',
          ],
          explanation: `People cannot opt out of their government, and those in contact with welfare or child protection have the least power to contest a decision. So errors here weigh more.

**Robodebt (Australia, 2016 to 2019).** The Centrelink income compliance scheme compared welfare payments with annual tax office income, averaged across fortnights. Yet income support depends on actual fortnightly income, so averaging produced false debts for people with irregular work. The burden of proof shifted to recipients to disprove a debt. A court ruled the averaging method unlawful in 2019, the government settled a class action, and a Royal Commission reported in 2023 that it was "a crude and cruel mechanism", while evidence described people in despair, including suicides reported by families. This was a failure of arithmetic, law and institutions together. Debts were issued at a scale no manual process could have reached.

**Toeslagenaffaire (Netherlands).** Dutch tax authorities treated thousands of families as fraudsters over childcare benefits, in some cases for minor errors, and demanded large repayments. Risk classification used nationality as a factor, according to Amnesty International's *Xenophobic Machines* and the Dutch data protection authority, which fined the tax administration. The government resigned in January 2021. Parents of immigrant backgrounds carried a disproportionate share of the burden.

**Allegheny Family Screening Tool.** In this Pennsylvania county, a model helps call screeners decide which child-neglect reports to investigate. The county commissioned independent evaluations, published methods, and did not use race as a feature. Supporters, including authors of the tool, argue that it is more transparent than a screener's judgement and helps with an overload of cases. Eubanks, in *Automating Inequality*, argues that it uses public-service records, so it effectively measures poverty, since families using public services have more data. Chouldechova and colleagues (2018) analysed the tool and described both its value and its limits. Both accounts agree on many facts, and disagree on what they mean.

Patterns recur: treating an automated output as a fact, moving the burden of proof to the citizen, little appeal, and pressure to save money. Questions for any public system: is it lawful, is it disclosed, can a person see and contest the decision, and what happens to someone wrongly flagged while the appeal runs?`,
          resources: [
            { title: 'Robodebt scheme', url: 'https://en.wikipedia.org/wiki/Robodebt_scheme', type: 'article', cost: 'free', provider: 'Wikipedia', note: 'A timeline with links to the Royal Commission report. Read that report for anything you cite.', primary: true },
            { title: 'Xenophobic Machines', url: 'https://www.amnesty.org/en/documents/eur35/4686/2021/en/', type: 'article', cost: 'free', provider: 'Amnesty International', note: 'An advocacy report on the Dutch scandal.' },
            { title: 'A case study of algorithm-assisted decision making in child maltreatment hotline screening decisions', url: 'https://proceedings.mlr.press/v81/chouldechova18a.html', type: 'article', cost: 'free', provider: 'Proceedings of Machine Learning Research', note: 'Chouldechova et al. (2018) on the Allegheny tool.' },
          ],
          exercises: [
            {
              slug: 'averaging-bug',
              title: 'Reproduce the averaging error',
              prompt:
                'Invent a worker who earned 2,600 in 4 of 26 fortnights and nothing in the rest, and who received income support in the zero fortnights. Use a rule that support is reduced only when income in that fortnight exceeds 450. Compute what was owed with true fortnightly income, then with annual income averaged equally across fortnights. Show the false debt. Explain which assumption failed, using these invented numbers rather than the real rate.',
              kind: 'coding',
              difficulty: 1,
            },
            {
              slug: 'allegheny-debate',
              title: 'Argue Allegheny both ways',
              prompt:
                'Write 200 words for keeping the Allegheny tool, and 200 against, each drawing on published sources. Then say what evidence would change your own view. State which facts both sides agree on.',
              kind: 'writing',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What was the arithmetic error at the centre of Robodebt?',
              answerOutline: 'Averaging annual income over fortnights, though entitlement depended on actual fortnightly income.',
            },
            {
              question: 'What does reversing the burden of proof do?',
              answerOutline: 'It makes the person disprove an automated finding, and moves the cost of error onto those least able to carry it.',
            },
            {
              question: 'What do both sides in the Allegheny debate accept, and where do they differ?',
              answerOutline: 'That screeners are overloaded, and that the model uses administrative data. They differ on whether that data measures risk or poverty, and on whether the tool is an improvement.',
            },
          ],
        },
        {
          slug: 'companies',
          title: 'Companies',
          summary:
            'Face recognition in stores, a famous pregnancy prediction story, and the hidden labour that makes AI possible.',
          estimatedMinutes: 70,
          objectives: [
            'Analyse a regulator\'s action against a company',
            'Separate a well-known story from what can be verified',
            'Identify labour as a burden in the data supply chain',
            'Explain how commercial incentives shape data practice',
          ],
          concepts: [
            'Unfair practices',
            'False matches',
            'Inference from purchases',
            'Data annotation labour',
            'Incentives',
            'Reputational versus regulatory risk',
          ],
          explanation: `Companies gain from data at scale, and competition pushes them to move quickly. Good people work in them, and incentives still matter.

**Rite Aid.** In December 2023 the US Federal Trade Commission announced action against the pharmacy chain over its use of face recognition in stores. The FTC alleged that the system flagged customers, disproportionately women and people of colour, as potential shoplifters, with many false matches and inadequate safeguards. Under the settlement, Rite Aid agreed to a five-year ban on using face recognition for security. It said it disagreed with the allegations. These are allegations resolved by settlement, not findings after trial. The burden fell on customers who were followed, confronted or humiliated in front of others, often in their own neighbourhood store.

**Target and pregnancy.** In 2012 Charles Duhigg of the New York Times told of a Target model that predicted pregnancy from purchases, and of a father who learned of his daughter's pregnancy through coupons. **What is established:** retailers build such models, and Target's statistician described the approach. **What is doubtful:** the father anecdote comes from one source, and it has been questioned. Use it as an illustration of inference, not as evidence. A surprising story that spreads widely deserves more checking, not less.

**Hidden labour.** Models depend on people who label data and review harmful content. TIME reported in 2023 that Kenyan workers contracted through Sama to label toxic text for OpenAI were paid under 2 dollars an hour, and some described lasting psychological harm. Sama disputed aspects of the reporting, and OpenAI said that it took worker wellbeing seriously. Whatever one's view of the details, the structure is clear: the cost of cleaner products is carried by low-paid workers far from the customers who benefit.

**Incentives.** A product team is measured on engagement or revenue. Harm usually appears elsewhere, later, and is hard to measure. Internal ethics teams can be real or decorative, and an honest test is whether they have ever stopped something. In the other direction, firms do respond to regulation, litigation, customers and employees, and some invest heavily in safety because reputational harm is expensive. Do not assume bad faith, and do not assume good faith. Look at what a company measures, funds and reports.`,
          resources: [
            { title: 'A Framework for Understanding Sources of Harm throughout the Machine Learning Life Cycle', url: 'https://arxiv.org/abs/1901.10002', type: 'article', cost: 'free', provider: 'Suresh and Guttag', note: 'Use it to locate where each company case went wrong.', primary: true },
            { title: 'NIST AI Risk Management Framework', url: 'https://www.nist.gov/itl/ai-risk-management-framework', type: 'documentation', cost: 'free', provider: 'US NIST', note: 'A structure firms can adopt voluntarily.' },
            { title: 'Data & Society', url: 'https://datasociety.net/', type: 'article', cost: 'free', provider: 'Data & Society Research Institute', note: 'Reports on data work and labour.' },
          ],
          exercises: [
            {
              slug: 'check-a-famous-story',
              title: 'Check a famous story',
              prompt:
                'Choose a widely repeated data ethics anecdote, such as the Target pregnancy story. Trace it to its original source. Who said what, and what is the evidence? Who has challenged it? Write a one-paragraph version that you could defend, stating what is known, and how you would use the story in a class.',
              kind: 'reading',
              difficulty: 2,
            },
            {
              slug: 'false-match-base-rates',
              title: 'False matches at store scale',
              prompt:
                'A store chain scans 2 million customer visits per week against a watchlist. Suppose 200 visits involve someone truly on the list, the system finds 90 percent of them, and its false match rate is 1 in 10,000. Compute weekly true and false alerts and the share of alerts that are wrong. Show how the share changes if the false match rate is three times higher for one group that makes up 20 percent of visits. These are illustrative numbers.',
              kind: 'problem',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'Why word the Rite Aid case as allegations?',
              answerOutline: 'It ended in a settlement without a trial, and the company disputed the allegations.',
            },
            {
              question: 'How should you treat a viral anecdote about data?',
              answerOutline: 'Trace it to a primary source, say what is verified, and use it as an illustration rather than as evidence.',
            },
            {
              question: 'Who carries the cost of cleaner AI output?',
              answerOutline: 'Often low-paid data workers exposed to harmful content.',
            },
          ],
        },
        {
          slug: 'academia',
          title: 'Academia',
          summary:
            'Data that could not be verified, face datasets that outlived their purpose, and predicting which students will fail.',
          estimatedMinutes: 65,
          objectives: [
            'Explain how the Surgisphere retractions happened',
            'Analyse the afterlife of a research dataset',
            'Weigh benefits and risks of learning analytics',
            'Propose verification and stewardship practices',
          ],
          concepts: [
            'Data provenance in publishing',
            'Retraction',
            'Dataset stewardship',
            'Dataset retirement',
            'Learning analytics',
            'Students as data subjects',
          ],
          explanation: `Universities run on trust, and they also hold a lot of data about people who cannot easily refuse.

**Surgisphere.** In May 2020 *The Lancet* published a study on hydroxychloroquine, and *NEJM* one on heart medication, both relying on patient data from a small company, Surgisphere, purportedly covering hundreds of hospitals. Readers noticed implausible numbers. When independent reviewers asked for the underlying data, the company did not supply it, three authors asked for the *Lancet* paper's retraction, and both papers were retracted in June 2020. Meanwhile the World Health Organization had paused a trial arm. The company said its data agreements prevented sharing. Nobody but the company had seen the data, so **nobody could check it**. Journals then tightened their rules. A trial can pause, and patients can be affected, because of a provenance failure.

**Face datasets.** Peng, Mathur and Narayanan (2021) studied three prominent face datasets and how they spread through 1,000 papers. Microsoft's MS-Celeb-1M was withdrawn, and Duke's DukeMTMC too, yet derived versions, copies and pretrained models continued in use, often without the original terms. Harvey and LaPlace's Exposing.ai documented where photos came from. People whose faces were used were mostly unaware. The authors propose **stewardship** throughout a dataset's life. Retirement rarely works once a dataset has spread.

**Learning analytics.** Purdue's Course Signals and Georgia State's advising system use data to identify struggling students. Georgia State has reported gains in graduation, though attributing this to analytics alone is hard, as many things changed. Purdue's claimed retention effect was later challenged as a statistical artefact, because students who stayed longer took more courses, and thus more Signals courses. Benefits are plausible and worth wanting. The risks are also real: labelling students, steering them away from hard majors, and using race as a risk factor, as The Markup reported in 2021 of some advising software. Students rarely have a choice, and the institution holds power over grades and degrees.

Academic norms may help or hurt. Pressure to publish rewards large datasets and fast results, and open science rewards sharing, while stewardship is hardly rewarded at all.

Practical measures include independent access to underlying data for key claims, licences and tracking for datasets, and students on data governance committees.`,
          resources: [
            { title: 'Mitigating Dataset Harms Requires Stewardship', url: 'https://arxiv.org/abs/2108.02922', type: 'article', cost: 'free', provider: 'Peng, Mathur and Narayanan', note: 'Lessons from 1,000 papers.', primary: true },
            { title: 'Exposing.ai', url: 'https://exposing.ai/', type: 'article', cost: 'free', provider: 'Harvey and LaPlace', note: 'Investigations of face image datasets.' },
            { title: 'Surgisphere', url: 'https://en.wikipedia.org/wiki/Surgisphere', type: 'article', cost: 'free', provider: 'Wikipedia', note: 'A timeline and pointers to the journals\' retraction notices. Read those notices for anything you cite.' },
          ],
          exercises: [
            {
              slug: 'verification-policy',
              title: 'A verification policy',
              prompt:
                'Write a one-page policy for a journal: what evidence of data provenance must authors supply when data comes from a private vendor that cannot share it? Consider independent audit, escrow, and access for reviewers. Who pays, and which authors would your policy hurt? Explain how your policy would have treated the Surgisphere papers.',
              kind: 'writing',
              difficulty: 2,
            },
            {
              slug: 'retention-simulation',
              title: 'Simulate the course-count artefact',
              prompt:
                'Simulate 10,000 students who each take courses until they drop out, where one course in five uses a support system with no real effect. Show that students with more exposure appear to be retained better. Fix the seed, and report the size of the false effect. Explain what comparison would avoid the artefact.',
              kind: 'simulation',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'What failed in Surgisphere?',
              answerOutline: 'Nobody independent could access or verify the data underlying published claims.',
            },
            {
              question: 'Why does withdrawing a dataset often fail?',
              answerOutline: 'Copies, derivatives and pretrained models remain in circulation.',
            },
            {
              question: 'What is the power problem in learning analytics?',
              answerOutline: 'Students depend on the institution that holds the data, so they have little real choice.',
            },
          ],
        },
        {
          slug: 'nonprofits',
          title: 'Nonprofits',
          summary:
            'Crisis Text Line, refugee biometrics and the particular ethics of doing good with data about people who have few options.',
          estimatedMinutes: 60,
          objectives: [
            'Analyse the Crisis Text Line and Loris.ai case',
            'Present both accounts of the UNHCR Rohingya data dispute',
            'Explain why good intentions do not settle ethical questions',
            'Identify constraints facing small organisations',
          ],
          concepts: [
            'Humanitarian data',
            'Do no harm',
            'Power asymmetry',
            'Mission creep',
            'Sustainability pressure',
            'Consent under duress',
            'Capacity constraints',
          ],
          explanation: `Nonprofits usually mean well, and they often serve people with the fewest options. That raises the stakes, since a person in crisis or in a refugee camp is not in a position to bargain over terms.

**Crisis Text Line.** This mental health text service spun off a for-profit company, Loris.ai, which used anonymised conversation data to build customer service software. *Politico* reported this in January 2022. The nonprofit said data was anonymised and that revenue would support its mission. Volunteers, researchers and regulators raised concern. Within days, Crisis Text Line said that it had ended the data-sharing arrangement, and that it would ask Loris to delete what it held. Note the mechanism. The terms may have disclosed the use, but could someone texting a crisis line meaningfully agree? The pressure was financial: helplines need funding, and data looked like an asset.

**UNHCR and the Rohingya.** In June 2021 Human Rights Watch said that UNHCR had collected data on Rohingya refugees in Bangladesh for ID cards, and shared it with Bangladesh, which passed it to Myanmar, the country they had fled, for repatriation assessment. HRW said that many of those it interviewed did not understand that their data could be sent to Myanmar. UNHCR rejected the allegation, saying it explained the purposes, sought specific consent for sharing with Myanmar, and that families who declined were still registered and received the same services. These accounts conflict, and neither should be reported as simple fact. Both can be partly true: consent procedures can exist, while consent under those conditions remains questionable. Biometric data can't be changed afterwards, and the people concerned have reason to fear the state receiving it.

**Constraints are real.** A small charity has no privacy office. Funders ask for outcome data, and sometimes individual-level data, and that can push collection beyond need. Compliance rules designed for big firms can be heavy. Humanitarian workers need to deliver aid quickly, and registration can prevent fraud and ensure food reaches those entitled to it.

Practical principles: collect the minimum, because data not collected cannot be seized. Think through the worst realistic recipient of the data, including future governments. Don't monetise data from people in need without an extraordinary reason. Ask funders to accept aggregates. Good intentions don't reduce the harm of a breach.`,
          resources: [
            { title: 'UN Shared Rohingya Data Without Informed Consent', url: 'https://www.hrw.org/news/2021/06/15/un-shared-rohingya-data-without-informed-consent', type: 'article', cost: 'free', provider: 'Human Rights Watch', note: 'One side of the dispute. Look for UNHCR\'s published response too.', primary: true },
            { title: 'Crisis Text Line', url: 'https://en.wikipedia.org/wiki/Crisis_Text_Line', type: 'article', cost: 'free', provider: 'Wikipedia', note: 'A summary with citations to the original reporting and the organisation\'s statements.' },
            { title: 'NIST Privacy Framework', url: 'https://www.nist.gov/privacy-framework', type: 'documentation', cost: 'free', provider: 'US NIST', note: 'Scalable to small organisations.' },
          ],
          exercises: [
            {
              slug: 'worst-recipient',
              title: 'The worst realistic recipient',
              prompt:
                'A food bank wants a database of clients with name, address, family size and immigration status. For each field, say why it might be useful, who could later demand or steal it, and what could happen to clients. Redesign the data collection to reach the same goal with less. Say what the food bank loses, including with its funders.',
              kind: 'writing',
              difficulty: 1,
            },
            {
              slug: 'two-accounts',
              title: 'Report two conflicting accounts',
              prompt:
                'Find both the HRW report and UNHCR\'s response. Write 200 words that a neutral reader would find fair, attributing each claim. List three questions that neither source answers. Say what evidence would resolve each one, and whether seeking it could put people at risk.',
              kind: 'reading',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why is consent especially weak in crisis or humanitarian settings?',
              answerOutline: 'People depend on the service, so refusal may feel impossible, and they have little power or information.',
            },
            {
              question: 'How should the UNHCR dispute be reported?',
              answerOutline: 'As conflicting accounts, attributed to HRW and UNHCR, without stating either as settled fact.',
            },
            {
              question: 'Why is data minimisation especially strong for vulnerable groups?',
              answerOutline: 'Data that does not exist cannot be seized, leaked or sold, and harms can be severe and irreversible.',
            },
          ],
        },
      ],
    },
    {
      slug: 'policy-responses',
      title: 'Policy Responses',
      description:
        'How organisations and law respond: internal governance, HIPAA and FERPA, state privacy law including Illinois BIPA, the GDPR and the EU AI Act. All law is stated as of 2 November 2026. This is education, not legal advice.',
      lessons: [
        {
          slug: 'organisational-governance',
          title: 'Organisational governance',
          summary:
            'Risk frameworks, impact assessments, model cards and datasheets, and how to tell governance from theatre.',
          estimatedMinutes: 70,
          objectives: [
            'Describe the NIST AI RMF functions and the NIST Privacy Framework',
            'Write a model card or a datasheet for a dataset',
            'Run a basic data protection impact assessment',
            'Test whether a governance process has real power',
          ],
          concepts: [
            'NIST AI Risk Management Framework',
            'Govern, Map, Measure, Manage',
            'Impact assessment',
            'Model cards',
            'Datasheets for datasets',
            'Ethics washing',
            'Escalation and stop authority',
          ],
          explanation: `Before law applies, organisations decide what to do through policy. Much of this is voluntary, and its value depends on whether it changes decisions.

**Frameworks.** The **NIST AI Risk Management Framework** (version 1.0, 2023) has four functions: **Govern** (culture, roles, accountability), **Map** (context and affected people), **Measure** (assess risks) and **Manage** (prioritise and respond). The **NIST Privacy Framework** does similar work for privacy risks. Both are voluntary in the US, though contracts or sector rules may refer to them.

**Documentation.** **Model cards** (Mitchell and colleagues, 2019) record a model's intended use, data, performance by group and limits. **Datasheets for datasets** (Gebru and colleagues, 2021) ask how a dataset was made, by whom, for what, with what consent, and what it should not be used for. Their value is partly that writing them forces people to ask.

**Impact assessments.** A data protection impact assessment describes a processing activity, tests whether it is needed and proportionate, identifies risks to people, and sets out mitigations. The GDPR requires one for high-risk processing, and many organisations use the method voluntarily. A good one is written before the build, is revisited, and can change the design.

**Who decides?** Useful structures name an accountable owner, set a path for raising concerns, and include people outside the delivery team. They also include those affected, where that can be done.

**Governance or theatre?** "Ethics washing" means using ethics language to avoid scrutiny or regulation. Test any process with some plain questions:

- Has it ever stopped or changed a launch?
- Can it see the real product data?
- Who can overrule it, and is that recorded?
- Are staff safe when they raise a concern?
- Does it publish anything?

There are costs on the other side too. Heavy process can slow useful work, and it falls hardest on small organisations with no specialists. Scale the process to the risk. A tiered approach, with a short screen for low-risk work and full review for high-risk work, is usually a better answer than one form for everything. Who fills in the form is itself a burden question, and it should not be the most junior person with no authority to act on the result.`,
          resources: [
            { title: 'NIST AI Risk Management Framework', url: 'https://www.nist.gov/itl/ai-risk-management-framework', type: 'documentation', cost: 'free', provider: 'US NIST', note: 'Links to the framework and the Playbook.', primary: true },
            { title: 'Model Cards for Model Reporting', url: 'https://arxiv.org/abs/1810.03993', type: 'article', cost: 'free', provider: 'Mitchell et al.' },
            { title: 'Datasheets for Datasets', url: 'https://arxiv.org/abs/1803.09010', type: 'article', cost: 'free', provider: 'Gebru et al.' },
          ],
          relatedLessons: ['machine-learning/ml-engineering/deployment-monitoring-and-fairness'],
          exercises: [
            {
              slug: 'write-a-datasheet',
              title: 'Write a datasheet',
              prompt:
                'Write a datasheet for the UCI Adult dataset using the questions in Gebru et al. Answer from public documentation only, and mark what cannot be answered. Add a "should not be used for" section. Identify the three missing facts that most limit fair use of this dataset in 2026.',
              kind: 'writing',
              difficulty: 2,
            },
            {
              slug: 'governance-test',
              title: 'Test a real governance claim',
              prompt:
                'Find a published responsible AI or data ethics statement from a company, university or government agency. Apply the five questions above, using public evidence only. Say what you could not determine. Write a fair one-page assessment that gives credit for what is real.',
              kind: 'reading',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What are the four functions of the NIST AI RMF?',
              answerOutline: 'Govern, Map, Measure and Manage.',
            },
            {
              question: 'What makes an impact assessment useful rather than ceremonial?',
              answerOutline: 'It is done early, can change the design and is revisited.',
            },
            {
              question: 'Give one question that separates governance from theatre.',
              answerOutline: 'Has the process ever stopped or changed a launch?',
            },
          ],
        },
        {
          slug: 'us-sector-law',
          title: 'US sector law: HIPAA and FERPA',
          summary:
            'The US regulates by sector. What HIPAA and FERPA cover, how each treats de-identification, and the gaps they leave.',
          estimatedMinutes: 85,
          objectives: [
            'State who and what HIPAA and FERPA cover',
            'Apply HIPAA Safe Harbor and explain Expert Determination',
            'Explain the FERPA test for personally identifiable information',
            'Identify health and student data that falls outside both',
          ],
          concepts: [
            'Covered entities and business associates',
            'Protected health information',
            'Safe Harbor',
            'Expert Determination',
            'Education records',
            'School official exception',
            'FERPA de-identification',
            'Sectoral gaps',
          ],
          explanation: `Stated as of 2 November 2026. This is education, not legal advice. The US has no general federal privacy statute. It regulates by sector, which leaves gaps.

**HIPAA.** The Privacy Rule applies to **covered entities** (health plans, clearinghouses and most healthcare providers) and their **business associates**. It does not follow health data everywhere: a period-tracking app or a smartwatch company is generally outside it, although the Federal Trade Commission may act. Under 45 CFR 164.514, there are two routes to de-identification.

- **Expert Determination** (b)(1): a qualified person finds that the risk of identification is very small and documents the method.
- **Safe Harbor** (b)(2): remove 18 listed identifiers, and have no actual knowledge that the remainder could identify someone. These include names, geographic units smaller than a state (the first three ZIP digits may stay if the area holds over 20,000 people), all date elements except year, and ages over 89.

Safe Harbor is simple and legally clear, yet it can leave re-identification risk or destroy research value. A proposed overhaul of the HIPAA **Security Rule** was published in January 2025 and, as far as could be confirmed, has not been finalised. Press reports of the regulatory agenda point to mid-2027 at the earliest.

**FERPA.** The Family Educational Rights and Privacy Act, 20 U.S.C. 1232g with rules at 34 CFR Part 99, applies to schools receiving US Department of Education funds. It gives parents, or **eligible students** (18 or in postsecondary education), rights to inspect and correct records, and generally requires written consent to disclose personally identifiable information. Exceptions in 34 CFR 99.31 include **school officials** with a legitimate educational interest, certain studies, and audits. Under 34 CFR 99.3, personally identifiable information includes information that would let **a reasonable person in the school community**, without personal knowledge of the circumstances, identify a student with reasonable certainty. So small-cell tables can be a problem: "the one student in this class who failed". Records properly de-identified under 99.31(b) can be released.

FERPA's remedy is administrative, through the Department of Education. The Supreme Court held in *Gonzaga University v. Doe* (2002) that individuals cannot sue under it to enforce its rights through Section 1983.

**Gaps.** Consumer health apps, browsing data, data brokers and much education technology get incomplete answers from these laws, because sector rules depend on who holds data, not what it reveals.`,
          resources: [
            { title: '45 CFR 164.514', url: 'https://www.law.cornell.edu/cfr/text/45/164.514', type: 'documentation', cost: 'free', provider: 'Legal Information Institute', note: 'The de-identification rule. Read (a) and (b).', primary: true },
            { title: 'FERPA', url: 'https://studentprivacy.ed.gov/ferpa', type: 'documentation', cost: 'free', provider: 'US Department of Education', note: 'The official text and guidance.' },
            { title: '34 CFR 99.3: definitions', url: 'https://www.law.cornell.edu/cfr/text/34/99.3', type: 'documentation', cost: 'free', provider: 'Legal Information Institute', note: 'See personally identifiable information.' },
            { title: '34 CFR 99.31: disclosure without consent', url: 'https://www.law.cornell.edu/cfr/text/34/99.31', type: 'documentation', cost: 'free', provider: 'Legal Information Institute' },
          ],
          exercises: [
            {
              slug: 'safe-harbor-on-invented-data',
              title: 'Apply Safe Harbor to invented records',
              prompt:
                'Invent 10 hospital records with name, date of birth, admission date, full ZIP, age, diagnosis and a free-text note. Write code that applies the listed Safe Harbor steps that it can. Keep ZIP3 only when told it qualifies, change dates to years, and group ages over 89. Explain why the free-text note is the hardest field, and why passing Safe Harbor does not mean there is no risk.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'small-cell-ferpa',
              title: 'A small-cell check for grades',
              prompt:
                'Create an invented table of pass rates by course section and demographic group. Write a function that suppresses any cell with fewer than 10 students, and any complementary cell that would let someone recover it from row totals. Show one case where suppressing a single cell is not enough. Say how the FERPA "reasonable person" test relates to your threshold, and that 10 is a common convention rather than a legal number.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Is a consumer fitness app generally covered by HIPAA?',
              answerOutline: 'Generally not, unless it acts for a covered entity. HIPAA follows the holder, not the type of data.',
            },
            {
              question: 'What are the two HIPAA de-identification methods?',
              answerOutline: 'Expert Determination and Safe Harbor.',
            },
            {
              question: 'What is FERPA\'s test for indirect identification?',
              answerOutline: 'Whether a reasonable person in the school community, without personal knowledge of the circumstances, could identify the student with reasonable certainty.',
            },
          ],
        },
        {
          slug: 'state-privacy-law-and-illinois-bipa',
          title: 'State privacy law and Illinois BIPA',
          summary:
            'The patchwork of state laws, Illinois\' Biometric Information Privacy Act and its 2024 amendment, and Illinois and Colorado rules on AI.',
          estimatedMinutes: 85,
          objectives: [
            'Describe the shape of comprehensive state privacy laws as of a date',
            'State what BIPA requires, and its private right of action',
            'Explain Cothron, the 2024 amendment and Clay',
            'Summarise AI rules in Illinois and Colorado, and their status',
          ],
          concepts: [
            'Comprehensive state privacy laws',
            'California Consumer Privacy Act',
            'Biometric Information Privacy Act',
            'Private right of action',
            'Per-scan and per-person damages',
            'Illinois Human Rights Act and AI',
            'Colorado SB 26-189',
          ],
          explanation: `Stated as of 2 November 2026. This is education, not legal advice. Verify it.

**The patchwork.** California went first with its Consumer Privacy Act. An October 2026 law firm alert counted **24** comprehensive state laws enacted, including four from 2026 that take effect in 2027 or 2028. They usually give rights to access, delete and opt out of sale and targeted advertising, and are mostly enforced by state attorneys general. **Illinois has no comprehensive consumer privacy law** on the lists checked.

**BIPA.** The Biometric Information Privacy Act, 740 ILCS 14, dates from 2008. For biometric identifiers such as fingerprints and face geometry, Section 15 requires a public retention policy, written notice and a **written release** before collection, bans profiting from such data, and limits disclosure. Section 20 gives a **private right of action**, with liquidated damages of 1,000 dollars per negligent violation and 5,000 per intentional or reckless one.

Three decisions shaped it. *Rosenbach v. Six Flags* (Ill. 2019): no harm beyond the violation is needed. *Tims v. Black Horse Carriers* (Ill. 2023): a five-year limitation period. *Cothron v. White Castle* (Ill. 2023): a claim accrues with **each scan**. White Castle estimated its exposure at over 17 billion dollars, and the court invited the legislature to act.

**The 2024 amendment.** Public Act 103-0769 (SB 2979), effective 2 August 2024, provides that repeated collection of the same identifier from the same person by the same method is one violation, with at most one recovery. It also allows electronic signatures for a written release.

**Clay.** Courts split on earlier conduct. In *Clay v. Union Pacific Railroad* (7th Cir., 1 April 2026), the Seventh Circuit held that the amendment applies to pending cases, as a remedial change. That binds federal courts in the circuit, but it only predicts Illinois law. No Illinois Supreme Court ruling on the point was found, and state courts may differ.

**AI.** Illinois Public Act 103-0804 (HB 3773) amended the Human Rights Act, effective 1 January 2026, covering AI in employment decisions, with a notice duty and a ban on discriminatory effect. Proposed rules were withdrawn in June 2026, with no replacement found. Colorado's 2024 AI Act never took effect: SB 26-189, signed in May 2026, replaced it with a narrower law effective **1 January 2027**.

**Who carries the burden?** Private suits let individuals enforce rights, yet defendants include small employers using time clocks, so views on BIPA differ.`,
          resources: [
            { title: 'Seventh Circuit holds that BIPA amendment applies retroactively', url: 'https://www.insideprivacy.com/data-privacy/seventh-circuit-holds-that-bipa-amendment-applies-retroactively/', type: 'article', cost: 'free', provider: 'Covington, Inside Privacy', note: 'A law firm summary of Clay. Read the statute itself at 740 ILCS 14 on the Illinois General Assembly site.', primary: true },
            { title: 'California Consumer Privacy Act', url: 'https://oag.ca.gov/privacy/ccpa', type: 'documentation', cost: 'free', provider: 'California Attorney General', note: 'A plain-language guide to the state\'s rights.' },
            { title: 'California Privacy Protection Agency', url: 'https://cppa.ca.gov/', type: 'documentation', cost: 'free', provider: 'State of California' },
            { title: 'US state privacy legislation tracker', url: 'https://iapp.org/resources/article/us-state-privacy-legislation-tracker/', type: 'documentation', cost: 'free', provider: 'IAPP', note: 'Use this to check the current count.' },
          ],
          exercises: [
            {
              slug: 'bipa-exposure-math',
              title: 'What the 2024 amendment changed',
              prompt:
                'An employer has 50 workers who each clock in by fingerprint twice a day for 250 days, with no written release. Compute the theoretical liquidated damages at 1,000 dollars per violation under a per-scan reading, and under one recovery per person. Then explain why damages are discretionary, as *Cothron* noted, why this is arithmetic and not a prediction, and which reading applies to which conduct under the cases above, with what uncertainty.',
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'bipa-compliance-sketch',
              title: 'Design a biometric time clock policy',
              prompt:
                'For an invented Illinois employer, draft a one-page outline of what a biometric programme would need under Section 15: retention schedule, notice, written release, security and limits on disclosure. List the questions for counsel. Then compare it with an alternative that collects no biometrics, and say who gains and who loses from each.',
              kind: 'writing',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What makes BIPA unusual among state privacy laws?',
              answerOutline: 'Its private right of action with liquidated damages, without a need to prove actual harm.',
            },
            {
              question: 'What did the 2024 amendment change, and what did Clay add?',
              answerOutline: 'One recovery per person for repeated collection of the same identifier by the same method. Clay held in the Seventh Circuit that this applies to pending cases.',
            },
            {
              question: 'Why state a date with each legal claim in this lesson?',
              answerOutline: 'Laws, cases and agency rules here changed repeatedly in 2024 to 2026 and may change again.',
            },
          ],
        },
        {
          slug: 'gdpr',
          title: 'The GDPR',
          summary:
            'The EU\'s general data protection law: personal data, lawful bases, rights, automated decisions, fines, and current pressure to change it.',
          estimatedMinutes: 85,
          objectives: [
            'State when the GDPR applies and what counts as personal data',
            'Name the lawful bases and the principles',
            'Explain data subject rights, including on automated decisions',
            'Describe recent developments and label their status',
          ],
          concepts: [
            'Personal data',
            'Identifiability and Recital 26',
            'Pseudonymisation versus anonymisation',
            'Lawful bases',
            'Special categories',
            'Article 22',
            'Controllers and processors',
            'Digital Omnibus',
          ],
          explanation: `Stated as of 2 November 2026. This is education, not legal advice.

The **General Data Protection Regulation** (EU 2016/679) has applied since 25 May 2018. It reaches organisations established in the EU, and those elsewhere that offer goods or services to people in the EU, or monitor their behaviour there (Article 3).

**Personal data** is any information relating to an identified or identifiable person (Article 4). **Recital 26** says to consider all the means reasonably likely to be used to identify someone, by the controller or another person. Truly anonymous data is outside the law, while pseudonymised data generally remains personal data. In *EDPS v SRB* (C-413/23 P, 4 September 2025), the Court of Justice took a more relative view: pseudonymised data may not be personal data for a recipient who has no realistic means of re-identifying people, though it remains personal for the controller holding the key. Commentators disagree on how far this goes.

**Principles** (Article 5): lawfulness, fairness and transparency; purpose limitation; data minimisation; accuracy; storage limitation; integrity and confidentiality; accountability. Each responds to a failure you have studied.

Processing needs one of six **lawful bases** (Article 6): consent, contract, legal obligation, vital interests, public task or legitimate interests. Consent is therefore not the only route, and is often not the best one. **Special categories** such as health, biometrics for identification, race and religion need a further condition (Article 9).

**Rights** include access, rectification, erasure, restriction, portability and objection. **Article 22** gives a right not to be subject to a decision based solely on automated processing with legal or similarly significant effects, subject to exceptions and safeguards. Research has a partial exemption in Article 89, with safeguards.

**Enforcement.** The higher tier of fines reaches 20 million euros or 4 percent of worldwide annual turnover, whichever is higher (Article 83). Regulators have imposed large fines, while critics note that many cases proceed slowly, and that burdens on small organisations may be heavy.

**Status of reform.** The Commission proposed a Digital Omnibus in November 2025 that would, among other things, change the definition of personal data. Data protection authorities objected, and reports say that Council drafts dropped the redefinition. A late October 2026 report says the Council has adopted a negotiating position. **No amendment to the GDPR through that proposal was found to have been adopted on the date of writing.** Check the current status.`,
          resources: [
            { title: 'GDPR text', url: 'https://gdpr-info.eu/', type: 'documentation', cost: 'free', provider: 'gdpr-info.eu', note: 'A convenient unofficial layout. The official text is Regulation (EU) 2016/679 on EUR-Lex.', primary: true },
            { title: 'European Data Protection Board', url: 'https://www.edpb.europa.eu/edpb_en', type: 'documentation', cost: 'free', provider: 'EDPB', note: 'Official guidelines from EU regulators.' },
          ],
          exercises: [
            {
              slug: 'lawful-basis-table',
              title: 'Choose a lawful basis',
              prompt:
                'For each activity by an invented EU company, say which lawful basis might fit and why, whether Article 9 is involved, and whether a data protection impact assessment seems to be needed: payroll, marketing emails, fraud detection, training a model on customer support chats, and collecting health data for a wellness scheme. State your uncertainty, and what you would ask a data protection officer.',
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'article-22-case',
              title: 'An Article 22 walk-through',
              prompt:
                'A bank automatically rejects loan applications below a score. Work through whether Article 22 applies, which exceptions might be used, and what safeguards are needed. Then compare it with a process in which staff approve 99.9 percent of what the model recommends. Argue whether that is really human involvement, and who carries the burden in each design.',
              kind: 'writing',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Name the six lawful bases.',
              answerOutline: 'Consent, contract, legal obligation, vital interests, public task and legitimate interests.',
            },
            {
              question: 'Is pseudonymised data outside the GDPR?',
              answerOutline: 'Generally not for a party able to re-identify. After EDPS v SRB, it may not be personal data for a recipient with no realistic means of re-identification. The reach of that view is debated.',
            },
            {
              question: 'What is the status of the Digital Omnibus changes to the GDPR?',
              answerOutline: 'A proposal still in the legislative process as of 2 November 2026, not adopted law as far as was found. Check the latest.',
            },
          ],
        },
        {
          slug: 'eu-ai-act',
          title: 'The EU AI Act',
          summary:
            'Risk tiers, prohibited practices, high-risk obligations, and the timetable as changed by the 2026 AI Omnibus.',
          estimatedMinutes: 85,
          objectives: [
            'Classify an AI system by the Act\'s risk tiers',
            'State the timetable as amended by Regulation (EU) 2026/1744',
            'List what high-risk providers must do',
            'Compare the EU and US approaches and argue who carries the burden',
          ],
          concepts: [
            'Risk-based regulation',
            'Prohibited practices',
            'High-risk systems and Annex III',
            'Provider and deployer',
            'General-purpose AI models',
            'Transparency duties',
            'AI Omnibus',
            'Bias testing and special-category data',
          ],
          explanation: `Stated as of 2 November 2026, and checked against the Official Journal text and the European Commission's pages. This is education, not legal advice.

**Regulation (EU) 2024/1689**, the AI Act, entered into force on 1 August 2024. It sorts AI by risk.

- **Prohibited practices** (Article 5) include social scoring, and inferring emotions in workplaces and education except for medical or safety reasons.
- **High-risk systems** include AI in regulated products (Article 6(1), Annex I), and listed uses (Article 6(2), Annex III), which cover areas such as biometrics, education, employment, essential public and private services, law enforcement and migration.
- **Limited-risk** systems have transparency duties (Article 50), for example disclosing a chatbot or marking synthetic content.
- **General-purpose AI models** have their own duties.

Providers of high-risk systems must run risk management, govern their data, keep documentation and logs, and provide for human oversight, accuracy and robustness. Deployers have duties too. The top fines reach 35 million euros or 7 percent of worldwide turnover.

**The timetable changed.** Regulation (EU) 2026/1744, the AI Omnibus, was published on 24 July 2026 and entered into force on 27 July 2026.

| Rule | Applies from |
|---|---|
| Prohibitions and AI literacy | 2 February 2025 |
| General-purpose model rules, governance | 2 August 2025 |
| General application, including Article 50 | 2 August 2026 |
| New bans on non-consensual intimate imagery and child abuse material | 2 December 2026 |
| Marking by generative systems already on the market | 2 December 2026 |
| High-risk, Annex III | **2 December 2027** (was 2 August 2026) |
| High-risk, Annex I products | **2 August 2028** (was 2 August 2027) |

The Omnibus also softened Article 4: providers and deployers must now "take measures to support the development" of AI literacy. A new Article 4a allows strictly necessary processing of special-category data to detect and correct bias in high-risk systems, under safeguards. Recall the audit tension in Module 3.

**The debate.** Supporters of the delay say that harmonised standards were not ready. Critics say that protection for people affected by hiring or benefit systems has been postponed. Others argue that the rules favour firms able to pay compliance staff.

**The US contrast.** There is no general federal AI statute, so action comes through existing law, states and agencies. Which approach carries more burden, and for whom?`,
          resources: [
            { title: 'AI Act: regulatory framework', url: 'https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai', type: 'documentation', cost: 'free', provider: 'European Commission', note: 'The official overview with the current timeline. The legal text is Regulation (EU) 2024/1689 on EUR-Lex.', primary: true },
            { title: 'AI Omnibus enters into force', url: 'https://digital-strategy.ec.europa.eu/en/news/ai-omnibus-enters-force', type: 'documentation', cost: 'free', provider: 'European Commission', note: 'Links to Regulation (EU) 2026/1744.' },
            { title: 'NIST AI Risk Management Framework', url: 'https://www.nist.gov/itl/ai-risk-management-framework', type: 'documentation', cost: 'free', provider: 'US NIST', note: 'A voluntary US counterpart to compare.' },
          ],
          exercises: [
            {
              slug: 'classify-five-systems',
              title: 'Classify five systems',
              prompt:
                'Place each in a tier, with the article or annex point, and the date on which the relevant duties apply as of 2 November 2026: a CV-ranking tool; a chatbot on a bank\'s website; emotion recognition for call centre staff; a model that grades university exams; a spam filter. Say what you are unsure of, and what facts would change your answer.',
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'delay-debate',
              title: 'Was the delay right?',
              prompt:
                'Write a two-page policy memo arguing for or against the 2026 delay of the high-risk rules. Give the best argument for the other side, and identify who gains and who carries the burden of the 16 extra months for Annex III systems. Cite the regulation and at least one source from each side. End with a recommendation that would survive your opponent\'s best objection.',
              kind: 'writing',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'When do Annex III high-risk duties apply, as of November 2026?',
              answerOutline: '2 December 2027, moved from 2 August 2026 by Regulation (EU) 2026/1744.',
            },
            {
              question: 'What did Article 4a add, and why does it matter?',
              answerOutline: 'A route to process special-category data, where strictly necessary and with safeguards, to detect and correct bias in high-risk systems. It addresses the tension between audit and privacy.',
            },
            {
              question: 'Is a university exam-grading model high-risk?',
              answerOutline: 'Likely so: Annex III point 3 covers evaluating learning outcomes in education. Duties apply from the Annex III date.',
            },
          ],
        },
      ],
    },
  ],
  capstone: {
    slug: 'who-carries-the-burden-brief',
    title: 'A burden analysis of a real data decision',
    description:
      'Choose a real data decision and write a policy brief with measured evidence on who gains and who pays, fairly representing the opposing view. The final project in the coursework replaces this in the site.',
    deliverables: [
      'A policy brief with attributed claims, stating what is established and what is disputed',
      'Code that reproduces every number in the brief',
      'A stakeholder and burden table',
    ],
    estimatedHours: 20,
    stretchGoals: ['Present the brief to someone affected by the decision, and record what changed.'],
  },
  masteryChecklist: [
    'I can apply several ethical frameworks to a case and separate empirical, legal and ethical claims.',
    'I can name who carries the burden of a system, a safeguard or a failure.',
    'I can state the strongest version of a view I reject.',
    'I can measure re-identification risk and explain what k-anonymity and differential privacy do and do not promise.',
    'I can compute fairness metrics, explain why they conflict, and recompute a published audit.',
    'I can reason about consent, review boards, scraping and open data without treating any of them as the whole answer.',
    'I can report a disputed case by attributing each claim, and saying what is established.',
    'I can summarise HIPAA, FERPA, BIPA, the GDPR and the EU AI Act as of a stated date, and find what has changed since.',
  ],
});
