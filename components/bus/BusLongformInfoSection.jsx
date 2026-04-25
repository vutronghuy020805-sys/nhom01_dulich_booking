"use client";

import { useState } from "react";
import {
  busLongformIntro,
  busLongformBenefits,
} from "./busLongformContent";

export default function BusLongformInfoSection() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section className="max-w-375 mx-auto px-6 lg:px-10 pt-4 pb-20 md:pb-24">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-xl md:text-2xl lg:text-3xl font-extrabold text-slate-700 text-center mb-8 md:mb-10">
          {busLongformIntro.title}
        </h2>

        <div className="space-y-4 text-slate-700 leading-relaxed text-[15px] md:text-base">
          {busLongformIntro.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        <div
          className={
            "grid transition-[grid-template-rows,opacity] duration-500 ease-out " +
            (isExpanded
              ? "grid-rows-[1fr] opacity-100"
              : "grid-rows-[0fr] opacity-0")
          }
          aria-hidden={!isExpanded}
        >
          <div className="overflow-hidden">
            <div className="pt-8 space-y-8 md:space-y-10">
              {busLongformBenefits.map((item) => (
                <article key={item.id}>
                  <h3 className="text-lg md:text-xl font-bold text-slate-800 mb-3 md:mb-4">
                    {item.title}
                  </h3>
                  <div className="space-y-3 text-slate-700 leading-relaxed text-[15px] md:text-base">
                    {item.paragraphs.map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <button
            type="button"
            onClick={() => setIsExpanded((v) => !v)}
            aria-expanded={isExpanded}
            className="inline-flex items-center gap-1.5 text-sky-600 hover:text-sky-700 font-semibold text-base transition"
          >
            {isExpanded ? "Thu gọn" : "Đọc thêm"}
            <svg
              viewBox="0 0 24 24"
              className={
                "w-4 h-4 transition-transform duration-300 " +
                (isExpanded ? "rotate-180" : "")
              }
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
