import Link from "next/link";
import { notFound } from "next/navigation";
import QrPageHeader from "@/components/booking/QrPageHeader";
import PaymentCountdownBanner from "@/components/booking/PaymentCountdownBanner";
import FlightQrCard from "@/components/flights/FlightQrCard";
import FlightQrInstructions from "@/components/flights/FlightQrInstructions";
import FlightQrConfirmationBox from "@/components/flights/FlightQrConfirmationBox";
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
  generateFlightBookingCode,
} from "@/components/flights/flightResultsData";

export async function generateMetadata({ params }) {
  const { from, to } = await params;
  const fromCity = findCityBySlug(from);
  const toCity = findCityBySlug(to);
  if (!fromCity || !toCity) {
    return { title: "Thanh toán QR vé máy bay | VieGo" };
  }
  return {
    title: `Thanh toán QR ${fromCity.displayName} → ${toCity.displayName} | VieGo`,
    description: `Quét mã VietQR để hoàn tất thanh toán vé máy bay trên VieGo.`,
  };
}

export default async function FlightQrPaymentPage({ params, searchParams }) {
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
  const bookingCode = generateFlightBookingCode(flight.id);

  const backQuery = new URLSearchParams();
  backQuery.set("flightId", flight.id);
  backQuery.set("price", String(basePrice));
  backQuery.set("date", dateParam);
  const backHref = `/flights/booking/${fromCity.slug}/${toCity.slug}/payment?${backQuery.toString()}`;

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <QrPageHeader />

      <main className="flex-1">
        <div className="max-w-375 mx-auto px-6 lg:px-10 py-6">
          <Link
            href={backHref}
            className="inline-flex items-center gap-1.5 text-slate-700 hover:text-slate-900 font-semibold text-sm mb-4"
          >
            <svg
              viewBox="0 0 24 24"
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
            Trở lại
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-5">
            <div className="space-y-5">
              <PaymentCountdownBanner />
              <FlightQrCard
                flight={flight}
                pricing={pricing}
                bookingCode={bookingCode}
              />
              <FlightQrInstructions />
              <FlightQrConfirmationBox
                fromSlug={fromCity.slug}
                toSlug={toCity.slug}
                flightId={flight.id}
                bookingCode={bookingCode}
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
