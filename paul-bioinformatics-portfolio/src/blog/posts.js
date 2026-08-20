// Blog post data store.
//
// Only add an entry here once the article is fully written — publishing a
// route with thin/placeholder content hurts SEO more than not having the
// route at all. Use `plannedTopics` below to track the pipeline instead.

export const posts = [
  {
    slug: "kmer-spacing-comparing-bacterial-genomes",
    title: "How K-mer Spacing Can Be Used to Compare Bacterial Genomes",
    description:
      "A practical look at using k-mer spacing to build genomic distance matrices and compare closely related bacterial genomes without sequence alignment.",
    date: "2026-07-08",
    author: "Paul Alemoh",
    topic: "Computational Genomics",
    readingTime: "8 min read",
    coverAlt: "Distance matrix and cluster diagram representing bacterial genomes compared through k-mer spacing patterns",
    content: [
      { type: "p", text: "In the last article, I compared k-mer frequency and k-mer spacing as two ways of representing a genome. Frequency asks how often a pattern occurs. Spacing asks where it occurs relative to itself. This time I want to walk through what happens when you actually put k-mer spacing to work on real bacterial genomes." },
      { type: "h2", text: "Starting with a simple goal" },
      { type: "p", text: "Suppose you have a collection of bacterial genome assemblies and you want to know which ones are most closely related to each other, without running a full alignment across every pair. That is the exact situation alignment-free methods were built for, and it is the situation I keep coming back to in my work on KALI." },
      { type: "p", text: "The general approach looks like this. For every genome, extract all k-mers of a chosen length. For every k-mer, record the positions where it occurs. From those positions, compute the spacing, meaning the distances between consecutive occurrences. Summarize that spacing information into a fixed-length numerical representation for the genome." },
      { type: "p", text: "Once every genome has been reduced to a representation of the same shape, you can compare any two genomes using a distance measure, and repeat that comparison across every pair in the collection." },
      { type: "h2", text: "From pairwise distances to a distance matrix" },
      { type: "p", text: "If you compare every genome in a collection to every other genome, the natural output is a distance matrix: a table where each row and column is a genome, and each cell holds a number describing how different two genomes are according to their k-mer spacing profiles." },
      { type: "code", text: "        G1     G2     G3     G4\nG1      0.00   0.12   0.41   0.38\nG2      0.12   0.00   0.44   0.40\nG3      0.41   0.44   0.00   0.09\nG4      0.38   0.40   0.09   0.00" },
      { type: "p", text: "A matrix like this is small enough to read by eye, and already tells a story. G1 and G2 are close to each other. G3 and G4 are close to each other. G1/G2 and G3/G4 look like two separate groups. With real bacterial genome collections the matrices are much larger, but the interpretation works the same way: small distances suggest closely related genomes, large distances suggest more distant ones." },
      { type: "h2", text: "What the matrix lets you do next" },
      { type: "p", text: "A distance matrix on its own is useful for quick similarity screening, but it also feeds directly into other analyses. Clustering algorithms can group genomes based on the matrix without needing the original sequences again. Hierarchical clustering can turn the matrix into a tree-like structure showing nested relationships. And because the whole process avoids alignment, it scales to collections that would be slow or impractical to align pairwise." },
      { type: "p", text: "That scalability is the main practical argument for alignment-free approaches. Aligning every pair of genomes in a large bacterial collection can become the bottleneck of an entire analysis. Reducing each genome to a spacing-based vector first, and comparing vectors instead of raw sequences, shifts a lot of that computational cost to something that grows far more manageably." },
      { type: "h2", text: "Where spacing earns its keep" },
      { type: "p", text: "Frequency-based k-mer comparison already does reasonably well at separating genomes that are broadly different. Where spacing tends to add value is in distinguishing genomes that are closely related, where k-mer content looks similar but the internal organization of the genome has still diverged. Two nearly identical strains can share almost all the same k-mers, while differing measurably in how those k-mers are distributed across the sequence." },
      { type: "p", text: "That is a useful property for bacterial genomics specifically, where the questions people care about are often about strain-level differences within a species, not just species-level differences between distant organisms." },
      { type: "h2", text: "What this looks like inside KALI" },
      { type: "p", text: "This is the workflow KALI is built around: take a set of FASTA files, extract k-mer spacing profiles for each genome, compute pairwise distances, and produce a distance matrix that downstream steps can use for clustering or phylogenetic tree construction. None of the individual steps are exotic on their own, but chaining them together into something reliable and reasonably fast is most of the actual engineering work." },
      { type: "p", text: "In the next article, I want to move from the method to the tool itself, and talk through how KALI is structured as a piece of software, not just as an algorithm." },
    ],
    seo: {
      metaTitle: "How K-mer Spacing Can Be Used to Compare Bacterial Genomes | Paul Alemoh",
      metaDescription:
        "See how k-mer spacing profiles are turned into genomic distance matrices for alignment-free comparison and clustering of bacterial genomes.",
      canonical: "https://poalemoh.dev/blog/kmer-spacing-comparing-bacterial-genomes",
    },
  },
  {
    slug: "kmer-frequency-vs-kmer-spacing",
    title: "K-mer Frequency vs. K-mer Spacing",
    description:
      "Comparing two ways of representing a genome as numbers: counting how often k-mers appear versus measuring how they're spaced, and what each approach captures.",
    date: "2026-05-14",
    author: "Paul Alemoh",
    topic: "Computational Genomics",
    readingTime: "7 min read",
    coverAlt: "Side-by-side diagram contrasting k-mer frequency counts with k-mer spacing intervals along a DNA sequence",
    content: [
      { type: "p", text: "Once you accept that a genome can be broken into k-mers, the next question is what to do with them. There isn't just one answer. Two of the most common representations are k-mer frequency and k-mer spacing, and while they start from the same building block, they describe very different aspects of a sequence." },
      { type: "h2", text: "Frequency: how often does each k-mer appear?" },
      { type: "p", text: "K-mer frequency is the more familiar approach. You slide a window of length k across the sequence, count how many times each possible k-mer occurs, and end up with a vector of counts. Two sequences with similar biological content tend to produce similar frequency vectors, and you can compare genomes by comparing these vectors directly." },
      { type: "p", text: "This works well and it's fast, which is part of why it's the default starting point for alignment-free comparison. But frequency alone treats a genome as a bag of pieces. It tells you what is present and how much of it, without saying anything about where those pieces sit relative to one another." },
      { type: "h2", text: "Spacing: where does each k-mer appear?" },
      { type: "p", text: "K-mer spacing takes a different angle. Instead of just counting occurrences, you record the positions where a given k-mer appears in the sequence, and then measure the distances between consecutive occurrences." },
      { type: "p", text: "Consider a k-mer that appears at positions 10, 45, and 90 in one genome, and at positions 10, 20, and 30 in a different genome. Both genomes contain that k-mer exactly three times, so a frequency-based comparison would treat them as identical on this feature. But the spacing tells a different story: in the first genome the occurrences are spread out, and in the second they're clustered close together. That's a structural difference frequency alone cannot see." },
      { type: "code", text: "Genome A positions: 10, 45, 90  ->  gaps: 35, 45\nGenome B positions: 10, 20, 30  ->  gaps: 10, 10" },
      { type: "h2", text: "Same count, different structure" },
      { type: "p", text: "This is really the core distinction. Frequency answers \"how much,\" spacing answers \"how arranged.\" Genomes can be identical on the first question while diverging on the second, particularly for closely related genomes where overall composition has stayed similar but internal organization has shifted through rearrangement, insertion, or deletion events." },
      { type: "p", text: "That matters most in exactly the cases that are hardest for frequency-based methods: distinguishing strains or genomes that are so similar in composition that their frequency vectors are nearly indistinguishable." },
      { type: "h2", text: "Trade-offs worth being honest about" },
      { type: "p", text: "Spacing isn't automatically better, and it comes with real costs. Frequency vectors are simple to compute and compact to store. Spacing requires tracking positions for every k-mer, which is more memory-intensive, and turning a list of gaps into a fixed-length numerical summary requires some design decisions of its own, like whether to use the mean gap, the distribution of gaps, or something else entirely." },
      { type: "p", text: "There's also the question of how much of the extra signal spacing captures actually turns out to be biologically meaningful, as opposed to noise from how an assembly happened to be constructed. That's an open question I keep testing against, rather than something I'd claim to have fully settled." },
      { type: "h2", text: "Why I'm building with both" },
      { type: "p", text: "In KALI, I've kept both representations available rather than picking one and discarding the other. Frequency vectors are cheap and give a solid baseline for broad comparisons. Spacing profiles cost more to compute but add resolution in exactly the cases where frequency alone tends to flatten real differences between genomes." },
      { type: "p", text: "In the next article, I'll walk through what this looks like in practice: taking spacing profiles and using them to build an actual distance matrix across a set of bacterial genomes, and what that comparison reveals." },
    ],
    seo: {
      metaTitle: "K-mer Frequency vs. K-mer Spacing | Paul Alemoh",
      metaDescription:
        "K-mer frequency counts occurrences; k-mer spacing measures how those occurrences are distributed. A comparison of what each representation captures.",
      canonical: "https://poalemoh.dev/blog/kmer-frequency-vs-kmer-spacing",
    },
  },
  {
    slug: "alignment-based-vs-alignment-free-genome-analysis",
    title: "Alignment-Based vs. Alignment-Free Genome Analysis",
    description:
      "A comparison of traditional alignment-based genome analysis and newer alignment-free methods, and when each approach makes sense.",
    date: "2026-04-10",
    author: "Paul Alemoh",
    topic: "Computational Genomics",
    readingTime: "7 min read",
    coverAlt: "Split illustration contrasting aligned DNA sequences on one side with k-mer based genome comparison on the other",
    content: [
      { type: "p", text: "Most introductions to genome comparison start with alignment, and for good reason: it's intuitive, it's well established, and tools like BLAST have made it accessible for decades. But alignment isn't the only option anymore, and it's worth being clear-eyed about what each approach is actually good at." },
      { type: "h2", text: "What alignment-based analysis does" },
      { type: "p", text: "Alignment-based methods work by lining up two or more sequences base by base, inserting gaps where needed, to find the arrangement that best explains their similarity. The output is a direct, position-by-position mapping between sequences, which is exactly what you want when the question is specific: which bases differ at this exact location, or where did this particular mutation occur." },
      { type: "p", text: "That precision comes at a computational cost. Alignment scales poorly as sequences get longer and as the number of sequences being compared grows. Comparing every pair in a large collection of bacterial genomes with full alignment can become slow enough that it stops being practical, especially during early, exploratory stages of an analysis." },
      { type: "h2", text: "What alignment-free analysis does instead" },
      { type: "p", text: "Alignment-free methods sidestep the base-by-base mapping entirely. Instead, they extract features from a sequence, most commonly k-mer counts or k-mer spacing patterns, and represent the whole sequence as a fixed-length numerical summary. Comparing two genomes then becomes a matter of comparing two vectors of numbers, which is dramatically faster than aligning the underlying sequences." },
      { type: "p", text: "The trade-off is precision. An alignment-free comparison can tell you that two genomes are similar or different, and roughly how much, but it won't tell you which specific base differs at which specific position. You lose the fine-grained mapping in exchange for speed and scalability." },
      { type: "h2", text: "Two different questions, not two competing answers" },
      { type: "p", text: "I've found it more useful to think of these as suited to different questions rather than as competitors. If the question is \"where exactly do these two sequences differ,\" alignment is the right tool, and there isn't really a substitute for it. If the question is \"which of these thousand genomes are most similar to each other,\" alignment-free comparison is often the more practical starting point, precisely because running full alignment across every pair in a large collection isn't realistic." },
      { type: "p", text: "In practice, a lot of real workflows end up using both: alignment-free methods to quickly narrow down a large collection to the genomes worth a closer look, followed by targeted alignment on that smaller set where positional detail actually matters." },
      { type: "h2", text: "Where this fits into KALI" },
      { type: "p", text: "KALI leans on the alignment-free side of this, using k-mer-based representations to compare bacterial genomes and build distance matrices without needing to align every pair first. That's a deliberate choice suited to the kind of exploratory, large-collection comparisons I'm usually working with, not a claim that alignment-free methods make alignment obsolete." },
      { type: "p", text: "In the next article, I want to go one level deeper into the alignment-free side specifically, and compare two of the main ways a genome can be represented as k-mer data: frequency and spacing." },
    ],
    seo: {
      metaTitle: "Alignment-Based vs. Alignment-Free Genome Analysis | Paul Alemoh",
      metaDescription:
        "A comparison of alignment-based and alignment-free genome analysis methods, what each is good at, and when to reach for one over the other.",
      canonical: "https://poalemoh.dev/blog/alignment-based-vs-alignment-free-genome-analysis",
    },
  },
  {
    slug: "why-compare-genomes-without-alignment",
    title: "Why Compare Genomes Without Alignment? My Journey Into K-mer Analysis",
    description:
      "A researcher's introduction to alignment-free genome comparison, why k-mers matter, and how questions about k-mer spacing helped shape my work on KALI.",
    date: "2026-03-16",
    author: "Paul Alemoh",
    topic: "Computational Genomics",
    readingTime: "7 min read",
    coverAlt: "Conceptual illustration of two genomes being compared through k-mer patterns without sequence alignment",
    content: [
      { type: "p", text: "Genomes contain an enormous amount of information. Even a bacterial genome can contain millions of DNA bases, and one of the basic questions in bioinformatics sounds surprisingly simple: How similar are two genomes?" },
      { type: "p", text: "The answer, however, is not always simple." },
      { type: "p", text: "When I started working more deeply with genomic sequence comparison, I was familiar with the traditional idea: if you want to compare sequences, you align them. Tools such as BLAST have made sequence alignment one of the foundations of bioinformatics, and alignment remains extremely valuable." },
      { type: "p", text: "But I became interested in a different question: What if we could measure meaningful similarities between genomes without aligning them first?" },
      { type: "p", text: "That question led me deeper into the world of k-mers and alignment-free sequence analysis." },
      { type: "h2", text: "Starting with something very small" },
      { type: "p", text: "A genome may contain millions of nucleotides, but we can break that enormous sequence into much smaller pieces." },
      { type: "p", text: "Consider this short DNA sequence:" },
      { type: "code", text: "ATGCGAT" },
      { type: "p", text: "If we choose k = 3, we can move across the sequence one base at a time and obtain:" },
      { type: "code", text: "ATG\nTGC\nGCG\nCGA\nGAT" },
      { type: "p", text: "Each of these short sequences is called a k-mer. The k simply represents the length of the sequence. In this example, k equals 3, so we have 3-mers." },
      { type: "p", text: "At first, this may seem almost too simple to be useful. But imagine doing this across an entire bacterial genome. Millions of DNA bases can suddenly be represented as patterns that a computer can count, compare, and analyze." },
      { type: "h2", text: "From DNA sequences to patterns" },
      { type: "p", text: "This is where the idea became particularly interesting to me. If two bacterial genomes are closely related, we would expect them to share many sequence patterns. If they are more distantly related, those patterns should begin to differ." },
      { type: "p", text: "Instead of asking a computer to align every region before making a comparison, we can represent genomes through k-mer characteristics and calculate how similar or different those representations are. This forms part of what we call alignment-free genome comparison." },
      { type: "p", text: "Alignment-free does not mean that sequence alignment is unnecessary or outdated. Alignment answers important biological questions and remains essential in many areas of genomics. Alignment-free methods simply give us another way to examine sequence data, especially when the number of genomes becomes large." },
      { type: "h2", text: "But counting k-mers is not the whole story" },
      { type: "p", text: "As I continued exploring this area, another question became important: What information are we losing when we only count how often a k-mer appears?" },
      { type: "p", text: "Imagine that a particular k-mer occurs 100 times in two different genomes. The frequency is identical. But what if those 100 occurrences are distributed very differently? In one genome, they might appear close together. In another, they might be spread throughout the sequence." },
      { type: "p", text: "The count tells us how many times the pattern occurs. It does not necessarily tell us how those occurrences are distributed. That distinction became an important part of my research." },
      { type: "h2", text: "Looking at the space between k-mers" },
      { type: "p", text: "Instead of examining only k-mer frequency, we can also examine the spacing between occurrences. Suppose a particular k-mer appears at several positions in a genome. We can measure the distance from one occurrence to the next and use those intervals to describe another characteristic of the sequence." },
      { type: "p", text: "Now we have another way to ask whether two genomes are similar. Not simply: Do they contain similar k-mers? But also: Do those k-mers occur in similar spatial patterns?" },
      { type: "p", text: "This idea led me to investigate k-mer spacing as an alignment-free representation for genomic comparison." },
      { type: "h2", text: "From a question to KALI" },
      { type: "p", text: "That exploration eventually became part of the work behind KALI, the genome-analysis framework I have been developing." },
      { type: "p", text: "My interest is not limited to counting k-mers. I want to understand how different representations of genomic sequence, including k-mer occurrence, spacing, and related patterns, can help us compare genomes efficiently while preserving useful information." },
      { type: "p", text: "Questions naturally follow. How does the choice of k affect the result? How much information does k-mer spacing capture? How closely do different alignment-free representations agree? Can these approaches recover meaningful relationships among closely related bacterial genomes? And when should we still prefer traditional alignment-based approaches?" },
      { type: "p", text: "These are the kinds of questions I want to explore on this blog." },
      { type: "h2", text: "Why I am starting this blog" },
      { type: "p", text: "I created this blog to share more than finished results. Research papers usually show the final method, experiment, and conclusion. They rarely show the entire journey behind the work: the questions that started an idea, approaches that did not work as expected, unexpected results, design decisions, or the process of turning an algorithm into working software." },
      { type: "p", text: "I want this space to cover that side too. I will write about bioinformatics, computational genomics, k-mers, alignment-free sequence analysis, antimicrobial resistance, AI in drug discovery, and the tools I am building along the way." },
      { type: "p", text: "Some articles will explain fundamental concepts. Others will go deeper into methods, experiments, and software development. The goal is simple: make the science understandable without removing the science." },
      { type: "p", text: "And k-mers seem like a good place to begin." },
      { type: "h2", text: "Coming next" },
      { type: "p", text: "In the next article, I will answer a deceptively simple question: What exactly is a k-mer, and why has this small piece of DNA become so useful in modern bioinformatics?" },
    ],
    seo: {
      metaTitle: "Why Compare Genomes Without Alignment? My Journey Into K-mer Analysis | Paul Alemoh",
      metaDescription:
        "Explore why alignment-free genome comparison matters, how k-mers and k-mer spacing can represent genomic patterns, and how these questions connect to KALI.",
      canonical: "https://poalemoh.dev/blog/why-compare-genomes-without-alignment",
    },
  },
  {
    slug: "what-are-kmers",
    title: "What Are K-mers? A Simple Introduction to Bioinformatics",
    description:
      "A beginner-friendly explanation of k-mers: what they are, why bioinformaticians use them, how the value of k changes what you see, and how they enable alignment-free genome comparison.",
    date: "2026-03-15",
    author: "Paul Alemoh",
    topic: "Bioinformatics",
    readingTime: "6 min read",
    coverAlt: "Diagram illustrating a DNA sequence broken into overlapping k-mers",
    // Rendered as simple paragraphs/headings in BlogPost.jsx. Kept as an
    // array of typed blocks so it's easy to add images/links later without
    // re-parsing markdown.
    content: [
      { type: "p", text: "If you've spent any time around genome analysis, you've probably run into the term \"k-mer.\" It sounds technical, but the idea behind it is simple, and once it clicks, a lot of modern bioinformatics — including alignment-free genome comparison — starts to make sense." },
      { type: "h2", text: "A k-mer is just a short, fixed-length piece of a sequence" },
      { type: "p", text: "Take a short DNA sequence:" },
      { type: "code", text: "ATCGATCG" },
      { type: "p", text: "A k-mer is a substring of length k taken from that sequence, and you slide along the sequence one letter at a time to get every possible substring of that length. If we choose k = 3, the sequence above breaks down into these overlapping 3-mers:" },
      { type: "code", text: "ATC\nTCG\nCGA\nGAT\nATC\nTCG" },
      { type: "p", text: "Notice that the window moves one base at a time, and that some k-mers repeat (ATC and TCG each appear twice here). That repetition is actually the useful part — it's what lets k-mers describe the composition of a sequence numerically." },
      { type: "h2", text: "Why bother breaking a sequence into pieces at all?" },
      { type: "p", text: "Full genome sequences can be millions or billions of bases long, and comparing two of them base-by-base (alignment) gets computationally expensive fast, especially across large collections of genomes. K-mers offer a shortcut: instead of comparing sequences directly, you count how often each possible k-mer appears in a sequence and turn that into a vector of numbers." },
      { type: "p", text: "Two sequences that share a lot of biological similarity tend to share a lot of the same k-mers in similar proportions. That means you can compare genomes by comparing their k-mer count vectors — which is a much faster, more scalable operation than traditional sequence alignment." },
      { type: "h2", text: "The value of k changes what you're looking at" },
      { type: "p", text: "The choice of k matters a lot, and there isn't one universally \"correct\" value." },
      { type: "p", text: "A small k (like k = 2 or k = 3) produces very few distinct possible k-mers, so counts are dense but not very specific — lots of sequences will share the same short k-mers just by chance. A large k (like k = 21 or k = 31) is far more specific to a particular sequence or organism, but counts become sparser, and the vectors get much larger since the number of possible k-mers grows exponentially with k (4^k for DNA)." },
      { type: "p", text: "In practice, researchers pick k based on what they're trying to resolve: shorter k for broad compositional comparisons, longer k when trying to distinguish closely related strains or species." },
      { type: "h2", text: "This is the foundation of alignment-free genome comparison" },
      { type: "p", text: "Once a genome is represented as a k-mer count vector, you can compare two genomes using standard numerical distance measures — cosine distance is a common choice — without ever aligning the underlying sequences. This is what's meant by \"alignment-free\" genome comparison, and it's especially useful when you're working with large collections of genomes, draft assemblies, or sequences that are too divergent to align cleanly." },
      { type: "p", text: "Alignment-free methods aren't a replacement for alignment in every context, but for tasks like large-scale genome clustering, rapid similarity screening, or building distance matrices across thousands of genomes, they scale in a way that traditional alignment often can't." },
      { type: "h2", text: "Where this leads" },
      { type: "p", text: "K-mer counting is the starting point for a whole family of techniques: building genomic distance matrices, clustering genomes, and constructing phylogenetic relationships without alignment. It's also the core idea behind KALI, a k-mer-based genome analysis pipeline I've been building that turns FASTA files into k-mer feature vectors, computes pairwise distances, and supports downstream clustering and phylogenetic tree construction." },
      { type: "p", text: "In upcoming posts, I'll go deeper into alignment-free comparison methods, the difference between k-mer frequency and k-mer spacing approaches, and how these ideas come together in KALI." },
    ],
    seo: {
      metaTitle: "What Are K-mers? A Simple Introduction to Bioinformatics | Paul Alemoh",
      metaDescription:
        "Learn what k-mers are, why bioinformaticians use them, how the value of k changes the analysis, and how they enable fast, alignment-free genome comparison.",
      canonical: "https://poalemoh.dev/blog/what-are-kmers",
    },
  },
];

// Roadmap of topics from the content plan. These are NOT routes yet —
// they're shown on /blog as "coming soon" so search engines only index
// real, complete pages.
export const plannedTopics = [
  "Building KALI: An Alignment-Free Genome Analysis Tool",
  "What Is a Genomic Distance Matrix and Why Does It Matter?",
  "FastANI vs. K-mer-Based Genome Comparison",
  "How Bioinformatics Can Help Detect Antimicrobial Resistance",
  "Using AlphaFold in an AMR Detection Pipeline",
  "Using AI in Drug Discovery: From Target Identification to Candidate Selection",
];

export function getPostBySlug(slug) {
  return posts.find((p) => p.slug === slug);
}
