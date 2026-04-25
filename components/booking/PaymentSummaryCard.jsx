"use client";

import { useEffect, useState } from "react";
import { bookingStorageKey } from "./BookingStep1Form";

const formatDate = (d) => {
  const days = ["CN", "Th 2", "Th 3", "Th 4", "Th 5", "Th 6", "Th 7"];
  const day = days[d.getDay()];
  const date = d.getDate();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();
  return { day, date, month, year };
};

function BenefitList({ ratePlan }) {
  const benefits = ratePlan.benefits || [];
  if (benefits.length === 0) return null;

  return (
    <ul className="space-y-1.5 text-sm">
      {benefits.map((b, i) => {
        if (b.type === "crossed") {
          return (
            <li
              key={i}
              className="flex items-start gap-2 text-slate-400 line-through"
            >
              <svg
                viewBox="0 0 24 24"
                className="w-4 h-4 mt-0.5 shrink-0"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
              <span>{b.text}</span>
            </li>
          );
        }
        if (b.type === "free-cancel") {
          return (
            <li
              key={i}
              className="flex items-start gap-2 text-emerald-600 font-medium"
            >
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
              <span>{b.text}</span>
            </li>
          );
        }
        if (b.type === "gift") {
          return (
            <li key={i} className="flex items-start gap-2 text-sky-600">
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
              <span>{b.text}</span>
            </li>
          );
        }
        if (b.type === "info") {
          return (
            <li key={i}>
              <div className="flex items-center gap-2 text-sky-600 font-semibold">
                <svg
                  viewBox="0 0 24 24"
                  className="w-4 h-4 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="12" r="9" />
                  <line x1="12" y1="16" x2="12" y2="12" />
                  <line x1="12" y1="8" x2="12.01" y2="8" />
                </svg>
                <span>{b.text}</span>
              </div>
              {b.sub && (
                <div className="pl-6 text-xs text-slate-500 mt-0.5">
                  {b.sub}
                </div>
              )}
            </li>
          );
        }
        return (
          <li key={i} className="flex items-start gap-2 text-slate-700">
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
            <span>{b.text}</span>
          </li>
        );
      })}
    </ul>
  );
}

