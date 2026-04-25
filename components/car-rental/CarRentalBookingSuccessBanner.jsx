"use client";

import { useEffect, useState } from "react";
import { getCarRentalConfirmationStorageKey } from "./CarRentalPaymentConfirmationCard";

const METHOD_LABEL = {
  vietqr: "VietQR",
  "digital-wallet": "Ví điện tử",
  "mobile-banking": "Ngân hàng di động",
  card: "Thẻ thanh toán",
  store: "Thanh toán tại cửa hàng",
  "vietinbank-transfer": "Chuyển khoản VietinBank",
};

function formatPaidAt(iso) {
  if (!iso) return null;
  try {
    const d = new Date(iso);
    const pad = (n) => String(n).padStart(2, "0");
    return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()} ${pad(
      d.getHours()
    )}:${pad(d.getMinutes())}`;
  } catch {
    return null;
  }
}

export default function CarRentalBookingSuccessBanner({
  vehicleId,
  bookingCode,
  ticketCode,
}) {
  const [confirmation, setConfirmation] = useState(null);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(
        getCarRentalConfirmationStorageKey(vehicleId)
      );
      if (raw) setConfirmation(JSON.parse(raw));
    } catch {
      // ignore
    }
  }, [vehicleId]);

  const paidAt = formatPaidAt(confirmation?.paidAt);
  const methodLabel = METHOD_LABEL[confirmation?.methodId] || "VietQR";

  return (
    <section className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
      <div className="px-6 py-8 text-center bg-gradient-to-b from-emerald-50 to-white">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500 text-white shadow-lg mb-4">
          <svg
            viewBox="0 0 24 24"
            className="w-9 h-9"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
          Đặt thuê xe thành công!
        </h1>
        <p className="mt-2 text-slate-600 max-w-xl mx-auto leading-relaxed">
          Thông tin thuê xe của bạn đã được xác nhận. VieGo đã gửi chi tiết đặt
          chỗ đến email của bạn. Bạn cũng có thể xem lại đặt chỗ này trong mục{" "}
          <span className="font-semibold">Đặt chỗ của tôi</span>.
        </p>
      </div>

      <div className="px-6 py-5 border-t border-dashed border-gray-200 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <div className="text-xs uppercase tracking-wide text-slate-500">
            Mã đặt chỗ
          </div>
          <div className="text-lg md:text-xl font-bold text-sky-600 tracking-wider mt-1">
            {bookingCode}
          </div>
        </div>
        <div>
          <div className="text-xs uppercase tracking-wide text-slate-500">
            Mã xác nhận thuê xe
          </div>
          <div className="text-lg md:text-xl font-bold text-slate-800 tracking-wider mt-1">
            {ticketCode}
          </div>
        </div>
        <div className="md:text-right">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full">
            <svg
              viewBox="0 0 24 24"
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
            Thanh toán thành công
          </span>
          <div className="text-xs text-slate-500 mt-1">
            Phương thức: {methodLabel}
          </div>
          {paidAt && (
            <div className="text-xs text-slate-500 mt-0.5">
              Thanh toán lúc {paidAt}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
