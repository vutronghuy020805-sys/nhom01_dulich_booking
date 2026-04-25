import { notFound } from "next/navigation";
import FooterSection from "@/components/FooterSection";
import BusBookingStepHeader from "@/components/bus/BusBookingStepHeader";
import BusPaymentClient from "@/components/bus/BusPaymentClient";
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
    title: `Thanh toán vé xe khách ${tripId} | VieGo`,
  };
}

export default async function BusPaymentPage({ params, searchParams }) {
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

  const nextQueryObj = new URLSearchParams();
  if (fromId) nextQueryObj.set("from", fromId);
  if (toId) nextQueryObj.set("to", toId);
  if (departureDate) nextQueryObj.set("departureDate", departureDate);
  nextQueryObj.set("seats", String(seats));
  const nextQuery = nextQueryObj.toString();

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <BusBookingStepHeader activeStep={3} />

      <main className="flex-1">
        <div className="max-w-375 mx-auto px-6 lg:px-10 py-6 md:py-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-5">
            <div className="min-w-0">
              <BusPaymentClient
                tripId={tripId}
                trip={trip}
                seats={seats}
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
