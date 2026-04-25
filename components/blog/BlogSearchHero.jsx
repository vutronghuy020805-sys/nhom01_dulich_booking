"use client";

import { useMemo, useState } from "react";
import SearchSuggestionsDropdown from "@/components/search/SearchSuggestionsDropdown";
import { matchScore, normalizeVi } from "@/lib/searchUtils";
import { useDebouncedValue } from "@/lib/useDebouncedValue";
import { blogSearchSuggestions } from "@/data/blogPosts";

function SearchIcon({ className = "w-5 h-5 text-slate-400" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="11" cy="11" r="7" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

export default function BlogSearchHero({ query, onQueryChange, onSubmit, posts = [] }) {
  const [open, setOpen] = useState(false);
  const debounced = useDebouncedValue(query, 200);

  const suggestions = useMemo(() => {
    const q = normalizeVi(debounced);
    if (!q) return [];
    const items = [];

    blogSearchSuggestions.forEach((s) => {
      const score = matchScore(s, q);
      if (score >= 0) {
        items.push({
          id: `kw-${s}`,
          title: s,
          subtitle: "Từ khoá phổ biến",
          kind: "keyword",
          value: s,
          score: score + 20,
        });
      }
    });

    posts.forEach((p) => {
      const score = Math.max(
        matchScore(p.title, q),
        matchScore(p.location, q),
        matchScore((p.tags || []).join(" "), q) - 10
      );
      if (score >= 0) {
        items.push({
          id: `post-${p.slug}`,
          title: p.title,
          subtitle: `Bài viết · ${p.location}`,
          kind: "post",
          value: p.title,
          score,
        });
      }
    });

    items.sort((a, b) => b.score - a.score);
    return items.slice(0, 8);
  }, [debounced, posts]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setOpen(false);
    if (onSubmit) onSubmit();
  };

  const handleSelect = (item) => {
    setOpen(false);
    onQueryChange(item.value);
    if (onSubmit) onSubmit();
  };

  return (
    <section className="bg-sky-500">
      <div className="max-w-350 mx-auto px-4 lg:px-10 py-8 md:py-10">
        <form onSubmit={handleSubmit} className="relative max-w-5xl mx-auto">
          <div className="flex items-stretch gap-0 bg-white rounded-full shadow-lg overflow-hidden border border-white/70">
            <span className="flex items-center pl-5">
              <SearchIcon />
            </span>
            <input
              type="search"
              value={query}
              onChange={(e) => {
                onQueryChange(e.target.value);
                setOpen(true);
              }}
              onFocus={() => setOpen(true)}
              placeholder="Tìm kiếm những bài viết truyền cảm hứng, mẹo, điểm đến..."
              className="flex-1 min-w-0 bg-transparent outline-none px-4 py-3.5 md:py-4 text-slate-900 placeholder:text-slate-400 text-sm md:text-base"
            />
            <button
              type="submit"
              className="shrink-0 inline-flex items-center gap-2 px-5 md:px-8 bg-sky-500 hover:bg-sky-600 text-white font-semibold text-sm md:text-base transition-colors"
            >
              <SearchIcon className="w-4 h-4 text-white" />
              Tìm kiếm
            </button>
          </div>

          <SearchSuggestionsDropdown
            items={suggestions}
            query={query}
            open={open && query.trim().length > 0}
            onClose={() => setOpen(false)}
            onSelect={handleSelect}
            anchorClassName="absolute left-4 right-4 md:left-16 md:right-40 top-full mt-2 z-50 text-left"
          />
        </form>
      </div>
    </section>
  );
}
