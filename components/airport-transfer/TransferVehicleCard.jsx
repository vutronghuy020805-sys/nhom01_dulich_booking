import Link from "next/link";
import Image from "next/image";

function StarIcon({ filled = true }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`w-3.5 h-3.5 ${filled ? "text-amber-400" : "text-slate-200"}`}
      fill="currentColor"
      aria-hidden
    >
      <path d="M12 2 L14.7 8.6 L21.8 9.2 L16.4 13.9 L18.1 20.9 L12 17.3 L5.9 20.9 L7.6 13.9 L2.2 9.2 L9.3 8.6 Z" />
    </svg>
  );
}

function PassengerIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-4 h-4 text-slate-500 shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c0-4 4-6 8-6s8 2 8 6" />
    </svg>
  );
}

function BaggageIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-4 h-4 text-slate-500 shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="5" y="7" width="14" height="14" rx="2" />
      <path d="M9 7V4h6v3" />
      <path d="M9 12h6M9 16h6" />
    </svg>
  );
}

function CheckCircleIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-4 h-4 text-emerald-500 shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="16 10 11 15 8 12" />
    </svg>
  );
}

function formatVnd(value) {
  return value.toLocaleString("vi-VN") + " VND";
}

function Rating({ value }) {
  const full = Math.floor(value);
  const half = value - full >= 0.5;
  const cells = Array.from({ length: 5 }, (_, i) => {
    if (i < full) return "full";
    if (i === full && half) return "half";
    return "empty";
  });
  return (
    <span className="inline-flex items-center gap-0.5" aria-label={`Rating ${value}`}>
      {cells.map((c, idx) => (
        <StarIcon key={idx} filled={c !== "empty"} />
      ))}
    </span>
  );
}

export default function TransferVehicleCard({ vehicle, bookingHref }) {
  return (
    <article className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
      <div className="flex flex-col md:flex-row">
        <div className="relative w-full md:w-64 lg:w-72 aspect-[16/10] md:aspect-auto md:h-auto bg-slate-50 shrink-0">
          <Image
            src={vehicle.image}
            alt={vehicle.name}
            fill
            sizes="(min-width: 768px) 288px, 100vw"
            className="object-cover"
          />
        </div>

        <div className="flex-1 flex flex-col md:flex-row p-5 md:p-6 gap-4 md:gap-6">
          <div className="flex-1 min-w-0 flex flex-col justify-center gap-2">
            <h3 className="text-lg md:text-xl font-bold text-slate-900 leading-snug">
              {vehicle.name}{" "}
              <span className="font-semibold text-slate-700">({vehicle.tier})</span>
            </h3>

            <div className="flex items-center gap-2 text-sm text-slate-600">
              <span className="font-medium">{vehicle.provider}</span>
              <Rating value={vehicle.rating} />
            </div>

            <div className="flex items-center gap-5 text-sm text-slate-600 mt-1">
              <span className="inline-flex items-center gap-1.5">
                <PassengerIcon />
                {vehicle.passengers} passenger(s)
              </span>
              <span className="inline-flex items-center gap-1.5">
                <BaggageIcon />
                {vehicle.baggage} baggage(s)
              </span>
            </div>
          </div>

          <div className="flex flex-col items-stretch md:items-end justify-center gap-2 md:min-w-[220px]">
            <div className="text-xl md:text-2xl font-bold text-orange-500 text-left md:text-right">
              {formatVnd(vehicle.price)}
              <span className="text-slate-900 font-bold">/car</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs md:text-sm text-slate-600 md:justify-end">
              <CheckCircleIcon />
              <span>Phí cầu đường và phí đỗ xe miễn phí</span>
            </div>
            <Link
              href={bookingHref}
              className="mt-1 inline-flex items-center justify-center px-6 py-2.5 rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-semibold text-sm transition-colors shadow w-full md:w-44"
            >
              Choose
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
