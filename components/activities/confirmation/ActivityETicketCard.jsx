import Image from "next/image";

function formatPrice(value) {
  return `${new Intl.NumberFormat("vi-VN").format(value)} VND`;
}

const METHOD_LABELS = {
  vietqr: "VietQR",
  "e-wallet": "Ví điện tử",
  "mobile-banking": "Ngân hàng di động",
  card: "Thẻ thanh toán",
  "in-store": "Tại cửa hàng",
};

function PinIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-4 h-4 shrink-0 text-slate-400"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M12 22s-7-7-7-12a7 7 0 0 1 14 0c0 5-7 12-7 12z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

function Row({ label, value, emphasize = false }) {
  return (
    <div className="flex items-start justify-between gap-4 py-2">
      <div className="text-sm text-slate-500 shrink-0">{label}</div>
      <div
        className={
          "text-sm text-right " +
          (emphasize
            ? "font-bold text-orange-500 text-base"
            : "font-medium text-slate-800")
        }
      >
        {value}
      </div>
    </div>
  );
}

export default function ActivityETicketCard({
  bookingContext,
  confirmation,
  contactInfo,
}) {
  const { slug, activity, ticket, quantities, totalPrice, dateLabel } =
    bookingContext;
  const totalQty = quantities.adult + quantities.senior + quantities.child;
  const bookingCode = confirmation?.bookingCode || "—";
  const eticketCode = confirmation?.eticketCode || "—";
  const methodLabel =
    METHOD_LABELS[confirmation?.method] || METHOD_LABELS.vietqr;

  const qrPayload = `VIEGO|ACTIVITY|ETICKET|BOOKING:${bookingCode}|SLUG:${slug}|TICKET:${ticket.id}`;
  const qrSrc = `https://api.qrserver.com/v1/create-qr-code/?size=240x240&margin=10&data=${encodeURIComponent(
    qrPayload
  )}`;

  const contactName = contactInfo?.contactFullName?.trim() || "—";
  const contactPhone = contactInfo?.contactPhone?.trim() || "—";
  const contactEmail = contactInfo?.contactEmail?.trim() || "—";
  const customerName =
    [contactInfo?.lastName, contactInfo?.firstName]
      .map((s) => (s ? s.trim() : ""))
      .filter(Boolean)
      .join(" ") || "—";

  return (
    <section className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-[0_1px_2px_rgba(15,23,42,0.03)]">
      <div className="px-5 md:px-6 py-4 bg-sky-50 border-b border-slate-200 flex items-center justify-between gap-3">
        <h2 className="text-base md:text-lg font-bold text-slate-900">
          Vé điện tử
        </h2>
        <span className="inline-flex items-center gap-1.5 text-xs md:text-sm font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-full px-3 py-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          Đã xác nhận
        </span>
      </div>

      <div className="p-5 md:p-6 grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-6 lg:gap-8">
        <div>
          <div className="flex items-start gap-4">
            <div className="relative w-24 h-20 rounded-lg overflow-hidden bg-slate-100 shrink-0">
              <Image
                src={ticket.image}
                alt={activity.title}
                fill
                sizes="96px"
                className="object-cover"
              />
            </div>
            <div className="min-w-0">
              <div className="text-base md:text-lg font-bold text-slate-900 leading-snug">
                {activity.title}
              </div>
              <div className="mt-1 flex items-center gap-1.5 text-sm text-slate-500">
                <PinIcon />
                <span className="truncate">{activity.location}</span>
              </div>
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-slate-100">
            <div className="text-xs font-semibold tracking-wider text-slate-500 uppercase mb-2">
              Gói vé
            </div>
            <div className="text-sm md:text-base font-semibold text-slate-800 leading-snug">
              {ticket.title}
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-100">
            <Row label="Ngày tham quan" value={dateLabel} />
            <Row
              label={`Người lớn (${formatPrice(ticket.pricing.adult.price)})`}
              value={quantities.adult}
            />
            <Row
              label={`Người cao tuổi (${formatPrice(ticket.pricing.senior.price)})`}
              value={quantities.senior}
            />
            <Row
              label={`Trẻ em (${formatPrice(ticket.pricing.child.price)})`}
              value={quantities.child}
            />
            <Row label="Tổng số vé" value={`${totalQty} vé`} />
          </div>

          <div className="mt-4 pt-4 border-t border-slate-100">
            <Row label="Phương thức thanh toán" value={methodLabel} />
            <Row
              label="Tổng đã thanh toán"
              value={formatPrice(totalPrice)}
              emphasize
            />
          </div>
        </div>

        <div className="flex flex-col items-center justify-start lg:border-l lg:border-slate-100 lg:pl-8">
          <div className="p-3 rounded-xl border border-slate-200 bg-white">
            <Image
              src={qrSrc}
              alt={`QR vé điện tử ${eticketCode}`}
              width={200}
              height={200}
              unoptimized
              className="w-50 h-50 object-contain"
            />
          </div>
          <div className="mt-3 text-center">
            <div className="text-xs font-semibold tracking-wider text-slate-500 uppercase">
              Mã vé điện tử
            </div>
            <div className="mt-1 text-base md:text-lg font-bold text-slate-900 tabular-nums">
              {eticketCode}
            </div>
            <div className="mt-1 text-xs text-slate-500">
              Xuất trình khi đến điểm dịch vụ
            </div>
          </div>
        </div>
      </div>

      <div className="px-5 md:px-6 py-5 border-t border-slate-200 bg-slate-50/60 grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <div className="text-xs font-semibold tracking-wider text-slate-500 uppercase mb-3">
            Người liên hệ
          </div>
          <div className="space-y-1.5 text-sm">
            <div className="flex justify-between gap-3">
              <span className="text-slate-500 shrink-0">Họ tên</span>
              <span className="text-slate-800 font-medium text-right">
                {contactName}
              </span>
            </div>
            <div className="flex justify-between gap-3">
              <span className="text-slate-500 shrink-0">Điện thoại</span>
              <span className="text-slate-800 font-medium text-right">
                {contactPhone}
              </span>
            </div>
            <div className="flex justify-between gap-3">
              <span className="text-slate-500 shrink-0">Email</span>
              <span className="text-slate-800 font-medium text-right break-all">
                {contactEmail}
              </span>
            </div>
          </div>
        </div>

        <div>
          <div className="text-xs font-semibold tracking-wider text-slate-500 uppercase mb-3">
            Khách hàng
          </div>
          <div className="space-y-1.5 text-sm">
            <div className="flex justify-between gap-3">
              <span className="text-slate-500 shrink-0">Họ và tên</span>
              <span className="text-slate-800 font-medium text-right">
                {customerName}
              </span>
            </div>
            <div className="flex justify-between gap-3">
              <span className="text-slate-500 shrink-0">Mã đặt chỗ</span>
              <span className="text-slate-800 font-bold text-right tabular-nums">
                {bookingCode}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
