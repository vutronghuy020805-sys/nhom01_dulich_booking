"use client";

const HOURS = Array.from({ length: 24 }, (_, i) => i);
const MINUTES = [0, 30];

export default function CarRentalTimePicker({ hour, minute, onChange, onDone }) {
  return (
    <div className="bg-white rounded-3xl shadow-2xl w-[320px] p-5">
      {/* Column headers */}
      <div className="grid grid-cols-2 gap-4 mb-3">
        <h4 className="font-bold text-gray-900">Giờ</h4>
        <h4 className="font-bold text-gray-900">Phút</h4>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Hours */}
        <div className="max-h-64 overflow-y-auto pr-1">
          {HOURS.map((h) => {
            const active = h === hour;
            return (
              <button
                key={h}
                type="button"
                onClick={() => onChange({ hour: h, minute })}
                className="w-full flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-sky-50 transition-colors text-left"
              >
                <span className="w-3 flex justify-center shrink-0">
                  {active && <span className="w-2.5 h-2.5 rounded-full bg-[#55B6FF]" />}
                </span>
                <span className={`text-gray-800 text-lg ${active ? "font-semibold" : ""}`}>
                  {h}
                </span>
              </button>
            );
          })}
        </div>

        {/* Minutes */}
        <div className="max-h-64 overflow-y-auto pr-1">
          {MINUTES.map((m) => {
            const active = m === minute;
            return (
              <button
                key={m}
                type="button"
                onClick={() => onChange({ hour, minute: m })}
                className="w-full flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-sky-50 transition-colors text-left"
              >
                <span className="w-3 flex justify-center shrink-0">
                  {active && <span className="w-2.5 h-2.5 rounded-full bg-[#55B6FF]" />}
                </span>
                <span className={`text-gray-800 text-lg ${active ? "font-semibold" : ""}`}>
                  {m}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex justify-end mt-3 pt-3 border-t border-gray-100">
        <button
          type="button"
          onClick={onDone}
          className="text-[#55B6FF] font-semibold hover:text-[#3fa5f5] transition-colors px-2 py-1"
        >
          Xong
        </button>
      </div>
    </div>
  );
}
