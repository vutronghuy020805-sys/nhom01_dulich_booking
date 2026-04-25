export default function HotelDetailSummary({ hotel }) {
  const stars = "★".repeat(hotel.stars);
  return (
    <section className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
      <div className="flex-1">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
          {hotel.name}
        </h1>

        <div className="mt-2 flex items-center gap-2 flex-wrap">
          <span className="inline-flex items-center gap-1 text-xs bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full font-medium">
            <svg
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
          {hotel.ratingText && (
            <span className="text-xs text-blue-700 font-semibold bg-blue-50 px-2 py-1 rounded-full">
              {hotel.rating.toFixed(1)} · {hotel.ratingText}
            </span>
          )}
        </div>

        <p className="mt-3 flex items-start gap-1.5 text-sm text-slate-500 leading-relaxed max-w-2xl">
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-4 h-4 text-red-400 shrink-0 mt-0.5"
          >
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z" />
          </svg>
          <span>{hotel.address}</span>
        </p>
      </div>

      <div className="md:text-right">
        <div className="text-xs text-slate-500">Giá/phòng/đêm từ</div>
        <div className="text-2xl md:text-3xl font-bold text-red-600 mt-1">
          {hotel.price.toLocaleString("vi-VN")} VND
        </div>
        <a
          href="#rooms"
          className="mt-3 inline-block px-8 py-3 rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm transition"
        >
          Chọn phòng
        </a>
      </div>
    </section>
  );
}
