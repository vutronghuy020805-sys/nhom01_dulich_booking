"use client";

import { useState } from "react";
import { applyBusCoupon } from "./busSearchResults";

export default function BusCouponCard({ subtotal, appliedCoupon, onApply, onRemove }) {
  const [open, setOpen] = useState(false);
  const [code, setCode] = useState("");
  const [error, setError] = useState(null);

  const handleApply = () => {
    const result = applyBusCoupon(code, subtotal);
    if (!result.valid) {
      setError(result.error || "Mã không hợp lệ.");
      return;
    }
    setError(null);
    onApply(result);
    setCode("");
    setOpen(false);
  };

  return (
    <section className="bg-white rounded-2xl border border-slate-200 p-5">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-start gap-3">
          <svg
            viewBox="0 0 24 24"
            className="w-6 h-6 text-sky-600 shrink-0 mt-0.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="M20 12L12 20a4 4 0 0 1-5.66-5.66L14 6.34a2.83 2.83 0 1 1 4 4L10.59 18a2 2 0 0 1-2.83-2.83l7.07-7.07" />
          </svg>
          <div className="min-w-0">
            <div className="font-bold text-slate-900">Thêm mã giảm</div>
            <div className="text-xs text-slate-500 mt-0.5">
              Nhập coupon code hoặc chọn ưu đãi khả dụng
            </div>
            {appliedCoupon && (
              <div className="mt-2 inline-flex items-center gap-2 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded">
                {appliedCoupon.code} · {appliedCoupon.label}
                <button
                  type="button"
                  onClick={onRemove}
                  className="text-emerald-700 hover:text-emerald-800"
                  aria-label="Bỏ áp dụng coupon"
                >
                  ×
                </button>
              </div>
            )}
          </div>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="text-sky-600 hover:text-sky-700 font-semibold text-sm shrink-0"
        >
          {open ? "Đóng" : "Thêm mã"}
        </button>
      </div>

      {open && (
        <div className="mt-4 flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            value={code}
            onChange={(e) => {
              setCode(e.target.value.toUpperCase());
              if (error) setError(null);
            }}
            placeholder="Nhập mã VIEGO..."
            className={
              "flex-1 min-w-0 px-3 py-2.5 rounded-md border bg-white text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-400 " +
              (error ? "border-red-400 focus:ring-red-300" : "border-slate-300")
            }
          />
          <button
            type="button"
            onClick={handleApply}
            className="shrink-0 px-5 py-2.5 rounded-md bg-sky-500 hover:bg-sky-600 text-white font-semibold text-sm transition"
          >
            Áp dụng
          </button>
        </div>
      )}
      {open && error && (
        <div className="mt-2 text-xs text-red-500">{error}</div>
      )}
      {open && !error && (
        <div className="mt-2 text-xs text-slate-500">
          Thử mã: <code className="font-semibold">VIEGOBANMOI</code>,{" "}
          <code className="font-semibold">VIEGOBUS10</code>,{" "}
          <code className="font-semibold">VIEGOBUS50</code>
        </div>
      )}
    </section>
  );
}
