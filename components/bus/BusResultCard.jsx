import Link from "next/link";
import BusAmenityIcons from "./BusAmenityIcons";

function StarIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-3 h-3 text-sky-500"
      fill="currentColor"
      aria-hidden
    >
      <path d="M12 2l2.9 6.9 7.1.6-5.4 4.7 1.7 7-6.3-3.9-6.3 3.9 1.7-7L2 9.5l7.1-.6z" />
    </svg>
  );
}

export default function BusResultCard({ trip }) {
  return (
    <article className="bg-white border border-slate-200 rounded-xl overflow-hidden">
      <div className="px-5 pt-5 pb-4 grid grid-cols-1 md:grid-cols-[2fr_2fr_1fr_auto] gap-4 md:gap-5 items-center">
        <div>
          <div className="font-bold text-slate-900 text-base">
            {trip.operator.name}
          </div>
          <div className="text-xs text-slate-500 mt-1">
            {trip.operator.vehicleShort}
          </div>
          <div className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-sky-700 bg-sky-50 border border-sky-100 px-2 py-0.5 rounded-full">
            <StarIcon />
            {trip.rating}/5
            <svg
              viewBox="0 0 24 24"
              className="w-3 h-3 text-sky-600"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </div>
        </div>

        <div className="flex items-center gap-3 md:gap-4">
          <div className="min-w-0">
            <div className="font-bold text-slate-900">{trip.departureTime}</div>
            <div className="text-xs text-slate-500 mt-1 truncate">
              {trip.pickup.name}
            </div>
          </div>
          <svg
            viewBox="0 0 24 24"
            className="w-4 h-4 text-slate-400 shrink-0"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="M5 12h14M13 5l7 7-7 7" />
          </svg>
          <div className="min-w-0">
            <div className="font-bold text-slate-900">
              {trip.arrivalTime}
              {trip.nextDay && (
                <sup className="text-[10px] text-slate-500 font-semibold ml-0.5">
                  +1
                </sup>
              )}
            </div>
            <div className="text-xs text-slate-500 mt-1 truncate">
              {trip.dropoff.name}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="text-sm font-semibold text-slate-700">
            {trip.duration}
          </div>
          <BusAmenityIcons amenities={trip.amenities} />
        </div>

        <div className="flex flex-col items-end gap-2">
          <div className="text-right">
            <div className="text-base md:text-lg font-bold text-orange-500">
              {trip.priceLabel}
            </div>
            <div className="text-xs text-slate-500">/khách</div>
          </div>
          <Link
            href={trip.bookingHref || "#"}
            className="inline-flex items-center justify-center px-6 py-2 rounded-md bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm transition"
          >
            Đặt Ngay
          </Link>
        </div>
      </div>

      <div className="px-5 py-2.5 border-t border-slate-100 flex items-center gap-5 text-xs md:text-sm text-sky-600">
        <button type="button" className="font-semibold hover:text-sky-700 transition">
          Đặc trưng
        </button>
        <button type="button" className="font-semibold hover:text-sky-700 transition">
          Tuyến đường
        </button>
        <button type="button" className="font-semibold hover:text-sky-700 transition">
          Vé
        </button>
        <button type="button" className="font-semibold hover:text-sky-700 transition">
          Xếp hạng và đánh giá tổng thể
        </button>
      </div>
    </article>
  );
}
