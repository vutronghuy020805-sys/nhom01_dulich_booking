"use client";

import { useRef } from "react";
import Link from "next/link";
import BusAmenityIcons from "./BusAmenityIcons";

function HeartIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-4 h-4 text-rose-500"
      fill="currentColor"
      aria-hidden
    >
      <path d="M12 21s-7-4.5-9.5-9A5.5 5.5 0 0 1 12 6a5.5 5.5 0 0 1 9.5 6C19 16.5 12 21 12 21z" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-3 h-3 text-sky-500"
      fill="currentColor"
      aria-hidden
    >
      <path d="M12 2l2.9 6.9 7.1.6-5.4 4.7 1.7 7-6.3-3.9-6.3 3.9 1.7-7L2 9.5l7.1-.6z" />
    </svg>
  );
}

function BestCard({ trip }) {
  return (
    <article className="shrink-0 w-80 md:w-96 bg-white rounded-2xl border border-slate-200 overflow-hidden snap-start flex flex-col">
      <div
        className="w-full aspect-[16/9] bg-slate-300 bg-cover bg-center"
        style={{ backgroundImage: `url('${trip.operator.image}')` }}
        role="img"
        aria-label={trip.operator.name}
      />
      <div className="p-4 flex-1 flex flex-col">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="font-bold text-slate-900 truncate">
              {trip.operator.name}
            </div>
            <div className="text-xs text-slate-500 mt-1 line-clamp-2">
              {trip.operator.vehicleShort}
            </div>
          </div>
          <div className="text-right shrink-0">
            <div className="text-orange-500 font-bold">{trip.priceLabel}</div>
            <div className="text-xs text-slate-500">/chỗ ngồi</div>
          </div>
        </div>

        <div className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-sky-700 bg-sky-50 border border-sky-100 px-2 py-0.5 rounded-full w-fit">
          <StarIcon />
          {trip.rating}/5
        </div>

        <div className="mt-3 space-y-2 text-sm">
          <div className="flex items-start gap-3">
            <div className="w-12 shrink-0 font-semibold text-slate-800">
              {trip.departureTime}
            </div>
            <div className="flex items-center gap-2 min-w-0">
              <span className="w-2 h-2 rounded-full border-2 border-sky-500" />
              <span className="text-slate-600 truncate">{trip.pickup.name}</span>
            </div>
          </div>
          <div className="flex items-start gap-3 text-xs text-slate-500 pl-14">
            {trip.duration}
          </div>
          <div className="flex items-start gap-3">
            <div className="w-12 shrink-0 font-semibold text-slate-800">
              {trip.arrivalTime}
            </div>
            <div className="flex items-center gap-2 min-w-0">
              <span className="w-2 h-2 rounded-full bg-sky-500" />
              <span className="text-slate-600 truncate">{trip.dropoff.name}</span>
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <BusAmenityIcons amenities={trip.amenities} />
          <Link
            href={trip.bookingHref || "#"}
            className="text-xs font-semibold text-sky-600 hover:text-sky-700"
          >
            Xem chi tiết
          </Link>
        </div>

        <Link
          href={trip.bookingHref || "#"}
          className="mt-3 inline-flex items-center justify-center py-2 rounded-md bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm transition"
        >
          Đặt Ngay
        </Link>
      </div>
    </article>
  );
}

export default function BestBusResultsCarousel({ bestResults }) {
  const scrollRef = useRef(null);

  if (!bestResults || bestResults.length === 0) return null;

  const scrollBy = (delta) => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: delta, behavior: "smooth" });
  };

  return (
    <section className="bg-rose-50/60 border border-rose-100 rounded-2xl p-5">
      <div className="flex items-center justify-between gap-3 mb-4">
        <h3 className="flex items-center gap-2 text-base md:text-lg font-bold text-rose-700">
          <HeartIcon />
          Tốt nhất cho tìm kiếm của bạn
          <svg
            viewBox="0 0 24 24"
            className="w-4 h-4 text-slate-400"
            fill="currentColor"
            aria-hidden
          >
            <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="1.6" />
            <path
              d="M12 8v4M12 16h.01"
              stroke="currentColor"
              strokeWidth="1.6"
              fill="none"
              strokeLinecap="round"
            />
          </svg>
        </h3>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => scrollBy(-360)}
            aria-label="Xem kết quả trước đó"
            className="w-9 h-9 rounded-full bg-white border border-slate-200 flex items-center justify-center hover:bg-slate-50 shadow-sm"
          >
            <svg
              viewBox="0 0 24 24"
              className="w-4 h-4 text-slate-600"
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
            onClick={() => scrollBy(360)}
            aria-label="Xem kết quả tiếp theo"
            className="w-9 h-9 rounded-full bg-white border border-slate-200 flex items-center justify-center hover:bg-slate-50 shadow-sm"
          >
            <svg
              viewBox="0 0 24 24"
              className="w-4 h-4 text-slate-600"
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
      </div>

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar pb-1"
      >
        {bestResults.map((trip) => (
          <BestCard key={trip.id} trip={trip} />
        ))}
      </div>
    </section>
  );
}
