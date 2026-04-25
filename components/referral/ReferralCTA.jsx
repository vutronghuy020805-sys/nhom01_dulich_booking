"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { EASE_OUT } from "@/lib/motion";

export default function ReferralCTA() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="bg-linear-to-r from-sky-600 via-sky-500 to-sky-400 text-white py-14 md:py-20">
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.55, ease: EASE_OUT }}
        className="max-w-3xl mx-auto px-4 lg:px-10 text-center"
      >
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold leading-tight">
          Bắt đầu giới thiệu bạn bè cùng VieGo ngay hôm nay
        </h2>
        <p className="mt-3 md:mt-4 text-sm md:text-base text-white/90 leading-relaxed">
          Càng nhiều bạn bè đặt thành công, bạn càng tích luỹ được nhiều Xu VieGo
          để tận hưởng chuyến đi tiếp theo gần như miễn phí.
        </p>

        <div className="mt-7 md:mt-9 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/account/my-bookings"
            className="inline-flex items-center justify-center px-7 py-3 rounded-full bg-white text-sky-700 font-bold text-sm md:text-base shadow-xl hover:bg-slate-50 transition-colors"
          >
            Tham gia ngay
          </Link>
          <Link
            href="/login"
            className="inline-flex items-center justify-center px-7 py-3 rounded-full bg-white/15 border border-white/40 text-white font-semibold text-sm md:text-base hover:bg-white/25 transition-colors"
          >
            Đăng nhập để bắt đầu
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
