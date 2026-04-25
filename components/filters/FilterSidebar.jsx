"use client";

export default function FilterSidebar({ onReset, children }) {
  return (
    <aside className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="px-5 pt-5 pb-3 flex items-center justify-between">
        <h2 className="font-bold text-slate-900 text-base">Lọc</h2>
        {onReset ? (
          <button
            type="button"
            onClick={onReset}
            className="text-xs font-semibold text-sky-600 hover:text-sky-700"
          >
            Xoá bộ lọc
          </button>
        ) : null}
      </div>
      <p className="px-5 pb-3 text-xs text-slate-500 leading-relaxed">
        Hiển thị kết quả dựa trên bộ lọc của bạn
      </p>
      <div className="border-t border-slate-100">{children}</div>
    </aside>
  );
}
