"use client";

import { PRICE_RANGES } from "@/lib/listing";

export default function PriceFilter({ value, onChange, ranges = PRICE_RANGES }) {
  return (
    <ul className="space-y-2">
      {ranges.map((r) => {
        const active = value === r.id;
        return (
          <li key={r.id}>
            <label className="flex items-center gap-2.5 cursor-pointer text-sm text-slate-700 hover:text-slate-900">
              <input
                type="radio"
                name="price-range"
                checked={active}
                onChange={() => onChange(active ? "" : r.id)}
                onClick={() => {
                  if (active) onChange("");
                }}
                className="w-4 h-4 border-slate-300 text-sky-500 focus:ring-sky-400"
              />
              <span>{r.label}</span>
            </label>
          </li>
        );
      })}
    </ul>
  );
}
