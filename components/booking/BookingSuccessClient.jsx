"use client";

import { useParams, useSearchParams } from "next/navigation";
import { getRatePlanById } from "@/components/hotels/hotelResults";
import { findLocationBySlug } from "@/components/hotels/popularLocations";
import BookingSuccessHeader from "./BookingSuccessHeader";
import BookingSuccessStatus from "./BookingSuccessStatus";
import BookingSuccessSummary from "./BookingSuccessSummary";
import BookingSuccessActions from "./BookingSuccessActions";
import BookingNotFound from "./BookingNotFound";

export default function BookingSuccessClient() {
  const { locationSlug, hotelSlug } = useParams();
  const sp = useSearchParams();
  const roomSectionId = sp.get("roomSectionId");
  const ratePlanId = sp.get("ratePlanId");

  const data =
    locationSlug && hotelSlug && roomSectionId && ratePlanId
      ? getRatePlanById(locationSlug, hotelSlug, roomSectionId, ratePlanId)
      : null;
  if (!data) return <BookingNotFound />;

  const { hotel, roomSection, ratePlan } = data;
  const location = findLocationBySlug(locationSlug);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <BookingSuccessHeader />
      <main className="flex-1 w-full max-w-375 mx-auto px-6 lg:px-10 py-8 space-y-6">
        <BookingSuccessStatus
          hotel={hotel}
          locationSlug={locationSlug}
          hotelSlug={hotelSlug}
          ratePlanId={ratePlanId}
        />
        <BookingSuccessSummary
          hotel={hotel}
          roomSection={roomSection}
          ratePlan={ratePlan}
          locationSlug={locationSlug}
          hotelSlug={hotelSlug}
          locationCity={location?.city || ""}
        />
        <BookingSuccessActions />
      </main>
    </div>
  );
}
