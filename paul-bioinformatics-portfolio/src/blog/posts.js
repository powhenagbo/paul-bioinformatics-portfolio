// Blog post data store.
//
// Only add an entry here once the article is fully written — publishing a
// route with thin/placeholder content hurts SEO more than not having the
// route at all. Use `plannedTopics` below to track the pipeline instead.

export const posts = [
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
  "What Is Alignment-Free Genome Comparison?",
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
