"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const METHODS = [
  {
    id: "vietqr",
    label: "VietQR",
    badges: [
      {
        type: "text",
        value: "VietQR",
        className: "bg-white text-sky-700 border-sky-200",
      },
    ],
  },
  {
    id: "e-wallet",
    label: "Ví điện tử",
    badges: [
      { type: "img", src: "https://cdn.simpleicons.org/applepay/000000", alt: "Apple Pay" },
      { type: "text", value: "MoMo", className: "bg-pink-50 text-pink-600 border-pink-200" },
      { type: "text", value: "ZaloPay", className: "bg-sky-50 text-sky-700 border-sky-200" },
      { type: "text", value: "ShopeePay", className: "bg-orange-50 text-orange-600 border-orange-200" },
    ],
  },
  {
    id: "mobile-banking",
    label: "Ngân hàng di động",
    badges: [{ type: "icon", name: "smartphone" }],
  },
  {
    id: "card",
    label: "Thẻ thanh toán",
    badges: [
      { type: "img", src: "https://cdn.simpleicons.org/visa", alt: "Visa" },
      { type: "img", src: "https://cdn.simpleicons.org/mastercard", alt: "Mastercard" },
      { type: "img", src: "https://cdn.simpleicons.org/jcb", alt: "JCB" },
    ],
  },
  {
    id: "in-store",
    label: "Tại cửa hàng",
    badges: [
      { type: "text", value: "FPT", className: "bg-white text-slate-600 border-slate-200" },
      { type: "text", value: "Circle K", className: "bg-white text-slate-600 border-slate-200" },
      { type: "text", value: "FamilyMart", className: "bg-white text-slate-600 border-slate-200" },
      { type: "text", value: "+15 more", className: "bg-slate-100 text-slate-500 border-slate-200" },
    ],
  },
];

function formatPrice(value) {
  return `${new Intl.NumberFormat("vi-VN").format(value)} VND`;
}

function SmartphoneIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-5 h-5 text-slate-500"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="7" y="2.5" width="10" height="19" rx="2.5" />
      <line x1="11" y1="18" x2="13" y2="18" />
    </svg>
  );
}

function Badge({ badge }) {
  if (badge.type === "img") {
    return (
      <div className="inline-flex items-center justify-center h-7 min-w-10 px-1.5 rounded bg-white border border-slate-200">
        <img
          src={badge.src}
          alt={badge.alt}
          className="max-h-5 max-w-10 object-contain"
        />
      </div>
    );
  }
  if (badge.type === "icon") {
    return (
      <div className="inline-flex items-center justify-center h-7 w-7 rounded bg-white border border-slate-200">
        <SmartphoneIcon />
      </div>
    );
  }
  return (
    <span
      className={
        "inline-flex items-center h-7 px-2 rounded text-[11px] font-semibold border whitespace-nowrap " +
        (badge.className || "bg-white text-slate-600 border-slate-200")
      }
    >
      {badge.value}
    </span>
  );
}

function MethodRow({ method, checked, onChange }) {
  return (
    <label
      className={
        "flex items-center gap-3 px-5 py-4 cursor-pointer transition " +
        (checked ? "bg-sky-50" : "hover:bg-slate-50")
      }
    >
      <input
        type="radio"
        name="activityPaymentMethod"
        value={method.id}
        checked={checked}
        onChange={() => onChange(method.id)}
        className="w-4 h-4 accent-sky-600 shrink-0"
      />
      <div className="flex-1 min-w-0 font-semibold text-slate-800">
        {method.label}
      </div>
      <div className="flex items-center gap-1.5 flex-wrap justify-end">
        {method.badges.map((badge, idx) => (
          <Badge key={idx} badge={badge} />
        ))}
      </div>
    </label>
  );
}

export default function ActivityPaymentLeftPanel({ bookingContext }) {
  const router = useRouter();
  const { slug, ticket, quantities, totalPrice } = bookingContext;
  const [selected, setSelected] = useState("vietqr");
  const [error, setError] = useState("");

  const buildQuery = () => {
    const params = new URLSearchParams({
      ticket: ticket.id,
      adult: String(quantities.adult),
      senior: String(quantities.senior),
      child: String(quantities.child),
      method: selected,
    });
    return params.toString();
  };

  const handlePay = () => {
    if (!selected) {
      setError("Vui lòng chọn phương thức thanh toán.");
      return;
    }
    if (totalPrice <= 0) {
      setError("Đơn không có vé hợp lệ để thanh toán.");
      return;
    }
    setError("");
    const query = buildQuery();
    const nextUrl =
      selected === "vietqr"
        ? `/activities/${slug}/payment/qr?${query}`
        : `/activities/${slug}/confirmation?${query}`;
    router.push(nextUrl);
  };

  return (
    <div className="space-y-5">
      <section className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-[0_1px_2px_rgba(15,23,42,0.03)]">
        <div className="px-5 py-4 bg-sky-50 border-b border-slate-200">
          <h2 className="text-base md:text-lg font-bold text-slate-900">
            Chọn hình thức thanh toán
          </h2>
        </div>
        <div className="divide-y divide-slate-100">
          {METHODS.map((m) => (
            <MethodRow
              key={m.id}
              method={m}
              checked={selected === m.id}
              onChange={(id) => {
                setSelected(id);
                setError("");
              }}
            />
          ))}
        </div>
      </section>

      <section className="bg-white rounded-2xl border border-slate-200 p-5 shadow-[0_1px_2px_rgba(15,23,42,0.03)] flex items-center justify-between gap-4">
        <h3 className="text-base md:text-lg font-bold text-slate-900">
          Tổng giá tiền
        </h3>
        <div className="text-xl md:text-2xl font-bold text-orange-500">
          {formatPrice(totalPrice)}
        </div>
      </section>

      {error ? (
        <div className="text-sm text-rose-600 bg-rose-50 border border-rose-200 rounded-lg px-4 py-3">
          {error}
        </div>
      ) : null}

      <button
        type="button"
        onClick={handlePay}
        className="w-full py-4 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-base shadow-sm transition"
      >
        Thanh toán
      </button>

      <p className="text-xs text-slate-500 leading-relaxed text-center">
        Bằng cách tiếp tục thanh toán, bạn đã đồng ý với{" "}
        <a href="#" className="text-sky-600 hover:underline">
          Điều khoản & Điều kiện
        </a>{" "}
        và{" "}
        <a href="#" className="text-sky-600 hover:underline">
          Chính sách quyền riêng tư
        </a>{" "}
        của VieGo.
      </p>
    </div>
  );
}
