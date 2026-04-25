"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import PaymentCouponBox from "@/components/shared/PaymentCouponBox";

function formatVnd(value) {
  return value.toLocaleString("vi-VN") + " VND";
}

function VietQRLogo() {
  return (
    <span className="inline-flex items-center font-extrabold tracking-tight text-[15px]">
      <span className="text-rose-600 italic">Viet</span>
      <span className="bg-rose-600 text-white px-1.5 rounded-sm italic">
        QR
      </span>
      <sup className="ml-0.5 text-[9px] text-rose-600 font-semibold">TM</sup>
    </span>
  );
}

function ApplePayLogo() {
  return (
    <span className="inline-flex items-center gap-1 bg-black text-white text-xs font-semibold rounded-md px-2 py-1 h-7">
      <svg
        viewBox="0 0 24 24"
        className="w-3 h-3"
        fill="currentColor"
        aria-hidden
      >
        <path d="M17.5 12.5c0-2.2 1.8-3.3 1.9-3.3-1-1.5-2.6-1.7-3.2-1.7-1.4-.1-2.7.8-3.4.8-.7 0-1.8-.8-3-.8-1.6 0-3 .9-3.8 2.3-1.6 2.8-.4 7 1.2 9.3.8 1.1 1.7 2.4 3 2.3 1.2-.1 1.6-.8 3-.8s1.9.8 3.2.7c1.3 0 2.1-1.1 2.9-2.3.9-1.3 1.3-2.6 1.3-2.6s-2.5-.9-2.5-3.8zM15 5.6c.7-.8 1.1-1.9 1-3-1 .1-2.1.7-2.8 1.5-.6.7-1.2 1.8-1 2.9 1.1.1 2.2-.6 2.8-1.4z" />
      </svg>
      <span>Pay</span>
    </span>
  );
}

function MomoLogo() {
  return (
    <span className="inline-flex items-center justify-center bg-pink-600 text-white text-[11px] font-black rounded-md w-10 h-7 leading-none tracking-tight">
      MO
      <br />
      MO
    </span>
  );
}

function ZaloPayLogo() {
  return (
    <span className="inline-flex flex-col items-center justify-center bg-sky-500 text-white rounded-md w-10 h-7 leading-[10px] text-[9px] font-bold">
      <span>Zalo</span>
      <span>Pay</span>
    </span>
  );
}

function ShopeePayLogo() {
  return (
    <span className="inline-flex items-center justify-center bg-orange-500 text-white rounded-md px-2 h-7 text-[10px] font-black leading-tight">
      <span className="flex flex-col items-center">
        <span>Shopee</span>
        <span>Pay</span>
      </span>
    </span>
  );
}

function MobileBankIcon() {
  return (
    <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-sky-100 text-sky-600">
      <svg
        viewBox="0 0 24 24"
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <rect x="7" y="3" width="10" height="18" rx="2" />
        <line x1="12" y1="18" x2="12" y2="18" />
      </svg>
    </span>
  );
}

function VisaLogo() {
  return (
    <span className="inline-flex items-center justify-center h-7 px-2 text-blue-900 font-black italic text-[15px] tracking-tight">
      VISA
    </span>
  );
}

function JCBLogo() {
  return (
    <span className="inline-flex items-center h-7 rounded-sm overflow-hidden font-black text-[11px] tracking-tight">
      <span className="bg-blue-700 text-white px-1.5 h-full inline-flex items-center">
        J
      </span>
      <span className="bg-rose-600 text-white px-1.5 h-full inline-flex items-center">
        C
      </span>
      <span className="bg-emerald-600 text-white px-1.5 h-full inline-flex items-center">
        B
      </span>
    </span>
  );
}

function CircleKLogo() {
  return (
    <span className="inline-flex items-center justify-center bg-rose-600 text-white rounded-full h-7 px-2 text-[10px] font-black">
      CIRCLE K
    </span>
  );
}

function FamilyMartLogo() {
  return (
    <span className="inline-flex items-center h-7 gap-1 text-[11px] font-black">
      <span className="inline-flex gap-0.5">
        <span className="w-1.5 h-5 bg-emerald-500" />
        <span className="w-1.5 h-5 bg-white border border-slate-200" />
        <span className="w-1.5 h-5 bg-sky-600" />
      </span>
      <span className="text-sky-900">FamilyMart</span>
    </span>
  );
}

function FptLogo() {
  return (
    <span className="inline-flex items-center justify-center h-7 px-2 text-orange-500 font-black text-[13px]">
      FPT
    </span>
  );
}

