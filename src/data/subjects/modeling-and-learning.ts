import { defineSubject } from '../define';

export default defineSubject({
  id: 'modeling-and-learning',
  title: 'Modeling and Learning in Data Science',
  category: 'data-science',
  tagline:
    'Applied machine learning in Python: fit models with scikit-learn and PyTorch, validate them honestly, and say what the results do and do not mean.',
  description: `This is the applied machine learning course in the data science track. You frame a question, fit linear models, trees, ensembles, support vector machines, clustering methods and small neural networks with standard Python libraries, and then do the part that decides whether any of it was useful: check the model against a baseline, validate it without leakage, and interpret what comes out. Derivations and theory live in the Machine Learning and Deep Learning courses, and this course points to them when you want the proofs.

The course follows the topics of the University of Illinois course CS 307, based on its public catalog description. It is an original course written for this site and is not affiliated with or endorsed by the University of Illinois. Nothing here is copied from Illinois course materials.

Heavy weight goes on applying models in Python and interpreting the results correctly, including what a model cannot tell you. A coefficient is not a cause, a cluster is not a discovery, an accuracy score on a rare outcome can be meaningless, and a SHAP value does not say what would happen if you changed something. Every lesson has exercises that end with a sentence on what the result does and does not show, because that sentence is the skill being trained.

The seven modules move from linear models and model selection through classification, non-linear models and unsupervised learning to deep learning on a laptop CPU, and end with interpretability and reporting. Two machine problems and a final project close the course, and they give you complete analyses you can show to someone.`,
  difficulty: 'intermediate',
  estimatedHours: 90,
  prerequisites: ['data-science-exploration', 'linear-algebra-for-data-science'],
  recommendedBackground: [
    'Comfortable with Python, pandas and plotting',
    'Exploratory data analysis and basic statistical inference',
    'Vectors, matrices and the idea of a projection',
  ],
  tags: ['machine learning', 'python', 'interpretability', 'scikit-learn', 'pytorch', 'applied modeling'],
  core: false,
  modules: [
    {
      slug: 'modeling-and-linear-models',
      title: 'Modeling and Linear Models',
      description:
        'How to turn a question into a target, an audience and a test, then the linear model as a practical tool: log targets, encoded categories, basis features, baselines and residuals.',
      lessons: [
        {
          slug: 'the-modeling-workflow',
          title: 'The modeling workflow',
          summary:
            'A model answers a question for someone. Fix the target, the audience and the test before you fit anything, and keep the test rows out of your decisions.',
          estimatedMinutes: 75,
          objectives: [
            'Turn a vague question into a target, a unit of analysis and an audience',
            'Say what information is available at the moment a prediction is made',
            'Split data into training and test sets and explain why',
            'Fit and score a first model in scikit-learn',
            'Explain why one test score is an estimate with noise in it',
          ],
          concepts: [
            'Target and features',
            'Unit of analysis',
            'Audience and decision',
            'Prediction versus explanation',
            'Train/test split',
            'Fit, predict, score',
            'Test set discipline',
            'Sampling noise in a test score',
          ],
          explanation: `Most failed models fail before any code runs, because nobody fixed what they were for. Before you open a notebook, write down four things. The **target**: the exact column you will predict, in what units. The **unit of analysis**: one row is what, a house, a patient, an hour? The **audience**: who acts on the output, and what would they do differently? The **moment of prediction**: what is actually known at that time?

Be clear whether you want a good **prediction** or an **explanation**. They are different jobs. A model can predict well without saying anything about why, and this course returns to that gap repeatedly.

The basic discipline is to hold back a **test set** that plays no part in your decisions, because a model is judged on rows it has not seen.

\`\`\`python
from sklearn.datasets import fetch_california_housing
from sklearn.linear_model import LinearRegression
from sklearn.metrics import root_mean_squared_error
from sklearn.model_selection import train_test_split

X, y = fetch_california_housing(return_X_y=True, as_frame=True)
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=0)
model = LinearRegression().fit(X_train, y_train)
print(root_mean_squared_error(y_test, model.predict(X_test)))
\`\`\`

Every scikit-learn estimator follows this \`fit\`, \`predict\` shape, so what you learn here carries over to everything later.

Two pitfalls. If you look at the test score, change something and look again, the test set has quietly become training data. And one split is one random draw, so its score carries noise. Module 2 replaces this basic split with something stronger.

Read ISLP Chapter 2 for the vocabulary, then use the MLU-Explain page to fix the picture of the splits.`,
          resources: [
            { title: 'An Introduction to Statistical Learning (ISLP)', url: 'https://www.statlearning.com/', type: 'textbook', cost: 'free', provider: 'James, Witten, Hastie, Tibshirani, Taylor', note: 'Free PDF, Python edition. Read Chapter 2. This book is the main reference for Modules 1 to 5.', primary: true },
            { title: 'The Importance of Data Splitting', url: 'https://mlu-explain.github.io/train-test-validation/', type: 'interactive', cost: 'free', provider: 'MLU-Explain', note: 'A short visual explanation of training, validation and test sets.' },
            { title: 'Real world datasets', url: 'https://scikit-learn.org/stable/datasets/real_world.html', type: 'documentation', cost: 'free', provider: 'scikit-learn', note: 'What is in the California housing data, used often in this course.' },
          ],
          exercises: [
            {
              slug: 'frame-california',
              title: 'Frame the California housing question',
              prompt:
                "Load `fetch_california_housing(as_frame=True)` and read its `DESCR`. Write a short brief: what one row is, what the target measures and in what units, one realistic audience, and the decision they would make. Then compute the share of rows at the maximum target value, plot a histogram of the target, and fit the linear model from the lesson. Report test RMSE and what it means in the target's units. State what this result shows about predicting a block group's median value, and what it does not show about any single house.",
              kind: 'data-analysis',
              difficulty: 1,
              hint: 'The target is capped. Think about what that does to the most expensive areas.',
            },
            {
              slug: 'split-spread',
              title: 'How much does one split matter?',
              prompt:
                'Using `load_diabetes`, repeat an 80/20 split and a `LinearRegression` fit for 30 values of `random_state`. Report the minimum, median and maximum test $R^2$ and plot them. Write two sentences on what this spread says about quoting a single test score, and why it does not tell you how the model would do on a different population of patients.',
              kind: 'simulation',
              difficulty: 1,
            },
            {
              slug: 'three-framings',
              title: 'One dataset, three questions',
              prompt:
                "Load hourly bike rentals with `fetch_openml('Bike_Sharing_Demand', version=2, as_frame=True, parser='liac-arff')`. Write three different framings of a modeling task, for three audiences: a rebalancing crew, a city planner, and a finance team. For each give the target, the unit of analysis, the prediction horizon, and which columns would not be known at prediction time. No fitting is needed. Say which framing is explanatory rather than predictive, and what a good score could not establish for that framing.",
              kind: 'writing',
              difficulty: 2,
              hint: 'Weather columns describe the hour itself. Would you have them a day ahead?',
            },
          ],
          selfAssessment: [
            {
              question: 'What four things should you write down before fitting a model?',
              answerOutline: 'The target with its units, the unit of analysis, the audience and their decision, and what is known at the moment of prediction.',
            },
            {
              question: 'Why does repeatedly checking the test score ruin it?',
              answerOutline: 'Your choices start to depend on those rows, so they act as training data and the score becomes optimistic.',
            },
            {
              question: 'Can a model predict well and still fail to explain?',
              answerOutline: 'Yes. Prediction needs only stable association. Explanation needs an argument about mechanism or cause, which a score cannot provide.',
            },
          ],
          relatedLessons: ['machine-learning/foundations-and-workflow/generalization-and-validation'],
        },
        {
          slug: 'linear-regression-as-a-model',
          title: 'Linear regression as a model',
          summary:
            'Fit and read a linear model as a practical tool: what a coefficient says, what holding others fixed really means, and how a log target turns coefficients into percent changes.',
          estimatedMinutes: 90,
          objectives: [
            'Fit a multiple linear regression and read its coefficients with units',
            'Explain what "holding the other features fixed" does and does not mean',
            'Fit a model on a log target and read coefficients as percent changes',
            'Convert predictions back from the log scale and explain what they estimate',
            'Say when a coefficient should not be read as an effect',
          ],
          concepts: [
            'Coefficient and intercept',
            'Units of a coefficient',
            'Conditional association',
            'Log-transformed target',
            'Percent change reading of a coefficient',
            'Back-transformation and the median',
            'Smearing correction',
            'Coefficient change when a feature is added',
          ],
          explanation: `A linear regression predicts with a weighted sum:

$$\\hat{y} = \\beta_0 + \\beta_1 x_1 + \\dots + \\beta_p x_p$$

The fitting is least squares, and the \`machine-learning\` course derives it. Your job here is reading the output. Each coefficient has units: target units per feature unit. It says how the prediction changes when that one feature rises by 1 and the other features in the model stay fixed.

That last phrase is about the arithmetic of the model, not about the world. Nobody ran an experiment. If two features move together, the data contain little information about changing one alone. Add a correlated feature and an existing coefficient can shrink or even flip, which shows that a coefficient depends on the company it keeps.

Skewed, positive targets such as prices are usually better modeled on a **log scale**, where effects multiply. If you fit $\\log y$, a coefficient $b$ means the prediction is multiplied by $e^{b}$ per unit of the feature. That is a change of $100(e^{b} - 1)$ percent, close to $100b$ percent when $b$ is small.

\`\`\`python
import numpy as np
from sklearn.datasets import fetch_openml
from sklearn.linear_model import LinearRegression

ames = fetch_openml('house_prices', as_frame=True, parser='liac-arff').frame
cols = ['GrLivArea', 'OverallQual', 'YearBuilt']
model = LinearRegression().fit(ames[cols], np.log(ames['SalePrice']))
print(dict(zip(cols, 100 * (np.exp(model.coef_) - 1))))
\`\`\`

A pitfall: $e^{\\hat{y}}$ estimates something closer to a median than a mean, so totals can drift. A smearing factor, the mean of $e^{r}$ over training residuals $r$, is the usual correction.

Read ISLP Sections 3.1 to 3.3 for the applied reading of coefficients. Skip the standard-error algebra if it has been covered in your statistics course.`,
          resources: [
            { title: 'ISLP, Chapter 3: Linear Regression', url: 'https://www.statlearning.com/', type: 'textbook', cost: 'free', provider: 'James, Witten, Hastie, Tibshirani, Taylor', note: 'Sections 3.1 to 3.3, read for interpretation.', primary: true },
            { title: 'Linear Regression', url: 'https://mlu-explain.github.io/linear-regression/', type: 'interactive', cost: 'free', provider: 'MLU-Explain', note: 'Drag the points and watch the fit and the residuals respond.' },
            { title: 'Effect of transforming the targets', url: 'https://scikit-learn.org/stable/auto_examples/compose/plot_transformed_target.html', type: 'documentation', cost: 'free', provider: 'scikit-learn', note: 'Shows TransformedTargetRegressor, which handles the log and the inverse for you.' },
          ],
          exercises: [
            {
              slug: 'ames-log-target',
              title: 'Percent changes on Ames house prices',
              prompt:
                'Using the Ames data from the lesson, split 75/25 and fit two models on `GrLivArea`, `OverallQual` and `YearBuilt`: one on `SalePrice` and one on its log. Report each coefficient with units, and for the log model the percent change per unit. Plot residuals against prediction for both and say which has the more even spread. Then state what the `OverallQual` coefficient shows, and why it does not tell a homeowner what a renovation would add to their sale price.',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'holding-fixed',
              title: 'Watch a coefficient change',
              prompt:
                'On California housing, regress the target on `AveRooms` alone, then on `AveRooms` and `AveBedrms` together, then on all eight features. Record the `AveRooms` coefficient each time, along with the correlation between the two room columns. Explain in plain language what question each coefficient answers. Say why none of them tells you what adding a room to homes in an area would do to its value.',
              kind: 'data-analysis',
              difficulty: 2,
              hint: 'With bedrooms held fixed, more rooms means more non-bedroom rooms, which is a different comparison.',
            },
            {
              slug: 'back-transform',
              title: 'Back-transforming a log prediction',
              prompt:
                'For your Ames log model, compute three numbers on the test set: the mean actual price, the mean of plain $e^{\\hat{y}}$, and the mean of $e^{\\hat{y}}$ multiplied by the smearing factor estimated from training residuals. Then compare test RMSE in price units with the raw-target model. Report all of it. Say which model you would give someone who needs the total value of a portfolio, which you would give someone comparing cheap houses, and what one split cannot settle about that choice.',
              kind: 'data-analysis',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'In a log-target model, what does a coefficient of 0.10 mean?',
              answerOutline: 'Each unit of the feature multiplies the prediction by $e^{0.10}$, about a 10.5 percent increase, holding the other features fixed.',
            },
            {
              question: 'Why can a coefficient change sign when you add a feature?',
              answerOutline: 'Each coefficient is conditional on the other features. Adding a correlated feature changes which comparison the coefficient describes.',
            },
            {
              question: 'What does a back-transformed log prediction estimate?',
              answerOutline: 'Roughly the conditional median rather than the mean, so it tends to run low for totals unless a smearing correction is applied.',
            },
          ],
          relatedLessons: ['machine-learning/linear-models/linear-regression-and-least-squares'],
        },
        {
          slug: 'feature-engineering',
          title: 'Feature engineering',
          summary:
            'A linear model is linear in its features, not in your columns. One-hot encoding, rare-category grouping, spline bases and interactions let it fit far more than a straight line.',
          estimatedMinutes: 100,
          objectives: [
            'One-hot encode a category and read coefficients against a reference level',
            'Group rare categories and explain the trade-off',
            'Add spline or polynomial basis features for a curved relationship',
            'Add an interaction and read what it means',
            'Explain why splines are usually safer than high-degree polynomials',
          ],
          concepts: [
            'One-hot encoding',
            'Reference level and collinearity',
            'Rare-category grouping (min_frequency)',
            'Unseen categories at prediction time',
            'Polynomial basis features',
            'Spline basis features and knots',
            'Interaction terms',
            'Extrapolation at the edges',
          ],
          explanation: `"Linear" means linear in the features you hand the model, so you can feed it transformed columns and fit curves.

**One-hot encoding** gives each category its own 0/1 column. With an intercept, one level must be dropped, or the columns add up to the intercept column and the coefficients stop being identifiable. The dropped level is the **reference**, and every other coefficient is a difference from it. Change the reference and the numbers change while the predictions do not.

**Rare categories** have few rows, so their coefficients are noisy. Grouping them into one "other" level trades detail for stability, and it also gives a home to categories first seen at prediction time.

\`\`\`python
import pandas as pd
from sklearn.preprocessing import OneHotEncoder

df = pd.DataFrame({'area': ['A'] * 50 + ['B'] * 40 + ['C'] * 3 + ['D'] * 2})
enc = OneHotEncoder(min_frequency=10, sparse_output=False).fit(df)
print(enc.get_feature_names_out())
\`\`\`

**Basis features** handle curves. \`PolynomialFeatures\` adds powers, but high powers swing wildly at the edges of the data. \`SplineTransformer\` joins low-degree pieces at knots, so behaviour stays local. Far outside the training range, both are guesses.

An **interaction** is a product of features, $x_1 x_2$, so the slope of one depends on the other. Bike rentals peak at commuting hours on working days and not at weekends, and no sum of separate hour and day effects can express that.

More features help only if they survive validation, which Module 2 makes rigorous. Pitfall: feature engineering can only use what the model would know at prediction time.

Read ISLP Chapter 7 through Section 7.4, then look at how the scikit-learn cyclical-features example combines splines and interactions.`,
          resources: [
            { title: 'ISLP, Chapter 7: Moving Beyond Linearity', url: 'https://www.statlearning.com/', type: 'textbook', cost: 'free', provider: 'James, Witten, Hastie, Tibshirani, Taylor', note: 'Polynomials and splines, Sections 7.1 to 7.4.', primary: true },
            { title: 'Preprocessing data', url: 'https://scikit-learn.org/stable/modules/preprocessing.html', type: 'documentation', cost: 'free', provider: 'scikit-learn', note: 'Sections on categorical features and on generating polynomial and spline features.' },
            { title: 'Time-related feature engineering', url: 'https://scikit-learn.org/stable/auto_examples/applications/plot_cyclical_feature_engineering.html', type: 'documentation', cost: 'free', provider: 'scikit-learn', note: 'One-hot, spline and interaction features compared on bike demand.' },
          ],
          exercises: [
            {
              slug: 'ames-neighbourhoods',
              title: 'Reference levels and rare neighbourhoods',
              prompt:
                "On Ames, predict log `SalePrice` from `GrLivArea`, `OverallQual`, `YearBuilt` and `Neighborhood`. Use `make_column_transformer` (Module 2 explains it fully) with `OneHotEncoder(drop='first')`, and report which level is the reference and the three largest neighbourhood coefficients as percent differences from it. Refit with a different reference and confirm the predictions match. Count rows per neighbourhood, then refit with `min_frequency=20` and compare 5-fold RMSE on the log scale. Say what grouping costs you, and why a neighbourhood coefficient is not the value of the location itself.",
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'hour-splines',
              title: 'Curves and interactions in bike demand',
              prompt:
                "Load `Bike_Sharing_Demand` as in the first lesson. Take the first 75 percent of rows in time order for training and the rest for testing. Fit `Ridge` models for `count` with: (a) `hour` as a number, (b) `hour` one-hot encoded, (c) `hour` through `SplineTransformer`, and (d) one-hot `hour` crossed with `workingday`. Report test RMSE for each and plot predicted demand by hour for working and non-working days from (d). Say what the interaction reveals about demand, and what it does not show about why people ride.",
              kind: 'data-analysis',
              difficulty: 2,
              hint: 'For (d), join `hour` and `workingday` into one text column and one-hot encode that. In this file `workingday` is a category holding the strings True and False.',
            },
          ],
          selfAssessment: [
            {
              question: 'Why drop one level in one-hot encoding when the model has an intercept?',
              answerOutline: 'The dummies would sum to the intercept column, so coefficients are not identifiable. The dropped level becomes the reference for the others.',
            },
            {
              question: 'Why prefer splines to a degree-10 polynomial?',
              answerOutline: 'Polynomials are global and swing at the edges, while splines fit local low-degree pieces and stay better behaved.',
            },
            {
              question: 'What does an interaction between hour and working day mean?',
              answerOutline: 'The effect of hour on demand differs by day type, so the daily shape is allowed to change.',
            },
          ],
          relatedLessons: [
            'machine-learning/linear-models/basis-expansions-and-glms',
            'machine-learning/ml-engineering/feature-engineering-and-selection',
          ],
        },
        {
          slug: 'baselines-and-residuals',
          title: 'Baselines and residuals',
          summary:
            'A score means nothing without a baseline. Compare RMSE, MAE and R-squared against simple rules, including persistence, and treat residuals as a useful product that still has limits.',
          estimatedMinutes: 95,
          objectives: [
            'Compute RMSE, MAE and R-squared and say what each hides',
            'Build mean, group-mean and persistence baselines',
            'Read residual plots for patterns the model missed',
            'Use residuals as a ranked list for human review',
            'State what a residual cannot tell you',
          ],
          concepts: [
            'RMSE and its sensitivity to large errors',
            'MAE and median-seeking',
            'R-squared as comparison with the mean',
            'Mean and group-mean baselines',
            'Persistence baseline',
            'Residual plots',
            'Residuals by subgroup or location',
            'Residuals as a product',
            'What a residual cannot say',
          ],
          explanation: `**RMSE** squares errors, so a few large misses dominate it. **MAE** treats all errors evenly and hides how bad the worst ones are. **$R^2$** compares the model with predicting the mean, $1 - \\text{SSE}/\\text{SST}$, so it is unitless, it depends on how spread out this target happens to be, and it can be negative on test data. None of them tells you where the errors fall.

So always build a **baseline** first. The mean of the training target is the floor. A group mean, such as the average for each hour, is often hard to beat and takes one line.

\`\`\`python
from sklearn.datasets import fetch_california_housing
from sklearn.dummy import DummyRegressor
from sklearn.metrics import root_mean_squared_error
from sklearn.model_selection import train_test_split

X, y = fetch_california_housing(return_X_y=True, as_frame=True)
X_tr, X_te, y_tr, y_te = train_test_split(X, y, random_state=0)
mean = DummyRegressor().fit(X_tr, y_tr)
print(root_mean_squared_error(y_te, mean.predict(X_te)))
area = y_tr.groupby(X_tr['Latitude'].round()).mean()
group = X_te['Latitude'].round().map(area).fillna(y_tr.mean())
print(root_mean_squared_error(y_te, group))
\`\`\`

For data ordered in time, use **persistence**: predict the value from the previous period, such as this hour yesterday. It can beat a model with many features, and if it does, your features are adding little.

**Residuals**, actual minus predicted, show what the model missed. Plot them against predictions and against features, and map them when you have locations. A funnel, a curve or a regional cluster is a to-do list.

Residuals are also useful in themselves, because they rank cases for a person to examine: which properties or hours are furthest from expectation? But a residual only measures distance from this model. It cannot say the case is mispriced, wrong or exceptional, since a missing feature gives the same pattern.

Work through the residual section of ISLP Section 3.3.3 with your own plots.`,
          resources: [
            { title: 'ISLP, Section 3.3.3: Potential Problems', url: 'https://www.statlearning.com/', type: 'textbook', cost: 'free', provider: 'James, Witten, Hastie, Tibshirani, Taylor', note: 'What residual plots reveal: non-linearity, unequal variance, outliers.', primary: true },
            { title: 'Metrics and scoring', url: 'https://scikit-learn.org/stable/modules/model_evaluation.html', type: 'documentation', cost: 'free', provider: 'scikit-learn', note: 'Read the section on regression metrics.' },
            { title: 'DummyRegressor', url: 'https://scikit-learn.org/stable/modules/generated/sklearn.dummy.DummyRegressor.html', type: 'documentation', cost: 'free', provider: 'scikit-learn', note: 'The mean, median and quantile baselines.' },
          ],
          exercises: [
            {
              slug: 'california-baselines',
              title: 'A baseline table and a residual map',
              prompt:
                'On California housing, make a table of RMSE, MAE and $R^2$ on one test set for the mean baseline, the rounded-latitude group mean from the lesson, and `LinearRegression`. Plot residuals against predictions, and scatter the residuals by `Longitude` and `Latitude`, coloured by sign. Describe two patterns, and explain the straight diagonal edge in the residual plot. Say what the map suggests is missing from the model, and why it does not prove that location itself causes high prices.',
              kind: 'data-analysis',
              difficulty: 2,
              hint: 'The diagonal edge comes from the capped target: at the cap, the residual is the cap minus the prediction.',
            },
            {
              slug: 'residual-review-list',
              title: 'Residuals as a review list',
              prompt:
                'Fit your log-price Ames model with out-of-fold predictions from `cross_val_predict`. List the 10 most under-predicted and 10 most over-predicted houses with their key columns, and look at `SaleCondition` and `OverallCond` for these rows. Write a note to a hypothetical assessor saying how to use this list. It must state what these residuals suggest, and why they do not show that a house was mis-sold or a bargain.',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'bike-persistence',
              title: 'Can you beat persistence?',
              prompt:
                "With `Bike_Sharing_Demand` in time order, use the last 25 percent of rows as the test set. Score these on RMSE and MAE: the training mean, the training mean per hour, persistence from 1 hour ago, 24 hours ago and 168 hours ago (use `shift`), and a `Ridge` model on one-hot calendar and weather features. Rank them. Say which forecast horizon each persistence baseline could serve, and why the ranking does not show that history causes demand, or that a 1-hour-ago baseline could plan next week's staffing.",
              kind: 'data-analysis',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What does each of RMSE, MAE and R-squared hide?',
              answerOutline: 'RMSE is driven by a few large errors. MAE hides how bad the worst errors are. R-squared depends on target spread and has no units. All hide where errors fall.',
            },
            {
              question: 'What is a persistence baseline and when does it matter?',
              answerOutline: 'Predicting the latest or same-period past value. It matters for time-ordered targets, and it only works at horizons where that value is known.',
            },
            {
              question: 'A house has a large positive residual. What can you conclude, and what can you not?',
              answerOutline: 'It sold above what this model expected, so it merits review. It may reflect a missing feature, so it does not prove overpricing or error.',
            },
          ],
          relatedLessons: ['machine-learning/foundations-and-workflow/baselines-and-nearest-neighbours'],
        },
      ],
    },
    {
      slug: 'model-selection',
      title: 'Model Selection',
      description:
        'How to choose a model without fooling yourself: bias and variance as a picture, cross-validation that respects your data, regularisation, and pipelines that stop leakage.',
      lessons: [
        {
          slug: 'bias-and-variance',
          title: 'Bias and variance',
          summary:
            'Too simple misses the pattern and too flexible memorises noise. Learning curves and validation curves show which problem you have and what would help.',
          estimatedMinutes: 80,
          objectives: [
            'Describe bias and variance as a picture, without the derivation',
            'Plot and read a validation curve',
            'Plot and read a learning curve',
            'Decide from the curves whether more data or more flexibility would help',
          ],
          concepts: [
            'Underfitting and bias',
            'Overfitting and variance',
            'Model flexibility',
            'Validation curve',
            'Learning curve',
            'Gap between training and validation error',
            'Irreducible noise',
          ],
          explanation: `Picture fitting a model to many different samples from the same population. A very rigid model gives nearly the same answer each time, and that answer is consistently off, which is **bias**. A very flexible model follows each sample's noise, so its answers scatter widely, which is **variance**. Good models sit between. The derivation of this trade-off is in the \`machine-learning\` course; here you need to diagnose it from plots.

A **validation curve** varies one complexity setting and plots training and validation error against it.

\`\`\`python
from sklearn.datasets import fetch_california_housing
from sklearn.linear_model import Ridge
from sklearn.model_selection import KFold, validation_curve
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import PolynomialFeatures, StandardScaler

X, y = fetch_california_housing(return_X_y=True, as_frame=True)
X = X[['MedInc', 'AveRooms', 'Latitude', 'Longitude']].sample(5000, random_state=0)
pipe = make_pipeline(StandardScaler(), PolynomialFeatures(include_bias=False), Ridge(1e-3))
train, valid = validation_curve(
    pipe, X, y.loc[X.index], param_name='polynomialfeatures__degree',
    param_range=[1, 2, 3, 4, 5, 6], cv=KFold(5, shuffle=True, random_state=0),
    scoring='neg_root_mean_squared_error')
print(-train.mean(axis=1), -valid.mean(axis=1))
\`\`\`

Training error keeps falling with flexibility while validation error falls and then rises, sometimes sharply. Trust the validation curve.

A **learning curve** varies the amount of training data with the model fixed. If training and validation errors have converged at a high value, more rows will not help and you need a richer model. If a wide gap remains, more data or simpler settings should help.

Both errors bottom out above zero because of **irreducible noise**: the features do not determine the target. No model removes that.

Pitfall: choosing the complexity by the validation curve spends that data, so the chosen score is slightly optimistic.

Read ISLP Section 2.2.2 for the picture, and try the MLU-Explain page.`,
          resources: [
            { title: 'ISLP, Section 2.2: Assessing Model Accuracy', url: 'https://www.statlearning.com/', type: 'textbook', cost: 'free', provider: 'James, Witten, Hastie, Tibshirani, Taylor', note: 'The bias-variance picture without heavy derivation.', primary: true },
            { title: 'The Bias Variance Tradeoff', url: 'https://mlu-explain.github.io/bias-variance/', type: 'interactive', cost: 'free', provider: 'MLU-Explain', note: 'Interactive plots of flexibility against error.' },
            { title: 'Validation curves and learning curves', url: 'https://scikit-learn.org/stable/modules/learning_curve.html', type: 'documentation', cost: 'free', provider: 'scikit-learn', note: 'How to compute and read both curves.' },
          ],
          exercises: [
            {
              slug: 'wiggle-picture',
              title: 'Draw bias and variance',
              prompt:
                'Simulate $y = \\sin(2x) + \\varepsilon$ with $x$ uniform on $[0, 3]$ and noise standard deviation 0.3. Draw 30 samples of 30 points and fit polynomial degrees 1, 4 and 15 to each. Plot all 30 curves on one panel per degree, with the true curve on top. Describe bias and variance from the picture alone. Say what this shows about this simulated function, and why you could not draw this picture for real data, where you only have one sample.',
              kind: 'simulation',
              difficulty: 1,
            },
            {
              slug: 'read-the-curves',
              title: 'Diagnose from curves',
              prompt:
                'Run the validation curve from the lesson and report the degree with the lowest validation RMSE. Then plot a `learning_curve` for the degree 1 and degree 3 versions of that pipeline with `train_sizes=[0.1, 0.3, 0.6, 1.0]`. For each, state whether more rows would help. Investigate why validation error explodes at high degree by looking at the largest values of `AveRooms`. Say what the curves show about these models, and why they do not tell you how much noise is truly irreducible.',
              kind: 'data-analysis',
              difficulty: 2,
              hint: 'Standardising does not protect a high power of an extreme value.',
            },
          ],
          selfAssessment: [
            {
              question: 'What does a large gap between training and validation error suggest?',
              answerOutline: 'Overfitting or high variance. More data, regularisation or a simpler model may help.',
            },
            {
              question: 'Training and validation error have converged at a high value. Will more rows help?',
              answerOutline: 'Not much. The model is too rigid or the features lack information. Try richer features or models.',
            },
            {
              question: 'Why does validation error not reach zero even for the best model?',
              answerOutline: 'Irreducible noise: the features do not fully determine the target, and there may also be measurement error.',
            },
          ],
          relatedLessons: ['machine-learning/optimization-and-generalization-theory/bias-variance-and-learning-theory'],
        },
        {
          slug: 'cross-validation',
          title: 'Cross-validation',
          summary:
            'K-fold makes better use of data, but the folds must mimic how the model will really be used. Group repeated entities, respect time order, and score the final holdout once.',
          estimatedMinutes: 95,
          objectives: [
            'Run k-fold cross-validation and report a mean and a spread',
            'Use GroupKFold when entities repeat',
            'Use time-based splits for ordered data',
            'Design a selection procedure ending in one holdout score',
            'Explain why the right split depends on deployment',
          ],
          concepts: [
            'K-fold cross-validation',
            'Spread across folds',
            'GroupKFold',
            'Repeated entities',
            'TimeSeriesSplit',
            'Holdout scored once',
            'Selection optimism',
            'Matching validation to deployment',
          ],
          explanation: `**K-fold** cross-validation splits the data into $k$ parts, trains on $k-1$ and scores on the remainder, and rotates. Every row is scored once, and you get a mean and a spread across folds. Report both.

The key question is whether the split resembles deployment. Random folds assume new rows look like exchangeable draws from the same pool, and often they do not.

**Repeated entities.** If the same patient, house or region has rows on both sides, the model can recognise it, and the score describes a situation you will not face with new entities. \`GroupKFold\` keeps each group on one side.

\`\`\`python
from sklearn.compose import make_column_transformer
from sklearn.datasets import fetch_california_housing
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import GroupKFold, KFold, cross_val_score
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import SplineTransformer

X, y = fetch_california_housing(return_X_y=True, as_frame=True)
spatial = make_column_transformer(
    (SplineTransformer(n_knots=8), ['Latitude', 'Longitude', 'MedInc']),
    remainder='passthrough')
model = make_pipeline(spatial, LinearRegression())
blocks = X['Latitude'].round().astype(str) + X['Longitude'].round().astype(str)
rmse = 'neg_root_mean_squared_error'
print(cross_val_score(model, X, y, scoring=rmse,
                      cv=KFold(5, shuffle=True, random_state=0)).mean())
print(cross_val_score(model, X, y, scoring=rmse, cv=GroupKFold(5),
                      groups=blocks).mean())
\`\`\`

**Time.** A forecast is trained on the past and used on the future. \`TimeSeriesSplit\` always validates on later rows. Random folds let the model train on the days around each test row.

**The holdout.** Comparing many models by cross-validation makes the winning score optimistic, because you picked the luckiest. So keep a final **holdout** untouched, choose everything by cross-validation on the rest, then score the holdout once and report that number, whatever it is.

Pitfall: a flexible model may lose more from grouping than a rigid one, so a comparison can reverse under the honest split.

Read ISLP Section 5.1, then study the scikit-learn plot of splitters.`,
          resources: [
            { title: 'ISLP, Section 5.1: Cross-Validation', url: 'https://www.statlearning.com/', type: 'textbook', cost: 'free', provider: 'James, Witten, Hastie, Tibshirani, Taylor', primary: true },
            { title: 'Cross-validation: evaluating estimator performance', url: 'https://scikit-learn.org/stable/modules/cross_validation.html', type: 'documentation', cost: 'free', provider: 'scikit-learn', note: 'Read the sections on grouped and time series data.' },
            { title: 'Visualizing cross-validation behavior', url: 'https://scikit-learn.org/stable/auto_examples/model_selection/plot_cv_indices.html', type: 'documentation', cost: 'free', provider: 'scikit-learn', note: 'One picture of which rows each splitter uses.' },
          ],
          exercises: [
            {
              slug: 'grouped-california',
              title: 'Random folds against geographic folds',
              prompt:
                'Run the lesson code for `LinearRegression` on the raw features and for the spline pipeline, using `KFold` and `GroupKFold` on 1-degree geographic blocks. Report mean and standard deviation of RMSE for all four combinations in a table. Which model gains from random folds, and which estimate would you quote for predicting a part of the state with no training data? Say what grouped folds show, and what they cannot show about a different state or year.',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'time-split-bikes',
              title: 'Time order on bike demand',
              prompt:
                'Using `Bike_Sharing_Demand`, add a column `lag24` with `shift(24)` and drop the missing rows. Score a `Ridge` pipeline on one-hot `hour`, `weekday` and `weather` plus scaled `temp`, `humidity` and `lag24`, first with shuffled `KFold(5)`, then with `TimeSeriesSplit(5)`. Report each fold of the time split in order and explain the pattern. Say what time-based validation shows about forecasting next month, and why five folds from two years cannot show how the model handles a new kind of year.',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'selection-optimism',
              title: 'The winner is lucky',
              prompt:
                'Simulate selection: draw 200 rows of 20 noise features with a random binary target. Evaluate 50 models that each use a random subset of 5 features, with 5-fold accuracy, and record the best score. Repeat this 20 times and report the average best score. Then score each winner on fresh simulated rows, once. Say what the gap demonstrates, and why it does not mean cross-validation is useless for choosing between models that differ for real.',
              kind: 'simulation',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'When should you use GroupKFold?',
              answerOutline: 'When rows from the same entity repeat and deployment involves new entities, so one entity must not appear on both sides.',
            },
            {
              question: 'Why is random k-fold wrong for forecasting?',
              answerOutline: 'It trains on rows later than some test rows, which is information unavailable at forecast time.',
            },
            {
              question: 'Why keep a holdout if you already cross-validated?',
              answerOutline: 'Selection across models makes the best cross-validation score optimistic. One untouched holdout gives a clean estimate of the final choice.',
            },
          ],
          relatedLessons: ['machine-learning/foundations-and-workflow/generalization-and-validation'],
        },
        {
          slug: 'ridge-and-lasso',
          title: 'Ridge and lasso',
          summary:
            'Penalising coefficients trades a little bias for much less variance. Standardise first, choose alpha by cross-validation, and do not treat the features a lasso keeps as the true ones.',
          estimatedMinutes: 90,
          objectives: [
            'Fit ridge and lasso with standardised features',
            'Choose alpha by cross-validation and read the error curve',
            'Apply the one-standard-error rule',
            'Show that lasso selection is unstable under correlated features',
            'Explain what a zero coefficient does not mean',
          ],
          concepts: [
            'Ridge (L2) penalty',
            'Lasso (L1) penalty and sparsity',
            'Standardisation before penalising',
            'alpha as a complexity setting',
            'One-standard-error rule',
            'Coefficient paths',
            'Selection instability under correlation',
          ],
          explanation: `Both methods shrink coefficients by adding a penalty to least squares. **Ridge** adds $\\alpha \\sum_j \\beta_j^2$, which shrinks correlated coefficients smoothly together. **Lasso** adds $\\alpha \\sum_j |\\beta_j|$, which can set coefficients exactly to zero. The optimisation is covered in the \`machine-learning\` course; the practical rules are below.

**Standardise first.** A penalty treats all coefficients alike, but a coefficient's size depends on its feature's units. Without scaling, a column in metres is punished differently from the same column in kilometres.

**Choose alpha by cross-validation.**

\`\`\`python
import numpy as np
from sklearn.datasets import load_diabetes
from sklearn.linear_model import LassoCV
from sklearn.model_selection import KFold
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler

X, y = load_diabetes(return_X_y=True)
cv = KFold(10, shuffle=True, random_state=0)
pipe = make_pipeline(StandardScaler(), LassoCV(cv=cv)).fit(X, y)
lasso = pipe[-1]
mean = lasso.mse_path_.mean(axis=1)
se = lasso.mse_path_.std(axis=1, ddof=1) / np.sqrt(cv.n_splits)
best = mean.argmin()
one_se = lasso.alphas_[np.where(mean <= mean[best] + se[best])[0].min()]
print(lasso.alpha_, one_se)
\`\`\`

The **one-standard-error rule** picks the simplest model, meaning the largest alpha, whose error is within one standard error of the best. Error curves are often flat near the minimum, so differences there are noise and simplicity is the better tiebreak. The \`alphas_\` array runs from largest to smallest, which is why the code takes the first index that qualifies.

**The lasso does not find the true features.** When two features are strongly correlated, it tends to keep one, and which one can flip with a small change in the data. A zero coefficient means "not needed given the others in this sample", not "unrelated to the target". Check this by refitting on bootstrap samples and counting how often each feature survives.

Read ISLP Section 6.2 for the ideas, then look at the scikit-learn lasso selection example.`,
          resources: [
            { title: 'ISLP, Section 6.2: Shrinkage Methods', url: 'https://www.statlearning.com/', type: 'textbook', cost: 'free', provider: 'James, Witten, Hastie, Tibshirani, Taylor', note: 'Includes the one-standard-error rule in Section 6.1.3.', primary: true },
            { title: 'Linear Models: ridge and lasso', url: 'https://scikit-learn.org/stable/modules/linear_model.html', type: 'documentation', cost: 'free', provider: 'scikit-learn', note: 'Read the Ridge and Lasso sections, including setting alpha.' },
            { title: 'Lasso model selection', url: 'https://scikit-learn.org/stable/auto_examples/linear_model/plot_lasso_model_selection.html', type: 'documentation', cost: 'free', provider: 'scikit-learn', note: 'Cross-validation and information criteria compared, with the error path plotted.' },
          ],
          exercises: [
            {
              slug: 'scaling-matters',
              title: 'Scaling changes the answer',
              prompt:
                'Take `load_diabetes(scaled=False)` and fit `Ridge(alpha=100)` and `Lasso(alpha=1)`, first on raw columns, then in a `StandardScaler` pipeline. Then multiply the `bmi` column by 1000 and refit each. Report the coefficients in a table and describe what changed. Explain why the unscaled fits depend on an arbitrary choice of units, and why standardising does not make the coefficients causal.',
              kind: 'coding',
              difficulty: 1,
            },
            {
              slug: 'one-se-table',
              title: 'Best alpha and one-standard-error alpha',
              prompt:
                'Run the lesson code and plot mean cross-validation error against alpha on a log axis, with error bars and both chosen alphas marked. Refit the lasso at each alpha and report which features survive. Then run `RidgeCV` and compare its 10-fold RMSE with the two lassos. Say which model you would hand to a clinician and why, and what the choice does not show about which measurements matter biologically.',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'lasso-instability',
              title: 'Unstable selection',
              prompt:
                'Add a near-copy of `bmi` to the standardised diabetes features: the same column plus Gaussian noise with 5 percent of its standard deviation. Fit `Lasso(alpha=1.0, max_iter=20000)` on 200 bootstrap samples and record how often each feature is selected. Plot the frequencies and report how the selection is shared between `bmi` and its copy, and how `s1` and `s2` behave given their correlation. Say what this shows about reading a lasso as a list of important variables, and what bootstrap frequencies still cannot establish.',
              kind: 'simulation',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'Why standardise before ridge or lasso?',
              answerOutline: 'The penalty acts on coefficient size, which depends on units, so without scaling the penalty is arbitrary across features.',
            },
            {
              question: 'State the one-standard-error rule and why it is used.',
              answerOutline: 'Take the largest alpha within one standard error of the minimum error. Differences near the minimum are noise, so prefer the simpler model.',
            },
            {
              question: 'A lasso sets a feature to zero. Does that mean it is unrelated to the target?',
              answerOutline: 'No. It may be correlated with a kept feature, and the choice can flip across samples. It means only "not needed given the others here".',
            },
          ],
          relatedLessons: ['machine-learning/linear-models/regularization-ridge-and-lasso'],
        },
        {
          slug: 'pipelines-and-leakage',
          title: 'Pipelines and leakage',
          summary:
            'Leakage is the most common way to get a great score from a useless model. Learn its three kinds, use Pipeline and ColumnTransformer to prevent one, and use canary tests to catch the rest.',
          estimatedMinutes: 105,
          objectives: [
            'Build a Pipeline with a ColumnTransformer for mixed data',
            'Name and detect the three kinds of leakage',
            'Explain why preprocessing must be fitted inside each fold',
            'Audit columns for information created after the outcome',
            'Write canary tests that fail when leakage exists',
          ],
          concepts: [
            'Pipeline',
            'ColumnTransformer',
            'Leakage from columns derived from the target',
            'Leakage from the same entity across a split',
            'Leakage from preprocessing fitted on all rows',
            'Shuffled-target canary',
            'Random-feature canary',
            'Too-good-to-be-true scores',
          ],
          explanation: `**Leakage** means information reaches training that would not be available when the model is used. The score goes up and the model is worthless. There are three kinds.

1. **Columns derived from the target.** They are recorded after the outcome or computed from it. In the Titanic data, \`boat\` records the lifeboat a passenger boarded, so it nearly gives the answer away, and \`body\` is a recovered body number.
2. **The same entity on both sides of a split.** Family members sharing a ticket, or repeat visits by a patient, let a model recognise rather than predict. Lesson two of this module handled this with \`GroupKFold\`.
3. **Preprocessing fitted on all rows.** A scaler, imputer or feature selector that saw test rows has already looked at them.

\`Pipeline\` solves the third kind, because cross-validation refits every step on each training fold only.

\`\`\`python
from sklearn.compose import ColumnTransformer
from sklearn.impute import SimpleImputer
from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import OneHotEncoder, StandardScaler

numeric = make_pipeline(SimpleImputer(strategy='median'), StandardScaler())
categorical = make_pipeline(SimpleImputer(strategy='most_frequent'),
                            OneHotEncoder(handle_unknown='ignore'))
prep = ColumnTransformer([('num', numeric, ['age', 'fare']),
                          ('cat', categorical, ['sex', 'embarked'])])
model = make_pipeline(prep, LogisticRegression(max_iter=2000))
\`\`\`

Selecting features on the full data is the worst form. With 100 rows of pure noise and 5,000 features, picking the best 20 before cross-validation gave 0.85 accuracy in one run, and doing it inside a pipeline gave 0.48.

**Canary tests** are automated checks that scream if something is wrong. Shuffle the target and refit: the score must fall to chance, or your pipeline is leaking. Add a random column: if it ranks as important, your importance method or model is suspect. For any very high score, inspect the single strongest feature and ask when it was recorded.

Read the scikit-learn common pitfalls page in full. It is short and worth rereading.`,
          resources: [
            { title: 'Common pitfalls and recommended practices', url: 'https://scikit-learn.org/stable/common_pitfalls.html', type: 'documentation', cost: 'free', provider: 'scikit-learn', note: 'Read all of it. Data leakage and inconsistent preprocessing are the core.', primary: true },
            { title: 'Pipelines and composite estimators', url: 'https://scikit-learn.org/stable/modules/compose.html', type: 'documentation', cost: 'free', provider: 'scikit-learn', note: 'Pipeline and ColumnTransformer reference.' },
            { title: 'Column Transformer with Mixed Types', url: 'https://scikit-learn.org/stable/auto_examples/compose/plot_column_transformer_mixed_types.html', type: 'documentation', cost: 'free', provider: 'scikit-learn', note: 'A complete worked pipeline, also on Titanic.' },
          ],
          exercises: [
            {
              slug: 'noise-accuracy',
              title: 'Accuracy from nothing',
              prompt:
                'Generate 100 rows of 5,000 standard normal features and a random binary target. Run `SelectKBest(f_classif, k=20)` on all rows, then 5-fold `LogisticRegression` on the result. Repeat with the selector inside a pipeline. Do this for 20 seeds and report both means. Say what the first number measures, given that the features contain no signal, and why the second number being near chance does not prove a pipeline is free of other kinds of leakage.',
              kind: 'simulation',
              difficulty: 1,
            },
            {
              slug: 'titanic-leak-audit',
              title: 'Audit the Titanic columns',
              prompt:
                "Load `fetch_openml('titanic', version=1, as_frame=True, parser='liac-arff')`. For every column, write when it became known relative to the outcome. Cross-tabulate `survived` with whether `boat` and `body` are present. Build the lesson pipeline and report ROC AUC with `StratifiedKFold(5, shuffle=True, random_state=0)`, first on `pclass`, `sex`, `age`, `fare`, `sibsp`, `parch` and `embarked`, and then with `boat` added. Next count rows sharing a `ticket` and compare `StratifiedGroupKFold` on `ticket` with the shuffled folds, over 10 seeds. Say what each change shows, why grouping matters little for a model with no column that identifies a family, and why the clean score says nothing about who would survive a different disaster.",
              kind: 'data-analysis',
              difficulty: 2,
              hint: 'The rows are sorted by class, so use shuffled folds for a fair comparison.',
            },
            {
              slug: 'canary-tests',
              title: 'Write canary tests',
              prompt:
                'Write three pytest-style checks that take a function building your whole procedure, plus `X` and `y`. `test_shuffled_target` permutes `y` before any step runs and asserts that cross-validated ROC AUC stays within 0.05 of 0.5. `test_random_feature` adds a random column and asserts that its permutation importance on held-out data is below the mean importance of the real features. `test_no_oracle_column` fits on each column alone and asserts that none reaches a ROC AUC of 0.95. Run all three on your clean Titanic procedure. Then plant two bugs: `SelectKBest` fitted on all rows of a noise dataset, and `boat` left in. Report which check catches which bug, and say what passing all three does not guarantee.',
              kind: 'coding',
              difficulty: 3,
              hint: 'Each canary has a blind spot. Shuffling breaks the link between `boat` and the outcome, so that test cannot see a target-derived column. It also misses selection done before the shuffle, which is why the shuffle comes first.',
            },
          ],
          selfAssessment: [
            {
              question: 'What are the three kinds of leakage in this lesson?',
              answerOutline: 'Columns derived from the target, the same entity on both sides of a split, and preprocessing fitted on all rows.',
            },
            {
              question: 'How does a Pipeline prevent preprocessing leakage?',
              answerOutline: 'Cross-validation refits every step on the training fold only, then transforms the validation fold with those fitted steps.',
            },
            {
              question: 'What does a shuffled-target canary test, and what can it miss?',
              answerOutline: 'It checks that the whole procedure scores chance when no signal exists, which catches selection on all rows. It cannot catch a target-derived column, since shuffling removes that link.',
            },
          ],
          relatedLessons: ['machine-learning/ml-engineering/pipelines-and-leakage'],
        },
      ],
    },
    {
      slug: 'classification',
      title: 'Classification',
      description:
        'Predicting categories and, more usefully, probabilities: logistic regression, metrics that fit the decision, thresholds from costs, imbalance, and whether a predicted 30 percent really means 30 percent.',
      lessons: [
        {
          slug: 'logistic-regression',
          title: 'Logistic regression',
          summary:
            'The default classifier: it models the log odds as a linear function, so its coefficients become odds ratios. Learn to read them without confusing odds with probability.',
          estimatedMinutes: 85,
          objectives: [
            'Fit a logistic regression and get predicted probabilities',
            'Convert coefficients to odds ratios and read them correctly',
            'Explain why an odds ratio is not a risk ratio',
            'Account for the default regularisation in scikit-learn',
            'State what a coefficient does not show about cause',
          ],
          concepts: [
            'Sigmoid function',
            'Log odds',
            'Odds ratio',
            'Risk ratio',
            'Change in probability depends on the baseline',
            'Default L2 penalty and C',
            'predict_proba versus predict',
          ],
          explanation: `Logistic regression passes a linear score through a sigmoid to get a probability:

$$P(y = 1 \\mid x) = \\frac{1}{1 + e^{-(\\beta_0 + \\beta^\\top x)}}$$

Rearranged, the **log odds** are linear: $\\log\\frac{p}{1-p} = \\beta_0 + \\beta^\\top x$. So a unit increase in $x_j$ multiplies the odds by $e^{\\beta_j}$, which is the **odds ratio**. The fitting is covered in the \`machine-learning\` course.

\`\`\`python
import numpy as np
import pandas as pd
from sklearn.datasets import fetch_openml
from sklearn.linear_model import LogisticRegression

t = fetch_openml('titanic', version=1, as_frame=True, parser='liac-arff').frame
age = t['age'].astype(float)
X = pd.DataFrame({'female': (t['sex'] == 'female').astype(int),
                  'third_class': (t['pclass'].astype(float) == 3).astype(int),
                  'age': age.fillna(age.median())})
y = t['survived'].astype(int)
model = LogisticRegression(C=1e6, max_iter=5000).fit(X, y)
print(dict(zip(X.columns, np.exp(model.coef_[0]))))
\`\`\`

**Odds are not probabilities.** In this data 73 percent of women survived and 19 percent of men. The survival rate is about 3.8 times higher, but the raw odds ratio is about 11. They differ most when outcomes are common, so never report an odds ratio as "times more likely". The change in probability from a given odds ratio also depends on where you start, so a useful report gives predicted probabilities for two concrete cases.

**Check the penalty.** \`LogisticRegression\` applies an L2 penalty by default. For prediction that is usually good, with \`C\` chosen by validation and features standardised. For reading coefficients, a large \`C\` removes most of the shrinkage, as above. Even then, these are associations within this data: passengers were not assigned a class at random.

\`predict\` applies a 0.5 cutoff and throws away information. Prefer \`predict_proba\`, because the next lessons show that choosing the cutoff is a separate decision.

Read ISLP Sections 4.1 to 4.3 and try the MLU-Explain page.`,
          resources: [
            { title: 'ISLP, Sections 4.1 to 4.3: Logistic Regression', url: 'https://www.statlearning.com/', type: 'textbook', cost: 'free', provider: 'James, Witten, Hastie, Tibshirani, Taylor', primary: true },
            { title: 'Logistic Regression', url: 'https://mlu-explain.github.io/logistic-regression/', type: 'interactive', cost: 'free', provider: 'MLU-Explain', note: 'Visual walk from the linear score to the sigmoid.' },
            { title: 'Linear Models: logistic regression', url: 'https://scikit-learn.org/stable/modules/linear_model.html', type: 'documentation', cost: 'free', provider: 'scikit-learn', note: 'Read the logistic regression section, including solvers and the role of C.' },
          ],
          exercises: [
            {
              slug: 'titanic-odds',
              title: 'Odds ratios on the Titanic',
              prompt:
                'Run the lesson code with second and third class as separate dummies. Report each odds ratio. Then compute predicted survival probabilities for a 30-year-old woman and man in each class, and put those in a table next to the odds ratios. Which version would you show a general reader? State what the sex odds ratio shows about this voyage, and why it cannot tell you the effect of sex on survival in some other emergency.',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'penalty-shrinks',
              title: 'See the default penalty',
              prompt:
                'On `load_breast_cancer`, in a pipeline with `StandardScaler`, fit logistic regression at `C` of 0.01, 1, 100 and 10000. Plot the coefficients of `mean radius` and `worst radius` against `C`, and report 5-fold ROC AUC for each. Check the correlation between those two columns. Say why the coefficients move a lot while the score barely moves, and why this means these coefficients should not be used to rank which measurements matter.',
              kind: 'data-analysis',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'An odds ratio of 2 on a feature. What does it mean?',
              answerOutline: 'Each unit multiplies the odds by 2, holding the other features fixed. The change in probability depends on the starting probability.',
            },
            {
              question: 'Why is an odds ratio not "times more likely"?',
              answerOutline: 'That phrase describes a risk ratio. The two are close only for rare outcomes, and odds ratios are further from 1 when outcomes are common.',
            },
            {
              question: 'Why might coefficients from default LogisticRegression mislead?',
              answerOutline: 'The default L2 penalty shrinks them, by an amount that depends on feature scale. Use standardisation and a large C if you intend to read them.',
            },
          ],
          relatedLessons: ['machine-learning/linear-models/logistic-regression'],
        },
        {
          slug: 'metrics-and-thresholds',
          title: 'Metrics and thresholds',
          summary:
            'Ranking quality and a decision are separate. Use ROC and PR curves for ranking, set the threshold from costs, and measure precision and recall at the budget you really have.',
          estimatedMinutes: 105,
          objectives: [
            'Compute a confusion matrix, precision, recall and F1',
            'Read ROC AUC and average precision and say when they disagree',
            'Derive a threshold from the costs of errors',
            'Compute precision and recall at the top 10 percent',
            'Choose a metric that matches the decision',
          ],
          concepts: [
            'Confusion matrix',
            'Precision and recall',
            'F1 score',
            'ROC curve and AUC',
            'Precision-recall curve',
            'Average precision',
            'Threshold from costs',
            'Budget-based metrics (top k percent)',
          ],
          explanation: `A threshold turns probabilities into decisions, and the **confusion matrix** counts the results: true and false positives and negatives. **Precision**, TP / (TP + FP), asks how many flagged cases are real. **Recall**, TP / (TP + FN), asks how many real cases you caught. **F1** is their harmonic mean, which is a convenience that assumes the two errors matter about equally.

Two summaries ignore the threshold. **ROC AUC** is the chance that a random positive outranks a random negative. It does not depend on the base rate, which is also its weakness: on rare outcomes it can look excellent while most flags are false. The **precision-recall curve** and its summary, **average precision**, reflect the base rate, and a random ranking scores about the base rate.

**Set thresholds from costs.** With a false positive costing $c_{FP}$ and a false negative $c_{FN}$, and calibrated probabilities, act when

$$p > \\frac{c_{FP}}{c_{FP} + c_{FN}}$$

If a miss costs five times a false alarm, that threshold is 1/6, nowhere near 0.5.

**Budgets.** Often capacity decides instead: a team can review 10 percent of cases. Then measure exactly that.

\`\`\`python
import numpy as np

def at_top(y, p, frac=0.10):
    k = int(frac * len(y))
    chosen = np.argsort(-p)[:k]
    return y[chosen].mean(), y[chosen].sum() / y.sum()

rng = np.random.default_rng(0)
y = (rng.random(5000) < 0.05).astype(int)
p = np.clip(0.05 + 0.25 * y + rng.normal(0, 0.1, 5000), 0, 1)
print(at_top(y, p))  # (precision, recall) at the top 10 percent
\`\`\`

Recall has a ceiling here: if positives outnumber the budget, you cannot catch them all.

Pitfall: picking the threshold on the test set. Choose it on validation data, using \`TunedThresholdClassifierCV\` or out-of-fold predictions.

Read ISLP Section 4.4.2 on ROC curves, then the scikit-learn cost-sensitive example.`,
          resources: [
            { title: 'Post-tuning the decision threshold', url: 'https://scikit-learn.org/stable/auto_examples/model_selection/plot_cost_sensitive_learning.html', type: 'documentation', cost: 'free', provider: 'scikit-learn', note: 'Cost-sensitive threshold tuning, worked on credit data.', primary: true },
            { title: 'Precision and Recall', url: 'https://mlu-explain.github.io/precision-recall/', type: 'interactive', cost: 'free', provider: 'MLU-Explain' },
            { title: 'ROC and AUC', url: 'https://mlu-explain.github.io/roc-auc/', type: 'interactive', cost: 'free', provider: 'MLU-Explain' },
            { title: 'Tuning the decision threshold', url: 'https://scikit-learn.org/stable/modules/classification_threshold.html', type: 'documentation', cost: 'free', provider: 'scikit-learn', note: 'TunedThresholdClassifierCV and FixedThresholdClassifier.' },
          ],
          exercises: [
            {
              slug: 'credit-costs',
              title: 'A threshold from costs',
              prompt:
                "Load `fetch_openml('credit-g', version=1, as_frame=True, parser='liac-arff')`, treating `bad` as positive. Its documentation says that lending to a bad customer costs 5 and refusing a good customer costs 1. Get out-of-fold probabilities from a logistic pipeline. Report ROC AUC, average precision and the base rate. Plot total cost against threshold, and report the cost at 0.5, at 1/6, and at the empirical minimum. Say what the costs show about the default cutoff, and why the cost matrix is an assumption that the data cannot confirm.",
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'top-ten-percent',
              title: 'Metrics at a review budget',
              prompt:
                "Load `fetch_openml('mammography', version=1, as_frame=True, parser='liac-arff')`; class `1` is positive. Fit a scaled logistic regression on a stratified 70/30 split. Report ROC AUC, average precision, and precision and recall at the top 10 percent using `at_top`. Also report the best possible recall at that budget. Plot both curves. Say which number you would give someone staffing a review team, and why these figures do not show that a flagged case is truly positive.",
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'auc-rare',
              title: 'AUC against precision on a rare outcome',
              prompt:
                'Simulate scores where positives are drawn from $N(1.5, 1)$ and negatives from $N(0, 1)$. Hold those distributions fixed and set the base rate to 30, 5 and 0.5 percent, with 100,000 rows each. Report ROC AUC and average precision at each. Explain the pattern. Say what this shows about comparing an AUC across populations, and what it does not show about which metric is correct in general.',
              kind: 'simulation',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What is the difference between precision and recall?',
              answerOutline: 'Precision is the share of flagged cases that are real. Recall is the share of real cases that are flagged.',
            },
            {
              question: 'A false negative costs 9 and a false positive costs 1. What threshold follows?',
              answerOutline: '$1 / (1 + 9) = 0.1$, assuming calibrated probabilities.',
            },
            {
              question: 'Why can ROC AUC look good when a model is unusable on a rare outcome?',
              answerOutline: 'It ignores the base rate, so many false positives can sit behind a good AUC. Precision shows them.',
            },
          ],
          relatedLessons: ['machine-learning/classification-and-evaluation/classification-metrics-and-curves'],
        },
        {
          slug: 'imbalance',
          title: 'Imbalance',
          summary:
            'Rare outcomes break accuracy and tempt you to rebalance. Class weights and resampling shift ranking little and distort probabilities a lot, so know what you are trading.',
          estimatedMinutes: 85,
          objectives: [
            'Explain why accuracy fails on imbalanced data',
            'Use class_weight and resampling correctly inside cross-validation',
            'Show how rebalancing destroys calibration',
            'Compute how precision depends on the base rate',
            'Decide when imbalance needs handling at all',
          ],
          concepts: [
            'Base rate',
            'Accuracy paradox',
            'class_weight',
            'Oversampling and undersampling',
            'Resampling only training folds',
            'Distorted probabilities',
            'Prior correction',
            'Stratified splits',
          ],
          explanation: `In the mammography data, 2.3 percent of cases are positive, so predicting "no" every time scores 97.7 percent accuracy and finds nothing. Start with the **base rate**, compare against it, and use stratified splits so every fold contains positives.

Imbalance is often less of a problem than it appears. A logistic regression trained on the original data has correct-on-average probabilities, and you can reach any recall simply by lowering the threshold.

Two common fixes change what the model learns. **\`class_weight='balanced'\`** makes each positive count for more in the loss. **Resampling** duplicates positives or discards negatives, and it must happen only in training folds, or copies of a row land on both sides of the split.

Both make the model believe positives are common, so its probabilities inflate.

\`\`\`python
from sklearn.datasets import fetch_openml
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler

m = fetch_openml('mammography', version=1, as_frame=True, parser='liac-arff').frame
y = (m['class'].astype(str).str.strip("'") == '1').astype(int)
X = m.drop(columns='class').astype(float)
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.3, stratify=y, random_state=0)
for weight in (None, 'balanced'):
    pipe = make_pipeline(StandardScaler(), LogisticRegression(max_iter=2000, class_weight=weight))
    print(weight, pipe.fit(X_tr, y_tr).predict_proba(X_te)[:, 1].mean())
\`\`\`

In this run the mean predicted probability rose from 0.023, matching the base rate, to about 0.20. Ranking metrics barely change, so the damage stays invisible unless you check calibration.

Base rates also limit you. For a fixed test, $\\text{precision} = \\frac{r\\pi}{r\\pi + f(1-\\pi)}$ with recall $r$, false positive rate $f$ and base rate $\\pi$. A good test on a rare condition still flags mostly negatives, and a model moved to a population with another base rate needs recalibrating.

Read the scikit-learn page on \`class_weight\` alongside the imbalanced-learn introduction, and treat resampling as an option to test, not a default.`,
          resources: [
            { title: 'imbalanced-learn user guide', url: 'https://imbalanced-learn.org/stable/', type: 'documentation', cost: 'free', provider: 'imbalanced-learn', note: 'Resampling methods, with samplers that fit into a pipeline.', primary: true },
            { title: 'Classification: the problem with reducing to labels', url: 'https://www.fharrell.com/post/classification/', type: 'article', cost: 'free', provider: 'Frank Harrell', note: 'A statistician explains why probabilities beat forced classification, and why rebalancing is rarely needed.' },
            { title: 'Probability calibration', url: 'https://scikit-learn.org/stable/modules/calibration.html', type: 'documentation', cost: 'free', provider: 'scikit-learn', note: 'Includes a note on calibration after rebalancing.' },
          ],
          exercises: [
            {
              slug: 'rebalance-cost',
              title: 'What rebalancing buys and breaks',
              prompt:
                'Using the lesson data, compare three models on one test set: plain logistic regression, `class_weight="balanced"`, and plain logistic regression fitted on an undersampled training set with equal classes. Report ROC AUC, average precision, recall and precision at the top 10 percent, Brier score, and the mean predicted probability. Then apply the prior correction to the undersampled model: multiply its odds by $\\frac{\\pi/(1-\\pi)}{\\pi_s/(1-\\pi_s)}$, where $\\pi$ is the training base rate and $\\pi_s$ the resampled one, and rescore. Say what the rebalanced models gain, what they lose, and why one split cannot rank them with confidence.',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'base-rate-precision',
              title: 'Base rates and false alarms',
              prompt:
                'A screening model has recall 0.90 and a false positive rate of 0.05. Compute its precision at base rates of 20, 2 and 0.2 percent using the lesson formula. Then confirm by simulation with one million cases each. Write a two-sentence note to a clinic explaining the third result. State what this calculation shows, and what it assumes: that recall and false positive rate stay the same across populations, which real models often fail to do.',
              kind: 'problem',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does class_weight usually damage calibration?',
              answerOutline: 'The loss treats positives as more common, so predicted probabilities shift upward away from the true base rate.',
            },
            {
              question: 'Where must resampling happen during cross-validation?',
              answerOutline: 'Only inside training folds. Otherwise copies of rows appear in validation and the validation data no longer reflect the real base rate.',
            },
            {
              question: 'A model moves to a population with a lower base rate. What happens to precision?',
              answerOutline: 'It falls even if recall and false positive rate hold, because false positives grow relative to true positives. Probabilities need recalibrating too.',
            },
          ],
          relatedLessons: ['machine-learning/classification-and-evaluation/imbalance-calibration-and-multiclass'],
        },
        {
          slug: 'calibration',
          title: 'Calibration',
          summary:
            'A calibrated model means what it says: of cases given 30 percent, about 30 percent happen. Measure it with reliability diagrams, Brier score and ECE, and fix it on separate data.',
          estimatedMinutes: 90,
          objectives: [
            'Plot and read a reliability diagram',
            'Compute Brier score and expected calibration error',
            'Fit Platt scaling and isotonic regression on separate data',
            'Choose between Platt and isotonic given data size',
            'Explain what calibration does not guarantee',
          ],
          concepts: [
            'Calibration',
            'Reliability diagram',
            'Brier score',
            'Expected calibration error',
            'Platt scaling',
            'Isotonic regression',
            'Separate calibration set',
            'Calibration versus discrimination',
          ],
          explanation: `**Calibration** asks whether probabilities can be taken literally. **Discrimination**, which AUC measures, asks only whether positives rank above negatives. They are independent: dividing every probability by 2 keeps AUC and wrecks calibration. Any decision that multiplies a probability by a cost needs calibration.

A **reliability diagram** bins predictions and plots the mean prediction against the observed rate per bin. On the diagonal is good. Below it, the model is overconfident in that range.

Two numbers summarise this. The **Brier score** is $\\frac{1}{n}\\sum_i (p_i - y_i)^2$, which mixes calibration and discrimination, so compare it with the score of always predicting the base rate. **Expected calibration error** is a weighted average of the gaps across $B$ bins:

$$\\text{ECE} = \\sum_{b=1}^{B} \\frac{n_b}{n} \\left| \\bar{y}_b - \\bar{p}_b \\right|$$

It depends on the bins, so state how many you used.

To repair a model, fit a small mapping from scores to probabilities on data the model did not train on. **Platt scaling** fits a sigmoid, which is sturdy on small sets. **Isotonic regression** fits any increasing step function, which is more flexible and needs more data.

\`\`\`python
from sklearn.calibration import CalibratedClassifierCV
from sklearn.datasets import make_classification
from sklearn.frozen import FrozenEstimator
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import brier_score_loss
from sklearn.model_selection import train_test_split

X, y = make_classification(20000, weights=[0.9], flip_y=0.02, random_state=0)
X_fit, X_rest, y_fit, y_rest = train_test_split(X, y, test_size=0.5, random_state=0)
X_cal, X_te, y_cal, y_te = train_test_split(X_rest, y_rest, test_size=0.5, random_state=0)
raw = LogisticRegression(class_weight='balanced').fit(X_fit, y_fit)
fixed = CalibratedClassifierCV(FrozenEstimator(raw), method='sigmoid').fit(X_cal, y_cal)
for m in (raw, fixed):
    print(brier_score_loss(y_te, m.predict_proba(X_te)[:, 1]))
\`\`\`

Pitfall: calibrating on training rows, where an overfitted model already looks perfect. Also, overall calibration can hide subgroups that are miscalibrated in opposite directions, and it holds only for populations like this one.

Read the scikit-learn calibration guide, then try the curves example.`,
          resources: [
            { title: 'Probability calibration', url: 'https://scikit-learn.org/stable/modules/calibration.html', type: 'documentation', cost: 'free', provider: 'scikit-learn', note: 'Calibration curves, CalibratedClassifierCV, and the two methods.', primary: true },
            { title: 'Probability Calibration curves', url: 'https://scikit-learn.org/stable/auto_examples/calibration/plot_calibration_curve.html', type: 'documentation', cost: 'free', provider: 'scikit-learn', note: 'Reliability diagrams for several classifiers, with Brier scores.' },
            { title: 'On Calibration of Modern Neural Networks', url: 'https://arxiv.org/abs/1706.04599', type: 'article', cost: 'free', provider: 'Guo, Pleiss, Sun, Weinberger', note: 'Read Sections 1 and 2 for reliability diagrams and ECE in use.' },
          ],
          exercises: [
            {
              slug: 'calibrate-adult',
              title: 'Repair a rebalanced model',
              prompt:
                "Load `fetch_openml('adult', version=2, as_frame=True, parser='liac-arff')`, target `>50K`, and drop `fnlwgt`. Split into fit, calibration and test sets. Train a logistic pipeline with `class_weight='balanced'` on the fit set. Write your own 10-bin ECE function. On the test set report Brier score, ECE and ROC AUC for the raw model, for Platt scaling and for isotonic regression, each fitted on the calibration set, and draw one reliability diagram. Explain why AUC is unchanged under Platt scaling. Say what the calibrated probabilities are good for, and why they do not describe any individual's actual chance of a high income.",
              kind: 'data-analysis',
              difficulty: 2,
              hint: 'Platt scaling is a strictly increasing map of the score, so the ranking cannot change.',
            },
            {
              slug: 'calibration-size',
              title: 'How much calibration data do you need?',
              prompt:
                'Using the same setup, fit Platt and isotonic on calibration sets of 100, 300, 1000, 3000 and all rows, with 10 random draws at each size. Plot mean test Brier score and its spread against size. Say at what size isotonic becomes competitive here, and why that crossover is specific to this dataset and model and is not a general rule.',
              kind: 'simulation',
              difficulty: 3,
            },
            {
              slug: 'subgroup-calibration',
              title: 'Calibrated overall, not within groups',
              prompt:
                'On your Platt-calibrated Adult model, compute observed rate and mean prediction on the test set for `sex` and for the largest `race` groups, along with each group size. Draw reliability diagrams for two groups. Report where gaps appear. Say whether a small gap in a small group is evidence of a problem, what you would need to find out, and why good overall calibration is no guarantee of fair treatment.',
              kind: 'data-analysis',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Can a model have high AUC and poor calibration?',
              answerOutline: 'Yes. AUC depends only on ranking, so any monotone distortion of the probabilities leaves it unchanged.',
            },
            {
              question: 'When would you choose Platt over isotonic?',
              answerOutline: 'With little calibration data, or when the miscalibration is roughly sigmoid shaped. Isotonic is more flexible but needs more data.',
            },
            {
              question: 'Why must calibration use separate data?',
              answerOutline: 'On training rows an overfitted model looks more accurate than it is, so the mapping learns the wrong correction.',
            },
          ],
          relatedLessons: ['machine-learning/classification-and-evaluation/imbalance-calibration-and-multiclass'],
        },
      ],
    },
    {
      slug: 'trees-and-non-linear-models',
      title: 'Trees and Non-linear Models',
      description:
        'The standard non-linear toolkit: nearest neighbours, decision trees, random forests, gradient boosting and support vector machines, and how to choose among them honestly.',
      lessons: [
        {
          slug: 'k-nearest-neighbours',
          title: 'k-nearest neighbours',
          summary:
            'Predict from the most similar training rows. The method is simple, which makes it a clear way to see why scaling matters and why high dimensions are strange.',
          estimatedMinutes: 70,
          objectives: [
            'Fit kNN and choose k by cross-validation',
            'Show why kNN requires feature scaling',
            'Explain the curse of dimensionality with a measurement',
            'Say when kNN is a sensible baseline',
          ],
          concepts: [
            'Distance-based prediction',
            'k as a smoothing setting',
            'Feature scaling',
            'Curse of dimensionality',
            'Distance concentration',
            'Prediction cost grows with data',
          ],
          explanation: `k-nearest neighbours stores the training data and predicts from the $k$ closest rows, by majority vote or by averaging. There is no fitted equation. Small $k$ follows local noise and large $k$ smooths towards the overall average, so $k$ controls flexibility, and you choose it by cross-validation.

**Scaling is not optional.** Distance adds up squared differences, so a column measured in thousands drowns out one measured in fractions. On the wine data one column, \`proline\`, has values in the hundreds and thousands.

\`\`\`python
from sklearn.datasets import load_wine
from sklearn.model_selection import StratifiedKFold, cross_val_score
from sklearn.neighbors import KNeighborsClassifier
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler

X, y = load_wine(return_X_y=True)
cv = StratifiedKFold(5, shuffle=True, random_state=0)
print(cross_val_score(KNeighborsClassifier(), X, y, cv=cv).mean())
scaled = make_pipeline(StandardScaler(), KNeighborsClassifier())
print(cross_val_score(scaled, X, y, cv=cv).mean())
\`\`\`

This gives about 0.66 unscaled and 0.96 scaled. Nothing about the wine changed; only the arithmetic did. And scaling is itself a choice, since it says every feature matters equally.

**The curse of dimensionality.** As dimensions grow, data spread out and distances concentrate. In 2-D uniform data, the nearest point can be far closer than the farthest. In a run with 500 uniform points, the ratio of nearest to farthest distance from one point was 0.015 in 2 dimensions and 0.90 in 1,000. When everything is about equally far away, "nearest" stops meaning "similar". Irrelevant features make this worse, because they add distance without adding information.

kNN is a useful baseline at low dimension with meaningful distances. Its prediction cost grows with the data, since a prediction has to search it, and fitting does not reduce that.

Read ISLP Section 2.2.3 for the classifier, and use the scikit-learn neighbours guide as reference.`,
          resources: [
            { title: 'ISLP, Section 2.2.3: The Classification Setting', url: 'https://www.statlearning.com/', type: 'textbook', cost: 'free', provider: 'James, Witten, Hastie, Tibshirani, Taylor', note: 'Also read Section 4.7 on KNN in practice.', primary: true },
            { title: 'Nearest Neighbors', url: 'https://scikit-learn.org/stable/modules/neighbors.html', type: 'documentation', cost: 'free', provider: 'scikit-learn' },
            { title: 'Nearest Neighbors Classification', url: 'https://scikit-learn.org/stable/auto_examples/neighbors/plot_classification.html', type: 'documentation', cost: 'free', provider: 'scikit-learn', note: 'See decision boundaries change with the settings.' },
          ],
          exercises: [
            {
              slug: 'wine-k',
              title: 'Scale, then choose k',
              prompt:
                'Run the lesson code. Then, with scaling, plot 5-fold accuracy against $k$ from 1 to 40. Report the best $k$ and how many values of $k$ fall within one standard deviation of it. Add 10 random noise columns and repeat. Say what the noise did, and why the result on this small dataset does not establish how kNN would rank wines it has never seen from other producers.',
              kind: 'data-analysis',
              difficulty: 1,
            },
            {
              slug: 'measure-the-curse',
              title: 'Measure distance concentration',
              prompt:
                'For dimensions 2, 10, 100 and 1000, draw 500 uniform points and compute the ratio of nearest to farthest distance from the first point, averaged across 20 seeds. Plot it. Then take `load_digits`, compute the same ratio on the 64 pixels, and compare with what uniform data in 64 dimensions gives. Explain why kNN still works on digits. Say what this shows about real data compared with uniform noise, and what a single ratio cannot show about usefulness.',
              kind: 'simulation',
              difficulty: 2,
              hint: 'Real data sit near a lower-dimensional structure, so their effective dimension can be far below the column count.',
            },
          ],
          selfAssessment: [
            {
              question: 'Why must features be scaled for kNN?',
              answerOutline: 'Distance sums over columns, so columns with large numeric ranges dominate regardless of relevance.',
            },
            {
              question: 'What does k control?',
              answerOutline: 'Flexibility. Small k has low bias and high variance, while large k smooths more and can underfit.',
            },
            {
              question: 'What is distance concentration?',
              answerOutline: 'In high dimensions, nearest and farthest distances become similar, so similarity based on distance loses meaning.',
            },
          ],
          relatedLessons: ['machine-learning/foundations-and-workflow/baselines-and-nearest-neighbours'],
        },
        {
          slug: 'decision-trees',
          title: 'Decision trees',
          summary:
            'A tree asks a series of yes/no questions, which is easy to read and easy to overfit. Control depth, understand impurity, and do not trust a single tree as an explanation.',
          estimatedMinutes: 80,
          objectives: [
            'Fit and draw a decision tree',
            'Explain how impurity chooses a split',
            'Control overfitting with depth and leaf size',
            'Show that a tree changes substantially under resampling',
          ],
          concepts: [
            'Recursive splitting',
            'Gini impurity',
            'Depth and leaf size',
            'Cost-complexity pruning',
            'No scaling required',
            'Axis-aligned boundaries',
            'Instability under resampling',
          ],
          explanation: `A decision tree splits the data on one feature at a time, then repeats inside each branch. Each leaf predicts the majority class or the mean of its rows. Because splits depend only on the order of values, trees need no scaling and handle mixed features and non-linear patterns naturally.

To choose a split, the tree looks for the question that makes the children purest. **Gini impurity**, $1 - \\sum_k p_k^2$, is 0 for a pure node and largest for an even mix. The algorithm greedily picks the split that reduces weighted impurity the most, and it never looks ahead.

Left alone, a tree keeps splitting until the leaves are pure.

\`\`\`python
from sklearn.datasets import load_breast_cancer
from sklearn.model_selection import StratifiedKFold, cross_val_score
from sklearn.tree import DecisionTreeClassifier

X, y = load_breast_cancer(return_X_y=True)
cv = StratifiedKFold(5, shuffle=True, random_state=0)
for depth in (1, 2, 3, 5, None):
    tree = DecisionTreeClassifier(max_depth=depth, random_state=0)
    print(depth, tree.fit(X, y).score(X, y), cross_val_score(tree, X, y, cv=cv).mean())
\`\`\`

An unlimited tree scores 1.0 on its own training data, which proves only that it memorised the rows, and it does worse in cross-validation here than a depth 5 tree. Limit \`max_depth\` or \`min_samples_leaf\`, or prune with \`ccp_alpha\`, and choose by validation.

**Trees look interpretable, but be careful.** You can read one, which is valuable. But a small change in the data can change the top split and everything below it, so the story you tell may belong to this sample only. With correlated features, the one chosen for a split may have only narrowly beaten another. Also, splits are axis-aligned, so a diagonal boundary needs a staircase of many splits.

That instability is the reason ensembles work, which the next two lessons cover.

Read ISLP Section 8.1 and try MLU-Explain's visual tree.`,
          resources: [
            { title: 'ISLP, Section 8.1: Decision Trees', url: 'https://www.statlearning.com/', type: 'textbook', cost: 'free', provider: 'James, Witten, Hastie, Tibshirani, Taylor', primary: true },
            { title: 'Decision Trees', url: 'https://mlu-explain.github.io/decision-tree/', type: 'interactive', cost: 'free', provider: 'MLU-Explain', note: 'A step-by-step visual on splitting and entropy.' },
            { title: 'Decision Trees', url: 'https://scikit-learn.org/stable/modules/tree.html', type: 'documentation', cost: 'free', provider: 'scikit-learn', note: 'Includes practical tips and the export and plotting tools.' },
            { title: 'Post pruning with cost complexity', url: 'https://scikit-learn.org/stable/auto_examples/tree/plot_cost_complexity_pruning.html', type: 'documentation', cost: 'free', provider: 'scikit-learn' },
          ],
          exercises: [
            {
              slug: 'depth-and-leaf',
              title: 'Tune a tree',
              prompt:
                'On `load_breast_cancer`, run the lesson loop, then a grid over `max_depth` and `min_samples_leaf` with `GridSearchCV`. Report the best settings and draw the tree with `plot_tree`. Write its top three splits in words. Then check how close the runners-up were on cross-validation. Say what the tree shows about how this classifier works, and why it does not prove the top feature is the most important measurement in tumour biology.',
              kind: 'data-analysis',
              difficulty: 1,
            },
            {
              slug: 'tree-instability',
              title: 'Measure instability',
              prompt:
                'Fit a depth 3 tree on 50 bootstrap samples of the breast cancer data. Record the feature at the root each time and the features used anywhere in the tree. Report how many different root features occur, and how often predictions from pairs of trees agree on held-out rows. Compare that agreement with the test accuracy of the trees. Say what the result implies about explaining a decision with one tree, and why stable predictions do not imply stable reasons.',
              kind: 'simulation',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What does Gini impurity measure?',
              answerOutline: 'How mixed the classes in a node are. It is 0 for a pure node and largest for an even mix.',
            },
            {
              question: 'Why does a fully grown tree score 100 percent on training data, and what does that show?',
              answerOutline: 'It can split until every leaf is pure, so it memorises rows. It shows nothing about generalisation.',
            },
            {
              question: 'Why not trust a single tree as an explanation?',
              answerOutline: 'Small data changes can alter the top splits, and correlated features can substitute for each other, so the story is unstable.',
            },
          ],
          relatedLessons: ['machine-learning/trees-ensembles-and-kernels/decision-trees'],
        },
        {
          slug: 'random-forests',
          title: 'Random forests',
          summary:
            'Average many deep, decorrelated trees and the variance falls. Forests work well with little tuning, and out-of-bag rows give a built-in validation score.',
          estimatedMinutes: 80,
          objectives: [
            'Explain bagging and why averaging reduces variance',
            'Explain what max_features does',
            'Use out-of-bag error and compare it with cross-validation',
            'Know when out-of-bag scores are the wrong estimate',
          ],
          concepts: [
            'Bootstrap aggregating (bagging)',
            'Decorrelating trees',
            'max_features',
            'Out-of-bag error',
            'Number of trees',
            'Probability estimates from forests',
            'Limits of out-of-bag validation',
          ],
          explanation: `A deep tree has low bias and high variance. If you average many of them, the variance falls and the bias stays about the same. **Bagging** does this by training each tree on a bootstrap sample of the rows.

Averaging only helps if trees disagree. If one feature dominates, every tree uses it first and they end up alike. So a **random forest** also limits each split to a random subset of features, set by \`max_features\`. This decorrelates the trees, even though each one gets slightly worse. In scikit-learn, the classifier defaults to the square root of the feature count and the regressor defaults to all features, which is plain bagging, so it is worth tuning for regression.

More trees never overfit in the usual sense. The score just levels off, so add trees until it stops improving or you run out of patience.

Each bootstrap misses about a third of the rows. Scoring each row using only the trees that did not see it gives the **out-of-bag** estimate, a free validation score.

\`\`\`python
from sklearn.datasets import fetch_california_housing
from sklearn.ensemble import RandomForestRegressor

X, y = fetch_california_housing(return_X_y=True, as_frame=True)
X = X.sample(6000, random_state=0)
y = y.loc[X.index]
for mf in (1.0, 1 / 3):
    rf = RandomForestRegressor(n_estimators=200, max_features=mf, oob_score=True,
                               n_jobs=-1, random_state=0).fit(X, y)
    print(mf, rf.oob_score_)
\`\`\`

**Pitfalls.** Out-of-bag rows are random, so the score inherits every problem of random folds. It is not honest with repeated entities or time order, because neighbouring rows still sit in the trees. Forests also cannot predict beyond the range of training targets, since they average seen values. Their probabilities are often not calibrated, so check.

Read ISLP Section 8.2.1 and 8.2.2, then see the scikit-learn out-of-bag example.`,
          resources: [
            { title: 'ISLP, Section 8.2: Bagging, Random Forests, Boosting', url: 'https://www.statlearning.com/', type: 'textbook', cost: 'free', provider: 'James, Witten, Hastie, Tibshirani, Taylor', primary: true },
            { title: 'Random Forest', url: 'https://mlu-explain.github.io/random-forest/', type: 'interactive', cost: 'free', provider: 'MLU-Explain' },
            { title: 'OOB Errors for Random Forests', url: 'https://scikit-learn.org/stable/auto_examples/ensemble/plot_ensemble_oob.html', type: 'documentation', cost: 'free', provider: 'scikit-learn', note: 'Out-of-bag error against the number of trees for three max_features settings.' },
          ],
          exercises: [
            {
              slug: 'oob-against-cv',
              title: 'Out-of-bag, random folds and geographic folds',
              prompt:
                'On a 6,000-row sample of California housing, compare three estimates of $R^2$ for a forest: out-of-bag, 5-fold shuffled cross-validation, and `GroupKFold` on 1-degree geographic blocks. Plot out-of-bag score against `n_estimators` up to 300 for `max_features` of 1.0 and 1/3. Say which estimate suits predicting a region with no data, and why even that estimate cannot tell you how the model would do in a different decade.',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'forest-extrapolation',
              title: 'A forest cannot extrapolate',
              prompt:
                'Simulate $y = 2x + \\varepsilon$ with $x$ on $[0, 10]$ and noise standard deviation 1. Train a `RandomForestRegressor` and a `LinearRegression` on it, then predict on $x$ from 0 to 15 and plot both. Then, on California housing, report the highest prediction a forest makes compared with the cap on the target. Explain the flat line. Say what this means for using a forest on new conditions, and why the simulation does not mean linear models are better in general.',
              kind: 'simulation',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does max_features help a forest?',
              answerOutline: 'It decorrelates trees by forcing them to use different features, so averaging removes more variance.',
            },
            {
              question: 'What is out-of-bag error?',
              answerOutline: 'Each row scored by the trees whose bootstrap sample missed it, which gives validation without a separate split.',
            },
            {
              question: 'When should you not trust an out-of-bag estimate?',
              answerOutline: 'With repeated entities or time order, because random row sampling keeps related rows in the trees that score each row.',
            },
          ],
          relatedLessons: ['machine-learning/trees-ensembles-and-kernels/bagging-and-random-forests'],
        },
        {
          slug: 'gradient-boosting',
          title: 'Gradient boosting',
          summary:
            'Build shallow trees in sequence, each correcting the last. HistGradientBoostingClassifier is often the strongest tabular model, and early stopping controls it.',
          estimatedMinutes: 90,
          objectives: [
            'Explain boosting as a sequence of corrections',
            'Fit HistGradientBoostingClassifier with categorical features',
            'Trade learning rate against the number of iterations',
            'Use early stopping and explain where its data comes from',
            'Compare boosting fairly with a simpler baseline',
          ],
          concepts: [
            'Sequential additive model',
            'Fitting residuals',
            'HistGradientBoostingClassifier',
            'Learning rate (shrinkage)',
            'Early stopping',
            'Depth and leaf limits',
            'Native categorical and missing value support',
          ],
          explanation: `A forest grows deep trees in parallel and averages them to reduce variance. **Boosting** grows shallow trees in sequence, each one fitted to what the current model still gets wrong, which reduces bias. The prediction is a sum:

$$F_M(x) = F_0(x) + \\eta \\sum_{m=1}^{M} h_m(x)$$

Here $h_m$ is a small tree and $\\eta$ is the **learning rate**. A smaller rate takes smaller steps, so it needs more trees, and it usually generalises a little better. Unlike a forest, boosting overfits if it runs too long, so the number of trees is a real complexity setting.

\`HistGradientBoostingClassifier\` bins features into histograms, so it is fast on hundreds of thousands of rows, and it handles missing values and categories natively.

\`\`\`python
from sklearn.datasets import fetch_openml
from sklearn.ensemble import HistGradientBoostingClassifier
from sklearn.metrics import roc_auc_score
from sklearn.model_selection import train_test_split

a = fetch_openml('adult', version=2, as_frame=True, parser='liac-arff').frame
y = a['class'].astype(str).str.contains('>50K').astype(int)
X = a.drop(columns=['class', 'fnlwgt'])
for col in X.select_dtypes(exclude='number'):
    X[col] = X[col].astype('category')
X_tr, X_te, y_tr, y_te = train_test_split(X, y, stratify=y, random_state=0)
for rate in (0.3, 0.1, 0.03):
    model = HistGradientBoostingClassifier(
        learning_rate=rate, max_iter=2000, early_stopping=True,
        n_iter_no_change=20, categorical_features='from_dtype', random_state=0)
    model.fit(X_tr, y_tr)
    print(rate, model.n_iter_, roc_auc_score(y_te, model.predict_proba(X_te)[:, 1]))
\`\`\`

**Early stopping** holds out part of the training data and stops when the score stops improving. Set \`max_iter\` high and let it decide. That internal split is random, so with repeated entities or time order, stopping is tuned on the wrong kind of data and you should build your own validation split.

In this run, the lower rates used many more trees for a small gain in AUC. That is the usual pattern: tune the learning rate last, and only if you need the last bit.

Read ISLP Section 8.2.3, then the histogram boosting section of the scikit-learn ensembles guide.`,
          resources: [
            { title: 'ISLP, Section 8.2.3: Boosting', url: 'https://www.statlearning.com/', type: 'textbook', cost: 'free', provider: 'James, Witten, Hastie, Tibshirani, Taylor', primary: true },
            { title: 'Ensembles: gradient boosting, random forests, bagging', url: 'https://scikit-learn.org/stable/modules/ensemble.html', type: 'documentation', cost: 'free', provider: 'scikit-learn', note: 'Read the histogram-based gradient boosting section.' },
            { title: 'Features in Histogram Gradient Boosting Trees', url: 'https://scikit-learn.org/stable/auto_examples/ensemble/plot_hgbt_regression.html', type: 'documentation', cost: 'free', provider: 'scikit-learn', note: 'Early stopping, missing values and quantile loss in practice.' },
            { title: 'Comparing Random Forests and Histogram Gradient Boosting', url: 'https://scikit-learn.org/stable/auto_examples/ensemble/plot_forest_hist_grad_boosting_comparison.html', type: 'documentation', cost: 'free', provider: 'scikit-learn' },
          ],
          exercises: [
            {
              slug: 'rate-and-stopping',
              title: 'Learning rate and early stopping',
              prompt:
                'Run the lesson code. For each rate, plot `validation_score_` against iteration, and record `n_iter_` and fit time. Then fix `max_iter=2000` with early stopping off at a rate of 0.3, and report what happens to test AUC and log loss. Say what this shows about stopping on this dataset, and why a slightly better AUC does not tell you that this model is better for a person deciding a loan or a benefit.',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'beat-the-baseline',
              title: 'Does boosting earn its complexity?',
              prompt:
                'On Adult, compare logistic regression with the pipeline from Module 3, a random forest, and `HistGradientBoostingClassifier` with early stopping, using 5-fold ROC AUC, Brier score, and fit time. Then repeat using `HistGradientBoostingRegressor` on the Ames log price against a ridge model on the same columns. Report mean and spread. Decide for each dataset whether the extra complexity is worth it, and note what these scores cannot show about stability over time.',
              kind: 'data-analysis',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'How does boosting differ from a random forest?',
              answerOutline: 'Boosting fits shallow trees in sequence to reduce bias. Forests average deep trees in parallel to reduce variance.',
            },
            {
              question: 'Why does halving the learning rate roughly require more trees?',
              answerOutline: 'Each tree contributes a smaller step, so more steps are needed to reach the same fit.',
            },
            {
              question: 'When is the built-in early stopping split a problem?',
              answerOutline: 'When data have repeated entities or time order. A random internal split stops the model using the wrong kind of validation.',
            },
          ],
          relatedLessons: ['machine-learning/trees-ensembles-and-kernels/gradient-boosting'],
        },
        {
          slug: 'support-vector-machines',
          title: 'Support vector machines',
          summary:
            'SVMs find a wide margin, and the RBF kernel bends it. Learn C, gamma, scaling and their limits, then compare every model in this module honestly.',
          estimatedMinutes: 95,
          objectives: [
            'Explain the margin, support vectors and C',
            'Fit an RBF SVM with scaling and tune C and gamma',
            'Explain why kernel SVMs do not scale past tens of thousands of rows',
            'Use LinearSVC, and treat decision_function as a score and not a probability',
            'Compare model families with repeated cross-validation and say when trees do not win',
          ],
          concepts: [
            'Margin',
            'Support vectors',
            'C as a penalty on violations',
            'RBF kernel and gamma',
            'Scaling for SVMs',
            'Training time and row count',
            'LinearSVC',
            'decision_function versus probability',
            'Honest model comparison',
          ],
          explanation: `A support vector machine finds the boundary with the widest **margin** between classes. Only the points on or inside the margin, the **support vectors**, determine it. \`C\` sets the cost of violating the margin: large \`C\` fits harder, small \`C\` tolerates more errors. The optimisation theory is in the \`machine-learning\` course.

The **RBF kernel** compares points by similarity, so the boundary can curve. \`gamma\` sets how local each point's influence is, and high values overfit. Tune \`C\` and \`gamma\` together on a log grid. Always scale: the kernel uses distances, so it fails the same way kNN does.

**Scale limits.** Kernel SVM training time grows much faster than the data. In a test on the Adult data, doubling rows from 10,000 to 20,000 took four times as long. Past tens of thousands of rows, use \`LinearSVC\`, which took a fraction of a second there, or a tree ensemble.

An SVM's natural output is a signed distance from \`decision_function\`, not a probability. It ranks cases, so AUC is valid, but do not read it as a chance. If you need probabilities, wrap the model in \`CalibratedClassifierCV\`.

**Choosing honestly.** Compare families on the same folds, repeated to show the noise.

\`\`\`python
from sklearn.datasets import load_breast_cancer
from sklearn.ensemble import HistGradientBoostingClassifier as HGB
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import RepeatedStratifiedKFold, cross_val_score
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.svm import SVC

X, y = load_breast_cancer(return_X_y=True)
cv = RepeatedStratifiedKFold(n_splits=5, n_repeats=3, random_state=0)
for model in (make_pipeline(StandardScaler(), LogisticRegression(max_iter=5000)),
              make_pipeline(StandardScaler(), SVC()), HGB(random_state=0)):
    s = cross_val_score(model, X, y, cv=cv, scoring='roc_auc')
    print(s.mean(), s.std())
\`\`\`

Here logistic regression matches boosting within noise. On Adult, boosting wins clearly. Tree ensembles win when interactions and thresholds matter, and not when the signal is close to additive, the data are small, or features were already engineered. If differences are within the spread, take the simpler model.

Read ISLP Chapter 9 for the concepts.`,
          resources: [
            { title: 'ISLP, Chapter 9: Support Vector Machines', url: 'https://www.statlearning.com/', type: 'textbook', cost: 'free', provider: 'James, Witten, Hastie, Tibshirani, Taylor', primary: true },
            { title: 'Support Vector Machines', url: 'https://scikit-learn.org/stable/modules/svm.html', type: 'documentation', cost: 'free', provider: 'scikit-learn', note: 'Read the tips on practical use and the complexity section.' },
            { title: 'RBF SVM parameters', url: 'https://scikit-learn.org/stable/auto_examples/svm/plot_rbf_parameters.html', type: 'documentation', cost: 'free', provider: 'scikit-learn', note: 'See the boundary change across C and gamma.' },
            { title: 'LinearSVC', url: 'https://scikit-learn.org/stable/modules/generated/sklearn.svm.LinearSVC.html', type: 'documentation', cost: 'free', provider: 'scikit-learn', note: 'The linear solver for larger datasets.' },
          ],
          exercises: [
            {
              slug: 'svm-grid',
              title: 'Tune C and gamma',
              prompt:
                'On `load_digits`, reduce the task to separating 3 from 8. In a scaled pipeline, grid-search `C` and `gamma` on a log scale with 5-fold CV and show a heatmap of accuracy. Report the best pair and how much of the grid is near that score. Then show one setting with very high `gamma` and report training and CV accuracy. Say what the heatmap shows about sensitivity, and why the best cell is not a universal setting for image data.',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'svm-scaling-time',
              title: 'How training time grows',
              prompt:
                'Encode and scale the Adult data with your Module 3 pipeline steps. Time `SVC` and `LinearSVC` for 2,000, 5,000, 10,000 and 20,000 rows, and plot on log axes. Estimate how time grows with rows and extrapolate to all rows. Compare test AUC using `decision_function`. Say what the curve implies for your own projects, and why a timing on your laptop is not a property of the algorithm alone.',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'honest-comparison',
              title: 'Choose among the module',
              prompt:
                'Run the lesson comparison for logistic regression, kNN, an RBF SVM, a random forest and histogram boosting on two datasets: `load_breast_cancer` and a 10,000-row sample of Adult. Use `RepeatedStratifiedKFold` and report mean, spread and fit time. Write one paragraph per dataset choosing a model, with a reason. State where the ranking falls within noise. Say why winning on these two datasets does not show that one family is best in general, and what a result within noise tells you to do.',
              kind: 'data-analysis',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'What do C and gamma control?',
              answerOutline: 'C sets the penalty for margin violations. Gamma sets how local each point is. Larger values of either fit harder and can overfit.',
            },
            {
              question: 'Why not read decision_function as a probability?',
              answerOutline: 'It is a signed distance on an arbitrary scale. It ranks cases but needs calibration to become a probability.',
            },
            {
              question: 'When might logistic regression match tree ensembles?',
              answerOutline: 'When the signal is close to additive, the data are small, or features were already engineered. Check with repeated CV.',
            },
          ],
          relatedLessons: ['machine-learning/trees-ensembles-and-kernels/svms-and-kernels'],
        },
      ],
    },
    {
      slug: 'unsupervised-learning',
      title: 'Unsupervised Learning',
      description:
        'Finding structure without a target: clustering, mixture models, PCA and embedding plots. With no labels to check against, the central skill is knowing how little a pretty result proves.',
      lessons: [
        {
          slug: 'k-means-and-choosing-k',
          title: 'k-means and choosing k',
          summary:
            'k-means always returns k clusters, even from noise. Choose k with inertia, silhouette and stability, treat the result as a description, and test whether it adds predictive value.',
          estimatedMinutes: 100,
          objectives: [
            'Fit k-means with scaling and several initialisations',
            'Compare values of k with the elbow, silhouette and resampling stability',
            'Use the adjusted Rand index to compare two clusterings',
            'Show that k-means finds clusters in structureless data',
            'Test whether clusters add predictive value',
          ],
          concepts: [
            'Centroids and inertia',
            'Elbow method',
            'Silhouette score',
            'Stability under resampling',
            'Adjusted Rand index',
            'A cluster is a description, not a discovery',
            'Predictive value of clusters',
          ],
          explanation: `k-means places $k$ centroids and alternates between assigning each point to its nearest centroid and moving centroids to the mean of their points. It minimises **inertia**, the sum of squared distances to centroids. Results depend on the start, so use several initialisations with \`n_init\`, and scale first, because this is a distance method.

There is no correct $k$ in the data waiting to be found, but there are useful checks.

\`\`\`python
from sklearn.cluster import KMeans
from sklearn.datasets import load_wine
from sklearn.metrics import silhouette_score
from sklearn.preprocessing import StandardScaler

X = StandardScaler().fit_transform(load_wine().data)
for k in range(2, 7):
    km = KMeans(k, n_init=10, random_state=0).fit(X)
    print(k, km.inertia_, silhouette_score(X, km.labels_))
\`\`\`

- **Elbow**: inertia always falls as $k$ grows, so look for a bend. Often there is none.
- **Silhouette**: how much closer a point is to its own cluster than to the next, from -1 to 1.
- **Stability**: refit on bootstrap samples, assign all the original rows, and compare with the **adjusted Rand index**, which is 1 for identical partitions and near 0 for chance agreement. A real grouping should survive resampling.

**A cluster is a description, not a discovery.** k-means partitions whatever you give it. On 1,000 uniform random points in a square, with no groups at all, silhouette scores were near 0.4 in a test run. That is higher than the 0.29 for wine at $k=3$, where three cultivars really exist. So a good score does not prove that groups exist, and naming clusters "budget buyers" adds a story the algorithm did not supply.

A practical test of usefulness is to add cluster features to a baseline model, inside the pipeline so they are refit per fold, and see whether held-out error falls. If it does, the clusters are useful for that task. That still does not show they are natural kinds.

Read ISLP Section 12.4.1, then study the scikit-learn silhouette example.`,
          resources: [
            { title: 'ISLP, Section 12.4: Clustering Methods', url: 'https://www.statlearning.com/', type: 'textbook', cost: 'free', provider: 'James, Witten, Hastie, Tibshirani, Taylor', note: 'Section 12.4.1 on k-means. Note its practical warnings at the end of Section 12.4.', primary: true },
            { title: 'Clustering', url: 'https://scikit-learn.org/stable/modules/clustering.html', type: 'documentation', cost: 'free', provider: 'scikit-learn', note: 'K-means, then clustering performance evaluation.' },
            { title: 'Selecting the number of clusters with silhouette analysis', url: 'https://scikit-learn.org/stable/auto_examples/cluster/plot_kmeans_silhouette_analysis.html', type: 'documentation', cost: 'free', provider: 'scikit-learn' },
          ],
          exercises: [
            {
              slug: 'wine-choose-k',
              title: 'Choose k three ways',
              prompt:
                'On scaled wine data, for $k$ from 2 to 6, report inertia, silhouette, and stability: the mean adjusted Rand index between the full-data labels and labels predicted by models fitted on 30 bootstrap samples. Pick a $k$ and defend it. Only then compare your clusters with the true cultivar labels using the adjusted Rand index. Say what agreement shows here, and why you would not have this check on real unlabelled data.',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'clusters-from-noise',
              title: 'Clusters from nothing',
              prompt:
                'Draw 1,000 uniform points in the unit square and run k-means for $k$ from 2 to 8. Report silhouette and stability for each and plot the $k=4$ partition. Write the confident report a careless analyst might give for four segments, then write what you can honestly say. Compare with wine. Explain what the silhouette can and cannot show, and which of your checks gave a warning, if any.',
              kind: 'simulation',
              difficulty: 1,
              hint: 'Try a null reference: score the same k on uniform data with the same ranges as your real data.',
            },
            {
              slug: 'cluster-value',
              title: 'Do clusters add predictive value?',
              prompt:
                'On an 8,000-row sample of California housing, fit a `Ridge` baseline on scaled `MedInc`, `HouseAge` and `AveRooms`. Then add the distances to 12 k-means centroids fitted on scaled `Latitude` and `Longitude`, inside a `ColumnTransformer` so that they are refit per fold (`KMeans` has a `transform` method). Compare 5-fold RMSE, and repeat with `GroupKFold` on 1-degree blocks. Vary the number of clusters. Say what any improvement shows, and why it does not show that California has 12 natural regions.',
              kind: 'data-analysis',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does inertia alone not choose k?',
              answerOutline: 'It always falls as k grows, reaching 0 when every point is its own cluster. The elbow is a judgement and is often absent.',
            },
            {
              question: 'What does the adjusted Rand index measure?',
              answerOutline: 'Agreement between two partitions, corrected for chance: 1 is identical and about 0 is random.',
            },
            {
              question: 'What does "a cluster is a description, not a discovery" mean?',
              answerOutline: 'The algorithm partitions any data, so clusters summarise this sample. Evidence of real groups must come from stability, outside validation or domain knowledge.',
            },
          ],
          relatedLessons: ['machine-learning/unsupervised-learning/k-means-and-clustering'],
        },
        {
          slug: 'hierarchical-clustering-and-mixture-models',
          title: 'Hierarchical clustering and mixture models',
          summary:
            'Agglomerative clustering builds a tree of merges you can cut anywhere. Gaussian mixtures give soft assignments and a likelihood, so BIC can compare them, within limits.',
          estimatedMinutes: 90,
          objectives: [
            'Fit agglomerative clustering with Ward linkage and read a dendrogram',
            'Fit a Gaussian mixture and use soft assignments',
            'Compare covariance types and numbers of components with BIC',
            'Explain why a chosen model need not match the real groups',
          ],
          concepts: [
            'Agglomerative clustering',
            'Ward linkage',
            'Dendrogram height',
            'Gaussian mixture model',
            'Soft assignment',
            'Covariance types',
            'BIC',
            'Components are not groups',
          ],
          explanation: `**Agglomerative clustering** starts with every point alone and repeatedly merges the closest pair of clusters. **Ward linkage** merges the pair that adds the least within-cluster variance, which gives compact groups. The history is a **dendrogram**: the height of a join shows how different the merged groups were, so a long vertical gap suggests a natural place to cut. Horizontal order means nothing, so two leaves side by side need not be similar.

A **Gaussian mixture** assumes data come from $k$ overlapping normal distributions. Unlike k-means it gives **soft assignments**, a probability per component, which is honest about points near a boundary. The covariance type controls cluster shape:

- \`spherical\`: round, a single variance per component
- \`diag\`: axis-aligned ellipses
- \`tied\`: one shared ellipse shape
- \`full\`: each component has its own ellipse

Because a mixture has a likelihood, you can compare models with **BIC**, which rewards fit and penalises parameters. Lower is better.

\`\`\`python
from sklearn.datasets import fetch_openml
from sklearn.mixture import GaussianMixture
from sklearn.preprocessing import StandardScaler

p = fetch_openml('penguins', version=1, as_frame=True, parser='liac-arff').frame
cols = ['culmen_length_mm', 'culmen_depth_mm', 'flipper_length_mm', 'body_mass_g']
Z = StandardScaler().fit_transform(p.dropna(subset=cols)[cols].astype(float))
for cov in ('spherical', 'diag', 'tied', 'full'):
    bic = [GaussianMixture(k, covariance_type=cov, n_init=5, random_state=0).fit(Z).bic(Z)
           for k in range(1, 8)]
    print(cov, min(range(7), key=bic.__getitem__) + 1, min(bic))
\`\`\`

The result is instructive. There are three penguin species, and with \`full\` covariance BIC does pick $k=3$. But the lowest BIC overall comes from \`tied\` with $k=4$, and \`spherical\` keeps improving up to the largest $k$ tried. BIC selects the best density estimate under an assumed shape, so a component is not a species. If shapes are misspecified, it adds components to patch the fit.

Read ISLP Section 12.4.2, then compare with the scikit-learn BIC example.`,
          resources: [
            { title: 'ISLP, Section 12.4.2: Hierarchical Clustering', url: 'https://www.statlearning.com/', type: 'textbook', cost: 'free', provider: 'James, Witten, Hastie, Tibshirani, Taylor', note: 'Pay attention to how the book says to read a dendrogram.', primary: true },
            { title: 'Gaussian mixture models', url: 'https://scikit-learn.org/stable/modules/mixture.html', type: 'documentation', cost: 'free', provider: 'scikit-learn' },
            { title: 'Gaussian Mixture Model Selection', url: 'https://scikit-learn.org/stable/auto_examples/mixture/plot_gmm_selection.html', type: 'documentation', cost: 'free', provider: 'scikit-learn', note: 'BIC across covariance types.' },
            { title: 'Plot Hierarchical Clustering Dendrogram', url: 'https://scikit-learn.org/stable/auto_examples/cluster/plot_agglomerative_dendrogram.html', type: 'documentation', cost: 'free', provider: 'scikit-learn' },
          ],
          exercises: [
            {
              slug: 'penguin-dendrogram',
              title: 'Read a dendrogram',
              prompt:
                "Load `fetch_openml('penguins', version=1, as_frame=True, parser='liac-arff')`. Drop rows with missing measurements and scale the four measurements. Draw a Ward dendrogram with `scipy.cluster.hierarchy`, truncated for readability. Say where you would cut and why. Cut into 2, 3 and 4 groups and report the adjusted Rand index against species and against sex. Repeat with `single` linkage and describe what changed. Say what the agreement shows, and why it could not be measured without labels.",
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'bic-grid',
              title: 'BIC across shapes',
              prompt:
                'Extend the lesson code to plot BIC against $k$ for each covariance type. Report the overall winner, then the winner within `full`. Fit the `full` model at $k=3$ and report the adjusted Rand index against species, and the share of penguins whose largest membership probability is below 0.9. Look at those birds in a scatter plot. Say what soft assignment tells you here, and why the lowest BIC does not tell you how many species exist.',
              kind: 'data-analysis',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'How do you read a dendrogram?',
              answerOutline: 'Use the height of joins: higher means more different. Horizontal closeness carries no meaning.',
            },
            {
              question: 'What does a Gaussian mixture give you that k-means does not?',
              answerOutline: 'Soft membership probabilities, elliptical shapes through covariance types, and a likelihood usable in BIC.',
            },
            {
              question: 'BIC picks 4 components, but there are 3 species. What happened?',
              answerOutline: 'BIC selects a density estimate under assumed shapes. Extra components can patch shape mismatch, so components need not be real groups.',
            },
          ],
          relatedLessons: ['machine-learning/unsupervised-learning/gaussian-mixtures-and-em'],
        },
        {
          slug: 'principal-component-analysis',
          title: 'Principal component analysis',
          summary:
            'PCA finds directions of greatest variance. Read explained variance and loadings carefully, because scale and sign both change what you think you are seeing.',
          estimatedMinutes: 90,
          objectives: [
            'Fit PCA and read explained variance',
            'Read loadings and describe a component in plain language',
            'Show how scaling changes the answer',
            'Explain why the sign of a component is arbitrary',
            'Say what a large component does not show',
          ],
          concepts: [
            'Principal components',
            'Explained variance ratio',
            'Loadings',
            'Scores',
            'Sensitivity to scale',
            'Arbitrary sign',
            'Scree plot',
            'Variance is not relevance',
          ],
          explanation: `PCA finds an ordered set of perpendicular directions along which the data vary most. From your linear algebra course, these are eigenvectors of the covariance matrix, and scikit-learn computes them through the SVD. Each row gets **scores** (coordinates along the components), and each component has **loadings** (the weight of each original feature).

\`\`\`python
import numpy as np
from sklearn.datasets import load_wine
from sklearn.decomposition import PCA
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler

wine = load_wine()
print(PCA(2).fit(wine.data).explained_variance_ratio_)
pipe = make_pipeline(StandardScaler(), PCA(2)).fit(wine.data)
print(pipe[-1].explained_variance_ratio_)
top = np.abs(pipe[-1].components_[0]).argsort()[::-1][:3]
print([wine.feature_names[i] for i in top])
\`\`\`

**Scale decides the answer.** On raw wine data the first component explains 99.8 percent of the variance and is essentially \`proline\`, simply because that column has the largest numbers. After standardising, the first explains 36 percent. Neither is wrong, but the raw version describes units more than wine. Standardise unless features share meaningful units, such as pixel intensities.

**Signs are arbitrary.** A component and its negative describe the same axis, so software may flip it between runs or samples. Never write "high scores mean high alcohol" without checking the signs in that fit. When comparing fits, align signs first.

**Reading loadings.** Describe a component by the group of features with large weights, but treat the label as your interpretation, not a fact. Many small loadings usually mean no clean story exists.

**Variance is not relevance.** PCA ignores the target, so the largest direction may be irrelevant to your question, and a small one may carry the signal. If you use PCA before a model, put it in the pipeline and check whether it helps. It also assumes linear structure.

Use a scree plot, or keep enough components for a stated share of variance: \`PCA(0.9)\` on digits keeps 21 of 64.

Read ISLP Section 12.2.`,
          resources: [
            { title: 'ISLP, Section 12.2: Principal Components Analysis', url: 'https://www.statlearning.com/', type: 'textbook', cost: 'free', provider: 'James, Witten, Hastie, Tibshirani, Taylor', note: 'Includes the discussion of scaling and of sign uniqueness.', primary: true },
            { title: 'Decomposing signals in components', url: 'https://scikit-learn.org/stable/modules/decomposition.html', type: 'documentation', cost: 'free', provider: 'scikit-learn', note: 'The PCA section.' },
          ],
          exercises: [
            {
              slug: 'wine-loadings',
              title: 'Scale, loadings and a plain description',
              prompt:
                'Run the lesson code. Plot the scree curve and a scatter of the first two scores, coloured by cultivar, for raw and scaled data. For the scaled fit, list the top three loadings of each of the first two components with signs, and write one sentence describing each component. Say what the plot shows about the three cultivars, and why a component label such as "richness" is your interpretation and not something PCA measured.',
              kind: 'data-analysis',
              difficulty: 1,
            },
            {
              slug: 'sign-and-stability',
              title: 'Signs and stability of loadings',
              prompt:
                'On scaled wine data, fit PCA on 200 bootstrap samples. Record the first and second component loadings each time. Show the raw distribution of a large loading, then align each component to the full-data fit by flipping its sign when the dot product is negative. Report which loadings are stable. Do the same for the third and fourth components. Say why later components are less stable, and what that means for interpreting them. Note what bootstrap stability still cannot show about a different vineyard or year.',
              kind: 'simulation',
              difficulty: 3,
            },
            {
              slug: 'pca-before-model',
              title: 'Does PCA help a model?',
              prompt:
                'On `load_digits`, compare 5-fold accuracy for logistic regression on scaled pixels and on PCA with 5, 10, 20, 40 and 64 components, inside a pipeline. Record fit time. Then repeat on `load_breast_cancer`. Say what the reduction gains and costs on each dataset, and why a high accuracy here does not mean that the components correspond to meaningful parts of a digit.',
              kind: 'data-analysis',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why standardise before PCA in most tabular data?',
              answerOutline: 'PCA maximises variance, so a column with large units dominates unless columns are put on a comparable scale.',
            },
            {
              question: 'Why can the sign of a component flip?',
              answerOutline: 'A direction and its negative define the same axis and explain the same variance, so the sign is arbitrary.',
            },
            {
              question: 'Does the first component carry the most useful information for prediction?',
              answerOutline: 'Not necessarily. PCA ignores the target, so high variance does not imply relevance.',
            },
          ],
          relatedLessons: ['machine-learning/unsupervised-learning/pca-and-dimensionality-reduction'],
        },
        {
          slug: 't-sne-and-umap',
          title: 't-SNE and UMAP',
          summary:
            'These methods make striking 2-D maps of high-dimensional data by keeping neighbours close. Distances, sizes and gaps in the plot often mean little, so learn what you can claim.',
          estimatedMinutes: 90,
          objectives: [
            'Make t-SNE and UMAP embeddings, with PCA as a comparison',
            'Explain what perplexity and n_neighbors control',
            'State what distances and cluster sizes in the plot do not mean',
            'Show how seeds and settings change a map',
            'Treat clusters in a plot as hypotheses to be checked',
          ],
          concepts: [
            'Neighbourhood preservation',
            'Perplexity',
            'n_neighbors and min_dist',
            'Random seeds',
            'Meaningless distances between clusters',
            'Meaningless cluster sizes',
            'Clumps from noise',
            'Trustworthiness score',
          ],
          explanation: `PCA is a linear projection, and it often cannot separate structure that curls through high dimensions. **t-SNE** and **UMAP** instead try to keep each point's neighbours nearby in 2-D, using an optimisation that starts from an initial layout.

\`\`\`python
from sklearn.datasets import load_digits
from sklearn.manifold import TSNE, trustworthiness

X, y = load_digits(return_X_y=True)
for perplexity in (5, 30, 100):
    emb = TSNE(perplexity=perplexity, init='pca', random_state=0).fit_transform(X)
    print(perplexity, trustworthiness(X, emb))
\`\`\`

\`\`\`python
import umap
from sklearn.datasets import load_digits

X, y = load_digits(return_X_y=True)
emb = umap.UMAP(n_neighbors=15, min_dist=0.1, random_state=0).fit_transform(X)
print(emb.shape)
\`\`\`

**Settings.** \`perplexity\` in t-SNE and \`n_neighbors\` in UMAP set how many neighbours count, which trades local detail against global layout. There is no correct value, so always try several. \`min_dist\` in UMAP controls how tightly points pack. Different seeds give different maps.

**What you must not read from the plot:**

- **Distance between clusters.** Two groups far apart in the map need not be far apart in the data, and vice versa. These methods protect neighbours and spend little effort on large distances.
- **Cluster size.** t-SNE tends to equalise density, so a tight group and a spread-out group can look equally large.
- **That clusters exist.** At low perplexity, even pure noise can form clumps.

**What you can claim:** points that stay together across seeds and settings are probably neighbours in the original space. \`trustworthiness\` scores this numerically, from 0 to 1. A group in the plot is a hypothesis. Check it in the original features, with the stability tools from the k-means lesson or by testing predictive value.

Do not cluster on t-SNE coordinates and report the clusters as findings. The map has already distorted the distances that clustering relies on.

Read "How to Use t-SNE Effectively" and move every slider. It is the best resource on this topic. Then read UMAP's page on parameters.`,
          resources: [
            { title: 'How to Use t-SNE Effectively', url: 'https://distill.pub/2016/misread-tsne/', type: 'interactive', cost: 'free', provider: 'Wattenberg, Viegas, Johnson (Distill)', note: 'Read all of it and move the sliders.', primary: true },
            { title: 'Basic UMAP Parameters', url: 'https://umap-learn.readthedocs.io/en/latest/parameters.html', type: 'documentation', cost: 'free', provider: 'umap-learn', note: 'n_neighbors, min_dist and metric, each shown on the same data.' },
            { title: 'Using UMAP for Clustering', url: 'https://umap-learn.readthedocs.io/en/latest/clustering.html', type: 'documentation', cost: 'free', provider: 'umap-learn', note: 'When clustering on an embedding can work, and the caveats.' },
            { title: 'Manifold learning', url: 'https://scikit-learn.org/stable/modules/manifold.html', type: 'documentation', cost: 'free', provider: 'scikit-learn', note: 'See the tips on practical use of t-SNE.' },
          ],
          exercises: [
            {
              slug: 'digits-maps',
              title: 'Three maps of digits',
              prompt:
                'On `load_digits`, plot PCA, t-SNE and UMAP side by side, coloured by digit. For t-SNE use perplexity 5, 30 and 100, and for UMAP use `n_neighbors` 5, 15 and 50. Report `trustworthiness` for each. Refit the best of each with 3 seeds. Note which digit groups stay together and which move. Say what you can claim from these maps, and what you cannot claim about how similar two digits are from how far apart they appear.',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'lying-sizes',
              title: 'Sizes and gaps that lie',
              prompt:
                'Using `make_blobs`, create three 10-dimensional groups of 300 points each: A and B close together, C far away, with cluster standard deviations 0.5, 3 and 1. Compute true centre distances and true spreads. Run t-SNE at perplexity 5, 30 and 100 and measure the same quantities in the embedding. Put true and embedded numbers in a table. Then run t-SNE on 500 points of 10-dimensional Gaussian noise at low perplexity and describe what you see. Say what this shows about reading maps, and why it does not make the maps useless.',
              kind: 'simulation',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What does perplexity control?',
              answerOutline: 'Roughly how many neighbours each point considers, which trades local against broader structure. Try several values.',
            },
            {
              question: 'Two clusters are far apart on a t-SNE map. What can you conclude?',
              answerOutline: 'Very little. Distances between clusters are not reliably preserved, so check in the original space.',
            },
            {
              question: 'How should you treat a group that appears in a UMAP plot?',
              answerOutline: 'As a hypothesis. Check that it survives seeds and settings, then test it in the original features or by predictive value.',
            },
          ],
          relatedLessons: ['machine-learning/unsupervised-learning/pca-and-dimensionality-reduction'],
        },
      ],
    },
    {
      slug: 'deep-learning',
      title: 'Deep Learning',
      description:
        'Small neural networks in PyTorch on a laptop CPU: layers, the training loop, convolution, transfer learning and embeddings, and an honest view of when a network is not worth it.',
      lessons: [
        {
          slug: 'neurons-and-layers',
          title: 'Neurons and layers',
          summary:
            'A neuron is logistic regression with a chosen activation. Stack layers and the network learns its own features, which is the idea that matters most here.',
          estimatedMinutes: 75,
          objectives: [
            'Describe a neuron as a weighted sum plus an activation',
            'Explain why non-linear activations are required',
            'Build a small network and count its parameters',
            'Explain a network as a learned feature map plus a simple model',
          ],
          concepts: [
            'Neuron',
            'Activation functions (ReLU, sigmoid)',
            'Hidden layer',
            'Forward pass',
            'Parameters: weights and biases',
            'Learned feature map',
            'Width and depth',
          ],
          explanation: `A **neuron** computes a weighted sum of its inputs and applies an **activation**: $a = \\sigma(w^\\top x + b)$. With a sigmoid activation, that is exactly logistic regression, so you already know one neuron.

A **layer** is many neurons reading the same inputs, and a network stacks layers. Without a non-linear activation, stacking does nothing, since a linear function of a linear function is still linear. **ReLU**, $\\max(0, x)$, is the standard choice: simple, and it trains well.

\`\`\`python
import torch
from torch import nn

net = nn.Sequential(nn.Linear(2, 8), nn.ReLU(), nn.Linear(8, 1))
x = torch.rand(4, 2)
print(net(x).shape)
print(sum(p.numel() for p in net.parameters()))
\`\`\`

The parameter count is 33: from 2 inputs to 8 neurons takes $2 \\times 8$ weights plus 8 biases, and from 8 to 1 takes 8 weights plus 1 bias.

The most useful way to think about this network is in two parts. Everything before the last layer is a **learned feature map**, which turns the raw input into new columns. The last layer is a plain linear or logistic model on those columns. In Module 1 you made features by hand with splines and interactions. A network learns them from data, and that is its whole advantage. It is also why networks shine on images, audio and text, where good hand-made features are hard to write, and less so on tables, where columns are often already meaningful.

Width adds more features per layer and depth lets features build on features. More of either means more parameters, so the same bias and variance thinking still applies, and the same validation rules hold.

The derivations of backpropagation are in the \`deep-learning\` course. Here it is enough to know that PyTorch computes the gradients for you.

Watch the first 3Blue1Brown video in the series, and spend time with the TensorFlow Playground on the circle dataset.`,
          resources: [
            { title: 'Neural networks series', url: 'https://www.3blue1brown.com/topics/neural-networks', type: 'video', cost: 'free', provider: '3Blue1Brown', note: 'The first video covers neurons and layers visually.', primary: true },
            { title: 'TensorFlow Playground', url: 'https://playground.tensorflow.org/', type: 'interactive', cost: 'free', provider: 'TensorFlow', note: 'Remove the hidden layers on the circle data, then add them back. Watch what each neuron learns.' },
            { title: 'ISLP, Section 10.1: Single Layer Neural Networks', url: 'https://www.statlearning.com/', type: 'textbook', cost: 'free', provider: 'James, Witten, Hastie, Tibshirani, Taylor', note: 'Sections 10.1 and 10.2, with a statistician\'s view of the same model.' },
          ],
          exercises: [
            {
              slug: 'circles-feature-map',
              title: 'See a learned feature map',
              prompt:
                "Make `make_circles(1000, noise=0.08, factor=0.5, random_state=0)`, then split it. Report test accuracy for logistic regression, then for `MLPClassifier(hidden_layer_sizes=(8,), max_iter=3000, random_state=0)`, which is the same shape as the lesson network. Compute the hidden layer yourself from `coefs_` and `intercepts_`, as `np.maximum(0, X @ W + b)`. Fit a plain logistic regression on those 8 columns and report its accuracy. Say what this shows about hidden layers as features, and why those features do not have a human meaning you can read off.",
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'count-parameters',
              title: 'Count parameters by hand',
              prompt:
                'By hand, count parameters for a network mapping 784 inputs through hidden layers of 128 and 64 to 10 outputs. Check your count with PyTorch. Then count the parameters of a logistic regression on the same inputs and outputs. Compare both with the 60,000 rows of FashionMNIST. Say what the ratio suggests about overfitting risk, and why counting parameters alone does not predict how well a network generalises.',
              kind: 'problem',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'How does a single neuron relate to logistic regression?',
              answerOutline: 'With a sigmoid activation it is the same model: a weighted sum passed through a sigmoid.',
            },
            {
              question: 'Why do we need non-linear activations?',
              answerOutline: 'Without them, stacked linear layers collapse into one linear map, so depth would add nothing.',
            },
            {
              question: 'What does "learned feature map" mean?',
              answerOutline: 'The hidden layers turn inputs into new features learned from data, and the last layer is a simple model on those features.',
            },
          ],
          relatedLessons: ['deep-learning/neural-network-foundations/from-linear-models-to-neural-networks'],
        },
        {
          slug: 'training-with-pytorch',
          title: 'Training with PyTorch',
          summary:
            'Tensors, autograd, nn.Module, DataLoader and the training loop you will write every time, with validation and early stopping built in from the start.',
          estimatedMinutes: 115,
          objectives: [
            'Create tensors and use autograd to get a gradient',
            'Define a model with nn.Module',
            'Load batches with DataLoader',
            'Write a training loop with validation',
            'Add early stopping and restore the best weights',
            'Debug by overfitting one batch',
          ],
          concepts: [
            'Tensors',
            'Autograd and backward()',
            'nn.Module',
            'DataLoader and batches',
            'Optimiser step',
            'train() and eval() modes',
            'torch.no_grad()',
            'Early stopping',
            'Overfitting one batch',
          ],
          explanation: `A **tensor** is an array that can record how it was computed. Call \`.backward()\` on a result and **autograd** fills in the gradients. You define the model by subclassing \`nn.Module\` or with \`nn.Sequential\`, and \`DataLoader\` serves shuffled mini-batches.

Every training loop has the same five steps per batch: predict, compute loss, clear old gradients, backpropagate, step.

\`\`\`python
import torch
from sklearn.datasets import load_digits
from sklearn.model_selection import train_test_split
from torch import nn
from torch.utils.data import DataLoader, TensorDataset

X, y = load_digits(return_X_y=True)
X = torch.tensor(X / 16, dtype=torch.float32)
y = torch.tensor(y)
X_tr, X_va, y_tr, y_va = train_test_split(X, y, test_size=0.25, random_state=0)
loader = DataLoader(TensorDataset(X_tr, y_tr), batch_size=64, shuffle=True)
model = nn.Sequential(nn.Linear(64, 64), nn.ReLU(), nn.Linear(64, 10))
opt = torch.optim.Adam(model.parameters(), lr=1e-3)
loss_fn = nn.CrossEntropyLoss()
best, wait = float('inf'), 0
for epoch in range(200):
    model.train()
    for xb, yb in loader:
        opt.zero_grad()
        loss_fn(model(xb), yb).backward()
        opt.step()
    model.eval()
    with torch.no_grad():
        val = loss_fn(model(X_va), y_va).item()
    if val < best:
        best, wait = val, 0
        state = {k: v.clone() for k, v in model.state_dict().items()}
    else:
        wait += 1
        if wait == 5:
            break
model.load_state_dict(state)
print(epoch, best)
\`\`\`

**Early stopping** keeps the best weights seen on validation data and stops after several epochs without improvement. It is the same idea as in boosting. The validation set guides training, so it is not a clean test, and you still need separate test rows.

Pitfalls: forgetting \`zero_grad\` accumulates gradients. \`CrossEntropyLoss\` expects raw scores, so do not add a softmax. \`model.eval()\` matters for layers such as dropout.

**A debugging habit.** Before a long run, train on one small batch. The loss should reach nearly zero. If it cannot, something is broken, and a full run will only hide it.

Work through the PyTorch "Learn the Basics" tutorial in order, typing the code rather than reading it.`,
          resources: [
            { title: 'Learn the Basics', url: 'https://docs.pytorch.org/tutorials/beginner/basics/intro.html', type: 'documentation', cost: 'free', provider: 'PyTorch', note: 'Do all seven parts: tensors, datasets, transforms, models, autograd, optimisation, saving.', primary: true },
            { title: 'Practical Deep Learning for Coders', url: 'https://course.fast.ai/', type: 'course', cost: 'free', provider: 'fast.ai', note: 'Optional top-down companion. Lesson 1 shows what a few lines can do.' },
            { title: 'torch.nn reference', url: 'https://docs.pytorch.org/docs/stable/nn.html', type: 'documentation', cost: 'free', provider: 'PyTorch', note: 'Look layers and losses up here as you need them.' },
          ],
          exercises: [
            {
              slug: 'fashion-mlp',
              title: 'A complete training run',
              prompt:
                "Download FashionMNIST with `torchvision.datasets.FashionMNIST`. Keep the test split aside, and hold out 5,000 training images as validation. Adapt the lesson loop to a network with one hidden layer of 128 units and batch size 128, with early stopping. Plot training and validation loss per epoch. Report the stopping epoch, the test accuracy once, the wall time, and a logistic regression baseline fitted the same way. Say what the test score shows, and why it does not show that the model recognises clothing in photographs taken in other conditions.",
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'overfit-one-batch',
              title: 'The overfit-one-batch test',
              prompt:
                'Take a single batch of 32 images from your FashionMNIST setup and train on only that batch for 300 steps. Report the final loss. Then plant three bugs, one at a time: labels shuffled against images, a learning rate of 10, and `zero_grad` removed. Report how the loss curve looks in each case. Say what this test can reveal, and why passing it does not show the model will generalise.',
              kind: 'coding',
              difficulty: 1,
            },
            {
              slug: 'autograd-check',
              title: 'Check autograd against a slope',
              prompt:
                'Fit $y = 3x + 2 + \\varepsilon$ with one `nn.Linear(1, 1)`, using a loop over the whole dataset with SGD. Print the learned weights. At one point, compare `w.grad` from autograd with a finite difference of the loss. Then fit the same data with `LinearRegression` and compare. Say what this shows about training as ordinary numerical optimisation, and what it does not show about larger networks, which have no single best answer to compare against.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What are the five steps of a training step, in order?',
              answerOutline: 'Forward pass, compute loss, zero gradients, backward, optimiser step. Zeroing may come first, but it must precede backward.',
            },
            {
              question: 'Why call model.eval() and use torch.no_grad() in validation?',
              answerOutline: 'eval() switches layers such as dropout to inference behaviour. no_grad() stops gradient tracking, saving time and memory.',
            },
            {
              question: 'Early stopping used the validation set. Can you report that loss as your final estimate?',
              answerOutline: 'No. It guided training, so it is optimistic. Report one score on separate test data.',
            },
          ],
          relatedLessons: ['deep-learning/neural-network-foundations/pytorch-and-the-training-loop'],
        },
        {
          slug: 'convolutional-networks',
          title: 'Convolutional networks',
          summary:
            'A convolution slides a small learned filter across its input, which assumes nearby values belong together. It applies to images in 2-D and token sequences in 1-D.',
          estimatedMinutes: 105,
          objectives: [
            'Explain convolution, weight sharing and pooling',
            'Build a small CNN and trace its tensor shapes',
            'Compare a CNN with a fully connected network on parameters and accuracy',
            'Apply a 1-D convolution to a token sequence',
            'State what assumption a convolution makes',
          ],
          concepts: [
            'Convolution as a sliding filter',
            'Weight sharing',
            'Channels',
            'Pooling',
            'Receptive field',
            '2-D convolution on images',
            '1-D convolution on token sequences',
            'Locality assumption',
          ],
          explanation: `A fully connected layer gives every pixel its own weight, so it has to learn "edge" separately at every position. A **convolution** slides one small filter over the input, so the same weights are reused everywhere. This **weight sharing** cuts parameters drastically and builds in the assumption that nearby values belong together and that a pattern means the same thing wherever it appears.

**Pooling** shrinks the result, for example keeping the maximum of each 2 by 2 block. This cheaply widens what later layers can see, called the **receptive field**. Early filters tend to respond to edges, and later ones to larger shapes.

\`\`\`python
import torch
from torch import nn

cnn = nn.Sequential(
    nn.Conv2d(1, 16, 3, padding=1), nn.ReLU(), nn.MaxPool2d(2),
    nn.Conv2d(16, 32, 3, padding=1), nn.ReLU(), nn.MaxPool2d(2),
    nn.Flatten(), nn.Linear(32 * 7 * 7, 10))
print(cnn(torch.zeros(2, 1, 28, 28)).shape)

class TextCNN(nn.Module):
    def __init__(self, vocab, classes):
        super().__init__()
        self.embed = nn.Embedding(vocab, 64, padding_idx=0)
        self.conv = nn.Conv1d(64, 64, kernel_size=5, padding=2)
        self.out = nn.Linear(64, classes)

    def forward(self, tokens):
        h = self.embed(tokens).transpose(1, 2)
        return self.out(torch.relu(self.conv(h)).amax(dim=2))

print(TextCNN(1000, 4)(torch.ones(2, 200, dtype=torch.long)).shape)
\`\`\`

The same idea works in one dimension. A sentence is a sequence of token ids, and \`nn.Embedding\` turns each id into a learned vector, which the next lesson covers. A **1-D convolution** over those vectors acts as a detector for short phrases, and taking the maximum over the sequence asks "did this phrase pattern occur anywhere?". Note the \`transpose\`: \`Conv1d\` expects channels before length.

The assumption matters. Shuffle every image's pixels by one fixed permutation and locality is gone. On 10,000 FashionMNIST images, a CNN fell from 0.83 to 0.79 while a fully connected network stayed at 0.83. A CNN's strength comes from structure in the data, which is also why a table of unrelated columns gives a convolution nothing to use.

Read the CS231n convolutional networks notes through the layer patterns section, and play with CNN Explainer.`,
          resources: [
            { title: 'Convolutional Neural Networks for Visual Recognition: notes', url: 'https://cs231n.github.io/convolutional-networks/', type: 'course', cost: 'free', provider: 'Stanford CS231n', note: 'Read the sections on layers and layer patterns.', primary: true },
            { title: 'CNN Explainer', url: 'https://poloclub.github.io/cnn-explainer/', type: 'interactive', cost: 'free', provider: 'Georgia Tech Polo Club', note: 'Trace one image through every layer.' },
            { title: 'Training a Classifier', url: 'https://docs.pytorch.org/tutorials/beginner/blitz/cifar10_tutorial.html', type: 'documentation', cost: 'free', provider: 'PyTorch', note: 'A small CNN on CIFAR-10.' },
            { title: 'torch.nn.Conv1d', url: 'https://docs.pytorch.org/docs/stable/generated/torch.nn.Conv1d.html', type: 'documentation', cost: 'free', provider: 'PyTorch', note: 'Check the shape convention.' },
          ],
          exercises: [
            {
              slug: 'cnn-against-mlp',
              title: 'CNN against fully connected',
              prompt:
                'On 10,000 FashionMNIST training images, train the lesson CNN and a fully connected network with one hidden layer of 128 units, for 5 epochs each. Report parameters, test accuracy and time. Then apply one fixed random permutation of pixels to all images and train both again. Report the new scores. Explain the change in each. Say what this shows about what a convolution assumes, and why it does not show CNNs are the right choice for all grid-shaped data.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'text-cnn-tokens',
              title: 'A 1-D convolution on text',
              prompt:
                "Use `fetch_20newsgroups` with four categories and `remove=('headers', 'footers', 'quotes')`. Build a vocabulary of 8,000 words, encode documents as 200 token ids with 0 as padding, and train the lesson's `TextCNN` for 8 epochs with Adam. Compare test accuracy with TF-IDF plus logistic regression from scikit-learn. Report both and the training time. Say which you would ship on a CPU, and why this comparison on four topics does not settle CNN against TF-IDF on other text tasks.",
              kind: 'coding',
              difficulty: 3,
              hint: 'Fit the vocabulary on training documents only.',
            },
          ],
          selfAssessment: [
            {
              question: 'What does weight sharing give you?',
              answerOutline: 'Far fewer parameters, and a pattern learned at one position is recognised at all positions.',
            },
            {
              question: 'What does a 1-D convolution over token embeddings detect?',
              answerOutline: 'Short phrase-like patterns across adjacent tokens. Max pooling then asks whether a pattern appeared anywhere.',
            },
            {
              question: 'Why does randomly permuting pixels hurt a CNN more than a fully connected network?',
              answerOutline: 'A CNN relies on local structure, which the permutation destroys. A fully connected network has no such assumption to lose.',
            },
          ],
          relatedLessons: ['deep-learning/convolutional-networks-and-vision/convolution-and-cnn-building-blocks'],
        },
        {
          slug: 'transfer-learning-and-embeddings',
          title: 'Transfer learning and embeddings',
          summary:
            'Someone already trained a large model on a large dataset. Freeze it, use its learned features, and fit something small on top. This is the most useful deep learning trick on a CPU.',
          estimatedMinutes: 115,
          objectives: [
            'Freeze a pretrained torchvision model and train a new final layer',
            'Use a frozen network as a feature extractor for scikit-learn',
            'Create sentence embeddings with sentence-transformers',
            'Explain torch.nn.Embedding and how it differs from a pretrained encoder',
            'Feed embeddings into a simple classifier and compare with a baseline',
          ],
          concepts: [
            'Pretrained model',
            'Freezing weights',
            'Replacing the final layer',
            'Feature extraction',
            'Sentence embeddings',
            'all-MiniLM-L6-v2',
            'torch.nn.Embedding',
            'Cosine similarity',
            'Fit of pretrained data to your task',
          ],
          explanation: `A network's early layers learn general features, and only its last layers are specific to its original task. So you can take a model trained on millions of images, **freeze** its weights, and replace the final layer. Training that small layer needs far less data and time than training from scratch.

\`\`\`python
import torch
from torch import nn
from torchvision import models

weights = models.ResNet18_Weights.DEFAULT
net = models.resnet18(weights=weights)
for p in net.parameters():
    p.requires_grad = False
net.fc = nn.Linear(net.fc.in_features, 10)
print(sum(p.numel() for p in net.parameters() if p.requires_grad))
\`\`\`

An even simpler route on a CPU: set \`net.fc = nn.Identity()\`, run your images through once to get feature vectors, and fit \`LogisticRegression\` on them.

The same trick works on text. A **sentence embedding** model maps a sentence to a fixed-length vector so that similar meanings land near each other, compared with cosine similarity.

\`\`\`python
from sentence_transformers import SentenceTransformer
from sklearn.linear_model import LogisticRegression

texts = ['the rocket reached orbit', 'the engine needs new oil',
         'the shuttle launched today', 'my car has a flat tyre']
labels = [1, 0, 1, 0]
encoder = SentenceTransformer('all-MiniLM-L6-v2', device='cpu')
vectors = encoder.encode(texts)
clf = LogisticRegression().fit(vectors, labels)
print(vectors.shape, clf.predict(encoder.encode(['a satellite in orbit'])))
\`\`\`

\`torch.nn.Embedding\` is different. It is an empty lookup table from token ids to vectors, learned from your labels. It knows nothing at the start, so it needs plenty of data, whereas a pretrained encoder brings outside knowledge. With 200 labels on four newsgroup topics, MiniLM embeddings reached 0.86 accuracy against 0.59 for TF-IDF. With all 2,365 labels, it was 0.89 against 0.85.

Pitfalls: use the preprocessing the weights expect, such as \`weights.transforms()\`. A model trained on everyday photos may suit X-rays poorly. And biases in the pretrained data come along with its features.

Read the CS231n transfer learning notes, then the sentence-transformers quickstart.`,
          resources: [
            { title: 'Transfer Learning', url: 'https://cs231n.github.io/transfer-learning/', type: 'course', cost: 'free', provider: 'Stanford CS231n', note: 'When to freeze and when to fine-tune.', primary: true },
            { title: 'Transfer Learning for Computer Vision Tutorial', url: 'https://docs.pytorch.org/tutorials/beginner/transfer_learning_tutorial.html', type: 'documentation', cost: 'free', provider: 'PyTorch', note: 'Read the "ConvNet as fixed feature extractor" part.' },
            { title: 'Sentence Transformers quickstart', url: 'https://sbert.net/docs/quickstart.html', type: 'documentation', cost: 'free', provider: 'Sentence Transformers' },
            { title: 'all-MiniLM-L6-v2 model card', url: 'https://huggingface.co/sentence-transformers/all-MiniLM-L6-v2', type: 'documentation', cost: 'free', provider: 'Hugging Face', note: 'Check what it was trained on and how long an input it reads.' },
          ],
          exercises: [
            {
              slug: 'frozen-resnet',
              title: 'Features from a frozen ResNet',
              prompt:
                "Download CIFAR-10 with torchvision. Take the first 2,000 training images and 1,000 test images, resize them to 96 pixels and normalise with the ImageNet means. Extract features with a frozen `resnet18` (`net.fc = nn.Identity()`), and fit a scaled `LogisticRegression`. Compare test accuracy and total time with a small CNN trained from scratch on the same 2,000 images for 10 epochs. Report both. Say what the gap shows about reused features with few labels, and what it does not show about a task unlike ImageNet, such as medical scans.",
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'embeddings-against-tfidf',
              title: 'Embeddings against TF-IDF with few labels',
              prompt:
                "Use the four-category `fetch_20newsgroups` split. Encode documents with `all-MiniLM-L6-v2` on CPU, recording the time. Fit `LogisticRegression` on the embeddings and on TF-IDF, at training sizes of 50, 200, 1000 and all rows, using the same random subsets. Plot test accuracy against labels. Find where the curves cross, if they do. Say what the plot shows about pretrained knowledge, and why it does not show that an embedding captures everything in a long document, given the model's input limit.",
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'learned-embedding-layer',
              title: 'A learned embedding layer',
              prompt:
                'Using your encoded tokens from the 1-D convolution exercise, build a classifier with `nn.Embedding(vocab, 64, padding_idx=0)`, the mean of the token vectors, and one linear layer. Train it on all rows and on 200 rows. Compare with logistic regression on MiniLM embeddings at those sizes. Afterwards, find the nearest neighbours of two words by cosine similarity in the learned table. Say what the table learned, and why neighbouring words reflect these four topics and not meaning in general.',
              kind: 'coding',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'What does freezing a network do, and why is it useful?',
              answerOutline: 'It stops weights updating, so only the new final layer trains. That needs little data and little compute.',
            },
            {
              question: 'How does torch.nn.Embedding differ from a sentence-transformers model?',
              answerOutline: 'nn.Embedding is an untrained lookup table learned from your labels. A sentence-transformers model is pretrained and encodes whole sentences.',
            },
            {
              question: 'When could transfer learning disappoint?',
              answerOutline: 'When the target data differ greatly from the pretrained data, or when preprocessing does not match what the weights expect.',
            },
          ],
          relatedLessons: [
            'deep-learning/convolutional-networks-and-vision/transfer-learning-and-fine-tuning',
            'deep-learning/sequence-models-and-transformers/tokens-embeddings-and-language-modelling',
          ],
        },
        {
          slug: 'working-on-a-cpu',
          title: 'Working on a CPU',
          summary:
            'Deep learning without a GPU is a matter of budgeting. Control threads and batch size, cache what is expensive, shrink inputs, subsample, and know when not to use a network at all.',
          estimatedMinutes: 90,
          objectives: [
            'Measure how batch size and thread count change throughput',
            'Cache embeddings to disk and invalidate the cache correctly',
            'Plan a run within a stated time budget',
            'Use small images and subsampling sensibly',
            'Decide when a neural network is not worth it on tabular data',
          ],
          concepts: [
            'torch.set_num_threads',
            'Batch size and throughput',
            'Caching to disk',
            'Cache keys',
            'Small images',
            'Subsampling and learning curves',
            'Time budgets',
            'Neural networks on tabular data',
          ],
          explanation: `Without a GPU, time is your scarcest resource, so treat it as a budget. Before a long run, time 10 batches, multiply up, and decide whether that fits. Write the budget down: "this experiment gets 20 minutes."

**Threads and batches.** \`torch.set_num_threads(n)\` sets how many cores a tensor operation uses. More threads help up to about your physical core count, and then the gain flattens. Larger batches process more samples per second, up to a point, but each step gets less frequent, and memory rises. Measure on your own machine rather than trusting advice.

**Cache anything expensive.** Features from a frozen model never change, so compute them once.

\`\`\`python
import hashlib
from pathlib import Path
import numpy as np

def cached(texts, encode, name, folder='features'):
    key = hashlib.sha256((name + '\\n'.join(texts)).encode()).hexdigest()[:16]
    path = Path(folder) / f'{key}.npy'
    if path.exists():
        return np.load(path)
    path.parent.mkdir(exist_ok=True)
    vectors = encode(texts)
    np.save(path, vectors)
    return vectors

print(cached(['a', 'b'], lambda t: np.zeros((len(t), 3)), 'demo').shape)
\`\`\`

The key includes the model name and the input, so a change to either recomputes rather than silently reusing stale results. After caching, trying ten classifiers takes seconds.

**Shrink the problem.** Use smaller images, since cost grows with pixel count. Subsample while developing, and let a learning curve tell you whether more rows are worth the time. Freeze rather than fine-tune. Prefer an hour of well-chosen experiments to one long run.

**When a network is not worth it.** On tabular data, gradient boosting usually matches or beats a neural network, trains in seconds, needs less tuning, and handles missing values and categories natively. Columns in a table rarely have the local structure that convolutions exploit. Reach for networks when the input is images, text or audio, or when you can reuse pretrained features.

Read the first half of the PyTorch performance tuning guide, and read the Grinsztajn paper's summary of why trees do well on tables.`,
          resources: [
            { title: 'Performance Tuning Guide', url: 'https://docs.pytorch.org/tutorials/recipes/recipes/tuning_guide.html', type: 'documentation', cost: 'free', provider: 'PyTorch', note: 'Read the general and CPU-specific sections. Skip the GPU parts.', primary: true },
            { title: 'torch.set_num_threads', url: 'https://docs.pytorch.org/docs/stable/generated/torch.set_num_threads.html', type: 'documentation', cost: 'free', provider: 'PyTorch' },
            { title: 'Why do tree-based models still outperform deep learning on tabular data?', url: 'https://arxiv.org/abs/2207.08815', type: 'article', cost: 'free', provider: 'Grinsztajn, Oyallon, Varoquaux', note: 'Read the introduction and the discussion of why.' },
          ],
          exercises: [
            {
              slug: 'throughput-table',
              title: 'Measure your machine',
              prompt:
                'Using the small CNN from the convolution lesson on 10,000 FashionMNIST images, time one epoch for each combination of `torch.set_num_threads` in 1, 2 and 4 and batch size in 32, 128 and 512. Report samples per second in a table and the validation accuracy after 3 epochs for each batch size. Work out how long 20 epochs would take at your best setting. Say what the table shows about this machine, and why it should not be quoted as a general rule.',
              kind: 'coding',
              difficulty: 1,
            },
            {
              slug: 'cache-embeddings',
              title: 'Cache and invalidate',
              prompt:
                'Wrap MiniLM encoding of the four-category `fetch_20newsgroups` split with the `cached` function. Report the first and second run times. Change one document and confirm the cache misses, then change the model to `paraphrase-MiniLM-L3-v2` and confirm it misses again. Then write down one way this key could still return stale results, such as a new version of a library. State what caching guarantees here, and what it does not.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'tabular-showdown',
              title: 'Is a network worth it on a table?',
              prompt:
                'On California housing, compare `HistGradientBoostingRegressor` with default settings against a PyTorch network with two hidden layers of 64 units, trained for 40 epochs on standardised inputs, using the same split. Report test RMSE, fit time and lines of code. Then give the network a budget of 10 times the boosting fit time and tune it as well as you can. Say which you would keep and why, and why one dataset does not establish the general claim, though it does fit it.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why might raising threads past your core count not help?',
              answerOutline: 'Threads then compete for the same cores, and overhead rises, so throughput flattens or falls.',
            },
            {
              question: 'What must a cache key include?',
              answerOutline: 'Everything that changes the output: the inputs, the model and its settings, otherwise it can return stale results.',
            },
            {
              question: 'When is a neural network usually not worth it?',
              answerOutline: 'On ordinary tabular data, where boosting is often as good, far faster and easier to tune, unless pretrained features apply.',
            },
          ],
        },
      ],
    },
    {
      slug: 'interpretability-and-communication',
      title: 'Interpretability and Communication',
      description:
        'Explaining what a fitted model does, without claiming more than it shows. Importance, partial dependence and SHAP describe the model, cause needs a different argument, and a report has to state its limits.',
      lessons: [
        {
          slug: 'coefficients-and-permutation-importance',
          title: 'Coefficients and permutation importance',
          summary:
            'Coefficients mislead under correlation. Permutation importance on held-out data measures what a model relies on, and grouping correlated features keeps the answer honest.',
          estimatedMinutes: 95,
          objectives: [
            'Explain why coefficients mislead when features are correlated',
            'Compute permutation importance on held-out data',
            'Explain why importance must not be measured on training data',
            'Use grouped permutation for correlated features',
            'State what permutation importance does and does not measure',
          ],
          concepts: [
            'Collinearity and unstable coefficients',
            'Standardised coefficients',
            'Permutation importance',
            'Held-out importance',
            'Impurity-based importance',
            'Shared credit among correlated features',
            'Grouped permutation',
            'Importance to the model, not the world',
          ],
          explanation: `A coefficient is conditional on everything else in the model. On California housing, \`AveRooms\` has a positive coefficient alone, stays positive alongside \`AveBedrms\`, and turns negative with all eight features. Standardising makes coefficients comparable in scale, but it does not repair this.

**Permutation importance** asks a simpler question: if I shuffle one column, breaking its link with the target, how much does this model's score fall?

\`\`\`python
import numpy as np
from sklearn.datasets import fetch_california_housing
from sklearn.ensemble import HistGradientBoostingRegressor
from sklearn.inspection import permutation_importance
from sklearn.model_selection import train_test_split

X, y = fetch_california_housing(return_X_y=True, as_frame=True)
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.25, random_state=0)
model = HistGradientBoostingRegressor(random_state=0).fit(X_tr, y_tr)
result = permutation_importance(model, X_te, y_te, n_repeats=10, random_state=0)
print(dict(zip(X.columns, result.importances_mean.round(3))))

pair = ['Latitude', 'Longitude']
moved = X_te.copy()
moved[pair] = X_te[pair].to_numpy()[np.random.default_rng(0).permutation(len(X_te))]
print(model.score(X_te, y_te) - model.score(moved, y_te))
\`\`\`

**Use held-out data.** On training rows, a model appears to rely on patterns it merely memorised. A random noise column scored 0.018 on training rows of a forest and 0.001 on test rows. Impurity-based \`feature_importances_\` come from training and can credit noise in the same way.

**Correlation splits the credit.** Add a near-copy of \`MedInc\` and the model can use either, so shuffling one barely hurts. In one run its importance fell from 0.53 to 0.21, with 0.09 on the copy. Neither number means income matters less.

**Group correlated features.** Shuffle them together, as above for location. Permuting latitude alone also creates places that do not exist, with rows in parts of the map that have no data. Here the pair scored about 0.47, which is less than latitude alone at 0.83, because the single-column shuffle was partly measuring nonsense inputs.

Importance describes this fitted model on this data. It says nothing about what would happen if the feature changed.

Read Molnar's chapter, then the two scikit-learn examples.`,
          resources: [
            { title: 'Interpretable Machine Learning: Permutation Feature Importance', url: 'https://christophm.github.io/interpretable-ml-book/feature-importance.html', type: 'textbook', cost: 'free', provider: 'Christoph Molnar', note: 'Includes the debate over training or test data, and correlated features.', primary: true },
            { title: 'Permutation feature importance', url: 'https://scikit-learn.org/stable/modules/permutation_importance.html', type: 'documentation', cost: 'free', provider: 'scikit-learn' },
            { title: 'Permutation Importance with Multicollinear or Correlated Features', url: 'https://scikit-learn.org/stable/auto_examples/inspection/plot_permutation_importance_multicollinear.html', type: 'documentation', cost: 'free', provider: 'scikit-learn', note: 'Clustering correlated features before measuring importance.' },
            { title: 'Common pitfalls in the interpretation of coefficients of linear models', url: 'https://scikit-learn.org/stable/auto_examples/inspection/plot_linear_model_coefficient_interpretation.html', type: 'documentation', cost: 'free', provider: 'scikit-learn', note: 'A long worked example. Read the sections on scaling and correlation.' },
          ],
          exercises: [
            {
              slug: 'train-or-test',
              title: 'Importance on training and test rows',
              prompt:
                'On a 6,000-row sample of California housing, add one column of random noise. Fit a `RandomForestRegressor`. Report the importance of every feature three ways: `feature_importances_`, permutation on training rows, and permutation on test rows. Plot them side by side and say where the noise column ranks in each. Explain the differences. Say what the test version shows, and why even that does not rank which factors truly drive house values.',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'split-credit',
              title: 'Correlated features split the credit',
              prompt:
                'Run the lesson model, then add `MedInc2`, equal to `MedInc` plus noise with standard deviation 0.05, and refit. Report permutation importance of `MedInc` and `MedInc2` individually, then grouped. Repeat with a linear model and compare its coefficients on the two columns. Then do the latitude and longitude comparison, and count how many test rows a single-column shuffle moves to an area with no training data. Say what grouped importance shows and what it leaves unanswered.',
              kind: 'data-analysis',
              difficulty: 2,
              hint: 'To count, compare each shuffled point with its nearest training point using `NearestNeighbors`.',
            },
          ],
          selfAssessment: [
            {
              question: 'Why compute permutation importance on held-out data?',
              answerOutline: 'On training rows, importance reflects memorised noise. Held-out rows show what supports generalisation.',
            },
            {
              question: 'Why can two correlated features both look unimportant?',
              answerOutline: 'When one is shuffled, the model falls back on the other, so the score barely drops. Group them to measure their joint importance.',
            },
            {
              question: 'What does permutation importance not tell you?',
              answerOutline: 'It does not show cause, or what would happen if the feature changed. It describes how this model uses the feature.',
            },
          ],
          relatedLessons: ['machine-learning/ml-engineering/feature-engineering-and-selection'],
        },
        {
          slug: 'partial-dependence-and-shap',
          title: 'Partial dependence and SHAP',
          summary:
            'PDP and ICE plots show how predictions move with a feature, and SHAP splits one prediction among the features. Both describe the model, and both can mislead under correlation.',
          estimatedMinutes: 110,
          objectives: [
            'Make and read PDP and ICE plots',
            'Explain how correlated features make partial dependence unreliable',
            'Compute SHAP values with TreeExplainer and check additivity',
            'Use SHAP for both local and global explanations',
            'State clearly what a SHAP value is not',
          ],
          concepts: [
            'Partial dependence plot',
            'Individual conditional expectation',
            'Unrealistic feature combinations',
            'SHAP values',
            'Additivity to the prediction',
            'TreeExplainer',
            'Local versus global explanation',
            'A SHAP value is not a cause',
          ],
          explanation: `A **partial dependence plot** forces a feature to a value for every row, predicts, averages, and repeats across a grid. **ICE** draws one line per row rather than the average, which reveals interactions that an average would hide: lines that cross or fan out mean the effect differs between rows.

Forcing a value is also the weakness. If latitude is set to 38 for every row, a quarter of a California sample lands at longitudes with no data at that latitude, so the model is asked about inputs it never saw. With strong correlation, the plot can also look flat: if the model used \`x1\`, the plot for a near-copy \`x2\` shows little, even though \`x2\` carries the same information.

**SHAP** explains one prediction by dividing it among the features. It comes from game theory, and the property to remember is **additivity**: the base value plus all SHAP values equals the prediction.

\`\`\`python
import numpy as np
import shap
from sklearn.datasets import fetch_california_housing
from sklearn.ensemble import HistGradientBoostingRegressor
from sklearn.inspection import partial_dependence

X, y = fetch_california_housing(return_X_y=True, as_frame=True)
model = HistGradientBoostingRegressor(random_state=0).fit(X, y)
sample = X.sample(1000, random_state=0)
pdp = partial_dependence(model, sample, ['MedInc'], grid_resolution=8)
print(pdp['average'][0].round(2))

explainer = shap.TreeExplainer(model)
values = explainer.shap_values(sample)
base = np.ravel(explainer.expected_value)[0]
print(np.abs(base + values.sum(axis=1) - model.predict(sample)).max())
\`\`\`

\`TreeExplainer\` is fast and exact for tree ensembles. One row's values are a **local** explanation. The mean absolute value per feature is a **global** summary.

**What a SHAP value is not.** It is not a cause, and it is not the effect of intervening. It says how this model's prediction is attributed to the inputs given to it. If you change a feature in the real world, other things may change too. The next lesson builds a feature with no effect and a large SHAP value.

Read Molnar's PDP, ICE and SHAP chapters, and then the SHAP warning notebook on causal insights.`,
          resources: [
            { title: 'Interpretable Machine Learning: SHAP', url: 'https://christophm.github.io/interpretable-ml-book/shap.html', type: 'textbook', cost: 'free', provider: 'Christoph Molnar', note: 'Read with the partial dependence and ICE chapters of the same book.', primary: true },
            { title: 'Partial Dependence and Individual Conditional Expectation plots', url: 'https://scikit-learn.org/stable/modules/partial_dependence.html', type: 'documentation', cost: 'free', provider: 'scikit-learn' },
            { title: 'An introduction to explainable AI with Shapley values', url: 'https://shap.readthedocs.io/en/latest/example_notebooks/overviews/An%20introduction%20to%20explainable%20AI%20with%20Shapley%20values.html', type: 'documentation', cost: 'free', provider: 'SHAP' },
            { title: 'Be careful when interpreting predictive models in search of causal insights', url: 'https://shap.readthedocs.io/en/latest/example_notebooks/overviews/Be%20careful%20when%20interpreting%20predictive%20models%20in%20search%20of%20causal%20insights.html', type: 'article', cost: 'free', provider: 'SHAP', note: 'A worked warning from the SHAP authors themselves.' },
          ],
          exercises: [
            {
              slug: 'pdp-and-ice',
              title: 'PDP and ICE on housing',
              prompt:
                'Fit the lesson model on training data. Draw `PartialDependenceDisplay` with `kind="both"` for `MedInc`, `AveOccup` and `HouseAge`, on 500 rows. Add a rug or histogram showing where the data are. Say which features show heterogeneity in ICE lines, and describe one. Mark where the curve rests on few rows. State what the `MedInc` curve shows about this model, and why it does not show what would happen to values if an area became richer.',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'correlated-pdp',
              title: 'Make a PDP lie',
              prompt:
                'Simulate 5,000 rows: `x1` standard normal, `x2 = x1 + noise` with standard deviation 0.1, and the target `x1` plus noise with standard deviation 0.2. Fit boosting and draw partial dependence for both features. Report the range of each curve. Refit on a bootstrap sample and report whether the credit moves between them. Then, on California, set latitude to 38 for every row and report the share of rows at longitudes where the training data have no rows at that latitude. Say what you can and cannot trust in a PDP.',
              kind: 'simulation',
              difficulty: 2,
            },
            {
              slug: 'shap-local-global',
              title: 'One house and the whole model',
              prompt:
                'On 1,000 rows, compute SHAP values and verify additivity. Report mean absolute SHAP per feature and compare that ranking with your grouped and ungrouped permutation importance. For the highest and lowest predictions, list the top contributions in dollars by scaling units. Write a two-sentence explanation of one prediction for a non-specialist. Then state what your explanation does not claim, and why a large SHAP value for `AveOccup` does not imply that changing occupancy would change prices.',
              kind: 'data-analysis',
              difficulty: 3,
              hint: 'The target is in units of 100,000 dollars, so multiply by 100,000 and write the word dollars.',
            },
          ],
          selfAssessment: [
            {
              question: 'What can ICE show that a PDP cannot?',
              answerOutline: 'Differences between rows. Crossing or fanning lines reveal interactions that the average hides.',
            },
            {
              question: 'Why do correlated features make a PDP unreliable?',
              answerOutline: 'The plot forces combinations that do not occur, so it averages predictions over unrealistic inputs, and credit may sit on the correlated partner.',
            },
            {
              question: 'What do SHAP values add up to, and what are they not?',
              answerOutline: 'Base value plus SHAP values equals the prediction. They attribute the prediction, and they are not causes or effects of intervening.',
            },
          ],
          relatedLessons: ['machine-learning/ml-engineering/deployment-monitoring-and-fairness'],
        },
        {
          slug: 'correlation-versus-cause',
          title: 'Correlation versus cause',
          summary:
            'A predictive model learns what goes with what, not what happens if you act. Confounding, selection and reverse causation each break that link, and a simple diagram shows how.',
          estimatedMinutes: 110,
          objectives: [
            'Recognise confounding, selection bias and reverse causation',
            'Draw a simple causal diagram for a claim',
            'Demonstrate Simpson\'s paradox on real data',
            'Show by simulation that a good predictor gives a wrong what-if answer',
            'Say what kind of evidence would answer a causal question',
          ],
          concepts: [
            'Confounding',
            'Selection bias',
            'Reverse causation',
            'Causal diagram',
            'Collider',
            'Simpson\'s paradox',
            'Prediction versus intervention',
            'Randomised experiments',
          ],
          explanation: `"What will happen?" and "what would happen if we changed this?" are different questions. A predictive model answers the first. Three structures explain why, drawn as small **causal diagrams**, where an arrow means "causes".

**Confounding**, \`T <- U -> Y\`. A third factor drives both, so $T$ and $Y$ move together with no arrow between them.

**Reverse causation**, \`Y -> T\`. Areas with high prices attract expensive renovations, and a model cannot tell the direction.

**Selection bias**, \`T -> S <- Y\`. You only see rows that passed some filter $S$. In a simulation with two independent variables, keeping only rows where their sum was high produced a correlation of -0.34. Conditioning on such a shared effect, called a **collider**, creates a link that does not exist. Adding a control variable is therefore not always safe.

**Simpson's paradox.** A trend can reverse when data are split. Across all Palmer penguins, bill depth falls as bill length rises (correlation -0.24), yet within each species it rises (0.39 to 0.65). Species is a confounder here. The diagram decides which view answers your question, and the data alone cannot.

Now the central point, in code.

\`\`\`python
import numpy as np
from sklearn.ensemble import HistGradientBoostingRegressor

rng = np.random.default_rng(0)
u = rng.normal(size=20000)
t = u + rng.normal(size=20000)
y = 2 * u + rng.normal(size=20000)
model = HistGradientBoostingRegressor(random_state=0).fit(t[:, None], y)
print(model.predict([[1.0]]) - model.predict([[0.0]]))
\`\`\`

Here $T$ has no effect on $Y$. Yet the model predicts a rise of about 1.2 when $T$ goes from 0 to 1, and it is right to, as a prediction: high $T$ does signal high $Y$. Used as a what-if, it is completely wrong. In this data the mean absolute SHAP value of $T$ was about 1.1.

Answering a causal question needs an experiment, or a design with defensible assumptions, usually with the confounders measured.

Read the first chapters of *What If*, then the scikit-learn causal interpretation example.`,
          resources: [
            { title: 'Causal Inference: What If', url: 'https://miguelhernan.org/whatifbook', type: 'textbook', cost: 'free', provider: 'Hernan and Robins', note: 'Free PDF. Read Chapters 1 and 6 on effects and causal diagrams.', primary: true },
            { title: 'Failure of Machine Learning to Infer Causal Effects', url: 'https://scikit-learn.org/stable/auto_examples/inspection/plot_causal_interpretation.html', type: 'documentation', cost: 'free', provider: 'scikit-learn', note: 'A short worked example of the failure.' },
            { title: 'The Effect', url: 'https://theeffectbook.net/', type: 'textbook', cost: 'free', provider: 'Nick Huntington-Klein', note: 'Free online. Friendly chapters on causal diagrams.' },
            { title: 'Simpson\'s Paradox', url: 'https://plato.stanford.edu/entries/paradox-simpson/', type: 'article', cost: 'free', provider: 'Stanford Encyclopedia of Philosophy', note: 'Read Section 1 for the structure of the paradox.' },
          ],
          exercises: [
            {
              slug: 'what-if-simulation',
              title: 'A good predictor, a wrong what-if',
              prompt:
                'Extend the lesson simulation. Report the test $R^2$, the predicted change from $T=0$ to $T=1$, and the mean absolute SHAP value for $T$. Now simulate the intervention: draw $T$ at random, independent of $U$, keep the same equation for $Y$, and report the slope. Then fit a linear model with $T$ and $U$ together, and report the coefficient of $T$. Explain each result. Say why adjusting worked here, and why you could not check that in real data, where $U$ may be unmeasured.',
              kind: 'simulation',
              difficulty: 2,
            },
            {
              slug: 'penguin-simpson',
              title: "Simpson's paradox in penguins",
              prompt:
                "Load the penguins data. Report the correlation between `culmen_length_mm` and `culmen_depth_mm`, pooled and within each species, then plot the data with one fitted line per species and one overall. Fit a linear model with and without species. Draw the causal diagram you think applies. Say which slope answers which question. Why does the data alone not tell you which analysis is correct, and why is 'species causes bill shape' a claim your regression did not test?",
              kind: 'data-analysis',
              difficulty: 1,
            },
            {
              slug: 'selection-and-diagrams',
              title: 'Selection, then diagram a real claim',
              prompt:
                'Simulate talent and luck as independent standard normals, with success equal to their sum plus noise, and keep only rows with success above 1. Report the correlation before and after filtering. Then pick the claim "homes in older areas are worth more", based on the `HouseAge` coefficient in California housing. Draw a causal diagram with at least two possible confounders and name one possible selection effect. Say which analysis, if any, on these data could support the claim, and what evidence would really be needed.',
              kind: 'writing',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why can a highly accurate model give a wrong answer to a what-if question?',
              answerOutline: 'It learns associations in the observed data, including those from confounders. Changing a feature by intervention breaks those associations.',
            },
            {
              question: 'What is a collider, and why is it unsafe to control for one?',
              answerOutline: 'A common effect of two variables. Conditioning on it creates an association between them even if none exists.',
            },
            {
              question: 'What does Simpson\'s paradox show?',
              answerOutline: 'A trend can reverse when data are split by a third variable, so choosing an analysis needs causal reasoning and not only the data.',
            },
          ],
        },
        {
          slug: 'reporting-a-model',
          title: 'Reporting a model',
          summary:
            'A model is finished when someone else can use it safely. Write a model card, give intervals that respect entities, report subgroups, and say in plain words what it cannot tell you.',
          estimatedMinutes: 100,
          objectives: [
            'Write a model card for a fitted model',
            'Compute bootstrap confidence intervals grouped by entity',
            'Report performance by subgroup with sample sizes',
            'Write limits in plain language',
            'State explicitly what a model cannot tell the reader',
          ],
          concepts: [
            'Model cards',
            'Intended use and out-of-scope use',
            'Bootstrap confidence intervals',
            'Grouped bootstrap',
            'Subgroup performance',
            'Small-group uncertainty',
            'Plain-language limits',
            'What the model cannot tell you',
          ],
          explanation: `A **model card** is a short document that travels with a model. It says what the model is for, what it must not be used for, what data trained it, how it performs and for whom, and what could go wrong.

**Give intervals, not points.** A test score is an estimate, so bootstrap it: resample the test rows, recompute the metric many times, and take percentiles. But the resampling unit must match the structure of the data. If rows cluster within entities such as patients or areas, resampling rows pretends they are independent and gives intervals that are too narrow. Resample whole **entities** instead.

\`\`\`python
import numpy as np
from sklearn.datasets import fetch_california_housing
from sklearn.ensemble import HistGradientBoostingRegressor
from sklearn.metrics import root_mean_squared_error
from sklearn.model_selection import train_test_split

X, y = fetch_california_housing(return_X_y=True, as_frame=True)
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.25, random_state=0)
pred = HistGradientBoostingRegressor(random_state=0).fit(X_tr, y_tr).predict(X_te)
blocks = (X_te['Latitude'].round().astype(str) + X_te['Longitude'].round().astype(str)).to_numpy()
rows = {b: np.where(blocks == b)[0] for b in np.unique(blocks)}
names = list(rows)
rng = np.random.default_rng(0)
scores = []
for _ in range(1000):
    i = np.concatenate([rows[b] for b in rng.choice(names, len(names))])
    scores.append(root_mean_squared_error(y_te.to_numpy()[i], pred[i]))
print(np.percentile(scores, [2.5, 97.5]))
\`\`\`

In this run the row bootstrap gave 0.45 to 0.49, and the grouped version 0.41 to 0.49, over twice as wide.

**Report subgroups.** Give performance and calibration per group, with counts and intervals. A small group's bad number may be noise, and a good overall number can hide a real failure.

**Write limits plainly.** Not "generalisability may be limited", but "trained on 1990 census areas in California, so do not use it elsewhere or for present-day prices".

**State what it cannot tell you.** Every report needs this sentence. It predicts, and it does not show what would happen if something were changed, why a case came out as it did, or how it will perform once the world shifts.

Read the Model Cards paper, then look at real model cards on Hugging Face.`,
          resources: [
            { title: 'Model Cards for Model Reporting', url: 'https://arxiv.org/abs/1810.03993', type: 'article', cost: 'free', provider: 'Mitchell et al.', note: 'Read Sections 1 to 4, and the example cards.', primary: true },
            { title: 'Model Cards', url: 'https://huggingface.co/docs/hub/model-cards', type: 'documentation', cost: 'free', provider: 'Hugging Face', note: 'A practical format, used in real projects.' },
            { title: 'scipy.stats.bootstrap', url: 'https://docs.scipy.org/doc/scipy/reference/generated/scipy.stats.bootstrap.html', type: 'documentation', cost: 'free', provider: 'SciPy', note: 'Bootstrap intervals for independent rows. The grouped case needs the manual loop above.' },
          ],
          exercises: [
            {
              slug: 'grouped-intervals',
              title: 'Row and grouped intervals',
              prompt:
                'Run the lesson code and add a row-level bootstrap for comparison. Report both 95 percent intervals, and repeat for $R^2$ and with block sizes of 0.5 and 2 degrees. Report how the width changes with block size. Say which interval you would quote for a new part of California and why, and why neither interval covers a change in the housing market over time.',
              kind: 'data-analysis',
              difficulty: 2,
              hint: 'Latitude rounded to 0.5 degrees is `(lat * 2).round() / 2`.',
            },
            {
              slug: 'subgroup-table',
              title: 'A subgroup table with uncertainty',
              prompt:
                'Using your calibrated Adult model, build a table by `sex` and by the largest `race` groups: rows, base rate, mean prediction, ROC AUC, recall at a fixed threshold, and a bootstrap 95 percent interval for recall. Mark which gaps exceed their uncertainty. Write three sentences for a reader who will never see the code. Say what these gaps show, and why they cannot by themselves tell you the cause, or which fairness definition should apply.',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'write-a-model-card',
              title: 'Write a model card',
              prompt:
                'Write a one-page model card for a model from this course, either California housing or calibrated Adult. Include: intended use, out-of-scope use, data and its dates, validation design, metrics with grouped intervals, subgroup results, calibration, what the model relies on, and a section headed "What this model cannot tell you", with at least four specific statements. Avoid the words "may" and "might" in the limits section. Ask someone without a technical background to say what they would and would not use it for, and record where they misread it.',
              kind: 'writing',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why resample whole entities when bootstrapping?',
              answerOutline: 'Rows from one entity are correlated. Resampling rows treats them as independent and gives intervals that are too narrow.',
            },
            {
              question: 'A small subgroup has a poor score. What should you report and do?',
              answerOutline: 'Report its count and interval. It may be noise, so gather more evidence, without dismissing it or claiming a failure outright.',
            },
            {
              question: 'What should a "cannot tell you" section contain?',
              answerOutline: 'Specific limits: no causal or what-if claims, no individual certainty, no use outside the population and time period, no guarantee under drift.',
            },
          ],
          relatedLessons: [
            'probability-statistics/estimation-and-confidence/bootstrap-resampling',
            'machine-learning/ml-engineering/deployment-monitoring-and-fairness',
          ],
        },
      ],
    },
  ],
  capstone: {
    slug: 'applied-modeling-study',
    title: 'An applied modeling study',
    description:
      'Take one free public dataset from question to written report: frame the problem, validate honestly, compare models against a baseline, and state clearly what the model cannot tell you.',
    deliverables: [
      'A reproducible notebook or repository running from raw data to final scores',
      'A comparison of at least three model families against a baseline on one validation design',
      'A short model report covering metrics, subgroups, limits and what the model cannot tell you',
    ],
    estimatedHours: 40,
  },
  masteryChecklist: [
    'I can turn a vague question into a target, an audience and a validation design that matches how the model will be used',
    'I can build a baseline, fit linear models with engineered features, and read coefficients and residuals correctly',
    'I can choose a model with cross-validation, including grouped and time-based splits, and score a holdout once',
    'I can find and prevent the three kinds of leakage, using pipelines and canary tests',
    'I can evaluate a classifier with metrics suited to the decision, set thresholds from costs or budgets, and check calibration',
    'I can fit and compare kNN, trees, forests, boosting and SVMs, and say when the simpler model is the right choice',
    'I can cluster and reduce dimensions while treating the results as descriptions to be checked, not discoveries',
    'I can train small networks in PyTorch on a CPU, reuse pretrained features, and decide when a network is not worth it',
    'I can explain a model with permutation importance, partial dependence and SHAP, and say what those tools do not show',
    'I can report a model with uncertainty, subgroup performance and limits in plain language, and separate prediction from cause',
  ],
});
