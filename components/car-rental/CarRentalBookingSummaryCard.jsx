function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-4 h-4 text-emerald-500 shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function Row({ label, value }) {
  return (
    <div>
      <div className="text-xs text-slate-500">{label}</div>
      <div className="text-sm font-semibold text-slate-900 mt-0.5 leading-snug">
        {value}
      </div>
    </div>
  );
}

export default function CarRentalBookingSummaryCard({ summary }) {
  return (
    <aside className="bg-white rounded-xl border border-slate-200 overflow-hidden">
      <div className="px-5 py-4 border-b border-slate-100">
        <h3 className="text-base md:text-lg font-bold text-slate-900">
          Chi tiết thuê xe
        </h3>
      </div>

      <div className="p-5 space-y-4">
        <div className="flex items-center gap-2 text-sky-700 bg-sky-50 border border-sky-100 rounded-lg px-3 py-2">
          <svg
            viewBox="0 0 24 24"
            className="w-5 h-5 shrink-0"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="M14 16H9m10 0h3v-3.15a1 1 0 0 0-.4-.8l-1.9-1.4L17 7a2 2 0 0 0-1.8-1.1H9.8A2 2 0 0 0 8 7L5.3 10.65l-1.9 1.4a1 1 0 0 0-.4.8V16h3" />
            <circle cx="7" cy="16" r="2" />
            <circle cx="17" cy="16" r="2" />
          </svg>
          <span className="text-sm font-semibold">{summary.serviceLabel}</span>
        </div>

        <div>
          <div className="text-base font-bold text-slate-900">
            {summary.vehicleName}
          </div>
          <div className="text-sm text-slate-600 mt-1">
            Cung cấp bởi {summary.provider}
          </div>
        </div>

        <div className="border-t border-slate-100 pt-4 space-y-4">
          <Row label="Thành phố/Khu vực thuê xe" value={summary.locationName} />
          <Row label="Ngày thuê" value={summary.rentalDateRange} />
          <Row label="Điểm đón xe" value={summary.pickupPoint} />
          <Row label="Thời gian thuê xe" value={summary.rentalDuration} />
          <Row label="Giờ đón xe" value={summary.pickupTime} />
          <Row label="Điểm trả xe" value={summary.dropoffPoint} />
        </div>

        <ul className="border-t border-slate-100 pt-4 space-y-2 text-sm text-slate-700">
          <li className="flex items-center gap-2">
            <CheckIcon />
            <span>Có thể hoàn vé</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckIcon />
            <span>Có áp dụng đổi lịch</span>
          </li>
        </ul>
      </div>
    </aside>
  );
}
