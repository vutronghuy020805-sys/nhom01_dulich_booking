function Field({ label, value }) {
  return (
    <div>
      <div className="text-xs uppercase tracking-wide text-slate-500 font-semibold">
        {label}
      </div>
      <div className="mt-1 text-slate-800">{value || "—"}</div>
    </div>
  );
}

/**
 * Unified success details card.
 *
 * Props:
 * - title: VD "Thông tin đơn đặt phòng", "Thông tin vé xe", ...
 * - leftFields: [{ label, value }]
 * - rightFields: [{ label, value }]
 * - emailNotice: text hiển thị ở banner sky dưới cùng, VD "Xác nhận đặt ... đã được gửi tới email <b>x@y.z</b>..."
 */
export default function GenericSuccessDetails({
  title = "Thông tin đơn đặt chỗ",
  leftFields = [],
  rightFields = [],
  emailNotice,
}) {
  return (
    <section className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100">
        <h2 className="text-lg font-bold text-slate-900">{title}</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-100">
        <div className="p-6 space-y-5">
          {leftFields.map((f, i) => (
            <Field key={`l-${i}`} label={f.label} value={f.value} />
          ))}
        </div>
        <div className="p-6 space-y-5">
          {rightFields.map((f, i) => (
            <Field key={`r-${i}`} label={f.label} value={f.value} />
          ))}
        </div>
      </div>

      {emailNotice ? (
        <div className="bg-sky-50 border-t border-sky-100 px-6 py-4 flex items-start gap-3">
          <svg
            viewBox="0 0 24 24"
            className="w-5 h-5 text-sky-600 shrink-0 mt-0.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <path d="M22 7l-10 6L2 7" />
          </svg>
          <div className="text-sm text-slate-700 leading-relaxed">
            {emailNotice}
          </div>
        </div>
      ) : null}
    </section>
  );
}
