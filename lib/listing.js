export function formatVnd(value) {
  if (value == null) return "";
  return value.toLocaleString("vi-VN") + " VND";
}

export function applyCategoryFilter(items, categoryField, selectedCategories) {
  if (!selectedCategories || selectedCategories.length === 0) return items;
  const set = new Set(selectedCategories);
  return items.filter((item) => set.has(item[categoryField]));
}

export function applyPriceFilter(items, priceField, { min, max }) {
  if (min == null && max == null) return items;
  return items.filter((item) => {
    const p = item[priceField];
    if (p == null) return true;
    if (min != null && p < min) return false;
    if (max != null && p > max) return false;
    return true;
  });
}

export function applyRatingFilter(items, ratingField, minRating) {
  if (!minRating) return items;
  return items.filter((item) => (item[ratingField] ?? 0) >= minRating);
}

export function applySort(items, sortKey, sortMap) {
  if (!sortKey || !sortMap[sortKey]) return items;
  const copy = [...items];
  copy.sort(sortMap[sortKey]);
  return copy;
}

export function paginate(items, page, pageSize) {
  const total = items.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const start = (safePage - 1) * pageSize;
  const end = start + pageSize;
  return {
    pageItems: items.slice(start, end),
    page: safePage,
    totalPages,
    total,
    pageSize,
  };
}

export const PRICE_RANGES = [
  { id: "under-200k", label: "Dưới 200.000 VND", min: null, max: 200000 },
  { id: "200k-500k", label: "200.000 – 500.000 VND", min: 200000, max: 500000 },
  { id: "500k-1m", label: "500.000 – 1.000.000 VND", min: 500000, max: 1000000 },
  { id: "over-1m", label: "Trên 1.000.000 VND", min: 1000000, max: null },
];

export function resolvePriceRange(rangeId) {
  if (!rangeId) return { min: null, max: null };
  const found = PRICE_RANGES.find((r) => r.id === rangeId);
  return found ? { min: found.min, max: found.max } : { min: null, max: null };
}

export const RATING_OPTIONS = [
  { id: "r45", label: "Từ 4.5 trở lên", min: 4.5 },
  { id: "r40", label: "Từ 4.0 trở lên", min: 4.0 },
  { id: "r35", label: "Từ 3.5 trở lên", min: 3.5 },
  { id: "r30", label: "Từ 3.0 trở lên", min: 3.0 },
];

export function resolveMinRating(ratingId) {
  if (!ratingId) return 0;
  const found = RATING_OPTIONS.find((r) => r.id === ratingId);
  return found ? found.min : 0;
}
