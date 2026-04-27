import { Suspense } from "react";
import CarRentalSearchPageClient from "@/components/car-rental/CarRentalSearchPageClient";

export const metadata = {
  title: "Kết quả thuê xe | VieGo",
  description:
    "Chọn xe phù hợp cho hành trình của bạn — đa dạng loại xe, giá tốt, đặt nhanh trên VieGo.",
};

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <CarRentalSearchPageClient />
    </Suspense>
  );
}
