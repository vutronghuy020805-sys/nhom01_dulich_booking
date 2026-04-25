"use client";

import { useSyncExternalStore } from "react";
import { motion, useReducedMotion } from "motion/react";
import { confirmationStorageKey } from "./QrConfirmationBox";
import { EASE_OUT } from "@/lib/motion";

// Cache kết quả đọc sessionStorage theo key, để getSnapshot của
// useSyncExternalStore trả về cùng một object reference giữa các lần render
// (không vi phạm cache rule + không lặp vô tận).
const EMPTY_SUBSCRIBE = () => () => {};
const confirmationCache = new Map();
function readConfirmation(key) {
  if (typeof window === "undefined") return null;
  if (confirmationCache.has(key)) return confirmationCache.get(key);
  let value = null;
  try {
    const raw = window.sessionStorage.getItem(key);
    value = raw ? JSON.parse(raw) : null;
  } catch {
    value = null;
  }
  confirmationCache.set(key, value);
  return value;
}

const fallbackCode = (ratePlanId) => {
  let h = 0;
  for (const c of String(ratePlanId || "")) {
    h = (h * 31 + c.charCodeAt(0)) & 0xffffff;
  }
  const year = new Date().getFullYear();
  return `VG-${year}-${String(h % 1000000).padStart(6, "0")}`;
};

const formatDateTime = (iso) => {
  try {
    const d = new Date(iso);
    const pad = (n) => String(n).padStart(2, "0");
    return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
  } catch {
    return "";
  }
};

export default function BookingSuccessStatus({
  hotel,
  locationSlug,
  hotelSlug,
  ratePlanId,
}) {
  const key = confirmationStorageKey(locationSlug, hotelSlug, ratePlanId);
  const info = useSyncExternalStore(
    EMPTY_SUBSCRIBE,
    () => readConfirmation(key),
    () => null
  );

  const code = info?.code || fallbackCode(ratePlanId);
  const paidAt = info?.paidAt ? formatDateTime(info.paidAt) : null;
  const reduceMotion = useReducedMotion();

  return (
    <section className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
      <div className="px-6 py-8 text-center bg-gradient-to-b from-emerald-50 to-white">
        <motion.div
          initial={{ scale: 0, rotate: -20, opacity: 0 }}
          animate={{ scale: 1, rotate: 0, opacity: 1 }}
          transition={
            reduceMotion
              ? { duration: 0 }
              : { type: "spring", stiffness: 220, damping: 16, delay: 0.1 }
          }
          className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500 text-white shadow-lg mb-4"
        >
          <motion.svg
            viewBox="0 0 24 24"
            className="w-9 h-9"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <motion.polyline
              points="20 6 9 17 4 12"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: reduceMotion ? 0 : 0.45, ease: EASE_OUT, delay: 0.35 }}
            />
          </motion.svg>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.5, ease: EASE_OUT, delay: 0.25 }}
          className="text-2xl md:text-3xl font-bold text-slate-900"
        >
          Đặt phòng thành công!
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.5, ease: EASE_OUT, delay: 0.4 }}
          className="mt-2 text-slate-600 max-w-xl mx-auto leading-relaxed"
        >
          VieGo đã ghi nhận thanh toán của bạn tại{" "}
          <span className="font-semibold text-slate-800">{hotel.name}</span>.
          Xác nhận đặt phòng và thông tin chi tiết đã được gửi tới email của
          bạn.
        </motion.p>
      </div>

      <div className="px-6 py-5 border-t border-dashed border-gray-200 flex flex-col md:flex-row items-center justify-between gap-3">
        <div>
          <div className="text-xs uppercase tracking-wide text-slate-500">
            Mã đặt chỗ
          </div>
          <div className="text-2xl font-bold text-sky-600 tracking-wider mt-1">
            {code}
          </div>
        </div>
        <div className="text-right">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full">
            <svg
              viewBox="0 0 24 24"
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
            Thanh toán thành công
          </span>
          {paidAt && (
            <div className="text-xs text-slate-500 mt-1">
              Thanh toán lúc {paidAt}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
