"use client";

function SortIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-4 h-4 text-slate-500 shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <line x1="21" y1="6" x2="9" y2="6" />
      <line x1="15" y1="12" x2="9" y2="12" />
      <line x1="11" y1="18" x2="9" y2="18" />
      <polyline points="3 8 6 5 9 8" />
      <line x1="6" y1="5" x2="6" y2="19" />
    </svg>
  );
}

export default function SortDropdown({ value, onChange, options }) {
  return (
    <label className="inline-flex items-center gap-2 bg-white rounded-lg border border-slate-200 shadow-sm px-3 py-2">
      <SortIcon />
      <span className="text-sm text-slate-600 whitespace-nowrap">Sắp xếp:</span>
      <select
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        className="bg-transparent text-sm font-semibold text-slate-900 focus:outline-none cursor-pointer pr-2"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </label>
  );
}
