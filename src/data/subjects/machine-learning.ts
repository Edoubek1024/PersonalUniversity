import { defineSubject } from '../define';

export default defineSubject({
  id: 'machine-learning',
  title: 'Machine Learning',
  category: 'cs',
  tagline:
    'Learn from data with rigour: linear models, trees and ensembles, kernels, clustering, the optimization and theory underneath, and the engineering that makes models trustworthy.',
  description: `Machine learning is the discipline of building programs whose behaviour is fitted to data rather than written by hand. It sits on linear algebra, probability and optimization, and it is judged by one unforgiving test: does the model work on data it has never seen? Everything in this subject, from the choice of loss function to the design of a validation split, serves that question.

This curriculum follows the structure of Stanford's CS229 and *An Introduction to Statistical Learning*, with *The Elements of Statistical Learning* and Murphy's *Probabilistic Machine Learning* for depth, and scikit-learn as the laboratory. Each module pairs theory with experiments on real datasets (UCI, Kaggle, OpenML, scikit-learn's bundled sets): you derive the estimator, implement it from NumPy, compare it with the library version, and then study where it fails with error analysis and ablations. Deep learning gets its own subject; here neural networks appear only as one more model family, and the emphasis is on the ideas that transfer to every family: generalization, regularization, evaluation and the probabilistic view.

By the end you will be able to take a messy tabular dataset and a vague business question, turn them into a well-posed prediction task, build and compare models with honest validation, explain why the winner wins, and ship it with a pipeline that will not leak, drift silently or treat groups unfairly. The capstone is exactly that, done end to end with a written report and reproducible code.`,
  difficulty: 'advanced',
  estimatedHours: 100,
  prerequisites: ['programming-fundamentals', 'math-methods', 'probability-statistics'],
  recommendedBackground: [
    'Python with NumPy and pandas; comfortable with Jupyter notebooks',
    'Linear algebra: matrix multiplication, inverses, eigenvalues, projections',
    'Multivariable calculus: gradients and the chain rule',
    'Probability: random variables, expectation, Bayes rule, maximum likelihood',
  ],
  tags: ['machine-learning', 'statistics', 'scikit-learn', 'optimization', 'data-science', 'python'],
  core: true,
  modules: [
    {
      slug: 'foundations-and-workflow',
      title: 'Foundations and the ML Workflow',
      description:
        'What learning from data means, how a prediction task is posed, how data is prepared, and the validation discipline that every later lesson depends on.',
      lessons: [
        {
          slug: 'what-learning-from-data-means',
          title: 'What learning from data means',
          summary:
            'Supervised, unsupervised and reinforcement learning; hypotheses, losses and empirical risk; why the held-out set is the only honest judge; and the end-to-end workflow this subject repeats.',
          estimatedMinutes: 90,
          objectives: [
            'Pose a real question as a supervised learning problem: inputs, target, loss and success criterion',
            'Distinguish supervised, unsupervised and reinforcement learning with concrete examples',
            'Define hypothesis class, loss function, empirical risk and true risk, and explain why minimising empirical risk alone is not enough',
            'Describe the standard workflow: frame, split, explore, baseline, model, validate, analyse errors, iterate',
          ],
          concepts: [
            'Supervised learning: regression vs classification',
            'Unsupervised learning and reinforcement learning (overview)',
            'Hypothesis class, parameters, loss function',
            'Empirical risk minimisation vs true risk',
            'Training set, held-out set, generalization',
            'Inductive bias: no learning without assumptions',
            'The ML workflow as a loop',
          ],
          explanation: `A learning algorithm takes a dataset and returns a function. In **supervised learning** the dataset is pairs $(x_i, y_i)$ and the goal is a function $h$ that predicts $y$ from $x$: a number (**regression**) or a label (**classification**). In **unsupervised learning** there are only $x_i$ and the goal is structure: clusters, low-dimensional coordinates, densities. **Reinforcement learning** learns from rewards obtained by acting; it gets a mention here and a proper treatment in the deep-learning subject.

Every supervised method makes the same three choices. A **hypothesis class** $\\mathcal{H}$: the set of functions the algorithm can return (lines, trees, neural networks). A **loss** $\\ell(h(x), y)$ that says how bad a prediction is (squared error, zero-one, log loss). And a procedure to pick $h \\in \\mathcal{H}$ that makes the average loss on the training data, the **empirical risk** $\\hat{R}(h) = \\frac{1}{n}\\sum_i \\ell(h(x_i), y_i)$, small. But we do not care about training data; we care about the **true risk** $R(h) = \\mathbb{E}[\\ell(h(x), y)]$ on new data from the same distribution. A hypothesis class rich enough to memorise the training set can make $\\hat{R}$ zero while $R$ is terrible. That gap, **overfitting**, is the central problem of the subject, and the only honest estimate of $R$ is the loss on data the algorithm never touched.

There is also no learning without assumptions. The "no free lunch" observation is that a learner with no **inductive bias** (no preference among hypotheses consistent with the data) cannot generalise at all; the art is choosing biases that match the problem.

Domingos's short article is the best overview of these ideas; read it first. Then read ISL chapter 2 and run its lab. Finally, pick a dataset you care about and write, in one page, the frame: what is $x$, what is $y$, what loss matches the real cost of mistakes, and what accuracy would make the model worth using. You will refine that page all the way to the capstone.`,
          resources: [
            {
              title: 'A Few Useful Things to Know About Machine Learning (Pedro Domingos)',
              url: 'https://homes.cs.washington.edu/~pedrod/papers/cacm12.pdf',
              type: 'article',
              cost: 'free',
              provider: 'CACM 2012',
              note: 'Twelve lessons every practitioner learns the hard way; read it now and again at the end of the subject.',
              primary: true,
            },
            {
              title: 'An Introduction to Statistical Learning (ISL) — chapter 2, Statistical Learning',
              url: 'https://www.statlearning.com/',
              type: 'textbook',
              cost: 'free',
              provider: 'James, Witten, Hastie, Tibshirani',
              note: 'Free PDF (Python and R editions). Chapter 2 and its lab.',
            },
            {
              title: 'Stanford CS229 — Machine Learning (course notes and lectures)',
              url: 'https://cs229.stanford.edu/',
              type: 'course',
              cost: 'free',
              provider: 'Stanford',
              note: 'The main lecture notes PDF linked from the course page is the backbone of modules 2-6.',
            },
            {
              title: 'Machine Learning Specialization (Andrew Ng)',
              url: 'https://www.coursera.org/specializations/machine-learning-introduction',
              type: 'course',
              cost: 'freemium',
              provider: 'DeepLearning.AI / Coursera',
              note: 'Gentle video introduction; auditable for free. Use if the maths-first resources feel steep.',
            },
          ],
          exercises: [
            {
              slug: 'frame-three-problems',
              title: 'Frame three problems',
              prompt:
                'For each of: predicting house prices, detecting fraudulent card transactions, and grouping customers by purchasing behaviour, write down the learning type, the input representation, the target (if any), a loss function matching the real cost of errors, the data you would need, and one way the deployed model could go wrong that the loss does not capture.',
              kind: 'writing',
              difficulty: 1,
            },
            {
              slug: 'memorisation-vs-generalization',
              title: 'Memorisation vs generalization',
              prompt:
                'Load the California housing dataset from scikit-learn. Fit a 1-nearest-neighbour regressor and a decision tree with no depth limit on 80% of the data; report training and held-out mean squared error for both. Then fit a linear regression and report the same. Explain the pattern in two paragraphs using the words empirical risk and true risk.',
              kind: 'coding',
              difficulty: 1,
            },
            {
              slug: 'inductive-bias-experiment',
              title: 'Inductive bias experiment',
              prompt:
                'Generate 30 points from y = sin(x) + noise on [0, 6]. Fit polynomials of degree 1, 3, 10 and 25 and plot them with the true function. Compute held-out error on 1000 fresh points for each degree. Which assumption about the world does each degree encode, and which matches the data-generating process best?',
              kind: 'simulation',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'Why is training error not an estimate of how a model will perform in deployment?',
              answerOutline:
                'The model was chosen to make training error small, so training error is optimistically biased; flexible models can memorise. Only data not used in fitting (or selection) gives an unbiased estimate of true risk.',
            },
            {
              question: 'What is an inductive bias and why is one necessary?',
              answerOutline:
                'A preference among hypotheses consistent with the data (smoothness, sparsity, low depth). Without one, infinitely many hypotheses fit any finite dataset equally and predictions on new inputs are arbitrary.',
            },
            {
              question: 'Give the three choices every supervised learner makes.',
              answerOutline:
                'Hypothesis class, loss function, and the fitting/optimization procedure (plus, implicitly, the regularization that controls complexity).',
            },
          ],
        },
        {
          slug: 'data-and-feature-preparation',
          title: 'Data, exploration and feature preparation',
          summary:
            'Loading and exploring tabular data, handling missing values and outliers, encoding categorical variables, scaling, and the preprocessing decisions that quietly determine model quality.',
          estimatedMinutes: 120,
          objectives: [
            'Perform exploratory analysis of a tabular dataset: distributions, correlations, missingness, target balance',
            'Encode categorical features (one-hot, ordinal) and scale numeric features, and explain which models need which',
            'Handle missing values by imputation with an indicator, and explain why dropping rows can bias a model',
            'Fit all preprocessing on the training split only and apply it to held-out data',
          ],
          concepts: [
            'Tabular data: rows, features, target; feature types',
            'Exploratory data analysis (EDA)',
            'Missing values: MCAR/MAR/MNAR; imputation with indicator',
            'One-hot and ordinal encoding; high-cardinality categories',
            'Standardisation and min-max scaling; log transforms',
            'Outliers and robust statistics',
            'Fit on train, transform on test',
          ],
          explanation: `Most of the work in applied machine learning happens before any model is fitted. A dataset arrives as a table with numeric columns, categorical columns, dates, free text and gaps, and the model sees only numbers. The decisions that convert one to the other are part of the model and must be validated as such.

Start with **exploration**: histograms of each feature and the target, missingness per column, correlations, class balance, and a look at the extreme rows. You are hunting for leakage (a column that is a proxy for the target, available only after the fact), for identifiers masquerading as features, and for units and scales that will confuse a distance-based model. Write down what you find; the capstone report has a section for it.

**Missing values** are information. Whether they are missing completely at random, at random given other columns, or not at random (a lab test that is skipped when the patient is healthy) changes what is safe. Dropping rows discards data and can bias the sample; the robust default is to impute (median for numerics, a new category for categoricals) and add a *missing indicator* column so the model can use the missingness itself.

**Categorical** features become numbers by **one-hot encoding** (one binary column per category; safe for linear models, wasteful for high cardinality) or **ordinal** codes (only if the order is real, or for tree models that split on thresholds anyway). **Scaling** matters for anything that uses distances or gradient descent (kNN, SVMs, logistic regression with regularization, neural networks); trees do not care. Heavy-tailed positive features often benefit from a log transform.

The rule that everything hinges on: **fit every transformation on the training split only**, then apply it to validation and test. Computing the mean for standardisation over the full dataset leaks test information into training. scikit-learn's transformer API (fit/transform) and pipelines exist to make this automatic; module 7 returns to it in depth.`,
          resources: [
            {
              title: 'scikit-learn user guide — Preprocessing data',
              url: 'https://scikit-learn.org/stable/modules/preprocessing.html',
              type: 'documentation',
              cost: 'free',
              provider: 'scikit-learn',
              note: 'Scaling, encoding, discretisation and the transformer API.',
              primary: true,
            },
            {
              title: 'scikit-learn user guide — Imputation of missing values',
              url: 'https://scikit-learn.org/stable/modules/impute.html',
              type: 'documentation',
              cost: 'free',
              provider: 'scikit-learn',
            },
            {
              title: 'pandas documentation — user guide',
              url: 'https://pandas.pydata.org/docs/user_guide/index.html',
              type: 'documentation',
              cost: 'free',
              provider: 'pandas',
              note: 'The sections on indexing, groupby, missing data and categoricals.',
            },
            {
              title: 'UCI Machine Learning Repository — Adult (Census Income) dataset',
              url: 'https://archive.ics.uci.edu/dataset/2/adult',
              type: 'dataset',
              cost: 'free',
              provider: 'UCI',
              note: 'A messy real dataset with missing values, high-cardinality categoricals and a sensitive target; used again in modules 3 and 7.',
            },
          ],
          exercises: [
            {
              slug: 'eda-report',
              title: 'EDA report on Adult',
              prompt:
                'Load the UCI Adult dataset. Produce: per-column type, missing fraction and cardinality; histograms of numeric features (note the skew of capital-gain); the target balance; and a table of income rate by education and by sex. Identify any column that could leak the target or act as an identifier. Write a one-page summary with the three findings that will most affect modelling.',
              kind: 'data-analysis',
              difficulty: 1,
            },
            {
              slug: 'preprocessing-ablation',
              title: 'Preprocessing ablation',
              prompt:
                'On Adult with an 80/20 split, train logistic regression and a random forest under four preprocessing settings: (a) ordinal codes, no scaling; (b) one-hot, no scaling; (c) one-hot with standardisation; (d) one-hot, standardisation, log(1+x) on capital-gain/loss. Report held-out accuracy and log loss for all eight combinations. Explain which model is sensitive to which choice and why.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'leaky-scaling',
              title: 'Demonstrate preprocessing leakage',
              prompt:
                'Construct a dataset of 200 rows and 1000 pure-noise features with a binary target. Perform feature selection by correlation with the target over the whole dataset, keep the top 20, then cross-validate a logistic regression on them. Then redo the selection inside each cross-validation fold. Report both accuracies and explain the gap.',
              kind: 'coding',
              difficulty: 2,
              hint: 'The first procedure will report well above 50% on pure noise. This is the classic selection-leakage mistake described in ESL section 7.10.2.',
            },
          ],
          selfAssessment: [
            {
              question: 'Why add a missing-value indicator column instead of only imputing?',
              answerOutline:
                'Missingness may itself be predictive (not missing at random); the indicator lets the model use that signal and separates imputed from observed values.',
            },
            {
              question: 'Which models need feature scaling and which do not?',
              answerOutline:
                'Distance- and gradient-based models (kNN, SVM, regularised linear models, neural nets) need it; tree-based models are invariant to monotone transforms of individual features.',
            },
            {
              question: 'What goes wrong if you standardise using the mean and variance of the whole dataset before splitting?',
              answerOutline:
                'Test-set statistics influence the training features, a mild form of leakage that makes validation estimates optimistic; the correct procedure fits the scaler on the training split only.',
            },
          ],
        },
        {
          slug: 'generalization-and-validation',
          title: 'Generalization, validation and cross-validation',
          summary:
            'How to estimate true risk honestly: train/validation/test splits, k-fold cross-validation, learning curves, the bias-variance intuition and the mistakes that make estimates optimistic.',
          estimatedMinutes: 120,
          objectives: [
            'Design a train/validation/test protocol and explain the distinct role of each split',
            'Implement k-fold and stratified cross-validation and interpret the mean and spread of fold scores',
            'Plot and read learning curves and validation curves to diagnose underfitting vs overfitting',
            'Explain why hyperparameters chosen on the validation set make the validation score optimistic and how nested cross-validation fixes it',
          ],
          concepts: [
            'Train / validation / test; the test set is used once',
            'k-fold, stratified and grouped cross-validation',
            'Learning curves and validation curves',
            'Underfitting vs overfitting; model capacity',
            'Bias-variance intuition (formal treatment in module 6)',
            'Optimistic bias from selection; nested cross-validation',
            'Distribution shift between splits and deployment',
          ],
          explanation: `You need an estimate of true risk for two different purposes: to **choose** among models and hyperparameters, and to **report** how good the final choice is. Using the same data for both makes the report optimistic, because you picked the model that happened to look best on it. Hence three splits. The **training set** fits parameters; the **validation set** compares candidates; the **test set** is touched once, at the very end, to report. If you look at the test score and then change something, it has become a validation set.

With small data, a single validation split is noisy, so use **k-fold cross-validation**: partition the training data into $k$ folds, train on $k-1$, validate on the remaining fold, rotate, and average. The spread across folds is as informative as the mean: a difference between two models smaller than the fold-to-fold standard deviation is not a real difference. Use **stratified** folds for classification so class proportions match, and **grouped** folds when rows are not independent (several records per patient; the patient must be in one fold). Time series need splits that respect time, which module 7 covers.

**Learning curves** plot training and validation error against the number of training examples. If both are high and close, the model is **underfitting** (too little capacity): more data will not help, a richer model will. If training error is low and validation error much higher, the model is **overfitting**: more data, regularization or less capacity will help. **Validation curves** plot both errors against one hyperparameter and show the sweet spot.

Choosing hyperparameters by cross-validation and then reporting the best cross-validated score is the same optimism problem one level up; **nested cross-validation** (an inner loop to choose, an outer loop to evaluate) fixes it at the cost of compute. Read ISL chapter 5 and ESL section 7.10, which includes the "wrong way to do cross-validation" you reproduced in the previous lesson, and do the scikit-learn cross-validation guide's examples.`,
          resources: [
            {
              title: 'ISL — chapter 5, Resampling Methods',
              url: 'https://www.statlearning.com/',
              type: 'textbook',
              cost: 'free',
              provider: 'James, Witten, Hastie, Tibshirani',
              note: 'Cross-validation and the bootstrap; do the lab.',
              primary: true,
            },
            {
              title: 'scikit-learn user guide — Cross-validation: evaluating estimator performance',
              url: 'https://scikit-learn.org/stable/modules/cross_validation.html',
              type: 'documentation',
              cost: 'free',
              provider: 'scikit-learn',
              note: 'All the splitters (KFold, StratifiedKFold, GroupKFold, TimeSeriesSplit) and their pitfalls.',
            },
            {
              title: 'The Elements of Statistical Learning (ESL) — chapter 7, Model Assessment and Selection',
              url: 'https://hastie.su.domains/ElemStatLearn/',
              type: 'textbook',
              cost: 'free',
              provider: 'Hastie, Tibshirani, Friedman',
              note: 'Free PDF. Section 7.10 on cross-validation, including the wrong way to do it.',
            },
            {
              title: 'scikit-learn — Common pitfalls and recommended practices',
              url: 'https://scikit-learn.org/stable/common_pitfalls.html',
              type: 'documentation',
              cost: 'free',
              provider: 'scikit-learn',
              note: 'Data leakage, randomness control and inconsistent preprocessing, with code.',
            },
          ],
          exercises: [
            {
              slug: 'implement-kfold',
              title: 'Implement k-fold cross-validation from scratch',
              prompt:
                'Write your own stratified k-fold splitter in NumPy and use it to cross-validate a kNN classifier on the breast-cancer dataset for k = 1, 3, 5, ..., 31 neighbours. Report mean and standard deviation per k, plot them with error bars, and compare with scikit-learn\'s cross_val_score. Which values of k are statistically indistinguishable from the best?',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'learning-curves',
              title: 'Learning curves for three models',
              prompt:
                'On the California housing dataset, plot learning curves (training sizes from 100 to the full training set, 5-fold CV) for linear regression, a depth-5 decision tree and an unrestricted random forest. For each, say whether it is bias-limited or variance-limited and predict whether doubling the data would help. Then add 10 random noise features and repeat; which model suffers most?',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'nested-cv',
              title: 'Nested cross-validation',
              prompt:
                'Tune the regularization strength of a logistic regression on the Adult dataset over a grid of 20 values with 5-fold CV, and report the best CV score. Then wrap the whole tuning procedure in an outer 5-fold loop and report the outer score. Repeat with 10 random seeds and report the mean gap between the two estimates. Explain its sign.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What is the purpose of each of the three splits, and what happens to the test set if you use it twice?',
              answerOutline:
                'Train fits parameters, validation selects models/hyperparameters, test reports final performance once. Using it to make a decision turns it into validation data and its score becomes optimistically biased.',
            },
            {
              question: 'When must you use grouped cross-validation?',
              answerOutline:
                'When rows are not independent (multiple samples per subject, device, session). Random folds would place near-duplicates in train and validation and overestimate performance.',
            },
            {
              question: 'Describe a learning curve that indicates overfitting and what to do about it.',
              answerOutline:
                'Training error low, validation error much higher, gap closing slowly with more data. Remedies: more data, regularization, simpler model, feature reduction.',
            },
          ],
        },
        {
          slug: 'baselines-and-nearest-neighbours',
          title: 'Baselines and k-nearest neighbours',
          summary:
            'Always start with a baseline: majority and mean predictors, then k-nearest neighbours as the simplest real model, which also introduces distance, the curse of dimensionality and the bias-variance trade-off through k.',
          estimatedMinutes: 100,
          objectives: [
            'Establish trivial baselines (majority class, mean, a single-feature rule) and use them to judge every later model',
            'Implement kNN for classification and regression and explain the role of k, distance metric and feature scaling',
            'Explain the curse of dimensionality with a calculation and an experiment',
            'Describe the compute and memory costs of kNN and when it is or is not practical',
          ],
          concepts: [
            'Dummy baselines: majority class, mean, stratified random',
            'k-nearest neighbours: lazy learning',
            'Distance metrics: Euclidean, Manhattan, cosine',
            'Choice of k: bias-variance through k',
            'Curse of dimensionality',
            'Decision boundaries',
            'KD-trees and the cost of prediction',
          ],
          explanation: `Before any model, compute the **baseline**: predict the majority class, or the training mean, or apply one obvious rule. It costs nothing and it is the number every model must beat. A surprising amount of published work does not beat it. scikit-learn's \`DummyClassifier\` and \`DummyRegressor\` exist for this purpose.

**k-nearest neighbours** is the first real model and perhaps the most honest: to predict for $x$, find the $k$ training points closest to $x$ and vote (classification) or average (regression). There is no training step; all the work is at prediction time, which makes it **lazy** and expensive for large data (a brute-force query is $O(nd)$; KD-trees and ball trees help in low dimensions). Its single hyperparameter $k$ is a perfect illustration of the **bias-variance trade-off**: $k = 1$ follows every noisy point (low bias, high variance, jagged decision boundary); large $k$ smooths towards the global average (high bias, low variance). Plotting validation error against $k$ gives the U-shaped curve you will see for every model's complexity knob.

kNN depends entirely on **distance**, so it exposes two facts. First, scaling: a feature measured in thousands dominates one measured in units unless you standardise. Second, the **curse of dimensionality**: in high dimensions all points become almost equidistant. Concretely, to capture 10% of uniformly distributed points in a unit hypercube with a sub-cube, the side length needed is $0.1^{1/d}$: $0.1$ for $d=1$, $0.63$ for $d=5$, $0.98$ for $d=100$. "Nearest" neighbours are not near, and irrelevant features destroy the signal. Every method suffers from this; kNN just suffers visibly.

Read ISL section 2.2.3 and 3.5 (kNN vs linear regression), implement kNN yourself, and run the dimensionality experiment. Keep your baseline numbers; they appear in every later table.`,
          resources: [
            {
              title: 'ISL — sections 2.2.3 and 3.5 (kNN classification and regression)',
              url: 'https://www.statlearning.com/',
              type: 'textbook',
              cost: 'free',
              provider: 'James, Witten, Hastie, Tibshirani',
              primary: true,
            },
            {
              title: 'scikit-learn user guide — Nearest Neighbors',
              url: 'https://scikit-learn.org/stable/modules/neighbors.html',
              type: 'documentation',
              cost: 'free',
              provider: 'scikit-learn',
              note: 'Algorithms (brute, KD-tree, ball tree), metrics and the classifier/regressor APIs.',
            },
            {
              title: 'MLU-Explain — visual explanations of ML concepts',
              url: 'https://mlu-explain.github.io/',
              type: 'interactive',
              cost: 'free',
              provider: 'Amazon MLU',
              note: 'Interactive articles on bias-variance, cross-validation, kNN and more.',
            },
          ],
          exercises: [
            {
              slug: 'knn-from-scratch',
              title: 'kNN from scratch',
              prompt:
                'Implement kNN classification in NumPy using vectorised distance computation (no Python loops over training points). Validate against scikit-learn on the digits dataset (should agree exactly for k=1). Plot 5-fold CV accuracy against k from 1 to 50, with and without standardisation, and report the best k. Time a single prediction for n = 1000, 10000, 100000 training points and confirm the scaling.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'curse-of-dimensionality',
              title: 'Measure the curse of dimensionality',
              prompt:
                'Sample 1000 points uniformly in the unit hypercube for d = 1, 2, 5, 10, 50, 100, 500. For each d compute the ratio of the maximum to the minimum distance from a random query point to the samples, and the median nearest-neighbour distance. Plot both against d. Then add noise dimensions to the breast-cancer dataset (0, 10, 100, 1000 random features) and plot kNN accuracy. Relate the two plots.',
              kind: 'simulation',
              difficulty: 2,
            },
            {
              slug: 'baseline-table',
              title: 'Start the baseline table',
              prompt:
                'For the three datasets you will use throughout (Adult, California housing, one of your own choice), compute the dummy baseline (majority/mean), a one-feature rule you choose by inspection, and tuned kNN, with 5-fold CV and standard deviations. Create a results table (CSV plus a notebook that regenerates it) that you will extend in every later module.',
              kind: 'data-analysis',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'How does k control bias and variance in kNN?',
              answerOutline:
                'Small k: the prediction depends on few points, low bias but high variance (noisy boundaries). Large k: averages many points, smoother, higher bias, lower variance. Validation picks the trade-off.',
            },
            {
              question: 'Why does kNN fail in high dimensions even with plenty of data?',
              answerOutline:
                'Distances concentrate: the nearest neighbour is nearly as far as the farthest, so neighbourhoods are not local; the data needed to keep them local grows exponentially with d.',
            },
            {
              question: 'What does a model beating the dummy baseline by 1% tell you?',
              answerOutline:
                'Very little until you compare with the fold-to-fold spread; and it suggests either weak features, a hard problem, or a bug. Baselines calibrate expectations.',
            },
          ],
        },
      ],
      project: {
        slug: 'dataset-brief-and-protocol',
        title: 'Module project: a dataset brief and evaluation protocol',
        description:
          'Choose the real dataset you will carry through to the capstone (from UCI, Kaggle or OpenML, at least 5,000 rows, mixed feature types). Write the problem frame, an EDA report, a preprocessing plan, and a validation protocol with baselines, all as reproducible code.',
        deliverables: [
          'A notebook that loads the raw data, performs EDA and produces the figures in the report',
          'A preprocessing pipeline fitted on the training split only',
          'A written brief (2-3 pages): task frame, loss choice, leakage risks, split design, baseline results with uncertainty',
        ],
        estimatedHours: 8,
      },
    },
    {
      slug: 'linear-models',
      title: 'Linear Models',
      description:
        'Linear and logistic regression from first principles: least squares and its geometry, gradient descent, regularization, the probabilistic view, and basis expansions that make linear models surprisingly powerful.',
      lessons: [
        {
          slug: 'linear-regression-and-least-squares',
          title: 'Linear regression and least squares',
          summary:
            'The model, the squared-error loss, the normal equations and their geometry as projection, gradient descent as the alternative, and how to read coefficients.',
          estimatedMinutes: 120,
          objectives: [
            'Derive the normal equations by setting the gradient of the squared loss to zero and interpret them as projection onto the column space',
            'Implement linear regression via the closed form and via batch gradient descent, and verify they agree',
            'Explain when the closed form is unusable (collinearity, n < d) and what gradient descent does there',
            'Interpret coefficients, including the effect of correlated features and the need for scaling when comparing them',
          ],
          concepts: [
            'Linear hypothesis h(x) = w·x + b; design matrix',
            'Squared error loss; residuals',
            'Normal equations; pseudo-inverse',
            'Geometry: projection onto the column space',
            'Gradient descent for least squares; learning rate',
            'Collinearity and ill-conditioning',
            'Coefficient interpretation',
          ],
          explanation: `**Linear regression** predicts $\\hat{y} = \\mathbf{w}^\\top \\mathbf{x} + b$; with a column of ones in the design matrix $X \\in \\mathbb{R}^{n \\times d}$ the bias folds into $\\mathbf{w}$. The **least-squares** choice of $\\mathbf{w}$ minimises $J(\\mathbf{w}) = \\frac{1}{2}\\|X\\mathbf{w} - \\mathbf{y}\\|^2$. The gradient is $\\nabla J = X^\\top(X\\mathbf{w} - \\mathbf{y})$; setting it to zero gives the **normal equations** $X^\\top X \\mathbf{w} = X^\\top \\mathbf{y}$, so $\\mathbf{w} = (X^\\top X)^{-1} X^\\top \\mathbf{y}$ when $X^\\top X$ is invertible.

The geometry makes this memorable: $X\\mathbf{w}$ ranges over the column space of $X$, and the least-squares fit is the **orthogonal projection** of $\\mathbf{y}$ onto it. The residual $\\mathbf{y} - X\\mathbf{w}$ is perpendicular to every column, which is exactly what $X^\\top(\\mathbf{y} - X\\mathbf{w}) = 0$ says.

The closed form fails when $X^\\top X$ is singular or nearly so: fewer samples than features, or **collinear** features (one is a linear combination of others). Then there are infinitely many minimisers and the inverse amplifies noise. Numerically, solve with QR or the SVD-based pseudo-inverse rather than forming the inverse, and watch the condition number. **Gradient descent**, $\\mathbf{w} \\leftarrow \\mathbf{w} - \\alpha \\nabla J$, converges to a minimiser regardless, is the only option for huge $n$ or $d$, and is the template for every model after this one. Its learning rate $\\alpha$ must be below $2/\\lambda_{\\max}(X^\\top X)$ to converge, which is why scaling features (which equalises the eigenvalues) matters so much for optimization.

Coefficients are tempting to interpret as importance. Resist: a coefficient is the effect of one unit of that feature *holding the others fixed*, which depends on units (standardise before comparing) and becomes unstable when features are correlated (two collinear features can have huge opposite coefficients). Read CS229 lecture notes part I and ISL chapter 3, then derive, implement and compare.`,
          resources: [
            {
              title: 'CS229 lecture notes — Part I: Linear Regression (LMS, normal equations, probabilistic interpretation)',
              url: 'https://cs229.stanford.edu/',
              type: 'lecture',
              cost: 'free',
              provider: 'Stanford',
              note: 'The main notes PDF, chapter 1.',
              primary: true,
            },
            {
              title: 'ISL — chapter 3, Linear Regression',
              url: 'https://www.statlearning.com/',
              type: 'textbook',
              cost: 'free',
              provider: 'James, Witten, Hastie, Tibshirani',
              note: 'Interpretation, diagnostics, interactions and the lab.',
            },
            {
              title: 'Mathematics for Machine Learning — chapter 9, Linear Regression',
              url: 'https://mml-book.github.io/',
              type: 'textbook',
              cost: 'free',
              provider: 'Deisenroth, Faisal, Ong',
              note: 'Free PDF. The geometric and probabilistic views side by side.',
            },
            {
              title: 'scikit-learn user guide — Linear Models',
              url: 'https://scikit-learn.org/stable/modules/linear_model.html',
              type: 'documentation',
              cost: 'free',
              provider: 'scikit-learn',
            },
          ],
          exercises: [
            {
              slug: 'normal-equations-vs-gd',
              title: 'Closed form vs gradient descent',
              prompt:
                'Implement least squares three ways on California housing (standardised features): normal equations with np.linalg.solve, np.linalg.lstsq (SVD), and batch gradient descent. Verify all three agree to 1e-6 on the coefficients. Then plot gradient-descent loss against iterations for learning rates 0.001, 0.01, 0.1, 1.0 and relate the divergence threshold to the largest eigenvalue of X^T X / n.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'projection-derivation',
              title: 'Derive the normal equations two ways',
              prompt:
                'Derive the normal equations (a) by computing the gradient of ||Xw - y||^2 and (b) by the geometric argument that the residual must be orthogonal to the column space. Then show that the hat matrix H = X(X^T X)^{-1}X^T is a projection (H^2 = H, H^T = H) and interpret its trace.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'collinearity',
              title: 'Collinearity experiment',
              prompt:
                'Create a dataset with x1 ~ N(0,1), x2 = x1 + 0.01 * noise, y = x1 + noise. Fit least squares 100 times on fresh samples of 50 rows and plot the distribution of the two coefficients. Report the condition number of X^T X. Then repeat with x2 = x1 + 1.0 * noise. Explain the difference and what ridge regression (next lesson) will do about it.',
              kind: 'simulation',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'State the normal equations and explain the geometric meaning.',
              answerOutline:
                'X^T X w = X^T y. The fitted vector Xw is the orthogonal projection of y onto the column space of X; the residual is orthogonal to every column.',
            },
            {
              question: 'When does the closed-form solution fail and what do you do?',
              answerOutline:
                'X^T X singular or ill-conditioned (n < d, collinear features). Use the pseudo-inverse (minimum-norm solution), regularise (ridge), or use gradient descent.',
            },
            {
              question: 'Why must the learning rate for gradient descent on least squares be below 2 / λ_max?',
              answerOutline:
                'The update is a linear map with eigenvalues 1 - αλ_i; |1 - αλ_i| < 1 for all i requires α < 2/λ_max, otherwise the component along the top eigenvector grows.',
            },
          ],
          relatedLessons: ['math-methods/linear-algebra/vector-spaces-bases-and-inner-products'],
        },
        {
          slug: 'regularization-ridge-and-lasso',
          title: 'Regularization: ridge and lasso',
          summary:
            'Penalising coefficient size to control variance: ridge (L2) with its closed form and shrinkage interpretation, lasso (L1) and sparsity, the regularization path, and choosing the penalty by cross-validation.',
          estimatedMinutes: 120,
          objectives: [
            'Derive the ridge solution and explain shrinkage through the SVD of X',
            'Explain why the L1 penalty produces exactly-zero coefficients and the L2 penalty does not',
            'Fit regularization paths and select the penalty strength by cross-validation',
            'Use lasso for feature selection and explain its instability under correlated features',
          ],
          concepts: [
            'Ridge regression: L2 penalty; closed form',
            'Shrinkage along principal directions',
            'Lasso: L1 penalty; sparsity',
            'Regularization path; coefficient profiles',
            'Elastic net',
            'Penalty strength as a bias-variance knob',
            'Constrained vs penalised form; geometry of the L1 ball',
          ],
          explanation: `When features are many or correlated, least squares has low bias and high variance: tiny changes in the data swing coefficients wildly. **Regularization** trades a little bias for a lot of variance reduction by penalising coefficient size.

**Ridge regression** minimises $\\|X\\mathbf{w} - \\mathbf{y}\\|^2 + \\lambda\\|\\mathbf{w}\\|_2^2$, with solution $\\mathbf{w} = (X^\\top X + \\lambda I)^{-1}X^\\top\\mathbf{y}$. The added $\\lambda I$ makes the matrix invertible even when $X^\\top X$ is singular, which is the numerical fix for collinearity. The SVD $X = U\\Sigma V^\\top$ shows what ridge does: along the $j$-th principal direction of the inputs, least squares keeps the component of $\\mathbf{y}$ in full while ridge multiplies it by $\\sigma_j^2 / (\\sigma_j^2 + \\lambda)$, so directions of low variance (which carry mostly noise) are shrunk hardest. Do not penalise the bias term, and standardise features first, because the penalty is not scale-invariant.

**Lasso** uses the L1 penalty $\\lambda\\|\\mathbf{w}\\|_1$. There is no closed form (coordinate descent, module 6, is the standard solver), but the penalty has a property L2 lacks: it drives some coefficients to *exactly* zero, performing **feature selection**. The geometric picture is the constrained form: minimise the loss subject to $\\|\\mathbf{w}\\|_1 \\le t$. The L1 ball has corners on the axes, and the elliptical loss contours usually touch it at a corner, where coordinates are zero; the L2 ball is round and touches at a generic point. Lasso is unstable among correlated features (it picks one arbitrarily); **elastic net** mixes both penalties to get sparsity with grouping.

The penalty $\\lambda$ is a hyperparameter chosen by cross-validation. Plot the **regularization path** (every coefficient as a function of $\\lambda$) and the CV error; the error curve is U-shaped and the path shows which features enter first. Read ISL section 6.2 and ESL 3.4, implement ridge from the formula, and use scikit-learn's path functions for lasso.`,
          resources: [
            {
              title: 'ISL — section 6.2, Shrinkage Methods',
              url: 'https://www.statlearning.com/',
              type: 'textbook',
              cost: 'free',
              provider: 'James, Witten, Hastie, Tibshirani',
              primary: true,
            },
            {
              title: 'ESL — section 3.4, Shrinkage Methods (ridge, lasso, the SVD view)',
              url: 'https://hastie.su.domains/ElemStatLearn/',
              type: 'textbook',
              cost: 'free',
              provider: 'Hastie, Tibshirani, Friedman',
              note: 'The SVD interpretation of ridge and the comparison of selection methods.',
            },
            {
              title: 'scikit-learn user guide — Linear Models: Ridge, Lasso, Elastic Net and paths',
              url: 'https://scikit-learn.org/stable/modules/linear_model.html',
              type: 'documentation',
              cost: 'free',
              provider: 'scikit-learn',
              note: 'RidgeCV, LassoCV, lasso_path and the examples on regularization paths.',
            },
          ],
          exercises: [
            {
              slug: 'ridge-from-svd',
              title: 'Ridge via the SVD',
              prompt:
                'Implement ridge regression using the closed form and separately via the SVD shrinkage formula; verify they agree. On the California housing data with added polynomial features of degree 3, plot CV error against λ on a log scale from 1e-4 to 1e4 and plot the shrinkage factors σ_j^2/(σ_j^2+λ) for the chosen λ. Which directions are effectively discarded?',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'lasso-path-and-selection',
              title: 'Lasso path and selection stability',
              prompt:
                'On the diabetes dataset (scikit-learn), plot the lasso regularization path and the CV error curve; report the selected features at the CV-optimal λ. Then bootstrap the data 100 times and record how often each feature is selected. Which selections are stable? Add a feature that is a near-copy of bmi and repeat; what happens to the pair?',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'l1-geometry',
              title: 'Why L1 gives zeros',
              prompt:
                'For a two-dimensional least-squares problem with elliptical contours centred at (2, 0.5), draw (by code) the contours together with the L1 ball and the L2 ball of the same radius, and mark the constrained optimum for each. Then compute the one-dimensional lasso solution analytically (soft thresholding) and show where the zero region comes from.',
              kind: 'derivation',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'How does ridge regression act on the principal directions of the inputs?',
              answerOutline:
                'It multiplies the coefficient along the j-th principal direction by σ_j^2/(σ_j^2+λ): low-variance directions are shrunk most, high-variance directions barely.',
            },
            {
              question: 'Why does the lasso produce exact zeros and ridge does not?',
              answerOutline:
                'The L1 penalty has a kink at zero (subgradient includes an interval), so the optimum can sit exactly at zero; geometrically the L1 constraint set has corners on the axes. The L2 penalty is smooth and only shrinks.',
            },
            {
              question: 'Why standardise features before applying ridge or lasso?',
              answerOutline:
                'The penalty treats all coefficients equally, but coefficients scale inversely with feature units; without standardisation, features in small units are penalised more.',
            },
          ],
        },
        {
          slug: 'logistic-regression',
          title: 'Logistic regression and softmax',
          summary:
            'Classification with a linear model: the sigmoid, maximum likelihood and the cross-entropy loss, its gradient, the linear decision boundary, regularized logistic regression, and softmax for many classes.',
          estimatedMinutes: 120,
          objectives: [
            'Derive the logistic regression loss from maximum likelihood of a Bernoulli model and compute its gradient',
            'Implement logistic regression with gradient descent and verify against scikit-learn',
            'Explain why the decision boundary is linear and how the output is a probability that can be thresholded',
            'Extend to multiclass with softmax and cross-entropy, and explain the perfect-separation problem and why regularization fixes it',
          ],
          concepts: [
            'Sigmoid and log-odds (logit)',
            'Bernoulli likelihood; cross-entropy (log loss)',
            'Gradient of the log loss; convexity',
            'Linear decision boundary; threshold',
            'Regularized logistic regression; perfect separation',
            'Softmax and multinomial logistic regression',
            'One-vs-rest alternative',
          ],
          explanation: `For a binary target, fitting a line to 0/1 labels with least squares gives predictions outside $[0, 1]$ and a loss dominated by far-away points. **Logistic regression** instead models the *probability*: $p(y = 1 \\mid \\mathbf{x}) = \\sigma(\\mathbf{w}^\\top\\mathbf{x})$ with $\\sigma(z) = 1/(1 + e^{-z})$. The quantity $\\mathbf{w}^\\top\\mathbf{x}$ is the **log-odds**: each unit of a feature multiplies the odds by $e^{w_j}$, which is how coefficients should be read.

With a Bernoulli likelihood, **maximum likelihood** gives the loss $J(\\mathbf{w}) = -\\sum_i \\left[y_i \\log p_i + (1 - y_i)\\log(1 - p_i)\\right]$, the **cross-entropy** or log loss. Its gradient is beautifully simple: $\\nabla J = X^\\top(\\mathbf{p} - \\mathbf{y})$, the same shape as least squares with predictions passed through the sigmoid. The loss is convex, so gradient descent (or Newton's method, which gives the classical IRLS algorithm) finds the global optimum. There is no closed form.

The predicted probability is thresholded at $0.5$ for a decision, i.e. where $\\mathbf{w}^\\top\\mathbf{x} = 0$: a **hyperplane**. Logistic regression is a linear classifier; its power comes from the features you give it (next lesson). The threshold is itself a choice: with asymmetric costs or imbalanced classes, you move it, which module 3 covers.

Two practical points. If the classes are **perfectly separable**, maximum likelihood pushes $\\|\\mathbf{w}\\| \\to \\infty$ to make probabilities 0 and 1; L2 regularization (scikit-learn's default) keeps the solution finite and improves generalization anyway. For $K$ classes, **softmax** generalises the sigmoid: $p(y = k \\mid \\mathbf{x}) = e^{\\mathbf{w}_k^\\top\\mathbf{x}} / \\sum_j e^{\\mathbf{w}_j^\\top\\mathbf{x}}$, trained with the multiclass cross-entropy; it is the output layer of every classification neural network. Read CS229 part II, derive the gradient, and implement both binary and softmax versions.`,
          resources: [
            {
              title: 'CS229 lecture notes — Part II: Classification and Logistic Regression',
              url: 'https://cs229.stanford.edu/',
              type: 'lecture',
              cost: 'free',
              provider: 'Stanford',
              note: 'Main notes, chapter 2, including Newton\'s method and the softmax section of the GLM chapter.',
              primary: true,
            },
            {
              title: 'ISL — chapter 4, Classification (sections 4.1-4.3)',
              url: 'https://www.statlearning.com/',
              type: 'textbook',
              cost: 'free',
              provider: 'James, Witten, Hastie, Tibshirani',
            },
            {
              title: 'scikit-learn user guide — Logistic regression',
              url: 'https://scikit-learn.org/stable/modules/linear_model.html',
              type: 'documentation',
              cost: 'free',
              provider: 'scikit-learn',
              note: 'The logistic regression section: solvers, penalties and the multinomial option.',
            },
          ],
          exercises: [
            {
              slug: 'logistic-from-scratch',
              title: 'Logistic regression from scratch',
              prompt:
                'Derive the gradient of the log loss, then implement logistic regression with batch gradient descent and with Newton\'s method in NumPy. On the breast-cancer dataset (standardised), compare iterations to convergence for both and verify the coefficients match scikit-learn (with a tiny penalty) to 1e-4. Plot the decision boundary on the two most informative features.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'perfect-separation',
              title: 'Perfect separation',
              prompt:
                'Create a linearly separable 2D dataset. Run unregularised gradient descent for 100, 1000 and 10000 iterations and report ||w|| and the training log loss at each. Then add L2 regularization with C = 1 and repeat. Explain what is happening and why the regularised solution is preferable even though its training loss is higher.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'softmax-mnist',
              title: 'Softmax regression on digits',
              prompt:
                'Implement softmax regression with the multiclass cross-entropy and its gradient, train on the 8x8 digits dataset, and report test accuracy and the confusion matrix. Visualise the ten weight vectors as 8x8 images. Which digit pairs are confused most, and what does the weight image suggest about why?',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Derive the gradient of the logistic log loss with respect to w.',
              answerOutline:
                'Using dσ/dz = σ(1-σ), the per-example gradient is (p_i - y_i) x_i, so ∇J = X^T (p - y).',
            },
            {
              question: 'Why is the decision boundary of logistic regression linear even though the sigmoid is nonlinear?',
              answerOutline:
                'The decision depends on whether σ(w·x) > 0.5, i.e. whether w·x > 0, which is a hyperplane; the sigmoid is monotone and does not change the boundary.',
            },
            {
              question: 'What happens to maximum-likelihood logistic regression on perfectly separable data?',
              answerOutline:
                'The likelihood increases without bound as ||w|| grows; there is no finite maximiser. Regularization restores a finite, better-generalising solution.',
            },
          ],
        },
        {
          slug: 'basis-expansions-and-glms',
          title: 'Basis expansions, GLMs and the probabilistic view',
          summary:
            'Making linear models nonlinear with polynomial and spline features, generalized linear models for counts and other targets, and the unifying idea that losses are negative log-likelihoods and penalties are priors.',
          estimatedMinutes: 110,
          objectives: [
            'Use polynomial, spline and interaction features to fit nonlinear relationships with linear models and control their complexity',
            'Explain the generalized linear model recipe (exponential family, link function) and fit a Poisson regression',
            'Show that least squares is maximum likelihood under Gaussian noise and ridge is MAP under a Gaussian prior',
            'Choose an appropriate loss/link for a target type (continuous, binary, count, positive skewed)',
          ],
          concepts: [
            'Feature maps φ(x); polynomial features; interactions',
            'Splines and piecewise polynomials; knots',
            'Exponential family; link function; GLM',
            'Poisson regression for counts',
            'Loss = negative log-likelihood',
            'Regularization = prior (MAP estimation)',
            'Robust losses (Huber) and heavy tails',
          ],
          explanation: `A model that is linear in its *parameters* can be arbitrarily nonlinear in its *inputs*: replace $\\mathbf{x}$ with a feature map $\\phi(\\mathbf{x})$ and everything from the last three lessons still applies. **Polynomial features** ($x, x^2, x^3, x_1 x_2, \\ldots$) are the obvious map and overfit quickly at high degree, with wild behaviour at the edges. **Splines** fix this: piecewise low-degree polynomials joined smoothly at **knots**, giving local flexibility; natural cubic splines with a handful of knots usually beat polynomials of any degree. **Interaction** terms let the effect of one feature depend on another. With a feature map, the model's complexity lives in $\\phi$ and in the regularization, and cross-validation chooses both. This is the road to kernels in module 4.

The second generalisation changes the loss. Least squares is **maximum likelihood** under $y \\sim \\mathcal{N}(\\mathbf{w}^\\top\\mathbf{x}, \\sigma^2)$; logistic regression is maximum likelihood under $y \\sim \\mathrm{Bernoulli}(\\sigma(\\mathbf{w}^\\top\\mathbf{x}))$. Both are **generalized linear models**: pick a distribution from the exponential family for $y$, a **link** between its mean and the linear predictor, and maximise likelihood. Counts get a Poisson distribution with a log link, so $\\mathbb{E}[y] = e^{\\mathbf{w}^\\top\\mathbf{x}}$ and coefficients are multiplicative effects; positive skewed targets get a Gamma. Choosing the loss to match the target type is a modelling decision with real consequences, not a technicality.

The third generalisation reads penalties the same way. Adding $\\lambda\\|\\mathbf{w}\\|^2$ to the negative log-likelihood is **maximum a posteriori** estimation with a Gaussian prior on $\\mathbf{w}$; the L1 penalty is a Laplace prior. Regularization strength is the prior's precision. Module 6 pursues this Bayesian view; for now it is enough to see that every loss and penalty in this subject is a probabilistic assumption in disguise, which tells you when it is appropriate. Read CS229 part III (GLMs) and ISL chapter 7.`,
          resources: [
            {
              title: 'CS229 lecture notes — Part III: Generalized Linear Models',
              url: 'https://cs229.stanford.edu/',
              type: 'lecture',
              cost: 'free',
              provider: 'Stanford',
              note: 'Exponential family, constructing GLMs, softmax as a GLM.',
              primary: true,
            },
            {
              title: 'ISL — chapter 7, Moving Beyond Linearity (polynomials, splines, GAMs)',
              url: 'https://www.statlearning.com/',
              type: 'textbook',
              cost: 'free',
              provider: 'James, Witten, Hastie, Tibshirani',
            },
            {
              title: 'scikit-learn user guide — Generalized Linear Models and spline features',
              url: 'https://scikit-learn.org/stable/modules/linear_model.html',
              type: 'documentation',
              cost: 'free',
              provider: 'scikit-learn',
              note: 'PoissonRegressor, GammaRegressor, TweedieRegressor; SplineTransformer is in the preprocessing guide.',
            },
            {
              title: 'Probabilistic Machine Learning: An Introduction (Murphy) — free PDF',
              url: 'https://probml.github.io/pml-book/book1.html',
              type: 'textbook',
              cost: 'free',
              provider: 'Kevin Murphy',
              note: 'Chapters 11-12 on linear and generalized linear models from the probabilistic standpoint.',
            },
          ],
          exercises: [
            {
              slug: 'polynomials-vs-splines',
              title: 'Polynomials vs splines',
              prompt:
                'On a one-dimensional noisy target (e.g. the Wage dataset from ISL, age vs wage), fit polynomial regressions of degree 2-15 and natural cubic splines with 3-15 knots, each with ridge regularization chosen by CV. Plot CV error vs complexity for both families and the fitted curves at the best setting, including behaviour beyond the data range. Which family extrapolates sanely?',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'poisson-regression',
              title: 'Poisson regression on count data',
              prompt:
                'Using the bike-sharing dataset (UCI), model hourly rental counts with (a) least squares on the raw count, (b) least squares on log(1+count), (c) Poisson regression with a log link. Compare held-out mean absolute error and the Poisson deviance, and plot predicted vs actual for the three. Interpret the coefficient on temperature in model (c) as a multiplicative effect.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'mle-and-map-derivation',
              title: 'Least squares as MLE, ridge as MAP',
              prompt:
                'Derive that maximising the likelihood of y_i ~ N(w·x_i, σ^2) is equivalent to least squares, and that maximising the posterior with prior w ~ N(0, τ^2 I) is ridge with λ = σ^2/τ^2. Then state what prior corresponds to the lasso and what noise model corresponds to the Huber loss.',
              kind: 'derivation',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why do splines usually beat high-degree polynomials?',
              answerOutline:
                'Splines are local: a knot region\'s polynomial affects only nearby fit, with controlled smoothness; polynomials are global and oscillate at the boundaries (Runge phenomenon) as degree grows.',
            },
            {
              question: 'What are the three ingredients of a GLM?',
              answerOutline:
                'An exponential-family distribution for y, a linear predictor w·x, and a link function relating the mean of y to the linear predictor; fit by maximum likelihood.',
            },
            {
              question: 'What does the regularization parameter λ mean in the Bayesian interpretation of ridge?',
              answerOutline:
                'λ = σ^2/τ^2, the ratio of noise variance to prior variance: large λ means a tight prior around zero relative to the noise, so data must be strong to move coefficients.',
            },
          ],
          relatedLessons: ['probability-statistics/estimation-and-confidence/maximum-likelihood-estimation'],
        },
      ],
      project: {
        slug: 'linear-models-report',
        title: 'Module project: a linear-models study on your dataset',
        description:
          'Apply the full linear toolkit to your dataset: baseline, least squares, ridge, lasso, elastic net, feature engineering with splines and interactions, and the appropriate GLM for your target. Report CV performance with uncertainty, the regularization paths, coefficient interpretation and a discussion of what the linear family cannot capture.',
        deliverables: [
          'A notebook producing every figure and the results table with standard deviations',
          'Implementations of least squares, ridge and logistic regression in NumPy validated against scikit-learn',
          'A 3-page report with coefficient interpretation and the diagnostic plots (residuals, calibration)',
        ],
        estimatedHours: 10,
      },
    },
    {
      slug: 'classification-and-evaluation',
      title: 'Classification and Evaluation',
      description:
        'Measuring classifiers honestly (metrics, curves, calibration), generative classifiers as a contrast to logistic regression, handling imbalance and costs, and the model-selection and error-analysis discipline that turns a score into understanding.',
      lessons: [
        {
          slug: 'classification-metrics-and-curves',
          title: 'Classification metrics, ROC and precision-recall',
          summary:
            'Beyond accuracy: the confusion matrix, precision, recall, F1, ROC and PR curves, AUC, log loss and Brier score, and how to choose the metric that matches the real cost of errors.',
          estimatedMinutes: 110,
          objectives: [
            'Compute and interpret the confusion matrix and the metrics derived from it',
            'Plot ROC and precision-recall curves by sweeping a threshold and explain what AUC measures',
            'Explain why accuracy misleads under imbalance and when PR curves are more informative than ROC',
            'Select a metric and an operating threshold from stated costs of false positives and false negatives',
          ],
          concepts: [
            'Confusion matrix: TP, FP, TN, FN',
            'Precision, recall (sensitivity), specificity, F1',
            'Threshold sweep; operating point',
            'ROC curve and AUC; PR curve and average precision',
            'Proper scoring rules: log loss, Brier score',
            'Class imbalance and the accuracy paradox',
            'Cost-sensitive decision making',
          ],
          explanation: `A classifier that outputs probabilities makes two separable decisions: how well it *ranks* examples, and where it puts the **threshold**. Accuracy conflates them and, under **imbalance**, lies: a 99%-negative dataset gives the majority baseline 99% accuracy.

The **confusion matrix** counts true/false positives/negatives at one threshold. From it: **precision** $= TP/(TP + FP)$ (of the flagged, how many are real?), **recall** $= TP/(TP + FN)$ (of the real, how many did we flag?), **specificity** $= TN/(TN + FP)$, and **F1**, the harmonic mean of precision and recall. Which matters depends on the costs: a cancer screen wants recall, a spam filter wants precision.

Sweeping the threshold traces a curve. The **ROC curve** plots recall against false positive rate; its area, **AUC**, is the probability that a random positive is ranked above a random negative, independent of threshold and class balance. The **precision-recall curve** is more informative when positives are rare, because the false positive rate stays tiny even as precision collapses. Compare models on the whole curve or the area, then choose the **operating point** from costs: with cost $c_{FP}$ and $c_{FN}$, the optimal threshold on a calibrated probability is $c_{FP}/(c_{FP} + c_{FN})$.

For the probabilities themselves use **proper scoring rules**: **log loss** and the **Brier score** are minimised only by the true probabilities and so reward both discrimination and calibration (next lesson). Always report a metric with its uncertainty across folds, and always state the threshold.

Read the scikit-learn metrics guide carefully (it is the reference), ISL section 4.4.2 on ROC, and work the exercises on the credit-card fraud dataset, where imbalance is extreme and the lessons are vivid.`,
          resources: [
            {
              title: 'scikit-learn user guide — Metrics and scoring: quantifying the quality of predictions',
              url: 'https://scikit-learn.org/stable/modules/model_evaluation.html',
              type: 'documentation',
              cost: 'free',
              provider: 'scikit-learn',
              note: 'The classification metrics section: confusion matrix, precision/recall, ROC, PR, log loss, Brier.',
              primary: true,
            },
            {
              title: 'ISL — section 4.4 (assessing classifiers, ROC curves)',
              url: 'https://www.statlearning.com/',
              type: 'textbook',
              cost: 'free',
              provider: 'James, Witten, Hastie, Tibshirani',
            },
            {
              title: 'Kaggle — Credit Card Fraud Detection dataset',
              url: 'https://www.kaggle.com/datasets/mlg-ulb/creditcardfraud',
              type: 'dataset',
              cost: 'free',
              provider: 'Kaggle / ULB',
              note: '284,807 transactions with 0.17% fraud; the standard imbalance teaching set. Requires a free Kaggle account.',
            },
            {
              title: 'MLU-Explain — ROC and AUC, precision and recall',
              url: 'https://mlu-explain.github.io/',
              type: 'interactive',
              cost: 'free',
              provider: 'Amazon MLU',
            },
          ],
          exercises: [
            {
              slug: 'metrics-from-scratch',
              title: 'Metrics and curves from scratch',
              prompt:
                'Implement confusion matrix, precision, recall, F1, ROC curve, AUC (via the rank formula) and the PR curve in NumPy. Verify each against scikit-learn on logistic-regression scores for the breast-cancer dataset. Then show numerically that AUC equals the probability a random positive outscores a random negative by sampling pairs.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'fraud-imbalance',
              title: 'Fraud: accuracy vs useful metrics',
              prompt:
                'On the credit-card fraud dataset with a stratified split, train logistic regression and a random forest. Report accuracy, AUC, average precision, and precision/recall at thresholds 0.5, 0.1 and 0.01. Plot ROC and PR curves for both models on the same axes. Explain why the ROC curves look similar while the PR curves separate the models.',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'cost-sensitive-threshold',
              title: 'Choose a threshold from costs',
              prompt:
                'Suppose a missed fraud costs 100 units and a false alarm costs 2. For each model from the previous exercise, compute total cost on the test set as a function of threshold, find the optimal threshold, and compare it with the theoretical c_FP/(c_FP+c_FN). Discuss why they differ if they do (hint: calibration).',
              kind: 'data-analysis',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What does AUC measure and what does it ignore?',
              answerOutline:
                'The probability that a random positive is scored above a random negative, i.e. ranking quality. It ignores the threshold, calibration and, in effect, class imbalance (false positive rate is normalised by the many negatives).',
            },
            {
              question: 'When should you prefer a PR curve to a ROC curve?',
              answerOutline:
                'When positives are rare and the cost of false positives among flagged items matters: PR exposes the precision collapse that ROC hides because FPR stays small.',
            },
            {
              question: 'What is a proper scoring rule and why use one?',
              answerOutline:
                'A score minimised in expectation only by reporting true probabilities (log loss, Brier). It rewards calibrated probabilities, not just correct rankings or thresholded decisions.',
            },
          ],
        },
        {
          slug: 'generative-classifiers',
          title: 'Generative classifiers: naive Bayes and Gaussian discriminant analysis',
          summary:
            'Modelling p(x|y) instead of p(y|x): Gaussian discriminant analysis (LDA/QDA), naive Bayes for text, and the discriminative vs generative trade-off.',
          estimatedMinutes: 110,
          objectives: [
            'Derive the Bayes classifier from class-conditional densities and priors',
            'Fit Gaussian discriminant analysis and show that shared covariance gives a linear boundary (LDA) and separate covariances a quadratic one (QDA)',
            'Implement multinomial naive Bayes for text with Laplace smoothing and explain the conditional-independence assumption',
            'Compare generative and discriminative classifiers on sample efficiency and robustness to model misspecification',
          ],
          concepts: [
            'Generative vs discriminative models',
            'Bayes rule for classification; class priors',
            'Gaussian discriminant analysis; LDA vs QDA',
            'Naive Bayes; conditional independence',
            'Laplace (additive) smoothing',
            'Bag-of-words and TF-IDF features',
            'Asymptotic vs finite-sample behaviour',
          ],
          explanation: `Logistic regression models $p(y \\mid \\mathbf{x})$ directly: it is **discriminative**. A **generative** classifier models how each class produces inputs, $p(\\mathbf{x} \\mid y)$, plus the class prior $p(y)$, and classifies with Bayes rule: $p(y \\mid \\mathbf{x}) \\propto p(\\mathbf{x} \\mid y)\\,p(y)$. You get a different inductive bias, a model that can generate or detect outliers, and a classifier that often works with less data.

**Gaussian discriminant analysis** assumes $\\mathbf{x} \\mid y = k \\sim \\mathcal{N}(\\boldsymbol{\\mu}_k, \\Sigma_k)$. Maximum likelihood gives the obvious estimates (class means, class covariances, class frequencies). With a **shared** covariance the log-odds between classes is linear in $\\mathbf{x}$, giving **LDA**; with separate covariances it is quadratic, giving **QDA**, which can fit curved boundaries but has far more parameters. CS229 proves the striking fact that GDA with shared covariance implies a logistic-regression form for $p(y \\mid \\mathbf{x})$, but not conversely: GDA makes a stronger assumption, which is why it is more efficient when the assumption holds and worse when it does not.

**Naive Bayes** assumes features are **conditionally independent** given the class: $p(\\mathbf{x} \\mid y) = \\prod_j p(x_j \\mid y)$. For text with bag-of-words counts, each $p(x_j \\mid y)$ is a word probability per class, estimated by counting with **Laplace smoothing** (add one to every count) so that unseen words do not zero out the product. The independence assumption is false (words co-occur), yet naive Bayes is a strong text baseline, because classification needs only the *argmax* to be right, not the probabilities, which are badly overconfident.

Ng and Jordan's analysis, summarised in the CS229 notes, gives the rule of thumb: generative models reach their (higher) asymptotic error faster; discriminative models have lower asymptotic error. Implement both GDA and naive Bayes and run the comparison on 20 Newsgroups.`,
          resources: [
            {
              title: 'CS229 lecture notes — Part IV: Generative Learning Algorithms',
              url: 'https://cs229.stanford.edu/',
              type: 'lecture',
              cost: 'free',
              provider: 'Stanford',
              note: 'GDA, its relation to logistic regression, naive Bayes and Laplace smoothing.',
              primary: true,
            },
            {
              title: 'ISL — sections 4.4-4.5 (LDA, QDA, naive Bayes and comparison)',
              url: 'https://www.statlearning.com/',
              type: 'textbook',
              cost: 'free',
              provider: 'James, Witten, Hastie, Tibshirani',
            },
            {
              title: 'scikit-learn user guide — Naive Bayes; Linear and Quadratic Discriminant Analysis',
              url: 'https://scikit-learn.org/stable/modules/naive_bayes.html',
              type: 'documentation',
              cost: 'free',
              provider: 'scikit-learn',
            },
            {
              title: 'scikit-learn — Classification of text documents (20 Newsgroups example)',
              url: 'https://scikit-learn.org/stable/auto_examples/text/plot_document_classification_20newsgroups.html',
              type: 'documentation',
              cost: 'free',
              provider: 'scikit-learn',
              note: 'Bag-of-words, TF-IDF and naive Bayes on the 20 Newsgroups dataset.',
            },
          ],
          exercises: [
            {
              slug: 'gda-from-scratch',
              title: 'GDA from scratch, LDA vs QDA',
              prompt:
                'Implement GDA with shared and with separate covariances in NumPy. On the iris dataset (two features for plotting) draw the decision regions of both and of logistic regression. Then generate data from two Gaussians with very different covariances and compare the three classifiers\' test accuracy at n = 20, 100, 1000 training points.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'naive-bayes-text',
              title: 'Multinomial naive Bayes for 20 Newsgroups',
              prompt:
                'Implement multinomial naive Bayes with Laplace smoothing on bag-of-words counts (use CountVectorizer for features). Report test accuracy against scikit-learn\'s MultinomialNB and against logistic regression on TF-IDF features. Show the ten most indicative words per class for two classes. Then plot the reliability diagram of naive Bayes probabilities and comment on their calibration.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'generative-vs-discriminative-curve',
              title: 'Generative vs discriminative learning curves',
              prompt:
                'On 20 Newsgroups (binary subset) and on Adult, plot test error against training-set size (log scale from 50 to full) for naive Bayes (or GDA) and logistic regression. Identify the crossover point if any and relate the result to the Ng-Jordan argument.',
              kind: 'data-analysis',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does GDA with shared covariance give a linear decision boundary?',
              answerOutline:
                'The log-ratio of two Gaussians with equal covariance cancels the quadratic terms, leaving a linear function of x; with different covariances the quadratic terms remain (QDA).',
            },
            {
              question: 'Why is naive Bayes a good classifier even though its independence assumption is false?',
              answerOutline:
                'Classification needs only the correct argmax; errors in the probability estimates often do not change the ranking. Its probabilities, however, are poorly calibrated (overconfident).',
            },
            {
              question: 'When would you prefer a generative classifier?',
              answerOutline:
                'Small training sets, missing features (marginalise), a need to generate or detect outliers, or when the class-conditional model is approximately right.',
            },
          ],
        },
        {
          slug: 'imbalance-calibration-and-multiclass',
          title: 'Imbalance, calibration and multiclass strategies',
          summary:
            'Practical classification: class weights and resampling for imbalanced data, probability calibration with reliability diagrams, and one-vs-rest vs multinomial approaches for many classes.',
          estimatedMinutes: 100,
          objectives: [
            'Handle class imbalance with class weights, threshold moving and resampling, and explain which to prefer and why',
            'Assess calibration with reliability diagrams and expected calibration error, and recalibrate with Platt scaling or isotonic regression',
            'Explain why some models (naive Bayes, boosted trees, SVMs) produce miscalibrated scores',
            'Build multiclass classifiers via one-vs-rest, one-vs-one and multinomial formulations and evaluate with per-class and macro metrics',
          ],
          concepts: [
            'Class weights; cost-sensitive learning',
            'Oversampling, undersampling, SMOTE; their pitfalls',
            'Threshold moving vs resampling',
            'Calibration; reliability diagram; expected calibration error',
            'Platt scaling; isotonic regression',
            'One-vs-rest, one-vs-one, multinomial',
            'Macro vs micro averaging; per-class recall',
          ],
          explanation: `Three practical problems come up in almost every classification project.

**Imbalance.** A model trained on 1% positives learns the prior and predicts negative. The cleanest fixes keep the data and change the objective: **class weights** multiply the loss of minority examples (equivalent to cost-sensitive learning), or you simply **move the threshold** on a well-ranked score, as the metrics lesson showed. **Resampling** (undersampling majority, oversampling minority, synthetic examples via SMOTE) is popular but easy to misuse: resampling must happen inside each training fold only, never before splitting, or you will validate on synthetic copies of training points. Also, resampling distorts the predicted probabilities, so recalibrate afterwards.

**Calibration.** A calibrated model's "70%" predictions are right 70% of the time. Check with a **reliability diagram**: bin predictions by confidence and plot observed frequency against mean predicted probability; summarise with **expected calibration error**. Logistic regression is roughly calibrated by construction; naive Bayes is overconfident; SVM scores are not probabilities at all; boosted trees push scores away from 0 and 1. **Platt scaling** fits a logistic regression from score to label on held-out data; **isotonic regression** fits a monotone step function and needs more data. Calibration matters whenever probabilities feed a decision with costs or get combined with other models.

**Many classes.** **One-vs-rest** trains $K$ binary classifiers and takes the most confident; **one-vs-one** trains $K(K-1)/2$ and votes; the **multinomial** (softmax) formulation trains one model jointly and is the default for logistic regression and neural networks. Evaluate per class: a confusion matrix, per-class recall, and **macro** averages (each class equally weighted) alongside **micro** averages (each example equally weighted), which differ exactly when classes are imbalanced. The error-analysis lesson next builds on the confusion matrix.`,
          resources: [
            {
              title: 'scikit-learn user guide — Probability calibration',
              url: 'https://scikit-learn.org/stable/modules/calibration.html',
              type: 'documentation',
              cost: 'free',
              provider: 'scikit-learn',
              note: 'Reliability diagrams, Platt and isotonic calibration, and the comparison of classifiers.',
              primary: true,
            },
            {
              title: 'imbalanced-learn documentation',
              url: 'https://imbalanced-learn.org/stable/',
              type: 'documentation',
              cost: 'free',
              provider: 'imbalanced-learn',
              note: 'Resampling methods and, importantly, the Pipeline that resamples only inside training folds.',
            },
            {
              title: 'scikit-learn user guide — Multiclass and multioutput algorithms',
              url: 'https://scikit-learn.org/stable/modules/multiclass.html',
              type: 'documentation',
              cost: 'free',
              provider: 'scikit-learn',
            },
            {
              title: 'ESL — section 4.3 and chapter 10.6 (class imbalance, loss functions and calibration)',
              url: 'https://hastie.su.domains/ElemStatLearn/',
              type: 'textbook',
              cost: 'free',
              provider: 'Hastie, Tibshirani, Friedman',
            },
          ],
          exercises: [
            {
              slug: 'imbalance-strategies',
              title: 'Compare imbalance strategies correctly',
              prompt:
                'On the credit-card fraud data, compare logistic regression with: nothing, class_weight="balanced", random undersampling, SMOTE, and threshold moving. Use an imbalanced-learn Pipeline so resampling happens inside CV folds. Report average precision and the recall at 1% false positive rate for each. Then deliberately apply SMOTE before splitting and show how the estimate inflates.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'calibration-study',
              title: 'Calibration study',
              prompt:
                'On Adult, train logistic regression, naive Bayes, a random forest and gradient boosting. Plot reliability diagrams and compute ECE and Brier score for each. Apply Platt and isotonic calibration (fitted on a held-out calibration split) and report the improvement. Which model gained most, and did calibration change AUC?',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'multiclass-strategies',
              title: 'Multiclass strategies on digits',
              prompt:
                'On the digits dataset, compare one-vs-rest, one-vs-one and multinomial logistic regression: accuracy, macro-F1, training time, and the confusion matrix. Then make the dataset imbalanced by keeping only 10% of three classes; report micro and macro F1 and explain the gap.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why must resampling be applied inside cross-validation folds only?',
              answerOutline:
                'Resampling before splitting puts copies or synthetic neighbours of validation points into training, leaking information and inflating validation scores.',
            },
            {
              question: 'What does a reliability diagram show and what does a perfectly calibrated model look like on it?',
              answerOutline:
                'Observed positive frequency vs mean predicted probability per confidence bin; a calibrated model lies on the diagonal.',
            },
            {
              question: 'When do micro- and macro-averaged F1 differ, and which should you report?',
              answerOutline:
                'They differ under class imbalance: micro weights by examples (dominated by large classes), macro by classes. Report both; macro reveals failures on rare classes.',
            },
          ],
        },
        {
          slug: 'model-selection-and-error-analysis',
          title: 'Hyperparameter search, model comparison and error analysis',
          summary:
            'Searching hyperparameters efficiently (grid, random, Bayesian), comparing models with statistical honesty, and the error-analysis habit of looking at what the model gets wrong and why.',
          estimatedMinutes: 110,
          objectives: [
            'Run grid, random and Bayesian hyperparameter search with proper CV and explain why random search beats grid for many hyperparameters',
            'Compare two models with repeated CV and a paired test or confidence interval, and avoid declaring differences within noise',
            'Perform error analysis: slice errors by feature values, inspect worst-ranked examples, and quantify which error category to attack first',
            'Diagnose data problems (label noise, duplicates, shift) uncovered by error analysis',
          ],
          concepts: [
            'Grid search, random search, Bayesian optimization',
            'Search spaces on log scales',
            'Repeated cross-validation; paired comparison',
            'Multiple comparisons and winner\'s curse',
            'Error analysis: slicing, worst cases, confusion patterns',
            'Label noise and duplicate detection',
            'Ablation: removing a component to measure its value',
          ],
          explanation: `Once you have several models and their hyperparameters, two disciplines separate good work from lucky work.

**Search.** For one or two hyperparameters a **grid** on a log scale is fine. For more, **random search** wins: with a grid, 25 evaluations of two parameters test only 5 distinct values of each, whereas 25 random points test 25 distinct values of each, and usually only a few parameters matter. **Bayesian optimization** (Optuna, scikit-optimize) models the validation score as a function of hyperparameters and chooses the next point to try; it helps when each evaluation is expensive. Always use the same CV folds for every candidate so comparisons are paired, and remember that the best of 200 candidates is optimistically biased (the **winner's curse**): report its score from an outer fold or a final test set.

**Comparison.** Two models with CV accuracies 0.871 and 0.868 are probably the same model. Repeat CV with several seeds, compute per-fold differences, and look at a confidence interval for the mean difference (a paired $t$-test on fold scores is common, with the caveat that folds are not independent). Prefer the simpler model when the difference is within noise.

**Error analysis** is the highest-value activity most people skip. Take the validation set and look at the errors: sort by loss and read the 50 worst; cross-tabulate error rate by every categorical feature and by bins of every numeric one; cluster the false positives. Categorise what you see (label noise, a subgroup the model has never seen, a feature with a different meaning in some rows, genuinely ambiguous cases) and estimate how much each category costs. Then attack the biggest category: fix labels, add a feature, collect data, or accept the error. **Ablations** (remove one feature group or component and re-measure) tell you what each part of your pipeline is worth. The capstone report requires both an error analysis and an ablation table.`,
          resources: [
            {
              title: 'scikit-learn user guide — Tuning the hyper-parameters of an estimator',
              url: 'https://scikit-learn.org/stable/modules/grid_search.html',
              type: 'documentation',
              cost: 'free',
              provider: 'scikit-learn',
              note: 'GridSearchCV, RandomizedSearchCV, successive halving, and the note on nested CV.',
              primary: true,
            },
            {
              title: 'Random Search for Hyper-Parameter Optimization (Bergstra and Bengio)',
              url: 'https://www.jmlr.org/papers/v13/bergstra12a.html',
              type: 'article',
              cost: 'free',
              provider: 'JMLR 2012',
              note: 'The argument and evidence for random over grid search.',
            },
            {
              title: 'Optuna — hyperparameter optimization framework',
              url: 'https://optuna.org/',
              type: 'tool',
              cost: 'free',
              provider: 'Optuna',
              note: 'Bayesian/TPE search with pruning; integrates with scikit-learn and gradient boosting libraries.',
            },
            {
              title: 'Google — Machine Learning Crash Course (classification and fairness modules)',
              url: 'https://developers.google.com/machine-learning/crash-course',
              type: 'course',
              cost: 'free',
              provider: 'Google',
              note: 'Short practical modules; the sections on evaluating models and on fairness complement error analysis.',
            },
          ],
          exercises: [
            {
              slug: 'grid-vs-random',
              title: 'Grid vs random vs Bayesian search',
              prompt:
                'Tune a gradient-boosting classifier on Adult over learning rate, depth, min samples per leaf, subsample and number of trees. Give grid, random and Optuna search the same budget of 60 evaluations with identical CV folds. Plot the best-so-far validation score against evaluations for each. Report the final test score of each winner and the gap between its CV score and its test score.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'paired-comparison',
              title: 'Is the difference real?',
              prompt:
                'Compare logistic regression and a random forest on your project dataset with 10x repeated 5-fold CV. Compute the per-fold paired differences, their mean, a 95% confidence interval and a paired t-test p-value. Then compare the random forest with itself under two random seeds the same way. What does the second comparison tell you about the first?',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'error-analysis-report',
              title: 'Error analysis on your dataset',
              prompt:
                'Using your best model so far, produce: the 50 highest-loss validation examples with their features, an error-rate table sliced by every categorical feature and by quintiles of the three most important numeric features, and a hand-labelled categorisation of the 50 worst errors into at least four categories with estimated share. Propose and execute one intervention and report its effect.',
              kind: 'data-analysis',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does random search beat grid search when there are many hyperparameters?',
              answerOutline:
                'Grid wastes evaluations on repeated values of unimportant parameters; random search explores more distinct values of each parameter, so the important ones are resolved better for the same budget.',
            },
            {
              question: 'What is the winner\'s curse in model selection and how do you avoid it?',
              answerOutline:
                'The best of many candidates on the validation set has an optimistically biased validation score. Report performance from an outer CV loop or an untouched test set.',
            },
            {
              question: 'Name three things error analysis commonly reveals that a metric cannot.',
              answerOutline:
                'Label noise, subgroups with much higher error (potential fairness issues), duplicated or leaked rows, features with inconsistent meaning, and inherently ambiguous cases.',
            },
          ],
        },
      ],
      project: {
        slug: 'classifier-study-with-error-analysis',
        title: 'Module project: a classifier study with calibration and error analysis',
        description:
          'On a classification dataset with real imbalance (fraud, churn, medical), build and compare logistic regression, naive Bayes and kNN with a full evaluation: ROC/PR curves, calibrated probabilities, a cost-based operating point, a statistically honest comparison and an error analysis with one executed intervention.',
        deliverables: [
          'Reproducible notebook with all curves, reliability diagrams and the results table with confidence intervals',
          'A written error-analysis section with error categories, their estimated cost and the intervention\'s measured effect',
          'A recommended operating threshold justified by stated costs',
        ],
        estimatedHours: 10,
      },
    },
    {
      slug: 'trees-ensembles-and-kernels',
      title: 'Trees, Ensembles and Kernels',
      description:
        'The models that win on tabular data: decision trees, bagging and random forests, gradient boosting, and the kernel machines that make linear methods nonlinear with a change of inner product.',
      lessons: [
        {
          slug: 'decision-trees',
          title: 'Decision trees',
          summary:
            'Recursive partitioning with CART: impurity measures, greedy splitting, stopping and pruning, handling of categorical and missing values, and why single trees are interpretable but high-variance.',
          estimatedMinutes: 110,
          objectives: [
            'Implement CART for classification and regression with Gini/entropy and squared-error splitting',
            'Explain why greedy splitting is used and construct a dataset where it fails (XOR)',
            'Control tree complexity with depth, minimum leaf size and cost-complexity pruning chosen by CV',
            'Describe the strengths (invariance to scaling, interactions, interpretability) and the weaknesses (axis-aligned boundaries, instability) of trees',
          ],
          concepts: [
            'Recursive binary partitioning; axis-aligned splits',
            'Impurity: Gini, entropy, information gain; squared error',
            'Greedy top-down induction',
            'Stopping rules; cost-complexity pruning',
            'Categorical splits and missing values (surrogates, learned direction)',
            'Instability: high variance of trees',
            'Feature importance from impurity decrease',
          ],
          explanation: `A **decision tree** partitions the input space into rectangles by asking one question at a time ("is $x_3 < 2.5$?") and predicts a constant in each leaf: the majority class, or the mean. It is the most human-readable model in this subject and the building block of the models that dominate tabular competitions.

**CART** grows the tree greedily. At each node, for every feature and every candidate threshold, compute the **impurity** of the two children and pick the split that reduces impurity most. For classification, impurity is the **Gini index** $1 - \\sum_k p_k^2$ or the **entropy** $-\\sum_k p_k \\log p_k$; for regression, the within-node squared error. The search is $O(d \\cdot n \\log n)$ per node by sorting each feature once. Greedy search finds no lookahead: on XOR data, no single split helps, so a greedy tree may stop before finding the two-split solution. Trees need no scaling, handle mixed types, learn interactions automatically, and can treat missing values by learning which branch they should take.

A fully grown tree has one example per leaf and zero training error: maximal variance. Control it by **stopping rules** (maximum depth, minimum samples per leaf) or by growing fully and **pruning** back: cost-complexity pruning minimises $\\text{error} + \\alpha \\cdot \\text{leaves}$ and chooses $\\alpha$ by cross-validation. Even pruned, trees are **unstable**: a small change in the data changes the top split and therefore the whole tree. This instability is a weakness for a single tree and the reason ensembles of trees work so well, as the next two lessons show.

Impurity-based **feature importance** sums impurity decrease per feature; it is biased towards high-cardinality features and should be cross-checked with permutation importance (module 7). Read ISL chapter 8.1 and ESL 9.2, implement CART, and compare it with scikit-learn's.`,
          resources: [
            {
              title: 'ISL — section 8.1, The Basics of Decision Trees',
              url: 'https://www.statlearning.com/',
              type: 'textbook',
              cost: 'free',
              provider: 'James, Witten, Hastie, Tibshirani',
              primary: true,
            },
            {
              title: 'ESL — section 9.2, Tree-Based Methods',
              url: 'https://hastie.su.domains/ElemStatLearn/',
              type: 'textbook',
              cost: 'free',
              provider: 'Hastie, Tibshirani, Friedman',
              note: 'Cost-complexity pruning and the discussion of instability.',
            },
            {
              title: 'scikit-learn user guide — Decision Trees',
              url: 'https://scikit-learn.org/stable/modules/tree.html',
              type: 'documentation',
              cost: 'free',
              provider: 'scikit-learn',
              note: 'Includes the mathematical formulation, missing-value support and the pruning example.',
            },
          ],
          exercises: [
            {
              slug: 'cart-from-scratch',
              title: 'CART from scratch',
              prompt:
                'Implement a binary decision tree for classification (Gini) and regression (squared error) with max_depth and min_samples_leaf. Use the sort-once-per-feature trick. Verify on the iris and diabetes datasets that your tree matches scikit-learn\'s predictions when both are given the same hyperparameters and no ties. Report training time for n = 1000 and 100000 rows.',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'pruning-and-instability',
              title: 'Pruning and instability',
              prompt:
                'On Adult, grow a full tree and plot CV accuracy against the cost-complexity α path; pick α and report test accuracy against the full tree and a depth-limited tree. Then fit trees on 20 bootstrap samples and record the root split feature and the test predictions; report how often the root changes and the average pairwise disagreement between trees.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'xor-and-greedy',
              title: 'Where greedy splitting fails',
              prompt:
                'Generate 2D XOR data (four Gaussian blobs, diagonal classes). Show that no single axis-aligned split reduces Gini impurity, and that a depth-1 tree is at chance. Then show that a depth-2 tree solves it and explain what min_impurity_decrease would do here. Finally add a rotated version (45 degrees) and plot the tree\'s staircase decision boundary at depth 10.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does a decision tree not need feature scaling?',
              answerOutline:
                'Splits are thresholds on single features chosen by rank order; any monotone transform of a feature leaves the set of possible partitions unchanged.',
            },
            {
              question: 'What does cost-complexity pruning optimise and how is α chosen?',
              answerOutline:
                'Training error plus α times the number of leaves, over subtrees of the full tree; α is chosen by cross-validation on the resulting sequence of nested subtrees.',
            },
            {
              question: 'Why are trees high-variance models?',
              answerOutline:
                'Greedy, hierarchical splits mean a small data change can alter the top split and everything below it; deep trees fit noise in small leaves.',
            },
          ],
        },
        {
          slug: 'bagging-and-random-forests',
          title: 'Bagging and random forests',
          summary:
            'Averaging many high-variance models: the bootstrap, bagging as variance reduction, random feature subsets to decorrelate trees, out-of-bag error and forest-based feature importance.',
          estimatedMinutes: 100,
          objectives: [
            'Explain why averaging B models reduces variance by up to a factor of B, and why correlation between models limits the gain',
            'Implement bagging and a random forest on top of your tree, including out-of-bag error estimation',
            'Tune the number of trees, max_features and leaf size, and explain why forests rarely overfit with more trees',
            'Compute permutation feature importance and compare it with impurity importance',
          ],
          concepts: [
            'Bootstrap sampling',
            'Bagging: bootstrap aggregation; variance reduction',
            'Correlation between ensemble members',
            'Random forests: random feature subsets at each split',
            'Out-of-bag (OOB) error',
            'Number of trees; max_features',
            'Permutation importance vs impurity importance',
          ],
          explanation: `If you have $B$ independent estimators each with variance $\\sigma^2$, their average has variance $\\sigma^2 / B$. Trees are high-variance and cheap, so average many of them. You only have one dataset, but the **bootstrap** gives pseudo-replicates: sample $n$ rows with replacement, fit a tree, repeat $B$ times, average the predictions (or vote). That is **bagging**. The bias is unchanged (each tree is as flexible as before) and the variance drops.

The catch is **correlation**. Bootstrap samples overlap (each contains about 63% of the rows), and strong features appear at the top of every tree, so the trees are correlated with coefficient $\\rho$ and the ensemble variance is $\\rho\\sigma^2 + (1 - \\rho)\\sigma^2 / B$: more trees cannot remove the first term. **Random forests** attack $\\rho$ directly: at every split, consider only a random subset of $m$ features (typically $\\sqrt{d}$ for classification, $d/3$ for regression). Individual trees get slightly worse; the ensemble gets markedly better because the trees now disagree in useful ways. The number of trees is not a complexity knob: more trees only reduce variance, so set it large and tune $m$ and the leaf size instead.

Bagging gives free validation. Each tree never saw about 37% of the rows; predicting those rows with only the trees that did not see them gives the **out-of-bag error**, an honest estimate close to leave-one-out CV at no extra cost.

For importance, **permutation importance** shuffles one feature in the validation data and measures the drop in score, which reflects what the model actually uses and is not biased towards high-cardinality features. Correlated features share importance and can mask each other; group them. Read ISL 8.2 and ESL chapter 15, then build a forest on your tree and reproduce the correlation argument numerically.`,
          resources: [
            {
              title: 'ISL — section 8.2, Bagging, Random Forests, Boosting',
              url: 'https://www.statlearning.com/',
              type: 'textbook',
              cost: 'free',
              provider: 'James, Witten, Hastie, Tibshirani',
              primary: true,
            },
            {
              title: 'ESL — chapter 15, Random Forests',
              url: 'https://hastie.su.domains/ElemStatLearn/',
              type: 'textbook',
              cost: 'free',
              provider: 'Hastie, Tibshirani, Friedman',
              note: 'The variance/correlation analysis and the OOB discussion.',
            },
            {
              title: 'Random Forests (Leo Breiman, 2001)',
              url: 'https://link.springer.com/article/10.1023/A:1010933404324',
              type: 'article',
              cost: 'free',
              provider: 'Machine Learning journal',
              note: 'The original paper; open access.',
            },
            {
              title: 'scikit-learn user guide — Ensembles: bagging, forests, and permutation importance',
              url: 'https://scikit-learn.org/stable/modules/ensemble.html',
              type: 'documentation',
              cost: 'free',
              provider: 'scikit-learn',
            },
          ],
          exercises: [
            {
              slug: 'forest-from-scratch',
              title: 'Random forest on your own tree',
              prompt:
                'Add bootstrap sampling and per-split random feature subsets to your CART implementation, with OOB prediction. On Adult, report test accuracy for 1, 10, 50, 200 trees with m = d (bagging) and m = sqrt(d) (forest), plus the OOB estimate, and compare with scikit-learn. Plot test error vs number of trees for both settings.',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'correlation-experiment',
              title: 'Measure tree correlation',
              prompt:
                'For bagging and for forests with m = sqrt(d), m = d/2, m = 2 on the California housing data, compute the average pairwise correlation ρ of tree predictions on the test set and the single-tree error σ². Verify numerically that the ensemble variance tracks ρσ² + (1-ρ)σ²/B as B grows. Which m minimises test error, and does it correspond to minimum ρ?',
              kind: 'simulation',
              difficulty: 2,
            },
            {
              slug: 'importance-comparison',
              title: 'Impurity vs permutation importance',
              prompt:
                'On Adult, add a random continuous feature and a random high-cardinality categorical feature (1000 levels). Train a forest and compare impurity importance and permutation importance for all features. Which method ranks the random features highly, and why? Then duplicate the most important real feature and show how importance is shared.',
              kind: 'data-analysis',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does increasing the number of trees not cause a random forest to overfit?',
              answerOutline:
                'Averaging more trees only reduces variance toward the limit ρσ²; it does not change bias or the flexibility of each tree. Complexity is controlled by tree depth/leaf size and m.',
            },
            {
              question: 'What does restricting features per split accomplish?',
              answerOutline:
                'It decorrelates the trees by preventing the same strong features from dominating every tree, reducing ρ and hence the irreducible part of the ensemble variance.',
            },
            {
              question: 'How is OOB error computed and why is it nearly unbiased?',
              answerOutline:
                'Each row is predicted by only the trees whose bootstrap sample excluded it (about 37%); those trees never saw the row, so it acts as held-out data for them.',
            },
          ],
        },
        {
          slug: 'gradient-boosting',
          title: 'Gradient boosting',
          summary:
            'Building an additive model one small tree at a time by fitting the negative gradient of the loss: AdaBoost as the origin, gradient boosting as functional gradient descent, and the engineering of XGBoost/LightGBM with their key hyperparameters.',
          estimatedMinutes: 130,
          objectives: [
            'Explain boosting as sequential fitting of residuals (for squared error) and of negative gradients (for any differentiable loss)',
            'Implement gradient boosting with regression trees for squared error and for log loss and verify against scikit-learn',
            'Tune learning rate, number of trees, depth, subsampling and regularization with early stopping, and explain their interactions',
            'Explain the second-order (Newton) step and histogram-based splitting that make XGBoost and LightGBM fast and accurate',
          ],
          concepts: [
            'Additive models; forward stagewise fitting',
            'AdaBoost and exponential loss',
            'Gradient boosting as functional gradient descent; pseudo-residuals',
            'Shrinkage (learning rate) and number of rounds; early stopping',
            'Stochastic gradient boosting (row/column subsampling)',
            'Second-order boosting; leaf regularization (XGBoost)',
            'Histogram-based splits; leaf-wise growth (LightGBM)',
            'Why boosting wins on tabular data',
          ],
          explanation: `Bagging averages independent strong learners to cut variance. **Boosting** adds weak learners sequentially, each correcting the mistakes of the sum so far, to cut bias; the result is the most accurate family on tabular data in practice.

The idea is **forward stagewise additive modelling**: $F_m(\\mathbf{x}) = F_{m-1}(\\mathbf{x}) + \\nu\\, h_m(\\mathbf{x})$, where $h_m$ is a small tree and $\\nu$ a **learning rate**. For squared error, the best $h_m$ fits the **residuals** $y_i - F_{m-1}(\\mathbf{x}_i)$. Friedman's insight is that residuals are the negative gradient of the loss with respect to the predictions, so for *any* differentiable loss you fit $h_m$ to the **pseudo-residuals** $-\\partial\\ell(y_i, F)/\\partial F$ evaluated at $F_{m-1}$, then take a step. This is gradient descent in function space: for log loss, the pseudo-residual is $y_i - p_i$, exactly the logistic-regression gradient; for absolute error it is the sign of the residual, giving robustness. **AdaBoost**, the original algorithm, is this with exponential loss.

Boosting *can* overfit, unlike bagging, since each round adds capacity, so the hyperparameters interact: a small learning rate ($0.01$-$0.1$) needs more rounds and generalises better; shallow trees (depth 3-8) capture low-order interactions; **subsampling** rows and columns per round adds randomness that helps; and **early stopping** on a validation set picks the number of rounds. Tune the learning rate and depth, then let early stopping pick rounds.

**XGBoost** adds a second-order Taylor expansion of the loss (a Newton step per leaf, with an explicit L2 penalty on leaf values) and clever system design; **LightGBM** adds histogram-based split finding (bin features into 255 bins) and leaf-wise growth, making it very fast on large data. Both handle missing values natively. Read ESL chapter 10 and the XGBoost paper, implement gradient boosting on your tree, then learn the libraries' tuning guides, because you will use them in every tabular project.`,
          resources: [
            {
              title: 'ESL — chapter 10, Boosting and Additive Trees',
              url: 'https://hastie.su.domains/ElemStatLearn/',
              type: 'textbook',
              cost: 'free',
              provider: 'Hastie, Tibshirani, Friedman',
              note: 'Sections 10.1-10.10: AdaBoost, forward stagewise, gradient boosting, tuning.',
              primary: true,
            },
            {
              title: 'XGBoost: A Scalable Tree Boosting System (Chen and Guestrin)',
              url: 'https://arxiv.org/abs/1603.02754',
              type: 'article',
              cost: 'free',
              provider: 'arXiv / KDD 2016',
              note: 'Section 2 for the regularised objective and the second-order split gain.',
            },
            {
              title: 'XGBoost documentation — Introduction to Boosted Trees and parameter tuning',
              url: 'https://xgboost.readthedocs.io/en/stable/',
              type: 'documentation',
              cost: 'free',
              provider: 'XGBoost',
            },
            {
              title: 'LightGBM documentation — Features and Parameters Tuning',
              url: 'https://lightgbm.readthedocs.io/',
              type: 'documentation',
              cost: 'free',
              provider: 'LightGBM',
            },
          ],
          exercises: [
            {
              slug: 'gbm-from-scratch',
              title: 'Gradient boosting from scratch',
              prompt:
                'Implement gradient boosting using scikit-learn\'s DecisionTreeRegressor as the weak learner, for squared error (regression on California housing) and for log loss (classification on Adult, with the Newton leaf-value update). Verify that your regression version matches scikit-learn\'s GradientBoostingRegressor with the same settings. Plot training and validation loss against rounds for learning rates 1.0, 0.1 and 0.01.',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'boosting-tuning-study',
              title: 'Tuning study with early stopping',
              prompt:
                'With LightGBM or XGBoost on Adult: for each learning rate in {0.3, 0.1, 0.03, 0.01} and depth in {2, 4, 8}, train with early stopping on a validation fold and record the best round, validation AUC and training time. Present a 4x3 table. Then add row subsampling 0.5 and column subsampling 0.5 and report the change. Compare the best configuration with the tuned random forest from your results table.',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'pseudo-residual-derivation',
              title: 'Pseudo-residuals for three losses',
              prompt:
                'Derive the pseudo-residuals (negative gradients with respect to F) for squared error, absolute error, Huber loss and the binomial log loss. For the log loss also derive the second-order Newton update for a leaf value with an L2 penalty λ, as in XGBoost. Explain in one paragraph why absolute error makes boosting robust to outliers.',
              kind: 'derivation',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'In what sense is gradient boosting gradient descent?',
              answerOutline:
                'Each round fits a tree to the negative gradient of the loss with respect to the current predictions (function-space gradient) and takes a step of size ν in that direction.',
            },
            {
              question: 'How do learning rate and number of rounds interact, and how is the number of rounds chosen?',
              answerOutline:
                'A smaller learning rate needs more rounds but generalises better; rounds are chosen by early stopping on validation loss rather than by search.',
            },
            {
              question: 'Why can boosting overfit when bagging cannot?',
              answerOutline:
                'Boosting adds capacity each round by fitting the remaining error (eventually noise); bagging\'s rounds are independent averages that only reduce variance.',
            },
          ],
        },
        {
          slug: 'svms-and-kernels',
          title: 'Support vector machines and the kernel trick',
          summary:
            'Maximum-margin classification, the hinge loss, the dual problem and support vectors, and the kernel trick that lets linear methods work in implicit high-dimensional feature spaces.',
          estimatedMinutes: 140,
          objectives: [
            'Formulate the hard- and soft-margin SVM as a convex optimization problem and relate it to hinge loss plus L2 regularization',
            'Derive the dual via Lagrange multipliers and explain support vectors and the KKT conditions',
            'Explain the kernel trick, give the RBF and polynomial kernels, and state what makes a function a valid kernel',
            'Train and tune kernel SVMs (C, gamma) and kernel ridge regression, and explain their scaling limits',
          ],
          concepts: [
            'Margin; maximum-margin hyperplane',
            'Soft margin; slack variables; the C parameter',
            'Hinge loss as a regularised loss function',
            'Lagrangian dual; support vectors; KKT',
            'Kernel trick; feature maps; Gram matrix',
            'RBF, polynomial and linear kernels; Mercer condition',
            'Kernel ridge regression; representer theorem',
            'Scaling: O(n^2) memory, approximations (Nystroem, random features)',
          ],
          explanation: `Among all hyperplanes separating two classes, the **support vector machine** chooses the one with the largest **margin**, the distance to the closest points. With labels $y_i \\in \\{-1, +1\\}$ and a hyperplane $\\mathbf{w}^\\top\\mathbf{x} + b$, the margin is $1/\\|\\mathbf{w}\\|$ when $y_i(\\mathbf{w}^\\top\\mathbf{x}_i + b) \\ge 1$ for all $i$, so maximising the margin is minimising $\\frac12\\|\\mathbf{w}\\|^2$ subject to those constraints. Real data are not separable, so the **soft margin** allows violations $\\xi_i \\ge 0$ at a price: minimise $\\frac12\\|\\mathbf{w}\\|^2 + C\\sum_i \\xi_i$. Eliminating $\\xi$ shows this is just regularised empirical risk with the **hinge loss** $\\max(0, 1 - y f(\\mathbf{x}))$, a convex surrogate for 0-1 loss that, unlike log loss, is exactly zero for confidently correct points.

The **dual** problem, obtained from the Lagrangian, maximises over multipliers $\\alpha_i \\in [0, C]$ and involves the data only through inner products $\\mathbf{x}_i^\\top\\mathbf{x}_j$. The **KKT conditions** show $\\alpha_i > 0$ only for points on or inside the margin: the **support vectors**. The solution $\\mathbf{w} = \\sum_i \\alpha_i y_i \\mathbf{x}_i$ depends on them alone.

Because only inner products appear, you can replace $\\mathbf{x}_i^\\top\\mathbf{x}_j$ with $k(\\mathbf{x}_i, \\mathbf{x}_j) = \\phi(\\mathbf{x}_i)^\\top\\phi(\\mathbf{x}_j)$ for some feature map $\\phi$ *without ever computing $\\phi$*. That is the **kernel trick**. The **RBF** kernel $\\exp(-\\gamma\\|\\mathbf{x} - \\mathbf{x}'\\|^2)$ corresponds to an infinite-dimensional $\\phi$ and gives smooth, local decision boundaries; $\\gamma$ controls locality (large $\\gamma$ overfits) and $C$ controls margin violations; tune both on a log grid. Any symmetric positive semidefinite function is a valid kernel (Mercer), and the **representer theorem** says the same trick applies to any L2-regularised linear method, giving kernel ridge regression and kernel PCA.

The cost is the $n \\times n$ **Gram matrix**: kernel methods are superb up to tens of thousands of points and impractical beyond without approximations (Nystroem, random Fourier features). Read CS229 part V and ISL chapter 9, derive the dual yourself, and implement a simple solver.`,
          resources: [
            {
              title: 'CS229 lecture notes — Part V: Kernel Methods and Support Vector Machines',
              url: 'https://cs229.stanford.edu/',
              type: 'lecture',
              cost: 'free',
              provider: 'Stanford',
              note: 'Margins, the dual, kernels, the SMO algorithm.',
              primary: true,
            },
            {
              title: 'ISL — chapter 9, Support Vector Machines',
              url: 'https://www.statlearning.com/',
              type: 'textbook',
              cost: 'free',
              provider: 'James, Witten, Hastie, Tibshirani',
            },
            {
              title: 'scikit-learn user guide — Support Vector Machines and Kernel Approximation',
              url: 'https://scikit-learn.org/stable/modules/svm.html',
              type: 'documentation',
              cost: 'free',
              provider: 'scikit-learn',
              note: 'Practical tips on scaling, C and gamma; the kernel_approximation module for large n.',
            },
            {
              title: 'Convex Optimization (Boyd and Vandenberghe) — free PDF, chapter 5 on duality',
              url: 'https://web.stanford.edu/~boyd/cvxbook/',
              type: 'textbook',
              cost: 'free',
              provider: 'Stanford',
              note: 'For the Lagrangian duality and KKT conditions used in the SVM derivation.',
            },
          ],
          exercises: [
            {
              slug: 'svm-dual-derivation',
              title: 'Derive the soft-margin dual',
              prompt:
                'Starting from the soft-margin primal, write the Lagrangian, derive the stationarity conditions, eliminate w, b and ξ, and obtain the dual with box constraints 0 ≤ α_i ≤ C. State the KKT complementary slackness conditions and use them to classify points as outside the margin, on the margin, or violating it according to α_i. Then show how b is recovered from a margin support vector.',
              kind: 'derivation',
              difficulty: 3,
            },
            {
              slug: 'svm-solver',
              title: 'A simple SVM solver',
              prompt:
                'Implement the linear soft-margin SVM by subgradient descent on the hinge-loss objective (Pegasos style), and the kernel SVM by solving the dual with a generic QP solver (cvxpy) or a simplified SMO. On a 2D moons dataset, plot decision boundaries and support vectors for RBF γ in {0.1, 1, 10, 100} with C = 1, and for C in {0.01, 1, 100} with γ = 1. Verify against scikit-learn\'s SVC.',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'kernel-scaling',
              title: 'Kernel methods at scale',
              prompt:
                'On MNIST (fetch_openml, 70,000 x 784), train an RBF SVM on 1,000, 5,000 and 20,000 examples; record training time, memory and test accuracy. Then use a Nystroem approximation with 2,000 components plus a linear SVM on all 60,000 training examples. Compare accuracy and time, and comment on when each approach is appropriate.',
              kind: 'data-analysis',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What is a support vector and why does the solution depend only on them?',
              answerOutline:
                'A training point with nonzero dual multiplier: on the margin or violating it. KKT conditions force α_i = 0 for points strictly outside the margin, so they drop out of w = Σ α_i y_i x_i.',
            },
            {
              question: 'What makes the kernel trick possible, and what condition must a kernel satisfy?',
              answerOutline:
                'The dual (and prediction) use data only through inner products, which can be replaced by any function that is an inner product in some feature space: symmetric and positive semidefinite (Mercer).',
            },
            {
              question: 'How do C and γ affect an RBF SVM?',
              answerOutline:
                'Large C penalises margin violations (less regularization, overfits); large γ makes the kernel very local (wiggly boundary, overfits). They interact and are tuned jointly on a log grid.',
            },
          ],
        },
      ],
      project: {
        slug: 'tabular-model-bake-off',
        title: 'Module project: a tabular bake-off with ablations',
        description:
          'On your project dataset and two public tabular datasets, compare tuned linear models, random forests, gradient boosting and kernel SVMs under identical nested CV. Include ablations (feature groups, preprocessing, ensemble size) and a cost/time analysis. Write up which family wins where and why, connecting the result to the datasets\' properties.',
        deliverables: [
          'A results table with confidence intervals across three datasets and four model families',
          'Ablation tables for the winning model on each dataset',
          'Your own implementations of CART, random forest and gradient boosting validated against scikit-learn',
          'A 3-page write-up with hypotheses about why each family wins where it does',
        ],
        estimatedHours: 12,
      },
    },
    {
      slug: 'unsupervised-learning',
      title: 'Unsupervised Learning',
      description:
        'Finding structure without labels: clustering with k-means and mixtures fitted by EM, dimensionality reduction with PCA and nonlinear embeddings, and the applied cousins: anomaly detection and recommender systems.',
      lessons: [
        {
          slug: 'k-means-and-clustering',
          title: 'k-means and clustering',
          summary:
            'Lloyd\'s algorithm and what it optimises, k-means++ initialisation, choosing k, hierarchical and density-based alternatives, and the hard truth that clustering has no ground truth.',
          estimatedMinutes: 110,
          objectives: [
            'Implement Lloyd\'s algorithm and prove each step does not increase the within-cluster sum of squares',
            'Explain why initialisation matters, implement k-means++, and use multiple restarts',
            'Choose k with the elbow, silhouette and stability heuristics and explain their limits',
            'Compare k-means with agglomerative clustering and DBSCAN on data where k-means fails',
          ],
          concepts: [
            'Within-cluster sum of squares; Voronoi cells',
            'Lloyd\'s algorithm: assign, update; local minima',
            'k-means++ initialisation; restarts',
            'Choosing k: elbow, silhouette, gap, stability',
            'Agglomerative clustering; linkage; dendrograms',
            'DBSCAN: density, core points, noise',
            'Clustering evaluation without labels; with labels (ARI, NMI)',
          ],
          explanation: `**Clustering** groups points so that members of a group are similar. There is no target, so there is no single right answer; every algorithm encodes a notion of "cluster" and the job is to know which notion you are using.

**k-means** says a cluster is a set of points near a centroid. It minimises the **within-cluster sum of squares** $\\sum_k \\sum_{i \\in C_k}\\|\\mathbf{x}_i - \\boldsymbol{\\mu}_k\\|^2$. **Lloyd's algorithm** alternates two steps that each cannot increase the objective: assign each point to its nearest centroid, then move each centroid to the mean of its points. It converges to a local minimum in few iterations, and which local minimum depends on the start. **k-means++** picks initial centroids far from each other (sampling with probability proportional to squared distance to the nearest chosen centroid) and provably bounds the expected objective; always use it, and run several restarts keeping the best objective. Scale features first: k-means is a distance method.

Choosing **k** is not a solved problem. The **elbow** of the objective against k is subjective; the **silhouette** score (how much closer each point is to its own cluster than the next) is more principled; **stability** (do clusters persist under resampling?) is the most convincing. If you have labels for evaluation only, adjusted Rand index and normalised mutual information compare clusterings to them.

k-means finds convex, similarly sized blobs. It fails on elongated or nested shapes, on clusters of very different density, and in the presence of outliers (which drag centroids). **Agglomerative clustering** merges the closest pairs repeatedly under a **linkage** rule and produces a dendrogram you can cut at any level; single linkage finds chains, Ward linkage behaves like k-means. **DBSCAN** defines clusters as dense regions, finds arbitrary shapes, labels sparse points as noise, and needs no k, but needs a density threshold. Read ISL 12.4 and the scikit-learn clustering guide, implement k-means, and run all three on the two-moons and anisotropic datasets to see the differences.`,
          resources: [
            {
              title: 'ISL — section 12.4, Clustering Methods',
              url: 'https://www.statlearning.com/',
              type: 'textbook',
              cost: 'free',
              provider: 'James, Witten, Hastie, Tibshirani',
              primary: true,
            },
            {
              title: 'scikit-learn user guide — Clustering',
              url: 'https://scikit-learn.org/stable/modules/clustering.html',
              type: 'documentation',
              cost: 'free',
              provider: 'scikit-learn',
              note: 'The comparison figure of all algorithms on toy datasets, and the evaluation metrics section.',
            },
            {
              title: 'CS229 lecture notes — k-means clustering',
              url: 'https://cs229.stanford.edu/',
              type: 'lecture',
              cost: 'free',
              provider: 'Stanford',
              note: 'The short k-means chapter preceding mixtures of Gaussians and EM.',
            },
          ],
          exercises: [
            {
              slug: 'kmeans-from-scratch',
              title: 'k-means with k-means++ from scratch',
              prompt:
                'Implement Lloyd\'s algorithm with random and k-means++ initialisation. On a dataset of 10 well-separated Gaussian blobs in 2D, run 100 restarts of each initialisation and plot the histogram of final objectives. Report how often random init finds the global optimum versus k-means++. Then verify on the digits dataset that your result matches scikit-learn\'s inertia within restarts variance.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'choosing-k',
              title: 'Choosing k three ways',
              prompt:
                'On the digits dataset (true k = 10, labels used only for evaluation), compute for k = 2..20 the inertia, silhouette score and a stability score (ARI between clusterings of two random halves). Plot all three; does any recover k = 10? Report ARI and NMI against the true labels at k = 10 and interpret the confusion between clusters and digits.',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'where-kmeans-fails',
              title: 'Where k-means fails',
              prompt:
                'Generate three datasets: two moons, anisotropic blobs (stretched by a shear transform), and blobs of very different densities with 5% uniform outliers. Run k-means, agglomerative clustering (single and Ward linkage) and DBSCAN on each, plot the results in a 3x4 grid, and explain each failure in terms of the algorithm\'s definition of a cluster.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does Lloyd\'s algorithm converge, and to what?',
              answerOutline:
                'Each step (assignment, centroid update) weakly decreases the within-cluster sum of squares, which is bounded below, and there are finitely many assignments; it converges to a local minimum, not necessarily the global one.',
            },
            {
              question: 'What assumption about cluster shape does k-means make?',
              answerOutline:
                'Clusters are roughly spherical (isotropic), similar in size and separable by Voronoi cells around centroids; it fails for elongated, nested or very different-density clusters.',
            },
            {
              question: 'How does DBSCAN decide the number of clusters?',
              answerOutline:
                'It does not take k: clusters are connected components of core points (points with at least min_samples neighbours within eps); points not reachable are noise.',
            },
          ],
        },
        {
          slug: 'gaussian-mixtures-and-em',
          title: 'Gaussian mixtures and the EM algorithm',
          summary:
            'Soft clustering as density estimation: the mixture model, why maximum likelihood is hard with latent variables, the EM algorithm as coordinate ascent on a lower bound, and its connection to k-means.',
          estimatedMinutes: 130,
          objectives: [
            'Write the likelihood of a Gaussian mixture and explain why latent cluster assignments make it hard to maximise directly',
            'Derive the E-step (responsibilities) and M-step (weighted means, covariances, mixing weights) and implement EM',
            'Explain EM as maximising a lower bound on the log-likelihood (Jensen) and why it monotonically improves',
            'Choose the number of components with BIC and recognise degenerate solutions (collapsing covariance)',
          ],
          concepts: [
            'Mixture model; latent variable; responsibilities',
            'Marginal likelihood; log-sum-exp',
            'E-step and M-step',
            'Evidence lower bound (ELBO); Jensen\'s inequality',
            'Monotone convergence to a local optimum',
            'k-means as hard-assignment EM with shared spherical covariance',
            'Model selection: BIC/AIC; covariance types',
            'Singularities and regularization',
          ],
          explanation: `A **Gaussian mixture model** says each point came from one of $K$ Gaussians: pick component $z \\sim \\mathrm{Categorical}(\\pi)$, then $\\mathbf{x} \\mid z = k \\sim \\mathcal{N}(\\boldsymbol{\\mu}_k, \\Sigma_k)$. It is a density model, so it gives probabilities, handles elliptical clusters, and produces **soft** assignments: the **responsibility** $r_{ik} = p(z_i = k \\mid \\mathbf{x}_i)$.

Maximum likelihood is awkward because $z$ is **latent**: the log-likelihood $\\sum_i \\log \\sum_k \\pi_k \\mathcal{N}(\\mathbf{x}_i; \\boldsymbol{\\mu}_k, \\Sigma_k)$ has a sum inside the log and no closed-form maximiser. If you *knew* the assignments, the M-step would be trivial (per-component means and covariances); if you knew the parameters, the assignments would be trivial (Bayes rule). **EM** alternates: the **E-step** computes responsibilities given current parameters; the **M-step** re-estimates parameters by responsibility-weighted maximum likelihood: $\\boldsymbol{\\mu}_k = \\sum_i r_{ik}\\mathbf{x}_i / \\sum_i r_{ik}$ and so on.

Why does it work? Jensen's inequality gives, for any distribution $q$ over $z$, a lower bound $\\mathcal{L}(q, \\theta) \\le \\log p(\\mathbf{x} \\mid \\theta)$, the **ELBO**. The E-step maximises the bound over $q$ (making it tight at the current $\\theta$), the M-step maximises it over $\\theta$. Each step cannot decrease the log-likelihood, so EM converges monotonically, though only to a local optimum; initialise from k-means and restart. The same argument underlies EM for hidden Markov models, missing data and variational inference in the deep-learning subject.

**k-means** is the limit of EM with hard assignments and shared spherical covariance $\\sigma^2 I$ as $\\sigma \\to 0$. Two practical issues: a component can collapse onto a single point with covariance shrinking to zero and likelihood to infinity (add a small regulariser to covariances), and the number of components is chosen by **BIC**, which penalises parameters, rather than by likelihood, which always prefers more. Read CS229's EM chapter and implement EM for mixtures, using log-sum-exp for numerical stability.`,
          resources: [
            {
              title: 'CS229 lecture notes — Mixtures of Gaussians and the EM Algorithm',
              url: 'https://cs229.stanford.edu/',
              type: 'lecture',
              cost: 'free',
              provider: 'Stanford',
              note: 'The chapters on mixtures of Gaussians, general EM and its convergence proof via Jensen.',
              primary: true,
            },
            {
              title: 'Pattern Recognition and Machine Learning (Bishop) — chapter 9, Mixture Models and EM',
              url: 'https://www.microsoft.com/en-us/research/people/cmbishop/prml-book/',
              type: 'textbook',
              cost: 'free',
              provider: 'Christopher Bishop / Microsoft Research',
              note: 'The PDF is free from the author\'s page. Chapter 9 is the classic treatment, including the ELBO view.',
            },
            {
              title: 'scikit-learn user guide — Gaussian mixture models',
              url: 'https://scikit-learn.org/stable/modules/mixture.html',
              type: 'documentation',
              cost: 'free',
              provider: 'scikit-learn',
              note: 'Covariance types, BIC selection and the variational variant.',
            },
          ],
          exercises: [
            {
              slug: 'em-from-scratch',
              title: 'EM for Gaussian mixtures from scratch',
              prompt:
                'Implement EM for a GMM with full covariances, using log-sum-exp in the E-step and a covariance regulariser. Verify the log-likelihood increases at every iteration (assert it) and that the final parameters match scikit-learn\'s GaussianMixture on the Old Faithful data (or a 2D blob dataset) from the same initialisation. Plot the component ellipses at iterations 1, 5, 20.',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'em-derivation',
              title: 'Derive EM for mixtures',
              prompt:
                'Derive the ELBO via Jensen\'s inequality, show that the E-step q(z) = p(z|x, θ) makes the bound tight, and derive the M-step updates for π_k, μ_k and Σ_k by maximising the expected complete-data log-likelihood with a Lagrange multiplier for Σπ_k = 1. Then show that as σ² → 0 with shared spherical covariance, the responsibilities become one-hot and the updates reduce to k-means.',
              kind: 'derivation',
              difficulty: 3,
            },
            {
              slug: 'bic-and-collapse',
              title: 'Model selection and the singularity',
              prompt:
                'On the digits dataset projected to 20 PCA dimensions, fit GMMs with K = 2..30 and covariance types full/diag/spherical; plot BIC against K for each type and report the chosen model. Then, on a tiny 2D dataset, fit a GMM with no covariance regularisation and many components and show a component collapsing (log-likelihood exploding); explain what the regulariser does.',
              kind: 'data-analysis',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why cannot the mixture log-likelihood be maximised in closed form?',
              answerOutline:
                'The sum over latent components sits inside the logarithm, coupling all parameters; setting gradients to zero yields equations whose solutions depend on responsibilities that depend on the parameters.',
            },
            {
              question: 'What guarantees that EM does not decrease the likelihood?',
              answerOutline:
                'Each iteration maximises a lower bound (ELBO) that is tight at the current parameters: E-step makes it tight, M-step raises it, so the log-likelihood rises by at least the bound\'s increase.',
            },
            {
              question: 'Why select the number of components with BIC rather than log-likelihood?',
              answerOutline:
                'Likelihood always increases with more components (more parameters); BIC adds a penalty proportional to parameter count times log n, trading fit against complexity.',
            },
          ],
          relatedLessons: ['probability-statistics/estimation-and-confidence/maximum-likelihood-estimation'],
        },
        {
          slug: 'pca-and-dimensionality-reduction',
          title: 'PCA and dimensionality reduction',
          summary:
            'Principal component analysis via eigenvectors of the covariance and via the SVD, variance explained, reconstruction, whitening, and nonlinear embeddings (t-SNE, UMAP) for visualisation with their caveats.',
          estimatedMinutes: 120,
          objectives: [
            'Derive PCA as maximum-variance projection and as minimum reconstruction error and show both lead to the covariance eigenvectors',
            'Compute PCA via the SVD, choose the number of components by variance explained or by downstream CV, and reconstruct data from components',
            'Use PCA for visualisation, noise reduction, decorrelation (whitening) and as a preprocessing step, and explain why centring and scaling matter',
            'Use t-SNE and UMAP for visualisation and explain what their plots do and do not show',
          ],
          concepts: [
            'Centring; covariance matrix; eigendecomposition',
            'Principal components; variance explained; scree plot',
            'SVD and the low-rank approximation (Eckart-Young)',
            'Reconstruction error; projection',
            'Whitening; PCA before kNN/regression',
            'Kernel PCA (overview)',
            'Manifold learning: t-SNE, UMAP; perplexity; distortions',
          ],
          explanation: `**Principal component analysis** finds the directions along which centred data vary most. The first component $\\mathbf{v}_1$ maximises $\\mathrm{Var}(\\mathbf{v}^\\top\\mathbf{x})$ subject to $\\|\\mathbf{v}\\| = 1$; the Lagrangian gives $\\Sigma\\mathbf{v} = \\lambda\\mathbf{v}$, so the components are the **eigenvectors** of the covariance matrix $\\Sigma = \\frac1n X^\\top X$ ordered by eigenvalue, and the eigenvalue is the variance captured. The same components minimise the squared **reconstruction error** of projecting onto $k$ dimensions; the two views are equivalent because total variance is fixed.

Compute it with the **SVD**: $X = U S V^\\top$, the columns of $V$ are the components, the singular values squared over $n$ are the variances, and the projected data are $U S$. Keeping the top $k$ gives the best rank-$k$ approximation of $X$ in the Frobenius norm (Eckart-Young). Always **centre**; usually **standardise** too, because a feature with large units would otherwise own the first component by itself. Choose $k$ from the **scree plot** (cumulative variance explained), or better, by cross-validating the downstream model on $k$.

PCA earns its place as a tool: it visualises in 2D, denoises by dropping low-variance directions, **whitens** (projects and rescales so the covariance is the identity, which helps distance-based methods), and compresses high-dimensional inputs before kNN or regression. It is linear; **kernel PCA** applies the kernel trick for nonlinear structure.

For visualisation of clusters in high dimensions, **t-SNE** and **UMAP** preserve local neighbourhoods rather than global geometry. They produce striking pictures and are easy to misread: cluster sizes, distances between clusters and even the presence of clusters can be artefacts of perplexity or the number of neighbours. Run them with several settings, never cluster on their output, and read the Distill article before showing anyone a t-SNE plot. Read ISL 12.2 and ESL 14.5, derive PCA, and run the eigenfaces and MNIST exercises.`,
          resources: [
            {
              title: 'ISL — section 12.2, Principal Components Analysis',
              url: 'https://www.statlearning.com/',
              type: 'textbook',
              cost: 'free',
              provider: 'James, Witten, Hastie, Tibshirani',
              primary: true,
            },
            {
              title: 'Mathematics for Machine Learning — chapter 10, Dimensionality Reduction with PCA',
              url: 'https://mml-book.github.io/',
              type: 'textbook',
              cost: 'free',
              provider: 'Deisenroth, Faisal, Ong',
              note: 'Both derivations (maximum variance and minimum reconstruction) in full.',
            },
            {
              title: 'How to Use t-SNE Effectively (Distill)',
              url: 'https://distill.pub/2016/misread-tsne/',
              type: 'interactive',
              cost: 'free',
              provider: 'Distill',
              note: 'Interactive demonstrations of every way a t-SNE plot can mislead.',
            },
            {
              title: 'scikit-learn user guide — Decomposing signals in components (PCA, kernel PCA) and Manifold learning',
              url: 'https://scikit-learn.org/stable/modules/decomposition.html',
              type: 'documentation',
              cost: 'free',
              provider: 'scikit-learn',
            },
          ],
          exercises: [
            {
              slug: 'pca-two-ways',
              title: 'PCA via eigendecomposition and SVD',
              prompt:
                'Implement PCA by eigendecomposition of the covariance and by SVD; verify they agree (up to sign) and match scikit-learn on the digits dataset. Plot cumulative variance explained; reconstruct digits with 2, 10, 30 and 64 components and show the images with their reconstruction errors. Then run kNN on the PCA-reduced data for k_components in {2, 5, 10, 20, 40, 64} and plot CV accuracy.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'pca-derivation',
              title: 'Derive PCA both ways',
              prompt:
                'Show that maximising the variance of a unit-norm projection leads to the top eigenvector of the covariance, and that the k-dimensional subspace minimising reconstruction error is spanned by the top k eigenvectors. Explain why standardising changes the components, with a two-feature example where one feature is in metres and the other in millimetres.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'tsne-caveats',
              title: 't-SNE and UMAP, carefully',
              prompt:
                'Embed 5,000 MNIST digits with PCA (2 components), t-SNE at perplexity 5, 30 and 100, and UMAP with 5 and 50 neighbours. Colour by label. For each embedding compute the kNN accuracy (k = 10) in the 2D space as a measure of neighbourhood preservation. Then embed uniform random noise with t-SNE and describe what you see. Write five sentences on what the plots can and cannot be used to claim.',
              kind: 'data-analysis',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why are the principal components the eigenvectors of the covariance matrix?',
              answerOutline:
                'Maximising v^T Σ v subject to ||v|| = 1 gives the Lagrange condition Σ v = λ v; the maximum is attained at the eigenvector with the largest eigenvalue, and successive components are orthogonal eigenvectors.',
            },
            {
              question: 'What does the Eckart-Young theorem say and how does it relate to PCA?',
              answerOutline:
                'The truncated SVD is the best rank-k approximation in Frobenius (and spectral) norm; PCA reconstruction with k components is exactly that approximation of the centred data.',
            },
            {
              question: 'Name three things you should not conclude from a t-SNE plot.',
              answerOutline:
                'Relative cluster sizes, distances between clusters, and the existence of clusters in noise-like data; all depend on perplexity and random seed.',
            },
          ],
          relatedLessons: ['math-methods/linear-algebra/diagonalization-and-matrix-functions'],
        },
        {
          slug: 'anomaly-detection-and-recommenders',
          title: 'Anomaly detection and recommender systems',
          summary:
            'Two applied unsupervised problems: detecting outliers with density, isolation and reconstruction methods, and recommending items by collaborative filtering and matrix factorisation, with the evaluation issues each brings.',
          estimatedMinutes: 110,
          objectives: [
            'Build anomaly detectors from Gaussian density, isolation forests and PCA reconstruction error, and evaluate them with few or no labels',
            'Explain the difference between novelty detection, outlier detection and supervised rare-class classification',
            'Implement collaborative filtering via matrix factorisation with SGD or ALS on MovieLens and evaluate with held-out ratings and ranking metrics',
            'Describe cold start, popularity bias and feedback loops in deployed recommenders',
          ],
          concepts: [
            'Anomaly vs novelty detection; contamination',
            'Density-based scoring: Gaussian, kernel density, local outlier factor',
            'Isolation forest',
            'Reconstruction error as anomaly score',
            'Collaborative filtering; user-item matrix; sparsity',
            'Matrix factorisation; regularised SGD / ALS',
            'Implicit feedback; ranking metrics (precision@k, NDCG)',
            'Cold start and feedback loops',
          ],
          explanation: `Two problems you will meet in industry reuse the unsupervised toolkit directly.

**Anomaly detection** asks which points are unlike the rest, usually with no or few labelled anomalies. The density approach fits a model of normal data and scores points by low probability: a single Gaussian (CS229's classic treatment) works for roughly unimodal features; kernel density or a Gaussian mixture handles more shapes; **local outlier factor** compares a point's density with its neighbours'. The **isolation forest** takes a different view: anomalies are *easy to isolate* by random splits, so the average depth at which random trees isolate a point is its normality score; it is fast and works in high dimensions. **Reconstruction error** under PCA (or an autoencoder) flags points that do not lie near the main subspace. Evaluation is the hard part: with a handful of labelled anomalies use precision at $k$ or average precision; without any, inspect the top-scored cases by hand, which is also how you discover what the detector has learned to call "normal". Distinguish **outlier detection** (training data contains anomalies; set a contamination rate) from **novelty detection** (training data is clean).

**Recommender systems** predict which items a user will like from a sparse user-item matrix of ratings or clicks. **Collaborative filtering** uses only the matrix: neighbourhood methods find similar users or items; **matrix factorisation** learns a vector per user $\\mathbf{p}_u$ and per item $\\mathbf{q}_i$ with $\\hat{r}_{ui} = \\mathbf{p}_u^\\top\\mathbf{q}_i$ (plus biases) by minimising regularised squared error over *observed* entries with SGD or alternating least squares; it is PCA for a matrix with missing values and was the backbone of the Netflix Prize winners. With implicit feedback (clicks, not ratings) absent entries are weak negatives and the task becomes ranking: evaluate with precision@k and NDCG on held-out interactions, splitting by time. In deployment recommenders face **cold start** (new users or items have no vectors; use content features), **popularity bias**, and **feedback loops** (the model only sees what it recommended). Build the MovieLens system and measure these.`,
          resources: [
            {
              title: 'scikit-learn user guide — Novelty and Outlier Detection',
              url: 'https://scikit-learn.org/stable/modules/outlier_detection.html',
              type: 'documentation',
              cost: 'free',
              provider: 'scikit-learn',
              note: 'Isolation forest, local outlier factor, one-class SVM, elliptic envelope and their comparison.',
              primary: true,
            },
            {
              title: 'CS229 lecture notes — anomaly detection and recommender systems (main notes and problem sets)',
              url: 'https://cs229.stanford.edu/',
              type: 'lecture',
              cost: 'free',
              provider: 'Stanford',
              note: 'The Gaussian anomaly-detection treatment and the collaborative filtering material appear in the notes/problem sets across years.',
            },
            {
              title: 'MovieLens datasets (GroupLens)',
              url: 'https://grouplens.org/datasets/movielens/',
              type: 'dataset',
              cost: 'free',
              provider: 'GroupLens, University of Minnesota',
              note: 'Use the 100K or 1M dataset for the exercises; the 25M set for scale experiments.',
            },
            {
              title: 'ESL — section 14.6 and 14.7 (non-negative matrix factorisation, archetypal analysis, ICA)',
              url: 'https://hastie.su.domains/ElemStatLearn/',
              type: 'textbook',
              cost: 'free',
              provider: 'Hastie, Tibshirani, Friedman',
              note: 'Matrix factorisation as a family related to PCA.',
            },
          ],
          exercises: [
            {
              slug: 'anomaly-detectors-compared',
              title: 'Three anomaly detectors on fraud',
              prompt:
                'On the credit-card fraud data, ignoring labels for training: fit a multivariate Gaussian, an isolation forest and PCA reconstruction error (10 components) on a sample of 50,000 transactions. Score the test set and report average precision and precision at k = 100 using the labels for evaluation only. Inspect the 20 highest-scored non-fraud transactions and describe what makes them anomalous.',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'matrix-factorisation',
              title: 'Matrix factorisation on MovieLens',
              prompt:
                'Implement biased matrix factorisation (user/item biases plus k-dimensional vectors) trained by SGD on MovieLens 100K with a time-based split. Report test RMSE for k in {2, 10, 50} and regularization in {0, 0.02, 0.1}, with the global-mean and item-mean baselines. Then evaluate as a ranking task: precision@10 of recommended unseen items. Show the five nearest items to a chosen movie in the learned space.',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'cold-start-and-popularity',
              title: 'Cold start and popularity bias',
              prompt:
                'Using your MovieLens model, measure RMSE for users with fewer than 5, 5-20 and more than 20 training ratings. Then measure what fraction of top-10 recommendations across all users are among the 50 most popular movies, and compare with a popularity-only recommender. Propose and implement one mitigation for each problem (e.g. content features for cold start, a popularity penalty) and report the effect.',
              kind: 'data-analysis',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'How does an isolation forest score anomalies?',
              answerOutline:
                'Random trees split on random features at random thresholds; anomalies are isolated in few splits, so a short average path length over many trees is an anomaly score.',
            },
            {
              question: 'Why is matrix factorisation fitted only over observed entries, and what regularises it?',
              answerOutline:
                'Missing entries are unknown, not zero; fitting them would teach the model that unrated means disliked. L2 penalties on user and item vectors prevent overfitting on the sparse data.',
            },
            {
              question: 'What is a feedback loop in a recommender and why does it matter for evaluation?',
              answerOutline:
                'The system only observes interactions with items it recommended, so training data are biased toward past recommendations; offline metrics on such logs overstate quality and reinforce popularity.',
            },
          ],
        },
      ],
      project: {
        slug: 'unsupervised-analysis',
        title: 'Module project: an unsupervised analysis of a real dataset',
        description:
          'Choose a dataset without a target (or hide the target) and conduct a full unsupervised study: PCA with interpretation of components, clustering with k-means and GMMs with model selection, a visualisation with t-SNE/UMAP run at several settings, and an anomaly report. Validate claims with stability analysis and, if a hidden target exists, with ARI/NMI reported only at the end.',
        deliverables: [
          'Notebook with PCA interpretation, cluster model selection (silhouette, BIC, stability) and embeddings at multiple settings',
          'Your own k-means, EM and PCA implementations validated against scikit-learn',
          'A written interpretation of the clusters and the anomalies with explicit caveats about what the methods cannot show',
        ],
        estimatedHours: 10,
      },
    },
    {
      slug: 'optimization-and-generalization-theory',
      title: 'Optimization and Generalization Theory',
      description:
        'The mathematics under the models: gradient descent and SGD and why they converge, convexity and duality, the bias-variance decomposition and learning theory, and the Bayesian view that unifies losses, penalties and model comparison.',
      lessons: [
        {
          slug: 'gradient-descent-and-sgd',
          title: 'Gradient descent, stochastic gradients and momentum',
          summary:
            'Why gradient descent converges on smooth convex functions and how fast, what stochastic gradients change, learning-rate schedules, momentum and adaptive methods, and how to diagnose an optimizer from its loss curve.',
          estimatedMinutes: 130,
          objectives: [
            'State the descent lemma for L-smooth functions and derive the O(1/t) rate of gradient descent on convex functions and the linear rate under strong convexity',
            'Explain why SGD uses minibatches, why its noise forces a decaying learning rate, and what batch size trades off',
            'Implement SGD with momentum, Nesterov momentum, RMSProp and Adam and compare them on a controlled problem',
            'Read a loss curve to diagnose a learning rate that is too high, too low, or a plateau, and apply a schedule',
          ],
          concepts: [
            'L-smoothness; descent lemma; step size 1/L',
            'Convergence rates: sublinear (convex) vs linear (strongly convex)',
            'Condition number and zig-zagging',
            'Stochastic gradient; unbiasedness; variance; minibatches',
            'Learning-rate schedules: step, cosine, warm-up',
            'Momentum and Nesterov acceleration',
            'Adaptive methods: AdaGrad, RMSProp, Adam',
            'Loss-curve diagnostics',
          ],
          explanation: `Every model in this subject beyond the closed forms is trained by some variant of **gradient descent**, and the theory tells you how to set its single important knob.

For a function with **L-smooth** gradient (the gradient changes by at most $L$ per unit step), the **descent lemma** gives $f(\\mathbf{w} - \\alpha\\nabla f) \\le f(\\mathbf{w}) - \\alpha(1 - \\alpha L/2)\\|\\nabla f\\|^2$, so any $\\alpha < 2/L$ decreases $f$ and $\\alpha = 1/L$ is the safe choice. For convex $f$ the error after $t$ steps is $O(1/t)$; if $f$ is also **$\\mu$-strongly convex** (curvature at least $\\mu$ everywhere) the error shrinks geometrically as $(1 - \\mu/L)^t$. The ratio $\\kappa = L/\\mu$ is the **condition number**; large $\\kappa$ means a long narrow valley, zig-zagging, and $\\kappa$ iterations to converge, which is exactly why feature scaling (which equalises curvature across directions) speeds up training.

With $n$ examples the full gradient costs $O(n)$ per step. **Stochastic gradient descent** uses the gradient of one example, or a **minibatch**, which is an unbiased but noisy estimate. Early on the noise does not matter and SGD makes $n$ times more progress per epoch; near the optimum the noise prevents convergence unless the learning rate **decays** (schedules like $1/t$, step decay or cosine) or the batch grows. Batch size trades gradient variance against hardware parallelism.

**Momentum** accumulates a velocity $\\mathbf{v} \\leftarrow \\beta\\mathbf{v} + \\nabla f$ and moves along it, damping oscillation across the valley and accelerating along it; Nesterov's variant looks ahead and achieves the optimal $\\sqrt{\\kappa}$ rate. **Adaptive** methods scale each coordinate by a running estimate of its gradient magnitude: AdaGrad, RMSProp and **Adam** (momentum plus RMSProp with bias correction). Adam is a robust default for deep networks and a fine choice for anything; it is not magic and still needs a learning-rate search on a log scale.

Read the loss curve: a rising or wildly oscillating loss means the rate is too high; a slow straight decline means too low; a plateau followed by a drop usually means a saddle or a schedule step. Read CS229's optimization notes and the Distill momentum article, then run the comparison on a quadratic with controlled condition number and on logistic regression.`,
          resources: [
            {
              title: 'Why Momentum Really Works (Distill)',
              url: 'https://distill.pub/2017/momentum/',
              type: 'interactive',
              cost: 'free',
              provider: 'Distill',
              note: 'Interactive analysis of gradient descent and momentum on quadratics; the condition-number intuition.',
              primary: true,
            },
            {
              title: 'Convex Optimization (Boyd and Vandenberghe) — chapter 9, Unconstrained Minimization',
              url: 'https://web.stanford.edu/~boyd/cvxbook/',
              type: 'textbook',
              cost: 'free',
              provider: 'Stanford',
              note: 'Gradient descent convergence analysis under strong convexity, Newton\'s method.',
            },
            {
              title: 'CS229 — Supplementary notes and lecture on optimization (gradient descent, SGD)',
              url: 'https://cs229.stanford.edu/',
              type: 'lecture',
              cost: 'free',
              provider: 'Stanford',
            },
            {
              title: 'Adam: A Method for Stochastic Optimization (Kingma and Ba)',
              url: 'https://arxiv.org/abs/1412.6980',
              type: 'article',
              cost: 'free',
              provider: 'arXiv / ICLR 2015',
              note: 'The algorithm box in section 2 is all you need for the implementation.',
            },
          ],
          exercises: [
            {
              slug: 'rates-on-quadratics',
              title: 'Measure convergence rates',
              prompt:
                'Minimise f(w) = 0.5 w^T A w for a 2x2 diagonal A with condition numbers κ = 2, 10, 100, 1000 using gradient descent with α = 1/L. Plot log error against iterations and verify the slope matches log(1 - 1/κ). Add heavy-ball momentum with the optimal β and verify the improved rate. Then plot the trajectories in 2D for κ = 100 with and without momentum.',
              kind: 'simulation',
              difficulty: 2,
            },
            {
              slug: 'optimizer-zoo',
              title: 'Implement the optimizer zoo',
              prompt:
                'Implement SGD, SGD with momentum, Nesterov, RMSProp and Adam as update functions. Train logistic regression on Adult (minibatch 64) with each for 20 epochs, searching the learning rate over {1, 0.1, 0.01, 0.001} for each optimizer. Plot the best validation log loss curve per optimizer. Report which optimizer is most sensitive to the learning rate. Repeat with unscaled features and explain the change.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'batch-size-and-noise',
              title: 'Batch size, noise and schedules',
              prompt:
                'On the same problem, run SGD with batch sizes 1, 16, 256 and full batch at a fixed learning rate; plot training loss against epochs and against wall-clock time. Then add a cosine or step decay schedule to batch size 16 and show it converges to a lower loss than constant rate. Measure the gradient variance at the end of training for each batch size and relate it to the final loss.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What does the condition number tell you about gradient descent, and what practical step reduces it?',
              answerOutline:
                'Iterations to converge scale with κ = L/μ; a large κ means zig-zagging in a narrow valley. Standardising features (and, in deep nets, normalisation layers) makes curvature more uniform.',
            },
            {
              question: 'Why does SGD need a decaying learning rate to converge, when gradient descent does not?',
              answerOutline:
                'Stochastic gradients have variance that does not vanish at the optimum, so with a constant rate the iterates bounce in a noise ball of radius proportional to the rate; decaying it shrinks the ball.',
            },
            {
              question: 'What does Adam do that plain SGD with momentum does not?',
              answerOutline:
                'It scales each parameter\'s step by an estimate of its gradient magnitude (second moment), with bias correction, so parameters with rare or small gradients get larger steps; this reduces sensitivity to the global learning rate.',
            },
          ],
        },
        {
          slug: 'convexity-duality-and-constrained-optimization',
          title: 'Convexity, duality and constrained optimization',
          summary:
            'Convex sets and functions and why convexity makes learning tractable, Lagrangian duality and the KKT conditions, and the algorithms (coordinate descent, proximal gradient) that solve the lasso and the SVM.',
          estimatedMinutes: 130,
          objectives: [
            'Recognise convex functions (via definitions, second-order conditions, and composition rules) and show which ML objectives are convex',
            'Form the Lagrangian of a constrained problem, derive the dual, and state weak and strong duality and the KKT conditions',
            'Implement coordinate descent for the lasso with soft thresholding and proximal gradient (ISTA) for the same problem',
            'Explain why non-convex objectives (neural networks, k-means) can still be optimised usefully',
          ],
          concepts: [
            'Convex sets and functions; Jensen; first- and second-order conditions',
            'Local = global for convex problems',
            'Lagrangian; dual function; weak and strong duality; Slater',
            'KKT conditions',
            'Subgradients; soft thresholding',
            'Coordinate descent; proximal gradient / ISTA',
            'Non-convexity: saddles, local minima, initialisation',
          ],
          explanation: `**Convexity** is the property that makes most of classical machine learning well-behaved. A set is convex if it contains the segment between any two of its points; a function is convex if its graph lies below every chord, equivalently (when twice differentiable) if its Hessian is positive semidefinite. The payoff: every local minimum of a convex function is global, and the first-order condition $\\nabla f = 0$ is sufficient. Least squares, ridge, lasso, logistic regression and the SVM are all convex, which is why their training is reliable and why their results are reproducible across runs.

Convexity is checked by composition rules more than by Hessians: norms are convex, a convex function of an affine map is convex, nonnegative sums of convex functions are convex, and $\\log\\sum\\exp$ is convex (hence softmax cross-entropy). Learn the rules and you can read off convexity of a new objective.

**Constrained** problems bring **duality**. For $\\min f(\\mathbf{w})$ subject to $g_i(\\mathbf{w}) \\le 0$, the Lagrangian $L(\\mathbf{w}, \\boldsymbol{\\lambda}) = f + \\sum_i\\lambda_i g_i$ with $\\lambda_i \\ge 0$ gives a dual function $d(\\boldsymbol{\\lambda}) = \\min_{\\mathbf{w}} L$ that lower-bounds the optimum (**weak duality**) and equals it for convex problems satisfying a mild condition (**strong duality**, Slater). At the optimum the **KKT conditions** hold: stationarity, feasibility, $\\lambda_i \\ge 0$, and complementary slackness $\\lambda_i g_i = 0$, which is where support vectors came from and which you should now be able to rederive.

Non-smooth convex problems like the lasso need **subgradients**. Two algorithms matter. **Coordinate descent** minimises over one coefficient at a time; for the lasso each one-dimensional problem has the closed-form **soft-thresholding** solution, and the method is what glmnet and scikit-learn use. **Proximal gradient** (ISTA) takes a gradient step on the smooth part and applies the soft-thresholding operator, and accelerates to FISTA with momentum.

Neural networks are not convex, and module 7 of the deep-learning subject explains why that turns out to be survivable: in high dimensions most critical points are saddles, which gradient noise escapes, and many local minima are equally good. Read Boyd chapters 3-5, work the convexity exercises, and implement both lasso solvers.`,
          resources: [
            {
              title: 'Convex Optimization (Boyd and Vandenberghe) — chapters 3-5',
              url: 'https://web.stanford.edu/~boyd/cvxbook/',
              type: 'textbook',
              cost: 'free',
              provider: 'Stanford',
              note: 'Convex functions (3), convex optimization problems (4), duality and KKT (5). Lecture slides and videos are on the same site.',
              primary: true,
            },
            {
              title: 'CS229 lecture notes — convex optimization supplementary notes',
              url: 'https://cs229.stanford.edu/',
              type: 'lecture',
              cost: 'free',
              provider: 'Stanford',
              note: 'The two short supplementary notes on convex optimization linked from the course page.',
            },
            {
              title: 'ESL — section 3.8.6 (pathwise coordinate descent for the lasso)',
              url: 'https://hastie.su.domains/ElemStatLearn/',
              type: 'textbook',
              cost: 'free',
              provider: 'Hastie, Tibshirani, Friedman',
            },
            {
              title: 'CVXPY — convex optimization modelling in Python',
              url: 'https://www.cvxpy.org/',
              type: 'tool',
              cost: 'free',
              provider: 'CVXPY',
              note: 'Use it to check your hand-written solvers and to prototype constrained formulations.',
            },
          ],
          exercises: [
            {
              slug: 'convexity-proofs',
              title: 'Prove convexity of ML objectives',
              prompt:
                'Prove that the following are convex in w: squared error, ridge, lasso (via norm convexity), logistic log loss (via the Hessian, show X^T D X is PSD), the hinge loss, and multiclass softmax cross-entropy (via log-sum-exp). Then exhibit a non-convex objective from this subject (k-means over centroids, or a one-hidden-layer network) and show a specific pair of points violating the chord condition.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'lasso-solvers',
              title: 'Coordinate descent and ISTA for the lasso',
              prompt:
                'Derive the soft-thresholding update for one coordinate of the lasso objective. Implement cyclic coordinate descent and ISTA (plus FISTA) and verify all three reach the same objective as scikit-learn\'s Lasso on the diabetes data to 1e-6. Plot objective against iterations for each; then implement the pathwise strategy (warm starts along a λ grid) and compare total time with cold starts.',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'kkt-by-hand',
              title: 'KKT on small problems',
              prompt:
                'Solve by the KKT conditions: (a) minimise ||w - c||² subject to ||w||² ≤ 1 (projection onto the ball), (b) minimise w^T Q w subject to 1^T w = 1 and w ≥ 0 (minimum-variance portfolio / simplex-constrained quadratic) for a 3x3 Q of your choice. Verify numerically with CVXPY. Identify which constraints are active and the sign of the multipliers.',
              kind: 'problem',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does convexity make training reliable?',
              answerOutline:
                'Every local minimum is global and the set of minimisers is convex; gradient-based methods with proper step sizes provably converge, so results do not depend on initialisation.',
            },
            {
              question: 'State the KKT conditions and what complementary slackness means.',
              answerOutline:
                'Stationarity of the Lagrangian, primal feasibility, dual feasibility (λ ≥ 0), and λ_i g_i = 0: a constraint either is active (g_i = 0) or has zero multiplier.',
            },
            {
              question: 'What is the soft-thresholding operator and where does it come from?',
              answerOutline:
                'S_λ(z) = sign(z) max(|z| - λ, 0): the minimiser of 0.5(w - z)² + λ|w|, obtained from the subgradient condition of the L1 term; it is the one-coordinate lasso update and the proximal operator of the L1 norm.',
            },
          ],
        },
        {
          slug: 'bias-variance-and-learning-theory',
          title: 'Bias-variance decomposition and learning theory',
          summary:
            'The formal bias-variance decomposition, what generalization bounds say (Hoeffding, uniform convergence, VC dimension), what they do not, and the modern picture of interpolation and double descent.',
          estimatedMinutes: 130,
          objectives: [
            'Derive the bias-variance-noise decomposition of expected squared error and estimate the terms by simulation',
            'Explain Hoeffding\'s inequality and the union bound argument for finite hypothesis classes, and state the VC generalization bound qualitatively',
            'Explain why the bounds are loose and what they nonetheless teach about sample complexity and model capacity',
            'Describe double descent and the role of implicit regularization in overparameterised models',
          ],
          concepts: [
            'Bias, variance and irreducible noise',
            'Expected test error over training sets',
            'Hoeffding\'s inequality; union bound; uniform convergence',
            'Growth function; VC dimension; sample complexity',
            'Structural risk minimisation',
            'Interpolation; double descent',
            'Implicit regularization of SGD; minimum-norm solutions',
          ],
          explanation: `The bias-variance trade-off has guided every lesson; here it becomes a theorem. Fix a point $\\mathbf{x}$ and consider the model $\\hat{f}_D$ trained on a random training set $D$. The expected squared error against $y = f(\\mathbf{x}) + \\varepsilon$ decomposes exactly:
$$\\mathbb{E}_{D,\\varepsilon}\\big[(y - \\hat{f}_D(\\mathbf{x}))^2\\big] = \\underbrace{(f(\\mathbf{x}) - \\mathbb{E}_D[\\hat{f}_D(\\mathbf{x})])^2}_{\\text{bias}^2} + \\underbrace{\\mathbb{E}_D\\big[(\\hat{f}_D(\\mathbf{x}) - \\mathbb{E}_D[\\hat{f}_D(\\mathbf{x})])^2\\big]}_{\\text{variance}} + \\sigma^2.$$
Bias is the error of the *average* model (too simple a class), variance is how much the model moves with the data (too flexible a class), and $\\sigma^2$ is noise nobody can remove. You can estimate the terms by simulation (many training sets from a known generator), which the first exercise does; for real data, the learning curves of module 1 are the practical proxy.

**Learning theory** asks how large $n$ must be for empirical risk to track true risk for *every* hypothesis at once, since the learner picks the best-looking one. For a single fixed hypothesis, **Hoeffding** bounds the gap by $\\sqrt{\\log(1/\\delta)/2n}$. For a finite class of $|\\mathcal{H}|$ hypotheses the **union bound** gives a uniform gap of $\\sqrt{\\log(|\\mathcal{H}|/\\delta)/2n}$: sample complexity grows only logarithmically in the class size. For infinite classes the **VC dimension** $d_{VC}$ (the largest set the class can shatter: $d + 1$ for linear classifiers in $d$ dimensions) replaces $\\log|\\mathcal{H}|$, and the bound becomes roughly $\\sqrt{(d_{VC}\\log n)/n}$. These bounds are numerically loose by orders of magnitude; their value is structural: generalization is governed by capacity relative to $n$, and **structural risk minimisation** (choosing capacity by a penalty, which regularization and pruning implement) is the principled response.

The modern wrinkle is **double descent**: as capacity grows past the point where the model interpolates the training data, test error can *fall again*, because among the many interpolating solutions the optimizer (gradient descent from small initialisation, or minimum-norm least squares) picks one with small norm, an **implicit regularization**. This reconciles the classical picture with the success of very large models and is the bridge to the deep-learning subject. Read CS229's learning theory notes, Understanding Machine Learning chapters 2-6 for the proofs, and the Belkin and Nakkiran papers for double descent.`,
          resources: [
            {
              title: 'CS229 lecture notes — Learning Theory (bias-variance, Hoeffding, uniform convergence, VC)',
              url: 'https://cs229.stanford.edu/',
              type: 'lecture',
              cost: 'free',
              provider: 'Stanford',
              primary: true,
            },
            {
              title: 'Understanding Machine Learning: From Theory to Algorithms (Shalev-Shwartz and Ben-David) — free PDF',
              url: 'https://www.cs.huji.ac.il/~shais/UnderstandingMachineLearning/',
              type: 'textbook',
              cost: 'free',
              provider: 'Hebrew University',
              note: 'Chapters 2-6: PAC learning, uniform convergence, no free lunch, VC dimension. Rigorous and readable.',
            },
            {
              title: 'Learning From Data (Abu-Mostafa) — Caltech lectures',
              url: 'https://work.caltech.edu/telecourse.html',
              type: 'course',
              cost: 'free',
              provider: 'Caltech',
              note: 'Lectures 5-8 give the most intuitive presentation of the VC bound anywhere.',
            },
            {
              title: 'Reconciling modern machine-learning practice and the classical bias-variance trade-off (Belkin et al.)',
              url: 'https://arxiv.org/abs/1812.11118',
              type: 'article',
              cost: 'free',
              provider: 'arXiv / PNAS 2019',
              note: 'The double-descent paper; pair with Nakkiran et al., Deep Double Descent (arXiv 1912.02292).',
            },
          ],
          exercises: [
            {
              slug: 'bias-variance-simulation',
              title: 'Estimate bias and variance by simulation',
              prompt:
                'Generate 500 training sets of 50 points from y = sin(2πx) + N(0, 0.3²). For polynomial degrees 1-15 (and for kNN with k = 1..30), fit each model on every training set and evaluate on a fixed grid of x. Compute bias², variance and total error on the grid and plot all three against degree (and against k). Confirm the sum matches the measured test error and locate the minimum.',
              kind: 'simulation',
              difficulty: 2,
            },
            {
              slug: 'hoeffding-and-union',
              title: 'Hoeffding and the union bound, empirically',
              prompt:
                'Simulate 10,000 fair coins flipped 20 times each. Report the fraction of coins whose empirical frequency deviates from 0.5 by more than 0.3 and compare with Hoeffding\'s bound. Then report the probability that the *most extreme* coin deviates that much and compare with the union bound. Explain what the most extreme coin has to do with choosing the best of many hypotheses.',
              kind: 'simulation',
              difficulty: 1,
            },
            {
              slug: 'double-descent',
              title: 'Reproduce double descent with least squares',
              prompt:
                'Generate n = 200 samples with d = 1000 random Fourier features of a 1D input and a smooth target. Fit minimum-norm least squares using the first p features for p from 10 to 1000 and plot test error against p. Identify the interpolation threshold at p = n and the second descent. Then add ridge regularization with a small λ and show the peak disappears. Explain in terms of the norm of the solution.',
              kind: 'simulation',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'Write the bias-variance decomposition and say which term each of these reduces: more data, regularization, a richer model.',
              answerOutline:
                'E[(y - f̂)²] = bias² + variance + noise. More data: variance. Regularization: variance (raises bias). Richer model: bias (raises variance).',
            },
            {
              question: 'Why does the union bound make sample complexity scale with log |H| rather than |H|?',
              answerOutline:
                'Hoeffding gives exponentially small failure probability per hypothesis; summing over |H| hypotheses multiplies by |H|, which inside the exponent/sqrt becomes log |H|.',
            },
            {
              question: 'What is double descent and what mechanism explains the second descent?',
              answerOutline:
                'Test error peaks at the interpolation threshold and then decreases as capacity grows further; among interpolating solutions, the optimizer picks a minimum-norm (implicitly regularised) one whose norm, and variance, shrinks as the number of parameters grows.',
            },
          ],
        },
        {
          slug: 'bayesian-view-and-model-comparison',
          title: 'The Bayesian view: priors, posteriors and model comparison',
          summary:
            'Treating parameters as uncertain: Bayesian linear regression in closed form, predictive distributions, the marginal likelihood as Occam\'s razor, Laplace approximation, and when the Bayesian machinery is worth its cost.',
          estimatedMinutes: 120,
          objectives: [
            'Derive the posterior and the predictive distribution for Bayesian linear regression with a Gaussian prior',
            'Explain MAP as a point summary of the posterior and the predictive variance as a measure of uncertainty that grows away from the data',
            'Explain the marginal likelihood (evidence) and how it penalises complexity automatically, and compare it with cross-validation and BIC',
            'Apply the Laplace approximation to Bayesian logistic regression and describe where MCMC and variational inference take over',
          ],
          concepts: [
            'Prior, likelihood, posterior; conjugacy',
            'Bayesian linear regression; posterior covariance',
            'Posterior predictive distribution; epistemic vs aleatoric uncertainty',
            'Marginal likelihood (evidence); Bayesian Occam\'s razor',
            'BIC as an approximation to the evidence',
            'Laplace approximation',
            'MCMC and variational inference (pointers)',
          ],
          explanation: `So far a model has been a single parameter vector, chosen by minimising a penalised loss. The **Bayesian** view keeps a *distribution* over parameters: a **prior** $p(\\mathbf{w})$ encodes what is plausible before data, the likelihood $p(\\mathcal{D} \\mid \\mathbf{w})$ says how well each $\\mathbf{w}$ explains the data, and Bayes rule gives the **posterior** $p(\\mathbf{w} \\mid \\mathcal{D}) \\propto p(\\mathcal{D} \\mid \\mathbf{w})\\,p(\\mathbf{w})$. MAP estimation, which produced ridge and lasso in module 2, is just the mode of this posterior; the rest of the distribution is what you have been throwing away.

For **linear regression** with Gaussian noise and a Gaussian prior $\\mathbf{w} \\sim \\mathcal{N}(0, \\tau^2 I)$ everything is closed-form: the posterior is Gaussian with mean equal to the ridge solution and covariance $(X^\\top X/\\sigma^2 + I/\\tau^2)^{-1}$. The **predictive distribution** for a new $\\mathbf{x}$ is Gaussian with mean $\\mathbf{x}^\\top\\mathbf{w}_{\\text{MAP}}$ and variance $\\sigma^2 + \\mathbf{x}^\\top \\Sigma_{\\text{post}}\\mathbf{x}$: noise plus parameter uncertainty, and the second term grows away from the training data. This is the difference between a prediction and a prediction with honest error bars, and it is why Bayesian models matter for decisions, active learning and safety.

The **marginal likelihood** $p(\\mathcal{D}) = \\int p(\\mathcal{D} \\mid \\mathbf{w})p(\\mathbf{w})\\,d\\mathbf{w}$ (the evidence) compares models without a validation set. A flexible model spreads its prior over many datasets and so assigns less probability to any particular one; a model that is just flexible enough wins. This **Bayesian Occam's razor** is what BIC approximates, and it can set hyperparameters like $\\tau$ and $\\sigma$ by maximising the evidence (empirical Bayes), which is how Gaussian processes are tuned.

Beyond conjugate models the integrals are intractable. The **Laplace approximation** fits a Gaussian at the MAP using the Hessian, and works well for logistic regression. **MCMC** samples the posterior and **variational inference** optimises an approximating distribution; both are covered in the probability-statistics subject and reappear in deep learning (VAEs). Read Bishop chapter 3, Murphy's chapter on Bayesian linear regression, and implement the closed forms.`,
          resources: [
            {
              title: 'Pattern Recognition and Machine Learning (Bishop) — chapter 3, Linear Models for Regression (Bayesian sections)',
              url: 'https://www.microsoft.com/en-us/research/people/cmbishop/prml-book/',
              type: 'textbook',
              cost: 'free',
              provider: 'Christopher Bishop / Microsoft Research',
              note: 'Sections 3.3-3.5: Bayesian linear regression, the evidence, and model comparison, with the famous sequential-update figures.',
              primary: true,
            },
            {
              title: 'Probabilistic Machine Learning: An Introduction (Murphy) — chapters 4 and 11',
              url: 'https://probml.github.io/pml-book/book1.html',
              type: 'textbook',
              cost: 'free',
              provider: 'Kevin Murphy',
              note: 'Bayesian statistics (4) and Bayesian linear regression (11.7).',
            },
            {
              title: 'Information Theory, Inference, and Learning Algorithms (MacKay) — free online',
              url: 'https://www.inference.org.uk/mackay/itila/',
              type: 'textbook',
              cost: 'free',
              provider: 'David MacKay',
              note: 'Chapter 28 on model comparison and Occam\'s razor is the clearest account of the evidence.',
            },
          ],
          exercises: [
            {
              slug: 'bayesian-linear-regression',
              title: 'Bayesian linear regression with error bars',
              prompt:
                'Implement Bayesian linear regression with polynomial or RBF features on a 1D dataset of 20 noisy points. Plot the posterior mean with a 95% predictive band, and show the band widening outside the data. Reproduce Bishop\'s sequential-update figure: the posterior over (w0, w1) after 0, 1, 2, 20 points. Verify the posterior mean equals ridge with λ = σ²/τ².',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'evidence-vs-cv',
              title: 'Evidence vs cross-validation for model selection',
              prompt:
                'For the same dataset, compute the log marginal likelihood for polynomial degrees 0-12 (closed form for the conjugate Gaussian model), the 5-fold CV error, and BIC. Plot all three against degree and compare the selected degrees. Then maximise the evidence over the prior variance τ² and noise σ² and compare the chosen τ² with the CV-chosen ridge penalty.',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'laplace-logistic',
              title: 'Laplace approximation for logistic regression',
              prompt:
                'Fit MAP logistic regression on a 2D dataset, compute the Hessian at the MAP, and form the Laplace Gaussian posterior. Draw 100 posterior samples, plot their decision boundaries, and compute the predictive probability by averaging over samples (or by the probit approximation). Compare the predictive probabilities to the MAP probabilities far from the data and explain the difference.',
              kind: 'coding',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'What two sources of uncertainty appear in the Bayesian predictive variance, and which one shrinks with more data?',
              answerOutline:
                'Aleatoric noise σ² (irreducible) and epistemic parameter uncertainty x^T Σ_post x, which shrinks as the posterior concentrates with more data.',
            },
            {
              question: 'How does the marginal likelihood penalise complex models without an explicit penalty term?',
              answerOutline:
                'It integrates the likelihood over the prior: a complex model spreads prior mass over many possible datasets, so the probability of the observed one is lower unless the extra flexibility is needed.',
            },
            {
              question: 'What does the Laplace approximation assume and when does it fail?',
              answerOutline:
                'The posterior is approximately Gaussian around its mode with covariance from the inverse Hessian; it fails for multimodal, skewed or bounded posteriors and with little data.',
            },
          ],
          relatedLessons: ['probability-statistics/bayesian-inference-and-mcmc/bayesian-updating-and-priors'],
        },
      ],
      project: {
        slug: 'optimizer-and-theory-notebook',
        title: 'Module project: an optimization and theory notebook',
        description:
          'A single reproducible notebook that numerically verifies the core theory: convergence rates against condition number, the optimizer comparison, the lasso solvers, the bias-variance decomposition by simulation, double descent, and Bayesian linear regression with evidence-based model selection. Each section states the theorem, shows the experiment and comments on the agreement.',
        deliverables: [
          'Notebook with all experiments, seeds fixed, running end to end in under ten minutes',
          'Short derivations (typed or scanned) for the descent lemma rate, the lasso coordinate update, the bias-variance decomposition and the Bayesian posterior',
          'A one-page summary of three places where theory and experiment disagreed and why',
        ],
        estimatedHours: 10,
      },
    },
    {
      slug: 'ml-engineering',
      title: 'ML Engineering',
      description:
        'From notebook to production without fooling yourself: leak-free pipelines, feature engineering and selection, reproducible experiments, deployment, monitoring, interpretability and fairness.',
      lessons: [
        {
          slug: 'pipelines-and-leakage',
          title: 'Pipelines, leakage and time-aware validation',
          summary:
            'scikit-learn pipelines and column transformers as the mechanism that makes preprocessing part of the model, the taxonomy of data leakage, and validation for temporal and grouped data.',
          estimatedMinutes: 110,
          objectives: [
            'Build a Pipeline with a ColumnTransformer that handles numeric, categorical and text columns and tune it end to end with cross-validation',
            'Classify leakage into target leakage, train-test contamination and temporal leakage, and give an example and a detection method for each',
            'Design time-aware validation (forward chaining, gap between train and test) and explain why random splits overstate performance on temporal data',
            'Write custom transformers that fit on train and transform on test correctly',
          ],
          concepts: [
            'Pipeline, ColumnTransformer, FeatureUnion',
            'fit/transform contract; custom transformers',
            'Target leakage; proxy features; future information',
            'Train-test contamination; duplicates; group leakage',
            'TimeSeriesSplit; forward chaining; purging and embargo',
            'Leakage detection: too-good-to-be-true scores, feature importance audits',
            'Serialising a pipeline',
          ],
          explanation: `Everything you do to the data before the model is part of the model. scikit-learn's **Pipeline** makes this literal: a sequence of transformers ending in an estimator, with one \`fit\` that fits each stage on the training data in turn and one \`predict\` that applies them. A **ColumnTransformer** routes different columns to different transformers (impute and scale numerics, one-hot categoricals, TF-IDF text). Put the pipeline inside cross-validation and every fold refits every stage on its training part only, which eliminates the preprocessing leakage you demonstrated in module 1. Hyperparameters of any stage are tunable with the \`step__param\` syntax, so feature engineering choices get the same honest treatment as model parameters. The fitted pipeline is one object to serialise and deploy.

**Leakage** is information available at training time that will not be available at prediction time, and it is the most common reason a model that scored 0.95 offline scores 0.6 in production. **Target leakage**: a feature that is a consequence of the target (an "account closed" flag when predicting churn, a diagnosis code when predicting a disease, a column computed after the outcome). **Train-test contamination**: duplicate rows, the same patient in both splits, or statistics computed on the full data. **Temporal leakage**: using features from the future, or validating on data earlier than training data. The symptoms: a score far above the baseline and above what domain experts think possible, a single feature with overwhelming importance, or performance that collapses on the newest data.

For temporal data, use **forward chaining**: train on the past, validate on the next period, roll forward. Leave a **gap** between train and validation if features are computed from windows that overlap the boundary (purging), and remember that feature engineering with rolling statistics must only look backwards. For grouped data, GroupKFold by the entity. Read the scikit-learn pipeline and pitfalls pages and the Kaufman et al. leakage paper, then audit your project dataset with the exercises.`,
          resources: [
            {
              title: 'scikit-learn user guide — Pipelines and composite estimators',
              url: 'https://scikit-learn.org/stable/modules/compose.html',
              type: 'documentation',
              cost: 'free',
              provider: 'scikit-learn',
              note: 'Pipeline, ColumnTransformer, caching and nested parameter names.',
              primary: true,
            },
            {
              title: 'scikit-learn — Common pitfalls and recommended practices (data leakage section)',
              url: 'https://scikit-learn.org/stable/common_pitfalls.html',
              type: 'documentation',
              cost: 'free',
              provider: 'scikit-learn',
            },
            {
              title: 'Leakage in Data Mining: Formulation, Detection, and Avoidance (Kaufman, Rosset, Perlich, Stitelman)',
              url: 'https://dl.acm.org/doi/10.1145/2020408.2020496',
              type: 'article',
              cost: 'freemium',
              provider: 'ACM KDD 2011',
              note: 'The taxonomy of leakage with real competition examples. The ACM page may be paywalled; author copies are findable by title.',
            },
            {
              title: 'scikit-learn user guide — Cross-validation iterators for grouped and time-series data',
              url: 'https://scikit-learn.org/stable/modules/cross_validation.html',
              type: 'documentation',
              cost: 'free',
              provider: 'scikit-learn',
              note: 'GroupKFold, TimeSeriesSplit with gap, and the visualisation example of each splitter.',
            },
          ],
          exercises: [
            {
              slug: 'full-pipeline',
              title: 'A complete tunable pipeline',
              prompt:
                'Build a Pipeline for your project dataset with a ColumnTransformer (numeric: impute + scale; categorical: impute + one-hot with handle_unknown; any text: TF-IDF) and a gradient-boosting or logistic model. Tune at least one preprocessing parameter and two model parameters jointly with RandomizedSearchCV. Serialise the fitted pipeline with joblib, reload it in a fresh process and verify identical predictions on 100 rows.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'leakage-hunt',
              title: 'Plant and detect leakage',
              prompt:
                'Take a dataset where you know the ground truth (Adult or your project data). Plant three leaks: a target-derived feature with 5% label noise, 10% duplicated rows across train and test, and a feature computed from a full-dataset statistic. Train and show the inflated score for each. Then write a detection script that flags: features with suspiciously high univariate AUC, duplicate rows across splits, and importance concentrated in one feature. Run it on an unmodified dataset and report false alarms.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'temporal-validation',
              title: 'Random vs forward-chaining splits',
              prompt:
                'On a temporal dataset (bike sharing by hour, or a Kaggle sales dataset), add lag and rolling-mean features computed correctly (past only). Compare a random 5-fold CV score against TimeSeriesSplit with 5 folds and a gap equal to the rolling window. Then deliberately compute the rolling mean centred (using future values) and show how the random-split score improves while the forward-chaining score with gap does not.',
              kind: 'data-analysis',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does putting preprocessing inside the Pipeline fix leakage in cross-validation?',
              answerOutline:
                'Each fold calls fit on the pipeline with only the training portion, so imputers, scalers and encoders learn only from training rows; the validation rows are transformed with those parameters.',
            },
            {
              question: 'Give an example of target leakage and how you would detect it.',
              answerOutline:
                'A feature recorded after the outcome (e.g. "treatment given" when predicting diagnosis). Detect via implausibly high scores, a dominant feature importance, and checking when each feature becomes available relative to prediction time.',
            },
            {
              question: 'Why add a gap between training and validation in time-series CV?',
              answerOutline:
                'Features built from rolling windows near the boundary use information from the validation period; a gap (purging) removes the overlap so the estimate reflects real forecasting.',
            },
          ],
        },
        {
          slug: 'feature-engineering-and-selection',
          title: 'Feature engineering, selection and interpretability',
          summary:
            'Creating features that encode domain knowledge, encoding high-cardinality categoricals safely, selecting features with filters, wrappers and embedded methods, and explaining models with permutation importance, partial dependence and SHAP.',
          estimatedMinutes: 110,
          objectives: [
            'Engineer features from dates, text, geolocation and aggregates, and measure their value with ablations',
            'Use target encoding with proper cross-fitting for high-cardinality categoricals and explain why naive target encoding leaks',
            'Compare filter, wrapper and embedded feature selection and apply each inside cross-validation',
            'Explain a model with permutation importance, partial dependence / ICE plots and SHAP values, and state what each does and does not tell you',
          ],
          concepts: [
            'Domain features: dates, cyclic encodings, ratios, aggregates',
            'Target encoding with cross-fitting; smoothing',
            'Filter (univariate), wrapper (RFE), embedded (L1, tree importance) selection',
            'Selection inside CV',
            'Permutation importance; correlated features',
            'Partial dependence and ICE plots',
            'SHAP values: Shapley axioms, TreeSHAP',
            'Interpretation vs causation',
          ],
          explanation: `Models learn from the representation they are given, and on tabular data the representation is usually where the largest gains are. **Feature engineering** encodes domain knowledge: a timestamp becomes hour, weekday, holiday flag and cyclic sine/cosine encodings; two columns become a ratio; a transaction gets the customer's rolling 30-day average (computed strictly from the past); an address becomes distance to the nearest store. Every new feature group should be justified by an **ablation**: fit with and without it, report the difference with its uncertainty.

High-cardinality categoricals (zip codes, product ids) defeat one-hot encoding. **Target encoding** replaces each category by the mean target in that category, which leaks if computed on the same rows the model trains on (a category with one row encodes its own label). Use **cross-fitting**: compute each row's encoding from the other folds, and **smooth** rare categories towards the global mean. Gradient-boosting libraries implement this correctly; doing it by hand is a classic error.

**Feature selection** reduces variance, cost and confusion. **Filters** score features one at a time (mutual information, univariate AUC): fast, blind to interactions. **Wrappers** like recursive feature elimination refit the model repeatedly: accurate, expensive. **Embedded** methods select during training (lasso coefficients, tree importance). All of them must run *inside* cross-validation, or you repeat the selection-leakage experiment from module 1.

**Interpretability** answers what the model uses. **Permutation importance** on held-out data measures the score drop when a feature is shuffled; correlated features share and hide importance. **Partial dependence** plots the average prediction as one feature varies, and **ICE** plots show individual rows, revealing interactions that the average hides. **SHAP** attributes each prediction to features by Shapley values, with an exact fast algorithm for trees; summary plots show global patterns and individual explanations justify single decisions. None of these establishes causation: a model can rely on a proxy, and interpretation shows what it uses, not what matters in the world. Read the Interpretable ML book's chapters and run the explanations on your project model.`,
          resources: [
            {
              title: 'Interpretable Machine Learning (Christoph Molnar) — free online book',
              url: 'https://christophm.github.io/interpretable-ml-book/',
              type: 'textbook',
              cost: 'free',
              provider: 'Christoph Molnar',
              note: 'Chapters on permutation importance, PDP/ICE and SHAP, with their assumptions and failure modes.',
              primary: true,
            },
            {
              title: 'scikit-learn user guide — Feature selection; Permutation feature importance; Partial dependence',
              url: 'https://scikit-learn.org/stable/modules/feature_selection.html',
              type: 'documentation',
              cost: 'free',
              provider: 'scikit-learn',
              note: 'The inspection module docs (permutation_importance, PartialDependenceDisplay) are linked from the same guide.',
            },
            {
              title: 'SHAP documentation',
              url: 'https://shap.readthedocs.io/en/latest/',
              type: 'documentation',
              cost: 'free',
              provider: 'SHAP',
              note: 'TreeExplainer, summary and dependence plots, and the theory section on Shapley values.',
            },
            {
              title: 'Kaggle Learn — Feature Engineering and Machine Learning Explainability courses',
              url: 'https://www.kaggle.com/learn',
              type: 'course',
              cost: 'free',
              provider: 'Kaggle',
              note: 'Short hands-on courses with target encoding and SHAP exercises on real competition data.',
            },
          ],
          exercises: [
            {
              slug: 'feature-ablation',
              title: 'Engineer features and ablate them',
              prompt:
                'On your project dataset (or the bike-sharing data), create at least four feature groups: date/cyclic features, ratios or interactions, aggregates by a categorical key computed on the training fold only, and a target-encoded high-cardinality feature with 5-fold cross-fitting. Report CV score with all groups and with each group removed, with standard deviations. Then show the inflated score when target encoding is computed without cross-fitting.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'selection-methods',
              title: 'Three selection methods inside CV',
              prompt:
                'Add 200 random noise features to Adult. Apply mutual-information filtering (top 20), RFE with logistic regression (to 20), and lasso selection, each inside a Pipeline evaluated by 5-fold CV. Report how many noise features each selects, the CV score, and the time. Then run the filter outside CV and show the optimistic score.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'explain-the-model',
              title: 'Explain your best model',
              prompt:
                'For your project model: compute permutation importance on validation data (with repeats and error bars), plot partial dependence and ICE for the top three features, and compute SHAP values with summary and dependence plots. Find one feature where ICE curves cross (an interaction PDP hides) and one pair of correlated features where permutation importance is misleading. Explain two individual predictions with SHAP and write a plain-language justification for each.',
              kind: 'data-analysis',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does naive target encoding leak and how does cross-fitting fix it?',
              answerOutline:
                'A row\'s own label contributes to its category mean, so the feature encodes the target (badly for rare categories). Cross-fitting computes each row\'s encoding from other folds, excluding its own label.',
            },
            {
              question: 'What does permutation importance measure and when is it misleading?',
              answerOutline:
                'The drop in held-out score when a feature is shuffled, i.e. how much the model relies on it. With correlated features the model can recover the information from the other, so both look unimportant; also it says nothing about causation.',
            },
            {
              question: 'What do SHAP values add over a partial dependence plot?',
              answerOutline:
                'Per-prediction attributions that sum to the prediction minus the baseline, satisfying consistency axioms; they enable local explanations and reveal heterogeneity that PDP averages away.',
            },
          ],
        },
        {
          slug: 'experiment-tracking-and-reproducibility',
          title: 'Reproducibility and experiment tracking',
          summary:
            'Making results you can trust and reproduce: seeds and determinism, environment pinning, data versioning, experiment tracking with MLflow or Weights & Biases, project structure, and testing ML code.',
          estimatedMinutes: 90,
          objectives: [
            'Control randomness (seeds, random_state, sources of nondeterminism) and know what cannot be made deterministic',
            'Pin environments and version data so an experiment from six months ago reruns to the same numbers',
            'Track experiments (parameters, metrics, artefacts, code version) with MLflow or similar and compare runs',
            'Write tests for ML code: data validation, transformer invariants, and a smoke test for the training pipeline',
          ],
          concepts: [
            'Seeds; random_state; nondeterminism from parallelism',
            'Environment pinning: lockfiles, containers',
            'Data versioning (DVC) and dataset hashes',
            'Experiment tracking: runs, params, metrics, artefacts',
            'Project structure: data/raw, data/processed, src, configs',
            'Testing: data schema checks, transformer tests, smoke tests',
            'Reporting: results tables generated from tracked runs',
          ],
          explanation: `A result you cannot reproduce is an anecdote. **Reproducibility** in machine learning is harder than in ordinary software because results depend on data, code, environment and randomness, and any of the four can drift silently.

**Randomness.** Fix the seed of every random source: NumPy, Python's \`random\`, the \`random_state\` of every scikit-learn estimator and splitter, and the framework's generator in deep learning. Even then, parallel algorithms (multi-threaded BLAS, some tree libraries, GPUs) can be nondeterministic at the last decimal; know which parts of your pipeline are, and report results across several seeds rather than relying on one lucky run. Reporting a single seed's number is itself a form of selection bias.

**Environment.** A library upgrade can change a default solver or a tie-breaking rule. Pin exact versions in a lockfile, and for anything that matters build a container image. **Data.** The raw data must be immutable and identified by a hash; derived datasets are regenerated by code from raw. Tools like DVC version large files alongside git and record the pipeline that produced each artefact.

**Tracking.** Every training run should log its parameters, the code commit, the data hash, the metrics per fold, and the artefacts (the fitted pipeline, plots). MLflow and Weights & Biases do this with a few lines and give you a table of every run you ever did, which is also the source for your results tables; writing numbers into a report by hand is how errors enter. Structure the project so that one command reproduces the whole table from raw data.

**Testing.** ML code has bugs that do not crash: a feature computed with the wrong sign, a split that leaks, a label column shifted by one row. Test the data (schema, ranges, no duplicates across splits), test transformers (fit then transform on a tiny frame with known output; transform of train equals the fitted statistics), and keep a smoke test that trains on 1% of the data in under a minute so CI catches breakage. Read the "Hidden Technical Debt" paper for why all this matters at scale, then set up tracking for your project.`,
          resources: [
            {
              title: 'Hidden Technical Debt in Machine Learning Systems (Sculley et al.)',
              url: 'https://papers.nips.cc/paper/2015/hash/86df7dcfd896fcaf2674f757a2463eba-Abstract.html',
              type: 'article',
              cost: 'free',
              provider: 'NeurIPS 2015',
              note: 'The canonical account of how ML systems rot: entanglement, data dependencies, configuration debt.',
              primary: true,
            },
            {
              title: 'MLflow documentation',
              url: 'https://mlflow.org/docs/latest/',
              type: 'documentation',
              cost: 'free',
              provider: 'MLflow',
              note: 'Tracking, model registry and the scikit-learn autologging integration.',
            },
            {
              title: 'DVC documentation — data and pipeline versioning',
              url: 'https://dvc.org/doc',
              type: 'documentation',
              cost: 'free',
              provider: 'DVC',
            },
            {
              title: 'Made With ML — MLOps course',
              url: 'https://madewithml.com/',
              type: 'course',
              cost: 'free',
              provider: 'Goku Mohandas',
              note: 'Project structure, testing data and models, and experiment tracking in a worked example.',
            },
          ],
          exercises: [
            {
              slug: 'seed-sensitivity',
              title: 'How much does the seed matter?',
              prompt:
                'Train your project model with 20 different seeds (affecting the split, the model and any resampling) and report the distribution of the validation metric. Compare its spread with the difference between your two best model families. Then identify any nondeterminism that persists with a fixed seed (run the same seed three times and diff predictions) and track down its source.',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'tracked-experiments',
              title: 'Track every run',
              prompt:
                'Instrument your project training script with MLflow (or W&B): log parameters, per-fold metrics, the git commit, the data hash and the fitted pipeline as an artefact. Run your module-4 bake-off through it, then generate the results table directly from the tracking store with a script. Pin the environment with a lockfile and verify a colleague (or a fresh virtual environment) reproduces one run to the same metrics.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'ml-tests',
              title: 'Write tests for the pipeline',
              prompt:
                'Write tests for: data schema and ranges on load; no duplicate ids across splits; each custom transformer on a 5-row frame with hand-computed expected output; the fitted scaler\'s mean equal to the training mean; and a smoke test training on 1% of the data under one minute. Run them in CI on every commit. Introduce a one-row label shift bug and show which test catches it.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why report results over several seeds rather than one?',
              answerOutline:
                'A single seed\'s score is a draw from a distribution whose spread can exceed differences between models; multiple seeds give the mean and uncertainty and prevent cherry-picking.',
            },
            {
              question: 'What four things must be recorded for a run to be reproducible?',
              answerOutline:
                'Code version (commit), data version (hash), environment (pinned dependencies), and random seeds plus all parameters/configuration.',
            },
            {
              question: 'Give two bugs in ML code that produce no error and how a test would catch each.',
              answerOutline:
                'Label misalignment (test: known tiny dataset yields expected metric); leakage through a transformer fitted on full data (test: fitted statistics equal training-only statistics); duplicates across splits (test: id intersection empty).',
            },
          ],
        },
        {
          slug: 'deployment-monitoring-and-fairness',
          title: 'Deployment, monitoring and fairness',
          summary:
            'Putting a model into service: serialisation and serving, input validation, latency and batch vs online scoring; monitoring for data and concept drift; and assessing fairness across groups with the trade-offs that makes explicit.',
          estimatedMinutes: 110,
          objectives: [
            'Serve a fitted pipeline behind an HTTP endpoint or a batch job with input validation and measured latency',
            'Detect data drift (feature distribution shift) and concept drift (changing relationship) with statistical tests and a monitored proxy metric',
            'Compute group fairness metrics (demographic parity, equalised odds, calibration by group) and explain why they cannot all hold at once',
            'Write a model card documenting intended use, data, metrics by group, and limitations',
          ],
          concepts: [
            'Serialisation; training-serving skew',
            'Batch vs online scoring; latency; input validation',
            'Data drift vs concept drift; PSI, KS tests',
            'Delayed labels; proxy monitoring; retraining triggers',
            'Fairness metrics: demographic parity, equalised odds, calibration by group',
            'Impossibility results; fairness-accuracy trade-offs',
            'Model cards and datasheets',
          ],
          explanation: `A model becomes useful when something calls it, and it becomes dangerous when nobody watches it afterwards.

**Deployment.** The fitted pipeline is serialised (joblib, or ONNX for portability) and loaded by a service: an HTTP endpoint for **online** predictions, or a scheduled **batch** job that scores a table. The main risk is **training-serving skew**: features computed differently in the serving code than in training. Using the same pipeline object for both, and testing that the service reproduces offline predictions on a fixed set of rows, is the defence. Validate inputs (schema, ranges, unknown categories) and reject or flag rather than silently imputing; measure latency at the percentile that matters, not the mean.

**Monitoring.** The world changes. **Data drift** is a shift in the input distribution (new customer segment, a sensor recalibrated): detect it per feature with the population stability index or a Kolmogorov-Smirnov test against the training distribution, and on the model's output distribution. **Concept drift** is a change in the relationship between inputs and target (fraud patterns adapt): only labels reveal it, and labels often arrive late, so monitor proxies (prediction confidence, downstream business metrics) and evaluate on labelled data as it arrives. Decide in advance what triggers retraining and keep the retraining pipeline the same one-command process you built for reproducibility.

**Fairness.** A model that is accurate overall can be systematically worse for a group, especially when training data encode past discrimination. Measure, by group: selection rate (**demographic parity** asks these be equal), false positive and false negative rates (**equalised odds**), and calibration. A well-known impossibility result says calibration by group and equalised error rates cannot all hold when base rates differ, so fairness is a choice to be made explicitly with stakeholders, not a box to tick. Tools like Fairlearn compute the metrics and offer mitigations (reweighting, threshold adjustment by group), each with costs. Document the whole thing in a **model card**: intended use, training data, evaluation by group, known failure modes. The Adult dataset, with its sex and race columns, makes every one of these issues concrete; the exercises use it.`,
          resources: [
            {
              title: 'Fairlearn — documentation and user guide',
              url: 'https://fairlearn.org/',
              type: 'documentation',
              cost: 'free',
              provider: 'Fairlearn',
              note: 'Fairness metrics, mitigation algorithms and the discussion of which notion applies when.',
              primary: true,
            },
            {
              title: 'Model Cards for Model Reporting (Mitchell et al.)',
              url: 'https://arxiv.org/abs/1810.03993',
              type: 'article',
              cost: 'free',
              provider: 'arXiv / FAT* 2019',
              note: 'The template your capstone model card follows.',
            },
            {
              title: 'Rules of Machine Learning: Best Practices for ML Engineering (Google)',
              url: 'https://developers.google.com/machine-learning/guides/rules-of-ml',
              type: 'article',
              cost: 'free',
              provider: 'Google',
              note: 'Forty-three hard-won rules about launching, monitoring and iterating on production models.',
            },
            {
              title: 'Evidently — open-source ML monitoring (drift reports)',
              url: 'https://www.evidentlyai.com/',
              type: 'tool',
              cost: 'freemium',
              provider: 'Evidently AI',
              note: 'The open-source library produces drift and data-quality reports; the cloud service is optional.',
            },
          ],
          exercises: [
            {
              slug: 'serve-the-model',
              title: 'Serve and validate',
              prompt:
                'Wrap your fitted pipeline in a FastAPI (or Flask) endpoint with pydantic input validation. Write a client that sends 1,000 validation rows and checks the responses equal offline predictions exactly. Measure p50 and p99 latency for single-row requests and for batches of 100. Then send a row with an unseen category and a row with an out-of-range value and show the service handles them as designed.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'drift-simulation',
              title: 'Simulate and detect drift',
              prompt:
                'Split Adult by time proxy (or shuffle and split into 10 batches). Introduce data drift in later batches (shift the age distribution; change the encoding of a category) and concept drift (flip the relationship for one subgroup). Compute PSI and KS statistics per feature per batch, monitor the prediction distribution, and plot accuracy per batch as labels arrive. Show which drift each monitor catches and which it misses, and define a retraining trigger.',
              kind: 'simulation',
              difficulty: 3,
            },
            {
              slug: 'fairness-assessment',
              title: 'Fairness assessment and a model card',
              prompt:
                'For your Adult model, compute by sex and by race: selection rate, true positive rate, false positive rate, and calibration curves. Apply two mitigations from Fairlearn (e.g. exponentiated gradient for equalised odds, and threshold optimisation) and report the change in each metric and in overall accuracy. Discuss the impossibility of satisfying all criteria given the base rates. Write a one-page model card.',
              kind: 'data-analysis',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'What is training-serving skew and how do you prevent it?',
              answerOutline:
                'Features computed differently at serving time than in training. Prevent by serving the same fitted pipeline object and by a test that compares service predictions to offline predictions on fixed rows.',
            },
            {
              question: 'Why can concept drift not be detected from inputs alone?',
              answerOutline:
                'Concept drift changes p(y|x) while p(x) may be unchanged; only labelled outcomes (or downstream metrics) reveal it, and labels are often delayed.',
            },
            {
              question: 'Why cannot a classifier be simultaneously calibrated within groups and have equal false positive and false negative rates across groups?',
              answerOutline:
                'When base rates differ between groups, calibration forces different error rates (the impossibility theorem of Chouldechova / Kleinberg et al.); one must choose which criterion to prioritise.',
            },
          ],
        },
      ],
      project: {
        slug: 'production-ready-pipeline',
        title: 'Module project: a production-ready pipeline',
        description:
          'Turn your project model into a reproducible, tested, served and monitored system: a one-command training pipeline with tracked experiments, a serving endpoint with validation, a drift monitor with a simulated shift, a fairness assessment and a model card. This becomes the engineering half of the capstone.',
        deliverables: [
          'Repository with pinned environment, data versioning, experiment tracking and CI running the test suite',
          'Serving endpoint with an equivalence test against offline predictions and a latency report',
          'Drift-monitoring script with a report on a simulated shift and a retraining trigger',
          'Fairness assessment and model card',
        ],
        estimatedHours: 12,
      },
    },
  ],
  capstone: {
    slug: 'end-to-end-ml-project',
    title: 'Capstone: an end-to-end machine learning project on a real dataset',
    description: `Take a real dataset with a question that matters (from Kaggle, UCI, OpenML, a government open-data portal or your own domain; at least 10,000 rows or a non-trivial text/tabular mix) and carry it from raw data to a defensible, reproducible, deployable model, documenting every decision.

The project must include: a written problem frame with a loss that matches the real cost of errors; EDA with a leakage audit; a validation protocol appropriate to the data's structure (grouped or time-aware if needed); baselines; at least four model families compared under identical CV (a linear model, a tree ensemble, a kernel or neighbour method, and one of your choice) with hyperparameters tuned honestly; calibration and an operating point chosen from costs; an ablation table over feature groups and pipeline components; an error analysis with at least one executed intervention; a fairness check across at least one sensitive attribute; a packaged pipeline with a serving endpoint or batch script; and a monitoring plan with drift checks. A final held-out test set is evaluated exactly once and reported with a confidence interval.

Write it up as an 8-12 page report with the structure of a good applied-ML paper (problem, data, methods, experiments, analysis, limitations, ethics) and a model card. The code must regenerate every number and figure from the raw data with one command.`,
    deliverables: [
      'A repository with a one-command pipeline from raw data to report figures, pinned dependencies and fixed seeds',
      'The results table with baselines, all model families, confidence intervals and the single test-set evaluation',
      'An ablation table and an error-analysis section with an executed intervention',
      'A fairness assessment and a model card',
      'A serving endpoint or batch-scoring script with input validation and a drift-monitoring script with a report on a simulated shift',
      'An 8-12 page written report',
    ],
    estimatedHours: 40,
    stretchGoals: [
      'Add a conformal prediction layer giving calibrated prediction intervals or sets and validate their coverage',
      'Implement the winning model family from scratch in NumPy and match the library within 1% of the metric',
      'Run a cost-benefit analysis translating the model\'s metrics into expected value under the stated costs',
    ],
  },
  masteryChecklist: [
    'I can frame a real problem as a learning task with a loss that reflects the real cost of errors, and I can say what would make the model not worth deploying',
    'I can design a validation protocol for i.i.d., grouped and temporal data and explain why each alternative would leak',
    'I can derive and implement linear and logistic regression, ridge and lasso from first principles and explain regularization as a prior',
    'I can choose and compute the right classification metrics, read ROC and PR curves, calibrate probabilities and set a cost-based threshold',
    'I can explain how decision trees, random forests and gradient boosting work and tune them for a new tabular dataset',
    'I can derive the SVM dual and explain the kernel trick, and apply kernel methods appropriately',
    'I can implement k-means, EM for Gaussian mixtures and PCA, and interpret their outputs with their failure modes in mind',
    'I can explain SGD, convexity, KKT conditions and the bias-variance decomposition, and connect them to practical training decisions',
    'I can build a leak-free scikit-learn pipeline, track experiments reproducibly, deploy a model and monitor it for drift and fairness',
    'I have completed an end-to-end project on a real dataset with ablations, error analysis and a written report',
  ],
});
