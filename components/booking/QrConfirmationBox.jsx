"use client";

import { useRouter } from "next/navigation";

export const confirmationStorageKey = (locationSlug, hotelSlug, ratePlanId) =>
  `booking:confirmation:${locationSlug}:${hotelSlug}:${ratePlanId}`;

const generateBookingCode = () => {
  const year = new Date().getFullYear();
  const num = Math.floor(100000 + Math.random() * 900000);
  return `VG-${year}-${num}`;
};

export default function QrConfirmationBox({
  locationSlug,
  hotelSlug,
  ratePlanId,
  roomSectionId,
}) {
  const router = useRouter();

  const handleConfirm = () => {
    const code = generateBookingCode();
    const payload = {
      code,
      status: "paid",
      paymentMethod: "vietqr",
      paidAt: new Date().toISOString(),
    };
    try {
      sessionStorage.setItem(
        confirmationStorageKey(locationSlug, hotelSlug, ratePlanId),
        JSON.stringify(payload)
      );
    } catch {
      // ignore
    }

    const url = `/booking/${encodeURIComponent(
      locationSlug
    )}/${encodeURIComponent(
      hotelSlug
    )}/success?roomSectionId=${encodeURIComponent(
      roomSectionId
    )}&ratePlanId=${encodeURIComponent(ratePlanId)}`;
    router.push(url);
  };

  return (
    <section>
      <h2 className="text-xl font-bold text-slate-900 mb-3">
        Đã hoàn tất thanh toán của bạn?
      </h2>
      <div className="bg-white border border-gray-200 rounded-2xl p-5">
        <p className="text-sm text-slate-600 mb-4 leading-relaxed">
          Sau khi xác nhận thanh toán của bạn, chúng tôi sẽ gửi vé điện tử và
          biên nhận qua email.
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
