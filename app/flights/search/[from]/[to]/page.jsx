import { notFound } from "next/navigation";
import HotelsPageHeader from "@/components/hotels/HotelsPageHeader";
import Breadcrumb from "@/components/common/Breadcrumb";
import FooterSection from "@/components/FooterSection";
import FlightResultsList from "@/components/flights/FlightResultsList";
import { CITIES, findCityBySlug } from "@/components/flights/flightCities";
import {
  generateFlightSearchData,
  generateDateTabs,
  toISODate,
} from "@/components/flights/flightResultsData";

const BASE_PRICE = 1500000;

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

export async function generateMetadata({ params }) {
  const { from, to } = await params;
  const fromCity = findCityBySlug(from);
  const toCity = findCityBySlug(to);
  if (!fromCity || !toCity) {
    return { title: "Không tìm thấy chuyến bay | VieGo" };
  }
  return {
    title: `Vé máy bay ${fromCity.displayName} → ${toCity.displayName} | VieGo`,
    description: `Tìm và đặt vé máy bay từ ${fromCity.displayName} đến ${toCity.displayName} trên VieGo.`,
  };
}

export default async function FlightSearchPage({ params }) {
  const { from, to } = await params;
  const fromCity = findCityBySlug(from);
  const toCity = findCityBySlug(to);
  if (!fromCity || !toCity || fromCity.slug === toCity.slug) notFound();

  const initialIso = toISODate(new Date(2026, 3, 16));
  const routeKey = `${fromCity.slug}-${toCity.slug}`;
  const dateTabs = generateDateTabs(initialIso, BASE_PRICE, routeKey);
  const initialDateKey =
    dateTabs.find((t) => t.key === initialIso)?.key ||
    dateTabs[Math.min(2, dateTabs.length - 1)].key;
  const { featured, flights } = generateFlightSearchData(
    fromCity.slug,
    toCity.slug,
    BASE_PRICE
  );

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <HotelsPageHeader active="Vé máy bay" />

      <main className="flex-1">
        <div className="max-w-375 mx-auto px-6 lg:px-10 pt-4 md:pt-5">
          <Breadcrumb
            items={[
              { label: "Vé máy bay", href: "/flights" },
              { label: `${fromCity.displayName} → ${toCity.displayName}` },
            ]}
          />
        </div>

        <FlightResultsList
          fromCity={fromCity}
          toCity={toCity}
          basePrice={BASE_PRICE}
          dateTabs={dateTabs}
          initialDateKey={initialDateKey}
          featured={featured}
          flights={flights}
        />
      </main>

      <FooterSection />
    </div>
  );
}
