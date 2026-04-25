import { Suspense } from "react";
import HotelsPageHeader from "@/components/hotels/HotelsPageHeader";
import Breadcrumb from "@/components/common/Breadcrumb";
import FooterSection from "@/components/FooterSection";
import CarRentalHero from "@/components/car-rental/CarRentalHero";
import CarRentalSearchForm from "@/components/car-rental/CarRentalSearchForm";
import CarRentalPartnersSection from "@/components/car-rental/CarRentalPartnersSection";
import CarRentalBenefitsSection from "@/components/car-rental/CarRentalBenefitsSection";
import CarRentalInfoSection from "@/components/car-rental/CarRentalInfoSection";
import CarRentalPopularDestinationsSection from "@/components/car-rental/CarRentalPopularDestinationsSection";
import CarRentalFaqSection from "@/components/car-rental/CarRentalFaqSection";
import MotionReveal from "@/components/motion/MotionReveal";

export const metadata = {
  title: "Thuê xe | VieGo",
  description:
    "Đặt xe thông minh, nhanh chóng cùng VieGo — chọn xe tự lái hoặc có tài xế với giá tốt mỗi ngày.",
};

export default function CarRentalPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <HotelsPageHeader active="Thuê xe" />

      <main className="flex-1">
        <div className="max-w-375 mx-auto px-6 lg:px-10 pt-4 md:pt-5">
          <Breadcrumb items={[{ label: "Thuê xe" }]} />
        </div>

        <div className="relative">
          <CarRentalHero />

          <div className="max-w-375 mx-auto px-6 lg:px-10">
            <div className="-mt-36 md:-mt-44 relative z-10">
              <Suspense fallback={null}>
                <CarRentalSearchForm />
              </Suspense>
            </div>
          </div>
        </div>

        <MotionReveal>
          <CarRentalPartnersSection />
        </MotionReveal>

        <MotionReveal>
          <CarRentalBenefitsSection />
        </MotionReveal>

        <MotionReveal>
          <CarRentalInfoSection />
        </MotionReveal>

        <MotionReveal>
          <CarRentalPopularDestinationsSection />
        </MotionReveal>

        <MotionReveal>
          <CarRentalFaqSection />
        </MotionReveal>

        <div className="h-16" />
      </main>

      <FooterSection />
    </div>
  );
}
