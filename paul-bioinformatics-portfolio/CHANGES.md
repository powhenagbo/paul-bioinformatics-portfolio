# SEO + Blog Update — Steps 1–3

Covers steps 2–7 of the recommended implementation order from the SEO plan
(portfolio-claims cleanup, step 1, is still on you — see note at the bottom).

## How to apply

1. Copy these files into your repo at the same relative paths, overwriting
   `index.html`, `package.json`, `package-lock.json`, `src/main.jsx`, and
   `src/App.jsx`, and adding the new `public/robots.txt`, `public/sitemap.xml`,
   and `src/blog/` folder.
2. Run `npm install` (adds `react-router-dom` and `react-helmet-async`).
3. Update every `poalemoh.dev` placeholder if your actual domain differs.
4. `npm run dev` and check `/` and `/blog` and `/blog/what-are-kmers`.

## What changed

**`index.html`** — full SEO metadata: unique title/description, canonical
URL, Open Graph, Twitter card, favicon link, and a `Person` JSON-LD block.
The `sameAs` array in the Person schema is empty — fill it in with your
GitHub/LinkedIn/Google Scholar/ORCID URLs so search engines can connect them
to you.

**`public/robots.txt`** and **`public/sitemap.xml`** — new. Sitemap
currently lists `/`, `/blog`, and `/blog/what-are-kmers`. Add a new `<url>`
entry each time you publish another article.

**`src/main.jsx`** — now wraps the app in `react-router-dom`'s
`BrowserRouter` and `react-helmet-async`'s `HelmetProvider`, with routes for
`/` (your existing portfolio, untouched), `/blog`, and `/blog/:slug`.

**`src/App.jsx`** — one addition: a "Blog" link in the nav, using
React Router's `Link` so it's a real route change rather than an anchor jump.
Nothing else in your existing portfolio content/layout was touched.

**`src/blog/posts.js`** — the post data store. Contains one fully written
post (`what-are-kmers`) and a `plannedTopics` list mirroring the rest of the
proposed series. Deliberately does **not** create routes for the unwritten
topics — publishing thin/placeholder blog pages is worse for SEO than not
having them yet. Add a new object to the `posts` array (and remove the
matching entry from `plannedTopics`) as you finish each article.

**`src/blog/BlogIndex.jsx`** — `/blog` listing page: published posts as
cards, unwritten topics as a "Coming soon" list. Has its own meta
title/description via `react-helmet-async`.

**`src/blog/BlogPost.jsx`** — individual article template
(`/blog/:slug`). Renders `post.content` blocks, and injects per-article meta
title/description, canonical URL, Open Graph/Twitter tags, and
`BlogPosting` JSON-LD structured data automatically from the post's `seo`
field — so every future post gets full SEO for free just by filling in
`posts.js`.

**`src/blog/blog.css`** — styling for the blog pages, built entirely from
the CSS custom properties already defined in `App.css` (colors, fonts,
radii), so it matches the existing site without a redesign.

## Verified

`npm run build` completes cleanly with no errors (53 modules, ~603ms build
time locally).

## Not done yet (from the plan)

- **Step 1 — content/claims review.** Before pushing this live and
  submitting to Search Console, go through genome counts, accuracy
  percentages, and degree/program wording per section 10 of the plan.
- **Steps 9–12** — internal cross-links from KALI/research sections to the
  blog, deployment, Search Console submission, and the rest of the article
  series.
