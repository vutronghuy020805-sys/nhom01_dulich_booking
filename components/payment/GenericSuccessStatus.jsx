"use client";

import { motion, useReducedMotion } from "motion/react";
import { EASE_OUT } from "@/lib/motion";

function formatDateTime(iso) {
  if (!iso) return "";
  try {
    const d = new Date(iso);
    const pad = (n) => String(n).padStart(2, "0");
    return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
  } catch {
    return "";
  }
}

/**
 * Unified success status card.
 *
 * Props:
 * - title: VD "Đặt phòng thành công!", "Đặt vé xe thành công!", "Đặt xe đưa đón thành công!"
 * - description: VD "VieGo đã ghi nhận thanh toán của bạn tại <subjectName>..."
 * - subjectName: tên product được bôi đậm trong description (optional)
 * - code: mã đặt chỗ, hiện dưới dạng VG-YYYY-XXXXXX
 * - paidAt: ISO string — hiển thị "Thanh toán lúc ..."
 */
export default function GenericSuccessStatus({
  title,
  description,
  subjectName,
  code,
  paidAt,
}) {
  const paidLabel = formatDateTime(paidAt);
  const reduceMotion = useReducedMotion();

  return (
    <section className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
      <div className="px-6 py-8 text-center bg-linear-to-b from-emerald-50 to-white">
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
          <svg
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
          </svg>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.5, ease: EASE_OUT, delay: 0.25 }}
          className="text-2xl md:text-3xl font-bold text-slate-900"
        >
          {title}
        </motion.h1>
        {description ? (
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.5, ease: EASE_OUT, delay: 0.4 }}
            className="mt-2 text-slate-600 max-w-xl mx-auto leading-relaxed"
          >
            {subjectName
              ? description
                  .split("{subject}")
                  .flatMap((part, i, arr) =>
                    i < arr.length - 1
                      ? [
                          part,
                          <span
                            key={`s-${i}`}
                            className="font-semibold text-slate-800"
                          >
                            {subjectName}
                          </span>,
                        ]
                      : [part]
                  )
              : description}
          </motion.p>
        ) : null}
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
          {paidLabel ? (
            <div className="text-xs text-slate-500 mt-1">
              Thanh toán lúc {paidLabel}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
