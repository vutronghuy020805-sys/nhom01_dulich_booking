import HotelsPageHeader from "@/components/hotels/HotelsPageHeader";
import Breadcrumb from "@/components/common/Breadcrumb";
import FooterSection from "@/components/FooterSection";
import AirportTransferHeroContent from "@/components/airport-transfer/AirportTransferHeroContent";
import MotionReveal from "@/components/motion/MotionReveal";
import AirportTransferSearchForm from "@/components/airport-transfer/AirportTransferSearchForm";
import AirportTransferTrustedBy from "@/components/airport-transfer/AirportTransferTrustedBy";
import AirportTransferBenefitsSection from "@/components/airport-transfer/AirportTransferBenefitsSection";
import AirportTransferPartnersSection from "@/components/airport-transfer/AirportTransferPartnersSection";

export const metadata = {
  title: "Đưa đón sân bay | VieGo",
  description:
    "Đặt dịch vụ đưa đón sân bay tiện lợi, nhanh chóng và đúng giờ trên VieGo.",
};

export default function AirportTransferPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <HotelsPageHeader active="Đưa đón sân bay" />

      <main className="flex-1">
        <div className="max-w-350 mx-auto px-4 lg:px-10 pt-4 md:pt-5">
          <Breadcrumb items={[{ label: "Đưa đón sân bay" }]} />
        </div>

        <section className="relative">
          <div className="relative bg-linear-to-b from-sky-500 via-sky-400 to-sky-300">
            <AirportTransferHeroContent />
          </div>

          <div className="max-w-350 mx-auto px-4 lg:px-10 -mt-14 md:-mt-20 relative z-10">
            <AirportTransferSearchForm />
          </div>

          <div className="max-w-350 mx-auto px-4 lg:px-10 mt-6 md:mt-8 pb-14 md:pb-20">
            <AirportTransferTrustedBy />
          </div>
        </section>

        <MotionReveal>
          <AirportTransferBenefitsSection />
        </MotionReveal>

        <MotionReveal>
          <AirportTransferPartnersSection />
        </MotionReveal>
      </main>

      <FooterSection />
    </div>
  );
}
