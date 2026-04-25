import Link from "next/link";

const AIRLINE_STYLES = {
  "VietJet Air": { text: "text-red-600", accent: "text-amber-400" },
  "Vietravel Airlines": { text: "text-emerald-600", accent: "text-amber-400" },
  "Vietnam Airlines": { text: "text-sky-700", accent: "text-amber-500" },
  "Bamboo Airways": { text: "text-emerald-700", accent: "text-sky-500" },
  "Pacific Airlines": { text: "text-orange-600", accent: "text-sky-500" },
};

function AirlineLogo({ name }) {
  const style = AIRLINE_STYLES[name] || {
    text: "text-slate-700",
    accent: "text-slate-400",
  };
  return (
    <span className={"inline-flex items-center gap-1.5"}>
      <span className={"inline-flex w-6 h-6 rounded-full bg-white ring-1 ring-slate-200 items-center justify-center " + style.text}>
        <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="currentColor" aria-hidden>
          <path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5z" />
        </svg>
      </span>
      <span className="font-semibold text-sm text-slate-900">{name}</span>
    </span>
  );
}

export default function StandardFlightResultCard({
  flight,
  fromCode,
  toCode,
  bookingHref,
}) {
  return (
    <article className="bg-white rounded-xl border border-slate-200 overflow-hidden">
      <div className="px-4 md:px-5 pt-4 pb-3 flex flex-col md:flex-row gap-3 md:gap-4">
        <div className="md:w-44 shrink-0 flex flex-col gap-2">
          <AirlineLogo name={flight.airline} />
          <span className="inline-flex items-center gap-1.5 text-xs text-slate-600">
            <svg
              viewBox="0 0 24 24"
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="M6 7h10l2 4v8a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1z" />
              <path d="M9 7V4h4v3" />
            </svg>
            <span className="font-medium">{flight.baggage}</span>
          </span>
          {flight.badge && (
            <span className="inline-flex items-center gap-1 bg-red-50 text-red-600 text-[11px] font-semibold px-2 py-1 rounded-full border border-red-100 w-fit">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-red-500" />
              {flight.badge}
            </span>
          )}
        </div>

        <div className="flex-1 flex items-center justify-between md:justify-around gap-3">
          <div className="text-center">
            <div className="text-lg md:text-xl font-bold text-slate-900 leading-none">
              {flight.departureTime}
            </div>
            <div className="text-xs text-slate-500 mt-1">{fromCode}</div>
          </div>
          <div className="flex-1 max-w-[180px] text-center">
            <div className="text-xs text-slate-500">{flight.duration}</div>
            <div className="relative h-px bg-slate-300 my-2">
              <span className="absolute -top-1 left-1/2 -translate-x-1/2 text-[10px] text-slate-400">
                ✈
              </span>
            </div>
            <div className="text-xs text-slate-500">Bay thẳng</div>
          </div>
          <div className="text-center">
            <div className="text-lg md:text-xl font-bold text-slate-900 leading-none">
              {flight.arrivalTime}
              {flight.crossDay && (
                <sup className="text-[10px] text-slate-500 font-semibold ml-0.5">
                  +1n
                </sup>
              )}
            </div>
            <div className="text-xs text-slate-500 mt-1">{toCode}</div>
          </div>
        </div>

        <div className="md:w-44 shrink-0 flex flex-row md:flex-col items-end md:items-end justify-between md:justify-center gap-2">
          <div className="text-right">
            {flight.oldPrice && (
              <div className="text-xs text-slate-400 line-through">
                {flight.oldPrice.toLocaleString("vi-VN")} VND
              </div>
            )}
            <div className="text-base md:text-lg font-bold text-orange-500">
              {flight.price.toLocaleString("vi-VN")} VND
              <span className="text-xs text-slate-500 font-medium">
                {" "}/khách
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 md:px-5 py-2 flex items-center gap-5 text-xs md:text-sm border-t border-slate-100 text-slate-600">
        <button
          type="button"
          className="hover:text-sky-600 transition font-medium"
        >
          Chi tiết
        </button>
        <button
          type="button"
          className="hover:text-sky-600 transition font-medium"
        >
          Các lợi ích đi kèm
        </button>
        <button
          type="button"
          className="hover:text-sky-600 transition font-medium"
        >
          Hoàn vé
        </button>
        <button
          type="button"
          className="hover:text-sky-600 transition font-medium"
        >
          Đổi lịch
        </button>
        <Link
          href={bookingHref || "#"}
          className="ml-auto px-5 py-1.5 rounded-md bg-sky-500 hover:bg-sky-600 text-white font-semibold transition"
        >
          Chọn
        </Link>
      </div>

      {(flight.remainingSeats || flight.specialPrice) && (
        <div className="bg-slate-50 px-4 md:px-5 py-2 text-xs text-slate-600 flex items-center gap-2 border-t border-slate-100">
          {flight.specialPrice ? (
            <>
              <svg
                viewBox="0 0 24 24"
                className="w-4 h-4 text-emerald-500"
                fill="currentColor"
                aria-hidden
              >
                <path d="M21 12l-9 9-9-9 9-9z" />
              </svg>
              <span>Mức giá đặc biệt</span>
            </>
          ) : (
            <>
              <svg
                viewBox="0 0 24 24"
                className="w-4 h-4 text-red-500"
                fill="currentColor"
                aria-hidden
              >
                <path d="M6 2l-1 4h3l-1 4h3l-1 4h3l-1 4h3l-1 4" />
              </svg>
              <span>Chỉ còn lại {flight.remainingSeats} ghế</span>
            </>
          )}
        </div>
      )}
    </article>
  );
}
