import GenericSuccessHeader from "@/components/payment/GenericSuccessHeader";
import GenericSuccessStatus from "@/components/payment/GenericSuccessStatus";
import GenericSuccessDetails from "@/components/payment/GenericSuccessDetails";
import GenericSuccessActions from "@/components/payment/GenericSuccessActions";
import FooterSection from "@/components/FooterSection";
import { getVehicleById } from "@/data/airportTransferVehicles";
import { AIRPORTS, DESTINATIONS } from "@/data/airportTransferData";
import { buildBookingCode } from "@/components/airport-transfer/airportTransferCodes";

export const metadata = {
  title: "Xác nhận đặt xe - Đưa đón sân bay | VieGo",
};

const VN_DAYS = [
  "Chủ Nhật",
  "Thứ Hai",
  "Thứ Ba",
  "Thứ Tư",
  "Thứ Năm",
  "Thứ Sáu",
  "Thứ Bảy",
];

function parseIsoDate(value) {
  if (!value) return null;
  const [y, m, d] = value.split("-").map(Number);
  if (!y || !m || !d) return null;
  const dt = new Date(y, m - 1, d);
  return Number.isNaN(dt.getTime()) ? null : dt;
}

function formatVnDate(d) {
  if (!d) return "";
  return `${VN_DAYS[d.getDay()]}, ${d.getDate()}/${String(d.getMonth() + 1).padStart(2, "0")}/${d.getFullYear()}`;
}

function formatVnd(v) {
  return v.toLocaleString("vi-VN") + " VND";
}

export default async function AirportTransferConfirmationPage({
  searchParams,
}) {
  const params = (await searchParams) || {};
  const pick = (k) => (typeof params[k] === "string" ? params[k] : "");

  const vehicleId = pick("vehicle");
  const vehicle = getVehicleById(vehicleId);
  const fromId = pick("from");
  const toId = pick("to");
  const dateStr = pick("date");
  const timeStr = pick("time");
  const airline = pick("airline");
  const flightNumber = pick("flightNumber");
  const noteToDriver = pick("noteToDriver");
  const contactTitle = pick("title");
  const contactName = pick("fullName");
  const contactPhone = pick("phone");
  const contactEmail = pick("email");
  const paymentMethod = pick("paymentMethod") || "VietQR";
  const paidAt = pick("paidAt") || new Date().toISOString();
  const carQuantity = Math.max(1, parseInt(params.carQuantity, 10) || 1);
  const totalPrice =
    parseInt(params.totalPrice, 10) || (vehicle ? vehicle.price * carQuantity : 0);

  const fromName = AIRPORTS.find((a) => a.id === fromId)?.name || "";
  const toName = DESTINATIONS.find((d) => d.id === toId)?.name || "";
  const pickupDate = parseIsoDate(dateStr);

  const bookingCode = buildBookingCode({
    vehicleId,
    fromId,
    toId,
    date: dateStr,
    time: timeStr,
  });

  const displayName = [contactTitle, contactName].filter(Boolean).join(" ") || "—";

  const leftFields = [
    { label: "Phương tiện", value: vehicle ? `${vehicle.name} (${vehicle.tier})` : "—" },
    { label: "Điểm đón", value: fromName },
    { label: "Điểm trả", value: toName },
    {
      label: "Ngày đón",
      value: (
        <div className="space-y-0.5">
          <div>{formatVnDate(pickupDate)}</div>
          {timeStr ? (
            <div className="text-sm text-slate-500">
              Đón lúc {timeStr} (tuỳ giờ đến chuyến bay)
            </div>
          ) : null}
        </div>
      ),
    },
    {
      label: "Chuyến bay",
      value: airline || flightNumber
        ? `${airline || "—"} · ${flightNumber || "—"}`
        : "—",
    },
    {
      label: "Số lượng",
      value: vehicle
        ? `${carQuantity} xe · ${vehicle.passengers} hành khách · ${vehicle.baggage} hành lý`
        : `${carQuantity} xe`,
    },
  ];

  const rightFields = [
    {
      label: "Tổng tiền",
      value: (
        <div className="flex items-center gap-3">
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
    { label: "Tên khách", value: displayName },
    {
      label: "Người liên hệ",
      value: (
        <div className="space-y-0.5">
          <div>{displayName}</div>
          <div className="text-sm text-slate-600">{contactPhone || "—"}</div>
          <div className="text-sm text-slate-600">{contactEmail || "—"}</div>
        </div>
      ),
    },
    {
      label: "Ghi chú cho tài xế",
      value: noteToDriver || "Không có",
    },
  ];

  const emailNotice = contactEmail ? (
    <>
      Xác nhận đặt xe đã được gửi tới email{" "}
      <span className="font-semibold">{contactEmail}</span>. Nếu bạn chưa nhận
      được email, vui lòng kiểm tra thư mục spam hoặc liên hệ VieGo.
    </>
  ) : null;

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <GenericSuccessHeader badgeLabel="Đặt xe hoàn tất" />

      <main className="flex-1 max-w-4xl mx-auto px-4 lg:px-10 py-8 md:py-10 w-full space-y-6 md:space-y-8">
        <GenericSuccessStatus
          title="Đặt xe thành công!"
          description="VieGo đã ghi nhận thanh toán chuyến xe đưa đón tại {subject}. Xác nhận đặt xe và thông tin chi tiết đã được gửi tới email của bạn."
          subjectName={vehicle ? vehicle.name : fromName || "sân bay"}
          code={bookingCode}
          paidAt={paidAt}
        />

        <GenericSuccessDetails
          title="Thông tin đơn đặt xe"
          leftFields={leftFields}
          rightFields={rightFields}
          emailNotice={emailNotice}
        />

        <GenericSuccessActions exploreHref="/airport-transfer" />
      </main>

      <FooterSection />
    </div>
  );
}
