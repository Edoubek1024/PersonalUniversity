import { defineSubject } from '../define';

// The free online edition lives at https://nlp.stanford.edu/IR-book/, which refused connections when this course was
// checked, so the resources point at the Internet Archive copy of the complete online-reading PDF.
const IIR = (title: string, note: string, primary = false) => ({
  title: `Introduction to Information Retrieval: ${title}`,
  url: 'https://web.archive.org/web/20261001040809/https://nlp.stanford.edu/IR-book/pdf/irbookonlinereading.pdf',
  type: 'textbook' as const,
  cost: 'free' as const,
  provider: 'Manning, Raghavan and Schütze (free online edition of the Cambridge University Press book; Internet Archive copy)',
  note,
  ...(primary ? { primary: true } : {}),
});
const TRS = (note: string) => ({
  title: 'Text Retrieval and Search Engines',
  url: 'https://www.coursera.org/learn/text-retrieval',
  type: 'course' as const,
  cost: 'freemium' as const,
  provider: 'ChengXiang Zhai, University of Illinois, on Coursera',
  note: `${note} The videos can be audited free; the certificate is paid.`,
});
const TMA = (note: string) => ({
  title: 'Text Mining and Analytics',
  url: 'https://www.coursera.org/learn/text-mining',
  type: 'course' as const,
  cost: 'freemium' as const,
  provider: 'ChengXiang Zhai, University of Illinois, on Coursera',
  note: `${note} The videos can be audited free; the certificate is paid.`,
});
const TDMA = (note: string) => ({
  title: 'Text Data Management and Analysis (Zhai and Massung)',
  url: 'https://dl.acm.org/doi/book/10.1145/2915031',
  type: 'textbook' as const,
  cost: 'paid' as const,
  provider: 'ACM Books and Morgan & Claypool, 2016',
  note: `${note} This is the book the Illinois course is built on. University libraries often give free access.`,
});
const SLP = (note: string) => ({
  title: 'Speech and Language Processing (3rd edition draft)',
  url: 'https://web.stanford.edu/~jurafsky/slp3/',
  type: 'textbook' as const,
  cost: 'free' as const,
  provider: 'Dan Jurafsky and James H. Martin',
  note,
});

export default defineSubject({
  id: 'text-information-systems',
  title: 'Text Information Systems',
  category: 'cs',
  tagline:
    'How search engines, recommenders and text mining tools work: represent text, rank documents with BM25 and language models, evaluate honestly, then mine topics, categories and opinions from text.',
  description: `Most of the information people create is text: web pages, papers, reviews, messages, reports. A text information system helps someone get at it. It either finds the few documents a person needs (search and recommendation) or turns a large collection into knowledge (text mining). This course teaches how those systems work from the inside, with the algorithms written out, worked by hand on small examples and then implemented in Python and measured on real collections.

The course follows the topics of the University of Illinois Urbana-Champaign course CS 410, Text Information Systems, based on its public catalog description ("theory, design, and implementation of text-based information systems"), its public course pages, and the two Coursera courses taught by ChengXiang Zhai that the online version is built on, Text Retrieval and Search Engines and Text Mining and Analytics. It is an original course written for this site and is not affiliated with or endorsed by the University of Illinois. Nothing here is copied from Illinois course materials.

The first half is text retrieval. You learn how text becomes tokens and vectors, then the retrieval models that still power real search (the vector space model with TF-IDF, BM25, and query likelihood with smoothing), how an inverted index is built, compressed and queried, and how to evaluate a ranking with precision, average precision and nDCG on a test collection. Then come feedback, web search (crawling, PageRank, learning to rank) and recommender systems. The second half is text mining: word association, topic models (PLSA fitted with EM, and LDA), clustering and categorisation, sentiment and opinion mining, and prediction from text joined with its context. A last module, clearly marked as beyond the classic syllabus, shows how embeddings, dense retrieval and retrieval-augmented generation change the picture and what they do not change.

Every lesson ends with a short quiz, and three interactive widgets let you move BM25's parameters, mark documents relevant and watch average precision respond, and run PageRank one step at a time. Two machine problems (a search engine with an evaluation harness on the Cranfield collection, then topic models and model-based feedback built on EM) and a final project (an evaluated search and analysis engine over the TREC-COVID collection) give you working code with measured results.`,
  difficulty: 'intermediate',
  estimatedHours: 84,
  prerequisites: ['data-structures-algorithms', 'probability-statistics'],
  recommendedBackground: [
    'Comfortable writing Python with dictionaries, sorting and NumPy arrays',
    'Hash tables, heaps, sorting and graph basics from a data structures course',
    'Conditional probability, Bayes rule and maximum likelihood estimation',
    'Logistic regression at the level of a first machine learning course helps in Module 6 but is explained there',
  ],
  tags: ['information retrieval', 'search engines', 'BM25', 'language models', 'evaluation', 'text mining', 'topic models', 'sentiment analysis', 'python'],
  core: false,
  modules: [
    {
      slug: 'text-representation',
      title: 'Text and Its Representation',
      description:
        'What text information systems do, how raw text becomes tokens, the statistical laws that shape every vocabulary, and the bag-of-words vectors that the rest of the course builds on.',
      lessons: [
        {
          slug: 'what-text-information-systems-do',
          title: 'What text information systems do',
          summary:
            'Text systems either help a person reach the right documents (pull and push access) or turn a collection into knowledge (mining). Natural language is ambiguous at every level, which is why shallow statistical representations dominate.',
          estimatedMinutes: 100,
          objectives: [
            'Distinguish pull access (querying, browsing) from push access (recommendation, filtering)',
            'Distinguish text retrieval from text mining and name a system of each kind',
            'Name the levels of natural language analysis and give an ambiguity at each',
            'Explain why a bag of words is shallow but robust, and when it fails',
            'Count tokens and types in a short text',
          ],
          concepts: [
            'Pull access: querying and browsing',
            'Push access: recommendation and filtering',
            'Text retrieval versus text mining',
            'Lexical, syntactic, semantic and pragmatic analysis',
            'Ambiguity',
            'Token and type',
            'Shallow versus deep representation',
            'Humans as sensors of the world',
          ],
          explanation: `A **text information system** sits between people and a large amount of text. It does one of two jobs.

**Access**: get a person to the few documents they need. In **pull** mode the person takes the initiative, by typing a query (search) or by following links and categories (browsing). In **push** mode the system takes the initiative: a recommender or filter watches a stream of new items and sends the ones that match a long-standing interest. Search engines, digital libraries and news alerts are access systems.

**Mining**: turn a collection into knowledge a person can act on. Which topics run through ten thousand customer complaints? Is opinion about a product improving? Which words are associated with "outbreak" this month? Here the output is not a list of documents but patterns, summaries and predictions. A useful way to think about it is that people act as **sensors**: they observe the world and report it as text, and mining reads those reports.

Why not just understand the text? Natural language is ambiguous at every level of analysis:

- **Lexical**: "bank" is a river edge or a financial firm.
- **Syntactic**: in "a man saw a boy with a telescope", who has the telescope?
- **Semantic**: "every student read a book" can mean one shared book or many.
- **Pragmatic**: "can you pass the salt?" is a request, not a question about ability.

Deep analysis is slow and brittle across domains, so most working systems use a **shallow** representation: the words, counted. A **token** is one occurrence of a word and a **type** is a distinct word. "the cat saw the dog" has 5 tokens and 4 types. Treating a document as a bag of words throws away order and syntax, yet it is robust, fast, works in any domain and language with a tokeniser, and supports the statistics that the rest of this course is built on. Its failures (negation, word sense, phrases) are worth remembering, because later modules patch them one at a time.

Watch the first week of the Coursera retrieval course for the instructor's own framing of this course, then read Chapter 1 of Zhai and Massung if you have access, or IIR Chapter 1 for the retrieval side.`,
          resources: [
            TRS('Orientation and Week 1: the course overview, natural language content analysis and text access.'),
            IIR('Chapter 1, Boolean retrieval', 'The opening sections define the retrieval problem, documents, collections and relevance.', true),
            TDMA('Chapters 1 to 3: background, text data access and the course map.'),
          ],
          exercises: [
            {
              slug: 'classify-systems',
              title: 'Pull, push or mining?',
              prompt:
                'For each system say whether it provides pull access, push access, or mining, and what its input and output are: (a) a library catalogue search box; (b) an email spam filter; (c) arXiv daily listings filtered by your saved keywords; (d) a dashboard showing the ten most discussed product defects this week; (e) a site map you click through; (f) a tool that predicts tomorrow\'s demand from social media posts; (g) a music service that queues the next song. For two of them, describe what would count as a wrong output and who would notice.',
              kind: 'writing',
              difficulty: 1,
            },
            {
              slug: 'tokens-and-types',
              title: 'Count tokens and types in Python',
              prompt:
                'Write `def tokens_and_types(text)` that lower-cases the text, splits it on anything that is not a letter or digit (use `re.findall(r"[a-z0-9]+", text.lower())`), and returns the number of tokens and the number of types. Check: `"The cat saw the dog, and the dog saw the cat."` gives `(11, 5)`. Then run it on Pride and Prejudice from Project Gutenberg (strip the Gutenberg header and licence first) and report both numbers and the ten most frequent types. Say what fraction of the tokens those ten types account for.',
              kind: 'coding',
              difficulty: 1,
              hint: 'collections.Counter gives you the frequencies. The ten most frequent types in an English novel are almost all function words.',
            },
            {
              slug: 'ambiguity-hunt',
              title: 'Ambiguity at four levels',
              prompt:
                'Find four real headlines or sentences (from news sites or your own email) that are ambiguous, one at each level: lexical, syntactic, semantic and pragmatic. For each, write both readings and say whether a bag-of-words search engine would be affected by the ambiguity (would it return wrong documents for a query using those words?). About 50 words each.',
              kind: 'writing',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What is the difference between pull and push access, and which one does a recommender provide?',
              answerOutline: 'Pull: the user starts each interaction with a query or by browsing. Push: the system acts on a standing interest and delivers new items. A recommender is push.',
            },
            {
              question: 'Why do most practical text systems use a bag-of-words representation despite its known flaws?',
              answerOutline: 'Deep NLP is slow and brittle across domains and languages; counting words is fast, robust, general, and supports the statistics that ranking and mining need. Its flaws are order, negation, phrases and word sense.',
            },
            {
              question: 'How does text retrieval differ from text mining in what it outputs?',
              answerOutline: 'Retrieval outputs documents (usually a ranked list) for a person to read. Mining outputs knowledge extracted from many documents: topics, associations, categories, opinions, predictions.',
            },
          ],
          quiz: [
            {
              question: 'A news app learns which subjects you read and sends you new articles about them without you typing anything. What kind of access is this?',
              options: [
                'Pull access by querying: the app runs your past searches again',
                'Push access: information filtering on a standing interest',
                'Text mining: it extracts topics from the news',
                'Pull access by browsing: you follow its categories',
              ],
              answer: 1,
              explanation:
                'The system takes the initiative and delivers items that match a long-term interest, which is push access (filtering or recommendation). It may use topics internally, but its output is documents for you to read, not mined knowledge, so it is not text mining.',
            },
            {
              question: 'The sentence "Visiting relatives can be tiring" has two meanings: going to see relatives, or relatives who visit. Which level of ambiguity is this?',
              options: [
                'Syntactic: the same words fit two different structures',
                'Lexical: the word "relatives" has two senses',
                'Pragmatic: it depends on what the speaker intends to achieve',
                'Semantic: the quantifier scope is unclear',
              ],
              answer: 0,
              explanation:
                'Every word keeps its meaning; what changes is the structure, whether "visiting" is a verb with "relatives" as its object or an adjective describing "relatives". That is syntactic ambiguity. "Relatives" means family members in both readings, so it is not lexical.',
            },
            {
              question: 'Using the lesson\'s tokeniser (lower-case, split on non-letters), how many tokens and types are in "the cat saw the dog and the dog saw the cat"?',
              options: ['5 tokens and 11 types', '11 tokens and 11 types', '11 tokens and 6 types', '11 tokens and 5 types'],
              answer: 3,
              explanation:
                'There are 11 words in total, so 11 tokens. The distinct words are the, cat, saw, dog and and, so 5 types. Types can never outnumber tokens. Six types would count "the" twice or add a word that is not there.',
            },
          ],
        },
        {
          slug: 'tokenisation-and-normalisation',
          title: 'Tokenisation, stop words and stemming',
          summary:
            'Every search engine first turns text into terms. The choices made here (where to split, whether to fold case, drop stop words, stem) change the vocabulary, the index size and which documents can match.',
          estimatedMinutes: 130,
          objectives: [
            'Write a tokeniser and explain the decisions it makes about punctuation, case and numbers',
            'Explain what stop word removal does to token counts and to vocabulary size',
            'Apply the Porter stemmer and recognise over-stemming and under-stemming',
            'Contrast stemming with lemmatisation',
            'Explain why documents and queries must go through the same analyser',
          ],
          concepts: [
            'Tokenisation',
            'Case folding',
            'Stop words',
            'Stemming (Porter)',
            'Over-stemming and under-stemming',
            'Lemmatisation',
            'Analyser applied to documents and queries',
            'Term (index unit)',
          ],
          explanation: `An index stores **terms**, not raw strings, and the **analyser** that produces them is a chain of small decisions.

**Tokenisation** splits text into tokens. Splitting on anything that is not a letter or digit is simple and common, and it already makes choices: "U.S." becomes "u" and "s", "growth-rate" becomes two tokens, "2.5%" becomes "2" and "5", and "C++" becomes "c". Each choice decides which queries can match. Languages without spaces, such as Chinese, need a word segmenter instead.

**Case folding** maps "Apple" and "apple" to one term. That helps recall and occasionally merges different things (the company and the fruit).

**Stop words** are very frequent function words such as "the", "of" and "and". On the Cranfield collection (1,400 aerodynamics abstracts), removing scikit-learn's English stop list of 318 words deletes 44.3% of the 226,526 tokens, yet shrinks the vocabulary only from 7,471 to 7,218 types. So stop words make up a large share of the postings but very little of the dictionary. Modern engines often keep them, because phrases like "to be or not to be" are all stop words and good ranking functions give such words little weight anyway.

**Stemming** strips suffixes so that inflected forms meet. The Porter stemmer applies ordered rewrite rules: "connections", "connected" → "connect", "boundary", "boundaries" → "boundari". A stem need not be a word. It can **over-stem**, merging words with different meanings ("university" and "universe" → "univers", "organization" and "organ" → "organ"), and it can **under-stem**: "experimental" → "experiment" but "experiment" → "experi", so the two still do not meet. On Cranfield, stemming cuts the vocabulary from 7,218 to 4,611 types and, with BM25 (Module 2), raises mean average precision from 0.279 to 0.305. **Lemmatisation** maps a word to its dictionary form using a vocabulary and part of speech ("better" → "good"). It is more accurate and slower.

The rule that matters most: **queries and documents must pass through the same analyser**. If the index is stemmed and the query is not, the query term "connections" will never be found.

Read IIR Sections 2.1 and 2.2, then try the Porter stemmer on your own words with NLTK.`,
          resources: [
            IIR('Chapter 2, The term vocabulary and postings lists', 'Sections 2.1 and 2.2 cover tokenisation, stop words, normalisation, stemming and lemmatisation.', true),
            { title: 'The Porter Stemming Algorithm', url: 'https://tartarus.org/martin/PorterStemmer/', type: 'article', cost: 'free', provider: 'Martin Porter', note: 'The original definition and reference implementations. Read the rule steps once to see how mechanical stemming is.' },
            { title: 'Natural Language Processing with Python, Chapter 3', url: 'https://www.nltk.org/book/', type: 'textbook', cost: 'free', provider: 'Bird, Klein and Loper (NLTK book)', note: 'Section 3.6 on normalising text shows the Porter and Lancaster stemmers and the WordNet lemmatiser side by side.' },
          ],
          exercises: [
            {
              slug: 'write-an-analyser',
              title: 'Write and test an analyser',
              prompt:
                'Write `analyse(text, stop=True, stem=True)` that lower-cases, extracts tokens with `re.findall(r"[a-z0-9]+", ...)`, optionally drops words in `sklearn.feature_extraction.text.ENGLISH_STOP_WORDS`, and optionally applies `nltk.stem.PorterStemmer().stem`. Check that `analyse("The U.S. economy\'s growth-rate fell 2.5% in 2024", stop=False, stem=False)` returns `[\'the\', \'u\', \'s\', \'economy\', \'s\', \'growth\', \'rate\', \'fell\', \'2\', \'5\', \'in\', \'2024\']`. Then call it with both options on and explain each token that disappears or changes. Propose one change to the tokeniser that would keep "U.S." as one term, and one query it would break.',
              kind: 'coding',
              difficulty: 1,
            },
            {
              slug: 'cranfield-vocabulary',
              title: 'Measure four analysers on Cranfield',
              prompt:
                'Load the Cranfield collection with `ir_datasets.load("cranfield")` and analyse every document\'s `text` four ways: plain, stop words removed, stemmed only, and both. For each, report the number of tokens and of types. With the analyser above you should see 226,526 tokens and 7,471 types plain, 126,090 tokens and 7,218 types without stop words, and 4,611 types with both. Explain in two sentences why stop removal changes the token count so much more than the type count, and why stemming does the opposite.',
              kind: 'data-analysis',
              difficulty: 2,
              hint: 'Exact counts depend on the regular expression and the NLTK version; yours should be within a few types of these.',
            },
            {
              slug: 'stem-by-hand',
              title: 'Predict the stems',
              prompt:
                'Before running anything, predict the Porter stems of: relational, generalization, ponies, caresses, happiness, running, probate, probability, policy, police, news, flies. Then check with NLTK. Mark each mismatch with your prediction, and classify each pair (probate/probability, policy/police) as a correct conflation, an over-stem, or kept apart. Say which of these would hurt a search for "police reports" and why.',
              kind: 'problem',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does stop word removal shrink the token count a lot but the vocabulary very little?',
              answerOutline: 'Stop words are few distinct types (a few hundred) but each is extremely frequent, so together they are a large share of all tokens and a tiny share of all types.',
            },
            {
              question: 'Give one example each of over-stemming and under-stemming.',
              answerOutline: 'Over: university and universe both become univers (different meanings merged). Under: experimental becomes experiment while experiment becomes experi (related forms left apart).',
            },
            {
              question: 'What goes wrong if documents are stemmed at indexing time but queries are not?',
              answerOutline: 'Query terms keep their suffixes and do not match the stemmed index terms, so documents that contain the word in any form are missed. Both must use the same analyser.',
            },
          ],
          quiz: [
            {
              question: 'A collection has 2,400,000 tokens. Stop words make up 40% of them. After removing stop words, how many tokens remain?',
              options: ['960,000', '2,360,000', '1,440,000', 'Still 2,400,000, because only the vocabulary shrinks'],
              answer: 2,
              explanation:
                'Removing 40% of the tokens leaves 60%: $0.6 \\times 2{,}400{,}000 = 1{,}440{,}000$. 960,000 is the number removed, not the number left. Stop removal deletes token occurrences, so the token count does fall, and by much more than the vocabulary does.',
            },
            {
              question: 'Which Porter-stemmer conflation is most likely to hurt precision?',
              options: [
                '"connected" and "connections" both become "connect"',
                '"university" and "universe" both become "univers"',
                '"boundary" and "boundaries" both become "boundari"',
                '"running" becomes "run"',
              ],
              answer: 1,
              explanation:
                'A search for "university rankings" would now also match documents about the universe, which is a different meaning, so precision drops. The other three merge forms of the same word, which helps recall without changing meaning.',
            },
            {
              question: 'On Cranfield, stop word removal shrinks the vocabulary from 7,471 to 7,218 types, while stemming shrinks it from 7,218 to 4,611. Which statement explains this?',
              options: [
                'Stop words are few types with many occurrences, while stemming merges many rare inflected types',
                'Stemming removes more tokens than stop word removal does',
                'Stop word removal is less accurate than stemming',
                'Cranfield has unusually few stop words',
              ],
              answer: 0,
              explanation:
                'Removing about 300 stop word types can only remove about 300 types, although they hold 44% of the tokens. Stemming deletes no tokens at all. It merges types, and an English vocabulary has thousands of inflected variants.',
            },
            {
              question: 'Your index is built with stemming. A user searches for "turbulent boundaries" and the query is lower-cased but not stemmed. What happens?',
              options: [
                'The results are identical, because the index already holds the stems',
                'Ranking is slightly worse because the IDF values differ',
                'The engine stems the documents again at query time',
                'Neither query term matches, because the index holds "turbul" and "boundari"',
              ],
              answer: 3,
              explanation:
                'Index terms are stems, so the unstemmed strings "turbulent" and "boundaries" are simply not in the dictionary and match nothing. The fix is to run the query through the same analyser as the documents. Nothing is re-stemmed at query time unless you do it.',
            },
          ],
        },
        {
          slug: 'zipf-and-heaps-laws',
          title: "Zipf's law and Heaps' law",
          summary:
            'Word frequencies fall roughly as one over rank, and vocabulary keeps growing as a collection grows. These two regularities explain stop words, long postings lists for a few terms, and why IDF works.',
          estimatedMinutes: 120,
          objectives: [
            "State Zipf's law and estimate a word's frequency from its rank",
            "State Heaps' law and predict vocabulary size for a larger collection",
            'Fit both laws on log-log axes and read the exponents',
            'Explain what the laws imply for index size, stop words and term weighting',
          ],
          concepts: [
            "Zipf's law: frequency about C / rank",
            'Rank-frequency plot on log-log axes',
            'Hapax legomena',
            "Heaps' law: V = K n^beta",
            'Long tail of rare terms',
            'Power-law fit by least squares on logs',
            'Consequences for postings lengths',
          ],
          explanation: `Count every word in a collection, sort by frequency, and give the most frequent word rank 1. **Zipf's law** says frequency falls roughly as a power of rank:

$$f(r) \\approx \\frac{C}{r^{s}}, \\qquad s \\approx 1.$$

So the second word is about half as frequent as the first, and the tenth about a tenth. On log-log axes this is a straight line with slope $-s$. On Cranfield (226,526 tokens), "the" occurs 19,433 times, the 10th word ("with") 2,262 times, the 100th 301 times and the 1,000th 29 times, so $r \\cdot f$ stays between about 18,000 and 30,000. A least-squares fit on ranks 10 to 1,000 gives a slope of $-0.96$. At the other end, 2,649 of the 7,471 types (35%) occur exactly once. Those are the **hapax legomena**.

**Heaps' law** describes how the vocabulary $V$ grows with the number of tokens $n$:

$$V \\approx K n^{\\beta}, \\qquad 0.4 \\lesssim \\beta \\lesssim 0.6.$$

Vocabulary never stops growing: new names, numbers and typos keep arriving. On Cranfield, $V$ is 364 after 1,000 tokens, 1,692 after 10,000 and 7,471 after all 226,526, and a fit on log-log axes gives $\\beta \\approx 0.56$, $K \\approx 8.6$. Extrapolating to a million tokens predicts $8.6 \\times 10^{6 \\times 0.56} \\approx 19{,}000$ types.

**Worked example.** If the top word occurs 60,000 times and $s = 1$, the word at rank 20 should occur about $60{,}000 / 20 = 3{,}000$ times. If a collection follows $V = 30 n^{0.5}$, then 4 million tokens give $30 \\times 2{,}000 = 60{,}000$ types, and quadrupling the text only doubles the vocabulary.

Why this matters for the rest of the course:

- A handful of terms have enormous postings lists, and these are the stop words. Most terms have tiny ones, so compression and query processing are designed around this skew (Module 3).
- Very frequent words carry little information about what a document is about. Inverse document frequency (Module 2) turns that observation into a weight.
- The dictionary keeps growing with the collection, so an index must handle new terms.

A pitfall: both laws are rough. Zipf's line bends at the top and bottom ranks, and the fitted exponents depend on the tokeniser and the range of ranks used, so always state how you fitted them.`,
          resources: [
            IIR('Chapter 5, Index compression', "Section 5.1 gives Heaps' law and Zipf's law with the Reuters-RCV1 collection.", true),
            { title: "Zipf's law", url: 'https://en.wikipedia.org/wiki/Zipf%27s_law', type: 'article', cost: 'free', provider: 'Wikipedia', note: 'The statement, the log-log picture and the many places it appears beyond text.' },
            { title: 'Pride and Prejudice (Project Gutenberg eBook 1342)', url: 'https://www.gutenberg.org/ebooks/1342', type: 'dataset', cost: 'free', provider: 'Project Gutenberg', note: 'Plain-text download for the exercises.' },
          ],
          exercises: [
            {
              slug: 'zipf-plot',
              title: 'Rank-frequency plot of a novel',
              prompt:
                'Tokenise Pride and Prejudice (Gutenberg plain text with the header and licence removed) with the lesson\'s tokeniser. Plot frequency against rank on log-log axes, fit a straight line by least squares on ranks 10 to 1,000, and report the slope and the value of $r \\cdot f$ at ranks 1, 10, 100 and 1,000. Repeat with Cranfield and compare the slopes. Say where the straight line fits worst and give one reason.',
              kind: 'data-analysis',
              difficulty: 1,
            },
            {
              slug: 'heaps-fit',
              title: "Fit Heaps' law and extrapolate",
              prompt:
                'Stream the Cranfield tokens in document order and record the vocabulary size after 1,000, 10,000, 50,000, 100,000 tokens and the end. You should see 364, 1,692, 3,922, 5,199 and 7,471. Fit $\\log V = \\log K + \\beta \\log n$ and report $K$ and $\\beta$ (about 8.6 and 0.56). Predict the vocabulary of a collection ten times larger, then test the prediction on the 171,332-document TREC-COVID corpus (or any larger collection you have) and explain why the prediction is off.',
              kind: 'data-analysis',
              difficulty: 2,
              hint: 'A different domain brings a different vocabulary, so K changes, not just n.',
            },
            {
              slug: 'zipf-coverage',
              title: 'How much do the top words cover?',
              prompt:
                "Assume Zipf's law with $s = 1$ holds exactly for a vocabulary of $V$ types, so $f(r) = C / r$. Show that the fraction of all tokens taken by the top $k$ types is $H_k / H_V$, where $H_m = \\sum_{i=1}^{m} 1/i$. Compute it for $k = 100$ and $V = 50{,}000$ using $H_m \\approx \\ln m + 0.5772$. Compare with the share of tokens that the 100 most frequent Cranfield words actually take, and explain the difference.",
              kind: 'derivation',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: "What does Zipf's law look like on a log-log rank-frequency plot, and what is the slope?",
              answerOutline: 'A roughly straight line falling with slope about -1 (minus the exponent s), usually bending at the very top and in the tail.',
            },
            {
              question: "If V = K n^0.5, by how much does the vocabulary grow when the collection grows 100 times?",
              answerOutline: 'By a factor of 100^0.5 = 10.',
            },
            {
              question: 'Name two consequences of the Zipfian skew for building a search engine.',
              answerOutline: 'A few terms have huge postings lists (worth compressing and skipping, low weight in ranking); most terms are rare with tiny postings; frequent terms carry little information, which motivates IDF.',
            },
          ],
          quiz: [
            {
              question: "A collection follows Zipf's law with $s = 1$. Its most frequent word occurs 80,000 times. About how often does the word at rank 40 occur?",
              options: ['3,200 times', '79,960 times', '50 times', '2,000 times'],
              answer: 3,
              explanation:
                'With $s = 1$, $f(r) = f(1)/r = 80{,}000 / 40 = 2{,}000$. 3,200 comes from dividing by 25, a wrong rank. 79,960 subtracts the rank instead of dividing. 50 is $2{,}000/40$, which divides twice.',
            },
            {
              question: "A collection follows Heaps' law $V = 20\\,n^{0.5}$. How many types do you expect at 4,000,000 tokens?",
              options: ['40,000', '80,000,000', '2,000', '200,000'],
              answer: 0,
              explanation:
                '$\\sqrt{4{,}000{,}000} = 2{,}000$ and $20 \\times 2{,}000 = 40{,}000$. 2,000 forgets $K$. 80,000,000 multiplies $K$ by $n$ without the square root.',
            },
            {
              question: "Which statement correctly separates Zipf's law from Heaps' law?",
              options: [
                'Zipf says vocabulary grows as a power of collection size; Heaps says frequency falls with rank',
                'Zipf describes the frequency of words by rank within one collection; Heaps describes how the number of distinct words grows as the collection grows',
                'Both describe vocabulary growth, with different exponents',
                'Zipf applies to stop words only and Heaps to content words only',
              ],
              answer: 1,
              explanation:
                'Zipf is a statement about one fixed collection: sort words by frequency and frequency falls as roughly $1/r$. Heaps is about growth: as you read more tokens, the vocabulary keeps growing, as $n^{\\beta}$. The first option swaps the two.',
            },
          ],
        },
        {
          slug: 'bag-of-words-n-grams-and-vectors',
          title: 'Bag of words, n-grams and document vectors',
          summary:
            'A document becomes a sparse vector of term counts over the vocabulary. Cosine similarity compares such vectors, n-grams recover a little word order, and the same counts read as probabilities give a unigram language model.',
          estimatedMinutes: 130,
          objectives: [
            'Build a term-document matrix and explain why it is sparse',
            'Compute cosine similarity between two count vectors by hand',
            'Explain what word n-grams and character n-grams add, and what they cost',
            'Read normalised counts as a unigram language model',
            'Use scikit-learn\'s CountVectorizer and inspect its output',
          ],
          concepts: [
            'Term-document matrix',
            'Sparse vector representation',
            'Binary versus count features',
            'Cosine similarity',
            'Word n-grams',
            'Character n-grams',
            'Unigram language model',
            'Order lost by bag of words',
          ],
          explanation: `Fix a vocabulary of $V$ terms. A document $d$ becomes a vector whose $i$-th entry is the count $c(w_i, d)$, and a collection of $N$ documents becomes an $N \\times V$ **term-document matrix**. Almost every entry is zero: a 100-word abstract uses perhaps 70 of thousands of types. Storing only the nonzeros (a sparse matrix) is essential, and the inverted index of Module 3 is exactly this matrix stored by column.

**Cosine similarity** compares two vectors by the angle between them, so document length does not dominate:

$$\\cos(x, y) = \\frac{x \\cdot y}{\\lVert x \\rVert\\,\\lVert y \\rVert}.$$

**Worked example.** Over the vocabulary (solar, battery, storage), the document "solar battery battery" is $x = (1, 2, 0)$ and "battery storage" is $y = (0, 1, 1)$. Then $x \\cdot y = 2$, $\\lVert x \\rVert = \\sqrt{5}$, $\\lVert y \\rVert = \\sqrt{2}$, and $\\cos = 2 / \\sqrt{10} \\approx 0.632$. Only shared terms contribute to the dot product, which is why scoring only has to visit documents that contain a query term.

The bag of words forgets order: "dog bites man" and "man bites dog" get the same vector, and "not good" looks like "good". **Word n-grams** add a little order back. The bigrams of "to be or not to be" are to-be, be-or, or-not, not-to and to-be again: five bigram tokens and four bigram types. Bigrams capture phrases like "new york" and "not good", at the cost of a far larger and sparser vocabulary. **Character n-grams** ("sol", "ola", "lar" for "solar") tolerate spelling errors and unknown words and work for languages without spaces.

Read the counts another way. Dividing by the document length gives a probability distribution over words, $p(w \\mid d) = c(w, d) / |d|$. That is a **unigram language model**, the simplest model of how the document's words were generated. Module 2 ranks documents by how likely their language model makes the query, and Module 5 finds topics as such distributions.

\`\`\`python
from sklearn.feature_extraction.text import CountVectorizer
docs = ["solar battery battery", "battery storage"]
cv = CountVectorizer(ngram_range=(1, 2))
X = cv.fit_transform(docs)
print(cv.get_feature_names_out(), X.toarray())
\`\`\`

Read the scikit-learn text feature extraction guide, then IIR Section 6.3 on the vector space view.`,
          resources: [
            { title: 'Text feature extraction (scikit-learn user guide)', url: 'https://scikit-learn.org/stable/modules/feature_extraction.html#text-feature-extraction', type: 'documentation', cost: 'free', provider: 'scikit-learn', note: 'Bag of words, sparsity, n-grams, character n-grams and the hashing trick, with code.', primary: true },
            IIR('Chapter 6, Scoring, term weighting and the vector space model', 'Section 6.3 builds document vectors and cosine similarity.'),
            SLP('Chapter 3 (n-gram language models) for n-grams and the unigram model as probabilities.'),
          ],
          exercises: [
            {
              slug: 'countvectorizer-shapes',
              title: 'Inspect a term-document matrix',
              prompt:
                'Run `CountVectorizer()` on the three sentences "the cat sat on the mat", "the dog sat on the log" and "cats and dogs". Report the vocabulary, the matrix shape and the number of nonzero entries (expected: 10 terms, shape (3, 10), 13 nonzeros). Repeat with `ngram_range=(1, 2)` and report how the shape and density change. Explain why "cats" and "cat" are different columns and what would merge them.',
              kind: 'coding',
              difficulty: 1,
            },
            {
              slug: 'sparsity-20ng',
              title: 'How sparse is real text?',
              prompt:
                'Load the 20 Newsgroups training set with `fetch_20newsgroups(subset="train", remove=("headers", "footers", "quotes"))` (11,314 posts). Build count matrices with unigrams, unigrams plus bigrams, and unigrams to trigrams, each with `min_df=2`. Report the number of columns, the number of nonzeros, the density and the memory of the CSR arrays. Then compute the dense memory a NumPy float64 array of the same shape would need, and say what this means for how a search engine stores the matrix.',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'cosine-by-hand',
              title: 'Cosine similarity by hand and in code',
              prompt:
                'Over the vocabulary (wind, power, battery, solar), let $d_1 = (2, 1, 0, 0)$, $d_2 = (1, 1, 1, 1)$ and $q = (1, 0, 1, 0)$. Compute the cosine of $q$ with each document by hand (expected 0.632 and 0.707), say which ranks first, and check with NumPy. Then double every count in $d_1$ and explain why its cosine does not change, while its dot product with $q$ doubles.',
              kind: 'problem',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'Why is a term-document matrix stored sparsely, and how does that connect to an inverted index?',
              answerOutline: 'Nearly all entries are zero because each document uses a tiny fraction of the vocabulary. An inverted index stores, for each term (column), the nonzero entries: which documents contain it and how often.',
            },
            {
              question: 'What do bigrams capture that unigrams miss, and what do they cost?',
              answerOutline: 'Local order and phrases (new york, not good). They multiply the vocabulary and make vectors sparser, so more data is needed to estimate their statistics.',
            },
            {
              question: 'How does a count vector become a unigram language model?',
              answerOutline: 'Divide each count by the document length so the entries sum to 1: p(w|d) = c(w,d)/|d|.',
            },
          ],
          quiz: [
            {
              question: 'Over a four-term vocabulary, $a = (1, 1, 0, 2)$ and $b = (0, 1, 1, 1)$. What is their cosine similarity?',
              options: ['3', '0.5', '0.866', '0.707'],
              answer: 3,
              explanation:
                'The dot product is $0 + 1 + 0 + 2 = 3$. The norms are $\\sqrt{6}$ and $\\sqrt{3}$, so the cosine is $3/\\sqrt{18} = 3/4.243 \\approx 0.707$. 3 is the dot product before dividing by the norms.',
            },
            {
              question: 'How many bigram tokens and bigram types does "to be or not to be" contain?',
              options: ['6 tokens and 5 types', '5 tokens and 4 types', '5 tokens and 5 types', '4 tokens and 4 types'],
              answer: 1,
              explanation:
                'Six words give $6 - 1 = 5$ bigrams: to-be, be-or, or-not, not-to and to-be. "to-be" appears twice, so there are 4 distinct types. Six tokens counts words, not adjacent pairs.',
            },
            {
              question: 'A user complains that a bag-of-words engine ranks "the drug did not reduce symptoms" as high as "the drug reduced symptoms" for the query "drug reduces symptoms". Which change addresses the cause most directly?',
              options: [
                'Add word bigrams such as "not reduce" as features',
                'Use cosine similarity instead of a dot product',
                'Remove stop words, including "not"',
                'Use character n-grams instead of words',
              ],
              answer: 0,
              explanation:
                'Both sentences share the same content words, and the bag of words throws away the order that carries the negation. A bigram such as "not reduce" brings back that local order. Cosine only changes length normalisation. Dropping "not" as a stop word makes the problem worse.',
            },
          ],
          relatedLessons: ['linear-algebra-for-data-science/vectors-and-matrices-as-data/cosine-similarity'],
        },
      ],
    },
    {
      slug: 'retrieval-models',
      title: 'Retrieval Models',
      description:
        'How a search engine decides which documents come first: Boolean selection versus ranking, the vector space model with TF-IDF, BM25 and its length normalisation, and query likelihood with smoothed language models.',
      lessons: [
        {
          slug: 'the-retrieval-problem-and-boolean-search',
          title: 'The retrieval problem and Boolean search',
          summary:
            'Retrieval can select a set or rank a list. Boolean queries select by merging postings lists, and the probability ranking principle explains why ranking usually serves people better.',
          estimatedMinutes: 120,
          objectives: [
            'State the ad hoc retrieval problem: query, collection, relevance',
            'Evaluate AND, OR and NOT queries by merging sorted postings lists',
            'Give the cost of a postings merge and the reason to process rare terms first',
            'State the probability ranking principle and its assumptions',
            'Explain why ranking beats selection for most users',
          ],
          concepts: [
            'Ad hoc retrieval',
            'Relevance',
            'Document selection versus document ranking',
            'Boolean query',
            'Postings list intersection (merge)',
            'Probability ranking principle',
            'Precision-recall trade-off of a set',
          ],
          explanation: `In **ad hoc retrieval** a user brings a query $q$ to a fixed collection $C$, and the system should return the documents that are **relevant**: useful to that user for that need. Relevance is judged by people, which is why evaluation (Module 3) needs human judgements.

There are two ways to answer. **Selection** returns a set: a function decides for each document whether it is in or out. **Ranking** returns an ordered list and leaves the user to decide where to stop.

The classic selection model is **Boolean retrieval**. A query like \`solar AND battery AND NOT wind\` is evaluated on postings lists, the sorted lists of document IDs containing each term. In the course's small collection (D1 to D5, used again in the next lessons), solar is in [1, 2, 4], battery in [1, 2, 3, 5] and wind in [2, 3]. Intersecting two sorted lists walks both with two pointers, advancing the one with the smaller ID:

- solar AND battery = [1, 2]
- (solar AND battery) AND NOT wind = [1]
- battery AND NOT solar = [3, 5]

A merge costs $O(m + n)$ for lists of lengths $m$ and $n$. For a conjunction of many terms, process them from the shortest list up, since the intermediate result can never be longer than the shortest list so far.

Boolean search is precise and predictable, and it is still how lawyers, patent examiners and librarians search. But users must guess the right query: AND of many terms returns nothing, OR returns thousands, and the set is unordered. Even a perfect classifier of relevance would struggle, because relevance is a matter of degree.

The **probability ranking principle** (Robertson, 1977) says that if a system ranks documents by decreasing probability of relevance, and that probability is estimated as well as possible from the data, then the ranking is optimal for any user who reads from the top. It assumes that relevance of one document does not depend on others (no redundancy) and that the user reads in order. Every model in this module is a way to produce a score that orders documents as that probability would.

Read IIR Chapter 1, which builds the Boolean model and the merge algorithm in full, then watch the Coursera lecture on text retrieval problems.`,
          resources: [
            IIR('Chapter 1, Boolean retrieval', 'Sections 1.1 to 1.3: the inverted index, the intersection algorithm and query optimisation by list length.', true),
            TRS('Week 1: "Text Retrieval Problem" and "Overview of Text Retrieval Methods".'),
            IIR('Chapter 11, Probabilistic information retrieval', 'Section 11.2 states the probability ranking principle and its assumptions.'),
          ],
          exercises: [
            {
              slug: 'implement-intersect',
              title: 'Implement postings intersection',
              prompt:
                'Write `intersect(p1, p2)`, `union(p1, p2)` and `and_not(p1, p2)` for sorted Python lists using two pointers, never `set`. Test: `intersect([1, 2, 4, 11, 31, 45, 173, 174], [2, 31, 54, 101])` is `[2, 31]`; `and_not([1, 2, 3, 5], [1, 2, 4])` is `[3, 5]`. Then write `and_query(terms, index)` that processes terms from the shortest list up and stops early when the result is empty. Count comparisons for the two orders on lists of lengths 10, 1,000 and 100,000 that you generate, and report the ratio.',
              kind: 'coding',
              difficulty: 1,
            },
            {
              slug: 'boolean-cranfield',
              title: 'Boolean queries on Cranfield',
              prompt:
                'Build a dictionary from term to sorted document IDs for Cranfield (stemmed, stop words removed). For Cranfield query 1, form the AND of all its terms and the OR of all its terms, and report the size of each result and how many of the 28 documents judged relevant (relevance code 1 to 4) each contains. Then find, by trial, a Boolean query of your own that returns between 10 and 50 documents with as many relevant ones as you can. Write what this tells you about asking users to write Boolean queries.',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'prp-assumptions',
              title: 'When the ranking principle fails',
              prompt:
                'Give two concrete search situations where ranking strictly by probability of relevance is not the best ranking for the user: one where documents are redundant (near duplicates) and one where the query is ambiguous (for example "jaguar"). For each, describe a better ranking and name the assumption of the probability ranking principle that is broken. About 150 words.',
              kind: 'writing',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why should a conjunctive query process its shortest postings list first?',
              answerOutline: 'The intersection can never be longer than the shortest list, so starting with it keeps intermediate results small and reduces the work of every later merge.',
            },
            {
              question: 'State the probability ranking principle and one assumption behind it.',
              answerOutline: 'Ranking by decreasing estimated probability of relevance is optimal. Assumptions: relevance of each document is independent of others, users read top down, probabilities are estimated as accurately as possible.',
            },
            {
              question: 'Give two drawbacks of Boolean selection for an everyday user.',
              answerOutline: 'Hard to choose a query that is neither too strict (empty) nor too loose (too many); the result is unordered; relevance is graded but the model is binary.',
            },
          ],
          quiz: [
            {
              question: 'Postings lists are $A = [2, 5, 8, 13, 21]$ and $B = [3, 5, 13, 34]$. What is $A$ AND NOT $B$?',
              options: ['[5, 13]', '[2, 8, 21]', '[3, 34]', '[2, 3, 8, 21, 34]'],
              answer: 1,
              explanation:
                'AND NOT keeps the documents in $A$ that are not in $B$: remove 5 and 13 from $A$ to get [2, 8, 21]. [5, 13] is the intersection. [3, 34] is $B$ AND NOT $A$. The last option is the symmetric difference.',
            },
            {
              question: 'A query has three terms with postings lengths 50,000, 300 and 9,000. In which order should a conjunctive query intersect them?',
              options: [
                'Any order, because intersection is commutative and costs the same',
                '50,000, then 9,000, then 300',
                'In the order the user typed them',
                '300, then 9,000, then 50,000',
              ],
              answer: 3,
              explanation:
                'The result is the same in any order, but the cost is not. Start with the shortest list: the running result has at most 300 entries, and every later merge (or lookup with skips) is cheap. Starting with the longest list makes the first merge cost about 59,000 steps.',
            },
            {
              question: 'Which statement best captures the difference between selection and ranking?',
              options: [
                'Selection decides relevance for each document absolutely; ranking only needs to order documents relative to each other and lets the user choose where to stop',
                'Selection uses term weights and ranking does not',
                'Ranking returns fewer documents than selection',
                'Ranking needs human relevance judgements and selection does not',
              ],
              answer: 0,
              explanation:
                'A ranking function only has to put more relevant documents above less relevant ones, which is easier than an absolute in-or-out decision, and the user picks the cutoff. Term weights are not specific to either, and neither needs judgements at query time.',
            },
          ],
          relatedLessons: ['data-structures-algorithms/sorting-and-searching/mergesort-and-quicksort'],
        },
        {
          slug: 'vector-space-model-and-tf-idf',
          title: 'The vector space model and TF-IDF',
          summary:
            'Represent the query and each document as vectors and score by their dot product. Term frequency rewards repeated query terms, inverse document frequency rewards rare ones, and a sublinear TF stops a document from winning by repetition.',
          estimatedMinutes: 140,
          objectives: [
            'Score documents with the bit-vector, term-frequency and TF-IDF versions of the vector space model',
            'Compute IDF values by hand and explain why rare terms should count more',
            'Explain why raw term frequency lets keyword stuffing win, and how a sublinear TF fixes it',
            'Compute a full TF-IDF ranking for a tiny collection',
            'State what the vector space model does not specify',
          ],
          concepts: [
            'Vector space model',
            'Dot product scoring',
            'Term frequency c(w, d)',
            'Document frequency df(w)',
            'Inverse document frequency',
            'Sublinear TF: 1 + ln c',
            'Keyword stuffing',
            'Heuristic retrieval model',
          ],
          explanation: `The **vector space model** puts the query and each document in a space with one dimension per term and scores a document by how well the two vectors match. The model is a framework. You still have to choose the dimensions, the weights and the similarity, and those choices are what make it work.

**Bit vectors.** With 0/1 entries, the dot product counts how many distinct query terms a document contains. That ignores how often a term appears and treats "the" like "battery".

**Term frequency.** Use the count $c(w, d)$, so a document that mentions a query term five times scores higher than one that mentions it once.

**Inverse document frequency.** A match on a rare term is stronger evidence than a match on a common one. With $N$ documents and a term in $df(w)$ of them, weight it by

$$\\text{IDF}(w) = \\ln \\frac{N + 1}{df(w)}.$$

Then score $(q, d) = \\sum_{w \\in q} c(w, q)\\, \\text{TF}(c(w, d))\\, \\text{IDF}(w)$.

**Worked example.** The course collection has five documents:

- D1: solar panels charge the home battery
- D2: battery storage for solar power and wind power
- D3: wind farms store power in a battery
- D4: solar solar solar eclipse photos
- D5: home battery prices fall as storage costs fall

The query is "solar battery storage". With $N = 5$: solar is in 3 documents, so IDF $= \\ln(6/3) = 0.693$; battery in 4, $\\ln(6/4) = 0.405$; storage in 2, $\\ln(6/2) = 1.099$. D2 contains each once, so it scores $0.693 + 0.405 + 1.099 = 2.197$. With raw TF, D4 scores $3 \\times 0.693 = 2.079$ and comes **second**, ahead of D5 ($0.405 + 1.099 = 1.504$), although it is about an eclipse. Repetition alone lifted it.

The fix is a **sublinear TF** such as $1 + \\ln c$: the first occurrence matters most and each extra one adds less. D4 drops to $(1 + \\ln 3) \\times 0.693 = 1.455$, below D5. Switch the TF transform in the widget and watch D4 fall.

\`\`\`interactive
text-ranking
{"model": "tfidf", "models": ["tfidf"], "tf": "raw", "title": "TF-IDF on the course collection", "caption": "Start with raw TF: D4 is second because it repeats 'solar' three times. Switch to 1 + ln c and D4 drops below D5. Then type 'wind power' as the query and explain why D2 and D3 lead."}
\`\`\`

Two weaknesses remain. Long documents contain more words and so collect more matches by chance, and nothing here corrects for length. And the model says nothing about why these weights are right: it is a set of good **heuristics**. The next lesson adds length normalisation and arrives at BM25.

Read IIR Sections 6.2 to 6.4 and watch the Coursera lectures on the vector space model.`,
          resources: [
            IIR('Chapter 6, Scoring, term weighting and the vector space model', 'Sections 6.2 to 6.4: term frequency, IDF, TF-IDF and its variants (Table 6.15 lists the SMART notation).', true),
            TRS('Weeks 1 and 2: "Vector Space Model" and "Improved Instantiation" lectures.'),
            { title: 'TfidfVectorizer (scikit-learn)', url: 'https://scikit-learn.org/stable/modules/generated/sklearn.feature_extraction.text.TfidfVectorizer.html', type: 'documentation', cost: 'free', provider: 'scikit-learn', note: 'Its smooth_idf and sublinear_tf options are the variants in this lesson; note that its IDF adds 1.' },
          ],
          exercises: [
            {
              slug: 'tfidf-by-hand',
              title: 'TF-IDF ranking by hand',
              prompt:
                'Using the five-document collection in the lesson, compute the TF-IDF score of every document for the query "wind power" with raw TF and with $1 + \\ln c$, using IDF $= \\ln((N + 1)/df)$. Expected with raw TF: D2 = 1.792, D3 = 1.792, others 0. Explain why D2 and D3 tie with raw TF and which one wins with the sublinear TF (and by how much). Check your numbers in the widget.',
              kind: 'problem',
              difficulty: 1,
              hint: 'wind and power each have df = 2, so IDF = ln 3 = 1.099. D2 contains power twice.',
            },
            {
              slug: 'tfidf-engine',
              title: 'A TF-IDF engine in 40 lines',
              prompt:
                'Write a class with `index(docs)` and `search(query, k)` that scores with $\\sum c(w,q)\\,(1 + \\ln c(w,d))\\,\\ln((N+1)/df)$, visiting only the documents in the postings of query terms. Run it on Cranfield (stemmed, stop words removed) and print the top 5 document IDs for query 1. Then compute the fraction of the top 10 that are judged relevant, averaged over all 225 queries (P@10), and compare raw TF with sublinear TF. Keep the code: MP 1 extends it.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'idf-variants',
              title: 'Compare IDF variants',
              prompt:
                'Plot, for $N = 1{,}000$ and $df$ from 1 to 1,000, three IDF formulas: $\\ln(N/df)$, $\\ln((N+1)/df)$ and the BM25 form $\\ln(1 + (N - df + 0.5)/(df + 0.5))$. Say which can become zero or negative and for which $df$, and what that does to a term that appears in every document. Then explain in two sentences why the exact formula matters less than its shape.',
              kind: 'derivation',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does IDF reward rare terms, in terms of evidence about relevance?',
              answerOutline: 'A term in few documents separates the collection sharply; matching it says much more about a document than matching a term that nearly every document contains.',
            },
            {
              question: 'What problem does a sublinear TF transform solve?',
              answerOutline: 'With raw counts, a document can dominate one query term by repeating it (keyword stuffing) and outscore documents that match more distinct terms. 1 + ln c makes extra occurrences add less and less.',
            },
            {
              question: 'What does the vector space model leave unspecified?',
              answerOutline: 'The choice of dimensions, the term weights, length normalisation and the similarity function. It is a framework of heuristics, not a probabilistic derivation.',
            },
          ],
          quiz: [
            {
              question: 'A collection has $N = 99$ documents. A term occurs in 9 of them. Using $\\text{IDF} = \\ln((N + 1)/df)$, what is its IDF?',
              options: ['2.408', '2.398', '1.046', '11.11'],
              answer: 0,
              explanation:
                '$\\ln((99 + 1)/9) = \\ln 11.11 = 2.408$. 2.398 is $\\ln(99/9) = \\ln 11$, which drops the $+1$. 1.046 uses a base-10 logarithm, and 11.11 forgets the logarithm altogether.',
            },
            {
              question: 'With TF $= 1 + \\ln c$, a query term has IDF 2.0. Document A contains it once and document B contains it four times. What are their contributions?',
              options: ['A: 2.0, B: 8.0', 'A: 0, B: 2.77', 'A: 2.0, B: 4.77', 'A: 2.0, B: 2.77'],
              answer: 2,
              explanation:
                'A: $(1 + \\ln 1) \\times 2 = 2.0$. B: $(1 + \\ln 4) \\times 2 = (1 + 1.386) \\times 2 = 4.77$. Raw TF would give 8.0, four times A. Forgetting the 1 gives 0 for a single occurrence, which would ignore it entirely.',
            },
            {
              question: 'Which change to scoring would most directly stop a short page that repeats "cheap flights" fifty times from outranking a travel guide that mentions it twice?',
              options: [
                'Use a larger IDF for "cheap"',
                'Replace raw term frequency with a sublinear or saturating TF',
                'Remove "cheap" as a stop word',
                'Use bit vectors for the documents but counts for the query',
              ],
              answer: 1,
              explanation:
                'The spam page wins on sheer repetition, which raw TF rewards linearly. A sublinear or saturating TF makes the 50th occurrence worth almost nothing. Bit vectors would also remove the advantage, but they throw away useful frequency information for every document, and changing the IDF does not touch repetition at all.',
            },
          ],
        },
        {
          slug: 'bm25-and-length-normalisation',
          title: 'BM25 and document length normalisation',
          summary:
            'BM25 combines IDF with a term frequency that saturates (controlled by k1) and is normalised by document length (controlled by b). It is the default ranking function of modern search libraries and still a hard baseline to beat.',
          estimatedMinutes: 150,
          objectives: [
            'Write the BM25 formula and explain the role of each part',
            'Explain TF saturation and how k1 sets it',
            'Explain pivoted length normalisation and how b sets it',
            'Compute a BM25 score by hand',
            'Predict how changing k1 and b changes a ranking',
          ],
          concepts: [
            'BM25 (Okapi)',
            'TF saturation and k1',
            'Pivoted length normalisation and b',
            'Average document length',
            'BM25 IDF',
            'Verbosity versus scope of long documents',
            'Parameter tuning on a test collection',
          ],
          explanation: `Two problems were left over from TF-IDF: repetition and length. **BM25**, from the Okapi system of Robertson and colleagues in the 1990s, solves both with one formula:

$$\\text{BM25}(q, d) = \\sum_{w \\in q} c(w,q)\\; \\text{IDF}(w)\\; \\frac{c(w, d)\\,(k_1 + 1)}{c(w, d) + k_1 \\left(1 - b + b\\, \\frac{|d|}{\\overline{|d|}}\\right)},$$

with $\\text{IDF}(w) = \\ln\\big(1 + \\frac{N - df + 0.5}{df + 0.5}\\big)$, document length $|d|$ and average length $\\overline{|d|}$.

**Saturation, set by $k_1$.** For a document of average length, the TF part is $c(k_1 + 1)/(c + k_1)$. It is 1 at $c = 1$ and rises towards $k_1 + 1$ but never reaches it. With $k_1 = 1.2$, the values for $c = 1, 2, 3, 10$ are 1, 1.38, 1.57 and 1.96. With $k_1 = 0$ the part is 1 for any $c > 0$, so only presence counts (a bit vector). A large $k_1$ approaches raw TF.

**Length normalisation, set by $b$.** A long document matches more terms by chance, either because it is **verbose** (says the same thing in more words) or because it has more **scope** (covers more topics). The factor $1 - b + b\\,|d|/\\overline{|d|}$ is a **pivot**: it equals 1 for an average-length document, is above 1 for longer ones (penalising them) and below 1 for shorter ones. $b = 0$ turns normalisation off and $b = 1$ normalises fully. Typical values are $k_1 \\in [1.2, 2]$ and $b = 0.75$.

**Worked example.** In the course collection, $\\overline{|d|} = 28/5 = 5.6$ (after stop words). For D4, "solar" has $c = 3$, $|d| = 5$, $df = 3$. IDF $= \\ln(1 + 2.5/3.5) = 0.539$. The normaliser is $1.2\\,(0.25 + 0.75 \\times 5/5.6) = 1.104$, so the TF part is $3 \\times 2.2 / (3 + 1.104) = 1.608$ and the score is $0.867$. Under TF-IDF with raw TF, D4 was second. Under BM25 it is third, behind D2 (1.654) and D5 (1.055), and only just ahead of D1 (0.865).

\`\`\`interactive
text-ranking
{"model": "bm25", "models": ["bm25"], "title": "BM25 on the course collection", "caption": "Set k1 to 0: every match counts once, and D4 falls below D1. Raise k1 to 3 and D4's repeated 'solar' counts for more. Then move b from 0 to 1 with k1 = 1.2: the long document D5 loses ground, and D1 and D4 swap places near b = 0.8."}
\`\`\`

On Cranfield, BM25 with $k_1 = 1.2$, $b = 0.75$ reaches a mean average precision of 0.305 in the reference run for MP 1. Turning length normalisation off ($b = 0$) drops it to 0.273, and making TF binary ($k_1 \\to 0$) drops it to 0.251. Tuned BM25 is the baseline that every new method in this field must beat, and it often wins outside the domain a neural model was trained on (Module 8).

Read Robertson and Zaragoza's review, Sections 3.1 to 3.4, for where the formula comes from.`,
          resources: [
            { title: 'The Probabilistic Relevance Framework: BM25 and Beyond', url: 'https://www.staff.city.ac.uk/~sbrp622/papers/foundations_bm25_review.pdf', type: 'article', cost: 'free', provider: 'Stephen Robertson and Hugo Zaragoza (Foundations and Trends in IR, 2009)', note: 'Read Sections 3.1 to 3.4: the eliteness model, saturation and length normalisation.', primary: true },
            IIR('Chapter 11, Probabilistic information retrieval', 'Section 11.4.3 presents Okapi BM25 and its parameters.'),
            TRS('Week 2: "TF Transformation" and "Document Length Normalization" lectures.'),
          ],
          exercises: [
            {
              slug: 'bm25-by-hand',
              title: 'BM25 by hand',
              prompt:
                'For the course collection and the query "solar battery storage", compute the BM25 score of D2 with $k_1 = 1.2$, $b = 0.75$. D2 has length 6 after stop words and contains each query term once; the IDFs are 0.539 (solar), 0.288 (battery) and 0.875 (storage). Expected: 1.654. Then compute it with $b = 0$ and explain the direction of the change. Check both in the widget.',
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'saturation-curves',
              title: 'Plot saturation and normalisation',
              prompt:
                'Plot the BM25 TF part $c(k_1 + 1)/(c + K)$ for $c = 0$ to 20 with $K = k_1$ (average length) for $k_1 = 0.5, 1.2, 2, 5$, on one figure. On a second figure fix $c = 2$, $k_1 = 1.2$ and plot it against $|d| / \\overline{|d|}$ from 0.2 to 5 for $b = 0, 0.5, 0.75, 1$. Write two sentences each describing what $k_1$ and $b$ control, using the figures.',
              kind: 'simulation',
              difficulty: 1,
            },
            {
              slug: 'tune-bm25-cranfield',
              title: 'Tune k1 and b on Cranfield',
              prompt:
                'Using your engine from the TF-IDF lesson, implement BM25 and compute P@10 on all 225 Cranfield queries over a grid $k_1 \\in \\{0.5, 0.9, 1.2, 1.6, 2.0\\}$, $b \\in \\{0, 0.25, 0.5, 0.75, 1\\}$. Draw the grid as a heat map. Then split the queries into two halves by ID, tune on one half and report the score on the other. Explain why the score on the tuning half is optimistic.',
              kind: 'data-analysis',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What value does the BM25 TF part approach as c grows, and why is a bound useful?',
              answerOutline: 'It approaches k1 + 1 (for an average-length document). The bound stops repetition of one term from dominating and rewards matching more distinct query terms.',
            },
            {
              question: 'What do b = 0 and b = 1 mean?',
              answerOutline: 'b = 0: no length normalisation. b = 1: full normalisation, the TF is effectively divided by relative length. In between, a pivot around the average length.',
            },
            {
              question: 'Why might a long document deserve some penalty but not a full one?',
              answerOutline: 'Length can come from verbosity (same content, more words, should be penalised) or from scope (more content, legitimately matching more). A partial normalisation balances the two.',
            },
          ],
          quiz: [
            {
              question: 'With $k_1 = 2$ and a document of exactly average length, what is the BM25 TF part $c(k_1 + 1)/(c + k_1)$ for $c = 2$?',
              options: ['1.0', '6.0', '1.5', '3.0'],
              answer: 2,
              explanation:
                'At average length the normaliser is $k_1$ whatever $b$ is: $2 \\times 3 / (2 + 2) = 1.5$. 3.0 is the upper limit $k_1 + 1$, approached only as $c \\to \\infty$. 6.0 is the numerator alone.',
            },
            {
              question: 'Two documents each contain a query term twice. One has length 200 and the other 50; the average length is 100. With $b = 0.75$, how does BM25 treat them?',
              options: [
                'The same, because both contain the term twice',
                'The longer document scores higher because it has more words',
                'It depends only on $k_1$',
                'The shorter document scores higher, because its normaliser is below 1 and the longer one\'s is above 1',
              ],
              answer: 3,
              explanation:
                'The normaliser $1 - b + b|d|/\\overline{|d|}$ is $0.25 + 0.75 \\times 0.5 = 0.625$ for the short document and $0.25 + 0.75 \\times 2 = 1.75$ for the long one. A larger normaliser in the denominator lowers the TF part, so the same two occurrences count for more in the shorter document.',
            },
            {
              question: 'Setting $k_1 = 0$ in BM25 has what effect?',
              options: [
                'Each query term counts once if present, scaled by IDF, whatever its frequency and the document length',
                'Length normalisation is switched off but TF still counts',
                'All scores become zero',
                'The model becomes TF-IDF with raw counts',
              ],
              answer: 0,
              explanation:
                'With $k_1 = 0$ the TF part is $c \\cdot 1 / c = 1$ for any $c > 0$, so frequency and length both drop out and only presence weighted by IDF remains. Switching off normalisation alone is $b = 0$. Raw TF corresponds to a very large $k_1$.',
            },
            {
              question: 'On a news collection where long articles cover many separate stories, you find the best $b$ is 0.3. What does that suggest?',
              options: [
                'Long documents are mostly verbose, so they should be penalised strongly',
                'Length mostly reflects scope, so long documents deserve only a mild penalty',
                'The IDF formula is wrong for this collection',
                'The value of $k_1$ must also be 0.3',
              ],
              answer: 1,
              explanation:
                'A low $b$ means the best ranking penalises length only a little. That fits documents that are long because they contain more content (scope), which really does match more queries. Strong verbosity would push the best $b$ towards 1. $k_1$ and $b$ are tuned separately.',
            },
          ],
        },
        {
          slug: 'query-likelihood-and-language-models',
          title: 'Query likelihood and language models',
          summary:
            'A probabilistic route to ranking: give each document a language model and rank documents by how likely that model makes the query. Maximum likelihood estimates assign zero to unseen words, which is the problem smoothing solves.',
          estimatedMinutes: 130,
          objectives: [
            'Define a unigram language model and estimate it by maximum likelihood',
            'Compute the query likelihood $p(q \\mid d)$ of a short query',
            'Explain why scores are computed as sums of logarithms',
            'Explain the zero-probability problem and why it is fatal for ranking',
            'Relate query likelihood to the probability ranking principle',
          ],
          concepts: [
            'Statistical language model',
            'Unigram model',
            'Maximum likelihood estimate c(w,d)/|d|',
            'Query likelihood p(q | d)',
            'Log-likelihood scoring',
            'Zero-probability problem',
            'Collection language model p(w | C)',
          ],
          explanation: `A **statistical language model** is a probability distribution over word sequences. The simplest is the **unigram model**, which treats each word as drawn independently from a distribution $p(w)$ over the vocabulary. The probability of a sequence is the product of its words' probabilities.

The **query likelihood** approach (Ponte and Croft, 1998) gives every document $d$ its own unigram model $\\theta_d$ and imagines that a user who wanted $d$ wrote the query by sampling words from it. Documents are ranked by

$$p(q \\mid d) = \\prod_{i=1}^{m} p(q_i \\mid \\theta_d), \\qquad \\log p(q \\mid d) = \\sum_{w \\in q} c(w, q) \\log p(w \\mid \\theta_d).$$

The log turns a product of tiny numbers into a sum that does not underflow and does not change the order. Through Bayes' rule, $p(d \\mid q) \\propto p(q \\mid d)\\,p(d)$, so with a uniform prior this is ranking by the probability that $d$ is the document the user had in mind, in the spirit of the probability ranking principle.

The obvious estimate of $\\theta_d$ is **maximum likelihood**: $p(w \\mid d) = c(w, d)/|d|$.

**Worked example.** The query "solar battery storage" against the course collection. D2 has 6 terms and contains each query word once, so $p(q \\mid D2) = (1/6)^3 = 0.00463$, or $\\log p = -5.375$. D5 has 7 terms, with battery and storage once each, but no "solar". So $p(\\text{solar} \\mid D5) = 0$, and the whole product is 0. The same happens to D1 (no "storage"), D3 and D4. Only D2 gets a nonzero score, and the other four tie at $\\log 0 = -\\infty$.

This is the **zero-probability problem**. One missing query word sends a document to the bottom, however well it matches the rest. That is too strict, especially for long queries, and it fails to tell partly matching documents apart. Maximum likelihood also overfits: a 6-word document has not shown us that every other word in English has probability zero.

The fix is to **smooth** the estimate, moving a little probability mass to unseen words in proportion to their frequency in the whole collection, the **collection model** $p(w \\mid C) = \\text{cf}(w)/|C|$. In the course collection $|C| = 28$, so $p(\\text{solar} \\mid C) = 5/28 = 0.179$, $p(\\text{battery} \\mid C) = 0.143$ and $p(\\text{storage} \\mid C) = 0.071$. The next lesson shows the two standard smoothing methods, and the surprise that smoothing reproduces TF-IDF weighting and length normalisation.

Read IIR Sections 12.1 and 12.2, then watch the Coursera lectures on statistical language models and query likelihood.`,
          resources: [
            IIR('Chapter 12, Language models for information retrieval', 'Sections 12.1 and 12.2: language models and the query likelihood model.', true),
            TRS('Week 4: "Probabilistic Retrieval Model: Basic Idea" and "Statistical Language Model".'),
            SLP('Chapter 3 (n-gram language models) gives the probability background, including maximum likelihood and why unseen events need smoothing.'),
          ],
          relatedLessons: ['probability-statistics/estimation-and-confidence/maximum-likelihood-estimation'],
          exercises: [
            {
              slug: 'ql-by-hand',
              title: 'Query likelihood by hand',
              prompt:
                'For the query "battery storage" and the course collection, compute $\\log p(q \\mid d)$ with maximum likelihood estimates for every document. Expected: D2 $= 2\\ln(1/6) = -3.584$ and D5 $= \\ln(1/7) + \\ln(1/7) = -3.892$; the other three have $-\\infty$. Explain why D2 beats D5 although both contain both words once. Then add the word "wind" to the query and say which documents survive.',
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'mle-unigram',
              title: 'Estimate and sample unigram models',
              prompt:
                'Estimate a unigram model by maximum likelihood from the Cranfield abstracts (stop words kept) and from Pride and Prejudice. Print the 15 most probable words of each. Sample 30 words from each model with `numpy.random.default_rng(0).choice`. Then compute the log-likelihood of the sentence "the boundary layer separates at high mach number" under each model, and explain what happens and why.',
              kind: 'coding',
              difficulty: 2,
              hint: 'Words that never occur in the novel get probability zero there.',
            },
            {
              slug: 'long-query-zeros',
              title: 'How often do zeros strike?',
              prompt:
                'On Cranfield (stemmed, stop words removed), for each of the 225 queries count the documents that contain every query term, so that their maximum likelihood query likelihood is nonzero. Report the median count and how many queries have no such document at all. Plot the count against query length. Write what this says about using unsmoothed query likelihood for real queries.',
              kind: 'data-analysis',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What is the query likelihood retrieval function?',
              answerOutline: 'Rank by log p(q|d) = sum over query words of c(w,q) log p(w|theta_d), the log probability that the document\'s language model generates the query.',
            },
            {
              question: 'Why is the maximum likelihood estimate a bad document model for ranking?',
              answerOutline: 'It gives zero probability to every word not in the document, so any document missing one query word scores zero (minus infinity in logs), and it overfits short documents.',
            },
            {
              question: 'Why are scores summed in log space?',
              answerOutline: 'Products of many small probabilities underflow floating point; the log is monotone so ranking is unchanged, and sums are cheap to accumulate term by term.',
            },
          ],
          quiz: [
            {
              question: 'A document has 20 terms: "engine" 4 times and "turbine" twice. With maximum likelihood estimates, what is $p(\\text{engine turbine} \\mid d)$?',
              options: ['0.3', '0.02', '0.06', '0.0001'],
              answer: 1,
              explanation:
                '$p(\\text{engine}) = 4/20 = 0.2$ and $p(\\text{turbine}) = 2/20 = 0.1$, so the product is $0.2 \\times 0.1 = 0.02$. Adding the probabilities (0.3) treats the query as one word or the other, not both in sequence.',
            },
            {
              question: 'Under unsmoothed query likelihood, a 300-word document contains 4 of the 5 words of a query, each many times. A 10-word document contains all 5 once. Which ranks higher?',
              options: [
                'The 300-word document, because it has more matches',
                'They tie',
                'It depends on the IDF of the missing word',
                'The 10-word document, because the other has probability zero',
              ],
              answer: 3,
              explanation:
                'The missing word has $p = 0$ in the long document, so its whole query likelihood is 0, below any positive value. This harsh behaviour is the zero-probability problem, and smoothing exists to fix it. Plain query likelihood has no IDF term at all.',
            },
            {
              question: 'Which statement distinguishes the document model $p(w \\mid d)$ from the collection model $p(w \\mid C)$?',
              options: [
                'The document model is estimated from one document\'s counts; the collection model from counts over all documents, and smoothing blends the second into the first',
                'The collection model is the average of the document models with equal weights',
                'The document model includes stop words and the collection model does not',
                'They are the same distribution estimated with different smoothing',
              ],
              answer: 0,
              explanation:
                '$p(w \\mid C) = \\text{cf}(w)/|C|$ pools all tokens, so long documents count more than in a plain average of document models. Smoothing uses it as the fallback for words a document has not shown.',
            },
          ],
        },
        {
          slug: 'smoothing-dirichlet-and-jelinek-mercer',
          title: 'Smoothing: Jelinek-Mercer and Dirichlet',
          summary:
            'Smoothing blends each document model with the collection model. Rewriting the smoothed query likelihood reveals TF weighting, IDF weighting and length normalisation, so the probabilistic model rediscovers the heuristics of BM25.',
          estimatedMinutes: 150,
          objectives: [
            'Write Jelinek-Mercer and Dirichlet prior smoothing',
            'Compute a smoothed query likelihood score by hand',
            'Derive the rank-equivalent form and identify TF, IDF and length normalisation in it',
            'Explain how the Dirichlet parameter mu adapts to document length',
            'Choose a smoothing method and parameter for a collection',
          ],
          concepts: [
            'Jelinek-Mercer (linear interpolation) smoothing',
            'Dirichlet prior smoothing',
            'Pseudo-counts',
            'Rank-equivalent scoring',
            'Smoothing as IDF',
            'Smoothing as length normalisation',
            'Choosing mu and lambda',
          ],
          explanation: `**Jelinek-Mercer** smoothing mixes the maximum likelihood estimate with the collection model using a fixed weight $\\lambda$:

$$p(w \\mid d) = (1 - \\lambda)\\,\\frac{c(w,d)}{|d|} + \\lambda\\, p(w \\mid C).$$

**Dirichlet prior** smoothing adds $\\mu\\,p(w \\mid C)$ pseudo-counts to every word, as if the document had been extended by $\\mu$ words drawn from the collection:

$$p(w \\mid d) = \\frac{c(w,d) + \\mu\\, p(w \\mid C)}{|d| + \\mu}.$$

Dirichlet is Jelinek-Mercer with $\\lambda = \\mu/(|d| + \\mu)$: a short document is smoothed more, because it has given less evidence. That adaptivity is why Dirichlet usually works better for short queries, with $\\mu$ often in the hundreds to a few thousand for real collections.

**Worked example.** Query "solar battery storage", D1 (length 5, no "storage"), $\\mu = 10$, and the collection probabilities 0.179, 0.143 and 0.071 from the last lesson. Then $p(\\text{solar} \\mid D1) = (1 + 1.786)/15 = 0.186$, $p(\\text{battery} \\mid D1) = (1 + 1.429)/15 = 0.162$ and $p(\\text{storage} \\mid D1) = (0 + 0.714)/15 = 0.048$. So $\\log p(q \\mid D1) = -1.684 - 1.821 - 3.045 = -6.549$. D1 is no longer $-\\infty$, and it can now be compared with the others.

**Why smoothing behaves like TF-IDF.** Split the sum into query words the document contains and words it does not. For Dirichlet, the score equals, up to a term that is the same for every document,

$$\\sum_{w \\in q \\cap d} c(w, q) \\log\\left(1 + \\frac{c(w, d)}{\\mu\\, p(w \\mid C)}\\right) + |q| \\log \\frac{\\mu}{|d| + \\mu}.$$

Read it term by term. The count $c(w, d)$ grows the score sublinearly through the log, which is **TF**. Dividing by $p(w \\mid C)$ makes matches on rare words worth more, which is **IDF**. The last term penalises long documents, which is **length normalisation**. Nobody added these heuristics. They fall out of estimating the document model sensibly. This form is also how you implement it: only documents that contain a query term need a sum, plus one length term each.

\`\`\`interactive
text-ranking
{"model": "ql-dir", "models": ["ql-dir", "ql-jm"], "mu": 10, "title": "Smoothed query likelihood", "caption": "With mu = 10, D2 leads and D5 is second. Drag mu down to 0: this is the unsmoothed maximum likelihood model of the last lesson, and every document missing a query word drops to minus infinity. Drag it up past 100: the collection model dominates and the short D4 climbs to second. Switch to Jelinek-Mercer and compare how lambda behaves."}
\`\`\`

On Cranfield, Dirichlet smoothing gives a mean average precision of 0.286 at $\\mu = 100$, 0.290 at $\\mu = 300$ and 0.277 at $\\mu = 1{,}000$, slightly below tuned BM25 (0.305). On many web collections the two are close. Pick the parameter on held-out queries.

Read IIR Section 12.2.2, then Zhai and Lafferty's study of smoothing methods, the paper behind this lesson.`,
          resources: [
            IIR('Chapter 12, Language models for information retrieval', 'Section 12.2.2 covers Jelinek-Mercer and Dirichlet smoothing with a worked example.', true),
            TRS('Week 4: "Smoothing of Language Model" parts 1 and 2, and "Specific Smoothing Methods".'),
            { title: 'A Study of Smoothing Methods for Language Models Applied to Information Retrieval', url: 'https://dl.acm.org/doi/10.1145/984321.984322', type: 'article', cost: 'freemium', provider: 'ChengXiang Zhai and John Lafferty (ACM TOIS, 2004)', note: 'The study of Jelinek-Mercer and Dirichlet smoothing on TREC collections. Sections 2 and 3 give the rank-equivalent form; read the results for typical values of mu.' },
          ],
          exercises: [
            {
              slug: 'dirichlet-by-hand',
              title: 'Dirichlet scores by hand',
              prompt:
                'For the course collection and the query "solar battery storage" with $\\mu = 10$, compute $\\log p(q \\mid d)$ for D2 and D4 by hand. Expected: D2 $= -5.867$, D4 $= -6.538$. Then compute the rank-equivalent score (the sum over matched terms plus $|q|\\log(\\mu/(|d|+\\mu))$) for both and check that the difference between them is the same as for the full scores.',
              kind: 'problem',
              difficulty: 2,
              hint: 'The full and rank-equivalent scores differ by $\\sum_w c(w,q)\\log(\\mu p(w|C))$, which is the same for every document.',
            },
            {
              slug: 'derive-rank-equivalent',
              title: 'Derive the rank-equivalent form',
              prompt:
                'Starting from $\\log p(q \\mid d) = \\sum_{w \\in q} c(w,q) \\log p(w \\mid d)$ with Dirichlet smoothing, split the sum into words with $c(w,d) > 0$ and the rest, and derive the form in the lesson. Then do the same for Jelinek-Mercer and show that its length term is constant, so length normalisation enters only through $c(w,d)/|d|$. Write one paragraph comparing the two.',
              kind: 'derivation',
              difficulty: 3,
            },
            {
              slug: 'mu-sweep',
              title: 'Sweep mu on Cranfield',
              prompt:
                'Implement Dirichlet query likelihood with the rank-equivalent form in your engine. Compute mean average precision on all 225 Cranfield queries for $\\mu \\in \\{10, 30, 100, 300, 1000, 3000\\}$ and for Jelinek-Mercer with $\\lambda \\in \\{0.1, 0.3, 0.5, 0.7, 0.9\\}$. Plot both curves. You should find a broad optimum for $\\mu$ in the low hundreds with MAP near 0.29. Compare the best of each with BM25 and say whether the difference matters (Module 3 shows how to test that).',
              kind: 'data-analysis',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'How is Dirichlet smoothing related to Jelinek-Mercer smoothing?',
              answerOutline: 'It is Jelinek-Mercer with a document-dependent weight lambda = mu / (|d| + mu), so short documents are smoothed more.',
            },
            {
              question: 'Where do TF, IDF and length normalisation appear in the rank-equivalent Dirichlet formula?',
              answerOutline: 'TF: c(w,d) inside a log (sublinear). IDF: division by p(w|C). Length normalisation: |q| log(mu / (|d| + mu)).',
            },
            {
              question: 'Why does the rank-equivalent form make the model efficient to compute?',
              answerOutline: 'Only query terms present in a document contribute to the sum, so scoring visits postings of query terms, plus one length term per scored document; the dropped part is the same for all documents.',
            },
          ],
          quiz: [
            {
              question: 'A document of length 40 contains a query word 2 times. The word has $p(w \\mid C) = 0.01$. With Dirichlet smoothing and $\\mu = 60$, what is $p(w \\mid d)$?',
              options: ['0.05', '0.026', '0.0206', '0.6'],
              answer: 1,
              explanation:
                '$(2 + 60 \\times 0.01)/(40 + 60) = 2.6/100 = 0.026$. 0.05 is the maximum likelihood estimate $2/40$, before smoothing. Smoothing pulls it towards the collection probability because $\\mu$ is large relative to the document length.',
            },
            {
              question: 'With Dirichlet $\\mu = 1{,}000$, what Jelinek-Mercer weight $\\lambda$ on the collection model does a 250-word document effectively get?',
              options: ['0.25', '0.8', '0.2', '0.75'],
              answer: 1,
              explanation:
                '$\\lambda = \\mu/(|d| + \\mu) = 1{,}000/1{,}250 = 0.8$. 0.2 is the weight left on the document\'s own estimate, $|d|/(|d| + \\mu)$. A 4,000-word document would get only 0.2, which is how Dirichlet adapts to length.',
            },
            {
              question: 'In the rank-equivalent Dirichlet score, why does dividing $c(w,d)$ by $\\mu\\,p(w \\mid C)$ act like IDF?',
              options: [
                'A rare word has a small $p(w \\mid C)$, so the same count adds more to the score',
                'It makes the scores sum to one',
                'It removes stop words from the query',
                'It is the length normalisation, not IDF',
              ],
              answer: 0,
              explanation:
                'The term is $\\log(1 + c(w,d)/(\\mu\\,p(w \\mid C)))$, so for a fixed count it is larger when the word is rare in the collection, which is exactly IDF\'s behaviour. Length normalisation is the separate $|q|\\log(\\mu/(|d|+\\mu))$ term.',
            },
            {
              question: 'Raising $\\mu$ towards infinity in Dirichlet smoothing makes the ranking depend mainly on what?',
              options: [
                'Raw term frequencies, as in TF-IDF',
                'Which document is longest',
                'Nothing: every document gets the same score',
                'Mostly on document length, since every document model approaches the collection model and only the small length effect remains',
              ],
              answer: 3,
              explanation:
                'As $\\mu \\to \\infty$ every $p(w \\mid d)$ approaches $p(w \\mid C)$, so the scores converge. The remaining differences come mostly from $|d|$, and shorter documents edge ahead, which is why D4 rises in the widget at large $\\mu$. Scores never become exactly equal at finite $\\mu$, so the order is still defined.',
            },
          ],
        },
      ],
    },
    {
      slug: 'search-engine-implementation-and-evaluation',
      title: 'Building and Evaluating a Search Engine',
      description:
        'How an inverted index is built, compressed and queried fast enough for interactive search, and how to measure whether a ranking is any good: set measures, average precision, nDCG, test collections and significance tests.',
      lessons: [
        {
          slug: 'inverted-index-construction',
          title: 'Building an inverted index',
          summary:
            'An inverted index maps each term to the list of documents that contain it, with counts. Building one for a collection larger than memory is an external sort: write sorted runs, then merge them.',
          estimatedMinutes: 140,
          objectives: [
            'Describe the dictionary and postings of an inverted index and what each posting stores',
            'Build an index in memory by sorting (term, document, count) tuples',
            'Explain blocked sort-based and single-pass in-memory indexing for collections larger than memory',
            'Estimate the size of an index from collection statistics',
            'Explain how an index is updated as documents arrive',
          ],
          concepts: [
            'Dictionary (lexicon)',
            'Postings list',
            'Posting: document ID, term frequency, positions',
            'Sort-based construction',
            'Blocked sort-based indexing (BSBI)',
            'Single-pass in-memory indexing (SPIMI)',
            'k-way merge of sorted runs',
            'Index updates and segment merging',
          ],
          explanation: `Scoring with BM25 or query likelihood needs, for each query term, the documents that contain it and the count in each. An **inverted index** stores exactly that. The **dictionary** (lexicon) maps each term to its document frequency and the location of its **postings list**, the list of postings sorted by document ID. A posting holds at least the document ID and the term frequency, and often the positions of each occurrence, which phrase queries need. Document lengths and the collection statistics (number of documents, average length, total tokens) sit alongside.

**In memory**, construction is simple: scan the documents, emit a $(\\text{term}, \\text{doc}, \\text{count})$ tuple for each distinct term in each document, sort by term and then document, and group. For Cranfield, after stemming and stop word removal, that gives 4,611 terms and 81,329 postings from 126,090 tokens, built in well under a second in Python.

**Larger than memory**, it is an external sort:

1. **Blocked sort-based indexing (BSBI)**: read documents until a memory block is full, sort that block's tuples, write it to disk as a sorted run, and repeat. Then merge all runs with a $k$-way merge, a min-heap holding the current head of each run, which costs $O(n \\log k)$ for $n$ tuples and $k$ runs.
2. **Single-pass in-memory indexing (SPIMI)**: instead of a global sort, keep a dictionary from term to growing postings list for each block. Sort only the terms when writing the block, then merge as before. It avoids storing term IDs and sorting every tuple.
3. At web scale the same idea runs on many machines with MapReduce: mappers emit $(\\text{term}, \\text{posting})$ pairs, and the framework's shuffle groups them by term for the reducers (Module 4).

**Size estimate.** The number of postings equals the number of nonzero entries in the term-document matrix, the sum over documents of their distinct terms. With 4-byte document IDs and counts, 2 million documents of 180 distinct terms each need $2 \\times 10^6 \\times 180 \\times 8 = 2.88$ GB uncompressed, which motivates the next lesson.

**Updates.** Real collections change. Engines such as Lucene write new documents into small immutable **segments**, search all segments at query time, mark deletions in a bitmap, and merge segments in the background. That trades a little query speed for fast indexing.

Pitfalls: document IDs must be assigned in increasing order for postings to stay sorted, and the analyser used here must be the one used for queries.

Read IIR Chapter 4 for BSBI, SPIMI and distributed indexing, and Section 2.4 for positional postings.`,
          resources: [
            IIR('Chapter 4, Index construction', 'Sections 4.2 to 4.5: BSBI, SPIMI, distributed indexing and dynamic indexing.', true),
            TRS('Week 2: "Implementation of TR Systems" and "System Implementation: Inverted Index Construction".'),
            { title: 'Apache Lucene', url: 'https://lucene.apache.org/', type: 'tool', cost: 'free', provider: 'Apache Software Foundation', note: 'The library behind Elasticsearch and OpenSearch. Its documentation on segments and merging shows the update strategy described in this lesson.' },
          ],
          relatedLessons: ['data-structures-algorithms/trees-and-heaps/heaps-and-priority-queues', 'databases/storage-and-indexing/hash-indexes-and-log-structured-storage'],
          exercises: [
            {
              slug: 'build-in-memory',
              title: 'Build and query an in-memory index',
              prompt:
                'Write `build_index(docs, analyse)` that returns a dictionary from term to a list of `(doc_id, tf)` sorted by document ID, plus a list of document lengths. Run it on Cranfield with stemming and stop word removal and check: 1,400 documents, 4,611 terms, 81,329 postings, 126,090 tokens, average length 90.06. Print the document frequency of "boundari" (expected 469) and its first five postings. Assert that every postings list is strictly increasing in document ID.',
              kind: 'coding',
              difficulty: 1,
              hint: 'Exact counts depend on your tokeniser and NLTK version. Within a few terms is fine if your analyser differs slightly.',
            },
            {
              slug: 'external-merge',
              title: 'Simulate BSBI with a memory limit',
              prompt:
                'Build the Cranfield index again, pretending memory holds only 10,000 tuples: write each sorted block to a temporary file as lines of `term<TAB>doc<TAB>tf`, then merge all blocks with `heapq.merge`. Check that the merged index equals your in-memory one. Report the number of runs and the number of heap operations, and compare with $n \\log_2 k$.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'size-estimate',
              title: 'Estimate an index before building it',
              prompt:
                'A collection has 50 million web pages averaging 1,200 tokens, of which 450 are distinct. Estimate (a) the number of postings, (b) the uncompressed size with 4-byte document IDs and 2-byte counts, and (c) the size with positions stored as 4-byte integers for every token. Then use Heaps\' law with $K = 40$ and $\\beta = 0.5$ to estimate the dictionary size, and say which part of the index dominates.',
              kind: 'problem',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What does a posting contain, and why are postings sorted by document ID?',
              answerOutline: 'Document ID, term frequency, optionally positions. Sorting allows linear-time merges for Boolean queries, document-at-a-time scoring and gap compression.',
            },
            {
              question: 'How does BSBI handle a collection larger than memory?',
              answerOutline: 'It sorts fixed-size blocks of term-document tuples in memory, writes each as a sorted run, then merges the runs with a k-way merge using a heap.',
            },
            {
              question: 'Why do engines write new documents into small segments rather than updating postings in place?',
              answerOutline: 'Inserting into sorted, compressed postings in place is expensive. Immutable segments are cheap to write; queries search all segments and background merges keep their number small.',
            },
          ],
          quiz: [
            {
              question: 'A collection has 2,000,000 documents, each with 300 tokens of which 180 are distinct terms. A posting stores a 4-byte document ID and a 4-byte count. About how large are the uncompressed postings?',
              options: ['4.8 GB', '1.44 GB', '2.88 GB', '360 MB'],
              answer: 2,
              explanation:
                'Postings count distinct terms per document: $2 \\times 10^6 \\times 180 = 3.6 \\times 10^8$ postings at 8 bytes each, which is 2.88 GB. 4.8 GB counts every token rather than distinct terms. 1.44 GB forgets the count field.',
            },
            {
              question: 'An indexer can sort 1 GB of tuples in memory and the collection produces 12 GB. What does blocked sort-based indexing do?',
              options: [
                'Writes 12 sorted runs of 1 GB, then merges them in one pass with a 12-way merge using a heap',
                'Sorts the 12 GB on disk with repeated two-way merges of single tuples',
                'Builds a hash table of all 12 GB in memory',
                'Indexes only the first 1 GB and samples the rest',
              ],
              answer: 0,
              explanation:
                'Each block is sorted in memory and written as a run. The runs are then merged in one pass: a heap holds the current smallest tuple of each run, so each output tuple costs $O(\\log 12)$. No step needs more than one block in memory.',
            },
            {
              question: 'Which parts of an inverted index usually live in memory and which on disk for a large collection?',
              options: [
                'Both the dictionary and the postings are kept in memory',
                'The postings in memory and the dictionary on disk',
                'The dictionary (or most of it) in memory, the postings on disk read per query term',
                'Both on disk, read sequentially for every query',
              ],
              answer: 2,
              explanation:
                'The dictionary is small, roughly one entry per term, and every query needs fast lookups in it, so it stays in memory. The postings are far larger and only the lists for the query terms are read. Popular lists end up cached in memory anyway.',
            },
          ],
        },
        {
          slug: 'index-compression',
          title: 'Index compression',
          summary:
            'Store gaps between document IDs instead of the IDs, then code the small numbers with few bits. Variable-byte and gamma codes shrink postings several times over and make search faster, because less data moves from disk to memory.',
          estimatedMinutes: 130,
          objectives: [
            'Convert a postings list to gaps and explain why gaps are small for frequent terms',
            'Encode and decode integers with variable-byte codes',
            'Encode and decode integers with Elias gamma codes',
            'Compare byte-aligned and bit-level codes on size and decoding speed',
            'Measure the compression ratio of a real index',
          ],
          concepts: [
            'Gap (delta) encoding',
            'Variable-byte (VB) code',
            'Continuation bit',
            'Elias gamma code',
            'Unary code',
            'Byte-aligned versus bit-aligned codes',
            'Compression ratio',
            'Dictionary as a string',
          ],
          explanation: `Compression makes an index smaller and, less obviously, faster: reading fewer bytes from disk or memory usually costs more than decoding them.

**Gaps.** A postings list is an increasing list of document IDs, so store the first ID and then the differences. The list [7, 135, 400] becomes [7, 128, 265]. For a frequent term the gaps are small, because the term appears in nearly every document. For a rare term they are large, but there are few of them. Zipf's law tells you that most postings belong to frequent terms, so most gaps are small numbers.

**Variable-byte (VB) codes** use 7 bits of each byte for the number and the high bit as a flag that marks the last byte. Write the number in base 128, most significant group first, and set the high bit on the final byte:

- 7 fits in 7 bits: \`10000111\` (1 byte)
- 128 = 1 × 128 + 0: \`00000001 10000000\` (2 bytes)
- 265 = 2 × 128 + 9: \`00000010 10001001\` (2 bytes)

So [7, 128, 265] needs 5 bytes instead of 12 as 4-byte integers. Decoding reads bytes and accumulates $n \\leftarrow 128n + (\\text{byte} \\bmod 128)$ until a byte has the high bit set. VB is byte-aligned, so it decodes quickly.

**Elias gamma codes** work at the bit level. Write $n \\ge 1$ in binary, drop the leading 1 to get the **offset**, and prefix the offset's length in **unary** (that many 1s, then a 0). For 13, binary 1101 gives offset 101 of length 3, so the code is \`1110 101\`, 7 bits. For 9 (binary 1001) it is \`1110 001\`. For 1 the offset is empty and the code is \`0\`. Gamma uses about $2\\log_2 n + 1$ bits, which is never more than twice optimal and needs no parameters, but bit manipulation makes it slower to decode than VB.

**Measured on Cranfield.** Storing each posting as two 4-byte integers takes 650,632 bytes. VB-coding the document gaps and the term frequencies takes 170,328 bytes, 3.8 times smaller. On larger collections with longer postings lists, ratios are higher.

Modern engines use codes designed for fast decoding with SIMD instructions, such as PForDelta and its variants, which pack blocks of 128 gaps at the width of the largest one and store exceptions separately. The idea is still gaps plus a variable-length code.

The dictionary compresses too: store all terms as one long string with pointers, and share common prefixes in sorted blocks (front coding).

Read IIR Chapter 5, Sections 5.2 and 5.3, and do the VB and gamma examples there by hand.`,
          resources: [
            IIR('Chapter 5, Index compression', 'Sections 5.2 (dictionary compression) and 5.3 (postings: VB and gamma codes, with Reuters-RCV1 numbers).', true),
            { title: 'Decoding billions of integers per second through vectorization', url: 'https://arxiv.org/abs/1209.2137', type: 'article', cost: 'free', provider: 'Daniel Lemire and Leonid Boytsov', note: 'Read the introduction and Section 2 for how modern engines compress postings (binary packing, PForDelta) and why decoding speed matters.' },
            TRS('Week 2: "System Implementation: Inverted Index Construction" covers compression in the course\'s own words.'),
          ],
          exercises: [
            {
              slug: 'vb-gamma-code',
              title: 'Implement VB and gamma codes',
              prompt:
                'Write `vb_encode(nums) -> bytes`, `vb_decode(bytes) -> list`, `gamma_encode(nums) -> str` (a string of 0/1) and `gamma_decode(str) -> list`. Tests: `vb_encode([824, 5, 214577]).hex()` is `"06b8850d0cb1"`; `gamma_encode([1, 2, 9, 13])` is `"0" + "100" + "1110001" + "1110101"`; both decoders invert their encoders on 10,000 random integers from 1 to $10^6$. Then report the encoded size of [824, 829, 215406] after gap encoding in both codes.',
              kind: 'coding',
              difficulty: 1,
            },
            {
              slug: 'compress-cranfield',
              title: 'Compress the Cranfield index',
              prompt:
                'VB-encode every postings list of your Cranfield index as interleaved (gap, tf) pairs. Report the total bytes against 8 bytes per posting (expected about 650,600 against 170,300, a ratio near 3.8). Repeat with gamma codes and report bits per gap. Then time decoding all postings in each format with `time.perf_counter` and say which you would choose and why.',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'gap-distribution',
              title: 'Why gaps are small',
              prompt:
                'For the Cranfield terms with document frequency above 200 and those with document frequency from 2 to 5, plot histograms of the gaps on a log scale. Report the median gap and median VB bytes per gap for each group. Explain the result using Zipf\'s law, and say what would happen to the gaps if document IDs were assigned in random order instead of grouping similar documents together.',
              kind: 'data-analysis',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why can gap encoding compress the postings of frequent terms well?',
              answerOutline: 'Frequent terms appear in many documents, so consecutive IDs are close and the gaps are small numbers that need few bits or bytes.',
            },
            {
              question: 'How does a VB decoder know where one number ends?',
              answerOutline: 'The high bit of each byte is a continuation flag; the last byte of a number has it set (in the convention used here), so the decoder stops there.',
            },
            {
              question: 'What are the trade-offs between gamma and VB codes?',
              answerOutline: 'Gamma is bit-level and more compact for small numbers, with no parameters, but slower to decode. VB is byte-aligned, slightly larger, and much faster to decode.',
            },
          ],
          quiz: [
            {
              question: 'What is the variable-byte code of the gap 300 (high bit set on the last byte)?',
              options: ['10000010 00101100', '00101100 10000010', '00000010 10101100', '10101100'],
              answer: 2,
              explanation:
                '$300 = 2 \\times 128 + 44$. The first byte holds 2 with the high bit clear (00000010) and the last holds 44 with the high bit set ($128 + 44 = 172$, 10101100). The first option sets the flag on the wrong byte, and one byte cannot hold a number above 127.',
            },
            {
              question: 'What is the Elias gamma code of 9?',
              options: ['1001', '11101001', '0001001', '1110001'],
              answer: 3,
              explanation:
                '9 is 1001 in binary. Drop the leading 1 to get the offset 001, of length 3. The length in unary is 1110, so the code is 1110 001. 1001 is plain binary, which cannot be decoded without knowing the length. 11101001 keeps the leading 1 in the offset.',
            },
            {
              question: 'Why do postings for a very frequent term compress better per posting than postings for a rare term?',
              options: [
                'Frequent terms have shorter document IDs',
                'Their gaps are small because the term appears in most documents, so each gap needs few bits',
                'Rare terms are stored without compression',
                'Frequent terms have higher term frequencies, which compress better',
              ],
              answer: 1,
              explanation:
                'Compression comes from the gaps, not the IDs. If a term is in nearly every document, consecutive IDs differ by 1 or 2, which codes in one byte or a few bits. A rare term\'s gaps can be thousands, needing more bits each, though there are few of them.',
            },
          ],
        },
        {
          slug: 'query-processing-and-scoring-at-scale',
          title: 'Query processing and scoring at scale',
          summary:
            'To score millions of documents in milliseconds, an engine reads only the postings of the query terms, accumulates scores term by term or document by document, keeps the top k in a heap, and skips documents that cannot make the cut.',
          estimatedMinutes: 140,
          objectives: [
            'Implement term-at-a-time scoring with accumulators',
            'Implement document-at-a-time scoring over several postings lists',
            'Keep the top k results with a heap and state the cost',
            'Explain how MaxScore and WAND skip documents using score upper bounds',
            'Describe caching, tiering and sharding in a production engine',
          ],
          concepts: [
            'Term-at-a-time (TAAT) scoring',
            'Accumulators',
            'Document-at-a-time (DAAT) scoring',
            'Top-k with a min-heap',
            'Score upper bounds per term',
            'MaxScore and WAND',
            'Result and postings caches',
            'Sharding by document',
          ],
          explanation: `Every model in Module 2 is a sum over query terms of a contribution that is zero when the term is absent (for query likelihood, after the rank-equivalent rewrite). So only documents in the postings of the query terms need a score, and only those postings need to be read.

**Term-at-a-time (TAAT).** Process one query term at a time. Keep an **accumulator** per document, a dictionary from document ID to partial score. For each posting $(d, c)$ of term $w$, add the contribution of $w$ to $d$'s accumulator. At the end, choose the top $k$. It is simple and reads each list sequentially, but the accumulators can grow to the size of the union of the lists.

**Document-at-a-time (DAAT).** Open a cursor on every query term's list, all sorted by document ID. Repeatedly take the smallest current document ID, sum the contributions of every cursor sitting on it, advance those cursors, and offer the finished score to the top-$k$ structure. Memory is constant apart from the heap, and a document's score is complete as soon as it is computed.

**Top $k$ with a heap.** Keep a min-heap of size $k$. A new score enters only if it beats the heap's minimum, the current $k$-th best score $\\theta$. For $P$ scored documents this costs $O(P \\log k)$ rather than $O(P \\log P)$ for a full sort, a big saving when $k = 10$ and $P$ is in the millions.

**Skipping with upper bounds.** Before the query, store for each term the largest contribution it can make to any document, $U_w$. **MaxScore** and **WAND** use $\\theta$: a document can enter the top $k$ only if the sum of the upper bounds of the terms it contains exceeds $\\theta$. Suppose a query has terms A, B and C with $U_A = 2.1$, $U_B = 0.7$ and $U_C = 0.4$, and $\\theta = 1.0$. A document that contains only B can score at most 0.7, and one with only C at most 0.4, so neither can enter the top $k$ and both can be skipped without being scored. A document with both B and C can reach $1.1 > 1.0$, so it must still be scored. As $\\theta$ rises during the query, more is skipped. On real queries this cuts the number of scored documents several times over while returning exactly the same top $k$.

**At scale.** Large engines **shard** the collection by document across many machines. Each shard computes its own top $k$ in parallel, and a broker merges them. **Caches** hold the results of popular queries and the postings of frequent terms. **Tiered** indexes search a small high-quality tier first and fall back to the full index only when needed.

Read IIR Chapter 7, Sections 7.1 and 7.2, then the Coursera lecture on fast search.`,
          resources: [
            IIR('Chapter 7, Computing scores in a complete search system', 'Sections 7.1 and 7.2: efficient scoring, inexact top-k, tiered indexes and the parts of a full engine.', true),
            TRS('Week 2: "System Implementation: Fast Search".'),
            { title: 'Pyserini', url: 'https://github.com/castorini/pyserini', type: 'tool', cost: 'free', provider: 'University of Waterloo (Castorini group)', note: 'A Python interface to the Lucene-based Anserini toolkit, with prebuilt indexes for standard collections. Useful later as a reference engine to compare your own against (it needs Java 21).' },
          ],
          relatedLessons: ['algorithms-for-data-science/trees-and-hashing/heaps-and-top-k'],
          exercises: [
            {
              slug: 'taat-daat',
              title: 'TAAT and DAAT, same answer',
              prompt:
                'Add two search methods to your Cranfield engine, one term-at-a-time with a dictionary of accumulators and one document-at-a-time with cursors and `heapq` for the top 10, both scoring BM25 ($k_1 = 1.2$, $b = 0.75$). Assert they return identical top-10 lists for all 225 queries, comparing scores to within $10^{-9}$ and breaking ties by document ID. Report the peak number of accumulators for the longest query and the mean query time of each method.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'maxscore',
              title: 'Skip with MaxScore',
              prompt:
                'Precompute the BM25 upper bound $U_w$ of every term (its largest contribution to any document). Implement MaxScore for top-10 retrieval: sort query terms by $U_w$, maintain $\\theta$, and stop scoring documents that contain only "non-essential" terms whose bounds sum to at most $\\theta$. Verify the top 10 equals exhaustive DAAT on all 225 Cranfield queries, and report the fraction of postings you actually scored.',
              kind: 'coding',
              difficulty: 3,
              hint: 'Cranfield queries are long and documents short, so expect a modest saving; the technique pays off most on large collections with short queries.',
            },
            {
              slug: 'heap-cost',
              title: 'Heap versus sort',
              prompt:
                'Generate 5 million random scores with NumPy. Time (a) a full `sorted` of a Python list, (b) `heapq.nlargest(10, ...)`, and (c) `numpy.argpartition` followed by sorting the top 10. Compare with the operation counts $P \\log_2 P$ and $P \\log_2 k$, and explain why (c) can beat (b) even though its asymptotic cost is the same or worse.',
              kind: 'simulation',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'What is the main memory difference between TAAT and DAAT?',
              answerOutline: 'TAAT keeps an accumulator for every document in the union of the postings; DAAT finishes each document before moving on, so it needs only the cursors and the top-k heap.',
            },
            {
              question: 'Why does a min-heap of size k suit top-k retrieval?',
              answerOutline: 'Its root is the current k-th best score; each new score is compared with the root in O(1) and inserted in O(log k) only if it is better, so the total is O(P log k).',
            },
            {
              question: 'When can MaxScore or WAND skip a document safely?',
              answerOutline: 'When the sum of the score upper bounds of the query terms the document can contain is no larger than the current k-th best score, so it cannot enter the top k.',
            },
          ],
          quiz: [
            {
              question: 'A three-term query has postings of 1,000,000, 200,000 and 50,000 documents. With TAAT scoring, at most how many accumulators can exist?',
              options: ['50,000', '1,000,000', '1,250,000', '10, one per result'],
              answer: 2,
              explanation:
                'Each document in any of the lists can get an accumulator, so the maximum is the size of the union, at most $1{,}000{,}000 + 200{,}000 + 50{,}000 = 1{,}250{,}000$ if the lists do not overlap. 1,000,000 would hold only if the shorter lists were contained in the longest. 50,000 is an AND-style bound, which does not apply to ranked retrieval.',
            },
            {
              question: 'Terms A, B and C have score upper bounds 2.1, 0.7 and 0.4. The current 10th best score is $\\theta = 1.0$. Which documents can be skipped without computing their scores?',
              options: [
                'Every document that does not contain A',
                'Documents that contain only B, or only C',
                'Documents that contain only C',
                'None: every candidate must be scored',
              ],
              answer: 1,
              explanation:
                'A document with only B can score at most 0.7, and one with only C at most 0.4, both below 1.0, so neither can enter the top 10. A document with both B and C can reach 1.1, so it must still be scored. Skipping every document without A would drop those.',
            },
            {
              question: 'What distinguishes document-at-a-time from term-at-a-time processing?',
              options: [
                'DAAT computes each document\'s full score before moving to the next document; TAAT adds one term\'s contributions to all documents before moving to the next term',
                'DAAT only works for Boolean queries',
                'TAAT returns approximate results and DAAT exact ones',
                'DAAT reads postings in random order',
              ],
              answer: 0,
              explanation:
                'Both give exactly the same scores; they traverse the same postings in a different order. DAAT walks all lists in parallel by document ID, which keeps memory small and makes skipping natural. TAAT walks one list at a time and needs accumulators.',
            },
          ],
        },
        {
          slug: 'precision-recall-and-f-measure',
          title: 'Precision, recall and the F measure',
          summary:
            'Evaluation needs a test collection: documents, queries and human relevance judgements. For a set of results, precision asks how much of it is relevant, recall how much of the relevant material it found, and F combines them.',
          estimatedMinutes: 120,
          objectives: [
            'Describe the Cranfield evaluation paradigm and what a test collection contains',
            'Compute precision, recall and F for a set of results',
            'Explain the precision-recall trade-off with examples',
            'Use F-beta to weight recall or precision',
            'Choose a measure that matches a user task',
          ],
          concepts: [
            'Test collection: documents, queries, relevance judgements (qrels)',
            'Cranfield paradigm',
            'Precision',
            'Recall',
            'Precision-recall trade-off',
            'F1 as a harmonic mean',
            'F-beta',
            'Precision at k and recall at k',
          ],
          explanation: `You cannot tell whether BM25 beats query likelihood by looking at a few results. You need a **test collection**: a fixed set of documents, a set of queries (topics) and **relevance judgements** (qrels) made by people, saying which documents are relevant to which query. Systems are run on the queries and their output is scored against the qrels. This is the **Cranfield paradigm**, named after Cyril Cleverdon's experiments at Cranfield in the 1960s, which produced the collection you use in this course. Its great virtue is that experiments are repeatable and cheap once the judgements exist.

For a **set** of retrieved documents:

$$\\text{precision} = \\frac{|\\text{relevant} \\cap \\text{retrieved}|}{|\\text{retrieved}|}, \\qquad \\text{recall} = \\frac{|\\text{relevant} \\cap \\text{retrieved}|}{|\\text{relevant}|}.$$

**Worked example.** A system returns 20 documents, 8 of them relevant, and the qrels list 32 relevant documents for the query. Precision is $8/20 = 0.40$ and recall is $8/32 = 0.25$.

The two pull against each other. Return more documents and recall can only rise while precision usually falls. Returning the whole collection gives recall 1 and precision equal to the fraction of relevant documents, which is tiny.

The **F measure** combines them with a harmonic mean, which is dominated by the smaller value:

$$F_1 = \\frac{2PR}{P + R}, \\qquad F_\\beta = \\frac{(1 + \\beta^2)PR}{\\beta^2 P + R}.$$

In the example $F_1 = 2(0.4)(0.25)/0.65 = 0.308$. The arithmetic mean would be 0.325, and for "return everything" ($P \\approx 0$, $R = 1$) it would be about 0.5, which rewards a useless system. $F_1$ is near 0 there. $\\beta > 1$ weights recall more, as in legal discovery or a systematic medical review, where missing a relevant document is costly. $\\beta < 1$ weights precision, as in web search, where the user reads only a few results.

For rankings, the same measures are applied to the top $k$: **P@k** and **R@k**. P@10 matches a user who looks at the first page. It ignores order within the ten and anything below them, and the next lesson's measures fix both.

Watch out for recall's denominator. It counts every relevant document in the collection, including those your system never returned, so recall needs complete judgements, which large collections cannot afford. The last lesson of this module returns to that problem.

Read IIR Sections 8.1 to 8.3, then watch the Coursera lecture on evaluation basics.`,
          resources: [
            IIR('Chapter 8, Evaluation in information retrieval', 'Sections 8.1 to 8.3: test collections, precision, recall and the F measure.', true),
            TRS('Week 3: "Evaluation of TR Systems" and "Basic Measures".'),
            { title: 'Cranfield collection in ir_datasets', url: 'https://ir-datasets.com/cranfield.html', type: 'dataset', cost: 'free', provider: 'ir_datasets', note: 'The 1,400 documents, 225 queries and 1,837 judgements used throughout this course, loaded with one line of Python.' },
          ],
          exercises: [
            {
              slug: 'pr-by-hand',
              title: 'Precision and recall by hand',
              prompt:
                'A query has 12 relevant documents. System A returns 10 documents of which 6 are relevant; system B returns 30 of which 9 are relevant. Compute precision, recall, $F_1$ and $F_2$ for both (expected $F_1$: A = 0.545, B = 0.429). Say which system a patent examiner would prefer and which a casual user would prefer, and which measure captures each preference.',
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'load-cranfield-qrels',
              title: 'Load and inspect the Cranfield judgements',
              prompt:
                'Load Cranfield with `ir_datasets`. Count queries, judgements and relevant documents per query (median and maximum). Note that the relevance codes run from 1 (complete answer) to 4 (minimum interest), with $-1$ for "no interest": treat codes 1 to 4 as relevant and $-1$ as not relevant. Then compute P@10 and R@10 for your BM25 run on every query, and report their means (expected P@10 about 0.23 with $k_1 = 1.2$, $b = 0.75$, stemming and stop words removed).',
              kind: 'data-analysis',
              difficulty: 1,
              hint: 'A frequent bug is to treat a larger code as more relevant. In Cranfield, 1 is the most relevant.',
            },
            {
              slug: 'pr-tradeoff-curve',
              title: 'Trace the trade-off',
              prompt:
                'For Cranfield query 1, compute precision and recall of your BM25 run after each of the top 100 ranks and plot recall on the x-axis against precision. Mark the cutoff that maximises $F_1$ and the one that maximises $F_2$. Write two sentences on why a single cutoff is a poor summary of a ranked list.',
              kind: 'data-analysis',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What are the three components of a test collection?',
              answerOutline: 'A document collection, a set of queries (topics), and relevance judgements linking queries to relevant documents.',
            },
            {
              question: 'Why does F use a harmonic mean rather than an arithmetic mean?',
              answerOutline: 'The harmonic mean is pulled towards the smaller value, so a system cannot score well by maximising one measure (for example returning everything for recall 1) while the other is near zero.',
            },
            {
              question: 'Why is recall hard to measure on a large collection?',
              answerOutline: 'Its denominator is the number of all relevant documents, which requires judging (in principle) every document for every query; large collections only judge a sample or pool.',
            },
          ],
          quiz: [
            {
              question: 'A system retrieves 20 documents, 8 of them relevant, and the query has 32 relevant documents in total. What are precision, recall and $F_1$?',
              options: [
                'P = 0.25, R = 0.4, F1 = 0.308',
                'P = 0.4, R = 0.25, F1 = 0.325',
                'P = 0.4, R = 0.25, F1 = 0.308',
                'P = 0.4, R = 0.25, F1 = 0.270',
              ],
              answer: 2,
              explanation:
                '$P = 8/20 = 0.4$ and $R = 8/32 = 0.25$, so $F_1 = 2(0.4)(0.25)/(0.4 + 0.25) = 0.2/0.65 = 0.308$. 0.325 is the arithmetic mean. 0.270 is $F_2$, which weights recall. The first option swaps precision and recall.',
            },
            {
              question: 'A law firm must find every document relevant to a lawsuit and can afford to have reviewers read thousands of documents. Which measure fits best?',
              options: ['Precision at 10', 'Recall, or $F_\\beta$ with $\\beta > 1$', '$F_\\beta$ with $\\beta < 1$', 'Precision of the top result'],
              answer: 1,
              explanation:
                'Missing a relevant document is the costly error here, and reading extra ones is affordable, so recall matters most. $F_\\beta$ with $\\beta > 1$ weights recall. The other options reward precision at the top, which suits a web searcher instead.',
            },
            {
              question: 'A system returns all 10,000 documents for a query that has 20 relevant ones. What are its recall and its $F_1$?',
              options: [
                'Recall 1 and $F_1 \\approx 0.004$',
                'Recall 1 and $F_1 = 0.5$',
                'Recall 0.002 and $F_1 = 0.002$',
                'Recall 1 and $F_1 = 1$',
              ],
              answer: 0,
              explanation:
                'Everything relevant is returned, so recall is 1, while precision is $20/10{,}000 = 0.002$. Then $F_1 = 2(0.002)(1)/1.002 \\approx 0.004$. The arithmetic mean would be about 0.5, which is why F uses the harmonic mean. 0.002 is the precision, not the recall.',
            },
          ],
        },
        {
          slug: 'average-precision-map-and-ndcg',
          title: 'Average precision, MAP and nDCG',
          summary:
            'Ranked lists need measures that care about order. Average precision rewards putting relevant documents early and finding them all; nDCG handles graded relevance with a discount for depth. Means over queries compare systems.',
          estimatedMinutes: 150,
          objectives: [
            'Compute average precision for a ranked list by hand',
            'Draw a precision-recall curve and interpolated precision',
            'Compute DCG and nDCG with graded relevance',
            'Explain MAP and why it is averaged over queries rather than documents',
            'Choose between MAP, P@10 and nDCG@10 for a task',
          ],
          concepts: [
            'Average precision (AP)',
            'Mean average precision (MAP)',
            'Precision-recall curve',
            'Interpolated precision',
            'Graded relevance',
            'Discounted cumulative gain (DCG)',
            'Normalised DCG (nDCG@k)',
            'Macro-averaging over queries',
          ],
          explanation: `**Average precision** (AP) averages the precision at each rank where a relevant document appears, over **all** relevant documents for the query, $R$:

$$\\text{AP} = \\frac{1}{R}\\sum_{k:\\ \\text{doc at } k \\text{ relevant}} P@k.$$

A relevant document that is never retrieved contributes 0. That is how AP punishes low recall.

**Worked example.** Ten results with relevant documents at ranks 1, 3, 4 and 7, and one more relevant document that was never retrieved, so $R = 5$. The precisions at those ranks are $1/1$, $2/3$, $3/4$ and $4/7$, so AP $= (1 + 0.667 + 0.75 + 0.571)/5 = 0.598$. Moving the relevant document at rank 7 up to rank 5 raises its term from $4/7$ to $4/5$, and AP rises to 0.643. Each relevant document's contribution depends on everything above it, so AP rewards putting relevant documents early.

**MAP** is the mean of AP over the queries of a test collection. Every query counts equally, however many relevant documents it has. On Cranfield, BM25 reaches a MAP of 0.305 in the MP 1 reference run. Because a few hard queries with AP near 0 can hide behind easy ones, some studies also report the geometric mean (GMAP).

The **precision-recall curve** plots precision against recall after each rank. It zigzags, rising at each relevant document and falling in between. **Interpolated precision** at recall $r$ is the highest precision at any recall $\\ge r$, which gives a staircase that is easier to average across queries.

\`\`\`interactive
text-eval
{"grades": [1, 0, 1, 1, 0, 0, 1, 0, 0, 0], "missing": 1, "title": "Average precision and the PR curve", "caption": "This is the worked example: AP = 0.598. Click rank 5 to mark it relevant and rank 7 to unmark it, and AP rises to 0.643. Set 'never retrieved' to 0 and watch AP and recall jump. Then move the cutoff k and see that P@k and nDCG@k change but AP does not."}
\`\`\`

**Graded relevance.** Judges often grade documents: 0 not relevant, 1 partly, 2 highly, 3 perfect. **Discounted cumulative gain** adds each document's gain, discounted by the log of its rank:

$$\\text{DCG@}k = \\sum_{i=1}^{k} \\frac{g_i}{\\log_2(i + 1)}, \\qquad \\text{nDCG@}k = \\frac{\\text{DCG@}k}{\\text{IDCG@}k},$$

where IDCG is the DCG of the ideal ordering of all judged documents. For grades (3, 2, 0, 1) at ranks 1 to 4, DCG $= 3 + 2/1.585 + 0 + 1/2.322 = 4.693$. The ideal order (3, 2, 1, 0) gives 4.762, so nDCG@4 $= 0.985$. Many systems use the gain $2^{g} - 1$ instead of $g$, which rewards top grades more. Always say which you used.

\`\`\`interactive
text-eval
{"graded": true, "grades": [3, 2, 0, 1, 0, 2, 0, 0], "missing": 0, "k": 4, "curve": false, "title": "nDCG with graded relevance", "caption": "nDCG@4 is 0.824 here, because the ideal list would put the grade-2 document from rank 6 in the top four. Click rank 3 twice to give it grade 2 and nDCG@4 rises to 0.930. Then set k to 8 and compare."}
\`\`\`

Which measure? **P@10** and **nDCG@10** model a user who reads one page. **MAP** rewards finding everything and suits recall-oriented tasks and research comparisons.

Read IIR Section 8.4, then compute these measures with ir-measures or trec_eval and check that they agree with your own code.`,
          resources: [
            IIR('Chapter 8, Evaluation in information retrieval', 'Section 8.4: evaluation of ranked results, including interpolated precision, MAP, R-precision and NDCG.', true),
            TRS('Week 3: "Evaluating Ranked Lists" parts 1 and 2, and "Multi-Level Judgements".'),
            { title: 'ir-measures', url: 'https://ir-measur.es/', type: 'tool', cost: 'free', provider: 'MacAvaney, Macdonald and Ounis', note: 'One Python interface to trec_eval and other evaluation tools. Use it to check your own AP and nDCG code.' },
          ],
          exercises: [
            {
              slug: 'ap-by-hand',
              title: 'AP and nDCG by hand',
              prompt:
                'A query has 4 relevant documents. A system returns relevant documents at ranks 1, 2 and 5 of its top 10, and never retrieves the fourth. Compute AP (expected 0.65), P@5 and binary nDCG@5. Then compute nDCG@5 if the three retrieved relevant documents have grades 1, 3 and 2 in rank order and the missing one has grade 3, using linear gain. Check every number in the widget.',
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'eval-module',
              title: 'Write an evaluation module and check it',
              prompt:
                'Write `evaluate(run, qrels, k=10)` returning per-query AP, P@k, R@k and nDCG@k (linear gain, ideal from all judged documents), where `run` maps query IDs to ranked document IDs and `qrels` maps query IDs to {doc: grade}. Check against `ir_measures` (`AP`, `P@10`, `nDCG@10`) on your Cranfield BM25 run: every per-query value should agree to within $10^{-6}$ once you pass the same grades (use $5 - \\text{code}$ for codes 1 to 4). Expected means: MAP 0.305, nDCG@10 0.365, P@10 0.232.',
              kind: 'coding',
              difficulty: 2,
              hint: 'ir_measures uses gain equal to the grade by default for nDCG. Make sure the qrels you pass it use the same grades as yours.',
            },
            {
              slug: 'measures-disagree',
              title: 'When measures disagree',
              prompt:
                'Construct two rankings of 10 documents for a query with 5 relevant documents such that ranking A has higher P@10 but lower AP than ranking B. Then construct two with equal AP but different nDCG@10 under graded judgements. Explain each case in one sentence, and say which measure you would report for a question-answering product and why.',
              kind: 'problem',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does AP divide by the total number of relevant documents rather than the number retrieved?',
              answerOutline: 'So that relevant documents never retrieved count as zero precision; otherwise a system could get high AP by retrieving one relevant document at rank 1 and nothing else.',
            },
            {
              question: 'What does the discount in DCG model?',
              answerOutline: 'That a user is less likely to see, and gains less from, a document further down the list; the gain is divided by log2(rank + 1).',
            },
            {
              question: 'Why is nDCG normalised by the ideal DCG?',
              answerOutline: 'Queries differ in how many relevant documents they have and of what grades, so raw DCG is not comparable across queries; dividing by the best possible DCG puts each query on a 0-1 scale.',
            },
          ],
          quiz: [
            {
              question: 'A query has 4 relevant documents. A system ranks relevant documents at positions 1, 2 and 5, and never retrieves the fourth. What is its average precision?',
              options: ['0.867', '0.6', '0.65', '0.75'],
              answer: 2,
              explanation:
                'The precisions at the relevant ranks are $1/1$, $2/2$ and $3/5$. Their sum, $2.6$, is divided by all 4 relevant documents, so AP $= 0.65$. Dividing by the 3 retrieved ones gives 0.867, which ignores the missed document. 0.6 is P@5.',
            },
            {
              question: 'The top four results have grades (3, 2, 0, 1) and these are the only relevant documents. With linear gain and a $\\log_2(i+1)$ discount, what is nDCG@4?',
              options: ['0.985', '0.897', '1.0', '0.75'],
              answer: 0,
              explanation:
                'DCG $= 3/1 + 2/1.585 + 0/2 + 1/2.322 = 3 + 1.262 + 0 + 0.431 = 4.693$. The ideal order (3, 2, 1, 0) gives $3 + 1.262 + 0.5 = 4.762$. The ratio is 0.985. It is not 1.0 because the grade-1 document sits at rank 4 instead of rank 3.',
            },
            {
              question: 'MAP is computed by averaging AP over queries. Why average per query rather than pooling all relevant documents across queries?',
              options: [
                'Pooling would make the computation too slow',
                'Because each query has the same number of relevant documents',
                'Pooling is the same thing, so it does not matter',
                'So every query, and so every user need, counts equally, instead of letting queries with many relevant documents dominate',
              ],
              answer: 3,
              explanation:
                'Averaging per query (macro-averaging) treats each information need as one unit. Pooling relevant documents (micro-averaging) would weight a query with 100 relevant documents fifty times more than one with 2. Queries differ widely in their number of relevant documents, so the two are not the same.',
            },
            {
              question: 'Ranking X has relevant documents at ranks 1 to 3 and nothing else. Ranking Y has relevant documents at ranks 6 to 10. Both queries have 5 relevant documents. Which is true?',
              options: [
                'X has higher P@10 and higher AP',
                'X has lower P@10 but higher AP',
                'Both have the same P@10',
                'Y has higher AP because it finds more relevant documents',
              ],
              answer: 1,
              explanation:
                'P@10 is 0.3 for X and 0.5 for Y. AP is $(1 + 1 + 1)/5 = 0.6$ for X and $(1/6 + 2/7 + 3/8 + 4/9 + 5/10)/5 = 0.354$ for Y. AP rewards X\'s early placement even though Y found more, and P@10 ignores order within the top 10.',
            },
          ],
        },
        {
          slug: 'test-collections-pooling-and-significance',
          title: 'Test collections, pooling and significance tests',
          summary:
            'Large collections cannot be judged exhaustively, so TREC judges a pool of the top results from many systems. A difference in MAP between two systems is only meaningful if a paired test across queries says it is unlikely to be chance.',
          estimatedMinutes: 140,
          objectives: [
            'Explain pooling and the bias it introduces against systems that were not in the pool',
            'Describe how disagreement between assessors affects comparisons',
            'Run a paired t-test, a sign test and a randomisation test on per-query scores',
            'Interpret a p-value and an effect size for a system comparison',
            'Avoid tuning and testing on the same queries',
          ],
          concepts: [
            'TREC and shared evaluation campaigns',
            'Pooling to depth k',
            'Unjudged documents and pool bias',
            'Assessor disagreement',
            'Paired comparison over queries',
            'Paired t-test',
            'Sign test and randomisation test',
            'Multiple comparisons and held-out queries',
          ],
          explanation: `Cranfield's 1,400 documents could be judged for every query. TREC collections have millions. Since 1992, the Text REtrieval Conference (run by NIST) has built collections by **pooling**: each participating system submits a ranking per topic, the top $k$ documents (often 100) from every run are merged into a pool, and only the pool is judged. Documents outside the pool are assumed not relevant.

Pooling works because good systems find most relevant documents near the top, and many diverse systems cover each other's gaps. It has a known **bias**: a new system that finds relevant documents nobody else found has them counted as non-relevant, and is underrated. Check the fraction of your top 10 that is judged (judged@10). On TREC-COVID, a BM25 run in this course's tests had about 95% of its top 10 judged, which is high enough to trust nDCG@10.

People also disagree about relevance. Studies by Voorhees found that two assessors agree on only part of the relevant set, yet the **ranking of systems** stays largely stable across assessors. Evaluation compares systems more reliably than it measures absolute quality.

**Is a difference real?** Suppose BM25 has a MAP of 0.305 and Dirichlet query likelihood 0.290 on Cranfield's 225 queries. The difference could come from a few queries. Because both systems answer the same queries, use a **paired** test on the per-query differences $\\delta_i = \\text{AP}_A(i) - \\text{AP}_B(i)$:

- **Paired t-test**: $t = \\bar\\delta / (s_\\delta/\\sqrt{n})$ with $n - 1$ degrees of freedom. For BM25 against Dirichlet ($\\mu = 300$) on Cranfield, $t = 4.02$ with 224 degrees of freedom and $p \\approx 8 \\times 10^{-5}$: a small but consistent difference.
- **Sign test**: count the queries where A wins. Under the null hypothesis each is a coin flip, so with 20 queries and 15 wins the two-sided $p$ is $2\\,P(X \\ge 15) = 0.041$. It ignores the size of each difference.
- **Randomisation (permutation) test**: flip the sign of each $\\delta_i$ at random many times and count how often the mean is as large as observed. It makes the fewest assumptions and is widely recommended.

A p-value says how surprising the difference would be if the systems were equal. It does not say the difference matters to users, so report the mean difference and a confidence interval alongside it.

Two habits protect you. Tune parameters on one set of queries and report results on another, or the comparison is optimistic. And if you compare many variants, some will look significant by chance, so correct for multiple comparisons or confirm on fresh queries.

Read IIR Sections 8.2 and 8.5, then Sakai's or Smucker's papers on significance testing if you want depth.`,
          resources: [
            IIR('Chapter 8, Evaluation in information retrieval', 'Sections 8.2 (standard test collections and pooling) and 8.5 (assessing relevance, kappa).', true),
            { title: 'Text REtrieval Conference (TREC)', url: 'https://trec.nist.gov/', type: 'documentation', cost: 'free', provider: 'NIST', note: 'Browse the past tracks and their overview papers to see how collections, pools and measures are designed.' },
            { title: 'trec_eval', url: 'https://github.com/usnistgov/trec_eval', type: 'tool', cost: 'free', provider: 'NIST', note: 'The reference evaluation program for TREC run and qrels files. Its README lists every measure it computes.' },
          ],
          relatedLessons: ['probability-statistics/hypothesis-testing-and-regression/hypothesis-testing-and-p-values', 'probability-statistics/estimation-and-confidence/bootstrap-resampling'],
          exercises: [
            {
              slug: 'three-tests',
              title: 'Three significance tests on Cranfield',
              prompt:
                'Using per-query AP for BM25 ($k_1 = 1.2$, $b = 0.75$) and Dirichlet query likelihood ($\\mu = 300$) on all 225 Cranfield queries, run a paired t-test with `scipy.stats.ttest_rel` (expected $t \\approx 4.0$, $p \\approx 8 \\times 10^{-5}$), a sign test with `scipy.stats.binomtest`, and a randomisation test with 100,000 random sign flips using `default_rng(0)`. Report all three p-values, the mean difference, and a 95% bootstrap confidence interval for it. Then repeat on the first 20 queries only and explain why the conclusion changes.',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'simulate-pool-bias',
              title: 'Simulate pool bias',
              prompt:
                'On Cranfield, pretend only three runs exist (BM25, Dirichlet and TF-IDF from earlier lessons). Build a depth-10 pool per query from them and keep only judgements for pooled documents, treating everything else as not relevant. Then evaluate a fourth run (BM25 without stemming) against both the full and the pooled qrels. Report its MAP under each, the fraction of its top 10 that was judged, and explain why it is underrated.',
              kind: 'data-analysis',
              difficulty: 3,
            },
            {
              slug: 'sign-test-by-hand',
              title: 'A sign test by hand',
              prompt:
                'System B beats system A on 15 of 20 queries and loses on 5. Compute the two-sided sign-test p-value from the binomial distribution by hand (expected 0.041). Then suppose instead that B wins 11 of 20: compute the p-value and say what you would write in a report about each result.',
              kind: 'problem',
              difficulty: 1,
              hint: '$P(X \\ge 15) = (15504 + 4845 + 1140 + 190 + 20 + 1)/2^{20}$.',
            },
          ],
          selfAssessment: [
            {
              question: 'What is pooling and what bias does it introduce?',
              answerOutline: 'Judging only the union of the top-k results of the participating runs. Relevant documents found only by a new system are unjudged and counted as non-relevant, so new systems are underrated.',
            },
            {
              question: 'Why use a paired test across queries?',
              answerOutline: 'Query difficulty varies far more than the difference between systems; pairing compares both systems on the same query, removing that variation.',
            },
            {
              question: 'What does a small p-value not tell you?',
              answerOutline: 'Whether the difference is large or useful, or whether it would hold on other queries or collections; report the effect size with a confidence interval too.',
            },
          ],
          quiz: [
            {
              question: 'System B beats system A on 15 of 20 queries and loses on the other 5. What is the two-sided sign-test p-value?',
              options: ['About 0.021', 'About 0.75', 'About 0.0001', 'About 0.041'],
              answer: 3,
              explanation:
                'Under the null each query is a fair coin flip, so $P(X \\ge 15) = 21{,}700/1{,}048{,}576 = 0.0207$ for 20 flips. Two-sided doubles it to 0.041. 0.021 is the one-sided value. 0.75 is the win rate, not a probability under the null.',
            },
            {
              question: 'A TREC pool was built from the top 100 documents of 30 runs. A new system retrieves at rank 3 a relevant document that no pooled run retrieved. How is it scored?',
              options: [
                'As relevant, because evaluation detects it automatically',
                'It is excluded from the ranking before scoring',
                'As not relevant, because unjudged documents count as non-relevant, so the new system is underrated',
                'The whole query is discarded',
              ],
              answer: 2,
              explanation:
                'Only pooled documents were judged, and standard tools treat unjudged ones as non-relevant. That is the pool bias against novel systems. Measures such as judged@k, or ones that ignore unjudged documents, help to detect or reduce it.',
            },
            {
              question: 'You try 40 parameter settings on the same 50 queries and report the best one as "significantly better than BM25 ($p = 0.03$)". What is the main problem?',
              options: [
                'The best of 40 tries can look significant by chance, and the parameters were tuned on the test queries, so the result is optimistic',
                'A p-value of 0.03 is never significant',
                'The t-test cannot be used with 50 queries',
                'BM25 should not be used as a baseline',
              ],
              answer: 0,
              explanation:
                'Choosing the best of many variants and then testing it on the same queries inflates both the score and the significance. Tune on one query set and test once on a held-out set, or correct for multiple comparisons. Fifty queries are enough for a paired t-test.',
            },
          ],
        },
      ],
    },
    {
      slug: 'feedback-web-search-and-recommendation',
      title: 'Feedback, Web Search and Recommendation',
      description:
        'Improving the query with feedback, then what changes on the web: crawling at scale, link analysis with PageRank and HITS, and learning to rank from many signals. The module ends with recommender systems, the push side of text access.',
      lessons: [
        {
          slug: 'relevance-feedback-and-rocchio',
          title: 'Relevance feedback and Rocchio',
          summary:
            'When a user marks some results relevant or not, the system can move the query vector towards the relevant documents and away from the rest. Rocchio\'s formula does this in the vector space model.',
          estimatedMinutes: 120,
          objectives: [
            'Explain relevance feedback and where the judgements come from (explicit, implicit, pseudo)',
            'Apply the Rocchio formula to update a query vector',
            'Explain why positive feedback is weighted more than negative feedback',
            'Truncate the expanded query and explain why',
            'Evaluate feedback fairly using residual collections',
          ],
          concepts: [
            'Relevance feedback',
            'Explicit, implicit and pseudo feedback',
            'Rocchio algorithm',
            'Centroid of relevant and non-relevant documents',
            'Query expansion',
            'Weights alpha, beta, gamma',
            'Residual collection evaluation',
          ],
          explanation: `A query is a short, imperfect description of a need. **Relevance feedback** improves it using judgements on the first results. The judgements can be **explicit** (the user marks results), **implicit** (clicks and dwell time, noisy but free), or **pseudo** (assume the top results are relevant, the next lesson).

In the vector space model, the best query would sit close to the relevant documents and far from the non-relevant ones. **Rocchio's algorithm** moves the original query $\\vec q_0$ towards the centroid of the judged relevant documents $D_r$ and away from the centroid of the judged non-relevant ones $D_n$:

$$\\vec q_1 = \\alpha\\,\\vec q_0 + \\frac{\\beta}{|D_r|}\\sum_{\\vec d \\in D_r}\\vec d - \\frac{\\gamma}{|D_n|}\\sum_{\\vec d \\in D_n}\\vec d.$$

Negative weights are set to zero, since a negative term weight has no sensible meaning in a match.

**Worked example.** Over the terms (battery, storage, solar, price), the query "battery storage" is $\\vec q_0 = (1, 1, 0, 0)$. The user marks two documents relevant, $(2, 1, 1, 0)$ and $(1, 2, 0, 0)$, with centroid $(1.5, 1.5, 0.5, 0)$, and one non-relevant, $(1, 0, 0, 3)$, about battery prices. With $\\alpha = 1$, $\\beta = 0.75$ and $\\gamma = 0.15$:

$$\\vec q_1 = (1, 1, 0, 0) + (1.125, 1.125, 0.375, 0) - (0.15, 0, 0, 0.45) = (1.975, 2.125, 0.375, -0.45).$$

Clip the negative weight to get $(1.975, 2.125, 0.375, 0)$. The query has gained a new term, "solar", from the relevant documents (**query expansion**), and "price" cannot pull documents up.

**Choices that matter.**

- $\\beta > \\gamma$, because relevant documents resemble each other while non-relevant ones are non-relevant in many different ways, so their centroid is a weak signal. Common settings are $\\beta = 0.75$, $\\gamma = 0.15$, or $\\gamma = 0$.
- Keep only the top few dozen expansion terms by weight. A vector with thousands of small weights is slow to score and adds noise.
- Feedback needs judgements on a few results, and users rarely give them. That is why implicit and pseudo feedback matter so much in practice.

**Evaluating feedback fairly.** The documents the user judged will rise in the second ranking, which inflates any measure. Evaluate on the **residual collection**, with the judged documents removed from both rankings, or compare against a run that gets no feedback on those same documents.

Read IIR Sections 9.1.1 and 9.1.2, then watch the Coursera lecture on feedback in the vector space model.`,
          resources: [
            IIR('Chapter 9, Relevance feedback and query expansion', 'Sections 9.1.1 to 9.1.5: the Rocchio algorithm, when feedback works, and its evaluation.', true),
            TRS('Week 5: "Feedback in Text Retrieval" and "Feedback in Vector Space Model: Rocchio".'),
            { title: 'Cranfield collection in ir_datasets', url: 'https://ir-datasets.com/cranfield.html', type: 'dataset', cost: 'free', provider: 'ir_datasets', note: 'The judgements you use to simulate a user giving feedback.' },
          ],
          exercises: [
            {
              slug: 'rocchio-by-hand',
              title: 'Rocchio by hand',
              prompt:
                'Over the terms (wind, power, battery, price), the query is $(0, 1, 1, 0)$. Two relevant documents are $(1, 2, 1, 0)$ and $(0, 1, 2, 0)$, and one non-relevant document is $(0, 0, 1, 2)$. Compute $\\vec q_1$ with $\\alpha = 1$, $\\beta = 0.75$, $\\gamma = 0.15$ (expected $(0.375, 2.125, 1.975, -0.3)$ before clipping). Then compute the cosine of $\\vec q_0$ and of the clipped $\\vec q_1$ with each of the three documents and describe what moved.',
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'simulated-feedback',
              title: 'Simulated relevance feedback on Cranfield',
              prompt:
                'Using TF-IDF vectors (sublinear TF) for Cranfield, run each query, take the top 10, and simulate a user who marks those 10 using the qrels. Apply Rocchio with $\\alpha = 1$, $\\beta = 0.75$, $\\gamma = 0.15$, keeping the 30 heaviest terms. Report MAP before and after on the residual collection (judged top 10 removed from both runs). Then try $\\gamma = 0$ and say whether negative feedback helped.',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'implicit-feedback-design',
              title: 'Design implicit feedback',
              prompt:
                'A shopping site logs, for each query, which results were shown, which were clicked, and how long the user stayed on the product page. Design a rule that turns these logs into "relevant", "not relevant" and "unknown" labels for Rocchio. Describe two biases in your labels (for example, that people click the first result more whatever it is) and one way to reduce each. About 200 words.',
              kind: 'writing',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Write the Rocchio update and say what each term does.',
              answerOutline: 'q1 = alpha q0 + beta centroid(relevant) - gamma centroid(non-relevant): keep the original query, move towards relevant documents, move away from non-relevant ones.',
            },
            {
              question: 'Why is gamma usually smaller than beta?',
              answerOutline: 'Relevant documents cluster around one need, so their centroid is informative; non-relevant documents are diverse, so their centroid is close to the collection average and a weak signal.',
            },
            {
              question: 'Why must feedback be evaluated on a residual collection?',
              answerOutline: 'Documents the user already judged relevant move to the top after feedback, inflating the measures without helping the user find anything new.',
            },
          ],
          quiz: [
            {
              question: 'With $\\vec q_0 = (2, 0, 1)$, a relevant centroid $(1, 2, 0)$, a non-relevant centroid $(0, 1, 3)$, $\\alpha = 1$, $\\beta = 0.5$ and $\\gamma = 0.25$, what is $\\vec q_1$ before clipping?',
              options: ['(3, 2, 1)', '(2.5, 1.25, 1.75)', '(2.5, 0.75, 0.25)', '(2.5, 0.75, −0.5)'],
              answer: 2,
              explanation:
                '$(2, 0, 1) + 0.5(1, 2, 0) - 0.25(0, 1, 3) = (2 + 0.5,\\ 0 + 1 - 0.25,\\ 1 - 0.75) = (2.5, 0.75, 0.25)$. Adding the non-relevant centroid gives (2.5, 1.25, 1.75). (3, 2, 1) uses $\\beta = 1$ and no negative feedback.',
            },
            {
              question: 'Why do typical Rocchio settings use a smaller weight for non-relevant documents than for relevant ones?',
              options: [
                'Users judge fewer non-relevant documents',
                'Negative weights would make scores negative',
                'Non-relevant documents are always longer',
                'Non-relevant documents are diverse, so their centroid carries little information about what to avoid',
              ],
              answer: 3,
              explanation:
                'Relevant documents share one topic, so their centroid points somewhere useful. Non-relevant documents can be off-topic in a hundred different ways, and their average resembles the collection as a whole. Pushing away from it helps little and can hurt.',
            },
            {
              question: 'A search engine reranks results for a query by treating the documents users clicked on as relevant. What kind of feedback is this?',
              options: ['Explicit relevance feedback', 'Implicit feedback', 'Pseudo-relevance feedback', 'Content-based filtering'],
              answer: 1,
              explanation:
                'Clicks are behaviour the system observes, not judgements the user deliberately gives, so this is implicit feedback. Pseudo feedback assumes the top results are relevant without any user signal at all.',
            },
          ],
        },
        {
          slug: 'pseudo-relevance-feedback',
          title: 'Pseudo-relevance feedback and model-based feedback',
          summary:
            'Assume the top-ranked documents are relevant and learn a better query from them. In the language modelling approach, a mixture model fitted with a simple EM iteration separates topic words from background words in those documents.',
          estimatedMinutes: 150,
          objectives: [
            'Explain pseudo-relevance feedback and why it helps on average',
            'Write the two-component mixture feedback model and its EM updates',
            'Run one EM iteration by hand',
            'Interpolate the feedback model with the original query in KL-divergence retrieval',
            'Explain query drift and how to limit it',
          ],
          concepts: [
            'Pseudo-relevance (blind) feedback',
            'KL-divergence retrieval with a query model',
            'Two-component mixture: feedback topic and background',
            'EM: E-step and M-step',
            'Background weight lambda',
            'Interpolation weight alpha',
            'Query drift',
            'RM3 relevance model',
          ],
          explanation: `**Pseudo-relevance feedback** (PRF) skips the user: run the query, assume the top $k$ documents (often 10) are relevant, learn expansion terms from them, and run an improved query. It helps when the top documents are mostly on topic and hurts when they are not.

In the language modelling approach, a query is itself a distribution $\\theta_q$ over words, and a document is scored by $\\sum_w p(w \\mid \\theta_q) \\log p(w \\mid \\theta_d)$, which ranks documents exactly as KL-divergence from $\\theta_q$ to $\\theta_d$ does and equals query likelihood when $\\theta_q$ is the query's own word distribution. Feedback then means estimating a better $\\theta_q$.

The feedback documents contain topic words and also many ordinary words. Zhai and Lafferty's **mixture model** explains each word in the feedback documents $F$ as drawn from the background $p(w \\mid C)$ with probability $\\lambda$, or from an unknown topic model $\\theta_F$ with probability $1 - \\lambda$. Fit $\\theta_F$ by maximum likelihood with the **EM algorithm**, which alternates two steps:

- **E-step**: the probability that an occurrence of $w$ came from the topic,
$$z(w) = \\frac{(1 - \\lambda)\\,p(w \\mid \\theta_F)}{(1 - \\lambda)\\,p(w \\mid \\theta_F) + \\lambda\\,p(w \\mid C)}.$$
- **M-step**: re-estimate the topic from the counts credited to it, $p(w \\mid \\theta_F) \\propto c(w, F)\\,z(w)$.

**Worked example.** The feedback documents contain "the" 4 times, battery 3, storage 2 and solar 1. The background has $p(w \\mid C) = 0.3$, 0.01, 0.005 and 0.01. Start from the counts, $\\theta_F = (0.4, 0.3, 0.2, 0.1)$, with $\\lambda = 0.5$. The E-step gives $z(\\text{the}) = 0.2/(0.2 + 0.15) = 0.571$, but $z(\\text{battery}) = 0.15/0.155 = 0.968$, because "the" is easily explained by the background. The M-step gives $\\theta_F = (0.284, 0.361, 0.242, 0.113)$, so battery now leads. After 30 iterations "the" has fallen to 0.230. The log-likelihood never decreases from one iteration to the next, a property of EM that Module 5 proves and that makes a good unit test.

The new query model interpolates, $\\theta_q' = (1 - \\alpha)\\,\\theta_q + \\alpha\\,\\theta_F$, keeping the top 20 to 50 feedback terms. In this course's reference run on Cranfield (Dirichlet $\\mu = 300$, 10 feedback documents, 50 terms, $\\lambda = 0.7$, $\\alpha = 0.5$), MAP rose from 0.290 to 0.322. The average hides a spread: 151 queries improved and 70 got worse.

**Query drift** is the failure mode. If the top documents are about a different sense of the query, feedback reinforces the error. Keeping $\\alpha$ moderate and the number of terms small limits it. **RM3**, a widely used relevance model in Anserini and Pyserini, follows the same recipe with a different estimate of $\\theta_F$.

Read IIR Section 9.1.6 and Section 9.2, then watch the Coursera lecture on feedback in language models.`,
          resources: [
            TRS('Week 5: "Feedback in Text Retrieval: Feedback in LM" gives the mixture model and its EM algorithm in the course\'s own notation.'),
            IIR('Chapter 9, Relevance feedback and query expansion', 'Section 9.1.6 (pseudo relevance feedback) and Section 9.2 (global methods: thesauri and query expansion).', true),
            { title: 'A note on the Expectation-Maximization (EM) algorithm', url: 'https://czhai.cs.illinois.edu/pub/em-note.pdf', type: 'article', cost: 'free', provider: 'ChengXiang Zhai', note: 'A short note that derives EM for exactly this kind of mixture with a fixed background model.' },
          ],
          relatedLessons: ['machine-learning/unsupervised-learning/gaussian-mixtures-and-em'],
          exercises: [
            {
              slug: 'em-by-hand',
              title: 'Two EM iterations by hand',
              prompt:
                'Feedback documents contain "of" 5 times, "wing" 3 times and "flutter" 2 times. The background gives $p(\\text{of} \\mid C) = 0.05$, $p(\\text{wing} \\mid C) = 0.002$, $p(\\text{flutter} \\mid C) = 0.0005$. With $\\lambda = 0.8$ and $\\theta_F$ initialised to the relative counts, compute two EM iterations by hand, giving $z(w)$ and $\\theta_F$ each time. Then write the EM loop in NumPy, run it to convergence, and check that the log-likelihood $\\sum_w c(w,F)\\log((1-\\lambda)p(w|\\theta_F) + \\lambda p(w|C))$ never decreases.',
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'prf-cranfield',
              title: 'Model-based feedback on Cranfield',
              prompt:
                'Implement KL-divergence retrieval with Dirichlet smoothing ($\\mu = 300$) and the mixture feedback model. With 10 feedback documents, 50 terms, $\\lambda = 0.7$ and $\\alpha = 0.5$, report MAP before and after on all 225 Cranfield queries (expected about 0.290 and 0.322), and the number of queries helped and hurt. Print the top 10 words of $\\theta_F$ for query 1 with $\\lambda = 0$ and with $\\lambda = 0.7$, and explain the difference.',
              kind: 'data-analysis',
              difficulty: 3,
              hint: 'With lambda = 0 the feedback model is just the word distribution of the feedback documents, so general words like "high" and "test" rank high.',
            },
            {
              slug: 'drift-case-study',
              title: 'Find query drift',
              prompt:
                'From your Cranfield feedback run, take the five queries whose AP fell most. For each, list the original query, the top 10 feedback terms, and how many of the 10 feedback documents were relevant. Classify each failure (wrong sense, too few relevant feedback documents, a generic term swamping the query) and propose a fix you could test, such as a per-query decision to skip feedback.',
              kind: 'writing',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What does the background component in the feedback mixture model achieve?',
              answerOutline: 'It absorbs common words, so the topic model theta_F concentrates on words that are frequent in the feedback documents but not in general, the useful expansion terms.',
            },
            {
              question: 'State the E-step and the M-step of the feedback EM algorithm.',
              answerOutline: 'E: z(w) = (1-lambda)p(w|theta_F) / ((1-lambda)p(w|theta_F) + lambda p(w|C)). M: p(w|theta_F) proportional to c(w,F) z(w), normalised.',
            },
            {
              question: 'What is query drift and how can it be limited?',
              answerOutline: 'Expansion terms from off-topic feedback documents pull the query to a different topic. Limit it with a moderate interpolation weight, few expansion terms, fewer feedback documents, or skipping feedback for low-confidence queries.',
            },
          ],
          quiz: [
            {
              question: 'In the feedback mixture model the background weight is $\\lambda = 0.6$. A word has $p(w \\mid \\theta_F) = 0.05$ and $p(w \\mid C) = 0.01$. What is $z(w)$, the probability that an occurrence came from the feedback topic?',
              options: ['0.833', '0.231', '0.5', '0.769'],
              answer: 3,
              explanation:
                '$z = 0.4 \\times 0.05 / (0.4 \\times 0.05 + 0.6 \\times 0.01) = 0.02/0.026 = 0.769$. 0.833 ignores the mixing weights, and 0.231 is the probability that it came from the background.',
            },
            {
              question: 'For the query "jaguar speed", the top 10 documents are mostly about the car. After pseudo-relevance feedback, results about the animal almost disappear, although the user wanted the animal. What happened?',
              options: [
                'The background weight was too high',
                'The Dirichlet prior was too small',
                'Query drift: feedback learned terms from top documents about the wrong sense',
                'The documents were not stemmed',
              ],
              answer: 2,
              explanation:
                'Pseudo feedback trusts the first ranking. When that ranking is dominated by the wrong sense, the expansion terms (engine, model, dealer) reinforce it. That is query drift. Smoothing or stemming settings do not cause it.',
            },
            {
              question: 'What would go wrong if the mixture model had no background component ($\\lambda = 0$)?',
              options: [
                'The feedback model would be the raw word distribution of the feedback documents, dominated by common words',
                'EM would not converge',
                'Every word would get the same probability',
                'The model would ignore the feedback documents',
              ],
              answer: 0,
              explanation:
                'With $\\lambda = 0$ every word is credited to the topic, so the maximum likelihood estimate is simply the relative counts in $F$. Common words such as "high" or "results" then rank among the top expansion terms. EM converges immediately, since there is nothing to separate.',
            },
            {
              question: 'The new query model is $\\theta_q\' = (1 - \\alpha)\\theta_q + \\alpha\\,\\theta_F$. What does $\\alpha = 1$ mean?',
              options: [
                'No feedback is used',
                'The background model replaces the query',
                'The original query is discarded and only the feedback model is used',
                'The query and the feedback model get equal weight',
              ],
              answer: 2,
              explanation:
                'With $\\alpha = 1$ the original query model gets weight 0, so the query is entirely replaced by what was learned from the feedback documents, which maximises the risk of drift. Equal weight is $\\alpha = 0.5$, and $\\alpha = 0$ uses no feedback.',
            },
          ],
        },
        {
          slug: 'web-crawling-and-indexing-at-scale',
          title: 'Web crawling and indexing at scale',
          summary:
            'A web search engine must first collect the web: crawl politely, decide what to fetch and refetch, remove near-duplicates, and build the index across many machines with MapReduce.',
          estimatedMinutes: 120,
          objectives: [
            'Describe the parts of a crawler: frontier, fetcher, parser, URL filter and duplicate check',
            'Apply politeness rules, including robots.txt and per-host rate limits',
            'Detect near-duplicate pages with shingles, Jaccard similarity and MinHash',
            'Explain how MapReduce builds an inverted index',
            'Explain why freshness and prioritisation matter',
          ],
          concepts: [
            'Crawler and URL frontier',
            'Politeness and robots.txt',
            'Prioritisation and freshness',
            'Exact and near duplicates',
            'Shingles and Jaccard similarity',
            'MinHash',
            'MapReduce index construction',
            'Anchor text',
          ],
          explanation: `Web search differs from searching Cranfield in three ways: the collection must be gathered, it is enormous and changing, and it is adversarial (people manipulate rankings for money). This lesson covers gathering and building, and the next two cover ranking.

**A crawler** starts from seed URLs. The **frontier** holds URLs to fetch. A fetcher downloads a page, a parser extracts its text and links, a URL filter normalises the links and drops unwanted ones, and a duplicate check decides whether the content or URL has been seen. New URLs join the frontier. Breadth-first order finds important pages early, and production crawlers prioritise by estimated importance and by how often a page changes.

**Politeness** is not optional. Read each site's \`robots.txt\` (standardised as RFC 9309) and obey its rules, and send at most one request to a host at a time, with a delay between requests. Crawlers achieve this with one queue per host and a heap of hosts ordered by when each may next be contacted.

**Freshness.** Pages change at very different rates. A news front page changes every minute and an archived paper never does, so revisit rates should follow observed change rates.

**Near-duplicates.** A large part of the web is copied, mirrored or templated. Exact duplicates are caught by hashing the content. For near-duplicates, represent each page by its set of **shingles**, the word $k$-grams, and compare sets with **Jaccard similarity**, $J(A, B) = |A \\cap B| / |A \\cup B|$. "the solar battery stores power for the home" and "the solar battery stores energy for the home" have 6 word 3-grams each, 3 in common and 9 in the union, so $J = 1/3$, because one changed word breaks every shingle that contains it. Comparing every pair of billions of pages is impossible, so **MinHash** keeps, for each of many random hash functions, the minimum hash value of a page's shingles. The probability that two pages share a minimum equals their Jaccard similarity, so a few hundred numbers per page estimate it, and locality-sensitive hashing finds the candidate pairs.

**Building the index** is a MapReduce job. Mappers read pages and emit $(\\text{term}, (\\text{doc}, \\text{tf}))$ pairs. The shuffle groups pairs by term and sends each term to one reducer, which sorts its postings and writes the list. This is BSBI spread across machines. Indexes are partitioned by document, each machine holding a complete index of its share of pages.

**Anchor text**, the clickable text of links pointing to a page, is indexed with the target page. It describes pages in other people's words, which helps for pages that say little about themselves, such as a company home page.

Read IIR Chapter 20 on crawling and Section 19.6 on near-duplicates, then MMDS Chapter 3 for MinHash.`,
          resources: [
            IIR('Chapter 20, Web crawling and indexes', 'Sections 20.1 and 20.2: crawler architecture, the URL frontier, politeness and distributed crawling.', true),
            { title: 'Mining of Massive Datasets, Chapter 3', url: 'http://www.mmds.org/', type: 'textbook', cost: 'free', provider: 'Leskovec, Rajaraman and Ullman', note: 'Chapter 3 (Finding Similar Items) covers shingling, MinHash and locality-sensitive hashing; Chapter 2 covers MapReduce.' },
            { title: 'RFC 9309: Robots Exclusion Protocol', url: 'https://www.rfc-editor.org/rfc/rfc9309', type: 'documentation', cost: 'free', provider: 'IETF', note: 'The standard for robots.txt. Read Section 2 for what a crawler must do.' },
          ],
          relatedLessons: ['distributed-systems/storage-and-data-processing/mapreduce-and-batch-processing', 'algorithms-for-data-science/trees-and-hashing/sketches-bloom-and-count-min'],
          exercises: [
            {
              slug: 'polite-crawler',
              title: 'A polite crawler for one site',
              prompt:
                'Write a crawler with `requests` and `urllib.robotparser` that starts at a site you are allowed to crawl (for example the documentation of a project you use), stays on that host, obeys robots.txt, waits at least 1 second between requests, sends a User-Agent naming your project, and stops after 200 pages. Store each page\'s URL, title, text and outgoing links in a JSON Lines file. Report how many URLs were skipped by robots.txt and by your URL normalisation (fragments, query strings, trailing slashes).',
              kind: 'coding',
              difficulty: 2,
              hint: 'Never crawl a site that forbids it, and keep the rate low. Your own static site or a local copy of documentation is a safe target.',
            },
            {
              slug: 'minhash-dupes',
              title: 'Near-duplicates with MinHash',
              prompt:
                'Implement word 5-shingles, exact Jaccard similarity and a 128-function MinHash signature (hash each shingle with `hashlib.blake2b` and a per-function salt). On the 20 Newsgroups training posts (headers kept off), find all pairs with estimated Jaccard at least 0.8 using banding (16 bands of 8 rows). Check the estimated similarity against the exact value for the pairs you find, report how many near-duplicate pairs exist, and show two examples.',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'shingle-by-hand',
              title: 'Jaccard by hand',
              prompt:
                'Compute the Jaccard similarity of the word 2-shingle sets and of the word 3-shingle sets of "a b c d e f" and "a b c x e f". Expected: 3/7 for 2-shingles and 1/7 for 3-shingles. Explain why longer shingles make one changed word cost more, and what shingle length you would choose for detecting copied news articles.',
              kind: 'problem',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'What does politeness require of a crawler?',
              answerOutline: 'Obey robots.txt, limit the request rate per host (one connection, delays), identify itself, and avoid overloading servers.',
            },
            {
              question: 'Why does MinHash estimate Jaccard similarity?',
              answerOutline: 'Under a random permutation or hash, the minimum element of the union is equally likely to be any element; the two sets share the minimum exactly when it lies in the intersection, which has probability |A ∩ B| / |A ∪ B|.',
            },
            {
              question: 'What do the map and reduce steps emit when building an inverted index?',
              answerOutline: 'Map: (term, (doc ID, term frequency)) for each term of each document. Reduce: for each term, the sorted postings list.',
            },
          ],
          quiz: [
            {
              question: 'Two pages have 10 and 8 distinct shingles, with 6 in common. What is their Jaccard similarity?',
              options: ['0.6', '0.75', '0.5', '0.43'],
              answer: 2,
              explanation:
                'The union has $10 + 8 - 6 = 12$ shingles, so $J = 6/12 = 0.5$. 0.6 and 0.75 divide by the size of one set. 0.43 divides by the sum of the sizes, which double-counts the shared shingles.',
            },
            {
              question: 'A site\'s robots.txt disallows /private/ for all user agents. Your crawler finds a link to /private/report.html on a page. What should it do?',
              options: [
                'Fetch it once, since the link was public',
                'Fetch it but do not index it',
                'Fetch it only if it is not in the frontier yet',
                'Not fetch it',
              ],
              answer: 3,
              explanation:
                'robots.txt rules restrict fetching, so a compliant crawler skips the URL entirely. Being linked from a public page does not change that, and fetching without indexing still sends the request the site asked crawlers not to send.',
            },
            {
              question: 'In a MapReduce job that builds an inverted index, what does one reducer receive?',
              options: [
                'All terms of one document',
                'All (document, term frequency) postings for one term, to sort into a postings list',
                'A random sample of pages',
                'The PageRank of every page',
              ],
              answer: 1,
              explanation:
                'Mappers emit pairs keyed by term, and the shuffle groups every pair with the same key at one reducer, which therefore sees the complete postings for that term. Grouping by document is what the mapper input already is.',
            },
          ],
        },
        {
          slug: 'pagerank-and-hits',
          title: 'Link analysis: PageRank and HITS',
          summary:
            'Links are votes. PageRank scores a page by the long-run share of time a random surfer spends there; HITS scores hubs and authorities that reinforce each other. Both are computed by power iteration.',
          estimatedMinutes: 150,
          objectives: [
            'Define PageRank as the stationary distribution of a random surfer with teleportation',
            'Compute PageRank by power iteration, handling pages with no out-links',
            'Explain the role of the damping factor and how it affects convergence',
            'Compute hub and authority scores with HITS',
            'Explain how link analysis combines with text scores and how it can be manipulated',
          ],
          concepts: [
            'Link graph',
            'Random surfer',
            'Damping factor and teleportation',
            'Dangling pages',
            'Power iteration',
            'Stationary distribution',
            'Hubs and authorities (HITS)',
            'Link spam',
          ],
          explanation: `The text of a page says what it is about. Links from other pages say whether anyone thinks it is worth reading. Link analysis turns the link graph into a score of importance that is independent of the query.

**PageRank** imagines a **random surfer**. At each step, with probability $d$ (the **damping factor**, usually 0.85), the surfer follows a random out-link of the current page. Otherwise, with probability $1 - d$, the surfer jumps to a page chosen uniformly at random. A page with no out-links (a **dangling** page) sends the surfer to a random page. A page's PageRank is the long-run fraction of time the surfer spends there:

$$r_i = \\frac{1 - d}{N} + d\\left(\\sum_{j \\to i} \\frac{r_j}{\\text{out}(j)} + \\frac{1}{N}\\sum_{j\\ \\text{dangling}} r_j\\right).$$

Teleportation makes the chain irreducible and aperiodic, so a unique stationary distribution exists and **power iteration** finds it from any start: apply the update repeatedly. The error shrinks roughly like $d^k$, so $d = 0.85$ needs about 50 to 100 steps on the real web, each one a sparse matrix-vector product.

**Worked example.** Five pages with links A→B, A→C, B→C, C→A, D→C and D→E. E has no out-links. Start from 0.2 each with $d = 0.85$. In the first step C receives half of A's score, all of B's and half of D's: $0.03 + 0.85(0.1 + 0.2 + 0.1 + 0.04) = 0.404$, where 0.04 is E's dangling mass spread over five pages. The iteration converges to A 0.350, B 0.188, C 0.365, D 0.040 and E 0.056. C wins with three in-links, but A, with one in-link, comes a close second, because that link comes from C, the most important page. D has no in-links and keeps only the teleport share plus a little dangling mass.

\`\`\`interactive
text-pagerank
{"caption": "Press Step once: C has 0.404, as in the worked example. Then Play until the bars reach their ticks (A 0.350, C 0.365). Click E and then A to give E a link to A, and watch A overtake C. Lower d towards 0 and every page approaches 0.2; raise it to 0.99 and convergence slows. Switch to HITS: A gets no authority although C links to it."}
\`\`\`

**HITS** (Kleinberg) computes two scores on a query-specific subgraph (the top results and their neighbours). A good **authority** is linked to by good hubs, and a good **hub** links to good authorities: $a \\leftarrow A^{\\top}h$ and $h \\leftarrow A a$, normalised each step. These converge to the principal eigenvectors of $A^{\\top}A$ and $AA^{\\top}$. In the example graph, C is the top authority (0.577), and A and D are the top hubs (0.366 each). A gets authority 0: its only in-link comes from C, whose hub score falls to zero, because the small A-C cycle is not part of the dominant eigenvector. That shows how HITS can starve small communities.

**In practice.** PageRank is one feature among hundreds, combined with text scores (next lesson). Its weakness is that links can be bought or manufactured: **link farms** of pages that link to each other inflate a target's score. Defences include down-weighting links within one site, TrustRank-style propagation from trusted seeds, and treating paid links as nofollow.

Read IIR Chapter 21, then Chapter 5 of Mining of Massive Datasets for the computation at web scale.`,
          resources: [
            IIR('Chapter 21, Link analysis', 'Sections 21.2 (PageRank, Markov chains, power iteration) and 21.3 (hubs and authorities).', true),
            { title: 'Mining of Massive Datasets, Chapter 5', url: 'http://www.mmds.org/', type: 'textbook', cost: 'free', provider: 'Leskovec, Rajaraman and Ullman', note: 'Chapter 5 (Link Analysis): taxation, spider traps, computing PageRank with MapReduce, topic-sensitive PageRank and link spam.' },
            { title: 'The Anatomy of a Large-Scale Hypertextual Web Search Engine', url: 'https://research.google/pubs/the-anatomy-of-a-large-scale-hypertextual-web-search-engine/', type: 'article', cost: 'free', provider: 'Sergey Brin and Lawrence Page (1998), Google Research', note: 'The original Google paper. Section 2.1 defines PageRank; the rest shows a whole engine, from crawling to the inverted index.' },
          ],
          relatedLessons: ['linear-algebra-for-data-science/eigenvalues-and-networks/pagerank', 'linear-algebra-for-data-science/eigenvalues-and-networks/markov-chains'],
          exercises: [
            {
              slug: 'pagerank-numpy',
              title: 'PageRank by power iteration',
              prompt:
                'Implement PageRank with dangling pages and teleportation as in the lesson, using a SciPy sparse matrix. On the five-page example, iterate until the $\\ell_1$ change is below $10^{-12}$ and check the result (0.350, 0.188, 0.365, 0.040, 0.056) and that it sums to 1. Compare with `networkx.pagerank(G, alpha=0.85)`. Then report how many iterations are needed for $d = 0.5$, 0.85 and 0.99 to reach a change below $10^{-6}$ (expected 13, 28 and 37 steps on this tiny graph) and explain the trend.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'pagerank-web-google',
              title: 'PageRank on a real web graph',
              prompt:
                'Download the SNAP web-Google graph (875,713 nodes, 5,105,039 edges). Build a sparse transition matrix and run PageRank with $d = 0.85$ to an $\\ell_1$ change below $10^{-8}$. Report the number of iterations, the run time, the share of dangling nodes, the top 10 nodes with their scores, and the correlation between PageRank and in-degree (Spearman). Explain why the two are correlated but not identical.',
              kind: 'data-analysis',
              difficulty: 3,
            },
            {
              slug: 'hits-and-spam',
              title: 'HITS and a link farm',
              prompt:
                'Implement HITS and run it on the five-page example (expected authorities C 0.577, B and E 0.211; hubs A and D 0.366, B 0.268, with scores scaled to sum to 1). Then add a link farm: 10 new pages that all link to each other and to E. Report how E\'s PageRank and authority change, and propose one defence for each algorithm.',
              kind: 'simulation',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does PageRank need teleportation?',
              answerOutline: 'Without it the surfer can be trapped in dead ends or cycles (spider traps) and the stationary distribution may not be unique; teleportation makes the chain irreducible and aperiodic.',
            },
            {
              question: 'How does PageRank handle a page with no out-links in this lesson?',
              answerOutline: 'Its score is spread uniformly over all pages, as if it linked to every page.',
            },
            {
              question: 'How do HITS scores differ from PageRank?',
              answerOutline: 'HITS gives two scores (hub and authority) that reinforce each other, computed on a query-dependent subgraph; PageRank gives one query-independent score for the whole graph.',
            },
          ],
          quiz: [
            {
              question: 'Three pages have links A→B, A→C, B→C and C→A. Starting from $1/3$ each with $d = 0.85$, what is C\'s PageRank after one step?',
              options: ['0.5', '0.425', '0.333', '0.475'],
              answer: 3,
              explanation:
                'C receives half of A\'s score and all of B\'s: $1/6 + 1/3 = 0.5$. Then $r_C = 0.15/3 + 0.85 \\times 0.5 = 0.05 + 0.425 = 0.475$. 0.5 forgets the damping, and 0.425 forgets the teleport term.',
            },
            {
              question: 'Page E has no out-links. In the formulation of this lesson, what happens to E\'s PageRank at each step?',
              options: [
                'It is lost, so the scores sum to less than 1',
                'It is kept by E, so E accumulates score',
                'It is spread uniformly over all pages',
                'It is given to the pages that link to E',
              ],
              answer: 2,
              explanation:
                'A dangling page behaves as if it linked to every page, so its score is spread evenly. Dropping it would leak probability out of the system, and keeping it at E would turn E into a sink that absorbs everything.',
            },
            {
              question: 'Which statement correctly contrasts HITS with PageRank?',
              options: [
                'HITS computes hub and authority scores on a query-dependent subgraph; PageRank computes one global, query-independent score',
                'HITS uses teleportation and PageRank does not',
                'PageRank needs the query and HITS does not',
                'They compute the same scores with different algorithms',
              ],
              answer: 0,
              explanation:
                'HITS is run on a subgraph built from a query\'s results and gives each page two mutually reinforcing scores. PageRank is computed once for the whole graph and uses teleportation. Classic HITS does not.',
            },
            {
              question: 'What happens as the damping factor $d$ moves from 0.85 towards 0.99?',
              options: [
                'Scores approach the uniform distribution and converge faster',
                'Power iteration converges more slowly and the scores depend more on the link structure, including traps',
                'Dangling pages are removed',
                'Nothing changes, because $d$ only scales all scores',
              ],
              answer: 1,
              explanation:
                'The error shrinks roughly as $d^k$, so a value closer to 1 needs many more steps, and with less teleportation the surfer stays longer inside cycles and link farms. Small $d$ pushes scores towards uniform and converges fast. That is the opposite end.',
            },
          ],
        },
        {
          slug: 'learning-to-rank',
          title: 'Learning to rank',
          summary:
            'Modern engines combine hundreds of signals (BM25 on several fields, query likelihood, PageRank, freshness, clicks) with a model trained on judged queries. Pointwise, pairwise and listwise methods differ in what they optimise.',
          estimatedMinutes: 140,
          objectives: [
            'Represent a query-document pair as a feature vector and name typical features',
            'Distinguish pointwise, pairwise and listwise approaches',
            'Compute the RankNet pairwise loss for a pair of documents',
            'Explain how LambdaMART focuses training on swaps that change nDCG',
            'Train and evaluate a ranker with cross-validation grouped by query',
          ],
          concepts: [
            'Query-document feature vector',
            'Query-dependent and query-independent features',
            'Pointwise approach',
            'Pairwise approach (RankNet, RankSVM)',
            'Listwise approach',
            'LambdaMART and delta nDCG',
            'Grouped cross-validation by query',
            'LETOR benchmark datasets',
          ],
          explanation: `BM25 and query likelihood each capture one kind of evidence. A real engine has many more: BM25 on the title, the body and the anchor text separately, query likelihood, proximity of query terms, PageRank, URL depth, freshness, and click statistics. **Learning to rank** combines them with a model trained on judged queries.

Each **query-document pair** becomes a feature vector $x$, and the model outputs a score $s = f(x)$ used to sort. Some features depend on the query (BM25 of the title), others do not (PageRank, document length). Training data are queries with graded judgements, as in the test collections of Module 3.

Three families differ in their loss:

- **Pointwise**: predict each document's grade by regression or classification. It is simple, but it spends effort on getting absolute scores right, while ranking only needs the order within one query.
- **Pairwise**: for each pair where document $i$ is more relevant than $j$ for the same query, penalise the model if $s_i$ is not larger. **RankNet** models $P(i \\succ j) = \\sigma(s_i - s_j)$ and minimises the cross-entropy $-\\log \\sigma(s_i - s_j)$. With $s_i = 2$ and $s_j = 1$, $P = \\sigma(1) = 0.731$ and the loss is 0.313. If the scores were reversed the loss would be 1.313. RankSVM uses a hinge loss on the same differences.
- **Listwise**: optimise a measure of the whole list such as nDCG. These measures are flat or jump as scores change, so they cannot be differentiated directly. **LambdaMART** keeps RankNet's gradients but scales each pair's gradient by $|\\Delta\\text{nDCG}|$, the change in nDCG if the two documents swapped places, and fits gradient-boosted trees to those "lambdas". Pairs whose order matters at the top of the list get the most attention. For example, swapping a grade-2 document at rank 4 with a grade-0 document at rank 1 changes DCG by 1.14, while swapping two documents deep in the list changes it very little.

**Doing it honestly.** Split by **query**, never by document, or the model sees the same query in training and test. Use grouped cross-validation, tune on validation queries, and compare against the best single feature, often BM25. Public benchmarks such as **LETOR 4.0** (MQ2007, MQ2008) and MSLR-WEB10K provide precomputed features and folds. LightGBM and XGBoost implement LambdaMART (\`objective="lambdarank"\`).

Clicks are an attractive source of labels, but they are biased by position: users click the top result more whatever it is. Counterfactual learning to rank corrects for this, and the details are beyond this course.

Read Burges's overview of RankNet, LambdaRank and LambdaMART, then watch the Coursera lecture on learning to rank.`,
          resources: [
            { title: 'From RankNet to LambdaRank to LambdaMART: An Overview', url: 'https://www.microsoft.com/en-us/research/publication/from-ranknet-to-lambdarank-to-lambdamart-an-overview/', type: 'article', cost: 'free', provider: 'Christopher Burges, Microsoft Research (2010)', note: 'Read Sections 1 to 4 for the pairwise loss, the lambdas and why they optimise nDCG.', primary: true },
            TRS('Week 6: "Learning to Rank" parts 1 to 3.'),
            { title: 'LightGBM documentation', url: 'https://lightgbm.readthedocs.io/en/latest/', type: 'documentation', cost: 'free', provider: 'Microsoft', note: 'The lambdarank objective, the group parameter for queries, and the ndcg_eval_at metric.' },
          ],
          relatedLessons: ['machine-learning/trees-ensembles-and-kernels/gradient-boosting', 'machine-learning/linear-models/logistic-regression'],
          exercises: [
            {
              slug: 'ranknet-by-hand',
              title: 'RankNet loss and gradient by hand',
              prompt:
                'For a pair with document $i$ more relevant than $j$, the RankNet loss is $L = -\\log\\sigma(s_i - s_j)$. Compute $L$ and $\\partial L / \\partial s_i$ for $s_i - s_j = -1, 0, 1, 3$ (expected losses 1.313, 0.693, 0.313, 0.049). Then, for the graded list (0, 1, 0, 2) at ranks 1 to 4, compute $|\\Delta \\text{DCG}|$ for swapping ranks 1 and 4 (expected 1.139 with linear gain) and for swapping ranks 1 and 3, and explain which pair LambdaMART would push harder.',
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'ltr-mq2007',
              title: 'LambdaMART on LETOR MQ2007',
              prompt:
                'Download LETOR 4.0 MQ2007 (46 features per query-document pair, 5 folds). Train LightGBM with `objective="lambdarank"` on Fold 1, tuning the number of leaves and trees on the validation file, and report nDCG@10 on the test file. Compare with ranking by the single best feature on the training set and with a pointwise `LGBMRegressor`. Report all three, then average over the five folds.',
              kind: 'data-analysis',
              difficulty: 3,
            },
            {
              slug: 'ltr-cranfield-features',
              title: 'Build your own features',
              prompt:
                'For Cranfield, build features for the top 100 BM25 documents of each query: BM25 on the title, BM25 on the body, Dirichlet query likelihood, document length, the number of query terms matched, and the fraction of query bigrams that appear as phrases. Train a logistic regression pointwise model and a pairwise model (logistic regression on feature differences of judged pairs) with 5-fold cross-validation grouped by query. Report MAP for each and for BM25 alone, and say whether learning helped on this small collection and why.',
              kind: 'coding',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'Why is a pointwise loss a poor match for ranking?',
              answerOutline: 'It penalises errors in absolute scores, and treats documents of different queries as comparable, while ranking only cares about the order of documents within each query.',
            },
            {
              question: 'What do LambdaMART\'s lambdas add to RankNet\'s gradients?',
              answerOutline: 'Each pair\'s gradient is multiplied by the change in nDCG from swapping the two documents, so training concentrates on errors near the top of the list that the evaluation measure cares about.',
            },
            {
              question: 'Why must cross-validation for learning to rank be grouped by query?',
              answerOutline: 'Documents of one query share query-level features and judgement patterns; splitting them between training and test leaks information and makes results optimistic.',
            },
          ],
          quiz: [
            {
              question: 'RankNet scores a more relevant document $s_i = 2.0$ and a less relevant one $s_j = 0.5$. What is the pairwise loss $-\\ln\\sigma(s_i - s_j)$?',
              options: ['0.818', '1.701', '0.201', '0.5'],
              answer: 2,
              explanation:
                '$\\sigma(1.5) = 0.818$, the modelled probability that $i$ ranks above $j$, so the loss is $-\\ln 0.818 = 0.201$. 0.818 is the probability itself. 1.701 is the loss if the pair were ordered the other way.',
            },
            {
              question: 'Which approach optimises a measure of the whole ranked list for each query?',
              options: [
                'Pointwise regression on relevance grades',
                'Pairwise classification of document pairs',
                'Ranking by PageRank',
                'Listwise methods such as LambdaMART, which weight pairs by the change in nDCG',
              ],
              answer: 3,
              explanation:
                'Listwise methods target list-level measures such as nDCG. LambdaMART is usually called listwise because its pair weights come from $\\Delta$nDCG, even though it works on pairs. Pointwise and pairwise losses look at one document or one pair without the list measure.',
            },
            {
              question: 'Which of these features is query-independent?',
              options: [
                'BM25 score of the document title',
                'PageRank of the document',
                'Number of query terms found in the body',
                'Query likelihood of the document',
              ],
              answer: 1,
              explanation:
                'PageRank depends only on the link graph, so it is the same for every query, which makes it a measure of prior importance. The other three compare the document with the query, so they change from query to query.',
            },
          ],
        },
        {
          slug: 'recommender-systems',
          title: 'Recommender systems: content-based and collaborative filtering',
          summary:
            'Recommenders push items to users. Content-based filtering compares items with a user profile built from text; collaborative filtering predicts from the ratings of similar users or items, and matrix factorisation generalises it.',
          estimatedMinutes: 150,
          objectives: [
            'Build a content-based filter with a profile vector and a threshold set by a utility function',
            'Predict a rating with user-based collaborative filtering and mean-centred similarity',
            'Explain item-based collaborative filtering and matrix factorisation at a high level',
            'Evaluate a recommender with both rating error and ranking measures',
            'Explain cold start and popularity bias',
          ],
          concepts: [
            'Information filtering (push)',
            'Content-based filtering and user profiles',
            'Threshold from a utility function',
            'User-based collaborative filtering',
            'Pearson correlation and mean-centring',
            'Item-based collaborative filtering',
            'Matrix factorisation',
            'Cold start and popularity bias',
          ],
          explanation: `A recommender is a **filter** on a stream: for each new item and each user, decide whether to push it. Two sources of evidence exist: what the items contain, and how other people reacted to them.

**Content-based filtering** represents each item by its text (TF-IDF vectors, say) and each user by a **profile**, for example the centroid of items they liked, updated with Rocchio-style feedback. A new item is scored by its similarity to the profile and shown if the score passes a **threshold**. The threshold comes from the cost of mistakes. If showing a good item earns 3 and showing a bad one costs 2, show an item when $3p - 2(1 - p) > 0$, that is, when the estimated probability of relevance $p$ exceeds 0.4. Content-based filtering works for new items with no ratings, but it only recommends more of the same.

**Collaborative filtering** (CF) ignores content and uses the rating matrix. **User-based CF** predicts user $u$'s rating of item $i$ from similar users who rated $i$:

$$\\hat r_{ui} = \\bar r_u + \\frac{\\sum_{v} \\text{sim}(u, v)\\,(r_{vi} - \\bar r_v)}{\\sum_v |\\text{sim}(u, v)|}.$$

Mean-centring matters because users use the scale differently: one person's 3 is another's 5. Similarity is usually the **Pearson correlation** over co-rated items.

**Worked example.** Four users rate four items (blank = not rated): $u_0 = (5, 4, \\cdot, 1)$, $u_1 = (4, 5, 4, 1)$, $u_2 = (1, 1, 2, 5)$, $u_3 = (2, \\cdot, 1, 4)$. Predict $u_0$'s rating of item 3. Its mean is 3.33. With means taken over each user's own ratings and Pearson correlation over co-rated items, $\\text{sim}(u_0, u_1) = 0.880$, $\\text{sim}(u_0, u_2) = -0.970$ and $\\text{sim}(u_0, u_3) = -0.912$. The centred ratings of item 3 are $+0.5$, $-0.25$ and $-1.33$. Users who disagree with $u_0$ disliked it, which is evidence $u_0$ will like it. So $\\hat r = 3.33 + (0.44 + 0.24 + 1.22)/2.76 = 4.02$.

**Item-based CF** turns this around: find items similar to $i$ by their rating columns and use $u$'s own ratings of them. Item similarities are more stable and can be precomputed, which is why large services adopted it. **Matrix factorisation** learns a short vector for each user and each item so that their dot product approximates the rating. It generalises both, and the Machine Learning course covers it.

**Evaluation.** RMSE on held-out ratings measures prediction error, but users see a ranked list, so also report ranking measures such as nDCG@10 or recall@10 on held-out items. Models with the best RMSE are often not the best rankers.

Two problems are built in. **Cold start**: a new user or item has no ratings, so CF cannot help and content must. **Popularity bias**: popular items get recommended, shown and rated more, a feedback loop that hides the long tail.

Read MMDS Chapter 9, then watch the Coursera lectures on recommender systems.`,
          resources: [
            { title: 'Mining of Massive Datasets, Chapter 9', url: 'http://www.mmds.org/', type: 'textbook', cost: 'free', provider: 'Leskovec, Rajaraman and Ullman', note: 'Chapter 9 (Recommendation Systems): content-based recommendation, collaborative filtering and UV decomposition.', primary: true },
            TRS('Week 6: "Recommender Systems: Content-Based Filtering" parts 1 and 2, and "Collaborative Filtering" parts 1 to 3.'),
            { title: 'MovieLens datasets', url: 'https://grouplens.org/datasets/movielens/', type: 'dataset', cost: 'free', provider: 'GroupLens, University of Minnesota', note: 'Use MovieLens 100K for the exercises: 100,000 ratings from 943 users on 1,682 movies.' },
          ],
          relatedLessons: ['machine-learning/unsupervised-learning/anomaly-detection-and-recommenders', 'linear-algebra-for-data-science/svd-and-pca/recommender-factorisation'],
          exercises: [
            {
              slug: 'cf-by-hand',
              title: 'User-based prediction by hand',
              prompt:
                'Recompute the worked example: the means of all four users, the three Pearson similarities with $u_0$ over co-rated items, and the prediction 4.02. Then predict $u_3$\'s rating of item 1 the same way and say whether the neighbours agree. Finally, compute the prediction using only neighbours with positive similarity and explain why practitioners often do this.',
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'movielens-cf',
              title: 'Collaborative filtering on MovieLens 100K',
              prompt:
                'Load MovieLens 100K and use its `ua.base`/`ua.test` split. Implement the global mean, user-mean, item-mean, user-based kNN (Pearson, $k = 40$ neighbours who rated the item) and item-based kNN (adjusted cosine, $k = 40$). Report RMSE for each on `ua.test`. Then produce top-10 recommendations from the item-based model and from popularity, and compare their recall@10 on test ratings of 4 or more. Discuss the difference between the two rankings of the methods.',
              kind: 'data-analysis',
              difficulty: 3,
            },
            {
              slug: 'content-filter-threshold',
              title: 'A content-based filter with a utility threshold',
              prompt:
                'Use the 20 Newsgroups posts as a stream and pretend a user is interested in `sci.space`. Build a TF-IDF profile from 20 example posts, score the rest of the training posts by cosine, and choose the threshold that maximises the utility $3 \\times(\\text{relevant shown}) - 2 \\times(\\text{non-relevant shown})$ on the training set. Report the utility, precision and recall at that threshold on the test set, and compare with the threshold implied by $p > 0.4$ if you calibrate scores with logistic regression.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does user-based CF subtract each user\'s mean rating?',
              answerOutline: 'Users use the scale differently (generous or harsh raters). Centring compares how much each user liked an item relative to their own average.',
            },
            {
              question: 'When does content-based filtering beat collaborative filtering?',
              answerOutline: 'For new items with no ratings (item cold start), niche users with few similar users, and when content features are rich; CF wins when many ratings exist and taste is not captured by content.',
            },
            {
              question: 'Why can a model with the best RMSE be a poor recommender?',
              answerOutline: 'RMSE rewards accurate predictions on items users chose to rate, many of them mid-range; recommendation needs the right items at the top of a ranking among all items, which a ranking measure evaluates.',
            },
          ],
          quiz: [
            {
              question: 'User $u$ has mean rating 3.0. Neighbour $v_1$ (similarity 0.8, mean 4.0) rated the item 5. Neighbour $v_2$ (similarity 0.4, mean 3.0) rated it 2. What does mean-centred user-based CF predict?',
              options: ['4.0', '3.4', '4.333', '3.333'],
              answer: 3,
              explanation:
                'The centred ratings are $+1$ and $-1$. The prediction is $3.0 + (0.8 \\times 1 + 0.4 \\times (-1))/(0.8 + 0.4) = 3.0 + 0.4/1.2 = 3.333$. 4.0 is the similarity-weighted average of the raw ratings, which ignores the users\' means. 3.4 forgets to divide by the sum of similarities.',
            },
            {
              question: 'A streaming service adds a new film that nobody has rated yet. Which approach can recommend it today?',
              options: [
                'User-based collaborative filtering',
                'Item-based collaborative filtering',
                'Content-based filtering using the film\'s description, genre and cast',
                'Matrix factorisation trained on yesterday\'s ratings',
              ],
              answer: 2,
              explanation:
                'Every collaborative method needs ratings of the item, so a brand-new item is invisible to them. That is the item cold-start problem. Content-based filtering compares the item\'s own features with user profiles, so it works from the first day.',
            },
            {
              question: 'A filter earns 3 for each relevant item it shows and loses 2 for each non-relevant one. Above what estimated probability of relevance $p$ should it show an item?',
              options: ['p > 0.4', 'p > 0.6', 'p > 0.5', 'p > 0.67'],
              answer: 0,
              explanation:
                'Showing has expected utility $3p - 2(1 - p) = 5p - 2$, which is positive when $p > 0.4$. Not showing earns 0. The threshold is below 0.5 because a good item gains more than a bad item costs. 0.6 swaps the two payoffs.',
            },
          ],
        },
      ],
    },
    {
      slug: 'word-association-and-topic-models',
      title: 'Word Association and Topic Models',
      description:
        'The start of text mining: discover which words are related, by shared contexts or by co-occurrence, then model a collection as a mixture of topics with PLSA fitted by EM and with LDA.',
      lessons: [
        {
          slug: 'paradigmatic-relations',
          title: 'Paradigmatic relations: words with similar contexts',
          summary:
            'Two words are paradigmatically related if they can replace each other, like "cat" and "dog". Represent each word by the words around it and compare those context vectors with weighting borrowed from retrieval.',
          estimatedMinutes: 120,
          objectives: [
            'Distinguish paradigmatic from syntagmatic relations',
            'Build context vectors for words from a window around each occurrence',
            'Compute expected overlap of words in context (EOWC) by hand',
            'Improve context similarity with sublinear TF and IDF weighting',
            'Use paradigmatic relations for query expansion and thesaurus building',
          ],
          concepts: [
            'Paradigmatic relation (substitutable words)',
            'Syntagmatic relation (combining words)',
            'Distributional hypothesis',
            'Context window and pseudo-document',
            'Context vector',
            'Expected overlap of words in context (EOWC)',
            'BM25-style weighting of contexts',
          ],
          explanation: `Text mining starts with the simplest question about a collection: which words are related? There are two kinds of relation.

- **Paradigmatic**: words that can replace each other in a sentence, because they belong to the same class. "Cat" and "dog", "Monday" and "Tuesday", "BM25" and "TF-IDF". They tend to have **similar contexts**, even if they rarely appear together.
- **Syntagmatic**: words that combine with each other. "Cat" and "sit", "car" and "drive". They tend to **co-occur**. The next lesson finds these.

The idea that words are known "by the company they keep" is the **distributional hypothesis** (Harris, Firth). To use it, collect for each word $w$ a **pseudo-document** made of the words around each occurrence of $w$, for example one word to the left, or a window of five words on each side. Count it like any document to get a context vector.

The simplest similarity, **expected overlap of words in context** (EOWC), normalises each context vector to probabilities $x_i$ and $y_i$ and takes $\\sum_i x_i y_i$: the probability that a word picked at random from $w_1$'s contexts equals a word picked from $w_2$'s.

**Worked example.** Over the context words (my, eats, fish, meat, runs), "cat" has context counts (2, 2, 1, 0, 0), so $x = (0.4, 0.4, 0.2, 0, 0)$. "Dog" has (2, 1, 0, 1, 0), so $y = (0.5, 0.25, 0, 0.25, 0)$. "Computer" has (1, 0, 0, 0, 3), so $z = (0.25, 0, 0, 0, 0.75)$. EOWC(cat, dog) $= 0.4 \\times 0.5 + 0.4 \\times 0.25 = 0.30$ and EOWC(cat, computer) $= 0.4 \\times 0.25 = 0.10$. The method works, but much of the cat-dog similarity comes from "my", which precedes almost every noun.

The problems are the ones retrieval already solved. A context word that appears very often near $w$ dominates the sum, so apply a sublinear or BM25-style TF transform to the counts. A context word that is frequent everywhere ("my", "the") says little, so weight each shared context word by its IDF. With these two changes the measure becomes much more discriminating, and the same weighted context vectors can also reveal syntagmatic relations: the context words with the highest weights in $w$'s vector are those that co-occur with it unusually often.

**Uses.** Paradigmatic relations suggest query expansion terms ("car" and "automobile"), build domain thesauri, and group entities by type. Word embeddings (Module 8) are a learned, dense version of the same idea.

Work through the Coursera lectures on paradigmatic relation discovery, which develop exactly this progression from EOWC to BM25 weighting.`,
          resources: [
            TMA('Week 1: "Word Association Mining and Analysis" and "Paradigmatic Relation Discovery" parts 1 and 2.'),
            TDMA('Chapter 13 (word association mining).'),
            SLP('Chapter 6 (vector semantics and embeddings), Sections 6.1 to 6.6: words as vectors, cosine, TF-IDF and PPMI weighting of co-occurrence matrices.'),
          ],
          exercises: [
            {
              slug: 'eowc-by-hand',
              title: 'Context similarity by hand',
              prompt:
                'Using the counts in the lesson, compute EOWC for (dog, computer) and the cosine similarity of the raw count vectors for all three pairs. Then multiply each context dimension by an IDF weight in which "my" has weight 0.1 and the others weight 1, renormalise, and recompute EOWC for (cat, dog) and (cat, computer). Say which pair\'s similarity fell more and why.',
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'context-vectors-20ng',
              title: 'Paradigmatic neighbours in 20 Newsgroups',
              prompt:
                'On the 20 Newsgroups training posts (headers, footers and quotes removed, lower-cased, stop words kept), build a context vector for every word with at least 50 occurrences, using a window of 2 words on each side. Weight contexts with BM25-style TF ($k_1 = 1.2$, $b = 0$) times IDF over the pseudo-documents, normalise, and list the 8 nearest neighbours by cosine of "monday", "car", "god", "windows" and "nasa". Compare with unweighted EOWC and comment on which neighbours are substitutes and which are merely associated.',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'window-size',
              title: 'How the window changes the relation',
              prompt:
                'Repeat the neighbour lists for "car" and "god" with windows of 1, 2 and 10 words. Describe how the neighbours change as the window grows, and explain the trend in terms of paradigmatic and syntagmatic relations. About 150 words with the tables.',
              kind: 'writing',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Give an example of a paradigmatic and a syntagmatic relation, and the evidence that reveals each.',
              answerOutline: 'Paradigmatic: cat and dog, revealed by similar contexts. Syntagmatic: cat and meow, revealed by co-occurrence.',
            },
            {
              question: 'What is EOWC, as a probability?',
              answerOutline: 'The probability that a word drawn at random from the context of w1 and a word drawn at random from the context of w2 are the same word: the dot product of the normalised context vectors.',
            },
            {
              question: 'Why does IDF weighting help when comparing context vectors?',
              answerOutline: 'Very common context words (my, the) appear around almost every word, so they inflate similarity between unrelated words; IDF down-weights them.',
            },
          ],
          quiz: [
            {
              question: 'Normalised context vectors over (the, eats, barks, meows) are $x = (0.5, 0.3, 0, 0.2)$ for "cat" and $y = (0.6, 0.2, 0.2, 0)$ for "dog". What is their EOWC?',
              options: ['0.30', '0.36', '0.80', '0.06'],
              answer: 1,
              explanation:
                '$0.5 \\times 0.6 + 0.3 \\times 0.2 + 0 \\times 0.2 + 0.2 \\times 0 = 0.30 + 0.06 = 0.36$. 0.30 is the contribution of "the" alone, which is exactly why common context words need down-weighting.',
            },
            {
              question: 'Which pair is most clearly a paradigmatic relation?',
              options: ['"doctor" and "hospital"', '"drink" and "coffee"', '"strong" and "tea"', '"Paris" and "Berlin"'],
              answer: 3,
              explanation:
                'Paris and Berlin can replace each other in "the train to ... leaves at noon": same class, similar contexts. The other pairs combine with each other in text (they co-occur), which is a syntagmatic relation.',
            },
            {
              question: 'Two unrelated nouns get a high EOWC score because both are often preceded by "the". Which fix targets this directly?',
              options: [
                'Weight each shared context word by its IDF over the context pseudo-documents',
                'Use a larger context window',
                'Apply a stemmer to the context words',
                'Use raw counts instead of normalised ones',
              ],
              answer: 0,
              explanation:
                '"the" appears in nearly every context pseudo-document, so its IDF is near zero and its contribution vanishes. A larger window adds more common words. Raw counts make the problem worse by rewarding frequent contexts more.',
            },
          ],
        },
        {
          slug: 'syntagmatic-relations-entropy-and-mutual-information',
          title: 'Syntagmatic relations: entropy and mutual information',
          summary:
            'Words that co-occur more than chance predicts are syntagmatically related. Entropy measures how hard a word\'s presence is to predict, and mutual information measures how much knowing one word reduces that uncertainty.',
          estimatedMinutes: 140,
          objectives: [
            'Compute the entropy of a binary word-presence variable',
            'Compute conditional entropy and mutual information from co-occurrence counts',
            'Explain why mutual information, not conditional entropy, should be used to compare pairs',
            'Smooth co-occurrence estimates for rare words',
            'Find the strongest associations of a word in a real collection',
          ],
          concepts: [
            'Binary presence variable for a word in a segment',
            'Entropy',
            'Conditional entropy',
            'Mutual information',
            'Co-occurrence counts and a 2 by 2 table',
            'Smoothing with pseudo-counts',
            'Pointwise mutual information',
          ],
          explanation: `Split the collection into **segments** (sentences, paragraphs or documents). For a word $w$, let $X_w = 1$ if $w$ occurs in a segment and 0 otherwise. If "meat" is present, how much more predictable is "eats"?

The **entropy** of $X_w$ measures how hard its value is to guess:

$$H(X_w) = -p \\log_2 p - (1 - p) \\log_2 (1 - p), \\qquad p = P(X_w = 1).$$

A word in half of all segments has entropy 1 bit, the maximum. One in 10% has 0.469 bits. "the", which is in almost every segment, is close to 0, because it is easy to predict.

The **conditional entropy** $H(X_{w_2} \\mid X_{w_1})$ is the remaining uncertainty about $w_2$ once you know whether $w_1$ is present, averaged over the two cases. **Mutual information** is the reduction:

$$I(X_1; X_2) = H(X_2) - H(X_2 \\mid X_1) = \\sum_{u, v \\in \\{0,1\\}} p(u, v) \\log_2 \\frac{p(u, v)}{p(u)\\,p(v)}.$$

It is symmetric, never negative, zero exactly when the two words are independent, and largest when one determines the other, when it equals the entropy.

**Worked example.** In 100 segments, "eats" occurs in 20, "meat" in 10, and both in 8. The four cells are $p(1,1) = 0.08$, $p(1,0) = 0.12$, $p(0,1) = 0.02$ and $p(0,0) = 0.78$. $H(X_\\text{meat}) = 0.469$ bits. Given "eats", "meat" is present with probability $0.08/0.2 = 0.4$ (entropy 0.971). Without "eats", it is present with probability $0.02/0.8 = 0.025$ (entropy 0.169). The conditional entropy is $0.2 \\times 0.971 + 0.8 \\times 0.169 = 0.329$, so $I = 0.469 - 0.329 = 0.140$ bits. Had they co-occurred only twice, as independence predicts ($0.2 \\times 0.1 \\times 100$), $I$ would be 0.

Why not rank partners by conditional entropy? $H(X_{w_2} \\mid X_{w_1})$ is bounded by $H(X_{w_2})$, so it ranks partners partly by their own frequency. Mutual information subtracts that baseline and is comparable across pairs.

**Smoothing.** For rare words a single co-occurrence can produce extreme estimates, so add a small pseudo-count to each of the four cells (for example 0.25 each, a total of one pseudo-segment) before computing probabilities.

On the four-newsgroup collection used in MP 2 (2,013 posts), the words with the highest smoothed document-level mutual information with "hockey" are team, play, game, nhl and teams. For "orbit" they are earth, space, launch, orbital and nasa.

**Pointwise mutual information**, $\\log_2 \\frac{p(1,1)}{p(1)\\,p(1)}$ for one cell, is popular for collocations, but it overrates rare pairs. It is also the quantity that word embeddings implicitly factorise (Module 8).

Watch the Coursera lectures on syntagmatic relation discovery, then read Church and Hanks for the original use of mutual information in lexicography.`,
          resources: [
            TMA('Week 2: "Syntagmatic Relation Discovery: Entropy", "Conditional Entropy" and "Mutual Information" parts 1 and 2.'),
            { title: 'Word Association Norms, Mutual Information, and Lexicography', url: 'https://aclanthology.org/J90-1003/', type: 'article', cost: 'free', provider: 'Kenneth Church and Patrick Hanks (Computational Linguistics, 1990)', note: 'The paper that brought (pointwise) mutual information to word association. Read Sections 1 to 4.' },
            TDMA('Chapter 13 (word association mining), the syntagmatic sections.'),
          ],
          relatedLessons: ['probability-statistics/random-variables-and-distributions/joint-distributions-and-covariance'],
          exercises: [
            {
              slug: 'mi-by-hand',
              title: 'Mutual information by hand',
              prompt:
                'In 200 segments, "ice" occurs in 30, "hockey" in 20 and both in 15. Build the 2 by 2 table, compute $H(X_\\text{hockey})$, $H(X_\\text{hockey} \\mid X_\\text{ice})$ and $I$. Then add 0.25 to each cell (total 201 segments) and recompute $I$. Check both with a short NumPy function you will reuse in MP 2.',
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'mi-20ng',
              title: 'Strongest associations in 20 Newsgroups',
              prompt:
                'Load the 20 Newsgroups training posts of `comp.graphics`, `rec.sport.hockey`, `sci.space` and `talk.politics.mideast` (headers, footers and quotes removed), and use `CountVectorizer(stop_words="english", min_df=5, max_df=0.5, token_pattern=r"(?u)\\b[a-zA-Z]{3,}\\b")` with binary presence per post, keeping posts with at least 10 tokens (2,013 posts). Compute smoothed mutual information between "hockey" and every other word with sparse matrix products, and list the top 6. Expected: team, play, game, nhl, teams, ice. Do the same for "orbit" and "jpeg", and for one word of your choice.',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'pmi-vs-mi',
              title: 'PMI against MI',
              prompt:
                'For the same collection, rank all pairs of words that each occur in at least 5 posts by PMI and by MI, and show the top 15 of each. Explain why PMI favours pairs of rare words that co-occur once or twice, and why MI does not. Suggest a threshold or weighting that would make PMI usable for finding collocations.',
              kind: 'data-analysis',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does "the" have low entropy as a presence variable?',
              answerOutline: 'It appears in nearly every segment, so p is close to 1 and its presence is easy to predict; entropy is near 0.',
            },
            {
              question: 'Why compare candidate partners by mutual information rather than by conditional entropy?',
              answerOutline: 'Conditional entropy H(Y|X) depends on H(Y), so it is not comparable across different Y; MI = H(Y) - H(Y|X) measures the reduction and is symmetric and comparable.',
            },
            {
              question: 'When is the mutual information between two words zero, and when is it maximal?',
              answerOutline: 'Zero when their presences are independent. Maximal (equal to the entropy) when one word\'s presence completely determines the other\'s.',
            },
          ],
          quiz: [
            {
              question: 'A word occurs in 25% of segments. What is the entropy of its presence variable?',
              options: ['0.811 bits', '0.25 bits', '2 bits', '0.5 bits'],
              answer: 0,
              explanation:
                '$-0.25\\log_2 0.25 - 0.75\\log_2 0.75 = 0.25 \\times 2 + 0.75 \\times 0.415 = 0.811$. A binary variable can never exceed 1 bit, so 2 bits is impossible. 0.25 is the probability, not the entropy.',
            },
            {
              question: 'Two words each occur in 10 of 50 segments, always in the same segments. What is their mutual information?',
              options: ['1 bit', '0 bits, because the probabilities are equal', '0.2 bits', '0.722 bits'],
              answer: 3,
              explanation:
                'When one word determines the other, $H(X_2 \\mid X_1) = 0$ and $I = H(X_2) = H(0.2) = -0.2\\log_2 0.2 - 0.8\\log_2 0.8 = 0.722$ bits. 1 bit would need $p = 0.5$. Equal marginal probabilities do not imply independence.',
            },
            {
              question: 'In 100 segments, word A appears in 20 and B in 10. Which co-occurrence count gives zero mutual information?',
              options: ['10', '0', '2', '5'],
              answer: 2,
              explanation:
                'Independence means $p(1,1) = p(A)p(B) = 0.2 \\times 0.1 = 0.02$, so 2 of 100 segments. Zero co-occurrences is a negative association, which still carries information, so its MI is positive. 10 means B always appears with A, which is strong association.',
            },
          ],
        },
        {
          slug: 'mining-one-topic-and-mixture-models',
          title: 'Mining a topic with mixture models and EM',
          summary:
            'A topic is a word distribution. Estimating it from one document by maximum likelihood gives the most common words; adding a background component and fitting the mixture with EM pulls the topic words out. EM never decreases the likelihood.',
          estimatedMinutes: 150,
          objectives: [
            'Represent a topic as a unigram language model and estimate it by maximum likelihood',
            'Write the likelihood of a two-component mixture with a fixed background',
            'Derive and run the E-step and M-step',
            'Explain why EM never decreases the likelihood and why it can stop at a local maximum',
            'State the cost of one EM iteration',
          ],
          concepts: [
            'Topic as a word distribution',
            'Maximum likelihood topic estimate',
            'Background language model',
            'Two-component mixture model',
            'Hidden variable z: which component produced a word',
            'E-step and M-step',
            'Monotone likelihood and local maxima',
            'Convergence criterion',
          ],
          explanation: `A **topic** in text mining is a probability distribution over words: a "space" topic puts high probability on orbit, launch and nasa. The simplest task is to mine one topic from one document $d$. The maximum likelihood estimate is $p(w \\mid \\theta) = c(w, d)/|d|$, and its top words are "the", "of" and "and". The estimate is right: those words really are the most frequent. The model is wrong, because a single distribution has to explain every word.

Add a **background** component $\\theta_B$, estimated from a large collection and kept fixed, to explain the common words. Each word occurrence in $d$ is generated by first choosing a component, background with probability $\\lambda$ and topic with probability $1 - \\lambda$, then drawing the word from it. The log-likelihood is

$$\\log p(d) = \\sum_{w} c(w, d) \\log\\big(\\lambda\\, p(w \\mid \\theta_B) + (1 - \\lambda)\\, p(w \\mid \\theta)\\big).$$

The log of a sum has no closed-form maximiser. If we knew which component produced each occurrence, the hidden variable $z$, the topic estimate would just be the relative counts of the words credited to it. The **EM algorithm** alternates between guessing $z$ and re-estimating:

- **E-step**: $p(z = \\theta \\mid w) = \\dfrac{(1 - \\lambda)\\, p(w \\mid \\theta)}{(1 - \\lambda)\\, p(w \\mid \\theta) + \\lambda\\, p(w \\mid \\theta_B)}$.
- **M-step**: $p(w \\mid \\theta) = \\dfrac{c(w, d)\\, p(z = \\theta \\mid w)}{\\sum_{w'} c(w', d)\\, p(z = \\theta \\mid w')}$.

This is the same algorithm you used for pseudo-relevance feedback, where "the document" was the set of feedback documents.

**Why it works.** Jensen's inequality shows that the expected complete-data log-likelihood under the E-step posteriors is a lower bound on $\\log p(d)$ that touches it at the current parameters. The M-step maximises that bound, so the likelihood **never decreases**. In MP 2 the log-likelihood of PLSA on 2,013 newsgroup posts rises from about $-1{,}667{,}900$ to $-1{,}550{,}900$ over 100 iterations, with every single step an increase. Check this in your own code: a decrease is always a bug. EM is a hill climber, though, so with several topics it can stop at a **local** maximum. Run it from several random starts and keep the run with the highest likelihood.

Each iteration costs $O(\\text{number of distinct words in } d)$ here, and $O(\\text{nonzeros} \\times K)$ for the $K$-topic model of the next lesson. Stop when the relative change in log-likelihood falls below, say, $10^{-6}$.

A pitfall: $\\lambda$ is a choice, not a learned value. A larger $\\lambda$ makes the background explain more, leaving a topic of more specific, more discriminative words.

Watch the Coursera lectures on mining one topic, mixture models and EM, then read Zhai's EM note, which derives exactly this case.`,
          resources: [
            TMA('Weeks 2 and 3: "Topic Mining and Analysis: Mining One Topic", "Probabilistic Topic Models: Mixture of Unigram Language Models", "Mixture Model Estimation" and "Expectation-Maximization Algorithm" parts 1 to 3.'),
            { title: 'A note on the Expectation-Maximization (EM) algorithm', url: 'https://czhai.cs.illinois.edu/pub/em-note.pdf', type: 'article', cost: 'free', provider: 'ChengXiang Zhai', note: 'Derives EM for a mixture with a fixed background model and proves that the likelihood cannot decrease.', primary: true },
            TDMA('Chapter 17 (topic analysis), the sections on mixture models and EM.'),
          ],
          relatedLessons: ['machine-learning/unsupervised-learning/gaussian-mixtures-and-em', 'probability-statistics/estimation-and-confidence/maximum-likelihood-estimation'],
          exercises: [
            {
              slug: 'em-one-topic',
              title: 'Mine one topic from a Cranfield document',
              prompt:
                'Take Cranfield document 1 (stop words kept). Estimate the background from all 1,400 documents. Fit the two-component mixture with $\\lambda = 0.5$ and $\\lambda = 0.9$ by EM, starting from the maximum likelihood estimate, until the relative change in log-likelihood is below $10^{-8}$. Print the top 10 words of the maximum likelihood estimate and of each fitted topic, and assert that the log-likelihood never decreases. Explain how $\\lambda$ changed the topic.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'em-lower-bound',
              title: 'Prove that EM is monotone',
              prompt:
                'For the mixture in the lesson, write the complete-data log-likelihood and its expectation $Q(\\theta; \\theta^{(n)})$ under the E-step posteriors. Use Jensen\'s inequality to show $\\log p(d \\mid \\theta) \\ge Q(\\theta; \\theta^{(n)}) + H$, where $H$ is the entropy of the posteriors, with equality at $\\theta = \\theta^{(n)}$. Conclude that maximising $Q$ cannot decrease the likelihood, and derive the M-step from $Q$ with a Lagrange multiplier.',
              kind: 'derivation',
              difficulty: 3,
            },
            {
              slug: 'em-iteration-by-hand',
              title: 'One EM iteration by hand',
              prompt:
                'A document has counts text 4, mining 2, the 6. The background is $p(\\text{text} \\mid B) = 0.001$, $p(\\text{mining} \\mid B) = 0.0005$, $p(\\text{the} \\mid B) = 0.2$, and $\\lambda = 0.5$. Start from $p(w \\mid \\theta) = 1/3$ for each word. Compute the E-step posteriors and the M-step topic, then the log-likelihood before and after, and check it increased. Which word lost the most probability, and why?',
              kind: 'problem',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does the maximum likelihood topic of a single document consist of function words?',
              answerOutline: 'A single distribution must explain all words, and function words are the most frequent, so the estimate that maximises the likelihood gives them the highest probability.',
            },
            {
              question: 'What does the E-step compute in the background mixture model?',
              answerOutline: 'For each word, the posterior probability that its occurrences were generated by the topic rather than the background, given the current topic estimate.',
            },
            {
              question: 'Why should EM be run from several starting points?',
              answerOutline: 'It is guaranteed only not to decrease the likelihood, so it converges to a local maximum; different starts can reach different maxima, and the best likelihood is kept.',
            },
          ],
          quiz: [
            {
              question: 'With $\\lambda = 0.5$, a word has $p(w \\mid \\theta) = 0.02$ and $p(w \\mid \\theta_B) = 0.06$. In the E-step, what is the probability that an occurrence came from the topic?',
              options: ['0.75', '0.25', '0.333', '0.04'],
              answer: 1,
              explanation:
                '$0.5 \\times 0.02/(0.5 \\times 0.02 + 0.5 \\times 0.06) = 0.01/0.04 = 0.25$. 0.75 is the background\'s share. With equal mixing weights the answer is just $0.02/(0.02 + 0.06)$.',
            },
            {
              question: 'Your EM implementation prints the log-likelihood each iteration and it falls between iterations 7 and 8. What should you conclude?',
              options: [
                'The model has started to overfit, so stop early',
                'EM has reached a local maximum',
                'There is a bug: EM never decreases the likelihood',
                'The background weight is too small',
              ],
              answer: 2,
              explanation:
                'Each EM iteration is guaranteed not to decrease the likelihood, so a fall means the E-step or M-step is wrong, or the log-likelihood is computed with different parameters than the ones being updated. At a local maximum the likelihood stops changing; it does not fall.',
            },
            {
              question: 'You raise the background weight $\\lambda$ from 0.5 to 0.95 and refit. How does the mined topic change?',
              options: [
                'It becomes closer to the background distribution',
                'It is unchanged, because $\\lambda$ cancels in the M-step',
                'Common words gain probability in the topic',
                'It concentrates on words that are much more frequent in the document than in the background',
              ],
              answer: 3,
              explanation:
                'With a large $\\lambda$ the background can explain any word it gives reasonable probability to, so the topic only has to account for the excess of distinctive words. The topic becomes more specific and discriminative. $\\lambda$ enters the E-step, so it does not cancel.',
            },
          ],
        },
        {
          slug: 'plsa-and-the-em-algorithm',
          title: 'PLSA: many topics fitted with EM',
          summary:
            'Probabilistic latent semantic analysis models every document as a mixture of K shared topics plus a background. EM estimates the topics and each document\'s topic coverage together.',
          estimatedMinutes: 160,
          objectives: [
            'Write the PLSA generative model with a background component',
            'Write the E-step and M-step updates for topic coverage and topic word distributions',
            'Count the parameters of PLSA and explain the risk of overfitting',
            'Implement PLSA efficiently over a sparse document-term matrix',
            'Evaluate topics against labels and across random restarts',
          ],
          concepts: [
            'Probabilistic latent semantic analysis (PLSA)',
            'Topic coverage pi_d',
            'Topic word distributions theta_j',
            'Background component',
            'Posterior over topics for each word in each document',
            'Sparse EM implementation',
            'Local maxima and restarts',
            'Normalised mutual information against labels',
          ],
          explanation: `**PLSA** (Hofmann, 1999) generalises the one-topic mixture to a collection. There are $K$ topics $\\theta_1, \\dots, \\theta_K$ shared by all documents, and each document $d$ has its own **coverage** $\\pi_{d,1}, \\dots, \\pi_{d,K}$, which sum to 1. Each word in $d$ is drawn from the background with probability $\\lambda_B$, and otherwise a topic $j$ is chosen with probability $\\pi_{d,j}$ and the word drawn from $\\theta_j$:

$$p(w \\mid d) = \\lambda_B\\, p(w \\mid B) + (1 - \\lambda_B) \\sum_{j=1}^{K} \\pi_{d,j}\\, p(w \\mid \\theta_j).$$

The output is two sets of distributions: what each topic is about, and how much of each document each topic covers.

**EM for PLSA.** For every word $w$ in every document $d$:

- **E-step**: the topic posterior $p(z_{d,w} = j) = \\dfrac{\\pi_{d,j}\\, p(w \\mid \\theta_j)}{\\sum_{j'} \\pi_{d,j'}\\, p(w \\mid \\theta_{j'})}$, and the background posterior $p(z_{d,w} = B) = \\dfrac{\\lambda_B\\, p(w \\mid B)}{\\lambda_B\\, p(w \\mid B) + (1 - \\lambda_B)\\sum_{j} \\pi_{d,j}\\, p(w \\mid \\theta_j)}$.
- **M-step**: with the credited count $n_{d,w,j} = c(w, d)\\,(1 - p(z_{d,w} = B))\\,p(z_{d,w} = j)$, set $\\pi_{d,j} \\propto \\sum_w n_{d,w,j}$ and $p(w \\mid \\theta_j) \\propto \\sum_d n_{d,w,j}$.

**Worked E-step.** A document covers two topics with $\\pi = (0.7, 0.3)$. For a word with $p(w \\mid \\theta_1) = 0.01$, $p(w \\mid \\theta_2) = 0.04$ and $p(w \\mid B) = 0.02$, with $\\lambda_B = 0.5$: the topic mixture gives $0.7 \\times 0.01 + 0.3 \\times 0.04 = 0.019$, so the background posterior is $0.01/(0.01 + 0.0095) = 0.513$, and between the topics the word goes 0.368 to topic 1 and 0.632 to topic 2. Topic 2 claims it despite its smaller coverage, because it gives the word four times the probability.

**Implementation.** Loop only over the nonzero entries of the document-term matrix. One iteration then costs $O(\\text{nnz} \\times K)$, and with NumPy and \`np.add.at\` it takes well under a second for a few thousand documents.

**Results on real data.** In the reference run for MP 2 (2,013 posts from four newsgroups, 6,254 words, $K = 4$, 100 iterations), PLSA **without** a background merged space and graphics into one topic ("space image edu data nasa graphics") and split the Middle East group into two. Normalised mutual information between each post's top topic and its newsgroup was 0.545. With $\\lambda_B = 0.5$, the four topics matched the four groups (space nasa launch orbit; image graphics jpeg; team game hockey; armenian israel turkish) and NMI rose to 0.757. Across five random seeds NMI ranged from 0.53 to 0.76, and the seed with the highest log-likelihood was also the best, which is why you keep the best of several restarts.

**Limits.** PLSA has $K(V - 1) + N(K - 1)$ free parameters. With 1,000 documents, 5,000 words and 10 topics that is 58,990, and it grows with the collection, so it can overfit. It also has no way to assign a topic coverage to a new document without refitting. LDA, next, addresses both.

Read Hofmann's paper (Sections 3 and 4), then watch the Coursera PLSA lectures.`,
          resources: [
            { title: 'Probabilistic Latent Semantic Analysis', url: 'https://arxiv.org/abs/1301.6705', type: 'article', cost: 'free', provider: 'Thomas Hofmann (UAI 1999, on arXiv)', note: 'The original paper. Sections 3 and 4 give the aspect model and its EM algorithm (with tempering, which you can skip).', primary: true },
            TMA('Week 3: "Probabilistic Latent Semantic Analysis (PLSA)" parts 1 and 2.'),
            { title: 'The 20 Newsgroups text dataset', url: 'https://scikit-learn.org/stable/datasets/real_world.html#newsgroups-dataset', type: 'dataset', cost: 'free', provider: 'scikit-learn', note: 'How to load the posts with headers, footers and quotes removed, which matters for honest topic and classification results.' },
          ],
          exercises: [
            {
              slug: 'plsa-estep-by-hand',
              title: 'A PLSA E-step and M-step by hand',
              prompt:
                'A two-document, three-word collection: $d_1$ = (ball 3, goal 2, vote 0), $d_2$ = (ball 0, goal 1, vote 4). With $K = 2$, no background, $\\pi_{d_1} = (0.6, 0.4)$, $\\pi_{d_2} = (0.5, 0.5)$, $\\theta_1 = (0.5, 0.4, 0.1)$ and $\\theta_2 = (0.1, 0.3, 0.6)$ over (ball, goal, vote), compute the E-step posteriors for every nonzero (document, word) pair, then the M-step $\\pi$ and $\\theta$. Compute the log-likelihood before and after, and check it rose.',
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'plsa-numpy',
              title: 'Implement sparse PLSA',
              prompt:
                'Implement PLSA with a background over a `scipy.sparse` count matrix, looping over nonzeros with NumPy arrays (no Python loop over words). On the four-newsgroup collection of MP 2 ($K = 4$, 100 iterations, seed 0) assert that the log-likelihood never decreases, print each topic\'s top 8 words, and report NMI between each post\'s most probable topic and its group for $\\lambda_B = 0$ and $0.5$ (expected about 0.55 and 0.76). Report seconds per iteration.',
              kind: 'coding',
              difficulty: 3,
              hint: 'Guard the division in the E-step: if every topic gives a word probability zero, the posterior is undefined. Use np.divide with a where argument.',
            },
            {
              slug: 'plsa-k-sweep',
              title: 'How many topics?',
              prompt:
                'Fit PLSA with $\\lambda_B = 0.5$ for $K = 2, 4, 8, 16$ on the four-newsgroup collection, five seeds each. Plot the final log-likelihood against $K$ and the spread over seeds. Show the topics for $K = 8$ and say which split a newsgroup into sensible sub-topics and which look like noise. Explain why the training log-likelihood cannot be used alone to choose $K$.',
              kind: 'data-analysis',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What two kinds of distribution does PLSA estimate?',
              answerOutline: 'K topic word distributions p(w|theta_j) shared by the collection, and for each document a topic coverage distribution pi_d over the K topics.',
            },
            {
              question: 'Why does adding a background component change the topics so much?',
              answerOutline: 'Without it, common words must be explained by the topics, which pulls topics towards general vocabulary and can merge distinct themes; the background absorbs them so topics capture distinctive words.',
            },
            {
              question: 'Name two weaknesses of PLSA that LDA addresses.',
              answerOutline: 'The number of parameters grows with the number of documents (overfitting), and there is no generative model for the coverage of a new document.',
            },
          ],
          quiz: [
            {
              question: 'A PLSA model has $N = 1{,}000$ documents, a vocabulary of $V = 5{,}000$ and $K = 10$ topics. How many probabilities does it store in its topic word distributions and topic coverages together?',
              options: ['60,000', '5,010,000', '50,000', '15,000'],
              answer: 0,
              explanation:
                'The topics hold $K \\times V = 50{,}000$ probabilities and the coverages $N \\times K = 10{,}000$, so 60,000 in total, of which $K(V-1) + N(K-1) = 58{,}990$ are free. 50,000 forgets the coverages. 5,010,000 multiplies $N$ by $V$, which is the size of the data, not of the model.',
            },
            {
              question: 'A document has coverage $\\pi = (0.8, 0.2)$. For word $w$, $p(w \\mid \\theta_1) = 0.01$ and $p(w \\mid \\theta_2) = 0.08$. Ignoring the background, what is the E-step probability that $w$ came from topic 2?',
              options: ['0.2', '0.889', '0.8', '0.667'],
              answer: 3,
              explanation:
                '$0.2 \\times 0.08/(0.8 \\times 0.01 + 0.2 \\times 0.08) = 0.016/0.024 = 0.667$. The coverage alone (0.2) ignores how strongly each topic predicts the word. 0.889 ignores the coverage and uses only $0.08/(0.01 + 0.08)$.',
            },
            {
              question: 'Five PLSA runs from different random seeds reach different log-likelihoods and different topics. Which run should you report?',
              options: [
                'The one whose topics look most sensible to you',
                'The one with the highest log-likelihood, while saying how much the results varied',
                'The first run, because later seeds are biased',
                'An average of the topic distributions of all five runs',
              ],
              answer: 1,
              explanation:
                'Each run is a local maximum, and the highest likelihood is the best fit by the model\'s own criterion. Report the spread across seeds too. Choosing by eye invites confirmation bias. Averaging topics fails because topic 1 in one run need not correspond to topic 1 in another.',
            },
            {
              question: 'In the MP 2 reference run, PLSA without a background merged the space and graphics newsgroups into one topic, and with $\\lambda_B = 0.5$ it separated them. What is the most likely reason?',
              options: [
                'The background made EM converge faster',
                'Both groups use the word "edu"',
                'Without the background, shared general words such as "edu", "data" and "use" had to be explained by topics, which pulled the two groups together',
                'The background added more topics',
              ],
              answer: 2,
              explanation:
                'Words common across posts (email domains, "data", "program") carry no group information but have high counts. Without a background, a topic has to absorb them, and two technical groups that share them can end up in one topic. With the background absorbing them, the topics can specialise. The number of topics stayed at 4.',
            },
          ],
        },
        {
          slug: 'latent-dirichlet-allocation',
          title: 'Latent Dirichlet allocation',
          summary:
            'LDA puts Dirichlet priors on topic coverage and on topics, which regularises PLSA and gives a generative model for new documents. It is fitted by variational inference or Gibbs sampling, and its topics must be evaluated with care.',
          estimatedMinutes: 150,
          objectives: [
            'Write the LDA generative process and the role of its Dirichlet priors',
            'Compute a collapsed Gibbs sampling probability by hand',
            'Explain how alpha and beta shape document coverage and topics',
            'Fit LDA with scikit-learn or gensim and inspect the topics',
            'Evaluate topic models with held-out perplexity, coherence and human checks',
          ],
          concepts: [
            'Latent Dirichlet allocation (LDA)',
            'Dirichlet distribution',
            'Document-topic prior alpha',
            'Topic-word prior beta (eta)',
            'Collapsed Gibbs sampling',
            'Variational inference',
            'Perplexity and topic coherence',
            'Choosing the number of topics',
          ],
          explanation: `**LDA** (Blei, Ng and Jordan, 2003) makes PLSA fully generative. A **Dirichlet** distribution is a distribution over probability vectors, and LDA draws both topic coverages and topics from Dirichlets:

1. For each topic $j$, draw a word distribution $\\theta_j$ from $\\text{Dir}(\\beta)$.
2. For each document $d$, draw a coverage $\\pi_d$ from $\\text{Dir}(\\alpha)$.
3. For each word position in $d$, draw a topic $z$ from $\\pi_d$, then a word $w$ from $\\theta_z$.

The priors are the difference from PLSA. A small $\\alpha$ (below 1) says each document is about a few topics, and a small $\\beta$ says each topic uses a fairly small set of words. The priors regularise the estimates, so the model overfits less, and a new document's coverage can be inferred under the same model. PLSA is close to LDA with uniform priors and point estimates.

The posterior over topics cannot be computed exactly, so it is approximated.

**Collapsed Gibbs sampling** integrates out $\\pi$ and $\\theta$ and resamples the topic of one word at a time given all the others:

$$p(z_i = j \\mid \\text{rest}) \\propto (n_{d,j} + \\alpha)\\,\\frac{n_{j,w} + \\beta}{n_j + V\\beta},$$

where the counts exclude word $i$: $n_{d,j}$ words in $d$ assigned to topic $j$, $n_{j,w}$ assignments of $w$ to $j$ across the collection, and $n_j$ all words assigned to $j$.

**Worked example.** A document has 3 other words in topic 1 and 1 in topic 2. The word "orbit" is assigned 8 times to topic 1 and once to topic 2, the topics hold 100 and 120 words, $V = 1{,}000$, $\\alpha = 0.1$ and $\\beta = 0.01$. Topic 1 gets $3.1 \\times 8.01/110 = 0.226$ and topic 2 gets $1.1 \\times 1.01/130 = 0.0085$, so after normalising the word goes to topic 1 with probability 0.964. Both the document's preference and the word's history agree.

**Variational inference**, used by scikit-learn's \`LatentDirichletAllocation\` and gensim's \`LdaModel\`, instead fits a simpler distribution by optimisation. It is faster and deterministic for a given seed. On the MP 2 collection, scikit-learn's LDA with $K = 4$ reached NMI 0.758 against the newsgroups, the same as the best PLSA run with a background. On clean data with few topics the two often agree, and LDA's advantages show on new documents and noisier data.

**Evaluating topics** is hard, because there is no ground truth.

- **Held-out perplexity**, $\\exp(-L/n)$ where $L$ is the log-likelihood of $n$ held-out words, measures prediction, but Chang and colleagues ("Reading Tea Leaves", 2009) found that lower perplexity can come with topics that people find less coherent.
- **Coherence** scores, such as NPMI between a topic's top words in a reference corpus, track human judgements better.
- **Human checks**, such as word intrusion (spot the odd word added to a topic's top words), are the most direct.

Choose $K$ with these, and with the purpose of the analysis in mind. Topics are a lens on the data, not a discovery of its true structure.

Read Blei's 2012 review in Communications of the ACM, then the gensim LDA documentation.`,
          resources: [
            { title: 'Probabilistic Topic Models', url: 'https://www.cs.columbia.edu/~blei/papers/Blei2012.pdf', type: 'article', cost: 'free', provider: 'David Blei (Communications of the ACM, 2012)', note: 'An eight-page introduction to LDA, its inference and its extensions. Read all of it.', primary: true },
            { title: 'Latent Dirichlet Allocation', url: 'https://www.jmlr.org/papers/volume3/blei03a/blei03a.pdf', type: 'article', cost: 'free', provider: 'Blei, Ng and Jordan (JMLR, 2003)', note: 'The original paper. Sections 3 and 4 (the model and its relation to PLSA) are the most useful.' },
            { title: 'gensim LdaModel', url: 'https://radimrehurek.com/gensim/models/ldamodel.html', type: 'documentation', cost: 'free', provider: 'gensim', note: 'Online variational LDA with alpha and eta options and coherence evaluation through CoherenceModel.' },
          ],
          relatedLessons: ['probability-statistics/bayesian-inference-and-mcmc/mcmc-sampling', 'probability-statistics/bayesian-inference-and-mcmc/bayesian-updating-and-priors'],
          exercises: [
            {
              slug: 'gibbs-by-hand',
              title: 'A Gibbs sampling step by hand',
              prompt:
                'Recompute the worked example, then change $\\alpha$ to 1 and recompute the probability of topic 1 (expected about 0.949). Then suppose the document instead has 0 words in topic 1 and 4 in topic 2, with everything else as in the example and $\\alpha = 0.1$: compute the probability of topic 1 and explain the tug of war between the document and the word.',
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'lda-vs-plsa',
              title: 'LDA against your PLSA',
              prompt:
                'Fit scikit-learn `LatentDirichletAllocation(n_components=4, learning_method="batch", max_iter=50, random_state=0)` on the MP 2 collection, and gensim `LdaModel` with `num_topics=4` and `alpha="auto"`. Report each one\'s top 8 words per topic, NMI against the newsgroups (expected about 0.76 for scikit-learn) and the UMass or c_v coherence from gensim\'s `CoherenceModel`. Compare with your PLSA from the previous lesson, and say what differs and what does not.',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'choose-k-lda',
              title: 'Choose K with held-out data',
              prompt:
                'Hold out 20% of the posts of all 20 newsgroups (headers, footers and quotes removed). Fit LDA for $K \\in \\{5, 10, 20, 40, 80\\}$ and report held-out perplexity and NPMI coherence of the top 10 words per topic. Run a word intrusion test on yourself for $K = 20$ and $K = 80$ (10 topics each, with an intruder from another topic inserted by a script you do not look at). Write which $K$ you would choose to summarise the collection for a newcomer, and why.',
              kind: 'data-analysis',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'What does a small alpha in LDA encode?',
              answerOutline: 'A prior belief that each document is about only a few topics, so coverage vectors are sparse.',
            },
            {
              question: 'Why can LDA give a topic coverage for a new document while PLSA cannot, without refitting?',
              answerOutline: 'LDA has a generative model (the Dirichlet prior) for coverage, so it can infer pi for a new document; PLSA\'s coverages are free parameters for training documents only.',
            },
            {
              question: 'Why is held-out perplexity not enough to choose a topic model?',
              answerOutline: 'It measures how well the model predicts words, which can improve while topics become less interpretable; coherence and human checks measure what an analyst needs.',
            },
          ],
          quiz: [
            {
              question: 'In collapsed Gibbs sampling, a document has 5 other words in topic A and 0 in topic B. The word has 2 assignments to A and 6 to B. The topics hold 200 and 200 words, $V = 500$, $\\alpha = 0.5$, $\\beta = 0.1$. What is the probability of topic A, to two decimals?',
              options: ['0.25', '0.91', '0.79', '0.50'],
              answer: 2,
              explanation:
                'Topic A: $(5 + 0.5)(2 + 0.1)/(200 + 50) = 11.55/250 = 0.0462$. Topic B: $(0 + 0.5)(6 + 0.1)/250 = 3.05/250 = 0.0122$. Normalising, $0.0462/0.0584 = 0.79$. The word prefers B, but the document strongly prefers A. 0.25 uses only the word counts, $2/8$.',
            },
            {
              question: 'What is the main modelling difference between LDA and PLSA?',
              options: [
                'LDA puts Dirichlet priors on topic coverage and topic word distributions; PLSA treats them as free parameters',
                'LDA uses a background model and PLSA does not',
                'LDA can only fit two topics',
                'PLSA is Bayesian and LDA is not',
              ],
              answer: 0,
              explanation:
                'Both are mixtures of topics over words. LDA adds Dirichlet priors and integrates over coverages, which regularises the model and makes it generative for new documents. A background component can be added to either model.',
            },
            {
              question: 'Model X has lower held-out perplexity than model Y, but analysts rate Y\'s topics as clearly more coherent. Which conclusion is sound?',
              options: [
                'X is better, because perplexity is the objective measure',
                'The perplexity computation must be wrong',
                'Prediction and interpretability can disagree, so choose by the purpose of the analysis, using coherence and human checks when topics are meant to be read',
                'Y must have more topics',
              ],
              answer: 2,
              explanation:
                'This is exactly what Chang and colleagues found: models that predict held-out words better do not always produce topics people find meaningful. When the topics are for reading, coherence and human judgement matter more. Nothing here says which model has more topics.',
            },
          ],
        },
      ],
    },
    {
      slug: 'text-clustering-and-categorisation',
      title: 'Text Clustering and Categorisation',
      description:
        'Grouping documents without labels (hierarchical and k-means clustering, mixture models) and assigning them to known categories (naive Bayes, logistic regression, linear SVMs, k-nearest neighbours), with evaluation that tells you what the numbers mean.',
      lessons: [
        {
          slug: 'similarity-based-clustering',
          title: 'Similarity-based clustering',
          summary:
            'Cluster documents by similarity: hierarchical agglomerative clustering merges the closest groups step by step, k-means alternates between assigning documents and moving centroids. Each has a cost and a failure mode on text.',
          estimatedMinutes: 140,
          objectives: [
            'Run hierarchical agglomerative clustering with single, complete and average link by hand',
            'Explain chaining and why linkage choice matters',
            'Run k-means with cosine similarity and explain its objective and local minima',
            'State the time and memory cost of each method',
            'Cluster a real collection and explain why reducing dimensions first can help',
          ],
          concepts: [
            'Clustering as an unsupervised task',
            'Hierarchical agglomerative clustering (HAC)',
            'Single, complete and average link',
            'Dendrogram',
            'Chaining',
            'k-means and spherical k-means',
            'Local minima and restarts',
            'Dimensionality reduction with SVD before clustering',
          ],
          explanation: `**Clustering** groups documents so that documents in a group are similar and documents in different groups are not, without any labels. It is used to explore a collection, organise search results, and find duplicate or near-duplicate groups. The result depends on the representation (TF-IDF vectors here), the similarity (cosine) and the algorithm.

**Hierarchical agglomerative clustering (HAC)** starts with every document as its own cluster and repeatedly merges the two most similar clusters, recording a **dendrogram**. The **linkage** defines the similarity of two clusters:

- **single link**: the most similar pair across them, which can chain long strings of loosely related documents into one cluster;
- **complete link**: the least similar pair, which favours compact clusters but is sensitive to outliers;
- **average link**: the mean over all pairs, usually a sensible compromise.

**Worked example.** Four documents have cosine similarities $s(A,B) = 0.9$, $s(C,D) = 0.8$, $s(A,C) = 0.3$, $s(A,D) = 0.1$, $s(B,C) = 0.4$ and $s(B,D) = 0.2$. HAC merges $\\{A,B\\}$ first, then $\\{C,D\\}$. The similarity of these two clusters is $0.4$ with single link, $0.1$ with complete link and $(0.3 + 0.1 + 0.4 + 0.2)/4 = 0.25$ with average link. HAC needs all pairwise similarities, $O(N^2)$ memory, and naive implementations take $O(N^3)$ time ($O(N^2 \\log N)$ with priority queues), so it suits thousands of documents, not millions.

**k-means** fixes $K$, picks $K$ centroids, assigns each document to its nearest centroid, recomputes each centroid as the mean of its documents, and repeats until nothing changes. With length-normalised vectors and cosine similarity this is **spherical k-means**. Each iteration costs $O(K \\times \\text{nnz})$. The objective (total distance to centroids) never increases, and like EM it stops at a **local minimum**, so run several starts and keep the best.

**On real text.** On 2,182 posts from four newsgroups with TF-IDF vectors, single-run k-means reached normalised mutual information with the true groups of 0.49 to 0.56 depending on the seed, and 0.60 as the best of 10 starts. HAC on the raw 6,818-dimensional vectors failed completely: every linkage put more than 2,100 documents in one cluster, because a few outlying posts stay apart until the very last merges. After reducing the vectors to 100 dimensions with truncated SVD (latent semantic analysis), average-link HAC reached NMI 0.47 and k-means 0.70. Sparse, high-dimensional text makes similarities noisy, and a low-rank projection removes much of that noise.

Read IIR Chapter 16 (k-means) and Chapter 17 (HAC), and the Coursera lectures on similarity-based clustering.`,
          resources: [
            IIR('Chapter 16, Flat clustering', 'Sections 16.1 to 16.4: uses of clustering, evaluation and k-means, including cluster cardinality.', true),
            IIR('Chapter 17, Hierarchical clustering', 'Sections 17.1 to 17.3: HAC with single, complete and group-average link, and chaining.'),
            TMA('Week 4: "Text Clustering: Motivation", "Similarity-based Approaches".'),
          ],
          relatedLessons: ['machine-learning/unsupervised-learning/k-means-and-clustering', 'modeling-and-learning/unsupervised-learning/hierarchical-clustering-and-mixture-models'],
          exercises: [
            {
              slug: 'hac-by-hand',
              title: 'HAC by hand',
              prompt:
                'Five documents have cosine similarities $s(1,2) = 0.9$, $s(1,3) = 0.5$, $s(1,4) = 0.1$, $s(1,5) = 0.2$, $s(2,3) = 0.6$, $s(2,4) = 0.2$, $s(2,5) = 0.1$, $s(3,4) = 0.3$, $s(3,5) = 0.4$, $s(4,5) = 0.7$. Run HAC with single and with complete link, writing the order of merges and the similarity at each merge. Draw both dendrograms and say where each would be cut to give two clusters.',
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'kmeans-20ng',
              title: 'k-means and HAC on four newsgroups',
              prompt:
                'Load the training posts of `comp.graphics`, `rec.sport.hockey`, `sci.space` and `talk.politics.mideast` (headers, footers and quotes removed). Vectorise with `TfidfVectorizer(stop_words="english", min_df=5, max_df=0.5, sublinear_tf=True)` and keep posts with at least 5 terms (2,182). Run `KMeans(4)` with three single seeds and with `n_init=10`, and HAC with all three linkages, on the raw vectors and after `TruncatedSVD(100)` plus normalisation. Report NMI and cluster sizes in one table, and explain the HAC failure on raw vectors.',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'spherical-kmeans',
              title: 'Implement spherical k-means',
              prompt:
                'Implement spherical k-means on a sparse, L2-normalised TF-IDF matrix: assign by maximum dot product with the normalised centroids, recompute centroids as normalised means, and stop when no assignment changes. Assert that the objective (sum of cosine similarities to the assigned centroid) never decreases. Print the 10 highest-weight terms of each centroid on the four-newsgroup data and compare your NMI with scikit-learn\'s `KMeans`.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What is chaining and which linkage suffers from it?',
              answerOutline: 'Single link merges clusters that have one close pair, so long chains of loosely related documents end up in one elongated cluster.',
            },
            {
              question: 'Why does k-means need several random restarts?',
              answerOutline: 'It only reaches a local minimum of its objective, which depends on the initial centroids; restarts and keeping the best objective reduce the risk of a poor solution.',
            },
            {
              question: 'Why can SVD before clustering improve results on text?',
              answerOutline: 'Sparse high-dimensional TF-IDF vectors give noisy similarities; a low-rank projection keeps the main co-occurrence structure, merges synonyms and reduces noise.',
            },
          ],
          quiz: [
            {
              question: 'After HAC has formed $\\{A, B\\}$ and $\\{C, D\\}$, with cross similarities $s(A,C) = 0.3$, $s(A,D) = 0.1$, $s(B,C) = 0.4$ and $s(B,D) = 0.2$, what is their average-link similarity?',
              options: ['0.4', '0.1', '0.3', '0.25'],
              answer: 3,
              explanation:
                'Average link takes the mean of the four cross pairs: $(0.3 + 0.1 + 0.4 + 0.2)/4 = 0.25$. 0.4 is single link (the most similar pair) and 0.1 is complete link (the least similar pair).',
            },
            {
              question: 'Three k-means runs on the same data end with objectives (total distance to centroids) of 2,116.6, 2,117.7 and 2,113.8. Which should you keep?',
              options: [
                'The first, since later runs are less reliable',
                'The run with 2,113.8, the lowest objective',
                'Any of them, since k-means always finds the global optimum',
                'Average the three clusterings',
              ],
              answer: 1,
              explanation:
                'k-means minimises the objective but stops at local minima, so the lowest of several runs is the best fit by its own criterion. That is what scikit-learn\'s `n_init` does. Cluster labels are arbitrary, so clusterings cannot simply be averaged.',
            },
            {
              question: 'HAC with single link on 2,000 newsgroup posts returns one cluster of 1,997 posts and three singletons. What is the most likely cause?',
              options: [
                'The posts all belong to one topic',
                'Cosine similarity cannot be used with HAC',
                'Chaining: single link joins clusters through any one close pair, while a few outliers stay separate until the last merges',
                'Too few clusters were requested',
              ],
              answer: 2,
              explanation:
                'Single link keeps merging through near neighbours, so the main mass of documents grows as one chain, and isolated outliers are left as the final clusters. Cosine works fine with HAC. Asking for more clusters would mostly just split off more outliers.',
            },
          ],
        },
        {
          slug: 'probabilistic-clustering-and-evaluation',
          title: 'Probabilistic clustering and evaluating clusters',
          summary:
            'A mixture of unigram models clusters documents by assuming each document comes from one topic, and EM fits it. Clusters are evaluated against labels with purity, NMI and the Rand index, or by the task they serve.',
          estimatedMinutes: 130,
          objectives: [
            'Write the mixture of unigrams model and contrast it with PLSA',
            'Write its EM updates and explain the underflow problem in the E-step',
            'Compute purity and explain why it can be gamed',
            'Interpret NMI and the adjusted Rand index',
            'Choose between internal, external and task-based evaluation',
          ],
          concepts: [
            'Mixture of unigrams (one topic per document)',
            'Cluster prior and cluster word distributions',
            'Document posterior over clusters',
            'Log-sum-exp for underflow',
            'Purity',
            'Normalised mutual information',
            'Rand index and adjusted Rand index',
            'Internal versus external evaluation',
          ],
          explanation: `PLSA lets every word in a document come from a different topic. For clustering we want each document in one group, so the **mixture of unigrams** generates a whole document from one topic: choose cluster $j$ with probability $\\pi_j$, then draw every word of the document from $\\theta_j$:

$$p(d) = \\sum_{j=1}^{K} \\pi_j \\prod_{w} p(w \\mid \\theta_j)^{c(w, d)}.$$

**EM** again. The E-step computes each document's posterior over clusters, $p(j \\mid d) \\propto \\pi_j \\prod_w p(w \\mid \\theta_j)^{c(w,d)}$. The M-step sets $\\pi_j$ to the average posterior and $p(w \\mid \\theta_j)$ to the posterior-weighted word counts, smoothed. The product over hundreds of words underflows to zero, so compute log-probabilities and normalise with the **log-sum-exp** trick: subtract the largest log value before exponentiating. With long documents the posteriors are nearly 0 or 1, so the method behaves much like k-means with a probabilistic distance.

**Evaluation against labels (external).** If you have category labels, compare.

- **Purity**: assign each cluster its most common class and count the fraction of documents that match. With clusters containing (8 sport, 2 politics), (1 sport, 6 politics, 3 tech) and (1 politics, 9 tech), purity is $(8 + 6 + 9)/30 = 0.767$. Purity is easy to game: putting every document in its own cluster gives purity 1.
- **Normalised mutual information** measures how much knowing the cluster tells you about the class, scaled to $[0, 1]$. It penalises many tiny clusters. On the four newsgroups, k-means reached 0.60 and PLSA with a background 0.76.
- The **Rand index** counts the pairs of documents on which clustering and labels agree (same or different group). The **adjusted** version corrects for chance, so a random clustering scores about 0.

**Internal** measures such as the silhouette score use no labels, only how tight and separated the clusters are. **Task-based** evaluation asks whether the clustering helps someone: do clustered search results let users find relevant documents faster?

A deeper caution: labels are one way to organise a collection, not the truth. A clustering that disagrees with the newsgroups may have found another real structure, such as questions against announcements. Low agreement with labels is a reason to look at the clusters, not necessarily to discard them.

Read IIR Section 16.3 on evaluation and Section 16.5 on model-based clustering, then the Coursera lectures on generative clustering and clustering evaluation.`,
          resources: [
            IIR('Chapter 16, Flat clustering', 'Section 16.3 (purity, NMI, Rand index, F measure) and Section 16.5 (model-based clustering with EM).', true),
            TMA('Week 4: "Text Clustering: Generative Probabilistic Models" parts 1 to 3, and "Evaluation of Text Clustering".'),
            { title: 'Clustering performance evaluation (scikit-learn)', url: 'https://scikit-learn.org/stable/modules/clustering.html#clustering-performance-evaluation', type: 'documentation', cost: 'free', provider: 'scikit-learn', note: 'Definitions, properties and code for the Rand index, NMI, homogeneity, completeness and silhouette.' },
          ],
          exercises: [
            {
              slug: 'purity-nmi-by-hand',
              title: 'Purity, NMI and Rand by hand',
              prompt:
                'For the three clusters in the lesson, compute purity (0.767), the Rand index over all $\\binom{30}{2}$ pairs, and NMI using natural logarithms. Then compute purity and NMI for a clustering that puts every document in its own cluster, and explain why NMI exposes it while purity does not. Check with `sklearn.metrics`.',
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'mixture-unigrams-em',
              title: 'Mixture of unigrams with EM',
              prompt:
                'Implement the mixture of unigrams with EM on the four-newsgroup count matrix (MP 2 vocabulary), with log-sum-exp in the E-step and add-0.01 smoothing in the M-step. Run 50 iterations from 5 seeds with $K = 4$. Assert the log-likelihood never decreases, report NMI and purity for the best run, and compare with k-means and with PLSA. Show the fraction of documents whose largest posterior exceeds 0.99.',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'cluster-search-results',
              title: 'Cluster search results',
              prompt:
                'For five Cranfield queries, take the top 50 BM25 results and cluster them into 4 groups with k-means on TF-IDF. Label each cluster with its top 5 centroid terms. For each query, report how the relevant documents are spread across clusters, and whether one cluster holds most of them. Write a paragraph on whether clustered result lists would help a user of this collection.',
              kind: 'data-analysis',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'How does the mixture of unigrams differ from PLSA?',
              answerOutline: 'Mixture of unigrams draws all words of a document from one cluster\'s distribution (one topic per document); PLSA draws each word from a document-specific mixture of topics.',
            },
            {
              question: 'Why does the E-step of the mixture of unigrams need log-sum-exp?',
              answerOutline: 'It multiplies hundreds of small probabilities, which underflow to zero; working in logs and subtracting the maximum before exponentiating keeps the normalisation stable.',
            },
            {
              question: 'Why is purity alone a poor criterion?',
              answerOutline: 'It rises with the number of clusters and reaches 1 with one document per cluster, so it rewards over-splitting.',
            },
          ],
          quiz: [
            {
              question: 'Three clusters contain (8 sport, 2 politics), (1 sport, 6 politics, 3 tech) and (1 politics, 9 tech). What is the purity?',
              options: ['0.767', '0.8', '0.667', '0.333'],
              answer: 0,
              explanation:
                'Take the majority class in each cluster: $8 + 6 + 9 = 23$ out of 30 documents, so purity is 0.767. 0.333 would be the purity of a random assignment to three classes. Purity counts majority members across all clusters, not one cluster alone.',
            },
            {
              question: 'What distinguishes the mixture of unigrams from PLSA as a clustering method?',
              options: [
                'The mixture of unigrams has no EM algorithm',
                'PLSA cannot be used on text',
                'The mixture of unigrams assigns each whole document to one topic, while PLSA lets each word choose a topic',
                'PLSA always produces exactly two topics',
              ],
              answer: 2,
              explanation:
                'In the mixture of unigrams the hidden variable is one choice per document, which is what clustering needs. In PLSA it is one choice per word, so documents mix topics. Both are fitted with EM.',
            },
            {
              question: 'A clustering of 1,000 documents into 1,000 singleton clusters is compared with 5 labelled classes. Which statement is true?',
              options: [
                'Purity is low and NMI is high',
                'Both purity and NMI are 1',
                'Both are near 0',
                'Purity is 1, but NMI is well below 1 because the clusters carry far more information than the classes need',
              ],
              answer: 3,
              explanation:
                'Every singleton is pure, so purity is 1. NMI normalises the mutual information by the entropies of both partitions, and the singleton partition has a huge entropy ($\\log 1000$), which pulls NMI down. This is exactly why NMI is preferred to purity.',
            },
          ],
        },
        {
          slug: 'naive-bayes-text-categorisation',
          title: 'Text categorisation with naive Bayes',
          summary:
            'Categorisation assigns documents to predefined classes from labelled examples. Multinomial naive Bayes applies Bayes\' rule with a class language model, smoothed with add-one counts, and is a fast, strong baseline.',
          estimatedMinutes: 140,
          objectives: [
            'State the categorisation task and how it differs from clustering',
            'Train multinomial naive Bayes with Laplace smoothing',
            'Classify a document by hand with log probabilities',
            'Explain the independence assumption and its effect on probability estimates',
            'Contrast the multinomial and Bernoulli event models',
          ],
          concepts: [
            'Supervised text categorisation',
            'Bayes\' rule for classes',
            'Multinomial naive Bayes',
            'Class-conditional unigram model',
            'Laplace (add-one) smoothing',
            'Conditional independence assumption',
            'Bernoulli event model',
            'Log-space classification',
          ],
          explanation: `**Text categorisation** assigns each document to one or more predefined classes (spam or not, a news section, a sentiment), learned from labelled examples. Unlike clustering the classes are given, and the job is to generalise to new documents.

**Naive Bayes** applies Bayes' rule. For a document $d$ with words $w_1, \\dots, w_n$,

$$P(c \\mid d) \\propto P(c) \\prod_{i=1}^{n} P(w_i \\mid c),$$

assuming that words are independent given the class. That is the "naive" part. Each class has its own unigram language model. The **multinomial** model estimates

$$P(w \\mid c) = \\frac{c(w, c) + 1}{\\sum_{w'} c(w', c) + |V|},$$

where $c(w, c)$ counts $w$ in the training documents of class $c$, and the $+1$ is **Laplace smoothing**, so an unseen word does not zero out a class (the same problem as in query likelihood). $P(c)$ is the fraction of training documents in class $c$.

**Worked example.** The vocabulary has $|V| = 8$ words. The sport documents contain 10 tokens with "goal" 3 times and "vote" never. The politics documents contain 12 tokens with "goal" never and "vote" 4 times. The priors are equal. Then $P(\\text{goal} \\mid \\text{sport}) = 4/18 = 0.222$, $P(\\text{vote} \\mid \\text{sport}) = 1/18 = 0.056$, $P(\\text{goal} \\mid \\text{pol}) = 1/20 = 0.05$ and $P(\\text{vote} \\mid \\text{pol}) = 5/20 = 0.25$. For the document "goal vote goal": sport gets $0.5 \\times 0.222^2 \\times 0.056 = 0.00137$ and politics $0.5 \\times 0.05^2 \\times 0.25 = 0.00031$. Normalising, $P(\\text{sport} \\mid d) = 0.81$. In practice you sum logarithms, because real documents underflow.

**Why it works despite the assumption.** Words are obviously not independent, so the probabilities come out badly calibrated, usually pushed close to 0 or 1. But classification only needs the right class to have the largest score, and that survives the errors surprisingly often. Training is a single counting pass, $O(\\text{tokens})$, and prediction is $O(\\text{document length} \\times \\text{classes})$.

The **Bernoulli** model instead uses binary presence of each vocabulary word, including absent ones. It ignores repetitions and suits short texts. The multinomial model is usually better for longer documents.

On the full 20 Newsgroups benchmark (11,314 training and 7,532 test posts, headers, footers and quotes removed), multinomial naive Bayes on word counts reaches about 65% accuracy, against 5% for guessing. The next lesson's discriminative models do a few points better.

Read IIR Chapter 13, Sections 13.1 to 13.3, then SLP Chapter 4.`,
          resources: [
            IIR('Chapter 13, Text classification and naive Bayes', 'Sections 13.1 to 13.4: the task, multinomial and Bernoulli models, and the independence assumption.', true),
            SLP('Chapter 4 (naive Bayes, text classification and sentiment): Laplace smoothing, log space and evaluation.'),
            { title: 'Naive Bayes (scikit-learn user guide)', url: 'https://scikit-learn.org/stable/modules/naive_bayes.html', type: 'documentation', cost: 'free', provider: 'scikit-learn', note: 'MultinomialNB, ComplementNB and BernoulliNB, with the smoothing parameter alpha.' },
          ],
          relatedLessons: ['machine-learning/classification-and-evaluation/generative-classifiers', 'probability-statistics/probability-foundations/bayes-theorem'],
          exercises: [
            {
              slug: 'nb-by-hand',
              title: 'Naive Bayes by hand',
              prompt:
                'Using the counts in the lesson, classify "vote vote goal" and "goal" (expected $P(\\text{sport} \\mid \\text{goal}) = 0.816$). Then change the priors to 0.2 for sport and 0.8 for politics and recompute both. Finally compute $P(\\text{goal} \\mid \\text{pol})$ without smoothing and explain what would happen to "goal vote goal".',
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'nb-from-scratch',
              title: 'Multinomial naive Bayes from scratch',
              prompt:
                'Implement multinomial naive Bayes with a smoothing parameter $\\alpha$ using sparse count matrices and log probabilities. On 20 Newsgroups (headers, footers and quotes removed, `CountVectorizer(stop_words="english", min_df=2)`), check that your predictions equal `MultinomialNB(alpha=1.0)` on every test post and report the accuracy (expected about 0.651). Then plot test accuracy for $\\alpha$ from 0.001 to 10 on a log scale, choosing $\\alpha$ by cross-validation on the training set.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'nb-calibration',
              title: 'How overconfident is naive Bayes?',
              prompt:
                'For your 20 Newsgroups model, plot a reliability diagram (10 bins of the top predicted probability against the observed accuracy in each bin) and report the share of test posts with a top probability above 0.99. Explain the result with the independence assumption, and say when the miscalibration would matter (for example, when a threshold on the probability decides whether a human checks the document).',
              kind: 'data-analysis',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does naive Bayes need smoothing?',
              answerOutline: 'A word never seen with a class in training would get P(w|c) = 0 and veto that class for any document containing it.',
            },
            {
              question: 'What does the naive independence assumption do to the predicted probabilities?',
              answerOutline: 'Correlated words are counted as independent evidence, so the posterior is pushed towards 0 or 1: badly calibrated, although the argmax is often still right.',
            },
            {
              question: 'How do the multinomial and Bernoulli models differ?',
              answerOutline: 'Multinomial models word counts (repeats matter, absent words ignored); Bernoulli models presence or absence of every vocabulary word (repeats ignored, absences count).',
            },
          ],
          quiz: [
            {
              question: 'A word never occurs in the 40 training tokens of class $c$, and the vocabulary has 60 words. With add-one smoothing, what is $P(w \\mid c)$?',
              options: ['0', '0.01', '0.025', '0.0167'],
              answer: 1,
              explanation:
                '$(0 + 1)/(40 + 60) = 0.01$. Without smoothing it would be 0. 0.025 forgets to add $|V|$ to the denominator, and 0.0167 forgets the class token count.',
            },
            {
              question: 'Priors are $P(A) = 0.6$ and $P(B) = 0.4$. $P(w_1 \\mid A) = 0.1$, $P(w_2 \\mid A) = 0.05$, $P(w_1 \\mid B) = 0.02$, $P(w_2 \\mid B) = 0.2$. What is $P(A \\mid \\text{"}w_1\\ w_2\\text{"})$?',
              options: ['0.6', '0.5', '0.348', '0.652'],
              answer: 3,
              explanation:
                'A: $0.6 \\times 0.1 \\times 0.05 = 0.003$. B: $0.4 \\times 0.02 \\times 0.2 = 0.0016$. So $P(A \\mid d) = 0.003/0.0046 = 0.652$. 0.348 is $P(B \\mid d)$, and 0.6 is the prior, before the words are seen.',
            },
            {
              question: 'A spam filter based on naive Bayes says "99.9% spam" for many emails that turn out to be legitimate. What best explains the extreme probabilities?',
              options: [
                'The independence assumption counts correlated words as separate evidence, pushing posteriors towards 0 or 1',
                'Laplace smoothing was used',
                'The prior for spam is too low',
                'The vocabulary is too small',
              ],
              answer: 0,
              explanation:
                'Words like "free", "offer" and "click" occur together, but naive Bayes multiplies them as if each were independent proof, so the posterior becomes overconfident. Smoothing moderates probabilities rather than causing extremes, and a low spam prior would push the other way.',
            },
            {
              question: 'A document says "refund" five times. How do the multinomial and Bernoulli naive Bayes models treat this?',
              options: [
                'Both count it five times',
                'Both count it once',
                'The multinomial model multiplies in $P(\\text{refund} \\mid c)$ five times; the Bernoulli model only records that "refund" is present',
                'The Bernoulli model counts it five times and the multinomial model once',
              ],
              answer: 2,
              explanation:
                'The multinomial event model generates every token, so repeats contribute repeatedly. The Bernoulli model has one binary variable per vocabulary word, so it sees only presence, and it also uses the absence of the other words as evidence.',
            },
          ],
        },
        {
          slug: 'discriminative-classifiers',
          title: 'Discriminative classifiers: logistic regression, SVMs and k-NN',
          summary:
            'Discriminative classifiers learn the decision boundary directly from features. Regularised logistic regression and linear SVMs on TF-IDF features are the standard strong baselines for text; k-nearest neighbours needs no training.',
          estimatedMinutes: 140,
          objectives: [
            'Contrast generative and discriminative classifiers',
            'Compute a logistic regression probability from weights and features',
            'Explain the role of regularisation with many sparse features',
            'Classify with k-nearest neighbours using an inverted index',
            'Compare classifiers fairly on a standard split',
          ],
          concepts: [
            'Generative versus discriminative models',
            'Logistic regression for text',
            'L2 and L1 regularisation',
            'Linear support vector machine',
            'k-nearest neighbours with cosine similarity',
            'TF-IDF and n-gram features',
            'One-versus-rest for many classes',
            'Inspecting feature weights',
          ],
          explanation: `Naive Bayes is **generative**: it models how each class produces words and inverts the model with Bayes' rule. **Discriminative** classifiers model $P(c \\mid d)$ or the decision boundary directly, and can use overlapping, correlated features without double-counting them.

**Logistic regression** gives the probability of the positive class as

$$P(y = 1 \\mid x) = \\sigma(w \\cdot x + b) = \\frac{1}{1 + e^{-(w \\cdot x + b)}},$$

where $x$ is the document's feature vector (TF-IDF values, n-gram indicators). If $w \\cdot x + b = 1.2$, the probability is $\\sigma(1.2) = 0.769$. Training maximises the log-likelihood of the labels minus a **regularisation** penalty, $\\lambda\\lVert w \\rVert_2^2$ (or $\\lVert w \\rVert_1$, which drives most weights to exactly zero). With tens of thousands of features and a few thousand documents, an unregularised model can fit the training set perfectly, so the penalty is essential, and its strength (scikit-learn's \`C\` $= 1/\\lambda$) is tuned by cross-validation. Many classes are handled with a softmax over class scores or with one-versus-rest. The weights are readable: on IMDb reviews the most negative unigram weights belong to worst, bad, waste and awful, and the most positive to great, excellent, perfect and best.

A **linear SVM** finds the hyperplane with the largest margin between classes, minimising a hinge loss plus an L2 penalty. On text the two often perform within a point of each other. The SVM gives scores rather than probabilities.

**k-nearest neighbours** stores the training documents and labels a new one by a vote among its $k$ most similar training documents (cosine on TF-IDF), optionally weighted by similarity. It needs no training and adapts to many small classes, but prediction scans the training set. Treating the new document as a query to an **inverted index** of the training set makes it a retrieval problem: exactly the scoring of Modules 2 and 3.

**On 20 Newsgroups** (same split and preprocessing as the last lesson), test accuracies in this course's reference runs were: multinomial naive Bayes 0.651, k-NN with $k = 10$ 0.638, logistic regression on sublinear TF-IDF 0.692, and a linear SVM 0.698. The ordering is typical, and the gaps are smaller than people expect. Removing headers, footers and quotes matters: with them, accuracies rise by more than 15 points, because the models learn email signatures instead of content.

**Fair comparison** means the same split, the same features, hyperparameters tuned only on training data, and a note on what each model costs to train and to apply.

Read IIR Chapter 14 (vector space classification, including k-NN) and Chapter 15 (SVMs), then the scikit-learn tutorial on working with text data.`,
          resources: [
            IIR('Chapter 14, Vector space classification', 'Sections 14.1 to 14.4: Rocchio classification, k-NN with an inverted index, and linear classifiers.', true),
            IIR('Chapter 15, Support vector machines and machine learning on documents', 'Sections 15.1 and 15.3: the linear SVM and the practical issues of features and class imbalance in text.'),
            { title: 'Classification of text documents using sparse features (scikit-learn example)', url: 'https://scikit-learn.org/stable/auto_examples/text/plot_document_classification_20newsgroups.html', type: 'documentation', cost: 'free', provider: 'scikit-learn', note: 'Benchmarks several linear classifiers and naive Bayes on 20 Newsgroups with headers removed, with timing and the most informative features.' },
          ],
          relatedLessons: ['machine-learning/linear-models/logistic-regression', 'machine-learning/trees-ensembles-and-kernels/svms-and-kernels', 'modeling-and-learning/trees-and-non-linear-models/k-nearest-neighbours'],
          exercises: [
            {
              slug: 'compare-classifiers',
              title: 'Four classifiers on 20 Newsgroups',
              prompt:
                'On 20 Newsgroups with headers, footers and quotes removed, train multinomial naive Bayes on counts and logistic regression, `LinearSVC` and `KNeighborsClassifier(10, metric="cosine")` on `TfidfVectorizer(stop_words="english", min_df=2, sublinear_tf=True)`. Tune `C` by 5-fold cross-validation on the training set. Report test accuracy, macro-F1, training time and prediction time in one table (expected accuracies about 0.65, 0.69, 0.70 and 0.64). Then repeat without removing headers, footers and quotes and explain the jump.',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'logistic-by-hand',
              title: 'Logistic regression by hand',
              prompt:
                'A spam model has bias $-2$ and weights 1.5 for "free", 0.8 for "offer", $-1.2$ for "meeting" on binary features. Compute the spam probability of an email containing "free" and "offer" (expected 0.574) and of one containing all three words. Then compute one gradient step on the log-loss for the first email labelled not spam, with learning rate 0.5 and no regularisation, and show the new weights.',
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'knn-with-index',
              title: 'k-NN as retrieval',
              prompt:
                'Reuse your inverted index from MP 1 to classify 20 Newsgroups test posts: treat each test post as a query (truncated to its 50 highest TF-IDF terms), retrieve the 10 most similar training posts by cosine, and vote weighted by similarity. Check that your accuracy is within one point of scikit-learn\'s k-NN, and compare the prediction time per post with a brute-force sparse matrix product.',
              kind: 'coding',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'What is the key difference between a generative and a discriminative classifier?',
              answerOutline: 'A generative classifier models P(d|c) and P(c) and applies Bayes\' rule; a discriminative one models P(c|d) or the decision boundary directly.',
            },
            {
              question: 'Why is regularisation essential for logistic regression on text?',
              answerOutline: 'There are far more features than documents, so the model can separate the training set perfectly with huge weights; the penalty controls complexity and improves generalisation.',
            },
            {
              question: 'How does an inverted index speed up k-NN classification?',
              answerOutline: 'Scoring only training documents that share terms with the new document, as in retrieval, avoids computing similarity with every training document.',
            },
          ],
          quiz: [
            {
              question: 'A logistic regression model gives a document the score $w \\cdot x + b = 1.2$. What is the predicted probability of the positive class?',
              options: ['0.231', '1.2', '0.769', '0.5'],
              answer: 2,
              explanation:
                '$\\sigma(1.2) = 1/(1 + e^{-1.2}) = 1/(1 + 0.301) = 0.769$. 0.231 is the probability of the negative class. The score itself, 1.2, is a log-odds, not a probability.',
            },
            {
              question: 'Which statement correctly contrasts naive Bayes with logistic regression?',
              options: [
                'Naive Bayes needs labelled data and logistic regression does not',
                'Naive Bayes models how each class generates words; logistic regression models the class given the features directly and can weigh correlated features jointly',
                'Logistic regression assumes words are independent given the class',
                'They always make the same predictions',
              ],
              answer: 1,
              explanation:
                'Naive Bayes is generative and assumes conditional independence, so correlated words are double-counted. Logistic regression is discriminative, and fitting the weights jointly accounts for correlations. Both are supervised.',
            },
            {
              question: 'A team reports 86% accuracy on 20 Newsgroups and you get 69% with the same model. Which difference most likely explains it?',
              options: [
                'They kept the headers, footers and quoted replies, which let the model identify groups from email addresses and signatures',
                'They used a linear SVM instead of logistic regression',
                'They used a different random seed',
                'They used stop word removal',
              ],
              answer: 0,
              explanation:
                'Headers name the newsgroup\'s regular posters and quoted replies repeat the thread, so a model can score highly without understanding the content. Removing them is the honest setting. Seeds and the choice between the two linear models change accuracy by about a point, not by seventeen.',
            },
          ],
        },
        {
          slug: 'categorisation-evaluation',
          title: 'Evaluating categorisation',
          summary:
            'Accuracy hides what happens to small classes. Per-class precision, recall and F, a confusion matrix, and the choice between micro- and macro-averaging say what a classifier actually does.',
          estimatedMinutes: 120,
          objectives: [
            'Build and read a confusion matrix',
            'Compute per-class precision, recall and F1',
            'Compute micro- and macro-averaged F1 and say when each fits',
            'Explain why micro-F1 equals accuracy for single-label problems',
            'Evaluate with cross-validation and report uncertainty',
          ],
          concepts: [
            'Confusion matrix',
            'Per-class precision, recall and F1',
            'Micro-averaging',
            'Macro-averaging',
            'Class imbalance',
            'Multi-label categorisation',
            'Cost-sensitive evaluation',
            'Confidence intervals for accuracy',
          ],
          explanation: `**Accuracy**, the fraction of documents classified correctly, is the first number everyone reports and often the least informative. With 95% of email legitimate, a classifier that never flags spam is 95% accurate.

A **confusion matrix** counts documents by true class (rows) and predicted class (columns). The diagonal holds the correct predictions and the off-diagonal cells show which classes are confused, often the most useful view of all. On 20 Newsgroups, most errors fall within families of related groups: guns against miscellaneous politics, the three religion groups, and the computer groups (Windows against PC hardware, graphics against the X Window System).

For each class, treat it as positive and the rest as negative: true positives TP, false positives FP and false negatives FN give **precision** $\\text{TP}/(\\text{TP} + \\text{FP})$, **recall** $\\text{TP}/(\\text{TP} + \\text{FN})$ and $F_1$.

**Averaging over classes.**

- **Macro-averaging** computes $F_1$ for each class and takes the plain mean. Every class counts equally, however small.
- **Micro-averaging** pools TP, FP and FN over all classes and then computes precision, recall and $F_1$. Every document counts equally, so large classes dominate.

**Worked example.** Three classes have (TP, FP, FN) = (90, 10, 10), (5, 5, 15) and (5, 10, 0). Their $F_1$ values are 0.900, 0.333 and 0.500, so macro-$F_1 = 0.578$. Pooled, TP = 100, FP = 25 and FN = 25, so micro-precision and micro-recall are both 0.8, and micro-$F_1 = 0.800$. The big class looks fine, and the small classes are poor. Macro-$F_1$ shows it and micro-$F_1$ hides it.

When each document has exactly one label and one prediction, every error is one FP for the predicted class and one FN for the true class, so pooled FP equals pooled FN, and micro-$F_1$ equals accuracy. In **multi-label** categorisation (a news story can be both business and politics) they differ.

**Which to report?** Use macro-averaging when every class matters equally, for example rare but important categories such as product safety complaints. Use micro-averaging when every document matters equally. Report both, with the confusion matrix. If errors have different costs, as with a missed fraud report against a false alarm, evaluate with those costs or choose an operating point on a precision-recall curve.

**Uncertainty.** A test accuracy of 0.69 on 7,532 posts has a standard error of about $\\sqrt{0.69 \\times 0.31/7532} = 0.005$, so differences of a few tenths of a point between classifiers are noise. Compare classifiers on the same test documents with a paired test (McNemar's test), the same idea as the paired tests of Module 3.

Read IIR Section 13.6 and the scikit-learn guide on classification metrics, then the Coursera lecture on evaluating categorisation.`,
          resources: [
            IIR('Chapter 13, Text classification and naive Bayes', 'Section 13.6: evaluation of text classification, micro- and macro-averaging, with the Reuters-21578 example.', true),
            { title: 'Metrics and scoring: classification metrics (scikit-learn)', url: 'https://scikit-learn.org/stable/modules/model_evaluation.html#classification-metrics', type: 'documentation', cost: 'free', provider: 'scikit-learn', note: 'Confusion matrices, classification_report, and the average argument (micro, macro, weighted, samples).' },
            TMA('Week 5: "Text Categorization: Evaluation" parts 1 and 2.'),
          ],
          relatedLessons: ['machine-learning/classification-and-evaluation/classification-metrics-and-curves', 'modeling-and-learning/classification/metrics-and-thresholds'],
          exercises: [
            {
              slug: 'micro-macro-by-hand',
              title: 'Micro and macro by hand',
              prompt:
                'Recompute the worked example. Then change the third class to (TP, FP, FN) = (0, 0, 5), a class the classifier never predicts, and recompute both averages. Explain why scikit-learn warns about an ill-defined precision in this case and what value it uses by default.',
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'confusion-20ng',
              title: 'Read a confusion matrix',
              prompt:
                'For your best 20 Newsgroups classifier, plot the 20 by 20 confusion matrix normalised by row. List the five most confused pairs of classes and read three misclassified posts from the worst pair. Report micro- and macro-$F_1$ and the three classes with the lowest $F_1$, and say whether the errors are the classifier\'s fault or the labels\'.',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'mcnemar',
              title: 'Is one classifier really better?',
              prompt:
                'For logistic regression and the linear SVM on 20 Newsgroups, count test posts that only the first gets right ($n_{10}$) and that only the second gets right ($n_{01}$). Compute McNemar\'s statistic $(|n_{01} - n_{10}| - 1)^2/(n_{01} + n_{10})$ and its p-value from the chi-squared distribution with 1 degree of freedom, and say whether the accuracy difference is significant. Compare with a bootstrap confidence interval for the difference.',
              kind: 'data-analysis',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What is the difference between micro- and macro-averaged F1?',
              answerOutline: 'Macro averages per-class F1 (each class equal); micro pools TP, FP and FN across classes before computing F1 (each document equal, large classes dominate).',
            },
            {
              question: 'Why does micro-F1 equal accuracy in single-label classification?',
              answerOutline: 'Each error is one false positive for the predicted class and one false negative for the true class, so pooled precision equals pooled recall equals accuracy.',
            },
            {
              question: 'Why is accuracy misleading with imbalanced classes?',
              answerOutline: 'Predicting the majority class gets high accuracy while missing every minority example; per-class recall or macro-F1 reveals it.',
            },
          ],
          quiz: [
            {
              question: 'Three classes have (TP, FP, FN) = (90, 10, 10), (5, 5, 15) and (5, 10, 0). What is the macro-averaged $F_1$?',
              options: ['0.800', '0.900', '0.333', '0.578'],
              answer: 3,
              explanation:
                'The per-class $F_1$ values are 0.900, 0.333 and 0.500, and their mean is 0.578. 0.800 is the micro-averaged $F_1$ from pooled counts, which the large first class dominates.',
            },
            {
              question: 'A hospital classifies incident reports into 12 categories. Two rare categories (under 1% of reports) concern patient deaths. Which summary measure fits best?',
              options: [
                'Macro-averaged $F_1$, with per-class recall for the rare categories',
                'Accuracy',
                'Micro-averaged $F_1$',
                'Precision of the largest class',
              ],
              answer: 0,
              explanation:
                'The rare classes matter most, and macro-averaging gives them the same weight as the common ones. Accuracy and micro-$F_1$ are dominated by the large categories and could look excellent while every death report is missed.',
            },
            {
              question: 'In a single-label, 20-class problem, a classifier has accuracy 0.69. What is its micro-averaged $F_1$?',
              options: ['It cannot be known without the confusion matrix', '0.69', '0.345', '0.95'],
              answer: 1,
              explanation:
                'With one true and one predicted label per document, every error adds one false positive and one false negative, so pooled precision and pooled recall both equal accuracy, and micro-$F_1 = 0.69$. Macro-$F_1$ would need the per-class counts.',
            },
          ],
        },
      ],
    },
    {
      slug: 'opinion-mining-and-text-based-prediction',
      title: 'Opinion Mining and Text-Based Prediction',
      description:
        'Mining what people think: sentiment classification, ordinal ratings and aspect-level opinions in reviews. Then text joined with its context (time, place, author) and used to predict variables in the world, with the pitfalls that come with it.',
      lessons: [
        {
          slug: 'sentiment-classification',
          title: 'Sentiment classification',
          summary:
            'An opinion has a holder, a target and a sentiment. Lexicons give a quick unsupervised baseline; supervised classifiers on n-grams do much better within a domain; ordinal regression predicts star ratings.',
          estimatedMinutes: 140,
          objectives: [
            'Describe an opinion by holder, target, content, context and sentiment',
            'Build a lexicon-based sentiment scorer and explain its failure modes',
            'Train a supervised sentiment classifier and choose features (n-grams, negation)',
            'Compute rating probabilities with ordinal logistic regression',
            'Compare methods honestly on a standard benchmark',
          ],
          concepts: [
            'Opinion holder, target and content',
            'Sentiment polarity and intensity',
            'Lexicon-based scoring (VADER)',
            'Supervised sentiment classification',
            'Negation handling and bigrams',
            'Domain dependence of sentiment words',
            'Ordinal logistic regression',
            'IMDb Large Movie Review dataset',
          ],
          explanation: `An **opinion** is a subjective statement: a **holder** (who), a **target** (about what, perhaps one aspect of it), the **content**, the **context** (when, where), and the **sentiment** it expresses, positive, negative or neutral, with an intensity. Opinion mining recovers these from text. This lesson covers the most common sub-task, classifying the sentiment of a whole document.

**Lexicons.** A sentiment lexicon assigns words a polarity ("excellent" +3.2, "awful" −2.5). Score a text by summing its words, with rules for negation ("not good"), intensifiers ("very") and contrast ("but"). VADER is a well-built example tuned for social media. Lexicons need no training data and are transparent, but they miss domain-specific words. On the IMDb benchmark (25,000 training and 25,000 test reviews, balanced), VADER's compound score with a threshold at 0 classified 69.9% of the test reviews correctly in this course's tests.

**Supervised classifiers.** Treat sentiment as categorisation (Module 6) with labelled reviews. In the same tests on IMDb, naive Bayes on binary unigram features reached 82.9%, logistic regression on sublinear TF-IDF unigrams 88.9%, and adding bigrams raised it to 90.5%. Bigrams capture "not good", "no plot" and "well worth". An older trick for negation is to prefix every word after "not", up to the next punctuation mark, with NOT_. The learned weights are domain-specific: "waste" and "boring" are strongly negative for films, and "unpredictable" is good in a thriller and bad in a car review. A classifier trained on films transfers poorly to other domains.

**Ratings are ordered.** Star ratings 1 to 5 are not five unrelated classes. **Ordinal logistic regression** uses one score $x \\cdot \\beta$ and $k - 1$ thresholds:

$$P(r \\ge j \\mid x) = \\sigma(\\alpha_j + x \\cdot \\beta), \\qquad j = 2, \\dots, k,$$

with $\\alpha_2 > \\alpha_3 > \\dots$ so that the probabilities decrease, and $P(r = j) = P(r \\ge j) - P(r \\ge j + 1)$. All levels share $\\beta$, so a word that pushes a review up pushes it up at every level, and the data are used efficiently.

**Worked example.** With $x \\cdot \\beta = 1.0$ and $\\alpha = (2.0, 0.5, -1.0, -2.5)$ for $j = 2$ to 5, the cumulative probabilities are $\\sigma(3) = 0.953$, $\\sigma(1.5) = 0.818$, $\\sigma(0) = 0.5$ and $\\sigma(-1.5) = 0.182$. So $P(r = 1, \\dots, 5) = (0.047, 0.135, 0.318, 0.318, 0.182)$.

**Pitfalls.** Sarcasm ("great, another sequel"), comparisons ("better than the first one, which was awful"), and mixed opinions about different aspects (next lesson) defeat document-level models. A review's text and its stars sometimes disagree, too, so the labels have noise.

Read SLP Chapter 4 and the Coursera lectures on opinion mining, then Pang and Lee's survey for the breadth of the field.`,
          resources: [
            TMA('Week 5: "Opinion Mining and Sentiment Analysis: Motivation", "Sentiment Classification" and "Ordinal Logistic Regression".'),
            { title: 'Large Movie Review Dataset (IMDb)', url: 'https://huggingface.co/datasets/stanfordnlp/imdb', type: 'dataset', cost: 'free', provider: 'Maas et al., Stanford (2011), Hugging Face mirror', note: '50,000 labelled reviews split evenly into training and test sets, as parquet files. The original tarball is at ai.stanford.edu/~amaas/data/sentiment.', primary: true },
            { title: 'VADER sentiment analysis', url: 'https://github.com/cjhutto/vaderSentiment', type: 'tool', cost: 'free', provider: 'C. J. Hutto and Eric Gilbert', note: 'A rule-based lexicon scorer. Read the README for how it handles negation, intensifiers and "but".' },
          ],
          relatedLessons: ['machine-learning/linear-models/logistic-regression'],
          exercises: [
            {
              slug: 'imdb-baselines',
              title: 'Three sentiment classifiers on IMDb',
              prompt:
                'Load IMDb (the original tarball or `stanfordnlp/imdb` parquet files) and replace `<br />` tags with spaces. Report test accuracy for: VADER compound score $\\ge 0$ as positive (expected about 0.70), multinomial naive Bayes on binary counts with `min_df=2` (about 0.83), and logistic regression with `C=4` on `TfidfVectorizer(min_df=2, sublinear_tf=True)` with unigrams (about 0.889) and with unigrams and bigrams (about 0.905). Print the 10 most positive and negative unigram weights and the 10 most negative bigrams.',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'negation-marking',
              title: 'Does negation marking help?',
              prompt:
                'Write a preprocessor that prefixes NOT_ to every token after "not", "no", "never" or a word ending in "n\'t", until the next punctuation mark. Train logistic regression on unigrams with and without it on IMDb and compare accuracy. Then find 5 test reviews whose prediction flipped and explain each. Say whether bigrams make negation marking unnecessary.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'ordinal-by-hand',
              title: 'Ordinal logistic regression by hand',
              prompt:
                'With thresholds $\\alpha = (2.0, 0.5, -1.0, -2.5)$, compute the five rating probabilities for $x \\cdot \\beta = -1$ and for $x \\cdot \\beta = 2.5$, and the expected rating in each case. Then explain why fitting five separate one-against-rest classifiers could give probabilities that are not ordered, and how the shared $\\beta$ prevents it.',
              kind: 'problem',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'Name the parts of an opinion.',
              answerOutline: 'Holder, target (entity or aspect), content, context (time, place), and sentiment (polarity and intensity).',
            },
            {
              question: 'Why does a supervised classifier beat a general lexicon on movie reviews?',
              answerOutline: 'It learns domain-specific sentiment words and phrases ("waste", "worth watching") and their weights from labelled data; a general lexicon misses or mis-weights them.',
            },
            {
              question: 'What does the shared weight vector in ordinal logistic regression achieve?',
              answerOutline: 'All rating thresholds use the same feature weights, so the cumulative probabilities stay ordered and every training example informs every level.',
            },
          ],
          quiz: [
            {
              question: 'An ordinal model has thresholds $\\alpha = (2.0, 0.5, -1.0, -2.5)$ for ratings $\\ge 2, \\ge 3, \\ge 4, \\ge 5$ and a review with $x \\cdot \\beta = 0.5$. What is $P(r = 4)$?',
              options: ['0.378', '0.119', '0.259', '0.5'],
              answer: 2,
              explanation:
                '$P(r \\ge 4) = \\sigma(-1.0 + 0.5) = \\sigma(-0.5) = 0.378$ and $P(r \\ge 5) = \\sigma(-2.5 + 0.5) = \\sigma(-2) = 0.119$. The difference is $P(r = 4) = 0.259$. 0.378 is the cumulative probability of 4 or more, not exactly 4.',
            },
            {
              question: 'A lexicon scorer rates "not bad at all, honestly" as negative. Which change addresses this directly?',
              options: [
                'Remove stop words before scoring',
                'Use a larger lexicon of positive words',
                'Stem the words',
                'Handle negation, for example by flipping or marking the polarity of words after "not", or by using bigram features',
              ],
              answer: 3,
              explanation:
                '"bad" carries negative polarity, and the negation that reverses it is lost when words are scored one by one. Negation rules or bigrams such as "not bad" fix it. Stop word lists often contain "not", so removing them makes the error worse.',
            },
            {
              question: 'On IMDb, logistic regression on TF-IDF unigrams scored 0.889 while the VADER lexicon scored about 0.70. What best explains the gap?',
              options: [
                'The classifier learned film-review-specific sentiment words and weights from 25,000 labelled reviews',
                'VADER cannot handle long texts at all',
                'Logistic regression always beats lexicons on every domain',
                'The test set leaked into VADER',
              ],
              answer: 0,
              explanation:
                'Supervised training on in-domain labels picks up words like "waste", "boring" and "worth" with weights tuned to films. A general-purpose lexicon has no such knowledge. The advantage depends on having labelled data from the same domain, so it is not universal.',
            },
          ],
        },
        {
          slug: 'aspect-opinions-and-latent-rating-analysis',
          title: 'Aspect-level opinions and latent rating analysis',
          summary:
            'Reviews praise some aspects and criticise others. Aspect-based opinion mining segments reviews by aspect, and latent aspect rating analysis infers each aspect\'s rating and how much each reviewer cares about it from the overall rating.',
          estimatedMinutes: 130,
          objectives: [
            'Explain why document-level sentiment hides aspect-level opinions',
            'Segment review sentences into aspects with seed words and bootstrapping',
            'Write the latent rating regression model and compute an overall rating from aspect ratings and weights',
            'Interpret aspect weights as reviewer preferences',
            'Name applications such as aspect-based summaries and personalised ranking',
          ],
          concepts: [
            'Aspect (feature) of an entity',
            'Aspect segmentation with seed words',
            'Bootstrapping aspect keywords with chi-squared',
            'Aspect ratings',
            'Aspect weights (reviewer emphasis)',
            'Latent rating regression',
            'Latent aspect rating analysis (LARA)',
            'Aspect-based opinion summary',
          ],
          explanation: `"The location was perfect but the room was tiny and the staff were rude" earns three stars, and the three stars hide three opinions. **Aspect-based** opinion mining finds the **aspects** (location, rooms, service, value) and the opinion about each.

**Step 1: segment by aspect.** Start with a few seed words per aspect (location: walk, beach, downtown; rooms: bed, bathroom, room). Assign each sentence to the aspect whose words it contains most. Then **bootstrap**: for each aspect, find the words most associated with its sentences, using the chi-squared statistic of a word against the aspect label, add the top ones to the seeds, and repeat. After a few rounds, "shuttle" joins location and "towel" joins rooms.

**Step 2: latent rating regression.** Wang, Lu and Zhai's **latent aspect rating analysis** (LARA, 2010) models a review $d$ with $k$ aspect segments. Each aspect gets a rating from the words in its segment, $s_{d,i} = \\sum_w \\beta_{i,w} W_{d,i,w}$, where $\\beta_{i,w}$ is the sentiment of word $w$ when it is used about aspect $i$ ("small" is negative for rooms and positive for a phone). The reviewer weighs aspects with weights $\\alpha_{d,i}$ that sum to 1, and the observed overall rating is modelled as

$$r_d \\sim \\mathcal{N}\\Big(\\sum_{i=1}^{k} \\alpha_{d,i}\\, s_{d,i},\\ \\delta^2\\Big).$$

Only $r_d$ is observed. Both the aspect ratings and the weights are **latent**, and they are inferred jointly, with the weights given a shared prior across reviewers so the problem is not underdetermined.

**Worked example.** A reviewer weighs location, rooms and service at 0.5, 0.3 and 0.2, and the aspect ratings inferred from the text are 4, 2 and 5. The expected overall rating is $0.5 \\times 4 + 0.3 \\times 2 + 0.2 \\times 5 = 3.6$. A second reviewer who writes the same sentences but weighs rooms at 0.6 would be predicted to give a lower overall rating. Conversely, two reviewers who give the same overall rating may care about quite different things.

**What it enables.**

- **Aspect summaries**: "location 4.6, rooms 2.9" from thousands of reviews, with representative sentences for each.
- **Personalised ranking**: a traveller who values location more can rank hotels by their own weights.
- **Understanding preferences**: comparing weights across groups, for example business against family travellers.

**Pitfalls.** Seed words must be chosen with care, because errors in segmentation propagate into the ratings. Sentences often mention several aspects. Implicit aspects ("I could hear everything" means the walls are thin) have no keyword at all.

Read the LARA paper (Sections 3 and 4) and watch the Coursera lectures on latent aspect rating analysis.`,
          resources: [
            TMA('Week 6: "Opinion Mining and Sentiment Analysis: Latent Aspect Rating Analysis" parts 1 and 2.'),
            { title: 'Latent Aspect Rating Analysis on Review Text Data: A Rating Regression Approach', url: 'https://dl.acm.org/doi/10.1145/1835804.1835903', type: 'article', cost: 'freemium', provider: 'Hongning Wang, Yue Lu and ChengXiang Zhai (KDD 2010)', note: 'The LARA paper. Sections 3 and 4 give aspect segmentation and the latent rating regression model; often free through the authors\' pages.', primary: true },
            { title: 'Opinion Mining and Sentiment Analysis', url: 'https://www.cs.cornell.edu/home/llee/opinion-mining-sentiment-analysis-survey.html', type: 'textbook', cost: 'free', provider: 'Bo Pang and Lillian Lee (Foundations and Trends in IR, 2008)', note: 'A survey of the field. Chapter 5 covers aspects (features) and summarisation of opinions.' },
          ],
          exercises: [
            {
              slug: 'lara-by-hand',
              title: 'Overall ratings from aspects',
              prompt:
                'Reviewer A weighs (location, rooms, service, value) at (0.4, 0.3, 0.2, 0.1) and reviewer B at (0.1, 0.2, 0.2, 0.5). A hotel\'s aspect ratings are (5, 3, 4, 2). Compute each reviewer\'s expected overall rating. Then find aspect ratings for a second hotel, with every rating between 1 and 5, that A rates higher than the first hotel and B rates lower, and explain what this means for ranking hotels by average stars.',
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'aspect-segmentation',
              title: 'Bootstrap aspect keywords',
              prompt:
                'Take a few thousand hotel or product reviews (for example the hotel reviews in the TripAdvisor data released by Hongning Wang, or any public review set you can download without logging in). Split them into sentences, start from 3 seed words for each of 4 aspects, and run 3 rounds of bootstrapping: score every word by chi-squared against each aspect\'s sentences and add the top 5 per aspect. Print the keyword lists after each round, label 50 random sentences by hand, and report the accuracy of the final segmentation.',
              kind: 'data-analysis',
              difficulty: 3,
            },
            {
              slug: 'aspect-sentiment-regression',
              title: 'Aspect-specific sentiment words',
              prompt:
                'Using your segmented sentences, fit one ridge regression per aspect from the bag of words of a review\'s segment for that aspect to the review\'s overall rating. Print the 10 most positive and negative words for each aspect, and find a word whose sign differs between two aspects. Explain why this regression is a simplification of LARA, and what LARA adds.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What is latent in latent aspect rating analysis?',
              answerOutline: 'The per-aspect ratings and each reviewer\'s aspect weights; only the overall rating and the text are observed.',
            },
            {
              question: 'Why must word sentiment depend on the aspect?',
              answerOutline: 'The same word can be positive for one aspect and negative for another ("small" for a phone versus a hotel room; "cheap" for price versus quality).',
            },
            {
              question: 'Name two applications of aspect-level ratings.',
              answerOutline: 'Aspect summaries of many reviews; personalised ranking of entities by a user\'s own aspect weights; studying preferences of different user groups.',
            },
          ],
          quiz: [
            {
              question: 'A reviewer weighs (location, rooms, service) at (0.6, 0.3, 0.1), and the inferred aspect ratings are (5, 2, 3). What overall rating does the latent rating regression predict?',
              options: ['3.33', '3.9', '3.0', '4.2'],
              answer: 1,
              explanation:
                '$0.6 \\times 5 + 0.3 \\times 2 + 0.1 \\times 3 = 3.0 + 0.6 + 0.3 = 3.9$. 3.33 is the unweighted mean of the aspect ratings, which ignores what this reviewer cares about.',
            },
            {
              question: 'Two reviewers both give a hotel 4 stars. LARA infers aspect weights of (0.7, 0.2, 0.1) for one and (0.1, 0.2, 0.7) for the other over (location, rooms, service). What does this tell you?',
              options: [
                'Their reviews must contain the same sentences',
                'One of the inferences must be wrong, since the ratings are equal',
                'They reached the same overall rating while caring about different things, so their texts carry different information',
                'The hotel has equal aspect ratings',
              ],
              answer: 2,
              explanation:
                'The overall rating is a weighted combination, and different weights and aspect ratings can give the same total. The first reviewer\'s 4 is mostly about location and the second\'s mostly about service. This hidden difference is exactly what LARA is meant to reveal.',
            },
            {
              question: 'Why does aspect segmentation bootstrap its keyword lists instead of using only the seed words?',
              options: [
                'Seed words are always wrong',
                'Bootstrapping removes the need for any seed words',
                'It makes the overall ratings observable',
                'A few seeds cover only some of the sentences about an aspect; adding words strongly associated with the aspect\'s sentences extends coverage',
              ],
              answer: 3,
              explanation:
                'People describe the same aspect in many ways ("shuttle" and "metro" for location). Starting from reliable seeds and adding words that the chi-squared test associates with those sentences grows each list. Bootstrapping still depends on good seeds, because errors can snowball.',
            },
          ],
        },
        {
          slug: 'text-based-prediction-and-contextual-mining',
          title: 'Text-based prediction and contextual text mining',
          summary:
            'Text is data about the world written by human sensors. Joined with its context (time, location, author, network) it reveals how topics change, and as features it can predict real-world variables, provided you guard against leakage and spurious correlation.',
          estimatedMinutes: 140,
          objectives: [
            'Explain the view of text as data produced by human sensors',
            'Describe contextual text mining: topics conditioned on time, location or author',
            'Compare topic coverage across contexts with normalised shares',
            'Design a text-based prediction task with features available at prediction time',
            'Identify leakage and spurious correlation in text-based prediction',
          ],
          concepts: [
            'Text as data from human sensors',
            'Non-text context: time, location, author, network',
            'Contextual topic models (contextual PLSA)',
            'Topic evolution over time',
            'Text-based prediction',
            'Features available at prediction time',
            'Leakage',
            'Causal topic mining and its limits',
          ],
          explanation: `People observe the world and write about it, so a large collection of text is a record of what many **human sensors** noticed. Two things follow. Text should be analysed together with its **context**, the non-text data attached to it, such as time, location, author, social network and the product or event it concerns. And text can help predict variables that are hard to observe directly.

**Contextual text mining.** Partition the collection by context and compare: which topics rise over time, which are discussed in which region, how two communities talk about the same event. **Contextual PLSA** (Mei and Zhai, 2006) makes the topic coverage, and even the topics' word distributions, depend on the context. Simple versions go a long way: fit topics once, then compute each topic's share of text per month or per region.

Always compare **shares, not counts**. If a "battery recall" topic appears in 60 of 1,500 posts in February and 400 of 2,000 in March, its share rose from 4% to 20%, a factor of 5, while the raw count rose by a factor of 6.7, partly because March simply had more posts.

**Text-based prediction.** Use features from text (words, topics, sentiment, embeddings) alone or with other variables to predict an outcome: a company's stock volatility from the risk sections of its annual reports (Kogan and colleagues, 2009), product sales from reviews, the spread of a disease from search queries or posts, election outcomes from news. Text often helps most combined with non-text features, and the right design question is what the text adds to a strong non-text baseline.

**Causal topic mining.** Kim and colleagues (2013) iterated between topic modelling and correlation with a time series, such as prediction-market prices during an election, to find topics whose shares move with the series, refining the topics with each round. This finds candidates for explanation. It does not establish causes.

**Pitfalls, which are many.**

- **Leakage**: features must be available at the moment of prediction. Posts written after the event, or text that describes the outcome, make any model look brilliant.
- **Spurious correlation**: with thousands of word features and a short time series, something will correlate by chance. Use held-out periods, simple models and a pre-registered evaluation.
- **Non-stationarity**: the population writing the text changes. Google Flu Trends famously overestimated influenza after working well for several years, because search behaviour and the model's inputs drifted.
- **Representativeness**: people who post are not everyone.

Read the Coursera lectures on text-based prediction and contextual text mining, then Kogan and colleagues' paper as a model of a careful design.`,
          resources: [
            TMA('Week 6: "Text-Based Prediction", "Contextual Text Mining: Motivation", "Contextual Probabilistic Latent Semantic Analysis", "Mining Topics with Social Network Context" and "Mining Causal Topics with Time Series Supervision".'),
            { title: 'Predicting Risk from Financial Reports with Regression', url: 'https://aclanthology.org/N09-1031/', type: 'article', cost: 'free', provider: 'Kogan, Levin, Routledge, Sagi and Smith (NAACL 2009)', note: 'Predicts stock volatility from the text of 10-K reports, beating a strong historical baseline. Read it for the experimental design: time-ordered splits and a non-text baseline.', primary: true },
            TDMA('Chapters 19 and 20 (joint analysis of text and structured data, and text-based prediction).'),
          ],
          relatedLessons: ['modeling-and-learning/interpretability-and-communication/correlation-versus-cause', 'machine-learning/ml-engineering/pipelines-and-leakage'],
          exercises: [
            {
              slug: 'topic-shares-over-time',
              title: 'Topic shares over time',
              prompt:
                'Download a dated text collection without a login, such as the arXiv metadata for one category from the arXiv API, or the State of the Union addresses from Project Gutenberg. Fit LDA with 15 topics, then plot each topic\'s share of tokens per year (or per address). Identify two rising and two falling topics, check each against the raw text, and note at least one apparent trend that is caused by a change in the collection itself rather than in the world.',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'prediction-with-baseline',
              title: 'Does text add to a baseline?',
              prompt:
                'Using the Amazon or Yelp review data of your choice (or the IMDb reviews with their 1 to 10 ratings recovered from the file names), predict the numeric rating with ridge regression from (a) the reviewer\'s average rating in earlier reviews only, (b) TF-IDF text features only, and (c) both. Split by time or by reviewer so that no information from the test period leaks. Report RMSE for each and explain what the text adds.',
              kind: 'data-analysis',
              difficulty: 3,
              hint: 'If your data has no time stamps, split by reviewer so that a reviewer\'s own text cannot reveal their test ratings.',
            },
            {
              slug: 'spurious-correlation',
              title: 'Manufacture a spurious correlation',
              prompt:
                'Generate a random walk of 40 monthly values with `default_rng(0)`. Using the 20 Newsgroups posts assigned at random to 40 "months", compute each of the 5,000 most frequent words\' monthly share and its correlation with the random walk. Report the largest absolute correlation and how many words exceed 0.5. Then explain how a held-out period and a correction for multiple comparisons would protect a real study.',
              kind: 'simulation',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What does it mean to treat people as sensors?',
              answerOutline: 'People observe the world and report in text, so text is noisy, subjective measurement of real-world variables that can be mined and used for prediction.',
            },
            {
              question: 'Why compare topic shares rather than counts across contexts?',
              answerOutline: 'The amount of text varies by context (more posts in one month or region), so raw counts confound topic interest with volume.',
            },
            {
              question: 'Give two ways a text-based prediction study can mislead.',
              answerOutline: 'Leakage from text written after the outcome; spurious correlation from many features and a short series; drift in who writes and how; unrepresentative writers.',
            },
          ],
          quiz: [
            {
              question: 'A topic appears in 60 of 1,500 posts in February and 400 of 2,000 posts in March. By what factor did its share of posts rise?',
              options: ['6.67', '5', '0.16', '1.33'],
              answer: 1,
              explanation:
                'The shares are $60/1{,}500 = 0.04$ and $400/2{,}000 = 0.20$, a factor of 5. 6.67 compares raw counts, which mixes in the growth in posting volume. 0.16 is the difference in shares, not the factor, and 1.33 is the growth in total posts.',
            },
            {
              question: 'A model predicts a film\'s opening-weekend revenue from tweets with 95% accuracy. On inspection, half the tweets were posted during the opening weekend. What is the main problem?',
              options: [
                'Leakage: the features include information that is not available when the prediction must be made',
                'Twitter users are not representative of all filmgoers',
                'The model should use topics instead of words',
                'Accuracy is the wrong measure for revenue',
              ],
              answer: 0,
              explanation:
                'Tweets written during the weekend already reflect how the film is doing, so they partly describe the outcome. A fair test uses only text available before the forecast date. Representativeness is a real concern too, but it is not what inflates this number.',
            },
            {
              question: 'What distinguishes contextual text mining from text-based prediction?',
              options: [
                'Contextual mining uses supervised learning and prediction does not',
                'They are the same task',
                'Prediction requires topic models and contextual mining does not',
                'Contextual mining describes how text content varies with its context; text-based prediction uses text as features to estimate an outcome variable',
              ],
              answer: 3,
              explanation:
                'Contextual mining asks how topics or opinions differ by time, place or author, which is descriptive. Text-based prediction targets a variable such as sales or volatility and is judged by its accuracy on held-out cases. Either can use topic models or supervised learning.',
            },
          ],
        },
      ],
    },
    {
      slug: 'neural-retrieval-beyond-the-classic-syllabus',
      title: 'Beyond the Classic Syllabus: Embeddings, Dense Retrieval and RAG',
      description:
        'A short look past the classic CS 410 syllabus at how learned representations change text systems: word embeddings, dense and neural retrieval, and retrieval-augmented generation. What changes, what does not, and how the evaluation methods of this course still decide what works.',
      lessons: [
        {
          slug: 'word-embeddings',
          title: 'Word embeddings',
          summary:
            'Word2vec and GloVe learn dense vectors in which words with similar contexts are close: a learned version of paradigmatic relations. Skip-gram with negative sampling implicitly factorises a matrix of shifted pointwise mutual information.',
          estimatedMinutes: 130,
          objectives: [
            'Explain how dense word vectors differ from sparse context vectors',
            'Write the skip-gram negative sampling objective and compute it for one example',
            'Relate skip-gram to pointwise mutual information and to paradigmatic relations',
            'Use pretrained embeddings for similarity and analogy, and recognise their limits',
            'Explain the polysemy and bias problems of static embeddings',
          ],
          concepts: [
            'Dense word vector (embedding)',
            'Distributional hypothesis',
            'Skip-gram with negative sampling (SGNS)',
            'Negative samples',
            'Implicit PMI factorisation',
            'Cosine similarity and analogies',
            'Polysemy in static embeddings',
            'Bias in embeddings',
          ],
          explanation: `This module goes beyond the classic CS 410 syllabus. The ideas are recent, and the course treats them as extensions of what you already know.

In Module 5, a word was represented by a sparse context vector with tens of thousands of dimensions. **Word embeddings** compress the same information into dense vectors of 100 to 300 numbers, learned so that words with similar contexts get similar vectors. "Cat" and "dog" end up close, which is a paradigmatic relation, learned rather than counted.

**Skip-gram with negative sampling** (word2vec, Mikolov and colleagues, 2013) slides a window over the text. For each word $w$ and each context word $c$ inside the window, it raises $\\sigma(v_w \\cdot u_c)$, and for $k$ random **negative** words $n$ drawn from a smoothed unigram distribution it lowers $\\sigma(v_w \\cdot u_n)$. The loss for one pair is

$$-\\log \\sigma(v_w \\cdot u_c) - \\sum_{i=1}^{k} \\log \\sigma(-v_w \\cdot u_{n_i}).$$

**Worked example.** With $v_w \\cdot u_c = 2$ for the true context and dot products 0.5 and 1 for two negatives, the loss is $-\\log\\sigma(2) - \\log\\sigma(-0.5) - \\log\\sigma(-1) = 0.127 + 0.974 + 1.313 = 2.414$. Most of it comes from the negatives, which the vector does not yet push away. Training is stochastic gradient descent over billions of such pairs.

**What it learns.** Levy and Goldberg (2014) showed that skip-gram with $k$ negatives implicitly factorises the matrix whose entries are $\\text{PMI}(w, c) - \\log k$: the pointwise mutual information of Module 5, shifted. **GloVe** factorises log co-occurrence counts directly. So embeddings are a compact, smoothed form of the co-occurrence statistics you computed by hand, and their quality depends on the same things: corpus size, domain and window. Small windows favour paradigmatic neighbours, and large windows topical ones.

**Using them.** Similarity is the cosine of two vectors. Analogies use vector offsets, so the nearest word to $v_\\text{king} - v_\\text{man} + v_\\text{woman}$, excluding the three input words, is usually "queen". In retrieval, embeddings can expand queries with paradigmatic neighbours, and averaged embeddings give crude document vectors.

**Limits.**

- **One vector per word**: "bank" has one vector that averages the river and the money senses. Contextual models such as BERT, the basis of the next lesson, give each occurrence its own vector.
- **Bias**: embeddings absorb the associations of their training text, including gender and ethnic stereotypes (for example "programmer" sitting closer to "man" than to "woman"), which then flow into any system that uses them.
- **Out-of-vocabulary words** have no vector, unless subword models such as fastText are used.

Read SLP Chapter 6, Sections 6.8 to 6.12, then the word2vec paper.`,
          resources: [
            SLP('Chapter 6 (vector semantics and embeddings), Sections 6.8 to 6.12: word2vec, skip-gram with negative sampling, visualisation, analogies and bias.'),
            { title: 'Efficient Estimation of Word Representations in Vector Space', url: 'https://arxiv.org/abs/1301.3781', type: 'article', cost: 'free', provider: 'Mikolov, Chen, Corrado and Dean (2013)', note: 'The word2vec paper: CBOW and skip-gram, and the analogy evaluation.', primary: true },
            { title: 'gensim Word2Vec', url: 'https://radimrehurek.com/gensim/models/word2vec.html', type: 'documentation', cost: 'free', provider: 'gensim', note: 'Training skip-gram on your own corpus and loading pretrained vectors, with the parameters window, negative and min_count.' },
          ],
          relatedLessons: ['deep-learning/sequence-models-and-transformers/tokens-embeddings-and-language-modelling', 'modeling-and-learning/deep-learning/transfer-learning-and-embeddings'],
          exercises: [
            {
              slug: 'sgns-by-hand',
              title: 'Skip-gram loss and gradient by hand',
              prompt:
                'For $v_w = (1, 0.5)$, a true context vector $u_c = (1.5, 1)$ and negatives $u_1 = (0.2, 0.6)$ and $u_2 = (0.4, 0)$, compute the three dot products, the loss (expected about 2.014), and the gradient of the loss with respect to $v_w$. Take one gradient step with learning rate 0.1 and recompute the loss to check it fell.',
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'train-word2vec',
              title: 'Train embeddings on 20 Newsgroups',
              prompt:
                'Train gensim `Word2Vec(sg=1, vector_size=100, window=5, negative=10, min_count=5, epochs=10, seed=0, workers=1)` on the 20 Newsgroups posts (headers, footers and quotes removed, lower-cased, tokenised). Print the 8 nearest neighbours of "nasa", "hockey", "god" and "windows", and compare with your context vectors from Module 5. Then train again with `window=2` and `window=15` and describe how the neighbours shift between substitutes and topical associates.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'embedding-expansion',
              title: 'Query expansion with embeddings',
              prompt:
                'Train embeddings on the Cranfield abstracts (they are small, so use `window=5`, `min_count=2`, 50 epochs). For each query, add the 3 nearest neighbours of each query term with weight 0.3, run BM25, and compare MAP with plain BM25 and with your model-based feedback from Module 4. Report how many queries were helped and hurt, and explain why expansion without feedback documents is riskier.',
              kind: 'data-analysis',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'How do word embeddings relate to the context vectors of Module 5?',
              answerOutline: 'Both represent words by their contexts; embeddings are dense, low-dimensional, learned compressions of co-occurrence statistics (implicitly a shifted PMI matrix for SGNS).',
            },
            {
              question: 'What role do negative samples play in skip-gram training?',
              answerOutline: 'They give contrast: the model raises the score of true context pairs and lowers the score of random pairs, avoiding the trivial solution and a full softmax over the vocabulary.',
            },
            {
              question: 'Name two limits of static word embeddings.',
              answerOutline: 'One vector per word mixes senses; they absorb social biases from the training text; no vector for unseen words without subword models.',
            },
          ],
          quiz: [
            {
              question: 'For one skip-gram example, the true context has $v_w \\cdot u_c = 1.5$ and two negatives have dot products 0.5 and $-0.2$. What is the negative-sampling loss?',
              options: ['1.774', '1.474', '0.201', '0.818'],
              answer: 0,
              explanation:
                'Loss $= -\\log\\sigma(1.5) - \\log\\sigma(-0.5) - \\log\\sigma(0.2) = 0.201 + 0.974 + 0.598 = 1.774$. 1.474 forgets to negate the negative samples\' dot products. 0.201 counts only the true context.',
            },
            {
              question: 'Why do static embeddings handle "bank" in "river bank" and "bank loan" poorly?',
              options: [
                'The word is too rare to get a vector',
                'Cosine similarity cannot compare nouns',
                'Each word type has a single vector, which blends its senses',
                'The window size is too small',
              ],
              answer: 2,
              explanation:
                'word2vec and GloVe learn one vector per word type, so the two senses are averaged into one point that is not a good representation of either. Contextual models compute a different vector for each occurrence. Frequency is not the issue, since "bank" is common.',
            },
            {
              question: 'Levy and Goldberg showed that skip-gram with negative sampling is closely related to which quantity from this course?',
              options: [
                'Inverse document frequency',
                'Pointwise mutual information between words and contexts, shifted by $\\log k$',
                'BM25 term weights',
                'PageRank',
              ],
              answer: 1,
              explanation:
                'At its optimum, SGNS makes $v_w \\cdot u_c \\approx \\text{PMI}(w, c) - \\log k$, so it implicitly factorises a shifted PMI matrix, the co-occurrence statistic of Module 5. IDF and BM25 weight terms for retrieval, which is a different job.',
            },
          ],
        },
        {
          slug: 'dense-retrieval-and-neural-ranking',
          title: 'Dense retrieval and neural ranking',
          summary:
            'Transformer encoders map queries and passages to vectors (bi-encoders) or score pairs jointly (cross-encoders). Dense retrieval finds semantic matches that BM25 misses, but on unfamiliar domains BM25 remains hard to beat, and hybrids often win.',
          estimatedMinutes: 150,
          objectives: [
            'Contrast bi-encoders, cross-encoders and late-interaction models',
            'Explain how dense retrievers are trained with contrastive losses and hard negatives',
            'Explain approximate nearest neighbour search and its recall trade-off',
            'Read zero-shot results on BEIR and explain why BM25 is robust',
            'Combine rankings with reciprocal rank fusion',
          ],
          concepts: [
            'Bi-encoder (dense retriever)',
            'Cross-encoder reranker',
            'Late interaction (ColBERT)',
            'Contrastive training with in-batch and hard negatives',
            'Approximate nearest neighbour search (HNSW, IVF)',
            'Zero-shot transfer and the BEIR benchmark',
            'Learned sparse retrieval',
            'Reciprocal rank fusion',
          ],
          explanation: `This lesson is also beyond the classic syllabus. Its claims are recent and still moving, so read the numbers as a snapshot.

BM25 matches words exactly. A query about "heart attack" misses a passage that only says "myocardial infarction". Neural models match meaning.

**Bi-encoders** (dense retrievers such as DPR) encode the query and each passage separately with a transformer into vectors $q$ and $p$, and score $q \\cdot p$. Passage vectors are computed once, offline, and search becomes **nearest neighbour search** in vector space. Exact search over millions of vectors is too slow, so **approximate** indexes are used: HNSW graphs, or inverted files with product quantisation in FAISS. They trade a little recall for speed of orders of magnitude, a trade-off you should measure.

**Cross-encoders** feed the query and the passage together through one transformer and output a relevance score. Attention between query and passage tokens makes them the most accurate, but nothing can be precomputed, so they are used to **rerank** the top 100 or so candidates from a first-stage retriever. **ColBERT** keeps one vector per token and scores with a sum of maximum similarities, a middle ground between the two.

**Training.** Dense retrievers learn from (query, relevant passage) pairs, typically from MS MARCO, with a **contrastive** loss: raise the score of the positive passage relative to the other passages in the batch (in-batch negatives) and to **hard negatives**, passages that BM25 ranks high but that are not relevant. It is the same pairwise idea as RankNet in Module 4.

**Does it generalise?** The BEIR benchmark (Thakur and colleagues, 2021) evaluated models trained on MS MARCO on 18 other collections without further training. On TREC-COVID, the collection of this course's final project, nDCG@10 was 0.656 for BM25, 0.332 for DPR, 0.654 for ANCE, 0.677 for ColBERT, and 0.757 for BM25 followed by a cross-encoder reranker. Across BEIR, many dense retrievers fell below BM25 outside their training domain, while BM25 with a reranker was consistently strong. Newer embedding models have closed much of the gap, but the lesson stands: always compare with tuned BM25 on your own data, using the evaluation methods of Module 3.

**Hybrids.** Lexical and dense retrievers make different errors, so combining them often helps. **Reciprocal rank fusion** scores each document by $\\sum_r 1/(k + \\text{rank}_r(d))$ with $k = 60$. A document ranked 1st by BM25 and 5th by the dense model gets $1/61 + 1/65 = 0.03178$, and one ranked 3rd and 2nd gets $1/63 + 1/62 = 0.03200$, so being good in both beats being best in one. **Learned sparse** models such as SPLADE keep an inverted index but learn term weights and expansions, another bridge between the two worlds.

Read the BEIR paper (Sections 1, 4 and 5), then try a pretrained model from Sentence-Transformers on Cranfield.`,
          resources: [
            { title: 'BEIR: A Heterogeneous Benchmark for Zero-shot Evaluation of Information Retrieval Models', url: 'https://arxiv.org/abs/2104.08663', type: 'article', cost: 'free', provider: 'Thakur, Reimers, Rücklé, Srivastava and Gurevych (NeurIPS Datasets and Benchmarks, 2021)', note: 'Read Sections 1, 4 and 5, and Table 2 for the per-collection results quoted in this lesson.', primary: true },
            { title: 'Pretrained Transformers for Text Ranking: BERT and Beyond', url: 'https://arxiv.org/abs/2010.06467', type: 'textbook', cost: 'free', provider: 'Jimmy Lin, Rodrigo Nogueira and Andrew Yates', note: 'A free book-length survey. Chapter 3 covers cross-encoder reranking and Chapter 5 dense retrieval.' },
            { title: 'Sentence-Transformers', url: 'https://www.sbert.net/', type: 'tool', cost: 'free', provider: 'UKP Lab and Hugging Face', note: 'Pretrained bi-encoders and cross-encoders with examples for semantic search and reranking; runs on a laptop CPU for small collections.' },
          ],
          relatedLessons: ['deep-learning/sequence-models-and-transformers/attention-and-the-transformer', 'deep-learning/sequence-models-and-transformers/pretraining-and-fine-tuning-language-models'],
          exercises: [
            {
              slug: 'rrf-by-hand',
              title: 'Reciprocal rank fusion by hand',
              prompt:
                'BM25 ranks documents (A, B, C, D, E) and a dense model ranks (C, E, A, F, B). Compute the RRF score with $k = 60$ for every document that appears in either list (a document missing from a list contributes nothing for it) and give the fused ranking. Then recompute with $k = 1$ and explain what $k$ controls.',
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'dense-cranfield',
              title: 'Dense retrieval on Cranfield',
              prompt:
                'Encode the 1,400 Cranfield abstracts and 225 queries with the Sentence-Transformers model `all-MiniLM-L6-v2` on your CPU, retrieve by cosine with exact search in NumPy, and report MAP and nDCG@10 with your evaluation code. Compare with your BM25 (MAP about 0.305) and with RRF of the two. Run a paired t-test between the best two systems and explain the result in terms of the domain the model was trained on.',
              kind: 'data-analysis',
              difficulty: 2,
              hint: 'pip install sentence-transformers pulls in a CPU build of PyTorch. Encoding 1,400 short abstracts takes about a minute on a laptop.',
            },
            {
              slug: 'rerank-cost',
              title: 'What does reranking cost?',
              prompt:
                'With the Sentence-Transformers cross-encoder `cross-encoder/ms-marco-MiniLM-L-6-v2`, rerank the top 20, 50 and 100 BM25 results for each Cranfield query. Report MAP, nDCG@10 and the total CPU time for each depth, and plot effectiveness against time. Say what depth you would use in a product with a 200 ms budget per query.',
              kind: 'data-analysis',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'Why can a bi-encoder search millions of passages quickly while a cross-encoder cannot?',
              answerOutline: 'A bi-encoder\'s passage vectors are precomputed, so search is a nearest-neighbour lookup; a cross-encoder must run the transformer on every query-passage pair at query time.',
            },
            {
              question: 'What did BEIR show about dense retrievers trained on MS MARCO?',
              answerOutline: 'Many performed below BM25 on other domains in zero-shot settings, while BM25 and BM25 plus a cross-encoder reranker were robust.',
            },
            {
              question: 'Why does reciprocal rank fusion use ranks rather than scores?',
              answerOutline: 'Scores from different systems are on incomparable scales; ranks are comparable, and 1/(k + rank) rewards documents ranked well by several systems.',
            },
          ],
          quiz: [
            {
              question: 'With reciprocal rank fusion ($k = 60$), document X is ranked 1st by BM25 and 10th by a dense model. Document Y is ranked 4th by BM25 and 3rd by the dense model. Which ranks higher after fusion?',
              options: [
                'X, because it is first in one list',
                'They tie',
                'It depends on the raw scores',
                'Y, with $1/64 + 1/63 = 0.0315$ against X\'s $1/61 + 1/70 = 0.0307$',
              ],
              answer: 3,
              explanation:
                'X scores $1/61 + 1/70 = 0.01639 + 0.01429 = 0.03068$ and Y scores $1/64 + 1/63 = 0.01563 + 0.01587 = 0.03150$, so Y is higher. With $k = 60$, consistency across systems counts for more than a single top rank. RRF uses only ranks, not raw scores.',
            },
            {
              question: 'Which statement correctly contrasts a cross-encoder with a bi-encoder?',
              options: [
                'A bi-encoder reads query and passage together; a cross-encoder encodes them separately',
                'A cross-encoder scores each query-passage pair jointly and cannot precompute passage representations, so it is used for reranking',
                'A cross-encoder is a kind of BM25',
                'A bi-encoder cannot be trained',
              ],
              answer: 1,
              explanation:
                'Joint encoding lets attention compare query and passage tokens directly, which is accurate but means one transformer pass per pair at query time. Bi-encoders encode separately so passage vectors can be indexed in advance. The first option swaps the two.',
            },
            {
              question: 'A dense retriever trained on web questions scores well on its own test set but below BM25 on a collection of legal contracts. What is the most likely reason?',
              options: [
                'The legal collection is too small for any retriever',
                'Dense retrievers cannot handle long documents in principle',
                'Domain shift: the model learned what relevance looks like in web questions, and legal vocabulary and relevance differ, while BM25 needs no training',
                'BM25 was tuned on the legal test queries',
              ],
              answer: 2,
              explanation:
                'This is the BEIR pattern: zero-shot transfer to a different domain often hurts learned models, while BM25\'s exact matching and statistics adapt to any collection. In-domain fine-tuning, or a hybrid, usually closes the gap. Nothing says BM25 was tuned on the test set.',
            },
          ],
        },
        {
          slug: 'retrieval-augmented-generation',
          title: 'Retrieval-augmented generation',
          summary:
            'A retrieval-augmented system retrieves passages and gives them to a language model to ground its answer. Retrieval quality, chunking, context use and evaluation decide whether the answers are right, and the classic methods of this course measure most of it.',
          estimatedMinutes: 140,
          objectives: [
            'Describe the stages of a retrieval-augmented generation pipeline',
            'Choose chunk size and overlap and compute the number of chunks',
            'Separate retrieval failures from generation failures when an answer is wrong',
            'Evaluate retrieval with recall at k and answers with faithfulness and correctness',
            'Recognise failure modes such as lost-in-the-middle and prompt injection through retrieved text',
          ],
          concepts: [
            'Retrieval-augmented generation (RAG)',
            'Chunking with overlap',
            'Hybrid retrieval and reranking',
            'Context window budget',
            'Grounding and citations',
            'Recall at k of supporting passages',
            'Faithfulness versus correctness',
            'Lost in the middle and prompt injection',
          ],
          explanation: `This last lesson is beyond the classic syllabus too, and it shows how much of the classic material still applies.

A **large language model** answers from what it absorbed in training, which can be outdated, missing private information, or wrong. **Retrieval-augmented generation** (RAG; Lewis and colleagues, 2020) retrieves relevant passages first and puts them in the prompt, so the answer is grounded in sources that can be shown to the user.

**The pipeline.**

1. **Chunk** the documents into passages of a few hundred tokens, with some overlap so a fact is not split across a boundary. A 9,000-token report cut into 500-token chunks with 50 tokens of overlap (a stride of 450) gives $\\lceil (9{,}000 - 500)/450 \\rceil + 1 = 20$ chunks. Smaller chunks retrieve more precisely but lose context, and larger ones waste the prompt.
2. **Index and retrieve** with BM25, a dense model or a hybrid (previous lesson), then **rerank** the top candidates with a cross-encoder.
3. **Assemble the prompt** within a token budget, for example the top 5 chunks of 400 tokens, 2,000 tokens in all, with instructions to answer only from the sources and to cite them.
4. **Generate** the answer with citations, and show the sources.

**When the answer is wrong, find out where.** If the passage containing the answer was not retrieved, it is a **retrieval failure**, and no prompt engineering will fix it. Measure it with **recall@k** of the supporting passages over a set of questions with known sources, the evaluation of Module 3 again. If the passage was retrieved but the answer is still wrong or unsupported, it is a **generation failure**. Evaluate answers on **correctness** (does it match the reference?) and **faithfulness** (is every claim supported by the retrieved text?). An answer can be correct but unfaithful, because the model knew it anyway, or faithful to a wrong source.

**Known failure modes.**

- **Lost in the middle**: Liu and colleagues (2023) found that models use information at the start or end of a long context better than in the middle, so more retrieved text is not always better. Reranking and putting the best passages first help.
- **Prompt injection**: a retrieved document can contain text such as "ignore your instructions". Retrieved content must be treated as data, never as instructions, and actions taken by the system should not depend on it alone.
- **Stale or duplicated indexes**: the crawling and deduplication problems of Module 4 return.
- **Unanswerable questions**: when nothing relevant is retrieved, the system should say so rather than guess.

The lesson of the whole course applies here. A RAG system is a search engine with a different user interface, and you can only improve it if you measure each stage with judged examples.

Read the RAG paper's introduction and Section 2, then the lost-in-the-middle paper.`,
          resources: [
            { title: 'Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks', url: 'https://arxiv.org/abs/2005.11401', type: 'article', cost: 'free', provider: 'Lewis and colleagues (NeurIPS 2020)', note: 'The paper that named the approach. Read the introduction and Section 2 for the retriever-generator architecture.', primary: true },
            { title: 'Lost in the Middle: How Language Models Use Long Contexts', url: 'https://arxiv.org/abs/2307.03172', type: 'article', cost: 'free', provider: 'Liu and colleagues (TACL, 2024)', note: 'Shows that answer accuracy depends on where the relevant passage sits in the context. Read Sections 1 and 2.' },
            { title: 'FAISS', url: 'https://github.com/facebookresearch/faiss', type: 'tool', cost: 'free', provider: 'Meta AI Research', note: 'A library for exact and approximate vector search (flat, IVF, HNSW, product quantisation), with a CPU build installable with pip.' },
          ],
          exercises: [
            {
              slug: 'chunk-arithmetic',
              title: 'Chunking arithmetic',
              prompt:
                'A collection has 2,000 documents averaging 6,000 tokens. Compute the number of chunks for chunk sizes 200, 500 and 1,000 tokens with 10% overlap, and the index size if each chunk is stored as a 384-dimensional float32 vector. For a 4,000-token context budget with 500 tokens reserved for instructions and the question, say how many chunks of each size fit, and discuss the trade-off.',
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'rag-retrieval-eval',
              title: 'Evaluate the retrieval stage of a RAG system',
              prompt:
                'Treat TREC-COVID (from BEIR) as a RAG source: chunk each abstract into 128-token passages with 32 tokens of overlap, and for each of the 50 queries, label a passage relevant if it comes from a document judged 2 (highly relevant). Report recall@5 and recall@20 of at least one relevant passage per query for BM25, for a dense model of your choice and for RRF of the two. Explain what these numbers imply for the answers a generator could give.',
              kind: 'data-analysis',
              difficulty: 3,
            },
            {
              slug: 'rag-failure-analysis',
              title: 'Diagnose RAG failures',
              prompt:
                'Using any small RAG system you can run locally (or the retrieval part alone, with answers written by you from the retrieved text), collect 20 questions about a document set you know well, with the passage that answers each. Classify each failure as retrieval (answer passage not in the top 5), position (retrieved but in the middle of a long context), or generation (retrieved and prominent, answer still wrong). Write one paragraph per category on how you would fix it, and one on how you would guard against instructions embedded in retrieved documents.',
              kind: 'writing',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What are the stages of a RAG pipeline?',
              answerOutline: 'Chunk and index documents; retrieve (lexical, dense or hybrid) and rerank; assemble a prompt within a token budget; generate an answer with citations.',
            },
            {
              question: 'How do you tell a retrieval failure from a generation failure?',
              answerOutline: 'Check whether the supporting passage was retrieved (recall@k over questions with known sources). If not, retrieval failed; if it was retrieved and the answer is still wrong or unsupported, generation failed.',
            },
            {
              question: 'Why must retrieved text be treated as data rather than instructions?',
              answerOutline: 'Documents can contain adversarial instructions (prompt injection); if the model obeys them it can leak data or take harmful actions.',
            },
          ],
          quiz: [
            {
              question: 'A 9,000-token document is cut into 500-token chunks with 50 tokens of overlap between consecutive chunks. How many chunks are needed to cover it?',
              options: ['18', '19', '20', '10'],
              answer: 2,
              explanation:
                'The stride is $500 - 50 = 450$ tokens. The last chunk must end at token 9,000, so it starts at or after 8,500: $\\lceil 8{,}500/450 \\rceil + 1 = 19 + 1 = 20$ chunks. 18 divides by 500 and ignores the overlap, and 19 forgets the first chunk.',
            },
            {
              question: 'A RAG assistant answers a question wrongly. Its log shows the passage containing the correct answer ranked 37th, and only the top 5 went into the prompt. What kind of failure is this, and what should you fix first?',
              options: [
                'A retrieval failure: improve retrieval or reranking so the passage reaches the top 5',
                'A generation failure: change the prompt',
                'Lost in the middle: move the passage to the start of the prompt',
                'Prompt injection',
              ],
              answer: 0,
              explanation:
                'The generator never saw the answer, so no prompt change can help. The fix is in retrieval: better ranking, a hybrid, a reranker, or more candidates. Lost in the middle applies only when the passage is in the context but poorly placed.',
            },
            {
              question: 'Which statement correctly separates faithfulness from correctness of a RAG answer?',
              options: [
                'They are the same property',
                'A faithful answer is always correct',
                'Correctness is about citations and faithfulness is about style',
                'Faithfulness asks whether every claim is supported by the retrieved passages; correctness asks whether the answer is true, and an answer can have either without the other',
              ],
              answer: 3,
              explanation:
                'An answer copied faithfully from an outdated source is faithful but wrong, and a model can give a correct answer from its training memory that the retrieved text does not support, which is correct but unfaithful. Both need measuring.',
            },
          ],
        },
      ],
    },
  ],
  capstone: {
    slug: 'evaluated-search-engine',
    title: 'An evaluated search and analysis engine',
    description:
      'Build a search engine over a real collection with relevance judgements, compare retrieval models and feedback with significance tests, and add topic and category views of the results. The final project in the coursework file gives the full specification.',
    deliverables: [
      'An inverted index with BM25 and query likelihood ranking',
      'An evaluation harness reporting MAP, nDCG@10 and significance tests',
      'Pseudo-relevance feedback with a measured effect',
      'Topic and cluster views of results, and a written analysis',
    ],
    estimatedHours: 50,
  },
  masteryChecklist: [
    'I can design an analyser and explain how tokenisation, stop words and stemming change the index and the results',
    'I can compute TF-IDF, BM25 and smoothed query likelihood scores by hand and explain what each part of the formula does',
    'I can build, compress and query an inverted index and estimate its cost',
    'I can evaluate a ranking with precision, recall, average precision and nDCG, and test whether a difference between systems is significant',
    'I can apply relevance and pseudo-relevance feedback and say when they help and when they cause drift',
    'I can compute PageRank and HITS and explain how link analysis and learning to rank enter web search',
    'I can build content-based and collaborative recommenders and evaluate them',
    'I can mine word associations, fit PLSA with EM and LDA, and interpret the topics critically',
    'I can cluster and categorise text, evaluate the results with the right averages, and analyse sentiment',
    'I can explain what dense retrieval and retrieval-augmented generation add to classic methods and what they do not replace',
  ],
});
