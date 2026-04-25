"use client";

import { useEffect, useState } from "react";

const TITLE_MAP = {
  ong: "Ông",
  ba: "Bà",
  anh: "Anh",
  chi: "Chị",
};

function CarIcon() {
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
      <path d="M14 16H9m10 0h3v-3.15a1 1 0 0 0-.4-.8l-1.9-1.4L17 7a2 2 0 0 0-1.8-1.1H9.8A2 2 0 0 0 8 7L5.3 10.65l-1.9 1.4a1 1 0 0 0-.4.8V16h3" />
      <circle cx="7" cy="16" r="2" />
      <circle cx="17" cy="16" r="2" />
    </svg>
  );
}

function Row({ label, value }) {
  return (
    <div>
      <div className="text-xs text-slate-500">{label}</div>
      <div className="text-sm font-semibold text-slate-900 mt-0.5 leading-snug">
        {value}
      </div>
    </div>
  );
}

function CheckPill({ children }) {
  return (
    <li className="flex items-center gap-2 text-sm text-slate-700">
      <svg
        viewBox="0 0 24 24"
        className="w-4 h-4 text-emerald-500 shrink-0"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <polyline points="20 6 9 17 4 12" />
      </svg>
      <span>{children}</span>
    </li>
  );
}

export default function CarRentalPaymentSummarySidebar({
  vehicleId,
  bookingCode,
  summary,
  startDateTimeLabel,
  endDateTimeLabel,
}) {
  const [passengerName, setPassengerName] = useState("Chưa cập nhật");
  const [passengerPhone, setPassengerPhone] = useState("");

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(
        `viego:car-rental:booking:${vehicleId}`
      );
      if (!raw) return;
      const parsed = JSON.parse(raw);
      const title = TITLE_MAP[parsed.passengerTitle] || "";
      const name = parsed.passengerFullName || "";
      const display = title ? `${title} ${name}`.trim() : name;
      if (display) setPassengerName(display);
      const phone = parsed.passengerPhone
        ? `${parsed.passengerPhoneCountry || ""}${parsed.passengerPhone}`
        : "";
      if (phone) setPassengerPhone(phone.replace(/\s+/g, ""));
    } catch {
      // ignore
    }
  }, [vehicleId]);

  return (
    <aside className="sticky top-24 space-y-4">
      <section className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <div className="bg-gradient-to-r from-sky-50 to-sky-100 px-5 py-4 flex items-start gap-3">
          <CarIcon />
          <div>
            <h3 className="text-base md:text-lg font-bold text-slate-900">
              Tóm tắt thuê xe
            </h3>
            <div className="text-xs text-slate-500 mt-0.5">
              Mã đặt chỗ{" "}
              <span className="font-semibold text-slate-800">
                {bookingCode}
              </span>
            </div>
          </div>
        </div>

        <div className="px-5 py-4 border-l-4 border-sky-500">
          <div className="text-sm font-bold text-slate-900">
            {summary.packageLabel}
          </div>
          <div className="text-sm text-slate-600 mt-1">
            Cung cấp bởi {summary.provider}
          </div>
        </div>

        <div className="px-5 py-4 border-t border-slate-100 space-y-4">
          <Row label="Thành phố/Khu vực thuê xe" value={summary.locationName} />
          <Row label="Ngày & Giờ bắt đầu" value={startDateTimeLabel} />
          <Row label="Điểm đón xe" value={summary.pickupPoint} />
          <Row label="Ngày & Giờ kết thúc" value={endDateTimeLabel} />
          <Row label="Điểm trả xe" value={summary.dropoffPoint} />
        </div>

        <div className="px-5 py-4 border-t border-slate-100">
          <div className="text-xs font-bold text-slate-500 tracking-wider mb-3">
            DANH SÁCH HÀNH KHÁCH
          </div>
          <div className="text-sm font-semibold text-slate-900">
            {passengerName}
          </div>
          {passengerPhone && (
            <div className="text-sm text-slate-700 mt-0.5">
              {passengerPhone}
            </div>
          )}
        </div>

        <div className="px-5 py-4 border-t border-slate-100">
          <ul className="space-y-2">
            <CheckPill>Có thể hoàn vé</CheckPill>
            <CheckPill>Có áp dụng đổi lịch</CheckPill>
          </ul>
        </div>
      </section>
    </aside>
  );
}
