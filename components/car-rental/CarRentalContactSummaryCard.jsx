import Link from "next/link";

const TITLE_LABEL = {
  ong: "Ông",
  ba: "Bà",
  anh: "Anh",
  chi: "Chị",
};

export default function CarRentalContactSummaryCard({ contact, editHref }) {
  const displayName = (
    (TITLE_LABEL[contact?.contactTitle] ? TITLE_LABEL[contact.contactTitle] + " " : "") +
    (contact?.contactFullName || "")
  ).trim() || "—";
  const phone = contact?.contactPhone
    ? `${contact.contactPhoneCountry || ""}${contact.contactPhone}`.replace(/\s+/g, "")
    : "—";
  const email = contact?.contactEmail || "—";

  return (
    <section>
      <h2 className="text-lg md:text-xl font-bold text-slate-900 mb-3">
        Thông tin liên hệ
      </h2>
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="px-5 md:px-6 py-4 flex items-center justify-between gap-3 border-b border-slate-100">
          <div className="text-sm md:text-base font-semibold text-slate-900 truncate">
            {displayName}
          </div>
          <Link
            href={editHref}
            className="shrink-0 text-sm font-semibold text-sky-600 hover:text-sky-700"
          >
            Chỉnh sửa Chi tiết
          </Link>
        </div>

        <div className="px-5 md:px-6 py-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <div className="text-xs text-slate-500">Số di động</div>
            <div className="text-sm font-medium text-slate-900 mt-0.5">
              {phone}
            </div>
          </div>
          <div className="min-w-0">
            <div className="text-xs text-slate-500">Email</div>
            <div className="text-sm font-medium text-slate-900 mt-0.5 break-all">
              {email}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
