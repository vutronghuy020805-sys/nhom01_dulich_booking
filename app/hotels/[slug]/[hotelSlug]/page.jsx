import { notFound } from "next/navigation";
import HotelsPageHeader from "@/components/hotels/HotelsPageHeader";
import HotelDetailSearchBar from "@/components/hotels/HotelDetailSearchBar";
import HotelDetailBreadcrumb from "@/components/hotels/HotelDetailBreadcrumb";
import HotelDetailGallery from "@/components/hotels/HotelDetailGallery";
import HotelDetailSummary from "@/components/hotels/HotelDetailSummary";
import HotelDetailTabs from "@/components/hotels/HotelDetailTabs";
import HotelDetailNotice from "@/components/hotels/HotelDetailNotice";
import HotelDetailInfoPanel from "@/components/hotels/HotelDetailInfoPanel";
import HotelRoomSelectionPanel from "@/components/hotels/HotelRoomSelectionPanel";
import HotelGuestQuestionsSection from "@/components/hotels/HotelGuestQuestionsSection";
import HotelSurroundingsSection from "@/components/hotels/HotelSurroundingsSection";
import HotelGeneralPoliciesSection from "@/components/hotels/HotelGeneralPoliciesSection";
import FooterSection from "@/components/FooterSection";
import ProductReviews from "@/components/detail/ProductReviews";
import RelatedProducts from "@/components/detail/RelatedProducts";
import { findLocationBySlug } from "@/components/hotels/popularLocations";
import {
  getHotelByDetailSlug,
  getAllHotelDetailParams,
  getHotelsBySlug,
} from "@/components/hotels/hotelResults";
import { generateMockReviews, summarizeReviews } from "@/lib/mockReviews";

export function generateStaticParams() {
  return getAllHotelDetailParams();
}

export async function generateMetadata({ params }) {
  const { slug, hotelSlug } = await params;
  const hotel = getHotelByDetailSlug(slug, hotelSlug);
  if (!hotel) return { title: "Không tìm thấy | VieGo" };
  return {
    title: `${hotel.name} | VieGo`,
    description: hotel.description,
  };
}

export default async function HotelDetailPage({ params }) {
  const { slug, hotelSlug } = await params;
  const location = findLocationBySlug(slug);
  const hotel = getHotelByDetailSlug(slug, hotelSlug);
  if (!hotel || !location) notFound();

  const reviews = generateMockReviews(`${slug}-${hotelSlug}`, 4);
  const reviewSummary = summarizeReviews(reviews);

  const relatedHotels = getHotelsBySlug(slug)
    .filter((h) => h.id !== hotel.id)
    .slice(0, 4)
    .map((h) => ({
      id: h.id,
      title: h.name,
      subtitle: location.city,
      image: h.image,
      rating: h.rating,
      price: h.price,
      href: `/hotels/${location.slug}/${h.slug}`,
    }));

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <HotelsPageHeader active="Khách sạn" />
      <HotelDetailSearchBar hotel={hotel} locationCity={location.city} />
      <HotelDetailTabs />

      <main className="flex-1">
        <div className="max-w-375 mx-auto px-6 lg:px-10 pt-6">
          <HotelDetailBreadcrumb
            hotel={hotel}
            locationCity={location.city}
            locationSlug={location.slug}
          />
        </div>

        <section className="max-w-375 mx-auto px-6 lg:px-10 pt-5">
          <HotelDetailGallery hotel={hotel} />
        </section>

        <section
          id="overview"
          className="max-w-375 mx-auto px-6 lg:px-10 pt-8"
        >
          <HotelDetailSummary hotel={hotel} />
          <div className="mt-6">
            <HotelDetailNotice />
          </div>
          <HotelDetailInfoPanel hotel={hotel} />
        </section>

        <section id="rooms" className="max-w-375 mx-auto px-6 lg:px-10 pt-12">
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-4">
            Chọn phòng
          </h2>
          <HotelRoomSelectionPanel hotel={hotel} />
        </section>

        <HotelGuestQuestionsSection hotel={hotel} />

        <HotelSurroundingsSection locationSlug={location.slug} />

        <HotelGeneralPoliciesSection hotel={hotel} />

        <section
          id="location"
          className="max-w-375 mx-auto px-6 lg:px-10 pt-12"
        >
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-4">
            Vị trí
          </h2>
          <div className="border border-gray-200 rounded-2xl p-5 text-sm text-slate-700">
            <p className="flex items-start gap-2">
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-4 h-4 text-red-400 shrink-0 mt-0.5"
              >
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
              </svg>
              {hotel.address}
            </p>
          </div>
        </section>

        <section
          id="amenities"
          className="max-w-375 mx-auto px-6 lg:px-10 pt-12"
        >
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-4">
            Tiện ích
          </h2>
          <ul className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {hotel.amenities.map((a) => (
              <li
                key={a}
                className="flex items-center gap-2 text-sm text-slate-700 border border-gray-200 rounded-xl px-4 py-3"
              >
                <span className="text-sky-500">✓</span>
                {a}
              </li>
            ))}
          </ul>
        </section>

        <section
          id="reviews"
          className="max-w-375 mx-auto px-6 lg:px-10 pt-12"
        >
          <ProductReviews
            summary={{ ...reviewSummary, count: Number(hotel.reviews) || reviewSummary.count }}
            reviews={reviews}
          />
        </section>

        {relatedHotels.length > 0 ? (
          <section className="max-w-375 mx-auto px-6 lg:px-10 pt-12 pb-16">
            <RelatedProducts
              title="Chỗ nghỉ tương tự"
              subtitle={`Các khách sạn nổi bật khác tại ${location.city}`}
              items={relatedHotels}
            />
          </section>
        ) : (
          <div className="pb-16" />
        )}
      </main>

      <FooterSection />
    </div>
  );
}
