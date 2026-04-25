import Link from "next/link";

const TITLE_MAP = {
  ong: "Ông",
  ba: "Bà",
  anh: "Anh",
  chi: "Chị",
};

export default function BusPassengerSummaryCard({ form, editHref }) {
  const title = TITLE_MAP[form?.passengerTitle] || "";
  const name = form?.passengerFullName || "";
  const display = [title, name].filter(Boolean).join(" ").trim() || "Chưa cập nhật";

  return (
    <section className="bg-white rounded-xl border border-slate-200 overflow-hidden">
      <div className="px-5 md:px-6 py-4 flex items-center justify-between gap-3">
        <div className="font-bold text-slate-900 text-base md:text-lg">
          {display}
        </div>
        <Link
          href={editHref}
          className="text-sm font-semibold text-sky-600 hover:text-sky-700"
        >
          Chỉnh sửa Chi tiết
        </Link>
      </div>
    </section>
  );
}
