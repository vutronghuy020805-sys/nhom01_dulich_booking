"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

function ChevronLeft() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}
function ChevronRight() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

export default function FeaturedBlogCarousel({ posts = [] }) {
  const [index, setIndex] = useState(0);
  const count = posts.length;

  useEffect(() => {
    if (count <= 1) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % count);
    }, 6000);
    return () => clearInterval(id);
  }, [count]);

  if (count === 0) return null;

  const prev = () => setIndex((i) => (i - 1 + count) % count);
  const next = () => setIndex((i) => (i + 1) % count);
  const current = posts[index];

  return (
    <section className="relative max-w-350 mx-auto px-4 lg:px-10">
      <div className="relative rounded-2xl overflow-hidden shadow-lg">
        <Link
          href={`/blog/${current.slug}`}
          className="block relative aspect-[21/9] md:aspect-[21/8] bg-slate-800"
          aria-label={current.title}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            key={current.slug}
            src={current.image}
            alt={current.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-b from-black/10 via-black/30 to-black/70" />
          <div className="absolute inset-0 flex flex-col items-center justify-center px-6 md:px-16 text-center text-white">
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-extrabold leading-tight max-w-4xl drop-shadow-xl">
              {current.title}
            </h2>
            <p className="mt-4 text-sm md:text-base font-semibold text-white/90">
              {current.author} · {current.dateLabel}
            </p>
          </div>
        </Link>

        {count > 1 ? (
          <>
            <button
              type="button"
              onClick={prev}
              aria-label="Bài trước"
              className="absolute left-3 md:left-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white text-slate-800 inline-flex items-center justify-center shadow transition"
            >
              <ChevronLeft />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Bài sau"
              className="absolute right-3 md:right-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white text-slate-800 inline-flex items-center justify-center shadow transition"
            >
              <ChevronRight />
            </button>

            <div className="absolute bottom-4 left-0 right-0 flex items-center justify-center gap-1.5">
              {posts.map((p, i) => (
                <button
                  key={p.slug}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`Tới bài ${i + 1}`}
                  className={
                    "w-2 h-2 md:w-2.5 md:h-2.5 rounded-full transition-all " +
                    (i === index
                      ? "bg-white w-6 md:w-8"
                      : "bg-white/60 hover:bg-white/80")
                  }
                />
              ))}
            </div>
          </>
        ) : null}
      </div>
    </section>
  );
}
