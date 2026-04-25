"use client";

import { useState } from "react";

const AMENITY_ICONS = {
  "Máy lạnh": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <rect x="2" y="5" width="20" height="8" rx="2" />
      <path d="M6 16v2M10 16v4M14 16v2M18 16v4" />
    </svg>
  ),
  "Chỗ đậu xe": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M9 17V7h4a3 3 0 0 1 0 6H9" />
    </svg>
  ),
  "Bãi đỗ xe": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M9 17V7h4a3 3 0 0 1 0 6H9" />
    </svg>
  ),
  "Nhà hàng": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M4 2v8a4 4 0 0 0 8 0V2M8 2v20M16 2v20M20 2c0 6-2 8-2 12v8" />
    </svg>
  ),
  "Thang máy": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <rect x="4" y="3" width="16" height="18" rx="1" />
      <path d="M8 8l2-2 2 2M14 16l2 2 2-2" />
    </svg>
  ),
  "Hồ bơi": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M2 20c2-1 4-1 6 0s4 1 6 0 4-1 6 0M2 16c2-1 4-1 6 0s4 1 6 0 4-1 6 0M6 14V5a2 2 0 0 1 4 0M14 14V5a2 2 0 0 1 4 0" />
    </svg>
  ),
  "WiFi": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M5 12.55a11 11 0 0 1 14 0M8.5 16.5a5 5 0 0 1 7 0M2 8.82a15 15 0 0 1 20 0" />
      <circle cx="12" cy="20" r="1" fill="currentColor" />
    </svg>
  ),
  "WiFi miễn phí": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M5 12.55a11 11 0 0 1 14 0M8.5 16.5a5 5 0 0 1 7 0M2 8.82a15 15 0 0 1 20 0" />
      <circle cx="12" cy="20" r="1" fill="currentColor" />
    </svg>
  ),
  "Lễ tân 24/7": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </svg>
  ),
  "Lễ tân 24h": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </svg>
  ),
  "Bữa sáng": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8zM6 1v3M10 1v3M14 1v3" />
    </svg>
  ),
  "Điều hòa": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <rect x="2" y="5" width="20" height="8" rx="2" />
      <path d="M6 16v2M10 16v4M14 16v2M18 16v4" />
    </svg>
  ),
};

const DEFAULT_ICON = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <circle cx="12" cy="12" r="9" />
    <path d="M9 12l2 2 4-4" />
  </svg>
);

const PRIMARY_AMENITIES_ORDER = [
  "Máy lạnh",
  "Chỗ đậu xe",
  "Nhà hàng",
  "Thang máy",
  "Hồ bơi",
  "WiFi",
  "WiFi miễn phí",
  "Lễ tân 24h",
  "Lễ tân 24/7",
  "Bữa sáng",
  "Điều hòa",
  "Bãi đỗ xe",
];

const pickPrimaryAmenities = (all) => {
  const found = PRIMARY_AMENITIES_ORDER.filter((name) => all.includes(name));
  for (const name of all) {
    if (!found.includes(name)) found.push(name);
    if (found.length >= 7) break;
  }
  return found.slice(0, 7);
};

const COLLAPSED_CHARS = 280;

export default function HotelDetailInfoPanel({ hotel }) {
  const [descExpanded, setDescExpanded] = useState(false);
  const [amenitiesExpanded, setAmenitiesExpanded] = useState(false);

  const primaryAmenities = amenitiesExpanded
    ? hotel.amenities
    : pickPrimaryAmenities(hotel.amenities);

  const description = hotel.longDescription || hotel.description || "";
  const needsTruncate = description.length > COLLAPSED_CHARS;
  const displayedDesc =
    descExpanded || !needsTruncate
      ? description
      : description.slice(0, COLLAPSED_CHARS).trimEnd() + "…";

  return (
    <section className="mt-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <ReviewColumn hotel={hotel} />
        <NearbyColumn hotel={hotel} />
        <AmenitiesColumn
          amenities={primaryAmenities}
          expanded={amenitiesExpanded}
          onToggle={() => setAmenitiesExpanded((v) => !v)}
        />
      </div>

      <div className="mt-6 bg-white border border-gray-200 rounded-2xl p-6">
        <div className="prose max-w-none text-sm md:text-base text-slate-700 leading-relaxed whitespace-pre-line">
          {displayedDesc}
        </div>
        {needsTruncate && (
          <button
            type="button"
            onClick={() => setDescExpanded((v) => !v)}
            className="mt-3 inline-flex items-center gap-1 text-sky-600 hover:text-sky-700 font-semibold text-sm"
          >
            {descExpanded ? "Thu gọn" : "Xem thêm"}
            <svg
              viewBox="0 0 24 24"
              className={
                "w-4 h-4 transition-transform " +
                (descExpanded ? "rotate-180" : "")
              }
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
        )}
      </div>
    </section>
  );
}

