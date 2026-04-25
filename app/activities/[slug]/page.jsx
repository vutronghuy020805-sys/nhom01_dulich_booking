import { notFound } from "next/navigation";
import HotelsPageHeader from "@/components/hotels/HotelsPageHeader";
import Breadcrumb from "@/components/common/Breadcrumb";
import FooterSection from "@/components/FooterSection";
import ActivityDetailHero from "@/components/activities/detail/ActivityDetailHero";
import ActivityQuickInfo from "@/components/activities/detail/ActivityQuickInfo";
import ActivityTicketList from "@/components/activities/detail/ActivityTicketList";
import ProductReviews from "@/components/detail/ProductReviews";
import RelatedProducts from "@/components/detail/RelatedProducts";
import { getActivityDetailBySlug } from "@/data/activityDetailsData";
import { enrichedActivities } from "@/data/activitiesData";
import { generateMockReviews, summarizeReviews } from "@/lib/mockReviews";

export function generateStaticParams() {
  return enrichedActivities.map((activity) => ({ slug: activity.id }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const activity = getActivityDetailBySlug(slug);
  if (!activity) {
    return {
      title: "Không tìm thấy hoạt động | VieGo",
    };
  }
  return {
    title: `${activity.title} | VieGo`,
    description: `Đặt vé ${activity.title} tại ${activity.location} trên VieGo.`,
  };
}

export default async function ActivityDetailPage({ params }) {
  const { slug } = await params;
  const activity = getActivityDetailBySlug(slug);
  if (!activity) notFound();

  const reviews = generateMockReviews(activity.slug, 4);
  const reviewSummary = summarizeReviews(reviews);

  const relatedItems = enrichedActivities
    .filter(
      (a) =>
        a.id !== activity.slug &&
        (a.category === activity.category ||
          a.destination === activity.destination)
    )
    .slice(0, 4)
    .map((a) => ({
      id: a.id,
      title: a.title,
      subtitle: a.destination,
      image: a.image,
      rating: a.rating,
      price: a.price,
      href: `/activities/${a.id}`,
    }));

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <HotelsPageHeader active="Hoạt động" />

      <main className="flex-1 bg-white">
        <div className="max-w-350 mx-auto px-4 lg:px-10 pt-4 md:pt-5">
          <Breadcrumb
            items={[
              { label: "Hoạt động", href: "/activities" },
              { label: activity.title },
            ]}
          />
        </div>

        <ActivityDetailHero activity={activity} />
        <ActivityQuickInfo activity={activity} />
        <ActivityTicketList
          slug={activity.slug}
          tickets={activity.ticketOptions}
        />

        <div className="max-w-350 mx-auto px-4 lg:px-10 py-8 md:py-10 space-y-8">
          <ProductReviews
            summary={reviewSummary}
            reviews={reviews}
          />

          {relatedItems.length > 0 ? (
            <RelatedProducts
              title="Hoạt động tương tự"
              subtitle={`Gợi ý cùng ${activity.destination || "danh mục"}`}
              items={relatedItems}
            />
          ) : null}
        </div>
      </main>

      <FooterSection />
    </div>
  );
}
