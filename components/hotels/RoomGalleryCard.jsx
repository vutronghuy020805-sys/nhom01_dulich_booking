"use client";

import { useState } from "react";

export default function RoomGalleryCard({ images = [], alt = "" }) {
  const [current, setCurrent] = useState(0);
  const safeImages = images.length > 0 ? images : ["/nhom01_dulich_booking/assets/logo-viego.png"];
  const total = safeImages.length;

  const prev = () =>
    setCurrent((c) => (c - 1 + total) % total);
  const next = () => setCurrent((c) => (c + 1) % total);

  return (
    <div className="relative rounded-xl overflow-hidden bg-gray-100 aspect-[4/3] w-full">
      <img
        src={safeImages[current]}
        alt={alt}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {total > 1 && (
        <>
          <button
            type="button"
            onClick={prev}
            aria-label="Ảnh trước"
            className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/85 hover:bg-white flex items-center justify-center shadow"
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
            onClick={next}
            aria-label="Ảnh tiếp"
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/85 hover:bg-white flex items-center justify-center shadow"
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

          <div className="absolute left-0 right-0 bottom-2 flex items-center justify-center gap-1.5">
            {safeImages.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setCurrent(i)}
                aria-label={`Ảnh ${i + 1}`}
                className={
                  "w-1.5 h-1.5 rounded-full transition-all " +
                  (i === current ? "bg-white w-4" : "bg-white/60")
                }
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