function ReviewColumn({ hotel }) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5">
      <div className="flex items-baseline gap-2">
        <span className="text-3xl font-bold text-sky-600">
          {hotel.reviewScore}
        </span>
        <div>
          <div className="font-semibold text-slate-800">{hotel.reviewLabel}</div>
          <button
            type="button"
            className="text-xs text-sky-600 hover:text-sky-700 inline-flex items-center gap-0.5"
          >
            {hotel.reviewCount}
            <svg viewBox="0 0 24 24" className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      </div>

      <h4 className="mt-4 text-sm font-bold text-slate-800">
        Khách nói gì về kỳ nghỉ của họ
      </h4>
      <div className="mt-2 flex flex-wrap gap-1.5">
        {hotel.reviewTags.map((tag) => (
          <span
            key={tag.name}
            className="text-xs bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full font-medium"
          >
            {tag.name} ({tag.count})
          </span>
        ))}
      </div>

      <div className="mt-4 max-h-60 overflow-y-auto pr-1 space-y-3">
        {hotel.featuredReviews.map((r, idx) => (
          <div
            key={idx}
            className="border border-gray-200 rounded-xl p-3 bg-slate-50/60"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="font-semibold text-slate-800 text-sm">
                {r.name}
              </div>
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-sky-600 shrink-0">
                <svg viewBox="0 0 24 24" className="w-3 h-3" fill="currentColor">
                  <path d="M12 2l3 7h7l-5.5 4 2 7L12 16l-6.5 4 2-7L2 9h7z" />
                </svg>
                {r.score.toFixed(1).replace(".", ",")} / 10
              </span>
            </div>
            <p className="mt-1.5 text-xs text-slate-600 leading-relaxed line-clamp-3">
              {r.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function NearbyColumn({ hotel }) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-slate-800">Trong khu vực</h3>
        <a
          href="#location"
          className="text-xs font-semibold text-sky-600 hover:text-sky-700 inline-flex items-center gap-0.5"
        >
          Xem bản đồ
          <svg viewBox="0 0 24 24" className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </a>
      </div>

      <p className="mt-3 flex items-start gap-2 text-sm text-slate-700 leading-relaxed">
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-red-400 shrink-0 mt-0.5">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
        </svg>
        <span>{hotel.fullAddress}</span>
      </p>

      {hotel.nearbyBadge && (
        <div className="mt-2 inline-flex items-center gap-1 text-xs bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full font-medium">
          <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="9" />
            <path d="M12 8v4l2 2" />
          </svg>
          {hotel.nearbyBadge}
        </div>
      )}

      <ul className="mt-4 space-y-2.5">
        {hotel.nearbyPlaces.map((p, idx) => (
          <li
            key={idx}
            className="flex items-center justify-between text-sm text-slate-700"
          >
            <span className="flex items-center gap-2 min-w-0">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-red-400 shrink-0">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
              </svg>
              <span className="truncate">{p.name}</span>
            </span>
            <span className="text-xs text-slate-500 shrink-0 ml-3">
              {p.distance}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function AmenitiesColumn({ amenities, expanded, onToggle }) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-slate-800">Tiện ích chính</h3>
        <button
          type="button"
          onClick={onToggle}
          className="text-xs font-semibold text-sky-600 hover:text-sky-700 inline-flex items-center gap-0.5"
        >
          {expanded ? "Thu gọn" : "Xem thêm"}
          <svg viewBox="0 0 24 24" className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-3">
        {amenities.map((a) => (
          <li
            key={a}
            className="flex items-center gap-2 text-sm text-slate-700"
          >
            <span className="text-sky-600 shrink-0">
              {AMENITY_ICONS[a] || DEFAULT_ICON}
            </span>
            <span className="truncate">{a}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
