import { notFound } from "next/navigation";
import HotelsPageHeader from "@/components/hotels/HotelsPageHeader";
import FooterSection from "@/components/FooterSection";
import ActivityCheckoutBanner from "@/components/activities/checkout/ActivityCheckoutBanner";
import ActivityCheckoutForm from "@/components/activities/checkout/ActivityCheckoutForm";
import { getTicketSelection } from "@/data/activityDetailsData";

function formatVietnameseDate(date) {
  const d = date.getDate();
  const m = date.getMonth() + 1;
  const y = date.getFullYear();
  return `Hôm nay, ${d} thg ${m} ${y}`;
}

function parseQty(value) {
  const n = parseInt(value, 10);
  if (Number.isNaN(n) || n < 0) return 0;
  return n;
}

export async function generateMetadata({ params, searchParams }) {
  const { slug } = await params;
  const sp = (await searchParams) || {};
  const selection = sp.ticket ? getTicketSelection(slug, sp.ticket) : null;
  if (!selection) {
    return { title: "Thông tin liên hệ | VieGo" };
  }
  return {
    title: `Thông tin liên hệ - ${selection.ticket.title} | VieGo`,
    description: `Hoàn tất thông tin đặt vé ${selection.activity.title} trên VieGo.`,
  };
}

export default async function ActivityCheckoutPage({ params, searchParams }) {
  const { slug } = await params;
  const sp = (await searchParams) || {};

  const ticketId = sp.ticket;
  if (!ticketId) notFound();

  const selection = getTicketSelection(slug, ticketId);
  if (!selection) notFound();

  const quantities = {
    adult: parseQty(sp.adult),
    senior: parseQty(sp.senior),
    child: parseQty(sp.child),
  };
  const totalQty = quantities.adult + quantities.senior + quantities.child;
  if (totalQty < 1) notFound();

  const { activity, ticket } = selection;
  const totalPrice =
    quantities.adult * ticket.pricing.adult.price +
    quantities.senior * ticket.pricing.senior.price +
    quantities.child * ticket.pricing.child.price;

  const dateLabel = formatVietnameseDate(new Date());

  const bookingContext = {
    slug,
    activity,
    ticket,
    quantities,
    totalPrice,
    dateLabel,
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <HotelsPageHeader active="Hoạt động" />

      <main className="flex-1">
        <ActivityCheckoutBanner />
        <ActivityCheckoutForm bookingContext={bookingContext} />
      </main>

      <FooterSection />
    </div>
  );
}
