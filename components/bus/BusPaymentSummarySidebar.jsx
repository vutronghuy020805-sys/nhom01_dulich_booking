"use client";

import { useEffect, useState } from "react";
import { getBusBookingStorageKey } from "./busSearchResults";

const TITLE_MAP = {
  ong: "Ông",
  ba: "Bà",
  anh: "Anh",
  chi: "Chị",
};

function BusIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-5 h-5 text-sky-600"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="4" y="5" width="16" height="12" rx="2" />
      <path d="M4 11h16" />
      <circle cx="8" cy="18" r="1.5" fill="currentColor" />
      <circle cx="16" cy="18" r="1.5" fill="currentColor" />
    </svg>
  );
}

export default function BusPaymentSummarySidebar({
  tripId,
  trip,
  fromCityName,
  toCityName,
  dateLong,
  bookingCode,
}) {
  const [form, setForm] = useState(null);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(getBusBookingStorageKey(tripId));
      if (raw) setForm(JSON.parse(raw));
    } catch {
      // ignore
    }
  }, [tripId]);

  const passengerTitle = TITLE_MAP[form?.passengerTitle] || "";
  const passengerName = form?.passengerFullName || "Chưa cập nhật";
  const passengerDisplay = passengerTitle
    ? `${passengerTitle} ${passengerName}`
    : passengerName;

  return (
    <aside className="sticky top-24 space-y-4">
      <section className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <div className="bg-gradient-to-r from-sky-50 to-sky-100 px-5 py-4 flex items-start gap-3">
          <BusIcon />
          <div>
            <h3 className="text-base md:text-lg font-bold text-slate-900">
              Tóm tắt vé xe buýt
            </h3>
            <div className="text-xs text-slate-500 mt-0.5">
              Mã đặt chỗ{" "}
              <span className="font-semibold text-slate-800">
                {bookingCode}
              </span>
            </div>
          </div>
        </div>

        <div className="px-5 py-4">
          <div className="flex items-center justify-between gap-3 mb-3">
            <h4 className="text-xs font-bold text-slate-500 tracking-wider">
              CHI TIẾT XE BUÝT
            </h4>
            <button
              type="button"
              className="text-sm font-semibold text-sky-600 hover:text-sky-700"
            >
              Chi tiết
            </button>
          </div>

          <div className="text-sm text-slate-500">{trip.operator.name}</div>
          <div className="font-bold text-slate-900 mt-1">
            {fromCityName} - {toCityName}
          </div>
          <div className="text-sm text-slate-700 mt-1">{dateLong}</div>
          <div className="text-sm text-slate-700 mt-1">
            {trip.departureTime} - {trip.arrivalTime}
            {trip.nextDay && (
              <sup className="text-[10px] text-slate-500 font-semibold ml-0.5">
                +1
              </sup>
            )}
          </div>
        </div>

        <div className="px-5 py-4 border-t border-slate-100">
          <h4 className="text-xs font-bold text-slate-500 tracking-wider mb-3">
            HÀNH KHÁCH
          </h4>
          <div className="flex items-center justify-between gap-3">
            <span className="font-semibold text-slate-800 truncate">
              {passengerDisplay}
            </span>
            <span className="text-sm text-slate-500 shrink-0">Người lớn</span>
          </div>
        </div>
      </section>
    </aside>
  );
}
