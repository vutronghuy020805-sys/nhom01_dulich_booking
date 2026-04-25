import HotelsPageHeader from "@/components/hotels/HotelsPageHeader";
import Breadcrumb from "@/components/common/Breadcrumb";
import HotelsHero from "@/components/hotels/HotelsHero";
import PopularHotelDestinations from "@/components/hotels/PopularHotelDestinations";
import MoreThanHotelsSection from "@/components/hotels/MoreThanHotelsSection";
import TravelInspirationSection from "@/components/hotels/TravelInspirationSection";
import HotelFaqSection from "@/components/hotels/HotelFaqSection";
import FooterSection from "@/components/FooterSection";

export const metadata = {
  title: "Khách sạn | VieGo",
  description:
    "Khám phá nhiều lựa chọn từ khách sạn, biệt thự, resort và hơn thế nữa",
};

export default function HotelsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <HotelsPageHeader active="Khách sạn" />

      <main className="flex-1">
        <div className="max-w-375 mx-auto px-6 lg:px-10 pt-4 md:pt-5">
          <Breadcrumb items={[{ label: "Khách sạn" }]} />
        </div>

        <HotelsHero />

        <PopularHotelDestinations />

        <MoreThanHotelsSection />

        <TravelInspirationSection />

        <HotelFaqSection />
      </main>

      <FooterSection />
    </div>
  );
}
