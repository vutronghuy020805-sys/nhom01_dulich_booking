"use client";

import { useParams, useSearchParams } from "next/navigation";
import {
  findBusTripById,
  findBusLocationById,
} from "./busSearchResults";
import BusBookingStepHeader from "./BusBookingStepHeader";
import BusBookingClient from "./BusBookingClient";
import BusBookingNotFound from "./BusBookingNotFound";

function parseTripId(tripId) {
  const parts = String(tripId || "").split("__");
  if (parts.length < 3) return null;
  return { fromId: parts[0], toId: parts[1] };
}

export default function BusBookingPageClient() {
  const { tripId } = useParams();
  const sp = useSearchParams();
  const nextQuery = sp.toString();

  const parsed = parseTripId(tripId);
  const trip = parsed
    ? findBusTripById(parsed.fromId, parsed.toId, tripId)
    : null;
  if (!trip) return <BusBookingNotFound />;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <BusBookingStepHeader activeStep={1} />
      <main className="flex-1 w-full max-w-375 mx-auto px-6 lg:px-10 py-6">
        <BusBookingClient tripId={tripId} nextQuery={nextQuery} />
      </main>
    </div>
  );
}
