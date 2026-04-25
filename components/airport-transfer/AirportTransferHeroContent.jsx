"use client";

import { motion, useReducedMotion } from "motion/react";
import AirportTransferPromoCard from "./AirportTransferPromoCard";
import RouteAnimation from "@/components/motion/RouteAnimation";
import { EASE_OUT } from "@/lib/motion";

export default function AirportTransferHeroContent() {
  const reduceMotion = useReducedMotion();
  const headline = "Tạm gác lại mọi lo lắng và mệt mỏi với dịch vụ xe đưa đón sân bay từ VieGo";

  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
  };
  const item = {
    hidden: { opacity: 0, y: 18 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE_OUT } },
  };

  if (reduceMotion) {
    return (
      <div className="max-w-350 mx-auto px-4 lg:px-10 pt-8 md:pt-10 pb-20 md:pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 items-center">
          <div>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight">
              {headline}
            </h1>
            <p className="mt-4 md:mt-5 text-sm md:text-base text-white/90 leading-relaxed max-w-2xl">
              VieGo mang đến giải pháp đưa đón sân bay tiện lợi, giúp bạn di
              chuyển nhanh chóng và đúng giờ. Đa dạng phương tiện phù hợp mọi
              nhu cầu, cho hành trình luôn nhẹ nhàng. Đặt xe ngay trên VieGo để
              bắt đầu chuyến đi trọn vẹn.
            </p>
            <div className="mt-6 md:mt-8">
              <RouteAnimation />
            </div>
          </div>
          <div className="lg:justify-self-end w-full max-w-xl">
            <AirportTransferPromoCard />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-350 mx-auto px-4 lg:px-10 pt-8 md:pt-10 pb-20 md:pb-28">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 items-center">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={container}
        >
          <motion.h1
            variants={item}
            className="text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight"
          >
            {headline}
          </motion.h1>
          <motion.p
            variants={item}
            className="mt-4 md:mt-5 text-sm md:text-base text-white/90 leading-relaxed max-w-2xl"
          >
            VieGo mang đến giải pháp đưa đón sân bay tiện lợi, giúp bạn di
            chuyển nhanh chóng và đúng giờ. Đa dạng phương tiện phù hợp mọi
            nhu cầu, cho hành trình luôn nhẹ nhàng. Đặt xe ngay trên VieGo để
            bắt đầu chuyến đi trọn vẹn.
          </motion.p>
          <motion.div variants={item} className="mt-6 md:mt-8">
            <RouteAnimation />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.2 }}
          className="lg:justify-self-end w-full max-w-xl"
        >
          <AirportTransferPromoCard />
        </motion.div>
      </div>

      <div className="mt-6 md:mt-8 flex items-center justify-center gap-3 text-white/90">
        <button
          type="button"
          aria-label="Khuyến mãi trước"
          className="w-8 h-8 rounded-full bg-white/15 hover:bg-white/25 border border-white/25 flex items-center justify-center transition"
        >
          <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <span className="text-sm md:text-base font-medium">Xem thêm khuyến mãi</span>
        <button
          type="button"
          aria-label="Khuyến mãi sau"
          className="w-8 h-8 rounded-full bg-white/15 hover:bg-white/25 border border-white/25 flex items-center justify-center transition"
        >
          <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>
    </div>
  );
}
