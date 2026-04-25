import HotelsPageHeader from "@/components/hotels/HotelsPageHeader";
import Breadcrumb from "@/components/common/Breadcrumb";
import FooterSection from "@/components/FooterSection";
import BusSearchResultsHeader from "@/components/bus/BusSearchResultsHeader";
import BusResultsClient from "@/components/bus/BusResultsClient";
import {
  generateBusSearchResults,
  findBusLocationById,
  formatSearchDateLong,
} from "@/components/bus/busSearchResults";

export const metadata = {
  title: "Kết quả tìm kiếm vé xe khách | VieGo",
  description: "Kết quả tìm kiếm vé xe khách trên VieGo.",
};

export default async function BusSearchPage({ searchParams }) {
  const sp = (await searchParams) || {};
  const fromId = typeof sp.from === "string" ? sp.from : null;
  const toId = typeof sp.to === "string" ? sp.to : null;
  const departureDate =
    typeof sp.departureDate === "string" ? sp.departureDate : null;
  const returnDate =
    typeof sp.returnDate === "string" ? sp.returnDate : null;
  const seats = Number(sp.seats) || 1;

  const fromLoc = findBusLocationById(fromId);
  const toLoc = findBusLocationById(toId);
  const fromCityName = fromLoc?.name || "Điểm đi";
  const toCityName = toLoc?.name || "Điểm đến";
  const dateLong = formatSearchDateLong(departureDate) || "Ngày khởi hành";

  const { bestResults, allResults } = generateBusSearchResults(fromId, toId);

  const bookingQuery = new URLSearchParams();
  if (fromId) bookingQuery.set("from", fromId);
  if (toId) bookingQuery.set("to", toId);
  if (departureDate) bookingQuery.set("departureDate", departureDate);
  bookingQuery.set("seats", String(seats));
  const enrich = (trip) => ({
    ...trip,
    bookingHref: `/bus/booking/${encodeURIComponent(trip.id)}?${bookingQuery.toString()}`,
  });
  const bestResultsEnriched = bestResults.map(enrich);
  const allResultsEnriched = allResults.map(enrich);

  const backQuery = new URLSearchParams();
  if (fromId) backQuery.set("from", fromId);
  if (toId) backQuery.set("to", toId);
  if (departureDate) backQuery.set("departureDate", departureDate);
  if (returnDate) backQuery.set("returnDate", returnDate);
  backQuery.set("seats", String(seats));
  const changeSearchHref = `/bus?${backQuery.toString()}`;

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <HotelsPageHeader active="Vé xe khách" />

      <main className="flex-1">
        <div className="max-w-375 mx-auto px-6 lg:px-10 py-6 md:py-8 space-y-5">
          <Breadcrumb
            items={[
              { label: "Vé xe khách", href: "/bus" },
              { label: `${fromCityName} → ${toCityName}` },
            ]}
          />
          <BusSearchResultsHeader
            fromCityName={fromCityName}
            toCityName={toCityName}
            dateLong={dateLong}
            seats={seats}
            changeSearchHref={changeSearchHref}
          />

          <BusResultsClient
            bestResults={bestResultsEnriched}
            allResults={allResultsEnriched}
          />
        </div>
      </main>

      <FooterSection />
    </div>
  );
}
