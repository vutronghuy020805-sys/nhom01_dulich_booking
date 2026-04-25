import { Suspense } from "react";
import HotelsPageHeader from "@/components/hotels/HotelsPageHeader";
import Breadcrumb from "@/components/common/Breadcrumb";
import FooterSection from "@/components/FooterSection";
import AirportTransferResultsHero from "@/components/airport-transfer/AirportTransferResultsHero";
import AirportTransferSearchSummary from "@/components/airport-transfer/AirportTransferSearchSummary";
import AirportTransferBenefitsStrip from "@/components/airport-transfer/AirportTransferBenefitsStrip";
import AirportTransferVehicleList from "@/components/airport-transfer/AirportTransferVehicleList";
import { AIRPORTS, DESTINATIONS } from "@/data/airportTransferData";

export const metadata = {
  title: "Kết quả đưa đón sân bay | VieGo",
  description:
    "Chọn xe đưa đón sân bay phù hợp với chuyến đi của bạn trên VieGo.",
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

const VN_DAYS_SHORT = [
  "Chủ Nhật",
  "Thứ 2",
  "Thứ 3",
  "Thứ 4",
  "Thứ 5",
  "Thứ 6",
  "Thứ 7",
];

function parseIsoDate(value) {
  if (!value) return null;
  const [y, m, d] = value.split("-").map(Number);
  if (!y || !m || !d) return null;
  const dt = new Date(y, m - 1, d);
  return Number.isNaN(dt.getTime()) ? null : dt;
}

function formatVnDate(date) {
  if (!date) return "";
  const day = VN_DAYS[date.getDay()];
  return `${day}, ${date.getDate()} thg ${
    date.getMonth() + 1
  } ${date.getFullYear()}`;
}

function formatDateTime(date, time) {
  const dLabel = formatVnDate(date);
  if (!dLabel) return "";
  return time ? `${dLabel} | ${time}` : dLabel;
}

function resolveAirportName(id) {
  const found = AIRPORTS.find((a) => a.id === id);
  if (!found) return "Sân bay bạn đã chọn";
  return found.name.replace(/\s*\([^)]+\)\s*$/, "").trim();
}

function resolveDestinationName(id) {
  const found = DESTINATIONS.find((d) => d.id === id);
  return found ? found.name : "điểm đến đã chọn";
}

export default async function AirportTransferResultsPage({ searchParams }) {
  const params = (await searchParams) || {};
  const fromId = typeof params.from === "string" ? params.from : "";
  const toId = typeof params.to === "string" ? params.to : "";
  const dateStr = typeof params.date === "string" ? params.date : "";
  const timeStr = typeof params.time === "string" ? params.time : "";

  const fromLabel = resolveAirportName(fromId);
  const toLabel = resolveDestinationName(toId);
  const pickupDate = parseIsoDate(dateStr);
  const dateTimeLabel = formatDateTime(pickupDate, timeStr);

  const searchQuery = new URLSearchParams(
    Object.entries({
      from: fromId,
      to: toId,
      date: dateStr,
      time: timeStr,
    }).filter(([, v]) => v)
  ).toString();

  const changeSearchHref = searchQuery
    ? `/airport-transfer?${searchQuery}`
    : "/airport-transfer";

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <HotelsPageHeader active="Đưa đón sân bay" />

      <main className="flex-1">
        <div className="max-w-350 mx-auto px-4 lg:px-10 pt-4 md:pt-5">
          <Breadcrumb
            items={[
              { label: "Đưa đón sân bay", href: "/airport-transfer" },
              { label: `${fromLabel} → ${toLabel}` },
            ]}
          />
        </div>

        <AirportTransferResultsHero />

        <AirportTransferSearchSummary
          fromLabel={fromLabel}
          toLabel={toLabel}
          dateTimeLabel={dateTimeLabel}
          changeSearchHref={changeSearchHref}
        />

        <AirportTransferBenefitsStrip />

        <Suspense fallback={null}>
          <AirportTransferVehicleList searchQuery={searchQuery} />
        </Suspense>
      </main>

      <FooterSection />
    </div>
  );
}
