"use client";

import { useParams, useSearchParams } from "next/navigation";
import { findBusTripById } from "./busSearchResults";
import BusBookingStepHeader from "./BusBookingStepHeader";
import BusPaymentClient from "./BusPaymentClient";
import BusBookingNotFound from "./BusBookingNotFound";

function parseTripId(tripId) {
  const parts = String(tripId || "").split("__");
  if (parts.length < 3) return null;
  return { fromId: parts[0], toId: parts[1] };
}

export default function BusPaymentPageClient() {
  const { tripId } = useParams();
  const sp = useSearchParams();
  const nextQuery = sp.toString();
  const seats = Math.max(1, Number(sp.get("seats")) || 1);

  const parsed = parseTripId(tripId);
  const trip = parsed
    ? findBusTripById(parsed.fromId, parsed.toId, tripId)
    : null;
  if (!trip) return <BusBookingNotFound />;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <BusBookingStepHeader activeStep={3} />
      <main className="flex-1 w-full max-w-375 mx-auto px-6 lg:px-10 py-6">
        <BusPaymentClient
          tripId={tripId}
          trip={trip}
          seats={seats}
          nextQuery={nextQuery}
        />
      </main>
    </div>
  );
}
