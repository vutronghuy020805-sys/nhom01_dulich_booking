const formatDate = (d) => {
  const days = ["Chủ Nhật", "Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy"];
  const day = days[d.getDay()];
  const date = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();
  return { day, date, month, year };
};

function BenefitLine({ benefit }) {
  if (benefit.type === "gift") {
    return (
      <li className="flex items-start gap-2 text-sm text-sky-600">
        <svg
          viewBox="0 0 24 24"
          className="w-4 h-4 mt-0.5 shrink-0"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="20 12 20 22 4 22 4 12" />
          <rect x="2" y="7" width="20" height="5" />
          <line x1="12" y1="22" x2="12" y2="7" />
          <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7zM12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
        </svg>
        <span className="font-medium">{benefit.text}</span>
      </li>
    );
  }
  if (benefit.type === "crossed") {
    return (
      <li className="flex items-start gap-2 text-sm text-slate-400 line-through">
        <svg
          viewBox="0 0 24 24"
          className="w-4 h-4 mt-0.5 shrink-0"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
        <span>{benefit.text}</span>
      </li>
    );
  }
  if (benefit.type === "free-cancel") {
    return (
      <li className="flex items-start gap-2 text-sm text-emerald-600">
        <svg
          viewBox="0 0 24 24"
          className="w-4 h-4 mt-0.5 shrink-0"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
        <span className="font-semibold">{benefit.text}</span>
      </li>
    );
  }
  if (benefit.type === "info") {
    return (
      <li className="text-sm">
        <div className="flex items-center gap-2 text-sky-600 font-semibold">
          <svg
            viewBox="0 0 24 24"
            className="w-4 h-4 shrink-0"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="9" />
            <line x1="12" y1="16" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12.01" y2="8" />
          </svg>
          {benefit.text}
        </div>
        {benefit.sub && (
          <div className="pl-6 text-xs text-slate-500 mt-0.5">
            {benefit.sub}
          </div>
        )}
      </li>
    );
  }
  return (
    <li className="flex items-start gap-2 text-sm text-slate-600">
      <svg
        viewBox="0 0 24 24"
        className="w-4 h-4 mt-0.5 text-slate-400 shrink-0"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="20 6 9 17 4 12" />
      </svg>
      <span>{benefit.text}</span>
    </li>
  );
}

export default function BookingSummaryCard({ hotel, ratePlan }) {
  const checkIn = new Date(2026, 4, 3);
  const checkOut = new Date(2026, 4, 4);
  const nights = Math.max(
    1,
    Math.round((checkOut - checkIn) / (1000 * 60 * 60 * 24))
  );

  const ci = formatDate(checkIn);
  const co = formatDate(checkOut);
  const checkInTime = hotel.policies?.checkInFrom || "14:00";
  const checkOutTime = hotel.policies?.checkOutTo || "12:00";

  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
      <div className="bg-emerald-50 text-emerald-700 text-sm font-medium px-5 py-2">
        Dừng khoảng chừng là 2 giây! Chỉ còn{" "}
        <span className="font-bold">{ratePlan.roomsAvailable} phòng</span> có
        giá thấp...
      </div>

      <div className="p-5 space-y-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900 leading-snug">
            (1x) {ratePlan.planLabel}
          </h3>
          <div className="mt-1 text-red-500 text-sm font-semibold">
            Chỉ còn {ratePlan.roomsAvailable} phòng
          </div>
        </div>

        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 bg-sky-50/40 rounded-xl p-4">
          <div>
            <div className="text-xs text-slate-500">Nhận phòng</div>
            <div className="font-bold text-slate-900 leading-tight">
              {ci.day}, {ci.date} tháng {ci.month} {ci.year}
            </div>
            <div className="text-xs text-slate-500 mt-1">Từ {checkInTime}</div>
          </div>
          <div className="text-center text-slate-500 text-xs whitespace-nowrap">
            {nights} đêm
            <div className="text-slate-300 mt-1">→</div>
          </div>
          <div>
            <div className="text-xs text-slate-500">Trả phòng</div>
            <div className="font-bold text-slate-900 leading-tight">
              {co.day}, {co.date} tháng {co.month} {co.year}
            </div>
            <div className="text-xs text-slate-500 mt-1">
              Trước {checkOutTime}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 text-sm text-slate-700">
          <span className="flex items-center gap-1 font-semibold">
            <svg
              viewBox="0 0 24 24"
              className="w-4 h-4 text-slate-600"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
            </svg>
            {ratePlan.adults} khách
          </span>
          <span className="text-slate-300">|</span>
          <span className="flex items-center gap-1 text-slate-500">
            <svg
              viewBox="0 0 24 24"
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 18v-4a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v4M3 18h18" />
            </svg>
          </span>
          <span className="text-slate-500">
            <svg
              viewBox="0 0 24 24"
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M8 2v8a4 4 0 0 0 8 0V2M12 10v12" />
            </svg>
          </span>
          <span className="text-slate-500">
            <svg
              viewBox="0 0 24 24"
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12.55a11 11 0 0 1 14 0M8.5 16.5a5 5 0 0 1 7 0M2 8.82a15 15 0 0 1 20 0" />
              <circle cx="12" cy="20" r="1" fill="currentColor" />
            </svg>
          </span>
        </div>

        <ul className="space-y-2">
          {(ratePlan.benefits || []).map((b, i) => (
            <BenefitLine key={i} benefit={b} />
          ))}
        </ul>

        <a
          href="#"
          className="inline-flex items-center gap-1 text-sm text-emerald-600 hover:text-emerald-700 font-semibold"
        >
          <svg
            viewBox="0 0 24 24"
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="4" width="18" height="18" rx="2" />
            <path d="M16 2v4M8 2v4M3 10h18" />
          </svg>
          Có thể đổi lịch
        </a>
      </div>
    </div>
  );
}
