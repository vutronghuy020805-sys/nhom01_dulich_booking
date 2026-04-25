"use client";

import { useEffect, useState } from "react";
import {
  generateFlightBookingCode,
  getFlightConfirmationStorageKey,
} from "./flightResultsData";

const formatDateTime = (iso) => {
  try {
    const d = new Date(iso);
    const pad = (n) => String(n).padStart(2, "0");
    return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
  } catch {
    return "";
  }
};

export default function FlightBookingSuccessStatus({
  fromCity,
  toCity,
  flight,
  fromSlug,
  toSlug,
  flightId,
  fallbackCode,
}) {
  const [info, setInfo] = useState(null);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(
        getFlightConfirmationStorageKey(fromSlug, toSlug, flightId)
      );
      setInfo(raw ? JSON.parse(raw) : null);
    } catch {
      setInfo(null);
    }
  }, [fromSlug, toSlug, flightId]);

  const code =
    info?.code || fallbackCode || generateFlightBookingCode(flightId);
  const paidAt = info?.paidAt ? formatDateTime(info.paidAt) : null;

  return (
    <section className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
      <div className="px-6 py-8 text-center bg-gradient-to-b from-emerald-50 to-white">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500 text-white shadow-lg mb-4">
          <svg
            viewBox="0 0 24 24"
            className="w-9 h-9"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
          Đặt vé thành công!
        </h1>
        <p className="mt-2 text-slate-600 max-w-xl mx-auto leading-relaxed">
          VieGo đã ghi nhận thanh toán của bạn cho chuyến bay{" "}
          <span className="font-semibold text-slate-800">
            {flight.airline}
          </span>{" "}
          từ{" "}
          <span className="font-semibold text-slate-800">
            {fromCity.displayName} ({fromCity.code})
          </span>{" "}
          →{" "}
          <span className="font-semibold text-slate-800">
            {toCity.displayName} ({toCity.code})
          </span>
          . Vé điện tử và thông tin chuyến bay đã được gửi tới email của bạn.
        </p>
      </div>

      <div className="px-6 py-5 border-t border-dashed border-gray-200 flex flex-col md:flex-row items-center justify-between gap-3">
        <div>
          <div className="text-xs uppercase tracking-wide text-slate-500">
            Mã đặt chỗ
          </div>
          <div className="text-2xl font-bold text-sky-600 tracking-wider mt-1">
            {code}
          </div>
        </div>
        <div className="text-right">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full">
            <svg
              viewBox="0 0 24 24"
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
            Thanh toán thành công
          </span>
          {paidAt && (
            <div className="text-xs text-slate-500 mt-1">
              Thanh toán lúc {paidAt}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
