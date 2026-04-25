import { notFound } from "next/navigation";
import BookingHeader from "@/components/booking/BookingHeader";
import BookingContactForm from "@/components/booking/BookingContactForm";
import BookingSummaryCard from "@/components/booking/BookingSummaryCard";
import BookingPriceBreakdown from "@/components/booking/BookingPriceBreakdown";
import BookingStep1Form from "@/components/booking/BookingStep1Form";
import FooterSection from "@/components/FooterSection";
import { getRatePlanById } from "@/components/hotels/hotelResults";

export async function generateMetadata({ params }) {
  const { locationSlug, hotelSlug } = await params;
  return {
    title: `Đặt phòng ${hotelSlug} | VieGo`,
    description: `Hoàn tất đặt phòng tại ${hotelSlug} thuộc khu vực ${locationSlug}.`,
  };
}

export default async function BookingPage({ params, searchParams }) {
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
  const { hotel, ratePlan } = data;

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <BookingHeader hotel={hotel} activeStep={1} />

      <main className="flex-1">
        <div className="max-w-375 mx-auto px-6 lg:px-10 py-6">
          <BookingStep1Form
            locationSlug={locationSlug}
            hotelSlug={hotelSlug}
            roomSectionId={roomSectionId}
            ratePlanId={ratePlanId}
          >
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-5">
              <div>
                <BookingContactForm />
              </div>
              <aside className="space-y-4">
                <BookingSummaryCard hotel={hotel} ratePlan={ratePlan} />
                <BookingPriceBreakdown ratePlan={ratePlan} nights={1} />
              </aside>
            </div>
          </BookingStep1Form>
        </div>
      </main>

      <FooterSection />
    </div>
  );
}
