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

export default function BusContactForm({ values, errors, onChange, onSave }) {
  const inputClass = (hasError) =>
    INPUT_BASE +
    " " +
    (hasError ? "border-red-400 focus:ring-red-300" : "border-slate-300");

  return (
    <section className="bg-white rounded-xl border border-slate-200 overflow-hidden">
      <div className="px-5 md:px-6 pt-5 pb-4 flex items-center justify-between gap-3 border-b border-slate-100">
        <div>
          <h3 className="text-base md:text-lg font-bold text-slate-900">
            Thông tin liên hệ (nhận vé/phiếu thanh toán)
          </h3>
        </div>
        {onSave && (
          <button
            type="button"
            onClick={onSave}
            className="text-sm font-semibold text-sky-600 hover:text-sky-700"
          >
            Lưu
          </button>
        )}
      </div>

      <div className="px-5 md:px-6 py-5 grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field
          label="Danh xưng"
          required
          error={errors.contactTitle}
          className="md:col-span-2"
        >
          <select
            value={values.contactTitle}
            onChange={(e) => onChange("contactTitle", e.target.value)}
            className={inputClass(Boolean(errors.contactTitle))}
          >
            <option value="">-- Chọn danh xưng --</option>
            <option value="ong">Ông</option>
            <option value="ba">Bà</option>
            <option value="anh">Anh</option>
            <option value="chi">Chị</option>
          </select>
        </Field>

        <Field
          label="Họ tên"
          required
          error={errors.contactFullName}
          className="md:col-span-2"
        >
          <input
            type="text"
            value={values.contactFullName}
            onChange={(e) => onChange("contactFullName", e.target.value)}
            placeholder="Nhập họ và tên"
            className={inputClass(Boolean(errors.contactFullName))}
          />
          <span className="block text-xs text-slate-500 mt-1">
            Người Việt: nhập Tên đệm + Tên chính + Họ. Người nước ngoài: nhập Tên + Họ.
          </span>
        </Field>

        <Field label="Điện thoại di động" required error={errors.contactPhone}>
          <div className="flex gap-2">
            <select
              value={values.contactPhoneCountry}
              onChange={(e) => onChange("contactPhoneCountry", e.target.value)}
              className="shrink-0 w-24 px-3 py-2.5 rounded-md border border-slate-300 bg-white text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-400"
            >
              <option value="+84">VN +84</option>
              <option value="+1">US +1</option>
              <option value="+65">SG +65</option>
              <option value="+81">JP +81</option>
              <option value="+82">KR +82</option>
            </select>
            <input
              type="tel"
              value={values.contactPhone}
              onChange={(e) => onChange("contactPhone", e.target.value)}
              placeholder="901234567"
              className={
                "flex-1 min-w-0 px-3 py-2.5 rounded-md border bg-white text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-400 " +
                (errors.contactPhone
                  ? "border-red-400 focus:ring-red-300"
                  : "border-slate-300")
              }
            />
          </div>
          <span className="block text-xs text-slate-500 mt-1">
            VD: +84 901234567 trong đó (+84) là mã quốc gia và 901234567 là số di động
          </span>
        </Field>

        <Field label="Email" required error={errors.contactEmail}>
          <input
            type="email"
            value={values.contactEmail}
            onChange={(e) => onChange("contactEmail", e.target.value)}
            placeholder="email@example.com"
            className={inputClass(Boolean(errors.contactEmail))}
          />
          <span className="block text-xs text-slate-500 mt-1">
            VD: email@example.com
          </span>
        </Field>
      </div>
    </section>
  );
}
