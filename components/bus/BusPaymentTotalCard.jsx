"use client";

import { useState } from "react";

export default function BusPaymentTotalCard({
  subtotal,
  discount = 0,
  total,
  seats,
  unitLabel,
}) {
  const [open, setOpen] = useState(false);

  return (
    <section className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full px-5 py-4 flex items-center justify-between gap-3"
      >
        <span className="text-base md:text-lg font-bold text-slate-900">
          Tổng giá tiền
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="text-lg font-bold text-slate-900">
            {total.toLocaleString("vi-VN")} VND
          </span>
          <svg
            viewBox="0 0 24 24"
            className={
              "w-4 h-4 text-slate-500 transition-transform duration-200 " +
              (open ? "rotate-180" : "")
            }
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </span>
      </button>

      {open && (
        <div className="px-5 pb-5 border-t border-slate-100 pt-4 space-y-2 text-sm">
          <div className="flex items-center justify-between text-slate-700">
            <span>
              {unitLabel} x{seats}
            </span>
            <span className="font-semibold text-slate-800">
              {subtotal.toLocaleString("vi-VN")} VND
            </span>
          </div>
          {discount > 0 && (
            <div className="flex items-center justify-between text-emerald-700">
              <span>Giảm giá áp dụng</span>
              <span className="font-semibold">
                -{discount.toLocaleString("vi-VN")} VND
              </span>
            </div>
          )}
          <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-slate-900">
            <span className="font-bold">Tổng cộng</span>
            <span className="font-bold text-orange-500">
              {total.toLocaleString("vi-VN")} VND
            </span>
          </div>
        </div>
      )}
    </section>
  );
}
