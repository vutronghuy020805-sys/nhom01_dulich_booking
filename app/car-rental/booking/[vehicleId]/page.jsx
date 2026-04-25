import { notFound } from "next/navigation";
import CarRentalBookingStepHeader from "@/components/car-rental/CarRentalBookingStepHeader";
import CarRentalBookingClient from "@/components/car-rental/CarRentalBookingClient";
import CarRentalBookingSummaryCard from "@/components/car-rental/CarRentalBookingSummaryCard";
import {
  findVehicle,
  resolvePickupArea,
} from "@/data/carRentalVehicles";
import { carRentalLocations } from "@/components/car-rental/carRentalLocations";
import {
  parseIsoDate,
  formatVnDate,
  totalRentalMinutes,
  formatDurationLabel,
  computeBillingUnits,
  packageLabel as makePackageLabel,
  driverLabel,
} from "@/data/carRentalRental";

export const metadata = {
  title: "Đặt chỗ thuê xe | VieGo",
  description:
    "Điền thông tin liên hệ và thông tin hành khách để hoàn tất đặt chỗ thuê xe cùng VieGo.",
};

function getLocationName(id) {
  const found = carRentalLocations.find((l) => l.id === id);
  return found ? found.name : "Địa điểm bạn đã chọn";
}

export default async function CarRentalBookingPage({ params, searchParams }) {
  const { vehicleId } = await params;
  const sp = (await searchParams) || {};

  const vehicle = findVehicle(vehicleId);
  if (!vehicle) notFound();

  const driverOption = sp.driverOption || "self-drive";
  const locationId = sp.location || "";
  const startDate = parseIsoDate(sp.startDate);
  const endDate = parseIsoDate(sp.endDate);
  const startTime = sp.startTime || "";
  const endTime = sp.endTime || "";

  const locationName = getLocationName(locationId);
  const pickupArea = resolvePickupArea(locationId, vehicle.pickupArea);
  const pickupPoint = locationId
    ? `${pickupArea} — ${locationName}`
    : pickupArea;

  const rentalDateRange = startDate && endDate
    ? `${formatVnDate(startDate)} - ${formatVnDate(endDate)}`
    : "Chưa chọn ngày";

  const totalMinutes = totalRentalMinutes(
    startDate,
    startTime,
    endDate,
    endTime
  );
  const rentalDuration = formatDurationLabel(totalMinutes);
  const units = computeBillingUnits(totalMinutes);
  const pkgLabel = makePackageLabel(vehicle, units);

  const summary = {
    serviceLabel: driverLabel(driverOption),
    vehicleName: `${pkgLabel} — ${vehicle.name}`,
    provider: vehicle.provider,
    locationName,
    rentalDateRange,
    pickupPoint,
    rentalDuration,
    pickupTime: startTime || "—",
    dropoffPoint: pickupPoint,
  };

  const searchQuery = new URLSearchParams(
    Object.entries(sp).filter(([, v]) => typeof v === "string" && v)
  ).toString();

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <CarRentalBookingStepHeader activeStep={1} />

      <main className="flex-1">
        <div className="max-w-350 mx-auto px-4 lg:px-6 py-8 md:py-10">
          <div className="mb-6 md:mb-8">
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900">
              Đặt chỗ của tôi
            </h1>
            <p className="text-sm md:text-base text-slate-500 mt-1">
              Điền thông tin và xem lại đặt chỗ.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_360px] gap-6 lg:gap-8 items-start">
            <CarRentalBookingClient
              vehicleId={vehicleId}
              searchQuery={searchQuery}
            />

            <div className="lg:sticky lg:top-24">
              <CarRentalBookingSummaryCard summary={summary} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
