"use client";

import { useParams, useSearchParams } from "next/navigation";
import { findVehicle } from "@/data/carRentalVehicles";
import {
  totalRentalMinutes,
  computeBillingUnits,
  computePrice,
  generateCarRentalBookingCode,
} from "@/data/carRentalRental";
import CarRentalBookingStepHeader from "./CarRentalBookingStepHeader";
import CarRentalPaymentQrCard from "./CarRentalPaymentQrCard";
import CarRentalPaymentInstructionsCard from "./CarRentalPaymentInstructionsCard";
import CarRentalPaymentConfirmationCard from "./CarRentalPaymentConfirmationCard";
import CarRentalBookingNotFound from "./CarRentalBookingNotFound";

export default function CarRentalQrPageClient() {
  const { vehicleId } = useParams();
  const sp = useSearchParams();
  const nextQuery = sp.toString();

  const vehicle = findVehicle(vehicleId);
  if (!vehicle) return <CarRentalBookingNotFound />;

  const searchObj = Object.fromEntries(sp.entries());
  const startDate = sp.get("startDate") || "";
  const startTime = sp.get("startTime") || "08:00";
  const endDate = sp.get("endDate") || "";
  const endTime = sp.get("endTime") || "17:00";
  const minutes = totalRentalMinutes(startDate, startTime, endDate, endTime);
  const units = computeBillingUnits(minutes);
  const subtotal = computePrice(vehicle, units);
  const bookingCode = generateCarRentalBookingCode(vehicleId, searchObj);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <CarRentalBookingStepHeader activeStep={3} />
      <main className="flex-1 w-full max-w-375 mx-auto px-6 lg:px-10 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <div className="space-y-5">
            <CarRentalPaymentQrCard
              vehicleId={vehicleId}
              bookingCode={bookingCode}
              subtotal={subtotal}
            />
            <CarRentalPaymentConfirmationCard
              vehicleId={vehicleId}
              bookingCode={bookingCode}
              nextQuery={nextQuery}
            />
          </div>
          <CarRentalPaymentInstructionsCard />
        </div>
      </main>
    </div>
  );
}
