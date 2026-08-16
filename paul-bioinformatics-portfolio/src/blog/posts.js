// Blog post data store.
//
// Only add an entry here once the article is fully written — publishing a
// route with thin/placeholder content hurts SEO more than not having the
// route at all. Use `plannedTopics` below to track the pipeline instead.

export const posts = [
  {
    slug: "why-compare-genomes-without-alignment",
    title: "Why Compare Genomes Without Alignment? My Journey Into K-mer Analysis",
    description:
      "A researcher's introduction to alignment-free genome comparison, why k-mers matter, and how questions about k-mer spacing helped shape my work on KALI.",
    date: "2026-08-16",
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
    date: "2026-08-15",
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
  "Alignment-Based vs. Alignment-Free Genome Analysis",
  "K-mer Frequency vs. K-mer Spacing",
  "How K-mer Spacing Can Be Used to Compare Bacterial Genomes",
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
