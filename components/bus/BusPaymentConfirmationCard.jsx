"use client";

import { useRouter } from "next/navigation";

export function getBusConfirmationStorageKey(tripId) {
  return `bus-confirmation:${tripId}`;
}

export default function BusPaymentConfirmationCard({
  tripId,
  bookingCode,
  nextQuery,
}) {
  const router = useRouter();

  const handleConfirm = () => {
    let methodId = "vietqr";
    let total = null;
    try {
      const raw = sessionStorage.getItem(`bus-payment:selection:${tripId}`);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed.methodId) methodId = parsed.methodId;
        if (typeof parsed.total === "number") total = parsed.total;
      }
    } catch {
      // ignore
    }

    const payload = {
      bookingCode,
      status: "paid",
      methodId,
      total,
      paidAt: new Date().toISOString(),
    };
    try {
      sessionStorage.setItem(
        getBusConfirmationStorageKey(tripId),
        JSON.stringify(payload)
      );
    } catch {
      // ignore
    }

    router.push(
      `/bus/booking/${encodeURIComponent(tripId)}/confirmation?${nextQuery}`
    );
  };

  return (
    <section>
      <h2 className="text-xl font-bold text-slate-900 mb-3">
        Đã hoàn tất thanh toán của bạn?
      </h2>
      <div className="bg-white border border-slate-200 rounded-2xl p-5">
        <p className="text-sm text-slate-600 mb-4 leading-relaxed">
          Sau khi xác nhận thanh toán của bạn, VieGo sẽ gửi vé điện tử qua
          email và cập nhật trong mục Đặt chỗ của tôi.
        </p>
        <button
          type="button"
          onClick={handleConfirm}
          className="w-full py-3 rounded-xl border border-sky-500 text-sky-600 hover:bg-sky-50 font-bold text-sm transition"
        >
          Vâng, tôi đã thanh toán
        </button>
      </div>
    </section>
  );
}
