"use client";

import { useState } from "react";
import Link from "next/link";
import RoomGalleryCard from "./RoomGalleryCard";

const COLLAPSED_COUNT = 2;

export default function HotelRoomSelectionPanel({ hotel }) {
  const sections = hotel.roomSections || [];

  if (sections.length === 0) return null;

  return (
    <div className="space-y-8">
      {sections.map((section) => (
        <RoomSectionBlock key={section.id} section={section} hotel={hotel} />
      ))}
    </div>
  );
}

function RoomSectionBlock({ section, hotel }) {
  const [expanded, setExpanded] = useState(false);
  const plans = section.ratePlans || [];
  const hasMore = plans.length > COLLAPSED_COUNT;
  const visiblePlans = expanded ? plans : plans.slice(0, COLLAPSED_COUNT);

  return (
    <article className="border border-gray-200 rounded-2xl overflow-hidden bg-white">
      <div className="px-5 pt-5 pb-2">
        <h3 className="text-lg font-bold text-slate-900">
          {section.roomTitle}
        </h3>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] divide-y lg:divide-y-0 lg:divide-x divide-gray-200">
        <RoomInfoCol section={section} />
        <div className="flex flex-col">
          <RateTableHeader />
          <div className="divide-y divide-gray-200">
            {visiblePlans.map((plan) => (
              <RatePlanRow
                key={plan.id}
                plan={plan}
                hotel={hotel}
                sectionId={section.id}
              />
            ))}
          </div>

          {hasMore && (
            <div className="py-3 text-center border-t border-gray-200">
              <button
                type="button"
                onClick={() => setExpanded((v) => !v)}
                className="inline-flex items-center gap-1 text-sky-600 hover:text-sky-700 font-semibold text-sm"
              >
                {expanded ? "Ẩn bớt phòng" : "Xem các loại phòng"}
                <svg
                  viewBox="0 0 24 24"
                  className={
                    "w-4 h-4 transition-transform " +
                    (expanded ? "rotate-180" : "")
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
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

function RoomInfoCol({ section }) {
  return (
    <div className="p-5 bg-sky-50/40">
      <RoomGalleryCard images={section.roomImages} alt={section.roomTitle} />

      {section.highlightText && (
        <div className="mt-3 text-xs text-sky-700 font-semibold">
          {section.highlightText}
        </div>
      )}

      <div className="mt-3 flex items-center gap-2 text-sm text-slate-800">
        <svg
          viewBox="0 0 24 24"
          className="w-4 h-4 text-sky-600"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 21h18M5 21V7l7-4 7 4v14" />
          <path d="M9 9h6v6H9z" />
        </svg>
        <span className="font-semibold">{section.area}</span>
      </div>

      <ul className="mt-3 grid grid-cols-2 gap-y-2 gap-x-3 text-xs text-slate-600">
        {section.features.map((f) => (
          <li key={f} className="flex items-center gap-1.5">
            <svg
              viewBox="0 0 24 24"
              className="w-3.5 h-3.5 text-sky-500 shrink-0"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <span className="truncate">{f}</span>
          </li>
        ))}
      </ul>

      {section.detailLinkText && (
        <a
          href="#"
          className="mt-4 inline-flex items-center gap-1.5 text-sky-600 hover:text-sky-700 font-semibold text-sm"
        >
          <svg
            viewBox="0 0 24 24"
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="3" width="7" height="7" rx="1" />
            <rect x="14" y="3" width="7" height="7" rx="1" />
            <rect x="3" y="14" width="7" height="7" rx="1" />
            <rect x="14" y="14" width="7" height="7" rx="1" />
          </svg>
          {section.detailLinkText}
        </a>
      )}
    </div>
  );
}

function RateTableHeader() {
  return (
    <div className="hidden md:grid grid-cols-[1fr_90px_200px_140px] gap-3 px-4 py-3 bg-gray-50 text-xs uppercase font-semibold text-slate-600">
      <div>Lựa chọn phòng</div>
      <div>Khách</div>
      <div className="text-right">Giá/phòng/đêm</div>
      <div className="text-center">Phòng</div>
    </div>
  );
}

function RatePlanRow({ plan, hotel, sectionId }) {
  return (
    <div className="relative grid grid-cols-1 md:grid-cols-[1fr_90px_200px_140px] gap-3 px-4 py-4">
      {plan.ribbon && (
        <div className="absolute -top-0 right-[340px] hidden md:flex items-center gap-1 bg-emerald-500 text-white text-xs font-semibold px-3 py-1 rounded-br-md rounded-tl-md">
          <svg
            viewBox="0 0 24 24"
            className="w-3 h-3"
            fill="currentColor"
          >
            <path d="M21 10.5h-2.2a5 5 0 0 0-1-2.3L19.3 7 18 5.7l-1.2 1.4a5 5 0 0 0-2.3-1V3h-2v2.2a5 5 0 0 0-2.3 1L9 5 7.7 6.3l1.4 1.2a5 5 0 0 0-1 2.3H5v2h2.2a5 5 0 0 0 1 2.3L7 15l1.3 1.3 1.2-1.4a5 5 0 0 0 2.3 1V19h2v-2.2a5 5 0 0 0 2.3-1L17 17l1.3-1.3-1.4-1.2a5 5 0 0 0 1-2.3H21v-2z" />
          </svg>
          {plan.ribbon}
        </div>
      )}

      <PlanInfoCell plan={plan} />
      <GuestCell plan={plan} />
      <PriceCell plan={plan} />
      <RoomsCell plan={plan} hotel={hotel} sectionId={sectionId} />
    </div>
  );
}

function PlanInfoCell({ plan }) {
  return (
    <div className="min-w-0">
      <div className="text-xs text-slate-500">{plan.planLabel}</div>
      <div className="mt-0.5 font-bold text-slate-900">{plan.headline}</div>
      <div className="mt-2 flex items-center gap-1.5 text-xs text-slate-500">
        <svg
          viewBox="0 0 24 24"
          className="w-3.5 h-3.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 18v-4a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v4M3 18h18M5 11V8a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v3" />
        </svg>
        <span>{plan.bedInfo}</span>
      </div>

      <ul className="mt-2 space-y-1.5">
        {plan.benefits.map((b, i) => (
          <BenefitLine key={i} benefit={b} />
        ))}
      </ul>
    </div>
  );
}

function BenefitLine({ benefit }) {
  if (benefit.type === "gift") {
    return (
      <li className="flex items-start gap-1.5 text-sm text-sky-600">
        <svg
          viewBox="0 0 24 24"
          className="w-4 h-4 mt-0.5 shrink-0"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="20 12 20 22 4 22 4 12" />
          <rect x="2" y="7" width="20" height="5" />
          <line x1="12" y1="22" x2="12" y2="7" />
          <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7zM12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
        </svg>
        <span className="font-medium">{benefit.text}</span>
      </li>
    );
  }
  if (benefit.type === "crossed") {
    return (
      <li className="flex items-start gap-1.5 text-sm text-slate-400 line-through">
        <svg
          viewBox="0 0 24 24"
          className="w-4 h-4 mt-0.5 shrink-0"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
        <span>{benefit.text}</span>
      </li>
    );
  }
  if (benefit.type === "free-cancel") {
    return (
      <li className="flex items-start gap-1.5 text-sm text-emerald-600">
        <svg
          viewBox="0 0 24 24"
          className="w-4 h-4 mt-0.5 shrink-0"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
        <span className="font-semibold">{benefit.text}</span>
        <svg
          viewBox="0 0 24 24"
          className="w-3.5 h-3.5 mt-0.5 text-slate-400"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="9" />
          <line x1="12" y1="16" x2="12" y2="12" />
          <line x1="12" y1="8" x2="12.01" y2="8" />
        </svg>
      </li>
    );
  }
  if (benefit.type === "info") {
    return (
      <li className="text-sm">
        <div className="flex items-center gap-1.5 text-sky-600 font-semibold">
          <svg
            viewBox="0 0 24 24"
            className="w-4 h-4 shrink-0"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="9" />
            <line x1="12" y1="16" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12.01" y2="8" />
          </svg>
          <span>{benefit.text}</span>
        </div>
        {benefit.sub && (
          <div className="pl-5 text-xs text-slate-500 mt-0.5">
            {benefit.sub}
          </div>
        )}
      </li>
    );
  }
  return (
    <li className="flex items-start gap-1.5 text-sm text-slate-600">
      <svg
        viewBox="0 0 24 24"
        className="w-4 h-4 mt-0.5 text-slate-400 shrink-0"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="20 6 9 17 4 12" />
      </svg>
      <span>{benefit.text}</span>
    </li>
  );
}

function GuestCell({ plan }) {
  return (
    <div className="flex items-start md:items-center md:justify-start">
      <div className="relative group inline-flex items-center gap-1 text-sm text-slate-700 cursor-help">
        <svg
          viewBox="0 0 24 24"
          className="w-4 h-4 text-slate-600"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
        </svg>
        <span className="font-semibold">{plan.adults}</span>
        {plan.children > 0 && (
          <svg
            viewBox="0 0 24 24"
            className="w-3.5 h-3.5 text-slate-600"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="5" r="3" />
            <path d="M9 22v-5l-2-2v-3a5 5 0 0 1 10 0v3l-2 2v5" />
          </svg>
        )}

        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition">
          <div className="bg-slate-800 text-white text-xs px-3 py-1.5 rounded-lg whitespace-nowrap shadow-lg">
            {plan.guestLabel}
          </div>
          <div className="w-2 h-2 bg-slate-800 rotate-45 absolute left-1/2 -translate-x-1/2 -top-1" />
        </div>
      </div>
    </div>
  );
}

function PriceCell({ plan }) {
  return (
    <div className="md:text-right">
      {plan.badge && (
        <span className="inline-block bg-orange-400 text-white text-[10px] font-bold px-2 py-0.5 rounded mb-1">
          {plan.badge}
        </span>
      )}
      {plan.oldPrice && (
        <div className="text-xs text-slate-400 line-through">
          {plan.oldPrice.toLocaleString("vi-VN")} VND
        </div>
      )}
      <div className="text-orange-500 font-bold text-lg leading-tight">
        {plan.price.toLocaleString("vi-VN")} VND
      </div>
      <div className="text-[11px] text-slate-400">
        Chưa bao gồm thuế và phí
      </div>
    </div>
  );
}

function RoomsCell({ plan, hotel, sectionId }) {
  const locationSlug = hotel.locationSlug || hotel.location;
  const bookingHref = `/booking/${locationSlug}/${hotel.slug}?roomSectionId=${encodeURIComponent(
    sectionId
  )}&ratePlanId=${encodeURIComponent(plan.id)}`;

  return (
    <div className="md:text-center md:flex md:flex-col md:items-center md:justify-start">
      <div className="text-xs text-slate-500 mb-1">x{plan.roomsAvailable}</div>
      <Link
        href={bookingHref}
        className="w-full md:w-20 px-4 py-2 rounded-lg font-bold text-sm transition bg-sky-500 hover:bg-sky-600 text-white text-center"
      >
        Chọn
      </Link>
      {plan.roomsAvailable <= 4 && (
        <div className="text-red-500 text-xs mt-2 font-medium text-center leading-tight">
          Chỉ còn {plan.roomsAvailable} phòng
        </div>
      )}
      {plan.recommended && (
        <div className="text-red-500 text-xs mt-1 font-semibold">
          Được nhiều người chọn!
        </div>
      )}
    </div>
  );
}
