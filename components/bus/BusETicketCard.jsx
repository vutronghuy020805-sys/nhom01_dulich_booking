"use client";

import { useEffect, useState } from "react";
import BusTicketQrBlock from "./BusTicketQrBlock";
import { getBusBookingStorageKey } from "./busSearchResults";

const TITLE_MAP = {
  ong: "Ông",
  ba: "Bà",
  anh: "Anh",
  chi: "Chị",
};

const METHOD_LABEL = {
  vietqr: "VietQR",
  "vietinbank-transfer": "Chuyển khoản VietinBank",
  "digital-wallet": "Ví điện tử",
  "mobile-banking": "Ngân hàng di động",
  card: "Thẻ thanh toán",
  installment: "Trả góp thẻ tín dụng",
};

function Row({ label, value, mono = false }) {
  return (
    <div className="flex items-start justify-between gap-3 text-sm">
      <span className="text-slate-500 shrink-0">{label}</span>
      <span
        className={
          "font-semibold text-slate-800 text-right break-words " +
          (mono ? "font-mono tracking-wide" : "")
        }
      >
        {value || "—"}
      </span>
    </div>
  );
}

export default function BusETicketCard({
  tripId,
  trip,
  fromCityName,
  toCityName,
  dateLong,
  bookingCode,
  ticketCode,
  subtotal,
  seats,
}) {
  const [form, setForm] = useState(null);
  const [payment, setPayment] = useState(null);
  const [confirmation, setConfirmation] = useState(null);

  useEffect(() => {
    try {
      const rawBooking = sessionStorage.getItem(getBusBookingStorageKey(tripId));
      if (rawBooking) setForm(JSON.parse(rawBooking));
      const rawPayment = sessionStorage.getItem(
        `bus-payment:selection:${tripId}`
      );
      if (rawPayment) setPayment(JSON.parse(rawPayment));
      const rawConfirm = sessionStorage.getItem(`bus-confirmation:${tripId}`);
      if (rawConfirm) setConfirmation(JSON.parse(rawConfirm));
    } catch {
      // ignore
    }
  }, [tripId]);

  const passengerTitle = TITLE_MAP[form?.passengerTitle] || "";
  const passengerName = form?.passengerFullName || "Chưa cập nhật";
  const passengerDisplay = passengerTitle
    ? `${passengerTitle} ${passengerName}`
    : passengerName;

  const contactName = form?.contactFullName || "Chưa cập nhật";
  const contactPhone = form?.contactPhone
    ? `${form.contactPhoneCountry || ""}${form.contactPhone}`.trim()
    : "Chưa cập nhật";
  const contactEmail = form?.contactEmail || "Chưa cập nhật";

  const methodId =
    confirmation?.methodId || payment?.methodId || "vietqr";
  const methodLabel = METHOD_LABEL[methodId] || "VietQR";
  const total =
    typeof confirmation?.total === "number"
      ? confirmation.total
      : typeof payment?.total === "number"
      ? payment.total
      : subtotal;

  const qrPayload = `VIEGO|BUS|ETICKET|BOOKING:${bookingCode}|TICKET:${ticketCode}|TRIP:${tripId}|AMOUNT:${total}`;

  return (
    <section className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
      <div className="bg-gradient-to-r from-sky-600 to-sky-500 text-white px-6 py-4 flex items-center gap-3">
        <svg
          viewBox="0 0 24 24"
          className="w-6 h-6"
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
        <h2 className="text-lg md:text-xl font-bold">Vé điện tử xe khách</h2>
      </div>

      <div className="px-6 py-5 grid grid-cols-1 md:grid-cols-[1fr_200px] gap-6 border-b border-dashed border-slate-200">
        <div className="min-w-0">
          <div className="text-xs uppercase tracking-wide text-slate-500">
            Tuyến đường
          </div>
          <div className="text-lg md:text-xl font-extrabold text-slate-900 mt-1">
            {fromCityName}{" "}
            <span className="text-sky-500 mx-1">→</span>{" "}
            {toCityName}
          </div>
          <div className="text-sm text-slate-600 mt-1">{dateLong}</div>

          <div className="mt-4 grid grid-cols-2 gap-4">
            <div>
              <div className="text-xs text-slate-500 mb-1">Giờ khởi hành</div>
              <div className="text-lg font-bold text-slate-900">
                {trip.departureTime}
              </div>
              <div className="text-xs text-slate-600 mt-0.5">
                {trip.pickup.name}
              </div>
            </div>
            <div>
              <div className="text-xs text-slate-500 mb-1">Giờ đến</div>
              <div className="text-lg font-bold text-slate-900">
                {trip.arrivalTime}
                {trip.nextDay && (
                  <sup className="text-[10px] text-slate-500 font-semibold ml-0.5">
                    +1
                  </sup>
                )}
              </div>
              <div className="text-xs text-slate-600 mt-0.5">
                {trip.dropoff.name}
              </div>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <div>
              <span className="text-slate-500">Nhà xe: </span>
              <span className="font-semibold text-slate-800">
                {trip.operator.name}
              </span>
            </div>
            <div>
              <span className="text-slate-500">Loại xe: </span>
              <span className="font-semibold text-slate-800">
                {trip.operator.vehicleShort}
              </span>
            </div>
            <div>
              <span className="text-slate-500">Thời lượng: </span>
              <span className="font-semibold text-slate-800">
                {trip.duration}
              </span>
            </div>
          </div>
        </div>

        <div className="flex md:block justify-center">
          <BusTicketQrBlock payload={qrPayload} label="Xuất trình khi lên xe" />
        </div>
      </div>

      <div className="px-6 py-5 grid grid-cols-1 md:grid-cols-2 gap-6 border-b border-dashed border-slate-200">
        <div>
          <h3 className="text-xs uppercase tracking-wide text-slate-500 mb-3 font-semibold">
            Hành khách
          </h3>
          <dl className="space-y-2">
            <Row label="Họ tên" value={passengerDisplay} />
            <Row label="Loại" value="Người lớn" />
            <Row
              label="Số ghế"
              value={form?.selectedSeat || "Sẽ được sắp xếp khi lên xe"}
            />
          </dl>
        </div>
        <div>
          <h3 className="text-xs uppercase tracking-wide text-slate-500 mb-3 font-semibold">
            Thông tin liên hệ
          </h3>
          <dl className="space-y-2">
            <Row label="Họ tên" value={contactName} />
            <Row label="Điện thoại" value={contactPhone} />
            <Row label="Email" value={contactEmail} />
          </dl>
        </div>
      </div>

      <div className="px-6 py-5 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-xs uppercase tracking-wide text-slate-500 mb-3 font-semibold">
            Mã đặt chỗ & vé
          </h3>
          <dl className="space-y-2">
            <Row label="Mã đặt chỗ" value={bookingCode} mono />
            <Row label="Mã vé điện tử" value={ticketCode} mono />
            <Row label="Số lượng vé" value={`${seats} vé`} />
          </dl>
        </div>
        <div>
          <h3 className="text-xs uppercase tracking-wide text-slate-500 mb-3 font-semibold">
            Thanh toán
          </h3>
          <dl className="space-y-2">
            <Row label="Phương thức" value={methodLabel} />
            <Row
              label="Tổng đã thanh toán"
              value={
                <span className="text-orange-500 font-bold">
                  {total.toLocaleString("vi-VN")} VND
                </span>
              }
            />
            <Row label="Trạng thái" value="Đã thanh toán" />
          </dl>
        </div>
      </div>
    </section>
  );
}
