"use client";

import { useState } from "react";

export default function CouponCard({ icon, category, headline, subline, code }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <article className="bg-white rounded-2xl border border-gray-200 hover:shadow-md transition p-4 flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <span className="text-2xl" aria-hidden>
          {icon}
        </span>
        <h3 className="font-bold text-slate-900">{category}</h3>
      </div>

      <div>
        <p className="text-slate-800 font-medium leading-snug">{headline}</p>
        <p className="text-sm text-slate-500 mt-1">{subline}</p>
      </div>

      <div className="mt-auto flex items-center justify-between pt-3 border-t border-dashed border-gray-200">
        <div className="flex items-center gap-1.5 text-slate-700 font-semibold text-sm">
          <svg
            viewBox="0 0 24 24"
            className="w-4 h-4 text-slate-500"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="9" y="9" width="13" height="13" rx="2" />
            <path d="M5 15V5a2 2 0 0 1 2-2h10" />
          </svg>
          {code}
        </div>
        <button
          type="button"
          onClick={handleCopy}
          className={
            "px-4 py-1.5 rounded-full text-xs font-semibold transition " +
            (copied
              ? "bg-emerald-100 text-emerald-700"
              : "bg-cyan-100 text-cyan-700 hover:bg-cyan-200")
          }
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
    </article>
  );
}
