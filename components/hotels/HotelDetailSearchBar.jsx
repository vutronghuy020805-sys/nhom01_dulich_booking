export default function HotelDetailSearchBar({ hotel, locationCity }) {
  return (
    <section className="bg-white border-b border-gray-100">
      <div className="max-w-375 mx-auto px-6 lg:px-10 py-4">
        <div className="flex flex-col md:flex-row gap-3 md:items-stretch">
          <div className="flex-1 min-w-[240px] flex items-center gap-3 px-4 py-3 rounded-xl border border-gray-200 bg-white">
            <svg
              viewBox="0 0 24 24"
              className="w-5 h-5 text-slate-400 shrink-0"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
              <circle cx="12" cy="9" r="2.5" />
            </svg>
            <div className="text-sm text-slate-800 truncate font-medium">
              {hotel.name}
            </div>
          </div>

          <div className="flex items-center gap-3 px-4 py-3 rounded-xl border border-gray-200 bg-white min-w-[220px]">
            <svg
              viewBox="0 0 24 24"
              className="w-5 h-5 text-slate-400 shrink-0"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <path d="M16 2v4M8 2v4M3 10h18" />
            </svg>
            <div className="text-sm text-slate-800">
              <div className="font-medium">03 thg 5 - 04 thg 5</div>
              <div className="text-xs text-slate-500">1 đêm</div>
            </div>
          </div>

          <div className="flex items-center gap-3 px-4 py-3 rounded-xl border border-gray-200 bg-white min-w-[220px]">
            <svg
              viewBox="0 0 24 24"
              className="w-5 h-5 text-slate-400 shrink-0"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            <div className="text-sm text-slate-800 font-medium">
              2 người lớn, 0 Trẻ em, 1 phòng
            </div>
          </div>

          <button
            type="button"
            className="md:w-auto px-6 py-3 rounded-xl bg-sky-500 hover:bg-sky-600 text-white text-sm font-bold tracking-wide transition"
          >
            Tìm khách sạn
          </button>
        </div>
        {locationCity && (
          <p className="mt-2 text-xs text-slate-400">
            Đang xem cơ sở lưu trú tại {locationCity}
          </p>
        )}
      </div>
    </section>
  );
}
