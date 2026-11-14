import { defineCoursework } from '../define';

const pyExtensions = ['ms-python.python', 'ms-python.vscode-pylance', 'ms-toolsai.jupyter', 'charliermarsh.ruff'];
const pyToolchain = [
  'Install Python 3.12 from python.org and tick "Add python.exe to PATH". Everything here runs natively on Windows 10, so WSL is not needed.',
  'In the VS Code terminal: `python -m venv .venv`, then `.venv\\Scripts\\Activate.ps1`. If PowerShell blocks the script, run `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned` once.',
  'Choose `.venv` as both the Python interpreter and the Jupyter kernel in VS Code. A laptop CPU is enough, and no GPU is needed.',
  'Point `IR_DATASETS_HOME` at a folder outside the repository so downloaded collections are never committed: run `setx IR_DATASETS_HOME %USERPROFILE%\\ir_datasets` once, then open a new terminal.',
];

export default defineCoursework({
  subjectId: 'text-information-systems',
  machineProblems: [
    {
      slug: 'mp1-minisearch',
      title: 'minisearch: a search engine and evaluation harness on Cranfield',
      afterModule: 'search-engine-implementation-and-evaluation',
      coversModules: ['text-representation', 'retrieval-models', 'search-engine-implementation-and-evaluation'],
      summary:
        'Build a complete small search engine from scratch: analyser, compressed inverted index, TF-IDF, BM25 and query likelihood ranking, and an evaluation harness that reports MAP and nDCG@10 with significance tests, checked against rank_bm25 and ir_measures.',
      language: 'Python 3.12',
      estimatedHours: 18,
      overview: `Every idea in the first three modules fits in one program of a few hundred lines, and writing it is the fastest way to understand why search engines are built the way they are. In this MP you build **minisearch** and evaluate it on the Cranfield collection: 1,400 aerodynamics abstracts, 225 queries and 1,837 relevance judgements, loaded with \`ir_datasets\`.

You write the analyser, an inverted index stored on disk with variable-byte compressed gaps, three ranking functions (TF-IDF, BM25 and Dirichlet query likelihood) with document-at-a-time top-k retrieval, and an evaluation harness that computes average precision, P@10 and nDCG@10 and tests whether differences are significant. Then you run the experiments the lessons describe: an analyser ablation, a parameter sweep with held-out queries, and a comparison of models with a paired test.

The reference implementation for this page found that stemming raises BM25's MAP from 0.279 to 0.305, that turning off length normalisation costs about 0.03, that BM25 beats Dirichlet query likelihood by 0.015 MAP with $p < 0.001$ over 225 queries but not significantly over the first 20, and that compression shrinks the postings 3.8 times. Your numbers should land close to these, and your report explains them.

**A Cranfield trap.** The relevance codes run from 1 (a complete answer) to 4 (minimum interest), with $-1$ for no interest. A larger code is *less* relevant. Treat codes 1 to 4 as relevant for binary measures and use the grade $5 - \\text{code}$ for nDCG.

**Constraints.** Implement the analyser's tokeniser, the index, compression, ranking and every measure yourself with the Python standard library and NumPy. Use NLTK only for the Porter stemmer, scikit-learn only for its stop word list, and \`rank_bm25\`, \`ir_measures\` and SciPy only to check your results and run tests. No search library (Lucene, Pyserini, Whoosh) may be used inside minisearch.`,
      setup: {
        extensions: pyExtensions,
        toolchain: [
          ...pyToolchain,
          'Install the packages: `pip install numpy scipy scikit-learn nltk ir_datasets ir-measures rank_bm25 matplotlib pytest ruff jupyter ipykernel`.',
          'The first `ir_datasets.load("cranfield")` call downloads the collection (about 0.5 MB) from the University of Glasgow.',
        ],
        structure: `minisearch/
├── minisearch/analyse.py     # tokeniser, stop words, Porter stemmer
├── minisearch/vbyte.py       # variable-byte encode and decode
├── minisearch/index.py       # build, save and load the compressed index
├── minisearch/rank.py        # TF-IDF, BM25, Dirichlet QL, DAAT top-k
├── minisearch/evaluate.py    # AP, P@k, nDCG@k, TREC run and qrels I/O
├── minisearch/stats.py       # paired t, sign and randomisation tests, bootstrap CI
├── minisearch/__main__.py    # CLI: index, search, run, eval, compare
├── experiments/run_all.py    # every table and figure in REPORT.md
├── tests/                    # your acceptance tests, written with pytest
├── REPORT.md
└── pyproject.toml`,
        commands: [
          { label: 'Install in editable mode', command: 'pip install -e .' },
          { label: 'Build the index', command: 'python -m minisearch index --out data/cranfield.idx' },
          { label: 'Search interactively', command: 'python -m minisearch search "boundary layer separation" --model bm25 --k 10' },
          { label: 'Write a run and evaluate it', command: 'python -m minisearch run --model bm25 --k1 1.2 --b 0.75 --out runs/bm25.trec; python -m minisearch eval runs/bm25.trec' },
          { label: 'Run every experiment', command: 'python experiments/run_all.py --out results/' },
          { label: 'Run the tests', command: 'python -m pytest -q' },
        ],
      },
      requirements: [
        '`analyse.py` lower-cases, extracts tokens with the regular expression `[a-z0-9]+`, optionally removes words in scikit-learn\'s `ENGLISH_STOP_WORDS` and optionally applies NLTK\'s `PorterStemmer`. The same function, with the same flags, is applied to documents and queries, and the flags are stored in the index header.',
        '`index.py` builds postings of (document number, term frequency) sorted by document number, plus document lengths and collection statistics, and writes them to one binary file: a header, a dictionary of term to (document frequency, collection frequency, byte offset, byte length), and postings as variable-byte gaps interleaved with frequencies. Loading the file reproduces the in-memory index exactly.',
        '`rank.py` scores TF-IDF with TF $= 1 + \\ln c$ and IDF $= \\ln((N + 1)/df)$, BM25 with IDF $= \\ln(1 + (N - df + 0.5)/(df + 0.5))$ and parameters $k_1$ and $b$, and Dirichlet query likelihood in the rank-equivalent form, all exactly as defined in the lessons.',
        'Retrieval is document-at-a-time over cursors on the query terms\' postings with a size-$k$ min-heap, ties broken by smaller document number. A term-at-a-time implementation with accumulators exists only as a test oracle.',
        '`evaluate.py` reads and writes TREC run and qrels formats and computes per-query AP (over all relevant documents), P@10, R@100 and nDCG@10 with linear gain and an ideal list built from all judged documents. Relevance codes 1 to 4 count as relevant with grade $5 - \\text{code}$, and code $-1$ is not relevant.',
        '`stats.py` implements the paired t-test (checked against `scipy.stats.ttest_rel`), the two-sided sign test, a randomisation test with 100,000 sign flips from `numpy.random.default_rng(0)`, and a 95% bootstrap confidence interval for a mean difference.',
        'The analyser ablation reports MAP and nDCG@10 of BM25 for four analysers: plain, stop words removed, stemmed, and both.',
        'The parameter study tunes BM25 over $k_1 \\in \\{0.5, 0.9, 1.2, 1.6, 2.0\\}$ and $b \\in \\{0, 0.25, 0.5, 0.75, 1\\}$ and Dirichlet $\\mu \\in \\{10, 30, 100, 300, 1000, 3000\\}$ on the odd-numbered queries only, and reports the chosen settings on the even-numbered queries next to the defaults.',
        'The model comparison reports BM25, Dirichlet QL and TF-IDF on all 225 queries with all three significance tests and a confidence interval, then repeats BM25 against QL on the first 20 queries, and it compares minisearch with `rank_bm25.BM25Okapi` on the same tokens.',
        '`REPORT.md` (about 3 pages) has the index statistics, compression table, ablation, tuning and comparison tables, a precision-recall curve for the best model, a per-query difference plot, and an explanation of every result that differs from the reference numbers on this page.',
      ],
      acceptanceTests: [
        'Index of Cranfield with both stop words and stemming: 1,400 documents, about 4,611 terms and 81,329 postings (within 1% across NLTK versions), 126,090 tokens, average length 90.06, and document frequency 469 for "boundari". Postings take 650,632 bytes as two 4-byte integers each and about 170,300 bytes VB-coded (a ratio of 3.7 to 3.9). `vb_encode([824, 5, 214577]).hex()` is `"06b8850d0cb1"`, and decoding inverts encoding on 10,000 random integers.',
        'On the course\'s five-document collection with the lessons\' analyser and the query "solar battery storage", BM25 ($k_1 = 1.2$, $b = 0.75$) gives D2 1.654, D5 1.055, D4 0.867, D1 0.865 and D3 0.301 (within 0.001), and Dirichlet QL with $\\mu = 10$ gives D2 $-5.867$ for the full log-likelihood.',
        'Evaluation: a list with relevant documents at ranks 1, 3, 4 and 7 and 5 relevant in total has AP 0.5976; graded relevance (3, 2, 0, 1) has nDCG@4 0.985. Your per-query AP, P@10 and nDCG@10 match `ir_measures` within $10^{-6}$ on every Cranfield query of your BM25 run when given the same grades.',
        'Effectiveness over all 225 queries with stemming and stop words: BM25 ($1.2$, $0.75$) MAP 0.295 to 0.315 (reference 0.305), nDCG@10 0.355 to 0.375 (0.365), P@10 0.225 to 0.240 (0.232). Dirichlet QL $\\mu = 300$ MAP 0.280 to 0.300 (0.290). BM25 with $b = 0$ MAP 0.265 to 0.280 (0.273). BM25 without stemming MAP 0.270 to 0.287 (0.279). TAAT and DAAT return identical top 10 lists for every query.',
        'BM25 against QL $\\mu = 300$ over 225 queries: the paired t statistic is between 3.5 and 4.5 (reference 4.02, $p = 8 \\times 10^{-5}$), BM25 wins on about 140 queries and loses on about 72, and the randomisation test gives $p < 0.001$. Over the first 20 queries alone, $p > 0.05$ (reference $p = 0.14$).',
        '`rank_bm25.BM25Okapi(k1=1.2, b=0.75)` on your tokens reaches MAP 0.29 to 0.305 (reference 0.2995) and shares on average at least 9 of its top 10 documents with minisearch (reference 9.4); your report explains that the difference comes from its IDF formula. Tuning on odd queries chooses settings near $k_1 = 1.6$, $b = 0.75$ in the reference run, which lifted even-query MAP only from 0.291 to 0.295.',
      ],
      resources: [
        { title: 'Cranfield collection in ir_datasets', url: 'https://ir-datasets.com/cranfield.html', type: 'dataset', cost: 'free', provider: 'ir_datasets', note: 'Documents, queries and qrels with one line of Python. Read the qrels description for the relevance codes.', primary: true },
        { title: 'rank_bm25', url: 'https://github.com/dorianbrown/rank_bm25', type: 'tool', cost: 'free', provider: 'Dorian Brown', note: 'A small BM25 library used here as a check. Read its source to find how its IDF differs from yours.' },
        { title: 'ir-measures', url: 'https://ir-measur.es/', type: 'tool', cost: 'free', provider: 'MacAvaney, Macdonald and Ounis', note: 'Reference implementations of AP, P@k and nDCG@k for checking your evaluation code.' },
      ],
      stretchGoals: [
        'Add MaxScore to the DAAT loop and report the fraction of postings scored, checking that the top 10 never changes.',
        'Index Cranfield with Pyserini (Lucene, needs Java 21) and compare its BM25 MAP and query latency with minisearch.',
      ],
    },
    {
      slug: 'mp2-topicmine',
      title: 'topicmine: word association, PLSA and model-based feedback with EM',
      afterModule: 'word-association-and-topic-models',
      coversModules: ['feedback-web-search-and-recommendation', 'word-association-and-topic-models'],
      summary:
        'One EM engine, three uses: mine word associations and topics from newsgroup posts with mutual information and PLSA, check them against LDA, and turn the same mixture model into pseudo-relevance feedback that lifts minisearch\'s MAP on Cranfield.',
      language: 'Python 3.12',
      estimatedHours: 20,
      overview: `The EM algorithm appears twice in this course: in Module 4 it estimates a feedback model from the top-ranked documents, and in Module 5 it fits topics to a collection. In this MP you write it once, test it hard, and use it for both.

**Part A, word association and topics.** On 2,013 posts from four newsgroups (graphics, hockey, space and Middle East politics), you compute smoothed mutual information between words and fit PLSA with a background model by EM over a sparse matrix. The reference run for this page found a striking effect of the background: without it, PLSA merged graphics and space into one topic and reached a normalised mutual information with the true groups of only 0.545. With $\\lambda_B = 0.5$, the four topics matched the four groups and NMI rose to 0.757, equal to scikit-learn's LDA (0.758). Across five random seeds NMI ranged from 0.53 to 0.76, and the run with the highest likelihood was the best, which you will check for yourself.

**Part B, model-based feedback.** You extend minisearch from MP 1 with KL-divergence retrieval and the two-component feedback mixture. In the reference run it raised Cranfield MAP from 0.290 to 0.322, helping 151 queries and hurting 70. You also implement Rocchio pseudo-feedback on TF-IDF vectors for comparison, and you study the queries where feedback drifted.

The tests are the point. EM bugs are quiet: a wrong E-step still produces plausible-looking topics. A log-likelihood that never decreases, agreement with a hand-worked iteration, and agreement with LDA are what make your results trustworthy.

**Constraints.** Implement mutual information, the EM engine, PLSA, KL-divergence retrieval, the feedback mixture and Rocchio yourself with NumPy and SciPy sparse matrices. Use scikit-learn for loading 20 Newsgroups, \`CountVectorizer\`, NMI and \`LatentDirichletAllocation\` (a check only), and gensim optionally for a second LDA. Only use what Modules 1 to 5 teach. Classifiers and clustering methods come in Module 6.`,
      setup: {
        extensions: pyExtensions,
        toolchain: [
          ...pyToolchain,
          'Install the packages: `pip install numpy scipy scikit-learn nltk ir_datasets matplotlib pytest ruff jupyter ipykernel`, and optionally `pip install gensim` for the second LDA.',
          'Install your MP 1 package into the same environment with `pip install -e ../minisearch` so Part B can import its index and evaluation code.',
        ],
        structure: `topicmine/
├── topicmine/data.py         # the four-newsgroup corpus and its count matrix
├── topicmine/assoc.py        # entropy, smoothed mutual information, top partners
├── topicmine/em.py           # two-component mixture with a fixed background
├── topicmine/plsa.py         # sparse PLSA with a background, multiple restarts
├── topicmine/feedback.py     # KL-divergence retrieval, mixture feedback, Rocchio
├── topicmine/__main__.py     # CLI: assoc, plsa, lda, feedback
├── experiments/run_all.py    # every table and figure in REPORT.md
├── tests/                    # your acceptance tests, written with pytest
├── REPORT.md
└── pyproject.toml`,
        commands: [
          { label: 'Install in editable mode', command: 'pip install -e .' },
          { label: 'Top associations of a word', command: 'python -m topicmine assoc hockey --top 10' },
          { label: 'Fit PLSA with five restarts', command: 'python -m topicmine plsa --k 4 --lambda-b 0.5 --iters 100 --seeds 0 1 2 3 4' },
          { label: 'Run feedback on Cranfield', command: 'python -m topicmine feedback --alpha 0.5 --lam 0.7 --docs 10 --terms 50' },
          { label: 'Run every experiment', command: 'python experiments/run_all.py --out results/' },
          { label: 'Run the tests', command: 'python -m pytest -q' },
        ],
      },
      requirements: [
        '`data.py` loads the training posts of `comp.graphics`, `rec.sport.hockey`, `sci.space` and `talk.politics.mideast` with `remove=("headers", "footers", "quotes")`, vectorises with `CountVectorizer(stop_words="english", min_df=5, max_df=0.5, token_pattern=r"(?u)\\b[a-zA-Z]{3,}\\b")`, and keeps posts with at least 10 tokens, returning the sparse count matrix, vocabulary and labels.',
        '`assoc.py` computes entropy, conditional entropy and mutual information of binary word presence per post, with 0.25 added to each of the four cells, for one word against all others using sparse matrix products, and returns the top partners.',
        '`em.py` fits the two-component mixture with a fixed background for any count vector, returns the topic, the posteriors and the log-likelihood after every iteration, and raises an error if the log-likelihood ever decreases by more than $10^{-9}$ relative.',
        '`plsa.py` fits PLSA with a background over the nonzero entries of a sparse matrix with vectorised NumPy (no Python loop over words or documents), guards the E-step division when all topics give a word probability zero, and supports multiple seeds, keeping the run with the highest log-likelihood.',
        'The PLSA study reports, for $K = 4$ and 100 iterations, the top 10 words per topic, NMI against the newsgroups for $\\lambda_B \\in \\{0, 0.5, 0.9\\}$, and NMI and final log-likelihood for seeds 0 to 4 at $\\lambda_B = 0.5$, and compares with scikit-learn `LatentDirichletAllocation(n_components=4, learning_method="batch", max_iter=50, random_state=0)`.',
        '`feedback.py` implements KL-divergence retrieval with Dirichlet smoothing over the MP 1 index (rank-equivalent form), and model-based feedback: EM on the counts of the top $k$ documents against the collection model, truncation to the top $m$ terms, and interpolation with weight $\\alpha$.',
        'The feedback study reports MAP and nDCG@10 on all 225 Cranfield queries for the baseline and for $\\alpha \\in \\{0.3, 0.5, 0.7\\}$ by $\\lambda \\in \\{0.5, 0.7, 0.9\\}$, then tunes on odd-numbered queries and reports the chosen setting on even-numbered queries, with the number of queries helped and hurt and a randomisation test.',
        'Rocchio pseudo-feedback ($\\alpha = 1$, $\\beta = 0.75$, $\\gamma = 0$, 10 documents, 30 terms) on sublinear TF-IDF vectors is evaluated on the same queries and compared with model-based feedback.',
        '`REPORT.md` (about 3 pages) includes the association tables, the PLSA and LDA topics, the background and seed experiments, the feedback tables, and a drift analysis of the five queries that feedback hurt most, with their feedback terms.',
      ],
      acceptanceTests: [
        'The corpus has 2,013 posts (of 2,341 before the length filter), a vocabulary of 6,254 words, 203,792 tokens and 125,613 nonzeros, within 1% if your scikit-learn version differs.',
        'EM on counts (4, 3, 2, 1) with background (0.3, 0.01, 0.005, 0.01) and $\\lambda = 0.5$, started from the relative counts, gives after one iteration $z = (0.571, 0.968, 0.976, 0.909)$ and $\\theta = (0.284, 0.361, 0.242, 0.113)$, and after 30 iterations $\\theta_1 = 0.230$, within 0.001, with a non-decreasing log-likelihood throughout.',
        'The top 6 smoothed-MI partners of "hockey" are team, play, game, nhl, teams and ice (MI with team 0.061 bits, within 0.002), and those of "orbit" include earth, space, launch and nasa.',
        'PLSA ($K = 4$, 100 iterations) never decreases its log-likelihood for any seed or $\\lambda_B$. With $\\lambda_B = 0.5$, the best of five seeds reaches NMI of at least 0.70 (reference 0.757, log-likelihood about $-1.551 \\times 10^6$), and $\\lambda_B = 0$ gives an NMI at least 0.1 lower (reference 0.545). scikit-learn LDA reaches 0.72 to 0.79 (reference 0.758). 100 iterations take under 30 seconds on a laptop CPU (reference about 6).',
        'KL-divergence retrieval with $\\mu = 300$ and no feedback reproduces MP 1\'s Dirichlet MAP (0.290) within 0.001. With feedback ($k = 10$ documents, $m = 50$ terms, $\\lambda = 0.7$, $\\alpha = 0.5$), MAP is 0.31 to 0.33 (reference 0.322) and at least 130 queries improve. Tuned on odd queries, the even-query MAP rises from 0.276 to at least 0.30 (reference 0.310).',
        'For Cranfield query 1, the feedback model with $\\lambda = 0.7$ ranks "model", "structur", "aircraft" and "similar" among its top 5 terms, while with $\\lambda = 0$ generic terms such as "high" and "test" enter the top 8, as your report shows side by side.',
      ],
      resources: [
        { title: 'A note on the Expectation-Maximization (EM) algorithm', url: 'https://czhai.cs.illinois.edu/pub/em-note.pdf', type: 'article', cost: 'free', provider: 'ChengXiang Zhai', note: 'The derivation behind `em.py`, for exactly this mixture with a fixed background.', primary: true },
        { title: 'Probabilistic Latent Semantic Analysis', url: 'https://arxiv.org/abs/1301.6705', type: 'article', cost: 'free', provider: 'Thomas Hofmann (UAI 1999)', note: 'The model behind `plsa.py`. Sections 3 and 4.' },
      ],
      stretchGoals: [
        'Add a Dirichlet prior to PLSA\'s topic word distributions (MAP estimation with pseudo-counts), and show how it changes topics for $K = 16$.',
        'Use the PLSA topics as a facet: for each Cranfield query, cluster nothing but show the dominant topic of each of the top 10 results, and judge whether that would help a user.',
      ],
    },
  ],
  finalProject: {
    slug: 'final-covidsearch',
    title: 'covidsearch: an evaluated search and analysis engine for the COVID-19 literature',
    repoName: 'covidsearch',
    summary:
      'A search engine over 171,332 scientific abstracts from the TREC-COVID collection, with your own index and ranking, feedback, learning to rank, a dense hybrid, topic and study-type facets, query difficulty prediction, and an evaluation that says what actually helped.',
    language: 'Python 3.12',
    estimatedHours: 50,
    overview: `In 2020 NIST ran TREC-COVID to find out which search methods help scientists navigate a literature that was growing by thousands of papers a week. Its judgements are public, deep (66,336 judged pairs for 50 topics), and graded, which makes it one of the best collections for testing a real search engine on real needs. In this project you build that engine and find out, with evidence, which of the course's ideas earn their place.

The hook is a question with an answer you can measure. Do the modern methods beat a well-built BM25 on this collection? Published results say the answer is not simple: in the BEIR benchmark, BM25 reached nDCG@10 of 0.656 here, a dense retriever trained on web questions (DPR) only 0.332, and BM25 followed by a cross-encoder reranker 0.757. Your own BM25 should land near 0.65, and the reference run for this page reached 0.661 with $k_1 = 1.2$, $b = 0.75$ on the natural-language questions. Every later component has to beat it under a paired test.

You build, in order: an analyser and compressed index for 171,332 abstracts; BM25 and Dirichlet query likelihood, with title and abstract fields; an evaluation harness for nDCG@10, MAP and judged@10 with significance tests; model-based feedback; a LambdaMART reranker over your own features, cross-validated by topic; a dense retriever and a hybrid; and two analysis features for users, topics of the result list and a study-type label for each abstract. Finally you predict which queries your engine will fail on, before seeing any judgements.

**Design decisions you must make and defend.** Which query field to index against (the short keyword query, the question, or both), how to handle the 22 empty documents, how to keep five-fold cross-validation over only 50 topics honest, how many dense vectors a laptop can afford, and how to present uncertainty when a difference rests on 50 topics.

**Constraints.** Index, ranking, feedback, evaluation and significance tests are your own code, extending MP 1 and MP 2. Libraries are allowed for LightGBM, Sentence-Transformers models, FAISS, LDA and the user interface. Everything runs on a laptop CPU, with dense encoding cached to disk.`,
    setup: {
      extensions: [...pyExtensions, 'github.vscode-github-actions'],
      toolchain: [
        ...pyToolchain,
        'Install the packages: `pip install numpy scipy pandas scikit-learn nltk ir_datasets ir-measures lightgbm sentence-transformers faiss-cpu gensim fastapi uvicorn matplotlib pytest ruff jupyter ipykernel`, then freeze them with `pip freeze > requirements.lock`.',
        'Get the collection with `ir_datasets.load("beir/trec-covid")` or by downloading `trec-covid.zip` (about 70 MB) from the BEIR repository linked below. Keep it outside the repository.',
        'Encoding 171,332 abstracts with a small Sentence-Transformers model takes tens of minutes to a few hours on a laptop CPU. Encode once, save the vectors with `numpy.save`, and make every later step read the cache. A free Colab GPU is an optional shortcut.',
      ],
      structure: `covidsearch/
├── covidsearch/analyse.py     # analyser shared by index and queries
├── covidsearch/index.py       # compressed fielded index (title, abstract)
├── covidsearch/rank.py        # BM25, BM25F-style fields, Dirichlet QL, DAAT + MaxScore
├── covidsearch/feedback.py    # mixture-model feedback from MP 2
├── covidsearch/ltr.py         # features and LightGBM lambdarank, grouped CV
├── covidsearch/dense.py       # cached embeddings, FAISS search, RRF hybrid
├── covidsearch/facets.py      # LDA topics, result clustering, study-type classifier
├── covidsearch/qpp.py         # query performance prediction
├── covidsearch/evaluate.py    # nDCG@10, MAP, judged@10, significance tests
├── covidsearch/app.py         # FastAPI search page with facets
├── covidsearch/__main__.py    # CLI: index, run, eval, serve, all
├── tests/                     # unit tests and a 2,000-document fixture
├── report/report.md           # 8 to 12 pages
├── .github/workflows/ci.yml
├── requirements.lock
└── README.md`,
      commands: [
        { label: 'Build the index', command: 'python -m covidsearch index --out data/covid.idx' },
        { label: 'Run and evaluate the BM25 baseline', command: 'python -m covidsearch run --model bm25 --field question --out runs/bm25.trec; python -m covidsearch eval runs/bm25.trec' },
        { label: 'Run the whole pipeline and rebuild the report tables', command: 'python -m covidsearch all --seed 0 --out results/' },
        { label: 'Start the search page', command: 'uvicorn covidsearch.app:app --port 8000' },
        { label: 'Run the tests', command: 'python -m pytest -q' },
        { label: 'Lint', command: 'ruff check .' },
      ],
    },
    requirements: [
      'The analyser and a compressed, fielded inverted index (title and abstract) cover all 171,332 documents, and the README reports index size, build time and the Zipf and Heaps statistics of the collection.',
      'BM25 (with per-field weights) and Dirichlet query likelihood are implemented in your own DAAT engine with MaxScore, and median query latency on a laptop is reported for each, with top 10 lists identical to exhaustive scoring.',
      'The evaluation harness reports nDCG@10 with the collection\'s grades 0, 1 and 2, MAP@1000, P@10 and judged@10, agrees with `ir_measures` within $10^{-6}$, and every comparison in the report is a paired randomisation test with a bootstrap confidence interval over the 50 topics.',
      'An analyser and query-field study compares stemming, stop words and the three query formulations (keyword query, question, and both), with all parameters tuned by five-fold cross-validation over topics.',
      'Model-based pseudo-relevance feedback from MP 2 is evaluated with parameters chosen by the same cross-validation, and the report lists the topics it helped and hurt with their expansion terms.',
      'A LightGBM lambdarank model reranks the top 100 BM25 documents using at least 10 features you compute (field BM25 scores, QL, feedback score, proximity, document length, dense similarity), trained and evaluated with five-fold cross-validation grouped by topic, with a feature ablation table.',
      'A dense retriever over cached embeddings of a small Sentence-Transformers model is evaluated alone, fused with BM25 by reciprocal rank fusion ($k = 60$), and as a feature in the reranker, with the encoding time and index size reported.',
      'Facets for users: LDA topics fitted on the collection label each result list, the top 50 results of each query are clustered, and a study-type classifier (for example clinical trial, systematic review, modelling, laboratory, other) trained on weak labels from title keywords is evaluated with macro-$F_1$ on 200 abstracts you label by hand.',
      'A query performance predictor estimates each topic\'s nDCG@10 from pre-retrieval (average IDF, query length) and post-retrieval (clarity: KL divergence of the feedback model from the collection model) features, evaluated by Kendall\'s tau with leave-one-topic-out cross-validation.',
      'A FastAPI search page shows results with snippets, the topic and study-type facets, and a "more like this" link per result, and the report (8 to 12 pages) is generated from tracked results by one command.',
    ],
    acceptanceTests: [
      'The collection loads as 171,332 documents, 50 topics and 66,336 judgements (grades 0, 1 and 2). With stemming and stop words, the index has about 165,000 terms and an average document length near 109 tokens, and 22 documents are empty after analysis.',
      'BM25 with $k_1 = 1.2$, $b = 0.75$ on title plus abstract, using the natural-language question, reaches nDCG@10 between 0.63 and 0.68 (reference 0.661) and judged@10 above 0.90 (reference 0.95). With $k_1 = 0.9$, $b = 0.4$ it reaches about 0.645, and Dirichlet QL with $\\mu = 1{,}000$ about 0.586. With the short keyword query instead of the question, BM25 drops to about 0.60 to 0.62.',
      'Your evaluation matches `ir_measures` within $10^{-6}$ for nDCG@10 and AP on every topic, and a randomisation test of BM25 against Dirichlet QL over the 50 topics is reported with its p-value and a confidence interval.',
      'Each of feedback, reranking and the hybrid is reported against the cross-validated BM25 baseline with a paired test. A component counts as an improvement only if the 95% confidence interval of its gain excludes zero; the report states plainly which ones fail that test. In the reference run, mixture feedback on Dirichlet QL ($\\mu = 1{,}000$, 10 documents, 50 terms, $\\lambda = 0.7$, $\\alpha = 0.5$) raised MAP@1000 from 0.206 to 0.236 but lowered nDCG@10 from 0.586 to 0.561, so report both measures and explain the split.',
      'The dense-only run and the RRF hybrid are reported with nDCG@10 and judged@10. Published BEIR results (BM25 0.656, DPR 0.332, ANCE 0.654, ColBERT 0.677, BM25 plus cross-encoder 0.757) are cited for context, and any dense run whose judged@10 falls below 0.8 is flagged, because unjudged documents make its nDCG@10 a lower bound.',
      'The study-type classifier\'s macro-$F_1$ on your 200 hand-labelled abstracts, the query performance predictor\'s Kendall\'s tau, and the search page\'s p95 latency for BM25 (under 300 ms on a laptop) are all reported, with two runs of the pipeline at one seed producing identical metric tables.',
    ],
    coverage: [
      { module: 'text-representation', demonstrates: 'The analyser study, the collection\'s Zipf and Heaps statistics, and the choice between keyword and question queries rest on Module 1.' },
      { module: 'retrieval-models', demonstrates: 'BM25 with field weights and Dirichlet query likelihood are implemented, tuned by cross-validation and compared.' },
      { module: 'search-engine-implementation-and-evaluation', demonstrates: 'A compressed index with MaxScore over 171,332 documents, and an evaluation harness with nDCG@10, judged@10 and randomisation tests.' },
      { module: 'feedback-web-search-and-recommendation', demonstrates: 'Model-based pseudo-relevance feedback, a LambdaMART reranker with grouped cross-validation, and "more like this" content-based recommendations.' },
      { module: 'word-association-and-topic-models', demonstrates: 'LDA topics label result lists, and the feedback model built on EM provides expansion terms and a clarity feature.' },
      { module: 'text-clustering-and-categorisation', demonstrates: 'Result clustering and a study-type classifier evaluated with macro-F1 on hand-labelled abstracts.' },
      { module: 'opinion-mining-and-text-based-prediction', demonstrates: 'Query performance prediction turns text statistics into a prediction of each query\'s effectiveness, evaluated without leakage.' },
      { module: 'neural-retrieval-beyond-the-classic-syllabus', demonstrates: 'A dense retriever, reciprocal rank fusion and a dense feature in the reranker, all judged against tuned BM25.' },
    ],
    portfolio: [
      'The README opens with a screenshot of the search page and a results table (BM25, QL, feedback, reranker, dense, hybrid) with nDCG@10, judged@10 and confidence intervals, followed by reproduction steps that work on a fresh machine.',
      'GitHub Actions runs the tests and lint and a smoke pipeline on the 2,000-document fixture on every push, with a status badge in the README.',
      'The repository has a LICENSE, a data attribution note for TREC-COVID and CORD-19 that says the data is not redistributed, `requirements.lock`, and a tagged `v1.0.0` release.',
      'The report is published as a PDF and states plainly which components did not significantly beat BM25, and why that is a useful result.',
      'A short design note explains the three hardest decisions (query field, cross-validation over 50 topics, dense index size) and what you would change with more time.',
    ],
    resources: [
      { title: 'BEIR datasets (TREC-COVID)', url: 'https://ir-datasets.com/beir.html', type: 'dataset', cost: 'free', provider: 'ir_datasets', note: 'The `beir/trec-covid` entry gives the corpus, queries (with keyword query, question and narrative) and graded qrels.', primary: true },
      { title: 'BEIR: A Heterogeneous Benchmark for Zero-shot Evaluation of Information Retrieval Models', url: 'https://arxiv.org/abs/2104.08663', type: 'article', cost: 'free', provider: 'Thakur and colleagues (2021)', note: 'Table 2 gives the published TREC-COVID results quoted on this page.' },
      { title: 'LightGBM documentation', url: 'https://lightgbm.readthedocs.io/en/latest/', type: 'documentation', cost: 'free', provider: 'Microsoft', note: 'The lambdarank objective and the group parameter used by the reranker.' },
    ],
    stretchGoals: [
      'Add a cross-encoder reranker on the top 50 and measure how much of the published gain (0.656 to 0.757) you can reproduce on a CPU.',
      'Build your own small test collection: write 10 new questions, pool the top 10 of five of your runs, judge the pool, and report how stable your system ranking is.',
    ],
  },
});
