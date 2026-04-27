"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import HotelsPageHeader from "@/components/hotels/HotelsPageHeader";
import FooterSection from "@/components/FooterSection";
import CarRentalResultsHero from "./CarRentalResultsHero";
import CarRentalVehicleGrid from "./CarRentalVehicleGrid";
import { carRentalLocations } from "./carRentalLocations";

function parseIsoDate(value) {
  if (!value) return null;
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!m) return null;
  const d = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
  return Number.isNaN(d.getTime()) ? null : d;
}

function fmtVnDate(d) {
  return `${d.getDate()} thg ${d.getMonth() + 1} ${d.getFullYear()}`;
}

function buildRangeLabel(startDate, startTime, endDate, endTime) {
  const start = parseIsoDate(startDate);
  const end = parseIsoDate(endDate);
  if (!start || !end) return "Chọn ngày thuê xe";
  const startPart = `${fmtVnDate(start)}${startTime ? `, ${startTime}` : ""}`;
  const endPart = `${fmtVnDate(end)}${endTime ? `, ${endTime}` : ""}`;
  return `${startPart} → ${endPart}`;
}

export default function CarRentalSearchPageClient() {
  const sp = useSearchParams();

  const driverOption = sp.get("driverOption") || "self-drive";
  const locationId = sp.get("location") || "";
  const startDate = sp.get("startDate") || "";
  const startTime = sp.get("startTime") || "";
  const endDate = sp.get("endDate") || "";
  const endTime = sp.get("endTime") || "";

  const searchQuery = sp.toString();

  const location = useMemo(
    () => carRentalLocations.find((l) => l.id === locationId) || null,
    [locationId]
  );
  const locationName = location?.name || "Tất cả vị trí cho thuê";
  const rangeLabel = buildRangeLabel(startDate, startTime, endDate, endTime);

  return (
    <div className="flex flex-col min-h-screen bg-white">
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
