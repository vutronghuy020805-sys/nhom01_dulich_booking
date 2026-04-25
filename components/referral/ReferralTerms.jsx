"use client";

import { motion, useReducedMotion } from "motion/react";
import { EASE_OUT } from "@/lib/motion";

const terms = [
  "Chương trình chỉ áp dụng cho các đơn đặt chỗ hợp lệ trên VieGo và đã được thanh toán thành công.",
  "Không áp dụng cho các trường hợp tự giới thiệu (self-referral), tài khoản trùng thông tin hoặc có dấu hiệu gian lận.",
  "Xu VieGo sẽ được cộng vào tài khoản người giới thiệu trong vòng 7 ngày làm việc sau khi giao dịch của người được giới thiệu đạt đủ điều kiện.",
  "Xu VieGo có thời hạn sử dụng và quy đổi theo chính sách hiện hành. Vui lòng kiểm tra trong tài khoản của bạn.",
  "VieGo có quyền điều chỉnh, tạm dừng hoặc kết thúc chương trình tại bất kỳ thời điểm nào và sẽ thông báo trên website.",
];

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

export default function ReferralTerms() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="dieu-khoan" className="bg-white py-14 md:py-20 scroll-mt-20">
      <div className="max-w-4xl mx-auto px-4 lg:px-10">
        <motion.h2
          initial={reduceMotion ? false : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55, ease: EASE_OUT }}
          className="text-center text-2xl md:text-3xl font-bold text-slate-900"
        >
          Điều khoản áp dụng
        </motion.h2>

        <ul className="mt-8 md:mt-10 space-y-3 md:space-y-4">
          {terms.map((t, idx) => (
            <motion.li
              key={idx}
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: idx * 0.05, ease: EASE_OUT }}
              className="flex items-start gap-3 bg-slate-50 border border-slate-200 rounded-xl p-4 md:p-5"
            >
              <span className="shrink-0 mt-0.5 inline-flex items-center justify-center w-7 h-7 rounded-full bg-sky-500 text-white">
                <CheckIcon />
              </span>
              <p className="text-sm md:text-[15px] text-slate-700 leading-relaxed">
                {t}
              </p>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
