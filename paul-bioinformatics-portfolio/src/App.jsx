import { useState, useEffect, useRef } from "react";
import emailjs from "@emailjs/browser";
import "./App.css";

const projects = [
  {
    id: 1,
    title: "KALI K-mer Genome Analysis Pipeline",
    category: "Bioinformatics",
    tag: "BINF",
    summary:
      "Alignment-free genome comparison using k-mers, hashing, AI Agent, cosine distance, distance matrices, and phylogenetic tree construction.",
    details:
      "This pipeline processes FASTA files, extracts k-mer features, converts sequences into numerical vectors, calculates cosine distance, and supports phylogenetic tree construction. Benchmarked against 1,000+ viral genomes with 94% clustering accuracy.",
    tools: ["AI","Python", "R","K-mer Analysis", "HPC/Linux"],
    stat: "10000+",
    statLabel: "Genomes analyzed",
  },
  {
    id: 2,
    title: "AI Drug Discovery Platform",
    category: "AI / ML",
    tag: "AI",
    summary:
      "Full-stack computational workflow for target selection, bioactivity processing, ML classification, and 3D protein structure visualization.",
    details:
      "Integrates ChEMBL bioactivity data, OpenAI chat agent, FastAPI backend, PostgreSQL with pgvector, AlphaFold protein viewer (3Dmol.js with pLDDT coloring), Lipinski descriptor calculation, and Random Forest classifiers. Built with React frontend and RESTful API.",
    tools: ["Python", "FastAPI", "RDKit", "AI","PostgreSQL", "pgvector", "AlphaFold", "React", "OpenAI"],
    stat: "94%",
    statLabel: "Model accuracy",
  },
  {
    id: 3,
    title: "PGx Explorer",
    category: "Full Stack",
    tag: "WEB",
    summary:
      "Pharmacogenomics web application for exploring drug-gene relationships, biomarkers, GeneCards, dbSNP, and FDA labeling links.",
    details:
      "A searchable knowledge explorer built with React, Node.js, Express, and MongoDB. Indexes pharmacogenomics literature, drug interaction profiles, and genomic variant associations. Supports deep-link navigation to NCBI, FDA, and GeneCards resources.",
    tools: ["React", "Node.js", "Express", "MongoDB", "REST API", "Tailwind"],
    stat: "500+",
    statLabel: "PGx entries",
  },
  {
    id: 4,
    title: " Phylogenetic Distance Analysis",
    category: "Bioinformatics",
    tag: "BINF",
    summary:
      "K-mer-based pairwise genomic distance matrix analysis for 10000+ genomes with KMeans clustering, PCA, and annotated heatmaps.",
    details:
      "Processed pairwise distance matrices from csv files. Implemented KMeans clustering, PCA dimensionality reduction, seaborn heatmaps with  metadata annotations. Cluster assignments mapped to known phylogenetic groupings.",
    tools: ["Python", "AI Agent", "React", "Scikit-learn", "PCA", "Classifier", "Tensor"],
    stat: "10000+",
    statLabel: "Genomes clustered",
  }
];

const skillCategories = [
  {
    name: "Bioinformatics",
    icon: "🧬",
    skills: [
      { name: "Sequence Analysis", pct: 92 },
      { name: "Phylogenetics", pct: 88 },
      { name: "K-mer Methods", pct: 90 },
      { name: "Genomic Databases", pct: 85 },
    ],
  },
  {
    name: "Programming",
    icon: "💻",
    skills: [
      { name: "Python", pct: 95 },
      { name: "R", pct: 88 },
      { name: "JavaScript/React", pct: 82 },
      { name: "SQL", pct: 80 },
    ],
  },
  {
    name: "Machine Learning",
    icon: "🤖",
    skills: [
      { name: "Scikit-learn", pct: 87 },
      { name: "Feature Engineering", pct: 85 },
      { name: "Model Evaluation", pct: 83 },
      { name: "Deep Learning (basics)", pct: 65 },
    ],
  },
  {
    name: "Infrastructure",
    icon: "🗄️",
    skills: [
      { name: "FastAPI / REST", pct: 84 },
      { name: "MongoDB", pct: 84 },
      { name: "PostgreSQL", pct: 80 },
      { name: "Docker", pct: 72 },
      { name: "Cloud computing", pct: 80 },
      { name: "On-premise", pct: 85 },
      { name: "Linux / HPC", pct: 85 },
    ],
  },
];

