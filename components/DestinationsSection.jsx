"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const destinations = [
  { id: 1, name: "Đà Nẵng", activities: 931, image: "/nhom01_dulich_booking/assets/destinations/danang.jpg" },
  { id: 2, name: "Đà Lạt", activities: 443, image: "/nhom01_dulich_booking/assets/destinations/dalat.jpg" },
  { id: 3, name: "Nha Trang", activities: 613, image: "/nhom01_dulich_booking/assets/destinations/nhatrang.jpg" },
  { id: 4, name: "Phú Quốc", activities: 362, image: "/nhom01_dulich_booking/assets/destinations/phuquoc.jpg" },
  { id: 5, name: "Hạ Long", activities: 324, image: "/nhom01_dulich_booking/assets/destinations/halong.jpeg" },
  { id: 6, name: "Hội An", activities: 261, image: "/nhom01_dulich_booking/assets/destinations/hoian.jpg" },
  { id: 7, name: "Hà Nội", activities: 812, image: "/nhom01_dulich_booking/assets/destinations/hanoi.jpg" },
  { id: 8, name: "TP Hồ Chí Minh", activities: 1024, image: "/nhom01_dulich_booking/assets/destinations/hcm.jpeg" },
  { id: 9, name: "Sa Pa", activities: 287, image: "/nhom01_dulich_booking/assets/destinations/sapa.webp" },
  { id: 10, name: "Huế", activities: 198, image: "/nhom01_dulich_booking/assets/destinations/hue.jpg" },
];

function useItemsPerView() {
  const [items, setItems] = useState(6);

  useEffect(() => {
    const compute = () => {
      const w = window.innerWidth;
      if (w < 640) return 1;
      if (w < 768) return 2;
      if (w < 1024) return 3;
      if (w < 1280) return 4;
      return 6;
    };

    const onResize = () => setItems(compute());
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return items;
}

export default function DestinationsSection() {
  const itemsPerView = useItemsPerView();
  const [index, setIndex] = useState(0);

  const maxIndex = Math.max(0, destinations.length - itemsPerView);
  const safeIndex = Math.min(index, maxIndex);

  const canPrev = safeIndex > 0;
  const canNext = safeIndex < maxIndex;

  const handlePrev = () => canPrev && setIndex((i) => Math.max(0, i - 1));
  const handleNext = () => canNext && setIndex((i) => Math.min(maxIndex, i + 1));

  const slideWidthPct = 100 / itemsPerView;
  const translatePct = safeIndex * slideWidthPct;

  return (
    <section className="bg-white py-16 px-4">
      <div className="max-w-350 mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Bạn muốn đi đâu chơi?
          </h2>
          <Link
            href="/flights"
            className="text-sm md:text-base font-medium text-gray-800 underline underline-offset-4 hover:text-blue-600 transition-colors"
          >
            Xem thêm
          </Link>
        </div>

        <div className="relative">
          <button
            type="button"
            aria-label="Địa điểm trước"
            onClick={handlePrev}
            disabled={!canPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 w-11 h-11 rounded-full bg-white shadow-md flex items-center justify-center transition hover:shadow-lg disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 text-gray-700"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${translatePct}%)` }}
            >
              {destinations.map((dest) => (
                <div
                  key={dest.id}
                  className="shrink-0 px-2"
                  style={{ width: `${slideWidthPct}%` }}
                >
                  <Link
                    href="/flights"
                    aria-label={`Xem vé máy bay đến ${dest.name}`}
                    className="relative block w-full aspect-3/4 rounded-3xl overflow-hidden bg-gray-100 shadow-sm group focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    <Image
                      src={dest.image}
                      alt={dest.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 17vw"
                      className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent" />
                    <div className="absolute bottom-0 left-0 p-5 text-white">
                      <h3 className="text-lg md:text-xl font-bold mb-1 drop-shadow">
                        {dest.name}
                      </h3>
                      <p className="text-xs md:text-sm text-white/90">
                        {dest.activities} hoạt động
                      </p>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          <button
            type="button"
            aria-label="Địa điểm tiếp theo"
            onClick={handleNext}
            disabled={!canNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10 w-11 h-11 rounded-full bg-white shadow-md flex items-center justify-center transition hover:shadow-lg disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 text-gray-700"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
