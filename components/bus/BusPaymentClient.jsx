"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import BusPaymentCountdownBanner from "./BusPaymentCountdownBanner";
import BusPaymentMethodsCard, {
  BUS_PAYMENT_METHODS,
  DEFAULT_BUS_PAYMENT_METHOD_ID,
} from "./BusPaymentMethodsCard";
import BusCouponCard from "./BusCouponCard";
import BusPaymentTotalCard from "./BusPaymentTotalCard";

export default function BusPaymentClient({ tripId, trip, seats, nextQuery }) {
  const router = useRouter();
  const [methodId, setMethodId] = useState(DEFAULT_BUS_PAYMENT_METHOD_ID);
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  const subtotal = trip.price * seats;
  const discount = appliedCoupon?.discount || 0;
  const total = Math.max(0, subtotal - discount);

  const method = useMemo(
    () =>
      BUS_PAYMENT_METHODS.find((m) => m.id === methodId) ||
      BUS_PAYMENT_METHODS[0],
    [methodId]
  );

  const qrHref = `/bus/booking/${encodeURIComponent(
    tripId
  )}/payment/qr?${nextQuery}`;

  const ctaClasses =
    "w-full py-4 rounded-xl bg-orange-500 hover:bg-orange-600 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold text-base transition text-center block";

  const persistSelection = () => {
    try {
      sessionStorage.setItem(
        `bus-payment:selection:${tripId}`,
        JSON.stringify({
          methodId,
          coupon: appliedCoupon?.code || null,
          discount,
          total,
        })
      );
    } catch {
      // ignore
    }
  };

  const handleNonQrClick = () => {
    persistSelection();
    window.alert(
      `Đang chuẩn bị flow thanh toán qua "${method.label}". Tính năng này sẽ sớm được cập nhật trên VieGo.`
    );
  };

  return (
    <div className="space-y-5">
      <BusPaymentCountdownBanner tripId={tripId} />

      <BusPaymentMethodsCard selected={methodId} onChange={setMethodId} />

      <BusCouponCard
        subtotal={subtotal}
        appliedCoupon={appliedCoupon}
        onApply={setAppliedCoupon}
        onRemove={() => setAppliedCoupon(null)}
      />

      <BusPaymentTotalCard
        subtotal={subtotal}
        discount={discount}
        total={total}
        seats={seats}
        unitLabel={`${trip.operator.name} (${trip.operator.vehicleShort})`}
      />

      <div>
        {methodId === "vietqr" ? (
          <Link
            href={qrHref}
            onClick={persistSelection}
            className={ctaClasses}
          >
            {method.ctaText}
          </Link>
        ) : (
          <button
            type="button"
            disabled={method.disabled}
            onClick={handleNonQrClick}
            className={ctaClasses}
          >
            {method.ctaText}
          </button>
        )}
        <p className="text-xs text-slate-500 mt-3 leading-relaxed text-center">
          Bằng cách tiếp tục thanh toán, bạn đã đồng ý với{" "}
          <a href="#" className="text-sky-600 hover:underline">
            Điều khoản & Điều kiện
          </a>{" "}
          và{" "}
          <a href="#" className="text-sky-600 hover:underline">
            Chính sách quyền riêng tư của VieGo
          </a>
          .
        </p>
      </div>
    </div>
  );
}
