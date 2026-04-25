import Link from "next/link";
import Image from "next/image";

function StarIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-4 h-4 text-amber-400"
      fill="currentColor"
      aria-hidden
    >
      <path d="M12 2 L14.7 8.6 L21.8 9.2 L16.4 13.9 L18.1 20.9 L12 17.3 L5.9 20.9 L7.6 13.9 L2.2 9.2 L9.3 8.6 Z" />
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
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

export default function CarRentalVehicleCard({ vehicle, pickupLabel, bookingHref }) {
  return (
    <article className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col">
      <div className="relative w-full aspect-[16/10] bg-slate-100">
        <Image
          src={vehicle.image}
          alt={vehicle.name}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="p-5 flex flex-col flex-1 gap-3">
        <h3 className="text-base md:text-lg font-bold text-slate-900 leading-snug">
          {vehicle.name}
        </h3>

        <div className="text-sm text-slate-700">
          <span>{vehicle.seats}</span>
          <span className="text-slate-300 mx-2">•</span>
          <span>{vehicle.transmission}</span>
        </div>

        <div className="text-sm text-sky-600 font-medium">{pickupLabel}</div>

        <div className="flex items-center gap-1.5 text-sm text-slate-700">
          <StarIcon />
          <span className="font-semibold">{vehicle.rating.toFixed(1)}</span>
          <span className="text-slate-500">
            ({vehicle.reviews} đánh giá)
          </span>
        </div>

        <ul className="space-y-1.5 text-sm text-slate-700 mt-1">
          {vehicle.features.map((f) => (
            <li key={f} className="flex items-center gap-2">
              <CheckIcon />
              <span>{f}</span>
            </li>
          ))}
        </ul>

        <Link
          href={bookingHref}
          className="mt-auto inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-semibold text-sm transition-colors shadow"
        >
          Chọn xe
        </Link>
      </div>
    </article>
  );
}
