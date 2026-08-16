import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import App from "./App.jsx";
import BlogIndex from "./blog/BlogIndex.jsx";
import BlogPost from "./blog/BlogPost.jsx";
import "./index.css";

function HomePage() {
  return (
    <>
      <Helmet>
        <title>Paul Alemoh | Bioinformatics, K-mer Genomics & AI Drug Discovery</title>
        <meta
          name="description"
          content="Paul Alemoh is a bioinformatics researcher and developer working on alignment-free genome analysis (KALI), k-mer methods, AI-assisted drug discovery, pharmacogenomics, and phylogenetics. Explore projects, research, and the blog."
        />
        <link rel="canonical" href="https://poalemoh.dev/" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Paul Alemoh | Bioinformatics" />
        <meta property="og:title" content="Paul Alemoh | Bioinformatics, K-mer Genomics & AI Drug Discovery" />
        <meta property="og:description" content="Bioinformatics researcher and developer working on alignment-free genome analysis (KALI), k-mer methods, AI-assisted drug discovery, pharmacogenomics, and phylogenetics." />
        <meta property="og:url" content="https://poalemoh.dev/" />
        <meta property="og:image" content="https://poalemoh.dev/profile.jpg" />
        <meta property="og:locale" content="en_US" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Paul Alemoh | Bioinformatics, K-mer Genomics & AI Drug Discovery" />
        <meta name="twitter:description" content="Bioinformatics researcher and developer working on alignment-free genome analysis (KALI), k-mer methods, AI-assisted drug discovery, pharmacogenomics, and phylogenetics." />
        <meta name="twitter:image" content="https://poalemoh.dev/profile.jpg" />
      </Helmet>
      <App />
    </>
  );
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/blog" element={<BlogIndex />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);