const METHODS = [
  {
    id: "vietqr",
    label: "VietQR",
    renderLogos: () => <VietQRLogo />,
  },
  {
    id: "ewallet",
    label: "Ví điện tử",
    renderLogos: () => (
      <div className="flex items-center gap-1.5">
        <ApplePayLogo />
        <MomoLogo />
        <ZaloPayLogo />
        <ShopeePayLogo />
      </div>
    ),
  },
  {
    id: "mobile-banking",
    label: "Ngân hàng di động",
    renderLogos: () => <MobileBankIcon />,
  },
  {
    id: "card",
    label: "Thẻ thanh toán",
    renderLogos: () => (
      <div className="flex items-center gap-2">
        <VisaLogo />
        <JCBLogo />
      </div>
    ),
  },
  {
    id: "store",
    label: "Tại cửa hàng",
    renderLogos: () => (
      <div className="flex items-center gap-1.5">
        <FptLogo />
        <CircleKLogo />
        <FamilyMartLogo />
        <span className="inline-flex items-center h-6 px-1.5 rounded bg-slate-100 text-slate-600 text-[10px] font-semibold">
          +15 more
        </span>
      </div>
    ),
  },
];

export default function AirportTransferPaymentPanel({
  totalPrice,
  baseQuery = "",
  nextHref = "/airport-transfer/confirmation",
}) {
  const router = useRouter();
  const [selected, setSelected] = useState("vietqr");
  const [submitting, setSubmitting] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  const discount = appliedCoupon?.discount || 0;
  const finalTotal = Math.max(0, totalPrice - discount);

  const handlePay = () => {
    if (submitting) return;
    setSubmitting(true);
    const method = METHODS.find((m) => m.id === selected);
    const params = new URLSearchParams(baseQuery);
    params.set("paymentMethod", method?.label || selected);
    params.set("paymentMethodId", selected);
    params.set("paymentStatus", "paid");
    params.set("paidAt", new Date().toISOString());
    if (appliedCoupon) {
      params.set("couponCode", appliedCoupon.code);
      params.set("discount", String(discount));
    }
    params.set("totalPrice", String(finalTotal));
    router.push(`${nextHref}?${params.toString()}`);
  };

  return (
    <div className="space-y-5">
      <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="bg-sky-50 px-5 md:px-6 py-3.5 border-b border-sky-100">
          <h2 className="text-base md:text-lg font-bold text-slate-900">
            Chọn hình thức thanh toán
          </h2>
        </div>

        <ul className="divide-y divide-slate-100">
          {METHODS.map((method) => {
            const isSelected = selected === method.id;
            return (
              <li key={method.id}>
                <label
                  className={
                    "flex items-center gap-3 px-5 md:px-6 py-4 cursor-pointer transition-colors " +
                    (isSelected ? "bg-sky-50/60" : "hover:bg-slate-50")
                  }
                >
                  <span
                    className={
                      "inline-flex items-center justify-center w-5 h-5 rounded-full border-2 shrink-0 transition-colors " +
                      (isSelected
                        ? "border-sky-500"
                        : "border-slate-300")
                    }
                  >
                    {isSelected ? (
                      <span className="w-2.5 h-2.5 rounded-full bg-sky-500" />
                    ) : null}
                  </span>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={method.id}
                    checked={isSelected}
                    onChange={() => setSelected(method.id)}
                    className="sr-only"
                  />
                  <span className="flex-1 text-sm md:text-base font-medium text-slate-800">
                    {method.label}
                  </span>
                  <span className="shrink-0">{method.renderLogos()}</span>
                </label>
              </li>
            );
          })}
        </ul>
      </section>

      <PaymentCouponBox
        subtotal={totalPrice}
        appliedCode={appliedCoupon?.code || null}
        onApply={setAppliedCoupon}
        onRemove={() => setAppliedCoupon(null)}
      />

      <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 md:p-6">
        <dl className="space-y-2 text-sm">
          <div className="flex justify-between">
            <dt className="text-slate-600">Tạm tính</dt>
            <dd className="font-semibold text-slate-900">
              {formatVnd(totalPrice)}
            </dd>
          </div>
          {discount > 0 ? (
            <div className="flex justify-between">
              <dt className="text-slate-600">
                Giảm giá
                {appliedCoupon?.code ? (
                  <span className="ml-1 text-xs text-emerald-600">
                    ({appliedCoupon.code})
                  </span>
                ) : null}
              </dt>
              <dd className="font-semibold text-emerald-600">
                -{formatVnd(discount)}
              </dd>
            </div>
          ) : null}
          <div className="flex items-center justify-between gap-4 pt-2 border-t border-slate-100">
            <dt className="text-base md:text-lg font-bold text-slate-900">
              Tổng giá tiền
            </dt>
            <dd className="text-xl md:text-2xl font-bold text-orange-500">
              {formatVnd(finalTotal)}
            </dd>
          </div>
        </dl>
        <button
          type="button"
          onClick={handlePay}
          disabled={submitting}
          className="mt-4 w-full inline-flex items-center justify-center px-8 py-3 rounded-lg bg-orange-500 hover:bg-orange-600 disabled:opacity-70 text-white font-semibold transition-colors shadow"
        >
          {submitting ? "Đang xử lý..." : "Thanh toán"}
        </button>
      </section>
    </div>
  );
}
