"use client";

function Field({ label, required, error, children, className = "" }) {
  return (
    <label className={"block " + className}>
      <span className="block text-sm font-semibold text-slate-800 mb-1.5">
        {label}
        {required && <span className="text-red-500">*</span>}
      </span>
      {children}
      {error && (
        <span className="block text-xs text-red-500 mt-1">{error}</span>
      )}
    </label>
  );
}

const INPUT_BASE =
  "w-full px-3 py-2.5 rounded-md border bg-white text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-400";

export default function CarRentalPassengerForm({ values, errors, onChange, onSave }) {
  const inputClass = (hasError) =>
    INPUT_BASE +
    " " +
    (hasError ? "border-red-400 focus:ring-red-300" : "border-slate-300");

  return (
    <section className="bg-white rounded-xl border border-slate-200 overflow-hidden">
      <div className="px-5 md:px-6 pt-5 pb-4 flex items-center justify-between gap-3 border-b border-slate-100">
        <h3 className="text-base md:text-lg font-bold text-slate-900">
          Người lớn 1
        </h3>
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

      <div className="px-5 md:px-6 pt-5">
        <div className="rounded-lg border border-amber-200 bg-amber-50/80 px-4 py-3 flex gap-3">
          <svg
            viewBox="0 0 24 24"
            className="w-5 h-5 text-amber-500 shrink-0 mt-0.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
          <div className="flex-1 min-w-0 text-sm text-slate-700">
            <p className="font-semibold text-slate-900">
              Hãy chắc chắn rằng số điện thoại chính xác và có thể liên lạc được
            </p>
            <p className="mt-1 leading-relaxed">
              Nhà cung cấp dịch vụ sẽ liên lạc với bạn gần ngày lấy xe. Số điện
              thoại được kết nối với WhatsApp là ưu tiên.
            </p>
          </div>
        </div>
      </div>

      <div className="px-5 md:px-6 py-5 grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field
          label="Danh xưng"
          required
          error={errors.passengerTitle}
          className="md:col-span-2"
        >
          <select
            value={values.passengerTitle}
            onChange={(e) => onChange("passengerTitle", e.target.value)}
            className={inputClass(Boolean(errors.passengerTitle))}
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
          error={errors.passengerFullName}
          className="md:col-span-2"
        >
          <input
            type="text"
            value={values.passengerFullName}
            onChange={(e) => onChange("passengerFullName", e.target.value)}
            placeholder="Nhập họ và tên hành khách"
            className={inputClass(Boolean(errors.passengerFullName))}
          />
          <span className="block text-xs text-slate-500 mt-1">
            Người Việt: nhập Tên đệm + Tên chính + Họ. Người nước ngoài: nhập
            Tên + Họ.
          </span>
        </Field>

        <Field
          label="Điện thoại di động"
          required
          error={errors.passengerPhone}
          className="md:col-span-2"
        >
          <div className="flex gap-2">
            <select
              value={values.passengerPhoneCountry}
              onChange={(e) =>
                onChange("passengerPhoneCountry", e.target.value)
              }
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
              value={values.passengerPhone}
              onChange={(e) => onChange("passengerPhone", e.target.value)}
              placeholder="901234567"
              className={
                "flex-1 min-w-0 px-3 py-2.5 rounded-md border bg-white text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-400 " +
                (errors.passengerPhone
                  ? "border-red-400 focus:ring-red-300"
                  : "border-slate-300")
              }
            />
          </div>
          <span className="block text-xs text-slate-500 mt-1">
            VD: +84 901234567 trong đó (+84) là mã quốc gia và 901234567 là số
            di động
          </span>
        </Field>
      </div>
    </section>
  );
}
