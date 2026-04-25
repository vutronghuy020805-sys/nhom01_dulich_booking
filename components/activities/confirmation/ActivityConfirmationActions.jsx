import Link from "next/link";

function DownloadIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <polyline points="3 7 12 13 21 7" />
    </svg>
  );
}

function BookmarkIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
    </svg>
  );
}

function CompassIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="12" cy="12" r="10" />
      <polygon points="16 8 14 14 8 16 10 10 16 8" />
    </svg>
  );
}

export default function ActivityConfirmationActions({ onDownload, onResendEmail }) {
  return (
    <section className="bg-white border border-slate-200 rounded-2xl p-5 md:p-6 shadow-[0_1px_2px_rgba(15,23,42,0.03)]">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <button
          type="button"
          onClick={onDownload}
          className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-3 rounded-lg transition"
        >
          <DownloadIcon />
          Tải vé điện tử
        </button>
        <button
          type="button"
          onClick={onResendEmail}
          className="inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-blue-700 font-semibold px-5 py-3 rounded-lg border border-blue-200 hover:border-blue-300 transition"
        >
          <MailIcon />
          Gửi lại email
        </button>
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-700 font-semibold px-5 py-3 rounded-lg border border-slate-200 hover:border-slate-300 transition"
        >
          <BookmarkIcon />
          Về Đặt chỗ của tôi
        </Link>
        <Link
          href="/activities"
          className="inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-5 py-3 rounded-lg transition"
        >
          <CompassIcon />
          Tiếp tục khám phá
        </Link>
      </div>
    </section>
  );
}
