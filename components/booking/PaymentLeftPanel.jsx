"use client";

import { useState } from "react";
import Link from "next/link";
import PaymentCountdownBanner from "./PaymentCountdownBanner";

const METHODS = [
  {
    id: "vietqr",
    label: "VietQR",
    tag: "VietQR",
    tagColor: "text-sky-700",
    ctaText: "Thanh toán & Hiển thị mã QR",
  },
  {
    id: "vietinbank-transfer",
    label: "Chuyển tiền qua VietinBank",
    note: "Các bước thanh toán dễ dàng và xác minh nhanh hơn",
    tag: "VietinBank",
    tagColor: "text-blue-800",
    ctaText: "Thanh toán qua VietinBank",
  },
  {
    id: "digital-wallet",
    label: "Digital Wallet",
    tag: "Apple Pay · MoMo · ZaloPay · ShopeePay",
    tagColor: "text-slate-500",
    ctaText: "Chuyển tới ví điện tử",
  },
  {
    id: "mobile-banking",
    label: "Ngân hàng di động",
    tag: "App ngân hàng",
    tagColor: "text-slate-500",
    ctaText: "Mở ứng dụng ngân hàng",
  },
  {
    id: "card",
    label: "Thẻ thanh toán",
    tag: "Visa · Mastercard · JCB · AMEX",
    tagColor: "text-slate-500",
    ctaText: "Thanh toán bằng thẻ",
  },
  {
    id: "in-store",
    label: "Tại cửa hàng",
    tag: "FPT · Circle K · FamilyMart · VinMart +15",
    tagColor: "text-slate-500",
    ctaText: "Xem hướng dẫn thanh toán",
  },
  {
    id: "installment",
    label: "Trả góp thẻ tín dụng",
    note: "Dưới mức tối thiểu",
    disabled: true,
    tag: "Trả góp",
    tagColor: "text-slate-400",
    ctaText: "Không khả dụng",
  },
];

function MethodRow({ method, checked, onChange }) {
  return (
    <label
      className={
        "flex items-center gap-3 px-5 py-4 cursor-pointer transition " +
        (method.disabled ? "opacity-50 cursor-not-allowed " : "") +
        (checked ? "bg-sky-50" : "hover:bg-slate-50")
      }
    >
      <input
        type="radio"
        name="paymentMethod"
        value={method.id}
        checked={checked}
        disabled={method.disabled}
        onChange={() => onChange(method.id)}
        className="w-4 h-4 text-sky-600"
      />
      <div className="flex-1 min-w-0">
        <div
          className={
            "font-semibold " +
            (method.disabled ? "text-slate-400" : "text-slate-800")
          }
        >
          {method.label}
        </div>
        {method.note && (
          <div className="mt-1 text-xs text-sky-600 bg-sky-50 inline-block px-2 py-0.5 rounded">
            {method.note}
          </div>
        )}
      </div>
      {method.tag && (
        <div
          className={"text-xs font-semibold shrink-0 " + (method.tagColor || "text-slate-500")}
        >
          {method.tag}
        </div>
      )}
    </label>
  );
}

export default function PaymentLeftPanel({
  ratePlan,
  locationSlug,
  hotelSlug,
  roomSectionId,
  ratePlanId,
}) {
  const [selected, setSelected] = useState("vietqr");
  const method = METHODS.find((m) => m.id === selected) || METHODS[0];

  const qrHref = `/booking/${encodeURIComponent(
    locationSlug
  )}/${encodeURIComponent(
    hotelSlug
  )}/payment/qr?roomSectionId=${encodeURIComponent(
    roomSectionId
  )}&ratePlanId=${encodeURIComponent(ratePlanId)}`;

  const ctaClasses =
    "w-full py-4 rounded-xl bg-orange-500 hover:bg-orange-600 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold text-base transition text-center block";

  return (
    <div className="space-y-5">
      <PaymentCountdownBanner />

      <section className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <div className="px-5 pt-5 pb-3 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900">
            Bạn muốn thanh toán thế nào?
          </h2>
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-sky-600">
            <svg
              viewBox="0 0 24 24"
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2l3 7h7l-5.5 4 2 7L12 16l-6.5 4 2-7L2 9h7z" />
            </svg>
            Thanh toán an toàn
          </span>
        </div>
        <div className="divide-y divide-gray-100">
          {METHODS.map((m) => (
            <MethodRow
              key={m.id}
              method={m}
              checked={selected === m.id}
              onChange={setSelected}
            />
          ))}
        </div>
      </section>

      <section className="bg-white rounded-2xl border border-gray-200 p-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <svg
            viewBox="0 0 24 24"
            className="w-6 h-6 text-sky-600"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 12L12 20a4 4 0 0 1-5.66-5.66L14 6.34a2.83 2.83 0 1 1 4 4L10.59 18a2 2 0 0 1-2.83-2.83l7.07-7.07" />
          </svg>
          <div>
            <div className="font-bold text-slate-900">Thêm mã giảm</div>
            <div className="text-xs text-slate-500 mt-0.5">
              Enter coupon code or select available coupon(s)
            </div>
          </div>
        </div>
        <button
          type="button"
          className="text-sky-600 hover:text-sky-700 font-semibold text-sm"
        >
          Thêm mã
        </button>
      </section>

      <section className="bg-white rounded-2xl border border-gray-200 p-5 flex items-center justify-between">
        <h3 className="text-lg font-bold text-slate-900">Tổng giá tiền</h3>
        <div className="flex items-center gap-2">
          <div className="text-xl font-bold text-slate-900">
            {ratePlan.totalPrice.toLocaleString("vi-VN")} VND
          </div>
          <svg
            viewBox="0 0 24 24"
            className="w-4 h-4 text-slate-500"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </section>

      <div>
        {selected === "vietqr" ? (
          <Link href={qrHref} className={ctaClasses}>
            {method.ctaText}
          </Link>
        ) : (
          <button
            type="button"
            disabled={method.disabled}
            className={ctaClasses}
          >
            {method.ctaText}
          </button>
        )}
        <p className="text-xs text-slate-500 mt-3 leading-relaxed text-center">
          Bằng cách tiếp tục thanh toán, bạn đã đồng ý với{" "}
          <a href="#" className="text-sky-600 hover:underline">
            Điều khoản & Điều kiện
          </a>{" "}
          và{" "}
          <a href="#" className="text-sky-600 hover:underline">
            Chính sách quyền riêng tư
          </a>
          .
        </p>
      </div>
    </div>
  );
}
