import { notFound } from "next/navigation";
import FooterSection from "@/components/FooterSection";
import BusBookingStepHeader from "@/components/bus/BusBookingStepHeader";
import BusBookingSuccessBanner from "@/components/bus/BusBookingSuccessBanner";
import BusETicketCard from "@/components/bus/BusETicketCard";
import BusTicketNotesCard from "@/components/bus/BusTicketNotesCard";
import BusTicketActions from "@/components/bus/BusTicketActions";
import {
  findBusTripById,
  findBusLocationById,
  formatSearchDateLong,
  generateBusBookingCode,
  generateBusTicketCode,
} from "@/components/bus/busSearchResults";

export async function generateMetadata({ params }) {
  const { tripId } = await params;
  return {
    title: `Đặt vé xe khách thành công ${tripId} | VieGo`,
  };
}

export default async function BusConfirmationPage({ params, searchParams }) {
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
  const ticketCode = generateBusTicketCode(tripId);
  const subtotal = trip.price * seats;

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <BusBookingStepHeader activeStep={4} />

      <main className="flex-1">
        <div className="max-w-5xl mx-auto px-6 lg:px-10 py-6 md:py-8 space-y-6">
          <BusBookingSuccessBanner
            tripId={tripId}
            bookingCode={bookingCode}
            ticketCode={ticketCode}
          />

          <BusETicketCard
            tripId={tripId}
            trip={trip}
            fromCityName={fromCityName}
            toCityName={toCityName}
            dateLong={dateLong}
            bookingCode={bookingCode}
            ticketCode={ticketCode}
            subtotal={subtotal}
            seats={seats}
          />

          <BusTicketNotesCard />

          <BusTicketActions ticketCode={ticketCode} />
        </div>
      </main>

      <FooterSection />
    </div>
  );
}
