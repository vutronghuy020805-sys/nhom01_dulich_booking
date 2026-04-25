import { notFound } from "next/navigation";
import FlightBookingHeader from "@/components/flights/FlightBookingHeader";
import FlightPaymentMethodList from "@/components/flights/FlightPaymentMethodList";
import FlightPaymentSummary from "@/components/flights/FlightPaymentSummary";
import FooterSection from "@/components/FooterSection";
import { findCityBySlug } from "@/components/flights/flightCities";
import {
  findFlightById,
  parseISODate,
  formatVnDateLong,
  toISODate,
  computeFlightPricing,
  getFlightStorageKey,
} from "@/components/flights/flightResultsData";

export async function generateMetadata({ params }) {
  const { from, to } = await params;
  const fromCity = findCityBySlug(from);
  const toCity = findCityBySlug(to);
  if (!fromCity || !toCity) {
    return { title: "Thanh toán vé máy bay | VieGo" };
  }
  return {
    title: `Thanh toán ${fromCity.displayName} → ${toCity.displayName} | VieGo`,
    description: `Hoàn tất thanh toán vé máy bay trên VieGo.`,
  };
}

export default async function FlightPaymentPage({ params, searchParams }) {
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
  const pricing = computeFlightPricing(flight);
  const storageKey = getFlightStorageKey(
    fromCity.slug,
    toCity.slug,
    flight.id
  );

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <FlightBookingHeader step={2} />

      <main className="flex-1">
        <div className="max-w-375 mx-auto px-6 lg:px-10 py-6 md:py-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-5">
            <div>
              <FlightPaymentMethodList
                totalPrice={pricing.totalPrice}
                fromSlug={fromCity.slug}
                toSlug={toCity.slug}
                flightId={flight.id}
                basePrice={basePrice}
                dateIso={dateParam}
              />
            </div>
            <aside>
              <FlightPaymentSummary
                fromCity={fromCity}
                toCity={toCity}
                flight={flight}
                dateLong={dateLong}
                pricing={pricing}
                storageKey={storageKey}
              />
            </aside>
          </div>
        </div>
      </main>

      <FooterSection />
    </div>
  );
}
