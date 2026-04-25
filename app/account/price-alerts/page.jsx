"use client";

import { useState } from "react";
import AccountPageHeader from "@/components/account/AccountPageHeader";
import AccountEmptyState from "@/components/account/AccountEmptyState";
import { priceAlerts, formatVND, formatDateVN } from "@/data/accountMock";

export default function PriceAlertsPage() {
  const [alerts, setAlerts] = useState(priceAlerts);

  const toggleActive = (id) =>
    setAlerts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, active: !a.active } : a))
    );

  const removeAlert = (id) => {
    if (typeof window !== "undefined") {
      const ok = window.confirm("Xoá thông báo giá này?");
      if (!ok) return;
    }
    setAlerts((prev) => prev.filter((a) => a.id !== id));
  };

  return (
    <>
      <AccountPageHeader
        title="Thông báo giá vé máy bay"
        subtitle="Theo dõi giá các chặng bay yêu thích và nhận email khi giá giảm."
        actions={
          <button
            type="button"
            className="px-4 py-2 rounded-lg bg-sky-500 hover:bg-sky-600 text-white text-sm font-semibold shadow-sm"
          >
            + Tạo thông báo giá mới
          </button>
        }
      />

      {alerts.length === 0 ? (
        <AccountEmptyState
          title="Bạn chưa tạo thông báo giá nào"
          description="Tạo thông báo cho chặng bay bạn quan tâm để VieGo gửi email khi giá giảm dưới mức mong muốn."
          action={
            <button
              type="button"
              className="px-4 py-2 rounded-lg bg-sky-500 hover:bg-sky-600 text-white text-sm font-semibold shadow-sm"
            >
              Tạo thông báo giá mới
            </button>
          }
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {alerts.map((a) => (
            <article
              key={a.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 md:p-6 flex flex-col gap-3"
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-base font-bold text-slate-900 leading-snug">
                  {a.route}
                </h3>
                <span
                  className={
                    "text-[11px] font-semibold px-2.5 py-1 rounded-full " +
                    (a.active
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-slate-200 text-slate-600")
                  }
                >
                  {a.active ? "Đang theo dõi" : "Đã tắt"}
                </span>
              </div>

              <dl className="text-sm text-slate-700 space-y-1">
                <div className="flex justify-between gap-3">
                  <dt className="text-slate-500">Ngày đi</dt>
                  <dd className="font-medium">{formatDateVN(a.departDate)}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-slate-500">Ngưỡng giá</dt>
                  <dd className="font-semibold text-sky-700">
                    ≤ {formatVND(a.threshold)}
                  </dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-slate-500">Email</dt>
                  <dd className="font-medium truncate max-w-[60%]">{a.email}</dd>
                </div>
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
                  onClick={() => toggleActive(a.id)}
                  className="px-3 py-1.5 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-100"
                >
                  {a.active ? "Tắt thông báo" : "Bật lại"}
                </button>
                <button
                  type="button"
                  onClick={() => removeAlert(a.id)}
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
