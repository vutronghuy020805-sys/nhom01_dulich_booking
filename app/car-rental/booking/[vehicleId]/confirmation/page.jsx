import { Suspense } from "react";
import { carRentalVehicles } from "@/data/carRentalVehicles";
import CarRentalConfirmationPageClient from "@/components/car-rental/CarRentalConfirmationPageClient";

export function generateStaticParams() {
  return carRentalVehicles.map((v) => ({ vehicleId: v.id }));
}

export const dynamicParams = false;

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50" />}>
      <CarRentalConfirmationPageClient />
    </Suspense>
  );
}
