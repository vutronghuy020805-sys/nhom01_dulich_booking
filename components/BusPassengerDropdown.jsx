"use client";

const PASSENGER_OPTIONS = [1, 2, 3, 4, 5, 6];

export default function BusPassengerDropdown({ selected, onSelect }) {
  return (
    <div className="bg-white rounded-3xl shadow-2xl w-48 py-3 overflow-hidden">
      {PASSENGER_OPTIONS.map((n) => {
        const active = n === selected;
        return (
          <button
            key={n}
            type="button"
            onClick={() => onSelect(n)}
            className="w-full flex items-center gap-4 px-5 py-3 hover:bg-sky-50 transition-colors text-left"
          >
            <span className="w-3 flex justify-center shrink-0">
              {active && (
                <span className="w-2.5 h-2.5 rounded-full bg-[#55B6FF]" />
              )}
            </span>
            <span className={`text-gray-800 text-lg ${active ? "font-semibold" : ""}`}>
              {n}
            </span>
          </button>
        );
      })}
    </div>
  );
}
