"use client";

import { useEffect, useState } from "react";

const vouchers = [
  { id: "v1", image: "/nhom01_dulich_booking/assets/vouchers/voucher-1.svg", alt: "Ưu đãi khuyến mãi 1" },
  { id: "v2", image: "/nhom01_dulich_booking/assets/vouchers/voucher-2.svg", alt: "Ưu đãi khuyến mãi 2" },
  { id: "v3", image: "/nhom01_dulich_booking/assets/vouchers/voucher-3.svg", alt: "Ưu đãi khuyến mãi 3" },
  { id: "v4", image: "/nhom01_dulich_booking/assets/vouchers/voucher-4.svg", alt: "Ưu đãi khuyến mãi 4" },
  { id: "v5", image: "/nhom01_dulich_booking/assets/vouchers/voucher-5.svg", alt: "Ưu đãi khuyến mãi 5" },
  { id: "v6", image: "/nhom01_dulich_booking/assets/vouchers/voucher-6.svg", alt: "Ưu đãi khuyến mãi 6" },
];

export default function LocationOffersSection() {
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

  const maxIndex = Math.max(0, vouchers.length - visibleCount);
  const safeIndex = Math.min(index, maxIndex);
  const atStart = safeIndex === 0;
  const atEnd = safeIndex >= maxIndex;

  const prev = () => setIndex((i) => Math.max(0, i - 1));
  const next = () => setIndex((i) => Math.min(maxIndex, i + 1));

  const slidePercent = 100 / visibleCount;

  return (
    <section className="bg-gray-50 pt-16 pb-8 px-4">
      <div className="max-w-350 mx-auto">
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-blue-50 mb-4">
          <span className="text-blue-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path d="M12 2 9.09 8.26 2 9.27l5.18 5.05L5.82 21 12 17.77 18.18 21l-1.36-6.68L22 9.27l-7.09-1.01L12 2z" />
            </svg>
          </span>
          <h2 className="text-xl md:text-2xl font-bold text-slate-800">
            Khám phá ưu đãi
          </h2>
        </div>

        <h3 className="text-2xl md:text-3xl font-bold text-slate-800 mb-8">
          Tất cả ưu đãi khuyến mãi
        </h3>

        <div className="relative">
          <button
            type="button"
            onClick={prev}
            disabled={atStart}
            aria-label="Xem các ưu đãi trước"
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
            aria-label="Xem các ưu đãi tiếp theo"
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
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${safeIndex * slidePercent}%)` }}
            >
              {vouchers.map((v) => (
                <div
                  key={v.id}
                  className="shrink-0 px-3"
                  style={{ width: `${slidePercent}%` }}
                >
                  <div className="relative w-full aspect-[2/1] rounded-2xl overflow-hidden bg-white shadow-sm">
                    <img
                      src={v.image}
                      alt={v.alt}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
