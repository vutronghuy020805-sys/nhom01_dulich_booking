"use client";

import { useState } from "react";

export default function FlightBookingSummary({
  flight,
  fromCity,
  toCity,
  dateLong,
}) {
  const [open, setOpen] = useState(false);

  const depTime = flight.departureTimePadded || flight.departureTime;
  const arrTime = flight.arrivalTimePadded || flight.arrivalTime;

  const changeableLabel = flight.isChangeable
    ? "Có áp dụng đổi lịch bay"
    : "Không áp dụng đổi lịch bay";
  const refundableLabel = flight.isRefundable ? "Có hoàn vé" : "Không hoàn vé";

  return (
    <aside className="flex flex-col gap-4 sticky top-24">
      <section className="bg-white rounded-xl border border-slate-200 p-5">
        <div className="flex items-center justify-between">
          <h3 className="text-base md:text-lg font-bold text-slate-900">
            Tóm tắt chuyến bay
          </h3>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="text-sm text-sky-600 font-semibold hover:text-sky-700"
          >
            {open ? "Ẩn" : "Chi tiết"}
          </button>
        </div>

        <div className="mt-4 border border-slate-200 rounded-lg p-4">
          <div className="text-xs font-semibold text-slate-500">
            Chuyến bay đi
          </div>
          <div className="mt-2 flex items-center justify-between gap-3">
            <div>
              <div className="text-sm font-bold text-slate-900">
                {fromCity.displayName} ({fromCity.code})
              </div>
              <div className="text-xs text-slate-500 mt-0.5">
                {dateLong}
              </div>
              <div className="text-sm font-semibold text-slate-800 mt-1">
                {depTime}
              </div>
            </div>
            <div className="text-center text-xs text-slate-500 shrink-0">
              <div>{flight.duration}</div>
              <div className="w-16 h-px bg-slate-300 my-1" />
              <div>Bay thẳng</div>
            </div>
            <div className="text-right">
              <div className="text-sm font-bold text-slate-900">
                {toCity.displayName} ({toCity.code})
              </div>
              <div className="text-xs text-slate-500 mt-0.5">
                {dateLong}
              </div>
              <div className="text-sm font-semibold text-slate-800 mt-1">
                {arrTime}
              </div>
            </div>
          </div>

          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center gap-2 text-sm text-slate-700">
            <svg
              viewBox="0 0 24 24"
              className="w-4 h-4 text-sky-500"
              fill="currentColor"
              aria-hidden
            >
              <path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5z" />
            </svg>
            <span className="font-semibold">{flight.airline}</span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-600">{flight.fareClass}</span>
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            <span
              className={
                "text-[11px] font-semibold px-2.5 py-1 rounded-full border " +
                (flight.isChangeable
                  ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                  : "bg-slate-100 text-slate-600 border-slate-200")
              }
            >
              {changeableLabel}
            </span>
            <span
              className={
                "text-[11px] font-semibold px-2.5 py-1 rounded-full border " +
                (flight.isRefundable
                  ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                  : "bg-slate-100 text-slate-600 border-slate-200")
              }
            >
              {refundableLabel}
            </span>
          </div>

          {open && (
            <div className="mt-3 pt-3 border-t border-slate-100 space-y-2 text-xs text-slate-600">
              <div>
                <span className="font-semibold text-slate-700">Hành lý: </span>
                {flight.baggage}
              </div>
              {flight.benefits?.length > 0 && (
                <div>
                  <span className="font-semibold text-slate-700">Lợi ích đi kèm: </span>
                  {flight.benefits.join(", ")}
                </div>
              )}
              <div>
                <span className="font-semibold text-slate-700">Hạng vé: </span>
                {flight.fareClass}
              </div>
              <div>
                <span className="font-semibold text-slate-700">Hành khách: </span>
                1 {flight.passengerType?.toLowerCase() || "người lớn"}
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="bg-white rounded-xl border border-slate-200 p-5">
        <h3 className="text-base md:text-lg font-bold text-slate-900">Tóm tắt</h3>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-sm text-slate-700">Giá bạn trả</span>
          <div className="flex items-center gap-1 text-lg font-bold text-orange-500">
            {flight.price.toLocaleString("vi-VN")} VND
            <svg
              viewBox="0 0 24 24"
              className="w-4 h-4 text-slate-400"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>
        </div>
        {flight.oldPrice && (
          <div className="mt-1 text-right text-xs text-slate-400 line-through">
            {flight.oldPrice.toLocaleString("vi-VN")} VND
          </div>
        )}
      </section>
    </aside>
  );
}
