function CheckCircleIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-10 h-10 md:w-12 md:h-12"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="8 12 11 15 16 9" />
    </svg>
  );
}

export default function ActivityBookingSuccessBanner({
  bookingCode,
  eticketCode,
}) {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-linear-to-br from-emerald-500 via-emerald-400 to-teal-500 text-white px-5 md:px-8 py-6 md:py-8 shadow-[0_10px_30px_-12px_rgba(16,185,129,0.35)]">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-16 -right-16 w-56 h-56 rounded-full bg-white/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-20 -left-10 w-64 h-64 rounded-full bg-emerald-200/20 blur-3xl"
      />

      <div className="relative flex flex-col md:flex-row md:items-center gap-5 md:gap-8">
        <div className="shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/20 border-2 border-white/40 flex items-center justify-center">
          <CheckCircleIcon />
        </div>

        <div className="flex-1 min-w-0">
          <h1 className="text-2xl md:text-3xl font-bold leading-tight">
            Đặt vé thành công!
          </h1>
          <p className="mt-2 text-sm md:text-base text-white/90 leading-relaxed max-w-2xl">
            VieGo đã xác nhận đơn đặt vé của bạn. Vé điện tử và thông tin sử
            dụng dịch vụ đã được gửi đến email của bạn.
          </p>

          <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="rounded-xl bg-white/15 border border-white/20 px-4 py-3">
              <div className="text-xs font-semibold text-white/80 uppercase tracking-wider">
                Mã đặt chỗ
              </div>
              <div className="mt-1 font-bold text-base md:text-lg tabular-nums">
                {bookingCode || "—"}
              </div>
            </div>
            <div className="rounded-xl bg-white/15 border border-white/20 px-4 py-3">
              <div className="text-xs font-semibold text-white/80 uppercase tracking-wider">
                Mã vé điện tử
              </div>
              <div className="mt-1 font-bold text-base md:text-lg tabular-nums">
                {eticketCode || "—"}
              </div>
            </div>
            <div className="rounded-xl bg-white/15 border border-white/20 px-4 py-3">
              <div className="text-xs font-semibold text-white/80 uppercase tracking-wider">
                Trạng thái
              </div>
              <div className="mt-1 font-bold text-base md:text-lg flex items-center gap-1.5">
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-200" />
                Đã thanh toán
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
