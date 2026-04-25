"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { helpCategories } from "@/data/helpCategories";
import { helpTopics } from "@/data/helpTopics";
import HelpCategoryIcon from "./HelpCategoryIcon";
import HighlightedText from "@/components/search/HighlightedText";
import SearchSuggestionsDropdown from "@/components/search/SearchSuggestionsDropdown";
import { matchScore } from "@/lib/searchUtils";
import { useDebouncedValue } from "@/lib/useDebouncedValue";

function SearchIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-5 h-5 text-slate-400"
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

function ChevronIcon({ open }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={
        "w-4 h-4 text-slate-400 shrink-0 transition-transform " +
        (open ? "rotate-180" : "")
      }
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

export default function HelpCenter() {
  const [query, setQuery] = useState("");
  const [suggestOpen, setSuggestOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const [openTopicId, setOpenTopicId] = useState(null);

  const normalizedQuery = query.trim().toLowerCase();
  const debouncedQuery = useDebouncedValue(query, 200);

  const filteredTopics = useMemo(() => {
    return helpTopics.filter((topic) => {
      const matchesQuery =
        normalizedQuery === "" ||
        topic.question.toLowerCase().includes(normalizedQuery) ||
        (topic.answer || "").toLowerCase().includes(normalizedQuery);
      const matchesCategory =
        !activeCategory || topic.categoryIds.includes(activeCategory);
      return matchesQuery && matchesCategory;
    });
  }, [normalizedQuery, activeCategory]);

  const suggestions = useMemo(() => {
    const q = debouncedQuery.trim();
    if (!q) return [];
    const scored = helpTopics
      .map((topic) => {
        const s = Math.max(
          matchScore(topic.question, q),
          matchScore(topic.answer || "", q) - 20
        );
        return { topic, s };
      })
      .filter((x) => x.s >= 0)
      .sort((a, b) => b.s - a.s)
      .slice(0, 6);
    return scored.map(({ topic }) => {
      const catLabel = helpCategories.find((c) =>
        topic.categoryIds.includes(c.id)
      )?.label;
      return {
        id: topic.id,
        title: topic.question,
        subtitle: catLabel ? `Chủ đề: ${catLabel}` : "Chủ đề hỗ trợ",
        topicId: topic.id,
      };
    });
  }, [debouncedQuery]);

  const activeCategoryLabel = activeCategory
    ? helpCategories.find((c) => c.id === activeCategory)?.label
    : null;

  const handleToggleTopic = (id) => {
    setOpenTopicId((prev) => (prev === id ? null : id));
  };

  const handleToggleCategory = (id) => {
    setActiveCategory((prev) => (prev === id ? null : id));
    setOpenTopicId(null);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSuggestOpen(false);
  };

  const handleSelectSuggestion = (item) => {
    setQuery(item.title);
    setOpenTopicId(item.topicId);
    setSuggestOpen(false);
    if (typeof window !== "undefined") {
      const el = document.getElementById(`help-topic-${item.topicId}`);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <>
      <section className="bg-sky-400 text-white">
        <div className="max-w-350 mx-auto px-4 lg:px-10 py-12 md:py-16">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center">
            Trung tâm Hỗ trợ VieGo
          </h1>
          <p className="mt-3 text-center text-sm md:text-base text-white/95">
            Mọi câu trả lời dành cho bạn
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-6 md:mt-8 max-w-2xl mx-auto relative"
          >
            <span className="absolute inset-y-0 left-5 flex items-center">
              <SearchIcon />
            </span>
            <input
              type="search"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setSuggestOpen(true);
              }}
              onFocus={() => setSuggestOpen(true)}
              placeholder="Nhập chủ đề ở đây (ví dụ hoàn tiền)"
              className="w-full bg-white rounded-full h-12 md:h-14 pl-14 pr-5 text-slate-900 placeholder:text-slate-400 text-sm md:text-base shadow-md outline-none focus:ring-2 focus:ring-white/70"
            />

            <SearchSuggestionsDropdown
              items={suggestions}
              query={query}
              open={suggestOpen && query.trim().length > 0}
              onClose={() => setSuggestOpen(false)}
              onSelect={handleSelectSuggestion}
              anchorClassName="absolute left-0 right-0 top-full mt-2 z-50 text-left"
            />
          </form>
        </div>
      </section>

      <section className="max-w-350 mx-auto px-4 lg:px-10 py-10 md:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-10 md:gap-14 items-start">
          <div>
            <h2 className="text-lg md:text-xl font-bold text-slate-900">
              Chủ đề thường gặp
              {activeCategoryLabel ? (
                <span className="ml-2 text-sm font-medium text-sky-600">
                  • {activeCategoryLabel}
                </span>
              ) : null}
            </h2>

            {filteredTopics.length > 0 ? (
              <ul className="mt-4 divide-y divide-slate-200 border-y border-slate-200">
                {filteredTopics.map((topic) => {
                  const isOpen = openTopicId === topic.id;
                  return (
                    <li key={topic.id} id={`help-topic-${topic.id}`}>
                      <button
                        type="button"
                        onClick={() => handleToggleTopic(topic.id)}
                        aria-expanded={isOpen}
                        className="w-full flex items-start justify-between gap-4 py-3.5 text-left hover:bg-slate-50 transition-colors"
                      >
                        <span className="text-sm md:text-base text-slate-800 leading-relaxed">
                          <HighlightedText
                            text={topic.question}
                            query={query}
                          />
                        </span>
                        <ChevronIcon open={isOpen} />
                      </button>
                      {isOpen ? (
                        <p className="pb-4 pr-8 text-sm text-slate-600 leading-relaxed">
                          <HighlightedText
                            text={topic.answer}
                            query={query}
                          />
                        </p>
                      ) : null}
                    </li>
                  );
                })}
              </ul>
            ) : (
              <div className="mt-4 rounded-xl bg-slate-50 border border-slate-200 p-5 text-sm text-slate-600">
                Không tìm thấy chủ đề phù hợp. Thử từ khoá khác hoặc{" "}
                <Link
                  href="/contact"
                  className="text-sky-600 hover:underline font-medium"
                >
                  liên hệ đội ngũ hỗ trợ
                </Link>
                .
              </div>
            )}

            <div className="mt-8">
              <h3 className="text-lg md:text-xl font-bold text-slate-900">
                Liên hệ chúng tôi
              </h3>
              <p className="mt-2 text-sm md:text-base text-slate-600 leading-relaxed">
                Kết nối với đội ngũ Hỗ trợ Khách hàng của chúng tôi bằng cách{" "}
                <Link
                  href="/contact"
                  className="text-sky-600 hover:text-sky-700 font-medium hover:underline"
                >
                  nhấn vào đây
                </Link>
                .
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-lg md:text-xl font-bold text-slate-900">
              Phân loại theo sản phẩm
            </h2>

            <div className="mt-5 grid grid-cols-3 md:grid-cols-4 gap-x-4 gap-y-6">
              {helpCategories.map((category) => {
                const isActive = activeCategory === category.id;
                return (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() => handleToggleCategory(category.id)}
                    aria-pressed={isActive}
                    className={
                      "flex flex-col items-center gap-2 text-center rounded-xl p-2 transition-colors " +
                      (isActive
                        ? "bg-sky-50"
                        : "hover:bg-slate-50")
                    }
                  >
                    <HelpCategoryIcon
                      icon={category.icon}
                      color={category.color}
                      active={isActive}
                    />
                    <span
                      className={
                        "text-xs md:text-sm leading-tight " +
                        (isActive
                          ? "text-sky-700 font-semibold"
                          : "text-slate-700 font-medium")
                      }
                    >
                      {category.label}
                    </span>
                  </button>
                );
              })}
            </div>

            {activeCategory ? (
              <button
                type="button"
                onClick={() => setActiveCategory(null)}
                className="mt-4 text-xs md:text-sm text-sky-600 hover:text-sky-700 font-medium"
              >
                ← Bỏ lọc theo sản phẩm
              </button>
            ) : null}
          </div>
        </div>
      </section>
    </>
  );
}
