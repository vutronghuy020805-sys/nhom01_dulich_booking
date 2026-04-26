"use client";

import { useParams, useSearchParams } from "next/navigation";
import { findVehicle } from "@/data/carRentalVehicles";
import CarRentalBookingStepHeader from "./CarRentalBookingStepHeader";
import CarRentalBookingClient from "./CarRentalBookingClient";
import CarRentalBookingNotFound from "./CarRentalBookingNotFound";

export default function CarRentalBookingPageClient() {
  const { vehicleId } = useParams();
  const sp = useSearchParams();
  const searchQuery = sp.toString();

  const vehicle = findVehicle(vehicleId);
  if (!vehicle) return <CarRentalBookingNotFound />;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <CarRentalBookingStepHeader activeStep={1} />
      <main className="flex-1 w-full max-w-375 mx-auto px-6 lg:px-10 py-6">
        <CarRentalBookingClient
          vehicleId={vehicleId}
          searchQuery={searchQuery}
        />
      </main>
    </div>
  );
}
