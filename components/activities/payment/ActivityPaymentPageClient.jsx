"use client";

import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import FooterSection from "@/components/FooterSection";
import ActivityPaymentHeader from "./ActivityPaymentHeader";
import ActivityPaymentClient from "./ActivityPaymentClient";
import ActivityPaymentSummaryCard from "./ActivityPaymentSummaryCard";
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
    <div className="flex flex-col min-h-screen bg-slate-50">
      <ActivityPaymentHeader />
      <main className="flex-1 flex items-center justify-center px-6 py-20 text-center">
        <div>
          <h1 className="text-xl font-bold text-slate-900 mb-2">
            Không tìm thấy đơn thanh toán
          </h1>
          <p className="text-sm text-slate-600 mb-6">
            Vui lòng quay lại bước trước để chọn vé hợp lệ.
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

export default function ActivityPaymentPageClient() {
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
