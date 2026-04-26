"use client";

import { useParams, useSearchParams } from "next/navigation";
import { findCityBySlug } from "./flightCities";
import {
  findFlightById,
  computeFlightPricing,
  parseISODate,
  formatVnDateLong,
} from "./flightResultsData";
import FlightBookingSuccessHeader from "./FlightBookingSuccessHeader";
import FlightBookingSuccessStatus from "./FlightBookingSuccessStatus";
import FlightBookingSuccessSummary from "./FlightBookingSuccessSummary";
import FlightBookingSuccessActions from "./FlightBookingSuccessActions";
import FlightBookingNotFound from "./FlightBookingNotFound";

export default function FlightSuccessPageClient() {
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

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <FlightBookingSuccessHeader />
      <main className="flex-1 w-full max-w-375 mx-auto px-6 lg:px-10 py-8 space-y-6">
        <FlightBookingSuccessStatus
          fromCity={fromCity}
          toCity={toCity}
          flight={flight}
          fromSlug={fromCity.slug}
          toSlug={toCity.slug}
          flightId={flight.id}
        />
        <FlightBookingSuccessSummary
          fromCity={fromCity}
          toCity={toCity}
          flight={flight}
          dateLong={dateLong}
          pricing={pricing}
          fromSlug={fromCity.slug}
          toSlug={toCity.slug}
          flightId={flight.id}
        />
        <FlightBookingSuccessActions />
      </main>
    </div>
  );
}
