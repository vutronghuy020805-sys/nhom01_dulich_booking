"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const TITLES = ["Ông", "Bà", "Cô", "Anh", "Chị"];

const COUNTRY_CODES = [
  { code: "+84", flag: "🇻🇳", label: "Việt Nam" },
  { code: "+1", flag: "🇺🇸", label: "United States" },
  { code: "+44", flag: "🇬🇧", label: "United Kingdom" },
  { code: "+81", flag: "🇯🇵", label: "Japan" },
  { code: "+82", flag: "🇰🇷", label: "Korea" },
  { code: "+65", flag: "🇸🇬", label: "Singapore" },
  { code: "+66", flag: "🇹🇭", label: "Thailand" },
];

function formatVnd(value) {
  return value.toLocaleString("vi-VN") + " VND";
}

function ChevronDownIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-4 h-4 text-slate-500"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

export default function AirportTransferContactForm({
  totalPrice,
  nextQuery,
  nextHref = "/airport-transfer/payment",
}) {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [fullName, setFullName] = useState("");
  const [dialCode, setDialCode] = useState("+84");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});

  const clearError = (field) =>
    setErrors((prev) => {
      if (!prev[field]) return prev;
      const n = { ...prev };
      delete n[field];
      return n;
    });

  const validate = () => {
    const e = {};
    if (!title) e.title = "Vui lòng chọn danh xưng.";
    if (!fullName.trim()) e.fullName = "Vui lòng nhập họ tên.";
    if (!phone.trim()) {
      e.phone = "Vui lòng nhập số điện thoại.";
    } else if (!/^\d{6,15}$/.test(phone.replace(/\D/g, ""))) {
      e.phone = "Số điện thoại không hợp lệ.";
    }
    if (!email.trim()) {
      e.email = "Vui lòng nhập email.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      e.email = "Email không hợp lệ.";
    }
    return e;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const next = validate();
    if (Object.keys(next).length > 0) {
      setErrors(next);
      return;
    }
    setErrors({});

    const base = new URLSearchParams(nextQuery || "");
    base.set("title", title);
    base.set("fullName", fullName.trim());
    base.set("phone", `${dialCode}${phone.replace(/\D/g, "")}`);
    base.set("email", email.trim());

    router.push(`${nextHref}?${base.toString()}`);
  };

  const fieldClass = (hasError) =>
    "w-full rounded-lg border bg-white px-3 py-2.5 text-sm md:text-base text-slate-900 shadow-sm transition placeholder:text-slate-400 " +
    (hasError
      ? "border-rose-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 outline-none"
      : "border-slate-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 outline-none");

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 md:p-6">
        <h2 className="text-base md:text-lg font-bold text-slate-900 mb-4">
          Thông tin liên hệ (nhận vé/phiếu thanh toán)
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-800 mb-1.5">
              Danh Xưng
            </label>
            <div className="relative">
              <select
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  clearError("title");
                }}
                className={fieldClass(Boolean(errors.title)) + " appearance-none pr-9"}
              >
                <option value="">-- Chọn danh xưng --</option>
                {TITLES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
              <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                <ChevronDownIcon />
              </span>
            </div>
            {errors.title ? (
              <p className="mt-1 text-xs text-rose-600">{errors.title}</p>
            ) : null}
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-800 mb-1.5">
              Họ Tên
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => {
                setFullName(e.target.value);
                clearError("fullName");
              }}
              className={fieldClass(Boolean(errors.fullName))}
            />
            <p className="mt-1 text-xs text-slate-500">
              Người Việt: nhập Tên đệm + Tên chính + Họ. Người nước ngoài: nhập Tên + Họ
            </p>
            {errors.fullName ? (
              <p className="mt-1 text-xs text-rose-600">{errors.fullName}</p>
            ) : null}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-800 mb-1.5">
                Điện thoại di động<span className="text-rose-500">*</span>
              </label>
              <div className="flex gap-2">
                <div className="relative shrink-0">
                  <select
                    value={dialCode}
                    onChange={(e) => setDialCode(e.target.value)}
                    className="appearance-none rounded-lg border border-slate-200 bg-white pl-3 pr-8 py-2.5 text-sm md:text-base text-slate-900 shadow-sm focus:border-sky-500 focus:ring-2 focus:ring-sky-200 outline-none"
                  >
                    {COUNTRY_CODES.map((c) => (
                      <option key={c.code} value={c.code}>
                        {c.flag} {c.code}
                      </option>
                    ))}
                  </select>
                  <span className="pointer-events-none absolute inset-y-0 right-2 flex items-center">
                    <ChevronDownIcon />
                  </span>
                </div>
                <input
                  type="tel"
                  inputMode="numeric"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    clearError("phone");
                  }}
                  className={fieldClass(Boolean(errors.phone)) + " flex-1"}
                />
              </div>
              {errors.phone ? (
                <p className="mt-1 text-xs text-rose-600">{errors.phone}</p>
              ) : null}
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-800 mb-1.5">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  clearError("email");
                }}
                className={fieldClass(Boolean(errors.email))}
              />
              {errors.email ? (
                <p className="mt-1 text-xs text-rose-600">{errors.email}</p>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-base md:text-lg font-bold text-slate-900 mb-3">
          Tóm tắt
        </h2>
        <div className="bg-white rounded-t-xl border border-slate-200 border-b-0 px-5 py-4 flex items-center justify-between">
          <span className="text-sm md:text-base font-semibold text-slate-900">
            Giá bạn trả
          </span>
          <span className="text-base md:text-lg font-bold text-orange-500">
            {formatVnd(totalPrice)}
          </span>
        </div>
        <div className="h-1 bg-sky-400" aria-hidden />
        <div className="bg-sky-50 border border-sky-100 border-t-0 rounded-b-xl px-5 py-3.5 text-sm text-sky-700 leading-relaxed">
          Đăng nhập để tích ngay điểm thưởng! Bạn có thể tiếp tục đặt chỗ sau vì
          tiến trình đã được lưu trên hệ thống.
        </div>
      </section>

      <div className="flex justify-end">
        <button
          type="submit"
          className="inline-flex items-center justify-center px-10 py-3 rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-semibold transition-colors shadow w-full md:w-auto"
        >
          Tiếp tục
        </button>
      </div>
    </form>
  );
}
