function formatPrice(value) {
  return `${new Intl.NumberFormat("vi-VN").format(value)} VND`;
}

export default function ActivityTicketQuantityRow({
  category,
  label,
  price,
  note,
  quantity,
  onDecrease,
  onIncrease,
  isLast = false,
}) {
  const disableMinus = quantity <= 0;

  return (
    <div
      className={
        "flex items-center justify-between gap-4 py-4 md:py-5 " +
        (isLast ? "" : "border-b border-slate-200")
      }
    >
      <div className="min-w-0">
        <div className="text-xs md:text-sm font-semibold tracking-wider text-slate-500 uppercase">
          {label}
        </div>
        <div className="mt-1 text-lg md:text-xl font-bold text-slate-900">
          {formatPrice(price)}
        </div>
        {note ? (
          <div className="mt-1 text-xs md:text-sm text-slate-500">{note}</div>
        ) : null}
      </div>

      <div className="shrink-0 flex items-center gap-1.5">
        <button
          type="button"
          onClick={onDecrease}
          disabled={disableMinus}
          aria-label={`Giảm số lượng ${label}`}
          className="w-9 h-9 rounded-lg bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100 active:bg-slate-200 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center transition"
        >
          <svg
            viewBox="0 0 24 24"
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            aria-hidden
          >
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </button>

        <div
          aria-live="polite"
          aria-label={`Số lượng ${label}`}
          className="min-w-10 px-2 text-center text-base font-semibold text-slate-900 tabular-nums"
        >
          {quantity}
        </div>

        <button
          type="button"
          onClick={onIncrease}
          aria-label={`Tăng số lượng ${label}`}
          className="w-9 h-9 rounded-lg bg-slate-50 border border-slate-200 text-blue-600 hover:bg-slate-100 active:bg-slate-200 flex items-center justify-center transition"
        >
          <svg
            viewBox="0 0 24 24"
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            aria-hidden
          >
            <line x1="5" y1="12" x2="19" y2="12" />
            <line x1="12" y1="5" x2="12" y2="19" />
          </svg>
        </button>
      </div>
    </div>
  );
}
