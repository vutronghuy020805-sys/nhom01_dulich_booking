"use client";

export default function CarRentalTermsCard({ checked, onChange, error }) {
  return (
    <section>
      <h2 className="text-lg md:text-xl font-bold text-slate-900 mb-3">
        Điều khoản & Điều kiện thuê xe
      </h2>
      <div
        className={
          "bg-white rounded-xl border px-5 md:px-6 py-5 " +
          (error ? "border-red-300" : "border-slate-200")
        }
      >
        <div className="flex items-start gap-3">
          <input
            id="car-rental-terms"
            type="checkbox"
            checked={checked}
            onChange={(e) => onChange(e.target.checked)}
            className="mt-1 w-4 h-4 accent-sky-500"
          />
          <label
            htmlFor="car-rental-terms"
            className="text-sm text-slate-700 leading-relaxed cursor-pointer"
          >
            Khi đánh dấu vào ô này, tôi công nhận đã đọc, hiểu, và đồng ý với
            Điều khoản & Điều kiện thuê xe của VieGo.
          </label>
        </div>

        <div className="mt-4 text-right">
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="text-sm font-bold tracking-wide text-sky-600 hover:text-sky-700 uppercase"
          >
            Tìm hiểu thêm
          </a>
        </div>

        {error && (
          <div className="mt-3 text-sm text-red-600">{error}</div>
        )}
      </div>
    </section>
  );
}
