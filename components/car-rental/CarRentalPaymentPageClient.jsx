"use client";

import { useParams, useSearchParams } from "next/navigation";
import { findVehicle } from "@/data/carRentalVehicles";
import {
  totalRentalMinutes,
  computeBillingUnits,
  computePrice,
  packageLabel,
} from "@/data/carRentalRental";
import CarRentalBookingStepHeader from "./CarRentalBookingStepHeader";
import CarRentalPaymentClient from "./CarRentalPaymentClient";
import CarRentalBookingNotFound from "./CarRentalBookingNotFound";

export default function CarRentalPaymentPageClient() {
  const { vehicleId } = useParams();
  const sp = useSearchParams();
  const searchQuery = sp.toString();

  const vehicle = findVehicle(vehicleId);
  if (!vehicle) return <CarRentalBookingNotFound />;

  const startDate = sp.get("startDate") || "";
  const startTime = sp.get("startTime") || "08:00";
  const endDate = sp.get("endDate") || "";
  const endTime = sp.get("endTime") || "17:00";
  const minutes = totalRentalMinutes(startDate, startTime, endDate, endTime);
  const units = computeBillingUnits(minutes);
  const subtotal = computePrice(vehicle, units);
  const label = packageLabel(vehicle, units);

  const qrHref = `/car-rental/booking/${encodeURIComponent(
    vehicleId
  )}/payment/qr${searchQuery ? `?${searchQuery}` : ""}`;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <CarRentalBookingStepHeader activeStep={3} />
      <main className="flex-1 w-full max-w-375 mx-auto px-6 lg:px-10 py-6">
        <CarRentalPaymentClient
          vehicleId={vehicleId}
          searchQuery={searchQuery}
          packageLabel={label}
          subtotal={subtotal}
          qrHref={qrHref}
        />
      </main>
    </div>
  );
}
