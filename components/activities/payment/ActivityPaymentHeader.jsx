import Link from "next/link";

export default function ActivityPaymentHeader() {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
      <div className="max-w-375 mx-auto px-6 lg:px-10 py-3 flex items-center justify-between gap-4">
        <Link href="/" className="shrink-0 flex items-center gap-3">
          <img
            src="/assets/logo-viego.png"
            alt="VieGo Travel"
            className="w-12 h-12 object-contain brightness-0"
          />
          <span className="hidden md:inline text-sm font-semibold text-slate-600">
            Thanh toán an toàn
          </span>
        </Link>

        <div className="flex items-center gap-2 text-slate-600 text-sm">
          <svg
            viewBox="0 0 24 24"
            className="w-5 h-5 text-emerald-500"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="M12 2l8 4v6c0 5-3.5 9-8 10-4.5-1-8-5-8-10V6l8-4z" />
            <polyline points="9 12 11 14 15 10" />
          </svg>
          <span className="hidden md:inline">Giao dịch được mã hóa SSL</span>
        </div>
      </div>
    </header>
  );
}
