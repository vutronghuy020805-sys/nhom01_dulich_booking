import Link from "next/link";

export default function HotelResultCard({ hotel }) {
  const stars = "★".repeat(hotel.stars);
  const detailHref = `/hotels/${hotel.locationSlug || hotel.location}/${hotel.slug}`;

  return (
    <article className="bg-white rounded-2xl border border-gray-200 overflow-hidden flex flex-col md:flex-row hover:shadow-md transition">
      <div className="md:w-64 h-48 md:h-auto shrink-0 relative bg-gray-100">
        <img
          src={hotel.image}
          alt={hotel.name}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      <div className="flex-1 flex flex-col md:flex-row">
        <div className="flex-1 p-5">
          <h3 className="text-lg font-bold text-slate-900 mb-2">{hotel.name}</h3>

          <div className="flex items-center gap-2 mb-3 flex-wrap">
            <span className="inline-flex items-center gap-1 text-xs bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full font-medium">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-3.5 h-3.5"
              >
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
              {hotel.type}
            </span>
            <span className="text-amber-400 text-sm tracking-tight">{stars}</span>
          </div>

          <p className="flex items-start gap-1.5 text-sm text-gray-500 leading-relaxed">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-4 h-4 text-red-400 shrink-0 mt-0.5"
            >
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z" />
            </svg>
            <span>{hotel.address}</span>
          </p>
        </div>

        <div className="p-5 md:w-56 flex flex-col items-end border-t md:border-t-0 md:border-l border-gray-100">
          <div className="flex items-baseline gap-1">
            <span className="text-blue-700 text-xl font-bold">
              {hotel.rating.toFixed(1)}
            </span>
            <span className="text-xs text-gray-400">({hotel.reviews})</span>
          </div>
          <div className="text-xs text-blue-600 font-medium mb-4">
            {hotel.ratingText}
          </div>

          <div className="mt-auto text-right w-full">
            <div className="text-red-600 text-lg font-bold">
              {hotel.price.toLocaleString("vi-VN")} VND
            </div>
            <div className="text-xs text-gray-500 mb-3">
              {hotel.unit || "phòng/đêm"}
            </div>

            <Link
              href={detailHref}
              className="block w-full text-center bg-sky-400 hover:bg-sky-500 text-white text-sm font-bold tracking-wide px-5 py-2 rounded-lg transition"
            >
              ĐẶT NGAY
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
