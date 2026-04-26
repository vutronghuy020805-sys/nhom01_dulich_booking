"use client";

import { useParams, useSearchParams } from "next/navigation";
import {
  findBusTripById,
  findBusLocationById,
  generateBusBookingCode,
  generateBusTicketCode,
  formatSearchDateLong,
} from "./busSearchResults";
import BusBookingSuccessBanner from "./BusBookingSuccessBanner";
import BusETicketCard from "./BusETicketCard";
import BusTicketActions from "./BusTicketActions";
import BusTicketNotesCard from "./BusTicketNotesCard";
import BusBookingNotFound from "./BusBookingNotFound";

function parseTripId(tripId) {
  const parts = String(tripId || "").split("__");
  if (parts.length < 3) return null;
  return { fromId: parts[0], toId: parts[1] };
}

export default function BusConfirmationPageClient() {
  const { tripId } = useParams();
  const sp = useSearchParams();
  const seats = Math.max(1, Number(sp.get("seats")) || 1);
  const dateIso = sp.get("date");

  const parsed = parseTripId(tripId);
  const trip = parsed
    ? findBusTripById(parsed.fromId, parsed.toId, tripId)
    : null;
  if (!trip) return <BusBookingNotFound />;

  const fromCity = findBusLocationById(parsed.fromId);
  const toCity = findBusLocationById(parsed.toId);
  const subtotal = trip.price * seats;
  const bookingCode = generateBusBookingCode(tripId);
  const ticketCode = generateBusTicketCode(tripId);
  const dateLong = dateIso ? formatSearchDateLong(dateIso) : "";

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <main className="flex-1 w-full max-w-375 mx-auto px-6 lg:px-10 py-8 space-y-6">
        <BusBookingSuccessBanner
          tripId={tripId}
          bookingCode={bookingCode}
          ticketCode={ticketCode}
        />
        <BusETicketCard
          tripId={tripId}
          trip={trip}
          fromCityName={fromCity?.name || parsed.fromId}
          toCityName={toCity?.name || parsed.toId}
          dateLong={dateLong}
          bookingCode={bookingCode}
          ticketCode={ticketCode}
          subtotal={subtotal}
          seats={seats}
        />
        <BusTicketNotesCard />
        <BusTicketActions ticketCode={ticketCode} />
      </main>
    </div>
  );
}
