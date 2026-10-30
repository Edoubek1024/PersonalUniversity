import { defineSubject } from '../define';

export default defineSubject({
  id: 'databases',
  title: 'Database Systems',
  category: 'cs',
  tagline:
    'From SQL and schema design down to pages, B+ trees, query optimisers, locks and logs: how a database keeps data correct and fast.',
  description: `Almost every application is, at its core, a thin layer over a database. Knowing SQL well makes you productive; knowing how the database executes that SQL, keeps it consistent under concurrent updates and survives a crash in the middle of a write makes you the person who can fix the slow query, design the schema that will not need rewriting, and choose the right store for a new system.

This subject follows the arc of CMU 15-445/645 and Berkeley CS186, with PostgreSQL and SQLite as the systems you read, instrument and measure. The first two modules make you fluent in the relational model, SQL and schema design. The middle three open the engine: how tuples live on disk pages, how a buffer pool and B+ tree index serve them, how a query becomes a plan and how an optimiser chooses it, how transactions interleave safely. The last two cover recovery, replication and partitioning, and the non-relational systems that trade away parts of the relational model for scale or flexibility.

Every lesson has you write SQL against real data, read EXPLAIN output, or build a piece of the engine yourself. By the end you will have written a small relational engine of your own (or a benchmarked data-backed application) and be able to reason about any database from the query down to the disk.`,
  difficulty: 'intermediate',
  estimatedHours: 70,
  prerequisites: ['programming-fundamentals', 'data-structures-algorithms'],
  recommendedBackground: [
    'Python fluency (the sqlite3 module and psycopg are used throughout)',
    'B-trees, hash tables and sorting from the algorithms subject',
    'Basic understanding of files, disks and processes from operating systems is helpful but not required',
  ],
  tags: ['SQL', 'relational model', 'storage engines', 'indexing', 'query optimisation', 'transactions', 'PostgreSQL', 'SQLite'],
  core: true,
  modules: [
    {
      slug: 'relational-model-and-sql',
      title: 'The Relational Model and SQL',
      description:
        'Relations, keys and relational algebra; then SQL for querying, joining, aggregating, defining and modifying data, practised on real datasets.',
      lessons: [
        {
          slug: 'relational-model-and-algebra',
          title: 'The relational model and relational algebra',
          summary:
            'Relations as sets of tuples, keys and integrity, and the six algebra operators that every SQL query compiles down to.',
          estimatedMinutes: 90,
          objectives: [
            'Define relation, attribute, tuple, domain, schema and instance precisely',
            'Identify superkeys, candidate keys, primary keys and foreign keys and state the integrity constraints they imply',
            'Write queries in relational algebra using selection, projection, union, difference, Cartesian product, rename and join',
            'Explain why data independence was the point of Codd\'s model and why it still matters',
          ],
          concepts: [
            'Relation = schema + set of tuples',
            'Keys: superkey, candidate, primary, foreign',
            'Entity integrity and referential integrity',
            'Relational algebra: sigma, pi, union, minus, x, rho',
            'Natural join and theta join as derived operators',
            'Set semantics vs bag (multiset) semantics',
            'Logical vs physical data independence',
          ],
          explanation: `Codd's 1970 insight was that data should be described by its logical structure alone, as **relations**, so that programs do not depend on how it is stored. A relation has a **schema** (a name and a set of typed attributes) and an **instance** (a set of tuples conforming to it). Being a *set*, a relation has no duplicate tuples and no inherent order; SQL relaxes this to bags for performance, which is why \`SELECT\` without \`DISTINCT\` can return duplicates and why you should never rely on row order without \`ORDER BY\`.

**Keys** express identity. A **superkey** is any set of attributes that uniquely identifies a tuple; a **candidate key** is a minimal superkey; the **primary key** is the candidate key you choose. A **foreign key** is an attribute set in one relation that references the primary key of another, and **referential integrity** says every foreign key value must exist in the referenced relation (or be null). These constraints are the database's promise about the data, and later lessons show how much the engine can do because of them.

**Relational algebra** is the small language that SQL is translated into. **Selection** $\\sigma_{\\text{cond}}(R)$ keeps the tuples that satisfy a predicate; **projection** $\\pi_{A, B}(R)$ keeps columns; **union**, **difference** and **Cartesian product** combine relations; **rename** $\\rho$ relabels. Everything else is derived: a **join** $R \\bowtie_{\\theta} S$ is $\\sigma_{\\theta}(R \\times S)$, intersection is a double difference, division expresses "for all". Learning to write a query as an algebra expression tree is the skill that lets you read an \`EXPLAIN\` plan later, because a plan is exactly such a tree with physical operators chosen for each node.

The payoff of the model is **data independence**: you can add an index, reorganise storage or even change the physical schema without changing a single query. That property, and the declarative optimiser it enables, is why relational databases outlived every "faster" alternative for forty years.

Read Codd's paper (it is short and surprisingly readable), the CS186 relational algebra notes and the 15-445 first lecture, then do the algebra exercises on paper before touching SQL.`,
          resources: [
            {
              title: 'CMU 15-445/645 Intro to Database Systems (Fall 2024) — Lecture 1: Relational Model and Algebra',
              url: 'https://15445.courses.cs.cmu.edu/fall2024/schedule.html',
              type: 'lecture',
              cost: 'free',
              provider: 'Carnegie Mellon University',
              note: 'Slides, notes and video for every lecture are linked from the schedule.',
              primary: true,
            },
            {
              title: 'E. F. Codd — A Relational Model of Data for Large Shared Data Banks (1970)',
              url: 'https://www.engineering.upenn.edu/~zives/03f/cis550/codd.pdf',
              type: 'article',
              cost: 'free',
              provider: 'Communications of the ACM (course mirror)',
              note: 'Sections 1 and 2 for the motivation and the model; the normal form section anticipates module 2.',
            },
            {
              title: 'Berkeley CS186 — Online course notes (SQL, relational algebra and more)',
              url: 'https://cs186berkeley.net/notes/',
              type: 'textbook',
              cost: 'free',
              provider: 'UC Berkeley',
              note: 'The "Relational Algebra" note for this lesson.',
            },
            {
              title: 'Database System Concepts, 7th edition (Silberschatz, Korth, Sudarshan)',
              url: 'https://db-book.com/',
              type: 'textbook',
              cost: 'paid',
              provider: 'McGraw-Hill',
              note: 'Chapters 2 and 27 if you own it; the site offers free slides and practice-exercise solutions. Not required.',
            },
          ],
          exercises: [
            {
              slug: 'keys-and-constraints',
              title: 'Keys from a schema',
              prompt:
                'Given relations Student(sid, email, name, year), Course(cid, title, dept), Enrolled(sid, cid, term, grade) with the rule that a student takes a course at most once per term: list all candidate keys of each relation, choose primary keys, state every foreign key, and write three example updates that would violate entity or referential integrity, explaining which constraint each breaks.',
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'algebra-queries',
              title: 'Ten queries in relational algebra',
              prompt:
                'Using the schema above write algebra expressions (as trees or linear notation) for: students enrolled in a given course; students with no enrolments; courses taken by every student in year 1 (division); pairs of students who took a course together; the departments offering courses in which someone got an A; and five more of your own. For each, give an equivalent expression using only the six primitive operators.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'mini-algebra-engine',
              title: 'A relational algebra engine in Python',
              prompt:
                'Implement relations as named tuples in sets with functions select, project, union, difference, product, rename and a derived join. Load the Student/Course/Enrolled data from CSV, encode your ten algebra queries as compositions of these functions, and compare each result against a SQLite query on the same data. Then switch the representation to lists (bag semantics) and show which of your queries change their results.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What is the difference between a superkey and a candidate key?',
              answerOutline:
                'A superkey uniquely identifies tuples; a candidate key is a minimal superkey (no proper subset is a superkey). Primary key is the chosen candidate key.',
            },
            {
              question: 'Express R join_theta S using only primitive operators.',
              answerOutline:
                'sigma_theta(R x S): Cartesian product followed by selection on the join predicate.',
            },
            {
              question: 'Why does SQL use bag semantics when the relational model uses sets?',
              answerOutline:
                'Eliminating duplicates costs a sort or hash over the result; bags let the engine skip that work unless DISTINCT is requested, and duplicates can be meaningful for aggregates.',
            },
            {
              question: 'What does logical data independence let you do?',
              answerOutline:
                'Change the physical storage, indexes or layout (and even some schema aspects via views) without rewriting application queries.',
            },
          ],
        },
        {
          slug: 'sql-queries-and-joins',
          title: 'SQL: SELECT, filtering, ordering and joins',
          summary:
            'The core query language: projecting and filtering rows, inner and outer joins, NULL semantics, and the logical evaluation order that explains every surprising result.',
          estimatedMinutes: 100,
          objectives: [
            'Write SELECT queries with WHERE, ORDER BY, LIMIT, DISTINCT and expressions',
            'Use INNER, LEFT, RIGHT, FULL and CROSS joins and predict row counts',
            'Reason correctly about NULL and three-valued logic',
            'State the logical evaluation order of a SELECT statement and use it to debug queries',
          ],
          concepts: [
            'SELECT-FROM-WHERE and logical evaluation order',
            'Inner vs outer joins; join conditions',
            'Self joins and multi-way joins',
            'NULL, IS NULL, three-valued logic',
            'DISTINCT, ORDER BY, LIMIT/OFFSET',
            'String, date and arithmetic expressions; CASE',
            'Set operations: UNION, INTERSECT, EXCEPT',
          ],
          explanation: `SQL is declarative: you state what rows you want and the engine decides how. To write it well you need the **logical evaluation order**, which is not the order you type: \`FROM\` (including joins) builds the working set, \`WHERE\` filters rows, \`GROUP BY\` groups, \`HAVING\` filters groups, \`SELECT\` computes output columns, \`DISTINCT\` removes duplicates, \`ORDER BY\` sorts, \`LIMIT\` truncates. This is why a column alias defined in \`SELECT\` cannot be used in \`WHERE\`, and why filtering in \`WHERE\` on a column from the right side of a \`LEFT JOIN\` silently turns it into an inner join.

**Joins** combine rows from two tables on a condition. An **inner join** keeps only matching pairs. A **left outer join** keeps every row of the left table, padding with NULLs where there is no match; **right** and **full** joins are the mirror and the union. A **cross join** is the full Cartesian product and is almost always a mistake unless you mean it. Before running a join, predict the row count: an inner join on a foreign key returns at most the number of rows in the child table; a join on a non-key column can multiply rows, which is the classic source of "my totals doubled" bugs.

**NULL** means unknown, and comparisons with it are neither true nor false but *unknown*. \`WHERE x = NULL\` returns nothing; you must write \`IS NULL\`. \`NOT IN\` with a NULL in the subquery returns no rows at all, a trap that catches everyone once. Aggregates skip NULLs; \`COUNT(*)\` counts rows while \`COUNT(col)\` counts non-null values. Draw the three-valued truth tables once and the behaviour stops being surprising.

Practise on real data: the Chinook sample database (a music store) loads into SQLite in one command, and pgexercises runs in the browser against PostgreSQL. Work through SQLBolt or the first half of pgexercises, then the Chinook exercises here. Write each query first as the algebra tree from the previous lesson; the SQL follows.`,
          resources: [
            {
              title: 'PostgreSQL Exercises (pgexercises) — Basic and Joins sections',
              url: 'https://pgexercises.com/',
              type: 'interactive',
              cost: 'free',
              provider: 'pgexercises.com',
              note: 'Browser-based with instant checking; do "Basic" and "Joins and Subqueries" for this lesson.',
              primary: true,
            },
            {
              title: 'SQLBolt — interactive SQL lessons',
              url: 'https://sqlbolt.com/',
              type: 'interactive',
              cost: 'free',
              provider: 'SQLBolt',
              note: 'Lessons 1-9 if you are new to SQL.',
            },
            {
              title: 'Chinook sample database (SQLite, PostgreSQL, MySQL scripts)',
              url: 'https://github.com/lerocha/chinook-database',
              type: 'dataset',
              cost: 'free',
              provider: 'GitHub',
            },
            {
              title: 'PostgreSQL documentation — Part I: Tutorial (chapters 2 and 3)',
              url: 'https://www.postgresql.org/docs/current/tutorial.html',
              type: 'documentation',
              cost: 'free',
              provider: 'PostgreSQL',
            },
            {
              title: 'SQLite documentation — SQL As Understood By SQLite',
              url: 'https://www.sqlite.org/lang.html',
              type: 'documentation',
              cost: 'free',
              provider: 'SQLite',
              note: 'The SELECT page has the clearest diagram of evaluation order anywhere.',
            },
          ],
          exercises: [
            {
              slug: 'chinook-queries',
              title: 'Twenty queries on Chinook',
              prompt:
                'Load Chinook into SQLite. Write and save queries for: all tracks over 10 minutes with their album and artist; customers with no invoices (LEFT JOIN ... IS NULL, then rewrite with EXCEPT); the employee hierarchy as (employee, manager) pairs via self join; invoices for each customer including those with none, ordered by total; every pair of tracks on the same album (no duplicates, no self-pairs); and fifteen more of increasing difficulty. For every join, write your predicted row count before running it and record how often you were wrong.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'null-traps',
              title: 'NULL traps',
              prompt:
                'Create a table with some NULL values and demonstrate, with queries and their outputs: WHERE col = NULL returns nothing; NOT IN with a NULL in the list returns nothing; COUNT(*) vs COUNT(col); NULL in ORDER BY (first or last depends on the engine, check both SQLite and PostgreSQL); and how a WHERE filter on the right table of a LEFT JOIN removes the unmatched rows. Fix each with IS NULL, NOT EXISTS, COALESCE or moving the predicate into the ON clause.',
              kind: 'coding',
              difficulty: 1,
            },
            {
              slug: 'row-multiplication-bug',
              title: 'Find the doubled totals',
              prompt:
                'Write a query that sums invoice totals per customer but joins to a table with multiple rows per invoice (invoice lines) so the totals are inflated. Show the wrong result, explain it with the evaluation order, and fix it two ways: aggregate the child table in a subquery first, or join only the tables you need. Verify both fixes agree.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why can a WHERE clause not reference a column alias defined in SELECT?',
              answerOutline:
                'WHERE is evaluated logically before SELECT computes its expressions, so the alias does not exist yet (some engines allow it as an extension, but the standard does not).',
            },
            {
              question: 'What happens to a LEFT JOIN if you filter on the right table in WHERE?',
              answerOutline:
                'Unmatched rows have NULL in the right-table columns; the WHERE predicate on them is unknown and they are dropped, making it effectively an inner join. Put the predicate in ON instead.',
            },
            {
              question: 'Why does x NOT IN (SELECT y ...) return no rows when some y is NULL?',
              answerOutline:
                'NOT IN expands to x <> y1 AND x <> y2 ...; any comparison with NULL is unknown, so the whole conjunction is never true. Use NOT EXISTS.',
            },
          ],
        },
        {
          slug: 'aggregation-grouping-and-subqueries',
          title: 'Aggregation, grouping and subqueries',
          summary:
            'GROUP BY and HAVING, the aggregate functions, correlated and uncorrelated subqueries, EXISTS, and how to express "for all" and "top-N per group".',
          estimatedMinutes: 100,
          objectives: [
            'Write aggregate queries with GROUP BY and HAVING and explain which columns may appear in SELECT',
            'Use scalar, row and table subqueries in SELECT, FROM and WHERE',
            'Distinguish correlated from uncorrelated subqueries and rewrite between subqueries and joins',
            'Express universal quantification ("every") and top-N-per-group correctly',
          ],
          concepts: [
            'Aggregates: COUNT, SUM, AVG, MIN, MAX; NULL handling',
            'GROUP BY and the single-value rule',
            'HAVING vs WHERE',
            'Scalar, row and table subqueries',
            'Correlated subqueries and EXISTS / NOT EXISTS',
            'IN, ANY, ALL',
            'Derived tables and query decomposition',
          ],
          explanation: `**Aggregation** collapses groups of rows to one row each. \`GROUP BY\` partitions the filtered rows by the listed columns; aggregate functions (\`COUNT\`, \`SUM\`, \`AVG\`, \`MIN\`, \`MAX\`) compute one value per group; \`HAVING\` filters the groups after aggregation, which is why it can use aggregates and \`WHERE\` cannot. The rule that trips people: every column in \`SELECT\` must be either in the \`GROUP BY\` or inside an aggregate, because there is one output row per group and a non-grouped column has no single value. (SQLite and MySQL relax this and return an arbitrary value, which hides bugs; PostgreSQL rejects it.) Aggregates ignore NULLs, so \`AVG(col)\` averages the non-null values and \`COUNT(DISTINCT col)\` counts distinct non-null values.

**Subqueries** nest one query inside another. A **scalar** subquery returns one value and can go anywhere an expression can; a **table** subquery in \`FROM\` is a derived table you can join to; a subquery in \`WHERE\` with \`IN\`, \`EXISTS\`, \`ANY\` or \`ALL\` filters rows. A **correlated** subquery references a column of the outer query and is logically re-evaluated per outer row; \`EXISTS\` with a correlated subquery is the cleanest way to say "there is some related row", and \`NOT EXISTS\` is the safe way to say "there is none" (it has none of \`NOT IN\`'s NULL problem).

Two patterns deserve names. **Universal quantification** ("customers who bought *every* product in category X") has no direct SQL operator; write it as a double negation: no product in X exists that the customer did not buy. **Top-N per group** ("the three most expensive tracks on each album") is awkward with plain subqueries and becomes trivial with window functions in the next module; do it the hard way once (correlated count of rows ranked above) so you appreciate the easy way.

Modern optimisers rewrite most subqueries into joins, so the choice is about clarity, not speed; check with \`EXPLAIN\` and you will often see identical plans. Work through the pgexercises aggregates section and the Chinook problems here.`,
          resources: [
            {
              title: 'PostgreSQL Exercises — Aggregates section',
              url: 'https://pgexercises.com/',
              type: 'interactive',
              cost: 'free',
              provider: 'pgexercises.com',
              primary: true,
            },
            {
              title: 'CMU 15-445 (Fall 2024) — Lecture 2: Modern SQL',
              url: 'https://15445.courses.cs.cmu.edu/fall2024/schedule.html',
              type: 'lecture',
              cost: 'free',
              provider: 'Carnegie Mellon University',
              note: 'Aggregation, nested queries, and a preview of window functions and CTEs.',
            },
            {
              title: 'Berkeley CS186 notes — SQL',
              url: 'https://cs186berkeley.net/notes/',
              type: 'textbook',
              cost: 'free',
              provider: 'UC Berkeley',
            },
          ],
          exercises: [
            {
              slug: 'chinook-aggregates',
              title: 'Aggregates and subqueries on Chinook',
              prompt:
                'Write: revenue per country with countries over 100 in revenue; the genre with the most tracks; customers whose total spend exceeds the average customer spend (scalar subquery); artists with albums in every genre that Iron Maiden has albums in (double NOT EXISTS); the top 3 tracks by sales per genre without window functions; and the invoice with the most lines, using a derived table. Run EXPLAIN QUERY PLAN on the correlated versions and note whether SQLite rewrote them.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'subquery-rewrites',
              title: 'Rewrite subqueries as joins and back',
              prompt:
                'Take five of your IN / EXISTS subqueries and rewrite each as a join (with DISTINCT where needed), then take five joins and rewrite as subqueries. Verify identical results with EXCEPT in both directions. Compare EXPLAIN plans in PostgreSQL (use the Chinook PostgreSQL script) and report which pairs got the same plan.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'group-by-pitfalls',
              title: 'GROUP BY pitfalls',
              prompt:
                'Show a query that SQLite accepts (non-aggregated, non-grouped column in SELECT) and PostgreSQL rejects; explain why PostgreSQL is right. Demonstrate the difference between COUNT(*), COUNT(col) and COUNT(DISTINCT col) with NULLs present; the effect of HAVING vs WHERE on the same predicate; and the wrong answer you get from AVG over a column with NULLs treated as zeros versus unknowns.',
              kind: 'coding',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'Why must every SELECT column be grouped or aggregated?',
              answerOutline:
                'Each output row represents a group of many rows; a non-grouped, non-aggregated column has multiple candidate values and no well-defined single value.',
            },
            {
              question: 'How do you express "customers who bought every product in a category" in SQL?',
              answerOutline:
                'Double negation with NOT EXISTS: select customers for whom there does not exist a product in the category for which there does not exist a purchase by that customer.',
            },
            {
              question: 'What makes a subquery correlated and what is its naive cost?',
              answerOutline:
                'It references columns of the outer query; naively it runs once per outer row (O(n * cost)), though optimisers usually decorrelate it into a join.',
            },
          ],
        },
        {
          slug: 'ddl-constraints-and-modification',
          title: 'Defining and modifying data: DDL, constraints, views and transactions in SQL',
          summary:
            'CREATE TABLE with types and constraints, INSERT/UPDATE/DELETE semantics, views, and the transaction statements that bracket multi-statement changes.',
          estimatedMinutes: 90,
          objectives: [
            'Create tables with appropriate types, primary and foreign keys, NOT NULL, UNIQUE and CHECK constraints',
            'Choose referential actions (CASCADE, RESTRICT, SET NULL) and justify them',
            'Write INSERT, UPDATE, DELETE and UPSERT statements and predict their effects under constraints',
            'Use views for abstraction and BEGIN/COMMIT/ROLLBACK to group statements atomically',
          ],
          concepts: [
            'Data types and the cost of choosing wrong (money as float)',
            'PRIMARY KEY, FOREIGN KEY, NOT NULL, UNIQUE, CHECK, DEFAULT',
            'Referential actions: ON DELETE CASCADE / RESTRICT / SET NULL',
            'INSERT ... SELECT, UPDATE ... FROM, DELETE with subqueries',
            'UPSERT: INSERT ... ON CONFLICT',
            'Views and updatable views',
            'BEGIN, COMMIT, ROLLBACK, SAVEPOINT',
          ],
          explanation: `The schema is the one part of a database that is expensive to change later, so define it carefully. Types matter more than they seem: store money as an exact \`NUMERIC\`, never as a float (\`0.1 + 0.2\` problems become accounting problems); store timestamps with time zone; use the narrowest integer that will never overflow. **Constraints** are the engine's enforcement of your invariants: \`PRIMARY KEY\` (unique and not null), \`FOREIGN KEY\` (referential integrity), \`NOT NULL\`, \`UNIQUE\`, \`CHECK (amount > 0)\`, and \`DEFAULT\`. Every constraint you declare is a bug class the application can no longer introduce, and a fact the optimiser can exploit. SQLite does not enforce foreign keys unless you \`PRAGMA foreign_keys = ON\`; do it in every connection.

A foreign key needs a **referential action** for when the parent row is deleted: \`RESTRICT\` refuses (safe default), \`CASCADE\` deletes the children (right for owned sub-objects like invoice lines, dangerous for anything shared), \`SET NULL\` detaches. Choose per relationship and write the reason in the schema file.

**Modification** statements are set-oriented: an \`UPDATE\` without \`WHERE\` updates every row. \`INSERT ... SELECT\` bulk-loads from a query; \`DELETE\` and \`UPDATE\` can use subqueries to target rows; **upsert** (\`INSERT ... ON CONFLICT DO UPDATE\`) inserts or updates atomically, replacing the racy select-then-insert pattern. Every modification is checked against every constraint, and a violation aborts the statement.

**Views** are named queries that behave like tables; they give applications a stable interface over a changing schema (logical data independence in practice) and encapsulate access rules. Simple views are updatable; complex ones are read-only.

Finally, **transactions**: \`BEGIN\` ... \`COMMIT\` makes a group of statements atomic (all or nothing) and \`ROLLBACK\` undoes them. Transferring money is two \`UPDATE\`s that must never be separated; the transactions module explains how the engine guarantees it. Read the PostgreSQL DDL chapter on constraints and the tutorial's transactions section, then design and load the schema in the exercises.`,
          resources: [
            {
              title: 'PostgreSQL documentation — 5.5 Constraints',
              url: 'https://www.postgresql.org/docs/current/ddl-constraints.html',
              type: 'documentation',
              cost: 'free',
              provider: 'PostgreSQL',
              primary: true,
            },
            {
              title: 'PostgreSQL documentation — Part I Tutorial: 3.4 Transactions',
              url: 'https://www.postgresql.org/docs/current/tutorial.html',
              type: 'documentation',
              cost: 'free',
              provider: 'PostgreSQL',
            },
            {
              title: 'Python documentation: sqlite3 — DB-API 2.0 interface for SQLite',
              url: 'https://docs.python.org/3/library/sqlite3.html',
              type: 'documentation',
              cost: 'free',
              provider: 'Python Software Foundation',
              note: 'Transaction control, parameter binding (never format SQL strings) and executemany for bulk loads.',
            },
            {
              title: 'PostgreSQL documentation — 14.4 Populating a Database',
              url: 'https://www.postgresql.org/docs/current/populate.html',
              type: 'documentation',
              cost: 'free',
              provider: 'PostgreSQL',
              note: 'Why bulk loads go in one transaction, with COPY, and with indexes created afterwards.',
            },
          ],
          exercises: [
            {
              slug: 'ledger-schema',
              title: 'Design and enforce a ledger schema',
              prompt:
                'Create a schema for accounts, transactions and transaction lines (double-entry: lines of a transaction must sum to zero) with exact NUMERIC amounts, foreign keys with justified referential actions, CHECK constraints and UNIQUE constraints. Write ten modification statements that each violate a different constraint and capture the error messages. Then enforce the sum-to-zero rule: with a trigger in SQLite/PostgreSQL, or explain why a CHECK constraint cannot do it.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'bulk-load-timing',
              title: 'Bulk loading, measured',
              prompt:
                'Generate 10^6 rows and load them into SQLite four ways: one INSERT per autocommit statement, executemany inside one transaction, with indexes created before versus after loading, and with PRAGMA synchronous=OFF. Time each and explain the ratios in terms of fsync per commit and index maintenance per row. Repeat in PostgreSQL with INSERT vs COPY.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'atomic-transfer',
              title: 'Atomic transfer and upsert',
              prompt:
                'Implement transfer(from, to, amount) in Python over sqlite3 as a transaction with a CHECK that balances never go negative. Show that a failure between the two updates (raise an exception deliberately) leaves balances unchanged after ROLLBACK, and that without the transaction it does not. Then implement "record a daily balance snapshot" as an upsert and show it is idempotent.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why should money never be stored as a floating-point type?',
              answerOutline:
                'Binary floats cannot represent most decimal fractions exactly, so sums accumulate rounding error; NUMERIC/DECIMAL stores exact decimals.',
            },
            {
              question: 'When is ON DELETE CASCADE appropriate?',
              answerOutline:
                'When child rows are owned by the parent and meaningless without it (invoice lines, order items); not for shared references where deletion should be refused.',
            },
            {
              question: 'What does an upsert replace, and why is the replaced pattern unsafe?',
              answerOutline:
                'SELECT-then-INSERT-or-UPDATE in application code; between the select and the write another connection can insert the row, causing a duplicate-key error or lost update. Upsert does it atomically.',
            },
          ],
        },
      ],
      project: {
        slug: 'sql-analytics-on-real-data',
        title: 'Module project: answer twenty real questions with SQL',
        description: `Pick a real public dataset with several related tables (e.g. a city's open data on permits and inspections, the NYC taxi sample, or an open bibliographic dataset). Design a schema with constraints, load it into PostgreSQL or SQLite, and write twenty questions a domain expert would ask, each answered with a saved, commented SQL query. At least five must need outer joins, five aggregation with HAVING, and three universal quantification or top-N-per-group. Present the results as a short report.`,
        deliverables: [
          'Schema file with constraints and a loader script that runs from raw files',
          'Twenty saved queries with the question, the SQL, the predicted row count and the result',
          'A two-page report of findings with the three queries that were hardest to get right explained',
        ],
        estimatedHours: 6,
        stretchGoals: ['Load the same data into both SQLite and PostgreSQL and report any query whose results or performance differ'],
      },
    },
    {
      slug: 'advanced-sql-and-design',
      title: 'Advanced SQL and Schema Design',
      description:
        'Entity-relationship modelling, functional dependencies and normalisation, window functions and recursive queries, and indexes and migrations from the application developer\'s point of view.',
      lessons: [
        {
          slug: 'er-modelling-and-schema-design',
          title: 'Entity-relationship modelling and translation to tables',
          summary:
            'Modelling a domain as entities, relationships and attributes with cardinalities, and translating the model mechanically into a relational schema.',
          estimatedMinutes: 90,
          objectives: [
            'Draw an ER diagram with entities, relationships, attributes, keys and cardinality constraints',
            'Model many-to-many relationships, weak entities and ISA hierarchies',
            'Translate an ER diagram into tables with correct keys and foreign keys',
            'Choose between surrogate and natural keys and justify the choice',
          ],
          concepts: [
            'Entity sets, relationship sets, attributes',
            'Cardinality: one-to-one, one-to-many, many-to-many; participation',
            'Weak entities and identifying relationships',
            'ISA / subclass hierarchies and their three translations',
            'Junction (associative) tables',
            'Surrogate vs natural keys',
            'Modelling time: history and effective dates',
          ],
          explanation: `Before a schema there is a **conceptual model**: what things exist in the domain, how they relate, and what constraints hold. The **entity-relationship** model captures this in a diagram that a non-programmer can check, which is its real value: the expensive errors in database design are misunderstandings of the domain, not SQL mistakes.

**Entities** are the things with identity (Customer, Invoice, Track); **attributes** describe them; **relationships** connect them. Each relationship has a **cardinality**: one customer has many invoices (one-to-many); a track appears on many playlists and a playlist has many tracks (many-to-many); each employee has at most one parking space (one-to-one). **Participation** says whether every entity must take part (every invoice has a customer; not every customer has an invoice). A **weak entity** has no key of its own and is identified through its owner (an invoice line is identified by invoice plus line number). **ISA hierarchies** (an Employee is a Person) model subtypes.

Translation to tables is mechanical once the diagram is right. Each entity set becomes a table with its key. A one-to-many relationship becomes a foreign key on the "many" side. A many-to-many relationship becomes a **junction table** whose primary key is the pair of foreign keys (plus any relationship attributes such as the date added). A weak entity's table has a composite key including the owner's key with \`ON DELETE CASCADE\`. An ISA hierarchy has three translations: one table per subtype with the parent's key repeated, one table for the whole hierarchy with nullable columns, or one table per concrete class; choose by how often you query across the hierarchy.

**Keys**: a **natural key** (ISBN, email) carries meaning but can change or turn out not to be unique; a **surrogate key** (auto-increment integer or UUID) is stable and opaque. Most production schemas use surrogates as primary keys and declare the natural key \`UNIQUE\`, getting both. Finally, decide what to do about **time**: many "entities" change, and whether you store only the current state or the full history is a modelling decision that is painful to revisit.

Read the CS186 ER notes and the 15-445 lecture, then model your ledger domain and a second domain in the exercises before writing any DDL.`,
          resources: [
            {
              title: 'Berkeley CS186 notes — Entity-Relationship Diagrams',
              url: 'https://cs186berkeley.net/notes/',
              type: 'textbook',
              cost: 'free',
              provider: 'UC Berkeley',
              primary: true,
            },
            {
              title: 'dbdiagram.io — quick ER and schema diagrams from a text DSL',
              url: 'https://dbdiagram.io/',
              type: 'tool',
              cost: 'freemium',
              provider: 'holistics',
              note: 'Free tier is sufficient; exports to SQL DDL for PostgreSQL and others.',
            },
            {
              title: 'Database System Concepts, 7th edition — Chapter 6: Database Design Using the E-R Model',
              url: 'https://db-book.com/',
              type: 'textbook',
              cost: 'paid',
              provider: 'McGraw-Hill',
              note: 'Optional; the free slides for chapter 6 on the book site cover the notation.',
            },
          ],
          exercises: [
            {
              slug: 'model-two-domains',
              title: 'Model two domains',
              prompt:
                'Draw full ER diagrams for (a) your double-entry ledger with accounts, categories, recurring rules and attachments, and (b) a university with students, courses, sections, instructors, enrolments and grades over multiple terms. Mark every cardinality and participation constraint, identify weak entities and one ISA hierarchy. Then translate both to DDL and load five rows per table to check the keys work.',
              kind: 'writing',
              difficulty: 2,
            },
            {
              slug: 'isa-three-ways',
              title: 'ISA hierarchy three ways',
              prompt:
                'Model Person with subtypes Student and Instructor (some people are both) in the three translations. For each, write the query "all people with their type-specific attributes" and "all instructors teaching this term"; compare query complexity, NULL usage and how a new subtype would be added. Recommend one with a justification.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'history-modelling',
              title: 'Modelling change over time',
              prompt:
                'Products have prices that change. Design the schema two ways: current price only, and a price history with effective-date ranges. Write the query "total revenue by product using the price in effect at each sale date" for the history version, and show the bug the current-price version produces on historical reports. Add a constraint or trigger preventing overlapping date ranges.',
              kind: 'coding',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'How is a many-to-many relationship translated to tables?',
              answerOutline:
                'A junction table with foreign keys to both entity tables, primary key the pair (plus any relationship attributes).',
            },
            {
              question: 'What is a weak entity and how is its key formed?',
              answerOutline:
                'An entity with no key of its own, identified by its owning entity plus a partial key; its table has a composite key including the owner\'s key, usually with cascade delete.',
            },
            {
              question: 'Why use a surrogate primary key even when a natural key exists?',
              answerOutline:
                'Natural keys can change or prove non-unique and are often wide; a surrogate is stable and compact for foreign keys, while the natural key is still enforced with UNIQUE.',
            },
          ],
        },
        {
          slug: 'functional-dependencies-and-normalization',
          title: 'Functional dependencies and normalisation',
          summary:
            'Update anomalies, functional dependencies and closure, BCNF and 3NF decomposition, and when to stop normalising.',
          estimatedMinutes: 110,
          objectives: [
            'Identify insertion, deletion and update anomalies in a schema and trace them to redundancy',
            'Compute attribute closures and candidate keys from a set of functional dependencies',
            'Decompose a relation into BCNF and 3NF, checking lossless join and dependency preservation',
            'Decide when denormalisation is justified and how to protect it',
          ],
          concepts: [
            'Update, insertion and deletion anomalies',
            'Functional dependency X -> Y; Armstrong\'s axioms',
            'Attribute closure X+ and finding keys',
            '1NF, 2NF, 3NF, BCNF definitions',
            'Lossless-join decomposition',
            'Dependency preservation',
            'Denormalisation for read performance',
          ],
          explanation: `A badly designed table stores the same fact in many rows, and redundancy causes **anomalies**: update one copy and not the others (inconsistency), be unable to record a department until it has an employee (insertion anomaly), lose the department's data when its last employee leaves (deletion anomaly). **Normalisation** is the theory of removing redundancy by splitting tables, guided by **functional dependencies**.

A functional dependency $X \\to Y$ says that whenever two rows agree on $X$ they agree on $Y$: $\\text{student\\_id} \\to \\text{name}$. The FDs come from the domain, not from the data you happen to have. From a set of FDs you compute the **closure** $X^+$ of an attribute set (everything $X$ determines, by repeatedly applying FDs); $X$ is a **superkey** if $X^+$ is all attributes, and candidate keys are the minimal ones. This mechanical procedure is how you find keys in a messy legacy table.

The normal forms are conditions on FDs. **BCNF**: for every non-trivial $X \\to Y$, $X$ is a superkey; in words, every fact is determined by a key and nothing else. If some $X \\to Y$ violates it, **decompose**: split into $XY$ and $(R - Y)$, and repeat. This decomposition is always **lossless** (joining the pieces on $X$ recovers exactly the original rows, because $X$ is a key of $XY$), but it may not **preserve dependencies**: an FD that spanned the split can no longer be enforced by a constraint on one table. **3NF** is slightly weaker (it also allows $Y$ to be part of a key) and guarantees a decomposition that is both lossless and dependency-preserving, which is why it is the practical target. 1NF (atomic values) and 2NF (no partial dependencies on a composite key) are steps on the way.

Normalisation optimises for correctness of updates. Read-heavy workloads sometimes **denormalise** (store a precomputed total, duplicate a name) for speed, and that is legitimate *if* the redundancy is maintained by the database (triggers, materialised views) rather than by hope. Read the CS186 notes on FDs and normalisation and do the closure and decomposition exercises by hand; the algorithm must be in your fingers, because real schemas do not come with their FDs labelled.`,
          resources: [
            {
              title: 'Berkeley CS186 notes — Functional Dependencies and Normalization',
              url: 'https://cs186berkeley.net/notes/',
              type: 'textbook',
              cost: 'free',
              provider: 'UC Berkeley',
              primary: true,
            },
            {
              title: 'Wikipedia — Database normalization (with worked examples of each normal form)',
              url: 'https://en.wikipedia.org/wiki/Database_normalization',
              type: 'article',
              cost: 'free',
              provider: 'Wikipedia',
            },
            {
              title: 'Database System Concepts, 7th edition — Chapter 7: Relational Database Design',
              url: 'https://db-book.com/',
              type: 'textbook',
              cost: 'paid',
              provider: 'McGraw-Hill',
              note: 'Optional; the free practice-exercise solutions on the book site include closure and decomposition problems.',
            },
          ],
          exercises: [
            {
              slug: 'closure-and-keys',
              title: 'Closures and keys by hand',
              prompt:
                'For R(A, B, C, D, E, F) with FDs {AB -> C, C -> D, D -> E, E -> A, BF -> A}: compute the closure of AB, of C, of BF; find all candidate keys; determine which FDs violate BCNF and which violate 3NF. Then write a Python function closure(attrs, fds) and candidate_keys(attrs, fds) and verify your hand answers.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'decompose-a-spreadsheet',
              title: 'Normalise a spreadsheet',
              prompt:
                'Take a single wide table of the kind people keep in spreadsheets (e.g. an orders sheet with customer name, address, product name, price, quantity, salesperson, region per row; make one with 200 rows). Write down its FDs from the domain, show three concrete anomalies, decompose to 3NF (and check whether it is BCNF), load the decomposed tables, and prove the decomposition lossless by reconstructing the original with joins and comparing with EXCEPT.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'controlled-denormalisation',
              title: 'Denormalise, then keep it honest',
              prompt:
                'Add a cached account_balance column to your ledger\'s accounts table. Measure the speed-up of the balance query at 10^6 transaction lines. Then make it safe: maintain it with triggers on insert/update/delete of lines, write a consistency check query that compares cached and computed balances, and run a randomised test of 10,000 operations that asserts they never diverge. Compare with a materialised view approach in PostgreSQL.',
              kind: 'coding',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'State the BCNF condition and explain it in words.',
              answerOutline:
                'For every non-trivial FD X -> Y, X is a superkey: every fact in the table is about the whole key, so no fact is stored redundantly across rows.',
            },
            {
              question: 'Why is 3NF often preferred over BCNF in practice?',
              answerOutline:
                'A 3NF decomposition can always be lossless and dependency-preserving; BCNF may require giving up dependency preservation, so some constraints could only be enforced with cross-table checks.',
            },
            {
              question: 'What does lossless join mean and how do you guarantee it when splitting R into R1 and R2?',
              answerOutline:
                'Joining R1 and R2 returns exactly R, no spurious tuples. Guaranteed if the common attributes form a superkey of R1 or of R2.',
            },
          ],
        },
        {
          slug: 'window-functions-ctes-and-recursion',
          title: 'Window functions, common table expressions and recursive queries',
          summary:
            'Ranking, running totals and moving averages without self joins; structuring complex queries with CTEs; and walking hierarchies and graphs with recursive CTEs.',
          estimatedMinutes: 100,
          objectives: [
            'Use window functions (ROW_NUMBER, RANK, LAG, LEAD, SUM OVER) with PARTITION BY, ORDER BY and frames',
            'Solve top-N-per-group, running totals, gaps-and-islands and month-over-month change idiomatically',
            'Structure multi-step queries with CTEs and know when a CTE is materialised',
            'Write recursive CTEs for hierarchies, bill-of-materials and shortest paths',
          ],
          concepts: [
            'Window function: aggregate over a window without collapsing rows',
            'PARTITION BY, ORDER BY, frame (ROWS/RANGE BETWEEN)',
            'ROW_NUMBER vs RANK vs DENSE_RANK; LAG/LEAD; NTILE',
            'Common table expressions (WITH)',
            'Materialisation vs inlining of CTEs',
            'Recursive CTE: anchor, recursive step, termination',
            'Cycle detection in recursive queries',
          ],
          explanation: `**Window functions** compute an aggregate or ranking over a set of rows related to the current row *without* collapsing the rows the way \`GROUP BY\` does. \`SUM(amount) OVER (PARTITION BY account ORDER BY date)\` gives a running balance per account on every row. The window is defined by three parts: \`PARTITION BY\` splits rows into independent groups, \`ORDER BY\` orders within the partition, and the **frame** (\`ROWS BETWEEN 6 PRECEDING AND CURRENT ROW\`) selects which ordered rows feed the function, defaulting to "start of partition to current row" when \`ORDER BY\` is present. Ranking functions (\`ROW_NUMBER\`, \`RANK\`, \`DENSE_RANK\`) differ in how ties are numbered; \`LAG\` and \`LEAD\` read the previous or next row, which turns "month-over-month change" into one query. Top-N-per-group, which was painful with subqueries, is \`ROW_NUMBER() OVER (PARTITION BY group ORDER BY score DESC)\` filtered to $\\le N$ in an outer query, because window functions are evaluated after \`WHERE\` and cannot be filtered directly.

**Common table expressions** (\`WITH name AS (...)\`) name intermediate results so a long query reads top-down as a pipeline instead of inside-out as nested subqueries. They are mostly a readability tool, but note the engine's behaviour: PostgreSQL inlines CTEs referenced once (since version 12) and materialises those referenced more than once or marked \`MATERIALIZED\`, which can block predicate push-down; check \`EXPLAIN\` when a CTE query is slow.

A **recursive CTE** iterates: an **anchor** query produces the first rows, the **recursive step** joins the result so far to produce more, and it stops when a step produces nothing. That walks an employee-manager hierarchy to any depth, explodes a bill of materials, or finds all nodes reachable from a vertex, with the graph stored as an edge table. Cycles make it loop forever unless you carry the path (an array) and stop when a node repeats, or use the \`CYCLE\` clause where supported. The cost is one join per level, so a long chain is slow, which is why hierarchies are sometimes stored as materialised paths or nested sets instead.

Read the PostgreSQL window and WITH chapters (SQLite supports both too), then do the exercises on Chinook and the ledger.`,
          resources: [
            {
              title: 'PostgreSQL documentation — Tutorial 3.5 Window Functions',
              url: 'https://www.postgresql.org/docs/current/tutorial-window.html',
              type: 'documentation',
              cost: 'free',
              provider: 'PostgreSQL',
              primary: true,
            },
            {
              title: 'PostgreSQL documentation — 7.8 WITH Queries (Common Table Expressions)',
              url: 'https://www.postgresql.org/docs/current/queries-with.html',
              type: 'documentation',
              cost: 'free',
              provider: 'PostgreSQL',
              note: 'Includes recursive queries, cycle detection and the materialisation rules.',
            },
            {
              title: 'CMU 15-445 (Fall 2024) — Lecture 2: Modern SQL (window functions, CTEs)',
              url: 'https://15445.courses.cs.cmu.edu/fall2024/schedule.html',
              type: 'lecture',
              cost: 'free',
              provider: 'Carnegie Mellon University',
            },
            {
              title: 'PostgreSQL Exercises — Aggregates section (window function problems)',
              url: 'https://pgexercises.com/',
              type: 'interactive',
              cost: 'free',
              provider: 'pgexercises.com',
            },
          ],
          exercises: [
            {
              slug: 'window-idioms',
              title: 'The window function idioms',
              prompt:
                'On the ledger (10^5 transactions) write: running balance per account; 7-day moving average of daily spend; top 3 expenses per month per category with RANK (show how ties differ from ROW_NUMBER); month-over-month percentage change with LAG; gaps-and-islands: find streaks of consecutive days with at least one transaction. Then rewrite the running balance with a correlated subquery and compare EXPLAIN ANALYZE timings.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'recursive-hierarchies',
              title: 'Recursive CTEs for hierarchies and graphs',
              prompt:
                'Model account categories as a tree (parent_id). Write recursive CTEs for: the full path of each category as a string; total spend per category including all descendants; the depth of each node. Then store a directed graph of 10^4 edges and compute all nodes reachable from a source with their shortest hop count; introduce a cycle and show the infinite loop, then fix it with a visited path array or CYCLE clause.',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'cte-materialisation',
              title: 'When a CTE hurts',
              prompt:
                'In PostgreSQL write a query with a CTE over a 10^6-row table that is referenced twice and then filtered on an indexed column in the outer query. Compare EXPLAIN ANALYZE for the default behaviour, WITH ... AS MATERIALIZED, WITH ... AS NOT MATERIALIZED, and a rewrite with a subquery. Explain the difference in terms of predicate push-down.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'How does a window function differ from GROUP BY?',
              answerOutline:
                'It computes a value over a set of related rows but returns one output per input row, keeping the detail; GROUP BY collapses each group to one row.',
            },
            {
              question: 'Why can you not put a window function in a WHERE clause?',
              answerOutline:
                'Window functions are evaluated after WHERE (and GROUP BY/HAVING); filter on them in an outer query or CTE.',
            },
            {
              question: 'What are the parts of a recursive CTE and how does it terminate?',
              answerOutline:
                'An anchor query, UNION (ALL) with a recursive step referencing the CTE; it repeats until a step returns no new rows. Cycles must be broken explicitly or it never terminates.',
            },
          ],
        },
        {
          slug: 'indexes-and-migrations-for-developers',
          title: 'Indexes and schema migrations from the developer\'s side',
          summary:
            'Which indexes to create and why, reading EXPLAIN to check they are used, composite and covering indexes, and evolving a schema safely in production.',
          estimatedMinutes: 100,
          objectives: [
            'Create indexes that match query predicates and ORDER BY, and verify use with EXPLAIN',
            'Explain column order in composite indexes, covering indexes and partial indexes',
            'Recognise queries that defeat indexes (functions on columns, leading wildcards, type mismatches)',
            'Write backward-compatible schema migrations and run them without downtime',
          ],
          concepts: [
            'Index as a sorted structure over chosen columns',
            'Selectivity and when a scan beats an index',
            'Composite index column order; leftmost-prefix rule',
            'Covering (index-only) scans',
            'Partial and expression indexes',
            'Index write cost and bloat',
            'Expand-contract migrations; online index creation',
          ],
          explanation: `An **index** is a separate sorted (or hashed) structure over one or more columns that lets the engine find matching rows without scanning the table; the next module builds one. From the developer's side, the questions are which indexes to create and how to tell whether they are used.

Index the columns that queries **filter, join or order** on. The engine uses an index when the predicate is **selective** enough that reading a few index entries plus the matching rows is cheaper than scanning everything; for a predicate matching 30 percent of a table a sequential scan usually wins, and the planner knows it from statistics. A **composite index** on (a, b, c) is sorted by a, then b, then c, so it serves predicates on a, on a and b, and on all three (the **leftmost-prefix rule**) but not on b alone; put the equality columns first and the range or sort column last. A **covering index** includes every column the query needs, so the engine never touches the table (an **index-only scan**). A **partial index** indexes only rows matching a predicate (open orders only) and an **expression index** indexes a computed value (\`lower(email)\`).

Queries defeat indexes by hiding the column: \`WHERE lower(email) = ...\` without an expression index, \`WHERE date_col + 1 = ...\`, \`LIKE '%term'\`, comparing an integer column to a string. \`EXPLAIN\` is how you check; \`EXPLAIN ANALYZE\` runs the query and shows actual row counts, and a large gap between estimated and actual rows means stale statistics.

Indexes are not free: every write must update every index, and a table with ten indexes inserts several times slower. Index for the queries you have, and drop indexes nobody uses.

**Migrations** change a schema that is already in production. The rule is **expand-contract**: add the new column or table (backward compatible), deploy code that writes both old and new, backfill, switch reads, then remove the old. Never rename or drop in the same step as the code change, and know which operations take a long lock (\`ALTER TABLE ... ADD COLUMN\` with a volatile default; rewriting a column type) versus which are online (\`CREATE INDEX CONCURRENTLY\`). Keep migrations in version control, numbered, with Alembic or a similar tool. Read "Use The Index, Luke" (the anatomy and where-clause chapters) and the PostgreSQL index chapter, then do the EXPLAIN experiments.`,
          resources: [
            {
              title: 'Use The Index, Luke — SQL indexing and tuning for developers',
              url: 'https://use-the-index-luke.com/',
              type: 'textbook',
              cost: 'free',
              provider: 'Markus Winand',
              note: 'Read "Anatomy of an SQL Index" and "The Where Clause" in full.',
              primary: true,
            },
            {
              title: 'PostgreSQL documentation — Chapter 11: Indexes',
              url: 'https://www.postgresql.org/docs/current/indexes.html',
              type: 'documentation',
              cost: 'free',
              provider: 'PostgreSQL',
              note: 'Multicolumn, index-only, partial and expression indexes; examining index usage.',
            },
            {
              title: 'PostgreSQL documentation — 14.1 Using EXPLAIN',
              url: 'https://www.postgresql.org/docs/current/using-explain.html',
              type: 'documentation',
              cost: 'free',
              provider: 'PostgreSQL',
            },
            {
              title: 'SQLite documentation — Query Planning',
              url: 'https://www.sqlite.org/queryplanner.html',
              type: 'documentation',
              cost: 'free',
              provider: 'SQLite',
              note: 'The clearest short explanation of how an index turns a scan into a binary search.',
            },
            {
              title: 'Alembic — database migrations for SQLAlchemy',
              url: 'https://alembic.sqlalchemy.org/en/latest/',
              type: 'tool',
              cost: 'free',
              provider: 'SQLAlchemy',
            },
          ],
          exercises: [
            {
              slug: 'explain-experiments',
              title: 'EXPLAIN experiments',
              prompt:
                'On a 10^6-row transactions table in PostgreSQL, for each of eight queries (equality on account, range on date, account and date range, ORDER BY date LIMIT 10, lower(description) = ..., description LIKE \'%x\', a join to accounts, an aggregate per account) record EXPLAIN ANALYZE before and after adding the right index, with timings. Demonstrate the leftmost-prefix rule with a composite index, an index-only scan with a covering index, and a case where the planner correctly refuses to use an index because the predicate matches most rows.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'index-write-cost',
              title: 'Measure index write cost',
              prompt:
                'Insert 10^6 rows into a table with 0, 1, 3 and 6 indexes and time each run. Then measure the size of each index with pg_relation_size (or the SQLite file size). Delete half the rows and measure again; explain index bloat and what VACUUM does about it. Write a query against pg_stat_user_indexes to find indexes that have never been used.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'zero-downtime-migration',
              title: 'Expand-contract migration',
              prompt:
                'Your ledger stores a category as a text column; migrate to a categories table with a foreign key without downtime, using Alembic migrations: add table and nullable column, dual-write in the application, backfill in batches of 1000 with progress, add the NOT NULL and FK constraints (NOT VALID then VALIDATE in PostgreSQL), switch reads, drop the old column. Run a client in a loop during the whole migration and show it never fails.',
              kind: 'coding',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does an index on (a, b) not help a query filtering only on b?',
              answerOutline:
                'The index is sorted by a first; entries with a given b are scattered throughout, so no range of the index corresponds to the predicate (leftmost-prefix rule).',
            },
            {
              question: 'What is an index-only scan and what makes it possible?',
              answerOutline:
                'Answering the query from the index alone without visiting the table; possible when the index contains every column the query reads (a covering index) and visibility can be confirmed.',
            },
            {
              question: 'What is the expand-contract pattern?',
              answerOutline:
                'Make additive, backward-compatible schema changes first, migrate code and data while both shapes coexist, then remove the old structure in a later step; never break running code with a single destructive change.',
            },
          ],
          relatedLessons: ['data-structures-algorithms/trees-and-heaps/b-trees-and-external-memory'],
        },
      ],
      project: {
        slug: 'schema-and-tuning-review',
        title: 'Module project: design, load, tune',
        description: `Design a normalised schema for a domain with at least eight entities and two many-to-many relationships (a library, a clinic, a ticketing system). Load it with a generated dataset of at least 10^6 rows in the largest table. Write ten representative application queries, measure them, add the minimal set of indexes that makes every query meet a stated latency target, and document each index with the query it serves and its measured effect. Then write one expand-contract migration that changes a core table and run it against the loaded database.`,
        deliverables: [
          'ER diagram, FD list, 3NF/BCNF justification and DDL with constraints',
          'Data generator and loader; ten queries with EXPLAIN ANALYZE before and after indexing',
          'A tuning report: index list, targets, measurements, and write-cost trade-off',
          'A migration script with the dual-write and backfill steps',
        ],
        estimatedHours: 8,
        stretchGoals: ['Add window-function reporting queries and tune them with covering indexes'],
      },
    },
    {
      slug: 'storage-and-indexing',
      title: 'Storage and Indexing',
      description:
        'Inside the engine: how tuples are laid out in disk pages, how the buffer pool mediates between disk and memory, and how B+ tree, hash and log-structured indexes find data.',
      lessons: [
        {
          slug: 'disk-files-pages-and-tuples',
          title: 'Disks, files, pages and tuple layout',
          summary:
            'Why databases manage their own pages instead of trusting the OS, the slotted-page layout, record formats, and the cost model that counts page I/Os.',
          estimatedMinutes: 100,
          objectives: [
            'Explain the storage hierarchy and why sequential I/O and page granularity dominate database design',
            'Describe the slotted-page layout and how it supports variable-length records and stable record IDs',
            'Compare heap files, sorted files and the page directory / linked list organisations',
            'Read a real SQLite database file with a hex viewer and identify its pages and cells',
          ],
          concepts: [
            'Storage hierarchy: cache, DRAM, SSD, disk; latency ratios',
            'Page (block) as the unit of I/O; 4-16 KB',
            'Why not mmap: the DBMS knows better than the OS',
            'Slotted pages: header, slot array, free space, tuples',
            'Record ID (page, slot) and indirection',
            'Fixed vs variable length fields; NULL bitmaps; overflow pages',
            'Heap file organisation: page directory',
          ],
          explanation: `A database's job is to make data that lives on slow, block-oriented storage look like it is in fast, byte-addressable memory. The gap is enormous: DRAM access is tens of nanoseconds, an SSD read is tens of microseconds, a spinning disk seek is milliseconds. And storage delivers data in **pages** of 4-16 KB, so the cost model that matters is *pages read and written*, not bytes or comparisons. Every structure in this module is designed around that fact.

Databases manage their own **buffer pool** rather than relying on the operating system's page cache or \`mmap\`, because the DBMS knows things the OS cannot: which pages a scan will need next, which page must reach disk before another (write-ahead logging), and which pages are worthless after a single use. The OS evicts the wrong pages and flushes dirty ones at the wrong time; the \`mmap\` route has burned several real systems.

Inside a page, tuples are laid out with a **slotted page**: a header, an array of **slots** growing from the front that hold the offset and length of each tuple, and tuples growing from the back, with free space in the middle. A tuple's **record ID** is (page, slot), and because the slot array indirects, a tuple can be moved within its page during compaction without changing its ID, which is what every index points to. Tuples themselves have a header (null bitmap, visibility info for MVCC), fixed-length fields, then variable-length fields with offsets; a value too large for a page goes to **overflow pages** (PostgreSQL's TOAST).

Pages are collected into **files**. A **heap file** holds tuples in no particular order, tracked by a **page directory** or linked list that records free space per page; it is the default table organisation in PostgreSQL. A **sorted file** supports range scans but makes inserts expensive; index-organised tables (SQLite, MySQL InnoDB) store the whole table inside a B+ tree on the primary key.

SQLite's file format documentation is the best way to make this concrete: every page type and cell format is specified, and you can open a database in a hex editor and find your rows. Read the 15-445 storage lectures and the SQLite file format page, then do the hex-dump exercise before writing your own page layout.`,
          resources: [
            {
              title: 'CMU 15-445 (Fall 2024) — Lectures 3-5: Database Storage I and II, Storage Models',
              url: 'https://15445.courses.cs.cmu.edu/fall2024/schedule.html',
              type: 'lecture',
              cost: 'free',
              provider: 'Carnegie Mellon University',
              note: 'Slotted pages, log-structured storage, tuple layout, row vs column stores.',
              primary: true,
            },
            {
              title: 'SQLite documentation — Database File Format',
              url: 'https://www.sqlite.org/fileformat.html',
              type: 'documentation',
              cost: 'free',
              provider: 'SQLite',
              note: 'Sections 1-2: the header, page types, B-tree page and cell formats, record format.',
            },
            {
              title: 'PostgreSQL documentation — 66.6 Database Page Layout',
              url: 'https://www.postgresql.org/docs/current/storage-page-layout.html',
              type: 'documentation',
              cost: 'free',
              provider: 'PostgreSQL',
              note: 'The slotted-page layout of a real system, with the page header and item pointer formats.',
            },
            {
              title: 'Berkeley CS186 notes — Disks, Buffers, Files',
              url: 'https://cs186berkeley.net/notes/',
              type: 'textbook',
              cost: 'free',
              provider: 'UC Berkeley',
            },
          ],
          exercises: [
            {
              slug: 'hex-dump-sqlite',
              title: 'Read a SQLite file by hand',
              prompt:
                'Create a SQLite database with one table of five rows (an integer, a short text, a longer text). Open the file in a hex viewer. Using the file format document, locate and annotate: the 100-byte header fields (page size, page count), the table B-tree leaf page header, the cell pointer array, and each record with its header varints and values. Then insert a 10 KB text value and find the overflow page chain.',
              kind: 'reading',
              difficulty: 2,
            },
            {
              slug: 'slotted-page',
              title: 'Implement a slotted page',
              prompt:
                'Implement a 4 KB slotted page in Python (bytearray) or C with insert(tuple_bytes) -> slot, get(slot), delete(slot), update(slot, bytes) and compact(). Record IDs must remain stable across compaction. Write property tests (random insert/delete/update sequences compared against a dict) and measure how many 100-byte tuples fit before and after compaction following 50 percent deletes.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'io-cost-model',
              title: 'Sequential versus random page I/O, measured',
              prompt:
                'Write a 2 GB file of 4 KB pages. Measure time to read all pages sequentially, to read 10,000 random pages, and to read the same 10,000 random pages sorted by offset, using os.pread with the OS cache dropped between runs (or O_DIRECT). Compute the effective pages per second for each and compare with the latency figures from the lesson. Explain what this implies for a query that must fetch 1 percent of a table\'s rows via an index.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why do databases avoid mmap for their storage?',
              answerOutline:
                'The OS controls eviction and write-back without knowing query access patterns or the ordering constraints of write-ahead logging; the DBMS cannot guarantee a page is on disk when needed, and page faults stall threads unpredictably.',
            },
            {
              question: 'What does the slot array in a slotted page provide?',
              answerOutline:
                'Indirection: record IDs are (page, slot) and remain valid when tuples are moved during compaction, and it supports variable-length tuples.',
            },
            {
              question: 'Why is the number of page I/Os the right cost measure?',
              answerOutline:
                'A page read from storage costs orders of magnitude more than any in-memory work on its contents, so I/O count dominates total time for data larger than memory.',
            },
          ],
          relatedLessons: ['operating-systems/persistence/io-devices-and-disks'],
        },
        {
          slug: 'buffer-pool-management',
          title: 'Buffer pool management',
          summary:
            'The cache between disk and the rest of the engine: page tables, pinning, dirty pages, replacement policies and why LRU is not enough.',
          estimatedMinutes: 100,
          objectives: [
            'Describe the buffer pool data structures: frames, page table, pin counts, dirty flags',
            'Implement LRU, clock and LRU-K replacement and measure hit rates on realistic access patterns',
            'Explain sequential flooding and why scans need special treatment',
            'Connect the buffer pool to write-ahead logging: when a dirty page may be written',
          ],
          concepts: [
            'Frames and the page table (page id -> frame)',
            'Pin/unpin and the pin count',
            'Dirty pages and write-back',
            'LRU, clock, LRU-K, 2Q',
            'Sequential flooding',
            'Scan-resistant and priority hints',
            'Prefetching and scan sharing',
            'Buffer pool size vs OS cache; direct I/O',
          ],
          explanation: `The **buffer pool** is an array of memory **frames**, each able to hold one page, plus a **page table** mapping page IDs to frames. Every other component asks the buffer pool for a page, uses it, and releases it; nobody touches disk directly. When a requested page is not resident, the pool picks a frame to **evict**, writes it back if **dirty**, reads the new page in, and returns it. While a component holds a page it **pins** it (increments a pin count) so it cannot be evicted mid-use; forgetting to unpin is the classic bug, and the pool must never evict a pinned frame.

The **replacement policy** decides what to evict, and it determines the hit rate, which determines performance. **LRU** evicts the least recently used page; it needs a timestamp or list update per access and has a specific pathology: **sequential flooding**. A single full-table scan touches every page once, and under LRU those pages, which will never be used again, evict the hot index pages that will. The **clock** algorithm approximates LRU with one reference bit per frame and a sweeping hand, at much lower cost, but shares the pathology. **LRU-K** tracks the last $K$ access times and evicts the page whose $K$-th most recent access is oldest; a page touched once by a scan has no second access and is evicted first, so hot pages survive. Variants (2Q, ARC, PostgreSQL's clock-sweep with usage counts) all aim at the same scan resistance. The engine also helps: a scan can mark its pages as "evict me first", several scans can **share** a pass over the table, and an index scan can **prefetch** the leaf pages it is about to need.

Dirty pages and **recovery** interact: a dirty page may be written to disk at any time *only if* the log records describing its changes are already durable (the write-ahead rule), and the checkpointing lesson in the recovery module relies on the pool exposing its dirty-page table.

Sizing is a real decision: giving the pool most of RAM and using direct I/O avoids double caching with the OS. CMU's project 1 is exactly this component; implement it with the policies in the exercises and measure them on traces that mix scans and point lookups, where the differences are dramatic.`,
          resources: [
            {
              title: 'CMU 15-445 (Fall 2024) — Lecture 6: Memory and Disk I/O Management (buffer pools)',
              url: 'https://15445.courses.cs.cmu.edu/fall2024/schedule.html',
              type: 'lecture',
              cost: 'free',
              provider: 'Carnegie Mellon University',
              primary: true,
            },
            {
              title: 'CMU 15-445 (Fall 2024) — Project 1: Buffer Pool Manager',
              url: 'https://15445.courses.cs.cmu.edu/fall2024/project1/',
              type: 'problem-set',
              cost: 'free',
              provider: 'Carnegie Mellon University',
              note: 'The specification is public and is the best guide to what a buffer pool must do; the BusTub code is on GitHub.',
            },
            {
              title: 'Berkeley CS186 notes — Buffer Management',
              url: 'https://cs186berkeley.net/notes/',
              type: 'textbook',
              cost: 'free',
              provider: 'UC Berkeley',
            },
            {
              title: 'Hellerstein, Stonebraker, Hamilton — Architecture of a Database System (2007)',
              url: 'https://dsf.berkeley.edu/papers/fntdb07-architecture.pdf',
              type: 'article',
              cost: 'free',
              provider: 'Foundations and Trends in Databases',
              note: 'Section 4.3 on the buffer pool and the survey of the whole architecture; a reference for this entire subject.',
            },
          ],
          exercises: [
            {
              slug: 'buffer-pool',
              title: 'Build a buffer pool with three policies',
              prompt:
                'Implement BufferPool(frames, disk, policy) with fetch_page(pid) -> pinned page, unpin(pid, dirty), flush(pid) and flush_all, over a disk manager that reads and writes 4 KB pages to a file and counts I/Os. Implement LRU, clock and LRU-K (K=2) replacement. Property-test that a pinned page is never evicted and that every dirty page eventually reaches disk. Report I/O counts for 10^5 operations on a trace of 80/20 skewed point reads with 64 frames over a 1000-page file.',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'sequential-flooding',
              title: 'Demonstrate sequential flooding',
              prompt:
                'Generate a trace that interleaves hot point lookups on 50 pages with periodic full scans of a 5000-page table. Run it through your pool with 100 frames under LRU, clock and LRU-K and plot the hit rate of the point lookups over time. Explain the LRU collapse during scans and why LRU-K recovers. Add a scan hint (unpin with "evict first") and show it fixes LRU too.',
              kind: 'simulation',
              difficulty: 2,
            },
            {
              slug: 'pool-size-experiment',
              title: 'Hit rate versus pool size',
              prompt:
                'For a Zipf-distributed access pattern over 10^5 pages, measure hit rate for pool sizes of 1, 2, 5, 10, 20 and 50 percent of the data under LRU-K. Plot it, identify the knee, and relate it to the PostgreSQL shared_buffers guidance. Then check PostgreSQL itself: run a workload with pg_stat_statements or pg_buffercache and report its buffer hit ratio for two shared_buffers settings.',
              kind: 'data-analysis',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why must a frame be pinned while in use?',
              answerOutline:
                'Otherwise the replacement policy could evict and overwrite the frame while a component still holds a pointer into it, corrupting reads and writes.',
            },
            {
              question: 'What is sequential flooding and which policy resists it?',
              answerOutline:
                'A large scan evicts the entire hot working set from an LRU cache with pages that will not be reused. LRU-K (or 2Q/ARC) evicts pages seen only once before pages with a history of reuse.',
            },
            {
              question: 'When may the buffer pool write a dirty page to disk?',
              answerOutline:
                'Any time, provided the log records for the changes on that page have already been forced to disk (write-ahead logging rule); the pool must coordinate with the log manager.',
            },
          ],
        },
        {
          slug: 'b-plus-tree-indexes',
          title: 'B+ tree indexes',
          summary:
            'The index structure behind almost every database: node layout on pages, search, insertion with splits, deletion with merges, range scans, and concurrent access with latch crabbing.',
          estimatedMinutes: 120,
          objectives: [
            'Describe B+ tree node layout on a page and compute fan-out and height for given key and page sizes',
            'Implement search, insert with split and delete with borrow/merge on page-backed nodes',
            'Support range scans through sibling pointers and explain clustered versus unclustered indexes',
            'Explain latch crabbing for safe concurrent reads and writes',
          ],
          concepts: [
            'Inner nodes with separator keys; leaves with key/value or key/record-id pairs',
            'Fan-out, occupancy, height',
            'Split on insert; borrow or merge on delete',
            'Sibling pointers and range scans',
            'Clustered vs unclustered; index-organised tables',
            'Duplicate keys and composite keys; prefix compression',
            'Latch crabbing / coupling; optimistic descent',
            'Bulk loading a B+ tree',
          ],
          explanation: `You met B-trees as an algorithmic structure in the data structures subject; here it becomes a real index living in pages served by the buffer pool. A **B+ tree** stores **separator keys** in inner nodes and all **key/value pairs in leaves**, where the value is either the record ID of the tuple in the heap file (an **unclustered** or secondary index) or the tuple itself (a **clustered** index or index-organised table, as in SQLite and InnoDB). Leaves are linked to their siblings so a **range scan** descends once and then walks leaves sequentially. Each node is one page; with 8 KB pages and 16-byte entries the fan-out is around 500, so a billion keys fit in a tree of height 4, of which the top levels are always in the buffer pool. A point lookup costs about one disk read.

**Search** descends by binary search within each node. **Insert** descends to the leaf; if the leaf is full it **splits** in half and the middle key is copied up as a separator (copied, not moved, because leaves keep all keys); if the parent fills, it splits too, and a root split adds a level. **Delete** removes from the leaf and, if the leaf falls below half full, **borrows** from a sibling or **merges** with it, removing a separator from the parent. Real systems often skip merging and let underfull nodes persist, which is simpler and works because deletes are usually followed by inserts. **Duplicate keys** are handled by appending the record ID to the key to make it unique. **Bulk loading** sorts the data and builds leaves left to right, far faster than repeated inserts, and leaves nodes exactly as full as you choose.

Concurrency is the hard part. Readers and writers share the tree, so each node has a **latch**. **Latch crabbing** takes the latch on a child before releasing the parent, and a writer releases all ancestor latches once it reaches a node that is "safe" (will not split or merge). Optimistic variants descend with read latches assuming no split and retry if wrong. Get this wrong and a reader follows a pointer into a node that has just been split.

Read the 15-445 B+ tree lectures and the PostgreSQL B-tree implementation chapter, then build the tree on top of your buffer pool; CMU's project 2 is the model.`,
          resources: [
            {
              title: 'CMU 15-445 (Fall 2024) — Lectures 7-9: Hash Tables, B+Tree Index, Index Concurrency Control',
              url: 'https://15445.courses.cs.cmu.edu/fall2024/schedule.html',
              type: 'lecture',
              cost: 'free',
              provider: 'Carnegie Mellon University',
              primary: true,
            },
            {
              title: 'CMU 15-445 (Fall 2024) — Project 2: B+Tree',
              url: 'https://15445.courses.cs.cmu.edu/fall2024/project2/',
              type: 'problem-set',
              cost: 'free',
              provider: 'Carnegie Mellon University',
            },
            {
              title: 'PostgreSQL documentation — 65.1 B-Tree Indexes (implementation chapter)',
              url: 'https://www.postgresql.org/docs/current/btree.html',
              type: 'documentation',
              cost: 'free',
              provider: 'PostgreSQL',
              note: 'How a production B-tree handles duplicates, deduplication and the Lehman-Yao concurrency scheme.',
            },
            {
              title: 'Open Data Structures — Chapter 14: External Memory Searching',
              url: 'https://opendatastructures.org/ods-python/14_External_Memory_Searchin.html',
              type: 'textbook',
              cost: 'free',
              provider: 'Pat Morin',
              note: 'The algorithmic treatment if you want a refresher before the systems view.',
            },
          ],
          exercises: [
            {
              slug: 'page-backed-b-plus-tree',
              title: 'B+ tree on the buffer pool',
              prompt:
                'Implement a B+ tree whose nodes are 4 KB pages fetched through your buffer pool, with fixed-size integer keys and record-ID values: search, insert with split, delete with borrow/merge, and a range iterator over leaf siblings. Verify invariants (ordering, occupancy, uniform leaf depth, sibling links) after every operation in tests. Insert 10^6 random keys and report height, average occupancy, and page I/Os per lookup with 64 and 1024 frames.',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'bulk-load-vs-insert',
              title: 'Bulk load versus repeated insert',
              prompt:
                'Build the tree from 10^6 sorted keys by bulk loading (fill leaves to 100 percent, then 70 percent) and by repeated insert in random and in sorted order. Compare build time, page count, height and subsequent random-insert cost for the 100 percent-full version (expect many splits). Explain why PostgreSQL leaves leaf pages partly empty after a sorted build (fillfactor).',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'latch-crabbing',
              title: 'Concurrent B+ tree with latch crabbing',
              prompt:
                'Add per-page reader-writer latches and implement latch crabbing for search, insert and delete. Run 8 threads performing mixed operations on a shared tree for 10^6 operations and check invariants afterwards and that every inserted key not deleted is findable. Then remove the crabbing (release the parent before latching the child) and demonstrate a failure (a lost key or crash) under contention. Measure throughput with coarse tree-level locking versus crabbing.',
              kind: 'coding',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'Why are keys copied up, not moved up, when a leaf splits?',
              answerOutline:
                'Leaves must contain every key (the data lives there and range scans walk the leaves); inner nodes hold separators only, so the split key is duplicated as a separator.',
            },
            {
              question: 'What is the difference between a clustered and an unclustered index for a range query?',
              answerOutline:
                'A clustered index stores tuples in key order (in or beside the leaves), so a range is a sequential read; an unclustered index yields record IDs scattered across the heap, costing a random page read per match.',
            },
            {
              question: 'What makes a node "safe" in latch crabbing and why can ancestors then be released?',
              answerOutline:
                'For insert: not full (will not split); for delete: more than half full (will not merge). A safe node absorbs any change below it, so no ancestor will be modified and their latches are unnecessary.',
            },
          ],
          relatedLessons: ['data-structures-algorithms/trees-and-heaps/b-trees-and-external-memory'],
        },
        {
          slug: 'hash-indexes-and-log-structured-storage',
          title: 'Hash indexes, log-structured storage and LSM trees',
          summary:
            'Static and extendible hashing for equality lookups, and the write-optimised alternative to B+ trees: append-only logs, SSTables, compaction and Bloom filters.',
          estimatedMinutes: 100,
          objectives: [
            'Compare hash indexes with B+ trees and state which queries each can serve',
            'Explain extendible and linear hashing and why static hashing fails under growth',
            'Describe the LSM tree: memtable, SSTables, levels, compaction, and the read and write amplification trade-offs',
            'Implement a Bitcask-style log-structured key-value store with an in-memory hash index',
          ],
          concepts: [
            'Hash index: equality only, no range',
            'Static hashing and overflow pages',
            'Extendible hashing: global/local depth, directory doubling',
            'Linear hashing',
            'Log-structured storage: append-only writes',
            'LSM tree: memtable, SSTable, levels, compaction',
            'Write, read and space amplification',
            'Bloom filters to skip SSTables',
          ],
          explanation: `A **hash index** maps a key through a hash function to a bucket page holding (key, record ID) pairs. Equality lookups cost one or two page reads regardless of size, better than a B+ tree's three or four, but a hash index cannot answer range queries, prefix queries or ordered scans, which is why B+ trees are the default and hash indexes are used for specific equality-only workloads (PostgreSQL supports them; most of the engine's *internal* hash tables for joins and aggregation are the bigger use).

**Static hashing** with a fixed number of buckets degrades as data grows: buckets overflow into chains and lookups become linear. **Extendible hashing** fixes this with a directory of pointers indexed by the first $g$ bits of the hash (**global depth**); each bucket has a **local depth** and, when it overflows, splits into two buckets using one more bit, doubling the directory only when local depth exceeds global. **Linear hashing** avoids the directory by splitting buckets in a fixed round-robin order, so growth is incremental and smooth. Both keep lookups at one or two I/Os as the data grows.

B+ trees pay for every insert with an in-place page write at a random location, which is expensive on disks and wears SSDs. **Log-structured storage** instead *appends* every write to a sequential log and keeps an index of where each key's latest value lives. The simplest form is **Bitcask**: an append-only file plus an in-memory hash map from key to file offset; reads are one seek, writes are sequential, and a background **compaction** rewrites the log without dead values. It needs all keys in memory, and gives no range queries.

The **LSM tree** (LevelDB, RocksDB, Cassandra, and the storage engine under many modern systems) generalises this with sorted structures. Writes go to an in-memory **memtable** (a skip list or balanced tree) and a write-ahead log; when full, the memtable is flushed as an immutable sorted file, an **SSTable**. SSTables accumulate in **levels**, and **compaction** merges them to remove overwritten and deleted keys (tombstones) and keep each level sorted and bounded. A read checks the memtable, then each level's candidate SSTables, using **Bloom filters** to skip files that cannot contain the key. The trade-off is explicit: LSM trees have low **write amplification** and sequential I/O but higher **read amplification** and background compaction cost; B+ trees are the reverse. Read the 15-445 hash tables lecture, the Bitcask paper and the RocksDB wiki overview, then build Bitcask and a mini LSM tree and measure the trade-off yourself.`,
          resources: [
            {
              title: 'CMU 15-445 (Fall 2024) — Lecture 7: Hash Tables; Lecture 4: Database Storage II (log-structured storage)',
              url: 'https://15445.courses.cs.cmu.edu/fall2024/schedule.html',
              type: 'lecture',
              cost: 'free',
              provider: 'Carnegie Mellon University',
              primary: true,
            },
            {
              title: 'Bitcask: A Log-Structured Hash Table for Fast Key/Value Data (Riak)',
              url: 'https://riak.com/assets/bitcask-intro.pdf',
              type: 'article',
              cost: 'free',
              provider: 'Basho / Riak',
              note: 'Six pages; the entire design fits in your head and in an afternoon of code.',
            },
            {
              title: 'RocksDB Wiki — overview of the LSM-tree storage engine',
              url: 'https://github.com/facebook/rocksdb/wiki',
              type: 'documentation',
              cost: 'free',
              provider: 'Meta / RocksDB',
              note: 'Read "RocksDB Overview", "Leveled Compaction" and "RocksDB Bloom Filter".',
            },
            {
              title: 'Berkeley CS186 notes — Hashing (static and extendible)',
              url: 'https://cs186berkeley.net/notes/',
              type: 'textbook',
              cost: 'free',
              provider: 'UC Berkeley',
            },
          ],
          exercises: [
            {
              slug: 'extendible-hashing',
              title: 'Extendible hash index on pages',
              prompt:
                'Implement an extendible hash index over your buffer pool: a directory page and bucket pages with local depth, supporting insert, lookup and delete, with bucket splits and directory doubling. Property-test against a dict under random operations and verify that every key is in the bucket its hash prefix dictates. Insert 10^6 keys and report directory size, average bucket occupancy and I/Os per lookup; compare lookup I/Os with your B+ tree.',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'bitcask',
              title: 'A Bitcask key-value store',
              prompt:
                'Implement a Bitcask-style store: append-only data file with CRC, key size, value size, key, value records; an in-memory dict from key to (file, offset); get, put, delete (tombstone); crash recovery by scanning the file; and compaction into a new file with a hint file for fast startup. Test crash recovery by killing the process mid-write (truncate the file at a random point) and verifying all complete records survive. Benchmark 10^6 puts and 10^6 gets and compare with SQLite and your B+ tree.',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'mini-lsm',
              title: 'A mini LSM tree and the amplification trade-off',
              prompt:
                'Build a two-level LSM: a sorted-dict memtable with WAL, flush to sorted SSTable files with a sparse index and a Bloom filter, size-tiered compaction merging files, and reads that check memtable then SSTables newest first. Measure write throughput and bytes written to disk per byte of user data (write amplification) and files checked per read (read amplification) with and without Bloom filters, and compare write throughput with random inserts into your B+ tree.',
              kind: 'coding',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'Why is a B+ tree the default index even though a hash index has fewer I/Os per lookup?',
              answerOutline:
                'Hash indexes support only equality; B+ trees also serve range, prefix, ORDER BY and min/max queries, and their top levels are cached so the I/O difference is usually one read.',
            },
            {
              question: 'How does extendible hashing grow without rehashing everything?',
              answerOutline:
                'Only the overflowing bucket splits (using one more hash bit); the directory doubles only when a bucket\'s local depth would exceed the global depth, and no other bucket is touched.',
            },
            {
              question: 'State the LSM versus B+ tree trade-off in terms of amplification.',
              answerOutline:
                'LSM: sequential writes with low write amplification but higher read amplification (several files per lookup) and compaction overhead. B+ tree: in-place random writes with higher write amplification but one path per read.',
            },
          ],
          relatedLessons: ['data-structures-algorithms/hashing/hash-tables-and-hash-functions'],
        },
      ],
      project: {
        slug: 'storage-engine',
        title: 'Module project: a storage engine with two indexes',
        description: `Combine the module's pieces into a storage engine: a disk manager, a buffer pool with LRU-K, a heap file of slotted pages with insert/delete/update by record ID and a full scan iterator, a B+ tree index and an extendible hash index over the heap, and a tiny key-value API on top (put, get, delete, range). Benchmark it against SQLite on the same operations at 10^5, 10^6 and 10^7 keys with a buffer pool smaller than the data, reporting page I/Os and wall time, and write up where the gap comes from.`,
        deliverables: [
          'Engine code with invariant checks and property tests at every layer',
          'Benchmark script and plots: operations per second and I/Os per operation versus data size for both indexes and SQLite',
          'A three-page design and results write-up',
        ],
        estimatedHours: 12,
        stretchGoals: ['Add page-level checksums and demonstrate detection of a corrupted page', 'Add prefetching for range scans and measure the gain'],
      },
    },
    {
      slug: 'query-processing-and-optimization',
      title: 'Query Processing and Optimisation',
      description:
        'How a SQL statement becomes a tree of physical operators, the algorithms for sorting, joining and aggregating data larger than memory, and how a cost-based optimiser chooses among plans.',
      lessons: [
        {
          slug: 'query-execution-and-the-iterator-model',
          title: 'Query execution: operators and the iterator model',
          summary:
            'From parse tree to logical plan to physical plan, the Volcano iterator model, access methods and the materialisation and vectorised alternatives.',
          estimatedMinutes: 100,
          objectives: [
            'Trace a SQL query through parsing, binding, logical planning and physical planning',
            'Implement the iterator (open/next/close) model with scan, filter, project, nested-loop join, sort and aggregate operators',
            'Compare the iterator, materialisation and vectorised processing models and their costs',
            'Read a real EXPLAIN plan as an operator tree and map each node to an algorithm',
          ],
          concepts: [
            'Parse tree -> logical plan (algebra) -> physical plan (operators)',
            'Volcano / iterator model: open, next, close',
            'Pipelining vs pipeline breakers (sort, hash build)',
            'Access methods: sequential scan, index scan, index-only scan, bitmap scan',
            'Materialisation model and vectorised (batch) model',
            'Expression evaluation',
            'Reading EXPLAIN output as a tree',
          ],
          explanation: `A query goes through a pipeline. The **parser** turns text into a syntax tree; the **binder** resolves names against the catalogue; the **logical planner** produces a relational algebra tree; the **optimiser** rewrites it and chooses physical operators; the **executor** runs it. This lesson is about the last step, because understanding execution is what makes \`EXPLAIN\` output meaningful.

The classic executor is the **iterator model** (Volcano): every operator implements \`open()\`, \`next()\` returning one tuple or end-of-stream, and \`close()\`. A query plan is a tree of operators; the root's \`next()\` pulls from its children, which pull from theirs, down to **scans** at the leaves. Its virtues are simplicity and **pipelining**: a tuple flows from scan through filter and projection to the output without ever being stored, so memory stays small and the first result appears immediately. Some operators are **pipeline breakers**: a sort must consume all input before emitting anything; a hash join must build its whole hash table before probing. Those define where memory is needed and where the query's latency comes from.

Leaves are **access methods**. A **sequential scan** reads every page of the heap. An **index scan** descends a B+ tree and fetches matching record IDs, then the tuples, at a random page read per tuple for an unclustered index. An **index-only scan** answers from the index when it covers the query. A **bitmap scan** (PostgreSQL) collects all matching record IDs first, sorts them by page, and then reads the heap pages in order, converting random I/O into sequential, which is why it wins for medium selectivity.

The iterator model's per-tuple function-call overhead is the cost. The **materialisation model** has each operator produce its entire output at once (fine for OLTP queries touching few rows); the **vectorised model** passes batches of tuples (thousands) per call and runs tight loops over columns, which is how analytical engines like DuckDB achieve 10-100x over tuple-at-a-time. Compiling the plan to machine code is the other route.

Read the 15-445 execution lectures and the SQLite VDBE page (SQLite compiles plans to bytecode you can print with \`EXPLAIN\`), then build the iterator executor over your storage engine.`,
          resources: [
            {
              title: 'CMU 15-445 (Fall 2024) — Lectures 12-13: Query Execution I and II',
              url: 'https://15445.courses.cs.cmu.edu/fall2024/schedule.html',
              type: 'lecture',
              cost: 'free',
              provider: 'Carnegie Mellon University',
              primary: true,
            },
            {
              title: 'CMU 15-445 (Fall 2024) — Project 3: Query Execution',
              url: 'https://15445.courses.cs.cmu.edu/fall2024/project3/',
              type: 'problem-set',
              cost: 'free',
              provider: 'Carnegie Mellon University',
            },
            {
              title: 'SQLite documentation — The Virtual Database Engine of SQLite',
              url: 'https://www.sqlite.org/vdbe.html',
              type: 'documentation',
              cost: 'free',
              provider: 'SQLite',
              note: 'A real engine that compiles plans to bytecode; use EXPLAIN (not EXPLAIN QUERY PLAN) to see it.',
            },
            {
              title: 'PostgreSQL documentation — 14.1 Using EXPLAIN',
              url: 'https://www.postgresql.org/docs/current/using-explain.html',
              type: 'documentation',
              cost: 'free',
              provider: 'PostgreSQL',
            },
          ],
          exercises: [
            {
              slug: 'iterator-executor',
              title: 'An iterator-model executor',
              prompt:
                'Over your storage engine (or over Python lists if you skipped the module project) implement operators with open/next/close: SeqScan, IndexScan, Filter, Project, NestedLoopJoin, Sort (in-memory for now), HashAggregate and Limit. Build plans by hand for five queries on the Chinook data and compare results with SQLite. Count next() calls per operator and show that Filter above SeqScan pipelines (no buffering) while Sort breaks the pipeline.',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'read-explain-plans',
              title: 'Read ten EXPLAIN plans',
              prompt:
                'In PostgreSQL run EXPLAIN (ANALYZE, BUFFERS) on ten queries of increasing complexity over a 10^6-row table with indexes. For each, draw the operator tree, identify the access method and join algorithm chosen, mark the pipeline breakers, and compare estimated versus actual rows at each node. Find a query where the planner chose a bitmap heap scan and explain why it beat both a plain index scan and a sequential scan.',
              kind: 'reading',
              difficulty: 2,
            },
            {
              slug: 'tuple-vs-vector',
              title: 'Tuple-at-a-time versus vectorised',
              prompt:
                'Implement a filter-and-sum query over 10^7 integers two ways: an iterator pipeline returning one value per next(), and a vectorised pipeline passing NumPy arrays of 4096 values between operators. Time both and compare with DuckDB and SQLite on the same data. Explain the difference in terms of function calls, branch prediction and cache behaviour.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What is a pipeline breaker and why does it matter?',
              answerOutline:
                'An operator that must consume all its input before producing output (sort, hash build, aggregate without groups in order); it determines memory needs and delays the first result.',
            },
            {
              question: 'When does a bitmap scan beat an index scan?',
              answerOutline:
                'At moderate selectivity: collecting matching record IDs and sorting them by page turns many random heap reads into a sequential pass, whereas an index scan reads heap pages in index order.',
            },
            {
              question: 'Why is vectorised execution faster than the iterator model for analytics?',
              answerOutline:
                'One function call per batch instead of per tuple, tight loops over columnar data that the CPU can pipeline and the cache can prefetch, and SIMD opportunities.',
            },
          ],
        },
        {
          slug: 'join-algorithms-sorting-and-hashing',
          title: 'Sorting, hashing and join algorithms for data larger than memory',
          summary:
            'External merge sort, the join algorithms (nested loop, block nested loop, index nested loop, sort-merge, hash) and their I/O costs, and hash-based aggregation.',
          estimatedMinutes: 120,
          objectives: [
            'Implement external merge sort and derive its I/O cost as a function of buffer pages',
            'Implement block nested-loop, index nested-loop, sort-merge and hash joins and derive their I/O costs',
            'Choose the right join for given table sizes, indexes, memory and join predicate',
            'Implement hash aggregation and explain the Grace hash join partitioning when the build side exceeds memory',
          ],
          concepts: [
            'External merge sort: runs, passes, B buffers -> cost 2N(1 + ceil(log_{B-1}(N/B)))',
            'Simple and block nested-loop join: M + ceil(M/(B-2)) * N',
            'Index nested-loop join',
            'Sort-merge join: sort both then merge',
            'Hash join: build and probe; Grace hash join partitioning',
            'Hash vs sort-based aggregation and DISTINCT',
            'Equi-joins vs non-equi joins',
          ],
          explanation: `When a table does not fit in memory, every algorithm is judged by **page I/Os** with $B$ buffer pages available. For a table of $N$ pages, **external merge sort** reads $B$ pages at a time, sorts each in memory into a sorted **run**, writes the runs out, then merges $B - 1$ runs at a time per pass until one remains. Each pass reads and writes everything once, so the cost is $2N \\cdot (1 + \\lceil \\log_{B-1} \\lceil N/B \\rceil \\rceil)$; with a few hundred buffers, one merge pass sorts anything you will meet. The same structure underlies sort-based aggregation and duplicate elimination.

**Joins** are where the choice matters most, and you should be able to cost each. For $R$ with $M$ pages and $m$ tuples joining $S$ with $N$ pages, the **simple nested-loop join** scans $S$ for every tuple of $R$: $M + m \\cdot N$ I/Os, catastrophic. **Block nested-loop** reads $B - 2$ pages of $R$ at a time and scans $S$ once per block: $M + \\lceil M/(B-2) \\rceil \\cdot N$, which with enough buffers is just $M + N$. **Index nested-loop** probes an index on $S$'s join column for each tuple of $R$: $M + m \\cdot (\\text{cost of one probe})$, good when $R$ is small and $S$ is indexed, which is the typical OLTP join. **Sort-merge** sorts both inputs and merges them: roughly the two sort costs plus $M + N$, and it is the choice when the inputs are already sorted or the output must be. **Hash join** builds an in-memory hash table on the smaller input and probes it with the larger: $M + N$ if the build side fits, the best possible, and it is what every engine picks for large equi-joins. When the build side does not fit, **Grace hash join** partitions both inputs by hash into $B - 1$ buckets on disk and joins bucket pairs: about $3(M + N)$. Hash joins require an equality predicate; inequality joins fall back to nested loops or sort-based methods.

**Aggregation** mirrors joins: hash aggregation builds a table from group key to running state in one pass if the groups fit, otherwise partitions; sort-based aggregation sorts then scans. Read the 15-445 sorting and join lectures, implement all of them with an I/O counter, and verify that measured I/Os match the formulas, which is the exercise that makes the cost model yours.`,
          resources: [
            {
              title: 'CMU 15-445 (Fall 2024) — Lectures 10-11: Sorting and Aggregation Algorithms, Join Algorithms',
              url: 'https://15445.courses.cs.cmu.edu/fall2024/schedule.html',
              type: 'lecture',
              cost: 'free',
              provider: 'Carnegie Mellon University',
              primary: true,
            },
            {
              title: 'Berkeley CS186 notes — Sorting and Hashing; Joins',
              url: 'https://cs186berkeley.net/notes/',
              type: 'textbook',
              cost: 'free',
              provider: 'UC Berkeley',
              note: 'The I/O cost formulas with worked examples.',
            },
            {
              title: 'PostgreSQL documentation — 51.5 Planner/Optimizer (join strategies)',
              url: 'https://www.postgresql.org/docs/current/planner-optimizer.html',
              type: 'documentation',
              cost: 'free',
              provider: 'PostgreSQL',
              note: 'How a real system describes its nested-loop, merge and hash join choices.',
            },
          ],
          exercises: [
            {
              slug: 'external-sort',
              title: 'External merge sort with an I/O counter',
              prompt:
                'Implement external merge sort over a file of fixed-size records using your disk manager with B buffer pages (run generation and B-1 way merge with a heap). Sort 10^6 records with B = 4, 16, 64, 256 and verify the measured page reads and writes against the formula. Then add replacement selection (or just note it) and compare run lengths.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'four-joins',
              title: 'Four joins, costed and measured',
              prompt:
                'Implement block nested-loop, index nested-loop (using your B+ tree), sort-merge and Grace hash join over page-backed tables with an I/O counter. Join a 10^4-page table with a 10^3-page table for B = 10, 50, 500; tabulate predicted and measured I/Os for each algorithm and verify identical output. Identify, for each B, the winner and explain it. Then make the join predicate an inequality and show which algorithms still apply.',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'postgres-join-choices',
              title: 'Watch PostgreSQL choose',
              prompt:
                'Create two tables of 10^6 and 10^3 rows. Using EXPLAIN ANALYZE, find the join algorithm PostgreSQL chooses for the equi-join with and without an index on the big table, with work_mem at 64 kB and 256 MB, and with enable_hashjoin off. For each configuration explain the choice using the cost formulas and compare actual timings. Then write an inequality join and observe the fallback.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why is hash join the usual choice for large equi-joins?',
              answerOutline:
                'With the build side in memory it costs M + N I/Os, one pass over each input, and even when partitioned (Grace) it is about 3(M + N); it requires only an equality predicate and no sorting.',
            },
            {
              question: 'When would you pick sort-merge join over hash join?',
              answerOutline:
                'When inputs are already sorted on the join key, when the output must be sorted on it, when memory is too small for hashing to work well, or for non-equality predicates like band joins.',
            },
            {
              question: 'How many passes does external merge sort need for N pages with B buffers?',
              answerOutline:
                '1 + ceil(log_{B-1}(ceil(N/B))): one pass to create N/B sorted runs, then each merge pass reduces run count by a factor of B-1.',
            },
          ],
        },
        {
          slug: 'query-optimization-cost-and-plans',
          title: 'Query optimisation: rewriting, statistics, cost estimation and plan search',
          summary:
            'Heuristic rewrites, cardinality estimation from histograms, cost models, and the Selinger dynamic-programming search over join orders.',
          estimatedMinutes: 120,
          objectives: [
            'Apply the standard logical rewrites: predicate push-down, projection push-down, subquery decorrelation',
            'Estimate selectivities and cardinalities from statistics and histograms and explain why errors compound through joins',
            'Explain the Selinger bottom-up dynamic programming over join orders and why left-deep trees and interesting orders matter',
            'Diagnose a bad plan from estimated versus actual rows and fix it with statistics, rewrites or indexes',
          ],
          concepts: [
            'Logical rewrites: push-down, constant folding, decorrelation',
            'Statistics: cardinality, distinct values, histograms, MCVs',
            'Selectivity estimation and the independence assumption',
            'Cost model: I/O plus CPU weighted',
            'Join ordering: n! orders, left-deep plans',
            'Selinger dynamic programming; interesting orders',
            'Plan caching and parameter sniffing',
            'ANALYZE and stale statistics',
          ],
          explanation: `The optimiser turns a logical plan into the cheapest physical plan it can find, and it is the reason declarative SQL is viable at all. It works in two stages: **rewrite** rules that are almost always good, then **cost-based search** among alternatives.

The rewrites are algebra. **Predicate push-down** moves filters as close to the scans as possible so joins see fewer rows. **Projection push-down** drops columns early. **Decorrelation** turns correlated subqueries into joins. Constant folding, removing redundant joins via foreign keys, and merging views into the query are more of the same. These need no statistics; they are the cheap, safe part.

Choosing join algorithms, access methods and join *order* needs estimates. The catalogue keeps **statistics** per column: row counts, distinct values, null fraction, **histograms** and most-common values. The **selectivity** of \`col = 5\` is estimated as $1/\\text{distinct}$ or from the MCV list; a range uses the histogram; a conjunction multiplies selectivities under the **independence assumption**, which is where estimates go wrong (city = 'Paris' and country = 'France' are not independent). Join cardinality is estimated as $|R| \\cdot |S| / \\max(d_R, d_S)$ for an equi-join on a column with $d$ distinct values. Errors multiply across joins, so a five-way join's estimate can be off by orders of magnitude, and a wrong estimate picks a nested-loop join over a hash join and the query takes hours instead of seconds. \`EXPLAIN ANALYZE\`'s estimated-versus-actual rows is the diagnostic; \`ANALYZE\` refreshes statistics, and extended statistics capture correlations.

**Join ordering** is the search problem: $n$ tables have $n!$ orders and several tree shapes. **Selinger's algorithm** (System R, 1979) restricts to **left-deep** trees, which pipeline well, and does bottom-up **dynamic programming**: best plan for each single table, then each pair, then each triple, keeping for each subset only the cheapest plan plus any plan with an **interesting order** (sorted on a column a later join or ORDER BY wants). Cost is $O(2^n)$ instead of $n!$; beyond about a dozen tables, optimisers switch to greedy or genetic search (PostgreSQL's GEQO).

Read the Selinger paper (still the clearest account) and the 15-445 optimisation lectures, then build the estimator and the DP in the exercises and break a real optimiser with correlated columns.`,
          resources: [
            {
              title: 'Selinger et al. — Access Path Selection in a Relational Database Management System (1979)',
              url: 'https://people.eecs.berkeley.edu/~brewer/cs262/3-selinger79.pdf',
              type: 'article',
              cost: 'free',
              provider: 'SIGMOD 1979 (course mirror)',
              note: 'The System R optimiser paper: cost model, selectivity factors and the join-order dynamic programming.',
              primary: true,
            },
            {
              title: 'CMU 15-445 (Fall 2024) — Lectures 14-15: Query Planning and Optimization I and II',
              url: 'https://15445.courses.cs.cmu.edu/fall2024/schedule.html',
              type: 'lecture',
              cost: 'free',
              provider: 'Carnegie Mellon University',
            },
            {
              title: 'PostgreSQL documentation — 51.5 Planner/Optimizer',
              url: 'https://www.postgresql.org/docs/current/planner-optimizer.html',
              type: 'documentation',
              cost: 'free',
              provider: 'PostgreSQL',
            },
            {
              title: 'SQLite documentation — The SQLite Query Optimizer Overview',
              url: 'https://www.sqlite.org/optoverview.html',
              type: 'documentation',
              cost: 'free',
              provider: 'SQLite',
              note: 'A compact, readable description of a real optimiser\'s rewrites and the next-generation query planner\'s join ordering.',
            },
          ],
          exercises: [
            {
              slug: 'cardinality-estimator',
              title: 'Statistics and a cardinality estimator',
              prompt:
                'For a 10^6-row table compute per-column statistics (count, distinct, null fraction, equi-depth histogram with 100 buckets, top-20 MCVs). Implement selectivity estimation for equality, range and conjunctions, and join cardinality estimation for equi-joins. Compare estimates with actual counts for 30 predicates, including a pair of correlated columns, and report the error distribution. Then compare with PostgreSQL\'s estimates on the same data after ANALYZE and after CREATE STATISTICS on the correlated pair.',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'selinger-dp',
              title: 'Join ordering by dynamic programming',
              prompt:
                'Implement the Selinger algorithm for left-deep plans over 5-8 tables with given sizes, join selectivities and available indexes, costing nested-loop, index nested-loop and hash joins with the formulas from the previous lesson. Enumerate all n! orders by brute force for n = 5 and verify DP finds the optimum. Add interesting orders for a final ORDER BY and show a case where the DP keeps a non-cheapest subplan that wins overall. Report plans explored for n = 8 by DP versus brute force.',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'break-the-optimiser',
              title: 'Break and fix the optimiser',
              prompt:
                'In PostgreSQL build a three-table join where a correlated predicate pair makes the estimate wrong by 1000x and the planner picks a nested-loop join that takes minutes. Show EXPLAIN ANALYZE with the estimate error. Fix it three ways and time each: extended statistics on the correlated columns; a rewrite that helps the estimator; and disabling the bad join type as a last resort. Explain which fix you would ship.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why do cardinality estimation errors matter more than cost model errors?',
              answerOutline:
                'Errors compound multiplicatively through joins and can be off by orders of magnitude, changing which algorithms are even reasonable; the cost model\'s constant factors cause only modest misrankings.',
            },
            {
              question: 'What does the independence assumption get wrong?',
              answerOutline:
                'It multiplies selectivities of predicates on correlated columns, underestimating result size when the predicates agree (city and country) and overestimating when they conflict.',
            },
            {
              question: 'Why does Selinger\'s DP keep plans that are not the cheapest for a subset?',
              answerOutline:
                'A plan producing an interesting order (sorted on a later join key or ORDER BY column) can make the remaining work cheaper, so it may win overall despite a higher subset cost.',
            },
          ],
        },
      ],
      project: {
        slug: 'mini-sql-engine',
        title: 'Module project: a SQL subset over your storage engine',
        description: `Add a front end to your storage engine: a parser for SELECT with WHERE, a single JOIN, GROUP BY with COUNT/SUM, and ORDER BY/LIMIT, plus CREATE TABLE and INSERT; a binder against a catalogue; the logical rewrites (push-down); a cost-based choice between sequential scan, index scan and the three join algorithms using your statistics; and the iterator executor. Validate every query against SQLite on the same data and compare chosen plans and I/O counts for twenty queries.`,
        deliverables: [
          'Parser, planner and executor with tests that compare results against SQLite on generated data',
          'An EXPLAIN command printing the chosen plan with estimated costs and rows',
          'A report on twenty queries: plan chosen, I/Os measured, and where your optimiser chose differently from SQLite and why',
        ],
        estimatedHours: 12,
        stretchGoals: ['Implement external sort and Grace hash join in the executor so joins and ORDER BY work beyond memory'],
      },
    },
    {
      slug: 'transactions-and-concurrency',
      title: 'Transactions and Concurrency Control',
      description:
        'ACID and serializability as the correctness standard, two-phase locking and deadlocks, and multi-version and optimistic schemes together with the isolation levels real databases offer.',
      lessons: [
        {
          slug: 'acid-and-serializability',
          title: 'ACID, schedules and serializability',
          summary:
            'What a transaction promises, the anomalies interleaving can cause, and conflict serializability as the testable definition of correct interleaving.',
          estimatedMinutes: 100,
          objectives: [
            'Define atomicity, consistency, isolation and durability and say which mechanism provides each',
            'Identify the classic anomalies: dirty read, lost update, non-repeatable read, phantom, write skew',
            'Decide whether a schedule is conflict serializable using the precedence graph',
            'Explain recoverable and cascadeless schedules and why strict schedules are preferred',
          ],
          concepts: [
            'Transaction: begin, reads/writes, commit or abort',
            'ACID and the mechanisms behind each letter',
            'Schedules; serial vs serializable',
            'Conflicts: RW, WR, WW on the same object',
            'Conflict serializability and the precedence graph',
            'View serializability (mention)',
            'Recoverable, cascadeless, strict schedules',
            'Anomalies: dirty read, lost update, non-repeatable read, phantom, write skew',
          ],
          explanation: `A **transaction** is a sequence of reads and writes that the database promises to execute **atomically** (all or none), leaving the data **consistent** (all constraints hold), in **isolation** from other concurrent transactions (as if alone), and **durably** (committed effects survive crashes). Atomicity and durability come from logging and recovery (next module); isolation comes from concurrency control, this module; consistency is the application's job, with the database enforcing declared constraints.

Isolation is the subtle one. Running transactions one at a time (a **serial schedule**) is trivially correct and hopelessly slow, since one transaction waiting on disk idles the whole machine. So the engine **interleaves** operations, and the question is which interleavings are acceptable. The answer: a schedule is **serializable** if its effect equals that of *some* serial schedule. Interleavings that are not serializable produce the named **anomalies**: a **dirty read** sees uncommitted data that may be rolled back; a **lost update** happens when two read-modify-write cycles overlap and one overwrites the other; a **non-repeatable read** sees a row change between two reads in one transaction; a **phantom** sees a different set of rows satisfying a predicate; **write skew** has two transactions each read what the other writes and both commit decisions that are jointly invalid (two doctors both going off-call).

Testing serializability directly is intractable, so engines use **conflict serializability**: two operations **conflict** if they are from different transactions, touch the same object, and at least one is a write. A schedule is conflict serializable if swapping non-conflicting adjacent operations can turn it into a serial one, which is equivalent to the **precedence graph** (an edge $T_i \\to T_j$ for every conflict where $T_i$'s operation comes first) being **acyclic**. That test is what two-phase locking enforces by construction and what serializable snapshot isolation checks at run time.

Two further properties concern aborts. A schedule is **recoverable** if no transaction commits having read data from a transaction that has not committed; **cascadeless** if transactions read only committed data; **strict** if they also write only committed data, which makes undo simple. Read the 15-445 concurrency lecture and the CS186 notes, then do the precedence-graph drills and the anomaly reproductions against real databases.`,
          resources: [
            {
              title: 'CMU 15-445 (Fall 2024) — Lecture 16: Concurrency Control Theory',
              url: 'https://15445.courses.cs.cmu.edu/fall2024/schedule.html',
              type: 'lecture',
              cost: 'free',
              provider: 'Carnegie Mellon University',
              primary: true,
            },
            {
              title: 'Berkeley CS186 notes — Transactions and Concurrency',
              url: 'https://cs186berkeley.net/notes/',
              type: 'textbook',
              cost: 'free',
              provider: 'UC Berkeley',
            },
            {
              title: 'Berenson et al. — A Critique of ANSI SQL Isolation Levels (1995)',
              url: 'https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/tr-95-51.pdf',
              type: 'article',
              cost: 'free',
              provider: 'Microsoft Research',
              note: 'The paper that defined the anomalies precisely, including write skew; sections 1-4.',
            },
            {
              title: 'Jepsen — Consistency models',
              url: 'https://jepsen.io/consistency',
              type: 'article',
              cost: 'free',
              provider: 'Jepsen',
              note: 'A clickable map of isolation and consistency levels and the anomalies each permits.',
            },
          ],
          exercises: [
            {
              slug: 'precedence-graphs',
              title: 'Precedence graph drills',
              prompt:
                'For ten schedules over three transactions (write them with R(x), W(x) notation), draw the precedence graph, decide conflict serializability, and give an equivalent serial order where one exists. Then implement is_conflict_serializable(schedule) that builds the graph and tests for a cycle, and generate 10,000 random schedules to measure what fraction of random interleavings are serializable as a function of the number of shared objects.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'reproduce-anomalies',
              title: 'Reproduce the anomalies',
              prompt:
                'Using two Python connections to PostgreSQL (and then SQLite), reproduce lost update, non-repeatable read, phantom read and write skew with explicit step-by-step interleavings at the READ COMMITTED level. Record the SQL, the interleaving and the observed wrong result. Then repeat at REPEATABLE READ and SERIALIZABLE and record which anomalies disappear and what error the database raises instead.',
              kind: 'coding',
              difficulty: 2,
              hint: 'The Hermitage repository (ept/hermitage) has ready-made scripts for each anomaly on each database; use them to check your interleavings.',
            },
            {
              slug: 'recoverability',
              title: 'Recoverable, cascadeless, strict',
              prompt:
                'Write schedules that are (a) serializable but not recoverable, (b) recoverable but not cascadeless, (c) cascadeless but not strict. For each explain the concrete problem that arises on abort or crash. Then argue why strict two-phase locking (next lesson) produces only strict schedules.',
              kind: 'derivation',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What is the precedence-graph test for conflict serializability?',
              answerOutline:
                'Add an edge Ti -> Tj for each pair of conflicting operations where Ti\'s comes first; the schedule is conflict serializable iff the graph is acyclic, and any topological order is an equivalent serial schedule.',
            },
            {
              question: 'Describe write skew and why snapshot isolation allows it.',
              answerOutline:
                'Two transactions read overlapping data, each writes a different item based on what it read, and both commit; neither sees the other\'s write. Snapshot isolation only detects write-write conflicts, so disjoint writes pass.',
            },
            {
              question: 'Why prefer strict schedules even though recoverable ones suffice for correctness?',
              answerOutline:
                'Strictness prevents cascading aborts and lets undo simply restore before-images, since no other transaction has read or overwritten uncommitted data.',
            },
          ],
        },
        {
          slug: 'two-phase-locking-and-deadlocks',
          title: 'Two-phase locking, lock granularity and deadlocks',
          summary:
            'How locks enforce serializability, why strict 2PL is the practical variant, hierarchical locking with intention locks, and detecting or preventing deadlocks.',
          estimatedMinutes: 110,
          objectives: [
            'Explain why two-phase locking guarantees conflict serializability and why strict 2PL is used in practice',
            'Implement a lock manager with shared and exclusive locks, upgrades and a wait queue',
            'Describe multi-granularity locking with intention locks and predicate/index-range locks for phantoms',
            'Detect deadlocks with a waits-for graph and compare with timeout and wait-die/wound-wait prevention',
          ],
          concepts: [
            'Shared (S) and exclusive (X) locks; compatibility matrix',
            'Two-phase locking: growing and shrinking phases',
            'Strict 2PL: hold X locks until commit',
            'Lock manager and wait queues; lock upgrades',
            'Multi-granularity locking: IS, IX, SIX',
            'Phantoms and index-range (gap) locking',
            'Deadlock detection (waits-for graph) vs prevention (wait-die, wound-wait)',
            'Lock contention and hot spots',
          ],
          explanation: `**Two-phase locking** is the classic way to guarantee serializability without analysing schedules: each transaction acquires a **shared lock** before reading and an **exclusive lock** before writing an object, and once it has released any lock it may never acquire another (a **growing phase** then a **shrinking phase**). The proof is short: at the moment each transaction takes its last lock (its *lock point*), it holds locks on everything it conflicts on, and ordering transactions by lock point gives a serial order equivalent to the schedule, so the precedence graph has no cycles. Plain 2PL still allows dirty reads and cascading aborts, because a transaction can release a lock and then abort; **strict 2PL** holds all exclusive locks until commit, giving strict schedules at the cost of holding locks longer. Every lock-based database uses strict (or rigorous) 2PL.

The **lock manager** is a hash table from object to its lock state and a queue of waiting requests, with a compatibility matrix (S is compatible with S; X with nothing). Upgrading S to X is a classic deadlock source when two transactions both hold S and both want X.

Locking every row is expensive for a transaction that scans a table, so **multi-granularity locking** lets a transaction lock a table, a page or a row, with **intention locks** (IS, IX) placed on ancestors to signal that finer locks exist below; a table scan takes one S on the table, a row update takes IX on the table and X on the row, and the matrix tells whether they conflict. **Phantoms** need locks on rows that do not yet exist: **predicate locking** is the ideal, **index-range (gap) locking** the practical implementation.

Locks create **deadlocks**: $T_1$ holds $x$ and wants $y$, $T_2$ holds $y$ and wants $x$. **Detection** maintains a **waits-for graph** and periodically aborts a transaction on each cycle (the youngest, or the one with least work done). **Prevention** assigns priorities by timestamp: in **wait-die** an older transaction waits for a younger one but a younger one aborts instead of waiting; in **wound-wait** an older transaction aborts the younger holder. Timeouts are the crude fallback. Application-level deadlocks are avoided by taking locks in a consistent order.

Read the 15-445 locking lecture and the PostgreSQL explicit locking chapter (which shows the real lock modes), then build the lock manager and provoke deadlocks in both your implementation and PostgreSQL.`,
          resources: [
            {
              title: 'CMU 15-445 (Fall 2024) — Lecture 17: Two-Phase Locking Concurrency Control',
              url: 'https://15445.courses.cs.cmu.edu/fall2024/schedule.html',
              type: 'lecture',
              cost: 'free',
              provider: 'Carnegie Mellon University',
              primary: true,
            },
            {
              title: 'PostgreSQL documentation — 13.3 Explicit Locking',
              url: 'https://www.postgresql.org/docs/current/explicit-locking.html',
              type: 'documentation',
              cost: 'free',
              provider: 'PostgreSQL',
              note: 'The table- and row-level lock modes and conflict table of a real system, plus deadlock handling.',
            },
            {
              title: 'SQLite documentation — File Locking and Concurrency in SQLite Version 3',
              url: 'https://www.sqlite.org/lockingv3.html',
              type: 'documentation',
              cost: 'free',
              provider: 'SQLite',
              note: 'A database-level locking protocol (SHARED, RESERVED, PENDING, EXCLUSIVE): the simplest real design.',
            },
            {
              title: 'Berkeley CS186 notes — Locking',
              url: 'https://cs186berkeley.net/notes/',
              type: 'textbook',
              cost: 'free',
              provider: 'UC Berkeley',
            },
          ],
          exercises: [
            {
              slug: 'lock-manager',
              title: 'A lock manager with strict 2PL and deadlock detection',
              prompt:
                'Implement LockManager with lock_shared, lock_exclusive, upgrade, unlock and release_all(txn), with FIFO wait queues and a waits-for graph checked by a background detector that aborts the youngest transaction in a cycle. Wrap it in a Transaction API enforcing strict 2PL (no lock after first unlock; X locks held to commit). Run 8 threads doing random read/write transactions over 100 objects and verify the produced schedule is conflict serializable with your checker from the previous lesson. Report throughput and abort rate as the object count shrinks to 10.',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'intention-locks',
              title: 'Multi-granularity locking',
              prompt:
                'Extend the lock manager with a table/page/row hierarchy and IS, IX, S, SIX, X modes with the standard compatibility matrix. Show that a table scan (S on table) blocks a row update (IX on table) but two row updates on different rows proceed concurrently. Measure the number of lock requests for a 10^5-row scan with and without hierarchy. Then add index-range locks on your B+ tree and demonstrate that a phantom insert is blocked while a range query\'s transaction is open.',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'postgres-deadlocks',
              title: 'Deadlocks in PostgreSQL',
              prompt:
                'With two connections, create a deadlock on two rows and capture the error and the detection delay (deadlock_timeout). Then reproduce the lock-upgrade deadlock (both SELECT ... FOR SHARE then UPDATE). Fix both by consistent lock ordering and by SELECT ... FOR UPDATE, and write a 20-worker stress test over a 10-row hot table that reports deadlocks per minute before and after the fix.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does two-phase locking guarantee serializability?',
              answerOutline:
                'Ordering transactions by their lock points gives a serial schedule equivalent to the actual one: at its lock point a transaction holds every lock it needs, so all its conflicts with earlier-lock-point transactions are ordered consistently.',
            },
            {
              question: 'What do intention locks achieve?',
              answerOutline:
                'They let a coarse lock (on a table) be checked for conflict with fine locks (on rows) below it in O(1), by marking ancestors with the intent to lock descendants.',
            },
            {
              question: 'Contrast wait-die and wound-wait.',
              answerOutline:
                'Both order transactions by age. Wait-die: an older requester waits, a younger requester aborts (dies). Wound-wait: an older requester forces the younger holder to abort (wounds), a younger requester waits. Both prevent cycles.',
            },
          ],
          relatedLessons: ['operating-systems/concurrency/locks'],
        },
        {
          slug: 'mvcc-optimistic-and-isolation-levels',
          title: 'Multi-version concurrency control, optimistic schemes and isolation levels',
          summary:
            'Snapshot isolation and how PostgreSQL implements it with tuple versions, serializable snapshot isolation, optimistic validation, and choosing an isolation level per transaction.',
          estimatedMinutes: 110,
          objectives: [
            'Explain MVCC: versions, snapshots, visibility rules and garbage collection (vacuum)',
            'Describe snapshot isolation, the write-write conflict rule, and why it permits write skew',
            'Explain serializable snapshot isolation (SSI) and optimistic concurrency control with validation',
            'Choose an isolation level for a given transaction and defend it with the anomalies it allows',
          ],
          concepts: [
            'Tuple versions with transaction IDs (xmin/xmax)',
            'Snapshot: set of transactions visible at start',
            'Readers never block writers',
            'First-committer-wins for write-write conflicts',
            'Snapshot isolation vs serializable; write skew',
            'Serializable snapshot isolation (rw-dependency tracking)',
            'Optimistic concurrency control: read, validate, write',
            'Isolation levels: read uncommitted, read committed, repeatable read, serializable',
            'Vacuum and version garbage collection',
          ],
          explanation: `Locks make readers and writers wait for each other, which is unacceptable for read-heavy workloads. **Multi-version concurrency control** keeps several **versions** of each tuple, each stamped with the transaction that created it and the one that deleted it (PostgreSQL's \`xmin\` and \`xmax\`). A transaction takes a **snapshot** at start (the set of committed transactions it can see) and reads the newest version visible in that snapshot; writers create new versions rather than overwriting. **Readers never block writers and writers never block readers**, and a long report sees a consistent picture of the database as of its start. The cost is space: old versions accumulate until no snapshot needs them and a **garbage collector** (PostgreSQL's VACUUM) reclaims them; forgetting this is the source of table bloat and transaction ID wraparound incidents.

The isolation this gives directly is **snapshot isolation**: each transaction reads from its snapshot and, on commit, aborts if it would overwrite a version written by a transaction that committed after its snapshot (**first committer wins**). This prevents dirty reads, non-repeatable reads, lost updates and phantoms, and most people assume it is serializable. It is not: **write skew** passes, because the two transactions write different rows. **Serializable snapshot isolation** (Cahill, Fekete and Röhm; shipped in PostgreSQL 9.1) fixes this by tracking read-write dependencies between concurrent transactions and aborting one when a dangerous structure (two consecutive rw-edges) appears; it is cheap enough to use by default for correctness-critical work, at the price of occasional serialization-failure retries, which your application must handle.

**Optimistic concurrency control** generalises the idea: transactions run without locks on private copies, then a **validation** phase checks that nothing they read was written by a concurrently committed transaction, then writes are installed. It wins when conflicts are rare and loses when they are common, because work is wasted on abort.

SQL exposes this through **isolation levels**. READ UNCOMMITTED allows dirty reads (PostgreSQL does not actually offer it). READ COMMITTED, the usual default, takes a fresh snapshot per statement and allows non-repeatable reads and lost updates via read-modify-write unless you use \`SELECT ... FOR UPDATE\`. REPEATABLE READ in PostgreSQL *is* snapshot isolation. SERIALIZABLE is SSI. Choose per transaction: reports and read-only work at REPEATABLE READ; money movement at SERIALIZABLE with retry; and know your database, because MySQL's and Oracle's levels do not mean the same things. Read the PostgreSQL concurrency chapter and the 15-445 MVCC lecture, then run the Hermitage tests and build an MVCC store.`,
          resources: [
            {
              title: 'PostgreSQL documentation — Chapter 13: Concurrency Control (13.1 Introduction, 13.2 Transaction Isolation)',
              url: 'https://www.postgresql.org/docs/current/transaction-iso.html',
              type: 'documentation',
              cost: 'free',
              provider: 'PostgreSQL',
              note: 'The precise behaviour of each level in a real MVCC system, including serialization failures and retry advice.',
              primary: true,
            },
            {
              title: 'CMU 15-445 (Fall 2024) — Lectures 18-19: Timestamp Ordering / Optimistic CC and Multi-Version Concurrency Control',
              url: 'https://15445.courses.cs.cmu.edu/fall2024/schedule.html',
              type: 'lecture',
              cost: 'free',
              provider: 'Carnegie Mellon University',
            },
            {
              title: 'Hermitage — test suite differentiating isolation levels across databases',
              url: 'https://github.com/ept/hermitage',
              type: 'tool',
              cost: 'free',
              provider: 'Martin Kleppmann (GitHub)',
              note: 'Run the scripts against PostgreSQL, MySQL and SQLite and compare the tables of allowed anomalies.',
            },
            {
              title: 'SQLite documentation — Isolation in SQLite',
              url: 'https://www.sqlite.org/isolation.html',
              type: 'documentation',
              cost: 'free',
              provider: 'SQLite',
              note: 'What a single-writer database with WAL snapshots guarantees; a useful contrast.',
            },
            {
              title: 'CMU 15-445 (Fall 2024) — Project 4: Concurrency Control',
              url: 'https://15445.courses.cs.cmu.edu/fall2024/project4/',
              type: 'problem-set',
              cost: 'free',
              provider: 'Carnegie Mellon University',
            },
          ],
          exercises: [
            {
              slug: 'mvcc-store',
              title: 'An MVCC key-value store with snapshot isolation',
              prompt:
                'Implement a store where each key holds a version chain with (value, created_by, deleted_by) and transactions have ids and snapshots; implement visibility rules, first-committer-wins on commit, and a garbage collector that removes versions invisible to all active snapshots. Verify with a multi-threaded test that readers never block and that lost updates are impossible, then write the write-skew scenario and show it commits. Measure version-chain length over time with and without GC.',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'ssi-validation',
              title: 'Add serializable validation',
              prompt:
                'Extend your MVCC store with read-set tracking and a commit-time validation that aborts a transaction if any key it read was written by a transaction that committed after its snapshot (a simple, conservative OCC rule). Show write skew is now prevented, then measure the abort rate and throughput versus the plain snapshot-isolation version under 8 threads at low and high contention. Compare with PostgreSQL SERIALIZABLE on the same workload including retry logic in the client.',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'choose-isolation-levels',
              title: 'Choose and justify isolation levels',
              prompt:
                'For six transactions in a banking application (transfer, balance query, month-end report, interest accrual over all accounts, user registration with unique email, fraud rule evaluating two accounts jointly), choose an isolation level in PostgreSQL, state the anomalies that remain, and demonstrate each choice with a two-connection test showing either the anomaly at a weaker level or the serialization failure plus retry at SERIALIZABLE.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'How does MVCC let readers avoid blocking writers?',
              answerOutline:
                'Writers create new tuple versions instead of overwriting; a reader consults its snapshot and reads the latest version visible to it, so neither needs a lock on the other\'s version.',
            },
            {
              question: 'Why is snapshot isolation not serializable, and how does SSI fix it?',
              answerOutline:
                'It only detects write-write conflicts, so write skew (disjoint writes based on overlapping reads) commits. SSI tracks read-write dependencies and aborts a transaction when a dangerous cycle pattern forms.',
            },
            {
              question: 'What must an application do when running at SERIALIZABLE in PostgreSQL?',
              answerOutline:
                'Catch serialization failures (SQLSTATE 40001) and retry the whole transaction, keeping transactions short to reduce conflicts.',
            },
            {
              question: 'What happens if old versions are never garbage collected?',
              answerOutline:
                'Tables and indexes bloat with dead versions, scans slow down, and in PostgreSQL transaction ID wraparound eventually forces the database read-only; VACUUM reclaims versions invisible to all snapshots.',
            },
          ],
        },
      ],
      project: {
        slug: 'transactional-engine',
        title: 'Module project: transactions for your engine',
        description: `Add transactions to the storage engine: a transaction manager with begin/commit/abort, strict two-phase locking at row granularity with a deadlock detector, and, as an alternative mode, MVCC snapshot isolation with version chains in the heap pages. Build a stress harness that runs a TPC-C-like transfer workload from many threads and checks the invariant (total balance constant) after every run, and compare the two modes on throughput and abort rate as contention varies.`,
        deliverables: [
          'Transaction manager with both 2PL and MVCC modes, with tests for each anomaly',
          'Stress harness with invariant checking and a deadlock/abort report',
          'A comparison write-up with throughput and abort-rate plots versus contention for both modes',
        ],
        estimatedHours: 12,
        stretchGoals: ['Implement serializable snapshot isolation with rw-dependency tracking and show write skew is prevented'],
      },
    },
    {
      slug: 'recovery-and-distributed-data',
      title: 'Recovery and Distributed Data',
      description:
        'Write-ahead logging and ARIES-style crash recovery, replication and the consistency it offers, and partitioning data across machines with distributed transactions.',
      lessons: [
        {
          slug: 'logging-and-aries-recovery',
          title: 'Write-ahead logging and ARIES recovery',
          summary:
            'How a database guarantees atomicity and durability through a log, the WAL rule, checkpoints, and the analysis-redo-undo recovery algorithm.',
          estimatedMinutes: 120,
          objectives: [
            'State the write-ahead logging rule and explain why it gives both atomicity and durability',
            'Describe log records (LSN, prevLSN, before/after images) and the steal/no-force buffer policy',
            'Explain fuzzy checkpoints with the dirty page table and active transaction table',
            'Implement ARIES analysis, redo and undo with compensation log records, and prove recovery is idempotent',
          ],
          concepts: [
            'Undo and redo logging; physiological logging',
            'LSN, prevLSN, pageLSN',
            'WAL rule: log before data; force log at commit',
            'Steal / no-force buffer management',
            'Checkpoints: active transaction table, dirty page table',
            'ARIES: analysis, redo (repeating history), undo',
            'Compensation log records (CLRs) and crash during recovery',
            'Group commit and fsync cost',
          ],
          explanation: `A crash can strike between any two writes, so a database must be able to finish or erase any half-done transaction on restart. The mechanism is the **write-ahead log**: an append-only sequence of records describing every change (transaction ID, page, offset, before-image and after-image), each with a **log sequence number** and a pointer to the transaction's previous record. Two rules make it work. **WAL rule**: a dirty data page may not be written to disk until all log records describing its changes are on disk. **Commit rule**: a transaction is committed only once its commit record is on disk. Together they let the buffer pool **steal** (write uncommitted pages, because undo information is in the log) and avoid **force** (no need to flush data pages at commit, because redo information is in the log), which is what makes commits fast: one sequential log write, with **group commit** batching many transactions into one \`fsync\`. Every page records the LSN of the last change applied to it (**pageLSN**), which is how recovery knows whether a log record has already been applied.

**ARIES** (Mohan et al., 1992) is the standard recovery algorithm. Restart runs three passes. **Analysis** scans the log forward from the last **checkpoint** to rebuild the **active transaction table** (who was running) and **dirty page table** (which pages might not have been flushed, with the earliest LSN that dirtied each). **Redo** scans forward from the smallest such LSN and reapplies every logged change whose LSN exceeds the page's pageLSN, including changes of transactions that will later be undone: *repeating history* restores the exact pre-crash state and makes the logic simple. **Undo** then rolls back the losers (uncommitted transactions) by walking their prevLSN chains backwards, writing a **compensation log record** for each undone change so that a crash during recovery does not undo the same change twice; CLRs are redo-only and point past the record they compensate. Recovery is therefore **idempotent**: crash during it, run it again, same result.

**Checkpoints** bound recovery time; ARIES uses **fuzzy** checkpoints that write the two tables without stopping transactions or flushing pages. The cost of all this is \`fsync\`: the latency floor of a commit is the storage device's write latency, which is why durability settings (\`synchronous_commit\`, SQLite's \`synchronous\` pragma) trade safety for speed.

Read the ARIES paper's first sections, the 15-445 logging and recovery lectures and the SQLite atomic commit page (a rollback-journal design, a useful contrast with WAL), then build the log and recovery into your engine and test it by crashing it.`,
          resources: [
            {
              title: 'CMU 15-445 (Fall 2024) — Lectures 20-21: Database Logging, Database Recovery',
              url: 'https://15445.courses.cs.cmu.edu/fall2024/schedule.html',
              type: 'lecture',
              cost: 'free',
              provider: 'Carnegie Mellon University',
              primary: true,
            },
            {
              title: 'Mohan et al. — ARIES: A Transaction Recovery Method Supporting Fine-Granularity Locking and Partial Rollbacks Using Write-Ahead Logging (1992)',
              url: 'https://web.stanford.edu/class/cs345d-01/rl/aries.pdf',
              type: 'article',
              cost: 'free',
              provider: 'ACM TODS (course mirror)',
              note: 'Sections 1-6 are enough; the paper is long but the algorithm description is precise.',
            },
            {
              title: 'SQLite documentation — Atomic Commit In SQLite',
              url: 'https://www.sqlite.org/atomiccommit.html',
              type: 'documentation',
              cost: 'free',
              provider: 'SQLite',
              note: 'A step-by-step narrative of a rollback-journal commit with every fsync explained; then read the Write-Ahead Logging page.',
            },
            {
              title: 'PostgreSQL documentation — Chapter 28: Reliability and the Write-Ahead Log',
              url: 'https://www.postgresql.org/docs/current/wal.html',
              type: 'documentation',
              cost: 'free',
              provider: 'PostgreSQL',
              note: 'Reliability, WAL internals, checkpoints and the asynchronous commit trade-off.',
            },
          ],
          exercises: [
            {
              slug: 'wal-and-aries',
              title: 'WAL and ARIES recovery for your engine',
              prompt:
                'Add a log manager writing physiological records with LSN and prevLSN, enforce the WAL rule in the buffer pool (flush log up to pageLSN before writing a page), implement commit with log force, fuzzy checkpoints, and ARIES restart with analysis, redo and undo with CLRs. Test with a crash injector that kills the process at random points during a workload of 1000 transactions, then restarts and verifies: every committed transaction\'s effects are present, no uncommitted effects remain, and the balance invariant holds. Run 200 crash cycles including crashes during recovery itself.',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'fsync-cost',
              title: 'The price of durability',
              prompt:
                'Measure commits per second for single-row inserts in SQLite with synchronous = FULL, NORMAL and OFF, in rollback-journal and WAL modes, and in PostgreSQL with synchronous_commit on and off. Then implement group commit in your engine (batch waiting transactions into one fsync) and plot commits per second against concurrent clients. Explain each ratio in terms of fsyncs per commit and device write latency.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'recovery-by-hand',
              title: 'ARIES by hand',
              prompt:
                'Given a log of 25 records (updates by three transactions, one commit, a checkpoint with its tables, and a crash), produce the analysis-phase tables, the redo start LSN and which records redo applies given stated pageLSNs, the undo sequence with the CLRs written and their undoNext pointers. Then crash again midway through undo and show how the second recovery resumes without repeating work.',
              kind: 'problem',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What do steal and no-force mean and what does each require of the log?',
              answerOutline:
                'Steal: uncommitted dirty pages may be written to disk, requiring undo (before-images) in the log. No-force: committed pages need not be flushed at commit, requiring redo (after-images) in the log.',
            },
            {
              question: 'Why does ARIES redo changes of transactions it will then undo?',
              answerOutline:
                'Repeating history restores the exact pre-crash state so that undo operates on a known state and logical/physiological undo is correct; it also simplifies reasoning about CLRs and nested crashes.',
            },
            {
              question: 'What role do compensation log records play?',
              answerOutline:
                'They record each undo action so that if a crash happens during undo, redo reapplies the CLRs and undo resumes from the undoNext pointer, never undoing the same change twice.',
            },
          ],
          relatedLessons: ['operating-systems/persistence/locality-and-crash-consistency'],
        },
        {
          slug: 'replication-and-consistency',
          title: 'Replication and consistency',
          summary:
            'Keeping copies of data on several machines: single-leader, multi-leader and leaderless replication, synchronous versus asynchronous, replication lag, and consensus for the leader itself.',
          estimatedMinutes: 100,
          objectives: [
            'Explain why systems replicate (availability, read scaling, locality) and what each goal costs',
            'Compare single-leader, multi-leader and leaderless replication and their conflict behaviour',
            'Describe synchronous and asynchronous replication, replication lag and read-your-writes guarantees',
            'Explain the role of consensus (Raft) in leader election and log replication at a high level',
          ],
          concepts: [
            'Replica, leader/follower, failover',
            'Statement-, WAL- and logical (row-based) replication',
            'Synchronous vs asynchronous; durability vs latency',
            'Replication lag; read-your-writes, monotonic reads',
            'Multi-leader and conflict resolution',
            'Leaderless (Dynamo-style) quorums: W + R > N',
            'Split brain and fencing',
            'Consensus and Raft for leader election and replicated logs',
          ],
          explanation: `A single machine fails, and a single machine has a ceiling on reads, so production databases keep **replicas**. The question is how writes reach them and what readers can rely on.

**Single-leader replication** is the standard: all writes go to the leader, which ships its changes to followers, either as the physical **WAL** (PostgreSQL streaming replication, byte-identical copies) or as **logical** row changes (which can cross versions and feed other systems). Followers serve reads. If the leader fails, a follower is promoted; the hard parts are detecting failure without false alarms, choosing a follower that has the latest data, and **fencing** the old leader so two leaders never accept writes (**split brain**).

**Synchronous** replication waits for a follower to acknowledge before confirming the commit: no committed write is lost on leader failure, at the cost of a round trip per commit and stalls when the follower is slow. **Asynchronous** replication confirms immediately: fast, but a leader crash loses recent commits, and followers show **replication lag**. Lag produces user-visible anomalies: a user writes then does not see their own write on a lagging replica (**read-your-writes** violated), or sees time go backwards across replicas (**monotonic reads**). Fixes route a user's reads to the leader after a write, or track the LSN a client has seen and wait for replicas to catch up.

**Multi-leader** replication accepts writes at several sites (multi-region, offline clients) and must resolve **conflicting writes**, by last-writer-wins (loses data), by application merge, or by conflict-free data types. **Leaderless** systems (Dynamo, Cassandra) send each write to $N$ replicas and consider it done after $W$ acknowledge; reads ask $R$ replicas and take the newest; with $W + R > N$ a read sees the latest write, and **read repair** and anti-entropy fix stragglers. Consistency is tunable per request, and the price is that application code sees concurrent versions.

Underneath leader election and any guarantee of a single consistent log sits **consensus**: a protocol by which a majority of nodes agree on a sequence of values despite crashes. **Raft** is the readable one: a leader is elected by majority vote for a term, replicates log entries, and commits an entry once a majority has it; a new leader is guaranteed to have all committed entries. Distributed systems is where you study it fully; here you need its guarantees and its cost (a majority round trip per commit). Read the PostgreSQL high-availability chapter, the Dynamo paper's replication section and the Raft site, then build the replication experiments.`,
          resources: [
            {
              title: 'PostgreSQL documentation — Chapter 26: High Availability, Load Balancing, and Replication',
              url: 'https://www.postgresql.org/docs/current/high-availability.html',
              type: 'documentation',
              cost: 'free',
              provider: 'PostgreSQL',
              note: 'Streaming replication, synchronous_standby_names, hot standby and failover; then Chapter 29 for logical replication.',
              primary: true,
            },
            {
              title: 'PostgreSQL documentation — Chapter 29: Logical Replication',
              url: 'https://www.postgresql.org/docs/current/logical-replication.html',
              type: 'documentation',
              cost: 'free',
              provider: 'PostgreSQL',
            },
            {
              title: 'Dynamo: Amazon\'s Highly Available Key-value Store (SOSP 2007)',
              url: 'https://www.allthingsdistributed.com/files/amazon-dynamo-sosp2007.pdf',
              type: 'article',
              cost: 'free',
              provider: 'Amazon',
              note: 'Sections 4.4-4.7: sloppy quorums, versioning with vector clocks, and read repair.',
            },
            {
              title: 'The Raft Consensus Algorithm — paper, visualisation and implementations',
              url: 'https://raft.github.io/',
              type: 'article',
              cost: 'free',
              provider: 'raft.github.io',
              note: 'Read the extended paper\'s sections 5.1-5.4 and play with the interactive visualisation.',
            },
            {
              title: 'Designing Data-Intensive Applications (Kleppmann) — Chapter 5: Replication',
              url: 'https://dataintensive.net/',
              type: 'textbook',
              cost: 'paid',
              provider: "O'Reilly",
              note: 'The best single chapter on replication; optional. The free resources above cover the same material in pieces.',
            },
          ],
          exercises: [
            {
              slug: 'postgres-streaming-replication',
              title: 'Set up and measure PostgreSQL replication',
              prompt:
                'Run a PostgreSQL primary and one standby in containers with streaming replication. Measure commit latency and lag (pg_stat_replication) under a write load with asynchronous and synchronous replication. Demonstrate read-your-writes failing on the standby and fix it in the client by waiting for the standby to pass the client\'s commit LSN. Then kill the primary, promote the standby, and determine exactly which committed transactions were lost in asynchronous mode.',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'quorum-simulator',
              title: 'Leaderless quorum simulator',
              prompt:
                'Simulate N = 5 replicas with per-request random delays and failures. Implement writes to W replicas and reads from R with version numbers and read repair. For (W, R) in {(1,1), (3,3), (5,1), (1,5)} measure, over 10^5 operations, the fraction of stale reads, the availability under one and two replica failures, and mean latency. Explain which settings satisfy W + R > N and what that buys.',
              kind: 'simulation',
              difficulty: 2,
            },
            {
              slug: 'raft-walkthrough',
              title: 'Raft leader election and log safety',
              prompt:
                'Using the Raft visualisation or a small Python implementation of the election and AppendEntries rules (no persistence needed), construct scenarios showing: a leader elected with majority votes; a partition producing two terms and the stale leader stepping down; and an entry that was replicated to a minority being discarded. Explain the Leader Completeness property and why a candidate with a less up-to-date log cannot win.',
              kind: 'simulation',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What can be lost with asynchronous single-leader replication and when?',
              answerOutline:
                'Commits acknowledged to clients but not yet shipped to any follower are lost if the leader fails and a follower is promoted.',
            },
            {
              question: 'Why does W + R > N guarantee a read sees the latest write, and what does it not guarantee?',
              answerOutline:
                'The read and write sets must overlap in at least one replica holding the latest version. It does not guarantee ordering across keys, linearizability under concurrent writes or sloppy quorums, nor that stale replicas are repaired promptly.',
            },
            {
              question: 'What is split brain and how is it prevented?',
              answerOutline:
                'Two nodes both believing they are leader and accepting conflicting writes. Prevented by majority-based election (only one majority exists) and fencing the old leader (tokens, STONITH) so its writes are rejected.',
            },
          ],
          relatedLessons: ['distributed-systems/replication-and-consensus/raft'],
        },
        {
          slug: 'partitioning-and-distributed-transactions',
          title: 'Partitioning, distributed transactions and the price of scale',
          summary:
            'Splitting a dataset across machines by range or hash, routing and rebalancing, secondary indexes across partitions, two-phase commit, and what the CAP trade-off actually constrains.',
          estimatedMinutes: 100,
          objectives: [
            'Choose a partitioning scheme (range, hash, consistent hashing) and explain hot spots and rebalancing',
            'Describe local versus global secondary indexes and the cost of cross-partition queries',
            'Explain two-phase commit, its blocking problem, and how modern systems combine it with consensus',
            'State what CAP and PACELC actually say and apply them to a design decision',
          ],
          concepts: [
            'Horizontal partitioning (sharding) by range or hash',
            'Hot spots and skew; rebalancing and virtual partitions',
            'Request routing and partition metadata',
            'Local (document-partitioned) vs global (term-partitioned) secondary indexes',
            'Scatter-gather queries',
            'Two-phase commit: prepare, commit; coordinator failure and blocking',
            'Distributed transactions over consensus groups (Spanner-style)',
            'CAP and PACELC',
          ],
          explanation: `Replication copies the whole dataset; when it no longer fits one machine, or one machine cannot absorb the writes, you **partition** (shard) it so each node holds a subset. The scheme determines everything downstream. **Range partitioning** assigns contiguous key ranges to partitions, keeps range scans local, and suffers **hot spots** when keys are sequential (timestamps: all writes hit the last partition). **Hash partitioning** spreads load but destroys range locality; consistent hashing or a fixed number of virtual partitions keeps **rebalancing** cheap when nodes are added, as the hashing lesson in the algorithms subject showed. Clients or a routing tier must know where each key lives, and that metadata must itself be kept consistent.

Secondary indexes become a design decision. A **local index** lives on each partition and indexes only that partition's data: writes stay local, but a query by the indexed attribute must **scatter** to every partition and **gather** the results, with tail latency set by the slowest. A **global index** is itself partitioned by the indexed value: reads go to one place, but a write may touch a different partition from the row's, needing a distributed transaction or accepting asynchronous (eventually consistent) index updates.

A transaction spanning partitions needs **atomic commit** across machines. **Two-phase commit** has a coordinator ask every participant to **prepare** (write a durable prepare record, promise to commit), then, if all vote yes, log the decision and tell everyone to **commit**. Its weakness is that a participant that has voted yes is **blocked** until it hears the decision; if the coordinator crashes, locks are held indefinitely. Modern systems (Spanner, CockroachDB) make the coordinator's decision itself a consensus-replicated log entry and each participant a Raft group, so no single failure blocks, at the cost of several round trips per commit. PostgreSQL exposes raw 2PC through \`PREPARE TRANSACTION\` for external coordinators.

**CAP** is often misstated. It says only that during a **network partition** a system must choose between refusing some requests (consistency, in the linearizable sense) and serving possibly stale data (availability); when there is no partition the trade-off is latency versus consistency, which **PACELC** adds. The practical use is to decide, per operation, which failure you prefer. Read the CS186 and 15-445 distributed lectures, the PostgreSQL 2PC page and Jepsen's consistency map, then run the partitioning and 2PC simulations.`,
          resources: [
            {
              title: 'CMU 15-445 (Fall 2024) — Lectures 22-23: Distributed OLTP and OLAP Database Systems',
              url: 'https://15445.courses.cs.cmu.edu/fall2024/schedule.html',
              type: 'lecture',
              cost: 'free',
              provider: 'Carnegie Mellon University',
              primary: true,
            },
            {
              title: 'PostgreSQL documentation — PREPARE TRANSACTION (two-phase commit)',
              url: 'https://www.postgresql.org/docs/current/sql-prepare-transaction.html',
              type: 'documentation',
              cost: 'free',
              provider: 'PostgreSQL',
            },
            {
              title: 'Jepsen — Consistency models',
              url: 'https://jepsen.io/consistency',
              type: 'article',
              cost: 'free',
              provider: 'Jepsen',
              note: 'Also browse the analyses of real databases to see what partition tolerance costs in practice.',
            },
            {
              title: 'Bigtable: A Distributed Storage System for Structured Data (OSDI 2006)',
              url: 'https://research.google/pubs/bigtable-a-distributed-storage-system-for-structured-data/',
              type: 'article',
              cost: 'free',
              provider: 'Google Research',
              note: 'Range partitioning into tablets, the metadata hierarchy for routing, and tablet splitting.',
            },
          ],
          exercises: [
            {
              slug: 'partitioning-simulator',
              title: 'Range versus hash partitioning under skew',
              prompt:
                'Simulate 8 partitions receiving 10^6 writes with keys that are (a) uniform random, (b) sequential timestamps, (c) Zipf-skewed user IDs. Implement range partitioning with split-on-size and hash partitioning with 64 virtual partitions. Report per-partition load (max/mean) for each combination, the data moved when a 9th node is added, and the cost of a range query of 1000 consecutive keys under each scheme (partitions touched).',
              kind: 'simulation',
              difficulty: 2,
            },
            {
              slug: 'two-phase-commit',
              title: 'Two-phase commit with crash injection',
              prompt:
                'Implement a 2PC coordinator and participants as processes over sockets, each with a durable log, transferring value between accounts on different participants. Inject crashes of a participant before and after prepare, and of the coordinator after collecting votes but before logging the decision. Show which cases recover automatically on restart and which leave a participant blocked holding locks, and measure commit latency versus a single-node transaction. Then run the same transfer with PostgreSQL PREPARE TRANSACTION across two databases.',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'secondary-index-strategies',
              title: 'Local versus global secondary indexes',
              prompt:
                'Over your partition simulator add a secondary index on a non-key attribute two ways: local per partition and global partitioned by attribute value. For a workload of 70 percent writes and 30 percent lookups by the attribute, measure partitions touched per operation and simulated latency (max of parallel calls) for each, at 8 and 64 partitions. Recommend one for a write-heavy system and one for a read-heavy system and justify.',
              kind: 'simulation',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does range partitioning on a timestamp key create a hot spot and how is it mitigated?',
              answerOutline:
                'All new writes have the largest keys and land on the last partition. Mitigate by prefixing the key with a hash or a source identifier (at the cost of range queries) or by splitting and moving the hot range aggressively.',
            },
            {
              question: 'What is the blocking problem in two-phase commit?',
              answerOutline:
                'After voting yes, a participant must hold its locks until it learns the outcome; if the coordinator fails before broadcasting the decision, participants cannot safely commit or abort and wait indefinitely.',
            },
            {
              question: 'What does the CAP theorem actually constrain?',
              answerOutline:
                'Only behaviour during a network partition: a system cannot be both linearizably consistent and fully available then. Without partitions the trade-off is latency versus consistency (PACELC).',
            },
          ],
        },
      ],
    },
    {
      slug: 'beyond-relational',
      title: 'Beyond Relational',
      description:
        'The systems that give up parts of the relational model for a purpose: key-value and document stores, column-oriented analytical engines, graph databases, and how to choose among them.',
      lessons: [
        {
          slug: 'key-value-and-document-stores',
          title: 'Key-value and document stores',
          summary:
            'The simplest data models and why they scale: key-value APIs, document databases with flexible schemas, and the relational features (joins, transactions) you give up or get back.',
          estimatedMinutes: 90,
          objectives: [
            'Describe the key-value data model, its operations and the consistency and durability options stores offer',
            'Explain the document model, embedding versus referencing, and how it maps to application objects',
            'Compare schema-on-read with schema-on-write and the costs of each as data evolves',
            'Use JSON columns in PostgreSQL and SQLite as a document store and index them',
          ],
          concepts: [
            'Key-value: get, put, delete; opaque values',
            'Caches (Redis-style) vs durable stores',
            'Document model: nested JSON, embedding vs referencing',
            'Schema-on-read and schema evolution',
            'Denormalisation and data locality in documents',
            'Single-document atomicity; multi-document transactions',
            'JSON/JSONB in relational databases and GIN indexes',
          ],
          explanation: `A **key-value store** exposes the smallest useful API: get, put and delete on opaque values by key. Because every operation touches one key, the data partitions trivially (hash the key), replicates easily and runs at memory speed; it is the model of caches (Redis, Memcached), session stores and the storage layer under many larger systems (RocksDB inside CockroachDB, TiKV, and the LSM tree you built). The price is that the database knows nothing about the values: no queries by content, no joins, no constraints, and any relationship between keys is the application's problem. You already built two of these in the storage module.

A **document store** keeps structured values, typically JSON, and can query inside them. The document model matches application objects directly: an order with its line items nested as an array is one document, read and written in one operation, stored together on disk (**locality**). The design question is **embedding versus referencing**: embed data that is owned by and always loaded with the parent (line items), reference data that is shared or changes independently (the product catalogue), because embedded copies must be updated everywhere when the source changes. That is denormalisation with the same risks as in the relational world.

Documents are **schema-on-read**: the database does not enforce a shape, so a collection accumulates documents written by every version of the application, and every reader must handle every historical shape. That is flexible for early development and expensive later; mature deployments add validation rules back. Transactions historically covered a single document (atomic replacement), which is enough when the document is the aggregate; multi-document transactions now exist in the major systems at a performance cost.

The relational databases have absorbed the model: PostgreSQL's \`jsonb\` stores binary JSON with path operators, **GIN indexes** make containment queries fast, and SQLite's JSON functions do the same in a single file. For most applications a relational core with JSON columns for genuinely variable data is the best of both. Read the MongoDB data modelling pages (vendor documentation but clear on embedding versus referencing) and the PostgreSQL JSON types chapter, then model the same domain three ways in the exercises.`,
          resources: [
            {
              title: 'PostgreSQL documentation — 8.14 JSON Types (json and jsonb, operators, indexing)',
              url: 'https://www.postgresql.org/docs/current/datatype-json.html',
              type: 'documentation',
              cost: 'free',
              provider: 'PostgreSQL',
              primary: true,
            },
            {
              title: 'SQLite documentation — JSON Functions and Operators',
              url: 'https://www.sqlite.org/json1.html',
              type: 'documentation',
              cost: 'free',
              provider: 'SQLite',
            },
            {
              title: 'MongoDB Manual — introduction and data modelling',
              url: 'https://www.mongodb.com/docs/manual/',
              type: 'documentation',
              cost: 'free',
              provider: 'MongoDB',
              note: 'The "Data Modeling" section on embedding vs referencing; the Community edition is free to run.',
            },
            {
              title: 'Dynamo: Amazon\'s Highly Available Key-value Store (SOSP 2007)',
              url: 'https://www.allthingsdistributed.com/files/amazon-dynamo-sosp2007.pdf',
              type: 'article',
              cost: 'free',
              provider: 'Amazon',
              note: 'Section 2 on why a key-value interface was chosen over a relational one for the shopping cart.',
            },
          ],
          exercises: [
            {
              slug: 'three-models-one-domain',
              title: 'One domain, three models',
              prompt:
                'Model orders with customers, line items and products (a) relationally in normalised tables, (b) as documents in PostgreSQL jsonb with line items embedded and products referenced, (c) as key-value pairs in your Bitcask or in Redis with the application maintaining secondary structures. Implement "place order", "get order with product names", "rename a product" and "top products by revenue this month" against all three. Compare lines of application code, queries needed, and how each handles the rename.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'jsonb-indexing',
              title: 'Index a JSON column',
              prompt:
                'Load 10^6 events with varied JSON payloads into a PostgreSQL jsonb column. Time containment queries (@>) and path equality queries with no index, with a GIN index (default and jsonb_path_ops), and with an expression B-tree index on one extracted field. Report query time, index size and insert throughput for each. Repeat the path-equality query in SQLite with json_extract and an expression index.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'schema-evolution-cost',
              title: 'Schema-on-read over time',
              prompt:
                'Write three versions of an application that each write a slightly different document shape (field renamed, nested object introduced, type changed from string to number). Mix 10^5 documents from all three versions. Write the reader that must handle all shapes, then a migration that normalises them, and time both. Discuss when you would pay the migration cost versus keep the tolerant reader, and add a validation rule that prevents a fourth shape.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'When should data be embedded in a document rather than referenced?',
              answerOutline:
                'When it is owned by the parent, always loaded with it, and not shared or updated independently; shared or independently changing data should be referenced to avoid update anomalies.',
            },
            {
              question: 'What does a key-value store give up relative to a relational database?',
              answerOutline:
                'Queries by value, joins, constraints, secondary indexes (unless added) and multi-key transactions; in exchange it gets trivial partitioning, replication and very low latency.',
            },
            {
              question: 'What is schema-on-read and what is its long-term cost?',
              answerOutline:
                'The store enforces no structure; readers interpret shape at read time. Over time every reader must handle every historical shape, pushing complexity into application code until validation or migration is added.',
            },
          ],
        },
        {
          slug: 'column-stores-and-analytics',
          title: 'Column stores and analytical query processing',
          summary:
            'Why analytical workloads store data by column: compression, vectorised execution, late materialisation, and the OLTP versus OLAP divide including data warehouses and lakehouses.',
          estimatedMinutes: 100,
          objectives: [
            'Contrast OLTP and OLAP workloads and explain why each favours a different storage layout',
            'Explain columnar compression (run-length, dictionary, bit-packing) and why it speeds queries, not just saves space',
            'Describe vectorised execution and late materialisation in a column store',
            'Run the same analytical queries on a row store and a column store (DuckDB) and explain the measured difference',
          ],
          concepts: [
            'OLTP vs OLAP; row store vs column store',
            'N-ary storage model vs decomposition storage model',
            'Compression: RLE, dictionary, bit-packing, delta; operating on compressed data',
            'Vectorised execution and SIMD',
            'Late materialisation',
            'Zone maps / min-max indexes and partition pruning',
            'Star schemas, data warehouses, ETL/ELT',
            'Open columnar formats (Parquet) and lakehouses',
          ],
          explanation: `Transaction processing (**OLTP**) touches a few whole rows at a time: insert an order, read a customer. Analytics (**OLAP**) touches a few *columns* of millions of rows: average order value by month. A **row store** lays out each tuple contiguously, ideal for the first; for the second it reads every byte of every row to use two columns, wasting 90 percent of I/O and cache. A **column store** keeps each column in its own contiguous array (the decomposition storage model), so an aggregate over two columns reads only those two.

The layout enables **compression** far beyond what rows allow, because a column's values are similar: **run-length encoding** collapses sorted or repetitive columns to (value, count) pairs, **dictionary encoding** replaces strings with small integers, **bit-packing** and **delta encoding** shrink integers. Compression saves disk, but the real win is that the engine can **operate directly on compressed data**, comparing dictionary codes instead of strings and skipping whole runs, so less memory bandwidth per row processed. **Zone maps** store min and max per block so predicates skip blocks entirely.

Execution is **vectorised**: operators process a batch of a few thousand values from one column in a tight loop, which the CPU pipelines and SIMD units accelerate; the iterator model's per-tuple overhead would swamp it. **Late materialisation** keeps columns separate for as long as possible, filtering by position and only assembling rows at the end for the few that survive.

Analytical systems are organised around these ideas at every scale: a data **warehouse** with a **star schema** (a fact table of events with foreign keys to dimension tables) loaded by **ETL**; columnar file formats (**Parquet**) in object storage queried by engines like DuckDB, Spark or Trino, the "lakehouse"; and embedded column stores for local analysis. The practical rule is to run OLTP and OLAP on different systems, or at least different replicas, because their access patterns conflict in the buffer pool and the lock manager.

Read the column-store survey (Abadi, Boncz, Harizopoulos, Idreos, Madden) at least through the compression and execution sections, and the 15-445 OLAP lecture, then run the comparison experiment with DuckDB against PostgreSQL or SQLite on the same data.`,
          resources: [
            {
              title: 'Abadi et al. — The Design and Implementation of Modern Column-Oriented Database Systems (2013)',
              url: 'https://web.archive.org/web/2023/https://stratos.seas.harvard.edu/files/stratos/files/columnstoresfntdbs.pdf',
              type: 'article',
              cost: 'free',
              provider: 'Foundations and Trends in Databases (author copy)',
              note: 'Chapters 1-4: history, architecture, compression, vectorised execution and late materialisation.',
              primary: true,
            },
            {
              title: 'CMU 15-445 (Fall 2024) — Lecture 5: Storage Models and Compression; Lecture 23: Distributed OLAP',
              url: 'https://15445.courses.cs.cmu.edu/fall2024/schedule.html',
              type: 'lecture',
              cost: 'free',
              provider: 'Carnegie Mellon University',
            },
            {
              title: 'DuckDB documentation',
              url: 'https://duckdb.org/docs/',
              type: 'documentation',
              cost: 'free',
              provider: 'DuckDB',
              note: 'An embedded column store with a Python API; read the "Why DuckDB" and the Parquet pages.',
            },
            {
              title: 'Bigtable: A Distributed Storage System for Structured Data (OSDI 2006)',
              url: 'https://research.google/pubs/bigtable-a-distributed-storage-system-for-structured-data/',
              type: 'article',
              cost: 'free',
              provider: 'Google Research',
              note: 'Column families and locality groups: a wide-column design that is often confused with a column store; note the difference.',
            },
          ],
          exercises: [
            {
              slug: 'row-vs-column-benchmark',
              title: 'Row store versus column store, measured',
              prompt:
                'Generate a 2 x 10^7-row fact table (date, store_id, product_id, quantity, price, 10 filler columns) and load it into SQLite or PostgreSQL and into DuckDB, and export to Parquet. Run five analytical queries (aggregate by month, top products, filter-heavy sum, a join to a dimension table, a full-row point lookup by primary key) on each. Report times and bytes read where available. Explain each ratio in terms of columns touched, compression and execution model, including the one query where the row store wins.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'columnar-compression',
              title: 'Implement columnar compression and compute on it',
              prompt:
                'Store a 10^7-value column four ways in NumPy: raw int64, dictionary-encoded strings, run-length encoded (sorted data), and bit-packed small integers. Implement sum and a predicate count directly on each encoding without decompressing where possible. Report size and query time for each versus raw. Add a zone map (min/max per 65,536-value block) and show a selective range predicate skipping most blocks.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'star-schema',
              title: 'Build a star schema and compare with the normalised source',
              prompt:
                'From your ledger or the Chinook database, design a star schema (fact: sales; dimensions: date, customer, track/product with denormalised attributes) and an ETL script to load it in DuckDB. Write five business questions as queries against both the normalised source and the star schema; compare query complexity (joins) and time. Explain why the dimensional model is preferred for analytics despite the redundancy.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does a column store speed up aggregates even when the data fits in memory?',
              answerOutline:
                'Only the needed columns move through the memory hierarchy, compressed data reduces bandwidth, and vectorised loops over contiguous arrays exploit cache lines, pipelining and SIMD.',
            },
            {
              question: 'What is late materialisation?',
              answerOutline:
                'Processing columns separately (filtering by position lists) and reconstructing full tuples only at the end for the rows that survive, avoiding assembling rows that will be discarded.',
            },
            {
              question: 'Why keep OLTP and OLAP on separate systems?',
              answerOutline:
                'Their access patterns conflict: analytical scans flood the buffer pool and hold long snapshots or locks, hurting transaction latency, while row layouts and indexes tuned for OLTP are slow for scans; different storage layouts suit each.',
            },
          ],
        },
        {
          slug: 'graph-databases-and-choosing-a-store',
          title: 'Graph databases, search and choosing the right store',
          summary:
            'Property graphs and traversal queries, when a graph database beats recursive SQL, full-text and specialised indexes, and a decision procedure for picking a data store.',
          estimatedMinutes: 90,
          objectives: [
            'Describe the property graph model and write traversal queries in Cypher',
            'Compare graph traversal with recursive SQL over an edge table and measure where each wins',
            'Explain inverted indexes for full-text search and when a dedicated search engine is warranted',
            'Apply a decision procedure for choosing a data store from workload, consistency and operational requirements',
          ],
          concepts: [
            'Property graph: nodes, relationships, labels, properties',
            'Index-free adjacency and traversal cost',
            'Cypher pattern matching; variable-length paths',
            'Graph queries in SQL: edge tables and recursive CTEs',
            'Inverted index; full-text search in PostgreSQL and SQLite FTS',
            'Polyglot persistence and its operational cost',
            'Decision criteria: data shape, query shape, consistency, scale, team',
          ],
          explanation: `Some data is mostly relationships: social networks, dependency graphs, fraud rings, knowledge graphs, recommendation paths. Stored relationally as an edge table, a query like "friends of friends who bought this product" is a chain of joins or a recursive CTE whose cost grows with the whole table's size at each hop. A **graph database** stores a **property graph** (nodes and relationships, each with labels and properties) with **index-free adjacency**: each node holds direct references to its neighbours, so a traversal costs time proportional to the neighbourhood explored, not the graph size. Query languages like **Cypher** express patterns to match (\`(a:Person)-[:FRIEND*1..3]->(b)\`) rather than joins to perform, and variable-length paths and shortest-path functions are native.

The honest comparison: for one or two hops with good indexes, PostgreSQL with an edge table is as fast and far better understood operationally; for deep, variable-length traversals on large graphs, a graph store wins by orders of magnitude; for whole-graph analytics (PageRank, community detection) neither is ideal and a graph processing framework is. Measure before choosing, as the exercise has you do.

**Search** is another specialised shape. Finding documents containing words needs an **inverted index** from term to posting list of documents, with stemming, ranking (BM25) and phrase handling. PostgreSQL's full-text search and SQLite's FTS5 provide this inside the database and are enough for most applications; a dedicated engine (Elasticsearch, OpenSearch, Meilisearch) adds relevance tuning, faceting and horizontal scale at the cost of a second system to keep consistent with the first.

That cost is the theme of choosing a store. **Polyglot persistence**, a different database per need, multiplies operational burden: backups, upgrades, monitoring, consistency across systems, expertise. A decision procedure: start from the **query shapes** and **data shape** (relational, document, key-value, graph, time series, text); then the **consistency** the business needs per operation; then **scale** actually projected, not imagined; then the **team's** ability to operate it. The default answer for a new system is a single relational database with JSON columns, full-text search and, if needed, read replicas, until a measured workload proves it insufficient. Read the Cypher manual's introduction and the PostgreSQL full-text chapter, then run the graph comparison and write the decision document.`,
          resources: [
            {
              title: 'Neo4j Cypher Manual — Introduction',
              url: 'https://neo4j.com/docs/cypher-manual/current/',
              type: 'documentation',
              cost: 'free',
              provider: 'Neo4j',
              note: 'Neo4j Community Edition is free to run locally; read the patterns and the MATCH clause sections.',
              primary: true,
            },
            {
              title: 'PostgreSQL documentation — Chapter 12: Full Text Search',
              url: 'https://www.postgresql.org/docs/current/textsearch.html',
              type: 'documentation',
              cost: 'free',
              provider: 'PostgreSQL',
            },
            {
              title: 'PostgreSQL documentation — 7.8 WITH Queries (recursive queries over edge tables)',
              url: 'https://www.postgresql.org/docs/current/queries-with.html',
              type: 'documentation',
              cost: 'free',
              provider: 'PostgreSQL',
            },
            {
              title: 'Designing Data-Intensive Applications (Kleppmann) — Chapter 2: Data Models and Query Languages',
              url: 'https://dataintensive.net/',
              type: 'textbook',
              cost: 'paid',
              provider: "O'Reilly",
              note: 'Optional; the relational vs document vs graph comparison. The free documentation above covers the mechanics.',
            },
          ],
          exercises: [
            {
              slug: 'graph-vs-recursive-sql',
              title: 'Graph traversal: Cypher versus recursive SQL',
              prompt:
                'Generate a social graph of 10^5 nodes and 10^6 edges (a power-law degree distribution). Load it into PostgreSQL as an edge table with indexes and into Neo4j Community. For 100 random start nodes measure: 1-hop neighbours, 3-hop friends-of-friends count, shortest path between two random nodes, and a 5-hop variable-length pattern. Report timings per query shape for both systems and explain the crossover in terms of index-free adjacency versus join cost.',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'full-text-search',
              title: 'Full-text search in the database',
              prompt:
                'Load 10^5 text documents (any public corpus) into PostgreSQL with a tsvector column and GIN index, and into SQLite with FTS5. Implement search with ranking, phrase queries and prefix matching. Measure query latency and index size, and compare the ranking of ten queries between the two. Write 150 words on what a dedicated search engine would add and what it would cost operationally.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'choose-a-store',
              title: 'Choose a store for five systems',
              prompt:
                'For (a) a bank ledger, (b) a product catalogue with highly variable attributes, (c) a real-time leaderboard, (d) a fraud-detection system over payment networks, (e) a clickstream analytics pipeline at 10^9 events per day: apply the decision procedure (query shapes, data shape, consistency, scale, team), choose a primary store and any secondary systems, and write one page per system with the trade-offs and the point at which you would revisit the choice. Where you choose a second system, state how it stays consistent with the first.',
              kind: 'writing',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What is index-free adjacency and what does it make cheap?',
              answerOutline:
                'Each node stores direct pointers to its relationships, so following an edge is a pointer dereference; traversal cost depends on the subgraph explored, not on total graph size or index lookups per hop.',
            },
            {
              question: 'When is a recursive CTE over an edge table good enough?',
              answerOutline:
                'For shallow (1-3 hop) or bounded traversals on moderately sized graphs with indexes on both edge columns, especially when the rest of the data is relational and operational simplicity matters.',
            },
            {
              question: 'What is the main cost of polyglot persistence?',
              answerOutline:
                'Operational burden and cross-system consistency: each store needs backups, upgrades, monitoring and expertise, and data duplicated across stores must be kept in sync, usually asynchronously.',
            },
          ],
        },
      ],
    },
  ],
  capstone: {
    slug: 'relational-engine-or-benchmarked-application',
    title: 'Capstone: a small relational engine, or a benchmarked data-backed application',
    description: `Choose one of two tracks.

**Track A: build a relational engine.** Starting from scratch (Python, Rust, C++ or Go), implement a storage manager with fixed-size pages on disk, a buffer pool with LRU-K or clock replacement, a slotted-page heap file with tuple insert/delete/update, a B+ tree index supporting point and range lookups with node splits and merges, an iterator-model executor with sequential scan, index scan, filter, projection, nested-loop and hash join, sort and aggregate, a parser for a useful SQL subset (CREATE TABLE, INSERT, SELECT with WHERE/JOIN/GROUP BY/ORDER BY), a simple cost-based choice between scan and index scan, and write-ahead logging with redo recovery. Test every layer against SQLite on the same workload, inject crashes and prove recovery, and benchmark scans, point lookups, joins and inserts as a function of data size with the buffer pool hit rate reported.

**Track B: build a benchmarked application.** Build a complete application over PostgreSQL with a normalised schema of at least ten tables, migrations, a transactional API (correct under concurrency, verified with a stress test and the right isolation level), full-text or JSON features where they fit, a read replica with measured lag, and a benchmark suite with pgbench-style custom scripts that reports throughput and p99 latency under increasing concurrency, before and after tuning (indexes, query rewrites, connection pooling, configuration). Document every tuning decision with EXPLAIN ANALYZE evidence.

Either track ends with a report: architecture, correctness evidence, benchmark methodology and results, and an honest limitations section.`,
    deliverables: [
      'Repository with tests at every layer (engine) or for every endpoint and transaction (application)',
      'Benchmark scripts and plots: throughput and latency versus data size or concurrency',
      'Crash-recovery demonstration (engine) or concurrency-anomaly test suite with isolation levels (application)',
      'An 8-12 page report with architecture diagrams, methodology, results and limitations',
    ],
    estimatedHours: 35,
    stretchGoals: [
      'Engine: add MVCC snapshot isolation with a garbage collector for old versions and show readers never block writers',
      'Engine: add a hash index and a sort-merge join and let the optimiser choose by cost',
      'Application: shard the largest table across two PostgreSQL instances with application-level routing and measure the cross-shard query penalty',
    ],
  },
  masteryChecklist: [
    'I can model a domain with an ER diagram, translate it to a normalised schema with constraints, and justify every key and referential action',
    'I can write any reporting query with joins, aggregation, subqueries, window functions and recursive CTEs, and predict its row count',
    'I can read EXPLAIN ANALYZE output, choose indexes that match the workload and explain why the planner did what it did',
    'I can explain how tuples are stored in pages, how a buffer pool decides what to evict, and how a B+ tree serves point and range queries',
    'I can describe the iterator model, the join algorithms and their costs, and how a cost-based optimiser enumerates plans',
    'I can define serializability, explain two-phase locking and MVCC, name the anomalies each isolation level allows, and choose the right level for a transaction',
    'I can explain write-ahead logging and ARIES-style recovery and demonstrate that a system recovers correctly from a crash',
    'I can compare replication and partitioning strategies and the consistency guarantees they provide',
    'I can choose between relational, key-value, document, column-oriented and graph stores for a workload and explain the trade-off',
    'I have built a working storage and query engine, or a benchmarked production-shaped application, and measured it honestly',
  ],
});
