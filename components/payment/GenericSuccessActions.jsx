import Link from "next/link";

/**
 * Unified success actions — 3 nút footer trên trang xác nhận thành công.
 *
 * Props:
 * - homeHref (default "/")
 * - bookingsHref (default "/my-bookings")
 * - exploreHref — URL "Tiếp tục khám phá", tuỳ flow (vd "/hotels", "/bus", "/airport-transfer", ...)
 * - exploreLabel (default "Tiếp tục khám phá")
 */
export default function GenericSuccessActions({
  homeHref = "/",
  bookingsHref = "/my-bookings",
  exploreHref = "/",
  exploreLabel = "Tiếp tục khám phá",
}) {
  return (
    <section className="flex flex-col md:flex-row gap-3 justify-center">
      <Link
        href={homeHref}
        className="px-6 py-3 rounded-xl border border-gray-300 text-slate-700 hover:bg-slate-50 font-semibold text-sm text-center transition"
      >
        Về trang chủ
      </Link>
      <Link
        href={bookingsHref}
        className="px-6 py-3 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-semibold text-sm text-center transition"
      >
        Xem đơn đặt chỗ
      </Link>
      <Link
        href={exploreHref}
        className="px-6 py-3 rounded-xl border border-sky-500 text-sky-600 hover:bg-sky-50 font-semibold text-sm text-center transition"
      >
        {exploreLabel}
      </Link>
    </section>
  );
}
