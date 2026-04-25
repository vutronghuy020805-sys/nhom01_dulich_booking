"use client";

export default function FlightResultFilters({
  value,
  onChange,
  lowestPrice,
  shortestDuration,
}) {
  const tabs = [
    {
      key: "price",
      label: "Giá thấp nhất",
      meta: `${lowestPrice.toLocaleString("vi-VN")} VND`,
    },
    {
      key: "duration",
      label: "Thời gian bay ngắn nhất",
      meta: shortestDuration,
    },
  ];

  return (
    <div className="flex items-stretch border-b border-slate-200 bg-white rounded-t-xl">
      {tabs.map((tab) => {
        const active = tab.key === value;
        return (
          <button
            key={tab.key}
            type="button"
            onClick={() => onChange(tab.key)}
            className={
              "flex-1 text-left px-4 md:px-5 py-3 border-b-2 transition " +
              (active
                ? "border-sky-500 text-sky-600"
                : "border-transparent text-slate-700 hover:text-slate-900")
            }
          >
            <div className="font-semibold text-sm">{tab.label}</div>
            <div className="text-xs text-slate-500 mt-0.5">{tab.meta}</div>
          </button>
        );
      })}
      <button
        type="button"
        onClick={() => onChange("other")}
        className={
          "flex items-center gap-2 px-4 md:px-5 py-3 border-b-2 transition ml-auto " +
          (value === "other"
            ? "border-sky-500 text-sky-600"
            : "border-transparent text-slate-700 hover:text-slate-900")
        }
      >
        <svg
          viewBox="0 0 24 24"
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="M3 6h18M6 12h12M10 18h4" />
        </svg>
        <span className="font-semibold text-sm">Khác</span>
      </button>
    </div>
  );
}
