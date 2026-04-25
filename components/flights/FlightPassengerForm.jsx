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

const NATIONALITIES = [
  "Việt Nam",
  "Hoa Kỳ",
  "Nhật Bản",
  "Hàn Quốc",
  "Singapore",
  "Thái Lan",
  "Úc",
  "Anh",
];

export default function FlightPassengerForm({ values, errors, onChange }) {
  const inputClass = (hasError) =>
    INPUT_BASE +
    " " +
    (hasError
      ? "border-red-400 focus:ring-red-300"
      : "border-slate-300");

  return (
    <section className="bg-white rounded-xl border border-slate-200 p-5 md:p-6">
      <h2 className="text-lg md:text-xl font-bold text-slate-900">
        Thông tin hành khách
      </h2>

      <div className="mt-4 rounded-lg bg-sky-50 border border-sky-100 px-4 py-2 text-sm font-semibold text-sky-800">
        Người lớn 1
      </div>

      <div className="mt-3 rounded-lg bg-amber-50 border border-amber-200 px-4 py-3 flex gap-3 items-start">
        <svg
          viewBox="0 0 24 24"
          className="w-5 h-5 text-amber-500 shrink-0 mt-0.5"
          fill="currentColor"
          aria-hidden
        >
          <path d="M12 2 1 22h22L12 2zm0 6 7.53 12H4.47L12 8zm-1 4v4h2v-4h-2zm0 5v2h2v-2h-2z" />
        </svg>
        <div className="text-sm text-amber-900">
          <div className="font-semibold">Vui lòng chú ý cho những điều sau đây:</div>
          <p className="mt-1 leading-relaxed">
            Vui lòng nhập tên bằng tiếng Anh không dấu (không có ký tự đặc biệt),
            chính xác như trên giấy tờ tùy thân. Nếu không, bạn có thể bị từ chối
            lên máy bay hoặc phát sinh thêm chi phí.
          </p>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field label="Giới tính" required error={errors.gender} className="md:col-span-2">
          <select
            value={values.gender}
            onChange={(e) => onChange("gender", e.target.value)}
            className={inputClass(Boolean(errors.gender))}
          >
            <option value="">-- Chọn giới tính --</option>
            <option value="male">Nam</option>
            <option value="female">Nữ</option>
          </select>
        </Field>

        <Field label="Họ (vd: NGUYEN)" required error={errors.lastName}>
          <input
            type="text"
            value={values.lastName}
            onChange={(e) => onChange("lastName", e.target.value.toUpperCase())}
            placeholder="NGUYEN"
            className={inputClass(Boolean(errors.lastName))}
          />
          <span className="block text-xs text-slate-500 mt-1">như trên CMND (không dấu)</span>
        </Field>

        <Field label="Chữ đệm và tên (vd: VAN ANH)" required error={errors.firstName}>
          <input
            type="text"
            value={values.firstName}
            onChange={(e) => onChange("firstName", e.target.value.toUpperCase())}
            placeholder="VAN ANH"
            className={inputClass(Boolean(errors.firstName))}
          />
          <span className="block text-xs text-slate-500 mt-1">như trên CMND (không dấu)</span>
        </Field>

        <Field label="Ngày sinh" required error={errors.birthDate}>
          <div className="grid grid-cols-3 gap-2">
            <input
              type="text"
              inputMode="numeric"
              maxLength={2}
              value={values.birthDay}
              onChange={(e) => onChange("birthDay", e.target.value.replace(/\D/g, ""))}
              placeholder="DD"
              className={inputClass(Boolean(errors.birthDate))}
            />
            <input
              type="text"
              inputMode="numeric"
              maxLength={2}
              value={values.birthMonth}
              onChange={(e) => onChange("birthMonth", e.target.value.replace(/\D/g, ""))}
              placeholder="MM"
              className={inputClass(Boolean(errors.birthDate))}
            />
            <input
              type="text"
              inputMode="numeric"
              maxLength={4}
              value={values.birthYear}
              onChange={(e) => onChange("birthYear", e.target.value.replace(/\D/g, ""))}
              placeholder="YYYY"
              className={inputClass(Boolean(errors.birthDate))}
            />
          </div>
          <span className="block text-xs text-slate-500 mt-1">
            Hành khách người lớn (trên 12 tuổi)
          </span>
        </Field>

        <Field label="Quốc tịch" required error={errors.nationality}>
          <select
            value={values.nationality}
            onChange={(e) => onChange("nationality", e.target.value)}
            className={inputClass(Boolean(errors.nationality))}
          >
            <option value="">-- Chọn quốc tịch --</option>
            {NATIONALITIES.map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Số căn cước công dân" required error={errors.idNumber} className="md:col-span-2">
          <input
            type="text"
            inputMode="numeric"
            value={values.idNumber}
            onChange={(e) => onChange("idNumber", e.target.value.replace(/\D/g, ""))}
            placeholder="Nhập số căn cước công dân"
            className={inputClass(Boolean(errors.idNumber))}
          />
          <span className="block text-xs text-slate-500 mt-1">
            Đối với hành khách là trẻ em hoặc trẻ sơ sinh, vui lòng nhập giấy tờ tùy thân của người giám hộ đi cùng trẻ. (Vui lòng đảm bảo chỉ nhập số trong trường này)
          </span>
        </Field>
      </div>

      <label className="mt-5 flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
        <input
          type="checkbox"
          checked={values.loyaltyMember}
          onChange={(e) => onChange("loyaltyMember", e.target.checked)}
          className="w-4 h-4 rounded border-slate-300 text-sky-500 focus:ring-sky-400"
        />
        <span>Thêm tài khoản Hành khách Thân thiết</span>
      </label>
    </section>
  );
}
