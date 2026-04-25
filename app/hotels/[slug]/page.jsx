import { notFound } from "next/navigation";
import HotelsPageHeader from "@/components/hotels/HotelsPageHeader";
import Breadcrumb from "@/components/common/Breadcrumb";
import HotelsHero from "@/components/hotels/HotelsHero";
import HotelResultsList from "@/components/hotels/HotelResultsList";
import LocationOffersSection from "@/components/hotels/LocationOffersSection";
import CouponSection from "@/components/hotels/CouponSection";
import LocationInfoSummary from "@/components/hotels/LocationInfoSummary";
import LocationExtraInfo from "@/components/hotels/LocationExtraInfo";
import LocationFaqSection from "@/components/hotels/LocationFaqSection";
import LocationTestimonialsSection from "@/components/hotels/LocationTestimonialsSection";
import WhyBookVieGoSection from "@/components/hotels/WhyBookVieGoSection";
import AlternativeStaySection from "@/components/hotels/AlternativeStaySection";
import FooterSection from "@/components/FooterSection";
import {
  findLocationBySlug,
  popularLocations,
} from "@/components/hotels/popularLocations";
import { getHotelsBySlug } from "@/components/hotels/hotelResults";
import { getLocationInfo } from "@/components/hotels/locationInfo";
import { getFaqForSlug } from "@/components/hotels/locationFaq";
import { getTestimonialsForSlug } from "@/components/hotels/locationTestimonials";
import { getAlternativeStaysForSlug } from "@/components/hotels/alternativeStays";

export function generateStaticParams() {
  return popularLocations.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const location = findLocationBySlug(slug);
  if (!location) return { title: "Không tìm thấy | VieGo" };
  return {
    title: `Khách sạn ở ${location.city} | VieGo`,
    description: `Danh sách khách sạn nổi bật tại ${location.city}`,
  };
}

export default async function HotelLocationPage({ params }) {
  const { slug } = await params;
  const location = findLocationBySlug(slug);
  if (!location) notFound();

  const hotels = getHotelsBySlug(slug);
  const info = getLocationInfo(slug);
  const faq = getFaqForSlug(slug);
  const testimonials = getTestimonialsForSlug(slug);
  const altStays = getAlternativeStaysForSlug(slug);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <HotelsPageHeader active="Khách sạn" />

      <main className="flex-1">
        <div className="max-w-375 mx-auto px-6 lg:px-10 pt-4 md:pt-5">
          <Breadcrumb
            items={[
              { label: "Khách sạn", href: "/hotels" },
              { label: `Khách sạn ở ${location.city}` },
            ]}
          />
        </div>

        <HotelsHero
          heroImage={location.image}
          selectedLocation={location.city}
        />

        <HotelResultsList location={location} hotels={hotels} />

        <LocationOffersSection />

        <CouponSection />

        {info && (
          <>
            <LocationInfoSummary info={info} />
            <LocationExtraInfo info={info} />
          </>
        )}

        {faq && <LocationFaqSection faq={faq} />}

        {testimonials && (
          <LocationTestimonialsSection testimonials={testimonials} />
        )}

        <WhyBookVieGoSection />

        {altStays && <AlternativeStaySection data={altStays} />}
      </main>

      <FooterSection />
    </div>
  );
}