const research = [
  {
    year: "2024",
    title: "Enhancing Diphtheria Drug Discovery Through Computational Approaches",
    topic: "Computational Biology",
    desc: "Applied computational methods including molecular docking and ML-based screening to identify potential drug candidates targeting Diphtheria toxin pathways.",
  },
  {
    year: "2024",
    title: "Obesity, Community Health Programs & Endometrial Cancer Detection",
    topic: "Public Health",
    desc: "Explored the impact of obesity and community health interventions on enhancing endometrial cancer detection among low-income and Native American women through a public health lens.",
  },
  {
    year: "2024",
    title: "Prenatal Vitamin Use & Teratogenic Medication Exposure in African American Adolescents",
    topic: "Health Informatics",
    desc: "Investigated the influence of prenatal vitamin use and community health programs on reducing teratogenic medication exposure and improving perinatal nutrition among underserved populations.",
  },
  {
    year: "2023",
    title: "Mathematical Analysis of Hepatitis B Virus Transmission Dynamics",
    topic: "Mathematical Biology",
    desc: "Developed an Atangana-Baleanu Fractional-Order SPQWXY model to analyze HBV transmission dynamics in the absence of therapy, providing insights into disease progression patterns.",
  },
  {
    year: "2023",
    title: "Advocacy and Regulation of Spatial Data Infrastructures for Public Health Policy",
    topic: "Health Policy",
    desc: "Examined frameworks for governing spatial data infrastructures and their role in shaping evidence-based public health policy decisions.",
  },
  {
    year: "2022",
    title: "AI and Machine Learning Governance in Healthcare",
    topic: "AI Ethics",
    desc: "Analyzed governance frameworks for responsible AI and ML deployment in clinical and public health settings, addressing bias, transparency, and regulatory compliance.",
  },
];

const timeline = [
  {
    year: "2026",
    title: " M.S/ P.hd. Bioinformatics Program",
    org: "University of Arkansas at Little Rock",
    type: "education",
    desc: "Built multi-agent FastAPI pipeline integrating AlphaFold, OpenAI, ChEMBL, and pgvector for drug target analysis.",
    grade: "Distinction (Top 10%) 4.0 of 4.0 GPA",
  },
  {
    year: "2025",
    title: "Genomic Clustering Study",
    org: "UALR — Bioinformatics Research",
    type: "research",
    desc: "Analyzed 10000+ genomes using k-mer distance matrices, PCA, and KMeans clustering aligned with known genotype phylogeny.",
  },
  {
    year: "2025",
    title: "KALI Pipeline Development",
    org: "UALR — Bioinformatics Dept.",
    type: "project",
    desc: "Developed alignment-free genome comparison pipeline using k-mer hashing and cosine distance for phylogenetic tree construction, classification, HGT, Tensor, Outbreak detection and Download Genome from NCBI site and also incorporate AGentic AI.",
  },
  
  {
    year: "2024",
    title: " M.Sc  Data Science Program",
    org: "University of East London",
    type: "education",
    desc: "Enrolled in the use of Spatial Data Analysis techniques., data Mining, and machine learning algorithms to extract insights from complex datasets.",
    grade: "Distinction (Top 10%) 3.87 of 4.0 GPA",
  },
];

const stats = [
  { value: 4, label: "Major Projects", suffix: "" },
  { value: 10000, label: "Genomes Processed", suffix: "+" },
  { value: 94, label: "Model Accuracy", suffix: "%" },
  { value: 3, label: "Research Areas", suffix: "" },
];

function useInView(ref, threshold = 0.15) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, threshold]);
  return inView;
}

function AnimatedCounter({ target, suffix, active }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    const duration = 1500;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [active, target]);
  return <>{count.toLocaleString()}{suffix}</>;
}

function SkillBar({ name, pct, active }) {
  return (
    <div className="skill-bar-row">
      <div className="skill-bar-label">
        <span>{name}</span>
        <span className="skill-pct">{pct}%</span>
      </div>
      <div className="skill-bar-track">
        <div
          className="skill-bar-fill"
          style={{ width: active ? `${pct}%` : "0%" }}
        />
      </div>
    </div>
  );
}

