import { notFound } from "next/navigation";
import FlightBookingHeader from "@/components/flights/FlightBookingHeader";
import FlightBookingClient from "@/components/flights/FlightBookingClient";
import FooterSection from "@/components/FooterSection";
import { findCityBySlug } from "@/components/flights/flightCities";
import {
  findFlightById,
  parseISODate,
  formatVnDateLong,
  toISODate,
} from "@/components/flights/flightResultsData";

export async function generateMetadata({ params, searchParams }) {
  const { from, to } = await params;
  const search = (await searchParams) || {};
  const fromCity = findCityBySlug(from);
  const toCity = findCityBySlug(to);
  if (!fromCity || !toCity) {
    return { title: "Đặt vé máy bay | VieGo" };
  }
  return {
    title: `Đặt vé ${fromCity.displayName} → ${toCity.displayName} | VieGo`,
    description: `Hoàn tất đặt vé máy bay từ ${fromCity.displayName} đến ${toCity.displayName} trên VieGo.`,
  };
}

export default async function FlightBookingPage({ params, searchParams }) {
  const { from, to } = await params;
  const search = (await searchParams) || {};

  const fromCity = findCityBySlug(from);
  const toCity = findCityBySlug(to);
  if (!fromCity || !toCity) notFound();

  const rawPrice = Number(search.price);
  const basePrice =
    Number.isFinite(rawPrice) && rawPrice > 0 ? rawPrice : 1099000;
  const dateParam =
    typeof search.date === "string" && search.date
      ? search.date
      : toISODate(new Date());
  const flightId =
    typeof search.flightId === "string" ? search.flightId : null;

  const flight = findFlightById(
    fromCity.slug,
    toCity.slug,
    basePrice,
    flightId
  );
  if (!flight) notFound();

  const dateObj = parseISODate(dateParam) || new Date();
  const dateLong = formatVnDateLong(dateObj);

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <FlightBookingHeader step={1} />

      <main className="flex-1">
        <FlightBookingClient
          fromCity={fromCity}
          toCity={toCity}
          flight={flight}
          dateLong={dateLong}
          dateIso={dateParam}
          basePrice={basePrice}
        />
      </main>

      <FooterSection />
    </div>
  );
}
