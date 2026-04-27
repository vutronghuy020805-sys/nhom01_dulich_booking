import { Suspense } from "react";
import AirportTransferBookingPageClient from "@/components/airport-transfer/AirportTransferBookingPageClient";

export const metadata = {
  title: "Thông tin chuyến đón - Đưa đón sân bay | VieGo",
};

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50" />}>
      <AirportTransferBookingPageClient />
    </Suspense>
  );
}
