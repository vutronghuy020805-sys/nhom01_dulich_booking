const GENDER_OPTIONS = [
  { value: "", label: "Chọn giới tính" },
  { value: "male", label: "Nam" },
  { value: "female", label: "Nữ" },
  { value: "other", label: "Khác" },
];

const NATIONALITY_OPTIONS = [
  { value: "", label: "Chọn quốc tịch" },
  { value: "VN", label: "Việt Nam" },
  { value: "US", label: "Hoa Kỳ" },
  { value: "GB", label: "Anh" },
  { value: "JP", label: "Nhật Bản" },
  { value: "KR", label: "Hàn Quốc" },
  { value: "CN", label: "Trung Quốc" },
  { value: "TH", label: "Thái Lan" },
  { value: "SG", label: "Singapore" },
  { value: "MY", label: "Malaysia" },
  { value: "ID", label: "Indonesia" },
  { value: "PH", label: "Philippines" },
  { value: "IN", label: "Ấn Độ" },
  { value: "AU", label: "Úc" },
  { value: "CA", label: "Canada" },
  { value: "FR", label: "Pháp" },
  { value: "DE", label: "Đức" },
  { value: "IT", label: "Ý" },
  { value: "ES", label: "Tây Ban Nha" },
  { value: "NL", label: "Hà Lan" },
  { value: "RU", label: "Nga" },
];

function FieldLabel({ children, required }) {
  return (
    <label className="block text-sm md:text-base font-semibold text-slate-800 mb-2">
      {children}
      {required ? <span className="text-rose-500 ml-0.5">*</span> : null}
    </label>
  );
}

function TextInput({ name, value, onChange, error, placeholder, maxLength, inputMode }) {
  return (
    <input
      type="text"
      name={name}
      value={value}
      onChange={(e) => onChange(name, e.target.value)}
      placeholder={placeholder}
      maxLength={maxLength}
      inputMode={inputMode}
      aria-invalid={Boolean(error)}
      className={
        "w-full rounded-lg px-4 py-3 text-sm md:text-base text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 transition " +
        (error
          ? "border border-rose-400 focus:ring-rose-200 focus:border-rose-500"
          : "border border-slate-300 hover:border-slate-400 focus:ring-sky-200 focus:border-sky-500")
      }
    />
  );
}

function SelectInput({ name, value, onChange, error, options }) {
  return (
    <select
      name={name}
      value={value}
      onChange={(e) => onChange(name, e.target.value)}
      aria-invalid={Boolean(error)}
      className={
        "w-full rounded-lg px-4 py-3 text-sm md:text-base text-slate-900 bg-white focus:outline-none focus:ring-2 transition " +
        (error
          ? "border border-rose-400 focus:ring-rose-200 focus:border-rose-500"
          : "border border-slate-300 hover:border-slate-400 focus:ring-sky-200 focus:border-sky-500")
      }
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value} disabled={opt.value === ""}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}

export default function ActivityCustomerForm({ values, errors, onChange }) {
  return (
    <section>
      <h3 className="text-base md:text-lg font-bold text-slate-900 mb-5 md:mb-6">
        Thông tin khách hàng
      </h3>

      <div className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <FieldLabel required>Họ (vd: NGUYEN)</FieldLabel>
            <TextInput
              name="lastName"
              value={values.lastName}
              onChange={onChange}
              error={errors.lastName}
            />
            {errors.lastName ? (
              <p className="mt-1.5 text-xs md:text-sm text-rose-600">
                {errors.lastName}
              </p>
            ) : null}
          </div>

          <div>
            <FieldLabel required>Chữ đệm và tên (vd: NGOC ANH)</FieldLabel>
            <TextInput
              name="firstName"
              value={values.firstName}
              onChange={onChange}
              error={errors.firstName}
            />
            {errors.firstName ? (
              <p className="mt-1.5 text-xs md:text-sm text-rose-600">
                {errors.firstName}
              </p>
            ) : null}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <FieldLabel required>Giới tính</FieldLabel>
            <SelectInput
              name="gender"
              value={values.gender}
              onChange={onChange}
              error={errors.gender}
              options={GENDER_OPTIONS}
            />
            {errors.gender ? (
              <p className="mt-1.5 text-xs md:text-sm text-rose-600">
                {errors.gender}
              </p>
            ) : null}
          </div>

          <div>
            <FieldLabel required>Quốc tịch</FieldLabel>
            <SelectInput
              name="nationality"
              value={values.nationality}
              onChange={onChange}
              error={errors.nationality}
              options={NATIONALITY_OPTIONS}
            />
            {errors.nationality ? (
              <p className="mt-1.5 text-xs md:text-sm text-rose-600">
                {errors.nationality}
              </p>
            ) : null}
          </div>
        </div>

        <div>
          <FieldLabel required>Ngày sinh</FieldLabel>
          <div className="grid grid-cols-3 gap-3 max-w-md">
            <TextInput
              name="birthDay"
              value={values.birthDay}
              onChange={onChange}
              error={errors.birthDate}
              placeholder="DD"
              maxLength={2}
              inputMode="numeric"
            />
            <TextInput
              name="birthMonth"
              value={values.birthMonth}
              onChange={onChange}
              error={errors.birthDate}
              placeholder="MM"
              maxLength={2}
              inputMode="numeric"
            />
            <TextInput
              name="birthYear"
              value={values.birthYear}
              onChange={onChange}
              error={errors.birthDate}
              placeholder="YYYY"
              maxLength={4}
              inputMode="numeric"
            />
          </div>
          {errors.birthDate ? (
            <p className="mt-1.5 text-xs md:text-sm text-rose-600">
              {errors.birthDate}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
