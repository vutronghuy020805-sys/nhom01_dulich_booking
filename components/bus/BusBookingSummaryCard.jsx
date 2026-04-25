"use client";

import { useState } from "react";

function BusIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-5 h-5 text-emerald-500"
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

function PolicyRow({ iconPath, title, description }) {
  return (
    <div className="flex items-start gap-3 px-5 md:px-6 py-4">
      <svg
        viewBox="0 0 24 24"
        className="w-5 h-5 text-slate-500 shrink-0 mt-0.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d={iconPath} />
      </svg>
      <div>
        <div className="text-sm font-bold text-slate-900">{title}</div>
        <div className="text-xs text-slate-500 mt-0.5">{description}</div>
      </div>
    </div>
  );
}

export default function BusBookingSummaryCard({
  fromCityName,
  toCityName,
  dateLong,
  trip,
}) {
  const [open, setOpen] = useState(true);
  if (!trip) return null;

  return (
    <aside className="bg-white border border-slate-200 rounded-xl overflow-hidden sticky top-24">
      <div className="px-5 md:px-6 pt-5 pb-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-base md:text-lg font-bold text-slate-900 min-w-0">
          <BusIcon />
          <span className="truncate">{fromCityName}</span>
          <svg
            viewBox="0 0 24 24"
            className="w-4 h-4 text-sky-500 shrink-0"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="M5 12h14M13 5l7 7-7 7" />
          </svg>
          <span className="truncate">{toCityName}</span>
        </div>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="shrink-0 text-slate-400 hover:text-slate-600"
          aria-label={open ? "Thu gọn" : "Mở rộng"}
        >
          <svg
            viewBox="0 0 24 24"
            className={
              "w-5 h-5 transition-transform duration-200 " +
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
        </button>
      </div>

      {open && (
        <>
          <div className="px-5 md:px-6 pb-5 border-b border-slate-100">
            <div className="text-sm font-semibold text-slate-700 mb-3">
              {dateLong}
            </div>

            <div className="text-sm font-bold text-slate-900">
              {trip.operator.name}
            </div>
            <div className="text-xs text-slate-500 mt-0.5">
              {trip.operator.vehicleClass}
            </div>

            <div className="mt-4 relative pl-6">
              <span className="absolute left-1 top-1 w-2.5 h-2.5 rounded-full border-2 border-sky-500 bg-white" />
              <span
                className="absolute left-2 top-4 w-px bg-slate-300"
                style={{ height: "calc(100% - 20px)" }}
                aria-hidden
              />
              <span className="absolute left-1 bottom-1 w-2.5 h-2.5 rounded-full bg-sky-500" />

              <div>
                <div className="text-sm font-bold text-slate-900">
                  {trip.departureTime}
                </div>
                <div className="text-xs text-slate-500 mt-0.5">{dateLong}</div>
                <div className="text-sm text-slate-700 mt-1 font-medium">
                  {trip.pickup.name}
                </div>
              </div>

              <div className="mt-3 text-xs text-slate-500">{trip.duration}</div>

              <div className="mt-3">
                <div className="text-sm font-bold text-slate-900">
                  {trip.arrivalTime}
                  {trip.nextDay && (
                    <sup className="text-[10px] text-slate-500 font-semibold ml-0.5">
                      +1
                    </sup>
                  )}
                </div>
                <div className="text-xs text-slate-500 mt-0.5">{dateLong}</div>
                <div className="text-sm text-slate-700 mt-1 font-medium">
                  {trip.dropoff.name}
                </div>
              </div>
            </div>

            <button
              type="button"
              className="mt-4 text-sm font-semibold text-sky-600 hover:text-sky-700"
            >
              Chi tiết
            </button>
          </div>

          <div className="divide-y divide-slate-100">
            <PolicyRow
              iconPath="M3 5h18M5 5v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V5M9 9v8M15 9v8"
              title="Không đổi lịch"
              description="Không thể đổi lịch sau khi đặt chỗ."
            />
            <PolicyRow
              iconPath="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"
              title="Không hoàn lại"
              description="Vé không thể được hủy sau khi đặt."
            />
          </div>
        </>
      )}
    </aside>
  );
}
