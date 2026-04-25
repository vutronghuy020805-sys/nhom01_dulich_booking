"use client";

import { useRef, useState } from "react";
import FlightDealCard from "./FlightDealCard";
import { domesticFlightDeals, tabOrder } from "./domesticFlightDeals";

function PlaneIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-6 h-6 text-sky-600"
      fill="currentColor"
      aria-hidden
    >
      <path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5z" />
    </svg>
  );
}

export default function DomesticBestFareSection() {
  const [activeTab, setActiveTab] = useState(tabOrder[0]);
  const scrollRef = useRef(null);

  const data = domesticFlightDeals[activeTab];
  const cards = data?.cards || [];
  const image = data?.destinationImage;

  const scrollByAmount = (delta) => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: delta, behavior: "smooth" });
  };

  return (
    <section className="max-w-375 mx-auto px-6 lg:px-10 pt-10 pb-6">
      <h2 className="flex items-center gap-3 text-xl md:text-2xl font-bold text-slate-900 mb-4">
        <PlaneIcon />
        Vé máy bay nội địa giá tốt nhất!
      </h2>

      <div className="flex gap-2 overflow-x-auto pb-3 mb-4 -mx-1 px-1">
        {tabOrder.map((t) => {
          const isActive = t === activeTab;
          return (
            <button
              key={t}
              type="button"
              onClick={() => setActiveTab(t)}
              className={
                "shrink-0 px-4 py-2 rounded-full text-sm font-semibold transition whitespace-nowrap " +
                (isActive
                  ? "bg-sky-600 text-white shadow"
                  : "bg-sky-50 text-sky-700 hover:bg-sky-100")
              }
            >
              {domesticFlightDeals[t].label}
            </button>
          );
        })}
      </div>

      <div className="relative">
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2 -mx-1 px-1 no-scrollbar"
        >
          {cards.map((card) => (
            <FlightDealCard key={card.id} card={card} image={image} />
          ))}
        </div>

        <button
          type="button"
          onClick={() => scrollByAmount(-320)}
          aria-label="Kéo trái"
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
          aria-label="Kéo phải"
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
        <a
          href="#"
          className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-sky-300 hover:bg-sky-400 text-sky-900 font-bold text-sm md:text-base transition"
        >
          Xem thêm ưu đãi bay
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
        </a>
      </div>
    </section>
  );
}
