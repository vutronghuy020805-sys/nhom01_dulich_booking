"use client";

import { useMemo, useState } from "react";
import AccountPageHeader from "@/components/account/AccountPageHeader";
import AccountEmptyState from "@/components/account/AccountEmptyState";
import {
  transactions,
  transactionStatusMap,
  formatVND,
  formatDateVN,
} from "@/data/accountMock";

const serviceOptions = [
  { value: "all", label: "Tất cả dịch vụ" },
  { value: "flight", label: "Vé máy bay" },
  { value: "bus", label: "Vé xe khách" },
  { value: "car", label: "Thuê xe" },
  { value: "activity", label: "Hoạt động" },
  { value: "airport", label: "Đưa đón sân bay" },
  { value: "hotel", label: "Khách sạn" },
];

const statusOptions = [
  { value: "all", label: "Tất cả trạng thái" },
  { value: "success", label: "Thành công" },
  { value: "pending", label: "Chờ thanh toán" },
  { value: "cancelled", label: "Đã huỷ" },
  { value: "refunded", label: "Hoàn tiền" },
];

const timeOptions = [
  { value: "this-month", label: "Tháng này" },
  { value: "3-months", label: "3 tháng gần đây" },
  { value: "all", label: "Tất cả" },
];

function monthsAgo(iso, months) {
  const now = new Date();
  const d = new Date(iso);
  const cutoff = new Date(now.getFullYear(), now.getMonth() - months, now.getDate());
  return d >= cutoff;
}

function inCurrentMonth(iso) {
  const now = new Date();
  const d = new Date(iso);
  return (
    d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth()
  );
}

export default function TransactionsPage() {
  const [service, setService] = useState("all");
  const [status, setStatus] = useState("all");
  const [time, setTime] = useState("3-months");

  const filtered = useMemo(() => {
    return transactions.filter((t) => {
      if (service !== "all" && t.service !== service) return false;
      if (status !== "all" && t.status !== status) return false;
      if (time === "this-month" && !inCurrentMonth(t.paidAt)) return false;
      if (time === "3-months" && !monthsAgo(t.paidAt, 3)) return false;
      return true;
    });
  }, [service, status, time]);

  return (
    <>
      <AccountPageHeader
        title="Danh sách giao dịch"
        subtitle="Lịch sử thanh toán cho mọi dịch vụ bạn đã đặt trên VieGo."
      />

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 md:p-5 flex flex-col md:flex-row gap-3">
        <select
          value={service}
          onChange={(e) => setService(e.target.value)}
          className="flex-1 px-3 py-2.5 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-sky-400"
        >
          {serviceOptions.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="flex-1 px-3 py-2.5 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-sky-400"
        >
          {statusOptions.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <select
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="flex-1 px-3 py-2.5 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-sky-400"
        >
          {timeOptions.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>

      {filtered.length === 0 ? (
        <AccountEmptyState
          title="Bạn chưa có giao dịch nào"
          description="Các giao dịch khớp với bộ lọc sẽ xuất hiện tại đây. Hãy thử thay đổi bộ lọc hoặc đặt dịch vụ trên VieGo."
        />
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="hidden md:grid grid-cols-[1.2fr_1.5fr_1fr_1fr_0.9fr_auto] gap-4 px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500 bg-slate-50 border-b border-slate-100">
            <div>Mã giao dịch</div>
            <div>Dịch vụ</div>
            <div>Ngày thanh toán</div>
            <div>Tổng tiền</div>
            <div>Trạng thái</div>
            <div className="w-24" />
          </div>
          <ul className="divide-y divide-slate-100">
            {filtered.map((t) => {
              const st = transactionStatusMap[t.status];
              return (
                <li
                  key={t.id}
                  className="px-5 py-4 md:grid md:grid-cols-[1.2fr_1.5fr_1fr_1fr_0.9fr_auto] gap-4 md:items-center flex flex-col gap-2"
                >
                  <div className="text-sm font-mono text-slate-700">{t.id}</div>
                  <div>
                    <p className="text-xs text-slate-500">{t.serviceLabel}</p>
                    <p className="text-sm font-semibold text-slate-900 line-clamp-1">
                      {t.title}
                    </p>
                  </div>
                  <div className="text-sm text-slate-700">
                    {formatDateVN(t.paidAt)}
                  </div>
                  <div className="text-sm font-semibold text-slate-900">
                    {formatVND(t.amount)}
                  </div>
                  <div>
                    <span
                      className={`inline-block text-[11px] font-semibold px-2.5 py-1 rounded-full ${st.className}`}
                    >
                      {st.label}
                    </span>
                  </div>
                  <div className="md:justify-self-end">
                    <button
                      type="button"
                      className="px-3 py-1.5 rounded-lg text-sm font-semibold text-sky-600 hover:bg-sky-50"
                    >
                      Xem chi tiết
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </>
  );
}
