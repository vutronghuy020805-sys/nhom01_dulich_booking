import { notFound } from "next/navigation";
import BookingHeader from "@/components/booking/BookingHeader";
import PaymentLeftPanel from "@/components/booking/PaymentLeftPanel";
import PaymentSummaryCard from "@/components/booking/PaymentSummaryCard";
import FooterSection from "@/components/FooterSection";
import { getRatePlanById } from "@/components/hotels/hotelResults";

export async function generateMetadata({ params }) {
  const { hotelSlug } = await params;
  return {
    title: `Thanh toán đặt phòng ${hotelSlug} | VieGo`,
  };
}

export default async function PaymentPage({ params, searchParams }) {
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

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <BookingHeader hotel={hotel} activeStep={2} />

      <main className="flex-1">
        <div className="max-w-375 mx-auto px-6 lg:px-10 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-5">
            <div>
              <PaymentLeftPanel
                ratePlan={ratePlan}
                locationSlug={locationSlug}
                hotelSlug={hotelSlug}
                roomSectionId={roomSectionId}
                ratePlanId={ratePlanId}
              />
            </div>
            <aside>
              <PaymentSummaryCard
                hotel={hotel}
                roomSection={roomSection}
                ratePlan={ratePlan}
                locationSlug={locationSlug}
                hotelSlug={hotelSlug}
              />
            </aside>
          </div>
        </div>
      </main>

      <FooterSection />
    </div>
  );
}
