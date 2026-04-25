"use client";

import { useState } from "react";

const SUBJECTS = [
  { value: "booking", label: "Hỗ trợ đặt chỗ" },
  { value: "refund", label: "Hoàn tiền" },
  { value: "reschedule", label: "Đổi lịch" },
  { value: "account", label: "Hỗ trợ tài khoản" },
  { value: "feedback", label: "Góp ý dịch vụ" },
  { value: "other", label: "Khác" },
];

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <polyline points="3 7 12 13 21 7" />
    </svg>
  );
}
function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />
    </svg>
  );
}
function MapPinIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 22s-7-7-7-12a7 7 0 0 1 14 0c0 5-7 12-7 12z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}
function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="12" r="9" />
      <polyline points="12 7 12 12 15 14" />
    </svg>
  );
}
function CheckCircleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5 text-emerald-500 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="12" r="10" />
      <polyline points="16 10 11 15 8 12" />
    </svg>
  );
}

const initialForm = {
  fullName: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

function validate(form) {
  const errors = {};
  const name = form.fullName.trim();
  if (!name) errors.fullName = "Vui lòng nhập họ và tên.";
  else if (name.length < 2) errors.fullName = "Họ và tên phải có ít nhất 2 ký tự.";

  const email = form.email.trim();
  if (!email) errors.email = "Vui lòng nhập email.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    errors.email = "Email không hợp lệ.";

  const phone = form.phone.trim();
  if (phone) {
    const digits = phone.replace(/\D/g, "");
    // VN phone: 10-11 digits starting with 0, or 11-12 digits starting with 84
    const vnLocal = /^0\d{9,10}$/.test(digits);
    const vnIntl = /^84\d{9,10}$/.test(digits);
    if (!vnLocal && !vnIntl) {
      errors.phone = "Số điện thoại không hợp lệ.";
    }
  }

  if (!form.subject) errors.subject = "Vui lòng chọn chủ đề.";

  const message = form.message.trim();
  if (!message) errors.message = "Vui lòng nhập nội dung liên hệ.";
  else if (message.length < 20)
    errors.message = `Nội dung cần tối thiểu 20 ký tự (hiện ${message.length}).`;

  return errors;
}

export default function ContactFormSection() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | submitting | success

  const update = (field) => (event) => {
    const value = event.target.value;
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const n = { ...prev };
        delete n[field];
        return n;
      });
    }
    if (status === "success") setStatus("idle");
  };

  const handleContactSubmit = async (event) => {
    event.preventDefault();
    const next = validate(form);
    if (Object.keys(next).length > 0) {
      setErrors(next);
      return;
    }
    setErrors({});
    setStatus("submitting");

    // TODO: nối backend thật tại đây.
    // Ví dụ: await fetch("/api/contact", { method: "POST", body: JSON.stringify(form) });
    await new Promise((resolve) => setTimeout(resolve, 600));

    setStatus("success");
    setForm(initialForm);
  };

  const fieldClass = (hasError) =>
    "w-full rounded-lg border bg-white px-3 py-2.5 text-sm md:text-base text-slate-900 shadow-sm transition placeholder:text-slate-400 outline-none " +
    (hasError
      ? "border-rose-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-200"
      : "border-slate-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-200");

  // Google Maps public embed (no API key) — thay toạ độ/địa chỉ khi có văn phòng thật
  const mapSrc =
    "https://maps.google.com/maps?q=10.7743,106.7035&z=16&output=embed";

  return (
    <section className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 md:p-8">
      <div className="text-center mb-6 md:mb-8">
        <h2 className="text-lg md:text-xl font-bold text-slate-900">
          Gửi yêu cầu cho chúng tôi
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Đội ngũ VieGo sẽ phản hồi bạn trong thời gian sớm nhất
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 items-start">
        <form
          onSubmit={handleContactSubmit}
          noValidate
          className="space-y-4"
          aria-describedby={status === "success" ? "contact-success" : undefined}
        >
          <div>
            <label
              htmlFor="contact-fullName"
              className="block text-sm font-semibold text-slate-800 mb-1.5"
            >
              Họ và tên <span className="text-rose-500">*</span>
            </label>
            <input
              id="contact-fullName"
              type="text"
              value={form.fullName}
              onChange={update("fullName")}
              className={fieldClass(Boolean(errors.fullName))}
              placeholder="Nguyễn Văn A"
            />
            {errors.fullName ? (
              <p className="mt-1 text-xs text-rose-600">{errors.fullName}</p>
            ) : null}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="contact-email"
                className="block text-sm font-semibold text-slate-800 mb-1.5"
              >
                Email <span className="text-rose-500">*</span>
              </label>
              <input
                id="contact-email"
                type="email"
                value={form.email}
                onChange={update("email")}
                className={fieldClass(Boolean(errors.email))}
                placeholder="email@example.com"
              />
              {errors.email ? (
                <p className="mt-1 text-xs text-rose-600">{errors.email}</p>
              ) : null}
            </div>

            <div>
              <label
                htmlFor="contact-phone"
                className="block text-sm font-semibold text-slate-800 mb-1.5"
              >
                Số điện thoại
              </label>
              <input
                id="contact-phone"
                type="tel"
                inputMode="tel"
                value={form.phone}
                onChange={update("phone")}
                className={fieldClass(Boolean(errors.phone))}
                placeholder="0912 345 678"
              />
              {errors.phone ? (
                <p className="mt-1 text-xs text-rose-600">{errors.phone}</p>
              ) : null}
            </div>
          </div>

          <div>
            <label
              htmlFor="contact-subject"
              className="block text-sm font-semibold text-slate-800 mb-1.5"
            >
              Chủ đề <span className="text-rose-500">*</span>
            </label>
            <select
              id="contact-subject"
              value={form.subject}
              onChange={update("subject")}
              className={fieldClass(Boolean(errors.subject))}
            >
              <option value="">-- Chọn chủ đề --</option>
              {SUBJECTS.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
            {errors.subject ? (
              <p className="mt-1 text-xs text-rose-600">{errors.subject}</p>
            ) : null}
          </div>

          <div>
            <label
              htmlFor="contact-message"
              className="block text-sm font-semibold text-slate-800 mb-1.5"
            >
              Nội dung liên hệ <span className="text-rose-500">*</span>
            </label>
            <textarea
              id="contact-message"
              rows={5}
              value={form.message}
              onChange={update("message")}
              className={fieldClass(Boolean(errors.message)) + " resize-y"}
              placeholder="Mô tả chi tiết vấn đề bạn cần hỗ trợ..."
            />
            <div className="mt-1 flex items-center justify-between gap-3">
              {errors.message ? (
                <p className="text-xs text-rose-600">{errors.message}</p>
              ) : (
                <p className="text-xs text-slate-400">
                  Tối thiểu 20 ký tự. Hiện tại: {form.message.trim().length}.
                </p>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={status === "submitting"}
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3 rounded-lg bg-sky-500 hover:bg-sky-600 disabled:opacity-70 text-white font-semibold text-sm transition-colors shadow"
          >
            {status === "submitting" ? "Đang gửi..." : "Gửi liên hệ"}
          </button>

          {status === "success" ? (
            <div
              id="contact-success"
              role="status"
              className="flex items-start gap-2.5 rounded-xl bg-emerald-50 border border-emerald-200 p-3.5 text-sm text-emerald-800"
            >
              <CheckCircleIcon />
              <span>
                Cảm ơn bạn! VieGo đã nhận được liên hệ của bạn và sẽ phản hồi
                sớm nhất.
              </span>
            </div>
          ) : null}
        </form>

        <div className="space-y-4">
          <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-white">
            <iframe
              src={mapSrc}
              title="Bản đồ văn phòng VieGo"
              width="100%"
              height="320"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-72 md:h-80 border-0"
              allowFullScreen
            />
          </div>

          <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 md:p-6">
            <h3 className="text-base md:text-lg font-bold text-slate-900">
              Thông tin liên hệ
            </h3>
            <ul className="mt-3 space-y-2.5 text-sm text-slate-700">
              <li className="flex items-start gap-2.5">
                <MailIcon />
                <span>
                  <span className="font-semibold">Email:</span>{" "}
                  <a
                    href="mailto:support@viego.vn"
                    className="text-sky-600 hover:underline"
                  >
                    support@viego.vn
                  </a>
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <PhoneIcon />
                <span>
                  <span className="font-semibold">Hotline:</span>{" "}
                  <a
                    href="tel:19001234"
                    className="text-sky-600 hover:underline"
                  >
                    1900 1234
                  </a>
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPinIcon />
                <span>
                  <span className="font-semibold">Địa chỉ:</span> 123 Nguyễn
                  Huệ, Quận 1, TP. Hồ Chí Minh
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <ClockIcon />
                <span>
                  <span className="font-semibold">Giờ làm việc:</span> 08:00 -
                  22:00 mỗi ngày
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
