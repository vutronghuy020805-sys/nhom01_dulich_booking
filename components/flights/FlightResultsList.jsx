"use client";

import { useMemo, useState } from "react";
import FlightSearchHero from "./FlightSearchHero";
import FeaturedPromoFlightCard from "./FeaturedPromoFlightCard";
import StandardFlightResultCard from "./StandardFlightResultCard";
import FilterSidebar from "@/components/filters/FilterSidebar";
import FilterSection from "@/components/filters/FilterSection";
import CategoryFilter from "@/components/filters/CategoryFilter";
import PriceFilter from "@/components/filters/PriceFilter";
import SortDropdown from "@/components/filters/SortDropdown";
import ActiveFilterChips from "@/components/filters/ActiveFilterChips";
import Pagination from "@/components/filters/Pagination";
import EmptyResultsState from "@/components/filters/EmptyResultsState";
import {
  applyCategoryFilter,
  applyPriceFilter,
  applySort,
  paginate,
} from "@/lib/listing";

const PAGE_SIZE = 6;

const FLIGHT_PRICE_RANGES = [
  { id: "under-1m", label: "Dưới 1.000.000 VND", min: null, max: 1000000 },
  { id: "1m-2m", label: "1.000.000 – 2.000.000 VND", min: 1000000, max: 2000000 },
  { id: "2m-3.5m", label: "2.000.000 – 3.500.000 VND", min: 2000000, max: 3500000 },
  { id: "over-3.5m", label: "Trên 3.500.000 VND", min: 3500000, max: null },
];

function resolveFlightPriceRange(id) {
  if (!id) return { min: null, max: null };
  const r = FLIGHT_PRICE_RANGES.find((x) => x.id === id);
  return r ? { min: r.min, max: r.max } : { min: null, max: null };
}

const TIME_OPTIONS = [
  { id: "morning", label: "Sáng sớm (00:00-06:00)" },
  { id: "day", label: "Buổi sáng (06:00-12:00)" },
  { id: "afternoon", label: "Buổi chiều (12:00-18:00)" },
  { id: "night", label: "Buổi tối (18:00-24:00)" },
];

function matchesTime(dep, bucket) {
  if (bucket === "morning") return dep >= 0 && dep < 360;
  if (bucket === "day") return dep >= 360 && dep < 720;
  if (bucket === "afternoon") return dep >= 720 && dep < 1080;
  if (bucket === "night") return dep >= 1080 && dep < 1440;
  return true;
}

const SORT_OPTIONS = [
  { value: "price_asc", label: "Giá thấp nhất" },
  { value: "price_desc", label: "Giá cao đến thấp" },
  { value: "duration", label: "Thời gian ngắn nhất" },
  { value: "earliest", label: "Khởi hành sớm nhất" },
];

const SORT_MAP = {
  price_asc: (a, b) => a.price - b.price,
  price_desc: (a, b) => b.price - a.price,
  duration: (a, b) => a.durationMin - b.durationMin,
  earliest: (a, b) => a.departureMin - b.departureMin,
};

function formatDuration(mins) {
  if (!Number.isFinite(mins)) return "—";
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return `${h}h${String(m).padStart(2, "0")}p`;
}

