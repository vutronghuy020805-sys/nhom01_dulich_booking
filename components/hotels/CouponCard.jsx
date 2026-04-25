"use client";

import { useState } from "react";

const iconMap = {
  flight: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-5 h-5"
    >
      <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
    </svg>
  ),
  hotel: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-5 h-5"
    >
      <path d="M7 13c1.66 0 3-1.34 3-3S8.66 7 7 7s-3 1.34-3 3 1.34 3 3 3zm12-6h-8v7H3V5H1v15h2v-3h18v3h2v-9c0-2.21-1.79-4-4-4z" />
    </svg>
  ),
  attraction: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-5 h-5"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  ),
  weekend: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-5 h-5"
    >
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M8 3v4" />
      <path d="M16 3v4" />
      <path d="M3 10h18" />
    </svg>
  ),
  gift: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-5 h-5"
    >
      <rect x="3" y="8" width="18" height="4" rx="1" />
      <path d="M12 8v13" />
      <path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7" />
      <path d="M7.5 8a2.5 2.5 0 0 1 0-5C10 3 12 8 12 8S14 3 16.5 3a2.5 2.5 0 0 1 0 5" />
    </svg>
  ),
};

const iconColorMap = {
  flight: "bg-blue-100 text-blue-600",
  hotel: "bg-indigo-100 text-indigo-600",
  attraction: "bg-red-100 text-red-500",
  weekend: "bg-amber-100 text-amber-600",
  gift: "bg-pink-100 text-pink-600",
};

export default function CouponCard({ coupon }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(coupon.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.warn("Không thể copy mã:", err);
    }
  };

  const icon = iconMap[coupon.type] || iconMap.gift;
  const iconColor = iconColorMap[coupon.type] || iconColorMap.gift;

  return (
    <article className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col h-full">
      <div className="p-5 flex-1">
        <div className="flex items-start gap-3">
          <span
            className={`inline-flex items-center justify-center w-10 h-10 rounded-full shrink-0 ${iconColor}`}
          >
            {icon}
          </span>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-slate-800 text-sm leading-snug line-clamp-2">
              {coupon.title}
            </h3>
            <p className="text-xs text-gray-500 mt-1.5 line-clamp-2">
              {coupon.description}
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-dashed border-gray-200 px-5 py-3 flex items-center justify-between gap-3">
        <span className="flex items-center gap-2 min-w-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-4 h-4 text-gray-400 shrink-0"
          >
            <path d="M20 12V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v5a2 2 0 0 1 0 4v1a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-1a2 2 0 0 1 0-4z" />
          </svg>
          <span className="font-bold text-slate-800 text-sm tracking-wide truncate">
            {coupon.code}
          </span>
        </span>
        <button
          type="button"
          onClick={handleCopy}
          className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-semibold transition ${
            copied
              ? "bg-green-100 text-green-700"
              : "bg-blue-50 text-blue-600 hover:bg-blue-100"
          }`}
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
    </article>
  );
}
