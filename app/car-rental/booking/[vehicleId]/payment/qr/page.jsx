import Link from "next/link";
import { notFound } from "next/navigation";
import CarRentalBookingStepHeader from "@/components/car-rental/CarRentalBookingStepHeader";
import CarRentalPaymentCountdownBanner from "@/components/car-rental/CarRentalPaymentCountdownBanner";
import CarRentalPaymentQrCard from "@/components/car-rental/CarRentalPaymentQrCard";
import CarRentalPaymentInstructionsCard from "@/components/car-rental/CarRentalPaymentInstructionsCard";
import CarRentalPaymentConfirmationCard from "@/components/car-rental/CarRentalPaymentConfirmationCard";
import CarRentalPaymentSummarySidebar from "@/components/car-rental/CarRentalPaymentSummarySidebar";
import {
  findVehicle,
  resolvePickupArea,
} from "@/data/carRentalVehicles";
import { carRentalLocations } from "@/components/car-rental/carRentalLocations";
import {
  parseIsoDate,
  totalRentalMinutes,
  formatDurationLabel,
  computeBillingUnits,
  computePrice,
  packageLabel as makePackageLabel,
  driverLabel,
  generateCarRentalBookingCode,
} from "@/data/carRentalRental";

export const metadata = {
  title: "Thanh toán QR thuê xe | VieGo",
  description:
    "Quét mã QR để hoàn tất thanh toán đặt xe cùng VieGo.",
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

export default async function CarRentalPaymentQrPage({ params, searchParams }) {
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
  const backHref = `/car-rental/booking/${encodeURIComponent(
    vehicleId
  )}/payment${qs}`;

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <CarRentalBookingStepHeader activeStep={3} />

      <main className="flex-1">
        <div className="max-w-350 mx-auto px-4 lg:px-6 py-6 md:py-8">
          <Link
            href={backHref}
            className="inline-flex items-center gap-1.5 text-slate-700 hover:text-slate-900 font-semibold text-sm mb-4"
          >
            <svg
              viewBox="0 0 24 24"
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
            Trở lại
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_360px] gap-5 lg:gap-6 items-start">
            <div className="min-w-0 space-y-5">
              <CarRentalPaymentCountdownBanner vehicleId={vehicleId} />
              <CarRentalPaymentQrCard
                vehicleId={vehicleId}
                bookingCode={bookingCode}
                subtotal={subtotal}
              />
              <CarRentalPaymentInstructionsCard />
              <CarRentalPaymentConfirmationCard
                vehicleId={vehicleId}
                bookingCode={bookingCode}
                nextQuery={searchQuery}
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
