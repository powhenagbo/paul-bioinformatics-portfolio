import { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { posts, plannedTopics } from "./posts";
import "../App.css";
import "./blog.css";

const PAGE_SIZE = 10;

function groupByYear(list) {
  const groups = new Map();
  for (const post of list) {
    const year = new Date(post.date).getFullYear();
    if (!groups.has(year)) groups.set(year, []);
    groups.get(year).push(post);
  }
  return [...groups.entries()].sort((a, b) => b[0] - a[0]);
}

export default function BlogIndex() {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const sorted = [...posts].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );
  const visible = sorted.slice(0, visibleCount);
  const hasMore = visibleCount < sorted.length;
  const grouped = groupByYear(visible);

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
          {grouped.map(([year, yearPosts]) => (
            <div key={year} className="blog-archive-year-group">
              <h2 className="blog-archive-year">{year}</h2>
              <ul className="blog-archive-list">
                {yearPosts.map((post) => (
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
            </div>
          ))}
        </section>

        {hasMore && (
          <button
            type="button"
            className="blog-load-more"
            onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
          >
            Show more articles
          </button>
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
