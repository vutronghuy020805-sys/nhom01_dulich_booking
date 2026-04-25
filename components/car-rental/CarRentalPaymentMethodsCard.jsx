"use client";

const METHODS = [
  {
    id: "vietqr",
    label: "VietQR",
    tag: "VietQR",
    tagColor: "text-red-600",
    ctaText: "Thanh toán & Hiển thị mã QR",
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
    id: "store",
    label: "Tại cửa hàng",
    tag: "FPT · Circle K · FamilyMart · VinMart · +15 more",
    tagColor: "text-slate-500",
    ctaText: "Lấy mã thanh toán tại cửa hàng",
  },
  {
    id: "vietinbank-transfer",
    label: "Chuyển tiền qua VietinBank",
    note: "Không hỗ trợ",
    disabled: true,
    tag: "VietinBank",
    tagColor: "text-slate-400",
    ctaText: "Không khả dụng",
  },
];

export const CAR_RENTAL_PAYMENT_METHODS = METHODS;
export const DEFAULT_CAR_RENTAL_PAYMENT_METHOD_ID = "vietqr";

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
        name="carRentalPaymentMethod"
        value={method.id}
        checked={checked}
        disabled={method.disabled}
        onChange={() => onChange(method.id)}
        className="w-4 h-4 accent-sky-500"
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
          <div
            className={
              "mt-1 text-xs inline-block px-2 py-0.5 rounded " +
              (method.disabled
                ? "text-slate-400 bg-slate-100"
                : "text-sky-600 bg-sky-50")
            }
          >
            {method.note}
          </div>
        )}
      </div>
      {method.tag && (
        <div
          className={
            "text-xs font-semibold shrink-0 text-right max-w-[180px] " +
            (method.tagColor || "text-slate-500")
          }
        >
          {method.tag}
        </div>
      )}
    </label>
  );
}

export default function CarRentalPaymentMethodsCard({ selected, onChange }) {
  return (
    <section className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
      <div className="px-5 pt-5 pb-3 flex items-center justify-between gap-3">
        <h2 className="text-lg md:text-xl font-bold text-slate-900">
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
            aria-hidden
          >
            <path d="M12 2l3 7h7l-5.5 4 2 7L12 16l-6.5 4 2-7L2 9h7z" />
          </svg>
          Thanh toán an toàn
        </span>
      </div>
      <div className="divide-y divide-slate-100">
        {METHODS.map((m) => (
          <MethodRow
            key={m.id}
            method={m}
            checked={selected === m.id}
            onChange={onChange}
          />
        ))}
      </div>
    </section>
  );
}
