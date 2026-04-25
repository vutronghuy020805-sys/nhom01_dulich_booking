"use client";

import { useState } from "react";
import Link from "next/link";
import { parseRouteString } from "./flightCities";
import { parseVnDealDate } from "./flightResultsData";

export default function FlightDealCard({ card, image }) {
  const [favorite, setFavorite] = useState(false);

  const parsed = parseRouteString(card.route);
  const iso = parseVnDealDate(card.date);
  const query = new URLSearchParams();
  query.set("price", String(card.price));
  if (iso) query.set("date", iso);
  if (card.tripType) query.set("tripType", card.tripType.toLowerCase().replace(/\s+/g, "-"));
  const href = parsed
    ? `/flights/search/${parsed.from.slug}/${parsed.to.slug}?${query.toString()}`
    : "#";

  const handleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setFavorite((v) => !v);
  };

  return (
    <Link
      href={href}
      className="shrink-0 w-64 md:w-72 snap-start block rounded-2xl focus:outline-none focus:ring-2 focus:ring-sky-400"
    >
      <article className="bg-white rounded-2xl border border-gray-200 hover:shadow-md transition overflow-hidden h-full">
        <div className="relative aspect-[4/3] bg-gray-100">
          <img
            src={card.image || image}
            alt={card.route}
            className="absolute inset-0 w-full h-full object-cover"
          />

          <span className="absolute top-3 left-3 bg-sky-700 text-white text-[10px] font-bold tracking-wide px-2 py-1 rounded">
            {card.tripType}
          </span>

          <button
            type="button"
            onClick={handleFavorite}
            aria-pressed={favorite}
            className="absolute top-3 right-3 w-8 h-8 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow"
          >
            <svg
              viewBox="0 0 24 24"
              className={
                "w-4 h-4 transition " +
                (favorite ? "text-sky-600" : "text-slate-500")
              }
              fill={favorite ? "currentColor" : "none"}
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
            </svg>
          </button>
        </div>

        <div className="p-4">
          <h3 className="font-bold text-slate-900 leading-tight">
            {card.route}
          </h3>
          <div className="text-xs text-slate-500 mt-1">{card.date}</div>
          <div className="mt-3 flex items-baseline gap-2">
            {card.oldPrice && (
              <span className="text-xs text-slate-400 line-through">
                {card.oldPrice.toLocaleString("vi-VN")} VND
              </span>
            )}
            <span className="text-orange-500 font-bold">
              {card.price.toLocaleString("vi-VN")} VND
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
