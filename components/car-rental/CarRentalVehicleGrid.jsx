"use client";

import { useMemo, useState } from "react";
import {
  carRentalVehicles,
  resolvePickupLabel,
} from "@/data/carRentalVehicles";
import CarRentalVehicleCard from "./CarRentalVehicleCard";
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

const PAGE_SIZE = 6;

const CATEGORY_OPTIONS = Array.from(
  new Set(carRentalVehicles.map((v) => v.category))
).map((label) => ({ id: label, label }));

const SORT_OPTIONS = [
  { value: "match", label: "Xe phù hợp nhất" },
  { value: "price_asc", label: "Giá thấp đến cao" },
  { value: "price_desc", label: "Giá cao đến thấp" },
  { value: "rating_desc", label: "Đánh giá cao nhất" },
];

const SORT_MAP = {
  match: (a, b) => (b.rating ?? 0) - (a.rating ?? 0) || a.pricePerDay - b.pricePerDay,
  price_asc: (a, b) => a.pricePerDay - b.pricePerDay,
  price_desc: (a, b) => b.pricePerDay - a.pricePerDay,
  rating_desc: (a, b) => (b.rating ?? 0) - (a.rating ?? 0),
};

export default function CarRentalVehicleGrid({ locationId, searchQuery }) {
  const [categories, setCategories] = useState([]);
  const [priceRange, setPriceRange] = useState("");
  const [rating, setRating] = useState("");
  const [sort, setSort] = useState("match");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    let list = carRentalVehicles;
    list = applyCategoryFilter(list, "category", categories);
    list = applyPriceFilter(list, "pricePerDay", resolvePriceRange(priceRange));
    list = applyRatingFilter(list, "rating", resolveMinRating(rating));
    list = applySort(list, sort, SORT_MAP);
    return list;
  }, [categories, priceRange, rating, sort]);

  const { pageItems, page: currentPage, totalPages, total } = paginate(
    filtered,
    page,
    PAGE_SIZE
  );

  const handleReset = () => {
    setCategories([]);
    setPriceRange("");
    setRating("");
    setPage(1);
  };

  const chips = [];
  categories.forEach((c) => {
    chips.push({
      key: `cat-${c}`,
      label: c,
      onRemove: () => {
        setCategories(categories.filter((x) => x !== c));
        setPage(1);
      },
    });
  });
  if (priceRange) {
    const r = PRICE_RANGES.find((x) => x.id === priceRange);
    if (r)
      chips.push({
        key: "price",
        label: r.label,
        onRemove: () => {
          setPriceRange("");
          setPage(1);
        },
      });
  }
  if (rating) {
    const r = RATING_OPTIONS.find((x) => x.id === rating);
    if (r)
      chips.push({
        key: "rating",
        label: r.label,
        onRemove: () => {
          setRating("");
          setPage(1);
        },
      });
  }

  return (
    <section className="max-w-350 mx-auto px-4 lg:px-6 py-10 md:py-12">
      <div className="grid grid-cols-1 lg:grid-cols-[280px_minmax(0,1fr)] gap-6 md:gap-8 items-start">
        <FilterSidebar onReset={chips.length > 0 ? handleReset : null}>
          <FilterSection title="Loại xe">
            <CategoryFilter
              options={CATEGORY_OPTIONS}
              selected={categories}
              onChange={(next) => {
                setCategories(next);
                setPage(1);
              }}
            />
          </FilterSection>
          <FilterSection title="Khoảng giá / ngày">
            <PriceFilter
              value={priceRange}
              onChange={(next) => {
                setPriceRange(next);
                setPage(1);
              }}
            />
          </FilterSection>
          <FilterSection title="Đánh giá">
            <RatingFilter
              value={rating}
              onChange={(next) => {
                setRating(next);
                setPage(1);
              }}
            />
          </FilterSection>
        </FilterSidebar>

        <div>
          <div className="flex flex-wrap items-end justify-between mb-5 gap-3">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-slate-900">
                Xe phù hợp cho hành trình của bạn
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                {total} lựa chọn phù hợp trên VieGo
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
              {pageItems.map((vehicle) => (
                <CarRentalVehicleCard
                  key={vehicle.id}
                  vehicle={vehicle}
                  pickupLabel={resolvePickupLabel(locationId, vehicle.pickupArea)}
                  bookingHref={`/car-rental/booking/${encodeURIComponent(vehicle.id)}${
                    searchQuery ? `?${searchQuery}` : ""
                  }`}
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
  );
}
