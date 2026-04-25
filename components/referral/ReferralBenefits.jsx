"use client";

import { motion, useReducedMotion } from "motion/react";
import { EASE_OUT } from "@/lib/motion";

const benefits = [
  {
    title: "Nhận thưởng hấp dẫn",
    description:
      "Tích luỹ Xu VieGo sau mỗi lượt giới thiệu thành công, dùng giảm trừ trực tiếp cho lần đặt tiếp theo.",
    icon: (
      <svg viewBox="0 0 32 32" className="w-9 h-9" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <circle cx="16" cy="16" r="11" fill="rgba(56,189,248,0.12)" />
        <path d="M11 16l3 3 7-7" strokeWidth="2.2" />
      </svg>
    ),
  },
  {
    title: "Dễ chia sẻ với bạn bè",
    description:
      "Một cú chạm là copy được link cá nhân. Chia sẻ qua Zalo, Messenger, email hay bất kỳ kênh nào bạn muốn.",
    icon: (
      <svg viewBox="0 0 32 32" className="w-9 h-9" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <rect x="5" y="9" width="22" height="14" rx="3" fill="rgba(56,189,248,0.12)" />
        <path d="M9 14h14" />
        <path d="M9 18h8" />
        <path d="M22 21l3-3-3-3" />
      </svg>
    ),
  },
  {
    title: "Theo dõi trạng thái giới thiệu",
    description:
      "Bảng điều khiển trong tài khoản giúp bạn xem ai đã đặt thành công, Xu đã nhận và lịch sử thưởng minh bạch.",
    icon: (
      <svg viewBox="0 0 32 32" className="w-9 h-9" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <rect x="5" y="6" width="22" height="20" rx="3" fill="rgba(56,189,248,0.12)" />
        <path d="M10 21V14" strokeWidth="2.2" />
        <path d="M16 21V11" strokeWidth="2.2" />
        <path d="M22 21v-5" strokeWidth="2.2" />
      </svg>
    ),
  },
];

export default function ReferralBenefits() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="bg-slate-50 py-14 md:py-20">
      <div className="max-w-300 mx-auto px-4 lg:px-10">
        <motion.h2
          initial={reduceMotion ? false : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55, ease: EASE_OUT }}
          className="text-center text-2xl md:text-3xl font-bold text-slate-900"
        >
          Quyền lợi khi tham gia
        </motion.h2>

        <div className="mt-10 md:mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {benefits.map((b, idx) => (
            <motion.div
              key={b.title}
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: idx * 0.08, ease: EASE_OUT }}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 md:p-7 text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-sky-50 text-sky-600 mb-4">
                {b.icon}
              </div>
              <h3 className="text-base md:text-lg font-bold text-slate-900">
                {b.title}
              </h3>
              <p className="mt-2 text-sm md:text-[15px] text-slate-600 leading-relaxed">
                {b.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
