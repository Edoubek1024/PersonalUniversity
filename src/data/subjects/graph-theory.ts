import { defineSubject } from '../define';
import type { ResourceInput } from '../types';

const guichard = (note: string): ResourceInput => ({
  title: 'Combinatorics and Graph Theory (Guichard)',
  url: 'https://www.whitman.edu/mathematics/cgt_online/book/',
  type: 'textbook',
  cost: 'free',
  provider: 'Whitman College',
  note,
  primary: true,
});

const diestel = (note: string): ResourceInput => ({
  title: 'Graph Theory (Diestel)',
  url: 'https://diestel-graph-theory.com/',
  type: 'textbook',
  cost: 'freemium',
  provider: 'Reinhard Diestel',
  note,
});

const trotter = (note: string): ResourceInput => ({
  title: 'Applied Combinatorics (Keller and Trotter)',
  url: 'https://www.appliedcombinatorics.org/',
  type: 'textbook',
  cost: 'free',
  provider: 'Mitchel T. Keller and William T. Trotter',
  note,
});

const ocw315 = (note: string): ResourceInput => ({
  title: 'MIT 18.315 Combinatorial Theory: Introduction to Graph Theory, Extremal and Enumerative Combinatorics',
  url: 'https://ocw.mit.edu/courses/18-315-combinatorial-theory-introduction-to-graph-theory-extremal-and-enumerative-combinatorics-spring-2005/',
  type: 'course',
  cost: 'free',
  provider: 'MIT OpenCourseWare',
  note,
});

const networkx = (note: string): ResourceInput => ({
  title: 'NetworkX documentation: Algorithms',
  url: 'https://networkx.org/documentation/stable/reference/algorithms/index.html',
  type: 'documentation',
  cost: 'free',
  provider: 'NetworkX',
  note,
});

