function StarIcon({ filled = true }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`w-3.5 h-3.5 ${filled ? "text-amber-400" : "text-slate-200"}`}
      fill="currentColor"
      aria-hidden
    >
      <path d="M12 2 L14.7 8.6 L21.8 9.2 L16.4 13.9 L18.1 20.9 L12 17.3 L5.9 20.9 L7.6 13.9 L2.2 9.2 L9.3 8.6 Z" />
    </svg>
  );
}

function BigStarRating({ value }) {
  const full = Math.floor(value);
  const cells = Array.from({ length: 5 }, (_, i) => i < full);
  return (
    <span className="inline-flex items-center gap-0.5">
      {cells.map((f, i) => (
        <StarIcon key={i} filled={f} />
      ))}
    </span>
  );
}

function ReviewCard({ review }) {
  return (
    <article className="bg-white border border-slate-200 rounded-2xl p-4 md:p-5 shadow-sm">
      <header className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-sky-100 text-sky-700 font-bold flex items-center justify-center">
          {review.initial}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-slate-900 truncate">
            {review.name}
          </p>
          <p className="text-xs text-slate-500">
            {review.source} · {review.dateLabel}
          </p>
        </div>
        <div className="shrink-0 inline-flex items-center gap-1 text-sm">
          <BigStarRating value={review.rating} />
          <span className="font-semibold text-slate-900">
            {review.rating.toFixed(1)}
          </span>
        </div>
      </header>
      <h4 className="mt-3 font-semibold text-slate-900 text-sm md:text-base">
        {review.title}
      </h4>
      <p className="mt-1 text-sm text-slate-600 leading-relaxed">
        {review.body}
      </p>
    </article>
  );
}

export default function ProductReviews({
  title = "Đánh giá của khách hàng",
  summary,
  reviews = [],
}) {
  if (reviews.length === 0) return null;
  const avg = summary?.avg ?? 0;
  const count = summary?.count ?? reviews.length;

  return (
    <section className="bg-white rounded-2xl border border-slate-200 p-5 md:p-6 shadow-sm">
      <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6 pb-4 border-b border-slate-100">
        <div>
          <h2 className="text-lg md:text-xl font-bold text-slate-900">
            {title}
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Dựa trên {count} đánh giá từ khách hàng đã đặt qua VieGo
          </p>
        </div>
        <div className="md:ml-auto inline-flex items-center gap-3 px-4 py-3 rounded-xl bg-sky-50 border border-sky-100">
          <div className="text-3xl font-extrabold text-sky-700 leading-none">
            {avg.toFixed(1)}
          </div>
          <div>
            <BigStarRating value={avg} />
            <p className="text-xs text-slate-600 mt-0.5">{count} đánh giá</p>
          </div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        {reviews.map((r) => (
          <ReviewCard key={r.id} review={r} />
        ))}
      </div>
    </section>
  );
}
