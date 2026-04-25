"use client";

import { useMemo, useState } from "react";
import BlogSearchHero from "./BlogSearchHero";
import FeaturedBlogCarousel from "./FeaturedBlogCarousel";
import BlogList from "./BlogList";
import { blogPosts } from "@/data/blogPosts";
import { matchesQuery } from "@/lib/searchUtils";

export default function BlogClient() {
  const [query, setQuery] = useState("");
  const [applied, setApplied] = useState("");

  const featured = useMemo(() => blogPosts.filter((p) => p.featured), []);

  const filtered = useMemo(() => {
    const q = applied.trim();
    if (!q) return blogPosts;
    return blogPosts.filter((p) =>
      [
        p.title,
        p.location,
        p.excerpt,
        (p.tags || []).join(" "),
      ].some((t) => matchesQuery(t, q))
    );
  }, [applied]);

  const handleSubmit = () => setApplied(query);

  return (
    <>
      <BlogSearchHero
        query={query}
        onQueryChange={setQuery}
        onSubmit={handleSubmit}
        posts={blogPosts}
      />

      <div className="mt-8 md:mt-10">
        <FeaturedBlogCarousel posts={featured} />
      </div>

      <BlogList
        posts={filtered}
        query={applied}
        title={applied ? `Kết quả cho "${applied}"` : "Bài viết mới"}
      />
    </>
  );
}
