import { Link, useParams, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { getPostBySlug } from "./posts";
import Comments from "./Comments";
import "../App.css";
import "./blog.css";

function Block({ block }) {
  switch (block.type) {
    case "h2":
      return <h2>{block.text}</h2>;
    case "h3":
      return <h3>{block.text}</h3>;
    case "code":
      return (
        <pre className="blog-code">
          <code>{block.text}</code>
        </pre>
      );
    case "p":
    default:
      return <p>{block.text}</p>;
  }
}

export default function BlogPost() {
  const { slug } = useParams();
  const post = getPostBySlug(slug);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.seo.metaDescription,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Person",
      name: post.author,
      url: "https://poalemoh.dev/",
    },
    publisher: {
      "@type": "Person",
      name: "Paul Alemoh",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": post.seo.canonical,
    },
  };

  return (
    <div className="blog-page">
      <Helmet>
        <title>{post.seo.metaTitle}</title>
        <meta name="description" content={post.seo.metaDescription} />
        <link rel="canonical" href={post.seo.canonical} />

        <meta property="og:type" content="article" />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.seo.metaDescription} />
        <meta property="og:url" content={post.seo.canonical} />
        <meta property="article:published_time" content={post.date} />
        <meta property="article:author" content={post.author} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.seo.metaDescription} />

        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <div className="blog-container">
        <Link to="/blog" className="blog-back-link">← Back to blog</Link>

        <article>
          <header className="blog-article-header">
            <span className="blog-post-topic">{post.topic}</span>
            <h1>{post.title}</h1>
            <div className="blog-post-meta">
              <span>By {post.author}</span>
              <span aria-hidden="true">·</span>
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
          </header>

          <div className="blog-article-body">
            {post.content.map((block, i) => (
              <Block key={i} block={block} />
            ))}
          </div>

          <footer className="blog-article-footer">
            <p>
              Related: <Link to="/blog">more articles</Link> and the{" "}
              <Link to="/#projects">KALI project</Link>.
            </p>
          </footer>

          <Comments slug={post.slug} />
        </article>
      </div>
    </div>
  );
}
