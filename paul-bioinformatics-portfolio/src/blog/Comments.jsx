import { useEffect, useRef } from "react";

// --- Giscus configuration -------------------------------------------------
// Values below are Paul's actual repo/category IDs from giscus.app.
const GISCUS_REPO = "powhenagbo/paul-bioinformatics-portfolio";
const GISCUS_REPO_ID = "R_kgDOSZEP8w";
const GISCUS_CATEGORY = "General"; // or "Announcements" / a category you created
const GISCUS_CATEGORY_ID = "DIC_kwDOSZEP884DDxv4";
// ---------------------------------------------------------------------------

export default function Comments({ slug }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;

    // Clear out any previous embed (e.g. when navigating between posts)
    ref.current.innerHTML = "";

    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.async = true;
    script.crossOrigin = "anonymous";
    script.setAttribute("data-repo", GISCUS_REPO);
    script.setAttribute("data-repo-id", GISCUS_REPO_ID);
    script.setAttribute("data-category", GISCUS_CATEGORY);
    script.setAttribute("data-category-id", GISCUS_CATEGORY_ID);
    // Map each blog post to its own discussion by slug, so comments/likes
    // are scoped per-article rather than per-URL (safer if the URL path
    // ever changes).
    script.setAttribute("data-mapping", "specific");
    script.setAttribute("data-term", slug);
    script.setAttribute("data-strict", "1");
    // Reactions on the top-level post double as the "like" button.
    script.setAttribute("data-reactions-enabled", "1");
    script.setAttribute("data-emit-metadata", "0");
    script.setAttribute("data-input-position", "top");
    script.setAttribute("data-theme", "preferred_color_scheme");
    script.setAttribute("data-lang", "en");

    ref.current.appendChild(script);
  }, [slug]);

  return (
    <section className="blog-comments" aria-label="Comments and reactions">
      <h2 className="blog-comments-heading">Comments</h2>
      <div ref={ref} />
    </section>
  );
}
