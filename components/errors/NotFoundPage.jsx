"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import NotFoundMascot from "./NotFoundMascot";
import { EASE_OUT } from "@/lib/motion";

function ArrowLeftIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="11 18 5 12 11 6" />
    </svg>
  );
}

export default function NotFoundPage() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-sky-200 via-sky-100 to-white flex flex-col">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-white via-white/70 to-transparent"
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 flex items-center justify-center select-none"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: reduceMotion ? 0 : 0.9, ease: EASE_OUT }}
      >
        <span className="text-[22rem] sm:text-[28rem] md:text-[36rem] font-black text-white/50 leading-none tracking-tighter drop-shadow-sm">
          404
        </span>
      </motion.div>

      <div className="relative z-10 flex items-start justify-end px-4 md:px-8 pt-5">
        <Link
          href="/login"
          className="inline-flex items-center justify-center px-5 py-2 rounded-xl bg-white/95 hover:bg-white text-slate-800 font-semibold text-sm shadow-sm border border-white/60 transition-colors"
        >
          Log in
        </Link>
      </div>

      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 pb-16 text-center">
        <motion.div
          animate={
            reduceMotion
              ? undefined
              : { y: [0, -10, 0], rotate: [-1.5, 1.5, -1.5] }
          }
          transition={{ duration: 4.2, ease: "easeInOut", repeat: Infinity }}
        >
          <NotFoundMascot className="w-64 md:w-80 h-auto drop-shadow-[0_10px_30px_rgba(59,130,246,0.25)]" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.6, ease: EASE_OUT, delay: 0.15 }}
          className="mt-6 md:mt-8 text-3xl md:text-4xl font-extrabold text-slate-900"
        >
          Oops, i think we&rsquo;re lost
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.6, ease: EASE_OUT, delay: 0.25 }}
          className="mt-2 text-sm md:text-base text-slate-500"
        >
          Let&rsquo;s get you back somewhere familiar...
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.55, ease: EASE_OUT, delay: 0.4 }}
        >
          <motion.div
            whileHover={reduceMotion ? undefined : { y: -2 }}
            whileTap={reduceMotion ? undefined : { scale: 0.97 }}
            transition={{ duration: 0.18, ease: EASE_OUT }}
          >
            <Link
              href="/"
              className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white hover:bg-slate-50 text-slate-800 font-semibold text-sm border border-slate-200 shadow-sm transition-colors"
            >
              <ArrowLeftIcon />
              Back to home
            </Link>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
}
