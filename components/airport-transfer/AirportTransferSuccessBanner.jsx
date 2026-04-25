function CheckCircleIcon() {
  return (
    <svg
      viewBox="0 0 48 48"
      className="w-12 h-12 md:w-14 md:h-14 text-emerald-500"
      fill="currentColor"
      aria-hidden
    >
      <circle cx="24" cy="24" r="22" fill="currentColor" opacity="0.12" />
      <circle cx="24" cy="24" r="17" fill="currentColor" />
      <polyline
        points="17 24 22 29 31 19"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function AirportTransferSuccessBanner({
  bookingCode,
  eticketCode,
}) {
  return (
    <section className="bg-gradient-to-r from-emerald-50 via-emerald-50 to-sky-50 border border-emerald-200 rounded-2xl p-5 md:p-6 shadow-sm">
      <div className="flex items-start md:items-center gap-4 md:gap-5">
        <CheckCircleIcon />
        <div className="flex-1 min-w-0">
          <h1 className="text-xl md:text-2xl font-bold text-emerald-700">
            Đặt xe thành công!
          </h1>
          <p className="mt-1 text-sm md:text-[15px] text-slate-700 leading-relaxed">
            VieGo đã xác nhận chuyến xe đưa đón sân bay của bạn. Thông tin đặt
            xe điện tử đã được gửi đến email của bạn.
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
            <div className="inline-flex items-center gap-1.5">
              <span className="text-slate-500">Mã đặt chỗ:</span>
              <span className="font-mono font-bold text-slate-900">
                {bookingCode}
              </span>
            </div>
            <div className="inline-flex items-center gap-1.5">
              <span className="text-slate-500">Mã vé điện tử:</span>
              <span className="font-mono font-bold text-slate-900">
                {eticketCode}
              </span>
            </div>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Thanh toán thành công
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
