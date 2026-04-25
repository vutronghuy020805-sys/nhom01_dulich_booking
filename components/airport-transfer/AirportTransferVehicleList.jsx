"use client";

import { useMemo } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { airportTransferVehicles } from "@/data/airportTransferVehicles";
import TransferVehicleCard from "./TransferVehicleCard";
import FilterSidebar from "@/components/filters/FilterSidebar";
import FilterSection from "@/components/filters/FilterSection";
import CategoryFilter from "@/components/filters/CategoryFilter";
import PriceFilter from "@/components/filters/PriceFilter";
import RatingFilter from "@/components/filters/RatingFilter";
import SortDropdown from "@/components/filters/SortDropdown";
import ActiveFilterChips from "@/components/filters/ActiveFilterChips";
import Pagination from "@/components/filters/Pagination";
import EmptyResultsState from "@/components/filters/EmptyResultsState";
import {
  applyCategoryFilter,
  applyPriceFilter,
  applyRatingFilter,
  applySort,
  paginate,
  resolvePriceRange,
  resolveMinRating,
  PRICE_RANGES,
  RATING_OPTIONS,
} from "@/lib/listing";

const PAGE_SIZE = 5;

const TIER_OPTIONS = [
  { id: "Standard", label: "Standard" },
  { id: "Comfort", label: "Comfort" },
  { id: "Family", label: "Family" },
  { id: "Eco", label: "Eco" },
  { id: "Premium", label: "Premium" },
  { id: "Luxury", label: "Luxury" },
  { id: "Group", label: "Group" },
];

const SORT_OPTIONS = [
  { value: "popular", label: "Phổ biến nhất" },
  { value: "price_asc", label: "Giá thấp đến cao" },
  { value: "price_desc", label: "Giá cao đến thấp" },
  { value: "rating_desc", label: "Đánh giá cao nhất" },
];

const SORT_MAP = {
  popular: (a, b) => (b.rating ?? 0) - (a.rating ?? 0) || a.price - b.price,
  price_asc: (a, b) => a.price - b.price,
  price_desc: (a, b) => b.price - a.price,
  rating_desc: (a, b) => (b.rating ?? 0) - (a.rating ?? 0),
};

const FILTER_KEYS = ["tier", "priceRange", "rating", "sort", "page"];

export default function AirportTransferVehicleList({ searchQuery }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const tiers = (params.get("tier") || "").split(",").filter(Boolean);
  const priceRange = params.get("priceRange") || "";
  const rating = params.get("rating") || "";
  const sort = params.get("sort") || "popular";
  const page = Math.max(1, parseInt(params.get("page") || "1", 10));

  const setParam = (updates) => {
    const next = new URLSearchParams(params.toString());
    Object.entries(updates).forEach(([key, value]) => {
      if (value == null || value === "" || (Array.isArray(value) && value.length === 0)) {
        next.delete(key);
      } else {
        next.set(key, Array.isArray(value) ? value.join(",") : String(value));
      }
    });
    router.replace(`${pathname}?${next.toString()}`, { scroll: false });
  };

  const handleReset = () => {
    const next = new URLSearchParams(params.toString());
    FILTER_KEYS.forEach((k) => next.delete(k));
    router.replace(`${pathname}?${next.toString()}`, { scroll: false });
  };

  const filtered = useMemo(() => {
    let list = airportTransferVehicles;
    list = applyCategoryFilter(list, "tier", tiers);
    list = applyPriceFilter(list, "price", resolvePriceRange(priceRange));
    list = applyRatingFilter(list, "rating", resolveMinRating(rating));
    list = applySort(list, sort, SORT_MAP);
    return list;
  }, [tiers, priceRange, rating, sort]);

  const { pageItems, page: currentPage, totalPages, total } = paginate(
    filtered,
    page,
    PAGE_SIZE
  );

  const chips = [];
  tiers.forEach((t) => {
    chips.push({
      key: `tier-${t}`,
      label: t,
      onRemove: () => setParam({ tier: tiers.filter((x) => x !== t), page: null }),
    });
  });
  if (priceRange) {
    const r = PRICE_RANGES.find((x) => x.id === priceRange);
    if (r)
      chips.push({
        key: "price",
        label: r.label,
        onRemove: () => setParam({ priceRange: "", page: null }),
      });
  }
  if (rating) {
    const r = RATING_OPTIONS.find((x) => x.id === rating);
    if (r)
      chips.push({
        key: "rating",
        label: r.label,
        onRemove: () => setParam({ rating: "", page: null }),
      });
  }

  return (
    <section className="max-w-350 mx-auto px-4 lg:px-10 py-8 md:py-10">
      <div className="grid grid-cols-1 lg:grid-cols-[280px_minmax(0,1fr)] gap-6 md:gap-8 items-start">
        <FilterSidebar onReset={chips.length > 0 ? handleReset : null}>
          <FilterSection title="Loại xe">
            <CategoryFilter
              options={TIER_OPTIONS}
              selected={tiers}
              onChange={(next) => setParam({ tier: next, page: null })}
            />
          </FilterSection>
          <FilterSection title="Khoảng giá">
            <PriceFilter
              value={priceRange}
              onChange={(next) => setParam({ priceRange: next, page: null })}
            />
          </FilterSection>
          <FilterSection title="Đánh giá">
            <RatingFilter
              value={rating}
              onChange={(next) => setParam({ rating: next, page: null })}
            />
          </FilterSection>
        </FilterSidebar>

        <div>
          <div className="flex flex-wrap items-end justify-between gap-3 mb-5">
            <div>
              <h2 className="text-lg md:text-xl font-bold text-slate-900">
                Chọn xe phù hợp cho chuyến đi
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                {total} lựa chọn phù hợp
              </p>
            </div>
            <SortDropdown
              value={sort}
              onChange={(next) => setParam({ sort: next, page: null })}
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
            <div className="flex flex-col gap-4 md:gap-5">
              {pageItems.map((vehicle) => (
                <TransferVehicleCard
                  key={vehicle.id}
                  vehicle={vehicle}
                  bookingHref={`/airport-transfer/booking?vehicle=${encodeURIComponent(
                    vehicle.id
                  )}${searchQuery ? `&${searchQuery}` : ""}`}
                />
              ))}
            </div>
          )}

          <Pagination
            page={currentPage}
            totalPages={totalPages}
            onPageChange={(next) => setParam({ page: next })}
          />
        </div>
      </div>
    </section>
  );
}
