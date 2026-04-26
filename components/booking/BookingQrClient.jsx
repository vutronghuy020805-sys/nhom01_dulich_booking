"use client";

import { useParams, useSearchParams } from "next/navigation";
import { getRatePlanById } from "@/components/hotels/hotelResults";
import QrPageHeader from "./QrPageHeader";
import QrPaymentCard from "./QrPaymentCard";
import QrInstructionBox from "./QrInstructionBox";
import QrConfirmationBox from "./QrConfirmationBox";
import PaymentCountdownBanner from "./PaymentCountdownBanner";
import BookingNotFound from "./BookingNotFound";

export default function BookingQrClient() {
  const { locationSlug, hotelSlug } = useParams();
  const sp = useSearchParams();
  const roomSectionId = sp.get("roomSectionId");
  const ratePlanId = sp.get("ratePlanId");

  const data =
    locationSlug && hotelSlug && roomSectionId && ratePlanId
      ? getRatePlanById(locationSlug, hotelSlug, roomSectionId, ratePlanId)
      : null;
  if (!data) return <BookingNotFound />;

  const { ratePlan } = data;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <QrPageHeader />
      <main className="flex-1 w-full max-w-375 mx-auto px-6 lg:px-10 py-6 space-y-5">
        <PaymentCountdownBanner variant="subtle" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <div className="space-y-5">
            <QrPaymentCard ratePlan={ratePlan} />
            <QrConfirmationBox
              locationSlug={locationSlug}
              hotelSlug={hotelSlug}
              ratePlanId={ratePlanId}
              roomSectionId={roomSectionId}
            />
          </div>
          <QrInstructionBox />
        </div>
      </main>
    </div>
  );
}
