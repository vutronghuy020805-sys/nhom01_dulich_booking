import { Suspense } from "react";
import { carRentalVehicles } from "@/data/carRentalVehicles";
import CarRentalQrPageClient from "@/components/car-rental/CarRentalQrPageClient";

export function generateStaticParams() {
  return carRentalVehicles.map((v) => ({ vehicleId: v.id }));
}

export const dynamicParams = false;

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50" />}>
      <CarRentalQrPageClient />
    </Suspense>
  );
}
