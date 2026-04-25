"use client";

import Link from "next/link";
import { useState } from "react";

export default function BusTicketActions({ ticketCode }) {
  const [toast, setToast] = useState(null);

  const handleDownload = () => {
    setToast(`Đang chuẩn bị file PDF cho vé ${ticketCode}...`);
    window.setTimeout(() => setToast(null), 2200);
  };

  const handleResendEmail = () => {
    setToast("Đã gửi lại vé điện tử đến email của bạn.");
    window.setTimeout(() => setToast(null), 2200);
  };

  return (
    <section className="space-y-3">
      <div className="flex flex-col md:flex-row gap-3 justify-center">
        <button
          type="button"
          onClick={handleDownload}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-sky-500 text-sky-600 hover:bg-sky-50 font-semibold text-sm transition"
        >
          <svg
            viewBox="0 0 24 24"
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          Tải vé điện tử
        </button>
        <button
          type="button"
          onClick={handleResendEmail}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 font-semibold text-sm transition"
        >
          <svg
            viewBox="0 0 24 24"
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <polyline points="22,6 12,13 2,6" />
          </svg>
          Gửi lại email
        </button>
        <Link
          href="/my-bookings"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-semibold text-sm text-center transition"
        >
          Về Đặt chỗ của tôi
        </Link>
        <Link
          href="/bus"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-sky-500 text-sky-600 hover:bg-sky-50 font-semibold text-sm text-center transition"
        >
          Tiếp tục khám phá
        </Link>
      </div>

      {toast && (
        <div className="text-center text-sm text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-lg px-4 py-2">
          {toast}
        </div>
      )}
    </section>
  );
}
