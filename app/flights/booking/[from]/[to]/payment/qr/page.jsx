import { Suspense } from "react";
import { CITIES } from "@/components/flights/flightCities";
import FlightQrPageClient from "@/components/flights/FlightQrPageClient";

export function generateStaticParams() {
  const slugs = Object.keys(CITIES);
  const params = [];
  for (const from of slugs) {
    for (const to of slugs) {
      if (from !== to) params.push({ from, to });
    }
  }
  return params;
}

export const dynamicParams = false;

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50" />}>
      <FlightQrPageClient />
    </Suspense>
  );
}
