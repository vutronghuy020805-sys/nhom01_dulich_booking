"use client";

import { useRef } from "react";
import Link from "next/link";
import TravelArticleCard from "./TravelArticleCard";
import { latestTravelArticles } from "./latestTravelArticles";

function ArticleIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-6 h-6 text-sky-600"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="8" y1="13" x2="16" y2="13" />
      <line x1="8" y1="17" x2="13" y2="17" />
    </svg>
  );
}

export default function LatestArticlesSection({
  articles = latestTravelArticles,
}) {
  const scrollRef = useRef(null);

  const scrollByAmount = (delta) => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: delta, behavior: "smooth" });
  };

  return (
    <section className="max-w-375 mx-auto px-6 lg:px-10 pt-10 pb-16">
      <div className="mb-5">
        <h2 className="flex items-center gap-3 text-xl md:text-2xl font-bold text-slate-900">
          <ArticleIcon />
          Các bài viết mới nhất
        </h2>
        <p className="text-sm text-slate-500 mt-1 pl-9">
          Luôn nắm bắt những kinh nghiệm du lịch mới nhất
        </p>
      </div>

      <div className="relative">
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2 -mx-1 px-1 no-scrollbar"
        >
          {articles.map((article) => (
            <TravelArticleCard key={article.id} article={article} />
          ))}
        </div>

        <button
          type="button"
          onClick={() => scrollByAmount(-320)}
          aria-label="Xem bài trước đó"
          className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 w-10 h-10 rounded-full bg-white border border-gray-200 shadow items-center justify-center hover:bg-slate-50"
        >
          <svg
            viewBox="0 0 24 24"
            className="w-4 h-4 text-slate-700"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => scrollByAmount(320)}
          aria-label="Xem bài tiếp theo"
          className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 w-10 h-10 rounded-full bg-white border border-gray-200 shadow items-center justify-center hover:bg-slate-50"
        >
          <svg
            viewBox="0 0 24 24"
            className="w-4 h-4 text-slate-700"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      <div className="flex justify-center mt-6">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-sky-50 hover:bg-sky-100 text-sky-700 font-semibold text-sm md:text-base transition"
        >
          Đọc thêm các bài viết du lịch
          <svg
            viewBox="0 0 24 24"
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </Link>
      </div>
    </section>
  );
}
