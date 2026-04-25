"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import BusContactSummaryCard from "./BusContactSummaryCard";
import BusPassengerSummaryCard from "./BusPassengerSummaryCard";
import BusSeatSelectionCard from "./BusSeatSelectionCard";
import BusPriceSummaryCard from "./BusPriceSummaryCard";
import { getBusBookingStorageKey } from "./busSearchResults";

export default function BusReviewClient({
  tripId,
  trip,
  seats,
  editHref,
  nextQuery,
}) {
  const router = useRouter();
  const [form, setForm] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(getBusBookingStorageKey(tripId));
      if (raw) setForm(JSON.parse(raw));
    } catch {
      // ignore
    }
    setReady(true);
  }, [tripId]);

  const handleContinue = () => {
    router.push(
      `/bus/booking/${encodeURIComponent(tripId)}/payment?${nextQuery}`
    );
  };

  return (
    <div className="flex flex-col gap-5">
      <section className="bg-sky-50 border border-sky-100 rounded-xl p-4 md:p-5 flex items-start gap-4">
        <div className="shrink-0 w-14 h-14 md:w-16 md:h-16 rounded-xl bg-sky-100 flex items-center justify-center">
          <svg
            viewBox="0 0 24 24"
            className="w-8 h-8 text-sky-600"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <rect x="3" y="6" width="18" height="13" rx="2" />
            <path d="M7 6V4a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2" />
            <path d="M12 11v6M9 14h6" />
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-bold text-slate-900 text-sm md:text-base">
            Đăng nhập hoặc đăng ký để đặt chỗ dễ dàng và nhận thêm nhiều lợi ích!
          </div>
          <div className="text-xs md:text-sm text-slate-600 mt-1">
            Nhanh chóng điền thông tin với Chi tiết hành khách đã lưu
          </div>
          <Link
            href="/login"
            className="inline-block mt-3 text-sm font-bold text-sky-600 hover:text-sky-700"
          >
            Đăng nhập hoặc Đăng ký
          </Link>
        </div>
      </section>

      <div>
        <h2 className="text-lg md:text-xl font-bold text-slate-900 mb-3">
          Thông tin liên hệ
        </h2>
        <BusContactSummaryCard form={ready ? form : null} editHref={editHref} />
      </div>

      <div>
        <h2 className="text-lg md:text-xl font-bold text-slate-900 mb-3">
          Thông tin hành khách
        </h2>
        <BusPassengerSummaryCard form={ready ? form : null} editHref={editHref} />
      </div>

      <div>
        <h2 className="text-lg md:text-xl font-bold text-slate-900 mb-3">
          Lựa chọn chỗ ngồi
        </h2>
        <BusSeatSelectionCard selectedSeat={form?.selectedSeat || null} />
      </div>

      <div>
        <h2 className="text-lg md:text-xl font-bold text-slate-900 mb-3">
          Tóm tắt
        </h2>
        <BusPriceSummaryCard trip={trip} seats={seats} />
      </div>

      <div className="flex items-center justify-end mt-2">
        <button
          type="button"
          onClick={handleContinue}
          className="px-10 py-3 rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm md:text-base transition"
        >
          Tiếp tục
        </button>
      </div>
    </div>
  );
}
