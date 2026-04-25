"use client";

export default function FlightDatePriceTabs({ tabs, activeKey, onSelect }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3 mt-4">
      {tabs.map((tab) => {
        const active = tab.key === activeKey;
        return (
          <button
            key={tab.key}
            type="button"
            onClick={() => onSelect(tab.key)}
            className={
              "rounded-xl px-3 py-2.5 text-left transition " +
              (active
                ? "bg-white/25 ring-1 ring-white/60 text-white"
                : "bg-white/10 hover:bg-white/20 text-white/90")
            }
          >
            <div className="text-xs md:text-sm font-semibold">{tab.label}</div>
            <div className="text-sm md:text-base font-bold mt-0.5">
              {tab.price.toLocaleString("vi-VN")} VND
            </div>
          </button>
        );
      })}
    </div>
  );
}
