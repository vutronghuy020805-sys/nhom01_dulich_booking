import { Suspense } from "react";
import { carRentalVehicles } from "@/data/carRentalVehicles";
import CarRentalPaymentPageClient from "@/components/car-rental/CarRentalPaymentPageClient";

export function generateStaticParams() {
  return carRentalVehicles.map((v) => ({ vehicleId: v.id }));
}

export const dynamicParams = false;

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50" />}>
      <CarRentalPaymentPageClient />
    </Suspense>
  );
}
