import { Suspense } from "react";
import AirportTransferQrPageClient from "@/components/airport-transfer/AirportTransferQrPageClient";

export const metadata = {
  title: "Quét mã QR - Đưa đón sân bay | VieGo",
};

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50" />}>
      <AirportTransferQrPageClient />
    </Suspense>
  );
}
