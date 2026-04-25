const ICONS = {
  building: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-4 h-4"
    >
      <rect x="4" y="2" width="16" height="20" rx="2" />
      <path d="M9 22v-4h6v4" />
      <path d="M8 6h.01" />
      <path d="M16 6h.01" />
      <path d="M12 6h.01" />
      <path d="M8 10h.01" />
      <path d="M12 10h.01" />
      <path d="M16 10h.01" />
      <path d="M8 14h.01" />
      <path d="M12 14h.01" />
      <path d="M16 14h.01" />
    </svg>
  ),
  hotel: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-4 h-4"
    >
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  ),
  mapPin: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-4 h-4"
    >
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z" />
    </svg>
  ),
  money: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-4 h-4"
    >
      <rect x="2" y="6" width="20" height="12" rx="2" />
      <circle cx="12" cy="12" r="2" />
      <path d="M6 12h.01" />
      <path d="M18 12h.01" />
    </svg>
  ),
  tag: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-4 h-4"
    >
      <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
      <circle cx="7" cy="7" r="1.5" fill="currentColor" />
    </svg>
  ),
  chat: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-4 h-4"
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      <polygon points="11 9 13 11 17 7" fill="currentColor" stroke="none" />
    </svg>
  ),
};

export default function LocationInfoSummary({ info }) {
  const items = [
    { icon: ICONS.building, label: "Khu vực Phổ biến", value: info.popularAreas },
    { icon: ICONS.hotel, label: "Khách sạn phổ biến", value: info.popularHotels },
    { icon: ICONS.mapPin, label: "Địa danh phổ biến", value: info.popularLandmarks },
    { icon: ICONS.money, label: "Giá chỉ từ", value: info.startingPrice },
    { icon: ICONS.tag, label: "Nổi tiếng về:", value: info.knownFor },
    { icon: ICONS.chat, label: "Điểm đánh giá", value: info.reviewScore },
  ];

  return (
    <section className="bg-gray-50 pt-8 pb-4 px-4">
      <div className="max-w-350 mx-auto">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
          <h2 className="text-xl md:text-2xl font-bold text-slate-800 mb-2">
            Một số thông tin thú vị về những khách sạn ở {info.title}
          </h2>
          <p className="flex items-center gap-2 text-gray-600 text-sm mb-6">
            <span className="text-blue-600">{ICONS.hotel}</span>
            <span>
              <span className="font-semibold">Tổng số chỗ nghỉ:</span>{" "}
              {info.totalStays}
            </span>
          </p>

          <div className="bg-gray-100 rounded-xl overflow-hidden">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px">
              {items.map((item, i) => (
                <div key={i} className="bg-white p-5 flex flex-col">
                  <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
                    <span className="text-slate-600">{item.icon}</span>
                    <span>{item.label}</span>
                  </div>
                  <div className="text-base md:text-lg font-bold text-slate-800 leading-snug">
                    {item.value}
                  </div>
                </div>
              ))}
              <div className="bg-white hidden lg:block" aria-hidden="true" />
              <div className="bg-white hidden lg:block" aria-hidden="true" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
