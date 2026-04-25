function formatVnd(value) {
  return value.toLocaleString("vi-VN") + " VND";
}

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-4 h-4 text-emerald-500 shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="16 10 11 15 8 12" />
    </svg>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex justify-between gap-4 text-sm">
      <dt className="text-slate-500">{label}</dt>
      <dd className="font-semibold text-slate-900 text-right break-words">
        {value || "—"}
      </dd>
    </div>
  );
}

function SectionTitle({ children }) {
  return (
    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
      {children}
    </h3>
  );
}

export default function AirportTransferPaymentSummaryCard({
  vehicle,
  fromName,
  toName,
  dateLabel,
  timeStr,
  airline,
  flightNumber,
  carQuantity,
  contactTitle,
  contactName,
  contactPhone,
  contactEmail,
  paymentLabel,
  totalPrice,
}) {
  const fromShort = fromName
    ? fromName.replace(/\s*\([^)]+\)\s*$/, "").trim()
    : "—";
  const toShort = toName || "—";
  const displayName =
    [contactTitle, contactName].filter(Boolean).join(" ") || "—";

  return (
    <aside className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="bg-sky-50 px-5 md:px-6 py-3.5 border-b border-sky-100">
        <h2 className="text-base md:text-lg font-bold text-slate-900">
          Thông tin chi tiết
        </h2>
      </div>

      <div className="p-5 md:p-6 space-y-5">
        <section>
          <SectionTitle>Chuyến đi</SectionTitle>
          <dl className="mt-2 space-y-1.5">
            <Row label="Loại dịch vụ" value="Đưa đón sân bay" />
            <Row
              label="Tên xe"
              value={
                vehicle
                  ? `${vehicle.name}${vehicle.tier ? ` (${vehicle.tier})` : ""}`
                  : "—"
              }
            />
            <Row label="Loại xe" value={vehicle?.tier} />
            <Row label="Ngày đón" value={dateLabel} />
            <Row label="Giờ đón" value={timeStr} />
          </dl>
        </section>

        <section className="pt-4 border-t border-slate-100">
          <SectionTitle>Tuyến đường</SectionTitle>
          <ul className="relative mt-2 pl-5 space-y-2 text-sm text-slate-700">
            <li className="relative">
              <span className="absolute -left-5 top-1.5 w-2.5 h-2.5 rounded-full bg-white border-2 border-slate-400" />
              <span className="absolute -left-[15px] top-4 bottom-[-10px] w-0.5 bg-slate-200" />
              <span className="block">
                Từ <span className="font-semibold">{fromShort}</span>
              </span>
            </li>
            <li className="relative">
              <span className="absolute -left-5 top-1.5 w-2.5 h-2.5 rounded-full bg-slate-700" />
              <span className="block">
                Đến <span className="font-semibold">{toShort}</span>
              </span>
            </li>
          </ul>
        </section>

        <section className="pt-4 border-t border-slate-100">
          <SectionTitle>Chi tiết xe</SectionTitle>
          <dl className="mt-2 space-y-1.5">
            <Row
              label="Số hành khách"
              value={vehicle ? `${vehicle.passengers} hành khách` : undefined}
            />
            <Row
              label="Số hành lý"
              value={vehicle ? `${vehicle.baggage} hành lý` : undefined}
            />
            <Row label="Số lượng xe" value={`${carQuantity || 1} xe`} />
          </dl>
        </section>

        <section className="pt-4 border-t border-slate-100">
          <SectionTitle>Thông tin chuyến bay</SectionTitle>
          <dl className="mt-2 space-y-1.5">
            <Row label="Hãng bay" value={airline} />
            <Row label="Mã chuyến bay" value={flightNumber} />
          </dl>
        </section>

        <section className="pt-4 border-t border-slate-100">
          <SectionTitle>Thông tin liên hệ</SectionTitle>
          <dl className="mt-2 space-y-1.5">
            <Row label="Người liên hệ" value={displayName} />
            <Row label="Số điện thoại" value={contactPhone} />
            <Row label="Email" value={contactEmail} />
          </dl>
        </section>

        <section className="pt-4 border-t border-slate-100">
          <SectionTitle>Thanh toán</SectionTitle>
          <dl className="mt-2 space-y-1.5">
            <Row label="Phương thức" value={paymentLabel} />
            <div className="flex justify-between gap-4 pt-1">
              <dt className="text-sm font-semibold text-slate-900">
                Tổng tiền
              </dt>
              <dd className="text-base md:text-lg font-bold text-orange-500">
                {totalPrice ? formatVnd(totalPrice) : "—"}
              </dd>
            </div>
          </dl>
        </section>

        <section className="pt-4 border-t border-slate-100 space-y-1.5">
          <div className="inline-flex items-center gap-2 text-emerald-600 text-sm font-medium">
            <CheckIcon />
            <span>Được hoàn tiền</span>
          </div>
          <div className="inline-flex items-center gap-2 text-emerald-600 text-sm font-medium">
            <CheckIcon />
            <span>Được đổi lịch</span>
          </div>
        </section>
      </div>
    </aside>
  );
}
