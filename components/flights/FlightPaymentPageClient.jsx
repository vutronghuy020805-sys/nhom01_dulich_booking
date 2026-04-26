"use client";

import { useParams, useSearchParams } from "next/navigation";
import { findCityBySlug } from "./flightCities";
import {
  findFlightById,
  computeFlightPricing,
  parseISODate,
  formatVnDateLong,
  getFlightStorageKey,
} from "./flightResultsData";
import FlightBookingHeader from "./FlightBookingHeader";
import FlightPaymentMethodList from "./FlightPaymentMethodList";
import FlightPaymentSummary from "./FlightPaymentSummary";
import FlightBookingNotFound from "./FlightBookingNotFound";

export default function FlightPaymentPageClient() {
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
  const date = parseISODate(dateIso);
  const dateLong = date ? formatVnDateLong(date) : "";
  const storageKey = getFlightStorageKey(fromCity.slug, toCity.slug, flight.id);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <FlightBookingHeader step={2} />
      <main className="flex-1 max-w-375 mx-auto px-6 lg:px-10 py-6 md:py-8 grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
        <div className="lg:col-span-2">
          <FlightPaymentMethodList
            totalPrice={pricing.totalPrice}
            fromSlug={fromCity.slug}
            toSlug={toCity.slug}
            flightId={flight.id}
            basePrice={basePrice}
            dateIso={dateIso}
          />
        </div>
        <div className="lg:col-span-1">
          <FlightPaymentSummary
            fromCity={fromCity}
            toCity={toCity}
            flight={flight}
            dateLong={dateLong}
            pricing={pricing}
            storageKey={storageKey}
          />
        </div>
      </main>
    </div>
  );
}
