import { notFound } from "next/navigation";
import FooterSection from "@/components/FooterSection";
import ActivityPaymentHeader from "@/components/activities/payment/ActivityPaymentHeader";
import ActivityPaymentClient from "@/components/activities/payment/ActivityPaymentClient";
import ActivityPaymentSummaryCard from "@/components/activities/payment/ActivityPaymentSummaryCard";
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
    return { title: "Thanh toán | VieGo" };
  }
  return {
    title: `Thanh toán - ${selection.ticket.title} | VieGo`,
    description: `Thanh toán vé ${selection.activity.title} trên VieGo.`,
  };
}

export default async function ActivityPaymentPage({ params, searchParams }) {
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

  const baseQuery = new URLSearchParams({
    ticket: ticket.id,
    adult: String(quantities.adult),
    senior: String(quantities.senior),
    child: String(quantities.child),
  }).toString();

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <ActivityPaymentHeader />

      <main className="flex-1">
        <div className="max-w-375 mx-auto px-4 lg:px-10 py-6 md:py-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-5 md:gap-6">
            <div>
              <ActivityPaymentClient
                totalPrice={totalPrice}
                baseQuery={baseQuery}
                slug={slug}
              />
            </div>
            <div>
              <ActivityPaymentSummaryCard bookingContext={bookingContext} />
            </div>
          </div>
        </div>
      </main>

      <FooterSection />
    </div>
  );
}
