import { defineSubject } from '../define';
import type { ResourceInput } from '../types';

/*
 * Genetics, following the topics of UIC BIOS 220 (Genetics). Conventions used in every lesson:
 *   gene and allele symbols in italics (*A*, *a*, *lacZ*); proteins in roman (LacZ, β-galactosidase)
 *   DNA sequences written 5′→3′ unless both ends are marked
 *   "+" is the wild-type allele; map distances in centimorgans (cM), 1 cM = 1 % recombination
 *   chi-square critical values at α = 0.05: 3.841 (df 1), 5.991 (df 2), 7.815 (df 3), 9.488 (df 4)
 */

const UIC = 'https://bio.libretexts.org/Courses/University_of_Illinois_Chicago/BIOS_220%3A_Introduction_to_Genetics';

const uic = (path: string, title: string, note: string, primary = false): ResourceInput => ({
  title: `UIC BIOS 220 open text, ${title}`,
  url: `${UIC}/${path}`,
  type: 'textbook',
  cost: 'free',
  provider: 'LibreTexts, written for UIC BIOS 220 by Jennifer Yeack',
  note,
  primary,
});

const ostx = (slug: string, title: string, note: string, primary = false): ResourceInput => ({
  title: `OpenStax Biology 2e, ${title}`,
  url: `https://openstax.org/books/biology-2e/pages/${slug}`,
  type: 'textbook',
  cost: 'free',
  provider: 'OpenStax',
  note,
  primary,
});

const oog = (path: string, title: string, note: string): ResourceInput => ({
  title: `Online Open Genetics, ${title}`,
  url: `https://bio.libretexts.org/Bookshelves/Genetics/Online_Open_Genetics_(Nickle_and_Barrette-Ng)/${path}`,
  type: 'textbook',
  cost: 'free',
  provider: 'LibreTexts (Nickle and Barrette-Ng)',
  note,
});

const mit703 = (page: string, title: string, note: string): ResourceInput => ({
  title: `MIT 7.03 Genetics (Fall 2004): ${title}`,
  url: `https://ocw.mit.edu/courses/7-03-genetics-fall-2004/${page}`,
  type: page.includes('lecture') ? 'lecture' : 'problem-set',
  cost: 'free',
  provider: 'MIT OpenCourseWare',
  note,
});

const griffiths = (note: string): ResourceInput => ({
  title: 'Griffiths et al., An Introduction to Genetic Analysis, 7th edition',
  url: 'https://www.ncbi.nlm.nih.gov/books/NBK21766/',
  type: 'textbook',
  cost: 'free',
  provider: 'NCBI Bookshelf (W. H. Freeman)',
  note,
});

const paper = (url: string, title: string, provider: string, note: string): ResourceInput => ({
  title,
  url,
  type: 'article',
  cost: 'free',
  provider,
  note,
});

const learn = (path: string, title: string, note: string): ResourceInput => ({
  title: `Learn.Genetics: ${title}`,
  url: `https://learn.genetics.utah.edu/content/${path}`,
  type: 'interactive',
  cost: 'free',
  provider: 'Genetic Science Learning Center, University of Utah',
  note,
});

const db = (url: string, title: string, provider: string, note: string): ResourceInput => ({
  title,
  url,
  type: 'dataset',
  cost: 'free',
  provider,
  note,
});

const M1 = '01%3A_Module_1';
const M2 = '02%3A_Module_2';
const M3 = '03%3A_Module_3/3.01%3A_Inheritance';
const M4 = '04%3A_Genetic_Technology';

export default defineSubject({
  id: 'genetics',
  title: 'Genetics',
  category: 'biology',
  tagline:
    'How genes are built, copied, expressed, regulated and inherited: Mendelian crosses and pedigrees, linkage maps, chromosome mutations, bacterial and phage genetics, genomics and CRISPR, and the genetics of populations, taught as reasoning from crosses and data.',
  description: `Genetics is the science of heredity and variation: how the information in DNA is copied, read and controlled inside a cell, and how it is passed from parents to offspring, through families and through whole populations. It is also a way of reasoning. A geneticist infers what genes are, where they lie and what they do from the ratios of offspring a cross produces, the pattern of a trait in a family, or the behaviour of mutants, often long before anyone can see the molecules.

This course follows the topics of BIOS 220, Genetics (3 credit hours), at the University of Illinois Chicago, which follows the introductory biology sequence BIOS 110 and BIOS 120. The module order follows the open textbook written for the UIC course by Jennifer Yeack, which covers gene and chromosome structure, gene expression and its regulation, mutation, inheritance patterns, and genomes and genetic engineering, starting from DNA and ending with genetic technology; population and quantitative genetics close the course. This is an original course built from those public descriptions. It is not affiliated with or endorsed by the University of Illinois Chicago.

Every idea is tied to the evidence for it: Griffith, Avery and Hershey-Chase for DNA as the genetic material, Meselson-Stahl for replication, Mendel's own counts, Morgan's white-eyed fly, Sturtevant's first map, Jacob and Monod's partial diploids and Benzer's fine-structure map. Worked examples derive ratios from gametes instead of quoting them, and every lesson names the mistakes students actually make: confusing genotype and phenotype ratios, treating epistasis as dominance, forgetting that recombination frequency cannot exceed about 50 %, or assuming Hardy-Weinberg proportions without testing them. Interactive diagrams let you run crosses, test ratios with chi-square, check pedigrees against each mode of inheritance, map genes from a three-point cross, mutate a gene and watch the protein change, build lac operon partial diploids and watch allele frequencies drift.

The main free readings are the UIC open text on LibreTexts and OpenStax *Biology 2e*, with *Online Open Genetics*, MIT OpenCourseWare 7.03 and the classic papers themselves. Real-data tasks use OMIM, NCBI Gene, ClinVar, gnomAD, the UCSC Genome Browser and Ensembl. Algebra and basic probability are the only mathematics needed; no programming is required.`,
  difficulty: 'intermediate',
  estimatedHours: 95,
  prerequisites: [],
  recommendedBackground: [
    'An introductory course in cell and organism biology (UIC lists BIOS 110 and BIOS 120): what a cell is, the difference between prokaryotes and eukaryotes, DNA as the genetic material, the outline of mitosis and meiosis, and the central dogma (DNA to RNA to protein) at a basic level. Module 1 reviews the minimum, so a motivated learner can start here.',
    'High-school algebra and fractions; probability is taught as needed (the probability-statistics course here covers it properly)',
    'Introductory chemistry helps with nucleotides, hydrogen bonds and enzymes but is not required',
  ],
  tags: ['genetics', 'biology', 'Mendelian inheritance', 'molecular biology', 'gene regulation', 'genomics', 'population genetics'],
  core: false,
  modules: [
    {
      slug: 'dna-genes-and-chromosomes',
      title: 'DNA, Genes and Chromosomes',
      description:
        'The physical basis of heredity, reviewed at the depth genetics needs: the experiments that identified DNA as the genetic material, the double helix, how DNA is packaged into chromosomes, and how it is copied.',
      lessons: [
        {
          slug: 'the-genetic-material',
          title: 'Genes, alleles and the evidence that DNA is the genetic material',
          summary:
            'The vocabulary of genetics (gene, locus, allele, genotype, phenotype) and the three experiments, Griffith, Avery-MacLeod-McCarty and Hershey-Chase, that showed genes are made of DNA.',
          estimatedMinutes: 90,
          objectives: [
            'Use gene, locus, allele, genotype, phenotype, wild type and mutant correctly',
            'Explain Griffith\'s transformation experiment and what it did and did not show',
            'Explain how Avery, MacLeod and McCarty used enzymes to identify the transforming principle',
            'Predict where each radioactive label goes in the Hershey-Chase experiment and interpret the result',
            'State the central dogma and its known exceptions',
          ],
          concepts: [
            'Gene, locus and allele',
            'Genotype versus phenotype',
            'Wild type (+) and mutant alleles',
            'Transformation (Griffith, 1928)',
            'Transforming principle destroyed only by DNase',
            'Hershey-Chase: ³²P in DNA, ³⁵S in protein',
            'Central dogma: DNA → RNA → protein',
            'Reverse transcription as an exception',
          ],
          explanation: `Genetics asks how information passes from parents to offspring and how it becomes a living organism. A few words carry the whole course. A **gene** is a unit of heredity, a stretch of DNA, that sits at a **locus** (a place) on a chromosome. Different versions of a gene are **alleles**: the pea gene for seed shape has a round allele *R* and a wrinkled allele *r*. A diploid carries two alleles at each locus; that pair is its **genotype** (*RR*, *Rr* or *rr*), and what you observe, a round or wrinkled seed, is its **phenotype**. The usual allele in natural populations is the **wild type**, written +; variants are **mutant** alleles. Keep the levels apart: *Rr* is one gene with two alleles, and two plants with the same phenotype can have different genotypes.

**Griffith (1928).** Smooth (S) *Streptococcus pneumoniae*, which have a polysaccharide capsule, killed mice; rough (R) cells did not, and heat-killed S cells did not. But heat-killed S cells mixed with live R cells killed the mice, and live S bacteria came out of them. Something in the dead cells had **transformed** R into S, and the change was inherited by the bacteria's descendants. Griffith did not know what the substance was.

**Avery, MacLeod and McCarty (1944)** purified the "transforming principle" and treated it with enzymes. Proteases and RNase left its activity intact; DNase destroyed it. The logic is elimination: destroy one candidate molecule at a time and see which loss abolishes the heritable change.

**Hershey and Chase (1952)** labelled phage T2 with ³⁵S, which is in protein but not DNA, or with ³²P, which is in DNA but not protein. After the phage attached to *E. coli*, a blender sheared the coats off. Most ³⁵S came off with the coats; most ³²P stayed with the cells, and some of it turned up in the progeny phage. The material that enters the cell and is passed on is DNA.

Neither experiment was airtight alone: Avery's DNA contained traces of protein, and some ³⁵S stuck to the cells. Together, with Chargaff's base ratios and the double helix (next lesson), they settled the question.

**The central dogma**, Crick's phrase, says information flows from DNA to RNA (transcription) to protein (translation), with DNA copied by replication. Retroviruses copy RNA into DNA with reverse transcriptase, so read it as a rule about which transfers happen, not a ban on every reverse step. Read UIC 1.1.1 and OpenStax 14.1, then look at the enzyme table in the Avery paper.`,
          resources: [
            uic(`${M1}/1.01%3A_What_is_DNA/1.1.01%3A_Historical_Basis_of_Modern_Understanding`, '1.1.1 Historical basis of modern understanding', 'The UIC course text on the experiments that identified DNA; read it first.', true),
            ostx('14-1-historical-basis-of-modern-understanding', '14.1 Historical basis of modern understanding', 'Griffith, Avery and Hershey-Chase with clear figures.'),
            paper('https://pmc.ncbi.nlm.nih.gov/articles/PMC2135445/', 'Avery, MacLeod and McCarty (1944), Studies on the chemical nature of the substance inducing transformation of pneumococcal types', 'Journal of Experimental Medicine, free on PubMed Central', 'The original paper. Read the summary and the enzyme experiments; notice how carefully the authors hedge.'),
            paper('https://pmc.ncbi.nlm.nih.gov/articles/PMC2147348/', 'Hershey and Chase (1952), Independent functions of viral protein and nucleic acid in growth of bacteriophage', 'Journal of General Physiology, free on PubMed Central', 'The blender experiment. Find the table that reports how much ³⁵S and ³²P is removed by blending.'),
          ],
          exercises: [
            {
              slug: 'griffith-predictions',
              title: 'Predict Griffith\'s and Avery\'s results',
              prompt: `For each injection, predict whether the mouse dies and whether live S bacteria are recovered: (a) live R; (b) live S; (c) heat-killed S; (d) heat-killed S + live R; (e) live R + an extract of heat-killed S treated with protease; (f) the same extract treated with RNase; (g) the same extract treated with DNase. Then write two sentences on what (e) to (g) add that (a) to (d) cannot show.`,
              kind: 'problem',
              difficulty: 1,
              hint: 'Only (b), (d), (e) and (f) kill the mouse and yield live S cells. Griffith shows that a heritable substance exists; the enzyme treatments identify which molecule it is, because only removing DNA abolishes transformation.',
            },
            {
              slug: 'hershey-chase-data',
              title: 'Interpret a labelling experiment',
              prompt: `In a repeat of the Hershey-Chase experiment, after blending and centrifugation, 82 % of the ³⁵S is in the supernatant (the phage coats) and 18 % in the pellet (the cells); for ³²P the figures are 25 % and 75 %. Among progeny phage, ³²P is easily detected and ³⁵S is near background. (a) Which label tracks the material that enters the cell? (b) Why is 18 % of the ³⁵S in the pellet not evidence that protein is genetic? (c) Which single observation is the strongest evidence, and why?`,
              kind: 'data-analysis',
              difficulty: 2,
              hint: 'Coats that are not sheared off pellet with the cells. Transfer to progeny is the decisive test: genetic material must be passed to the next generation.',
            },
            {
              slug: 'vocabulary-sort',
              title: 'Gene, allele, genotype, phenotype',
              prompt: `Classify each as gene, allele, locus, genotype or phenotype, and explain any you find ambiguous: (a) the ABO blood-group gene on chromosome 9; (b) the allele $I^B$; (c) type AB blood; (d) $I^A i$; (e) position 9q34.2; (f) the *CFTR* gene; (g) the ΔF508 version of *CFTR*; (h) salty sweat. Then give an example of two individuals with the same phenotype but different genotypes.`,
              kind: 'writing',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'What is the difference between a gene and an allele, and between a genotype and a phenotype?',
              answerOutline: 'A gene is a heritable unit at a locus; alleles are its alternative versions. A genotype is the alleles an individual carries; the phenotype is the observable trait, which depends on the genotype (and environment).',
            },
            {
              question: 'Why did the Avery experiment need enzymes rather than just purification?',
              answerOutline: 'Purified DNA could still contain traces of protein or RNA. Destroying each class of molecule separately showed that only DNase abolishes transforming activity.',
            },
            {
              question: 'In Hershey-Chase, why label with sulfur and phosphorus specifically?',
              answerOutline: 'Proteins contain sulfur (Met, Cys) and almost no phosphorus; DNA contains phosphorus in its backbone and no sulfur. Each isotope therefore marks only one kind of molecule.',
            },
          ],
          quiz: [
            {
              question: 'A pea plant has genotype *Yy* for seed colour and *Rr* for seed shape. How many genes and how many different alleles does this describe?',
              options: ['2 genes, 2 alleles', '4 genes, 4 alleles', '2 genes, 4 alleles', '1 gene, 4 alleles'],
              answer: 2,
              explanation:
                'Seed colour and seed shape are two genes (two loci); each has two alleles here (*Y*, *y* and *R*, *r*), four alleles in all. Counting each letter as a gene confuses alleles with genes.',
            },
            {
              question: 'A transforming extract from S cells is split three ways. Treated with trypsin (a protease) it still transforms R cells; treated with DNase it does not; treated with RNase it does. What do these results show?',
              options: [
                'The transforming principle is DNA; protein and RNA are not required for its activity',
                'The transforming principle is protein, since trypsin is the most thorough treatment',
                'Transformation needs DNA and RNA together',
                'Nothing, because the capsule is a polysaccharide',
              ],
              answer: 0,
              explanation:
                'Only removing DNA abolishes the activity, so the heritable information is in DNA. The capsule is the phenotype the genes produce, not the transforming substance itself.',
            },
            {
              question: 'Suppose, contrary to fact, that protein were the genetic material of phage T2. In a Hershey-Chase experiment, where would you then expect to find the label passed to progeny phage?',
              options: [
                '³²P in progeny phage, ³⁵S in the discarded coats',
                'Neither label, because labels are diluted',
                'Both labels equally',
                '³⁵S inside infected cells and in progeny phage',
              ],
              answer: 3,
              explanation:
                'If protein carried the information, labelled protein (³⁵S) would have to enter the cell and be passed on. The real result, ³²P entering and appearing in progeny, is the opposite pattern.',
            },
            {
              question: 'Two pea plants both have purple flowers. One is *PP* and the other *Pp*. Which statement is correct?',
              options: [
                'They have the same phenotype and different genotypes',
                'They have the same genotype and different phenotypes',
                'They have different phenotypes because *Pp* is a hybrid',
                'They must have the same genotype because purple is dominant',
              ],
              answer: 0,
              explanation:
                'Phenotype is what you see (purple in both); genotype is the allele pair (*PP* versus *Pp*). Dominance is exactly why different genotypes can share a phenotype.',
            },
          ],
        },
        {
          slug: 'dna-structure',
          title: 'The structure of DNA and RNA',
          summary:
            'Nucleotides, the sugar-phosphate backbone and 5′ to 3′ polarity, Chargaff\'s rules, the antiparallel double helix with complementary base pairs, and how RNA differs.',
          estimatedMinutes: 90,
          objectives: [
            'Draw a nucleotide and name its sugar, phosphate and base, and identify purines and pyrimidines',
            'Explain 5′ and 3′ ends and why the two strands of DNA are antiparallel',
            'Use Chargaff\'s rules to compute base composition and recognise single-stranded genomes',
            'Write the complementary and reverse-complementary strand of a sequence with correct polarity',
            'List the differences between DNA and RNA',
          ],
          concepts: [
            'Nucleotide: sugar, phosphate, base',
            'Purines (A, G) and pyrimidines (C, T, U)',
            'Phosphodiester bond and 5′→3′ polarity',
            'Chargaff\'s rules: A = T, G = C',
            'Antiparallel double helix (Watson, Crick, Franklin, Wilkins)',
            'A-T two hydrogen bonds, G-C three',
            'About 10.5 base pairs and 3.4 nm per turn',
            'RNA: ribose, uracil, usually single-stranded',
          ],
          explanation: `A DNA **nucleotide** has three parts: the sugar deoxyribose, a phosphate group and one of four bases. Adenine and guanine are two-ring **purines**; cytosine and thymine are one-ring **pyrimidines**. Nucleotides are joined by **phosphodiester bonds** from the 3′ carbon of one sugar to the 5′ carbon of the next, so a strand has a direction: a free 5′ phosphate at one end and a free 3′ hydroxyl at the other. Sequences are written 5′ to 3′ unless both ends are marked.

**The evidence for the double helix.** Erwin Chargaff found that in double-stranded DNA from any species, the amount of A equals T and G equals C, although the G + C fraction varies between species. Rosalind Franklin's X-ray photographs showed a helix with a 3.4 nm repeat and the phosphates on the outside. In 1953 Watson and Crick fitted these facts into a model: two **antiparallel** strands wound into a right-handed helix, bases paired inside, A with T by two hydrogen bonds and G with C by three. A purine always pairs with a pyrimidine, so the helix has a constant width, and each turn holds about 10.5 base pairs (0.34 nm per pair).

**Complementarity is the key to genetics.** Each strand determines the other, which is how DNA can be copied (lesson 4) and read. Write the partner of 5′-ATGCGTTA-3′ base by base and you get 3′-TACGCAAT-5′; written in the standard 5′ to 3′ direction, the **reverse complement** is 5′-TAACGCAT-3′. Forgetting to reverse is the commonest error in sequence problems.

**Chargaff calculations.** If double-stranded DNA is 22 % T, it is also 22 % A, leaving 56 % for G + C, so 28 % each. If a genome breaks the rules (A ≠ T or G ≠ C), it is single-stranded, as in phage φX174. G-C rich DNA has a higher melting temperature, because each G-C pair has three hydrogen bonds and, more importantly, stacks more strongly.

**RNA** differs in three ways: its sugar is ribose (with a 2′-OH that makes RNA less stable), it has uracil instead of thymine, and it is usually single-stranded, folding back on itself into hairpins. Read UIC 1.1.2 and OpenStax 14.2, then the one-page Watson-Crick paper; notice the famous understatement in its last paragraph about a copying mechanism.`,
          resources: [
            uic(`${M1}/1.01%3A_What_is_DNA/1.1.02%3A_The_Structure_of_DNA`, '1.1.2 The structure of DNA', 'The UIC course text on nucleotides and the double helix.', true),
            ostx('14-2-dna-structure-and-sequencing', '14.2 DNA structure and sequencing', 'Structure, base pairing and polarity with labelled figures.'),
            paper('https://www.nature.com/articles/171737a0', 'Watson and Crick (1953), Molecular structure of nucleic acids: a structure for deoxyribose nucleic acid', 'Nature', 'One page. Read it whole and find where Franklin\'s and Wilkins\'s data are acknowledged.'),
          ],
          exercises: [
            {
              slug: 'complementary-strands',
              title: 'Complementary and reverse-complementary strands',
              prompt: `For each strand, write the complementary strand with both ends labelled, then the reverse complement written 5′ to 3′: (a) 5′-GATTACA-3′; (b) 5′-AAGCTTCG-3′; (c) 3′-TTGACCA-5′. (d) Which of these sequences is its own reverse complement (a palindrome in the molecular sense): GAATTC, GATTAC, AAGCTT, ACGCGT? Show why.`,
              kind: 'problem',
              difficulty: 1,
              hint: '(a) complement 3′-CTAATGT-5′, reverse complement 5′-TGTAATC-3′. (c) is written 3′ to 5′, so its complement is 5′-AACTGGT-3′. GAATTC, AAGCTT and ACGCGT are palindromes; GATTAC reverse-complements to GTAATC.',
            },
            {
              slug: 'chargaff-table',
              title: 'Chargaff\'s data',
              prompt: `Base compositions (mol %, A, T, G, C) of four nucleic acids: sample 1: 30.9, 29.4, 19.9, 19.8; sample 2: 24.7, 23.6, 26.0, 25.7; sample 3: 25.0, 33.0, 24.0, 18.0; sample 4: 21.0, 0, 29.0, 22.0 (plus 28.0 U). (a) Which are double-stranded DNA, which single-stranded DNA and which RNA? (b) For the double-stranded samples, compute the G + C content and say which would melt at the higher temperature. (c) Why do Chargaff's equalities hold only approximately in real measurements?`,
              kind: 'data-analysis',
              difficulty: 2,
              hint: 'Samples 1 and 2 obey A ≈ T and G ≈ C; sample 3 does not (single-stranded DNA); sample 4 contains U (RNA). G + C is about 39.7 % for sample 1 and 51.7 % for sample 2.',
            },
            {
              slug: 'helix-dimensions',
              title: 'How long is a gene?',
              prompt: `Using 0.34 nm per base pair and 10.5 base pairs per turn: (a) how long, in micrometres, is the 4.6 × 10⁶ bp chromosome of *E. coli* if stretched out, and how many turns does it make? (b) The cell is about 2 µm long. By what factor must the DNA be compacted? (c) A human diploid nucleus holds about 6.2 × 10⁹ bp. What total length is that in metres?`,
              kind: 'problem',
              difficulty: 2,
              hint: '(a) 4.6 × 10⁶ × 0.34 nm = 1.56 × 10⁶ nm = 1564 µm (1.56 mm), about 4.4 × 10⁵ turns. (b) about 780-fold. (c) about 2.1 m.',
            },
          ],
          selfAssessment: [
            {
              question: 'Why must the two strands of DNA be antiparallel, and what does 5′ to 3′ refer to?',
              answerOutline: 'The numbers name carbons of the sugar; each strand runs from a 5′ phosphate end to a 3′ hydroxyl end. Complementary bases can pair with correct geometry only when the strands run in opposite directions.',
            },
            {
              question: 'What does a base composition with A ≠ T tell you?',
              answerOutline: 'The nucleic acid is not a complementary double helix: it is single-stranded (or RNA if U is present instead of T).',
            },
            {
              question: 'Give three differences between DNA and RNA.',
              answerOutline: 'Ribose versus deoxyribose (2′-OH), uracil instead of thymine, and RNA is usually single-stranded and less chemically stable.',
            },
          ],
          quiz: [
            {
              question: 'A sample of double-stranded DNA is 18 % guanine. What is its adenine content?',
              options: ['18 %', '64 %', '36 %', '32 %'],
              answer: 3,
              explanation:
                'G = C = 18 %, so G + C = 36 % and A + T = 64 %; with A = T, adenine is 32 %. The tempting 18 % pairs A with G, but A pairs with T.',
            },
            {
              question: 'What is the reverse complement, written 5′ to 3′, of 5′-CCGATG-3′?',
              options: ['5′-GGCTAC-3′', '5′-CATCGG-3′', '5′-GTAGCC-3′', '5′-CCGATG-3′'],
              answer: 1,
              explanation:
                'The complement base by base is 3′-GGCTAC-5′; read 5′ to 3′ it is 5′-CATCGG-3′. GGCTAC is the complement left in the 3′ to 5′ order but relabelled as 5′ to 3′; GTAGCC reverses the strand without complementing it.',
            },
            {
              question: 'A viral genome is A 25 %, T 33 %, G 24 %, C 18 %. What kind of genome is it?',
              options: [
                'Double-stranded DNA with an unusual G + C content',
                'RNA, because the values do not add to 100',
                'Single-stranded DNA',
                'Double-stranded RNA',
              ],
              answer: 2,
              explanation:
                'It contains T, so it is DNA, and A ≠ T and G ≠ C, so the strands are not paired: it is single-stranded. A double-stranded molecule must obey Chargaff\'s equalities whatever its G + C content.',
            },
            {
              question: 'A gene is 1500 base pairs long. About how long is it as B-form DNA?',
              options: ['5.1 µm', '0.51 µm', '143 nm', '51 nm'],
              answer: 1,
              explanation:
                '1500 × 0.34 nm = 510 nm = 0.51 µm. 143 nm divides by 10.5 (the number of turns) instead of multiplying by the rise per base pair.',
            },
          ],
        },
        {
          slug: 'chromosomes-and-genomes',
          title: 'Chromosomes, ploidy and genome organisation',
          summary:
            'How bacterial and eukaryotic genomes are packaged, from nucleosomes to mitotic chromosomes; centromeres, telomeres and karyotypes; homologous chromosomes versus sister chromatids; ploidy and DNA content.',
          estimatedMinutes: 90,
          objectives: [
            'Compare the organisation of bacterial and eukaryotic genomes, including plasmids',
            'Describe the nucleosome and the levels of chromatin packing, and contrast euchromatin with heterochromatin',
            'Distinguish homologous chromosomes from sister chromatids and count each through the cell cycle',
            'Use n, 2n and C-value notation to track chromosome number and DNA content',
            'Explain why genome size does not track organismal complexity (the C-value paradox)',
          ],
          concepts: [
            'Nucleoid and plasmids in bacteria',
            'Nucleosome: 147 bp around a histone octamer',
            'Euchromatin and heterochromatin',
            'Centromere, telomere, chromosome arms (p and q)',
            'Karyotype and sex chromosomes',
            'Homologous chromosomes versus sister chromatids',
            'Ploidy: n, 2n; C-value (DNA content)',
            'C-value paradox',
          ],
          explanation: `A bacterium such as *E. coli* has one circular chromosome of about 4.6 million base pairs, folded with proteins into a **nucleoid**, and often small circular **plasmids** that carry extra genes such as antibiotic resistance. Eukaryotes have several linear chromosomes in a nucleus, each one a single, very long DNA molecule.

**Packing.** Eukaryotic DNA is wrapped around **nucleosomes**: 147 bp of DNA coiled almost twice around an octamer of histones (two each of H2A, H2B, H3 and H4), with linker DNA between, like beads on a string. Nucleosomes fold into fibres, then loops anchored to a protein scaffold, and in mitosis into the compact chromosomes you see in a microscope. Loosely packed, gene-rich **euchromatin** is mostly active; densely packed **heterochromatin**, around centromeres and telomeres for example, is gene-poor and mostly silent. Packing is regulated, which matters again in the gene regulation module.

**Landmarks.** The **centromere** is where the spindle attaches; it divides a chromosome into a short arm (p) and a long arm (q), so 9q34 means band 34 on the long arm of chromosome 9. **Telomeres**, repeats of TTAGGG in humans, cap the ends. A **karyotype** is the set of chromosomes arranged by size and banding pattern; humans have 22 pairs of autosomes and XX or XY.

**Homologues versus sister chromatids.** This distinction underlies all of Mendelian genetics. The two copies of chromosome 7 in your cells are **homologous chromosomes**, one from each parent: same genes in the same order, possibly different alleles. After DNA replication, each chromosome consists of two **sister chromatids**, identical copies joined at the centromere. Sister chromatids carry the same alleles (barring mutation); homologues need not.

**Counting.** Ploidy *n* is the number of chromosomes in one set: human gametes are *n* = 23, body cells 2*n* = 46. DNA content is counted in **C** units, the amount in one unreplicated haploid set. A diploid cell in G1 has 2C; after S phase it has 4C but still 46 chromosomes, now as 92 chromatids. A gamete has 1C. Students often double the chromosome count at S phase: replication doubles the DNA and the chromatids, not the chromosomes.

**Genome size** varies enormously and does not track complexity: the human haploid genome is about 3.1 × 10⁹ bp with roughly 20,000 protein-coding genes, while some amoebae and lungfish have far more DNA. Most of the difference is repetitive and non-coding DNA. Read UIC 1.1.3 and OpenStax 10.1.`,
          resources: [
            uic(`${M1}/1.01%3A_What_is_DNA/1.1.03%3A_Genome_Organization`, '1.1.3 Genome organization', 'Packing of DNA in prokaryotes and eukaryotes.', true),
            ostx('10-1-cell-division', '10.1 Cell division', 'Genomic DNA, chromosomes, homologues and the levels of compaction.'),
            oog('02%3A_Chromosomes_Mitosis_and_Meiosis', 'Chapter 2, Chromosomes, mitosis and meiosis', 'A genetics-first treatment of chromosome structure and ploidy with practice questions.'),
            learn('basics/chromosomes/', 'What are chromosomes?', 'A short illustrated introduction if karyotypes are new to you.'),
          ],
          exercises: [
            {
              slug: 'count-chromosomes-chromatids',
              title: 'Count chromosomes, chromatids and DNA',
              prompt: `A plant has 2*n* = 14 and 1C = 4.0 pg of DNA. Give the number of chromosomes, the number of chromatids and the DNA content (pg) of: (a) a leaf cell in G1; (b) a leaf cell in G2; (c) the same cell at metaphase of mitosis; (d) each daughter cell just after mitosis; (e) a pollen nucleus (haploid, before it replicates). Present the answers as a table.`,
              kind: 'problem',
              difficulty: 1,
              hint: 'G1: 14 chromosomes, 14 chromatids, 8.0 pg. G2 and metaphase: 14 chromosomes, 28 chromatids, 16.0 pg. Daughter: back to G1 values. Pollen: 7, 7, 4.0 pg.',
            },
            {
              slug: 'read-a-karyotype',
              title: 'Read a karyotype description',
              prompt: `Explain in words what each of these descriptions means and which are normal: (a) 46,XX; (b) 47,XY,+21; (c) 45,X; (d) a gene mapped to 7q31.2; (e) 46,XY,del(5)(p15). For (d), say which arm and roughly where. Use OpenStax 13.2 or the UIC text on errors in meiosis if you need the notation.`,
              kind: 'reading',
              difficulty: 1,
            },
            {
              slug: 'c-value-paradox',
              title: 'Genome size and gene number',
              prompt: `Using Ensembl or NCBI Genome, find the assembled genome size and the number of protein-coding genes for *E. coli* K-12, *Saccharomyces cerevisiae*, *Drosophila melanogaster*, *Arabidopsis thaliana* and *Homo sapiens*. Plot genome size against gene number (by hand or in a spreadsheet, log scales). Compute genes per megabase for each, and write a paragraph explaining what the C-value paradox is and how non-coding and repetitive DNA resolve it.`,
              kind: 'data-analysis',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What is the difference between homologous chromosomes and sister chromatids?',
              answerOutline: 'Homologues are the maternal and paternal copies of a chromosome: same genes, possibly different alleles. Sister chromatids are the two identical copies made by replication, joined at the centromere.',
            },
            {
              question: 'Does S phase change the chromosome number? What does it change?',
              answerOutline: 'No; the chromosome number stays 2n. DNA content doubles (2C to 4C) and each chromosome now has two chromatids.',
            },
            {
              question: 'What is a nucleosome, and why does packaging matter for gene expression?',
              answerOutline: 'About 147 bp of DNA wrapped around a histone octamer. Tight packing (heterochromatin) makes DNA less accessible to transcription machinery, so packaging state helps control which genes are active.',
            },
          ],
          quiz: [
            {
              question: 'A species has 2*n* = 16. How many chromatids does one of its cells contain at metaphase of mitosis?',
              options: ['8', '16', '32', '64'],
              answer: 2,
              explanation:
                'There are still 16 chromosomes, each made of two sister chromatids after S phase: 32 chromatids. Answering 16 counts chromosomes; 64 doubles twice.',
            },
            {
              question: 'Which pair of structures must carry identical alleles at every locus (barring new mutation)?',
              options: [
                'The two homologues of chromosome 1',
                'The X and Y chromosomes of a male',
                'Chromosome 1 from the mother and chromosome 1 from the father',
                'The two sister chromatids of one replicated chromosome',
              ],
              answer: 3,
              explanation:
                'Sister chromatids are copies of one DNA molecule. Homologues come from different parents and may carry different alleles; that difference is what Mendelian segregation sorts out.',
            },
            {
              question: 'An animal\'s sperm contains 3.0 pg of DNA. How much DNA is in one of its liver cells in G2?',
              options: ['3.0 pg', '6.0 pg', '12 pg', '24 pg'],
              answer: 2,
              explanation:
                'Sperm are 1C = 3.0 pg. A diploid G1 cell is 2C = 6.0 pg, and after replication in G2 it is 4C = 12 pg. 6.0 pg forgets that S phase doubles the DNA.',
            },
          ],
        },
        {
          slug: 'dna-replication',
          title: 'DNA replication',
          summary:
            'The Meselson-Stahl experiment and semiconservative replication, the replication fork and its enzymes, leading and lagging strands, proofreading, and the end-replication problem solved by telomerase.',
          estimatedMinutes: 100,
          objectives: [
            'Predict the band pattern of the Meselson-Stahl experiment for the semiconservative, conservative and dispersive models in any generation',
            'Name the enzymes at a replication fork and state what each does',
            'Explain why one strand is made continuously and the other in Okazaki fragments',
            'Explain how proofreading and mismatch repair make replication accurate',
            'Explain the end-replication problem and how telomerase solves it',
          ],
          concepts: [
            'Semiconservative, conservative and dispersive models',
            'Meselson-Stahl: ¹⁵N/¹⁴N density gradient',
            'Origin, helicase, single-strand binding protein, topoisomerase',
            'Primase and RNA primers',
            'DNA polymerase III and I, ligase',
            'Leading strand and lagging strand (Okazaki fragments)',
            '3′→5′ exonuclease proofreading',
            'Telomeres and telomerase',
          ],
          explanation: `Watson and Crick noted that complementary strands suggest a copying mechanism: separate them and use each as a template. Three models were possible. **Semiconservative**: each daughter molecule has one old and one new strand. **Conservative**: the parent duplex stays intact and a wholly new duplex is made. **Dispersive**: old and new pieces are mixed in both strands.

**Meselson and Stahl (1958)** grew *E. coli* for many generations in ¹⁵N (heavy nitrogen), moved them to ¹⁴N, and sampled every generation. Caesium chloride density-gradient centrifugation separates DNA by density. After one generation all DNA formed a single band of hybrid (¹⁵N/¹⁴N) density, which rules out the conservative model (it predicts one heavy and one light band). After two generations there were two equal bands, hybrid and light, which rules out the dispersive model (it predicts one band, slightly lighter each time). The general rule: the two original heavy strands are never broken up, so after *g* generations, $2$ of the $2^g$ molecules are hybrid, a fraction $2^{1-g}$, and the rest are light. After three generations, $\\tfrac14$ hybrid and $\\tfrac34$ light.

**The fork.** Replication starts at **origins** (one in *E. coli*, thousands in a human cell) and proceeds in both directions. **Helicase** unwinds the duplex, single-strand binding proteins hold the strands apart, and **topoisomerase** relieves the twisting ahead of the fork. DNA polymerases can only add nucleotides to a 3′-OH, so they synthesise 5′ to 3′ and need a primer; **primase** lays down short RNA primers. Because the strands are antiparallel, one daughter strand (**leading**) is made continuously towards the fork while the other (**lagging**) is made away from it in **Okazaki fragments** (1000-2000 nt in bacteria, 100-200 in eukaryotes). In *E. coli*, DNA polymerase III does most synthesis, polymerase I replaces the RNA primers with DNA, and **ligase** seals the nicks.

**Accuracy.** Correct base pairing alone gives roughly one error per 10⁵ nucleotides. The polymerase's 3′→5′ **exonuclease** removes a mispaired base it has just added (proofreading), and mismatch repair (module 2) fixes most of what remains, giving about one error per 10⁹ to 10¹⁰ bases per replication.

**Speed.** An *E. coli* fork moves about 1000 nt per second, so two forks copy 4.6 × 10⁶ bp in about 2300 s, roughly 40 minutes. Eukaryotic forks are slower (tens of nucleotides per second), which is why large genomes need many origins.

**Ends.** On a linear chromosome the lagging strand cannot be completed at the very end once the last primer is removed, so chromosomes would shorten each division. **Telomerase** carries its own RNA template and extends the 3′ overhang with TTAGGG repeats; it is active in germ cells, stem cells and most cancers. Read UIC 1.2.2 and OpenStax 14.3 to 14.5, and look at the band photographs in the Meselson-Stahl paper.`,
          resources: [
            uic(`${M1}/1.02%3A_DNA_Replication/1.2.02%3A_DNA_Replication`, '1.2.2 DNA replication', 'The UIC course text on the replication fork.', true),
            ostx('14-3-basics-of-dna-replication', '14.3 Basics of DNA replication', 'The three models and the Meselson-Stahl experiment.'),
            ostx('14-4-dna-replication-in-prokaryotes', '14.4 DNA replication in prokaryotes', 'The enzymes at the fork; then read 14.5 for eukaryotes and telomerase.'),
            paper('https://pmc.ncbi.nlm.nih.gov/articles/PMC528642/', 'Meselson and Stahl (1958), The replication of DNA in Escherichia coli', 'PNAS, free on PubMed Central', 'Look at the photographs of the bands generation by generation and the authors\' careful conclusions.'),
          ],
          exercises: [
            {
              slug: 'meselson-stahl-predictions',
              title: 'Predict the bands',
              prompt: `Cells grown in ¹⁵N are moved to ¹⁴N. For generations 1, 2, 3 and 4, draw (or describe) the bands expected under each of the three models, giving the fraction of DNA in each band. Then suppose the experiment is run in reverse: cells grown for many generations in ¹⁴N are moved to ¹⁵N. What does semiconservative replication predict after two generations? Finally, explain how heating the generation-1 DNA to separate the strands before centrifuging would distinguish semiconservative from dispersive replication.`,
              kind: 'problem',
              difficulty: 2,
              hint: 'Semiconservative, generation g: hybrid fraction 2^(1−g), the rest light. Reverse experiment after 2 generations: half hybrid, half heavy. Denatured generation-1 DNA gives separate heavy and light single strands if semiconservative, a single intermediate band if dispersive.',
            },
            {
              slug: 'fork-roles',
              title: 'What goes wrong without each enzyme?',
              prompt: `For each temperature-sensitive *E. coli* mutant, predict what happens to replication at the restrictive temperature and what intermediates accumulate: (a) helicase; (b) primase; (c) DNA polymerase I; (d) DNA ligase; (e) the 3′→5′ exonuclease of polymerase III (synthesis still works). Which one would show a mutator phenotype rather than a failure to replicate?`,
              kind: 'problem',
              difficulty: 2,
              hint: 'Ligase mutants accumulate Okazaki fragments; polymerase I mutants leave RNA primers in the lagging strand; the exonuclease mutant replicates but makes many more errors.',
            },
            {
              slug: 'origins-needed',
              title: 'How many origins?',
              prompt: `A human cell replicates about 6.2 × 10⁹ bp of DNA in an S phase of about 8 hours, with forks moving at about 50 nucleotides per second. (a) How long would a single origin with two forks take? (b) What is the minimum number of origins that must fire, assuming all start at once? (c) Real cells use tens of thousands of origins. Give two reasons why more than the minimum are used.`,
              kind: 'problem',
              difficulty: 2,
              hint: '(a) 6.2 × 10⁹ / 100 nt/s = 6.2 × 10⁷ s, about 2 years. (b) 6.2 × 10⁹ / (100 × 28,800) ≈ 2150 origins.',
            },
          ],
          selfAssessment: [
            {
              question: 'Which observation in the Meselson-Stahl experiment rules out conservative replication, and which rules out dispersive?',
              answerOutline: 'Generation 1 shows only a hybrid band (conservative predicts heavy plus light). Generation 2 shows distinct hybrid and light bands (dispersive predicts one intermediate band).',
            },
            {
              question: 'Why is the lagging strand made in fragments?',
              answerOutline: 'Polymerase only extends 3′ ends, so it synthesises 5′ to 3′. On the strand whose 5′-to-3′ direction points away from the fork, synthesis must restart repeatedly from new primers as the fork opens.',
            },
            {
              question: 'What is the end-replication problem and which enzyme solves it?',
              answerOutline: 'The lagging strand cannot be completed at the tip of a linear chromosome after the last primer is removed, so ends shorten. Telomerase, a reverse transcriptase with an RNA template, extends the telomere repeats.',
            },
          ],
          quiz: [
            {
              question: 'In a Meselson-Stahl experiment, cells grown in ¹⁵N are transferred to ¹⁴N. What fraction of DNA molecules is hybrid density after four generations, if replication is semiconservative?',
              options: ['$\\tfrac{1}{2}$', '$\\tfrac{1}{4}$', '$\\tfrac{1}{8}$', '$\\tfrac{1}{16}$'],
              answer: 2,
              explanation:
                'After $g$ generations there are $2^g = 16$ molecules for each original one, and exactly 2 of them hold an original heavy strand: $2/16 = \\tfrac18$. $\\tfrac{1}{16}$ forgets that both original strands survive, each in a different molecule.',
            },
            {
              question: 'Which result after one generation in ¹⁴N would have supported the conservative model?',
              options: [
                'One band of hybrid density',
                'One heavy band and one light band, in equal amounts',
                'One band slightly lighter than hybrid',
                'Only a light band',
              ],
              answer: 1,
              explanation:
                'Conservative replication keeps the old duplex intact (heavy) and builds a new all-light duplex. A single hybrid band is what semiconservative and dispersive replication both predict at generation 1.',
            },
            {
              question: 'A mutant *E. coli* strain accumulates short DNA fragments of about 1000 nucleotides that never join. Which enzyme is most likely defective?',
              options: ['Helicase', 'Primase', 'DNA ligase', 'Topoisomerase'],
              answer: 2,
              explanation:
                'Okazaki fragments are made but not sealed: ligase joins them after polymerase I replaces the primers. A primase defect would block lagging-strand synthesis altogether, so there would be no fragments to accumulate.',
            },
            {
              question: 'Which statement about leading and lagging strands is correct?',
              options: [
                'The leading strand is synthesised 5′ to 3′ and the lagging strand 3′ to 5′',
                'Both are synthesised 5′ to 3′; the lagging strand is made discontinuously because it runs away from the fork',
                'Only the lagging strand needs a primer',
                'The leading strand is the template strand and the lagging strand is the new strand',
              ],
              answer: 1,
              explanation:
                'Every DNA polymerase works 5′ to 3′. The leading strand needs one primer per origin and is made continuously; the lagging strand needs a new primer for every Okazaki fragment. No polymerase synthesises 3′ to 5′.',
            },
          ],
        },
      ],
      project: {
        slug: 'reading-the-classic-experiments',
        title: 'Read the three experiments that made molecular genetics',
        description: `Read the original papers by Avery, MacLeod and McCarty (1944), Hershey and Chase (1952) and Meselson and Stahl (1958), all free on PubMed Central (links are in this module's lessons). For each, write a one-page brief: the question, the competing hypotheses, the experimental design including its controls, the key data (copy one table or figure into your notes and explain it), the conclusion the authors drew and how cautiously they drew it, and one weakness or alternative explanation a sceptic at the time could have raised. Finish with a half-page comparison: what each experiment's logic has in common (destroying, tracking or separating one candidate at a time) and how each answered a weakness left by the previous one.`,
        deliverables: [
          'Three one-page briefs, each with the hypotheses, design, controls, key data and conclusions',
          'One annotated table or figure from each paper, explained in your own words',
          'A half-page comparison of the experimental logic',
        ],
        estimatedHours: 3,
        stretchGoals: ['Find and read the 1953 Franklin and Gosling paper in the same issue of Nature as Watson and Crick, and explain what Photo 51 showed'],
      },
    },
    {
      slug: 'gene-expression-and-mutation',
      title: 'From Gene to Protein, and How Genes Change',
      description:
        'How a gene is read: transcription in bacteria and eukaryotes, RNA processing, the genetic code and translation. Then how genes change: the kinds of mutation and what each does to the protein, where mutations come from, and how cells repair DNA.',
      lessons: [
        {
          slug: 'transcription',
          title: 'Transcription in bacteria and eukaryotes',
          summary:
            'RNA polymerase reads the template strand 3′ to 5′ and makes RNA 5′ to 3′. Promoters, sigma factor and termination in bacteria; RNA polymerase II, the TATA box and general transcription factors in eukaryotes.',
          estimatedMinutes: 100,
          objectives: [
            'Identify the template and coding strands of a gene and write the RNA transcribed from either',
            'Describe a bacterial promoter (−35 and −10 boxes) and the role of sigma factor',
            'Explain rho-independent and rho-dependent termination',
            'Compare transcription in eukaryotes: three RNA polymerases, core promoter elements and general transcription factors',
            'Predict the effect of promoter mutations on the amount and the sequence of a gene product',
          ],
          concepts: [
            'Template (antisense) and coding (sense) strands',
            'RNA polymerase synthesises 5′→3′, needs no primer',
            'Promoter: −35 (TTGACA) and −10 (TATAAT) boxes',
            'Sigma factor and the holoenzyme',
            'Rho-independent terminator: GC hairpin then U run',
            'Eukaryotic RNA polymerases I, II and III',
            'TATA box, TFIID and general transcription factors',
            'Coupled transcription and translation in bacteria',
          ],
          explanation: `**Transcription** copies one strand of a gene into RNA. RNA polymerase reads the **template strand** 3′ to 5′ and builds RNA 5′ to 3′, pairing A with U, U with A, G with C and C with G. The RNA therefore has the same sequence as the other DNA strand, the **coding strand**, with U in place of T. That is why gene sequences in databases are given as the coding strand: you can read the mRNA, and so the codons, straight off it. Unlike DNA polymerase, RNA polymerase needs no primer.

**Worked example.** A template strand reads 3′-TACGGATTCACT-5′. Pair each base and keep the antiparallel direction: the mRNA is 5′-AUGCCUAAGUGA-3′, the coding strand is 5′-ATGCCTAAGTGA-3′, and the codons read AUG CCU AAG UGA (Met-Pro-Lys-stop). The two classic errors are writing the RNA from the coding strand's complement (that gives the template sequence with U) and forgetting to reverse when the template is given 5′ to 3′.

\`\`\`interactive
gen-central-dogma
{"dna": "GCTTACAGCCAACCTTCGTGAGACATAA", "given": "template", "caption": "Here the sequence you are given is the template strand, written 5′ to 3′. The widget lines it up 3′ to 5′ under the coding strand and builds the mRNA from it. Check by hand that the mRNA equals the coding strand with U for T, then find the AUG and the stop codon."}
\`\`\`

**Bacteria.** The core enzyme (subunits α₂ββ′ω) joins a **sigma factor** to form the holoenzyme, which recognises the **promoter**. In *E. coli* the main sigma (σ⁷⁰) binds two short sequences upstream of the start site (+1): the **−35 box**, consensus TTGACA, and the **−10 box**, TATAAT, where the DNA melts open. Promoters that match the consensus closely are strong. Termination is either **rho-independent**, when the RNA forms a G-C rich hairpin followed by a run of U's that lets the RNA slip off, or **rho-dependent**, when the Rho helicase chases the polymerase and pulls the RNA away. Bacterial mRNA has no nucleus to leave, so ribosomes start translating it while it is still being made.

**Eukaryotes** have three nuclear RNA polymerases: I makes most rRNA, II makes mRNA (and most small regulatory RNAs), III makes tRNA and 5S rRNA. Polymerase II cannot find a promoter on its own. **General transcription factors** assemble first: TFIID, whose TATA-binding protein recognises the **TATA box** about 25 to 30 bp upstream of +1 in many promoters, then TFIIB, TFIIF with the polymerase, TFIIE and TFIIH. TFIIH unwinds the DNA and phosphorylates the polymerase tail (the CTD), releasing it to elongate. Activators bound at enhancers (gene regulation module) control how often this happens.

A mutation in a promoter changes **how much** RNA is made, not the protein sequence; a mutation in the coding region changes the protein but not the amount. Read UIC 1.3.2 and 1.3.3 and OpenStax 15.2 and 15.3.`,
          resources: [
            uic(`${M1}/1.03%3A_Transcription/1.3.02%3A_Bacterial_Transcription`, '1.3.2 Bacterial transcription', 'Promoters, sigma factor and termination.', true),
            uic(`${M1}/1.03%3A_Transcription/1.3.03%3A_Eukaryotic_Transcription`, '1.3.3 Eukaryotic transcription', 'The three polymerases and the general transcription factors.'),
            ostx('15-2-prokaryotic-transcription', '15.2 Prokaryotic transcription', 'A second account with clear promoter figures; then read 15.3 for eukaryotes.'),
            learn('basics/transcribe/', 'Transcribe and translate a gene', 'A short interactive in which you transcribe and translate a gene yourself.'),
          ],
          exercises: [
            {
              slug: 'strand-practice',
              title: 'Which strand is which?',
              prompt: `A stretch of double-stranded DNA reads 5′-TTGACAGCTA GCTCAGTCCT AGGTATAATG CTAGCATGAG CAAACGTTAG C-3′ (spaces every 10 bases are only for counting) (top) paired with its complement (bottom). (a) Find sequences matching the −35 and −10 consensus boxes on the top strand. (b) Transcription starts at the A that lies 7 bases after the end of the −10 box and runs rightward: which strand is the template? (c) Write the first 10 nucleotides of the RNA. (d) Which strand would a database give as "the gene sequence", and why?`,
              kind: 'problem',
              difficulty: 2,
              hint: 'TTGACA occupies bases 1-6 and TATAAT bases 24-29, a 17 bp spacer (typical). The start is base 36. Transcription runs rightward, so the RNA matches the top strand (5′-AUGAGCAAAC...) and the bottom strand is the template.',
            },
            {
              slug: 'promoter-mutations',
              title: 'Promoter mutations',
              prompt: `For each mutation in an *E. coli* gene, predict the effect on (i) the amount of mRNA and (ii) the amino acid sequence of the protein, and explain: (a) TATAAT → TATGAT in the −10 box; (b) TTGCCA → TTGACA in the −35 box; (c) a deletion that removes the U run after the terminator hairpin; (d) a mutation that changes codon 20 from GAA to GAT; (e) a mutation in the gene for σ⁷⁰ itself. Which of these would affect many genes at once?`,
              kind: 'problem',
              difficulty: 2,
              hint: '(a) moves away from consensus: less mRNA, same protein. (b) moves towards consensus: more mRNA. (c) read-through into downstream DNA. (d) Glu to Asp, same amount. (e) affects every σ⁷⁰ promoter.',
            },
            {
              slug: 'compare-transcription',
              title: 'Bacteria versus eukaryotes',
              prompt: `Make a two-column table comparing bacterial and eukaryotic transcription on: the polymerase(s); how the promoter is recognised; typical promoter elements; termination; where transcription happens relative to translation; and what happens to the transcript before it is translated. Then explain in a short paragraph why a eukaryotic gene cloned directly from genomic DNA into *E. coli* usually fails to make the right protein (you will meet the full answer in the next lesson).`,
              kind: 'writing',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'How is the sequence of an mRNA related to the coding strand and to the template strand?',
              answerOutline: 'The mRNA is complementary and antiparallel to the template strand, so it has the same sequence and direction as the coding strand with U instead of T.',
            },
            {
              question: 'What does sigma factor do, and what happens to it after initiation?',
              answerOutline: 'Sigma lets the core polymerase recognise and bind promoter sequences (−35, −10) and helps open the DNA. After initiation it is usually released and the core enzyme elongates.',
            },
            {
              question: 'Why can a promoter mutation change the amount of a protein but not its sequence?',
              answerOutline: 'The promoter is not transcribed into the coding sequence; it controls how often polymerase binds and starts. The codons, which set the amino acid sequence, are unchanged.',
            },
          ],
          quiz: [
            {
              question: 'The template strand of a short gene reads 5′-CATTGCCAT-3′. What is the mRNA?',
              options: ['5′-AUGGCAAUG-3′', '5′-GUAACGGUA-3′', '5′-CAUUGCCAU-3′', '5′-UACCGUUAC-3′'],
              answer: 0,
              explanation:
                'Pair base by base (GTAACGGTA, which runs 3′ to 5′) and reverse to write it 5′ to 3′: AUGGCAAUG. GUAACGGUA is the complement with the direction mislabelled, and CAUUGCCAU copies the template as if it were the coding strand.',
            },
            {
              question: 'A mutation changes the −10 box of a bacterial promoter from TATAAT to GATAAT. What is the most likely effect?',
              options: [
                'Less mRNA is made from the gene, but the protein is normal',
                'The protein has one amino acid changed',
                'The mRNA is longer because termination fails',
                'No effect, because promoters are not transcribed',
              ],
              answer: 0,
              explanation:
                'The −10 box is where sigma-holoenzyme binds and opens DNA; moving away from consensus weakens the promoter. Promoters are not transcribed into the coding sequence, so the protein sequence is unchanged, but "not transcribed" does not mean "no effect".',
            },
            {
              question: 'Which RNA polymerase transcribes protein-coding genes in a human cell?',
              options: ['RNA polymerase I', 'RNA polymerase II', 'RNA polymerase III', 'Primase'],
              answer: 1,
              explanation:
                'Polymerase II makes pre-mRNA. Polymerase I makes most rRNA and polymerase III makes tRNA and 5S rRNA; primase makes the short RNA primers for DNA replication.',
            },
          ],
        },
        {
          slug: 'rna-processing',
          title: 'RNA processing: caps, tails and splicing',
          summary:
            'Eukaryotic pre-mRNA is capped, polyadenylated and spliced before it leaves the nucleus. How introns were found, how the spliceosome recognises them, and how alternative splicing makes many proteins from one gene.',
          estimatedMinutes: 90,
          objectives: [
            'Describe the 5′ cap and the poly(A) tail and their functions',
            'Explain how introns are recognised (GU-AG rule, branch point) and removed by the spliceosome',
            'Compute mature mRNA lengths from exon and intron lengths',
            'Count the isoforms alternative splicing can produce',
            'Predict the effect of splice-site mutations',
          ],
          concepts: [
            '5′ 7-methylguanosine cap',
            'Cleavage at AAUAAA and poly(A) tail',
            'Exons and introns',
            'GU at the 5′ splice site, AG at the 3′ splice site',
            'Branch-point A and the lariat',
            'Spliceosome: snRNPs',
            'Alternative splicing and isoforms',
            'Splice-site mutations: exon skipping, intron retention',
          ],
          explanation: `In bacteria the transcript is the mRNA. In eukaryotes the primary transcript, **pre-mRNA**, is processed in the nucleus in three ways, mostly while it is still being transcribed.

**Capping.** A 7-methylguanosine is attached to the 5′ end by an unusual 5′-5′ triphosphate bond. The cap protects the RNA from 5′ exonucleases and is recognised by the translation-initiation machinery.

**Polyadenylation.** Downstream of the signal AAUAAA the RNA is cut and poly(A) polymerase adds a tail of about 200 adenines (no template needed). The tail helps export and stability; tail shortening is a common step towards decay.

**Splicing.** In 1977 Phillip Sharp's and Richard Roberts's groups hybridised adenovirus mRNA to its DNA and saw loops of DNA with no partner in the mRNA: the gene was interrupted. The kept segments are **exons**; the removed ones are **introns**. Almost every intron starts with GU and ends with AG, and contains a **branch-point A** about 20 to 50 nucleotides before its 3′ end. The **spliceosome**, five small nuclear RNAs with proteins (snRNPs), pairs with these sites; the branch-point A attacks the 5′ splice site, forming a **lariat**, and the freed exon end then joins the next exon. Human genes average about nine exons, and introns are usually much longer than exons.

**Computing lengths.** A gene with exons of 150, 300 and 200 nt and introns of 1000 and 2000 nt gives a 3650-nt pre-mRNA but a 650-nt mature mRNA (plus cap and tail). The protein length depends only on the coding part of the exons, so subtract the untranslated regions before dividing by three.

**Alternative splicing** joins exons in different combinations. A cassette exon may be included or skipped; mutually exclusive exons supply one choice from a set. Choices multiply: the *Drosophila Dscam* gene has 12, 48, 33 and 2 alternatives at four positions, so up to $12 \\times 48 \\times 33 \\times 2 = 38{,}016$ isoforms. Most human multi-exon genes are alternatively spliced, which is part of how about 20,000 genes make many more proteins.

**Mutations at splice sites** (for example GU → AU at an intron start) can make the spliceosome skip an exon or keep an intron; a retained intron usually introduces a premature stop codon. Many β-thalassaemia alleles of *HBB* are of this kind. This is also why a human gene expressed in bacteria must be supplied as **cDNA**, made by reverse-transcribing mature mRNA: bacteria have no spliceosome. Read UIC 1.3.4 and OpenStax 15.4.`,
          resources: [
            uic(`${M1}/1.03%3A_Transcription/1.3.04%3A_RNA_Processing`, '1.3.4 RNA processing', 'Capping, polyadenylation and splicing.', true),
            ostx('15-4-rna-processing-in-eukaryotes', '15.4 RNA processing in eukaryotes', 'Clear figures of the spliceosome and the lariat.'),
            db('https://genome.ucsc.edu/', 'UCSC Genome Browser', 'University of California, Santa Cruz', 'Used in the exercise to see exons and introns of a real gene.'),
          ],
          exercises: [
            {
              slug: 'mrna-lengths',
              title: 'Pre-mRNA, mRNA and protein lengths',
              prompt: `A human gene has four exons of 210, 135, 96 and 480 nt and three introns of 1,200, 5,400 and 850 nt. The 5′ UTR is the first 60 nt of exon 1 and the stop codon is followed by 312 nt of 3′ UTR in exon 4. (a) How long is the pre-mRNA? (b) How long is the mature mRNA, not counting the cap and a 200-nt tail? (c) How many amino acids is the protein? (d) If exon 3 is skipped by alternative splicing, is the downstream reading frame preserved? Why?`,
              kind: 'problem',
              difficulty: 2,
              hint: '(a) 8,371 nt. (b) 921 nt. (c) coding sequence = 921 − 60 − 312 = 549 nt including the stop, so 182 amino acids. (d) 96 is divisible by 3, so skipping it removes 32 codons and keeps the frame.',
            },
            {
              slug: 'browse-a-gene',
              title: 'Look at real exons',
              prompt: `In the UCSC Genome Browser (human assembly GRCh38/hg38), search for *HBB* and then for *DMD*. For each, record the number of exons, the genomic span and the length of the main mRNA (click the transcript in the GENCODE or RefSeq track). Compute the fraction of each gene that ends up in mature mRNA. Explain in a few sentences why *DMD* takes many hours to transcribe while *HBB* takes about a minute, assuming polymerase II moves about 2-3 kb per minute.`,
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'splice-mutation',
              title: 'A splice-site mutation',
              prompt: `In a family with a recessive disease, the affected children are homozygous for a G → A change at the first base of intron 2 (so the intron now starts AU instead of GU). Exon 3 is 82 nt long. (a) Give two ways the spliceosome might respond. (b) For exon skipping, will the reading frame after exon 3 be preserved? (c) For intron retention, why is a premature stop codon likely? (d) What experiment on patient RNA would tell you which happened?`,
              kind: 'problem',
              difficulty: 3,
              hint: '82 is not divisible by 3, so skipping exon 3 shifts the frame. RT-PCR across exons 2 to 4 on patient RNA, sized on a gel and sequenced, shows which product forms.',
            },
          ],
          selfAssessment: [
            {
              question: 'What are the three main processing steps of eukaryotic pre-mRNA and what does each do?',
              answerOutline: '5′ capping (protection, translation initiation), 3′ cleavage and polyadenylation (stability, export), and splicing out introns (joins the coding exons).',
            },
            {
              question: 'What sequence features mark an intron?',
              answerOutline: 'GU at its 5′ end, AG at its 3′ end, and a branch-point A upstream of the 3′ splice site, recognised by snRNAs of the spliceosome.',
            },
            {
              question: 'Why must you use cDNA rather than genomic DNA to make a human protein in E. coli?',
              answerOutline: 'Bacteria cannot splice. cDNA is reverse-transcribed from mature mRNA, so it already lacks introns.',
            },
          ],
          quiz: [
            {
              question: 'A gene has exons of 120, 240 and 330 nt separated by introns of 900 and 1500 nt. How long is the mature mRNA, ignoring the cap and the poly(A) tail?',
              options: ['3090 nt', '2400 nt', '690 nt', '230 nt'],
              answer: 2,
              explanation:
                'Only exons remain: $120 + 240 + 330 = 690$ nt. 3090 nt is the pre-mRNA; 2400 nt counts the introns instead; 230 divides by three, which gives codons, not nucleotides.',
            },
            {
              question: 'A gene has one cassette exon (included or skipped) and two positions of mutually exclusive exons, with 3 and 4 alternatives. How many mRNA isoforms are possible?',
              options: ['9', '14', '12', '24'],
              answer: 3,
              explanation:
                'Independent choices multiply: $2 \\times 3 \\times 4 = 24$. Adding the choices ($2 + 3 + 4 = 9$) treats them as alternatives to each other rather than combinations.',
            },
            {
              question: 'Which feature is found on eukaryotic mRNA but not bacterial mRNA?',
              options: ['A 5′ 7-methylguanosine cap', 'A Shine-Dalgarno sequence', 'A start codon', 'Codons read 5′ to 3′'],
              answer: 0,
              explanation:
                'Only eukaryotic mRNAs are capped. Shine-Dalgarno sequences are bacterial; start codons and 5′-to-3′ reading are universal.',
            },
          ],
        },
        {
          slug: 'the-genetic-code',
          title: 'The genetic code and reading frames',
          summary:
            'Three bases per codon, read without punctuation from a fixed start: how frameshift genetics proved the triplet code, how synthetic RNAs cracked it, and how to find reading frames and open reading frames in a sequence.',
          estimatedMinutes: 100,
          objectives: [
            'Explain why a code of three-base codons is the minimum and how the Crick-Brenner frameshift experiments showed it',
            'Explain how Nirenberg, Matthaei and Khorana assigned codons with synthetic RNAs',
            'Read the standard codon table, including start and stop codons, and explain degeneracy and wobble',
            'Find the three reading frames of a strand (six for both strands) and identify open reading frames',
            'Predict the polypeptides encoded by repeating synthetic RNAs',
          ],
          concepts: [
            'Codon: three nucleotides, 64 combinations',
            'Degenerate (redundant) but unambiguous',
            'Start codon AUG (Met); stops UAA, UAG, UGA',
            'Reading frame set by the start codon',
            'Crick-Brenner (+)/(−) frameshift suppression',
            'Poly(U) → poly-Phe (Nirenberg and Matthaei, 1961)',
            'Open reading frame (ORF)',
            'Near-universality; mitochondrial exceptions',
          ],
          explanation: `Twenty amino acids need at least 20 code words. Pairs of bases give only $4^2 = 16$; triplets give $4^3 = 64$, enough with room to spare. The code is indeed a triplet code, and the 64 **codons** are used as 61 sense codons and 3 stops.

**Genetic proof (Crick, Barnett, Brenner and Watts-Tobin, 1961).** Working with the *rIIB* gene of phage T4, they used proflavin to make mutations that added or removed a base. A single (+) mutant was defective, and so was a single (−); but a (+) and a nearby (−) together often restored function, and so did three (+) mutations together, never two. The explanation: the gene is read from a fixed start in groups of three, with no commas. A single insertion shifts the **reading frame** for everything downstream; a nearby deletion shifts it back, leaving only a short garbled stretch; three insertions add one extra codon and restore the frame.

**Biochemical decoding.** Nirenberg and Matthaei (1961) added synthetic poly(U) to a cell-free extract of *E. coli* and got polyphenylalanine, so UUU means Phe. Khorana's repeating copolymers filled in the rest. Poly(UC), read UCU CUC UCU..., gives alternating Ser-Leu in any frame; a repeating triplet such as poly(UUC) gives three different homopolymers (poly-Phe from UUC, poly-Ser from UCU, poly-Leu from CUU), depending on where the ribosome starts.

**Properties.** The code is **degenerate**: most amino acids have several codons, usually differing at the third base (all four GCN codons are Ala). It is **unambiguous**: each codon means one amino acid. Degeneracy is eased by **wobble**: the first anticodon base can pair loosely with the third codon base, so one tRNA can read several codons. AUG is the usual **start** (Met) and sets the frame; UAA, UAG and UGA are **stops**. The code is nearly universal, with small exceptions such as UGA meaning Trp in human mitochondria.

**Reading frames.** Any strand can be read in three frames, starting at base 1, 2 or 3; a double-stranded sequence has six. An **open reading frame** (ORF) runs from an AUG to the next in-frame stop without interruption. Because about 3 of every 64 random codons are stops, a long ORF is unlikely by chance and is a strong sign of a real gene. Switch frames in the interactive below and watch the protein change completely.

\`\`\`interactive
gen-central-dogma
{"dna": "TCATGCCCAAGTGGTTTGCGTAGCA", "startAtAug": false, "frame": 0, "caption": "This short coding strand contains one ORF. Step through frames 1, 2 and 3: which frame gives Met-Pro-Lys-Trp-Phe-Ala-stop, and what do the other two frames give? Then choose 'first AUG' and confirm it picks the same frame."}
\`\`\`

Common errors: reading codons from the template strand, starting at the first base rather than at AUG, and calling a codon "ambiguous" when you mean degenerate. Read UIC 2.2.1 and OpenStax 15.1, and skim the Nirenberg-Matthaei paper's first table.`,
          resources: [
            uic(`${M2}/2.02%3A_Translation/2.2.01%3A_The_Genetic_Code`, '2.2.1 The genetic code', 'The codon table and how it was cracked.', true),
            ostx('15-1-the-genetic-code', '15.1 The genetic code', 'The central dogma and the codon table.'),
            paper('https://pmc.ncbi.nlm.nih.gov/articles/PMC223178/', 'Nirenberg and Matthaei (1961), The dependence of cell-free protein synthesis in E. coli upon naturally occurring or synthetic polyribonucleotides', 'PNAS, free on PubMed Central', 'The poly(U) experiment: find the table showing that poly(U) directs phenylalanine incorporation.'),
          ],
          exercises: [
            {
              slug: 'copolymer-decoding',
              title: 'Decode synthetic RNAs',
              prompt: `Using the codon table, predict the polypeptide(s) made in a cell-free system (which starts at random positions, without needing AUG) from: (a) poly(A); (b) poly(AC), that is ACACAC...; (c) poly(AAC); (d) poly(GUAA). For (d), explain why the product is only short peptides. Then explain how results like (b) and (c), together, could assign the codon ACA to one amino acid.`,
              kind: 'problem',
              difficulty: 2,
              hint: '(b) ACA CAC alternate: Thr-His. (c) AAC, ACA, CAA: poly-Asn, poly-Thr, poly-Gln. Thr appears in both, so ACA = Thr. (d) GUA AGU AAG UAA: UAA is a stop in one frame, and the other frames contain UAA or UAG too.',
            },
            {
              slug: 'frameshift-suppression',
              title: 'Crick-Brenner logic',
              prompt: `A gene reads THE BIG CAT ATE THE RAT, with words as codons. Write the message after: (a) inserting an X after BIG; (b) also deleting the C of CAT; (c) inserting X after THE, after BIG and after CAT (three insertions); (d) inserting two letters. In each case say how much of the message is garbled. Then explain why two nearby (+) mutations never restored rII function in phage T4 while three often did, and what that proves.`,
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'find-the-orf',
              title: 'Find an ORF in six frames',
              prompt: `For the double-stranded sequence whose top strand is 5′-GCTAACCATG GATCACGCTT TACGTATGCT CATTGC-3′ (spaces every 10 bases are only for counting): (a) write the bottom strand 5′ to 3′; (b) list all six reading frames as codons; (c) find every ATG on both strands and the first in-frame stop after it, if there is one; (d) which strand and frame contain a complete ORF (start to stop), and what peptide does it encode? Use the interactive above (type in each strand and set the frame manually) to check.`,
              kind: 'problem',
              difficulty: 3,
              hint: 'The bottom strand is 5′-GCAATGAGCA TACGTAAAGC GTGATCCATG GTTAGC-3′. Its ATG at base 4 reads Met-Ser-Ile-Arg-Lys-Ala then TGA: the only complete ORF. The top-strand ATG at base 8 (Met-Asp-His-Ala-Leu-Arg-Met-Leu-Ile...) never reaches a stop within the sequence, so it is not a complete ORF here.',
            },
          ],
          selfAssessment: [
            {
              question: 'Why must codons be at least three bases long?',
              answerOutline: 'Four bases taken two at a time give only 16 combinations, fewer than 20 amino acids; three at a time give 64.',
            },
            {
              question: 'What does "degenerate but unambiguous" mean?',
              answerOutline: 'Most amino acids are specified by more than one codon (degenerate), but each codon specifies only one amino acid (unambiguous).',
            },
            {
              question: 'Why do (+)(−) pairs of frameshift mutations restore function only when the two are close together?',
              answerOutline: 'Between the insertion and the deletion the frame is shifted and those codons are wrong. A short stretch of wrong amino acids may be tolerated; a long one, or one that hits a stop, is not.',
            },
          ],
          quiz: [
            {
              question: 'A cell-free translation system is given poly(UG), the repeating sequence UGUGUG... What is made?',
              options: [
                'Poly-Cys and poly-Val as two separate products',
                'Nothing, because there is no AUG',
                'A polypeptide of alternating Cys and Val',
                'Poly-Trp, because UGG is Trp',
              ],
              answer: 2,
              explanation:
                'Whatever the starting point, the codons alternate UGU (Cys) and GUG (Val), giving Cys-Val-Cys-Val. Separate homopolymers come from repeating triplets, not dinucleotides. Cell-free systems at high magnesium do not need AUG.',
            },
            {
              question: 'A protein of 300 amino acids is encoded by a bacterial gene. What is the minimum length of its coding sequence, including the stop codon?',
              options: ['300 nt', '900 nt', '903 nt', '1200 nt'],
              answer: 2,
              explanation:
                '300 codons for the amino acids plus one stop codon: $301 \\times 3 = 903$ nt. 900 forgets the stop; 1200 uses four bases per codon.',
            },
            {
              question: 'Leucine is encoded by six codons. This is an example of',
              options: ['ambiguity', 'degeneracy', 'wobble at the first codon position', 'a frameshift'],
              answer: 1,
              explanation:
                'Several codons for one amino acid is degeneracy (redundancy). Ambiguity would be one codon for several amino acids, which the code avoids. Wobble is at the third codon position (first anticodon position).',
            },
            {
              question: 'Two independent single-base insertion mutants of a gene are combined with a single-base deletion located 4 codons downstream of one of them. Which double mutant is most likely to recover function?',
              options: [
                'Insertion plus nearby deletion',
                'Two insertions',
                'None, since every frameshift is permanent',
                'Any combination, because the code has commas',
              ],
              answer: 0,
              explanation:
                'A (+) and a nearby (−) restore the frame, garbling only the four codons between them. Two insertions leave the frame shifted by two. This is the Crick-Brenner result that showed the code is read in triplets from a fixed start, with no commas.',
            },
          ],
        },
        {
          slug: 'translation',
          title: 'Translation: tRNA, ribosomes and protein synthesis',
          summary:
            'How tRNAs and aminoacyl-tRNA synthetases implement the code, the structure of the ribosome, and the steps of initiation, elongation and termination in bacteria and eukaryotes.',
          estimatedMinutes: 100,
          objectives: [
            'Pair codons with anticodons, respecting antiparallel direction and wobble',
            'Explain why aminoacyl-tRNA synthetases, not ribosomes, are the decoders, using the Chapeville experiment',
            'Describe initiation in bacteria (Shine-Dalgarno, fMet) and eukaryotes (cap binding and scanning)',
            'Describe elongation through the A, P and E sites and termination by release factors',
            'Relate mRNA direction to polypeptide direction (5′ to 3′ gives N to C)',
          ],
          concepts: [
            'tRNA: anticodon and 3′ CCA end',
            'Aminoacyl-tRNA synthetases (charging)',
            'Ribosome: 70S (30S + 50S), 80S (40S + 60S)',
            'A, P and E sites',
            'Shine-Dalgarno sequence (AGGAGG) and fMet',
            'Cap-binding and scanning to the first AUG (Kozak)',
            'Peptidyl transferase is rRNA (a ribozyme)',
            'Release factors at stop codons',
          ],
          explanation: `Translation turns a sequence of codons into a polypeptide. Three kinds of RNA do the work: mRNA carries the message, **tRNAs** carry amino acids, and rRNA forms the core of the ribosome.

**tRNA and charging.** Each tRNA is about 76 nt folded into an L shape, with an **anticodon** loop at one end and the amino acid attached to the 3′ CCA end at the other. Codon and anticodon pair antiparallel: the codon 5′-AUG-3′ pairs with the anticodon 5′-CAU-3′ (written 3′-UAC-5′ to show the pairing). The match between amino acid and anticodon is made by twenty **aminoacyl-tRNA synthetases**, one per amino acid, each attaching the right amino acid to all its tRNAs. The ribosome checks only codon-anticodon pairing. Chapeville and colleagues proved this in 1962: they charged tRNA-Cys with cysteine, chemically converted the cysteine to alanine while it was still attached, and found alanine inserted wherever the mRNA said Cys. The synthetases are the real decoders.

**Ribosomes.** Bacterial ribosomes are 70S (30S small and 50S large subunits); eukaryotic cytoplasmic ribosomes are 80S (40S and 60S). The large subunit has three tRNA sites: **A** (aminoacyl, the incoming tRNA), **P** (peptidyl, holding the growing chain) and **E** (exit). The bond-forming **peptidyl transferase** centre is made of rRNA, so the ribosome is a ribozyme.

**Initiation.** In bacteria the small subunit pairs its 16S rRNA with the **Shine-Dalgarno** sequence (around AGGAGG) a few bases upstream of the start codon, and an initiator tRNA carrying formyl-methionine (fMet) enters the P site. In eukaryotes the small subunit binds the 5′ cap and **scans** to the first AUG in a good context (the Kozak sequence, gccRccAUGG); the initiator carries plain Met.

**Elongation** repeats three steps: a charged tRNA, delivered by EF-Tu (eEF1A in eukaryotes) with GTP, enters the A site if its anticodon matches; the peptidyl transferase moves the chain from the P-site tRNA onto the A-site amino acid; and EF-G (eEF2) translocates the ribosome one codon along, shifting the tRNAs to E and P. The mRNA is read 5′ to 3′ and the protein grows from its **N terminus to its C terminus**. Each peptide bond costs about four high-energy phosphate bonds: two to charge the tRNA and two GTPs.

**Termination.** No tRNA reads UAA, UAG or UGA; **release factors** bind the stop codon in the A site and trigger hydrolysis of the chain from the last tRNA. Several ribosomes usually translate one mRNA at once, forming a polysome. Read UIC 2.2.2 and OpenStax 15.5, then use the Learn.Genetics activity.`,
          resources: [
            uic(`${M2}/2.02%3A_Translation/2.2.02%3A_Ribosomes_and_Protein_Synthesis`, '2.2.2 Ribosomes and protein synthesis', 'The steps of translation.', true),
            ostx('15-5-ribosomes-and-protein-synthesis', '15.5 Ribosomes and protein synthesis', 'Initiation, elongation and termination with figures.'),
            learn('basics/txtl/', 'Transcribe and translate a gene', 'Do the activity once quickly, then once predicting each step before it happens.'),
          ],
          exercises: [
            {
              slug: 'anticodons-and-wobble',
              title: 'Anticodons and wobble',
              prompt: `(a) Write the anticodon, 5′ to 3′, of the tRNAs that read each codon: 5′-UUC-3′, 5′-GCA-3′, 5′-UGG-3′. (b) Wobble allows G in the first (5′) anticodon position to pair with C or U, and inosine (I) to pair with U, C or A. Which codons can a tRNA with anticodon 5′-GAA-3′ read, and which amino acid does it carry? Which codons can 5′-IGC-3′ read? (c) What is the minimum number of tRNAs needed to read all four Ala codons GCN, and why?`,
              kind: 'problem',
              difficulty: 2,
              hint: '(a) GAA, UGC, CCA. (b) GAA reads UUC and UUU (Phe); IGC reads GCU, GCC and GCA (Ala). (c) Two: one with I to read GCU, GCC and GCA and one to read GCG.',
            },
            {
              slug: 'chapeville-experiment',
              title: 'Who reads the code?',
              prompt: `Explain the Chapeville experiment in your own words: the starting molecule, the chemical conversion, the mRNA used and the result. Then predict the result of the reverse experiment, an Ala-tRNA-Ala chemically converted to carry Cys, translated on an mRNA rich in GCU codons. Finish with one sentence saying what this means for where errors in the code would arise if a synthetase were mutated.`,
              kind: 'writing',
              difficulty: 2,
            },
            {
              slug: 'translation-mutants',
              title: 'What goes wrong?',
              prompt: `Predict the consequence for protein synthesis of each: (a) an *E. coli* mRNA whose Shine-Dalgarno sequence AGGAGG is mutated to ACCACC; (b) a eukaryotic mRNA with an extra AUG in a poor Kozak context 20 nt before the real start codon, out of frame; (c) a tRNA-Tyr whose anticodon is mutated to read UAG (a nonsense suppressor), in a cell with a gene containing a premature UAG; (d) an antibiotic that blocks translocation.`,
              kind: 'problem',
              difficulty: 3,
              hint: '(a) small subunit cannot find the start: little or no protein. (b) some ribosomes start at the upstream AUG and translate a short out-of-frame peptide; others scan past it (leaky scanning). (c) Tyr inserted at UAG: some full-length protein, and some read-through of normal UAG stops.',
            },
          ],
          selfAssessment: [
            {
              question: 'Which molecule actually matches amino acids to codons, and what experiment showed it?',
              answerOutline: 'Aminoacyl-tRNA synthetases attach amino acids to tRNAs; the ribosome only checks codon-anticodon pairing. Chapeville\'s Cys-to-Ala conversion on charged tRNA-Cys put Ala at Cys codons.',
            },
            {
              question: 'Name the three tRNA sites of the ribosome and what each holds during elongation.',
              answerOutline: 'A: the incoming aminoacyl-tRNA; P: the tRNA carrying the growing peptide; E: the deacylated tRNA on its way out.',
            },
            {
              question: 'How does initiation differ between bacteria and eukaryotes?',
              answerOutline: 'Bacteria: 16S rRNA pairs with the Shine-Dalgarno sequence; fMet initiator; internal starts possible on polycistronic mRNA. Eukaryotes: the small subunit binds the 5′ cap and scans to the first AUG in good context; Met initiator.',
            },
          ],
          quiz: [
            {
              question: 'What is the anticodon, written 5′ to 3′, of the tRNA that reads the codon 5′-GCA-3′?',
              options: ['5′-CGU-3′', '5′-GCA-3′', '5′-ACG-3′', '5′-UGC-3′'],
              answer: 3,
              explanation:
                'Pairing is antiparallel: the anticodon is 3′-CGU-5′, which written 5′ to 3′ is UGC. CGU is the complement read in the wrong direction, a very common slip.',
            },
            {
              question: 'A tRNA that normally carries serine is mischarged with glycine by a faulty synthetase. Its anticodon still reads a serine codon. What happens at serine codons it reads?',
              options: [
                'Glycine is inserted',
                'Serine is inserted, because the ribosome proofreads the amino acid',
                'Translation stops',
                'The ribosome skips the codon',
              ],
              answer: 0,
              explanation:
                'The ribosome checks only codon-anticodon pairing, not the amino acid, so glycine goes in, exactly as in the Chapeville experiment.',
            },
            {
              question: 'An *E. coli* gene\'s Shine-Dalgarno sequence is deleted, but its promoter and coding sequence are intact. What is the most likely result?',
              options: [
                'Normal mRNA but little or no protein',
                'No mRNA',
                'A protein with fMet replaced by Met',
                'A longer protein',
              ],
              answer: 0,
              explanation:
                'Transcription is unaffected, so mRNA is made, but the small subunit cannot locate the start codon efficiently. Promoter mutations reduce mRNA; ribosome-binding-site mutations reduce translation of normal mRNA.',
            },
          ],
        },
        {
          slug: 'point-mutations-and-their-effects',
          title: 'Point mutations and what they do to proteins',
          summary:
            'Substitutions (transitions and transversions) and their effects on the protein: silent, missense, nonsense; insertions and deletions that shift or keep the frame; and the functional classes of mutant alleles, loss-of-function to dominant negative.',
          estimatedMinutes: 100,
          objectives: [
            'Classify a base substitution as a transition or transversion',
            'Predict whether a substitution is silent, missense or nonsense, and whether an indel shifts the frame',
            'Use HGVS-style notation such as p.Glu7Val and c.20A>T',
            'Classify alleles as loss-of-function (amorph, hypomorph) or gain-of-function (hypermorph, neomorph, antimorph) and predict which are dominant',
            'Explain sickle cell disease at the level of DNA, protein and phenotype',
          ],
          concepts: [
            'Transition (purine↔purine) and transversion',
            'Silent (synonymous), missense, nonsense',
            'Frameshift versus in-frame indel',
            'Stop-loss and start-loss',
            'Loss-of-function: null (amorph), hypomorph',
            'Gain-of-function: hypermorph, neomorph',
            'Dominant negative (antimorph)',
            'Haplosufficiency and haploinsufficiency',
          ],
          explanation: `A **point mutation** changes one or a few base pairs. Substitutions come in two kinds. A **transition** swaps a purine for a purine or a pyrimidine for a pyrimidine (A↔G, C↔T); a **transversion** swaps a purine for a pyrimidine or the reverse. Each base can change in one transition and two transversions, yet transitions are about twice as common in real genomes because of the chemistry of the errors that cause them.

**Effect on the protein** depends on where the change falls in the reading frame:
- **Silent (synonymous)**: the new codon codes for the same amino acid, usually a third-position change (CUU → CUC, both Leu).
- **Missense**: a different amino acid. Conservative swaps (Leu → Ile) are often mild; a charged residue replaced by a hydrophobic one inside a protein can be severe.
- **Nonsense**: a sense codon becomes a stop (UGG → UGA), truncating the protein; the mRNA is often destroyed by nonsense-mediated decay.
- **Frameshift**: inserting or deleting a number of bases not divisible by three changes every downstream codon, usually reaching a premature stop soon. Deleting three bases removes one amino acid and keeps the frame, as in the commonest cystic fibrosis allele, *CFTR* p.Phe508del.

**Sickle cell disease** is the classic missense case. In *HBB*, codon 7 (counting the initiator ATG as codon 1) is GAG, Glu; an A → T transversion makes it GTG, Val. In HGVS notation the change is c.20A>T, p.Glu7Val (older papers number from the mature protein and call it Glu6Val). The hydrophobic valine makes deoxygenated haemoglobin polymerise, so red cells sickle. Click base 20 in the first ten codons of *HBB* below and change it to T, then try other positions.

\`\`\`interactive
gen-central-dogma
{"dna": "ATGGTGCACCTGACTCCTGAGGAGAAGTCT", "mode": "mutate", "title": "The first ten codons of HBB", "caption": "These are the first ten codons of human β-globin (no stop codon is shown). Change base 20 from A to T to make the sickle-cell allele (Glu7Val). Then find a silent change in codon 3 (CAC, His), a nonsense change in codon 9 (AAG, Lys), and insert one base to see a frameshift."}
\`\`\`

**Functional classes.** H. J. Muller classified alleles by what they do. A **null** (amorphic) allele makes no function and a **hypomorph** makes less: these loss-of-function alleles are usually recessive, because most genes are **haplosufficient** (one good copy makes enough product). They are dominant only when the gene is haploinsufficient. A **hypermorph** makes more product or a more active one; a **neomorph** does something new (many oncogene and repeat-expansion alleles); an **antimorph** (dominant negative) makes a product that poisons the normal one, typical of proteins that work as multimers. Gain-of-function alleles are usually dominant.

The common mistake is to equate "mutation" with "harmful": most point mutations in a genome are silent or fall outside genes. Read UIC 2.4.2.`,
          resources: [
            uic(`${M2}/2.04%3A_Mutations_and_DNA_Repair/2.4.02%3A_Types_of_Mutations`, '2.4.2 Types of mutations', 'Point mutations, indels and their effects.', true),
            oog('04%3A_Mutation_and_Variation', 'Chapter 4, Mutation and variation', 'A genetics-first account of mutation classes with practice problems.'),
            db('https://www.ncbi.nlm.nih.gov/clinvar/', 'ClinVar', 'NCBI', 'Search HBB or CFTR and filter by molecular consequence to see real variants of each class.'),
          ],
          exercises: [
            {
              slug: 'classify-mutations',
              title: 'Classify each mutation',
              prompt: `The coding strand of a gene begins 5′-ATG GCT TGG AAA GAC CTG TTC CGC TAT GGA TGA-3′ (spaces mark codons). Classify each mutation as silent, missense (give the change, e.g. Lys4Glu), nonsense, frameshift or in-frame, and say whether it is a transition or transversion where relevant: (a) GCT → GCC; (b) TGG → TGA; (c) AAA → GAA; (d) deletion of the first C of CTG; (e) deletion of GAC; (f) TAT → TAA; (g) TGA → TGG. Check your answers with the mutate interactive above by typing this sequence (without spaces).`,
              kind: 'problem',
              difficulty: 1,
              hint: '(a) silent (Ala), transition; (b) nonsense at codon 3, transition (G→A); (c) Lys4Glu missense, transition; (d) frameshift; (e) in-frame deletion of Asp5; (f) Tyr9 → stop, transversion; (g) stop-loss.',
            },
            {
              slug: 'allele-classes',
              title: 'Dominant or recessive?',
              prompt: `For each allele, say whether you expect it to be dominant or recessive to wild type and classify it (amorph, hypomorph, hypermorph, neomorph or antimorph): (a) a nonsense mutation near the start of an enzyme gene; (b) a missense allele of a collagen gene whose product still assembles into triple helices but kinks them; (c) a duplication of a gene whose protein level is limiting for growth; (d) a mutation that makes a growth-factor receptor signal without its ligand; (e) a promoter mutation that halves expression of an enzyme. Give your reasoning about haplosufficiency for (a) and (e).`,
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'clinvar-classes',
              title: 'Variant classes in a real gene',
              prompt: `In ClinVar, search for the *CFTR* gene and filter to variants classified as pathogenic. Using the "molecular consequence" filter, count how many are missense, nonsense, frameshift, splice-site and in-frame deletions (give the date of your search, since ClinVar grows). Find p.Phe508del and p.Gly551Asp and say what each does to the protein. Write a paragraph on why most pathogenic *CFTR* variants cause recessive disease.`,
              kind: 'data-analysis',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does a single-base deletion usually do more damage than a single-base substitution?',
              answerOutline: 'A deletion shifts the reading frame, changing every downstream codon and usually creating a premature stop; a substitution changes at most one codon.',
            },
            {
              question: 'Why are most loss-of-function alleles recessive?',
              answerOutline: 'Most genes are haplosufficient: one functional copy makes enough product for a normal phenotype, so the heterozygote looks wild type.',
            },
            {
              question: 'What is a dominant negative allele and why are such alleles common in genes for multimeric proteins?',
              answerOutline: 'Its product interferes with the wild-type product. In a multimer, one defective subunit can spoil the whole complex, so even with a normal allele present most complexes fail.',
            },
          ],
          quiz: [
            {
              question: 'In a coding strand, the codon TGG (Trp) changes to TGA. What kind of mutation is this?',
              options: ['A silent transition', 'A missense transversion', 'A frameshift', 'A nonsense transition'],
              answer: 3,
              explanation:
                'UGA is a stop codon, so the protein is truncated (nonsense). G → A is purine to purine, a transition. Missense would need a different amino acid, not a stop.',
            },
            {
              question: 'Which change keeps the reading frame?',
              options: [
                'Deletion of one base',
                'Insertion of two bases',
                'Deletion of six bases',
                'Insertion of four bases',
              ],
              answer: 2,
              explanation:
                'Only indels whose length is a multiple of three keep the frame: six bases removes two codons. The others shift the frame.',
            },
            {
              question: 'A mutant allele makes no detectable protein, yet heterozygotes have the mutant phenotype. What best explains this?',
              options: [
                'The gene is haploinsufficient: half the normal amount of product is not enough',
                'The allele is dominant negative',
                'The allele is a neomorph',
                'Loss-of-function alleles are always dominant',
              ],
              answer: 0,
              explanation:
                'A dominant negative allele must make a product that interferes; this one makes none. With no product at all, dominance means one normal copy is not enough. Most loss-of-function alleles are recessive, not dominant.',
            },
            {
              question: 'In *HBB*, codon 7 changes from GAG to GTG. Which description is correct?',
              options: [
                'A transition causing Glu7Val',
                'A transversion causing Glu7Val, the sickle-cell allele',
                'A silent change, because both codons start with G',
                'A nonsense mutation',
              ],
              answer: 1,
              explanation:
                'A → T swaps a purine for a pyrimidine (transversion), and GUG codes for Val instead of Glu (GAG). That is the sickle-cell missense mutation.',
            },
          ],
        },
        {
          slug: 'mutagens-and-dna-repair',
          title: 'How mutations arise and how cells repair DNA',
          summary:
            'Spontaneous and induced mutation, the Luria-Delbrück fluctuation test, mutation rates, the Ames test, repeat expansions, and the repair pathways (mismatch, base excision, nucleotide excision, double-strand break repair) whose failure causes disease.',
          estimatedMinutes: 100,
          objectives: [
            'Explain the Luria-Delbrück fluctuation test and why it shows mutations arise before selection',
            'Describe spontaneous lesions (deamination, depurination, replication slippage) and the action of common mutagens',
            'Estimate the number of new mutations per genome per generation from a mutation rate',
            'Interpret an Ames test',
            'Match each repair pathway to the damage it fixes and to a human disease caused by its loss',
          ],
          concepts: [
            'Fluctuation test: variance ≫ mean',
            'Deamination of C to U and 5-methylcytosine to T',
            'Depurination and replication slippage',
            'Trinucleotide repeat expansion and anticipation',
            'EMS (G:C → A:T), UV (pyrimidine dimers), intercalators (frameshifts)',
            'Ames test with liver extract (S9)',
            'Mismatch repair (MutS, MutL, MutH; Lynch syndrome)',
            'Base excision, nucleotide excision (xeroderma pigmentosum), NHEJ and homologous recombination (BRCA1/2)',
          ],
          explanation: `**Do mutations arise because they are needed?** In 1943 Salvador Luria and Max Delbrück grew many small cultures of *E. coli*, each from a few cells, and plated each on phage T1 to count resistant mutants. If resistance were induced by exposure to the phage, every culture would give a similar small number (Poisson, variance about equal to the mean). If mutations happen at random during growth, a mutation early in one culture leaves a "jackpot" of many resistant descendants, so counts fluctuate wildly. They saw huge fluctuation, variance far above the mean: mutations arise before selection, at random with respect to need.

**Spontaneous mutation.** DNA is chemically fragile. **Deamination** turns cytosine into uracil (repaired efficiently) and 5-methylcytosine into thymine (harder to spot), which makes methylated CpG sites mutation hotspots. **Depurination** leaves a baseless site. Polymerase **slippage** in repeats adds or removes repeat units; expanded trinucleotide repeats cause Huntington disease (more than about 36-39 CAG copies in *HTT*), fragile X and others, and because long repeats grow further, symptoms can start earlier in each generation (**anticipation**).

**Rates.** The human germline rate is about $1.2 \\times 10^{-8}$ per base pair per generation. A diploid genome of about $6.2 \\times 10^9$ bp therefore acquires about $1.2 \\times 10^{-8} \\times 6.2 \\times 10^9 \\approx 74$ new mutations per child, more from older fathers.

**Induced mutation.** Base analogues (5-bromouracil) mispair; alkylating agents such as **EMS** add an ethyl group to G, which then pairs with T, giving G:C → A:T transitions; **intercalators** such as acridines slip between bases and cause frameshifts; **UV** light joins adjacent pyrimidines into dimers; ionising radiation breaks both strands. The **Ames test** (1973) uses *Salmonella* strains with a *his⁻* mutation and counts revertants that grow without histidine; adding a rat liver extract (S9) mimics metabolism, because many carcinogens become mutagenic only after the liver processes them.

**Repair.** Cells fix most damage before it becomes a mutation.
- **Direct reversal**: photolyase splits UV dimers (not in placental mammals); MGMT removes alkyl groups from G.
- **Mismatch repair** catches replication errors. In *E. coli*, MutS binds the mismatch, MutL recruits MutH, and MutH nicks the new strand, recognised because its GATC sites are not yet methylated. Inherited defects in human *MLH1* or *MSH2* cause **Lynch syndrome**, a colorectal cancer predisposition.
- **Base excision**: a glycosylase removes one damaged base (uracil, for example), then the gap is filled.
- **Nucleotide excision** cuts out a stretch around bulky lesions such as UV dimers; its loss causes **xeroderma pigmentosum**, with a skin cancer risk more than a thousand times normal.
- **Double-strand breaks** are joined by error-prone **non-homologous end joining** or copied from the sister chromatid by **homologous recombination** (needs *BRCA1* and *BRCA2*, so it works in S and G2).

Read UIC 2.4.1 and OpenStax 14.6, and look at the fluctuation table in the Luria-Delbrück paper.`,
          resources: [
            uic(`${M2}/2.04%3A_Mutations_and_DNA_Repair/2.4.01%3A_DNA_Damage_and_Repair`, '2.4.1 DNA damage and repair', 'Damage types and repair pathways.', true),
            ostx('14-6-dna-repair', '14.6 DNA repair', 'Proofreading, mismatch repair and excision repair.'),
            paper('https://pmc.ncbi.nlm.nih.gov/articles/PMC1209226/', 'Luria and Delbrück (1943), Mutations of bacteria from virus sensitivity to virus resistance', 'Genetics, free on PubMed Central', 'The fluctuation test. Compare the table of resistant counts in separate cultures with the counts from samples of one large culture.'),
          ],
          exercises: [
            {
              slug: 'fluctuation-data',
              title: 'Analyse a fluctuation test',
              prompt: `Ten independent cultures give these counts of phage-resistant colonies: 0, 1, 0, 0, 52, 3, 0, 1, 0, 7. Ten samples of one large culture give 9, 6, 7, 5, 8, 6, 7, 9, 5, 8. (a) Compute the mean and variance of each set. (b) Which set behaves like a Poisson distribution, and why? (c) Explain the jackpot of 52 in terms of when the mutation occurred. (d) Estimate the mutation rate from the fraction of independent cultures with no mutants (the p₀ method: m = −ln p₀ mutations per culture), given about 10⁸ cells per culture.`,
              kind: 'data-analysis',
              difficulty: 3,
              hint: 'Independent cultures: mean 6.4, variance about 250 (sample variance). Samples: mean 7.0, variance about 2.2. p₀ = 5/10, so m = 0.69 mutations per culture, about 7 × 10⁻⁹ per cell division (dividing by 10⁸ cells, since about that many divisions are needed to make them).',
            },
            {
              slug: 'ames-test',
              title: 'Interpret an Ames test',
              prompt: `A *his⁻* strain sensitive to frameshift mutagens gives these revertant colonies per plate: no chemical, 22; compound X without S9, 25; X with S9, 310; compound Y without S9, 180; Y with S9, 40. A base-substitution-sensitive strain gives about 20 for every condition. (a) Which compound is mutagenic as given, which only after metabolism? (b) What kind of mutation does each cause? (c) Why does the activity of Y fall with S9? (d) Why is a bacterial test a reasonable first screen for human carcinogens, and what are its limits?`,
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'repair-matching',
              title: 'Match damage to repair',
              prompt: `For each situation, name the repair pathway that should act, and what would happen in a cell lacking it: (a) a G:T mismatch just after replication; (b) uracil in DNA from cytosine deamination; (c) a thymine dimer after sun exposure; (d) a double-strand break in G1 versus in G2; (e) O⁶-methylguanine after exposure to an alkylating agent. Then explain why loss of mismatch repair causes instability of microsatellites (short repeats) in tumours.`,
              kind: 'problem',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What result did Luria and Delbrück predict for induced versus spontaneous mutation, and what did they see?',
              answerOutline: 'Induced: similar counts in every culture, variance ≈ mean (Poisson). Spontaneous: occasional jackpots and variance ≫ mean. They saw large fluctuation, so mutations were spontaneous and preceded selection.',
            },
            {
              question: 'How does E. coli mismatch repair know which strand is new?',
              answerOutline: 'Newly made DNA is temporarily unmethylated at GATC sites (Dam methylase lags behind the fork). MutH nicks the unmethylated strand of the hemimethylated GATC, so the new strand is corrected.',
            },
            {
              question: 'Why is homologous recombination repair restricted mostly to S and G2?',
              answerOutline: 'It copies the missing sequence from an undamaged identical template, the sister chromatid, which exists only after replication. In G1 cells mostly use non-homologous end joining.',
            },
          ],
          quiz: [
            {
              question: 'A species has a germline mutation rate of $1.0 \\times 10^{-8}$ per base pair per generation and a diploid genome of $6.0 \\times 10^9$ bp. How many new mutations does a typical offspring carry?',
              options: ['about 6', 'about 0.6', 'about 600', 'about 60'],
              answer: 3,
              explanation:
                '$1.0 \\times 10^{-8} \\times 6.0 \\times 10^9 = 60$. Using the haploid genome would give 30; slipping a power of ten gives 6 or 600.',
            },
            {
              question: 'Twenty independent bacterial cultures plated on an antibiotic give mutant counts with a mean of 4 and a variance of 4.2. What does this suggest?',
              options: [
                'Mutations arose at random during growth, before the antibiotic',
                'The cultures were too small to measure',
                'The mutation rate is zero',
                'Resistance was induced by exposure to the antibiotic (or the cultures were not independent)',
              ],
              answer: 3,
              explanation:
                'Variance about equal to the mean is the Poisson pattern expected if each cell had the same small chance of becoming resistant on the plate. Spontaneous mutation during growth produces jackpots and variance far above the mean.',
            },
            {
              question: 'A cell line is extremely sensitive to UV light but repairs uracil in DNA normally. Which pathway is most likely defective?',
              options: ['Mismatch repair', 'Base excision repair', 'Non-homologous end joining', 'Nucleotide excision repair'],
              answer: 3,
              explanation:
                'UV makes bulky pyrimidine dimers, removed by nucleotide excision repair (defective in xeroderma pigmentosum). Uracil is removed by base excision repair, which works here.',
            },
            {
              question: 'Treating bacteria with EMS, which alkylates guanine so it pairs with thymine, mostly produces which change?',
              options: ['G:C → A:T transitions', 'A:T → T:A transversions', 'Single-base frameshifts', 'Large deletions'],
              answer: 0,
              explanation:
                'Alkylated G pairs with T; at the next replication the T pairs with A, so G:C becomes A:T, a transition. Frameshifts are typical of intercalators such as acridines.',
            },
          ],
        },
      ],
      project: {
        slug: 'one-gene-from-genome-to-protein',
        title: 'One gene from genome to protein',
        description: `Follow the human β-globin gene, *HBB*, through every step of this module using public databases. In the UCSC Genome Browser (hg38) or Ensembl, find its chromosome, band, coordinates and strand; record the exon and intron lengths of the main transcript and compute the pre-mRNA and mature mRNA lengths. From NCBI Gene or Ensembl, take the coding sequence and translate the first 30 codons by hand, checking against the protein record (147 amino acids including the initiator Met). Identify the promoter region and any TATA-like box upstream of the start site. Then pick five ClinVar variants of different classes (missense, nonsense, frameshift, splice site, promoter) and explain for each what it does to transcription, splicing or translation, and why sickle cell disease (c.20A>T) and β-thalassaemia are different diseases of the same gene.`,
        deliverables: [
          'A labelled gene diagram with coordinates, exons, introns, UTRs and the five variants',
          'A table of lengths (gene, pre-mRNA, mRNA, coding sequence, protein) with how each was computed',
          'The hand translation of the first 30 codons and a comparison with the database protein',
          'A one-page explanation of the five variants and of sickle cell disease versus β-thalassaemia',
        ],
        estimatedHours: 3,
        stretchGoals: ['Compare *HBB* with the fetal globin genes *HBG1* and *HBG2* in the same cluster and explain why raising fetal haemoglobin helps sickle cell patients'],
      },
    },
    {
      slug: 'gene-regulation',
      title: 'Gene Regulation',
      description:
        'How cells decide which genes to express: the lac and trp operons and the partial-diploid genetics that revealed them, then transcription factors, enhancers and chromatin in eukaryotes, and epigenetic states that are inherited through cell division.',
      lessons: [
        {
          slug: 'the-lac-operon',
          title: 'The lac operon and the logic of cis and trans',
          summary:
            'Negative control of the lac operon by the Lac repressor and its inducer, and how Jacob and Monod used mutants and F′ partial diploids to tell cis-acting sites from trans-acting products.',
          estimatedMinutes: 110,
          objectives: [
            'Describe the lac operon (lacI, promoter, operator, lacZ, lacY, lacA) and how the repressor and inducer control it',
            'Predict expression of β-galactosidase and permease for any combination of lacI, lacO, lacZ and lacY alleles, with and without inducer',
            'Explain cis-acting versus trans-acting and use F′ merodiploids to tell them apart',
            'Classify alleles as constitutive, uninducible, recessive, dominant, cis-dominant or trans-dominant',
            'Reconstruct the reasoning of Jacob and Monod from their partial-diploid data',
          ],
          concepts: [
            'Operon: one promoter, polycistronic mRNA',
            'lacZ (β-galactosidase), lacY (permease), lacA',
            'Lac repressor (lacI) binds the operator',
            'Allolactose or IPTG as inducer',
            'Constitutive (I⁻, Oᶜ) and uninducible (Iˢ) mutants',
            'F′ lac partial diploids (merodiploids)',
            'Trans-acting product versus cis-acting site',
            'Iˢ trans-dominant, Oᶜ cis-dominant',
          ],
          explanation: `*E. coli* makes the enzymes for lactose only when lactose is present. The genes *lacZ* (β-galactosidase, which splits lactose), *lacY* (permease, which brings it in) and *lacA* (transacetylase) form an **operon**: they share one promoter and are transcribed into one mRNA. Upstream, *lacI* makes the **Lac repressor**, which binds the **operator** (*lacO*), overlapping the promoter, and blocks transcription. When lactose enters, some is converted to **allolactose**, which binds the repressor and releases it from the operator: the operon is **induced**. In the lab the synthetic inducer IPTG is used because the cell cannot break it down. This is **negative inducible** control.

**The genetic argument (Jacob and Monod, 1961).** Before anyone could purify the repressor, its existence was deduced from mutants. *lacI⁻* mutants made β-galactosidase all the time (**constitutive**). So did *lacOᶜ* (operator-constitutive) mutants. Were these the same kind of defect? Jacob and Monod used F′ plasmids carrying a copy of the *lac* region to make **partial diploids** (merodiploids), and asked which allele is dominant and whether it acts on both copies.

- *I⁻ Z⁺ / F′ I⁺ Z⁺*: inducible. *I⁺* is dominant, and the repressor made from the F′ also shuts off the chromosomal copy: *lacI* makes a diffusible product that acts **in trans**.
- *Oᶜ Z⁺ / F′ O⁺ Z⁻*: β-galactosidase is constitutive. But *O⁺ Z⁺ / F′ Oᶜ Z⁻* is inducible: the Oᶜ operator only makes genes on its own DNA molecule constitutive. The operator is a site that acts **in cis**, and Oᶜ is **cis-dominant**.
- *Iˢ*, the super-repressor, binds the operator but cannot bind inducer: the operon is **uninducible**, and *Iˢ / F′ I⁺* is still uninducible, because Iˢ repressor occupies every normal operator. Iˢ is **trans-dominant**.

The rule that solves every partial-diploid problem: each copy's *lacZ* and *lacY* are expressed only from that copy's own promoter and operator (cis), while repressor from any *lacI* gene in the cell acts on every operator (trans). Work each copy separately, then add up what the cell makes. Try the classic genotypes in the interactive below, toggling lactose to decide inducible or constitutive.

\`\`\`interactive
gen-lac-operon
{"genotype": "I- P+ O+ Z+ Y+", "fprime": "I+ P+ O+ Z+ Y+", "lactose": false, "glucose": false, "caption": "Start with I⁻ on the chromosome and I⁺ on the F′: toggle lactose and confirm both copies are inducible, so I⁺ is dominant and acts in trans. Then use the quick-set buttons for Oᶜ and Iˢ and predict each result before you look. Glucose is off here so that only the repressor matters; the next lesson adds it."}
\`\`\`

The common errors are letting an operator mutation act on the other copy, and forgetting that a *Z⁻* or *Y⁻* allele simply removes that product from its own copy. Read UIC 2.3.2 and OpenStax 16.2, then MIT 7.03's lecture notes on the lac operon.`,
          resources: [
            uic(`${M2}/2.03%3A_Gene_Expression/2.3.02%3A_Prokaryotic_Gene_Regulation`, '2.3.2 Prokaryotic gene regulation', 'The lac and trp operons.', true),
            ostx('16-2-prokaryotic-gene-regulation', '16.2 Prokaryotic gene regulation', 'Repressors, activators and inducers.'),
            mit703('pages/lecture-notes/', 'Lecture notes', 'The lectures on gene regulation in bacteria work through merodiploid tables in the Jacob-Monod style.'),
            oog('12%3A_Regulation_of_Gene_Expression', 'Chapter 12, Regulation of gene expression', 'More partial-diploid practice problems with answers.'),
          ],
          exercises: [
            {
              slug: 'merodiploid-table',
              title: 'Complete a partial-diploid table',
              prompt: `For each genotype, state whether β-galactosidase and permease are made without inducer and with inducer (assume no glucose), and classify each as inducible, constitutive or uninducible: (a) *I⁺ O⁺ Z⁺ Y⁺*; (b) *I⁻ O⁺ Z⁺ Y⁻ / F′ I⁺ O⁺ Z⁻ Y⁺*; (c) *I⁺ Oᶜ Z⁻ Y⁺ / F′ I⁺ O⁺ Z⁺ Y⁻*; (d) *Iˢ O⁺ Z⁺ Y⁺ / F′ I⁻ Oᶜ Z⁺ Y⁺*; (e) *I⁺ O⁺ Z⁻ Y⁻ / F′ I⁻ O⁺ Z⁺ Y⁺*; (f) *Iˢ O⁺ Z⁺ Y⁻ / F′ I⁺ O⁺ Z⁻ Y⁺*. Check each with the interactive.`,
              kind: 'problem',
              difficulty: 2,
              hint: '(b) both inducible. (c) permease constitutive (from the Oᶜ copy), β-galactosidase inducible (F′ copy). (d) both constitutive: the Oᶜ copy cannot be repressed even by Iˢ. (e) both inducible. (f) neither made.',
            },
            {
              slug: 'design-the-test',
              title: 'Is it in the operator or the repressor?',
              prompt: `You isolate a new constitutive *lac* mutant, *lac*-23. (a) Design an F′ cross that tells you whether it is an *I⁻*-type or an *Oᶜ*-type mutation, including the *Z* alleles you would put on each copy so that the answer can be read from β-galactosidase activity. (b) State the result expected for each possibility. (c) A third possibility is a dominant-negative *I⁻ᵈ* allele, whose subunits poison wild-type tetramers. How would its result differ from both?`,
              kind: 'problem',
              difficulty: 3,
              hint: 'Use lac-23 Z⁺ / F′ I⁺ O⁺ Z⁻. If lac-23 is I⁻, the F′ repressor restores inducibility. If it is Oᶜ, the Z⁺ on the same molecule stays constitutive. An I⁻ᵈ allele stays constitutive in trans too, like Oᶜ, but also makes a Z⁺ on the other copy constitutive: test with lac-23 Z⁻ / F′ I⁺ O⁺ Z⁺.',
            },
            {
              slug: 'jacob-monod-reasoning',
              title: 'Explain the operon model in writing',
              prompt: `In about 300 words, explain to someone who knows only Mendelian genetics how Jacob and Monod deduced, without biochemistry, that (a) *lacI* makes a diffusible repressor, (b) the operator is a DNA site, and (c) *lacZ* and *lacY* are transcribed together. Use the words cis, trans, dominant and partial diploid correctly, and give one genotype as evidence for each claim.`,
              kind: 'writing',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What is the difference between a cis-acting and a trans-acting mutation, and which lac genes are which?',
              answerOutline: 'A trans-acting mutation alters a diffusible product that can act on any copy (lacI). A cis-acting mutation alters a DNA site and affects only genes on the same molecule (lacO, lacP).',
            },
            {
              question: 'Why is I⁻ recessive but Iˢ dominant?',
              answerOutline: 'I⁻ makes no functional repressor; a wild-type I⁺ copy supplies repressor in trans. Iˢ makes a repressor that binds the operator and cannot be released by inducer, so it represses every operator even when normal repressor is also present.',
            },
            {
              question: 'Why does an Oᶜ mutation make only the genes next to it constitutive?',
              answerOutline: 'The operator is a binding site, not a product. An Oᶜ operator cannot bind repressor, so genes transcribed from that promoter on that DNA molecule are always on; a normal operator on another molecule is still repressed.',
            },
          ],
          quiz: [
            {
              question: 'What is the phenotype of the partial diploid *I⁺ O⁺ Z⁻ Y⁺ / F′ I⁻ Oᶜ Z⁺ Y⁻* (no glucose)?',
              options: [
                'β-galactosidase inducible; permease constitutive',
                'Both inducible',
                'β-galactosidase constitutive; permease inducible',
                'Both constitutive',
              ],
              answer: 2,
              explanation:
                'The only *Z⁺* is on the F′, next to Oᶜ, so β-galactosidase is made with or without inducer. The only *Y⁺* is on the chromosome, next to a normal operator, which the I⁺ repressor (acting in trans) controls: permease is inducible. Letting Oᶜ act on the other copy gives "both constitutive".',
            },
            {
              question: 'A strain is *Iˢ / F′ I⁺*, with both copies *O⁺ Z⁺*. What happens when lactose is added?',
              options: [
                'Both copies are induced, because I⁺ is dominant',
                'Neither copy is induced, because the Iˢ repressor cannot be released and acts in trans',
                'Only the F′ copy is induced',
                'Both copies are constitutive',
              ],
              answer: 1,
              explanation:
                'Iˢ repressor binds every normal operator and ignores inducer, so it is trans-dominant. Dominance of I⁺ applies to I⁻, which makes no repressor at all.',
            },
            {
              question: 'Which pair correctly describes *lacOᶜ*?',
              options: [
                'Recessive and trans-acting',
                'Dominant and trans-acting',
                'Cis-dominant: it acts only on genes on the same DNA molecule',
                'It prevents transcription of the operon',
              ],
              answer: 2,
              explanation:
                'Oᶜ operators cannot bind repressor, so the adjacent genes are always on whatever else is in the cell (dominant), but only on that molecule (cis). Being a DNA site, it makes no product that could act in trans.',
            },
          ],
        },
        {
          slug: 'positive-control-and-the-trp-operon',
          title: 'Positive control, catabolite repression and the trp operon',
          summary:
            'CAP and cAMP add a glucose sensor to the lac operon; the trp operon is repressible and fine-tuned by attenuation. Together they show the main logics of bacterial regulation.',
          estimatedMinutes: 100,
          objectives: [
            'Explain catabolite repression of lac by CAP-cAMP and predict expression for each combination of glucose and lactose',
            'Interpret a diauxic growth curve',
            'Describe the trp operon as a repressible system with tryptophan as corepressor',
            'Explain attenuation using the four leader regions and predict the effect of leader mutations',
            'Compare inducible and repressible, negative and positive control',
          ],
          concepts: [
            'CAP (CRP) and cAMP; adenylate cyclase',
            'Catabolite repression and diauxic growth',
            'Positive control: activator helps polymerase bind',
            'trp operon: repressible, tryptophan as corepressor',
            'Attenuation: leader peptide with two Trp codons',
            'Leader regions 1-2, 2-3 (antiterminator), 3-4 (terminator)',
            'Inducible versus repressible',
          ],
          explanation: `The lac promoter is weak. Even with the repressor gone, it needs help from an activator, the **catabolite activator protein** (CAP, also called CRP). CAP binds DNA just upstream of the promoter only when it carries **cyclic AMP**, and the bound CAP-cAMP bends the DNA and contacts RNA polymerase, raising transcription many times. cAMP is high when glucose is scarce. So the operon is strongly on only when **lactose is present and glucose is absent**: lactose removes the repressor (negative control), and low glucose provides the activator (**positive control**). With both sugars present, expression is low: **catabolite repression**. (Glucose also blocks lactose uptake through the permease, inducer exclusion, which matters at least as much in real cells.)

This explains Monod's **diauxic growth** curve: in a medium with both sugars, bacteria grow on glucose first, pause while they switch on *lac*, then grow on lactose. Mutants lacking adenylate cyclase (*cya⁻*) or CAP (*crp⁻*) cannot induce *lac* well even without glucose; adding cAMP rescues *cya⁻* but not *crp⁻*.

\`\`\`interactive
gen-lac-operon
{"genotype": "I+ P+ O+ Z+ Y+", "lactose": true, "glucose": true, "editable": false, "caption": "Lactose and glucose are both present: the repressor is off the operator, yet expression is low. Turn glucose off and watch CAP-cAMP bind and transcription rise. Then turn lactose off: with no inducer, CAP alone cannot overcome the repressor."}
\`\`\`

**The trp operon** encodes the five enzymes that make tryptophan, and logic says they should be made when tryptophan is **lacking**. The Trp repressor (*trpR*) is inactive alone; when tryptophan binds it as a **corepressor**, it binds the operator and stops transcription. This is negative **repressible** control.

**Attenuation** fine-tunes it. The mRNA begins with a leader encoding a 14-amino-acid peptide containing **two adjacent Trp codons**, followed by four regions that can pair as 1:2, 2:3 or 3:4. A 3:4 hairpin followed by U's is a terminator. Because bacteria translate while transcribing, the ribosome's progress decides which hairpin forms. With plenty of tryptophan, the ribosome reads the Trp codons quickly, covers region 2, and 3:4 forms: transcription stops before the structural genes. When tryptophan is scarce, the ribosome **stalls** at the Trp codons on region 1, region 2 pairs with 3 (the **antiterminator**), 3:4 cannot form, and transcription continues. Repression gives roughly a 70-fold range and attenuation about 10-fold more.

Common errors: treating glucose as a repressor that binds the operator, and thinking that loss of *trpR* abolishes all regulation (attenuation still works). Read UIC 2.3.2 and OpenStax 16.2.`,
          resources: [
            uic(`${M2}/2.03%3A_Gene_Expression/2.3.02%3A_Prokaryotic_Gene_Regulation`, '2.3.2 Prokaryotic gene regulation', 'Return to the trp operon and catabolite repression sections.', true),
            ostx('16-2-prokaryotic-gene-regulation', '16.2 Prokaryotic gene regulation', 'The trp operon, CAP and the lac operon in one figure set.'),
            griffiths('Chapter 18, Regulation of gene transcription, covers catabolite repression and attenuation in depth. NCBI blocks automated access, so open it in a browser.'),
          ],
          exercises: [
            {
              slug: 'four-conditions',
              title: 'Four sugar conditions',
              prompt: `For a wild-type *E. coli* strain, predict *lac* transcription (none or basal, low, high) in each condition, saying whether the repressor is on the operator and whether CAP-cAMP is bound: (a) no sugars; (b) glucose only; (c) lactose only; (d) glucose and lactose. Repeat for (e) a *crp⁻* mutant with lactose only, (f) a *cya⁻* mutant with lactose only plus added cAMP, and (g) an *I⁻* mutant with glucose only. Check with the interactive.`,
              kind: 'problem',
              difficulty: 1,
              hint: 'Only (c) and (f) give high. (d) and (g) give low (repressor off, CAP-cAMP absent). (e) is low.',
            },
            {
              slug: 'attenuation-mutants',
              title: 'Leader mutations',
              prompt: `Predict transcription of the *trp* structural genes in high and low tryptophan for each mutant, explaining which leader hairpins form: (a) both Trp codons of the leader changed to Ala codons; (b) the leader start codon AUG changed to AUC, so the leader peptide is not translated; (c) a deletion of region 3; (d) a mutation that destabilises the 2:3 pairing; (e) a *trpR⁻* mutant. Which mutants have lost the response to tryptophan completely?`,
              kind: 'problem',
              difficulty: 3,
              hint: '(a) the ribosome never stalls for lack of Trp: terminator in both conditions (repression still lifts in low Trp, but most transcripts terminate). (b) no ribosome on the leader: 1:2 forms, then 3:4: terminates. (c) no terminator can form: read-through in both conditions (still repressible). (e) repressor gone, attenuation still regulates about 10-fold.',
            },
            {
              slug: 'diauxie-curve',
              title: 'Read a diauxic growth curve',
              prompt: `Sketch the growth curve (log cell number against time) for *E. coli* in a medium with a little glucose and plenty of lactose, and mark where β-galactosidase activity rises. Then sketch it for a *crp⁻* mutant and for an *I⁻* mutant in the same medium. For each sketch, explain the shape in two sentences. Monod's diauxie experiments in the 1940s started the path to the operon model; why was the lag phase between the two growth phases a clue?`,
              kind: 'writing',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why is lac transcription low when both glucose and lactose are present?',
              answerOutline: 'Lactose (allolactose) removes the repressor, but glucose keeps cAMP low, so CAP-cAMP does not bind and the weak promoter is poorly used. Glucose also limits lactose uptake (inducer exclusion).',
            },
            {
              question: 'How does a ribosome stalled at the Trp codons prevent termination?',
              answerOutline: 'Stalled on region 1, it leaves region 2 free to pair with region 3 (antiterminator), which prevents the 3:4 terminator hairpin from forming, so polymerase continues into the structural genes.',
            },
            {
              question: 'Compare lac and trp in terms of inducible/repressible and negative/positive control.',
              answerOutline: 'lac is inducible: negative control by repressor plus positive control by CAP-cAMP. trp is repressible: negative control by Trp-bound repressor, plus attenuation.',
            },
          ],
          quiz: [
            {
              question: 'A *cya⁻* mutant cannot make cAMP. What is its *lac* expression in a medium with lactose and no glucose?',
              options: [
                'High, because the repressor is removed',
                'Zero, because the repressor stays bound',
                'Low, because CAP cannot bind without cAMP',
                'High in the absence of lactose too',
              ],
              answer: 2,
              explanation:
                'Lactose still removes the repressor, but without cAMP, CAP cannot bind and activate the weak promoter, so transcription stays low. Adding cAMP to the medium would rescue it.',
            },
            {
              question: 'In the *trp* leader, the two Trp codons are changed to codons for alanine, which is abundant. What happens when tryptophan is scarce?',
              options: [
                'Transcription continues normally, as in wild type',
                'Most transcripts terminate in the leader, because the ribosome no longer stalls',
                'The repressor binds more tightly',
                'The leader peptide is not made at all',
              ],
              answer: 1,
              explanation:
                'Stalling at Trp codons is how the leader senses tryptophan. With Ala codons, the ribosome moves on, covers region 2, and the 3:4 terminator forms even in starvation. The repressor is irrelevant here: it is already off in low tryptophan.',
            },
            {
              question: 'What is the main difference between an inducible and a repressible operon?',
              options: [
                'Inducible operons are switched on by a small molecule (often a substrate); repressible operons are switched off by one (often an end product)',
                'Inducible operons use repressors; repressible operons use activators',
                'Inducible operons are always under positive control',
                'Repressible operons have no operator',
              ],
              answer: 0,
              explanation:
                'lac is turned on by its substrate\'s derivative; trp is turned off by its product. Both use repressor proteins: the difference is whether the small molecule inactivates the repressor (inducer) or activates it (corepressor).',
            },
            {
              question: 'A *trpR⁻* mutant has no functional Trp repressor. How do its *trp* enzyme levels respond to tryptophan?',
              options: [
                'No response at all',
                'They are zero in all conditions',
                'They rise in high tryptophan',
                'They still fall somewhat in high tryptophan, through attenuation',
              ],
              answer: 3,
              explanation:
                'Without repressor, initiation is constitutive, but attenuation still terminates most transcripts when tryptophan is plentiful. Assuming the repressor is the only control is the mistake.',
            },
          ],
        },
        {
          slug: 'eukaryotic-gene-regulation',
          title: 'Eukaryotic gene regulation: activators, enhancers and RNA',
          summary:
            'In eukaryotes, activators bound at enhancers, sometimes far away, recruit coactivators and the general machinery to promoters. Combinatorial control, insulators, reporter assays, and regulation after transcription by splicing, microRNAs and mRNA stability.',
          estimatedMinutes: 100,
          objectives: [
            'Distinguish core promoter, proximal elements and enhancers, and explain how enhancers act at a distance',
            'Explain the modular structure of transcription factors using GAL4 and domain-swap experiments',
            'Explain combinatorial control and the role of insulators',
            'Interpret a reporter-gene experiment that maps an enhancer',
            'Describe post-transcriptional regulation by alternative splicing, microRNAs and mRNA decay',
          ],
          concepts: [
            'Core promoter and proximal elements',
            'Enhancers: distance- and orientation-independent',
            'DNA looping and Mediator',
            'Activator: DNA-binding domain + activation domain',
            'GAL4 and UAS; LexA-GAL4 domain swap',
            'Combinatorial control',
            'Insulators (boundary elements)',
            'microRNA and RNA interference',
          ],
          explanation: `Eukaryotic regulation is built on a different default. Chromatin makes most DNA inaccessible, and RNA polymerase II with its general factors works poorly on its own, so most genes are off until **activators** turn them on.

**Regulatory DNA.** The **core promoter** (TATA box, initiator) positions the polymerase. Nearby **proximal elements** bind common activators. **Enhancers** are short clusters of binding sites that can lie thousands of base pairs upstream, downstream or inside an intron, and work in either orientation: move one 10 kb away or flip it and it still activates. The DNA between them **loops** so that activators bound at the enhancer contact the **Mediator** complex and coactivators at the promoter. A single gene can have several enhancers, each driving it in a different tissue or time; many disease-associated variants found by GWAS lie in such enhancers.

**Activators are modular.** The yeast activator GAL4 has a **DNA-binding domain** that recognises a site called the UAS (upstream activating sequence) and a separate **activation domain** that recruits the machinery. In 1985 Roger Brent and Mark Ptashne fused the DNA-binding domain of the bacterial LexA repressor to the GAL4 activation domain: the hybrid activated a gene with LexA sites, which GAL4 alone could not. Binding and activating are separable jobs. Geneticists exploit this: the GAL4/UAS system drives any gene in chosen *Drosophila* tissues, and the two-hybrid screen detects protein-protein interactions.

**Combinatorial control.** A few thousand transcription factors control about 20,000 genes because each enhancer responds to a combination. A gene might need factors A and B together, so it is on only in cells that make both. **Insulators** (bound by CTCF in vertebrates) block an enhancer from acting on a promoter beyond them and help divide the genome into domains.

**Mapping an enhancer with a reporter.** Fuse a candidate regulatory fragment to a minimal promoter and a reporter gene such as luciferase or GFP, put it into cells, and measure. Deleting pieces until activity disappears locates the enhancer; mutating single binding sites tests which factors matter. Because an enhancer acts in cis, a mutation in one copy affects only the allele on that chromosome, which shows up as **allele-specific expression** in a heterozygote.

**After transcription.** Regulation continues: alternative splicing (module 2), mRNA export and stability, and **microRNAs**. The first, *lin-4*, was found in *C. elegans* in 1993; such 21- to 23-nt RNAs, loaded into Argonaute proteins, pair with the 3′ UTRs of target mRNAs and reduce their translation and stability. Fire and Mello's discovery of **RNA interference** (1998) turned the same machinery into a tool for knocking down any gene with double-stranded RNA. Read UIC 2.3.3, OpenStax 16.4 and 16.5.`,
          resources: [
            uic(`${M2}/2.03%3A_Gene_Expression/2.3.03%3A_Eukaryotic_Gene_Regulation`, '2.3.3 Eukaryotic gene regulation', 'Transcription factors, enhancers and post-transcriptional control.', true),
            ostx('16-4-eukaryotic-transcription-gene-regulation', '16.4 Eukaryotic transcription gene regulation', 'Promoters, enhancers and transcription factors.'),
            ostx('16-5-eukaryotic-post-transcriptional-gene-regulation', '16.5 Eukaryotic post-transcriptional gene regulation', 'Splicing, RNA stability and microRNAs.'),
          ],
          exercises: [
            {
              slug: 'reporter-deletion-map',
              title: 'Locate an enhancer',
              prompt: `A 5 kb fragment upstream of a liver gene drives luciferase strongly in liver cells (100 units) and not in kidney cells (2 units). Deletions from the 5′ end give: removing the first 1 kb, 98; first 2 kb, 95; first 3 kb, 4; first 4 kb, 3. An internal deletion of kb 2.0-2.3 gives 5. The 2.0-2.3 kb piece placed downstream of the reporter in reverse orientation gives 90. (a) Where is the enhancer? (b) Which result shows it is an enhancer rather than part of the promoter? (c) Why is activity low in kidney cells, if the DNA is identical? (d) Propose the next experiment to find which factor binds it.`,
              kind: 'data-analysis',
              difficulty: 2,
              hint: 'The activity is lost between 2 and 3 kb and specifically with 2.0-2.3 kb removed. Working downstream and reversed is the enhancer test. Kidney cells lack the activator (a trans difference); mutate predicted binding sites or do a binding assay.',
            },
            {
              slug: 'domain-swap',
              title: 'Domain swaps and the two-hybrid idea',
              prompt: `Predict whether a reporter is activated in yeast for each construct, and explain: (a) GAL4 full length, reporter with UAS; (b) GAL4 DNA-binding domain only, reporter with UAS; (c) LexA DNA-binding domain fused to GAL4 activation domain, reporter with LexA sites; (d) the same fusion, reporter with UAS only; (e) GAL4 DNA-binding domain fused to protein X, plus GAL4 activation domain fused to protein Y, reporter with UAS. For (e), explain how this becomes a test for whether X binds Y.`,
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'mirna-targets',
              title: 'microRNA logic',
              prompt: `A microRNA pairs with a 7-nt "seed" site in the 3′ UTR of its targets. (a) Explain why a mutation in the seed site of one target gene raises that gene's protein level but has no effect on other targets. Is that mutation cis- or trans-acting? (b) What happens to all targets if the microRNA gene is deleted? (c) Roughly how many 7-nt seed matches would you expect by chance in a random 3′ UTR of 1,000 nt, and why does that make predicting real targets hard?`,
              kind: 'problem',
              difficulty: 2,
              hint: '(c) about 1000/4⁷ ≈ 0.06 per UTR per microRNA, but with hundreds of microRNAs and tens of thousands of UTRs, chance matches are everywhere.',
            },
          ],
          selfAssessment: [
            {
              question: 'What experimental properties define an enhancer?',
              answerOutline: 'It increases transcription from a promoter, works at a distance (kilobases), upstream or downstream or in an intron, and in either orientation. It acts in cis.',
            },
            {
              question: 'What did the LexA-GAL4 fusion show about transcription factors?',
              answerOutline: 'DNA binding and activation are separate domains: a foreign DNA-binding domain fused to the GAL4 activation domain activates genes with the foreign binding site.',
            },
            {
              question: 'How can a limited number of transcription factors give highly specific expression patterns?',
              answerOutline: 'Combinatorial control: each enhancer requires a particular combination of factors, so expression occurs only where that combination is present; multiple enhancers add patterns.',
            },
          ],
          quiz: [
            {
              question: 'A DNA fragment boosts transcription of a reporter 50-fold when placed 200 bp upstream, 8 kb upstream or 3 kb downstream of the gene, in either orientation. The fragment is best described as',
              options: ['a core promoter', 'an insulator', 'an operator', 'an enhancer'],
              answer: 3,
              explanation:
                'Distance- and orientation-independent activation is the definition of an enhancer. A core promoter works only at the start site in one orientation; an insulator blocks enhancers instead of providing activation.',
            },
            {
              question: 'A woman is heterozygous for a mutation that destroys an enhancer of gene *G* on one copy of chromosome 11; her coding sequences are normal. In her liver, what do you expect?',
              options: [
                'No *G* expression from either allele',
                'Normal expression from both alleles, because the other copy\'s enhancer acts on both',
                'Expression mostly from the allele with the intact enhancer',
                'Doubled expression from the normal allele',
              ],
              answer: 2,
              explanation:
                'An enhancer acts in cis, on the gene on its own chromosome. The allele next to the broken enhancer is underexpressed; the other allele is unaffected, so expression is allele-specific. The intact enhancer cannot reach across to the homologue.',
            },
            {
              question: 'A hybrid protein contains the DNA-binding domain of GAL4 and no activation domain. In a yeast strain lacking GAL4, it is expressed with a reporter carrying a UAS. What happens?',
              options: [
                'It binds the UAS but does not activate the reporter',
                'The reporter is strongly activated',
                'It cannot bind the UAS without an activation domain',
                'It activates genes lacking the UAS',
              ],
              answer: 0,
              explanation:
                'The domains are separable: binding needs only the DNA-binding domain, but activation needs an activation domain to recruit the machinery.',
            },
          ],
        },
        {
          slug: 'epigenetics',
          title: 'Epigenetics: chromatin states, imprinting and X inactivation',
          summary:
            'Heritable changes in gene activity without changes in DNA sequence: DNA methylation, histone modifications, genomic imprinting (Igf2/H19, Prader-Willi and Angelman syndromes), X inactivation and position-effect variegation.',
          estimatedMinutes: 100,
          objectives: [
            'Explain how DNA methylation at CpG sites is maintained through replication and how it silences promoters',
            'Relate histone acetylation and methylation to active and repressed chromatin',
            'Predict phenotypes in crosses involving imprinted genes',
            'Explain X inactivation, Barr bodies and calico cats, and count inactive X chromosomes in aneuploids',
            'Distinguish genuine epigenetic inheritance from ordinary environmental effects',
          ],
          concepts: [
            'CpG methylation; DNMT1 maintenance, DNMT3 de novo',
            'CpG islands at promoters',
            'Histone acetylation (open) and H3K9me3/H3K27me3 (closed)',
            'Genomic imprinting: parent-of-origin expression',
            'Igf2 (paternal) and H19 (maternal)',
            'Prader-Willi and Angelman syndromes (15q11-q13)',
            'X inactivation, XIST, Barr body, mosaicism',
            'Position-effect variegation',
          ],
          explanation: `**Epigenetic** describes a state of gene activity that is inherited through cell division without a change in the DNA sequence. Every cell in your body has the same genome; liver and neuron differ because different genes are kept on or off, and those states are copied when cells divide.

**DNA methylation.** In mammals, methyl groups are added to cytosines in **CpG** dinucleotides. Because CpG on one strand pairs with GpC on the other, a methylated site is symmetrical. After replication each daughter duplex is **hemimethylated**, and the maintenance enzyme DNMT1 methylates the new strand to match: the pattern is copied. DNMT3 enzymes add new marks during development. Promoters often lie in **CpG islands**; when an island is methylated, the gene is silenced, largely by recruiting proteins that compact chromatin. Methylation can be read with bisulfite sequencing, which converts unmethylated C to U while leaving methylated C unchanged.

**Histone marks.** Acetylated lysines on histone tails loosen chromatin and accompany active genes; methylation of histone H3 lysine 4 marks active promoters, while H3K9 and H3K27 methylation mark silent heterochromatin and Polycomb-repressed genes. Some marks recruit enzymes that make the same mark nearby, which helps them persist.

**Genomic imprinting.** For about 100 to 200 mammalian genes only one parent's allele is expressed. *Igf2*, a fetal growth factor, is expressed from the **paternal** allele; its neighbour *H19* from the maternal one. Imprints are set by methylation in the germline and erased and reset every generation. A mouse heterozygous for a null *Igf2* allele is small if it inherited the mutation from its father and normal if from its mother, and its own offspring depend on its sex, not on how it was born. In humans, loss of the **paternal** 15q11-q13 region causes **Prader-Willi** syndrome; loss of the **maternal** copy, which carries the only active *UBE3A* in neurons, causes **Angelman** syndrome. Pedigrees for imprinted traits show this parent-of-origin pattern.

**X inactivation.** Female mammals have two X chromosomes; to equalise dosage with males, one X in each cell is silenced early in development, chosen at random (Mary Lyon, 1961). The long non-coding RNA **XIST** coats the chosen X, which becomes a condensed **Barr body**. All descendants of a cell keep the same choice, so females are **mosaics**: in tortoiseshell and calico cats, patches show which X (orange or black allele) is active. Every X beyond the first is inactivated, so a cell has (number of X) − 1 Barr bodies: one in 47,XXY, two in 47,XXX.

**Position-effect variegation** in *Drosophila*: a *white⁺* gene moved next to heterochromatin by an inversion is silenced in some cells and not others, giving mottled eyes.

Beware of over-reading: an environmental effect on a phenotype is not automatically epigenetic, and claims of inheritance across many generations in mammals are mostly weak. Read OpenStax 16.3 and Learn.Genetics on imprinting.`,
          resources: [
            ostx('16-3-eukaryotic-epigenetic-gene-regulation', '16.3 Eukaryotic epigenetic gene regulation', 'Chromatin modification and DNA methylation.', true),
            learn('epigenetics/', 'Epigenetics', 'An interactive introduction; then open the imprinting and inheritance pages.'),
            learn('epigenetics/imprinting/', 'Genomic imprinting', 'Worked examples of parent-of-origin effects.'),
          ],
          exercises: [
            {
              slug: 'imprinting-crosses',
              title: 'Imprinting in crosses',
              prompt: `*Igf2* is expressed only from the paternal allele; *Igf2⁻* is a null allele and mice that do not express *Igf2* are small. Predict the proportions of small and normal offspring: (a) wild-type female × *Igf2⁻/+* male; (b) *Igf2⁻/+* female × wild-type male; (c) *Igf2⁻/+* female × *Igf2⁻/+* male. (d) A small male from cross (a) is mated with a wild-type female: what are his offspring? (e) Sketch a human pedigree for an imprinted disease gene expressed only from the maternal allele and explain how it would look different from autosomal dominant inheritance.`,
              kind: 'problem',
              difficulty: 2,
              hint: '(a) 1/2 small. (b) all normal. (c) 1/2 small (those receiving the father\'s Igf2⁻). (d) 1/2 small: he passes Igf2⁻ to half, and through a male it is expressed.',
            },
            {
              slug: 'barr-bodies',
              title: 'X inactivation counts',
              prompt: `(a) How many Barr bodies are in the cells of individuals with each karyotype: 46,XX; 46,XY; 45,X; 47,XXY; 47,XXX; 48,XXXY? (b) Why are sex-chromosome aneuploidies much milder than autosomal trisomies? (c) Turner syndrome (45,X) still has clinical features. Given that some genes escape X inactivation, explain why. (d) A calico cat is male. What is his most likely karyotype?`,
              kind: 'problem',
              difficulty: 1,
              hint: '0, 0, 0, 1, 2, 2. Genes that escape inactivation are expressed from every X, so 45,X has half the normal dose of those genes. The male calico is XXY.',
            },
            {
              slug: 'bisulfite',
              title: 'Read a bisulfite experiment',
              prompt: `A promoter region reads 5′-ACGTTCGAGCGA-3′ in the reference. After bisulfite treatment and sequencing, the DNA from tumour cells reads 5′-ACGTTCGAGTGA-3′ and from normal cells 5′-ATGTTTGAGTGA-3′ (the treatment converts unmethylated C to U, read as T; methylated C stays C). (a) Which CpG sites are methylated in each sample? (b) In which sample would you expect the gene to be silenced? (c) Why is this a common finding for tumour-suppressor genes in cancer?`,
              kind: 'data-analysis',
              difficulty: 2,
              hint: 'There are three CpGs (positions 2-3, 6-7, 10-11). Tumour: the first two are methylated (still C), the third is not. Normal: none are methylated. Promoter hypermethylation silences the tumour suppressor in the tumour, an epigenetic "hit".',
            },
          ],
          selfAssessment: [
            {
              question: 'How is a DNA methylation pattern copied when DNA replicates?',
              answerOutline: 'CpG sites are symmetrical. Replication gives hemimethylated DNA; DNMT1 recognises the methylated parental strand and methylates the opposite CpG on the new strand.',
            },
            {
              question: 'What pattern of inheritance does an imprinted, paternally expressed gene show?',
              answerOutline: 'A mutant allele causes a phenotype only when inherited from the father; inherited from the mother it is silent. The same individual\'s offspring are affected or not depending on that individual\'s sex.',
            },
            {
              question: 'Why are women heterozygous for an X-linked allele mosaics?',
              answerOutline: 'Each cell randomly inactivates one X early in development, and its descendants keep that choice, so patches of tissue express one allele or the other.',
            },
          ],
          quiz: [
            {
              question: 'A gene is expressed only from the maternal allele. A man heterozygous for a null allele of it (inherited from his mother, so he is affected) has children with an unaffected woman who carries no mutation. What fraction of their children is affected?',
              options: ['$\\tfrac{1}{2}$', '$\\tfrac{1}{4}$', 'All', 'None'],
              answer: 3,
              explanation:
                'Children who get his null allele receive it from their father, and the paternal copy is silenced anyway; their maternal copy is normal and active. None is affected, although half are carriers who could pass it on from a mother.',
            },
            {
              question: 'How many Barr bodies are in the somatic cells of a person with karyotype 48,XXXY?',
              options: ['1', '2', '3', '0'],
              answer: 1,
              explanation:
                'All X chromosomes but one are inactivated: $3 - 1 = 2$. The Y does not count. Answering 3 inactivates every X.',
            },
            {
              question: 'Identical twins differ in the methylation of a promoter by age 50, and one expresses the gene less. This is best described as',
              options: [
                'a mutation in the promoter of one twin',
                'X inactivation',
                'genomic imprinting',
                'an epigenetic difference: same sequence, different heritable chromatin state in their cells',
              ],
              answer: 3,
              explanation:
                'The DNA sequence is the same; the methylation state differs and is copied through cell division. Imprinting refers specifically to parent-of-origin expression, set in the germline.',
            },
            {
              question: 'Which observation shows that X inactivation in a female is random and clonally maintained?',
              options: [
                'Patches of cells in a heterozygous female express one allele or the other, as in calico cats',
                'All her cells inactivate her father\'s X',
                'Females have twice as much X-linked gene product as males',
                'Barr bodies are found in males',
              ],
              answer: 0,
              explanation:
                'Patches mean each early cell chose an X at random and its descendants kept the choice. Paternal-X-only inactivation happens in marsupials and mouse placenta, not in most eutherian tissues.',
            },
          ],
        },
      ],
      project: {
        slug: 'rebuild-the-pajama-table',
        title: 'Rebuild the Jacob-Monod partial-diploid table',
        description: `Reconstruct the reasoning that produced the operon model, as if you were in Paris in 1959 without any biochemistry. Using the lac operon interactive as your "experiment", build a table of at least twelve haploid and partial-diploid genotypes covering *I⁺, I⁻, Iˢ, O⁺, Oᶜ, Z⁺, Z⁻, Y⁺, Y⁻* in cis and trans combinations. For each, predict β-galactosidase and permease with and without inducer before you check. Then write the argument: which genotypes show that *lacI* acts in trans, that the operator acts in cis, that *Z* and *Y* are co-transcribed (polar effects aside), and that *Iˢ* makes a repressor that cannot bind inducer. Finish with the CAP-cAMP layer: predict each of four sugar conditions for wild type, *crp⁻* and *I⁻*, and explain how the two controls combine. The PaJaMo experiment (Pardee, Jacob and Monod, 1959), in which *lac⁺* genes entered an *I⁻* recipient by conjugation, is a good place to start your reading.`,
        deliverables: [
          'A table of at least twelve genotypes with predicted and checked expression for both products, with and without inducer',
          'A two-page argument deriving the operon model from the table',
          'A four-condition table for the CAP-cAMP layer with explanations',
        ],
        estimatedHours: 3,
        stretchGoals: ['Read about the λ phage lysis-lysogeny switch (cI and Cro) and explain it with the same cis/trans logic'],
      },
    },
    {
      slug: 'cell-division-and-chromosome-mutations',
      title: 'Cell Division and Chromosome Mutations',
      description:
        'How chromosomes move: the cell cycle and its checkpoints (and what cancer does to them), mitosis, and meiosis as the physical basis of Mendel\'s laws. Then what happens when chromosome number or structure goes wrong: aneuploidy, polyploidy, deletions, duplications, inversions and translocations.',
      lessons: [
        {
          slug: 'cell-cycle-mitosis-and-cancer',
          title: 'The cell cycle, mitosis and the genetics of cancer',
          summary:
            'The phases of the cell cycle, what happens to chromosomes in each stage of mitosis, the checkpoints run by cyclins, CDKs, Rb and p53, and how mutations in proto-oncogenes and tumour-suppressor genes cause cancer.',
          estimatedMinutes: 100,
          objectives: [
            'Describe the phases of the cell cycle and the stages of mitosis, tracking chromosomes, chromatids and DNA content',
            'Explain how cyclin-CDK complexes, Rb and p53 control the G1/S and G2/M transitions, and what the spindle checkpoint does',
            'Distinguish proto-oncogenes from tumour-suppressor genes and explain why their mutations act dominantly or recessively at the cell level',
            'Explain Knudson\'s two-hit hypothesis using hereditary and sporadic retinoblastoma',
            'Explain why inherited cancer predisposition is dominant in pedigrees though recessive in cells',
          ],
          concepts: [
            'G1, S, G2, M; G0',
            'Prophase, metaphase, anaphase, telophase, cytokinesis',
            'Cyclins and cyclin-dependent kinases (CDKs)',
            'Checkpoints: G1/S, G2/M, spindle assembly',
            'Rb and E2F; p53 as guardian of the genome',
            'Proto-oncogene → oncogene (gain of function, e.g. RAS)',
            'Tumour suppressor (loss of function, e.g. RB1, TP53)',
            'Knudson two-hit hypothesis; loss of heterozygosity',
          ],
          explanation: `**The cycle.** A dividing eukaryotic cell passes through G1 (growth), **S** (DNA replication), G2 (preparation) and **M** (mitosis and cytokinesis). Cells that stop dividing enter G0. Through S phase, each chromosome becomes two sister chromatids joined at the centromere, and DNA content goes from 2C to 4C.

**Mitosis** separates sister chromatids so each daughter gets an identical set. In **prophase** chromosomes condense and the spindle forms; in prometaphase the nuclear envelope breaks down and kinetochores attach to microtubules; at **metaphase** chromosomes line up on the plate; at **anaphase** the cohesin holding sisters together is cleaved and each chromatid, now called a chromosome, moves to a pole; **telophase** and cytokinesis finish two 2C daughter cells. Count carefully: a human cell has 46 chromosomes (92 chromatids) at metaphase but 92 chromosomes at anaphase, because each separated chromatid counts as a chromosome.

**Checkpoints.** Progress is driven by **cyclin-dependent kinases** (CDKs), active only when bound to a cyclin whose level rises and falls through the cycle. At the **G1/S checkpoint**, G1 cyclin-CDKs phosphorylate the **Rb** protein, which releases the transcription factor E2F to switch on S-phase genes. DNA damage activates **p53**, which halts the cycle (by inducing the CDK inhibitor p21), triggers repair, or orders apoptosis. The **spindle assembly checkpoint** delays anaphase until every kinetochore is attached; drugs that disrupt microtubules arrest cells in metaphase, which is how karyotypes are prepared.

**Cancer genetics.** A tumour is a clone of cells that has escaped these controls through several mutations. Two kinds of gene matter:
- **Proto-oncogenes** promote division. A gain-of-function mutation makes an **oncogene**, dominant at the cell level: one mutant copy suffices. A *RAS* mutation that locks the protein in its active GTP-bound state is the classic case; the *BCR-ABL1* fusion of the next lessons is another.
- **Tumour-suppressor genes** restrain division or repair damage (*RB1*, *TP53*, *BRCA1*). Loss of function is recessive at the cell level: both copies must be lost.

**Knudson (1971)** compared retinoblastoma cases. Hereditary cases were often bilateral and appeared earlier; sporadic cases were single tumours, later. He proposed **two hits**: in hereditary cases every cell already carries one mutant *RB1* allele, so one more somatic hit in any retinal cell starts a tumour, which is likely to happen several times; sporadic cases need two independent hits in the same cell, which is rare. The tumours show **loss of heterozygosity**: the normal allele is lost. Hence the paradox you must keep clear: cancer predisposition is inherited as an **autosomal dominant** trait in pedigrees (with incomplete penetrance) although the gene acts **recessively** in each cell.

Read UIC 2.1.1 and 2.1.3 and OpenStax 10.2 to 10.4.`,
          resources: [
            uic(`${M2}/2.01%3A_Mitosis_Meiosis_and_the_Cell_Cycle/2.1.01%3A_The_Cell_Cycle`, '2.1.1 The cell cycle', 'Phases of the cycle and the stages of mitosis.', true),
            uic(`${M2}/2.01%3A_Mitosis_Meiosis_and_the_Cell_Cycle/2.1.03%3A_Cancer_and_the_Cell_Cycle`, '2.1.3 Cancer and the cell cycle', 'Proto-oncogenes, tumour suppressors and the checkpoints.'),
            ostx('10-3-control-of-the-cell-cycle', '10.3 Control of the cell cycle', 'Cyclins, CDKs and the checkpoints; continue with 10.4 on cancer.'),
            paper('https://pmc.ncbi.nlm.nih.gov/articles/PMC389051/', 'Knudson (1971), Mutation and cancer: statistical study of retinoblastoma', 'PNAS, free on PubMed Central', 'The two-hit hypothesis from age-of-onset data. Look at how the curves for bilateral and unilateral cases differ.'),
          ],
          exercises: [
            {
              slug: 'mitosis-counts',
              title: 'Track chromosomes through mitosis',
              prompt: `For a cell with 2*n* = 8 and 1C = 2.5 pg, give the number of chromosomes, the number of chromatids and the DNA content (pg) at: G1, the end of S, metaphase, anaphase (whole cell), and each daughter cell after cytokinesis. Then draw the metaphase plate with two pairs of homologues shaded differently (maternal and paternal), and explain why the two daughter cells are genetically identical.`,
              kind: 'problem',
              difficulty: 1,
              hint: 'G1 8, 8, 5 pg; end of S 8, 16, 10 pg; metaphase 8, 16, 10 pg; anaphase 16 chromosomes (each a single chromatid), 10 pg; daughter 8, 8, 5 pg.',
            },
            {
              slug: 'two-hit-arithmetic',
              title: 'Two hits, in numbers',
              prompt: `Suppose each retinal precursor cell has a probability of 10⁻⁷ of a somatic loss of a particular *RB1* allele, and there are about 2 × 10⁶ such cells per eye. (a) In a child who inherited one mutant allele, what is the expected number of cells per eye that suffer the second hit? Using the Poisson distribution, what is the chance that an eye has no tumour? (b) In a child with two normal alleles, why does a tumour need two hits in the same cell, and roughly how likely is it per eye with these numbers? (c) Relate your answers to Knudson's observations about bilateral tumours.`,
              kind: 'problem',
              difficulty: 3,
              hint: '(a) 2 × 10⁶ × 10⁻⁷ = 0.2 per eye; P(no tumour) = e^(−0.2) ≈ 0.82 with these toy numbers. Real rates are higher (penetrance is about 90 %). (b) about 2 × 10⁶ × (10⁻⁷)² = 2 × 10⁻⁸ per eye, ignoring cell divisions between hits: tens of millions of times rarer.',
            },
            {
              slug: 'oncogene-or-suppressor',
              title: 'Oncogene or tumour suppressor?',
              prompt: `Classify each as an oncogenic gain of function or a tumour-suppressor loss of function, and say whether one or two mutant copies are needed in a cell: (a) a missense mutation that prevents RAS from hydrolysing GTP; (b) deletion of both copies of *CDKN2A*, which encodes a CDK inhibitor; (c) amplification of *MYC* to 50 copies; (d) a nonsense mutation in one *TP53* allele plus loss of the other chromosome 17p; (e) a translocation that puts *MYC* next to an immunoglobulin enhancer. Explain why a dominant-negative *TP53* missense allele behaves differently from a *TP53* null allele.`,
              kind: 'problem',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'How many chromosomes does a human cell contain at anaphase of mitosis, and why?',
              answerOutline: '92: the 46 pairs of sister chromatids separate and each chromatid is counted as a chromosome.',
            },
            {
              question: 'How does Rb control entry into S phase?',
              answerOutline: 'Unphosphorylated Rb binds and inhibits E2F. G1 cyclin-CDK phosphorylates Rb, releasing E2F to activate S-phase genes.',
            },
            {
              question: 'Why is hereditary retinoblastoma dominant in pedigrees but RB1 recessive in cells?',
              answerOutline: 'Each child who inherits one mutant allele almost always gets a second somatic hit in some retinal cell, so tumours appear in about half the children (dominant pattern). In a cell, one normal allele is enough; the tumour needs both lost.',
            },
          ],
          quiz: [
            {
              question: 'A cell with 2*n* = 12 is at anaphase of mitosis. How many chromosomes are in the cell at that moment?',
              options: ['6', '12', '24', '48'],
              answer: 2,
              explanation:
                'The 12 replicated chromosomes have split into 24 separate chromatids, each now a chromosome, moving to the two poles. 12 counts the chromosomes at metaphase.',
            },
            {
              question: 'Which mutation is most likely to act dominantly in a single cell to promote cancer?',
              options: [
                'A null allele of *RB1*',
                'A null allele of *TP53* with a normal second copy',
                'A deletion of one copy of *BRCA2*',
                'A *RAS* mutation that keeps the protein permanently active',
              ],
              answer: 3,
              explanation:
                'Activated RAS is a gain-of-function oncogene: one copy drives signalling. The other three are single losses of tumour-suppressor genes, and the remaining normal copy still works in that cell.',
            },
            {
              question: 'Children with hereditary retinoblastoma usually develop tumours in both eyes, at a younger age than sporadic cases. In Knudson\'s model, why?',
              options: [
                'Their tumours need only one somatic mutation, since every cell already carries one mutant allele',
                'They inherit two mutant alleles',
                'Their tumours are caused by an oncogene',
                'Their retinal cells divide faster',
              ],
              answer: 0,
              explanation:
                'With the first hit inherited, any of millions of retinal cells needs just one more, which is likely to happen several times. Inheriting two mutant alleles would affect every cell from conception, which is not what is seen.',
            },
          ],
        },
        {
          slug: 'meiosis-and-the-chromosome-theory',
          title: 'Meiosis and the chromosome theory of inheritance',
          summary:
            'How meiosis halves the chromosome number, pairs and recombines homologues, and assorts them independently, and how Sutton, Boveri and Bridges tied Mendel\'s laws to chromosomes.',
          estimatedMinutes: 100,
          objectives: [
            'Describe the stages of meiosis I and II, contrasting them with mitosis',
            'Track chromosomes, chromatids and DNA content through meiosis',
            'Explain synapsis, chiasmata and crossing over, and why crossing over happens at the four-chromatid stage',
            'Compute the number of chromosome combinations produced by independent assortment',
            'Explain how meiosis accounts for segregation and independent assortment, and how Bridges\'s nondisjunction proved the chromosome theory',
          ],
          concepts: [
            'Meiosis I is reductional; meiosis II is equational',
            'Synapsis and the synaptonemal complex',
            'Bivalent (tetrad), chiasma, crossing over',
            'Independent orientation of bivalents: $2^n$ combinations',
            'Homologues separate at anaphase I; sisters at anaphase II',
            'Chromosome theory (Sutton and Boveri, 1902-1903)',
            'Bridges (1916): exceptional flies from X nondisjunction',
          ],
          explanation: `**Meiosis** makes haploid gametes (or spores) from a diploid cell. It follows one round of DNA replication with two divisions.

**Meiosis I** is the unusual one. In prophase I, homologous chromosomes find each other and pair along their length (**synapsis**), held by the synaptonemal complex. Each pair, a **bivalent**, has four chromatids. Non-sister chromatids break and rejoin at matching points: **crossing over**, visible later as **chiasmata**. Each bivalent normally gets at least one crossover, which also holds the homologues together until anaphase. At metaphase I, bivalents line up with homologues facing opposite poles, each bivalent oriented **independently** of the others. At anaphase I, **homologues** separate; sister chromatids stay together. Each daughter cell now has *n* chromosomes, each still two chromatids: meiosis I is **reductional**.

**Meiosis II** is like mitosis: sister chromatids separate, giving four haploid cells with one chromatid per chromosome. In a human: 46 chromosomes (4C) at the start of meiosis I; 23 chromosomes (2C) in each cell after meiosis I; 23 chromosomes (1C) in each gamete.

**Two sources of variety.** Independent orientation alone gives $2^n$ combinations of maternal and paternal chromosomes: $2^{23} \\approx 8.4$ million for a human gamete. Crossing over then mixes alleles within each chromosome, so in practice no two gametes are alike.

**Meiosis explains Mendel.** A heterozygote *Aa* has *A* on one homologue and *a* on the other; homologues separate at anaphase I, so half the gametes get *A* and half *a*: the law of **segregation**. Genes on different chromosomes go into gametes independently because bivalents orient independently: the law of **independent assortment**. Genes on the same chromosome do not assort independently unless they are far apart, which is the subject of the linkage module.

**The chromosome theory.** Walter Sutton and Theodor Boveri noticed in 1902-1903 that chromosomes behave exactly as Mendel's factors should. The proof came from Calvin Bridges (1916). In crosses of white-eyed *Drosophila* females with red-eyed males, the sons should all be white-eyed and the daughters red. About 1 fly in 2000 broke the rule: white-eyed daughters and red-eyed sons. Bridges predicted these came from eggs that kept both X chromosomes or none (**nondisjunction**), so the exceptional females should be XXY and the males X with no Y, and he confirmed it by looking at their chromosomes. A gene's inheritance had been predicted from a chromosome's behaviour.

The confusions to avoid: homologues separate in meiosis I, not II; crossing over is between non-sister chromatids; and a cell at the end of meiosis I is haploid in chromosome number even though each chromosome still has two chromatids. Read UIC 2.1.5 and OpenStax 11.1.`,
          resources: [
            uic(`${M2}/2.01%3A_Mitosis_Meiosis_and_the_Cell_Cycle/2.1.05%3A_Meiosis`, '2.1.5 Meiosis', 'Stages of meiosis and comparison with mitosis.', true),
            ostx('11-1-the-process-of-meiosis', '11.1 The process of meiosis', 'Clear figures of synapsis, crossing over and the two divisions.'),
            paper('https://pmc.ncbi.nlm.nih.gov/articles/PMC1193653/', 'Bridges (1916), Non-disjunction as proof of the chromosome theory of heredity', 'Genetics, free on PubMed Central', 'The first paper in the first issue of Genetics. Read the introduction and the account of the exceptional flies.'),
            ostx('13-1-chromosomal-theory-and-genetic-linkage', '13.1 Chromosomal theory and genetic linkage', 'Sutton, Boveri and Morgan; read the first half now and the rest in the linkage module.'),
          ],
          exercises: [
            {
              slug: 'meiosis-table',
              title: 'Track a cell through meiosis',
              prompt: `For a cell with 2*n* = 6 (three pairs) and 1C = 1.0 pg, make a table of chromosome number, chromatid number and DNA content at: G1; prophase I; the end of telophase I (each cell); the end of telophase II (each cell). Then draw metaphase I for a cell heterozygous *Aa* on chromosome 1 and *Bb* on chromosome 2, showing the two possible orientations, and list the gametes each orientation produces.`,
              kind: 'problem',
              difficulty: 1,
              hint: 'G1 6, 6, 2.0; prophase I 6, 12, 4.0; after meiosis I 3, 6, 2.0; gamete 3, 3, 1.0. The two orientations give AB + ab or Ab + aB, so overall the four types are equally likely.',
            },
            {
              slug: 'mitosis-vs-meiosis',
              title: 'Mitosis versus meiosis',
              prompt: `Write a comparison table of mitosis and meiosis covering: number of divisions; whether homologues pair; when crossing over happens; what separates at each anaphase; chromosome number and genetic make-up of the products; and the purpose. Then answer: a cell at metaphase has 10 chromosomes, all lined up singly with sister chromatids facing opposite poles, and the organism has 2*n* = 10. Is it in mitosis, meiosis I or meiosis II? What if the organism has 2*n* = 20?`,
              kind: 'writing',
              difficulty: 2,
              hint: 'Single chromosomes (not bivalents) on the plate means mitosis or meiosis II. With 2n = 10 and 10 chromosomes, mitosis; with 2n = 20 and only 10 chromosomes, meiosis II.',
            },
            {
              slug: 'bridges-predictions',
              title: 'Bridges\'s exceptional flies',
              prompt: `A white-eyed female ($X^w X^w$) is crossed with a red-eyed male ($X^+ Y$). (a) What are the normal progeny? (b) If nondisjunction in the mother produces $X^w X^w$ and nullo-X eggs, list the zygotes they make with $X^+$ and $Y$ sperm and their phenotypes, given that XXY flies are fertile females, X0 flies are sterile males, and XXX and Y0 zygotes usually die. (c) Which exceptional progeny did Bridges find, and what did he predict their chromosomes would be? (d) Why was this a stronger test of the chromosome theory than Morgan's sex-linkage results alone?`,
              kind: 'problem',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What separates at anaphase I and what at anaphase II?',
              answerOutline: 'Anaphase I: homologous chromosomes (each still two chromatids). Anaphase II: sister chromatids.',
            },
            {
              question: 'How does meiosis explain Mendel\'s law of independent assortment, and when does the law fail?',
              answerOutline: 'Bivalents of different chromosomes orient independently at metaphase I, so alleles of genes on different chromosomes enter gametes independently. It fails for genes close together on the same chromosome (linkage).',
            },
            {
              question: 'What did Bridges predict and observe, and why did it prove the chromosome theory?',
              answerOutline: 'Rare exceptional white-eyed daughters and red-eyed sons were predicted to be XXY and X0 from X nondisjunction in the mother; cytology confirmed it. An unusual gene pattern was explained by, and predicted, an unusual chromosome pattern.',
            },
          ],
          quiz: [
            {
              question: 'Ignoring crossing over, how many genetically different gametes, in terms of maternal and paternal chromosomes, can an organism with 2*n* = 10 produce?',
              options: ['10', '20', '32', '1024'],
              answer: 2,
              explanation:
                'There are $n = 5$ bivalents, each oriented in 2 ways: $2^5 = 32$. 1024 uses $2^{10}$, counting each chromosome rather than each pair.',
            },
            {
              question: 'Which event separates the alleles *A* and *a* of a heterozygote, if no crossing over occurs between the gene and the centromere?',
              options: [
                'Anaphase of mitosis',
                'Anaphase I of meiosis, when homologues separate',
                'Anaphase II of meiosis, when sister chromatids separate',
                'S phase, when DNA replicates',
              ],
              answer: 1,
              explanation:
                '*A* and *a* sit on different homologues, so they separate when homologues do, at anaphase I. Sister chromatids carry the same allele, so anaphase II separates *A* from *A*. (With a crossover between gene and centromere, segregation is delayed to meiosis II.)',
            },
            {
              question: 'A cell from an organism with 2*n* = 20 is in prophase II. How many chromosomes and chromatids does it contain?',
              options: [
                '20 chromosomes, 40 chromatids',
                '10 chromosomes, 10 chromatids',
                '20 chromosomes, 20 chromatids',
                '10 chromosomes, 20 chromatids',
              ],
              answer: 3,
              explanation:
                'After meiosis I each cell has $n = 10$ chromosomes, each still two sister chromatids: 20 chromatids. 10 chromatids describes the gamete after meiosis II.',
            },
            {
              question: 'Crossing over occurs between',
              options: [
                'non-sister chromatids of homologous chromosomes',
                'sister chromatids of one chromosome',
                'non-homologous chromosomes',
                'chromosomes in mitosis',
              ],
              answer: 0,
              explanation:
                'Exchange between non-sister chromatids of a bivalent creates new combinations of alleles. Exchange between sisters swaps identical sequences and changes nothing; exchange between non-homologues is a translocation.',
            },
          ],
        },
        {
          slug: 'changes-in-chromosome-number',
          title: 'Changes in chromosome number: aneuploidy and polyploidy',
          summary:
            'Nondisjunction in meiosis I and II and the gametes each produces; trisomy 21, Turner and Klinefelter syndromes; autopolyploids and why triploids are sterile; allopolyploids, wheat and new species.',
          estimatedMinutes: 100,
          objectives: [
            'Predict the gametes produced by nondisjunction in meiosis I versus meiosis II',
            'Name the common human aneuploidies and explain why sex-chromosome aneuploidies are milder',
            'Use karyotype notation for aneuploids and polyploids',
            'Explain why autotriploids are mostly sterile and compute the chance of a balanced gamete',
            'Explain allopolyploidy and compute chromosome numbers of allopolyploids',
          ],
          concepts: [
            'Euploidy versus aneuploidy',
            'Trisomy (2n + 1), monosomy (2n − 1), nullisomy',
            'Nondisjunction in meiosis I versus II',
            'Down syndrome (47,+21) and maternal age',
            'Turner (45,X) and Klinefelter (47,XXY)',
            'Autopolyploid; triploid sterility',
            'Allopolyploid (amphidiploid); wheat 6x = 42',
            'Mosaicism',
          ],
          explanation: `**Euploid** cells have whole sets of chromosomes (*n*, 2*n*, 3*n*...); **aneuploid** cells have one or a few chromosomes too many or too few. A trisomic is 2*n* + 1, a monosomic 2*n* − 1.

**Nondisjunction** is the usual cause: chromosomes that should separate go to the same pole. Where it happens decides the gametes.
- In **meiosis I**, the two homologues go together. Both products of meiosis I are abnormal, so all four gametes are: two *n* + 1 (carrying both homologues) and two *n* − 1.
- In **meiosis II**, the two sister chromatids of one cell go together. The other cell divides normally, so of four gametes two are normal, one *n* + 1 (with two copies of the same homologue) and one *n* − 1.

Molecular markers can tell which: a trisomic child carrying two *different* maternal homologues points to a maternal meiosis I error.

**Human aneuploidy.** Most autosomal aneuploidies are lethal before birth; aneuploidy is the commonest known cause of miscarriage. Live-born exceptions are trisomies 13, 18 and 21. **Down syndrome** (47,XX,+21 or 47,XY,+21) occurs in about 1 in 700 births; about 95 % of cases are free trisomies, most from maternal meiosis I errors, and the risk climbs steeply with maternal age, partly because human oocytes wait in meiosis I for decades. Sex-chromosome aneuploidies are much milder, because all X chromosomes beyond one are inactivated (epigenetics lesson) and the Y carries few genes: **Turner syndrome** (45,X; females, short stature, ovarian failure) and **Klinefelter syndrome** (47,XXY; males, small testes, infertility). These also show that in humans the Y, not the number of X chromosomes, determines maleness.

**Polyploidy** is common in plants. An **autopolyploid** has extra sets from one species. Autotriploids are usually sterile: at meiosis each chromosome type has three copies, and each gamete gets one or two copies at random. A gamete is balanced (all chromosome types in one copy, or all in two) with probability about $2 \\times (\\tfrac12)^n$. For a triploid banana with $n = 11$ that is $2/2048 \\approx 0.001$, which is why bananas and seedless watermelons have no viable seeds. Even-numbered autopolyploids (4*n*) are more fertile.

**Allopolyploids** combine sets from different species. A hybrid between a species with 2*n* = 14 and one with 2*n* = 18 has 7 + 9 = 16 chromosomes that cannot pair, so it is sterile; if its chromosome number doubles, every chromosome has a partner again and the new 2*n* = 32 plant is fertile and reproductively isolated from both parents: a new species in one step. Bread wheat is an allohexaploid (AABBDD, 6*x* = 42) built from three ancestral species.

Mixing up nondisjunction in meiosis I and II, and treating polyploidy and aneuploidy as the same thing, are the usual errors. Read UIC 2.1.6 and OpenStax 13.2.`,
          resources: [
            uic(`${M2}/2.01%3A_Mitosis_Meiosis_and_the_Cell_Cycle/2.1.06%3A_Errors_in_Meiosis`, '2.1.6 Errors in meiosis', 'Nondisjunction, aneuploidy and polyploidy.', true),
            ostx('13-2-chromosomal-basis-of-inherited-disorders', '13.2 Chromosomal basis of inherited disorders', 'Karyotypes, nondisjunction and the human syndromes.'),
            oog('09%3A__Changes_in_Chromosome_Number_and_Structure', 'Chapter 9, Changes in chromosome number and structure', 'Polyploidy in plants and practice problems.'),
          ],
          exercises: [
            {
              slug: 'nondisjunction-gametes',
              title: 'Draw nondisjunction',
              prompt: `A woman is heterozygous for two different DNA markers on chromosome 21: her maternal homologue carries marker allele 1 and her paternal homologue allele 2 (assume no crossing over). (a) Draw the gametes from normal meiosis, from nondisjunction of chromosome 21 in meiosis I, and from nondisjunction in meiosis II. (b) Her child with trisomy 21 has marker alleles 1, 2 and 3, where 3 came from the father. In which division, and in which parent, did nondisjunction happen? (c) What if the child had 1, 1 and 3?`,
              kind: 'problem',
              difficulty: 2,
              hint: '(b) both maternal homologues present: maternal meiosis I. (c) two copies of the same homologue: maternal meiosis II (crossing over near the marker can confuse this in real data).',
            },
            {
              slug: 'polyploid-numbers',
              title: 'Polyploid arithmetic',
              prompt: `(a) Radish (2*n* = 18) and cabbage (2*n* = 18) produce a sterile hybrid; Karpechenko's fertile *Raphanobrassica* (1928) arose by doubling. How many chromosomes does the hybrid have, and the fertile allotetraploid? (b) A triploid plant has 3*n* = 21. What fraction of its gametes are balanced (*n* or 2*n*)? (c) Bread wheat is 6*x* = 42. What is *x*, how many chromosomes are in a wheat pollen nucleus, and how many bivalents form in meiosis? (d) Why can tetraploid and diploid forms of one plant species not interbreed successfully?`,
              kind: 'problem',
              difficulty: 2,
              hint: '(a) 18 and 36. (b) n = 7: 2 × (1/2)⁷ = 1/64. (c) x = 7, pollen 21, 21 bivalents. (d) the cross gives sterile triploids.',
            },
            {
              slug: 'aneuploidy-case',
              title: 'Interpret karyotypes',
              prompt: `For each karyotype, state the sex, name the condition if it has one, give the number of Barr bodies, and say whether it arose most likely from nondisjunction in the mother, the father, or either: (a) 47,XXY where the child carries the father's X marker; (b) 45,X where the X carries maternal markers; (c) 47,XYY; (d) 47,XX,+18; (e) 46,XX/47,XX,+21 (two cell lines). For (e), explain how a mosaic arises after fertilisation.`,
              kind: 'problem',
              difficulty: 2,
              hint: '(a) X and Y both from the father: paternal meiosis I. (b) the missing sex chromosome is paternal. (c) paternal meiosis II (YY). (e) mitotic nondisjunction (or loss) in an early embryo.',
            },
          ],
          selfAssessment: [
            {
              question: 'How do the gametes from nondisjunction in meiosis I and meiosis II differ?',
              answerOutline: 'Meiosis I: all four gametes abnormal, two n + 1 (with both homologues) and two n − 1. Meiosis II: two normal, one n + 1 (two copies of one homologue), one n − 1.',
            },
            {
              question: 'Why are most triploids sterile but most allotetraploids fertile?',
              answerOutline: 'In a triploid, three homologues cannot split evenly, so gametes get random numbers of each chromosome and are almost all unbalanced. In an allotetraploid every chromosome has exactly one partner, so meiosis is regular.',
            },
            {
              question: 'Why are sex-chromosome aneuploidies far more often compatible with life than autosomal ones?',
              answerOutline: 'Extra X chromosomes are inactivated, so dosage changes only for the few genes that escape; the Y carries few genes. Autosomal trisomy changes the dose of hundreds of active genes.',
            },
          ],
          quiz: [
            {
              question: 'Nondisjunction of one chromosome pair occurs in meiosis II in one of the two cells produced by meiosis I. What fraction of the four gametes is normal?',
              options: ['0', '$\\tfrac{1}{4}$', '$\\tfrac{1}{2}$', '$\\tfrac{3}{4}$'],
              answer: 2,
              explanation:
                'The other meiosis II cell divides normally and gives two normal gametes; the faulty one gives one $n+1$ and one $n-1$. Zero normal gametes is the meiosis I result.',
            },
            {
              question: 'A triploid plant has 3*n* = 15. Approximately what fraction of its gametes carry a balanced set of chromosomes (either *n* or 2*n*)?',
              options: ['$\\tfrac{1}{2}$', '$\\tfrac{1}{16}$', '$\\tfrac{1}{32}$', '$\\tfrac{2}{3}$'],
              answer: 1,
              explanation:
                'With $n = 5$ chromosome types, each going one-or-two at random, a gamete is all-one or all-two with probability $2 \\times (\\tfrac12)^5 = \\tfrac{1}{16}$. $\\tfrac{1}{32}$ counts only the all-one case.',
            },
            {
              question: 'A fertile allopolyploid arises by chromosome doubling of the hybrid between a species with 2*n* = 16 and a species with 2*n* = 24. What is its chromosome number?',
              options: ['20', '40', '24', '80'],
              answer: 1,
              explanation:
                'The hybrid gets $8 + 12 = 20$ chromosomes (sterile, unpaired); doubling gives 40, a full diploid set from each parent. 20 is the sterile hybrid itself.',
            },
            {
              question: 'Which karyotype is aneuploid rather than polyploid?',
              options: ['3*n* = 33 (a banana)', '6*x* = 42 (bread wheat)', '45,X (Turner syndrome)', '4*n* = 48 (a tetraploid potato)'],
              answer: 2,
              explanation:
                'Aneuploidy is a change in single chromosomes; 45,X lacks one. The others are whole extra sets (euploid polyploids).',
            },
          ],
        },
        {
          slug: 'changes-in-chromosome-structure',
          title: 'Changes in chromosome structure: deletions, duplications, inversions and translocations',
          summary:
            'How chromosome rearrangements arise and what they do in heterozygotes: pseudodominance in deletions, unequal crossing over and gene duplication, inversion loops and crossover suppression, translocation semisterility, Robertsonian translocations and the Philadelphia chromosome.',
          estimatedMinutes: 100,
          objectives: [
            'Describe deletions, duplications, inversions and translocations and how they pair in heterozygotes',
            'Use pseudodominance in deletion heterozygotes to map recessive genes',
            'Explain why crossovers inside an inversion loop give unbalanced or acentric/dicentric products',
            'Predict the gametes of a reciprocal translocation heterozygote and explain semisterility',
            'Explain familial Down syndrome from a Robertsonian translocation and the Philadelphia chromosome in leukaemia',
          ],
          concepts: [
            'Deletion (deficiency) and pseudodominance',
            'Duplication, unequal crossing over, Bar eye',
            'Paracentric versus pericentric inversion',
            'Inversion loop; dicentric bridge and acentric fragment',
            'Reciprocal translocation; alternate versus adjacent segregation',
            'Semisterility',
            'Robertsonian translocation (14;21)',
            'Philadelphia chromosome t(9;22) and BCR-ABL1',
          ],
          explanation: `Chromosome breaks that are mis-repaired, or crossovers between misaligned repeats, rearrange chromosomes. Four kinds matter, and their effects show most clearly in **heterozygotes**, where the rearranged chromosome must pair with a normal one in meiosis.

**Deletions** remove a segment. Large ones are usually lethal when homozygous and harmful when heterozygous (cri-du-chat syndrome is a deletion of part of 5p). A deletion heterozygote has only one copy of the genes in the missing region, so a recessive allele on the other homologue shows its phenotype: **pseudodominance**. This is a mapping tool: cross a recessive mutant with a set of overlapping deletions, and the deletions that uncover the mutant phenotype contain the gene.

**Duplications** repeat a segment. The *Drosophila* Bar eye phenotype is a tandem duplication that arose by **unequal crossing over** between misaligned copies; Sturtevant showed in 1925 that Bar can mutate to double Bar and back by the same mechanism. Over evolutionary time, duplicated genes diverge into gene families such as the globins.

**Inversions** flip a segment end to end: **paracentric** if the centromere is outside it, **pericentric** if it is inside. No genes are lost, so carriers are usually normal, but in an inversion heterozygote the homologues can pair along their length only by forming a **loop**. A single crossover inside a paracentric loop produces one chromatid with two centromeres (a **dicentric bridge**, which breaks at anaphase) and one with none (an **acentric fragment**, which is lost); inside a pericentric loop it produces chromatids with duplications and deletions. Either way, gametes carrying recombinant chromatids are inviable, so the recombinants are missing from the progeny: inversions **suppress recombination** in heterozygotes. Geneticists exploit this in "balancer" chromosomes that keep mutations together.

**Reciprocal translocations** exchange segments between non-homologous chromosomes. The heterozygote forms a cross-shaped group of four at meiosis. **Alternate** segregation (both normal chromosomes to one pole, both translocated to the other) gives balanced gametes; **adjacent** segregation gives gametes with a duplication and a deletion. Roughly half the gametes are unbalanced, which gives **semisterility** in plants and recurrent miscarriage in humans, while the carrier is phenotypically normal.

**Robertsonian translocations** fuse two acrocentric chromosomes at their centromeres. A carrier of a 14;21 fusion has 45 chromosomes and is normal, but can produce a gamete carrying the fused chromosome plus a normal 21, giving a child with three copies of chromosome 21's long arm: **familial Down syndrome**, which, unlike free trisomy, recurs in the family regardless of maternal age.

**Translocations in cancer.** In chronic myeloid leukaemia, the **Philadelphia chromosome**, t(9;22)(q34;q11), fuses *BCR* to *ABL1*, making a permanently active tyrosine kinase, an oncogene. The drug imatinib, which blocks it, was one of the first targeted cancer therapies.

Read OpenStax 13.2 and Online Open Genetics chapter 9.`,
          resources: [
            ostx('13-2-chromosomal-basis-of-inherited-disorders', '13.2 Chromosomal basis of inherited disorders', 'The sections on chromosome structural rearrangements.', true),
            oog('09%3A__Changes_in_Chromosome_Number_and_Structure', 'Chapter 9, Changes in chromosome number and structure', 'Inversion loops and translocation crosses with diagrams.'),
            griffiths('Chapter 17 (Chromosomal mutation 2: changes in chromosome structure) has the clearest diagrams of inversion loops and translocation segregation. NCBI blocks automated access, so open it in a browser.'),
          ],
          exercises: [
            {
              slug: 'deletion-mapping',
              title: 'Map genes with deletions',
              prompt: `Five recessive mutations (*a* to *e*) on one *Drosophila* chromosome arm are each crossed with flies heterozygous for one of four overlapping deletions. A "+" means the progeny with the deletion show the wild-type phenotype, "−" means they show the mutant phenotype. Deletion 1: a −, b −, c +, d +, e +. Deletion 2: a +, b −, c −, d +, e +. Deletion 3: a +, b +, c −, d −, e +. Deletion 4: a +, b +, c +, d −, e −. (a) Which genes does each deletion remove? (b) What is the gene order? (c) Explain why a "−" result is called pseudodominance.`,
              kind: 'problem',
              difficulty: 2,
              hint: 'Each deletion uncovers two adjacent genes: 1 = a, b; 2 = b, c; 3 = c, d; 4 = d, e. The order is a b c d e.',
            },
            {
              slug: 'inversion-loop',
              title: 'Crossing over in an inversion heterozygote',
              prompt: `A chromosome has the gene order A B C D E F with the centromere between A and B (·): A · B C D E F. An inversion heterozygote carries one normal homologue and one with C D E inverted (A · B E D C F). (a) Is this inversion paracentric or pericentric? (b) Draw the inversion loop. (c) Draw the four chromatids after a single crossover between D and E inside the loop and identify the dicentric and acentric products. (d) Which products reach viable gametes, and why are recombinant progeny missing? (e) What changes if the centromere lies between C and D instead?`,
              kind: 'problem',
              difficulty: 3,
            },
            {
              slug: 'robertsonian-risk',
              title: 'Familial Down syndrome',
              prompt: `A phenotypically normal woman has 45 chromosomes, including a Robertsonian 14;21 fusion and one free 14 and one free 21. (a) List the six gametes she can produce by the possible segregations of these three chromosomes. (b) For each, give the karyotype of a child conceived with a normal sperm and whether it is likely to survive. (c) Among viable children, what fraction would have Down syndrome if all segregations were equally likely? (d) Observed risks are lower (about 10-15 % for carrier mothers). Suggest why.`,
              kind: 'problem',
              difficulty: 3,
              hint: 'Viable outcomes are a normal child, a balanced carrier, and translocation Down syndrome; the monosomies and trisomy 14 are lost early. If equally likely, 1/3 of viable children would have Down syndrome.',
            },
          ],
          selfAssessment: [
            {
              question: 'What is pseudodominance and how is it used to map genes?',
              answerOutline: 'In a deletion heterozygote, a recessive allele on the intact homologue is expressed because there is no second copy. Testing which overlapping deletions uncover a mutation places it within their shared region.',
            },
            {
              question: 'Why do inversion heterozygotes produce few recombinant offspring for genes inside the inversion?',
              answerOutline: 'Crossovers inside the loop produce dicentric and acentric (paracentric) or duplication/deletion (pericentric) chromatids, which give inviable gametes or zygotes, so recombinants are not recovered.',
            },
            {
              question: 'Why is a reciprocal translocation carrier normal but semisterile?',
              answerOutline: 'No genetic material is lost, so the carrier\'s phenotype is normal. In meiosis, adjacent segregation gives gametes with a duplication and a deficiency, which are inviable; only alternate segregation gives balanced gametes.',
            },
          ],
          quiz: [
            {
              question: 'A fly heterozygous for a deletion is crossed with a fly homozygous for the recessive mutation *vg* (vestigial wings). Half the progeny have vestigial wings. What does this show?',
              options: [
                'The deletion removes the *vg* locus: progeny with the deletion express *vg* (pseudodominance)',
                '*vg* is dominant',
                'The deletion and *vg* are on different chromosomes',
                'The deletion carries a new *vg* mutation that is dominant',
              ],
              answer: 0,
              explanation:
                'Progeny inheriting the deletion have only the *vg* allele from the other parent, so the recessive phenotype appears. If the deletion did not cover the locus, all progeny would be *vg/+*, wild type.',
            },
            {
              question: 'A man carries a balanced reciprocal translocation between chromosomes 4 and 11 and is healthy. Why do he and his partner have repeated miscarriages?',
              options: [
                'Adjacent segregation gives sperm with duplications and deletions of the translocated segments',
                'His sperm lack chromosomes 4 and 11 entirely',
                'The translocation suppresses all recombination',
                'He has an inversion as well',
              ],
              answer: 0,
              explanation:
                'Alternate segregation gives balanced sperm, but adjacent segregation gives unbalanced ones, and the embryos they make are often lost. The carrier himself has every gene in two copies, so he is healthy.',
            },
            {
              question: 'Which rearrangement most strongly reduces the recovery of recombinant progeny for genes inside it when heterozygous?',
              options: ['A small deletion elsewhere on the chromosome', 'A tandem duplication', 'An inversion', 'A Robertsonian fusion'],
              answer: 2,
              explanation:
                'Crossovers in an inversion loop give unbalanced or dicentric products, so recombinants for genes inside the inversion are lost. This crossover suppression is why inversions are used in balancer chromosomes.',
            },
          ],
        },
      ],
    },
    {
      slug: 'mendelian-inheritance',
      title: 'Mendelian Inheritance',
      description:
        'Mendel\'s experiments and the laws they revealed, derived from gametes rather than memorised: segregation and the testcross, independent assortment and the probability rules that replace large Punnett squares, the chi-square test for judging a ratio, and pedigree analysis for human families.',
      lessons: [
        {
          slug: 'segregation',
          title: 'Mendel\'s experiments and the law of segregation',
          summary:
            'Why Mendel\'s design worked, the monohybrid cross from P to F₂ derived from gametes, the 3:1 phenotypic and 1:2:1 genotypic ratios, the testcross, and the F₃ test that showed two-thirds of dominant F₂ plants are heterozygous.',
          estimatedMinutes: 100,
          objectives: [
            'Explain the features of Mendel\'s experimental design that made his results interpretable',
            'Derive F₁ and F₂ genotypes and phenotypes of a monohybrid cross from the gametes',
            'Distinguish genotypic ratios from phenotypic ratios and compute both',
            'Use a testcross and progeny testing to determine an unknown genotype',
            'State the law of segregation and connect it to meiosis',
          ],
          concepts: [
            'True-breeding (pure) lines',
            'P, F₁ and F₂ generations; reciprocal crosses',
            'Dominant and recessive phenotypes',
            'Homozygous and heterozygous',
            'Gametes carry one allele each, with probability ½',
            '3:1 phenotypes, 1:2:1 genotypes',
            'Testcross to the homozygous recessive: 1:1',
            '2/3 of dominant F₂ are heterozygous',
          ],
          explanation: `Gregor Mendel's 1866 paper on peas succeeded where earlier breeders had failed because of its design. He started from **true-breeding** lines that had bred true for two years, chose seven traits with two clear-cut forms (round or wrinkled seeds, yellow or green cotyledons, tall or short stems...), made **reciprocal** crosses to check that it did not matter which parent was male, followed each trait separately, and counted large numbers of offspring through several generations.

**The monohybrid cross.** Crossing round × wrinkled gave an F₁ that was all round: round is **dominant**, wrinkled **recessive**. Selfing the F₁ gave 5474 round and 1850 wrinkled F₂ seeds, close to 3:1. Mendel's explanation, in modern words: each plant has two copies of a hereditary factor (two alleles, *R* and *r*); they separate (**segregate**) into gametes so that each gamete carries one, with probability ½ each; and gametes combine at random.

**Derive, do not memorise.** The F₁ is *Rr*. Its gametes are *R* (½) and *r* (½), eggs and pollen alike. Combining them:

$$P(RR) = \\tfrac12 \\cdot \\tfrac12 = \\tfrac14, \\quad P(Rr) = 2 \\cdot \\tfrac12 \\cdot \\tfrac12 = \\tfrac12, \\quad P(rr) = \\tfrac14.$$

So the **genotypic** ratio is 1 *RR* : 2 *Rr* : 1 *rr*, and because *RR* and *Rr* look the same, the **phenotypic** ratio is 3 round : 1 wrinkled. The factor 2 for *Rr* comes from the two ways to make it (*R* egg with *r* pollen, or *r* egg with *R* pollen). Mixing up these two ratios is the most common error in genetics problems.

\`\`\`interactive
gen-punnett
{"p1": "Rr", "p2": "Rr", "traits": {"R": ["round", "wrinkled"]}, "caption": "The F₁ self-cross Rr × Rr. Read the gametes and their probabilities first, then the square. Notice the genotype ratio 1:2:1 and the phenotype ratio 3:1. Change one parent to rr to make the testcross and see 1:1, then try RR × rr (the P cross)."}
\`\`\`

**Testing the model.** A theory should predict something new. Mendel's predicts that the round F₂ plants are of two kinds: one-third *RR*, which breed true, and two-thirds *Rr*, which segregate again. He grew 565 round F₂ plants: 193 gave only round seeds and 372 gave both kinds, a ratio of 1.97 : 1, close to the predicted 1 : 2. The **testcross**, crossing an individual with the dominant phenotype to a homozygous recessive, reveals its genotype directly: *Rr* × *rr* gives 1 round : 1 wrinkled, while *RR* × *rr* gives all round. Note the asymmetry: one wrinkled offspring proves the parent was *Rr*, but all-round progeny only make *RR* likely, more so the more offspring you score.

**The law of segregation**: the two alleles of a gene separate into different gametes in equal proportions. Physically, they lie on homologous chromosomes that separate at anaphase I (previous module). Read UIC 3.1.1 and 3.1.2 and OpenStax 12.1 to 12.3, then read the first part of Mendel's own paper (the MendelWeb English translation).`,
          resources: [
            uic(`${M3}/3.1.01%3A_Mendels_Experiments`, '3.1.1 Mendel\'s experiments', 'Mendel\'s design and the monohybrid cross.', true),
            uic(`${M3}/3.1.02%3A_Laws_of_Inheritance`, '3.1.2 Laws of inheritance', 'Segregation, the testcross and the Punnett square.'),
            ostx('12-1-mendels-experiments-and-the-laws-of-probability', '12.1 Mendel\'s experiments and the laws of probability', 'The same material with Mendel\'s seven traits tabulated.'),
            {
              title: 'Mendel (1866), Experiments in plant hybridization, annotated English translation',
              url: 'http://www.mendelweb.org/Mendel.html',
              type: 'article',
              cost: 'free',
              provider: 'MendelWeb',
              note: 'Read sections 1 to 7. Find his F₂ counts for all seven traits and the F₃ test of the dominant plants.',
            },
          ],
          exercises: [
            {
              slug: 'monohybrid-practice',
              title: 'Monohybrid crosses',
              prompt: `In peas, tall (*T*) is dominant to short (*t*). Give the expected genotypic and phenotypic ratios of the offspring of: (a) *TT* × *tt*; (b) *Tt* × *Tt*; (c) *Tt* × *tt*; (d) *TT* × *Tt*. (e) A tall plant of unknown genotype is crossed with a short plant and gives 8 tall and 0 short offspring. What is the probability of seeing no short offspring among 8 if the tall parent were *Tt*? How many all-tall offspring would you need before that probability fell below 0.001?`,
              kind: 'problem',
              difficulty: 1,
              hint: '(e) (½)⁸ = 1/256 ≈ 0.0039; you need n with (½)ⁿ < 0.001, so n = 10 (1/1024).',
            },
            {
              slug: 'mendel-f3-test',
              title: 'Mendel\'s F₃ test, recomputed',
              prompt: `Of 565 round F₂ plants, Mendel found 193 that bred true and 372 that segregated. (a) What numbers does the model predict? (b) Do the observed numbers look close (you will test this formally with chi-square in two lessons)? (c) For a heterozygous F₂ plant, Mendel grew 10 seeds from it to decide whether it segregated. What is the probability that all 10 seeds of a truly heterozygous plant are round, so that it is misclassified as true-breeding? (d) How would this misclassification bias the observed ratio, and in which direction? (This is one of the points in the debate over Fisher's 1936 claim that Mendel's data are "too good".)`,
              kind: 'problem',
              difficulty: 3,
              hint: '(a) 188.3 and 376.7. (c) (3/4)¹⁰ ≈ 0.056. (d) Misclassifying 5.6 % of heterozygotes would shift the expected ratio from 1:2 towards 1.11 : 1.89, about 209.5 : 355.5, yet Mendel\'s data match 1:2, which Fisher found suspicious.',
            },
            {
              slug: 'dominance-is-not-frequency',
              title: 'Dominant does not mean common',
              prompt: `Write a short paragraph explaining why a dominant allele need not be the most common allele in a population, using one real example (polydactyly and Huntington disease alleles are dominant but rare; the allele for type O blood is recessive but the commonest ABO allele in many populations). Then explain why "the dominant allele masks the recessive one" is true of the heterozygote's phenotype but says nothing about whether the recessive allele will disappear.`,
              kind: 'writing',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'Why is the F₂ genotypic ratio 1:2:1, and why does the phenotypic ratio differ?',
              answerOutline: 'Each F₁ parent makes R and r gametes ½ each; combining gives RR ¼, Rr ½ (two ways), rr ¼. RR and Rr share the dominant phenotype, so phenotypes are 3:1.',
            },
            {
              question: 'What is a testcross and why does it work?',
              answerOutline: 'A cross with a homozygous recessive. The recessive parent contributes only recessive alleles, so each offspring\'s phenotype reveals which allele the tested parent contributed.',
            },
            {
              question: 'Of the dominant-phenotype F₂ from a monohybrid cross, what fraction is heterozygous, and why?',
              answerOutline: 'Two-thirds: among RR (¼) and Rr (½), the conditional probability of Rr is (½)/(¾) = ⅔.',
            },
          ],
          quiz: [
            {
              question: 'In a monohybrid F₂, a plant with the dominant phenotype is chosen at random. What is the probability that it is heterozygous?',
              options: ['$\\tfrac{1}{2}$', '$\\tfrac{1}{3}$', '$\\tfrac{3}{4}$', '$\\tfrac{2}{3}$'],
              answer: 3,
              explanation:
                'Given the dominant phenotype, only *RR* ($\\tfrac14$) and *Rr* ($\\tfrac12$) are possible, so $P(Rr) = \\tfrac{1/2}{3/4} = \\tfrac23$. The tempting $\\tfrac12$ is the probability among all F₂ plants, forgetting the condition.',
            },
            {
              question: 'Purple-flowered plant X is crossed with a white-flowered plant (white is recessive). Of 40 offspring, 21 are purple and 19 white. What is X\'s genotype?',
              options: ['Homozygous, *PP*', 'Either *PP* or *Pp*: a testcross cannot tell them apart', 'Heterozygous, *Pp*', 'Cannot be determined without another generation'],
              answer: 2,
              explanation:
                'A testcross giving about 1:1 means X makes *P* and *p* gametes equally, so it is *Pp*. A *PP* parent would give all purple offspring; one white offspring is already enough to rule it out.',
            },
            {
              question: 'An F₁ *Aa* × *Aa* cross gives 400 offspring. How many are expected to be homozygous?',
              options: ['100', '0', '300', '200'],
              answer: 3,
              explanation:
                'Homozygotes are *AA* ($\\tfrac14$) and *aa* ($\\tfrac14$): 200 in all. 100 counts only *aa*, and 300 counts the dominant phenotype, confusing a genotype question with a phenotype one.',
            },
            {
              question: 'Which feature of Mendel\'s design was essential for him to see the 3:1 ratio?',
              options: [
                'Using traits that blend smoothly from one form to another',
                'Studying all seven traits at once in every plant',
                'Starting from true-breeding lines and counting large numbers of offspring of each class',
                'Using only one plant per cross',
              ],
              answer: 2,
              explanation:
                'Known genotypes (true-breeding parents) and large counts let a ratio emerge from random variation. Blending traits hide the discrete factors, and following all traits at once would have made the bookkeeping impossible to interpret.',
            },
          ],
        },
        {
          slug: 'independent-assortment-and-probability',
          title: 'Independent assortment and the rules of probability',
          summary:
            'The dihybrid cross and 9:3:3:1 derived as a product of two 3:1 ratios, the product and sum rules, forked-line diagrams for many genes, and the binomial distribution for families.',
          estimatedMinutes: 100,
          objectives: [
            'Derive the 9:3:3:1 ratio from gametes and from the product of two monohybrid ratios',
            'Apply the product and sum rules to crosses of several genes without drawing large Punnett squares',
            'Count gamete types, genotype classes and phenotype classes for multi-gene crosses',
            'Use the binomial distribution to compute the probability of a given mix of offspring',
            'State the law of independent assortment and when it fails',
          ],
          concepts: [
            'Dihybrid cross: 9:3:3:1',
            'Product rule for independent events',
            'Sum rule for mutually exclusive outcomes',
            'Forked-line (branch) diagram',
            'Gamete types from n heterozygous genes: $2^n$',
            'Binomial probability for families',
            'Independent assortment and its physical basis',
          ],
          explanation: `Mendel next followed two traits at once. Crossing true-breeding round yellow (*RRYY*) with wrinkled green (*rryy*) gave round yellow F₁ (*RrYy*). The F₂ contained 315 round yellow, 108 round green, 101 wrinkled yellow and 32 wrinkled green, close to **9:3:3:1**. The four classes include two new combinations (round green, wrinkled yellow), so the genes had not stayed in their parental combinations.

**Independent assortment.** If the two genes segregate independently, the F₁ makes four kinds of gametes, *RY*, *Ry*, *rY*, *ry*, each with probability ¼, and a 4 × 4 Punnett square gives 9:3:3:1. Faster: shape alone is 3 round : 1 wrinkled, colour alone 3 yellow : 1 green, and for independent events probabilities multiply:

$$P(\\text{round, yellow}) = \\tfrac34 \\cdot \\tfrac34 = \\tfrac{9}{16}, \\quad P(\\text{round, green}) = \\tfrac34 \\cdot \\tfrac14 = \\tfrac{3}{16}, \\quad P(\\text{wrinkled, green}) = \\tfrac{1}{16}.$$

That is the **product rule**. The **sum rule** adds probabilities of mutually exclusive outcomes: the probability of a round seed of either colour is $\\tfrac{9}{16} + \\tfrac{3}{16} = \\tfrac34$.

\`\`\`interactive
gen-punnett
{"p1": "RrYy", "p2": "RrYy", "traits": {"R": ["round", "wrinkled"], "Y": ["yellow", "green"]}, "caption": "The dihybrid F₂. Check that each gamete has probability 1/4, then click a phenotype class to see which of the 16 squares belong to it. Make one parent rryy to see the dihybrid testcross, 1:1:1:1. Add a third gene (CcRrYy works too) to see why a forked-line table replaces the 64-square grid."}
\`\`\`

**Many genes.** For *AaBbCcDd* × *AaBbCcDd*, a Punnett square would have 256 cells. Instead treat each gene separately and multiply. The probability of an *aabbccdd* offspring is $(\\tfrac14)^4 = \\tfrac{1}{256}$; of a fully dominant phenotype, $(\\tfrac34)^4 = \\tfrac{81}{256}$; of the genotype *AaBbCcDd*, $(\\tfrac12)^4 = \\tfrac{1}{16}$. A parent heterozygous at *n* genes makes $2^n$ gamete types. For crosses where parents differ gene by gene, such as *AaBbCc* × *AaBbcc*, each gene gets its own fraction: $P(aabbcc) = \\tfrac14 \\cdot \\tfrac14 \\cdot \\tfrac12 = \\tfrac{1}{32}$.

**Families: the binomial.** When you ask about a mix of children, order matters for counting. Two carriers of a recessive condition have four children; the chance that exactly one is affected is

$$\\binom{4}{1} \\left(\\tfrac14\\right)^1 \\left(\\tfrac34\\right)^3 = 4 \\cdot \\tfrac{27}{256} = \\tfrac{27}{64} \\approx 0.42.$$

The factor $\\binom{4}{1} = 4$ counts which child is the affected one. Forgetting it (giving $\\tfrac{27}{256}$) answers "the first child affected and the next three not", a different question. The probability-statistics course covers the binomial distribution in depth.

**When independent assortment fails.** It holds for genes on different chromosomes, because bivalents orient independently, and for genes far apart on one chromosome. Genes close together are **linked**: they show an excess of parental combinations, the subject of the linkage module. Mendel was lucky, or careful: his seven traits behave independently in his crosses. Read UIC 3.1.2 and OpenStax 12.3.`,
          resources: [
            uic(`${M3}/3.1.02%3A_Laws_of_Inheritance`, '3.1.2 Laws of inheritance', 'The dihybrid cross and independent assortment.', true),
            ostx('12-3-laws-of-inheritance', '12.3 Laws of inheritance', 'Forked-line method and the probability rules.'),
            oog('06%3A_Genetic_Analysis_of_Multiple_Genes', 'Chapter 6, Genetic analysis of multiple genes', 'Dihybrid crosses and probability with practice problems.'),
          ],
          relatedLessons: [
            'probability-statistics/random-variables-and-distributions/discrete-distributions',
            'probability-statistics/probability-foundations/conditional-probability-and-independence',
            'discrete-mathematics/counting-combinatorics/permutations-combinations-and-binomial-coefficients',
          ],
          exercises: [
            {
              slug: 'multigene-probabilities',
              title: 'Multi-gene probabilities',
              prompt: `For the cross *AaBbCcDdEe* × *aaBbCcDdee* (all genes independent, complete dominance), give: (a) the number of gamete types each parent makes; (b) the probability of an offspring with genotype *aabbccddee*; (c) the probability of an offspring showing the dominant phenotype for all five traits; (d) the probability of an offspring whose genotype is identical to the first parent; (e) the probability of an offspring dominant for exactly four of the five traits (hint: the genes have different probabilities, so add the five cases).`,
              kind: 'problem',
              difficulty: 2,
              hint: 'Per gene, P(dominant phenotype): A 1/2, B 3/4, C 3/4, D 3/4, E 1/2. (a) 32 and 8. (b) 1/2 × 1/4 × 1/4 × 1/4 × 1/2 = 1/256. (c) 27/256. (d) 1/2 × 1/2 × 1/2 × 1/2 × 1/2 = 1/32.',
            },
            {
              slug: 'family-binomial',
              title: 'Families and the binomial',
              prompt: `Two parents are both heterozygous for an autosomal recessive condition. For a family of five children, compute: (a) the probability that none is affected; (b) exactly two are affected; (c) at least one is affected; (d) the first two are affected and the other three are not. (e) Explain in one sentence why (b) and (d) differ. (f) If the couple already has two unaffected children, what is the probability that their next child is affected?`,
              kind: 'problem',
              difficulty: 2,
              hint: '(a) (3/4)⁵ = 243/1024 ≈ 0.237. (b) 10 × (1/4)² × (3/4)³ = 270/1024 ≈ 0.264. (c) 1 − 0.237 = 0.763. (d) (1/4)²(3/4)³ = 27/1024. (f) 1/4: children are independent.',
            },
            {
              slug: 'mendel-dihybrid-check',
              title: 'Check Mendel\'s dihybrid data',
              prompt: `Using Mendel's F₂ counts (315 round yellow, 108 round green, 101 wrinkled yellow, 32 wrinkled green): (a) compute the expected numbers under 9:3:3:1; (b) compute the ratio of round to wrinkled and of yellow to green separately, ignoring the other trait, and compare each with 3:1; (c) for the round seeds only, what fraction is yellow, and for the wrinkled seeds only? Explain what equal fractions tell you about independence. Keep your numbers: you will run the chi-square test in the next lesson.`,
              kind: 'data-analysis',
              difficulty: 1,
              hint: 'Total 556: expected 312.75, 104.25, 104.25, 34.75. Round 423 : wrinkled 133 = 3.18 : 1; yellow 416 : green 140 = 2.97 : 1. Yellow among round 315/423 = 0.745, among wrinkled 101/133 = 0.759.',
            },
          ],
          selfAssessment: [
            {
              question: 'Why does 9:3:3:1 equal (3:1) × (3:1)?',
              answerOutline: 'If the genes assort independently, the phenotype for each gene is an independent event; multiplying the two 3/4 : 1/4 distributions gives 9/16, 3/16, 3/16, 1/16.',
            },
            {
              question: 'When do you add probabilities and when do you multiply them?',
              answerOutline: 'Multiply for independent events that must all happen (this AND that); add for mutually exclusive ways of getting an outcome (this OR that).',
            },
            {
              question: 'What does the binomial coefficient count in a family problem?',
              answerOutline: 'The number of different birth orders that give the specified numbers of each kind of child, e.g. 4 ways for one affected child out of four.',
            },
          ],
          quiz: [
            {
              question: 'In the cross *AaBbCc* × *AaBbcc* (independent genes, complete dominance), what is the probability of an offspring with genotype *aabbcc*?',
              options: ['$\\tfrac{1}{64}$', '$\\tfrac{1}{32}$', '$\\tfrac{1}{16}$', '$\\tfrac{9}{32}$'],
              answer: 1,
              explanation:
                'Per gene: $P(aa) = \\tfrac14$, $P(bb) = \\tfrac14$, $P(cc) = \\tfrac12$ (since *Cc* × *cc*). The product is $\\tfrac{1}{32}$. $\\tfrac{1}{64}$ assumes both parents are *Cc*; $\\tfrac{9}{32}$ is the probability of the all-dominant phenotype.',
            },
            {
              question: 'Two heterozygous parents (*Aa* × *Aa*) have five children. What is the probability that exactly two show the recessive phenotype?',
              options: ['$0.016$', '$0.026$', '$0.264$', '$0.40$'],
              answer: 2,
              explanation:
                '$\\binom{5}{2}(\\tfrac14)^2(\\tfrac34)^3 = 10 \\times \\tfrac{1}{16} \\times \\tfrac{27}{64} = \\tfrac{270}{1024} \\approx 0.264$. Leaving out the coefficient 10 gives $0.026$, the probability of one particular birth order.',
            },
            {
              question: 'How many different kinds of gametes can an individual of genotype *AaBBCcDdee* produce, with all genes unlinked?',
              options: ['5', '8', '16', '32'],
              answer: 1,
              explanation:
                'Only heterozygous genes add choices: *Aa*, *Cc* and *Dd* give $2^3 = 8$. Homozygous *BB* and *ee* contribute one allele each. 32 counts all five genes as heterozygous.',
            },
          ],
        },
        {
          slug: 'chi-square-test',
          title: 'Testing a genetic hypothesis: the chi-square test',
          summary:
            'Observed ratios never match expected ratios exactly. The chi-square goodness-of-fit test asks whether the deviation is small enough to be chance: expected counts, the statistic, degrees of freedom, critical values and p-values, and what "do not reject" means.',
          estimatedMinutes: 100,
          objectives: [
            'State a genetic null hypothesis and compute expected counts from it',
            'Compute the chi-square statistic with the correct degrees of freedom',
            'Compare it with a critical value or compute a p-value, and state a correct conclusion',
            'Avoid the common errors: using percentages, small expected counts, and treating "do not reject" as proof',
            'Choose between competing ratios (for example 9:3:3:1, 9:7, 1:1:1:1) using data',
          ],
          concepts: [
            'Null hypothesis: the ratio predicted by a model',
            'Expected count E = total × predicted proportion',
            '$\\chi^2 = \\sum (O-E)^2/E$',
            'Degrees of freedom: classes − 1 (− estimated parameters)',
            'Critical value at α = 0.05: 3.841 (df 1), 5.991 (df 2), 7.815 (df 3)',
            'p-value: probability of a deviation at least this large if the hypothesis is true',
            'Counts, not percentages; expected counts of at least 5',
            '"Fail to reject" is not "prove"',
          ],
          explanation: `Mendel's 5474 round and 1850 wrinkled seeds are not exactly 3:1 (that would be 5493 : 1831). Every real cross deviates from its expected ratio, because gametes combine at random. The question is whether the deviation is about what chance produces, or so large that the hypothesis is probably wrong. The **chi-square goodness-of-fit test** answers it.

**Steps.**
1. State the **null hypothesis**, a genetic model that predicts proportions: "the F₂ segregates 3:1".
2. Compute **expected counts**: $E = $ total × proportion. With 7324 seeds, $E = 5493$ round and $1831$ wrinkled.
3. Compute $\\chi^2 = \\sum (O - E)^2 / E$ over all classes: $(5474-5493)^2/5493 + (1850-1831)^2/1831 = 0.066 + 0.197 = 0.263$.
4. **Degrees of freedom**: the number of classes minus 1, because once all but one count is known the last is fixed by the total. Here df = 1. Subtract one more for each parameter you estimated from the same data (as in Hardy-Weinberg tests later).
5. Compare with the **critical value** at significance level α = 0.05: 3.841 for df = 1, 5.991 for df = 2, 7.815 for df = 3. Equivalently, find the **p-value**, the probability of a χ² at least this large if the null hypothesis is true. Here p ≈ 0.61.
6. Conclude: χ² = 0.263 < 3.841, so we **do not reject** the 3:1 hypothesis. The data are consistent with it.

\`\`\`interactive
gen-chi-square
{"caption": "Mendel's seed-shape F₂ against 3:1. Check the expected counts and each (O − E)²/E term against the steps above. Now change the ratio to 1:1 and watch χ² explode; then enter Mendel's dihybrid counts 315, 108, 101, 32 with the ratio 9:3:3:1 (add classes) and read off df and p."}
\`\`\`

**What the test does and does not say.** A small χ² means the data are compatible with the hypothesis, not that the hypothesis is true: other ratios may fit too, and a small sample can fit almost anything. A large χ² (p < 0.05) means a deviation this big would happen less than 5 % of the time by chance if the model were right, so we reject it, knowing that 1 time in 20 we will reject a true hypothesis. Always state the hypothesis, χ², df and p (or the critical value).

**Common errors.**
- Using percentages or ratios instead of counts. χ² depends on sample size: 75 % : 25 % from 40 offspring and from 4000 are very different evidence.
- Using df = number of classes.
- Applying the test when expected counts are below about 5 (combine classes or use an exact test).
- Testing a ratio you chose after looking at the data, which makes every fit look good.

**Fisher's question.** In 1936 R. A. Fisher added up the χ² values of Mendel's experiments and found them collectively too small: the data agree with expectation better than chance usually allows. Explanations range from unconscious bias in classifying borderline seeds to the way experiments were selected for publication; nobody now thinks the conclusions are wrong. The probability-statistics course treats the test in full. Read OpenStax 12.1 on probability and the chi-square section of Online Open Genetics chapter 3.`,
          resources: [
            oog('03%3A_Genetic_Analysis_of_Single_Genes', 'Chapter 3, Genetic analysis of single genes', 'Includes the chi-square test applied to monohybrid and dihybrid data.', ),
            ostx('12-1-mendels-experiments-and-the-laws-of-probability', '12.1 Mendel\'s experiments and the laws of probability', 'The probability basis of the expected ratios.'),
            {
              title: 'Mendel (1866), Experiments in plant hybridization, annotated English translation',
              url: 'http://www.mendelweb.org/Mendel.html',
              type: 'dataset',
              cost: 'free',
              provider: 'MendelWeb',
              note: 'The source of every count used in this lesson\'s exercises: the seven F₂ experiments and the dihybrid and trihybrid crosses.',
            },
          ],
          relatedLessons: [
            'probability-statistics/hypothesis-testing-and-regression/chi-square-and-goodness-of-fit',
            'probability-statistics/hypothesis-testing-and-regression/hypothesis-testing-and-p-values',
          ],
          exercises: [
            {
              slug: 'mendel-seven-traits',
              title: 'Test all seven of Mendel\'s traits',
              prompt: `Mendel's F₂ counts were: seed shape 5474 round / 1850 wrinkled; cotyledon colour 6022 yellow / 2001 green; seed coat 705 grey-brown / 224 white; pod shape 882 inflated / 299 constricted; pod colour 428 green / 152 yellow; flower position 651 axial / 207 terminal; stem length 787 long / 277 short. (a) Test each against 3:1 (χ², df, conclusion). (b) Add the seven χ² values; the sum has df = 7, with critical value 14.07 at α = 0.05. Compute or look up the probability of a sum this small or smaller (the lower tail) and explain Fisher's suspicion. Use the interactive to check each test.`,
              kind: 'data-analysis',
              difficulty: 2,
              hint: 'Seed shape χ² = 0.263; cotyledon colour 0.015; seed coat 0.391; pod shape 0.064; pod colour 0.451; flower position 0.350; stem length 0.607. The sum is about 2.14, which a χ² with 7 df falls below only about 5 % of the time.',
            },
            {
              slug: 'choose-a-ratio',
              title: 'Which ratio fits?',
              prompt: `A cross of two white-flowered sweet pea lines gives a purple F₁, and the F₂ contains 382 purple and 278 white plants. (a) Test the data against 3:1, 9:7 and 1:1. (b) Which hypotheses are rejected at α = 0.05? (c) If more than one survives, how could you design a further cross to choose between them? (d) Why is it not legitimate to test a dozen ratios and report the best-fitting one as confirmed?`,
              kind: 'data-analysis',
              difficulty: 2,
              hint: 'Total 660. 3:1 expects 495:165, χ² ≈ 103. 9:7 expects 371.25:288.75, χ² ≈ 0.71. 1:1 expects 330:330, χ² ≈ 16.4. Only 9:7 survives.',
            },
            {
              slug: 'sample-size-and-power',
              title: 'Sample size matters',
              prompt: `The observed proportions 70 % : 30 % are tested against 3:1 at α = 0.05 for (a) 40 offspring (28 : 12), (b) 400 offspring (280 : 120) and (c) 4000 offspring (2800 : 1200). Compute χ² and the conclusion each time. Explain why the same percentages lead to different conclusions, and what this means for small human families.`,
              kind: 'problem',
              difficulty: 1,
              hint: 'χ² = 0.533, 5.33 and 53.3: only the first is not rejected. χ² scales with the sample size when proportions are fixed.',
            },
          ],
          selfAssessment: [
            {
              question: 'Why are the degrees of freedom one less than the number of classes?',
              answerOutline: 'The expected counts are constrained to sum to the observed total, so once all but one class is fixed the last is determined; only n − 1 counts are free to vary.',
            },
            {
              question: 'What does p = 0.30 mean in a test of a 9:3:3:1 hypothesis?',
              answerOutline: 'If the 9:3:3:1 model were true, deviations at least as large as those observed would occur about 30 % of the time by chance. The data are consistent with the model; it is not proven.',
            },
            {
              question: 'Why must the test use counts, not percentages?',
              answerOutline: 'The statistic depends on sample size: the same percentage deviation is much stronger evidence in a large sample. Percentages throw away the sample size.',
            },
          ],
          quiz: [
            {
              question: 'A monohybrid F₂ has 290 purple and 110 white flowers. What is χ² for the hypothesis 3:1?',
              options: ['$0.33$', '$1.33$', '$4.00$', '$0.44$'],
              answer: 1,
              explanation:
                'Expected 300 and 100. $\\chi^2 = 10^2/300 + 10^2/100 = 0.333 + 1.000 = 1.33$, below 3.841, so 3:1 is not rejected. $0.33$ includes only the purple term.',
            },
            {
              question: 'You test F₂ data from a dihybrid cross against 9:3:3:1. How many degrees of freedom does the test have?',
              options: ['1', '2', '3', '4'],
              answer: 2,
              explanation:
                'Four phenotypic classes give $4 - 1 = 3$ df, so the critical value at 0.05 is 7.815. Using 4 (the number of classes) is a frequent error that makes the test too lenient.',
            },
            {
              question: 'A test of the hypothesis 1:1 gives χ² = 2.1 with 1 df (p ≈ 0.15). Which conclusion is correct?',
              options: [
                'The 1:1 hypothesis is proven true',
                'The data are consistent with 1:1; the deviation could easily be chance',
                'The hypothesis is rejected because p is not above 0.5',
                'There is a 15 % chance that the hypothesis is true',
              ],
              answer: 1,
              explanation:
                'p is the probability of a deviation this large if 1:1 holds; at 0.15 it is not unusual, so we do not reject. Not rejecting is not proof, and p is not the probability that the hypothesis is true.',
            },
            {
              question: 'Which practice makes a chi-square test invalid?',
              options: [
                'Using observed counts of 50 and 52',
                'Using a ratio predicted before the cross was done',
                'Entering the percentages 70 and 30 instead of the counts',
                'Using α = 0.01 instead of 0.05',
              ],
              answer: 2,
              explanation:
                'The statistic must be computed from counts; percentages hide the sample size. A pre-registered hypothesis and a stricter α are good practice, not errors.',
            },
          ],
        },
        {
          slug: 'pedigree-analysis',
          title: 'Pedigree analysis and genetic risk',
          summary:
            'Reading human pedigrees: the symbols, the signatures of autosomal dominant, autosomal recessive, X-linked, Y-linked and mitochondrial inheritance, how to exclude modes, and how to compute carrier and recurrence risks, including conditional and Bayesian risks.',
          estimatedMinutes: 110,
          objectives: [
            'Read and draw pedigrees with standard symbols and generation numbering',
            'Identify the features that support or exclude each mode of inheritance',
            'Compute the probability that an unaffected relative is a carrier, including the 2/3 rule',
            'Compute the risk that a couple\'s child is affected, combining several independent steps',
            'Update a carrier probability with Bayes\' theorem using unaffected children',
          ],
          concepts: [
            'Pedigree symbols, proband, consanguinity',
            'Autosomal dominant: vertical, affected parent, about ½ of children',
            'Autosomal recessive: skips generations, unaffected carrier parents',
            'X-linked recessive: mostly males, no male-to-male transmission',
            'X-linked dominant: affected father → all daughters',
            'Y-linked and mitochondrial patterns',
            'Unaffected sibling of an affected person: ⅔ carrier',
            'Bayesian risk with conditional information',
          ],
          explanation: `Humans cannot be crossed at will, so geneticists read **pedigrees**: squares for males, circles for females, filled symbols for affected individuals, a horizontal line joining parents (a double line if they are related), and children hanging from it in birth order. Generations are numbered I, II, III and individuals 1, 2, 3 from left to right, so II-3 is the third person in generation II. The **proband** is the person through whom the family came to attention.

**Signatures of each mode** (assuming complete penetrance and a rare trait):
- **Autosomal dominant (AD)**: every affected child has an affected parent; the trait appears in every generation; males and females equally; an affected heterozygote passes it to about half the children, including father to son. Two unaffected parents never have an affected child.
- **Autosomal recessive (AR)**: affected children usually have **unaffected parents** (both carriers); the trait skips generations; often associated with **consanguinity**. Two affected parents have only affected children.
- **X-linked recessive (XR)**: mostly males, inherited through carrier mothers; **no father-to-son transmission**; an affected woman's sons are all affected and her father must be affected.
- **X-linked dominant (XD)**: an affected father passes it to **all daughters and no sons**; affected mothers pass it to half of each sex.
- **Y-linked**: only males, from father to every son.
- **Mitochondrial**: passed by affected **mothers** to all their children; never by fathers.

**Exclusion is the reliable logic.** One family that contradicts a mode rules it out: an affected child of two unaffected parents excludes AD; an affected son of an affected father excludes X-linked inheritance (sons get their X from their mother); an affected daughter of an unaffected father excludes XR. Several modes can remain consistent, and then you weigh likelihood: a recessive explanation that needs many unrelated people marrying in as carriers is implausible for a rare trait. Toggle individuals in the interactive and watch modes become excluded, with the reason given.

\`\`\`interactive
gen-pedigree
{"choose": true, "preset": "ar", "caption": "Six example families. For each, decide which modes are possible before you read the checker, then click individuals to change who is affected and see which family breaks which mode. Labels such as II-3 are assigned left to right in the drawing."}
\`\`\`

**Risk calculations.** In AR families, an unaffected child of two carriers is *AA* or *Aa*, and given that it is not *aa*, $P(Aa) = \\tfrac{1/2}{3/4} = \\tfrac23$. Suppose a woman whose brother has cystic fibrosis (parents unaffected) has a child with an unrelated man from a population where 1 in 25 people is a carrier. The risk is a product of independent steps:

$$P = \\underbrace{\\tfrac23}_{\\text{she is a carrier}} \\times \\underbrace{\\tfrac{1}{25}}_{\\text{he is}} \\times \\underbrace{\\tfrac14}_{\\text{child is } aa} = \\tfrac{1}{150}.$$

**Bayesian updating.** Information about existing children changes the prior. A woman whose mother is a carrier of haemophilia A (XR) has prior carrier probability ½. She has three unaffected sons. If she is a carrier, that happens with probability $(\\tfrac12)^3 = \\tfrac18$; if not, with probability 1. So

$$P(\\text{carrier} \\mid \\text{3 unaffected sons}) = \\frac{\\tfrac12 \\cdot \\tfrac18}{\\tfrac12 \\cdot \\tfrac18 + \\tfrac12 \\cdot 1} = \\tfrac19.$$

The common mistake is to ignore the unaffected sons and quote ½. Read OpenStax 12.2 and Online Open Genetics chapter 5.`,
          resources: [
            oog('05%3A_Pedigrees_and_Populations', 'Chapter 5, Pedigrees and populations', 'Pedigree symbols, modes of inheritance and practice pedigrees.'),
            ostx('12-2-characteristics-and-traits', '12.2 Characteristics and traits', 'Includes human pedigree analysis and the main modes of inheritance.', true),
            uic(`${M3}/3.1.09%3A_Hemophilia_-_a_sex-linked_disorder`, '3.1.9 Hemophilia, a sex-linked disorder', 'A worked X-linked pedigree from the UIC course text.'),
          ],
          relatedLessons: [
            'probability-statistics/probability-foundations/conditional-probability-and-independence',
            'probability-statistics/probability-foundations/bayes-theorem',
          ],
          exercises: [
            {
              slug: 'mode-from-pedigree',
              title: 'Name the mode, with reasons',
              prompt: `Describe a three-generation pedigree in words or sketch it, then analyse it: I-1 (affected male) × I-2 (unaffected female) have children II-1 (unaffected male), II-2 (affected female), II-3 (affected female) and II-4 (unaffected male). II-2 marries an unaffected man and has III-1 (affected male), III-2 (unaffected female), III-3 (affected female). II-4 marries an unaffected woman and has III-4 and III-5 (both unaffected females) and III-6 (unaffected male). (a) For each mode (AD, AR, XD, XR, Y, mitochondrial), say whether it is consistent and give the specific individuals that exclude it if not. (b) Which mode is most likely and why? Enter the pedigree in the interactive (as a people list) to check.`,
              kind: 'problem',
              difficulty: 2,
              hint: 'Y is excluded (affected females) and mitochondrial by I-1 passing the trait on. XR is excluded by III-3, an affected daughter of an unaffected father. AR survives only if two unrelated spouses (I-2 and the husband of II-2) are carriers. AD and XD both fit; XD is favoured because an affected father had two affected daughters and two unaffected sons, which XD predicts with certainty and AD with probability (1/2)⁴ = 1/16.',
            },
            {
              slug: 'carrier-risks',
              title: 'Carrier and recurrence risks',
              prompt: `For an autosomal recessive condition with a carrier frequency of 1/30 in the population: (a) a couple have an affected child; what is the risk for their next child? (b) The affected child's unaffected sister marries an unrelated man from the population. What is the probability that their first child is affected? (c) If the sister's partner tests negative on a carrier test that detects 90 % of carrier alleles, what is his residual carrier probability (use Bayes) and the new risk for their child? (d) What if instead the sister marries her first cousin (whose parent is a sibling of the sister's parents, neither from the affected side)? Explain why consanguinity matters.`,
              kind: 'problem',
              difficulty: 3,
              hint: '(a) 1/4. (b) 2/3 × 1/30 × 1/4 = 1/180. (c) P(carrier | negative) = (1/30 × 0.1)/(1/30 × 0.1 + 29/30) ≈ 1/291, risk ≈ 2/3 × 1/291 × 1/4 ≈ 1/1746.',
            },
            {
              slug: 'bayes-haemophilia',
              title: 'A Bayesian risk',
              prompt: `A woman's brother and maternal uncle have haemophilia A (X-linked recessive); her parents are unaffected. (a) What is her mother's carrier probability, and hers before any further information? (b) She has two unaffected sons. Compute her posterior carrier probability. (c) She is pregnant with a boy. What is the probability that he is affected, before and after accounting for her two unaffected sons? (d) Explain why unaffected daughters would not change the calculation.`,
              kind: 'problem',
              difficulty: 3,
              hint: '(a) Her mother is an obligate carrier (affected son and affected brother), so the woman\'s prior is 1/2. (b) (1/2 × 1/4)/(1/2 × 1/4 + 1/2) = 1/5. (c) 1/4 before, 1/10 after.',
            },
          ],
          selfAssessment: [
            {
              question: 'Name one pedigree observation that excludes each of AD, AR, XR and XD (complete penetrance).',
              answerOutline: 'AD: affected child of two unaffected parents. AR: unaffected child of two affected parents. XR: affected daughter of an unaffected father, or unaffected son of an affected mother. XD: unaffected daughter of an affected father, or affected son of an affected father with an unaffected mother.',
            },
            {
              question: 'Why is the unaffected sibling of a person with an AR condition a carrier with probability 2/3, not 1/2?',
              answerOutline: 'Of the children of two carriers, 1/4 AA, 1/2 Aa, 1/4 aa. Knowing the sibling is unaffected removes aa, so P(Aa) = (1/2)/(3/4) = 2/3.',
            },
            {
              question: 'How does Bayes\' theorem use the number of unaffected sons in an X-linked risk?',
              answerOutline: 'It multiplies the prior for each hypothesis (carrier or not) by the likelihood of the observed sons under it ((1/2)ⁿ if carrier, 1 if not) and renormalises, lowering the carrier probability.',
            },
          ],
          quiz: [
            {
              question: 'A woman\'s brother has an autosomal recessive condition; her parents are unaffected. She has a child with an unrelated man whose carrier probability is 1/30. What is the probability that the child is affected?',
              options: ['$\\tfrac{1}{180}$', '$\\tfrac{1}{120}$', '$\\tfrac{1}{240}$', '$\\tfrac{1}{360}$'],
              answer: 0,
              explanation:
                '$\\tfrac23 \\times \\tfrac{1}{30} \\times \\tfrac14 = \\tfrac{1}{180}$. Using ½ for her carrier probability gives $\\tfrac{1}{240}$; she is unaffected, so the $\\tfrac23$ conditional probability applies.',
            },
            {
              question: 'In a pedigree, every daughter of an affected man is affected and none of his sons is, while affected women pass the trait to about half of their sons and daughters. Which mode fits best?',
              options: ['Autosomal dominant', 'X-linked recessive', 'X-linked dominant', 'Mitochondrial'],
              answer: 2,
              explanation:
                'A father gives his X to every daughter and to no son, so an X-linked dominant trait goes from an affected father to all daughters. Under AD his sons would be affected half the time; mitochondrial traits are never passed on by fathers.',
            },
            {
              question: 'Which observation alone rules out X-linked inheritance (dominant or recessive) for a trait?',
              options: [
                'An affected father has an affected son by an unaffected, non-carrier mother',
                'An affected woman has an affected son',
                'More males than females are affected',
                'The trait skips a generation',
              ],
              answer: 0,
              explanation:
                'A son receives his X from his mother, so an affected father cannot pass an X-linked allele to his son. The other observations are compatible with X-linkage.',
            },
            {
              question: 'A woman\'s prior probability of carrying an X-linked recessive allele is ½. She has three unaffected sons. What is her posterior carrier probability?',
              options: ['$\\tfrac{1}{2}$', '$\\tfrac{1}{8}$', '$\\tfrac{1}{16}$', '$\\tfrac{1}{9}$'],
              answer: 3,
              explanation:
                'Bayes: $\\dfrac{\\tfrac12 \\cdot \\tfrac18}{\\tfrac12 \\cdot \\tfrac18 + \\tfrac12 \\cdot 1} = \\tfrac19$. $\\tfrac18$ is only the likelihood of three unaffected sons if she is a carrier; $\\tfrac{1}{16}$ multiplies prior and likelihood but forgets to renormalise.',
            },
          ],
        },
      ],
      project: {
        slug: 'mendels-own-numbers',
        title: 'Mendel\'s own numbers',
        description: `Work through Mendel's 1866 paper (the annotated English translation on MendelWeb) as a data set. Tabulate every count he reports: the seven monohybrid F₂ experiments, the F₃ progeny tests of dominant plants, the dihybrid and trihybrid crosses, and the backcrosses. For each, state the hypothesis his model predicts, compute expected counts, χ², df and p (use the chi-square interactive or a spreadsheet), and say whether the hypothesis is rejected. Then reproduce Fisher's 1936 argument: sum the χ² values and degrees of freedom across experiments and compute the probability of so good an overall fit. Finally, read at least one modern discussion of the controversy (Franklin et al., *Ending the Mendel-Fisher Controversy*, 2008, summarises it) and write a balanced two-page assessment: what Fisher found, the proposed explanations (including the F₃ misclassification issue from the segregation lesson), and why Mendel's conclusions stand.`,
        deliverables: [
          'A spreadsheet of every count with expected values, χ², df and p',
          'A table summarising which hypotheses are rejected and which are not',
          'The pooled χ² analysis with the lower-tail probability',
          'A two-page assessment of the Mendel-Fisher controversy with sources',
        ],
        estimatedHours: 3,
        stretchGoals: ['Simulate 1000 replicate "Mendel experiments" in a spreadsheet with random numbers and see how often the pooled χ² is as small as Mendel\'s'],
      },
    },
    {
      slug: 'extensions-of-mendel',
      title: 'Extensions of Mendelian Inheritance',
      description:
        'What happens when the simple rules bend: incomplete dominance and codominance, multiple alleles and lethal alleles, genes that interact to give modified dihybrid ratios, sex-linked genes, penetrance and expressivity, and inheritance through mitochondria, chloroplasts and the maternal cytoplasm.',
      lessons: [
        {
          slug: 'dominance-multiple-alleles-and-lethals',
          title: 'Dominance relations, multiple alleles and lethal alleles',
          summary:
            'Complete, incomplete and codominance as properties of a phenotype at a given level, ABO and other allelic series, and recessive lethal alleles that turn 3:1 into 2:1.',
          estimatedMinutes: 100,
          objectives: [
            'Distinguish complete dominance, incomplete dominance and codominance and predict ratios for each',
            'Explain dominance at the molecular level and why it depends on the level of phenotype examined',
            'Work crosses with multiple alleles, including ABO blood groups and allelic series',
            'Recognise a 2:1 ratio as the signature of a recessive lethal allele with a dominant visible effect',
            'Count the genotypes possible with n alleles',
          ],
          concepts: [
            'Complete dominance (3:1)',
            'Incomplete dominance (1:2:1 phenotypes)',
            'Codominance (MN, ABO)',
            'Dominance depends on the level of phenotype',
            'Multiple alleles and allelic series',
            '$n(n+1)/2$ genotypes from n alleles',
            'Recessive lethal, dominant visible: 2:1',
            'Yellow mice (Aʸ) and KIT white spotting',
          ],
          explanation: `Mendel's traits showed **complete dominance**: the heterozygote looks like one homozygote. That is not a law, just one possibility for how a heterozygote's phenotype compares with the homozygotes'.

**Incomplete dominance.** In snapdragons, red (*RR*) × white (*rr*) gives pink F₁ (*Rr*). The heterozygote is intermediate, so every genotype has its own phenotype and the F₂ phenotypic ratio equals the genotypic one, **1 red : 2 pink : 1 white**. This is not blending: white and red reappear unchanged in the F₂. Typically one dose of a working allele makes about half the pigment.

**Codominance.** Both alleles are fully expressed in the heterozygote. People with MN blood group genotype $L^M L^N$ carry both the M and N antigens on their red cells. In the ABO system, $I^A$ and $I^B$ encode glycosyltransferases that add different sugars to the H antigen, and an $I^A I^B$ person has both (type AB); the third allele $i$ makes an inactive enzyme and is recessive to both. So ABO shows codominance and complete dominance at once.

\`\`\`interactive
gen-punnett
{"p1": "Rr", "p2": "Rr", "dominance": ["incomplete"], "traits": {"R": ["red", "white", "pink"]}, "caption": "Snapdragon flower colour with incomplete dominance: the genotype and phenotype ratios are now the same, 1:2:1. Switch dominance to complete and watch the pink class merge with red into 3:1; switch to codominant and the heterozygote shows both."}
\`\`\`

**Dominance depends on what you measure.** In Tay-Sachs disease the heterozygote is healthy (the disease is recessive), has about half the normal hexosaminidase A activity (incomplete dominance at the enzyme level), and makes both normal and mutant protein (codominance at the molecular level). Dominance describes a relationship between phenotypes, not a property of an allele.

**Multiple alleles.** A gene can have many alleles in a population, although each diploid carries at most two. With *n* alleles there are $n(n+1)/2$ genotypes: three ABO alleles give six genotypes and four phenotypes. Alleles can form an **allelic series**: rabbit coat colour has *C* (full colour) > $c^{ch}$ (chinchilla) > $c^h$ (Himalayan) > *c* (albino), each dominant to those after it.

**Lethal alleles.** In 1905 Lucien Cuénot found that yellow mice never bred true: yellow × yellow gave 2 yellow : 1 non-yellow. The yellow allele $A^Y$ is dominant for coat colour but **recessive lethal**: $A^Y A^Y$ embryos die. Of the expected 1 $A^Y A^Y$ : 2 $A^Y A$ : 1 $AA$, the first class is missing, leaving **2:1** among survivors. Any cross of two individuals with a "dominant" visible phenotype that always gives 2:1 points to this. The UIC text describes the same pattern for dominant white spotting alleles of *KIT* in dogs and other animals, which are lethal when homozygous.

Common errors: calling the 1:2:1 of incomplete dominance a genotype-only ratio, and recomputing a lethal cross with the dead class included (the expected ratio must be among survivors). Read UIC 3.1.3, 3.1.7 and 3.1.8.`,
          resources: [
            uic(`${M3}/3.1.03%3A_Extensions_of_the_Laws_of_Inheritance`, '3.1.3 Extensions of the laws of inheritance', 'Incomplete dominance, codominance and multiple alleles.', true),
            uic(`${M3}/3.1.07%3A_White_spotting_-_when_there's_more_than_two_alleles`, '3.1.7 White spotting, when there are more than two alleles', 'An allelic series in dogs.'),
            uic(`${M3}/3.1.08%3A_KIT_-_embryonic_lethality`, '3.1.8 KIT, embryonic lethality', 'A lethal allele and the 2:1 ratio.'),
            ostx('12-2-characteristics-and-traits', '12.2 Characteristics and traits', 'Alternatives to dominance and recessiveness, multiple alleles and lethality.'),
          ],
          exercises: [
            {
              slug: 'abo-problems',
              title: 'ABO problems',
              prompt: `(a) List the six ABO genotypes and their blood types. (b) A type A woman whose father was type O has children with a type B man whose mother was type O. Give the probabilities of each blood type among their children. (c) A type O child is born to a type AB mother. Who could not be the father: type A, type B, type AB or type O? (d) A type AB child is born to two type A parents. Suggest two explanations, one involving the parents and one involving the H antigen (look up the Bombay phenotype).`,
              kind: 'problem',
              difficulty: 2,
              hint: '(b) The parents are $I^A i$ and $I^B i$: 1/4 each of AB, A, B and O. (c) An AB mother cannot have a type O child by any father: suspect a sample error or a rare allele. (d) Non-paternity (or a sample mix-up), or a parent with the Bombay phenotype: an *hh* person makes no H antigen, so their ABO alleles are hidden and an apparently type O parent may carry $I^B$. (With two truly type A parents, look hard at the typing.)',
            },
            {
              slug: 'two-to-one',
              title: 'Recognise a lethal allele',
              prompt: `In a breed of cat, tailless (Manx) × tailless gives 98 tailless and 51 tailed kittens; tailless × tailed gives 66 tailless and 70 tailed. (a) Propose a genetic model. (b) Test the first cross against 3:1 and 2:1 with chi-square. (c) What happened to the missing class, and what would you look for to confirm it? (d) Can a breeder ever obtain a true-breeding Manx line? Explain.`,
              kind: 'data-analysis',
              difficulty: 2,
              hint: 'Total 149. 3:1 expects 111.75:37.25, χ² ≈ 6.77 (rejected). 2:1 expects 99.33:49.67, χ² ≈ 0.05 (not rejected). The homozygous Manx embryos die early in development.',
            },
            {
              slug: 'allelic-series',
              title: 'An allelic series',
              prompt: `Rabbit coat colour has the series *C* > $c^{ch}$ > $c^h$ > *c*. (a) How many genotypes are possible, and how many phenotypes? (b) Give the expected phenotype ratio of $C c^h$ × $c^{ch} c$. (c) A chinchilla rabbit crossed with a Himalayan rabbit gives chinchilla, Himalayan and albino young. What are the parents' genotypes? (d) Explain at the enzyme level why an allelic series could arise from alleles of one gene with different residual activities.`,
              kind: 'problem',
              difficulty: 2,
              hint: '(a) 10 genotypes, 4 phenotypes. (b) 1/2 full colour (C_), 1/4 chinchilla ($c^{ch} c^h$), 1/4 Himalayan ($c^h c$). (c) $c^{ch} c$ × $c^h c$.',
            },
          ],
          selfAssessment: [
            {
              question: 'How do incomplete dominance and codominance differ, and what F₂ ratio do both give?',
              answerOutline: 'Incomplete: the heterozygote is intermediate. Codominance: the heterozygote shows both parental phenotypes fully. Both give a 1:2:1 phenotypic ratio in the F₂.',
            },
            {
              question: 'Why can one allele be recessive, incompletely dominant and codominant at once?',
              answerOutline: 'Dominance refers to a particular phenotype. At the organism level the heterozygote may be normal (recessive), at the enzyme-activity level intermediate, and at the protein level show both forms (codominant).',
            },
            {
              question: 'Why does a cross of two yellow mice give 2:1 instead of 3:1?',
              answerOutline: 'Aʸ is dominant for colour but lethal when homozygous. Of 1 AʸAʸ : 2 AʸA : 1 AA, the AʸAʸ embryos die, leaving 2 yellow : 1 non-yellow.',
            },
          ],
          quiz: [
            {
              question: 'In *Drosophila*, flies with curly wings are always heterozygous *Cy/+*. Curly × curly gives 400 adult offspring. About how many are expected to have straight wings?',
              options: ['100', '133', '200', '0'],
              answer: 1,
              explanation:
                '*Cy/Cy* dies, so the survivors are 2 *Cy/+* : 1 *+/+*: one-third of 400 is about 133. 100 applies the 3:1 ratio including the class that never hatches.',
            },
            {
              question: 'A type A woman ($I^A i$) and a type B man ($I^B i$) have a child. What is the probability that the child is type A?',
              options: ['$\\tfrac{1}{2}$', '$\\tfrac{3}{4}$', '$\\tfrac{1}{4}$', '$\\tfrac{1}{3}$'],
              answer: 2,
              explanation:
                'Type A requires $I^A$ from the mother ($\\tfrac12$) and $i$ from the father ($\\tfrac12$): $\\tfrac14$. The four types AB, A, B, O are equally likely.',
            },
            {
              question: 'Heterozygotes for a Tay-Sachs allele are healthy but have about half the normal enzyme activity. What is the dominance relationship at the enzyme level?',
              options: ['Complete dominance of the normal allele', 'Incomplete dominance', 'Codominance', 'Overdominance'],
              answer: 1,
              explanation:
                'Intermediate activity in the heterozygote is incomplete dominance at the enzyme level, even though at the level of disease the normal allele is completely dominant. The answer depends on which phenotype you measure.',
            },
            {
              question: 'A gene has five alleles in a population. How many different genotypes are possible?',
              options: ['5', '10', '15', '25'],
              answer: 2,
              explanation:
                '$n(n+1)/2 = 5 \\times 6 / 2 = 15$: 5 homozygotes and 10 heterozygotes. 25 counts *ab* and *ba* as different.',
            },
          ],
        },
        {
          slug: 'gene-interaction-and-epistasis',
          title: 'Gene interaction, epistasis and complementation',
          summary:
            'When two genes affect one trait, the 9:3:3:1 classes merge into 9:7, 9:3:4, 12:3:1, 15:1, 13:3 or 9:6:1. Reading those ratios as pathways, telling epistasis from dominance, and using the complementation test to count genes.',
          estimatedMinutes: 110,
          objectives: [
            'Derive each modified dihybrid ratio by merging the 9 A_B_ : 3 A_bb : 3 aaB_ : 1 aabb classes',
            'Interpret recessive epistasis, dominant epistasis, complementary and duplicate gene action in terms of a pathway',
            'Distinguish epistasis (between genes) from dominance (between alleles of one gene)',
            'Use a complementation test to decide whether two recessive mutations are in the same gene',
            'Identify an unknown interaction from F₂ counts and test it with chi-square',
          ],
          concepts: [
            'Epistasis: one gene masks another',
            'Recessive epistasis 9:3:4 (Labrador E and B)',
            'Dominant epistasis 12:3:1 (summer squash)',
            'Complementary genes 9:7 (sweet pea)',
            'Duplicate genes 15:1 (shepherd\'s purse)',
            'Dominant suppression 13:3; additive 9:6:1',
            'Complementation test (cis-trans test in diploids)',
            'Epistasis versus dominance',
          ],
          explanation: `Many traits depend on several genes acting in a pathway, and then the dihybrid F₂ classes can look alike. The genotypes still segregate 9 *A_B_* : 3 *A_bb* : 3 *aaB_* : 1 *aabb*; only the **phenotypes** merge. Every modified ratio adds up to 16, which is the first clue that two genes are segregating.

**Recessive epistasis (9:3:4).** Labrador coat colour depends on two genes. *B* (black) is dominant to *b* (chocolate); but a dog homozygous *ee* at a second gene (*MC1R*) cannot deposit dark pigment in its coat at all and is yellow, whatever its *B* genotype. So *E_B_* black (9), *E_bb* chocolate (3), and *eeB_* plus *eebb* yellow (3 + 1 = 4). Gene *E* is **epistatic** to gene *B*: its genotype masks the other gene's effect.

**Dominant epistasis (12:3:1).** In summer squash, a dominant *W* allele blocks pigment entirely, so *W_* fruit is white (9 + 3 = 12), and among *ww* fruit *Y_* is yellow (3) and *yy* green (1).

**Complementary genes (9:7).** Bateson found two white sweet pea lines whose cross gave purple F₁ and an F₂ of 9 purple : 7 white. Two enzymes act in sequence; a plant needs a working allele of both (*C_P_*) to make purple pigment, and any *cc* or *pp* plant is white (3 + 3 + 1 = 7).

**Duplicate genes (15:1)**: two genes with the same function, so only *aabb* lacks it (triangular versus ovoid seed capsules in shepherd's purse). **Dominant suppression (13:3)**: a dominant allele of one gene suppresses colour made by another (white Leghorn chickens). **Additive genes (9:6:1)**: each gene adds to the phenotype (disc, sphere and long squash).

\`\`\`interactive
gen-punnett
{"p1": "EeBb", "p2": "EeBb", "epistasis": "9:3:4", "epiNames": ["black", "chocolate", "yellow"], "caption": "Labrador F₂: E is written first because it is the epistatic gene. Click the yellow class to see that it collects eeB_ and eebb. Then step through the other epistasis modes: each one merges the same 16 squares differently, and the genotype ratio never changes."}
\`\`\`

**Epistasis is not dominance.** Dominance is between alleles at one locus (*B* over *b*); epistasis is between loci (*ee* over *B_* or *bb*). A 9:3:4 ratio cannot come from one gene with any dominance relation, because one gene gives at most three genotypic classes in proportions of quarters.

**The complementation test** asks whether two recessive mutations with the same phenotype are in the same gene. Cross a homozygous mutant of one line with a homozygous mutant of the other. If the F₁ is wild type, the mutations **complement**: each parent supplied a working copy of the gene the other lacked, so they are in **different genes** (that is how the white sweet pea lines gave purple F₁). If the F₁ is mutant, they fail to complement and are in the **same gene**. Mutations that fail to complement each other form a **complementation group**, one per gene. The test needs recessive mutations, and it is how the number of genes in a pathway is counted; module 7 applies it to phage.

Read UIC 3.1.5 and 3.1.6 and the Scitable article on epistasis.`,
          resources: [
            uic(`${M3}/3.1.05%3A_Yellow_fur_color_-_a_recessive_trait`, '3.1.5 Yellow fur color, a recessive trait', 'The E locus in dogs and how it masks other coat genes.', true),
            uic(`${M3}/3.1.06%3A_Brindle_color_-_partial_dominance_and_epistasis`, '3.1.6 Brindle color, partial dominance and epistasis', 'A second dog example combining dominance relations and epistasis.'),
            {
              title: 'Epistasis: gene interaction and the phenotypic expression of complex diseases',
              url: 'https://www.nature.com/scitable/topicpage/epistasis-gene-interaction-and-phenotype-effects-460/',
              type: 'article',
              cost: 'free',
              provider: 'Nature Education, Scitable',
              note: 'The classic modified ratios with pathway diagrams.',
            },
            oog('06%3A_Genetic_Analysis_of_Multiple_Genes', 'Chapter 6, Genetic analysis of multiple genes', 'Epistasis and complementation problems with solutions.'),
          ],
          exercises: [
            {
              slug: 'identify-interaction',
              title: 'Identify the interaction',
              prompt: `For each F₂ (from a dihybrid F₁ selfed or intercrossed), propose the interaction, give the genotypes in each class, and test your ratio with chi-square: (a) 180 purple : 138 white; (b) 271 white : 66 yellow : 21 green; (c) 370 triangular : 26 ovoid; (d) 90 black : 32 brown : 41 albino; (e) 178 disc : 116 sphere : 22 long. For (d), draw a pathway (colourless → brown → black, with the albino block first) consistent with your answer.`,
              kind: 'data-analysis',
              difficulty: 2,
              hint: '(a) 9:7 (318 total: expected 178.9:139.1). (b) 12:3:1. (c) 15:1. (d) 9:3:4, with albinism (cc) epistatic. (e) 9:6:1.',
            },
            {
              slug: 'complementation-table',
              title: 'Count the genes',
              prompt: `Six independent true-breeding white-flowered mutant lines of a normally blue plant are intercrossed in all pairs. "+" means the F₁ is blue, "−" white: 1×2 +, 1×3 +, 1×4 −, 1×5 +, 1×6 +, 2×3 +, 2×4 +, 2×5 −, 2×6 −, 3×4 +, 3×5 +, 3×6 +, 4×5 +, 4×6 +, 5×6 −. (a) How many genes are represented, and which mutants belong to each? (b) What F₂ ratio do you expect from F₁ (1×2) selfed, if the genes are unlinked? (c) Why must the mutations be recessive for this test to work?`,
              kind: 'problem',
              difficulty: 2,
              hint: 'Groups: {1, 4}, {2, 5, 6}, {3}: three genes. (1×2) F₁ is heterozygous at two pigment genes needed in the same pathway: 9 blue : 7 white.',
            },
            {
              slug: 'labrador-crosses',
              title: 'Labrador litters',
              prompt: `(a) A black Labrador and a yellow Labrador have puppies: 3 black, 2 chocolate and 5 yellow. Give the most likely genotypes of the parents. (b) What fraction of the puppies from two *EeBb* parents are yellow but carry *B*? (c) Two chocolate Labradors can have yellow puppies but never black ones. Explain. (d) Explain why breeders call *ee* "epistatic" and *B* "dominant", and why swapping the words would be wrong.`,
              kind: 'problem',
              difficulty: 2,
              hint: '(a) EeBb × eebb gives 1 black : 1 chocolate : 2 yellow. (b) eeB_ = 3/16. (c) Chocolate is E_bb; they can be Ee and produce ee, but cannot produce B.',
            },
          ],
          selfAssessment: [
            {
              question: 'Why does every modified dihybrid ratio add up to 16?',
              answerOutline: 'The F₁ makes four gamete types equally, so there are 16 equally likely combinations; epistasis only changes which genotype classes share a phenotype.',
            },
            {
              question: 'How does epistasis differ from dominance?',
              answerOutline: 'Dominance is between alleles of the same gene in a heterozygote; epistasis is when the genotype at one gene masks or modifies the phenotypic effect of another gene.',
            },
            {
              question: 'What does a complementation test tell you, and what result means two mutations are in the same gene?',
              answerOutline: 'Whether two recessive mutations with the same phenotype affect the same gene. If the double heterozygote (in trans) is mutant, they fail to complement: same gene. If wild type, different genes.',
            },
          ],
          quiz: [
            {
              question: 'An F₂ from a cross of two white-flowered lines contains 152 purple and 118 white plants. Which hypothesis fits best?',
              options: ['9:7, two complementary genes', '3:1, one gene', '1:1, a testcross', '15:1, duplicate genes'],
              answer: 0,
              explanation:
                'Of 270 plants, 9:7 predicts 151.9 : 118.1, an almost perfect fit. 3:1 would predict 202.5 : 67.5. Two white parents giving purple F₁ already points to complementation between two genes.',
            },
            {
              question: 'An *EeBb* black Labrador is mated with an *eebb* yellow one. What phenotype ratio do the puppies show?',
              options: ['1 black : 1 chocolate : 2 yellow', '1 black : 1 chocolate : 1 yellow : 1 albino', '9 black : 3 chocolate : 4 yellow', '1 black : 1 yellow'],
              answer: 0,
              explanation:
                'Each gene segregates 1:1: *Ee*: ½ *E_*, ½ *ee*; *Bb*: ½ *B_*, ½ *bb*. *E_B_* black ¼, *E_bb* chocolate ¼, and all *ee* yellow ½. 9:3:4 is the ratio for *EeBb* × *EeBb*.',
            },
            {
              question: 'In a 9:3:4 ratio, *aa* individuals show the same phenotype whatever their genotype at gene *B*. Which statement is correct?',
              options: [
                '*a* is dominant to *B*',
                '*B* is incompletely dominant',
                'Genes *A* and *B* are linked',
                'Gene *A* is epistatic to gene *B*',
              ],
              answer: 3,
              explanation:
                'Dominance is a relation between alleles of one gene (*A* and *a*); masking across genes is epistasis. Linkage would distort the 16ths, not merge classes.',
            },
            {
              question: 'Two true-breeding albino mouse strains are crossed and all F₁ pups are albino. What does this show?',
              options: [
                'The two albino mutations are in the same gene (they fail to complement)',
                'The mutations are in different genes',
                'Albinism is dominant',
                'The genes are linked',
              ],
              answer: 0,
              explanation:
                'If each strain had a different defective gene, the F₁ would get a working copy of each from the other parent and be pigmented. A mutant F₁ means both parents lack the same gene\'s function.',
            },
          ],
        },
        {
          slug: 'sex-linked-inheritance',
          title: 'Sex determination and sex-linked inheritance',
          summary:
            'How sex is determined in mammals, flies and birds, Morgan\'s white-eyed fly and the first gene placed on a chromosome, reciprocal crosses, hemizygous males, X-linked disorders, and sex-limited and sex-influenced traits.',
          estimatedMinutes: 100,
          objectives: [
            'Compare sex determination by XY (with SRY), the X:autosome ratio in Drosophila, and ZW in birds',
            'Reconstruct Morgan\'s crosses with the white-eyed mutant and explain the criss-cross pattern of reciprocal crosses',
            'Predict offspring ratios by sex for X-linked recessive and dominant traits',
            'Compute probabilities for X-linked conditions such as haemophilia and colour blindness',
            'Distinguish sex-linked, sex-limited and sex-influenced traits',
          ],
          concepts: [
            'XX/XY, SRY on the Y',
            'Drosophila: X:A ratio; birds: ZZ males, ZW females',
            'Hemizygous males',
            'Morgan (1910): white eyes, F₂ whites all male',
            'Reciprocal crosses differ for X-linked genes (criss-cross)',
            'X-linked recessive: haemophilia A, Duchenne muscular dystrophy',
            'Sex-limited and sex-influenced traits',
          ],
          explanation: `**Sex determination.** In mammals, the **Y chromosome** carries *SRY*, which switches the embryonic gonad to a testis; XX and 45,X individuals are female and XXY individuals male. In *Drosophila* the Y does not determine sex: the ratio of X chromosomes to sets of autosomes does (XXY flies are female, X0 flies male). Birds use a **ZW** system with ZZ males and ZW females, so the rules below run in reverse.

**Morgan's white-eyed fly (1910).** Thomas Hunt Morgan found a white-eyed male in a bottle of red-eyed *Drosophila*. Crossed with a red-eyed female, it gave an all-red F₁; the F₂ was 3 red : 1 white, so white is recessive, but **every white-eyed fly was male**. Morgan's explanation: the gene is on the X chromosome, and the Y carries no copy. A male is **hemizygous**: his single X allele determines his phenotype. With $X^+$ for red and $X^w$ for white:
- P: $X^+X^+$ female × $X^wY$ male → F₁ $X^+X^w$ females and $X^+Y$ males, all red.
- F₂: females $X^+X^+$, $X^+X^w$ (all red); males $X^+Y$ (red) and $X^wY$ (white), half each.

The **reciprocal cross** gives a different result, which is the signature of X-linkage: white female ($X^wX^w$) × red male ($X^+Y$) gives red daughters ($X^+X^w$) and white sons ($X^wY$), the **criss-cross** pattern, because sons get their only X from their mother. This was the first gene assigned to a specific chromosome; Bridges's nondisjunction (module 4) completed the proof.

\`\`\`interactive
gen-punnett
{"p1": "XRXr", "p2": "XRY", "xLinked": true, "traits": {"R": ["red eyes", "white eyes"]}, "caption": "Morgan's F₁ intercross: a heterozygous female with a red-eyed male. All daughters are red, half the sons white. Now set the mother to XrXr and the father to XRY for the reciprocal of Morgan's first cross and see the criss-cross: red daughters, white sons."}
\`\`\`

**X-linked disorders in humans.** Most are recessive and far commoner in males: haemophilia A (*F8*), Duchenne muscular dystrophy (*DMD*), red-green colour blindness. A carrier mother passes the allele to half her sons (affected) and half her daughters (carriers); an affected father passes it to all daughters (carriers) and no sons. For a recessive allele with frequency *q*, about *q* of males and $q^2$ of females are affected: if 8 % of men of northern European ancestry have red-green colour blindness, about 0.64 % of women should.

**Not every sex difference is sex linkage.** **Sex-limited** traits are expressed in only one sex though the genes are autosomal (milk yield in cattle, beard growth). **Sex-influenced** traits are expressed differently in the two sexes: pattern baldness behaves as dominant in men and recessive in women, largely because of androgen levels.

Common errors: giving a son his father's X, and forgetting that the sex of a child is itself a ½ probability when a question asks for "an affected son" among all children rather than among sons. Read the Scitable article on Morgan and UIC 3.1.9.`,
          resources: [
            {
              title: 'Thomas Hunt Morgan and the discovery of sex linkage',
              url: 'https://www.nature.com/scitable/topicpage/thomas-hunt-morgan-and-sex-linkage-452/',
              type: 'article',
              cost: 'free',
              provider: 'Nature Education, Scitable',
              note: 'The white-eyed fly, the crosses and their numbers, with the reasoning.',
              primary: true,
            },
            uic(`${M3}/3.1.09%3A_Hemophilia_-_a_sex-linked_disorder`, '3.1.9 Hemophilia, a sex-linked disorder', 'X-linked recessive inheritance in a human family.'),
            ostx('13-1-chromosomal-theory-and-genetic-linkage', '13.1 Chromosomal theory and genetic linkage', 'Morgan and sex-linked genes.'),
          ],
          exercises: [
            {
              slug: 'reciprocal-crosses',
              title: 'Reciprocal crosses',
              prompt: `The *Drosophila* X-linked recessive *y* (yellow body) is crossed reciprocally with wild type. (a) Give the F₁ and F₂ phenotypes, by sex, from yellow female × wild-type male, and from wild-type female × yellow male. (b) In chickens (ZW females), barred plumage *B* is dominant and Z-linked. Which cross lets a farmer sex day-old chicks by plumage, and why? (c) Explain why reciprocal crosses give the same result for autosomal genes.`,
              kind: 'problem',
              difficulty: 2,
              hint: '(b) A non-barred male ($Z^bZ^b$) × barred female ($Z^BW$): all sons are barred ($Z^BZ^b$), all daughters non-barred ($Z^bW$).',
            },
            {
              slug: 'haemophilia-family',
              title: 'Haemophilia risks',
              prompt: `A woman whose father has haemophilia A marries an unaffected man. (a) What is her genotype? (b) What is the probability that their first child is an affected son? (c) That their first son is affected? (d) That two sons are both unaffected? (e) Their daughter marries an unaffected man; what is the probability that the daughter's first child is an affected boy? (f) An affected man marries a carrier woman: what fraction of their daughters is affected?`,
              kind: 'problem',
              difficulty: 2,
              hint: '(a) obligate carrier. (b) 1/4. (c) 1/2. (d) 1/4. (e) 1/2 (carrier) × 1/4 = 1/8. (f) 1/2.',
            },
            {
              slug: 'colour-blindness-frequencies',
              title: 'X-linked frequencies',
              prompt: `(a) About 8 % of men of northern European ancestry have red-green colour vision deficiency. Assuming one X-linked recessive allele, what fraction of women are affected, and what fraction are carriers? (b) For haemophilia A, about 1 in 5,000 males is affected. What is the expected frequency of affected females? (c) Why do the observed numbers of women with colour vision deficiency differ somewhat from the simple prediction? (Hint: there are two genes and several allele types.)`,
              kind: 'problem',
              difficulty: 2,
              hint: '(a) q = 0.08: affected women 0.0064 (0.64 %), carriers 2pq = 2 × 0.92 × 0.08 = 0.147. (b) q² = (1/5000)² = 1 in 25 million.',
            },
          ],
          selfAssessment: [
            {
              question: 'Why do reciprocal crosses give different results for X-linked genes?',
              answerOutline: 'Sons receive their X only from their mother, daughters one X from each parent. Which parent carries the allele therefore changes the offspring phenotypes by sex.',
            },
            {
              question: 'Why can an affected father not pass an X-linked trait to his son?',
              answerOutline: 'He gives his son his Y chromosome, not his X.',
            },
            {
              question: 'What is the difference between sex-linked and sex-limited inheritance?',
              answerOutline: 'Sex-linked genes are on a sex chromosome. Sex-limited traits are caused by autosomal (or any) genes but expressed in only one sex.',
            },
          ],
          quiz: [
            {
              question: 'A white-eyed female *Drosophila* ($X^wX^w$) is crossed with a red-eyed male ($X^+Y$). What is the F₁?',
              options: [
                'All red-eyed',
                'Red-eyed females and white-eyed males',
                'White-eyed females and red-eyed males',
                'Half red and half white in each sex',
              ],
              answer: 1,
              explanation:
                'Daughters get $X^+$ from their father and $X^w$ from their mother: red. Sons get their only X from their mother: white. "All red" is the result of Morgan\'s original cross, with the red parent female.',
            },
            {
              question: 'A woman who carries an X-linked recessive allele and an unaffected man have a child. What is the probability that the child is an affected son?',
              options: ['$\\tfrac{1}{2}$', '$\\tfrac{1}{8}$', '$\\tfrac{1}{4}$', '$\\tfrac{3}{4}$'],
              answer: 2,
              explanation:
                'The child must be a boy ($\\tfrac12$) and receive the mutant X ($\\tfrac12$): $\\tfrac14$. $\\tfrac12$ answers a different question, the probability that a son is affected.',
            },
            {
              question: 'Beard growth is controlled by autosomal genes but appears only in males. This is an example of',
              options: ['X-linked inheritance', 'Y-linked inheritance', 'genomic imprinting', 'a sex-limited trait'],
              answer: 3,
              explanation:
                'The genes are autosomal and present in both sexes; expression depends on the hormonal environment of males. Sex-linked would require the gene to be on a sex chromosome.',
            },
            {
              question: 'A girl is red-green colour blind (X-linked recessive). Which statement must be true (assuming no new mutation)?',
              options: [
                'Her father is colour blind',
                'Her mother is colour blind',
                'Both parents are carriers but unaffected',
                'All her brothers are colour blind',
              ],
              answer: 0,
              explanation:
                'She needs a mutant X from each parent, and a father\'s only X is the one he gives her, so he must be affected. Her mother need only be a carrier, so her brothers are each affected with probability ½ unless the mother is affected.',
            },
          ],
        },
        {
          slug: 'penetrance-expressivity-and-environment',
          title: 'Penetrance, expressivity, pleiotropy and the environment',
          summary:
            'Why individuals with the same genotype can look different: incomplete penetrance, variable expressivity, pleiotropy, temperature-sensitive alleles, phenocopies and norms of reaction, and what each does to pedigrees and ratios.',
          estimatedMinutes: 90,
          objectives: [
            'Define penetrance and expressivity and distinguish them in examples',
            'Include penetrance in risk calculations',
            'Recognise a pedigree that skips a generation because of incomplete penetrance',
            'Explain pleiotropy with examples such as sickle cell disease and phenylketonuria',
            'Explain gene-environment interaction, temperature-sensitive alleles, phenocopies and norms of reaction',
          ],
          concepts: [
            'Penetrance: fraction of a genotype that shows the phenotype',
            'Expressivity: degree of expression',
            'Pleiotropy: one gene, several traits',
            'Temperature-sensitive alleles (Himalayan rabbit, Siamese cat)',
            'Phenocopy',
            'Norm of reaction',
            'PKU: genotype × diet',
            'Modifier genes',
          ],
          explanation: `Mendelian ratios assume that a genotype always produces its phenotype. Often it does not, and the ways it fails have names.

**Penetrance** is the fraction of individuals with a genotype who show the associated phenotype at all. If 80 of 100 people heterozygous for a dominant allele develop the condition, penetrance is 80 %. Incomplete penetrance makes a dominant trait appear to **skip a generation**: an unaffected parent who carries the allele has affected children. In risk calculations multiply by the penetrance: the child of an affected heterozygote and an unaffected non-carrier inherits the allele with probability ½ and is affected with probability $\\tfrac12 \\times 0.8 = 0.4$. Inherited *BRCA1* mutations are a familiar example of a dominant predisposition with incomplete penetrance, often also age-dependent.

**Expressivity** is the degree to which the phenotype is expressed among those who show it. In neurofibromatosis type 1, carriers in one family may have a few café-au-lait spots or many tumours. Polydactyly can mean one extra digit on one hand or extra digits on all four limbs. Keep the two apart: penetrance is **whether**, expressivity is **how much**.

**Pleiotropy.** One gene often affects several traits. The sickle-cell allele causes anaemia, pain crises, organ damage and, in heterozygotes, resistance to malaria. Untreated phenylketonuria (PKU) causes intellectual disability and lighter skin and hair, because the same blocked step affects several pathways. The UIC text's dog examples show coat-colour genes with effects on hearing and eye colour.

**Environment.** Genotypes produce phenotypes in an environment. The Himalayan allele of rabbit tyrosinase is **temperature-sensitive**: the enzyme works only below about 33 °C, so pigment forms on the cooler ears, nose, paws and tail; shave a patch on the back and keep it cold, and the fur grows back dark. Siamese cats work the same way. PKU is the most important human example: on a low-phenylalanine diet from birth, children with the PKU genotype develop normally, which is why newborns are screened. A **phenocopy** is an environmentally caused phenotype that mimics a genetic one (limb defects caused by thalidomide resemble inherited ones). The full range of phenotypes one genotype produces across environments is its **norm of reaction**.

**Why they happen.** Modifier genes at other loci, environmental differences, and chance in development (the two sides of a fly, or identical twins, differ) all contribute. Incomplete penetrance does not make a trait non-genetic.

Common errors: calling variable severity "incomplete penetrance", forgetting to multiply by penetrance in risk problems, and treating "genetic" as "unchangeable" (PKU shows otherwise). Read UIC 3.1.10 and 3.1.11.`,
          resources: [
            uic(`${M3}/3.1.10%3A_It's_not_all_in_the_genes_-_the_effect_of_environment`, '3.1.10 It\'s not all in the genes, the effect of environment', 'Gene-environment interaction with examples.', true),
            uic(`${M3}/3.1.11%3A_Pleiotropy_-_one_gene_affects_more_than_one_trait`, '3.1.11 Pleiotropy, one gene affects more than one trait', 'Pleiotropic coat-colour genes.'),
            db('https://www.omim.org/', 'OMIM, Online Mendelian Inheritance in Man', 'Johns Hopkins University', 'Search for neurofibromatosis type 1 (NF1) and read the clinical features section on variable expressivity. OMIM blocks automated access, so use a browser.'),
          ],
          exercises: [
            {
              slug: 'penetrance-risks',
              title: 'Risks with incomplete penetrance',
              prompt: `An autosomal dominant condition has 70 % penetrance. (a) An affected woman (heterozygous) and an unaffected man with no family history have a child: what is the probability the child is affected? (b) The unaffected brother of an affected person has an unaffected father and an affected mother (heterozygous). What is the probability that he carries the allele? (Use Bayes: carriers are unaffected with probability 0.3.) (c) What is the probability that his child is affected?`,
              kind: 'problem',
              difficulty: 3,
              hint: '(a) 1/2 × 0.7 = 0.35. (b) prior 1/2; P(unaffected | carrier) = 0.3: posterior = 0.15/(0.15 + 0.5) = 0.23. (c) 0.23 × 1/2 × 0.7 ≈ 0.081.',
            },
            {
              slug: 'which-term',
              title: 'Which term applies?',
              prompt: `Name the best term (incomplete penetrance, variable expressivity, pleiotropy, phenocopy, temperature sensitivity, norm of reaction) and explain in one or two sentences: (a) in a family with an inherited heart condition, a grandfather and granddaughter are affected but the father in between is not, although he must carry the allele; (b) a single mutation causes long limbs, a dislocated lens and aortic weakness (Marfan syndrome); (c) genetically identical cuttings of a plant grow to different heights at different altitudes; (d) a mouse has a kinked tail from a uterine injury, resembling a known mutant; (e) members of one family with the same mutation have one, two or three extra fingers.`,
              kind: 'writing',
              difficulty: 1,
            },
            {
              slug: 'omim-features',
              title: 'Penetrance and expressivity in OMIM',
              prompt: `In OMIM, look up neurofibromatosis type 1 (*NF1*), Huntington disease (*HTT*) and hereditary breast and ovarian cancer (*BRCA1*). For each, record the mode of inheritance, what the entry says about penetrance (complete, age-dependent, incomplete) and about expressivity, and one modifier (genetic or environmental) if mentioned. Present the result as a table and add a paragraph on why a geneticist must know penetrance to counsel a family.`,
              kind: 'data-analysis',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Distinguish penetrance from expressivity with one example of each.',
              answerOutline: 'Penetrance: the fraction of carriers who show any phenotype (e.g. 70 % of carriers develop a condition). Expressivity: the degree of the phenotype among those who show it (e.g. mild versus severe neurofibromatosis).',
            },
            {
              question: 'How does incomplete penetrance change a dominant pedigree?',
              answerOutline: 'Unaffected carriers can transmit the allele, so the trait can skip a generation and an affected child can have two unaffected parents, mimicking recessive inheritance.',
            },
            {
              question: 'Why is PKU a good example of gene-environment interaction?',
              answerOutline: 'The same genotype causes severe disability on a normal diet and near-normal development on a low-phenylalanine diet; the phenotype depends on both.',
            },
          ],
          quiz: [
            {
              question: 'An autosomal dominant condition has 80 % penetrance. An affected heterozygote and an unrelated non-carrier have a child. What is the probability that the child is affected?',
              options: ['$0.40$', '$0.50$', '$0.80$', '$0.64$'],
              answer: 0,
              explanation:
                'The child inherits the allele with probability ½ and then shows the condition with probability 0.8: $0.5 \\times 0.8 = 0.40$. 0.50 ignores penetrance; 0.80 forgets that half the children do not inherit the allele.',
            },
            {
              question: 'All members of a family with a dominant mutation are affected, but one has mild symptoms and another severe ones. This illustrates',
              options: ['incomplete penetrance', 'variable expressivity', 'a phenocopy', 'pleiotropy'],
              answer: 1,
              explanation:
                'Everyone with the genotype shows the phenotype (penetrance is complete); what varies is its severity, which is expressivity.',
            },
            {
              question: 'A Himalayan rabbit has a patch of back fur shaved and kept cold with an ice pack. The new fur grows in dark. What does this show?',
              options: [
                'A new mutation occurred in the patch',
                'The enzyme encoded by the Himalayan allele is active only at lower temperatures',
                'The Himalayan allele is dominant',
                'This is pleiotropy',
              ],
              answer: 1,
              explanation:
                'The genotype is unchanged; the temperature-sensitive tyrosinase works only where the skin is cool. Phenotype depends on genotype and environment together.',
            },
          ],
        },
        {
          slug: 'organelle-inheritance-and-maternal-effect',
          title: 'Mitochondrial inheritance and maternal effect',
          summary:
            'Genes outside the nucleus: mitochondrial DNA, maternal transmission, heteroplasmy and threshold effects in human disease, chloroplast variegation, and maternal-effect genes such as snail shell coiling, where the mother\'s genotype sets the offspring\'s phenotype.',
          estimatedMinutes: 90,
          objectives: [
            'Describe the human mitochondrial genome and why it is maternally inherited',
            'Explain heteroplasmy, the mitochondrial bottleneck and threshold effects, and their consequences for disease pedigrees',
            'Explain chloroplast inheritance using variegated plants',
            'Predict phenotypes over three generations for a maternal-effect gene',
            'Use reciprocal crosses to tell nuclear, organelle and maternal-effect inheritance apart',
          ],
          concepts: [
            'Human mtDNA: 16,569 bp, 37 genes',
            'Maternal inheritance of organelles',
            'Homoplasmy and heteroplasmy',
            'Bottleneck and threshold effect',
            'LHON and MELAS',
            'Chloroplast variegation (Correns, Mirabilis)',
            'Maternal-effect genes: offspring phenotype = mother\'s genotype',
            'Snail coiling (Limnaea) and bicoid',
          ],
          explanation: `Not all genes are in the nucleus. Mitochondria and chloroplasts have their own small circular genomes, a relic of their bacterial ancestry, and they are inherited by different rules.

**Mitochondrial DNA.** The human mitochondrial genome is 16,569 bp and encodes 37 genes: 13 proteins of the respiratory chain, 22 tRNAs and 2 rRNAs. A cell has hundreds to thousands of copies. Sperm mitochondria are destroyed after fertilisation, so mtDNA is inherited **maternally**: an affected mother passes a mitochondrial mutation to all her children, an affected father to none. A pedigree in which the trait passes only through females, to children of both sexes, suggests mitochondrial inheritance.

**Heteroplasmy.** A cell may contain only mutant or only normal mtDNA (**homoplasmy**) or a mixture (**heteroplasmy**). Disease appears only when the mutant fraction exceeds a **threshold** that differs between tissues, highest in energy-hungry brain, muscle, heart and retina. During egg formation only a small number of mtDNA molecules populate each oocyte (the **bottleneck**), so a heteroplasmic mother's children can carry very different mutant fractions: one child severely affected, another unaffected. That makes mitochondrial pedigrees look like incomplete penetrance and variable expressivity. Leber hereditary optic neuropathy (LHON), usually homoplasmic, causes vision loss in young adults, more often men; MELAS (encephalopathy with stroke-like episodes) is often heteroplasmic.

\`\`\`interactive
gen-pedigree
{"preset": "mito", "caption": "A family with a mitochondrial trait. Check that every affected person's mother is affected and that the affected man's children are all unaffected. Make the affected man's daughter affected and read which modes the checker now excludes and why."}
\`\`\`

**Chloroplasts.** In 1909 Carl Correns crossed variegated (green and white) four-o'clock plants (*Mirabilis jalapa*). Seeds from flowers on white branches gave white seedlings whatever the pollen; seeds from green branches gave green ones; seeds from variegated branches gave green, white or variegated seedlings. The pollen did not matter, because chloroplasts are transmitted through the egg cytoplasm.

**Maternal effect** is different: the gene is nuclear and Mendelian, but the offspring's phenotype is set by the **mother's genotype**, because the mother loads the egg with products that direct early development. Shell coiling in the snail *Limnaea peregra* is the classic case: dextral (*D*) is dominant to sinistral (*d*). A *dd* female mated with a *DD* male gives all **sinistral** offspring (genotype *Dd*), because their mother is *dd*. Those *Dd* snails produce only dextral offspring, whatever the offspring's own genotypes (1 *DD* : 2 *Dd* : 1 *dd*). Only in the next generation does the 3:1 appear, among **broods**: the *dd* snails of that generation, a quarter of them, lay sinistral broods. In *Drosophila*, the maternal-effect gene *bicoid* patterns the head-to-tail axis of the embryo.

**Telling them apart.** Reciprocal crosses differ for both organelle and maternal-effect traits. But an organelle trait follows the mother's **phenotype** (her cytoplasm) generation after generation and never shows Mendelian ratios, whereas a maternal-effect trait follows the mother's **genotype** and shows Mendelian ratios delayed by one generation. Read Online Open Genetics chapter 5 and OpenStax 13.2.`,
          resources: [
            oog('05%3A_Pedigrees_and_Populations', 'Chapter 5, Pedigrees and populations', 'Includes mitochondrial inheritance pedigrees.', ),
            ostx('13-2-chromosomal-basis-of-inherited-disorders', '13.2 Chromosomal basis of inherited disorders', 'Background on non-nuclear and chromosomal inheritance.'),
            db('https://www.ncbi.nlm.nih.gov/gene/', 'NCBI Gene', 'National Center for Biotechnology Information', 'Search MT-ND4 to see a mitochondrial gene record and its chromosome listed as MT.'),
          ],
          exercises: [
            {
              slug: 'snail-generations',
              title: 'Three generations of snails',
              prompt: `In *Limnaea*, dextral (*D*) is dominant to sinistral (*d*), and coiling is a maternal-effect trait. (a) A *DD* female is crossed with a *dd* male. Give the genotype and phenotype of the F₁. (b) The F₁ are self-fertilised. Give the F₂ genotypes and phenotypes. (c) Each F₂ snail is self-fertilised and its brood scored. What fraction of broods is sinistral? (d) A sinistral snail of unknown genotype is selfed and gives a dextral brood. What is its genotype, and how can a sinistral snail have this genotype?`,
              kind: 'problem',
              difficulty: 2,
              hint: '(a) Dd, dextral (mother DD). (b) 1 DD : 2 Dd : 1 dd, all dextral (mother Dd). (c) 1/4 (the dd snails). (d) Dd or DD: it is sinistral because its mother was dd, but its own genotype carries D.',
            },
            {
              slug: 'mito-pedigree-reasoning',
              title: 'A mitochondrial pedigree',
              prompt: `In a family with LHON, an affected woman has five children: two affected sons, one unaffected son, one affected daughter and one unaffected daughter. The unaffected daughter later has an affected son. An affected son has three children, all unaffected. (a) Explain each observation with maternal mtDNA inheritance, heteroplasmy or tissue thresholds, and sex-dependent penetrance. (b) Which observation rules out X-linked recessive inheritance? (c) Which would be impossible under autosomal recessive inheritance with complete penetrance? (d) What would you measure to give the unaffected daughter accurate risk advice?`,
              kind: 'writing',
              difficulty: 3,
              hint: '(b) An affected mother with an unaffected son rules out XR (she would be XaXa). (d) Her mutant mtDNA fraction (heteroplasmy level) in blood or other tissue, keeping in mind that the bottleneck makes children vary.',
            },
            {
              slug: 'reciprocal-diagnosis',
              title: 'Diagnose the inheritance from reciprocal crosses',
              prompt: `A plant trait (pale leaves) is studied with reciprocal crosses. Pale female × green male gives all pale; green female × pale male gives all green. The pale F₁ are self-pollinated for two generations and all descendants are pale. (a) Is the trait nuclear, maternal-effect or chloroplast-encoded? (b) What results would you have expected after two generations if it were a maternal-effect nuclear gene with pale recessive? (c) If it were an X-linked trait in an animal? Explain how each pattern differs.`,
              kind: 'problem',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why is mitochondrial DNA inherited only from the mother in humans?',
              answerOutline: 'The egg contributes the cytoplasm with its many mitochondria; sperm mitochondria are few and are destroyed after fertilisation.',
            },
            {
              question: 'Why can children of the same heteroplasmic mother differ greatly in severity?',
              answerOutline: 'A bottleneck in oocyte development means each egg receives a small sample of mtDNA, so the mutant fraction varies between eggs; tissues above the threshold show disease.',
            },
            {
              question: 'How does a maternal-effect trait differ from a mitochondrial one in a three-generation cross?',
              answerOutline: 'Maternal effect: phenotype follows the mother\'s nuclear genotype, so Mendelian ratios reappear one generation late. Mitochondrial: phenotype follows maternal cytoplasm indefinitely and never shows Mendelian ratios.',
            },
          ],
          quiz: [
            {
              question: 'A *dd* female snail (sinistral alleles) is mated with a *DD* male. Dextral *D* is a dominant maternal-effect allele. What are the F₁?',
              options: [
                'Genotype *Dd*, all dextral',
                'Homozygous recessive, all sinistral',
                'Half dextral and half sinistral',
                'Genotype *Dd*, all sinistral',
              ],
              answer: 3,
              explanation:
                'The offspring are *Dd*, but coiling is set by the mother\'s genotype, *dd*, so they are sinistral. Their own *D* allele will show only in their offspring.',
            },
            {
              question: 'A man with a homoplasmic mitochondrial disease mutation and an unaffected woman have children. What fraction of the children inherit the mutation?',
              options: ['All', 'Half', 'Only the sons', 'None'],
              answer: 3,
              explanation:
                'Children get their mitochondria from the egg, so a father does not transmit mtDNA. Half would be the answer for a nuclear heterozygous allele.',
            },
            {
              question: 'Which observation best distinguishes a mitochondrial trait from an X-linked recessive one?',
              options: [
                'More males than females are affected',
                'An affected mother has an unaffected son',
                'The trait never passes from an affected father to his sons',
                'An affected woman has all her children affected, including daughters, while affected men have no affected children',
              ],
              answer: 3,
              explanation:
                'Mitochondrial traits pass from affected mothers to children of both sexes and never from fathers. An X-linked recessive affected father has carrier daughters, and neither mode passes from father to son, so that observation does not separate them.',
            },
          ],
        },
      ],
      project: {
        slug: 'decode-a-coat-colour-system',
        title: 'Decode a coat-colour system',
        description: `Dog coat colour is a natural laboratory for every idea in this module, and the UIC course text devotes a chapter to it. Read UIC 3.1.4 to 3.1.8 (dominant black at the *K* locus, recessive yellow at the *E* locus, brindle, white spotting and *KIT* lethality) and build a working model of at least four loci (for example *E*, *K*, *B* and *S*), stating for each the alleles, their dominance relations, and which locus is epistatic to which. Then use your model to predict, with probabilities, the litters of five crosses between dogs of stated genotypes (include at least one cross that gives a modified dihybrid ratio and one involving a lethal allele). Finally, find photographs of real litters or breed-club colour inheritance guides and compare: where does your model fail, and what extra locus, allele, incomplete penetrance or modifier would explain the failure?`,
        deliverables: [
          'A table of loci, alleles, dominance relations and epistatic relations, with sources',
          'Five worked crosses with genotype and phenotype probabilities',
          'A one-page comparison of the model with real litters and an explanation of the discrepancies',
        ],
        estimatedHours: 3,
        stretchGoals: ['Find the genes behind each locus in NCBI Gene (MC1R, CBD103, TYRP1, MITF) and say what each protein does'],
      },
    },
    {
      slug: 'linkage-and-mapping',
      title: 'Linkage and Gene Mapping',
      description:
        'Genes on the same chromosome travel together unless crossing over separates them, and the frequency of separation measures distance. Two-point and three-point mapping in flies, interference and the 50 % limit, then mapping in bacteria by conjugation and transduction, and Benzer\'s complementation and fine-structure mapping inside a single gene.',
      lessons: [
        {
          slug: 'linkage-and-recombination-frequency',
          title: 'Linkage, recombination frequency and map distance',
          summary:
            'Why linked genes break the 9:3:3:1 and 1:1:1:1 ratios, how to recognise parental and recombinant classes in coupling and repulsion, how recombination frequency becomes map distance, the evidence that crossing over is physical exchange, and why recombination frequency stops near 50 %.',
          estimatedMinutes: 100,
          objectives: [
            'Recognise linkage from an excess of parental classes in a testcross',
            'Identify parental and recombinant classes for coupling (cis) and repulsion (trans) heterozygotes',
            'Compute recombination frequency and convert it to map units (cM)',
            'Explain the Creighton-McClintock evidence that genetic recombination is physical crossing over',
            'Explain why recombination frequency cannot exceed about 50 %, using multiple crossovers and the Haldane mapping function',
            'Distinguish map distance from physical distance',
          ],
          concepts: [
            'Linkage: genes on the same chromosome',
            'Parental and recombinant gametes',
            'Coupling (cis, AB/ab) and repulsion (trans, Ab/aB)',
            'Recombination frequency (RF) = recombinants / total',
            '1 map unit = 1 cM = 1 % recombination',
            'Creighton and McClintock (1931)',
            'Maximum observable RF ≈ 50 %',
            'Haldane: $r = \\tfrac12(1 - e^{-2d})$',
            'Map distance versus physical distance (about 1 cM per Mb in humans, varying)',
          ],
          explanation: `Independent assortment applies to genes on different chromosomes. Genes on the same chromosome are **linked**: they tend to be inherited together. Bateson, Saunders and Punnett saw it first in 1905 in sweet peas, as a big excess of the parental combinations of flower colour and pollen shape. Morgan explained it with chromosomes and crossing over.

**Reading a testcross.** Cross a dihybrid with a double recessive, so that each offspring's phenotype shows the gamete from the dihybrid. Suppose a fly heterozygous for two linked genes in **coupling** (*A B / a b*: dominant alleles on one homologue) gives 420 *AB*, 410 *ab*, 85 *Ab* and 85 *aB* offspring. Independent assortment would predict 1:1:1:1. Instead the two **parental** classes (*AB*, *ab*, the combinations the dihybrid received from its parents) are common, and the two **recombinant** classes are rare. The **recombination frequency** is

$$\\text{RF} = \\frac{85 + 85}{1000} = 0.17,$$

and Sturtevant's insight (1913) was to use it as a distance: **1 map unit**, or **centimorgan (cM)**, is 1 % recombination, so the genes are 17 cM apart. If the dihybrid had been in **repulsion** (*A b / a B*), the same distance would give mostly *Ab* and *aB* offspring, with *AB* and *ab* as the recombinants. Always identify parental classes as the two **most frequent** reciprocal classes, never by which look "wild type".

**Crossing over is physical.** Harriet Creighton and Barbara McClintock (1931) used a maize chromosome 9 with a visible knob at one end and a translocated piece at the other. Offspring that were genetically recombinant for genes near the two markers also had chromosomes with recombined cytological markers: genes switched homologues because the chromosomes did.

**Why RF stops at 50 %.** A crossover happens at the four-chromatid stage between two of the four chromatids, so even a meiosis with one crossover between two genes gives only 50 % recombinant chromatids. Two crossovers between the genes can restore the parental combination, so they are invisible. For genes far apart, crossovers between them are so frequent that the observed RF approaches **50 %**, the same value as for unlinked genes. Never report a recombination frequency above 50 %, and remember that an RF near 50 % does not prove genes are on different chromosomes. If crossovers occur at random (a Poisson process with mean $d$ per meiosis, in Morgans), the fraction of odd numbers of crossovers gives **Haldane's mapping function**:

$$r = \\tfrac12\\left(1 - e^{-2d}\\right).$$

For small $d$, $r \\approx d$; at $d = 0.5$ M (50 cM), $r = 0.316$; as $d$ grows, $r \\to 0.5$. Map distances are therefore built by adding short intervals, not by measuring long ones directly.

\`\`\`interactive
gen-linkage-map
{"mode": "saturation", "distance": 0.3, "caption": "Each simulated meiosis gets a Poisson number of crossovers with mean equal to the true map distance d. Simulate at d = 10, 30 and 100 cM (0.1, 0.3 and 1.0 Morgans) and compare the simulated recombination frequency with the Haldane curve and the line r = d. Then sweep d: the curve bends and flattens towards 50 %."}
\`\`\`

**Map distance is not physical distance.** Centimorgans measure crossing over, which varies along chromosomes (hotspots, low rates near centromeres) and between sexes; *Drosophila* males have no crossing over at all. In humans the average is roughly 1 cM per megabase. Read OpenStax 13.1 and Online Open Genetics chapter 7.`,
          resources: [
            ostx('13-1-chromosomal-theory-and-genetic-linkage', '13.1 Chromosomal theory and genetic linkage', 'Linkage, recombination and the first maps.', true),
            oog('07%3A_Linkage_and_Mapping', 'Chapter 7, Linkage and mapping', 'Coupling and repulsion, RF and mapping with practice problems.'),
            paper('https://pmc.ncbi.nlm.nih.gov/articles/PMC1076098/', 'Creighton and McClintock (1931), A correlation of cytological and genetical crossing-over in Zea mays', 'PNAS, free on PubMed Central', 'Four pages. Follow how the knob and translocation markers track the genetic recombinants.'),
            {
              title: 'Genetic recombination (Scitable)',
              url: 'https://www.nature.com/scitable/topicpage/genetic-recombination-514/',
              type: 'article',
              cost: 'free',
              provider: 'Nature Education, Scitable',
              note: 'Morgan, Sturtevant and the meaning of recombination frequency.',
            },
          ],
          exercises: [
            {
              slug: 'coupling-or-repulsion',
              title: 'Coupling or repulsion?',
              prompt: `Two testcrosses of *Drosophila* females heterozygous for the recessive body-colour mutation *b* (black) and wing mutation *vg* (vestigial), each with *b vg / b vg* males, give: Cross 1: wild type 405, black vestigial 415, black 92, vestigial 88. Cross 2: wild type 89, black vestigial 91, black 412, vestigial 408. (a) For each, identify the parental and recombinant classes and the phase of the female (coupling or repulsion). (b) Compute RF and the map distance for each. (c) Why would the reciprocal testcross, with heterozygous males, show no recombinants at all?`,
              kind: 'problem',
              difficulty: 1,
              hint: 'Cross 1: coupling, RF = 180/1000 = 18 %. Cross 2: repulsion, RF = 180/1000 = 18 %. Drosophila males do not cross over.',
            },
            {
              slug: 'linked-or-not',
              title: 'Test for linkage',
              prompt: `A dihybrid testcross gives 132 *AB*, 128 *ab*, 117 *Ab* and 123 *aB*. (a) Test the data against 1:1:1:1 with chi-square. (b) Does the result show the genes are on different chromosomes? (c) A better test of linkage asks only whether recombinants are fewer than 50 %: test parental (260) against recombinant (240) with a 1:1 chi-square. (d) How many offspring would you need to detect reliably a true RF of 45 %? Reason roughly from the chi-square formula.`,
              kind: 'data-analysis',
              difficulty: 2,
              hint: '(a) χ² = 1.01 with 3 df: not rejected. (b) No: genes more than about 50 cM apart on one chromosome look the same. (c) χ² = 0.8 with 1 df. (d) For RF 0.45, χ² ≈ 4 × 0.05² × N = 0.01N, which exceeds 3.84 only when N is roughly 400 or more, and needs several times that to do so reliably.',
            },
            {
              slug: 'haldane-check',
              title: 'Map distance from a large RF',
              prompt: `(a) Using Haldane's function, compute the expected RF for true map distances of 10, 25, 50, 100 and 200 cM. (b) Two genes show RF = 0.30. What map distance does Haldane's function imply? (c) Two loci 10 cM and 30 cM from a third locus, on opposite sides of it, are directly observed to recombine at RF = 0.33. Does that contradict the map? Explain with multiple crossovers. Check your values with the saturation interactive above.`,
              kind: 'problem',
              difficulty: 2,
              hint: '(a) 0.091, 0.197, 0.316, 0.432, 0.491. (b) d = −½ ln(1 − 2r) = −½ ln 0.4 = 0.458 M, about 46 cM. (c) No: the direct RF underestimates the 40 cM distance because of double crossovers.',
            },
          ],
          selfAssessment: [
            {
              question: 'How do you identify parental and recombinant classes in a testcross of linked genes?',
              answerOutline: 'Parental classes are the two most numerous reciprocal classes (they reflect the homologues the heterozygote inherited); the two rare reciprocal classes are recombinants. Phase (coupling or repulsion) decides which phenotypes these are.',
            },
            {
              question: 'Why can the observed recombination frequency between two genes never exceed about 50 %?',
              answerOutline: 'Each crossover involves only two of the four chromatids, so even an obligatory crossover gives at most 50 % recombinant chromatids; and multiple crossovers between distant genes restore parental combinations, so RF saturates at 0.5.',
            },
            {
              question: 'Why are map distances not proportional to physical distance in base pairs?',
              answerOutline: 'Crossover frequency varies along chromosomes (hotspots, centromeric suppression), between sexes and between species, so cM per Mb varies.',
            },
          ],
          quiz: [
            {
              question: 'A testcross of a dihybrid gives 442 *AB*, 458 *ab*, 46 *Ab* and 54 *aB*. What is the map distance between the genes?',
              options: ['4.6 cM', '90 cM', '46 cM', '10 cM'],
              answer: 3,
              explanation:
                'The rare classes are recombinant: $(46 + 54)/1000 = 0.10$, so 10 cM. 90 cM treats the parental classes as recombinant, which is impossible since RF cannot exceed 50 %.',
            },
            {
              question: 'A dihybrid in repulsion (*A b / a B*) is testcrossed. Which offspring classes are recombinant?',
              options: ['*Ab* and *aB*, the classes carrying one dominant allele each', 'It depends on which classes look wild type', 'Only the wild-type-looking *AB* class', '*AB* and *ab*'],
              answer: 3,
              explanation:
                'The heterozygote\'s homologues carry *A b* and *a B*; gametes *AB* and *ab* need a crossover. Treating *AB* (the wild-type-looking class) as parental by default is the common mistake.',
            },
            {
              question: 'Two genes have a true map distance of 80 cM (0.8 Morgans). Under Haldane\'s mapping function, what recombination frequency do you expect?',
              options: ['$0.80$', '$0.50$', '$0.20$', '$0.40$'],
              answer: 3,
              explanation:
                '$r = \\tfrac12(1 - e^{-1.6}) = \\tfrac12(1 - 0.202) = 0.40$. 0.80 is impossible as a recombination frequency; multiple crossovers make the observed value smaller than the distance.',
            },
            {
              question: 'Two pairs of human genes are each 1 Mb apart, yet one pair is 0.4 cM apart and the other 3 cM. What is the best explanation?',
              options: [
                'One pair is on the X chromosome',
                'Physical distance is measured in cM',
                'One of the maps must be wrong',
                'Map distance measures crossing over, which varies along chromosomes; the second interval contains a recombination hotspot',
              ],
              answer: 3,
              explanation:
                'Centimorgans measure recombination, not length. Hotspots and cold regions make cM per Mb vary severalfold across the genome.',
            },
          ],
        },
        {
          slug: 'three-point-crosses',
          title: 'Three-point crosses, gene order and interference',
          summary:
            'How one testcross of a triple heterozygote gives the order of three genes and both distances at once, why double crossovers fix the order, and how the coefficient of coincidence and interference measure whether crossovers are independent.',
          estimatedMinutes: 110,
          objectives: [
            'Sort the eight classes of a three-point testcross into parental, single-crossover and double-crossover classes',
            'Determine gene order by comparing double crossovers with parentals',
            'Compute both interval distances, including double crossovers in each',
            'Compute the expected number of double crossovers, the coefficient of coincidence and interference',
            'Explain why adding short intervals gives a larger and more accurate distance than a direct two-point measurement',
          ],
          concepts: [
            'Eight phenotypic classes in four reciprocal pairs',
            'Parentals: the largest pair',
            'Double crossovers (DCO): the smallest pair',
            'Middle gene: the one switched between parental and DCO',
            'Interval RF = (SCO in interval + DCO) / total',
            'Expected DCO = r₁ × r₂ × total',
            'Coefficient of coincidence c = observed DCO / expected',
            'Interference I = 1 − c',
          ],
          explanation: `Alfred Sturtevant, then an undergraduate in Morgan's lab, built the first genetic map in 1913 by noticing that distances between X-linked genes were nearly additive. A **three-point testcross** does the job in one experiment: a female heterozygous for three linked genes is crossed with a male homozygous recessive for all three, giving up to eight classes, which come in four reciprocal pairs.

**Worked example.** Three recessive mutations on *Drosophila* chromosome 2 are *b* (black body), *vg* (vestigial wings) and *pr* (purple eyes). A female heterozygous for all three is testcrossed and 2000 offspring are scored (alleles listed in the order b, vg, pr; + is wild type):

| class | count | | class | count |
|---|---|---|---|---|
| b vg + | 822 | | + + pr | 814 |
| + vg + | 59 | | b + pr | 55 |
| b + + | 120 | | + vg pr | 124 |
| b vg pr | 4 | | + + + | 2 |

**Step 1, parentals and double crossovers.** The largest pair (*b vg +*, *+ + pr*) is parental: the female's homologues were *b vg +* and *+ + pr*. The smallest pair (*b vg pr*, *+ + +*) is the double-crossover class.

**Step 2, gene order.** A double crossover swaps only the **middle** gene relative to the parentals. Compare *b vg +* with *b vg pr*: only the *pr* allele changed. So *pr* is in the middle and the order is **b - pr - vg**, not the order listed. Rewritten in map order, the parental chromosomes are *b + vg* and *+ pr +*.

**Step 3, distances.** Each single-crossover class shows which interval it crossed in. The pair *+ vg +* / *b + pr* has *b* separated from the other two: a crossover between *b* and *pr*. The pair *b + +* / *+ vg pr* has *vg* separated: a crossover between *pr* and *vg*. Each interval's recombinants include the double crossovers, which crossed in both:

$$d_{b\\text{-}pr} = \\frac{59 + 55 + 4 + 2}{2000} = 0.060 = 6.0\\ \\text{cM}, \\qquad d_{pr\\text{-}vg} = \\frac{120 + 124 + 4 + 2}{2000} = 0.125 = 12.5\\ \\text{cM}.$$

The *b*-*vg* distance is $6.0 + 12.5 = 18.5$ cM. Scoring *b* and *vg* alone would count only $(59 + 55 + 120 + 124)/2000 = 17.9$ %: the double crossovers restore the parental *b*-*vg* combination and are missed. That is why maps are built from short intervals.

**Step 4, interference.** If crossovers in the two intervals were independent, double crossovers would number $0.060 \\times 0.125 \\times 2000 = 15$. Only 6 were seen. The **coefficient of coincidence** is $c = 6/15 = 0.40$ and the **interference** is $I = 1 - c = 0.60$: a crossover in one interval reduces the chance of another nearby. Positive interference is the rule in most organisms over short distances.

\`\`\`interactive
gen-linkage-map
{"genes": ["b", "vg", "pr"], "classes": ["b vg +", "+ + pr", "+ vg +", "b + pr", "b + +", "+ vg pr", "b vg pr", "+ + +"], "counts": [822, 814, 59, 55, 120, 124, 4, 2], "caption": "The worked example above. Check that the widget finds pr in the middle, 6.0 and 12.5 cM, and c = 0.40. Then raise the two double-crossover counts to 8 and 7 (expected 15): interference drops to zero. Lower them to 0 and see complete interference."}
\`\`\`

These distances agree with the standard *Drosophila* map, on which *b*, *pr* and *vg* lie at 48.5, 54.5 and 67.0 cM. Errors to avoid: forgetting to add the double crossovers to both intervals, deciding the order from the listed order, and computing the expected double crossovers from counts rather than frequencies. Read Online Open Genetics chapter 7 and the Sturtevant summary at the Embryo Project.`,
          resources: [
            oog('07%3A_Linkage_and_Mapping', 'Chapter 7, Linkage and mapping', 'Three-point crosses and interference, with problems.', ),
            {
              title: 'The linear arrangement of six sex-linked factors in Drosophila (Sturtevant, 1913)',
              url: 'https://embryo.asu.edu/pages/linear-arrangement-six-sex-linked-factors-drosophila-shown-their-mode-association-1913-alfred',
              type: 'article',
              cost: 'free',
              provider: 'The Embryo Project Encyclopedia, Arizona State University',
              note: 'A summary of the first genetic map and how Sturtevant built it.',
              primary: true,
            },
            mit703('pages/assignments/', 'Problem sets', 'The early problem sets include three-point crosses in the MIT style; solutions are posted.'),
            db('https://flybase.org/', 'FlyBase', 'FlyBase consortium', 'Look up the recombination map positions of b, pr and vg to check the worked example.'),
          ],
          exercises: [
            {
              slug: 'three-point-problem',
              title: 'Map three genes',
              prompt: `In maize, a plant heterozygous for three recessive mutations, *v* (virescent), *gl* (glossy) and *va* (variable sterile), is testcrossed and gives (alleles in the order v, gl, va): v gl va 60, + + + 48, v + + 4, + gl va 6, v gl + 270, + + va 235, v + va 62, + gl + 40. (a) Which classes are parental and which double crossover? (b) What is the gene order? (c) Compute the two interval distances. (d) Compute the coefficient of coincidence and the interference. (e) Check everything with the three-point interactive.`,
              kind: 'problem',
              difficulty: 2,
              hint: 'Total 725. Parentals are v gl + (270) and + + va (235); double crossovers v + + (4) and + gl va (6). These differ from the parentals only at gl, so the order is v - gl - va. v-gl = (62 + 40 + 4 + 6)/725 = 15.4 cM; gl-va = (60 + 48 + 4 + 6)/725 = 16.3 cM. Expected DCO = 0.154 × 0.163 × 725 ≈ 18.2, so c ≈ 0.55 and I ≈ 0.45.',
            },
            {
              slug: 'design-a-cross',
              title: 'Predict a three-point testcross',
              prompt: `Genes *a*, *b* and *c* lie in the order a - b - c, with a-b = 10 cM and b-c = 20 cM and interference 0.5. A female *a + c / + b +* is testcrossed and 1000 offspring are scored. (a) How many double crossovers are expected? (b) Write the eight classes with their expected numbers. (c) What two-point RF between *a* and *c* would you observe? (d) What are the expected numbers if there were no interference?`,
              kind: 'problem',
              difficulty: 3,
              hint: 'Expected DCO without interference = 0.10 × 0.20 × 1000 = 20; with I = 0.5, 10. Then SCO a-b = 100 − 10 = 90, SCO b-c = 200 − 10 = 190, parentals 1000 − 90 − 190 − 10 = 710. Observed a-c RF = (90 + 190)/1000 = 28 %.',
            },
            {
              slug: 'flybase-check',
              title: 'Compare with FlyBase',
              prompt: `In FlyBase, find the genetic map positions (cytogenetic and recombination map) of *b* (black), *pr* (purple), *vg* (vestigial), *c* (curved) and *bw* (brown) on chromosome 2. (a) Compute the recombination distances between neighbouring genes. (b) Using Haldane's function, predict the RF you would observe between *b* and *bw* in a two-point cross. (c) Find the physical (sequence) coordinates of *b* and *vg* and compute cM per Mb for that interval. Is it close to the genome average for *Drosophila* (roughly 2-3 cM per Mb in females)?`,
              kind: 'data-analysis',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'How do you identify the middle gene in a three-point cross?',
              answerOutline: 'Compare the double-crossover classes with the parental classes: the one gene whose allele combination is switched is in the middle.',
            },
            {
              question: 'Why must double crossovers be counted in both intervals?',
              answerOutline: 'A double crossover involves one crossover in each interval, so it is a recombinant for each interval separately.',
            },
            {
              question: 'What do c and I measure, and what does I = 1 mean?',
              answerOutline: 'c is the ratio of observed to expected double crossovers (expected assuming independence); I = 1 − c. I = 1 means no double crossovers: complete interference.',
            },
          ],
          quiz: [
            {
              question: 'In a three-point testcross of 1000 offspring, the two intervals have recombination frequencies 0.10 and 0.20, and 12 double crossovers are observed. What is the interference?',
              options: ['$0.60$', '$0.12$', '$0.40$', '$-0.40$'],
              answer: 2,
              explanation:
                'Expected DCO $= 0.10 \\times 0.20 \\times 1000 = 20$; $c = 12/20 = 0.60$; $I = 1 - c = 0.40$. 0.60 is the coefficient of coincidence, not the interference.',
            },
            {
              question: 'In a three-point cross, the parental classes are *a b c* and *+ + +*, and the double-crossover classes are *a + c* and *+ b +*. Which gene is in the middle?',
              options: ['*a*', 'The order cannot be determined', '*c*', '*b*'],
              answer: 3,
              explanation:
                'Compared with *a b c*, the double crossover *a + c* has only *b* switched, so *b* lies between *a* and *c*. Assuming the listed order is the map order is the usual mistake.',
            },
            {
              question: 'Why is the distance between the two outer genes larger when computed as the sum of the two intervals than when computed directly from the outer genes alone?',
              options: [
                'Because of positive interference',
                'Because the direct two-point measurement misses double crossovers, which restore the parental combination of the outer genes',
                'Because the sum double-counts single crossovers',
                'Because map distances are not additive',
              ],
              answer: 1,
              explanation:
                'A double crossover leaves the outer genes in their parental combination, so a two-point count misses two crossovers. Short intervals catch them, which is why maps are additive only when built from short intervals.',
            },
            {
              question: 'A three-point cross gives more double crossovers than expected from the product of the two interval frequencies. What is true?',
              options: [
                'Interference is negative',
                'The coefficient of coincidence is below 1',
                'The genes are unlinked',
                'The middle gene has been misidentified',
              ],
              answer: 0,
              explanation:
                'More double crossovers than expected means $c > 1$, so $I = 1 - c < 0$: negative interference, seen in some fungi and in phage crosses. Positive interference, the usual case, gives fewer.',
            },
          ],
        },
        {
          slug: 'mapping-bacterial-genes',
          title: 'Bacterial genetics: conjugation, transformation and transduction',
          summary:
            'How bacteria exchange genes, how F, Hfr and F′ strains differ, how interrupted mating maps genes in minutes, and how cotransformation and cotransduction frequencies measure linkage, using selective media and replica plating.',
          estimatedMinutes: 110,
          objectives: [
            'Use bacterial genotype notation, selective and counterselective media, and replica plating',
            'Explain conjugation by F⁺, Hfr and F′ strains and predict the outcome of each kind of mating',
            'Build a circular map from interrupted-mating times for several Hfr strains',
            'Explain transformation and generalized and specialized transduction',
            'Order genes from cotransduction or cotransformation frequencies',
          ],
          concepts: [
            'Auxotroph and prototroph; leu⁻, strʳ notation',
            'Selective and counterselective media; replica plating',
            'Lederberg and Tatum (1946); Davis U-tube',
            'F plasmid: F⁺ × F⁻ transfers F',
            'Hfr: integrated F transfers the chromosome in order',
            'Interrupted mating: map in minutes',
            'F′ plasmids carry chromosomal genes',
            'Generalized (P1, P22) and specialized (λ) transduction; cotransduction frequency',
          ],
          explanation: `Bacteria are haploid and reproduce asexually, but they swap genes in three ways, and each has been turned into a mapping method.

**Notation and selection.** A *leu⁻* (auxotrophic) strain cannot make leucine and grows only if it is supplied; the wild-type prototroph is *leu⁺*. *strʳ* is resistance to streptomycin. Selective media let rare recombinants grow while parents cannot. Esther and Joshua Lederberg's **replica plating** (1952) transfers colonies with velvet onto several media at once to score many phenotypes.

**Conjugation.** Joshua Lederberg and Edward Tatum (1946) mixed two multiple auxotrophs, *met⁻ bio⁻ thr⁺ leu⁺* and *met⁺ bio⁺ thr⁻ leu⁻*, and recovered prototrophs at about 1 in 10⁷. Bernard Davis's U-tube, with a filter that let medium but not cells pass, showed that **cell contact** was required. The transfer is one-way, from a donor carrying the **F (fertility) plasmid**. An F⁺ × F⁻ mating copies F into the recipient, which becomes F⁺, but chromosomal genes rarely transfer. In an **Hfr** strain (high frequency of recombination), F is integrated into the chromosome; it then transfers chromosomal genes starting from a fixed origin in a fixed direction, and the recipient rarely becomes Hfr because the rest of F would come last, after the whole chromosome (about 100 minutes), and mating usually breaks first. An **F′** plasmid carries a piece of chromosome excised along with F, which is how the lac partial diploids of module 3 were made.

**Interrupted mating.** Élie Wollman and François Jacob broke mating pairs apart in a blender at intervals and asked which donor genes had entered. Each marker first appears at a characteristic time, and the times are the map: genes are spaced in **minutes**. Different Hfr strains start at different points and in different directions, and their overlapping orders join into a **circular map**. For example, if Hfr 1 transfers *thr* (8 min), *leu* (10 min), *azi* (14 min), *lac* (20 min), and Hfr 2 transfers *gal* (6 min), *lac* (14 min), *azi* (20 min), Hfr 2 runs the other way and *gal* lies just beyond *lac*: the order is thr - leu - azi - lac - gal, with *lac* and *gal* 8 minutes apart.

**Transformation.** Some bacteria take up free DNA from their surroundings, as in Griffith's and Avery's experiments; it is insensitive to the U-tube filter but destroyed by DNase. Two genes are carried on the same fragment (**cotransformed**) only if they are close.

**Transduction.** Phage can carry bacterial DNA from one cell to another. In **generalized transduction** (Zinder and Lederberg, 1952, with phage P22; P1 in *E. coli*), a phage head is mistakenly filled with a random piece of host chromosome about 2 % of the genome long. Two genes are **cotransduced** only if they lie within one such piece, and the closer they are, the more often they travel together. Cotransduction frequency is a linkage measure: if *A*-*B* cotransduce 60 %, *B*-*C* 20 % and *A*-*C* almost never, the order is A - B - C. In **specialized transduction**, a temperate phage such as λ excises imprecisely from its integration site and carries the neighbouring genes (*gal* or *bio* for λ).

Telling the three apart: needs cell contact → conjugation; blocked by DNase → transformation; passes the filter and resists DNase, carried in phage particles → transduction. Read OpenStax Microbiology 11.6 and Griffiths chapter 7.`,
          resources: [
            {
              title: 'OpenStax Microbiology, 11.6 How asexual prokaryotes achieve genetic diversity',
              url: 'https://openstax.org/books/microbiology/pages/11-6-how-asexual-prokaryotes-achieve-genetic-diversity',
              type: 'textbook',
              cost: 'free',
              provider: 'OpenStax',
              note: 'Transformation, transduction and conjugation with clear figures.',
              primary: true,
            },
            griffiths('Chapter 7, Gene transfer in bacteria and their viruses, covers Hfr mapping and cotransduction with real data. NCBI blocks automated access, so open it in a browser.'),
            mit703('pages/lecture-notes/', 'Lecture notes', 'The bacterial genetics lectures cover P1 transduction mapping and Hfr crosses.'),
          ],
          exercises: [
            {
              slug: 'hfr-map',
              title: 'Join Hfr orders into a circle',
              prompt: `Four Hfr strains transfer markers in these orders, with entry times in minutes: Hfr A: *his* 5, *gal* 15, *lac* 25, *pro* 33; Hfr B: *thr* 4, *azi* 9, *pro* 21, *lac* 29; Hfr C: *trp* 3, *his* 12, *gal* 22; Hfr D: *met* 6, *thr* 26, *azi* 31. (a) Draw a circular map placing all markers, with the origin and direction of each Hfr. (b) What is the distance in minutes between *lac* and *gal*, between *pro* and *azi*, and between *met* and *thr*? (c) Why are markers far from the origin transferred to fewer recipients?`,
              kind: 'problem',
              difficulty: 3,
              hint: 'Hfr A runs his → gal → lac → pro; Hfr B runs the other way, thr → azi → pro → lac; Hfr C extends the order beyond his to trp; Hfr D runs met → thr → azi. Around the circle: thr, azi, pro, lac, gal, his, trp, met. Lac-gal is 10 minutes, pro-azi 12 and met-thr 20. Mating pairs break at random, so long transfers are rarer.',
            },
            {
              slug: 'cotransduction-order',
              title: 'Order genes by cotransduction',
              prompt: `In P1 transduction, a donor *A⁺ B⁺ C⁺* and a recipient *A⁻ B⁻ C⁻*. Selecting for *A⁺*, 52 % of transductants are also *B⁺* and 8 % are also *C⁺*. Selecting for *C⁺*, 30 % are also *B⁺*. (a) What is the gene order? (b) Among *A⁺* transductants, which genotype class (for B and C) should be rarest if your order is right, and why? (c) Why can cotransduction not detect linkage between genes more than about 2 minutes apart on the *E. coli* map?`,
              kind: 'problem',
              difficulty: 2,
              hint: 'A-B and B-C cotransduce often, A-C rarely: order A - B - C. Among A⁺ C⁺ transductants, B⁻ needs extra crossovers between A and C, so A⁺ B⁻ C⁺ is rarest.',
            },
            {
              slug: 'which-transfer',
              title: 'Which mechanism?',
              prompt: `For each experiment, say whether the gene transfer is conjugation, transformation or transduction, and why: (a) Recombinants appear when two strains are mixed, but not when separated by a filter that passes DNA and phage; DNase has no effect. (b) Recombinants appear across the filter; DNase in the medium prevents them. (c) Recombinants appear across the filter; DNase has no effect; recombinants stop appearing if the donor lacks a prophage. (d) Recombinants appear across the filter; DNase has no effect; and only genes near one chromosome site ever transfer.`,
              kind: 'problem',
              difficulty: 1,
              hint: '(a) conjugation. (b) transformation. (c) generalized transduction. (d) specialized transduction.',
            },
          ],
          selfAssessment: [
            {
              question: 'Why does an Hfr × F⁻ mating rarely convert the recipient to F⁺ or Hfr?',
              answerOutline: 'The integrated F begins transfer from its origin and the rest of F is at the far end of the chromosome; the whole transfer takes about 100 minutes and mating pairs almost always break before it finishes.',
            },
            {
              question: 'How does interrupted mating give a map in minutes?',
              answerOutline: 'Genes enter the recipient in order from the Hfr origin at a steady rate; blending at intervals shows the time each donor marker first appears among recombinants, so the entry time is its position.',
            },
            {
              question: 'Why does cotransduction frequency measure linkage?',
              answerOutline: 'A transducing phage carries one random fragment of fixed size; two genes are carried together only if they fit on one fragment, which is more likely the closer they are.',
            },
          ],
          quiz: [
            {
              question: 'Hfr strain 1 transfers *a* (5 min), *b* (12 min), *c* (20 min). Hfr strain 2 transfers *d* (4 min), *c* (10 min), *b* (18 min). What is the gene order around the circle?',
              options: ['a - b - c - d', 'd - a - b - c with c next to a', 'a - c - b - d', 'b - a - c - d'],
              answer: 0,
              explanation:
                'Strain 1 gives a → b → c. Strain 2 runs in the opposite direction, starting near *d*, then *c*, then *b*. So *d* lies just beyond *c*: a - b - c - d around the circle (with *b*-*c* 8 minutes in both strains, a useful check).',
            },
            {
              question: 'In P1 transduction, genes *A* and *B* cotransduce 60 % of the time, *B* and *C* 20 %, and *A* and *C* almost never. What is the order?',
              options: ['A - B - C', 'B - A - C', 'A - C - B', 'The genes must be on different chromosomes'],
              answer: 0,
              explanation:
                'The pairs that cotransduce often are neighbours: A-B and B-C, so B is in the middle. *A* and *C* are too far apart to fit on one transducing fragment. Bacteria have a single chromosome, so "different chromosomes" is not the explanation.',
            },
            {
              question: 'In a U-tube with a filter that blocks bacteria but passes DNA and phage, recombinants appear on the recipient side and adding DNase does not prevent them. Which mechanism is responsible?',
              options: ['Transduction', 'Transformation', 'Conjugation', 'Mutation'],
              answer: 0,
              explanation:
                'Conjugation needs cell contact, which the filter prevents; free DNA would be destroyed by DNase. Phage particles pass the filter and protect their DNA, so transduction fits.',
            },
            {
              question: 'An F⁺ strain is mixed with an F⁻ strain. What is the most common outcome?',
              options: [
                'The F⁻ cells become F⁺, but few receive chromosomal genes',
                'The F⁻ cells become Hfr',
                'Many F⁻ cells receive donor chromosomal genes',
                'The F⁺ cells become F⁻ and stay that way',
              ],
              answer: 0,
              explanation:
                'F⁺ donors transfer a copy of the F plasmid efficiently; chromosomal transfer needs F to be integrated (Hfr). The donor keeps its F copy because transfer replicates the plasmid.',
            },
          ],
        },
        {
          slug: 'complementation-and-fine-structure',
          title: 'Complementation and fine-structure mapping: Benzer and the rII genes',
          summary:
            'How Seymour Benzer used phage T4 rII mutants to show that a gene is a linear sequence of many mutable sites: the cis-trans complementation test to define genes, recombination between mutations within a gene, deletion mapping and mutational hotspots.',
          estimatedMinutes: 100,
          objectives: [
            'Explain why rII mutants of phage T4 allow selection of extremely rare recombinants',
            'Interpret complementation (cis-trans) tests and assign mutations to complementation groups',
            'Distinguish complementation from recombination between two mutations',
            'Map point mutations with a set of overlapping deletions',
            'Explain what Benzer\'s results showed about the structure of the gene and about mutational hotspots',
          ],
          concepts: [
            'Phage T4 rII mutants: plaques on E. coli B, not on K(λ)',
            'Selective detection of rare wild-type recombinants',
            'Cis-trans (complementation) test; cistron',
            'Complementation groups rIIA and rIIB',
            'Recombination within a gene',
            'Deletion mapping: no wild-type recombinants if the deletion overlaps the mutation',
            'Mutational hotspots',
            'Limits: dominant mutations and intragenic complementation',
          ],
          explanation: `Classical genetics treated the gene as an indivisible bead. Between 1955 and 1961 Seymour Benzer took one gene apart.

**The system.** Phage T4 with mutations in the *rII* region make large, distinctive plaques on *E. coli* strain B, but cannot grow at all on strain K12 carrying phage λ, written K(λ), on which wild-type T4 grows normally. That gave Benzer a selection of astonishing power: cross two *rII* mutants by infecting B with both, then plate the progeny on K(λ). Only wild-type recombinants form plaques, so one recombinant among 10⁸ progeny can be detected, enough in principle to separate mutations in adjacent base pairs.

**Complementation: how many genes?** Benzer infected K(λ) cells with two different *rII* mutants at once. In this **trans** configuration (one mutation on each phage genome), many pairs grew: each mutant supplied the function the other lacked, so the two mutations were in different functional units. Others failed: both genomes lacked the same function. The *rII* mutations fell into exactly two **complementation groups**, *rIIA* and *rIIB*: two genes. As a control, the **cis** configuration (both mutations on one genome, a wild-type genome alongside) always grew. Benzer called the unit defined by this **cis-trans test** a **cistron**, which is a gene in the functional sense. The logic is the same as the diploid complementation test in module 6.

**Recombination within a gene.** Two mutations in the same cistron fail to complement, yet when crossed they can still give wild-type recombinants by crossing over between them. Complementation asks whether two mutations affect the same function; recombination asks whether they are at the same site. Recombination frequencies between mutations in one cistron were as low as about 0.01 %, and the sites mapped in a straight line: the gene has a linear fine structure with hundreds of mutable sites, which we now know are base pairs.

**Deletion mapping.** Mapping thousands of mutations by pairwise crosses is impractical, so Benzer used a set of overlapping **deletions** of known extent. A point mutation crossed with a deletion gives wild-type recombinants only if the deletion **does not** cover the mutation's site (there must be a wild-type copy of that site on the deletion chromosome). Testing a new mutation against a few large deletions, then progressively smaller ones, places it quickly in a small segment, just as pseudodominance did with chromosome deletions.

**Hotspots.** When Benzer mapped more than a thousand independent spontaneous *rII* mutations, they were not spread evenly: many sites were hit once, while a few hotspots had hundreds of independent mutations. Mutation depends on local sequence (we now know that 5-methylcytosine and repeats are common hotspots).

**Limits.** Complementation tests need recessive mutations: a dominant mutation gives a mutant phenotype in trans with anything. Occasionally two mutations in a gene for a multimeric protein complement each other (**intragenic complementation**), because their defective subunits combine into a partly working complex; such weak complementation can mislead. Read Benzer's 1961 paper on PubMed Central and MIT 7.03's notes on complementation.`,
          resources: [
            paper('https://pmc.ncbi.nlm.nih.gov/articles/PMC221592/', 'Benzer (1961), On the topography of the genetic fine structure', 'PNAS, free on PubMed Central', 'The deletion map of rII and the distribution of spontaneous mutations, with the famous hotspot figure.'),
            mit703('pages/lecture-notes/', 'Lecture notes', 'The lectures on complementation tests and their logic in yeast, flies and phage.'),
            oog('06%3A_Genetic_Analysis_of_Multiple_Genes', 'Chapter 6, Genetic analysis of multiple genes', 'Complementation tests with worked examples.'),
          ],
          exercises: [
            {
              slug: 'complementation-groups',
              title: 'Assign complementation groups',
              prompt: `Seven recessive phage mutants with the same plaque phenotype are tested in pairs by mixed infection of the restrictive host ("+" growth, "−" no growth): 1×2 −, 1×3 +, 1×4 +, 1×5 −, 1×6 +, 1×7 +, 2×3 +, 2×4 +, 2×5 −, 2×6 +, 2×7 +, 3×4 −, 3×5 +, 3×6 +, 3×7 −, 4×5 +, 4×6 +, 4×7 −, 5×6 +, 5×7 +, 6×7 +. Each mutant alone gives "−". (a) How many genes are there and which mutants are in each? (b) Mutants 1 and 2 give wild-type recombinants at 0.05 % when crossed. Does that contradict your answer? (c) Mutant 6 complements everything. What else must you check before concluding it is in a third gene?`,
              kind: 'problem',
              difficulty: 2,
              hint: 'Groups {1, 2, 5}, {3, 4, 7}, {6}. (b) No: mutations in one gene can recombine. (c) Check that 6 is recessive and really mutant (it fails to grow alone), and that it is a single mutation; ideally find a second allele.',
            },
            {
              slug: 'deletion-map',
              title: 'Deletion mapping',
              prompt: `A gene region is divided into segments 1 to 6 by five deletions: Del A removes segments 1-3, Del B removes 2-5, Del C removes 4-6, Del D removes 3-4, Del E removes 6. Point mutations give wild-type recombinants ("+") or not ("−") when crossed with each deletion: mutation x: A −, B −, C +, D +, E +; y: A +, B −, C −, D −, E +; z: A +, B +, C −, D +, E −; w: A −, B −, C +, D −, E +. Place each mutation in a segment, and explain why "−" means the deletion covers the mutation.`,
              kind: 'problem',
              difficulty: 2,
              hint: 'x: covered by A and B, not D: segment 2. y: covered by B, C and D, not A: segment 4. z: covered by C and E: segment 6. w: covered by A, B and D: segment 3.',
            },
            {
              slug: 'complementation-vs-recombination',
              title: 'Two different questions',
              prompt: `Write a short explanation (about 200 words), with a diagram, of the difference between a complementation test and a recombination test for two recessive mutations, *m1* and *m2*. Address: what genotype is made in each test, what is scored, what a positive result means, and why two mutations in the same gene fail to complement but can recombine. Use Benzer's rII system as your example, and say why the cis configuration is the control for the trans test.`,
              kind: 'writing',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What does failure to complement in the trans configuration tell you?',
              answerOutline: 'Both mutations disrupt the same function (same gene/cistron): neither genome supplies a working copy of that product.',
            },
            {
              question: 'How could two mutations fail to complement and still produce wild-type recombinants?',
              answerOutline: 'They are at different sites in the same gene. A crossover between the sites can join the two non-mutant parts into one wild-type copy, although the two mutant copies cannot supply each other\'s function.',
            },
            {
              question: 'Why does a deletion that overlaps a point mutation give no wild-type recombinants?',
              answerOutline: 'Recombination needs a wild-type copy of the site from the other parent; the deletion lacks that sequence, so no crossover can restore it.',
            },
          ],
          quiz: [
            {
              question: 'Five recessive mutants are tested in pairs. 1 and 3 fail to complement; 2 and 4 fail to complement; 4 and 5 fail to complement; every other pair complements. How many genes are represented?',
              options: ['2', '3', '4', '5'],
              answer: 0,
              explanation:
                'Failure to complement means the same gene: {1, 3} and {2, 4, 5} (since 2-4 and 4-5 fail, all three share a gene). Two genes. Counting failed pairs (3) instead of groups is the error.',
            },
            {
              question: 'Two rII mutants fail to complement in K(λ), but crossing them in strain B and plating on K(λ) gives wild-type plaques at a frequency of 10⁻⁴. What do you conclude?',
              options: [
                'They are in different genes',
                'They are in the same gene, at different sites',
                'They are at exactly the same site',
                'One of them must be a deletion covering the other',
              ],
              answer: 1,
              explanation:
                'Non-complementation puts them in one gene; recombinants show their sites differ. Identical sites, or a deletion covering the point mutation, could not give wild-type recombinants.',
            },
            {
              question: 'Why can a complementation test not assign a dominant mutation to a gene?',
              options: [
                'Dominant mutations cannot recombine',
                'A dominant mutation gives the mutant phenotype in combination with any other genome, so the result is mutant whether or not the genes are the same',
                'Dominant mutations are always deletions',
                'The test requires haploid organisms',
              ],
              answer: 1,
              explanation:
                'The test reads whether the two genomes together restore function; a dominant mutation spoils the phenotype even alongside wild type, so the outcome carries no information about which gene the other mutation is in.',
            },
          ],
        },
      ],
      project: {
        slug: 'build-a-chromosome-map',
        title: 'Build a chromosome map from crosses',
        description: `Build a genetic map of one *Drosophila* chromosome arm from data, and check it against the reference. Choose five genes on chromosome 2 or the X (for example *b*, *pr*, *vg*, *c*, *bw* on chromosome 2) and look up their recombination map positions in FlyBase. Using those distances, a sensible interference value (0.3 to 0.6) and the method of the three-point lesson, generate the expected counts of two overlapping three-point testcrosses of 2000 flies each (one covering three of the genes and one covering three others, with one gene in common). Round to whole flies, then add realistic sampling noise by hand or with a spreadsheet random function. Then analyse your two datasets blind, as if they had come from the lab: identify parentals and double crossovers, determine the order, compute distances, coincidence and interference, and join the two maps through the shared gene. Compare the result with FlyBase, discuss which distances are least reliable and why, and explain the difference between the map you built and the physical positions of the genes in the genome sequence.`,
        deliverables: [
          'The two simulated datasets with the method used to generate them',
          'A full analysis of each three-point cross with order, distances, c and I',
          'A combined map drawn to scale, compared with FlyBase',
          'A one-page discussion of reliability, sampling error and map versus physical distance',
        ],
        estimatedHours: 3,
        stretchGoals: ['Repeat with 200 flies per cross instead of 2000 and see how much the map changes'],
      },
    },
    {
      slug: 'genetic-technology-and-genomics',
      title: 'Genetic Technology and Genomics',
      description:
        'The tools that let geneticists read and write DNA: restriction enzymes, cloning and PCR; Sanger and next-generation sequencing and the genome browsers built on them; CRISPR genome editing and gene therapy; and the human variation, linkage and association studies that connect genes to disease.',
      lessons: [
        {
          slug: 'recombinant-dna-and-pcr',
          title: 'Recombinant DNA, cloning, gel electrophoresis and PCR',
          summary:
            'Cutting DNA with restriction enzymes, joining it into plasmid vectors, selecting clones, separating fragments on gels, making cDNA, and amplifying any sequence by the polymerase chain reaction.',
          estimatedMinutes: 100,
          objectives: [
            'Explain how restriction enzymes recognise palindromic sites and make sticky or blunt ends, and estimate how often a site occurs',
            'Describe how a gene is cloned into a plasmid vector and how clones are selected (antibiotic resistance, blue-white screening)',
            'Explain why expression of a eukaryotic gene in bacteria uses cDNA',
            'Interpret a gel electrophoresis result and a restriction map',
            'Explain the steps of PCR, design primer orientation, and compute the amplification after n cycles',
          ],
          concepts: [
            'Restriction enzymes and palindromic sites (EcoRI: GAATTC)',
            'Sticky and blunt ends; DNA ligase',
            'Expected site frequency $(1/4)^n$',
            'Plasmid vector: origin, selectable marker, cloning site',
            'Blue-white screening with lacZα',
            'cDNA via reverse transcriptase',
            'Gel electrophoresis: size by migration',
            'PCR: denature, anneal, extend; Taq polymerase; $2^n$ copies',
          ],
          explanation: `Recombinant DNA technology began in the early 1970s with enzymes borrowed from bacteria.

**Restriction enzymes** protect bacteria from phage by cutting foreign DNA at specific sequences, usually palindromes (the sequence reads the same 5′ to 3′ on both strands). EcoRI cuts G^AATTC, leaving four-base single-stranded **sticky ends** that pair with any other EcoRI end; some enzymes leave **blunt ends**. If bases were random, a six-base site would occur once every $4^6 = 4096$ bp on average and a four-base site once every 256 bp. Real genomes deviate: phage λ (48,502 bp) is expected to have about 12 EcoRI sites by chance but has 5. **DNA ligase** seals cut ends together.

**Cloning.** A **plasmid vector** carries an origin of replication, a selectable marker such as ampicillin resistance, and a multiple cloning site. Cut the vector and the insert with the same enzyme, ligate, and transform *E. coli*. Plating on ampicillin keeps only cells that took up a plasmid. In **blue-white screening**, the cloning site lies inside a *lacZα* fragment: an insert disrupts it, so colonies with an insert stay white on X-gal plates while empty-vector colonies turn blue (the lac operon at work again).

**cDNA.** To make a human protein in bacteria, you need the coding sequence without introns, because bacteria cannot splice. **Reverse transcriptase** copies mature mRNA into complementary DNA (cDNA), which is then cloned into an expression vector with a bacterial promoter and ribosome-binding site. Human insulin was made this way from the late 1970s.

**Gel electrophoresis.** DNA is negatively charged, so in an agarose gel it runs towards the positive electrode, and short fragments move faster. Comparing with a size ladder gives fragment lengths. Digesting a plasmid with one or two enzymes and sizing the fragments builds a **restriction map**: a 5.0 kb circular plasmid cut by EcoRI into 3.2 and 1.8 kb fragments has two EcoRI sites, 1.8 kb apart one way round and 3.2 kb the other.

**PCR** (Kary Mullis, 1983) copies a chosen sequence exponentially. A reaction holds the template, two **primers** (short single strands that flank the target, one on each strand, their 3′ ends pointing towards each other), the four dNTPs and a heat-stable DNA polymerase such as *Taq* from the hot-spring bacterium *Thermus aquaticus*. Each cycle has three steps: **denature** at about 95 °C to separate strands, **anneal** at about 50 to 65 °C so primers bind, and **extend** at 72 °C. Each cycle doubles the target, so after *n* cycles one molecule becomes up to $2^n$: 30 cycles give about $2^{30} \\approx 10^9$ copies. The product is defined by the primers: its ends are the primer sequences. In practice efficiency falls in late cycles as reagents run low, which is why **quantitative PCR** reads the amount during the exponential phase. **RT-PCR** starts from RNA with a reverse-transcription step.

Common errors: writing both primers as the same strand, forgetting that primers are written 5′ to 3′, and assuming restriction sites occur at the random-sequence rate. Read UIC 4.1 and OpenStax 17.1, then try the Learn.Genetics PCR and gel activities.`,
          resources: [
            uic(`${M4}/4.01%3A_Biotechnology`, '4.1 Biotechnology', 'Cloning, gels and PCR.', true),
            ostx('17-1-biotechnology', '17.1 Biotechnology', 'Restriction enzymes, cloning, PCR and gel electrophoresis.'),
            learn('labs/pcr/', 'All about PCR', 'An interactive walk through the PCR cycle.'),
            learn('labs/gel/', 'Gel electrophoresis', 'A virtual gel: load, run and size fragments.'),
          ],
          exercises: [
            {
              slug: 'restriction-map',
              title: 'Build a restriction map',
              prompt: `A 6.0 kb circular plasmid is digested: EcoRI alone gives 6.0 kb; BamHI alone gives 4.5 and 1.5 kb; EcoRI + BamHI gives 3.5, 1.5 and 1.0 kb. (a) How many sites does each enzyme have? (b) Draw the map, placing the EcoRI site at 0. (c) You want to clone a 2.0 kb EcoRI fragment into the EcoRI site: what sizes will an EcoRI digest of a successful clone give, and what would a BamHI digest give if the insert has no BamHI site, for each orientation? (d) How many EcoRI sites would you expect by chance in a random 6.0 kb sequence?`,
              kind: 'problem',
              difficulty: 2,
              hint: 'EcoRI has one site, BamHI two (4.5 and 1.5 kb apart). The 1.5 kb BamHI fragment does not contain the EcoRI site; the 4.5 kb one is split into 3.5 and 1.0. So the BamHI sites are at 1.0 and 2.5 kb (or 3.5 and 5.0 kb) from EcoRI. (c) The clone gives 6.0 + 2.0 kb with EcoRI and 6.5 + 1.5 kb with BamHI in either orientation, so BamHI cannot tell the orientations apart. (d) 6000/4096 ≈ 1.5.',
            },
            {
              slug: 'design-primers',
              title: 'Design PCR primers',
              prompt: `You want to amplify part of this coding strand (written 5′ to 3′): 5′-GGATCCTTAG CTAGGCATGA CCTAGATCGG ATCCTTGACA GCTATCGATG CATTAGCCGA ATTC-3′ (spaces every 10 bases are only for counting), starting at the sequence ATGACC and ending with the sequence ATGCAT. (a) Write the forward primer (the first 18 bases of the region, 5′ to 3′). (b) Write the reverse primer, which must bind the coding strand and be written 5′ to 3′. (c) How long is the product? (d) Starting from 50 template molecules, how many copies after 25 cycles at 100 % efficiency, and at 90 % efficiency per cycle?`,
              kind: 'problem',
              difficulty: 2,
              hint: 'The region runs from base 17 (ATGACC) to base 53 (the end of ATGCAT), so the product is 37 bp. Forward primer 5′-ATGACCTAGATCGGATCC-3′; reverse primer, the reverse complement of the last 18 bases, 5′-ATGCATCGATAGCTGTCA-3′. (d) 50 × 2²⁵ ≈ 1.68 × 10⁹; 50 × 1.9²⁵ ≈ 4.7 × 10⁸.',
            },
            {
              slug: 'cloning-design',
              title: 'Clone and express a human gene',
              prompt: `Outline, step by step, how you would produce human growth hormone in *E. coli*, starting from pituitary tissue. Include: why you start from mRNA, how you make and amplify cDNA, how you put it into an expression vector (which features the vector needs, including a bacterial promoter and ribosome-binding site), how you select and screen clones, and one way to check that the protein made is correct. Name one thing a bacterium cannot do that some human proteins need (and how industry gets around it).`,
              kind: 'writing',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does EcoRI produce fragments that can be joined to any other EcoRI fragment?',
              answerOutline: 'It cuts the palindrome GAATTC asymmetrically, leaving identical complementary AATT overhangs on every end, which base-pair and are sealed by ligase.',
            },
            {
              question: 'Why does PCR need a heat-stable polymerase and two primers?',
              answerOutline: 'Each cycle heats to about 95 °C to separate strands, which would destroy ordinary polymerases. Two primers, one on each strand, pointing towards each other, define both ends of the product so that it doubles each cycle.',
            },
            {
              question: 'How does blue-white screening identify clones with inserts?',
              answerOutline: 'The insert disrupts lacZα in the vector; without it the cell cannot make β-galactosidase activity, cannot cleave X-gal and the colony stays white. Empty vectors give blue colonies.',
            },
          ],
          quiz: [
            {
              question: 'Starting from 10 copies of a target, how many copies are present after 25 cycles of PCR at perfect efficiency?',
              options: ['$250$', '$3.4 \\times 10^7$', '$3.4 \\times 10^8$', '$10^{25}$'],
              answer: 2,
              explanation:
                '$10 \\times 2^{25} = 10 \\times 3.36 \\times 10^7 = 3.4 \\times 10^8$. $3.4 \\times 10^7$ forgets the 10 starting copies; 250 adds instead of doubling.',
            },
            {
              question: 'Approximately how many cut sites for a six-base restriction enzyme would you expect by chance in a random 48,502 bp phage genome?',
              options: ['about 12', 'about 190', 'about 3', 'about 8,000'],
              answer: 0,
              explanation:
                'A specific six-base sequence occurs with probability $(1/4)^6 = 1/4096$ per position: $48{,}502/4096 \\approx 12$. About 190 is the expectation for a four-base site ($48{,}502/256$). Real genomes deviate: λ has only 5 EcoRI sites.',
            },
            {
              question: 'A human gene\'s genomic DNA, including its introns, is cloned into a bacterial expression vector. What is the most likely result?',
              options: [
                'Correct human protein, because the genetic code is universal',
                'An incorrect or truncated protein, because bacteria do not splice introns out',
                'No transcription at all, because human genes have no promoters',
                'The protein is made but in the wrong cell compartment',
              ],
              answer: 1,
              explanation:
                'The code is universal, but bacteria have no spliceosome, so intron sequences are translated and usually introduce stops or frameshifts. That is why cDNA is used.',
            },
          ],
        },
        {
          slug: 'sequencing-and-genomes',
          title: 'DNA sequencing, genome projects and genome browsers',
          summary:
            'How Sanger sequencing reads DNA by chain termination, how short-read and long-read methods sequence whole genomes, what coverage and assembly mean, and how to navigate a genome in the UCSC Genome Browser and Ensembl.',
          estimatedMinutes: 100,
          objectives: [
            'Explain chain termination by dideoxynucleotides and read a Sanger result',
            'Compare Sanger, short-read (Illumina) and long-read (PacBio, Nanopore) sequencing in read length, accuracy and use',
            'Compute sequencing coverage and explain why repeats make assembly hard',
            'Describe the Human Genome Project, the reference genome and what annotation adds',
            'Find a gene, its exons and its variants in a genome browser',
          ],
          concepts: [
            'Dideoxynucleotides (ddNTPs) lack a 3′-OH',
            'Capillary electrophoresis and fluorescent terminators',
            'Sequencing by synthesis (short reads)',
            'Long reads (PacBio, Oxford Nanopore)',
            'Coverage = reads × read length / genome size',
            'Assembly and repeats; reference genome (GRCh38, T2T-CHM13)',
            'Annotation: genes, transcripts, regulatory elements',
            'Genome browsers: UCSC, Ensembl',
          ],
          explanation: `**Sanger sequencing** (Frederick Sanger, 1977) uses DNA polymerase to copy a template from a primer, with normal dNTPs plus a small amount of **dideoxynucleotides** (ddNTPs). A ddNTP has no 3′-OH, so once it is added the chain cannot be extended. Each reaction therefore yields a nested set of fragments, each ending at a position where a ddNTP was incorporated. Originally four reactions (ddA, ddC, ddG, ddT) were run in four gel lanes; today each ddNTP carries a different fluorescent dye and fragments are separated by size in one capillary. Reading from the shortest fragment to the longest gives the sequence of the **new strand** 5′ to 3′, which is the complement of the template. Sanger reads are about 800 to 1000 bases long and very accurate, and Sanger is still used to confirm single variants.

**Next-generation sequencing.** Short-read **sequencing by synthesis** (Illumina) attaches millions of DNA fragments to a flow cell, amplifies each into a cluster, and adds fluorescent reversible-terminator nucleotides one cycle at a time, imaging which colour each cluster incorporated. It produces billions of reads of 100 to 300 bases, very cheaply. **Long-read** methods read single molecules of tens of kilobases or more: PacBio watches a polymerase in real time; Oxford Nanopore measures the current as a strand passes through a protein pore. Long reads are essential across repeats.

**Coverage and assembly.** Coverage is how many times, on average, each base is read: $C = N L / G$ for $N$ reads of length $L$ on a genome of size $G$. Six hundred million 150-base reads on a 3.0 × 10⁹ bp genome give $C = 30\\times$. Because reads land at random, some bases are covered far less than average, so high mean coverage is needed. To assemble a new genome, overlapping reads are joined; repeats longer than the reads cannot be placed uniquely, which left gaps in early assemblies. For people, it is far easier to **align** reads to a **reference genome** and call the differences (variants).

**Genome projects.** The Human Genome Project (1990-2003) produced a reference of about 3 billion bases; the 2022 Telomere-to-Telomere (T2T) assembly finally filled the remaining gaps, mostly repeats, giving about 3.055 billion bases. The current standard human reference used by most databases is GRCh38. **Annotation** adds meaning: predicted and experimentally supported genes, transcripts and exons, regulatory regions, conservation across species, and known variants.

**Genome browsers.** The UCSC Genome Browser and Ensembl display the reference as a horizontal axis with stacked tracks: genes (exons as boxes, introns as lines, arrows for strand), conservation, regulatory marks, variants from dbSNP, ClinVar and gnomAD. In UCSC, type a gene name (*HBB*), choose the assembly (hg38), and zoom; clicking a track gives its details. Learning to read these displays is part of modern genetics. Read UIC 4.2 and 4.3, OpenStax 17.2 and 17.3, and the NHGRI DNA sequencing fact sheet.`,
          resources: [
            uic(`${M4}/4.03%3A_Whole-Genome_Sequencing`, '4.3 Whole-genome sequencing', 'Sequencing strategies and genome projects.', true),
            ostx('17-3-whole-genome-sequencing', '17.3 Whole-genome sequencing', 'Sanger and next-generation methods.'),
            {
              title: 'DNA Sequencing Fact Sheet',
              url: 'https://www.genome.gov/about-genomics/fact-sheets/DNA-Sequencing-Fact-Sheet',
              type: 'article',
              cost: 'free',
              provider: 'National Human Genome Research Institute',
              note: 'A short, current overview of sequencing methods and costs.',
            },
            db('https://genome.ucsc.edu/', 'UCSC Genome Browser', 'University of California, Santa Cruz', 'Used in the exercises. Start from the home page, choose Human GRCh38/hg38, and search for a gene.'),
          ],
          exercises: [
            {
              slug: 'read-sanger',
              title: 'Read a Sanger result',
              prompt: `A Sanger reaction is primed on a template, and the fragments, from shortest to longest, end with: ddG, ddA, ddT, ddT, ddC, ddG, ddA, ddA, ddC, ddT. (a) Write the sequence of the newly synthesised strand 5′ to 3′. (b) Write the template strand 3′ to 5′ beneath it, and then 5′ to 3′. (c) In the old four-lane gel, which lane would show the band for the third-shortest fragment? (d) A heterozygous person shows two overlapping peaks at one position. Explain why, and what that means for diagnosis.`,
              kind: 'problem',
              difficulty: 1,
              hint: '(a) 5′-GATTCGAACT-3′. (b) template 3′-CTAAGCTTGA-5′, which is 5′-AGTTCGAATC-3′. (c) the ddT lane.',
            },
            {
              slug: 'coverage-calc',
              title: 'Coverage and sequencing plans',
              prompt: `(a) How many 150-base reads are needed to sequence a human genome (3.1 × 10⁹ bp) to 30× mean coverage? (b) If reads land at random, coverage at a position is roughly Poisson with mean C. What fraction of the genome is expected to have zero coverage at 1×, 5× and 30×? (c) A 6 kb repeat occurs at two places in a genome. Can 150-base paired reads with 500-base inserts place it unambiguously? Can 20 kb long reads? Explain.`,
              kind: 'problem',
              difficulty: 2,
              hint: '(a) 30 × 3.1 × 10⁹ / 150 = 6.2 × 10⁸ reads. (b) e⁻¹ ≈ 0.37, e⁻⁵ ≈ 0.0067, e⁻³⁰ ≈ 10⁻¹³ (in practice coverage is uneven, so zero-coverage regions remain).',
            },
            {
              slug: 'browser-tour',
              title: 'A genome-browser tour',
              prompt: `In the UCSC Genome Browser (human GRCh38/hg38): (a) find *CFTR* and record its chromosome band, coordinates, strand, number of exons and length of the main transcript; (b) turn on a conservation track and describe where conservation is highest relative to exons and introns; (c) turn on the ClinVar track and find the position of the common Phe508del variant; (d) find the same gene in Ensembl, compare the number of annotated transcripts, and explain why databases can disagree on transcript counts. Record the browser versions you used.`,
              kind: 'data-analysis',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does a dideoxynucleotide stop DNA synthesis?',
              answerOutline: 'It lacks the 3′-OH needed to form the next phosphodiester bond, so no further nucleotide can be added.',
            },
            {
              question: 'When would you choose long-read over short-read sequencing?',
              answerOutline: 'For assembling new genomes, resolving repeats and structural variants, and phasing haplotypes; short reads are cheaper and more accurate per base for calling small variants against a reference.',
            },
            {
              question: 'What does 30× coverage mean, and why is the minimum coverage at some positions much lower?',
              answerOutline: 'Each base is covered by 30 reads on average. Reads land randomly (approximately Poisson) and some regions are hard to sequence or map, so coverage varies.',
            },
          ],
          quiz: [
            {
              question: 'A sequencing run produces 600 million reads of 150 bases each from a genome of 3.0 × 10⁹ bp. What is the mean coverage?',
              options: ['$3\\times$', '$20\\times$', '$30\\times$', '$300\\times$'],
              answer: 2,
              explanation:
                '$C = NL/G = 6 \\times 10^8 \\times 150 / 3.0 \\times 10^9 = 30$. Dropping a factor of ten in the read count gives $3\\times$.',
            },
            {
              question: 'In a Sanger reaction, every fragment terminated by ddATP ends in A in the new strand. What base is at the corresponding position of the template?',
              options: ['A', 'T', 'G', 'U'],
              answer: 1,
              explanation:
                'The new strand is complementary to the template, so an A in the new strand sits opposite a T. U does not occur in DNA templates.',
            },
            {
              question: 'Why did short-read sequencing leave gaps in early genome assemblies?',
              options: [
                'Short reads are less accurate than Sanger reads',
                'Short reads cannot read G-C pairs',
                'Coverage was always below 1×',
                'Repeats longer than the reads cannot be placed uniquely, so the assembly breaks at them',
              ],
              answer: 3,
              explanation:
                'If a read lies entirely within a repeat present at several places, the assembler cannot tell which copy it came from. Long reads that span the whole repeat resolve it; that is how the T2T assembly closed the gaps.',
            },
          ],
        },
        {
          slug: 'genome-editing-and-genetic-engineering',
          title: 'CRISPR genome editing, transgenics and gene therapy',
          summary:
            'How CRISPR-Cas9 came from bacterial immunity, how a guide RNA and PAM direct a cut, what non-homologous end joining and homology-directed repair do to the cut, and how editing, transgenic organisms and gene therapy are used and regulated.',
          estimatedMinutes: 100,
          objectives: [
            'Explain the natural role of CRISPR loci in bacterial immunity',
            'Identify a valid Cas9 target site from a sequence using the 20-nt protospacer and the NGG PAM, and locate the cut',
            'Predict the outcome of repair by NHEJ (indels, knockouts) and by HDR with a donor template',
            'Compute the probability that random indels knock out one or both alleles',
            'Compare transgenic organisms, somatic gene therapy and germline editing, with examples and ethical issues',
          ],
          concepts: [
            'CRISPR arrays and Cas proteins as adaptive immunity',
            'Single guide RNA (sgRNA): 20-nt spacer',
            'PAM (NGG for SpCas9); cut 3 bp upstream',
            'NHEJ → small indels, frequent frameshifts',
            'HDR with a donor template → precise edits',
            'Off-target cuts; base and prime editors',
            'Transgenic organisms (Bt crops, GAL4 lines)',
            'Somatic versus germline editing; Casgevy',
          ],
          explanation: `**From bacterial immunity to a tool.** Many bacteria carry **CRISPR** arrays: repeats separated by short spacers copied from phage they have survived. Transcribed spacers guide Cas nucleases to cut matching phage DNA on reinfection. In 2012 Martin Jinek, Emmanuelle Charpentier, Jennifer Doudna and colleagues showed that the *Streptococcus pyogenes* nuclease **Cas9**, guided by a single engineered RNA, cuts any DNA sequence matching the guide's 20 nucleotides (Charpentier and Doudna shared the 2020 Nobel Prize in Chemistry).

**Targeting.** A **single guide RNA** (sgRNA) contains a 20-nt spacer that base-pairs with the target. Cas9 also requires a **PAM**, the motif NGG, immediately 3′ of the 20-nt protospacer on the non-target strand. Written as the strand that matches the guide, a site is 5′-N₂₀-NGG-3′, and Cas9 makes a blunt double-strand break **3 bp upstream of the PAM**. Either strand can be targeted, so on a given strand you look for NGG (sites on that strand) and CCN (sites on the other strand).

**What the cell does with the break.** The edit is made by the cell's own double-strand-break repair (module 2):
- **Non-homologous end joining** rejoins the ends, often inserting or deleting a few bases. Cas9 keeps cutting until the site is mutated, so indels accumulate. An indel in a coding exon whose length is not a multiple of three shifts the frame; if indel lengths were random, about $\\tfrac23$ would do so, and both alleles would be knocked out in about $(\\tfrac23)^2 = \\tfrac49$ of cells hit on both copies. This is the standard way to make **knockouts**.
- **Homology-directed repair** copies a supplied **donor template** with homology arms, writing a precise change. It is less efficient and works mainly in dividing cells.
Newer **base editors** and **prime editors** change bases without a double-strand break. All approaches risk **off-target** edits at sequences similar to the guide, and guides are chosen to minimise them.

**Transgenic organisms** carry DNA introduced by people: crops expressing *Bacillus thuringiensis* (Bt) toxin genes, insulin-making bacteria, mice with human disease alleles, and *Drosophila* GAL4/UAS lines (module 3). **Gene therapy** treats disease by adding or editing genes in a patient's **somatic** cells, either *ex vivo* (cells removed, edited and returned) or *in vivo* (delivered by viral vectors such as AAV). The first approved CRISPR therapy, Casgevy (2023 in the UK and the USA), edits a patient's blood stem cells *ex vivo* to disrupt an erythroid enhancer of *BCL11A*, the repressor of fetal haemoglobin; the cells then make fetal haemoglobin, which treats sickle cell disease and β-thalassaemia. **Germline** editing changes embryos or gametes, so the change is inherited; the 2018 announcement by He Jiankui of edited twins was condemned and germline editing for reproduction is prohibited or restricted in most countries. Read UIC 4.1 and OpenStax 17.1 and 17.4.`,
          resources: [
            uic(`${M4}/4.01%3A_Biotechnology`, '4.1 Biotechnology', 'Genetic engineering and its applications.', true),
            ostx('17-4-applying-genomics', '17.4 Applying genomics', 'Genomics and gene therapy in medicine and agriculture.'),
            {
              title: 'Khan Academy: Biotechnology',
              url: 'https://www.khanacademy.org/science/biology/biotech-dna-technology',
              type: 'video',
              cost: 'free',
              provider: 'Khan Academy',
              note: 'Short videos on cloning, PCR and CRISPR; use them to review.',
            },
          ],
          exercises: [
            {
              slug: 'find-cas9-sites',
              title: 'Find Cas9 target sites',
              prompt: `The coding strand of an exon reads 5′-ATGCTGACCG TTAGCAAGGT CCGATTGGCA TCGCTGGAAG CTTGG-3′ (45 nt; spaces every 10 bases are only for counting). (a) Find every NGG on this strand and write the 20-nt protospacer 5′ of each, where 20 bases are available. (b) For one valid site, mark where Cas9 cuts. (c) Find any CCN on this strand: what does it mean for a site on the other strand? (d) For your chosen site, would a 1-bp deletion at the cut knock out the protein? Would a 3-bp deletion?`,
              kind: 'problem',
              difficulty: 2,
              hint: 'NGG motifs on this strand: AGG at bases 17-19 (only 16 bases upstream, too short for a 20-nt guide), then TGG at 26-28, 35-37 and 43-45, each with a full protospacer (bases 6-25, 15-34 and 23-42). For the first, Cas9 cuts between bases 22 and 23. CCG at bases 8-10 and 21-23 mark sites whose NGG is on the other strand. A 1-bp deletion shifts the frame; a 3-bp deletion removes one codon and keeps it.',
            },
            {
              slug: 'knockout-probabilities',
              title: 'Knockout probabilities',
              prompt: `In a cell line, Cas9 cuts both alleles of a gene and each cut is repaired by NHEJ. Suppose indel lengths are such that 70 % of repaired alleles are frameshifts and 30 % are in-frame. (a) What fraction of edited cells has both alleles frameshifted? (b) Exactly one? (c) Neither? (d) If an in-frame indel removes an essential amino acid with probability 0.2, what fraction of cells has no functional allele? (e) Why do researchers screen single-cell clones by sequencing rather than relying on these probabilities?`,
              kind: 'problem',
              difficulty: 2,
              hint: '(a) 0.49. (b) 2 × 0.7 × 0.3 = 0.42. (c) 0.09. (d) per allele P(non-functional) = 0.7 + 0.3 × 0.2 = 0.76, so 0.76² ≈ 0.58.',
            },
            {
              slug: 'editing-ethics',
              title: 'Somatic versus germline',
              prompt: `In about 400 words, compare the approved somatic CRISPR therapy for sickle cell disease (Casgevy) with the 2018 germline editing of embryos at *CCR5*. For each, describe: what was edited, in which cells, whether the change is heritable, the medical need, the risks (off-target edits, mosaicism, unknown effects of the change) and the consent problem. Conclude with your own view of whether, and under what conditions, heritable editing could ever be justified.`,
              kind: 'writing',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What two sequence features must a SpCas9 target site have?',
              answerOutline: 'A 20-nt protospacer matching the guide RNA, followed immediately on the same strand by an NGG PAM; Cas9 cuts 3 bp upstream of the PAM.',
            },
            {
              question: 'Why does NHEJ repair usually knock a gene out while HDR can make a precise edit?',
              answerOutline: 'NHEJ joins broken ends without a template and often leaves small indels, which frequently shift the frame; HDR copies a supplied homologous donor template, so it can write a chosen sequence.',
            },
            {
              question: 'What is the difference between somatic gene therapy and germline editing?',
              answerOutline: 'Somatic therapy changes cells of the patient\'s body and is not inherited; germline editing changes embryos or gametes so the change passes to all cells and to descendants.',
            },
          ],
          quiz: [
            {
              question: 'Cas9 cuts both alleles of a gene, and each is repaired by NHEJ with a random indel. If two-thirds of indels shift the frame, what fraction of such cells has both alleles frameshifted?',
              options: ['$\\tfrac{2}{3}$', '$\\tfrac{1}{3}$', '$\\tfrac{4}{9}$', '$\\tfrac{1}{9}$'],
              answer: 2,
              explanation:
                'The two repairs are independent: $(\\tfrac23)^2 = \\tfrac49$. $\\tfrac19$ is the fraction with neither allele frameshifted.',
            },
            {
              question: 'Which strand sequence contains a valid SpCas9 site, with the 20-nt protospacer immediately followed by the PAM?',
              options: [
                'A 20-nt sequence followed by TTA',
                'A 20-nt sequence followed by AGG',
                'A 20-nt sequence preceded by AGG',
                'A 15-nt sequence followed by TGG',
              ],
              answer: 1,
              explanation:
                'SpCas9 needs NGG directly 3′ of a 20-nt protospacer; AGG qualifies. TTA is not a PAM, a PAM on the 5′ side is on the wrong end, and 15 nt is too short for the standard guide.',
            },
            {
              question: 'A researcher wants to change one specific codon of a gene in mouse embryonic stem cells. Which approach is required?',
              options: [
                'Cas9 alone, relying on NHEJ',
                'Cas9 with a donor template carrying the new codon and homology arms, relying on HDR',
                'A restriction enzyme that cuts at the codon',
                'RNA interference against the gene',
              ],
              answer: 1,
              explanation:
                'NHEJ makes random indels, good for knockouts but not for a chosen change. HDR copies a supplied template, so it can write the new codon. RNAi reduces expression without changing DNA.',
            },
          ],
        },
        {
          slug: 'human-variation-linkage-and-gwas',
          title: 'Human genetic variation, linkage analysis and GWAS',
          summary:
            'The kinds and frequencies of human variants, how databases such as ClinVar and gnomAD describe them, how families and LOD scores located genes for Mendelian diseases, and how genome-wide association studies find common variants for complex traits, with their limits.',
          estimatedMinutes: 110,
          objectives: [
            'Describe the main kinds of human variation (SNVs, indels, CNVs, structural variants) and how many a typical genome carries',
            'Compute and interpret a LOD score for linkage in a simple family dataset',
            'Explain positional cloning using the Huntington disease or cystic fibrosis gene as an example',
            'Explain the design of a GWAS, odds ratios, the genome-wide significance threshold and linkage disequilibrium',
            'Explain why association is not causation and what fine-mapping and functional studies add',
          ],
          concepts: [
            'SNVs, indels, copy-number and structural variants',
            'Allele frequency; gnomAD; ClinVar classifications',
            'Genetic markers and linkage in families',
            'LOD score; threshold 3 (1000:1 odds)',
            'Positional cloning (HTT, CFTR)',
            'Linkage disequilibrium and haplotypes',
            'GWAS: case-control, odds ratio, $p < 5 \\times 10^{-8}$',
            'Polygenic scores and their limits',
          ],
          explanation: `**Variation.** Any two people differ at roughly one site in a thousand. A typical genome differs from the reference at about 4 to 5 million sites: mostly **single-nucleotide variants** (SNVs), plus small insertions and deletions, and thousands of larger **copy-number** and **structural variants**. Most are common and harmless; a few are rare and damaging. **gnomAD** aggregates sequence data from hundreds of thousands of people and reports each variant's allele frequency overall and by ancestry group. **ClinVar** collects interpretations of variants as pathogenic, likely pathogenic, uncertain significance, likely benign or benign, with the evidence. A rare-disease variant that is common in gnomAD is unlikely to be the cause.

**Linkage in families.** Before sequencing, disease genes were found by **linkage** to marker loci of known position. In families, you count how often the disease and a marker allele are separated by recombination, and ask how much more likely the data are if the two are linked at recombination fraction θ than if they are unlinked (θ = 0.5). The **LOD score** is the base-10 logarithm of that likelihood ratio:

$$\\text{LOD}(\\theta) = \\log_{10} \\frac{\\theta^{R}(1-\\theta)^{N-R}}{0.5^{N}},$$

for $N$ informative meioses with $R$ recombinants. With 10 meioses and 1 recombinant, at θ = 0.1, LOD = $\\log_{10}(0.1 \\times 0.9^9 / 0.5^{10}) = 1.60$. LODs from independent families **add**, and LOD ≥ 3 (odds of 1000:1) is the conventional threshold for linkage. In 1983 James Gusella's group found linkage of Huntington disease to a marker on chromosome 4 in a large Venezuelan kindred; narrowing the region and searching it (**positional cloning**) found *HTT* and its CAG expansion in 1993. *CFTR* was found the same way in 1989.

**Association and GWAS.** Most common traits and diseases (height, type 2 diabetes) are influenced by many variants of small effect, which family linkage cannot detect. A **genome-wide association study** genotypes hundreds of thousands to millions of SNPs in thousands of cases and controls and tests each for a difference in allele frequency. The effect is usually reported as an **odds ratio**: if 300 cases carry an allele and 200 do not, while among controls 200 carry it and 300 do not, OR = $(300 \\times 300)/(200 \\times 200) = 2.25$. Because about a million independent tests are done, the conventional threshold is $p < 0.05/10^6 = 5 \\times 10^{-8}$. Associations work through **linkage disequilibrium**: nearby variants are inherited together on haplotypes, so a significant SNP usually **tags** a region rather than being the cause. Most GWAS hits lie outside coding sequence, often in enhancers. **Fine-mapping** and functional experiments are needed to find the causal variant and gene.

**Limits.** Typical odds ratios are 1.05 to 1.3; association is not causation (population structure can create false hits if cases and controls differ in ancestry); and **polygenic scores** built from GWAS predict poorly in populations whose ancestry differs from the study's. Linkage tracks recombination within families; association exploits shared ancient haplotypes in populations: keep the two apart. Read UIC 4.2, OpenStax 17.2 and 17.4, and explore gnomAD and the GWAS Catalog.`,
          resources: [
            uic(`${M4}/4.02%3A_Mapping_Genomes`, '4.2 Mapping genomes', 'Genetic and physical maps and markers.', true),
            ostx('17-2-mapping-genomes', '17.2 Mapping genomes', 'Linkage maps, markers and physical maps.'),
            db('https://gnomad.broadinstitute.org/', 'gnomAD, the Genome Aggregation Database', 'Broad Institute', 'Look up allele frequencies by ancestry group. Used in the exercises and the capstone.'),
            db('https://www.ebi.ac.uk/gwas/', 'GWAS Catalog', 'NHGRI and EMBL-EBI', 'Every published GWAS association with p-values and effect sizes; search a trait such as height or type 2 diabetes.'),
          ],
          relatedLessons: [
            'probability-statistics/estimation-and-confidence/maximum-likelihood-estimation',
            'probability-statistics/hypothesis-testing-and-regression/model-selection-and-multiple-comparisons',
          ],
          exercises: [
            {
              slug: 'lod-scores',
              title: 'Compute LOD scores',
              prompt: `In three families with an autosomal dominant disease, a marker is scored in phase-known meioses: family 1, 8 meioses with 0 recombinants; family 2, 6 meioses with 1 recombinant; family 3, 10 meioses with 1 recombinant. (a) Compute each family's LOD at θ = 0.0, 0.05, 0.1 and 0.2 (a family with a recombinant has LOD = −∞ at θ = 0). (b) Add them and find the θ with the highest total. (c) Does the combined evidence pass LOD 3? (d) Why are LODs added rather than multiplied?`,
              kind: 'problem',
              difficulty: 3,
              hint: 'Totals: θ = 0.05, 4.13; θ = 0.1, 4.22; θ = 0.2, 3.70; −∞ at θ = 0. The maximum is about 4.24 near θ = 0.08, which passes 3. Family 1 alone gives 2.41 at θ = 0. LOD is a log, so adding LODs multiplies the likelihood ratios of independent families.',
            },
            {
              slug: 'gnomad-lookup',
              title: 'Look up variants in gnomAD and ClinVar',
              prompt: `(a) In gnomAD, look up the *CFTR* variant Phe508del (c.1521_1523delCTT) and record its allele frequency in at least three ancestry groups. (b) Under Hardy-Weinberg (module 9), estimate the frequency of homozygotes in each group, and compare with the incidence of cystic fibrosis. (c) In ClinVar, record its classification and the number of submitters. (d) Find one *CFTR* variant classified as "uncertain significance" and explain what additional evidence could reclassify it. Record the database versions and dates.`,
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'gwas-interpretation',
              title: 'Read a GWAS result',
              prompt: `In the GWAS Catalog, search for "type 2 diabetes" and open the association with variants in *TCF7L2*. (a) Record the lead SNP, risk allele, odds ratio and p-value from one large study. (b) Compute the odds ratio by hand for this toy case-control table: cases 1,200 carry the risk allele and 800 do not; controls 1,000 carry it and 1,000 do not. (c) Explain why the lead SNP may not be the causal variant. (d) Explain why a variant with OR = 1.1 can be highly significant yet nearly useless for predicting an individual's risk.`,
              kind: 'data-analysis',
              difficulty: 2,
              hint: '(b) OR = (1200 × 1000)/(800 × 1000) = 1.5.',
            },
          ],
          selfAssessment: [
            {
              question: 'What does a LOD score of 3 mean?',
              answerOutline: 'The data are 10³ = 1000 times more likely if the disease and marker are linked at the estimated θ than if they are unlinked (θ = 0.5); the conventional threshold for declaring linkage.',
            },
            {
              question: 'Why is the GWAS significance threshold 5 × 10⁻⁸?',
              answerOutline: 'About a million independent common-variant tests are made across the genome; a Bonferroni correction of 0.05 for 10⁶ tests gives 5 × 10⁻⁸, controlling the chance of any false positive.',
            },
            {
              question: 'How do linkage and association differ?',
              answerOutline: 'Linkage follows co-segregation of a marker and trait through recombination in families; association compares allele frequencies between unrelated cases and controls, relying on linkage disequilibrium with causal variants in the population.',
            },
          ],
          quiz: [
            {
              question: 'In one family, 8 informative meioses show no recombination between a disease and a marker. What is the LOD score at θ = 0?',
              options: ['$8.0$', '$0.80$', '$3.0$', '$2.41$'],
              answer: 3,
              explanation:
                'The likelihood ratio is $1/0.5^8 = 256$, and $\\log_{10} 256 = 8 \\log_{10} 2 = 2.41$. That falls short of 3, so more families are needed; LOD 8 counts each meiosis as a factor of 10 rather than 2.',
            },
            {
              question: 'Among 500 cases, 300 carry a risk allele; among 500 controls, 200 do. What is the odds ratio?',
              options: ['$1.5$', '$1.2$', '$0.44$', '$2.25$'],
              answer: 3,
              explanation:
                'Odds in cases $300/200 = 1.5$; in controls $200/300 = 0.667$; ratio $1.5/0.667 = 2.25$. Choosing 1.5 takes the ratio of carrier proportions ($0.6/0.4$) instead of the ratio of odds.',
            },
            {
              question: 'A GWAS finds a SNP associated with a disease at $p = 10^{-12}$ in an intron of gene X. Which conclusion is justified?',
              options: [
                'The SNP causes the disease by disrupting gene X',
                'The region around the SNP contains a variant associated with risk; the causal variant and gene still need fine-mapping and functional tests',
                'Gene X is the disease gene, because the SNP is inside it',
                'The SNP explains most of the heritability of the disease',
              ],
              answer: 1,
              explanation:
                'Associated SNPs tag haplotypes through linkage disequilibrium; the causal variant may be elsewhere on the haplotype and may act on a different gene through an enhancer. A tiny p-value measures confidence, not effect size.',
            },
            {
              question: 'Which approach was used to find the Huntington disease gene in the 1980s and 1990s?',
              options: [
                'A genome-wide association study',
                'Linkage to markers in large families, then positional cloning',
                'CRISPR screening',
                'Whole-genome sequencing of one patient',
              ],
              answer: 1,
              explanation:
                'Linkage in a large kindred placed the gene on chromosome 4 (1983), and searching the region found *HTT* in 1993. GWAS and cheap sequencing came much later; a rare Mendelian disease is a linkage problem, not an association one.',
            },
          ],
        },
      ],
      project: {
        slug: 'one-variant-three-databases',
        title: 'One variant, three databases',
        description: `Choose one well-known human disease variant, for example *CFTR* Phe508del, *HBB* Glu7Val (sickle cell), *HFE* Cys282Tyr (haemochromatosis), *BRCA1* c.68_69delAG, or *LCT* −13910C>T (lactase persistence, a benign trait). Follow it through OMIM (the gene and phenotype entries and the history of discovery), ClinVar (classification, review status and evidence) and gnomAD (allele frequencies by ancestry, number of homozygotes), and find it in the UCSC Genome Browser or Ensembl with its exon, conservation and regulatory context. Write a report that explains: what the variant does to the DNA, RNA and protein; how it was discovered (linkage, positional cloning, association); why its frequency varies between populations (founder effects, selection, drift); what Hardy-Weinberg predicts for homozygote frequency in each population and how that compares with the observed number of homozygotes in gnomAD; and how it is tested for clinically (PCR, sequencing, genotyping arrays).`,
        deliverables: [
          'A one-page variant summary with HGVS names, coordinates (GRCh38) and database identifiers',
          'A table of allele frequencies by ancestry group with Hardy-Weinberg predictions and observed homozygotes',
          'A 1,500-word report covering mechanism, discovery, population history and testing',
          'Screenshots or sketches of the genome browser view with annotations',
        ],
        estimatedHours: 3,
        stretchGoals: ['Compare the variant\'s ClinVar entry history: has its classification changed, and why?'],
      },
    },
    {
      slug: 'population-and-quantitative-genetics',
      title: 'Population and Quantitative Genetics',
      description:
        'Genetics at the scale of populations: Hardy-Weinberg proportions and how to test them, the forces that change allele frequencies (selection, mutation, migration, drift, and inbreeding\'s effect on genotypes), and the genetics of continuous traits: polygenic inheritance, variance components, heritability and the response to selection.',
      lessons: [
        {
          slug: 'hardy-weinberg-equilibrium',
          title: 'Allele frequencies and the Hardy-Weinberg principle',
          summary:
            'Computing allele and genotype frequencies, deriving Hardy-Weinberg proportions from random union of gametes, the assumptions behind them, testing them with chi-square, and using them to estimate carrier frequencies for autosomal and X-linked traits.',
          estimatedMinutes: 100,
          objectives: [
            'Compute allele frequencies from genotype counts',
            'Derive the Hardy-Weinberg proportions $p^2$, $2pq$, $q^2$ and state the assumptions',
            'Test observed genotype counts against Hardy-Weinberg with the correct degrees of freedom',
            'Estimate carrier frequencies from disease incidence for autosomal and X-linked recessive conditions, and extend to three alleles',
            'Explain why Hardy-Weinberg does not imply that dominant alleles increase',
          ],
          concepts: [
            'Allele frequency p, q with p + q = 1',
            'Genotype frequencies $p^2$, $2pq$, $q^2$',
            'Reached in one generation of random mating',
            'Assumptions: random mating, large N, no selection, mutation or migration',
            'Chi-square test with df = 1 (3 classes − 1 − 1 estimated p)',
            'Carrier frequency from incidence: $q = \\sqrt{\\text{incidence}}$',
            'X-linked: males q, females $q^2$',
            'Multiple alleles: $(p + q + r)^2$',
          ],
          explanation: `Population genetics describes a population by its **allele frequencies**. If a sample has 360 *AA*, 480 *Aa* and 160 *aa* individuals (1000 people, 2000 alleles), the frequency of *A* is

$$p = \\frac{2(360) + 480}{2000} = 0.6, \\qquad q = 1 - p = 0.4.$$

Count alleles, not people: each homozygote carries two copies, each heterozygote one.

**The Hardy-Weinberg principle** (G. H. Hardy and Wilhelm Weinberg, 1908) answers a question raised soon after Mendel was rediscovered: why does a dominant allele not take over a population? Suppose mating is random. Then a new individual is formed by drawing two gametes independently from the population's gamete pool, in which *A* has frequency *p*. By the product rule,

$$P(AA) = p^2, \\quad P(Aa) = 2pq, \\quad P(aa) = q^2,$$

and the allele frequency in the offspring is $p^2 + \\tfrac12(2pq) = p(p + q) = p$: unchanged. Mendelian inheritance by itself does not change allele frequencies, and dominance has nothing to do with how common an allele is. The proportions are reached in **one generation** of random mating and stay constant as long as the assumptions hold: random mating with respect to the gene, a large population (no drift), and no selection, mutation or migration. Those are exactly the forces of the next lesson.

**Testing.** In the sample above, the expected counts are $1000 \\times 0.36 = 360$, $1000 \\times 0.48 = 480$ and $1000 \\times 0.16 = 160$: a perfect fit. In general compute p from the data, then expected counts, then χ². The degrees of freedom are **1**, not 2: three classes minus one for the total, minus one more because p was estimated from the same data. A significant excess of homozygotes points to inbreeding, population structure (two subpopulations pooled), or genotyping error; heterozygote excess can mean selection favouring heterozygotes or mixing.

\`\`\`interactive
gen-hardy-weinberg
{"mode": "counts", "AA": 298, "Aa": 489, "aa": 213, "caption": "A sample of 1000 genotypes. Check p by counting alleles, then the expected counts and χ² with df = 1. Now move 100 individuals from Aa into the two homozygote classes (50 each): p stays the same, but the fit fails. That heterozygote deficit is what inbreeding or a mixture of populations produces."}
\`\`\`

**Carrier frequencies.** For a rare recessive disease, HW lets you estimate carriers from incidence. If 1 in 2500 newborns has cystic fibrosis, $q^2 = 1/2500$, so $q = 0.02$ and carriers are $2pq = 2 \\times 0.98 \\times 0.02 \\approx 0.039$, about 1 in 25. Carriers vastly outnumber patients, which is why rare recessive alleles are hard to remove. For **X-linked** genes, males are hemizygous: their phenotype frequencies equal allele frequencies (*q* affected), while females follow $p^2$, $2pq$, $q^2$. With **three alleles** (ABO), expand $(p + q + r)^2$.

**Caution.** Assuming HW without checking is a classic error: consanguinity, assortative mating and stratification are common in real populations, and a disease allele's incidence may be measured in a different population from the one you counsel. Read OpenStax 19.1 and 19.2.`,
          resources: [
            ostx('19-1-population-evolution', '19.1 Population evolution', 'Allele frequencies and the Hardy-Weinberg principle.', true),
            ostx('19-2-population-genetics', '19.2 Population genetics', 'The forces that change allele frequencies; read the first half now.'),
            oog('05%3A_Pedigrees_and_Populations', 'Chapter 5, Pedigrees and populations', 'Hardy-Weinberg problems with answers.'),
          ],
          relatedLessons: ['probability-statistics/hypothesis-testing-and-regression/chi-square-and-goodness-of-fit'],
          exercises: [
            {
              slug: 'hw-test',
              title: 'Test Hardy-Weinberg',
              prompt: `MN blood group genotypes in three samples (MM, MN, NN): sample 1: 1787, 3039, 1303; sample 2: 50, 20, 30; sample 3: 210, 520, 270. For each, compute the allele frequencies, the expected HW counts, χ² with df = 1 and the conclusion at α = 0.05. For any sample that departs, say whether heterozygotes are in excess or deficit and suggest a cause. Check with the counts interactive.`,
              kind: 'data-analysis',
              difficulty: 2,
              hint: 'Sample 1: p(M) = 0.5395, expected 1783.8 : 3045.4 : 1299.8, χ² ≈ 0.02 (fits). Sample 2: p = 0.6; expected 36 : 48 : 16, χ² ≈ 34 (heterozygote deficit: pooled populations or inbreeding). Sample 3: p = 0.47; expected 220.9 : 498.2 : 280.9, χ² ≈ 1.9 (fits).',
            },
            {
              slug: 'carrier-frequency',
              title: 'Carrier frequencies from incidence',
              prompt: `(a) Phenylketonuria affects about 1 in 10,000 births in many European populations. Estimate q, the carrier frequency, and the ratio of carriers to affected people. (b) Tay-Sachs disease historically affected about 1 in 3,600 births among Ashkenazi Jews. Estimate the carrier frequency. (c) Haemophilia A affects about 1 in 5,000 males. What fraction of females are carriers? (d) Which assumption of Hardy-Weinberg is most likely to be violated in using incidence in (b), and in which direction would it bias your estimate?`,
              kind: 'problem',
              difficulty: 2,
              hint: '(a) q = 0.01, 2pq ≈ 0.0198 (about 1 in 50), roughly 200 carriers per affected person. (b) q = 1/60 ≈ 0.0167, carriers ≈ 0.033 (1 in 30). (c) 2pq ≈ 2/5000 = 1 in 2500.',
            },
            {
              slug: 'abo-frequencies',
              title: 'Three alleles',
              prompt: `In a population, ABO allele frequencies are $I^A$ 0.28, $I^B$ 0.06 and $i$ 0.66. (a) Using $(p + q + r)^2$, compute the expected frequencies of the four blood types. (b) What fraction of type A people are heterozygous ($I^A i$)? (c) Explain why the recessive allele *i* can be the most common one. (d) From a sample in which 45 % of people are type O, estimate the frequency of *i*.`,
              kind: 'problem',
              difficulty: 2,
              hint: '(a) O = 0.4356, A = 0.28² + 2(0.28)(0.66) = 0.4480, B = 0.06² + 2(0.06)(0.66) = 0.0828, AB = 2(0.28)(0.06) = 0.0336. (b) 0.3696/0.4480 ≈ 0.825. (d) r = √0.45 ≈ 0.67.',
            },
          ],
          selfAssessment: [
            {
              question: 'Derive the Hardy-Weinberg genotype frequencies and show that allele frequencies do not change.',
              answerOutline: 'Random union of gametes with frequencies p and q gives AA p², Aa 2pq, aa q². The new frequency of A is p² + pq = p(p + q) = p.',
            },
            {
              question: 'Why does a Hardy-Weinberg chi-square test have 1 degree of freedom with three genotype classes?',
              answerOutline: 'One is lost because the total is fixed and one because the allele frequency used to compute expectations was estimated from the same data: 3 − 1 − 1 = 1.',
            },
            {
              question: 'Why are carriers of a rare recessive allele so much more common than affected people?',
              answerOutline: 'Carriers are 2pq ≈ 2q while affected are q²; for small q, 2q/q² = 2/q, a large ratio (about 100 to 1 or more).',
            },
          ],
          quiz: [
            {
              question: 'An autosomal recessive disease affects 1 in 10,000 people in a randomly mating population. About what fraction of people are carriers?',
              options: ['1 in 50', '1 in 100', '1 in 5,000', '1 in 10,000'],
              answer: 0,
              explanation:
                '$q^2 = 10^{-4}$, so $q = 0.01$ and $2pq = 2 \\times 0.99 \\times 0.01 \\approx 0.0198$, about 1 in 50. 1 in 100 is *q*, the allele frequency, not the carrier frequency.',
            },
            {
              question: 'An X-linked recessive trait is seen in 5 % of males. Assuming Hardy-Weinberg proportions, what fraction of females show it?',
              options: ['5 %', '2.5 %', '0.25 %', '9.5 %'],
              answer: 2,
              explanation:
                'Males show the allele frequency: $q = 0.05$. Affected females need two copies: $q^2 = 0.0025 = 0.25\\,\\%$. 9.5 % is the carrier frequency $2pq$.',
            },
            {
              question: 'A sample has 400 *AA*, 300 *Aa* and 300 *aa*. Which statement is correct?',
              options: [
                'p = 0.55, and the sample fits Hardy-Weinberg closely',
                'The test cannot be done because *A* is dominant',
                'p = 0.40, the frequency of *AA*',
                'p = 0.55, but there are far fewer heterozygotes than the 495 expected, so the population departs from Hardy-Weinberg',
              ],
              answer: 3,
              explanation:
                '$p = (800 + 300)/2000 = 0.55$; expected *Aa* $= 2 \\times 0.55 \\times 0.45 \\times 1000 = 495$, against 300 observed; χ² is about 155 with 1 df. Using the *AA* genotype frequency as the allele frequency is the error behind the 0.40 option.',
            },
            {
              question: 'Why does a chi-square test of Hardy-Weinberg proportions for one gene with two alleles use 1 degree of freedom?',
              options: [
                'There are two alleles, so df = 2 − 1',
                'Three genotype classes, minus one for the fixed total, minus one for the allele frequency estimated from the same data',
                'Hardy-Weinberg tests always use df = 1 whatever the number of alleles',
                'Because the heterozygote class is counted twice',
              ],
              answer: 1,
              explanation:
                'Each parameter estimated from the data costs a degree of freedom. With three alleles there would be 6 genotype classes and 2 estimated frequencies: df = 6 − 1 − 2 = 3.',
            },
          ],
        },
        {
          slug: 'evolutionary-forces',
          title: 'Selection, mutation, migration, drift and inbreeding',
          summary:
            'How each violation of Hardy-Weinberg changes a population: natural selection with fitnesses and heterozygote advantage, mutation-selection balance, gene flow, random genetic drift and effective population size, and inbreeding, which changes genotype frequencies but not allele frequencies.',
          estimatedMinutes: 110,
          objectives: [
            'Compute the change in allele frequency under selection with given genotype fitnesses',
            'Explain why selection against a rare recessive allele is slow, and compute an equilibrium under heterozygote advantage',
            'Estimate equilibrium frequencies under mutation-selection balance',
            'Describe random genetic drift, fixation probabilities, loss of heterozygosity and effective population size',
            'Explain how inbreeding changes genotype frequencies, and compute the inbreeding coefficient for simple pedigrees',
          ],
          concepts: [
            'Relative fitness w and selection coefficient s',
            'Selection against recessives: $q_t = q_0 / (1 + t q_0)$ when lethal',
            'Heterozygote advantage: $\\hat q = s/(s + t)$ (sickle cell and malaria)',
            'Mutation-selection balance: $\\hat q \\approx \\sqrt{\\mu/s}$',
            'Migration: $\\Delta p = m(p_m - p)$',
            'Drift: fixation probability = initial frequency; new mutation $1/(2N)$',
            'Heterozygosity decays as $(1 - 1/2N)^t$; effective size $N_e$',
            'Inbreeding coefficient F; first cousins F = 1/16',
          ],
          explanation: `Hardy-Weinberg is a null model: allele frequencies change only when one of its assumptions fails. Each failure is an evolutionary force.

**Selection.** Give each genotype a **relative fitness** *w* (its average contribution of offspring relative to the best genotype). After selection, the frequency of *a* becomes

$$q' = \\frac{pq\\,w_{Aa} + q^2 w_{aa}}{\\bar w}, \\qquad \\bar w = p^2 w_{AA} + 2pq\\,w_{Aa} + q^2 w_{aa}.$$

Against a recessive lethal ($w_{aa} = 0$, others 1) this simplifies to $q' = q/(1 + q)$, so after *t* generations $q_t = q_0/(1 + t q_0)$. Halving from $q = 0.02$ to $0.01$ takes $1/0.01 - 1/0.02 = 50$ generations, over a thousand years in humans, because almost all copies of a rare recessive allele hide in heterozygotes, where selection cannot see them.

**Heterozygote advantage** keeps both alleles. Where malaria is common, *HbA/HbS* heterozygotes are more resistant than *HbA/HbA* people, and *HbS/HbS* people have sickle cell disease. With fitnesses $1 - s$, $1$, $1 - t$ for *AA*, *Aa*, *aa*, the equilibrium is $\\hat q = s/(s + t)$. For $s = 0.1$ and $t = 0.8$, $\\hat q = 0.11$, similar to the HbS frequencies seen in parts of Africa.

**Mutation** adds alleles slowly (rates around 10⁻⁵ to 10⁻⁸ per gene per generation). Against selection it reaches a **mutation-selection balance**: for a recessive harmful allele, $\\hat q \\approx \\sqrt{\\mu / s}$; with $\\mu = 10^{-6}$ and $s = 1$, $\\hat q = 0.001$.

**Migration** (gene flow) moves frequencies towards the migrants': $\\Delta p = m(p_m - p)$, where *m* is the fraction of each generation that are migrants. It makes populations more alike.

**Random genetic drift.** In a finite population, the gametes that form the next generation are a random sample, so frequencies wander by chance. Eventually each allele is either **fixed** or **lost**. For a neutral allele the probability of fixation equals its current frequency, so a new mutation in a diploid population of *N* has a fixation probability of $1/(2N)$. Heterozygosity decays as $H_t = H_0 (1 - \\tfrac{1}{2N})^t$: with $N = 50$, about 37 % is left after 100 generations. What matters is the **effective population size** $N_e$, usually smaller than the census size; with $N_m$ breeding males and $N_f$ females, $N_e = 4 N_m N_f / (N_m + N_f)$. **Founder effects** and **bottlenecks** are drift in a few generations of small size; they explain why some diseases are common in particular communities.

\`\`\`interactive
gen-hardy-weinberg
{"mode": "simulate", "p": 0.5, "N": 50, "generations": 100, "replicates": 12, "caption": "Twelve replicate populations of 50, starting at p = 0.5, with no selection. Watch them drift apart and fix or lose A at random while the deterministic line stays flat. Raise N to 1000: drift slows. Then set waa = 0 (a recessive lethal) with N large and see how slowly q falls once it is rare; finally try wAA = 0.9, waa = 0.2 and watch the populations converge on q ≈ 0.11."}
\`\`\`

**Inbreeding** (mating between relatives) does not change allele frequencies but increases **homozygosity**. The **inbreeding coefficient** *F* is the probability that two alleles at a locus are identical by descent; genotype frequencies become $p^2 + Fpq$, $2pq(1 - F)$, $q^2 + Fpq$. The child of first cousins has $F = 1/16$, which is why consanguinity raises the risk of recessive disease.

Common errors: thinking selection removes recessive alleles quickly, confusing drift (random) with selection (directional), and saying inbreeding changes allele frequencies. Read OpenStax 19.2 and 19.3.`,
          resources: [
            ostx('19-2-population-genetics', '19.2 Population genetics', 'Selection, drift, gene flow and mutation.', true),
            ostx('19-3-adaptive-evolution', '19.3 Adaptive evolution', 'Kinds of selection and heterozygote advantage.'),
            learn('evolution/', 'Evolution: DNA and the unity of life', 'Background on how these forces shape genomes.'),
          ],
          exercises: [
            {
              slug: 'selection-calcs',
              title: 'Selection by the numbers',
              prompt: `(a) A recessive lethal allele has frequency 0.10. Compute its frequency after 1, 10 and 100 generations of selection, and how many generations it takes to reach 0.01. (b) For heterozygote advantage with fitnesses 0.85 (AA), 1 (Aa) and 0.30 (aa), compute the equilibrium frequency of *a*. (c) Simulate both in the Hardy-Weinberg interactive (with large N) and compare with your numbers. (d) Explain why eugenic programmes to "remove" recessive alleles by preventing affected people from reproducing would barely change their frequency.`,
              kind: 'problem',
              difficulty: 2,
              hint: '(a) q_t = 0.1/(1 + 0.1t): 0.0909, 0.05, 0.00909; reaching 0.01 needs t = 1/0.01 − 1/0.1 = 90 generations. (b) s = 0.15, t = 0.70: q̂ = 0.15/0.85 ≈ 0.176.',
            },
            {
              slug: 'drift-calcs',
              title: 'Drift and effective size',
              prompt: `(a) A population of 200 has 30 breeding males and 170 breeding females. Compute Nₑ. (b) What is the probability that a new neutral mutation in this population is eventually fixed, using Nₑ? (c) Starting at heterozygosity 0.5, what heterozygosity remains after 50 generations at this Nₑ? (d) A founder population of 10 people carries one copy of a rare recessive allele. What is its frequency, and why might it become much more common than in the source population? Use the simulate interactive to explore (d).`,
              kind: 'problem',
              difficulty: 2,
              hint: '(a) Nₑ = 4 × 30 × 170 / 200 = 102. (b) 1/(2 × 102) ≈ 0.0049. (c) 0.5 × (1 − 1/204)⁵⁰ ≈ 0.39. (d) 1/20 = 0.05.',
            },
            {
              slug: 'inbreeding-risk',
              title: 'Inbreeding and recessive disease',
              prompt: `A recessive disease allele has frequency 0.005. (a) What is the incidence among children of unrelated parents? (b) Among children of first cousins (F = 1/16)? (c) By what factor does first-cousin marriage raise the risk? (d) Repeat for q = 0.05 and explain why the relative increase is larger for rarer alleles. (e) Explain why inbreeding does not change the allele frequency itself.`,
              kind: 'problem',
              difficulty: 2,
              hint: '(a) q² = 2.5 × 10⁻⁵. (b) q² + Fpq = 2.5 × 10⁻⁵ + (1/16)(0.995)(0.005) ≈ 3.36 × 10⁻⁴. (c) about 13-fold. (d) q = 0.05: 0.0025 versus 0.0055, about 2.2-fold.',
            },
          ],
          selfAssessment: [
            {
              question: 'Why is selection against a rare recessive allele so slow?',
              answerOutline: 'Most copies are in heterozygotes, which have normal fitness; only the rare aa homozygotes (q²) are selected against, so the change per generation is roughly proportional to q².',
            },
            {
              question: 'What is the probability that a new neutral mutation is eventually fixed, and why?',
              answerOutline: '1/(2N): under drift, each of the 2N gene copies in the population is equally likely to become the ancestor of all copies in the future, and the mutation is one of them.',
            },
            {
              question: 'How does inbreeding differ from drift in its effects?',
              answerOutline: 'Inbreeding redistributes alleles into homozygotes without changing allele frequencies; drift changes allele frequencies at random, leading to fixation or loss, and also reduces heterozygosity.',
            },
          ],
          quiz: [
            {
              question: 'Genotype fitnesses are *AA* 0.9, *Aa* 1.0 and *aa* 0.2. What is the equilibrium frequency of *a*?',
              options: ['$0.11$', '$0.20$', '$0.89$', '$0.50$'],
              answer: 0,
              explanation:
                'With $s = 0.1$ against *AA* and $t = 0.8$ against *aa*, $\\hat q = s/(s+t) = 0.1/0.9 = 0.11$. 0.89 is the equilibrium frequency of *A*.',
            },
            {
              question: 'A new neutral mutation arises in a diploid population with effective size 500. What is the probability that it eventually becomes fixed?',
              options: ['$\\tfrac{1}{500}$', '0, because neutral alleles are never fixed', '$\\tfrac{1}{2}$', '$\\tfrac{1}{1000}$'],
              answer: 3,
              explanation:
                'Its initial frequency is $1/(2N) = 1/1000$, and for a neutral allele the fixation probability equals the current frequency. $\\tfrac{1}{500}$ forgets that each individual carries two copies.',
            },
            {
              question: 'A population of plants starts self-fertilising. Over several generations, what happens if there is no selection?',
              options: [
                'Allele frequencies change towards 0.5',
                'The recessive allele is lost',
                'Homozygote frequencies rise and heterozygotes fall, while allele frequencies stay the same',
                'Heterozygotes increase',
              ],
              answer: 2,
              explanation:
                'Each generation of selfing halves the heterozygotes and moves them into the two homozygote classes equally, so allele frequencies are unchanged. Allele frequencies change by selection, drift, mutation or migration, not by inbreeding alone.',
            },
            {
              question: 'A breeding population has 20 males and 80 females. What is its effective size?',
              options: ['100', '64', '50', '40'],
              answer: 1,
              explanation:
                '$N_e = 4 N_m N_f / (N_m + N_f) = 4 \\times 20 \\times 80 / 100 = 64$. The census count of 100 overstates the size that governs drift, because the few males contribute half of every offspring\'s genes.',
            },
          ],
        },
        {
          slug: 'quantitative-genetics-and-heritability',
          title: 'Quantitative traits, heritability and the response to selection',
          summary:
            'How many Mendelian genes plus environment produce continuous variation, how variance is partitioned into genetic and environmental parts, how heritability is estimated from relatives and twins, how the breeder\'s equation predicts the response to selection, and what heritability does not mean.',
          estimatedMinutes: 100,
          objectives: [
            'Explain how several additive genes and environmental variation produce a continuous, roughly normal distribution',
            'Estimate the number of genes from the frequency of extreme phenotypes in an F₂',
            'Partition phenotypic variance into genetic (additive, dominance, epistatic) and environmental components and define broad- and narrow-sense heritability',
            'Estimate heritability from parent-offspring regression and from twin correlations',
            'Predict the response to selection with $R = h^2 S$, and state correctly what heritability does and does not mean',
          ],
          concepts: [
            'Polygenic inheritance (Nilsson-Ehle wheat colour)',
            'Extreme classes $(1/4)^n$ of an F₂',
            '$V_P = V_G + V_E$; $V_G = V_A + V_D + V_I$',
            'Broad-sense $H^2 = V_G/V_P$; narrow-sense $h^2 = V_A/V_P$',
            'Offspring-midparent regression slope = $h^2$',
            'Twin studies: $h^2 \\approx 2(r_{MZ} - r_{DZ})$',
            'Breeder\'s equation $R = h^2 S$',
            'Heritability is population- and environment-specific',
          ],
          explanation: `Height, weight, yield and blood pressure vary continuously, yet they are inherited through Mendelian genes. Herman Nilsson-Ehle showed how in 1909 with wheat kernel colour. Crossing dark red with white gave an intermediate F₁, and the F₂ contained five shades in the ratio 1 : 4 : 6 : 4 : 1. That is what two genes with **additive** alleles predict: each "red" allele adds the same amount of colour, and the number of red alleles among four in an F₂ plant follows a binomial distribution. With *n* such genes there are $2n + 1$ classes, and each extreme class makes up $(\\tfrac14)^n$ of the F₂; if 1 plant in 256 is as extreme as a parent, $n = 4$. Add environmental variation, which blurs the classes, and the distribution becomes a smooth bell curve: the resolution of the old conflict between Mendelians and biometricians (Fisher, 1918).

**Partitioning variance.** For a quantitative trait, the phenotypic variance in a population is $V_P = V_G + V_E$ (genetic plus environmental, assuming no gene-environment interaction or correlation). The genetic part splits further into **additive** variance $V_A$ (the effects of alleles summed), **dominance** $V_D$ and **interaction** (epistatic) $V_I$. Two heritabilities follow:
- **Broad-sense** $H^2 = V_G / V_P$: how much of the variation is due to genotype at all.
- **Narrow-sense** $h^2 = V_A / V_P$: the part passed predictably from parents to offspring, which determines resemblance between relatives and the response to selection.

**Estimating it.** Regress offspring phenotype on the **mean of the two parents** (midparent): the slope estimates $h^2$ (on a single parent, the slope is $h^2/2$). **Twin studies** compare identical (monozygotic, MZ) twins, who share all their genes, with fraternal (DZ) twins, who share half on average: Falconer's approximation is $h^2 \\approx 2(r_{MZ} - r_{DZ})$. If $r_{MZ} = 0.86$ and $r_{DZ} = 0.47$ for height, $h^2 \\approx 0.78$. Twin estimates assume MZ and DZ twins share environments equally, which is debated.

**Response to selection.** Breeders select parents with a mean phenotype above the population mean by the **selection differential** *S*. The offspring mean shifts by the **response**

$$R = h^2 S.$$

If milk yield has $h^2 = 0.3$, the herd averages 8000 kg and the selected parents average 9000 kg, the next generation should average $8000 + 0.3 \\times 1000 = 8300$ kg.

**What heritability is not.** It describes the **population and environment** it was measured in, not an individual: "80 % heritable" does not mean 80 % of your height comes from genes. It changes when environments change: make the environment uniform and $h^2$ rises. It says nothing about **differences between groups**: plant two random samples of seed from one variety in rich and poor soil, and the difference between the plots is wholly environmental even though $h^2$ within each plot is high. And low heritability does not mean "not genetic": the number of fingers is genetically programmed, yet its heritability is near zero because almost all the variation that exists (accidents) is environmental. Genes for quantitative traits are located by **QTL mapping** in crosses and by GWAS (module 8). Read Online Open Genetics chapter 10.`,
          resources: [
            oog('10%3A__Molecular_Markers_and_Quantitative_Traits', 'Chapter 10, Molecular markers and quantitative traits', 'Polygenic traits, heritability and QTL mapping.'),
            griffiths('Chapter 20, Quantitative genetics, covers norms of reaction, heritability and its misinterpretations with real data. NCBI blocks automated access, so open it in a browser.'),
            mit703('pages/lecture-notes/', 'Lecture notes', 'The final lectures on complex traits and human genetics.'),
          ],
          relatedLessons: ['probability-statistics/hypothesis-testing-and-regression/linear-regression-and-least-squares'],
          exercises: [
            {
              slug: 'polygenic-counts',
              title: 'How many genes?',
              prompt: `Two true-breeding lines of a plant are 10 cm and 26 cm tall. The F₁ averages 18 cm. In an F₂ of 1,000 plants, about 4 are as short as the short parent and about 4 as tall as the tall parent. Assuming additive genes of equal effect and no environmental variation: (a) how many genes are segregating? (b) How much does each "tall" allele add? (c) How many height classes should the F₂ show, and what fraction should be 18 cm? (d) Why does environmental variation make the real distribution continuous?`,
              kind: 'problem',
              difficulty: 2,
              hint: '(a) 4/1000 ≈ 1/256 = (1/4)⁴, so 4 genes. (b) 16 cm over 8 alleles: 2 cm each. (c) 9 classes; 18 cm needs exactly 4 tall alleles out of 8: C(8,4)/256 = 70/256 ≈ 0.27.',
            },
            {
              slug: 'heritability-estimates',
              title: 'Estimate heritability three ways',
              prompt: `(a) For a trait in a population, V_P = 50 units², and in a genetically uniform inbred line raised in the same environment the variance is 20 units². Estimate V_E, V_G and H². (b) Regression of offspring on midparent gives slope 0.42. What is h²? What would the slope on one parent be? (c) Twin correlations for a behavioural trait are r_MZ = 0.60 and r_DZ = 0.35. Estimate h², and say which assumption makes this estimate suspect. (d) A breeder selects parents 12 units above the mean for the trait in (b). Predict the response.`,
              kind: 'problem',
              difficulty: 2,
              hint: '(a) V_E ≈ 20 (all variation in the inbred line is environmental), V_G = 30, H² = 0.6. (b) h² = 0.42; single parent 0.21. (c) 2 × 0.25 = 0.50. (d) R = 0.42 × 12 ≈ 5.0 units.',
            },
            {
              slug: 'heritability-misuse',
              title: 'What heritability does not mean',
              prompt: `In about 300 words, explain to a non-scientist why each statement is wrong: (a) "Height is 80 % heritable, so 80 % of my height is due to my genes." (b) "IQ scores are heritable within groups, so differences in average scores between groups must be genetic." (c) "A trait with heritability near zero cannot be genetic." Use Lewontin's seed-in-two-soils example for (b) and the number of fingers for (c).`,
              kind: 'writing',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'How can Mendelian genes produce a continuous distribution?',
              answerOutline: 'Several genes with additive alleles give many genotype classes in binomial proportions, and environmental variation blurs the classes into a smooth curve.',
            },
            {
              question: 'What is the difference between broad- and narrow-sense heritability, and which predicts the response to selection?',
              answerOutline: 'H² = V_G/V_P includes all genetic variance; h² = V_A/V_P includes only additive variance. Narrow-sense h² predicts resemblance between parents and offspring and the response to selection (R = h²S).',
            },
            {
              question: 'Why does a high heritability within two groups say nothing about the cause of a difference between them?',
              answerOutline: 'Heritability is a ratio of variances within a population and environment. A between-group difference can be entirely environmental (different soils) even when variation within each group is mostly genetic.',
            },
          ],
          quiz: [
            {
              question: 'A trait has $h^2 = 0.3$. The population mean is 50 and the selected parents average 60. What is the expected mean of their offspring?',
              options: ['53', '60', '56', '51.8'],
              answer: 0,
              explanation:
                '$S = 60 - 50 = 10$, $R = h^2 S = 0.3 \\times 10 = 3$, so the offspring mean is 53. Expecting 60 assumes heritability is 1; only the additive genetic part of the parents\' superiority is passed on.',
            },
            {
              question: 'For a trait, identical twins correlate at 0.8 and fraternal twins at 0.5. What is Falconer\'s estimate of heritability?',
              options: ['$0.6$', '$0.3$', '$0.8$', '$1.6$'],
              answer: 0,
              explanation:
                '$h^2 \\approx 2(r_{MZ} - r_{DZ}) = 2 \\times 0.3 = 0.6$. 0.3 forgets the factor of 2 (DZ twins share half as many genes as MZ twins, so the difference reflects half the genetic variance).',
            },
            {
              question: 'Which statement about heritability is correct?',
              options: [
                'A heritability of 0.8 means 80 % of each person\'s phenotype is caused by genes',
                'Heritability measures how much of the variation in a particular population and environment is due to genetic differences',
                'If a trait has high heritability, differences between populations must be genetic',
                'Traits that are genetically determined always have high heritability',
              ],
              answer: 1,
              explanation:
                'Heritability is a property of variation in a population and environment, not of individuals or of differences between groups. The number of fingers is genetically programmed but has near-zero heritability.',
            },
            {
              question: 'In an F₂, about 1 plant in 256 is as extreme as one of the true-breeding parents. Assuming additive genes of equal effect, how many genes are segregating?',
              options: ['2', '16', '8', '4'],
              answer: 3,
              explanation:
                'Each extreme class has frequency $(\\tfrac14)^n$; $(\\tfrac14)^4 = \\tfrac{1}{256}$, so $n = 4$. Eight counts alleles rather than genes.',
            },
          ],
        },
      ],
      project: {
        slug: 'drift-selection-and-theory',
        title: 'Drift, selection and theory',
        description: `Use the Hardy-Weinberg simulation interactive as a laboratory, and test the formulas of this module against it. Run and record at least five experiments with enough replicates to estimate probabilities: (1) neutral drift at N = 20, 100 and 500 starting from p = 0.1, recording the fraction of replicates in which *A* is fixed (compare with p) and the mean time to fixation or loss; (2) loss of heterozygosity over 50 generations at N = 50 against $(1 - 1/2N)^t$; (3) selection against a recessive lethal from q = 0.2 with large N, against $q_t = q_0/(1 + t q_0)$; (4) heterozygote advantage with two different fitness sets, against $\\hat q = s/(s + t)$, at large and small N; (5) one experiment of your own design combining migration or mutation with drift. For each, state the prediction before you run it, present the data in a table and plot, and explain discrepancies. Finish with a page relating one experiment to a real human example (a founder effect, sickle cell and malaria, or lactase persistence) with sources.`,
        deliverables: [
          'A lab notebook of five experiments: prediction, settings, data, plot and comparison with theory',
          'A one-page discussion of where finite N makes the deterministic formulas fail',
          'A one-page real-world case study with at least two sources',
        ],
        estimatedHours: 3,
        stretchGoals: ['Repeat experiment 1 with a spreadsheet Wright-Fisher simulation of your own (binomial sampling each generation) and compare with the widget'],
      },
    },
  ],
  capstone: {
    slug: 'genetic-dossier',
    title: 'A genetic dossier on one inherited condition',
    description: `Choose one well-studied inherited condition and follow it through every level of the course, using public databases and the primary literature. Good choices are cystic fibrosis (*CFTR*), sickle cell disease (*HBB*), Huntington disease (*HTT*), Duchenne muscular dystrophy (*DMD*), haemophilia A (*F8*), phenylketonuria (*PAH*) or Leber hereditary optic neuropathy (mitochondrial *MT-ND4* and others). The result is a technical report a curious non-geneticist could follow.

1. **The gene.** In the UCSC Genome Browser or Ensembl, give the chromosome, band, coordinates, size, number of exons and introns, the mature mRNA and protein lengths, and the gene's neighbours. Explain what the protein does.
2. **The alleles.** From ClinVar, tabulate the pathogenic variants by class (missense, nonsense, frameshift, splice site, deletions or repeat expansions) and explain how each class damages the protein, using the genetic code. Say whether the disease alleles are loss-of-function or gain-of-function, and why that makes the condition dominant or recessive.
3. **Inheritance.** Draw a realistic three-generation pedigree for a family with the condition, state the mode of inheritance with the evidence a pedigree would show, and compute three risks: a child of two carriers, a child of an unaffected sibling of an affected person and a partner from the general population, and one Bayesian risk that uses information about unaffected children.
4. **Populations.** From gnomAD, find the frequency of the commonest pathogenic allele in at least three ancestry groups, compute the expected carrier frequency and incidence under Hardy-Weinberg, and compare with published incidence. Discuss founder effects or heterozygote advantage if relevant.
5. **History of discovery.** Explain how the gene was found (linkage to markers and LOD scores, positional cloning, chromosome rearrangements in patients) and what model organisms or mutants contributed.
6. **Technology and therapy.** Describe how the condition is diagnosed (PCR, sequencing, carrier screening), and one current or experimental therapy that works at the level of genes or their expression (gene therapy, CRISPR editing, antisense oligonucleotides, small molecules such as CFTR modulators). End with a short section on one ethical question the condition raises.

No programming is needed; a spreadsheet is enough for the calculations.`,
    deliverables: [
      'A 3,000 to 4,500 word report with the six sections above and a one-page summary for non-specialists',
      'A gene diagram (exons, introns, the main variants) and a pedigree drawn with standard symbols',
      'A calculation appendix with every risk and Hardy-Weinberg estimate worked step by step',
      'A sources appendix with database accession numbers (gene, transcript, ClinVar variation IDs, gnomAD versions) and papers',
    ],
    estimatedHours: 8,
    stretchGoals: [
      'Compare the human condition with a mouse or other model organism mutant of the same gene: what does the model reproduce and what does it miss?',
      'Look up a GWAS or modifier-gene study for the condition and explain why patients with the same genotype differ in severity',
    ],
  },
  masteryChecklist: [
    'I can explain the experiments that showed DNA is the genetic material and that it replicates semiconservatively',
    'I can transcribe and translate a sequence, find its reading frame, and predict the effect of any point mutation or indel',
    'I can explain how mutations arise, how they are detected and how cells repair DNA damage',
    'I can predict lac and trp operon expression for any genotype, including partial diploids, and explain cis and trans effects',
    'I can explain how eukaryotic genes are regulated by transcription factors, chromatin and epigenetic marks, including imprinting and X inactivation',
    'I can follow chromosomes through mitosis and meiosis and predict the gametes produced by nondisjunction, inversions and translocations',
    'I can derive genotype and phenotype ratios for crosses of one to three genes, including modified epistatic ratios, lethal alleles and sex linkage',
    'I can test a genetic hypothesis with a chi-square goodness-of-fit test with the right degrees of freedom',
    'I can read a pedigree to its mode of inheritance and compute carrier and recurrence risks, including Bayesian ones',
    'I can build a genetic map from two- and three-point crosses, bacterial crosses and complementation data, and explain interference and the 50 % limit',
    'I can explain PCR, sequencing, CRISPR editing and GWAS, and use OMIM, ClinVar, gnomAD and a genome browser',
    'I can use Hardy-Weinberg, selection, drift and heritability correctly, and say when each assumption fails',
  ],
});
