"use client";

import { useMemo, useState } from "react";
import BestBusResultsCarousel from "./BestBusResultsCarousel";
import BusResultCard from "./BusResultCard";
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

function detectVehicleType(text) {
  const t = String(text || "").toLowerCase();
  if (t.includes("limousine")) return "Limousine";
  if (t.includes("giường")) return "Giường nằm";
  if (t.includes("ghế")) return "Ghế ngồi";
  if (t.includes("phòng")) return "Phòng nằm";
  return "Khác";
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
  { value: "earliest", label: "Khởi hành sớm nhất" },
  { value: "price_asc", label: "Giá thấp đến cao" },
  { value: "price_desc", label: "Giá cao đến thấp" },
  { value: "rating_desc", label: "Đánh giá cao nhất" },
  { value: "shortest", label: "Thời gian ngắn nhất" },
];

const SORT_MAP = {
  earliest: (a, b) => a.departureMin - b.departureMin,
  price_asc: (a, b) => a.price - b.price,
  price_desc: (a, b) => b.price - a.price,
  rating_desc: (a, b) => Number(b.rating || 0) - Number(a.rating || 0),
  shortest: (a, b) => a.durationMin - b.durationMin,
};

export default function BusResultsClient({ bestResults = [], allResults = [] }) {
  const [vehicleTypes, setVehicleTypes] = useState([]);
  const [operators, setOperators] = useState([]);
  const [timeBuckets, setTimeBuckets] = useState([]);
  const [priceRange, setPriceRange] = useState("");
  const [rating, setRating] = useState("");
  const [sort, setSort] = useState("earliest");
  const [page, setPage] = useState(1);

  const enrichedAll = useMemo(
    () =>
      allResults.map((trip) => ({
        ...trip,
        vehicleType: detectVehicleType(trip.operator?.vehicleClass),
        operatorName: trip.operator?.name || "",
        ratingNum: Number(trip.rating || 0),
      })),
    [allResults]
  );

  const VEHICLE_TYPE_OPTIONS = useMemo(() => {
    const set = new Set(enrichedAll.map((t) => t.vehicleType));
    return Array.from(set).map((v) => ({ id: v, label: v }));
  }, [enrichedAll]);

  const OPERATOR_OPTIONS = useMemo(() => {
    const set = new Set(enrichedAll.map((t) => t.operatorName).filter(Boolean));
    return Array.from(set).map((v) => ({ id: v, label: v }));
  }, [enrichedAll]);

  const filtered = useMemo(() => {
    let list = enrichedAll;
    list = applyCategoryFilter(list, "vehicleType", vehicleTypes);
    list = applyCategoryFilter(list, "operatorName", operators);
    if (timeBuckets.length > 0) {
      list = list.filter((t) =>
        timeBuckets.some((b) => matchesTime(t.departureMin, b))
      );
    }
    list = applyPriceFilter(list, "price", resolvePriceRange(priceRange));
    list = applyRatingFilter(list, "ratingNum", resolveMinRating(rating));
    list = applySort(list, sort, SORT_MAP);
    return list;
  }, [enrichedAll, vehicleTypes, operators, timeBuckets, priceRange, rating, sort]);

  const { pageItems, page: currentPage, totalPages, total } = paginate(
    filtered,
    page,
    PAGE_SIZE
  );

  const handleReset = () => {
    setVehicleTypes([]);
    setOperators([]);
    setTimeBuckets([]);
    setPriceRange("");
    setRating("");
    setPage(1);
  };

  const chips = [];
  vehicleTypes.forEach((v) =>
    chips.push({
      key: `vt-${v}`,
      label: v,
      onRemove: () => {
        setVehicleTypes(vehicleTypes.filter((x) => x !== v));
        setPage(1);
      },
    })
  );
  operators.forEach((v) =>
    chips.push({
      key: `op-${v}`,
      label: v,
      onRemove: () => {
        setOperators(operators.filter((x) => x !== v));
        setPage(1);
      },
    })
  );
  timeBuckets.forEach((v) => {
    const t = TIME_OPTIONS.find((x) => x.id === v);
    if (t)
      chips.push({
        key: `tm-${v}`,
        label: t.label,
        onRemove: () => {
          setTimeBuckets(timeBuckets.filter((x) => x !== v));
          setPage(1);
        },
      });
  });
  if (priceRange) {
    const r = PRICE_RANGES.find((x) => x.id === priceRange);
    if (r)
      chips.push({
        key: "pr",
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
        key: "rt",
        label: r.label,
        onRemove: () => {
          setRating("");
          setPage(1);
        },
      });
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-5">
      <FilterSidebar onReset={chips.length > 0 ? handleReset : null}>
        <FilterSection title="Loại xe">
          <CategoryFilter
            options={VEHICLE_TYPE_OPTIONS}
            selected={vehicleTypes}
            onChange={(next) => {
              setVehicleTypes(next);
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
        <FilterSection title="Hãng xe">
          <CategoryFilter
            options={OPERATOR_OPTIONS}
            selected={operators}
            onChange={(next) => {
              setOperators(next);
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

      <div className="space-y-5">
        {bestResults.length > 0 ? (
          <BestBusResultsCarousel bestResults={bestResults} />
        ) : null}

        <div className="flex flex-wrap items-end justify-between gap-3">
          <p className="text-sm text-slate-600">
            <span className="font-semibold text-slate-900">{total}</span>{" "}
            chuyến phù hợp
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
          <ActiveFilterChips chips={chips} onReset={handleReset} />
        ) : null}

        {pageItems.length === 0 ? (
          <EmptyResultsState />
        ) : (
          <div className="flex flex-col gap-3">
            {pageItems.map((trip) => (
              <BusResultCard key={trip.id} trip={trip} />
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
  );
}
