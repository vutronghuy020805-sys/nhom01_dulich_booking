"use client";

import { useEffect, useState } from "react";
import ArticleCard from "./ArticleCard";

const articles = [
  {
    id: "article-1",
    title:
      'Khám phá trọn vẹn Sun World Vũng Tàu: Địa chỉ, Bảng giá và Bí kíp "chơi cực đã"',
    readTime: "Đọc trong khoảng 10 phút",
    image: "/assets/articles/article-1.jpg",
    brand: "VieGo",
  },
  {
    id: "article-2",
    title: 'Khám phá Ba Son: "View" sông triệu đô không thể bỏ lỡ',
    readTime: "Đọc trong khoảng 13 phút",
    image: "/assets/articles/article-2.jpg",
    brand: "VieGo",
  },
  {
    id: "article-3",
    title:
      'Đi cafe Quận 3 thì đi đâu? Lưu ngay danh sách 9 tọa độ "đắt khách" nhất',
    readTime: "Đọc trong khoảng 18 phút",
    image: "/assets/articles/article-3.jpg",
    brand: "VieGo",
  },
  {
    id: "article-4",
    title:
      'Sài Gòn không thiếu chỗ chơi: Trọn bộ tọa độ giải trí "hè cực chất" cho mùa 2026',
    readTime: "Đọc trong khoảng 18 phút",
    image: "/assets/articles/article-4.jpeg",
    brand: "VieGo",
  },
  {
    id: "article-5",
    title:
      "Khám phá săn mây và cáp treo: Trải nghiệm không thể bỏ lỡ cho chuyến đi miền núi",
    readTime: "Đọc trong khoảng 13 phút",
    image: "/assets/articles/article-5.jpg",
    brand: "VieGo",
  },
  {
    id: "article-6",
    title:
      "Check-in cột cờ vùng cao: Gợi ý hành trình săn ảnh cực đẹp cho cuối tuần",
    readTime: "Đọc trong khoảng 10 phút",
    image: "/assets/articles/article-6.jpg",
    brand: "VieGo",
  },
];

export default function TravelInspirationSection() {
  const [visibleCount, setVisibleCount] = useState(3);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w < 640) setVisibleCount(1);
      else if (w < 1024) setVisibleCount(2);
      else setVisibleCount(3);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const maxIndex = Math.max(0, articles.length - visibleCount);
  const safeIndex = Math.min(index, maxIndex);
  const atStart = safeIndex === 0;
  const atEnd = safeIndex >= maxIndex;

  const prev = () => setIndex((i) => Math.max(0, i - 1));
  const next = () => setIndex((i) => Math.min(maxIndex, i + 1));

  const slidePercent = 100 / visibleCount;

  return (
    <section className="bg-white py-16 px-4">
      <div className="max-w-350 mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-blue-50 text-blue-600 shrink-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5"
            >
              <rect x="3" y="4" width="18" height="16" rx="2" />
              <path d="M3 9h18" />
              <path d="M7 6.5h.01" />
              <path d="M10 6.5h.01" />
            </svg>
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800">
            Đọc tiếp và bắt đầu hành trình phiêu lưu
          </h2>
        </div>

        <div className="relative">
          <button
            type="button"
            onClick={prev}
            disabled={atStart}
            aria-label="Xem các bài viết trước"
            className="absolute left-0 top-1/3 -translate-x-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white shadow-md flex items-center justify-center text-blue-600 hover:bg-blue-50 transition disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          <button
            type="button"
            onClick={next}
            disabled={atEnd}
            aria-label="Xem các bài viết tiếp theo"
            className="absolute right-0 top-1/3 translate-x-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white shadow-md flex items-center justify-center text-blue-600 hover:bg-blue-50 transition disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>

          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${safeIndex * slidePercent}%)` }}
            >
              {articles.map((article) => (
                <div
                  key={article.id}
                  className="shrink-0 px-3"
                  style={{ width: `${slidePercent}%` }}
                >
                  <ArticleCard article={article} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
