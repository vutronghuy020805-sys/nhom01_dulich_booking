import { Suspense } from "react";
import AirportTransferPaymentPageClient from "@/components/airport-transfer/AirportTransferPaymentPageClient";

export const metadata = {
  title: "Thanh toán - Đưa đón sân bay | VieGo",
};

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50" />}>
      <AirportTransferPaymentPageClient />
    </Suspense>
  );
}
