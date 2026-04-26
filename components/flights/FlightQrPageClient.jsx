"use client";

import { useParams, useSearchParams } from "next/navigation";
import { findCityBySlug } from "./flightCities";
import {
  findFlightById,
  computeFlightPricing,
  generateFlightBookingCode,
} from "./flightResultsData";
import FlightBookingHeader from "./FlightBookingHeader";
import FlightQrCard from "./FlightQrCard";
import FlightQrInstructions from "./FlightQrInstructions";
import FlightQrConfirmationBox from "./FlightQrConfirmationBox";
import PaymentCountdownBanner from "@/components/booking/PaymentCountdownBanner";
import FlightBookingNotFound from "./FlightBookingNotFound";

export default function FlightQrPageClient() {
  const { from, to } = useParams();
  const sp = useSearchParams();
  const flightId = sp.get("flightId");
  const dateIso = sp.get("date");
  const basePrice = Number(sp.get("price")) || 0;

  const fromCity = findCityBySlug(from);
  const toCity = findCityBySlug(to);
  const flight =
    fromCity && toCity && flightId
      ? findFlightById(fromCity.slug, toCity.slug, basePrice, flightId)
      : null;

  if (!fromCity || !toCity || !flight) return <FlightBookingNotFound />;

  const pricing = computeFlightPricing(flight);
  const bookingCode = generateFlightBookingCode(flight.id);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <FlightBookingHeader step={2} />
      <main className="flex-1 w-full max-w-375 mx-auto px-6 lg:px-10 py-6 space-y-5">
        <PaymentCountdownBanner variant="subtle" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <div className="space-y-5">
            <FlightQrCard
              flight={flight}
              pricing={pricing}
              bookingCode={bookingCode}
            />
            <FlightQrConfirmationBox
              fromSlug={fromCity.slug}
              toSlug={toCity.slug}
              flightId={flight.id}
              bookingCode={bookingCode}
              basePrice={basePrice}
              dateIso={dateIso}
            />
          </div>
          <FlightQrInstructions />
        </div>
      </main>
    </div>
  );
}
