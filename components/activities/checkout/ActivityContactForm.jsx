function FieldLabel({ children, required }) {
  return (
    <label className="block text-sm md:text-base font-semibold text-slate-800 mb-2">
      {children}
      {required ? <span className="text-rose-500 ml-0.5">*</span> : null}
    </label>
  );
}

function TextInput({ name, value, onChange, error, type = "text", placeholder, autoComplete }) {
  return (
    <>
      <input
        type={type}
        name={name}
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        aria-invalid={Boolean(error)}
        className={
          "w-full rounded-lg px-4 py-3 text-sm md:text-base text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 transition " +
          (error
            ? "border border-rose-400 focus:ring-rose-200 focus:border-rose-500"
            : "border border-slate-300 hover:border-slate-400 focus:ring-sky-200 focus:border-sky-500")
        }
      />
      {error ? (
        <p className="mt-1.5 text-xs md:text-sm text-rose-600">{error}</p>
      ) : null}
    </>
  );
}

export default function ActivityContactForm({ values, errors, onChange }) {
  return (
    <section>
      <h3 className="text-base md:text-lg font-bold text-slate-900 mb-5 md:mb-6">
        Thông tin liên hệ (nhận vé/phiếu thanh toán)
      </h3>

      <div className="space-y-5">
        <div>
          <FieldLabel required>Họ tên</FieldLabel>
          <TextInput
            name="contactFullName"
            value={values.contactFullName}
            onChange={onChange}
            error={errors.contactFullName}
            autoComplete="name"
          />
        </div>

        <div>
          <FieldLabel required>Điện thoại di động</FieldLabel>
          <TextInput
            name="contactPhone"
            type="tel"
            value={values.contactPhone}
            onChange={onChange}
            error={errors.contactPhone}
            autoComplete="tel"
          />
        </div>

        <div>
          <FieldLabel required>Email</FieldLabel>
          <TextInput
            name="contactEmail"
            type="email"
            value={values.contactEmail}
            onChange={onChange}
            error={errors.contactEmail}
            autoComplete="email"
          />
        </div>
      </div>
    </section>
  );
}
