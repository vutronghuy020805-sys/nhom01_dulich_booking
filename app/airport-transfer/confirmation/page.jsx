import { Suspense } from "react";
import AirportTransferConfirmationPageClient from "@/components/airport-transfer/AirportTransferConfirmationPageClient";

export const metadata = {
  title: "Xác nhận đặt xe - Đưa đón sân bay | VieGo",
};

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50" />}>
      <AirportTransferConfirmationPageClient />
    </Suspense>
  );
}
