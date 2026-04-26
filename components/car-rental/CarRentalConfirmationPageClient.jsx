"use client";

import { useParams, useSearchParams } from "next/navigation";
import { findVehicle } from "@/data/carRentalVehicles";
import {
  totalRentalMinutes,
  computeBillingUnits,
  computePrice,
  packageLabel,
  generateCarRentalBookingCode,
  generateCarRentalTicketCode,
  formatVnDate,
  parseIsoDate,
} from "@/data/carRentalRental";
import CarRentalBookingSuccessBanner from "./CarRentalBookingSuccessBanner";
import CarRentalETicketCard from "./CarRentalETicketCard";
import CarRentalTicketActions from "./CarRentalTicketActions";
import CarRentalPickupNotesCard from "./CarRentalPickupNotesCard";
import CarRentalBookingNotFound from "./CarRentalBookingNotFound";

export default function CarRentalConfirmationPageClient() {
  const { vehicleId } = useParams();
  const sp = useSearchParams();

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
  const label = packageLabel(vehicle, units);
  const bookingCode = generateCarRentalBookingCode(vehicleId, searchObj);
  const ticketCode = generateCarRentalTicketCode(vehicleId, searchObj);

  const startD = parseIsoDate(startDate);
  const endD = parseIsoDate(endDate);
  const startLabel = startD ? `${formatVnDate(startD)} ${startTime}` : "—";
  const endLabel = endD ? `${formatVnDate(endD)} ${endTime}` : "—";

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <main className="flex-1 w-full max-w-375 mx-auto px-6 lg:px-10 py-8 space-y-6">
        <CarRentalBookingSuccessBanner
          vehicleId={vehicleId}
          bookingCode={bookingCode}
          ticketCode={ticketCode}
        />
        <CarRentalETicketCard
          vehicleId={vehicleId}
          bookingCode={bookingCode}
          ticketCode={ticketCode}
          summary={{
            vehicle,
            packageLabel: label,
          }}
          startDateTimeLabel={startLabel}
          endDateTimeLabel={endLabel}
          subtotal={subtotal}
        />
        <CarRentalPickupNotesCard />
        <CarRentalTicketActions ticketCode={ticketCode} />
      </main>
    </div>
  );
}
