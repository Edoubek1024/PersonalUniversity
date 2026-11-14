import { defineSubject } from '../define';
import type { ResourceInput } from '../types';

/** Zaki and Meira, Data Mining and Machine Learning (2nd ed.), free online edition. */
const zm = (ch: number, title: string, note: string, primary = false): ResourceInput => ({
  title: `Zaki and Meira, Data Mining and Machine Learning, chapter ${ch}: ${title}`,
  url: `https://dataminingbook.info/book_html/chap${ch}/book.html`,
  type: 'textbook',
  cost: 'free',
  provider: 'Mohammed J. Zaki and Wagner Meira Jr. (Cambridge University Press, free online edition)',
  note,
  primary,
});

/** Jiawei Han's slides for the 3rd edition of the CS 412 textbook. */
const hanSlides = (ch: number, topic: string, note: string): ResourceInput => ({
  title: `Han, Kamber and Pei lecture slides, chapter ${ch}: ${topic}`,
  url: 'https://hanj.cs.illinois.edu/bk3/bk3_slidesindex.htm',
  type: 'lecture',
  cost: 'free',
  provider: 'Jiawei Han, University of Illinois',
  note,
});

/** The current edition of the textbook CS 412 uses. */
const hanBook = (chapters: string, note: string): ResourceInput => ({
  title: `Han, Pei and Tong, Data Mining: Concepts and Techniques, 4th ed., ${chapters}`,
  url: 'https://shop.elsevier.com/books/data-mining-concepts-and-techniques/han/978-0-12-811760-6',
  type: 'textbook',
  cost: 'paid',
  provider: 'Morgan Kaufmann',
  note,
});

/** Tan, Steinbach, Karpatne and Kumar, Introduction to Data Mining: free chapters and slides. */
const tsk = (file: string, title: string, note: string, type: 'textbook' | 'lecture' = 'textbook'): ResourceInput => ({
  title: `Tan, Steinbach, Karpatne and Kumar, Introduction to Data Mining: ${title}`,
  url: `https://www-users.cse.umn.edu/~kumar001/dmbook/${file}`,
  type,
  cost: 'free',
  provider: 'University of Minnesota (authors\u2019 site)',
  note,
});

/** scikit-learn user guide pages. */
const sk = (page: string, title: string, note: string): ResourceInput => ({
  title: `scikit-learn user guide: ${title}`,
  url: `https://scikit-learn.org/stable/modules/${page}.html`,
  type: 'documentation',
  cost: 'free',
  provider: 'scikit-learn',
  note,
});

const mmds = (chapter: string, note: string): ResourceInput => ({
  title: `Leskovec, Rajaraman and Ullman, Mining of Massive Datasets: ${chapter}`,
  url: 'http://www.mmds.org/',
  type: 'textbook',
  cost: 'free',
  provider: 'Stanford University',
  note,
});

const patternsCourse = (note: string): ResourceInput => ({
  title: 'Pattern Discovery in Data Mining (Coursera)',
  url: 'https://www.coursera.org/learn/data-patterns',
  type: 'course',
  cost: 'freemium',
  provider: 'University of Illinois, taught by Jiawei Han',
  note,
});

const clusterCourse = (note: string): ResourceInput => ({
  title: 'Cluster Analysis in Data Mining (Coursera)',
  url: 'https://www.coursera.org/learn/cluster-analysis',
  type: 'course',
  cost: 'freemium',
  provider: 'University of Illinois, taught by Jiawei Han',
  note,
});

export default defineSubject({
  id: 'data-mining',
  title: 'Introduction to Data Mining',
  category: 'cs',
  tagline:
    'Find patterns in large data: preprocessing, data cubes and OLAP, frequent and sequential patterns, classification, clustering and outlier detection, with every core algorithm built from scratch.',
  description: `Data mining is the part of computer science that turns large collections of records into patterns you can act on: which products sell together, which customers resemble each other, which transactions look like nothing seen before, and which attributes predict an outcome. It overlaps machine learning, statistics and databases, and its own angle is scale. The algorithms here are judged by how many passes they make over the data, how much they can prune before counting anything, and whether they still work when the data does not fit in memory.

The nine modules start with the data itself: attribute types, summaries, distances, and the cleaning, integration, reduction and discretisation that every real dataset needs. Then come data warehouses and OLAP, where you build star schemas and compute data cubes. Four modules cover the classic mining tasks: frequent patterns (Apriori, FP-growth, association rules, and the null-invariant measures that make them trustworthy), advanced patterns (multilevel, constrained, sequential and graph patterns), classification (decision trees, Bayes, rules, nearest neighbours, honest evaluation, ensembles and class imbalance), and cluster analysis (partitioning, hierarchical, density-based, grid-based and probabilistic methods, with ways to judge a clustering). The course ends with outlier detection. Where a topic is taught in depth in Machine Learning or Modeling and Learning, the lesson links there and keeps to the data-mining view.

The course follows the topics of the University of Illinois Urbana-Champaign course CS 412, Introduction to Data Mining, long taught by Jiawei Han with the textbook by Han, Kamber and Pei (now Han, Pei and Tong). It is based on the department's public course description and learning goals and on a public CS 412 course page from fall 2022. The material is original, and the course is not affiliated with the University of Illinois. Exercises use Python with NumPy, pandas and scikit-learn on real public data such as UCI Online Retail, Mushroom, MSNBC clickstreams and the Diabetes 130-US hospitals records. Two machine problems and a final project close the course.`,
  difficulty: 'advanced',
  estimatedHours: 86,
  prerequisites: ['data-structures-algorithms', 'probability-statistics'],
  recommendedBackground: [
    'Python with NumPy and pandas: loading a CSV, grouping, joining and vectorised arithmetic',
    'Basic SQL: SELECT, GROUP BY and joins',
    'Probability: conditional probability, Bayes rule, expectation and variance',
    'Linear algebra at the level of matrix products and eigenvectors (for PCA)',
  ],
  tags: ['data-mining', 'frequent-patterns', 'association-rules', 'olap', 'classification', 'clustering', 'outlier-detection', 'python'],
  core: false,
  modules: [
    {
      slug: 'introduction-and-data',
      title: 'Data Mining and Getting to Know Your Data',
      description:
        'What data mining is, how it fits into the knowledge discovery process, what kinds of patterns it looks for, and the vocabulary for describing data: attribute types, statistical summaries, and measures of similarity and distance.',
      lessons: [
        {
          slug: 'what-is-data-mining',
          title: 'What data mining is and the KDD process',
          summary:
            'Knowledge discovery as a process, the kinds of data and patterns data mining deals with, what makes a pattern interesting, and why scalability shapes every algorithm in this course.',
          estimatedMinutes: 145,
          objectives: [
            'Describe the steps of the knowledge discovery (KDD) process and where mining sits in it',
            'Name the main pattern types (characterisation, frequent patterns, classification, clustering, outliers) and match a business question to one',
            'Distinguish objective and subjective measures of interestingness',
            'Explain with a count why naive enumeration fails at scale and what an efficient mining algorithm must do instead',
          ],
          concepts: [
            'Knowledge discovery in databases (KDD)',
            'Selection, cleaning, integration, transformation, mining, evaluation',
            'Descriptive versus predictive mining',
            'Kinds of data: relational, transactional, sequence, graph, stream, text',
            'Interestingness: support, confidence, novelty, actionability',
            'Scalability: passes over the data and pruning',
            'Data mining versus machine learning and statistics',
          ],
          explanation: `**Data mining** is the discovery of interesting, non-obvious and useful patterns in large amounts of data. It is one step in a longer process called **knowledge discovery in databases (KDD)**:

1. **Selection and integration**: decide which data matter and bring them together from their sources.
2. **Cleaning**: deal with missing values, noise and inconsistencies.
3. **Transformation and reduction**: aggregate, normalise, discretise, and reduce dimensions or rows.
4. **Mining**: run an algorithm that finds patterns.
5. **Pattern evaluation and presentation**: rank the patterns by how interesting they are and show the few that matter.

In practice most of the effort goes into steps 1 to 3, which is why the next module is about preprocessing.

**What patterns look like.** *Descriptive* mining summarises the data. Examples are **characterisation** (what typical high-spending customers look like), **frequent patterns and association rules** (customers who buy pasta and tomatoes also buy basil), **clustering** (natural groups with no labels), and **outlier analysis** (records unlike the rest). *Predictive* mining builds a model of a target: **classification** for a label and regression for a number. The data come in many shapes: relational tables, transactions (sets of items), sequences (clickstreams, purchase histories), graphs, streams, text and time series.

**Interestingness.** Any large dataset contains millions of patterns, and most are useless. A pattern is worth showing if it is valid on new data, novel, potentially actionable and understandable. *Objective* measures such as support and confidence can be computed. *Subjective* ones depend on what the user already believes. A rule that confirms what everyone knows may score highly and still be boring.

**Why scale changes the algorithms.** Suppose a shop sells 10,000 products. There are $\\binom{10000}{2} = 49{,}995{,}000$ possible pairs, which you could just about count with an array of counters. But there are $\\binom{10000}{3} \\approx 1.67 \\times 10^{11}$ triples, and $2^{10000}$ itemsets in all, so you cannot count them all. Every algorithm in this course gets its power from one of a few tricks: a property that lets it **prune** candidates without counting them, a compact **summary structure** that avoids repeated scans, **sampling**, or **precomputation** (data cubes). The cost model is usually the number of **passes over the data**, because data on disk or across a cluster is far slower to read than memory.

Data mining shares its methods with machine learning and statistics. Its own focus is on patterns as well as predictions, on databases as the data source, and on algorithms that scale. Read Fayyad, Piatetsky-Shapiro and Smyth's 1996 article for the classic statement of the KDD process, then chapter 1 of the free Zaki and Meira book for the data-matrix view this course uses.`,
          resources: [
            {
              title: 'From Data Mining to Knowledge Discovery in Databases',
              url: 'https://ojs.aaai.org/aimagazine/index.php/aimagazine/article/view/1230',
              type: 'article',
              cost: 'free',
              provider: 'Fayyad, Piatetsky-Shapiro and Smyth, AI Magazine (1996)',
              note: 'The classic description of the KDD process and the place of mining in it. Read it in full; it is short.',
              primary: true,
            },
            zm(1, 'Data Mining and Analysis', 'The data matrix, attribute types and an overview of the mining tasks covered in this course.'),
            hanSlides(1, 'Introduction', 'The slides used for the first week of CS 412: KDD, kinds of data and patterns, and the major issues.'),
            hanBook('chapter 1', 'Paid. The textbook CS 412 uses; chapter 1 covers the same ground as this lesson in more depth.'),
          ],
          exercises: [
            {
              slug: 'match-questions-to-tasks',
              title: 'Match questions to mining tasks',
              prompt:
                'For each question, name the mining task (characterisation, discrimination, frequent patterns, classification, regression, clustering or outlier analysis), say what one record is, and say what the output looks like. (a) Which products does a supermarket sell together on Saturday mornings? (b) Will this loan applicant default? (c) How do the customers who left last year differ from those who stayed? (d) Which of 2 million sensor readings from a pump look faulty? (e) Can 40,000 news readers be split into a few groups by what they read? (f) How many units of each product will sell next week?',
              kind: 'writing',
              difficulty: 1,
            },
            {
              slug: 'count-the-search-space',
              title: 'Count the search space',
              prompt:
                'A store has $m$ distinct products. (a) Write Python that prints $\\binom{m}{k}$ for $k = 1, \\dots, 5$ and $m = 100, 1{,}000, 10{,}000$, using `math.comb`. (b) If each counter takes 4 bytes, how much memory is needed to count every pair and every triple for $m = 10{,}000$? (c) The average basket has 20 items. How many pairs and triples does one such basket contain? Explain why counting only the subsets that actually occur in baskets is far cheaper than counting all candidates, and why it is still not enough for large $k$.',
              kind: 'coding',
              difficulty: 1,
              hint: 'For m = 10,000 there are 49,995,000 pairs (about 200 MB of 4-byte counters) and 166,616,670,000 triples (about 667 GB). A 20-item basket contains 190 pairs and 1,140 triples.',
            },
            {
              slug: 'kdd-on-a-real-dataset',
              title: 'Plan a KDD process on real data',
              prompt:
                'Open the [UCI Online Retail dataset page](https://archive.ics.uci.edu/dataset/352/online+retail) and read the variable descriptions. Write a one-page plan for finding products that are bought together: which rows and columns you select, what cleaning you expect to need (look for cancellations and missing customer IDs), how you would turn rows into baskets, which mining step you would run, and how you would judge whether a pattern is worth showing to the shop owner.',
              kind: 'writing',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'List the steps of the KDD process and say which usually takes the most time.',
              answerOutline:
                'Selection and integration, cleaning, transformation and reduction, mining, pattern evaluation and presentation. Preparing the data (the first three) usually takes most of the effort.',
            },
            {
              question: 'Why can a pattern score well on support and confidence and still be uninteresting?',
              answerOutline:
                'Objective measures ignore what the user already knows. A rule can be frequent and reliable but obvious, or not actionable, or even misleading if the consequent is common anyway (low or no lift).',
            },
            {
              question: 'What is the usual cost measure for a mining algorithm over large data, and why?',
              answerOutline:
                'The number of passes (scans) over the data and the memory it needs, because reading data from disk or across a cluster dominates CPU time; good algorithms prune or summarise to avoid scans.',
            },
          ],
          quiz: [
            {
              question: 'A shop sells 2,000 products. How many distinct pairs of products could appear together in a basket?',
              options: ['4,000,000', '1,999,000', '3,998,000', '2,000,000'],
              answer: 1,
              explanation:
                'The number of unordered pairs is $\\binom{2000}{2} = 2000 \\times 1999 / 2 = 1{,}999{,}000$. 3,998,000 counts ordered pairs, and 4,000,000 is $2000^2$, which also counts a product paired with itself.',
            },
            {
              question: 'A bank wants to flag card transactions that look unlike a customer\'s usual behaviour. It has no list of confirmed frauds. Which mining task fits best?',
              options: ['Classification', 'Association rule mining', 'Outlier detection', 'Characterisation'],
              answer: 2,
              explanation:
                'With no labels, the job is to find records that deviate from the normal pattern, which is outlier detection. Classification would need labelled fraud examples to learn from.',
            },
            {
              question: 'A store mines its baskets and gets 40,000 association rules. An analyst then ranks them by lift and keeps the 30 a manager could act on. Which KDD step is that?',
              options: ['Data cleaning', 'Data selection', 'Data mining', 'Pattern evaluation and presentation'],
              answer: 3,
              explanation:
                'Mining produced the 40,000 rules. Ranking them by an interestingness measure and keeping the useful ones is pattern evaluation, the step after mining.',
            },
          ],
          relatedLessons: ['machine-learning/foundations-and-workflow/what-learning-from-data-means', 'data-science-exploration/data-science-pipeline/questions-and-hypotheses'],
        },
        {
          slug: 'attributes-and-statistical-summaries',
          title: 'Attribute types and statistical summaries',
          summary:
            'Nominal, binary, ordinal, interval and ratio attributes; measures of centre and spread; quartiles, the five-number summary and the 1.5 IQR rule; and what skew does to a mean.',
          estimatedMinutes: 145,
          objectives: [
            'Classify an attribute as nominal, binary (symmetric or asymmetric), ordinal, interval or ratio, and say which operations are meaningful on it',
            'Compute mean, trimmed mean, median, mode and midrange, and say which resists outliers',
            'Compute quartiles, the IQR, the five-number summary and the 1.5 IQR outlier fences by hand',
            'Compute population and sample variance and standard deviation and explain the difference',
            'Read skew from the relation between mean and median on real data',
          ],
          concepts: [
            'Nominal, binary, ordinal attributes',
            'Interval versus ratio scales',
            'Discrete versus continuous attributes',
            'Mean, trimmed mean, median, mode, midrange',
            'Quartiles, IQR, five-number summary, boxplot',
            '1.5 IQR outlier rule',
            'Variance and standard deviation',
            'Skew',
          ],
          explanation: `An **attribute** (feature, variable, dimension) is one property of a data object. Its **type** decides which operations make sense.

- **Nominal**: categories with no order (colour, country, product code). You can test equality and count; a mean is meaningless. The **mode** is the only centre.
- **Binary**: two states. *Symmetric* if both states matter equally (gender in a survey). *Asymmetric* if one state is rare and informative (a positive test result, an item being in a basket). This matters for similarity in the next lesson.
- **Ordinal**: ordered categories with unknown gaps (poor, fair, good, excellent). Median and quantiles make sense; differences do not.
- **Interval**: numbers with equal steps but no true zero (temperature in °C, calendar years). Differences make sense; ratios do not: 20 °C is not twice as hot as 10 °C.
- **Ratio**: numbers with a true zero (price, quantity, kelvin, counts). Ratios make sense: 40 units is twice 20 units.

**Centre.** The **mean** $\\bar x = \\frac{1}{n}\\sum x_i$ uses every value and is pulled by extremes. The **trimmed mean** drops a fixed share at each end. The **median** is the middle value. The **mode** is the most common value, and the **midrange** is the average of the minimum and the maximum, which is very fragile.

**Spread.** The quartiles $Q_1, Q_3$ cut the sorted data into quarters, and the **IQR** is $Q_3 - Q_1$. Several conventions exist for quartiles. This course uses the median of each half (excluding the overall median when $n$ is odd). The **five-number summary** is min, $Q_1$, median, $Q_3$, max, which is exactly what a boxplot draws. A common rule flags values below $Q_1 - 1.5\\,\\text{IQR}$ or above $Q_3 + 1.5\\,\\text{IQR}$ as potential outliers. The variance is $\\sigma^2 = \\frac1n\\sum (x_i - \\bar x)^2$ for a whole population, and $s^2 = \\frac{1}{n-1}\\sum (x_i-\\bar x)^2$ when estimating from a sample.

**Worked example.** Twelve unit prices: 2, 3, 3, 4, 5, 5, 5, 6, 7, 8, 12, 40. The sum is 100, so the mean is 8.33. The median is $(5+5)/2 = 5$ and the mode is 5. Dropping one value from each end gives a trimmed mean of $58/10 = 5.8$, and the midrange is $(2+40)/2 = 21$. The lower half 2, 3, 3, 4, 5, 5 gives $Q_1 = 3.5$, the upper half 5, 6, 7, 8, 12, 40 gives $Q_3 = 7.5$, so the IQR is 4. The fences are $-2.5$ and $13.5$, so 40 is flagged. One extreme value moved the mean far above the median: the data are **right-skewed**.

Real data are often far more skewed. In the cleaned UCI Online Retail data the median quantity per order line is 4, the mean is 10.6 and the maximum is 80,995. For data like this, report medians and quantiles, and consider a log scale. Work through Zaki and Meira chapters 2 and 3 for numeric and categorical attributes, and the NIST handbook pages for the graphical summaries.`,
          resources: [
            zm(2, 'Numeric Attributes', 'Univariate and bivariate summaries, variance and covariance, with the data-matrix notation used later for PCA.', true),
            zm(3, 'Categorical Attributes', 'Modes, contingency tables and the start of the chi-square test used in the integration lesson.'),
            {
              title: 'NIST/SEMATECH e-Handbook of Statistical Methods: Exploratory Data Analysis',
              url: 'https://www.itl.nist.gov/div898/handbook/eda/eda.htm',
              type: 'textbook',
              cost: 'free',
              provider: 'NIST',
              note: 'Boxplots, histograms and measures of location and scale, each with worked data.',
            },
            hanSlides(2, 'Getting to Know Your Data', 'Attribute types, basic statistical descriptions and data visualisation.'),
          ],
          exercises: [
            {
              slug: 'type-every-column',
              title: 'Type every column',
              prompt:
                'For each column of UCI Online Retail (InvoiceNo, StockCode, Description, Quantity, InvoiceDate, UnitPrice, CustomerID, Country), give its attribute type and one operation that is meaningful and one that is not. Then do the same for these derived columns: weekday of the invoice, hour of the invoice, price band (under 1, 1 to 2, 2 to 5, 5 to 10, 10 and over), and "is a cancellation". Explain why CustomerID is nominal even though it is stored as a number.',
              kind: 'writing',
              difficulty: 1,
            },
            {
              slug: 'five-number-summary-by-hand',
              title: 'Five-number summary by hand and in pandas',
              prompt:
                'For the values 1, 2, 2, 3, 4, 6, 9, 13, 21: (a) compute the mean, median, mode and midrange; (b) compute $Q_1$ and $Q_3$ by the median-of-halves rule, the IQR and the fences, and say which values are flagged; (c) compute the population and sample standard deviation. Then compute the quartiles with `numpy.percentile(x, [25, 75])` and explain why they differ from yours.',
              kind: 'problem',
              difficulty: 1,
              hint: 'Mean 61/9 = 6.78, median 4, mode 2, midrange 11. Halves exclude the median: Q1 = median(1, 2, 2, 3) = 2, Q3 = median(6, 9, 13, 21) = 11, IQR 9, fences -11.5 and 24.5, so nothing is flagged. NumPy\'s default linear interpolation gives 2 and 9.',
            },
            {
              slug: 'skew-in-online-retail',
              title: 'Skew in a real sales log',
              prompt:
                'Load UCI Online Retail with pandas. Remove cancelled invoices (InvoiceNo starting with "C") and rows with Quantity or UnitPrice at or below zero. Report the five-number summary, mean and standard deviation of Quantity, UnitPrice and line revenue (Quantity times UnitPrice). How many lines does the 1.5 IQR rule flag for Quantity, and are they errors or wholesale orders? Plot each on a linear and a log scale and say which summary you would report to a manager.',
              kind: 'data-analysis',
              difficulty: 2,
              hint: 'After those filters (and removing non-product stock codes and exact duplicates) the median quantity is 4 and the mean about 10.6. The IQR rule flags tens of thousands of lines, most of them legitimate bulk orders: the rule assumes roughly symmetric data.',
            },
          ],
          selfAssessment: [
            {
              question: 'Why is the ratio "20 °C is twice 10 °C" meaningless while "40 units is twice 20 units" is fine?',
              answerOutline:
                'Celsius is an interval scale: its zero is arbitrary, so ratios change if you shift the scale (in kelvin the ratio is about 1.035). Quantity is a ratio scale with a true zero.',
            },
            {
              question: 'Which measures of centre resist a single huge outlier, and which do not?',
              answerOutline: 'Median, trimmed mean and mode resist it; the mean is pulled toward it; the midrange is the worst, as it depends only on the extremes.',
            },
            {
              question: 'When do you divide by n - 1 instead of n in the variance?',
              answerOutline:
                'When estimating a population variance from a sample: n - 1 corrects for measuring deviations from the sample mean, which makes the estimate unbiased. Divide by n when the data are the whole population.',
            },
          ],
          quiz: [
            {
              question: 'Eight order sizes: 1, 2, 2, 3, 4, 6, 9, 13. Using the median of each half for the quartiles, what is the upper 1.5 IQR fence, and is 13 flagged?',
              options: ['15.75, and 13 is not flagged', '13.75, and 13 is not flagged', '11.25, and 13 is flagged', '7.5, and 13 is flagged'],
              answer: 0,
              explanation:
                '$Q_1$ = median(1, 2, 2, 3) = 2 and $Q_3$ = median(4, 6, 9, 13) = 7.5, so IQR = 5.5 and the upper fence is $7.5 + 1.5 \\times 5.5 = 15.75$. 13 is below it. The value 7.5 is $Q_3$ itself, not the fence.',
            },
            {
              question: 'Which of these statements is meaningful for the attribute type involved?',
              options: [
                'A rating of "excellent" is twice as good as "fair"',
                'An order of 40 units is twice an order of 20 units',
                'A temperature of 20 °C is twice as hot as 10 °C',
                'The average country of our customers is Germany',
              ],
              answer: 1,
              explanation:
                'Quantity is ratio-scaled, with a true zero, so ratios are meaningful. Ratings are ordinal (no known gaps), Celsius is interval (arbitrary zero), and country is nominal, so it has a mode but no average.',
            },
            {
              question: 'The values 2, 4, 4, 4, 5, 5, 7, 9 are a sample from a larger population. What is the sample standard deviation $s$?',
              options: ['2.000', '4.571', '2.138', '4.000'],
              answer: 2,
              explanation:
                'The mean is 5 and the squared deviations sum to 32. Dividing by $n - 1 = 7$ gives $s^2 = 4.571$ and $s = 2.138$. 2.000 divides by $n = 8$ (the population formula), and 4.571 and 4.000 are variances, not standard deviations.',
            },
            {
              question: 'In a sales log the median quantity per line is 4 and the mean is 10.6. What does this tell you?',
              options: [
                'The data are left-skewed: a few lines have very small quantities',
                'Half the lines have a quantity above 10.6',
                'The data are symmetric, so the mean is the better summary',
                'The data are right-skewed: a few very large orders pull the mean up',
              ],
              answer: 3,
              explanation:
                'A mean far above the median means a long right tail: a small number of huge wholesale orders. Half the lines are above the *median*, 4, not above the mean.',
            },
          ],
          relatedLessons: ['data-science-exploration/summary-and-visualisation/multivariate-summaries', 'probability-statistics/statistics-in-practice/data-cleaning-and-exploration'],
        },
        {
          slug: 'similarity-and-distance',
          title: 'Similarity and distance measures',
          summary:
            'Dissimilarity matrices; Minkowski distances; simple matching and Jaccard for binary data; ordinal and mixed attributes; cosine similarity for counts and baskets; and why scaling decides which attribute dominates.',
          estimatedMinutes: 155,
          objectives: [
            'Compute Manhattan, Euclidean and supremum distances, and state the metric properties',
            'Choose between simple matching and Jaccard for binary attributes, and compute both from a contingency table',
            'Map ordinal values to [0, 1] and combine mixed attribute types into one dissimilarity',
            'Compute cosine similarity and explain why it suits sparse count vectors',
            'Explain why unscaled attributes distort a distance and fix it',
          ],
          concepts: [
            'Data matrix versus dissimilarity matrix',
            'Minkowski distance: L1, L2, L-sup',
            'Metric properties and the triangle inequality',
            'Simple matching coefficient',
            'Jaccard coefficient for asymmetric binary data',
            'Ordinal rank mapping',
            'Mixed-type (Gower-style) dissimilarity',
            'Cosine similarity',
          ],
          explanation: `Clustering, nearest-neighbour classification and many outlier detectors depend on one decision: how far apart are two objects? A **data matrix** stores $n$ objects by $p$ attributes. A **dissimilarity matrix** stores $d(i, j)$ for every pair, which takes $n^2/2$ entries. That cost is why scalable methods avoid building it.

**Numeric attributes.** The **Minkowski** distance is $d(x, y) = \\left(\\sum_f |x_f - y_f|^h\\right)^{1/h}$. With $h = 1$ it is the **Manhattan** distance, with $h = 2$ the **Euclidean** distance, and as $h \\to \\infty$ the **supremum** distance $\\max_f |x_f - y_f|$. For $x = (2, 5, 1)$ and $y = (6, 2, 1)$ the differences are 4, 3 and 0, so $L_1 = 7$, $L_2 = \\sqrt{16+9} = 5$ and $L_\\infty = 4$. All three are **metrics**: non-negative, zero only for identical points, symmetric, and they satisfy the triangle inequality $d(x, z) \\le d(x, y) + d(y, z)$.

**Scale first.** If one attribute is income in pounds and another is age in years, income dominates any Minkowski distance. Standardise each attribute, or min-max scale it (next module), unless the units are genuinely comparable.

**Binary attributes.** For two objects, count the attributes where both are 1 ($q$), only the first is 1 ($r$), only the second is 1 ($s$), and both are 0 ($t$). The **simple matching coefficient** $(q + t)/(q + r + s + t)$ suits *symmetric* attributes. For *asymmetric* ones, such as items in a basket or positive test results, joint absences carry no information: two shoppers are not similar because neither bought caviar. Use the **Jaccard coefficient** $q/(q + r + s)$ instead. For example, take two patients with 10 tests, positive together on 2, only A on 1, only B on 1, and negative together on 6. Simple matching gives 0.8 but Jaccard gives $2/4 = 0.5$.

**Ordinal attributes.** Replace each value by its rank $r \\in \\{1, \\dots, M\\}$ and scale it with $z = (r - 1)/(M - 1)$. Then treat $z$ as numeric. On the scale poor, fair, good, excellent, "good" maps to $2/3$.

**Mixed types.** Compute a per-attribute dissimilarity in $[0, 1]$: 0 or 1 for nominal attributes, $|x - y|/\\text{range}$ for numeric ones, and the scaled rank difference for ordinal ones. Then average them over the attributes that are present for both objects. This is the idea behind Gower's distance.

**Cosine similarity.** For count vectors such as word counts or quantities per product, $\\cos(x, y) = \\frac{x \\cdot y}{\\|x\\|\\,\\|y\\|}$ ignores vector length and shared zeros. For $a = (3, 0, 1, 2)$ and $b = (1, 1, 0, 2)$ it is $7/(\\sqrt{14}\\sqrt{6}) = 0.764$. In high dimensions with sparse data, cosine and Jaccard behave far better than Euclidean distance, because almost every pair of points is roughly equally far apart in Euclidean terms. MMDS chapter 3 shows how to find similar pairs at scale with minhashing and LSH.`,
          resources: [
            zm(1, 'Data Mining and Analysis', 'Section 1.3 on the geometric view, and the distance and angle definitions used throughout the course.', true),
            mmds('chapter 3, Finding Similar Items', 'Jaccard similarity, minhashing and locality-sensitive hashing: how similarity search scales to millions of objects.'),
            sk('metrics', 'Pairwise metrics, affinities and kernels', 'Cosine similarity and the distance functions scikit-learn provides, with notes on sparse input.'),
            hanSlides(2, 'Getting to Know Your Data', 'The second half covers proximity measures for every attribute type, with worked examples.'),
          ],
          exercises: [
            {
              slug: 'distance-functions',
              title: 'Write and test the distance functions',
              prompt:
                'Write `minkowski(x, y, h)`, `jaccard(a, b)` for Python sets, `smc(u, v)` for 0/1 arrays, and `cosine(x, y)` in NumPy. Test them against `scipy.spatial.distance`: for x = (2, 5, 1) and y = (6, 2, 1) you should get 7, 5 and 4 for h = 1, 2 and infinity. For a = (3, 0, 1, 2) and b = (1, 1, 0, 2) the cosine similarity is 0.7638. Then build a 1,000 by 1,000 Euclidean distance matrix for random points in 50 dimensions and plot the histogram of distances: how spread out are they relative to their mean?',
              kind: 'coding',
              difficulty: 2,
              hint: 'For uniform random points in high dimensions the ratio of the standard deviation of pairwise distances to their mean is small (around 0.1 at 50 dimensions), which is the concentration of distances that makes nearest neighbours less meaningful.',
            },
            {
              slug: 'mixed-dissimilarity',
              title: 'A mixed-type dissimilarity by hand',
              prompt:
                'Three customers: A = (country UK, loyalty "gold", age 34, spend 1,200), B = (country France, loyalty "silver", age 41, spend 300), C = (country UK, loyalty "bronze", age 29, spend 250). Loyalty is ordinal bronze < silver < gold. Over the whole customer table, age ranges from 18 to 78 and spend from 0 to 6,000. Compute the averaged per-attribute dissimilarity $d(A, B)$, $d(A, C)$ and $d(B, C)$ and say which pair is closest. Then check your answers with a short Python function.',
              kind: 'problem',
              difficulty: 2,
              hint: 'Per attribute for A and B: country 1, loyalty |1 - 0.5| = 0.5, age 7/60 = 0.117, spend 900/6000 = 0.15, average 0.442. For A and C: 0, 1, 5/60, 950/6000, average 0.310. For B and C: 1, 0.5, 12/60, 50/6000, average 0.427.',
            },
            {
              slug: 'customer-neighbours',
              title: 'Nearest customers in Online Retail',
              prompt:
                'From the cleaned Online Retail data, build for each customer the set of StockCodes they bought. For customer 12347, find the three customers with the highest Jaccard similarity, and the three with the highest cosine similarity on quantity vectors. Do the lists agree? Explain which you would use for "customers like you bought" and why.',
              kind: 'data-analysis',
              difficulty: 2,
              hint: 'With the cleaning rules of this course (no cancellations, positive quantity and price, stock codes starting with a digit, no exact duplicates), customer 12347 bought 103 distinct products, and the top Jaccard neighbour is customer 17396 at about 0.135.',
            },
          ],
          selfAssessment: [
            {
              question: 'When is the Jaccard coefficient a better choice than simple matching?',
              answerOutline:
                'For asymmetric binary attributes, where 1 is rare and informative (items bought, symptoms present): shared absences would otherwise make almost every pair look similar.',
            },
            {
              question: 'Why should attributes usually be scaled before computing a Euclidean distance?',
              answerOutline:
                'The distance adds squared differences in each attribute\'s own units, so the attribute with the largest range dominates; scaling puts attributes on a comparable footing.',
            },
            {
              question: 'Why is cosine similarity popular for documents and baskets?',
              answerOutline:
                'It depends on the angle between vectors, not their length, and it ignores shared zeros, so long and short documents or baskets with similar proportions score as similar.',
            },
          ],
          quiz: [
            {
              question: 'Two shoppers are compared on 10 products. Both bought 2 of them, only the first bought 1, only the second bought 1, and neither bought the other 6. What is their Jaccard similarity?',
              options: ['0.8', '0.2', '0.4', '0.5'],
              answer: 3,
              explanation:
                'Jaccard ignores joint absences: $q/(q + r + s) = 2/(2 + 1 + 1) = 0.5$. 0.8 is the simple matching coefficient, which counts the 6 products neither bought as agreement.',
            },
            {
              question: 'For $x = (1, 7, 4)$ and $y = (4, 3, 4)$, what are the Euclidean and supremum distances?',
              options: ['5 and 4', '7 and 4', '5 and 3', '25 and 4'],
              answer: 0,
              explanation:
                'The differences are 3, 4 and 0, so $L_2 = \\sqrt{9 + 16} = 5$ and $L_\\infty = \\max = 4$. 7 is the Manhattan distance and 25 is the squared Euclidean distance.',
            },
            {
              question: 'A satisfaction attribute has the ordered values poor, fair, good, very good, excellent. After rank mapping to [0, 1], what is the distance between "fair" and "excellent"?',
              options: ['3', '0.6', '0.75', '0.25'],
              answer: 2,
              explanation:
                'With $M = 5$, rank $r$ maps to $(r - 1)/4$: fair is $1/4 = 0.25$ and excellent is $4/4 = 1$. The distance is $0.75$. The raw rank difference, 3, is not scaled to [0, 1].',
            },
            {
              question: 'What is the cosine similarity of the count vectors $(2, 0, 2)$ and $(1, 1, 0)$?',
              options: ['0.25', '0.5', '0.707', '0.333'],
              answer: 1,
              explanation:
                'The dot product is 2, $\\|x\\| = \\sqrt 8$ and $\\|y\\| = \\sqrt 2$, so $\\cos = 2/\\sqrt{16} = 0.5$. 0.333 is the Jaccard coefficient of the two supports ({1, 3} and {1, 2} share 1 of 3 items), a different measure.',
            },
          ],
          relatedLessons: ['machine-learning/foundations-and-workflow/baselines-and-nearest-neighbours'],
        },
      ],
    },
    {
      slug: 'data-preprocessing',
      title: 'Data Preprocessing',
      description:
        'Real data are dirty, scattered, too big and in the wrong form. This module covers cleaning, integration with correlation analysis, reduction by PCA, attribute selection and sampling, and transformation by normalisation and discretisation.',
      lessons: [
        {
          slug: 'data-quality-and-cleaning',
          title: 'Data quality and cleaning',
          summary:
            'The dimensions of data quality, strategies for missing values and why they bias results, smoothing noise by binning, and cleaning as an iterative process of discrepancy detection and repair.',
          estimatedMinutes: 145,
          objectives: [
            'Name the dimensions of data quality and give an example of each failing in a real dataset',
            'Choose a strategy for missing values and explain how each can bias later results',
            'Smooth noisy values by equal-frequency binning with bin means and bin boundaries, by hand',
            'Write cleaning rules as code that reports how many rows each rule removes',
          ],
          concepts: [
            'Accuracy, completeness, consistency, timeliness, believability, interpretability',
            'Missing completely at random, at random, not at random',
            'Deletion, constant, mean or median, class-conditional and model-based imputation',
            'Noise and smoothing by binning',
            'Bin means, bin medians, bin boundaries',
            'Discrepancy detection: unique, consecutive and null rules',
            'Cleaning as an audited pipeline',
          ],
          explanation: `Data have **quality** when they are fit for the intended use. The usual dimensions are accuracy (values are correct), completeness (values are present), consistency (no contradictions across records or sources), timeliness, believability and interpretability. Mining dirty data produces confident, wrong patterns, so cleaning is not optional.

**Missing values.** You can (1) drop the record, which wastes data and biases results if missingness depends on anything; (2) fill in a constant such as "unknown", which a miner may then treat as a real category; (3) fill in the attribute mean or median; (4) fill in the mean or median of the record's own class or group; or (5) predict the value from the other attributes with regression, kNN or a tree. Statisticians separate three mechanisms. Values are **MCAR** (missing completely at random) when missingness is unrelated to anything. They are **MAR** (missing at random) when it depends only on observed attributes, and **MNAR** (missing not at random) when it depends on the missing value itself, for example when people with high incomes skip the income question. Deleting rows is safe only under MCAR. Mean imputation keeps the mean but shrinks the variance and weakens correlations. Whatever you choose, keep a flag that records which values were imputed.

A real case: in UCI Online Retail, 135,080 of 541,909 rows (24.9%) have no CustomerID. For basket analysis you can keep them, because the invoice still defines a basket. For customer-level work you must drop them, and you should check whether they differ, for example in country or order size, before concluding anything about "customers".

**Noise.** Noise is random error in a measured value. **Binning** smooths it using neighbouring values. Sort the values, split them into bins, then replace each value by its bin's mean, its median, or the nearer bin boundary. Here are prices 5, 6, 9, 12, 13, 18, 22, 29, 31 in three equal-frequency bins:

| bin | values | by means | by boundaries |
|---|---|---|---|
| 1 | 5, 6, 9 | 6.67, 6.67, 6.67 | 5, 5, 9 |
| 2 | 12, 13, 18 | 14.33 (×3) | 12, 12, 18 |
| 3 | 22, 29, 31 | 27.33 (×3) | 22, 31, 31 |

Regression smoothing and outlier detection (module 9) are other ways to handle noise.

**Cleaning as a process.** First detect discrepancies using metadata and rules: **unique** rules (no two rows share a key), **consecutive** rules (no gaps in invoice numbers), **null** rules (what a blank, a zero or a "?" means), and range and format checks. Then transform the data, re-check, and repeat. Write each rule as code that logs how many rows it touched. A cleaning step nobody can audit is a source of silent bias.`,
          resources: [
            hanSlides(3, 'Data Preprocessing', 'Data quality, cleaning, missing values and binning; the first third of the chapter 3 slides.'),
            {
              title: 'Tidy Data',
              url: 'https://www.jstatsoft.org/article/view/v059i10',
              type: 'article',
              cost: 'free',
              provider: 'Hadley Wickham, Journal of Statistical Software (2014)',
              note: 'How to structure a table so that cleaning and analysis are easy. Sections 2 and 3 are the core.',
              primary: true,
            },
            sk('impute', 'Imputation of missing values', 'SimpleImputer, KNNImputer and IterativeImputer, plus the missing-indicator option discussed above.'),
            hanBook('chapter 2 (data, measurements and data preprocessing)', 'Paid. The 4th edition merges getting to know data and preprocessing into one chapter.'),
          ],
          exercises: [
            {
              slug: 'binning-by-hand',
              title: 'Smoothing by binning',
              prompt:
                'Sorted delivery times in days: 2, 3, 3, 5, 8, 9, 10, 14, 15, 21, 22, 30. (a) Split them into four equal-frequency bins and smooth by bin means and by bin boundaries. (b) Split them into four equal-width bins over [2, 30] and list the counts. (c) Write a Python function `smooth(values, bins, method)` that reproduces both, and check it against your hand answers.',
              kind: 'problem',
              difficulty: 1,
              hint: 'Equal frequency gives bins (2, 3, 3), (5, 8, 9), (10, 14, 15) and (21, 22, 30), with means 2.67, 7.33, 13 and 24.33. In the bin (5, 8, 9), 8 is closer to 9 than to 5. Equal width uses width 7 with edges 2, 9, 16, 23, 30, giving counts 5, 4, 2, 1 if each bin includes its left edge and the last bin includes 30.',
            },
            {
              slug: 'audited-cleaning',
              title: 'An audited cleaning pipeline for Online Retail',
              prompt:
                'Write `clean.py` that loads UCI Online Retail and applies, in this order: drop cancelled invoices (InvoiceNo starting with "C"); drop rows with Quantity <= 0 or UnitPrice <= 0; drop rows whose StockCode does not start with a digit (postage, fees, manual adjustments); drop exact duplicate rows. Print a table of rows remaining after each step. Then compare the country mix and median order size of rows with and without a CustomerID, and write three sentences on whether dropping rows with no CustomerID would bias a customer analysis.',
              kind: 'data-analysis',
              difficulty: 2,
              hint: 'Expected counts: 541,909 raw, then 532,621, 530,104, 527,725 and 522,504. Of the remaining rows, 131,354 still have no CustomerID.',
            },
            {
              slug: 'imputation-bias',
              title: 'How imputation biases a correlation',
              prompt:
                'Simulate 10,000 pairs (x, y) from a bivariate normal with correlation 0.6. Make 30% of y missing (a) completely at random and (b) only when y is above its 70th percentile. For each case, compare the true mean, standard deviation and correlation with those after deleting incomplete rows, after mean imputation, and after regression imputation from x. Summarise in a table which method biases which statistic.',
              kind: 'simulation',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does mean imputation weaken correlations?',
              answerOutline:
                'Every imputed value sits at the mean regardless of the other attributes, adding points with zero covariance and shrinking the variance, so correlation estimates move toward zero.',
            },
            {
              question: 'Give an example of data missing not at random, and say why deleting those rows is dangerous.',
              answerOutline:
                'High earners skipping the income question, or failed sensors at extreme temperatures. Deleting them removes exactly the extreme cases, biasing means and models.',
            },
            {
              question: 'What is the difference between smoothing by bin means and by bin boundaries?',
              answerOutline:
                'Means replace every value in a bin by the bin average; boundaries replace each value by whichever of the bin\'s minimum or maximum is closer, which keeps the extremes of each bin.',
            },
          ],
          quiz: [
            {
              question: 'Sorted values 4, 7, 8, 15, 16, 20 are split into two equal-frequency bins and smoothed by bin boundaries. What does 7 become, and what does 16 become?',
              options: ['7 becomes 8 and 16 becomes 15', '7 becomes 6.33 and 16 becomes 17', '7 becomes 4 and 16 becomes 20', '7 stays 7 and 16 stays 16'],
              answer: 0,
              explanation:
                'The bins are (4, 7, 8) and (15, 16, 20). 7 is 1 from the boundary 8 and 3 from 4, so it becomes 8. 16 is 1 from 15 and 4 from 20, so it becomes 15. 6.33 and 17 are the bin means, which is a different method.',
            },
            {
              question: 'A survey\'s income question is skipped mostly by people with very high incomes. You delete those respondents and report the mean income. What happens?',
              options: [
                'The mean is unbiased, because the deletions are random',
                'The mean is too high, because only low earners skipped',
                'The mean is too low, because the missingness depends on the missing value itself',
                'Only the variance is affected, not the mean',
              ],
              answer: 2,
              explanation:
                'This is missing not at random: the chance of being missing depends on income itself. Deleting those rows removes the top of the distribution, so the mean is biased downward.',
            },
            {
              question: 'Which cleaning rule is a "unique rule" in the sense of discrepancy detection?',
              options: [
                'Every invoice line has a quantity between 1 and 100,000',
                'Invoice numbers have no gaps between the first and last',
                'A blank customer ID means the customer was a guest',
                'No two products share a StockCode with different descriptions',
              ],
              answer: 3,
              explanation:
                'A unique rule says each value of an attribute must differ from all others, or map to exactly one thing. "No gaps" is a consecutive rule, the blank meaning is a null rule, and the range check is a domain rule.',
            },
          ],
          relatedLessons: ['data-science-exploration/data-wrangling/missing-data', 'probability-statistics/statistics-in-practice/data-cleaning-and-exploration'],
        },
        {
          slug: 'data-integration',
          title: 'Data integration and correlation analysis',
          summary:
            'Merging sources without creating errors: entity identification, redundant attributes found with chi-square and correlation, duplicate tuples, and conflicting values.',
          estimatedMinutes: 145,
          objectives: [
            'Describe the entity identification problem and the main steps of entity resolution',
            'Compute expected counts and the chi-square statistic for a contingency table, and interpret the result',
            'Compute covariance and Pearson correlation and use them to detect redundant numeric attributes',
            'Recognise duplicate tuples and value conflicts (units, scales, encodings) when merging sources',
          ],
          concepts: [
            'Schema integration and metadata',
            'Entity identification and resolution',
            'Redundancy and derived attributes',
            'Chi-square test of independence',
            'Covariance and Pearson correlation',
            'Correlation is not causation',
            'Tuple duplication',
            'Value conflicts: units, scales, codes',
          ],
          explanation: `**Integration** merges data from several sources into one coherent store. Done carelessly, it creates the very errors that cleaning removes.

**Entity identification.** Is \`customer_id\` in one system the same as \`cust_no\` in another? Is "J. Smith, 12 High St" the same person as "John Smith, 12 High Street"? *Schema* matching relies on metadata: names, types, ranges and how nulls are coded. *Object* matching, or **entity resolution**, usually goes in three steps. First comes **blocking**, which compares only records that share a cheap key, such as a postcode, to avoid comparing all $n^2$ pairs. Then pairs within a block are compared with string similarities, and a threshold or a classifier decides which are matches.

**Redundancy.** An attribute is redundant if it can be derived from others, like annual revenue from monthly revenue, or if it is strongly correlated with another. Redundant attributes slow mining down and can mislead it: two copies of the same signal look like two independent pieces of evidence.

**Nominal attributes: the chi-square test.** For a contingency table with observed counts $o_{ij}$, the expected count under independence is $e_{ij} = \\frac{(\\text{row } i \\text{ total})(\\text{column } j \\text{ total})}{n}$, and
$$\\chi^2 = \\sum_{i,j} \\frac{(o_{ij} - e_{ij})^2}{e_{ij}}$$
with $(r-1)(c-1)$ degrees of freedom. Here is a worked example with 1,000 shoppers:

| | shops online | does not | total |
|---|---|---|---|
| uses coupons | 120 | 80 | 200 |
| no coupons | 180 | 620 | 800 |
| total | 300 | 700 | 1,000 |

The expected counts are $200 \\cdot 300/1000 = 60$, then 140, 240 and 560. So $\\chi^2 = 60^2/60 + 60^2/140 + 60^2/240 + 60^2/560 = 60 + 25.71 + 15 + 6.43 = 107.14$. With 1 degree of freedom the 0.1% critical value is 10.83, so the attributes are strongly associated. Twice as many coupon users shop online as independence predicts.

**Numeric attributes: correlation.** The covariance is $\\text{Cov}(A, B) = \\frac1n \\sum (a_i - \\bar a)(b_i - \\bar b)$, and the **Pearson correlation** $r = \\text{Cov}(A,B)/(\\sigma_A \\sigma_B)$ lies in $[-1, 1]$. Values near $\\pm 1$ suggest redundancy, and $r = 0$ means no *linear* relation. Remember that correlation is not causation, and that a single outlier can create or hide a correlation.

**Duplicates and conflicts.** The same tuple can appear twice after a merge, for example from denormalised tables that were updated in only one place. Values may also conflict: prices in pounds and euros, weights in kilograms and pounds, or dates in day-month and month-day order. Record the units in the metadata and convert before you merge, not after.`,
          resources: [
            hanSlides(3, 'Data Preprocessing', 'The integration section: entity identification, chi-square and correlation analysis for redundancy.'),
            zm(3, 'Categorical Attributes', 'Contingency tables and the chi-square test of independence, with the distribution derived.', true),
            {
              title: 'Python Record Linkage Toolkit documentation',
              url: 'https://recordlinkage.readthedocs.io/en/latest/',
              type: 'documentation',
              cost: 'free',
              provider: 'J. de Bruin',
              note: 'Blocking, pairwise comparison and classification for entity resolution, with small built-in test datasets.',
            },
          ],
          exercises: [
            {
              slug: 'chi-square-by-hand',
              title: 'Chi-square by hand and with SciPy',
              prompt:
                'A loyalty scheme survey of 500 customers: 45 members bought the premium range and 55 members did not; 105 non-members bought it and 295 did not. (a) Compute the expected counts and $\\chi^2$ by hand. (b) Check with `scipy.stats.chi2_contingency(table, correction=False)`. (c) Is membership associated with buying premium at the 1% level? (d) Rerun with `correction=True` and explain what Yates\'s correction does.',
              kind: 'problem',
              difficulty: 1,
              hint: 'The expected counts are 30, 70, 120 and 280, and chi-square is 7.5 + 3.214 + 1.875 + 0.804 = 13.39 with 1 degree of freedom. The 1% critical value is 6.63.',
            },
            {
              slug: 'find-redundant-attributes',
              title: 'Find redundant attributes',
              prompt:
                'Load the UCI [Wine Quality](https://archive.ics.uci.edu/dataset/186/wine+quality) red-wine data. Compute the Pearson correlation matrix of the 11 physico-chemical attributes, list every pair with |r| > 0.6, and for each pair say whether you would drop one, combine them, or keep both, and why. Then compute Spearman correlation for the same pairs and explain any pair where the two disagree by more than 0.1.',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'entity-resolution-toy',
              title: 'A small entity resolution',
              prompt:
                'Write 30 customer records by hand where 10 real people appear two or three times with variations (typos, abbreviations, swapped first and last names, different address formats). Implement blocking on the first three characters of the postcode, compare pairs with the Jaro-Winkler similarity from the `jellyfish` package on name and address, and choose a threshold. Report precision and recall of your matches against the truth you wrote down, and show one false match and one missed match.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'How do you compute an expected count in a contingency table, and what does a large chi-square mean?',
              answerOutline:
                'Row total times column total divided by n. A large chi-square (relative to the critical value for (r-1)(c-1) degrees of freedom) means the observed counts are far from what independence predicts, so the attributes are associated.',
            },
            {
              question: 'Why is a correlation of zero not proof that two attributes are unrelated?',
              answerOutline: 'Pearson correlation only measures linear association; a strong non-linear relation (for example y = x squared on a symmetric range) can have r near 0.',
            },
            {
              question: 'What does blocking do in entity resolution, and what can go wrong with it?',
              answerOutline:
                'It restricts comparisons to records sharing a cheap key, avoiding all n-squared pairs. If the blocking key itself is wrong or inconsistently recorded, true matches never get compared, which lowers recall.',
            },
          ],
          quiz: [
            {
              question: 'In a table of 400 customers, 100 bought product X and 160 bought product Y. If buying X and buying Y were independent, how many customers would you expect to have bought both?',
              options: ['40', '25', '64', '100'],
              answer: 0,
              explanation:
                'The expected count is $(100 \\times 160)/400 = 40$. 64 is $160^2/400$, and 25 is $100^2/400$; neither uses both margins.',
            },
            {
              question: 'Paired values $p = (2, 4, 6, 8, 10)$ and $q = (3, 5, 4, 9, 9)$. What is the Pearson correlation?',
              options: ['0.80', '6.40', '0.89', '8.00'],
              answer: 2,
              explanation:
                'The deviations of $p$ are $-4, -2, 0, 2, 4$ and those of $q$ (mean 6) are $-3, -1, -2, 3, 3$. Their products sum to 32, so the population covariance is 6.4. Then $\\sigma_p = \\sqrt 8$ and $\\sigma_q = \\sqrt{6.4}$, so $r = 6.4/\\sqrt{51.2} = 0.894$. 6.4 and 8.0 are the population and sample covariances, not correlations.',
            },
            {
              question: 'Two merged sources record product weight; one in kilograms, the other in pounds, with no unit column. What kind of integration problem is this?',
              options: ['Tuple duplication', 'Entity identification', 'A data value conflict', 'Redundancy between attributes'],
              answer: 2,
              explanation:
                'The same real-world quantity is represented on different scales: a value conflict. It must be resolved from metadata (or by inspecting value ranges) before the sources are merged.',
            },
          ],
          relatedLessons: ['data-science-exploration/data-wrangling/joining-tables', 'probability-statistics/hypothesis-testing-and-regression/chi-square-and-goodness-of-fit'],
        },
        {
          slug: 'data-reduction',
          title: 'Data reduction: PCA, attribute selection and sampling',
          summary:
            'Making data smaller while keeping what matters: principal components, greedy attribute subset selection, histograms and clustering as summaries, and simple, stratified and cluster sampling.',
          estimatedMinutes: 165,
          objectives: [
            'Compute principal components of a small covariance matrix and the share of variance each explains',
            'Run PCA on standardised data with SVD and check it against scikit-learn',
            'Describe forward selection, backward elimination and tree-based attribute selection, and their costs',
            'Choose between simple random, stratified and cluster sampling, and compute the expected coverage of sampling with replacement',
          ],
          concepts: [
            'Dimensionality reduction versus numerosity reduction',
            'Principal component analysis: covariance, eigenvectors, explained variance',
            'PCA through the SVD of the centred data matrix',
            'Attribute subset selection: forward, backward, tree-based',
            'Parametric reduction: regression and log-linear models',
            'Histograms and clustering as summaries',
            'Sampling: SRSWOR, SRSWR, cluster, stratified',
            'Data compression, lossless and lossy',
          ],
          explanation: `**Data reduction** produces a smaller dataset that gives (almost) the same mining results. You can remove dimensions (columns) or reduce numerosity (rows, or a model of the rows).

**Principal component analysis.** Centre each attribute, and usually also standardise it, because PCA follows variance, so units matter. Then find the orthogonal directions of greatest variance: the eigenvectors of the covariance matrix $\\Sigma$, ordered by eigenvalue $\\lambda_1 \\ge \\lambda_2 \\ge \\dots$. Projecting onto the first $k$ directions keeps a share $\\sum_{i \\le k}\\lambda_i / \\sum_i \\lambda_i$ of the total variance.

*Worked example.* Two standardised-scale attributes with $\\Sigma = \\begin{pmatrix} 2 & 1 \\\\ 1 & 2 \\end{pmatrix}$ have eigenvalues 3 and 1, with eigenvectors $(1, 1)/\\sqrt 2$ and $(1, -1)/\\sqrt 2$. The first component, the average direction, explains $3/4 = 75\\%$ of the variance.

In practice you compute the **SVD** of the centred $n \\times p$ matrix, $X = U S V^\\top$. The rows of $V^\\top$ are the components, and $\\lambda_i = s_i^2/n$, which costs $O(np \\min(n, p))$. For a real case, take six log-transformed, standardised features for each of 4,334 Online Retail customers: recency, frequency, monetary value, distinct products, mean basket size and mean price. The first component explains 50.8% of the variance and the first three explain 87.8%. PCA is unsupervised: a low-variance direction can still be the one that separates your classes.

**Attribute subset selection** keeps original attributes, so the result stays interpretable. There are $2^p$ subsets, so greedy searches are used. **Forward selection** starts empty and adds the best attribute each round. **Backward elimination** starts full and removes the worst. **Decision-tree induction** (module 6) keeps the attributes the tree actually splits on. Each round evaluates candidates with a criterion such as information gain or validation accuracy, so forward selection to $k$ attributes costs about $pk$ evaluations.

**Numerosity reduction.** *Parametric* methods store a model instead of the data: a regression line, or a log-linear model of a multi-way table. *Non-parametric* methods store **histograms**, which are equal-width or equal-frequency bucket counts, or **clusters** represented by their centres and sizes, or **samples**.

**Sampling.** A *simple random sample without replacement* (SRSWOR) gives every subset of size $s$ the same chance. *With replacement* (SRSWR), a row can be drawn twice. Drawing $n$ times from $n$ rows covers on average $1 - (1 - 1/n)^n \\approx 1 - e^{-1} = 63.2\\%$ of them, which is the bootstrap's famous number. A **stratified** sample draws from each group, such as each country, in proportion or with a fixed size per group, so small groups are not lost. A **cluster** sample draws whole blocks, such as disk pages or stores, which is cheap to read but less precise. The key property for mining is that a sample's cost depends on $s$, not on the size of the database.`,
          resources: [
            zm(7, 'Dimensionality Reduction', 'PCA derived from variance maximisation, its SVD form, and kernel PCA. Work through the worked examples.', true),
            sk('decomposition', 'Decomposing signals in components', 'PCA, incremental PCA for data that do not fit in memory, and truncated SVD for sparse matrices.'),
            sk('feature_selection', 'Feature selection', 'Univariate filters, recursive feature elimination and sequential (forward and backward) selection.'),
            hanSlides(3, 'Data Preprocessing', 'The data reduction section: wavelets, PCA, attribute subset selection, histograms, clustering and sampling.'),
          ],
          exercises: [
            {
              slug: 'pca-by-hand',
              title: 'PCA by hand',
              prompt:
                'For the covariance matrix $\\begin{pmatrix} 4 & 2 \\\\ 2 & 1 \\end{pmatrix}$: (a) find the eigenvalues and eigenvectors; (b) what share of variance does the first component explain, and what does that say about the two attributes? (c) Repeat for $\\begin{pmatrix} 3 & 1 \\\\ 1 & 3 \\end{pmatrix}$. (d) Check both with `numpy.linalg.eigh`.',
              kind: 'problem',
              difficulty: 1,
              hint: 'The first matrix has eigenvalues 5 and 0, so the first component explains 100%: the second attribute is exactly half the first (perfectly correlated). The second has eigenvalues 4 and 2, so 66.7%.',
            },
            {
              slug: 'pca-customers',
              title: 'PCA of customers from scratch',
              prompt:
                'From the cleaned Online Retail data, build a table of the 4,334 customers with recency (days before 2011-12-10 of the last purchase), frequency (distinct invoices), monetary (total revenue), distinct products, mean distinct items per invoice and mean unit price. Apply `log1p`, standardise, and compute PCA with `numpy.linalg.svd`. Check the explained variance ratios against `sklearn.decomposition.PCA` to 1e-8. Interpret the loadings of the first two components and plot the customers in that plane.',
              kind: 'data-analysis',
              difficulty: 2,
              hint: 'The explained variance ratios are about 0.508, 0.209, 0.160, 0.090, 0.030 and 0.003. The first component loads on frequency, monetary and products together: it measures how much a customer buys overall.',
            },
            {
              slug: 'stratified-versus-random',
              title: 'Stratified versus simple random sampling',
              prompt:
                'Using the cleaned Online Retail lines, estimate each country\'s share of revenue from (a) 200 simple random samples of 1% of the lines and (b) 200 samples stratified by country with 1% from each country (at least one line each). For the five largest countries and five small ones, plot the spread of the estimates. Which method is better for small countries, and why?',
              kind: 'simulation',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why should attributes usually be standardised before PCA?',
              answerOutline:
                'PCA maximises variance in the original units, so an attribute with a large numeric range dominates the first component regardless of its importance; standardising gives each attribute unit variance.',
            },
            {
              question: 'What is the expected fraction of distinct rows in a sample of n drawn with replacement from n rows, and why?',
              answerOutline: 'Each row is missed with probability (1 - 1/n)^n, which tends to 1/e = 0.368, so about 63.2% of rows appear at least once.',
            },
            {
              question: 'When would you prefer attribute subset selection to PCA?',
              answerOutline:
                'When the reduced attributes must stay interpretable or cheap to collect, or when the task is supervised and the useful directions may have low variance; selection keeps original columns.',
            },
          ],
          quiz: [
            {
              question: 'A PCA of four standardised attributes gives eigenvalues 2.4, 0.8, 0.5 and 0.3. What share of variance do the first two components keep?',
              options: ['60%', '80%', '75%', '50%'],
              answer: 1,
              explanation:
                'The total variance is 4.0, the sum of the eigenvalues. The first two give $(2.4 + 0.8)/4.0 = 80\\%$. 60% is the first component alone.',
            },
            {
              question: 'You draw 10,000 rows *with replacement* from a table of 10,000 rows. About how many distinct rows does the sample contain?',
              options: ['10,000', '5,000', '3,679', '6,321'],
              answer: 3,
              explanation:
                'Each row is missed with probability $(1 - 1/10000)^{10000} \\approx e^{-1} = 0.368$. So about $63.2\\%$, or 6,321 rows, appear. 3,679 is the expected number of rows left out.',
            },
            {
              question: 'A retailer has 30 countries, one of which provides 85% of the rows. You want reliable revenue estimates for every country from a 1% sample. Which design fits best?',
              options: [
                'Stratified sampling by country, with a minimum number of rows per country',
                'Simple random sampling without replacement',
                'Cluster sampling of whole disk pages',
                'Simple random sampling with replacement',
              ],
              answer: 0,
              explanation:
                'A simple random 1% sample may contain almost no rows from small countries. Stratifying by country guarantees each one is represented. Cluster sampling of pages is cheap but correlated within a page, so it is less precise.',
            },
          ],
          relatedLessons: [
            'linear-algebra-computational/symmetric-matrices-and-svd/pseudoinverse-and-pca',
            'machine-learning/unsupervised-learning/pca-and-dimensionality-reduction',
            'modeling-and-learning/unsupervised-learning/principal-component-analysis',
          ],
        },
        {
          slug: 'transformation-and-discretization',
          title: 'Transformation and discretisation',
          summary:
            'Normalisation by min-max, z-score and decimal scaling; discretisation by binning, histograms, clustering and entropy; and generating concept hierarchies for numeric and nominal attributes.',
          estimatedMinutes: 145,
          objectives: [
            'Apply min-max, z-score and decimal-scaling normalisation by hand and in code, and say what each preserves',
            'Discretise an attribute by equal-width and equal-frequency binning and explain the trade-off',
            'Find the best binary cut point of a numeric attribute by information gain',
            'Build a concept hierarchy for numeric and nominal attributes, including one from distinct-value counts',
          ],
          concepts: [
            'Smoothing, attribute construction, aggregation',
            'Min-max normalisation',
            'Z-score normalisation',
            'Decimal scaling',
            'Unsupervised discretisation: equal width, equal frequency, clustering',
            'Supervised discretisation by entropy (information gain)',
            'Concept hierarchies and schema hierarchies',
          ],
          explanation: `**Transformation** puts data into a form mining can use. It includes smoothing (last lesson), **attribute construction** (revenue = quantity × price, or the weekday from a date), **aggregation** (daily sales into monthly totals, the basis of data cubes), normalisation, and discretisation.

**Normalisation** puts attributes on comparable scales, which matters for distances and gradient methods.

- **Min-max**: $v' = \\frac{v - \\min}{\\max - \\min}(\\text{new}_{\\max} - \\text{new}_{\\min}) + \\text{new}_{\\min}$. Delivery times range from 2 to 26 days, so 11 days maps to $9/24 = 0.375$ on $[0, 1]$, or $-0.25$ on $[-1, 1]$. It keeps the shape of the distribution, but a new value outside the old range falls outside the target range, and one outlier squashes everything else.
- **Z-score**: $v' = (v - \\bar A)/\\sigma_A$. With mean 8 and standard deviation 4, 11 days becomes 0.75. It is less sensitive to a single outlier, and more so if you use the mean absolute deviation instead of $\\sigma$.
- **Decimal scaling**: divide by $10^j$ for the smallest $j$ that makes every $|v'| < 1$. If the largest absolute value is 917, then $j = 3$ and 917 becomes 0.917.

Fit the parameters (min, max, mean, $\\sigma$) on training data only and reuse them, or information leaks from test data into the model.

**Discretisation** replaces a numeric attribute by intervals ("0 to 10", "10 to 20") or labels ("young", "middle", "senior"). It makes patterns readable, and it is required by many pattern-mining methods, which work on items. **Equal-width** bins are easy to explain but are dominated by skew: one huge order leaves most bins empty. **Equal-frequency** bins (quantiles) give each bin the same count, but they can split equal values or nearly equal ones. **Clustering** puts bin edges in gaps in the data. **Supervised** discretisation uses the class label. The entropy method tries every cut point $t$, scores the split by information gain, keeps the best, and recurses on each side until a stopping rule such as minimum description length (Fayyad and Irani) says to stop.

*Worked example.* Values 1 to 6 have classes a, a, a, b, b, a. The entropy before splitting, with 4 a and 2 b, is 0.918 bits. A cut at 3.5 gives a pure left side (a, a, a), and the right side (b, b, a) has entropy 0.918. The weighted entropy is $\\tfrac{3}{6}(0) + \\tfrac36(0.918) = 0.459$, so the gain is 0.459, the best of the five candidate cuts. A cut at 5.5 gains only 0.109.

**Concept hierarchies** organise values into levels, such as city, region, country, or day, month, quarter, year. Data cubes roll up and drill down along them. For numeric data, nested discretisations give a hierarchy. For nominal data, a schema may define one, and if not, a useful heuristic orders attributes by their number of distinct values: an attribute with fewer distinct values usually sits higher (country before city before street). That heuristic fails for time: there are only 7 weekdays but many more years-months, and weekday is not above month.`,
          resources: [
            { ...sk('preprocessing', 'Preprocessing data', 'StandardScaler, MinMaxScaler, RobustScaler and KBinsDiscretizer, with advice on fitting them inside a pipeline.'), primary: true },
            {
              title: 'Multi-Interval Discretization of Continuous-Valued Attributes for Classification Learning',
              url: 'https://www.ijcai.org/Proceedings/93-2/Papers/022.pdf',
              type: 'article',
              cost: 'free',
              provider: 'Fayyad and Irani, IJCAI 1993',
              note: 'The entropy-based discretisation with the MDL stopping rule. Sections 1 to 3 explain the method.',
            },
            hanSlides(3, 'Data Preprocessing', 'The transformation and discretisation section, including concept hierarchy generation.'),
          ],
          exercises: [
            {
              slug: 'normalise-by-hand',
              title: 'Normalise by hand and check in scikit-learn',
              prompt:
                'Ages in a training set range from 20 to 80, with mean 47 and standard deviation 15. (a) Map 35 to [0, 1] and to [-1, 1] by min-max, and compute its z-score. (b) A test record has age 92. What does min-max give it, and why is that a warning sign? (c) Reproduce (a) with `MinMaxScaler` and `StandardScaler` fitted on a small training array, and show that calling `fit` on the test data instead changes the answers.',
              kind: 'problem',
              difficulty: 1,
              hint: '35 maps to 0.25 on [0, 1], to -0.5 on [-1, 1], and to a z-score of -0.8. Age 92 maps to 1.2, outside the target range.',
            },
            {
              slug: 'entropy-cut',
              title: 'Entropy-based cut points',
              prompt:
                'Values 10, 20, ..., 80 have classes y, y, n, n, n, n, y, y. (a) Compute the information gain of each of the seven midpoint cuts. (b) Which cut or cuts are best, and why does a single binary cut struggle here? (c) Implement recursive entropy discretisation with a minimum bin size of 2 and show the intervals it produces.',
              kind: 'problem',
              difficulty: 2,
              hint: 'The two-class entropy before splitting is 1 bit. Cuts at 25 and at 65 tie for best, each with gain 0.311. Recursing on the larger side finds the other cut, giving three intervals.',
            },
            {
              slug: 'discretise-price',
              title: 'Discretise a skewed price',
              prompt:
                'Discretise UnitPrice of the cleaned Online Retail lines into 5 bins with `KBinsDiscretizer` using strategy "uniform", "quantile" and "kmeans". For each, report the bin edges and counts. Which would you use as an item attribute for pattern mining, and which as a cube dimension a manager reads? Compare them with the fixed bands under 1, 1 to 2, 2 to 5, 5 to 10, and 10 and over used later in this course.',
              kind: 'data-analysis',
              difficulty: 2,
              hint: 'The uniform strategy puts almost every line in the first bin because the maximum price is about 650. The fixed bands give counts of about 109k, 137k, 193k, 61k and 22k.',
            },
          ],
          selfAssessment: [
            {
              question: 'Why must normalisation parameters be fitted on training data only?',
              answerOutline:
                'Fitting on test data leaks information about the test distribution into the model and changes the meaning of the features between training and use; reusing training parameters mimics deployment.',
            },
            {
              question: 'Compare equal-width and equal-frequency binning on a right-skewed attribute.',
              answerOutline:
                'Equal-width bins put most values into the first bin and leave the tail bins nearly empty; equal-frequency bins balance counts but give narrow bins in dense regions and very wide ones in the tail.',
            },
            {
              question: 'When does the distinct-value heuristic for concept hierarchies fail?',
              answerOutline:
                'When the number of distinct values does not reflect generality, as with time: weekday has 7 values but is not a generalisation of month or year.',
            },
          ],
          quiz: [
            {
              question: 'Prices range from 10 to 210. What is 60 after min-max normalisation to $[-1, 1]$?',
              options: ['0.25', '-0.5', '-0.25', '0.5'],
              answer: 1,
              explanation:
                'On $[0, 1]$, 60 maps to $(60 - 10)/200 = 0.25$. Stretching to $[-1, 1]$ gives $-1 + 2(0.25) = -0.5$. 0.25 is the $[0, 1]$ value.',
            },
            {
              question: 'The largest absolute value of an attribute is 4,380. Under decimal scaling, what does $-1{,}250$ become?',
              options: ['-0.125', '-12.5', '-1.25', '-0.0125'],
              answer: 0,
              explanation:
                'You need the smallest $j$ with every $|v|/10^j < 1$. Since $4380/10^4 = 0.438$ while $4380/10^3 = 4.38$, $j = 4$, and $-1250$ becomes $-0.125$.',
            },
            {
              question: 'Values 1 to 6 have classes a, a, b, b, b, b. Which binary cut has the highest information gain?',
              options: ['1.5', '3.5', '4.5', '2.5'],
              answer: 3,
              explanation:
                'A cut at 2.5 splits the data into (a, a) and (b, b, b, b), both pure, so the gain equals the full entropy of 0.918 bits. Every other cut leaves one side mixed. 3.5 is the middle of the range, but it puts a b with the two a\'s.',
            },
          ],
          relatedLessons: ['machine-learning/foundations-and-workflow/data-and-feature-preparation'],
        },
      ],
    },
    {
      slug: 'data-warehousing-and-olap',
      title: 'Data Warehousing and OLAP',
      description:
        'Warehouses as the integrated, historical store that mining reads from; the multidimensional model with star and snowflake schemas; OLAP operations on data cubes; and how cubes are computed efficiently with materialisation, iceberg pruning and bottom-up computation.',
      lessons: [
        {
          slug: 'warehouses-and-the-multidimensional-model',
          title: 'Data warehouses and the multidimensional model',
          summary:
            'Why analysis gets its own database, how OLTP and OLAP differ, the three-tier architecture and ETL, and modelling facts and dimensions with star, snowflake and fact-constellation schemas.',
          estimatedMinutes: 145,
          objectives: [
            'State what makes a warehouse subject-oriented, integrated, time-variant and non-volatile, and contrast OLTP with OLAP',
            'Design a star schema for a business process by choosing the grain, the facts and the dimensions',
            'Explain when to snowflake a dimension and what it costs at query time',
            'Classify a measure as distributive, algebraic or holistic and say why it matters for cubes',
          ],
          concepts: [
            'Subject-oriented, integrated, time-variant, non-volatile',
            'OLTP versus OLAP workloads',
            'Three-tier architecture; ETL; data marts',
            'Fact table, measures, dimension tables',
            'Grain of a fact table',
            'Star, snowflake and fact constellation schemas',
            'Distributive, algebraic and holistic measures',
            'Concept hierarchies on dimensions',
          ],
          explanation: `An operational database runs the business. It takes many short transactions (insert an order, update a stock level) and serves current data, normalised to avoid update anomalies. That is **OLTP**. Analysis asks a different kind of question, such as "revenue by product category and quarter over the last three years". It reads millions of rows, rarely writes, and needs history. Running such queries on the operational system is slow, and it disturbs the transactions. So analysis gets its own store.

A **data warehouse**, in Inmon's classic definition, is **subject-oriented** (organised around sales, customers or products, not around applications), **integrated** (one set of names, units and keys across sources), **time-variant** (it keeps history, with time as a key dimension), and **non-volatile** (it is loaded and read, not updated in place). The usual architecture has three tiers. At the bottom, **ETL** (extract, transform, load) pulls data from sources, cleans and integrates it (module 2), and loads the warehouse. In the middle sits an **OLAP server**, and at the top are query, reporting and mining tools. A **data mart** is a warehouse for a single department.

**The multidimensional model.** A **fact table** records events at a stated **grain**, for example "one row per invoice line". Each row holds numeric **measures** (quantity, revenue) and foreign keys to **dimension tables** (date, product, customer, store) that describe the event. In a **star schema**, each dimension is one wide, denormalised table. Date, for example, carries day, month, quarter, year and weekday. Queries join the fact table to a few small dimensions, which is fast and easy to understand. A **snowflake schema** normalises dimensions into sub-tables (product → category → department). This saves a little space, but every query needs more joins, so star schemas are usually preferred. A **fact constellation** has several fact tables, such as sales and shipments, that share dimensions.

Choosing the grain comes first, because everything else follows from it. For UCI Online Retail, the natural grain is the invoice line. That gives a fact table of about 522,000 rows with quantity and revenue as measures, and dimensions for date, product (stock code and description), customer (ID and country) and invoice. Country belongs to the customer dimension, or to a separate geography dimension if you want a city-to-country hierarchy.

**Measures and aggregation.** A measure is **distributive** if the aggregate of the whole can be computed from aggregates of the parts: sum, count, min and max. It is **algebraic** if it is a fixed function of distributive ones. The average is sum divided by count, and the variance can be computed from count, sum and sum of squares. It is **holistic** if no bounded summary suffices, as with the median, the mode or a rank. Cubes can precompute distributive and algebraic measures cheaply. Holistic measures need the raw data or an approximation such as a quantile sketch.

**Concept hierarchies** on dimensions (day < month < quarter < year, city < country < region) are what OLAP navigates, as the next lesson shows.`,
          resources: [
            {
              title: 'Kimball Group: Dimensional Modeling Techniques',
              url: 'https://www.kimballgroup.com/data-warehouse-business-intelligence-resources/kimball-techniques/dimensional-modeling-techniques/',
              type: 'article',
              cost: 'free',
              provider: 'Kimball Group',
              note: 'Short pages on the four-step design process, grain, fact table types, conformed dimensions and slowly changing dimensions. Read the "Fundamental Concepts" group.',
              primary: true,
            },
            {
              title: 'Understand star schema and the importance for Power BI',
              url: 'https://learn.microsoft.com/en-us/power-bi/guidance/star-schema',
              type: 'documentation',
              cost: 'free',
              provider: 'Microsoft Learn',
              note: 'A clear, tool-neutral explanation of facts, dimensions, snowflaking and role-playing dimensions.',
            },
            hanSlides(4, 'Data Warehousing and Online Analytical Processing', 'Warehouse definition, architecture, the multidimensional model and schema types.'),
            hanBook('chapter 3 (data warehousing and online analytical processing)', 'Paid. The textbook treatment, including warehouse design and implementation.'),
          ],
          exercises: [
            {
              slug: 'star-schema-online-retail',
              title: 'A star schema for Online Retail',
              prompt:
                'Design and build a star schema for the cleaned Online Retail lines in DuckDB or SQLite: `fact_sales` (one row per invoice line, with quantity and revenue), `dim_date` (date, day, month, quarter, year, weekday, hour), `dim_product` (stock code, description, price band) and `dim_customer` (customer ID, country, with a row for "unknown customer"). Write the DDL, load it with pandas, and check that `SELECT SUM(revenue) FROM fact_sales` equals the revenue computed directly from the cleaned DataFrame. State the grain in one sentence.',
              kind: 'coding',
              difficulty: 2,
              hint: 'With the cleaning rules of this course, there are 522,504 fact rows and total revenue is about 10,246,821 (in pounds sterling).',
            },
            {
              slug: 'classify-measures',
              title: 'Classify measures',
              prompt:
                'For each measure, say whether it is distributive, algebraic or holistic, and how you would compute it for a quarter from three monthly summaries: total revenue; number of invoices; average line revenue; standard deviation of line revenue; maximum single-line quantity; median basket size; number of distinct customers; the 10 best-selling products. For the two hardest cases, name an approximate summary (for example a sketch) that makes them mergeable.',
              kind: 'writing',
              difficulty: 2,
              hint: 'Distinct customers is holistic: two months\' distinct counts cannot simply be added. A HyperLogLog sketch is mergeable and approximates it.',
            },
          ],
          selfAssessment: [
            {
              question: 'Give two reasons why analytical queries are not run directly on the operational database.',
              answerOutline:
                'They scan huge amounts of data and would slow down transactions; operational data lack history, are scattered over many systems and use inconsistent codes, so analysis needs integrated, historical data.',
            },
            {
              question: 'What is the grain of a fact table, and why decide it first?',
              answerOutline:
                'The event one row represents (for example one invoice line). It fixes which dimensions and measures make sense and the finest level of detail any query can reach.',
            },
            {
              question: 'Why is average an algebraic measure while median is holistic?',
              answerOutline:
                'Average is sum/count, and both parts are distributive, so partial summaries combine exactly; the median of a union cannot be computed from the medians (or any fixed-size summary) of the parts.',
            },
          ],
          quiz: [
            {
              question: 'Which measure is algebraic but not distributive?',
              options: ['Total quantity', 'Maximum price', 'Average revenue per invoice', 'Median basket size'],
              answer: 2,
              explanation:
                'An average is total revenue divided by the number of invoices, a fixed function of two distributive measures. Sum and max are distributive themselves, and the median is holistic.',
            },
            {
              question: 'A product dimension is split into product, subcategory and category tables linked by keys. What schema results, and what is the main cost?',
              options: [
                'A star schema; every query must scan the fact table twice',
                'A snowflake schema; queries need extra joins',
                'A fact constellation; the dimensions can no longer be shared',
                'A snowflake schema; the fact table must store the category name',
              ],
              answer: 1,
              explanation:
                'Normalising a dimension into a chain of tables is snowflaking. It saves a little space, but grouping by category now needs joins through the chain. In a star schema the product table would hold the category directly.',
            },
            {
              question: 'A warehouse keeps every month\'s customer address so that last year\'s sales can be reported by the region the customer lived in at the time. Which property of a warehouse does this illustrate?',
              options: ['Subject-oriented', 'Integrated', 'Non-volatile', 'Time-variant'],
              answer: 3,
              explanation:
                'Keeping history so that data can be analysed as of past points in time is what time-variant means. Non-volatile means rows are loaded and read rather than updated in place, which is related but is not the point here.',
            },
          ],
          relatedLessons: ['databases/advanced-sql-and-design/er-modelling-and-schema-design', 'databases/beyond-relational/column-stores-and-analytics'],
        },
        {
          slug: 'olap-operations',
          title: 'Data cubes and OLAP operations',
          summary:
            'The data cube as a lattice of cuboids; roll-up, drill-down, slice, dice and pivot along concept hierarchies; SQL GROUP BY with ROLLUP, CUBE and GROUPING SETS; and why averages must be rolled up from sums and counts.',
          estimatedMinutes: 145,
          objectives: [
            'Describe the data cube as a lattice of cuboids and count the cuboids with and without hierarchies',
            'Carry out roll-up, drill-down, slice, dice and pivot on a cube and say which cuboid each moves to',
            'Write the same analysis with SQL GROUP BY, ROLLUP, CUBE and GROUPING SETS',
            'Roll up an average correctly from sums and counts',
          ],
          concepts: [
            'Cuboid, base cuboid, apex cuboid',
            'Lattice of cuboids',
            'Number of cuboids with hierarchies',
            'Roll-up and drill-down',
            'Slice, dice and pivot',
            'GROUP BY ROLLUP, CUBE, GROUPING SETS',
            'Drill-through to the fact rows',
          ],
          explanation: `A **data cube** views a fact table as a multidimensional array: one axis per dimension, and a measure in each cell. Group the facts by any subset of the $n$ dimensions and you get a **cuboid**. Grouping by all $n$ gives the **base cuboid**, and grouping by none gives the **apex**, the grand total, written with $*$ in every position. The $2^n$ cuboids form a **lattice**: an edge goes from each cuboid to every cuboid with one dimension fewer, and any cuboid can be computed from any ancestor in the lattice.

Dimensions usually have **concept hierarchies**. If dimension $i$ has $L_i$ levels (not counting "all"), the number of cuboids is
$$\\prod_{i=1}^{n}(L_i + 1).$$
Suppose time has year, quarter and month (3 levels), location has region and city (2), and product has category and item (2). Then there are $4 \\cdot 3 \\cdot 3 = 36$ cuboids, against $2^3 = 8$ without hierarchies.

**OLAP operations** move around this lattice.

- **Roll-up** climbs a hierarchy (month to quarter) or drops a dimension. Sums and counts are added up.
- **Drill-down** is the reverse: quarter to month, or adding a dimension.
- **Slice** fixes one dimension to one value (location = West), which leaves a lower-dimensional sub-cube.
- **Dice** restricts several dimensions to sets of values (West or East, 2025, Electronics).
- **Pivot** rotates the view, swapping rows and columns. It changes the presentation, not the data.
- **Drill-through** goes from a cell to the fact rows behind it.

Explore a small sales cube below. Its three dimensions are time (year, quarter, month), location (region, city) and product (category, item).

\`\`\`interactive
mining-cube
{"rows": "time", "cols": "product", "measure": "sum", "caption": "The view starts at quarters by category: find the quarter in which Electronics jumps each year. Roll time up to years, then slice location to West and to East and compare 2024 with 2025: which region is growing? Switch the measure to the average sale and check that every total is the sum divided by the count, not an average of the averages. Watch the lattice: each operation moves you to a different cuboid."}
\`\`\`

**In SQL**, each cuboid is a \`GROUP BY\`. The extension \`GROUP BY ROLLUP(year, quarter, month)\` computes the $n + 1$ prefixes of a hierarchy: (year, quarter, month), (year, quarter), (year) and (). \`GROUP BY CUBE(a, b, c)\` computes all $2^3 = 8$ subsets, and \`GROUPING SETS\` lets you list exactly the ones you want. The function \`GROUPING(col)\` tells a real NULL apart from the "all" marker. DuckDB, PostgreSQL and most warehouses support all three.

**The averaging trap.** Suppose region A has 2 sales averaging 100 and region B has 8 sales averaging 50. The overall average is $(2 \\cdot 100 + 8 \\cdot 50)/10 = 60$, not $(100 + 50)/2 = 75$. An algebraic measure must be rolled up from its distributive parts (sum and count) and divided at the end. The same applies to ratios such as conversion rate or margin.

Cubes give mining a fast, interactive way to find where to look. A drill-down that shows one region's growth tells you which subset of the data to mine for patterns. This is sometimes called OLAP-based exploratory mining, or OLAM.`,
          resources: [
            {
              title: 'DuckDB documentation: GROUPING SETS, ROLLUP and CUBE',
              url: 'https://duckdb.org/docs/stable/sql/query_syntax/grouping_sets',
              type: 'documentation',
              cost: 'free',
              provider: 'DuckDB',
              note: 'The syntax and semantics of the three extensions and of GROUPING_ID, with examples you can run from Python.',
              primary: true,
            },
            {
              title: 'Data Cube: A Relational Aggregation Operator Generalizing Group-By, Cross-Tab, and Sub-Totals',
              url: 'https://arxiv.org/abs/cs/0701155',
              type: 'article',
              cost: 'free',
              provider: 'Gray, Bosworth, Layman and Pirahesh (1996)',
              note: 'The paper that introduced the CUBE operator. Sections 1 to 3 motivate it and define the "ALL" value.',
            },
            {
              title: 'Python Data Science Handbook: Pivot Tables',
              url: 'https://jakevdp.github.io/PythonDataScienceHandbook/03.09-pivot-tables.html',
              type: 'textbook',
              cost: 'free',
              provider: 'Jake VanderPlas',
              note: 'pandas pivot tables with margins, the quickest way to build a two-dimensional view of a cuboid.',
            },
            hanSlides(4, 'Data Warehousing and Online Analytical Processing', 'The data cube, concept hierarchies and the OLAP operations, with typical query examples.'),
          ],
          exercises: [
            {
              slug: 'olap-with-duckdb',
              title: 'OLAP queries on Online Retail',
              prompt:
                'On your star schema (previous lesson), write DuckDB queries for: (a) revenue by country and month for 2011 (a dice); (b) the roll-up of (a) to country only, and to the grand total, in one query with `ROLLUP`; (c) revenue by weekday and price band for the United Kingdom only (a slice); (d) the full `CUBE` over country, month, weekday and price band with a line count. How many rows does (d) return? (e) Pivot (c) in pandas so weekdays are columns.',
              kind: 'coding',
              difficulty: 2,
              hint: 'With 38 countries, 13 months, 6 weekdays (there are no Saturday invoices) and 5 price bands, the cube in (d) has 7,616 non-empty cells, of which 3,444 are in the base cuboid.',
            },
            {
              slug: 'count-cuboids',
              title: 'Count cuboids and cells',
              prompt:
                'A cube has dimensions date (day < month < quarter < year), store (store < city < country) and product (SKU < brand < category < department). (a) How many cuboids are there? (b) How many if hierarchies are ignored? (c) There are 3,650 days, 400 stores and 20,000 SKUs. How many cells can the base cuboid have, and why is the real number of non-empty cells far smaller? (d) Write the `GROUPING SETS` clause that computes only the cuboids (year, country), (year, department) and (quarter, city, category).',
              kind: 'problem',
              difficulty: 2,
              hint: 'With hierarchies there are (4 + 1)(3 + 1)(4 + 1) = 100 cuboids; without them, 2^3 = 8. The base cuboid has up to 3,650 × 400 × 20,000 = 29.2 billion cells, but most store-day-SKU combinations never sell.',
            },
            {
              slug: 'average-trap',
              title: 'The averaging trap in code',
              prompt:
                'Compute the average line revenue per country in the Online Retail cube two ways: (a) as `SUM(revenue) / COUNT(*)` from the base cells, and (b) as the mean of the monthly averages for that country. Report the five countries where the two differ most, and explain the size of the difference using the number of lines per month.',
              kind: 'data-analysis',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'How many cuboids does a cube with n dimensions and no hierarchies have, and what are the base and apex cuboids?',
              answerOutline: '2^n. The base cuboid groups by all n dimensions (finest cells); the apex groups by none (the grand total).',
            },
            {
              question: 'What is the difference between a slice and a dice?',
              answerOutline: 'A slice fixes one dimension to a single value; a dice selects subsets of values on two or more dimensions, giving a sub-cube.',
            },
            {
              question: 'Why must averages be rolled up from sums and counts?',
              answerOutline:
                'Groups have different sizes, so the mean of group means weights each group equally instead of each record; the correct average is total sum divided by total count.',
            },
          ],
          quiz: [
            {
              question: 'A cube has dimensions time (day, month, year), customer (customer, segment) and channel (no hierarchy). How many cuboids does it have?',
              options: ['8', '24', '12', '6'],
              answer: 1,
              explanation:
                'Each dimension contributes its number of levels plus one for "all": $(3 + 1)(2 + 1)(1 + 1) = 24$. 8 is $2^3$, which ignores the hierarchies.',
            },
            {
              question: 'How many grouping sets does `GROUP BY ROLLUP(year, quarter, month)` produce, compared with `GROUP BY CUBE(year, quarter, month)`?',
              options: ['3 and 6', '8 and 8', '4 and 8', '4 and 6'],
              answer: 2,
              explanation:
                'ROLLUP gives the $n + 1 = 4$ prefixes: (year, quarter, month), (year, quarter), (year) and (). CUBE gives all $2^3 = 8$ subsets, including combinations that make little sense for a hierarchy, such as (quarter) alone.',
            },
            {
              question: 'Store A had 30 sales averaging 40 pounds and store B had 10 sales averaging 80 pounds. What is the average sale across both stores?',
              options: ['60 pounds', '55 pounds', '40 pounds', '50 pounds'],
              answer: 3,
              explanation:
                'Roll up the sums and counts: $(30 \\cdot 40 + 10 \\cdot 80)/40 = 2000/40 = 50$. 60 is the average of the two averages, which gives store B\'s 10 sales as much weight as store A\'s 30.',
            },
            {
              question: 'You are looking at revenue by quarter and city. You switch to revenue by year and city. Which operation is that?',
              options: ['Roll-up', 'Drill-down', 'Slice', 'Pivot'],
              answer: 0,
              explanation:
                'Climbing the time hierarchy from quarter to year aggregates the cells, which is a roll-up. Drill-down goes the other way, a slice fixes one value, and a pivot only rearranges the axes.',
            },
          ],
          relatedLessons: ['databases/relational-model-and-sql/aggregation-grouping-and-subqueries', 'databases/advanced-sql-and-design/window-functions-ctes-and-recursion'],
        },
        {
          slug: 'cube-computation',
          title: 'Computing data cubes efficiently',
          summary:
            'Why full cubes explode, which cuboids to materialise, iceberg cubes and their Apriori-style pruning, the multiway array and BUC algorithms, and bitmap and join indexes for fast OLAP.',
          estimatedMinutes: 165,
          objectives: [
            'Count the cells a set of base cells generates and explain why sparse high-dimensional cubes explode',
            'Compare no, full and partial materialisation, and describe the greedy view-selection idea',
            'Define an iceberg cube and explain why count-based pruning is sound',
            'Trace BUC on a small table and describe how multiway array aggregation orders its chunks',
            'Explain how bitmap and join indexes speed up OLAP queries',
          ],
          concepts: [
            'Cell explosion: 2^n cells per base cell',
            'Full, none and partial materialisation',
            'Greedy view selection (benefit per view)',
            'Iceberg cube and the HAVING condition',
            'Anti-monotonic count pruning',
            'Multiway array aggregation and chunk ordering',
            'BUC: bottom-up computation by partitioning',
            'Bitmap and join indexes',
          ],
          explanation: `**Why cubes explode.** Each base cell $(a_1, \\dots, a_n)$ contributes to $2^n$ cells, one for every way of replacing values by $*$. Two base cells in three dimensions, $(a_1, b_1, c_1)$ and $(a_1, b_2, c_2)$, generate $2 \\cdot 8 = 16$ cells. Only $(a_1, *, *)$ and $(*, *, *)$ are shared, so there are 14 distinct cells. With 10 dimensions, each base cell touches 1,024 cells, and in sparse data most of them have a count of 1. The full cube can be far bigger than the fact table.

**What to materialise.** With *no* materialisation every query aggregates the base data, which is slow. *Full* materialisation computes every cuboid, which is fast but often infeasible. **Partial** materialisation precomputes a chosen set of cuboids and answers other queries from the nearest materialised ancestor in the lattice. The classic greedy algorithm of Harinarayan, Rajaraman and Ullman repeatedly adds the cuboid with the largest **benefit**: the total reduction in rows scanned across all the cuboids it can answer. It is provably within a constant factor of optimal.

**Iceberg cubes.** Analysts rarely care about cells with tiny counts. An **iceberg cube** keeps only cells that satisfy a condition such as \`HAVING COUNT(*) >= min_sup\`. Count is **anti-monotonic**: if cell $(a_1, b_1, *)$ has a count below the threshold, every more specific cell $(a_1, b_1, c_j)$ does too. A computation can therefore stop descending as soon as a cell fails. This is the same idea as Apriori in the next module. On the cleaned Online Retail lines, the cube over country, month, weekday and price band has 7,616 non-empty cells. Only 1,822 have at least 100 lines, and in the base cuboid only 396 of 3,444 survive.

**BUC (bottom-up cube).** BUC starts from the apex and partitions the data on the first dimension. For each value $a_i$ whose partition meets min_sup, it outputs the cell $(a_i, *, \\dots)$ and recurses on that partition with the remaining dimensions. A partition that is too small is never split further. Order the dimensions so that the ones with the most distinct values come first, because they produce small partitions early and prune the most.

**Multiway array aggregation** is suited to dense cubes stored as arrays. It divides the array into chunks and visits each chunk once, adding its values into all the 2-D planes at the same time. The visiting order decides the memory needed. For dimensions with sizes $|A| = 20$, $|B| = 200$ and $|C| = 2000$, each split into 4 chunks, scanning with $A$ varying fastest needs the whole $AB$ plane (4,000 cells), one row of $AC$ chunks (10,000) and one $BC$ chunk (25,000): 39,000 cells in all. The reverse order needs over 410,000. The rule is to keep the plane of the smallest dimensions whole.

**Indexes.** A **bitmap index** stores one bit vector per value of a low-cardinality attribute. "Country = France AND price band = 2 to 5" then becomes the AND of two bit vectors. A **join index** precomputes which fact rows join to each dimension value, so star joins do not have to be recomputed.

Modern column stores (DuckDB, ClickHouse, BigQuery) compute group-bys so quickly that many cubes are now computed on demand, but materialised aggregates and iceberg pruning are still how high-dimensional cubes and dashboards over very large data stay interactive.`,
          resources: [
            hanSlides(5, 'Data Cube Technology', 'Cube computation: full, iceberg and closed cubes, multiway array aggregation, BUC, Star-Cubing and shell fragments.'),
            {
              title: 'Data Cube: A Relational Aggregation Operator Generalizing Group-By, Cross-Tab, and Sub-Totals',
              url: 'https://arxiv.org/abs/cs/0701155',
              type: 'article',
              cost: 'free',
              provider: 'Gray, Bosworth, Layman and Pirahesh (1996)',
              note: 'Section 5 classifies aggregate functions as distributive, algebraic and holistic and sketches how to compute cubes for each.',
              primary: true,
            },
            {
              title: 'Stanford CS246: Mining Massive Data Sets',
              url: 'https://web.stanford.edu/class/cs246/',
              type: 'course',
              cost: 'free',
              provider: 'Stanford University',
              note: 'The course page links its lecture slides; use it for the scalable-computation view (MapReduce and Spark) of aggregations like these.',
            },
            hanBook('chapter 4 (data cube technology, in the 3rd edition chapter 5)', 'Paid. Full treatment of the cube computation algorithms.'),
          ],
          exercises: [
            {
              slug: 'buc-from-scratch',
              title: 'BUC from scratch, checked against DuckDB',
              prompt:
                'Implement BUC in Python for a pandas DataFrame with a list of dimensions and a `min_sup` on count: partition with `groupby`, recurse on each large-enough partition, and yield `(cell, count, revenue)` with `"*"` for aggregated dimensions. On the cleaned Online Retail lines with dimensions country, month, weekday and price band, check that with `min_sup = 1` you produce exactly the 7,616 cells that DuckDB\'s `GROUP BY CUBE` returns (with the same counts), and that with `min_sup = 100` you produce the 1,822 cells that `HAVING COUNT(*) >= 100` keeps. Time both settings and try two dimension orders.',
              kind: 'coding',
              difficulty: 3,
              hint: 'Order the dimensions by decreasing cardinality (country 38, month 13, weekday 6, price band 5) so that small partitions appear early and are pruned.',
            },
            {
              slug: 'cells-by-hand',
              title: 'Cells from base cells',
              prompt:
                'A four-dimensional cube has three base cells: (a1, b1, c1, d1), (a1, b1, c2, d2) and (a2, b1, c1, d2). (a) How many distinct non-empty cells does the full cube have? (b) Which cells have a count of at least 2? (c) Write a 10-line Python script that enumerates the cells and confirms (a) and (b).',
              kind: 'problem',
              difficulty: 2,
              hint: 'Each base cell generates 16 cells, 48 in all, and 38 of them are distinct. The cells with a count of at least 2 include (*, b1, *, *) with count 3 and (a1, b1, *, *) with count 2.',
            },
            {
              slug: 'greedy-views',
              title: 'Greedy view selection',
              prompt:
                'A 3-D cube over (part, supplier, customer) has cuboid sizes: psc 6M, pc 6M, ps 0.8M, sc 6M, p 0.2M, s 0.01M, c 0.1M, apex 1. The base cuboid psc is always materialised. Run the greedy benefit algorithm by hand for three picks, where benefit is the total reduction in rows scanned over all cuboids that the new view can answer more cheaply. Then write a short Python version that reproduces your picks.',
              kind: 'problem',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'Why is it sound to stop exploring below a cell whose count is under min_sup?',
              answerOutline:
                'Count is anti-monotonic: any more specific cell covers a subset of the same rows, so its count cannot be larger; none of its descendants can pass the threshold.',
            },
            {
              question: 'What does partial materialisation trade off, and how does the greedy algorithm choose views?',
              answerOutline:
                'Storage and refresh time against query speed. Greedy repeatedly adds the cuboid whose materialisation most reduces the total cost of answering all cuboids from their cheapest materialised ancestor.',
            },
            {
              question: 'When does a bitmap index help, and when does it not?',
              answerOutline:
                'It helps for low-cardinality attributes and conjunctive selections (fast bitwise AND/OR, compressible); for high-cardinality attributes it needs one long bitmap per value and loses its advantage.',
            },
          ],
          quiz: [
            {
              question: 'A three-dimensional cube has two base cells, $(a_1, b_1, c_1)$ and $(a_2, b_1, c_2)$. How many distinct non-empty cells does the full cube contain?',
              options: ['16', '12', '14', '8'],
              answer: 2,
              explanation:
                'Each base cell generates $2^3 = 8$ cells. They share only $(*, b_1, *)$ and $(*, *, *)$, so there are $16 - 2 = 14$ distinct cells. 16 double-counts the shared cells, and 8 is the number of cuboids.',
            },
            {
              question: 'In an iceberg cube with `min_sup = 50`, the cell (France, 2011-03, *, *) has a count of 31. What can BUC conclude?',
              options: [
                'No cell (France, 2011-03, w, p), for any weekday w or price band p, can have a count of 50 or more',
                'The cell (France, *, *, *) also has a count below 50',
                'Nothing, because counts can grow when more dimensions are fixed',
                'Every cell (France, 2011-03, w, p) must have a count of exactly 31',
              ],
              answer: 0,
              explanation:
                'Fixing more dimensions selects a subset of the same rows, so counts can only shrink. That is anti-monotonicity, and it lets BUC skip the whole subtree. The more general cell (France, \\*, \\*, \\*) covers more rows and can easily pass.',
            },
            {
              question: 'Multiway array aggregation computes the 2-D planes of a cube with $|A| = 10$, $|B| = 100$, $|C| = 1000$. Which plane should be kept in memory whole?',
              options: ['The BC plane', 'The AC plane', 'Whichever plane is visited first', 'The AB plane'],
              answer: 3,
              explanation:
                'Keep the plane of the two smallest dimensions whole, here $AB$ with 1,000 cells, and hold only a row or a single chunk of the larger planes. Keeping $BC$, with 100,000 cells, whole is the most expensive choice.',
            },
          ],
          relatedLessons: ['databases/beyond-relational/column-stores-and-analytics', 'databases/query-processing-and-optimization/join-algorithms-sorting-and-hashing'],
        },
      ],
    },
    {
      slug: 'frequent-pattern-mining',
      title: 'Frequent Patterns, Associations and Correlations',
      description:
        'The core pattern-mining problem: find every itemset that occurs often, turn the itemsets into rules, and decide which rules are interesting. Apriori and its improvements, FP-growth and vertical mining, closed and maximal patterns, and the null-invariant measures that keep correlation analysis honest.',
      lessons: [
        {
          slug: 'frequent-itemsets-and-association-rules',
          title: 'Frequent itemsets and association rules',
          summary:
            'Itemsets, support and confidence; the downward closure property; closed and maximal itemsets as lossless and lossy summaries; and how rules are generated from frequent itemsets.',
          estimatedMinutes: 135,
          objectives: [
            'Compute absolute and relative support of an itemset and support and confidence of a rule from a transaction table',
            'State the downward closure (Apriori) property and use it to rule out itemsets without counting them',
            'Identify closed and maximal frequent itemsets and explain what each summary preserves',
            'Generate all rules from a frequent itemset and filter them by confidence',
          ],
          concepts: [
            'Item, itemset, k-itemset, transaction',
            'Absolute and relative support',
            'Minimum support; frequent itemset',
            'Association rule; support and confidence',
            'Downward closure (Apriori property)',
            'Closed frequent itemset',
            'Maximal frequent itemset',
            'Rule generation from frequent itemsets',
          ],
          explanation: `A **transaction** is a set of items, such as one basket or one invoice. An **itemset** with $k$ items is a $k$-itemset. The **absolute support** of an itemset $X$ is the number of transactions that contain it, and its **relative support** is that number divided by the number of transactions $N$. $X$ is **frequent** if its support is at least a user-chosen **minimum support**.

An **association rule** $A \\Rightarrow B$, with $A$ and $B$ disjoint itemsets, has
$$\\text{support}(A \\Rightarrow B) = P(A \\cup B), \\qquad \\text{confidence}(A \\Rightarrow B) = P(B \\mid A) = \\frac{\\text{sup}(A \\cup B)}{\\text{sup}(A)}.$$
Here $A \\cup B$ means a transaction contains *all* items of both sides. Mining rules therefore takes two steps: find all frequent itemsets, which is the expensive part, then generate the strong rules from them.

Here is a running example of 10 baskets.

| T | items | T | items |
|---|---|---|---|
| 1 | bread, milk, butter | 6 | milk, eggs, butter |
| 2 | bread, jam | 7 | bread, milk, eggs, butter, jam |
| 3 | milk, eggs | 8 | bread, eggs |
| 4 | bread, milk, eggs, butter | 9 | bread, milk, butter |
| 5 | bread, milk, jam | 10 | milk, butter |

The supports are milk 8, bread 7, butter 6, eggs 5 and jam 3. {butter, milk} has support 6, so the rule butter ⇒ milk has confidence $6/6 = 1$, while milk ⇒ butter has $6/8 = 0.75$. With a minimum support of 3 there are 14 frequent itemsets: 5 single items, 7 pairs and 2 triples, {bread, butter, milk} with 4 and {butter, eggs, milk} with 3.

**Downward closure.** Every subset of a frequent itemset is frequent. Equivalently, if $X$ is infrequent, every superset of $X$ is infrequent, because a transaction containing the superset contains $X$. Since {butter, jam} has support 1, no itemset containing both can be frequent, and none of them needs counting. Every efficient algorithm builds on this property.

**Too many patterns.** A frequent 100-itemset has $2^{100} - 1$ frequent non-empty subsets. Two summaries help:

- A frequent itemset is **closed** if no proper superset has the *same* support. The closed itemsets and their supports determine the support of every frequent itemset, so this summary is lossless. In the example, butter (6) is not closed because {butter, milk} also has 6. There are 10 closed itemsets.
- A frequent itemset is **maximal** if no proper superset is frequent at all. The maximal itemsets tell you *which* itemsets are frequent, but not their supports, so this summary is lossy. Here there are 4: {bread, eggs}, {bread, jam}, {bread, butter, milk} and {butter, eggs, milk}.

**Rule generation.** For each frequent itemset $l$ and each non-empty proper subset $s$, output $s \\Rightarrow l \\setminus s$ if $\\text{sup}(l)/\\text{sup}(s) \\ge$ min_conf. No new scan is needed, because all the supports are already known. From {bread, butter, milk}, the rule {bread, butter} ⇒ milk has confidence $4/4 = 1$, while bread ⇒ {butter, milk} has only $4/7 = 0.57$.`,
          resources: [
            zm(8, 'Itemset Mining', 'Definitions, the itemset lattice, and Apriori, Eclat and FP-growth in one consistent notation. Sections 8.1 and 8.2 for this lesson.', true),
            zm(9, 'Summarizing Itemsets', 'Closed, maximal and non-derivable itemsets, with the algorithms that mine them directly.'),
            patternsCourse('Han\'s own Coursera course; lectures 1.1 to 2.1 cover this lesson. Auditing is free.'),
            hanSlides(6, 'Mining Frequent Patterns, Associations and Correlations', 'Basic concepts: support, confidence, closed and maximal patterns.'),
          ],
          exercises: [
            {
              slug: 'supports-by-hand',
              title: 'Supports, confidences, closed and maximal',
              prompt:
                'Using the 10 baskets in the lesson with a minimum support of 2 (instead of 3): (a) list every frequent itemset with its support; (b) mark which are closed and which are maximal; (c) list every rule from {bread, butter, eggs, milk} with confidence at least 0.6. Check (a) and (b) with a short brute-force Python script that enumerates all subsets.',
              kind: 'problem',
              difficulty: 2,
              hint: 'At a minimum support of 2 there are 19 frequent itemsets, 12 closed and 2 maximal: {bread, jam, milk} and {bread, butter, eggs, milk}, each with support 2.',
            },
            {
              slug: 'brute-force-miner',
              title: 'A brute-force miner and its limits',
              prompt:
                'Write `brute_force(transactions, min_sup)` that enumerates every subset of the item universe, counts it, and returns the frequent ones. Time it on random transaction databases with 1,000 transactions of 8 items drawn from universes of 10, 15, 20 and 25 items. Plot time against universe size on a log scale and estimate the growth rate. Then explain in two sentences why even a fast implementation cannot reach 100 items.',
              kind: 'coding',
              difficulty: 1,
            },
            {
              slug: 'baskets-from-online-retail',
              title: 'From invoice lines to baskets',
              prompt:
                'From the cleaned Online Retail lines, keep the United Kingdom and build one basket per InvoiceNo as a sorted list of distinct StockCodes. Report the number of baskets, the mean and median basket size, and the 10 items with the highest relative support. Encode the baskets with `mlxtend.preprocessing.TransactionEncoder` and check the item supports agree with a pandas `value_counts` on distinct (invoice, item) pairs.',
              kind: 'data-analysis',
              difficulty: 1,
              hint: 'There are 17,901 UK baskets with a mean size of 26.5 and a median of 15. The most frequent item is the white hanging heart T-light holder (85123A), in about 11.7% of baskets.',
            },
          ],
          selfAssessment: [
            {
              question: 'State the downward closure property and explain why it is true.',
              answerOutline:
                'Every subset of a frequent itemset is frequent (equivalently, supersets of infrequent itemsets are infrequent), because any transaction containing an itemset also contains each of its subsets, so support cannot increase as items are added.',
            },
            {
              question: 'What can you recover from the closed frequent itemsets that you cannot recover from the maximal ones?',
              answerOutline:
                'The exact support of every frequent itemset: the support of X equals the largest support of a closed superset of X. Maximal itemsets give only which itemsets are frequent.',
            },
            {
              question: 'Why does rule generation need no further scans of the data?',
              answerOutline: 'Confidence is sup(l)/sup(s), and both supports were already counted while mining frequent itemsets, since every subset of a frequent itemset is frequent.',
            },
          ],
          quiz: [
            {
              question: 'In 200 transactions, {coffee} appears in 80, {biscuits} in 50 and {coffee, biscuits} in 30. What are the support and confidence of coffee ⇒ biscuits?',
              options: ['Support 15%, confidence 60%', 'Support 15%, confidence 37.5%', 'Support 40%, confidence 37.5%', 'Support 25%, confidence 60%'],
              answer: 1,
              explanation:
                'The support is $30/200 = 15\\%$ and the confidence is $\\text{sup}(\\{coffee, biscuits\\})/\\text{sup}(\\{coffee\\}) = 30/80 = 37.5\\%$. 60% is the confidence of the reverse rule, biscuits ⇒ coffee ($30/50$).',
            },
            {
              question: 'At some minimum support, {a, b} has support 9 and {a, b, c} has support 9. All other supersets of {a, b} have smaller supports, and {a, b, c, d} is frequent. Which is true?',
              options: [
                '{a, b} is closed but not maximal',
                '{a, b} is maximal but not closed',
                '{a, b} is neither closed nor maximal',
                '{a, b} is both closed and maximal',
              ],
              answer: 2,
              explanation:
                'It is not closed, because a proper superset, {a, b, c}, has the same support. It is not maximal, because it has frequent supersets. A maximal itemset is always closed, but not the other way round.',
            },
            {
              question: 'An itemset {x, y, z} is frequent at minimum support 4%. Which of these must also be frequent?',
              options: ['{x, y}', '{x, y, z, w} for some item w', '{w}, for every item w', 'Nothing else is guaranteed'],
              answer: 0,
              explanation:
                'By downward closure every subset of a frequent itemset is frequent, so {x, y} is. Supersets can be infrequent, and items unrelated to {x, y, z} say nothing either way.',
            },
          ],
        },
        {
          slug: 'apriori-algorithm',
          title: 'The Apriori algorithm',
          summary:
            'Level-wise search with candidate generation by join and prune, counting with one scan per level, its cost, and the improvements that cut scans and candidates: hashing, transaction reduction, partitioning and sampling.',
          estimatedMinutes: 165,
          objectives: [
            'Run Apriori by hand: generate candidates by the join and prune steps and count them level by level',
            'Explain why the prune step is safe and how many database scans Apriori needs',
            'Estimate Apriori\'s cost and identify when candidate generation becomes the bottleneck',
            'Describe the hashing, transaction-reduction, partitioning and sampling improvements and what each saves',
          ],
          concepts: [
            'Level-wise search',
            'Candidate generation: self-join on the first k - 2 items',
            'Prune step by downward closure',
            'One scan per level; support counting with hash trees or tries',
            'DHP: hashing 2-itemsets into buckets',
            'Transaction reduction',
            'Partitioning: two scans in total',
            'Sampling with a lowered threshold (Toivonen)',
          ],
          explanation: `**Apriori** (Agrawal and Srikant, 1994) searches the itemset lattice one level at a time. $L_k$ is the set of frequent $k$-itemsets and $C_k$ the set of candidates.

1. Scan the database once to count every item, and keep the frequent ones as $L_1$.
2. **Join**: build $C_{k}$ by combining pairs of itemsets in $L_{k-1}$ that agree on their first $k - 2$ items (with the items kept in sorted order).
3. **Prune**: delete any candidate that has a $(k-1)$-subset not in $L_{k-1}$. By downward closure it cannot be frequent.
4. **Count**: scan the database once, incrementing the count of every candidate each transaction contains, and keep the frequent ones as $L_k$.
5. Repeat until $C_k$ is empty.

Here are the 10 baskets from the last lesson with a minimum support of 3. $L_1$ has all 5 items. All $\\binom52 = 10$ pairs are candidates, and 7 survive: {bread, butter} 4, {bread, eggs} 3, {bread, jam} 3, {bread, milk} 5, {butter, eggs} 3, {butter, milk} 6 and {eggs, milk} 4. The join gives 7 triples. Pruning removes {bread, butter, jam}, {bread, eggs, jam} and {bread, jam, milk}, because {butter, jam}, {eggs, jam} and {jam, milk} are infrequent. Only 4 triples are counted, and 2 are frequent. Their join produces no 4-itemset, so the search stops after 3 scans having counted 19 candidates, against $2^5 - 1 = 31$ possible itemsets. Step through it below, then move the sliders.

\`\`\`interactive
mining-apriori
{"transactions": ["bread,milk,butter", "bread,jam", "milk,eggs", "bread,milk,eggs,butter", "bread,milk,jam", "milk,eggs,butter", "bread,milk,eggs,butter,jam", "bread,eggs", "bread,milk,butter", "milk,butter"], "minSup": 3, "minConf": 0.7, "caption": "Step through the levels at minSup 3 and find the three triples the prune step removes before counting. Then lower minSup to 2 and watch C3 and L3 grow and a 4-itemset appear. In the rules table, compare bread → milk (confidence 0.71) with its lift of 0.89: a confident rule can still be a negative correlation."}
\`\`\`

**Cost.** Apriori needs $k_{\\max} + 1$ scans at most, where $k_{\\max}$ is the size of the largest frequent itemset. The real danger is the number of candidates. With $10^4$ frequent items, $C_2$ has about $5 \\times 10^7$ pairs, and a long frequent pattern forces the generation of all its subsets. Counting is made fast with a hash tree or trie, so that each transaction is matched only against the candidates it could contain.

**Improvements.**

- **Hashing (DHP).** While counting items in the first scan, hash every pair in each transaction into a table of bucket counters. A pair whose bucket total is below min_sup cannot be frequent, so it is dropped from $C_2$. This often shrinks $C_2$ dramatically.
- **Transaction reduction.** A transaction that contains no frequent $k$-itemset cannot contain a frequent $(k+1)$-itemset, so skip it in later scans.
- **Partitioning.** Split the data into chunks that fit in memory and mine each chunk at the same *relative* support. Any globally frequent itemset must be frequent in at least one chunk, so the union of local results is a complete candidate set, and one more scan counts it. That is two scans in total.
- **Sampling.** Mine a random sample at a slightly lowered threshold, then verify the result on the full data. Toivonen's method also checks the "negative border" to detect whether anything was missed.

In Python, \`mlxtend.frequent_patterns.apriori\` is a convenient reference to test your own code against. On 17,901 UK baskets from Online Retail at 2% support, it finds 412 frequent itemsets. FP-growth, in the next lesson, finds the same 412 several times faster.`,
          resources: [
            {
              title: 'Fast Algorithms for Mining Association Rules',
              url: 'https://www.vldb.org/conf/1994/P487.PDF',
              type: 'article',
              cost: 'free',
              provider: 'Agrawal and Srikant, VLDB 1994',
              note: 'The Apriori paper. Section 2.1 gives the algorithm and the candidate generation with join and prune; section 2.2 the hash tree.',
              primary: true,
            },
            mmds('chapter 6, Frequent Itemsets', 'A-priori with memory layouts for pair counting, PCY hashing, the multistage and multihash variants, and the SON and Toivonen algorithms for large data.'),
            {
              title: 'mlxtend user guide: apriori',
              url: 'https://rasbt.github.io/mlxtend/user_guide/frequent_patterns/apriori/',
              type: 'documentation',
              cost: 'free',
              provider: 'Sebastian Raschka',
              note: 'The reference implementation used to check your own code in this course and in MP 2.',
            },
            patternsCourse('Lectures on Apriori and its extensions (module 2).'),
          ],
          exercises: [
            {
              slug: 'apriori-from-scratch',
              title: 'Apriori from scratch',
              prompt:
                'Implement `apriori(transactions, min_sup)` with the join and prune steps and one pass over the data per level, storing candidates in a dict keyed by sorted tuples. Instrument it to report, per level, the number of candidates after the join, after the prune, and frequent. (a) On the 10 baskets of the lesson at min_sup 3, check you get candidates 5, 10 and 7 → 4, frequent 5, 7 and 2. (b) On the UK Online Retail baskets at relative support 0.02, check your itemsets and counts match `mlxtend.frequent_patterns.apriori` exactly.',
              kind: 'coding',
              difficulty: 2,
              hint: 'At relative support 0.02 (at least 359 of the 17,901 baskets) there are 412 frequent itemsets: 301 single items, 106 pairs and 5 triples.',
            },
            {
              slug: 'dhp-bucket-counts',
              title: 'Hashing pairs to prune C2',
              prompt:
                'Add DHP to your Apriori: during the first scan, hash every pair in each transaction into a table of B bucket counters with `hash(pair) % B`. Before counting C2, drop pairs whose bucket count is below min_sup. On the UK baskets at relative support 0.02, report |C2| without hashing and with B = 10^4, 10^5 and 10^6, and the time of the second scan. Explain why the hashing is safe (never drops a frequent pair).',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'partition-two-scans',
              title: 'Partitioning in two scans',
              prompt:
                'Split the UK baskets into 4 chunks by date. Mine each chunk at relative support 0.02 with your Apriori, take the union of the local frequent itemsets as candidates, and count them in one pass over all the data. Show that the result equals the single-pass result, report how many candidates were false positives, and explain why no globally frequent itemset can be missed.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why can a candidate that has an infrequent (k-1)-subset be deleted without counting it?',
              answerOutline: 'By downward closure, if any subset is infrequent the itemset itself is infrequent, so counting it can only confirm what is already known.',
            },
            {
              question: 'What limits Apriori on dense data or at low support?',
              answerOutline:
                'The number of candidates explodes (all subsets of long patterns are generated) and each level needs a full scan; counting huge candidate sets per transaction becomes the bottleneck.',
            },
            {
              question: 'Why does partitioning need only two scans, and why is it complete?',
              answerOutline:
                'Scan 1 mines each memory-sized chunk locally; scan 2 counts the union of local results globally. An itemset frequent overall must reach the relative threshold in at least one chunk, so it is always a candidate.',
            },
          ],
          quiz: [
            {
              question: '$L_2 = \\{ab, ac, ad, bc, bd\\}$, with items in alphabetical order. After the join and prune steps, what is $C_3$?',
              options: ['{abc, abd, acd, bcd}', '{abc, abd}', '{abc, abd, acd}', '{abc, abd, bcd}'],
              answer: 1,
              explanation:
                'The join pairs itemsets that share the first item: $a$ gives abc, abd and acd, and $b$ gives bcd. Pruning then removes acd (cd is not in $L_2$) and bcd (cd again). abc and abd survive, because all their 2-subsets are frequent.',
            },
            {
              question: 'The largest frequent itemset in a database has 6 items. At most how many full database scans does basic Apriori make?',
              options: ['6', '2', '12', '7'],
              answer: 3,
              explanation:
                'Apriori makes one scan per level for $k = 1, \\dots, 6$. If the join of $L_6$ still produces 7-candidates, a seventh scan counts them and finds none frequent. So 7 is the maximum, and 6 scans suffice when $C_7$ is empty. Two scans is what the partitioning variant needs.',
            },
            {
              question: 'Partitioning splits 1,000,000 transactions into 4 equal chunks and mines each at 1% relative support. Itemset X has 2,400, 2,600, 2,400 and 2,500 occurrences in the four chunks. Is X found, and is it globally frequent?',
              options: [
                'It is not found locally, but it is globally frequent, so partitioning misses it',
                'It is found locally, but it is not globally frequent',
                'It is found locally and it is globally frequent',
                'It is not found and it is not globally frequent',
              ],
              answer: 1,
              explanation:
                'Each chunk has 250,000 transactions, so the local threshold is 2,500. X reaches it in the second and fourth chunks, so it becomes a candidate. In the second scan its global count is $2400 + 2600 + 2400 + 2500 = 9{,}900$, below the global threshold of 10,000, so it is discarded. Partitioning can produce such false candidates, but it can never miss a globally frequent itemset.',
            },
          ],
        },
        {
          slug: 'fp-growth-and-vertical-mining',
          title: 'FP-growth and vertical mining',
          summary:
            'Mining without candidate generation: build a compressed FP-tree in two scans, mine it recursively through conditional pattern bases, and compare with Eclat\'s vertical tid-list intersections and with closed and maximal miners.',
          estimatedMinutes: 165,
          objectives: [
            'Build an FP-tree by hand from a small database, with the header table and node links',
            'Mine the FP-tree recursively with conditional pattern bases and conditional FP-trees',
            'Mine the same database with Eclat by intersecting tid-lists, and explain diffsets',
            'Compare Apriori, FP-growth and Eclat on scans, memory and the kind of data where each wins',
          ],
          concepts: [
            'FP-tree: frequency-ordered prefix tree',
            'Header table and node links',
            'Conditional pattern base',
            'Conditional FP-tree and recursion (divide and conquer)',
            'Single-path shortcut',
            'Vertical format: tid-lists',
            'Eclat and diffsets',
            'Mining closed and maximal itemsets directly (CHARM, FPmax)',
          ],
          explanation: `Apriori's weakness is candidate generation. **FP-growth** (Han, Pei and Yin, 2000) avoids it. It compresses the database into a tree and grows patterns from it by divide and conquer.

**Building the FP-tree (two scans).** In scan 1, count the items and drop the infrequent ones. In scan 2, sort each transaction's frequent items by descending support, breaking ties in a fixed order, and insert the result as a path from the root, sharing prefixes with paths already there. Each node holds an item and a count, and a **header table** links all the nodes of each item. Frequent items come first, so the paths share long prefixes, and the tree is often much smaller than the data.

*Worked example*, with a minimum support of 3:

| T | items | sorted frequent items |
|---|---|---|
| 1 | milk, bread, eggs | bread, eggs, milk |
| 2 | bread, butter | bread, butter |
| 3 | milk, bread, butter | bread, milk, butter |
| 4 | milk, eggs | eggs, milk |
| 5 | milk, bread, butter, eggs | bread, eggs, milk, butter |
| 6 | bread, eggs | bread, eggs |

The supports are bread 5, eggs 4, milk 4 and butter 3. The tie between eggs and milk is broken alphabetically. The tree has a root with two children, bread:5 and eggs:1. Under bread:5 are eggs:3 (which has the child milk:2, which has butter:1), butter:1, and milk:1 (with butter:1). Under the root's eggs:1 is milk:1.

**Mining.** Process the items from the bottom of the header table up.

- **butter**: follow its node links and collect the prefix paths, each with butter's count there. This is its **conditional pattern base**: {bread, eggs, milk}:1, {bread}:1 and {bread, milk}:1. In it, bread has count 3, milk 2 and eggs 1, so only bread is frequent. That gives {bread, butter}:3.
- **milk**: the base is {bread, eggs}:2, {bread}:1 and {eggs}:1. Bread and eggs both reach 3. The conditional FP-tree is bread:3 → eggs:2 plus eggs:1, which gives {bread, milk}:3 and {eggs, milk}:3. The pair {bread, eggs} has only 2 here, so {bread, eggs, milk} is not frequent.
- **eggs**: the base is {bread}:3, which gives {bread, eggs}:3.

Together with the four single items, that makes 8 frequent itemsets, with no candidate ever generated. When a conditional tree is a **single path**, every combination of its nodes is frequent and can be output directly.

**Cost and limits.** FP-growth scans the data twice and then works in memory, usually much faster than Apriori at low support. It struggles when the tree does not compress (very sparse data, millions of items); projected databases or Spark's parallel \`FPGrowth\` then take over.

**Vertical mining (Eclat).** Store each item's **tid-list**, the set of transaction IDs that contain it. The support of an itemset is the size of the intersection of its items' tid-lists. In the example, bread = {1, 2, 3, 5, 6} and milk = {1, 3, 4, 5}, so bread ∩ milk = {1, 3, 5} and the support is 3. Eclat searches depth-first, intersecting the lists as it goes. **Diffsets** store only the IDs a child loses relative to its parent, which saves a lot of memory on dense data.

**Closed and maximal miners** (CLOSET+, CHARM, FPmax) prune the search directly using the closure. For sparse retail data the saving can be small: on the UK Online Retail baskets at 1% support, all 2,211 frequent itemsets are closed, while only 1,593 are maximal.`,
          resources: [
            zm(8, 'Itemset Mining', 'Sections on Eclat (tid-lists and diffsets) and FP-growth, with worked trees.', true),
            {
              title: 'mlxtend user guide: fpgrowth and fpmax',
              url: 'https://rasbt.github.io/mlxtend/user_guide/frequent_patterns/fpgrowth/',
              type: 'documentation',
              cost: 'free',
              provider: 'Sebastian Raschka',
              note: 'The FP-growth reference implementation; the fpmax page next to it mines maximal itemsets.',
            },
            {
              title: 'Apache Spark MLlib: Frequent Pattern Mining',
              url: 'https://spark.apache.org/docs/latest/ml-frequent-pattern-mining.html',
              type: 'documentation',
              cost: 'free',
              provider: 'Apache Software Foundation',
              note: 'Parallel FP-growth and PrefixSpan at cluster scale, and the parameters that control memory.',
            },
            hanSlides(6, 'Mining Frequent Patterns, Associations and Correlations', 'FP-growth, the vertical data format and mining closed patterns.'),
          ],
          exercises: [
            {
              slug: 'fp-tree-by-hand',
              title: 'An FP-tree by hand',
              prompt:
                'For the database {a, c, d}, {b, c, e}, {a, b, c, e}, {b, e}, {a, b, c, e}, {a, c, e} with a minimum support of 3: (a) count the items and fix the order; (b) draw the FP-tree with node counts; (c) write the conditional pattern base of each item; (d) list all frequent itemsets with supports. Check (d) with brute force.',
              kind: 'problem',
              difficulty: 2,
              hint: 'The supports are a 4, b 4, c 5 and e 5, while d has 1 and is dropped. Ordering by support with alphabetical tie-breaking gives c, e, a, b. There are 11 frequent itemsets; the largest are {a, c, e} and {b, c, e}, each with support 3.',
            },
            {
              slug: 'fp-growth-from-scratch',
              title: 'FP-growth from scratch',
              prompt:
                'Implement FP-growth in Python with a node class (item, count, parent, children, link), a header table and recursive mining of conditional trees, including the single-path shortcut. On the UK Online Retail baskets, check that at relative supports 0.03, 0.02 and 0.01 your output equals `mlxtend.frequent_patterns.fpgrowth` (itemsets and counts), and plot run time against support for your FP-growth, your Apriori and mlxtend\'s two implementations.',
              kind: 'coding',
              difficulty: 3,
              hint: 'The expected counts are 148, 412 and 2,211 frequent itemsets. At 0.01 the largest has 5 items.',
            },
            {
              slug: 'eclat',
              title: 'Eclat with tid-lists',
              prompt:
                'Implement Eclat with Python sets as tid-lists (depth-first, intersecting as you go), and a variant with diffsets. On the UK baskets at relative support 0.01, check the output matches FP-growth and compare peak memory (`tracemalloc`) and time of the two variants. On this sparse data, do diffsets help? Explain using the average tid-list length.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why are transactions inserted into the FP-tree in descending order of item support?',
              answerOutline:
                'Frequent items then appear near the root where many transactions share them, maximising prefix sharing and compression; the order must be the same for every transaction.',
            },
            {
              question: 'What is a conditional pattern base, and how is it used?',
              answerOutline:
                'For item x, the multiset of prefix paths leading to x nodes, each weighted by that node\'s count. Building an FP-tree from it and mining recursively finds all frequent itemsets ending with x.',
            },
            {
              question: 'When can FP-growth struggle compared with Eclat or Apriori?',
              answerOutline:
                'When the tree barely compresses (very sparse data, many distinct items) so it is large in memory, or when recursion builds many conditional trees; Eclat can be faster on dense data with diffsets.',
            },
          ],
          quiz: [
            {
              question: 'An FP-tree has node links for item $m$ leading to three nodes: $m$:2 under the path $f, c, a$; $m$:1 under $f, c, a, b$; and $m$:1 under $f, b$. What is the conditional pattern base of $m$?',
              options: [
                '{f, c, a}:2, {f, c, a, b}:1, {f, b}:1',
                '{f, c, a}:1, {f, c, a, b}:1, {f, b}:1',
                '{f, c, a, m}:2, {f, c, a, b, m}:1, {f, b, m}:1',
                '{f}:4, {c}:3, {a}:3, {b}:2',
              ],
              answer: 0,
              explanation:
                'Each prefix path is weighted by the count of the $m$ node at its end, and $m$ itself is left out. The fourth option has the right item counts, but it loses the path structure that the conditional tree needs.',
            },
            {
              question: 'Tid-lists: $X$ = {1, 2, 4, 6, 7, 9} and $Y$ = {2, 3, 4, 7, 8}. What is the support of $X \\cup Y$, and what is the diffset of $XY$ relative to $X$?',
              options: ['Support 8, diffset {3, 8}', 'Support 3, diffset {1, 6, 9}', 'Support 5, diffset {1, 6, 9}', 'Support 3, diffset {3, 8}'],
              answer: 1,
              explanation:
                'The support is $|X \\cap Y| = |\\{2, 4, 7\\}| = 3$. The diffset lists the transactions of $X$ that lack $Y$: {1, 6, 9}, so the support is also $6 - 3 = 3$. 8 is the size of the union, which is wrong because an itemset needs all of its items. {3, 8} is the diffset relative to $Y$.',
            },
            {
              question: 'A conditional FP-tree for item $p$ is a single path $a$:4 → $b$:3 → $c$:3, with min_sup 3. Which itemsets ending in $p$ does it yield?',
              options: [
                'Only {a, p}, {b, p} and {c, p}',
                'Only {a, b, c, p}',
                'Every non-empty subset of {a, b, c} combined with $p$, each with support 4',
                'Every non-empty subset of {a, b, c} combined with $p$, with support equal to the smallest count in the subset',
              ],
              answer: 3,
              explanation:
                'On a single path, all combinations of nodes are frequent, and each combination\'s support is the minimum count among its nodes. So {a, p} has 4, while {a, b, p}, {c, p} and the others have 3. Giving every one 4 ignores that $b$ and $c$ have count 3.',
            },
          ],
        },
        {
          slug: 'interestingness-and-correlation',
          title: 'Which patterns are interesting? Lift, chi-square and null-invariant measures',
          summary:
            'Strong rules can be misleading. Correlation measures (lift, chi-square), the null-transaction problem, null-invariant measures (all-confidence, max-confidence, Kulczynski, cosine) and the imbalance ratio, applied to real baskets.',
          estimatedMinutes: 155,
          objectives: [
            'Show with numbers how a rule with high support and confidence can describe a negative correlation',
            'Compute lift and chi-square for a rule and interpret them',
            'Explain null transactions and why lift and chi-square depend on them',
            'Compute all-confidence, max-confidence, Kulczynski and cosine, and use Kulczynski with the imbalance ratio to judge a pair',
          ],
          concepts: [
            'Misleading strong rules',
            'Lift and its interpretation',
            'Chi-square for a 2 × 2 table',
            'Null transactions',
            'Null-invariance',
            'All-confidence, max-confidence, Kulczynski, cosine',
            'Imbalance ratio (IR)',
            'Multiple testing and spurious rules',
          ],
          explanation: `Support and confidence alone mislead. Say 75% of all baskets contain milk. Then the rule bread ⇒ milk with confidence 70% means bread buyers are *less* likely than average to buy milk. Confidence ignores how common the consequent is anyway. In the 10-basket example, bread ⇒ milk has confidence 0.71, but milk is in 80% of baskets, so the rule describes a slight *negative* association.

**Lift** compares the observed co-occurrence with independence:
$$\\text{lift}(A, B) = \\frac{P(A \\cup B)}{P(A)\\,P(B)} = \\frac{\\text{conf}(A \\Rightarrow B)}{P(B)}.$$
A lift above 1 means positive correlation, 1 means independence, and below 1 means negative correlation. Bread and milk have lift $0.5/(0.7 \\times 0.8) = 0.89$. The **chi-square** statistic on the $2 \\times 2$ table (previous module) tests the same independence, and its size grows with $n$.

**The null-transaction problem.** A **null transaction** contains neither $A$ nor $B$. Real databases are full of them: most baskets contain neither of two given products. Lift and chi-square both depend on the number of null transactions. Take a table with $AB$ = 1,000, $A\\bar B$ = 1,000 and $\\bar A B$ = 1,000. If there are 100 null transactions, the lift is 0.775. If there are 100,000, the lift is 25.75. Nothing about $A$ and $B$ themselves changed. Which number would you report?

A measure is **null-invariant** if its value does not change when null transactions are added. The four standard ones, for $A$ and $B$, are all averages of the two confidences $P(B|A)$ and $P(A|B)$:

- all-confidence $= \\min\\{P(A|B), P(B|A)\\}$
- max-confidence $= \\max\\{P(A|B), P(B|A)\\}$
- **Kulczynski** $= \\tfrac12\\,[P(A|B) + P(B|A)]$
- cosine $= \\sqrt{P(A|B)\\,P(B|A)}$

All four range from 0 to 1, with 0.5 as a neutral point for Kulczynski. In the example both confidences are 0.5, so Kulczynski is 0.5 whatever the number of nulls.

When the two confidences differ a lot, the averages hide it. The **imbalance ratio** reports the difference:
$$\\text{IR}(A, B) = \\frac{|\\text{sup}(A) - \\text{sup}(B)|}{\\text{sup}(A) + \\text{sup}(B) - \\text{sup}(A \\cup B)}.$$
Wu, Chen and Han recommend reporting **Kulczynski together with IR**.

**Real baskets.** In 17,901 UK invoices from Online Retail, the green and the roses Regency teacups appear in 932 and 956 baskets, and together in 700. Kulczynski is 0.742 and IR 0.020, so this is a strong, balanced association, and the two teacups are bought as a set. The pink and the red "Jumbo bag" appear in 1,159 and 1,935 baskets, and together in 785. Kulczynski is 0.541 and IR 0.336. That is weaker and lopsided: 68% of pink-bag baskets have the red bag, but only 41% of red-bag baskets have the pink one. Lift says 14.1 for the teacups and 6.3 for the bags, but those values would change if the shop added a café whose receipts contain neither.

Finally, mining thousands of rules is an exercise in multiple testing. Some strong-looking rules arise by chance, especially at low support. Holding out data to confirm a rule, or applying a significance correction, keeps you honest.`,
          resources: [
            {
              title: 'Re-examination of interestingness measures in pattern mining: a unified framework',
              url: 'https://link.springer.com/article/10.1007/s10618-009-0161-2',
              type: 'article',
              cost: 'freemium',
              provider: 'Wu, Chen and Han, Data Mining and Knowledge Discovery (2010)',
              note: 'The paper behind null-invariance and the Kulczynski plus imbalance ratio recommendation. The abstract and section 3 give the framework.',
              primary: true,
            },
            zm(12, 'Pattern and Rule Assessment', 'Rule and pattern measures (lift, leverage, conviction, Jaccard) and significance testing with permutation and bootstrap methods.'),
            tsk('ch5_association_analysis.pdf', 'chapter 5, Association Analysis (free chapter)', 'Section 5.7 on evaluating association patterns, with the classic tables showing how measures disagree.'),
            patternsCourse('Lectures on pattern evaluation and null-invariant measures (module 2).'),
          ],
          exercises: [
            {
              slug: 'measures-by-hand',
              title: 'Every measure by hand',
              prompt:
                'For two items with $AB$ = 400, $A\\bar B$ = 600, $\\bar A B$ = 100, compute lift, chi-square, all-confidence, max-confidence, Kulczynski, cosine and IR when the number of null transactions is (a) 8,900 and (b) 100. Put the results in a table, mark which values changed, and write two sentences on what the pair\'s relationship really is.',
              kind: 'problem',
              difficulty: 2,
              hint: 'With 8,900 nulls (10,000 in total) lift is 8.0 and chi-square about 2,866. With 100 nulls (1,200 in total) lift is 0.96 and chi-square about 6.9. In both cases all-confidence is 0.400, max-confidence 0.800, Kulczynski 0.600, cosine 0.566 and IR 0.455.',
            },
            {
              slug: 'rank-real-rules',
              title: 'Rank real rules three ways',
              prompt:
                'Mine the UK Online Retail baskets at relative support 0.02 with your FP-growth. For every frequent pair compute lift, Kulczynski and IR. Rank the pairs by lift and by Kulczynski and show the top 10 of each with product descriptions. Find two pairs where the rankings disagree sharply and explain why using IR. Then add 50,000 empty transactions and recompute: which ranking changed?',
              kind: 'data-analysis',
              difficulty: 2,
              hint: 'For green and roses Regency teacups (22697, 22699) you should get Kulczynski 0.742, IR 0.020 and lift about 14.1. For the pink and red jumbo bags (22386, 85099B) you should get Kulczynski 0.541, IR 0.336 and lift about 6.3.',
            },
            {
              slug: 'spurious-rules',
              title: 'How many rules are chance?',
              prompt:
                'Shuffle the items between UK baskets while keeping basket sizes and item frequencies fixed (swap items between random pairs of baskets many times). Mine rules with min_sup 0.01 and min_conf 0.5 on 10 such shuffled databases. How many rules appear on average, and how high does the largest lift get? Compare with the real data and say what this tells you about rules near the thresholds.',
              kind: 'simulation',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'How can a rule with 70% confidence describe a negative correlation?',
              answerOutline: 'If the consequent appears in more than 70% of all transactions, the antecedent lowers its probability; lift = conf / P(B) is then below 1.',
            },
            {
              question: 'What is a null-invariant measure, and why does it matter in large transaction databases?',
              answerOutline:
                'Its value does not change when transactions containing neither item are added. Real data contain huge, arbitrary numbers of such transactions, so measures like lift and chi-square can be pushed anywhere by them.',
            },
            {
              question: 'Why report the imbalance ratio together with Kulczynski?',
              answerOutline:
                'Kulczynski averages the two conditional probabilities, so a balanced moderate pair and a very lopsided pair can both give 0.5; IR shows how different the two supports (and confidences) are.',
            },
          ],
          quiz: [
            {
              question: 'In 1,000 baskets, tea appears in 200, honey in 100, and both in 60. What is the lift of tea ⇒ honey?',
              options: ['0.6', '0.3', '3.0', '1.2'],
              answer: 2,
              explanation:
                'Lift $= P(\\text{tea} \\cup \\text{honey})/(P(\\text{tea})P(\\text{honey})) = 0.06/(0.2 \\times 0.1) = 3.0$, so honey is three times as likely in tea baskets as overall. 0.3 is the confidence of tea ⇒ honey ($60/200$), and 0.6 is the confidence of honey ⇒ tea.',
            },
            {
              question: 'A retailer merges its grocery and garden-centre receipts, adding 500,000 receipts that contain neither coffee nor milk. Which measure of the coffee-milk association stays the same?',
              options: ['Lift', 'Chi-square', 'Relative support of {coffee, milk}', 'Kulczynski'],
              answer: 3,
              explanation:
                'Kulczynski uses only $P(\\text{coffee}|\\text{milk})$ and $P(\\text{milk}|\\text{coffee})$, which do not change when null transactions are added. Lift and chi-square both change with the total count, and relative support falls because the denominator grows.',
            },
            {
              question: 'sup(A) = 1,000, sup(B) = 200 and sup(A ∪ B) = 180. What are Kulczynski and the imbalance ratio?',
              options: ['Kulczynski 0.54, IR 0.78', 'Kulczynski 0.18, IR 0.80', 'Kulczynski 0.54, IR 0.80', 'Kulczynski 0.90, IR 0.78'],
              answer: 0,
              explanation:
                'The confidences are $180/1000 = 0.18$ and $180/200 = 0.9$, so Kulczynski is $(0.18 + 0.9)/2 = 0.54$. IR $= |1000 - 200|/(1000 + 200 - 180) = 800/1020 = 0.78$. So the pair looks neutral on average but is very lopsided: buying B almost implies A, but not the other way round. 0.80 forgets to subtract the joint support in the denominator.',
            },
          ],
          relatedLessons: ['probability-statistics/hypothesis-testing-and-regression/chi-square-and-goodness-of-fit', 'probability-statistics/hypothesis-testing-and-regression/model-selection-and-multiple-comparisons'],
        },
      ],
    },
    {
      slug: 'advanced-pattern-mining',
      title: 'Advanced Pattern Mining',
      description:
        'Patterns beyond flat itemsets: across concept hierarchies and dimensions, under user constraints pushed into the search, in sequences such as clickstreams and purchase histories, and in graphs; and how to keep the output small enough to read.',
      lessons: [
        {
          slug: 'multilevel-and-multidimensional-patterns',
          title: 'Multilevel, multidimensional and quantitative patterns',
          summary:
            'Mining along item hierarchies with uniform or reduced support, filtering redundant rules by expected support, rules that span several attributes, and quantitative attributes discretised into items.',
          estimatedMinutes: 145,
          objectives: [
            'Mine patterns at several levels of an item hierarchy and choose between uniform and reduced minimum support',
            'Compute the expected support and confidence of a descendant rule and decide whether it is redundant',
            'Turn a relational table into items and mine inter-dimensional and hybrid-dimensional rules',
            'Discretise quantitative attributes for rule mining and explain the trade-off in bin width',
          ],
          concepts: [
            'Item hierarchies (concept hierarchies on items)',
            'Uniform versus reduced (level-wise) minimum support',
            'Group-based support',
            'Redundant rules and expected support',
            'Inter-dimensional and hybrid-dimensional rules',
            'Quantitative rules and discretisation',
            'Rare and negative patterns',
          ],
          explanation: `Items usually sit in a **hierarchy**: a particular stock code is a "Regency teacup", which is "tableware", which is "home". Patterns at the bottom are often too rare to be frequent, while patterns at the top are too obvious to be interesting. **Multilevel mining** looks at every level. One way is to replace each item in a transaction by itself plus all its ancestors and mine the extended transactions. The other is to mine top-down, one level at a time, where each level's frequent items restrict what is examined below.

**Choosing the support.** With **uniform** support, every level uses the same min_sup. That is simple, and Apriori-style pruning across levels is sound, because a child's support never exceeds its parent's. But low levels then produce almost nothing. With **reduced** support, each lower level gets a lower threshold (say 5% for categories and 2% for products). That finds more patterns, but a parent can now be infrequent at its own level while a child passes the child's threshold, so pruning children by their parent's result can miss patterns. **Group-based** thresholds set min_sup per group of items, for example a lower one for expensive electronics.

**Redundancy.** Multilevel mining produces many rules that merely restate an ancestor rule. Suppose coffee ⇒ biscuits has support 6% and confidence 60%, and decaf makes up a third of coffee purchases. The *expected* support of decaf ⇒ biscuits is $6\\% \\times \\tfrac13 = 2\\%$, and its expected confidence is 60%. If the mined rule shows 2.1% and 61%, it adds nothing and should be filtered. A descendant rule is worth reporting only when its support or confidence departs clearly from what its ancestor predicts.

**Multidimensional rules.** Relational data have several attributes, not one item column. Turning each attribute-value pair into an item ("country = France", "weekday = Sunday", "price band = 10+") lets any itemset miner find **inter-dimensional** rules such as country = Germany ∧ weekday = Friday ⇒ price band = 2 to 5. A **hybrid-dimensional** rule repeats a dimension, as in buys(X, teacup) ∧ buys(X, saucer) ⇒ country(X, UK).

**Quantitative attributes** need discretisation first (module 2). Static bins (age 30 to 39) are simple, but narrow bins have too little support and wide bins hide structure. Clustering-based or data-driven bins adapt to the data. One classic approach mines rules on a 2-D grid of two quantitative antecedents, then merges adjacent cells that give the same consequent into rectangles.

**Rare and negative patterns.** Sometimes the interesting pattern is rare, such as an expensive product bought with an accessory, or *negative*: two items that are almost never bought together, which suggests substitutes. Negative correlation is measured with the same tools as before. Kulczynski well below 0.5 with a low IR is a balanced negative association.`,
          resources: [
            {
              title: 'Mining Generalized Association Rules',
              url: 'https://www.vldb.org/conf/1995/P407.PDF',
              type: 'article',
              cost: 'free',
              provider: 'Srikant and Agrawal, VLDB 1995',
              note: 'Rules across an item taxonomy, the extended-transaction approach and the interest measure based on expected support (section 2).',
              primary: true,
            },
            {
              title: 'Discovery of Multiple-Level Association Rules from Large Databases',
              url: 'https://www.vldb.org/conf/1995/P420.PDF',
              type: 'article',
              cost: 'free',
              provider: 'Han and Fu, VLDB 1995',
              note: 'Top-down, level-by-level mining with reduced support at lower levels.',
            },
            hanSlides(7, 'Advanced Frequent Pattern Mining', 'Mining in multilevel and multidimensional space, quantitative rules, and rare and negative patterns.'),
            patternsCourse('Module 3 lectures on mining diverse patterns.'),
          ],
          exercises: [
            {
              slug: 'redundancy-filter',
              title: 'Expected support and redundancy',
              prompt:
                'The rule dairy ⇒ bread has support 10% and confidence 50%. Yogurt accounts for 30% of dairy purchases and cheese for 25%. The mined rules are yogurt ⇒ bread (support 3.2%, confidence 52%) and cheese ⇒ bread (support 0.9%, confidence 18%). (a) Compute the expected support and confidence of each descendant rule. (b) Which is redundant, and what does the other tell you? (c) Write a function that filters a list of rules given parent rules and child shares, with a tolerance parameter.',
              kind: 'problem',
              difficulty: 1,
              hint: 'The expected values are 3% support and 50% confidence for yogurt, and 2.5% and 50% for cheese. Yogurt matches its expectation, so the rule is redundant. Cheese buyers buy bread far less often than dairy buyers in general.',
            },
            {
              slug: 'multidimensional-rules',
              title: 'Multidimensional rules on Bank Marketing',
              prompt:
                'Load the UCI Bank Marketing data (bank-full.csv from the [UCI page](https://archive.ics.uci.edu/dataset/222/bank+marketing)). Discretise age into decades and balance into quartiles, turn every attribute-value pair (including `y=yes` or `y=no`) into an item, and mine with FP-growth at min_sup 0.05. List the 10 rules with consequent `y=yes` that have the highest lift, and say which you would trust and why. Repeat with age in 5-year bins and compare.',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'multilevel-online-retail',
              title: 'Two levels in Online Retail',
              prompt:
                'Build a two-level hierarchy for Online Retail items by grouping stock codes on their first three characters (for example 851 or 227). Mine the UK baskets at level 2 (stock codes) with min_sup 0.02 and at level 1 (groups) with min_sup 0.05. Report how many itemsets each level gives, three level-1 patterns with no level-2 counterpart, and three level-2 rules that are redundant given a level-1 rule.',
              kind: 'data-analysis',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'What is the risk of reduced minimum support combined with level-wise filtering?',
              answerOutline:
                'A parent may fail its higher threshold while a child passes the lower one; if children of infrequent parents are never examined, those child patterns are missed.',
            },
            {
              question: 'When is a descendant rule redundant?',
              answerOutline:
                'When its support is close to the ancestor\'s support times the child\'s share of the parent, and its confidence close to the ancestor\'s: it is predictable from the ancestor and adds no information.',
            },
            {
              question: 'How do you mine rules over a relational table with an itemset algorithm?',
              answerOutline:
                'Discretise numeric attributes, then turn every attribute-value pair into an item so each row becomes a transaction; frequent itemsets then give inter- or hybrid-dimensional rules.',
            },
          ],
          quiz: [
            {
              question: 'The rule fruit ⇒ yogurt has support 8% and confidence 40%. Apples are 25% of fruit purchases. The mined rule apples ⇒ yogurt has support 2.1% and confidence 41%. What should you conclude?',
              options: [
                'It is interesting, because its confidence is higher than the parent rule\'s',
                'It is redundant: its support and confidence are about what the parent rule predicts',
                'It is interesting, because its support is below 8%',
                'It is redundant only if its lift is below 1',
              ],
              answer: 1,
              explanation:
                'The expected support is $8\\% \\times 0.25 = 2\\%$, and the expected confidence is 40%. The observed 2.1% and 41% are what the parent predicts, so the rule adds nothing. A one-point difference in confidence is not evidence of anything new.',
            },
            {
              question: 'Level 1 uses min_sup 5% and level 2 uses 3%. "Tea" has support 4%, and its child "green tea" has 3.5%. The miner only examines children of frequent parents. What happens?',
              options: [
                'Green tea is found, because it passes the level-2 threshold',
                'Green tea is found, because supports add up across levels',
                'Green tea is missed, because tea fails the level-1 threshold and its children are never examined',
                'Neither is affected, because reduced support always finds every pattern',
              ],
              answer: 2,
              explanation:
                'Tea, at 4%, fails the 5% level-1 threshold, so filtering skips its children, and green tea is missed even though it passes 3%. Reduced support with this kind of filtering is incomplete. Uniform support would avoid the problem.',
            },
            {
              question: 'Which of these is a hybrid-dimensional rule?',
              options: [
                'buys(X, teapot) ⇒ buys(X, tea)',
                'age(X, 30 to 39) ∧ country(X, France) ⇒ channel(X, online)',
                'country(X, UK) ⇒ weekday(X, Sunday)',
                'buys(X, teapot) ∧ buys(X, cups) ⇒ country(X, UK)',
              ],
              answer: 3,
              explanation:
                'A hybrid-dimensional rule repeats a predicate (buys appears twice) and also uses another dimension (country). The first rule has a single dimension, while the second and third are inter-dimensional, with no predicate repeated.',
            },
          ],
        },
        {
          slug: 'constraint-based-mining',
          title: 'Constraint-based pattern mining',
          summary:
            'Letting the user say what is wanted, then pushing constraints into the search: anti-monotone, monotone, succinct and convertible constraints, and pruning both the pattern space and the data space.',
          estimatedMinutes: 145,
          objectives: [
            'Express a mining request as knowledge-type, data, dimension, interestingness and pattern constraints',
            'Classify a pattern constraint as anti-monotone, monotone, succinct or convertible, with justification',
            'Show how each class of constraint prunes an Apriori or FP-growth search',
            'Explain data-space pruning and when it applies',
          ],
          concepts: [
            'Mining query: constraints on data, dimensions, interestingness, patterns',
            'Anti-monotone constraints',
            'Monotone constraints',
            'Succinct constraints',
            'Convertible constraints and item ordering',
            'Pattern-space versus data-space pruning',
            'Data anti-monotone constraints',
          ],
          explanation: `Unconstrained mining finds every frequent pattern, but an analyst usually wants something specific, such as "rules about small appliances, bought in Germany, with total price over 100 and average price under 30". Writing this as **constraints** is clearer, and if the miner *pushes* them into the search instead of filtering at the end, it is also far faster.

Constraints can restrict the *knowledge type* (rules, clusters), the *data* (German sales in 2011), the *dimensions or levels* (category level only), the *interestingness* (min_sup, min_conf, lift) and the *patterns* themselves. Pattern constraints are the interesting ones. Below, each item has a price, $S$ is an itemset, and all prices are non-negative.

- **Anti-monotone**: if $S$ violates it, every superset does too, so prune $S$ and stop extending it. Examples: support($S$) ≥ σ, sum($S$.price) ≤ v, |S| ≤ 5, range($S$.price) ≤ v. These behave exactly like min_sup in Apriori.
- **Monotone**: if $S$ satisfies it, every superset does too, so stop checking it once it holds. Examples: sum($S$.price) ≥ v and min($S$.price) ≤ v. They do not prune candidates directly, but they save checks, and they enable data-space pruning (below).
- **Succinct**: you can list exactly which itemsets satisfy it from the items alone, before counting. For min($S$.price) ≤ 20, the satisfying sets are exactly those containing at least one item priced 20 or less, so you can generate only those candidates.
- **Convertible**: neither monotone nor anti-monotone in general, but it becomes one under a suitable item order. avg($S$.price) ≥ 30 is the classic case. Adding a cheap item lowers the average and adding an expensive one raises it. But if items are sorted by *descending* price and patterns are grown in that order (as in FP-growth), every extension adds a cheaper item, so the average can only fall. The constraint becomes anti-monotone along the search.

*Worked example.* Prices are e = 50, d = 40, c = 30, b = 20 and a = 10, in descending order e, d, c, b, a, with the constraint avg ≥ 30. The prefix {e, d, c, b} has average 35, so keep growing. Adding a gives $150/5 = 30$, which still satisfies the constraint. The prefix {c, b} has average 25. Every extension adds a, which is cheaper, so the whole branch is pruned. Note that sum ≤ v is anti-monotone *only* because prices are non-negative. With negative values (refunds, profits) it is not.

**Data-space pruning.** A constraint can also remove *transactions*. If a transaction cannot help any extension of the current pattern satisfy the constraint, drop it from the projected database. For example, with sum($S$.price) ≥ 100, if the pattern plus every remaining item in a transaction still sums to less than 100, that transaction is useless for this branch. Constraints with this property are called **data anti-monotone**. They are the reason pattern-growth methods, which work on projected databases, push constraints much more effectively than Apriori.`,
          resources: [
            hanSlides(7, 'Advanced Frequent Pattern Mining', 'Constraint-based frequent pattern mining: the constraint taxonomy and pruning in the pattern and data spaces.'),
            {
              title: 'Constrained Frequent Pattern Mining: A Pattern-Growth View',
              url: 'https://www.kdd.org/exploration_files/pei.pdf',
              type: 'article',
              cost: 'free',
              provider: 'Pei and Han, SIGKDD Explorations (2002)',
              note: 'The constraint classes (anti-monotone, monotone, succinct, convertible) and how pattern growth pushes each one. Sections 2 and 3 are the core of this lesson.',
              primary: true,
            },
            patternsCourse('Module 3, constraint-based pattern mining: the same taxonomy with worked examples by Han.'),
            hanBook('chapter 5 (advanced pattern mining)', 'Paid. Full treatment of constraint classes, including convertible constraints and data anti-monotonicity.'),
          ],
          exercises: [
            {
              slug: 'classify-constraints',
              title: 'Classify constraints',
              prompt:
                'Classify each constraint as anti-monotone, monotone, succinct, convertible or none, and justify each in one line (assume non-negative prices unless stated): (a) sum(S.price) ≤ 100; (b) max(S.price) ≥ 50; (c) count(S) ≥ 3; (d) avg(S.price) ≤ 20; (e) S contains item "teacup"; (f) S ⊆ {bread, milk, eggs}; (g) median(S.price) ≥ 10; (h) sum(S.profit) ≥ 0 where profit can be negative.',
              kind: 'problem',
              difficulty: 2,
              hint: 'Max(S.price) ≥ 50 is monotone and succinct. Avg ≤ 20 is convertible with items in ascending price order. Sum of profits that can be negative is none of the four in general.',
            },
            {
              slug: 'push-a-constraint',
              title: 'Push a constraint into FP-growth',
              prompt:
                'Extend your FP-growth to accept an item-price dictionary and the constraint avg(S.price) ≥ v. Order items by descending price inside the conditional trees (keeping support order for building the global tree is fine if you reorder correctly; justify your approach) and prune a branch as soon as its average falls below v. On the UK Online Retail baskets with each item\'s median UnitPrice and v = 5, compare the output and time with mining unconstrained and filtering afterwards. The outputs must be identical.',
              kind: 'coding',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'Why is sum(S.price) ≤ v anti-monotone, and when does that fail?',
              answerOutline:
                'Adding an item with non-negative price can only increase the sum, so once the sum exceeds v every superset does too; with negative values the sum can decrease again, so the property fails.',
            },
            {
              question: 'What makes avg(S.price) ≥ v convertible?',
              answerOutline:
                'It is neither monotone nor anti-monotone in general, but if items are added in descending price order each new item is no more expensive than those already in, so the average can only fall: anti-monotone along that order.',
            },
            {
              question: 'What is the difference between pattern-space and data-space pruning?',
              answerOutline:
                'Pattern-space pruning stops exploring candidate itemsets; data-space pruning removes transactions (or parts of them) that cannot contribute to any pattern satisfying the constraint in the current branch.',
            },
          ],
          quiz: [
            {
              question: 'With non-negative prices, which constraint is monotone?',
              options: ['sum(S.price) ≤ 100', 'sum(S.price) ≥ 100', 'range(S.price) ≤ 10', 'support(S) ≥ 0.02'],
              answer: 1,
              explanation:
                'Adding items can only raise a non-negative sum, so once sum ≥ 100 holds it holds for every superset, which is monotone. The other three are anti-monotone: once violated, they stay violated as items are added.',
            },
            {
              question: 'Items in descending price order are e = 50, d = 40, c = 30, b = 20, a = 10. A pattern-growth miner uses the constraint avg(S.price) ≥ 30 and grows patterns in this order. Which branch can be pruned entirely?',
              options: [
                'The branch starting {e, a}, because a is cheap',
                'The branch starting {d, c, b}, with average 30',
                'The branch starting {c, b}, with average 25',
                'No branch, because avg is neither monotone nor anti-monotone',
              ],
              answer: 2,
              explanation:
                'Growing in descending order adds only cheaper items, so once the average falls below 30 it cannot recover. {c, b} averages 25 and can only be extended with a, so the branch is pruned. {d, c, b} still satisfies the constraint, and {e, a} averages exactly 30. Avg is not monotone or anti-monotone in general, but it is convertible.',
            },
            {
              question: 'Why is min(S.price) ≤ 20 called succinct?',
              options: [
                'You can generate exactly the satisfying itemsets from the items alone: those with at least one item priced 20 or less',
                'It can be checked in constant time per itemset',
                'It is anti-monotone, and every anti-monotone constraint is succinct',
                'It needs only one scan of the database',
              ],
              answer: 0,
              explanation:
                'Succinct means the satisfying sets can be enumerated by selecting items before any support counting. This constraint is in fact monotone, not anti-monotone: adding items can only lower the minimum, so once it holds it keeps holding.',
            },
          ],
        },
        {
          slug: 'sequential-pattern-mining',
          title: 'Sequential pattern mining: GSP, SPADE and PrefixSpan',
          summary:
            'Patterns where order matters: sequences of itemsets, subsequence containment and support, the Apriori-based GSP, vertical SPADE, the pattern-growth PrefixSpan with projected databases, and constraints on gaps and duration.',
          estimatedMinutes: 165,
          objectives: [
            'Define a sequence of itemsets, subsequence containment and the support of a sequential pattern',
            'Run PrefixSpan by hand on a small sequence database, writing out the projected databases',
            'Describe how GSP generates and prunes candidates and how SPADE joins id-lists',
            'Preprocess a real clickstream and mine it, explaining what the patterns mean',
          ],
          concepts: [
            'Sequence of itemsets (elements)',
            'Subsequence and containment',
            'Support counted per sequence',
            'GSP: Apriori-style candidate generation',
            'SPADE: vertical id-lists with (sid, eid)',
            'PrefixSpan: prefixes, suffixes, projected databases',
            'Closed sequential patterns',
            'Gap, window and duration constraints',
          ],
          explanation: `Many datasets are sequences: a customer's purchases over a year, a user's page views in a session, the events in a machine log. A **sequence** is an ordered list of **elements**, and each element is an itemset whose items happened together. For example, $\\langle a\\,(bc)\\,d \\rangle$ means $a$, then $b$ and $c$ together, then $d$. A sequence $\\alpha$ is a **subsequence** of $\\beta$ if the elements of $\\alpha$ can be matched, in order, to elements of $\\beta$ that contain them, with gaps allowed. Support is counted **per sequence**: a pattern that occurs three times in one customer's history still counts once.

Take this database, with single-item elements for simplicity:

| sid | sequence |
|---|---|
| 1 | a, b, c, a, d |
| 2 | a, c, b, d |
| 3 | b, a, c, d |
| 4 | a, b, d |

With a minimum support of 3, the frequent 1-sequences are $a$ (4), $b$ (4), $c$ (3) and $d$ (4).

**PrefixSpan** (Pei, Han and colleagues, 2001) grows patterns by **projection**. The $\\langle a\\rangle$-*projected database* holds, for each sequence, the suffix after the *first* occurrence of $a$: $\\langle b, c, a, d\\rangle$, $\\langle c, b, d\\rangle$, $\\langle c, d\\rangle$ and $\\langle b, d\\rangle$. In it, $b$ appears in 3 suffixes, $c$ in 3 and $d$ in 4. So $\\langle a, b\\rangle$ (3), $\\langle a, c\\rangle$ (3) and $\\langle a, d\\rangle$ (4) are frequent. Projecting again, the $\\langle a, b\\rangle$-projected database is $\\langle c, a, d\\rangle$, $\\langle d\\rangle$ and $\\langle d\\rangle$, which gives $\\langle a, b, d\\rangle$ (3). Carrying on from every prefix finds 11 patterns in all, including $\\langle b, d\\rangle$ (4), $\\langle c, d\\rangle$ (3) and $\\langle a, c, d\\rangle$ (3). No candidates are ever generated, and the projected databases shrink at every step. Real implementations use *pseudo-projection*: pointers into the original sequences instead of copies.

**GSP** (Srikant and Agrawal, 1996) is the Apriori of sequences. It joins frequent $(k-1)$-sequences that overlap, prunes candidates that have an infrequent contiguous subsequence, and scans once per level. It suffers from the same candidate explosion as Apriori, made worse because order multiplies the number of candidates. For 1,000 items there are $1000 \\times 1000 + \\binom{1000}{2} \\approx 1.5$ million length-2 candidates: every $\\langle x, y\\rangle$ plus every $\\langle (xy)\\rangle$. **SPADE** uses a vertical format: each pattern has an id-list of (sequence ID, element ID) pairs, and temporal joins of id-lists extend patterns without rescanning.

**Constraints and summaries.** Real applications add a **maximum gap** between consecutive elements, a **window** within which items count as simultaneous, and a **maximum duration**. Closed sequential patterns, as mined by CloSpan or BIDE, remove patterns that have a super-pattern with the same support.

**A real clickstream.** The UCI MSNBC data record the page category of each request in about 990,000 user sessions. Take the first 100,000 sessions and collapse repeated consecutive categories, so that "frontpage, frontpage, news" becomes "frontpage, news". At a minimum support of 1%, PrefixSpan finds 126 patterns. The sequence ⟨frontpage, news⟩ is supported by 7,204 sessions, but ⟨news, frontpage⟩ by only 4,277. Order carries information that an itemset would throw away.`,
          resources: [
            zm(10, 'Sequence Mining', 'GSP, SPADE and PrefixSpan on one running example, plus substring mining with suffix trees.', true),
            {
              title: 'PrefixSpan: Mining Sequential Patterns Efficiently by Prefix-Projected Pattern Growth',
              url: 'https://hanj.cs.illinois.edu/pdf/span01.pdf',
              type: 'article',
              cost: 'free',
              provider: 'Pei, Han, Mortazavi-Asl, Pinto, Chen, Dayal and Hsu, ICDE 2001',
              note: 'The PrefixSpan paper. Section 3 defines projection with itemset elements; read it before implementing MP 2.',
            },
            {
              title: 'SPMF: an open-source data mining library (datasets page)',
              url: 'https://www.philippe-fournier-viger.com/spmf/index.php?link=datasets.php',
              type: 'dataset',
              cost: 'free',
              provider: 'Philippe Fournier-Viger',
              note: 'Benchmark sequence databases (clickstreams, sign language, text) in a simple format, and reference implementations of most algorithms in this lesson.',
            },
            hanSlides(7, 'Advanced Frequent Pattern Mining', 'Sequential pattern mining: GSP, SPADE, PrefixSpan and CloSpan.'),
          ],
          exercises: [
            {
              slug: 'prefixspan-by-hand',
              title: 'PrefixSpan by hand',
              prompt:
                'For the sequence database ⟨c, a, b, d⟩, ⟨a, c, d⟩, ⟨b, c, a, d⟩, ⟨c, a, d⟩, ⟨a, b, c⟩ with a minimum support of 3: (a) find the frequent items; (b) write the ⟨a⟩-, ⟨c⟩- and ⟨d⟩-projected databases; (c) list every sequential pattern with its support. Check with the `prefixspan` Python package.',
              kind: 'problem',
              difficulty: 2,
              hint: 'The frequent items are a (5), c (5), d (4) and b (3). There are 8 patterns in all: the four items, ⟨a, d⟩ (4), ⟨c, a⟩ (3), ⟨c, d⟩ (4) and ⟨c, a, d⟩ (3). Note that ⟨a, c⟩ has support only 2.',
            },
            {
              slug: 'msnbc-prefixspan',
              title: 'Mine a real clickstream',
              prompt:
                'Download the [UCI MSNBC data](https://archive.ics.uci.edu/dataset/133/msnbc+com+anonymous+web+data), parse the first 100,000 sequences, and collapse repeated consecutive categories. Implement PrefixSpan for single-item elements with pseudo-projection (sequence index plus offset). At min_sup 1% and 0.5%, check your patterns and supports equal the `prefixspan` package\'s output, report the count by length, and list the 10 most frequent length-2 and length-3 patterns with category names. Discuss what you would tell the site\'s editors.',
              kind: 'coding',
              difficulty: 2,
              hint: 'At 1% (1,000 sequences) there are 126 patterns, with lengths 1 to 5 counted 16, 56, 42, 11 and 1. At 0.5% there are 363. Without collapsing, the output is dominated by runs of one category.',
            },
            {
              slug: 'gap-constraint',
              title: 'Add a maximum gap',
              prompt:
                'Extend your PrefixSpan with a maximum gap g: consecutive pattern elements must match positions at most g apart. Explain why the simple "first occurrence" projection is no longer enough (you must keep every occurrence position). On the collapsed MSNBC sequences at min_sup 1%, report the number of patterns for g = 1, 2, 3 and unbounded.',
              kind: 'coding',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'Why is support counted per sequence rather than per occurrence?',
              answerOutline:
                'To measure how many customers or sessions exhibit the pattern; counting occurrences lets one long sequence dominate and breaks the downward closure property that pruning relies on.',
            },
            {
              question: 'What does the ⟨x⟩-projected database contain, and why does PrefixSpan not need candidates?',
              answerOutline:
                'For each sequence containing x, the suffix after the first occurrence of x. Frequent items in that projected database are exactly the frequent one-item extensions of ⟨x⟩, so patterns grow only from items that actually occur.',
            },
            {
              question: 'Why does GSP suffer more from candidate explosion than Apriori?',
              answerOutline:
                'Order and element structure multiply candidates: for m items there are m-squared ordered pairs ⟨x, y⟩ plus m-choose-2 same-element pairs ⟨(xy)⟩ at length 2 alone.',
            },
          ],
          quiz: [
            {
              question: 'Sequences: S1 = ⟨c, a, b, d⟩, S2 = ⟨a, c, d⟩, S3 = ⟨b, c, a, d⟩, S4 = ⟨c, a, d⟩, S5 = ⟨a, b, c⟩. What are the supports of ⟨c, a⟩ and ⟨a, c⟩?',
              options: ['⟨c, a⟩ 3 and ⟨a, c⟩ 2', 'Both 5, because a and c appear in every sequence', '⟨c, a⟩ 2 and ⟨a, c⟩ 3', 'Both 3'],
              answer: 0,
              explanation:
                '⟨c, a⟩ needs a c followed later by an a: S1, S3 and S4, so 3. ⟨a, c⟩ needs an a before a c: S2 and S5, so 2. Both items appear in all five sequences, but order matters.',
            },
            {
              question: 'For the same database with min_sup 3, which items are frequent in the ⟨c⟩-projected database?',
              options: ['a, b and d', 'Only d', 'a and d', 'a, c and d'],
              answer: 2,
              explanation:
                'The suffixes after the first c are ⟨a, b, d⟩, ⟨d⟩, ⟨a, d⟩, ⟨a, d⟩ and the empty sequence (S5 ends with c). So a appears in 3 suffixes, d in 4 and b in 1. That gives ⟨c, a⟩ and ⟨c, d⟩, while b does not reach 3.',
            },
            {
              question: 'A user\'s history is ⟨(milk, bread), (eggs), (milk)⟩. Which pattern is NOT contained in it?',
              options: ['⟨(milk), (milk)⟩', '⟨(bread), (eggs)⟩', '⟨(milk, bread)⟩', '⟨(milk, eggs)⟩'],
              answer: 3,
              explanation:
                '⟨(milk, eggs)⟩ needs milk and eggs in the *same* element, and no element has both. ⟨(milk), (milk)⟩ matches the first and third elements, ⟨(bread), (eggs)⟩ matches the first and second, and ⟨(milk, bread)⟩ matches the first.',
            },
          ],
        },
        {
          slug: 'graph-patterns-and-pattern-compression',
          title: 'Graph patterns and taming pattern explosion',
          summary:
            'Frequent subgraph mining with Apriori-based and pattern-growth (gSpan) methods and why isomorphism makes it hard; then compressed, top-k, redundancy-aware and colossal patterns, and how to put patterns to use.',
          estimatedMinutes: 145,
          objectives: [
            'Define frequent subgraph mining and explain why subgraph isomorphism makes it expensive',
            'Describe how gSpan uses DFS codes and rightmost extension to avoid duplicates',
            'Explain closed, maximal, compressed (delta-cluster) and top-k pattern summaries, and compute a pattern distance',
            'Describe colossal patterns and why ordinary miners cannot reach them',
          ],
          concepts: [
            'Graph transaction database and subgraph support',
            'Subgraph isomorphism (NP-complete)',
            'Apriori-based subgraph mining (vertex or edge growth)',
            'gSpan: canonical minimum DFS code and rightmost extension',
            'Pattern distance on supporting transaction sets',
            'Delta-clustering and representative patterns',
            'Top-k and redundancy-aware top-k patterns',
            'Colossal patterns and core patterns',
          ],
          explanation: `**Graph patterns.** In chemistry, biology, software and social networks, each record can be a graph: a molecule, a protein interaction network, a call graph. **Frequent subgraph mining** finds the subgraphs, connected and labelled, that occur in at least min_sup of the graphs. The Apriori property still holds, because a subgraph of a frequent graph is frequent, but two things make the problem much harder than itemsets.

1. Testing whether a pattern occurs in a graph is **subgraph isomorphism**, which is NP-complete. Every support count is potentially expensive.
2. The same subgraph can be grown in many different orders. Without care, the miner generates each pattern many times, and testing whether two candidates are the same graph is itself an isomorphism test.

*Apriori-based* methods (AGM, FSG) grow candidates one vertex or one edge at a time by joining two frequent $k$-subgraphs that share a $(k-1)$-subgraph. Joining is complicated, because the same pair of graphs can join in several ways. *Pattern-growth* **gSpan** (Yan and Han, 2002) gives each graph a **canonical** code. A depth-first traversal lists the edges in visiting order, and the lexicographically smallest of these **DFS codes** is the canonical one. gSpan then grows patterns only by **rightmost extension**, adding edges from vertices on the rightmost path of the DFS tree. If a newly grown code is not minimal, the pattern has already been found along another branch, and that branch is cut. This avoids duplicate generation without comparing graphs pairwise.

**Pattern explosion.** Every module so far has met the same problem: at useful supports the output is too big to read. Closed and maximal patterns help, but there are other options.

- **Compressed patterns.** Measure the distance between patterns $P_1$ and $P_2$ by their supporting transaction sets, $D(P_1, P_2) = 1 - \\frac{|T(P_1) \\cap T(P_2)|}{|T(P_1) \\cup T(P_2)|}$. Then cluster patterns so that each cluster has a **representative** pattern that contains the others and is within $\\delta$ of each. If $T(P) = \\{1, \\dots, 6\\}$ and its superpattern $P'$ has $T(P') = \\{1, \\dots, 5\\}$, then $D = 1 - 5/6 = 0.17$. At $\\delta = 0.2$, $P'$ can represent $P$, and the output loses little.
- **Top-k patterns** let the user ask for the $k$ most frequent closed patterns of at least a given length, instead of guessing min_sup. *Redundancy-aware* top-k balances significance against overlap, so the $k$ patterns are not near-copies of each other.
- **Colossal patterns** are very long patterns, say 100 items, that matter in bioinformatics. Any level-wise or depth-first miner first produces their $2^{100}$ sub-patterns. Pattern-fusion methods instead jump to them by merging **core patterns**, the smaller subpatterns whose support sets are close to that of the colossal one.

**Using patterns.** Patterns become useful when they feed something else. They can serve as features for classification (module 7), as building blocks for clustering, as semantic annotations ("this pattern is like these transactions and these other patterns"), and as rules for recommendation and for detecting deviations. A short, non-redundant pattern set is what makes those uses possible.`,
          resources: [
            zm(11, 'Graph Pattern Mining', 'Isomorphism, canonical DFS codes and gSpan with a full worked example. Work through the example by hand.', true),
            {
              title: 'gSpan: Graph-Based Substructure Pattern Mining',
              url: 'https://sites.cs.ucsb.edu/~xyan/papers/gSpan-short.pdf',
              type: 'article',
              cost: 'free',
              provider: 'Yan and Han, ICDM 2002',
              note: 'The gSpan paper: DFS codes, the lexicographic order and rightmost extension.',
            },
            {
              title: 'NetworkX: isomorphism algorithms',
              url: 'https://networkx.org/documentation/stable/reference/algorithms/isomorphism.html',
              type: 'documentation',
              cost: 'free',
              provider: 'NetworkX',
              note: 'VF2 subgraph isomorphism, useful for checking supports in the exercises.',
            },
            patternsCourse('Module 4 lectures on graph pattern mining, pattern summarisation and colossal patterns.'),
          ],
          exercises: [
            {
              slug: 'count-subgraph-support',
              title: 'Support of subgraphs by isomorphism tests',
              prompt:
                'Create 50 small random labelled graphs with NetworkX (8 to 12 vertices, labels C, N, O with probabilities 0.6, 0.2, 0.2, and edges added at random until connected). Using `networkx.algorithms.isomorphism.GraphMatcher` with node labels, count the support of every connected labelled pattern with 1, 2 and 3 edges that you can enumerate from the data. Time how the cost grows with pattern size and comment on why gSpan avoids testing duplicates.',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'delta-compression',
              title: 'Compress a pattern set',
              prompt:
                'Take the closed frequent itemsets of the UK Online Retail baskets at relative support 0.01, with their supporting invoice sets. Implement greedy delta-clustering: repeatedly pick the pattern that covers the most uncovered patterns (a pattern P\' covers P if P ⊆ P\' and D(P, P\') ≤ δ) and make it a representative. Report the number of representatives for δ = 0.1, 0.2 and 0.3, and show three clusters with their representative and members.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why is frequent subgraph mining harder than frequent itemset mining?',
              answerOutline:
                'Support counting needs subgraph isomorphism tests (NP-complete), and the same pattern can be generated in many ways, so duplicate detection also needs isomorphism checks or a canonical form.',
            },
            {
              question: 'How does gSpan avoid generating the same subgraph twice?',
              answerOutline:
                'It uses the minimum DFS code as a canonical label and only grows by rightmost extension; when a grown pattern\'s code is not minimal, it was already found elsewhere and the branch is pruned.',
            },
            {
              question: 'What does delta in delta-clustering control?',
              answerOutline:
                'The maximum distance (based on supporting transaction sets) between a representative and the patterns it covers: larger delta compresses more but loses more support information.',
            },
          ],
          quiz: [
            {
              question: 'Pattern $P$ is supported by transactions {1, 2, 3, 4, 5, 6, 7, 8}, and its superpattern $P\'$ by {1, 2, 3, 4, 5, 6}. What is $D(P, P\')$, and can $P\'$ represent $P$ at $\\delta = 0.2$?',
              options: ['0.75, no', '0.25, yes', '0.33, no', '0.25, no'],
              answer: 3,
              explanation:
                '$D = 1 - |T \\cap T\'|/|T \\cup T\'| = 1 - 6/8 = 0.25$, which is above 0.2, so $P\'$ cannot represent $P$. 0.75 is the Jaccard similarity, not the distance, and 0.33 is 2 lost transactions divided by the 6 that remain.',
            },
            {
              question: 'Why does gSpan grow patterns only by rightmost extension?',
              options: [
                'It reduces the number of isomorphism tests needed to count support to zero',
                'Each pattern then has only one way to be grown from its canonical code, so duplicates are avoided',
                'Rightmost edges always have the highest support',
                'It makes the patterns trees rather than general graphs',
              ],
              answer: 1,
              explanation:
                'Rightmost extension combined with the minimum-DFS-code check means each pattern is generated from exactly one parent, so duplicates are never produced. Support counting still needs to find occurrences, and patterns can still contain cycles.',
            },
            {
              question: 'A colossal pattern has 60 items. Why can\'t Apriori or FP-growth simply output it?',
              options: [
                'They cannot represent itemsets with more than 32 items',
                'Its support is too low by definition',
                'They must first generate its $2^{60} - 2$ frequent proper non-empty subsets on the way',
                'Long patterns violate downward closure',
              ],
              answer: 2,
              explanation:
                'Both methods build long patterns from shorter ones, and every subset of a frequent itemset is frequent. Reaching a 60-itemset therefore means enumerating about $10^{18}$ sub-patterns, which is what pattern-fusion avoids by merging core patterns.',
            },
          ],
          relatedLessons: ['data-structures-algorithms/graphs/graph-representations-bfs-dfs'],
        },
      ],
    },
    {
      slug: 'classification-basics',
      title: 'Classification: Basic Concepts',
      description:
        'Learning a model that assigns class labels, from the data-mining angle: decision-tree induction with its attribute selection measures and scalable variants, Bayesian classifiers, rule-based and lazy learners, and the evaluation methods that tell you whether any of them works.',
      lessons: [
        {
          slug: 'decision-tree-induction',
          title: 'Decision tree induction',
          summary:
            'Top-down greedy induction (ID3, C4.5, CART), attribute selection by information gain, gain ratio and Gini index, numeric split points, pruning, and how RainForest-style methods scale tree building to data on disk.',
          estimatedMinutes: 175,
          objectives: [
            'Compute entropy, information gain, split information, gain ratio and Gini reduction for candidate splits by hand',
            'Explain why information gain favours many-valued attributes and how gain ratio corrects it',
            'Find the best binary split point for a numeric attribute',
            'Describe pre-pruning and post-pruning and when each is used',
            'Explain how AVC-sets let tree induction scale to data that does not fit in memory',
          ],
          concepts: [
            'Greedy top-down recursive partitioning',
            'Entropy and information gain (ID3)',
            'Split information and gain ratio (C4.5)',
            'Gini index and binary splits (CART)',
            'Numeric attributes: midpoint split points',
            'Pre-pruning and post-pruning',
            'AVC-sets and RainForest',
          ],
          explanation: `A **decision tree** tests one attribute at each internal node, has one branch per outcome, and predicts a class at each leaf. It is grown **top-down**. Pick the best attribute for the current set of tuples, partition the tuples by its values, and recurse on each partition. Stop when a partition is pure, when no attributes are left (predict the majority class), or when a stopping rule fires. The whole method rests on how you define "best". Machine Learning covers trees as models (CART, the bias-variance view, ensembles). Here the focus is on the selection measures and on scale.

**Information gain (ID3).** For a partition $D$ with class proportions $p_i$, the **entropy** is $\\text{Info}(D) = -\\sum_i p_i \\log_2 p_i$. Splitting on attribute $A$ into $D_1, \\dots, D_v$ leaves $\\text{Info}_A(D) = \\sum_j \\frac{|D_j|}{|D|}\\text{Info}(D_j)$, and the gain is $\\text{Gain}(A) = \\text{Info}(D) - \\text{Info}_A(D)$.

**Gain ratio (C4.5).** Gain favours attributes with many values. An ID-like attribute splits the data into pure singletons and gets the maximum gain while generalising not at all. C4.5 divides by the **split information** $-\\sum_j \\frac{|D_j|}{|D|}\\log_2 \\frac{|D_j|}{|D|}$, the entropy of the partition sizes.

**Gini index (CART).** $\\text{Gini}(D) = 1 - \\sum_i p_i^2$. CART considers only *binary* splits, picks the one with the smallest weighted child Gini, and splits a numeric attribute at a midpoint $(a_i + a_{i+1})/2$ between sorted adjacent values.

*Worked example.* Below are 14 customers with 9 "yes" responses to a mailing and 5 "no". The root entropy is 0.940 bits and the Gini is 0.459. Splitting on age (young, middle, senior) gives children with 1/4, 4/0 and 4/1 yes/no, so the gain is 0.425 and the gain ratio 0.269. Splitting on store gives seven children with two customers each, many of them pure. That gain is larger, 0.512, but the split information is 2.81, so the gain ratio is only 0.182. Information gain and Gini pick store, which would not generalise to a new store, while gain ratio picks age. Explore the splits and descend into the children:

\`\`\`interactive
mining-tree-split
{"attributes": ["age", "income", "member", "store"], "rows": ["young,high,no,s1,no", "young,high,yes,s1,no", "middle,high,no,s2,yes", "senior,medium,no,s2,yes", "senior,low,no,s3,yes", "senior,low,yes,s3,no", "middle,low,yes,s4,yes", "young,medium,no,s4,no", "young,low,no,s5,yes", "senior,medium,no,s5,yes", "senior,medium,yes,s6,yes", "middle,medium,yes,s6,yes", "middle,high,no,s7,yes", "young,medium,yes,s7,no"], "classLabel": "responded", "measure": "gain", "caption": "At the root, compare the gain of age (0.425) with store (0.512), then switch the measure to gain ratio and see the choice flip to age. Select age and click the young branch: income now splits it perfectly (gain 0.722). Finally grow the whole tree under each measure and compare how many leaves depend on the store identifier."}
\`\`\`

**Overfitting and pruning.** A tree grown until every leaf is pure fits noise. **Pre-pruning** stops early: a minimum gain, a minimum leaf size or a maximum depth. It is cheap, but it can stop just before a useful split. **Post-pruning** grows the full tree and then cuts subtrees back. CART's cost-complexity pruning chooses the trade-off by cross-validation, and C4.5's pessimistic pruning uses an upper confidence bound on each leaf's error. A pruned subtree becomes a leaf with the majority class.

**Scaling to large data.** Choosing a split needs only, for each attribute at each node, the counts of (attribute value, class) pairs, called the **AVC-set**. That is small even when the data are huge. **RainForest** builds the AVC-sets for all the nodes on one level in a single scan, keeps them in memory, and partitions the data on disk only when necessary. BOAT builds a tree from bootstrap samples and then corrects it with a couple of full scans. Classic ID3 and C4.5 assumed the data were in memory; these methods are what made tree induction a data-mining method.

On the UCI Mushroom data, odor alone has a gain of 0.906 of a possible 0.999 bits, and a one-level tree on odor is already 98.5% accurate. You will reproduce that in MP 2.`,
          resources: [
            zm(19, 'Decision Tree Classifier', 'Entropy, Gini and CART measures, numeric and categorical splits, and the cost of evaluating splits. Primary reading.', true),
            tsk('ch3_classification.pdf', 'chapter 3, Classification: Basic Concepts and Techniques (free chapter)', 'Section 3.3 on decision tree induction and 3.4 to 3.5 on overfitting and model selection.'),
            hanSlides(8, 'Classification: Basic Concepts', 'Decision tree induction with the attribute selection measures and the scalable RainForest and BOAT methods.'),
            sk('tree', 'Decision Trees', 'scikit-learn\'s CART implementation: criteria, cost-complexity pruning and how categorical data must be encoded.'),
          ],
          exercises: [
            {
              slug: 'measures-by-hand',
              title: 'Split measures by hand',
              prompt:
                'For the 14-customer table in the lesson: (a) verify the gain, split information, gain ratio and Gini reduction of all four attributes at the root; (b) within age = senior, compute the same four measures for income, member and store, and explain the tie; (c) write `best_split(rows, attrs, measure)` in Python and check it reproduces (a) and (b) to 4 decimals.',
              kind: 'problem',
              difficulty: 1,
              hint: 'Within senior (4 yes, 1 no, entropy 0.722), income, member and store all have gain 0.322. Income and member have split information 0.971 and gain ratio 0.332; store has split information 1.922 and gain ratio 0.168.',
            },
            {
              slug: 'c45-from-scratch',
              title: 'A C4.5-style tree from scratch',
              prompt:
                'Implement a multiway decision tree for categorical attributes with a choice of information gain, gain ratio or Gini, a minimum-leaf-size pre-pruning rule, and a `predict` that falls back to the parent\'s majority class for unseen values. On [UCI Mushroom](https://archive.ics.uci.edu/dataset/73/mushroom), treating "?" as its own value: report the root attribute and its gain, the size of the full tree, and 10-fold stratified cross-validated accuracy. Compare with scikit-learn\'s `DecisionTreeClassifier(criterion="entropy")` on one-hot features.',
              kind: 'coding',
              difficulty: 2,
              hint: 'The root is odor, with gain 0.9061 bits (class entropy 0.9991). The full information-gain tree has 29 nodes (24 leaves) and depth 4, and cross-validated accuracy is 1.000.',
            },
            {
              slug: 'numeric-split-scan',
              title: 'Best numeric split in one sort',
              prompt:
                'Write a function that finds the Gini-optimal binary split of a numeric attribute in O(n log n): sort once, sweep the midpoints keeping running class counts, and skip midpoints between equal values or between tuples of the same class (explain why that is safe). Test it on the "age" column of [UCI Adult](https://archive.ics.uci.edu/dataset/2/adult) against a brute-force O(n^2) version on a 2,000-row sample, then time both on the full 32,561 rows.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does information gain favour attributes with many values, and how does gain ratio fix it?',
              answerOutline:
                'Many small partitions tend to be purer, lowering the weighted entropy even when the attribute does not generalise (an ID gives maximal gain). Gain ratio divides by split information, the entropy of the partition sizes, penalising many-way splits.',
            },
            {
              question: 'What is an AVC-set, and why does it make tree induction scalable?',
              answerOutline:
                'The counts of each (attribute value, class) pair at a node. Split selection needs only these counts, which are small, so they can be built in one scan per tree level without holding the data in memory.',
            },
            {
              question: 'Contrast pre-pruning and post-pruning.',
              answerOutline:
                'Pre-pruning stops growth by a threshold (cheap but may stop before a useful split); post-pruning grows the full tree and replaces subtrees by leaves using validation data or an error estimate (more expensive, usually better).',
            },
          ],
          quiz: [
            {
              question: 'A node has 8 tuples of class P and 8 of class N. Attribute A splits it into (6 P, 2 N) and (2 P, 6 N). What is the information gain of A?',
              options: ['0.811 bits', '0.250 bits', '0.189 bits', '0.500 bits'],
              answer: 2,
              explanation:
                'The parent entropy is 1 bit. Each child has entropy $H(0.75, 0.25) = 0.811$, and the weighted average is also 0.811, so the gain is $1 - 0.811 = 0.189$. 0.811 is the remaining entropy after the split, not the gain.',
            },
            {
              question: 'Two candidate splits have equal information gain. Split X has two children of 50 tuples each, and split Y has ten children of 10 tuples each. Which has the higher gain ratio?',
              options: [
                'Y, because more children means purer partitions',
                'X, because its split information (1 bit) is lower than Y\'s (3.32 bits)',
                'They are equal, because the gains are equal',
                'It cannot be determined without the class counts',
              ],
              answer: 1,
              explanation:
                'Gain ratio is gain divided by split information. X has split information $\\log_2 2 = 1$ and Y has $\\log_2 10 = 3.32$, so with equal gains X\'s ratio is 3.32 times larger. That penalty on many-way splits is exactly what gain ratio is for.',
            },
            {
              question: 'What is the Gini index of a node with class counts 6, 3 and 1?',
              options: ['0.54', '0.46', '1.30', '0.33'],
              answer: 0,
              explanation:
                '$1 - (0.6^2 + 0.3^2 + 0.1^2) = 1 - 0.46 = 0.54$. 0.46 is the sum of squared proportions before subtracting from 1, and 1.30 is the entropy in bits.',
            },
            {
              question: 'A tree reaches 100% training accuracy and 71% on a validation set, against 82% for a depth-4 tree. Which change is most likely to help?',
              options: [
                'Switch the measure from Gini to entropy',
                'Add more attributes so the tree can split further',
                'Use gain instead of gain ratio',
                'Post-prune the full tree using the validation set or cross-validation',
              ],
              answer: 3,
              explanation:
                'The full tree overfits: its leaves fit noise. Pruning back to the subtree with the best validation error addresses that directly. Changing the impurity measure rarely changes accuracy much, and more splits would make the overfitting worse.',
            },
          ],
          relatedLessons: ['machine-learning/trees-ensembles-and-kernels/decision-trees', 'modeling-and-learning/trees-and-non-linear-models/decision-trees'],
        },
        {
          slug: 'bayes-classification',
          title: 'Bayesian classification and naive Bayes',
          summary:
            'Classifying by posterior probability: Bayes\' theorem, the naive conditional-independence assumption, counting on categorical data, the zero-probability problem and Laplace correction, Gaussian likelihoods, and Bayesian belief networks.',
          estimatedMinutes: 145,
          objectives: [
            'Classify a tuple with naive Bayes by hand from a frequency table, including the normalised posterior',
            'Explain the zero-probability problem and apply the Laplace correction',
            'Use Gaussian likelihoods for numeric attributes and log-probabilities to avoid underflow',
            'Explain when the independence assumption hurts and what a Bayesian belief network adds',
          ],
          concepts: [
            'Bayes\' theorem; prior, likelihood, posterior',
            'Maximum a posteriori (MAP) classification',
            'Class-conditional independence',
            'Estimating probabilities by counting',
            'Zero-probability problem and Laplace (add-one) smoothing',
            'Gaussian naive Bayes',
            'Log-probabilities',
            'Bayesian belief networks',
          ],
          explanation: `A **Bayesian classifier** predicts the class $C_i$ with the largest posterior probability given the tuple $X$:
$$P(C_i \\mid X) = \\frac{P(X \\mid C_i)\\,P(C_i)}{P(X)}.$$
$P(X)$ is the same for every class, so it is enough to maximise $P(X \\mid C_i)P(C_i)$. That is the **MAP** decision. The difficulty is $P(X \\mid C_i)$. With 20 categorical attributes of 5 values each there are $5^{20}$ possible tuples, far too many to count. **Naive Bayes** assumes the attributes are conditionally independent given the class:
$$P(X \\mid C_i) = \\prod_{k} P(x_k \\mid C_i).$$
Each factor can be estimated by counting, so training is a single scan that builds a table of (attribute value, class) counts, the same AVC-sets a tree uses. Prediction costs $O(\\text{attributes} \\times \\text{classes})$.

*Worked example*, using the 14 customers from the last lesson with the attributes age and member only. Classify $X$ = (age = young, member = yes). The priors are $P(\\text{yes}) = 9/14$ and $P(\\text{no}) = 5/14$. Among the 9 "yes" customers, 1 is young and 3 are members. Among the 5 "no" customers, 4 are young and 3 are members. So
$$\\text{yes}: \\tfrac{9}{14}\\cdot\\tfrac19\\cdot\\tfrac39 = 0.0238, \\qquad \\text{no}: \\tfrac{5}{14}\\cdot\\tfrac45\\cdot\\tfrac35 = 0.1714.$$
Predict "no", with posterior $0.1714/(0.1714 + 0.0238) = 0.878$.

**Zero counts.** No "no" customer is middle-aged, so $P(\\text{middle} \\mid \\text{no}) = 0$, and any middle-aged tuple gets probability exactly 0 for "no" whatever its other attributes say. The **Laplace correction** adds 1 to every count: $P(x \\mid C) = (\\text{count} + 1)/(n_C + V)$, where $V$ is the number of values of the attribute. Then $P(\\text{middle} \\mid \\text{no})$ becomes $(0+1)/(5+3) = 0.125$. With large data the change to the other estimates is negligible.

**Numeric attributes.** Either discretise them, or assume a Gaussian per class, $P(x_k \\mid C_i) = \\frac{1}{\\sqrt{2\\pi}\\sigma_{ik}} e^{-(x_k - \\mu_{ik})^2/2\\sigma_{ik}^2}$, with the mean and standard deviation estimated from the class's tuples. Multiplying many small probabilities underflows, so compute $\\log P(C_i) + \\sum_k \\log P(x_k \\mid C_i)$ instead.

**When independence fails.** Correlated attributes are counted as independent evidence. On Mushroom, several attributes carry almost the same information as odor, so naive Bayes becomes overconfident. Its probabilities are poorly calibrated even when its *ranking* is good. In MP 2 it reaches about 95.5% cross-validated accuracy where a tree gets 100%. It is still the classic strong baseline for text and very high-dimensional data, because it is fast and needs little data per parameter.

**Bayesian belief networks** relax the assumption. A directed acyclic graph says which attributes depend on which, and each node stores a conditional probability table given its parents. The network encodes $P(X) = \\prod_k P(x_k \\mid \\text{parents}(x_k))$. Naive Bayes is the special case in which the class is the only parent of every attribute.`,
          resources: [
            zm(18, 'Probabilistic Classification', 'Bayes classifier, naive Bayes for categorical and numeric data, and kNN as a density estimate.', true),
            sk('naive_bayes', 'Naive Bayes', 'GaussianNB, MultinomialNB, BernoulliNB and CategoricalNB, with the smoothing parameter alpha.'),
            {
              title: 'Python Data Science Handbook: Naive Bayes Classification',
              url: 'https://jakevdp.github.io/PythonDataScienceHandbook/05.05-naive-bayes.html',
              type: 'textbook',
              cost: 'free',
              provider: 'Jake VanderPlas',
              note: 'Gaussian and multinomial naive Bayes in scikit-learn, with a text example and a discussion of when it works.',
            },
            hanSlides(8, 'Classification: Basic Concepts', 'Bayes classification methods, including the worked naive Bayes example and the Laplacian correction.'),
          ],
          exercises: [
            {
              slug: 'naive-bayes-by-hand',
              title: 'Naive Bayes by hand',
              prompt:
                'Using all four attributes of the 14-customer table, classify (a) X1 = (young, medium, yes, s7) and (b) X2 = (middle, high, yes, s1), without and with Laplace correction. Give the normalised posteriors. In (b), explain what the zero counts do, and why the store attribute makes naive Bayes fragile here.',
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'naive-bayes-from-scratch',
              title: 'Categorical naive Bayes from scratch',
              prompt:
                'Implement categorical naive Bayes with Laplace smoothing (parameter alpha) using log-probabilities. On UCI Mushroom with "?" as its own value: (a) check that your predicted probabilities match `sklearn.naive_bayes.CategoricalNB(alpha=1)` within 1e-9 on an 80/20 stratified split with `random_state=0`; (b) report 10-fold stratified cross-validated accuracy (shuffle, `random_state=0`); (c) drop odor and repeat. Explain the drop.',
              kind: 'coding',
              difficulty: 2,
              hint: 'The expected accuracy is about 0.959 on the holdout split, 0.955 with 10-fold cross-validation, and about 0.896 with odor removed.',
            },
            {
              slug: 'gaussian-nb-calibration',
              title: 'Is naive Bayes calibrated?',
              prompt:
                'Fit Gaussian naive Bayes on the scikit-learn breast cancer data (UCI Breast Cancer Wisconsin Diagnostic, [UCI page](https://archive.ics.uci.edu/dataset/17/breast+cancer+wisconsin+diagnostic)) with a stratified 70/30 split. Plot a reliability diagram (10 bins) of the predicted probabilities, and report accuracy and ROC AUC. Then compute the correlation matrix of the features and connect the calibration you see to the independence assumption.',
              kind: 'data-analysis',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why can naive Bayes ignore P(X) when classifying?',
              answerOutline: 'It is the same for every class, so it does not change which class maximises the posterior; it is only needed to normalise posteriors to sum to 1.',
            },
            {
              question: 'What does the Laplace correction fix, and what does it cost?',
              answerOutline:
                'A single zero count makes the whole product zero, overriding all other evidence; adding one to every count removes zeros at the cost of a small bias that vanishes as counts grow.',
            },
            {
              question: 'Why is naive Bayes often accurate but poorly calibrated?',
              answerOutline:
                'Correlated attributes are multiplied as if independent, double-counting evidence and pushing probabilities toward 0 or 1; the ranking (which class is larger) can still be right.',
            },
          ],
          quiz: [
            {
              question: 'Using the 14-customer table, classify (age = senior, member = no) with naive Bayes on those two attributes. Among the 9 "yes" customers, 4 are senior and 6 are not members; among the 5 "no" customers, 1 is senior and 2 are not members. What is $P(\\text{no} \\mid X)$?',
              options: ['0.130', '0.870', '0.286', '0.400'],
              answer: 0,
              explanation:
                'For yes, $\\tfrac{9}{14}\\cdot\\tfrac49\\cdot\\tfrac69 = 0.1905$, and for no, $\\tfrac{5}{14}\\cdot\\tfrac15\\cdot\\tfrac25 = 0.0286$. So $P(\\text{no} \\mid X) = 0.0286/(0.1905 + 0.0286) = 0.130$, and the prediction is yes. 0.870 is $P(\\text{yes} \\mid X)$.',
            },
            {
              question: 'An attribute has 4 values. Within class C (50 tuples), value v never occurs. What is $P(v \\mid C)$ with the Laplace correction?',
              options: ['0', '1/50', '1/54', '1/4'],
              answer: 2,
              explanation:
                'Add 1 to each of the 4 value counts, so the denominator grows by 4: $(0 + 1)/(50 + 4) = 1/54$. 1/50 adds 1 to the numerator but forgets the denominator, so the probabilities would no longer sum to 1.',
            },
            {
              question: 'A dataset contains two attributes that are exact copies of each other. What happens to naive Bayes?',
              options: [
                'Nothing: duplicated attributes are ignored automatically',
                'It counts that evidence twice, pushing posteriors toward 0 and 1',
                'It fails, because the conditional probability table becomes singular',
                'It becomes a Bayesian belief network with one edge',
              ],
              answer: 1,
              explanation:
                'The likelihood term for that attribute appears squared, so the evidence is over-counted and the probabilities become overconfident. The predicted class often stays the same, but the calibration gets worse. There is no matrix to invert, so nothing becomes singular.',
            },
          ],
          relatedLessons: ['machine-learning/classification-and-evaluation/generative-classifiers', 'probability-statistics/probability-foundations/bayes-theorem'],
        },
        {
          slug: 'rule-based-and-lazy-classifiers',
          title: 'Rule-based classifiers and nearest neighbours',
          summary:
            'IF-THEN rules with coverage and accuracy, conflict resolution, rules read off a tree, sequential covering with FOIL gain and pruning; then lazy learning with k-nearest neighbours, its cost, and how indexes make it scale.',
          estimatedMinutes: 155,
          objectives: [
            'Compute the coverage and accuracy of a rule and resolve conflicts by size or rule ordering',
            'Extract rules from a decision tree and explain why the result is mutually exclusive and exhaustive',
            'Run sequential covering by hand with FOIL gain and prune a rule with FOIL prune',
            'Classify with k-nearest neighbours, choose k, and explain the cost of lazy learning and how indexes reduce it',
          ],
          concepts: [
            'IF-THEN rules: antecedent and consequent',
            'Coverage and accuracy',
            'Conflict resolution: size ordering, rule ordering, decision lists',
            'Rules from a decision tree',
            'Sequential covering (FOIL, RIPPER)',
            'FOIL gain and FOIL prune',
            'Eager versus lazy learning',
            'k-nearest neighbours, distance weighting, kd-trees',
          ],
          explanation: `**Rule-based classifiers** use rules of the form IF *condition* THEN *class*, such as IF age = young AND income = high THEN responded = no. For a rule $R$ on a dataset $D$, the **coverage** is the fraction of tuples whose attributes satisfy the condition, and the **accuracy** is the fraction of covered tuples that have the rule's class. When several rules fire with different classes, **size ordering** prefers the rule with the most conditions (the most specific), **class-based ordering** prefers classes by importance or frequency, and a **decision list** simply takes the first rule that fires in a fixed order. A default rule catches tuples that no rule covers.

**Rules from a tree.** Every root-to-leaf path is a rule. The resulting rule set is **mutually exclusive** (at most one rule fires) and **exhaustive** (exactly one fires), so no conflict resolution is needed. The rules can then be simplified by dropping conditions that do not hurt accuracy, after which they may overlap.

**Sequential covering** learns rules directly, one at a time. Grow a rule for one class, remove the tuples it covers, and repeat. A rule is grown greedily from "IF true", adding the condition that most improves it, as measured by **FOIL gain**. If the current rule covers $pos$ positive and $neg$ negative tuples, and adding a condition leaves $pos'$ and $neg'$, then
$$\\text{FOIL\\_Gain} = pos' \\left(\\log_2 \\frac{pos'}{pos' + neg'} - \\log_2 \\frac{pos}{pos + neg}\\right).$$
The measure rewards both higher accuracy and keeping many positives. Suppose a rule covers 60 positives and 40 negatives. Condition A narrows it to 45 and 5, a gain of $45(\\log_2 0.9 - \\log_2 0.6) = 26.3$. Condition B narrows it to 20 and 0, a pure rule, but its gain is only $20(0 - \\log_2 0.6) = 14.7$. FOIL prefers A. Rules are then pruned on held-out data with $\\text{FOIL\\_Prune}(R) = (pos - neg)/(pos + neg)$: drop the last condition whenever that does not lower the value. RIPPER is the standard industrial version.

**Lazy learners.** Decision trees, naive Bayes and rule learners are *eager*: they build a model at training time. A **k-nearest-neighbour** classifier is *lazy*. It stores the training tuples and, when a query comes, finds the $k$ closest under a distance (module 1, after scaling) and takes a majority vote, optionally weighted by $1/d^2$. Training is free. A naive query costs $O(n \\cdot p)$, which is expensive for large $n$, and for that reason the data-mining literature put great effort into indexes. **kd-trees** and ball trees answer queries in close to $O(\\log n)$ in low dimensions, and locality-sensitive hashing approximates neighbours in high dimensions. The choice of $k$ trades variance (small $k$ follows noise) against bias (large $k$ blurs class boundaries), and it is chosen by cross-validation.

For example, take training points A at (1, 1), (2, 1) and (1, 2), and B at (4, 4), (5, 4), (4, 5) and (3, 3), and the query (2.5, 2.5). The nearest point is (3, 3), class B, at distance 0.71. The next two are A points at 1.58. So $k = 1$ predicts B, $k = 3$ predicts A, and $k = 7$ predicts B, the majority class overall. **Case-based reasoning** applies the same "find similar past cases" idea to symbolic cases, such as help-desk tickets or legal precedents.`,
          resources: [
            tsk('slides/chap4_rule_based.pdf', 'slides, Rule-Based Classifiers', 'Coverage, accuracy, ordering, sequential covering and RIPPER, with small worked examples.', 'lecture'),
            tsk('slides/chap4_knn.pdf', 'slides, Nearest Neighbor Classifiers', 'kNN, choice of k, scaling and the cost of lazy learning.', 'lecture'),
            sk('neighbors', 'Nearest Neighbors', 'k-NN classification, kd-trees and ball trees, and how scikit-learn chooses an algorithm.', ),
            hanSlides(8, 'Classification: Basic Concepts', 'Rule-based classification with sequential covering and FOIL gain.'),
          ],
          exercises: [
            {
              slug: 'foil-by-hand',
              title: 'Sequential covering by hand',
              prompt:
                'On the 14-customer table, learn rules for class "no" by sequential covering. Start from IF true, evaluate every single condition (attribute = value) by FOIL gain, add the best, and continue until the rule covers no "yes" tuples. Remove the covered tuples and learn a second rule. Show every FOIL gain you computed at the first step, and compare your rules with the tree from the decision-tree lesson.',
              kind: 'problem',
              difficulty: 2,
              hint: 'At the first step the rule covers 5 "no" and 9 "yes". The condition age = young covers 4 "no" and 1 "yes", for a gain of 4(log2 0.8 - log2(5/14)) = 4.65, the best single condition.',
            },
            {
              slug: 'knn-with-index',
              title: 'kNN from scratch and with an index',
              prompt:
                'Implement brute-force kNN classification with NumPy (vectorised distances, `argpartition`). On the UCI Optical Recognition of Handwritten Digits data (or `sklearn.datasets.load_digits`, its 8x8 version), choose k from 1 to 15 by 5-fold cross-validation, and check your predictions equal `KNeighborsClassifier(algorithm="brute")`. Then time 1,000 queries on 50,000 synthetic 2-D points and on 50,000 64-D points with brute force and with a kd-tree, and explain the difference.',
              kind: 'coding',
              difficulty: 2,
              hint: 'On load_digits with a stratified 80/20 split at random_state 0 and features scaled to [0, 1], k = 3 gives about 0.986 test accuracy. In 2 dimensions a kd-tree is orders of magnitude faster; in 64 it is barely faster than brute force.',
            },
          ],
          selfAssessment: [
            {
              question: 'Why does a rule set read off a decision tree need no conflict resolution?',
              answerOutline: 'Each tuple follows exactly one root-to-leaf path, so exactly one rule fires: the rules are mutually exclusive and exhaustive.',
            },
            {
              question: 'Why does FOIL gain sometimes prefer a less accurate condition?',
              answerOutline:
                'It multiplies the improvement in log accuracy by the number of positives still covered, so a condition that keeps many positives with a moderate accuracy gain can beat a pure condition that covers few.',
            },
            {
              question: 'What does kNN cost at training and query time, and how can query cost be reduced?',
              answerOutline:
                'Training is just storing the data; a brute-force query costs O(n p). Spatial indexes (kd-trees, ball trees) reduce it in low dimensions, and approximate methods (LSH, graph indexes) in high dimensions.',
            },
          ],
          quiz: [
            {
              question: 'A rule covers 50 positive and 50 negative tuples. Condition C narrows it to 30 positive and 10 negative; condition D to 10 positive and 0 negative. Which has the higher FOIL gain?',
              options: ['D, with gain 10.0', 'C, with gain 17.5', 'D, because it is pure', 'They tie'],
              answer: 1,
              explanation:
                'For C, $30(\\log_2 0.75 - \\log_2 0.5) = 30 \\times 0.585 = 17.5$. For D, $10(\\log_2 1 - \\log_2 0.5) = 10$. FOIL gain multiplies by the positives still covered, so C wins even though D is pure.',
            },
            {
              question: 'Training points: A at (1, 1), (2, 1), (1, 2); B at (4, 4), (5, 4), (4, 5), (3, 3). What does kNN with Euclidean distance predict for (2.5, 2.5) with $k = 1$ and with $k = 3$?',
              options: ['B and B', 'A and A', 'A and B', 'B and A'],
              answer: 3,
              explanation:
                'The nearest point is (3, 3), class B, at 0.71, so $k = 1$ gives B. The next two, (2, 1) and (1, 2), are both A at 1.58, so the three nearest are B, A, A and the vote is A. Choosing $k$ changes the answer, which is why it is tuned by cross-validation.',
            },
            {
              question: 'A rule IF member = yes THEN responded = no is evaluated on 14 tuples: 6 have member = yes, and 3 of those responded "no". What are its coverage and accuracy?',
              options: ['Coverage 6/14 = 0.43, accuracy 3/6 = 0.50', 'Coverage 3/14 = 0.21, accuracy 3/5 = 0.60', 'Coverage 6/14 = 0.43, accuracy 3/14 = 0.21', 'Coverage 3/6 = 0.50, accuracy 3/5 = 0.60'],
              answer: 0,
              explanation:
                'Coverage is the share of tuples the condition matches, 6 of 14. Accuracy is the share of those that have the rule\'s class, 3 of 6. Dividing by the 5 "no" tuples gives the rule\'s share of the class, which is a different quantity (the recall of the rule).',
            },
          ],
          relatedLessons: ['machine-learning/foundations-and-workflow/baselines-and-nearest-neighbours', 'modeling-and-learning/trees-and-non-linear-models/k-nearest-neighbours'],
        },
        {
          slug: 'evaluating-classifiers',
          title: 'Evaluating and comparing classifiers',
          summary:
            'Confusion matrices and the measures built on them, holdout, cross-validation and bootstrap estimates, ROC and precision-recall curves with AUC, and testing whether one classifier really beats another.',
          estimatedMinutes: 155,
          objectives: [
            'Compute accuracy, error rate, sensitivity, specificity, precision, recall, F1 and F-beta from a confusion matrix',
            'Choose between holdout, stratified k-fold cross-validation, leave-one-out and the .632 bootstrap',
            'Draw an ROC curve from scores and compute its AUC by counting ranked pairs',
            'Decide when precision-recall curves are more informative than ROC curves',
            'Test whether two classifiers differ using paired results across the same folds',
          ],
          concepts: [
            'Confusion matrix: TP, FP, TN, FN',
            'Accuracy, sensitivity (recall), specificity, precision',
            'F1 and F-beta',
            'Holdout and random subsampling',
            'Stratified k-fold and leave-one-out cross-validation',
            '.632 bootstrap',
            'ROC curve and AUC; precision-recall curve',
            'Paired comparison of classifiers',
          ],
          explanation: `A classifier is only as good as the estimate of its error on new data. Machine Learning and Modeling and Learning cover the theory of validation in depth. This lesson collects the measures and protocols used in data mining.

**The confusion matrix** for a positive class gives the counts TP, FN, FP and TN. From it come accuracy $(TP + TN)/N$, the error rate $1 - $ accuracy, **sensitivity** or **recall** $TP/(TP + FN)$, **specificity** $TN/(TN + FP)$, and **precision** $TP/(TP + FP)$. Their harmonic mean is $F_1 = 2PR/(P + R)$, and in general $F_\\beta = (1 + \\beta^2)PR/(\\beta^2 P + R)$, which weights recall $\\beta$ times as much as precision. Consider 1,000 tuples with 100 positives, of which a model finds 80 while raising 40 false alarms. Accuracy is $940/1000 = 0.94$, recall 0.80, precision $80/120 = 0.667$, specificity $860/900 = 0.956$ and $F_1 = 0.727$. Accuracy looks fine mostly because the negatives are easy.

**Estimating the error.**

- **Holdout**: train on, say, two thirds of the data and test on the rest. It is simple but noisy.
- **Random subsampling**: repeat the holdout and average.
- **$k$-fold cross-validation**: split the data into $k$ folds, train on $k - 1$, test on the remaining one, and average over all $k$. **Stratified** folds keep the class proportions. Ten folds is the usual default, and **leave-one-out** ($k = n$) is nearly unbiased but expensive and high-variance.
- **.632 bootstrap**: sample $n$ tuples with replacement to train. About 63.2% of the distinct tuples appear in the sample, and the rest serve as the test set. The estimate combines the test error with the optimistic training error: $\\text{Acc} = 0.632\\,\\text{Acc}_{\\text{test}} + 0.368\\,\\text{Acc}_{\\text{train}}$.

All of these assume the tuples are independent. If one customer, patient or day contributes several rows, put all of them in the same fold (grouped cross-validation), or the estimate leaks. The final project depends on this.

**ROC curves.** Most classifiers output a score. Sweeping the decision threshold traces the true-positive rate (recall) against the false-positive rate ($1 - $ specificity), from (0, 0) to (1, 1). The diagonal is random guessing. The **AUC** is the probability that a random positive is scored above a random negative, so you can compute it by counting pairs. Take scores ranked 0.9 (+), 0.8 (+), 0.7 (−), 0.6 (+), 0.55 (−), 0.5 (+), 0.4 (−) and 0.3 (−). Of the $4 \\times 4 = 16$ positive-negative pairs, the positive is ranked higher in $4 + 4 + 3 + 2 = 13$, so AUC $= 13/16 = 0.8125$. ROC curves do not change with class proportions, which is both their strength and their weakness. When positives are rare, a small false-positive *rate* can still mean many false alarms, so a **precision-recall curve** is more informative.

**Comparing classifiers.** Run both on the *same* folds and compare the per-fold differences with a paired $t$-test. Use the corrected resampled variant, because cross-validation folds share training data, or use McNemar's test on a single test set. A one-point difference in mean accuracy on 10 folds is often not significant. And always report a baseline, such as the majority class or a one-attribute rule.`,
          resources: [
            zm(22, 'Classification Assessment', 'Performance measures, ROC analysis, cross-validation and bootstrap, and paired tests for comparing classifiers. Primary reading.', true),
            sk('model_evaluation', 'Metrics and scoring', 'Every metric in this lesson with its scikit-learn function, plus ROC, PR and multiclass averaging.'),
            sk('cross_validation', 'Cross-validation: evaluating estimator performance', 'k-fold, stratified, grouped and time-series splitters, and nested cross-validation for tuning.'),
          ],
          exercises: [
            {
              slug: 'metrics-by-hand',
              title: 'Metrics from a confusion matrix',
              prompt:
                'A churn model on 1,000 customers has TP = 30, FN = 20, FP = 10 and TN = 940. (a) Compute accuracy, precision, recall, specificity, F1 and F2. (b) What accuracy does "predict no churn for everyone" get? (c) If missing a churner costs 10 times as much as a false alarm, which of F1 and F2 better reflects the business goal, and why? (d) Check (a) with `sklearn.metrics`.',
              kind: 'problem',
              difficulty: 1,
              hint: 'Accuracy is 0.97, precision 0.75, recall 0.60, F1 0.667 and F2 0.625. Predicting no churn for everyone gives 0.95.',
            },
            {
              slug: 'roc-from-scratch',
              title: 'ROC and AUC from scratch',
              prompt:
                'Write `roc_points(y, scores)` that sorts by score, handles tied scores by moving diagonally, and returns (FPR, TPR) points, and `auc_pairs(y, scores)` that counts ranked pairs with ties as one half. For the eight scores in the lesson, check that AUC = 0.8125 by both your methods and `sklearn.metrics.roc_auc_score`. Then plot ROC and PR curves for naive Bayes and a depth-3 tree on the Mushroom data with odor removed, and say which model you would choose for a "never miss a poisonous mushroom" goal.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'cv-variance',
              title: 'How noisy is a CV estimate?',
              prompt:
                'On the UCI Adult data with a fixed pipeline (one-hot encoding plus a depth-6 tree), compute 10-fold cross-validated accuracy with 30 different shuffles. Report the mean and the spread of the 30 estimates, the spread across folds within one run, and the result of a corrected resampled t-test comparing the tree with logistic regression. Write three sentences on how large a difference you would need to see before believing it.',
              kind: 'data-analysis',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'Why can accuracy mislead, and what should be reported instead?',
              answerOutline:
                'With imbalanced classes a trivial majority-class model scores highly; report recall, precision (or F-measures), a PR or ROC curve, and a baseline.',
            },
            {
              question: 'What does the AUC measure, in one sentence?',
              answerOutline: 'The probability that a randomly chosen positive gets a higher score than a randomly chosen negative (ties counted as one half).',
            },
            {
              question: 'Why must rows from the same customer be kept in the same fold?',
              answerOutline:
                'Otherwise the model sees near-copies of test rows during training, so the estimate measures memorisation of the customer rather than generalisation to new customers.',
            },
          ],
          quiz: [
            {
              question: 'A screening model has TP = 45, FN = 5, FP = 90, TN = 860. What are its precision and recall?',
              options: ['Precision 0.90, recall 0.33', 'Precision 0.95, recall 0.90', 'Precision 0.33, recall 0.90', 'Precision 0.90, recall 0.95'],
              answer: 2,
              explanation:
                'Precision is $45/(45 + 90) = 0.33$: two of every three alarms are false. Recall is $45/(45 + 5) = 0.90$. Swapping the two is the most common slip. Accuracy, $905/1000 = 0.905$, looks good only because negatives dominate.',
            },
            {
              question: 'Scores ranked from high to low have labels +, −, +, +, −, −. What is the AUC?',
              options: ['0.667', '0.833', '0.500', '0.778'],
              answer: 3,
              explanation:
                'There are $3 \\times 3 = 9$ positive-negative pairs. The first positive beats all 3 negatives, and the other two positives each beat the 2 negatives below them, so $3 + 2 + 2 = 7$ and AUC $= 7/9 = 0.778$.',
            },
            {
              question: 'A .632 bootstrap run gives test accuracy 0.80 on the left-out tuples and training accuracy 0.98. What is the .632 estimate?',
              options: ['0.866', '0.890', '0.800', '0.914'],
              answer: 0,
              explanation:
                '$0.632 \\times 0.80 + 0.368 \\times 0.98 = 0.506 + 0.361 = 0.866$. Swapping the weights gives 0.914, which trusts the optimistic training accuracy too much.',
            },
          ],
          relatedLessons: [
            'machine-learning/classification-and-evaluation/classification-metrics-and-curves',
            'modeling-and-learning/model-selection/cross-validation',
            'modeling-and-learning/classification/metrics-and-thresholds',
          ],
        },
      ],
    },
    {
      slug: 'advanced-classification',
      title: 'Classification: Advanced Methods',
      description:
        'Making classifiers stronger and fit for real data: ensembles (bagging, random forests, boosting), class imbalance and cost-sensitive learning, classification with frequent patterns, and learning when labels are scarce with semi-supervised and active learning.',
      lessons: [
        {
          slug: 'ensemble-methods',
          title: 'Ensembles: bagging, random forests and boosting',
          summary:
            'Why combining classifiers helps, with the majority-vote calculation; bagging and random forests as variance reduction; AdaBoost\'s reweighting by hand; and how gradient boosting and parallel training make ensembles the default for tabular mining.',
          estimatedMinutes: 155,
          objectives: [
            'Compute the accuracy of a majority vote of independent classifiers and explain why correlation limits it',
            'Describe bagging and random forests (Forest-RI and Forest-RC) and their out-of-bag error',
            'Carry out one AdaBoost round by hand: error, classifier weight and tuple reweighting',
            'Compare bagging and boosting in bias, variance, noise sensitivity and parallelism',
          ],
          concepts: [
            'Ensemble and majority (weighted) vote',
            'Independence and correlation of base classifiers',
            'Bagging and bootstrap samples',
            'Random forests: random attribute subsets (Forest-RI, Forest-RC)',
            'Out-of-bag error',
            'AdaBoost: weighted error, classifier weight, reweighting',
            'Gradient boosting (overview)',
            'Bias-variance view of ensembles',
          ],
          explanation: `An **ensemble** combines several base classifiers by a (weighted) vote. Why should it help? Suppose 5 classifiers are each correct 70% of the time and make *independent* errors. The majority is right when at least 3 are right:
$$\\sum_{j=3}^{5}\\binom{5}{j}0.7^j\\,0.3^{5-j} = 0.309 + 0.360 + 0.168 = 0.837.$$
With 25 such classifiers at 65%, the majority is right 94% of the time. Two conditions matter: each classifier must be better than chance (5 classifiers at 45% give a majority of only 41%), and their errors must not be strongly correlated. Every ensemble method is a way to produce diverse, decent classifiers. Machine Learning covers the bias-variance analysis. Here the focus is on the algorithms and on what makes them practical on large data.

**Bagging** (bootstrap aggregating) trains each classifier on a bootstrap sample of the $n$ tuples, drawn with replacement, and takes a majority vote. Each sample omits about 36.8% of the tuples, and predicting each tuple with only the models that did not see it gives the **out-of-bag** error, a free validation estimate. Bagging reduces variance, so it helps unstable learners such as deep trees, barely helps stable ones such as naive Bayes, and the models can be trained in parallel.

**Random forests** decorrelate the bagged trees further. At every split, a tree considers only a random subset of $F$ attributes. In Breiman's **Forest-RI**, $F$ is around $\\log_2 d + 1$, or $\\sqrt d$ in scikit-learn. **Forest-RC** splits on random linear combinations of attributes, which helps when there are few attributes. Trees are grown deep and unpruned. Since each split looks at only $F$ attributes, random forests are also *faster* to grow than one bagged tree on all attributes, and they scale well to many attributes.

**Boosting** trains classifiers *sequentially*, each one focusing on the tuples its predecessors got wrong. In **AdaBoost**, every tuple has a weight, starting at $1/n$. In round $t$, train classifier $M_t$ on the weighted data (or on a sample drawn by weight), and compute its weighted error $\\varepsilon_t$. If $\\varepsilon_t \\ge 0.5$, discard it. Otherwise give it the vote weight
$$\\alpha_t = \\tfrac12 \\ln\\frac{1 - \\varepsilon_t}{\\varepsilon_t},$$
multiply the weights of misclassified tuples by $e^{\\alpha_t}$ and of correct ones by $e^{-\\alpha_t}$, and renormalise. Han's textbook uses $\\log\\frac{1-\\varepsilon}{\\varepsilon}$ without the $\\tfrac12$, which only rescales every $\\alpha$ and leaves the vote unchanged.

*Worked example.* With $\\varepsilon = 0.2$, $\\alpha = \\tfrac12\\ln 4 = 0.693$. Misclassified tuples are multiplied by 2 and correct ones by 0.5. Before normalising, the misclassified tuples hold $0.2 \\times 2 = 0.4$ of the old total and the correct ones $0.8 \\times 0.5 = 0.4$. After normalising, each group holds exactly half the weight. That is always true for this update, and it is why the next classifier cannot simply repeat the last one.

Boosting reduces bias as well as variance, and it usually beats bagging. It can, however, overfit noisy labels, because mislabelled tuples keep gaining weight, and its rounds cannot run in parallel (though each tree can be built in parallel). **Gradient boosting** generalises the idea by fitting each new tree to the gradient of a loss. Its histogram-based implementations (LightGBM, XGBoost, scikit-learn's \`HistGradientBoostingClassifier\`) bin attributes into at most 256 values, which is the AVC idea again, and are the strongest general-purpose classifiers for tabular data today.`,
          resources: [
            sk('ensemble', 'Ensembles: gradient boosting, random forests, bagging, voting, stacking', 'Every method in this lesson with parameters, out-of-bag estimates and the histogram-based boosting implementation.', ),
            {
              title: 'Random Forests',
              url: 'https://link.springer.com/article/10.1023/A:1010933404324',
              type: 'article',
              cost: 'free',
              provider: 'Leo Breiman, Machine Learning (2001)',
              note: 'The original paper: Forest-RI and Forest-RC, out-of-bag estimates, and the strength-correlation bound. Sections 1 to 5.',
              primary: true,
            },
            {
              title: 'A Short Introduction to Boosting',
              url: 'https://cseweb.ucsd.edu/~yfreund/papers/IntroToBoosting.pdf',
              type: 'article',
              cost: 'free',
              provider: 'Freund and Schapire (1999)',
              note: 'AdaBoost by its authors in 14 pages, with the training-error bound and the margin explanation.',
            },
            tsk('slides/chap4_ensemble.pdf', 'slides, Ensemble Techniques', 'Bagging, boosting and random forests with small numeric examples.', 'lecture'),
          ],
          exercises: [
            {
              slug: 'majority-vote',
              title: 'When does voting help?',
              prompt:
                'Write a function for the accuracy of a majority vote of n independent classifiers with accuracy p (n odd). Tabulate it for n = 1, 3, 5, 11, 25 and p = 0.45, 0.55, 0.65, 0.75. Then simulate correlated classifiers: each classifier copies a shared random "common" decision with probability rho, and is otherwise independent. Plot majority accuracy against rho for n = 25, p = 0.65, and explain what this says about random forests\' random attribute selection.',
              kind: 'simulation',
              difficulty: 2,
              hint: 'For independent classifiers, n = 5 at p = 0.7 gives 0.837, and n = 25 at p = 0.65 gives about 0.940. At p = 0.45, voting makes things worse: 5 classifiers give 0.407.',
            },
            {
              slug: 'adaboost-from-scratch',
              title: 'AdaBoost with decision stumps',
              prompt:
                'Implement AdaBoost with depth-1 trees (stumps) trained on weighted data using `DecisionTreeClassifier(max_depth=1)` and `sample_weight`. On the [UCI Spambase data](https://archive.ics.uci.edu/dataset/94/spambase) with a stratified 70/30 split, plot training and test error against the number of rounds up to 300, and check that your test predictions agree with `AdaBoostClassifier(algorithm="SAMME")` with the same stumps (allow small differences from tie-breaking). Then flip 10% of the training labels and repeat: what happens to the weights of the flipped tuples?',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'forest-vs-boosting',
              title: 'Forests and boosting on a real table',
              prompt:
                'On UCI Adult, compare a single tree, bagged trees, a random forest and `HistGradientBoostingClassifier` under the same 5-fold stratified cross-validation. Report accuracy, ROC AUC and training time, and the random forest\'s out-of-bag accuracy beside its cross-validated accuracy. Vary max_features for the forest (1, sqrt(d), d) and explain the effect using the correlation between trees.',
              kind: 'data-analysis',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What two properties must base classifiers have for a majority vote to help?',
              answerOutline: 'Each must be better than random guessing, and their errors must be (close to) independent; correlated errors leave little to vote away.',
            },
            {
              question: 'Why do random forests choose split attributes from a random subset?',
              answerOutline:
                'To decorrelate the trees: without it every tree tends to pick the same strong attributes at the top, so the trees make similar errors. It also speeds up training.',
            },
            {
              question: 'Why can boosting be hurt by label noise while bagging is not?',
              answerOutline:
                'Boosting increases the weight of tuples it misclassifies, and mislabelled tuples are misclassified repeatedly, so later models concentrate on noise; bagging weights all tuples equally.',
            },
          ],
          quiz: [
            {
              question: 'Three independent classifiers are each 80% accurate. What is the accuracy of their majority vote?',
              options: ['0.800', '0.896', '0.992', '0.512'],
              answer: 1,
              explanation:
                'The vote is right when at least 2 of the 3 are right: $3(0.8^2)(0.2) + 0.8^3 = 0.384 + 0.512 = 0.896$. 0.512 is the probability that all three are right, and 0.992 is the probability that at least one is.',
            },
            {
              question: 'In an AdaBoost round the weighted error is $\\varepsilon = 0.1$. With $\\alpha = \\tfrac12\\ln\\frac{1-\\varepsilon}{\\varepsilon}$, by what factor are a misclassified tuple\'s weight and a correct tuple\'s weight multiplied before normalisation?',
              options: ['9 and 1/9', '2 and 1/2', '1.1 and 0.9', '3 and 1/3'],
              answer: 3,
              explanation:
                '$\\alpha = \\tfrac12 \\ln 9 = 1.099$, so the factors are $e^{\\alpha} = 3$ and $e^{-\\alpha} = 1/3$. 9 and 1/9 come from dropping the $\\tfrac12$, which is Han\'s convention for the vote weight, but the standard reweighting uses $e^{\\pm\\alpha}$ with the $\\tfrac12$.',
            },
            {
              question: 'Which base learner benefits least from bagging?',
              options: ['Naive Bayes', 'An unpruned decision tree', 'A 1-nearest-neighbour classifier on noisy data', 'A deep rule set grown until it fits the training data'],
              answer: 0,
              explanation:
                'Bagging reduces variance. Naive Bayes is a stable, low-variance learner, since small changes in the data barely change its counts, so averaging bootstrap copies gives almost the same model. Unpruned trees, 1-NN and fully grown rule sets are all unstable.',
            },
          ],
          relatedLessons: ['machine-learning/trees-ensembles-and-kernels/bagging-and-random-forests', 'machine-learning/trees-ensembles-and-kernels/gradient-boosting'],
        },
        {
          slug: 'class-imbalance',
          title: 'Class imbalance and cost-sensitive classification',
          summary:
            'When the class you care about is rare: why accuracy misleads, resampling by over- and undersampling and SMOTE, threshold moving and cost-sensitive decisions, correcting probabilities after resampling, and evaluating with precision-recall.',
          estimatedMinutes: 145,
          objectives: [
            'Explain why accuracy and even ROC AUC can mislead on imbalanced data, and choose better measures',
            'Apply oversampling, undersampling and SMOTE correctly, inside cross-validation only',
            'Set a decision threshold from misclassification costs',
            'Correct predicted probabilities for undersampling of the majority class',
          ],
          concepts: [
            'Accuracy paradox',
            'Random oversampling and undersampling',
            'SMOTE: synthetic minority samples by interpolation',
            'Threshold moving',
            'Cost matrix and the Bayes-optimal threshold',
            'Prior correction after resampling',
            'Balanced ensembles',
            'Precision-recall evaluation',
          ],
          explanation: `Fraud, rare diseases, equipment failures, churn and readmissions all have the class you care about in the minority, often at 1% or less. A classifier that always predicts "normal" then scores 99% accuracy and finds nothing. That is the **accuracy paradox**. Learners trained to minimise error also tend to ignore the minority class, because getting it wrong costs little in total. Modeling and Learning covers imbalance from a modelling angle. Here the focus is on the data-level methods and on making decisions.

**Evaluate correctly first.** Report recall and precision for the minority class, F-measures, and the **precision-recall curve** with its average precision, whose baseline equals the positive rate. ROC AUC can look high on very imbalanced data while precision at any useful threshold is poor, because the large pool of negatives makes a small false-positive rate into many false alarms.

**Resampling** changes the training distribution.

- **Random oversampling** duplicates minority tuples. It is simple, but the learner can memorise the duplicates.
- **Random undersampling** discards majority tuples. It is fast and often effective on large data, but it throws away information, and repeating it in an ensemble (EasyEnsemble, balanced random forests) recovers most of what is lost.
- **SMOTE** creates *synthetic* minority tuples. For a minority tuple $x$, pick one of its $k$ nearest minority neighbours $x_{nn}$ and a random $\\lambda \\in [0, 1]$, and add $x + \\lambda(x_{nn} - x)$. With $x = (2, 3)$, $x_{nn} = (4, 7)$ and $\\lambda = 0.25$, the new tuple is $(2.5, 4)$. Variants restrict synthesis to tuples near the class border.

The rule that is most often broken: **resample only the training folds**. If you oversample before splitting, copies of the same minority tuple land in both training and test data, and the evaluation is worthless.

**Threshold moving** keeps the data and changes the decision. If a false negative costs $C_{FN}$ and a false positive $C_{FP}$, predict positive when $P(+ \\mid x) > t^* = C_{FP}/(C_{FP} + C_{FN})$. With $C_{FN} = 9$ and $C_{FP} = 1$, $t^* = 0.1$. This needs reasonably calibrated probabilities, so it pairs well with calibration (Modeling and Learning) and with any model that outputs scores. Cost-sensitive learning builds the costs into training instead, through class weights in the loss or impurity.

**Correcting probabilities after undersampling.** If you keep a fraction $\\beta$ of the negatives, the model's probability $p_s$ is too high for the real population. The corrected value is
$$p = \\frac{\\beta\\,p_s}{\\beta\\,p_s - p_s + 1}.$$
With $\\beta = 0.1$ and $p_s = 0.5$, $p = 0.05/0.55 = 0.091$. A tuple that looks like a coin flip in the balanced data is a 9% risk in reality. Forgetting this correction is a common reason resampled models raise far too many alarms in production.

In the final project, 30-day hospital readmissions are 11.4% of encounters. Expect average precision around 0.22 (against a baseline of 0.11), and choose the threshold from a stated budget of follow-up calls, not from 0.5.`,
          resources: [
            {
              title: 'imbalanced-learn user guide',
              url: 'https://imbalanced-learn.org/stable/user_guide.html',
              type: 'documentation',
              cost: 'free',
              provider: 'imbalanced-learn',
              note: 'Over- and undersampling, SMOTE variants, balanced ensembles, and pipelines that resample only inside training folds.',
              primary: true,
            },
            {
              title: 'SMOTE: Synthetic Minority Over-sampling Technique',
              url: 'https://www.jair.org/index.php/jair/article/view/10302',
              type: 'article',
              cost: 'free',
              provider: 'Chawla, Bowyer, Hall and Kegelmeyer, JAIR (2002)',
              note: 'The SMOTE paper; section 4 describes the algorithm and section 5 its evaluation with ROC curves.',
            },
            tsk('slides/chap4_imbalanced_classes.pdf', 'slides, Imbalanced Class Problem', 'Measures, cost-sensitive learning, sampling and ROC and PR curves for rare classes.', 'lecture'),
          ],
          exercises: [
            {
              slug: 'threshold-and-prior',
              title: 'Thresholds and prior correction by hand',
              prompt:
                '(a) A missed fraud costs 200 pounds and a false alarm 5 pounds. What probability threshold minimises expected cost? (b) A model was trained after keeping 20% of the negatives. For a tuple it outputs 0.6. What is the corrected probability? (c) Positives are 0.5% of 1,000,000 transactions. A model flags 10,000 transactions with recall 0.8. What is its precision, and its false-positive rate?',
              kind: 'problem',
              difficulty: 1,
              hint: 'The threshold is 5/205 = 0.024. The corrected probability is 0.12/(0.12 - 0.6 + 1) = 0.231. In (c), 4,000 of the 5,000 frauds are flagged, so precision is 0.40 and the false-positive rate is 6,000/995,000 = 0.6%.',
            },
            {
              slug: 'resampling-done-right',
              title: 'Resampling done right and wrong',
              prompt:
                'Using UCI Bank Marketing (positive rate about 11.7%) and a random forest, compare under 5-fold stratified cross-validation: no resampling; random undersampling; SMOTE; class weights; and threshold moving chosen on an inner split. Use `imblearn.pipeline.Pipeline` so resampling happens inside each training fold, and report average precision, ROC AUC, and recall at precision 0.5. Then run SMOTE *before* splitting and show how much the estimate inflates.',
              kind: 'data-analysis',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why must resampling be done inside each training fold?',
              answerOutline:
                'Resampling before splitting puts copies or interpolations of the same minority tuples in both training and test folds, so the test set is no longer unseen and estimates are inflated.',
            },
            {
              question: 'How do you choose a threshold from costs, and what must be true of the model\'s scores?',
              answerOutline:
                'Predict positive when P(+|x) exceeds C_FP/(C_FP + C_FN); this requires calibrated probabilities (corrected for any resampling).',
            },
            {
              question: 'Why can ROC AUC look good while precision is poor on rare classes?',
              answerOutline:
                'ROC uses the false-positive rate, which stays small when negatives are numerous even if false positives far outnumber true positives; precision exposes that directly.',
            },
          ],
          quiz: [
            {
              question: 'A false negative costs 19 times as much as a false positive. With calibrated probabilities, above what $P(+ \\mid x)$ should you predict positive?',
              options: ['0.95', '0.5', '0.19', '0.05'],
              answer: 3,
              explanation:
                '$t^* = C_{FP}/(C_{FP} + C_{FN}) = 1/(1 + 19) = 0.05$. Predicting positive at 5% risk is optimal because missing a positive is so expensive. 0.95 is the same ratio the wrong way round.',
            },
            {
              question: 'SMOTE takes minority tuple $x = (10, 4)$ and neighbour $x_{nn} = (14, 2)$ with $\\lambda = 0.5$. Where is the new tuple?',
              options: ['(14, 2)', '(12, 3)', '(24, 6)', '(4, -2)'],
              answer: 1,
              explanation:
                '$x + \\lambda(x_{nn} - x) = (10, 4) + 0.5\\,(4, -2) = (12, 3)$, the midpoint of the segment. (4, −2) is the difference vector itself, and (24, 6) is the sum of the two points.',
            },
            {
              question: 'A model is trained after undersampling: only 10% of the negatives were kept. For a new tuple it outputs 0.5. What is the probability in the real population?',
              options: ['0.091', '0.5', '0.05', '0.833'],
              answer: 0,
              explanation:
                '$p = \\beta p_s / (\\beta p_s - p_s + 1) = 0.05/(0.05 - 0.5 + 1) = 0.05/0.55 = 0.091$. Leaving it at 0.5 ignores that 90% of the negatives were removed before training. 0.05 is only the numerator.',
            },
          ],
          relatedLessons: ['machine-learning/classification-and-evaluation/imbalance-calibration-and-multiclass', 'modeling-and-learning/classification/imbalance'],
        },
        {
          slug: 'pattern-based-classification',
          title: 'Classification with frequent patterns',
          summary:
            'Associative classification (CBA, CMAR): mining class association rules, ranking them and pruning by database coverage; and using discriminative frequent patterns as features, with why very rare patterns cannot have high information gain.',
          estimatedMinutes: 135,
          objectives: [
            'Mine class association rules with support and confidence thresholds and rank them as CBA does',
            'Build a CBA classifier by database coverage and classify new tuples with it',
            'Describe how CMAR combines several rules with weighted chi-square',
            'Explain why frequent patterns make good features and why low-support patterns have bounded information gain',
          ],
          concepts: [
            'Class association rules (CARs)',
            'CBA: rule ranking by confidence, support, length',
            'Database coverage pruning and default class',
            'CMAR: multiple rules, weighted chi-square, CR-tree',
            'Discriminative frequent patterns',
            'Information gain upper bound at low support',
            'Pattern-based features for other classifiers',
          ],
          explanation: `Frequent patterns capture *combinations* of attribute values, which single-attribute splits in a tree can miss. **Associative classification** uses them directly.

**CBA** (Liu, Hsu and Ma, 1998) works in three steps.

1. Mine **class association rules** (CARs): rules whose consequent is a class label, $p_1 \\wedge \\dots \\wedge p_k \\Rightarrow c$, with support ≥ min_sup and confidence ≥ min_conf. Any frequent-itemset miner works, with the class added as an item.
2. **Rank** the rules by confidence, then support, then fewer conditions, then generation order.
3. Build the classifier by **database coverage**. Go down the ranked list. Keep a rule if it correctly classifies at least one remaining training tuple, then remove every tuple it covers. When no tuples are left, or no rules are left, set a **default class**, the majority of what remains. To classify, use the first rule that fires.

*Worked example*, using the 14 customers with attributes age, income and member (store left out), min_sup = 2 tuples and min_conf = 0.8. Mining gives 12 CARs. The top-ranked is age = middle ⇒ yes (confidence 1.0, support 4), followed by senior ∧ income = medium ⇒ yes and senior ∧ member = no ⇒ yes (both 1.0 with support 3), and then pure rules with support 2, such as young ∧ income = high ⇒ no. Database coverage keeps 6 rules. Only tuple 6 (senior, low, yes) is left uncovered, so the default class is "no".

**CMAR** (Li, Han and Pei, 2001) addresses CBA's reliance on a single rule. It finds *all* the rules that match a tuple, groups them by class, and scores each group with a **weighted chi-square**, which combines the strength of the correlation and the support. It also prunes redundant and weakly correlated rules, and stores the rules compactly in a CR-tree. Both methods often beat C4.5 on categorical data, because a high-confidence conjunction can be found even when no single attribute looks good.

**Patterns as features.** The other approach mines frequent patterns, keeps the discriminative ones, and adds each as a binary feature ("tuple contains pattern $P$") for any classifier, such as an SVM, a tree or logistic regression. Which patterns help? A key result (Cheng, Yan, Han and Hsu, 2007) is that the **information gain of a pattern is bounded by its support**. A pattern present in a fraction $\\theta$ of tuples can split off at most $\\theta$ of the data, so when $\\theta$ is very small its gain cannot be large. Very low-support patterns therefore cannot be very discriminative, and that justifies choosing min_sup by the gain bound instead of guessing. Patterns with very high support are not discriminative either, because nearly every tuple has them. The useful range is in between. Select features with a gain or Fisher score, and remove redundant patterns that cover almost the same tuples.

Pattern-based classification shines on data where items, sets or sequences are the natural representation: transactions, text n-grams, chemical substructures (the graph patterns from module 5) and program call sequences.`,
          resources: [
            {
              title: 'Integrating Classification and Association Rule Mining',
              url: 'https://cdn.aaai.org/KDD/1998/KDD98-012.pdf',
              type: 'article',
              cost: 'free',
              provider: 'Liu, Hsu and Ma, KDD 1998',
              note: 'The CBA paper: CAR mining, rule ranking and the database-coverage classifier builder (section 4).',
              primary: true,
            },
            hanSlides(9, 'Classification: Advanced Methods', 'Classification using frequent patterns: CBA, CMAR and discriminative pattern-based classification.'),
            hanBook('chapter 7 (classification: advanced methods)', 'Paid. Pattern-based classification, including the information-gain bound and feature selection.'),
          ],
          exercises: [
            {
              slug: 'cba-by-hand',
              title: 'CBA by hand',
              prompt:
                'On the 14-customer table without the store column, with min_sup = 2 tuples and min_conf = 0.8: (a) list all class association rules with one or two conditions; (b) rank them as CBA does; (c) run database coverage and list the kept rules and the default class; (d) classify (young, low, yes) and (senior, high, no). Then write a small Python CBA and check (a) to (c).',
              kind: 'problem',
              difficulty: 2,
              hint: 'There are 12 CARs. Coverage keeps 6: middle ⇒ yes; senior ∧ medium ⇒ yes; senior ∧ member no ⇒ yes; young ∧ high ⇒ no; young ∧ medium ⇒ no; and low ∧ member no ⇒ yes. Tuple 6 remains uncovered, so the default is "no".',
            },
            {
              slug: 'pattern-features-mushroom',
              title: 'Pattern features on Mushroom',
              prompt:
                'Treat each Mushroom tuple (without the class) as a set of attribute=value items. Mine closed frequent itemsets at min_sup 0.2 with FP-growth, compute the information gain of each pattern feature for the class, and keep the 50 best that overlap least (greedily skip patterns whose Jaccard similarity of covered tuples with an already kept one exceeds 0.9). Train logistic regression on (a) one-hot single items and (b) single items plus the 50 pattern features, with odor removed, and compare 10-fold accuracy. Plot each pattern\'s gain against its support and draw the theoretical upper bound.',
              kind: 'coding',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does CBA keep a rule only if it correctly classifies at least one remaining tuple?',
              answerOutline:
                'Database coverage builds a compact decision list: a rule that only covers tuples already handled by higher-ranked rules (or only misclassifies) adds nothing and would never fire usefully.',
            },
            {
              question: 'How does CMAR differ from CBA at classification time?',
              answerOutline:
                'CMAR uses all matching rules, grouped by class and scored with a weighted chi-square, instead of the single best-ranked rule, which makes it less sensitive to one overconfident rule.',
            },
            {
              question: 'Why can very low-support patterns not be strongly discriminative?',
              answerOutline:
                'Information gain is bounded by a function of support: a pattern covering a tiny fraction of tuples can only separate that small fraction, so the entropy reduction it can cause is small.',
            },
          ],
          quiz: [
            {
              question: 'Two CARs both have confidence 0.9. Rule P has support 120 and 3 conditions; rule Q has support 80 and 2 conditions. How does CBA rank them?',
              options: [
                'Q first, because it has fewer conditions',
                'They tie, so the default class decides',
                'P first, because confidence ties are broken by higher support',
                'Q first, because lower support means a more specific rule',
              ],
              answer: 2,
              explanation:
                'CBA ranks by confidence, then support, then rule length. Support breaks the tie in P\'s favour before length is considered. Fewer conditions only matter when both confidence and support tie.',
            },
            {
              question: 'A CBA classifier has the ranked rules (1) age = middle ⇒ yes; (2) young ∧ income = high ⇒ no; (3) member = no ⇒ yes, and default class no. How does it classify (young, high, no)?',
              options: ['no, by rule 2', 'yes, by rule 3', 'no, by the default class', 'yes, because two rules fire and the majority wins'],
              answer: 0,
              explanation:
                'Rules 2 and 3 both match. CBA uses the *first* matching rule in rank order, which is rule 2, so the prediction is "no". Combining all matching rules is what CMAR does, not CBA.',
            },
            {
              question: 'For classification features, which frequent patterns are most likely to be useful?',
              options: [
                'Those with the lowest support, because rare patterns are the most specific',
                'Those with support close to 100%, because they are the most reliable',
                'Only single items, because longer patterns overfit',
                'Patterns of moderate support whose presence differs strongly between classes',
              ],
              answer: 3,
              explanation:
                'Information gain is bounded by support, so very rare patterns cannot separate much. Patterns present in almost every tuple are the same for every class. The discriminative patterns lie in between, and combinations of items can add real information beyond single items.',
            },
          ],
        },
        {
          slug: 'semi-supervised-and-active-learning',
          title: 'Learning with few labels: semi-supervised and active learning',
          summary:
            'When labels are expensive: self-training, co-training and graph-based label propagation; active learning by uncertainty sampling and query-by-committee; and transfer and weak supervision in brief.',
          estimatedMinutes: 135,
          objectives: [
            'Describe self-training and co-training and the assumptions that make them work',
            'Explain label propagation on a similarity graph and the cluster assumption behind it',
            'Rank unlabelled tuples for labelling by least confidence, margin and entropy',
            'Describe query-by-committee and the risks of sampling bias in active learning',
          ],
          concepts: [
            'Labelled and unlabelled data; the labelling bottleneck',
            'Self-training with confidence thresholds',
            'Co-training with two views',
            'Cluster and manifold assumptions',
            'Label propagation on a kNN graph',
            'Active learning: pool-based querying',
            'Uncertainty sampling: least confident, margin, entropy',
            'Query-by-committee; transfer learning; weak supervision',
          ],
          explanation: `In many mining problems, unlabelled data are cheap and labels are expensive: a doctor must read the record, or a fraud analyst must investigate the case. Two families of methods help.

**Semi-supervised learning** uses the unlabelled data to improve a model trained on a few labels.

- **Self-training**: train on the labelled set, predict the unlabelled tuples, add the most confident predictions to the training set as if they were labels, and repeat. It is simple and works when the confident predictions are right. Wrong ones reinforce themselves, so use a high confidence threshold and watch a validation set. scikit-learn's \`SelfTrainingClassifier\` implements it.
- **Co-training**: split the attributes into two **views** that are each sufficient to classify and are roughly conditionally independent given the class. A web page's own text and the text of links pointing to it are the classic pair. Train one classifier per view, and let each label confident tuples for the *other*. Errors from one view are less likely to fool the other.
- **Graph-based methods**: build a similarity graph, such as a kNN graph with Gaussian edge weights, over all the tuples. **Label propagation** then spreads labels along the edges until they stabilise. It relies on the **cluster assumption**: tuples in the same dense region probably share a class. When the classes overlap in the attribute space, unlabelled data can make things worse.

**Active learning** lets the algorithm choose *which* tuples a human should label. In the pool-based setting, train on the current labels, score every unlabelled tuple by how informative a label would be, ask the oracle for the top one (or a batch), retrain, and repeat. The most common scores are forms of **uncertainty sampling**, based on the predicted class distribution $p$:

- **least confident**: $1 - \\max_c p_c$
- **margin**: the gap between the two largest $p_c$, where *smaller* is more informative
- **entropy**: $-\\sum_c p_c \\log_2 p_c$

They can disagree. Take $(0.5, 0.48, 0.02)$ and $(0.4, 0.35, 0.25)$. The first has the smaller margin (0.02 against 0.05), but the second has the higher entropy (1.56 against 1.12 bits) and the larger least-confident score (0.60 against 0.50). Margin says "this tuple is between two classes", while entropy says "this tuple is uncertain overall". **Query-by-committee** trains several models, for example on bootstrap samples, and asks about the tuples they disagree on most. A pitfall: the labelled set is no longer a random sample, so estimate the final error on a separate random test sample, not on the queried tuples.

**Related ideas.** **Transfer learning** reuses a model or representation trained on a related task with plenty of labels, as is common in deep learning. **Weak supervision** writes many noisy labelling rules and combines them, and frequent patterns and rules from earlier modules are natural sources of such rules. Deep learning's self-supervised pretraining is the large-scale form of learning from unlabelled data.`,
          resources: [
            {
              title: 'Active Learning Literature Survey',
              url: 'https://burrsettles.com/pub/settles.activelearning.pdf',
              type: 'article',
              cost: 'free',
              provider: 'Burr Settles, University of Wisconsin-Madison technical report',
              note: 'The standard survey: scenarios, uncertainty sampling, query-by-committee, expected error reduction and practical issues. Sections 1 to 3.',
              primary: true,
            },
            sk('semi_supervised', 'Semi-supervised learning', 'Self-training, label propagation and label spreading with examples and parameters.'),
            hanSlides(9, 'Classification: Advanced Methods', 'The final section on semi-supervised classification, active learning and transfer learning.'),
          ],
          exercises: [
            {
              slug: 'uncertainty-by-hand',
              title: 'Rank tuples for labelling',
              prompt:
                'Five unlabelled tuples have predicted class distributions (0.55, 0.45, 0), (0.9, 0.1, 0), (0.6, 0.3, 0.1), (0.4, 0.35, 0.25) and (0.5, 0.48, 0.02). Rank them by least-confident, margin and entropy sampling, and explain any disagreement. Then write a function that returns all three scores for a probability matrix.',
              kind: 'problem',
              difficulty: 1,
              hint: 'The entropies are 0.993, 0.469, 1.295, 1.559 and 1.121 bits. The margins are 0.10, 0.80, 0.30, 0.05 and 0.02.',
            },
            {
              slug: 'active-learning-curve',
              title: 'An active learning curve',
              prompt:
                'On `load_digits`, start with 20 labelled tuples (2 per class) and a pool of the rest of a 70% training split. Using logistic regression, run 30 rounds of querying 10 tuples each by (a) random sampling, (b) least confident, (c) margin and (d) entropy, and plot test accuracy on the fixed 30% test split against the number of labels. Repeat with 5 seeds and report how many labels each strategy needs to reach 90% accuracy.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'label-propagation',
              title: 'When does label propagation help?',
              prompt:
                'Generate two-moons data (`make_moons(1000, noise=0.08)`), keep 10 labels, and compare a kNN classifier on the labels alone with `LabelSpreading(kernel="knn", n_neighbors=7)` using all points. Then raise the noise to 0.3 and repeat. Plot both cases and explain the result with the cluster assumption.',
              kind: 'simulation',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What can go wrong with self-training, and how do you limit it?',
              answerOutline:
                'Confident but wrong pseudo-labels are added and reinforce themselves (confirmation bias). Use high thresholds, add few tuples per round, and monitor a labelled validation set.',
            },
            {
              question: 'What assumption makes co-training work?',
              answerOutline:
                'Two views of the attributes, each sufficient to classify and roughly conditionally independent given the class, so one view\'s confident labels are informative, unbiased examples for the other.',
            },
            {
              question: 'Why should an active learner\'s final accuracy be measured on a separate random sample?',
              answerOutline:
                'The queried tuples are deliberately the hard, uncertain ones, so they are not representative; error on them (or on a set biased by querying) misestimates performance on the population.',
            },
          ],
          quiz: [
            {
              question: 'Three tuples have predicted distributions A = (0.7, 0.2, 0.1), B = (0.45, 0.44, 0.11) and C = (0.4, 0.3, 0.3). Which does margin sampling query first?',
              options: ['A', 'C', 'B', 'A and C tie'],
              answer: 2,
              explanation:
                'The margins are $0.5$ for A, $0.45 - 0.44 = 0.01$ for B and $0.1$ for C. The smallest margin is queried first, so B. Entropy sampling would pick C instead (1.57 bits, against 1.39 for B), because C is uncertain across all three classes while B is torn between two.',
            },
            {
              question: 'A model labels unlabelled emails, adds those it is at least 99% sure about to the training set, and retrains. What is this method?',
              options: ['Active learning', 'Co-training', 'Label propagation', 'Self-training'],
              answer: 3,
              explanation:
                'Training on its own confident predictions is self-training. Active learning asks a human for labels, co-training needs two views that label for each other, and label propagation spreads labels over a similarity graph.',
            },
            {
              question: 'Label propagation on a kNN graph gives *worse* accuracy than training on the 20 labelled tuples alone. What is the most likely reason?',
              options: [
                'The classes overlap in attribute space, so the cluster assumption fails',
                'There are too many unlabelled tuples',
                'The kNN graph was built with too few neighbours to be connected',
                'Label propagation needs at least 50% of the tuples labelled',
              ],
              answer: 0,
              explanation:
                'Graph methods assume that points in the same dense region share a class. When classes overlap, labels spread across the boundary and add errors. A disconnected graph leaves some tuples unlabelled, which is a different and easily detected failure.',
            },
          ],
          relatedLessons: ['deep-learning/scaling-and-frontier-topics/self-supervised-and-multimodal-learning'],
        },
      ],
    },
    {
      slug: 'cluster-analysis',
      title: 'Cluster Analysis',
      description:
        'Finding groups without labels: partitioning (k-means, k-medoids), hierarchical (AGNES, DIANA, BIRCH), density-based (DBSCAN, OPTICS) and grid-based methods, probabilistic and high-dimensional clustering, and how to tell whether a clustering is any good.',
      lessons: [
        {
          slug: 'partitioning-methods',
          title: 'Partitioning methods: k-means, k-means++ and k-medoids',
          summary:
            'The sum-of-squared-errors objective, Lloyd\'s algorithm step by step, why it finds only local optima, k-means++ seeding, k-medoids (PAM, CLARA, CLARANS) for robustness, and k-modes for categorical data.',
          estimatedMinutes: 165,
          objectives: [
            'State the k-means objective and run Lloyd\'s algorithm by hand to convergence',
            'Show with an example that k-means converges to a local optimum and is pulled by outliers',
            'Compute k-means++ seeding probabilities',
            'Explain PAM\'s swap step and how CLARA and CLARANS make k-medoids scale',
            'Choose between k-means, k-medoids and k-modes for a dataset',
          ],
          concepts: [
            'Partitioning criterion: within-cluster sum of squared errors (SSE)',
            'Lloyd\'s algorithm: assign and update',
            'Local optima and restarts',
            'k-means++ seeding (D-squared weighting)',
            'k-medoids and PAM swaps',
            'CLARA (sampling) and CLARANS (randomised search)',
            'k-modes for categorical data',
            'Mini-batch k-means for large data',
          ],
          explanation: `A **partitioning method** divides $n$ objects into $k$ clusters to optimise a criterion. **k-means** minimises the within-cluster sum of squared errors,
$$\\text{SSE} = \\sum_{j=1}^{k} \\sum_{x \\in C_j} \\|x - c_j\\|^2,$$
where $c_j$ is the mean of cluster $j$. Finding the global optimum is NP-hard, so everyone uses **Lloyd's algorithm**. Pick $k$ initial centres, then repeat two steps: **assign** each object to its nearest centre, and **update** each centre to the mean of its objects. Neither step can increase SSE, and there are finitely many partitions, so the algorithm converges, usually in a few dozen iterations. Each iteration costs $O(nkp)$, which is why k-means scales to huge data. **Mini-batch k-means** updates the centres from small random batches and scales further still.

**It finds a local optimum.** Take the points 1, 2, 3, 8, 9, 10 and 25 with $k = 2$ and initial centres 1 and 2. The first assignment gives {1} and {2, ..., 25}, so the centres move to 1 and 9.5. The next gives {1, 2, 3} and {8, 9, 10, 25}, with centres 2 and 13, and nothing changes after that. SSE is 196. Yet the partition {1, ..., 10} and {25} has SSE 77.5. k-means stopped at a worse partition, and the outlier 25 dragged a centre to 13, where no data lie. In practice, run several initialisations and keep the lowest SSE. Try it below, and then try a bad start by dragging a centroid.

\`\`\`interactive
mining-cluster
{"mode": "kmeans", "modes": ["kmeans"], "preset": "blobs", "k": 3, "init": "random", "seed": 2, "caption": "Press Step to alternate the assign and update steps and watch SSE fall at every half-step. Then try New seed several times: some starts end in a worse local optimum with two centroids sharing one blob. Switch init to k-means++ and compare how often that happens. Finally drag one point far away and see a centroid follow it, the outlier effect from the 1-D example."}
\`\`\`

**k-means++ seeding** chooses the first centre uniformly at random. Each further centre is chosen with probability proportional to $D(x)^2$, the squared distance from $x$ to its nearest centre so far. Far-away points are likely, but not certain, to be picked. With points 1, 2, 3, 8, 9, 10, 25 and a first centre at 9, the squared distances are 64, 49, 36, 1, 0, 1 and 256, so 25 is chosen second with probability $256/407 = 0.63$. The seeding alone is $O(\\log k)$-competitive with the optimum in expectation, and it is scikit-learn's default.

**k-medoids** uses actual objects, the **medoids**, as centres, and minimises the sum of *distances*, not squared distances. Medoids are less pulled by outliers, and any dissimilarity can be used. **PAM** repeatedly tries swapping a medoid with a non-medoid, computes the change in total cost, and keeps the best improving swap. Each iteration costs $O(k(n-k)^2)$, so it is fine for a few thousand objects. **CLARA** runs PAM on several random samples and keeps the best medoids. **CLARANS** searches randomly over swaps instead of trying all of them, and was designed for spatial databases.

**k-modes** handles categorical data. It uses simple-matching dissimilarity and replaces means by **modes**, the most frequent value of each attribute. k-prototypes mixes the two for mixed attributes.

Every partitioning method needs $k$, assumes clusters that are compact and roughly convex, and assigns every object, outliers included. The next lessons remove those assumptions one at a time.`,
          resources: [
            zm(13, 'Representative-based Clustering', 'k-means derived as SSE minimisation, kernel k-means, and EM; the k-means part is this lesson.', true),
            {
              title: 'k-means++: The Advantages of Careful Seeding',
              url: 'https://theory.stanford.edu/~sergei/papers/kMeansPP-soda.pdf',
              type: 'article',
              cost: 'free',
              provider: 'Arthur and Vassilvitskii, SODA 2007',
              note: 'The seeding rule and its O(log k) guarantee. Section 2 defines it; the experiments show the practical gain.',
            },
            clusterCourse('Han\'s own Coursera course; week 2 covers partition-based methods, including k-medoids, CLARA and CLARANS. Auditing is free.'),
            sk('clustering', 'Clustering', 'KMeans, MiniBatchKMeans and the overview table comparing every scikit-learn clustering method by scalability and cluster shape.'),
          ],
          exercises: [
            {
              slug: 'lloyd-by-hand',
              title: 'Lloyd\'s algorithm by hand',
              prompt:
                'Run k-means with k = 2 on the points 1, 2, 3, 8, 9, 10, 25 starting from (a) centres 1 and 2, (b) centres 3 and 25, and (c) centres 9 and 10. For each, list every assignment and update step and the final SSE. Which starts reach the better partition? Then run k-medoids by PAM from medoids 1 and 2, and compare its final clusters with k-means.',
              kind: 'problem',
              difficulty: 1,
              hint: 'Start (a) converges to {1, 2, 3} and {8, 9, 10, 25} with SSE 196. Start (b) reaches {1, ..., 10} and {25} with SSE 77.5.',
            },
            {
              slug: 'kmeanspp-from-scratch',
              title: 'k-means and k-means++ from scratch',
              prompt:
                'Implement Lloyd\'s algorithm and k-means++ seeding in NumPy (vectorised distances, an empty-cluster rule, and a tolerance-based stop). On the customer table from the data-reduction lesson (6 log-transformed, standardised features, 4,334 customers), run k = 2 to 10 with 10 seeds each. For each k, check that your best SSE is within 0.1% of `sklearn.cluster.KMeans(n_clusters=k, n_init=10, random_state=0)`, and plot SSE against k for random and k-means++ seeding (mean and spread over seeds).',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'kmedoids-vs-kmeans',
              title: 'k-medoids against outliers',
              prompt:
                'Implement PAM (build phase plus swap phase) for a precomputed distance matrix. On three Gaussian blobs of 100 points each plus 15 extreme outliers, compare k-means and PAM with k = 3: plot the centres and medoids, and report the adjusted Rand index against the true blobs (ignoring outliers). Then time PAM for n = 500, 1,000 and 2,000 and implement CLARA (5 samples of 40 + 2k) to show the speed-up.',
              kind: 'coding',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does Lloyd\'s algorithm always converge, and why not to the global optimum?',
              answerOutline:
                'Each assign and update step cannot increase SSE and there are finitely many partitions, so it stops; but it is a local descent, and the result depends on the initial centres.',
            },
            {
              question: 'What does k-means++ change, and why does it help?',
              answerOutline:
                'Only the initial centres: each new centre is drawn with probability proportional to squared distance to the nearest chosen centre, spreading centres over the data and avoiding two in one cluster.',
            },
            {
              question: 'When would you prefer k-medoids to k-means?',
              answerOutline:
                'With outliers or heavy tails (medoids minimise distances, not squares), when centres must be real objects, or when only a dissimilarity matrix (any metric, categorical data) is available.',
            },
          ],
          quiz: [
            {
              question: 'Points 2, 4, 10, 12, 14 with $k = 2$ and initial centres 2 and 4. Where are the centres after the first update step?',
              options: ['2 and 10', '3 and 13', '2 and 11', '3 and 12'],
              answer: 0,
              explanation:
                'In the first assignment, 2 goes to centre 2, and 4, 10, 12 and 14 go to centre 4 (10 is closer to 4 than to 2). The updated centres are 2 and $(4 + 10 + 12 + 14)/4 = 10$. In the second iteration 4 moves to the first cluster, and the algorithm converges at 3 and 12, which is a later step, not the first update.',
            },
            {
              question: 'k-means++ has chosen its first centre at 0. The remaining points are at 1, 3 and 6. What is the probability that 6 is chosen next?',
              options: ['1/3', '6/10', '36/46', '1/2'],
              answer: 2,
              explanation:
                'The squared distances to the centre are 1, 9 and 36, which sum to 46, so 6 is chosen with probability $36/46 = 0.78$. Weighting by plain distance gives $6/10$, which is a different and less effective rule.',
            },
            {
              question: 'A dataset of customer records has only categorical attributes (country, channel, segment). Which partitioning method fits?',
              options: ['k-means on the integer codes of the categories', 'Mini-batch k-means', 'k-means++', 'k-modes'],
              answer: 3,
              explanation:
                'k-modes uses a matching dissimilarity and the most frequent value per attribute as the centre. Running k-means on integer codes invents an order and distances between categories that mean nothing.',
            },
          ],
          relatedLessons: ['machine-learning/unsupervised-learning/k-means-and-clustering', 'modeling-and-learning/unsupervised-learning/k-means-and-choosing-k'],
        },
        {
          slug: 'hierarchical-methods',
          title: 'Hierarchical methods: AGNES, DIANA and BIRCH',
          summary:
            'Agglomerative and divisive clustering, single, complete, average and Ward linkage, reading a dendrogram, the quadratic cost, and BIRCH\'s clustering features and CF-tree for one-pass clustering of large data.',
          estimatedMinutes: 155,
          objectives: [
            'Run agglomerative clustering by hand with single, complete and average linkage and draw the dendrogram',
            'Explain the chaining effect of single linkage and the bias of complete and Ward linkage',
            'Compute a BIRCH clustering feature, merge two of them, and derive the centroid and radius',
            'Describe how the CF-tree\'s branching factor and threshold control BIRCH\'s memory use',
          ],
          concepts: [
            'Agglomerative (AGNES) and divisive (DIANA) clustering',
            'Linkage: single, complete, average, Ward',
            'Dendrogram and cutting it',
            'Chaining and sensitivity to outliers',
            'O(n squared) memory and O(n squared log n) time',
            'Clustering feature CF = (N, LS, SS) and additivity',
            'CF-tree: branching factor B, threshold T',
            'Chameleon and probabilistic hierarchical clustering (overview)',
          ],
          explanation: `**Hierarchical clustering** builds a tree of nested clusters, the **dendrogram**, instead of a single partition. Cutting the tree at a height gives a partition, and you can choose $k$ afterwards by looking at the tree.

**AGNES** (agglomerative nesting) starts with every object in its own cluster and repeatedly merges the two closest clusters. "Closest" is the **linkage**:

- **single**: the minimum distance between members
- **complete**: the maximum distance
- **average**: the mean of all pairwise distances
- **Ward**: the merge that increases total SSE the least

*Worked example* with the points 1, 2, 6, 9 and 15. Single linkage merges {1, 2} at 1, then {6, 9} at 3, then {1, 2} with {6, 9} at 4 (the distance from 2 to 6), and 15 last at 6. Complete linkage makes the same first two merges, but {1, 2} and {6, 9} are now 8 apart (from 1 to 9), and {6, 9} and 15 are 9 apart. So they join at 8, and 15 joins at 14. The two trees have the same shape here but very different heights. On other data the shapes differ as well. Single linkage follows chains of close points, which is good for elongated clusters but lets one bridge of noise join two clusters. That is the **chaining effect**. Complete and Ward linkage prefer compact, similar-sized clusters.

**DIANA** (divisive analysis) works top-down. Start with one cluster and repeatedly split the cluster with the largest diameter, by moving out the object with the highest average dissimilarity to the rest and then the objects closer to it. Divisive methods are rarer, because there are $2^{n-1} - 1$ ways to split a cluster in two.

**Cost.** Agglomeration needs the $n \\times n$ distance matrix, which is $O(n^2)$ memory. With a priority queue it takes $O(n^2 \\log n)$ time, and single linkage can be computed in $O(n^2)$ from a minimum spanning tree. That rules it out beyond some tens of thousands of objects, and merges can never be undone.

**BIRCH** (Zhang, Ramakrishnan and Livny, 1996) makes hierarchical clustering scale with a summary. A **clustering feature** of a subcluster is $\\text{CF} = (N, \\text{LS}, \\text{SS})$: the count, the linear sum (a vector) and the sum of squares. CFs are **additive**, so merging two subclusters means adding their CFs. From a CF you get the centroid $\\text{LS}/N$ and the radius $R = \\sqrt{\\text{SS}/N - \\|\\text{LS}/N\\|^2}$. For the points (1, 2), (2, 3) and (3, 4), $N = 3$, LS = (6, 9) and SS = 43, so the centroid is (2, 3) and $R = \\sqrt{43/3 - 13} = 1.155$.

BIRCH reads the data once and inserts each point into a **CF-tree**, a height-balanced tree whose non-leaf nodes hold at most $B$ entries (the branching factor). Each leaf entry is a subcluster whose radius must stay below the **threshold** $T$. A point goes to the closest leaf entry if that keeps the radius below $T$, and otherwise it starts a new entry, with nodes splitting like a B+-tree. If the tree outgrows memory, BIRCH raises $T$ and rebuilds the tree from the leaf entries, without rereading the data. Finally, any clustering method is run on the leaf CFs. BIRCH is linear in $n$, but it suits roughly spherical clusters, and its result depends on the order of insertion.

**Chameleon** merges clusters by relative interconnectivity and closeness on a kNN graph. It finds clusters of arbitrary shape at a higher cost. *Probabilistic* hierarchical clustering merges the pair that most increases the likelihood of a generative model.`,
          resources: [
            zm(14, 'Hierarchical Clustering', 'Agglomerative clustering with every linkage, the Lance-Williams update formula and the cost analysis.', true),
            {
              title: 'BIRCH: An Efficient Data Clustering Method for Very Large Databases',
              url: 'https://www2.cs.sfu.ca/CourseCentral/459/han/papers/zhang96.pdf',
              type: 'article',
              cost: 'free',
              provider: 'Zhang, Ramakrishnan and Livny, SIGMOD 1996',
              note: 'Clustering features, the CF additivity theorem and the CF-tree. Sections 4 and 5.',
            },
            {
              title: 'SciPy: hierarchical clustering (scipy.cluster.hierarchy)',
              url: 'https://docs.scipy.org/doc/scipy/reference/cluster.hierarchy.html',
              type: 'documentation',
              cost: 'free',
              provider: 'SciPy',
              note: '`linkage`, `fcluster` and `dendrogram`, the reference to check your own implementation against.',
            },
            clusterCourse('Week 2 covers hierarchical methods, including BIRCH, CURE and Chameleon.'),
          ],
          exercises: [
            {
              slug: 'linkage-by-hand',
              title: 'Three linkages by hand',
              prompt:
                'For the points 1, 2, 6, 9, 15: (a) run single, complete and average linkage by hand, listing each merge and its height; (b) draw the three dendrograms; (c) check the heights with `scipy.cluster.hierarchy.linkage`. (d) Add the point 4 and redo single linkage. What happens, and why is this the chaining effect?',
              kind: 'problem',
              difficulty: 1,
              hint: 'The merge heights are 1, 3, 4, 6 for single linkage, 1, 3, 8, 14 for complete, and 1, 3, 6, 10.5 for average.',
            },
            {
              slug: 'agnes-from-scratch',
              title: 'AGNES from scratch',
              prompt:
                'Implement agglomerative clustering with single, complete, average and Ward linkage using the Lance-Williams update on a distance matrix. On 500 points sampled from the customer table of the data-reduction lesson, check your merge heights equal SciPy\'s for every linkage (to 1e-9), then cut each tree at k = 4 and compare cluster sizes. Which linkage produces one giant cluster, and why?',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'birch-cf',
              title: 'Clustering features and BIRCH',
              prompt:
                '(a) Two subclusters have CF1 = (3, (6, 9), 43) and CF2 = (2, (10, 4), 58). Merge them and give the centroid and radius. (b) Implement a single-level BIRCH (leaf entries only, no tree) that inserts points one by one into the nearest entry if the radius stays below T. Run it on 100,000 points from `make_blobs(centers=5)` with T = 0.5, then cluster the entry centroids with your k-means and compare with k-means on all points: time and adjusted Rand index.',
              kind: 'coding',
              difficulty: 2,
              hint: 'Merging gives N = 5, LS = (16, 13) and SS = 101, so the centroid is (3.2, 2.6) and the radius is the square root of 101/5 - 17, which is 1.789.',
            },
          ],
          selfAssessment: [
            {
              question: 'What is the chaining effect, and which linkage suffers from it?',
              answerOutline:
                'Single linkage merges clusters joined by any one close pair, so a thin chain of points (or noise) can connect two otherwise separate clusters into one long cluster.',
            },
            {
              question: 'Why can BIRCH merge subclusters and compute radii without the original points?',
              answerOutline:
                'CF = (N, LS, SS) is additive, and centroid and radius are functions of N, LS and SS only; so summaries combine exactly in constant space.',
            },
            {
              question: 'Why is agglomerative clustering limited to moderate n?',
              answerOutline: 'It needs all pairwise distances (O(n^2) memory) and O(n^2 log n) time, and decisions are greedy and irreversible.',
            },
          ],
          quiz: [
            {
              question: 'Clusters $A = \\{1, 2, 6\\}$ and $B = \\{9, 10\\}$ on a line. What are the single-, complete- and average-linkage distances between them?',
              options: ['3, 9 and 6.5', '3, 9 and 6', '4, 9 and 6.5', '3, 8 and 6.5'],
              answer: 0,
              explanation:
                'Single is the closest pair, $9 - 6 = 3$. Complete is the farthest, $10 - 1 = 9$. Average is the mean of all six pairwise distances, $(8 + 9 + 7 + 8 + 3 + 4)/6 = 6.5$. The value 6 is the midpoint of the single and complete distances, which is not what average linkage computes.',
            },
            {
              question: 'A BIRCH leaf entry has CF = (4, (8, 12), 64). What is its radius?',
              options: ['4.00', '3.00', '1.73', '1.00'],
              answer: 2,
              explanation:
                'The centroid is $\\text{LS}/N = (2, 3)$, with squared norm 13, so $R^2 = \\text{SS}/N - \\|\\text{LS}/N\\|^2 = 16 - 13 = 3$ and $R = 1.73$. 4.00 is $\\sqrt{\\text{SS}/N}$, which forgets to subtract the centroid, and 3.00 is $R^2$.',
            },
            {
              question: 'Two dense, round clusters are connected by a thin line of scattered points. Which linkage is most likely to merge them early?',
              options: ['Complete', 'Ward', 'Single', 'Average'],
              answer: 2,
              explanation:
                'Single linkage merges at the closest pair, so a chain of nearby points bridges the clusters at a low height. That is the chaining effect. Complete and Ward linkage look at the farthest points or the increase in variance, so they resist chains.',
            },
          ],
          relatedLessons: ['modeling-and-learning/unsupervised-learning/hierarchical-clustering-and-mixture-models', 'data-structures-algorithms/graphs/minimum-spanning-trees-and-union-find'],
        },
        {
          slug: 'density-and-grid-based-methods',
          title: 'Density-based and grid-based methods: DBSCAN, OPTICS, STING and CLIQUE',
          summary:
            'Clusters as dense regions of any shape: DBSCAN\'s core, border and noise points, choosing eps with a k-distance plot, OPTICS reachability plots for varying density, and grid-based summaries (STING) and subspace search (CLIQUE).',
          estimatedMinutes: 165,
          objectives: [
            'Apply DBSCAN by hand: find core, border and noise points and the clusters',
            'Define directly density-reachable, density-reachable and density-connected',
            'Choose eps and minPts with a k-distance plot and explain how each affects the result',
            'Compute core distances and reachability distances and read an OPTICS reachability plot',
            'Explain how STING and CLIQUE use grids for speed and for subspace clusters',
          ],
          concepts: [
            'eps-neighbourhood and minPts',
            'Core, border and noise points',
            'Density-reachable and density-connected',
            'k-distance plot for choosing eps',
            'OPTICS: core distance, reachability distance, ordering',
            'Varying density and HDBSCAN',
            'STING: hierarchical grid statistics',
            'CLIQUE: dense units and subspace clustering',
          ],
          explanation: `Partitioning and most hierarchical methods find compact, convex clusters and force every point into one. **Density-based** methods define a cluster as a dense region separated by sparse ones. They find clusters of any shape and leave outliers out.

**DBSCAN** (Ester, Kriegel, Sander and Xu, 1996) has two parameters: a radius $\\varepsilon$ and a count minPts. The $\\varepsilon$-neighbourhood $N_\\varepsilon(p)$ is every point within $\\varepsilon$ of $p$, and in this course it includes $p$ itself, as in scikit-learn. A point is a **core** point if $|N_\\varepsilon(p)| \\ge \\text{minPts}$. A point $q$ is *directly density-reachable* from a core point $p$ if $q \\in N_\\varepsilon(p)$. It is *density-reachable* through a chain of such steps, and two points are *density-connected* if both are density-reachable from some core point. A **cluster** is a maximal set of density-connected points. A non-core point inside a cluster is a **border** point, and a point in no cluster is **noise**.

*Worked example* on a line, with points 1, 2, 3, 4, 10, 11, 12 and 20, $\\varepsilon = 1.5$ and minPts = 3. $N(2) = \\{1, 2, 3\\}$ and $N(3) = \\{2, 3, 4\\}$, so 2 and 3 are core points. 1 and 4 have only 2 points in their neighbourhoods, but they lie within $\\varepsilon$ of a core point, so they are border points. Likewise 11 is core and 10 and 12 are border points. 20 is noise. There are two clusters, {1, 2, 3, 4} and {10, 11, 12}. With a spatial index, each neighbourhood query costs about $O(\\log n)$ in low dimensions, so DBSCAN runs in $O(n \\log n)$. Without one it is $O(n^2)$.

\`\`\`interactive
mining-cluster
{"mode": "dbscan", "preset": "moons", "eps": 0.8, "minPts": 4, "caption": "At eps 0.8 and minPts 4, DBSCAN finds the two moons with almost every point core and one noise point. Lower eps to 0.6 and the moons shatter into many small clusters with ten noise points; raise minPts and watch border points turn into noise. Then switch to k-means with k = 2 on the same points: its straight boundary cuts both moons, because SSE favours round clusters."}
\`\`\`

**Choosing the parameters.** A common recipe is to set minPts to about twice the dimension (at least 3 or 4), then plot every point's distance to its $k$-th nearest neighbour, with $k$ = minPts − 1, sorted in decreasing order. Choose $\\varepsilon$ at the "knee", where the distances start to climb. DBSCAN's weakness is **varying density**: one $\\varepsilon$ cannot fit a dense cluster and a sparse one at the same time.

**OPTICS** (Ankerst, Breunig, Kriegel and Sander, 1999) addresses that by computing an *ordering* instead of one clustering. The **core distance** of $p$ is the smallest radius that would make $p$ a core point, that is, the distance to its minPts-th nearest point counting itself. The **reachability distance** of $o$ from $p$ is $\\max(\\text{core-dist}(p), d(p, o))$. OPTICS visits points in order of smallest reachability and plots each point's reachability. Valleys in the plot are clusters, and a horizontal cut at height $\\varepsilon'$ gives the DBSCAN result for any $\\varepsilon' \\le \\varepsilon$. **HDBSCAN** builds a hierarchy from the same idea and extracts the most stable clusters automatically.

**Grid-based methods** quantise the space into cells and work on the cells, so the cost depends on the number of cells, not of points. **STING** keeps a hierarchy of rectangular cells, each storing count, mean, standard deviation, minimum, maximum and distribution type. Queries go top-down and discard irrelevant cells early. **CLIQUE** finds clusters in *subspaces* of high-dimensional data. It partitions each dimension into intervals and calls a unit dense if its share of points exceeds a threshold. Dense units in $k$ dimensions are found Apriori-style from dense units in $k - 1$, because a unit dense in a subspace must be dense in every projection. Connected dense units form the clusters. That is pattern mining reused for clustering.`,
          resources: [
            {
              title: 'A Density-Based Algorithm for Discovering Clusters in Large Spatial Databases with Noise',
              url: 'https://cdn.aaai.org/KDD/1996/KDD96-037.pdf',
              type: 'article',
              cost: 'free',
              provider: 'Ester, Kriegel, Sander and Xu, KDD 1996',
              note: 'The DBSCAN paper: the definitions of section 3, the algorithm in section 4 and the k-distance heuristic for eps.',
              primary: true,
            },
            {
              title: 'OPTICS: Ordering Points To Identify the Clustering Structure',
              url: 'https://www.dbs.ifi.lmu.de/Publikationen/Papers/OPTICS.pdf',
              type: 'article',
              cost: 'free',
              provider: 'Ankerst, Breunig, Kriegel and Sander, SIGMOD 1999',
              note: 'Core distance, reachability distance and the reachability plot (sections 3 and 4).',
            },
            zm(15, 'Density-based Clustering', 'DBSCAN and the DENCLUE kernel-density view, with complexity and worked examples.'),
            clusterCourse('Week 3 covers density-based (DBSCAN, OPTICS, DENCLUE) and grid-based (STING, CLIQUE) methods.'),
          ],
          exercises: [
            {
              slug: 'dbscan-by-hand',
              title: 'DBSCAN by hand',
              prompt:
                'Points on a line: 0, 1, 2, 5, 6, 9, 9.5, 10, 10.5. (a) With eps = 1.2 and minPts = 3 (counting the point itself), classify every point as core, border or noise and list the clusters. (b) Repeat with minPts = 2. (c) Compute every point\'s core distance for minPts = 3, and the OPTICS reachability distance of 2 from 1 and of 5 from 6.',
              kind: 'problem',
              difficulty: 1,
              hint: 'In (a), 1, 9, 9.5, 10 and 10.5 are core points, 0 and 2 are border points, and 5 and 6 are noise, giving two clusters. In (b) every point is core and 5 and 6 form a third cluster. The core distances for minPts = 3 are 2, 1, 2, 3, 3, 1, 0.5, 0.5 and 1.',
            },
            {
              slug: 'dbscan-from-scratch',
              title: 'DBSCAN from scratch with a grid index',
              prompt:
                'Implement DBSCAN with a uniform grid of cell side eps as the neighbourhood index (look up the 3 by 3 block of cells around a point). Check your labels against `sklearn.cluster.DBSCAN` (same eps and min_samples) on `make_moons(2000, noise=0.06)`, up to a renaming of clusters, and confirm the core points are identical. Time both for n = 10^4, 10^5 and 10^6 points in 2-D, and plot the k-distance curve you used to choose eps.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'varying-density',
              title: 'DBSCAN, OPTICS and HDBSCAN on varying density',
              prompt:
                'Generate three Gaussian blobs with standard deviations 0.3, 1.0 and 2.5 (300 points each) plus 60 uniform noise points. Show that no single eps lets DBSCAN recover all three blobs, plot the OPTICS reachability plot (`sklearn.cluster.OPTICS`) and mark the three valleys, and compare with `sklearn.cluster.HDBSCAN`. Report the adjusted Rand index of each against the truth (noise as its own label).',
              kind: 'simulation',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What is the difference between a border point and a noise point in DBSCAN?',
              answerOutline:
                'Neither is core; a border point lies within eps of some core point, so it belongs to that core point\'s cluster; a noise point is not within eps of any core point.',
            },
            {
              question: 'Why does a single eps fail on clusters of different densities, and what does OPTICS do about it?',
              answerOutline:
                'An eps small enough to separate dense clusters fragments sparse ones into noise, and one large enough for sparse clusters merges dense ones. OPTICS records reachability for all eps up to a maximum, so clusters at different density levels appear as valleys of different depths.',
            },
            {
              question: 'How does CLIQUE use the Apriori idea?',
              answerOutline:
                'A unit dense in k dimensions must be dense in every (k-1)-dimensional projection, so candidate dense units in k dimensions are generated only from dense units in k-1 dimensions.',
            },
          ],
          quiz: [
            {
              question: 'Points 0, 1, 2, 5, 6 and 9 on a line, with eps = 1.2 and minPts = 3 counting the point itself. How many core, border and noise points are there?',
              options: ['1 core, 2 border, 3 noise', '3 core, 0 border, 3 noise', '1 core, 4 border, 1 noise', '2 core, 2 border, 2 noise'],
              answer: 0,
              explanation:
                'Only 1 has 3 points within 1.2 (0, 1 and 2), so it is the single core point. 0 and 2 are within eps of it, so they are border points. 5 and 6 have just 2 points each in their neighbourhoods and no core neighbour, so together with 9 they are noise.',
            },
            {
              question: 'In OPTICS with minPts = 3, point $p$ has core distance 0.8. What is the reachability distance from $p$ of a point at distance 0.5 from it, and of a point at distance 1.3?',
              options: ['0.5 and 1.3', '0.8 and 0.8', '0.8 and 1.3', '0.5 and 0.8'],
              answer: 2,
              explanation:
                'The reachability distance is $\\max(\\text{core-dist}(p), d(p, o))$. That gives $\\max(0.8, 0.5) = 0.8$ and $\\max(0.8, 1.3) = 1.3$. Points closer than the core distance are all treated as being at the core distance, which smooths the plot.',
            },
            {
              question: 'Why can CLIQUE find clusters that exist in only 3 of 50 dimensions, when DBSCAN on all 50 cannot?',
              options: [
                'CLIQUE uses a smaller eps',
                'CLIQUE searches subspaces, building dense units in more dimensions only from dense units in fewer',
                'CLIQUE standardises the data first',
                'DBSCAN cannot handle more than 10 dimensions',
              ],
              answer: 1,
              explanation:
                'In the full 50-dimensional space, distances are dominated by the 47 irrelevant dimensions, so no region is dense. CLIQUE looks for dense units dimension by dimension and grows them Apriori-style, so it finds the 3-dimensional subspace where the cluster lives.',
            },
          ],
        },
        {
          slug: 'probabilistic-and-high-dimensional-clustering',
          title: 'Probabilistic, fuzzy and high-dimensional clustering',
          summary:
            'Soft assignments with fuzzy c-means and Gaussian mixtures fitted by EM, then the high-dimensional problem: subspace and projected clustering, biclustering, spectral clustering, and clustering with must-link and cannot-link constraints.',
          estimatedMinutes: 145,
          objectives: [
            'Compute fuzzy c-means memberships and EM responsibilities for a point by hand',
            'Explain what EM optimises for a Gaussian mixture and how it generalises k-means',
            'Explain why distances concentrate in high dimensions and how subspace and projected clustering respond',
            'Describe biclustering and spectral clustering and the problems they fit',
            'Incorporate must-link and cannot-link constraints into a clustering',
          ],
          concepts: [
            'Soft (fuzzy) clustering and membership degrees',
            'Fuzzy c-means and the fuzzifier m',
            'Mixture models and EM: E-step, M-step, log-likelihood',
            'k-means as a limit of EM',
            'Curse of dimensionality for clustering',
            'Subspace (CLIQUE) and projected (PROCLUS) clustering',
            'Biclustering of gene-expression and user-item matrices',
            'Spectral clustering; constraint-based clustering',
          ],
          explanation: `**Soft clustering.** A customer can be partly "bargain hunter" and partly "gift buyer". **Fuzzy c-means** gives each point $i$ a membership $w_{ij} \\in [0, 1]$ in each cluster $j$, with the memberships summing to 1. It minimises $\\sum_{i,j} w_{ij}^m \\|x_i - c_j\\|^2$, where the fuzzifier $m > 1$ controls how soft the clustering is. The update rule is
$$w_{ij} = \\frac{1}{\\sum_{k} \\left(\\frac{d_{ij}}{d_{ik}}\\right)^{2/(m-1)}}.$$
With $m = 2$ and a point at distances 1 and 3 from two centres, $w_1 = 1/(1 + (1/3)^2) = 0.9$ and $w_2 = 0.1$. Centres are membership-weighted means.

**Mixture models and EM.** A probabilistic model says each point was generated by first choosing cluster $j$ with probability $\\pi_j$ and then drawing from a density $f_j$, such as a Gaussian. **EM** maximises the likelihood by alternating two steps. The **E-step** computes responsibilities $r_{ij} = \\pi_j f_j(x_i) / \\sum_k \\pi_k f_k(x_i)$. The **M-step** re-estimates $\\pi_j$, the means and the covariances from the responsibility-weighted points. For example, take two one-dimensional Gaussians with means 0 and 4, standard deviation 1 and equal weights. For $x = 1.5$, $r_1 = e^{-1.125}/(e^{-1.125} + e^{-3.125}) = 1/(1 + e^{-2}) = 0.881$. With equal spherical covariances shrinking to zero, the responsibilities become 0 or 1 and EM becomes k-means. A mixture model also gives you a likelihood, so you can compare models with BIC to choose $k$. Machine Learning derives EM in full. Here the point is that it is the soft, probabilistic version of partitioning.

**High-dimensional data.** In hundreds of dimensions, distances **concentrate**: the nearest and farthest neighbours of a point are almost equally far away, so "closest centre" carries little information. Clusters often live in a few dimensions, and different clusters in different ones. That calls for a different approach.

- **Subspace clustering** searches for clusters in subsets of the dimensions. CLIQUE, from the last lesson, builds dense units bottom-up.
- **Projected clustering** (PROCLUS) assigns each cluster its own set of relevant dimensions and measures distances only in those.
- **Dimensionality reduction first** (PCA, then cluster) works when the clusters lie along high-variance directions, which is not guaranteed.
- **Biclustering** clusters rows and columns at the same time, finding a group of genes that behave alike under a group of conditions, or users who agree on a subset of items.
- **Spectral clustering** builds a similarity graph, takes the leading eigenvectors of its Laplacian, and runs k-means in that embedding. It finds non-convex clusters and has a graph-cut interpretation, at $O(n^3)$ cost for a dense eigen-decomposition, or less with sparse graphs and approximations.

**Constraints.** Domain knowledge often comes as pairwise **must-link** constraints (these two records are the same customer) and **cannot-link** constraints (these two are different stores). COP-k-means assigns each point to the nearest centre that violates no constraint. Softer methods penalise violations in the objective. Must-links are transitive, so take their closure first. Constraints can also be on clusters, such as a minimum or maximum size, as in balanced territories for sales staff.`,
          resources: [
            zm(13, 'Representative-based Clustering', 'Section 13.3 on expectation-maximisation for Gaussian mixtures, with the derivation and a worked example.', true),
            zm(16, 'Spectral and Graph Clustering', 'Graph Laplacians, ratio and normalised cuts, and spectral clustering algorithms.'),
            sk('mixture', 'Gaussian mixture models', 'GaussianMixture with covariance types, BIC model selection and the variational Bayesian variant.'),
            clusterCourse('Week 4 covers probabilistic models, clustering high-dimensional data and constraint-based clustering.'),
          ],
          exercises: [
            {
              slug: 'em-by-hand',
              title: 'One EM iteration by hand',
              prompt:
                'Points on a line: 0, 1, 2, 6, 7. A two-component Gaussian mixture starts with means 1 and 5, both variances 1, and weights 0.5. (a) Compute the responsibilities of component 1 for each point (E-step). (b) Compute the new weights, means and variances (M-step). (c) Compute the log-likelihood before and after and confirm it did not decrease. (d) Check with a 20-line NumPy implementation.',
              kind: 'problem',
              difficulty: 2,
              hint: 'For x = 2 the responsibility of component 1 is 1/(1 + e^{-4}) = 0.982. For x = 6 it is e^{-12.5}/(e^{-12.5} + e^{-0.5}), about 6e-6.',
            },
            {
              slug: 'gmm-vs-kmeans',
              title: 'Mixtures against k-means on elongated clusters',
              prompt:
                'Generate three anisotropic Gaussian clusters (apply a shear matrix to `make_blobs`). Fit k-means and `GaussianMixture` with full covariances for k = 1 to 8. Plot the BIC curve, choose k, and compare the adjusted Rand index of k-means and the mixture against the truth. Then plot the mixture\'s soft assignments by colour intensity and point out the uncertain points.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'concentration-of-distances',
              title: 'Distances concentrate',
              prompt:
                'For uniform random points in d = 2, 10, 50, 200 and 1,000 dimensions, compute for 200 query points the ratio (farthest - nearest)/nearest over 5,000 data points. Plot its mean against d on a log scale. Then plant a cluster in 5 of 200 dimensions (the other 195 uniform) and show that k-means on all dimensions misses it while k-means on the right 5 finds it.',
              kind: 'simulation',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'How is k-means a special case of EM for Gaussian mixtures?',
              answerOutline:
                'With equal weights and spherical covariances sigma^2 I as sigma tends to 0, responsibilities become 0/1 (nearest mean), the E-step becomes assignment, and the M-step becomes the mean update.',
            },
            {
              question: 'Why do distance-based clusterings struggle in high dimensions?',
              answerOutline:
                'Distances concentrate (nearest and farthest neighbours become nearly equidistant), and irrelevant dimensions add noise that swamps the few dimensions where clusters live.',
            },
            {
              question: 'What does a cannot-link constraint change in COP-k-means?',
              answerOutline:
                'A point cannot be assigned to a cluster containing a point it must not link with; it goes to the nearest centre that violates no constraint, or the algorithm reports failure if none exists.',
            },
          ],
          quiz: [
            {
              question: 'Fuzzy c-means with $m = 2$ and two centres. A point is at distance 2 from centre 1 and 4 from centre 2. What is its membership in cluster 1?',
              options: ['0.67', '0.80', '0.50', '0.94'],
              answer: 1,
              explanation:
                '$w_1 = 1/(1 + (2/4)^{2/(m-1)}) = 1/(1 + 0.25) = 0.80$. Using the plain distance ratio without the exponent gives $1/(1 + 0.5) = 0.67$.',
            },
            {
              question: 'A two-component 1-D Gaussian mixture has means 0 and 4, standard deviation 1 for both, and weights 0.7 and 0.3. What is the responsibility of component 1 for $x = 3$?',
              options: ['0.70', '0.50', '0.88', '0.04'],
              answer: 3,
              explanation:
                '$r_1 = 0.7 e^{-4.5}/(0.7 e^{-4.5} + 0.3 e^{-0.5}) = 0.00778/(0.00778 + 0.18196) = 0.041$. The point is much closer to 4, and a prior weight of 0.7 cannot overcome a likelihood ratio of $e^{4} \\approx 55$. 0.70 is just the prior.',
            },
            {
              question: 'A user-by-product rating matrix contains a group of users who agree strongly, but only on a particular subset of products. Which method targets exactly this structure?',
              options: ['DBSCAN on the users', 'Biclustering', 'k-means on the products', 'Agglomerative clustering with Ward linkage'],
              answer: 1,
              explanation:
                'Biclustering finds subsets of rows and columns together, here users and products, that form a coherent block. Clustering the users alone uses all products, and the other products drown the signal.',
            },
          ],
          relatedLessons: ['machine-learning/unsupervised-learning/gaussian-mixtures-and-em'],
        },
        {
          slug: 'evaluating-clusterings',
          title: 'Evaluating clusterings',
          summary:
            'Three questions: is there cluster structure at all (Hopkins statistic), how many clusters (elbow, silhouette, BIC, stability), and how good is a clustering (purity, NMI, ARI, BCubed against labels; silhouette and Davies-Bouldin without).',
          estimatedMinutes: 145,
          objectives: [
            'Assess clustering tendency with the Hopkins statistic and state which convention you use',
            'Compute a point\'s silhouette and a clustering\'s mean silhouette by hand',
            'Compute purity and BCubed precision and recall from a contingency table, and explain why NMI and ARI are preferred',
            'Choose the number of clusters with the elbow, silhouette, BIC and stability, and know when each misleads',
          ],
          concepts: [
            'Clustering tendency and the Hopkins statistic',
            'Choosing k: elbow, silhouette, BIC, stability',
            'Extrinsic measures: purity, entropy, NMI, ARI',
            'BCubed precision and recall',
            'Intrinsic measures: silhouette, Davies-Bouldin',
            'Cluster homogeneity, completeness, rag bag, small cluster preservation',
          ],
          explanation: `Clustering always returns clusters, even on uniform noise. Evaluating it means asking three separate questions.

**1. Is there structure at all?** The **Hopkins statistic** compares nearest-neighbour distances of real points with those of random points. Sample $m$ points uniformly in the data's bounding box and record each one's distance $x_i$ to the nearest data point. Then sample $m$ data points and record each one's distance $y_i$ to its nearest *other* data point. Han's textbook defines $H = \\sum y_i / (\\sum x_i + \\sum y_i)$. For uniform data $H \\approx 0.5$, and for clustered data the $y_i$ are small, so $H$ is close to 0. Many other sources use the reciprocal form $\\sum x_i/(\\sum x_i + \\sum y_i)$, for which clustered data give values close to 1. Always say which one you report.

**2. How many clusters?**

- The **elbow** method plots SSE against $k$ and looks for the bend, but real data often have no clear elbow.
- The **silhouette** of point $i$ is $s(i) = \\frac{b(i) - a(i)}{\\max(a(i), b(i))}$, where $a(i)$ is its mean distance to its own cluster and $b(i)$ is its mean distance to the nearest other cluster. It ranges from $-1$ to 1. Choose the $k$ with the highest mean silhouette.
- Probabilistic models can use **BIC**.
- **Stability** checks whether clusterings of subsamples agree.
- The old rule of thumb $k \\approx \\sqrt{n/2}$ is only a starting point.

For example, with clusters {1, 2, 3} and {7, 8}, point 3 has $a = (2 + 1)/2 = 1.5$ and $b = (4 + 5)/2 = 4.5$, so $s = 1 - 1.5/4.5 = 0.667$.

**3. How good is it?** *Extrinsic* measures compare with known labels, which are used only for evaluation. Take three clusters of 120 objects with class counts (40, 5, 5), (10, 30, 0) and (0, 5, 25).

- **Purity** gives each cluster its majority class: $(40 + 30 + 25)/120 = 0.792$. It is trivially 1 if every object is its own cluster, so it rewards over-splitting.
- **NMI**, normalised mutual information, is 0.474 here, and the **ARI**, adjusted Rand index, is 0.471. ARI is corrected for chance, so random labels score about 0 whatever the number of clusters. NMI and ARI are the standard choices.
- **BCubed** computes, for each object, precision (the share of its cluster that has its class) and recall (the share of its class that is in its cluster), then averages. Here precision is 0.664 and recall 0.662. BCubed is the measure that satisfies four intuitive criteria: cluster **homogeneity** (do not mix classes), **completeness** (do not split classes), the **rag bag** criterion (put misfits in a miscellaneous cluster rather than in a clean one) and **small cluster preservation**.

*Intrinsic* measures use no labels. The mean silhouette rewards compact, well-separated clusters, and **Davies-Bouldin**, where lower is better, averages each cluster's worst ratio of within-cluster spread to between-centre distance. Both favour convex clusters. They will rate k-means above DBSCAN on two moons even when DBSCAN is right, so match the measure to the shape of cluster you are looking for.

The deepest test is external usefulness: do the clusters lead to different decisions? In the final project, k-means on hospital utilisation features gives silhouettes of only 0.16 to 0.19, which is weak structure, yet the clusters' readmission rates range from about 7% to 20%. A clustering can be useful without being "natural".`,
          resources: [
            zm(17, 'Clustering Validation', 'External (purity, entropy, NMI, ARI, BCubed-style pairwise measures), internal (silhouette, Davies-Bouldin) and relative validation, and clustering tendency including the Hopkins statistic.', true),
            {
              title: 'Information Theoretic Measures for Clusterings Comparison',
              url: 'https://jmlr.org/papers/v11/vinh10a.html',
              type: 'article',
              cost: 'free',
              provider: 'Vinh, Epps and Bailey, JMLR (2010)',
              note: 'Why NMI needs a chance correction and when to prefer AMI or ARI. Sections 1 to 4.',
            },
            sk('clustering', 'Clustering performance evaluation', 'The second half of the clustering guide documents ARI, AMI, homogeneity and completeness, silhouette, Calinski-Harabasz and Davies-Bouldin with their properties.'),
          ],
          exercises: [
            {
              slug: 'measures-by-hand',
              title: 'Purity, BCubed and silhouette by hand',
              prompt:
                '(a) For the contingency table in the lesson, compute purity and BCubed precision and recall by hand, then NMI and ARI with scikit-learn. (b) Split the first cluster into two clusters of (40, 0, 0) and (0, 5, 5). Which measures improve and which get worse? (c) For clusters {1, 2, 3} and {7, 8}, compute every point\'s silhouette and the mean, and check with `silhouette_samples`.',
              kind: 'problem',
              difficulty: 1,
              hint: 'For the lesson\'s table, purity is 0.792, NMI 0.474, ARI 0.471 and BCubed precision and recall 0.664 and 0.662. The silhouettes are 0.769, 0.818, 0.667, 0.800 and 0.833.',
            },
            {
              slug: 'hopkins-and-k',
              title: 'Structure, then k',
              prompt:
                'Implement the Hopkins statistic (both conventions, m = 10% of n, 20 repetitions). Compute it for uniform random data, for `make_blobs` with 4 centres, and for the customer table of the data-reduction lesson. For the customer table, plot SSE, mean silhouette and Davies-Bouldin against k = 2 to 10 for k-means, and the BIC of a Gaussian mixture. Do the criteria agree? Write a paragraph recommending a k and saying how confident you are.',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'measure-disagreement',
              title: 'When intrinsic measures lie',
              prompt:
                'On `make_moons(500, noise=0.06)`, cluster with k-means (k = 2) and DBSCAN (choose eps with a k-distance plot). Report the silhouette, Davies-Bouldin and ARI against the true moons for each. Explain why the intrinsic measures prefer the clustering that ARI says is wrong.',
              kind: 'coding',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'Why is purity a poor measure on its own?',
              answerOutline: 'It ignores how classes are split across clusters, so it can be maximised trivially by making many tiny clusters (each object alone gives purity 1).',
            },
            {
              question: 'What does a silhouette near 0 or below 0 mean for a point?',
              answerOutline: 'Near 0, the point is on the border between two clusters (a about equal to b); below 0, it is closer on average to another cluster than to its own and is probably misassigned.',
            },
            {
              question: 'Why is ARI preferred to the plain Rand index?',
              answerOutline:
                'The Rand index is high even for random labellings, especially with many clusters; ARI subtracts the expected value under chance and rescales, so random clusterings score about 0.',
            },
          ],
          quiz: [
            {
              question: 'A point has mean distance 2.0 to the other points in its cluster and 5.0 to the points of the nearest other cluster. What is its silhouette?',
              options: ['0.4', '0.6', '2.5', '-0.6'],
              answer: 1,
              explanation:
                '$s = (b - a)/\\max(a, b) = (5 - 2)/5 = 0.6$. 0.4 is $a/b$, and $-0.6$ swaps $a$ and $b$, which would mean the point is closer to the other cluster.',
            },
            {
              question: 'Two clusters of 50 objects have class counts (20 A, 5 B) and (10 A, 15 B). What is their purity?',
              options: ['0.60', '0.75', '0.50', '0.70'],
              answer: 3,
              explanation:
                'Each cluster contributes its majority class: $(20 + 15)/50 = 0.70$. 0.60 is the share of class A overall, $30/50$.',
            },
            {
              question: 'Using Han\'s convention $H = \\sum y_i/(\\sum x_i + \\sum y_i)$, a dataset gives $H = 0.08$. What does that suggest?',
              options: [
                'The data are close to uniform, so there is little cluster structure',
                'The data are strongly clustered',
                'The data contain about 8% outliers',
                'Nothing, because H must be compared with the number of clusters',
              ],
              answer: 1,
              explanation:
                'The $y_i$ are nearest-neighbour distances between real points. When they are much smaller than the distances from random points, $H$ is close to 0, which indicates strong clustering. Uniform data give about 0.5. Under the reciprocal convention the same data would give 0.92.',
            },
          ],
          relatedLessons: ['modeling-and-learning/unsupervised-learning/k-means-and-choosing-k'],
        },
      ],
    },
    {
      slug: 'outlier-detection',
      title: 'Outlier Detection',
      description:
        'Finding the records that do not fit: kinds of outliers and of detection settings, statistical tests and models, proximity-based scores (distance-based outliers and LOF), and clustering-based, classification-based and isolation-based detectors, with how to evaluate them.',
      lessons: [
        {
          slug: 'outliers-and-statistical-methods',
          title: 'Outliers and statistical detection',
          summary:
            'Global, contextual and collective outliers; supervised, semi-supervised and unsupervised settings; parametric tests (z-scores, Grubbs, Mahalanobis with a chi-square cut-off) and the masking problem; and non-parametric detection with histograms and kernel densities.',
          estimatedMinutes: 145,
          objectives: [
            'Classify an anomaly as global, contextual or collective, and a detection task as supervised, semi-supervised or unsupervised',
            'Apply a z-score rule and Grubbs\'s test by hand and explain masking',
            'Compute a Mahalanobis distance and flag points with a chi-square threshold',
            'Score outliers non-parametrically with histograms or kernel density estimates',
          ],
          concepts: [
            'Global, contextual and collective outliers',
            'Supervised, semi-supervised and unsupervised detection',
            'Outlier versus noise',
            'Parametric methods: z-score, Grubbs\'s test',
            'Masking and swamping; robust estimates (median, MAD)',
            'Mahalanobis distance and the chi-square cut-off',
            'Non-parametric methods: histograms, kernel density',
            'Mixture models for outlier detection',
          ],
          explanation: `An **outlier** is an object that deviates so much from the rest that it seems to have been generated by a different mechanism. That separates it from **noise**, which is random error in ordinary objects. Outliers matter in fraud, intrusion detection, fault detection, medicine and data cleaning. Sometimes the outlier is the discovery, and sometimes it is an error to remove.

**Three kinds.**

- A **global** outlier deviates from the whole dataset, like an order of 80,995 units in a log where the median is 4.
- A **contextual** outlier is unusual only given its context. 28 °C is normal in July and an outlier in January. You must specify *contextual* attributes (time, place) and *behavioural* ones (temperature).
- A **collective** outlier is a group of objects that is unusual together, though each member may be normal: a burst of small transfers between the same accounts, or a run of identical sensor readings.

**Three settings.** Detection is *supervised* when labelled outliers exist, which makes it imbalanced classification (module 7). It is *semi-supervised* when only normal data are labelled, so you model "normal" and flag what does not fit. It is *unsupervised* when there are no labels at all. That is the usual case and the subject of this module, and it relies on outliers being few and different.

**Parametric methods** assume a model of normal data. For univariate Gaussian data, the **z-score** $|x - \\bar x|/s > 3$ flags about 0.27% of normal points. **Grubbs's test** makes this a hypothesis test for one outlier: $G = \\max_i |x_i - \\bar x|/s$, compared with a critical value that depends on $n$ and $\\alpha$.

*Worked example.* For the values 10, 12, 11, 13, 12, 11 and 30, the mean is 14.14, $s = 7.06$ and $G = 15.86/7.06 = 2.25$. The critical value for $n = 7$ at $\\alpha = 0.05$ is 2.02, so 30 is an outlier. Notice that the suspect point inflated $s$ from 1.05 (without it) to 7.06. With two or three such points, none might be flagged. That is **masking**. The cure is **robust** estimates: the median and the MAD, the median absolute deviation, or a robust covariance such as MCD.

For multivariate data, use the **Mahalanobis distance** $D^2(x) = (x - \\mu)^\\top \\Sigma^{-1} (x - \\mu)$, which accounts for scale and correlation. Under a $p$-dimensional Gaussian, $D^2$ follows a $\\chi^2_p$ distribution, so flag points above, say, the 95% or 99% quantile. With $\\mu = 0$ and $\\Sigma = \\text{diag}(4, 1)$, the point (4, 1) has $D^2 = 16/4 + 1 = 5$, below $\\chi^2_{2,0.95} = 5.99$, so it is not flagged. The point (4, 2) has $D^2 = 8$ and is flagged, even though both points are 4 units out on the first axis. A **mixture model** handles normal data with several modes: an object is an outlier if it has low density under every component.

**Non-parametric methods** make fewer assumptions. A **histogram** gives each object an outlier score equal to the inverse of the frequency of its bin, but the result depends on the bin width, just as in discretisation. **Kernel density estimation** smooths the histogram, and the objects with the lowest estimated density are the outliers. In high dimensions every object has low density, so the next lesson turns to neighbourhoods instead.`,
          resources: [
            {
              title: 'NIST e-Handbook: Grubbs\' Test for Outliers',
              url: 'https://www.itl.nist.gov/div898/handbook/eda/section3/eda35h1.htm',
              type: 'documentation',
              cost: 'free',
              provider: 'NIST',
              note: 'The test statistic, critical values, a worked example and the warning about masking.',
              primary: true,
            },
            sk('outlier_detection', 'Novelty and outlier detection', 'EllipticEnvelope (robust Mahalanobis), one-class SVM, isolation forest and LOF, with the difference between novelty and outlier detection.'),
            hanSlides(12, 'Outlier Detection', 'Outliers and outlier analysis, outlier detection methods, and statistical approaches.'),
            hanBook('chapter 11 (outlier detection)', 'Paid. Full treatment of the statistical, proximity-based, clustering-based and classification-based approaches.'),
          ],
          exercises: [
            {
              slug: 'grubbs-by-hand',
              title: 'Grubbs\'s test and masking',
              prompt:
                '(a) Run Grubbs\'s test on 10, 12, 11, 13, 12, 11, 30 at alpha = 0.05 by hand, computing the critical value from the t distribution with SciPy. (b) Add a second value of 29 and repeat: is anything flagged? (c) Replace the mean and standard deviation by the median and 1.4826 times the MAD and flag values more than 3 robust units from the median, for both datasets. Explain the difference.',
              kind: 'problem',
              difficulty: 2,
              hint: 'In (a), G = 2.247 against a critical value of 2.020, so 30 is flagged. With 29 added, the standard deviation grows and Grubbs flags nothing at alpha = 0.05 (check it), while the robust rule flags both.',
            },
            {
              slug: 'mahalanobis-retail',
              title: 'Mahalanobis outliers among customers',
              prompt:
                'On the six log-transformed customer features from the data-reduction lesson, compute Mahalanobis distances with the classical covariance and with `sklearn.covariance.MinCovDet`. Flag customers above the chi-square 0.999 quantile with 6 degrees of freedom under each. How many does each flag, and who are they? Look at their raw features and decide which are errors, which are wholesalers, and which are genuinely unusual.',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'contextual-outliers',
              title: 'Contextual outliers in daily revenue',
              prompt:
                'Build the daily revenue series from the cleaned Online Retail lines. Flag global outliers with a z-score rule on the raw series, then contextual outliers by computing robust z-scores within each (month, weekday) context. List the days flagged by one rule but not the other and explain each one (for example the run-up to Christmas, or a single huge order).',
              kind: 'data-analysis',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What is masking, and how do robust estimators prevent it?',
              answerOutline:
                'Outliers inflate the mean and standard deviation (or covariance) used to judge them, hiding themselves and each other; the median, MAD and minimum covariance determinant are barely affected by a minority of outliers.',
            },
            {
              question: 'Why is the Mahalanobis distance better than Euclidean distance for multivariate outliers?',
              answerOutline:
                'It accounts for different scales and correlations: a point can be unremarkable on each attribute yet violate the correlation structure, and under a Gaussian model its squared distance has a known chi-square distribution.',
            },
            {
              question: 'Give an example of a contextual and of a collective outlier.',
              answerOutline:
                'Contextual: high heating use in summer, or a large purchase at 3 a.m. for a daytime customer. Collective: a sequence of many small transfers between the same accounts, or a flat-lined sensor segment.',
            },
          ],
          quiz: [
            {
              question: 'Data with mean 0 and covariance $\\text{diag}(9, 1)$ in two dimensions. Which point is flagged at the 95% level ($\\chi^2_{2,0.95} = 5.99$)?',
              options: ['(6, 1), with $D^2 = 5$', '(0, 2), with $D^2 = 4$', '(6, 2), with $D^2 = 8$', '(3, 2), with $D^2 = 5$'],
              answer: 2,
              explanation:
                '$D^2 = x_1^2/9 + x_2^2$. That gives $36/9 + 4 = 8 > 5.99$ for (6, 2), so it is flagged. (6, 1) gives $4 + 1 = 5$, (0, 2) gives 4 and (3, 2) gives $1 + 4 = 5$, all below the cut-off. Euclidean distance would rank (6, 1) far above (0, 2), but the first attribute has a standard deviation of 3, so 6 units is only 2 standard deviations.',
            },
            {
              question: 'An electricity meter reads 3 kW at 4 a.m. on a Tuesday. Daytime readings of 3 kW are common, but night-time ones are not. What kind of outlier is this?',
              options: ['Global', 'Collective', 'Noise', 'Contextual'],
              answer: 3,
              explanation:
                'The value is normal overall but unusual in its context, which is the time of day. If it were part of an unusual sequence, such as many nights in a row, the sequence would be a collective outlier.',
            },
            {
              question: 'Values 10, 11, 12, 11, 13, 40, 41 are tested with Grubbs\'s test using the sample mean and standard deviation. What is the likely result, and why?',
              options: [
                'Neither 40 nor 41 is flagged, because together they inflate the standard deviation (masking)',
                'Both are flagged, because each is far from the median',
                'Only 41 is flagged, because Grubbs tests the largest value',
                '10 is flagged, because it is the minimum',
              ],
              answer: 0,
              explanation:
                'With two large values, the mean is 19.7 and $s \\approx 14.2$, so $G = 21.3/14.2 = 1.50$, well below the critical value of about 2.02 for $n = 7$. The pair masks itself. A robust rule based on the median and MAD would flag both.',
            },
          ],
          relatedLessons: ['machine-learning/unsupervised-learning/anomaly-detection-and-recommenders', 'probability-statistics/hypothesis-testing-and-regression/hypothesis-testing-and-p-values'],
        },
        {
          slug: 'proximity-based-methods',
          title: 'Proximity-based detection: distance-based outliers and LOF',
          summary:
            'Outliers as objects with few neighbours: DB(r, pi) outliers, kNN-distance scores, nested-loop and grid-based algorithms that scale them, and the local outlier factor for data with clusters of different density.',
          estimatedMinutes: 155,
          objectives: [
            'Define DB(r, pi) outliers and kNN-distance outlier scores and compute them on small data',
            'Explain how the nested-loop and cell-based algorithms avoid all-pairs distance computation',
            'Compute k-distance, reachability distance, local reachability density and LOF by hand',
            'Explain why LOF handles varying density where a global distance threshold fails',
          ],
          concepts: [
            'Distance-based outliers: DB(r, pi)',
            'kNN distance as an outlier score',
            'Nested-loop algorithm with early termination',
            'Grid (cell) based algorithm: level-1 and level-2 cells',
            'Density-based local outliers',
            'k-distance, k-distance neighbourhood',
            'Reachability distance and local reachability density',
            'Local outlier factor (LOF)',
          ],
          explanation: `Proximity-based methods assume normal objects have close neighbours and outliers do not. They need no distribution, only a distance (module 1).

**Distance-based outliers.** Given a radius $r$ and a fraction $\\pi$, an object $o$ is a **DB($r$, $\\pi$) outlier** if at most a fraction $\\pi$ of the objects lie within $r$ of it. A score-based version ranks objects by the distance to their $k$-th nearest neighbour and reports the top $n$. Computing it naively needs all $n^2$ distances. Two algorithms avoid that.

- The **nested-loop** algorithm scans objects in blocks and, for each object, counts neighbours within $r$, **stopping early** as soon as there are more than $\\pi n$. Normal objects usually stop after a few comparisons, so the average cost is far below $n^2$, and blocking makes the disk I/O efficient.
- The **cell-based** algorithm puts a grid of cell side $r/(2\\sqrt p)$ over the data. Any two objects in the same cell or in neighbouring (level-1) cells are within $r$ of each other. If a cell and its level-1 neighbours together hold more than $\\pi n$ objects, every object in the cell is normal and needs no further work. If the cell, its level-1 neighbours and the next ring (level-2, within $3$ cells) together hold at most $\\pi n$, every object in the cell is an outlier. Only the remaining objects need individual checks. This is linear in $n$, but exponential in the dimension $p$.

**Local outliers.** A single global threshold fails when clusters differ in density. A point at distance 3 from a sparse cluster can be perfectly normal, while a point at distance 1 from a very tight cluster is clearly anomalous. The **local outlier factor** (LOF, Breunig, Kriegel, Ng and Sander, 2000) compares each object's density with that of its neighbours.

- The **k-distance** of $o$ is the distance to its $k$-th nearest neighbour, and $N_k(o)$ is the set of objects within that distance.
- The **reachability distance** of $o$ from $o'$ is $\\text{reach}_k(o \\leftarrow o') = \\max\\{k\\text{-dist}(o'), d(o, o')\\}$. It smooths out tiny distances inside dense regions.
- The **local reachability density** is $\\text{lrd}_k(o) = |N_k(o)| \\big/ \\sum_{o' \\in N_k(o)} \\text{reach}_k(o \\leftarrow o')$.
- $\\text{LOF}_k(o)$ is the average of $\\text{lrd}_k(o')/\\text{lrd}_k(o)$ over $o' \\in N_k(o)$.

An LOF near 1 means the object is as dense as its neighbours. Much greater than 1 means it is sparser, which makes it an outlier.

*Worked example* with $k = 2$ on the points 1, 2, 3, 4 and 10. Points 2 and 3 have a 2-distance of 1, and points 1 and 4 have a 2-distance of 2. Every inner point has lrd $2/3$. For 10, the 2-distance is 7 and $N_2(10) = \\{3, 4\\}$. Its reachability distances are $\\max(1, 7) = 7$ and $\\max(2, 6) = 6$, so its lrd is $2/13 = 0.154$. Then $\\text{LOF}(10) = (0.667/0.154) = 4.33$, while the four inner points have LOF 1.

LOF costs one kNN query per object, so it is $O(n \\log n)$ with an index in low dimensions and $O(n^2)$ without one. The choice of $k$ matters: too small and the score is noisy, too large and small clusters look like outliers. It is common to take the maximum LOF over a range of $k$. Like every distance-based method, LOF weakens in high dimensions, where distances concentrate. Angle-based methods (ABOD) and subspace methods are designed for that case.`,
          resources: [
            sk('outlier_detection', 'Novelty and outlier detection', 'The LocalOutlierFactor section, including novelty mode, the n_neighbors choice and the comparison figure across detectors.'),
            {
              title: 'scikit-learn example: comparing anomaly detection algorithms on toy datasets',
              url: 'https://scikit-learn.org/stable/auto_examples/miscellaneous/plot_anomaly_comparison.html',
              type: 'interactive',
              cost: 'free',
              provider: 'scikit-learn',
              note: 'Robust covariance, one-class SVM, isolation forest and LOF side by side on five data shapes; run it and vary the contamination.',
              primary: true,
            },
            tsk('slides/chap9_anomaly_detection.pdf', 'slides, Anomaly Detection', 'Statistical, proximity-based and density-based detection with the LOF definitions and pictures.', 'lecture'),
            hanSlides(12, 'Outlier Detection', 'Proximity-based approaches: distance-based (nested loop and grid) and density-based (LOF).'),
          ],
          exercises: [
            {
              slug: 'lof-by-hand',
              title: 'LOF by hand',
              prompt:
                'For the points 1, 2, 3, 4, 10 with k = 2, compute every k-distance, neighbourhood, lrd and LOF, and confirm LOF(10) = 4.33. Then add the points 11 and 12 and recompute LOF for 10. What happened, and what does it say about choosing k? Check both cases with `LocalOutlierFactor(n_neighbors=2)`.',
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'db-outliers-nested-loop',
              title: 'DB(r, pi) outliers with early termination',
              prompt:
                'Implement DB(r, pi) outlier detection with the nested-loop algorithm and early termination, counting distance computations. On 100,000 points from three Gaussian blobs plus 200 uniform outliers in 2-D, compare the number of distance computations and the time with a brute-force version, for pi = 0.001 and three values of r. Then implement the cell-based algorithm and report how many objects it classifies without individual checks.',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'lof-varying-density',
              title: 'Global versus local scores',
              prompt:
                'Generate a tight cluster (standard deviation 0.2, 300 points), a loose cluster (standard deviation 2, 300 points), and 10 planted outliers: 5 just outside the tight cluster (distance 1.2 from its centre) and 5 far from everything. Rank all points by kNN distance (k = 10) and by LOF (k = 10). Report precision at 10 for each and plot both scores. Explain which planted outliers each method misses.',
              kind: 'simulation',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does early termination make the nested-loop algorithm fast in practice?',
              answerOutline:
                'Most objects are normal and quickly find more than pi n neighbours within r, so their scan stops early; only outliers (few) need a full scan.',
            },
            {
              question: 'What does an LOF of 1 mean, and of 5?',
              answerOutline: 'LOF 1: the object\'s local density equals its neighbours\'. LOF 5: its neighbours are about five times denser than it is, so it is a local outlier.',
            },
            {
              question: 'Why does the reachability distance use max(k-distance(o\'), d(o, o\'))?',
              answerOutline:
                'It replaces very small distances inside a dense neighbourhood by the neighbour\'s k-distance, which stabilises the density estimate (reduces statistical fluctuation) for objects close to each other.',
            },
          ],
          quiz: [
            {
              question: 'With $n = 10{,}000$ objects, $r = 2$ and $\\pi = 0.001$, object $o$ has 7 objects within distance 2. Is it a DB($r$, $\\pi$) outlier?',
              options: ['No, because 7 is more than $\\pi$', 'Yes, because 7 ≤ 10', 'No, because it has neighbours', 'Yes, because 7 < 1,000'],
              answer: 1,
              explanation:
                'The threshold is $\\pi n = 0.001 \\times 10{,}000 = 10$ objects. With only 7 within $r$, $o$ is an outlier. 1,000 would be $\\pi = 0.1$, and comparing 7 with $\\pi$ itself mixes a count with a fraction.',
            },
            {
              question: 'Point $o$ has $k$-neighbours $a$ and $b$ ($k = 2$), with $d(o, a) = 1$ and $d(o, b) = 3$. The 2-distances are 2 for $a$ and 1 for $b$. What is $\\text{lrd}_2(o)$?',
              options: ['0.5', '0.67', '0.4', '0.25'],
              answer: 2,
              explanation:
                'The reachability distances are $\\max(2, 1) = 2$ from $a$ and $\\max(1, 3) = 3$ from $b$. So $\\text{lrd} = 2/(2 + 3) = 0.4$. Using plain distances gives $2/4 = 0.5$, which ignores $a$\'s 2-distance.',
            },
            {
              question: 'A dataset has a very tight cluster and a very loose one. A point sits 1 unit outside the tight cluster, closer to the tight cluster than many loose-cluster points are to each other. Which method is most likely to flag it?',
              options: ['A global kNN-distance threshold', 'A DB(r, pi) rule with a single r', 'LOF', 'A z-score on each attribute'],
              answer: 2,
              explanation:
                'LOF compares the point\'s density with its neighbours\', which are in the tight cluster, so the point stands out. Any single global distance threshold large enough to accept the loose cluster also accepts this point.',
            },
          ],
        },
        {
          slug: 'clustering-and-classification-based-detection',
          title: 'Clustering-, classification- and isolation-based detection',
          summary:
            'Outliers as points in no cluster, far from clusters or in tiny clusters; detection as one-class or imbalanced classification; isolation forests and their anomaly score; high-dimensional and collective outliers; and evaluating detectors.',
          estimatedMinutes: 155,
          objectives: [
            'Describe the three clustering-based views of outliers and compute a distance-to-centroid score',
            'Explain one-class classification and when supervised detection is appropriate',
            'Compute the isolation forest normalisation c(n) and anomaly scores from path lengths',
            'Choose a detector for high-dimensional, contextual or collective outliers',
            'Evaluate detectors with labels (ROC, precision at n) and without them',
          ],
          concepts: [
            'Outliers as noise in DBSCAN',
            'Distance to the nearest centroid; small-cluster outliers (CBLOF)',
            'One-class SVM and semi-supervised detection',
            'Supervised detection as imbalanced classification',
            'Isolation forest: path length, c(n), anomaly score',
            'High-dimensional outliers: ABOD, subspace methods',
            'Contextual and collective detection by transforming the problem',
            'Evaluation: precision at n, ROC, ADBench and ODDS-style benchmarks',
          ],
          explanation: `**Clustering-based detection** reuses module 8 and takes three views of an outlier.

1. **It belongs to no cluster.** DBSCAN's noise points are exactly this.
2. **It is far from its nearest cluster.** Score each object by its distance to the nearest centroid, divided by the average distance of that cluster's members so the score is relative. k-means is fast, but outliers also move the centroids, so use k-medoids or trim and refit.
3. **It is in a tiny cluster.** A handful of near-identical fraudulent accounts form their own small, dense cluster, so no point in it looks isolated, and density-based scores miss them. CBLOF scores objects by the size of their cluster and the distance to the nearest *large* cluster.

**Classification-based detection.** If labelled anomalies exist, detection is imbalanced classification (module 7), with all its tools: resampling, cost-sensitive thresholds and PR curves. It only finds *known kinds* of anomaly. If only normal data are labelled, a **one-class** model learns a boundary around them. The one-class SVM finds a small region in a kernel feature space that contains most of the normal data, with $\\nu$ bounding the fraction left outside. Anything outside the boundary is a *novelty*.

**Isolation forest** (Liu, Ting and Zhou, 2008) turns the question around. Instead of modelling normal data, it measures how easy each object is to *isolate*. Build many random trees, each on a subsample of $\\psi$ objects (256 by default). Each node picks a random attribute and a random split value between its minimum and maximum, until every object stands alone. Outliers are few and different, so they are isolated near the root, and their **path length** $h(x)$ is short. Normalise by
$$c(n) = 2H(n-1) - \\frac{2(n-1)}{n}, \\qquad H(i) \\approx \\ln i + 0.5772,$$
the average path length of an unsuccessful search in a binary search tree, and score
$$s(x, n) = 2^{-E[h(x)]/c(n)}.$$
For $\\psi = 256$, $c = 10.24$. A mean path of 5 gives $s = 0.71$, a likely anomaly. A path equal to $c$ gives 0.5, which is typical. A path of 12 gives 0.44, which is normal. Isolation forests need no distances, run in $O(t\\,\\psi \\log \\psi)$ to train, and scale to large, high-dimensional data. They are a strong first choice. In the final project the top 1% by isolation score have a readmission rate of 26%, against 11% overall.

**Hard cases.** In *high dimensions*, an object can be an outlier only in some subspace. The angle-based ABOD looks at the variance of the angles to other points, which is small for outliers on the edge of the data, and subspace methods search for projections where the object is sparse. *Contextual* outliers become ordinary ones once you condition on context, for example by detecting within each (hour, weekday) group or on the residuals of a model that predicts behaviour from context. *Collective* outliers need structure: windows of a time series, subgraphs, or sequences turned into feature vectors.

**Evaluation.** With labels, report ROC AUC and precision at $n$, where $n$ is the number of objects you can afford to inspect. Benchmarks such as ADBench collect real datasets with ground truth for comparing detectors. Without labels, inspect the top-ranked objects, check stability across runs and parameters, and say plainly that an outlier score is a ranking for human review, not a verdict.`,
          resources: [
            {
              title: 'Isolation Forest',
              url: 'https://cs.nju.edu.cn/zhouzh/zhouzh.files/publication/icdm08b.pdf',
              type: 'article',
              cost: 'free',
              provider: 'Liu, Ting and Zhou, ICDM 2008',
              note: 'The algorithm, the path-length normalisation c(n) and the anomaly score, with experiments on the effect of subsampling.',
              primary: true,
            },
            {
              title: 'PyOD documentation',
              url: 'https://pyod.readthedocs.io/en/latest/',
              type: 'documentation',
              cost: 'free',
              provider: 'PyOD',
              note: 'A library of over 40 detectors (ABOD, CBLOF, LOF, isolation forest and more) behind one interface; use it to compare with your own implementations.',
            },
            {
              title: 'ADBench: Anomaly Detection Benchmark',
              url: 'https://github.com/Minqi824/ADBench',
              type: 'dataset',
              cost: 'free',
              provider: 'Han, Hu, Huang, Jiang and Zhao (NeurIPS 2022 Datasets and Benchmarks)',
              note: 'Dozens of real datasets with labelled anomalies and baseline results for unsupervised, semi-supervised and supervised detectors.',
            },
          ],
          exercises: [
            {
              slug: 'iforest-scores-by-hand',
              title: 'Isolation scores by hand',
              prompt:
                '(a) Compute c(n) for n = 64, 256 and 1,024. (b) With psi = 256, give the anomaly score for mean path lengths 3, 5, 10.24 and 12. (c) Explain why the score is 0.5 when E[h] = c(n). (d) Using `IsolationForest(random_state=0)`, fit 1-D data of 1,000 standard normal points plus the values 6 and -7, and check that `-score_samples` matches the formula applied to the mean path length you compute from the fitted trees (use `estimator.decision_path` or the trees\' `apply`).',
              kind: 'problem',
              difficulty: 2,
              hint: 'For n = 256, c(n) = 10.245. The scores are 0.816, 0.713, 0.500 and 0.444.',
            },
            {
              slug: 'iforest-from-scratch',
              title: 'An isolation forest from scratch',
              prompt:
                'Implement isolation trees (random attribute, random split, height limit ceil(log2 psi)) with the c(n) adjustment for unsplit leaves, and a forest of 100 trees with psi = 256. On the [Wholesale customers data](https://archive.ics.uci.edu/dataset/292/wholesale+customers) with log-transformed spending, check that your ranking has a Spearman correlation above 0.95 with scikit-learn\'s `IsolationForest` (100 trees, `max_samples=256`), and show the top 10 customers with their spending profiles.',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'detector-bakeoff',
              title: 'A detector bake-off with labels',
              prompt:
                'Pick two datasets from ADBench with labelled anomalies (for example a tabular one and a high-dimensional one). Compare z-score on the Mahalanobis distance, LOF, distance to the nearest k-means centroid, one-class SVM and isolation forest by ROC AUC and precision at n (n = the number of true anomalies), averaged over 5 seeds. Explain which assumptions each winner fits and each loser violates.',
              kind: 'data-analysis',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'Why can a small, dense group of anomalies fool density-based detectors?',
              answerOutline:
                'Each member has close neighbours (the other anomalies), so its local density is high and LOF is near 1; detecting it needs cluster-size information (small clusters) or labels.',
            },
            {
              question: 'Why are outliers isolated with short path lengths in random trees?',
              answerOutline:
                'Being few and far from the bulk, they are separated from the rest by a random split with high probability early on, while normal points in dense regions need many splits to be singled out.',
            },
            {
              question: 'When is supervised outlier detection appropriate, and what is its limitation?',
              answerOutline:
                'When reliable labels of past anomalies exist and future anomalies resemble them; it cannot detect new kinds of anomaly, and it must handle extreme class imbalance.',
            },
          ],
          quiz: [
            {
              question: 'An isolation forest uses subsamples of $\\psi = 256$, so $c(256) = 10.24$. A point\'s mean path length is 3. What is its anomaly score?',
              options: ['0.82', '0.29', '0.50', '0.71'],
              answer: 0,
              explanation:
                '$s = 2^{-3/10.24} = 2^{-0.293} = 0.816$, close to 1, so the point is very likely an anomaly. 0.29 is the exponent $3/10.24$ itself, and 0.71 is the score for a mean path length of 5.',
            },
            {
              question: 'A bank has two years of transactions labelled fraud or not, and new kinds of fraud appear every few months. Which combination makes most sense?',
              options: [
                'A supervised classifier alone, retrained yearly',
                'A one-class model on fraud cases only',
                'Distance to the nearest k-means centroid alone',
                'A supervised classifier for known fraud patterns plus an unsupervised detector for new ones',
              ],
              answer: 3,
              explanation:
                'The labels let a classifier catch known fraud patterns well, but it cannot flag new kinds. An unsupervised detector such as an isolation forest catches unusual behaviour without labels. A one-class model should be trained on *normal* data, not on the rare class.',
            },
            {
              question: 'A detector is used to choose 100 claims a week for manual review. Which evaluation measure matches that use best?',
              options: ['Accuracy over all claims', 'ROC AUC', 'Precision at 100', 'Mean outlier score'],
              answer: 2,
              explanation:
                'The reviewers see the top 100, so what matters is how many of those are true problems: precision at $n = 100$. ROC AUC measures the whole ranking, including parts nobody looks at, and accuracy is dominated by the many normal claims.',
            },
          ],
        },
      ],
    },
    // MODULES-END
  ],
  capstone: {
    slug: 'end-to-end-mining-study',
    title: 'An end-to-end data mining study',
    description:
      'Take one real dataset through the whole course: preprocess it, build a cube and explore it with OLAP, mine frequent and sequential patterns, build and evaluate classifiers, cluster the records, and detect outliers, then write up what each step found and what it could not show.',
    deliverables: [
      'A runnable repository that reproduces every table and figure from one command',
      'A data cube with roll-up and drill-down queries and the patterns that explain what they show',
      'Classifiers and clusterings evaluated with honest validation and appropriate metrics',
      'A written report on the patterns, models, clusters and outliers found, with their limits',
    ],
    estimatedHours: 50,
  },
  masteryChecklist: [
    'I can describe the KDD process and choose the mining task that fits a question',
    'I can classify attributes by type and choose summaries and distance measures to match',
    'I can clean, integrate, reduce and discretise a messy real dataset with an audited pipeline',
    'I can design a star schema, compute a data cube with iceberg pruning, and answer questions with roll-up, drill-down, slice and dice',
    'I can implement Apriori and FP-growth, generate association rules, and judge them with lift and null-invariant measures',
    'I can mine multilevel, constrained and sequential patterns and explain how constraints are pushed into the search',
    'I can build decision trees and naive Bayes classifiers from scratch and evaluate any classifier with cross-validation, ROC and precision-recall',
    'I can use ensembles and resampling to handle hard and imbalanced classification problems',
    'I can cluster data with partitioning, hierarchical, density-based and probabilistic methods, and judge a clustering with internal and external measures',
    'I can detect outliers with statistical, proximity-based, clustering-based and classification-based methods, and explain what each assumes',
  ],
});
