import { defineSubject } from '../define';
import type { ResourceInput } from '../types';

const siegrist = (path: string, title: string, note: string, primary = false): ResourceInput => ({
  title: `Siegrist, Probability, Mathematical Statistics, and Stochastic Processes: ${title}`,
  url: `https://www.randomservices.org/random/${path}.html`,
  type: 'textbook',
  cost: 'free',
  provider: 'Kyle Siegrist, University of Alabama in Huntsville',
  note,
  primary,
});

const statlect = (path: string, title: string, note: string): ResourceInput => ({
  title: `StatLect: ${title}`,
  url: `https://www.statlect.com/${path}`,
  type: 'textbook',
  cost: 'free',
  provider: 'Marco Taboga',
  note,
});

const mit18650 = (note: string): ResourceInput => ({
  title: 'MIT 18.650 Statistics for Applications (Fall 2016): lecture slides',
  url: 'https://ocw.mit.edu/courses/18-650-statistics-for-applications-fall-2016/pages/lecture-slides/',
  type: 'lecture',
  cost: 'free',
  provider: 'MIT OpenCourseWare',
  note,
});

const mit18655 = (note: string): ResourceInput => ({
  title: 'MIT 18.655 Mathematical Statistics',
  url: 'https://ocw.mit.edu/courses/18-655-mathematical-statistics-spring-2016/',
  type: 'course',
  cost: 'free',
  provider: 'MIT OpenCourseWare',
  note,
});

const wasserman = (note: string): ResourceInput => ({
  title: 'CMU 36-705 Intermediate Statistics: lecture notes',
  url: 'https://www.stat.cmu.edu/~larry/=stat705/',
  type: 'lecture',
  cost: 'free',
  provider: 'Larry Wasserman, Carnegie Mellon University',
  note,
});

const scipyStats = (note: string): ResourceInput => ({
  title: 'SciPy documentation: scipy.stats',
  url: 'https://docs.scipy.org/doc/scipy/reference/stats.html',
  type: 'documentation',
  cost: 'free',
  provider: 'SciPy',
  note,
});