export default function App() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [menuOpen, setMenuOpen] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [formStatus, setFormStatus] = useState(null); // "sending" | "success" | "error"

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormStatus("sending");
    emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      { name: formData.name, time: new Date().toLocaleString(), message: formData.message },
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    ).then(() => {
      setFormStatus("success");
      setFormData({ name: "", email: "", message: "" });
    }).catch(() => {
      setFormStatus("error");
    });
  };

  const statsRef = useRef(null);
  const skillsRef = useRef(null);
  const timelineRef = useRef(null);
  const projectsRef = useRef(null);
  const researchRef = useRef(null);

  const statsInView = useInView(statsRef);
  const skillsInView = useInView(skillsRef);
  const timelineInView = useInView(timelineRef);
  const projectsInView = useInView(projectsRef);
  const researchInView = useInView(researchRef);

  const fullText = "Building research-ready tools for genomics and biomedical discovery.";

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      i++;
      setTypedText(fullText.slice(0, i));
      if (i >= fullText.length) clearInterval(timer);
    }, 32);
    return () => clearInterval(timer);
  }, []);

  const categories = ["All", ...new Set(projects.map((p) => p.category))];
  const filtered = projects.filter((p) => {
    const matchFilter = activeFilter === "All" || p.category === activeFilter;
    const matchSearch = `${p.title} ${p.category} ${p.tools.join(" ")}`
      .toLowerCase()
      .includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  return (
    <div className="site">
      <div className="dna-bg" aria-hidden="true">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="dna-strand" style={{ left: `${(i / 12) * 100}%`, animationDelay: `${i * 0.4}s` }} />
        ))}
      </div>

      <nav className="navbar" role="navigation" aria-label="Main navigation">
        <div className="brand">
          <div className="brand-icon" aria-hidden="true">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M2 12s3-6 10-6 10 6 10 6-3 6-10 6-10-6-10-6z"/>
              <circle cx="12" cy="12" r="3"/>
            </svg>
          </div>
          <div>
            <h2>Paul Alemoh</h2>
            <p>Bioinformatics & Computer Science</p>
          </div>
        </div>

        <button className={`menu-btn ${menuOpen ? "open" : ""}`} onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu" aria-expanded={menuOpen}>
          <span /><span /><span />
        </button>

        <div className={`nav-links ${menuOpen ? "open" : ""}`}>
          {["projects", "skills", "timeline", "research", "contact"].map((id) => (
            <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>
              {id.charAt(0).toUpperCase() + id.slice(1)}
            </a>
          ))}
        </div>
      </nav>

      <header className="hero">
        <div className="hero-text">
          <div className="hero-avatar">
            <img src="/profile.jpg" alt="Paul Alemoh" />
          </div>
          <p className="eyebrow">
            <span className="eyebrow-dot" aria-hidden="true" />
            Computational Biology Portfolio
          </p>
          <h1 aria-label={fullText}>
            {typedText}
            <span className="cursor" aria-hidden="true">|</span>
          </h1>
          <p>
            I develop bioinformatics pipelines, machine learning workflows, and
            scientific web applications that transform biological data into
            actionable research insights.
          </p>
          <div className="hero-badges">
            <span>Bioinformatics</span>
            <span>Systems</span>
            <span>Available for Research</span>
          </div>
          <div className="hero-buttons">
            <a href="#projects" className="btn primary">View Projects</a>
            <a href="#contact" className="btn secondary">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              Contact Me
            </a>
          </div>
        </div>

        <div className="hero-card" aria-label="Code sample">
          <div className="card-header">
            <span className="dot red" /><span className="dot yellow" /><span className="dot green" />
            <p>genome_pipeline.py</p>
          </div>
          <pre aria-label="Sample genome analysis code">
