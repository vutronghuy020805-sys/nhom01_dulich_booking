import { Suspense } from "react";
import AirportTransferResultsPageClient from "@/components/airport-transfer/AirportTransferResultsPageClient";

export const metadata = {
  title: "Kết quả đưa đón sân bay | VieGo",
  description:
    "Chọn xe đưa đón sân bay phù hợp với chuyến đi của bạn trên VieGo.",
};

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50" />}>
      <AirportTransferResultsPageClient />
    </Suspense>
  );
}
