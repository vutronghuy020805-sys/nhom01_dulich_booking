import Link from "next/link";

function SearchIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}

export default function AirportTransferSearchSummary({
  fromLabel,
  dateTimeLabel,
  changeSearchHref,
}) {
  return (
    <section className="bg-white border-b border-slate-200">
      <div className="max-w-350 mx-auto px-4 lg:px-10 py-5 md:py-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="min-w-0">
          <h2 className="text-lg md:text-xl font-bold text-slate-900 truncate">
            From {fromLabel}
          </h2>
          {dateTimeLabel ? (
            <p className="mt-1 text-sm text-slate-600">{dateTimeLabel}</p>
          ) : null}
        </div>

        <Link
          href={changeSearchHref}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-sky-400 hover:bg-sky-500 text-white font-semibold text-sm transition-colors shadow-sm shrink-0"
        >
          <SearchIcon />
          Change Search
        </Link>
      </div>
    </section>
  );
}
