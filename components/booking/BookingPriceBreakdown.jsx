export default function BookingPriceBreakdown({ ratePlan, nights = 1 }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
      <div className="p-5 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <h3 className="flex items-center gap-2 text-lg font-bold text-slate-900">
            <svg
              viewBox="0 0 24 24"
              className="w-5 h-5 text-slate-700"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
              <line x1="7" y1="7" x2="7.01" y2="7" />
            </svg>
            Chi tiết giá
          </h3>
          <svg
            viewBox="0 0 24 24"
            className="w-4 h-4 text-slate-500"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="18 15 12 9 6 15" />
          </svg>
        </div>

        <div className="mt-4 space-y-3 text-sm">
          <div>
            <div className="flex justify-between font-semibold text-slate-800">
              <span>Giá phòng</span>
              <span>{ratePlan.price.toLocaleString("vi-VN")} VND</span>
            </div>
            <div className="text-xs text-slate-500 mt-0.5">
              (1x) {ratePlan.planLabel} ({nights} đêm)
            </div>
          </div>

          <div className="flex justify-between text-slate-700">
            <span>Thuế và phí</span>
            <span>{ratePlan.taxesAndFees.toLocaleString("vi-VN")} VND</span>
          </div>
        </div>
      </div>

      <div className="bg-amber-50 px-5 py-4 flex items-center justify-between">
        <div>
          <div className="font-bold text-slate-900">Tổng cộng</div>
          <div className="text-xs text-slate-500">
            {ratePlan.roomsQuantity || 1} phòng, {nights} đêm
          </div>
        </div>
        <div className="text-xl font-bold text-orange-500">
          {ratePlan.totalPrice.toLocaleString("vi-VN")} VND
        </div>
      </div>

      <div className="p-5">
        <button
          type="submit"
          className="w-full py-3 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-bold tracking-wide transition"
        >
          Tiếp tục
        </button>
        <p className="text-xs text-slate-500 mt-3 leading-relaxed">
          Bằng cách tiến hành thanh toán, bạn đã đồng ý với{" "}
          <a href="#" className="text-sky-600 hover:underline">
            Điều khoản và Điều kiện
          </a>
          ,{" "}
          <a href="#" className="text-sky-600 hover:underline">
            Chính sách Bảo mật
          </a>
          , và Quy trình Hoàn tiền Lưu trú của VieGo.
        </p>
      </div>
    </div>
  );
}
