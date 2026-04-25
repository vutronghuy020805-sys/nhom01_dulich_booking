"use client";

import Link from "next/link";
import { useState } from "react";

export default function BusPriceSummaryCard({ trip, seats = 1 }) {
  const [open, setOpen] = useState(true);
  const unitPrice = trip.price;
  const totalPrice = unitPrice * seats;

  return (
    <section className="bg-white rounded-xl border border-slate-200 overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full px-5 md:px-6 py-4 flex items-center justify-between gap-3 border-b border-slate-100"
      >
        <span className="font-semibold text-slate-800">Giá bạn trả</span>
        <span className="inline-flex items-center gap-2">
          <span className="text-lg font-bold text-orange-500">
            {totalPrice.toLocaleString("vi-VN")} VND
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
        <div className="px-5 md:px-6 py-4">
          <div className="flex items-start justify-between gap-3 text-sm">
            <span className="text-slate-700">
              {trip.operator.name} ({trip.operator.vehicleShort}) x{seats}
            </span>
            <span className="font-semibold text-slate-800 shrink-0">
              {totalPrice.toLocaleString("vi-VN")} VND
            </span>
          </div>
        </div>
      )}

      <div className="mx-5 md:mx-6 mb-5 rounded-lg bg-sky-50 border border-sky-100 px-4 py-3 text-sm text-sky-900 flex items-start gap-2">
        <svg
          viewBox="0 0 24 24"
          className="w-5 h-5 text-sky-500 shrink-0 mt-0.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M12 16v-4M12 8h.01" />
        </svg>
        <div className="leading-relaxed">
          <span>
            <Link
              href="/login"
              className="font-semibold text-sky-700 hover:text-sky-800 underline underline-offset-2"
            >
              Đăng nhập
            </Link>{" "}
            hoặc{" "}
            <Link
              href="/login"
              className="font-semibold text-sky-700 hover:text-sky-800 underline underline-offset-2"
            >
              Đăng ký
            </Link>{" "}
            để tích ngay điểm thưởng! Bạn có thể tiếp tục đặt chỗ sau vì tiến
            trình đã được lưu trên hệ thống.
          </span>
          <div className="mt-1.5">
            <Link
              href="/login"
              className="font-semibold text-sky-700 hover:text-sky-800"
            >
              Đăng nhập
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
