import Link from "next/link";

export default function BookingSuccessHeader() {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-375 mx-auto px-6 lg:px-10 py-3 flex items-center justify-between">
        <Link href="/" className="inline-flex items-center">
          <img
            src="/nhom01_dulich_booking/assets/logo-viego.png"
            alt="VieGo Travel"
            className="w-12 h-12 object-contain brightness-0"
          />
        </Link>

        <div className="hidden md:inline-flex items-center gap-2 text-sm text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-full font-semibold">
          <svg
            viewBox="0 0 24 24"
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
          Đặt phòng hoàn tất
        </div>
      </div>
    </header>
  );
}
