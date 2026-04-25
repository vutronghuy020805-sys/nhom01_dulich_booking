"use client";

function ChevronLeft() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}
function ChevronRight() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

function buildPageList(current, total) {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }
  const pages = new Set([1, total, current, current - 1, current + 1]);
  const sorted = Array.from(pages)
    .filter((p) => p >= 1 && p <= total)
    .sort((a, b) => a - b);
  const out = [];
  for (let i = 0; i < sorted.length; i++) {
    if (i > 0 && sorted[i] - sorted[i - 1] > 1) out.push("…");
    out.push(sorted[i]);
  }
  return out;
}

export default function Pagination({ page, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;
  const pages = buildPageList(page, totalPages);

  const goto = (p) => {
    if (p < 1 || p > totalPages || p === page) return;
    onPageChange(p);
  };

  return (
    <nav
      aria-label="Phân trang"
      className="flex flex-wrap items-center justify-center gap-1.5 mt-6"
    >
      <button
        type="button"
        onClick={() => goto(page - 1)}
        disabled={page <= 1}
        aria-label="Trang trước"
        className="inline-flex items-center justify-center w-9 h-9 rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronLeft />
      </button>

      {pages.map((p, idx) =>
        p === "…" ? (
          <span
            key={`gap-${idx}`}
            className="inline-flex items-center justify-center w-9 h-9 text-slate-400"
          >
            …
          </span>
        ) : (
          <button
            key={p}
            type="button"
            onClick={() => goto(p)}
            aria-current={p === page ? "page" : undefined}
            className={
              "inline-flex items-center justify-center min-w-9 h-9 px-3 rounded-lg text-sm font-semibold transition-colors " +
              (p === page
                ? "bg-sky-500 text-white shadow-sm"
                : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50")
            }
          >
            {p}
          </button>
        )
      )}

      <button
        type="button"
        onClick={() => goto(page + 1)}
        disabled={page >= totalPages}
        aria-label="Trang sau"
        className="inline-flex items-center justify-center w-9 h-9 rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronRight />
      </button>
    </nav>
  );
}
