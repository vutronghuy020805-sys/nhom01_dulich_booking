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
import CarRentalReviewClient from "./CarRentalReviewClient";
import CarRentalBookingNotFound from "./CarRentalBookingNotFound";

export default function CarRentalReviewPageClient() {
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
  const total = subtotal;
  const label = packageLabel(vehicle, units);

  const editHref = `/car-rental/booking/${encodeURIComponent(vehicleId)}${
    searchQuery ? `?${searchQuery}` : ""
  }`;
  const paymentHref = `/car-rental/booking/${encodeURIComponent(
    vehicleId
  )}/payment${searchQuery ? `?${searchQuery}` : ""}`;

  const pickupPoint = sp.get("pickup") || vehicle.provider || "Đại lý đối tác";
  const dropoffPoint = sp.get("dropoff") || pickupPoint;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <CarRentalBookingStepHeader activeStep={2} />
      <main className="flex-1 w-full max-w-375 mx-auto px-6 lg:px-10 py-6">
        <CarRentalReviewClient
          vehicleId={vehicleId}
          searchQuery={searchQuery}
          editHref={editHref}
          paymentHref={paymentHref}
          pickupPoint={pickupPoint}
          dropoffPoint={dropoffPoint}
          packageLabel={label}
          subtotal={subtotal}
          total={total}
        />
      </main>
    </div>
  );
}
