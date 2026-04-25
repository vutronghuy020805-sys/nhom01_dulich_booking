"use client";

import { useEffect, useState } from "react";
import TestimonialCard from "./TestimonialCard";

export default function LocationTestimonialsSection({ testimonials }) {
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

  if (!testimonials || !testimonials.items || testimonials.items.length === 0)
    return null;

  const items = testimonials.items;
  const maxIndex = Math.max(0, items.length - visibleCount);
  const safeIndex = Math.min(index, maxIndex);
  const atStart = safeIndex === 0;
  const atEnd = safeIndex >= maxIndex;

  const prev = () => setIndex((i) => Math.max(0, i - 1));
  const next = () => setIndex((i) => Math.min(maxIndex, i + 1));

  const slidePercent = 100 / visibleCount;

  return (
    <section className="bg-gray-50 pt-4 pb-16 px-4">
      <div className="max-w-350 mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-8">
          {testimonials.title}
        </h2>

        <div className="relative">
          <button
            type="button"
            onClick={prev}
            disabled={atStart}
            aria-label="Xem các đánh giá trước"
            className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white shadow-md flex items-center justify-center text-blue-600 hover:bg-blue-50 transition disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white"
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
            aria-label="Xem các đánh giá tiếp theo"
            className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white shadow-md flex items-center justify-center text-blue-600 hover:bg-blue-50 transition disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white"
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
              className="flex transition-transform duration-500 ease-out items-stretch"
              style={{ transform: `translateX(-${safeIndex * slidePercent}%)` }}
            >
              {items.map((item) => (
                <div
                  key={item.id}
                  className="shrink-0 px-3"
                  style={{ width: `${slidePercent}%` }}
                >
                  <TestimonialCard item={item} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
