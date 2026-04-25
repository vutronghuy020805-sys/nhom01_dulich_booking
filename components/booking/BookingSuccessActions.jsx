import Link from "next/link";

export default function BookingSuccessActions() {
  return (
    <section className="flex flex-col md:flex-row gap-3 justify-center">
      <Link
        href="/"
        className="px-6 py-3 rounded-xl border border-gray-300 text-slate-700 hover:bg-slate-50 font-semibold text-sm text-center transition"
      >
        Về trang chủ
      </Link>
      <Link
        href="/my-bookings"
        className="px-6 py-3 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-semibold text-sm text-center transition"
      >
        Xem đơn đặt chỗ
      </Link>
      <Link
        href="/hotels"
        className="px-6 py-3 rounded-xl border border-sky-500 text-sky-600 hover:bg-sky-50 font-semibold text-sm text-center transition"
      >
        Tiếp tục khám phá
      </Link>
    </section>
  );
}
