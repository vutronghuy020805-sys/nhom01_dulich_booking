import Link from "next/link";

export default function FlightBookingNotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-6">
      <div className="text-center max-w-md">
        <div className="text-6xl mb-4">✈️</div>
        <h1 className="text-2xl font-bold text-gray-800 mb-3">
          Không tìm thấy chuyến bay
        </h1>
        <p className="text-gray-600 mb-5 text-sm leading-relaxed">
          Có vẻ link đặt vé này đã hết hạn hoặc thiếu thông tin. Quay lại trang
          tìm chuyến bay để bắt đầu lại.
        </p>
        <Link
          href="/flights"
          className="inline-block bg-sky-600 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-sky-700 transition-colors"
        >
          ← Tìm chuyến bay khác
        </Link>
      </div>
    </div>
  );
}
