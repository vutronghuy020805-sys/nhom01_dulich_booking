"use client";

import { useRouter } from "next/navigation";
import {
  generateFlightBookingCode,
  getFlightConfirmationStorageKey,
} from "./flightResultsData";

export default function FlightQrConfirmationBox({
  fromSlug,
  toSlug,
  flightId,
  bookingCode,
  basePrice,
  dateIso,
}) {
  const router = useRouter();

  const handleConfirm = () => {
    const code = bookingCode || generateFlightBookingCode(flightId);
    const payload = {
      code,
      status: "paid",
      paymentMethod: "vietqr",
      paidAt: new Date().toISOString(),
    };
    try {
      sessionStorage.setItem(
        getFlightConfirmationStorageKey(fromSlug, toSlug, flightId),
        JSON.stringify(payload)
      );
    } catch {
      // ignore storage errors
    }

    const query = new URLSearchParams();
    query.set("flightId", flightId);
    if (basePrice) query.set("price", String(basePrice));
    if (dateIso) query.set("date", dateIso);
    router.push(
      `/flights/booking/${fromSlug}/${toSlug}/success?${query.toString()}`
    );
  };

  return (
    <section>
      <h2 className="text-xl font-bold text-slate-900 mb-3">
        Bạn đã hoàn tất thanh toán?
      </h2>
      <div className="bg-white border border-gray-200 rounded-2xl p-5">
        <p className="text-sm text-slate-600 mb-4 leading-relaxed">
          Sau khi VieGo xác nhận thanh toán của bạn, vé điện tử và biên nhận
          của chuyến bay sẽ được gửi qua email.
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
