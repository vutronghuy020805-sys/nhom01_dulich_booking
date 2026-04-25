"use client";

import { useRouter } from "next/navigation";
import GenericPaymentPanel from "@/components/payment/GenericPaymentPanel";

export default function ActivityPaymentClient({ totalPrice, baseQuery, slug }) {
  const router = useRouter();

  const handleSubmit = ({ methodId, method, coupon, discount, finalTotal }) => {
    const params = new URLSearchParams(baseQuery || "");
    params.set("method", methodId);
    params.set("paymentMethod", method.label);
    if (coupon?.code) {
      params.set("couponCode", coupon.code);
      params.set("discount", String(discount));
    }
    params.set("totalPrice", String(finalTotal));

    if (methodId === "vietqr") {
      router.push(`/activities/${slug}/payment/qr?${params.toString()}`);
      return;
    }

    params.set("paymentStatus", "paid");
    params.set("paidAt", new Date().toISOString());
    router.push(`/activities/${slug}/confirmation?${params.toString()}`);
  };

  return <GenericPaymentPanel totalPrice={totalPrice} onSubmit={handleSubmit} />;
}
