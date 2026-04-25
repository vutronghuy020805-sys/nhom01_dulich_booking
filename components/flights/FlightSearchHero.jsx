"use client";

import FlightDatePriceTabs from "./FlightDatePriceTabs";

function PlaneIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-8 h-8 text-white" fill="currentColor" aria-hidden>
      <path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5z" />
    </svg>
  );
}

export default function FlightSearchHero({
  fromCity,
  toCity,
  dateTabs,
  activeDateKey,
  activeDate,
  onSelectDate,
}) {
  return (
    <section className="max-w-375 mx-auto px-6 lg:px-10 pt-6">
      <div className="rounded-2xl bg-gradient-to-r from-blue-800 via-blue-700 to-blue-600 p-4 md:p-6 text-white relative overflow-hidden shadow">
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3 md:gap-4">
          <div className="flex items-center gap-3 md:pr-5 md:mr-1">
            <PlaneIcon />
            <span className="text-xl md:text-2xl font-extrabold tracking-wide">
              VIEGO
            </span>
          </div>

          <div className="bg-white text-slate-900 rounded-xl px-4 md:px-5 py-3 md:py-4 flex-1 shadow-sm">
            <h1 className="text-base md:text-xl font-bold leading-tight">
              {fromCity.displayName} ({fromCity.code})
              <span className="mx-1.5 md:mx-2">→</span>
              {toCity.displayName} ({toCity.code})
            </h1>
            <p className="text-xs md:text-sm text-slate-500 mt-1">
              {activeDate.longLabel} | 1 hành khách | Phổ thông
            </p>
          </div>
        </div>

        <FlightDatePriceTabs
          tabs={dateTabs}
          activeKey={activeDateKey}
          onSelect={onSelectDate}
        />
      </div>
    </section>
  );
}
