"use client";

import { useParams, useSearchParams } from "next/navigation";
import { findCityBySlug } from "./flightCities";
import {
  findFlightById,
  parseISODate,
  formatVnDateLong,
} from "./flightResultsData";
import FlightBookingHeader from "./FlightBookingHeader";
import FlightBookingClient from "./FlightBookingClient";
import FlightBookingNotFound from "./FlightBookingNotFound";

export default function FlightBookingPageClient() {
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

  const date = parseISODate(dateIso);
  const dateLong = date ? formatVnDateLong(date) : "";

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <FlightBookingHeader step={1} />
      <main className="flex-1">
        <FlightBookingClient
          fromCity={fromCity}
          toCity={toCity}
          flight={flight}
          dateLong={dateLong}
          dateIso={dateIso}
          basePrice={basePrice}
        />
      </main>
    </div>
  );
}
