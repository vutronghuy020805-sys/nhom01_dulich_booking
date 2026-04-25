"use client";

import { motion, useReducedMotion } from "motion/react";
import { EASE_OUT } from "@/lib/motion";

function ChevronLeft() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}
function ChevronRight() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

export default function VillaHero({
  title = "Biệt thự trên VieGo",
  description = "Đặt phòng nghỉ với không gian riêng tư cho một kỳ nghỉ khó quên cùng nhóm bạn.",
}) {
  const reduceMotion = useReducedMotion();

  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
  };
  const item = {
    hidden: { opacity: 0, y: 18 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE_OUT } },
  };

  return (
    <section className="relative bg-linear-to-b from-sky-500 via-sky-400 to-sky-300">
      <div className="max-w-350 mx-auto px-4 lg:px-10 pt-10 md:pt-14 pb-32 md:pb-44">
        <motion.div
          initial={reduceMotion ? false : "hidden"}
          animate="visible"
          variants={container}
          className="max-w-2xl"
        >
          <motion.h1
            variants={item}
            className="text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight"
          >
            {title}
          </motion.h1>
          <motion.p
            variants={item}
            className="mt-3 md:mt-4 text-sm md:text-base text-white/90 leading-relaxed"
          >
            {description}
          </motion.p>
        </motion.div>

        <div className="mt-8 md:mt-12 flex items-center justify-center gap-3 text-white/90">
          <button
            type="button"
            aria-label="Khuyến mãi trước"
            className="w-8 h-8 rounded-full bg-white/15 hover:bg-white/25 border border-white/25 flex items-center justify-center transition-colors"
          >
            <ChevronLeft />
          </button>
          <span className="text-sm md:text-base font-medium">
            Xem thêm khuyến mãi
          </span>
          <button
            type="button"
            aria-label="Khuyến mãi sau"
            className="w-8 h-8 rounded-full bg-white/15 hover:bg-white/25 border border-white/25 flex items-center justify-center transition-colors"
          >
            <ChevronRight />
          </button>
        </div>
      </div>
    </section>
  );
}
