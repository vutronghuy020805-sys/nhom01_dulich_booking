import { notFound } from "next/navigation";
import HotelsPageHeader from "@/components/hotels/HotelsPageHeader";
import Breadcrumb from "@/components/common/Breadcrumb";
import FooterSection from "@/components/FooterSection";
import FlightResultsList from "@/components/flights/FlightResultsList";
import { findCityBySlug } from "@/components/flights/flightCities";
import {
  generateFlightSearchData,
  generateDateTabs,
  toISODate,
} from "@/components/flights/flightResultsData";

export async function generateMetadata({ params }) {
  const { from, to } = await params;
  const fromCity = findCityBySlug(from);
  const toCity = findCityBySlug(to);
  if (!fromCity || !toCity) {
    return { title: "Kết quả chuyến bay | VieGo" };
  }
  return {
    title: `${fromCity.displayName} (${fromCity.code}) → ${toCity.displayName} (${toCity.code}) | VieGo`,
    description: `Tìm và đặt vé máy bay từ ${fromCity.displayName} đến ${toCity.displayName} với giá tốt trên VieGo.`,
  };
}

export default async function FlightSearchPage({ params, searchParams }) {
  const { from, to } = await params;
  const search = (await searchParams) || {};

  const fromCity = findCityBySlug(from);
  const toCity = findCityBySlug(to);
  if (!fromCity || !toCity) {
    notFound();
  }

  const rawPrice = Number(search.price);
  const basePrice = Number.isFinite(rawPrice) && rawPrice > 0 ? rawPrice : 1099000;
  const dateParam =
    typeof search.date === "string" && search.date
      ? search.date
      : toISODate(new Date());

  const routeKey = `${fromCity.slug}-${toCity.slug}`;
  const { featured, flights } = generateFlightSearchData(
    fromCity.slug,
    toCity.slug,
    basePrice
  );
  const dateTabs = generateDateTabs(dateParam, basePrice, routeKey);

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <HotelsPageHeader active="Vé máy bay" />

      <main className="flex-1">
        <div className="max-w-375 mx-auto px-6 lg:px-10 pt-4 md:pt-5">
          <Breadcrumb
            items={[
              { label: "Vé máy bay", href: "/flights" },
              {
                label: `${fromCity.displayName} (${fromCity.code}) → ${toCity.displayName} (${toCity.code})`,
              },
            ]}
          />
        </div>

        <FlightResultsList
          fromCity={fromCity}
          toCity={toCity}
          basePrice={basePrice}
          dateTabs={dateTabs}
          initialDateKey={dateParam}
          featured={featured}
          flights={flights}
        />
      </main>

      <FooterSection />
    </div>
  );
}
