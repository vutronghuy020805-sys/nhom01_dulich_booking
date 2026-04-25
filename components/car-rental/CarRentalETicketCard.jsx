"use client";

import { useEffect, useState } from "react";
import CarRentalTicketQrBlock from "./CarRentalTicketQrBlock";
import { formatVnd } from "@/data/carRentalRental";

const TITLE_MAP = {
  ong: "Ông",
  ba: "Bà",
  anh: "Anh",
  chi: "Chị",
};

const METHOD_LABEL = {
  vietqr: "VietQR",
  "digital-wallet": "Ví điện tử",
  "mobile-banking": "Ngân hàng di động",
  card: "Thẻ thanh toán",
  store: "Thanh toán tại cửa hàng",
  "vietinbank-transfer": "Chuyển khoản VietinBank",
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

export default function CarRentalETicketCard({
  vehicleId,
  bookingCode,
  ticketCode,
  summary,
  startDateTimeLabel,
  endDateTimeLabel,
  subtotal,
}) {
  const [form, setForm] = useState(null);
  const [payment, setPayment] = useState(null);
  const [confirmation, setConfirmation] = useState(null);
  const [review, setReview] = useState(null);

  useEffect(() => {
    try {
      const rawBooking = sessionStorage.getItem(
        `viego:car-rental:booking:${vehicleId}`
      );
      if (rawBooking) setForm(JSON.parse(rawBooking));
      const rawPayment = sessionStorage.getItem(
        `viego:car-rental:payment:selection:${vehicleId}`
      );
      if (rawPayment) setPayment(JSON.parse(rawPayment));
      const rawConfirm = sessionStorage.getItem(
        `viego:car-rental:confirmation:${vehicleId}`
      );
      if (rawConfirm) setConfirmation(JSON.parse(rawConfirm));
      const rawReview = sessionStorage.getItem(
        `viego:car-rental:review:${vehicleId}`
      );
      if (rawReview) setReview(JSON.parse(rawReview));
    } catch {
      // ignore
    }
  }, [vehicleId]);

  const passengerTitle = TITLE_MAP[form?.passengerTitle] || "";
  const passengerName = form?.passengerFullName || "Chưa cập nhật";
  const passengerDisplay = passengerTitle
    ? `${passengerTitle} ${passengerName}`
    : passengerName;
  const passengerPhone = form?.passengerPhone
    ? `${form.passengerPhoneCountry || ""}${form.passengerPhone}`.replace(/\s+/g, "")
    : "Chưa cập nhật";

  const contactTitle = TITLE_MAP[form?.contactTitle] || "";
  const contactName = form?.contactFullName || "Chưa cập nhật";
  const contactDisplay = contactTitle
    ? `${contactTitle} ${contactName}`
    : contactName;
  const contactPhone = form?.contactPhone
    ? `${form.contactPhoneCountry || ""}${form.contactPhone}`.replace(/\s+/g, "")
    : "Chưa cập nhật";
  const contactEmail = form?.contactEmail || "Chưa cập nhật";

  const specialRequest = (review?.specialRequest || "").trim();

  const methodId = confirmation?.methodId || payment?.methodId || "vietqr";
  const methodLabel = METHOD_LABEL[methodId] || "VietQR";
  const total =
    typeof confirmation?.total === "number"
      ? confirmation.total
      : typeof payment?.total === "number"
      ? payment.total
      : subtotal;

  const qrPayload = `VIEGO|CAR|ETICKET|BOOKING:${bookingCode}|CONFIRM:${ticketCode}|VEHICLE:${vehicleId}|AMOUNT:${total}`;

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
          <path d="M14 16H9m10 0h3v-3.15a1 1 0 0 0-.4-.8l-1.9-1.4L17 7a2 2 0 0 0-1.8-1.1H9.8A2 2 0 0 0 8 7L5.3 10.65l-1.9 1.4a1 1 0 0 0-.4.8V16h3" />
          <circle cx="7" cy="16" r="2" />
          <circle cx="17" cy="16" r="2" />
        </svg>
        <div className="flex-1 min-w-0">
          <h2 className="text-lg md:text-xl font-bold">Vé điện tử thuê xe</h2>
          <div className="text-xs text-sky-50 mt-0.5">
            {summary.serviceLabel}
          </div>
        </div>
      </div>

      <div className="px-6 py-5 grid grid-cols-1 md:grid-cols-[1fr_200px] gap-6 border-b border-dashed border-slate-200">
        <div className="min-w-0">
          <div className="text-xs uppercase tracking-wide text-slate-500">
            Gói thuê xe
          </div>
          <div className="text-lg md:text-xl font-extrabold text-slate-900 mt-1">
            {summary.packageLabel}
          </div>
          <div className="text-sm text-slate-600 mt-1">
            Cung cấp bởi {summary.provider}
          </div>
          <div className="text-sm text-slate-600 mt-0.5">
            Khu vực: {summary.locationName}
          </div>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <div className="text-xs text-slate-500 mb-1">Nhận xe</div>
              <div className="text-base font-bold text-slate-900">
                {startDateTimeLabel}
              </div>
              <div className="text-xs text-slate-600 mt-0.5">
                {summary.pickupPoint}
              </div>
            </div>
            <div>
              <div className="text-xs text-slate-500 mb-1">Trả xe</div>
              <div className="text-base font-bold text-slate-900">
                {endDateTimeLabel}
              </div>
              <div className="text-xs text-slate-600 mt-0.5">
                {summary.dropoffPoint}
              </div>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <div>
              <span className="text-slate-500">Xe: </span>
              <span className="font-semibold text-slate-800">
                {summary.vehicleName}
              </span>
            </div>
            <div>
              <span className="text-slate-500">Thời lượng: </span>
              <span className="font-semibold text-slate-800">
                {summary.rentalDuration}
              </span>
            </div>
          </div>
        </div>

        <div className="flex md:block justify-center">
          <CarRentalTicketQrBlock
            payload={qrPayload}
            label="Xuất trình khi nhận xe"
          />
        </div>
      </div>

      <div className="px-6 py-5 grid grid-cols-1 md:grid-cols-2 gap-6 border-b border-dashed border-slate-200">
        <div>
          <h3 className="text-xs uppercase tracking-wide text-slate-500 mb-3 font-semibold">
            Người thuê xe
          </h3>
          <dl className="space-y-2">
            <Row label="Họ tên" value={passengerDisplay} />
            <Row label="Điện thoại" value={passengerPhone} />
          </dl>
        </div>
        <div>
          <h3 className="text-xs uppercase tracking-wide text-slate-500 mb-3 font-semibold">
            Thông tin liên hệ
          </h3>
          <dl className="space-y-2">
            <Row label="Họ tên" value={contactDisplay} />
            <Row label="Điện thoại" value={contactPhone} />
            <Row label="Email" value={contactEmail} />
          </dl>
        </div>
      </div>

      <div className="px-6 py-5 border-b border-dashed border-slate-200">
        <h3 className="text-xs uppercase tracking-wide text-slate-500 mb-2 font-semibold">
          Yêu cầu đặc biệt
        </h3>
        <p className="text-sm text-slate-700 leading-relaxed">
          {specialRequest || "Không có yêu cầu đặc biệt"}
        </p>
      </div>

      <div className="px-6 py-5 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-xs uppercase tracking-wide text-slate-500 mb-3 font-semibold">
            Mã đặt chỗ & xác nhận
          </h3>
          <dl className="space-y-2">
            <Row label="Mã đặt chỗ" value={bookingCode} mono />
            <Row label="Mã xác nhận thuê xe" value={ticketCode} mono />
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
                  {formatVnd(total)}
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
