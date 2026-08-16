import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { posts, plannedTopics } from "./posts";
import "../App.css";
import "./blog.css";

export default function BlogIndex() {
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

        <section className="blog-post-list" aria-label="Published articles">
          {posts.map((post) => (
            <article key={post.slug} className="blog-post-card">
              <Link to={`/blog/${post.slug}`} className="blog-post-card-link">
                <span className="blog-post-topic">{post.topic}</span>
                <h2>{post.title}</h2>
                <p>{post.description}</p>
                <div className="blog-post-meta">
                  <time dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                  <span aria-hidden="true">·</span>
                  <span>{post.readingTime}</span>
                </div>
              </Link>
            </article>
          ))}
        </section>

        {plannedTopics.length > 0 && (
          <section className="blog-upcoming" aria-label="Upcoming articles">
            <h2>Coming soon</h2>
            <ul>
              {plannedTopics.map((topic) => (
                <li key={topic}>{topic}</li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
}
