"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import ActivitiesHero from "./ActivitiesHero";
import ActivitiesGrid from "./ActivitiesGrid";
import WhyChooseVieGoSection from "./WhyChooseVieGoSection";
import ActivitiesFaqSection from "./ActivitiesFaqSection";
import ActivitiesClosingSection from "./ActivitiesClosingSection";
import { filterActivities, ACTIVITY_CATEGORIES } from "@/data/activitiesData";
import SortDropdown from "@/components/filters/SortDropdown";
import PriceFilter from "@/components/filters/PriceFilter";
import RatingFilter from "@/components/filters/RatingFilter";
import ActiveFilterChips from "@/components/filters/ActiveFilterChips";
import Pagination from "@/components/filters/Pagination";
import EmptyResultsState from "@/components/filters/EmptyResultsState";
import {
  applyPriceFilter,
  applyRatingFilter,
  applySort,
  paginate,
  resolvePriceRange,
  resolveMinRating,
  PRICE_RANGES,
  RATING_OPTIONS,
} from "@/lib/listing";

const PAGE_SIZE = 8;

const SORT_OPTIONS = [
  { value: "popular", label: "Nổi bật" },
  { value: "price_asc", label: "Giá thấp đến cao" },
  { value: "price_desc", label: "Giá cao đến thấp" },
  { value: "rating_desc", label: "Đánh giá cao nhất" },
];

const SORT_MAP = {
  popular: (a, b) => (b.rating ?? 0) - (a.rating ?? 0) || (b.reviews ?? 0) - (a.reviews ?? 0),
  price_asc: (a, b) => a.price - b.price,
  price_desc: (a, b) => b.price - a.price,
  rating_desc: (a, b) => (b.rating ?? 0) - (a.rating ?? 0),
};

export default function ActivitiesClient() {
  const searchParams = useSearchParams();
  const spString = searchParams?.toString() ?? "";

  const initialCategory = (() => {
    const cat = searchParams?.get("category") || "";
    return ACTIVITY_CATEGORIES.find((c) => c.id === cat)?.id ||
      ACTIVITY_CATEGORIES[0].id;
  })();
  const initialDestination = searchParams?.get("destination") || "";
  const initialKeyword = searchParams?.get("keyword") || "";

  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [selectedDestination, setSelectedDestination] =
    useState(initialDestination);
  const [searchKeyword, setSearchKeyword] = useState(initialKeyword);
  const [appliedKeyword, setAppliedKeyword] = useState(initialKeyword);
  const [priceRange, setPriceRange] = useState("");
  const [rating, setRating] = useState("");
  const [sort, setSort] = useState("popular");
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (!searchParams) return;
    const cat = searchParams.get("category") || "";
    const validCat = ACTIVITY_CATEGORIES.find((c) => c.id === cat)?.id;
    if (validCat && validCat !== activeCategory) {
      setActiveCategory(validCat);
      setPage(1);
    }
    const dest = searchParams.get("destination") || "";
    if (dest !== selectedDestination) {
      setSelectedDestination(dest);
      setPage(1);
    }
    const kw = searchParams.get("keyword") || "";
    if (kw !== appliedKeyword) {
      setSearchKeyword(kw);
      setAppliedKeyword(kw);
      setPage(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [spString]);

  const filteredByBase = useMemo(
    () =>
      filterActivities({
        category: activeCategory,
        destination: selectedDestination,
        keyword: appliedKeyword,
      }),
    [activeCategory, selectedDestination, appliedKeyword]
  );

  const finalList = useMemo(() => {
    let list = filteredByBase;
    list = applyPriceFilter(list, "price", resolvePriceRange(priceRange));
    list = applyRatingFilter(list, "rating", resolveMinRating(rating));
    list = applySort(list, sort, SORT_MAP);
    return list;
  }, [filteredByBase, priceRange, rating, sort]);

  const { pageItems, page: currentPage, totalPages, total } = paginate(
    finalList,
    page,
    PAGE_SIZE
  );

  const activeCategoryLabel =
    ACTIVITY_CATEGORIES.find((c) => c.id === activeCategory)?.label ||
    "Hoạt động";

  const handleSearch = () => {
    setAppliedKeyword(searchKeyword.trim());
    setPage(1);
  };

  const handleResetAdvanced = () => {
    setPriceRange("");
    setRating("");
    setPage(1);
  };

  const chips = [];
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
    <>
      <ActivitiesHero
        destination={selectedDestination}
        onDestinationChange={(v) => {
          setSelectedDestination(v);
          setPage(1);
        }}
        keyword={searchKeyword}
        onKeywordChange={setSearchKeyword}
        onSearch={handleSearch}
        activeCategory={activeCategory}
        onCategoryChange={(v) => {
          setActiveCategory(v);
          setPage(1);
        }}
      />

      <section
        id="activities-list"
        className="max-w-350 mx-auto px-4 lg:px-10 py-10 md:py-14"
      >
        <div className="flex flex-wrap items-end justify-between mb-5 gap-4">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-slate-900">
              {activeCategoryLabel}
              {selectedDestination ? ` tại ${selectedDestination}` : ""}
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              {total} hoạt động phù hợp trên VieGo
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

        <div className="grid grid-cols-1 lg:grid-cols-[240px_minmax(0,1fr)] gap-6 md:gap-8 items-start">
          <aside className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-5">
            <div>
              <h3 className="text-sm font-bold text-slate-900 mb-3">
                Khoảng giá
              </h3>
              <PriceFilter
                value={priceRange}
                onChange={(next) => {
                  setPriceRange(next);
                  setPage(1);
                }}
              />
            </div>
            <div className="pt-4 border-t border-slate-100">
              <h3 className="text-sm font-bold text-slate-900 mb-3">
                Đánh giá
              </h3>
              <RatingFilter
                value={rating}
                onChange={(next) => {
                  setRating(next);
                  setPage(1);
                }}
              />
            </div>
            {chips.length > 0 ? (
              <button
                type="button"
                onClick={handleResetAdvanced}
                className="text-xs font-semibold text-sky-600 hover:text-sky-700"
              >
                Xoá bộ lọc
              </button>
            ) : null}
          </aside>

          <div>
            {chips.length > 0 ? (
              <div className="mb-4">
                <ActiveFilterChips chips={chips} onReset={handleResetAdvanced} />
              </div>
            ) : null}

            {pageItems.length === 0 ? (
              <EmptyResultsState />
            ) : (
              <ActivitiesGrid
                activities={pageItems}
                highlightQuery={appliedKeyword}
              />
            )}

            <Pagination
              page={currentPage}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          </div>
        </div>
      </section>

      <WhyChooseVieGoSection />

      <ActivitiesFaqSection />

      <ActivitiesClosingSection />
    </>
  );
}
