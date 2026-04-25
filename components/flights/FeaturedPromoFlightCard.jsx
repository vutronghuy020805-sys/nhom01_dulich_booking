import Link from "next/link";

function FireworkDecor({ className = "" }) {
  return (
    <svg
      viewBox="0 0 120 120"
      className={className}
      fill="none"
      stroke="#FFD37A"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden
    >
      <circle cx="60" cy="60" r="3" fill="#FFD37A" stroke="none" />
      <g opacity="0.9">
        <line x1="60" y1="60" x2="60" y2="12" />
        <line x1="60" y1="60" x2="60" y2="108" />
        <line x1="60" y1="60" x2="12" y2="60" />
        <line x1="60" y1="60" x2="108" y2="60" />
        <line x1="60" y1="60" x2="94" y2="26" />
        <line x1="60" y1="60" x2="26" y2="26" />
        <line x1="60" y1="60" x2="94" y2="94" />
        <line x1="60" y1="60" x2="26" y2="94" />
      </g>
      <g opacity="0.7" strokeDasharray="2 4">
        <line x1="60" y1="60" x2="78" y2="20" />
        <line x1="60" y1="60" x2="100" y2="42" />
        <line x1="60" y1="60" x2="100" y2="78" />
        <line x1="60" y1="60" x2="78" y2="100" />
        <line x1="60" y1="60" x2="42" y2="100" />
        <line x1="60" y1="60" x2="20" y2="78" />
        <line x1="60" y1="60" x2="20" y2="42" />
        <line x1="60" y1="60" x2="42" y2="20" />
      </g>
    </svg>
  );
}

function VietjetWordmark() {
  return (
    <span className="inline-flex items-baseline font-extrabold text-[15px] md:text-base tracking-tight">
      <span className="text-red-600">Vietjet</span>
      <span className="text-amber-400">Air</span>
      <span className="text-slate-500 font-semibold text-xs">.com</span>
    </span>
  );
}

export default function FeaturedPromoFlightCard({
  flight,
  fromCode,
  toCode,
  bookingHref,
}) {
  return (
    <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-red-700 via-red-600 to-red-700 text-white shadow-[0_6px_20px_rgba(185,28,28,0.25)]">
      <FireworkDecor className="absolute -left-6 -top-4 w-36 h-36 opacity-70 pointer-events-none" />
      <FireworkDecor className="absolute -right-6 -top-4 w-36 h-36 opacity-70 pointer-events-none" />
      <FireworkDecor className="absolute left-1/3 -bottom-16 w-28 h-28 opacity-30 pointer-events-none" />

      <div className="relative z-10 px-4 md:px-8 pt-4 md:pt-5">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-xl md:text-3xl font-extrabold tracking-wide drop-shadow">
            {flight.promoTitle}
          </h3>
          <span className="text-lg md:text-2xl font-extrabold">
            {flight.promoDiscount}
          </span>
        </div>
      </div>

      <div className="relative z-10 px-3 md:px-6 pb-4 md:pb-5 pt-3">
        <div className="bg-white text-slate-900 rounded-xl px-3 md:px-5 py-3 md:py-4 flex flex-col md:flex-row md:items-center gap-3 md:gap-5 shadow">
          <div className="flex items-center gap-3 md:w-48 shrink-0">
            <VietjetWordmark />
            <span className="inline-flex items-center gap-1 bg-red-600 text-white text-[11px] font-semibold px-2 py-1 rounded-full">
              <svg
                viewBox="0 0 30 20"
                className="w-3.5 h-2.5 rounded-sm shrink-0"
                aria-hidden
              >
                <rect width="30" height="20" fill="#DA251D" />
                <polygon
                  fill="#FFFF00"
                  points="15,5 16.18,8.38 19.76,8.45 16.9,10.62 17.94,14.04 15,12 12.06,14.04 13.1,10.62 10.24,8.45 13.82,8.38"
                />
              </svg>
              Ưu đãi mừng đại lễ
            </span>
          </div>

          <div className="flex-1 flex items-center justify-between md:justify-around gap-3">
            <div className="text-center">
              <div className="text-xl md:text-2xl font-bold leading-none">
                {flight.departureTime}
              </div>
              <div className="text-xs text-slate-500 mt-1">{fromCode}</div>
            </div>
            <div className="flex-1 max-w-[180px] text-center">
              <div className="text-xs md:text-sm text-slate-500">
                {flight.duration}
              </div>
              <div className="relative h-px bg-slate-300 my-2">
                <span className="absolute -top-1 left-1/2 -translate-x-1/2 text-[10px] text-slate-400">
                  ✈
                </span>
              </div>
              <div className="text-xs md:text-sm text-slate-500">Bay thẳng</div>
            </div>
            <div className="text-center">
              <div className="text-xl md:text-2xl font-bold leading-none">
                {flight.arrivalTime}
              </div>
              <div className="text-xs text-slate-500 mt-1">{toCode}</div>
            </div>
          </div>

          <div className="md:w-48 flex flex-col items-end md:items-end gap-2">
            <div className="text-right">
              {flight.oldPrice && (
                <div className="text-xs text-slate-400 line-through">
                  {flight.oldPrice.toLocaleString("vi-VN")} VND
                </div>
              )}
              <div className="text-sm md:text-base font-bold text-orange-500">
                {flight.price.toLocaleString("vi-VN")} VND
                <span className="text-xs text-slate-500 font-medium">
                  {" "}/ khách
                </span>
              </div>
            </div>
            <Link
              href={bookingHref || "#"}
              className="px-6 py-1.5 rounded-md bg-sky-300 hover:bg-sky-400 text-sky-900 font-semibold text-sm transition"
            >
              Chọn
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
