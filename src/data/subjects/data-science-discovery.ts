import { defineSubject } from '../define';
import type { ResourceInput } from '../types';

/** A page of the free DISCOVERY course site, the primary resource for most lessons. */
const discovery = (title: string, path: string, note: string): ResourceInput => ({
  title,
  url: `https://discovery.cs.illinois.edu/learn/${path}/`,
  type: 'interactive',
  cost: 'free',
  provider: 'University of Illinois, DISCOVERY',
  note,
  primary: true,
});

const openIntro: ResourceInput = {
  title: 'OpenIntro Statistics',
  url: 'https://www.openintro.org/book/os/',
  type: 'textbook',
  cost: 'free',
  provider: 'OpenIntro',
  note: 'Free PDF (pay what you like for print). The chapter named in each lesson is a second explanation with practice problems.',
};

const inferential = (note: string): ResourceInput => ({
  title: 'Computational and Inferential Thinking',
  url: 'https://inferentialthinking.com/chapters/intro.html',
  type: 'textbook',
  cost: 'free',
  provider: 'UC Berkeley Data 8',
  note,
});

export default defineSubject({
  id: 'data-science-discovery',
  title: 'Data Science Discovery',
  category: 'data-science',
  tagline:
    'Your first data science course: no programming assumed, real datasets from the first week, and every idea tried in Python.',
  description: `This course is where data science starts if you have never programmed. You will open a real dataset in your first lesson and work with real data in every lesson after it, learning only the Python you need at each step. By the end you can load and question a table of data, tell an experiment from an observational study, summarise and plot what you find, simulate chance, reason with probability, fit a first predictive model, and explain what a poll's margin of error does and does not promise.

It follows the topics of **STAT/CS/IS 107, Data Science Discovery** at the University of Illinois Urbana-Champaign, based on the public catalog description. The course here is original: the lessons, exercises and projects were written for this site, and it is not affiliated with or endorsed by Illinois. The University's free [DISCOVERY](https://discovery.cs.illinois.edu/) site is an excellent companion and is linked from most lessons as the primary reading.

Short reflections on privacy and on the design of graphics and studies run through the course, because a correct number can still mislead or harm someone. The two machine problems and final project use real data: a famous class-size experiment, fifty years of rain in Champaign, and an audit of more than 17,000 election polls.

This course stops at the idea of inference. It does not teach multiple regression, Git or formal estimation. Data Science Exploration takes those up next, Programming Fundamentals goes deeper on Python, and Probability and Statistics for Scientists gives the mathematics behind what you try here.`,
  difficulty: 'beginner',
  estimatedHours: 70,
  prerequisites: [],
  recommendedBackground: [
    'High-school algebra: you can read a formula and work with percentages',
    'A Windows, macOS or Linux computer on which you can install software',
    'No programming experience is needed',
  ],
  tags: ['data science', 'python', 'pandas', 'statistics', 'beginner', 'illinois'],
  core: false,
  modules: [
    {
      slug: 'dataframes-and-python-basics',
      title: 'DataFrames and Python Basics',
      description:
        'What data science is, how to run a notebook, and how to load a table of data and ask it questions, with just enough Python to do so.',
      lessons: [
        {
          slug: 'what-is-data-science',
          title: 'What data science is, and your first notebook',
          summary:
            'Data science turns a question and some data into a defensible answer. You install the tools and run your first notebook.',
          estimatedMinutes: 90,
          objectives: [
            'Describe the data science cycle from question to communicated answer',
            'Install Python and VS Code and open a Jupyter notebook',
            'Run code and Markdown cells, and restart a notebook cleanly',
            'Name one privacy risk in a dataset about people',
          ],
          concepts: [
            'The data science cycle: question, data, analysis, communication',
            'Python, the language',
            'VS Code, the editor',
            'Jupyter notebook: code and text in cells',
            'Kernel: the running Python behind a notebook',
            'Virtual environment: a private folder of packages',
            'Run All as a test of a notebook',
          ],
          explanation: `Data science is the practice of using data to answer a question well enough that someone could act on it. The work follows a cycle. You start with a **question**, find or collect **data**, **analyse** it, and **communicate** the result, then usually go round again because the data raised a better question. Programming is only one part of that. Judgement about what the data can and cannot show is at least as important, and this course teaches both from the first week.

You will work in a **notebook**, a document made of cells. A code cell runs Python and shows the result underneath it. A Markdown cell holds your written explanation. The result reads like a report that can re-run itself.

**Set up once.** Install VS Code from code.visualstudio.com. Install Python 3.13 from python.org: open the Windows downloads page, find the newest 3.13 release that lists a *Windows installer (64-bit)*, and on the installer's first screen tick *Add python.exe to PATH*. In VS Code open the Extensions panel (Ctrl+Shift+X) and install *Python* and *Jupyter*, both from Microsoft. Make a folder for the course, choose File > Open Folder, then Terminal > New Terminal, and run:

\`\`\`text
python -m venv .venv
.venv\\Scripts\\python -m pip install pandas matplotlib ipykernel nbconvert
\`\`\`

Press Ctrl+Shift+P, run *Create: New Jupyter Notebook*, click *Select Kernel* at the top right, and choose *.venv*.

**Pitfall.** Cells remember what ran before, in whatever order you ran them, so a notebook can look fine and still be broken. Before you trust one, use *Restart*, then *Run All*.

**Privacy.** Before you open any dataset about people, ask who is in it and whether they agreed to this use. Even a table without names can identify someone.

Read DISCOVERY's opening page, then the VS Code notebook guide up to running cells.`,
          resources: [
            discovery('What is Data Science?', 'Basics-of-Data-Science-with-Python/What-is-Data-Science', 'The course map and a working definition. Read it before you install anything.'),
            { title: 'Jupyter Notebooks in VS Code', url: 'https://code.visualstudio.com/docs/datascience/jupyter-notebooks', type: 'documentation', cost: 'free', provider: 'Microsoft', note: 'Creating a notebook, selecting a kernel, running cells.' },
            { title: 'Python Releases for Windows', url: 'https://www.python.org/downloads/windows/', type: 'tool', cost: 'free', provider: 'Python Software Foundation', note: 'Choose a 3.13 release with a Windows installer so your results match this course.' },
          ],
          exercises: [
            {
              slug: 'first-notebook',
              title: 'Hello, notebook',
              prompt:
                "Create `hello.ipynb` using the `.venv` kernel. In a code cell compute `365 * 24`. Add a Markdown cell with a heading and one sentence saying what the number means. In a third cell run `import pandas as pd` and `pd.__version__`. Restart, choose Run All, and confirm every cell runs and the first answer is 8760.",
              kind: 'coding',
              difficulty: 1,
              hint: 'If `import pandas` fails, the notebook is using the wrong kernel. Click the kernel name at the top right and choose `.venv`.',
            },
            {
              slug: 'order-trap',
              title: 'Break a notebook on purpose',
              prompt:
                'In one cell write `x = 5` and in the next `print(x * 2)`. Run them. Now change the first cell to `y = 5` and run only that cell, then run the second again. It still prints 10. Explain in two sentences why, then use Restart and Run All and record the error you get. This is the reason you always finish with Run All.',
              kind: 'coding',
              difficulty: 1,
            },
            {
              slug: 'cycle-on-a-news-story',
              title: 'Find the cycle in a news story',
              prompt:
                'Pick a recent news article that quotes a statistic. Write down its question, where the data came from, what analysis was done and how it was communicated. Name one thing the article does not tell you that you would need to trust the number, and one privacy concern if the data is about people.',
              kind: 'writing',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            { question: 'What are the four stages of the data science cycle, and why is it a cycle?', answerOutline: 'Question, data, analysis, communication. Results usually raise a better question, so you go round again.' },
            { question: 'Why can a notebook look correct and still be broken?', answerOutline: 'Cells keep state from whatever ran earlier, in any order. Only Restart and Run All proves it works from the top.' },
            { question: 'What does a kernel do?', answerOutline: 'It is the running Python process that executes the cells and holds their variables. Choosing `.venv` means it can see the packages you installed there.' },
          ],
          relatedLessons: ['programming-fundamentals/getting-started/setup-and-the-repl'],
        },
        {
          slug: 'values-and-dataframes',
          title: 'Python values and your first DataFrame',
          summary:
            'Variables, numbers and strings, then pandas: load a CSV into a DataFrame and look at its rows, columns and shape.',
          estimatedMinutes: 90,
          objectives: [
            'Store numbers and strings in variables and do arithmetic',
            'Load a CSV file from a URL or a path with `pd.read_csv`',
            'Inspect a DataFrame with `head`, `shape` and `columns`',
            'Pull out one column and compute its mean',
          ],
          concepts: [
            'Variable and assignment',
            'int, float and str',
            'import pandas as pd',
            'CSV file',
            'DataFrame: rows and named columns',
            'Series: one column',
            'Observation and variable',
          ],
          explanation: `A **variable** is a name for a value. \`hours = 24\` stores 24 under the name \`hours\`. Python has whole numbers (\`int\`), decimals (\`float\`) and text (\`str\`, written in quotes). Arithmetic uses \`+\`, \`-\`, \`*\`, \`/\`, and \`**\` for powers.

Most data arrives as a table, and in Python the tool for tables is **pandas**. Its central object is the **DataFrame**: rows of observations and named columns of variables. Each row is one thing you measured, and each column is one property of it.

\`\`\`python
import pandas as pd

url = 'https://vincentarelbundock.github.io/Rdatasets/csv/palmerpenguins/penguins.csv'
penguins = pd.read_csv(url)

penguins.head()      # the first five rows
penguins.shape       # (344, 9): 344 rows, 9 columns
penguins.columns     # the column names
\`\`\`

\`pd.read_csv\` reads a comma-separated file from a web address or a path on your computer. A **CSV** is plain text, one row per line, which is why it is the most common way to share data. \`import pandas as pd\` loads the library and gives it the short name that everyone uses.

Square brackets pull out one column, called a **Series**, and a Series has useful methods:

\`\`\`python
penguins['body_mass_g']          # one column
penguins['body_mass_g'].mean()   # its average
\`\`\`

**Pitfalls.** Column names must match exactly, including capitals, or you get a \`KeyError\`. \`shape\` has no parentheses because it is a fact about the table, while \`head()\` does because it is an action. When in doubt, try it and read the error message from the bottom up. The last line usually says what went wrong.

Work through the DISCOVERY page and type every example yourself. Typing teaches you more here than reading does.`,
          resources: [
            discovery('Introduction to DataFrames', 'Basics-of-Data-Science-with-Python/Python-for-Data-Science-Introduction-to-DataFrames', 'Loading data and the vocabulary of rows and columns.'),
            { title: 'Think Python, 3rd edition', url: 'https://allendowney.github.io/ThinkPython/', type: 'textbook', cost: 'free', provider: 'Allen Downey', note: 'Chapters 1 and 2 if you want more practice with values and variables.' },
            { title: '10 minutes to pandas', url: 'https://pandas.pydata.org/docs/user_guide/10min.html', type: 'documentation', cost: 'free', provider: 'pandas', note: 'Skim the first sections only. Most of it comes later in this course.' },
          ],
          exercises: [
            {
              slug: 'load-penguins',
              title: 'Load and inspect',
              prompt:
                'Load the penguins CSV from this lesson. Show the first five rows, then print the shape and column names. Confirm there are 344 rows and 9 columns. Say what one row represents, and name a column that is a measurement and one that is a label.',
              kind: 'data-analysis',
              difficulty: 1,
            },
            {
              slug: 'simple-means',
              title: 'Averages and units',
              prompt:
                'Compute the mean of `flipper_length_mm` and of `body_mass_g`. Store the second in a variable and convert it to kilograms with arithmetic. Write one sentence reporting each number with its unit, in plain English.',
              kind: 'data-analysis',
              difficulty: 1,
            },
            {
              slug: 'read-an-error',
              title: 'Read three errors',
              prompt:
                "Run these on purpose: `penguins['Species']`, `penguins.head`, and `pd.read_csv('nope.csv')`. For each, copy the last line of the output and explain in your own words what happened and how to fix it. Note that the second is not an error at all, and say what it printed instead.",
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            { question: 'What are a DataFrame, a Series and an observation?', answerOutline: 'A DataFrame is a table with named columns, a Series is one column, and an observation is one row, meaning one thing measured.' },
            { question: 'Why does `head()` have parentheses and `shape` not?', answerOutline: '`head` is a method that performs an action. `shape` is an attribute that stores a fact about the DataFrame.' },
            { question: "What does `KeyError: 'Species'` tell you?", answerOutline: 'No column has exactly that name. Check `columns`, because names are case-sensitive and here it is lowercase.' },
          ],
          relatedLessons: ['programming-fundamentals/getting-started/values-types-and-variables'],
        },
        {
          slug: 'types-of-data',
          title: 'Types of data',
          summary:
            'Numerical versus categorical, ordered versus unordered, and missing values: the type of a column decides what you may do with it.',
          estimatedMinutes: 75,
          objectives: [
            'Classify a variable as continuous, discrete, nominal or ordinal',
            'Check how pandas stored each column with `dtypes`',
            'Count categories with `value_counts`',
            'Spot missing values with `isna` and count them',
          ],
          concepts: [
            'Numerical: continuous and discrete',
            'Categorical: nominal and ordinal',
            'Numbers used as labels',
            'dtypes: int64, float64, str',
            'NaN: a missing value',
            'value_counts',
            'Quasi-identifiers',
          ],
          explanation: `Before you compute anything, ask what kind of variable you have, because the type decides which operations make sense.

**Numerical** variables are quantities. They are *continuous* if they can take any value in a range, such as mass, or *discrete* if they are counts, such as number of siblings. **Categorical** variables are labels. They are *nominal* if there is no natural order, such as species, or *ordinal* if there is one, such as small, medium, large.

A number is not always numerical. A ZIP code or a school ID is a label: the average ZIP code means nothing. Going the other way, ordinal scores like survey ratings are often averaged, but remember that the gap from 1 to 2 need not equal the gap from 4 to 5.

pandas records how it stored each column:

\`\`\`python
penguins.dtypes                      # int64, float64, str ...
penguins['species'].value_counts()   # how many of each label
penguins['sex'].isna().sum()         # how many values are missing
\`\`\`

A column full of numbers that shows as \`str\` usually contains a stray symbol somewhere. Such a column cannot be averaged until it is cleaned.

**NaN** means *not a number* and marks a **missing** value. \`.mean()\` skips NaN silently, which is convenient and also dangerous. Always ask why a value is missing. If heavier animals were harder to weigh, the mean of what remains would be biased. \`value_counts()\` hides missing values unless you pass \`dropna=False\`.

**Privacy.** Age, ZIP code and birth date are harmless alone and identifying together. Such **quasi-identifiers** are why a table with names removed can still reveal people. Keep in mind that deleting the name column is not the same as anonymising data. The Ethics and Policy for Data Science course goes much further on this.`,
          resources: [
            discovery('Types of Data', 'Basics-of-Data-Science-with-Python/Types-of-Data', 'The vocabulary of variable types, with examples.'),
            { ...openIntro, note: 'Section 1.2 on data basics and variable types.' },
          ],
          exercises: [
            {
              slug: 'classify-penguin-columns',
              title: 'Classify every column',
              prompt:
                'For each of the 9 penguin columns give its type (continuous, discrete, nominal or ordinal) and its pandas dtype. Which one is a number that behaves as a label? Use `value_counts` to confirm the species counts are 152, 124 and 68, and use `isna().sum()` to confirm that `sex` has 11 missing values.',
              kind: 'data-analysis',
              difficulty: 1,
            },
            {
              slug: 'label-as-number',
              title: 'A meaningless average',
              prompt:
                "Load the STAR data from `https://vincentarelbundock.github.io/Rdatasets/csv/AER/STAR.csv`. Compute `['schoolidk'].mean()`. Explain why pandas gives an answer and why that answer means nothing. Then use `value_counts` on `stark` with and without `dropna=False` and say what the second version reveals.",
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'quasi-identifiers',
              title: 'Could you be found?',
              prompt:
                'List five facts about yourself that appear in common datasets, such as ZIP code or birth date. Which combination would narrow you down to a very small group? In three sentences, explain why removing names from a dataset does not make it anonymous.',
              kind: 'writing',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            { question: 'Is a student ID numerical or categorical? Why does it matter?', answerOutline: 'Categorical (nominal). It labels people, so arithmetic on it is meaningless even though it looks like a number.' },
            { question: 'What does `.mean()` do with NaN, and why is that a risk?', answerOutline: 'It skips them. If values are missing for a reason linked to their size, the mean of the rest is biased.' },
            { question: 'What is a quasi-identifier?', answerOutline: 'A field that is harmless alone but can identify someone when combined with others, such as ZIP code, birth date and sex.' },
          ],
        },
        {
          slug: 'selecting-rows',
          title: 'Row selection with conditions',
          summary:
            'Ask questions of a table: keep the rows that match a condition, combine conditions, then count or average what is left.',
          estimatedMinutes: 90,
          objectives: [
            'Write a comparison that produces a True/False mask',
            'Select rows with a mask, and combine masks with `&` and `|`',
            'Use `isin` and `notna` in a condition',
            'Answer a question by counting or averaging selected rows',
          ],
          concepts: [
            'Comparison operators: ==, !=, <, >, <=, >=',
            'Boolean mask',
            'df[mask]',
            '& (and), | (or), ~ (not)',
            'Parentheses around each condition',
            'isin and notna',
            'len, mean and sum on a selection',
          ],
          explanation: `Most data questions begin with *among these rows, what is true?* In pandas you answer that in two steps. First, a comparison on a column produces a **mask**, a column of True and False. Then you use the mask to keep only the True rows.

\`\`\`python
is_gentoo = penguins['species'] == 'Gentoo'   # a mask
gentoo = penguins[is_gentoo]                  # only those rows
len(gentoo)                                   # 124
gentoo['body_mass_g'].mean()
\`\`\`

Note the double equals: \`=\` assigns and \`==\` compares. Combine conditions with \`&\` for *and* and \`|\` for *or*, and put each condition in its own parentheses, because those symbols bind more tightly than comparisons do:

\`\`\`python
heavy_gentoo = penguins[(penguins['species'] == 'Gentoo') & (penguins['body_mass_g'] > 5000)]
two_species = penguins[penguins['species'].isin(['Adelie', 'Chinstrap'])]
known_sex = penguins[penguins['sex'].notna()]
\`\`\`

\`~\` flips a mask. A selection is itself a DataFrame, so everything you know still works on it: \`len\`, \`.mean()\`, \`.sum()\`, \`value_counts()\`.

A useful trick: True counts as 1 and False as 0, so the mean of a mask is a proportion. \`(penguins['island'] == 'Biscoe').mean()\` is the share of penguins on Biscoe.

**Pitfalls.** Forgetting the parentheses gives a confusing error. Writing \`and\` instead of \`&\` raises \`ValueError\`, because \`and\` cannot work on a whole column. A comparison with NaN is False, so \`penguins['sex'] != 'male'\` quietly includes the rows where sex is unknown. Be sure that is what you mean.

This selection pattern carries you through your first machine problem. Practise it until you can write it without looking anything up.`,
          resources: [
            discovery('Row Selection with DataFrames', 'Basics-of-Data-Science-with-Python/Row-Selection-with-DataFrames', 'Selecting by position and by rule.'),
            discovery('DataFrames with Conditionals', 'Basics-of-Data-Science-with-Python/DataFrames-with-Conditionals', 'Combining conditions, with worked examples.'),
            { title: 'Indexing and selecting data', url: 'https://pandas.pydata.org/docs/user_guide/indexing.html', type: 'documentation', cost: 'free', provider: 'pandas', note: 'Reference only. Read the section on boolean indexing.' },
          ],
          exercises: [
            {
              slug: 'penguin-questions',
              title: 'Ask the table five questions',
              prompt:
                'Using masks, find: (a) how many Adelie penguins weigh more than 4000 g (expect 35); (b) how many Gentoo weigh more than 5000 g (expect 61); (c) the mean mass of penguins on Dream; (d) the share of penguins that live on Biscoe; (e) how many penguins are on Torgersen or Dream. Write each answer as a sentence with its unit.',
              kind: 'data-analysis',
              difficulty: 1,
            },
            {
              slug: 'nan-comparison',
              title: 'The missing-value trap',
              prompt:
                "Count penguins where `sex == 'female'`, where `sex != 'female'`, and where `sex` is missing. Show that the first two add up to 344, then explain why that means the second group includes the unknowns. Rewrite the second selection so it keeps only known males.",
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'mask-is-a-proportion',
              title: 'Means of masks',
              prompt:
                'Compute the share of penguins with `bill_length_mm` above 45 two ways: count the selected rows and divide by the count of rows with a known bill length, then take the mean of the mask. The two answers differ slightly. Explain why, and say which one you would report.',
              kind: 'data-analysis',
              difficulty: 2,
              hint: 'What does the mask contain for a penguin with no bill measurement?',
            },
          ],
          selfAssessment: [
            { question: 'What is a mask?', answerOutline: 'A column of True and False from a comparison, used to keep only the True rows.' },
            { question: 'Why must each condition be in parentheses when you use `&`?', answerOutline: '`&` binds more tightly than `==` and `>`, so without parentheses pandas tries to evaluate the wrong expression first.' },
            { question: 'Why is the mean of a mask a proportion?', answerOutline: 'True counts as 1 and False as 0, so the mean is the count of True divided by the number of rows.' },
          ],
        },
        {
          slug: 'lists-functions-and-conditionals',
          title: 'Lists, functions and conditionals',
          summary:
            'Three small pieces of Python that make analysis shorter and safer: lists of values, functions you define, and if statements, plus assert for checking results.',
          estimatedMinutes: 90,
          objectives: [
            'Create a list and read items from it',
            'Define a function with parameters and a return value',
            'Choose between outcomes with `if`, `elif` and `else`',
            'Check a result automatically with `assert`',
          ],
          concepts: [
            'List and index from 0',
            'def, parameters, return',
            'Calling a function',
            'if, elif, else and indentation',
            'assert',
            'Why functions reduce copy and paste errors',
          ],
          explanation: `A **list** holds several values in order: \`sizes = [10, 20, 40]\`. Items are numbered from 0, so \`sizes[0]\` is 10, and \`len(sizes)\` is 3.

A **function** names a piece of work so you can repeat it without copying. If you find yourself pasting a cell and changing one word, write a function instead:

\`\`\`python
def mean_mass(frame, species):
    selected = frame[frame['species'] == species]
    return selected['body_mass_g'].mean()

mean_mass(penguins, 'Gentoo')
mean_mass(penguins, 'Adelie')
\`\`\`

\`frame\` and \`species\` are **parameters**: names for whatever you pass in. \`return\` sends the answer back. Forgetting \`return\` gives you \`None\`, a common beginner bug. The indented lines are the body of the function, and Python uses that indentation to see where it ends.

An **if statement** runs code only when a condition holds:

\`\`\`python
def size_label(grams):
    if grams > 5000:
        return 'large'
    elif grams > 3500:
        return 'medium'
    else:
        return 'small'
\`\`\`

Python checks each condition from the top and stops at the first True one. Note that \`if\` works on a single True or False. To test a whole column, use a mask instead.

Data work is full of silent mistakes, so write down what you expect and let Python check it. \`assert\` does nothing when a condition is True and stops with an error when it is False:

\`\`\`python
assert len(penguins) == 344
assert abs(mean_mass(penguins, 'Gentoo') - 5076.0) < 0.1
\`\`\`

\`abs\` gives the size of a difference, so that line says *within 0.1*. Decimal numbers are rarely exact, so compare them this way, not with \`==\`. The coursework in this course is checked with \`assert\` cells at the end of each notebook.

For more practice with functions, follow the related Programming Fundamentals lesson.`,
          resources: [
            discovery('Lists and Functions in Python', 'Basics-of-Data-Science-with-Python/Lists-and-Functions-in-Python', 'Lists and functions in a data science setting.'),
            { title: 'Think Python, 3rd edition', url: 'https://allendowney.github.io/ThinkPython/', type: 'textbook', cost: 'free', provider: 'Allen Downey', note: 'Chapter 3 on functions and chapter 5 on conditionals.' },
          ],
          exercises: [
            {
              slug: 'mean-mass-function',
              title: 'Write a selection function',
              prompt:
                'Write `mean_mass(frame, species)` as in this lesson, and call it for all three species. Use `assert` with `abs` to check the results are 3700.7, 3733.1 and 5076.0 to within 0.1. Then write `share_heavier(frame, species, grams)`, which returns the proportion of that species above `grams`, and test it on a case you can check by hand.',
              kind: 'coding',
              difficulty: 1,
            },
            {
              slug: 'label-function',
              title: 'Conditionals on single values',
              prompt:
                "Write `describe_gap(a, b)` that returns `'first is larger'`, `'second is larger'` or `'about equal'`, where about equal means within 1. Write 4 `assert` lines that include the edge cases `describe_gap(5, 6)` and `describe_gap(6, 5)`. Next try `if penguins['body_mass_g'] > 4000:` and record the error, then explain it.",
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'refactor-with-a-function',
              title: 'Remove the copy and paste',
              prompt:
                'Write three copied cells that each compute the mean flipper length of one species, then replace them with one function and three calls. Change the function to use `body_mass_g` and note how many edits that took compared with the copied version. Add a sentence on what kind of bug the function prevents.',
              kind: 'coding',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            { question: 'What does a function return if it has no `return` line?', answerOutline: '`None`, so anything using the result gets nothing useful.' },
            { question: 'Why compare decimals with `abs(a - b) < 0.01` and not `a == b`?', answerOutline: 'Decimals are stored approximately and rounded in display, so exact equality often fails. Compare within a tolerance.' },
            { question: 'What does `assert` do, and why is it useful in data work?', answerOutline: 'It stops with an error if a condition is False. It turns what you expect into a check that runs every time, which catches silent mistakes.' },
          ],
          relatedLessons: [
            'programming-fundamentals/control-flow-functions/functions',
            'programming-fundamentals/control-flow-functions/conditionals',
            'programming-fundamentals/data-collections/lists',
          ],
        },
      ],
    },
    {
      slug: 'study-design',
      title: 'Study Design',
      description:
        'How the way data was collected decides what it can prove: randomised experiments, blocking, observational studies, confounders and stratification.',
      lessons: [
        {
          slug: 'experiments-and-randomisation',
          title: 'Experiments and randomisation',
          summary:
            'A randomised experiment makes groups alike on everything, measured or not, which is why it can show cause and effect.',
          estimatedMinutes: 75,
          objectives: [
            'Identify treatment, control, outcome and units in a study',
            'Explain why random assignment supports a causal claim',
            'Check balance between groups with a table',
            'Describe the role of placebos and blinding',
          ],
          concepts: [
            'Treatment and control',
            'Random assignment',
            'Balance',
            'Placebo',
            'Double-blind',
            'Causal claim',
            'Informed consent',
          ],
          explanation: `You want to know whether something *causes* an outcome. Comparing people who chose a treatment with people who did not is weak evidence, because those groups differed before treatment began. A **randomised experiment** fixes this. You assign units to **treatment** or **control** by chance, and chance has no opinions, so the groups end up alike on age, habits, motivation and everything else, including things you never measured. If the outcomes then differ by more than chance would produce, the treatment is the natural explanation.

The classic example is the 1954 Salk polio vaccine trial. In its randomised part, about 200,000 children received the vaccine and about 200,000 a salt-water **placebo**, and polio rates were about 28 and 71 per 100,000. Neither the families nor the doctors diagnosing cases knew who had received what. That is **double-blind**, and it stops expectations from shaping the results.

Tennessee's Project STAR, which you will analyse in Machine Problem 1, randomly assigned kindergarteners to small or regular classes. You can check that randomisation worked by comparing pre-existing facts across groups:

\`\`\`python
star = pd.read_csv('https://vincentarelbundock.github.io/Rdatasets/csv/AER/STAR.csv')
k = star[star['stark'].notna()]            # students in the study in kindergarten
small = k[k['stark'] == 'small']
regular = k[k['stark'] == 'regular']
(small['gender'] == 'female').mean(), (regular['gender'] == 'female').mean()
\`\`\`

These come out near 0.486 and 0.490. Close, not equal, which is what chance gives. Balance on measured variables gives you confidence about the unmeasured ones, although it can never prove it.

**Pitfall.** Random *assignment* supports cause and effect. Random *sampling* lets you generalise to a population. They are different, and most experiments have only the first.

**Ethics.** People in experiments must give **informed consent**, and a treatment believed to be better cannot be withheld lightly. Being able to randomise does not mean you should.`,
          resources: [
            discovery('Experimental Design and Blocking', 'Basics-of-Data-Science-with-Python/Experimental-Design-and-Blocking', 'Read the first half now. The second half belongs to the next lesson.'),
            { ...openIntro, note: 'Sections 1.3 and 1.4 on sampling principles and experiments.' },
          ],
          exercises: [
            {
              slug: 'star-balance',
              title: 'Check the balance of STAR',
              prompt:
                'Load STAR and keep the kindergarten rows (`stark` not missing). Confirm there are 6,325 students. For the small and regular arms compute the share who are female (`gender`) and the share who are African American (`ethnicity == afam`). Are the groups similar? Explain why these checks use pre-existing facts and never the test scores.',
              kind: 'data-analysis',
              difficulty: 1,
            },
            {
              slug: 'design-an-experiment',
              title: 'Design a small experiment',
              prompt:
                'Design an experiment on whether background music affects how many arithmetic problems a person solves in 5 minutes. State the units, treatment, control, outcome, how you will randomise, and whether blinding is possible. Name one way a person-chooses-their-own-group version would mislead you.',
              kind: 'writing',
              difficulty: 2,
            },
            {
              slug: 'salk-comparison',
              title: 'Why not just compare volunteers?',
              prompt:
                'In part of the Salk study, children whose parents did not consent had a lower polio rate (44 per 100,000) than the regular comparison group (54 per 100,000). Polio was known to strike higher-income families more often, and those families were more likely to consent. Explain how these facts show that comparing vaccinated volunteers with non-volunteers would give a misleading answer.',
              kind: 'problem',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            { question: 'Why does random assignment make a causal claim possible?', answerOutline: 'Chance balances the groups on all other factors, measured or not, so a clear difference in outcome can be attributed to the treatment.' },
            { question: 'What is the difference between random assignment and random sampling?', answerOutline: 'Assignment decides who gets the treatment and supports cause and effect. Sampling decides who is studied and supports generalising to a population.' },
            { question: 'What does double-blind mean and why does it help?', answerOutline: 'Neither participants nor those measuring outcomes know the group, so expectations cannot influence the result.' },
          ],
        },
        {
          slug: 'blocking',
          title: 'Blocking',
          summary:
            'When you know something strongly affects the outcome, split units into blocks on it and randomise inside each block.',
          estimatedMinutes: 60,
          objectives: [
            'Explain what blocking is and why it reduces noise',
            'Tell blocking apart from randomisation',
            'Identify the blocks in a real study',
            'Show that a comparison inside one small block can be unreliable',
          ],
          concepts: [
            'Blocking variable',
            'Randomising inside blocks',
            'Noise from known differences',
            'Paired designs',
            'Small-sample variability',
          ],
          explanation: `Randomisation balances groups on average, but in any one experiment chance can leave them a bit uneven. If you know a factor strongly affects the outcome, you need not leave it to chance. **Blocking** means dividing units into groups that are alike on that factor, then randomising separately inside each group. Each block contains its own small experiment.

Project STAR did this. Schools differ a great deal, so children were randomised to class types **within each school**. Comparing small and regular classes inside a school removes differences between schools from the comparison. A paired design is the extreme case: each pair of similar units, or one person measured under both conditions, forms a block of two.

Blocking does not replace randomisation. The block handles the factor you know about, and randomisation inside it handles everything else. The rule of thumb is *block what you can, randomise what you cannot*.

Blocks are often small, so one block alone gives a noisy answer. In STAR, look at the kindergarten rows for two schools:

\`\`\`python
def math_gap(frame):
    small = frame[frame['stark'] == 'small']['mathk'].mean()
    regular = frame[frame['stark'] == 'regular']['mathk'].mean()
    return small - regular

math_gap(k[k['schoolidk'] == 27])    # about -3.6
math_gap(k[k['schoolidk'] == 51])    # about +28.9
\`\`\`

One school shows small classes behind and another shows them far ahead. Neither tells you the true effect, because each compares only a few classrooms. Adding up across all 79 schools is what gives the overall estimate its strength.

**Pitfall.** Do not read a story into a single block. A surprising result in the smallest group is usually noise, and this is true of any analysis that slices data finely.

Finish the DISCOVERY page and then try the exercises.`,
          resources: [
            discovery('Experimental Design and Blocking', 'Basics-of-Data-Science-with-Python/Experimental-Design-and-Blocking', 'The second half covers blocking with worked examples.'),
            { ...openIntro, note: 'Section 1.4 on the principles of experimental design, including blocking.' },
          ],
          exercises: [
            {
              slug: 'three-schools',
              title: 'Look inside three blocks',
              prompt:
                'Use `value_counts` on `schoolidk` to find the three largest kindergarten schools (27, 28 and 51). For each, count students in each arm and compute `math_gap`. Confirm the gaps are about -3.56, -5.97 and +28.87. Write a short paragraph on why these numbers disagree so much, and what you would need before trusting any one of them.',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'choose-a-block',
              title: 'Choose a blocking variable',
              prompt:
                'A company tests two tutoring apps on 200 high-school students. Age and prior grades are known in advance. Which would you block on, and why? Describe exactly how you would assign students, step by step, and explain what could go wrong if you randomised without blocking and only 200 students took part.',
              kind: 'writing',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            { question: 'What does blocking add to randomisation?', answerOutline: 'It guarantees balance on a known important factor, reducing noise. Randomisation inside blocks still handles the unknown factors.' },
            { question: 'What were the blocks in Project STAR?', answerOutline: 'Schools. Students were randomised to class types within each school.' },
            { question: 'Why is a result from a single small block unreliable?', answerOutline: 'It rests on few units and classrooms, so chance differences are large compared with the true effect.' },
          ],
        },
        {
          slug: 'observational-studies-and-confounders',
          title: 'Observational studies and confounders',
          summary:
            'Without random assignment, a third factor can create or hide an association. Learn to name it before you trust a comparison.',
          estimatedMinutes: 75,
          objectives: [
            'Tell an observational study from an experiment',
            'Define a confounder and identify one in a real claim',
            'Explain why association does not establish cause',
            'Say what an observational study can still contribute',
          ],
          concepts: [
            'Observational study',
            'Association',
            'Confounder',
            'Selection into groups',
            'Reverse causation',
            'Evidence from many studies',
          ],
          explanation: `In an **observational study** you measure what happened without controlling who got what. Most data you will ever meet is observational: sales records, health records, polls, clicks. Such data shows **associations**, meaning two things vary together. It cannot by itself show that one causes the other.

The main reason is **confounding**. A confounder is a third factor linked to both the supposed cause and the outcome. People who carry lighters get lung cancer more often, not because lighters are dangerous, but because smoking is linked to both. A confounder must be connected to both sides. If it touches only one, it cannot produce the association.

There are other traps too. In **reverse causation**, the arrow runs the other way: sick people may stop exercising, so low exercise can be a result of illness. In **selection**, the people in a group got there for a reason, and that reason matters. In STAR, the free-lunch students score lower, but free lunch reflects family income and school, and is not a treatment anyone was randomly given.

When you meet a claim, ask four questions. Who ended up in each group, and how? What else differs between them? Could the arrow run backwards? What would an experiment look like, and why was one not done?

Observational evidence still matters, because many questions cannot ethically be randomised. Nobody can assign people to smoke for thirty years. The case against smoking was built from observational studies that were consistent across populations, showed a dose-response pattern, and fitted the biology, even though no single study was decisive.

**Pitfall.** Saying *associated with* in a report and then *causes* in the headline. Choose your verbs to match the study design.

**Design reflection.** When you publish a comparison, think about how a reader will take it. A chart comparing two groups invites a causal reading, whether you meant one or not.`,
          resources: [
            discovery('Observational Studies, Confounders and Stratification', 'Basics-of-Data-Science-with-Python/Observational-Studies-Confounders-and-Stratification', 'Read the part on observational studies and confounders now.'),
            inferential('Chapter 2, Causality and Experiments, including John Snow and the cholera study.'),
            { title: 'Spurious Correlations', url: 'https://www.tylervigen.com/spurious-correlations', type: 'interactive', cost: 'free', provider: 'Tyler Vigen', note: 'A gallery of strong associations with no causal link. Use it to practise your scepticism.' },
          ],
          exercises: [
            {
              slug: 'name-the-confounder',
              title: 'Name the confounder',
              prompt:
                'For each claim, say whether it comes from an observational study, name a plausible confounder, and explain how it connects to both sides. (a) Children with larger shoe sizes read better. (b) Towns with more firefighters at a fire have more damage. (c) People who take vitamins live longer. (d) Students who sit in the front row get higher grades.',
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'free-lunch-gap',
              title: 'An association that is not an effect',
              prompt:
                'In the STAR kindergarten rows, compute mean `mathk` for `lunchk` values `free` and `non-free` (the gap is about 23 points). Write a paragraph on why this does not show that free lunch lowers scores. Name at least two factors that could explain it, and say why the small-class comparison from the same data is on stronger ground.',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'headline-audit',
              title: 'Rewrite a headline',
              prompt:
                'Find a headline that claims one thing causes another from an observational study. Rewrite it so the verb matches the evidence. Then describe the randomised experiment that would answer the question, and explain why it might be impractical or unethical.',
              kind: 'writing',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            { question: 'What makes something a confounder?', answerOutline: 'It is associated with both the supposed cause and the outcome, so it can create or hide an association between them.' },
            { question: 'What is reverse causation? Give an example.', answerOutline: 'The outcome influences the supposed cause, for example illness leading people to exercise less.' },
            { question: 'How was the case against smoking built without an experiment?', answerOutline: 'Consistent observational studies across populations, a dose-response pattern, and agreement with biological evidence.' },
          ],
        },
        {
          slug: 'stratification-and-simpsons-paradox',
          title: "Stratification and Simpson's paradox",
          summary:
            'Compare like with like by splitting data on a suspected confounder. Sometimes the overall answer reverses when you do.',
          estimatedMinutes: 90,
          objectives: [
            'Stratify a comparison on a categorical variable',
            'Compute rates inside strata with row selection',
            'Explain how an overall comparison can reverse inside strata',
            'Combine stratum results into a weighted average',
          ],
          concepts: [
            'Stratification',
            'Stratum',
            "Simpson's paradox",
            'Rate versus count',
            'Weighted average',
            'Limits of stratifying: unmeasured confounders',
          ],
          explanation: `If you suspect a confounder and have measured it, you can **stratify**: split the data into groups, called strata, with the same value of that variable, and make the comparison inside each one. Inside a stratum, the confounder no longer varies, so it cannot explain the difference.

The famous example is graduate admissions at UC Berkeley in 1973. Taken over the six largest departments, 44.5% of male applicants and 30.4% of female applicants were admitted. Inside department A, though, 82.4% of women and 62.1% of men were admitted, and most departments show no strong gap against women. Women had mostly applied to departments that admitted few people. A reversal like this, where the overall comparison points the other way from the comparisons inside strata, is **Simpson's paradox**.

With only row selection you can do this:

\`\`\`python
ucb = pd.read_csv('https://vincentarelbundock.github.io/Rdatasets/csv/datasets/UCBAdmissions.csv')

def admit_rate(frame):
    admitted = frame[frame['Admit'] == 'Admitted']['Freq'].sum()
    return admitted / frame['Freq'].sum()

women = ucb[ucb['Gender'] == 'Female']
admit_rate(women)                            # 0.304
admit_rate(women[women['Dept'] == 'A'])      # 0.824
\`\`\`

To turn stratum results back into one number, take a **weighted average**: multiply each stratum's difference by its size, add these up, and divide by the total size. This is a fair summary of the within-stratum comparisons. It does not simply repeat the raw overall gap.

**Pitfalls.** Stratifying only handles confounders you measured. In an observational study there may always be another. Fine strata get small, and small strata are noisy, as you saw with single schools. Not every variable should be stratified on either. If the variable lies on the path from cause to outcome, stratifying can hide a real effect, so think about what question you are asking. In the Berkeley case, it is fair to ask why some departments had so little funding for places, which stratifying does not answer.

Finish the DISCOVERY page and then do the first exercise by hand.`,
          resources: [
            discovery('Observational Studies, Confounders and Stratification', 'Basics-of-Data-Science-with-Python/Observational-Studies-Confounders-and-Stratification', 'The second half covers stratification.'),
            { ...openIntro, note: 'Section 1.4 and the discussion of confounding in observational studies.' },
          ],
          exercises: [
            {
              slug: 'berkeley-by-department',
              title: 'Reproduce the Berkeley reversal',
              prompt:
                'Load `UCBAdmissions.csv`. Using `admit_rate`, confirm the overall rates of 44.5% (Male) and 30.4% (Female), then compute both rates in each of the departments A to F, writing one call per department. In how many departments is the rate higher for women? Write three sentences explaining the reversal, and use the application counts to back it up.',
              kind: 'data-analysis',
              difficulty: 2,
              hint: 'Compare how many women and men applied to departments A and B with how many applied to C and E.',
            },
            {
              slug: 'weighted-average-by-hand',
              title: 'A weighted average by hand',
              prompt:
                'A drug trial reports a difference in recovery of 12 points among 100 mild cases and 2 points among 300 severe cases. Compute the simple average of the two differences and the weighted average, and show the arithmetic. They should be 7 and 4.5. Explain when each number would be the right one to report.',
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'teachers-and-degrees',
              title: 'Stratify an observational comparison',
              prompt:
                "In the STAR kindergarten rows, compare mean `mathk` for teachers with `degreek` of `master` and `bachelor`. The overall gap is under half a point. Repeat inside `schoolk == 'inner-city'` and `schoolk == 'suburban'`, where it is about -8 and +8. What does this tell you about reading the overall number? Why can you still not say what a master's degree causes here?",
              kind: 'data-analysis',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            { question: 'How does stratifying deal with a confounder?', answerOutline: 'Inside each stratum the confounder is held fixed, so it cannot explain a difference found there.' },
            { question: "What is Simpson's paradox?", answerOutline: 'A trend in the combined data that disappears or reverses inside groups, usually because group sizes differ between the things compared.' },
            { question: 'What can stratifying not do?', answerOutline: 'It cannot handle unmeasured confounders, and very fine strata become too small to trust.' },
          ],
        },
      ],
    },
    {
      slug: 'exploratory-data-analysis',
      title: 'Exploratory Data Analysis',
      description:
        'Summarise and picture a dataset before you model it: descriptive statistics, new columns, grouping, histograms, box plots and clear charts.',
      lessons: [
        {
          slug: 'descriptive-statistics',
          title: 'Descriptive statistics',
          summary:
            'Mean, median, standard deviation and friends: what each one measures, and when each one misleads.',
          estimatedMinutes: 75,
          objectives: [
            'Compute mean, median, mode, range and standard deviation',
            'Choose between mean and median for a skewed variable',
            'Explain standard deviation in words',
            'Read the output of `describe`',
          ],
          concepts: [
            'Mean, median and mode',
            'Range and spread',
            'Variance and standard deviation',
            'Skew',
            'Outlier',
            'Robust statistic',
            'describe()',
          ],
          explanation: `A dataset has too many numbers to hold in your head, so you summarise it. A good summary answers two questions: what is a typical value, and how far do values vary around it?

For the centre, the **mean** adds everything and divides by the count, and the **median** is the middle value when sorted. The mean is pulled by extreme values and the median is not, so we call the median **robust**. If one billionaire walks into a coffee shop, the mean income jumps while the median barely moves. For skewed variables such as income, report the median. When the mean and median disagree, that is a clue about the shape of the data.

For spread, the **range** is the largest minus the smallest value, and it depends entirely on two points. The **standard deviation** measures the typical distance of values from the mean:

$$ s = \\sqrt{\\frac{1}{n-1}\\sum_{i=1}^{n}(x_i-\\bar{x})^2} $$

Read it from the inside out: take each distance from the mean, square it so that negatives cannot cancel, average, then take the square root to return to the original units. Dividing by $n-1$ is a small correction for measuring distances from the sample's own mean.

\`\`\`python
col = penguins['body_mass_g']
col.mean(), col.median(), col.std(), col.min(), col.max()
penguins.describe()          # all numeric columns at once
\`\`\`

\`describe\` gives the count, mean, standard deviation, minimum, quartiles and maximum. Look at the count first: a smaller count means missing values.

**Pitfalls.** A single summary can hide structure. Old Faithful's eruption durations have mean 3.49 and median 4.00 minutes, yet almost no eruption lasts close to the mean, because there are two kinds of eruption. You will see this in the histogram lesson. Always look at a picture too. Do not delete outliers just because they are inconvenient. An outlier may be a typo or it may be the most interesting row you have.`,
          resources: [
            discovery('Descriptive Statistics', 'Exploratory-Data-Analysis/Descriptive-Statistics', 'Measures of centre and spread in pandas.'),
            { ...openIntro, note: 'Section 2.1 on examining numerical data.' },
          ],
          exercises: [
            {
              slug: 'mean-vs-median',
              title: 'When the mean moves',
              prompt:
                'By hand, compute the mean and median of 20, 22, 25, 25, 28. Change the 28 to 280 and recompute. The mean goes from 24 to 74.4 and the median stays at 25. Then load `faithful.csv` from Rdatasets (`https://vincentarelbundock.github.io/Rdatasets/csv/datasets/faithful.csv`), run `describe`, and say what the gap between mean and median of `eruptions` might indicate.',
              kind: 'data-analysis',
              difficulty: 1,
            },
            {
              slug: 'describe-penguins',
              title: 'Read a describe table',
              prompt:
                'Run `penguins.describe()`. Report the count, centre and spread of `flipper_length_mm` in one sentence with units. Say which column has the largest standard deviation and why that does not mean it varies the most in any useful sense. How would you compare spread across columns with different units?',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'sd-by-hand',
              title: 'Standard deviation by hand',
              prompt:
                'Compute the standard deviation of 2, 4, 4, 4, 5, 5, 7, 9 by hand, using the formula with $n-1$, and write out each step. Confirm with `pd.Series([...]).std()`. Explain in one sentence what the number says about these eight values.',
              kind: 'problem',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            { question: 'When would you report the median over the mean?', answerOutline: 'For skewed data or when extreme values are present, because the median is robust to them.' },
            { question: 'What does standard deviation measure?', answerOutline: 'The typical distance of values from the mean, in the original units.' },
            { question: 'Why is a single summary not enough for Old Faithful?', answerOutline: 'The data has two clusters, so the mean describes almost no real eruption.' },
          ],
        },
        {
          slug: 'adding-columns-and-grouping',
          title: 'Adding rows and columns, and grouping',
          summary:
            'Make new columns from old ones, set values safely, parse dates, then split a table into groups and summarise each one.',
          estimatedMinutes: 105,
          objectives: [
            'Add a column computed from other columns',
            'Set values on selected rows with `loc`',
            'Add rows with `concat`, and sort with `sort_values`',
            'Summarise a table by group with `groupby` and `agg`',
            'Parse a date column and extract its parts',
          ],
          concepts: [
            'Vectorised column arithmetic',
            'df.loc[mask, column]',
            'Copy-on-Write in pandas 3',
            'pd.concat',
            'sort_values',
            'Split, apply, combine',
            'groupby and agg',
            'pd.to_datetime and .dt',
          ],
          explanation: `A column is usually not quite what you need, so you compute a new one. Arithmetic on a column applies to every row at once, which is called **vectorised** code:

\`\`\`python
penguins['mass_kg'] = penguins['body_mass_g'] / 1000
penguins['big'] = penguins['body_mass_g'] > 5000
\`\`\`

To change only some rows, use \`loc\` with a mask and a column name in one step:

\`\`\`python
penguins.loc[penguins['island'] == 'Dream', 'region'] = 'north'
\`\`\`

**Pitfall.** \`penguins[mask]['region'] = 'north'\` looks reasonable but does not work. In pandas 3 a selection never changes the original table, a rule called Copy-on-Write. Always use one \`loc\` call. Older tutorials online may show other patterns, so trust this one.

Add rows by stacking DataFrames with \`pd.concat([a, b])\`, and order rows with \`penguins.sort_values('body_mass_g', ascending=False)\`.

**Grouping** is the most useful idea in this lesson. It splits a table by a label, applies a summary to each piece, and combines the results. Everything you did by hand with selections becomes one line:

\`\`\`python
penguins.groupby('species')['body_mass_g'].mean()
penguins.groupby('species').agg(
    n=('body_mass_g', 'count'),
    mean_mass=('body_mass_g', 'mean'),
    sd_mass=('body_mass_g', 'std'),
)
\`\`\`

You can group by two columns with \`groupby(['species', 'sex'])\`.

Dates arrive as text, so convert them first. Then the \`.dt\` accessor gives you the parts:

\`\`\`python
weather['date'] = pd.to_datetime(weather['DATE'])
weather['month'] = weather['date'].dt.month
weather['year'] = weather['date'].dt.year
\`\`\`

**Pitfalls.** Check group sizes with \`count\` before you compare group means, since a small group can give a dramatic number by chance. \`groupby\` drops rows whose group label is missing unless you pass \`dropna=False\`. In your first machine problem you did this work by hand, which is why grouping should now feel like a shortcut rather than magic.`,
          resources: [
            discovery('Adding Rows and Columns to a DataFrame', 'Exploratory-Data-Analysis/Adding-Rows-and-Columns-to-a-DataFrame', 'New columns and new rows.'),
            discovery('Grouping Data in Python', 'Exploratory-Data-Analysis/Grouping-Data-in-Python', 'groupby with worked examples.'),
            { title: 'Copy-on-Write', url: 'https://pandas.pydata.org/docs/user_guide/copy_on_write.html', type: 'documentation', cost: 'free', provider: 'pandas', note: 'Why chained assignment no longer works. Read the opening section only.' },
          ],
          exercises: [
            {
              slug: 'tip-percent',
              title: 'New columns and group summaries',
              prompt:
                'Load `https://vincentarelbundock.github.io/Rdatasets/csv/reshape2/tips.csv` (244 restaurant bills). Add a column `tip_pct` equal to `tip / total_bill * 100`. Use `groupby` with `agg` to report count, mean and median `tip_pct` for each `day`, and sort by the mean. Which day has the fewest bills, and why should that make you cautious about its average?',
              kind: 'data-analysis',
              difficulty: 1,
            },
            {
              slug: 'chained-assignment',
              title: 'See Copy-on-Write fail',
              prompt:
                "On a copy of the tips table, try `t[t['day'] == 'Sun']['tip'] = 0`. Check the mean tip before and after, and record any warning. Now do the change correctly with `loc` and confirm the mean tip on Sundays is 0. Explain in one sentence why the first version changed nothing.",
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'groupby-by-hand',
              title: 'From selection to groupby',
              prompt:
                'In STAR kindergarten rows, compute mean `mathk` by `stark` using `groupby`, then again by `schoolk` and `stark` together. Check that each number matches what the selection method gives for one case. Which is easier to review for mistakes, and why?',
              kind: 'data-analysis',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            { question: 'What are the three steps inside a groupby?', answerOutline: 'Split the rows by group label, apply a summary to each group, and combine the results into a table.' },
            { question: "Why does `df[mask]['x'] = 1` not change `df` in pandas 3?", answerOutline: 'The selection behaves as a copy under Copy-on-Write, so the assignment changes a temporary object. Use `df.loc[mask, \'x\'] = 1`.' },
            { question: 'Why check group sizes before comparing means?', answerOutline: 'Small groups have noisy means, so large differences may be chance.' },
          ],
        },
        {
          slug: 'histograms-quartiles-and-box-plots',
          title: 'Histograms, quartiles and box plots',
          summary:
            'See the shape of a variable: histograms for one distribution, quartiles and box plots for comparing several.',
          estimatedMinutes: 90,
          objectives: [
            'Draw a histogram and choose a sensible number of bins',
            'Describe a distribution by centre, spread, shape and outliers',
            'Compute quartiles and the interquartile range',
            'Draw and read a box plot, and put values into bins with `pd.cut`',
          ],
          concepts: [
            'Distribution',
            'Histogram and bin width',
            'Unimodal, bimodal, skewed',
            'Quartiles and quantile()',
            'Interquartile range (IQR)',
            'Box plot and the 1.5 IQR rule',
            'pd.cut',
          ],
          explanation: `The **distribution** of a variable is the pattern of how often each value occurs, and the quickest way to see it is a **histogram**. It sorts values into equal-width bins and draws a bar for each bin's count.

\`\`\`python
import matplotlib.pyplot as plt

faithful = pd.read_csv('https://vincentarelbundock.github.io/Rdatasets/csv/datasets/faithful.csv')
faithful['eruptions'].plot.hist(bins=20)
plt.xlabel('Eruption length (minutes)')
plt.show()
\`\`\`

Old Faithful's histogram has two humps: it is **bimodal**. That is why its mean described no real eruption. Bin width matters. Too few bins hide structure and too many turn noise into spikes, so try a few values. Describe any distribution in four words: **centre, spread, shape, outliers**.

**Quartiles** cut sorted data into four equal parts. The first quartile, Q1, has 25% of values below it, the median is Q2, and Q3 has 75% below it. The **interquartile range**, $\\text{IQR} = Q3 - Q1$, is the width of the middle half and, like the median, it is robust.

\`\`\`python
q1 = faithful['waiting'].quantile(0.25)
q3 = faithful['waiting'].quantile(0.75)
\`\`\`

A **box plot** draws the box from Q1 to Q3 with a line at the median. Whiskers reach to the furthest values within $1.5 \\times \\text{IQR}$ of the box, and anything beyond is drawn as a point and flagged as a possible outlier. Box plots use little space, so they are ideal for comparing groups:

\`\`\`python
penguins.boxplot(column='body_mass_g', by='species')
\`\`\`

Sometimes you want bins as a new column, to compare groups of a numeric variable. \`pd.cut\` does that:

\`\`\`python
penguins['mass_band'] = pd.cut(penguins['body_mass_g'], [2000, 3500, 5000, 7000])
penguins['mass_band'].value_counts()
\`\`\`

**Pitfalls.** A box plot hides shape: Old Faithful looks like one wide group, not two. Use a histogram first. The 1.5 IQR rule flags points to look at. It does not prove they are errors.`,
          resources: [
            discovery('Histograms', 'Exploratory-Data-Analysis/Histograms', 'Reading and drawing histograms.'),
            discovery('Quartiles and Box Plots', 'Exploratory-Data-Analysis/Quartiles-and-Box-Plots', 'Quartiles, IQR and box plots.'),
            { title: 'Fundamentals of Data Visualization', url: 'https://clauswilke.com/dataviz/', type: 'textbook', cost: 'free', provider: 'Claus O. Wilke', note: 'Chapter 7 on visualising distributions.' },
          ],
          exercises: [
            {
              slug: 'bin-width-experiment',
              title: 'Bin width changes the story',
              prompt:
                'Draw the histogram of Old Faithful `eruptions` with 4, 20 and 100 bins. Which shows the two humps honestly? What does each of the others hide or invent? Label both axes on each chart. Use selections to report the mean duration of eruptions under and over 3 minutes.',
              kind: 'data-analysis',
              difficulty: 1,
            },
            {
              slug: 'fences-by-hand',
              title: 'Compute the fences',
              prompt:
                'For `total_bill` in the tips data, compute Q1, Q3, the IQR, and the upper fence $Q3 + 1.5 \\times \\text{IQR}$. Count how many bills exceed the fence. Draw a box plot of `total_bill` by `day`. Explain whether you would delete those large bills, and why not.',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'compare-by-box',
              title: 'Box plot versus histogram',
              prompt:
                'Draw `body_mass_g` as a box plot by species and as three overlapping or stacked histograms. Write down one thing each plot shows more clearly. Then use `pd.cut` to create three mass bands and report how many penguins of each species fall in each band.',
              kind: 'data-analysis',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            { question: 'What four things should you describe about any distribution?', answerOutline: 'Centre, spread, shape and outliers.' },
            { question: 'What is the IQR and why is it robust?', answerOutline: 'Q3 minus Q1, the width of the middle half. Extreme values do not change it because it ignores the tails.' },
            { question: 'What can a box plot hide?', answerOutline: 'Shape, especially several modes. A bimodal variable can look like one wide group.' },
          ],
        },
        {
          slug: 'basic-visualisation-and-design',
          title: 'Basic visualisation and chart design',
          summary:
            'Choose the right chart for the question, then make it readable and honest.',
          estimatedMinutes: 90,
          objectives: [
            'Choose among bar, line and scatter charts for a question',
            'Make a labelled chart with pandas and matplotlib',
            'Save a chart to a PNG file',
            'Identify design choices that mislead a reader',
          ],
          concepts: [
            'Bar chart for categories',
            'Line chart for change over time',
            'Scatter plot for two numeric variables',
            'Axis labels, units and titles',
            'Zero baseline for bars',
            'Overplotting',
            'Colour and accessibility',
          ],
          explanation: `A chart should answer a question at a glance. Start from the question, not from the chart type:

- Comparing amounts across categories: a **bar chart**.
- Showing change over time: a **line chart**.
- Looking for a relationship between two numeric variables: a **scatter plot**.
- Showing one distribution: a histogram or box plot.

\`\`\`python
import matplotlib.pyplot as plt

means = penguins.groupby('species')['body_mass_g'].mean()
means.plot.bar()
plt.ylabel('Mean body mass (g)')
plt.title('Gentoo penguins are about 1.4 kg heavier')
plt.tight_layout()
plt.savefig('mass_by_species.png', dpi=150)
plt.show()

penguins.plot.scatter(x='flipper_length_mm', y='body_mass_g')
\`\`\`

A chart needs axis labels with units. A title that states the finding helps more than one that names the variables, because it tells the reader what to see. Save figures to files so they can go in a report, and call \`savefig\` before \`show\`.

**Design and honesty.** Bars encode amounts by length, so a bar chart must start at zero, or a 2% difference can look like a doubling. Line charts may start elsewhere, because they encode change by slope, but say so if the range is narrow. Avoid 3D effects, which distort lengths. Keep to a few colours, and do not rely on red versus green alone, since many readers cannot tell them apart. If you have thousands of points, they will overlap, so add \`alpha=0.2\` to the scatter to see density.

**Pitfall.** Do not choose a chart because it looks good. Ask what a reader would conclude in five seconds, and whether that conclusion is true. A dual-axis chart, for example, can be made to show any relationship you like by rescaling the axes.

Design is not decoration. The same numbers, charted differently, can inform or mislead. Treat your charts as claims that you are responsible for.`,
          resources: [
            discovery('Basic Data Visualization in Python', 'Exploratory-Data-Analysis/Basic-Data-Visualization-in-Python', 'Plotting from a DataFrame.'),
            { title: 'Fundamentals of Data Visualization', url: 'https://clauswilke.com/dataviz/', type: 'textbook', cost: 'free', provider: 'Claus O. Wilke', note: 'Chapter 2 on mapping data to aesthetics, and chapter 6 on visualising amounts.' },
            { title: 'Matplotlib Quick Start', url: 'https://matplotlib.org/stable/users/explain/quick_start.html', type: 'documentation', cost: 'free', provider: 'Matplotlib', note: 'Reference for labels, titles and saving figures.' },
          ],
          exercises: [
            {
              slug: 'three-charts',
              title: 'Three questions, three charts',
              prompt:
                'Using the penguins data, make a bar chart of mean mass by species, a scatter plot of flipper length against mass, and a box plot of mass by island. Give each one axis labels with units and a title that states the finding. Save all three as PNG files at 150 dpi.',
              kind: 'data-analysis',
              difficulty: 1,
            },
            {
              slug: 'truncated-axis',
              title: 'Lie with a bar chart',
              prompt:
                'Using mean tip percentage for lunch and dinner from the tips data, make one honest bar chart and one with the y-axis cut so that the difference looks large (use `plt.ylim`). Put them side by side, and write what a reader would conclude from each. Which rule did the second one break?',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'critique-a-chart',
              title: 'Critique a real chart',
              prompt:
                'Find a chart in the news. State its question, what chart type it uses, and whether that fits. Check its axes, units and source. List one choice that helps the reader and one that could mislead, then sketch an improvement.',
              kind: 'writing',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            { question: 'Which chart would you use to show a trend across years, and which for a relationship between two measurements?', answerOutline: 'A line chart for the trend, a scatter plot for the relationship.' },
            { question: 'Why must a bar chart start at zero?', answerOutline: 'Bars encode amounts by length, so a cut axis exaggerates differences.' },
            { question: 'What makes a good chart title?', answerOutline: 'It states the finding, so the reader knows what to see, and the axes carry units.' },
          ],
          relatedLessons: ['probability-statistics/statistics-in-practice/visualisation-and-reproducible-reporting'],
        },
      ],
    },
    {
      slug: 'simulation',
      title: 'Simulation',
      description:
        'Use a computer to play out chance thousands of times: random numbers, for-loops, sample spaces, the normal distribution and the law of large numbers.',
      lessons: [
        {
          slug: 'random-numbers-and-sample-spaces',
          title: 'Random numbers and sample spaces',
          summary:
            'List what could happen, then let the computer roll the dice. Seeds make random results repeatable.',
          estimatedMinutes: 75,
          objectives: [
            'Write down the sample space of a simple experiment',
            'Compute a probability by counting equally likely outcomes',
            'Generate random numbers with a NumPy generator',
            'Use a seed so that a simulation can be reproduced',
          ],
          concepts: [
            'Outcome, event and sample space',
            'Equally likely outcomes',
            'Probability as a long-run share',
            'np.random.default_rng',
            'Seed',
            'Pseudo-random numbers',
          ],
          explanation: `Probability starts with a list. The **sample space** is the set of all possible outcomes of an experiment. For one die it is $\\{1,2,3,4,5,6\\}$. An **event** is any set of outcomes you care about, such as *the roll is even*. When outcomes are equally likely:

$$ P(\\text{event}) = \\frac{\\text{outcomes in the event}}{\\text{outcomes in the sample space}} $$

Be careful about what counts as one outcome. Two dice have 36 equally likely ordered pairs, not 11 equally likely totals, which is why a total of 7 (six ways) is much more likely than a total of 2 (one way).

A computer can play out chance for you. NumPy, which comes with pandas, has a random number generator:

\`\`\`python
import numpy as np

rng = np.random.default_rng(107)     # 107 is the seed
rng.integers(1, 7)                   # one die roll: 1 to 6
rng.integers(1, 7, size=10)          # ten rolls
rng.random()                         # a decimal from 0 up to 1
rng.choice(['H', 'T'], size=5)       # five coin flips
\`\`\`

Note that \`integers(1, 7)\` includes 1 and excludes 7. A common way to simulate an event with probability $p$ is \`rng.random() < p\`, which is True a share $p$ of the time.

Computers do not make truly random numbers. They run a formula that produces **pseudo-random** numbers from a starting value called a **seed**. Using a seed means that anyone who runs your code gets exactly the same results, which matters when others need to check your work. Create one generator at the top of the notebook, and let it run. Do not reset the seed before every roll, or you will get the same numbers each time.

**Pitfall.** A probability is a long-run share, not a promise about a short run. Ten flips can easily give seven heads. Knowing how much variation to expect is what this module is about.`,
          resources: [
            discovery('Random Numbers in Python', 'Simulation-and-Distributions/Random-Numbers-in-Python', 'Generating random values for simulations.'),
            discovery('Sample Space', 'Simulation-and-Distributions/Sample-Space', 'Listing outcomes and computing probabilities by counting.'),
            { title: 'Seeing Theory', url: 'https://seeing-theory.brown.edu/', type: 'interactive', cost: 'free', provider: 'Brown University', note: 'Chapter 1, Basic Probability. Run the coin and die simulations.' },
          ],
          exercises: [
            {
              slug: 'two-dice-space',
              title: 'Two dice by hand',
              prompt:
                'Write the sample space for two dice as a 6-by-6 grid of totals. By counting, find P(total = 7), P(total at least 10) and P(doubles). They should be 6/36, 6/36 and 6/36. Then simulate 100,000 rolls with NumPy arrays and a fixed seed, compute the same three shares, and report how close they are.',
              kind: 'simulation',
              difficulty: 1,
              hint: 'Make two arrays with `rng.integers(1, 7, size=100_000)`, add them, and take the mean of a comparison such as `total == 7`.',
            },
            {
              slug: 'seed-behaviour',
              title: 'What a seed does',
              prompt:
                'Make two generators with the same seed and draw five integers from each. Compare. Then draw five more from one of them. Finally, make a generator with a different seed. Explain what you see, and why a published analysis should state its seed.',
              kind: 'coding',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            { question: 'Why is a total of 7 more likely than a total of 2 with two dice?', answerOutline: 'Ordered pairs are the equally likely outcomes: six pairs sum to 7 and only one sums to 2.' },
            { question: 'What does a seed do?', answerOutline: 'It fixes the starting point of the pseudo-random sequence, so the results can be reproduced exactly.' },
            { question: 'Does `rng.integers(1, 7)` ever return 7?', answerOutline: 'No. The upper bound is excluded, so it returns 1 to 6.' },
          ],
          relatedLessons: ['probability-statistics/probability-foundations/sample-spaces-and-axioms'],
        },
        {
          slug: 'for-loops-and-simple-simulations',
          title: 'For-loops and simple simulations',
          summary:
            'Repeat an experiment thousands of times with a for-loop, collect the outcomes, and read off the answer.',
          estimatedMinutes: 105,
          objectives: [
            'Write a for-loop over a range and over a list',
            'Use a counter or a list to collect results',
            'Combine loops, conditionals and functions in one simulation',
            'Estimate a probability from repeated trials',
          ],
          concepts: [
            'for and range',
            'Loop body and indentation',
            'Accumulator pattern',
            'list.append',
            'One trial versus many trials',
            'Monte Carlo estimate',
          ],
          explanation: `A **for-loop** repeats a block of code once for each item:

\`\`\`python
for day in ['Mon', 'Tue', 'Wed']:
    print(day)

for i in range(3):      # i takes the values 0, 1, 2
    print(i)
\`\`\`

Most simulations follow one recipe. Write a function that runs **one trial**, then a loop that runs many trials, and collect the results with an **accumulator**.

\`\`\`python
def one_day(rng, n_people=23):
    birthdays = rng.integers(1, 366, size=n_people)
    return len(set(birthdays.tolist())) < n_people   # True if any repeat

rng = np.random.default_rng(107)
hits = 0
for i in range(10000):
    if one_day(rng):
        hits += 1
print(hits / 10000)
\`\`\`

\`set\` keeps one copy of each value, so a repeat makes it shorter than the list. \`hits += 1\` is short for \`hits = hits + 1\`. The answer is about 0.507, which surprises most people: among 23 people a shared birthday is more likely than not. Using the computer this way, to estimate an answer by repeating chance, is called a **Monte Carlo** estimate.

When you want the whole distribution, collect results in a list with \`append\` and turn it into a Series:

\`\`\`python
results = []
for i in range(10000):
    results.append(rng.integers(1, 7, size=2).sum())
pd.Series(results).value_counts().sort_index().plot.bar()
\`\`\`

**Pitfalls.** Set up the accumulator *before* the loop, or you reset it every time. Only indented lines repeat. Check the simulation against a case you can work out by hand before you trust it on one you cannot. More trials shrink the simulation's noise, but they do not fix a wrong model. In a machine problem, a good habit is to run 10 trials first to catch bugs, then 10,000 for the answer.`,
          resources: [
            discovery('For Loops in Python', 'Simulation-and-Distributions/For-Loops-in-Python', 'Loops with examples.'),
            discovery('Simple Simulations in Python', 'Simulation-and-Distributions/Simple-Simulations-in-Python', 'Trials, counting and estimating.'),
            inferential('Chapter 9, Randomness, especially sections on iteration and simulation.'),
          ],
          exercises: [
            {
              slug: 'birthday-curve',
              title: 'The birthday curve',
              prompt:
                'Using `one_day` from the lesson, estimate the probability of a shared birthday for groups of 10, 23, 40 and 60 people with 10,000 trials each and a seed. Put the group sizes in a list and loop over it. Compare 23 with the exact 0.507. Plot probability against group size with labelled axes.',
              kind: 'simulation',
              difficulty: 2,
            },
            {
              slug: 'monty-hall',
              title: 'Simulate the Monty Hall problem',
              prompt:
                'There are three doors, one with a car. You pick a door, the host opens a different door with no car, and you may switch. Write `one_game(rng, switch)`, which returns True if you win. Run 20,000 games for each strategy. Staying should win about 1/3 of the time and switching about 2/3. In your own words, explain why switching helps.',
              kind: 'simulation',
              difficulty: 2,
            },
            {
              slug: 'streaks-in-coin-flips',
              title: 'How long is the longest streak?',
              prompt:
                'Write a function that takes a list of True and False values and uses a for-loop to return the length of the longest run of True. Test it with `assert` on three small lists you work out by hand, including an empty run. Then simulate 365 fair coin flips 2,000 times and plot a histogram of the longest run of heads. What does this say about whether a streak is surprising?',
              kind: 'simulation',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            { question: 'What is the two-part recipe for a simulation?', answerOutline: 'A function for one trial, and a loop that repeats it and collects results in an accumulator.' },
            { question: 'Where must you create a counter, and why?', answerOutline: 'Before the loop. Inside the loop it would reset on each pass.' },
            { question: 'How can you test a simulation?', answerOutline: 'Compare it with a case you can solve exactly, such as a known probability, before you use it on a harder one.' },
          ],
          relatedLessons: [
            'programming-fundamentals/control-flow-functions/loops-and-iteration',
            'probability-statistics/limit-theorems-and-sampling/random-numbers-and-simulation',
          ],
        },
        {
          slug: 'the-normal-distribution',
          title: 'The normal distribution',
          summary:
            'The bell curve, standard units and the 68-95-99.7 rule, and how to check whether real data fits.',
          estimatedMinutes: 75,
          objectives: [
            'Describe a normal distribution by its mean and standard deviation',
            'Convert a value to standard units',
            'Use the 68-95-99.7 rule',
            'Simulate normal data and compare it with a real variable',
          ],
          concepts: [
            'Bell curve',
            'Mean and standard deviation as parameters',
            'Standard units (z-score)',
            '68-95-99.7 rule',
            'rng.normal',
            'Checking fit with a histogram',
          ],
          explanation: `Many measurements, such as heights or test scores, pile up around a central value and thin out evenly on both sides. The ideal version of this shape is the **normal distribution**, the bell curve. It is completely described by two numbers: its mean $\\mu$, which sets the centre, and its standard deviation $\\sigma$, which sets the width.

To compare values from different scales, convert them to **standard units**, also called z-scores:

$$ z = \\frac{x - \\mu}{\\sigma} $$

A $z$ of 2 means *two standard deviations above the mean*, whatever the original units were. For any normal distribution:

- about 68% of values lie within 1 standard deviation of the mean,
- about 95% within 2,
- about 99.7% within 3.

So if adult heights have mean 170 cm and standard deviation 8 cm, about 95% lie between 154 and 186 cm, and a height of 194 cm is 3 standard deviations up, which is rare.

\`\`\`python
rng = np.random.default_rng(107)
sim = rng.normal(loc=170, scale=8, size=100000)
abs_z = abs((sim - 170) / 8)
(abs_z < 1).mean(), (abs_z < 2).mean()    # close to 0.68 and 0.95
\`\`\`

Real data is never perfectly normal, so check before you use the rule. Draw a histogram, look at the shape, then test the 68% rule on the column itself. Gentoo body mass is roughly bell-shaped. Old Faithful's eruptions are clearly not, so the rule fails badly there. Income is skewed, so it fails too.

**Pitfall.** Never apply 68-95-99.7 to data without looking at it. Rules about the normal distribution say nothing about a variable that is not close to normal. Module 7 shows why the normal curve still appears everywhere: averages of many things tend towards it, even when the things themselves do not follow it.`,
          resources: [
            discovery('Normal Distribution', 'Simulation-and-Distributions/Normal-Distribution', 'The normal curve and standard units.'),
            { ...openIntro, note: 'Section 4.1 on the normal distribution.' },
          ],
          exercises: [
            {
              slug: 'check-the-rule',
              title: 'Test 68-95-99.7 on data',
              prompt:
                'For Gentoo `body_mass_g`, and then for Old Faithful `eruptions`, compute the share of values within 1 and within 2 standard deviations of the mean, using that column\'s own mean and standard deviation. Draw both histograms. Which variable obeys the rule better? Explain why from the shape.',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'z-scores-compared',
              title: 'Compare across scales',
              prompt:
                'A student scores 1300 on a test with mean 1050 and standard deviation 200, and 29 on another with mean 21 and standard deviation 5. Convert both to standard units. They should be 1.25 and 1.6. Which is the stronger score? State what you assume about the two groups of test takers.',
              kind: 'problem',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            { question: 'Which two numbers define a normal distribution?', answerOutline: 'The mean, which sets the centre, and the standard deviation, which sets the width.' },
            { question: 'What does a z-score of -1.5 mean?', answerOutline: 'The value is 1.5 standard deviations below the mean.' },
            { question: 'When would the 68-95-99.7 rule mislead you?', answerOutline: 'For skewed or multi-peaked data that is not close to normal, such as income or Old Faithful eruptions.' },
          ],
          relatedLessons: ['probability-statistics/random-variables-and-distributions/continuous-distributions'],
        },
        {
          slug: 'law-of-large-numbers',
          title: 'The law of large numbers',
          summary:
            'Averages settle down as trials pile up. This is why simulation works, and also why the gambler\'s fallacy is wrong.',
          estimatedMinutes: 60,
          objectives: [
            'State the law of large numbers in plain words',
            'Plot a running average and see it settle',
            'Explain the gambler\'s fallacy',
            'Estimate how many trials a simulation needs',
          ],
          concepts: [
            'Law of large numbers',
            'Running average',
            'Expected value',
            "Gambler's fallacy",
            'Noise shrinks like $1/\\sqrt{n}$',
          ],
          explanation: `Flip a fair coin 10 times and you might get 70% heads. Flip it 10,000 times and the share will be very close to 50%. This is the **law of large numbers**: as the number of independent trials grows, the average of the results gets closer to the **expected value**, the long-run average of one trial. For a die the expected value is 3.5, even though no roll is ever 3.5.

\`\`\`python
rng = np.random.default_rng(107)
rolls = pd.Series(rng.integers(1, 7, size=5000))
running = rolls.expanding().mean()   # average of the first 1, 2, 3 ... rolls
running.plot()
plt.axhline(3.5)
plt.xlabel('Number of rolls'); plt.ylabel('Average so far')
\`\`\`

The line swings widely early on, then settles. This is the reason simulation works: the share of hits in many trials is a reliable estimate of the true probability.

How many trials do you need? The noise in an average shrinks in proportion to $1/\\sqrt{n}$. To cut the noise in half you need four times as many trials, so accuracy gets expensive. For an estimated proportion, 10,000 trials gives roughly plus or minus one percentage point, and that is enough for most of this course.

**The gambler's fallacy** is the belief that after a run of heads, tails is due. The coin has no memory. The share of heads moves towards 50% not because tails catch up, but because the early run gets swamped by many later flips. After 8 heads in a row, the chance of heads on the next flip is still 1/2.

**Pitfalls.** The law applies to averages over many trials. It says nothing about the next single trial. It also assumes trials are independent and from the same process. An average of polls that all share the same bias settles down on the wrong number, a point that matters a great deal in the final project.`,
          resources: [
            discovery('Law of Large Numbers', 'Simulation-and-Distributions/Law-of-Large-Numbers', 'Convergence of averages, shown with simulation.'),
            { title: 'Seeing Theory', url: 'https://seeing-theory.brown.edu/', type: 'interactive', cost: 'free', provider: 'Brown University', note: 'Chapter 1, Expectation, has a law of large numbers animation.' },
          ],
          exercises: [
            {
              slug: 'running-averages',
              title: 'Five running averages',
              prompt:
                'Plot five running averages of 5,000 die rolls on one chart, using one generator and a for-loop. Add a horizontal line at 3.5. Then compute the average of 100 rolls, 500 times over, and do the same for 400 rolls. The standard deviation of the second set should be about half that of the first. Explain why.',
              kind: 'simulation',
              difficulty: 2,
            },
            {
              slug: 'gamblers-fallacy-test',
              title: 'Test the gambler\'s fallacy',
              prompt:
                'Simulate 200,000 fair coin flips as a list. Use a for-loop to find every position that follows three heads in a row, and compute the share of heads in the next flip. It should be close to 0.5. Explain how this refutes the idea that tails is due.',
              kind: 'simulation',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            { question: 'What does the law of large numbers say?', answerOutline: 'The average of many independent trials gets closer to the expected value as the number of trials grows.' },
            { question: 'Why is the gambler\'s fallacy wrong?', answerOutline: 'Independent trials have no memory. Early imbalance is swamped by later trials, and is not corrected by them.' },
            { question: 'How many times more trials do you need to halve simulation noise?', answerOutline: 'Four times, because noise shrinks like one over the square root of the number of trials.' },
          ],
          relatedLessons: ['probability-statistics/limit-theorems-and-sampling/law-of-large-numbers'],
        },
      ],
    },
    {
      slug: 'probability-for-prediction',
      title: 'Probability for Prediction',
      description:
        'The rules that let you combine chances and update them with evidence: addition and multiplication rules, complements, conditional probability and Bayes\' theorem.',
      lessons: [
        {
          slug: 'addition-rule-and-complements',
          title: 'The addition rule and complements',
          summary:
            'The chance of A or B, why you must not count the overlap twice, and how "at least one" is easiest through its opposite.',
          estimatedMinutes: 60,
          objectives: [
            'Apply the addition rule, including the overlap term',
            'Recognise mutually exclusive events',
            'Use the complement rule',
            'Check a rule against shares computed from data',
          ],
          concepts: [
            'A or B, A and B',
            'Addition rule',
            'Mutually exclusive events',
            'Complement',
            'Venn diagram',
          ],
          explanation: `Probability rules let you work out the chance of a combined event from simpler pieces. Start with **or**. In probability, *A or B* means A, B, or both. Adding the two chances counts the overlap twice, so you subtract it once:

$$ P(A \\text{ or } B) = P(A) + P(B) - P(A \\text{ and } B) $$

If a card is drawn from a deck, then $P(\\text{heart or king}) = 13/52 + 4/52 - 1/52 = 16/52$. The king of hearts is the overlap. If two events cannot happen together, they are **mutually exclusive**, the overlap is zero, and you simply add. A single roll cannot be both 2 and 5.

The **complement** of A is everything that is not A, and exactly one of them must happen:

$$ P(\\text{not } A) = 1 - P(A) $$

This is a powerful trick. When a direct count looks hard, count the opposite. *At least one* almost always gets easier as *one minus none*, which the next lesson uses.

You can check these rules on real data, where a probability is the share of rows. Masks make it quick:

\`\`\`python
dd = pd.read_csv('https://vincentarelbundock.github.io/Rdatasets/csv/ISLR/Default.csv')
a = dd['balance'] > 2000
b = dd['student'] == 'Yes'
(a | b).mean()                                # direct
a.mean() + b.mean() - (a & b).mean()          # by the rule: the same number
\`\`\`

\`|\` and \`&\` are the same *or* and *and* you used for selecting rows. That is no coincidence: selecting rows and combining events are the same operation.

**Pitfalls.** Adding probabilities without checking for overlap can give a result above 1, which is always a sign of error. In everyday speech, *or* often means one or the other but not both. In probability it includes both. Mutually exclusive is a different idea from independent, which is the topic of the next lesson. Mutually exclusive events cannot be independent, unless one is impossible.`,
          resources: [
            discovery('Multi-event Probability: Addition Rule', 'Prediction-and-Probability/Multi-event-Probability-Addition-Rule', 'The rule, with worked cases.'),
            discovery('Complements and Special Cases', 'Prediction-and-Probability/Complements-and-Special-Cases', 'Complements and how to spot special cases.'),
            { ...openIntro, note: 'Section 3.1 on defining probability.' },
          ],
          exercises: [
            {
              slug: 'addition-on-default',
              title: 'Verify the rule on data',
              prompt:
                'Load the credit `Default.csv` from this lesson (10,000 rows). Let A be `balance > 2000` and B be `student == Yes`. Compute P(A), P(B), P(A and B) and P(A or B) directly with masks. Confirm the addition rule gives P(A or B), which is 0.2987. Are A and B mutually exclusive? How do you know?',
              kind: 'data-analysis',
              difficulty: 1,
            },
            {
              slug: 'cards-by-hand',
              title: 'Cards by hand',
              prompt:
                'From a standard deck, compute by hand: P(red or face card), P(ace or king), P(not a spade), and the chance a five-card hand is not all one suit if P(all one suit) is 0.00198. Show the overlap term wherever there is one. Then simulate P(red or face card) with 100,000 draws from a Python list of 52 cards and compare.',
              kind: 'problem',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            { question: 'Why does the addition rule subtract P(A and B)?', answerOutline: 'Outcomes in both events are counted twice by P(A) + P(B), so one copy of the overlap must be removed.' },
            { question: 'What does mutually exclusive mean?', answerOutline: 'The events cannot happen together, so P(A and B) = 0.' },
            { question: 'When is the complement rule most useful?', answerOutline: 'When the opposite event is easier to count, as in at-least-one problems.' },
          ],
          relatedLessons: ['probability-statistics/probability-foundations/sample-spaces-and-axioms'],
        },
        {
          slug: 'multiplication-rule-and-independence',
          title: 'The multiplication rule and independence',
          summary:
            'The chance of A and B, what independence really means, and why "at least one" problems surprise people.',
          estimatedMinutes: 60,
          objectives: [
            'Apply the multiplication rule for independent events',
            'Decide from data whether two events look independent',
            'Compute at-least-one probabilities with complements',
            'Explain why assuming independence can be dangerous',
          ],
          concepts: [
            'A and B',
            'Independent events',
            'Multiplication rule',
            'Dependence',
            'At least one: 1 minus none',
            'Correlated failures',
          ],
          explanation: `Two events are **independent** if knowing that one happened does not change the chance of the other. Coin flips are independent. Rain today and rain tomorrow are not, as you will measure in Machine Problem 2.

For independent events, chances multiply:

$$ P(A \\text{ and } B) = P(A) \\times P(B) $$

Three heads in a row has probability $(1/2)^3 = 1/8$. Combined with the complement rule, this answers *at least one* questions. If a website fails on 1% of days, the chance of at least one failure in 30 days, assuming independence, is

$$ 1 - 0.99^{30} \\approx 0.26 $$

which is much higher than most people guess.

You can test independence on data by comparing the actual share of *A and B* with what independence predicts:

\`\`\`python
tips = pd.read_csv('https://vincentarelbundock.github.io/Rdatasets/csv/reshape2/tips.csv')
a = tips['smoker'] == 'Yes'
b = tips['time'] == 'Dinner'
(a & b).mean(), a.mean() * b.mean()   # about 0.287 and 0.275
\`\`\`

These are close, and with 244 rows a gap this small could easily be chance, so there is no clear evidence of dependence here.

**Pitfalls.** Multiplying chances for dependent events gives wrong answers, sometimes disastrously. Failures of two backup systems are often linked by one flood or one bad software update. In 2008, models that treated mortgage defaults as nearly independent badly understated the risk that many would fail together. Always ask whether a shared cause links your events. Do not confuse independent with mutually exclusive: if A and B are mutually exclusive and A happened, you know B did not, which is the opposite of independent.

When events are not independent, the general rule uses a conditional probability, $P(A \\text{ and } B) = P(A) \\times P(B \\mid A)$. The next lesson defines that bar.`,
          resources: [
            discovery('Multi-event Probability: Multiplication Rule', 'Prediction-and-Probability/Multi-event-Probability-Multiplication-Rule', 'Independent and dependent events.'),
            { ...openIntro, note: 'Section 3.1 on independence, and section 3.2 for the general rule.' },
          ],
          exercises: [
            {
              slug: 'at-least-one',
              title: 'At least one',
              prompt:
                'Assuming independence, compute by hand the chance of: (a) at least one six in 4 die rolls (about 0.518); (b) at least one failure in 365 days if P(failure) is 0.001 a day; (c) at least one match in 10 lottery tickets, each with a 1 in 300 chance. Simulate (a) with a for-loop and 20,000 trials to check your answer.',
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'test-independence-on-tips',
              title: 'Are these independent?',
              prompt:
                'On the tips data, compare P(A and B) with P(A) times P(B) for two pairs: `sex == Female` and `smoker == Yes`, then `day == Sun` and `time == Dinner`. For which pair is the gap large? Explain the reason for the second pair from what you know about restaurants. Say why a small gap does not prove independence.',
              kind: 'data-analysis',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            { question: 'What does it mean for two events to be independent?', answerOutline: 'Knowing one happened does not change the probability of the other, so P(A and B) = P(A)P(B).' },
            { question: 'How do you compute the chance of at least one success in n independent tries with chance p?', answerOutline: '$1 - (1-p)^n$, using the complement of no successes.' },
            { question: 'Give a real situation where assuming independence is dangerous.', answerOutline: 'Backup systems or mortgage defaults that share a common cause, so they fail together more often than multiplication predicts.' },
          ],
        },
        {
          slug: 'conditional-probability',
          title: 'Conditional probability',
          summary:
            'Update a chance when you know something more. In a DataFrame, that means filtering first.',
          estimatedMinutes: 90,
          objectives: [
            'Define and compute P(A | B) from a table',
            'Compute conditional probabilities by filtering a DataFrame',
            'Make a table of conditional shares with `pd.crosstab`',
            'Explain why P(A | B) differs from P(B | A)',
            'Compare each row with the one before it using `shift`',
          ],
          concepts: [
            'Conditional probability',
            'P(A | B) = P(A and B) / P(B)',
            'Filtering as conditioning',
            'pd.crosstab',
            'Confusing the inverse',
            'shift(1)',
          ],
          explanation: `A **conditional probability** $P(A \\mid B)$ is the chance of A given that B happened. Knowing B shrinks your world to the cases where B is true, and you then ask how often A occurs inside that world:

$$ P(A \\mid B) = \\frac{P(A \\text{ and } B)}{P(B)} $$

In pandas, conditioning is filtering. In the credit data, 3.33% of people default overall. Among people with a balance over 2000:

\`\`\`python
high = dd[dd['balance'] > 2000]
(high['default'] == 'Yes').mean()          # about 0.764
\`\`\`

Knowing the balance changes the chance from about 3% to about 76%. That is what makes prediction possible, and conditional probability is the foundation of every classifier you will meet.

\`pd.crosstab\` gives conditional shares for all categories at once. With \`normalize='index'\`, each row adds up to 1:

\`\`\`python
pd.crosstab(dd['student'], dd['default'], normalize='index')
\`\`\`

The order of the bar matters. $P(\\text{default} \\mid \\text{high balance})$ is 0.764, but $P(\\text{high balance} \\mid \\text{default})$ is 0.243, because most people who default do not have balances that high. Mixing these up is called **confusing the inverse**, and it causes real harm, for example when someone reads a test's accuracy as the chance a patient is sick.

Sometimes the condition is about the previous row. \`shift(1)\` moves a column down one row, so you can compare today with yesterday. On sorted data:

\`\`\`python
days = pd.DataFrame({'wet': [True, True, False, True]})
days['wet_yesterday'] = days['wet'].shift(1)
days[days['wet_yesterday'] == True]['wet'].mean()
\`\`\`

The first row has no previous value, so it gets NaN and is left out of the selection.

**Pitfall.** Conditioning on a small group gives a noisy estimate. Always report how many rows are inside the condition. 76% from 106 people is much weaker than 76% from 10,000.`,
          resources: [
            discovery('Conditional Probability', 'Prediction-and-Probability/Conditional-Probability', 'Definition and worked examples.'),
            { ...openIntro, note: 'Section 3.2 on conditional probability.' },
            { title: 'Seeing Theory', url: 'https://seeing-theory.brown.edu/', type: 'interactive', cost: 'free', provider: 'Brown University', note: 'Chapter 2, Compound Probability, has a conditional probability visual.' },
          ],
          exercises: [
            {
              slug: 'conditional-on-default',
              title: 'Conditioning on the credit data',
              prompt:
                'Verify that P(default) is 0.0333, P(default given student) is about 0.043 and P(default given non-student) is about 0.029. Compute P(student given default), about 0.381. Is being a student informative? Use `pd.crosstab` with `normalize=\'index\'` and again with `normalize=\'columns\'`, and explain what each table conditions on.',
              kind: 'data-analysis',
              difficulty: 1,
            },
            {
              slug: 'inverse-confusion',
              title: 'Spot the confusion',
              prompt:
                'A news story says 80% of people who had a car crash had driven in the past day, so driving recently makes crashes likely. Say which conditional probability was reported and which one matters. Write a clear version of the claim with the correct direction. Give a second example of your own, from health or law.',
              kind: 'writing',
              difficulty: 2,
            },
            {
              slug: 'yesterday',
              title: 'Does today depend on yesterday?',
              prompt:
                'Using a seeded generator, simulate 100,000 independent days with chance of rain 0.3. Add a `yesterday` column with `shift(1)` and compute P(rain given rain yesterday). It should be close to 0.3. Explain why, and say what you would expect if real weather had memory. Do not use real weather here. That is for the machine problem.',
              kind: 'simulation',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            { question: 'How do you compute P(A | B) in pandas?', answerOutline: 'Filter to rows where B is true, then take the share of those rows where A is true.' },
            { question: 'Why does P(A | B) usually differ from P(B | A)?', answerOutline: 'They divide by different groups: the size of B versus the size of A.' },
            { question: 'What does `shift(1)` do, and what happens to the first row?', answerOutline: 'It moves values down one row so each row sees the previous value. The first row gets NaN.' },
          ],
          relatedLessons: ['probability-statistics/probability-foundations/conditional-probability-and-independence'],
        },
        {
          slug: 'bayes-theorem',
          title: "Bayes' theorem",
          summary:
            'Turn P(evidence | cause) into P(cause | evidence). Base rates matter more than almost anyone expects.',
          estimatedMinutes: 90,
          objectives: [
            "State Bayes' theorem and identify its parts",
            'Solve a screening problem with a table of counts',
            'Explain the base rate fallacy',
            "Check Bayes' theorem on a real dataset",
          ],
          concepts: [
            "Bayes' theorem",
            'Prior, likelihood and posterior',
            'Base rate',
            'False positive',
            'Base rate fallacy',
            'Natural frequencies',
          ],
          explanation: `Often you know how likely the evidence is given a cause, but you want the reverse. **Bayes' theorem** flips the condition:

$$ P(A \\mid B) = \\frac{P(B \\mid A)\\,P(A)}{P(B)} $$

Here $P(A)$ is the **prior**, your belief before the evidence. $P(B \\mid A)$ is the **likelihood** of the evidence if A is true. $P(A \\mid B)$ is the **posterior**, your updated belief.

The classic use is medical screening. Suppose 1% of people have a disease, and a test catches 99% of cases but also gives a false alarm on 5% of healthy people. You test positive. What is the chance you are sick? Most people say about 95%. Picture 10,000 people instead:

| | Test positive | Test negative | Total |
|---|---|---|---|
| Sick | 99 | 1 | 100 |
| Healthy | 495 | 9405 | 9900 |

Of 594 positives, only 99 are sick, so the answer is about 17%. The test is good, but healthy people so outnumber sick people that false alarms dominate. Forgetting this is the **base rate fallacy**. Counting people in a table, known as **natural frequencies**, avoids it and is easier to explain to anyone.

The bottom of the formula is the total chance of the evidence, which you can split by cause:

$$ P(B) = P(B \\mid A)P(A) + P(B \\mid \\text{not } A)P(\\text{not } A) $$

Check it: $0.99 \\times 0.01 + 0.05 \\times 0.99 = 0.0594$, and $0.0099 / 0.0594 \\approx 0.167$.

**Pitfalls.** A posterior is only as good as its prior. Screening a high-risk group, where the base rate is higher, gives a very different answer from the same test on the general public. A positive test usually justifies a second, independent test, which is why screening programmes work in stages.

**Reflection.** The same arithmetic applies to any automated flagging system: a fraud alert, a plagiarism checker or a face match. When the thing being looked for is rare, most flags are false, and real people bear the cost. Before you build such a system, work out the base rate.`,
          resources: [
            discovery("Bayes' Theorem", 'Prediction-and-Probability/Bayes-Theorem', 'The theorem with worked examples.'),
            { title: "Bayes' theorem", url: 'https://www.3blue1brown.com/lessons/bayes-theorem', type: 'video', cost: 'free', provider: '3Blue1Brown', note: 'A geometric way to see why the base rate matters.' },
            { ...openIntro, note: "Section 3.2 on tree diagrams and Bayes' theorem." },
          ],
          exercises: [
            {
              slug: 'screening-table',
              title: 'Screening with a table',
              prompt:
                'A test has sensitivity 90% and a false positive rate of 2%. Build a table of counts for 100,000 people for base rates of 0.1%, 1% and 10%, and compute P(sick given positive) each time. Check one result with the formula. Write two sentences telling a patient what a positive result means for each base rate.',
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'bayes-on-default',
              title: 'Check Bayes on real data',
              prompt:
                'On the credit data, let A be `default == Yes` and B be `balance > 2000`. Directly compute P(A), P(B), P(B given A) and P(A given B). Then compute P(A given B) by Bayes from the other three and confirm it matches 0.764. Explain why the direct way was available here, and when you would need Bayes instead.',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'simulate-screening',
              title: 'Simulate the screening',
              prompt:
                'Simulate 1,000,000 people as NumPy arrays: each is sick with probability 0.01, and tests positive with probability 0.99 if sick and 0.05 if healthy. Compute the share of positives who are sick and compare with the exact 0.1667. Then write about what happens if you retest every positive with an independent test of the same quality.',
              kind: 'simulation',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            { question: 'In one sentence, what does Bayes\' theorem do?', answerOutline: 'It reverses a conditional probability, updating a prior belief into a posterior using the likelihood of the evidence.' },
            { question: 'Why can a 99% accurate test still give mostly false positives?', answerOutline: 'When a condition is rare, the many healthy people produce more false positives than the few sick people produce true positives.' },
            { question: 'How does a table of counts help?', answerOutline: 'It makes the sizes of the groups visible, so you divide true positives by all positives without needing the formula.' },
          ],
          relatedLessons: ['probability-statistics/probability-foundations/bayes-theorem'],
        },
      ],
    },
    {
      slug: 'towards-machine-learning',
      title: 'Towards Machine Learning',
      description:
        'From describing to predicting: correlation, simple linear regression, scikit-learn, train and test splits, and finding groups with clustering.',
      lessons: [
        {
          slug: 'correlation',
          title: 'Correlation',
          summary:
            'Measure how closely two variables move together, and learn the three ways that one number can mislead you.',
          estimatedMinutes: 75,
          objectives: [
            'Interpret a correlation coefficient',
            'Compute correlation with pandas',
            'Show that correlation alone can hide the shape of a relationship',
            'Explain why correlation does not establish cause',
          ],
          concepts: [
            'Correlation coefficient r',
            'Strength and direction',
            'Linear relationships only',
            "Anscombe's quartet",
            'Correlation is not causation',
          ],
          explanation: `A scatter plot shows a relationship, and the **correlation coefficient** $r$ summarises it in one number between $-1$ and $1$. Positive means the variables rise together, negative means one falls as the other rises, and 0 means no *straight-line* relationship. To compute it, put both variables in standard units, multiply them pairwise, and average:

$$ r = \\frac{1}{n-1}\\sum_{i=1}^{n} z_{x,i}\\, z_{y,i} $$

Points in the upper right and lower left give positive products, and the other two corners give negative ones. Because it uses standard units, $r$ has no units and does not change if you switch from grams to kilograms.

\`\`\`python
faithful['eruptions'].corr(faithful['waiting'])    # about 0.90
\`\`\`

Longer eruptions tend to be followed by longer waits.

One number can mislead you in three ways.

**Shape.** $r$ only measures straight-line association. A perfect U-shape can have $r = 0$. Anscombe's quartet is four small datasets with almost the same means and the same $r$ of about 0.816, yet their scatter plots look completely different. Always plot first.

**Mixing groups.** Across all penguins, bill length and bill depth have $r \\approx -0.24$, but within each species the correlation is positive, between about 0.39 and 0.65. The negative overall value comes from comparing different species, and this is Simpson's paradox again.

**Cause.** A strong correlation does not establish cause. Ice cream sales and drownings rise together because of summer. You met this in the study design module.

**Pitfall.** Correlation is sensitive to outliers. A single extreme point can create or destroy a high $r$. Also, $r$ of 0.5 is not *half* of a perfect relationship. Squaring gives $r^2 = 0.25$, the share of the variation in one variable that a line through the other explains, which the next lesson uses.`,
          resources: [
            discovery('Correlation', 'Towards-Machine-Learning/Correlation', 'Computing and interpreting correlation.'),
            inferential('Chapter 15.1, Correlation, including standard units and nonlinear pitfalls.'),
          ],
          exercises: [
            {
              slug: 'anscombe',
              title: "Anscombe's quartet",
              prompt:
                'Load `https://vincentarelbundock.github.io/Rdatasets/csv/datasets/anscombe.csv`. Using a for-loop over 1 to 4, compute the mean of each y and the correlation of each x with its y. They should be about 7.5 and 0.816 for all four. Plot all four scatters. Describe in one sentence each what the correlation fails to tell you.',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'simpsons-correlation',
              title: 'Correlation inside groups',
              prompt:
                'Compute the correlation of `bill_length_mm` and `bill_depth_mm` across all penguins, about -0.235, then within each species with a loop or `groupby`. They should be about 0.39, 0.65 and 0.64. Make a scatter coloured by species. Explain the sign change to someone who has not taken this course.',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'by-hand-r',
              title: 'Correlation by hand',
              prompt:
                'For points (1, 2), (2, 3), (3, 5), (4, 4), (5, 6), compute $r$ using standard units, with a table of $z_x$, $z_y$ and their product. Confirm with pandas. What happens to $r$ if you multiply every x by 10? If you add a point at (20, 0)? Predict first, then check.',
              kind: 'problem',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            { question: 'What does r = 0 tell you and what does it not tell you?', answerOutline: 'No straight-line association. There could still be a strong curved relationship.' },
            { question: "What does Anscombe's quartet teach?", answerOutline: 'Datasets with the same summaries can look very different, so always plot.' },
            { question: 'Why does changing units not change r?', answerOutline: 'It is computed from standard units, which have no units.' },
          ],
        },
        {
          slug: 'simple-linear-regression',
          title: 'Simple linear regression',
          summary:
            'Fit the best straight line, read its slope and intercept, and use residuals to see what the line misses.',
          estimatedMinutes: 90,
          objectives: [
            'Interpret the slope and intercept of a fitted line',
            'Explain what least squares minimises',
            'Make a prediction and compute a residual',
            'Explain regression to the mean',
          ],
          concepts: [
            'Regression line',
            'Slope and intercept',
            'Least squares',
            'Prediction and residual',
            '$R^2$',
            'Extrapolation',
            'Regression to the mean',
          ],
          explanation: `Correlation says how strong a line is. **Linear regression** gives you the line itself, which you can use to predict:

$$ \\hat{y} = b_0 + b_1 x $$

The **slope** $b_1$ is the predicted change in $y$ for each one-unit increase in $x$. The **intercept** $b_0$ is the predicted $y$ when $x = 0$, which often has no practical meaning. The hat on $\\hat{y}$ marks a prediction.

The line chosen is the one with the smallest sum of squared **residuals**, called **least squares**. A residual is what the line missed: $y - \\hat{y}$. Squaring stops positive and negative misses cancelling, and punishes big misses. The slope has a tidy form, $b_1 = r \\, s_y / s_x$, so it is the correlation rescaled into the units of the data.

\`\`\`python
slope, intercept = np.polyfit(faithful['eruptions'], faithful['waiting'], 1)
slope, intercept       # about 10.73 and 33.47
intercept + slope * 4  # about 76.4 minutes
\`\`\`

So each extra minute of eruption goes with about 10.7 more minutes of waiting. $R^2 = r^2 \\approx 0.81$ here, meaning the line accounts for 81% of the variation in waiting time.

Always plot the residuals against $x$. Random scatter around zero is good. A curve or a fan shape means a straight line is the wrong model. Note that the same scatter gives a different line if you swap $x$ and $y$, because a regression minimises vertical misses only.

**Regression to the mean.** Galton found that tall parents had tall children, but less extremely so: for his data the slope is about 0.65. Any time two measures are imperfectly correlated, extreme values on one tend to be less extreme on the other. A class that scores worst on one test usually improves on the next, even if nothing changed. Do not credit an intervention for this.

**Pitfalls.** Extrapolating beyond the data is risky: the line says nothing about an eruption of 20 minutes. Regression gives association, not cause, unless the data came from an experiment. This course stops at one predictor. Data Science Exploration covers multiple regression.`,
          resources: [
            discovery('Linear Regression', 'Towards-Machine-Learning/Linear-Regression', 'Fitting and using a regression line.'),
            { ...openIntro, note: 'Chapter 8, Introduction to linear regression.' },
            inferential('Chapters 15.2 to 15.5 on the regression line and residuals.'),
          ],
          exercises: [
            {
              slug: 'faithful-line',
              title: 'Fit and check a line',
              prompt:
                'For Old Faithful, fit `waiting` from `eruptions` with `np.polyfit`. Confirm a slope of about 10.73 and an intercept of about 33.47. Add a `predicted` column and a `residual` column. Plot the data with the line, then plot residuals against eruptions. Does a straight line look adequate? What does the intercept mean, and is that meaningful?',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'galton-mean-reversion',
              title: 'Regression to the mean',
              prompt:
                'Load `https://vincentarelbundock.github.io/Rdatasets/csv/HistData/Galton.csv`. Fit `child` from `parent` and confirm a slope near 0.65. Predict the height of a child of parents 3 inches above the mean, and of parents 3 inches below. Explain regression to the mean, and say why this is not a claim that everyone will become average.',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'slope-from-r',
              title: 'Slope from correlation',
              prompt:
                'Compute the Old Faithful slope again using $b_1 = r s_y / s_x$ from `corr` and `std`, and check it against `polyfit`. Then swap the roles to fit `eruptions` from `waiting`. Show that the two slopes are not reciprocals of each other, and explain why, using what least squares measures.',
              kind: 'derivation',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            { question: 'How do you read a slope of 10.7 here?', answerOutline: 'Each additional minute of eruption is associated with about 10.7 more minutes of predicted waiting.' },
            { question: 'What does a residual plot show when a line is a poor fit?', answerOutline: 'A pattern such as a curve or fan shape, not random scatter around zero.' },
            { question: 'What is regression to the mean?', answerOutline: 'With imperfect correlation, extreme values on one measure tend to be nearer the average on the other, without any intervention.' },
          ],
          relatedLessons: ['probability-statistics/hypothesis-testing-and-regression/linear-regression-and-least-squares'],
        },
        {
          slug: 'scikit-learn-and-train-test-splits',
          title: 'scikit-learn and train/test splits',
          summary:
            'Fit models with a standard interface, and test them honestly on data they have never seen.',
          estimatedMinutes: 90,
          objectives: [
            'Fit a model and predict with scikit-learn',
            'Split data into training and test sets',
            'Compare training and test scores',
            'Explain overfitting and data leakage in simple terms',
          ],
          concepts: [
            'Model, fit and predict',
            'Features X and target y',
            'train_test_split',
            'random_state',
            'Generalisation',
            'Overfitting',
            'Splitting by time',
            'Mean absolute error',
          ],
          explanation: `Machine learning means fitting a model to data so that it predicts well on **new** data. **scikit-learn** is the standard Python library for it, and every model follows the same pattern. Install it with \`.venv\\Scripts\\python -m pip install scikit-learn\`.

\`\`\`python
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split

X = faithful[['eruptions']]     # double brackets: a table of features
y = faithful['waiting']         # single brackets: the target

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.25, random_state=107)

model = LinearRegression()
model.fit(X_train, y_train)
model.coef_, model.intercept_   # slope and intercept
model.score(X_train, y_train)   # R squared on training data
model.score(X_test, y_test)     # R squared on test data
\`\`\`

A model is judged on data it did not learn from. If you score it on its training data, you only measure its memory. A model can achieve a perfect training score by memorising noise, then fail on anything new. That failure is called **overfitting**. So set aside a **test set** at the start, fit only on the training set, and touch the test set at the end. Here, the training $R^2$ is about 0.82 and the test $R^2$ about 0.79, a small gap which suggests the line generalises.

\`random_state\` is a seed for the shuffle. Without it, your numbers change on each run.

Also report error in units people understand. The **mean absolute error** is the average size of the misses: \`abs(model.predict(X_test) - y_test).mean()\`.

**Pitfalls.** If rows are ordered in time, a random split lets the model see the future. To predict the next election from past ones, train on earlier years and test on later years, as you will in the final project. **Leakage** means information about the answer sneaks into the features. If a feature would not be available at prediction time, drop it. A score that looks too good usually is.

Compare your model with a simple baseline, such as always predicting the mean. A complicated model that cannot beat a simple rule has not earned its place.`,
          resources: [
            discovery('Machine Learning Models in Python with sk-learn', 'Towards-Machine-Learning/Machine-Learning-Models-in-Python-with-sk-learn', 'The fit and predict pattern.'),
            discovery('Test/Train Split', 'Towards-Machine-Learning/TestTrain-Split', 'Why and how to split.'),
            { title: 'Getting Started', url: 'https://scikit-learn.org/stable/getting_started.html', type: 'documentation', cost: 'free', provider: 'scikit-learn', note: 'Read the first two sections.' },
          ],
          exercises: [
            {
              slug: 'faithful-split',
              title: 'An honest test',
              prompt:
                'Reproduce the split in this lesson with `random_state=107` and confirm 204 training and 68 test rows, slope near 10.9, training $R^2$ near 0.82 and test $R^2$ near 0.79. Report the test mean absolute error in minutes. Compare it with a baseline that always predicts the training mean of `waiting`. How much does the model help?',
              kind: 'data-analysis',
              difficulty: 1,
            },
            {
              slug: 'overfit-on-purpose',
              title: 'Overfit on purpose',
              prompt:
                'Using a small sample of 20 Old Faithful rows, fit `np.polyfit` with degree 1, 5 and 12 on 15 training rows, and measure mean absolute error on the other 5. Plot each curve. Which has the lowest training error, and which the lowest test error? Explain what this shows about model complexity.',
              kind: 'data-analysis',
              difficulty: 3,
            },
            {
              slug: 'spot-the-leak',
              title: 'Spot the leak',
              prompt:
                'A hospital wants to predict on admission whether a patient will need surgery. For each proposed feature, say whether it leaks and why: age, blood pressure on arrival, operating-room charge, length of stay, insurance type. Then describe how you would split the data if it covered ten years and the goal is to predict next year.',
              kind: 'writing',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            { question: 'Why do we need a test set?', answerOutline: 'Training scores measure memory. A test set estimates how the model does on new data.' },
            { question: 'Why do features use double brackets?', answerOutline: 'scikit-learn expects a two-dimensional table of features, and `df[[col]]` gives a DataFrame.' },
            { question: 'What is overfitting?', answerOutline: 'Fitting noise in the training data, so the training score is high while new-data performance is poor.' },
          ],
          relatedLessons: ['machine-learning/foundations-and-workflow/generalization-and-validation'],
        },
        {
          slug: 'clustering',
          title: 'Clustering',
          summary:
            'Find groups in data with no labels using k-means, and judge whether those groups mean anything.',
          estimatedMinutes: 75,
          objectives: [
            'Explain the difference between supervised and unsupervised learning',
            'Describe how k-means works',
            'Standardise features before clustering',
            'Choose k and check clusters against what you know',
          ],
          concepts: [
            'Unsupervised learning',
            'k-means algorithm',
            'Centroid',
            'Standardising features',
            'Inertia and the elbow',
            'n_init and random_state',
          ],
          explanation: `So far every model had a target to predict. **Clustering** has none. It looks for groups of similar rows in unlabelled data, and this is called **unsupervised** learning.

The most common method is **k-means**. You choose the number of clusters $k$, and the algorithm repeats two steps. It assigns each point to the nearest **centroid**, then moves each centroid to the mean of its points. It stops when nothing changes. The result depends on the starting positions, so scikit-learn tries several starts with \`n_init\` and keeps the best.

\`\`\`python
from sklearn.cluster import KMeans

cols = ['bill_length_mm', 'bill_depth_mm', 'flipper_length_mm', 'body_mass_g']
known = penguins.dropna(subset=cols).copy()
z = (known[cols] - known[cols].mean()) / known[cols].std()   # standard units

km = KMeans(n_clusters=3, n_init=10, random_state=107).fit(z)
known['cluster'] = km.labels_
pd.crosstab(known['cluster'], known['species'])
\`\`\`

**Standardise first.** k-means measures distance, and body mass runs into thousands while bill depth is under 25, so without scaling, mass alone decides everything. On penguins, using standard units, about 92% of birds land in a cluster matching their species. Without scaling, only about 68% do. This one step makes the difference.

**Choosing k.** The **inertia** is the total squared distance from points to their centroids. It always falls as $k$ grows, so plot it and look for an *elbow* where the improvement slows. There is often no clear elbow, and then your purpose must decide.

**Interpreting clusters.** k-means always returns $k$ groups, even in pure noise. The clusters are a suggestion, so you must check them. Summarise each with \`groupby\`, give it a plain name, and test whether it matches something real. Here we had the species labels to check against, which is a luxury. k-means also prefers round clusters of similar size.

**Reflection.** Clustering people into segments can look objective while baking in the data's biases, and a label given to a group sticks to its members. Ask who a grouping might harm, and whether those people would agree with it.`,
          resources: [
            discovery('Clustering', 'Towards-Machine-Learning/Clustering', 'k-means with examples.'),
            { title: 'Clustering user guide', url: 'https://scikit-learn.org/stable/modules/clustering.html', type: 'documentation', cost: 'free', provider: 'scikit-learn', note: 'Read the k-means section only.' },
          ],
          exercises: [
            {
              slug: 'penguin-clusters',
              title: 'Rediscover the species',
              prompt:
                'Cluster the 342 penguins with four measurements as in this lesson. Show the crosstab of cluster against species, and compute the share of birds in the majority species of their cluster (about 0.92). Repeat with no standardising (about 0.68). Explain the difference. Give each cluster a plain-English name from its `groupby` means.',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'elbow-plot',
              title: 'Choose k',
              prompt:
                'Compute the inertia for k from 1 to 8 on the standardised penguin data, using a loop, and plot it. Where is the elbow, if there is one? Then run k-means with k=3 on 342 rows of pure random normal numbers with four columns. It still returns three clusters. What does this show about trusting clusters?',
              kind: 'data-analysis',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            { question: 'What are the two repeating steps in k-means?', answerOutline: 'Assign each point to its nearest centroid, then move each centroid to the mean of its assigned points.' },
            { question: 'Why must features usually be standardised first?', answerOutline: 'k-means uses distance, so columns with large numeric ranges would otherwise dominate.' },
            { question: 'Does k-means finding three clusters prove three groups exist?', answerOutline: 'No. It always returns k clusters, even in noise, so they must be checked against other evidence.' },
          ],
          relatedLessons: ['machine-learning/unsupervised-learning/k-means-and-clustering'],
        },
      ],
    },
    {
      slug: 'polling-and-inference',
      title: 'Polling and Inference',
      description:
        'From a sample to a claim about everyone: random variables, the binomial, the central limit theorem, polls, confidence intervals and hypothesis tests.',
      lessons: [
        {
          slug: 'random-variables-bernoulli-and-binomial',
          title: 'Random variables, Bernoulli and binomial',
          summary:
            'Give chance a number. The binomial distribution counts successes, and it is the model behind every simple poll.',
          estimatedMinutes: 75,
          objectives: [
            'Define a random variable and its expected value',
            'Recognise a Bernoulli trial and a binomial count',
            'Compute a binomial mean and standard deviation',
            'Simulate binomial counts and use distribution functions',
          ],
          concepts: [
            'Random variable',
            'Expected value',
            'Bernoulli trial',
            'Binomial distribution: n, p',
            'Mean np and standard deviation',
            'rng.binomial',
            'scipy.stats',
          ],
          explanation: `A **random variable** assigns a number to each outcome of a random process: the number of heads in ten flips, or the winnings from a bet. Its **expected value** is the long-run average, found by multiplying each value by its probability and adding them up.

The simplest case is a **Bernoulli** trial, a single yes-or-no event: success (1) with probability $p$, otherwise failure (0). Its mean is $p$.

Add up $n$ independent Bernoulli trials with the same $p$, and the count of successes follows a **binomial** distribution. Asking 1,000 random voters whether they support a candidate is a binomial experiment when 52% of the population does: each answer is one trial. The chance of exactly $k$ successes is

$$ P(X = k) = \\binom{n}{k} p^k (1-p)^{n-k} $$

and the mean and spread are

$$ E[X] = np, \\qquad \\text{SD}[X] = \\sqrt{np(1-p)} $$

For that poll, the expected count is 520, with a standard deviation of about 15.8. So the share you see will usually be within a few points of 52%, and this is where a poll's margin of error comes from.

\`\`\`python
rng = np.random.default_rng(107)
counts = rng.binomial(1000, 0.52, size=10000)    # 10,000 polls
counts.mean(), counts.std()

from scipy.stats import binom
binom.pmf(5, 10, 0.5)      # P(exactly 5 heads in 10 flips): 0.246
binom.cdf(5, 10, 0.5)      # P(at most 5 heads)
\`\`\`

Install SciPy with \`.venv\\Scripts\\python -m pip install scipy\`.

**Pitfalls.** The binomial needs a fixed $n$, independent trials and the same $p$ each time. Polling calls within one household are not quite independent, and sampling without replacement is only close to binomial when the sample is small compared with the population. \`pmf\` gives the chance of one exact value, while \`cdf\` gives the chance of that value or less. Mixing these up is a common source of error.`,
          resources: [
            discovery('Python Functions for Random Distributions', 'Polling-Confidence-Intervals-and-Hypothesis-Testing/Python-Functions-for-Random-Distributions', 'pmf, cdf and friends.'),
            discovery('Bernoulli and Binomial Random Variables', 'Polling-Confidence-Intervals-and-Hypothesis-Testing/Bernoulli--Binomial-Random-Variables', 'Definitions and worked examples.'),
            { ...openIntro, note: 'Section 4.3 on the binomial distribution.' },
          ],
          exercises: [
            {
              slug: 'binomial-by-hand',
              title: 'Binomial by hand and by code',
              prompt:
                'For 10 flips of a fair coin, compute P(exactly 5 heads) by the formula, confirm 0.246 with `binom.pmf`, and compute P(at least 8 heads) using `cdf` and the complement rule. Simulate 100,000 experiments with `rng.binomial` and compare both.',
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'poll-as-binomial',
              title: 'One thousand simulated polls',
              prompt:
                'Simulate 10,000 polls of 1,000 voters with true support 0.52. Plot a histogram of the sample shares. Compute the mean and the standard deviation and compare them with $p$ and $\\sqrt{p(1-p)/n}$. In what share of polls does the candidate appear to be losing, below 0.50?',
              kind: 'simulation',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            { question: 'What three conditions does a binomial count need?', answerOutline: 'A fixed number of trials, independence, and the same probability of success on each trial.' },
            { question: 'What is the expected count and SD for n = 100, p = 0.5?', answerOutline: 'Mean 50, standard deviation 5.' },
            { question: 'What is the difference between pmf and cdf?', answerOutline: 'pmf gives P(X = k). cdf gives P(X ≤ k).' },
          ],
          relatedLessons: [
            'probability-statistics/random-variables-and-distributions/random-variables-and-expectation',
            'probability-statistics/random-variables-and-distributions/discrete-distributions',
          ],
        },
        {
          slug: 'central-limit-theorem',
          title: 'The central limit theorem',
          summary:
            'Averages of many draws are close to normal, whatever the original shape. That is what makes inference possible.',
          estimatedMinutes: 75,
          objectives: [
            'State the central limit theorem in plain words',
            'Tell a data distribution from a sampling distribution',
            'Compute a standard error',
            'Show the theorem by simulation on skewed data',
          ],
          concepts: [
            'Sample mean as a random variable',
            'Sampling distribution',
            'Central limit theorem',
            'Standard error',
            'Square-root law',
          ],
          explanation: `Take a sample, compute its mean. Take another sample and the mean changes. The **sampling distribution** is the pattern those means would form over all possible samples. It is different from the distribution of the data, and it is the key to knowing how far to trust a sample.

The **central limit theorem** says that for a large enough random sample, the sampling distribution of the mean is approximately normal, **whatever the shape of the original data**, with

$$ \\text{mean} = \\mu, \\qquad \\text{SE} = \\frac{\\sigma}{\\sqrt{n}} $$

The spread of the sample mean is called the **standard error**. Note the square root again: four times the data gives half the error.

Try it on something clearly not normal. Restaurant bills are skewed to the right:

\`\`\`python
bills = tips['total_bill']
rng = np.random.default_rng(107)
means = []
for i in range(5000):
    sample = rng.choice(bills, size=40)
    means.append(sample.mean())
pd.Series(means).plot.hist(bins=40)
\`\`\`

The histogram of means is a neat bell, centred on the true mean, even though the bills are not. Now compare its standard deviation with \`bills.std() / 40 ** 0.5\`. They agree closely.

Why does this happen? An average mixes many independent pieces, so extreme highs and lows tend to cancel. The same is true of a proportion, which is the mean of a column of 0s and 1s. That is why polls can use the normal curve: a sample share is a mean. Its standard error is

$$ \\text{SE} = \\sqrt{\\frac{p(1-p)}{n}} $$

**Pitfalls.** The theorem describes averages, not individuals. A large sample's *mean* is close to normal, but its histogram still looks like the skewed population, and more data will not change that. Heavily skewed data needs a larger $n$. The theorem also needs independent draws. Polls that share a bias do not average out, and neither do rows from the same group. That will matter in your final project.`,
          resources: [
            discovery('Central Limit Theorem', 'Polling-Confidence-Intervals-and-Hypothesis-Testing/Central-Limit-Theorem', 'The theorem through simulation.'),
            { title: 'But what is the Central Limit Theorem?', url: 'https://www.3blue1brown.com/lessons/clt', type: 'video', cost: 'free', provider: '3Blue1Brown', note: 'A visual explanation of why averages become bell-shaped.' },
            { title: 'Seeing Theory', url: 'https://seeing-theory.brown.edu/', type: 'interactive', cost: 'free', provider: 'Brown University', note: 'Chapter 3, Probability Distributions, shows the central limit theorem.' },
          ],
          exercises: [
            {
              slug: 'clt-on-a-skewed-column',
              title: 'Watch the bell appear',
              prompt:
                'For `total_bill`, draw the histogram of the data, then of 5,000 sample means at sample sizes 2, 10 and 40, with a seeded generator and a for-loop. Compare the standard deviation of each with $s/\\sqrt{n}$. At what size does it look bell-shaped to you? Write down what stays skewed however large the sample.',
              kind: 'simulation',
              difficulty: 2,
            },
            {
              slug: 'se-planning',
              title: 'Plan a sample size',
              prompt:
                'A column has standard deviation 20. Compute the standard error of the mean for samples of 25, 100 and 400. They should be 4, 2 and 1. What sample size gives a standard error of 0.5? If a survey costs 10 dollars a response, how much does it cost to halve the standard error from a sample of 400?',
              kind: 'problem',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            { question: 'What does the central limit theorem say?', answerOutline: 'For large random samples, the sample mean is approximately normal around the true mean with standard error $\\sigma/\\sqrt{n}$, whatever the data\'s shape.' },
            { question: 'What is the difference between standard deviation and standard error?', answerOutline: 'SD is the spread of individual values. SE is the spread of a statistic such as the sample mean across samples.' },
            { question: 'Why can polls use the normal curve?', answerOutline: 'A sample share is the mean of 0s and 1s, so the central limit theorem applies.' },
          ],
          relatedLessons: ['probability-statistics/limit-theorems-and-sampling/central-limit-theorem'],
        },
        {
          slug: 'polling-and-sampling',
          title: 'Polling and sampling',
          summary:
            'How a thousand people can speak for millions, what a margin of error covers, and what it leaves out.',
          estimatedMinutes: 90,
          objectives: [
            'Explain why random sampling works',
            'Identify coverage, non-response and response bias',
            'Compute a margin of error for a share and for a lead',
            'Say which errors a margin of error does not include',
          ],
          concepts: [
            'Population and sample',
            'Simple random sample',
            'Sampling frame',
            'Sampling bias',
            'Non-response',
            'Weighting',
            'Margin of error',
            'Total survey error',
          ],
          explanation: `A poll asks a few people to learn about many. The surprise is that the size of the population hardly matters. What sets the precision is the size of the sample, provided that it is **random**, so that everyone has a known chance of being picked. Tasting a well-stirred pot works the same whether the pot is large or small.

The word *random* does all the work. In 1936 the *Literary Digest* polled more than two million people and predicted a landslide for Alf Landon. Franklin Roosevelt won easily. Its lists came heavily from car and telephone owners, and few people replied. A smaller random sample would have done better. **Sample size does not cure bias.**

The main sources of bias are these:

- **Coverage**: the **sampling frame**, the list you draw from, misses people.
- **Non-response**: those who answer differ from those who do not. This is the central problem of modern polling, since few people now answer.
- **Response bias**: wording or social pressure changes the answer.

Pollsters use **weighting** to repair known imbalances, for instance by counting underrepresented groups for more, but that only fixes what they measured.

For a random sample, the 95% **margin of error** on a share is about $1.96$ standard errors. The worst case is at $p = 0.5$:

$$ 1.96\\sqrt{\\frac{0.5 \\times 0.5}{n}} \\times 100 = \\frac{98}{\\sqrt{n}} \\text{ percentage points} $$

With $n = 1000$, that is about 3.1 points. A **lead** is one share minus another, and its margin of error is about twice as large, $196/\\sqrt{n}$, because when one share goes up the other tends to go down. A 4-point lead in a 1,000-person poll is well within the margin on the lead of 6.2.

To take a sample in pandas: \`df.sample(n=100, random_state=107)\`.

**Pitfall.** The printed margin of error covers **only** random sampling error. It ignores coverage, non-response and late changes of mind. Real polling error is larger, which your final project will measure directly.

**Reflection.** Polls ask for people's opinions and sometimes their personal data. Respondents should know who is asking and what will happen to their answers.`,
          resources: [
            discovery('Polling and Sampling', 'Polling-Confidence-Intervals-and-Hypothesis-Testing/Polling-and-Sampling', 'How polls work and fail.'),
            { title: 'Our Methods', url: 'https://www.pewresearch.org/our-methods/', type: 'article', cost: 'free', provider: 'Pew Research Center', note: 'A leading pollster explains how it samples, weights and reports.' },
            { title: 'AAPOR Standards and Ethics', url: 'https://aapor.org/standards-and-ethics/', type: 'documentation', cost: 'free', provider: 'American Association for Public Opinion Research', note: 'What an honest poll should disclose.' },
          ],
          exercises: [
            {
              slug: 'moe-table',
              title: 'Margin of error table',
              prompt:
                'Make a table of the margin of error on a share and on a lead for samples of 100, 400, 1,000, 2,500 and 10,000. Then decide for each result whether the lead is within the margin: 48 to 44 with 800 people, 52 to 46 with 1,500 people, and 50 to 41 with 400 people. Say what extra sources of error remain in each case.',
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'biased-sample-simulation',
              title: 'Big and biased versus small and random',
              prompt:
                'Simulate a population of 1,000,000 where 52% support A. Suppose supporters reply to a survey with probability 0.05 and opponents with probability 0.07. Use array operations to compute the share of supporters among those who replied, which should be about 60,000 people in all. Compare it with a simple random sample of 1,000. Which is closer to 0.52, and how does this relate to the Literary Digest?',
              kind: 'simulation',
              difficulty: 2,
            },
            {
              slug: 'read-a-methods-statement',
              title: 'Read a methods statement',
              prompt:
                'Find a recent published poll with a methods statement. Record its population, frame, mode, sample size, weighting variables and margin of error. Which sources of error does its margin cover? Which remain? Would you trust a 2-point lead from it?',
              kind: 'writing',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            { question: 'Why does a larger sample not fix a biased poll?', answerOutline: 'It only reduces random error. A bias stays the same and the result becomes confidently wrong.' },
            { question: 'What is the margin of error on a share with n = 400?', answerOutline: 'About $98/\\sqrt{400} = 4.9$ percentage points, and about 9.8 on a lead.' },
            { question: 'Name three kinds of error that a margin of error leaves out.', answerOutline: 'Coverage, non-response, and response or wording bias, along with late changes of mind.' },
          ],
        },
        {
          slug: 'confidence-intervals',
          title: 'Confidence intervals',
          summary:
            'Report a range, not a single number, and be able to say exactly what 95% confidence means.',
          estimatedMinutes: 90,
          objectives: [
            'Compute a 95% interval for a proportion and for a mean',
            'Compute an interval for a difference of two means',
            'State correctly what 95% confidence means',
            'Check coverage by simulation',
          ],
          concepts: [
            'Point estimate',
            'Confidence interval',
            'Confidence level',
            'Coverage',
            'Estimate plus or minus 1.96 standard errors',
            'Interval for a difference',
          ],
          explanation: `A sample gives you a **point estimate**, and a **confidence interval** adds an honest range around it. Since the central limit theorem says an estimate is roughly normal, and 95% of a normal lies within about 1.96 standard errors, a 95% interval is

$$ \\text{estimate} \\pm 1.96 \\times \\text{SE} $$

For a proportion, $\\hat{p} \\pm 1.96\\sqrt{\\hat{p}(1-\\hat{p})/n}$. For a mean, $\\bar{x} \\pm 1.96\\, s/\\sqrt{n}$. For a difference between two independent groups the variances add:

$$ \\text{SE}(\\bar{x}_1 - \\bar{x}_2) = \\sqrt{\\frac{s_1^2}{n_1} + \\frac{s_2^2}{n_2}} $$

In Project STAR, small classes beat regular classes by 7.73 math points with a standard error of about 1.58, so the interval is about 4.6 to 10.8. It excludes 0, so chance alone is an unlikely explanation.

**What does 95% mean?** It describes the method, not one interval. If you repeated the sampling many times and built an interval each time, about 95% of those intervals would contain the true value. Any one interval either does or does not. Saying *there is a 95% chance the truth is in this interval* is a common shortcut, but it is not what the method guarantees.

You can check that with a simulation:

\`\`\`python
p, n = 0.52, 1000
rng = np.random.default_rng(107)
hits = 0
for i in range(10000):
    p_hat = rng.binomial(n, p) / n
    se = (p_hat * (1 - p_hat) / n) ** 0.5
    if abs(p_hat - p) <= 1.96 * se:
        hits += 1
hits / 10000       # close to 0.95
\`\`\`

The share of intervals that contain the truth is the **coverage**. A good method has coverage near its stated level.

**Pitfalls.** A wider interval is more confident, not more precise. An interval accounts only for random sampling error. If the sample is biased, coverage can fall far below 95%. That is exactly what you will measure on real polls in the final project, and the formula assumes independent observations. Do not confuse a 95% interval with the range of 95% of the data, which is much wider.`,
          resources: [
            discovery('Confidence Intervals', 'Polling-Confidence-Intervals-and-Hypothesis-Testing/Confidence-Intervals', 'Building and interpreting intervals.'),
            { ...openIntro, note: 'Section 5.2 on confidence intervals for a proportion.' },
            { title: 'Seeing Theory', url: 'https://seeing-theory.brown.edu/', type: 'interactive', cost: 'free', provider: 'Brown University', note: 'Chapter 4, Frequentist Inference, animates confidence interval coverage.' },
          ],
          exercises: [
            {
              slug: 'interval-for-star',
              title: 'An interval for the STAR effect',
              prompt:
                'For kindergarten `mathk`, compute the small-minus-regular difference, its standard error and its 95% interval. It should be about 7.73, 1.58 and 4.6 to 10.8. Do the same for regular with aide minus regular. Write one sentence on each for a school board, without using the word significant.',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'coverage-simulation',
              title: 'Measure coverage',
              prompt:
                'Run the coverage simulation for $n$ of 20 and 1,000, with $p$ of 0.5 and of 0.03. Tabulate the coverage for each pair. Where does the simple formula fall short of 95%, and why might that be? Then add a constant bias of 2 points to every sample share with $n = 1000$ and $p = 0.5$, and report the coverage now.',
              kind: 'simulation',
              difficulty: 3,
            },
            {
              slug: 'interpretation-check',
              title: 'Right or wrong?',
              prompt:
                'A poll reports 53%, with a 95% interval from 50% to 56%. For each statement, say right or wrong and why: (a) 95% of voters are between 50% and 56%. (b) If we repeated this process, about 95% of such intervals would capture the true share. (c) A poll with 4 times the sample would have half the width. (d) This interval also accounts for voters who refused to answer.',
              kind: 'problem',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            { question: 'What does 95% confidence refer to?', answerOutline: 'The long-run share of intervals, built by this method, that contain the true value.' },
            { question: 'Give the 95% interval for a proportion.', answerOutline: '$\\hat{p} \\pm 1.96\\sqrt{\\hat{p}(1-\\hat{p})/n}$.' },
            { question: 'What makes real coverage fall below the stated level?', answerOutline: 'Bias, or observations that are not independent, because the formula only accounts for random sampling error.' },
          ],
          relatedLessons: ['probability-statistics/estimation-and-confidence/confidence-intervals'],
        },
        {
          slug: 'hypothesis-tests',
          title: 'Hypothesis tests',
          summary:
            'How surprising would this result be if nothing were going on? A p-value answers that, and only that.',
          estimatedMinutes: 90,
          objectives: [
            'State null and alternative hypotheses',
            'Find a p-value by simulation and by the normal curve',
            'Interpret a p-value correctly',
            'Separate statistical significance from practical importance',
          ],
          concepts: [
            'Null hypothesis',
            'Alternative hypothesis',
            'Test statistic',
            'p-value',
            'Significance level',
            'z-statistic',
            'Practical importance',
          ],
          explanation: `A hypothesis test asks whether a pattern could be explained by chance alone. It works like a proof by contradiction. You assume nothing is going on, then see how surprising your data would be.

1. State a **null hypothesis** $H_0$, the boring explanation: *the coin is fair*. The **alternative** $H_1$ is what you suspect: *it is not*.
2. Choose a **test statistic** that measures how far the data is from the null, such as the number of heads.
3. Find the **p-value**: the chance, *if the null is true*, of a result at least as extreme as the one you saw.
4. A small p-value means the data would be rare under the null, so you have evidence against it.

Suppose you get 60 heads in 100 flips. Simulate a fair coin:

\`\`\`python
rng = np.random.default_rng(107)
heads = rng.binomial(100, 0.5, size=100000)
(abs(heads - 50) >= 10).mean()    # about 0.057
\`\`\`

A fair coin gives a result this lopsided about 6% of the time. Rare-ish, but not very rare. Often a cut-off of 0.05, called the **significance level**, is used to say *statistically significant*, but there is nothing magical about it. Here 0.057 and 0.045 tell nearly the same story.

When an estimate is roughly normal, skip the simulation and compute a **z-statistic**:

$$ z = \\frac{\\text{estimate} - \\text{null value}}{\\text{SE}} $$

A $|z|$ above about 2 corresponds to $p < 0.05$. For the STAR effect, $z \\approx 7.73 / 1.58 \\approx 4.9$, which is far beyond what chance alone would produce. Note that a test and an interval agree: a 95% interval excludes the null value when $p < 0.05$.

**Pitfalls.** The p-value is **not** the chance that the null is true. Failing to reject does not prove the null either. It may mean you had too little data. With huge samples, trivial effects become significant, so always report the size of the effect, ideally with an interval, and ask whether it matters. If you test twenty things, one will likely reach $p < 0.05$ by luck. Data Science Exploration treats that properly, along with tests for many other situations. This course stops at the idea.`,
          resources: [
            discovery('Hypothesis Testing', 'Polling-Confidence-Intervals-and-Hypothesis-Testing/Hypothesis-Testing', 'The logic of a test, with examples.'),
            { ...openIntro, note: 'Section 5.3 on hypothesis testing for a proportion.' },
            inferential('Chapter 11, Testing Hypotheses, which builds tests entirely through simulation.'),
          ],
          exercises: [
            {
              slug: 'coin-test',
              title: 'A test by simulation',
              prompt:
                'Reproduce the p-value of about 0.057 for 60 heads in 100 flips by simulation and with the normal curve (`from scipy.stats import norm`, then `2 * norm.sf(2)`). Why do they differ a little? Repeat for 600 heads in 1,000 flips. The share of heads is identical. Explain why the evidence is so much stronger.',
              kind: 'simulation',
              difficulty: 2,
            },
            {
              slug: 'star-z',
              title: 'Test the aide',
              prompt:
                'Test whether a teacher aide changes kindergarten math scores. State $H_0$ and $H_1$, compute $z$ for regular with aide minus regular, and give a p-value. Then write a short paragraph that does not claim the aide has no effect, and explain why you cannot claim that.',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'significance-mistakes',
              title: 'Fix the statements',
              prompt:
                'Rewrite each one so it is correct: (a) p = 0.03, so there is a 3% chance the null is true. (b) p = 0.40, so the treatment has no effect. (c) With 2 million users, the new button raised clicks by 0.01 points with p < 0.001, so it is a major improvement. (d) We tested 40 features and two were significant, so those two matter.',
              kind: 'writing',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            { question: 'Define a p-value.', answerOutline: 'The probability, assuming the null is true, of a result at least as extreme as the one observed.' },
            { question: 'Does p = 0.4 prove the null hypothesis?', answerOutline: 'No. It only means the data is not surprising under the null, and there may simply be too little data.' },
            { question: 'How do a 95% interval and a test at the 0.05 level relate?', answerOutline: 'The interval excludes the null value exactly when the test rejects, for matching methods.' },
          ],
          relatedLessons: ['probability-statistics/hypothesis-testing-and-regression/hypothesis-testing-and-p-values'],
        },
      ],
    },
  ],
  capstone: {
    slug: 'discovery-capstone',
    title: 'An original data story',
    description:
      'Pick a public dataset and a real question, then carry it through the whole course: explore, simulate, model and report what you can and cannot conclude. The final project on the coursework page replaces this in the site.',
    deliverables: ['A notebook that passes Restart and Run All', 'A one-page summary of the question, method, result and limits'],
    estimatedHours: 25,
  },
  masteryChecklist: [
    'I can load a CSV into a DataFrame, inspect it, and answer questions with row selection and grouping',
    'I can say whether a study is an experiment or observational, and name likely confounders',
    'I can stratify a comparison and explain why a result can reverse inside groups',
    'I can summarise a variable by centre, spread, shape and outliers, and choose an honest chart',
    'I can simulate a chance process with a for-loop and a seed, and check it against an exact answer',
    "I can apply the addition and multiplication rules, compute conditional probabilities, and use Bayes' theorem with base rates",
    'I can fit a simple regression, read its slope, test it on held-out data, and cluster unlabelled rows',
    'I can compute a margin of error and a confidence interval, explain what they cover, and interpret a p-value correctly',
  ],
});
