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

export default function BusPassengerForm({ values, errors, onChange, onSave }) {
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
            Người Việt: nhập Tên đệm + Tên chính + Họ. Người nước ngoài: nhập Tên + Họ.
          </span>
        </Field>
      </div>
    </section>
  );
}
