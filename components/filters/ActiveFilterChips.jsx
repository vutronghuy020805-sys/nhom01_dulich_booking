"use client";

function XIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-3.5 h-3.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

export default function ActiveFilterChips({ chips = [], onReset }) {
  if (chips.length === 0) return null;
  return (
    <div className="flex flex-wrap items-center gap-2">
      {chips.map((chip) => (
        <button
          key={chip.key}
          type="button"
          onClick={chip.onRemove}
          className="inline-flex items-center gap-1.5 pl-3 pr-2 py-1 rounded-full bg-sky-50 text-sky-700 text-xs font-semibold border border-sky-100 hover:bg-sky-100 transition-colors"
        >
          <span>{chip.label}</span>
          <XIcon />
        </button>
      ))}
      {onReset ? (
        <button
          type="button"
          onClick={onReset}
          className="text-xs font-semibold text-slate-500 hover:text-slate-700 underline underline-offset-2"
        >
          Xoá tất cả
        </button>
      ) : null}
    </div>
  );
}
