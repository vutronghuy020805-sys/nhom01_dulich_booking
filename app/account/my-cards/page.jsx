"use client";

import { useState } from "react";
import AccountPageHeader from "@/components/account/AccountPageHeader";
import AccountEmptyState from "@/components/account/AccountEmptyState";
import { savedCards } from "@/data/accountMock";

function CardLogo({ brand }) {
  const palette =
    brand === "Visa"
      ? "from-indigo-500 to-indigo-700"
      : brand === "Mastercard"
      ? "from-rose-500 to-amber-500"
      : "from-slate-600 to-slate-800";
  return (
    <div
      className={`w-14 h-9 rounded-md bg-gradient-to-br ${palette} text-white text-[11px] font-bold flex items-center justify-center shadow-inner`}
    >
      {brand}
    </div>
  );
}

export default function MyCardsPage() {
  const [cards, setCards] = useState(savedCards);
  const [showAdd, setShowAdd] = useState(false);

  const handleDelete = (id) => {
    if (typeof window !== "undefined") {
      const ok = window.confirm("Xoá thẻ này khỏi tài khoản?");
      if (!ok) return;
    }
    setCards((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <>
      <AccountPageHeader
        title="Thẻ của tôi"
        subtitle="Quản lý các phương thức thanh toán đã lưu để đặt chỗ nhanh hơn."
        actions={
          <button
            type="button"
            onClick={() => setShowAdd(true)}
            className="px-4 py-2 rounded-lg bg-sky-500 hover:bg-sky-600 text-white text-sm font-semibold shadow-sm"
          >
            + Thêm thẻ mới
          </button>
        }
      />

      {cards.length === 0 ? (
        <AccountEmptyState
          title="Bạn chưa lưu thẻ nào"
          description="Lưu thẻ ngân hàng để thanh toán chỉ bằng vài thao tác cho các lần đặt chỗ tiếp theo."
          action={
            <button
              type="button"
              onClick={() => setShowAdd(true)}
              className="px-4 py-2 rounded-lg bg-sky-500 hover:bg-sky-600 text-white text-sm font-semibold shadow-sm"
            >
              Thêm thẻ mới
            </button>
          }
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
          {cards.map((c) => (
            <article
              key={c.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 md:p-6 flex flex-col gap-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <CardLogo brand={c.brand} />
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      {c.bank}
                    </p>
                    <p className="text-xs text-slate-500">
                      {c.brand} · Hết hạn {c.expiry}
                    </p>
                  </div>
                </div>
                {c.isDefault ? (
                  <span className="text-[11px] font-semibold px-2 py-1 rounded-full bg-sky-100 text-sky-700">
                    Mặc định
                  </span>
                ) : null}
              </div>

              <div className="text-lg font-mono tracking-widest text-slate-800">
                •••• •••• •••• {c.last4}
              </div>

              <div className="text-xs text-slate-500 uppercase tracking-wide">
                Chủ thẻ
                <div className="mt-0.5 text-sm text-slate-800 normal-case tracking-normal font-medium">
                  {c.holder}
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  className="px-3 py-1.5 rounded-lg text-sm font-semibold text-sky-600 hover:bg-sky-50"
                >
                  Chỉnh sửa
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(c.id)}
                  className="px-3 py-1.5 rounded-lg text-sm font-semibold text-rose-600 hover:bg-rose-50"
                >
                  Xoá
                </button>
              </div>
            </article>
          ))}
        </div>
      )}

      {showAdd ? (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
          onClick={() => setShowAdd(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-bold text-slate-900">Thêm thẻ mới</h3>
            <p className="mt-1 text-sm text-slate-500">
              Nhập thông tin thẻ. VieGo không lưu số CVV/CVC.
            </p>
            <div className="mt-4 space-y-3">
              <input
                type="text"
                placeholder="Số thẻ"
                className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
              />
              <input
                type="text"
                placeholder="Tên chủ thẻ"
                className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="MM/YY"
                  className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
                />
                <input
                  type="text"
                  placeholder="CVV"
                  className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
                />
              </div>
            </div>
            <div className="mt-5 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowAdd(false)}
                className="px-4 py-2 rounded-lg border border-slate-200 text-slate-700 text-sm font-semibold hover:bg-slate-50"
              >
                Huỷ
              </button>
              <button
                type="button"
                onClick={() => setShowAdd(false)}
                className="px-4 py-2 rounded-lg bg-sky-500 hover:bg-sky-600 text-white text-sm font-semibold shadow"
              >
                Lưu thẻ
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
