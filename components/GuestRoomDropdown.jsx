"use client";

const ICONS = {
  adults: (
    <svg viewBox="0 0 24 24" className="w-6 h-6 text-[#55B6FF]" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c0-4 4-7 8-7s8 3 8 7" />
    </svg>
  ),
  children: (
    <svg viewBox="0 0 24 24" className="w-6 h-6 text-[#55B6FF]" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="6" r="2.5" />
      <path d="M12 9v5M9 14l3 3 3-3M10 22v-5M14 22v-5" />
    </svg>
  ),
  rooms: (
    <svg viewBox="0 0 24 24" className="w-6 h-6 text-[#55B6FF]" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="6" y="3" width="12" height="18" rx="1" />
      <circle cx="14" cy="12" r="1" fill="currentColor" />
    </svg>
  ),
};

function CounterRow({ iconKey, label, value, onDec, onInc, disableDec }) {
  return (
    <div className="flex items-center justify-between py-3">
      <div className="flex items-center gap-3">
        {ICONS[iconKey]}
        <span className="text-gray-800 text-[15px] font-medium">{label}</span>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onDec}
          disabled={disableDec}
          aria-label={`Giảm ${label}`}
          className="w-10 h-9 rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
        >
          <svg className="w-4 h-4 text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M5 12h14" />
          </svg>
        </button>
        <div className="w-12 text-center font-semibold text-gray-800">{value}</div>
        <button
          type="button"
          onClick={onInc}
          aria-label={`Tăng ${label}`}
          className="w-10 h-9 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
        >
          <svg className="w-4 h-4 text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M12 5v14M5 12h14" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default function GuestRoomDropdown({
  adults,
  children,
  rooms,
  onChange,
  onDone,
}) {
  const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

  return (
    <div className="bg-white rounded-3xl shadow-2xl p-5 w-[460px] max-w-[90vw]">
      <CounterRow
        iconKey="adults"
        label="Người lớn"
        value={adults}
        disableDec={adults <= 1}
        onDec={() =>
          onChange({ adults: clamp(adults - 1, 1, 20), children, rooms })
        }
        onInc={() =>
          onChange({ adults: clamp(adults + 1, 1, 20), children, rooms })
        }
      />
      <CounterRow
        iconKey="children"
        label="Trẻ em"
        value={children}
        disableDec={children <= 0}
        onDec={() =>
          onChange({ adults, children: clamp(children - 1, 0, 10), rooms })
        }
        onInc={() =>
          onChange({ adults, children: clamp(children + 1, 0, 10), rooms })
        }
      />
      <CounterRow
        iconKey="rooms"
        label="Phòng"
        value={rooms}
        disableDec={rooms <= 1}
        onDec={() =>
          onChange({ adults, children, rooms: clamp(rooms - 1, 1, 10) })
        }
        onInc={() =>
          onChange({ adults, children, rooms: clamp(rooms + 1, 1, 10) })
        }
      />

      <div className="flex justify-end mt-3 pt-3 border-t border-gray-100">
        <button
          type="button"
          onClick={onDone}
          className="bg-[#55B6FF] hover:bg-[#3fa5f5] text-white px-6 py-2 rounded-xl font-semibold transition-colors shadow-md"
        >
          Xong
        </button>
      </div>
    </div>
  );
}
