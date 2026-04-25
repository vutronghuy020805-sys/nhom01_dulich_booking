import Link from "next/link";

function CarIcon() {
  return (
    <svg
      viewBox="0 0 48 48"
      className="w-10 h-10 shrink-0"
      fill="none"
      aria-hidden
    >
      <rect x="4" y="4" width="40" height="40" rx="10" fill="#E0F2FE" />
      <path
        d="M12 28h24v4a2 2 0 0 1-2 2h-1.5a3 3 0 0 1-6 0H20a3 3 0 0 1-6 0h-1.5a2 2 0 0 1-2-2z"
        fill="#0EA5E9"
      />
      <path
        d="M14 28l2.8-6.2A3 3 0 0 1 19.5 20h9a3 3 0 0 1 2.8 1.8L34 28z"
        fill="#7DD3FC"
      />
      <rect x="17" y="23" width="6" height="4" rx="1" fill="#F8FAFC" />
      <rect x="25" y="23" width="6" height="4" rx="1" fill="#F8FAFC" />
    </svg>
  );
}

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
      <circle cx="12" cy="12" r="10" />
      <polyline points="16 10 11 15 8 12" />
    </svg>
  );
}

export default function AirportTransferBookingSummaryCard({
  fromName,
  toName,
  vehicle,
  dateLabel,
  timeLabel,
  detailsHref,
}) {
  const fromShort = fromName
    ? fromName.replace(/\s*\([^)]+\)\s*$/, "").trim()
    : "Sân bay bạn chọn";
  const toShort = toName || "điểm đến đã chọn";

  return (
    <aside className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="bg-slate-50 border-b border-slate-200 p-4 flex items-start gap-3">
        <CarIcon />
        <div className="flex-1 min-w-0">
          <h3 className="text-sm md:text-base font-semibold text-slate-900 leading-snug">
            Từ {fromShort}
          </h3>
        </div>
        {detailsHref ? (
          <Link
            href={detailsHref}
            className="text-sky-500 hover:text-sky-600 text-sm font-semibold shrink-0"
          >
            Chi tiết
          </Link>
        ) : null}
      </div>

      <div className="p-4 md:p-5 space-y-3 text-sm">
        {vehicle ? (
          <div>
            <p className="font-bold text-slate-900">
              {vehicle.name}{" "}
              <span className="font-semibold text-slate-700">
                ({vehicle.tier})
              </span>
            </p>
            {dateLabel ? (
              <p className="mt-0.5 text-slate-600">{dateLabel}</p>
            ) : null}
            {timeLabel ? (
              <p className="mt-0.5 text-slate-600">
                Đón lúc <span className="font-semibold">{timeLabel}</span>{" "}
                <span className="text-slate-500">
                  (tuỳ vào giờ đến chuyến bay)
                </span>
              </p>
            ) : null}
          </div>
        ) : null}

        <div className="pt-2">
          <ul className="relative pl-5 space-y-2.5 text-slate-700">
            <li className="relative">
              <span className="absolute -left-5 top-1.5 w-2.5 h-2.5 rounded-full bg-white border-2 border-slate-400" />
              <span className="absolute -left-[15px] top-4 bottom-[-14px] w-0.5 bg-slate-200" />
              <span className="block">
                Từ <span className="font-medium">{fromShort}</span>
              </span>
            </li>
            <li className="relative">
              <span className="absolute -left-5 top-1.5 w-2.5 h-2.5 rounded-full bg-slate-700" />
              <span className="block">
                Đến <span className="font-medium">{toShort}</span>
              </span>
            </li>
          </ul>
        </div>

        <div className="pt-3 border-t border-slate-100 space-y-1.5">
          <div className="inline-flex items-center gap-2 text-emerald-600 font-medium">
            <CheckIcon />
            <span>Được hoàn tiền</span>
          </div>
          <div className="inline-flex items-center gap-2 text-emerald-600 font-medium">
            <CheckIcon />
            <span>Được đổi lịch</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
