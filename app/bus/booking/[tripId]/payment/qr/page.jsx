import Link from "next/link";
import { notFound } from "next/navigation";
import FooterSection from "@/components/FooterSection";
import BusBookingStepHeader from "@/components/bus/BusBookingStepHeader";
import BusPaymentCountdownBanner from "@/components/bus/BusPaymentCountdownBanner";
import BusPaymentQrCard from "@/components/bus/BusPaymentQrCard";
import BusPaymentInstructionsCard from "@/components/bus/BusPaymentInstructionsCard";
import BusPaymentConfirmationCard from "@/components/bus/BusPaymentConfirmationCard";
import BusPaymentSummarySidebar from "@/components/bus/BusPaymentSummarySidebar";
import {
  findBusTripById,
  findBusLocationById,
  formatSearchDateLong,
  generateBusBookingCode,
} from "@/components/bus/busSearchResults";

export async function generateMetadata({ params }) {
  const { tripId } = await params;
  return {
    title: `Thanh toán QR vé xe khách ${tripId} | VieGo`,
  };
}

export default async function BusPaymentQrPage({ params, searchParams }) {
  const { tripId: rawTripId } = await params;
  const sp = (await searchParams) || {};
  const tripId = decodeURIComponent(rawTripId);

  const fromId = typeof sp.from === "string" ? sp.from : null;
  const toId = typeof sp.to === "string" ? sp.to : null;
  const departureDate =
    typeof sp.departureDate === "string" ? sp.departureDate : null;
  const seats = Number(sp.seats) || 1;

  const trip = findBusTripById(fromId, toId, tripId);
  if (!trip) notFound();

  const fromLoc = findBusLocationById(fromId);
  const toLoc = findBusLocationById(toId);
  const fromCityName = fromLoc?.name || "Điểm đi";
  const toCityName = toLoc?.name || "Điểm đến";
  const dateLong = formatSearchDateLong(departureDate) || "Ngày khởi hành";
  const bookingCode = generateBusBookingCode(tripId);

  const subtotal = trip.price * seats;

  const queryObj = new URLSearchParams();
  if (fromId) queryObj.set("from", fromId);
  if (toId) queryObj.set("to", toId);
  if (departureDate) queryObj.set("departureDate", departureDate);
  queryObj.set("seats", String(seats));
  const nextQuery = queryObj.toString();
  const backHref = `/bus/booking/${encodeURIComponent(
    tripId
  )}/payment?${nextQuery}`;

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <BusBookingStepHeader activeStep={3} />

      <main className="flex-1">
        <div className="max-w-375 mx-auto px-6 lg:px-10 py-6 md:py-8">
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
              aria-hidden
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
            Trở lại
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-5">
            <div className="min-w-0 space-y-5">
              <BusPaymentCountdownBanner tripId={tripId} />
              <BusPaymentQrCard
                tripId={tripId}
                bookingCode={bookingCode}
                subtotal={subtotal}
              />
              <BusPaymentInstructionsCard />
              <BusPaymentConfirmationCard
                tripId={tripId}
                bookingCode={bookingCode}
                nextQuery={nextQuery}
              />
            </div>

            <BusPaymentSummarySidebar
              tripId={tripId}
              trip={trip}
              fromCityName={fromCityName}
              toCityName={toCityName}
              dateLong={dateLong}
              bookingCode={bookingCode}
            />
          </div>
        </div>
      </main>

      <FooterSection />
    </div>
  );
}
