"use client";

import { useEffect, useState } from "react";
import { bookingStorageKey } from "./BookingStep1Form";

const formatDate = (d) => {
  const days = [
    "Chủ Nhật",
    "Thứ Hai",
    "Thứ Ba",
    "Thứ Tư",
    "Thứ Năm",
    "Thứ Sáu",
    "Thứ Bảy",
  ];
  return {
    day: days[d.getDay()],
    date: d.getDate(),
    month: String(d.getMonth() + 1).padStart(2, "0"),
    year: d.getFullYear(),
  };
};

function Field({ label, value }) {
  return (
    <div>
      <div className="text-xs uppercase tracking-wide text-slate-500 font-semibold">
        {label}
      </div>
      <div className="mt-1 text-slate-800">{value || "—"}</div>
    </div>
  );
}

export default function BookingSuccessSummary({
  hotel,
  roomSection,
  ratePlan,
  locationSlug,
  hotelSlug,
  locationCity,
}) {
  const [contact, setContact] = useState(null);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(
        bookingStorageKey(locationSlug, hotelSlug, ratePlan.id)
      );
      setContact(raw ? JSON.parse(raw) : null);
    } catch {
      setContact(null);
    }
  }, [locationSlug, hotelSlug, ratePlan.id]);

  const checkIn = new Date(2026, 4, 3);
  const checkOut = new Date(2026, 4, 4);
  const nights = Math.max(
    1,
    Math.round((checkOut - checkIn) / (1000 * 60 * 60 * 24))
  );
  const ci = formatDate(checkIn);
  const co = formatDate(checkOut);
  const specialRequestsText = contact?.specialRequests?.length
    ? contact.specialRequests.join(", ")
    : "Không có";

  return (
    <section className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100">
        <h2 className="text-lg font-bold text-slate-900">
          Thông tin đơn đặt phòng
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-100">
        <div className="p-6 space-y-5">
          <Field label="Khách sạn" value={hotel.name} />
          <Field label="Địa điểm" value={locationCity} />
          <Field label="Loại phòng" value={roomSection.roomTitle} />
          <Field label="Gói phòng" value={ratePlan.planLabel} />
          <Field
            label="Ngày ở"
            value={
              <div className="space-y-1">
                <div>
                  <span className="text-slate-500">Nhận:</span>{" "}
                  {ci.day}, {ci.date}/{ci.month}/{ci.year}
                </div>
                <div>
                  <span className="text-slate-500">Trả:</span>{" "}
                  {co.day}, {co.date}/{co.month}/{co.year}
                </div>
                <div className="text-sm text-slate-500">{nights} đêm</div>
              </div>
            }
          />
          <Field
            label="Số lượng"
            value={
              <span>
                {ratePlan.adults} khách
                {ratePlan.children > 0 && `, ${ratePlan.children} trẻ em`} · 1
                phòng
              </span>
            }
          />
        </div>

        <div className="p-6 space-y-5">
          <Field
            label="Tổng tiền"
            value={
              <div className="flex items-center gap-3">
                <span className="text-xl font-bold text-slate-900">
                  {ratePlan.totalPrice.toLocaleString("vi-VN")} VND
                </span>
                <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-1 rounded-full">
                  <svg
                    viewBox="0 0 24 24"
                    className="w-3 h-3"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Đã thanh toán
                </span>
              </div>
            }
          />
          <Field label="Tên khách" value={contact?.guestName} />
          <Field
            label="Người liên hệ"
            value={
              <div className="space-y-0.5">
                <div>{contact?.contactName || "—"}</div>
                <div className="text-sm text-slate-600">
                  {contact?.contactPhone
                    ? `${contact?.contactPhoneCountryCode || "+84"}${contact.contactPhone}`
                    : "—"}
                </div>
                <div className="text-sm text-slate-600">
                  {contact?.contactEmail || "—"}
                </div>
              </div>
            }
          />
          <Field label="Yêu cầu đặc biệt" value={specialRequestsText} />
        </div>
      </div>

      {contact?.contactEmail && (
        <div className="bg-sky-50 border-t border-sky-100 px-6 py-4 flex items-start gap-3">
          <svg
            viewBox="0 0 24 24"
            className="w-5 h-5 text-sky-600 shrink-0 mt-0.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <path d="M22 7l-10 6L2 7" />
          </svg>
          <div className="text-sm text-slate-700 leading-relaxed">
            Xác nhận đặt phòng đã được gửi tới email{" "}
            <span className="font-semibold">{contact.contactEmail}</span>. Nếu
            bạn chưa nhận được email, vui lòng kiểm tra thư mục spam hoặc liên
            hệ VieGo.
          </div>
        </div>
      )}
    </section>
  );
}
