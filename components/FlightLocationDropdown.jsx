"use client";

function splitSubtitle(subtitle) {
  const idx = subtitle.indexOf(",");
  if (idx === -1) return { airport: subtitle, location: "" };
  return {
    airport: subtitle.slice(0, idx).trim(),
    location: subtitle.slice(idx + 1).trim(),
  };
}

export default function FlightLocationDropdown({ items, onSelect }) {
  return (
    <div className="bg-white rounded-3xl shadow-2xl overflow-hidden w-[540px] max-w-[92vw]">
      <div className="px-5 pt-5 pb-2">
        <h3 className="font-semibold text-gray-800">
          Thành phố hoặc sân bay phổ biến
        </h3>
      </div>

      <div className="max-h-[400px] overflow-y-auto px-3 pb-4">
        {items.length === 0 ? (
          <div className="text-gray-500 text-sm text-center py-8">
            Không tìm thấy kết quả phù hợp
          </div>
        ) : (
          items.map((item) => {
            const { airport, location } = splitSubtitle(item.subtitle);
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelect(item)}
                className="w-full flex items-start gap-3 px-3 py-3 rounded-xl hover:bg-sky-50 text-left transition-colors"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5 text-gray-500 shrink-0 mt-0.5"
                >
                  <path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5L21 16z" />
                </svg>
                <div className="flex-1 min-w-0">
                  <div className="text-gray-900 truncate">
                    <span className="font-semibold">{airport}</span>
                    <span className="text-gray-400 ml-2">{item.code}</span>
                  </div>
                  {location && (
                    <div className="text-sm text-gray-500 truncate">
                      {location}
                    </div>
                  )}
                </div>
              </button>
            );
          })
        )}
      </div>
    </div>
  );
}