export default defineSubject({
  id: 'graph-theory',
  title: 'Graph Theory',
  category: 'math',
  tagline:
    'Vertices, edges and proofs: trees, connectivity, matchings, colouring, planarity, Hamiltonian cycles, Ramsey theory and extremal graphs.',
  description: `A graph is the simplest structure there is: a set of points and a record of which pairs are joined. Yet it models road networks, molecules, timetables, social networks and computer chips, and the questions it raises range from easy exercises to famous problems that took a century to settle. This course treats graph theory as a branch of mathematics. You will prove the main structural theorems, and you will use computers to explore and to check, not to replace, the proofs.

This course follows the topics in the public catalog description of University of Illinois MATH 412, Graph Theory. It is an original course and is not affiliated with the University of Illinois, and nothing here is taken from that course's materials. The six modules cover fundamentals and Eulerian circuits, trees and spanning trees, connectivity and matching (Menger, Hall, Konig and Tutte), colouring (Brooks, chromatic polynomials, Vizing), planarity (Euler's formula, Kuratowski, the five colour theorem), and further topics: Hamiltonian cycles, Ramsey theory and extremal graphs.

It assumes the proof course \`higher-mathematics\`, and it goes well beyond the graph chapters of \`discrete-mathematics\`, which you may want to skim first. Nearly every exercise is a proof. Where a statement can be checked on small graphs, you will also check it with NetworkX, because a quick search for a counterexample is the best way to find out whether you believe a claim before you try to prove it. Module projects build a graph toolkit, and the capstone turns it into a machine for testing conjectures.

Unless stated otherwise, graphs are finite and **simple**: no loops and no multiple edges. We write $n$ for the number of vertices, $m$ for the number of edges, $\\delta$ and $\\Delta$ for the least and greatest degree.`,
  difficulty: 'intermediate',
  estimatedHours: 60,
  prerequisites: ['higher-mathematics'],
  recommendedBackground: [
    'Induction, contradiction and the pigeonhole principle',
    'Basic counting: binomial coefficients',
    'Some Python, for the projects',
  ],
  tags: ['graphs', 'trees', 'matching', 'colouring', 'planarity', 'Ramsey theory', 'proofs'],
  core: false,
  modules: [
    {
      slug: 'fundamentals',
      title: 'Fundamentals',
      description:
        'Definitions, degrees and isomorphism, walks, paths and connectivity, and the first theorem of graph theory: Euler\'s characterisation of graphs with a circuit using every edge once.',
      lessons: [
        {
          slug: 'graphs-degrees-and-isomorphism',
          title: 'Graphs, degrees and isomorphism',
          summary:
            'The basic vocabulary, the handshake lemma, degree sequences and how to tell graphs apart.',
          estimatedMinutes: 130,
          objectives: [
            'Use the standard terms and families of graphs correctly',
            'Prove and apply the handshake lemma',
            'Decide whether a sequence is the degree sequence of a simple graph',
            'Prove or disprove that two graphs are isomorphic',
          ],
          concepts: [
            'Simple graph, multigraph',
            'Degree, regular graph',
            'Handshake lemma',
            'Degree sequence and Havel-Hakimi',
            'Isomorphism and invariants',
            'Complement, subgraph, induced subgraph',
            'Standard families $K_n$, $C_n$, $P_n$, $K_{m,n}$',
          ],
          explanation: `A **graph** $G=(V,E)$ has a vertex set $V$ and a set $E$ of unordered pairs of distinct vertices, the **edges**. The **degree** $d(v)$ is the number of edges at $v$. The families to know by name are the complete graph $K_n$, the cycle $C_n$, the path $P_n$, the complete bipartite graph $K_{m,n}$, the hypercube $Q_k$ and the Petersen graph. The Petersen graph is the source of a huge number of counterexamples.

**Handshake lemma.** $\\sum_vd(v)=2m$. Each edge contributes $1$ to the degree of each of its two ends. As a consequence, the number of odd-degree vertices is even. So no graph has degrees $3,3,3$, and a $3$-regular graph has an even number of vertices.

**Degree sequences.** When is a list of non-negative integers the degree sequence of a simple graph? An even sum is necessary but not sufficient. The **Havel-Hakimi** test decides: a non-increasing sequence $d_1\\ge d_2\\ge\\dots\\ge d_n$ is graphic if and only if the sequence obtained by deleting $d_1$ and subtracting $1$ from the next $d_1$ terms is graphic. The proof shows that if any realisation exists, there is one where the vertex of largest degree is joined to the next $d_1$ largest. This uses an edge swap: if $v_1\\sim x$ and $v_1\\not\\sim y$ with $d(y)\\ge d(x)$, then some $z$ has $y\\sim z$ and $x\\not\\sim z$, and exchanging $v_1x,yz$ for $v_1y,xz$ keeps all degrees.

**Isomorphism.** Graphs $G$ and $H$ are **isomorphic** if a bijection $V(G)\\to V(H)$ preserves adjacency in both directions. To show two graphs are isomorphic, exhibit the bijection. To show they are not, find an **invariant** that differs: degree sequence, number of triangles, connectedness, bipartiteness, or the lengths of shortest cycles. Equal invariants never prove isomorphism. There are pairs with the same degree sequence that are not isomorphic.

**Worked example.** Is $(4,4,4,1,1)$ graphic? The sum is $14$, which is even. Havel-Hakimi deletes the first $4$ and subtracts $1$ from the next four terms, giving $(3,3,0,0)$. Deleting the first $3$ and subtracting $1$ from the next three terms gives $(2,-1,-1)$, which has negative entries. So it is not graphic. Directly: three vertices of degree $4$ in a $5$-vertex graph would each be adjacent to all others, so each degree-$1$ vertex would have degree at least $3$.

Now try $(3,3,2,2,2)$. It reduces to $(2,1,1,2)$, reordered to $(2,2,1,1)$, then to $(1,0,1)$, reordered to $(1,1,0)$, then to $(0,0)$, which is realised by two isolated vertices. So it is graphic. Working back up the reductions builds a realisation: a $5$-cycle with one chord.

There are $2^{\\binom n2}$ labelled graphs on $n$ vertices, but far fewer up to isomorphism: $1,2,4,11,34,156$ for $n=1,\\dots,6$.`,
          resources: [
            guichard('Read the opening sections of the chapter on graph theory.'),
            trotter('The chapter on graph theory gives a second introduction with many exercises.'),
            networkx('`is_isomorphic` and `is_graphical` check hand answers, and `graph_atlas_g` lists all small graphs.'),
          ],
          exercises: [
            {
              slug: 'handshake-consequences',
              title: 'Consequences of the handshake lemma',
              prompt: `Prove the handshake lemma. Deduce that every graph has an even number of odd-degree vertices, and that a $k$-regular graph with $k$ odd has an even number of vertices. Prove that every graph with at least two vertices has two vertices of equal degree.`,
              kind: 'derivation',
              difficulty: 1,
              hint: 'For the last part, the degrees lie in 0 to n-1, but 0 and n-1 cannot both occur.',
            },
            {
              slug: 'havel-hakimi',
              title: 'Prove Havel-Hakimi',
              prompt: `Prove the Havel-Hakimi theorem, including the edge swap argument. Then decide which of these are graphic, and draw a realisation when one exists: $(5,5,4,3,2,1)$, $(4,3,3,2,2,2)$, $(6,5,4,3,2,1,1)$.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'self-complementary',
              title: 'Self-complementary graphs',
              prompt: `A graph is self-complementary if it is isomorphic to its complement. Show that $P_4$ and $C_5$ are self-complementary. Prove that a self-complementary graph on $n$ vertices has $n\\equiv 0$ or $1\\pmod 4$.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'same-degrees-not-isomorphic',
              title: 'Same degrees, different graphs',
              prompt: `Find two non-isomorphic graphs on $6$ vertices that are both $2$-regular, and two non-isomorphic connected graphs with degree sequence $(3,3,2,2,1,1)$. Prove non-isomorphism in each case with a named invariant, and confirm with NetworkX.`,
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'petersen-facts',
              title: 'The Petersen graph',
              prompt: `The Petersen graph has the $2$-element subsets of $\\{1,\\dots,5\\}$ as vertices, joined when disjoint. Show that it is $3$-regular with $15$ edges, that it has no cycles of length $3$ or $4$, and that any two non-adjacent vertices have exactly one common neighbour.`,
              kind: 'derivation',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Can a graph have degree sequence $(3,3,3,3,3)$?',
              answerOutline: `No. The sum is $15$, which is odd.`,
            },
            {
              question: 'Two graphs have the same degree sequence. Are they isomorphic?',
              answerOutline: `Not necessarily. $C_6$ and two disjoint triangles are both $2$-regular on $6$ vertices.`,
            },
            {
              question: 'How many edges has $K_{m,n}$, and how many has $Q_k$?',
              answerOutline: `$mn$, and $k2^{k-1}$, since $Q_k$ has $2^k$ vertices of degree $k$.`,
            },
          ],
          relatedLessons: ['discrete-mathematics/graphs-and-trees/graph-basics-and-the-handshake-lemma'],
        },
        {
          slug: 'walks-paths-and-connectivity',
          title: 'Walks, paths, cycles and bipartite graphs',
          summary:
            'Connectivity, cut vertices and bridges, counting walks with matrices, and the odd cycle characterisation of bipartite graphs.',
          estimatedMinutes: 140,
          objectives: [
            'Distinguish walks, trails, paths and cycles, and turn a walk into a path',
            'Characterise bridges by cycles',
            'Count walks with powers of the adjacency matrix',
            'Prove that a graph is bipartite if and only if it has no odd cycle',
          ],
          concepts: [
            'Walk, trail, path, cycle',
            'Connected component',
            'Distance and diameter',
            'Cut vertex and bridge',
            'Adjacency matrix',
            'Bipartite graph',
            'Odd cycle',
          ],
          explanation: `A **walk** is a sequence of vertices with consecutive ones adjacent. A **trail** repeats no edge, and a **path** repeats no vertex. A **cycle** is a closed path with at least three vertices. Every $u$-$v$ walk contains a $u$-$v$ path: if a vertex repeats, cut out the loop between its two visits and repeat. So "there is a walk" and "there is a path" mean the same thing. Being joined by a path is an equivalence relation, whose classes are the **components**. The **distance** $d(u,v)$ is the length of a shortest path.

**Bridges.** An edge whose removal increases the number of components is a **bridge**, and a vertex whose removal does is a **cut vertex**. An edge is a bridge if and only if it lies on no cycle. If $e=uv$ is on a cycle, the rest of the cycle reconnects $u$ and $v$. If $e$ is on no cycle, then after deleting $e$ there can be no $u$-$v$ path, since such a path plus $e$ would be a cycle.

**Counting walks.** Let $A$ be the **adjacency matrix**. Then $(A^k)_{uv}$ is the number of walks of length $k$ from $u$ to $v$. The proof is induction on $k$: a walk of length $k+1$ is a walk of length $k$ to some $w$, then an edge $wv$. Consequently, $\\operatorname{tr}(A^2)=2m$, and $\\operatorname{tr}(A^3)=6t$, where $t$ is the number of triangles, because each triangle gives $6$ closed walks of length $3$: three starting points and two directions.

**Bipartite graphs.** $G$ is **bipartite** if $V=X\\cup Y$ with every edge between $X$ and $Y$. **Theorem (Konig).** A graph is bipartite if and only if it has no cycle of odd length.

A cycle in a bipartite graph alternates sides, so it is even. Conversely, suppose $G$ has no odd cycle. We may assume $G$ is connected. Fix a vertex $r$, and let $X$ be the vertices at even distance from $r$, and $Y$ those at odd distance. Suppose an edge $uv$ had both ends in $X$, or both in $Y$. Shortest paths from $r$ to $u$ and to $v$, together with $uv$, form a closed walk of odd length. A closed walk of odd length always contains an odd cycle, which is a contradiction. That last fact needs its own short proof, by induction on length: split the walk at a repeated vertex, and one of the two pieces is odd.

**Worked example.** Count triangles in $K_4$ from its matrix. Here $A=J-I$, where $J$ is the all-ones matrix, and $J^2=4J$. So $A^2=J^2-2J+I=2J+I$, and $A^3=A\\cdot A^2=(J-I)(2J+I)=8J+J-2J-I=7J-I$. The diagonal entries are $6$, so $\\operatorname{tr}(A^3)=24$, and there are $24/6=4$ triangles. That matches $\\binom43=4$. Also $\\operatorname{tr}(A^2)=4\\cdot 3=12=2m$.

Breadth-first search finds components, distances and a bipartition (or an odd cycle) in time linear in $n+m$.`,
          resources: [
            guichard('See the sections on connectivity and on bipartite graphs in the graph theory chapter.'),
            diestel('The opening chapter on the basics covers paths, cycles, connectivity and bipartite graphs concisely.'),
            networkx('Use `bipartite.is_bipartite`, `bridges` and `articulation_points` to check examples.'),
          ],
          exercises: [
            {
              slug: 'walk-to-path',
              title: 'From walks to paths',
              prompt: `Prove that every $u$-$v$ walk contains a $u$-$v$ path whose edges are among those of the walk. Prove that every closed walk of odd length contains an odd cycle, and give an example showing that a closed walk of even length need not contain any cycle.`,
              kind: 'derivation',
              difficulty: 1,
            },
            {
              slug: 'connected-complement',
              title: 'A graph or its complement is connected',
              prompt: `Prove that for every graph $G$, at least one of $G$ and its complement is connected. Prove that if $G$ is disconnected then its complement has diameter at most $2$.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'minimum-degree-path',
              title: 'Long paths and cycles from minimum degree',
              prompt: `Let $G$ be a graph with minimum degree $\\delta\\ge 2$. Prove that $G$ contains a path of length at least $\\delta$ and a cycle of length at least $\\delta+1$. Show that both bounds are attained.`,
              kind: 'derivation',
              difficulty: 2,
              hint: 'Take a longest path. All neighbours of its endpoint lie on the path.',
            },
            {
              slug: 'walk-counts',
              title: 'Counting walks by matrix',
              prompt: `Compute the number of closed walks of length $4$ in $C_5$ and in $K_{3,3}$, by matrix powers and by a direct count. Prove that a graph with $\\operatorname{tr}(A^3)=0$ is triangle-free, and that $G$ is bipartite if and only if $\\operatorname{tr}(A^k)=0$ for every odd $k$.`,
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'cut-vertices',
              title: 'Cut vertices and bridges',
              prompt: `Prove that a connected graph with at least two vertices has at least two vertices that are not cut vertices. Prove that if $G$ is connected and $3$-regular, then $G$ has a cut vertex if and only if it has a bridge.`,
              kind: 'derivation',
              difficulty: 3,
              hint: 'For the first part, consider the ends of a longest path, or the leaves of a spanning tree.',
            },
          ],
          selfAssessment: [
            {
              question: 'Is every bridge incident to a cut vertex?',
              answerOutline: `An end of a bridge is a cut vertex unless it has degree $1$. In $K_2$ neither end is a cut vertex.`,
            },
            {
              question: 'Why is $C_7$ not bipartite while $Q_3$ is?',
              answerOutline: `$C_7$ is an odd cycle. $Q_3$ splits by the parity of the number of $1$s in a vertex label.`,
            },
            {
              question: 'What does $(A^k)_{uv}$ count?',
              answerOutline: `The number of walks of length $k$ from $u$ to $v$.`,
            },
          ],
          relatedLessons: ['discrete-mathematics/graphs-and-trees/paths-connectivity-and-traversal'],
        },
        {
          slug: 'eulerian-circuits',
          title: 'Eulerian circuits and trails',
          summary:
            'Euler\'s theorem, Hierholzer\'s algorithm, and directed versions that build de Bruijn sequences.',
          estimatedMinutes: 130,
          objectives: [
            'Prove that a connected graph has an Eulerian circuit exactly when all degrees are even',
            'Characterise graphs with an Eulerian trail',
            'Run Hierholzer\'s algorithm by hand',
            'Apply the directed version to construct de Bruijn sequences',
          ],
          concepts: [
            'Eulerian circuit and trail',
            'Even graph',
            'Hierholzer\'s algorithm',
            'Directed graph, in-degree and out-degree',
            'De Bruijn sequence',
            'Chinese postman problem',
          ],
          explanation: `An **Eulerian circuit** is a closed trail that uses every edge exactly once. Multigraphs are allowed here, so that the bridges of Konigsberg, with seven bridges between four land masses, fit the model.

**Euler's theorem.** A graph with no isolated vertices has an Eulerian circuit if and only if it is connected and every vertex has even degree.

Necessity: each pass through a vertex uses two of its edges, one in and one out, and the start contributes one out and finally one in. Sufficiency, by strong induction on the number of edges: if all degrees are even and positive, then $\\delta\\ge 2$, so $G$ contains a cycle $C$. Remove its edges. Every remaining component has all degrees even, and fewer edges, so by induction it has an Eulerian circuit, and each such component meets $C$, because $G$ was connected. Splice each circuit into $C$ at a shared vertex.

**Corollary.** A connected graph has an Eulerian trail, not closed, if and only if exactly two vertices have odd degree. The trail starts at one and ends at the other. To prove this, add an edge between the two odd vertices, take an Eulerian circuit, and remove the new edge.

The proof is also an algorithm, **Hierholzer's algorithm**: walk without reusing edges until you are stuck, which can only happen at the start; then go back to a vertex on your circuit with unused edges and splice in a new closed trail from there. It runs in linear time.

**Worked example.** Konigsberg had land masses with $5,3,3,3$ bridge ends. All four degrees are odd, so there is no Eulerian circuit, and no Eulerian trail either, since that allows at most two odd vertices.

Now take the "envelope" graph: a square $abcd$ with both diagonals $ac,bd$, and a roof vertex $e$ joined to $a$ and $b$. The degrees are $a{:}4$, $b{:}4$, $c{:}3$, $d{:}3$, $e{:}2$. Exactly two are odd, $c$ and $d$, so an Eulerian trail exists from $c$ to $d$, and it uses all $8$ edges. One is $c,a,e,b,a,d,c,b,d$. Checking the edges: $ca$, $ae$, $eb$, $ba$, $ad$, $dc$, $cb$, $bd$, each once. This is the familiar "draw it without lifting the pen" puzzle.

**Directed graphs.** A connected directed graph has an Eulerian circuit exactly when every vertex has equal in-degree and out-degree. Connectivity here means that the underlying graph is connected, once isolated vertices are removed. One application is a **de Bruijn sequence**: a cyclic binary string of length $2^k$ in which every $k$-bit string appears exactly once as a window. Take the vertices to be the $(k-1)$-bit strings, and give an edge for each $k$-bit string, from its first $k-1$ bits to its last $k-1$ bits. Every vertex has in-degree and out-degree $2$, and an Eulerian circuit spells out the sequence. For $k=3$ one answer is $00010111$.`,
          resources: [
            guichard('See the section on Euler circuits and walks.'),
            trotter('The chapter on graph theory treats Eulerian and Hamiltonian graphs.'),
            networkx('`eulerian_circuit` and `is_eulerian` implement exactly this theorem.'),
          ],
          exercises: [
            {
              slug: 'euler-proof',
              title: 'Prove Euler\'s theorem',
              prompt: `Write out a complete proof of Euler's theorem and its corollary for trails. Make explicit where connectivity is used, and what the theorem says about a graph that has isolated vertices.`,
              kind: 'derivation',
              difficulty: 1,
            },
            {
              slug: 'decompose-into-cycles',
              title: 'Decomposing into cycles',
              prompt: `Prove that a graph has all degrees even if and only if its edge set can be partitioned into cycles. Prove that a connected graph with exactly $2k$ odd vertices, $k\\ge 1$, has its edges partitioned into $k$ trails, and no fewer.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'de-bruijn',
              title: 'De Bruijn sequences',
              prompt: `Construct a binary de Bruijn sequence for $k=4$ by finding an Eulerian circuit by hand in the graph on $3$-bit strings. Prove the directed Euler theorem that you used. Then write code that produces a de Bruijn sequence for any $k$ and any alphabet size, and check its windows.`,
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'chinese-postman',
              title: 'The Chinese postman problem',
              prompt: `A postman must traverse every street of a connected network and return home, minimising total distance. Show that the extra distance is the minimum total length of a set of paths pairing up the odd-degree vertices. Solve it for the envelope graph with every edge of length $1$.`,
              kind: 'problem',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'Does $K_5$ have an Eulerian circuit? Does $K_6$?',
              answerOutline: `$K_5$ is $4$-regular, so yes. $K_6$ is $5$-regular, so no.`,
            },
            {
              question: 'Why must an Eulerian trail that is not closed start and end at odd vertices?',
              answerOutline: `Every other visit uses edges in pairs, so only the two ends can have odd degree.`,
            },
            {
              question: 'Which part of Euler\'s proof finds a cycle, and why does it exist?',
              answerOutline: `A graph with minimum degree at least $2$ has a cycle, by following a longest path back from its end.`,
            },
          ],
          relatedLessons: ['discrete-mathematics/graphs-and-trees/euler-and-hamilton'],
        },
      ],
      project: {
        slug: 'graph-toolkit',
        title: 'A graph toolkit',
        description: `Write your own small graph library in Python, with an adjacency-list representation, and use NetworkX only to check it. Implement breadth-first and depth-first search, components, distances, a bipartiteness test that returns either a bipartition or an odd cycle as a certificate, bridges and cut vertices in linear time, Havel-Hakimi with construction of a realisation, and Hierholzer's algorithm. Test each function on random graphs against NetworkX, and give each output a certificate that a separate checker verifies. This toolkit is the base for the later projects.`,
        deliverables: [
          'A tested library with the functions listed, each returning a checkable certificate',
          'Random tests comparing at least six functions with NetworkX on thousands of graphs',
          'A demonstration that produces de Bruijn sequences for $k$ up to $12$ and checks every window',
          'A timing plot showing linear growth for BFS and bridge finding',
          'A short write-up proving correctness of the bridge-finding algorithm',
        ],
        estimatedHours: 7,
        stretchGoals: ['Add a canonical form for graphs up to 8 vertices and use it to list all graphs up to isomorphism'],
      },
    },
    {
      slug: 'trees',
      title: 'Trees',
      description:
        'The many equivalent definitions of a tree, counting spanning trees with Cayley\'s formula and the matrix-tree theorem, and optimisation on trees.',
      lessons: [
        {
          slug: 'characterisations-of-trees',
          title: 'Characterisations of trees',
          summary:
            'Six equivalent definitions of a tree, leaves, and the centre of a tree.',
          estimatedMinutes: 130,
          objectives: [
            'Prove the equivalence of the standard characterisations of trees',
            'Use leaf deletion as an induction technique',
            'Count leaves from the degree sequence',
            'Prove that the centre of a tree is one vertex or two adjacent vertices',
          ],
          concepts: [
            'Tree and forest',
            'Leaf',
            'Acyclic, minimally connected, maximally acyclic',
            'Unique paths',
            'Leaf deletion induction',
            'Eccentricity and centre',
          ],
          explanation: `A **tree** is a connected graph with no cycles, and a **forest** is a graph with no cycles. Trees are the minimal way to connect vertices, and they come up everywhere: spanning trees of networks, search trees, phylogenies.

**Theorem.** For a graph $T$ with $n$ vertices, the following are equivalent:

1. $T$ is connected and acyclic.
2. $T$ is connected and has $n-1$ edges.
3. $T$ is acyclic and has $n-1$ edges.
4. Any two vertices are joined by exactly one path.
5. $T$ is connected, and deleting any edge disconnects it.
6. $T$ is acyclic, and adding any edge creates a cycle.

The key tool is the **leaf**, a vertex of degree $1$. Every tree with $n\\ge 2$ has at least two leaves: the two ends of a longest path are leaves, as any other neighbour of an end would extend the path or close a cycle. Removing a leaf leaves a tree with one fewer vertex, which drives induction. From this, 1 implies 2: a tree has $n-1$ edges, by removing leaves one at a time. For 4: two different paths between the same vertices would contain a cycle. For 5 and 6: an edge of a tree lies on no cycle, so it is a bridge, and adding $uv$ closes a cycle with the unique $u$-$v$ path. A useful general fact is that a forest with $n$ vertices and $c$ components has $n-c$ edges.

**Worked example.** A tree has $3$ vertices of degree $3$, $2$ vertices of degree $4$, and all other vertices are leaves. How many leaves does it have? Let $\\ell$ be the number of leaves. Then $n=\\ell+5$ and $m=n-1=\\ell+4$. The handshake lemma gives
$$\\ell+3\\cdot 3+2\\cdot 4=2(\\ell+4),$$
so $\\ell+17=2\\ell+8$, and $\\ell=9$. In general, $\\ell=2+\\sum_{d(v)\\ge 3}(d(v)-2)$, because $\\sum_v(d(v)-2)=2(n-1)-2n=-2$. Check: $2+3\\cdot 1+2\\cdot 2=9$. In particular, a tree with a vertex of degree $k$ has at least $k$ leaves.

**The centre.** The **eccentricity** of $v$ is the largest distance from $v$ to another vertex, and the **centre** is the set of vertices of least eccentricity. In a tree with at least three vertices, deleting all the leaves reduces every eccentricity by exactly $1$, because a farthest vertex from any non-leaf is always a leaf. So the centre is unchanged. Repeating, you reach a single vertex or a single edge. So the centre of a tree is one vertex, or two adjacent vertices. The centre of $P_5$ is its middle vertex, and that of $P_6$ is its middle edge.

Trees are bipartite, as they have no cycles at all. Every connected graph contains a **spanning tree**, a subgraph that is a tree and uses every vertex: repeatedly delete an edge that lies on a cycle.`,
          resources: [
            guichard('Read the section on trees in the graph theory chapter.'),
            diestel('The opening chapter has a compact treatment of trees and forests, including the equivalences.'),
            trotter('The chapter on graph theory gives more examples of trees.'),
          ],
          exercises: [
            {
              slug: 'equivalences',
              title: 'Prove the equivalences',
              prompt: `Prove the equivalence of the six characterisations of trees. Organise the proof as a cycle of implications, or another scheme of your choice, and make sure every implication is covered.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'leaves-from-degrees',
              title: 'Leaves from degrees',
              prompt: `Prove that in a tree, the number of leaves is $2+\\sum_{d(v)\\ge 3}(d(v)-2)$. Use it to show that a tree with maximum degree $\\Delta$ has at least $\\Delta$ leaves. How many leaves does a tree with $4$ vertices of degree $3$ and $1$ vertex of degree $5$ have?`,
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'centre-of-a-tree',
              title: 'The centre',
              prompt: `Prove that the centre of a tree is a single vertex or two adjacent vertices. Prove that the diameter $D$ and radius $r$ of a tree satisfy $D=2r$ or $D=2r-1$, and that both occur.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'tree-subgraph',
              title: 'Every tree fits',
              prompt: `Let $T$ be a tree with $k$ edges, and let $G$ be a graph with minimum degree at least $k$. Prove that $G$ contains a copy of $T$ as a subgraph. Show that the bound $k$ cannot be lowered to $k-1$.`,
              kind: 'derivation',
              difficulty: 3,
              hint: 'Induction on k: remove a leaf of T, embed the rest, and count the neighbours available to the parent of the leaf.',
            },
          ],
          selfAssessment: [
            {
              question: 'A forest has $20$ vertices and $16$ edges. How many components has it?',
              answerOutline: `$20-16=4$.`,
            },
            {
              question: 'Why does every tree with at least two vertices have a leaf?',
              answerOutline: `The ends of a longest path are leaves. Another neighbour of an end would extend the path or close a cycle.`,
            },
            {
              question: 'What is the centre of the star $K_{1,5}$?',
              answerOutline: `The middle vertex, which has eccentricity $1$.`,
            },
          ],
          relatedLessons: ['discrete-mathematics/graphs-and-trees/trees'],
        },
        {
          slug: 'spanning-trees-and-cayley',
          title: 'Counting spanning trees',
          summary:
            'Cayley\'s formula by Prufer codes, the matrix-tree theorem, and deletion-contraction.',
          estimatedMinutes: 160,
          objectives: [
            'Encode and decode labelled trees by Prufer sequences',
            'Prove Cayley\'s formula $n^{n-2}$',
            'Count spanning trees with the matrix-tree theorem',
            'Use the recurrence $\\tau(G)=\\tau(G-e)+\\tau(G/e)$',
          ],
          concepts: [
            'Labelled tree',
            'Prufer sequence',
            'Cayley\'s formula',
            'Laplacian matrix',
            'Matrix-tree theorem',
            'Deletion and contraction',
            'Number of spanning trees $\\tau(G)$',
          ],
          explanation: `How many trees are there on the labelled vertex set $\\{1,\\dots,n\\}$? Draw the small cases and you find $1,1,3,16,125$. **Cayley's formula** says the answer is $n^{n-2}$.

**Prufer sequences** prove it with a bijection. To encode a tree on $n\\ge 2$ labelled vertices, repeatedly remove the leaf with the smallest label, and record its neighbour. Stop when two vertices remain. The result is a sequence of length $n-2$ with entries in $\\{1,\\dots,n\\}$. Each vertex $v$ appears exactly $d(v)-1$ times, since it is recorded each time a neighbour is removed, except for the last. So leaves are exactly the labels missing from the sequence, and that lets you decode. At each step, the smallest label not yet used and not appearing in the rest of the sequence is the leaf that was removed, and it was joined to the current entry. At the end, join the two remaining vertices. Since encoding and decoding are inverse, the trees are in bijection with $\\{1,\\dots,n\\}^{n-2}$.

**Worked example.** Take the tree on $\\{1,\\dots,7\\}$ with edges $14,24,34,45,56,67$. The smallest leaf is $1$, with neighbour $4$. Then $2$ goes, with $4$. Then $3$, with $4$. Now $4$ is a leaf, with neighbour $5$. Then $5$, with neighbour $6$. Two vertices, $6$ and $7$, remain. The code is $(4,4,4,5,6)$. As a check, $4$ appears three times and has degree $4$, while $1,2,3,7$ are missing and are the leaves.

The degree count gives a refinement: the number of labelled trees with degrees $d_1,\\dots,d_n$ is the multinomial coefficient $\\frac{(n-2)!}{\\prod(d_i-1)!}$.

**The matrix-tree theorem.** For a general graph $G$, let $L=D-A$ be the **Laplacian**, where $D$ is the diagonal matrix of degrees. Then the number of spanning trees $\\tau(G)$ equals any cofactor of $L$: delete row $i$ and column $i$, and take the determinant. For $K_4$, $L=4I-J$. Deleting one row and column leaves the $3\\times 3$ matrix with $3$ on the diagonal and $-1$ elsewhere, whose determinant is $16=4^2$, matching Cayley. The theorem also gives $\\tau(K_{m,n})=m^{n-1}n^{m-1}$, $\\tau(Q_3)=384$, and $\\tau=2000$ for the Petersen graph.

**Deletion-contraction.** For an edge $e$ that is not a loop, $\\tau(G)=\\tau(G-e)+\\tau(G/e)$. Spanning trees avoiding $e$ are those of $G-e$, and spanning trees using $e$ correspond to spanning trees of $G/e$, where $e$ is contracted to a point. Contraction may create multiple edges, and they must be kept. This recurrence is short to prove and slow to use, but it is a model for the chromatic polynomial in Module 4.`,
          resources: [
            guichard('The section on trees gives background for this lesson.'),
            ocw315('The early lectures treat Cayley\'s formula and the matrix-tree theorem.'),
            networkx('`to_prufer_sequence`, `from_prufer_sequence` and `number_of_spanning_trees` check your work.'),
          ],
          exercises: [
            {
              slug: 'prufer-decode',
              title: 'Decode a Prufer sequence',
              prompt: `Decode the Prufer sequence $(2,2,5,5,3)$ into a tree on $\\{1,\\dots,7\\}$, listing the edges in the order found. Re-encode your tree to check. Prove that the decoding algorithm always produces a tree.`,
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'cayley-proof',
              title: 'Prove Cayley\'s formula',
              prompt: `Prove that Prufer encoding is a bijection between labelled trees on $n\\ge 2$ vertices and sequences in $\\{1,\\dots,n\\}^{n-2}$. Deduce the count of labelled trees with a given degree sequence, and use it to count labelled trees on $6$ vertices with degrees $(3,3,1,1,1,1)$ in that order.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'matrix-tree-computations',
              title: 'Matrix-tree computations',
              prompt: `Use the matrix-tree theorem to find $\\tau(C_n)$, $\\tau(K_{2,3})$ and $\\tau$ of the wheel with $5$ rim vertices. Check each with deletion-contraction or a direct count, and confirm with NetworkX.`,
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'spanning-trees-of-kn-minus-edge',
              title: 'Trees avoiding an edge',
              prompt: `Use symmetry to show that each edge of $K_n$ lies in exactly $2n^{n-3}$ spanning trees. Deduce $\\tau(K_n-e)=(n-2)n^{n-3}$.`,
              kind: 'derivation',
              difficulty: 2,
              hint: 'Each spanning tree has n - 1 edges, and K_n has n(n-1)/2 edges, all alike.',
            },
            {
              slug: 'complete-bipartite-trees',
              title: 'Spanning trees of complete bipartite graphs',
              prompt: `Prove that $\\tau(K_{m,n})=m^{n-1}n^{m-1}$, either with the matrix-tree theorem by finding the eigenvalues of the Laplacian, or with a Prufer-style bijection.`,
              kind: 'derivation',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'How many labelled trees are there on $5$ vertices?',
              answerOutline: `$5^3=125$.`,
            },
            {
              question: 'How do you read the leaves of a tree off its Prufer sequence?',
              answerOutline: `They are the labels that do not appear. A vertex appears $d(v)-1$ times.`,
            },
            {
              question: 'Why must multiple edges be kept in the contraction $G/e$?',
              answerOutline: `Each parallel edge gives different spanning trees of $G$, so deleting duplicates would undercount.`,
            },
          ],
          relatedLessons: ['discrete-mathematics/graphs-and-trees/trees'],
        },
        {
          slug: 'minimum-spanning-trees-and-shortest-paths',
          title: 'Optimisation on trees',
          summary:
            'Minimum spanning trees by Kruskal and Prim, the cut property behind them, and shortest path trees.',
          estimatedMinutes: 140,
          objectives: [
            'Prove the cut property and the cycle property',
            'Run Kruskal\'s and Prim\'s algorithms and prove them correct',
            'Run Dijkstra\'s algorithm, and know when it fails',
            'Distinguish a minimum spanning tree from a shortest path tree',
          ],
          concepts: [
            'Weighted graph',
            'Minimum spanning tree',
            'Cut property',
            'Cycle property',
            'Kruskal\'s and Prim\'s algorithms',
            'Dijkstra\'s algorithm',
            'Shortest path tree',
          ],
          explanation: `Given a connected graph with edge weights, a **minimum spanning tree** (MST) is a spanning tree of least total weight. Two exchange properties justify all the standard algorithms.

**Cut property.** Let $S$ be a nonempty proper subset of the vertices, and let $e$ be an edge of least weight with exactly one end in $S$. Then some MST contains $e$. If an MST $T$ does not contain $e$, then adding $e$ closes a cycle, which must cross between $S$ and its complement again at some edge $f$. Then $T+e-f$ is a spanning tree of weight at most that of $T$.

**Cycle property.** An edge of greatest weight on a cycle, if it is strictly the greatest, is in no MST.

**Kruskal's algorithm** sorts the edges by weight and adds each edge that does not close a cycle. **Prim's algorithm** grows one tree from a vertex, always adding the cheapest edge leaving it. Each added edge is a cheapest edge across some cut, so both algorithms are correct by the cut property. If all weights are distinct, the MST is unique.

**Worked example.** Take vertices $A$ to $F$, with edge weights $AB{:}4$, $AC{:}3$, $BC{:}1$, $BD{:}2$, $CD{:}4$, $CE{:}5$, $DE{:}7$, $DF{:}6$, $EF{:}3$. Kruskal takes the edges in increasing order:

- $BC$ (1): accept.
- $BD$ (2): accept.
- $AC$ (3) and $EF$ (3): accept both.
- $CD$ (4): it would close the cycle $C,B,D$, so reject. Likewise $AB$ (4) would close $A,B,C$, so reject.
- $CE$ (5): it joins the two components $\\{A,B,C,D\\}$ and $\\{E,F\\}$, so accept.

Now there are $5$ edges on $6$ vertices, and we stop. The total weight is $1+2+3+3+5=14$.

**Shortest paths are a different problem.** For a source $s$ and non-negative weights, **Dijkstra's algorithm** repeatedly fixes the closest unfixed vertex, and relaxes the edges out of it. From $A$ in the example, the distances are $A{:}0$, $C{:}3$, $B{:}4$, $D{:}6$, $E{:}8$, $F{:}11$. The edges used form a **shortest path tree**, which differs from the MST: here the vertex $B$ is reached by the edge $AB$ or by $A,C,B$, both of length $4$, and $F$ is reached through $E$. The MST minimises total weight, while the shortest path tree minimises each distance from $s$.

Dijkstra's correctness rests on non-negativity: when a vertex is fixed, no later path can be shorter, since extending a path never decreases its length. With a negative edge this fails, and the Bellman-Ford algorithm is needed.`,
          resources: [
            trotter('The chapter on graph algorithms covers minimum spanning trees and shortest paths with proofs.'),
            guichard('See the section on optimal spanning trees.'),
            networkx('`minimum_spanning_tree` and `single_source_dijkstra` let you check the worked example.'),
          ],
          exercises: [
            {
              slug: 'cut-and-cycle',
              title: 'Cut and cycle properties',
              prompt: `Prove the cut property and the cycle property. Deduce that Kruskal's and Prim's algorithms are correct, and that the MST is unique when all edge weights are distinct.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'bottleneck',
              title: 'Minimax paths',
              prompt: `Prove that in a minimum spanning tree $T$, the path between any two vertices $u,v$ minimises, over all $u$-$v$ paths in $G$, the weight of the heaviest edge on the path.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'negative-weights',
              title: 'Where Dijkstra fails',
              prompt: `Give a weighted directed graph with one negative edge, but no negative cycle, on which Dijkstra's algorithm returns a wrong distance. Explain which step of the correctness proof breaks. Then show that adding a constant to every weight does not fix the problem in general.`,
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'second-best-tree',
              title: 'The second best spanning tree',
              prompt: `Prove that, when weights are distinct, a second-best spanning tree differs from the MST in exactly one edge swap. The worked example has repeated weights. Find all of its spanning trees of the second smallest weight, and that weight.`,
              kind: 'derivation',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'Does the cut property need distinct weights?',
              answerOutline: `No, but then it says that some MST contains $e$, not every MST.`,
            },
            {
              question: 'Can an MST and a shortest path tree from $s$ differ?',
              answerOutline: `Yes. In a triangle with $sa{:}2$, $sb{:}2$ and $ab{:}1$, the MST uses $ab$ and one edge at $s$, with weight $3$. The shortest path tree from $s$ uses $sa$ and $sb$.`,
            },
            {
              question: 'Why does Dijkstra need non-negative weights?',
              answerOutline: `So that a vertex's distance is final when it is closest among the unfixed ones.`,
            },
          ],
        },
      ],
    },
    {
      slug: 'connectivity-and-matching',
      title: 'Connectivity and Matching',
      description:
        'How robustly a graph is connected, Menger\'s theorem, and the theorems of Hall, Konig and Tutte on matchings.',
      lessons: [
        {
          slug: 'connectivity-and-menger',
          title: 'Connectivity and Menger\'s theorem',
          summary:
            'Vertex and edge connectivity, and the min-max theorem equating disjoint paths with separating sets.',
          estimatedMinutes: 160,
          objectives: [
            'Compute vertex and edge connectivity, and prove $\\kappa\\le\\lambda\\le\\delta$',
            'State Menger\'s theorem in vertex and edge forms',
            'Use Menger to characterise $k$-connected graphs',
            'Prove Whitney\'s characterisation of $2$-connected graphs',
          ],
          concepts: [
            'Vertex connectivity $\\kappa$',
            'Edge connectivity $\\lambda$',
            '$k$-connected graph',
            'Separating set',
            'Internally disjoint paths',
            'Menger\'s theorem',
            'Max-flow min-cut',
          ],
          explanation: `A graph is **$k$-connected** if it has more than $k$ vertices and stays connected after deleting any $k-1$ vertices. The **connectivity** $\\kappa(G)$ is the largest such $k$. The **edge connectivity** $\\lambda(G)$ is the least number of edges whose deletion disconnects $G$. Always
$$\\kappa(G)\\le\\lambda(G)\\le\\delta(G).$$
The second inequality holds because deleting the edges at a vertex of minimum degree isolates it. For the first, given a disconnecting set of $\\lambda$ edges, choose one end of each, avoiding a vertex, and argue that deleting those at most $\\lambda$ vertices disconnects $G$ or leaves a single vertex.

The inequalities can be strict. Join two copies of $K_5$ by two edges that share an end $x$ in the first copy. Then deleting $x$ disconnects, so $\\kappa=1$. Deleting the two joining edges disconnects, so $\\lambda=2$. And $\\delta=4$.

**Menger's theorem.** Let $u,v$ be non-adjacent vertices. The maximum number of internally disjoint $u$-$v$ paths equals the minimum number of vertices whose deletion separates $u$ from $v$. The **edge form** says that the maximum number of edge-disjoint $u$-$v$ paths equals the minimum number of edges separating $u$ from $v$.

One inequality is easy: each separating set must hit every path, and disjoint paths need distinct vertices, so the paths are at most the separator size. The content is the reverse inequality. It can be proved by induction on the number of edges, or derived from the max-flow min-cut theorem, by giving every edge capacity $1$. The flow proof is also an algorithm. Augmenting paths find the disjoint paths and the separator at the same time, and each certifies that the other is optimal.

**Global version (Whitney).** $G$ is $k$-connected if and only if every two vertices are joined by $k$ internally disjoint paths. Similarly, $G$ is $k$-edge-connected exactly when every two vertices are joined by $k$ edge-disjoint paths. For $k=2$: a graph with at least $3$ vertices is $2$-connected if and only if every two vertices lie on a common cycle.

**Worked example.** The cube $Q_3$ is $3$-regular, so $\\kappa\\le 3$. Take the opposite corners $000$ and $111$. Three internally disjoint paths are
$$000,100,110,111;\\quad 000,010,011,111;\\quad 000,001,101,111.$$
They share only their ends. A separator of size $3$ is $\\{100,010,001\\}$, the neighbours of $000$. Since the path count meets the separator size, both are optimal for this pair. Doing this for every pair (or using symmetry) shows that $\\kappa(Q_3)=3$. In general $\\kappa(Q_k)=k$.

Menger's theorem is the prototype of a **min-max theorem**: a maximum of one kind of object equals a minimum of another, so a solution can be proved optimal by exhibiting a matching object of the other kind. Konig's and Hall's theorems in the next lesson are of the same type.`,
          resources: [
            diestel('The chapter on connectivity proves Menger\'s theorem in several ways.'),
            guichard('See the section on connectivity.'),
            networkx('`node_connectivity`, `edge_connectivity` and `node_disjoint_paths` return the objects in Menger\'s theorem.'),
          ],
          exercises: [
            {
              slug: 'connectivity-inequalities',
              title: 'Connectivity inequalities',
              prompt: `Prove that $\\kappa(G)\\le\\lambda(G)\\le\\delta(G)$. For all integers $1\\le a\\le b\\le c$, construct a graph with $\\kappa=a$, $\\lambda=b$, $\\delta=c$.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'two-connected-cycles',
              title: 'Two-connected graphs and cycles',
              prompt: `Prove that a graph with at least $3$ vertices is $2$-connected if and only if every two vertices lie on a common cycle. Deduce that in a $2$-connected graph, any two edges lie on a common cycle.`,
              kind: 'derivation',
              difficulty: 2,
              hint: 'For the hard direction, induct on the distance between the two vertices.',
            },
            {
              slug: 'connectivity-of-families',
              title: 'Connectivity of standard graphs',
              prompt: `Find $\\kappa$ and $\\lambda$ for $K_n$, $K_{m,n}$, $Q_k$ and the Petersen graph. For each, exhibit a separating set of the right size and enough disjoint paths for one pair of vertices to prove optimality.`,
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'fan-lemma',
              title: 'The fan lemma',
              prompt: `Let $G$ be $k$-connected, let $v$ be a vertex, and let $U$ be a set of at least $k$ other vertices. Prove that there are $k$ paths from $v$ to $U$ that share only $v$, each ending at a different vertex of $U$. Use it to show that in a $k$-connected graph with $k\\ge 2$, any $k$ vertices lie on a common cycle.`,
              kind: 'derivation',
              difficulty: 3,
              hint: 'Add a new vertex joined to all of U and apply Menger. The cycle statement is a classical theorem of Dirac and needs an induction on k.',
            },
          ],
          selfAssessment: [
            {
              question: 'Why can Menger\'s vertex form not apply to adjacent $u,v$ as stated?',
              answerOutline: `No set of other vertices separates adjacent vertices, as the edge $uv$ remains.`,
            },
            {
              question: 'What does a $u$-$v$ separator of size $k$ certify?',
              answerOutline: `That there are at most $k$ internally disjoint $u$-$v$ paths.`,
            },
            {
              question: 'Give a graph with $\\kappa=1$ and $\\lambda=2$.',
              answerOutline: `Two triangles sharing one vertex (a bowtie).`,
            },
          ],
        },
        {
          slug: 'matchings-hall-and-konig',
          title: 'Matchings in bipartite graphs',
          summary:
            'Augmenting paths, Hall\'s marriage theorem and Konig\'s theorem.',
          estimatedMinutes: 170,
          objectives: [
            'Prove Berge\'s theorem on augmenting paths',
            'Prove Hall\'s theorem',
            'Prove Konig\'s theorem relating matchings and vertex covers',
            'Find maximum matchings by hand with augmenting paths',
          ],
          concepts: [
            'Matching, perfect matching',
            'Maximum and maximal matchings',
            'Alternating and augmenting paths',
            'Berge\'s theorem',
            'Hall\'s condition',
            'Vertex cover',
            'Konig\'s theorem',
          ],
          explanation: `A **matching** is a set of edges with no shared ends. It is **perfect** if it covers every vertex. A **maximal** matching cannot be extended, and a **maximum** matching is as large as possible. Maximal is not maximum: in $P_4$, the middle edge alone is maximal, and the two end edges are larger.

Given a matching $M$, an **augmenting path** is a path whose edges alternate between non-$M$ and $M$ edges, and whose two ends are unmatched. Swapping the edges along it increases $|M|$ by $1$. **Berge's theorem:** $M$ is maximum if and only if there is no augmenting path. If $M'$ is larger, then the symmetric difference $M\\triangle M'$ consists of alternating paths and cycles, and one path must have more $M'$ edges than $M$ edges, which makes it augmenting for $M$.

**Hall's theorem.** Let $G$ be bipartite with parts $X$ and $Y$. There is a matching covering $X$ if and only if $|N(S)|\\ge|S|$ for every $S\\subseteq X$, where $N(S)$ is the set of neighbours of $S$.

Necessity is clear. For sufficiency, use induction on $|X|$. If every nonempty proper $S$ has $|N(S)|\\ge|S|+1$, match any $x$ to any neighbour and delete both. Hall's condition still holds for the rest, since each $S$ lost at most one neighbour. Otherwise some nonempty proper $S$ has $|N(S)|=|S|$. Match $S$ into $N(S)$ by induction. Then the remaining graph, on $X\\setminus S$ and $Y\\setminus N(S)$, also satisfies Hall: if $T\\subseteq X\\setminus S$ had too few neighbours outside $N(S)$, then $S\\cup T$ would violate the condition in $G$.

A **vertex cover** is a set of vertices that meets every edge. Every cover has at least as many vertices as any matching has edges. **Konig's theorem:** in a bipartite graph, the maximum size of a matching equals the minimum size of a vertex cover. It follows from Menger, by adding a source joined to $X$ and a sink joined to $Y$. In non-bipartite graphs it fails: the triangle has maximum matching $1$ and minimum cover $2$.

**Worked example.** Applicants $a,b,c,d$ and jobs $1,2,3,4$ have $a{:}\\{1,2\\}$, $b{:}\\{1\\}$, $c{:}\\{1,2\\}$, $d{:}\\{2,3,4\\}$. Is there a perfect matching? Take $S=\\{a,b,c\\}$: $N(S)=\\{1,2\\}$ has only $2$ elements. Hall's condition fails, so no. The best possible is $3$, achieved by $b1$, $a2$, $d3$. A vertex cover of size $3$ is $\\{1,2,d\\}$: every edge at $a,b,c$ goes to $1$ or $2$, and the other edges are at $d$. By Konig, the matching and the cover certify each other.

**Corollary.** A $k$-regular bipartite graph with $k\\ge 1$ has a perfect matching. For $S\\subseteq X$, the $k|S|$ edges leaving $S$ land in $N(S)$, which absorbs at most $k|N(S)|$ edges. Removing the matching leaves a $(k-1)$-regular graph, so the edges split into $k$ perfect matchings.`,
          resources: [
            diestel('The chapter on matching, covering and packing proves Konig, Hall and Tutte.'),
            trotter('The chapter on network flows derives bipartite matching results from max-flow min-cut.'),
            networkx('`bipartite.maximum_matching` and `bipartite.to_vertex_cover` produce the two certificates.'),
          ],
          exercises: [
            {
              slug: 'berge-proof',
              title: 'Berge\'s theorem',
              prompt: `Prove Berge's theorem in full, including the structure of the symmetric difference of two matchings. Then use augmenting paths to find a maximum matching in $C_7$ and in the Petersen graph, starting from a maximal matching that is not maximum.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'hall-proof',
              title: 'Hall\'s theorem',
              prompt: `Write the proof of Hall's theorem carefully, checking both cases of the induction. Then prove the deficiency form: the maximum matching in a bipartite graph has size $|X|-\\max_{S\\subseteq X}(|S|-|N(S)|)$.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'konig-from-menger',
              title: 'Konig from Menger',
              prompt: `Derive Konig's theorem from Menger's theorem by adding a source and a sink. Then show that the theorem fails for every odd cycle, giving the matching number and the cover number of $C_{2k+1}$.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'regular-bipartite',
              title: 'Regular bipartite graphs',
              prompt: `Prove that a $k$-regular bipartite multigraph with $k\\ge 1$ has a perfect matching, and hence that its edges split into $k$ perfect matchings. Use this to show that every Latin rectangle with $r<n$ rows on $n$ symbols can be extended by a row.`,
              kind: 'derivation',
              difficulty: 3,
              hint: 'Columns and symbols form a bipartite graph: join column j to each symbol not yet used in column j. It is (n - r)-regular.',
            },
            {
              slug: 'systems-of-representatives',
              title: 'Distinct representatives',
              prompt: `Sets $A_1,\\dots,A_n$ have a system of distinct representatives if there are distinct $a_i\\in A_i$. State Hall's condition for this. Decide whether $\\{1,2\\},\\{2,3\\},\\{1,3\\},\\{3,4,5\\},\\{4,5\\}$ has one, and whether adding the set $\\{1,2,3\\}$ keeps one.`,
              kind: 'problem',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'Is every maximal matching maximum?',
              answerOutline: `No. In $P_4$, the middle edge alone is maximal, but the two outer edges form a larger matching.`,
            },
            {
              question: 'State Hall\'s condition.',
              answerOutline: `$|N(S)|\\ge|S|$ for every subset $S$ of the side to be covered.`,
            },
            {
              question: 'What certifies that a bipartite matching of size $k$ is maximum?',
              answerOutline: `A vertex cover of size $k$, which exists by Konig's theorem.`,
            },
          ],
        },
        {
          slug: 'tutte-theorem',
          title: 'Tutte\'s theorem and perfect matchings',
          summary:
            'The general condition for a perfect matching, and Petersen\'s theorem on cubic graphs.',
          estimatedMinutes: 160,
          objectives: [
            'State Tutte\'s condition and prove that it is necessary',
            'Use Tutte\'s condition to show that a graph has no perfect matching',
            'Derive Petersen\'s theorem on bridgeless cubic graphs',
            'Explain the role of bridges with an example',
          ],
          concepts: [
            'Odd component',
            'Tutte\'s condition',
            'Tutte\'s theorem',
            'Tutte set as certificate',
            'Petersen\'s theorem',
            'Bridgeless cubic graph',
            'Edmonds\' blossom algorithm',
          ],
          explanation: `In a general graph, Hall's condition does not apply, since there are no sides. The right condition counts odd components. For $S\\subseteq V$, write $o(G-S)$ for the number of components of $G-S$ with an odd number of vertices.

**Tutte's theorem.** $G$ has a perfect matching if and only if $o(G-S)\\le|S|$ for every $S\\subseteq V$.

Necessity is a counting argument. In a perfect matching, each odd component of $G-S$ has a vertex matched outside the component, since the component cannot be perfectly matched internally. That partner must lie in $S$, and different odd components need different partners. So $|S|\\ge o(G-S)$. Taking $S=\\varnothing$ recovers the fact that $n$ must be even. Sufficiency is harder, and we leave it to the references. The standard proofs take a maximal counterexample, adding edges as long as no perfect matching appears, and analyse its structure.

A set $S$ with $o(G-S)>|S|$ is a short certificate that there is no perfect matching, just as a Hall violator is in the bipartite case. Edmonds' blossom algorithm finds a maximum matching in polynomial time, or such a certificate.

**Petersen's theorem.** Every $3$-regular graph with no bridge has a perfect matching.

To prove it, let $S\\subseteq V$ and let $H$ be an odd component of $G-S$. The sum of degrees in $H$ is $3|H|$, which is odd. Edges inside $H$ contribute an even amount to this sum, so the number of edges from $H$ to $S$ is odd. It is not $1$, because that edge would be a bridge. So it is at least $3$. Counting the edges between $S$ and the odd components,
$$3\\,o(G-S)\\le\\#\\{\\text{edges at }S\\}\\le 3|S|,$$
so $o(G-S)\\le|S|$, and Tutte's theorem gives a perfect matching.

**Worked example: bridges matter.** Build a $3$-regular graph with bridges and no perfect matching. Start with $K_4$ and subdivide one edge with a new vertex $w$. This gadget has $5$ vertices, where $w$ has degree $2$ and the rest have degree $3$. Take three gadgets, and a central vertex $c$ joined to the three vertices $w$. The result is $3$-regular with $16$ vertices, and the three edges at $c$ are bridges.

Let $S=\\{c\\}$. Then $G-S$ consists of the three gadgets, each of odd order $5$. So $o(G-S)=3>1=|S|$, and there is no perfect matching. A computer search confirms that the largest matching has $7$ edges, one short of perfect. This is in fact the smallest cubic graph with no perfect matching.

So Petersen's theorem is sharp in the sense that its hypothesis cannot simply be dropped. It can be strengthened: in a bridgeless cubic graph, every edge lies in some perfect matching.`,
          resources: [
            diestel('The chapter on matching proves Tutte\'s theorem, and derives Petersen\'s.'),
            { title: 'Tutte theorem', url: 'https://en.wikipedia.org/wiki/Tutte_theorem', type: 'article', cost: 'free', provider: 'Wikipedia', note: 'A summary of the statement, proofs and consequences.' },
            networkx('`max_weight_matching(G, maxcardinality=True)` finds maximum matchings in general graphs.'),
          ],
          exercises: [
            {
              slug: 'tutte-necessity',
              title: 'Necessity and certificates',
              prompt: `Prove that Tutte's condition is necessary. Show that the star $K_{1,3}$ and the graph formed by three triangles each joined by an edge to a common vertex have no perfect matching, by exhibiting Tutte sets.`,
              kind: 'derivation',
              difficulty: 1,
            },
            {
              slug: 'petersen-theorem-proof',
              title: 'Petersen\'s theorem',
              prompt: `Write out the proof of Petersen's theorem from Tutte's theorem, justifying the parity claim and the use of bridgelessness. Then show that it applies to the Petersen graph, and find a perfect matching there whose removal leaves two $5$-cycles.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'trees-perfect-matching',
              title: 'Perfect matchings in trees',
              prompt: `Prove that a tree has at most one perfect matching. Prove that a tree $T$ has a perfect matching if and only if $o(T-v)=1$ for every vertex $v$.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'count-perfect-matchings',
              title: 'Counting perfect matchings',
              prompt: `Show that $K_{2n}$ has $(2n-1)(2n-3)\\cdots 3\\cdot 1$ perfect matchings, and that $K_{n,n}$ has $n!$. Count the perfect matchings of the Petersen graph and of $Q_3$ by computer, and explain the Petersen count by its symmetry.`,
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'cubic-no-matching',
              title: 'A cubic graph without a perfect matching',
              prompt: `Build the $16$-vertex graph of the worked example in NetworkX, and verify that it is $3$-regular with maximum matching $7$. Prove that a cubic graph with at most two bridges has a perfect matching.`,
              kind: 'derivation',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'What does $S=\\varnothing$ in Tutte\'s condition say?',
              answerOutline: `$G$ has no odd components, so in particular each component has an even number of vertices.`,
            },
            {
              question: 'Why does each odd component of $G-S$ send an odd number of edges to $S$, in a cubic graph?',
              answerOutline: `The degree sum $3|H|$ is odd, and internal edges contribute an even amount.`,
            },
            {
              question: 'Does every $3$-regular graph have a perfect matching?',
              answerOutline: `No. The $16$-vertex graph with three bridges at a central vertex does not.`,
            },
          ],
        },
      ],
      project: {
        slug: 'matching-and-flow',
        title: 'Matching and flow with certificates',
        description: `Implement a maximum flow algorithm (Edmonds-Karp), and use it to compute maximum bipartite matchings, minimum vertex covers, vertex and edge connectivity, and Menger paths. Every answer must come with its dual certificate: a cut, a cover, a separator, or a Hall violator, checked by an independent function. Then implement or wrap a general matching algorithm and, when there is no perfect matching, search for a Tutte set. Apply the tools to a real assignment problem, such as matching students to project topics with preferences.`,
        deliverables: [
          'An Edmonds-Karp implementation with a min-cut certificate, tested against NetworkX',
          'Functions for bipartite matching with vertex cover, and for connectivity with Menger paths and separators',
          'A Hall violator finder that returns a set $S$ with $|N(S)|<|S|$ whenever no matching covers $X$',
          'A Tutte set search for small graphs, demonstrated on the $16$-vertex cubic example',
          'A worked assignment problem with at least $50$ participants, and a short report',
        ],
        estimatedHours: 8,
        stretchGoals: ['Implement Edmonds\' blossom algorithm', 'Solve the weighted assignment problem with the Hungarian algorithm'],
      },
    },
    {
      slug: 'colouring',
      title: 'Colouring',
      description:
        'Vertex colouring with greedy bounds and Brooks\' theorem, counting colourings with the chromatic polynomial, and edge colouring with Vizing\'s theorem.',
      lessons: [
        {
          slug: 'greedy-colouring-and-brooks',
          title: 'Chromatic number, greedy colouring and Brooks\' theorem',
          summary:
            'Upper bounds from greedy colouring, lower bounds from cliques and independent sets, and when $\\Delta$ colours suffice.',
          estimatedMinutes: 160,
          objectives: [
            'Bound $\\chi(G)$ above by greedy colouring and below by $\\omega$ and $n/\\alpha$',
            'Use degeneracy orderings to improve the greedy bound',
            'State Brooks\' theorem with its exceptions',
            'Describe triangle-free graphs of large chromatic number',
          ],
          concepts: [
            'Proper colouring and $\\chi(G)$',
            'Clique number $\\omega$',
            'Independence number $\\alpha$',
            'Greedy colouring',
            'Degeneracy',
            'Brooks\' theorem',
            'Mycielski construction',
          ],
          explanation: `A **proper $k$-colouring** assigns one of $k$ colours to each vertex so that adjacent vertices differ. The **chromatic number** $\\chi(G)$ is the least such $k$. Each colour class is an independent set. Colouring models scheduling: exams that share a student must go in different slots.

**Lower bounds.** A clique needs distinct colours, so $\\chi\\ge\\omega$. Each colour class has at most $\\alpha$ vertices, so $\\chi\\ge n/\\alpha$. For $C_5$, $\\omega=2$ but $\\alpha=2$ gives $\\chi\\ge 5/2$, so $\\chi=3$.

**Greedy colouring.** List the vertices in some order and give each the smallest colour not used by its earlier neighbours. A vertex has at most $\\Delta$ neighbours, so greedy uses at most $\\Delta+1$ colours. The order matters a great deal. If every vertex has at most $d$ earlier neighbours, greedy uses at most $d+1$ colours. Repeatedly removing a vertex of minimum degree, and colouring in the reverse order, shows that $\\chi\\le 1+\\max_H\\delta(H)$ over all subgraphs $H$. That gives $\\chi\\le 2$ for forests, and $\\chi\\le 6$ for planar graphs, since each planar graph has a vertex of degree at most $5$.

**Worked example.** Let $G$ be $K_{4,4}$ with a perfect matching removed: vertices $u_1,\\dots,u_4$ and $v_1,\\dots,v_4$, with $u_i\\sim v_j$ exactly when $i\\ne j$. It is bipartite, so $\\chi=2$. Now colour greedily in the order $u_1,v_1,u_2,v_2,u_3,v_3,u_4,v_4$. Then $u_1$ and $v_1$ get colour $1$, as they are not adjacent. Next $u_2$ is adjacent to $v_1$, so it gets colour $2$, and $v_2$ is adjacent to $u_1$ (colour $1$) but not $u_2$, so it gets $2$. In the same way $u_3$ and $v_3$ see colours $1,2$ and get $3$, and $u_4,v_4$ get $4$. Greedy uses $4$ colours when $2$ suffice, and the same order on $2k$ vertices uses $k$. Ordering the $u$'s first would use $2$.

**Brooks' theorem.** If $G$ is connected and is neither a complete graph nor an odd cycle, then $\\chi(G)\\le\\Delta(G)$. The proof finds an ordering in which the last vertex has two neighbours of the same colour. In the main case, pick a vertex $v$ with non-adjacent neighbours $x,y$ such that $G-x-y$ is connected. Colour $x,y$ first with colour $1$, then the rest in decreasing distance from $v$, so that each vertex before $v$ has an uncoloured neighbour later. The exceptions are needed: $\\chi(K_n)=n=\\Delta+1$, and $\\chi(C_{2k+1})=3=\\Delta+1$.

**Large chromatic number without triangles.** Cliques are not the only reason for many colours. **Mycielski's construction** turns a triangle-free graph with chromatic number $k$ into one with chromatic number $k+1$. Starting from $C_5$ it gives the Grotzsch graph, with $11$ vertices, $20$ edges, no triangle and $\\chi=4$.`,
          resources: [
            guichard('See the section on graph coloring.'),
            diestel('The chapter on colouring proves Brooks\' theorem and discusses the Mycielski construction.'),
            networkx('`greedy_color` supports several orderings, including smallest-last.'),
          ],
          exercises: [
            {
              slug: 'colouring-bounds',
              title: 'Two simple bounds',
              prompt: `Prove $\\chi(G)\\ge n/\\alpha(G)$ and $\\chi(G)\\le 1+\\max_H\\delta(H)$, the maximum over subgraphs. Find $\\chi$ for $C_n$, the wheel $W_n$ (a hub joined to all vertices of $C_n$), and the Petersen graph, with proofs of both bounds in each case.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'greedy-order',
              title: 'The importance of order',
              prompt: `Prove that every graph has some ordering on which greedy colouring uses exactly $\\chi(G)$ colours. Then show that for every $k$ there is a tree and an ordering on which greedy uses $k$ colours.`,
              kind: 'derivation',
              difficulty: 2,
              hint: 'For the first part, order the vertices by colour class in an optimal colouring. For the second, build trees inductively.',
            },
            {
              slug: 'nordhaus-gaddum',
              title: 'A graph and its complement',
              prompt: `Prove that $\\chi(G)+\\chi(\\overline G)\\le n+1$ for every graph on $n$ vertices. Find a graph attaining equality for each $n$.`,
              kind: 'derivation',
              difficulty: 3,
              hint: 'Induct on n by removing a vertex, and treat its degree as small or large in G.',
            },
            {
              slug: 'mycielski',
              title: 'The Mycielski construction',
              prompt: `Given $G$ with vertices $v_1,\\dots,v_n$, form $M(G)$ by adding $u_1,\\dots,u_n$ and $w$, joining $u_i$ to the neighbours of $v_i$ and to $w$. Prove that $M(G)$ is triangle-free when $G$ is, and that $\\chi(M(G))=\\chi(G)+1$. Check that $M(C_5)$ has $11$ vertices and $20$ edges.`,
              kind: 'derivation',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'What is $\\chi$ of a bipartite graph with at least one edge?',
              answerOutline: `$2$.`,
            },
            {
              question: 'Which connected graphs need $\\Delta+1$ colours?',
              answerOutline: `Complete graphs and odd cycles, by Brooks' theorem.`,
            },
            {
              question: 'Does $\\chi(G)$ always equal $\\omega(G)$?',
              answerOutline: `No. $C_5$ has $\\omega=2$ and $\\chi=3$, and the Grotzsch graph has $\\omega=2$ and $\\chi=4$.`,
            },
          ],
          relatedLessons: ['discrete-mathematics/graphs-and-trees/planarity-and-colouring'],
        },
        {
          slug: 'chromatic-polynomials',
          title: 'Chromatic polynomials',
          summary:
            'Counting proper colourings with a polynomial, and the deletion-contraction recurrence.',
          estimatedMinutes: 140,
          objectives: [
            'Compute chromatic polynomials of small graphs',
            'Prove the deletion-contraction recurrence',
            'Prove the basic properties of the coefficients',
            'Recognise polynomials that cannot be chromatic polynomials',
          ],
          concepts: [
            'Chromatic polynomial $P(G,k)$',
            'Deletion-contraction',
            'Polynomials of trees, cycles and complete graphs',
            'Coefficients and their signs',
            'Chromatic roots',
          ],
          explanation: `Let $P(G,k)$ be the number of proper colourings of $G$ using colours from a set of size $k$. Colourings that use only some of the colours count, and colourings differing by a permutation of colours count as different. Then $\\chi(G)$ is the least positive integer $k$ with $P(G,k)>0$. A few cases are immediate:
$$P(K_n,k)=k(k-1)\\cdots(k-n+1),\\qquad P(\\text{tree on }n\\text{ vertices},k)=k(k-1)^{n-1}.$$
For the tree, colour a root freely, then each other vertex in order of distance from the root, avoiding only its parent's colour.

**Deletion-contraction.** For an edge $e=uv$,
$$P(G,k)=P(G-e,k)-P(G/e,k).$$
The proper colourings of $G-e$ split into those with $u,v$ coloured differently, which are exactly the proper colourings of $G$, and those with $u,v$ the same colour, which correspond to proper colourings of $G/e$. Since the recurrence ends at graphs with no edges, where $P=k^n$, this proves that $P(G,k)$ is a polynomial in $k$.

Induction on edges with this recurrence also gives the main properties. $P$ has degree $n$ and leading coefficient $1$, and the coefficient of $k^{n-1}$ is $-m$. The coefficients alternate in sign, and the constant term is $0$ for $n\\ge 1$. If $G$ has at least one edge, then $P(G,1)=0$.

**Worked example 1: $C_4$.** Delete one edge to get $P_4$, a tree, and contract it to get $C_3=K_3$. So
$$P(C_4,k)=k(k-1)^3-k(k-1)(k-2)=k(k-1)\\bigl[(k-1)^2-(k-2)\\bigr]=k(k-1)(k^2-3k+3).$$
Expanded, this is $k^4-4k^3+6k^2-3k$. The coefficient of $k^3$ is $-4=-m$, as it should be. At $k=2$ we get $2\\cdot 1\\cdot 1=2$, the two colourings of an even cycle. At $k=3$ we get $3\\cdot 2\\cdot 3=18$. In general $P(C_n,k)=(k-1)^n+(-1)^n(k-1)$, and for $n=4$ this is $(k-1)^4+(k-1)$, which agrees.

**Worked example 2: $K_4$ minus an edge.** The two non-adjacent vertices $u,v$ have the same two neighbours $x,y$, which are adjacent. Colour $x,y$ in $k(k-1)$ ways. Then $u$ and $v$ each avoid two colours, independently. So $P=k(k-1)(k-2)^2$. At $k=3$ this is $6$. Deletion-contraction agrees: adding the edge $uv$ gives $K_4$, and contracting it gives $K_3$. So $P(K_4-e)=P(K_4)+P(K_3)=k(k-1)(k-2)(k-3)+k(k-1)(k-2)$, which simplifies to the same answer.

Not every polynomial arises. $k^4-3k^3+3k^2$ fails, because a graph with $3$ edges has $P(G,1)=0$, while this gives $1$. The **four colour theorem** of Module 5 says that $P(G,4)>0$ for every planar $G$. Birkhoff introduced chromatic polynomials hoping to prove that statement by algebra. That did not work, but the polynomials became a subject of their own.`,
          resources: [
            guichard('See the section on chromatic polynomials.'),
            ocw315('The lectures on colourings include chromatic polynomials.'),
            trotter('See the material on graph colouring for further examples.'),
          ],
          exercises: [
            {
              slug: 'cycle-polynomial',
              title: 'Polynomials of cycles',
              prompt: `Prove $P(C_n,k)=(k-1)^n+(-1)^n(k-1)$ by induction, using deletion-contraction. Use it to show that $\\chi(C_n)$ is $2$ or $3$ according to the parity of $n$, and find the number of $3$-colourings of $C_6$.`,
              kind: 'derivation',
              difficulty: 1,
            },
            {
              slug: 'coefficient-properties',
              title: 'Properties of the coefficients',
              prompt: `Prove by induction on the number of edges that $P(G,k)$ has degree $n$, leading coefficient $1$, coefficient of $k^{n-1}$ equal to $-m$, and coefficients that alternate in sign. Prove that $G$ is connected if and only if the coefficient of $k$ is nonzero.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'wheel-and-bipartite',
              title: 'Two more polynomials',
              prompt: `Find the chromatic polynomial of the wheel with $4$ rim vertices, and of $K_{2,3}$. Check your answers by counting $3$-colourings by computer.`,
              kind: 'problem',
              difficulty: 2,
              hint: 'For the wheel, colour the hub first, and then the rim is a 4-cycle with k - 1 colours available.',
            },
            {
              slug: 'not-chromatic',
              title: 'Which polynomials are chromatic',
              prompt: `Show that none of these is a chromatic polynomial: $k^4-3k^3+3k^2$, $k^4-2k^3+3k^2-k$, $k^5-k^4+k^3$. For the second, find the step at which your argument uses the coefficient count of edges.`,
              kind: 'derivation',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What is $P(G,k)$ for a graph with $n$ vertices and no edges?',
              answerOutline: `$k^n$.`,
            },
            {
              question: 'Why is the deletion-contraction sign a minus?',
              answerOutline: `$P(G-e)$ counts all colourings of $G-e$, and the ones with the ends of $e$ equal are not proper for $G$. Those are counted by $P(G/e)$.`,
            },
            {
              question: 'What does the coefficient of $k^{n-1}$ tell you?',
              answerOutline: `It is $-m$, minus the number of edges.`,
            },
          ],
        },
        {
          slug: 'edge-colouring',
          title: 'Edge colouring and Vizing\'s theorem',
          summary:
            'Colouring edges so that edges at a vertex differ: Konig\'s theorem for bipartite graphs and Vizing\'s theorem in general.',
          estimatedMinutes: 150,
          objectives: [
            'Compute the edge chromatic number of standard graphs',
            'Prove Konig\'s edge colouring theorem for bipartite graphs',
            'State Vizing\'s theorem and classify graphs into class 1 and class 2',
            'Prove that the Petersen graph is class 2',
          ],
          concepts: [
            'Proper edge colouring',
            'Edge chromatic number $\\chi\'(G)$',
            'Konig\'s edge colouring theorem',
            'Vizing\'s theorem',
            'Class 1 and class 2',
            'Round-robin scheduling',
          ],
          explanation: `A **proper edge colouring** gives edges colours so that edges sharing a vertex differ. Each colour class is a matching. The least number of colours is the **edge chromatic number** $\\chi'(G)$. The edges at a vertex of maximum degree need distinct colours, so $\\chi'\\ge\\Delta$.

**Konig's edge colouring theorem.** If $G$ is bipartite, then $\\chi'(G)=\\Delta(G)$. One proof: add vertices and edges to make $G$ into a $\\Delta$-regular bipartite multigraph, whose edges split into $\\Delta$ perfect matchings by Hall's theorem. Restricting to $G$ gives the colouring. A direct proof recolours along alternating paths. If an edge $uv$ cannot be coloured because colour $a$ is free at $u$ and $b$ at $v$, swap $a$ and $b$ along the maximal path from $v$ that alternates $a,b$. Bipartiteness ensures that this path cannot reach $u$.

**Vizing's theorem.** For every simple graph, $\\Delta\\le\\chi'(G)\\le\\Delta+1$. The proof, by recolouring "fans" around a vertex, is in the references. Graphs with $\\chi'=\\Delta$ are **class 1**, and those with $\\chi'=\\Delta+1$ are **class 2**. Deciding which class a graph is in is NP-complete, even for cubic graphs. For multigraphs the bound fails, and Shannon proved that $\\chi'\\le\\lfloor 3\\Delta/2\\rfloor$.

**Worked example: complete graphs.** If $n$ is odd, each matching in $K_n$ has at most $(n-1)/2$ edges. With $\\binom n2=n(n-1)/2$ edges, at least $n$ colours are needed. So $\\chi'(K_n)\\ge n=\\Delta+1$, and $K_n$ is class 2. If $n$ is even, a **round-robin** schedule gives $n-1$ colours. Place vertex $n$ at the centre and $1,\\dots,n-1$ at the corners of a regular $(n-1)$-gon. For round $r$, match the centre with $r$, and match $r-i$ with $r+i$ (modulo $n-1$) for $i=1,\\dots,(n-2)/2$. These are parallel chords, so they form a perfect matching, and every pair occurs in exactly one round. So $\\chi'(K_n)=n-1$ for even $n$, and $K_n$ is class 1. This is how a tournament with an even number of teams fits into $n-1$ rounds.

The same counting shows that any regular graph with an odd number of vertices is class 2.

**The Petersen graph is class 2.** Suppose it had a $3$-edge-colouring. Each colour class is a perfect matching, since every vertex has degree $3$ and sees all three colours. The union of two colour classes is $2$-regular, so it is a disjoint union of cycles, which alternate colours and so have even length. The Petersen graph has no cycles of length $3$ or $4$, so these cycles have length at least $6$, and the only way to cover $10$ vertices with even cycles of length at least $6$ is a single $10$-cycle, which is a Hamiltonian cycle. But the Petersen graph has no Hamiltonian cycle. That is proved directly in Module 6, by counting how a $10$-cycle would use the spokes. So $\\chi'=4$.`,
          resources: [
            diestel('The chapter on colouring covers edge colouring and proves Vizing\'s theorem.'),
            guichard('The section on matchings, in the chapter on systems of distinct representatives, supplies the tools for Konig\'s theorem.'),
            { title: 'House of Graphs', url: 'https://houseofgraphs.org/', type: 'tool', cost: 'free', provider: 'Ghent University', note: 'A searchable database of interesting graphs, including small snarks and class 2 graphs.' },
          ],
          exercises: [
            {
              slug: 'konig-edge-proof',
              title: 'Konig\'s edge colouring theorem',
              prompt: `Prove that every bipartite graph has $\\chi'=\\Delta$, by the alternating path argument. Explain why the argument fails for $C_5$, where $\\chi'=3>\\Delta$.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'complete-graphs-class',
              title: 'Complete graphs',
              prompt: `Prove that $\\chi'(K_n)=n-1$ for even $n$ and $\\chi'(K_n)=n$ for odd $n$, giving the round-robin colouring explicitly for $n=6$ and a colouring of $K_5$ with $5$ colours.`,
              kind: 'derivation',
              difficulty: 1,
            },
            {
              slug: 'overfull',
              title: 'Overfull graphs',
              prompt: `Prove that a graph with $n$ odd and more than $\\Delta(n-1)/2$ edges is class 2. Deduce that every regular graph of odd order is class 2, and that $K_n$ with one edge removed is class 2 for odd $n\\ge 5$.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'petersen-class-two',
              title: 'Petersen is class 2',
              prompt: `Give a complete proof that the Petersen graph has $\\chi'=4$, supplying the facts about its cycles that you use. Then find a $4$-edge-colouring by hand, and confirm both facts by a short backtracking program.`,
              kind: 'derivation',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'What is $\\chi\'(K_{3,5})$?',
              answerOutline: `$5$, by Konig's theorem, as $\\Delta=5$.`,
            },
            {
              question: 'State Vizing\'s theorem.',
              answerOutline: `For simple graphs, $\\Delta\\le\\chi'\\le\\Delta+1$.`,
            },
            {
              question: 'Why is a $3$-edge-colouring of a cubic graph made of perfect matchings?',
              answerOutline: `Each vertex has degree $3$ and must see three different colours, so each colour appears at every vertex once.`,
            },
          ],
        },
      ],
      project: {
        slug: 'colouring-lab',
        title: 'Colouring lab',
        description: `Compare colouring methods on a real scheduling problem and on hard instances. Implement greedy colouring with several orderings (given order, largest first, smallest last, DSatur), an exact backtracking colourer for small graphs, and an edge colourer that achieves $\\Delta$ or $\\Delta+1$ colours. Then build an exam timetable from a real or realistic enrolment table, where courses sharing a student cannot share a slot, and compare the number of slots each method uses. Compute chromatic polynomials of small graphs by deletion-contraction with memoisation, and check them against brute-force counts.`,
        deliverables: [
          'Greedy colourers with four orderings, and an exact colourer that proves optimality on graphs up to about $40$ vertices',
          'An exam timetabling demo with at least $60$ courses and the number of slots each method needs',
          'A table of $\\chi$ and $\\chi\'$ for $C_n$, $K_n$, $K_{m,n}$, wheels, the Petersen and Grotzsch graphs',
          'A deletion-contraction chromatic polynomial calculator, checked against brute force on at least ten graphs',
          'A note on one instance where greedy is far from optimal, with an explanation',
        ],
        estimatedHours: 7,
        stretchGoals: ['Implement a Vizing-style recolouring algorithm that guarantees at most $\\Delta+1$ colours'],
      },
    },
    {
      slug: 'planarity',
      title: 'Planarity',
      description:
        'Graphs drawn without crossings: Euler\'s formula and its edge bounds, Kuratowski\'s and Wagner\'s characterisations, and the five colour theorem.',
      lessons: [
        {
          slug: 'euler-formula',
          title: 'Planar graphs and Euler\'s formula',
          summary:
            'Faces, Euler\'s formula, and the edge bounds that prove $K_5$ and $K_{3,3}$ are not planar.',
          estimatedMinutes: 150,
          objectives: [
            'Prove Euler\'s formula for connected plane graphs',
            'Derive $m\\le 3n-6$ and its triangle-free version',
            'Prove that $K_5$, $K_{3,3}$ and the Petersen graph are not planar',
            'Show that every planar graph has a vertex of degree at most $5$',
          ],
          concepts: [
            'Planar graph and plane embedding',
            'Face and face degree',
            'Euler\'s formula',
            'Edge bound $m\\le 3n-6$',
            'Girth bound',
            'Platonic solids',
          ],
          explanation: `A graph is **planar** if it can be drawn in the plane without edges crossing. A particular drawing is a **plane graph**, and it divides the plane into regions called **faces**, including one unbounded face. The **degree** of a face is the number of edge-sides on its boundary. A bridge is counted twice, since both of its sides face the same region. Then $\\sum_f\\deg(f)=2m$, the face version of the handshake lemma.

**Euler's formula.** For a connected plane graph with $n$ vertices, $m$ edges and $f$ faces,
$$n-m+f=2.$$
The proof is by induction on $m$. If $G$ is a tree, then $m=n-1$ and $f=1$, so $n-m+f=2$. Otherwise, $G$ has an edge on a cycle. That edge separates two different faces, by the Jordan curve theorem for polygons, so deleting it merges them, reducing both $m$ and $f$ by one. For a plane graph with $c$ components the formula becomes $n-m+f=1+c$.

**Edge bounds.** Suppose $G$ is simple and planar, with $n\\ge 3$. Every face has degree at least $3$, so $2m\\ge 3f$. Substituting $f=2-n+m$ gives
$$m\\le 3n-6.$$
If $G$ has no triangles, each face has degree at least $4$, which gives $m\\le 2n-4$. More generally, with girth $g$, $m\\le\\frac g{g-2}(n-2)$. These are necessary conditions only. A graph can satisfy them and still be non-planar.

**Worked example.** $K_5$ has $n=5$ and $m=10$. The bound gives $3\\cdot 5-6=9<10$, so $K_5$ is not planar. $K_{3,3}$ has $n=6$ and $m=9$, which passes the general bound of $12$. But it is bipartite, so it has no triangles, and $2n-4=8<9$. So $K_{3,3}$ is not planar. The Petersen graph has girth $5$, so a planar drawing would need $m\\le\\frac53(10-2)=\\frac{40}3$, which is less than $14$. But it has $m=15$, so it is not planar. Finally, $Q_4$ has $16$ vertices and $32$ edges, and is bipartite, while $2\\cdot 16-4=28$. So $Q_4$ is not planar either, although $Q_3$ is.

**Low degree.** If every vertex of a simple planar graph had degree at least $6$, then $2m\\ge 6n$, contradicting $m\\le 3n-6$. So every planar graph has a vertex of degree at most $5$. This one fact drives the colouring results of the next lessons.

**Platonic solids.** A convex polyhedron gives a plane graph via stereographic projection. If it is regular, with every vertex of degree $d\\ge 3$ and every face of degree $k\\ge 3$, then Euler's formula forces $\\frac1d+\\frac1k>\\frac12$. That leaves only five possibilities, the five Platonic solids.`,
          resources: [
            guichard('See the section on coloring planar graphs.'),
            trotter('The discussion of planar graphs includes Euler\'s formula and its consequences.'),
            networkx('`check_planarity` returns an embedding or a Kuratowski subgraph.'),
          ],
          exercises: [
            {
              slug: 'euler-formula-proof',
              title: 'Prove Euler\'s formula',
              prompt: `Prove Euler's formula for connected plane graphs, and the version $n-m+f=1+c$ for a plane graph with $c$ components. State clearly what you assume about faces and curves.`,
              kind: 'derivation',
              difficulty: 1,
            },
            {
              slug: 'girth-bound',
              title: 'The girth bound',
              prompt: `Prove that a planar graph with girth $g\\ge 3$ and at least one cycle has $m\\le\\frac g{g-2}(n-2)$. Use it to prove that the Petersen graph and $Q_4$ are not planar, and that every planar graph of girth at least $6$ has a vertex of degree at most $2$.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'platonic-solids',
              title: 'The Platonic solids',
              prompt: `Classify the connected plane graphs in which every vertex has degree $d\\ge 3$ and every face has degree $k\\ge 3$. Find $n$, $m$ and $f$ in each of the five cases, and name the solid.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'outerplanar',
              title: 'Outerplanar graphs',
              prompt: `A graph is outerplanar if it has a plane drawing with every vertex on the outer face. Prove that an outerplanar graph with $n\\ge 2$ vertices has at most $2n-3$ edges and has a vertex of degree at most $2$. Deduce that it is $3$-colourable.`,
              kind: 'derivation',
              difficulty: 3,
              hint: 'Add a new vertex in the outer face joined to every vertex. The result is planar.',
            },
          ],
          selfAssessment: [
            {
              question: 'Why does $K_{3,3}$ pass the bound $m\\le 3n-6$ but still fail to be planar?',
              answerOutline: `The bound is only necessary. Using that $K_{3,3}$ is triangle-free gives the sharper bound $2n-4=8<9$.`,
            },
            {
              question: 'How many faces does a plane drawing of the cube $Q_3$ have?',
              answerOutline: `$f=2-n+m=2-8+12=6$.`,
            },
            {
              question: 'Why does a planar graph have a vertex of degree at most $5$?',
              answerOutline: `Otherwise $2m\\ge 6n$, contradicting $m\\le 3n-6$.`,
            },
          ],
          relatedLessons: ['discrete-mathematics/graphs-and-trees/planarity-and-colouring'],
        },
        {
          slug: 'kuratowski-theorem',
          title: 'Kuratowski\'s and Wagner\'s theorems',
          summary:
            'The two forbidden structures that characterise planar graphs, as subdivisions and as minors.',
          estimatedMinutes: 150,
          objectives: [
            'Define subdivisions and minors and compare them',
            'State the theorems of Kuratowski and Wagner',
            'Find a $K_5$ minor and a $K_{3,3}$ subdivision in the Petersen graph',
            'Decide the planarity of a given graph with a certificate',
          ],
          concepts: [
            'Subdivision (topological minor)',
            'Edge contraction',
            'Minor',
            'Kuratowski\'s theorem',
            'Wagner\'s theorem',
            'Minor-closed family',
            'Crossing number',
          ],
          explanation: `Subdividing an edge replaces it with a path through new vertices of degree $2$. A **subdivision** of $H$ is any graph obtained this way. Planarity is unaffected by subdivision, so a graph containing a subdivision of $K_5$ or $K_{3,3}$ is not planar.

**Kuratowski's theorem.** A graph is planar if and only if it contains no subdivision of $K_5$ or of $K_{3,3}$ as a subgraph.

A **minor** of $G$ is any graph obtained by deleting vertices, deleting edges and contracting edges. Planarity is preserved by all three operations: contracting an edge of a plane drawing can be done in the drawing.

**Wagner's theorem.** A graph is planar if and only if it has neither $K_5$ nor $K_{3,3}$ as a minor.

The two theorems are equivalent, but not trivially so. A subdivision of $H$ is always a minor, but the converse can fail when $H$ has a vertex of degree greater than $3$. A graph can have a $K_5$ minor without containing any subdivision of $K_5$. However, a $K_5$ minor in a non-planar graph forces a $K_{3,3}$ subdivision or a $K_5$ subdivision, which is what makes the two statements equivalent. The proof of Kuratowski's theorem is long, so we take it from the references. The hard direction shows that a minimal non-planar graph is a subdivision of one of the two graphs.

The certificate of non-planarity is the forbidden subgraph. The certificate of planarity is an embedding. Planarity can be tested in linear time, by the algorithm of Hopcroft and Tarjan or its successors, and NetworkX returns one certificate or the other.

**Worked example: the Petersen graph.** Draw it as an outer $5$-cycle $a_0,\\dots,a_4$, an inner pentagram $b_0,\\dots,b_4$ with $b_i\\sim b_{i+2}$, and spokes $a_ib_i$. Contract the five spokes. Each $a_i$ merges with $b_i$ into a vertex $c_i$. Now $c_i$ is adjacent to $c_{i\\pm1}$ through the outer cycle, and to $c_{i\\pm2}$ through the pentagram. So every pair is adjacent, and the result is $K_5$. So the Petersen graph has a $K_5$ minor, and it is not planar.

But it contains no subdivision of $K_5$, since that would need $5$ vertices of degree $4$, and every degree is $3$. By Kuratowski's theorem it must contain a subdivision of $K_{3,3}$. In fact even the Petersen graph minus one vertex is non-planar, by the girth bound of the previous lesson: it has $9$ vertices, $12$ edges and girth $5$, and $\\frac53(9-2)<12$. Finding the six branch vertices and nine paths of a $K_{3,3}$ subdivision is an exercise, and the computer will check your answer.

Minor-closed families of graphs are very general. Robertson and Seymour proved that every family closed under minors is characterised by finitely many forbidden minors. Planar graphs, with the two forbidden minors $K_5$ and $K_{3,3}$, are the model case.

The **crossing number** of a graph is the least number of crossings in a drawing. Both $K_5$ and $K_{3,3}$ have crossing number $1$.`,
          resources: [
            diestel('The chapter on planar graphs proves Kuratowski\'s theorem.'),
            { title: 'Kuratowski\'s theorem', url: 'https://en.wikipedia.org/wiki/Kuratowski%27s_theorem', type: 'article', cost: 'free', provider: 'Wikipedia', note: 'Statement, proof outline and the relation to Wagner\'s theorem.' },
            networkx('`check_planarity(G, counterexample=True)` returns a Kuratowski subgraph when one exists.'),
          ],
          exercises: [
            {
              slug: 'planarity-batch',
              title: 'Planar or not',
              prompt: `Decide whether each graph is planar, giving an embedding or a Kuratowski subgraph or minor: $K_{2,7}$, $Q_3$, $K_5$ minus one edge, $K_{3,3}$ minus one edge, $Q_4$, and the complement of $C_7$.`,
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'petersen-k33',
              title: 'A subdivision in the Petersen graph',
              prompt: `Find an explicit subdivision of $K_{3,3}$ in the Petersen graph: name the six branch vertices and the nine paths. Prove that it contains no subdivision of $K_5$. Check your subdivision by computer.`,
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'minors-preserve-planarity',
              title: 'Minors preserve planarity',
              prompt: `Prove that deleting and contracting edges preserve planarity. Prove that every subdivision of $H$ has $H$ as a minor, and give an example of a graph with a $K_5$ minor but no subdivision of $K_5$.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'crossing-numbers',
              title: 'Crossing numbers',
              prompt: `Show that $K_5$ and $K_{3,3}$ have crossing number $1$, by a drawing and by planarity. Use Euler's formula to prove that the crossing number of any graph is at least $m-3n+6$, and deduce a lower bound for $K_6$ and $K_7$.`,
              kind: 'derivation',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'What is the difference between a subdivision and a minor?',
              answerOutline: `A subdivision only inserts degree-$2$ vertices on edges. A minor also allows contraction, which can merge high-degree structure.`,
            },
            {
              question: 'Why can a cubic graph not contain a subdivision of $K_5$?',
              answerOutline: `The branch vertices of a $K_5$ subdivision have degree at least $4$.`,
            },
            {
              question: 'What certificate does a planarity test return?',
              answerOutline: `An embedding if the graph is planar, and a Kuratowski subgraph if it is not.`,
            },
          ],
        },
        {
          slug: 'five-colour-theorem',
          title: 'The five colour theorem',
          summary:
            'Kempe chains, a complete proof that five colours suffice, and the status of the four colour theorem.',
          estimatedMinutes: 150,
          objectives: [
            'Prove the six colour theorem',
            'Use Kempe chains to recolour',
            'Prove the five colour theorem',
            'Explain where Kempe\'s argument for four colours fails, and how the theorem was proved',
          ],
          concepts: [
            'Six colour theorem',
            'Kempe chain',
            'Five colour theorem',
            'Four colour theorem',
            'Map colouring and duality',
            'Computer-assisted proof',
          ],
          explanation: `Colouring the countries of a map so that neighbours differ is colouring the vertices of a planar graph: place a vertex in each country and join neighbours. So map colouring is planar graph colouring.

**Six colours.** Every planar graph has a vertex $v$ of degree at most $5$. Colour $G-v$ by induction with six colours. Then $v$ sees at most five colours and takes the sixth.

**Kempe chains.** In a coloured graph, the vertices of colours $i$ or $j$ form a subgraph. Its connected components are **Kempe chains**. Swapping $i$ and $j$ on one chain gives another proper colouring.

**Five colour theorem.** Every planar graph is $5$-colourable.

Proof by induction on $n$. Take a vertex $v$ of degree at most $5$ and colour $G-v$ with five colours. If $v$'s neighbours use at most four colours, give $v$ the fifth. Otherwise $v$ has exactly five neighbours $v_1,\\dots,v_5$, in clockwise order around $v$ in the drawing, with colours $1,\\dots,5$. Consider the Kempe chain $K$ of colours $1,3$ containing $v_1$. If $v_3\\notin K$, swap colours $1$ and $3$ on $K$. Now $v_1$ has colour $3$, and no neighbour of $v$ has colour $1$, so give it to $v$. If instead $v_3\\in K$, there is a path from $v_1$ to $v_3$ coloured $1$ and $3$. Together with $v$, it forms a cycle $C$ that separates $v_2$ from $v_4$ in the plane: one is inside $C$ and the other is outside. So the $2,4$ chain containing $v_2$ cannot reach $v_4$, since it would have to cross $C$ at a vertex, and $C$ has no vertex of colour $2$ or $4$. Swap $2$ and $4$ on that chain, which frees colour $2$ for $v$.

**Worked example.** The key step is that in the plane, two chains between opposite pairs of neighbours cannot both exist. Take a wheel with hub $v$ and rim $v_1,\\dots,v_5$, and colour the rim $1,2,3,4,5$ in order. The $1,3$ chain containing $v_1$ is just $\\{v_1\\}$, since $v_1$'s rim neighbours are $v_2$ and $v_5$, of colours $2$ and $5$. So $v_3$ is not in it. Recolour $v_1$ to $3$. The rim is now $3,2,3,4,5$, which is still proper because $v_1$ is not adjacent to $v_3$. Then $v$ takes colour $1$. The harder case, where the chain reaches $v_3$, is where planarity is used.

**Four colours.** In 1879 Kempe published a proof of the four colour theorem by this method. In 1890 Heawood found the error: with four colours, a vertex of degree $5$ may need two chain swaps at once, and the second swap can undo the first. Heawood's repair proves five colours. The **four colour theorem**, that every planar graph is $4$-colourable, was proved by Appel and Haken in 1976 with substantial computer checking of unavoidable configurations. A simpler computer-assisted proof was given by Robertson, Sanders, Seymour and Thomas in 1997, and in 2005 Gonthier checked a proof completely with the Coq proof assistant. No proof without a computer is known.

Four colours are sometimes needed, as $K_4$ is planar.`,
          resources: [
            guichard('See the section on coloring planar graphs.'),
            diestel('The chapter on colouring proves the five colour theorem and discusses the four colour theorem.'),
            trotter('The chapter on graph theory discusses planar graphs and colouring, for a second view.'),
          ],
          exercises: [
            {
              slug: 'kempe-swap',
              title: 'Kempe chains preserve properness',
              prompt: `Prove that swapping two colours on one Kempe chain of a proper colouring gives a proper colouring. Then write out the five colour theorem's proof in full, justifying the Jordan curve step for the cycle $C$.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'heawood-gap',
              title: 'Where Kempe went wrong',
              prompt: `Explain in detail what goes wrong when the five colour argument is run with four colours at a vertex of degree $5$. Describe the two simultaneous swaps, and why the second can destroy the effect of the first. Use a picture.`,
              kind: 'writing',
              difficulty: 3,
            },
            {
              slug: 'triangle-free-planar',
              title: 'Triangle-free planar graphs',
              prompt: `Prove that every planar graph with no triangles is $4$-colourable, using the bound $m\\le 2n-4$. (Grotzsch's theorem says that $3$ colours suffice, which is much harder.) Show that some triangle-free planar graph needs $3$ colours.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'map-colouring',
              title: 'Maps and their duals',
              prompt: `Draw a map of five regions in which every two regions share a boundary edge, or prove that none exists. Prove that the faces of a plane graph can be $2$-coloured, with adjacent faces different, if and only if every vertex has even degree.`,
              kind: 'derivation',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why is the six colour theorem easy?',
              answerOutline: `A planar graph has a vertex of degree at most $5$. Remove it, colour the rest, and one of six colours is free.`,
            },
            {
              question: 'What is a Kempe chain?',
              answerOutline: `A connected component of the subgraph induced by two colour classes.`,
            },
            {
              question: 'How was the four colour theorem proved?',
              answerOutline: `By reducing to a finite set of unavoidable configurations, each checked to be reducible by computer.`,
            },
          ],
        },
      ],
    },
    {
      slug: 'further-topics',
      title: 'Further Topics',
      description:
        'Hamiltonian cycles and the degree conditions that force them, Ramsey numbers, and extremal problems from Mantel to Turan.',
      lessons: [
        {
          slug: 'hamiltonian-cycles',
          title: 'Hamiltonian cycles',
          summary:
            'Cycles through every vertex: obstructions, the theorems of Dirac and Ore, and why the problem is hard in general.',
          estimatedMinutes: 150,
          objectives: [
            'Prove that a graph is not Hamiltonian using components or parity',
            'Prove Dirac\'s and Ore\'s theorems',
            'Construct Hamiltonian cycles in hypercubes',
            'Explain the computational status of the problem',
          ],
          concepts: [
            'Hamiltonian cycle and path',
            'Component obstruction',
            'Bipartite parity obstruction',
            'Dirac\'s theorem',
            'Ore\'s theorem',
            'Closure',
            'Gray code',
          ],
          explanation: `A **Hamiltonian cycle** visits every vertex exactly once. Unlike Eulerian circuits, there is no simple characterisation, and deciding whether a graph has one is NP-complete. So the theory consists of obstructions, which prove that no cycle exists, and sufficient conditions, which force one.

**Obstructions.** If $G$ has a Hamiltonian cycle $C$, then deleting any set $S$ of $k$ vertices leaves at most $k$ components, because deleting $k$ vertices from a cycle leaves at most $k$ paths. For example, $K_{2,3}$ loses its $2$-vertex side and falls into $3$ components, so it is not Hamiltonian. A bipartite Hamiltonian graph must have equal sides, as the cycle alternates. So a $3\\times 3$ grid, with $5$ vertices of one colour and $4$ of the other, has no Hamiltonian cycle.

**Dirac's theorem.** If $n\\ge 3$ and $\\delta(G)\\ge n/2$, then $G$ is Hamiltonian.

**Ore's theorem.** If $n\\ge 3$ and $d(u)+d(v)\\ge n$ for every non-adjacent pair $u,v$, then $G$ is Hamiltonian. Dirac's theorem is a special case.

Proof of Ore's theorem. Suppose not, and add edges while keeping the graph non-Hamiltonian, until adding any further edge creates a Hamiltonian cycle. The condition still holds. Take a non-adjacent pair $u,v$. Since $G+uv$ is Hamiltonian, $G$ has a Hamiltonian path $u=x_1,x_2,\\dots,x_n=v$. If for some $i$ we had $u\\sim x_{i+1}$ and $v\\sim x_i$, then
$$x_1,x_{i+1},x_{i+2},\\dots,x_n,x_i,x_{i-1},\\dots,x_2,x_1$$
would be a Hamiltonian cycle. So for each $i$ from $1$ to $n-1$, at most one of $u\\sim x_{i+1}$ and $v\\sim x_i$ holds. That gives $d(u)+d(v)\\le n-1$, a contradiction.

The bound $n/2$ is sharp: $K_{k,k+1}$ has $\\delta=k=(n-1)/2$, and it is not Hamiltonian, as its sides are unequal.

**Worked example: hypercubes.** $Q_k$ is Hamiltonian for $k\\ge 2$, and the cycle is a **Gray code**: a list of all $k$-bit strings in which consecutive strings, including the last and first, differ in one bit. Build it recursively. Take a Gray code for $k-1$ bits, list it with a $0$ in front, then list it in reverse order with a $1$ in front. For $k=2$ this gives $00,01,11,10$. For $k=3$ it gives
$$000,001,011,010,110,111,101,100,$$
and the last string differs from the first in one bit. Dirac does not apply here, since $\\delta=3<4$, which shows that the degree condition is only sufficient.

**The Petersen graph is not Hamiltonian.** It is $3$-regular and $3$-connected, so neither simple obstruction applies, and a direct argument is needed. Draw it as an outer $5$-cycle, an inner pentagram and five spokes. A Hamiltonian cycle crosses between the outer and inner vertices an even number of times, and it must cross at least once, so it uses $2$ or $4$ spokes. Each case leads to a contradiction, as an exercise asks you to show. Combined with the previous module, this also completes the proof that the Petersen graph is class 2.`,
          resources: [
            guichard('See the section on Hamilton cycles and paths.'),
            diestel('The chapter on Hamilton cycles proves the theorems of Dirac and Ore, and much more.'),
            networkx('Small cases can be checked by backtracking, or with `tournament.hamiltonian_path` for tournaments.'),
          ],
          exercises: [
            {
              slug: 'dirac-proof',
              title: 'Dirac\'s theorem directly',
              prompt: `Prove Dirac's theorem directly, by considering a longest path, without going through Ore's theorem. Show that the bound $\\delta\\ge n/2$ cannot be lowered, with an example for every $n\\ge 3$.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'petersen-not-hamiltonian',
              title: 'The Petersen graph',
              prompt: `Prove directly that the Petersen graph has no Hamiltonian cycle, by considering how a $10$-cycle would use the five spokes. Show that it does have a Hamiltonian path, and that deleting any vertex leaves a Hamiltonian graph.`,
              kind: 'derivation',
              difficulty: 3,
              hint: 'A 10-cycle uses an even number of spokes, and 2 or 4 spokes lead to contradictions in different ways.',
            },
            {
              slug: 'knight-tours',
              title: 'Knight\'s tours',
              prompt: `Prove that there is no closed knight's tour on a $5\\times 5$ board. Find an open tour on that board by a backtracking program, and a closed tour on a $6\\times 6$ board.`,
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'complete-bipartite-hamiltonian',
              title: 'Complete bipartite graphs',
              prompt: `Prove that $K_{m,n}$ is Hamiltonian if and only if $m=n\\ge 2$, and that it has a Hamiltonian path if and only if $|m-n|\\le 1$. Count the Hamiltonian cycles of $K_{n,n}$.`,
              kind: 'derivation',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Does $\\delta\\ge n/2$ follow from Hamiltonicity?',
              answerOutline: `No. $C_n$ is Hamiltonian with $\\delta=2$. Dirac's condition is sufficient, not necessary.`,
            },
            {
              question: 'Why is $K_{2,3}$ not Hamiltonian?',
              answerOutline: `Deleting the two vertices of the smaller side leaves three components, more than two.`,
            },
            {
              question: 'Which bit changes in a Gray code from $011$ to $010$?',
              answerOutline: `The last bit.`,
            },
          ],
          relatedLessons: ['discrete-mathematics/graphs-and-trees/euler-and-hamilton'],
        },
        {
          slug: 'ramsey-theory',
          title: 'Ramsey theory',
          summary:
            'Complete disorder is impossible: every large enough colouring contains a monochromatic clique.',
          estimatedMinutes: 160,
          objectives: [
            'Prove that $R(3,3)=6$',
            'Prove the recursive upper bound and the binomial bound for $R(s,t)$',
            'Prove a lower bound by construction',
            'State what is known about $R(4,4)$, $R(5,5)$ and the probabilistic lower bound',
          ],
          concepts: [
            'Ramsey number $R(s,t)$',
            'Two-colourings of $K_n$',
            'Recursive bound',
            'Binomial upper bound',
            'Constructive lower bounds',
            'Multicolour Ramsey numbers',
            'Probabilistic lower bound',
          ],
          explanation: `Colour every edge of $K_n$ red or blue. The **Ramsey number** $R(s,t)$ is the least $n$ such that every such colouring contains a red $K_s$ or a blue $K_t$. Equivalently, every graph on $R(s,t)$ vertices contains a clique of size $s$ or an independent set of size $t$. Ramsey's theorem says these numbers exist.

**Worked example: $R(3,3)=6$.** Upper bound: colour $K_6$, and fix a vertex $v$. It has $5$ edges, so by pigeonhole at least $3$ have the same colour, say red, to $a,b,c$. If any edge among $a,b,c$ is red, it forms a red triangle with $v$. If none is red, then $abc$ is a blue triangle. Lower bound: colour the edges of $K_5$ so that the red edges form a $5$-cycle and the blue edges form the complementary $5$-cycle (the pentagram). Neither $C_5$ contains a triangle. So $K_5$ can avoid monochromatic triangles, and $R(3,3)=6$.

**Upper bounds in general.** For $s,t\\ge 2$,
$$R(s,t)\\le R(s-1,t)+R(s,t-1).$$
The proof is the same as above. Fix $v$ in a colouring of $K_n$ with $n=R(s-1,t)+R(s,t-1)$. Then $v$ has either at least $R(s-1,t)$ red neighbours or at least $R(s,t-1)$ blue ones. In the first case, the red neighbours contain a red $K_{s-1}$, which $v$ completes to $K_s$, or a blue $K_t$. The second case is symmetric. With $R(s,2)=s$, induction gives
$$R(s,t)\\le\\binom{s+t-2}{s-1},$$
so $R(k,k)\\le\\binom{2k-2}{k-1}<4^k$. If both $R(s-1,t)$ and $R(s,t-1)$ are even, the inequality is strict, by a parity argument. This gives $R(3,4)\\le 9$, and a colouring of $K_8$ shows that $R(3,4)=9$.

**Lower bounds.** These are hard to construct. Known values include $R(3,4)=9$, $R(3,5)=14$ and $R(4,4)=18$. Even $R(5,5)$ is unknown: it lies between $43$ and $46$, the upper bound having been proved recently with heavy computation. Erdős proved $R(k,k)>2^{k/2}$ for $k\\ge 3$, by showing that a random colouring of $K_n$ with $n=\\lfloor 2^{k/2}\\rfloor$ has no monochromatic $K_k$ with positive probability. No explicit construction comes close to this bound. The Combinatorics course in this curriculum develops the probabilistic method behind it.

**Many colours.** With $r$ colours, $R_r(3)$ is the least $n$ such that every $r$-colouring of $K_n$ has a monochromatic triangle. The same pigeonhole argument gives $R_r(3)\\le r(R_{r-1}(3)-1)+2$. For three colours, this gives $R_3(3)\\le 17$, and $17$ is the true value.

Ramsey theory is a vast subject. Its slogan is that complete disorder is impossible: every sufficiently large structure contains a highly ordered substructure. Schur's theorem on monochromatic solutions of $x+y=z$ and van der Waerden's theorem on arithmetic progressions are other instances.`,
          resources: [
            trotter('Treats Ramsey numbers, including the probabilistic lower bound.'),
            { title: 'Small Ramsey Numbers (Radziszowski)', url: 'https://www.combinatorics.org/ojs/index.php/eljc/article/view/DS1', type: 'article', cost: 'free', provider: 'Electronic Journal of Combinatorics', note: 'The standard, regularly revised survey of known values and bounds.' },
            ocw315('The lectures on Ramsey theory develop the bounds here.'),
          ],
          exercises: [
            {
              slug: 'ramsey-recursion',
              title: 'The recursive bound',
              prompt: `Prove $R(s,t)\\le R(s-1,t)+R(s,t-1)$ and the binomial bound. Then prove that if both terms on the right are even, the inequality is strict. Deduce $R(3,4)\\le 9$.`,
              kind: 'derivation',
              difficulty: 2,
              hint: 'With equality, every vertex would have exactly R(s-1,t) - 1 red neighbours, and an odd number of vertices of odd red degree is impossible.',
            },
            {
              slug: 'r34-lower',
              title: 'A colouring of K8',
              prompt: `On the vertices $0,\\dots,7$, colour $ij$ red when $i-j\\equiv\\pm1$ or $4\\pmod 8$, and blue otherwise. Prove that there is no red triangle and no blue $K_4$, so that $R(3,4)=9$. Check by computer.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'three-colour-triangles',
              title: 'Three colours',
              prompt: `Prove that every $3$-colouring of the edges of $K_{17}$ has a monochromatic triangle. State the general bound for $r$ colours, and deduce that $R_r(3)\\le\\lfloor e\\,r!\\rfloor+1$.`,
              kind: 'derivation',
              difficulty: 3,
            },
            {
              slug: 'erdos-lower-bound',
              title: 'The probabilistic lower bound',
              prompt: `Colour each edge of $K_n$ red or blue independently with probability $1/2$. Show that the expected number of monochromatic copies of $K_k$ is $\\binom nk2^{1-\\binom k2}$, and that it is less than $1$ when $n=\\lfloor 2^{k/2}\\rfloor$ and $k\\ge 3$. Conclude that $R(k,k)>2^{k/2}$.`,
              kind: 'derivation',
              difficulty: 3,
            },
            {
              slug: 'ramsey-search',
              title: 'Searching for colourings',
              prompt: `Write a program that searches for a colouring of $K_{13}$ with no red triangle and no blue $K_5$, which shows that $R(3,5)\\ge 14$. Try the circulant colouring on $\\mathbb{Z}_{13}$ where $ij$ is red when $i-j$ is a cube, and explain why that set is closed under negation.`,
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does $K_5$ not force a monochromatic triangle?',
              answerOutline: `Colour a $5$-cycle red and the complementary $5$-cycle blue. Neither contains a triangle.`,
            },
            {
              question: 'What is $R(s,2)$?',
              answerOutline: `$s$. Either all edges of $K_s$ are red, or some edge is blue.`,
            },
            {
              question: 'What is the best known general lower bound for $R(k,k)$, and how is it proved?',
              answerOutline: `About $2^{k/2}$, by Erdos's probabilistic argument. No explicit construction matches it.`,
            },
          ],
        },
        {
          slug: 'extremal-graphs',
          title: 'Extremal graphs: Mantel and Turan',
          summary:
            'How many edges a graph can have without containing a given subgraph.',
          estimatedMinutes: 150,
          objectives: [
            'Prove Mantel\'s theorem and find its extremal graphs',
            'State and prove Turan\'s theorem',
            'Compute Turan numbers',
            'Bound the number of edges in a graph without $4$-cycles',
          ],
          concepts: [
            'Extremal number $\\operatorname{ex}(n,H)$',
            'Mantel\'s theorem',
            'Turan graph $T(n,r)$',
            'Turan\'s theorem',
            'Zykov symmetrisation',
            'Erdos-Stone theorem',
            'Counting cherries',
          ],
          explanation: `The **extremal number** $\\operatorname{ex}(n,H)$ is the largest number of edges in a graph on $n$ vertices containing no copy of $H$.

**Mantel's theorem.** A triangle-free graph on $n$ vertices has at most $\\lfloor n^2/4\\rfloor$ edges, with equality only for the balanced complete bipartite graph $K_{\\lfloor n/2\\rfloor,\\lceil n/2\\rceil}$.

**Worked example: a proof of Mantel.** For an edge $uv$ in a triangle-free graph, $u$ and $v$ have no common neighbour, so $d(u)+d(v)\\le n$. Summing over all edges,
$$\\sum_{uv\\in E}\\bigl(d(u)+d(v)\\bigr)=\\sum_vd(v)^2\\le nm.$$
The left side is $\\sum_vd(v)^2$, because each vertex $v$ is counted once for each of its $d(v)$ edges. By the Cauchy-Schwarz inequality, $\\sum_vd(v)^2\\ge\\frac1n\\bigl(\\sum_vd(v)\\bigr)^2=\\frac{4m^2}n$. So $4m^2/n\\le nm$, and $m\\le n^2/4$. Since $m$ is an integer, $m\\le\\lfloor n^2/4\\rfloor$. For $n=7$, this gives at most $12$ edges, and $K_{3,4}$ has exactly $12$. Equality in the argument forces all degrees to be equal or nearly so, and $d(u)+d(v)=n$ on every edge, which leads to the complete bipartite graph.

**Turan's theorem.** Let $T(n,r)$ be the complete $r$-partite graph on $n$ vertices with parts as equal as possible, sizes differing by at most $1$. It has no $K_{r+1}$, since a clique uses at most one vertex per part. Turan's theorem says that every graph on $n$ vertices with no $K_{r+1}$ has at most as many edges as $T(n,r)$, with equality only for $T(n,r)$. Mantel's theorem is the case $r=2$.

A clean proof uses **Zykov symmetrisation**. Take an extremal $K_{r+1}$-free graph. Show that non-adjacency is an equivalence relation in it: if $u\\not\\sim v$ and $v\\not\\sim w$ but $u\\sim w$, then replacing $u$ and $w$ by copies of $v$, or $v$ by a copy of the higher-degree one of them, increases the number of edges without creating $K_{r+1}$. So the graph is complete multipartite with at most $r$ parts, and balancing the parts maximises the edges.

For example, $T(10,3)$ has parts of sizes $4,3,3$. Its edges number $\\binom{10}2-\\binom42-\\binom32-\\binom32=45-6-3-3=33$. So a graph on $10$ vertices with $34$ edges contains $K_4$. Asymptotically, $T(n,r)$ has about $\\bigl(1-\\frac1r\\bigr)\\frac{n^2}2$ edges.

**Beyond cliques.** The **Erdos-Stone theorem** states that $\\operatorname{ex}(n,H)=\\bigl(1-\\frac1{\\chi(H)-1}\\bigr)\\frac{n^2}2+o(n^2)$. So the chromatic number of $H$ decides the leading behaviour. For bipartite $H$ this only says $o(n^2)$, and the true orders of growth are a major research area. For the $4$-cycle, counting paths of length $2$ (cherries) gives $\\operatorname{ex}(n,C_4)\\le\\frac n4\\bigl(1+\\sqrt{4n-3}\\bigr)$, of order $n^{3/2}$, and this order is achieved by graphs built from finite projective planes.`,
          resources: [
            { title: 'Graph Theory and Additive Combinatorics (Zhao)', url: 'https://yufeizhao.com/gtacbook/', type: 'textbook', cost: 'free', provider: 'Yufei Zhao', note: 'The chapter on forbidding a subgraph covers Mantel, Turan, Kovari-Sos-Turan and Erdos-Stone. Free to read online.' },
            ocw315('The lectures on extremal graph theory cover Turan\'s theorem.'),
            diestel('The chapter on extremal graph theory gives several proofs of Turan\'s theorem.'),
          ],
          exercises: [
            {
              slug: 'mantel-induction',
              title: 'Mantel by induction',
              prompt: `Give a second proof of Mantel's theorem by induction on $n$, removing the two ends of an edge. Then prove that the balanced complete bipartite graph is the unique extremal graph.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'turan-numbers',
              title: 'Turan numbers',
              prompt: `Find the number of edges of $T(n,r)$ for $(n,r)=(10,3)$, $(12,4)$ and $(13,4)$. Prove that the edge count of a complete $r$-partite graph on $n$ vertices is maximised when the parts are balanced.`,
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'turan-proof',
              title: 'Prove Turan\'s theorem',
              prompt: `Prove Turan's theorem by Zykov symmetrisation or by induction on $n$. State precisely the uniqueness of the extremal graph, and show where your proof gives it.`,
              kind: 'derivation',
              difficulty: 3,
            },
            {
              slug: 'c4-free-bound',
              title: 'Graphs without 4-cycles',
              prompt: `Let $G$ have no $4$-cycle. Count the pairs of edges sharing a vertex in two ways to show $\\sum_v\\binom{d(v)}2\\le\\binom n2$. Deduce $m\\le\\frac n4\\bigl(1+\\sqrt{4n-3}\\bigr)$. Check that the Petersen graph, which has no $4$-cycles, satisfies the bound.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'many-triangles',
              title: 'One edge past Mantel',
              prompt: `Prove that a graph on $n$ vertices with $\\lfloor n^2/4\\rfloor+1$ edges contains at least one triangle, and in fact at least $\\lfloor n/2\\rfloor$ triangles. Check the second claim by computer for $n\\le 7$.`,
              kind: 'derivation',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'What is the largest triangle-free graph on $9$ vertices?',
              answerOutline: `$K_{4,5}$, with $20$ edges.`,
            },
            {
              question: 'Why does $T(n,r)$ have no $K_{r+1}$?',
              answerOutline: `A clique has at most one vertex in each part, and there are $r$ parts.`,
            },
            {
              question: 'What does the Erdos-Stone theorem say about bipartite $H$?',
              answerOutline: `Only that $\\operatorname{ex}(n,H)=o(n^2)$. The true growth rate needs other methods.`,
            },
          ],
        },
      ],
    },
  ],
  capstone: {
    slug: 'conjecture-testing-machine',
    title: 'A conjecture-testing machine',
    description: `Build a system that enumerates all small graphs and tests statements about them, and use it to probe real theorems and plausible false claims. Use NetworkX's atlas, which contains every graph on up to $7$ vertices, and extend to $8$ or more vertices with your own canonical augmentation, or with nauty's \`geng\` through WSL if you prefer. Compute a library of invariants for each graph: connectivity, chromatic number and index, independence number, matching number, planarity, girth, Hamiltonicity and so on.

Then run experiments. Confirm Brooks' theorem, Vizing's theorem, Konig's theorems and the Euler bound for planar graphs on every graph in range. Find the smallest counterexample to each of at least five false statements, such as "every $3$-regular graph has a Hamiltonian cycle" or "$\\chi(G)\\le\\omega(G)+1$". Finally, pick an open-ended question, for example which graphs attain equality in a bound from the course, and report what the data suggests and what you can prove.`,
    deliverables: [
      'An enumeration that reproduces the counts $1,2,4,11,34,156,1044$ of graphs on $1$ to $7$ vertices, and $12346$ on $8$ vertices if you extend it',
      'An invariant table with at least $10$ invariants per graph, with each value checked by an independent method on a sample',
      'Verification runs for at least six theorems from the course, with timings',
      'Smallest counterexamples to at least five false conjectures, each drawn and explained',
      'A report of 5-8 pages, including at least two proofs of patterns that you found',
    ],
    estimatedHours: 18,
    stretchGoals: [
      'Extend to $9$ or $10$ vertices for selected properties, using symmetry to prune',
      'Search for small graphs that are extremal for a Ramsey or Turan-type problem',
    ],
  },
  masteryChecklist: [
    'I can prove Euler\'s theorem and the characterisation of bipartite graphs by odd cycles',
    'I can prove the equivalent characterisations of trees and Cayley\'s formula',
    'I can state and apply Menger\'s theorem in its vertex and edge forms',
    'I can prove Hall\'s theorem and Konig\'s theorem, and use Tutte\'s condition',
    'I can bound chromatic numbers with greedy colouring and Brooks\' theorem, and compute chromatic polynomials',
    'I can state Vizing\'s theorem and determine the edge chromatic number of standard graphs',
    'I can use Euler\'s formula to prove non-planarity, and prove the five colour theorem',
    'I can prove Dirac\'s theorem and simple Ramsey bounds such as $R(3,3)=6$',
    'I can prove Mantel\'s theorem and state Turan\'s theorem',
  ],
});
