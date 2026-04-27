"use client";

import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
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

function NotFoundView() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <GenericSuccessHeader badgeLabel="Đặt vé hoàn tất" />
      <main className="flex-1 flex items-center justify-center px-6 py-20 text-center">
        <div>
          <h1 className="text-xl font-bold text-slate-900 mb-2">
            Không tìm thấy đơn đặt vé
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

export default function ActivityConfirmationPageClient() {
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
  const subtotal =
    quantities.adult * ticket.pricing.adult.price +
    quantities.senior * ticket.pricing.senior.price +
    quantities.child * ticket.pricing.child.price;
  const totalPrice = parseInt(sp.get("totalPrice"), 10) || subtotal;

  const dateLabel = formatVietnameseDate(new Date());
  const methodId = sp.get("method") || "vietqr";
  const paymentMethod =
    sp.get("paymentMethod") || METHOD_LABELS[methodId] || "VietQR";
  const paidAt = sp.get("paidAt") || new Date().toISOString();
  const couponCode = sp.get("couponCode") || "";
  const discount = parseInt(sp.get("discount"), 10) || 0;

  const bookingCode = buildBookingCode(`${slug}-${ticket.id}`);

  const quantityParts = [];
  if (quantities.adult > 0) quantityParts.push(`${quantities.adult} người lớn`);
  if (quantities.senior > 0)
    quantityParts.push(`${quantities.senior} người cao tuổi`);
  if (quantities.child > 0) quantityParts.push(`${quantities.child} trẻ em`);

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
            <svg
              viewBox="0 0 24 24"
              className="w-3 h-3"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
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