export default defineSubject({
  id: 'statistics-and-probability-2',
  title: 'Statistics and Probability II',
  category: 'statistics',
  tagline:
    'The mathematical theory of estimation and testing: transformations, normal sampling theory, sufficiency, maximum likelihood, confidence intervals and optimal tests, each checked by derivation and by simulation.',
  description: `This course follows the topics of STAT 410 (Statistics and Probability II) at the University of Illinois Urbana-Champaign, the continuation of STAT 400. Its public catalog description lists moment-generating functions, transformations of random variables, normal sampling theory, sufficiency, best estimators, maximum likelihood estimators, confidence intervals, most powerful tests, likelihood ratio tests and chi-square tests. Everything here, including the lessons, examples and exercises, is original. The course is not affiliated with, endorsed by, or a substitute for the Illinois course.

The aim is to understand why the standard statistical procedures work, and when they stop working. Why does a $t$ statistic have a $t$ distribution? What makes an estimator best? Why is the maximum likelihood estimator approximately normal, and under which conditions? Why does the Neyman-Pearson lemma pick the test it does? Every major theorem is stated with its hypotheses, and its regularity conditions where it needs them, and most are proved or sketched. A recurring set of counterexamples, led by the uniform distribution on $(0, \\theta)$, shows what goes wrong when the conditions fail.

The course also takes an experimental habit seriously. Each distributional result and each estimator property is checked twice: once symbolically, by deriving it, and once numerically, by simulating it in Python with NumPy and SciPy. You will estimate bias, variance, mean squared error, coverage and power by Monte Carlo and compare them with the formulas. Disagreement means an error in the algebra, the code or the assumptions, and finding it is part of the work.

Module 1 reviews the STAT 400 material the rest relies on: point estimation, confidence intervals and the basics of testing, together with moment-generating functions. The course assumes calculus-based probability at the level of a first proof-aware probability course, and multivariable calculus for Jacobians. The free resources used throughout are Siegrist's *Probability, Mathematical Statistics, and Stochastic Processes*, StatLect, MIT 18.650 and 18.655, and Wasserman's CMU 36-705 notes.`,
  difficulty: 'advanced',
  estimatedHours: 80,
  prerequisites: ['probability-theory', 'calculus-3'],
  recommendedBackground: [
    'Calculus-based probability: densities, expectation, variance, joint and conditional distributions, the central limit theorem',
    'Multivariable calculus, especially change of variables with Jacobians',
    'An introductory statistics course covering confidence intervals and hypothesis tests (reviewed in Module 1)',
    'Python with NumPy and SciPy for simulation',
  ],
  tags: ['statistics', 'estimation', 'hypothesis testing', 'maximum likelihood', 'sufficiency', 'sampling distributions', 'simulation'],
  core: false,
  modules: [
    {
      slug: 'review-and-moment-generating-functions',
      title: 'Review and Moment-Generating Functions',
      description:
        'The STAT 400 statistics that the rest of the course builds on: estimators and their bias, variance and mean squared error; confidence intervals and tests for a mean. Then moment-generating functions, the uniqueness theorem, and distributions of sums of independent variables.',
      lessons: [
        {
          slug: 'point-estimation-review',
          relatedLessons: ['probability-statistics/estimation-and-confidence/point-estimation-and-estimator-properties'],
          title: 'Estimators, bias, variance and mean squared error',
          summary:
            'Review point estimation: estimators as random variables, unbiasedness, variance, the bias-variance decomposition of mean squared error, consistency, and the method of moments, all checked by simulation.',
          estimatedMinutes: 120,
          objectives: [
            'Treat an estimator as a random variable and compute its expectation and variance',
            'Prove the decomposition $\\operatorname{MSE} = \\operatorname{Var} + \\operatorname{bias}^2$ and use it to compare estimators',
            'Show that $S^2$ with divisor $n - 1$ is unbiased for $\\sigma^2$',
            'Construct method-of-moments estimators',
            'Estimate bias, variance and MSE by Monte Carlo simulation and compare them with exact formulas',
          ],
          concepts: [
            'Estimator and estimate',
            'Bias and unbiasedness',
            'Variance and standard error',
            'Mean squared error',
            'Bias-variance decomposition',
            'Consistency',
            'Method of moments',
            'Monte Carlo estimation of estimator properties',
          ],
          explanation: `A **statistic** is any function of the data $X_1, \\dots, X_n$. When it is used to guess a parameter $\\theta$, it is called an **estimator** $\\hat\\theta$. Because the data are random, $\\hat\\theta$ is a random variable with its own distribution, the **sampling distribution**, and every property of an estimator is a property of that distribution. The **bias** is $E_\\theta[\\hat\\theta] - \\theta$. The **mean squared error** is $\\operatorname{MSE}(\\hat\\theta) = E_\\theta[(\\hat\\theta - \\theta)^2]$, and adding and subtracting $E\\hat\\theta$ inside the square gives
$$\\operatorname{MSE}(\\hat\\theta) = \\operatorname{Var}_\\theta(\\hat\\theta) + \\operatorname{bias}^2.$$
An estimator is **consistent** if $\\hat\\theta_n \\to \\theta$ in probability. A sufficient condition, by Chebyshev's inequality, is $\\operatorname{MSE} \\to 0$.

Two standard facts are worth deriving once yourself. First, $\\bar X$ is unbiased for $\\mu$ with variance $\\sigma^2/n$. Second, $S^2 = \\frac{1}{n-1}\\sum(X_i - \\bar X)^2$ is unbiased for $\\sigma^2$, because $E\\sum(X_i - \\bar X)^2 = (n-1)\\sigma^2$. The **method of moments** sets sample moments equal to population moments and solves for the parameters.

**Worked example.** Let $X_1, \\dots, X_n$ be iid uniform on $(0, \\theta)$. Compare three estimators of $\\theta$.

1. **Method of moments.** Since $EX = \\theta/2$, set $\\hat\\theta_1 = 2\\bar X$. It is unbiased, with $\\operatorname{Var}(\\hat\\theta_1) = 4\\cdot\\frac{\\theta^2}{12n} = \\frac{\\theta^2}{3n}$.
2. **The sample maximum** $\\hat\\theta_2 = X_{(n)}$. Its CDF is $(x/\\theta)^n$ on $(0, \\theta)$, so its density is $nx^{n-1}/\\theta^n$. This gives $E X_{(n)} = \\frac{n}{n+1}\\theta$ and $E X_{(n)}^2 = \\frac{n}{n+2}\\theta^2$. Then $\\operatorname{Var} = \\frac{n\\theta^2}{(n+1)^2(n+2)}$ and the bias is $-\\theta/(n+1)$, so $\\operatorname{MSE} = \\frac{2\\theta^2}{(n+1)(n+2)}$.
3. **The bias-corrected maximum** $\\hat\\theta_3 = \\frac{n+1}{n}X_{(n)}$, which is unbiased with variance $\\frac{\\theta^2}{n(n+2)}$.

For $n = 10$ the MSEs are $\\theta^2/30 \\approx 0.0333\\theta^2$, $\\theta^2/66 \\approx 0.0152\\theta^2$ and $\\theta^2/120 \\approx 0.0083\\theta^2$. The moment estimator's MSE falls like $1/n$, while the other two fall like $1/n^2$. The maximum carries far more information here than the mean. A biased estimator ($\\hat\\theta_2$) beats an unbiased one ($\\hat\\theta_1$), so unbiasedness is not everything.

**Check it by simulation.** Draw $R = 10^5$ samples of size $10$ with $\\theta = 1$. Compute all three estimators on each sample, then their mean minus $1$ (bias), their sample variance, and their mean squared deviation from $1$. The Monte Carlo standard error of an estimated mean is the sample standard deviation divided by $\\sqrt R$, so agreement to two or three significant figures is what you should expect.

**Pitfall.** Unbiasedness is not preserved by nonlinear functions: $S$ is a biased estimator of $\\sigma$, even though $S^2$ is unbiased for $\\sigma^2$.`,
          resources: [
            siegrist('point/Estimators', 'Estimators', 'Bias, mean squared error, consistency and many worked examples.', true),
            siegrist('point/Moments', 'The Method of Moments', 'Moment estimators for the standard families, including the uniform example.'),
            statlect('fundamentals-of-statistics/point-estimation', 'Point estimation', 'A compact second treatment of estimator properties.'),
            {
              title: 'MIT 18.05 Introduction to Probability and Statistics',
              url: 'https://ocw.mit.edu/courses/18-05-introduction-to-probability-and-statistics-spring-2022/',
              type: 'course',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
              note: 'Use the statistics half as a review of the STAT 400 level if any of this feels unfamiliar.',
            },
          ],
          exercises: [
            {
              slug: 'unbiased-sample-variance',
              title: 'Unbiasedness of the sample variance',
              prompt:
                'For iid $X_1, \\dots, X_n$ with mean $\\mu$ and variance $\\sigma^2 < \\infty$, prove $E\\sum_{i=1}^n (X_i - \\bar X)^2 = (n-1)\\sigma^2$. Deduce the bias of $\\hat\\sigma^2 = \\frac1n\\sum(X_i - \\bar X)^2$, and show that for normal data $\\hat\\sigma^2$ has smaller MSE than $S^2$, using $\\operatorname{Var}(S^2) = 2\\sigma^4/(n-1)$.',
              kind: 'derivation',
              difficulty: 1,
              hint: '$\\operatorname{MSE}(\\hat\\sigma^2) = \\frac{(2n-1)\\sigma^4}{n^2}$, which is less than $\\frac{2\\sigma^4}{n-1}$.',
            },
            {
              slug: 'poisson-two-estimators',
              title: 'Two unbiased estimators of a Poisson mean',
              prompt:
                'For iid Poisson($\\lambda$) data, both $\\bar X$ and $S^2$ are unbiased for $\\lambda$. Using $\\operatorname{Var}(S^2) = \\mu_4/n - \\sigma^4(n-3)/(n(n-1))$, where $\\mu_4$ is the fourth central moment, show that $\\operatorname{Var}(S^2) = \\lambda/n + 2\\lambda^2/(n-1)$ for the Poisson. Evaluate both variances for $\\lambda = 3$, $n = 20$, and confirm them by simulating $10^5$ samples.',
              kind: 'simulation',
              difficulty: 2,
              hint: 'For the Poisson, $\\mu_4 = \\lambda + 3\\lambda^2$. The variances are $0.15$ and about $1.097$.',
            },
            {
              slug: 'uniform-simulation',
              title: 'Simulate the uniform example',
              prompt:
                'Carry out the simulation described in the worked example for $n = 5, 10, 20, 40$ with $\\theta = 1$. Tabulate the estimated bias, variance and MSE of the three estimators with Monte Carlo standard errors, compare with the exact formulas, and plot MSE against $n$ on log-log axes to show the slopes $-1$ and $-2$.',
              kind: 'simulation',
              difficulty: 2,
            },
            {
              slug: 'gamma-moments',
              title: 'Method of moments for the gamma family',
              prompt:
                'Let $X_i$ be iid gamma with shape $\\alpha$ and scale $\\beta$, so $EX = \\alpha\\beta$ and $\\operatorname{Var}X = \\alpha\\beta^2$. Derive the method-of-moments estimators of $\\alpha$ and $\\beta$. Prove they are consistent, using the law of large numbers and the continuous mapping theorem. Then estimate their bias for $\\alpha = 2$, $\\beta = 3$ and $n = 25$ by simulation.',
              kind: 'derivation',
              difficulty: 2,
              hint: '$\\hat\\beta = \\hat\\sigma^2/\\bar X$ and $\\hat\\alpha = \\bar X^2/\\hat\\sigma^2$ with $\\hat\\sigma^2 = \\frac1n\\sum(X_i - \\bar X)^2$.',
            },
          ],
          selfAssessment: [
            {
              question: 'Derive the bias-variance decomposition of the MSE.',
              answerOutline: 'Write $\\hat\\theta - \\theta = (\\hat\\theta - E\\hat\\theta) + (E\\hat\\theta - \\theta)$, square and take expectations; the cross term has mean zero.',
            },
            {
              question: 'Why can a biased estimator be preferable to an unbiased one?',
              answerOutline: 'Its variance can be so much smaller that its MSE is lower, as $X_{(n)}$ beats $2\\bar X$ for the uniform.',
            },
            {
              question: 'Give a sufficient condition for consistency and say why it works.',
              answerOutline: '$\\operatorname{MSE} \\to 0$; by Chebyshev (Markov on the square), $P(|\\hat\\theta - \\theta| > \\varepsilon) \\le \\operatorname{MSE}/\\varepsilon^2 \\to 0$.',
            },
            {
              question: 'How do you report the accuracy of a Monte Carlo estimate of bias?',
              answerOutline: 'Give the Monte Carlo standard error: the standard deviation of the simulated estimates divided by $\\sqrt{R}$.',
            },
          ],
        },
        {
          slug: 'intervals-and-tests-review',
          relatedLessons: ['probability-statistics/estimation-and-confidence/confidence-intervals', 'probability-statistics/hypothesis-testing-and-regression/hypothesis-testing-and-p-values'],
          title: 'Confidence intervals and hypothesis tests: a review',
          summary:
            'Review the $z$ and $t$ intervals, the logic of tests (hypotheses, size, power, p-values), and the duality between intervals and tests, with coverage and power checked by simulation.',
          estimatedMinutes: 130,
          objectives: [
            'Construct $z$ and $t$ confidence intervals for a mean and interpret the confidence level correctly',
            'Set up a test: null and alternative, test statistic, rejection region, size and power',
            'Compute a p-value and a power function for a one-sided $z$ test',
            'Explain the duality between confidence intervals and two-sided tests',
            'Estimate coverage and power by simulation',
          ],
          concepts: [
            'Confidence interval and confidence level',
            'Coverage probability',
            '$z$ and $t$ intervals',
            'Null and alternative hypotheses',
            'Type I and type II errors',
            'Size, level and power function',
            'p-value',
            'Duality of tests and intervals',
          ],
          explanation: `A **confidence interval** at level $1 - \\alpha$ is a pair of statistics $(L, U)$ with $P_\\theta(L \\le \\theta \\le U) \\ge 1 - \\alpha$ for every $\\theta$. The randomness is in $L$ and $U$, not in $\\theta$. After the data are in, the computed interval either contains $\\theta$ or it does not. The level describes the procedure, through the long-run fraction of intervals that cover. For normal data with $\\sigma$ known, $\\bar X \\pm z_{\\alpha/2}\\sigma/\\sqrt n$ has exact coverage $1 - \\alpha$. With $\\sigma$ unknown, $\\bar X \\pm t_{n-1,\\alpha/2}S/\\sqrt n$ is exact for normal data. Module 3 proves why. For other data, both intervals are only approximately right for large $n$, by the CLT.

A **test** of $H_0: \\theta \\in \\Theta_0$ against $H_1: \\theta \\in \\Theta_1$ is a rule that rejects $H_0$ when a test statistic falls in a rejection region. Rejecting a true $H_0$ is a type I error, and failing to reject a false one is a type II error. The **power function** $\\beta(\\theta) = P_\\theta(\\text{reject})$ summarises the test. Its **size** is $\\sup_{\\theta \\in \\Theta_0}\\beta(\\theta)$, and the test has **level** $\\alpha$ if its size is at most $\\alpha$. The **p-value** is the smallest level at which the observed data would lead to rejection. For a continuous test statistic and a simple null, it is uniformly distributed under $H_0$. A p-value is not the probability that $H_0$ is true.

**Duality.** A level-$\\alpha$ two-sided test of $\\theta = \\theta_0$ rejects exactly when $\\theta_0$ lies outside the corresponding $1 - \\alpha$ interval. Every interval gives a family of tests, and inverting a family of tests gives an interval. Module 6 uses this to build new intervals.

**Worked example.** Fill weights are $N(\\mu, \\sigma^2)$ with $\\sigma = 4$ g. A sample of $n = 25$ has $\\bar x = 51.5$. Test $H_0: \\mu = 50$ against $H_1: \\mu > 50$ at $\\alpha = 0.05$. The standard error is $4/5 = 0.8$, so $z = (51.5 - 50)/0.8 = 1.875$ and the p-value is $1 - \\Phi(1.875) \\approx 0.030$. Reject $H_0$. The rejection region is $\\bar x > 50 + 1.645(0.8) = 51.316$. The power at $\\mu = 52$ is therefore
$$\\beta(52) = P\\left(Z > \\frac{51.316 - 52}{0.8}\\right) = P(Z > -0.855) \\approx 0.804.$$
If $\\sigma$ were unknown, with sample $s = 4$, the $t$ statistic would be the same number $1.875$, now referred to $t_{24}$. As a separate interval example: for $n = 16$, $\\bar x = 10.3$ and $s = 1.2$, the 95% $t$ interval is $10.3 \\pm 2.131(0.3) = (9.66, 10.94)$, slightly wider than the $z$-based $10.3 \\pm 0.588$.

**Simulation.** Coverage is a probability, so estimate it. Generate many samples, compute the interval for each, and record the fraction that contain the true value. That fraction has Monte Carlo standard error $\\sqrt{0.95 \\cdot 0.05/R}$, about $0.0007$ for $R = 10^5$.

**Pitfall.** "Fail to reject" is not "accept". A test with low power fails to reject most false nulls.`,
          resources: [
            siegrist('interval/Normal', 'Estimation in the Normal Model', 'The $z$, $t$ and chi-square intervals with simulation applets.', true),
            siegrist('hypothesis/Introduction', 'Introduction to Hypothesis Testing', 'Size, power and the duality with interval estimation, stated carefully.'),
            statlect('fundamentals-of-statistics/hypothesis-testing', 'Hypothesis testing', 'The general framework of tests, errors and power.'),
            {
              title: 'Seeing Theory: Frequentist Inference',
              url: 'https://seeing-theory.brown.edu/frequentist-inference/index.html',
              type: 'interactive',
              cost: 'free',
              provider: 'Brown University',
              note: 'Interactive visualisations of confidence interval coverage and of hypothesis tests.',
            },
          ],
          exercises: [
            {
              slug: 'z-and-t-intervals',
              title: 'Intervals by hand',
              prompt:
                'A sample of $n = 9$ measurements has $\\bar x = 4.20$ and $s = 0.45$. Give the 95% $t$ interval for $\\mu$, and the 95% $z$ interval you would get by wrongly treating $s$ as the true $\\sigma$. Explain which is appropriate and why the second is too narrow. How large must $n$ be for a $z$ interval with known $\\sigma = 0.45$ to have half-width at most $0.1$?',
              kind: 'problem',
              difficulty: 1,
              hint: '$t_{8, 0.025} \\approx 2.306$, giving $4.20 \\pm 0.346$; the $z$ version is $4.20 \\pm 0.294$. For the half-width, $n \\ge (1.96 \\cdot 0.45/0.1)^2 \\approx 77.8$, so $n = 78$.',
            },
            {
              slug: 'two-sided-power',
              title: 'Power of one- and two-sided tests',
              prompt:
                'In the worked example, write the power function $\\beta(\\mu)$ of the one-sided test and of the two-sided level-0.05 test of $\\mu = 50$. Evaluate both at $\\mu = 48, 49, 50, 51, 52$ and plot them. Which test would you use, and when?',
              kind: 'problem',
              difficulty: 2,
              hint: 'At $\\mu = 52$, the powers are about $0.804$ (one-sided) and $0.705$ (two-sided). At $\\mu = 48$, the one-sided test has power essentially $0$.',
            },
            {
              slug: 'coverage-under-skew',
              title: 'How robust is the t interval?',
              prompt:
                'Estimate by simulation the actual coverage of the nominal 95% $t$ interval for $\\mu$ when the data are (a) normal, (b) exponential, (c) lognormal with $\\sigma = 1$, for $n = 5, 10, 30, 100$. Use at least $5 \\times 10^4$ replications and report Monte Carlo standard errors. Explain the pattern with the CLT.',
              kind: 'simulation',
              difficulty: 2,
            },
            {
              slug: 'p-value-uniform',
              title: 'p-values are uniform under the null',
              prompt:
                'Prove that if a test statistic $T$ has a continuous CDF $F_0$ under a simple $H_0$, and large values are evidence against $H_0$, then the p-value $1 - F_0(T)$ is uniform on $(0, 1)$ under $H_0$. Check by simulating $10^4$ p-values from the one-sided $z$ test under $H_0$. Then show by simulation that p-values from a binomial test are not uniform, and explain why.',
              kind: 'derivation',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'What does "95% confidence" mean, and what does it not mean?',
              answerOutline: 'The procedure covers the true parameter with probability 0.95 over repeated samples; it is not a 0.95 probability that this particular interval contains $\\theta$.',
            },
            {
              question: 'Define size, level and power.',
              answerOutline: 'Power $\\beta(\\theta) = P_\\theta(\\text{reject})$; size $= \\sup_{\\Theta_0}\\beta$; level $\\alpha$ means size $\\le \\alpha$.',
            },
            {
              question: 'How are confidence intervals and two-sided tests related?',
              answerOutline: 'The level-$\\alpha$ test rejects $\\theta = \\theta_0$ exactly when $\\theta_0$ is outside the $1 - \\alpha$ interval; inverting tests gives intervals.',
            },
          ],
        },
        {
          slug: 'moment-generating-functions',
          title: 'Moment-generating functions',
          summary:
            'Define the MGF, compute it for the standard families, extract moments from it, and use the uniqueness theorem to identify distributions, with care about when the MGF exists.',
          estimatedMinutes: 120,
          objectives: [
            'Compute MGFs of the binomial, Poisson, exponential, gamma and normal distributions',
            'Obtain moments from derivatives of the MGF at zero',
            'State the uniqueness theorem with its hypothesis that the MGFs agree on an open interval around $0$',
            'Identify a distribution from its MGF',
            'Give distributions whose MGF does not exist near zero',
          ],
          concepts: [
            'MGF $M_X(t) = E[e^{tX}]$',
            'Existence on an open interval containing $0$',
            'Moments from derivatives $M^{(k)}(0) = E[X^k]$',
            'Uniqueness theorem',
            'MGF of a linear transformation',
            'Cumulant generating function',
            'Distributions without an MGF',
          ],
          explanation: `The **moment-generating function** of a random variable $X$ is $M_X(t) = E[e^{tX}]$, defined for those $t$ where the expectation is finite. It is always finite at $t = 0$. What matters is whether it is finite on an **open interval** $(-h, h)$ around $0$. If it is, three things follow:

1. all moments of $X$ exist;
2. $M_X$ is infinitely differentiable near $0$, and $M_X^{(k)}(0) = E[X^k]$;
3. **uniqueness**: if $M_X(t) = M_Y(t)$ for all $t$ in some open interval around $0$, then $X$ and $Y$ have the same distribution.

The third fact is what makes MGFs a tool for identifying distributions. Linear changes are simple: $M_{a + bX}(t) = e^{at}M_X(bt)$. The **cumulant generating function** $K(t) = \\ln M(t)$ gives $K'(0) = EX$ and $K''(0) = \\operatorname{Var}X$, which is often the quickest route to the variance.

The standard MGFs are:

- binomial: $(1 - p + pe^t)^n$;
- Poisson: $\\exp(\\lambda(e^t - 1))$;
- exponential with rate $\\lambda$: $\\lambda/(\\lambda - t)$ for $t < \\lambda$;
- normal: $\\exp(\\mu t + \\sigma^2t^2/2)$.

**Worked example: the gamma family.** Let $X$ have shape $\\alpha > 0$ and scale $\\beta > 0$, with density $x^{\\alpha-1}e^{-x/\\beta}/(\\Gamma(\\alpha)\\beta^\\alpha)$ for $x > 0$. Then
$$M(t) = \\frac{1}{\\Gamma(\\alpha)\\beta^\\alpha}\\int_0^\\infty x^{\\alpha-1}e^{-x(1/\\beta - t)}\\,dx.$$
The integral converges only when $1/\\beta - t > 0$, that is, $t < 1/\\beta$. That condition defines an open interval around $0$, as required. Substituting $u = x(1/\\beta - t)$ turns the integral into $\\Gamma(\\alpha)(1/\\beta - t)^{-\\alpha}$, so
$$M(t) = (1 - \\beta t)^{-\\alpha},\\qquad t < 1/\\beta.$$
Then $K(t) = -\\alpha\\ln(1 - \\beta t)$, $K'(t) = \\alpha\\beta/(1 - \\beta t)$ and $K''(t) = \\alpha\\beta^2/(1 - \\beta t)^2$. So $EX = \\alpha\\beta$ and $\\operatorname{Var}X = \\alpha\\beta^2$. With $\\alpha = 1$ this is the exponential with mean $\\beta$. With $\\alpha = k/2$ and $\\beta = 2$ it is the chi-square with $k$ degrees of freedom, $M(t) = (1 - 2t)^{-k/2}$, which Module 3 uses constantly.

**Uniqueness in use.** Suppose a derivation ends with $M_Y(t) = (1 - 2t)^{-3}$ for $t < \\tfrac12$. Then $Y$ is chi-square with $6$ degrees of freedom, with no further integration needed.

**When the MGF fails.** The Cauchy distribution has no mean, so $E e^{tX} = \\infty$ for every $t \\ne 0$. The lognormal has every moment, yet $E e^{tX} = \\infty$ for every $t > 0$. Its moments do not determine its distribution: other distributions have exactly the same moments. So "all moments agree" is weaker than "MGFs agree near $0$". The **characteristic function** $E e^{itX}$ always exists and has its own uniqueness theorem, which is why proofs of the general CLT use it.

**Pitfall.** Uniqueness needs agreement on an open interval around $0$. Agreement at a single $t$, or only on $t \\le 0$, is not enough for the theorem as stated.`,
          resources: [
            siegrist('expect/Generating', 'Generating Functions', 'MGFs, characteristic functions, uniqueness and the lognormal counterexample.', true),
            statlect('fundamentals-of-probability/moment-generating-function', 'Moment generating function', 'Definition, moments, and worked examples for the standard families.'),
            wasserman('The early lecture notes review MGFs and their use with sums and limits.'),
          ],
          exercises: [
            {
              slug: 'normal-mgf',
              title: 'The normal MGF by completing the square',
              prompt:
                'Derive $M(t) = \\exp(\\mu t + \\sigma^2t^2/2)$ for $X \\sim N(\\mu, \\sigma^2)$ by completing the square in the exponent. Use the cumulant generating function to read off the mean and variance, and show that the third and fourth cumulants are zero.',
              kind: 'derivation',
              difficulty: 1,
            },
            {
              slug: 'identify-from-mgf',
              title: 'Name that distribution',
              prompt:
                'Identify the distribution, with its parameters, of a random variable whose MGF is: (a) $(0.3 + 0.7e^t)^5$; (b) $e^{2t + 8t^2}$; (c) $\\exp(4(e^t - 1))$; (d) $(1 - 3t)^{-2}$ for $t < \\tfrac13$; (e) $\\frac{e^t}{2 - e^t}$ for $t < \\ln 2$. Find the mean and variance of each from the MGF.',
              kind: 'problem',
              difficulty: 1,
              hint: '(a) Binomial$(5, 0.7)$; (b) $N(2, 16)$; (c) Poisson$(4)$; (d) gamma with shape $2$, scale $3$; (e) geometric on $\\{1, 2, \\dots\\}$ with $p = \\tfrac12$.',
            },
            {
              slug: 'lognormal-no-mgf',
              title: 'The lognormal has no MGF',
              prompt:
                'Let $X = e^Z$ with $Z \\sim N(0, 1)$. Show that $E[X^k] = e^{k^2/2}$ for every positive integer $k$, but that $E[e^{tX}] = \\infty$ for every $t > 0$. Explain which hypothesis of the uniqueness theorem fails, and why a series $\\sum t^kE[X^k]/k!$ cannot represent $E e^{tX}$ here.',
              kind: 'derivation',
              difficulty: 3,
              hint: 'Compare $e^{tx}$ with the decay of the lognormal density, which is like $e^{-(\\ln x)^2/2}$.',
            },
            {
              slug: 'mgf-numerically',
              title: 'Check an MGF numerically',
              prompt:
                'For the gamma distribution with $\\alpha = 2.5$ and $\\beta = 0.8$, estimate $M(t)$ at $t = -1, 0.5, 1.0$ by averaging $e^{tX}$ over $10^6$ simulated values, and compare with $(1 - \\beta t)^{-\\alpha}$. Explain why the estimate at $t = 1.0$ is much noisier than at $t = 0.5$, by computing the variance of $e^{tX}$ from the MGF at $2t$.',
              kind: 'simulation',
              difficulty: 2,
              hint: '$\\operatorname{Var}(e^{tX}) = M(2t) - M(t)^2$, which requires $2t < 1/\\beta = 1.25$. At $t = 1$ it is infinite.',
            },
          ],
          selfAssessment: [
            {
              question: 'State the uniqueness theorem for MGFs with its hypothesis.',
              answerOutline: 'If $M_X$ and $M_Y$ are finite and equal on some open interval $(-h, h)$, $h > 0$, then $X$ and $Y$ have the same distribution.',
            },
            {
              question: 'How do you get $E[X^k]$ from the MGF?',
              answerOutline: '$E[X^k] = M^{(k)}(0)$, valid when $M$ is finite on an open interval around $0$.',
            },
            {
              question: 'Give a distribution with all moments finite but no MGF near zero.',
              answerOutline: 'The lognormal: $E e^{tX} = \\infty$ for every $t > 0$.',
            },
          ],
        },
        {
          slug: 'sums-of-independent-variables',
          title: 'Sums of independent random variables',
          summary:
            'For independent variables the MGF of a sum is the product of MGFs. Use this to find the distributions of sums of Poisson, exponential, gamma, normal and chi-square variables, and of the sample mean.',
          estimatedMinutes: 100,
          objectives: [
            'Prove $M_{X+Y} = M_XM_Y$ for independent $X$ and $Y$',
            'Derive the distribution of sums of independent Poisson, gamma, normal and chi-square variables',
            'Find the exact distribution of the sample mean of normal data',
            'Recognise when the product rule fails because independence fails',
            'Confirm a derived distribution by simulation and a goodness-of-fit check',
          ],
          concepts: [
            'MGF of a sum of independent variables',
            'Closure of families under addition',
            'Gamma sums with a common scale',
            'Linear combinations of independent normals',
            'Distribution of $\\bar X$ for normal data',
            'Convolution',
          ],
          explanation: `If $X$ and $Y$ are independent, then $e^{tX}$ and $e^{tY}$ are independent, and the expectation of a product of independent variables is the product of expectations. So
$$M_{X+Y}(t) = M_X(t)\\,M_Y(t)$$
wherever both are finite. For $X_1, \\dots, X_n$ independent, $M_{\\sum X_i} = \\prod M_{X_i}$. Combined with uniqueness, this identifies the distribution of a sum without computing a convolution integral. Several families are closed under independent addition:

- **Poisson.** $e^{\\lambda_1(e^t-1)}e^{\\lambda_2(e^t-1)} = e^{(\\lambda_1+\\lambda_2)(e^t-1)}$, so the sum is Poisson$(\\lambda_1 + \\lambda_2)$.
- **Gamma with a common scale.** $(1 - \\beta t)^{-\\alpha_1}(1 - \\beta t)^{-\\alpha_2} = (1 - \\beta t)^{-(\\alpha_1+\\alpha_2)}$. In particular, the sum of $n$ iid exponentials with mean $\\beta$ is gamma with shape $n$ and scale $\\beta$. The scales must match: there is no such simple rule for unequal scales.
- **Chi-square.** $\\chi^2_{k_1} + \\chi^2_{k_2} = \\chi^2_{k_1+k_2}$ for independent summands, a special case of the gamma rule.
- **Normal.** For independent $X_i \\sim N(\\mu_i, \\sigma_i^2)$, every linear combination $\\sum a_iX_i$ is $N(\\sum a_i\\mu_i, \\sum a_i^2\\sigma_i^2)$.
- **Binomial with a common $p$.** The sum is again binomial, with the numbers of trials added.

**Worked example.** Calls arrive at two independent help desks as Poisson counts with means $2$ and $3$ per hour. Find the probability of exactly $4$ calls in total in an hour, and then the distribution of the mean of a normal sample.

The total has MGF $e^{2(e^t-1)}e^{3(e^t-1)} = e^{5(e^t-1)}$, so it is Poisson$(5)$ and
$$P(X + Y = 4) = e^{-5}\\frac{5^4}{4!} = \\frac{625}{24}e^{-5} \\approx 0.1755.$$
Doing the same by convolution means summing $P(X = j)P(Y = 4 - j)$ over $j = 0, \\dots, 4$. The binomial theorem collapses that sum to the same answer, which is a good exercise.

Now let $X_1, \\dots, X_n$ be iid $N(\\mu, \\sigma^2)$. Using $M_{X/n}(t) = M_X(t/n)$,
$$M_{\\bar X}(t) = \\left[\\exp\\left(\\frac{\\mu t}{n} + \\frac{\\sigma^2t^2}{2n^2}\\right)\\right]^n = \\exp\\left(\\mu t + \\frac{\\sigma^2}{n}\\frac{t^2}{2}\\right).$$
So $\\bar X \\sim N(\\mu, \\sigma^2/n)$ exactly, for every $n$, not only approximately as the CLT would say.

**Independence matters.** If $Y = X$ with $X \\sim N(0, 1)$, then $M_{X+Y}(t) = M_{2X}(t) = e^{2t^2}$, while $M_X(t)M_Y(t) = e^{t^2}$. The product rule needs independence, and zero correlation is not enough in general. For a pair that is jointly normal, though, zero correlation does imply independence. Module 3 relies on that.

**Simulation check.** Simulate $10^5$ sums of five iid exponentials with mean $1$. Overlay the gamma(5, 1) density on the histogram, and run scipy.stats.kstest against that distribution. With a correct derivation, the p-value behaves like a uniform draw rather than being tiny.

**Pitfall.** These rules give exact distributions only for these families. A sum of independent uniforms is not uniform, and its distribution must be found by convolution.`,
          resources: [
            statlect('fundamentals-of-probability/sums-of-independent-random-variables', 'Sums of independent random variables', 'Convolution formulas and the MGF approach, with examples.'),
            siegrist('expect/Generating', 'Generating Functions', 'The product rule for sums and its use with the standard families.', true),
            scipyStats('Use scipy.stats.gamma, poisson and kstest for the simulation checks.'),
          ],
          exercises: [
            {
              slug: 'poisson-by-convolution',
              title: 'Poisson sum by convolution',
              prompt:
                'Show by direct convolution, using the binomial theorem, that the sum of independent Poisson($\\lambda_1$) and Poisson($\\lambda_2$) variables is Poisson($\\lambda_1 + \\lambda_2$). Then show that, given $X + Y = n$, $X$ is binomial with $n$ trials and success probability $\\lambda_1/(\\lambda_1 + \\lambda_2)$.',
              kind: 'derivation',
              difficulty: 1,
            },
            {
              slug: 'linear-combination',
              title: 'A linear combination of normals',
              prompt:
                'Let $X \\sim N(1, 4)$ and $Y \\sim N(-2, 9)$ be independent. Find the distribution of $W = 2X - 3Y$ by MGFs, and compute $P(W > 20)$. Confirm by simulation with $10^6$ draws.',
              kind: 'problem',
              difficulty: 1,
              hint: '$W \\sim N(8, 97)$, and $P(W > 20) = 1 - \\Phi(12/\\sqrt{97}) \\approx 0.111$.',
            },
            {
              slug: 'exponential-sum-gamma',
              title: 'Sums of exponentials',
              prompt:
                'Prove with MGFs that the sum of $n$ iid exponentials with rate $\\lambda$ is gamma with shape $n$ and scale $1/\\lambda$, and hence that $2\\lambda\\sum X_i \\sim \\chi^2_{2n}$. Check the second claim by simulation for $n = 5$, $\\lambda = 0.3$ with a Kolmogorov-Smirnov test. This fact is used again for exact intervals in Module 6.',
              kind: 'simulation',
              difficulty: 2,
            },
            {
              slug: 'uniform-sum',
              title: 'The sum of two uniforms',
              prompt:
                'Find the density of $X + Y$ for independent uniforms on $(0, 1)$ by convolution, and verify that its MGF equals $\\left(\\frac{e^t - 1}{t}\\right)^2$. Explain why the sum of uniforms is not in the uniform family, while sums of normals stay normal.',
              kind: 'derivation',
              difficulty: 2,
              hint: 'The density is triangular: $s$ on $(0, 1)$ and $2 - s$ on $(1, 2)$.',
            },
          ],
          selfAssessment: [
            {
              question: 'Why is $M_{X+Y} = M_XM_Y$ for independent $X$ and $Y$?',
              answerOutline: '$e^{t(X+Y)} = e^{tX}e^{tY}$ and expectations of products of independent variables factor.',
            },
            {
              question: 'What is the exact distribution of $\\bar X$ for iid $N(\\mu, \\sigma^2)$ data?',
              answerOutline: '$N(\\mu, \\sigma^2/n)$, from $M_{\\bar X}(t) = M(t/n)^n$.',
            },
            {
              question: 'When is a sum of gamma variables gamma?',
              answerOutline: 'When they are independent and share the same scale; the shapes add.',
            },
          ],
        },
      ],
      project: {
        slug: 'estimator-simulation-harness',
        title: 'A simulation harness for estimators and intervals',
        description: `Almost every later lesson asks you to check a bias, variance, coverage or power formula by simulation. In this project you build a small, reusable Python module that does this reliably, and you validate it on the cases from this module where the exact answers are known.

The harness should take a data-generating function, an estimator or interval function, a true parameter value and a number of replications. It should return estimates with Monte Carlo standard errors, use a seeded NumPy generator for reproducibility, and vectorise across replications where possible.`,
        deliverables: [
          'A Python module with functions for bias, variance, MSE, coverage and rejection rate, each returning a Monte Carlo standard error',
          'Validation on the uniform example: estimated bias, variance and MSE of $2\\bar X$, $X_{(n)}$ and $\\frac{n+1}{n}X_{(n)}$ within three standard errors of the exact values for $n = 5, 10, 20$',
          'Coverage of the $z$ and $t$ intervals for normal, exponential and lognormal data, with a table and a short discussion',
          'A power curve for the one-sided $z$ test with the exact curve overlaid',
          'A README explaining how to choose the number of replications to reach a target standard error',
        ],
        estimatedHours: 8,
        stretchGoals: [
          'Add common random numbers so that two estimators are compared on the same simulated samples, and show how much this reduces the standard error of the difference',
          'Parallelise the harness with numpy vectorisation or multiprocessing and report the speed-up',
        ],
      },
    },
    {
      slug: 'transformations-of-random-variables',
      title: 'Transformations of Random Variables',
      description:
        'Find the distribution of a function of random variables: the CDF method and the change-of-variables formula for one variable, many-to-one maps, Jacobians for several variables, and the distributions of order statistics.',
      lessons: [
        {
          slug: 'one-to-one-transformations',
          title: 'The CDF method and one-to-one transformations',
          summary:
            'Find the density of $Y = g(X)$ by the CDF method and by the change-of-variables formula for monotone $g$. Then use the probability integral transform to simulate from any continuous distribution.',
          estimatedMinutes: 110,
          objectives: [
            'Derive the distribution of $Y = g(X)$ by computing its CDF directly',
            'State and apply the change-of-variables formula for strictly monotone differentiable $g$',
            'Prove the probability integral transform for continuous CDFs',
            'Generate samples from a distribution by inverting its CDF, and check them by simulation',
          ],
          concepts: [
            'CDF method',
            'Change-of-variables formula',
            'Strictly monotone transformation',
            'Support of the transformed variable',
            'Probability integral transform',
            'Inverse transform sampling',
            'Generalised inverse (quantile function)',
          ],
          explanation: `To find the distribution of $Y = g(X)$, the most reliable method is the **CDF method**. Compute $F_Y(y) = P(g(X) \\le y)$ by rewriting the event $\\{g(X) \\le y\\}$ in terms of $X$, then differentiate. It works for any $g$, monotone or not, and it forces you to track the support.

When $g$ is strictly monotone and differentiable on the support of $X$, with inverse $x = h(y)$, the CDF method gives a general formula:
$$f_Y(y) = f_X(h(y))\\,|h'(y)|\\quad\\text{for } y \\text{ in } g(\\text{support of } X),$$
and $f_Y(y) = 0$ elsewhere. The factor $|h'(y)|$ accounts for stretching. If $g$ spreads an interval of $x$ values over a longer interval of $y$ values, the density must drop to keep the total probability equal to $1$. The absolute value covers decreasing $g$. Forgetting it, or forgetting to state the new support, are the two classic errors.

**Worked example.** Let $X \\sim$ Exponential(1) and $Y = \\sqrt X$.

By the CDF method: for $y > 0$, $F_Y(y) = P(\\sqrt X \\le y) = P(X \\le y^2) = 1 - e^{-y^2}$. So $f_Y(y) = 2ye^{-y^2}$ for $y > 0$.

By the formula: $h(y) = y^2$, $h'(y) = 2y$, and $f_X(h(y)) = e^{-y^2}$, giving the same $2ye^{-y^2}$. This is a Rayleigh distribution. As a check, $\\int_0^\\infty 2ye^{-y^2}dy = [-e^{-y^2}]_0^\\infty = 1$. Its mean is $E\\sqrt X = \\Gamma(3/2) = \\sqrt\\pi/2 \\approx 0.886$, which you can confirm by simulating exponentials and taking square roots.

**The probability integral transform.** If $X$ has a continuous CDF $F$, then $U = F(X)$ is uniform on $(0, 1)$. The proof is the CDF method: for $0 < u < 1$, $P(F(X) \\le u) = u$. Continuity of $F$ is essential. For a discrete $X$, $F(X)$ takes only finitely or countably many values. Conversely, if $U$ is uniform, then $X = F^{-1}(U)$ has CDF $F$. Here $F^{-1}(u) = \\inf\\{x : F(x) \\ge u\\}$, the quantile function, which works even when $F$ has flat stretches or jumps. This is **inverse transform sampling**. For the exponential with rate $\\lambda$, $F(x) = 1 - e^{-\\lambda x}$ gives $X = -\\ln(1 - U)/\\lambda$, and since $1 - U$ is also uniform, $-\\ln(U)/\\lambda$ works too.

The transform also explains a fact from Module 1. The p-value of a continuous test statistic under a simple null is $1 - F_0(T)$, which is uniform.

**Pitfall.** The formula needs $g$ to be one-to-one on the support. For $Y = X^2$ with $X$ taking both signs it fails. The next lesson handles that case.`,
          resources: [
            siegrist('dist/Transformations', 'Transformations of Random Variables', 'The CDF method, the change-of-variables formula and the probability integral transform, with exercises.', true),
            statlect('fundamentals-of-probability/functions-of-random-variables-and-their-distribution', 'Functions of random variables', 'Strictly increasing and decreasing cases worked separately.'),
            scipyStats('Use the ppf (quantile) and cdf methods to check inverse transform samplers.'),
          ],
          exercises: [
            {
              slug: 'log-uniform',
              title: 'Minus twice a log uniform',
              prompt:
                'Let $U$ be uniform on $(0, 1)$ and $Y = -2\\ln U$. Find the density of $Y$ by the CDF method and by the formula, and identify it as a chi-square distribution. Confirm with a histogram of $10^5$ simulated values.',
              kind: 'problem',
              difficulty: 1,
              hint: '$f_Y(y) = \\tfrac12e^{-y/2}$ for $y > 0$, which is $\\chi^2_2$.',
            },
            {
              slug: 'pareto-sampler',
              title: 'An inverse transform sampler',
              prompt:
                'The Pareto distribution with scale $x_m > 0$ and shape $a > 0$ has CDF $F(x) = 1 - (x_m/x)^a$ for $x \\ge x_m$. Derive the inverse transform sampler, implement it, and check with scipy.stats.kstest against scipy.stats.pareto (note SciPy\'s parametrisation). For $a = 1.5$, estimate $EX$ from $10^6$ samples and compare with $ax_m/(a - 1)$. Explain why the estimate converges so slowly.',
              kind: 'simulation',
              difficulty: 2,
              hint: 'For $a = 1.5$ the variance is infinite, so the CLT rate does not apply to the sample mean.',
            },
            {
              slug: 'pit-proof',
              title: 'The probability integral transform',
              prompt:
                'Prove that if $F$ is continuous then $F(X)$ is uniform on $(0, 1)$, and that for any CDF $F$, $F^{-1}(U)$ has CDF $F$, where $F^{-1}(u) = \\inf\\{x : F(x) \\ge u\\}$. For the second part, first show $F^{-1}(u) \\le x \\iff u \\le F(x)$. Give an example showing that $F(X)$ need not be uniform when $F$ has a jump.',
              kind: 'derivation',
              difficulty: 3,
            },
            {
              slug: 'lognormal-density',
              title: 'The lognormal density',
              prompt:
                'Let $X \\sim N(\\mu, \\sigma^2)$ and $Y = e^X$. Derive the density of $Y$, find its median and mean, and explain why the mean exceeds the median. Then find the density of $W = 1/Y$ and identify its family.',
              kind: 'problem',
              difficulty: 1,
              hint: 'Median $e^\\mu$, mean $e^{\\mu + \\sigma^2/2}$; $W$ is lognormal with parameters $-\\mu, \\sigma^2$.',
            },
          ],
          selfAssessment: [
            {
              question: 'State the change-of-variables formula for a strictly monotone $g$.',
              answerOutline: '$f_Y(y) = f_X(h(y))|h\'(y)|$ on the image of the support, with $h = g^{-1}$; zero elsewhere.',
            },
            {
              question: 'Why does the formula need an absolute value?',
              answerOutline: 'For decreasing $g$, $h\'(y) < 0$; the CDF method gives $f_Y = -f_X(h)h\'$, which is positive.',
            },
            {
              question: 'How do you simulate from a continuous distribution with CDF $F$ given only uniform random numbers?',
              answerOutline: 'Return $F^{-1}(U)$, the quantile function at a uniform $U$.',
            },
          ],
        },
        {
          slug: 'many-to-one-transformations',
          title: 'Many-to-one transformations',
          summary:
            'When several values of $x$ map to the same $y$, add their contributions. Derive the chi-square distribution with one degree of freedom from $Z^2$ and handle supports that are not symmetric.',
          estimatedMinutes: 100,
          objectives: [
            'Apply the CDF method to non-monotone transformations such as $X^2$ and $|X|$',
            'Use the branch-sum formula when the support splits into pieces where $g$ is monotone',
            'Derive the $\\chi^2_1$ density from the square of a standard normal',
            'Handle asymmetric supports in which different $y$ ranges have different numbers of preimages',
          ],
          concepts: [
            'Partition of the support into monotone pieces',
            'Branch-sum formula',
            'Square of a standard normal',
            'Chi-square with one degree of freedom',
            'Half-normal distribution',
            'Preimage counting',
          ],
          explanation: `Suppose the support of $X$ splits into pieces $A_1, \\dots, A_k$, and on each piece $g$ is strictly monotone and differentiable, with inverse $h_i$. Then each $y$ receives a contribution from each piece whose image contains it:
$$f_Y(y) = \\sum_{i\\,:\\,y \\in g(A_i)} f_X(h_i(y))\\,|h_i'(y)|.$$
The number of terms can change with $y$. That is the point to watch, and the CDF method shows it clearly.

**Worked example: the square of a standard normal.** Let $Z \\sim N(0, 1)$ and $Y = Z^2$. For $y > 0$,
$$F_Y(y) = P(-\\sqrt y \\le Z \\le \\sqrt y) = \\Phi(\\sqrt y) - \\Phi(-\\sqrt y).$$
Differentiate, using $\\frac{d}{dy}\\sqrt y = \\frac{1}{2\\sqrt y}$:
$$f_Y(y) = \\varphi(\\sqrt y)\\frac{1}{2\\sqrt y} + \\varphi(-\\sqrt y)\\frac{1}{2\\sqrt y} = \\frac{1}{\\sqrt{2\\pi y}}e^{-y/2},\\qquad y > 0.$$
The two terms are the two branches $z = \\pm\\sqrt y$, as the branch-sum formula says. Compare with the gamma density with shape $\\tfrac12$ and scale $2$: $\\frac{y^{-1/2}e^{-y/2}}{\\Gamma(1/2)2^{1/2}}$, which is the same function since $\\Gamma(\\tfrac12) = \\sqrt\\pi$. So $Z^2 \\sim \\chi^2_1$, and its MGF is $(1 - 2t)^{-1/2}$. The density blows up at $y = 0$ but remains integrable, because $y^{-1/2}$ is integrable near $0$. This one fact, plus additivity of independent chi-squares, gives $\\sum_{i=1}^k Z_i^2 \\sim \\chi^2_k$. That result runs through all of normal sampling theory.

**An asymmetric support.** Let $X$ be uniform on $(-1, 2)$, with density $\\tfrac13$, and let $Y = X^2$, which takes values in $[0, 4)$.

- For $0 < y < 1$, both $\\pm\\sqrt y$ lie in the support, so $f_Y(y) = 2 \\cdot \\tfrac13 \\cdot \\frac{1}{2\\sqrt y} = \\frac{1}{3\\sqrt y}$.
- For $1 < y < 4$, only $+\\sqrt y$ does, so $f_Y(y) = \\frac{1}{6\\sqrt y}$.

The pieces integrate to $\\tfrac23$ and $\\tfrac13$, which are the probabilities that $|X| < 1$ and $X > 1$. A histogram of simulated $X^2$ values shows the drop at $y = 1$ clearly.

**A physical example.** A molecule's velocity component $V$ along one axis is $N(0, kT/m)$, and the kinetic energy in that direction is $E = \\tfrac12mV^2 = \\tfrac12kT\\,(V\\sqrt{m/kT})^2$. So $E$ is $\\tfrac12kT$ times a $\\chi^2_1$ variable, with mean $\\tfrac12kT$. That is the equipartition theorem for one degree of freedom.

**Pitfall.** Applying the monotone formula to $Y = Z^2$ with only the positive branch gives half the correct density, which integrates to $\\tfrac12$. Always check that your density integrates to $1$.`,
          resources: [
            siegrist('dist/Transformations', 'Transformations of Random Variables', 'Non-monotone transformations, including the square of a normal.', true),
            siegrist('special/ChiSquare', 'The Chi-Square Distribution', 'The chi-square family, its density and its relation to the gamma.'),
            statlect('probability-distributions/chi-square-distribution', 'Chi-square distribution', 'Derivations and properties of the chi-square family.'),
          ],
          exercises: [
            {
              slug: 'uniform-squared',
              title: 'An asymmetric square',
              prompt:
                'Reproduce the density of $Y = X^2$ for $X$ uniform on $(-1, 2)$ by the CDF method, writing $F_Y$ separately on $(0, 1)$ and $(1, 4)$. Check that it integrates to $1$, compute $EY$ two ways (from $f_Y$ and as $EX^2$), and compare a histogram of $10^5$ simulated values with your density.',
              kind: 'problem',
              difficulty: 1,
              hint: '$EY = EX^2 = 1$.',
            },
            {
              slug: 'half-normal',
              title: 'The half-normal',
              prompt:
                'Find the density, mean and variance of $|Z|$ for $Z \\sim N(0, 1)$. Then find the density of $Y = Z^2$ restricted to the event $Z > 1$; that is, the conditional density of $Z^2$ given $Z > 1$. State the support of each.',
              kind: 'problem',
              difficulty: 2,
              hint: '$|Z|$ has density $2\\varphi(y)$ on $y > 0$, mean $\\sqrt{2/\\pi}$ and variance $1 - 2/\\pi$.',
            },
            {
              slug: 'equipartition',
              title: 'Energy in one degree of freedom',
              prompt:
                'Using the branch-sum formula, show that if $V \\sim N(0, \\sigma^2)$ then $E = \\tfrac12mV^2$ has a gamma distribution with shape $\\tfrac12$ and scale $m\\sigma^2$. Then, using the MGF of a sum, show that the total kinetic energy $\\tfrac12m(V_x^2 + V_y^2 + V_z^2)$, with independent components, is gamma with shape $\\tfrac32$, and find its mean.',
              kind: 'derivation',
              difficulty: 2,
              hint: 'The mean of the total is $\\tfrac32m\\sigma^2$, which is $\\tfrac32kT$ when $\\sigma^2 = kT/m$.',
            },
            {
              slug: 'square-of-shifted-normal',
              title: 'The square of a shifted normal',
              prompt:
                'Let $X \\sim N(\\mu, 1)$ with $\\mu \\ne 0$. Derive the density of $Y = X^2$ by the branch-sum formula, and show that it can be written $f_Y(y) = \\frac{e^{-(y+\\mu^2)/2}}{\\sqrt{2\\pi y}}\\cosh(\\mu\\sqrt y)$. This is the noncentral chi-square with one degree of freedom. Check it numerically against scipy.stats.ncx2 with noncentrality $\\mu^2$.',
              kind: 'derivation',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'Write the branch-sum formula and say when the number of terms can change.',
              answerOutline: '$f_Y(y) = \\sum f_X(h_i(y))|h_i\'(y)|$ over monotone pieces whose image contains $y$; it changes where some branch\'s image ends.',
            },
            {
              question: 'Derive the density of $Z^2$ in two lines.',
              answerOutline: '$F(y) = \\Phi(\\sqrt y) - \\Phi(-\\sqrt y)$; differentiating gives $2\\varphi(\\sqrt y)/(2\\sqrt y) = e^{-y/2}/\\sqrt{2\\pi y}$, i.e. $\\chi^2_1$.',
            },
            {
              question: 'What quick check catches a missing branch?',
              answerOutline: 'Integrate the density: a missing branch gives total mass less than $1$.',
            },
          ],
        },
        {
          slug: 'jacobians-and-several-variables',
          title: 'Several variables: Jacobians',
          summary:
            'Transform a joint density with the Jacobian of the inverse map, use auxiliary variables to find densities of sums and ratios, and derive the gamma-beta relationship and the Box-Muller method.',
          estimatedMinutes: 130,
          objectives: [
            'State the multivariate change-of-variables formula with its hypotheses',
            'Compute Jacobians of inverse maps and transform joint densities, including the new support',
            'Introduce an auxiliary variable to find the density of a single function of two variables',
            'Derive the joint distribution of $X + Y$ and $X/(X + Y)$ for independent gamma variables',
            'Prove that the Box-Muller transform produces independent standard normals',
          ],
          concepts: [
            'One-to-one transformation of a region',
            'Jacobian of the inverse map',
            'Transformed support',
            'Auxiliary variable',
            'Convolution as a special case',
            'Gamma-beta relationship',
            'Independence from factorisation',
            'Box-Muller transform',
          ],
          explanation: `Let $(X, Y)$ have joint density $f_{X,Y}$ supported on a region $A$. Let $(U, V) = g(X, Y)$, where $g$ maps $A$ one-to-one onto a region $B$, with a continuously differentiable inverse $(x, y) = h(u, v)$ whose Jacobian determinant
$$J(u, v) = \\det\\begin{pmatrix} \\partial x/\\partial u & \\partial x/\\partial v\\\\ \\partial y/\\partial u & \\partial y/\\partial v \\end{pmatrix}$$
is nonzero on $B$. Then
$$f_{U,V}(u, v) = f_{X,Y}(h(u, v))\\,|J(u, v)|\\quad\\text{for } (u, v) \\in B,$$
and zero outside $B$. This is the change-of-variables theorem for double integrals, read as a statement about probabilities. Finding $B$ is part of the answer: map the boundary of $A$ and check a test point.

To find the density of a single function $U = g_1(X, Y)$, invent a convenient second variable $V$, transform, and integrate $V$ out. With $U = X + Y$ and $V = X$, this reproduces the convolution formula $f_U(u) = \\int f_{X,Y}(v, u - v)\\,dv$. If the joint density of $(U, V)$ factors as a function of $u$ times a function of $v$ on a product region, then $U$ and $V$ are independent.

**Worked example.** Let $X$ and $Y$ be iid Exponential(1). Find the joint distribution of $U = X + Y$ and $V = X/(X + Y)$.

The map takes $A = (0, \\infty)^2$ onto $B = (0, \\infty) \\times (0, 1)$, with inverse $x = uv$, $y = u(1 - v)$. Then
$$J = \\det\\begin{pmatrix} v & u\\\\ 1 - v & -u \\end{pmatrix} = -uv - u(1 - v) = -u,\\qquad |J| = u.$$
Since $f_{X,Y}(x, y) = e^{-(x+y)} = e^{-u}$,
$$f_{U,V}(u, v) = ue^{-u}\\quad\\text{for } u > 0,\\ 0 < v < 1.$$
This factors as $ue^{-u}$ times $1$ on a product region. So $U \\sim$ Gamma(2, 1), $V \\sim$ Uniform(0, 1), and $U$ and $V$ are independent. Knowing the total of two exponential waiting times tells you nothing about how it splits.

The general version, for independent Gamma($\\alpha$, 1) and Gamma($\\beta$, 1), gives $U \\sim$ Gamma($\\alpha + \\beta$, 1) independent of $V \\sim$ Beta($\\alpha$, $\\beta$). The Jacobian is the same, and the factor $u^{\\alpha+\\beta-1}$ appears. This is how the beta function's relation $B(\\alpha, \\beta) = \\Gamma(\\alpha)\\Gamma(\\beta)/\\Gamma(\\alpha + \\beta)$ falls out of probability.

**Check by simulation.** Generate $10^5$ pairs, compute $U$ and $V$, and confirm three things: $V$ looks uniform (Kolmogorov-Smirnov test), $U$ matches Gamma(2, 1), and the sample correlation of $U$ and $V$ is near zero. Zero correlation does not prove independence. Also compare, for example, the histogram of $V$ given $U > 3$ with the unconditional one.

**Pitfall.** Use the Jacobian of the inverse map, $\\partial(x, y)/\\partial(u, v)$. If you compute the forward Jacobian $\\partial(u, v)/\\partial(x, y)$ instead, you must divide by it, not multiply.`,
          resources: [
            siegrist('dist/Transformations', 'Transformations of Random Variables', 'The multivariate change-of-variables theorem, sums, products and ratios.', true),
            mit18650('Early lectures review the distributions used for inference; use them alongside Siegrist for the gamma and beta facts.'),
            scipyStats('scipy.stats.gamma, beta and kstest for the simulation checks.'),
          ],
          exercises: [
            {
              slug: 'gamma-beta',
              title: 'Gamma and beta',
              prompt:
                'Let $X \\sim$ Gamma($\\alpha$, 1) and $Y \\sim$ Gamma($\\beta$, 1) be independent. Show that $U = X + Y$ and $V = X/(X + Y)$ are independent with $U \\sim$ Gamma($\\alpha + \\beta$, 1) and $V \\sim$ Beta($\\alpha$, $\\beta$), and deduce $B(\\alpha, \\beta) = \\Gamma(\\alpha)\\Gamma(\\beta)/\\Gamma(\\alpha + \\beta)$. Check by simulation for $\\alpha = 2$, $\\beta = 3.5$.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'box-muller',
              title: 'The Box-Muller transform',
              prompt:
                'Let $U_1, U_2$ be iid uniform on $(0, 1)$, and set $X = \\sqrt{-2\\ln U_1}\\cos(2\\pi U_2)$ and $Y = \\sqrt{-2\\ln U_1}\\sin(2\\pi U_2)$. Prove that $X$ and $Y$ are independent $N(0, 1)$ by computing the joint density of $(X, Y)$ through the inverse map. Implement it and test normality and independence numerically.',
              kind: 'derivation',
              difficulty: 2,
              hint: 'Use $R^2 = X^2 + Y^2 = -2\\ln U_1$ and $\\Theta = 2\\pi U_2$; the Jacobian from polar coordinates is $r$.',
            },
            {
              slug: 'normal-ratio-cauchy',
              title: 'A ratio of normals is Cauchy',
              prompt:
                'Let $Z_1, Z_2$ be iid $N(0, 1)$. Use the auxiliary variable $V = Z_2$ to show that $W = Z_1/Z_2$ has the standard Cauchy density $\\frac{1}{\\pi(1 + w^2)}$. Simulate $10^6$ values and show that the running sample mean does not settle down, while the running sample median does.',
              kind: 'simulation',
              difficulty: 2,
            },
            {
              slug: 'difference-of-uniforms',
              title: 'Support of a transformed region',
              prompt:
                'Let $X, Y$ be iid uniform on $(0, 1)$, $U = X + Y$ and $V = X - Y$. Find the joint density of $(U, V)$, draw its support (a square rotated by $45^\\circ$), and integrate out $V$ to recover the triangular density of $U$. Are $U$ and $V$ uncorrelated? Are they independent?',
              kind: 'problem',
              difficulty: 1,
              hint: '$|J| = \\tfrac12$. They are uncorrelated, but not independent, because the support is not a product region.',
            },
          ],
          selfAssessment: [
            {
              question: 'State the bivariate change-of-variables formula and its hypotheses.',
              answerOutline: '$g$ one-to-one from $A$ onto $B$ with differentiable inverse $h$ and nonzero Jacobian; $f_{U,V} = f_{X,Y}(h(u,v))|J|$ on $B$, zero elsewhere.',
            },
            {
              question: 'How do you find the density of a single function $U = g_1(X, Y)$?',
              answerOutline: 'Add an auxiliary variable $V$ to make a one-to-one map, transform, then integrate out $V$.',
            },
            {
              question: 'When does a factorised joint density imply independence?',
              answerOutline: 'When $f_{U,V}(u,v) = a(u)b(v)$ on a support that is a product set $B_1 \\times B_2$.',
            },
          ],
        },
        {
          slug: 'order-statistics',
          title: 'Order statistics',
          summary:
            'Distributions of the minimum, maximum and $k$-th smallest value of an iid sample, the joint density of the minimum and maximum, and the beta distributions of uniform order statistics.',
          estimatedMinutes: 120,
          objectives: [
            'Derive the CDFs of $X_{(1)}$ and $X_{(n)}$ for iid continuous samples',
            'Derive the density of the $k$-th order statistic by a counting argument',
            'Show that uniform order statistics are beta distributed and compute their moments',
            'Use the joint density of the minimum and maximum to find the distribution of the range',
            'Check order-statistic results by simulation',
          ],
          concepts: [
            'Order statistics $X_{(1)} \\le \\cdots \\le X_{(n)}$',
            'Distribution of the maximum $F^n$',
            'Distribution of the minimum $1 - (1 - F)^n$',
            'Density of $X_{(k)}$',
            'Beta distribution of uniform order statistics',
            'Joint density of two order statistics',
            'Sample range',
            'Exponential spacings',
          ],
          explanation: `Let $X_1, \\dots, X_n$ be iid with continuous CDF $F$ and density $f$, and sort them as $X_{(1)} < \\cdots < X_{(n)}$. Ties have probability zero. The extremes are easy:
$$P(X_{(n)} \\le x) = P(\\text{all } X_i \\le x) = F(x)^n,\\qquad P(X_{(1)} > x) = (1 - F(x))^n.$$
For a general $k$, the event $X_{(k)} \\le x$ means that at least $k$ of the $n$ observations are $\\le x$. The number that are is Binomial($n$, $F(x)$), so
$$P(X_{(k)} \\le x) = \\sum_{j=k}^n \\binom nj F(x)^j(1 - F(x))^{n-j}.$$
Differentiating, or counting directly, gives the density. For $X_{(k)}$ to lie in $[x, x + dx]$, one observation must fall there, $k - 1$ below and $n - k$ above:
$$f_{(k)}(x) = \\frac{n!}{(k-1)!\\,(n-k)!}F(x)^{k-1}(1 - F(x))^{n-k}f(x).$$
For uniforms on $(0, 1)$, this is the Beta($k$, $n - k + 1$) density. So $E X_{(k)} = k/(n + 1)$: on average, $n$ uniform points cut $(0, 1)$ into $n + 1$ equal pieces. The same counting gives the joint density of the minimum and maximum, $n(n-1)(F(y) - F(x))^{n-2}f(x)f(y)$ for $x < y$. From it come the range and the midrange.

**Worked example.** Take $n = 5$ iid uniforms on $(0, 1)$ and their sample median $X_{(3)}$. With $k = 3$, the density is
$$f_{(3)}(x) = \\frac{5!}{2!\\,2!}x^2(1 - x)^2 = 30x^2(1 - x)^2,$$
which is Beta(3, 3). Its mean is $\\tfrac12$, and its variance is $\\frac{3 \\cdot 3}{6^2 \\cdot 7} = \\frac1{28}$, so the standard deviation is about $0.189$. Find $P(X_{(3)} > 0.7)$ two ways.

- **Binomial.** The median exceeds $0.7$ exactly when at most two of the five points fall below $0.7$. That probability is $0.3^5 + 5(0.7)(0.3)^4 + 10(0.7)^2(0.3)^3 = 0.00243 + 0.02835 + 0.1323 = 0.16308$.
- **Integral.** $\\int_{0.7}^1 30x^2(1 - x)^2\\,dx$, with $30x^2(1 - x)^2$ expanded as $30x^2 - 60x^3 + 30x^4$, gives the same $0.16308$.

A simulation of $10^5$ medians of five uniforms should give a proportion within about $0.0012$ (one standard error) of that.

**Exponential spacings.** For iid Exponential($\\lambda$), the minimum is Exponential($n\\lambda$). By memorylessness, the gaps $X_{(k+1)} - X_{(k)}$ are independent Exponential($(n - k)\\lambda$). This gives $E X_{(k)} = \\frac1\\lambda\\sum_{j=n-k+1}^{n}\\frac1j$.

**Pitfall.** Order statistics are not independent, even though the $X_i$ are. In the uniform case, $X_{(1)} \\le X_{(2)}$ forces strong positive dependence. Never multiply their marginal densities.`,
          resources: [
            siegrist('sample/OrderStatistics', 'Order Statistics', 'Distributions of order statistics, the uniform and exponential cases, and simulation applets.', true),
            wasserman('The notes on order statistics and empirical quantiles give a second treatment.'),
            scipyStats('scipy.stats.beta for checking uniform order statistics.'),
          ],
          exercises: [
            {
              slug: 'min-of-exponentials',
              title: 'The first failure',
              prompt:
                'A system of $n$ components fails when the first component fails, and lifetimes are iid Exponential($\\lambda$). Show that the system lifetime is Exponential($n\\lambda$). If the system instead works until the last component fails, find the CDF and mean of its lifetime. Evaluate both means for $n = 4$ and mean component life $1000$ hours.',
              kind: 'problem',
              difficulty: 1,
              hint: 'Means $250$ hours and $1000(1 + \\tfrac12 + \\tfrac13 + \\tfrac14) \\approx 2083$ hours.',
            },
            {
              slug: 'uniform-order-moments',
              title: 'Moments of uniform order statistics',
              prompt:
                'Show that $X_{(k)}$ from $n$ iid uniforms on $(0, 1)$ has mean $k/(n+1)$ and variance $\\frac{k(n - k + 1)}{(n+1)^2(n+2)}$. Then use the joint density of $(X_{(1)}, X_{(n)})$ to show that the range $R = X_{(n)} - X_{(1)}$ is Beta($n - 1$, 2), with mean $(n-1)/(n+1)$.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'median-of-three-exponentials',
              title: 'The median of three exponentials',
              prompt:
                'For three iid Exponential(1) variables, compute $E X_{(2)}$ two ways: with the spacings argument, and by integrating $x f_{(2)}(x)$. Then estimate it by simulation with a Monte Carlo standard error.',
              kind: 'problem',
              difficulty: 2,
              hint: '$E X_{(2)} = \\tfrac13 + \\tfrac12 = \\tfrac56$.',
            },
            {
              slug: 'sample-median-normality',
              title: 'The sample median is approximately normal',
              prompt:
                'For iid samples from a continuous distribution with median $m$ and $f(m) > 0$, the sample median is approximately $N(m, 1/(4nf(m)^2))$ for large odd $n$. Check this by simulation for the standard normal and for the Laplace distribution with $n = 101$, comparing the simulated standard deviation of the median with the formula. For normal data, compute the ratio of the variance of the mean to the variance of the median.',
              kind: 'simulation',
              difficulty: 3,
              hint: 'For $N(0, 1)$, $f(0) = 1/\\sqrt{2\\pi}$, so the variance of the median is about $\\pi/(2n)$, and the ratio is $2/\\pi \\approx 0.64$.',
            },
          ],
          selfAssessment: [
            {
              question: 'Give the CDFs of the maximum and minimum of an iid sample.',
              answerOutline: '$F_{(n)}(x) = F(x)^n$ and $F_{(1)}(x) = 1 - (1 - F(x))^n$.',
            },
            {
              question: 'Explain the counting argument behind the density of $X_{(k)}$.',
              answerOutline: 'Choose which observation lands at $x$ and which $k - 1$ lie below; the multinomial coefficient $n!/((k-1)!(n-k)!)$ times $F^{k-1}(1-F)^{n-k}f$.',
            },
            {
              question: 'What distribution do uniform order statistics have?',
              answerOutline: '$X_{(k)} \\sim$ Beta($k$, $n - k + 1$), with mean $k/(n+1)$.',
            },
          ],
        },
      ],
    },
    {
      slug: 'normal-sampling-theory',
      title: 'Normal Sampling Theory',
      description:
        'The chi-square, $t$ and $F$ distributions, the theorem that the sample mean and variance of a normal sample are independent, and the limit theorems (Slutsky, continuous mapping) that extend normal-theory procedures to large samples.',
      lessons: [
        {
          slug: 'chi-square-distribution',
          title: 'The chi-square distribution',
          summary:
            'Chi-square as a gamma distribution and as a sum of squared standard normals: density, MGF, moments, additivity, rotation invariance of the standard normal vector, and accurate approximations.',
          estimatedMinutes: 100,
          objectives: [
            'Define $\\chi^2_k$ as Gamma($k/2$, scale $2$) and derive its mean, variance and MGF',
            'Prove that a sum of $k$ squared iid standard normals is $\\chi^2_k$',
            'Use additivity of independent chi-squares',
            'Show that an orthogonal transformation of a standard normal vector is a standard normal vector',
            'Compare the normal and Wilson-Hilferty approximations to chi-square tail probabilities',
          ],
          concepts: [
            'Chi-square density and degrees of freedom',
            'MGF $(1 - 2t)^{-k/2}$',
            'Mean $k$, variance $2k$',
            'Additivity',
            'Standard normal vector $N(0, I_n)$',
            'Rotation invariance',
            'Wilson-Hilferty approximation',
          ],
          explanation: `The **chi-square distribution with $k$ degrees of freedom** is the gamma distribution with shape $k/2$ and scale $2$:
$$f(y) = \\frac{y^{k/2-1}e^{-y/2}}{2^{k/2}\\Gamma(k/2)},\\qquad y > 0,$$
with MGF $(1 - 2t)^{-k/2}$ for $t < \\tfrac12$, mean $k$ and variance $2k$. Its importance comes from one fact. **If $Z_1, \\dots, Z_k$ are iid $N(0, 1)$, then $\\sum Z_i^2 \\sim \\chi^2_k$.** The proof combines the last two modules. Each $Z_i^2$ is $\\chi^2_1$ with MGF $(1 - 2t)^{-1/2}$. The squares are independent, so the MGF of the sum is $(1 - 2t)^{-k/2}$, and uniqueness finishes the argument. Additivity follows the same way: independent $\\chi^2_a$ and $\\chi^2_b$ sum to $\\chi^2_{a+b}$. As a first consequence, for iid $N(\\mu, \\sigma^2)$ data with $\\mu$ known, $\\sum(X_i - \\mu)^2/\\sigma^2 \\sim \\chi^2_n$.

**Rotation invariance.** Write $Z = (Z_1, \\dots, Z_n)$ for a vector of iid standard normals. Its joint density is $(2\\pi)^{-n/2}e^{-\\|z\\|^2/2}$, which depends on $z$ only through its length. If $Q$ is an orthogonal matrix and $W = QZ$, the Jacobian of $z = Q^Tw$ has absolute value $|\\det Q^T| = 1$, and $\\|Q^Tw\\| = \\|w\\|$. So $W$ has exactly the same density: $W$ is again a vector of iid $N(0, 1)$. Any orthonormal change of coordinates preserves "iid standard normal". The next lesson proves the central theorem of normal sampling theory with this.

**Worked example.** Find $P(\\chi^2_{10} > 18.31)$ and see how well two approximations do.

From tables or scipy.stats.chi2.sf, the exact value is $0.0500$; $18.31$ is the upper 5% point. The mean is $10$ and the variance $20$.

- **The CLT approximation** treats $\\chi^2_{10}$, a sum of ten iid $\\chi^2_1$ variables, as normal: $P(Z > (18.31 - 10)/\\sqrt{20}) = P(Z > 1.858) \\approx 0.032$. The relative error is about 37%, because the distribution is right-skewed.
- **The Wilson-Hilferty approximation** says $(Y/k)^{1/3}$ is nearly normal with mean $1 - 2/(9k)$ and variance $2/(9k)$. Here $(1.831)^{1/3} = 1.2232$, the mean is $0.97778$ and the standard deviation $0.14907$. So $z = (1.2232 - 0.9778)/0.14907 \\approx 1.648$, giving $P \\approx 0.0497$. That is accurate to about 1%. The cube root removes most of the skewness.

To check by simulation, generate $10^6$ sums of ten squared standard normals and count the proportion above $18.31$. The Monte Carlo standard error is about $0.0002$, small enough to show plainly that the normal approximation is off.

**Pitfall.** Degrees of freedom count independent squared normals, not observations. With $\\mu$ estimated by $\\bar X$, the sum $\\sum(X_i - \\bar X)^2/\\sigma^2$ is $\\chi^2_{n-1}$, not $\\chi^2_n$, as the next lesson shows.`,
          resources: [
            siegrist('special/ChiSquare', 'The Chi-Square and Related Distributions', 'Density, moments, additivity and the relation to the normal.', true),
            statlect('probability-distributions/chi-square-distribution', 'Chi-square distribution', 'Proofs of the main properties.'),
            scipyStats('scipy.stats.chi2 for exact tail probabilities and quantiles.'),
          ],
          exercises: [
            {
              slug: 'chi-square-moments',
              title: 'Moments from the MGF',
              prompt:
                'From $M(t) = (1 - 2t)^{-k/2}$, derive $E Y = k$, $\\operatorname{Var} Y = 2k$, and $E Y^r = 2^r\\Gamma(k/2 + r)/\\Gamma(k/2)$ for $r > -k/2$ (the last by direct integration). Use this to find $E[1/Y]$ for $k > 2$, which you will need for the variance of the $t$ distribution.',
              kind: 'derivation',
              difficulty: 1,
              hint: '$E[1/Y] = 1/(k - 2)$.',
            },
            {
              slug: 'known-mean-interval',
              title: 'An interval for a variance with known mean',
              prompt:
                'Ten measurements from $N(\\mu, \\sigma^2)$ with $\\mu$ known give $\\sum(x_i - \\mu)^2 = 36$. Use $\\sum(X_i - \\mu)^2/\\sigma^2 \\sim \\chi^2_{10}$ to build an equal-tailed 95% interval for $\\sigma^2$. Then check its coverage by simulation with $\\sigma = 2$.',
              kind: 'problem',
              difficulty: 1,
              hint: 'The quantiles are $3.247$ and $20.483$, giving $(1.758, 11.087)$.',
            },
            {
              slug: 'rotation-invariance',
              title: 'Rotation invariance of the normal',
              prompt:
                'Prove that if $Z \\sim N(0, I_n)$ and $Q$ is orthogonal, then $QZ \\sim N(0, I_n)$. Then show more generally that $AZ \\sim N(0, AA^T)$ for any $m \\times n$ matrix $A$ of full row rank, using MGFs, and deduce that the components of $AZ$ are independent exactly when the rows of $A$ are orthogonal.',
              kind: 'derivation',
              difficulty: 2,
              hint: 'The MGF of $AZ$ at $s$ is $E e^{s^TAZ} = e^{\\|A^Ts\\|^2/2}$.',
            },
            {
              slug: 'wilson-hilferty-study',
              title: 'How good is Wilson-Hilferty?',
              prompt:
                'For $k = 1, 2, 5, 10, 30, 100$, compute the exact upper 5% and 1% points of $\\chi^2_k$ and the approximations from the normal and Wilson-Hilferty methods. Tabulate the relative errors in the tail probability and describe the pattern.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why is a sum of $k$ squared iid standard normals $\\chi^2_k$?',
              answerOutline: 'Each $Z_i^2 \\sim \\chi^2_1$ with MGF $(1-2t)^{-1/2}$; independence multiplies MGFs to $(1-2t)^{-k/2}$; uniqueness.',
            },
            {
              question: 'What is rotation invariance and why does it hold?',
              answerOutline: 'For orthogonal $Q$, $QZ$ is again iid $N(0,1)$: the joint density depends only on $\\|z\\|$, and $Q$ preserves length with $|\\det Q| = 1$.',
            },
            {
              question: 'Why is the plain normal approximation to $\\chi^2_k$ poor in the upper tail for small $k$?',
              answerOutline: 'The chi-square is right-skewed (skewness $\\sqrt{8/k}$); the normal underestimates the upper tail.',
            },
          ],
        },
        {
          slug: 'sample-mean-and-variance',
          title: 'Independence of the sample mean and sample variance',
          summary:
            'For a normal sample, $\\bar X$ and $S^2$ are independent and $(n-1)S^2/\\sigma^2 \\sim \\chi^2_{n-1}$. Prove it with an orthogonal transformation, use it for exact intervals for $\\sigma^2$, and see by simulation how it fails for other distributions.',
          estimatedMinutes: 130,
          objectives: [
            'State the theorem on $\\bar X$ and $S^2$ for normal samples with all its hypotheses',
            'Prove it with the Helmert orthogonal transformation',
            'Build an exact confidence interval for $\\sigma^2$ and compute $\\operatorname{Var}(S^2)$',
            'Show by simulation that the independence and the chi-square law fail for non-normal data, and that the variance interval is not robust',
          ],
          concepts: [
            'Theorem on $\\bar X$ and $S^2$ for normal samples',
            'Helmert matrix',
            'Degrees of freedom $n - 1$',
            'Exact interval for $\\sigma^2$',
            '$\\operatorname{Var}(S^2) = 2\\sigma^4/(n-1)$',
            'Characterisation of the normal by independence of $\\bar X$ and $S^2$',
            'Non-robustness to kurtosis',
          ],
          explanation: `**Theorem.** Let $X_1, \\dots, X_n$ be iid $N(\\mu, \\sigma^2)$ with $n \\ge 2$. Then:

1. $\\bar X \\sim N(\\mu, \\sigma^2/n)$;
2. $\\bar X$ and $S^2$ are independent;
3. $(n-1)S^2/\\sigma^2 \\sim \\chi^2_{n-1}$.

**Proof.** Standardise: $Z_i = (X_i - \\mu)/\\sigma$, so $Z \\sim N(0, I_n)$. Choose an orthogonal matrix $Q$ whose first row is $(1, \\dots, 1)/\\sqrt n$. The Helmert matrix is one explicit choice; any completion to an orthonormal basis works. Let $W = QZ$. By rotation invariance, $W_1, \\dots, W_n$ are iid $N(0, 1)$. Now $W_1 = \\sqrt n\\,\\bar Z$, and since $Q$ preserves length,
$$\\sum_{i=2}^n W_i^2 = \\|W\\|^2 - W_1^2 = \\sum Z_i^2 - n\\bar Z^2 = \\sum(Z_i - \\bar Z)^2 = \\frac{(n-1)S^2}{\\sigma^2}.$$
The right side is a function of $W_2, \\dots, W_n$ only, so it is independent of $W_1$, and hence of $\\bar X = \\mu + \\sigma W_1/\\sqrt n$. It is a sum of $n - 1$ squared iid standard normals, so it is $\\chi^2_{n-1}$. One degree of freedom is used up by the direction $(1, \\dots, 1)$, which is spent on estimating $\\mu$.

**Worked example ($n = 2$ by hand).** Here $\\bar X = (X_1 + X_2)/2$ and $S^2 = (X_1 - X_2)^2/2$. The pair $(X_1 + X_2, X_1 - X_2)$ is jointly normal, with covariance $\\operatorname{Var}X_1 - \\operatorname{Var}X_2 = 0$. Jointly normal and uncorrelated means independent, so $\\bar X$ and $S^2$ are independent. Also $X_1 - X_2 \\sim N(0, 2\\sigma^2)$, so $S^2/\\sigma^2 = \\left((X_1 - X_2)/\\sqrt{2}\\sigma\\right)^2 \\sim \\chi^2_1$, as the theorem says.

**Using it.** Part 3 is a pivot for $\\sigma^2$. If $\\chi^2_{n-1,p}$ denotes the lower $p$ quantile, then
$$\\left(\\frac{(n-1)s^2}{\\chi^2_{n-1,\\,1-\\alpha/2}},\\ \\frac{(n-1)s^2}{\\chi^2_{n-1,\\,\\alpha/2}}\\right)$$
is an exact $1 - \\alpha$ interval. For $n = 10$ and $s^2 = 4$, the quantiles of $\\chi^2_9$ are $2.700$ and $19.023$, so the interval is $(36/19.023,\\ 36/2.700) = (1.89, 13.33)$. It is very asymmetric about $s^2 = 4$. Part 3 also gives $\\operatorname{Var}(S^2) = \\sigma^4\\operatorname{Var}(\\chi^2_{n-1})/(n-1)^2 = 2\\sigma^4/(n-1)$.

**Normality is essential.** Independence of $\\bar X$ and $S^2$ actually characterises the normal: for iid samples with finite variance and $n \\ge 2$, it holds only for normal data. For exponential data, a large $\\bar X$ usually comes with a large $S^2$, so the two are positively correlated. The variance interval is also not robust, even for large $n$. Its coverage depends on the kurtosis of the data, because $\\operatorname{Var}(S^2) \\approx (\\mu_4 - \\sigma^4)/n$, which matches the normal-theory $2\\sigma^4/n$ only when $\\mu_4 = 3\\sigma^4$. The $t$ interval for $\\mu$, by contrast, becomes accurate for large $n$ under any finite variance, by the CLT.

**Pitfall.** The theorem is about iid normal samples. Applying the $\\chi^2_{n-1}$ interval to skewed or heavy-tailed data can give coverage far below the nominal level however large $n$ is.`,
          resources: [
            siegrist('sample/Normal', 'Special Properties of Normal Samples', 'The theorem on $\\bar X$ and $S^2$, with the chi-square, $t$ and $F$ consequences.', true),
            siegrist('interval/Normal', 'Estimation in the Normal Model', 'Exact intervals for $\\mu$ and $\\sigma^2$.'),
            mit18655('The lecture notes on normal sampling theory present the orthogonal-transformation proof.'),
          ],
          exercises: [
            {
              slug: 'helmert-three',
              title: 'The Helmert matrix for three observations',
              prompt:
                'Write a $3 \\times 3$ orthogonal matrix with first row $(1, 1, 1)/\\sqrt3$, for example with second row $(1, -1, 0)/\\sqrt2$ and third row $(1, 1, -2)/\\sqrt6$. Verify $QQ^T = I$, and show directly that $W_2^2 + W_3^2 = \\sum(Z_i - \\bar Z)^2$ by expanding both sides.',
              kind: 'derivation',
              difficulty: 1,
            },
            {
              slug: 'variance-interval',
              title: 'An exact interval for a variance',
              prompt:
                'A machine\'s fill volumes are normal. A sample of $n = 10$ gives $s^2 = 4$ mL$^2$. Reproduce the 95% interval for $\\sigma^2$ and give the corresponding interval for $\\sigma$. Test $H_0: \\sigma^2 = 2$ against $H_1: \\sigma^2 > 2$ at the 5% level using $(n-1)S^2/\\sigma_0^2$, and give the p-value.',
              kind: 'problem',
              difficulty: 1,
              hint: 'The statistic is $18$ on $9$ degrees of freedom, with p-value about $0.035$. The interval for $\\sigma$ is about $(1.38, 3.65)$.',
            },
            {
              slug: 'break-normality',
              title: 'What breaks without normality',
              prompt:
                'Simulate $10^5$ samples of size $n = 10$ and of size $n = 100$ from $N(0, 1)$, from Exponential(1), and from a $t_5$ distribution. For each case report (a) the sample correlation between $\\bar X$ and $S^2$, and (b) the coverage of the nominal 95% chi-square interval for $\\sigma^2$, with Monte Carlo standard errors. Explain why the coverage for exponential data does not improve as $n$ grows.',
              kind: 'simulation',
              difficulty: 2,
              hint: 'For large $n$, $\\operatorname{Var}(S^2) \\approx (\\mu_4 - \\sigma^4)/n$; the exponential has $\\mu_4 = 9\\sigma^4$.',
            },
            {
              slug: 'variance-of-s2',
              title: 'The variance of the sample variance',
              prompt:
                'Derive $\\operatorname{Var}(S^2) = 2\\sigma^4/(n-1)$ for normal samples from the theorem. Then derive $\\operatorname{Var}(S^2) = \\frac{\\mu_4}{n} - \\frac{(n-3)\\sigma^4}{n(n-1)}$ for any iid sample with finite fourth moment, and check that the two agree when $\\mu_4 = 3\\sigma^4$.',
              kind: 'derivation',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'State the three conclusions about $\\bar X$ and $S^2$ for iid normal samples.',
              answerOutline: '$\\bar X \\sim N(\\mu, \\sigma^2/n)$; $\\bar X$ and $S^2$ independent; $(n-1)S^2/\\sigma^2 \\sim \\chi^2_{n-1}$.',
            },
            {
              question: 'Where does the loss of one degree of freedom come from in the proof?',
              answerOutline: 'The first coordinate $W_1 = \\sqrt n\\bar Z$ is removed; $(n-1)S^2/\\sigma^2$ is the sum of the remaining $n - 1$ squared independent standard normals.',
            },
            {
              question: 'Why is the chi-square interval for $\\sigma^2$ not robust to non-normality even for large $n$?',
              answerOutline: 'Its width assumes $\\operatorname{Var}(S^2) \\approx 2\\sigma^4/n$, but the true large-sample variance is $(\\mu_4 - \\sigma^4)/n$, which depends on kurtosis.',
            },
          ],
        },
        {
          slug: 't-and-f-distributions',
          title: 'The t and F distributions',
          summary:
            'Define the $t$ and $F$ distributions from independent normal and chi-square variables, derive the $t$ density with a Jacobian, and use them for one-sample means and for comparing two variances.',
          estimatedMinutes: 120,
          objectives: [
            'Define $t_k$ and $F_{m,n}$ and state the independence they require',
            'Derive the $t$ density by a change of variables',
            'Prove that $(\\bar X - \\mu)/(S/\\sqrt n) \\sim t_{n-1}$ for normal samples',
            'Use the $F$ distribution to compare two normal variances',
            'Describe tail behaviour, moments and limits of the $t$ family',
          ],
          concepts: [
            'Student $t$ distribution',
            'Heavy tails and existence of moments',
            '$t_1$ is Cauchy; $t_k \\to N(0, 1)$',
            'Snedecor $F$ distribution',
            '$T^2 \\sim F_{1,k}$ and $1/F \\sim F_{n,m}$',
            'Variance-ratio test',
            'Pooled two-sample $t$',
          ],
          explanation: `Let $Z \\sim N(0, 1)$ and $V \\sim \\chi^2_k$ be **independent**. Then
$$T = \\frac{Z}{\\sqrt{V/k}}$$
has the **$t$ distribution with $k$ degrees of freedom**, with density
$$f(t) = \\frac{\\Gamma(\\frac{k+1}{2})}{\\sqrt{k\\pi}\\,\\Gamma(\\frac k2)}\\left(1 + \\frac{t^2}{k}\\right)^{-(k+1)/2}.$$
You can derive it with the auxiliary variable $V$: write the joint density of $(T, V)$ with Jacobian $\\sqrt{v/k}$, then integrate out $v$ using a gamma integral. The tails decay like $|t|^{-(k+1)}$, so $E|T|^r < \\infty$ only for $r < k$. For $k > 2$, $\\operatorname{Var}T = k/(k-2)$. With $k = 1$ the distribution is Cauchy. As $k \\to \\infty$, $V/k \\to 1$ in probability, so $T \\to N(0, 1)$ in distribution.

If $U \\sim \\chi^2_m$ and $V \\sim \\chi^2_n$ are independent, then $F = (U/m)/(V/n)$ has the **$F$ distribution** $F_{m,n}$. Two facts follow at once from the definitions: $T^2 \\sim F_{1,k}$ when $T \\sim t_k$, and $1/F \\sim F_{n,m}$. The second means lower quantiles come from upper ones: $F_{m,n;\\,\\alpha} = 1/F_{n,m;\\,1-\\alpha}$.

**The one-sample $t$ statistic.** For iid $N(\\mu, \\sigma^2)$ data, write
$$\\frac{\\bar X - \\mu}{S/\\sqrt n} = \\frac{(\\bar X - \\mu)/(\\sigma/\\sqrt n)}{\\sqrt{\\frac{(n-1)S^2/\\sigma^2}{n-1}}}.$$
The numerator is $N(0, 1)$, the expression under the root is $\\chi^2_{n-1}$ divided by its degrees of freedom, and the two are independent by the last lesson. So the statistic is exactly $t_{n-1}$, and $\\sigma$ has cancelled. That is the whole justification of the $t$ interval and the $t$ test. In the same way, for two independent normal samples, $\\frac{S_1^2/\\sigma_1^2}{S_2^2/\\sigma_2^2} \\sim F_{n_1-1,\\,n_2-1}$.

**Worked example.** Two machines are compared. Samples of $n_1 = 10$ and $n_2 = 13$ give $s_1^2 = 8.2$ and $s_2^2 = 3.1$. Test $H_0: \\sigma_1^2 = \\sigma_2^2$ against a two-sided alternative at the 5% level.

Under $H_0$, $F = s_1^2/s_2^2 = 2.645$ is an observation from $F_{9,12}$. The upper 2.5% point is $F_{9,12;\\,0.975} \\approx 3.44$. The lower 2.5% point is $1/F_{12,9;\\,0.975} \\approx 0.259$. Since $0.259 < 2.645 < 3.44$, do not reject. The two-sided p-value is $2P(F_{9,12} > 2.645) \\approx 0.119$. A variance ratio of more than $2.6$ is not surprising with samples this small, a reminder of how little information a sample variance carries.

**Pitfall.** The $F$ test for variances is notoriously sensitive to non-normality. Its actual size can be far from $\\alpha$ for heavy-tailed data, even with large samples, for the same kurtosis reason as the chi-square interval. The $t$ test for means is much more robust.`,
          resources: [
            siegrist('special/Student', 'The Student t Distribution', 'Derivation of the density, moments and the normal limit.', true),
            siegrist('special/Fisher', 'The F Distribution', 'Definition, density, and the reciprocal and $t^2$ relations.'),
            statlect('probability-distributions/student-t-distribution', 'Student t distribution', 'An alternative derivation as a normal scale mixture.'),
            statlect('probability-distributions/F-distribution', 'F distribution', 'Properties and proofs.'),
          ],
          exercises: [
            {
              slug: 't-density',
              title: 'Derive the t density',
              prompt:
                'Let $Z \\sim N(0, 1)$ and $V \\sim \\chi^2_k$ be independent. Use the transformation $T = Z/\\sqrt{V/k}$, $W = V$ to find the joint density of $(T, W)$, then integrate out $w$ to obtain the $t_k$ density. Check numerically against scipy.stats.t.pdf for $k = 3$ at several points.',
              kind: 'derivation',
              difficulty: 2,
              hint: 'The inverse is $z = t\\sqrt{w/k}$, $v = w$, with Jacobian $\\sqrt{w/k}$.',
            },
            {
              slug: 't-moments',
              title: 'Moments of the t distribution',
              prompt:
                'Using the independence of $Z$ and $V$, show that $E T^2 = k\\,E[1/V] = k/(k-2)$ for $k > 2$, and that $E|T| = \\infty$ when $k = 1$. Then show $T^2 \\sim F_{1,k}$ directly from the definitions.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'variance-ratio',
              title: 'A variance-ratio interval',
              prompt:
                'Using the data of the worked example, construct a 95% confidence interval for $\\sigma_1^2/\\sigma_2^2$ from the pivot $\\frac{S_1^2/\\sigma_1^2}{S_2^2/\\sigma_2^2} \\sim F_{9,12}$, and check that it contains $1$, consistent with the test.',
              kind: 'problem',
              difficulty: 1,
              hint: 'The interval is $(2.645/3.44,\\ 2.645/0.259) \\approx (0.77, 10.2)$.',
            },
            {
              slug: 'f-test-robustness',
              title: 'Robustness of the t and F tests',
              prompt:
                'By simulation, estimate the actual size of the nominal 5% two-sided one-sample $t$ test and of the two-sided $F$ test for equal variances when both samples have size $25$ and the data are (a) normal, (b) $t_5$, (c) uniform. Use at least $5 \\times 10^4$ replications. Which test is robust, and why?',
              kind: 'simulation',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'Define $t_k$ and state the independence condition.',
              answerOutline: '$Z/\\sqrt{V/k}$ with $Z \\sim N(0,1)$ and $V \\sim \\chi^2_k$ independent.',
            },
            {
              question: 'Why does $(\\bar X - \\mu)/(S/\\sqrt n)$ have a $t_{n-1}$ distribution for normal data?',
              answerOutline: 'It is a standard normal over the root of an independent $\\chi^2_{n-1}/(n-1)$, by the theorem on $\\bar X$ and $S^2$; $\\sigma$ cancels.',
            },
            {
              question: 'Which moments of $t_k$ exist?',
              answerOutline: '$E|T|^r < \\infty$ exactly for $r < k$; the variance $k/(k-2)$ needs $k > 2$.',
            },
          ],
        },
        {
          slug: 'limiting-distributions',
          relatedLessons: ['probability-statistics/limit-theorems-and-sampling/central-limit-theorem'],
          title: 'Limiting distributions',
          summary:
            'Convergence in probability and in distribution, the law of large numbers and the central limit theorem with their hypotheses, Slutsky\'s theorem and the continuous mapping theorem, and limits of extremes.',
          estimatedMinutes: 130,
          objectives: [
            'Define convergence in probability and in distribution and state how they are related',
            'State the weak law of large numbers and the central limit theorem with their hypotheses',
            'Apply Slutsky\'s theorem and the continuous mapping theorem',
            'Show that the studentised mean is asymptotically standard normal for any distribution with finite variance',
            'Find non-normal limits of extremes, such as the exponential limit of $n(1 - X_{(n)})$ for uniform data',
          ],
          concepts: [
            'Convergence in probability',
            'Convergence in distribution at continuity points',
            'Weak law of large numbers',
            'Central limit theorem (iid, finite positive variance)',
            'Slutsky\'s theorem',
            'Continuous mapping theorem',
            'Limits of maxima and minima',
            'Rate $1/\\sqrt n$ versus rate $1/n$',
          ],
          explanation: `A sequence $Y_n$ **converges in probability** to $c$ if $P(|Y_n - c| > \\varepsilon) \\to 0$ for every $\\varepsilon > 0$. It **converges in distribution** to $Y$ if $F_{Y_n}(y) \\to F_Y(y)$ at every $y$ where $F_Y$ is continuous. The exception at discontinuities matters: $Y_n = 1/n$ converges in distribution to the constant $0$, even though $F_{Y_n}(0) = 0$ for all $n$ while $F_Y(0) = 1$. Convergence in probability implies convergence in distribution. The converse holds when the limit is a constant.

The two great limit theorems, for iid $X_1, X_2, \\dots$, are as follows.

- **Weak law of large numbers.** If $E|X_1| < \\infty$, then $\\bar X_n \\to \\mu$ in probability. With finite variance the proof is Chebyshev's inequality.
- **Central limit theorem.** If $0 < \\sigma^2 < \\infty$, then $\\sqrt n(\\bar X_n - \\mu)/\\sigma \\to N(0, 1)$ in distribution. When the MGF exists near $0$, a proof by MGFs takes a page. The general proof uses characteristic functions.

Two tools let you combine limits:

- **Continuous mapping.** If $Y_n \\to Y$ (in probability or in distribution) and $g$ is continuous, then $g(Y_n) \\to g(Y)$ in the same sense.
- **Slutsky's theorem.** If $Y_n \\to Y$ in distribution and $A_n \\to a$, $B_n \\to b$ in probability with $a, b$ constants, then $A_nY_n + B_n \\to aY + b$ in distribution. The limits of $A_n$ and $B_n$ must be constants. If they converge only in distribution to random limits, the conclusion can fail.

**Application: the $t$ statistic without normality.** For iid data with finite variance, $S^2 \\to \\sigma^2$ in probability. This follows from the law of large numbers applied to $X_i$ and $X_i^2$, plus continuous mapping. So $\\sigma/S \\to 1$, and by Slutsky,
$$\\frac{\\bar X_n - \\mu}{S/\\sqrt n} = \\frac{\\sigma}{S}\\cdot\\frac{\\bar X_n - \\mu}{\\sigma/\\sqrt n} \\to N(0, 1).$$
This is why the $t$ interval works for large samples from any finite-variance population, the robustness seen in the Module 1 simulations. The same argument shows $t_k \\to N(0, 1)$ as $k \\to \\infty$.

**Worked example: a non-normal limit.** Let $X_i$ be iid uniform on $(0, \\theta)$ with $\\theta = 1$, and $Y_n = n(1 - X_{(n)})$. For $0 \\le y \\le n$,
$$P(Y_n > y) = P\\left(X_{(n)} < 1 - \\frac yn\\right) = \\left(1 - \\frac yn\\right)^n \\to e^{-y}.$$
So $Y_n \\to$ Exponential(1) in distribution. Two lessons follow. First, $X_{(n)}$ approaches $\\theta$ at rate $1/n$, faster than the $1/\\sqrt n$ of the CLT. Second, the limit is not normal. Asymptotic normality is a theorem with hypotheses, not a law of nature, and Module 5 shows that the uniform family violates the hypotheses of the maximum likelihood theory. A simulation with $n = 50$ shows $Y_n$ already very close to Exponential(1): its mean is $n/(n+1) \\approx 0.98$.

**Pitfall.** The CLT says nothing about how large $n$ must be. For skewed distributions the approach can be slow, and simulation is the honest way to check a particular case.`,
          resources: [
            siegrist('dist/Convergence', 'Convergence in Distribution', 'Definitions, examples at discontinuities, and the relations between modes of convergence.', true),
            siegrist('sample/CLT', 'The Central Limit Theorem', 'Statement, proof sketch and simulations.'),
            statlect('asymptotic-theory/Slutsky-theorem', 'Slutsky\'s theorem', 'Statement and examples.'),
            wasserman('The notes on convergence give precise statements of the WLLN, CLT, Slutsky and continuous mapping.'),
          ],
          exercises: [
            {
              slug: 'gumbel-limit',
              title: 'Maxima of exponentials',
              prompt:
                'Let $X_i$ be iid Exponential(1). Show that $X_{(n)} - \\ln n$ converges in distribution to the Gumbel distribution with CDF $\\exp(-e^{-x})$. Simulate $X_{(n)} - \\ln n$ for $n = 10, 100, 1000$ and compare the empirical CDFs with the limit.',
              kind: 'derivation',
              difficulty: 2,
              hint: '$P(X_{(n)} - \\ln n \\le x) = (1 - e^{-x}/n)^n$ for $x > -\\ln n$.',
            },
            {
              slug: 'clt-by-mgf',
              title: 'The CLT by MGFs',
              prompt:
                'Assume the MGF of $X_1$ exists on an open interval around $0$, with $EX_1 = 0$ and $\\operatorname{Var}X_1 = 1$. Show that the MGF of $\\sqrt n\\,\\bar X_n$ is $M(t/\\sqrt n)^n$, expand $\\ln M(s) = s^2/2 + o(s^2)$, and conclude that it converges to $e^{t^2/2}$. State the theorem that turns MGF convergence into convergence in distribution, and its hypothesis.',
              kind: 'derivation',
              difficulty: 2,
              hint: 'The continuity theorem requires the MGFs to converge on an open interval around $0$ to an MGF.',
            },
            {
              slug: 'slutsky-counterexample',
              title: 'Where Slutsky needs a constant',
              prompt:
                'Let $Z \\sim N(0, 1)$, $X_n = Z$ and $Y_n = -Z$ for every $n$. Show that $X_n \\to N(0, 1)$ and $Y_n \\to N(0, 1)$ in distribution but $X_n + Y_n$ does not converge to $N(0, 2)$. Explain which hypothesis of Slutsky\'s theorem is missing, and show that $X_n$ does not converge in probability to an independent copy $Z\'$ of $Z$, although it converges to it in distribution.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'clt-speed',
              title: 'How fast is the CLT?',
              prompt:
                'For Exponential(1) data, estimate by simulation $P(\\sqrt n(\\bar X_n - 1) \\le -1.645)$ and $P(\\sqrt n(\\bar X_n - 1) \\ge 1.645)$ for $n = 5, 20, 100, 500$, and compare with $0.05$. Then compute the exact probabilities using the fact that $n\\bar X_n$ is Gamma($n$, 1), and explain the asymmetry in terms of skewness.',
              kind: 'simulation',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'State the CLT with its hypotheses.',
              answerOutline: 'iid with $0 < \\sigma^2 < \\infty$: $\\sqrt n(\\bar X_n - \\mu)/\\sigma \\to N(0,1)$ in distribution.',
            },
            {
              question: 'State Slutsky\'s theorem.',
              answerOutline: 'If $Y_n \\to Y$ in distribution and $A_n \\to a$, $B_n \\to b$ in probability (constants), then $A_nY_n + B_n \\to aY + b$ in distribution.',
            },
            {
              question: 'Why is the studentised mean asymptotically normal for non-normal data?',
              answerOutline: 'The CLT for $\\sqrt n(\\bar X - \\mu)/\\sigma$, plus $S \\to \\sigma$ in probability (WLLN and continuous mapping), plus Slutsky.',
            },
            {
              question: 'Give an example where the natural limit is not normal.',
              answerOutline: '$n(\\theta - X_{(n)})/\\theta \\to$ Exponential(1) for uniform$(0, \\theta)$ data.',
            },
          ],
        },
      ],
      project: {
        slug: 'normal-theory-by-simulation',
        title: 'Normal sampling theory, verified and stress-tested',
        description: `Check every result of this module by simulation, then find where each one breaks. The aim is a short, well-organised report in which each theorem is stated precisely, verified numerically when its hypotheses hold, and probed when they fail.

Use your simulation harness from Module 1. For each check, decide in advance what the theorem predicts, choose a number of replications that gives a useful Monte Carlo standard error, and report both.`,
        deliverables: [
          'Verification that $\\sum Z_i^2$, $(n-1)S^2/\\sigma^2$, the studentised mean and the variance ratio have the predicted $\\chi^2$, $t$ and $F$ distributions, using Q-Q plots and Kolmogorov-Smirnov tests, for $n = 3, 10, 30$',
          'A test of the independence of $\\bar X$ and $S^2$ for normal data that goes beyond correlation, for example by comparing the distribution of $S^2$ given $\\bar X$ above and below its median',
          'The same checks for exponential, uniform and $t_5$ data, with a table of the actual coverage of the nominal 95% $t$ interval, chi-square variance interval and $F$ ratio interval for $n = 10, 50, 200$',
          'A one-page explanation, using kurtosis and the CLT, of which procedures become accurate for large $n$ without normality and which do not',
        ],
        estimatedHours: 9,
        stretchGoals: [
          'Show by simulation that the asymptotic coverage of the chi-square variance interval matches the prediction from $\\operatorname{Var}(S^2) \\approx (\\mu_4 - \\sigma^4)/n$',
          'Implement a bootstrap interval for $\\sigma^2$ and compare its coverage for exponential data',
        ],
      },
    },
    {
      slug: 'sufficiency-and-best-estimators',
      title: 'Sufficiency and Best Estimators',
      description:
        'What it means for a statistic to carry all the information about a parameter, how to find such statistics, and how to use them to build the best unbiased estimators. The Cramér-Rao bound, with its regularity conditions, shows how good an unbiased estimator can possibly be.',
      lessons: [
        {
          slug: 'sufficiency-and-factorisation',
          title: 'Sufficient statistics and the factorisation theorem',
          summary:
            'A statistic is sufficient when the data carry no further information about the parameter once it is known. Find sufficient statistics with the Fisher-Neyman factorisation theorem, and meet minimal sufficiency.',
          estimatedMinutes: 120,
          objectives: [
            'State the definition of sufficiency in terms of conditional distributions',
            'Verify sufficiency directly in simple discrete cases',
            'State and prove (in the discrete case) the factorisation theorem',
            'Find sufficient statistics for the Bernoulli, Poisson, normal, gamma and uniform families, handling indicator functions correctly',
            'Use the likelihood-ratio criterion to recognise a minimal sufficient statistic',
          ],
          concepts: [
            'Sufficient statistic',
            'Conditional distribution given a statistic',
            'Fisher-Neyman factorisation theorem',
            'Indicator functions and parameter-dependent support',
            'Jointly sufficient statistics',
            'Minimal sufficiency',
            'Likelihood-ratio criterion for minimality',
          ],
          explanation: `A statistic $T = T(X_1, \\dots, X_n)$ is **sufficient** for $\\theta$ if the conditional distribution of the sample given $T = t$ does not depend on $\\theta$. Once you know $T$, the rest of the data is pure noise as far as $\\theta$ is concerned. Anyone holding only $T$ could generate a fake sample with exactly the same distribution as the real one, without knowing $\\theta$.

**Factorisation theorem.** $T$ is sufficient for $\\theta$ if and only if the joint density or mass function factors as
$$f(x_1, \\dots, x_n; \\theta) = g(T(x); \\theta)\\,h(x)$$
for some nonnegative functions $g$ and $h$, where $h$ does not involve $\\theta$. In the discrete case the proof is short. If the factorisation holds, then
$$P(X = x \\mid T = t) = \\frac{g(t;\\theta)h(x)}{\\sum_{y : T(y) = t}g(t;\\theta)h(y)} = \\frac{h(x)}{\\sum_{T(y)=t}h(y)},$$
which is free of $\\theta$. Conversely, take $g(t; \\theta) = P_\\theta(T = t)$ and $h(x) = P(X = x \\mid T = T(x))$. The theorem holds for densities too, with a measure-theoretic proof.

**Worked example 1: Bernoulli.** For iid Bernoulli($p$) data with $t = \\sum x_i$, $f(x; p) = p^t(1 - p)^{n-t}$. This is $g(t; p)$ with $h = 1$, so $T = \\sum X_i$ is sufficient. Directly: $T \\sim$ Binomial($n$, $p$), so for any $x$ with $\\sum x_i = t$,
$$P(X = x \\mid T = t) = \\frac{p^t(1-p)^{n-t}}{\\binom nt p^t(1-p)^{n-t}} = \\frac{1}{\\binom nt}.$$
Given the number of successes, every arrangement is equally likely whatever $p$ is. By contrast, $X_1$ alone is not sufficient when $n = 2$. Given $X_1 = 1$, the second observation is still Bernoulli($p$).

**Worked example 2: Uniform$(0, \\theta)$.** Here the parameter is in the support, and the indicator function must be written out:
$$f(x; \\theta) = \\prod_{i=1}^n \\frac{1}{\\theta}\\mathbf{1}\\{0 < x_i < \\theta\\} = \\theta^{-n}\\,\\mathbf{1}\\{x_{(n)} < \\theta\\}\\cdot\\mathbf{1}\\{x_{(1)} > 0\\}.$$
The first two factors depend on the data only through $x_{(n)}$, and the last does not involve $\\theta$. So $X_{(n)}$ is sufficient. Dropping the indicators would lead you, wrongly, to conclude that nothing is needed beyond $n$.

For $N(\\mu, \\sigma^2)$ with both parameters unknown, expanding $\\sum(x_i - \\mu)^2 = \\sum x_i^2 - 2\\mu\\sum x_i + n\\mu^2$ shows that $(\\sum X_i, \\sum X_i^2)$ is jointly sufficient. So is $(\\bar X, S^2)$, which is a one-to-one function of it.

**Minimal sufficiency.** The whole sample is always sufficient, so the useful question is how far the data can be compressed. $T$ is **minimal sufficient** if it is a function of every other sufficient statistic. A practical criterion is this: if $f(x;\\theta)/f(y;\\theta)$ is free of $\\theta$ exactly when $T(x) = T(y)$, then $T$ is minimal sufficient.

**Pitfall.** Sufficiency depends on the model. $\\sum X_i$ is sufficient for the Poisson mean, but if the data might be negative binomial, it is not sufficient for that larger family.`,
          resources: [
            siegrist('point/Sufficient', 'Sufficient, Complete and Ancillary Statistics', 'Definitions, the factorisation theorem and many examples, including the uniform.', true),
            mit18655('The lectures on sufficiency treat factorisation and minimal sufficiency rigorously.'),
            wasserman('The sufficiency notes include the likelihood-ratio criterion for minimality with examples.'),
          ],
          exercises: [
            {
              slug: 'poisson-conditional',
              title: 'Sufficiency directly for the Poisson',
              prompt:
                'For iid Poisson($\\lambda$) data, compute $P(X_1 = x_1, \\dots, X_n = x_n \\mid \\sum X_i = t)$ and show that it is the multinomial probability with $t$ trials and equal cell probabilities $1/n$. Conclude that $\\sum X_i$ is sufficient, and explain how to generate a fake sample from $t$ alone.',
              kind: 'derivation',
              difficulty: 1,
            },
            {
              slug: 'factorise-families',
              title: 'Factorise five families',
              prompt:
                'Use the factorisation theorem to find a sufficient statistic (possibly vector-valued) for: (a) Exponential with rate $\\lambda$; (b) Gamma with both shape and scale unknown; (c) Beta($\\alpha$, $\\beta$) with both unknown; (d) Uniform($\\theta - \\tfrac12$, $\\theta + \\tfrac12$); (e) the shifted exponential with density $e^{-(x - \\theta)}$ for $x > \\theta$.',
              kind: 'problem',
              difficulty: 2,
              hint: '(a) $\\sum X_i$; (b) $(\\sum X_i, \\prod X_i)$; (c) $(\\prod X_i, \\prod(1 - X_i))$; (d) $(X_{(1)}, X_{(n)})$; (e) $X_{(1)}$.',
            },
            {
              slug: 'minimal-normal',
              title: 'Minimal sufficiency for the normal',
              prompt:
                'Use the likelihood-ratio criterion to show that $(\\bar X, S^2)$ is minimal sufficient for $N(\\mu, \\sigma^2)$ with both parameters unknown, and that $\\bar X$ alone is minimal sufficient when $\\sigma^2$ is known.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'simulate-from-sufficient',
              title: 'Reconstruct a sample from a sufficient statistic',
              prompt:
                'Simulate a Bernoulli sample of size $20$ with $p = 0.3$. Using only $t = \\sum x_i$, generate $10^4$ fake samples by placing $t$ ones uniformly at random among $20$ positions. Compare the distributions of the longest run of ones in the real-data model (simulate fresh samples with $p = 0.3$ conditioned on the same $t$) and in the fake samples. Explain why they agree, and what this says about any test of $p$ based on run length.',
              kind: 'simulation',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'Define a sufficient statistic.',
              answerOutline: 'One for which the conditional distribution of the data given $T$ does not depend on $\\theta$.',
            },
            {
              question: 'State the factorisation theorem.',
              answerOutline: '$T$ is sufficient iff $f(x;\\theta) = g(T(x);\\theta)h(x)$ with $h$ free of $\\theta$.',
            },
            {
              question: 'Why must indicator functions be kept when factorising the uniform$(0, \\theta)$ likelihood?',
              answerOutline: 'The support depends on $\\theta$; the indicator $\\mathbf 1\\{x_{(n)} < \\theta\\}$ is how $X_{(n)}$ enters the likelihood.',
            },
          ],
        },
        {
          slug: 'exponential-families-and-completeness',
          title: 'Exponential families and completeness',
          summary:
            'Exponential families give sufficient statistics automatically. Completeness, which holds for full-rank exponential families and for some others, is what makes an unbiased function of a sufficient statistic unique.',
          estimatedMinutes: 120,
          objectives: [
            'Write the standard families in exponential-family form and read off the natural sufficient statistic',
            'Define completeness and prove it for the binomial and uniform cases',
            'State the theorem that full-rank exponential families have complete sufficient statistics, with its open-set condition',
            'Exhibit a sufficient statistic that is not complete in a curved family',
            'State and apply Basu\'s theorem',
          ],
          concepts: [
            'One- and $k$-parameter exponential families',
            'Natural parameter and natural sufficient statistic',
            'Full rank: natural parameter space contains an open set',
            'Curved exponential family',
            'Complete statistic',
            'Ancillary statistic',
            'Basu\'s theorem',
          ],
          explanation: `A family of densities or mass functions is a **$k$-parameter exponential family** if
$$f(x;\\theta) = h(x)\\,c(\\theta)\\exp\\Big(\\sum_{j=1}^k w_j(\\theta)t_j(x)\\Big),$$
where the support $\\{x : f(x;\\theta) > 0\\}$ does not depend on $\\theta$. For an iid sample, the factorisation theorem shows that $T = \\left(\\sum_i t_1(X_i), \\dots, \\sum_i t_k(X_i)\\right)$ is sufficient. The binomial with fixed $n$, the Poisson, normal, gamma and beta families are all exponential families. The uniform on $(0, \\theta)$ is not, because its support moves. Neither is the Cauchy location family.

A statistic $T$ is **complete** if $E_\\theta[g(T)] = 0$ for all $\\theta$ forces $P_\\theta(g(T) = 0) = 1$ for all $\\theta$. In words, no nontrivial function of $T$ is an unbiased estimator of zero. Completeness is what makes unbiased estimators based on $T$ unique. Here is the main source of complete statistics:

**Theorem.** In a $k$-parameter exponential family, if the set of values of $(w_1(\\theta), \\dots, w_k(\\theta))$ contains an open set in $\\mathbb{R}^k$ (the family is of **full rank**), then $T$ is complete.

The open-set condition matters. In a **curved** family, where $k$ statistics are governed by fewer than $k$ free parameters, completeness can fail.

**Worked example: completeness of the binomial.** Let $T \\sim$ Binomial($n$, $p$) with $0 < p < 1$. Suppose $E_p\\,g(T) = 0$ for all $p$. With $r = p/(1 - p)$,
$$0 = \\sum_{t=0}^n g(t)\\binom nt p^t(1-p)^{n-t} = (1 - p)^n\\sum_{t=0}^n g(t)\\binom nt r^t.$$
As $p$ ranges over $(0, 1)$, $r$ ranges over $(0, \\infty)$. A polynomial in $r$ that vanishes on an interval has all coefficients zero, so $g(t)\\binom nt = 0$ and $g(t) = 0$ for every $t$. Hence $T$ is complete. The general theorem's proof is the same idea, with the uniqueness of Laplace transforms in place of polynomials.

For the uniform on $(0, \\theta)$, $T = X_{(n)}$ is complete even though the family is not exponential. If $\\int_0^\\theta g(t)\\,nt^{n-1}\\theta^{-n}\\,dt = 0$ for all $\\theta > 0$, then $\\int_0^\\theta g(t)t^{n-1}dt = 0$ for all $\\theta$. Differentiating in $\\theta$ gives $g(\\theta)\\theta^{n-1} = 0$ for almost every $\\theta$.

**A curved counterexample.** Take $N(\\theta, \\theta^2)$ with $\\theta > 0$. The statistic $(\\bar X, S^2)$ is sufficient, but the natural parameters $(1/\\theta, -1/(2\\theta^2))$ trace a curve, not an open set. Since $E\\bar X^2 = \\theta^2(n+1)/n$ and $ES^2 = \\theta^2$, the function $g = \\frac{n}{n+1}\\bar X^2 - S^2$ has mean zero for every $\\theta$ but is not zero. So $(\\bar X, S^2)$ is not complete here.

**Basu's theorem.** A statistic is **ancillary** if its distribution does not depend on $\\theta$. If $T$ is complete and sufficient and $A$ is ancillary, then $T$ and $A$ are independent. For $N(\\mu, \\sigma^2)$ with $\\sigma$ known, $\\bar X$ is complete sufficient for $\\mu$, and $S^2$ is ancillary, so they are independent. This is another proof of part of the theorem on $\\bar X$ and $S^2$.

**Pitfall.** Completeness is a property of a family of distributions, not of one distribution. Shrinking the parameter space can destroy it.`,
          resources: [
            siegrist('special/GeneralExponential', 'General Exponential Families', 'Definitions, natural parameters and the standard families written in exponential form.', true),
            siegrist('point/Sufficient', 'Sufficient, Complete and Ancillary Statistics', 'Completeness, ancillarity and Basu\'s theorem, with proofs.'),
            mit18655('The exponential-family lectures cover full rank, curved families and completeness.'),
          ],
          exercises: [
            {
              slug: 'write-as-exponential-family',
              title: 'Exponential-family form',
              prompt:
                'Write each family in exponential-family form, identify $h$, $c$, the $w_j$ and the $t_j$, and decide whether it has full rank: Poisson($\\lambda$); $N(\\mu, \\sigma^2)$ with both unknown; Gamma with shape and scale unknown; $N(\\theta, \\theta^2)$ with $\\theta > 0$. Explain why the uniform on $(0, \\theta)$ cannot be put in this form.',
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'poisson-complete',
              title: 'Completeness of the Poisson sum',
              prompt:
                'Prove directly that $T = \\sum X_i$ is complete for iid Poisson($\\lambda$), $\\lambda > 0$, using the power series $\\sum g(t)(n\\lambda)^t/t!$. Then show that if the parameter space were only $\\{1, 2\\}$, $T$ would not be complete when $n = 1$, by constructing a nonzero $g$ with $E_1 g(T) = E_2 g(T) = 0$.',
              kind: 'derivation',
              difficulty: 2,
              hint: 'For two parameter values you need $g$ to satisfy two linear equations; supported on three points, a nonzero solution exists.',
            },
            {
              slug: 'curved-normal',
              title: 'An incomplete sufficient statistic',
              prompt:
                'For $N(\\theta, \\theta^2)$ with $\\theta > 0$, verify $E\\bar X^2 = \\theta^2(n+1)/n$, so that $g = \\frac{n}{n+1}\\bar X^2 - S^2$ is an unbiased estimator of zero. Confirm $E g = 0$ by simulation for $\\theta = 2$ and $n = 5$, and show that $g$ has positive variance.',
              kind: 'simulation',
              difficulty: 2,
            },
            {
              slug: 'basu-application',
              title: 'Basu\'s theorem at work',
              prompt:
                'Let $X_1, \\dots, X_n$ be iid Exponential with mean $\\theta$. Show that $T = \\sum X_i$ is complete sufficient and that $A = X_1/T$ is ancillary. Use Basu\'s theorem to deduce $E[X_1/T] = 1/n$ without integrating, and similarly that $E[X_1^2/T^2] = E[X_1^2]/E[T^2]$; evaluate the latter. Check by simulation that $T$ and $X_1/T$ are uncorrelated.',
              kind: 'derivation',
              difficulty: 3,
              hint: 'Independence gives $E[X_1] = E[(X_1/T)\\,T] = E[X_1/T]\\,E[T]$. The second ratio is $2\\theta^2/(n(n+1)\\theta^2) = 2/(n(n+1))$.',
            },
          ],
          selfAssessment: [
            {
              question: 'Define completeness.',
              answerOutline: '$E_\\theta g(T) = 0$ for all $\\theta$ implies $g(T) = 0$ with probability 1 for all $\\theta$.',
            },
            {
              question: 'When is the natural sufficient statistic of an exponential family complete?',
              answerOutline: 'When the family has full rank: the natural parameter set contains an open set in $\\mathbb R^k$.',
            },
            {
              question: 'State Basu\'s theorem.',
              answerOutline: 'A complete sufficient statistic is independent of every ancillary statistic.',
            },
          ],
        },
        {
          slug: 'rao-blackwell-and-lehmann-scheffe',
          title: 'Rao-Blackwell and Lehmann-Scheffé',
          summary:
            'Conditioning an unbiased estimator on a sufficient statistic never increases its variance. When the sufficient statistic is also complete, the result is the unique best unbiased estimator.',
          estimatedMinutes: 130,
          objectives: [
            'State and prove the Rao-Blackwell theorem, including why sufficiency is needed',
            'State the Lehmann-Scheffé theorem and use it to identify UMVUEs',
            'Compute $E[W \\mid T]$ for simple unbiased estimators $W$',
            'Derive UMVUEs for functions of Poisson, Bernoulli, uniform and normal parameters',
            'Compare a UMVUE with the MLE by simulation of bias, variance and MSE',
          ],
          concepts: [
            'Uniformly minimum variance unbiased estimator (UMVUE)',
            'Rao-Blackwell theorem',
            'Conditional expectation given a sufficient statistic',
            'Law of total variance',
            'Lehmann-Scheffé theorem',
            'Uniqueness from completeness',
            'Unbiasedness versus MSE',
          ],
          explanation: `An unbiased estimator $\\delta^*$ of $\\tau(\\theta)$ is a **UMVUE** if $\\operatorname{Var}_\\theta\\delta^* \\le \\operatorname{Var}_\\theta\\delta$ for every unbiased $\\delta$ and every $\\theta$. Two theorems show how to find one.

**Rao-Blackwell.** Let $W$ be unbiased for $\\tau(\\theta)$ with finite variance, and let $T$ be sufficient. Define $\\varphi(T) = E[W \\mid T]$. Then $\\varphi(T)$ is an estimator, because by sufficiency the conditional expectation does not involve $\\theta$. It is unbiased, and $\\operatorname{Var}_\\theta\\varphi(T) \\le \\operatorname{Var}_\\theta W$ for all $\\theta$, with equality only if $W = \\varphi(T)$ with probability 1. The proof is the law of total variance: $\\operatorname{Var}W = \\operatorname{Var}(E[W \\mid T]) + E[\\operatorname{Var}(W \\mid T)]$. Without sufficiency, $E[W \\mid T]$ would depend on the unknown $\\theta$ and could not be computed.

**Lehmann-Scheffé.** If $T$ is complete and sufficient, and $\\varphi(T)$ is unbiased for $\\tau(\\theta)$, then $\\varphi(T)$ is the unique UMVUE (up to sets of probability zero). The proof: if $\\psi(T)$ is also unbiased, then $E_\\theta[\\varphi(T) - \\psi(T)] = 0$ for all $\\theta$, so completeness forces $\\varphi = \\psi$. Rao-Blackwell then shows that no unbiased estimator does better. In practice, find any unbiased function of a complete sufficient statistic, either by guessing or by conditioning a crude unbiased estimator.

**Worked example.** For iid Poisson($\\lambda$) data, estimate $\\tau(\\lambda) = P(X = 0) = e^{-\\lambda}$, the probability of an empty interval.

A crude unbiased estimator is $W = \\mathbf 1\\{X_1 = 0\\}$. The statistic $T = \\sum X_i$ is complete sufficient, since the Poisson is a full-rank exponential family. Given $T = t$, the sample is multinomial with $t$ trials and equal cells, so $X_1 \\mid T = t \\sim$ Binomial($t$, $1/n$). Therefore
$$\\varphi(T) = P(X_1 = 0 \\mid T) = \\left(1 - \\frac1n\\right)^T.$$
Check unbiasedness with the Poisson($n\\lambda$) generating function: $E s^T = e^{n\\lambda(s - 1)}$ with $s = 1 - 1/n$ gives $e^{-\\lambda}$. By Lehmann-Scheffé this is the UMVUE. Its variance is $E s^{2T} - e^{-2\\lambda} = e^{-2\\lambda}(e^{\\lambda/n} - 1)$. With $\\lambda = 1$ and $n = 10$:
- $\\operatorname{Var}W = e^{-1}(1 - e^{-1}) \\approx 0.2325$;
- $\\operatorname{Var}\\varphi(T) = e^{-2}(e^{0.1} - 1) \\approx 0.01423$, sixteen times smaller.

A simulation with $2 \\times 10^5$ samples gave bias $\\approx 0$ and variance $0.0142$ for $\\varphi(T)$. The MLE $e^{-\\bar X}$ gave bias $+0.018$, variance $0.0141$ and MSE $0.0144$. So the biased MLE has slightly smaller variance and slightly larger MSE here. "Best unbiased" is optimal only within the class of unbiased estimators.

**Pitfall.** A UMVUE need not exist, and when it does it can be silly. For a single Poisson observation, the UMVUE of $e^{-2\\lambda}$ is $(-1)^X$, which takes only the values $\\pm 1$. Unbiasedness is a constraint, not a guarantee of sense.`,
          resources: [
            siegrist('point/Unbiased', 'Best Unbiased Estimators', 'The Cramér-Rao bound, Rao-Blackwell and Lehmann-Scheffé, with worked families.', true),
            siegrist('point/Sufficient', 'Sufficient, Complete and Ancillary Statistics', 'The completeness results used by Lehmann-Scheffé.'),
            mit18655('The lectures on unbiased estimation develop both theorems with proofs.'),
          ],
          exercises: [
            {
              slug: 'bernoulli-variance-umvue',
              title: 'UMVUE of a Bernoulli variance',
              prompt:
                'For iid Bernoulli($p$) with $n \\ge 2$, start from the unbiased estimator $W = X_1(1 - X_2)$ of $p(1 - p)$ and compute $E[W \\mid T]$ with $T = \\sum X_i$. Show that the UMVUE is $T(n - T)/(n(n-1))$, and compare its MSE with the plug-in estimator $\\hat p(1 - \\hat p)$ for $n = 10$ and $p = 0.5$, exactly and by simulation.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'uniform-umvue',
              title: 'UMVUE for the uniform',
              prompt:
                'For iid uniform on $(0, \\theta)$, show that $\\frac{n+1}{n}X_{(n)}$ is the UMVUE of $\\theta$ and that $2\\bar X$, although unbiased, is not. Rao-Blackwellise $2X_1$ by computing $E[2X_1 \\mid X_{(n)}]$, and check that the result is $\\frac{n+1}{n}X_{(n)}$.',
              kind: 'derivation',
              difficulty: 2,
              hint: 'Given $X_{(n)} = m$, one of the $X_i$ equals $m$ and the other $n - 1$ are uniform on $(0, m)$, so $E[X_1 \\mid X_{(n)} = m] = \\frac1n m + \\frac{n-1}{n}\\cdot\\frac m2$.',
            },
            {
              slug: 'exponential-reliability',
              title: 'Estimating a reliability',
              prompt:
                'Lifetimes are iid Exponential with mean $\\theta$. Show that the UMVUE of the reliability $R(c) = P(X > c) = e^{-c/\\theta}$ is $(1 - c/T)^{n-1}$ for $T > c$ and $0$ otherwise, where $T = \\sum X_i$. Use the fact that $X_1/T \\sim$ Beta(1, $n - 1$), independent of $T$. Compare it with the MLE $e^{-c/\\bar X}$ by simulation for $n = 10$, $\\theta = 1$, $c = 0.5$.',
              kind: 'derivation',
              difficulty: 3,
            },
            {
              slug: 'normal-mean-square',
              title: 'Estimating a squared mean',
              prompt:
                'For iid $N(\\mu, \\sigma^2)$ with both unknown, show that $\\bar X^2 - S^2/n$ is the UMVUE of $\\mu^2$. Explain why it can be negative, and by simulation with $\\mu = 0.2$, $\\sigma = 1$, $n = 10$ estimate how often that happens. Would $\\max(0, \\bar X^2 - S^2/n)$ have larger or smaller MSE? Check.',
              kind: 'simulation',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does Rao-Blackwell need $T$ to be sufficient?',
              answerOutline: 'So that $E[W \\mid T]$ does not depend on $\\theta$ and is a genuine estimator.',
            },
            {
              question: 'What does completeness add in Lehmann-Scheffé?',
              answerOutline: 'Uniqueness: any two unbiased functions of $T$ differ by an unbiased estimator of zero, which completeness forces to be zero.',
            },
            {
              question: 'Is the UMVUE always the estimator with smallest MSE?',
              answerOutline: 'No; a biased estimator such as the MLE or a truncated estimator can have smaller MSE.',
            },
          ],
        },
        {
          slug: 'cramer-rao-bound',
          title: 'Fisher information and the Cramér-Rao bound',
          summary:
            'The Cramér-Rao inequality bounds the variance of any unbiased estimator by the inverse Fisher information. State its regularity conditions exactly, see when the bound is attained, and see how the uniform family escapes it.',
          estimatedMinutes: 130,
          objectives: [
            'Define the score and the Fisher information of one observation and of a sample',
            'State the regularity conditions for the Cramér-Rao inequality and prove it with Cauchy-Schwarz',
            'Compute Cramér-Rao bounds for parameters and functions of parameters',
            'Decide when the bound is attained and relate attainment to exponential families',
            'Explain why estimators in the uniform family beat the bound',
          ],
          concepts: [
            'Score function',
            'Fisher information $I(\\theta)$',
            'Information equality $I = -E[\\partial^2\\log f]$',
            'Regularity conditions',
            'Cramér-Rao lower bound',
            'Efficient estimator',
            'Attainment and exponential families',
            'Non-regular families',
          ],
          explanation: `For one observation with density $f(x;\\theta)$, the **score** is $s(\\theta; X) = \\frac{\\partial}{\\partial\\theta}\\ln f(X;\\theta)$, and the **Fisher information** is $I(\\theta) = E_\\theta[s^2]$. For an iid sample of size $n$, the information is $nI(\\theta)$.

**Regularity conditions.** The following are assumed:

1. the parameter space is an open interval;
2. the support $\\{x : f(x;\\theta) > 0\\}$ is the same for all $\\theta$;
3. $\\partial f/\\partial\\theta$ exists on that support;
4. differentiation under the integral sign is valid for $\\int f\\,dx$ and for $\\int W f\\,dx$;
5. $0 < I(\\theta) < \\infty$.

Under conditions 1 to 4, the score has mean zero, since $E s = \\int \\partial_\\theta f\\,dx = \\partial_\\theta\\int f\\,dx = 0$. If $f$ can also be differentiated twice under the integral sign, then $I(\\theta) = -E_\\theta[\\partial^2_\\theta\\ln f]$, the **information equality**, which is usually easier to compute.

**Cramér-Rao inequality.** Under conditions 1 to 5, if $W$ is an estimator with $E_\\theta W = \\tau(\\theta)$ and finite variance, then
$$\\operatorname{Var}_\\theta W \\ge \\frac{\\tau'(\\theta)^2}{nI(\\theta)}.$$
The proof: differentiating $\\int W\\prod f = \\tau(\\theta)$ under the integral sign gives $\\operatorname{Cov}(W, S_n) = \\tau'(\\theta)$, where $S_n$ is the total score with variance $nI(\\theta)$. Cauchy-Schwarz gives $\\tau'^2 \\le \\operatorname{Var}W \\cdot nI$. Equality in Cauchy-Schwarz requires $S_n$ to be an affine function of $W$, $S_n = a(\\theta)(W - \\tau(\\theta))$. For that to hold at every $\\theta$, the family must be a one-parameter exponential family, with $W$ an affine function of the natural sufficient statistic. An unbiased estimator that attains the bound is **efficient**.

**Worked example: Poisson.** Here $\\ln f = x\\ln\\lambda - \\lambda - \\ln x!$, so $s = x/\\lambda - 1$ and $\\partial^2_\\lambda\\ln f = -x/\\lambda^2$. Hence $I(\\lambda) = E[X]/\\lambda^2 = 1/\\lambda$. The conditions hold: the support $\\{0, 1, 2, \\dots\\}$ is fixed, and the sums converge uniformly enough to differentiate term by term. For $\\tau(\\lambda) = \\lambda$ the bound is $\\lambda/n$, exactly $\\operatorname{Var}\\bar X$, so $\\bar X$ is efficient. For $\\tau(\\lambda) = e^{-\\lambda}$, the bound is $\\lambda e^{-2\\lambda}/n$. The UMVUE from the last lesson has variance $e^{-2\\lambda}(e^{\\lambda/n} - 1)$, which is strictly larger because $e^x - 1 > x$ for $x > 0$. With $\\lambda = 1$ and $n = 10$, that is $0.01423$ against a bound of $0.01353$. The best unbiased estimator need not reach the bound.

**Where the bound fails.** For the uniform on $(0, \\theta)$, condition 2 is violated. Formally, $\\partial_\\theta\\ln(1/\\theta) = -1/\\theta$ gives "$I = 1/\\theta^2$" and a "bound" of $\\theta^2/n$. Yet $\\frac{n+1}{n}X_{(n)}$ is unbiased with variance $\\theta^2/(n(n+2))$, smaller by a factor of $n + 2$. The score's mean is not zero here, $E[-1/\\theta] = -1/\\theta$, which shows the differentiation under the integral sign has failed. The same failure explains the $1/n$ convergence rate seen in Module 3.

**Pitfall.** The bound applies to unbiased estimators only. Biased estimators can have variance below $1/(nI)$, and a version of the bound with $\\tau'(\\theta)$ replaced by $1 + b'(\\theta)$ covers them.`,
          resources: [
            siegrist('point/Unbiased', 'Best Unbiased Estimators', 'The Cramér-Rao inequality with its conditions and examples of attainment.', true),
            statlect('glossary/information-matrix', 'Information matrix', 'Fisher information, the information equality and the matrix case.'),
            mit18650('The lectures on maximum likelihood introduce Fisher information and its role in the asymptotic variance.'),
          ],
          exercises: [
            {
              slug: 'information-of-families',
              title: 'Fisher information for standard families',
              prompt:
                'Compute $I(\\theta)$ for one observation from: (a) Bernoulli($p$); (b) Exponential with mean $\\theta$; (c) $N(\\mu, \\sigma^2)$ with $\\sigma$ known, for $\\mu$; (d) $N(\\mu, \\sigma^2)$ with $\\mu$ known, for $\\sigma^2$. In each case verify both forms of the information equality and give the Cramér-Rao bound for unbiased estimators of the parameter from $n$ observations.',
              kind: 'problem',
              difficulty: 1,
              hint: '(a) $1/(p(1-p))$; (b) $1/\\theta^2$; (c) $1/\\sigma^2$; (d) $1/(2\\sigma^4)$.',
            },
            {
              slug: 'prove-crlb',
              title: 'Prove the Cramér-Rao inequality',
              prompt:
                'Write out the proof of the Cramér-Rao inequality for an iid sample, marking every place a regularity condition is used. Then show that the bound is attained if and only if the total score is $a(\\theta)(W - \\tau(\\theta))$ for some function $a$, and deduce that the family must be a one-parameter exponential family.',
              kind: 'derivation',
              difficulty: 3,
            },
            {
              slug: 'variance-not-attained',
              title: 'A UMVUE that misses the bound',
              prompt:
                'For iid $N(\\mu, \\sigma^2)$ with both unknown, the Cramér-Rao bound for unbiased estimators of $\\sigma^2$ is $2\\sigma^4/n$. Show that $S^2$, which is the UMVUE, has variance $2\\sigma^4/(n-1)$, so no unbiased estimator attains the bound. When $\\mu$ is known, show that $\\frac1n\\sum(X_i - \\mu)^2$ attains it.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'simulate-the-bound',
              title: 'The bound by simulation',
              prompt:
                'For Poisson data with $\\lambda = 1$ and $n = 10$, simulate $2 \\times 10^5$ samples and estimate the bias, variance and MSE of three estimators of $e^{-\\lambda}$: $\\mathbf 1\\{X_1 = 0\\}$, $(1 - 1/n)^T$ and $e^{-\\bar X}$. Plot them against the Cramér-Rao bound $\\lambda e^{-2\\lambda}/n$, and repeat for $n = 5, 20, 50$ to show the ratio of UMVUE variance to the bound approaching $1$.',
              kind: 'simulation',
              difficulty: 2,
              hint: 'At $n = 10$ expect variances near $0.2325$, $0.0142$ and $0.0141$, and a bound of $0.0135$.',
            },
          ],
          selfAssessment: [
            {
              question: 'List the regularity conditions for the Cramér-Rao inequality.',
              answerOutline: 'Open parameter interval; support free of $\\theta$; differentiable density; differentiation under the integral for $\\int f$ and $\\int Wf$; $0 < I(\\theta) < \\infty$.',
            },
            {
              question: 'When is the Cramér-Rao bound attained?',
              answerOutline: 'Only when the score is affine in $W$, i.e. in a one-parameter exponential family with $W$ affine in the natural sufficient statistic.',
            },
            {
              question: 'Why can an unbiased estimator in the uniform$(0,\\theta)$ model have variance below "$\\theta^2/n$"?',
              answerOutline: 'The support depends on $\\theta$, so differentiation under the integral fails and the inequality does not apply.',
            },
          ],
        },
      ],
    },
    {
      slug: 'maximum-likelihood',
      title: 'Maximum Likelihood',
      description:
        'The likelihood function and its maximiser, Fisher information as the curvature of the log-likelihood, the consistency and asymptotic normality of the MLE under stated regularity conditions, the delta method, and how to maximise a likelihood numerically without being fooled.',
      lessons: [
        {
          slug: 'likelihood-and-the-mle',
          relatedLessons: ['probability-statistics/estimation-and-confidence/maximum-likelihood-estimation'],
          title: 'The likelihood and the maximum likelihood estimator',
          summary:
            'Define the likelihood, find MLEs from the score equation or, when the support depends on the parameter, directly. Use the invariance property, and see MLEs that are biased, non-unique or on the boundary.',
          estimatedMinutes: 120,
          objectives: [
            'Write the likelihood and log-likelihood for an iid sample',
            'Find MLEs by solving the score equation and checking the second-order condition',
            'Find MLEs when the support depends on the parameter, without differentiating',
            'Use the invariance property to estimate functions of parameters',
            'Recognise biased, non-unique and boundary MLEs',
          ],
          concepts: [
            'Likelihood $L(\\theta) = \\prod f(x_i;\\theta)$',
            'Log-likelihood $\\ell(\\theta)$',
            'Score equation',
            'Second-order check',
            'Invariance of the MLE',
            'MLE on the boundary of the support',
            'Non-unique MLE',
          ],
          explanation: `Given observed data $x_1, \\dots, x_n$, the **likelihood** is $L(\\theta) = \\prod_i f(x_i;\\theta)$, the joint density viewed as a function of $\\theta$ with the data held fixed. It is not a density in $\\theta$. The **maximum likelihood estimate** $\\hat\\theta$ is the value that maximises $L$, or equivalently the **log-likelihood** $\\ell(\\theta) = \\sum_i\\ln f(x_i;\\theta)$. When $\\ell$ is differentiable and the maximum is interior, $\\hat\\theta$ solves the **score equation** $\\ell'(\\theta) = 0$. Then check that it is a maximum: $\\ell''(\\hat\\theta) < 0$, or the Hessian is negative definite in several parameters, and compare with the boundary.

By the factorisation theorem, $L$ depends on the data only through any sufficient statistic, so the MLE is a function of every sufficient statistic. The **invariance property** says: if $\\hat\\theta$ is the MLE of $\\theta$, then $g(\\hat\\theta)$ is the MLE of $g(\\theta)$ for any function $g$. For non-one-to-one $g$, this uses the induced likelihood $\\sup\\{L(\\theta) : g(\\theta) = \\eta\\}$.

**Worked example 1: exponential waiting times.** Five waiting times (minutes) are $2.1, 0.4, 1.7, 3.0, 0.8$, modelled as iid Exponential with rate $\\lambda$. Then
$$\\ell(\\lambda) = n\\ln\\lambda - \\lambda\\sum x_i,\\qquad \\ell'(\\lambda) = \\frac n\\lambda - \\sum x_i.$$
Setting $\\ell' = 0$ gives $\\hat\\lambda = 1/\\bar x = 1/1.6 = 0.625$ per minute. Since $\\ell''(\\lambda) = -n/\\lambda^2 < 0$ everywhere, this is the global maximum. By invariance, the MLE of the median waiting time $\\ln 2/\\lambda$ is $1.6\\ln 2 \\approx 1.11$ minutes. The MLE is biased. Since $\\sum X_i$ is Gamma($n$, $1/\\lambda$), $E[1/\\bar X] = n\\lambda/(n-1)$ for $n \\ge 2$, which is 25% too high when $n = 5$. Simulation confirms this quickly.

**Worked example 2: uniform$(0, \\theta)$.** Here
$$L(\\theta) = \\theta^{-n}\\,\\mathbf 1\\{\\theta \\ge x_{(n)}\\}.$$
For $\\theta < x_{(n)}$ the likelihood is zero, and for $\\theta \\ge x_{(n)}$ it decreases. So $\\hat\\theta = x_{(n)}$, a point where $L$ is not differentiable. Setting a derivative to zero would find nothing. Always sketch $L$ when the support depends on $\\theta$.

Two more warnings. For $N(\\mu, \\sigma^2)$, the MLEs are $\\bar x$ and $\\hat\\sigma^2 = \\frac1n\\sum(x_i - \\bar x)^2$, and the latter has divisor $n$, so it is biased. For uniform on $(\\theta - \\tfrac12, \\theta + \\tfrac12)$, the likelihood is constant on the whole interval $[x_{(n)} - \\tfrac12,\\ x_{(1)} + \\tfrac12]$, so the MLE is not unique.

**Pitfall.** A root of the score equation can be a minimum or a local maximum. Some likelihoods, such as the Cauchy location model, have several roots. Lesson 5 shows how to find the global maximum reliably.`,
          resources: [
            siegrist('point/Likelihood', 'Maximum Likelihood', 'Definitions, invariance and many examples, including the uniform and non-unique cases.', true),
            statlect('fundamentals-of-statistics/maximum-likelihood', 'Maximum likelihood', 'The general framework and the standard examples.'),
            statlect('fundamentals-of-statistics/normal-distribution-maximum-likelihood', 'Normal distribution: maximum likelihood estimation', 'The normal MLEs derived in full, with the Hessian check.'),
          ],
          exercises: [
            {
              slug: 'mle-drill',
              title: 'MLEs for four families',
              prompt:
                'Find the MLE, and check that it is a maximum, for: (a) Bernoulli($p$); (b) Poisson($\\lambda$); (c) geometric on $\\{1, 2, \\dots\\}$ with success probability $p$; (d) $N(\\mu, \\sigma^2)$ with both unknown (show that the Hessian is negative definite at the critical point). What happens in (a) if every observation is $0$?',
              kind: 'problem',
              difficulty: 1,
              hint: '(c) $\\hat p = 1/\\bar x$. In (a), $\\hat p = 0$ is on the boundary of $[0, 1]$, and the score equation has no solution in $(0, 1)$.',
            },
            {
              slug: 'bias-of-rate-mle',
              title: 'The bias of an exponential rate MLE',
              prompt:
                'Show that $E[1/\\bar X] = n\\lambda/(n-1)$ for iid Exponential($\\lambda$) data with $n \\ge 2$, and $\\operatorname{Var}(1/\\bar X) = n^2\\lambda^2/((n-1)^2(n-2))$ for $n \\ge 3$. Construct an unbiased estimator. Check both formulas by simulation for $n = 5$ and $n = 50$ with $\\lambda = 2$.',
              kind: 'simulation',
              difficulty: 2,
              hint: 'Use $E[T^{-r}] = \\lambda^r\\Gamma(n - r)/\\Gamma(n)$ for $T \\sim$ Gamma($n$, $1/\\lambda$) and $r < n$.',
            },
            {
              slug: 'non-unique-mle',
              title: 'A non-unique MLE',
              prompt:
                'For iid uniform on $(\\theta - \\tfrac12, \\theta + \\tfrac12)$, show that every $\\theta$ in $[x_{(n)} - \\tfrac12,\\ x_{(1)} + \\tfrac12]$ maximises the likelihood. By simulation for $n = 10$, compare the MSE of the midrange $(X_{(1)} + X_{(n)})/2$ with that of $\\bar X$, and explain why the midrange is so much better.',
              kind: 'simulation',
              difficulty: 2,
              hint: 'The midrange has variance of order $1/n^2$, while $\\bar X$ has variance $1/(12n)$.',
            },
            {
              slug: 'invariance-proof',
              title: 'Invariance of the MLE',
              prompt:
                'Prove the invariance property for a one-to-one $g$. Then define the induced likelihood $L^*(\\eta) = \\sup\\{L(\\theta) : g(\\theta) = \\eta\\}$ and prove that $g(\\hat\\theta)$ maximises $L^*$ for any $g$. Use invariance to find the MLE of $P(X > 1)$ for $N(\\mu, \\sigma^2)$ data.',
              kind: 'derivation',
              difficulty: 2,
              hint: 'The MLE is $1 - \\Phi((1 - \\bar x)/\\hat\\sigma)$ with $\\hat\\sigma$ using divisor $n$.',
            },
          ],
          selfAssessment: [
            {
              question: 'Why is the likelihood not a probability density for $\\theta$?',
              answerOutline: 'It is the density of the data evaluated at the observed values, viewed as a function of $\\theta$; it need not integrate to $1$ over $\\theta$.',
            },
            {
              question: 'Why can the score equation fail to locate the MLE for the uniform$(0, \\theta)$ model?',
              answerOutline: 'The likelihood is discontinuous at $\\theta = x_{(n)}$ and decreasing beyond it; the maximum is at the boundary where no derivative vanishes.',
            },
            {
              question: 'State the invariance property.',
              answerOutline: 'If $\\hat\\theta$ is the MLE of $\\theta$, then $g(\\hat\\theta)$ is the MLE of $g(\\theta)$.',
            },
          ],
        },
        {
          slug: 'score-and-fisher-information',
          title: 'The score, Fisher information and observed information',
          summary:
            'The score has mean zero and variance equal to the Fisher information. Compute information for one and several parameters, under reparametrisation, and from the data as observed information.',
          estimatedMinutes: 110,
          objectives: [
            'Prove that the score has mean zero and variance $I(\\theta)$ under the regularity conditions',
            'Compute the Fisher information matrix for multi-parameter families',
            'Transform information under a reparametrisation',
            'Compute observed information and explain its use for standard errors',
            'Distinguish expected and observed information in models where they differ',
          ],
          concepts: [
            'Score $U(\\theta) = \\ell\'(\\theta)$',
            'Mean-zero property of the score',
            'Fisher information matrix',
            'Information is additive over independent observations',
            'Reparametrisation rule',
            'Observed information $J(\\hat\\theta) = -\\ell\'\'(\\hat\\theta)$',
            'Standard error from information',
          ],
          explanation: `For a sample, the **score** is $U(\\theta) = \\ell'(\\theta) = \\sum_i\\partial_\\theta\\ln f(X_i;\\theta)$. Under the regularity conditions of the Cramér-Rao lesson, $E_\\theta U(\\theta) = 0$ and $\\operatorname{Var}_\\theta U(\\theta) = nI(\\theta)$. If the density can be differentiated twice under the integral sign, then also $nI(\\theta) = -E_\\theta\\,\\ell''(\\theta)$. Geometrically, information is the expected curvature of the log-likelihood at the true parameter. A sharply peaked log-likelihood pins $\\theta$ down well. Information adds over independent observations, which is why standard errors shrink like $1/\\sqrt n$.

With several parameters $\\theta = (\\theta_1, \\dots, \\theta_k)$, the **information matrix** has entries $I_{jk} = E[\\partial_j\\ln f\\,\\partial_k\\ln f] = -E[\\partial_j\\partial_k\\ln f]$. For $N(\\mu, \\sigma^2)$ with parameters $(\\mu, \\sigma^2)$, it is $\\operatorname{diag}(1/\\sigma^2,\\ 1/(2\\sigma^4))$. The zero off-diagonal entries say that the two parameters can be estimated "orthogonally".

**Reparametrisation.** If $\\theta = \\theta(\\eta)$ is a smooth one-to-one reparametrisation, the chain rule gives $I_\\eta(\\eta) = I_\\theta(\\theta(\\eta))\\,(d\\theta/d\\eta)^2$. In matrix form, $I_\\eta = D^TI_\\theta D$, where $D$ is the Jacobian matrix of $\\theta(\\eta)$. Information is not invariant under reparametrisation, which is why the Cramér-Rao bound for $\\tau(\\theta)$ carries the factor $\\tau'(\\theta)^2$.

**Observed information.** The expected information $I(\\theta)$ involves the unknown $\\theta$. In practice you use the **observed information** $J(\\hat\\theta) = -\\ell''(\\hat\\theta)$, the curvature of the actual log-likelihood at its peak, and report $\\operatorname{SE}(\\hat\\theta) \\approx 1/\\sqrt{J(\\hat\\theta)}$. In exponential families with the natural parametrisation, $J(\\hat\\theta) = nI(\\hat\\theta)$ exactly. In other models the two differ, and there are good arguments for preferring $J$.

**Worked example: Bernoulli.** For one observation, $\\ln f = x\\ln p + (1 - x)\\ln(1 - p)$, so the score is
$$s(p) = \\frac xp - \\frac{1-x}{1-p} = \\frac{x - p}{p(1-p)}.$$
Its mean is $0$, since $EX = p$. Its variance is $\\frac{p(1-p)}{p^2(1-p)^2} = \\frac{1}{p(1-p)}$. Using the second form instead, $-\\partial_p^2\\ln f = \\frac{x}{p^2} + \\frac{1-x}{(1-p)^2}$ has mean $\\frac1p + \\frac1{1-p} = \\frac{1}{p(1-p)}$, the same. For $n$ trials, $nI(p) = n/(p(1-p))$, and $1/\\sqrt{nI(\\hat p)} = \\sqrt{\\hat p(1-\\hat p)/n}$ is the familiar standard error of a proportion. The observed information is $J(\\hat p) = \\frac{n\\hat p}{\\hat p^2} + \\frac{n(1-\\hat p)}{(1-\\hat p)^2} = \\frac{n}{\\hat p(1-\\hat p)}$, equal to $nI(\\hat p)$.

In the log-odds parametrisation $\\eta = \\ln(p/(1-p))$, we have $dp/d\\eta = p(1-p)$, so $I_\\eta = \\frac{1}{p(1-p)}\\,p^2(1-p)^2 = p(1-p)$. Information about the log-odds is largest at $p = \\tfrac12$, while information about $p$ is smallest there.

**Pitfall.** The information identities need the regularity conditions. For uniform$(0, \\theta)$ the score does not have mean zero, and "information" computed formally means nothing.`,
          resources: [
            statlect('glossary/information-matrix', 'Information matrix', 'The information matrix, the information equality and examples.'),
            siegrist('point/Likelihood', 'Maximum Likelihood', 'Score and information in the context of the MLE.', true),
            wasserman('The likelihood notes define the score and Fisher information and prove the identities.'),
          ],
          exercises: [
            {
              slug: 'normal-information-matrix',
              title: 'The normal information matrix',
              prompt:
                'Derive the Fisher information matrix for one $N(\\mu, \\sigma^2)$ observation in the parametrisation $(\\mu, \\sigma^2)$, and then in the parametrisation $(\\mu, \\sigma)$ using $I_\\eta = D^TI_\\theta D$. Invert both to get the asymptotic variances of the MLEs from $n$ observations.',
              kind: 'derivation',
              difficulty: 2,
              hint: 'In $(\\mu, \\sigma)$ the matrix is $\\operatorname{diag}(1/\\sigma^2, 2/\\sigma^2)$.',
            },
            {
              slug: 'cauchy-information',
              title: 'Information for the Cauchy location',
              prompt:
                'For the Cauchy location density $\\frac{1}{\\pi(1 + (x - \\theta)^2)}$, show that $I(\\theta) = \\tfrac12$. Simulate $10^4$ samples of size $25$ with $\\theta = 0$, and for each compute the MLE numerically and the observed information $J(\\hat\\theta)$. Compare the spread of $J(\\hat\\theta)$ with $nI = 12.5$, and the variance of $\\hat\\theta$ with $1/(nI) = 0.08$.',
              kind: 'simulation',
              difficulty: 3,
              hint: 'For the information integral, substitute $x - \\theta = \\tan u$.',
            },
            {
              slug: 'exponential-reparam',
              title: 'Rate versus mean',
              prompt:
                'For the exponential distribution, compute the information for the rate $\\lambda$ and for the mean $\\mu = 1/\\lambda$, directly and by the reparametrisation rule. Show that the Cramér-Rao bound for unbiased estimators of $\\mu$ is attained, but that no unbiased estimator of $\\lambda$ attains its bound.',
              kind: 'derivation',
              difficulty: 2,
              hint: '$I(\\lambda) = 1/\\lambda^2$ and $I(\\mu) = 1/\\mu^2$. The UMVUE of $\\lambda$ is $(n-1)/\\sum X_i$, with variance $\\lambda^2/(n-2)$.',
            },
          ],
          selfAssessment: [
            {
              question: 'What are the mean and variance of the score under regularity conditions?',
              answerOutline: 'Mean $0$, variance $nI(\\theta)$.',
            },
            {
              question: 'How does Fisher information change under a reparametrisation $\\theta = \\theta(\\eta)$?',
              answerOutline: '$I_\\eta = I_\\theta(d\\theta/d\\eta)^2$, or $D^TI_\\theta D$ in several parameters.',
            },
            {
              question: 'What is observed information, and how is it used?',
              answerOutline: '$J(\\hat\\theta) = -\\ell\'\'(\\hat\\theta)$; $1/\\sqrt{J}$ (or the inverse matrix) estimates the standard error of the MLE.',
            },
          ],
        },
        {
          slug: 'asymptotics-of-the-mle',
          title: 'Consistency and asymptotic normality of the MLE',
          summary:
            'Under stated regularity conditions, the MLE is consistent and $\\sqrt n(\\hat\\theta - \\theta_0)$ is asymptotically $N(0, 1/I(\\theta_0))$. See the Taylor-expansion argument, check the approximation by simulation, and study cases where the conditions fail.',
          estimatedMinutes: 130,
          objectives: [
            'State the regularity conditions for the asymptotic normality of the MLE',
            'Sketch the proof by Taylor expansion of the score',
            'Use the result to build Wald standard errors and intervals',
            'Compare the asymptotic approximation with exact results and simulation for a finite $n$',
            'Identify failures: parameter-dependent support, true value on the boundary, non-identifiability',
          ],
          concepts: [
            'Consistency of the MLE',
            'Identifiability',
            'Asymptotic normality',
            'Asymptotic efficiency',
            'Taylor expansion of the score',
            'Wald standard error',
            'Boundary and support failures',
          ],
          explanation: `**Theorem.** Let $X_1, X_2, \\dots$ be iid with density $f(x;\\theta)$, and let $\\theta_0$ be the true value. Assume:

1. the model is **identifiable**: different $\\theta$ give different distributions;
2. the support does not depend on $\\theta$;
3. $\\theta_0$ is an interior point of an open parameter set;
4. $\\ln f(x;\\theta)$ is three times differentiable in $\\theta$ near $\\theta_0$, with the third derivative bounded by an integrable function $M(x)$ uniformly near $\\theta_0$;
5. the density can be differentiated twice under the integral sign;
6. $0 < I(\\theta_0) < \\infty$.

Then, with probability tending to $1$, the likelihood equation has a root $\\hat\\theta_n$ that is consistent for $\\theta_0$, and
$$\\sqrt n(\\hat\\theta_n - \\theta_0) \\to N\\left(0, \\frac{1}{I(\\theta_0)}\\right)\\ \\text{in distribution}.$$
If the likelihood equation has a unique root, or the MLE is known to be consistent (for example under Wald's conditions), this root is the MLE. The asymptotic variance $1/(nI)$ equals the Cramér-Rao bound, so the MLE is **asymptotically efficient**.

**Why it works.** Expand the score about $\\theta_0$: $0 = U(\\hat\\theta) \\approx U(\\theta_0) + (\\hat\\theta - \\theta_0)U'(\\theta_0)$. Therefore
$$\\sqrt n(\\hat\\theta - \\theta_0) \\approx \\frac{U(\\theta_0)/\\sqrt n}{-U'(\\theta_0)/n}.$$
The numerator is a sum of iid mean-zero terms with variance $I(\\theta_0)$, so by the CLT it tends to $N(0, I)$. The denominator tends to $I(\\theta_0)$ in probability by the law of large numbers. Slutsky's theorem gives $N(0, I)/I = N(0, 1/I)$. Condition 4 controls the error in the Taylor expansion.

**Worked example.** For iid Exponential($\\lambda$), $\\hat\\lambda = 1/\\bar X$ and $I(\\lambda) = 1/\\lambda^2$, so $\\hat\\lambda$ is approximately $N(\\lambda, \\lambda^2/n)$. With $\\lambda = 2$ and $n = 50$, the asymptotic standard deviation is $2/\\sqrt{50} \\approx 0.283$. The exact moments are available here because $\\sum X_i$ is gamma: $E\\hat\\lambda = \\frac{n\\lambda}{n-1} \\approx 2.041$ and $\\operatorname{sd}(\\hat\\lambda) = \\frac{n\\lambda}{(n-1)\\sqrt{n-2}} \\approx 0.295$. So at $n = 50$ the approximation is good to about 4% in the standard deviation, with a small upward bias and a slight right skew. A simulation of $10^5$ samples reproduces the exact values, and a normal Q-Q plot of $\\hat\\lambda$ shows the skew.

The **Wald standard error** $1/\\sqrt{nI(\\hat\\theta)}$, or $1/\\sqrt{J(\\hat\\theta)}$, plugs in the estimate. By Slutsky, $(\\hat\\theta - \\theta_0)\\sqrt{nI(\\hat\\theta)} \\to N(0, 1)$ still holds, which gives the Wald interval of Module 6.

**When it fails.**
- *Support depends on $\\theta$.* For uniform$(0, \\theta)$, $n(\\theta - \\hat\\theta)/\\theta \\to$ Exponential(1): a faster rate and a non-normal limit.
- *Boundary.* For $N(\\theta, 1)$ with $\\theta \\ge 0$, the MLE is $\\max(0, \\bar X)$. If $\\theta_0 = 0$, then $\\sqrt n\\hat\\theta$ equals $0$ with probability $\\tfrac12$ and is otherwise half-normal.
- *Non-identifiability*, as in mixtures with label switching, breaks consistency itself.

**Pitfall.** "Asymptotically normal" says nothing about a particular $n$. For skewed problems or small samples, check by simulation, or use a transformation such as $\\ln\\hat\\lambda$ that makes the normal approximation better.`,
          resources: [
            siegrist('point/Likelihood', 'Maximum Likelihood', 'Asymptotic properties of the MLE with examples.', true),
            mit18650('The maximum likelihood lectures prove asymptotic normality and discuss the conditions.'),
            mit18655('Rigorous treatment of consistency and asymptotic efficiency of the MLE.'),
          ],
          exercises: [
            {
              slug: 'poisson-conditions',
              title: 'Checking the conditions',
              prompt:
                'Verify each regularity condition of the theorem for the Poisson family with $\\lambda_0 > 0$, and state the asymptotic distribution of $\\hat\\lambda$. Then explain precisely which condition fails for (a) uniform$(0, \\theta)$, (b) $N(\\theta, 1)$ with parameter space $[0, \\infty)$ and $\\theta_0 = 0$, (c) a two-component normal mixture with unknown labels.',
              kind: 'writing',
              difficulty: 2,
            },
            {
              slug: 'exponential-mle-simulation',
              title: 'How normal is the MLE at finite n?',
              prompt:
                'Simulate $10^5$ values of $\\hat\\lambda = 1/\\bar X$ for $\\lambda = 2$ and $n = 10, 50, 200$. Compare the simulated mean and standard deviation with the exact formulas and with the asymptotic $N(\\lambda, \\lambda^2/n)$. Repeat for $\\ln\\hat\\lambda$, whose asymptotic variance is $1/n$ by the delta method, and show that its distribution is closer to normal.',
              kind: 'simulation',
              difficulty: 2,
            },
            {
              slug: 'boundary-mle',
              title: 'A true value on the boundary',
              prompt:
                'For iid $N(\\theta, 1)$ with parameter space $\\theta \\ge 0$, show that the MLE is $\\max(0, \\bar X)$. When $\\theta_0 = 0$, find the exact distribution of $\\sqrt n\\hat\\theta$ (a mixture of a point mass and a half-normal), its mean and its variance. Confirm by simulation, and explain which hypothesis of the theorem fails.',
              kind: 'derivation',
              difficulty: 3,
              hint: 'The mean is $1/\\sqrt{2\\pi}$ and the second moment is $\\tfrac12$.',
            },
            {
              slug: 'cauchy-median-vs-mle',
              title: 'Efficiency for the Cauchy location',
              prompt:
                'For the Cauchy location model, the asymptotic variance of the MLE is $1/(nI) = 2/n$, and that of the sample median is $\\pi^2/(4n)$. Compute the asymptotic relative efficiency of the median, and confirm both variances by simulation with $n = 101$, finding the MLE numerically from a median start.',
              kind: 'simulation',
              difficulty: 3,
              hint: 'The relative efficiency is $8/\\pi^2 \\approx 0.81$.',
            },
          ],
          selfAssessment: [
            {
              question: 'State the asymptotic distribution of the MLE and three of the conditions it requires.',
              answerOutline: '$\\sqrt n(\\hat\\theta - \\theta_0) \\to N(0, 1/I(\\theta_0))$; identifiability, support free of $\\theta$, interior true value, smoothness with dominated third derivative, $0 < I < \\infty$.',
            },
            {
              question: 'Outline the Taylor-expansion argument.',
              answerOutline: 'Expand $U(\\hat\\theta) = 0$ about $\\theta_0$; numerator $U(\\theta_0)/\\sqrt n \\to N(0, I)$ by CLT; denominator $-U\'/n \\to I$ by LLN; Slutsky.',
            },
            {
              question: 'Give two models where the MLE is not asymptotically normal, and why.',
              answerOutline: 'Uniform$(0,\\theta)$ (support depends on $\\theta$; rate $1/n$, exponential limit); $\\theta_0$ on the boundary of the parameter space (half point mass).',
            },
          ],
        },
        {
          slug: 'delta-method',
          title: 'The delta method',
          summary:
            'Transfer asymptotic normality from an estimator to a smooth function of it, find variance-stabilising transformations, and handle the second-order case when the derivative vanishes.',
          estimatedMinutes: 110,
          objectives: [
            'State and prove the delta method with its hypotheses',
            'Compute asymptotic standard errors for functions of MLEs',
            'Derive variance-stabilising transformations for the Poisson and binomial',
            'Apply the second-order delta method when $g\'(\\theta) = 0$',
            'Use the multivariate delta method for functions of several estimates',
          ],
          concepts: [
            'Delta method',
            'Asymptotic variance $g\'(\\theta)^2\\sigma^2$',
            'Variance-stabilising transformation',
            'Square-root and arcsine transforms',
            'Second-order delta method',
            'Multivariate delta method $\\nabla g^T\\Sigma\\nabla g$',
          ],
          explanation: `**Delta method.** Suppose $\\sqrt n(T_n - \\theta) \\to N(0, \\sigma^2)$ in distribution. Let $g$ be differentiable at $\\theta$ with $g'(\\theta) \\ne 0$. Then
$$\\sqrt n(g(T_n) - g(\\theta)) \\to N(0, g'(\\theta)^2\\sigma^2).$$
**Proof.** Write $g(T_n) - g(\\theta) = g'(\\theta)(T_n - \\theta) + R_n$, where $R_n/(T_n - \\theta) \\to 0$ as $T_n \\to \\theta$. Since $T_n \\to \\theta$ in probability (it is within $O(1/\\sqrt n)$ of $\\theta$), $\\sqrt nR_n \\to 0$ in probability. Slutsky finishes the proof. In practice you estimate the standard error of $g(\\hat\\theta)$ by $|g'(\\hat\\theta)|\\,\\widehat{\\operatorname{SE}}(\\hat\\theta)$. Combined with invariance, this gives a complete large-sample treatment of any smooth function of an MLE.

**Multivariate version.** If $\\sqrt n(T_n - \\theta) \\to N_k(0, \\Sigma)$ and $g: \\mathbb R^k \\to \\mathbb R$ is differentiable at $\\theta$ with $\\nabla g(\\theta) \\ne 0$, the asymptotic variance is $\\nabla g(\\theta)^T\\Sigma\\,\\nabla g(\\theta)$. Ratios, products and differences of estimates are handled this way.

**Variance stabilisation.** Often $\\sigma^2 = \\sigma^2(\\theta)$ depends on the parameter. Choosing $g$ with $g'(\\theta) = 1/\\sigma(\\theta)$ makes the asymptotic variance constant. For the Poisson, $\\sigma^2 = \\lambda$, so $g(\\lambda) = 2\\sqrt\\lambda$ gives $\\sqrt n(2\\sqrt{\\bar X} - 2\\sqrt\\lambda) \\to N(0, 1)$. For a proportion, $\\sigma^2 = p(1-p)$, and $g(p) = \\arcsin\\sqrt p$ gives asymptotic variance $\\frac{1}{4n}$, whatever $p$ is.

**Second order.** If $g'(\\theta) = 0$ but $g''(\\theta) \\ne 0$, the first-order limit is degenerate. Expanding to second order gives
$$n(g(T_n) - g(\\theta)) \\to \\tfrac12\\sigma^2g''(\\theta)\\chi^2_1.$$
For example, if $\\bar X$ comes from a population with $\\mu = 0$, then $n\\bar X^2/\\sigma^2 \\to \\chi^2_1$.

**Worked example: odds.** In $n = 100$ Bernoulli trials with $p = 0.3$, estimate the odds $\\omega = p/(1-p) = 3/7 \\approx 0.429$ by $\\hat\\omega = \\hat p/(1 - \\hat p)$. Here $\\sigma^2 = p(1-p)$ and $g'(p) = 1/(1-p)^2$, so
$$\\operatorname{Var}\\hat\\omega \\approx \\frac{1}{(1-p)^4}\\cdot\\frac{p(1-p)}{n} = \\frac{p}{n(1-p)^3} = \\frac{0.3}{100 \\times 0.343} \\approx 0.00875,$$
a standard deviation of about $0.0935$. For the log-odds, $g'(p) = 1/(p(1-p))$, so the variance is $\\frac{1}{np(1-p)} = \\frac{1}{21} \\approx 0.0476$. Simulating $10^5$ binomial samples gives a standard deviation of $\\hat\\omega$ close to $0.0935$, but with visible right skew. The log-odds is much closer to normal, which is why intervals are usually built on the log scale and transformed back.

**Pitfall.** The delta method needs $g$ to be differentiable at the true $\\theta$, and $g'(\\theta) \\ne 0$ for the first-order version. It also gives a variance only for the limiting distribution: $E[g(T_n)]$ may not even exist, as with $\\hat\\omega$ when $\\hat p = 1$ has positive probability.`,
          resources: [
            statlect('asymptotic-theory/delta-method', 'Delta method', 'Univariate and multivariate statements with proofs and examples.'),
            wasserman('The notes on the delta method cover the multivariate version and applications to MLEs.'),
            mit18650('The lectures use the delta method for proportions and for functions of MLEs.'),
          ],
          exercises: [
            {
              slug: 'log-odds-se',
              title: 'Standard error of a log-odds',
              prompt:
                'In $x = 30$ successes out of $n = 100$, estimate the log-odds and give its delta-method standard error. Build a 95% interval on the log-odds scale and transform it back to an interval for $p$. Compare with the Wald interval for $p$ and comment on symmetry.',
              kind: 'problem',
              difficulty: 1,
              hint: 'The log-odds estimate is $\\ln(3/7) \\approx -0.847$ with standard error $\\sqrt{1/21} \\approx 0.218$.',
            },
            {
              slug: 'stabilise-poisson',
              title: 'Stabilising the Poisson variance',
              prompt:
                'Derive the variance-stabilising transformation for the Poisson. By simulation with $n = 20$ and $\\lambda = 1, 5, 20$, show that $\\operatorname{Var}(\\sqrt{\\bar X})$ is close to $1/(4n)$ in each case, while $\\operatorname{Var}(\\bar X)$ changes with $\\lambda$. Where does the approximation work worst, and why?',
              kind: 'simulation',
              difficulty: 2,
            },
            {
              slug: 'second-order-delta',
              title: 'When the derivative vanishes',
              prompt:
                'For iid Bernoulli($p$), let $T_n = \\hat p(1 - \\hat p)$. Show that when $p \\ne \\tfrac12$ the delta method gives an asymptotic normal distribution, and find its variance. At $p = \\tfrac12$, show that $n(\\tfrac14 - T_n) \\to \\tfrac14\\chi^2_1$ in distribution, and check by simulation.',
              kind: 'derivation',
              difficulty: 3,
              hint: 'With $g(p) = p(1-p)$, $g\'(p) = 1 - 2p$ and $g\'\'(p) = -2$.',
            },
            {
              slug: 'coefficient-of-variation',
              title: 'A multivariate delta method',
              prompt:
                'For iid $N(\\mu, \\sigma^2)$ data with $\\mu > 0$, use the multivariate delta method with the joint asymptotic distribution of $(\\bar X, \\hat\\sigma^2)$ to find the asymptotic variance of the coefficient of variation $\\hat\\sigma/\\bar X$. Check it by simulation for $\\mu = 10$, $\\sigma = 2$, $n = 50$.',
              kind: 'derivation',
              difficulty: 3,
              hint: 'With $c = \\sigma/\\mu$, the asymptotic variance of $\\sqrt n(\\hat c - c)$ is $c^2(c^2 + \\tfrac12)$.',
            },
          ],
          selfAssessment: [
            {
              question: 'State the delta method and its hypotheses.',
              answerOutline: 'If $\\sqrt n(T_n - \\theta) \\to N(0,\\sigma^2)$ and $g$ is differentiable at $\\theta$ with $g\'(\\theta) \\ne 0$, then $\\sqrt n(g(T_n) - g(\\theta)) \\to N(0, g\'(\\theta)^2\\sigma^2)$.',
            },
            {
              question: 'What is a variance-stabilising transformation? Give one.',
              answerOutline: '$g$ with $g\' = 1/\\sigma(\\theta)$, making the asymptotic variance constant; e.g. $2\\sqrt\\lambda$ for Poisson, $\\arcsin\\sqrt p$ for binomial.',
            },
            {
              question: 'What happens when $g\'(\\theta) = 0$?',
              answerOutline: 'The first-order limit is degenerate; with $g\'\' \\ne 0$, $n(g(T_n) - g(\\theta)) \\to \\tfrac12\\sigma^2g\'\'(\\theta)\\chi^2_1$.',
            },
          ],
        },
        {
          slug: 'numerical-maximisation',
          title: 'Maximising a likelihood numerically',
          summary:
            'Newton-Raphson and Fisher scoring for likelihoods without closed-form maximisers, good starting values, reparametrisation for constraints, and how multiple roots can trap a naive solver.',
          estimatedMinutes: 120,
          objectives: [
            'Derive the Newton-Raphson and Fisher scoring updates for the MLE',
            'Use method-of-moments estimates or profile likelihoods as starting values',
            'Fit the gamma shape parameter by solving its profile equation',
            'Recognise when Newton-Raphson converges to a minimum or a non-global maximum',
            'Use scipy.optimize with a reparametrisation to handle positivity constraints, and check the result',
          ],
          concepts: [
            'Newton-Raphson iteration',
            'Fisher scoring',
            'Quadratic convergence',
            'Starting values',
            'Profile likelihood',
            'Multiple roots of the score equation',
            'Reparametrisation for constraints',
            'Convergence diagnostics',
          ],
          explanation: `Most realistic likelihoods have no closed-form maximiser. **Newton-Raphson** applies Newton's method to the score equation:
$$\\theta_{k+1} = \\theta_k - \\frac{\\ell'(\\theta_k)}{\\ell''(\\theta_k)},$$
or $\\theta_{k+1} = \\theta_k - H(\\theta_k)^{-1}\\nabla\\ell(\\theta_k)$ in several dimensions, with $H$ the Hessian. Near a root where $\\ell'' \\ne 0$, convergence is quadratic: the number of correct digits roughly doubles at each step. But Newton finds roots of $\\ell'$, not maxima of $\\ell$. Where $\\ell'' > 0$ it steps toward a minimum, and from a bad start it can diverge. **Fisher scoring** replaces $-\\ell''$ by the expected information $nI(\\theta_k)$:
$$\\theta_{k+1} = \\theta_k + \\frac{\\ell'(\\theta_k)}{nI(\\theta_k)}.$$
Because $nI > 0$, every step goes uphill in the direction of the score. It is often more stable far from the answer, and it coincides with Newton for exponential families in their natural parametrisation.

**Practical rules.** Start from a consistent estimate, such as the method of moments or a sample quantile. Reduce the dimension with a **profile likelihood** when some parameters have closed-form MLEs given the others. Handle constraints such as $\\alpha > 0$ by optimising over $\\ln\\alpha$. After convergence, check three things: $\\ell''(\\hat\\theta) < 0$, or the Hessian is negative definite; $\\ell(\\hat\\theta)$ is larger than at other candidate roots; and the answer does not change when you start elsewhere.

**Worked example: the gamma shape.** For iid gamma data with shape $\\alpha$ and scale $\\beta$, the score equation for $\\beta$ gives $\\hat\\beta = \\bar x/\\alpha$ for each fixed $\\alpha$. Substituting leaves the profile equation
$$\\ln\\alpha - \\psi(\\alpha) = s,\\qquad s = \\ln\\bar x - \\overline{\\ln x},$$
where $\\psi$ is the digamma function. By Jensen's inequality $s > 0$ (unless all observations are equal), and the left side decreases from $\\infty$ to $0$, so the root is unique. Suppose $\\bar x = 3.0$ and $\\overline{\\ln x} = 0.9$, so $s = \\ln 3 - 0.9 = 0.19861$. A good closed-form starting value is $\\alpha_0 = \\frac{3 - s + \\sqrt{(s-3)^2 + 24s}}{12s} \\approx 2.6656$. Newton on $h(\\alpha) = \\ln\\alpha - \\psi(\\alpha) - s$, with $h'(\\alpha) = 1/\\alpha - \\psi'(\\alpha)$, gives $\\alpha_1 = 2.672384$ and $\\alpha_2 = 2.672402$, and then nothing changes to seven digits. So $\\hat\\alpha \\approx 2.6724$ and $\\hat\\beta = 3.0/2.6724 \\approx 1.1226$. You can check this with scipy.special.digamma and scipy.optimize.brentq.

**A cautionary example.** For the Cauchy location model with data $-2, -1, 0, 9, 10$, the score has three roots: a global maximum at $\\theta \\approx -0.804$, a local minimum at $5.393$ and a local maximum at $9.202$. Newton started at the sample median $0$ converges to $-0.804$ in two steps. Started at the sample mean $3.2$, it converges to the local minimum $5.393$, and it reports success. Fisher scoring from $3.2$, with $nI = 2.5$, climbs to $-0.804$.

**Pitfall.** "The optimiser converged" means it found a stationary point. Whether that point is the MLE is your job to check.`,
          resources: [
            statlect('fundamentals-of-statistics/maximum-likelihood-algorithm', 'Maximum likelihood algorithm', 'Newton-Raphson, scoring and practical issues in numerical MLE.'),
            {
              title: 'SciPy documentation: scipy.optimize',
              url: 'https://docs.scipy.org/doc/scipy/reference/optimize.html',
              type: 'documentation',
              cost: 'free',
              provider: 'SciPy',
              note: 'minimize, brentq and newton for the exercises; read the notes on convergence criteria.',
            },
            scipyStats('The fit methods of continuous distributions give a check on your own MLE code.'),
          ],
          exercises: [
            {
              slug: 'cauchy-roots',
              title: 'Three roots of a Cauchy score',
              prompt:
                'For the Cauchy location model and data $-2, -1, 0, 9, 10$, plot $\\ell(\\theta)$ on $[-5, 15]$. Implement Newton-Raphson and Fisher scoring ($I = \\tfrac12$) and run each from $\\theta_0 = 0, 3.2, 6, 8$. Report where each converges and whether it is a maximum. Then propose a robust strategy and apply it.',
              kind: 'coding',
              difficulty: 2,
              hint: 'The stationary points are near $-0.804$ (global maximum), $5.393$ (minimum) and $9.202$ (local maximum).',
            },
            {
              slug: 'gamma-fit',
              title: 'Fit a gamma distribution',
              prompt:
                'Simulate $n = 200$ gamma observations with shape $2.5$ and scale $1.2$. Compute the method-of-moments estimates, then the MLE by solving the profile equation with Newton from the closed-form starting value. Compare with scipy.stats.gamma.fit(data, floc=0). Report standard errors from the inverse observed information matrix, and check them by repeating the whole fit on $2000$ simulated datasets.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'weibull-mle',
              title: 'Weibull lifetimes with a reparametrisation',
              prompt:
                'Write the log-likelihood of the Weibull distribution with shape $k > 0$ and scale $\\lambda > 0$. Maximise it with scipy.optimize.minimize over $(\\ln k, \\ln\\lambda)$ for a simulated sample of $100$ lifetimes with $k = 1.5$ and $\\lambda = 10$. Then derive the profile equation for $k$, solve it with brentq, and confirm that both methods agree.',
              kind: 'coding',
              difficulty: 3,
              hint: 'For fixed $k$, $\\hat\\lambda^k = \\frac1n\\sum x_i^k$.',
            },
            {
              slug: 'newton-convergence',
              title: 'Why Newton converges quadratically',
              prompt:
                'Let $h$ be twice continuously differentiable with a simple root $r$ ($h(r) = 0$, $h\'(r) \\ne 0$). Show that the Newton error $e_k = \\theta_k - r$ satisfies $e_{k+1} \\approx \\frac{h\'\'(r)}{2h\'(r)}e_k^2$ near $r$. Confirm it with the gamma-shape iteration of the worked example by printing $e_{k+1}/e_k^2$.',
              kind: 'derivation',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Write the Newton-Raphson and Fisher scoring updates.',
              answerOutline: 'Newton: $\\theta - \\ell\'/\\ell\'\'$. Scoring: $\\theta + \\ell\'/(nI(\\theta))$.',
            },
            {
              question: 'Why can Newton-Raphson converge to a minimum of the likelihood?',
              answerOutline: 'It solves $\\ell\' = 0$ and does not distinguish maxima from minima; where $\\ell\'\' > 0$ its step heads toward a minimum.',
            },
            {
              question: 'What checks should follow a numerical MLE?',
              answerOutline: 'Negative definite Hessian at the solution, comparison of $\\ell$ with other stationary points or a grid, and stability to different starting values.',
            },
          ],
        },
      ],
      project: {
        slug: 'lifetime-model-fit',
        title: 'Fit and assess a lifetime model',
        description: `Fit parametric lifetime models to a real dataset of positive measurements by maximum likelihood, and assess the fit honestly. Use failure or survival times from the reliability case studies in the NIST/SEMATECH e-Handbook of Statistical Methods, or inter-event times you record yourself (for example, gaps between buses, or between messages in a channel). Use at least 30 observations.

Fit the exponential, gamma and Weibull families. For each, derive the log-likelihood and score equations by hand, implement the fit yourself, and compare with SciPy. Then use the asymptotic theory of this module to quantify uncertainty, and check it with a parametric bootstrap.`,
        deliverables: [
          'The data, its source, and a short description of how it was collected',
          'Hand derivations of the log-likelihood, score and observed information for each family, and your own fitting code with convergence checks',
          'Estimates with standard errors from the inverse observed information, and a delta-method standard error and interval for the median lifetime',
          'A parametric bootstrap with at least 2000 replications, comparing bootstrap and asymptotic standard errors',
          'Q-Q plots for the three fitted models, and a reasoned choice between them using the log-likelihoods (the formal test comes in Module 7)',
        ],
        estimatedHours: 10,
        stretchGoals: [
          'Handle right-censored observations by writing the likelihood with survival-function terms',
          'Compare the asymptotic and bootstrap distributions of the Weibull shape estimate with a Q-Q plot',
        ],
      },
    },
    {
      slug: 'confidence-intervals',
      title: 'Confidence Intervals',
      description:
        'Systematic ways to build intervals: exact intervals from pivotal quantities, large-sample Wald and score intervals with an honest look at their coverage, and intervals from the likelihood or from inverting a family of tests.',
      lessons: [
        {
          slug: 'pivotal-quantities',
          title: 'Pivotal quantities and exact intervals',
          summary:
            'A pivot is a function of data and parameter whose distribution is known. Use pivots to build exact intervals for normal, exponential and uniform models, and choose between equal-tailed and shortest intervals.',
          estimatedMinutes: 120,
          objectives: [
            'Define a pivotal quantity and turn one into a confidence interval',
            'Build exact intervals for the exponential mean using the chi-square pivot',
            'Build the exact interval for a uniform endpoint and explain why it is one-sided in shape',
            'Use location and scale structure to find pivots',
            'Compare equal-tailed and shortest intervals, and check coverage by simulation',
          ],
          concepts: [
            'Pivotal quantity',
            'Exact coverage',
            'Chi-square pivot for the exponential',
            'Pivot $X_{(n)}/\\theta$ for the uniform',
            'Location and scale pivots',
            'Equal-tailed and shortest intervals',
            'Monotone pivots and interval inversion',
          ],
          explanation: `A **pivotal quantity** $Q(X, \\theta)$ is a function of the data and the parameter whose distribution does not depend on $\\theta$. If $a$ and $b$ satisfy $P(a \\le Q \\le b) = 1 - \\alpha$, then $\\{\\theta : a \\le Q(X, \\theta) \\le b\\}$ is a $1 - \\alpha$ confidence set. When $Q$ is monotone in $\\theta$, that set is an interval with endpoints found by solving $Q = a$ and $Q = b$. You have already met $(\\bar X - \\mu)/(S/\\sqrt n) \\sim t_{n-1}$ and $(n-1)S^2/\\sigma^2 \\sim \\chi^2_{n-1}$.

Structure suggests pivots. In a **location family** $f(x - \\theta)$, $\\hat\\theta - \\theta$ is a pivot for an equivariant estimator $\\hat\\theta$. In a **scale family** $f(x/\\theta)/\\theta$, $\\hat\\theta/\\theta$ is a pivot. Exponential lifetimes and uniform$(0, \\theta)$ are scale families.

**Worked example 1: exponential lifetimes.** Ten components are tested, with lifetimes iid Exponential with mean $\\theta$ hours, and total time $T = \\sum x_i = 52$ hours. From Module 1, $2T/\\theta \\sim \\chi^2_{2n} = \\chi^2_{20}$, a pivot. The 2.5% and 97.5% points of $\\chi^2_{20}$ are $9.591$ and $34.170$. So
$$P\\left(9.591 \\le \\frac{2T}{\\theta} \\le 34.170\\right) = 0.95 \\iff \\frac{2T}{34.170} \\le \\theta \\le \\frac{2T}{9.591},$$
and the interval is $(104/34.170,\\ 104/9.591) = (3.04, 10.84)$ hours. It is exact for every $n$, and it is far from symmetric about $\\bar x = 5.2$. The large-sample interval $5.2 \\pm 1.96 \\times 5.2/\\sqrt{10} = (1.98, 8.42)$ is badly placed by comparison.

**Worked example 2: uniform endpoint.** For iid uniform$(0, \\theta)$, $Q = X_{(n)}/\\theta$ has CDF $q^n$ on $(0, 1)$, whatever $\\theta$ is. Since $P(\\alpha^{1/n} \\le Q \\le 1) = 1 - \\alpha$, the interval is
$$\\left[X_{(n)},\\ X_{(n)}/\\alpha^{1/n}\\right].$$
Every choice of $a < b$ with $b^n - a^n = 1 - \\alpha$ gives a valid interval $[X_{(n)}/b,\\ X_{(n)}/a]$, of length $X_{(n)}(1/a - 1/b)$. Differentiating along the constraint shows that this length decreases as $b$ increases, so $b = 1$ gives the shortest interval. The equal-tailed choice would be longer here. For $n = 10$, $x_{(n)} = 4.6$ and $\\alpha = 0.05$, the interval is $[4.6, 4.6/0.05^{0.1}] = [4.60, 6.21]$.

**Choosing $a$ and $b$.** Equal tails ($\\alpha/2$ in each tail) is the default, and it is invariant under monotone reparametrisation. The shortest interval for a unimodal pivot density puts $a$ and $b$ at equal density heights. Note that "shortest in the pivot" and "shortest in $\\theta$" can differ when the pivot is not linear in $\\theta$.

**Simulation check.** Draw many samples with a known $\\theta$ and record how often the interval covers it. For an exact interval, the coverage should match $1 - \\alpha$ within Monte Carlo error for every $n$, not just for large $n$.

**Pitfall.** A pivot must have a distribution free of every unknown parameter. $(\\bar X - \\mu)/(\\sigma/\\sqrt n)$ is a pivot only when $\\sigma$ is known.`,
          resources: [
            siegrist('interval/Introduction', 'Introduction to Interval Estimation', 'Pivots, the general construction, and location-scale families.', true),
            siegrist('interval/Normal', 'Estimation in the Normal Model', 'Exact pivotal intervals for the normal mean and variance.'),
            statlect('fundamentals-of-statistics/set-estimation', 'Set estimation', 'Confidence sets, coverage and their construction.'),
          ],
          exercises: [
            {
              slug: 'uniform-interval-coverage',
              title: 'An exact interval for a uniform endpoint',
              prompt:
                'Derive the interval $[X_{(n)}, X_{(n)}/\\alpha^{1/n}]$ and prove it is the shortest interval of the form $[X_{(n)}/b, X_{(n)}/a]$ with coverage $1 - \\alpha$. Check the coverage for $n = 3$ and $n = 30$ by simulation, and compare its average length with the equal-tailed interval from the same pivot.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'exponential-rate-interval',
              title: 'Intervals for an exponential rate and a reliability',
              prompt:
                'Using the data of the worked example ($n = 10$, $T = 52$ hours), give exact 95% intervals for the rate $\\lambda = 1/\\theta$ and for the reliability $e^{-20/\\theta}$, the probability that a component survives $20$ hours. Explain why monotone functions of an exact interval are exact intervals.',
              kind: 'problem',
              difficulty: 1,
              hint: 'For $\\lambda$: $(0.0922, 0.329)$ per hour. For the reliability, apply $\\theta \\mapsto e^{-20/\\theta}$ to $(3.04, 10.84)$.',
            },
            {
              slug: 'pooled-t',
              title: 'The pooled two-sample t interval',
              prompt:
                'For independent samples from $N(\\mu_1, \\sigma^2)$ and $N(\\mu_2, \\sigma^2)$ with a common variance, show that $\\frac{(\\bar X - \\bar Y) - (\\mu_1 - \\mu_2)}{S_p\\sqrt{1/n_1 + 1/n_2}} \\sim t_{n_1+n_2-2}$, where $S_p^2$ is the pooled variance. Then estimate by simulation the coverage of this interval when the variances differ by a factor of $4$ and $n_1 = 5$, $n_2 = 20$, with the larger variance in the smaller sample.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'location-pivot',
              title: 'A location pivot',
              prompt:
                'For iid observations from the shifted exponential density $e^{-(x - \\theta)}$, $x > \\theta$, show that $n(X_{(1)} - \\theta)$ is Exponential(1) and hence a pivot. Build the shortest 95% interval for $\\theta$, and check its coverage by simulation for $n = 8$.',
              kind: 'problem',
              difficulty: 2,
              hint: 'The interval is $[X_{(1)} + \\ln(0.05)/n,\\ X_{(1)}]$, that is, $[X_{(1)} - 3.00/n,\\ X_{(1)}]$.',
            },
          ],
          selfAssessment: [
            {
              question: 'What is a pivotal quantity?',
              answerOutline: 'A function of data and parameter whose distribution is known and free of all unknown parameters.',
            },
            {
              question: 'Give the exact interval for the mean of exponential lifetimes.',
              answerOutline: '$(2T/\\chi^2_{2n,1-\\alpha/2},\\ 2T/\\chi^2_{2n,\\alpha/2})$ from $2T/\\theta \\sim \\chi^2_{2n}$.',
            },
            {
              question: 'Why is the shortest interval for a uniform endpoint not equal-tailed?',
              answerOutline: 'The pivot density $nq^{n-1}$ is increasing, so probability is concentrated near $q = 1$; the shortest interval puts all of $\\alpha$ in the lower tail.',
            },
          ],
        },
        {
          slug: 'large-sample-intervals',
          title: 'Large-sample intervals: Wald and score',
          summary:
            'Intervals from the asymptotic normality of the MLE, the Wald and score constructions, and why the textbook Wald interval for a proportion has poor coverage, measured exactly and by simulation.',
          estimatedMinutes: 120,
          objectives: [
            'Build Wald intervals from the MLE and its estimated standard error',
            'Derive the score (Wilson) interval for a proportion by inverting the score test',
            'Compute the exact coverage of a binomial interval as a function of $p$',
            'Explain the erratic coverage of the Wald interval and when it fails',
            'Use transformations, such as the log or log-odds, to improve Wald intervals',
          ],
          concepts: [
            'Wald interval $\\hat\\theta \\pm z/\\sqrt{nI(\\hat\\theta)}$',
            'Score statistic and the score interval',
            'Wilson interval',
            'Exact coverage function',
            'Coverage oscillation for discrete data',
            'Clopper-Pearson interval',
            'Transform, build, back-transform',
          ],
          explanation: `When no exact pivot exists, the asymptotic normality of the MLE supplies an approximate one. The **Wald interval** is
$$\\hat\\theta \\pm z_{\\alpha/2}\\,\\widehat{\\operatorname{SE}},\\qquad \\widehat{\\operatorname{SE}} = 1/\\sqrt{nI(\\hat\\theta)}\\ \\text{or}\\ 1/\\sqrt{J(\\hat\\theta)}.$$
It is justified by $(\\hat\\theta - \\theta)/\\widehat{\\operatorname{SE}} \\to N(0, 1)$, which follows from the MLE theorem plus Slutsky, and so it needs the same regularity conditions. The **score interval** uses the score statistic, evaluating the information at the hypothesised $\\theta$ instead of at $\\hat\\theta$:
$$\\left\\{\\theta : \\frac{|U(\\theta)|}{\\sqrt{nI(\\theta)}} \\le z_{\\alpha/2}\\right\\}.$$
It does not need $\\hat\\theta$ at all, and it is often much more accurate for small samples.

For a binomial proportion, $U(p)/\\sqrt{nI(p)} = (\\hat p - p)/\\sqrt{p(1-p)/n}$. Solving $(\\hat p - p)^2 \\le z^2p(1-p)/n$, a quadratic inequality in $p$, gives the **Wilson interval**
$$\\frac{\\hat p + \\frac{z^2}{2n}}{1 + \\frac{z^2}{n}} \\pm \\frac{z}{1 + \\frac{z^2}{n}}\\sqrt{\\frac{\\hat p(1-\\hat p)}{n} + \\frac{z^2}{4n^2}}.$$
Its centre is pulled toward $\\tfrac12$, and it never leaves $[0, 1]$.

**Worked example.** With $x = 12$ successes in $n = 40$ trials, $\\hat p = 0.3$.

- **Wald:** $0.3 \\pm 1.96\\sqrt{0.21/40} = 0.3 \\pm 0.142$, giving $(0.158, 0.442)$.
- **Wilson:** with $z^2/n = 0.0960$, the centre is $(0.3 + 0.0480)/1.0960 = 0.3175$, and the half-width is $\\frac{1.96}{1.096}\\sqrt{0.00525 + 0.000600} = 0.1368$. That gives $(0.181, 0.454)$.

Which is better? For a binomial you can compute the **coverage exactly**. For a given true $p$, sum $P(X = k)$ over the $k$ whose interval contains $p$. At $p = 0.3$ and $n = 40$, the Wald coverage is $0.930$ and the Wilson coverage $0.944$, against a nominal $0.95$. At $p = 0.1$ and $n = 20$, the Wald interval covers only $0.876$ of the time, while Wilson gives $0.957$. As a function of $p$, coverage oscillates because $X$ is discrete. The Wald interval's dips are severe near $0$ and $1$, and they persist for surprisingly large $n$. When $x = 0$, the Wald interval collapses to the single point $\\{0\\}$. The **Clopper-Pearson** interval, built by inverting exact binomial tests, guarantees coverage of at least $1 - \\alpha$ for every $p$, at the cost of being conservative.

**Transformations.** A Wald interval built on a scale where the estimator is closer to normal, and then mapped back, usually does better. Examples are the log of a rate and the log-odds of a proportion. Unlike Wald intervals, score and likelihood intervals do not depend on the parametrisation.

**Pitfall.** Nominal 95% is a promise about coverage, and for discrete data no simple interval keeps it exactly at every $p$. Report which interval you used, and for important small-sample work check its coverage function.`,
          resources: [
            siegrist('interval/Bernoulli', 'Estimation in the Bernoulli Model', 'Wald, Wilson and exact intervals for a proportion.', true),
            statlect('fundamentals-of-statistics/score-test', 'Score test', 'The score statistic, whose inversion gives score intervals.'),
            mit18650('The lectures on asymptotic intervals cover Wald and plug-in constructions.'),
          ],
          exercises: [
            {
              slug: 'coverage-function',
              title: 'Exact coverage functions',
              prompt:
                'Write a function that computes the exact coverage of the Wald, Wilson and Clopper-Pearson 95% intervals for a binomial proportion, by summing binomial probabilities. Plot coverage against $p$ on a fine grid in $(0, 1)$ for $n = 20$ and $n = 100$. Report the minimum coverage of each, and confirm the values $0.876$ and $0.957$ at $p = 0.1$, $n = 20$.',
              kind: 'coding',
              difficulty: 2,
              hint: 'Use scipy.stats.beta quantiles for Clopper-Pearson: $(B_{\\alpha/2}(x, n - x + 1),\\ B_{1-\\alpha/2}(x + 1, n - x))$.',
            },
            {
              slug: 'derive-wilson',
              title: 'Derive the Wilson interval',
              prompt:
                'Solve the inequality $(\\hat p - p)^2 \\le z^2p(1-p)/n$ for $p$ and show that it gives the Wilson interval. Show that the interval always lies in $[0, 1]$, and that its centre is a weighted average of $\\hat p$ and $\\tfrac12$ with weights $n/(n + z^2)$ and $z^2/(n + z^2)$.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'poisson-rate-intervals',
              title: 'Intervals for a Poisson rate',
              prompt:
                'For counts in $n$ unit intervals with total $T$, derive the Wald interval for $\\lambda$, the Wald interval built on $\\ln\\lambda$ and transformed back, and the score interval. Compute all three for $n = 10$, $T = 15$, and estimate their coverage by simulation at $\\lambda = 0.5$ and $\\lambda = 1.5$ with $n = 10$.',
              kind: 'simulation',
              difficulty: 2,
              hint: 'The score interval solves $(\\hat\\lambda - \\lambda)^2 \\le z^2\\lambda/n$; for these data it is about $(0.909, 2.475)$.',
            },
          ],
          selfAssessment: [
            {
              question: 'How do Wald and score intervals differ in construction?',
              answerOutline: 'Wald evaluates the standard error at $\\hat\\theta$; score evaluates the information at each candidate $\\theta$ and inverts the score test.',
            },
            {
              question: 'Why does the Wald interval for a proportion perform badly near $p = 0$?',
              answerOutline: 'The estimated SE $\\sqrt{\\hat p(1-\\hat p)/n}$ is small or zero when $\\hat p$ is near $0$, and the normal approximation to the skewed binomial is poor; coverage dips well below nominal.',
            },
            {
              question: 'How do you compute the exact coverage of a binomial interval?',
              answerOutline: 'For true $p$, add $P_p(X = k)$ over all $k$ whose interval contains $p$.',
            },
          ],
        },
        {
          slug: 'likelihood-intervals-and-inverting-tests',
          title: 'Likelihood intervals and inverting tests',
          summary:
            'Any family of level-$\\alpha$ tests gives a confidence set. Inverting the likelihood ratio test gives likelihood intervals that are invariant under reparametrisation, and profile likelihood handles nuisance parameters.',
          estimatedMinutes: 120,
          objectives: [
            'Prove that inverting a family of level-$\\alpha$ tests gives a $1 - \\alpha$ confidence set',
            'Construct a likelihood-ratio interval from the log-likelihood and the $\\chi^2_1$ quantile',
            'Compare Wald, score, likelihood-ratio and exact intervals on one dataset',
            'Explain why likelihood intervals are invariant under reparametrisation',
            'Use the profile likelihood when there are nuisance parameters',
          ],
          concepts: [
            'Test inversion',
            'Acceptance region',
            'Likelihood-ratio interval',
            'Cutoff $\\chi^2_{1,1-\\alpha}/2$',
            'Invariance under reparametrisation',
            'Profile likelihood',
            'Exact Poisson (Garwood) interval',
          ],
          explanation: `**Inverting tests.** Suppose that for each $\\theta_0$ there is a level-$\\alpha$ test of $H_0: \\theta = \\theta_0$, with acceptance region $A(\\theta_0)$, so that $P_{\\theta_0}(X \\in A(\\theta_0)) \\ge 1 - \\alpha$. Define $C(X) = \\{\\theta_0 : X \\in A(\\theta_0)\\}$, the set of parameter values the data do not reject. Then for every $\\theta$, $P_\\theta(\\theta \\in C(X)) = P_\\theta(X \\in A(\\theta)) \\ge 1 - \\alpha$. So $C$ is a $1 - \\alpha$ confidence set. The argument is exact and needs no asymptotics. Every interval in this course arises this way. The $t$ interval inverts the $t$ test, the Wilson interval inverts the score test, and Clopper-Pearson inverts the exact binomial test.

**Likelihood-ratio intervals.** Inverting the likelihood ratio test of Module 7 gives
$$C = \\left\\{\\theta : 2\\left[\\ell(\\hat\\theta) - \\ell(\\theta)\\right] \\le \\chi^2_{1,\\,1-\\alpha}\\right\\},$$
which is $3.841$ for 95%. In words, these are the $\\theta$ whose log-likelihood is within $1.92$ of the maximum. Its approximate coverage rests on Wilks' theorem, which needs the same regularity conditions as the MLE theorem. The interval has one great practical virtue: it is **invariant under reparametrisation**. The interval for $g(\\theta)$ is just $g$ applied to the interval for $\\theta$, because the likelihood values are unchanged. It also follows the shape of the likelihood, so it is asymmetric when the likelihood is.

**Worked example.** Counts in $n = 10$ unit intervals are iid Poisson($\\lambda$), with total $T = 15$, so $\\hat\\lambda = 1.5$ and $\\ell(\\lambda) = T\\ln\\lambda - n\\lambda$ up to a constant. The likelihood interval solves
$$2\\left[T\\ln\\frac{\\hat\\lambda}{\\lambda} - n(\\hat\\lambda - \\lambda)\\right] = 3.841.$$
Solving numerically on each side of $\\hat\\lambda$ (with brentq, for instance) gives $(0.863, 2.392)$. Compare four intervals:

| interval | 95% interval for $\\lambda$ |
|---|---|
| Wald, $1.5 \\pm 1.96\\sqrt{1.5/10}$ | $(0.741, 2.259)$ |
| score | $(0.909, 2.475)$ |
| likelihood ratio | $(0.863, 2.392)$ |
| exact (Garwood) | $(0.840, 2.474)$ |

The exact interval inverts the two one-sided Poisson tests, using $\\chi^2_{2T,\\,0.025}/(2n)$ and $\\chi^2_{2T+2,\\,0.975}/(2n)$. Its coverage is at least 95% for every $\\lambda$. The Wald interval is symmetric, while the likelihood is skewed to the right. The other three agree that the upper limit is further from $1.5$ than the lower one.

**Nuisance parameters.** When $\\theta = (\\psi, \\eta)$ and only $\\psi$ is of interest, use the **profile log-likelihood** $\\ell_p(\\psi) = \\max_\\eta\\ell(\\psi, \\eta)$, and form the interval $\\{\\psi : 2[\\ell_p(\\hat\\psi) - \\ell_p(\\psi)] \\le \\chi^2_{1,1-\\alpha}\\}$. Wilks' theorem still gives $\\chi^2_1$ as the reference, since one parameter is constrained.

**Pitfall.** The $\\chi^2$ calibration is asymptotic. With small samples, or with $\\theta$ near the edge of the parameter space, check the coverage by simulation, or use an exact inversion when one exists.`,
          resources: [
            statlect('fundamentals-of-statistics/likelihood-ratio-test', 'Likelihood ratio test', 'The LR statistic whose inversion gives likelihood intervals.'),
            siegrist('interval/Introduction', 'Introduction to Interval Estimation', 'The duality between confidence sets and tests, proved in general.', true),
            wasserman('The notes on likelihood include profile likelihood and likelihood-based intervals.'),
          ],
          exercises: [
            {
              slug: 'inversion-proof',
              title: 'Inverting tests gives confidence sets',
              prompt:
                'Prove carefully that if each $A(\\theta_0)$ is the acceptance region of a level-$\\alpha$ test, then $C(X) = \\{\\theta_0 : X \\in A(\\theta_0)\\}$ has coverage at least $1 - \\alpha$ for every $\\theta$. Then show the converse: a $1 - \\alpha$ confidence set gives a level-$\\alpha$ test of each $H_0: \\theta = \\theta_0$.',
              kind: 'derivation',
              difficulty: 1,
            },
            {
              slug: 'exponential-lr-interval',
              title: 'A likelihood interval for an exponential mean',
              prompt:
                'For the lifetimes of the pivot lesson ($n = 10$, $T = 52$ hours, Exponential with mean $\\theta$), compute the 95% likelihood-ratio interval for $\\theta$ numerically. Compare it with the exact pivotal interval $(3.04, 10.84)$ and the Wald interval. Then transform the likelihood interval to one for the rate $1/\\theta$, and verify that recomputing it directly in the rate parametrisation gives the same answer.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'profile-normal-sigma',
              title: 'Profile likelihood for a normal standard deviation',
              prompt:
                'For $N(\\mu, \\sigma^2)$ data with both unknown, show that the profile log-likelihood for $\\sigma$ is $-n\\ln\\sigma - \\frac{n\\hat\\sigma^2}{2\\sigma^2}$, up to a constant, where $\\hat\\sigma^2$ is the MLE. Build the 95% profile likelihood interval for $\\sigma$ when $n = 10$ and $s^2 = 4$, and compare it with the exact chi-square interval $(1.38, 3.65)$.',
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'small-count-coverage',
              title: 'Coverage with small counts',
              prompt:
                'For a single Poisson count ($n = 1$), compute the exact coverage, as a function of $\\lambda \\in (0, 10]$, of the 95% Wald, score, likelihood-ratio and Garwood intervals, by summing Poisson probabilities. Plot the four curves and describe where each fails.',
              kind: 'coding',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does inverting level-$\\alpha$ tests give a $1-\\alpha$ confidence set?',
              answerOutline: '$\\theta \\in C(X)$ exactly when $X \\in A(\\theta)$, which has probability at least $1 - \\alpha$ under $\\theta$.',
            },
            {
              question: 'State the 95% likelihood-ratio interval.',
              answerOutline: '$\\{\\theta : 2[\\ell(\\hat\\theta) - \\ell(\\theta)] \\le 3.841\\}$, i.e. log-likelihood within $1.92$ of its maximum.',
            },
            {
              question: 'Why are likelihood intervals invariant under reparametrisation while Wald intervals are not?',
              answerOutline: 'Likelihood values do not change when the parameter is relabelled, so the set maps directly; Wald uses a local linear approximation that depends on the scale.',
            },
          ],
        },
      ],
    },
    {
      slug: 'hypothesis-testing',
      title: 'Hypothesis Testing',
      description:
        'Optimal tests and general-purpose tests: the Neyman-Pearson lemma, uniformly most powerful tests through monotone likelihood ratios, unbiasedness for two-sided problems, likelihood ratio tests with Wilks\' theorem, and Pearson\'s chi-square tests.',
      lessons: [
        {
          slug: 'neyman-pearson-lemma',
          title: 'The Neyman-Pearson lemma',
          summary:
            'For a simple null against a simple alternative, the most powerful test of a given size rejects when the likelihood ratio is large. Prove it, apply it, and handle discrete data with randomisation.',
          estimatedMinutes: 120,
          objectives: [
            'State the Neyman-Pearson lemma, including the role of randomisation for discrete data',
            'Prove the lemma by comparing an arbitrary test with the likelihood ratio test',
            'Reduce a likelihood ratio rejection region to a region for a simple statistic',
            'Compute the size and power of most powerful tests',
            'Construct a randomised test of exact size for a discrete distribution',
          ],
          concepts: [
            'Simple and composite hypotheses',
            'Test function $\\phi(x) \\in [0, 1]$',
            'Most powerful test',
            'Likelihood ratio $f_1/f_0$',
            'Neyman-Pearson lemma',
            'Randomised test',
            'Reduction to a sufficient statistic',
          ],
          explanation: `Describe a test by a **test function** $\\phi(x) \\in [0, 1]$, the probability of rejecting $H_0$ when the data are $x$. An ordinary test has $\\phi \\in \\{0, 1\\}$. A **randomised** test rejects with probability $\\gamma$ on a boundary set. The size is $E_0\\phi(X)$ and the power is $E_1\\phi(X)$.

**Neyman-Pearson lemma.** Test $H_0: f = f_0$ against $H_1: f = f_1$, both fully specified. For $k \\ge 0$, any test of the form
$$\\phi^*(x) = \\begin{cases} 1 & f_1(x) > kf_0(x),\\\\ \\gamma & f_1(x) = kf_0(x),\\\\ 0 & f_1(x) < kf_0(x),\\end{cases}$$
is most powerful among all tests whose size is at most its own size. Moreover, for every $\\alpha \\in (0, 1)$ there exist $k$ and $\\gamma$ that make the size exactly $\\alpha$.

**Proof.** Let $\\phi$ be any test with $E_0\\phi \\le E_0\\phi^*$. At every $x$, $(\\phi^*(x) - \\phi(x))(f_1(x) - kf_0(x)) \\ge 0$. Where $f_1 > kf_0$, $\\phi^* = 1 \\ge \\phi$; where $f_1 < kf_0$, $\\phi^* = 0 \\le \\phi$; and on the boundary the second factor is zero. Integrating,
$$E_1\\phi^* - E_1\\phi \\ge k(E_0\\phi^* - E_0\\phi) \\ge 0.$$
Rejecting where the data are most likely under $H_1$ relative to $H_0$ is optimal. It is the "best value for money" rule of putting the type I error budget where it buys the most power.

In practice, the inequality $f_1/f_0 > k$ simplifies to an inequality for a sufficient statistic. Then $k$ is never computed explicitly: you choose the cutoff for the statistic to give size $\\alpha$.

**Worked example.** Let $X_1, \\dots, X_9$ be iid $N(\\mu, 1)$. Test $H_0: \\mu = 0$ against $H_1: \\mu = 1$ at $\\alpha = 0.05$. The ratio is
$$\\frac{f_1}{f_0} = \\exp\\left(\\sum x_i - \\frac n2\\right),$$
which is increasing in $\\bar x$. So the most powerful test rejects when $\\bar x > c$. Under $H_0$, $\\bar X \\sim N(0, 1/9)$, so $c = 1.645/3 = 0.548$. The power is
$$P_1(\\bar X > 0.548) = P(Z > 3(0.548 - 1)) = P(Z > -1.355) \\approx 0.912.$$
Nothing in the test depends on the alternative value $1$, beyond the fact that it is larger than $0$. The next lesson builds on exactly this.

**Discrete data.** For $X \\sim$ Binomial(10, $p$) with $H_0: p = 0.5$ against $H_1: p = 0.7$, the ratio is increasing in $x$, so the test rejects for large $x$. But $P_{0.5}(X \\ge 8) = 56/1024 \\approx 0.0547$ and $P_{0.5}(X \\ge 9) = 11/1024 \\approx 0.0107$. Neither is $0.05$. Rejecting when $X \\ge 9$, and with probability $\\gamma$ when $X = 8$, gives size exactly $0.05$ for
$$\\gamma = \\frac{0.05 - 11/1024}{45/1024} \\approx 0.893.$$
Randomised tests matter mainly in theory. In practice you report a p-value, or a slightly conservative non-randomised test.

**Pitfall.** The lemma is about one specific alternative. A test that is most powerful against $\\mu = 1$ may be terrible against $\\mu = -1$.`,
          resources: [
            siegrist('hypothesis/Likelihood', 'Likelihood Ratio Tests', 'The Neyman-Pearson lemma, its proof and applications to the standard families.', true),
            mit18655('The testing lectures treat the Neyman-Pearson lemma with randomised tests.'),
            statlect('fundamentals-of-statistics/hypothesis-testing', 'Hypothesis testing', 'Size, power and the test framework.'),
          ],
          exercises: [
            {
              slug: 'exponential-np',
              title: 'Most powerful test for an exponential rate',
              prompt:
                'For iid Exponential data with rate $\\lambda$, find the most powerful level-$\\alpha$ test of $H_0: \\lambda = 1$ against $H_1: \\lambda = 2$ based on $n$ observations. Express the cutoff using the chi-square distribution of $2\\sum X_i$. Compute the cutoff and the power for $n = 10$, $\\alpha = 0.05$, and confirm by simulation.',
              kind: 'problem',
              difficulty: 1,
              hint: 'Reject when $\\sum X_i$ is small: $2\\sum X_i < \\chi^2_{20, 0.05} \\approx 10.85$, i.e. $\\sum X_i < 5.425$. The power is $P(\\chi^2_{20} < 21.70) \\approx 0.64$.',
            },
            {
              slug: 'np-proof',
              title: 'Prove the lemma',
              prompt:
                'Write out the proof of the Neyman-Pearson lemma for densities, including the existence part: show that for every $\\alpha \\in (0, 1)$ there exist $k$ and $\\gamma$ with $E_0\\phi^* = \\alpha$. Use the right-continuity of the CDF of $f_1(X)/f_0(X)$ under $H_0$.',
              kind: 'derivation',
              difficulty: 3,
            },
            {
              slug: 'randomised-binomial',
              title: 'An exact-size randomised test',
              prompt:
                'Reproduce the randomised test for Binomial(10, $p$), $H_0: p = 0.5$ against $H_1: p = 0.7$, at size exactly $0.05$. Compute its power, and compare with the powers of the non-randomised tests that reject for $X \\ge 8$ and for $X \\ge 9$.',
              kind: 'problem',
              difficulty: 2,
              hint: 'Powers: $P_{0.7}(X \\ge 9) \\approx 0.149$, $P_{0.7}(X \\ge 8) \\approx 0.383$, and the randomised test is about $0.358$.',
            },
            {
              slug: 'two-normals-different-variance',
              title: 'When the ratio is not monotone',
              prompt:
                'For a single observation, find the most powerful test of $H_0: X \\sim N(0, 1)$ against $H_1: X \\sim N(0, 4)$, and show that its rejection region is $\\{|x| > c\\}$. Find $c$ for $\\alpha = 0.05$ and the power. Explain why the region is two-sided even though the alternative is a single distribution.',
              kind: 'problem',
              difficulty: 2,
              hint: '$c = 1.96$ and the power is $P(|Z| > 0.98) \\approx 0.327$.',
            },
          ],
          selfAssessment: [
            {
              question: 'State the Neyman-Pearson lemma.',
              answerOutline: 'For simple $H_0$ vs simple $H_1$, the test rejecting when $f_1/f_0 > k$ (randomising on equality) is most powerful among tests of no larger size, and $k$, $\\gamma$ can achieve any size $\\alpha$.',
            },
            {
              question: 'What is the key inequality in the proof?',
              answerOutline: '$(\\phi^* - \\phi)(f_1 - kf_0) \\ge 0$ pointwise; integrating gives power difference $\\ge k$ times size difference $\\ge 0$.',
            },
            {
              question: 'Why are randomised tests needed for discrete data?',
              answerOutline: 'The size of non-randomised tests jumps between attainable values; randomising on the boundary point reaches any $\\alpha$ exactly.',
            },
          ],
        },
        {
          slug: 'uniformly-most-powerful-tests',
          title: 'Uniformly most powerful tests',
          summary:
            'When a single test is most powerful against every alternative at once. Monotone likelihood ratio families and the Karlin-Rubin theorem give UMP one-sided tests; two-sided problems usually have none.',
          estimatedMinutes: 120,
          objectives: [
            'Define a uniformly most powerful test for composite hypotheses',
            'Define monotone likelihood ratio and verify it for one-parameter exponential families',
            'State and apply the Karlin-Rubin theorem for one-sided hypotheses',
            'Compute cutoffs, sizes and power functions of UMP tests for continuous and discrete families',
            'Show that no UMP test exists for a two-sided normal mean problem',
          ],
          concepts: [
            'Uniformly most powerful (UMP) test',
            'Monotone likelihood ratio (MLR)',
            'Karlin-Rubin theorem',
            'Monotone power function',
            'Size attained at the boundary of the null',
            'One-parameter exponential families with monotone $w(\\theta)$',
            'Non-existence of two-sided UMP tests',
          ],
          explanation: `A level-$\\alpha$ test $\\phi^*$ of $H_0: \\theta \\in \\Theta_0$ against $H_1: \\theta \\in \\Theta_1$ is **uniformly most powerful** if $E_\\theta\\phi^* \\ge E_\\theta\\phi$ for every $\\theta \\in \\Theta_1$ and every level-$\\alpha$ test $\\phi$. Usually no such test exists. One structure guarantees it in one-sided problems.

A family $f(x;\\theta)$ has a **monotone likelihood ratio** in a statistic $T(x)$ if, for every $\\theta_1 > \\theta_0$, the ratio $f(x;\\theta_1)/f(x;\\theta_0)$ is a nondecreasing function of $T(x)$ wherever both are not zero. One-parameter exponential families, $h(x)c(\\theta)e^{w(\\theta)T(x)}$, have MLR in $T$ whenever $w$ is nondecreasing. That covers the binomial, Poisson, exponential, normal mean (known variance) and normal variance (known mean). The uniform$(0, \\theta)$ has MLR in $X_{(n)}$.

**Karlin-Rubin theorem.** Suppose the family has MLR in $T$. For $H_0: \\theta \\le \\theta_0$ against $H_1: \\theta > \\theta_0$, the test
$$\\phi(x) = \\begin{cases} 1 & T > c,\\\\ \\gamma & T = c,\\\\ 0 & T < c,\\end{cases}$$
with $c$ and $\\gamma$ chosen so that $E_{\\theta_0}\\phi = \\alpha$, is UMP at level $\\alpha$. Its power function is nondecreasing in $\\theta$, so its size is attained at $\\theta_0$.

The idea of the proof: for any fixed $\\theta_1 > \\theta_0$, MLR makes the Neyman-Pearson test of $\\theta_0$ against $\\theta_1$ exactly this test, whatever $\\theta_1$ is. So one test is most powerful against all of them, and the monotone power function shows it has level $\\alpha$ over the whole null. Reversing the inequalities handles $H_1: \\theta < \\theta_0$.

**Worked example.** Defects per batch are Poisson($\\lambda$). From $n = 5$ batches, test $H_0: \\lambda \\le 2$ against $H_1: \\lambda > 2$ at level $0.05$. The Poisson is an exponential family with $w(\\lambda) = \\ln\\lambda$ increasing and $T = \\sum X_i$. By Karlin-Rubin, the UMP test rejects for large $T$. At the boundary, $T \\sim$ Poisson(10). The tail probabilities are
$$P(T \\ge 15) \\approx 0.0835,\\qquad P(T \\ge 16) \\approx 0.0487,$$
so the non-randomised UMP test at level $0.05$ rejects when $T \\ge 16$, with actual size $0.0487$. An exact-size test would also reject with probability $\\gamma = (0.05 - 0.0487)/P(T = 15) \\approx 0.036$ when $T = 15$. At $\\lambda = 3$, $T \\sim$ Poisson(15) and the power is $P(T \\ge 16) \\approx 0.432$. To have good power against $\\lambda = 3$, you need more batches.

**Two-sided problems.** For $N(\\mu, 1)$ data and $H_0: \\mu = 0$ against $H_1: \\mu \\ne 0$, the most powerful test against $\\mu = 1$ rejects for large $\\bar x$, and the one against $\\mu = -1$ rejects for small $\\bar x$. By the uniqueness part of the Neyman-Pearson lemma, these are different tests. No single test is most powerful against both, so no UMP test exists. The next lesson finds a way out by restricting the class of tests.

**Pitfall.** UMP tests concern a single parameter. With nuisance parameters, such as an unknown $\\sigma$ in a test about $\\mu$, Karlin-Rubin does not apply directly. The $t$ test is optimal only among a restricted class (the unbiased tests).`,
          resources: [
            siegrist('hypothesis/Likelihood', 'Likelihood Ratio Tests', 'Monotone likelihood ratio and uniformly most powerful tests.', true),
            siegrist('hypothesis/Normal', 'Tests in the Normal Model', 'One- and two-sided tests for normal means and variances.'),
            mit18655('Lecture notes on MLR families and the Karlin-Rubin theorem.'),
          ],
          exercises: [
            {
              slug: 'verify-mlr',
              title: 'Verify monotone likelihood ratio',
              prompt:
                'Show that each family has MLR in the stated statistic: (a) Binomial($n$, $p$) in $\\sum X_i$; (b) $N(0, \\sigma^2)$ in $\\sum X_i^2$; (c) uniform$(0, \\theta)$ in $X_{(n)}$, with care where densities vanish; (d) the Cauchy location family does not have MLR in $X$, by computing $f(x; 1)/f(x; 0)$ as $x \\to \\pm\\infty$.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'variance-ump',
              title: 'A UMP test for a variance',
              prompt:
                'For iid $N(0, \\sigma^2)$ data, find the UMP level-$\\alpha$ test of $H_0: \\sigma^2 \\le 1$ against $H_1: \\sigma^2 > 1$, with its cutoff in terms of $\\chi^2_n$. Write its power function, evaluate it at $\\sigma^2 = 1, 1.5, 2, 3$ for $n = 20$ and $\\alpha = 0.05$, and confirm by simulation.',
              kind: 'problem',
              difficulty: 2,
              hint: 'Reject when $\\sum X_i^2 > \\chi^2_{20, 0.95} \\approx 31.41$; the power at $\\sigma^2$ is $P(\\chi^2_{20} > 31.41/\\sigma^2)$.',
            },
            {
              slug: 'karlin-rubin-proof',
              title: 'Prove Karlin-Rubin',
              prompt:
                'Prove the Karlin-Rubin theorem for a continuous family with strict MLR, in two steps: (1) for any $\\theta_1 > \\theta_0$, the test is the Neyman-Pearson test of $\\theta_0$ against $\\theta_1$; (2) its power function is nondecreasing, so it has level $\\alpha$ over $\\theta \\le \\theta_0$. For step 2, apply the Neyman-Pearson lemma to a pair $\\theta\' < \\theta\'\'$ and compare with the trivial test $\\phi \\equiv E_{\\theta\'}\\phi^*$.',
              kind: 'derivation',
              difficulty: 3,
            },
            {
              slug: 'sample-size-for-power',
              title: 'How many batches?',
              prompt:
                'In the worked example, find the smallest number of batches $n$ for which the non-randomised UMP level-0.05 test of $H_0: \\lambda \\le 2$ has power at least $0.8$ at $\\lambda = 3$. Search over $n$ with scipy.stats.poisson, and compare with the normal-approximation answer $n \\approx \\left(\\frac{1.645\\sqrt2 + 0.842\\sqrt3}{3 - 2}\\right)^2$.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Define monotone likelihood ratio.',
              answerOutline: 'For $\\theta_1 > \\theta_0$, $f(x;\\theta_1)/f(x;\\theta_0)$ is nondecreasing in $T(x)$.',
            },
            {
              question: 'State the Karlin-Rubin theorem.',
              answerOutline: 'Under MLR in $T$, the test rejecting for $T > c$ (randomising at $c$) with size $\\alpha$ at $\\theta_0$ is UMP for $\\theta \\le \\theta_0$ vs $\\theta > \\theta_0$.',
            },
            {
              question: 'Why is there no UMP test of $\\mu = 0$ against $\\mu \\ne 0$ for normal data?',
              answerOutline: 'The most powerful tests against $\\mu > 0$ and $\\mu < 0$ reject in opposite tails and are unique, so no single test is best against both.',
            },
          ],
        },
        {
          slug: 'unbiased-tests',
          title: 'Unbiased tests for two-sided problems',
          summary:
            'A test is unbiased when it rejects at least as often under any alternative as under the null. Restricting to unbiased tests rules out one-sided tests for two-sided problems and makes the equal-tailed z and t tests optimal.',
          estimatedMinutes: 100,
          objectives: [
            'Define an unbiased test and check unbiasedness from a power function',
            'Show that a one-sided test is biased for a two-sided alternative',
            'State the result that the two-sided $z$ and $t$ tests are uniformly most powerful unbiased',
            'Explain the derivative condition for unbiasedness at a simple null',
            'Compute power functions of two-sided tests',
          ],
          concepts: [
            'Unbiased test',
            'Uniformly most powerful unbiased (UMPU) test',
            'Power function minimised at the null',
            'Equal-tailed two-sided tests',
            'Derivative condition $\\beta\'(\\theta_0) = 0$',
            'Unbiasedness of the two-sided $t$ test',
          ],
          explanation: `A level-$\\alpha$ test is **unbiased** if its power is at least $\\alpha$ at every alternative: $\\beta(\\theta) \\ge \\alpha$ for all $\\theta \\in \\Theta_1$. A biased test is less likely to reject when $H_0$ is false at some $\\theta$ than when $H_0$ is true, which is a strange property for a test to have. A **UMPU** test is uniformly most powerful among unbiased level-$\\alpha$ tests.

For a simple null $\\theta = \\theta_0$ inside an interval of $\\theta$ values with a smooth power function, unbiasedness forces $\\beta$ to have a minimum at $\\theta_0$. So $\\beta(\\theta_0) = \\alpha$ and $\\beta'(\\theta_0) = 0$. In a one-parameter exponential family, the UMPU test of $\\theta = \\theta_0$ against $\\theta \\ne \\theta_0$ rejects when $T < c_1$ or $T > c_2$. The cutoffs are fixed by those two conditions. For a symmetric null distribution, as with the normal mean, that means equal tails. For skewed families, such as the chi-square test of a normal variance, the UMPU cutoffs are not the equal-tailed ones. The equal-tailed variance test is slightly biased, a fine point you can check numerically.

**Results to know.** These are stated here without proof; they come from the theory of exponential families with nuisance parameters.
- For $N(\\mu, \\sigma^2)$ with $\\sigma$ known, the two-sided $z$ test is UMPU for $\\mu = \\mu_0$ against $\\mu \\ne \\mu_0$.
- With $\\sigma$ unknown, the two-sided $t$ test is UMPU, and the one-sided $t$ test is UMPU for one-sided alternatives.

**Worked example.** Return to the Module 1 fill weights: $n = 25$, $\\sigma = 4$, so the standard error is $0.8$, and $\\mu_0 = 50$. Let $d = (\\mu - 50)/0.8$. The two-sided level-0.05 test rejects when $|z| > 1.96$, with power
$$\\beta_2(\\mu) = P(Z > 1.96 - d) + P(Z < -1.96 - d).$$
The one-sided test rejects when $z > 1.645$, with power $\\beta_1(\\mu) = P(Z > 1.645 - d)$. Evaluating both:

| $\\mu$ | 48 | 49 | 50 | 51 | 52 |
|---|---|---|---|---|---|
| two-sided | 0.705 | 0.240 | 0.050 | 0.240 | 0.705 |
| one-sided | 0.000 | 0.002 | 0.050 | 0.346 | 0.804 |

The two-sided power function is symmetric with its minimum $0.05$ at $\\mu = 50$, so the test is unbiased. The one-sided test has more power for $\\mu > 50$, as the UMP one-sided test must, but its power drops to nearly $0$ for $\\mu < 50$, far below $\\alpha$. For the two-sided problem it is biased. Among unbiased tests, the two-sided $z$ test wins at every alternative. This is the theoretical reason for using the equal-tailed two-sided test when departures in either direction matter.

**Simulation check.** Estimate both power functions by simulating $10^5$ samples at each $\\mu$, and overlay the exact curves. The agreement should be within about $0.003$.

**Pitfall.** Unbiasedness is a property of the power function over the whole alternative. A test can have the right size and still be biased. Plot the power function before claiming optimality.`,
          resources: [
            siegrist('hypothesis/Normal', 'Tests in the Normal Model', 'Power functions of one- and two-sided $z$ and $t$ tests, with applets.', true),
            mit18655('The lectures on unbiased tests state and prove the UMPU results for exponential families.'),
            wasserman('Notes on the power function and choosing between tests.'),
          ],
          exercises: [
            {
              slug: 'power-table',
              title: 'Reproduce the power table',
              prompt:
                'Reproduce the power table of the worked example exactly, then by simulation with $10^5$ samples per $\\mu$. Extend it to a plot for $\\mu \\in [47, 53]$, and mark the region where the one-sided test is more powerful than the two-sided one.',
              kind: 'simulation',
              difficulty: 1,
            },
            {
              slug: 'biased-variance-test',
              title: 'Is the equal-tailed variance test unbiased?',
              prompt:
                'For iid $N(\\mu, \\sigma^2)$ with $n = 5$, the equal-tailed level-0.05 test of $\\sigma^2 = 1$ rejects when $(n-1)S^2$ is outside $(\\chi^2_{4, 0.025}, \\chi^2_{4, 0.975})$. Compute its power function for $\\sigma^2$ near $1$, and show that its minimum lies at some $\\sigma^2 \\ne 1$ with value slightly below $0.05$, so the test is biased. Find, numerically, cutoffs $c_1, c_2$ that give size $0.05$ and $\\beta\'(1) = 0$.',
              kind: 'coding',
              difficulty: 3,
              hint: 'Write $\\beta(\\sigma^2) = F(c_1/\\sigma^2) + 1 - F(c_2/\\sigma^2)$ with $F$ the $\\chi^2_4$ CDF, and differentiate in $\\sigma^2$.',
            },
            {
              slug: 'unbiased-derivative',
              title: 'The derivative condition',
              prompt:
                'Show that if the power function of a level-$\\alpha$ test of $\\theta = \\theta_0$ is differentiable and the test is unbiased, then $\\beta\'(\\theta_0) = 0$. For the normal mean with known variance, show that among tests of the form "reject if $\\bar x < c_1$ or $\\bar x > c_2$", the conditions $\\beta(\\mu_0) = \\alpha$ and $\\beta\'(\\mu_0) = 0$ force $c_1$ and $c_2$ to be symmetric about $\\mu_0$.',
              kind: 'derivation',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Define an unbiased test.',
              answerOutline: 'A level-$\\alpha$ test whose power is at least $\\alpha$ at every parameter value in the alternative.',
            },
            {
              question: 'Why is the one-sided $z$ test biased for a two-sided alternative?',
              answerOutline: 'Its power falls below $\\alpha$ for $\\mu$ on the other side of $\\mu_0$ (approaching $0$).',
            },
            {
              question: 'Which classical tests are UMPU?',
              answerOutline: 'The two-sided $z$ test (known $\\sigma$) and the one- and two-sided $t$ tests for a normal mean with unknown $\\sigma$.',
            },
          ],
        },
        {
          slug: 'likelihood-ratio-tests',
          title: 'Likelihood ratio tests and Wilks\' theorem',
          summary:
            'The generalised likelihood ratio test works for any nested hypotheses. Derive the $t$ test as one, state Wilks\' theorem with its conditions, and see how it fails when the null value is on a boundary.',
          estimatedMinutes: 130,
          objectives: [
            'Define the generalised likelihood ratio statistic for nested hypotheses',
            'Show that the one-sample $t$ test is a likelihood ratio test',
            'State Wilks\' theorem with its regularity conditions and degrees of freedom',
            'Compute and calibrate LR tests for Poisson and exponential models',
            'Recognise when Wilks\' theorem fails, and check the null distribution by simulation',
          ],
          concepts: [
            'Generalised likelihood ratio $\\Lambda$',
            'Nested hypotheses',
            'Deviance $-2\\ln\\Lambda$',
            'Wilks\' theorem',
            'Degrees of freedom $= \\dim\\Theta - \\dim\\Theta_0$',
            'Boundary problems',
            'Wald, score and LR tests as asymptotically equivalent',
          ],
          explanation: `For $H_0: \\theta \\in \\Theta_0$ against $H_1: \\theta \\in \\Theta \\setminus \\Theta_0$, the **likelihood ratio statistic** is
$$\\Lambda = \\frac{\\sup_{\\theta \\in \\Theta_0}L(\\theta)}{\\sup_{\\theta \\in \\Theta}L(\\theta)} = \\frac{L(\\hat\\theta_0)}{L(\\hat\\theta)} \\in [0, 1],$$
where $\\hat\\theta_0$ is the MLE under the null and $\\hat\\theta$ the unrestricted MLE. Reject when $\\Lambda$ is small, or equivalently when the deviance $-2\\ln\\Lambda$ is large. For a simple null against a simple alternative this reduces to the Neyman-Pearson test. In general it is not guaranteed to be optimal, but it is the default because it always exists and is usually good.

**The $t$ test is an LR test.** For $N(\\mu, \\sigma^2)$ with both unknown and $H_0: \\mu = \\mu_0$, the unrestricted MLEs are $\\bar x$ and $\\hat\\sigma^2 = \\frac1n\\sum(x_i - \\bar x)^2$. Under $H_0$, $\\hat\\sigma_0^2 = \\frac1n\\sum(x_i - \\mu_0)^2$. At an MLE of $\\sigma^2$ the exponent of the normal likelihood is always $-n/2$, so $\\Lambda = (\\hat\\sigma^2/\\hat\\sigma_0^2)^{n/2}$. The identity $\\sum(x_i - \\mu_0)^2 = \\sum(x_i - \\bar x)^2 + n(\\bar x - \\mu_0)^2$ then gives
$$\\Lambda = \\left(1 + \\frac{t^2}{n-1}\\right)^{-n/2},\\qquad t = \\frac{\\bar x - \\mu_0}{s/\\sqrt n}.$$
Small $\\Lambda$ is the same as large $|t|$, so the LR test is exactly the two-sided $t$ test, with its exact $t_{n-1}$ calibration.

**Wilks' theorem.** Suppose the conditions of the MLE asymptotic-normality theorem hold. Suppose also that $\\Theta_0$ is a smooth $(k - r)$-dimensional subset of a $k$-dimensional $\\Theta$, and that the true value lies in the interior of both $\\Theta_0$ and $\\Theta$. Then under $H_0$,
$$-2\\ln\\Lambda \\to \\chi^2_r\\ \\text{in distribution},$$
with $r$ the number of independent constraints imposed by $H_0$. The proof is a second-order Taylor expansion of $\\ell$ about $\\hat\\theta$. The Wald and score tests have the same $\\chi^2_r$ limit and are asymptotically equivalent to the LR test, although they can differ noticeably in small samples.

**Worked example: a Poisson rate.** Ten unit intervals give total count $T = 28$. Test $H_0: \\lambda = 2$. Here $\\hat\\lambda = 2.8$, and
$$-2\\ln\\Lambda = 2\\left[T\\ln\\frac{\\hat\\lambda}{\\lambda_0} - n(\\hat\\lambda - \\lambda_0)\\right] = 2\\left[28\\ln 1.4 - 8\\right] = 2(9.421 - 8) \\approx 2.84.$$
With $r = 1$, the p-value is $P(\\chi^2_1 > 2.84) \\approx 0.092$. Do not reject at 5%. Since $T \\sim$ Poisson(20) under $H_0$, you can compute the exact null distribution of $-2\\ln\\Lambda$ too, and compare it with $\\chi^2_1$.

**When Wilks fails.** If the null value is on the boundary of $\\Theta$, the limit changes. Testing a variance component $\\tau^2 = 0$ with $\\tau^2 \\ge 0$, or the mean of $N(\\theta, 1)$ with $\\theta \\ge 0$ at $\\theta = 0$, gives the mixture $\\tfrac12\\chi^2_0 + \\tfrac12\\chi^2_1$. Using $\\chi^2_1$ there gives a conservative test. Non-identifiable parameters under $H_0$, as in testing the number of mixture components, break the theorem completely.

**Pitfall.** Count $r$ as the difference in the number of free parameters, not the number of parameters mentioned in $H_0$. Simulate the null distribution whenever you are unsure that the conditions hold.`,
          resources: [
            statlect('fundamentals-of-statistics/likelihood-ratio-test', 'Likelihood ratio test', 'The LR statistic, its asymptotic distribution and examples.'),
            siegrist('hypothesis/Likelihood', 'Likelihood Ratio Tests', 'Generalised likelihood ratio tests in the standard families.', true),
            statlect('fundamentals-of-statistics/Wald-test', 'Wald test', 'The Wald test, asymptotically equivalent to the LR and score tests.'),
          ],
          exercises: [
            {
              slug: 't-as-lrt',
              title: 'Derive the t test as an LR test',
              prompt:
                'Fill in every step of the derivation $\\Lambda = (1 + t^2/(n-1))^{-n/2}$ for the normal mean with unknown variance. Then show that $-2\\ln\\Lambda = n\\ln(1 + t^2/(n-1))$ tends to $\\chi^2_1$ under $H_0$, using $t^2 \\to \\chi^2_1$ and a Taylor expansion of the logarithm.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'two-exponential-means',
              title: 'Comparing two exponential means',
              prompt:
                'Independent samples of sizes $m$ and $n$ come from exponentials with means $\\theta_1$ and $\\theta_2$. Derive the LR statistic for $H_0: \\theta_1 = \\theta_2$, and show that it depends on the data only through $\\bar X/\\bar Y$. Use the fact that $\\bar X/\\bar Y \\sim F_{2m, 2n}$ under $H_0$ to give an exact test. For $m = n = 15$, compare the exact size of the test that rejects when $-2\\ln\\Lambda > 3.841$ with $0.05$, by simulation.',
              kind: 'derivation',
              difficulty: 3,
            },
            {
              slug: 'wilks-check',
              title: 'Check Wilks by simulation',
              prompt:
                'For the Poisson example ($n = 10$, $\\lambda_0 = 2$), simulate $10^5$ datasets under $H_0$, compute $-2\\ln\\Lambda$ for each, and compare its distribution with $\\chi^2_1$ in a Q-Q plot. Report the actual rejection rate of the nominal 5% test. Repeat with $n = 2$, and explain the discreteness you see.',
              kind: 'simulation',
              difficulty: 2,
            },
            {
              slug: 'boundary-lrt',
              title: 'A boundary null',
              prompt:
                'For iid $N(\\theta, 1)$ with $\\theta \\ge 0$, derive $-2\\ln\\Lambda$ for $H_0: \\theta = 0$, and show that it equals $n\\bar X^2$ when $\\bar X > 0$ and $0$ otherwise. Deduce that its null distribution is $\\tfrac12\\chi^2_0 + \\tfrac12\\chi^2_1$. Find the correct 5% critical value, and compare with $3.841$.',
              kind: 'derivation',
              difficulty: 2,
              hint: 'The correct critical value is the 90th percentile of $\\chi^2_1$, about $2.706$.',
            },
          ],
          selfAssessment: [
            {
              question: 'Define the generalised likelihood ratio statistic.',
              answerOutline: '$\\Lambda = \\sup_{\\Theta_0}L / \\sup_\\Theta L$; reject for small $\\Lambda$.',
            },
            {
              question: 'State Wilks\' theorem with its key conditions.',
              answerOutline: 'Under MLE regularity, nested smooth hypotheses, and the true value interior to $\\Theta_0$ and $\\Theta$: $-2\\ln\\Lambda \\to \\chi^2_r$ with $r = \\dim\\Theta - \\dim\\Theta_0$.',
            },
            {
              question: 'What happens to the LR test when the null value lies on the boundary?',
              answerOutline: 'The limit becomes a mixture such as $\\tfrac12\\chi^2_0 + \\tfrac12\\chi^2_1$; using $\\chi^2_1$ is conservative.',
            },
          ],
        },
        {
          slug: 'chi-square-tests',
          relatedLessons: ['probability-statistics/hypothesis-testing-and-regression/chi-square-and-goodness-of-fit'],
          title: 'Chi-square tests for counts',
          summary:
            'Pearson\'s goodness-of-fit and independence tests for categorical data: the statistic, its degrees of freedom when parameters are estimated, the conditions for the approximation, and the link to the likelihood ratio.',
          estimatedMinutes: 120,
          objectives: [
            'Compute Pearson\'s statistic for a goodness-of-fit test and its p-value',
            'Count degrees of freedom when parameters are estimated from the data',
            'Test independence in a contingency table',
            'State the conditions for the chi-square approximation and what to do when they fail',
            'Relate Pearson\'s statistic to the multinomial likelihood ratio statistic $G^2$',
          ],
          concepts: [
            'Multinomial model',
            'Pearson statistic $\\sum(O - E)^2/E$',
            'Goodness of fit',
            'Degrees of freedom $k - 1 - p$',
            'Contingency tables and independence',
            'Degrees of freedom $(r-1)(c-1)$',
            'Expected-count conditions',
            'Likelihood ratio statistic $G^2$',
          ],
          explanation: `Suppose $n$ independent observations each fall into one of $k$ categories with probabilities $p_1, \\dots, p_k$. The counts $O_1, \\dots, O_k$ are then multinomial. To test $H_0: p_i = \\pi_i$, compare the counts with their expected values $E_i = n\\pi_i$ using **Pearson's statistic**
$$X^2 = \\sum_{i=1}^k\\frac{(O_i - E_i)^2}{E_i}.$$
Under $H_0$, $X^2 \\to \\chi^2_{k-1}$ in distribution as $n \\to \\infty$. One degree of freedom is lost because the counts must sum to $n$. The multinomial LR statistic $G^2 = 2\\sum O_i\\ln(O_i/E_i)$ has the same limit, and a Taylor expansion shows $X^2$ and $G^2$ are asymptotically equivalent. Wilks' theorem gives the degrees of freedom: $k - 1$ free parameters under the alternative and none under the null.

**Estimated parameters.** If $H_0$ specifies the $\\pi_i$ only up to $p$ unknown parameters, estimate them by maximum likelihood from the multinomial counts, using the same grouped data. Then $X^2 \\to \\chi^2_{k-1-p}$. If you estimate them from the ungrouped data instead, which is common and convenient, the limit lies between $\\chi^2_{k-1-p}$ and $\\chi^2_{k-1}$, so $k - 1 - p$ degrees of freedom gives a slightly liberal test. **Independence** in an $r \\times c$ table is the special case $p_{ij} = p_{i\\cdot}p_{\\cdot j}$, with $E_{ij} = (\\text{row total})(\\text{column total})/n$ and $(r - 1)(c - 1)$ degrees of freedom.

**Conditions.** The approximation is asymptotic. A common rule asks for every $E_i \\ge 5$. More permissive rules allow a few cells down to about $1$. When the condition fails, merge adjacent categories before testing, or compute an exact or simulated p-value.

**Worked example.** A die is rolled $120$ times, with counts $25, 17, 15, 23, 24, 16$ for faces $1$ to $6$. Under fairness each $E_i = 20$, so
$$X^2 = \\frac{25 + 9 + 25 + 9 + 16 + 16}{20} = \\frac{100}{20} = 5.0,$$
on $5$ degrees of freedom. The p-value is $P(\\chi^2_5 > 5.0) \\approx 0.42$, and the data are entirely consistent with a fair die. Note that $E[\\chi^2_5] = 5$: an $X^2$ near its degrees of freedom is typical under $H_0$. A simulation of $10^5$ fair-die experiments, each giving an $X^2$, reproduces the p-value to two decimal places, which confirms the chi-square approximation at this sample size.

**With an estimated parameter.** A count of events in $100$ intervals gives frequencies $30, 38, 20, 9, 3$ for $0, 1, 2, 3, 4$ events, with the three counts in the last cell all exactly $4$. The Poisson MLE is $\\hat\\lambda = 117/100 = 1.17$. The expected count for "$4$ or more" is only $3.12$, so merge it with "3", giving $O = (30, 38, 20, 12)$ and $E \\approx (31.04, 36.31, 21.24, 11.41)$. Then $X^2 \\approx 0.22$ on $4 - 1 - 1 = 2$ degrees of freedom, for a p-value of about $0.90$. The Poisson model fits well.

**Pitfall.** Chi-square tests need independent observations and counts, not percentages or measurements. A large sample makes trivial departures significant, so report the size of the departure as well as the p-value.`,
          resources: [
            siegrist('hypothesis/ChiSquare', 'Chi-Square Tests', 'Goodness-of-fit and independence tests, with simulation applets.', true),
            {
              title: 'NIST/SEMATECH e-Handbook of Statistical Methods',
              url: 'https://www.itl.nist.gov/div898/handbook/',
              type: 'textbook',
              cost: 'free',
              provider: 'NIST',
              note: 'Search the handbook for its chi-square goodness-of-fit section for practical guidance on binning and expected counts.',
            },
            scipyStats('scipy.stats.chisquare and chi2_contingency (use correction=False to match the formulas here).'),
          ],
          exercises: [
            {
              slug: 'contingency-table',
              title: 'Treatment and outcome',
              prompt:
                'Patients on treatments A and B are classified as improved, unchanged or worse: A gives $30, 15, 5$ and B gives $20, 20, 10$. Compute the expected counts under independence, Pearson\'s $X^2$, the degrees of freedom and the p-value by hand. Confirm with scipy.stats.chi2_contingency(table, correction=False), and compute $G^2$ as well.',
              kind: 'problem',
              difficulty: 1,
              hint: 'Expected counts are $25, 17.5, 7.5$ in each row; $X^2 \\approx 4.38$ on $2$ degrees of freedom, with p-value about $0.11$.',
            },
            {
              slug: 'poisson-gof',
              title: 'A Poisson goodness-of-fit test',
              prompt:
                'Reproduce the Poisson goodness-of-fit calculation of the worked example, including the merging of cells. Then repeat it with a geometric model on $\\{0, 1, 2, \\dots\\}$ fitted by maximum likelihood. Which model do the data support?',
              kind: 'problem',
              difficulty: 2,
              hint: 'For the geometric with $P(X = k) = (1 - q)q^k$, the MLE is $\\hat q = \\bar x/(1 + \\bar x)$.',
            },
            {
              slug: 'pearson-vs-g2',
              title: 'Pearson against the likelihood ratio',
              prompt:
                'Show by a second-order Taylor expansion of $O\\ln(O/E)$ about $O = E$ that $G^2 = X^2 + o_p(1)$ under $H_0$. Then simulate the null distributions of $X^2$ and $G^2$ for a fair six-sided die with $n = 30$ and $n = 300$ rolls, and compare their actual 5% rejection rates.',
              kind: 'derivation',
              difficulty: 3,
            },
            {
              slug: 'df-with-estimation',
              title: 'Degrees of freedom when estimating',
              prompt:
                'By simulation, check the claim about degrees of freedom. Generate $10^4$ samples of size $200$ from $N(0, 1)$, bin each into $8$ equal-probability bins under the fitted normal, using $\\bar x$ and $s$ estimated from the raw data. Compare the null distribution of $X^2$ with $\\chi^2_7$ and $\\chi^2_5$. Which is closer, and what does that mean for the test\'s size?',
              kind: 'simulation',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'Write Pearson\'s statistic and its degrees of freedom with $p$ estimated parameters.',
              answerOutline: '$X^2 = \\sum(O_i - E_i)^2/E_i$, approximately $\\chi^2_{k-1-p}$ when the parameters are MLEs from the grouped counts.',
            },
            {
              question: 'What are the degrees of freedom for independence in an $r \\times c$ table?',
              answerOutline: '$(r-1)(c-1)$.',
            },
            {
              question: 'What do you do when some expected counts are small?',
              answerOutline: 'Merge adjacent categories, or compute an exact or Monte Carlo p-value; the chi-square approximation needs expected counts that are not too small (commonly at least 5).',
            },
          ],
        },
      ],
      project: {
        slug: 'power-study',
        title: 'A power study of competing tests',
        description: `Compare tests the way a methods paper does: by their size and power functions, estimated by simulation and checked against theory where it exists. Choose one testing problem from the list below, or propose your own of similar scope.

1. A normal mean with unknown variance: the $t$ test, the sign test and the Wilcoxon signed-rank test, under normal, $t_3$ and skewed data.
2. A Poisson rate: the exact UMP test, the Wald, score and LR tests.
3. Equality of two variances: the $F$ test and Levene's test, under normal and heavy-tailed data.`,
        deliverables: [
          'A precise statement of the hypotheses, the tests compared, and the theory that predicts their behaviour (UMP, UMPU or asymptotic)',
          'Exact size and power curves wherever they can be computed, overlaid on simulated curves with Monte Carlo error bands',
          'A table of actual sizes at nominal 5% for at least three sample sizes and two data-generating distributions',
          'A discussion of which test you would recommend in which situation, tied to the theorems of this module',
          'Clean, seeded, reproducible code',
        ],
        estimatedHours: 10,
        stretchGoals: [
          'Add a randomised version of a discrete test and show that its size is exactly nominal',
          'Estimate the sample size each test needs for 80% power at a chosen alternative',
        ],
      },
    },
  ],
  capstone: {
    slug: 'complete-parametric-analysis',
    title: 'A complete parametric analysis, derived and verified',
    description: `Take one real dataset and carry out a complete parametric analysis, in which every formula you use is derived in your report and every distributional claim is checked by simulation. The dataset should be of a kind the course covers: counts, lifetimes or other positive measurements, proportions, or measurements that may be normal. Use at least $50$ observations, and preferably data you have collected yourself or from a documented public source.

The analysis has the shape of a short statistics paper. First propose a model and justify it. Then find sufficient statistics, estimate by maximum likelihood, and compare with the best unbiased estimator where one exists. Quantify uncertainty with more than one kind of interval. Test a substantive hypothesis with an appropriate test. Finally, check the model and the procedures by simulation from the fitted model.`,
    deliverables: [
      'A description of the data and its source, and a candidate model justified by plots and by the data-generating process',
      'Derivations of the likelihood, sufficient statistics, MLE, Fisher information and, where they exist, the UMVUE and the Cramér-Rao bound for the parameters of interest',
      'Point estimates with standard errors, and at least three 95% intervals for the main parameter (Wald, likelihood ratio, and exact or score), with a simulation of their coverage under the fitted model',
      'A test of a substantive hypothesis using a UMP, UMPU or likelihood ratio test as appropriate, with its power function estimated at plausible alternatives',
      'A goodness-of-fit assessment with a chi-square test and Q-Q plots, and a sensitivity analysis under at least one alternative model',
      'A report of at most twelve pages with all code, seeded and reproducible, in an appendix or repository',
    ],
    estimatedHours: 25,
    stretchGoals: [
      'Add a parametric bootstrap and compare its intervals with the asymptotic ones',
      'Repeat the main analysis in a Bayesian framework with a conjugate prior, and compare the posterior interval with the frequentist intervals',
      'Study how the conclusions change if the independence assumption is violated, by simulating correlated data',
    ],
  },
  masteryChecklist: [
    'I can compute bias, variance, MSE, coverage and power both by derivation and by simulation, with Monte Carlo standard errors',
    'I can use moment-generating functions and their uniqueness theorem, stating when an MGF exists',
    'I can find distributions of transformations with the CDF method and Jacobians, including many-to-one maps and order statistics',
    'I can state and prove the theorem on the sample mean and variance of a normal sample, and derive the chi-square, $t$ and $F$ results that follow',
    'I can apply the law of large numbers, the CLT, Slutsky\'s theorem, continuous mapping and the delta method, with their hypotheses',
    'I can find sufficient and complete statistics and use Rao-Blackwell and Lehmann-Scheffé to construct UMVUEs',
    'I can compute Fisher information, state the Cramér-Rao bound with its regularity conditions, and explain when it fails',
    'I can find MLEs analytically and numerically and state the conditions for their asymptotic normality',
    'I can build exact, Wald, score and likelihood-ratio intervals and judge their coverage',
    'I can derive most powerful, UMP, unbiased and likelihood ratio tests, and apply chi-square tests with correct degrees of freedom',
  ],
});
