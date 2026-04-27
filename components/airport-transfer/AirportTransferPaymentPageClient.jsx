"use client";

import { useSearchParams } from "next/navigation";
import AirportTransferStepHeader from "./AirportTransferStepHeader";
import AirportTransferPaymentClient from "./AirportTransferPaymentClient";
import AirportTransferPaymentSummaryCard from "./AirportTransferPaymentSummaryCard";
import FooterSection from "@/components/FooterSection";
import { getVehicleById } from "@/data/airportTransferVehicles";
import { AIRPORTS, DESTINATIONS } from "@/data/airportTransferData";

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
  return `${day}, ${date.getDate()} thg ${date.getMonth() + 1}, ${date.getFullYear()}`;
}

export default function AirportTransferPaymentPageClient() {
  const sp = useSearchParams();
  const pick = (k) => sp.get(k) || "";

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

  const carQuantity = Math.max(1, parseInt(pick("carQuantity"), 10) || 1);
  const unitPrice = vehicle ? vehicle.price : 0;
  const totalPrice = parseInt(pick("totalPrice"), 10) || unitPrice * carQuantity;

  const fromName = AIRPORTS.find((a) => a.id === fromId)?.name || "";
  const toName = DESTINATIONS.find((d) => d.id === toId)?.name || "";
  const dateLabel = formatDateLabel(parseIsoDate(dateStr));

  const forwardQuery = new URLSearchParams(
    Object.entries({
      vehicle: vehicleId,
      from: fromId,
      to: toId,
      date: dateStr,
      time: timeStr,
      airline,
      flightNumber,
      noteToDriver,
      carQuantity: String(carQuantity),
      totalPrice: String(totalPrice),
      title: contactTitle,
      fullName: contactName,
      phone: contactPhone,
      email: contactEmail,
    }).filter(([, v]) => v)
  ).toString();

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <AirportTransferStepHeader currentStep={3} />

      <main className="flex-1 max-w-350 mx-auto px-4 lg:px-10 py-6 md:py-8 w-full">
        <h1 className="sr-only">Thanh toán</h1>

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] gap-6 md:gap-8 items-start">
          <AirportTransferPaymentClient
            totalPrice={totalPrice}
            baseQuery={forwardQuery}
            qrHref="/airport-transfer/payment/qr"
            confirmationHref="/airport-transfer/confirmation"
          />

          <AirportTransferPaymentSummaryCard
            vehicle={vehicle}
            fromName={fromName}
            toName={toName}
            dateLabel={dateLabel}
            timeStr={timeStr}
            airline={airline}
            flightNumber={flightNumber}
            carQuantity={carQuantity}
            contactTitle={contactTitle}
            contactName={contactName}
            contactPhone={contactPhone}
            contactEmail={contactEmail}
            paymentLabel="VietQR"
            totalPrice={totalPrice}
          />
        </div>
      </main>

      <FooterSection />
    </div>
  );
}
