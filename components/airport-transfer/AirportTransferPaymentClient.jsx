"use client";

import { useRouter } from "next/navigation";
import GenericPaymentPanel from "@/components/payment/GenericPaymentPanel";

export default function AirportTransferPaymentClient({
  totalPrice,
  baseQuery,
  qrHref,
  confirmationHref,
}) {
  const router = useRouter();

  const handleSubmit = ({ methodId, method, coupon, discount, finalTotal }) => {
    const params = new URLSearchParams(baseQuery || "");
    params.set("paymentMethod", method.label);
    params.set("paymentMethodId", methodId);
    if (coupon?.code) {
      params.set("couponCode", coupon.code);
      params.set("discount", String(discount));
    }
    params.set("totalPrice", String(finalTotal));

    if (methodId === "vietqr") {
      router.push(`${qrHref}?${params.toString()}`);
      return;
    }

    // Các method khác: giả lập đã thanh toán luôn và sang confirmation
    params.set("paymentStatus", "paid");
    params.set("paidAt", new Date().toISOString());
    router.push(`${confirmationHref}?${params.toString()}`);
  };

  return <GenericPaymentPanel totalPrice={totalPrice} onSubmit={handleSubmit} />;
}
