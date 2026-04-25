"use client";

import { RATING_OPTIONS } from "@/lib/listing";

function StarIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-3.5 h-3.5 text-amber-400"
      fill="currentColor"
      aria-hidden
    >
      <path d="M12 2 L14.7 8.6 L21.8 9.2 L16.4 13.9 L18.1 20.9 L12 17.3 L5.9 20.9 L7.6 13.9 L2.2 9.2 L9.3 8.6 Z" />
    </svg>
  );
}

export default function RatingFilter({ value, onChange, options = RATING_OPTIONS }) {
  return (
    <ul className="space-y-2">
      {options.map((r) => {
        const active = value === r.id;
        return (
          <li key={r.id}>
            <label className="flex items-center gap-2.5 cursor-pointer text-sm text-slate-700 hover:text-slate-900">
              <input
                type="radio"
                name="rating-filter"
                checked={active}
                onChange={() => onChange(active ? "" : r.id)}
                onClick={() => {
                  if (active) onChange("");
                }}
                className="w-4 h-4 border-slate-300 text-sky-500 focus:ring-sky-400"
              />
              <span className="inline-flex items-center gap-1">
                <StarIcon />
                <span>{r.label}</span>
              </span>
            </label>
          </li>
        );
      })}
    </ul>
  );
}
