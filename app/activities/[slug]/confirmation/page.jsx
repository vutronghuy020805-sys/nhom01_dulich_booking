import { notFound } from "next/navigation";
import FooterSection from "@/components/FooterSection";
import GenericSuccessHeader from "@/components/payment/GenericSuccessHeader";
import GenericSuccessStatus from "@/components/payment/GenericSuccessStatus";
import GenericSuccessDetails from "@/components/payment/GenericSuccessDetails";
import GenericSuccessActions from "@/components/payment/GenericSuccessActions";
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

function buildBookingCode(seed) {
  let h = 5381;
  for (const c of String(seed || "")) h = ((h << 5) + h + c.charCodeAt(0)) | 0;
  const year = new Date().getFullYear();
  return `VG-${year}-${String(Math.abs(h) % 1000000).padStart(6, "0")}`;
}

function formatVnd(v) {
  return v.toLocaleString("vi-VN") + " VND";
}

const METHOD_LABELS = {
  vietqr: "VietQR",
  "vietinbank-transfer": "Chuyển tiền VietinBank",
  "digital-wallet": "Ví điện tử",
  "mobile-banking": "Ngân hàng di động",
  card: "Thẻ thanh toán",
  "in-store": "Tại cửa hàng",
};

export async function generateMetadata({ params, searchParams }) {
  const { slug } = await params;
  const sp = (await searchParams) || {};
  const selection = sp.ticket ? getTicketSelection(slug, sp.ticket) : null;
  if (!selection) {
    return { title: "Xác nhận đặt vé | VieGo" };
  }
  return {
    title: `Vé điện tử - ${selection.ticket.title} | VieGo`,
    description: `VieGo đã xác nhận đơn đặt vé ${selection.activity.title}.`,
  };
}

export default async function ActivityConfirmationPage({
  params,
  searchParams,
}) {
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
  const methodId = typeof sp.method === "string" ? sp.method : "vietqr";
  const paymentMethod =
    (typeof sp.paymentMethod === "string" && sp.paymentMethod) ||
    METHOD_LABELS[methodId] ||
    "VietQR";
  const paidAt =
    typeof sp.paidAt === "string" && sp.paidAt
      ? sp.paidAt
      : new Date().toISOString();
  const couponCode = typeof sp.couponCode === "string" ? sp.couponCode : "";
  const discount = parseInt(sp.discount, 10) || 0;

  const bookingCode = buildBookingCode(`${slug}-${ticket.id}`);

  const quantityParts = [];
  if (quantities.adult > 0)
    quantityParts.push(`${quantities.adult} người lớn`);
  if (quantities.senior > 0)
    quantityParts.push(`${quantities.senior} người cao tuổi`);
  if (quantities.child > 0)
    quantityParts.push(`${quantities.child} trẻ em`);

  const leftFields = [
    { label: "Hoạt động", value: activity.title },
    { label: "Địa điểm", value: activity.location },
    { label: "Loại vé", value: ticket.title },
    { label: "Ngày tham quan", value: dateLabel },
    { label: "Số lượng vé", value: quantityParts.join(" · ") || "—" },
    { label: "Tổng số vé", value: `${totalQty} vé` },
  ];

  const rightFields = [
    {
      label: "Tổng tiền",
      value: (
        <div className="flex items-center gap-3 flex-wrap">
          <span className="text-xl font-bold text-slate-900">
            {formatVnd(totalPrice)}
          </span>
          <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-1 rounded-full">
            <svg viewBox="0 0 24 24" className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            Đã thanh toán
          </span>
        </div>
      ),
    },
    { label: "Phương thức thanh toán", value: paymentMethod },
    ...(couponCode
      ? [
          {
            label: "Mã giảm giá",
            value: (
              <span>
                <span className="font-semibold text-slate-900">{couponCode}</span>
                {discount > 0 ? (
                  <span className="ml-2 text-emerald-600 font-semibold">
                    -{formatVnd(discount)}
                  </span>
                ) : null}
              </span>
            ),
          },
        ]
      : []),
    { label: "Mã đặt chỗ", value: bookingCode },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <GenericSuccessHeader badgeLabel="Đặt vé hoàn tất" />

      <main className="flex-1 max-w-4xl mx-auto px-4 lg:px-10 py-8 md:py-10 w-full space-y-6 md:space-y-8">
        <GenericSuccessStatus
          title="Đặt vé thành công!"
          description="VieGo đã ghi nhận thanh toán cho vé {subject}. Vé điện tử và thông tin chi tiết đã được gửi tới email của bạn."
          subjectName={activity.title}
          code={bookingCode}
          paidAt={paidAt}
        />

        <GenericSuccessDetails
          title="Thông tin đơn đặt vé"
          leftFields={leftFields}
          rightFields={rightFields}
        />

        <GenericSuccessActions
          exploreHref="/activities"
          exploreLabel="Tiếp tục khám phá"
        />
      </main>

      <FooterSection />
    </div>
  );
}
