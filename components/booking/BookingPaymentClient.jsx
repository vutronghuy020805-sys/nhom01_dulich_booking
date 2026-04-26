"use client";

import { useParams, useSearchParams } from "next/navigation";
import { getRatePlanById } from "@/components/hotels/hotelResults";
import BookingHeader from "./BookingHeader";
import PaymentLeftPanel from "./PaymentLeftPanel";
import PaymentSummaryCard from "./PaymentSummaryCard";
import BookingNotFound from "./BookingNotFound";

export default function BookingPaymentClient() {
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

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <BookingHeader hotel={hotel} activeStep={2} />
      <main className="flex-1 w-full max-w-375 mx-auto px-6 lg:px-10 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6 items-start">
          <PaymentLeftPanel
            ratePlan={ratePlan}
            locationSlug={locationSlug}
            hotelSlug={hotelSlug}
            roomSectionId={roomSectionId}
            ratePlanId={ratePlanId}
          />
          <aside className="lg:sticky lg:top-24">
            <PaymentSummaryCard
              hotel={hotel}
              roomSection={roomSection}
              ratePlan={ratePlan}
              locationSlug={locationSlug}
              hotelSlug={hotelSlug}
            />
          </aside>
        </div>
      </main>
    </div>
  );
}
