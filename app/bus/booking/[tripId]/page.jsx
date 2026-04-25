import { notFound } from "next/navigation";
import FooterSection from "@/components/FooterSection";
import BusBookingStepHeader from "@/components/bus/BusBookingStepHeader";
import BusBookingClient from "@/components/bus/BusBookingClient";
import BusBookingSummaryCard from "@/components/bus/BusBookingSummaryCard";
import {
  findBusTripById,
  findBusLocationById,
  formatSearchDateLong,
} from "@/components/bus/busSearchResults";

export async function generateMetadata({ params }) {
  const { tripId } = await params;
  return {
    title: `Đặt chỗ vé xe khách ${tripId} | VieGo`,
  };
}

export default async function BusBookingPage({ params, searchParams }) {
  const { tripId: rawTripId } = await params;
  const sp = (await searchParams) || {};
  const tripId = decodeURIComponent(rawTripId);

  const fromId = typeof sp.from === "string" ? sp.from : null;
  const toId = typeof sp.to === "string" ? sp.to : null;
  const departureDate =
    typeof sp.departureDate === "string" ? sp.departureDate : null;
  const seats = Number(sp.seats) || 1;

  const trip = findBusTripById(fromId, toId, tripId);
  if (!trip) notFound();

  const fromLoc = findBusLocationById(fromId);
  const toLoc = findBusLocationById(toId);
  const fromCityName = fromLoc?.name || "Điểm đi";
  const toCityName = toLoc?.name || "Điểm đến";
  const dateLong = formatSearchDateLong(departureDate) || "Ngày khởi hành";

  const nextQueryObj = new URLSearchParams();
  if (fromId) nextQueryObj.set("from", fromId);
  if (toId) nextQueryObj.set("to", toId);
  if (departureDate) nextQueryObj.set("departureDate", departureDate);
  nextQueryObj.set("seats", String(seats));
  const nextQuery = nextQueryObj.toString();

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <BusBookingStepHeader activeStep={1} />

      <main className="flex-1">
        <div className="max-w-375 mx-auto px-6 lg:px-10 py-6 md:py-8">
          <div className="mb-5">
            <h1 className="text-xl md:text-2xl font-extrabold text-slate-900">
              Đặt chỗ của tôi
            </h1>
            <p className="text-sm text-slate-600 mt-1">
              Điền thông tin và xem lại đặt chỗ.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-5">
            <div className="min-w-0">
              <BusBookingClient tripId={tripId} nextQuery={nextQuery} />
            </div>

            <BusBookingSummaryCard
              fromCityName={fromCityName}
              toCityName={toCityName}
              dateLong={dateLong}
              trip={trip}
            />
          </div>
        </div>
      </main>

      <FooterSection />
    </div>
  );
}
