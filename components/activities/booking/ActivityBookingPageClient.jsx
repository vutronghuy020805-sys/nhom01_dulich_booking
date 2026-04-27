"use client";

import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import HotelsPageHeader from "@/components/hotels/HotelsPageHeader";
import FooterSection from "@/components/FooterSection";
import ActivityTicketBookingCard from "./ActivityTicketBookingCard";
import ActivityTicketPricingSelector from "./ActivityTicketPricingSelector";
import { getTicketSelection } from "@/data/activityDetailsData";

function formatVietnameseDate(date) {
  const d = date.getDate();
  const m = date.getMonth() + 1;
  const y = date.getFullYear();
  return `Hôm nay, ${d} thg ${m} ${y}`;
}

function NotFoundView() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <HotelsPageHeader active="Hoạt động" />
      <main className="flex-1 flex items-center justify-center px-6 py-20 text-center">
        <div>
          <h1 className="text-xl font-bold text-slate-900 mb-2">
            Không tìm thấy phiếu dịch vụ
          </h1>
          <p className="text-sm text-slate-600 mb-6">
            Vui lòng quay lại trang hoạt động và chọn vé hợp lệ.
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

export default function ActivityBookingPageClient() {
  const { slug } = useParams();
  const sp = useSearchParams();
  const ticketId = sp.get("ticket");

  if (!ticketId) return <NotFoundView />;
  const selection = getTicketSelection(slug, ticketId);
  if (!selection) return <NotFoundView />;

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
              <ActivityTicketBookingCard activity={activity} ticket={ticket} />
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
