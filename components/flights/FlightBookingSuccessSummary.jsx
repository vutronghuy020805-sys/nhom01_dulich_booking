"use client";

import { useEffect, useState } from "react";
import { getFlightStorageKey } from "./flightResultsData";

const GENDER_LABEL = {
  male: "Nam",
  female: "Nữ",
};

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

function DetailRow({ label, value }) {
  return (
    <div className="flex items-start justify-between gap-3 text-sm">
      <dt className="text-slate-500 shrink-0">{label}</dt>
      <dd className="font-semibold text-slate-800 text-right break-words">
        {value || "—"}
      </dd>
    </div>
  );
}

export default function FlightBookingSuccessSummary({
  fromCity,
  toCity,
  flight,
  dateLong,
  pricing,
  fromSlug,
  toSlug,
  flightId,
}) {
  const [form, setForm] = useState(null);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(
        getFlightStorageKey(fromSlug, toSlug, flightId)
      );
      setForm(raw ? JSON.parse(raw) : null);
    } catch {
      setForm(null);
    }
  }, [fromSlug, toSlug, flightId]);

  const depTime = flight.departureTimePadded || flight.departureTime;
  const arrTime = flight.arrivalTimePadded || flight.arrivalTime;
  const passengerName =
    form && [form.lastName, form.firstName].filter(Boolean).join(" ").trim();
  const birth =
    form &&
    [form.birthDay, form.birthMonth, form.birthYear].filter(Boolean).join("/");

  return (
    <section className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
      <div className="px-6 pt-6 pb-4 border-b border-slate-100">
        <h2 className="text-lg md:text-xl font-bold text-slate-900">
          Chi tiết đặt vé
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Mã vé điện tử sẽ được gửi kèm email xác nhận
        </p>
      </div>

      <div className="px-6 py-5 space-y-5 md:grid md:grid-cols-2 md:gap-6 md:space-y-0">
        <div>
          <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
            <PlaneIcon />
            Chuyến bay
          </h3>
          <div className="border border-slate-200 rounded-lg p-4">
            <div className="flex items-center justify-between gap-3">
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

            <div className="mt-3 pt-3 border-t border-slate-100 text-sm text-slate-700 flex items-center gap-2">
              <span className="font-semibold">{flight.airline}</span>
              <span className="text-slate-400">•</span>
              <span className="text-slate-600">{flight.fareClass}</span>
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              <Badge>Bay thẳng</Badge>
              <Badge>{flight.baggage} hành lý ký gửi</Badge>
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
          </div>

          <h3 className="text-sm font-bold text-slate-900 mt-5 mb-3">
            Hạng vé & Hành lý
          </h3>
          <dl className="space-y-2">
            <DetailRow label="Hạng vé" value={flight.fareClass} />
            <DetailRow
              label="Loại vé"
              value={
                flight.tripType === "MỘT CHIỀU" ? "Một chiều" : flight.tripType
              }
            />
            <DetailRow
              label="Hành lý ký gửi"
              value={`${flight.baggage}`}
            />
            {flight.benefits?.length > 0 && (
              <DetailRow
                label="Quyền lợi"
                value={flight.benefits.join(", ")}
              />
            )}
          </dl>
        </div>

        <div>
          <h3 className="text-sm font-bold text-slate-900 mb-3">
            Hành khách · Người lớn 1
          </h3>
          <dl className="space-y-2">
            <DetailRow label="Họ tên" value={passengerName} />
            <DetailRow
              label="Giới tính"
              value={form ? GENDER_LABEL[form.gender] : null}
            />
            <DetailRow label="Ngày sinh" value={birth} />
            <DetailRow
              label="Quốc tịch"
              value={form?.nationality}
            />
            <DetailRow label="CCCD" value={form?.idNumber} />
          </dl>

          <h3 className="text-sm font-bold text-slate-900 mt-5 mb-3">
            Người liên hệ
          </h3>
          <dl className="space-y-2">
            <DetailRow label="Họ tên" value={form?.fullName} />
            <DetailRow
              label="Điện thoại"
              value={
                form?.phone
                  ? `${form.phoneCountry || ""} ${form.phone}`.trim()
                  : null
              }
            />
            <DetailRow label="Email" value={form?.email} />
          </dl>
        </div>
      </div>

      <div className="px-6 py-5 border-t border-dashed border-gray-200 bg-slate-50">
        <h3 className="text-sm font-bold text-slate-900 mb-3">
          Tóm tắt thanh toán
        </h3>
        <div className="space-y-1.5 text-sm">
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
        <div className="mt-3 pt-3 border-t border-slate-200 flex items-center justify-between">
          <span className="text-sm font-bold text-slate-900">
            Đã thanh toán
          </span>
          <span className="text-xl font-bold text-emerald-600">
            {pricing.totalPrice.toLocaleString("vi-VN")} VND
          </span>
        </div>
      </div>

      {form?.email && (
        <div className="px-6 py-4 border-t border-slate-100 bg-sky-50 text-sm text-sky-900">
          <div className="font-semibold">Đã gửi xác nhận đặt vé</div>
          <p className="text-xs text-sky-800/80 mt-1 leading-relaxed">
            Xác nhận đặt vé và thông tin chuyến bay đã được gửi tới email:{" "}
            <span className="font-semibold">{form.email}</span>. Nếu bạn chưa
            nhận được email trong vài phút tới, vui lòng kiểm tra thư mục spam
            hoặc liên hệ VieGo.
          </p>
        </div>
      )}
    </section>
  );
}