<span className="kw">def</span> <span className="fn">analyze_genome</span>(fasta_files):
  kmers = <span className="fn">extract_kmers</span>(fasta_files)
  vectors = <span className="fn">build_feature_vectors</span>(kmers)
  matrix = <span className="fn">cosine_distance</span>(vectors)
  clusters = <span className="fn">kmers</span>(matrix, k=<span className="num">8</span>)
  tree = <span className="fn">build_phylogeny</span>(matrix)

  <span className="kw">return</span> {"{"}
    <span className="str">"clusters"</span>: clusters,
    <span className="str">"tree"</span>: tree,
    <span className="str">"accuracy"</span>: <span className="num">0.94</span>
  {"}"}
          </pre>
        </div>
      </header>

      <section className="stats" ref={statsRef} aria-label="Portfolio statistics">
        {stats.map((s) => (
          <div key={s.label} className="stat-card">
            <h3>
              <AnimatedCounter target={s.value} suffix={s.suffix} active={statsInView} />
            </h3>
            <p>{s.label}</p>
          </div>
        ))}
      </section>

      <section id="projects" className="section" ref={projectsRef} aria-labelledby="projects-heading">
        <div className={`section-title reveal ${projectsInView ? "visible" : ""}`}>
          <a href="#" className="back-to-top" aria-label="Back to top">↑ Top</a>
          <p className="eyebrow"><span className="eyebrow-dot" aria-hidden="true" />Featured Work</p>
          <h2 id="projects-heading">Selected Projects</h2>
        </div>

        <div className="filter-bar" role="group" aria-label="Project category filters">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`filter-btn ${activeFilter === cat ? "active" : ""}`}
              onClick={() => setActiveFilter(cat)}
              aria-pressed={activeFilter === cat}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="search-wrap">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input
            className="search"
            type="search"
            placeholder="Search projects or tools..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Search projects"
          />
        </div>

        <div className="project-grid" role="list">
          {filtered.map((project, i) => (
            <article
              className={`project-card reveal ${projectsInView ? "visible" : ""}`}
              key={project.id}
              style={{ transitionDelay: `${i * 0.1}s` }}
              role="listitem"
            >
              <div className="project-top">
                <span className="project-tag">{project.tag}</span>
                <span className="project-category">{project.category}</span>
              </div>
              <h3>{project.title}</h3>
              <p>{project.summary}</p>
              <div className="project-stat">
                <strong>{project.stat}</strong>
                <span>{project.statLabel}</span>
              </div>
              <div className="tools">
                {project.tools.slice(0, 4).map((tool) => (
                  <span key={tool}>{tool}</span>
                ))}
                {project.tools.length > 4 && <span className="tool-more">+{project.tools.length - 4}</span>}
              </div>
              <button className="view-btn" onClick={() => setSelectedProject(project)} aria-label={`View details for ${project.title}`}>
                View Details
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12,5 19,12 12,19"/></svg>
              </button>
            </article>
          ))}
          {filtered.length === 0 && (
            <p className="no-results">No projects match your search. Try a different term.</p>
          )}
        </div>
      </section>

      <section id="skills" className="section skills-section" ref={skillsRef} aria-labelledby="skills-heading">
        <div className={`section-title reveal ${skillsInView ? "visible" : ""}`}>
          <a href="#" className="back-to-top" aria-label="Back to top">↑ Top</a>
          <p className="eyebrow"><span className="eyebrow-dot" aria-hidden="true" />Technical Stack</p>
          <h2 id="skills-heading">Skills & Technologies</h2>
        </div>
        <div className="skills-grid">
          {skillCategories.map((cat, i) => (
            <div
              key={cat.name}
              className={`skill-category reveal ${skillsInView ? "visible" : ""}`}
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <div className="skill-cat-header">
                <span aria-hidden="true">{cat.icon}</span>
                <h3>{cat.name}</h3>
              </div>
              <div className="skill-bars">
                {cat.skills.map((s) => (
                  <SkillBar key={s.name} name={s.name} pct={s.pct} active={skillsInView} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="timeline" className="section timeline-section" ref={timelineRef} aria-labelledby="timeline-heading">
        <div className={`section-title reveal ${timelineInView ? "visible" : ""}`}>
          <a href="#" className="back-to-top" aria-label="Back to top">↑ Top</a>
          <p className="eyebrow"><span className="eyebrow-dot" aria-hidden="true" />Background</p>
          <h2 id="timeline-heading">Research & Education</h2>
        </div>
        <div className="timeline" role="list">
          {timeline.map((item, i) => (
            <div
              key={i}
              className={`timeline-item reveal ${timelineInView ? "visible" : ""}`}
              style={{ transitionDelay: `${i * 0.12}s` }}
              role="listitem"
            >
              <div className={`timeline-dot type-${item.type}`} aria-hidden="true" />
              <div className="timeline-content">
                <div className="timeline-meta">
                  <span className="timeline-year">{item.year}</span>
                  <span className={`timeline-badge type-${item.type}`}>{item.type}</span>
                </div>
                <h3>{item.title}</h3>
                <p className="timeline-org">{item.org}</p>
                <p>{item.desc}</p>
                {item.grade && <p className="timeline-grade">🎓 {item.grade}</p>}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="research" className="section research-section" ref={researchRef} aria-labelledby="research-heading">
        <a href="#" className="back-to-top" aria-label="Back to top">↑ Top</a>
        <div className={`section-title reveal ${researchInView ? "visible" : ""}`}>
          <p className="eyebrow"><span className="eyebrow-dot" aria-hidden="true" />Publications & Studies</p>
          <h2 id="research-heading">Research Work</h2>
        </div>
        <div className="research-grid">
          {research.map((item, i) => (
            <div
              key={i}
              className={`research-card reveal ${researchInView ? "visible" : ""}`}
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <div className="research-card-header">
                <span className="research-topic">{item.topic}</span>
                <span className="research-year">{item.year}</span>
              </div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="contact" className="contact-section" aria-labelledby="contact-heading">
        <div className="contact-inner">
          <a href="#" className="back-to-top" aria-label="Back to top">↑ Top</a>
          <p className="eyebrow"><span className="eyebrow-dot" aria-hidden="true" />Get in Touch</p>
          <h2 id="contact-heading">Let's connect around bioinformatics, AI, and computational biology.</h2>
          <p className="contact-sub">Open to research collaborations, academic opportunities, and interesting problems in genomics and computational medicine.</p>

          <form className="contact-form" onSubmit={handleSubmit} aria-label="Contact form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input type="text" id="name" placeholder="Your name" value={formData.name} onChange={handleFormChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" placeholder="your@email.com" value={formData.email} onChange={handleFormChange} required />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea id="message" rows={4} placeholder="Tell me about your research or project..." value={formData.message} onChange={handleFormChange} required />
            </div>
            <button type="submit" className="btn primary submit-btn" disabled={formStatus === "sending"}>
              {formStatus === "sending" ? "Sending..." : "Send Message"}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22,2 15,22 11,13 2,9"/></svg>
            </button>
            {formStatus === "success" && <p className="form-success">✅ Message sent! I'll get back to you soon.</p>}
            {formStatus === "error" && <p className="form-error">❌ Something went wrong. Please try again.</p>}
          </form>

          <div className="contact-links" role="list">
            <a href="mailto:paul.alemoh@gmail.com" className="contact-link" role="listitem" aria-label="Send email">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              paul.alemoh@gmail.com
            </a>
            <a href="https://github.com/powhenagbo" className="contact-link" target="_blank" rel="noopener noreferrer" role="listitem" aria-label="GitHub profile (opens in new tab)">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
              github.com/powhenagbo
            </a>
            <a href="https://www.linkedin.com/in/paul-alemoh" className="contact-link" target="_blank" rel="noopener noreferrer" role="listitem" aria-label="LinkedIn profile (opens in new tab)">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
              linkedin.com/in/paul-alemoh
            </a>
          </div>
        </div>
      </section>

      <footer role="contentinfo">
        <div className="footer-inner">
          <div className="brand">
            <div className="brand-icon" aria-hidden="true">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M2 12s3-6 10-6 10 6 10 6-3 6-10 6-10-6-10-6z"/><circle cx="12" cy="12" r="3"/></svg>
            </div>
            <div>
              <h2>Paul Alemoh</h2>
              <p>Bioinformatics & Computer Science</p>
            </div>
          </div>
          <p className="footer-copy">© 2026 Paul Alemoh · System /Bioinformatics · All rights reserved.</p>
        </div>
      </footer>

      {selectedProject && (
        <div className="modal-bg" onClick={() => setSelectedProject(null)} role="dialog" aria-modal="true" aria-label={`${selectedProject.title} details`}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button className="close" onClick={() => setSelectedProject(null)} aria-label="Close dialog">×</button>
            <div className="modal-top">
              <span className="project-tag">{selectedProject.tag}</span>
              <span className="project-category">{selectedProject.category}</span>
            </div>
            <h2>{selectedProject.title}</h2>
            <p>{selectedProject.details}</p>
            <div className="project-stat">
              <strong>{selectedProject.stat}</strong>
              <span>{selectedProject.statLabel}</span>
            </div>
            <div className="tools">
              {selectedProject.tools.map((tool) => (
                <span key={tool}>{tool}</span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
