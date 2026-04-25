import HotelsPageHeader from "@/components/hotels/HotelsPageHeader";
import Breadcrumb from "@/components/common/Breadcrumb";
import FlightPromoHero from "@/components/flights/FlightPromoHero";
import WelcomeCouponSection from "@/components/flights/WelcomeCouponSection";
import DomesticBestFareSection from "@/components/flights/DomesticBestFareSection";
import LatestArticlesSection from "@/components/flights/LatestArticlesSection";
import FlightTrustSection from "@/components/flights/FlightTrustSection";
import FlightsFaqSection from "@/components/flights/FlightsFaqSection";
import FooterSection from "@/components/FooterSection";

export const metadata = {
  title: "Vé máy bay | VieGo",
  description:
    "Đặt vé máy bay giá tốt cùng VieGo — ưu đãi độc quyền cho người dùng mới.",
};

export default function FlightsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <HotelsPageHeader active="Vé máy bay" />

      <main className="flex-1">
        <div className="max-w-375 mx-auto px-6 lg:px-10 pt-4 md:pt-5">
          <Breadcrumb items={[{ label: "Vé máy bay" }]} />
        </div>

        <FlightPromoHero />
        <WelcomeCouponSection />
        <DomesticBestFareSection />
        <LatestArticlesSection />
        <FlightTrustSection />
        <FlightsFaqSection />
      </main>

      <FooterSection />
    </div>
  );
}
