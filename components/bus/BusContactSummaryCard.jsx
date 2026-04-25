import Link from "next/link";

const TITLE_MAP = {
  ong: "Ông",
  ba: "Bà",
  anh: "Anh",
  chi: "Chị",
};

export default function BusContactSummaryCard({ form, editHref }) {
  const fullName =
    form && (form.contactFullName || "").trim()
      ? form.contactFullName
      : "Chưa cập nhật";
  const phone = form?.contactPhone
    ? `${form.contactPhoneCountry || ""}${form.contactPhone}`.trim()
    : "Chưa cập nhật";
  const email = form?.contactEmail || "Chưa cập nhật";

  return (
    <section className="bg-white rounded-xl border border-slate-200 overflow-hidden">
      <div className="px-5 md:px-6 py-4 flex items-center justify-between gap-3 border-b border-slate-100">
        <div className="font-bold text-slate-900 text-base md:text-lg">
          {fullName}
        </div>
        <Link
          href={editHref}
          className="text-sm font-semibold text-sky-600 hover:text-sky-700"
        >
          Chỉnh sửa Chi tiết
        </Link>
      </div>

      <div className="px-5 md:px-6 py-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <div className="text-xs text-slate-500 mb-1">Số di động</div>
          <div className="text-sm text-slate-800 font-medium">{phone}</div>
        </div>
        <div className="min-w-0">
          <div className="text-xs text-slate-500 mb-1">Email</div>
          <div className="text-sm text-slate-800 font-medium truncate">
            {email}
          </div>
        </div>
      </div>
    </section>
  );
}
