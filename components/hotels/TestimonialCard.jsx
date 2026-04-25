"use client";

import { useState } from "react";

export default function TestimonialCard({ item }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <article className="h-full flex flex-col bg-white border border-gray-200 rounded-lg p-6">
      <div className="flex-1">
        <p
          className={`text-sm md:text-base text-slate-700 leading-relaxed ${
            expanded ? "" : "line-clamp-4"
          }`}
        >
          {item.quote}
        </p>

        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="mt-3 inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm font-medium transition"
        >
          {expanded ? "Thu gọn" : "Xem tiếp"}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className={`w-3 h-3 transition-transform ${
              expanded ? "rotate-180" : ""
            }`}
          >
            <path d="M7 10l5 5 5-5z" />
          </svg>
        </button>
      </div>

      <p className="mt-4 text-sm text-slate-700">
        <span className="font-bold">{item.author}</span>
        {item.country ? `, ${item.country}` : ""}
      </p>
    </article>
  );
}
