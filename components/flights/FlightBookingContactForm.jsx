"use client";

function Field({ label, required, error, children, className = "" }) {
  return (
    <label className={"block " + className}>
      <span className="block text-sm font-semibold text-slate-800 mb-1.5">
        {label}
        {required && <span className="text-red-500">*</span>}
      </span>
      {children}
      {error && <span className="block text-xs text-red-500 mt-1">{error}</span>}
    </label>
  );
}

const INPUT_BASE =
  "w-full px-3 py-2.5 rounded-md border bg-white text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-400";

export default function FlightBookingContactForm({ values, errors, onChange }) {
  const inputClass = (hasError) =>
    INPUT_BASE +
    " " +
    (hasError
      ? "border-red-400 focus:ring-red-300"
      : "border-slate-300");

  return (
    <section className="bg-white rounded-xl border border-slate-200 p-5 md:p-6">
      <h2 className="text-lg md:text-xl font-bold text-slate-900">
        Thông tin liên hệ (nhận vé/phiếu thanh toán)
      </h2>

      <div className="mt-4 rounded-lg bg-gradient-to-r from-sky-50 via-sky-100 to-sky-50 border border-sky-200 px-4 py-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-sm text-sky-900 font-medium">
          <span aria-hidden>🎉</span>
          <span>
            Đăng nhập hoặc đăng ký để có giá rẻ hơn và nhiều ưu đãi hơn!
          </span>
        </div>
        <a
          href="/login"
          className="shrink-0 bg-white hover:bg-sky-50 border border-sky-300 text-sky-700 font-semibold text-sm px-4 py-1.5 rounded-md transition"
        >
          Đăng nhập hoặc Đăng ký
        </a>
      </div>

      <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field
          label="Họ tên"
          required
          error={errors.fullName}
          className="md:col-span-2"
        >
          <input
            type="text"
            value={values.fullName}
            onChange={(e) => onChange("fullName", e.target.value)}
            placeholder="Nhập họ và tên"
            className={inputClass(Boolean(errors.fullName))}
          />
          <span className="block text-xs text-slate-500 mt-1">
            Người Việt: nhập Tên đệm + Tên chính + Họ. Người nước ngoài: nhập Tên + Họ.
          </span>
        </Field>

        <Field label="Điện thoại di động" required error={errors.phone}>
          <div className="flex gap-2">
            <select
              value={values.phoneCountry}
              onChange={(e) => onChange("phoneCountry", e.target.value)}
              className="shrink-0 w-28 px-3 py-2.5 rounded-md border border-slate-300 bg-white text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-400"
            >
              <option value="+84">VN +84</option>
              <option value="+1">US +1</option>
              <option value="+65">SG +65</option>
              <option value="+81">JP +81</option>
              <option value="+82">KR +82</option>
            </select>
            <input
              type="tel"
              value={values.phone}
              onChange={(e) => onChange("phone", e.target.value)}
              placeholder="386654290"
              className={
                "flex-1 min-w-0 px-3 py-2.5 rounded-md border bg-white text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-400 " +
                (errors.phone
                  ? "border-red-400 focus:ring-red-300"
                  : "border-slate-300")
              }
            />
          </div>
          <span className="block text-xs text-slate-500 mt-1">
            VD: +84 901234567 trong đó (+84) là mã quốc gia và 901234567 là số di động
          </span>
        </Field>

        <Field label="Email" required error={errors.email}>
          <input
            type="email"
            value={values.email}
            onChange={(e) => onChange("email", e.target.value)}
            placeholder="email@example.com"
            className={inputClass(Boolean(errors.email))}
          />
          <span className="block text-xs text-slate-500 mt-1">
            VD: email@example.com
          </span>
        </Field>
      </div>
    </section>
  );
}
