"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { EASE_OUT } from "@/lib/motion";

export default function ReferralHero() {
  const reduceMotion = useReducedMotion();

  const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
  };
  const item = {
    hidden: { opacity: 0, y: 18 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE_OUT } },
  };

  return (
    <section className="relative isolate overflow-hidden">
      {/* Ảnh nền local */}
      <Image
        src="/nhom01_dulich_booking/images/referral/banner.jpg"
        alt=""
        fill
        sizes="100vw"
        priority
        className="object-cover -z-10"
      />

      {/* Overlay gradient để chữ đọc rõ */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-linear-to-r from-sky-900/85 via-sky-700/55 to-transparent"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-linear-to-t from-sky-900/40 via-transparent to-sky-900/20"
      />

      {/* Đường cong trắng "swoosh" decorative bên phải, gợi cảm giác vui tươi */}
      <svg
        aria-hidden
        viewBox="0 0 600 400"
        preserveAspectRatio="none"
        className="absolute right-0 top-0 h-full w-1/2 -z-10 opacity-40 pointer-events-none"
      >
        <path
          d="M120 380 Q 240 100, 540 220 T 800 200"
          stroke="white"
          strokeWidth="60"
          strokeLinecap="round"
          fill="none"
        />
      </svg>

      <div className="relative max-w-375 mx-auto px-6 lg:px-10 py-16 md:py-24 lg:py-28">
        <motion.div
          initial={reduceMotion ? false : "hidden"}
          animate="visible"
          variants={stagger}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
        >
          {/* Cụm branding affiliate */}
          <motion.div
            variants={item}
            className="lg:col-span-5 text-white space-y-6"
          >
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-white/15 backdrop-blur-md border border-white/30 flex items-center justify-center shrink-0">
                <Image
                  src="/nhom01_dulich_booking/assets/logo-viego.png"
                  alt="VieGo"
                  width={48}
                  height={48}
                  className="w-10 h-10 md:w-12 md:h-12 object-contain"
                />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-white/80 font-semibold">
                  VieGo
                </p>
                <p className="text-2xl md:text-3xl font-extrabold leading-none">
                  Affiliate
                </p>
              </div>
            </div>

            <div className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-white text-sky-700 font-bold text-base md:text-lg shadow-xl">
              <span className="inline-block w-2 h-2 rounded-full bg-sky-500" />
              Giới thiệu bạn bè
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </div>
          </motion.div>

          {/* Tiêu đề thưởng */}
          <motion.div
            variants={item}
            className="lg:col-span-7 text-white text-center lg:text-right"
          >
            <p className="text-base md:text-xl font-medium text-white/95">
              Nhận đến
            </p>
            <p className="mt-2 text-3xl md:text-5xl lg:text-6xl font-extrabold leading-tight drop-shadow-2xl">
              600.000 Xu VieGo
            </p>
            <p className="mt-3 text-base md:text-xl text-white/95 font-medium">
              cho mỗi lượt giới thiệu thành công
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6, ease: EASE_OUT }}
          className="mt-10 md:mt-14"
        >
          <Link
            href="#dieu-khoan"
            className="text-xs md:text-sm text-white/85 hover:text-white underline-offset-2 hover:underline"
          >
            Điều khoản áp dụng
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
