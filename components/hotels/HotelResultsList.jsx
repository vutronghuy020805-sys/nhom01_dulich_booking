"use client";

import { useMemo, useState } from "react";
import HotelResultCard from "./HotelResultCard";
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
} from "@/lib/listing";

const PAGE_SIZE = 6;

const HOTEL_PRICE_RANGES = [
  { id: "under-800k", label: "Dưới 800.000 VND", min: null, max: 800000 },
  { id: "800k-1.5m", label: "800.000 – 1.500.000 VND", min: 800000, max: 1500000 },
  { id: "1.5m-3m", label: "1.500.000 – 3.000.000 VND", min: 1500000, max: 3000000 },
  { id: "over-3m", label: "Trên 3.000.000 VND", min: 3000000, max: null },
];

function resolveHotelPriceRange(id) {
  if (!id) return { min: null, max: null };
  const r = HOTEL_PRICE_RANGES.find((x) => x.id === id);
  return r ? { min: r.min, max: r.max } : { min: null, max: null };
}

// Hotel rating scale 0-10
const HOTEL_RATING_OPTIONS = [
  { id: "r90", label: "Xuất sắc (9.0+)", min: 9.0 },
  { id: "r80", label: "Rất tốt (8.0+)", min: 8.0 },
  { id: "r70", label: "Tốt (7.0+)", min: 7.0 },
  { id: "r60", label: "Khá (6.0+)", min: 6.0 },
];

function resolveHotelMinRating(id) {
  if (!id) return 0;
  const r = HOTEL_RATING_OPTIONS.find((x) => x.id === id);
  return r ? r.min : 0;
}

const STAR_OPTIONS = [
  { id: 5, label: "5 sao" },
  { id: 4, label: "4 sao" },
  { id: 3, label: "3 sao" },
  { id: 2, label: "2 sao" },
];

const SORT_OPTIONS = [
  { value: "recommended", label: "Đề xuất" },
  { value: "price_asc", label: "Giá thấp đến cao" },
  { value: "price_desc", label: "Giá cao đến thấp" },
  { value: "rating_desc", label: "Đánh giá cao nhất" },
  { value: "stars_desc", label: "Sao cao đến thấp" },
];

const SORT_MAP = {
  recommended: (a, b) => (b.rating ?? 0) - (a.rating ?? 0) || a.price - b.price,
  price_asc: (a, b) => a.price - b.price,
  price_desc: (a, b) => b.price - a.price,
  rating_desc: (a, b) => (b.rating ?? 0) - (a.rating ?? 0),
  stars_desc: (a, b) => (b.stars ?? 0) - (a.stars ?? 0),
};

export default function HotelResultsList({ location, hotels }) {
  const [types, setTypes] = useState([]);
  const [stars, setStars] = useState([]);
  const [priceRange, setPriceRange] = useState("");
  const [rating, setRating] = useState("");
  const [sort, setSort] = useState("recommended");
  const [page, setPage] = useState(1);

  const TYPE_OPTIONS = useMemo(() => {
    const set = new Set(hotels.map((h) => h.type).filter(Boolean));
    return Array.from(set).map((v) => ({ id: v, label: v }));
  }, [hotels]);

  const filtered = useMemo(() => {
    let list = hotels;
    list = applyCategoryFilter(list, "type", types);
    if (stars.length > 0) {
      const set = new Set(stars);
      list = list.filter((h) => set.has(h.stars));
    }
    list = applyPriceFilter(list, "price", resolveHotelPriceRange(priceRange));
    list = applyRatingFilter(list, "rating", resolveHotelMinRating(rating));
    list = applySort(list, sort, SORT_MAP);
    return list;
  }, [hotels, types, stars, priceRange, rating, sort]);

  const { pageItems, page: currentPage, totalPages, total } = paginate(
    filtered,
    page,
    PAGE_SIZE
  );

  const handleReset = () => {
    setTypes([]);
    setStars([]);
    setPriceRange("");
    setRating("");
    setPage(1);
  };

  const chips = [];
  types.forEach((t) =>
    chips.push({
      key: `t-${t}`,
      label: t,
      onRemove: () => {
        setTypes(types.filter((x) => x !== t));
        setPage(1);
      },
    })
  );
  stars.forEach((s) =>
    chips.push({
      key: `s-${s}`,
      label: `${s} sao`,
      onRemove: () => {
        setStars(stars.filter((x) => x !== s));
        setPage(1);
      },
    })
  );
  if (priceRange) {
    const r = HOTEL_PRICE_RANGES.find((x) => x.id === priceRange);
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
  if (rating) {
    const r = HOTEL_RATING_OPTIONS.find((x) => x.id === rating);
    if (r)
      chips.push({
        key: "r",
        label: r.label,
        onRemove: () => {
          setRating("");
          setPage(1);
        },
      });
  }

  return (
    <section className="bg-white py-12 md:py-16 px-4">
      <div className="max-w-350 mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-6">
          Khách sạn phổ biến ở {location.city}
        </h2>

        {hotels.length === 0 ? (
          <p className="text-gray-500">
            Hiện chưa có khách sạn nào được cập nhật cho địa điểm này.
          </p>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-[280px_minmax(0,1fr)] gap-6 md:gap-8 items-start">
            <FilterSidebar onReset={chips.length > 0 ? handleReset : null}>
              <FilterSection title="Loại chỗ nghỉ">
                <CategoryFilter
                  options={TYPE_OPTIONS}
                  selected={types}
                  onChange={(next) => {
                    setTypes(next);
                    setPage(1);
                  }}
                />
              </FilterSection>
              <FilterSection title="Hạng sao">
                <CategoryFilter
                  options={STAR_OPTIONS}
                  selected={stars}
                  onChange={(next) => {
                    setStars(next);
                    setPage(1);
                  }}
                />
              </FilterSection>
              <FilterSection title="Khoảng giá / đêm">
                <PriceFilter
                  value={priceRange}
                  onChange={(next) => {
                    setPriceRange(next);
                    setPage(1);
                  }}
                  ranges={HOTEL_PRICE_RANGES}
                />
              </FilterSection>
              <FilterSection title="Điểm đánh giá">
                <RatingFilter
                  value={rating}
                  onChange={(next) => {
                    setRating(next);
                    setPage(1);
                  }}
                  options={HOTEL_RATING_OPTIONS}
                />
              </FilterSection>
            </FilterSidebar>

            <div>
              <div className="flex flex-wrap items-end justify-between mb-4 gap-3">
                <p className="text-sm text-slate-600">
                  <span className="font-semibold text-slate-900">{total}</span>{" "}
                  chỗ nghỉ phù hợp
                </p>
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
                <div className="flex flex-col gap-5">
                  {pageItems.map((hotel) => (
                    <HotelResultCard key={hotel.id} hotel={hotel} />
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
        )}
      </div>
    </section>
  );
}
