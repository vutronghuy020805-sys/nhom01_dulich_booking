"use client";

import { useParams, useSearchParams } from "next/navigation";
import { getRatePlanById } from "@/components/hotels/hotelResults";
import BookingHeader from "./BookingHeader";
import BookingContactForm from "./BookingContactForm";
import BookingStep1Form from "./BookingStep1Form";
import BookingSummaryCard from "./BookingSummaryCard";
import BookingPriceBreakdown from "./BookingPriceBreakdown";
import BookingNotFound from "./BookingNotFound";

export default function BookingStep1Client() {
  const { locationSlug, hotelSlug } = useParams();
  const sp = useSearchParams();
  const roomSectionId = sp.get("roomSectionId");
  const ratePlanId = sp.get("ratePlanId");

  const data =
    locationSlug && hotelSlug && roomSectionId && ratePlanId
      ? getRatePlanById(locationSlug, hotelSlug, roomSectionId, ratePlanId)
      : null;
  if (!data) return <BookingNotFound />;

  const { hotel, ratePlan } = data;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <BookingHeader hotel={hotel} activeStep={1} />
      <main className="flex-1 w-full max-w-375 mx-auto px-6 lg:px-10 py-8">
        <BookingStep1Form
          locationSlug={locationSlug}
          hotelSlug={hotelSlug}
          roomSectionId={roomSectionId}
          ratePlanId={ratePlanId}
        >
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6 items-start">
            <BookingContactForm />
            <aside className="space-y-4 lg:sticky lg:top-24">
              <BookingSummaryCard hotel={hotel} ratePlan={ratePlan} />
              <BookingPriceBreakdown ratePlan={ratePlan} />
            </aside>
          </div>
        </BookingStep1Form>
      </main>
    </div>
  );
}
