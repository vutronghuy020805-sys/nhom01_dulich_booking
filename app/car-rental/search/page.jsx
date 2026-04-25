import HotelsPageHeader from "@/components/hotels/HotelsPageHeader";
import FooterSection from "@/components/FooterSection";
import CarRentalResultsHero from "@/components/car-rental/CarRentalResultsHero";
import CarRentalVehicleGrid from "@/components/car-rental/CarRentalVehicleGrid";
import { carRentalLocations } from "@/components/car-rental/carRentalLocations";

export const metadata = {
  title: "Kết quả tìm xe | VieGo",
  description:
    "Danh sách xe phù hợp với lịch trình của bạn từ các đối tác uy tín của VieGo.",
};

const VN_DAYS = [
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

function formatVnDateTime(date, time) {
  if (!date) return "";
  const day = VN_DAYS[date.getDay()];
  const dStr = `${day}, ngày ${date.getDate()} tháng ${
    date.getMonth() + 1
  } năm ${date.getFullYear()}`;
  return time ? `${time} ${dStr}` : dStr;
}

function getLocationName(id) {
  const found = carRentalLocations.find((l) => l.id === id);
  return found ? found.name : "Địa điểm bạn đã chọn";
}

export default async function CarRentalSearchResultsPage({ searchParams }) {
  const params = (await searchParams) || {};
  const driverOption = params.driverOption || "self-drive";
  const locationId = params.location || "";
  const startDate = parseIsoDate(params.startDate);
  const endDate = parseIsoDate(params.endDate);
  const startTime = params.startTime || "";
  const endTime = params.endTime || "";

  const locationName = getLocationName(locationId);
  const startLabel = formatVnDateTime(startDate, startTime);
  const endLabel = formatVnDateTime(endDate, endTime);
  const rangeLabel =
    startLabel && endLabel ? `${startLabel} - ${endLabel}` : "";

  const searchQuery = new URLSearchParams(
    Object.entries(params).filter(([, v]) => typeof v === "string" && v)
  ).toString();

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <HotelsPageHeader active="Thuê xe" />

      <main className="flex-1">
        <CarRentalResultsHero
          driverOption={driverOption}
          locationName={locationName}
          rangeLabel={rangeLabel}
        />

        <CarRentalVehicleGrid
          locationId={locationId}
          searchQuery={searchQuery}
        />
      </main>

      <FooterSection />
    </div>
  );
}
