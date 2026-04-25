import AirportTransferStepHeader from "@/components/airport-transfer/AirportTransferStepHeader";
import AirportTransferPaymentSummaryCard from "@/components/airport-transfer/AirportTransferPaymentSummaryCard";
import FooterSection from "@/components/FooterSection";
import GenericQrClient from "@/components/payment/GenericQrClient";
import { getVehicleById } from "@/data/airportTransferVehicles";
import { AIRPORTS, DESTINATIONS } from "@/data/airportTransferData";
import { buildBookingCode } from "@/components/airport-transfer/airportTransferCodes";

export const metadata = {
  title: "Quét mã QR - Đưa đón sân bay | VieGo",
};

const VN_DAYS = ["CN", "Th 2", "Th 3", "Th 4", "Th 5", "Th 6", "Th 7"];

function parseIsoDate(value) {
  if (!value) return null;
  const [y, m, d] = value.split("-").map(Number);
  if (!y || !m || !d) return null;
  const dt = new Date(y, m - 1, d);
  return Number.isNaN(dt.getTime()) ? null : dt;
}

function formatDateLabel(date) {
  if (!date) return "";
  const day = VN_DAYS[date.getDay()];
  return `${day}, ${date.getDate()} thg ${
    date.getMonth() + 1
  }, ${date.getFullYear()}`;
}

export default async function AirportTransferQrPage({ searchParams }) {
  const params = (await searchParams) || {};
  const pick = (k) => (typeof params[k] === "string" ? params[k] : "");

  const vehicleId = pick("vehicle");
  const vehicle = getVehicleById(vehicleId);
  const fromId = pick("from");
  const toId = pick("to");
  const dateStr = pick("date");
  const timeStr = pick("time");
  const totalPrice = parseInt(params.totalPrice, 10) || vehicle?.price || 0;

  const fromName = AIRPORTS.find((a) => a.id === fromId)?.name || "";
  const toName = DESTINATIONS.find((d) => d.id === toId)?.name || "";
  const dateLabel = formatDateLabel(parseIsoDate(dateStr));

  const bookingCode = buildBookingCode({
    vehicleId,
    fromId,
    toId,
    date: dateStr,
    time: timeStr,
  });

  const forwardParams = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (typeof v === "string" && v) forwardParams.set(k, v);
  });
  forwardParams.set("paymentStatus", "paid");
  forwardParams.set("paidAt", new Date().toISOString());

  const backHref = `/airport-transfer/payment?${new URLSearchParams(
    Object.fromEntries(
      Object.entries(params).filter(([, v]) => typeof v === "string" && v)
    )
  ).toString()}`;
  const successHref = `/airport-transfer/confirmation?${forwardParams.toString()}`;

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <AirportTransferStepHeader currentStep={3} />

      <main className="flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_400px] max-w-375 mx-auto px-6 lg:px-10 py-6 gap-5 items-start">
          <GenericQrClient
            backHref={backHref}
            qrSeed={bookingCode}
            totalPrice={totalPrice}
            successHref={successHref}
          />

          <aside>
            <AirportTransferPaymentSummaryCard
              vehicle={vehicle}
              fromName={fromName}
              toName={toName}
              dateLabel={dateLabel}
              timeStr={timeStr}
              airline={pick("airline")}
              flightNumber={pick("flightNumber")}
              carQuantity={Math.max(1, parseInt(params.carQuantity, 10) || 1)}
              contactTitle={pick("title")}
              contactName={pick("fullName")}
              contactPhone={pick("phone")}
              contactEmail={pick("email")}
              paymentLabel="VietQR"
              totalPrice={totalPrice}
            />
          </aside>
        </div>
      </main>

      <FooterSection />
    </div>
  );
}
