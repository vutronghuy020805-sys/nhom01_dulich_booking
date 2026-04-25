"use client";

import { useState } from "react";
import AccountPageHeader from "@/components/account/AccountPageHeader";
import AccountEmptyState from "@/components/account/AccountEmptyState";
import { savedPassengers, formatDateVN } from "@/data/accountMock";

function maskDoc(value = "") {
  if (value.length <= 4) return value;
  return value.slice(0, 2) + "•".repeat(value.length - 4) + value.slice(-2);
}

export default function SavedPassengersPage() {
  const [pax, setPax] = useState(savedPassengers);

  const removePax = (id) => {
    if (typeof window !== "undefined") {
      const ok = window.confirm("Xoá hành khách này?");
      if (!ok) return;
    }
    setPax((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <>
      <AccountPageHeader
        title="Thông tin hành khách đã lưu"
        subtitle="Lưu thông tin người thân để điền nhanh khi đặt vé."
        actions={
          <button
            type="button"
            className="px-4 py-2 rounded-lg bg-sky-500 hover:bg-sky-600 text-white text-sm font-semibold shadow-sm"
          >
            + Thêm hành khách
          </button>
        }
      />

      {pax.length === 0 ? (
        <AccountEmptyState
          title="Bạn chưa lưu hành khách nào"
          description="Thêm thông tin người thân/đồng hành để VieGo tự động điền khi bạn đặt vé."
          action={
            <button
              type="button"
              className="px-4 py-2 rounded-lg bg-sky-500 hover:bg-sky-600 text-white text-sm font-semibold shadow-sm"
            >
              Thêm hành khách
            </button>
          }
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {pax.map((p) => (
            <article
              key={p.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 md:p-6 flex flex-col gap-3"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-xs text-slate-500">{p.salutation}</p>
                  <h3 className="text-base md:text-lg font-bold text-slate-900 truncate">
                    {p.fullName}
                  </h3>
                </div>
                <span
                  className={
                    "text-[11px] font-semibold px-2.5 py-1 rounded-full " +
                    (p.paxType === "adult"
                      ? "bg-sky-100 text-sky-700"
                      : "bg-amber-100 text-amber-700")
                  }
                >
                  {p.paxType === "adult" ? "Người lớn" : "Trẻ em"}
                </span>
              </div>

              <dl className="text-sm text-slate-700 grid grid-cols-2 gap-y-1.5 gap-x-4">
                <dt className="text-slate-500">Ngày sinh</dt>
                <dd className="font-medium">{formatDateVN(p.dob)}</dd>
                <dt className="text-slate-500">Quốc tịch</dt>
                <dd className="font-medium">{p.nationality}</dd>
                <dt className="text-slate-500">{p.docType}</dt>
                <dd className="font-mono">{maskDoc(p.docNumber)}</dd>
              </dl>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  className="px-3 py-1.5 rounded-lg text-sm font-semibold text-sky-600 hover:bg-sky-50"
                >
                  Chỉnh sửa
                </button>
                <button
                  type="button"
                  onClick={() => removePax(p.id)}
                  className="px-3 py-1.5 rounded-lg text-sm font-semibold text-rose-600 hover:bg-rose-50"
                >
                  Xoá
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </>
  );
}