export default function FlightResultsList({
  fromCity,
  toCity,
  basePrice,
  dateTabs,
  initialDateKey,
  featured,
  flights,
}) {
  const [activeDateKey, setActiveDateKey] = useState(initialDateKey);
  const [airlines, setAirlines] = useState([]);
  const [fareClasses, setFareClasses] = useState([]);
  const [timeBuckets, setTimeBuckets] = useState([]);
  const [priceRange, setPriceRange] = useState("");
  const [sort, setSort] = useState("price_asc");
  const [page, setPage] = useState(1);

  const AIRLINE_OPTIONS = useMemo(() => {
    const set = new Set(flights.map((f) => f.airline).filter(Boolean));
    return Array.from(set).map((v) => ({ id: v, label: v }));
  }, [flights]);

  const FARE_OPTIONS = useMemo(() => {
    const set = new Set(flights.map((f) => f.fareClass).filter(Boolean));
    return Array.from(set).map((v) => ({ id: v, label: v }));
  }, [flights]);

  const buildBookingHref = (flightId) => {
    const query = new URLSearchParams();
    query.set("flightId", flightId);
    query.set("price", String(basePrice));
    if (activeDateKey) query.set("date", activeDateKey);
    return `/flights/booking/${fromCity.slug}/${toCity.slug}?${query.toString()}`;
  };

  const activeDate =
    dateTabs.find((d) => d.key === activeDateKey) || dateTabs[2] || dateTabs[0];

  const filtered = useMemo(() => {
    let list = flights;
    list = applyCategoryFilter(list, "airline", airlines);
    list = applyCategoryFilter(list, "fareClass", fareClasses);
    if (timeBuckets.length > 0) {
      list = list.filter((f) =>
        timeBuckets.some((b) => matchesTime(f.departureMin, b))
      );
    }
    list = applyPriceFilter(list, "price", resolveFlightPriceRange(priceRange));
    list = applySort(list, sort, SORT_MAP);
    return list;
  }, [flights, airlines, fareClasses, timeBuckets, priceRange, sort]);

  const { pageItems, page: currentPage, totalPages, total } = paginate(
    filtered,
    page,
    PAGE_SIZE
  );

  const handleReset = () => {
    setAirlines([]);
    setFareClasses([]);
    setTimeBuckets([]);
    setPriceRange("");
    setPage(1);
  };

  const lowestPrice = useMemo(
    () => flights.reduce((min, f) => Math.min(min, f.price), Infinity),
    [flights]
  );
  const shortestDurationMin = useMemo(
    () => flights.reduce((min, f) => Math.min(min, f.durationMin), Infinity),
    [flights]
  );

  const chips = [];
  airlines.forEach((v) =>
    chips.push({
      key: `a-${v}`,
      label: v,
      onRemove: () => {
        setAirlines(airlines.filter((x) => x !== v));
        setPage(1);
      },
    })
  );
  fareClasses.forEach((v) =>
    chips.push({
      key: `f-${v}`,
      label: v,
      onRemove: () => {
        setFareClasses(fareClasses.filter((x) => x !== v));
        setPage(1);
      },
    })
  );
  timeBuckets.forEach((v) => {
    const t = TIME_OPTIONS.find((x) => x.id === v);
    if (t)
      chips.push({
        key: `t-${v}`,
        label: t.label,
        onRemove: () => {
          setTimeBuckets(timeBuckets.filter((x) => x !== v));
          setPage(1);
        },
      });
  });
  if (priceRange) {
    const r = FLIGHT_PRICE_RANGES.find((x) => x.id === priceRange);
    if (r)
      chips.push({
        key: "p",
        label: r.label,
        onRemove: () => {
          setPriceRange("");
          setPage(1);
        },
      });
  }

  return (
    <>
      <FlightSearchHero
        fromCity={fromCity}
        toCity={toCity}
        dateTabs={dateTabs}
        activeDateKey={activeDateKey}
        activeDate={activeDate}
        onSelectDate={setActiveDateKey}
      />

      <section className="max-w-375 mx-auto px-6 lg:px-10 pt-6 pb-4">
        <FeaturedPromoFlightCard
          flight={featured}
          fromCode={fromCity.code}
          toCode={toCity.code}
          bookingHref={buildBookingHref(featured.id)}
        />
      </section>

      <section className="max-w-375 mx-auto px-6 lg:px-10 pt-4 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_minmax(0,1fr)] gap-6 md:gap-8 items-start">
          <FilterSidebar onReset={chips.length > 0 ? handleReset : null}>
            <FilterSection title="Hãng hàng không">
              <CategoryFilter
                options={AIRLINE_OPTIONS}
                selected={airlines}
                onChange={(next) => {
                  setAirlines(next);
                  setPage(1);
                }}
              />
            </FilterSection>
            <FilterSection title="Giờ khởi hành">
              <CategoryFilter
                options={TIME_OPTIONS}
                selected={timeBuckets}
                onChange={(next) => {
                  setTimeBuckets(next);
                  setPage(1);
                }}
              />
            </FilterSection>
            <FilterSection title="Hạng vé">
              <CategoryFilter
                options={FARE_OPTIONS}
                selected={fareClasses}
                onChange={(next) => {
                  setFareClasses(next);
                  setPage(1);
                }}
              />
            </FilterSection>
            <FilterSection title="Khoảng giá">
              <PriceFilter
                value={priceRange}
                onChange={(next) => {
                  setPriceRange(next);
                  setPage(1);
                }}
                ranges={FLIGHT_PRICE_RANGES}
              />
            </FilterSection>
          </FilterSidebar>

          <div>
            <div className="flex flex-wrap items-end justify-between gap-3 mb-4">
              <div>
                <h2 className="text-sm md:text-base font-bold text-slate-900">
                  Tất cả các chuyến bay
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  {total} chuyến phù hợp · Giá thấp nhất{" "}
                  {Number.isFinite(lowestPrice)
                    ? lowestPrice.toLocaleString("vi-VN") + " VND"
                    : "—"}{" "}
                  · Ngắn nhất {formatDuration(shortestDurationMin)}
                </p>
              </div>
              <SortDropdown
                value={sort}
                onChange={(next) => {
                  setSort(next);
                  setPage(1);
                }}
                options={SORT_OPTIONS}
              />
            </div>

            {chips.length > 0 ? (
              <div className="mb-4">
                <ActiveFilterChips chips={chips} onReset={handleReset} />
              </div>
            ) : null}

            {pageItems.length === 0 ? (
              <EmptyResultsState />
            ) : (
              <div className="flex flex-col gap-3">
                {pageItems.map((flight) => (
                  <StandardFlightResultCard
                    key={flight.id}
                    flight={flight}
                    fromCode={fromCity.code}
                    toCode={toCity.code}
                    bookingHref={buildBookingHref(flight.id)}
                  />
                ))}
              </div>
            )}

            <Pagination
              page={currentPage}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          </div>
        </div>
      </section>
    </>
  );
}
