import { notFound } from "next/navigation";
import CarRentalBookingStepHeader from "@/components/car-rental/CarRentalBookingStepHeader";
import CarRentalBookingSuccessBanner from "@/components/car-rental/CarRentalBookingSuccessBanner";
import CarRentalETicketCard from "@/components/car-rental/CarRentalETicketCard";
import CarRentalPickupNotesCard from "@/components/car-rental/CarRentalPickupNotesCard";
import CarRentalTicketActions from "@/components/car-rental/CarRentalTicketActions";
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
  generateCarRentalTicketCode,
} from "@/data/carRentalRental";

export const metadata = {
  title: "Đặt thuê xe thành công | VieGo",
  description:
    "Xác nhận đặt thuê xe thành công cùng VieGo — xem mã đặt chỗ và vé điện tử.",
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

export default async function CarRentalConfirmationPage({ params, searchParams }) {
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
  const ticketCode = generateCarRentalTicketCode(vehicleId, sp);

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

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <CarRentalBookingStepHeader activeStep={4} />

      <main className="flex-1">
        <div className="max-w-5xl mx-auto px-4 lg:px-10 py-6 md:py-8 space-y-6">
          <CarRentalBookingSuccessBanner
            vehicleId={vehicleId}
            bookingCode={bookingCode}
            ticketCode={ticketCode}
          />

          <CarRentalETicketCard
            vehicleId={vehicleId}
            bookingCode={bookingCode}
            ticketCode={ticketCode}
            summary={summary}
            startDateTimeLabel={startDateTimeLabel}
            endDateTimeLabel={endDateTimeLabel}
            subtotal={subtotal}
          />

          <CarRentalPickupNotesCard driverOption={driverOption} />

          <CarRentalTicketActions ticketCode={ticketCode} />
        </div>
      </main>
    </div>
  );
}
