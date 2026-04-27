import { Suspense } from "react";
import AirportTransferCustomerInfoPageClient from "@/components/airport-transfer/AirportTransferCustomerInfoPageClient";

export const metadata = {
  title: "Thông tin liên hệ - Đưa đón sân bay | VieGo",
};

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50" />}>
      <AirportTransferCustomerInfoPageClient />
    </Suspense>
  );
}
