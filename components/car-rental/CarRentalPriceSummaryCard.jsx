"use client";

import Link from "next/link";
import { useState } from "react";
import { formatVnd } from "@/data/carRentalRental";

function ChevronIcon({ open }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={
        "w-5 h-5 text-orange-500 transition-transform duration-200 " +
        (open ? "rotate-180" : "rotate-0")
      }
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

export default function CarRentalPriceSummaryCard({
  packageLabel,
  subtotal,
  total,
}) {
  const [open, setOpen] = useState(true);
  return (
    <section>
      <h2 className="text-lg md:text-xl font-bold text-slate-900 mb-3">
        Tóm tắt
      </h2>
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="w-full px-5 md:px-6 py-4 flex items-center justify-between gap-3"
        >
          <span className="text-sm md:text-base font-semibold text-slate-900">
            Giá bạn trả
          </span>
          <span className="flex items-center gap-2">
            <span className="text-lg md:text-xl font-extrabold text-orange-500">
              {formatVnd(total)}
            </span>
            <ChevronIcon open={open} />
          </span>
        </button>

        {open && (
          <div className="px-5 md:px-6 py-4 border-t border-slate-100 flex items-center justify-between gap-3 text-sm">
            <span className="text-slate-700">{packageLabel} x 1</span>
            <span className="font-semibold text-slate-900">
              {formatVnd(subtotal)}
            </span>
          </div>
        )}

        <div className="px-5 md:px-6 py-4 bg-sky-50 border-t border-sky-100 flex items-start gap-3">
          <svg
            viewBox="0 0 24 24"
            className="w-5 h-5 text-sky-600 shrink-0 mt-0.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="16" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12.01" y2="8" />
          </svg>
          <div className="flex-1 min-w-0 text-sm text-slate-700 leading-relaxed">
            <p>
              Đăng nhập hoặc Đăng ký để tích ngay điểm thưởng! Bạn có thể tiếp
              tục đặt chỗ sau vì tiến trình đã được lưu trên hệ thống.
            </p>
            <Link
              href="/login"
              className="inline-block mt-1 text-sm font-bold text-sky-600 hover:text-sky-700"
            >
              Đăng nhập
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
