import Link from "next/link";

export default function BusSearchResultsHeader({
  fromCityName,
  toCityName,
  dateLong,
  seats,
  changeSearchHref,
}) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl px-5 py-4 flex flex-col md:flex-row md:items-center gap-3 md:gap-6">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 text-lg md:text-xl font-bold text-slate-900">
          <span className="truncate">{fromCityName}</span>
          <svg
            viewBox="0 0 24 24"
            className="w-5 h-5 text-sky-500 shrink-0"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="M5 12h14M13 5l7 7-7 7" />
          </svg>
          <span className="truncate">{toCityName}</span>
        </div>
        <div className="mt-1 text-sm text-slate-600">
          {dateLong}
          <span className="text-slate-300 mx-2">•</span>
          {seats} chỗ ngồi
        </div>
      </div>

      <Link
        href={changeSearchHref}
        className="shrink-0 inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-sky-500 hover:bg-sky-600 text-white font-semibold text-sm transition"
      >
        Thay đổi tìm kiếm
      </Link>
    </div>
  );
}
