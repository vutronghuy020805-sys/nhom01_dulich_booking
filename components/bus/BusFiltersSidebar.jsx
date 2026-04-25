"use client";

import { useState } from "react";

const FILTER_ITEMS = [
  { id: "pickup", label: "Chọn điểm lên xe" },
  { id: "dropoff", label: "Chọn điểm đến" },
  { id: "departure-time", label: "Giờ khởi hành" },
  { id: "arrival-time", label: "Giờ đến" },
  { id: "operator", label: "Hãng Xe Buýt" },
  { id: "amenities", label: "Tiện ích" },
  { id: "seat-type", label: "Kiểu ghế ngồi" },
  { id: "seats-left", label: "chỗ ngồi" },
  { id: "team-name", label: "Tên đội xe" },
  { id: "team-type", label: "Loại đội xe" },
];

function ChevronIcon({ open }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={
        "w-4 h-4 text-sky-500 transition-transform duration-200 " +
        (open ? "rotate-180" : "")
      }
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

export default function BusFiltersSidebar() {
  const [open, setOpen] = useState({});
  const toggle = (id) => setOpen((o) => ({ ...o, [id]: !o[id] }));

  return (
    <aside className="bg-white border border-slate-200 rounded-xl overflow-hidden">
      <div className="px-5 pt-5 pb-3 flex items-center justify-between">
        <h2 className="font-bold text-slate-900 text-base">Lọc</h2>
        <button
          type="button"
          onClick={() => setOpen({})}
          className="text-xs font-semibold text-sky-600 hover:text-sky-700"
        >
          Đặt lại bộ lọc
        </button>
      </div>
      <p className="px-5 pb-4 text-xs text-slate-500 leading-relaxed">
        Hiển thị kết quả dựa trên danh mục của bạn
      </p>

      <div className="divide-y divide-slate-100 border-t border-slate-100">
        {FILTER_ITEMS.map((item) => {
          const isOpen = Boolean(open[item.id]);
          return (
            <div key={item.id}>
              <button
                type="button"
                onClick={() => toggle(item.id)}
                aria-expanded={isOpen}
                className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-slate-50 transition-colors"
              >
                <span className="text-sm font-semibold text-slate-800">
                  {item.label}
                </span>
                <ChevronIcon open={isOpen} />
              </button>
              {isOpen && (
                <div className="px-5 pb-4 text-xs text-slate-500 space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded border-slate-300 text-sky-500 focus:ring-sky-400"
                    />
                    <span>Tất cả</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded border-slate-300 text-sky-500 focus:ring-sky-400"
                    />
                    <span>Tùy chọn A</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded border-slate-300 text-sky-500 focus:ring-sky-400"
                    />
                    <span>Tùy chọn B</span>
                  </label>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </aside>
  );
}
