function formatVnd(value) {
  return value.toLocaleString("vi-VN") + " VND";
}

function StatusBadge({ children, tone = "emerald" }) {
  const tones = {
    emerald: "bg-emerald-100 text-emerald-700",
    sky: "bg-sky-100 text-sky-700",
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${tones[tone] || tones.emerald}`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${
          tone === "sky" ? "bg-sky-500" : "bg-emerald-500"
        }`}
      />
      {children}
    </span>
  );
}

function InfoRow({ label, value }) {
  return (
    <div>
      <dt className="text-xs text-slate-500 uppercase tracking-wide">
        {label}
      </dt>
      <dd className="mt-0.5 text-sm font-semibold text-slate-900 break-words">
        {value || "—"}
      </dd>
    </div>
  );
}

export default function AirportTransferETicketCard({
  bookingCode,
  eticketCode,
  vehicle,
  fromName,
  toName,
  dateLabel,
  timeLabel,
  airline,
  flightNumber,
  carQuantity,
  totalPrice,
  paymentMethod,
  contactTitle,
  contactName,
  contactPhone,
  contactEmail,
  noteToDriver,
  qrSrc,
}) {
  const passengers = vehicle?.passengers ? `${vehicle.passengers} hành khách` : "—";
  const baggage = vehicle?.baggage ? `${vehicle.baggage} hành lý` : "—";
  const displayName = [contactTitle, contactName].filter(Boolean).join(" ");
  const fromShort = fromName
    ? fromName.replace(/\s*\([^)]+\)\s*$/, "").trim()
    : "—";

  return (
    <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="bg-sky-500 text-white px-5 md:px-6 py-4 flex items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-wider opacity-80">
            Vé điện tử
          </p>
          <h2 className="text-lg md:text-xl font-bold">
            Xác nhận đặt xe đưa đón sân bay
          </h2>
        </div>
        <div className="flex flex-col items-end gap-1">
          <StatusBadge tone="emerald">Đã thanh toán</StatusBadge>
          <StatusBadge tone="sky">Đã xác nhận</StatusBadge>
        </div>
      </div>

      <div className="p-5 md:p-6 grid grid-cols-1 md:grid-cols-[1fr_200px] gap-6 md:gap-8 items-start">
        <div className="space-y-6 min-w-0">
          <div>
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wide">
                  Phương tiện
                </p>
                <p className="mt-0.5 text-base md:text-lg font-bold text-slate-900">
                  {vehicle?.name || "—"}{" "}
                  <span className="font-semibold text-slate-700">
                    {vehicle?.tier ? `(${vehicle.tier})` : ""}
                  </span>
                </p>
                <p className="mt-0.5 text-sm text-slate-600">
                  {passengers} • {baggage} • {carQuantity || 1} xe
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InfoRow label="Mã đặt chỗ" value={bookingCode} />
            <InfoRow label="Mã vé điện tử" value={eticketCode} />
            <InfoRow label="Sân bay đón" value={fromShort} />
            <InfoRow label="Điểm trả" value={toName} />
            <InfoRow label="Ngày đón" value={dateLabel} />
            <InfoRow
              label="Giờ đón"
              value={
                timeLabel ? `${timeLabel} (tuỳ giờ đến chuyến bay)` : "—"
              }
            />
            <InfoRow label="Hãng hàng không" value={airline} />
            <InfoRow label="Mã chuyến bay" value={flightNumber} />
          </div>

          <div className="border-t border-slate-100 pt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InfoRow label="Người liên hệ" value={displayName} />
            <InfoRow label="Email" value={contactEmail} />
            <InfoRow label="Số điện thoại" value={contactPhone} />
            <InfoRow label="Ghi chú cho tài xế" value={noteToDriver} />
          </div>

          <div className="border-t border-slate-100 pt-5 flex items-center justify-between gap-4 flex-wrap">
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-wide">
                Phương thức thanh toán
              </p>
              <p className="mt-0.5 text-sm font-semibold text-slate-900">
                {paymentMethod || "QR chuyển khoản"}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-slate-500 uppercase tracking-wide">
                Tổng đã thanh toán
              </p>
              <p className="mt-0.5 text-xl md:text-2xl font-bold text-orange-500">
                {totalPrice ? formatVnd(totalPrice) : "—"}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center md:items-stretch gap-3">
          <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-sm flex items-center justify-center">
            {qrSrc ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={qrSrc}
                alt={`QR vé điện tử ${bookingCode}`}
                width={180}
                height={180}
                className="w-45 h-45"
              />
            ) : (
              <div className="w-45 h-45 bg-slate-100" />
            )}
          </div>
          <p className="text-center text-xs text-slate-500 leading-relaxed">
            Xuất trình mã QR hoặc{" "}
            <span className="font-mono font-semibold text-slate-700">
              {bookingCode}
            </span>{" "}
            cho tài xế khi đón.
          </p>
        </div>
      </div>
    </section>
  );
}
