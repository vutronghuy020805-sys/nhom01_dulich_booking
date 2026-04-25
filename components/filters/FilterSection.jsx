"use client";

import { useState } from "react";

function ChevronIcon({ open }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={
        "w-4 h-4 text-sky-500 transition-transform duration-200 " +
        (open ? "rotate-180" : "")
      }
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

export default function FilterSection({
  title,
  defaultOpen = true,
  children,
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-t border-slate-100 first:border-t-0">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="w-full flex items-center justify-between px-5 py-3.5 text-left hover:bg-slate-50 transition-colors"
      >
        <span className="text-sm font-semibold text-slate-800">{title}</span>
        <ChevronIcon open={open} />
      </button>
      {open ? <div className="px-5 pb-4">{children}</div> : null}
    </div>
  );
}
