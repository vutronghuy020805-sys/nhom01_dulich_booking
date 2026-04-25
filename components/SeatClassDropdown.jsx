"use client";

export const SEAT_CLASSES = [
  "Phổ thông",
  "Phổ thông đặc biệt",
  "Thương gia",
  "Hạng nhất",
];

export default function SeatClassDropdown({ selected, onSelect }) {
  return (
    <div className="bg-white rounded-2xl shadow-2xl w-60 py-2 overflow-hidden">
      {SEAT_CLASSES.map((cls) => {
        const active = cls === selected;
        return (
          <button
            key={cls}
            type="button"
            onClick={() => onSelect(cls)}
            className="w-full flex items-center justify-between px-4 py-3 hover:bg-sky-50 transition-colors text-left"
          >
            <span className={`text-gray-800 ${active ? "font-semibold" : ""}`}>
              {cls}
            </span>
            {active && (
              <span className="w-2.5 h-2.5 rounded-full bg-[#55B6FF] shrink-0" />
            )}
          </button>
        );
      })}
    </div>
  );
}
