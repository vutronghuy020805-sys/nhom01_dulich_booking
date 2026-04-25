import { notFound } from "next/navigation";
import CarRentalBookingStepHeader from "@/components/car-rental/CarRentalBookingStepHeader";
import CarRentalPaymentClient from "@/components/car-rental/CarRentalPaymentClient";
import CarRentalPaymentSummarySidebar from "@/components/car-rental/CarRentalPaymentSummarySidebar";
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
  computePrice,
  packageLabel as makePackageLabel,
  driverLabel,
  generateCarRentalBookingCode,
} from "@/data/carRentalRental";

export const metadata = {
  title: "Thanh toán thuê xe | VieGo",
  description:
    "Chọn phương thức thanh toán và hoàn tất đặt xe cùng VieGo.",
};

function getLocationName(id) {
  const found = carRentalLocations.find((l) => l.id === id);
  return found ? found.name : "Địa điểm bạn đã chọn";
}

function formatDateTime(date, time) {
  if (!date) return "—";
  const d = `${date.getDate()} thg ${date.getMonth() + 1}, ${date.getFullYear()}`;
  return time ? `${d} • ${time}` : d;
}

export default async function CarRentalPaymentPage({ params, searchParams }) {
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

  const totalMinutes = totalRentalMinutes(
    startDate,
    startTime,
    endDate,
    endTime
  );
  const rentalDuration = formatDurationLabel(totalMinutes);
  const units = computeBillingUnits(totalMinutes);
  const pkgLabel = makePackageLabel(vehicle, units);
  const subtotal = computePrice(vehicle, units);

  const bookingCode = generateCarRentalBookingCode(vehicleId, sp);

  const summary = {
    serviceLabel: driverLabel(driverOption),
    packageLabel: pkgLabel,
    provider: vehicle.provider,
    locationName,
    pickupPoint,
    dropoffPoint: pickupPoint,
    rentalDuration,
    vehicleName: vehicle.name,
  };

  const startDateTimeLabel = formatDateTime(startDate, startTime);
  const endDateTimeLabel = formatDateTime(endDate, endTime);

  const searchQuery = new URLSearchParams(
    Object.entries(sp).filter(([, v]) => typeof v === "string" && v)
  ).toString();
  const qs = searchQuery ? `?${searchQuery}` : "";
  const qrHref = `/car-rental/booking/${encodeURIComponent(
    vehicleId
  )}/payment/qr${qs}`;

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <CarRentalBookingStepHeader activeStep={3} />

      <main className="flex-1">
        <div className="max-w-350 mx-auto px-4 lg:px-6 py-6 md:py-8">
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_360px] gap-5 lg:gap-6 items-start">
            <div className="min-w-0">
              <CarRentalPaymentClient
                vehicleId={vehicleId}
                searchQuery={searchQuery}
                packageLabel={pkgLabel}
                subtotal={subtotal}
                qrHref={qrHref}
              />
            </div>

            <CarRentalPaymentSummarySidebar
              vehicleId={vehicleId}
              bookingCode={bookingCode}
              summary={summary}
              startDateTimeLabel={startDateTimeLabel}
              endDateTimeLabel={endDateTimeLabel}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
