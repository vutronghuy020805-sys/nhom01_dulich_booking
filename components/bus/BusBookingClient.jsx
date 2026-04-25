"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import BusContactForm from "./BusContactForm";
import BusPassengerForm from "./BusPassengerForm";
import { getBusBookingStorageKey } from "./busSearchResults";

const INITIAL_VALUES = {
  contactTitle: "",
  contactFullName: "",
  contactPhoneCountry: "+84",
  contactPhone: "",
  contactEmail: "",
  passengerTitle: "",
  passengerFullName: "",
};

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function validate(values) {
  const errors = {};
  if (!values.contactTitle) errors.contactTitle = "Vui lòng chọn danh xưng.";
  if (!values.contactFullName.trim())
    errors.contactFullName = "Vui lòng nhập họ tên.";
  if (!values.contactPhone.trim())
    errors.contactPhone = "Vui lòng nhập số điện thoại.";
  else if (!/^\d{8,}$/.test(values.contactPhone.trim()))
    errors.contactPhone = "Số điện thoại không hợp lệ.";
  if (!values.contactEmail.trim()) errors.contactEmail = "Vui lòng nhập email.";
  else if (!isValidEmail(values.contactEmail.trim()))
    errors.contactEmail = "Email không đúng định dạng.";

  if (!values.passengerTitle)
    errors.passengerTitle = "Vui lòng chọn danh xưng.";
  if (!values.passengerFullName.trim())
    errors.passengerFullName = "Vui lòng nhập họ tên hành khách.";

  return errors;
}

export default function BusBookingClient({ tripId, nextQuery }) {
  const router = useRouter();
  const [values, setValues] = useState(INITIAL_VALUES);
  const [errors, setErrors] = useState({});
  const [savedFlag, setSavedFlag] = useState(null);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(getBusBookingStorageKey(tripId));
      if (raw) {
        const parsed = JSON.parse(raw);
        setValues((v) => ({ ...v, ...parsed }));
      }
    } catch {
      // ignore
    }
  }, [tripId]);

  const handleChange = (key, value) => {
    setValues((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    }
  };

  const persist = (next) => {
    try {
      sessionStorage.setItem(
        getBusBookingStorageKey(tripId),
        JSON.stringify(next)
      );
    } catch {
      // ignore
    }
  };

  const handleSaveSection = (section) => {
    persist(values);
    setSavedFlag({ section, at: Date.now() });
    window.setTimeout(() => setSavedFlag(null), 1800);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;
    persist(values);
    router.push(`/bus/booking/${encodeURIComponent(tripId)}/review?${nextQuery}`);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <section className="bg-sky-50 border border-sky-100 rounded-xl p-4 md:p-5 flex items-start gap-4">
        <div className="shrink-0 w-14 h-14 md:w-16 md:h-16 rounded-xl bg-sky-100 flex items-center justify-center">
          <svg
            viewBox="0 0 24 24"
            className="w-8 h-8 text-sky-600"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <rect x="3" y="6" width="18" height="13" rx="2" />
            <path d="M7 6V4a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2" />
            <path d="M12 11v6M9 14h6" />
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-bold text-slate-900 text-sm md:text-base">
            Đăng nhập hoặc đăng ký để đặt chỗ dễ dàng và nhận thêm nhiều lợi ích!
          </div>
          <div className="text-xs md:text-sm text-slate-600 mt-1 flex items-start gap-1.5">
            <svg
              viewBox="0 0 24 24"
              className="w-4 h-4 text-slate-500 shrink-0 mt-0.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" />
              <circle cx="10" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87M17 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            <span>
              Nhanh chóng điền thông tin với Chi tiết hành khách đã lưu
            </span>
          </div>
          <Link
            href="/login"
            className="inline-block mt-3 text-sm font-bold text-sky-600 hover:text-sky-700"
          >
            Đăng nhập hoặc Đăng ký
          </Link>
        </div>
      </section>

      <h2 className="text-lg md:text-xl font-bold text-slate-900 mt-2">
        Thông tin liên hệ
      </h2>
      <BusContactForm
        values={values}
        errors={errors}
        onChange={handleChange}
        onSave={() => handleSaveSection("contact")}
      />
      {savedFlag?.section === "contact" && (
        <div className="text-sm text-emerald-600 font-semibold -mt-2">
          Đã lưu thông tin liên hệ.
        </div>
      )}

      <h2 className="text-lg md:text-xl font-bold text-slate-900 mt-2">
        Thông tin hành khách
      </h2>
      <BusPassengerForm
        values={values}
        errors={errors}
        onChange={handleChange}
        onSave={() => handleSaveSection("passenger")}
      />
      {savedFlag?.section === "passenger" && (
        <div className="text-sm text-emerald-600 font-semibold -mt-2">
          Đã lưu thông tin hành khách.
        </div>
      )}

      <div className="flex items-center justify-end mt-4">
        <button
          type="submit"
          className="px-10 py-3 rounded-lg bg-sky-500 hover:bg-sky-600 text-white font-bold text-sm md:text-base transition"
        >
          Tiếp tục
        </button>
      </div>
    </form>
  );
}
