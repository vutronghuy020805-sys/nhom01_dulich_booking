"use client";

import { motion, useReducedMotion } from "motion/react";
import { EASE_OUT } from "@/lib/motion";

const steps = [
  {
    n: 1,
    title: "Chia sẻ liên kết giới thiệu",
    description:
      "Đăng nhập VieGo, lấy link giới thiệu cá nhân và chia sẻ với bạn bè qua tin nhắn, mạng xã hội hoặc email.",
    icon: (
      <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <circle cx="18" cy="5" r="3" />
        <circle cx="6" cy="12" r="3" />
        <circle cx="18" cy="19" r="3" />
        <line x1="8.6" y1="13.5" x2="15.4" y2="17.5" />
        <line x1="15.4" y1="6.5" x2="8.6" y2="10.5" />
      </svg>
    ),
  },
  {
    n: 2,
    title: "Bạn bè đặt dịch vụ trên VieGo",
    description:
      "Bạn của bạn truy cập qua link và hoàn tất một đơn đặt chỗ hợp lệ trên VieGo (vé máy bay, khách sạn, vé xe, hoạt động…).",
    icon: (
      <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <rect x="3" y="6" width="18" height="13" rx="2" />
        <line x1="3" y1="10" x2="21" y2="10" />
        <path d="M8 15h4" />
      </svg>
    ),
  },
  {
    n: 3,
    title: "Nhận thưởng vào tài khoản",
    description:
      "Sau khi giao dịch của bạn bè đạt đủ điều kiện, Xu VieGo sẽ được cộng tự động vào tài khoản để bạn dùng cho lần đặt tiếp theo.",
    icon: (
      <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <circle cx="12" cy="12" r="9" />
        <text x="12" y="16" fontSize="11" textAnchor="middle" fontWeight="700" fill="currentColor" stroke="none">P</text>
      </svg>
    ),
  },
];

export default function ReferralHowItWorks() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="bg-white py-14 md:py-20">
      <div className="max-w-300 mx-auto px-4 lg:px-10">
        <motion.h2
          initial={reduceMotion ? false : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55, ease: EASE_OUT }}
          className="text-center text-2xl md:text-3xl font-bold text-slate-900"
        >
          Cách chương trình giới thiệu bạn bè hoạt động
        </motion.h2>

        <div className="mt-10 md:mt-14 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {steps.map((s, idx) => (
            <motion.div
              key={s.n}
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: idx * 0.08, ease: EASE_OUT }}
              className="relative bg-sky-50 border border-sky-100 rounded-2xl p-6 md:p-7"
            >
              <div className="flex items-center gap-4">
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-sky-500 text-white font-bold text-lg shadow-md">
                  {s.n}
                </span>
                <span className="text-sky-600">{s.icon}</span>
              </div>
              <h3 className="mt-5 text-base md:text-lg font-bold text-slate-900">
                {s.title}
              </h3>
              <p className="mt-2 text-sm md:text-[15px] text-slate-600 leading-relaxed">
                {s.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
