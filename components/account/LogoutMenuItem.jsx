"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

function PowerIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 3v9" />
      <path d="M18 6a8 8 0 1 1-12 0" />
    </svg>
  );
}

export default function LogoutMenuItem() {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    // TODO: nối auth sign-out thật khi có backend.
    try {
      if (typeof window !== "undefined") {
        window.localStorage.removeItem("viego-cart-v1");
      }
    } catch {
      // ignore
    }
    setOpen(false);
    router.push("/");
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100 transition-colors"
      >
        <PowerIcon />
        <span>Đăng xuất</span>
      </button>

      {open ? (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-bold text-slate-900">
              Đăng xuất tài khoản?
            </h3>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">
              Bạn có chắc chắn muốn đăng xuất khỏi VieGo? Dữ liệu giỏ/booking
              tạm sẽ được xoá khỏi trình duyệt.
            </p>
            <div className="mt-5 flex gap-3 justify-end">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="px-4 py-2 rounded-lg border border-slate-200 text-slate-700 font-semibold text-sm hover:bg-slate-50"
              >
                Huỷ
              </button>
              <button
                type="button"
                onClick={handleLogout}
                className="px-4 py-2 rounded-lg bg-rose-500 hover:bg-rose-600 text-white font-semibold text-sm shadow"
              >
                Đăng xuất
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
