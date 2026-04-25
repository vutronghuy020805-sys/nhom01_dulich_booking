"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import CarRentalPaymentCountdownBanner from "./CarRentalPaymentCountdownBanner";
import CarRentalPaymentMethodsCard, {
  CAR_RENTAL_PAYMENT_METHODS,
  DEFAULT_CAR_RENTAL_PAYMENT_METHOD_ID,
} from "./CarRentalPaymentMethodsCard";
import CarRentalCouponCard from "./CarRentalCouponCard";
import CarRentalTotalCard from "./CarRentalTotalCard";

function selectionStorageKey(vehicleId) {
  return `viego:car-rental:payment:selection:${vehicleId}`;
}

export default function CarRentalPaymentClient({
  vehicleId,
  searchQuery,
  packageLabel,
  subtotal,
  qrHref,
}) {
  const [methodId, setMethodId] = useState(DEFAULT_CAR_RENTAL_PAYMENT_METHOD_ID);
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [expired, setExpired] = useState(false);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(selectionStorageKey(vehicleId));
      if (!raw) return;
      const parsed = JSON.parse(raw);
      if (parsed.methodId) setMethodId(parsed.methodId);
      if (parsed.coupon) setAppliedCoupon(parsed.coupon);
    } catch {
      // ignore
    }
  }, [vehicleId]);

  const discount = appliedCoupon?.discount || 0;
  const total = Math.max(0, subtotal - discount);

  const method = useMemo(
    () =>
      CAR_RENTAL_PAYMENT_METHODS.find((m) => m.id === methodId) ||
      CAR_RENTAL_PAYMENT_METHODS[0],
    [methodId]
  );

  const persistSelection = (patch = {}) => {
    try {
      sessionStorage.setItem(
        selectionStorageKey(vehicleId),
        JSON.stringify({
          methodId,
          coupon: appliedCoupon
            ? { code: appliedCoupon.code, label: appliedCoupon.label, discount }
            : null,
          total,
          ...patch,
        })
      );
    } catch {
      // ignore
    }
  };

  const handleMethodChange = (id) => {
    setMethodId(id);
    persistSelection({ methodId: id });
  };

  const handleApplyCoupon = (result) => {
    setAppliedCoupon(result);
    persistSelection({
      coupon: { code: result.code, label: result.label, discount: result.discount },
    });
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    persistSelection({ coupon: null });
  };

  const handleNonQrClick = () => {
    persistSelection();
    window.alert(
      `Đang chuẩn bị flow thanh toán qua "${method.label}". Tính năng này sẽ sớm được cập nhật trên VieGo.`
    );
  };

  const ctaDisabled = method.disabled || expired;
  const ctaClasses =
    "w-full py-4 rounded-xl bg-orange-500 hover:bg-orange-600 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold text-base transition text-center block";

  return (
    <div className="space-y-5">
      <CarRentalPaymentCountdownBanner
        vehicleId={vehicleId}
        onExpire={() => setExpired(true)}
      />

      <CarRentalPaymentMethodsCard
        selected={methodId}
        onChange={handleMethodChange}
      />

      <CarRentalCouponCard
        subtotal={subtotal}
        appliedCoupon={appliedCoupon}
        onApply={handleApplyCoupon}
        onRemove={handleRemoveCoupon}
      />

      <CarRentalTotalCard
        packageLabel={packageLabel}
        subtotal={subtotal}
        discount={discount}
        total={total}
      />

      <div>
        {methodId === "vietqr" ? (
          <Link
            href={ctaDisabled ? "#" : qrHref}
            onClick={(e) => {
              if (ctaDisabled) {
                e.preventDefault();
                return;
              }
              persistSelection();
            }}
            aria-disabled={ctaDisabled}
            className={
              ctaClasses +
              (ctaDisabled ? " pointer-events-none opacity-60" : "")
            }
          >
            {expired ? "Đã hết thời gian giữ giá" : method.ctaText}
          </Link>
        ) : (
          <button
            type="button"
            disabled={ctaDisabled}
            onClick={handleNonQrClick}
            className={ctaClasses}
          >
            {expired ? "Đã hết thời gian giữ giá" : method.ctaText}
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