export default function PaymentSummaryCard({
  hotel,
  roomSection,
  ratePlan,
  locationSlug,
  hotelSlug,
}) {
  const [contact, setContact] = useState(null);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(
        bookingStorageKey(locationSlug, hotelSlug, ratePlan.id)
      );
      if (raw) setContact(JSON.parse(raw));
    } catch {
      setContact(null);
    }
  }, [locationSlug, hotelSlug, ratePlan.id]);

  const checkIn = new Date(2026, 4, 3);
  const checkOut = new Date(2026, 4, 4);
  const nights = Math.max(
    1,
    Math.round((checkOut - checkIn) / (1000 * 60 * 60 * 24))
  );
  const ci = formatDate(checkIn);
  const co = formatDate(checkOut);
  const checkInTime = hotel.policies?.checkInFrom || "14:00";
  const checkOutTime = hotel.policies?.checkOutTo || "12:00";
  const bookingCode =
    "135" +
    String(
      (hotel.id || "").split("").reduce((a, c) => a * 31 + c.charCodeAt(0), 0) %
        10000000
    ).padStart(7, "0");

  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
      <div className="bg-sky-50 px-5 py-3 flex items-center gap-3">
        <svg
          viewBox="0 0 24 24"
          className="w-5 h-5 text-sky-600"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 21h18M5 21V7l7-4 7 4v14" />
          <path d="M9 9h1M9 13h1M14 9h1M14 13h1M9 17h6" />
        </svg>
        <div>
          <div className="font-bold text-slate-900">Tóm tắt khách sạn</div>
          <div className="text-xs text-slate-500">
            Mã đặt chỗ <span className="font-semibold">{bookingCode}</span>
          </div>
        </div>
      </div>

      <div className="p-5 space-y-4">
        <h3 className="font-bold text-slate-900 leading-snug">{hotel.name}</h3>

        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 bg-sky-50/40 rounded-xl p-3 text-center">
          <div>
            <div className="text-xs text-slate-500">Nhận phòng</div>
            <div className="font-bold text-slate-900 text-sm">
              {ci.day}, {ci.date} tháng {ci.month} {ci.year}
            </div>
            <div className="text-xs text-slate-500 mt-0.5">
              Từ {checkInTime}
            </div>
          </div>
          <div className="text-xs text-slate-500 whitespace-nowrap">
            {nights} đêm
          </div>
          <div>
            <div className="text-xs text-slate-500">Trả phòng</div>
            <div className="font-bold text-slate-900 text-sm">
              {co.day}, {co.date} tháng {co.month} {co.year}
            </div>
            <div className="text-xs text-slate-500 mt-0.5">
              Trước {checkOutTime}
            </div>
          </div>
        </div>

        <div className="space-y-1.5">
          <div className="font-bold text-slate-900">
            (1x) {ratePlan.planLabel}
          </div>
          <div className="flex items-center gap-1.5 text-sm text-slate-700">
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
            {ratePlan.adults} khách
            {ratePlan.children > 0 && `, ${ratePlan.children} trẻ em`}
          </div>
          <div className="flex items-center gap-1.5 text-sm text-slate-700">
            <svg
              viewBox="0 0 24 24"
              className="w-4 h-4 text-slate-500"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 18v-4a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v4M3 18h18" />
            </svg>
            {ratePlan.bedInfo}
          </div>
        </div>

        <BenefitList ratePlan={ratePlan} />

        <a
          href="#"
          className="inline-flex items-center gap-1 text-sm text-emerald-600 hover:text-emerald-700 font-semibold"
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
            <rect x="3" y="4" width="18" height="18" rx="2" />
            <path d="M16 2v4M8 2v4M3 10h18" />
          </svg>
          Có thể đổi lịch
        </a>
      </div>

      <div className="border-t border-gray-100 p-5 space-y-3 text-sm">
        <div>
          <div className="font-bold text-slate-800">
            Yêu cầu đặc biệt (nếu có)
          </div>
          <div className="text-slate-600 mt-1">
            {contact?.specialRequests?.length
              ? contact.specialRequests.join(", ")
              : "—"}
          </div>
        </div>

        <div>
          <div className="font-bold text-slate-800">Tên khách</div>
          <div className="text-slate-700 mt-1">
            {contact?.guestName || "—"}
          </div>
        </div>

        <div>
          <div className="font-bold text-slate-800">Chi tiết người liên lạc</div>
          <div className="mt-1 space-y-0.5 text-slate-700">
            <div className="flex items-center gap-2">
              <svg
                viewBox="0 0 24 24"
                className="w-4 h-4 text-slate-500"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="8" r="4" />
                <path d="M4 22a8 8 0 0 1 16 0" />
              </svg>
              <span>{contact?.contactName || "—"}</span>
            </div>
            <div className="flex items-center gap-2">
              <svg
                viewBox="0 0 24 24"
                className="w-4 h-4 text-slate-500"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 16.92V21a1 1 0 0 1-1.11 1A19.87 19.87 0 0 1 2 4.11 1 1 0 0 1 3 3h4.09a1 1 0 0 1 1 .75l1.2 4.5a1 1 0 0 1-.29 1L7 11.5a16 16 0 0 0 6.5 6.5l2.25-2a1 1 0 0 1 1-.29l4.5 1.2a1 1 0 0 1 .75 1z" />
              </svg>
              <span>
                {contact?.contactPhoneCountryCode || "+84"}
                {contact?.contactPhone || ""}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <svg
                viewBox="0 0 24 24"
                className="w-4 h-4 text-slate-500"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="M22 7l-10 6L2 7" />
              </svg>
              <span>{contact?.contactEmail || "—"}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-emerald-100 text-emerald-800 text-center text-sm font-semibold py-3">
        Sự lựa chọn tuyệt vời cho kỳ nghỉ của bạn!
      </div>
    </div>
  );
}
