"use client";

import { useEffect, useState } from "react";

function PlaneIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-4 h-4 text-sky-500"
      fill="currentColor"
      aria-hidden
    >
      <path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5z" />
    </svg>
  );
}

function Badge({ tone = "neutral", children }) {
  const palette =
    tone === "positive"
      ? "bg-emerald-50 text-emerald-700 border-emerald-100"
      : tone === "warning"
      ? "bg-amber-50 text-amber-700 border-amber-200"
      : tone === "promo"
      ? "bg-red-50 text-red-600 border-red-100"
      : "bg-slate-100 text-slate-600 border-slate-200";
  return (
    <span
      className={
        "text-[11px] font-semibold px-2.5 py-1 rounded-full border " + palette
      }
    >
      {children}
    </span>
  );
}

function FlightDetailCard({ fromCity, toCity, flight, dateLong }) {
  const [open, setOpen] = useState(false);
  const depTime = flight.departureTimePadded || flight.departureTime;
  const arrTime = flight.arrivalTimePadded || flight.arrivalTime;

  return (
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
            <div className="text-xs text-slate-500 mt-0.5">{dateLong}</div>
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
            <div className="text-xs text-slate-500 mt-0.5">{dateLong}</div>
            <div className="text-sm font-semibold text-slate-800 mt-1">
              {arrTime}
            </div>
          </div>
        </div>

        <div className="mt-3 pt-3 border-t border-slate-100 flex items-center gap-2 text-sm text-slate-700">
          <PlaneIcon />
          <span className="font-semibold">{flight.airline}</span>
          <span className="text-slate-400">•</span>
          <span className="text-slate-600">{flight.fareClass}</span>
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          <Badge tone="neutral">Bay thẳng</Badge>
          <Badge tone="neutral">{flight.baggage} hành lý ký gửi</Badge>
          <Badge tone={flight.isChangeable ? "positive" : "neutral"}>
            {flight.isChangeable
              ? "Có áp dụng đổi lịch bay"
              : "Không áp dụng đổi lịch bay"}
          </Badge>
          <Badge tone={flight.isRefundable ? "positive" : "neutral"}>
            {flight.isRefundable ? "Có hoàn vé" : "Không hoàn vé"}
          </Badge>
          {flight.badge && <Badge tone="promo">{flight.badge}</Badge>}
        </div>

        {open && (
          <div className="mt-3 pt-3 border-t border-slate-100 space-y-2 text-xs text-slate-600">
            <div>
              <span className="font-semibold text-slate-700">Hạng vé: </span>
              {flight.fareClass}
            </div>
            <div>
              <span className="font-semibold text-slate-700">Hành lý: </span>
              {flight.baggage} ký gửi
            </div>
            {flight.benefits?.length > 0 && (
              <div>
                <span className="font-semibold text-slate-700">Quyền lợi: </span>
                {flight.benefits.join(", ")}
              </div>
            )}
            <div>
              <span className="font-semibold text-slate-700">Loại vé: </span>
              {flight.tripType === "MỘT CHIỀU" ? "Một chiều" : flight.tripType}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function PriceCard({ pricing }) {
  return (
    <section className="bg-white rounded-xl border border-slate-200 p-5">
      <h3 className="text-base md:text-lg font-bold text-slate-900">
        Tóm tắt giá
      </h3>
      <div className="mt-3 space-y-2 text-sm">
        <div className="flex items-center justify-between text-slate-700">
          <span>Giá vé</span>
          <span className="font-semibold text-slate-800">
            {pricing.price.toLocaleString("vi-VN")} VND
          </span>
        </div>
        <div className="flex items-center justify-between text-slate-700">
          <span>Thuế và phí</span>
          <span className="font-semibold text-slate-800">
            {pricing.taxesAndFees.toLocaleString("vi-VN")} VND
          </span>
        </div>
      </div>
      <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between">
        <span className="text-sm font-bold text-slate-900">Tổng cộng</span>
        <span className="text-lg font-bold text-orange-500">
          {pricing.totalPrice.toLocaleString("vi-VN")} VND
        </span>
      </div>
    </section>
  );
}

const GENDER_LABEL = {
  male: "Nam",
  female: "Nữ",
};

function ContactPassengerCard({ formData }) {
  if (!formData) {
    return (
      <section className="bg-white rounded-xl border border-slate-200 p-5 text-sm text-slate-500">
        Thông tin liên hệ & hành khách chưa được lưu. Vui lòng quay lại bước{" "}
        <span className="font-semibold">Chi tiết chuyến đi của bạn</span>.
      </section>
    );
  }

  const passengerName = [formData.lastName, formData.firstName]
    .filter(Boolean)
    .join(" ")
    .trim();
  const birth = [formData.birthDay, formData.birthMonth, formData.birthYear]
    .filter(Boolean)
    .join("/");

  return (
    <section className="bg-white rounded-xl border border-slate-200 p-5 space-y-4">
      <div>
        <h3 className="text-sm font-bold text-slate-900">
          Thông tin người liên hệ
        </h3>
        <dl className="mt-2 space-y-1.5 text-sm">
          <div className="flex items-center justify-between gap-2">
            <dt className="text-slate-500">Họ tên</dt>
            <dd className="font-semibold text-slate-800 text-right">
              {formData.fullName || "—"}
            </dd>
          </div>
          <div className="flex items-center justify-between gap-2">
            <dt className="text-slate-500">Điện thoại</dt>
            <dd className="font-semibold text-slate-800 text-right">
              {formData.phone
                ? `${formData.phoneCountry || ""} ${formData.phone}`.trim()
                : "—"}
            </dd>
          </div>
          <div className="flex items-center justify-between gap-2">
            <dt className="text-slate-500">Email</dt>
            <dd className="font-semibold text-slate-800 text-right truncate">
              {formData.email || "—"}
            </dd>
          </div>
        </dl>
      </div>

      <div className="pt-4 border-t border-slate-100">
        <h3 className="text-sm font-bold text-slate-900">
          Hành khách · Người lớn 1
        </h3>
        <dl className="mt-2 space-y-1.5 text-sm">
          <div className="flex items-center justify-between gap-2">
            <dt className="text-slate-500">Họ tên</dt>
            <dd className="font-semibold text-slate-800 text-right">
              {passengerName || "—"}
            </dd>
          </div>
          <div className="flex items-center justify-between gap-2">
            <dt className="text-slate-500">Giới tính</dt>
            <dd className="font-semibold text-slate-800 text-right">
              {GENDER_LABEL[formData.gender] || "—"}
            </dd>
          </div>
          <div className="flex items-center justify-between gap-2">
            <dt className="text-slate-500">Ngày sinh</dt>
            <dd className="font-semibold text-slate-800 text-right">
              {birth || "—"}
            </dd>
          </div>
          <div className="flex items-center justify-between gap-2">
            <dt className="text-slate-500">Quốc tịch</dt>
            <dd className="font-semibold text-slate-800 text-right">
              {formData.nationality || "—"}
            </dd>
          </div>
          <div className="flex items-center justify-between gap-2">
            <dt className="text-slate-500">CCCD</dt>
            <dd className="font-semibold text-slate-800 text-right">
              {formData.idNumber || "—"}
            </dd>
          </div>
          {formData.loyaltyMember && (
            <div className="flex items-center justify-between gap-2">
              <dt className="text-slate-500">Hành khách Thân thiết</dt>
              <dd className="font-semibold text-emerald-600 text-right">
                Đã kích hoạt
              </dd>
            </div>
          )}
        </dl>
      </div>
    </section>
  );
}

export default function FlightPaymentSummary({
  fromCity,
  toCity,
  flight,
  dateLong,
  pricing,
  storageKey,
}) {
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    if (!storageKey) return;
    try {
      const raw = sessionStorage.getItem(storageKey);
      if (raw) setFormData(JSON.parse(raw));
    } catch {
      // ignore parse errors
    }
  }, [storageKey]);

  return (
    <aside className="flex flex-col gap-4 sticky top-24">
      <FlightDetailCard
        fromCity={fromCity}
        toCity={toCity}
        flight={flight}
        dateLong={dateLong}
      />
      <PriceCard pricing={pricing} />
      <ContactPassengerCard formData={formData} />
    </aside>
  );
}
