"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import BusSearchResultsHeader from "./BusSearchResultsHeader";
import BusResultsClient from "./BusResultsClient";
import { formatSearchDateLong } from "./busSearchResults";

const DEFAULT_DATE_ISO = "2026-04-16";

export default function BusSearchPageClient({
  fromLoc,
  toLoc,
  bestResults,
  allResults,
}) {
  const searchParams = useSearchParams();
  const departureDate =
    searchParams?.get("departureDate") || DEFAULT_DATE_ISO;
  const returnDate = searchParams?.get("returnDate") || "";
  const seatsParam = Number(searchParams?.get("seats"));
  const seats = Number.isFinite(seatsParam) && seatsParam > 0 ? seatsParam : 1;

  const bookingQuery = useMemo(() => {
    const p = new URLSearchParams();
    p.set("from", fromLoc.id);
    p.set("to", toLoc.id);
    p.set("departureDate", departureDate);
    if (returnDate) p.set("returnDate", returnDate);
    p.set("seats", String(seats));
    return p.toString();
  }, [fromLoc.id, toLoc.id, departureDate, returnDate, seats]);

  const attachBookingHref = (trip) => ({
    ...trip,
    bookingHref: `/bus/booking/${encodeURIComponent(trip.id)}?${bookingQuery}`,
  });

  const enrichedBest = bestResults.map(attachBookingHref);
  const enrichedAll = allResults.map(attachBookingHref);

  const changeSearchHref = `/bus?${bookingQuery}`;

  return (
    <div className="flex flex-col gap-5">
      <BusSearchResultsHeader
        fromCityName={fromLoc.name}
        toCityName={toLoc.name}
        dateLong={formatSearchDateLong(departureDate) || departureDate}
        seats={seats}
        changeSearchHref={changeSearchHref}
      />
      <BusResultsClient
        bestResults={enrichedBest}
        allResults={enrichedAll}
      />
    </div>
  );
}
