import { notFound } from "next/navigation";
import FooterSection from "@/components/FooterSection";
import ActivityPaymentHeader from "@/components/activities/payment/ActivityPaymentHeader";
import ActivityPaymentSummaryCard from "@/components/activities/payment/ActivityPaymentSummaryCard";
import GenericQrClient from "@/components/payment/GenericQrClient";
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

function buildReferenceCode(slug) {
  let h = 5381;
  for (const c of String(slug || "")) h = ((h << 5) + h + c.charCodeAt(0)) | 0;
  const seq = String(Math.abs(h) % 1000000).padStart(6, "0");
  return `VG${slug.slice(0, 3).toUpperCase()}${seq}`;
}

export async function generateMetadata({ params, searchParams }) {
  const { slug } = await params;
  const sp = (await searchParams) || {};
  const selection = sp.ticket ? getTicketSelection(slug, sp.ticket) : null;
  if (!selection) {
    return { title: "Thanh toán VietQR | VieGo" };
  }
  return {
    title: `Thanh toán VietQR - ${selection.ticket.title} | VieGo`,
  };
}

export default async function ActivityQrPaymentPage({ params, searchParams }) {
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
  const subtotal =
    quantities.adult * ticket.pricing.adult.price +
    quantities.senior * ticket.pricing.senior.price +
    quantities.child * ticket.pricing.child.price;
  const totalPrice = parseInt(sp.totalPrice, 10) || subtotal;

  const dateLabel = formatVietnameseDate(new Date());

  const bookingContext = {
    slug,
    activity,
    ticket,
    quantities,
    totalPrice,
    dateLabel,
  };

  const referenceCode = buildReferenceCode(slug);

  const forwardParams = new URLSearchParams();
  Object.entries(sp).forEach(([k, v]) => {
    if (typeof v === "string" && v) forwardParams.set(k, v);
  });
  forwardParams.set("paymentStatus", "paid");
  forwardParams.set("paidAt", new Date().toISOString());
  if (!forwardParams.get("method")) forwardParams.set("method", "vietqr");
  if (!forwardParams.get("paymentMethod"))
    forwardParams.set("paymentMethod", "VietQR");

  const backHref =
    `/activities/${slug}/payment?` +
    new URLSearchParams({
      ticket: ticketId,
      adult: String(quantities.adult),
      senior: String(quantities.senior),
      child: String(quantities.child),
    }).toString();

  const successHref = `/activities/${slug}/confirmation?${forwardParams.toString()}`;

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <ActivityPaymentHeader />

      <main className="flex-1">
        <div className="max-w-375 mx-auto px-4 lg:px-10 py-6 md:py-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-5 md:gap-6 items-start">
            <GenericQrClient
              backHref={backHref}
              qrSeed={referenceCode}
              totalPrice={totalPrice}
              successHref={successHref}
            />
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
