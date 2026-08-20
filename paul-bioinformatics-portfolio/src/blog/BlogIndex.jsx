import { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { posts, plannedTopics } from "./posts";
import "../App.css";
import "./blog.css";

const PAGE_SIZE = 8;

export default function BlogIndex() {
  const [page, setPage] = useState(1);

  const sorted = [...posts].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * PAGE_SIZE;
  const visible = sorted.slice(start, start + PAGE_SIZE);

  const goTo = (p) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="blog-page">
      <Helmet>
        <title>Blog | Paul Alemoh — Bioinformatics & Genomics</title>
        <meta
          name="description"
          content="Articles on k-mers, alignment-free genome comparison, antimicrobial resistance bioinformatics, and AI-assisted drug discovery, from Paul Alemoh."
        />
        <link rel="canonical" href="https://poalemoh.dev/blog" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Blog | Paul Alemoh — Bioinformatics & Genomics" />
        <meta
          property="og:description"
          content="Articles on k-mers, alignment-free genome comparison, antimicrobial resistance bioinformatics, and AI-assisted drug discovery."
        />
        <meta property="og:url" content="https://poalemoh.dev/blog" />
      </Helmet>

      <div className="blog-container">
        <Link to="/" className="blog-back-link">← Back to portfolio</Link>

        <header className="blog-header">
          <h1>Blog</h1>
          <p>
            Notes on k-mer methods, alignment-free genome comparison,
            antimicrobial resistance bioinformatics, and AI-assisted drug
            discovery — written to be useful for both researchers and people
            new to the field.
          </p>
        </header>

        <section className="blog-archive" aria-label="Published articles">
          <ul className="blog-archive-list">
            {visible.map((post) => (
              <li key={post.slug} className="blog-archive-row">
                <Link
                  to={`/blog/${post.slug}`}
                  className="blog-archive-title"
                >
                  {post.title}
                </Link>
                <span className="blog-archive-meta">
                  <time dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </time>
                  <span aria-hidden="true">·</span>
                  <span>{post.readingTime}</span>
                </span>
              </li>
            ))}
          </ul>
        </section>

        {totalPages > 1 && (
          <nav className="blog-pagination" aria-label="Blog pagination">
            <button
              type="button"
              onClick={() => goTo(currentPage - 1)}
              disabled={currentPage === 1}
              aria-label="Previous page"
            >
              ← Prev
            </button>
            <span className="blog-pagination-status">
              Page {currentPage} of {totalPages}
            </span>
            <button
              type="button"
              onClick={() => goTo(currentPage + 1)}
              disabled={currentPage === totalPages}
              aria-label="Next page"
            >
              Next →
            </button>
          </nav>
        )}

        {plannedTopics.length > 0 && (
          <section className="blog-upcoming" aria-label="Upcoming articles">
            <details>
              <summary>Coming soon ({plannedTopics.length})</summary>
              <ul>
                {plannedTopics.map((topic) => (
                  <li key={topic}>{topic}</li>
                ))}
              </ul>
            </details>
          </section>
        )}
      </div>
    </div>
  );
}
