import { notFound } from "next/navigation";
import BookingSuccessHeader from "@/components/booking/BookingSuccessHeader";
import BookingSuccessStatus from "@/components/booking/BookingSuccessStatus";
import BookingSuccessSummary from "@/components/booking/BookingSuccessSummary";
import BookingSuccessActions from "@/components/booking/BookingSuccessActions";
import FooterSection from "@/components/FooterSection";
import { getRatePlanById } from "@/components/hotels/hotelResults";
import { findLocationBySlug } from "@/components/hotels/popularLocations";

export async function generateMetadata({ params }) {
  const { hotelSlug } = await params;
  return {
    title: `Đặt phòng thành công - ${hotelSlug} | VieGo`,
  };
}

export default async function BookingSuccessPage({ params, searchParams }) {
  const { locationSlug, hotelSlug } = await params;
  const sp = (await searchParams) || {};
  const roomSectionId = sp.roomSectionId;
  const ratePlanId = sp.ratePlanId;

  const data = getRatePlanById(
    locationSlug,
    hotelSlug,
    roomSectionId,
    ratePlanId
  );
  if (!data) notFound();
  const { hotel, roomSection, ratePlan } = data;
  const location = findLocationBySlug(locationSlug);

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <BookingSuccessHeader />

      <main className="flex-1">
        <div className="max-w-4xl mx-auto px-6 lg:px-10 py-8 space-y-6">
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
            locationCity={location?.city}
          />

          <BookingSuccessActions />
        </div>
      </main>

      <FooterSection />
    </div>
  );
}
