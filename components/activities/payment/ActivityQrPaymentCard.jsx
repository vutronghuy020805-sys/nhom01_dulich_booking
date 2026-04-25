import Image from "next/image";

function formatPrice(value) {
  return `${new Intl.NumberFormat("vi-VN").format(value)} VND`;
}

export default function ActivityQrPaymentCard({ bookingContext, referenceCode }) {
  const { ticket, totalPrice } = bookingContext;
  const payload = `VIEGO|PAY|REF:${referenceCode}|AMOUNT:${totalPrice}`;
  const qrSrc = `https://api.qrserver.com/v1/create-qr-code/?size=260x260&margin=10&data=${encodeURIComponent(
    payload
  )}`;

  return (
    <section className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-[0_1px_2px_rgba(15,23,42,0.03)]">
      <div className="px-5 py-4 bg-sky-50 border-b border-slate-200 flex items-center justify-between">
        <h2 className="text-base md:text-lg font-bold text-slate-900">
          Quét mã VietQR để thanh toán
        </h2>
        <span className="text-xs font-semibold text-sky-700 bg-white px-2 py-1 rounded border border-sky-200">
          VietQR
        </span>
      </div>

      <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-[auto_1fr] gap-6 md:gap-8 items-center">
        <div className="flex items-center justify-center">
          <div className="p-3 rounded-xl border border-slate-200 bg-white">
            <Image
              src={qrSrc}
              alt="Mã VietQR thanh toán"
              width={240}
              height={240}
              unoptimized
              className="w-60 h-60 object-contain"
            />
          </div>
        </div>

        <div className="space-y-4 text-sm md:text-base">
          <div>
            <div className="text-xs font-semibold tracking-wider text-slate-500 uppercase">
              Số tiền cần thanh toán
            </div>
            <div className="mt-1 text-2xl md:text-3xl font-bold text-orange-500">
              {formatPrice(totalPrice)}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-2 pt-3 border-t border-slate-100">
            <div className="flex items-center justify-between gap-3">
              <span className="text-slate-500 text-sm">Người thụ hưởng</span>
              <span className="font-semibold text-slate-800 text-sm">
                Công ty CP VieGo Travel
              </span>
            </div>
            <div className="flex items-center justify-between gap-3">
              <span className="text-slate-500 text-sm">Ngân hàng</span>
              <span className="font-semibold text-slate-800 text-sm">
                Vietcombank
              </span>
            </div>
            <div className="flex items-center justify-between gap-3">
              <span className="text-slate-500 text-sm">Số tài khoản</span>
              <span className="font-semibold text-slate-800 text-sm tabular-nums">
                1010 2345 6789
              </span>
            </div>
            <div className="flex items-center justify-between gap-3">
              <span className="text-slate-500 text-sm">Nội dung</span>
              <span className="font-semibold text-slate-800 text-sm">
                {referenceCode}
              </span>
            </div>
            <div className="flex items-center justify-between gap-3">
              <span className="text-slate-500 text-sm">Gói vé</span>
              <span
                className="font-semibold text-slate-800 text-sm text-right truncate max-w-60"
                title={ticket.title}
              >
                {ticket.title}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="px-5 md:px-6 py-4 bg-slate-50 border-t border-slate-200 text-xs md:text-sm text-slate-600 leading-relaxed">
        Mở ứng dụng ngân hàng hoặc ví điện tử hỗ trợ VietQR, quét mã và xác nhận
        thanh toán. Mã thanh toán chỉ có hiệu lực trong phiên này.
      </div>
    </section>
  );
}
