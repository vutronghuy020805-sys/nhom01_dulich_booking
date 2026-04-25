"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ActivityContactForm from "./ActivityContactForm";
import ActivityCustomerForm from "./ActivityCustomerForm";

const STORAGE_KEY = "viego:activity-checkout";

const EMPTY_FORM = {
  contactFullName: "",
  contactPhone: "",
  contactEmail: "",
  lastName: "",
  firstName: "",
  gender: "",
  nationality: "",
  birthDay: "",
  birthMonth: "",
  birthYear: "",
};

function validate(form) {
  const errors = {};

  if (!form.contactFullName.trim()) {
    errors.contactFullName = "Vui lòng nhập họ tên liên hệ.";
  } else if (form.contactFullName.trim().length < 2) {
    errors.contactFullName = "Họ tên quá ngắn.";
  }

  const phoneDigits = form.contactPhone.replace(/\D/g, "");
  if (!form.contactPhone.trim()) {
    errors.contactPhone = "Vui lòng nhập số điện thoại.";
  } else if (phoneDigits.length < 9 || phoneDigits.length > 11) {
    errors.contactPhone = "Số điện thoại không hợp lệ.";
  }

  if (!form.contactEmail.trim()) {
    errors.contactEmail = "Vui lòng nhập email.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.contactEmail.trim())) {
    errors.contactEmail = "Email không đúng định dạng.";
  }

  if (!form.lastName.trim()) errors.lastName = "Vui lòng nhập họ.";
  if (!form.firstName.trim()) errors.firstName = "Vui lòng nhập chữ đệm và tên.";
  if (!form.gender) errors.gender = "Vui lòng chọn giới tính.";
  if (!form.nationality) errors.nationality = "Vui lòng chọn quốc tịch.";

  const d = parseInt(form.birthDay, 10);
  const m = parseInt(form.birthMonth, 10);
  const y = parseInt(form.birthYear, 10);
  const nowYear = new Date().getFullYear();
  if (!form.birthDay || !form.birthMonth || !form.birthYear) {
    errors.birthDate = "Vui lòng nhập đầy đủ ngày, tháng, năm sinh.";
  } else if (
    Number.isNaN(d) ||
    Number.isNaN(m) ||
    Number.isNaN(y) ||
    d < 1 ||
    d > 31 ||
    m < 1 ||
    m > 12 ||
    y < 1900 ||
    y > nowYear
  ) {
    errors.birthDate = "Ngày sinh không hợp lệ.";
  } else {
    const date = new Date(y, m - 1, d);
    if (
      date.getFullYear() !== y ||
      date.getMonth() !== m - 1 ||
      date.getDate() !== d
    ) {
      errors.birthDate = "Ngày sinh không tồn tại.";
    }
  }

  return errors;
}

function formatPrice(value) {
  return `${new Intl.NumberFormat("vi-VN").format(value)} VND`;
}

export default function ActivityCheckoutForm({ bookingContext }) {
  const router = useRouter();
  const { slug, ticket, activity, quantities, totalPrice, dateLabel } =
    bookingContext;

  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = window.sessionStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw);
      if (
        parsed &&
        parsed.slug === slug &&
        parsed.ticketId === ticket.id &&
        parsed.form
      ) {
        setForm({ ...EMPTY_FORM, ...parsed.form });
      }
    } catch {
      // ignore parse errors
    }
  }, [slug, ticket.id]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const payload = {
      slug,
      ticketId: ticket.id,
      activityTitle: activity.title,
      ticketTitle: ticket.title,
      dateLabel,
      quantities,
      pricing: ticket.pricing,
      totalPrice,
      form,
    };
    try {
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch {
      // ignore quota errors
    }
  }, [
    slug,
    ticket.id,
    ticket.title,
    ticket.pricing,
    activity.title,
    dateLabel,
    quantities,
    totalPrice,
    form,
  ]);

  const handleChange = (name, value) => {
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => {
      if (!prev[name] && name !== "birthDay" && name !== "birthMonth" && name !== "birthYear") {
        return prev;
      }
      const next = { ...prev };
      if (name === "birthDay" || name === "birthMonth" || name === "birthYear") {
        delete next.birthDate;
      } else {
        delete next[name];
      }
      return next;
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = validate(form);
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }
    setErrors({});
    const url =
      `/activities/${slug}/payment` +
      `?ticket=${encodeURIComponent(ticket.id)}` +
      `&adult=${quantities.adult}` +
      `&senior=${quantities.senior}` +
      `&child=${quantities.child}`;
    router.push(url);
  };

  const totalQty = quantities.adult + quantities.senior + quantities.child;

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="max-w-350 mx-auto px-4 lg:px-10 py-8 md:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 lg:gap-12">
          <ActivityContactForm
            values={form}
            errors={errors}
            onChange={handleChange}
          />
          <ActivityCustomerForm
            values={form}
            errors={errors}
            onChange={handleChange}
          />
        </div>

        <div className="mt-10 md:mt-12 flex flex-col md:flex-row md:items-center md:justify-between gap-4 pt-6 border-t border-slate-200">
          <div className="text-sm md:text-base text-slate-600">
            <span className="font-medium text-slate-800">
              {ticket.title}
            </span>
            <span className="mx-2 text-slate-300">•</span>
            <span>
              {totalQty} vé · Tổng{" "}
              <span className="font-semibold text-orange-500">
                {formatPrice(totalPrice)}
              </span>
            </span>
          </div>

          <button
            type="submit"
            className="inline-flex items-center justify-center bg-orange-500 hover:bg-orange-600 text-white font-semibold px-10 md:px-12 py-3 rounded-lg shadow-sm transition w-full md:w-auto"
          >
            Tiếp tục
          </button>
        </div>
      </div>
    </form>
  );
}
