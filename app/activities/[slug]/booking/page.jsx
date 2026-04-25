import Link from "next/link";
import { notFound } from "next/navigation";
import HotelsPageHeader from "@/components/hotels/HotelsPageHeader";
import FooterSection from "@/components/FooterSection";
import ActivityTicketBookingCard from "@/components/activities/booking/ActivityTicketBookingCard";
import ActivityTicketPricingSelector from "@/components/activities/booking/ActivityTicketPricingSelector";
import { getTicketSelection } from "@/data/activityDetailsData";

function formatVietnameseDate(date) {
  const d = date.getDate();
  const m = date.getMonth() + 1;
  const y = date.getFullYear();
  return `Hôm nay, ${d} thg ${m} ${y}`;
}

export async function generateMetadata({ params, searchParams }) {
  const { slug } = await params;
  const sp = (await searchParams) || {};
  const ticketId = sp.ticket;
  const selection = ticketId ? getTicketSelection(slug, ticketId) : null;
  if (!selection) {
    return { title: "Đặt vé hoạt động | VieGo" };
  }
  return {
    title: `Đặt vé - ${selection.ticket.title} | VieGo`,
    description: `Chọn số lượng vé cho ${selection.activity.title} trên VieGo.`,
  };
}

export default async function ActivityBookingPage({ params, searchParams }) {
  const { slug } = await params;
  const sp = (await searchParams) || {};
  const ticketId = sp.ticket;
  if (!ticketId) notFound();

  const selection = getTicketSelection(slug, ticketId);
  if (!selection) notFound();

  const { activity, ticket } = selection;
  const dateLabel = formatVietnameseDate(new Date());

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <HotelsPageHeader active="Hoạt động" />

      <main className="flex-1">
        <div className="max-w-350 mx-auto px-4 lg:px-10 py-5 md:py-6">
          <Link
            href={`/activities/${slug}`}
            className="inline-flex items-center gap-2 text-sm md:text-base text-slate-700 hover:text-blue-700 transition-colors"
          >
            <svg
              viewBox="0 0 24 24"
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            Tìm phiếu dịch vụ khác
          </Link>
        </div>

        <div className="max-w-350 mx-auto px-4 lg:px-10 pb-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 md:gap-6 items-start">
            <div className="lg:col-span-4">
              <ActivityTicketBookingCard
                activity={activity}
                ticket={ticket}
              />
            </div>
            <div className="lg:col-span-8">
              <ActivityTicketPricingSelector
                slug={slug}
                ticket={ticket}
                dateLabel={dateLabel}
              />
            </div>
          </div>
        </div>
      </main>

      <FooterSection />
    </div>
  );
}
