"use client";

import { useState } from "react";

const VISIBLE_COUNT = 2;

export default function LocationExtraInfo({ info }) {
  const [expanded, setExpanded] = useState(false);

  const paragraphs = info.description || [];
  const visibleParagraphs = expanded
    ? paragraphs
    : paragraphs.slice(0, VISIBLE_COUNT);

  const canExpand = paragraphs.length > VISIBLE_COUNT;

  return (
    <section className="bg-gray-50 pt-4 pb-16 px-4">
      <div className="max-w-350 mx-auto">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
          <h2 className="text-xl md:text-2xl font-bold text-slate-800 mb-5">
            Thông tin thêm về khách sạn ở {info.title}
          </h2>

          <div className="space-y-4 text-gray-700 leading-relaxed">
            {visibleParagraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}

            {expanded && info.hotelsHeading && (
              <h3 className="text-lg font-bold text-slate-800 pt-2">
                {info.hotelsHeading}
              </h3>
            )}
          </div>

          {canExpand && (
            <div className="mt-6">
              <button
                type="button"
                onClick={() => setExpanded((v) => !v)}
                className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-blue-50 text-blue-600 font-medium hover:bg-blue-100 transition"
              >
                {expanded ? "thu gọn" : "đọc thêm"}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`w-4 h-4 transition-transform ${
                    expanded ? "rotate-180" : ""
                  }`}
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
