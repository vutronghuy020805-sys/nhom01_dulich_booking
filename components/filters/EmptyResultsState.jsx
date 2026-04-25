export default function EmptyResultsState({
  title = "Không tìm thấy kết quả phù hợp",
  description = "Hãy thử thay đổi bộ lọc hoặc đặt lại tiêu chí tìm kiếm.",
  action = null,
}) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 py-16 px-6 text-center">
      <div className="mx-auto w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center mb-4">
        <svg
          viewBox="0 0 24 24"
          className="w-7 h-7 text-slate-400"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <circle cx="11" cy="11" r="7" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
          <line x1="8" y1="11" x2="14" y2="11" />
        </svg>
      </div>
      <h3 className="text-base md:text-lg font-bold text-slate-900">{title}</h3>
      <p className="mt-1 text-sm text-slate-500">{description}</p>
      {action ? <div className="mt-4 flex justify-center">{action}</div> : null}
    </div>
  );
}
