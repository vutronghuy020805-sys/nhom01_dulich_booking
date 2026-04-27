"use client";

import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import HotelsPageHeader from "@/components/hotels/HotelsPageHeader";
import FooterSection from "@/components/FooterSection";
import ActivityCheckoutBanner from "./ActivityCheckoutBanner";
import ActivityCheckoutForm from "./ActivityCheckoutForm";
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

function NotFoundView() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <HotelsPageHeader active="Hoạt động" />
      <main className="flex-1 flex items-center justify-center px-6 py-20 text-center">
        <div>
          <h1 className="text-xl font-bold text-slate-900 mb-2">
            Không tìm thấy đơn đặt vé
          </h1>
          <p className="text-sm text-slate-600 mb-6">
            Vui lòng chọn lại số lượng vé từ trang đặt vé.
          </p>
          <Link
            href="/activities"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-lg"
          >
            Về trang hoạt động
          </Link>
        </div>
      </main>
      <FooterSection />
    </div>
  );
}

export default function ActivityCheckoutPageClient() {
  const { slug } = useParams();
  const sp = useSearchParams();
  const ticketId = sp.get("ticket");

  if (!ticketId) return <NotFoundView />;
  const selection = getTicketSelection(slug, ticketId);
  if (!selection) return <NotFoundView />;

  const quantities = {
    adult: parseQty(sp.get("adult")),
    senior: parseQty(sp.get("senior")),
    child: parseQty(sp.get("child")),
  };
  const totalQty = quantities.adult + quantities.senior + quantities.child;
  if (totalQty < 1) return <NotFoundView />;

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
