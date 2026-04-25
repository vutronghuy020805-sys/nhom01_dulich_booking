import Link from "next/link";
import { notFound } from "next/navigation";
import QrPageHeader from "@/components/booking/QrPageHeader";
import PaymentCountdownBanner from "@/components/booking/PaymentCountdownBanner";
import QrPaymentCard from "@/components/booking/QrPaymentCard";
import QrInstructionBox from "@/components/booking/QrInstructionBox";
import QrConfirmationBox from "@/components/booking/QrConfirmationBox";
import PaymentSummaryCard from "@/components/booking/PaymentSummaryCard";
import FooterSection from "@/components/FooterSection";
import { getRatePlanById } from "@/components/hotels/hotelResults";

export async function generateMetadata({ params }) {
  const { hotelSlug } = await params;
  return {
    title: `Thanh toán QR ${hotelSlug} | VieGo`,
  };
}

export default async function QrPaymentPage({ params, searchParams }) {
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

  const backHref = `/booking/${encodeURIComponent(
    locationSlug
  )}/${encodeURIComponent(hotelSlug)}/payment?roomSectionId=${encodeURIComponent(
    roomSectionId
  )}&ratePlanId=${encodeURIComponent(ratePlanId)}`;

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <QrPageHeader />

      <main className="flex-1">
        <div className="max-w-375 mx-auto px-6 lg:px-10 py-6">
          <Link
            href={backHref}
            className="inline-flex items-center gap-1.5 text-slate-700 hover:text-slate-900 font-semibold text-sm mb-4"
          >
            <svg
              viewBox="0 0 24 24"
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
            Trở lại
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-5">
            <div className="space-y-5">
              <PaymentCountdownBanner />
              <QrPaymentCard ratePlan={ratePlan} />
              <QrInstructionBox />
              <QrConfirmationBox
                locationSlug={locationSlug}
                hotelSlug={hotelSlug}
                ratePlanId={ratePlanId}
                roomSectionId={roomSectionId}
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
