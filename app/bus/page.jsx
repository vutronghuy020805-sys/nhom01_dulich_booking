import { Suspense } from "react";
import HotelsPageHeader from "@/components/hotels/HotelsPageHeader";
import Breadcrumb from "@/components/common/Breadcrumb";
import FooterSection from "@/components/FooterSection";
import BusPageHero from "@/components/bus/BusPageHero";
import BusSearchForm from "@/components/bus/BusSearchForm";
import BusPromoBanner from "@/components/bus/BusPromoBanner";
import BusNewUserCouponSection from "@/components/bus/BusNewUserCouponSection";
import LatestArticlesSection from "@/components/flights/LatestArticlesSection";
import { busLatestArticles } from "@/components/bus/busLatestArticles";
import WhyBuyBusOnlineSection from "@/components/bus/WhyBuyBusOnlineSection";
import HowToBookBusSection from "@/components/bus/HowToBookBusSection";
import PopularBusDestinationsSection from "@/components/bus/PopularBusDestinationsSection";
import PopularBusRoutesSection from "@/components/bus/PopularBusRoutesSection";
import BusLongformInfoSection from "@/components/bus/BusLongformInfoSection";
import BusSimpleIntroSection from "@/components/bus/BusSimpleIntroSection";

export const metadata = {
  title: "Vé xe khách | VieGo",
  description:
    "Đặt vé xe khách giá rẻ và nhiều khuyến mãi qua VieGo — tuyến đường, lịch trình, điểm đón, tiện ích và giá vé trên cùng một nền tảng.",
};

export default function BusPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <HotelsPageHeader active="Vé xe khách" />

      <main className="flex-1">
        <div className="max-w-375 mx-auto px-6 lg:px-10 pt-4 md:pt-5">
          <Breadcrumb items={[{ label: "Vé xe khách" }]} />
        </div>

        <div className="relative">
          <BusPageHero />

          <div className="max-w-375 mx-auto px-6 lg:px-10">
            <div className="-mt-28 md:-mt-32 relative z-10">
              <Suspense fallback={null}>
                <BusSearchForm />
              </Suspense>
            </div>
          </div>
        </div>

        <BusPromoBanner />
        <BusNewUserCouponSection />
        <LatestArticlesSection articles={busLatestArticles} />
        <WhyBuyBusOnlineSection />
        <HowToBookBusSection />
        <PopularBusDestinationsSection />
        <PopularBusRoutesSection />
        <BusLongformInfoSection />
        <BusSimpleIntroSection />
      </main>

      <FooterSection />
    </div>
  );
}
