import { defineSubject } from '../define';

export default defineSubject({
  id: 'theory-of-computation',
  title: 'Theory of Computation',
  category: 'cs',
  tagline:
    'What can be computed, what cannot, and what can be computed efficiently: automata, grammars, Turing machines, undecidability, P versus NP and beyond.',
  description: `Theory of computation asks the questions that sit under every program: which problems can be solved by any algorithm at all, which can be solved with bounded memory or in polynomial time, and how do we prove that a problem is impossible or intractable rather than merely unsolved by us? The answers, from Turing's 1936 paper to the Cook-Levin theorem and the modern complexity zoo, are among the deepest results in science, and they are also practical: they explain why regular expressions cannot match balanced parentheses, why your compiler uses a context-free grammar, why no tool can decide in general whether a program halts, and why SAT solvers are the workhorse of verification despite SAT being NP-complete.

This subject follows the classic Sipser sequence (automata, computability, complexity) using free materials: Boaz Barak's *Introduction to Theoretical Computer Science*, the MIT 18.404J and 6.045J OpenCourseWare lectures, and Jeff Erickson's notes on models of computation. The emphasis is on *proof* (you will write many) and on *building*: you implement DFA, NFA and regex engines, a pushdown automaton, a Turing machine simulator, a universal machine, reductions that you can run, and a SAT-based solver for NP-complete problems, so that every abstract theorem is also a program you have tested.

By the end you should be able to classify a problem as regular, context-free, decidable, recognisable or undecidable; prove it with pumping lemmas, closure properties, diagonalisation or reductions; place it in P, NP, co-NP, PSPACE or beyond with justification; and explain what randomness and quantum computing change.`,
  difficulty: 'advanced',
  estimatedHours: 70,
  prerequisites: ['discrete-mathematics'],
  recommendedBackground: [
    'Comfort with proofs by induction, contradiction and construction (Discrete Mathematics modules 1, 2 and 6)',
    'Python at the level of Programming Fundamentals; the simulators are small but must be tested',
    'Asymptotic notation and basic algorithms (Data Structures and Algorithms module 1 is sufficient)',
  ],
  tags: ['automata', 'computability', 'complexity', 'Turing machines', 'NP-completeness', 'formal languages'],
  core: false,
  modules: [
    {
      slug: 'finite-automata-and-regular-languages',
      title: 'Finite Automata and Regular Languages',
      description:
        'Machines with finite memory: deterministic and nondeterministic finite automata, their equivalence with regular expressions, closure properties, the pumping lemma for proving non-regularity, and DFA minimisation.',
      lessons: [
        {
          slug: 'languages-and-deterministic-finite-automata',
          title: 'Languages, decision problems and DFAs',
          summary:
            'Problems as languages over an alphabet, the deterministic finite automaton as the simplest model of computation, and the discipline of proving a DFA correct with a state invariant.',
          estimatedMinutes: 100,
          objectives: [
            'Encode decision problems as languages of strings over a finite alphabet',
            'Give the formal definition of a DFA and its extended transition function, and trace its computation',
            'Design DFAs for given languages by assigning a meaning to each state',
            'Prove a DFA correct by stating what each state "remembers" and proving it by induction on input length',
          ],
          concepts: [
            'Alphabet, string, language; the empty string',
            'Decision problem as a language',
            'DFA: (Q, Sigma, delta, q0, F)',
            'Extended transition function and acceptance',
            'State as finite memory: what each state remembers',
            'Product construction for intersection (preview)',
            'Correctness proof by state invariant',
            'DFAs in practice: lexers, protocols, hardware controllers',
          ],
          explanation: `Theory of computation studies **problems**, and the cleanest problems are yes/no questions about strings. An **alphabet** $\\Sigma$ is a finite set of symbols; a **string** is a finite sequence of them; a **language** is any set of strings. "Is this number prime?" becomes the language of binary strings encoding primes; "does this program halt?" becomes the language of program-input pairs that halt. A machine **decides** a language if it accepts exactly its members. Every question about what is computable is a question about which languages some class of machines can decide.

The simplest machine is the **deterministic finite automaton**: a finite set of states $Q$, an alphabet, a transition function $\\delta : Q \\times \\Sigma \\to Q$, a start state and a set of accepting states. It reads the input once, left to right, moving between states, and accepts if it ends in an accepting state. It has no memory except which state it is in, so the only thing a DFA can "know" about the input so far is one of finitely many facts. That constraint is the whole point: the language of strings with an even number of 1s needs two states; the language of strings whose third-from-last symbol is 1 needs eight.

To **design** a DFA, decide what fact about the prefix read so far needs remembering, make one state per possible value of that fact, and let the transitions update it. To **prove** it correct, state the invariant "the machine is in state $q$ after reading $w$ iff [fact about $w$]" and prove it by induction on $|w|$: the base case is the start state, and the inductive step checks every transition. Design and proof are the same thought in two registers, and you should practise until writing one gives you the other.

Read Sipser chapter 1.1 (any edition) or Barak chapter 6.4, and Erickson's automata notes, which have excellent worked designs. Then implement a DFA class and test it: the simulator is ten lines and will be the foundation of this module's regex engine.`,
          resources: [
            {
              title: 'Jeff Erickson — Models of Computation: Finite-State Automata',
              url: 'https://jeffe.cs.illinois.edu/teaching/algorithms/models/03-automata.pdf',
              type: 'textbook',
              cost: 'free',
              provider: 'Jeff Erickson (UIUC)',
              note: 'Sections on DFAs, formal definitions and the "what does each state remember" design method.',
              primary: true,
            },
            {
              title: 'Introduction to Theoretical Computer Science (Barak) — Chapter 6: Functions with infinite domains, automata and regular expressions',
              url: 'https://introtcs.org/public/lec_05_infinite.html',
              type: 'textbook',
              cost: 'free',
              provider: 'Boaz Barak',
            },
            {
              title: 'MIT 18.404J Theory of Computation (Fall 2020) — Lecture 1-2',
              url: 'https://ocw.mit.edu/courses/18-404j-theory-of-computation-fall-2020/',
              type: 'course',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
              note: 'Michael Sipser\'s own lectures following his textbook; video and notes for the whole subject.',
            },
            {
              title: 'Introduction to the Theory of Computation (Sipser) — book page',
              url: 'https://math.mit.edu/~sipser/book.html',
              type: 'textbook',
              cost: 'paid',
              provider: 'Michael Sipser',
              note: 'The standard textbook; chapter 1 for this module. Barak and Erickson are free alternatives that cover the same material.',
            },
            {
              title: 'JFLAP — automata and formal language simulator',
              url: 'https://www.jflap.org/',
              type: 'tool',
              cost: 'free',
              provider: 'Duke University',
            },
          ],
          exercises: [
            {
              slug: 'dfa-simulator',
              title: 'Implement a DFA simulator',
              prompt:
                'Write a DFA class holding states, alphabet, a transition dict, start and accepting states, with accepts(w) and a method that returns the sequence of states visited. Build DFAs for: binary strings with an even number of 1s; strings over {a,b} containing "abb"; binary numbers divisible by 3 (states = remainder); strings whose third-from-last symbol is 1. Test each against a brute-force Python predicate on all strings of length <= 8.',
              kind: 'coding',
              difficulty: 1,
            },
            {
              slug: 'state-invariant-proofs',
              title: 'Prove two DFAs correct',
              prompt:
                'For the divisibility-by-3 DFA, state the invariant "after reading w the state is (value of w) mod 3" and prove it by induction on |w| (the transition from remainder r on bit b goes to (2r + b) mod 3). Then do the same for the "contains abb" DFA, stating what each of its four states remembers.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'count-states-needed',
              title: 'How many states are needed?',
              prompt:
                'Design the smallest DFA you can for the language of binary strings whose k-th symbol from the end is 1, for k = 1, 2, 3, 4. Count states. Conjecture the minimum as a function of k and argue informally why fewer cannot suffice (what must be remembered?). This is proved properly in the minimisation lesson.',
              kind: 'problem',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What is a language, and how does a decision problem become one?',
              answerOutline: 'A set of strings over an alphabet; encode instances as strings and take the set of yes-instances.',
            },
            {
              question: 'What can a DFA remember about the input it has read?',
              answerOutline: 'Only its current state: one of finitely many facts about the prefix.',
            },
            {
              question: 'How do you prove a DFA accepts exactly a given language?',
              answerOutline: 'State for each state what property of the prefix it encodes and prove it by induction on input length; acceptance follows from the property of accepting states.',
            },
          ],
        },
        {
          slug: 'nondeterminism-and-nfa-to-dfa',
          title: 'Nondeterminism and the subset construction',
          summary:
            'Nondeterministic finite automata as guess-and-verify machines, why they are no more powerful than DFAs, and the exponential cost of the subset construction.',
          estimatedMinutes: 100,
          objectives: [
            'Define NFAs with epsilon transitions and explain acceptance as the existence of an accepting path',
            'Simulate an NFA by tracking the set of possible states',
            'Perform the subset construction to convert an NFA to an equivalent DFA and prove it correct',
            'Exhibit a language whose NFA has n+1 states but whose minimal DFA needs 2^n states',
          ],
          concepts: [
            'NFA: delta returns a set of states; epsilon moves',
            'Acceptance: some computation path accepts',
            'Nondeterminism as parallel exploration or as guessing',
            'Epsilon closure',
            'Subset (powerset) construction',
            'Equivalence of NFA and DFA',
            'Exponential blow-up example',
            'Nondeterminism as a theme (NP later)',
          ],
          explanation: `A **nondeterministic finite automaton** relaxes the DFA in two ways: a state may have several transitions on the same symbol (or none), and it may have **$\\varepsilon$-transitions** that move without reading input. The NFA accepts a string if **some** sequence of choices leads to an accepting state. There is no physical device that works like this; it is a mathematical convenience, and a very good one. The language "third symbol from the end is 1" has a four-state NFA: loop in the start state, guess that the current 1 is the third from last, then read exactly two more symbols. Verifying the guess is easy; the nondeterminism did the hard part.

Two ways to think about it, both useful: the NFA explores all paths **in parallel**, keeping the set of states it could be in; or it **guesses** the right path and merely checks it. The parallel view gives the simulation algorithm: maintain the set of current states, and for each input symbol replace it by the union of all transitions, then close under $\\varepsilon$-moves. That is $O(|Q|)$ work per symbol, which is how real regex engines (the good ones) run.

The parallel view also gives the **subset construction**: make a DFA whose states are *sets* of NFA states. The DFA state after reading $w$ is exactly the set of NFA states reachable on $w$, and it accepts if that set contains an accepting state. The proof of equivalence is an induction on $|w|$ that the simulated set and the DFA state coincide. Hence NFAs decide exactly the DFA languages: nondeterminism adds **convenience, not power**, for finite automata.

It does cost states. The "$n$-th from the end" language has an $(n+1)$-state NFA, but any DFA must remember the last $n$ symbols, so it needs $2^n$ states, and the subset construction produces them. Keep this example: the question of whether nondeterminism adds power is exactly P versus NP for polynomial-time machines, and the answer there is unknown. Read Sipser 1.2 or Erickson's NFA notes, implement the simulation and the construction, and watch the blow-up happen.`,
          resources: [
            {
              title: 'Jeff Erickson — Models of Computation: Nondeterministic Automata',
              url: 'https://jeffe.cs.illinois.edu/teaching/algorithms/models/04-nfa.pdf',
              type: 'textbook',
              cost: 'free',
              provider: 'Jeff Erickson (UIUC)',
              primary: true,
            },
            {
              title: 'MIT 18.404J — Lecture 2: Nondeterminism, closure properties, regular expressions',
              url: 'https://ocw.mit.edu/courses/18-404j-theory-of-computation-fall-2020/',
              type: 'lecture',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
            },
            {
              title: 'Russ Cox — Regular Expression Matching Can Be Simple And Fast',
              url: 'https://swtch.com/~rsc/regexp/regexp1.html',
              type: 'article',
              cost: 'free',
              provider: 'Russ Cox',
              note: 'The NFA simulation (Thompson) versus backtracking, with measurements; read now and again in the regex lesson.',
            },
          ],
          exercises: [
            {
              slug: 'nfa-simulator',
              title: 'NFA simulation by state sets',
              prompt:
                'Extend your automata library with an NFA class (transitions map (state, symbol or None) to a set of states), epsilon_closure, and accepts(w) by set simulation. Build NFAs for "third from last is 1" and for "contains aba or ends in bb" and test against brute force on all strings of length <= 8. Report the maximum size of the current-state set seen.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'subset-construction',
              title: 'Implement the subset construction',
              prompt:
                'Write nfa_to_dfa(nfa) constructing only reachable subsets. Convert the "n-th from last is 1" NFA for n = 2..10, record the number of DFA states (expected 2^n), and verify the DFA and NFA agree on 2000 random strings per n. Then convert an NFA where the blow-up does not happen and explain why.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'equivalence-proof',
              title: 'Prove the subset construction correct',
              prompt:
                'Write the proof that the DFA produced by the subset construction accepts exactly the NFA\'s language: define the DFA state reached on w, prove by induction on |w| that it equals the set of NFA states reachable on w (including epsilon closure), and conclude. Then prove that no DFA with fewer than 2^n states accepts "n-th from last is 1" using a fooling-set argument (two strings with different last n symbols must reach different states).',
              kind: 'derivation',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'When does an NFA accept a string?',
              answerOutline: 'When at least one computation path (sequence of choices including epsilon moves) ends in an accepting state after consuming the input.',
            },
            {
              question: 'Why does nondeterminism not add power to finite automata?',
              answerOutline: 'The subset construction builds a DFA tracking the set of possible NFA states; it decides the same language.',
            },
            {
              question: 'What is the cost of the subset construction and when is it incurred?',
              answerOutline: 'Up to 2^|Q| DFA states; incurred for languages like "n-th symbol from the end is 1" where the DFA must remember n symbols.',
            },
          ],
        },
        {
          slug: 'regular-expressions-and-kleene',
          title: 'Regular expressions and Kleene\'s theorem',
          summary:
            'Regular expressions as a notation for languages, Thompson\'s construction from regex to NFA, state elimination from DFA to regex, and what practical regex engines add and lose.',
          estimatedMinutes: 110,
          objectives: [
            'Define regular expressions inductively and the language each denotes',
            'Convert a regular expression to an NFA by Thompson\'s construction and prove it by structural induction',
            'Convert a DFA to a regular expression by state elimination (GNFA)',
            'Explain how backtracking regex engines differ from automata and why they can be exponentially slow',
          ],
          concepts: [
            'Regular expression syntax: empty set, epsilon, symbol, union, concatenation, star',
            'Language of a regex, defined by structural recursion',
            'Thompson\'s construction (regex -> NFA)',
            'Generalised NFA and state elimination (DFA -> regex)',
            'Kleene\'s theorem: regex = NFA = DFA',
            'Regular languages as a robust class',
            'Backtracking engines, backreferences, catastrophic backtracking',
            'Lexical analysis as the main application',
          ],
          explanation: `A **regular expression** is a formula built from $\\emptyset$, $\\varepsilon$, single symbols, **union** $R_1 \\mid R_2$, **concatenation** $R_1 R_2$ and **Kleene star** $R^*$ (zero or more repetitions). Its language is defined by structural recursion on the formula, which means every proof about regexes is a structural induction (Discrete Mathematics module 6 again). The regex $(0 \\mid 1)^* 1 (0 \\mid 1)(0 \\mid 1)$ denotes "third from last is 1", and you can see the NFA in it.

**Kleene's theorem** says regexes, NFAs and DFAs describe exactly the same languages, the **regular languages**. Regex to NFA is **Thompson's construction**: build an NFA for each base case and combine them with $\\varepsilon$-transitions for union (new start branching to both), concatenation (link accept of the first to start of the second) and star (loop back plus a bypass). The correctness proof is structural induction with the invariant that each sub-NFA has one start, one accept and no transitions out of the accept state. DFA to regex uses **state elimination**: allow regexes on transitions (a generalised NFA), then remove states one at a time, replacing each path through the removed state $q$ with $R_{in} R_{loop}^* R_{out}$, until only start and accept remain. The resulting regex can be enormous, which is why nobody does it by hand for more than four states.

The practical lesson is about **engines**. The Thompson NFA simulation from the previous lesson runs in $O(nm)$ for a string of length $n$ and regex of size $m$, always. Most language libraries (Python's \`re\`, Perl, Java) use **backtracking** instead, because it supports **backreferences** (\`(a*)\\1\`), which take you outside the regular languages. The cost: patterns like \`(a*)*b\` on \`aaaa...a\` explore exponentially many paths before failing, the "catastrophic backtracking" behind real outages. Russ Cox's article measures this; reproduce his graph yourself in the exercises.

Read Sipser 1.3 or Barak 6.5 and Erickson's regular-languages notes, build the regex-to-NFA compiler on top of your NFA class, and you will have a complete, correct regex engine in under 200 lines.`,
          resources: [
            {
              title: 'Jeff Erickson — Models of Computation: Regular Languages',
              url: 'https://jeffe.cs.illinois.edu/teaching/algorithms/models/02-regular.pdf',
              type: 'textbook',
              cost: 'free',
              provider: 'Jeff Erickson (UIUC)',
              primary: true,
            },
            {
              title: 'Russ Cox — Regular Expression Matching Can Be Simple And Fast',
              url: 'https://swtch.com/~rsc/regexp/regexp1.html',
              type: 'article',
              cost: 'free',
              provider: 'Russ Cox',
              note: 'Thompson construction with code, and the backtracking measurements to reproduce.',
            },
            {
              title: 'Python re module documentation',
              url: 'https://docs.python.org/3/library/re.html',
              type: 'documentation',
              cost: 'free',
              provider: 'Python Software Foundation',
              note: 'Note which features (backreferences, lookaround) go beyond regular languages.',
            },
            {
              title: 'MIT 18.404J — Lecture 3: Regular expressions, nonregular languages',
              url: 'https://ocw.mit.edu/courses/18-404j-theory-of-computation-fall-2020/',
              type: 'lecture',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
            },
          ],
          exercises: [
            {
              slug: 'regex-to-nfa-engine',
              title: 'A regex engine by Thompson\'s construction',
              prompt:
                'Write a parser for regexes with | , concatenation, *, + , ? and parentheses (recursive descent), and compile the syntax tree to an NFA using Thompson\'s construction. Match with your set simulation. Test against Python re.fullmatch on 50 patterns x 200 random strings. Then time your engine and re on (a*)*b against strings of 20..30 a\'s and plot both.',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'state-elimination',
              title: 'State elimination by hand and by code',
              prompt:
                'Convert the 3-state "divisible by 3" DFA to a regular expression by state elimination by hand, showing each step. Then implement dfa_to_regex and run it on your DFAs; verify each resulting regex against the DFA on all strings of length <= 10 using your engine. Report the regex length as a function of the number of DFA states for the "n-th from last" family.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'thompson-correctness',
              title: 'Prove Thompson\'s construction correct',
              prompt:
                'State the invariant maintained by every NFA produced (single start, single accept, no outgoing transitions from accept, no incoming to start) and prove by structural induction on the regex that L(NFA(R)) = L(R), handling the star case carefully (why is the bypass needed, and why the loop?).',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'beyond-regular-features',
              title: 'Which regex features are regular?',
              prompt:
                'For each Python re feature decide whether it stays within regular languages and justify: character classes, bounded repetition {m,n}, non-greedy *?, lookahead (?=...), backreferences \\1, named groups. For the backreference (a*)\\1 argue (informally) why no DFA can match it, anticipating the pumping lemma.',
              kind: 'writing',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What does Kleene\'s theorem state?',
              answerOutline: 'Regular expressions, NFAs and DFAs define exactly the same class of languages.',
            },
            {
              question: 'How does Thompson\'s construction handle R*?',
              answerOutline: 'New start and accept with epsilon moves: start to R\'s start and to accept (bypass), R\'s accept back to R\'s start (loop) and to the new accept.',
            },
            {
              question: 'Why can a backtracking regex engine take exponential time?',
              answerOutline: 'It tries alternatives one at a time and may explore exponentially many ways to split the input before failing; NFA simulation tracks all at once in O(nm).',
            },
          ],
          relatedLessons: ['compilers/overview-and-lexing/regular-expressions-and-automata'],
        },
        {
          slug: 'closure-properties-and-the-pumping-lemma',
          title: 'Closure properties and the pumping lemma',
          summary:
            'Operations that preserve regularity, and the pumping lemma as the tool for proving that a language is not regular, with the standard examples and the standard mistakes.',
          estimatedMinutes: 110,
          objectives: [
            'Prove closure of regular languages under union, intersection, complement, concatenation, star, reversal and homomorphism',
            'State the pumping lemma precisely, including the quantifier structure, and prove it from the pigeonhole principle',
            'Prove non-regularity of 0^n 1^n, palindromes, balanced parentheses, primes and others by pumping',
            'Combine closure properties with known non-regular languages to prove non-regularity without pumping',
          ],
          concepts: [
            'Product construction for intersection and union',
            'Complement by swapping accepting states (DFA only)',
            'Closure under reversal and homomorphism',
            'Pumping lemma: statement as a game with the adversary',
            'Proof via pigeonhole on states',
            'Standard non-regular languages',
            'Non-regularity via closure (intersect with a regular language)',
            'Myhill-Nerode as the exact characterisation (preview)',
          ],
          explanation: `The regular languages are **closed** under a long list of operations, and each closure is a construction. **Union** and **intersection**: run two DFAs in parallel with the **product construction** (states are pairs; accept if either / both accept). **Complement**: swap accepting and non-accepting states of a DFA (not an NFA: the asymmetry of acceptance matters). **Concatenation** and **star**: Thompson. **Reversal**: reverse all transitions, swap start and accept (giving an NFA). **Homomorphism** (replace each symbol by a string): substitute into the regex. These constructions are tools: to show a language is regular, build it from regular pieces.

The other direction needs a weapon. The **pumping lemma**: if $L$ is regular then there is a length $p$ such that every $w \\in L$ with $|w| \\ge p$ can be split as $w = xyz$ with $|xy| \\le p$, $|y| \\ge 1$, and $xy^iz \\in L$ for all $i \\ge 0$. The proof is the pigeonhole principle: a DFA with $p$ states must repeat a state within the first $p$ symbols, and the loop between the repeats can be traversed any number of times. Note the quantifiers: *for all* long $w$, *there exists* a split, *for all* $i$. To prove $L$ **not** regular you play the adversary: assume $p$, *choose* one specific $w \\in L$ of length $\\ge p$ (cleverly), show that *every* legal split has some $i$ with $xy^iz \\notin L$. The classic mistake is choosing the split yourself instead of handling all of them; the second is choosing a $w$ that happens to pump.

Canonical non-regular languages: $\\{0^n 1^n\\}$ (pumping $y$ inside the 0s unbalances the count), palindromes, balanced parentheses, $\\{0^{n^2}\\}$, $\\{1^p : p \\text{ prime}\\}$ (pump $i = |xz|$ times to get a composite length). Then **closure does the rest**: if $L$ were regular, so would be $L \\cap 0^*1^*$; if that is a known non-regular language, done. This is often cleaner than pumping directly.

The pumping lemma is only a necessary condition; some non-regular languages pump. The exact characterisation is Myhill-Nerode (next lesson). Read Sipser 1.4, Erickson's regular-languages notes (which include fooling sets), and do many of these proofs; the exercises include a program that searches for pumping witnesses, which demystifies the quantifiers.`,
          resources: [
            {
              title: 'Jeff Erickson — Models of Computation: Regular Languages (closure, fooling sets, pumping)',
              url: 'https://jeffe.cs.illinois.edu/teaching/algorithms/models/02-regular.pdf',
              type: 'textbook',
              cost: 'free',
              provider: 'Jeff Erickson (UIUC)',
              primary: true,
            },
            {
              title: 'MIT 18.404J — Lecture 3 and 4: Nonregular languages, pumping lemma',
              url: 'https://ocw.mit.edu/courses/18-404j-theory-of-computation-fall-2020/',
              type: 'lecture',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
            },
            {
              title: 'Stanford CS103 — Mathematical Foundations of Computing (regular languages unit, guide to the pumping lemma)',
              url: 'https://web.stanford.edu/class/cs103/',
              type: 'course',
              cost: 'free',
              provider: 'Stanford',
            },
          ],
          exercises: [
            {
              slug: 'closure-constructions',
              title: 'Implement the closure constructions',
              prompt:
                'Add product(dfa1, dfa2, op) for union/intersection/difference, complement(dfa), reverse(dfa) -> NFA, and test each against brute force on strings of length <= 8 for several pairs of your DFAs. Use them to build a DFA for "even number of 1s and not containing 00" without designing it by hand, and minimise mentally how many states it has.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'pumping-proofs',
              title: 'Six pumping-lemma proofs',
              prompt:
                'Prove non-regular, with the quantifier structure explicit: {0^n 1^n}; {ww^R} (palindromes); balanced parentheses; {0^m 1^n : m > n}; {1^(n^2)}; {1^p : p prime}. For the last, show the choice of i carefully. Then show {0^m 1^n : m, n >= 0} is regular even though it looks similar, and explain the difference.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'pumping-explorer',
              title: 'A pumping explorer',
              prompt:
                'Write pumpable(L_predicate, w, p) that enumerates all splits w = xyz with |xy| <= p, |y| >= 1 and reports, for each, the smallest i in 0..5 with xy^iz not in L (or "pumps"). Run it for 0^n 1^n with w = 0^p 1^p: every split should fail. Run it on a regular language and a long w: some split should pump for all i tested. Explain how this matches the quantifier structure.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'closure-based-nonregularity',
              title: 'Non-regularity via closure',
              prompt:
                'Prove non-regular using closure properties plus one known non-regular language (no direct pumping): strings over {0,1} with equal numbers of 0s and 1s; strings over {a,b,c} with #a = #b; the complement of {0^n 1^n}; {0^n 1^m : n != m}. State precisely which closure property you use each time.',
              kind: 'derivation',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does complementing an NFA by swapping accepting states fail?',
              answerOutline: 'An NFA accepts if some path accepts; swapping makes it accept if some path rejects, which is not the complement. Determinise first.',
            },
            {
              question: 'State the pumping lemma with its quantifiers.',
              answerOutline: 'L regular implies exists p such that for all w in L with |w| >= p, there exists a split w = xyz with |xy| <= p, |y| >= 1, such that for all i >= 0, xy^i z is in L.',
            },
            {
              question: 'What is the most common error in a pumping-lemma proof?',
              answerOutline: 'Choosing the split xyz yourself; the proof must show every legal split fails for some i.',
            },
            {
              question: 'How can closure properties prove a language non-regular?',
              answerOutline: 'If L were regular, a closure operation would make a known non-regular language regular, contradiction.',
            },
          ],
        },
        {
          slug: 'minimisation-and-myhill-nerode',
          title: 'DFA minimisation and the Myhill-Nerode theorem',
          summary:
            'The unique minimal DFA, the partition-refinement algorithm that finds it, and the Myhill-Nerode theorem as the exact test for regularity and lower bound on state count.',
          estimatedMinutes: 100,
          objectives: [
            'Define distinguishable states and compute the equivalence classes by partition refinement',
            'Implement DFA minimisation and verify minimality and uniqueness',
            'State the Myhill-Nerode theorem and use it to prove non-regularity and to lower-bound DFA size',
            'Decide equivalence of two regular expressions or DFAs algorithmically',
          ],
          concepts: [
            'Distinguishing string; indistinguishable states',
            'Partition refinement (Moore / Hopcroft idea)',
            'Minimal DFA is unique up to isomorphism',
            'Myhill-Nerode right-invariant equivalence on strings',
            'Index of the relation = number of states of the minimal DFA',
            'Infinite index iff non-regular',
            'Fooling sets as the lower-bound tool',
            'Decision procedures: emptiness, equivalence, inclusion',
          ],
          explanation: `Two states of a DFA are **distinguishable** if some string leads from them to different acceptance outcomes; otherwise they are **equivalent** and can be merged. The **minimisation algorithm** starts with the partition {accepting, non-accepting} and refines: two states in the same block are split if, on some symbol, they go to different blocks. Repeat until stable (at most $|Q|$ rounds; Hopcroft's refinement makes it $O(|Q| \\log |Q|)$). The blocks are the states of the **minimal DFA**, which is **unique** up to renaming: every DFA for the language collapses to the same one. That uniqueness is what makes equivalence of DFAs (and hence of regexes) decidable: minimise both and compare.

The **Myhill-Nerode theorem** lifts this from automata to languages. For a language $L$, call strings $x$ and $y$ **$L$-equivalent** if for every suffix $z$, $xz \\in L \\iff yz \\in L$: no continuation tells them apart. This is an equivalence relation on $\\Sigma^*$, and the theorem says: $L$ is regular **iff** it has finitely many classes, and the number of classes equals the number of states of the minimal DFA. The proof in one direction reads the classes as states (the DFA for $L$ *is* the quotient $\\Sigma^*/\\equiv_L$ with the obvious transitions); in the other, a DFA with $n$ states cannot separate more than $n$ classes.

Two consequences you will use constantly. **Lower bounds**: a **fooling set** is a set of strings that are pairwise distinguishable; its size lower-bounds the states of any DFA. The strings $0, 00, 000, \\dots$ form an infinite fooling set for $0^n1^n$ (distinguish $0^i$ from $0^j$ with suffix $1^i$), so it is not regular; and the $2^n$ strings of length $n$ form a fooling set for "$n$-th from last", proving the subset construction's blow-up is unavoidable. **Exactness**: unlike the pumping lemma, Myhill-Nerode is an if-and-only-if, so it never fails to decide.

Read Sipser's problem 1.52 (Myhill-Nerode) and Erickson's notes, implement minimisation on your library, and run it on the subset-construction outputs to see them collapse where they can and refuse to where they cannot.`,
          resources: [
            {
              title: 'Jeff Erickson — Models of Computation: Finite-State Automata (minimisation and Myhill-Nerode section)',
              url: 'https://jeffe.cs.illinois.edu/teaching/algorithms/models/03-automata.pdf',
              type: 'textbook',
              cost: 'free',
              provider: 'Jeff Erickson (UIUC)',
              primary: true,
            },
            {
              title: 'MIT 6.045J Automata, Computability, and Complexity (Spring 2011) — lecture notes on DFA minimisation',
              url: 'https://ocw.mit.edu/courses/6-045j-automata-computability-and-complexity-spring-2011/',
              type: 'course',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
            },
            {
              title: 'JFLAP — minimise DFA feature for checking your work',
              url: 'https://www.jflap.org/',
              type: 'tool',
              cost: 'free',
              provider: 'Duke University',
            },
          ],
          exercises: [
            {
              slug: 'minimise',
              title: 'Implement DFA minimisation',
              prompt:
                'Write minimise(dfa) by partition refinement (remove unreachable states first). Apply it to the product-construction DFAs and the subset-construction outputs from earlier lessons; report sizes before and after. Verify that minimising two different DFAs for the same language yields isomorphic results (write an isomorphism checker) and that minimise(minimise(d)) has the same size as minimise(d).',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'equivalence-checker',
              title: 'Regex equivalence',
              prompt:
                'Using parse -> Thompson -> subset -> minimise -> isomorphism, write equivalent(r1, r2). Test on known-equivalent pairs ((a|b)* vs (a*b*)*; (ab)*a vs a(ba)*) and non-equivalent ones. Then write a symmetric-difference check (product with XOR acceptance, test emptiness by reachability) and confirm the two methods agree on 100 random regex pairs.',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'myhill-nerode-proofs',
              title: 'Myhill-Nerode arguments',
              prompt:
                'Using fooling sets: (a) prove {0^n 1^n} and {ww} are not regular; (b) prove any DFA for "n-th symbol from the end is 1" needs 2^n states; (c) compute the exact number of Myhill-Nerode classes of "contains abb" over {a,b} and of "binary numbers divisible by 5", and confirm with your minimiser.',
              kind: 'derivation',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'When are two DFA states equivalent?',
              answerOutline: 'When no string leads from them to different acceptance outcomes; the minimal DFA merges all such states.',
            },
            {
              question: 'State the Myhill-Nerode theorem.',
              answerOutline: 'L is regular iff the relation "x ~ y when xz in L iff yz in L for all z" has finitely many classes; the number of classes is the minimal DFA size.',
            },
            {
              question: 'How does a fooling set give a lower bound on DFA size?',
              answerOutline: 'Pairwise distinguishable strings must reach distinct states, so any DFA has at least as many states as the fooling set has elements.',
            },
            {
              question: 'Why is equivalence of regular expressions decidable?',
              answerOutline: 'Convert both to minimal DFAs, which are unique up to isomorphism, and compare; or check emptiness of the symmetric difference.',
            },
          ],
        },
      ],
      project: {
        slug: 'regex-toolkit',
        title: 'Module project: a complete regular-language toolkit',
        description:
          'Assemble the module into a tested package: regex parser, Thompson construction, NFA simulation, subset construction, product/complement/reverse, minimisation, isomorphism, equivalence and inclusion checking, DFA-to-regex, and a pumping-lemma explorer. Reproduce Russ Cox\'s backtracking-versus-NFA timing graph and write a short document explaining, with Myhill-Nerode, why backreferences cannot be supported by the automaton approach.',
        deliverables: [
          'Package with property-based tests comparing every construction against brute-force enumeration',
          'A timing plot of your engine versus Python re on pathological patterns',
          'A two-page note on the limits of regular languages with three worked non-regularity proofs',
        ],
        estimatedHours: 10,
      },
    },
    {
      slug: 'context-free-languages',
      title: 'Context-Free Languages',
      description:
        'Grammars that generate nested structure, pushdown automata that recognise it, the CYK algorithm, the pumping lemma for context-free languages, and the boundary of what grammars can express.',
      lessons: [
        {
          slug: 'context-free-grammars',
          title: 'Context-free grammars and derivations',
          summary:
            'Grammars as recursive definitions of languages, derivations and parse trees, ambiguity, and designing grammars for nested and balanced structures.',
          estimatedMinutes: 100,
          objectives: [
            'Define a CFG formally and give leftmost derivations and parse trees for strings',
            'Design grammars for balanced parentheses, 0^n 1^n, palindromes, arithmetic expressions and simple programming constructs',
            'Define ambiguity, exhibit it with two parse trees, and rewrite an ambiguous expression grammar unambiguously with precedence',
            'Prove by induction on derivations that a grammar generates exactly a given language',
          ],
          concepts: [
            'CFG: variables, terminals, productions, start symbol',
            'Derivation, leftmost derivation, parse tree, yield',
            'Language of a grammar',
            'Ambiguity and inherently ambiguous languages',
            'Precedence and associativity via grammar layering',
            'Regular grammars as a special case',
            'Induction on derivation length / on parse tree height',
            'Grammars in compilers, data formats and natural language',
          ],
          explanation: `A **context-free grammar** is a recursive definition of a language written as rewriting rules: variables (nonterminals), terminals (the alphabet), productions $A \\to \\alpha$, and a start variable. $S \\to 0S1 \\mid \\varepsilon$ generates $\\{0^n 1^n\\}$, which no DFA can; $S \\to (S) \\mid SS \\mid \\varepsilon$ generates balanced parentheses. A **derivation** rewrites the start symbol step by step until only terminals remain; the **parse tree** records which rule expanded which variable, abstracting away the order; a **leftmost derivation** fixes the order and corresponds one-to-one with parse trees. The grammar's language is the set of yields of its parse trees.

Grammars are *the* notation for nested structure: a CFG can match brackets to arbitrary depth because a variable can appear inside its own expansion, which is exactly the memory a DFA lacks. Every programming language's syntax is (mostly) a CFG, as are JSON, XML and arithmetic. **Designing** a grammar is writing a recursive definition: identify the structures, give each a variable, write one rule per way of building it.

A grammar is **ambiguous** if some string has two parse trees. $E \\to E + E \\mid E \\times E \\mid n$ is ambiguous: $n + n \\times n$ parses two ways, and the parse tree is the meaning, so ambiguity is a real bug in a language definition. The fix is **layering**: $E \\to E + T \\mid T$, $T \\to T \\times F \\mid F$, $F \\to (E) \\mid n$ encodes precedence (× binds tighter) and left-associativity (recursion on the left). Some languages are **inherently ambiguous** (every grammar for them is), $\\{a^i b^j c^k : i = j \\text{ or } j = k\\}$ being the standard example; and whether a given grammar is ambiguous is undecidable, as module 4 will show.

**Proving** that a grammar generates exactly a language goes both ways: every derived string is in $L$ (induction on derivation length or tree height), and every string in $L$ has a derivation (induction on string length, usually by finding where to split). Read Sipser 2.1 or Barak's restricted-models chapter and Erickson's context-free notes; the exercises include a derivation enumerator that will later feed your parser.`,
          resources: [
            {
              title: 'Jeff Erickson — Models of Computation: Context-Free Languages',
              url: 'https://jeffe.cs.illinois.edu/teaching/algorithms/models/05-context-free.pdf',
              type: 'textbook',
              cost: 'free',
              provider: 'Jeff Erickson (UIUC)',
              primary: true,
            },
            {
              title: 'Introduction to Theoretical Computer Science (Barak) — Restricted computational models (context-free grammars)',
              url: 'https://introtcs.org/public/lec_08a_restricted_models.html',
              type: 'textbook',
              cost: 'free',
              provider: 'Boaz Barak',
            },
            {
              title: 'MIT 18.404J — Lecture 4: Pushdown automata, CFGs',
              url: 'https://ocw.mit.edu/courses/18-404j-theory-of-computation-fall-2020/',
              type: 'lecture',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
            },
            {
              title: 'Crafting Interpreters — Chapter 5: Representing Code (grammars for programmers)',
              url: 'https://craftinginterpreters.com/representing-code.html',
              type: 'textbook',
              cost: 'free',
              provider: 'Robert Nystrom',
              note: 'A practitioner\'s view of CFGs, precedence and ambiguity.',
            },
          ],
          exercises: [
            {
              slug: 'grammar-design',
              title: 'Design six grammars',
              prompt:
                'Write CFGs for: palindromes over {a,b}; {a^i b^j : i >= j}; strings with equal numbers of a and b; {a^i b^j c^k : i = j or j = k}; arithmetic expressions with + - * / parentheses and precedence (unambiguous); a mini-language of nested if/else with the dangling-else resolved. Write a generator that enumerates all strings derivable within n steps and check each grammar against a Python predicate for strings up to length 8.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'ambiguity-demo',
              title: 'Exhibit and remove ambiguity',
              prompt:
                'For E -> E + E | E * E | n, draw both parse trees for n + n * n and compute the value each tree gives with n = 2, 3, 4. Rewrite with precedence and associativity layers and show the string now has one tree. Then show that with right recursion T -> F * T the grammar is still unambiguous but * becomes right-associative; give a string where that changes the value with subtraction.',
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'grammar-correctness-proof',
              title: 'Prove a grammar correct',
              prompt:
                'Prove that S -> (S) | SS | epsilon generates exactly the balanced parentheses: (1) every derived string is balanced (induction on derivation length); (2) every balanced string is derivable (strong induction on length: split at the first point where the prefix count returns to zero).',
              kind: 'derivation',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What is the relationship between leftmost derivations and parse trees?',
              answerOutline: 'One-to-one: each parse tree has exactly one leftmost derivation; a string is ambiguous iff it has two parse trees (two leftmost derivations).',
            },
            {
              question: 'Why can a CFG generate 0^n 1^n while a DFA cannot?',
              answerOutline: 'The rule S -> 0S1 nests: each application of the rule matches one 0 with one 1 at unbounded depth, which needs a stack, not finite memory.',
            },
            {
              question: 'How does a grammar encode operator precedence?',
              answerOutline: 'Layer the variables (expression, term, factor): tighter-binding operators appear at deeper levels, so they are grouped first in any parse tree.',
            },
          ],
          relatedLessons: ['compilers/parsing/grammars-and-parse-trees'],
        },
        {
          slug: 'pushdown-automata',
          title: 'Pushdown automata',
          summary:
            'Finite automata with a stack, their equivalence with context-free grammars, and why nondeterministic PDAs are strictly stronger than deterministic ones.',
          estimatedMinutes: 100,
          objectives: [
            'Define a PDA formally and trace its configurations (state, remaining input, stack)',
            'Design PDAs for 0^n 1^n, palindromes and balanced parentheses, explaining the role of nondeterminism',
            'Sketch both directions of the CFG-PDA equivalence (grammar to PDA by leftmost simulation; PDA to grammar by the A_pq construction)',
            'Explain why deterministic PDAs recognise a strictly smaller class and what that means for parsing',
          ],
          concepts: [
            'PDA: transitions read input, pop and push stack symbols',
            'Configurations and acceptance by final state / empty stack',
            'Nondeterminism: guessing the middle of a palindrome',
            'CFG to PDA: simulate a leftmost derivation on the stack',
            'PDA to CFG: variables A_pq for stack-neutral computations',
            'Deterministic PDAs and DCFLs',
            'Palindromes are context-free but not deterministic context-free',
            'LL/LR parsing as deterministic PDAs (link to compilers)',
          ],
          explanation: `A **pushdown automaton** is an NFA with an unbounded **stack**. Each transition reads an input symbol (or $\\varepsilon$), pops a stack symbol (or nothing) and pushes a string, and the machine accepts if some path consumes the input and ends in an accepting state. The stack is exactly what matching nested structure needs: for $0^n 1^n$, push a marker per 0, pop one per 1, and accept on an empty stack; for balanced parentheses, push on "(" and pop on ")".

**Nondeterminism matters here.** For palindromes $ww^R$ the PDA pushes the first half, *guesses* the middle, then pops while matching the second half. No deterministic PDA can do this: it would have to know where the middle is. So, unlike finite automata, nondeterministic PDAs are **strictly more powerful** than deterministic ones; the deterministic context-free languages (DCFLs) are a proper subclass. This has practical weight: a compiler needs a deterministic parser running in linear time, so programming-language grammars are designed to be LL($k$) or LR($k$), which are precisely the grammars a deterministic PDA with bounded lookahead can parse (Compilers module 2).

**Equivalence with grammars** is the module's central theorem. *Grammar to PDA*: push the start symbol; repeatedly, if the top is a variable, nondeterministically replace it by the right-hand side of one of its rules (pushed in reverse); if it is a terminal, match it against the input and pop. The PDA thereby simulates a leftmost derivation, guessing which rule to use. *PDA to grammar*: after normalising the PDA (single accept state, empty stack at acceptance, each move either pushes or pops), introduce a variable $A_{pq}$ generating the strings that take the PDA from state $p$ to $q$ with the stack unchanged; the rules $A_{pq} \\to a A_{rs} b$ (push on entry, pop on exit) and $A_{pq} \\to A_{pr} A_{rq}$ (split) capture every such computation, by induction on its length. Read Sipser 2.2 carefully for this construction; it is a model of how to turn an operational definition into a generative one.

Implement a PDA simulator with set-of-configurations search (bounding stack depth per input length keeps it finite) and run the grammar-to-PDA conversion on your grammars from the previous lesson.`,
          resources: [
            {
              title: 'MIT 18.404J — Lecture 4-5: Pushdown automata, CFG-PDA equivalence',
              url: 'https://ocw.mit.edu/courses/18-404j-theory-of-computation-fall-2020/',
              type: 'lecture',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
              primary: true,
            },
            {
              title: 'Jeff Erickson — Models of Computation: Context-Free Languages (PDA section)',
              url: 'https://jeffe.cs.illinois.edu/teaching/algorithms/models/05-context-free.pdf',
              type: 'textbook',
              cost: 'free',
              provider: 'Jeff Erickson (UIUC)',
            },
            {
              title: 'Introduction to the Theory of Computation (Sipser) — Section 2.2',
              url: 'https://math.mit.edu/~sipser/book.html',
              type: 'textbook',
              cost: 'paid',
              provider: 'Michael Sipser',
              note: 'The A_pq construction is clearest here; the free lectures above cover the same proof.',
            },
            {
              title: 'JFLAP — pushdown automata editor and simulator',
              url: 'https://www.jflap.org/',
              type: 'tool',
              cost: 'free',
              provider: 'Duke University',
            },
          ],
          exercises: [
            {
              slug: 'pda-simulator',
              title: 'PDA simulator',
              prompt:
                'Implement a nondeterministic PDA simulator that explores the set of reachable configurations (state, input position, stack), bounding stack height by 2|w| + c to guarantee termination. Build PDAs for 0^n 1^n, balanced parentheses, and even-length palindromes; test against predicates on all strings of length <= 10. Report the largest configuration set encountered for the palindrome PDA.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'cfg-to-pda',
              title: 'Grammar to PDA',
              prompt:
                'Implement cfg_to_pda(grammar) via leftmost-derivation simulation and run it on your six grammars; verify the PDA agrees with the derivation enumerator on strings of length <= 8. Instrument the simulator to recover the sequence of rules chosen on an accepting path and print the resulting leftmost derivation.',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'apq-construction',
              title: 'The A_pq construction by hand',
              prompt:
                'Normalise your 0^n 1^n PDA (single accept, empties stack, push-or-pop moves) and carry out the PDA-to-CFG construction by hand, listing all A_pq variables and rules, then prune useless ones. Derive 0011 in the resulting grammar. Explain why the rule A_pq -> A_pr A_rq is needed.',
              kind: 'derivation',
              difficulty: 3,
            },
            {
              slug: 'deterministic-limits',
              title: 'Why palindromes need nondeterminism',
              prompt:
                'Argue informally but carefully that no deterministic PDA accepts even-length palindromes over {a,b}: consider inputs a^n b a^n versus a^n b a^n b a^n and what the machine must have done with its stack after reading a^n b. Then explain why programming languages avoid such constructs and what LL(1) lookahead buys.',
              kind: 'writing',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What does a PDA add to an NFA and what can it then do?',
              answerOutline: 'An unbounded stack; it can match nested or counted structure like 0^n 1^n and balanced brackets.',
            },
            {
              question: 'Why are nondeterministic PDAs more powerful than deterministic ones?',
              answerOutline: 'Languages like palindromes require guessing the middle; a deterministic machine cannot, and the DCFLs are a strict subclass.',
            },
            {
              question: 'How does a PDA simulate a grammar?',
              answerOutline: 'Keep the unexpanded part of a leftmost sentential form on the stack; expand variables by guessing rules, match terminals against the input.',
            },
            {
              question: 'What does the variable A_pq represent in the PDA-to-CFG construction?',
              answerOutline: 'All strings that take the PDA from state p to state q starting and ending with the same (empty) stack.',
            },
          ],
        },
        {
          slug: 'normal-forms-and-cyk-parsing',
          title: 'Chomsky normal form and the CYK algorithm',
          summary:
            'Transforming any grammar into Chomsky normal form, and the cubic-time dynamic-programming parser that decides membership for any context-free language.',
          estimatedMinutes: 100,
          objectives: [
            'Convert a grammar to Chomsky normal form step by step (start, epsilon, unit, long and terminal rules)',
            'Explain why CNF parse trees are binary and derivations of a length-n string have exactly 2n-1 steps',
            'Implement the CYK algorithm and recover a parse tree from its table',
            'Compare CYK\'s O(n^3 |G|) cost with linear-time deterministic parsers and explain the trade-off',
          ],
          concepts: [
            'Chomsky normal form: A -> BC, A -> a, S -> epsilon',
            'Elimination of epsilon rules, unit rules, long rules',
            'Derivations in CNF have length 2n - 1',
            'CYK: table[i][j] = variables deriving substring',
            'Dynamic programming over substrings',
            'Parse-tree recovery and counting parses (ambiguity detection for a string)',
            'Cost O(n^3) and why general CFL parsing is expensive',
            'Earley and GLR as general alternatives (mention)',
          ],
          explanation: `Context-free membership ("is $w$ in $L(G)$?") is decidable, but the obvious method, enumerate derivations, does not terminate on its own because $\\varepsilon$-rules and unit rules can lengthen derivations without lengthening the string. **Chomsky normal form** fixes that: every rule is $A \\to BC$ or $A \\to a$ (plus possibly $S \\to \\varepsilon$ with $S$ not on any right side). Every CFG converts to CNF by a fixed sequence: add a new start symbol; eliminate $\\varepsilon$-rules (for each nullable variable, add rule variants with it deleted); eliminate unit rules $A \\to B$ (copy $B$'s rules to $A$, transitively); break long right-hand sides into chains of binary rules; and replace terminals in binary rules by variables. Order matters, and the grammar can grow quadratically, but the result generates the same language. In CNF every parse tree is binary, so a string of length $n$ has a derivation of exactly $2n - 1$ steps and membership is decidable by bounded enumeration. That observation alone proves every CFL is decidable.

The efficient method is **CYK** (Cocke-Younger-Kasami), a dynamic program over substrings. Let $T[i][j]$ be the set of variables deriving $w_i \\cdots w_j$. Length-1 substrings come from terminal rules; for longer ones, try every split point $k$ and every rule $A \\to BC$ with $B \\in T[i][k]$, $C \\in T[k+1][j]$. The string is in the language iff $S \\in T[1][n]$. There are $O(n^2)$ cells, each costing $O(n |G|)$, so $O(n^3 |G|)$ total; storing back-pointers recovers a parse tree, and counting instead of set-union counts parse trees, which detects ambiguity *for that string*.

Cubic time is fine for sentences and too slow for a 100,000-line program, which is why compilers restrict to LL/LR grammars with linear-time deterministic parsers, and why general-purpose tools use Earley or GLR, which are also worst-case cubic but linear on unambiguous input. CYK remains the conceptual anchor: it is the proof that CFL membership is in P. Read Sipser 2.1 (CNF) and 7.2 (CYK as the P-membership proof), then implement both; the Lark library is a good reference parser to test against.`,
          resources: [
            {
              title: 'MIT 18.404J — Lecture 5 (CNF) and the CYK algorithm in the P lecture',
              url: 'https://ocw.mit.edu/courses/18-404j-theory-of-computation-fall-2020/',
              type: 'lecture',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
              primary: true,
            },
            {
              title: 'Jeff Erickson — Models of Computation: Context-Free Languages (normal forms, parsing)',
              url: 'https://jeffe.cs.illinois.edu/teaching/algorithms/models/05-context-free.pdf',
              type: 'textbook',
              cost: 'free',
              provider: 'Jeff Erickson (UIUC)',
            },
            {
              title: 'Lark — a parsing toolkit for Python (Earley and LALR parsers)',
              url: 'https://lark-parser.readthedocs.io/',
              type: 'tool',
              cost: 'free',
              provider: 'Lark',
              note: 'Use Lark\'s Earley parser as a reference to validate your CYK on the same grammars.',
            },
          ],
          exercises: [
            {
              slug: 'to-cnf',
              title: 'Chomsky normal form converter',
              prompt:
                'Implement to_cnf(grammar) with the five steps in order. Convert your expression grammar and the balanced-parentheses grammar; show the rule counts before and after. Verify with the derivation enumerator that the original and CNF grammars agree on all strings of length <= 7, and that every CNF derivation of a length-n string has 2n - 1 steps.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'cyk',
              title: 'CYK with parse-tree recovery',
              prompt:
                'Implement CYK over a CNF grammar returning membership, the number of parse trees, and one parse tree via back-pointers. Test on the expression grammar (ambiguous and unambiguous versions): for n+n*n the ambiguous grammar must report 2 trees and the layered grammar 1. Time CYK on strings of length 10, 20, 40, 80 and confirm the cubic growth ratio (about 8 per doubling).',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'cross-check-with-lark',
              title: 'Cross-check against a reference parser',
              prompt:
                'Encode the same expression grammar in Lark (Earley) and compare acceptance with your CYK on 1000 random strings over the terminals (half generated from the grammar, half random). Report any disagreement and resolve it. Compare timings and explain the difference.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What are the allowed rule forms in Chomsky normal form?',
              answerOutline: 'A -> BC (B, C non-start variables), A -> a (terminal), and optionally S -> epsilon.',
            },
            {
              question: 'Why does CNF make membership decidable by enumeration?',
              answerOutline: 'Every derivation of a length-n string has exactly 2n - 1 steps, so finitely many derivations need checking.',
            },
            {
              question: 'What does CYK compute in cell T[i][j] and what is its running time?',
              answerOutline: 'The set of variables deriving the substring from i to j; O(n^3 |G|).',
            },
          ],
        },
        {
          slug: 'cfl-pumping-and-non-context-free-languages',
          title: 'The pumping lemma for context-free languages and its limits',
          summary:
            'Why context-free languages pump in two places, the standard non-context-free languages, closure properties (and the failure of intersection), and the Chomsky hierarchy.',
          estimatedMinutes: 100,
          objectives: [
            'State the CFL pumping lemma and prove it from parse-tree height and the pigeonhole principle',
            'Prove a^n b^n c^n, ww and {a^i b^j c^k : i <= j <= k} are not context-free',
            'Prove closure of CFLs under union, concatenation, star and intersection with regular languages, and non-closure under intersection and complement',
            'Place regular, DCFL, CFL, context-sensitive and recursively enumerable languages in the Chomsky hierarchy with separating examples',
          ],
          concepts: [
            'CFL pumping lemma: w = uvxyz, |vxy| <= p, |vy| >= 1, u v^i x y^i z in L',
            'Proof via tall parse trees repeating a variable',
            'Standard non-CFLs: a^n b^n c^n, ww, cross-serial dependencies',
            'Closure under union, concatenation, star, substitution',
            'Closure under intersection with a regular language (product with a DFA)',
            'Non-closure under intersection and complement',
            'Chomsky hierarchy',
            'Why {a^n b^n c^n} matters: type checking, agreement, copy',
          ],
          explanation: `Context-free languages have their own **pumping lemma**: if $L$ is context-free, there is $p$ such that any $w \\in L$ with $|w| \\ge p$ splits as $w = uvxyz$ with $|vxy| \\le p$, $|vy| \\ge 1$, and $u v^i x y^i z \\in L$ for all $i \\ge 0$. Two pieces pump *in tandem*, which is what a stack can do and a finite memory cannot. The proof is pigeonhole on **parse trees**: in CNF, a long string has a tall tree; a path longer than the number of variables repeats some variable $A$; the subtree at the upper $A$ yields $vxy$ and the lower yields $x$, and replacing the lower by the upper (or the upper by the lower) pumps.

The standard non-context-free languages are the ones with **three** or **cross-serial** dependencies: $\\{a^n b^n c^n\\}$ (pumping two blocks unbalances the third), $\\{ww\\}$ (pumping breaks the copy), $\\{a^i b^j c^k : i \\le j \\le k\\}$. Each shows a capability real languages need and grammars lack: $ww$ is "a variable must be declared before use with the same name", $a^n b^n c^n$ is agreement across three constituents. That is why type checking and scoping are done *after* parsing, in semantic analysis.

**Closure properties** are a mixed bag. CFLs are closed under union, concatenation, star and substitution (combine the grammars) and under **intersection with a regular language** (run a DFA alongside the PDA in a product construction). But they are **not** closed under intersection: $\\{a^n b^n c^m\\} \\cap \\{a^m b^n c^n\\} = \\{a^n b^n c^n\\}$. Hence not under complement either (De Morgan would give intersection). The intersection-with-regular trick is often the cleanest way to prove non-context-freeness: intersect with $a^* b^* c^*$ to isolate the hard core.

These results place the CFLs in the **Chomsky hierarchy**: regular $\\subset$ DCFL $\\subset$ CFL $\\subset$ context-sensitive $\\subset$ recursively enumerable, with each inclusion proper and witnessed by a language from this module or the next. Read Sipser 2.3 and Erickson's notes; the exercises are proofs plus a pumping explorer for grammars.`,
          resources: [
            {
              title: 'MIT 18.404J — Lecture 6: CF pumping lemma, Turing machines',
              url: 'https://ocw.mit.edu/courses/18-404j-theory-of-computation-fall-2020/',
              type: 'lecture',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
              primary: true,
            },
            {
              title: 'Jeff Erickson — Models of Computation: Context-Free Languages (pumping and closure)',
              url: 'https://jeffe.cs.illinois.edu/teaching/algorithms/models/05-context-free.pdf',
              type: 'textbook',
              cost: 'free',
              provider: 'Jeff Erickson (UIUC)',
            },
            {
              title: 'Stanford CS103 — context-free languages unit',
              url: 'https://web.stanford.edu/class/cs103/',
              type: 'course',
              cost: 'free',
              provider: 'Stanford',
            },
          ],
          exercises: [
            {
              slug: 'cfl-pumping-proofs',
              title: 'Non-context-freeness proofs',
              prompt:
                'Prove not context-free: {a^n b^n c^n}; {ww : w in {a,b}*}; {a^i b^j c^k : i <= j <= k}; {a^(n^2)}; {a^p : p prime}. For ww choose w = a^p b^p a^p b^p and handle every placement of vxy. Then prove {a^n b^n c^m} and {a^m b^n c^n} are context-free (give grammars) and conclude non-closure under intersection.',
              kind: 'derivation',
              difficulty: 3,
            },
            {
              slug: 'cfl-closure-constructions',
              title: 'Closure constructions in code',
              prompt:
                'Implement union, concatenation and star of grammars, and intersection of a grammar with a DFA (triple-product construction on a CNF grammar: variables (p, A, q)). Verify each with the enumerator against predicates on strings of length <= 7. Use the intersection construction to compute a grammar for balanced parentheses with at most depth 2 (intersect with a regular depth-tracking DFA? discuss why depth is not regular and instead intersect with "no three consecutive open brackets").',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'chomsky-hierarchy-table',
              title: 'Chomsky hierarchy table',
              prompt:
                'Make a table with rows regular, DCFL, CFL, context-sensitive, decidable, recognisable: the machine model, the grammar type, a language in the class but not the previous one, which closure properties hold (union, intersection, complement, star), and whether membership is decidable and at what cost. Justify each separating example in one sentence.',
              kind: 'writing',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'How does the CFL pumping lemma differ from the regular one and why?',
              answerOutline: 'Two substrings v and y pump together (u v^i x y^i z) because the repetition comes from a variable repeated along a parse-tree path, generating matched pieces on both sides.',
            },
            {
              question: 'Give a language that is the intersection of two CFLs but is not context-free.',
              answerOutline: '{a^n b^n c^n} = {a^n b^n c^m} intersect {a^m b^n c^n}.',
            },
            {
              question: 'Why are CFLs closed under intersection with a regular language?',
              answerOutline: 'A product construction runs a DFA in the finite control of the PDA alongside the stack.',
            },
            {
              question: 'Why is "variables must be declared before use" not enforced by the grammar?',
              answerOutline: 'It requires matching an unbounded copy (like ww), which is not context-free, so it is checked in semantic analysis.',
            },
          ],
        },
      ],
      project: {
        slug: 'grammar-toolkit',
        title: 'Module project: a grammar toolkit and parser',
        description:
          'Build a package for context-free grammars: parsing a grammar from text, derivation enumeration, ambiguity detection on bounded strings, CNF conversion, CYK with parse-tree recovery and parse counting, CFG-to-PDA with a PDA simulator, and the closure constructions. Use it to write and validate an unambiguous grammar for a small expression-and-statement language, then produce parse trees for sample programs and compare with a Lark grammar.',
        deliverables: [
          'A tested package exposing grammar, CNF, CYK, PDA and closure operations',
          'A grammar for a small language with evidence (bounded enumeration) that it is unambiguous and a note on which constructs required layering',
          'A benchmark of CYK versus Lark Earley and LALR on the same inputs with a short discussion',
        ],
        estimatedHours: 10,
      },
    },
    {
      slug: 'turing-machines-and-computability',
      title: 'Turing Machines and Computability',
      description:
        'The Turing machine as the definition of algorithm, its variants and their equivalence, the Church-Turing thesis, universal machines, and the distinction between decidable and recognisable languages.',
      lessons: [
        {
          slug: 'the-turing-machine',
          title: 'The Turing machine',
          summary:
            'Formal definition, configurations, how to describe machines at three levels of detail, and the first machines you build and run.',
          estimatedMinutes: 110,
          objectives: [
            'Give the formal definition of a Turing machine and trace its configurations on an input',
            'Build Turing machines for 0^n 1^n, palindromes, binary increment and copying, and run them in a simulator',
            'Distinguish accepting, rejecting and looping, and define deciders versus recognisers',
            'Describe machines at the formal, implementation and high-level descriptions and know when each is appropriate',
          ],
          concepts: [
            'TM: states, tape alphabet with blank, transition function (state, symbol) -> (state, symbol, L/R)',
            'Configuration u q v and the yields relation',
            'Accept, reject, loop; halting',
            'Decider (always halts) vs recogniser',
            'Turing-decidable and Turing-recognisable languages',
            'Levels of description',
            'Marking symbols and zig-zag algorithms',
            'TMs as the definition of algorithm',
          ],
          explanation: `A **Turing machine** is a finite control plus an infinite tape and a read/write head. At each step it reads the symbol under the head and, according to its state, writes a symbol, moves left or right, and changes state. Formally: states $Q$, input alphabet $\\Sigma$, tape alphabet $\\Gamma \\supset \\Sigma$ containing the blank, transition function $\\delta : Q \\times \\Gamma \\to Q \\times \\Gamma \\times \\{L, R\\}$, start, accept and reject states. A **configuration** $u\\,q\\,v$ records tape contents, state and head position; the machine's run is the sequence of configurations. It **accepts** by entering the accept state, **rejects** by entering the reject state, and otherwise **loops** forever. That third outcome is new, and it is the whole story of this module and the next.

A machine that always halts is a **decider**; its language is **decidable**. A machine that may loop on strings outside its language is a **recogniser**; its language is **recognisable** (recursively enumerable). Every decidable language is recognisable; module 4 shows the converse fails.

Despite its simplicity, the TM can do anything a computer can, and building a few makes you believe it. $0^n 1^n$: zig-zag, crossing off one 0 and one 1 per pass, rejecting if one kind runs out first. Palindromes: compare and erase the two ends, moving inward. Binary increment: go to the right end and propagate a carry leftward. Copying a string: mark each symbol, carry it to the end, return. The recurring techniques are **marking** symbols with new tape letters and **sweeping** back and forth; they cost quadratic time, which does not matter for computability and matters a lot for complexity.

Sipser's three **levels of description** are your writing guide: the *formal* description (full transition table) only for the simplest machines; the *implementation* level (English describing head movement and tape contents) for proofs about machine constructions; the *high-level* description (an algorithm, trusting that it can be implemented) once you have earned it. Read Sipser 3.1 or Barak chapter 7, build the machines in Morphett's simulator or your own, and write at least one at each level.`,
          resources: [
            {
              title: 'Introduction to Theoretical Computer Science (Barak) — Chapter 7: Loops and infinity (Turing machines)',
              url: 'https://introtcs.org/public/lec_06_loops.html',
              type: 'textbook',
              cost: 'free',
              provider: 'Boaz Barak',
              primary: true,
            },
            {
              title: 'Jeff Erickson — Models of Computation: Turing Machines',
              url: 'https://jeffe.cs.illinois.edu/teaching/algorithms/models/06-turing-machines.pdf',
              type: 'textbook',
              cost: 'free',
              provider: 'Jeff Erickson (UIUC)',
            },
            {
              title: 'Anthony Morphett — online Turing machine simulator',
              url: 'https://morphett.info/turing/turing.html',
              type: 'interactive',
              cost: 'free',
              provider: 'Anthony Morphett',
              note: 'Write machines as transition tables and step through them; several examples included.',
            },
            {
              title: 'MIT 18.404J — Lecture 6-7: Turing machines, variants',
              url: 'https://ocw.mit.edu/courses/18-404j-theory-of-computation-fall-2020/',
              type: 'lecture',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
            },
            {
              title: 'Turing, On Computable Numbers (1936) — the original paper',
              url: 'https://www.cs.virginia.edu/~robins/Turing_Paper_1936.pdf',
              type: 'article',
              cost: 'free',
              provider: 'Alan Turing (scanned)',
              note: 'Read sections 1-3 to see the machine defined by its inventor; the rest is for the universal-machine lesson.',
            },
          ],
          exercises: [
            {
              slug: 'tm-simulator',
              title: 'Write a Turing machine simulator',
              prompt:
                'Implement a TM class from a transition table with a tape stored as a dict (default blank), run(w, max_steps) returning accept/reject/timeout plus step count and the list of configurations. Build machines for 0^n 1^n, palindromes over {a,b}, binary increment and copying w to w#w. Test each on all inputs of length <= 8 (and increment on 0..255) and tabulate steps versus input length to see the quadratic sweeps.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'three-levels',
              title: 'Describe a machine at three levels',
              prompt:
                'For the language {a^i b^j c^k : i x j = k} (multiplication check), write a high-level description, an implementation-level description (what is marked, how the head moves), and the formal transition table for the simplest sub-routine (e.g. "find the next unmarked b"). Implement the full machine and test against the predicate for i, j <= 4.',
              kind: 'writing',
              difficulty: 3,
            },
            {
              slug: 'looping-machine',
              title: 'A machine that loops',
              prompt:
                'Construct a TM that accepts strings starting with 1, rejects strings starting with 0, and loops forever on the empty string. Run it in the simulator with a step bound and observe the three outcomes. Explain why it is a recogniser and not a decider, and modify it minimally into a decider for the same language.',
              kind: 'coding',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'What are the three possible outcomes of running a TM on an input?',
              answerOutline: 'Accept, reject, or loop forever; a decider never loops.',
            },
            {
              question: 'What is the difference between decidable and recognisable?',
              answerOutline: 'Decidable: some TM halts on every input with the right answer. Recognisable: some TM accepts exactly the members but may loop on non-members.',
            },
            {
              question: 'What is a configuration and why is the notion useful?',
              answerOutline: 'Tape contents, state and head position (u q v); the run is a sequence of configurations, which is what reductions and the Cook-Levin theorem encode.',
            },
          ],
        },
        {
          slug: 'variants-and-the-church-turing-thesis',
          title: 'Variants of Turing machines and the Church-Turing thesis',
          summary:
            'Multi-tape, nondeterministic and other variants all compute the same functions; lambda calculus, RAM machines and your favourite language too; and what the Church-Turing thesis claims.',
          estimatedMinutes: 100,
          objectives: [
            'Prove that multi-tape TMs are equivalent to single-tape TMs and bound the slowdown',
            'Prove that nondeterministic TMs are equivalent to deterministic ones (breadth-first simulation)',
            'Explain why counter machines, RAM models, lambda calculus and Python are all Turing-equivalent',
            'State the Church-Turing thesis precisely, say why it is a thesis not a theorem, and distinguish it from its complexity-theoretic extended version',
          ],
          concepts: [
            'Multi-tape TM and its single-tape simulation (quadratic slowdown)',
            'Nondeterministic TM; computation tree; breadth-first simulation (exponential)',
            'Enumerators and recognisability',
            'Two-counter machines, RAM machines',
            'Lambda calculus and the Church encoding',
            'Programming languages as Turing-complete models',
            'Church-Turing thesis; extended (polynomial-time) thesis',
            'Robustness of the class of computable functions',
          ],
          explanation: `The Turing machine looks arbitrary: why one tape, why one head, why determinism? The answer is that none of it matters. A **multi-tape** machine (convenient for copying and comparing) is simulated by a single tape that stores all tapes interleaved with marked head positions, at the cost of a sweep per step: quadratic slowdown, no loss of power. A **nondeterministic** TM, which may branch at each step and accepts if some branch accepts, is simulated deterministically by exploring the computation tree **breadth-first** (depth-first could dive into an infinite branch): exponential slowdown, no loss of power. An **enumerator**, which prints strings forever, generates exactly the recognisable languages (enumerate and check; or dovetail over inputs and steps). Every variant that has been proposed, and every reasonable extension, lands on the same class of computable functions.

So do completely different formalisms. **Counter machines** with two counters, **random-access machines** with registers and indirect addressing (the model under all algorithm analysis), Church's **lambda calculus** (pure function abstraction and application, with numbers and booleans encoded as functions), Post systems, cellular automata, and every general-purpose **programming language**: each simulates a TM and is simulated by one. Barak's book builds this up carefully with NAND-TM and NAND-RAM programs; Erickson's universal-models notes cover the classical ones.

This robustness is the evidence for the **Church-Turing thesis**: every function that is computable by any effective procedure is computable by a Turing machine. It is a *thesis*, not a theorem, because "effective procedure" is an informal notion; it is a claim that the formal definition captures the intuitive one, supported by every model ever proposed agreeing. No one has found a counterexample in ninety years. Its **extended** form, that every physically realisable model can be simulated with only polynomial slowdown, is a much stronger and more contested claim; quantum computers are the one serious challenge, as module 7 discusses.

The practical upshot for this subject: from here on, describe algorithms in high-level pseudocode or Python and trust that they are Turing machines. Read Sipser 3.2-3.3 and Barak chapter 8, and do the simulation proofs; they are the last time you will touch a transition table.`,
          resources: [
            {
              title: 'Introduction to Theoretical Computer Science (Barak) — Chapter 8: Equivalent models of computation',
              url: 'https://introtcs.org/public/lec_07_other_models.html',
              type: 'textbook',
              cost: 'free',
              provider: 'Boaz Barak',
              primary: true,
            },
            {
              title: 'Jeff Erickson — Models of Computation: Universal Models and Nondeterministic Turing Machines',
              url: 'https://jeffe.cs.illinois.edu/teaching/algorithms/models/08-universal.pdf',
              type: 'textbook',
              cost: 'free',
              provider: 'Jeff Erickson (UIUC)',
            },
            {
              title: 'Raul Rojas — A Tutorial Introduction to the Lambda Calculus',
              url: 'https://arxiv.org/abs/1503.09060',
              type: 'article',
              cost: 'free',
              provider: 'arXiv',
              note: 'Ten readable pages: Church numerals, booleans, recursion via the Y combinator.',
            },
            {
              title: 'MIT 18.404J — Lecture 7: TM variants, Church-Turing thesis',
              url: 'https://ocw.mit.edu/courses/18-404j-theory-of-computation-fall-2020/',
              type: 'lecture',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
            },
          ],
          exercises: [
            {
              slug: 'multitape-simulation',
              title: 'Simulate a multi-tape machine on one tape',
              prompt:
                'Extend your simulator to k-tape machines, build a 2-tape palindrome checker (copy, then compare in reverse) and compare its step count with the single-tape version on inputs of length 10..200. Then implement the generic single-tape simulation of a 2-tape machine (interleaved tracks with head marks) and verify the quadratic slowdown empirically by fitting the step counts.',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'ntm-breadth-first',
              title: 'Nondeterministic TM simulation',
              prompt:
                'Add nondeterministic transitions (a set of options per (state, symbol)) and simulate by breadth-first search over configurations with a step bound. Build an NTM for {ww^R} that guesses the middle, and one for composite numbers in unary that guesses a factor. Measure the number of configurations explored versus input length and explain why depth-first would be wrong.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'lambda-calculus-numerals',
              title: 'Church numerals in Python',
              prompt:
                'Using only lambda expressions in Python, define Church numerals 0-5, successor, addition, multiplication, booleans, if-then-else, and the predecessor function; convert to Python ints to test. Then define factorial with the Y combinator (use the Z combinator to avoid eager evaluation) and compute factorial of 5. Write a paragraph on why this shows the lambda calculus is as powerful as a TM for arithmetic.',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'church-turing-essay',
              title: 'What the Church-Turing thesis does and does not claim',
              prompt:
                'In one page: state the thesis, explain why it cannot be proved, summarise the evidence, give two things it does not claim (about efficiency; about physical computability), and explain how the extended Church-Turing thesis relates to quantum computing.',
              kind: 'writing',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'How is a multi-tape TM simulated by a single-tape TM and at what cost?',
              answerOutline: 'Store all tapes on one tape with head markers and sweep to collect symbols each step; quadratic slowdown.',
            },
            {
              question: 'Why must the simulation of a nondeterministic TM be breadth-first?',
              answerOutline: 'Some branches may loop forever; depth-first could get stuck in one and never reach an accepting branch.',
            },
            {
              question: 'Why is the Church-Turing thesis not a theorem?',
              answerOutline: 'It equates a formal notion (TM-computable) with an informal one (effectively computable); only the formal side can be proved about.',
            },
            {
              question: 'Name four models equivalent to Turing machines.',
              answerOutline: 'Multi-tape/nondeterministic TMs, RAM machines, lambda calculus, two-counter machines, any general programming language.',
            },
          ],
        },
        {
          slug: 'universal-machines-and-encodings',
          title: 'Encodings and the universal Turing machine',
          summary:
            'How machines are encoded as strings, the universal machine that simulates any other, and why a stored-program computer is a mathematical consequence rather than an engineering trick.',
          estimatedMinutes: 100,
          objectives: [
            'Encode Turing machines, graphs, grammars and other objects as strings and explain the notation <M, w>',
            'Explain what a universal Turing machine does and sketch how it is built',
            'Implement a universal machine (interpreter) for your TM encoding and run machines through it',
            'Connect universality to interpreters, compilers, virtual machines and self-reference',
          ],
          concepts: [
            'Encoding objects as strings: <M>, <G>, <M, w>',
            'The set of valid encodings is decidable',
            'Universal TM U: on <M, w> simulates M on w',
            'Construction: tapes for description, simulated tape, state',
            'Overhead of universal simulation',
            'Code as data: interpreters, virtual machines',
            'Self-reference and the recursion theorem (preview)',
            'A_TM as the first recognisable language',
          ],
          explanation: `Because a Turing machine is a finite object (a transition table), it can be written down as a **string**: list the states, the alphabet and the transitions in a fixed format. We write $\\langle M \\rangle$ for the encoding of $M$, and $\\langle M, w \\rangle$ for a machine paired with an input. Graphs, grammars, polynomials and anything else finite get encodings too, and a decision problem about such objects becomes a language of encodings: $E_{DFA} = \\{\\langle A \\rangle : A \\text{ is a DFA with } L(A) = \\emptyset\\}$. Checking that a string *is* a valid encoding is always decidable, so we may assume inputs are well-formed.

The decisive step is Turing's **universal machine** $U$: given $\\langle M, w \\rangle$, it simulates $M$ on $w$, accepting, rejecting or looping exactly as $M$ does. Its construction is an interpreter: one tape holds $\\langle M \\rangle$, one holds $M$'s simulated tape, one holds $M$'s current state; each simulated step looks up the transition in the description and updates the tape and state. The simulation costs a lookup per step, so $U$ runs in time polynomial (in fact roughly linear times $|\\langle M \\rangle|$) in $M$'s running time. The existence of $U$ means **code is data**: one fixed machine can run any program given as input. That is the stored-program computer, the interpreter, the virtual machine and the operating-system loader, discovered as a theorem in 1936 before any of them were built.

$U$ shows that $A_{TM} = \\{\\langle M, w \\rangle : M \\text{ accepts } w\\}$ is **recognisable**: run $U$ and accept if it accepts. It does not show $A_{TM}$ is decidable, because $U$ loops when $M$ loops. The next module proves that no machine can do better, and that proof requires exactly the ability to feed a machine its own description, $\\langle M, \\langle M \\rangle \\rangle$, which universality makes meaningful.

Build $U$ yourself: an interpreter for your own TM encoding, in Python, that can run every machine from lesson 1 given as a string. It is short, and it is the single most illuminating program in this subject. Read Sipser 3.3 and 4.2 (the first part), Barak chapter 9 (sections on universality), and Turing's paper sections 5-7 if you are curious how he did it with a single tape.`,
          resources: [
            {
              title: 'Introduction to Theoretical Computer Science (Barak) — Chapter 9: Universality and uncomputability (universality sections)',
              url: 'https://introtcs.org/public/lec_08_uncomputability.html',
              type: 'textbook',
              cost: 'free',
              provider: 'Boaz Barak',
              primary: true,
            },
            {
              title: 'Turing, On Computable Numbers (1936) — sections 5-7: the universal machine',
              url: 'https://www.cs.virginia.edu/~robins/Turing_Paper_1936.pdf',
              type: 'article',
              cost: 'free',
              provider: 'Alan Turing (scanned)',
            },
            {
              title: 'MIT 18.404J — Lecture 8: Decidability, the universal TM',
              url: 'https://ocw.mit.edu/courses/18-404j-theory-of-computation-fall-2020/',
              type: 'lecture',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
            },
            {
              title: 'Jeff Erickson — Models of Computation: Universal Models',
              url: 'https://jeffe.cs.illinois.edu/teaching/algorithms/models/08-universal.pdf',
              type: 'textbook',
              cost: 'free',
              provider: 'Jeff Erickson (UIUC)',
            },
          ],
          exercises: [
            {
              slug: 'encode-and-decode',
              title: 'An encoding for Turing machines',
              prompt:
                'Design a string encoding <M> over {0, 1} for your TM class (unary-coded state and symbol indices separated by delimiters is fine). Write encode(M) and decode(s) with decode raising on invalid strings, and is_valid_encoding(s). Round-trip every machine from this module and count how many strings of length <= 20 are valid encodings.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'universal-machine',
              title: 'Build the universal machine',
              prompt:
                'Write universal(code, w, max_steps) that decodes <M> and simulates M on w, using only string operations on the encoding (no Python objects for M beyond parsing position). Run all your lesson-1 machines through it and confirm identical verdicts and step counts to the direct simulator. Then run universal on <universal-as-a-TM>? Explain why that is harder (you would need to write U itself as a transition table) and estimate its size.',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'decidable-encoding-problems',
              title: 'Decidable problems about encodings',
              prompt:
                'Implement deciders for A_DFA (does DFA A accept w), E_DFA (is L(A) empty: reachability), EQ_DFA (via symmetric difference), and A_CFG (via CYK on CNF). Each takes encodings as input. Prove each is decidable in a few sentences and note the running time. Then explain why the same approach for A_TM only yields a recogniser.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What does the universal Turing machine do?',
              answerOutline: 'On input <M, w>, simulates M on w and produces the same outcome (accept, reject or loop).',
            },
            {
              question: 'Why does the existence of U show that A_TM is recognisable but not that it is decidable?',
              answerOutline: 'U accepts exactly when M accepts w, but if M loops, U loops too; a decider would have to detect looping.',
            },
            {
              question: 'What everyday technologies are instances of universality?',
              answerOutline: 'Interpreters, virtual machines, stored-program computers, emulators: one fixed program executes arbitrary programs given as data.',
            },
          ],
        },
        {
          slug: 'countability-and-uncomputable-functions',
          title: 'Decidable, recognisable and co-recognisable languages; why most languages are not recognisable',
          summary:
            'The structure of the recognisable languages, the theorem that decidable = recognisable and co-recognisable, and the counting argument that almost every language is beyond any Turing machine.',
          estimatedMinutes: 90,
          objectives: [
            'Prove that a language is decidable iff both it and its complement are recognisable',
            'Prove that the set of Turing machines is countable and the set of languages is uncountable',
            'Conclude that uncomputable languages exist and explain what "almost all" means here',
            'Prove closure of decidable languages under complement, union, intersection, concatenation and star, and of recognisable languages under union, intersection, concatenation, star but not complement',
          ],
          concepts: [
            'Recognisable, co-recognisable, decidable',
            'Decidable iff recognisable and co-recognisable (run both in parallel)',
            'Dovetailing',
            'Countability of strings, machines and programs',
            'Uncountability of languages (power set of Sigma*)',
            'Existence of unrecognisable languages by counting',
            'Closure properties of decidable and recognisable classes',
            'Diagonalisation preview',
          ],
          explanation: `Recognisers can loop, and the asymmetry between "accept" and "fail to accept" structures the whole theory. Call $L$ **co-recognisable** if its complement is recognisable. The key theorem: **$L$ is decidable iff $L$ is both recognisable and co-recognisable.** One direction is trivial (a decider for $L$ with accept and reject swapped decides $\\overline{L}$). For the other, run the recogniser for $L$ and the recogniser for $\\overline{L}$ **in parallel** (alternate one step each on two tapes); exactly one of them accepts every input, so the combination always halts. This "run both and see which finishes" trick, **dovetailing**, is the standard way to combine machines that might loop, and you will use it to show a language is recognisable by searching over an infinite space in a fair order.

Now count. Strings over a finite alphabet are **countable** (list by length then alphabetically), so machines, which are strings, are countable; so are Python programs. But a language is a subset of $\\Sigma^*$, and the set of all subsets of a countably infinite set is **uncountable** (Cantor; Discrete Mathematics module 2). Therefore there are *more languages than machines*, and some language, indeed almost every language in the measure-theoretic sense, is **not recognisable** by any machine. This is the cleanest possible proof that uncomputable problems exist, and it tells you nothing about *which* problems; the next module's diagonalisation produces a specific one.

**Closure properties** reflect the asymmetry. Decidable languages are closed under complement, union, intersection, concatenation and star (combine deciders; for concatenation and star, nondeterministically guess the split, or try all splits since the deciders halt). Recognisable languages are closed under union (run both in parallel), intersection (run both to completion), concatenation and star (dovetail over splits), but **not complement**: if they were, every recognisable language would be co-recognisable, hence decidable, and $A_{TM}$ will be the counterexample.

Read Sipser 4.2 (the beginning) and Barak chapter 9's counting section; the exercises make you implement dovetailing and a concrete enumeration of machines.`,
          resources: [
            {
              title: 'Introduction to Theoretical Computer Science (Barak) — Chapter 9: uncomputable functions exist (counting argument)',
              url: 'https://introtcs.org/public/lec_08_uncomputability.html',
              type: 'textbook',
              cost: 'free',
              provider: 'Boaz Barak',
              primary: true,
            },
            {
              title: 'MIT 18.404J — Lecture 8-9: Decidability, undecidability',
              url: 'https://ocw.mit.edu/courses/18-404j-theory-of-computation-fall-2020/',
              type: 'lecture',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
            },
            {
              title: 'Jeff Erickson — Models of Computation: Undecidability',
              url: 'https://jeffe.cs.illinois.edu/teaching/algorithms/models/07-undecidable.pdf',
              type: 'textbook',
              cost: 'free',
              provider: 'Jeff Erickson (UIUC)',
            },
          ],
          exercises: [
            {
              slug: 'dovetail',
              title: 'Dovetailing in code',
              prompt:
                'Write parallel_run(machines, w) that steps a list of TMs round-robin and returns which one accepts first (or never). Use it to build a decider for L from a recogniser for L and one for its complement (take L = strings with more 1s than 0s and write deliberately looping recognisers for L and its complement). Then write a recogniser for "w is a substring of some element of an enumerated infinite language" by dovetailing over the enumeration.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'enumerate-machines',
              title: 'Enumerate all Turing machines',
              prompt:
                'Using your encoding, write a generator yielding every valid TM encoding in order of length, and count machines with encoding length <= 30. Explain why this generator proves machines are countable. Then write the diagonal language definition D = {<M_i> : M_i does not accept <M_i>} in code as a predicate and explain why you cannot implement it as a terminating function.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'closure-proofs',
              title: 'Closure proofs for decidable and recognisable languages',
              prompt:
                'Prove that recognisable languages are closed under union, intersection, concatenation and star (describe the machines; dovetail where necessary), and that decidable languages are additionally closed under complement. Then prove the theorem that L is decidable iff L and its complement are recognisable, and explain why this shows recognisable languages cannot be closed under complement if some recognisable language is undecidable.',
              kind: 'derivation',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'State the theorem relating decidable, recognisable and co-recognisable.',
              answerOutline: 'L is decidable iff both L and its complement are recognisable; proof by running both recognisers in parallel.',
            },
            {
              question: 'Why do unrecognisable languages exist?',
              answerOutline: 'Machines are countable (finite strings), languages are uncountable (subsets of Sigma*); so most languages have no machine.',
            },
            {
              question: 'Which closure property fails for recognisable languages and why must it?',
              answerOutline: 'Complement; otherwise every recognisable language would be co-recognisable and hence decidable, contradicting undecidability of A_TM.',
            },
          ],
          relatedLessons: ['discrete-mathematics/sets-functions-relations/cardinality-and-infinity'],
        },
      ],
      project: {
        slug: 'turing-machine-workbench',
        title: 'Module project: a Turing machine workbench',
        description:
          'Build a complete TM environment: a transition-table format, a multi-tape and nondeterministic simulator with configuration tracing, a universal machine operating on encodings, a small library of machines (arithmetic, string operations, deciders for DFA/CFG problems), and a visualiser that renders tape history. Measure step counts for each machine as a function of input size and fit the growth.',
        deliverables: [
          'Simulator package with tests for every machine on exhaustive small inputs',
          'The universal machine with a demonstration of running the library through it',
          'A report with step-count growth plots and a discussion of the single-tape versus multi-tape slowdown',
        ],
        estimatedHours: 10,
      },
    },
    {
      slug: 'undecidability-and-reductions',
      title: 'Undecidability and Reductions',
      description:
        'The halting problem and diagonalisation, mapping reductions as the tool for spreading undecidability, Rice\'s theorem, undecidable problems about grammars and tilings, and a glimpse of Godel.',
      lessons: [
        {
          slug: 'the-halting-problem',
          title: 'The halting problem and diagonalisation',
          summary:
            'The proof that no program can decide whether an arbitrary program halts, why it is Cantor\'s diagonal argument in disguise, and what it means for software tools.',
          estimatedMinutes: 100,
          objectives: [
            'Prove that A_TM is undecidable by diagonalisation and reconstruct the proof from memory',
            'Prove that HALT_TM is undecidable using A_TM, and explain why the standard proof is a reduction',
            'Exhibit a language that is not recognisable (the complement of A_TM) and one that is neither recognisable nor co-recognisable',
            'Explain the consequences for compilers, verifiers and malware detectors, and what they do instead',
          ],
          concepts: [
            'A_TM = {<M, w> : M accepts w}',
            'Diagonalisation: the machine D that does the opposite of M on <M>',
            'Self-application <M, <M>>',
            'HALT_TM and its undecidability',
            'Complement of A_TM is not recognisable',
            'Languages outside recognisable union co-recognisable (EQ_TM)',
            'Why static analysis must approximate',
            'The halting problem in Python terms',
          ],
          explanation: `Here is the theorem that founded the subject: **$A_{TM}$ is undecidable.** Suppose a decider $H$ exists: $H(\\langle M, w \\rangle)$ accepts if $M$ accepts $w$, rejects otherwise, and always halts. Build $D$: on input $\\langle M \\rangle$, run $H(\\langle M, \\langle M \\rangle \\rangle)$ and do the **opposite** (reject if $H$ accepts, accept if $H$ rejects). $D$ is a legitimate machine, so feed it its own description: $D(\\langle D \\rangle)$ accepts iff $H$ says $D$ does not accept $\\langle D \\rangle$ iff $D$ does not accept $\\langle D \\rangle$. Contradiction. No $H$ exists.

This is Cantor's diagonal argument with machines as rows, inputs as columns, and $D$ as the flipped diagonal; in Python, it is \`def D(src): return not H(src, src)\` applied to its own source. The construction needs universality (to run $H$ on an encoding) and self-reference (to pass $D$ its own code), which is why the previous module built both.

**The halting problem** $HALT_{TM} = \\{\\langle M, w \\rangle : M \\text{ halts on } w\\}$ follows: if $HALT$ were decidable, decide $A_{TM}$ by first checking that $M$ halts on $w$ (if not, reject) and then running $M$ to see whether it accepts. That argument, "if you could decide $B$, you could decide $A$, but you cannot decide $A$", is a **reduction**, the subject of the next lesson. It is also the form every undecidability proof from now on takes; the diagonal argument is done once.

Two further consequences. $A_{TM}$ is recognisable (via $U$) but undecidable, so by the previous module's theorem $\\overline{A_{TM}}$ is **not recognisable**: there is no procedure that confirms, even eventually, that a machine does *not* accept an input. And $EQ_{TM}$ (do two machines accept the same language?) is neither recognisable nor co-recognisable.

For practice this means every tool that answers a non-trivial question about program behaviour (does it terminate? is this code reachable? is this malware?) must **approximate**: answer "yes/no/unknown", restrict the programs it accepts, or be wrong sometimes. Type checkers, static analysers, and compiler optimisers are engineered around the halting problem, not in ignorance of it. Read Sipser 4.2 and Barak chapter 9, and write the proof three times until it is yours.`,
          resources: [
            {
              title: 'Introduction to Theoretical Computer Science (Barak) — Chapter 9: Universality and uncomputability (halting problem)',
              url: 'https://introtcs.org/public/lec_08_uncomputability.html',
              type: 'textbook',
              cost: 'free',
              provider: 'Boaz Barak',
              primary: true,
            },
            {
              title: 'MIT 18.404J — Lecture 9: Undecidability, diagonalisation',
              url: 'https://ocw.mit.edu/courses/18-404j-theory-of-computation-fall-2020/',
              type: 'lecture',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
            },
            {
              title: 'Jeff Erickson — Models of Computation: Undecidability',
              url: 'https://jeffe.cs.illinois.edu/teaching/algorithms/models/07-undecidable.pdf',
              type: 'textbook',
              cost: 'free',
              provider: 'Jeff Erickson (UIUC)',
            },
            {
              title: 'Turing, On Computable Numbers (1936) — section 8: the diagonal argument',
              url: 'https://www.cs.virginia.edu/~robins/Turing_Paper_1936.pdf',
              type: 'article',
              cost: 'free',
              provider: 'Alan Turing (scanned)',
            },
          ],
          exercises: [
            {
              slug: 'halting-in-python',
              title: 'The halting problem in Python',
              prompt:
                'Write the diagonal program concretely: assume a function halts(src, inp) -> bool exists (stub it with a timeout-based heuristic), write D(src) that loops if halts(src, src) else returns, and apply D to its own source (use inspect.getsource). Show the contradiction in the comments. Then run your heuristic halts on 20 small programs including one that halts only after 10^9 steps and record the false answers.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'write-the-proof-three-ways',
              title: 'The undecidability proof, three ways',
              prompt:
                'Write the proof that A_TM is undecidable (a) as a direct diagonalisation, (b) as a table with machines as rows and encodings as columns, marking the diagonal, (c) as a proof that the recognisable languages are not closed under complement (using the decidable iff recognisable and co-recognisable theorem). Then prove HALT_TM undecidable from A_TM.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'classify-languages',
              title: 'Classify four languages',
              prompt:
                'For A_TM, its complement, HALT_TM, and EQ_TM state whether each is decidable, recognisable, co-recognisable, and justify: for recognisability describe the recogniser (dovetail if needed); for non-recognisability use the closure theorem; for EQ_TM reduce both A_TM and its complement to it (sketch).',
              kind: 'problem',
              difficulty: 3,
            },
            {
              slug: 'static-analysis-approximation',
              title: 'What static analysers do instead',
              prompt:
                'Pick a real tool (a Python linter, a type checker, or a termination checker) and find a correct program it rejects and a wrong program it accepts (or a case it reports as unknown). Write one page explaining, with reference to the halting problem, why the tool must behave this way and how it chooses which side to err on.',
              kind: 'writing',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Reconstruct the diagonalisation proof that A_TM is undecidable in four sentences.',
              answerOutline: 'Assume decider H. Build D that on <M> runs H on <M, <M>> and does the opposite. Run D on <D>: it accepts iff it does not accept. Contradiction, so H does not exist.',
            },
            {
              question: 'Why is the complement of A_TM not recognisable?',
              answerOutline: 'A_TM is recognisable; if its complement were too, A_TM would be decidable (run both in parallel), which it is not.',
            },
            {
              question: 'How does the halting problem constrain program-analysis tools?',
              answerOutline: 'No tool can decide a non-trivial behavioural property for all programs; tools approximate, restrict inputs, or return unknown.',
            },
          ],
        },
        {
          slug: 'mapping-reductions',
          title: 'Mapping reductions',
          summary:
            'The formal definition of a reduction, the direction that trips everyone up, and a toolkit of reductions from A_TM to emptiness, regularity and equivalence problems.',
          estimatedMinutes: 110,
          objectives: [
            'Define mapping (many-one) reducibility A <=_m B and prove its basic consequences for decidability and recognisability',
            'Construct reductions from A_TM to HALT_TM, E_TM, REGULAR_TM and EQ_TM, writing the computable map explicitly',
            'Get the direction right: to show B hard, reduce a known-hard A to B',
            'Use reductions to show languages are not recognisable (reduce from the complement of A_TM)',
          ],
          concepts: [
            'Computable function; mapping reduction A <=_m B: w in A iff f(w) in B',
            'If B decidable then A decidable; if A undecidable then B undecidable',
            'Same for recognisable; reductions and complements',
            'The "build a machine that ignores its input" trick',
            'E_TM is undecidable (via complement, since E_TM is co-recognisable)',
            'REGULAR_TM, EQ_TM',
            'Turing reductions versus mapping reductions',
            'Reductions are programs: implement them',
          ],
          explanation: `A **mapping reduction** from $A$ to $B$, written $A \\le_m B$, is a **computable** function $f$ with $w \\in A \\iff f(w) \\in B$ for all $w$. It converts questions about $A$ into questions about $B$. Consequences are immediate: if $B$ is decidable, so is $A$ (compute $f$, ask $B$); contrapositively, if $A$ is undecidable, so is $B$. The same holds with "recognisable". And since $f$ also reduces $\\overline{A}$ to $\\overline{B}$, a reduction from $\\overline{A_{TM}}$ shows a language is not recognisable.

**Direction** is the thing to get right, and it is backwards from intuition: to prove the *new* problem $B$ hard, you reduce the *known* hard problem $A$ *to* $B$, showing $B$ is at least as hard. Writing "assume $B$ decidable; here is how to decide $A$" is the same thing phrased as a proof by contradiction, and it is a fine way to think, but the map $f$ must go from instances of $A$ to instances of $B$.

The workhorse construction is **a machine that ignores its input**. To reduce $A_{TM}$ to $E_{TM} = \\{\\langle M \\rangle : L(M) = \\emptyset\\}$: given $\\langle M, w \\rangle$, output $\\langle M_w \\rangle$ where $M_w$ on any input $x$ runs $M$ on $w$ and accepts iff $M$ accepts $w$. Then $L(M_w)$ is $\\Sigma^*$ if $M$ accepts $w$ and $\\emptyset$ otherwise, so $\\langle M, w \\rangle \\in A_{TM} \\iff \\langle M_w \\rangle \\notin E_{TM}$. That is a reduction to the *complement* of $E_{TM}$, which suffices for undecidability (decidability is closed under complement) and additionally shows $E_{TM}$ is not recognisable (since $\\overline{A_{TM}}$ reduces to it). For **REGULAR$_{TM}$** build $M_w$ that accepts $0^n1^n$ strings outright and accepts everything else iff $M$ accepts $w$; then $L(M_w)$ is regular iff $M$ accepts $w$. For **EQ$_{TM}$** pair $M_w$ with a machine accepting everything.

Note what $f$ does: it writes *source code* for a new machine, which is why reductions are programs and you should implement them. Note also what $f$ does not do: it never runs $M$; it only produces a description. **Turing reductions** (allowing the decider for $B$ to be called as an oracle, any number of times) are more general and are what the "assume a decider exists" phrasing literally gives; for this module mapping reductions suffice and are preferable because they also transfer recognisability. Read Sipser 5.1 and 5.3, Barak 9.4-9.5, and implement every reduction as a function from encodings to encodings, tested on your universal machine.`,
          resources: [
            {
              title: 'MIT 18.404J — Lecture 10: Reducibility',
              url: 'https://ocw.mit.edu/courses/18-404j-theory-of-computation-fall-2020/',
              type: 'lecture',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
              primary: true,
            },
            {
              title: 'Introduction to Theoretical Computer Science (Barak) — Chapter 9: reductions (sections 9.4-9.5)',
              url: 'https://introtcs.org/public/lec_08_uncomputability.html',
              type: 'textbook',
              cost: 'free',
              provider: 'Boaz Barak',
            },
            {
              title: 'Jeff Erickson — Models of Computation: Undecidability (reductions section)',
              url: 'https://jeffe.cs.illinois.edu/teaching/algorithms/models/07-undecidable.pdf',
              type: 'textbook',
              cost: 'free',
              provider: 'Jeff Erickson (UIUC)',
            },
            {
              title: 'Introduction to the Theory of Computation (Sipser) — Chapter 5',
              url: 'https://math.mit.edu/~sipser/book.html',
              type: 'textbook',
              cost: 'paid',
              provider: 'Michael Sipser',
              note: 'The canonical presentation of mapping reductions; the free lecture videos above follow it.',
            },
          ],
          exercises: [
            {
              slug: 'implement-reductions',
              title: 'Implement four reductions',
              prompt:
                'Using your TM encoding, write Python functions reduce_ATM_to_HALT(<M, w>), reduce_ATM_to_coE(<M, w>) (producing M_w), reduce_ATM_to_REGULAR, and reduce_ATM_to_EQ, each returning encodings. Verify on small machines with your universal simulator: e.g. for M accepting w, L(M_w) should accept every test string; for M rejecting w, none. Do not run M inside the reduction; only build descriptions.',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'reduction-proofs',
              title: 'Write the reduction proofs',
              prompt:
                'Prove undecidable, each by an explicit mapping reduction with both directions of the iff argued: HALT_TM; E_TM (and show it is not recognisable); REGULAR_TM; EQ_TM (and show it is neither recognisable nor co-recognisable, by reducing both A_TM and its complement to it); the problem "does M accept the empty string?"; the problem "does M ever write the symbol 1?".',
              kind: 'derivation',
              difficulty: 3,
            },
            {
              slug: 'direction-drills',
              title: 'Direction drills',
              prompt:
                'For each statement decide whether it is valid and explain: "A <=_m B and A undecidable implies B undecidable"; "A <=_m B and B undecidable implies A undecidable"; "A <=_m B and A recognisable implies B recognisable"; "A <=_m complement of A implies A is decidable or neither recognisable nor co-recognisable"; "every decidable language reduces to every non-trivial language". Give counterexamples for the invalid ones.',
              kind: 'problem',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Define A <=_m B and state what it implies about decidability.',
              answerOutline: 'A computable f with w in A iff f(w) in B. B decidable implies A decidable; A undecidable implies B undecidable (and the same with recognisable).',
            },
            {
              question: 'To prove a new problem B undecidable, which direction is the reduction?',
              answerOutline: 'From a known undecidable A to B: A <=_m B.',
            },
            {
              question: 'Sketch the reduction from A_TM to the complement of E_TM.',
              answerOutline: 'Map <M, w> to <M_w> where M_w ignores its input and accepts iff M accepts w; L(M_w) is non-empty iff M accepts w.',
            },
            {
              question: 'Why does a reduction never run the input machine M?',
              answerOutline: 'It must be a computable (total) function; running M might loop. It only constructs a description.',
            },
          ],
        },
        {
          slug: 'rices-theorem-and-the-recursion-theorem',
          title: 'Rice\'s theorem and the recursion theorem',
          summary:
            'Every non-trivial semantic property of programs is undecidable, proved once and for all; and the recursion theorem that lets programs refer to themselves.',
          estimatedMinutes: 100,
          objectives: [
            'State Rice\'s theorem precisely, distinguishing semantic from syntactic properties and trivial from non-trivial ones',
            'Prove Rice\'s theorem by reduction from A_TM',
            'Apply Rice\'s theorem correctly to classify decision problems about programs, and recognise when it does not apply',
            'State the recursion theorem and use it to give a short proof that A_TM is undecidable and to write a self-printing program',
          ],
          concepts: [
            'Semantic (language) property vs syntactic property',
            'Trivial property: holds for all or no recognisable languages',
            'Rice\'s theorem: every non-trivial semantic property is undecidable',
            'Proof via M_w and a witness machine',
            'Misapplications: properties of the machine, not the language',
            'Self-reproducing programs (quines)',
            'Recursion theorem: a machine can obtain its own description',
            'Applications: fixed points, viruses, a two-line undecidability proof',
          ],
          explanation: `Each reduction in the last lesson had the same shape, so there should be a theorem that does them all at once. **Rice's theorem**: let $P$ be any property of recognisable languages that is **non-trivial** (some recognisable language has it, some does not). Then $\\{\\langle M \\rangle : L(M) \\text{ has } P\\}$ is undecidable. The proof: assume without loss of generality that $\\emptyset$ does not have $P$ (otherwise use the complement); pick a machine $M_P$ with $L(M_P) \\in P$. Reduce $A_{TM}$: map $\\langle M, w \\rangle$ to $M'$ which on input $x$ first runs $M$ on $w$, and if that accepts, runs $M_P$ on $x$. Then $L(M') = L(M_P) \\in P$ if $M$ accepts $w$, and $L(M') = \\emptyset \\notin P$ otherwise. Done, in general.

The power and the danger are both in the word **semantic**. Rice's theorem is about properties of the *language* $L(M)$: "accepts the empty string", "is regular", "is infinite", "equals $L(M_2)$", "contains a palindrome". It says nothing about properties of the *machine*: "has 17 states", "ever moves left", "halts within 1000 steps on input $\\varepsilon$" are decidable (the last by simulation), and "halts on every input" is undecidable but is not a language property, so Rice does not apply and a separate reduction is needed. Before invoking Rice, check: is the property determined by $L(M)$ alone, and is it non-trivial? Misapplication is the most common error in this part of the subject.

The **recursion theorem** formalises self-reference: for any computable $t(\\langle M \\rangle, w)$ there is a machine $R$ with $R(w) = t(\\langle R \\rangle, w)$. Informally, any program may use "obtain my own source code" as an instruction. The construction is the classic **quine** trick: a part $A$ that prints $B$, and a part $B$ that reads what $A$ printed and reconstructs $A$ from it; write a quine in Python and you have seen the proof. Consequences: a two-line proof that $A_{TM}$ is undecidable ("$R$: get $\\langle R \\rangle$, run the supposed decider on $\\langle R, w \\rangle$, do the opposite"), the existence of self-replicating programs, and fixed-point theorems used in logic. Read Sipser 5.3 (Rice is problem 5.28) and 6.1; Barak covers Rice in chapter 9.`,
          resources: [
            {
              title: 'Introduction to Theoretical Computer Science (Barak) — Chapter 9: Rice\'s theorem',
              url: 'https://introtcs.org/public/lec_08_uncomputability.html',
              type: 'textbook',
              cost: 'free',
              provider: 'Boaz Barak',
              primary: true,
            },
            {
              title: 'MIT 18.404J — Lecture 11: Recursion theorem and logic',
              url: 'https://ocw.mit.edu/courses/18-404j-theory-of-computation-fall-2020/',
              type: 'lecture',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
            },
            {
              title: 'MIT 6.045J (Spring 2011) — notes on Rice\'s theorem and the recursion theorem',
              url: 'https://ocw.mit.edu/courses/6-045j-automata-computability-and-complexity-spring-2011/',
              type: 'course',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
            },
          ],
          exercises: [
            {
              slug: 'rice-applications',
              title: 'Apply (or refuse to apply) Rice',
              prompt:
                'For each problem about a TM M, say whether Rice\'s theorem applies and conclude or give a direct argument: L(M) contains 0101; L(M) is finite; L(M) is decidable; M has an even number of states; M halts on input epsilon within 100 steps; M halts on every input; L(M) = L(M) (trivially); M accepts some string of length 5; M writes a blank over a non-blank symbol at some point on input epsilon.',
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'rice-proof',
              title: 'Prove Rice\'s theorem',
              prompt:
                'Write the full proof of Rice\'s theorem including the complement step for the case where the empty language has the property. Then instantiate it in code: write rice_reduce(M, w, M_P) producing the encoding of M\' from the proof, and verify with your universal machine on two properties ("accepts 11" and "accepts some even-length string") with small witness machines.',
              kind: 'derivation',
              difficulty: 3,
            },
            {
              slug: 'quines',
              title: 'Quines and the recursion theorem',
              prompt:
                'Write a Python quine (a program that prints its own source exactly) without reading its file. Then write a program that prints its own source reversed, and one that prints its own length. Explain how the A/B two-part construction in the recursion theorem corresponds to the structure of your quine.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'recursion-theorem-proofs',
              title: 'Proofs with the recursion theorem',
              prompt:
                'Using the recursion theorem, give short proofs that (a) A_TM is undecidable, (b) MIN_TM (machines with no shorter equivalent) is not recognisable, (c) there is a machine that outputs its own description. Explain in each case where the "obtain own description" instruction is used.',
              kind: 'derivation',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'State Rice\'s theorem.',
              answerOutline: 'Any property of the language of a TM that is non-trivial (some recognisable languages have it, some do not) is undecidable.',
            },
            {
              question: 'Give a decidable property of Turing machines and explain why Rice does not apply.',
              answerOutline: '"M has fewer than 10 states" or "M halts within 100 steps on epsilon": these depend on the machine, not its language.',
            },
            {
              question: 'What does the recursion theorem allow a program to do?',
              answerOutline: 'Obtain its own description as if by an instruction, enabling self-reference; proved by the quine construction.',
            },
          ],
        },
        {
          slug: 'undecidable-problems-beyond-machines',
          title: 'Undecidability beyond machines: PCP, grammars, tilings and Godel',
          summary:
            'Undecidability spreads from Turing machines to combinatorial puzzles, grammars, tilings and number theory, and Godel\'s incompleteness theorem is its logical shadow.',
          estimatedMinutes: 100,
          objectives: [
            'State the Post correspondence problem and explain the idea of its undecidability proof (encoding computation histories)',
            'Use PCP or computation histories to show that ambiguity of CFGs and emptiness of CFG intersection are undecidable',
            'State the undecidability of the tiling problem, Hilbert\'s tenth problem and the word problem for groups as examples beyond computing',
            'Explain Godel\'s first incompleteness theorem as a consequence of undecidability and the relationship between provability and recognisability',
          ],
          concepts: [
            'Post correspondence problem (PCP)',
            'Computation histories as strings',
            'Reduction of A_TM to PCP via histories (sketch)',
            'Undecidable CFG problems: ambiguity, intersection emptiness, universality',
            'Wang tiles and the domino problem',
            'Hilbert\'s tenth problem (Matiyasevich)',
            'Godel: provable statements are recognisable; truth is not',
            'Consequences for automated reasoning',
          ],
          explanation: `Undecidability is not confined to questions about machines. The **Post correspondence problem** gives a finite set of dominoes, each with a top string and a bottom string, and asks whether some sequence of dominoes (repetition allowed) yields the same string on top and bottom. It is a puzzle with no machines in sight, and it is undecidable. The proof encodes a **computation history** of $M$ on $w$ (the sequence of configurations $C_0 \\# C_1 \\# \\cdots$) as a match: dominoes copy the configuration from top to bottom while advancing it by one transition, so a complete match exists iff $M$ accepts $w$. The history technique is the second great tool after mapping reductions: any problem that can express "this string is a valid accepting history" is undecidable.

With PCP in hand, undecidability spreads to **grammars**. Given a PCP instance, build two grammars generating the top and bottom concatenations with the domino indices appended; their intersection is non-empty iff the instance has a match, so emptiness of CFG intersection is undecidable; their union is ambiguous iff a match exists, so **ambiguity of a CFG is undecidable**, which is why parser generators reject grammars rather than decide it. Universality of a CFG ($L(G) = \\Sigma^*$) and equivalence of CFGs are also undecidable via histories, in contrast to the decidable DFA versions.

Further afield: whether a finite set of **Wang tiles** can tile the plane is undecidable (Berger, 1966; the proof embeds Turing machines in tilings and incidentally produced the first aperiodic tile sets); whether a polynomial equation with integer coefficients has an integer solution (**Hilbert's tenth problem**) is undecidable (Matiyasevich, 1970); the **word problem** for finitely presented groups is undecidable. Each is a theorem of its own field that turns out to be the halting problem in disguise.

Finally, **Gödel**. Fix a sound formal system for arithmetic (Peano axioms). The set of provable statements is recognisable (enumerate proofs). If every true statement were provable, truth would be recognisable, and then "$M$ does not halt on $w$" (a true statement when it is true) would be recognisable, making $HALT$ decidable. So some true statement is unprovable: **incompleteness**, derived from undecidability in a paragraph. Read Sipser 5.2 and 6.2 and Barak chapter 11; the exercises include a PCP solver, which is a bounded search that must sometimes fail to answer.`,
          resources: [
            {
              title: 'MIT 18.404J — Lecture 10-11: PCP, computation histories, Godel',
              url: 'https://ocw.mit.edu/courses/18-404j-theory-of-computation-fall-2020/',
              type: 'lecture',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
              primary: true,
            },
            {
              title: 'Introduction to Theoretical Computer Science (Barak) — Chapter 11: Is every theorem provable?',
              url: 'https://introtcs.org/public/lec_09_godel.html',
              type: 'textbook',
              cost: 'free',
              provider: 'Boaz Barak',
            },
            {
              title: 'Jeff Erickson — Models of Computation: Undecidability (PCP and histories)',
              url: 'https://jeffe.cs.illinois.edu/teaching/algorithms/models/07-undecidable.pdf',
              type: 'textbook',
              cost: 'free',
              provider: 'Jeff Erickson (UIUC)',
            },
            {
              title: 'The Busy Beaver Challenge',
              url: 'https://bbchallenge.org/',
              type: 'interactive',
              cost: 'free',
              provider: 'bbchallenge collaboration',
              note: 'A live example of undecidability in practice: deciding halting for every 5-state machine took a decade of collaborative proof.',
            },
          ],
          exercises: [
            {
              slug: 'pcp-solver',
              title: 'A bounded PCP solver',
              prompt:
                'Write pcp(dominoes, max_len) that searches for a match by BFS over partial matches (track the unmatched overhang). Solve the classic instances from Sipser (e.g. {(b, ca), (a, ab), (ca, a), (abc, c)}) and report the match. Construct an instance with no match that your solver cannot refute within the bound, and explain why no bound suffices in general.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'histories-to-pcp',
              title: 'Encode a computation history',
              prompt:
                'For your 0^n 1^n Turing machine and input 01, write out the accepting computation history as a string C_0 # C_1 # ... # C_k, then construct the PCP dominoes of the A_TM-to-PCP reduction (copy dominoes, transition dominoes, start and end dominoes) and verify with your solver that a match exists. Change the input to 011 and verify none is found within a generous bound.',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'cfg-undecidability-proofs',
              title: 'Undecidable grammar problems',
              prompt:
                'Prove that CFG intersection-emptiness and CFG ambiguity are undecidable by reduction from PCP: construct the grammars G_top and G_bottom explicitly for a given instance, implement the construction, and use your CYK/enumerator to find the ambiguous string for the Sipser instance. Then explain why universality of CFGs is undecidable but universality of DFAs is not.',
              kind: 'derivation',
              difficulty: 3,
            },
            {
              slug: 'godel-from-halting',
              title: 'Incompleteness from undecidability',
              prompt:
                'Write a one-page proof of Godel\'s first incompleteness theorem from the undecidability of the halting problem, stating the assumptions (sound, effectively axiomatised system in which "M halts on w" statements are expressible). Then discuss: does this show the specific unprovable sentence is true? What does "sound" buy over "consistent"?',
              kind: 'writing',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'What is a computation history and how is it used in undecidability proofs?',
              answerOutline: 'The sequence of configurations of a machine on an input; a problem that can check "this string is an accepting history" can encode A_TM.',
            },
            {
              question: 'Why is ambiguity of context-free grammars undecidable?',
              answerOutline: 'PCP reduces to it: the union of the top and bottom grammars for an instance is ambiguous iff a match exists.',
            },
            {
              question: 'How does undecidability imply incompleteness?',
              answerOutline: 'Provable statements are recognisable; if all true statements were provable, non-halting would be recognisable and HALT decidable.',
            },
          ],
        },
      ],
      project: {
        slug: 'undecidability-casebook',
        title: 'Module project: an undecidability casebook',
        description:
          'Write a casebook of ten undecidable problems (mix of machine, grammar, puzzle and mathematical problems), each with a precise statement, the reduction or theorem that proves undecidability, the direction of the reduction made explicit, its status as recognisable / co-recognisable / neither, and, where feasible, an implemented reduction tested on your universal machine. Include a bounded solver for PCP and a demonstration of a problem instance it cannot settle.',
        deliverables: [
          'A typeset casebook of ten problems with proofs and classifications',
          'Implemented, tested reductions for at least four of them',
          'A PCP solver with examples solved and an unsettled instance explained',
        ],
        estimatedHours: 10,
      },
    },
    {
      slug: 'complexity-classes',
      title: 'Complexity Classes',
      description:
        'From computable to efficiently computable: time complexity on Turing machines, the class P and why it is robust, NP via verifiers and nondeterminism, co-NP, EXPTIME, and the time hierarchy theorem.',
      lessons: [
        {
          slug: 'time-complexity-and-the-class-p',
          title: 'Time complexity and the class P',
          summary:
            'Measuring time on Turing machines, why polynomial time is the right notion of feasible, model independence up to polynomials, and problems in P.',
          estimatedMinutes: 100,
          objectives: [
            'Define TIME(t(n)) and P, and analyse the time of simple Turing machines versus RAM algorithms',
            'Explain the polynomial slowdown between reasonable models and why that justifies P as model-independent',
            'Place PATH, RELPRIME, CFL membership and linear programming in P with justification',
            'Explain the role of input encoding (unary versus binary) in complexity claims',
          ],
          concepts: [
            'Worst-case running time as a function of input length',
            'TIME(t(n)) and the class P = union of TIME(n^k)',
            'Single-tape vs multi-tape vs RAM: polynomial relationships',
            'Polynomial time as the formalisation of "feasible"',
            'Cobham-Edmonds thesis',
            'Examples in P: PATH, RELPRIME (Euclid), A_CFG (CYK), primality (AKS)',
            'Encoding matters: unary numbers make pseudo-polynomial algorithms look polynomial',
            'Why P is closed under composition',
          ],
          explanation: `Computability ignores cost; complexity theory puts it back. For a decider $M$, its **running time** $t(n)$ is the maximum number of steps on any input of length $n$. $\\mathrm{TIME}(t(n))$ is the class of languages decided in $O(t(n))$ steps by a single-tape TM, and **P** is the union over all polynomials: languages decidable in time $O(n^k)$ for some $k$.

The definition depends on the model, but only up to polynomials. A multi-tape machine's $t(n)$ becomes $O(t(n)^2)$ on one tape; a RAM machine with reasonable word sizes is simulated with polynomial overhead; and your Python code, measured in operations on numbers of bounded size, is polynomially related to all of them. So P is the same class under every reasonable deterministic model, which is what makes it worth naming. The **Cobham-Edmonds thesis** goes further and claims P captures "feasibly computable". The claim is debatable at the edges ($n^{100}$ is in P; $2^{n/1000}$ is not) but it has proved remarkably useful: natural problems in P tend to have small exponents, and natural problems outside P tend to be really hard.

Membership in P is shown by exhibiting an algorithm and analysing it. $\\mathrm{PATH}$ (is there a path from $s$ to $t$ in a directed graph?) is in P by BFS; $\\mathrm{RELPRIME}$ (are $x$ and $y$ coprime?) by Euclid, in time polynomial in the *number of bits*; $A_{CFG}$ by CYK; primality by the AKS algorithm (2002), after decades of only randomised or conjectural methods; linear programming by the ellipsoid or interior-point methods, though not by the simplex method, which is exponential in the worst case despite being fast in practice.

That last example points at the recurring subtlety of **encoding**. Running time is measured against input *length*, so numbers must be encoded in binary (length $\\log x$), not unary (length $x$). Trial division up to $\\sqrt{x}$ takes time $2^{n/2}$ in the number of bits $n$: exponential, not polynomial, even though it is polynomial in $x$. Algorithms polynomial in the *value* of a number but exponential in its *length* are **pseudo-polynomial**; knapsack by dynamic programming is the classic case. Read Sipser 7.1-7.2 and Barak chapter 12-13, and measure in the exercises.`,
          resources: [
            {
              title: 'Introduction to Theoretical Computer Science (Barak) — Chapter 13: Modeling running time',
              url: 'https://introtcs.org/public/lec_11_running_time.html',
              type: 'textbook',
              cost: 'free',
              provider: 'Boaz Barak',
              primary: true,
            },
            {
              title: 'Introduction to Theoretical Computer Science (Barak) — Chapter 12: Efficient computation, an informal introduction',
              url: 'https://introtcs.org/public/lec_10_efficient_alg.html',
              type: 'textbook',
              cost: 'free',
              provider: 'Boaz Barak',
            },
            {
              title: 'MIT 18.404J — Lecture 12: Time complexity, P',
              url: 'https://ocw.mit.edu/courses/18-404j-theory-of-computation-fall-2020/',
              type: 'lecture',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
            },
            {
              title: 'Computational Complexity: A Modern Approach (Arora and Barak) — draft, Chapter 1',
              url: 'https://theory.cs.princeton.edu/complexity/book.pdf',
              type: 'textbook',
              cost: 'free',
              provider: 'Sanjeev Arora and Boaz Barak',
              note: 'The free draft of the graduate text; chapter 1 is a careful account of the model and P.',
            },
          ],
          exercises: [
            {
              slug: 'tm-vs-ram-time',
              title: 'Turing machine time versus Python time',
              prompt:
                'Measure the step count of your single-tape 0^n 1^n machine and your 2-tape version for n = 10..500 and fit polynomials to each (expect ~n^2 and ~n). Then time a Python one-liner for the same check and fit. Write a paragraph relating the three exponents to the polynomial-overhead claims of the lesson.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'unary-vs-binary',
              title: 'Encoding and pseudo-polynomial time',
              prompt:
                'Implement trial-division primality and measure time against the number of bits of the input for 10- to 40-bit numbers (prime inputs); fit an exponential in bits. Implement the dynamic-programming subset-sum algorithm O(n T) and show it is fast when T is given in unary and exponential when T is a 30-bit number. Explain which of these is "in P" and why the encoding decides it.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'membership-in-p-proofs',
              title: 'Prove membership in P',
              prompt:
                'For PATH, RELPRIME, A_CFG, "is the graph bipartite", and "is the DFA language empty": give the algorithm, state the input encoding, and bound the running time as a polynomial in the input length. For RELPRIME, prove that Euclid uses O(n) divisions on n-bit inputs and that each division is polynomial in n.',
              kind: 'derivation',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Define the class P.',
              answerOutline: 'Languages decidable by a deterministic TM in time O(n^k) for some constant k; equivalently, polynomial time on any reasonable deterministic model.',
            },
            {
              question: 'Why is P considered model-independent?',
              answerOutline: 'All reasonable deterministic models simulate each other with polynomial overhead, and polynomials are closed under composition.',
            },
            {
              question: 'Why is trial-division primality not a polynomial-time algorithm?',
              answerOutline: 'Its running time is about sqrt(x) = 2^(n/2) in the number of bits n; polynomial in the value, exponential in the length.',
            },
          ],
        },
        {
          slug: 'the-class-np',
          title: 'The class NP: verifiers and nondeterminism',
          summary:
            'NP defined two ways, via polynomial-time verifiers with certificates and via nondeterministic polynomial time, with the proof that the definitions agree and a gallery of problems in NP.',
          estimatedMinutes: 100,
          objectives: [
            'Define NP via polynomial-time verifiers and certificates, and exhibit certificates for SAT, CLIQUE, HAMPATH, SUBSET-SUM and COMPOSITES',
            'Define NTIME and NP via nondeterministic machines and prove equivalence with the verifier definition',
            'Explain P subset NP subset EXPTIME and why the second inclusion is a brute-force search',
            'Distinguish NP from "non-polynomial" and from co-NP, and state what membership in NP does and does not claim',
          ],
          concepts: [
            'Verifier V(x, c) running in time polynomial in |x|; certificate / witness',
            'NP = languages with polynomial-time verifiers',
            'NTIME and nondeterministic TMs; NP = union NTIME(n^k)',
            'Equivalence: guess the certificate / record the choices',
            'P subset NP subset EXPTIME',
            'Gallery: SAT, 3SAT, CLIQUE, VERTEX-COVER, HAMPATH, SUBSET-SUM, COMPOSITES',
            'co-NP and the asymmetry of certificates',
            'Search versus decision; self-reducibility',
          ],
          explanation: `Many problems have the property that a solution is **easy to check** even if hard to find. Is this graph Hamiltonian? Hard to tell, but if someone hands you the cycle, you verify it in linear time. That is **NP**: a language $L$ is in NP if there is a polynomial-time **verifier** $V$ and a polynomial $p$ such that $x \\in L$ iff there exists a **certificate** $c$ with $|c| \\le p(|x|)$ and $V(x, c)$ accepts. The certificate for SAT is a satisfying assignment; for CLIQUE, the clique; for SUBSET-SUM, the subset; for COMPOSITES, a factor. Note the asymmetry: the certificate proves *yes* instances; there is no requirement that *no* instances be checkable.

The historical definition uses **nondeterministic** machines: NP is the union of $\\mathrm{NTIME}(n^k)$, languages accepted by an NTM in polynomial time along every branch. The two definitions coincide: an NTM can *guess* the certificate symbol by symbol then run the verifier; conversely, the sequence of nondeterministic choices on an accepting branch *is* a certificate that a deterministic verifier can replay. Nondeterminism is guessing, and NP is "guess-and-check in polynomial time".

**P $\\subseteq$ NP** (ignore the certificate) and **NP $\\subseteq$ EXPTIME** (try all $2^{p(n)}$ certificates): membership in NP guarantees a brute-force exponential algorithm, nothing better, nothing worse. Whether the first inclusion is strict is the P versus NP problem; the second is also open, though at least one of the two must be strict by the time hierarchy theorem (lesson 4 of this module).

Common confusions, named so you avoid them. NP does not mean "non-polynomial"; it means nondeterministic polynomial, and P is inside it. A problem in NP is not necessarily hard; PATH and PRIMES are in NP and in P. **co-NP** is the class of complements: TAUTOLOGY (is this formula true under every assignment?) is in co-NP, with a certificate for *no* instances; whether NP = co-NP is open and believed false. And NP is a class of *decision* problems; the corresponding search problems (find the clique) are polynomially equivalent to decision for NP-complete problems by **self-reducibility** (fix a variable, ask the decider, repeat), as you will implement. Read Sipser 7.3 and Barak chapter 14-15.`,
          resources: [
            {
              title: 'Introduction to Theoretical Computer Science (Barak) — Chapter 15: NP, NP completeness, and the Cook-Levin theorem (NP sections)',
              url: 'https://introtcs.org/public/lec_13_Cook_Levin.html',
              type: 'textbook',
              cost: 'free',
              provider: 'Boaz Barak',
              primary: true,
            },
            {
              title: 'MIT 18.404J — Lecture 13: NP',
              url: 'https://ocw.mit.edu/courses/18-404j-theory-of-computation-fall-2020/',
              type: 'lecture',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
            },
            {
              title: 'Computational Complexity: A Modern Approach (Arora and Barak) — Chapter 2: NP and NP completeness',
              url: 'https://theory.cs.princeton.edu/complexity/book.pdf',
              type: 'textbook',
              cost: 'free',
              provider: 'Sanjeev Arora and Boaz Barak',
            },
            {
              title: 'Jeff Erickson, Algorithms — Chapter 12: NP-Hardness',
              url: 'https://jeffe.cs.illinois.edu/teaching/algorithms/book/12-nphard.pdf',
              type: 'textbook',
              cost: 'free',
              provider: 'Jeff Erickson (UIUC)',
              note: 'The first sections define P, NP and co-NP with a practitioner\'s clarity.',
            },
          ],
          exercises: [
            {
              slug: 'verifiers',
              title: 'Write verifiers',
              prompt:
                'Implement polynomial-time verifiers V(x, c) for SAT (CNF formula, assignment), CLIQUE (graph, k, vertex set), HAMPATH (graph, path), SUBSET-SUM (numbers, target, subset) and COMPOSITES (n, factor). For each, state the certificate length bound and the verifier running time. Write a brute-force decider that enumerates certificates and calls V, and time it on growing instances to see the exponential.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'self-reducibility',
              title: 'Search from decision',
              prompt:
                'Assume a black-box decider for SAT (use your brute force, or PySAT for larger instances). Write find_assignment(formula) that calls the decider at most n + 1 times, fixing one variable at a time. Verify on 50 random satisfiable 3-CNF formulas with 15 variables that the returned assignment satisfies the formula. Explain why this shows search is no harder than decision for SAT, up to a polynomial factor.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'np-definitions-equivalence',
              title: 'Prove the two definitions of NP agree',
              prompt:
                'Prove that a language has a polynomial-time verifier iff it is decided by a polynomial-time NTM, both directions in detail (how is the certificate bounded? why does the branch sequence have polynomial length?). Then prove NP is contained in EXPTIME and that NP is closed under union, intersection, concatenation and star (and discuss complement).',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'np-or-conp',
              title: 'NP, co-NP, both, or neither',
              prompt:
                'Classify as "in NP", "in co-NP", "in both (and why)", or "not known to be in either", with certificates: PRIMES; COMPOSITES; TAUTOLOGY; GRAPH-ISOMORPHISM; GRAPH-NONISOMORPHISM; "the shortest path from s to t has length exactly k"; "this chess position is a forced win for white" (on an n x n board); FACTORING as a decision problem ("n has a factor below k").',
              kind: 'problem',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Define NP in terms of verifiers.',
              answerOutline: 'L is in NP if some polynomial-time verifier V and polynomial p satisfy: x in L iff there is a certificate c of length at most p(|x|) with V(x, c) accepting.',
            },
            {
              question: 'Why are the verifier and nondeterministic definitions equivalent?',
              answerOutline: 'An NTM guesses the certificate and runs the verifier; conversely, the choices on an accepting branch serve as a certificate a deterministic verifier replays.',
            },
            {
              question: 'What is co-NP and give a natural problem in it.',
              answerOutline: 'Languages whose complements are in NP; TAUTOLOGY (a falsifying assignment certifies non-membership).',
            },
            {
              question: 'Does membership in NP imply a problem is hard?',
              answerOutline: 'No; P is a subset of NP. It only implies a polynomial-time check and a brute-force exponential algorithm.',
            },
          ],
        },
        {
          slug: 'polynomial-time-reductions',
          title: 'Polynomial-time reductions and the structure of NP',
          summary:
            'Reductions with a time bound, NP-hardness and NP-completeness defined, what P = NP would mean, and the first reductions between SAT, 3SAT, CLIQUE and INDEPENDENT-SET.',
          estimatedMinutes: 100,
          objectives: [
            'Define polynomial-time mapping reducibility and NP-hardness / NP-completeness',
            'Prove that if any NP-complete problem is in P then P = NP, and that NP-complete problems are the hardest in NP',
            'Carry out and verify the reductions SAT to 3SAT, 3SAT to CLIQUE, and CLIQUE to INDEPENDENT-SET',
            'Implement reductions and test them with brute-force solvers on both sides',
          ],
          concepts: [
            'A <=_p B: polynomial-time computable f with x in A iff f(x) in B',
            'Transitivity; if B in P and A <=_p B then A in P',
            'NP-hard: every NP language reduces to it; NP-complete: NP-hard and in NP',
            'Consequences: one NP-complete problem in P collapses NP to P',
            'SAT to 3SAT by clause splitting with fresh variables',
            '3SAT to CLIQUE via clause triples and compatible literals',
            'CLIQUE to INDEPENDENT-SET via the complement graph',
            'Gadgets: the shape of most reductions',
          ],
          explanation: `A **polynomial-time reduction** $A \\le_p B$ is a mapping reduction whose function is computable in polynomial time. Everything from module 4 carries over with "decidable" replaced by "in P": if $B \\in \\mathrm{P}$ and $A \\le_p B$ then $A \\in \\mathrm{P}$ (reduce, then solve, both in polynomial time, and polynomials compose). Direction, as before: to show $B$ hard, reduce a known-hard $A$ to $B$.

$B$ is **NP-hard** if every language in NP reduces to it, and **NP-complete** if it is also in NP. An NP-complete problem is a hardest problem in NP in the precise sense that a polynomial algorithm for it would give one for *every* NP problem: **if any NP-complete problem is in P, then P = NP.** Conversely, if P $\\ne$ NP, no NP-complete problem has a polynomial algorithm. This is why proving NP-completeness is taken as strong evidence of intractability: thousands of NP-complete problems have resisted decades of attack by people who would be famous for solving any one of them. The next module proves that SAT is NP-complete (Cook-Levin), which seeds the whole theory; this lesson practises the reductions that spread completeness from SAT outward.

**SAT $\\le_p$ 3SAT**: a clause with $k > 3$ literals $(\\ell_1 \\vee \\cdots \\vee \\ell_k)$ becomes a chain $(\\ell_1 \\vee \\ell_2 \\vee z_1)(\\neg z_1 \\vee \\ell_3 \\vee z_2)\\cdots$ with fresh variables; short clauses are padded by repeating literals. Satisfiability is preserved because the $z$'s can carry a "the true literal is to the right" signal, and no assignment satisfies the chain without a true original literal. **3SAT $\\le_p$ CLIQUE**: make a vertex per literal occurrence, grouped by clause; connect two vertices iff they are in different clauses and not complementary; a $k$-clique ($k$ = number of clauses) picks one consistent true literal per clause, and vice versa. **CLIQUE $\\le_p$ INDEPENDENT-SET**: take the complement graph. Each reduction is a **gadget** construction: a local piece of the output per local piece of the input, plus a proof that solutions correspond in both directions.

Implement every reduction and *test* it: generate random instances, reduce, solve both with brute force, assert agreement. A reduction that passes a thousand random tests is not proved, but one that fails is wrong, and you will catch the off-by-one in your gadget. Read Sipser 7.4 (first half) and Barak chapter 14; Erickson's NP-hardness chapter has many gadget pictures.`,
          resources: [
            {
              title: 'Introduction to Theoretical Computer Science (Barak) — Chapter 14: Polynomial-time reductions',
              url: 'https://introtcs.org/public/lec_12_NP.html',
              type: 'textbook',
              cost: 'free',
              provider: 'Boaz Barak',
              primary: true,
            },
            {
              title: 'Jeff Erickson, Algorithms — Chapter 12: NP-Hardness',
              url: 'https://jeffe.cs.illinois.edu/teaching/algorithms/book/12-nphard.pdf',
              type: 'textbook',
              cost: 'free',
              provider: 'Jeff Erickson (UIUC)',
              note: 'Gadget-based reductions with diagrams; the best free source for practising reductions.',
            },
            {
              title: 'MIT 18.404J — Lecture 14: P and NP, polynomial-time reductions',
              url: 'https://ocw.mit.edu/courses/18-404j-theory-of-computation-fall-2020/',
              type: 'lecture',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
            },
          ],
          exercises: [
            {
              slug: 'implement-three-reductions',
              title: 'Implement and test three reductions',
              prompt:
                'Implement sat_to_3sat, three_sat_to_clique and clique_to_independent_set as functions on explicit data structures. Write brute-force deciders for SAT, CLIQUE and INDEPENDENT-SET. For 500 random small instances each, assert that the answer is preserved through each reduction. Report the size of the output instance as a function of the input size for each.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'reduction-correctness-proofs',
              title: 'Prove the reductions correct',
              prompt:
                'For SAT to 3SAT and 3SAT to CLIQUE write the full correctness proof: the map is polynomial-time, and x in A iff f(x) in B in both directions. For the clause chain, state precisely how to set the fresh variables given a satisfying assignment, and why an unsatisfied original clause makes the chain unsatisfiable.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'np-completeness-consequences',
              title: 'Consequences of NP-completeness',
              prompt:
                'Prove: (a) if some NP-complete problem is in P then P = NP; (b) if A is NP-complete, B in NP and A <=_p B then B is NP-complete; (c) if P != NP then no NP-complete problem is in P; (d) if an NP-complete problem is in co-NP then NP = co-NP. State which of these you would invoke to argue that a new problem is probably intractable.',
              kind: 'derivation',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Define NP-complete.',
              answerOutline: 'In NP, and every language in NP polynomial-time reduces to it (NP-hard).',
            },
            {
              question: 'What follows if an NP-complete problem has a polynomial-time algorithm?',
              answerOutline: 'Every NP problem does (reduce to it), so P = NP.',
            },
            {
              question: 'Describe the gadget in 3SAT to CLIQUE.',
              answerOutline: 'One vertex per literal occurrence; edges between non-complementary literals in different clauses; a k-clique selects one true literal per clause consistently.',
            },
            {
              question: 'Why test reductions with random instances if tests cannot prove correctness?',
              answerOutline: 'A failing test proves the reduction wrong and localises gadget bugs; proofs and tests are complementary.',
            },
          ],
        },
        {
          slug: 'hierarchy-theorems-and-exptime',
          title: 'The time hierarchy theorem and what we actually know',
          summary:
            'Diagonalisation with a clock proves that more time buys more power, placing P strictly inside EXPTIME; an honest map of proven inclusions, proven separations and open problems.',
          estimatedMinutes: 90,
          objectives: [
            'State the time hierarchy theorem and explain the diagonalisation-with-a-clock proof idea and the role of time constructibility',
            'Prove P is strictly contained in EXPTIME and NP in NEXPTIME',
            'Draw the known inclusion chain P, NP, PSPACE, EXPTIME, NEXPTIME with every proven strict inclusion marked',
            'Explain why diagonalisation alone cannot resolve P versus NP (relativisation, in outline)',
          ],
          concepts: [
            'Time-constructible functions',
            'Time hierarchy theorem: TIME(t) strictly inside TIME(t log t) roughly',
            'Proof: a machine that simulates and flips the diagonal within a time budget',
            'P strictly inside EXPTIME; NP strictly inside NEXPTIME',
            'EXPTIME-complete problems (generalised chess, succinct problems)',
            'The chain P subset NP subset PSPACE subset EXPTIME with at least one strict',
            'Relativisation: Baker-Gill-Solovay barrier',
            'What is proven versus conjectured',
          ],
          explanation: `Separations are rare in complexity theory, and the ones we have come from **diagonalisation with a clock**. The **time hierarchy theorem** says that for time-constructible $t(n)$ (functions a TM can compute in time $O(t(n))$, which includes every polynomial and exponential you will meet), $\\mathrm{TIME}(t(n))$ is strictly contained in $\\mathrm{TIME}(t(n) \\log t(n))$. Idea of the proof: build $D$ that on input $\\langle M \\rangle$ simulates $M$ on $\\langle M \\rangle$ for $t(n)$ steps (counting them down on a clock tape), and accepts iff $M$ rejects within the budget. $D$ runs in time $O(t(n) \\log t(n))$ (the log is simulation overhead). If some $M$ decided $L(D)$ in time $t(n)$, then on its own description $M$ would finish within budget and $D$ would disagree with it. The halting-problem proof, with a stopwatch.

Consequences you can state as theorems, not beliefs: **P $\\subsetneq$ EXPTIME** (take $t = 2^n$ versus any polynomial), and **NP $\\subsetneq$ NEXPTIME** by the nondeterministic version. There are **EXPTIME-complete** problems, provably outside P: deciding the winner of generalised chess or checkers on $n \\times n$ boards, and "succinct" versions of P problems where the input is given as a circuit that describes an exponentially large graph.

Now the honest map. Proven: $\\mathrm{P} \\subseteq \\mathrm{NP} \\subseteq \\mathrm{PSPACE} \\subseteq \\mathrm{EXPTIME} \\subseteq \\mathrm{NEXPTIME}$, with $\\mathrm{P} \\ne \\mathrm{EXPTIME}$ and $\\mathrm{NP} \\ne \\mathrm{NEXPTIME}$. Therefore at least one of the inclusions P $\\subseteq$ NP $\\subseteq$ PSPACE $\\subseteq$ EXPTIME is strict, and we do not know which. Conjectured: all of them. Open: P vs NP, NP vs co-NP, P vs PSPACE, and whether factoring is in P.

Why can diagonalisation not finish the job? **Relativisation**: diagonalisation arguments work identically if every machine is given access to an oracle for some language $O$. Baker, Gill and Solovay (1975) exhibited oracles $A$ and $B$ with $\\mathrm{P}^A = \\mathrm{NP}^A$ and $\\mathrm{P}^B \\ne \\mathrm{NP}^B$. So any proof that relativises cannot resolve P vs NP, and a resolution must use something specific about computation that oracles break (the Cook-Levin encoding of computation into local constraints is such a thing). Read Sipser 9.1 and Arora-Barak chapters 3-4; the exercises include a tiny empirical hierarchy and the EXPTIME-complete game.`,
          resources: [
            {
              title: 'Computational Complexity: A Modern Approach (Arora and Barak) — Chapter 3: Diagonalization (hierarchy theorems, relativisation)',
              url: 'https://theory.cs.princeton.edu/complexity/book.pdf',
              type: 'textbook',
              cost: 'free',
              provider: 'Sanjeev Arora and Boaz Barak',
              primary: true,
            },
            {
              title: 'MIT 18.404J — Lecture 20-21: Hierarchy theorems, relativisation (final lectures)',
              url: 'https://ocw.mit.edu/courses/18-404j-theory-of-computation-fall-2020/',
              type: 'lecture',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
            },
            {
              title: 'Complexity Zoo',
              url: 'https://complexityzoo.net/Complexity_Zoo',
              type: 'documentation',
              cost: 'free',
              provider: 'Scott Aaronson and contributors',
              note: 'Look up every class named in this subject and read its known inclusions.',
            },
            {
              title: 'Introduction to Theoretical Computer Science (Barak) — Chapter 16: What if P equals NP?',
              url: 'https://introtcs.org/public/lec_14_PvsNP.html',
              type: 'textbook',
              cost: 'free',
              provider: 'Boaz Barak',
            },
          ],
          exercises: [
            {
              slug: 'hierarchy-proof',
              title: 'Write the hierarchy proof',
              prompt:
                'Write the proof of the time hierarchy theorem in full for t(n) = n^2 versus n^3 (loose form): define D with its clock, argue its running time, and derive the contradiction. Identify exactly where time constructibility is used and what goes wrong without it. Then deduce P != EXPTIME.',
              kind: 'derivation',
              difficulty: 3,
            },
            {
              slug: 'clocked-diagonaliser',
              title: 'A clocked diagonaliser in code',
              prompt:
                'Using your universal machine, implement D(code) that simulates the encoded machine on its own code for len(code)^2 steps and returns the opposite of its verdict (treat timeout as reject). Run D on 200 random valid encodings and on a handful of hand-written machines. Explain why no machine running in n^2 steps can compute D, and why this does not contradict D itself being computable.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'known-and-open-map',
              title: 'Map the known and the open',
              prompt:
                'Draw the inclusion diagram for L, NL, P, NP, co-NP, PSPACE, EXPTIME, NEXPTIME. For each edge mark: proven equal, proven strict, or open, with a one-line justification (hierarchy theorem, Savitch, definition). List three consequences that would follow from P = NP and three from P != NP that are not just restatements.',
              kind: 'writing',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'State the time hierarchy theorem informally and its proof idea.',
              answerOutline: 'Slightly more time decides strictly more languages; a clocked diagonaliser simulates each machine on itself within the budget and does the opposite.',
            },
            {
              question: 'Which inclusions among P, NP, PSPACE, EXPTIME are proven strict?',
              answerOutline: 'Only the end-to-end one: P != EXPTIME. Each individual step is open.',
            },
            {
              question: 'Why can relativising proofs not settle P vs NP?',
              answerOutline: 'There are oracles relative to which P = NP and others relative to which P != NP; a proof that works with any oracle would have to give both answers.',
            },
          ],
        },
      ],
      project: {
        slug: 'complexity-measurement-lab',
        title: 'Module project: a complexity measurement lab',
        description:
          'Build a benchmarking harness and use it to make the module\'s claims empirical: step counts of Turing machines versus RAM time for the same problems (polynomial relationship), brute-force NP deciders versus verifiers (exponential versus polynomial), pseudo-polynomial algorithms under unary and binary encodings, and the three reductions implemented and size-measured. Accompany it with a written map of complexity classes.',
        deliverables: [
          'A harness that records step counts and wall-clock time with fitted growth exponents',
          'Plots for each experiment with the fitted exponent and the theoretical prediction',
          'The reductions package with randomised agreement tests and output-size measurements',
          'A two-page annotated map of complexity classes distinguishing proven from conjectured',
        ],
        estimatedHours: 10,
      },
    },
    {
      slug: 'np-completeness',
      title: 'NP-Completeness',
      description:
        'The Cook-Levin theorem that SAT is NP-complete, the gallery of classic NP-complete problems and the gadgets that connect them, how to prove a new problem NP-complete, and how practice copes: SAT solvers, approximation, parameterisation.',
      lessons: [
        {
          slug: 'the-cook-levin-theorem',
          title: 'The Cook-Levin theorem',
          summary:
            'Why SAT is NP-complete: encoding the tableau of a nondeterministic computation as a polynomial-size Boolean formula whose satisfying assignments are accepting computations.',
          estimatedMinutes: 120,
          objectives: [
            'State the Cook-Levin theorem and explain why one problem being NP-complete seeds the whole theory',
            'Describe the tableau of a polynomial-time NTM computation and the four groups of clauses (cell, start, accept, move)',
            'Explain why the move clauses are local (2x3 windows) and why that makes the formula polynomial in size',
            'Implement the construction for tiny machines and verify satisfiability tracks acceptance',
          ],
          concepts: [
            'Tableau: n^k x n^k grid of configurations',
            'Variables x_{i,j,s}: cell (i, j) contains symbol s',
            'phi_cell, phi_start, phi_accept, phi_move',
            'Legal 2x3 windows capture the transition function',
            'Size O(n^2k): polynomial',
            'Correctness: satisfying assignments correspond to accepting tableaux',
            'CIRCUIT-SAT as an alternative route',
            'Why the proof does not relativise',
          ],
          explanation: `**Cook-Levin theorem (1971)**: SAT is NP-complete. SAT is in NP (the certificate is an assignment). For hardness, we must reduce *every* language in NP to SAT, knowing nothing about it except that some NTM $N$ decides it in time $n^k$. The trick is to encode **the computation itself** as a formula.

Lay the computation out as a **tableau**: an $n^k \\times n^k$ grid whose rows are configurations $C_0, C_1, \\dots$, each written as a string of tape symbols with the state inserted at the head position. An accepting tableau is one whose first row is the start configuration on $w$, whose successive rows follow $N$'s transition function (making some nondeterministic choice), and that contains the accept state somewhere. $w \\in L$ iff an accepting tableau exists.

Now write a formula $\\phi$ over variables $x_{i,j,s}$ meaning "cell $(i, j)$ holds symbol $s$". $\\phi_{cell}$ says each cell holds exactly one symbol. $\\phi_{start}$ fixes row 0. $\\phi_{accept}$ says some cell holds $q_{accept}$. The heart is $\\phi_{move}$: it says every $2 \\times 3$ **window** of cells (two rows, three columns) is **legal**, i.e. consistent with the transition function. Because a TM changes only the cell under the head and moves one step, legality of all windows implies each row follows from the previous by a valid move: locality of computation is what makes the encoding possible. There are finitely many legal windows (depending only on $N$), so each window constraint is a constant-size formula, and $\\phi$ has size $O(n^{2k})$: polynomial. Satisfying assignments of $\\phi$ correspond exactly to accepting tableaux, so $w \\in L \\iff \\phi \\in \\mathrm{SAT}$, and the map is computable in polynomial time.

That is the whole proof; the details are a careful case analysis of windows, which Sipser 7.4 does in full. Two remarks. The construction produces a CNF-like formula and converts easily to 3-CNF, so **3SAT is NP-complete** too. And the proof uses the *structure* of computation (locality), which oracles destroy, so it does not relativise; it is the kind of argument that might one day separate P from NP. Implement the construction for a two-state machine and a three-symbol input, hand the formula to a SAT solver, and watch satisfiability track acceptance; nothing makes the theorem concrete like that.`,
          resources: [
            {
              title: 'Introduction to Theoretical Computer Science (Barak) — Chapter 15: NP, NP completeness and the Cook-Levin theorem',
              url: 'https://introtcs.org/public/lec_13_Cook_Levin.html',
              type: 'textbook',
              cost: 'free',
              provider: 'Boaz Barak',
              note: 'Barak proves it via circuits (NAND-CIRCUIT-SAT), a clean alternative to the tableau.',
              primary: true,
            },
            {
              title: 'MIT 18.404J — Lecture 15: The Cook-Levin theorem',
              url: 'https://ocw.mit.edu/courses/18-404j-theory-of-computation-fall-2020/',
              type: 'lecture',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
              note: 'Sipser presents the tableau proof on video.',
            },
            {
              title: 'Computational Complexity: A Modern Approach (Arora and Barak) — Chapter 2.3: The Cook-Levin theorem',
              url: 'https://theory.cs.princeton.edu/complexity/book.pdf',
              type: 'textbook',
              cost: 'free',
              provider: 'Sanjeev Arora and Boaz Barak',
            },
            {
              title: 'PySAT — SAT solving in Python',
              url: 'https://pysathq.github.io/',
              type: 'tool',
              cost: 'free',
              provider: 'PySAT',
              note: 'Feed your Cook-Levin formulas to a real solver.',
            },
          ],
          exercises: [
            {
              slug: 'cook-levin-construction',
              title: 'Implement the tableau construction',
              prompt:
                'For a deterministic or nondeterministic TM from your simulator with a time bound T, generate the CNF phi = phi_cell and phi_start and phi_accept and phi_move over variables x[i][j][s], enumerating legal 2x3 windows from the transition function. For your 0^n 1^n machine with T = 30, generate phi for inputs 0011 and 0111 and solve with PySAT: the first must be satisfiable, the second not. Decode the satisfying assignment back into a tableau and print it.',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'legal-windows',
              title: 'Enumerate legal windows',
              prompt:
                'For a 2-state, 2-symbol TM, list by hand all legal 2x3 windows (those consistent with some transition or with the head being elsewhere), and all illegal ones among a sample. Explain why a window with the state symbol in the top-middle cell determines the bottom row, and why windows without a state symbol must copy. Count the total number of windows and the number legal.',
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'cook-levin-writeup',
              title: 'Write the proof',
              prompt:
                'Write a complete proof of the Cook-Levin theorem: membership of SAT in NP; the tableau; the four formula groups with their sizes; the claim that all windows legal implies each row follows from the previous (argue it); the polynomial bound; and the two directions of correctness. Then explain in one paragraph how to adapt the formula to 3-CNF.',
              kind: 'derivation',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'What does the Cook-Levin formula encode?',
              answerOutline: 'An accepting computation tableau of the NTM: cell consistency, start configuration, acceptance, and legality of every local 2x3 window.',
            },
            {
              question: 'Why is the formula polynomial in size?',
              answerOutline: 'The tableau has n^k x n^k cells, each with constant-size constraints; windows are local so phi_move has O(n^2k) constant-size clauses.',
            },
            {
              question: 'Why does locality of Turing machine steps matter for the proof?',
              answerOutline: 'Each step changes only cells near the head, so legality of small windows suffices to enforce correct transitions globally.',
            },
          ],
        },
        {
          slug: 'classic-np-complete-problems',
          title: 'A gallery of NP-complete problems and their gadgets',
          summary:
            'Vertex cover, Hamiltonian path, subset sum, 3-colouring and more: the reductions that prove them NP-complete, and the gadgets that recur across hundreds of others.',
          estimatedMinutes: 120,
          objectives: [
            'Prove NP-completeness of VERTEX-COVER, 3-COLOURING, SUBSET-SUM and HAMPATH (or directed HAMPATH) via standard reductions',
            'Identify the gadget types: variable gadgets, clause gadgets, consistency gadgets, and number encodings',
            'Implement two reductions end to end and verify them with solvers',
            'Navigate the Garey-Johnson style catalogue to find a known problem close to a new one',
          ],
          concepts: [
            '3SAT to VERTEX-COVER (variable edges and clause triangles)',
            '3SAT to 3-COLOURING (palette triangle, variable pairs, OR gadgets)',
            '3SAT to SUBSET-SUM (digit-per-clause number encoding)',
            '3SAT to directed HAMPATH (diamond chains and clause nodes); undirected via node tripling',
            'Gadget design: local structure, consistency, and the two-directional proof',
            'Strong vs weak NP-completeness (SUBSET-SUM is weak)',
            'Karp\'s 21 problems and the Garey-Johnson catalogue',
            'Restricting a problem can keep or lose hardness (2SAT in P, planar 3-colouring hard)',
          ],
          explanation: `Once 3SAT is NP-complete, completeness spreads by reductions, and most reductions are built from **gadgets**: a local piece of the target instance for each variable and each clause, wired so that consistent solutions correspond. Learn the canonical four and you can design your own.

**VERTEX-COVER** (is there a set of $k$ vertices touching every edge?): for each variable an edge $x$—$\\neg x$ (one endpoint must be chosen: that is the truth value), for each clause a triangle on its three literals (two of three must be chosen), and edges from triangle vertices to the matching variable vertices; set $k = n + 2m$. A cover of that size must pick exactly one per variable edge and two per triangle, and the un-picked triangle vertex must be connected to a picked variable vertex, which is a true literal.

**3-COLOURING**: a palette triangle T/F/B; for each variable, vertices $x$ and $\\neg x$ adjacent to each other and to B, so they take T and F in some order; for each clause, an **OR-gadget** of six vertices whose output can be coloured T iff at least one input is T. **SUBSET-SUM**: encode in decimal, one digit column per variable and per clause; two numbers per variable (for $x$ and $\\neg x$) with a 1 in the variable column and 1s in the columns of clauses they satisfy; slack numbers per clause; a target of all 1s then all 3s. Carries never happen because each column sums to at most 5. **HAMPATH** (directed): a horizontal diamond chain per variable, traversed left-to-right (true) or right-to-left (false), with clause nodes spliced in so that a clause node is visitable only from a chain traversed in the direction of a literal that satisfies it; undirected HAMPATH follows by replacing each node with a path of three.

Each proof has the same shape: polynomial-time map; given a satisfying assignment, build the solution; given a solution, *extract* a satisfying assignment, which is where you prove the gadgets forbid cheating. Note also what reductions tell you about variants: SUBSET-SUM is only **weakly** NP-complete (the numbers are exponentially large; with small numbers it is in P by DP), while VERTEX-COVER is strongly NP-complete. And restricting a problem can drop it into P (2SAT, 2-colouring) or not (planar 3-colouring, 3SAT with each variable in at most 3 clauses). Read Sipser 7.5, Erickson chapter 12 (the gadget pictures are excellent), and implement at least two; Karp's 1972 list and Garey and Johnson's catalogue are the references when you meet a new problem.`,
          resources: [
            {
              title: 'Jeff Erickson, Algorithms — Chapter 12: NP-Hardness (gadget reductions with figures)',
              url: 'https://jeffe.cs.illinois.edu/teaching/algorithms/book/12-nphard.pdf',
              type: 'textbook',
              cost: 'free',
              provider: 'Jeff Erickson (UIUC)',
              primary: true,
            },
            {
              title: 'MIT 18.404J — Lecture 16: More NP-complete problems (HAMPATH, SUBSET-SUM)',
              url: 'https://ocw.mit.edu/courses/18-404j-theory-of-computation-fall-2020/',
              type: 'lecture',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
            },
            {
              title: 'Introduction to Theoretical Computer Science (Barak) — Chapter 14: reductions (3SAT to quadratic equations, independent set, etc.)',
              url: 'https://introtcs.org/public/lec_12_NP.html',
              type: 'textbook',
              cost: 'free',
              provider: 'Boaz Barak',
            },
            {
              title: 'Computers and Intractability: A Guide to the Theory of NP-Completeness (Garey and Johnson)',
              url: 'https://en.wikipedia.org/wiki/Computers_and_Intractability',
              type: 'textbook',
              cost: 'paid',
              provider: 'W. H. Freeman',
              note: 'The classic catalogue of 300+ NP-complete problems; Erickson\'s free chapter covers the core.',
            },
          ],
          exercises: [
            {
              slug: 'two-gadget-reductions',
              title: 'Implement two gadget reductions',
              prompt:
                'Implement 3SAT to VERTEX-COVER and 3SAT to SUBSET-SUM as functions. For 300 random 3-CNF instances with 6-8 variables, solve SAT by brute force and the target problems by brute force, and assert agreement. For VERTEX-COVER, also extract the assignment from a cover and check it satisfies the formula. Report the output instance sizes.',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'three-colouring-gadget',
              title: 'The OR-gadget for 3-colouring',
              prompt:
                'Draw the six-vertex OR-gadget for 3-colouring and verify by exhaustive enumeration in Python (all 3^k colourings of the gadget plus inputs) that the output can be coloured T iff at least one input is T, and never otherwise. Then assemble the full 3SAT to 3-COLOURING reduction and test it on 100 random instances with a brute-force colourer.',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'hampath-proof',
              title: 'Prove directed HAMPATH NP-complete',
              prompt:
                'Write the reduction from 3SAT to directed HAMPATH with diamond chains and clause nodes, and prove both directions, paying special attention to why a Hamiltonian path cannot "zig-zag": enter a clause node from one diamond and return to a different one. Then show how undirected HAMPATH follows by the three-node replacement and why it preserves Hamiltonicity.',
              kind: 'derivation',
              difficulty: 3,
            },
            {
              slug: 'weak-vs-strong',
              title: 'Weak versus strong NP-completeness',
              prompt:
                'Implement the O(nT) dynamic program for SUBSET-SUM and run it on the instances produced by your 3SAT reduction: explain why it is useless there (how large is T in terms of the number of clauses?). Then explain why no pseudo-polynomial algorithm for VERTEX-COVER is expected, and what "strongly NP-complete" means formally.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Describe the variable and clause gadgets in 3SAT to VERTEX-COVER.',
              answerOutline: 'Variable: an edge x - not x (choose one endpoint). Clause: a triangle on the three literals (choose two). Cross edges force the unchosen triangle vertex to be a true literal. k = n + 2m.',
            },
            {
              question: 'Why does the SUBSET-SUM reduction avoid carries?',
              answerOutline: 'Each decimal column has at most five 1s (three literals plus two slacks), so column sums never reach 10.',
            },
            {
              question: 'What is the difference between weak and strong NP-completeness?',
              answerOutline: 'Weak: hard only when numbers are exponentially large (pseudo-polynomial algorithms exist). Strong: hard even with numbers bounded by a polynomial.',
            },
            {
              question: 'What are the two directions every reduction proof must argue?',
              answerOutline: 'A yes-instance maps to a yes-instance (construct the solution) and a yes output implies a yes input (extract a solution, showing gadgets cannot be cheated).',
            },
          ],
          relatedLessons: ['data-structures-algorithms/advanced-topics/np-hardness-and-coping'],
        },
        {
          slug: 'coping-with-np-completeness',
          title: 'Coping with NP-completeness: SAT solvers, approximation and parameterisation',
          summary:
            'What to do when your problem is NP-complete: modern SAT solvers that handle millions of clauses, approximation algorithms with guarantees, fixed-parameter tractability, and knowing which escape hatches theory forbids.',
          estimatedMinutes: 110,
          objectives: [
            'Encode a combinatorial problem as CNF and solve it with a SAT solver, and explain why DPLL/CDCL often works despite worst-case hardness',
            'State and prove the 2-approximation for vertex cover and the greedy ln n approximation for set cover',
            'Explain fixed-parameter tractability with vertex cover as the example and give the O(2^k n) algorithm',
            'Explain which escapes are ruled out (unless P = NP) and the meaning of hardness of approximation results',
          ],
          concepts: [
            'DPLL, unit propagation, clause learning (CDCL)',
            'Encoding problems as SAT: at-most-one constraints, graph colouring, Sudoku',
            'Approximation ratio; 2-approximation for VERTEX-COVER via maximal matching',
            'Greedy set cover and the ln n bound; the PCP theorem (statement) and inapproximability',
            'Fixed-parameter tractability; bounded search tree for VERTEX-COVER',
            'Exact exponential algorithms better than brute force',
            'Heuristics, local search, and why they come with no guarantees',
            'Average-case versus worst-case hardness',
          ],
          explanation: `NP-completeness is not the end of a problem; it is the beginning of engineering. The first and most surprising resource is that **SAT solvers** are extraordinarily good in practice. **DPLL** does backtracking search with **unit propagation** (a clause with one unassigned literal forces it); **CDCL** adds **clause learning** (when a conflict occurs, derive a new clause that explains it, so the same mistake is never repeated), restarts and smart variable ordering. Industrial instances with millions of clauses are routinely solved, which is why hardware verification, package dependency resolution and scheduling are done by encoding to SAT. The worst case is still exponential; the point is that real instances are rarely worst cases, and NP-completeness says nothing about *which* instances are hard.

When you need guarantees, **approximation algorithms** trade optimality for a provable ratio. For VERTEX-COVER, take any maximal matching and output both endpoints of every matched edge: every edge is covered, and any cover must contain at least one endpoint per matched edge, so the output is at most **twice** optimal. For SET-COVER, greedily pick the set covering the most uncovered elements; the result is within $\\ln n$ of optimal, and under P $\\ne$ NP no polynomial algorithm does essentially better. The **PCP theorem** (1992) is the deep source of such **inapproximability** results: MAX-3SAT cannot be approximated beyond $7/8$, and vertex cover not below some constant, unless P = NP. Some problems (knapsack) have a PTAS: $(1 + \\varepsilon)$-approximation for any $\\varepsilon$ in polynomial time; others (clique) cannot be approximated within $n^{1 - \\varepsilon}$. Approximability is a finer structure inside NP-hardness.

**Parameterised complexity** asks whether the exponential blow-up can be confined to a small parameter. VERTEX-COVER with cover size $k$: pick any edge, one endpoint is in the cover, branch; the search tree has depth $k$ and $2^k$ leaves, so the time is $O(2^k n)$, which is fine for $k = 30$ and $n = 10^6$. Such problems are **fixed-parameter tractable**; others (CLIQUE parameterised by $k$) are believed not to be.

The lesson ends where it began: which hatches are closed? A polynomial exact algorithm (unless P = NP), a $2 - \\varepsilon$ approximation for vertex cover under stronger conjectures, and so on. Read Sipser 10.1 (approximation), Barak chapter 16, and the PySAT tutorial; the exercises have you solve real puzzles with a SAT solver and measure approximation ratios on random instances.`,
          resources: [
            {
              title: 'PySAT documentation and tutorial',
              url: 'https://pysathq.github.io/',
              type: 'tool',
              cost: 'free',
              provider: 'PySAT',
              note: 'Interfaces to MiniSat, Glucose, CaDiCaL; use the card module for at-most-one constraints.',
              primary: true,
            },
            {
              title: 'Introduction to Theoretical Computer Science (Barak) — Chapter 16: What if P equals NP? (and coping discussion)',
              url: 'https://introtcs.org/public/lec_14_PvsNP.html',
              type: 'textbook',
              cost: 'free',
              provider: 'Boaz Barak',
            },
            {
              title: 'Jeff Erickson, Algorithms — Chapter 12 (final sections) and the approximation notes',
              url: 'https://jeffe.cs.illinois.edu/teaching/algorithms/',
              type: 'textbook',
              cost: 'free',
              provider: 'Jeff Erickson (UIUC)',
            },
            {
              title: 'Z3 theorem prover (SMT, a superset of SAT)',
              url: 'https://github.com/Z3Prover/z3',
              type: 'tool',
              cost: 'free',
              provider: 'Microsoft Research',
              note: 'For encodings with integers and arrays once plain SAT becomes awkward.',
            },
          ],
          exercises: [
            {
              slug: 'sudoku-and-colouring-by-sat',
              title: 'Solve Sudoku and graph colouring with a SAT solver',
              prompt:
                'Encode Sudoku (729 variables, cell/row/column/box constraints) in CNF and solve a hard published puzzle with PySAT; report clause count and solve time. Then encode k-colouring of a graph and find the chromatic number of the Petersen graph and of random graphs with 60 vertices by increasing k. Compare with your backtracking colourer from Discrete Mathematics.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'dpll-from-scratch',
              title: 'Write DPLL and measure against CDCL',
              prompt:
                'Implement DPLL with unit propagation and pure-literal elimination. On random 3-CNF with n = 50..200 variables at clause/variable ratio 4.26 (the hard region), compare its time to PySAT, and plot both against n. Then vary the ratio from 2 to 8 at n = 100 and plot satisfiable fraction and running time, locating the phase transition.',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'approximation-ratios',
              title: 'Measure approximation ratios',
              prompt:
                'Implement the matching-based 2-approximation for vertex cover and the greedy set cover. On 200 random graphs with 16 vertices compute the exact optimum by brute force and the empirical ratio; report the distribution and the worst case seen. Prove the 2-approximation bound and construct a family of instances where the greedy set cover is Omega(log n) times optimal.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'fpt-vertex-cover',
              title: 'Fixed-parameter vertex cover',
              prompt:
                'Implement the O(2^k n) bounded search tree for vertex cover (with the degree-1 and high-degree simplifications as a bonus). Run on graphs with n = 10^4 vertices and small k (5..25) and plot time against k on a log scale; confirm the 2^k trend. Explain why this does not contradict NP-completeness.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why do SAT solvers work well in practice if SAT is NP-complete?',
              answerOutline: 'NP-completeness is about worst-case instances; structured industrial instances are far from worst case, and CDCL exploits structure via propagation and learning.',
            },
            {
              question: 'Prove the matching-based 2-approximation for vertex cover in two sentences.',
              answerOutline: 'Both endpoints of a maximal matching cover every edge (else the matching could grow). Any cover contains at least one endpoint of each matched edge, so OPT >= |M| and the output is 2|M| <= 2 OPT.',
            },
            {
              question: 'What does fixed-parameter tractable mean?',
              answerOutline: 'Solvable in time f(k) n^c, with the exponential confined to the parameter k, e.g. O(2^k n) for vertex cover of size k.',
            },
            {
              question: 'What kind of result does the PCP theorem enable?',
              answerOutline: 'Hardness of approximation: proving that approximating certain problems beyond a ratio is itself NP-hard.',
            },
          ],
        },
      ],
      project: {
        slug: 'np-complete-solver-suite',
        title: 'Module project: an NP-complete problem solver suite',
        description:
          'Build a package that solves five NP-complete problems (SAT, VERTEX-COVER, 3-COLOURING, HAMPATH, SUBSET-SUM) three ways each: brute force, via reduction to SAT and a CDCL solver, and via an approximation or FPT algorithm where one exists. Include the reductions between them, randomised agreement tests, and benchmarks that show where each method breaks down.',
        deliverables: [
          'Solvers and reductions with tests asserting agreement among methods on random instances',
          'A benchmark report with plots of time versus instance size for each method and problem',
          'A written section explaining, for each problem, which theoretical results bound what is possible',
        ],
        estimatedHours: 12,
      },
    },
    {
      slug: 'beyond-np',
      title: 'Beyond NP: Space, Randomness and Quantum',
      description:
        'Space-bounded computation and PSPACE-completeness, logarithmic space and NL, randomised complexity classes and derandomisation questions, and what quantum computers change.',
      lessons: [
        {
          slug: 'space-complexity-and-pspace',
          title: 'Space complexity, Savitch\'s theorem and PSPACE',
          summary:
            'Measuring memory instead of time, why nondeterminism costs only a square in space, PSPACE as the class of games, and TQBF as its complete problem.',
          estimatedMinutes: 110,
          objectives: [
            'Define SPACE(f(n)), PSPACE and NPSPACE and relate them to time classes',
            'Prove Savitch\'s theorem (NSPACE(f) subset SPACE(f^2)) via recursive reachability',
            'Explain why PSPACE = NPSPACE and why NP and co-NP are inside PSPACE',
            'State the PSPACE-completeness of TQBF and explain why two-player games are naturally PSPACE',
          ],
          concepts: [
            'Space as cells used on the work tape; sublinear space with read-only input',
            'SPACE(f), NSPACE(f), PSPACE, NPSPACE',
            'TIME(f) subset SPACE(f) subset TIME(2^O(f)) via configuration counting',
            'Savitch: CANYIELD(c1, c2, t) with recursion depth log t',
            'PSPACE = NPSPACE',
            'TQBF and quantifier alternation',
            'Two-player games (generalised geography) are PSPACE-complete',
            'P subset NP subset PSPACE subset EXPTIME',
          ],
          explanation: `Time is one resource; **space** (memory) is another, and it behaves differently. $\\mathrm{SPACE}(f(n))$ is the class of languages decided using $O(f(n))$ tape cells; **PSPACE** is polynomial space. Space is reusable where time is not, which makes PSPACE large: a machine with $f(n)$ cells has at most $2^{O(f(n))}$ configurations, so it runs for at most that many steps before repeating one (and looping), giving $\\mathrm{SPACE}(f) \\subseteq \\mathrm{TIME}(2^{O(f)})$. Conversely $\\mathrm{TIME}(f) \\subseteq \\mathrm{SPACE}(f)$, since you cannot touch more cells than steps. So P $\\subseteq$ PSPACE $\\subseteq$ EXPTIME. NP is also inside PSPACE: try every certificate one at a time, reusing the space, and so is co-NP.

The striking theorem is **Savitch's** (1970): $\\mathrm{NSPACE}(f(n)) \\subseteq \\mathrm{SPACE}(f(n)^2)$. Nondeterminism, which seems to cost exponential *time* to remove, costs only a *square* in space. The proof asks whether configuration $c_2$ is reachable from $c_1$ in at most $t$ steps: guess a midpoint $c_m$ and recursively check both halves with $t/2$. The recursion has depth $\\log t = O(f(n))$ and each frame stores a configuration of size $O(f(n))$, so the total space is $O(f(n)^2)$; the midpoints are tried one at a time, reusing space. Consequently **PSPACE = NPSPACE**: in the space world, the P-versus-NP question is answered.

PSPACE has complete problems, and they look like **games**. **TQBF**: is a fully quantified Boolean formula $\\forall x_1 \\exists x_2 \\forall x_3 \\cdots \\phi$ true? It is in PSPACE by recursive evaluation (depth $n$, reuse space), and PSPACE-hard by a Savitch-like encoding of any polynomial-space computation into a formula with alternating quantifiers of polynomial size (the key trick: express "reachable in $t$ steps" with one universal quantifier over both halves rather than two copies). Alternating quantifiers are exactly "for every move of my opponent there is a move of mine such that...", so **two-player games** of polynomial length are PSPACE: generalised geography is PSPACE-complete, and generalised chess, Go and checkers with polynomial move limits are too (without the limit, EXPTIME). Read Sipser 8.1-8.3 and Barak chapter 17; implement Savitch for tiny machines and the TQBF evaluator, and feel the difference between space reuse and time.`,
          resources: [
            {
              title: 'Introduction to Theoretical Computer Science (Barak) — Space bounded computation',
              url: 'https://introtcs.org/public/lec_14a_space_complexity.html',
              type: 'textbook',
              cost: 'free',
              provider: 'Boaz Barak',
              primary: true,
            },
            {
              title: 'MIT 18.404J — Lecture 17-18: Space complexity, Savitch\'s theorem, PSPACE-completeness, TQBF, games',
              url: 'https://ocw.mit.edu/courses/18-404j-theory-of-computation-fall-2020/',
              type: 'lecture',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
            },
            {
              title: 'Computational Complexity: A Modern Approach (Arora and Barak) — Chapter 4: Space complexity',
              url: 'https://theory.cs.princeton.edu/complexity/book.pdf',
              type: 'textbook',
              cost: 'free',
              provider: 'Sanjeev Arora and Boaz Barak',
            },
          ],
          exercises: [
            {
              slug: 'savitch-reachability',
              title: 'Implement Savitch\'s reachability',
              prompt:
                'Implement canyield(c1, c2, t) over an explicit configuration graph (from your NTM simulator on small inputs, or a random directed graph with 2^10 nodes), and instrument the maximum recursion depth and the number of configurations stored at once. Compare its memory footprint with BFS reachability on the same graph (which stores a visited set) and its running time; explain the time/space trade-off you see.',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'tqbf-evaluator',
              title: 'A TQBF evaluator and game solver',
              prompt:
                'Write eval_tqbf(prefix, formula) by recursion that uses O(n) space (no table of assignments). Test on hand-made formulas. Then encode generalised geography on small directed graphs as a TQBF (or write a direct minimax solver with the same recursive shape) and determine who wins on 20 random 8-node graphs; verify against brute-force game-tree search.',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'space-class-proofs',
              title: 'Space class relationships',
              prompt:
                'Prove: SPACE(f) subset TIME(2^O(f)) by configuration counting (be precise about what a configuration contains); NP subset PSPACE; co-NP subset PSPACE; PSPACE = NPSPACE from Savitch. Then prove Savitch\'s theorem in full, including the space accounting for the recursion stack.',
              kind: 'derivation',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'Why is NP contained in PSPACE?',
              answerOutline: 'Enumerate certificates one at a time, reusing the same polynomial space for each verification.',
            },
            {
              question: 'State Savitch\'s theorem and the proof idea.',
              answerOutline: 'NSPACE(f) is inside SPACE(f^2); recursively check reachability via a midpoint, depth log of the configuration count, each level storing one configuration.',
            },
            {
              question: 'Why are two-player games naturally PSPACE problems?',
              answerOutline: 'Alternating "for all opponent moves, exists my move" is quantifier alternation; evaluating it recursively needs only polynomial space (one path of the game tree).',
            },
          ],
        },
        {
          slug: 'logspace-and-nl',
          title: 'Logarithmic space, NL and the Immerman-Szelepcsenyi theorem',
          summary:
            'Computing with a notebook far smaller than the input: L, NL, PATH as the NL-complete problem, log-space reductions, and the surprise that NL is closed under complement.',
          estimatedMinutes: 90,
          objectives: [
            'Define L and NL with a read-only input tape and give examples (palindromes in L; PATH in NL)',
            'Explain why NL is inside P via the configuration graph and why log-space reductions are needed for NL-completeness',
            'State the NL-completeness of PATH',
            'Explain the statement and significance of the Immerman-Szelepcsenyi theorem (NL = co-NL)',
          ],
          concepts: [
            'Sublinear space: read-only input, O(log n) work tape',
            'L (deterministic log space), NL (nondeterministic)',
            'Examples: counting, palindromes, arithmetic in L',
            'Configuration graph of size polynomial; NL subset P',
            'Log-space reductions and PATH as NL-complete',
            'L vs NL open; NL subset SPACE(log^2 n) by Savitch',
            'Immerman-Szelepcsenyi: NL = co-NL via inductive counting',
            'Streaming and the relevance of tiny memory',
          ],
          explanation: `What can you compute with a notebook of $O(\\log n)$ bits while reading an $n$-bit input from a read-only tape? A logarithmic number of bits holds a constant number of **pointers** into the input, and that is enough for a surprising amount: checking whether a string is a palindrome (two indices), counting symbols, adding and multiplying binary numbers, and evaluating a Boolean formula given as a tree, are all in **L**. **NL** allows nondeterminism, and its canonical problem is **PATH**: guess the next vertex, keeping only the current vertex and a step counter, both $O(\\log n)$ bits. It is not known whether PATH is in L (that is the L vs NL question), though *undirected* reachability is (Reingold, 2005), one of the few recent separations-adjacent results in the area.

Because a log-space machine has only polynomially many configurations (position on the input times work-tape contents times state), **NL $\\subseteq$ P**: build the configuration graph and run BFS. For completeness in such small classes, polynomial-time reductions are too strong (they could solve the problem outright); **log-space reductions** are used, and under them **PATH is NL-complete**: any NL computation is a reachability question in its configuration graph, which a log-space transducer can write out edge by edge. Savitch gives $\\mathrm{NL} \\subseteq \\mathrm{SPACE}(\\log^2 n)$, so the gap between L and NL is at most quadratic.

The **Immerman-Szelepcsényi theorem** (1987) is the surprise of the module: **NL = co-NL**, so non-reachability is also in NL. A nondeterministic log-space machine can *certify* that $t$ is *not* reachable from $s$ by **inductive counting**: compute, for each distance $d$, the number of vertices reachable within $d$ steps, by nondeterministically guessing and verifying the reachable set one vertex at a time while checking the count matches the previous round. Each round uses only counters. The analogous statement NP = co-NP is open and believed false, so this is a case where space behaves unlike time, and an example of a theorem that looked unreachable until a simple idea appeared.

Log-space thinking is also practical: streaming algorithms over data too large to store are exactly small-space computations. Read Sipser 8.4-8.6 and Arora-Barak chapter 4; the exercises implement log-space-style algorithms with an explicit memory budget and the configuration graph of a small machine.`,
          resources: [
            {
              title: 'MIT 18.404J — Lecture 19: L, NL, NL-completeness, NL = co-NL',
              url: 'https://ocw.mit.edu/courses/18-404j-theory-of-computation-fall-2020/',
              type: 'lecture',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
              primary: true,
            },
            {
              title: 'Computational Complexity: A Modern Approach (Arora and Barak) — Chapter 4: Space complexity (L, NL, Immerman-Szelepcsenyi)',
              url: 'https://theory.cs.princeton.edu/complexity/book.pdf',
              type: 'textbook',
              cost: 'free',
              provider: 'Sanjeev Arora and Boaz Barak',
            },
            {
              title: 'Introduction to Theoretical Computer Science (Barak) — Space bounded computation',
              url: 'https://introtcs.org/public/lec_14a_space_complexity.html',
              type: 'textbook',
              cost: 'free',
              provider: 'Boaz Barak',
            },
            {
              title: 'Complexity Zoo — L, NL and related classes',
              url: 'https://complexityzoo.net/Complexity_Zoo',
              type: 'documentation',
              cost: 'free',
              provider: 'Scott Aaronson and contributors',
            },
          ],
          exercises: [
            {
              slug: 'budgeted-memory-algorithms',
              title: 'Algorithms under a log-space budget',
              prompt:
                'Write a tiny "log-space VM" that exposes the input as a read-only array and allows only k = c * ceil(log2 n) bits of named integer state (enforce it by asserting all state variables stay below 2^k). Implement palindrome checking, binary addition of two input numbers (output written to a write-only stream), and nondeterministic PATH with an explicit guess oracle. Report the bits used for n = 10^3, 10^6.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'configuration-graph',
              title: 'Build the configuration graph',
              prompt:
                'For a small nondeterministic log-space machine (e.g. the PATH guesser on a 12-node graph, or a hand-written NTM with a bounded work tape), enumerate all configurations and edges, report the graph size as a function of n, and decide acceptance by BFS. Explain how this shows NL subset P and estimate the polynomial degree from your counts.',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'inductive-counting',
              title: 'Inductive counting for non-reachability',
              prompt:
                'Implement the Immerman-Szelepcsenyi procedure with explicit nondeterministic guesses (use a search over guesses to find a certifying run): compute the counts c_0, c_1, ..., c_n of vertices reachable within d steps, and certify that t is unreachable. Verify against BFS on 100 random graphs. Write a paragraph on why each round needs only O(log n) persistent memory.',
              kind: 'coding',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'Why is PATH in NL but not known to be in L?',
              answerOutline: 'Nondeterministically guessing the next vertex needs only the current vertex and a counter; deterministically, no log-space method is known (though undirected PATH is in L).',
            },
            {
              question: 'Why is NL contained in P?',
              answerOutline: 'The configuration graph has polynomially many nodes; acceptance is reachability, solved by BFS in polynomial time.',
            },
            {
              question: 'What does the Immerman-Szelepcsenyi theorem say and why is it surprising?',
              answerOutline: 'NL = co-NL: non-reachability can be certified nondeterministically in log space by inductive counting; the time analogue NP = co-NP is believed false.',
            },
          ],
        },
        {
          slug: 'randomised-complexity',
          title: 'Randomised complexity: BPP, RP and derandomisation',
          summary:
            'Algorithms that flip coins, the classes they define, amplification, the place of BPP among P, NP and PSPACE, and the conjecture that randomness can always be removed.',
          estimatedMinutes: 100,
          objectives: [
            'Define RP, co-RP, ZPP and BPP and classify polynomial identity testing, Miller-Rabin and Freivalds accordingly',
            'Prove error amplification by repetition using the Chernoff bound',
            'State the known relationships: P subset BPP subset PSPACE, BPP in Sigma_2, and Adleman\'s theorem BPP subset P/poly',
            'Explain the hardness-versus-randomness paradigm and why P = BPP is conjectured',
          ],
          concepts: [
            'Probabilistic TM; error probability over coin flips, not inputs',
            'RP (one-sided error), co-RP, ZPP = RP intersect co-RP, BPP (two-sided)',
            'Amplification by majority vote (Chernoff)',
            'Examples: Miller-Rabin (co-RP), polynomial identity testing (co-RP), Freivalds',
            'BPP subset PSPACE; BPP subset Sigma_2 (Sipser-Gacs-Lautemann)',
            'Adleman: BPP has polynomial-size circuits',
            'Pseudorandom generators and hardness vs randomness',
            'Primality: from co-RP to P (AKS) as a derandomisation success',
          ],
          explanation: `A **probabilistic Turing machine** flips coins, and its error probability is measured over the coins, for *every* input: there are no bad inputs, only unlucky runs. **BPP** (bounded-error probabilistic polynomial time) requires correctness with probability at least $2/3$ on every input; **RP** allows error only on yes-instances (never says yes wrongly); **co-RP** the reverse; **ZPP** = RP $\\cap$ co-RP consists of problems with zero-error algorithms of polynomial *expected* time (Las Vegas). The constant $2/3$ is arbitrary: run $k$ independent trials and take the majority, and the Chernoff bound (Discrete Mathematics module 7) drives the error to $2^{-\\Omega(k)}$. That **amplification** is what makes the classes robust.

The examples matter more than the definitions. **Miller-Rabin** puts COMPOSITES in RP (equivalently PRIMES in co-RP): a random base catches a composite with probability at least $3/4$ and never accuses a prime. **Polynomial identity testing** (is this arithmetic circuit identically zero?) is in co-RP by the Schwartz-Zippel lemma: evaluate at a random point in a large field; a nonzero polynomial of degree $d$ vanishes there with probability at most $d/|S|$. No deterministic polynomial algorithm is known, and finding one would have major consequences. **Freivalds'** matrix-product check from Discrete Mathematics is the same idea.

Where does BPP live? $\\mathrm{P} \\subseteq \\mathrm{BPP} \\subseteq \\mathrm{PSPACE}$ (enumerate all coin sequences in polynomial space). Sipser, Gács and Lautemann showed $\\mathrm{BPP} \\subseteq \\Sigma_2^P \\cap \\Pi_2^P$, just above NP in the polynomial hierarchy, and **Adleman** showed every BPP language has polynomial-size circuits: for each input length, some single coin sequence works for all inputs (by a union bound after amplification), so "hard-wire" it. Whether BPP $\\subseteq$ NP is open.

The modern view is **hardness versus randomness**: if there are sufficiently hard problems in EXPTIME (problems requiring exponential-size circuits), then there are **pseudorandom generators** that stretch a few truly random bits into many that no polynomial-time algorithm can distinguish from random, and then P = BPP. Most theorists believe both the hardness assumption and the conclusion: randomness probably buys only polynomial speed-ups, though it buys enormous simplicity. PRIMES moving from co-RP to P (AKS, 2002) is the flagship derandomisation success. Read Sipser 10.2, Barak chapters 18-19 and Arora-Barak chapter 7; the exercises measure amplification and implement identity testing.`,
          resources: [
            {
              title: 'Introduction to Theoretical Computer Science (Barak) — Probabilistic computation and Modeling randomized computation',
              url: 'https://introtcs.org/public/lec_16_randomized_alg.html',
              type: 'textbook',
              cost: 'free',
              provider: 'Boaz Barak',
              primary: true,
            },
            {
              title: 'Introduction to Theoretical Computer Science (Barak) — Modeling randomized computation (BPP and its relatives)',
              url: 'https://introtcs.org/public/lec_17_model_rand.html',
              type: 'textbook',
              cost: 'free',
              provider: 'Boaz Barak',
            },
            {
              title: 'Computational Complexity: A Modern Approach (Arora and Barak) — Chapter 7: Randomized computation',
              url: 'https://theory.cs.princeton.edu/complexity/book.pdf',
              type: 'textbook',
              cost: 'free',
              provider: 'Sanjeev Arora and Boaz Barak',
            },
            {
              title: 'MIT 18.404J — Lecture 22: Probabilistic computation, BPP',
              url: 'https://ocw.mit.edu/courses/18-404j-theory-of-computation-fall-2020/',
              type: 'lecture',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
            },
          ],
          exercises: [
            {
              slug: 'amplification-measured',
              title: 'Measure amplification',
              prompt:
                'Take a deliberately weak Miller-Rabin (one random base) and measure its error rate on Carmichael numbers and random composites over 10^4 trials. Then run k = 1, 2, 4, 8, 16 independent rounds and plot the measured error against the bound (1/4)^k. Repeat for a two-sided-error toy BPP algorithm (a coin-flip-noisy version of a correct decider with error 0.4) and majority voting, comparing with the Chernoff bound.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'polynomial-identity-testing',
              title: 'Polynomial identity testing',
              prompt:
                'Implement Schwartz-Zippel identity testing for polynomials given as arithmetic circuits (nested Python lambdas or expression trees) over a prime field of size about 2^61: evaluate at random points and compare. Test on identities such as (x+y)^n expanded versus unexpanded for n = 20, and on a pair differing by a single monomial. Prove the Schwartz-Zippel bound for a single variable and explain the multivariate induction.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'class-membership-arguments',
              title: 'Classify randomised algorithms',
              prompt:
                'For each algorithm state the class (RP, co-RP, ZPP, BPP) of the decision problem it solves and justify by the error pattern: Miller-Rabin; Freivalds; randomised quicksort as a decider for "is the list sorted after sorting" (trick question: explain); Schwartz-Zippel; a Monte Carlo pi estimator used to decide "pi > 3.14"; a Las Vegas algorithm for perfect matching via random matrices. Then prove ZPP = RP intersect co-RP.',
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'adleman-argument',
              title: 'Adleman\'s theorem',
              prompt:
                'Write the proof that BPP subset P/poly: amplify error below 2^-(n+1), apply a union bound over all 2^n inputs to find a single coin string that is correct on every input of length n, and hard-wire it. Then explain why this does not give P = BPP (what is non-uniform about the result?).',
              kind: 'derivation',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What is the difference between RP and BPP?',
              answerOutline: 'RP has one-sided error (never accepts a no-instance; may reject a yes-instance with probability at most 1/2); BPP allows error on both sides, bounded away from 1/2.',
            },
            {
              question: 'Why is the constant 2/3 in BPP\'s definition unimportant?',
              answerOutline: 'Majority vote over k independent runs reduces error exponentially in k (Chernoff), so any constant above 1/2 gives the same class.',
            },
            {
              question: 'What is the hardness-versus-randomness paradigm?',
              answerOutline: 'Sufficiently hard functions yield pseudorandom generators that replace true randomness, implying P = BPP under plausible circuit lower bounds.',
            },
          ],
        },
        {
          slug: 'a-glance-at-quantum-computation',
          title: 'A glance at quantum computation',
          summary:
            'Qubits, superposition and interference as a computational resource, the class BQP, what Shor and Grover achieve, and what quantum computers are not believed to do.',
          estimatedMinutes: 100,
          objectives: [
            'Describe the quantum circuit model: qubits, unitary gates, measurement, and amplitudes versus probabilities',
            'Explain interference with the Deutsch-Jozsa or Bernstein-Vazirani problem and simulate it classically for small n',
            'State what Shor\'s algorithm achieves (factoring in polynomial time via period finding) and what Grover\'s achieves (quadratic speed-up for search)',
            'Place BQP relative to P, BPP, NP and PSPACE, and explain why NP-complete problems are not expected to be in BQP',
          ],
          concepts: [
            'Qubit: unit vector in C^2; n qubits: 2^n amplitudes',
            'Unitary gates (Hadamard, CNOT, phase); measurement and the Born rule',
            'Interference: amplitudes cancel, probabilities cannot',
            'Deutsch-Jozsa and Bernstein-Vazirani as interference demonstrations',
            'Shor: factoring via quantum Fourier transform and period finding',
            'Grover: O(sqrt N) unstructured search and its optimality',
            'BQP: P subset BPP subset BQP subset PSPACE',
            'The extended Church-Turing thesis under pressure',
          ],
          explanation: `Classical randomised computation keeps a probability distribution over states: non-negative numbers summing to 1. **Quantum** computation keeps **amplitudes**: complex numbers whose squared magnitudes sum to 1. A **qubit** is a unit vector $\\alpha|0\\rangle + \\beta|1\\rangle$ in $\\mathbb{C}^2$; $n$ qubits form a unit vector in $\\mathbb{C}^{2^n}$, with $2^n$ amplitudes. Computation applies **unitary** (length-preserving, reversible) gates such as the Hadamard $H$ (which maps $|0\\rangle$ to an equal superposition) and CNOT (which entangles two qubits); **measurement** collapses the state, returning outcome $x$ with probability $|\\alpha_x|^2$. The single new phenomenon is **interference**: amplitudes can be negative, so paths to the same outcome can *cancel*. Probabilities only add; amplitudes can subtract. Every quantum speed-up is an arrangement of cancellations.

**Deutsch-Jozsa** shows it in miniature: given a Boolean function promised to be constant or balanced, one quantum query (Hadamards, one call to the function as a phase oracle, Hadamards, measure) decides which, where any deterministic classical algorithm needs $2^{n-1} + 1$ queries. Simulate it for $n = 10$ with a NumPy vector of 1024 amplitudes and watch the wrong outcomes cancel to exactly zero. **Bernstein-Vazirani** recovers a hidden string in one query the same way.

**Shor's algorithm** (1994) factors $n$-bit integers in polynomial time. Factoring reduces classically to finding the period of $a^x \\bmod N$; a quantum computer prepares a superposition over all $x$, computes the function, and uses the **quantum Fourier transform** to make the amplitudes interfere constructively at multiples of the inverse period. RSA (Discrete Mathematics module 3) is broken by a large enough quantum computer, which is why post-quantum cryptography exists. **Grover's algorithm** (1996) searches an unstructured space of $N$ items in $O(\\sqrt{N})$ queries by repeatedly rotating amplitude toward the marked item; this is provably optimal, so quantum computers do *not* search exponentially faster.

The class **BQP** (bounded-error quantum polynomial time) satisfies $\\mathrm{BPP} \\subseteq \\mathrm{BQP} \\subseteq \\mathrm{PSPACE}$ (simulate amplitudes one path at a time). Factoring is in BQP and not known to be in BPP, which is the evidence against the extended Church-Turing thesis. But NP-complete problems are **not** believed to be in BQP: Grover's optimality gives only $2^{n/2}$ for SAT by brute force, and relative to oracles BQP does not contain NP. Quantum computers change the landscape without erasing it. Read Barak's quantum chapter and the Matuschak-Nielsen essay; Aaronson's lectures are the best informal account of what the model can and cannot do.`,
          resources: [
            {
              title: 'Introduction to Theoretical Computer Science (Barak) — Quantum computing',
              url: 'https://introtcs.org/public/lec_26_quantum_computing.html',
              type: 'textbook',
              cost: 'free',
              provider: 'Boaz Barak',
              primary: true,
            },
            {
              title: 'Quantum computing for the very curious (Matuschak and Nielsen)',
              url: 'https://quantum.country/qcvc',
              type: 'interactive',
              cost: 'free',
              provider: 'Andy Matuschak and Michael Nielsen',
              note: 'The qubit, gates and the circuit model with spaced-repetition questions; a few hours well spent.',
            },
            {
              title: 'Quantum Computing Since Democritus — lecture notes (Scott Aaronson)',
              url: 'https://www.scottaaronson.com/democritus/',
              type: 'lecture',
              cost: 'free',
              provider: 'Scott Aaronson',
              note: 'Lectures 9-10 on quantum computing and BQP; the book version is paid, the notes are free.',
            },
            {
              title: 'Quantum Computation and Quantum Information (Nielsen and Chuang)',
              url: 'https://www.cambridge.org/highereducation/books/quantum-computation-and-quantum-information/01E10196D0A682A6AEFFEA52D53BE9AE',
              type: 'textbook',
              cost: 'paid',
              provider: 'Cambridge University Press',
              note: 'The standard reference; the free resources above suffice for this lesson.',
            },
          ],
          exercises: [
            {
              slug: 'state-vector-simulator',
              title: 'A state-vector simulator',
              prompt:
                'With NumPy, represent n qubits as a 2^n complex vector and implement Hadamard, X, Z, CNOT and a phase oracle for a Boolean function, applying gates by reshaping and einsum (or explicit index arithmetic). Verify unitarity (norm preserved) and that measuring H|0> gives 0/1 with probability 1/2 each over 10^4 samples. Report the memory used for n = 10, 20, 26.',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'deutsch-jozsa',
              title: 'Deutsch-Jozsa and Bernstein-Vazirani',
              prompt:
                'Implement Deutsch-Jozsa for n = 8 with a constant function and a balanced one; print the final amplitude vector and show that for the balanced case the all-zeros amplitude is exactly 0 while for the constant case it is 1 in magnitude. Then implement Bernstein-Vazirani and recover a random 12-bit hidden string in one oracle call. Count how many oracle calls a deterministic classical algorithm needs in each case.',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'grover-small',
              title: 'Grover\'s search for small N',
              prompt:
                'Implement Grover iterations (oracle phase flip plus diffusion) for N = 2^n with n = 4..10 and a single marked item. Plot the success probability against the number of iterations and confirm the peak near (pi/4) sqrt(N). Show that over-iterating reduces success probability, and explain why this cannot be fixed by "just running longer".',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'bqp-landscape',
              title: 'Place BQP',
              prompt:
                'Write a one-page account: the definition of BQP; why BPP subset BQP; why BQP subset PSPACE (how to simulate amplitudes with polynomial space); what Shor shows about factoring and the extended Church-Turing thesis; why NP subset BQP is not expected (Grover optimality, oracle results); and what quantum computers would and would not change for cryptography and for NP-hard optimisation.',
              kind: 'writing',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What is the one phenomenon that distinguishes quantum from randomised computation?',
              answerOutline: 'Interference: amplitudes can be negative or complex and cancel, whereas probabilities only add.',
            },
            {
              question: 'What does Shor\'s algorithm achieve and what does it threaten?',
              answerOutline: 'Factoring (and discrete log) in polynomial time via quantum period finding; it breaks RSA and classical Diffie-Hellman.',
            },
            {
              question: 'Does Grover\'s algorithm put NP in BQP?',
              answerOutline: 'No; it gives a quadratic speed-up (2^(n/2) for SAT), which is provably optimal for unstructured search.',
            },
            {
              question: 'Where does BQP sit among the classical classes?',
              answerOutline: 'BPP subset BQP subset PSPACE; its relation to NP is unknown, with oracle evidence that neither contains the other.',
            },
          ],
        },
      ],
      project: {
        slug: 'beyond-np-simulations',
        title: 'Module project: simulations beyond NP',
        description:
          'Implement and measure one algorithm from each lesson of this module: Savitch reachability with space accounting versus BFS; the inductive-counting non-reachability certifier; Schwartz-Zippel identity testing with amplification curves; and a state-vector quantum simulator running Deutsch-Jozsa and Grover. Write a report that connects each measurement to the class it illustrates and to the open questions around it.',
        deliverables: [
          'Four tested implementations with instrumentation for space, error rate or success probability',
          'Plots: space versus time for Savitch/BFS, error versus repetitions for randomised tests, success probability versus Grover iterations',
          'A report placing L, NL, P, BPP, BQP, NP, PSPACE on one annotated diagram with proven and conjectured relationships',
        ],
        estimatedHours: 10,
      },
    },
  ],
  capstone: {
    slug: 'reductions-and-simulators',
    title: 'Capstone: a reductions portfolio and an automata-and-Turing-machine simulator suite',
    description: `Part one is a formal write-up of eight reductions, each with a precise statement, the construction, a proof of correctness in both directions, and a note on what the reduction establishes: at least three mapping reductions proving undecidability (for example A_TM to HALT, to E_TM via complement, to a problem about CFGs or the Post correspondence problem), one use of Rice's theorem, and at least four polynomial-time reductions proving NP-completeness (for example 3-SAT to Independent Set, Independent Set to Vertex Cover, 3-SAT to Subset Sum or Hamiltonian Path, and one reduction to a problem of your own choosing not covered in the lessons). Each polynomial-time reduction must be implemented and tested: generate random instances, reduce, solve both sides with brute force or a SAT solver, and confirm agreement.

Part two is a simulator suite that unifies the module projects: DFA/NFA/regex engine with minimisation and equivalence, CFG toolkit with CYK and PDA, multi-tape and nondeterministic Turing machine simulator with a universal machine, and a SAT-based solver for NP-complete problems via your reductions. It must be a tested, documented package with a command-line interface and at least one visualisation (automaton diagrams via Graphviz, or Turing machine tape traces). Include a benchmark section measuring the subset-construction blow-up, CYK's cubic growth, the quadratic multi-tape slowdown, and SAT-solver scaling on reduced instances, with a discussion relating every measurement to a theorem.`,
    deliverables: [
      'A typeset document of eight reductions with full correctness proofs and classification statements',
      'Executable implementations of all polynomial-time reductions with randomised agreement tests',
      'A tested, documented simulator package with a CLI covering automata, grammars, Turing machines and SAT-based solving',
      'A benchmark report with plots and theorem-by-theorem commentary',
    ],
    estimatedHours: 25,
    stretchGoals: [
      'Implement the Cook-Levin reduction concretely: from a TM, input and time bound to a CNF formula, and verify satisfiability tracks acceptance for tiny machines',
      'Write the universal Turing machine as an actual transition table and run it in your own simulator',
      'Implement Savitch\'s algorithm for a small PSPACE problem (generalised geography on tiny graphs) and measure its space usage',
      'Reproduce the BB(4) = 107 busy-beaver result by exhaustive search over 4-state machines with a halting-detection heuristic',
    ],
  },
  masteryChecklist: [
    'I can design DFAs, NFAs and regular expressions for a given language and prove them correct with state invariants or structural induction',
    'I can prove a language is not regular with the pumping lemma or a fooling set, and compute the minimal DFA',
    'I can write unambiguous context-free grammars, convert to Chomsky normal form, run CYK, and prove a language is not context-free',
    'I can describe Turing machines at the appropriate level, explain the universal machine, and state the Church-Turing thesis precisely',
    'I can prove undecidability by diagonalisation, by mapping reduction and by Rice\'s theorem, and classify languages as decidable, recognisable, co-recognisable or neither',
    'I can define P, NP, co-NP, PSPACE and EXPTIME, state the known inclusions and separations, and explain what P = NP would mean',
    'I can prove NP-completeness by polynomial-time reduction from a known NP-complete problem, in both directions of correctness',
    'I can explain how SAT solvers, approximation, parameterisation and randomness cope with NP-hard problems in practice',
    'I can explain Savitch\'s theorem, the class BPP, and what quantum algorithms do and do not change about the complexity landscape',
    'I have built and tested simulators for every model in this subject and used them to check theorems empirically',
  ],
});
