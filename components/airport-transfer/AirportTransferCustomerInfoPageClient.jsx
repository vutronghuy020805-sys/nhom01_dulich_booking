"use client";

import { useSearchParams } from "next/navigation";
import AirportTransferStepHeader from "./AirportTransferStepHeader";
import AirportTransferBookingSummaryCard from "./AirportTransferBookingSummaryCard";
import AirportTransferContactForm from "./AirportTransferContactForm";
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

function toInt(value, fallback = 1) {
  const n = parseInt(value, 10);
  return Number.isFinite(n) && n > 0 ? n : fallback;
}

export default function AirportTransferCustomerInfoPageClient() {
  const sp = useSearchParams();
  const vehicleId = sp.get("vehicle") || "";
  const vehicle = getVehicleById(vehicleId);

  const fromId = sp.get("from") || "";
  const toId = sp.get("to") || "";
  const dateStr = sp.get("date") || "";
  const timeStr = sp.get("time") || "";
  const airline = sp.get("airline") || "";
  const flightNumber = sp.get("flightNumber") || "";
  const noteToDriver = sp.get("noteToDriver") || "";
  const carQuantity = toInt(sp.get("carQuantity"), 1);

  const fromName = AIRPORTS.find((a) => a.id === fromId)?.name || "";
  const toName = DESTINATIONS.find((d) => d.id === toId)?.name || "";

  const pickupDate = parseIsoDate(dateStr);
  const dateLabel = formatDateLabel(pickupDate);

  const unitPrice = vehicle ? vehicle.price : 0;
  const totalPrice = unitPrice * carQuantity;

  const nextQuery = new URLSearchParams(
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
    }).filter(([, v]) => v)
  ).toString();

  const backQuery = new URLSearchParams(
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
    }).filter(([, v]) => v)
  ).toString();

  const detailsHref = `/airport-transfer/booking${
    backQuery ? `?${backQuery}` : ""
  }`;

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <AirportTransferStepHeader currentStep={1} />

      <main className="flex-1 max-w-350 mx-auto px-4 lg:px-10 py-6 md:py-8 w-full">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
          Thông tin liên hệ
        </h1>

        <div className="mt-5 md:mt-6 grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6 md:gap-8 items-start">
          <AirportTransferContactForm
            totalPrice={totalPrice}
            nextQuery={nextQuery}
          />

          <AirportTransferBookingSummaryCard
            fromName={fromName}
            toName={toName}
            vehicle={vehicle}
            dateLabel={dateLabel}
            timeLabel={timeStr}
            detailsHref={detailsHref}
          />
        </div>
      </main>

      <FooterSection />
    </div>
  );
}
