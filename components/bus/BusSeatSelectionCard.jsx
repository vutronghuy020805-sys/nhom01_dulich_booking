"use client";

export default function BusSeatSelectionCard({ selectedSeat }) {
  const handleClick = () => {
    window.alert(
      "Tính năng chọn chỗ ngồi đang được cập nhật. Bạn có thể tiếp tục bước thanh toán — nhà xe sẽ sắp xếp chỗ ngồi theo số thứ tự đặt."
    );
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="w-full bg-white rounded-xl border border-slate-200 hover:border-sky-300 hover:bg-sky-50/30 transition-colors flex items-center gap-4 px-5 md:px-6 py-4 text-left"
    >
      <span className="shrink-0 w-10 h-10 rounded-lg bg-sky-100 text-sky-600 flex items-center justify-center">
        <svg
          viewBox="0 0 24 24"
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="M6 10v8a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-8" />
          <path d="M5 10V7a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v3" />
          <path d="M9 14h6" />
        </svg>
      </span>
      <div className="flex-1 min-w-0">
        <div className="font-bold text-slate-900">Số ghế</div>
        <div className="text-xs text-slate-500 mt-0.5">
          {selectedSeat
            ? `Đã chọn: ${selectedSeat}`
            : "Chọn vị trí bạn muốn ngồi."}
        </div>
      </div>
      <svg
        viewBox="0 0 24 24"
        className="w-5 h-5 text-slate-400 shrink-0"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <polyline points="9 18 15 12 9 6" />
      </svg>
    </button>
  );
}
