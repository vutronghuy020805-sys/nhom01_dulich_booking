"use client";

import { useState } from "react";
import { computeDiscount, validateCoupon } from "@/lib/coupons";

function TagIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M20.59 13.41 13.41 20.59a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
      <circle cx="7" cy="7" r="1.5" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function formatVnd(v) {
  return v.toLocaleString("vi-VN") + " VND";
}

/**
 * Ô nhập mã giảm giá dùng chung ở các trang payment.
 *
 * Props:
 * - subtotal: số tiền trước giảm (number)
 * - appliedCode: string | null — mã hiện tại đã áp
 * - onApply(coupon) — gọi khi áp thành công, trả về object { code, label, discount, type, value }
 * - onRemove() — gọi khi bỏ mã
 * - title, helpText — tuỳ chỉnh
 */
export default function PaymentCouponBox({
  subtotal,
  appliedCode = null,
  onApply,
  onRemove,
  title = "Mã giảm giá",
  helpText = "Mã thử: VIEGO10, WELCOME50K, FREEDISC, VIEGO100K",
}) {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");
    const res = validateCoupon(input, subtotal);
    if (!res.valid) {
      setError(res.error || "Mã không hợp lệ.");
      return;
    }
    const discount = computeDiscount(res.coupon, subtotal);
    onApply({
      code: res.coupon.code,
      label: res.coupon.label,
      type: res.coupon.type,
      value: res.coupon.value,
      discount,
    });
    setInput("");
  };

  return (
    <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
      <h3 className="text-sm font-bold text-slate-900 inline-flex items-center gap-1.5">
        <TagIcon />
        {title}
      </h3>

      {appliedCode ? (
        <div className="mt-3 flex flex-wrap items-center gap-2 text-sm">
          <span className="inline-flex items-center gap-1.5 pl-3 pr-1.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 font-semibold">
            <span>Đã áp: {appliedCode}</span>
            <button
              type="button"
              onClick={onRemove}
              aria-label="Bỏ mã"
              className="w-5 h-5 inline-flex items-center justify-center rounded-full hover:bg-emerald-100"
            >
              <CloseIcon />
            </button>
          </span>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-3">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                if (error) setError("");
              }}
              placeholder="Nhập mã"
              className={
                "flex-1 rounded-lg border bg-white px-3.5 py-2.5 text-base font-medium text-slate-900 placeholder:text-slate-500 outline-none transition " +
                (error
                  ? "border-rose-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-200"
                  : "border-slate-300 focus:border-sky-500 focus:ring-2 focus:ring-sky-200")
              }
            />
            <button
              type="submit"
              disabled={!subtotal || subtotal <= 0}
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-sky-500 hover:bg-sky-600 disabled:opacity-60 text-white font-semibold text-base transition-colors shadow-sm"
            >
              Áp dụng
            </button>
          </div>
          {error ? (
            <p className="mt-2 text-sm text-rose-600">{error}</p>
          ) : (
            <p className="mt-2 text-sm text-slate-700">{helpText}</p>
          )}
        </form>
      )}

      {appliedCode && subtotal > 0 ? (
        <p className="mt-2 text-sm text-slate-700">
          Tạm tính: {formatVnd(subtotal)}
        </p>
      ) : null}
    </section>
  );
}
